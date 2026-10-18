"""story/build_shots.py — build story/shots.json for NIGHT SUPPORT 001 from the timeline.

  python projects/ns001-empty-seat/story/build_shots.py

Each SHOTS row covers narration sentences [first, last] and names an ns.js template plus its params.
Times inside params are seconds from the shot start, computed from the word timings, so a re-voiced
narration only needs a new timeline and a re-run.
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(HERE)
S = json.load(open(os.path.join(PROJ, "timeline", "sentences.json")))
W = json.load(open(os.path.join(PROJ, "timeline", "words.json")))["words"]
END = round(W[-1]["end"] + 1.6, 2)
RED, GREEN, AMBER, CYAN, WHITE = "#ff3b30", "#34c759", "#ffc04d", "#ffc04d", "#f2f2f2"
norm = lambda s: re.sub(r"[^\w']", "", s.lower())


def shot_start(i):
    return 0.0 if i == 0 else round(S[i]["start"] - 0.18, 2)


class Ctx:
    def __init__(self, first, last):
        self.t0 = shot_start(first); self.first, self.last = first, last
    def L(self, i):                                  # local start of sentence i
        return round(S[i]["start"] - self.t0, 2)
    def Lw(self, i, word, nth=0):                    # local start of a word inside sentence i
        hits = [w for w in W if S[i]["start"] - 0.01 <= w["start"] <= S[i]["end"] + 0.01 and norm(w["word"]) == norm(word)]
        return round(hits[nth]["start"] - self.t0, 2)


RULE_BG = {1: ("cockpit", {"beep": True}, [0, 150, 1]), 2: ("carTop", {"moving": True, "passenger": "empty"}, [300, 40, 0.92]),
           3: ("road", {"lights": True}, [0, 60, 1]), 4: ("radio", {}, [230, 150, 0.78]), 5: ("redLight", {}, [80, 60, 0.9]),
           6: ("carTop", {"motion": 0}, [300, 40, 0.92]), 7: ("route", {"drawDur": 2.0}, [160, 110, 0.82])}


def rule(n, title):
    return lambda c: dict(tpl="rule", n=n, title=title, bgTpl=RULE_BG[n][0], bgParams=RULE_BG[n][1], bgShift=RULE_BG[n][2], push=0.04)


# (first sentence, last sentence, params(ctx), extra shot fields)
SHOTS = [
    (0, 0, lambda c: dict(tpl="cockpit", beep=True, beepFrom=0.3, glance=c.Lw(0, "look"), status=["PASSENGER SEAT: EMPTY", GREEN], push=0.06), {"in": {"type": "fade", "dur": 0.6}}),
    (1, 1, lambda c: dict(tpl="carTop", moving=True, passenger="empty", say=[dict(str="DO NOT REACH ACROSS", at=0.05, col=RED, size=64)], sayOpts=dict(y=150)), {}),
    (2, 2, lambda c: dict(tpl="text", say=[dict(str="AND DO NOT,", at=0), dict(str="UNDER ANY CIRCUMSTANCES,", at=c.Lw(2, "under")),
                                           dict(str="BUCKLE IT IN.", at=c.Lw(2, "buckle"), col=RED, size=140)]), {}),
    (3, 4, lambda c: dict(tpl="carTop", passenger="bag", status=["PASSENGER: 3.1 KG", AMBER]), {}),
    (5, 5, lambda c: dict(tpl="carTop", passenger="groceries", status=["PASSENGER: 9.8 KG", AMBER]), {}),
    (6, 6, lambda c: dict(tpl="carTop", passenger="pizza", status=["PASSENGER: 1.9 KG", AMBER]), {}),
    (7, 7, lambda c: dict(tpl="carTop", passenger="pizza", belt=True, beepFrom=c.Lw(7, "beeping"), status=["BUCKLE UP", RED],
                          say=[dict(str="OCCUPANT: PIZZA", at=c.Lw(7, "beeping"), col=RED, size=56, mono=True)], sayOpts=dict(y=150)), {}),
    (8, 8, lambda c: dict(tpl="carTop", passenger="pizza", vanish=c.Lw(8, "moved"), status=["PASSENGER SEAT: EMPTY", GREEN]), {}),
    (9, 9, lambda c: dict(tpl="cockpit", status=["PASSENGER SEAT: EMPTY", GREEN], push=0.06), {}),
    (10, 10, lambda c: dict(tpl="cockpit", beep=True, beepFrom=0, heat=True, heatAmt=0.7, status=["PASSENGER SEAT: OCCUPIED", RED], glitch=[[0, 0.35, 0.9]], push=0.08), {"in": {"type": "glitch", "dur": 0.35}}),
    (11, 13, lambda c: dict(tpl="rules7", homeAt=c.L(12), whoAt=c.L(13), push=0.02), {}),
    (14, 15, lambda c: dict(tpl="sensor", padAt=0.4), {}),
    (16, 16, lambda c: dict(tpl="sensor", padAt=0, weight=68.4, weighAt=c.Lw(16, "weighs"), beepFrom=c.Lw(16, "buckle")), {}),
    (17, 18, lambda c: dict(tpl="text", say=[dict(str="THE CAR DOES NOT KNOW", at=0), dict(str="WHAT A PERSON IS.", at=c.Lw(17, "person")),
                                             dict(str="IT ONLY KNOWS WHAT ONE WEIGHS.", at=c.L(18), col=CYAN, size=72, mono=True)]), {}),
    (19, 19, lambda c: dict(tpl="sensor", padAt=0, weight=68.4, weighAt=0.1, cls="UNKNOWN", outline=c.Lw(19, "something"), outlineCol=RED,
                            beepFrom=0.3, glitch=[[c.Lw(19, "exactly"), c.Lw(19, "exactly") + 0.5, 0.8]]), {}),
    (20, 21, rule(1, "DO NOT LOOK AT THE SEAT"), {"in": {"type": "glitch", "dur": 0.3}}),
    (22, 23, lambda c: dict(tpl="cockpit", beep=True, checks=[["EYES: ROAD", c.L(22) + 0.2], ["HANDS: WHEEL", c.L(23) + 0.2]]), {}),
    (24, 25, lambda c: dict(tpl="cockpit", beep=True, glance=c.Lw(24, "glance"), status=["EVERYBODY DOES", AMBER]), {}),
    (26, 28, lambda c: dict(tpl="cockpit", beep=True, mirror="tilt", mirrorAt=c.Lw(26, "tilt"), status=["MIRROR: SET FOR THE ROAD", GREEN]), {}),
    (29, 30, rule(2, "DO NOT PUT ANYTHING ON THE SEAT"), {"in": {"type": "glitch", "dur": 0.3}}),
    (31, 31, lambda c: dict(tpl="carTop", moving=True, passenger="empty", toss=c.Lw(31, "toss")), {}),
    (32, 33, lambda c: dict(tpl="text", say=[dict(str="DO NOT GIVE IT A REASON.", at=0), dict(str="DO NOT GIVE IT ANYTHING.", at=c.L(33), col=RED)]), {}),
    (34, 34, lambda c: dict(tpl="carTop", moving=True, passenger="bag", vanish=c.Lw(34, "come") - 0.2, status=["ITEMS RETURNED: 0", RED],
                            glitch=[[c.Lw(34, "come") - 0.2, c.Lw(34, "come") + 0.3, 0.7]]), {}),
    (35, 36, rule(3, "TAKE THE LIT ROADS"), {"in": {"type": "glitch", "dur": 0.3}}),
    (37, 38, lambda c: dict(tpl="road", lights=True, period=2.4, push=0.03), {}),
    (39, 40, lambda c: dict(tpl="road", lights=True, period=2.4, meter=True, push=0.02), {}),
    (41, 43, lambda c: dict(tpl="road", lights=True, period=2.4, meter=True, beepMode="none", noneAt=c.L(41) + 0.6,
                            status=["IT HAS GOTTEN USED TO YOU", RED], glitch=[[c.L(42), c.L(42) + 0.4, 0.8]], push=0.05), {}),
    (44, 45, rule(4, "LET IT CHOOSE THE MUSIC"), {"in": {"type": "glitch", "dur": 0.3}}),
    (46, 46, lambda c: dict(tpl="radio", mode="change", at=c.Lw(46, "changes")), {}),
    (47, 48, lambda c: dict(tpl="text", say=[dict(str="PASSENGERS PICK THE MUSIC.", at=0), dict(str="EVERYBODY KNOWS THAT.", at=c.L(48), col=CYAN, size=64, mono=True)]), {}),
    (49, 50, lambda c: dict(tpl="radio", mode="taste", xAt=c.L(50)), {}),
    (51, 53, lambda c: dict(tpl="radio", mode="volume", at=0.3, hideAt=c.L(53)), {}),
    (54, 55, rule(5, "DO NOT STOP UNTIL YOU ARE HOME"), {"in": {"type": "glitch", "dur": 0.3}}),
    (56, 58, lambda c: dict(tpl="cross", items=[["GAS", c.L(56)], ["FOOD", c.L(57)], ["TIRES", c.L(58)]]), {}),
    (59, 59, lambda c: dict(tpl="redLight", zoom=1.0, push=0.05), {}),
    (60, 62, lambda c: dict(tpl="redLight", zoom=1.7, panX=-90, taps=[c.Lw(60, "tap"), c.Lw(60, "tap") + 0.35, c.Lw(60, "tap") + 0.7],
                            say=[dict(str="NOT THE PASSENGER WINDOW.", at=c.L(61), size=60), dict(str="YOURS.", at=c.L(62), col=RED, size=130)],
                            sayOpts=dict(y=210), glitch=[[c.L(62), c.L(62) + 0.5, 0.9]], push=0.04), {}),
    (63, 64, rule(6, "WHEN YOU PARK, DO NOT LOOK IN THE BACK SEAT"), {"in": {"type": "glitch", "dur": 0.3}}),
    (65, 66, lambda c: dict(tpl="carTop", passenger="empty", motion=0.5, status=["REAR OCCUPANT ALERT: ON", CYAN],
                            say=[dict(str="ULTRASONIC REAR-SEAT SENSOR", at=0.6, col=CYAN, size=40, mono=True)], sayOpts=dict(y=150)), {}),
    (67, 67, lambda c: dict(tpl="carTop", passenger="empty", motion=0.1, lock=c.Lw(67, "lock")), {}),
    (68, 68, lambda c: dict(tpl="carTop", passenger="empty", motion=0, lock=0, alarm=c.Lw(68, "honks"), status=["MOVEMENT DETECTED", RED]), {}),
    (69, 70, lambda c: dict(tpl="checklist", rows=[["A CHILD", True, c.Lw(69, "child")], ["A DOG", True, c.Lw(69, "dog")], ["THIS", False, c.L(70) + 0.7]]), {}),
    (71, 72, lambda c: dict(tpl="park", lockAt=0.2, walkAt=c.L(72)), {}),
    (73, 74, lambda c: dict(tpl="phone", at=0.4, noAt=c.L(74)), {}),
    (75, 76, lambda c: dict(tpl="carTop", passenger="empty", motion=0, lock=0, shape=c.L(76), status=["REAR SEAT: OCCUPIED", RED],
                            glitch=[[c.L(76) + 1.0, c.L(76) + 1.5, 0.9]]), {}),
    (77, 78, rule(7, "DO NOT TRY TO REMEMBER THE DRIVE"), {"in": {"type": "glitch", "dur": 0.3}}),
    (79, 80, lambda c: dict(tpl="route", drawDur=c.L(80) + 2.2), {}),
    (81, 84, lambda c: dict(tpl="route", drawDur=0.4, marks=[["TURN ?", c.L(81)], ["LIGHT ?", c.L(82)]], gapAt=c.L(83)), {}),
    (85, 86, lambda c: dict(tpl="autopilot", badgeAt=0.4, mindAt=c.Lw(86, "mind") - 0.2), {}),
    (87, 89, lambda c: dict(tpl="cockpit", beep=True, driver="mind", mindAt=c.L(88), status=["MIND: MOVED ONE SEAT RIGHT", RED]), {}),
    (90, 90, lambda c: dict(tpl="sensor", padAt=0, weight=68.4, weighAt=0.2, cls="YOU", outline=0.6, outlineCol=WHITE), {}),
    (91, 92, lambda c: dict(tpl="cockpit", driver="void", passenger="you", status=["DRIVER: UNKNOWN", RED], glitch=[[0, 0.5, 1.0]], push=0.06), {"in": {"type": "flash", "dur": 0.4}}),
    (93, 93, lambda c: dict(tpl="cockpit", driver="void", passenger="you", beep=True, beepFrom=0, push=0.05), {}),
    (94, 94, lambda c: dict(tpl="cockpit", driver="void", passenger="you", push=0.16, glitch=[[1.9, 2.5, 1.0]]), {}),
    (95, 97, lambda c: dict(tpl="end", noCaptions=True, push=0.02, lines=[["THANK YOU FOR CALLING NIGHT SUPPORT.", 0.2], ["PLEASE DRIVE SAFELY.", c.L(96)],
                                                                     ["SOMEONE HAS TO.", c.L(97), RED]]), {"in": {"type": "dip", "dur": 0.8}}),
]

# ---------- sound ----------
def chimes(p, dur):
    """one dashboard ding per blink, matching ns.js (1.25 Hz; silent under streetlights; stops when 'used to you')."""
    out, frm = [], p.get("beepFrom", 0)
    if not (p.get("beep") or p["tpl"] == "road" or "beepFrom" in p): return out
    n = 0
    while n / 1.25 < dur:
        t = n / 1.25; n += 1
        if t < frm: continue
        if p["tpl"] == "road":
            per = p.get("period", 2.4)
            if p.get("lights") and ((t / per) % 1) < 0.32: continue
            if p.get("beepMode") == "none" and t >= p.get("noneAt", 0): continue
        out.append({"at": round(t, 2), "name": "chime", "gain": -9})
    return out


def sfx_for(p, c, dur, k):
    cues = chimes(p, dur)
    tpl = p["tpl"]
    if tpl == "rule": cues += [{"at": 0.0, "name": "glitch", "gain": -14}, {"at": 0.35, "name": "blip", "gain": -12}]
    if "toss" in p: cues.append({"at": p["toss"] + 0.6, "name": "thud", "gain": -12})
    if "vanish" in p and k != 7: cues.append({"at": p["vanish"], "name": "static", "gain": -14})
    if "taps" in p: cues += [{"at": t, "name": "tap", "gain": -2} for t in p["taps"]]
    if "alarm" in p: cues += [{"at": p["alarm"], "name": "horn", "gain": -10}, {"at": p["alarm"] + 1.6, "name": "phonebuzz", "gain": -12}]
    if tpl == "phone": cues.append({"at": p["at"], "name": "phonebuzz", "gain": -10})
    if "shape" in p: cues.append({"at": p["shape"], "name": "stinger", "gain": -9})
    if "outline" in p and p.get("outlineCol") == RED: cues.append({"at": p["outline"], "name": "stinger", "gain": -10})
    if "mindAt" in p and tpl == "cockpit": cues += [{"at": p["mindAt"], "name": "whoosh", "gain": -12}, {"at": 0, "name": "heartbeat", "gain": -16, "dur": dur}]
    if tpl == "radio" and p.get("mode") == "change": cues += [{"at": p["at"] + 0.7 * i, "name": "static", "gain": -18, "dur": 0.3} for i in range(4)]
    if tpl == "radio" and p.get("mode") == "volume": cues.append({"at": p["hideAt"], "name": "whisper", "gain": -18})
    if tpl == "cross": cues += [{"at": at + 0.25, "name": "hit", "gain": -16} for _, at in p["items"]]
    for a, b, _ in p.get("glitch", []): cues.append({"at": a, "name": "glitch", "gain": -12})
    return cues


AMB = {"cockpit": "car_interior", "road": "car_interior", "carTop": "car_interior", "redLight": "car_interior", "sensor": "car_interior",
       "radio": "car_interior", "park": "roomtone_low", "phone": "roomtone_low", "route": "hum_evil", "autopilot": "hum_evil"}

shots = []
for k, (a, b, fn, extra) in enumerate(SHOTS):
    c = Ctx(a, b)
    start = c.t0; end = shot_start(SHOTS[k + 1][0]) if k + 1 < len(SHOTS) else END
    dur = round(end - start, 2); p = fn(c)
    s = {"id": f"s{k + 1:03d}", "start": start, "end": end, "line": " ".join(S[i]["text"] for i in range(a, b + 1)),
         "scene": p["tpl"], "params": p, "in": extra.get("in", {"type": "cut"}), "sfx": sfx_for(p, c, dur, k)}
    if p["tpl"] in AMB: s["amb"] = {"name": AMB[p["tpl"]], "gain": -26}
    if k >= 49: s["amb"] = {"name": "silence_thick", "gain": -22}
    shots.append(s)

music = [{"start": 0, "end": 29.0, "mood": "unease", "intensity": 0.35}, {"start": 29.0, "end": 53.2, "mood": "tension", "intensity": 0.45},
         {"start": 53.2, "end": 102.0, "mood": "tension", "intensity": 0.55}, {"start": 102.0, "end": 141.1, "mood": "dread", "intensity": 0.6},
         {"start": 141.1, "end": 178.7, "mood": "dread", "intensity": 0.72}, {"start": 178.7, "end": 204.0, "mood": "void", "intensity": 0.5},
         {"start": 204.0, "end": 217.6, "mood": "terror", "intensity": 0.8}, {"start": 217.6, "end": END, "mood": "void", "intensity": 0.3}]
story = {"title": "If Your Car Ever Beeps For The Empty Passenger Seat... DON'T LOOK", "duration": END, "shots": shots, "music": music}
json.dump(story, open(os.path.join(HERE, "shots.json"), "w"), indent=1)
print(f"{len(shots)} shots, {END}s, avg {END / len(shots):.2f}s/shot")
