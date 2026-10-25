"""Rear Left vertical slice (SC41-SC45): cut the chosen narration take into its three parts, place them on the slice
timeline, process the hijack lines as car speakers, and write the road bed, word/phrase timings and the waveform envelope.

  python3 projects/rear-left/audio/prep_slice.py

Source: input/slice_takeB.mp3 (ElevenLabs eleven_v4, Charliee, generation QnE5hpdDPtaNpeaMva7D).
Word times come from ElevenLabs Scribe on that take; pauses cross-checked with ffmpeg silencedetect.
"""
import json, os, sys
import numpy as np
from scipy import signal

HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(HERE); ROOT = os.path.dirname(os.path.dirname(P))
sys.path.insert(0, os.path.join(ROOT, "audio")); sys.path.insert(0, os.path.join(ROOT, "tools"))
from dsp import SR, secs, db, rms_db, write_wav, hp, lp, bp, noise
from common import load_audio

DUR = 19.6
src = load_audio(os.path.join(P, "input", "slice_takeB.mp3"), SR, mono=True)
# (source start, source end, timeline offset): narrator, hijack, narrator correction
PARTS = {"narr1": (0.00, 5.40, +0.50), "hijack": (6.25, 11.06, +0.50), "narr2": (12.04, len(src) / SR, -0.01)}
cut = lambda a, b: src[secs(a):secs(b)].copy()
def fades(x, fi=0.02, fo=0.06):
    x[:secs(fi)] *= np.linspace(0, 1, secs(fi)); x[-secs(fo):] *= np.linspace(1, 0, secs(fo)); return x

n = secs(DUR + 0.5)
voice = np.zeros(n, np.float32)
for k in ("narr1", "narr2"):
    a, b, off = PARTS[k]; x = fades(cut(a, b)); i = secs(a + off); voice[i:i + len(x)] += x
v_rms = rms_db(voice[np.abs(voice) > db(-40)])

# Hijack: the same voice coming out of the car's door speakers. Band-limited, a little driven, short cabin reflections.
a, b, off = PARTS["hijack"]; h = fades(cut(a, b))
h = lp(hp(h, 220, 4), 5200, 4)
h = h + 0.35 * bp(h, 1800, 3200, 2)                      # small speaker presence bump
h = np.tanh(h / np.abs(h).max() * 1.8) / np.tanh(1.8)    # mild drive
ir = np.zeros(secs(0.12), np.float32); ir[0] = 1.0
for ms, g in [(3.1, .45), (5.3, .35), (7.9, .28), (11.2, .22), (13.7, .16), (17.9, .1)]: ir[secs(ms / 1000)] += g
tail = noise(secs(0.12), seed=9) * np.exp(-np.arange(secs(0.12)) / secs(0.03)) * 0.12; ir += tail.astype(np.float32)
wet = signal.fftconvolve(h, ir)[:len(h)]
h = 0.6 * h + 0.4 * wet
h *= db(v_rms - rms_db(h[np.abs(h) > db(-40)]))          # match the narrator's level before the mix gain
L = h; R = np.concatenate([np.zeros(secs(0.0004), np.float32), h])[:len(h)]
hij = np.zeros((n, 2), np.float32); i = secs(a + off); hij[i:i + len(h), 0] = L; hij[i:i + len(h), 1] = R

# Road bed: low tyre rumble, a band of tyre hiss and a steady engine hum; it does not duck for the car speakers.
t = np.arange(n) / SR
rumble = lp(noise(n, seed=3, color="brown"), 180, 2); rumble /= np.abs(rumble).max()
hiss = bp(noise(n, seed=4, color="pink"), 700, 2600, 2); hiss /= np.abs(hiss).max()
hum = 0.6 * np.sin(2 * np.pi * 41 * t) + 0.3 * np.sin(2 * np.pi * 82 * t + 1.3)
road = (0.8 * rumble + 0.18 * hiss + 0.12 * hum).astype(np.float32)
road *= db(-22 - rms_db(road))
road = np.stack([road, np.roll(road, secs(0.011))], 1)

os.makedirs(os.path.join(P, "input"), exist_ok=True); os.makedirs(os.path.join(P, "timeline"), exist_ok=True)
write_wav(os.path.join(P, "input", "voiceover.wav"), np.stack([voice, voice], 1))
write_wav(os.path.join(P, "input", "hijack_car.wav"), hij)
write_wav(os.path.join(P, "input", "road_bed.wav"), road)

# Waveform envelope for the call screen (SC43): hijack level at 60 Hz on the slice timeline, 0..1.
hop = SR // 60; mono = np.abs(hij[:, 0]); fr = np.sqrt(np.add.reduceat(mono ** 2, np.arange(0, n, hop)) / hop)
lv = np.clip((20 * np.log10(fr + 1e-9) + 42) / 36, 0, 1)
json.dump({"rate": 60, "env": [round(float(x), 3) for x in lv]}, open(os.path.join(P, "timeline", "hijack_env.json"), "w"))

# Scribe word times (take B, delivery tags removed), mapped onto the slice timeline.
W = [("See", .16, .32), ("a", .36, .4), ("face", .48, .72), ("at", .76, .8), ("the", .88, .96), ("rear", 1.08, 1.2), ("window,", 1.28, 1.88),
     ("and", 2.08, 2.16), ("you'll", 2.24, 2.4), ("brake.", 2.48, 3.08), ("And", 3.36, 3.44), ("braking", 3.6, 4.16), ("is", 4.24, 4.48), ("slow.", 4.72, 5.12),
     ("Pull", 6.4, 6.56), ("over", 6.64, 6.88), ("under", 7.0, 7.12), ("the", 7.16, 7.2), ("next", 7.28, 7.44), ("streetlight.", 7.52, 8.48),
     ("Get", 8.64, 8.72), ("out", 8.8, 9.04), ("and", 9.12, 9.28), ("check", 9.36, 9.44), ("the", 9.52, 9.6), ("rear-left", 9.68, 10.0), ("latch", 10.08, 10.32), ("yourself.", 10.44, 10.96),
     ("Please", 12.16, 12.32), ("disregard", 12.4, 12.88), ("that", 12.96, 13.04), ("last", 13.12, 13.28), ("instruction.", 13.36, 14.32),
     ("Do", 14.44, 14.56), ("not", 14.68, 14.8), ("take", 14.88, 15.04), ("your", 15.12, 15.2), ("foot", 15.28, 15.36), ("off", 15.44, 15.52), ("the", 15.56, 15.6), ("gas.", 15.84, 16.32)]
off = lambda s: PARTS["narr2"][2] if s >= 12 else PARTS["narr1"][2]
words = [{"word": w, "start": round(s + off(s), 3), "end": round(e + off(s), 3)} for w, s, e in W]
json.dump({"source": "Scribe timings for take QnE5hpdDPtaNpeaMva7D; narrator +0.50 s, hijack +0.50 s, correction -0.01 s.", "words": words},
          open(os.path.join(P, "timeline", "words.json"), "w"), indent=1)
BLUE = "#9fc4ff"
def cue(a, b, txt, hijack=False):
    c = {"start": a, "end": b, "text": txt, "highlight": []}
    if hijack: c.update(highlight=txt.replace(".", "").split(), highlightColor=BLUE)
    return c
phrases = [cue(.62, 2.45, "See a face at the rear window,"), cue(2.45, 3.75, "and you'll brake."), cue(3.75, 5.75, "And braking is slow."),
           cue(6.86, 7.45, "Pull over", True), cue(7.45, 9.06, "under the next streetlight.", True),
           cue(9.10, 10.10, "Get out and check", True), cue(10.10, 11.60, "the rear-left latch yourself.", True),
           cue(12.10, 12.92, "Please disregard"), cue(12.92, 14.38, "that last instruction."),
           cue(14.40, 15.38, "Do not take your foot"), cue(15.38, 16.55, "off the gas.")]
json.dump(phrases, open(os.path.join(P, "timeline", "phrases.json"), "w"), indent=1)
print(f"voice rms {v_rms:.1f} dB; hijack {words[14]['start']:.2f}-{words[27]['end']:.2f}; correction {words[28]['start']:.2f}-{words[-1]['end']:.2f}")
