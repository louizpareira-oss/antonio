"""Validate working projects and reject substantive timing/module/audio errors."""
import sys,json,tempfile,shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(ROOT/'tools'))
from validate_project import validate

src=ROOT/'examples/archive-signal'
assert not validate(src,True),validate(src,True)
temp_root=ROOT/'build'/'validation-tests'
temp_root.mkdir(parents=True,exist_ok=True)
with tempfile.TemporaryDirectory(dir=temp_root) as d:
    assert Path(d).resolve().is_relative_to(temp_root.resolve())
    p=Path(d)/'project';shutil.copytree(src,p,ignore=shutil.ignore_patterns('build'))
    f=p/'story/shots.json';original=json.loads(f.read_text())
    for mutation,expected in [
        (lambda s:s['shots'][1].update(start=4.5),'timeline gap or overlap'),
        (lambda s:s['shots'][0].update(id='missing-module'),'Missing registered module'),
        (lambda s:s['shots'][0].update(sfx=[{'name':'missing-sound','at':0}]),'unknown sound'),
        (lambda s:s['shots'][0].pop('visual_change'),'missing visual_change'),
    ]:
        s=json.loads(json.dumps(original));mutation(s);f.write_text(json.dumps(s))
        errors=validate(p,True);assert any(expected in e for e in errors),(expected,errors)
print('PASS: valid project accepted; broken timeline, missing scene, unknown sound and missing creative state rejected.')

src=ROOT/'examples/coat-check'
assert not validate(src,True),validate(src,True)
with tempfile.TemporaryDirectory(dir=temp_root) as d:
    assert Path(d).resolve().is_relative_to(temp_root.resolve())
    p=Path(d)/'project';shutil.copytree(src,p,ignore=shutil.ignore_patterns('build'))
    f=p/'timeline/phrases.json';cues=json.loads(f.read_text());cues[1]['start']=0
    f.write_text(json.dumps(cues));assert any('overlapping' in e for e in validate(p,True))
    f.unlink();assert any('Cannot load phrase captions' in e for e in validate(p,True))
print('PASS: phrase project accepted; overlapping and missing phrase cues rejected.')
