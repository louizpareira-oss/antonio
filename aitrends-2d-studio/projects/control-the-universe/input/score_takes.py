"""Score voice takes: rough free-recognition match against the text that was voiced (higher = clearer, fewer slips).
  python3 input/score_takes.py <text file> <take.mp3> [...]
"""
import difflib, os, re, sys
import numpy as np
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../tools'))
from common import load_audio, norm_word
from pocketsphinx import Decoder

txt = re.sub(r'\[[^]]*\]', ' ', open(sys.argv[1]).read())
toks = [t for t in (norm_word(w) for w in re.findall(r'\S+', txt)) if t]
for path in sys.argv[2:]:
    a = load_audio(path, 16000)
    pcm = (np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()
    dec = Decoder(samprate=16000, bestpath=False, loglevel='FATAL')
    dec.start_utt(); dec.process_raw(pcm, full_utt=True); dec.end_utt()
    heard = [re.sub(r'\(\d+\)$', '', s.word) for s in (dec.seg() or [])]
    heard = [w for w in heard if not w.startswith(('<', '[', '+', '('))]
    r = difflib.SequenceMatcher(a=toks, b=heard, autojunk=False).ratio()
    print(f'{os.path.basename(path)}: {100 * r:.0f}%  {len(a) / 16000:.1f}s  {len(toks) / (len(a) / 16000) * 60:.0f} wpm')
