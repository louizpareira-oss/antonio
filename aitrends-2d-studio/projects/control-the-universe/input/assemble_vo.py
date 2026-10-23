"""Build input/voiceover.mp3 for "Can One Person Really Control the Universe?" from the narrator take and the character takes
(adapted from projects/talk-to-animals/input/assemble_vo.py).

  python3 projects/control-the-universe/input/assemble_vo.py

1. Slows the voice with rubberband (TEMPO) and lengthens every pause by EXTRA s
   (eleven_v4 has no speed setting; the raw takes run at ~155-165 words/min, the target is ~130-145).
2. Aligns the narrator-only text to find the slots left for the character lines.
3. Cuts each character line out of its take (forced alignment, snapped to the nearest silence), adds the echo on
   Theo's thought line and drops each one into its slot.
Writes input/voiceover.mp3 and input/vo_slots.json (speaker, line and time of every character line).
"""
import json, os, re, subprocess, sys
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.dirname(HERE)
STUDIO = os.path.dirname(os.path.dirname(PROJECT))
sys.path.insert(0, os.path.join(STUDIO, "tools"))
from common import norm_word  # noqa: E402
from transcribe import align_script  # noqa: E402

SR = 44100
TEMPO = 1.0     # the take already runs at ~149 wpm; the user wants ~4 minutes
EXTRA = 0.1
MIN_GAP = 0.28
PART_GAP = 0.9
PAD_BEFORE, PAD_AFTER = 0.35, 0.5
NARR = ["takes/narrator_v1.mp3"]

# character takes: file, the lines it holds (in order)
TAKES = {
    "grandma": ("takes/grandma_v1.mp3", ["That one's Vega. That one's a satellite. That one's... a plane. Never mind.",
                "Who are you? Where's my grandson?", "There you are. You got tall.",
                "You were six. You asked me if the stars could see us back. I said yes.",
                "I've seen these stones before. Nineteen sixty-nine. Six lights. Same backyard."]),
    "theo": ("takes/theo_v1.mp3", ["I liked him better before."]),
}
THOUGHT = "rubberband=pitch=1.1,aecho=0.8:0.55:90|180:0.3|0.18"   # a thought heard in the hero's head: a little younger, echo

# (narrator words right before the slot; speaker; parts) — a part is (take, line index, ffmpeg filter or None, delay s, gain)
SLOTS = [
    (("forty", "years"), "GRANDMA", [("grandma", 0, None, 0, 1)]),
    (("best", "friend's"), "THEO", [("theo", 0, THOUGHT, 0, 1)]),
    (("steps", "back"), "GRANDMA", [("grandma", 1, None, 0, 1)]),
    (("she", "smiles"), "GRANDMA", [("grandma", 2, None, 0, 1)]),
    (("stone", "took"), "GRANDMA", [("grandma", 3, None, 0, 1)]),
    (("goes", "quiet"), "GRANDMA", [("grandma", 4, None, 0, 1)]),
]


def load(path, af=None, sr=SR):
    cmd = ["ffmpeg", "-v", "error", "-i", path] + (["-af", af] if af else []) + ["-ac", "1", "-ar", str(sr), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).copy()


def save(x, path):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-"] +
                   (["-c:a", "libmp3lame", "-b:a", "192k"] if path.endswith(".mp3") else []) + [path],
                   input=x.astype(np.float32).tobytes(), check=True)


def quiet_mask(x, thr_db=-45, hop=0.01):
    n = int(hop * SR)
    rms = np.sqrt(np.mean(x[: len(x) // n * n].reshape(-1, n) ** 2, axis=1) + 1e-12)
    return 20 * np.log10(rms) < thr_db


def silences(x, min_len=MIN_GAP, hop=0.01):
    out, start = [], None
    for i, q in enumerate(np.append(quiet_mask(x, hop=hop), False)):
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


def force_align(x, text):
    """Word timings for `text` spoken in audio x (pocketsphinx forced alignment, like tools/align_offline.py)."""
    from pocketsphinx import Decoder
    from align_offline import decode
    a16 = load_wav16(x)
    pcm = (np.clip(a16, -1, 1) * 32767).astype(np.int16).tobytes()
    toks = [t for t in (norm_word(w) for w in re.findall(r"\S+", text)) if t]
    dec = Decoder(samprate=16000, bestpath=False, loglevel="FATAL", beam=1e-200, pbeam=1e-200, wbeam=1e-150)
    known = [t for t in toks if dec.lookup_word(t)]
    dec.set_align_text(" ".join(known))
    return align_script(text, decode(dec, pcm))


def load_wav16(x):
    tmp = os.path.join(PROJECT, "build", "vo_tmp", "_a.wav")
    save(x, tmp)
    return load(tmp, sr=16000)


def snap(x, t, lo, hi):
    """Move cut time t to the middle of the quietest stretch between lo and hi (seconds)."""
    m = quiet_mask(x)
    a, b = max(0, int(lo * 100)), min(len(m), int(hi * 100))
    best, run, bi = None, 0, None
    for i in range(a, b):
        run = run + 1 if m[i] else 0
        if run and (best is None or run > best):
            best, bi = run, i
    return (bi - best / 2) / 100 if best else t


def split_take(name):
    path, lines = TAKES[name]
    x = load(os.path.join(HERE, path))
    words = force_align(x, " ".join(lines))
    out, k = [], 0
    bounds = []
    for ln in lines:
        n = len(re.findall(r"\S+", ln))
        bounds.append((words[k]["start"], words[k + n - 1]["end"]))
        k += n
    cuts = [0.0]
    for (s0, e0), (s1, e1) in zip(bounds, bounds[1:]):
        cuts.append(snap(x, (e0 + s1) / 2, e0 - 0.15, s1 + 0.15))
    cuts.append(len(x) / SR)
    for i in range(len(lines)):
        seg = x[int(cuts[i] * SR): int(cuts[i + 1] * SR)]
        out.append(trim(seg))
    return out


def trim(seg, pad=0.05):
    m = quiet_mask(seg, thr_db=-50)
    loud = np.where(~m)[0]
    if not len(loud):
        return seg
    a, b = max(0, loud[0] / 100 - pad), min(len(seg) / SR, (loud[-1] + 1) / 100 + pad)
    s = seg[int(a * SR): int(b * SR)].copy()
    f = min(len(s), int(0.01 * SR))
    s[:f] *= np.linspace(0, 1, f); s[-f:] *= np.linspace(1, 0, f)
    return s


def fx(seg, af):
    if not af:
        return seg
    tmp = os.path.join(PROJECT, "build", "vo_tmp", "_fx.wav")
    save(seg, tmp)
    return trim(load(tmp, af))


def slot_audio(parts, lines):
    clips = []
    for name, idx, af, delay, gain in parts:
        if isinstance(idx, tuple):
            seg = np.concatenate([np.concatenate([lines[name][i], np.zeros(int(0.45 * SR), np.float32)]) for i in range(idx[0], idx[1] + 1)])
            seg = trim(seg)
        else:
            seg = lines[name][idx]
        clips.append((fx(seg, af) * gain, delay))
    n = max(int(d * SR) + len(c) for c, d in clips)
    mix = np.zeros(n, np.float32)
    for c, d in clips:
        mix[int(d * SR): int(d * SR) + len(c)] += c
    peak = np.max(np.abs(mix))
    return mix / peak * 0.9 if peak > 0.95 else mix


def main():
    tmp = os.path.join(PROJECT, "build", "vo_tmp")
    os.makedirs(tmp, exist_ok=True)
    narr = lengthen_pauses(load(os.path.join(HERE, NARR[0]), f"rubberband=tempo={TEMPO}"))
    save(narr, f"{tmp}/narration.wav")
    subprocess.run([sys.executable, os.path.join(STUDIO, "tools/align_offline.py"), "--project", PROJECT,
                    "--audio", f"{tmp}/narration.wav", "--script", os.path.join(HERE, "narration_only.txt")], check=True)
    words = json.load(open(os.path.join(PROJECT, "timeline/words.json")))["words"]
    norm = [re.sub(r"[^a-z']", "", w["word"].lower()) for w in words]

    lines = {name: split_take(name) for name in TAKES}
    for name, segs in lines.items():
        print(name, [round(len(s) / SR, 2) for s in segs])

    cuts, i = [], 0
    for anchor, who, parts in SLOTS:
        if anchor is None:
            cuts.append((0.0, 0.0, who, parts)); continue
        i = next(k for k in range(i + 1, len(norm)) if (norm[k - 1], norm[k]) == anchor)
        cuts.append((words[i]["end"], words[i + 1]["start"] if i + 1 < len(words) else words[i]["end"], who, parts))

    out, last, slots, t = [], 0, [], 0.0
    for end, nxt, who, parts in cuts:
        line = slot_audio(parts, lines)
        if end == 0.0:
            a = b = 0
            lead = 0.15
        else:
            a, b = int((end + 0.08) * SR), int(max(end + 0.08, nxt - 0.12) * SR)
            lead = PAD_BEFORE
        out += [narr[last:a], np.zeros(int(lead * SR), np.float32)]
        t += (a - last) / SR + lead
        text = " / ".join(TAKES[p[0]][1][j] for p in parts[:1] for j in (range(p[1][0], p[1][1] + 1) if isinstance(p[1], tuple) else [p[1]]))
        slots.append({"who": who, "line": text, "start": round(t, 2), "end": round(t + len(line) / SR, 2)})
        out += [line, np.zeros(int(PAD_AFTER * SR), np.float32)]
        t += len(line) / SR + PAD_AFTER
        last = b
    out.append(narr[last:])
    vo = np.concatenate(out)
    save(vo, os.path.join(HERE, "voiceover.mp3"))
    json.dump({"tempo": TEMPO, "extra_pause": EXTRA, "narrator": NARR, "slots": slots}, open(os.path.join(HERE, "vo_slots.json"), "w"), indent=1)
    print(f"voiceover.mp3: {len(vo) / SR:.1f} s; {len(slots)} character slots")


if __name__ == "__main__":
    main()
