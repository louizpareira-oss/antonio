---
name: horror-video-sound
description: >
  This skill should be used when the user runs /horror-video-sound or asks to "add horror music", "add unsettling sound effects",
  "design the horror soundscape", "change the music mood to dread", "use my own horror music", "the music is too loud/quiet",
  "remix the horror audio", or "redo the soundtrack" for an aiTrends 2D Studio Horror video. It plans mood-based generated
  horror music, places unsettling SFX and eerie ambience cues on the shot list, mixes them under the deadpan voiceover
  with ducking and loudness normalisation, and muxes the final MP4.
metadata:
  version: "1.0.0"
  author: aiTrends PRO
---
# /horror-video-sound: horror music, unsettling SFX, eerie ambience and the final mix
Work inside `aitrends-2d-studio-horror/` on the active project. Read `../horror-make-2d-video/references/sound-design.md` (HORROR EDITION) first.

## 1. Horror Music Plan
- Read `story/bible.md` and the shot list, then write `story/shots.json` → `"music"`: contiguous sections `{start, end, mood, intensity}` that change at each PROTOCOL ARC turn (cold open unease → THE RULE tension → break-the-rule dread → protocol void/tense → the test terror → aftermath relief_sting → sting unease → CTA void), typically every 30-90 s.
- **HORROR MOODS:** `unease, tension, dread, terror, relief_sting, void, dark`. Intensity 0-1 adds layers, dissonance and pulse.
- Audition a mood: `python audio/music.py --mood dread --intensity 0.7 --dur 20 --out build/test_dread.wav`, and send the WAV if the user wants to listen.
- **User's own horror track:** copy it into `projects/<slug>/input/` and set `config.json` → `"music": {"enabled": true, "file": "input/<name>.mp3", "gainDb": -20}`. It loops or trims, and the end fades.
- **No music:** `"music": {"enabled": false}` — use ambience and SFX alone for maximum dread.

## 2. Horror SFX and Ambience
- Per shot: `"sfx": [{"at": <s from shot start>, "name": "<effect>", "gain": -8}]` (optional `dur`, `seed`, `pitch`; `name` may be a path to the user's own WAV/MP3 inside the project). Per shot ambience: `"amb": {"name": "roomtone_low|hum_evil|static_amb|wind_empty|silence_thick|rain|murmur", "gain": -22}`.
- List the library with `python audio/sfx.py --list`, or audition it with `python audio/sfx.py --demo build/sfx_demo`.
- **HORROR SFX PLACEMENT:**
  - `glitch`/`static` on visual glitches and warning text appearing
  - `riser` building before wrongness reveals, then `stinger`/`impact` ON the reveal
  - `heartbeat` under tension moments (speeding up as terror increases)
  - `hum`/`buzz` under tech horror scenes
  - `whisper` very quiet, barely audible, when something is watching
  - `creak`/`thud` for off-screen wrongness
  - `tone_low` as a sustained dread foundation
  - **SILENCE is a tool** — leave gaps between cues
- Never stack more than ~2 cues at the same instant. Horror needs SPACE.

## 3. Mix and mux
Run `python audio/mix.py --project projects/<slug>`. It ducks the music -9 dB and ambience -5 dB under the voice, normalises to `config.loudness` (-14 LUFS default), writes `build/mix.wav`, and, when `build/video_silent.mp4` exists, writes `out/<title>.mp4`.
- Levels: `config.music.gainDb` (default -17; use -20 to -24 for horror to let silence and SFX breathe) and `config.sfx.gainDb` (default -6). Change them by 2-3 dB per iteration.
- QC: listen points or `ffmpeg -i out/<file>.mp4 -af ebur128=framelog=quiet -f null -` (integrated loudness about -14 LUFS) and check that the duration matches the video. Ask: does the voice feel like the only stable thing in a world of sonic wrongness?
