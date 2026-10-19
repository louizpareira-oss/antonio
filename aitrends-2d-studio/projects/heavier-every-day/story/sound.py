"""Adds the sound plan to story/shots.json: music sections, per-shot SFX cues and ambience beds.
Run after story/plan.py (which rewrites shots.json without sound):

  python3 projects/heavier-every-day/story/sound.py
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
    ('s001', 'tension', 0.55), ('s013', 'epic', 0.6), ('s014', 'playful', 0.45), ('s026', 'mystery', 0.45), ('s027', 'playful', 0.55),
    ('s033', 'triumph', 0.55), ('s037', 'calm', 0.4), ('s039', 'wonder', 0.4), ('s044', 'tension', 0.55), ('s046', 'dark', 0.4),
    ('s050', 'sad', 0.4), ('s053', 'tension', 0.5), ('s056', 'sad', 0.35), ('s058', 'playful', 0.5), ('s061', 'action', 0.6),
    ('s063', 'playful', 0.5), ('s066', 'tension', 0.45), ('s071', 'sad', 0.4), ('s074', 'mystery', 0.4), ('s079', 'calm', 0.4),
    ('s082', 'mystery', 0.55), ('s085', 'tension', 0.6), ('s090', 'dark', 0.45), ('s091', 'tension', 0.5), ('s097', 'sad', 0.45),
    ('s098', 'epic', 0.55), ('s099', 'sad', 0.4), ('s101', 'hopeful', 0.4), ('s105', 'wonder', 0.45), ('s108', 'hopeful', 0.45),
    ('s111', 'tension', 0.4), ('s112', 'calm', 0.4), ('s114', 'sad', 0.45), ('s116', 'tension', 0.7), ('s119', 'tension', 0.85),
    ('s122', 'action', 0.95), ('s124', 'mystery', 0.3), ('s126', 'wonder', 0.55), ('s130', 'hopeful', 0.45), ('s131', 'mystery', 0.4),
    ('s133', 'calm', 0.35), ('s154', 'wonder', 0.45), ('s158', 'mystery', 0.45), ('s161', 'tension', 0.7), ('s163', 'epic', 0.6),
    ('s166', 'hopeful', 0.45),
]
D['music'] = [{'start': round(BY[a]['start'], 2), 'end': round(BY[MUSIC[i + 1][0]]['start'] if i + 1 < len(MUSIC) else D['duration'], 2), 'mood': m, 'intensity': k}
              for i, (a, m, k) in enumerate(MUSIC)]

# ambience by set; inserts, faces and the seesaw keep the bed of the location before them
AMB = {'street': ('city', -24), 'river': ('water', -26), 'lake': ('water', -24), 'underwater': ('underwater', -18), 'pad': ('wind', -22), 'capsule': ('hum', -32)}
for k in ['bathroom', 'living', 'bedroom', 'school', 'gym', 'home', 'garage', 'cutaway']: AMB[k] = ('roomtone', -26)
NONE = {'blueprint', 'ui', 'title', 'end', 'orbit'}
AMB_SHOT = {'s085': ('wind', -26), 's088': ('wind', -24), 's116': ('wind', -22), 's117': None}

def C(at, name, gain=-10, **kw): return {'at': at, 'name': name, 'gain': gain, **kw}
# per-shot cues (times in seconds from the shot start)
SFX = {
    # hook: days 7-9, the title
    's001': [C(0.25, 'crack', -12)], 's002': [C(0.4, 'footstep', -14)], 's003': [C(w('sinks', 's003', 0.6), 'crack', -8), C(w('sinks', 's003', 0.6) + 0.1, 'impact', -14)],
    's004': [C(0.3, 'footstep', -16)], 's005': [C(0.2, 'pop', -14)], 's006': [C(0.6, 'hit', -12)], 's007': [C(w('caves', 's007', 0.5), 'impact', -6), C(w('caves', 's007', 0.5), 'crack', -10)],
    's008': [C(0.1, 'swish', -14)], 's010': [C(w('Ten', 's010', 0.4), 'hit', -10)], 's011': [C(0.0, 'heartbeat', -14)], 's012': [C(0.0, 'clock', -14), C(w('twice', 's012', 2.6), 'stinger', -6)],
    's013': [C(0.1, 'impact', -6), C(0.4, 'shimmer', -14)],
    # Monday: the scale, the chart, midnight
    's014': [C(0.9, 'footstep', -14)], 's015': [C(0.2, 'counter', -16, dur=2.4)], 's016': [C(0.6, 'hit', -12)], 's017': [C(0.2 + 0.18 * i, 'blip', -16, pitch=0.7) for i in range(4)],
    's018': [C(0.15, 'swish', -14)], 's019': [C(0.2, 'ding', -12)], 's020': [C(0.2, 'shimmer', -18)], 's021': [C(0.2 + 0.25 * i, 'blip', -16) for i in range(3)], 's022': [C(0.8, 'pop', -10)],
    's023': [C(0.6, 'whoosh', -12), C(1.9, 'impact', -6), C(1.9, 'crack', -10)], 's024': [C(0.3, 'pop', -14)], 's025': [C(0.45, 'crack', -6)],
    's026': [C(0.0, 'clock', -12), C(w('doubles', 's026', 4.2), 'stinger', -6)],
    # the weight seesaw
    **{f's0{n}': [C(0.1, 'swish', -14), C(0.7, 'pop', -12)] for n in range(27, 32)}, 's032': [C(0.1, 'swish', -14), C(0.7, 'impact', -8)],
    # the good days
    's033': [C(0.3, 'pop', -12)], 's034': [C(0.6, 'hit', -8)], 's035': [C(0.0, 'cheer', -18)], 's036': [C(w('inch', 's036', 1.2), 'hit', -14, pitch=1.8)],
    's037': [C(0.4, 'swish', -16)], 's038': [C(0.1, 'shimmer', -16)],
    # the lake: flashback, the jump, the sink
    's040': [C(0.3, 'whistle', -18)], 's044': [C(0.2 + 0.25 * i, 'footstep', -16) for i in range(11)], 's045': [C(0.0, 'whoosh', -10)],
    's046': [C(0.0, 'splash', -5), C(0.3, 'bubbles', -10)], 's047': [C(0.45, 'impact', -6)], 's048': [C(0.2, 'bubbles', -14)], 's049': [C(0.6, 'bubbles', -18)], 's051': [C(0.4, 'swish', -16)],
    # the house gives way; the garage
    's053': [C(1.3, 'creak', -10), C(w('give', 's053', 2.07), 'crack', -5)], 's054': [C(0.0, 'clock', -16), C(0.8, 'creak', -10)],
    's055': [C(w('through', 's055', 0.86), 'crack', -5), C(w('lands', 's055', 1.77), 'impact', -4)], 's056': [C(0.3, 'footstep', -16), C(0.9, 'footstep', -16)], 's057': [C(0.5, 'pop', -16)],
    # the pickup truck, the video
    's058': [C(0.1, 'swish', -14), C(0.7, 'pop', -12)], 's060': [C(0.1, 'carpass', -8), C(0.35, 'hit', -12)], 's061': [C(0.0, 'carpass', -6), C(0.0, 'riser', -14)],
    's062': [C(0.0, 'hum', -14)], 's063': [C(0.9, 'pop', -14, pitch=1.4)], 's064': [C(0.1, 'counter', -14, dur=2.5), C(2.4, 'ding', -12)], 's065': [C(w('Immovable', 's065', 0.4), 'stinger', -10)],
    # day 7-8: footprints, cars, buses, plates, school
    's066': [C(0.25 + 0.5 * i, 'kick', -12) for i in range(8)], 's067': [C(0.5, 'crack', -6), C(0.5, 'impact', -10)], 's068': [C(0.5, 'hit', -10, pitch=0.8)],
    's069': [C(0.6 + 0.9 * i, 'hit', -14, pitch=1.7) for i in range(4)], 's070': [C(0.1, 'swish', -14), C(0.7, 'pop', -12)], 's071': [C(0.2, 'ding', -10)],
    # day 9: the river, the bridge, the calls
    's074': [C(0.1, 'swish', -16)], 's077': [C(w('ten', 's077', 1.0), 'hit', -8)], 's078': [C(0.1, 'swish', -14), C(0.7, 'pop', -12)], 's079': [C(0.0, 'phonering', -10)], 's080': [C(0.4, 'phonebuzz', -16)],
    # Project Atlas: the forecast, the rocket, the limit
    's082': [C(0.3, 'hum', -12), C(1.6, 'whoosh', -14)], 's083': [C(0.2, 'shimmer', -14)], 's084': [C(0.3 + 0.5 * i, 'blip', -14) for i in range(4)],
    's085': [C(0.2, 'crack', -8), C(0.3, 'impact', -12)], 's086': [C(0.3 + 0.63 * i, 'kick', -10) for i in range(5)], 's087': [C(0.4, 'powerup', -12)],
    's088': [C(0.1, 'crack', -6), C(0.2, 'thunder', -12)], 's089': [C(0.1, 'swish', -14), C(0.8, 'impact', -6)], 's091': [C(0.2, 'shimmer', -14)], 's092': [C(0.3, 'blip', -12)],
    's093': [C(0.3, 'counter', -16, dur=1.1), C(1.4, 'ding', -12)], 's094': [C(0.3, 'counter', -16, dur=1.5), C(1.2, 'glitch', -10), C(1.6, 'stinger', -10)],
    's095': [C(0.1 + i, 'tick', -12) for i in range(3)], 's096': [C(0.0, 'clock', -12)], 's097': [C(0.0, 'heartbeat', -14)],
    's098': [C(0.2, 'whoosh', -6, dur=4.0), C(4.45, 'impact', -4)], 's100': [C(0.2, 'shimmer', -18)], 's101': [C(0.2, 'swish', -16)],
    # day 10: under the river, Grandpa
    's102': [C(0.3, 'hit', -12)], 's103': [C(0.0, 'hum', -18)], 's104': [C(2.2, 'splash', -12)], 's105': [C(0.2, 'bubbles', -12)], 's106': [C(0.2, 'bubbles', -12)], 's107': [C(0.5, 'bubbles', -16)],
    's110': [C(0.0, 'splash', -16)], 's111': [C(0.2, 'whoosh', -10), C(0.9, 'impact', -10), C(1.0, 'stinger', -10)], 's113': [C(w('five', 's113', 3.0) - 0.3, 'shimmer', -16)], 's115': [C(0.3, 'shimmer', -16)],
    # launch night
    's116': [C(0.2, 'hum', -16)], 's117': [C(0.2 + 0.2 * i, 'blip', -14) for i in range(4)], 's118': [C(0.0, 'clock', -14)],
    's119': [C(0.0, 'blip', -6, pitch=0.8)], 's120': [C(0.0, 'blip', -6, pitch=0.8)], 's121': [C(0.0, 'blip', -6, pitch=1.2), C(0.3, 'rocket', -8)],
    's122': [C(0.0, 'rocket', -2), C(0.1, 'impact', -6), C(0.2, 'thunder', -8)], 's123': [C(0.0, 'rocket', -10, dur=5.2), C(0.5, 'heartbeat', -14, dur=4.0)],
    's124': [C(0.2, 'impact', -12)], 's126': [C(0.1, 'shimmer', -14)], 's127': [C(0.5, 'shimmer', -18)], 's128': [C(0.1, 'swish', -18)], 's129': [C(0.2, 'shimmer', -14)],
    # is any of this real?
    's131': [C(0.0, 'riser', -12), C(0.6, 'impact', -10)], 's132': [C(0.6, 'glitch', -10)], 's134': [C(0.2, 'whoosh', -10, dur=2.0)], 's136': [C(0.0, 'heartbeat', -12, dur=3.6)],
    's137': [C(0.6, 'hit', -10)], 's140': [C(2.0, 'crack', -8)], 's142': [C(0.3, 'bubbles', -12)], 's143': [C(0.4, 'splash', -14)], 's145': [C(0.1, 'swish', -12)], 's146': [C(0.2, 'carpass', -14)],
    's149': [C(0.4, 'ding', -16)], 's151': [C(0.5, 'powerup', -10)], 's153': [C(0.3 + i, 'hit', -12, pitch=0.8) for i in range(3)],
    # day 20 in orbit: the pen
    's154': [C(0.0, 'swish', -14)], 's155': [C(w('Seventy-three', 's155', 0.15), 'impact', -6)], 's156': [C(0.1, 'swish', -14), C(0.7, 'impact', -8)], 's157': [C(1.4, 'shimmer', -16)],
    's159': [C(1.2, 'pop', -10, pitch=0.8)], 's160': [C(0.0, 'heartbeat', -12)], 's161': [C(0.0, 'riser', -10)], 's162': [C(0.0, 'stinger', -6)], 's163': [C(0.1, 'whoosh', -14)],
    's164': [C(0.4 + 0.98 * i, 'blip', -16) for i in range(4)], 's165': [C(1.0, 'riser', -12, dur=4.0), C(5.4, 'impact', -8)],
    's166': [C(0.6, 'pop', -12), C(0.9, 'ding', -12), C(w('Part', 's166', 6.0) - 0.3, 'impact', -8)],
}
amb = None
for s in SH:
    st = s['set']
    if s['id'] in AMB_SHOT: a = AMB_SHOT[s['id']]; amb = {'name': a[0], 'gain': a[1]} if a else None
    elif st in AMB: amb = {'name': AMB[st][0], 'gain': AMB[st][1]}
    elif st in NONE: amb = None
    if amb: s['amb'] = dict(amb)
    else: s.pop('amb', None)
    cues = SFX.get(s['id'])
    if cues is None and st == 'blueprint': cues = [C(0.25, 'blip', -16)]
    if cues is None and st == 'insert': cues = [C(0.1, 'swish', -16)]
    if cues: s['sfx'] = [{**c, 'at': round(max(0.0, c['at']), 2)} for c in cues]
    else: s.pop('sfx', None)
json.dump(D, open(SP, 'w'), indent=1, ensure_ascii=False)
print(f"music: {len(D['music'])} sections · sfx on {sum(1 for s in SH if s.get('sfx'))}/{len(SH)} shots · amb on {sum(1 for s in SH if s.get('amb'))}")
