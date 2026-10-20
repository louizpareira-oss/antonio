"""Build short, stable phrase captions from verified narration word timings.

python tools/phrase_captions.py --project projects/my-video
Preserves every token. Review line breaks and add semantic highlights by hand.
"""
import argparse,json,re
from pathlib import Path

def make_phrases(words,max_words=6,max_chars=37):
    if max_words<1 or max_chars<1:raise ValueError('caption limits must be positive')
    result=[];group=[]
    def finish():
        if group:result.append({'start':round(max(0,group[0]['start']-.03),3),'end':round(group[-1]['end']+.12,3),'text':' '.join(w['word'].strip() for w in group),'highlight':[]})
        group.clear()
    for word in words:
        # ASR can place a very short token at a point; keep its wording in the phrase.
        if word['end']<word['start']:raise ValueError('word end must not precede word start')
        if group and (len(group)>=max_words or len(' '.join(w['word'] for w in group))+1+len(word['word'])>max_chars or word['start']-group[-1]['end']>.4):finish()
        group.append(word)
        if re.search(r'[.!?;:]\s*$',word['word']):finish()
    finish()
    for a,b in zip(result,result[1:]):a['end']=min(a['end'],b['start'])
    return result

if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--project',required=True);ap.add_argument('--max-words',type=int,default=6);ap.add_argument('--max-chars',type=int,default=37);args=ap.parse_args()
    p=Path(args.project);obj=json.loads((p/'timeline/words.json').read_text(encoding='utf-8-sig'));words=obj.get('words',[]) if isinstance(obj,dict) else obj
    if not words:ap.error('verified narration word timings are required')
    cues=make_phrases(words,args.max_words,args.max_chars)
    config=p/'config.json'
    if config.is_file():
        duration=json.loads(config.read_text(encoding='utf-8-sig')).get('duration')
        if isinstance(duration,(int,float)):
            for cue in cues:
                cue['end']=min(cue['end'],duration)
                if cue['end']<=cue['start']:ap.error('word timings exceed project duration; fix audio/timeline alignment')
    (p/'timeline/phrases.json').write_text(json.dumps(cues,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    print(f'Wrote {len(cues)} phrase captions; review timing, line breaks and semantic highlights.')
