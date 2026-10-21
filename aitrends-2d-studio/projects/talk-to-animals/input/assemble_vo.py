"""Build input/voiceover.mp3 for "What If You Could Talk to Animals?" from the narrator parts and the character takes.

  python3 projects/talk-to-animals/input/assemble_vo.py

1. Joins narrator part 1 + part 2, slows the voice with rubberband (TEMPO) and lengthens every pause by EXTRA s
   (eleven_v4 has no speed setting; the raw takes run at ~155-165 words/min, the target is ~130-145).
2. Aligns the narrator-only text to find the slots left for the character lines.
3. Cuts each character line out of its take (forced alignment, snapped to the nearest silence), processes the animal
   voices (pitch, layering, echo) and drops each one into its slot.
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
TEMPO = 0.93
EXTRA = 0.22
MIN_GAP = 0.28
PART_GAP = 0.9
PAD_BEFORE, PAD_AFTER = 0.35, 0.5
NARR = ["takes/narrator_p1_v1.mp3", "takes/narrator_p2_v1.mp3"]

# character takes: file, the lines it holds (in order)
TAKES = {
    "biscuit": ("takes/biscuit_v1.mp3", ["Bacon. Under the chair. Left side.", "That's forty-one pieces this year. I've been counting.",
                "The couch. All of it. Forever.", "It's my back legs. They do this now.", "Don't tell your mom. She'll worry.",
                "The day you were born, everybody left in a hurry. I waited by the door for two days.",
                "Then they came back with you. You were very small and very loud. I liked you right away.",
                "You talked to me every day of your life. I always understood.", "This year, you understood me back. Best year.",
                "Don't be sad for too long. Okay?"]),
    "laura": ("takes/laura_v2.mp3", ["Ugh. You're awake.", "To check if they still fall.", "They've been asking for you all night.",
              "My tree! My tree! MY TREE!", "Pick me. Pick me. Take me home."]),
    "charlie": ("takes/charlie_v2.mp3", ["Tall one. Blue top. Walks funny.", "My tree! My tree! MY TREE!", "Pick me. Pick me. Take me home."]),
    "harry": ("takes/harry_v2.mp3", ["My tree! My tree! MY TREE!", "Pick me. Pick me. Take me home."]),
    "pigeon": ("takes/pigeon_v1.mp3", ["Left at the bakery. Right at the man with the sandwich. Stay near the man with the sandwich."]),
    "mom": ("takes/mom_v1.mp3", ["Hey. What's wrong?"]),
    "whale": ("takes/whale_v3.mp3", ["We hear you."]),
}

# (narrator words right before the slot, or None for the very start; speaker; parts)
# a part is (take, line index, ffmpeg filter or None, delay s, gain); parts of one slot are mixed together
BIRD = [("harry", 0, "rubberband=pitch=1.42,volume=1.0", 0.0, 1.0), ("charlie", 1, "rubberband=pitch=1.55", 0.07, 0.8),
        ("laura", 3, "rubberband=pitch=1.35", 0.13, 0.8)]
PICK = [("laura", 4, "rubberband=pitch=1.3", 0.0, 0.9), ("charlie", 2, "rubberband=pitch=1.45", 0.09, 0.8),
        ("harry", 1, "rubberband=pitch=1.2", 0.16, 0.7)]
WHALE = [("whale", 0, "rubberband=pitch=0.55,aecho=0.8:0.7:180|420:0.35|0.25", 0.0, 1.0),
         ("whale", 0, "rubberband=pitch=0.62,aecho=0.8:0.6:260:0.3", 0.11, 0.6),
         ("whale", 0, "rubberband=pitch=0.5,aecho=0.8:0.6:330:0.3", 0.23, 0.5)]
SLOTS = [
    (None, "BISCUIT", [("biscuit", 0, None, 0, 1)]),
    (("left", "side"), "BISCUIT", [("biscuit", 1, None, 0, 1)]),
    (("breakfast", "table"), "PICKLES", [("laura", 0, None, 0, 1)]),
    (("same", "thing"), "BIRDS", BIRD),
    (("his", "birthday"), "BISCUIT", [("biscuit", 2, None, 0, 1)]),
    (("the", "table"), "PICKLES", [("laura", 1, None, 0, 1)]),
    (("to", "school"), "PIGEON", [("pigeon", 0, "rubberband=pitch=1.12", 0, 1)]),
    (("you", "coming"), "PRAIRIE DOG", [("charlie", 0, "rubberband=pitch=1.4:tempo=1.06", 0, 1)]),
    (("you", "up"), "BIRDS", BIRD[:2]),
    (("every", "cage"), "ANIMALS", PICK),
    (("look", "back"), "MOM", [("mom", 0, None, 0, 1)]),
    (("at", "you"), "BISCUIT", [("biscuit", 3, None, 0, 1)]),
    (("to", "be"), "BISCUIT", [("biscuit", 4, None, 0, 1)]),
    (("door", "first"), "BISCUIT", [("biscuit", (5, 6), None, 0, 1)]),
    (("it's", "dark"), "BISCUIT", [("biscuit", (7, 9), None, 0, 1)]),
    (("three", "words"), "WHALES", WHALE),
    (("turn", "around"), "PICKLES", [("laura", 2, None, 0, 1)]),
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
    p1, p2 = (load(os.path.join(HERE, p)) for p in NARR)
    save(np.concatenate([p1, np.zeros(int(PART_GAP * SR), np.float32), p2]), f"{tmp}/joined.wav")
    narr = lengthen_pauses(load(f"{tmp}/joined.wav", f"rubberband=tempo={TEMPO}"))
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
