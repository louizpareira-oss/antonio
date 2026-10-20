"""Check speech preservation and ordered caption timings across sentence/pause boundaries."""
from pathlib import Path
import importlib.util
ROOT=Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('phrases',ROOT/'tools/phrase_captions.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
words=[{'word':w,'start':i*.4,'end':i*.4+.24} for i,w in enumerate('Keep the light on. If it fails, keep your hands still.'.split())]
cues=m.make_phrases(words,max_words=4,max_chars=25)
assert ' '.join(c['text'] for c in cues)==' '.join(w['word'] for w in words)
assert all(a['end']<=b['start'] for a,b in zip(cues,cues[1:]))
assert all(c['end']>c['start'] for c in cues)
assert cues[0]['text']=='Keep the light on.'
point=m.make_phrases([{'word':'Wait.','start':1.,'end':1.}]);assert point[0]['text']=='Wait.' and point[0]['end']>point[0]['start']
print('PASS: phrase captions preserve every speech token and keep ordered, nonoverlapping timings.')
