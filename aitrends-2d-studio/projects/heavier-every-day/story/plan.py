"""Builds story/shots.json from the shot plan below. Each shot starts LEAD s before the first word of its anchor
phrase (searched forward in timeline/words.json), so the cuts follow the real voiceover.

  python3 projects/heavier-every-day/story/plan.py
"""
import json, os, re
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEAD, DURATION = 0.15, 506.0
W = json.load(open(os.path.join(P, 'timeline/words.json')))['words']
N = [re.sub(r"[^a-z0-9']", '', w['word'].lower().replace('’', "'")) for w in W]

# (anchor phrase, file, set, bars, transition, scene)
PLAN = [
 # 01 hook
 ("day seven", "01_hook", "insert", "wide", "cut", "EXTREME CLOSE-UP, frame 1: your sneaker sinking into the asphalt, cracks radiating; DAY 7 · 8,960 kg"),
 ("you take one step", "01_hook", "street", "wide", "cut", "LOW ANGLE street: your foot lifts and comes down, the road dents like wet sand"),
 ("and your shoe sinks", "01_hook", "insert", "wide", "cut", "CLOSE: the shoe sinks ankle-deep, asphalt bulges around it"),
 ("like it's wet sand", "01_hook", "street", "wide", "cut", "WIDE: you stand in a trail of deep footprints, neighbours staring"),
 ("day eight", "01_hook", "street", "wide", "cut", "DRIVEWAY: Mom's car, DAY 8 · 17,920 kg"),
 ("you lean on your mom's car", "01_hook", "street", "wide", "cut", "MEDIUM: you rest a hand on the car roof"),
 ("and the roof caves in", "01_hook", "street", "wide", "cut", "the roof crumples under your hand, glass pops; Mom's shocked face"),
 ("day nine", "01_hook", "river", "wide", "cut", "golden river, the old bridge; DAY 9"),
 ("the bridge to your grandpa's", "01_hook", "river", "wide", "cut", "WIDE: the bridge, Grandpa's house with a porch on the far bank"),
 ("ten tonnes maximum", "01_hook", "insert", "wide", "cut", "INSERT: the round 10 t weight-limit sign"),
 ("you weigh thirty six", "01_hook", "face", "wide", "cut", "BIG FACE: you stare at the sign; badge 35,840 kg"),
 ("and tonight at midnight", "01_hook", "insert", "wide", "cut", "INSERT: clock 11:59 → 12:00, ×2 stamp"),
 ("what if you got two times", "01_hook", "title", "scope", "fade", "TITLE: you on a cracking road at golden hour, the ground bending under you; WHAT IF YOU GOT 2× HEAVIER EVERY DAY?"),
 # 02 rules
 ("it starts on a monday", "02_rules", "bathroom", "wide", "dip", "ESTABLISH: bright bathroom morning, MON; you step onto the scale"),
 ("you step on the bathroom scale", "02_rules", "insert", "wide", "cut", "INSERT: the scale digits roll up to 140 kg"),
 ("yesterday it said seventy", "02_rules", "insert", "wide", "cut", "INSERT: a ghost 70 kg crossed out; SUN on the calendar"),
 ("your mom says the scale is broken", "02_rules", "bathroom", "wide", "cut", "MEDIUM: Mom taps the scale and shrugs"),
 ("so you buy a new one", "02_rules", "insert", "wide", "cut", "INSERT: a new scale box opens"),
 ("it says the same thing", "02_rules", "insert", "wide", "cut", "INSERT: the new scale says 140 kg too; your deadpan feet"),
 ("you look exactly the same", "02_rules", "bathroom", "wide", "cut", "BIG FACE in the bathroom mirror, unchanged"),
 ("same size", "02_rules", "ui", "none", "cut", "MEDICAL CHART UI: HEIGHT 172 cm ✓, X-RAY normal ✓"),
 ("same face", "02_rules", "ui", "none", "cut", "MEDICAL CHART UI: WEIGHT 140 kg ⚠ ?!"),
 ("you can still walk run and jump", "02_rules", "living", "wide", "cut", "LIVING ROOM: you jump, the landing cracks the floor tiles"),
 ("your body keeps up", "02_rules", "face", "wide", "cut", "BIG FACE: you grin, flex"),
 ("everything else doesn't", "02_rules", "living", "wide", "cut", "INSERT: a chair splits under you"),
 ("because every night at the stroke", "02_rules", "bedroom", "wide", "cut", "NIGHT bedroom: midnight clock, ×2 stamp glows"),
 ("day one you weigh as much", "02_rules", "ladder", "none", "cut", "WEIGHT LADDER: a seesaw, you vs a gorilla; the gorilla flies up; DAY 1 140 kg"),
 ("day two a piano", "02_rules", "ladder", "none", "cut", "SEESAW: you vs a piano; DAY 2 280 kg"),
 ("day three a horse", "02_rules", "ladder", "none", "cut", "SEESAW: you vs a horse; DAY 3 560 kg"),
 ("day four a car", "02_rules", "ladder", "none", "cut", "SEESAW: you vs a car; DAY 4 1,120 kg"),
 ("by day seven you weigh", "02_rules", "ladder", "none", "cut", "SEESAW: you vs a T. rex; DAY 7 8,960 kg"),
 ("and by day twenty", "02_rules", "ladder", "none", "zoom", "ZOOM OUT: the Titanic on the other end, and you still win; DAY 20 73,400 t"),
 # 03 lake
 ("at first it's kind of awesome", "03_lake", "face", "wide", "cut", "BIG FACE: grinning, thumbs up"),
 ("nobody can push you over", "03_lake", "school", "wide", "cut", "SCHOOL HALL: a big kid shoves you and bounces off"),
 ("in gym class the whole team", "03_lake", "gym", "wide", "cut", "GYM: the whole class pulls the rope against you"),
 ("and you don't move an inch", "03_lake", "gym", "wide", "cut", "CLOSE: your feet planted; the coach's whistle drops from his mouth"),
 ("but there's one person", "03_lake", "living", "wide", "cut", "you pick up a framed photo"),
 ("your grandpa", "03_lake", "insert", "wide", "cut", "INSERT photo: you and Grandpa at the lake, red lifeguard jacket"),
 ("every summer since you were five", "03_lake", "lake", "wide", "dip", "SEPIA flashback: summer lake, the dock, little you and Grandpa"),
 ("he used to be a lifeguard", "03_lake", "lake", "wide", "cut", "SEPIA: young Grandpa on a lifeguard chair, whistle"),
 ("he's the one who taught you", "03_lake", "lake", "wide", "cut", "SEPIA: Grandpa in the water, little you on your back"),
 ("lie back", "03_lake", "face", "wide", "cut", "SEPIA BIG FACE: Grandpa, warm sun — his line"),
 ("trust the water", "03_lake", "lake", "wide", "cut", "SEPIA: little you floating, arms spread, Grandpa's hand lets go"),
 ("so on day three", "03_lake", "lake", "wide", "dip", "PRESENT: you run down the dock, Grandpa on the shore; DAY 3"),
 ("and you jump", "03_lake", "lake", "wide", "cut", "you mid-air off the end of the dock"),
 ("and you sink", "03_lake", "underwater", "wide", "cut", "UNDERWATER: you plunge like a stone, a column of bubbles"),
 ("straight to the bottom", "03_lake", "underwater", "wide", "cut", "you thud onto the lakebed, a sand cloud"),
 ("five meters down", "03_lake", "underwater", "wide", "cut", "LOOKING UP from the bottom: bright surface, light rays"),
 ("and then you walk out", "03_lake", "underwater", "wide", "cut", "CUT-AWAY of the lake: you walk up the slope along the bottom"),
 ("grandpa doesn't say a word", "03_lake", "lake", "wide", "cut", "SHORE: you come out dripping; Grandpa frozen"),
 ("he just wraps a towel", "03_lake", "lake", "wide", "cut", "Grandpa wraps a towel around your shoulders"),
 ("the water doesn't hold you up", "03_lake", "face", "wide", "cut", "BIG FACE: wet, sad, the towel"),
 # 04 house
 ("day four the stairs", "04_house", "home", "wide", "cut", "STAIRS: the steps snap under you; DAY 4"),
 ("day five at two in the morning", "04_house", "bedroom", "wide", "dip", "NIGHT bedroom: clock 2:00, you asleep; DAY 5"),
 ("your bed goes through the floor", "04_house", "cutaway", "wide", "cut", "CUTAWAY house: the bed crashes from the bedroom into the kitchen"),
 ("you move into the garage", "04_house", "garage", "wide", "cut", "GARAGE: you on a mattress on the concrete, a work lamp"),
 ("it's the only floor", "04_house", "garage", "wide", "cut", "Mom in the garage doorway with a plate, you on the floor"),
 ("day six you're as heavy", "04_house", "ladder", "none", "cut", "DAY 6: an elephant on the seesaw = you"),
 ("your best friend ties a rope", "04_house", "street", "wide", "cut", "STREET: your friend ties a rope from you to his dad's pickup"),
 ("and floors it", "04_house", "street", "wide", "cut", "the pickup lurches forward"),
 ("the tires scream", "04_house", "insert", "wide", "cut", "CLOSE: spinning tires, smoke"),
 ("the truck shakes", "04_house", "street", "wide", "cut", "the truck shudders, rope taut"),
 ("you don't move", "04_house", "street", "wide", "cut", "you, calm, sipping a juice box"),
 ("ten million people", "04_house", "ui", "none", "cut", "PHONE UI: the video plays, views roll to 10,000,000"),
 ("they call you the immovable kid", "04_house", "ui", "none", "cut", "NEWS SITE UI: THE IMMOVABLE KID"),
 ("day seven every step", "04_house", "street", "wide", "cut", "TOP VIEW: a trail of deep footprints in the road; DAY 7"),
 ("cars can't carry you", "04_house", "street", "wide", "cut", "a car bottoms out as you sit in it"),
 ("buses can't carry you", "04_house", "street", "wide", "cut", "a bus driver shakes his head, the bus tilts"),
 ("the city lays steel plates", "04_house", "street", "wide", "cut", "workers lay steel plates; you walk alone on them"),
 ("day eight you're as heavy", "04_house", "ladder", "none", "cut", "DAY 8: a fire truck on the seesaw = you"),
 ("your school asks you to stay home", "04_house", "ui", "none", "cut", "EMAIL UI from school: Please stay home"),
 ("the floors were built for students", "04_house", "school", "wide", "cut", "SCHOOL: classroom floor with a load sign 200 kg/m²"),
 ("not for you", "04_house", "face", "wide", "cut", "BIG FACE: sad, hood up, garage"),
 ("and day nine", "04_house", "river", "wide", "dip", "DUSK river; DAY 9"),
 ("the bridge", "04_house", "river", "wide", "cut", "the bridge, long lens"),
 ("your grandpa lives on the other side", "04_house", "river", "wide", "cut", "Grandpa's house across the river, porch light on"),
 ("the sign says ten tonnes", "04_house", "insert", "wide", "cut", "INSERT: 10 t sign"),
 ("you weigh thirty six as much", "04_house", "ladder", "none", "cut", "36 t: an 18-wheeler on the seesaw = you"),
 ("so he calls you every night", "04_house", "ui", "none", "cut", "VIDEO CALL UI: Grandpa on the phone; you small in the corner"),
 ("and every night he asks", "04_house", "garage", "wide", "cut", "GARAGE night: you on the floor, phone glow"),
 ("you still floating kiddo", "04_house", "face", "wide", "cut", "VIDEO CALL: Grandpa's big face, smiling — his line"),
 # 05 atlas
 ("that night a woman", "05_atlas", "garage", "wide", "cut", "NIGHT: the garage door rises, floodlights, Dr. Voss silhouette"),
 ("her badge says project atlas", "05_atlas", "insert", "wide", "cut", "INSERT: the PROJECT ATLAS badge"),
 ("she shows you what happens next", "05_atlas", "ui", "none", "cut", "ATLAS TABLET UI: forecast chart, weight by day"),
 ("day fourteen even solid rock", "05_atlas", "cutaway", "wide", "cut", "CUT-AWAY of the ground: you sinking into bedrock; DAY 14"),
 ("you'll sink into the ground", "05_atlas", "street", "wide", "cut", "each step punches a hole, you knee-deep"),
 ("day thirty one", "05_atlas", "blueprint", "none", "cut", "BLUEPRINT: you, pebbles pulled toward you, 1 g at 1 m; DAY 31"),
 ("the ground will start falling", "05_atlas", "cutaway", "wide", "cut", "CUT-AWAY: rock caving in around you"),
 ("day seventy seven", "05_atlas", "blueprint", "none", "cut", "BALANCE: you vs the Earth, the Earth goes up; DAY 77"),
 ("you can't stay on earth", "05_atlas", "face", "wide", "cut", "BIG FACE: Dr. Voss, cold light — her line"),
 ("atlas has one rocket", "05_atlas", "blueprint", "none", "cut", "BLUEPRINT: the Atlas rocket"),
 ("it can carry a hundred tonnes", "05_atlas", "blueprint", "none", "cut", "PAYLOAD BAR: limit 100 t"),
 ("tomorrow you'll weigh seventy two", "05_atlas", "blueprint", "none", "cut", "PAYLOAD BAR: 72 t fits ✓"),
 ("the day after", "05_atlas", "blueprint", "none", "cut", "PAYLOAD BAR: 143 t blows past the line ✗"),
 ("so if you go", "05_atlas", "ui", "none", "cut", "COUNTDOWN UI: LAUNCH TOMORROW 23:00"),
 ("before midnight", "05_atlas", "insert", "wide", "cut", "INSERT: midnight clock, red"),
 ("and you can never come back", "05_atlas", "face", "wide", "cut", "BIG FACE: you, the floodlight on your face"),
 ("by day twenty coming home", "05_atlas", "blueprint", "none", "cut", "re-entry: a fireball over a small town; DAY 20 = ASTEROID"),
 ("you have one day left", "05_atlas", "garage", "wide", "cut", "GARAGE: you sitting on the floor, alone"),
 ("and there's one person", "05_atlas", "insert", "wide", "cut", "INSERT: the photo of you and Grandpa on the garage wall"),
 # 06 river + launch
 ("day ten", "06_river", "river", "wide", "dip", "DAWN river, mist; DAY 10 · 72 t"),
 ("you can't cross the bridge", "06_river", "river", "wide", "cut", "the bridge with an Atlas barrier"),
 ("so you go under it", "06_river", "river", "wide", "cut", "you at the river edge in a brass diving helmet"),
 ("atlas gives you a diving helmet", "06_river", "river", "wide", "cut", "the Atlas boat with the air hose; you wade in"),
 ("down and down", "06_river", "underwater", "wide", "cut", "UNDERWATER: you walk down the slope, light rays"),
 ("fish slide past", "06_river", "underwater", "wide", "cut", "CLOSE: fish pass your helmet window"),
 ("somewhere above you", "06_river", "underwater", "wide", "cut", "LOOKING UP: the bridge's underside through the water"),
 ("on the other side your grandpa", "06_river", "river", "wide", "cut", "SUNRISE far bank: Grandpa waiting at the water's edge"),
 ("he's been there since sunrise", "06_river", "river", "wide", "cut", "Grandpa with a thermos, the sun behind him"),
 ("you can't hug him", "06_river", "river", "wide", "cut", "you come out of the river; you raise a hand: stop"),
 ("if you tripped", "06_river", "river", "wide", "cut", "IMAGINED: you trip, your shadow over Grandpa — red ✗"),
 ("so you sit on the riverbank", "06_river", "river", "wide", "cut", "you and Grandpa sitting one meter apart, 1 m line"),
 ("and he tells you the same thing", "06_river", "river", "wide", "cut", "Grandpa turns to you"),
 ("lie back", "06_river", "face", "wide", "cut", "BIG FACE: Grandpa, tears, sunrise rim — his line"),
 ("up there everything floats", "06_river", "river", "wide", "cut", "Grandpa points at the sky; you look up"),
 ("that night they lay you down", "06_river", "pad", "wide", "dip", "NIGHT launch pad: the rocket under floodlights"),
 ("eleven pm", "06_river", "ui", "none", "cut", "MISSION CONTROL UI: 23:00, PAYLOAD 72 t / 100 t"),
 ("one hour before midnight", "06_river", "insert", "wide", "cut", "INSERT: clock 23:00, 1 hour to midnight"),
 ("three", "06_river", "capsule", "wide", "cut", "COUNTDOWN 3: your face in the capsule"),
 ("two", "06_river", "capsule", "wide", "cut", "COUNTDOWN 2"),
 ("one", "06_river", "pad", "wide", "cut", "COUNTDOWN 1: ignition"),
 ("the whole launch pad shakes", "06_river", "pad", "wide", "cut", "LIFTOFF: smoke, the pad shaking"),
 ("for eight minutes", "06_river", "capsule", "wide", "cut", "your face pressed into the seat, g-meter"),
 ("and then", "06_river", "orbit", "wide", "cut", "the rocket in space, stage drops away"),
 ("the engines stop", "06_river", "capsule", "wide", "cut", "silence in the capsule"),
 ("and you float", "06_river", "capsule", "wide", "cut", "you lift off the seat"),
 ("for the first time since day one", "06_river", "capsule", "wide", "cut", "you floating, a smile"),
 ("you lie back", "06_river", "capsule", "wide", "cut", "you lie back in the air"),
 ("you spread your arms", "06_river", "capsule", "wide", "cut", "arms spread, the Earth in the window"),
 ("somewhere down there", "06_river", "river", "wide", "dip", "NIGHT: Grandpa on his porch looks up at a moving star"),
 # 07 science
 ("so is any of this real", "07_science", "blueprint", "none", "dip", "BLUEPRINT: IS ANY OF THIS REAL?"),
 ("not the doubling", "07_science", "blueprint", "none", "cut", "BLUEPRINT: the doubling curve crossed out"),
 ("and in real life", "07_science", "blueprint", "none", "cut", "BLUEPRINT: body outline, heart"),
 ("fighter pilots", "07_science", "blueprint", "none", "cut", "BLUEPRINT: a jet in a tight turn, 9 g"),
 ("and even they need special suits", "07_science", "blueprint", "none", "cut", "BLUEPRINT: pilot in a G-suit"),
 ("at eight times your weight", "07_science", "blueprint", "none", "cut", "BLUEPRINT: heart pumping blood up to the brain fails, 8×"),
 ("you'd faint", "07_science", "blueprint", "none", "cut", "BLUEPRINT: outline faints, eyes X"),
 ("floors have limits too", "07_science", "blueprint", "none", "cut", "BLUEPRINT: floor beam"),
 ("a normal house floor", "07_science", "blueprint", "none", "cut", "BLUEPRINT: a 1 m² tile, 200 kg"),
 ("on day five your bed", "07_science", "blueprint", "none", "cut", "BLUEPRINT: the bed, 1,000 kg on every m², ×5, beam cracks"),
 ("you float because", "07_science", "blueprint", "none", "cut", "BLUEPRINT: water tank, a body floats (air in lungs)"),
 ("double your weight", "07_science", "blueprint", "none", "cut", "BLUEPRINT: the 2× body sinks"),
 ("archimedes figured", "07_science", "blueprint", "none", "cut", "BLUEPRINT: Archimedes outline in a bath, ~250 BC; REAL"),
 ("the heavier something is", "07_science", "blueprint", "none", "cut", "BLUEPRINT: weight arrow down, friction arrow back"),
 ("that's friction", "07_science", "blueprint", "none", "cut", "BLUEPRINT: FRICTION label"),
 ("it's why the truck", "07_science", "blueprint", "none", "cut", "BLUEPRINT: the truck pulls, you don't move"),
 ("and every object pulls", "07_science", "blueprint", "none", "cut", "BLUEPRINT: two balls pulling each other"),
 ("right now you're pulling", "07_science", "blueprint", "none", "cut", "BLUEPRINT: you and your phone, tiny arrows"),
 ("just very very weakly", "07_science", "blueprint", "none", "cut", "BLUEPRINT: a magnifier on the tiny arrow"),
 ("in 1798", "07_science", "blueprint", "none", "cut", "BLUEPRINT: Cavendish's torsion balance in a shed; 1798; REAL"),
 ("make yourself heavy enough", "07_science", "blueprint", "none", "cut", "BLUEPRINT: the arrows grow huge"),
 ("and astronauts don't float", "07_science", "blueprint", "none", "cut", "BLUEPRINT: an astronaut in orbit, gravity arrow still there"),
 ("they float because they're falling", "07_science", "blueprint", "none", "cut", "BLUEPRINT: Newton's cannon, the ball falls around the Earth"),
 # 08 twist + end
 ("day twenty", "08_twist", "orbit", "wide", "dip", "ORBIT: the capsule over the Earth; DAY 20"),
 ("seventy three thousand tonnes", "08_twist", "capsule", "wide", "cut", "CAPSULE: badge 73,400 t"),
 ("heavier than the titanic", "08_twist", "capsule", "wide", "cut", "Titanic icon on the seesaw = you"),
 ("you're floating arms spread", "08_twist", "capsule", "wide", "cut", "you floating, arms spread"),
 ("then your pen drifts", "08_twist", "capsule", "wide", "cut", "the pen drifts across the capsule"),
 ("and stops on your chest", "08_twist", "capsule", "wide", "cut", "CLOSE: the pen lands on your chest"),
 ("it isn't floating anymore", "08_twist", "face", "wide", "cut", "BIG FACE: you stare at the pen"),
 ("it's falling", "08_twist", "capsule", "wide", "cut", "arrows: everything loose drifts toward you"),
 ("toward you", "08_twist", "face", "wide", "cut", "BIG FACE: eyes wide"),
 ("you left the earth", "08_twist", "orbit", "wide", "cut", "ORBIT: the tiny capsule and the big blue Earth"),
 ("but you're still going around", "08_twist", "orbit", "wide", "cut", "ORBIT DIAGRAM: every 92 min"),
 ("and on day fifty three", "08_twist", "orbit", "wide", "cut", "the ocean bulging toward the capsule more than toward the Moon; DAY 53"),
 ("what would you do", "08_twist", "end", "none", "fade", "END SCREEN: WHAT WOULD YOU DO IF YOU GOT 2× HEAVIER EVERY DAY? comment bubble, subscribe, cast, PART 2"),

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
json.dump({'title': "What If You Got 2x Heavier Every Single Day?", 'duration': DURATION, 'shots': shots,
           'music': old.get('music', []), 'sfx': old.get('sfx', [])}, open(out, 'w'), indent=1, ensure_ascii=False)
d = sorted(s['end'] - s['start'] for s in shots)
print(f'{len(shots)} shots, median {d[len(d)//2]:.2f} s, max {d[-1]:.2f} s ({[s["id"] for s in shots if s["end"]-s["start"]==d[-1]]}), {len(shots)/(DURATION/60):.1f}/min')
