"""Verify the distributed kit against integrity.json before customization."""
from pathlib import Path
import hashlib,json,sys
ROOT=Path(__file__).resolve().parent.parent
expected=json.loads((ROOT/'integrity.json').read_text(encoding='utf-8'))
bad=[]
for rel,want in expected.items():
    p=ROOT/rel
    if not p.is_file():bad.append(('MISSING',rel));continue
    got=hashlib.sha256(p.read_bytes()).hexdigest()
    if got!=want:bad.append(('MISMATCH',rel))
for kind,rel in bad:print(kind,rel)
print(f'{len(expected)-len(bad)}/{len(expected)} distributed files verified.')
if bad:print('Restore missing files; intentional edits will also change their hashes.')
sys.exit(bool(bad))
