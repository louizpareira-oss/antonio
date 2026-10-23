"""Adds the sound plan to story/shots.json: music sections, per-shot SFX cues and ambience beds.
Run after story/plan.py (which rewrites shots.json without sound):

  python3 projects/control-the-universe/story/sound.py
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
    ('s001', 'mystery', 0.45), ('s002', 'epic', 0.5), ('s003', 'mystery', 0.4), ('s007', 'wonder', 0.45), ('s010', 'mystery', 0.35),
    ('s013', 'calm', 0.4), ('s016', 'sad', 0.3), ('s019', 'calm', 0.35), ('s020', 'playful', 0.55), ('s031', 'triumph', 0.55),
    ('s035', 'tension', 0.45), ('s041', 'action', 0.5), ('s043', 'sad', 0.4), ('s044', 'tension', 0.6), ('s048', 'dark', 0.45),
    ('s050', 'wonder', 0.45), ('s061', 'tension', 0.4), ('s062', 'sad', 0.4), ('s068', 'hopeful', 0.45), ('s071', 'sad', 0.4),
    ('s073', 'calm', 0.35), ('s075', 'mystery', 0.45), ('s078', 'tension', 0.55), ('s080', 'epic', 0.55), ('s081', 'mystery', 0.5),
    ('s082', 'hopeful', 0.45),
]
D['music'] = [{'start': round(BY[a]['start'], 2), 'end': round(BY[MUSIC[i + 1][0]]['start'] if i + 1 < len(MUSIC) else D['duration'], 2), 'mood': m, 'intensity': k}
              for i, (a, m, k) in enumerate(MUSIC)]

# ambience by set; faces, inserts, phones and diagrams keep the bed of the location before them
AMB = {'street': ('city', -26), 'tokyo': ('city', -22), 'stadium': ('murmur', -18), 'nasa': ('hum', -28), 'ocean': ('underwater', -18),
       'backyard': ('wind', -30), 'observatory': ('wind', -32), 'flashback': ('wind', -32)}
for k in ['kitchen', 'bedroom', 'classroom', 'cafeteria', 'living']: AMB[k] = ('roomtone', -28)
NONE = {'title', 'blueprint', 'real', 'space', 'end'}
AMB_SHOT = {'s001': None, 's081': None}

def C(at, name, gain=-10, **kw): return {'at': at, 'name': name, 'gain': gain, **kw}
SFX = {
    # hook: the frozen coffee, the title, six lights, the rule, Grandma
    's001': [C(0.1, 'freeze', -10), C(0.3, 'shimmer', -18)], 's002': [C(0.1, 'impact', -10), C(0.3, 'shimmer', -14)], 's003': [C(0.0, 'clock', -18)],
    's004': [C(0.1, 'whoosh', -14), C(0.45, 'freeze', -10)], 's006': [C(0.3, 'hum', -16, dur=2.4), C(0.4, 'shimmer', -16)],
    's007': [C(0.2 + 0.22 * i, 'whoosh', -16, seed=10 + i) for i in range(6)] + [C(2.4, 'impact', -12)], 's008': [C(0.2, 'shimmer', -14)],
    's009': [C(w(n, 's009', 0.2 + 0.5 * i), 'ding', -16, pitch=1 + 0.08 * i) for i, n in enumerate(['time', 'space', 'energy', 'mind', 'matter', 'life'])],
    's010': [C(0.2, 'swish', -16)], 's011': [C(0.3, 'swish', -16), C(0.6, 'blip', -16, pitch=0.7)], 's012': [C(0.1, 'stinger', -18)],
    's014': [C(0.2, 'shimmer', -20)], 's017': [C(0.3, 'ding', -18, pitch=1.4)], 's018': [C(0.2, 'heartbeat', -20, dur=2.0, bpm=50)],
    # the fun part
    's020': [C(0.0, 'clock', -16), C(0.4, 'hit', -14)], 's021': [C(w('freeze', 's021', 0.3), 'freeze', -8)], 's022': [C(0.3 + 0.45 * i, 'footstep', -18) for i in range(5)],
    's023': [C(0.6, 'pop', -16)], 's024': [C(0.5, 'hit', -18, pitch=1.6)], 's025': [C(0.1, 'glitch', -12), C(1.5, 'ding', -14)],
    's026': [C(0.1, 'flash', -12), C(0.2, 'pop', -14)], 's027': [C(0.1, 'flash', -12), C(0.2, 'pop', -14)], 's028': [C(0.1, 'flash', -12)] + [C(0.3 + 0.25 * i, 'ding', -14, pitch=1.8) for i in range(3)],
    's029': [C(0.2, 'powerup', -12)], 's030': [C(0.3, 'shimmer', -14)], 's031': [C(0.25 + 0.4 * i, 'pop', -14, pitch=1 + 0.06 * i) for i in range(6)],
    's032': [C(w('gloves', 's032', 0.8), 'shimmer', -16), C(w('boots', 's032', 1.6), 'shimmer', -16)], 's033': [C(0.1, 'whoosh', -10), C(0.2, 'shimmer', -14)],
    # the curse
    's035': [C(0.1, 'stinger', -10)], 's036': [C(0.0, 'clock', -18, rate=1.0)], 's037': [C(0.3, 'hit', -16)], 's038': [C(0.3, 'whoosh', -12, dur=1.6)],
    's039': [C(0.0, 'impact', -4), C(0.05, 'crack', -8), C(0.1, 'thunder', -14)], 's040': [C(0.6 + 0.5 * i, 'tick', -12) for i in range(3)],
    's041': [C(0.0, 'cheer', -24)], 's043': [C(0.1, 'stinger', -16)], 's044': [C(0.1, 'riser', -12, dur=2.0), C(0.2, 'hum', -18)],
    's045': [C(0.1, 'blip', -14)], 's046': [C(0.2, 'glitch', -14), C(1.0, 'glitch', -16)], 's047': [C(0.1, 'carpass', -14)] + [C(1.3 + 0.5 * i, 'splash', -10, seed=40 + i) for i in range(3)],
    's048': [C(0.1 + 0.3 * i, 'blip', -14, pitch=1.5) for i in range(4)], 's049': [C(0.0, 'riser', -14), C(w('you', 's049', 0.3), 'impact', -10)],
    # is any of this real?
    's050': [C(0.1, 'impact', -10), C(0.4, 'shimmer', -14)], 's051': [C(0.2, 'whoosh', -16, dur=1.4)], 's052': [C(0.2, 'blip', -16), C(w('thirty', 's052', 1.2), 'ding', -16)],
    's053': [C(0.4, 'swish', -14)], 's054': [C(w('no', 's054', 0.9), 'hit', -12)], 's055': [C(0.3, 'powerup', -14), C(2.0, 'shimmer', -16)],
    's056': [C(0.1, 'pop', -14)], 's057': [C(0.3, 'riser', -16, dur=1.0), C(w('hiroshima', 's057', 2.6), 'impact', -8)], 's058': [C(0.2, 'bubbles', -14)], 's059': [C(0.3, 'bubbles', -18)],
    's060': [C(0.1 + 0.12 * i, 'ding', -18, pitch=1 + 0.1 * i) for i in range(6)], 's061': [C(0.0, 'riser', -10, dur=1.8), C(1.8, 'flash', -10)],
    # Grandma, the price, the twist
    's063': [C(0.6, 'hit', -18), C(0.7, 'stinger', -18)], 's065': [C(0.2, 'shimmer', -14), C(0.2, 'hum', -20, dur=2.0)], 's066': [C(0.4, 'whoosh', -16, dur=1.6)],
    's067': [C(0.3, 'powerup', -14), C(0.9, 'shimmer', -14)], 's068': [C(w('smiles', 's068', 1.0), 'shimmer', -18)], 's070': [C(0.2, 'creak', -16, dur=2.0), C(1.6, 'shimmer', -16)],
    's071': [C(0.3, 'glitch', -18)], 's072': [C(0.3, 'whoosh', -18)], 's074': [C(0.2, 'shimmer', -18)],
    's076': [C(0.3 + 0.2 * i, 'whoosh', -16, seed=60 + i) for i in range(6)], 's078': [C(0.3 + 0.15 * i, 'blip', -12, pitch=1.2) for i in range(6)],
    's079': [C(0.0, 'riser', -12, dur=2.6), C(w('slowing', 's079', 1.5), 'whoosh', -14)], 's080': [C(0.0, 'impact', -12), C(0.3, 'heartbeat', -16, dur=2.5, bpm=70)],
    's081': [C(0.05, 'freeze', -6), C(0.3, 'stinger', -10)],
    's082': [C(w('comments', 's082', 3.0) - 0.3, 'pop', -12), C(w('subscribe', 's082', 4.5) - 0.2, 'ding', -12)],
}
# a soft pop whenever an animal starts a line (its bubble appears)
for sl in SLOTS:
    for s in SH:
        if s['start'] <= sl['start'] < s['end']: SFX.setdefault(s['id'], []).append(C(sl['start'] - s['start'], 'pop', -24)); break

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
