"""tools/align_offline.py — word-level timestamps with no model download (PocketSphinx forced alignment).

  python tools/align_offline.py --project projects/my-video [--script input/script.txt]

Use this instead of transcribe.py when Whisper can't fetch its model (e.g. huggingface.co is blocked).
It needs the exact script that was voiced: the words are forced onto the audio, so it can't catch
a script/audio mismatch by itself. As a check it also runs a rough free recognition pass and prints
how much of the script it heard; a low number means the script and the audio differ.
Writes timeline/words.json, timeline/sentences.json, timeline/transcript.txt (same as transcribe.py).
"""
import argparse, difflib, os, re, sys
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
from common import load_audio, load_json, norm_word, sentences_from_words, write_timeline
from transcribe import align_script

FILLER = {"<s>", "</s>", "<sil>", "(NULL)", "[NOISE]"}


def segments(dec):
    fr = dec.config["frate"] or 100
    out = []
    for s in dec.seg() or []:
        w = re.sub(r"\(\d+\)$", "", s.word)
        if w in FILLER or w.startswith("+"):
            continue
        out.append({"word": w, "start": round(s.start_frame / fr, 3), "end": round((s.end_frame + 1) / fr, 3)})
    return out


def decode(dec, pcm):
    dec.start_utt()
    dec.process_raw(pcm, full_utt=True)
    dec.end_utt()
    return segments(dec)


def fix_stranded_openers(words, gap=0.3):
    """The aligner sometimes parks a sentence's first word at the end of the previous sentence,
    before the pause. Move such a word to just after the pause, in front of the word it belongs to.
    A word with its own trailing punctuation ("Five.", "nothing.", "So,") ends a phrase, so a pause after it
    is real and it stays put."""
    end = r"[.?!…]['\"”’)]*$"
    for i in range(1, len(words) - 1):
        w, nxt = words[i], words[i + 1]
        if re.search(end, words[i - 1]["word"]) and not re.search(r"[.?!…,;:—–]['\"”’)]*$", w["word"]) and nxt["start"] - w["end"] > gap:
            dur = min(max(w["end"] - w["start"], 0.12), 0.3)
            w["start"], w["end"] = nxt["start"], round(nxt["start"] + dur, 3)
            nxt["start"] = min(w["end"], round(nxt["end"] - 0.05, 3))
            print(f"moved stranded '{w['word']}' to {w['start']:.2f}s")
    return words


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--project", required=True)
    ap.add_argument("--audio", help="defaults to config.json voiceover")
    ap.add_argument("--script", help="plain-text script that was voiced (defaults to config.json script)")
    a = ap.parse_args()
    cfg = load_json(os.path.join(a.project, "config.json"))
    audio_path = a.audio or os.path.join(a.project, cfg["voiceover"])
    script = a.script or (os.path.join(a.project, cfg["script"]) if cfg.get("script") else None)
    if not script or not os.path.exists(script):
        sys.exit("align_offline needs the exact script text (--script input/script.txt)")
    txt = open(script, encoding="utf-8").read()
    txt = re.sub(r"^\s*#.*$", "", txt, flags=re.M)  # drop markdown headings

    from pocketsphinx import Decoder  # pip install pocketsphinx (ships its English model)
    audio = load_audio(audio_path, 16000)
    pcm = (np.clip(audio, -1, 1) * 32767).astype(np.int16).tobytes()

    toks = [norm_word(t) for t in re.findall(r"\S+", txt)]
    toks = [t for t in toks if t]
    dec = Decoder(samprate=16000, bestpath=False, loglevel="FATAL")
    known = [t for t in toks if dec.lookup_word(t)]
    oov = sorted(set(toks) - set(known))
    if oov:
        print(f"not in the pronunciation dictionary (timed by interpolation): {', '.join(oov)}")

    # rough check that the audio says the script (free recognition, general English model)
    heard = [w["word"] for w in decode(dec, pcm)]
    ratio = difflib.SequenceMatcher(a=toks, b=heard, autojunk=False).ratio()
    print(f"rough recognition check: {100 * ratio:.0f}% of the script heard "
          f"(expect ~50-90% on clean speech; below ~35% the script and audio probably differ)")

    # long files need wide beams or the aligner prunes the true path and returns nothing
    dec = Decoder(samprate=16000, bestpath=False, loglevel="FATAL", beam=1e-200, pbeam=1e-200, wbeam=1e-150)
    dec.set_align_text(" ".join(known))
    print(f"aligning {len(known)} words (about 1 s of compute per second of audio)…")
    aligned = decode(dec, pcm)
    if len(aligned) < 0.9 * len(known):
        sys.exit(f"alignment failed ({len(aligned)}/{len(known)} words placed); check the script matches the audio")
    words = fix_stranded_openers(align_script(txt, aligned))
    write_timeline(os.path.join(a.project, "timeline"), words, sentences_from_words(words), "pocketsphinx-align+script")


if __name__ == "__main__":
    main()
