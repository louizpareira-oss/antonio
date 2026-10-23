"""Builds story/shots.json from the shot plan below. Each shot starts LEAD s before the first word of its anchor
phrase (searched forward in timeline/words.json), so the cuts follow the real voiceover.

  python3 projects/control-the-universe/story/plan.py
"""
import json, os, re
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEAD = 0.15
import subprocess
DURATION = round(float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", os.path.join(P, "input/voiceover.mp3")], capture_output=True, text=True).stdout) + 0.6, 2)
W = json.load(open(os.path.join(P, 'timeline/words.json')))['words']
N = [re.sub(r"[^a-z0-9']", '', w['word'].lower().replace('’', "'")) for w in W]

# (anchor phrase, file, set, bars, transition, scene)
PLAN = [
 # 01 hook, the rule, Grandma
 ("can one person", "01_hook", "kitchen", "none", "cut", "EXTREME CLOSE-UP, frame 1: coffee frozen in mid-air, drops hanging, your wide eye behind it"),
 ("not in a movie", "01_hook", "title", "none", "cut", "TITLE: CAN ONE PERSON REALLY CONTROL THE UNIVERSE? the six stones orbiting"),
 ("this morning at seven", "01_hook", "kitchen", "none", "cut", "KITCHEN 7:59: the clock, you reaching for the mug"),
 ("your coffee stopped falling", "01_hook", "kitchen", "none", "cut", "The mug tips; the coffee stops in the air"),
 ("it's just hanging there", "01_hook", "kitchen", "none", "cut", "LOW CLOSE: the coffee one inch from the floor"),
 ("and there's a gold stone", "01_hook", "kitchen", "none", "cut", "Your hand opens: the gold stone, glowing, hum rings"),
 ("last night six lights", "01_hook", "backyard", "none", "dip", "GRANDMA'S BACKYARD at night: six lights streak down"),
 ("six stones", "01_hook", "backyard", "none", "cut", "The crater: six stones glowing in the grass"),
 ("time space energy", "01_hook", "title", "none", "cut", "The six stones line up, names light up one by one"),
 ("here's the rule", "01_hook", "diagram", "none", "cut", "DIAGRAM: a stone, arrow GIVES to you"),
 ("and every stone takes something back", "01_hook", "diagram", "none", "cut", "DIAGRAM: arrow TAKES back from you"),
 ("remember that", "01_hook", "face", "none", "cut", "BIG FACE: you, uneasy"),
 ("grandma rosa was", "01_hook", "backyard", "none", "dip", "Grandma at her telescope; name card GRANDMA ROSA · ASTRONOMER"),
 ("that one's vega", "01_hook", "backyard", "none", "cut", "Grandma points; Vega sparkles (bubble)"),
 ("that one's a plane", "01_hook", "backyard", "none", "cut", "A plane blinks across; Grandma squints; you laugh"),
 ("lately she forgets", "01_hook", "kitchen", "none", "cut", "Grandma searching the kitchen for her glasses"),
 ("they're on her head", "01_hook", "kitchen", "none", "cut", "CLOSE: the glasses on her head; you smile"),
 ("sometimes your name", "01_hook", "face", "none", "cut", "CLOSE: Grandma looks at you, blank"),
 ("but she never forgets a star", "01_hook", "backyard", "none", "cut", "Grandma at the window with the stars, peaceful"),
 # 02 the fun part
 ("day one", "02_fun", "bedroom", "none", "dip", "BEDROOM: alarm 7:59, you jump out of bed, late"),
 ("you freeze time", "02_fun", "street", "none", "cut", "You snap; the street freezes (blue tint, a bird mid-flap)"),
 ("walk past the frozen bus", "02_fun", "street", "none", "cut", "You stroll past the frozen bus and people mid-step"),
 ("and sit down early", "02_fun", "classroom", "none", "cut", "CLASSROOM: you sit, time starts, the teacher blinks"),
 ("math test", "02_fun", "classroom", "none", "cut", "INSERT: the test, question 4 wrong"),
 ("you rewind ten seconds", "02_fun", "classroom", "none", "cut", "REWIND: the answer un-writes, -10 s"),
 ("blink you're first", "02_fun", "cafeteria", "none", "cut", "CAFETERIA: blink, you pop in at the front of the line"),
 ("blink ramen in tokyo", "02_fun", "tokyo", "none", "cut", "TOKYO ramen stall: blink, you're eating"),
 ("blink back before the bell", "02_fun", "classroom", "none", "cut", "Classroom: blink, back in your seat as the bell rings"),
 ("every dead phone", "02_fun", "classroom", "none", "cut", "Phones in your hand charge 0 -> 100 %; Theo holds his out"),
 ("broccoli turns into fries", "02_fun", "cafeteria", "none", "cut", "INSERT: broccoli turns into fries"),
 ("and every stone you touch", "02_fun", "insert", "none", "cut", "CLOSE: stones snapping into the badge on your chest"),
 ("by friday you have gloves", "02_fun", "street", "none", "cut", "Gloves, then boots appear on you"),
 ("and a cape", "02_fun", "street", "none", "cut", "The red cape bursts out behind you"),
 ("you didn't ask for the cape", "02_fun", "face", "none", "cut", "BIG FACE: deadpan, the cape flapping into frame"),
 # 03 the curse
 ("but every stone takes", "03_curse", "insert", "none", "cut", "The badge flickers; the light goes cold"),
 ("when you freeze time you keep living", "03_curse", "street", "none", "cut", "Frozen city; you alone, shadows sweeping as your hours pass"),
 ("by sunday you're nine days older", "03_curse", "bedroom", "none", "cut", "Calendar: +9 days; mirror: tired eyes"),
 ("every teleport leaves a hole", "03_curse", "diagram", "none", "cut", "DIAGRAM: the air rushing into the hole you leave"),
 ("boom", "03_curse", "classroom", "none", "cut", "Thunderclap ring; the school windows crack"),
 ("the mind stone has no off switch", "03_curse", "insert", "none", "cut", "The OFF switch, stuck on ON; the violet stone glowing"),
 ("at the football game", "03_curse", "stadium", "none", "dip", "STADIUM: thought bubbles everywhere"),
 ("one of them is your best friend's", "03_curse", "stadium", "none", "cut", "Theo in the stands, looking at you"),
 ("i liked him better before", "03_curse", "stadium", "none", "cut", "Theo's thought bubble; your face, hurt"),
 ("and six stones together", "03_curse", "street", "none", "cut", "You in the full suit, a ripple bending the space around you"),
 ("just a few billionths", "03_curse", "diagram", "none", "cut", "Counter 0.000000003 s"),
 ("that's enough every gps", "03_curse", "phone", "none", "cut", "PHONE: the map dot jumping, RECALCULATING"),
 ("map apps send cars", "03_curse", "street", "none", "cut", "Cars driving into the river"),
 ("nasa calls it the anomaly", "03_curse", "nasa", "none", "cut", "NASA screen: ANOMALY"),
 ("it's you", "03_curse", "face", "none", "cut", "The red dot zooms to you on a rooftop in the suit"),
 # 04 is any of this real?
 ("so is any of this real", "04_science", "blueprint", "none", "dip", "BLUEPRINT title: IS ANY OF THIS REAL?"),
 ("time really does bend", "04_science", "space", "none", "cut", "Space-time grid bending around the Earth"),
 ("clocks on gps satellites", "04_science", "space", "none", "cut", "GPS satellite over the Earth; clock +38 millionths of a second a day"),
 ("without a fix", "04_science", "phone", "none", "cut", "Map: your dot drifting 10 KM away"),
 ("teleporting people", "04_science", "blueprint", "none", "cut", "A person scanner, crossed out"),
 ("but in twenty seventeen", "04_science", "real", "none", "cut", "REAL: China, 2017: a light beam from the ground to a satellite 1,400 km up"),
 ("energy", "04_science", "blueprint", "none", "cut", "A paperclip on the blueprint"),
 ("turn one paperclip", "04_science", "blueprint", "none", "cut", "Paperclip = 21 kilotons vs Hiroshima 15 kilotons"),
 ("and there's a jellyfish", "04_science", "ocean", "none", "cut", "A jellyfish shrinking back into a baby polyp"),
 ("scientists call it", "04_science", "ocean", "none", "cut", "Name tag IMMORTAL JELLYFISH (REAL)"),
 ("every power is real", "04_science", "blueprint", "none", "cut", "The six stones, each with its real fact icon"),
 ("just never all in one hand", "04_science", "insert", "none", "cut", "Your gloved hand holding all six, too bright"),
 # 05 Grandma, the price, the twist
 ("one night grandma doesn't know you", "05_grandma", "living", "none", "dip", "GRANDMA'S LIVING ROOM at night: she turns to you"),
 ("she sees the cape", "05_grandma", "living", "none", "cut", "Grandma steps back from the glowing suit"),
 ("who are you", "05_grandma", "face", "none", "cut", "CLOSE: Grandma, scared (bubble)"),
 ("the life stone fixes", "05_grandma", "insert", "none", "cut", "The pink LIFE stone in your palm"),
 ("a memory for a memory", "05_grandma", "diagram", "none", "cut", "A memory bubble floating from your head to hers"),
 ("you press it into her hand", "05_grandma", "living", "none", "cut", "Your hands and hers, pink glow"),
 ("she blinks", "05_grandma", "face", "none", "cut", "CLOSE: Grandma's eyes clear; she smiles"),
 ("there you are", "05_grandma", "living", "none", "cut", "Grandma touches your face (bubble)"),
 ("you get one perfect day", "05_grandma", "observatory", "none", "dip", "THE OLD OBSERVATORY: the dome opens; you and Grandma"),
 ("and you realise you can't remember", "05_grandma", "face", "none", "cut", "BIG FACE: a memory frame above your head goes blank"),
 ("that's what the stone took", "05_grandma", "insert", "none", "cut", "The pink stone dims"),
 ("you were six", "05_grandma", "flashback", "none", "cut", "FLASHBACK: little you in pyjamas under a coat at the telescope (bubble)"),
 ("i said yes", "05_grandma", "observatory", "none", "cut", "The stars twinkle back"),
 ("then she goes quiet", "05_grandma", "observatory", "none", "cut", "Grandma looks at the stones on your chest"),
 ("i've seen these stones", "05_grandma", "flashback", "none", "cut", "1969 FLASHBACK: young Grandma, six lights over the same backyard (bubble)"),
 ("same backyard", "05_grandma", "backyard", "none", "cut", "The same house, 1969 and today"),
 ("that night nasa picks up", "05_grandma", "nasa", "none", "dip", "NASA radar: six new dots"),
 ("they're not falling", "05_grandma", "space", "none", "cut", "Six lights slowing down, braking rings"),
 ("they're coming back for whoever", "05_grandma", "face", "none", "cut", "BIG FACE: you look up; the badge glows"),
 ("your coffee stops falling", "05_grandma", "kitchen", "none", "cut", "KITCHEN: the coffee freezes again; your hands are empty"),
 ("if you could keep only one", "05_grandma", "end", "none", "dip", "END SCREEN: which stone would YOU keep? comment, subscribe, cast"),
]

def find(phrase, frm):
    toks = [re.sub(r"[^a-z0-9']", '', x) for x in phrase.lower().replace('-', ' ').split()]
    toks = [t for t in toks if t]
    nn = [n.replace('-', '') for n in N]
    for i in range(frm, len(N)):
        j, k = i, 0
        while k < len(toks) and j < len(N):
            a = re.sub(r'[^a-z0-9\']', '', W[j]['word'].lower().replace('-', ' ').split()[0]) if W[j]['word'].strip() else ''
            word = re.sub(r"[^a-z0-9' ]", '', W[j]['word'].lower().replace('-', ' ').replace('’', "'")).split()
            # a script word may hold two tokens ("high-five", "forty-two")
            for wpart in word:
                if k < len(toks) and wpart == toks[k]: k += 1
                else: k = -1; break
            if k < 0: break
            j += 1
        if k == len(toks): return i
    raise SystemExit(f'anchor not found after word {frm}: {phrase!r}')

shots, pos = [], 0
for n, (anchor, file, st, bars, tr, scene) in enumerate(PLAN, 1):
    i = find(anchor, pos); pos = i + 1
    start = 0.0 if n == 1 else round(max(0, W[i]['start'] - LEAD), 2)
    shots.append({'id': f's{n:03d}', 'start': start, 'set': st, 'bars': bars, 'in': {'type': tr, 'dur': 0.35} if tr != 'cut' else {'type': 'cut'},
                  'scene': scene, 'notes': f'shots/{file}.js', '_w': i})
for a, b in zip(shots, shots[1:] + [None]):
    a['end'] = b['start'] if b else DURATION
    wi, wj = a.pop('_w'), (b['_w'] if b else len(W))
    a['line'] = ' '.join(w['word'] for w in W[wi:wj])
shots = [{k: s[k] for k in ['id', 'start', 'end', 'line', 'scene', 'set', 'bars', 'in', 'notes']} for s in shots]
for s in shots:
    if s['end'] - s['start'] < 0.6: print('SHORT', s['id'], round(s['end'] - s['start'], 2), s['line'])
out = os.path.join(P, 'story/shots.json')
old = json.load(open(out)) if os.path.exists(out) else {}
json.dump({'title': "Can One Person Really Control the Universe?", 'duration': DURATION, 'shots': shots,
           'music': old.get('music', []), 'sfx': old.get('sfx', [])}, open(out, 'w'), indent=1, ensure_ascii=False)
d = sorted(s['end'] - s['start'] for s in shots)
print(f'{len(shots)} shots, median {d[len(d)//2]:.2f} s, max {d[-1]:.2f} s ({[s["id"] for s in shots if s["end"]-s["start"]==d[-1]]}), {len(shots)/(DURATION/60):.1f}/min')
