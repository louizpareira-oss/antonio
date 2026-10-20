"""Exercise every new preset with actual synthesis, plus all reference-project cues."""
import sys,json
from pathlib import Path
print('Loading audio dependencies...',flush=True)
import numpy as np
ROOT=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(ROOT/'audio'))
import sfx,music

def valid(x,label):
    assert x.ndim==2 and x.shape[1]==2 and len(x)>0,label
    assert np.isfinite(x).all(),label
    assert np.max(np.abs(x))>0,label

story=json.loads((ROOT/'examples/phone-101-percent/story/shots.json').read_text())
names={c['name'] for s in story['shots'] for c in s.get('sfx',[])}|{s['amb']['name'] for s in story['shots'] if s.get('amb')}
for name in sorted(names):
    print('SFX:',name,flush=True);valid(sfx.make(name,dur=.8),name)
for name in ['unease','tension','dread','terror','void','relief_sting']:
    print('Music:',name,flush=True);valid(music.render_section(name,.6,1.),name)
valid(music.render_score([{'start':0,'end':.6,'mood':'dread','intensity':.5}],.6),'short score')
from dsp import fade
assert len(fade(np.ones((100,2),np.float32),1,1))==100
try:sfx.make('not-a-real-effect')
except KeyError:pass
else:raise AssertionError('Unknown sound was accepted')
print(f'PASS: {len(names)} reference effects/ambiences and 6 music moods synthesize finite nonempty stereo audio.')
