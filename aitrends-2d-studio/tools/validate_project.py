"""Validate a timed project without importing audio or executing scene code."""
import argparse,ast,json,math,re,sys
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent
def audio_names():
    tree=ast.parse((ROOT/'audio/music.py').read_text(encoding='utf-8-sig'))
    moods=set()
    for n in ast.walk(tree):
        if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='MOODS' for t in n.targets) and isinstance(n.value,ast.Dict):moods.update(k.value for k in n.value.keys)
        if isinstance(n,ast.Call) and isinstance(n.func,ast.Attribute) and isinstance(n.func.value,ast.Name) and n.func.value.id=='MOODS' and n.func.attr=='update' and n.args and isinstance(n.args[0],ast.Dict):moods.update(k.value for k in n.args[0].keys)
    tree=ast.parse((ROOT/'audio/sfx.py').read_text(encoding='utf-8-sig'))
    sounds={n.name for n in tree.body if isinstance(n,ast.FunctionDef) and any(isinstance(d,ast.Call) and isinstance(d.func,ast.Name) and d.func.id=='sfx' for d in n.decorator_list)}
    return moods,sounds

def validate(project,creative=False):
    p=Path(project).resolve();errors=[]
    try:
        cfg=json.loads((p/'config.json').read_text(encoding='utf-8-sig'))
        story=json.loads((p/'story/shots.json').read_text(encoding='utf-8-sig'))
    except (OSError,ValueError) as e:return [str(e)]
    shots=story.get('shots',[])
    if not isinstance(shots,list) or not shots:return ['A nonempty shots array is required']
    duration=story.get('duration');ids=set();last=0.;moods,sounds=audio_names()
    if not isinstance(duration,(int,float)) or not math.isfinite(duration) or duration<=0:errors.append('Invalid duration')
    if cfg.get('aspect','16:9') not in ['16:9','9:16']:errors.append('Invalid aspect')
    if cfg.get('voiceover') and not (p/cfg['voiceover']).is_file():errors.append('Voiceover file is missing; clear voiceover for an explicitly silent preview')
    if cfg.get('captions') and cfg.get('captionStyle',{}).get('mode')=='phrase':
        try:
            phrases=json.loads((p/'timeline/phrases.json').read_text(encoding='utf-8-sig'))
            if isinstance(phrases,dict):phrases=phrases.get('phrases',[])
            if not isinstance(phrases,list) or not phrases:errors.append('Phrase captions are enabled but no cues exist')
            else:
                prev_end=0
                for cue in phrases:
                    a,b=cue.get('start'),cue.get('end')
                    valid=all(isinstance(v,(int,float)) and math.isfinite(v) for v in [a,b])
                    if not valid or a<prev_end-.001 or b<=a or (isinstance(duration,(int,float)) and b>duration+.02):errors.append('Invalid, overlapping or out-of-range phrase caption timing')
                    if valid:prev_end=b
                    if not isinstance(cue.get('text'),str) or not cue['text'].strip():errors.append('Empty phrase caption')
                    if not isinstance(cue.get('highlight',[]),list) or not all(isinstance(s,str) for s in cue.get('highlight',[])):errors.append('Phrase highlights must be strings')
        except (OSError,ValueError,TypeError,AttributeError) as e:errors.append(f'Cannot load phrase captions: {e}')
    source='\n'.join(f.read_text(encoding='utf-8-sig') for f in (p/'scenes').rglob('*.js') if not f.name.startswith('_'))
    registered=set(re.findall(r"registerShot\(\s*['\"]([^'\"]+)['\"]",source))
    def sound(name,where):
        if not isinstance(name,str):errors.append(f'{where}: missing audio name');return
        if re.search(r'\.(wav|mp3|ogg|flac|m4a)$',name,re.I):
            if not (p/name).is_file():errors.append(f'{where}: audio file missing: {name}')
        elif name not in sounds:errors.append(f'{where}: unknown sound: {name}')
    for i,s in enumerate(shots):
        sid=s.get('id',f'index {i}')
        if sid in ids:errors.append(f'Duplicate id: {sid}')
        ids.add(sid)
        if sid not in registered:errors.append(f'Missing registered module: {sid}')
        start,end=s.get('start'),s.get('end')
        if not all(isinstance(v,(int,float)) and math.isfinite(v) for v in [start,end]) or end<=start:
            errors.append(f'{sid}: invalid timing');continue
        if abs(start-last)>.04:errors.append(f'{sid}: timeline gap or overlap at {start}; expected {last}')
        last=end
        if not s.get('scene') or s['scene'].strip().upper()=='TODO':errors.append(f'{sid}: scene is not authored')
        if creative:
            for key in ['purpose','visual_change','asset']:
                if not isinstance(s.get(key),str) or not s[key].strip():errors.append(f'{sid}: missing {key}')
        if s.get('in',{}).get('type','cut') not in ['cut','fade','dip','dipWhite','flash','whip','zoom','glitch']:errors.append(f'{sid}: unknown transition')
        if 'cue_at' in s and (not isinstance(s['cue_at'],(int,float)) or not 0<=s['cue_at']<=end-start):errors.append(f'{sid}: cue outside shot')
        for c in s.get('sfx',[]) or []:
            sound(c.get('name'),sid)
            at=c.get('at',0)
            if not isinstance(at,(int,float)) or not 0<=at<=end-start:errors.append(f'{sid}: SFX cue outside shot')
        if s.get('amb'):sound(s['amb'].get('name'),sid)
    if isinstance(duration,(int,float)) and abs(last-duration)>.04:errors.append('Last shot end differs from story duration')
    for s in story.get('music',[]) or []:
        if s.get('mood') not in moods:errors.append(f'Unknown music mood: {s.get("mood")}')
        if not 0<=s.get('start',-1)<s.get('end',-1)<=duration:errors.append('Music section outside timeline')
    for c in story.get('sfx',[]) or []:
        sound(c.get('name'),'story')
        if not 0<=c.get('t',-1)<=duration:errors.append('Global SFX cue outside timeline')
    return errors

if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--project',required=True);ap.add_argument('--creative',action='store_true');a=ap.parse_args()
    errors=validate(a.project,a.creative)
    for e in errors:print('ERROR:',e)
    print('Project validation passed.' if not errors else f'{len(errors)} validation error(s).')
    sys.exit(bool(errors))
