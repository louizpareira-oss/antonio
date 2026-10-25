"""Rear Left full film: cut every scene's narration from the chosen ElevenLabs takes, lay the 74 scenes out on one
timeline, and write the voice, car-speaker, ambience and caption tracks plus story/shots.json.

  python3 projects/rear-left/audio/build_timeline.py

Narration sources (ElevenLabs eleven_v4, Charliee; word times from Scribe, delivery tags dropped):
  part A take 1 QF1yHvzvu4GZGT1VfRil  SC01-SC13     part B take 1 B7MeoOr9kUDrePUl5ioe  SC15-SC40
  part C take 1 fhsEbyquR8rnraUAXqPA  SC46-SC64     part D take 2 IAiaoBarTbhWc1iDsG7G  SC65-SC74
  slice take B QnE5hpdDPtaNpeaMva7D   SC41-SC45 (the approved vertical slice, kept with its exact internal timing)
"""
import contextlib, importlib.util, io, json, os, re, sys
import numpy as np
from scipy import signal

HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(HERE); ROOT = os.path.dirname(os.path.dirname(P))
sys.path.insert(0, os.path.join(ROOT, "audio")); sys.path.insert(0, os.path.join(ROOT, "tools"))
from dsp import SR, secs, db, rms_db, write_wav, hp, lp, bp, noise
from common import load_audio

spec = importlib.util.spec_from_file_location("bp", os.path.join(P, "story", "build_package.py")); bpm = importlib.util.module_from_spec(spec)
argv = sys.argv; sys.argv = ["bp", os.path.join(P, "build", "_pkg")]
with contextlib.redirect_stdout(io.StringIO()): spec.loader.exec_module(bpm)
sys.argv = argv
S = bpm.S

norm = lambda w: re.sub(r"[^a-z0-9']", "", w.lower())
PARTS = {"A": ("partA_1.mp3", 1, 13), "B": ("partB_1.mp3", 15, 40), "C": ("partC_1.mp3", 46, 64), "D": ("partD_2.mp3", 65, 74)}
num = lambda s: int(s["id"][2:])

# ---------- per-scene word times in their source take ----------
src_audio, scene_words = {}, {}
for k, (fn, a, b) in PARTS.items():
    src_audio[k] = load_audio(os.path.join(P, "input", fn), SR, mono=True)
    tr = json.load(open(os.path.join(P, "timeline", "scribe", f"part{k}.json")))
    words = [w for w in tr["words"] if w.get("type", "word") == "word" and not w["text"].startswith("[") and not w["text"].endswith("]")]
    i = 0
    for s in S:
        if not (a <= num(s) <= b) or not s["narr"]: continue
        toks = s["narr"].split(); seg = words[i:i + len(toks)]
        assert [norm(t) for t in toks] == [norm(w["text"]) for w in seg], (s["id"], toks, [w["text"] for w in seg])
        scene_words[s["id"]] = (k, [(t, w["start"], w["end"]) for t, w in zip(toks, seg)]); i += len(toks)
    assert i == len(words), (k, i, len(words))

# The approved slice (SC41-SC45) keeps its exact internal timing; offsets are from SC41's start.
SLICE = json.load(open(os.path.join(P, "timeline", "words_slice.json")))
SLICE_SHOTS = {"SC41": (0.0, 6.30), "SC42": (6.30, 9.06), "SC43": (9.06, 11.75), "SC44": (11.75, 16.60), "SC45": (16.60, 19.60)}
slice_src = load_audio(os.path.join(P, "input", "slice_takeB.mp3"), SR, mono=True)

# ---------- layout ----------
LEAD = {"SC01": .6, "SC48": .6, "SC54": .7, "SC09": 2.4, "SC14": 1.2, "SC29": 1.4, "SC04": .35, "SC66": .4, "SC67": .5, "SC68": .4}
SILENT = {"SC09": 3.6, "SC14": 2.2, "SC29": 2.6}
MIN = {"CARD": 2.2, "ECU": 1.6, "CU": 1.6, "M": 1.9, "W": 2.1}
TAIL = .38
t = 0.0; timing = {}; vo_place = []; words_global = []
for s in S:
    sid = s["id"]
    if sid in SLICE_SHOTS:
        if sid == "SC41": slice0 = t
        a, b = SLICE_SHOTS[sid]; timing[sid] = (slice0 + a, slice0 + b); t = slice0 + b; continue
    if s["tag"] == "CARD" and sid != "SC09":  # a beat of breathing room before each rule card, given to the previous shot
        pid = S[S.index(s) - 1]["id"]; timing[pid] = (timing[pid][0], timing[pid][1] + .2); t += .2
    lead = LEAD.get(sid, .25)
    if not s["narr"]:
        timing[sid] = (t, t + SILENT.get(sid, 2.0)); t = timing[sid][1]; continue
    k, ws = scene_words[sid]; x = src_audio[k]
    c0, c1 = max(0, ws[0][1] - .06), ws[-1][2] + .14
    vo_place.append((k, c0, c1, t + lead)); off = t + lead - c0
    words_global += [{"word": w, "start": round(a + off, 3), "end": round(b + off, 3), "scene": sid} for w, a, b in ws]
    dur = max(MIN[s["tag"]], lead + (c1 - c0) + TAIL + s["hold"])
    timing[sid] = (t, t + dur); t += dur
timing["SC74"] = (timing["SC74"][0], timing["SC74"][1] + .4); TOTAL = round(timing["SC74"][1], 3)

# Slice words (narrator and hijack) shifted onto the global timeline.
for w in SLICE["words"]:
    sid = "SC41" if w["start"] < 6.30 else "SC42" if w["start"] < 9.06 else "SC43" if w["start"] < 11.75 else "SC44"
    words_global.append({"word": w["word"], "start": round(w["start"] + slice0, 3), "end": round(w["end"] + slice0, 3), "scene": sid})
words_global.sort(key=lambda w: w["start"])

# ---------- audio tracks ----------
n = secs(TOTAL + 1)
voice = np.zeros(n, np.float32)
def fades(x, fi=.02, fo=.06):
    x = x.copy(); x[:secs(fi)] *= np.linspace(0, 1, secs(fi)); x[-secs(fo):] *= np.linspace(1, 0, secs(fo)); return x
for k, c0, c1, at in vo_place:
    seg = fades(src_audio[k][secs(c0):secs(c1)]); i = secs(at); voice[i:i + len(seg)] += seg
# Level-match each part to part A's spoken level so the takes sit together.
ref = rms_db(src_audio["A"][np.abs(src_audio["A"]) > db(-40)])
for k in "BCD":
    g = db(ref - rms_db(src_audio[k][np.abs(src_audio[k]) > db(-40)]))
    for kk, c0, c1, at in vo_place:
        if kk == k: i = secs(at); voice[i:i + secs(c1 - c0)] *= g
# Slice narrator parts (SC41, SC44) exactly as approved.
for a0, a1, off in [(0.00, 5.40, .50), (12.04, len(slice_src) / SR, -.01)]:
    seg = fades(slice_src[secs(a0):secs(a1)]); seg *= db(ref - rms_db(slice_src[np.abs(slice_src) > db(-40)]))
    i = secs(slice0 + a0 + off); voice[i:i + len(seg)] += seg
v_rms = rms_db(voice[np.abs(voice) > db(-40)])

# Car-speaker hijack (SC42-SC43): same processing as the approved slice.
h = fades(slice_src[secs(6.25):secs(11.06)]); h = lp(hp(h, 220, 4), 5200, 4); h = h + .35 * bp(h, 1800, 3200, 2)
h = np.tanh(h / np.abs(h).max() * 1.8) / np.tanh(1.8)
ir = np.zeros(secs(.12), np.float32); ir[0] = 1
for ms, gg in [(3.1, .45), (5.3, .35), (7.9, .28), (11.2, .22), (13.7, .16), (17.9, .1)]: ir[secs(ms / 1000)] += gg
ir += (noise(secs(.12), seed=9) * np.exp(-np.arange(secs(.12)) / secs(.03)) * .12).astype(np.float32)
h = .6 * h + .4 * signal.fftconvolve(h, ir)[:len(h)]; h *= db(v_rms - rms_db(h[np.abs(h) > db(-40)]))
hij = np.zeros((n, 2), np.float32); i = secs(slice0 + 6.25 + .5); hij[i:i + len(h), 0] = h; hij[i + secs(.0004):i + len(h), 1] = h[:len(h) - secs(.0004)]

# Ambience: road while driving, idle at the red light, shop and forecourt in the flashback, garage hush after the engine stops.
tt = np.arange(n) / SR
def road(level):
    r = lp(noise(n, seed=3, color="brown"), 180, 2); r /= np.abs(r).max()
    hs = bp(noise(n, seed=4, color="pink"), 700, 2600, 2); hs /= np.abs(hs).max()
    x = .8 * r + level * .18 * hs + .12 * (.6 * np.sin(2 * np.pi * 41 * tt) + .3 * np.sin(2 * np.pi * 82 * tt + 1.3)); return (x * db(-22 - rms_db(x))).astype(np.float32)
ROAD, IDLE = road(1.0), None
idle = (.5 * lp(noise(n, seed=5, color="brown"), 120, 2) / 1 + .25 * np.sin(2 * np.pi * 29 * tt)).astype(np.float32); IDLE = idle * db(-30 - rms_db(idle))
shop = (.3 * np.sin(2 * np.pi * 60 * tt) + .12 * np.sin(2 * np.pi * 120 * tt) + .5 * bp(noise(n, seed=6, color="pink"), 300, 3000, 2)).astype(np.float32); SHOP = shop * db(-34 - rms_db(shop))
yard = (.6 * lp(noise(n, seed=7, color="pink"), 900, 2) + .1 * np.sin(2 * np.pi * 120 * tt)).astype(np.float32); YARD = yard * db(-33 - rms_db(yard))
hush = lp(noise(n, seed=8, color="pink"), 400, 2).astype(np.float32); HUSH = hush * db(-46 - rms_db(hush))
def span(a, b): return timing[a][0], timing[b][1]
BEDS = [(ROAD, *span("SC01", "SC08")), (ROAD, timing["SC09"][0] + 2.2, timing["SC09"][1]), (SHOP, *span("SC10", "SC10")), (YARD, *span("SC11", "SC14")),
        (ROAD, *span("SC15", "SC30")), (IDLE, *span("SC31", "SC36")), (ROAD, *span("SC37", "SC58")), (IDLE, *span("SC59", "SC63")),
        (HUSH, *span("SC64", "SC74"))]
amb = np.zeros(n, np.float32)
for bed, a, b in BEDS:
    i0, i1 = secs(a), min(n, secs(b)); w = np.ones(i1 - i0, np.float32); f = min(secs(.25), len(w) // 2)
    w[:f] = np.linspace(0, 1, f); w[-f:] = np.linspace(1, 0, f); amb[i0:i1] += bed[i0:i1] * w
amb = np.stack([amb, np.roll(amb, secs(.011))], 1)

write_wav(os.path.join(P, "input", "voiceover.wav"), np.stack([voice, voice], 1))
write_wav(os.path.join(P, "input", "hijack_car.wav"), hij)
write_wav(os.path.join(P, "input", "ambience.wav"), amb)

# Waveform envelope for the call screen, on the global timeline.
hop = SR // 60; fr = np.sqrt(np.add.reduceat(hij[:, 0] ** 2, np.arange(0, n, hop)) / hop)
json.dump({"rate": 60, "env": [round(float(v), 3) for v in np.clip((20 * np.log10(fr + 1e-9) + 42) / 36, 0, 1)]}, open(os.path.join(P, "timeline", "hijack_env.json"), "w"))

# ---------- captions ----------
HIJACK = {"SC42", "SC43"}
phrases = []
for s in S:
    ws = [w for w in words_global if w["scene"] == s["id"]]
    if not ws: continue
    sent, cur = [], []
    for w in ws:
        cur.append(w)
        if re.search(r"[.?!]$", w["word"]): sent.append(cur); cur = []
    if cur: sent.append(cur)
    for sw in sent:
        txt = " ".join(w["word"] for w in sw); chunks = [sw]
        if len(txt) > 30:
            cut = next((i + 1 for i, w in enumerate(sw[:-1]) if w["word"].endswith(",")), None)
            if cut is None:
                mid = len(txt) / 2; acc = 0; cut = 1
                for i, w in enumerate(sw[:-1]):
                    acc += len(w["word"]) + 1
                    if acc >= mid: cut = i + 1; break
            chunks = [sw[:cut], sw[cut:]]
        for ch in chunks:
            c = {"start": round(ch[0]["start"] - .05, 3), "end": round(ch[-1]["end"] + .3, 3), "text": " ".join(w["word"] for w in ch), "highlight": []}
            if s["id"] in HIJACK: c.update(highlight=[norm(w["word"]) for w in ch], highlightColor="#9fc4ff")
            phrases.append(c)
for a, b in zip(phrases, phrases[1:]): a["end"] = min(a["end"], b["start"])
json.dump(phrases, open(os.path.join(P, "timeline", "phrases.json"), "w"), indent=1)
json.dump({"source": "ElevenLabs Scribe timings per chosen take (see audio/build_timeline.py); delivery tags removed.",
           "words": [{k: w[k] for k in ("word", "start", "end")} for w in words_global]}, open(os.path.join(P, "timeline", "words.json"), "w"), indent=1)

# ---------- shots + sound cues ----------
def tick(at, pitch=1.0, gain=-22): return {"at": at, "name": "tick", "pitch": pitch, "gain": gain}
def ding(at, pitch=1.6, gain=-20, dur=1.0): return {"at": at, "name": "ding", "pitch": pitch, "gain": gain, "dur": dur}
def swish(at, pitch=.6, gain=-26, dur=.4): return {"at": at, "name": "swish", "pitch": pitch, "gain": gain, "dur": dur}
SFX = {
 "SC01": [ding(.55)], "SC05": [{"at": "flickers?", "name": "hit", "pitch": .5, "gain": -22}], "SC07": [tick("Once.", .9, -16)],
 "SC08": [tick(.3, .75, -16), tick(.45, .78, -17), tick(.6, .8, -18), tick(.75, .8, -26)],
 "SC10": [ding(.3, 2.2, -26, .8), {"at": 1.4, "name": "impact", "pitch": .45, "gain": -32, "dur": .6}],
 "SC11": [{"at": a, "name": "footstep", "gain": -24} for a in (.3, .8, 1.3)], "SC12": [swish(.5, .8)], "SC13": [tick("fixed", 1.2, -20)],
 "SC18": [{"at": .4, "name": "whoosh", "gain": -20, "dur": 1.0}], "SC20": [tick("flickers", .5, -30), tick("harder", .5, -30)],
 "SC24": [swish(.2, 1.0, -30)], "SC26": [ding("Look.", 1.6, -21)], "SC27": [swish(.5, .4, -30)], "SC28": [ding(.3, 1.6, -22)],
 "SC31": [swish("stop", .5, -24, .7), tick("red.", 1.4, -26)], "SC35": [ding(a, 1.3, -22, .8) for a in ("chime.-.3", "chime.+.7", "chime.+1.7", "chime.+2.7", "chime.+3.7")],
 "SC37": [tick(.1, 1.4, -26)], "SC40": [swish(.3, 1.0, -30)], "SC46": [{"at": .3, "name": "wind", "gain": -30, "dur": 2}],
 "SC48": [swish(.2, .35, -26, .7)], "SC49": [tick("on.", 1.6, -26)], "SC50": [swish("tips", .6, -22), swish("sinks.", .35, -24, .7)],
 "SC53": [swish("Don't.", .35, -28, .5)], "SC54": [tick(.0, .6, -14)], "SC57": [tick(.4, 1.0, -24), tick(.9, 1.0, -24)],
 "SC59": [swish(.3, .4, -24, .9)], "SC60": [tick("Press", .9, -18), {"at": "visor.", "name": "hum", "gain": -28, "dur": 3.0}],
 "SC61": [{"at": .2, "name": "hum", "gain": -28, "dur": 2.5}], "SC62": [{"at": "nothing.", "name": "impact", "pitch": .6, "gain": -18, "dur": 1.2}],
 "SC63": [tick("unlocks.", .8, -18), tick("unlocks.+.12", .8, -18), tick("unlocks.+.24", .8, -18), tick("unlocks.+.36", .8, -18)],
 "SC64": [tick("off.", .7, -18)], "SC65": [tick(a, .5, -32) for a in (.2, 1.1, 2.3)],
 "SC66": [ding("five", 1.6, -30)], "SC67": [{"at": "paid.", "name": "impact", "pitch": .45, "gain": -24, "dur": .6}],
 "SC68": [tick(a, .7, g) for a, g in (("Lock", -20), ("Lock+.2", -21), ("Lock+.4", -22), ("Lock+.6", -30))],
 "SC69": [tick("garage.", 1.2, -24)], "SC71": [tick(.05, 1.4, -24)],
 "SC72": [tick(a, 1.8, -28) for a in (.3, .45, .6, .75, .9, 1.05)] + [tick("Click.", .7, -14)],
}
def resolve(sid, at, t0):
    if isinstance(at, (int, float)): return float(at)
    m = re.match(r"(.+?)([+-][\d.]+)?$", at); key, d = m.group(1), float(m.group(2) or 0)
    q = norm(key.rstrip("?"))
    w = next(w for w in words_global if w["scene"] == sid and norm(w["word"]) == q)
    return round(w["start"] - t0 + d, 3)
shots = []
for s in S:
    a, b = timing[s["id"]]
    sh = {"id": s["id"], "start": round(a, 3), "end": round(b, 3), "line": s["narr"], "scene": s["framing"], "purpose": s["purpose"],
          "visual_change": s["prop"], "asset": f"car-v1:{s['tag']}", "in": {"type": "cut"}, "captions": True,
          "params": {"w": [[norm(w["word"]), round(w["start"] - a, 3), round(w["end"] - a, 3)] for w in words_global if w["scene"] == s["id"]]},
          "sfx": [{**c, "at": resolve(s["id"], c["at"], a)} for c in SFX.get(s["id"], [])]}
    shots.append(sh)
by = {s["id"]: s for s in shots}
by["SC42"]["sfx"] = [{"at": .27, "name": "blip", "gain": -20, "pitch": .75}]; by["SC44"]["sfx"] = [{"at": 0, "name": "static", "gain": 3, "dur": .14}]
by["SC45"]["sfx"] = [{"at": .9, "name": "whoosh", "gain": -22, "dur": 1.4}, {"at": 1.0, "name": "hum", "gain": -30, "dur": 1.6}]
by["SC41"]["sfx"] = [tick(4.6, .6, -26)]
for sid in ("SC02", "SC10", "SC15", "SC66", "SC67", "SC68", "SC69"): by[sid]["in"] = {"type": "fade", "dur": .4}
by["SC09"]["captions"] = False
S_ = lambda sid: by[sid]["start"]
music = [{"start": 0, "end": S_("SC09"), "mood": "dread", "intensity": .3}, {"start": S_("SC09"), "end": S_("SC15"), "mood": "unease", "intensity": .22},
         {"start": S_("SC15"), "end": S_("SC38"), "mood": "dread", "intensity": .32}, {"start": S_("SC38"), "end": S_("SC47"), "mood": "unease", "intensity": .26},
         {"start": S_("SC47"), "end": S_("SC56"), "mood": "dread", "intensity": .42}, {"start": S_("SC56"), "end": S_("SC65"), "mood": "unease", "intensity": .3},
         {"start": S_("SC65"), "end": TOTAL, "mood": "void", "intensity": .34}]
story = {"title": "Rear Left", "duration": TOTAL, "shots": shots, "music": music,
         "sfx": [{"t": 0.0, "name": "input/ambience.wav", "gain": 4}, {"t": 0.0, "name": "input/hijack_car.wav", "gain": 11.5}]}
json.dump(story, open(os.path.join(P, "story", "shots.json"), "w"), indent=1, ensure_ascii=False)
json.dump({sid: [round(a, 2), round(b, 2)] for sid, (a, b) in timing.items()}, open(os.path.join(P, "timeline", "scene_times.json"), "w"), indent=1)
print(f"{len(shots)} shots, {TOTAL:.1f}s; voice rms {v_rms:.1f} dB; slice block {slice0:.2f}-{slice0 + 19.6:.2f}; breach at {slice0 + 6.9:.1f}s ({100 * (slice0 + 6.9) / TOTAL:.0f}%)")
