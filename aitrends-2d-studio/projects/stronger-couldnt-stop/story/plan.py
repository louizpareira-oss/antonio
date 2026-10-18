"""Builds story/shots.json from the shot plan below. Each shot starts LEAD s before the first word of its anchor
phrase (searched forward in timeline/words.json), so the cuts follow the real voiceover.

  python3 projects/stronger-couldnt-stop/story/plan.py
"""
import json, os, re
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEAD, DURATION = 0.15, 476.0
W = json.load(open(os.path.join(P, 'timeline/words.json')))['words']
N = [re.sub(r"[^a-z0-9']", '', w['word'].lower().replace('’', "'")) for w in W]

# (anchor phrase, file, set, bars, transition, scene)
PLAN = [
 # 01 hook
 ("day six", "01_hook", "insert", "wide", "cut", "INSERT, first frame: a hand grips a phone; DAY 6 ×64 badge pops; the phone already bends"),
 ("you pick up your phone", "01_hook", "kitchen", "wide", "cut", "MEDIUM: bright morning kitchen, you lift the phone off the table, careful face"),
 ("and it folds in half", "01_hook", "insert", "wide", "cut", "INSERT: the phone folds like paper, glass sparks and shards; your shocked face blurred behind"),
 ("day seven", "01_hook", "street", "wide", "cut", "WIDE: sunny street, best friend jogs up with his hand raised for a high five; DAY 7 ×128"),
 ("you high-five your best friend", "01_hook", "street", "wide", "cut", "MEDIUM: palms meet, gold impact rings, a shock wave ripples the air"),
 ("and he lands in a hedge", "01_hook", "street", "wide", "cut", "WIDE: the friend arcs through the air into a hedge, leaves burst; you cringe"),
 ("day eight", "01_hook", "face", "wide", "cut", "BIG FACE: your nose twitches, eyes squeeze, about to sneeze; DAY 8 ×256"),
 ("you sneeze", "01_hook", "kitchen", "wide", "flash", "WIDE kitchen: ACHOO shock wave rings blast out from your head"),
 ("and every window in the kitchen cracks", "01_hook", "kitchen", "wide", "cut", "CLOSE: the kitchen windows crack into spiderwebs one after another"),
 ("and tomorrow", "01_hook", "bedroom", "wide", "dip", "NIGHT bedroom: you lie awake staring at your hands, clock 11:59"),
 ("you'll be twice as strong", "01_hook", "face", "scope", "cut", "BIG FACE, gold light: a giant ×2 burns behind you, the badge flips ×256 → ×512"),
 ("what if you got stronger", "01_hook", "title", "scope", "fade", "TITLE: you stand on a rooftop at golden hour, cracks spreading from your feet; WHAT IF YOU GOT STRONGER… AND COULDN'T STOP?"),
 # 02 math
 ("it starts on a monday", "02_math", "bedroom", "wide", "dip", "ESTABLISH: sunny bedroom morning, alarm clock rings, calendar MON, you sit up"),
 ("you wake up twice as strong", "02_math", "bedroom", "wide", "cut", "MEDIUM: you stretch and the headboard snaps; DAY 1 ×2"),
 ("on tuesday twice that again", "02_math", "bathroom", "wide", "cut", "MEDIUM: bathroom mirror, you squeeze the toothpaste and it explodes; DAY 2 ×4"),
 ("every single morning", "02_math", "data", "none", "cut", "DATA: sunrises flick past, a row of bars doubles ×2 ×4 ×8 ×16 ×32"),
 ("that doesn't sound scary", "02_math", "bedroom", "wide", "cut", "MEDIUM: you at your desk with a notebook, 2×2×2… the number runs off the page"),
 ("fold a sheet of paper", "02_math", "insert", "wide", "cut", "INSERT: hands fold a sheet of paper, fold counter 1 2 3…"),
 ("forty-two times", "02_math", "space", "none", "zoom", "SPACE: a paper tower rises from Earth to the Moon, 42 FOLDS ≈ 440,000 km"),
 ("that's what doubling does", "02_math", "data", "none", "cut", "DATA: the doubling curve draws on and shoots straight up"),
 ("day five", "02_math", "kitchen", "wide", "cut", "MEDIUM: you lift the fridge with one arm; ×32"),
 ("day ten a thousand", "02_math", "street", "wide", "cut", "WIDE: you hold a car over your head; ×1,024"),
 ("day twenty a million", "02_math", "harbor", "scope", "cut", "WIDE: tiny you holds up a giant ship in a harbour; ×1,048,576"),
 ("and it's not just your muscles", "02_math", "blueprint", "none", "zoom", "BLUEPRINT: your body outline, muscles light up gold"),
 ("your bones your tendons", "02_math", "blueprint", "none", "cut", "BLUEPRINT: bones, tendons, skin light up one by one with labels"),
 ("they all double too", "02_math", "blueprint", "none", "cut", "BLUEPRINT: ×2 stamps land on bones, tendons and skin"),
 ("everything about you gets stronger", "02_math", "face", "wide", "cut", "BIG FACE: determined, gold rim light"),
 ("everything around you stays the same", "02_math", "street", "wide", "cut", "WIDE: the street turns glassy — every object shows thin crack lines, only you are solid"),
 # 03 best week
 ("at first it's the best week", "03_bestweek", "street", "wide", "cut", "WIDE: sunny street, you walk with a big grin, gold + icon"),
 ("day one you carry", "03_bestweek", "street", "wide", "cut", "MEDIUM: you carry a mountain of grocery bags in one trip, mom amazed; DAY 1"),
 ("day two you open", "03_bestweek", "insert", "wide", "cut", "INSERT: the pickle jar lid pops off with one finger flick; DAY 2"),
 ("your dad gave up on", "03_bestweek", "face", "wide", "cut", "BIG FACE: dad (yellow cap), red-faced, jaw dropped"),
 ("day three you move the couch", "03_bestweek", "living", "wide", "cut", "WIDE living room: you hold the couch over your head with one hand; DAY 3"),
 ("and your mom finds the remote", "03_bestweek", "living", "wide", "cut", "MEDIUM: mom pulls a dusty remote from under the couch spot, joy; LOST: 2 YEARS"),
 ("day four you do one push-up", "03_bestweek", "living", "wide", "cut", "SIDE: you in push-up position on the rug; DAY 4"),
 ("and you hit the ceiling", "03_bestweek", "living", "wide", "cut", "WIDE: you launch up and slam into the ceiling, plaster rains down"),
 # 04 not fun
 ("then it stops being fun", "04_notfun", "living", "wide", "cut", "MEDIUM: you lie in plaster dust under the hole, grey − icon, cooler light"),
 ("day five pencils snap", "04_notfun", "insert", "wide", "cut", "INSERT: a pencil snaps in your fingers, a pile of broken pencils; DAY 5"),
 ("you write your history test", "04_notfun", "classroom", "wide", "cut", "MEDIUM classroom: you write a HISTORY TEST with a fat crayon, teacher frowns"),
 ("day six your phone folds", "04_notfun", "insert", "wide", "cut", "INSERT: the phone folds again (callback); DAY 6"),
 ("you buy a new one", "04_notfun", "store", "wide", "cut", "MEDIUM phone shop: a clerk hands you a new phone box"),
 ("it folds too", "04_notfun", "insert", "wide", "cut", "INSERT: the new phone folds; your deadpan face behind"),
 ("day seven door handles", "04_notfun", "hall", "wide", "cut", "INSERT: a door handle rips off with its screws; a box full of handles; DAY 7"),
 ("your mom stops locking", "04_notfun", "hall", "wide", "cut", "MEDIUM hallway: bathroom door with a hole and a KNOCK FIRST sign, mom shrugs"),
 ("here's what nobody tells you", "04_notfun", "face", "wide", "cut", "BIG FACE: you look straight at us, serious, darker light"),
 ("strength isn't how hard you push", "04_notfun", "blueprint", "none", "zoom", "BLUEPRINT: an arm pushes a box, small force arrow"),
 ("it's how hard you could push", "04_notfun", "blueprint", "none", "cut", "BLUEPRINT: a giant ghost arrow of possible force, ×128, red warning"),
 ("and your body doesn't always ask", "04_notfun", "face", "wide", "cut", "BIG FACE: nervous, reflex twitch lines"),
 ("a sneeze", "04_notfun", "classroom", "wide", "cut", "QUICK: a sneeze blasts papers off every desk"),
 ("a flinch", "04_notfun", "hall", "wide", "cut", "QUICK: a spider drops, you flinch and your fist goes through the wall"),
 ("a bad dream", "04_notfun", "bedroom", "wide", "cut", "QUICK: asleep, twitching, the bed cracks under you"),
 ("day eight you have a nightmare", "04_notfun", "bedroom", "wide", "dip", "NIGHT bedroom: you thrash in your sleep; DAY 8"),
 ("and you wake up in the apartment below", "04_notfun", "cutaway", "wide", "cut", "CUTAWAY of the building: your bed crashes through the floor into the flat below"),
 ("mr patel is very calm", "04_notfun", "patel", "wide", "cut", "MEDIUM: Mr. Patel in his armchair, calm, in the dust, TV on"),
 ("he hands you a cup of tea", "04_notfun", "patel", "wide", "cut", "TWO-SHOT: Patel hands you a teacup as you sit in the rubble in your bed"),
 ("it explodes", "04_notfun", "patel", "scope", "flash", "FREEZE insert: the cup bursts in your hand, tea droplets hang in the air"),
 # 05 famous
 ("by day nine a video", "05_famous", "phoneui", "none", "cut", "PHONE UI: a video of you lifting a car off a cyclist plays"),
 ("has two hundred million views", "05_famous", "phoneui", "none", "cut", "PHONE UI: the view counter rolls up to 200,000,000"),
 ("every football league bans you", "05_famous", "pitch", "wide", "cut", "STADIUM: your kick blasts the ball through the net; BANNED stamp"),
 ("every gym too", "05_famous", "gym", "wide", "cut", "GYM: a barbell bent into a U; BANNED sign on the door"),
 ("a construction company offers", "05_famous", "office", "wide", "cut", "OFFICE: a boss in a hard hat holds a contract $1,000,000 / DAY"),
 ("an army general offers", "05_famous", "office", "wide", "cut", "OFFICE: a general slides over a blank check, $ ? ? ?"),
 ("you could build a house", "05_famous", "build", "wide", "cut", "TIMELAPSE: a house frame shoots up as you carry beams; the sun races across the sky"),
 ("pull a ship into port", "05_famous", "harbor", "wide", "cut", "HARBOUR: you haul a giant ship to the dock with a rope"),
 ("stop a train with one hand", "05_famous", "rail", "scope", "cut", "RAIL: one hand out, the train's nose crumples to a stop, sparks"),
 ("but you can't hold a pencil", "05_famous", "insert", "wide", "cut", "INSERT: a pencil snaps again"),
 ("and there's one thing you want", "05_famous", "nursery", "wide", "cut", "DOORWAY: you look into a new nursery, an empty crib in soft light"),
 # 06 lily
 ("your baby sister lily", "06_lily", "hospital", "wide", "dip", "ESTABLISH: hospital at night, lit windows"),
 ("is born on day nine", "06_lily", "hospital", "wide", "cut", "INSERT: newborn in a pink blanket, name card LILY; DAY 9"),
 ("your dad drives everyone", "06_lily", "road", "wide", "cut", "NIGHT road: the family car drives past, dad at the wheel"),
 ("you follow on foot", "06_lily", "road", "wide", "cut", "NIGHT road: you jog behind the car on the sidewalk"),
 ("because the last time you closed", "06_lily", "street", "wide", "cut", "FLASHBACK: you shut a car door and it comes off in your hand, dad's face"),
 ("your dad is a mechanic", "06_lily", "garage", "wide", "cut", "GARAGE: dad (yellow cap) working on an engine, warm work lamp"),
 ("big hands", "06_lily", "insert", "wide", "cut", "INSERT: dad's big hands around a wrench"),
 ("oil on everything", "06_lily", "garage", "wide", "cut", "INSERT: an oily rag wipes his hands, oil drips"),
 ("when you were six", "06_lily", "kitchen", "wide", "dip", "FLASHBACK warm night kitchen: little you arm-wrestles dad; AGE 6"),
 ("you never won", "06_lily", "kitchen", "wide", "cut", "CLOSE: dad gently lays your little hand down, grinning"),
 ("not once", "06_lily", "kitchen", "wide", "cut", "INSERT: tally chalkboard DAD |||| … YOU 0"),
 ("and every night he said", "06_lily", "kitchen", "wide", "cut", "MEDIUM: dad leans in over the table, warm"),
 ("strong is easy kiddo", "06_lily", "face", "wide", "cut", "BIG FACE: dad speaks, warm lamp light"),
 ("at the hospital everyone takes turns", "06_lily", "hospital", "wide", "cut", "HOSPITAL ROOM: family around the bed, baby passed around"),
 ("your mom", "06_lily", "hospital", "wide", "cut", "MEDIUM: mom holds Lily"),
 ("your dad", "06_lily", "hospital", "wide", "cut", "MEDIUM: dad holds Lily in his big hands"),
 ("grandma", "06_lily", "hospital", "wide", "cut", "MEDIUM: grandma holds Lily"),
 ("even the nurse", "06_lily", "hospital", "wide", "cut", "MEDIUM: the nurse holds Lily, glances nervously at you"),
 ("you stand in the doorway", "06_lily", "hospital", "wide", "cut", "WIDE: you in the doorway, hands in pockets, the warm room beyond"),
 ("because today you're five hundred", "06_lily", "face", "wide", "cut", "BIG FACE: sad, looking down at your hidden hands"),
 ("than you were last week", "06_lily", "data", "none", "cut", "DATA: compare bars LAST WEEK ×4 vs TODAY ×512"),
 ("one flinch and you could crush her", "06_lily", "insert", "scope", "cut", "INSERT: your huge fist hovers near Lily's tiny hand, red danger glow"),
 # 07 atlas
 ("that night a black van", "07_atlas", "street", "wide", "dip", "NIGHT street: a black van rolls up outside your building, headlights"),
 ("inside is a woman", "07_atlas", "street", "wide", "cut", "VAN DOOR: slides open, Dr. Voss in a white coat, cold light"),
 ("her badge says project atlas", "07_atlas", "insert", "wide", "cut", "INSERT: badge PROJECT ATLAS with logo"),
 ("we can't stop the doubling", "07_atlas", "face", "wide", "cut", "BIG FACE: Dr. Voss speaks, cool blue light"),
 ("but we can teach you control", "07_atlas", "street", "wide", "cut", "TWO-SHOT: Voss offers her hand at the van door, you on the steps"),
 ("so you go with them", "07_atlas", "street", "wide", "cut", "WIDE: you climb into the van, door slides shut"),
 ("not because you want to", "07_atlas", "face", "wide", "cut", "BIG FACE: in the van window, looking back at home"),
 ("because lily sleeps", "07_atlas", "cutaway", "wide", "cut", "CUTAWAY: your bedroom and Lily's nursery, one thin wall between; crack near your bed"),
 ("atlas puts you in a steel room", "07_atlas", "mountain", "scope", "dip", "ESTABLISH: a mountain at dusk, a lit tunnel entrance"),
 ("deep inside a mountain", "07_atlas", "steel", "wide", "cut", "STEEL ROOM: cold steel walls, a table under a spotlight"),
 ("on the table there's a box", "07_atlas", "steel", "wide", "cut", "MEDIUM: you sit at the table, an egg carton under the light"),
 ("the test is simple", "07_atlas", "steel", "wide", "cut", "OTS: Dr. Voss behind the glass with a clipboard"),
 ("pick one up", "07_atlas", "insert", "wide", "cut", "INSERT: your hand reaches for an egg"),
 ("don't break it", "07_atlas", "insert", "wide", "cut", "INSERT: fingers close around the egg; DON'T BREAK IT"),
 ("you break the first one", "07_atlas", "insert", "wide", "cut", "INSERT: SPLAT, the egg explodes"),
 ("and the second", "07_atlas", "insert", "wide", "cut", "INSERT: SPLAT again"),
 ("by the end of day ten", "07_atlas", "steel", "wide", "cut", "WIDE: shells everywhere; EGGS BROKEN counter rolls to 412"),
 ("here's the problem", "07_atlas", "face", "wide", "cut", "BIG FACE: yolk on your face, frustrated"),
 ("every morning you're twice as strong", "07_atlas", "data", "none", "cut", "DATA: sunrise, badge flips ×1,024 → ×2,048"),
 ("so every morning you have to be", "07_atlas", "data", "none", "cut", "DATA: two meters — STRENGTH ×2 and CAREFUL ×2"),
 ("twice as slow", "07_atlas", "insert", "wide", "cut", "INSERT: your hand creeps toward the egg in slow motion"),
 ("twice as gentle", "07_atlas", "insert", "wide", "cut", "INSERT: a feather balanced on your fingertip"),
 ("just to stay where you are", "07_atlas", "steel", "wide", "cut", "METAPHOR: you run on a speeding treadmill labelled ×2 / DAY and stay in place"),
 ("day eleven you break ninety", "07_atlas", "steel", "wide", "cut", "MEDIUM: a smaller pile of shells; DAY 11 · 90"),
 ("day twelve nine", "07_atlas", "steel", "wide", "cut", "MEDIUM: only a few shells; DAY 12 · 9"),
 ("day thirteen you pick one up", "07_atlas", "insert", "scope", "dip", "CLOSE: your hand lifts an egg, slow, tense; DAY 13"),
 ("and you hold it", "07_atlas", "insert", "scope", "cut", "INSERT: the egg rests whole in your palm"),
 ("for one whole minute", "07_atlas", "steel", "wide", "cut", "CLOCK sweeps 0:00 → 1:00, Voss raises her eyebrows behind the glass"),
 ("it's the hardest thing", "07_atlas", "face", "wide", "cut", "BIG FACE: sweat, a small relieved smile, the egg between your fingers"),
 # 08 quake
 ("then the phone rings", "08_quake", "steel", "wide", "cut", "STEEL ROOM: the wall phone flashes red and rings"),
 ("an earthquake has hit", "08_quake", "city", "wide", "cut", "CITY at night: buildings shake, dust clouds, EARTHQUAKE ticker"),
 ("your building is down", "08_quake", "rubble", "wide", "cut", "WIDE: your apartment building collapsed, firefighters' lights"),
 ("your mom and dad got out", "08_quake", "rubble", "wide", "cut", "MEDIUM: mom and dad in blankets by an ambulance, mom crying"),
 ("lily didn't", "08_quake", "rubble", "scope", "cut", "CLOSE: a crib mobile hangs in the rubble, dust falling"),
 ("you're there in four minutes", "08_quake", "road", "wide", "cut", "ACTION: you leap over cars in huge bounds, speed lines, 4:00 timer"),
 ("you didn't wait for the van", "08_quake", "mountain", "wide", "cut", "MOUNTAIN gate: the van still parked, Voss shouting after you"),
 ("you ran", "08_quake", "rubble", "scope", "cut", "IMPACT: you land, the asphalt cracks in a ring"),
 ("the firefighters say the slab", "08_quake", "rubble", "wide", "cut", "WIDE: a firefighter points at a huge concrete slab; 400 TONNES"),
 ("they need a crane", "08_quake", "rubble", "wide", "cut", "MEDIUM: firefighter on the radio; CRANE NEEDED"),
 ("the crane is two hours away", "08_quake", "data", "none", "cut", "MAP: a crane icon far away, route line, 2 HOURS"),
 ("you don't need a crane", "08_quake", "face", "scope", "flash", "BIG FACE: determined, gold eyes, dust in the air"),
 ("you lift four hundred tonnes", "08_quake", "rubble", "scope", "cut", "WIDE: you lift the slab with your left hand, ground cracking, firefighters in awe"),
 ("and with your right hand", "08_quake", "rubble", "scope", "cut", "DARK GAP: your right hand reaches into the dark, a torch beam finds the crib"),
 ("and pick up your sister", "08_quake", "rubble", "scope", "cut", "CLOSE: your hand lifts Lily in her pink blanket"),
 ("like an egg", "08_quake", "insert", "scope", "cut", "MATCH CUT: the egg in your palm becomes Lily in your palm"),
 ("she grabs your finger", "08_quake", "insert", "wide", "cut", "INSERT: Lily's tiny hand wraps around your finger"),
 ("for the first time in thirteen days", "08_quake", "face", "wide", "cut", "BIG FACE: tears, a smile, warm light"),
 ("your dad is crying", "08_quake", "face", "wide", "cut", "BIG FACE: dad crying"),
 ("he puts his big hand", "08_quake", "rubble", "wide", "cut", "TWO-SHOT: dad's big hand on your shoulder, Lily in your arm"),
 ("strong is easy kiddo", "08_quake", "face", "wide", "cut", "BIG FACE: dad speaks, crying and proud"),
 ("and for the first time in your life", "08_quake", "rubble", "wide", "cut", "MEDIUM: you and dad smile; the tally board flashes YOU 1"),
 # 09 mountain
 ("but tomorrow you'll be twice", "09_mountain", "data", "none", "dip", "DATA: badge ×8,192 → ×16,384, your hands"),
 ("and the day after that", "09_mountain", "data", "none", "cut", "DATA: ×32,768 …"),
 ("so you give lily back", "09_mountain", "rubble", "wide", "cut", "MEDIUM dawn: you hand Lily to mom, gently"),
 ("and you walk back to the mountain", "09_mountain", "mountain", "scope", "cut", "WIDE dawn: you walk alone down the road toward the mountain"),
 ("you live in a steel room", "09_mountain", "steel", "wide", "cut", "STEEL ROOM: you sit on a steel bed"),
 ("yet", "09_mountain", "insert", "wide", "cut", "INSERT: a hairline crack creeps across the steel wall"),
 ("your family visits every sunday", "09_mountain", "visit", "wide", "cut", "VISIT ROOM: mom, dad and Lily behind thick glass; SUN"),
 ("you wave through the glass", "09_mountain", "visit", "wide", "cut", "CLOSE: your palm on the glass, Lily's tiny palm on the other side"),
 # 10 science
 ("so is any of this real", "10_science", "blueprint", "none", "zoom", "BLUEPRINT: IS ANY OF THIS REAL?"),
 ("not the doubling", "10_science", "blueprint", "none", "cut", "BLUEPRINT: the doubling curve gets crossed out"),
 ("but your body really does have brakes", "10_science", "blueprint", "none", "cut", "BLUEPRINT: body outline with brake icons at the muscles"),
 ("one of them is a protein", "10_science", "blueprint", "none", "cut", "BLUEPRINT: a protein blob labelled MYOSTATIN"),
 ("it tells your muscles when to stop", "10_science", "blueprint", "none", "cut", "BLUEPRINT: a muscle fibre grows and hits a STOP sign"),
 ("some animals are born without", "10_science", "blueprint", "none", "cut", "BLUEPRINT: animal outlines, the brake missing"),
 ("belgian blue cattle", "10_science", "blueprint", "none", "cut", "BLUEPRINT: a bulky Belgian Blue bull; REAL"),
 ("and in two thousand four", "10_science", "blueprint", "none", "cut", "FACT CARD: 2004 · GERMANY, a baby outline; REAL"),
 ("he had about twice the muscle", "10_science", "blueprint", "none", "cut", "BLUEPRINT: compare bars 1× vs 2×"),
 ("your tendons have a brake too", "10_science", "blueprint", "none", "cut", "BLUEPRINT: arm with the tendon highlighted"),
 ("tiny sensors that tell", "10_science", "blueprint", "none", "cut", "BLUEPRINT: sensor dots pulse a signal up to the muscle: EASE OFF"),
 ("and size is a brake", "10_science", "blueprint", "none", "cut", "BLUEPRINT: a small cube"),
 ("make an animal twice as big", "10_science", "blueprint", "none", "cut", "BLUEPRINT: the cube doubles in size, 2×"),
 ("and its muscles get four times", "10_science", "blueprint", "none", "cut", "BLUEPRINT: cross-section square lights up ×4 STRENGTH"),
 ("but its body gets eight times", "10_science", "blueprint", "none", "cut", "BLUEPRINT: the volume fills, ×8 WEIGHT"),
 ("that's why an ant can carry", "10_science", "blueprint", "none", "cut", "BLUEPRINT: an ant carries a giant leaf"),
 ("and an elephant can't jump", "10_science", "blueprint", "none", "cut", "BLUEPRINT: an elephant tries to jump, stays on the ground"),
 ("so the real superpower", "10_science", "face", "wide", "cut", "BIG FACE: thoughtful, the egg in your fingers"),
 ("it's the brakes", "10_science", "insert", "wide", "cut", "INSERT: the egg resting whole in your gentle palm, gold glow"),
 # 11 twist
 ("day twenty", "11_twist", "steel", "scope", "dip", "STEEL ROOM night: DAY 20 badge, you sit very still"),
 ("you're a million times stronger", "11_twist", "steel", "scope", "cut", "WIDE: ×1,048,576 glowing; the walls covered in hairline cracks"),
 ("your phone rings", "11_twist", "insert", "wide", "cut", "INSERT: a steel-armoured phone buzzes on the steel table"),
 ("it's your mom", "11_twist", "insert", "wide", "cut", "INSERT: caller ID MOM"),
 ("her voice is shaking", "11_twist", "face", "wide", "cut", "BIG FACE: you listen, worried"),
 ("it's lily she pulled", "11_twist", "nursery", "scope", "cut", "NURSERY night: crib bars bent off, mom on the phone in the doorway, scared"),
 ("lily is eleven days old", "11_twist", "nursery", "scope", "cut", "CLOSE: Lily in her crib holding a bent bar; 11 DAYS OLD"),
 ("and this morning", "11_twist", "nursery", "scope", "cut", "CLOSE: Lily giggles, gold glint; badge LILY ×2"),
 ("what would you do", "11_twist", "end", "none", "fade", "END SCREEN: WHAT WOULD YOU DO IF YOUR STRENGTH DOUBLED EVERY DAY? comment bubble, subscribe, cast lineup, PART 2"),
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
json.dump({'title': "What If You Got Stronger and Couldn't Stop?", 'duration': DURATION, 'shots': shots,
           'music': old.get('music', []), 'sfx': old.get('sfx', [])}, open(out, 'w'), indent=1, ensure_ascii=False)
d = sorted(s['end'] - s['start'] for s in shots)
print(f'{len(shots)} shots, median {d[len(d)//2]:.2f} s, max {d[-1]:.2f} s ({[s["id"] for s in shots if s["end"]-s["start"]==d[-1]]}), {len(shots)/(DURATION/60):.1f}/min')
