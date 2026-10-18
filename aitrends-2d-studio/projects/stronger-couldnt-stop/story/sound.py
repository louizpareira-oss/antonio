"""Adds the sound plan to story/shots.json: music sections, per-shot SFX cues and ambience beds.
Run after story/plan.py (which rewrites shots.json without sound):

  python3 projects/stronger-couldnt-stop/story/sound.py
"""
import json, os, re
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SP = os.path.join(P, 'story/shots.json')
D = json.load(open(SP)); SH = D['shots']; BY = {s['id']: s for s in SH}
W = json.load(open(os.path.join(P, 'timeline/words.json')))['words']
norm = lambda w: re.sub(r"[^a-z0-9']", '', w.lower().replace('’', "'"))

def w(word, sid, fallback=0.3):
    """seconds from the start of shot sid to the first time `word` is spoken in it"""
    s = BY[sid]
    for x in W:
        if s['start'] <= x['start'] < s['end'] and norm(x['word']) == norm(word): return round(x['start'] - s['start'], 2)
    return fallback

# music: (first shot, mood, intensity) — each section runs until the next one starts
MUSIC = [
    ('s001', 'tension', 0.55), ('s012', 'epic', 0.6), ('s013', 'playful', 0.5), ('s019', 'wonder', 0.5), ('s029', 'triumph', 0.6),
    ('s037', 'tension', 0.45), ('s051', 'dark', 0.35), ('s057', 'epic', 0.65), ('s066', 'sad', 0.35), ('s068', 'calm', 0.35),
    ('s086', 'sad', 0.4), ('s089', 'tension', 0.5), ('s090', 'mystery', 0.5), ('s101', 'playful', 0.4), ('s107', 'tension', 0.4),
    ('s113', 'hopeful', 0.45), ('s119', 'tension', 0.85), ('s124', 'action', 0.9), ('s127', 'tension', 0.7), ('s130', 'epic', 0.95),
    ('s136', 'hopeful', 0.55), ('s141', 'sad', 0.4), ('s149', 'wonder', 0.4), ('s166', 'hopeful', 0.45), ('s168', 'mystery', 0.5),
    ('s173', 'tension', 0.7), ('s176', 'epic', 0.55),
]
D['music'] = [{'start': round(BY[a]['start'], 2), 'end': round(BY[MUSIC[i + 1][0]]['start'] if i + 1 < len(MUSIC) else D['duration'], 2), 'mood': m, 'intensity': k}
              for i, (a, m, k) in enumerate(MUSIC)]

# ambience by set; inserts and faces keep the bed of the location before them
AMB = {'street': ('city', -24), 'road': ('city', -24), 'city': ('city', -20), 'harbor': ('wind', -24), 'rail': ('wind', -26), 'build': ('wind', -26),
       'pitch': ('murmur', -20), 'hospital': ('hum', -28), 'steel': ('hum', -24), 'mountain': ('wind', -22), 'rubble': ('wind', -22)}
for k in ['kitchen', 'bedroom', 'bathroom', 'living', 'patel', 'classroom', 'hall', 'office', 'store', 'gym', 'garage', 'nursery', 'visit', 'cutaway']: AMB[k] = ('roomtone', -26)
NONE = {'data', 'blueprint', 'title', 'end', 'phoneui', 'space'}

def C(at, name, gain=-10, **kw): return {'at': at, 'name': name, 'gain': gain, **kw}
# per-shot cues (times in seconds from the shot start)
SFX = {
    's001': [C(0.2, 'pop', -14), C(0.6, 'hit', -10)], 's002': [C(0.5, 'swish', -14)], 's003': [C(w('folds', 's003'), 'hit', -6), C(w('folds', 's003') + 0.05, 'flash', -12)],
    's004': [C(0.2, 'pop', -14), C(0.4, 'footstep', -16)], 's005': [C(w('high', 's005', 0.5), 'impact', -5)], 's006': [C(0.2, 'whoosh', -8), C(1.0, 'hit', -10)],
    's007': [C(0.2, 'pop', -14)], 's008': [C(0.1, 'whoosh', -8), C(0.15, 'impact', -4)], 's009': [C(0.2, 'hit', -12, pitch=1.6), C(0.7, 'hit', -12, pitch=1.5), C(1.2, 'hit', -12, pitch=1.7)],
    's010': [C(0.0, 'clock', -16)], 's011': [C(0.0, 'riser', -10), C(w('twice', 's011', 1.0), 'stinger', -6)], 's012': [C(0.1, 'impact', -4), C(0.6, 'shimmer', -12)],
    's013': [C(0.0, 'clock', -14), C(0.4, 'ding', -12)], 's014': [C(w('twice', 's014', 0.8), 'hit', -8)], 's015': [C(w('twice', 's015', 0.8), 'pop', -8)],
    's016': [C(0.3 + 0.4 * i, 'blip', -16) for i in range(5)], 's017': [C(0.3, 'counter', -16, dur=2.0)], 's018': [C(0.3, 'swish', -16), C(0.9, 'swish', -16)],
    's019': [C(0.0, 'riser', -12)], 's020': [C(0.2, 'whoosh', -12)], 's021': [C(0.4, 'hit', -10)], 's022': [C(0.3, 'impact', -8)], 's023': [C(0.3, 'impact', -6), C(0.35, 'stinger', -10)],
    's031': [C(0.6, 'pop', -10)], 's033': [C(0.4, 'hit', -10)], 's035': [C(0.6, 'impact', -8)], 's036': [C(0.3, 'impact', -6)], 's038': [C(0.4, 'hit', -12, pitch=1.4), C(1.1, 'hit', -12, pitch=1.5)],
    's040': [C(0.5, 'hit', -8)], 's043': [C(0.6, 'hit', -8)], 's049': [C(0.4, 'impact', -8)], 's052': [C(0.3, 'impact', -10)], 's056': [C(0.3, 'impact', -6)],
    's057': [C(0.2, 'counter', -16, dur=2.5)], 's058': [C(0.2, 'counter', -16, dur=2.5)], 's059': [C(0.0, 'cheer', -14), C(0.5, 'kick', -8), C(0.8, 'impact', -8), C(1.2, 'stinger', -8)],
    's060': [C(0.5, 'stinger', -8)], 's063': [C(0.6, 'impact', -8)], 's064': [C(0.0, 'riser', -12)], 's065': [C(0.0, 'carpass', -12), C(0.55, 'impact', -4)], 's066': [C(0.75, 'hit', -8)],
    's070': [C(0.4, 'carpass', -12)], 's072': [C(w('came', 's072', 2.8), 'hit', -6)], 's078': [C(0.2, 'pop', -12)], 's087': [C(0.0, 'heartbeat', -14)], 's089': [C(0.0, 'heartbeat', -10)],
    's090': [C(0.3, 'carpass', -12)], 's091': [C(0.3, 'swish', -10)], 's092': [C(0.3, 'shimmer', -14)], 's095': [C(0.8, 'swish', -10), C(1.4, 'hit', -12)], 's097': [C(1.3, 'hit', -14, pitch=1.3)],
    's102': [C(0.1, 'swish', -16)], 's103': [C(0.2, 'pop', -14), C(1.2, 'tick', -12)], 's104': [C(w('break', 's104', 0.6), 'impact', -4)], 's105': [C(0.45, 'impact', -5)],
    's106': [C(0.2, 'counter', -14, dur=3.4)], 's108': [C(w('twice', 's108', 1.4), 'shimmer', -10)], 's109': [C(0.1, 'pop', -12), C(w('careful', 's109', 2.2) - 0.3, 'pop', -12)],
    's110': [C(0.0, 'slowmo', -10)], 's111': [C(0.2, 'shimmer', -14)], 's112': [C(0.0, 'whoosh', -14)], 's113': [C(0.6, 'pop', -14)], 's114': [C(0.6, 'pop', -14)],
    's115': [C(0.0, 'heartbeat', -14)], 's116': [C(0.2, 'ding', -10)], 's117': [C(0.0, 'clock', -14)],
    's119': [C(0.0, 'phonering', -6)], 's120': [C(0.0, 'thunder', -6), C(0.1, 'impact', -8)], 's123': [C(0.0, 'stinger', -10)],
    's124': [C(0.1, 'whoosh', -10), C(0.0, 'impact', -10), C(0.91, 'impact', -10), C(1.82, 'impact', -10)], 's125': [C(0.1, 'whoosh', -10)], 's126': [C(0.22, 'impact', -3)],
    's127': [C(w('four', 's127', 2.2), 'pop', -12)], 's128': [C(0.0, 'glitch', -16), C(0.3, 'pop', -14)], 's129': [C(0.2, 'blip', -14), C(0.7, 'stinger', -10)], 's130': [C(0.3, 'powerup', -8)],
    's131': [C(0.0, 'riser', -8), C(0.5, 'impact', -6), C(0.6, 'thunder', -10)], 's132': [C(0.0, 'heartbeat', -12)], 's133': [C(0.3, 'shimmer', -10)], 's134': [C(0.62, 'flash', -10)],
    's135': [C(1.2, 'shimmer', -12)], 's140': [C(w('beat', 's140', 3.2), 'ding', -6)],
    's141': [C(w('twice', 's141', 1.8), 'powerup', -10)], 's142': [C(0.0, 'riser', -12)], 's146': [C(0.05, 'hit', -12, pitch=1.4), C(0.2, 'stinger', -8)],
    's149': [C(0.3, 'shimmer', -12)], 's150': [C(0.4, 'hit', -10)], 's151': [C(w('brakes', 's151', 1.6) - 0.2 + 0.12 * i, 'pop', -14) for i in range(4)], 's152': [C(0.2, 'blip', -14)],
    's153': [C(1.4, 'hit', -10)], 's154': [C(0.8 + 0.2 * i, 'pop', -14) for i in range(3)], 's155': [C(0.6, 'pop', -12)], 's156': [C(w('two', 's156', 0.6), 'pop', -12), C(w('germany', 's156', 2.2), 'blip', -14)],
    's157': [C(0.1, 'counter', -16, dur=1.5)], 's158': [C(0.5, 'blip', -14)], 's159': [C(1.0, 'blip', -12), C(2.4, 'ding', -12)], 's160': [C(0.1, 'pop', -12)], 's161': [C(0.3, 'whoosh', -12)],
    's162': [C(0.4 + 0.25 * i, 'blip', -15) for i in range(4)], 's163': [C(0.3 + 0.18 * i, 'pop', -16) for i in range(8)], 's164': [C(0.4, 'pop', -14)], 's165': [C(1.3, 'kick', -8)], 's167': [C(0.2, 'shimmer', -10)],
    's168': [C(0.0, 'heartbeat', -14)], 's169': [C(0.2, 'counter', -12, dur=2.4), C(0.0, 'riser', -14)], 's170': [C(0.0, 'phonebuzz', -6)], 's171': [C(0.0, 'phonering', -8)],
    's174': [C(0.0, 'stinger', -8)], 's175': [C(w('twice', 's175', 2.8), 'shimmer', -8), C(w('twice', 's175', 2.8), 'stinger', -10)],
    's176': [C(0.6, 'pop', -12), C(0.9, 'ding', -12), C(w('part', 's176', 9.0) - 0.3, 'impact', -8)],
}
amb = None
for s in SH:
    st = s['set']
    if st in AMB: amb = {'name': AMB[st][0], 'gain': AMB[st][1]}
    elif st in NONE: amb = None
    if amb: s['amb'] = dict(amb)
    else: s.pop('amb', None)
    cues = SFX.get(s['id'])
    if cues is None and st in ('data', 'blueprint'): cues = [C(0.25, 'blip', -16)]
    if cues is None and st == 'insert': cues = [C(0.1, 'swish', -16)]
    if cues: s['sfx'] = [{**c, 'at': round(max(0.0, c['at']), 2)} for c in cues]
    else: s.pop('sfx', None)
json.dump(D, open(SP, 'w'), indent=1, ensure_ascii=False)
print(f"music: {len(D['music'])} sections · sfx on {sum(1 for s in SH if s.get('sfx'))}/{len(SH)} shots · amb on {sum(1 for s in SH if s.get('amb'))}")
