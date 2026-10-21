"""Builds story/shots.json from the shot plan below. Each shot starts LEAD s before the first word of its anchor
phrase (searched forward in timeline/words.json), so the cuts follow the real voiceover.

  python3 projects/talk-to-animals/story/plan.py
"""
import json, os, re
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEAD, DURATION = 0.15, 551.0
W = json.load(open(os.path.join(P, 'timeline/words.json')))['words']
N = [re.sub(r"[^a-z0-9']", '', w['word'].lower().replace('’', "'")) for w in W]

# (anchor phrase, file, set, bars, transition, scene)
PLAN = [
 # 01 hook + rules
 ("bacon", "01_hook", "kitchen", "none", "cut", "EXTREME CLOSE-UP, frame 1: Biscuit's face, mouth moving, speech bubble BACON."),
 ("under the chair", "01_hook", "kitchen", "none", "cut", "LOW ANGLE under the kitchen chair: a strip of bacon glows on the floor"),
 ("left side", "01_hook", "kitchen", "none", "cut", "Biscuit's eyes slide left, a little nod"),
 ("you look", "01_hook", "kitchen", "none", "cut", "KITCHEN: you bend down and look under the chair"),
 ("there's a piece of bacon", "01_hook", "kitchen", "none", "cut", "POV under the chair: the bacon, left side, spotlight"),
 ("that's forty one pieces", "01_hook", "kitchen", "none", "cut", "Biscuit, proud; a tally counter ticks 39-40-41"),
 ("i've been counting", "01_hook", "kitchen", "none", "cut", "INSERT: tally marks scratched on the side of his food bowl"),
 ("the cat walks across", "01_hook", "kitchen", "none", "cut", "Pickles strolls across the breakfast table between plates"),
 ("ugh", "01_hook", "kitchen", "none", "cut", "CLOSE: Pickles' heavy-lidded face, bubble"),
 ("and outside every bird", "01_hook", "garden", "none", "cut", "Through the kitchen window: birds on wires and in the tree"),
 ("my tree", "01_hook", "garden", "none", "cut", "CLOSE: a row of birds, beaks open, MY TREE! bubbles stacking; shake"),
 ("so", "01_hook", "kitchen", "none", "cut", "BIG FACE: you, eyes wide, bubbles popping all around"),
 ("what if you could talk", "01_hook", "title", "none", "fade", "TITLE: you in the middle, animals around you all talking; WHAT IF YOU COULD TALK TO ANIMALS?"),
 ("here's how it works", "01_hook", "diagram", "none", "cut", "DIAGRAM: you, arrows out to animal icons"),
 ("and every animal understands you", "01_hook", "diagram", "none", "cut", "DIAGRAM: arrows come back; every animal turns to you"),
 ("there's no off switch", "01_hook", "insert", "none", "cut", "INSERT: a big OFF switch; your hand flicks it, the bubbles keep coming"),
 ("that part matters later", "01_hook", "kitchen", "none", "cut", "you, a little worried, bubbles around your head"),
 # 02 Biscuit's story
 ("biscuit is fourteen", "02_family", "living", "none", "dip", "LIVING ROOM: Biscuit in his sunny spot; name card BISCUIT · 14"),
 ("he's a year older", "02_family", "living", "none", "cut", "Height chart on the door frame: BISCUIT 14 / YOU 13"),
 ("mom found him", "02_family", "gasstation", "none", "dip", "NIGHT RAIN, gas station: Mom crouches by a soaked puppy"),
 ("a wet angry puppy", "02_family", "gasstation", "none", "cut", "CLOSE: the puppy hangs off Mom's green sleeve; Mom laughs"),
 ("he's been there for every day", "02_family", "living", "none", "dip", "Photo wall: baby you with puppy Biscuit, birthdays"),
 ("every scraped knee", "02_family", "garden", "none", "cut", "FLASHBACK: little you with a scraped knee, Biscuit licks your face"),
 ("every bad dream", "02_family", "bedroom", "none", "cut", "FLASHBACK night: little you in bed, Biscuit on the end of the bed"),
 ("you've talked to him", "02_family", "living", "none", "cut", "You on the floor talking to Biscuit, years passing (hair, height)"),
 ("today for the first time", "02_family", "kitchen", "none", "dip", "KITCHEN today: you and Biscuit face to face"),
 ("he talks back", "02_family", "kitchen", "none", "cut", "CLOSE: Biscuit's mouth opens, a bubble pops; your face, shocked"),
 # 03 the fun part
 ("and at first", "03_fun", "face", "none", "cut", "BIG FACE: you grin"),
 ("you ask biscuit what he wants", "03_fun", "living", "none", "cut", "You kneel by Biscuit with a party hat and a cake"),
 ("the couch", "03_fun", "living", "none", "cut", "Biscuit sprawled across the whole couch, crown on, FOREVER"),
 ("you ask pickles why", "03_fun", "kitchen", "none", "cut", "Pickles on the table next to a cup, paw raised"),
 ("to check if they still fall", "03_fun", "kitchen", "none", "cut", "SLOW MOTION: the cup tips off the edge; Pickles watches it fall"),
 ("a pigeon gives you directions", "03_fun", "street", "none", "cut", "STREET CORNER: a pigeon on a bench, you with your backpack"),
 ("left at the bakery", "03_fun", "street", "none", "cut", "The bakery corner, an arrow LEFT"),
 ("right at the man with the sandwich", "03_fun", "street", "none", "cut", "The man with a sandwich, arrow RIGHT"),
 ("stay near the man", "03_fun", "street", "none", "cut", "Three pigeons following the sandwich man"),
 ("a squirrel finds the house key", "03_fun", "garden", "none", "cut", "A squirrel pops out of a bush holding your key"),
 ("he wants a peanut", "03_fun", "garden", "none", "cut", "Squirrel bubble: ONE PEANUT"),
 ("then he wants forty peanuts", "03_fun", "garden", "none", "cut", "A pile of peanuts grows; counter 40"),
 ("you start leaving peanuts", "03_fun", "garden", "none", "cut", "Windowsill: you put out peanuts, crows land"),
 ("a button", "03_fun", "garden", "none", "cut", "CLOSE windowsill: a button, a bottle cap, a piece of blue glass appear one by one"),
 ("that really happens", "03_fun", "real", "none", "cut", "REAL: a girl in Seattle with a box of crow gifts"),
 ("on the school trip to the zoo", "03_fun", "zoo", "none", "cut", "ZOO: the class at the prairie dog enclosure"),
 ("tall one", "03_fun", "zoo", "none", "cut", "CLOSE: prairie dogs pop up, bubbles TALL ONE / BLUE TOP / WALKS FUNNY"),
 ("theo films you", "03_fun", "street", "none", "cut", "Theo films you talking to a pigeon"),
 ("the video gets two million", "03_fun", "phone", "none", "cut", "PHONE: views count up to 2,000,000"),
 ("the comments are full", "03_fun", "phone", "none", "cut", "PHONE: comments about cats"),
 ("you know", "03_fun", "kitchen", "none", "cut", "Pickles glares at the camera; you zip your lips"),
 # 04 the curse
 ("then at four forty seven", "04_curse", "bedroom", "none", "dip", "DARK BEDROOM: clock 4:47, you bolt upright"),
 ("my tree", "04_curse", "garden", "none", "cut", "Dawn window: birds screaming; you with a pillow over your head"),
 ("that's not a joke", "04_curse", "real", "none", "cut", "REAL: a robin singing, its territory drawn as a circle"),
 ("most birdsong at dawn", "04_curse", "real", "none", "cut", "Map of the street: every bird's circle, MINE MINE MINE"),
 ("you can't sleep through it", "04_curse", "bedroom", "none", "cut", "You in bed, eyes wide, dark circles"),
 ("the mosquito in your room", "04_curse", "bedroom", "none", "cut", "CLOSE: a mosquito, wings a blur"),
 ("that whine is just its wings", "04_curse", "real", "none", "cut", "REAL: the wing-beat wave, ~500 beats a second"),
 ("somehow that's worse", "04_curse", "face", "none", "cut", "BIG FACE: deadpan, tired"),
 ("then you make a mistake", "04_curse", "park", "none", "cut", "PARK BENCH: you with a sandwich, a crow watching"),
 ("a crow steals your sandwich", "04_curse", "park", "none", "cut", "The crow snatches the sandwich and flies"),
 ("and you call him ugly", "04_curse", "park", "none", "cut", "You shout UGLY!; the crow turns, slowly"),
 ("the next morning there are twenty", "04_curse", "garden", "none", "cut", "The fence: twenty crows; counter 20"),
 ("the morning after a hundred", "04_curse", "garden", "none", "cut", "The fence black with crows; counter 100"),
 ("they dive at your head", "04_curse", "street", "none", "cut", "Street: crows diving, you running, bag over your head"),
 ("crows remember faces", "04_curse", "real", "none", "cut", "CLOSE: a crow's eye with your face reflected"),
 ("scientists in seattle", "04_curse", "real", "none", "cut", "REAL: a scientist in a caveman mask with a net"),
 ("years later", "04_curse", "real", "none", "cut", "YEARS LATER: crows scream at the mask"),
 ("the others had taught them", "04_curse", "real", "none", "cut", "An old crow teaching young crows, arrows"),
 ("now every crow in the city", "04_curse", "city", "none", "cut", "City rooftops at dusk, crows turning toward you"),
 ("so you keep your hood up", "04_curse", "street", "none", "cut", "You walk, hood up, eyes down"),
 ("at school people start calling", "04_curse", "school", "none", "cut", "School hallway, kids whispering, SQUIRREL KID on your locker"),
 ("you sit alone at lunch", "04_curse", "school", "none", "cut", "Cafeteria, alone; a pigeon lands on the seat next to you"),
 ("it's not the same", "04_curse", "school", "none", "cut", "CLOSE: you and the pigeon"),
 ("and then there's the pet shop", "04_curse", "petshop", "none", "cut", "PET SHOP exterior"),
 ("you walk in for cat food", "04_curse", "petshop", "none", "cut", "You walk in, the bell rings"),
 ("and the whole room turns", "04_curse", "petshop", "none", "cut", "Every animal turns at once"),
 ("every puppy", "04_curse", "petshop", "none", "cut", "Puppies pressed to the glass"),
 ("every rabbit", "04_curse", "petshop", "none", "cut", "Rabbits"),
 ("every bird in every cage", "04_curse", "petshop", "none", "cut", "Birds in cages"),
 ("pick me", "04_curse", "petshop", "none", "cut", "PICK ME bubbles everywhere"),
 ("you can't take them all", "04_curse", "petshop", "none", "cut", "You among the cages, sad"),
 ("you can't even take one", "04_curse", "face", "none", "cut", "BIG FACE: sad"),
 ("you walk out with a bag", "04_curse", "petshop", "none", "cut", "You walk out with cat food, the animals' eyes behind you"),
 ("hey", "04_curse", "kitchen", "none", "cut", "KITCHEN: Mom, worried"),
 ("you say nothing", "04_curse", "kitchen", "none", "cut", "You at the table, silent; Biscuit watching"),
 ("biscuit doesn't either", "04_curse", "kitchen", "none", "cut", "CLOSE: Biscuit"),
 ("but that night", "04_curse", "bedroom", "none", "cut", "NIGHT: Biscuit lying across your doorway"),
 # 05 is any of this real?
 ("so could animals really talk", "05_science", "blueprint", "none", "dip", "BLUEPRINT title: IS ANY OF THIS REAL?"),
 ("in a way they already do", "05_science", "blueprint", "none", "cut", "Animal icons with sound waves"),
 ("remember the prairie dogs", "05_science", "blueprint", "none", "cut", "A prairie dog on lookout"),
 ("a biologist in arizona", "05_science", "real", "none", "cut", "REAL: biologist with a microphone in the desert"),
 ("they don't just shout", "05_science", "blueprint", "none", "cut", "A call labelled DANGER, crossed out"),
 ("they describe what's coming", "05_science", "blueprint", "none", "cut", "Different waves for a tall / short person and shirt colours"),
 ("vervet monkeys have different", "05_science", "blueprint", "none", "cut", "Three alarms: leopard, eagle, snake"),
 ("hear eagle", "05_science", "blueprint", "none", "cut", "Monkeys look up, eagle above"),
 ("hear snake", "05_science", "blueprint", "none", "cut", "Monkeys look down, snake below"),
 ("honeybees dance", "05_science", "blueprint", "none", "cut", "The waggle dance on the comb, angle to the sun, flowers"),
 ("that dance won a nobel", "05_science", "blueprint", "none", "cut", "NOBEL PRIZE 1973 medal"),
 ("and in twenty twenty four", "05_science", "savanna", "none", "cut", "KENYA savanna: elephants"),
 ("play an elephant a call", "05_science", "savanna", "none", "cut", "A call for her: she turns and calls back"),
 ("meant for someone else", "05_science", "savanna", "none", "cut", "A call for someone else: she keeps eating"),
 ("and here's one the internet", "05_science", "blueprint", "none", "cut", "1 DOG YEAR = 7 HUMAN YEARS, crossed out"),
 ("a twenty twenty study", "05_science", "blueprint", "none", "cut", "DNA helix and the curve; 14 -> 73"),
 ("biscuit is seventy three", "05_science", "living", "none", "cut", "Biscuit in his sunny spot, badge 73"),
 ("right now a team called", "05_science", "ocean", "none", "cut", "Underwater: a sperm whale, clicks as dots; PROJECT CETI"),
 ("they've already found patterns", "05_science", "blueprint", "none", "cut", "Click patterns laid out like an alphabet"),
 ("none of these animals", "05_science", "blueprint", "none", "cut", "All the animals side by side"),
 ("but every one of them", "05_science", "blueprint", "none", "cut", "Bubbles over each animal"),
 ("we just never learned", "05_science", "face", "none", "cut", "You, listening"),
 ("remember the whales", "05_science", "ocean", "none", "cut", "The whale glows; back to the story"),
 # 06 the whales and Biscuit
 ("a week later an email", "06_biscuit", "bedroom", "none", "dip", "LAPTOP: email from PROJECT CETI"),
 ("they send you a recording", "06_biscuit", "bedroom", "none", "cut", "The audio file, a waveform"),
 ("you put on the headphones", "06_biscuit", "face", "none", "cut", "BIG FACE: you in headphones"),
 ("clicks", "06_biscuit", "ocean", "none", "cut", "Clicks as glowing dots"),
 ("and under the clicks", "06_biscuit", "ocean", "none", "cut", "The waveform turns into words"),
 ("a mother whale calling", "06_biscuit", "ocean", "none", "cut", "Underwater: a mother whale and her calf"),
 ("the same name over and over", "06_biscuit", "ocean", "none", "cut", "The same bubble again and again"),
 ("you write it down", "06_biscuit", "bedroom", "none", "cut", "Notebook: a strange word"),
 ("they don't believe you", "06_biscuit", "bedroom", "none", "cut", "Video call: skeptical scientists"),
 ("then they check their tapes", "06_biscuit", "bedroom", "none", "cut", "Spectrograms side by side"),
 ("every time she calls", "06_biscuit", "ocean", "none", "cut", "Mother calls, calf answers, MATCH ticks"),
 ("the news calls you", "06_biscuit", "tv", "none", "cut", "TV news: THE KID WHO TALKS TO WHALES"),
 ("but that night biscuit", "06_biscuit", "stairs", "none", "dip", "Night: you at the top of the stairs"),
 ("you find him at the bottom", "06_biscuit", "stairs", "none", "cut", "Biscuit at the bottom, looking up"),
 ("it's my back legs", "06_biscuit", "stairs", "none", "cut", "CLOSE: Biscuit, tired"),
 ("you carry him up", "06_biscuit", "stairs", "none", "cut", "You carry him up the stairs"),
 ("don't tell your mom", "06_biscuit", "bedroom", "none", "cut", "Biscuit on your bed, whispering"),
 ("he's been hurting", "06_biscuit", "garden", "none", "cut", "FLASHBACK winter: Biscuit limping in the snow"),
 ("you tell mom", "06_biscuit", "vet", "none", "dip", "VET: kind vet, Mom, you, Biscuit on the table"),
 ("his hips are worn out", "06_biscuit", "vet", "none", "cut", "X-ray of the hips, a tired heart"),
 ("weeks", "06_biscuit", "vet", "none", "cut", "Calendar pages tearing off"),
 ("so you spend every one", "06_biscuit", "beach", "none", "dip", "Beach at sunset: you and Biscuit"),
 ("he tells you he's hated", "06_biscuit", "living", "none", "cut", "Biscuit glares at the vacuum cleaner"),
 ("that he can hear mom's car", "06_biscuit", "living", "none", "cut", "Biscuit's ears up; map: Mom's car two streets away"),
 ("that's why he's always", "06_biscuit", "living", "none", "cut", "Biscuit at the door before the car turns in"),
 ("the day you were born", "06_biscuit", "living", "none", "dip", "FLASHBACK: young Biscuit alone by the door"),
 ("i waited by the door", "06_biscuit", "living", "none", "cut", "Day and night pass at the window; he keeps waiting"),
 ("then they came back with you", "06_biscuit", "living", "none", "cut", "Mom and Dad come in with a baby; Biscuit sniffs"),
 ("you were very small", "06_biscuit", "living", "none", "cut", "Baby you and young Biscuit, nose to nose"),
 ("i liked you right away", "06_biscuit", "living", "none", "cut", "Biscuit lying by the crib"),
 ("on the last night", "06_biscuit", "living", "none", "dip", "Night: moonlight on the sunny spot, Biscuit lying in it, you beside him"),
 ("you talked to me every day", "06_biscuit", "living", "none", "cut", "CLOSE: your faces almost touching"),
 ("this year you understood", "06_biscuit", "living", "none", "cut", "CLOSE: Biscuit, warm"),
 ("don't be sad for too long", "06_biscuit", "living", "none", "cut", "Biscuit, gentle"),
 ("you say okay", "06_biscuit", "face", "none", "cut", "BIG FACE: you nod, tears"),
 ("it's the first time", "06_biscuit", "living", "none", "cut", "WIDE quiet: the two of you in the moonlight"),
 ("he falls asleep", "06_biscuit", "living", "none", "cut", "His head on your foot"),
 ("and he doesn't wake up", "06_biscuit", "living", "none", "cut", "Very still; the moonlight fades"),
 ("for weeks you can't go", "06_biscuit", "park", "none", "dip", "Park gate: you stay outside"),
 ("every dog there says hello", "06_biscuit", "park", "none", "cut", "Dogs running past, HI! HI!"),
 ("none of them sound like him", "06_biscuit", "face", "none", "cut", "BIG FACE: you"),
 ("and there's still no off switch", "06_biscuit", "insert", "none", "cut", "The dusty OFF switch"),
 # 07 the twist
 ("then one morning", "07_twist", "bedroom", "none", "dip", "Bedroom: clock 4:47, your eyes open"),
 ("it's quiet", "07_twist", "garden", "none", "cut", "The window: still, silent"),
 ("no birds", "07_twist", "garden", "none", "cut", "Empty branches, empty wires"),
 ("not one crow", "07_twist", "garden", "none", "cut", "The empty fence"),
 ("pickles is sitting at the window", "07_twist", "living", "none", "cut", "Pickles from behind at the window, the sea at dawn"),
 ("then you hear it", "07_twist", "bedroom", "none", "cut", "You sit up, listening"),
 ("from very very far away", "07_twist", "sea", "none", "cut", "The far sea at dawn"),
 ("deeper than any voice", "07_twist", "sea", "none", "cut", "Dark shapes under the surface"),
 ("thousands of them", "07_twist", "sea", "none", "cut", "Many whale backs and tails, all the way to the horizon"),
 ("we hear you", "07_twist", "sea", "none", "cut", "The surface, a slow ripple spreading toward the shore"),
 ("pickles doesn't turn around", "07_twist", "living", "none", "cut", "Pickles from behind"),
 ("they've been asking", "07_twist", "living", "none", "cut", "CLOSE: Pickles' eyes in the dark, reflecting the dawn"),
 ("so if you could talk to animals", "07_twist", "end", "none", "fade", "END SCREEN: What would YOU do?, comment bubble, Subscribe, cast lineup, PART 2"),
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
json.dump({'title': "What If You Could Talk to Animals?", 'duration': DURATION, 'shots': shots,
           'music': old.get('music', []), 'sfx': old.get('sfx', [])}, open(out, 'w'), indent=1, ensure_ascii=False)
d = sorted(s['end'] - s['start'] for s in shots)
print(f'{len(shots)} shots, median {d[len(d)//2]:.2f} s, max {d[-1]:.2f} s ({[s["id"] for s in shots if s["end"]-s["start"]==d[-1]]}), {len(shots)/(DURATION/60):.1f}/min')
