"""Build input/voiceover.mp3 from the two narrator parts and the picked character takes.

  python projects/stronger-couldnt-stop/input/assemble_vo.py

1. Joins narrator part 1 + part 2, slows the voice with rubberband (TEMPO) and lengthens every pause by EXTRA s.
   eleven_v4 has no speed setting and the raw takes run at ~165 words/min; the target is ~130-145.
2. Aligns the narrator-only text to find the four slots left for the character lines.
3. Drops each character line into its slot, with silence before and after.
Writes input/voiceover.mp3 and input/vo_slots.json (where each character line sits).
"""
import json, os, re, subprocess, sys
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.dirname(HERE)
STUDIO = os.path.dirname(os.path.dirname(PROJECT))
SR = 44100
TEMPO = 0.93          # rubberband tempo (<1 = slower, pitch unchanged)
EXTRA = 0.22          # seconds added to every pause of MIN_GAP or longer
MIN_GAP = 0.28
PART_GAP = 0.9        # silence between narrator part 1 and part 2
PAD_BEFORE, PAD_AFTER = 0.45, 0.6
# (last two words the narrator says right before the slot, character take)
SLOTS = [(("same", "thing"), "takes/dad_warm_take3.mp3"),
         (("project", "atlas"), "takes/voss_take4.mp3"),
         (("your", "shoulder"), "takes/dad_trembling_take3.mp3"),
         (("is", "shaking"), "takes/mom_take2.mp3")]


def load(path, af=None):
    cmd = ["ffmpeg", "-v", "error", "-i", path] + (["-af", af] if af else []) + ["-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).copy()


def save(x, path):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-"] +
                   (["-c:a", "libmp3lame", "-b:a", "192k"] if path.endswith(".mp3") else []) + [path],
                   input=x.astype(np.float32).tobytes(), check=True)


def silences(x, thr_db=-45, min_len=MIN_GAP, hop=0.01):
    n = int(hop * SR)
    rms = np.sqrt(np.mean(x[: len(x) // n * n].reshape(-1, n) ** 2, axis=1) + 1e-12)
    quiet = 20 * np.log10(rms) < thr_db
    out, start = [], None
    for i, q in enumerate(np.append(quiet, False)):
        if q and start is None:
            start = i
        elif not q and start is not None:
            if (i - start) * hop >= min_len:
                out.append((start * hop, i * hop))
            start = None
    return out


def lengthen_pauses(x):
    pieces, last = [], 0
    for a, b in silences(x):
        mid = int((a + b) / 2 * SR)
        pieces += [x[last:mid], np.zeros(int(EXTRA * SR), np.float32)]
        last = mid
    pieces.append(x[last:])
    return np.concatenate(pieces)


def main():
    p1 = load(os.path.join(HERE, "takes/narrator_part1.mp3"))
    p2 = load(os.path.join(HERE, "takes/narrator_part2.mp3"))
    tmp = os.path.join(PROJECT, "build", "vo_tmp")
    os.makedirs(tmp, exist_ok=True)
    save(np.concatenate([p1, np.zeros(int(PART_GAP * SR), np.float32), p2]), f"{tmp}/joined.wav")
    narr = lengthen_pauses(load(f"{tmp}/joined.wav", f"rubberband=tempo={TEMPO}"))
    save(narr, f"{tmp}/narration.wav")

    # find the slots: align the narrator-only text, then cut after each anchor word
    subprocess.run([sys.executable, os.path.join(STUDIO, "tools/align_offline.py"), "--project", PROJECT,
                    "--audio", f"{tmp}/narration.wav", "--script", os.path.join(HERE, "narration_only.txt")], check=True)
    words = json.load(open(os.path.join(PROJECT, "timeline/words.json")))["words"]
    norm = [re.sub(r"[^a-z']", "", w["word"].lower()) for w in words]
    cuts = []
    for anchor, take in SLOTS:
        i = next(k for k in range(1, len(norm)) if (norm[k - 1], norm[k]) == anchor)
        cuts.append((words[i]["end"], words[i + 1]["start"], take))

    out, last, slots, t = [], 0, [], 0.0
    for end, nxt, take in cuts:
        a, b = int((end + 0.08) * SR), int(max(end + 0.08, nxt - 0.12) * SR)
        line = load(os.path.join(HERE, take))
        out += [narr[last:a], np.zeros(int(PAD_BEFORE * SR), np.float32)]
        t += (a - last) / SR + PAD_BEFORE
        slots.append({"take": take, "start": round(t, 2), "end": round(t + len(line) / SR, 2)})
        out += [line, np.zeros(int(PAD_AFTER * SR), np.float32)]
        t += len(line) / SR + PAD_AFTER
        last = b
    out.append(narr[last:])
    vo = np.concatenate(out)
    save(vo, os.path.join(HERE, "voiceover.mp3"))
    json.dump({"tempo": TEMPO, "extra_pause": EXTRA, "slots": slots}, open(os.path.join(HERE, "vo_slots.json"), "w"), indent=1)
    print(f"voiceover.mp3: {len(vo) / SR:.1f} s; slots: {slots}")


if __name__ == "__main__":
    main()
