"""Splice Mia's two "How did you know?" lines into the one-take narration.

  python projects/see-10-seconds/input/splice_mia.py [--take 3]

Each Mia line sits in a fixed-length slot, so swapping the take never moves the narration timings.
"""
import argparse, os, re, subprocess
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
SR = 44100
# (cut narration at, resume narration at, slot length) — cuts sit inside the narrator's long pauses
SLOTS = [(10.90, 11.60, 1.60),     # "...Mia, stares at you." | "How did you know?" | "You didn't hear it."
         (210.60, 211.20, 2.10)]   # "Mia stares at you, shaking." | "How did you know?" | "And for once..."
LEAD = 0.10


def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()


def speech_spans(path, noise="-45dB", d=0.12):
    log = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", f"silencedetect=noise={noise}:d={d}", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    ev = [(m[0], float(m[1])) for m in re.findall(r"silence_(start|end): ([0-9.]+)", log)]
    dur = len(load(path)) / SR
    spans, cur = [], 0.0
    for kind, t in ev:
        if kind == "start":
            if t - cur > 0.15: spans.append((cur, t))
        else: cur = t
    if dur - cur > 0.15: spans.append((cur, dur))
    return spans


def fade(x, ms=8):
    n = min(int(SR * ms / 1000), len(x) // 2)
    if n: x[:n] *= np.linspace(0, 1, n); x[-n:] *= np.linspace(1, 0, n)
    return x


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--take", type=int, default=3)
    a = ap.parse_args()
    nar = load(os.path.join(HERE, "takes", "narrator_take1.mp3"))
    mia_path = os.path.join(HERE, "takes", f"mia_take{a.take}.mp3")
    mia = load(mia_path)
    lines = speech_spans(mia_path)
    assert len(lines) == 2, f"expected 2 lines in {mia_path}, found {lines}"
    out, pos = [], 0.0
    for (cut, resume, slot), (s, e) in zip(SLOTS, lines):
        clip = fade(mia[int((s - 0.03) * SR):int((e + 0.08) * SR)].copy())
        assert LEAD + len(clip) / SR <= slot, f"line {e - s:.2f}s does not fit the {slot}s slot"
        pad = np.zeros(int(slot * SR), np.float32); pad[int(LEAD * SR):int(LEAD * SR) + len(clip)] = clip
        out += [fade(nar[int(pos * SR):int(cut * SR)].copy(), 4), pad]
        pos = resume
    out.append(fade(nar[int(pos * SR):].copy(), 4))
    y = np.concatenate(out)
    dst = os.path.join(HERE, "voiceover.mp3")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "libmp3lame", "-b:a", "192k", dst],
                   input=y.tobytes(), check=True)
    print(f"take {a.take}: {len(y) / SR:.2f}s -> {dst}")


if __name__ == "__main__":
    main()
