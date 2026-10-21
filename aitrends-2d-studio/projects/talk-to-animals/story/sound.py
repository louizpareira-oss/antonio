"""Adds the sound plan to story/shots.json: music sections, per-shot SFX cues and ambience beds.
Run after story/plan.py (which rewrites shots.json without sound):

  python3 projects/talk-to-animals/story/sound.py
"""
import json, os, re
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SP = os.path.join(P, 'story/shots.json')
D = json.load(open(SP)); SH = D['shots']; BY = {s['id']: s for s in SH}
W = json.load(open(os.path.join(P, 'timeline/words.json')))['words']
SLOTS = json.load(open(os.path.join(P, 'input/vo_slots.json')))['slots']
norm = lambda w: re.sub(r"[^a-z0-9']", '', w.lower().replace('’', "'"))

def w(word, sid, fallback=0.3):
    """seconds from the start of shot sid to the first time `word` is spoken in it"""
    s = BY[sid]
    for x in W:
        if s['start'] <= x['start'] < s['end'] and norm(x['word']).startswith(norm(word)): return round(x['start'] - s['start'], 2)
    return fallback

# music: (first shot, mood, intensity) — each section runs until the next one starts
MUSIC = [
    ('s001', 'playful', 0.5), ('s013', 'epic', 0.55), ('s014', 'mystery', 0.35), ('s018', 'calm', 0.4), ('s020', 'sad', 0.35),
    ('s022', 'hopeful', 0.4), ('s026', 'wonder', 0.45), ('s028', 'playful', 0.55), ('s042', 'wonder', 0.4), ('s043', 'playful', 0.55),
    ('s046', 'triumph', 0.5), ('s048', 'mystery', 0.4), ('s049', 'tension', 0.5), ('s051', 'wonder', 0.35), ('s053', 'dark', 0.35),
    ('s055', 'wonder', 0.3), ('s056', 'playful', 0.4), ('s059', 'tension', 0.6), ('s062', 'action', 0.6), ('s063', 'mystery', 0.45),
    ('s067', 'dark', 0.4), ('s069', 'sad', 0.35), ('s072', 'mystery', 0.35), ('s078', 'tension', 0.55), ('s079', 'sad', 0.4),
    ('s086', 'wonder', 0.45), ('s093', 'playful', 0.4), ('s095', 'wonder', 0.45), ('s100', 'mystery', 0.35), ('s102', 'sad', 0.35),
    ('s103', 'wonder', 0.45), ('s107', 'calm', 0.35), ('s108', 'wonder', 0.4), ('s109', 'hopeful', 0.45), ('s112', 'mystery', 0.45),
    ('s114', 'wonder', 0.5), ('s117', 'tension', 0.4), ('s119', 'triumph', 0.55), ('s121', 'sad', 0.4), ('s130', 'calm', 0.4),
    ('s134', 'wonder', 0.35), ('s139', 'sad', 0.45), ('s147', 'dark', 0.3), ('s151', 'tension', 0.45), ('s152', 'dark', 0.18),
    ('s156', 'mystery', 0.5), ('s158', 'epic', 0.55), ('s161', 'tension', 0.5), ('s163', 'hopeful', 0.45),
]
D['music'] = [{'start': round(BY[a]['start'], 2), 'end': round(BY[MUSIC[i + 1][0]]['start'] if i + 1 < len(MUSIC) else D['duration'], 2), 'mood': m, 'intensity': k}
              for i, (a, m, k) in enumerate(MUSIC)]

# ambience by set; faces, inserts and phones keep the bed of the location before them
AMB = {'garden': ('birds', -24), 'park': ('birds', -28), 'zoo': ('birds', -30), 'street': ('city', -26), 'city': ('city', -24), 'gasstation': ('rain', -18),
       'ocean': ('underwater', -18), 'sea': ('waves', -20), 'beach': ('waves', -22), 'savanna': ('wind', -28)}
for k in ['kitchen', 'living', 'bedroom', 'stairs', 'vet', 'petshop', 'school']: AMB[k] = ('roomtone', -28)
NONE = {'blueprint', 'diagram', 'title', 'end', 'real', 'tv'}
AMB_SHOT = {'s050': ('birds', -14), 's011': ('birds', -16), 's126': ('wind', -24), 's147': ('wind', -28), 's148': ('birds', -30),
            's152': None, 's153': None, 's154': None, 's155': ('waves', -34), 's156': ('waves', -32), 's161': ('waves', -26), 's162': ('waves', -26)}

def C(at, name, gain=-10, **kw): return {'at': at, 'name': name, 'gain': gain, **kw}
# per-shot cues (times in seconds from the shot start)
SFX = {
    # hook: bacon, Pickles, the birds, the title
    's002': [C(0.3, 'shimmer', -18)], 's006': [C(0.3, 'counter', -16, dur=1.2)], 's007': [C(0.2, 'tick', -14), C(0.5, 'tick', -14)],
    's011': [C(0.1 + 0.4 * i, 'chirp', -12, seed=50 + i) for i in range(7)], 's012': [C(0.2 + 0.3 * i, 'pop', -14) for i in range(3)],
    's013': [C(0.1, 'impact', -8), C(0.4, 'shimmer', -14)], 's015': [C(0.3, 'whoosh', -16)], 's016': [C(w('off', 's016', 1.0), 'tick', -8), C(w('off', 's016', 1.0) + 0.5, 'pop', -14)],
    # Biscuit's story
    's020': [C(0.6, 'thunder', -22)], 's021': [C(0.4, 'shimmer', -20)], 's027': [C(0.3, 'pop', -12)],
    # the fun part
    's029': [C(0.3, 'pop', -14), C(0.6, 'cheer', -22)], 's030': [C(0.4, 'shimmer', -16)], 's032': [C(0.1, 'slowmo', -12), C(1.9, 'crack', -8)],
    's036': [C(0.2 + 0.3 * i, 'footstep', -18) for i in range(6)], 's037': [C(0.2, 'swish', -14)], 's039': [C(0.2, 'counter', -16, dur=1.6)],
    's040': [C(0.6, 'whoosh', -16)], 's041': [C(0.6 + 1.2 * i, 'ding', -16, pitch=1 + 0.2 * i) for i in range(3)], 's042': [C(0.2, 'shimmer', -18)],
    's044': [C(0.3 + 0.6 * i, 'pop', -14) for i in range(3)], 's046': [C(0.2, 'counter', -14, dur=2.2), C(2.4, 'ding', -12)], 's047': [C(0.3 + 0.5 * i, 'blip', -16) for i in range(4)],
    # the curse: 4:47, the mosquito, the crows, school, the pet shop
    's048': [C(0.2, 'stinger', -12)], 's049': [C(0.0, 'clock', -14), C(w('wake', 's049', 4.0), 'hit', -10)],
    's050': [C(0.1 + 0.3 * i, 'chirp', -10, seed=60 + i) for i in range(10)], 's052': [C(0.6 + 0.4 * i, 'pop', -14) for i in range(4)],
    's053': [C(0.3, 'clock', -20)], 's054': [C(0.0, 'buzz', -8, dur=2.6)], 's055': [C(0.3, 'blip', -16)],
    's058': [C(0.3, 'whoosh', -10)], 's059': [C(w('ugly', 's059', 0.4), 'hit', -10), C(1.2, 'stinger', -12)], 's060': [C(0.3, 'counter', -16, dur=1.2)],
    's061': [C(0.0, 'riser', -14), C(0.4, 'whoosh', -12)], 's062': [C(0.2 + 0.8 * i, 'whoosh', -12, seed=70 + i) for i in range(4)],
    's063': [C(0.2, 'stinger', -14)], 's065': [C(0.4, 'hit', -14)], 's067': [C(0.3, 'riser', -16)], 's069': [C(0.0, 'murmur', -22)], 's070': [C(0.0, 'murmur', -24), C(1.4, 'whoosh', -18)],
    's073': [C(0.3, 'ding', -10, pitch=1.6)], 's074': [C(0.1, 'hit', -12), C(0.2, 'stinger', -14)], 's078': [C(0.0, 'murmur', -18)] + [C(0.2 + 0.4 * i, 'pop', -16) for i in range(6)],
    's081': [C(0.3, 'ding', -16, pitch=1.6)],
    # is any of this real?
    's086': [C(0.2, 'impact', -10), C(0.4, 'shimmer', -14)], 's087': [C(0.3 + 0.5 * i, 'blip', -16) for i in range(3)], 's088': [C(w('real', 's088', 2.6), 'ding', -14)],
    's090': [C(0.9, 'swish', -14)], 's091': [C(w('person', 's091', 1.0), 'blip', -16), C(w('tall', 's091', 2.0), 'blip', -16), C(w('colour', 's091', 3.5), 'blip', -16)],
    's092': [C(w(x, 's092', 2 + i), 'blip', -14) for i, x in enumerate(['leopard', 'eagle', 'snake'])], 's093': [C(0.2, 'whoosh', -14)], 's094': [C(0.3, 'swish', -14)],
    's095': [C(0.2, 'shimmer', -18)], 's096': [C(0.3, 'ding', -10)], 's100': [C(w('seven', 's100', 2.0) + 0.6, 'swish', -14)], 's101': [C(0.4, 'counter', -16, dur=1.6)],
    's103': [C(0.2, 'clicks', -10, dur=6.0, rate=2.5)], 's104': [C(0.2, 'clicks', -14, dur=3.0, rate=4.0)], 's106': [C(0.3 + 0.35 * i, 'pop', -16) for i in range(5)],
    's108': [C(0.2, 'whalesong', -14)],
    # the whale recording
    's109': [C(w('email', 's109', 1.3), 'ding', -12)], 's110': [C(0.1, 'blip', -16)], 's111': [C(0.4, 'swish', -14)],
    's112': [C(0.0, 'clicks', -6, dur=1.3, rate=4.5), C(1.3, 'clicks', -6, dur=2.8, rate=2.2)], 's113': [C(0.0, 'clicks', -12, dur=3.2, rate=2.5), C(w('words', 's113', 2.0) - 0.4, 'shimmer', -14)],
    's114': [C(0.1, 'whalesong', -8)], 's115': [C(w('name', 's115', 0.6) - 0.5 + i, 'clicks', -12, dur=0.7, rate=7) for i in range(3)],
    's116': [C(0.1 + 0.2 * i, 'tick', -18) for i in range(5)], 's117': [C(0.1, 'blip', -16)], 's118': [C(0.1, 'glitch', -20), C(0.6, 'blip', -18)],
    's119': [C(0.2 + 1.2 * i + 0.9, 'ding', -14, pitch=1 + 0.15 * i) for i in range(3)], 's120': [C(0.0, 'whoosh', -14), C(0.2, 'hit', -14)],
    # Biscuit
    's121': [C(0.4, 'creak', -20)], 's124': [C(0.4 + 0.5 * i, 'footstep', -16) for i in range(6)], 's126': [C(w('until', 's126', 4.8), 'shimmer', -18)],
    's128': [C(0.0, 'hum', -20, dur=3.6), C(w('heart', 's128', 1.8), 'heartbeat', -14, dur=1.8, bpm=48)],
    's129': [C(0.42 * i + 0.3, 'swish', -20, seed=80 + i) for i in range(5)], 's131': [C(0.1, 'vacuum', -20, dur=3.6)], 's132': [C(0.1, 'carpass', -18)],
    's133': [C(1.0, 'creak', -14)], 's134': [C(0.6 + 0.25 * i, 'footstep', -16) for i in range(10)], 's135': [C(0.0, 'clock', -22)], 's136': [C(0.1, 'creak', -18)],
    's138': [C(w('liked', 's138', 0.3), 'shimmer', -18)], 's139': [C(0.5, 'shimmer', -24)],
    's145': [C(0.0, 'heartbeat', -16, dur=2.9, bpm=50)], 's146': [C(0.0, 'heartbeat', -20, dur=1.3, bpm=42)],
    's148': [C(0.1 + 0.25 * i, 'pop', -16) for i in range(5)], 's150': [C(0.7 + 0.45 * i, 'tick', -10) for i in range(4)],
    # the twist
    's151': [C(0.0, 'clock', -16), C(w('wake', 's151', 3.9), 'hit', -12), C(w('wrong', 's151', 5.8), 'stinger', -12)],
    's156': [C(0.3, 'whalesong', -20, pitch=0.8)], 's157': [C(0.2, 'whalesong', -16, pitch=0.75)], 's158': [C(0.0, 'whalesong', -10, pitch=0.6), C(0.2, 'impact', -18)],
    's159': [C(0.2 + 1.2 * i, 'whalesong', -12, pitch=0.6 + 0.08 * i, seed=90 + i) for i in range(3)],
    's160': [C(0.0, 'impact', -10), C(0.0, 'whalesong', -8, pitch=0.55, dur=4.5)], 's162': [C(w('asking', 's162', 0.5), 'stinger', -10)],
    's163': [C(w('comments', 's163', 7.0) - 0.3, 'pop', -12), C(w('subscribe', 's163', 8.5) - 0.2, 'ding', -12), C(w('whales', 's163', 10.0), 'whalesong', -16, pitch=0.7)],
}
# a soft pop whenever an animal starts a line (its bubble appears)
for sl in SLOTS:
    for s in SH:
        if s['start'] <= sl['start'] < s['end']: SFX.setdefault(s['id'], []).append(C(sl['start'] - s['start'], 'pop', -20)); break

amb = None
for s in SH:
    st = s['set']
    if s['id'] in AMB_SHOT: a = AMB_SHOT[s['id']]; amb = {'name': a[0], 'gain': a[1]} if a else None
    elif st in AMB: amb = {'name': AMB[st][0], 'gain': AMB[st][1]}
    elif st in NONE: amb = None
    if amb: s['amb'] = dict(amb)
    else: s.pop('amb', None)
    cues = SFX.get(s['id'])
    if cues is None and st == 'blueprint': cues = [C(0.25, 'blip', -18)]
    if cues: s['sfx'] = [{**c, 'at': round(max(0.0, c['at']), 2)} for c in cues]
    else: s.pop('sfx', None)
json.dump(D, open(SP, 'w'), indent=1, ensure_ascii=False)
print(f"music: {len(D['music'])} sections · sfx on {sum(1 for s in SH if s.get('sfx'))}/{len(SH)} shots · amb on {sum(1 for s in SH if s.get('amb'))}")
