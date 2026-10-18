---
name: horror-make-2d-video
description: >
  This skill should be used when the user wants a HORROR WARNING / SURVIVAL PROTOCOL animated video in the aiTrends 2D Horror style
  (uncanny black figures with red/white rim light, domestic spaces made wrong, giant dead-eye close-ups, freeze-frame "before it happens" moments,
  VHS glitch artifacts, scan lines, analog distortion, red warning text overlays, empty 3D rooms and dark streets), e.g.
  "make a horror video from this voiceover", "animate my survival protocol", "turn this warning narration into a video",
  "make a Final Sight style video", "create a Bradikinin protocol video", or "do the whole horror video".
  It runs the full pipeline: install, timestamps (Whisper), horror protocol story breakdown, horror style choice,
  scene building, rendering, tension music, unsettling SFX and final MP4 in 16:9 or 9:16 from 720p to 4K.
metadata:
  version: "1.0.0"
  author: aiTrends PRO
---
# aiTrends 2D Studio: HORROR WARNING Full Video Pipeline
Turn a voiceover (plus an optional script) into a finished MP4 where every frame is drawn by code (HTML canvas + Three.js), captured frame by frame in headless Chromium and encoded with ffmpeg. No image or video generation models are used, so the uncanny aesthetic stays consistent and warning text stays sharp. Invent the unsettling visuals fresh for every script; only the horror style is fixed.

**Core format:** "If [familiar thing behaves impossibly wrong]... [URGENT WARNING IN ALL CAPS]" — a survival protocol for situations reality never prepared you for. The narrator is calm, deadpan, authoritative — like a trained expert walking you through a crisis that shouldn't exist.

**Bundled resources (this skill's base directory):**
- `kit/`: the tested studio (renderer, engine, tools, audio, the `examples/phone-101-percent` HORROR reference project). Install it into the workspace as `aitrends-2d-studio-horror/` (see `references/install.md`).
- `references/install.md`: install, dependency table, doctor, self-test.
- `references/style-bible.md`: **THE HORROR LOOK** (uncanny characters, wrong spaces, wrong light, camera, glitch/VHS effects, editing, warning graphics, 9:16 rules, don'ts). Read it fully before designing any shot.
- `references/story-breakdown.md`: writing `story/bible.md` and `story/shots.json` for the HORROR PROTOCOL ARC, plus horror pacing rules.
- `references/engine-api.md`: the scene API, config and shots.json schemas, and the three-kit reference.
- `references/sound-design.md`: the horror music plan, unsettling SFX library, eerie ambience and levels.
- `references/render-qc.md`: preview and final render, speed guide, QC checklist, troubleshooting.

Stage commands from this plugin re-run one stage: `/horror-new-video` (stages 1-4), `/horror-video-styles` (5), `/horror-render-video` (6 and 8), `/horror-video-sound` (7). When running end to end, follow this file and load references as each stage needs them.

## Golden Rules — HORROR EDITION
1. **Keep the narration intact.** Never rewrite, add, drop or reorder spoken words. Every shot illustrates the words spoken while it is on screen. The calm deadpan delivery contrasts with the horrifying visuals — this contrast IS the horror.
2. **Same horror style, new uncanny pictures.** Invent sets, props, characters and wrongness from this script. Use `examples/phone-101-percent` only to learn the API.
3. **Show what is wrong, specifically.** The horror comes from FAMILIAR THINGS behaving SLIGHTLY WRONG. Not monsters — a dog standing on two legs, a phone at 101%, a cat watching you sleep. The uncanny valley is your canvas.
4. **Draft, look, feel the dread, then render.** Open contact sheets and stills yourself (read the PNGs) before any full render. Ask: does this frame make me feel uneasy? If not, add more wrongness.
5. **Three user checkpoints:** setup choices, horror style choice from rendered samples, and the preview before the final render. If the user is away, take the defaults, state what was assumed, and continue.
6. **Files are the truth.** Each video lives in `aitrends-2d-studio-horror/projects/<slug>/`, and `story/shots.json` owns all timing.
7. **THE RULE is sacred.** Every horror protocol video has ONE NON-NEGOTIABLE RULE that drives the entire story. Visualize it, repeat it, violate it in the "what happens if you break it" section.

## The Horror Protocol Arc (Story Structure)
Every video follows this 8-beat structure. Design shots around these story beats:

1. **COLD OPEN — The Uncanny Moment** (0:00-0:30): Drop the viewer directly into the wrongness. Show the familiar thing behaving impossibly. End on the first warning.
2. **THE RULE** (0:30-1:00): Establish THE RULE clearly. State it with authority. Visualize it as bold red text on screen. This is what you MUST do (or MUST NOT do).
3. **WHAT HAPPENS IF YOU BREAK IT** (1:00-2:00): The horror section. Through "field reports" or "previous incidents," show what happens to those who ignored THE RULE. Build dread. Wrongness, not gore.
4. **THE PROTOCOL — Step by Step** (2:00-4:00): The core instructional section. Walk the viewer through exactly what to do, in order. 4-6 clear steps. Each step visualized specifically.
5. **THE TEST / THE PUSH BACK** (4:00-5:00): The uncanny thing fights back. It tries to trick you. Mimics a voice. Shows you something you want. This is the tension peak.
6. **SURVIVAL / AFTERMATH** (5:00-5:30): How you know it's over. What "normal" looks like after. It never goes completely back. There's always a trace.
7. **STING / NEXT PROTOCOL** (5:30-5:45): A hint that this is not isolated. "And if your cat ever starts watching you while you sleep... that's a different protocol."
8. **CTA** (5:45-6:00): "Have you ever seen something that shouldn't exist? Tell us in the comments. And if this protocol ever saves your life... hit like. And subscribe for the next one."

## Stage 1: Intake
Ask once (AskUserQuestion when available) for:
- **Voiceover file** (required). Calm, deadpan, authoritative delivery recommended.
- **Script:** timestamped (SRT/VTT/JSON/TXT with `[mm:ss]`), plain text (best: aligned to the audio, keeping exact wording), or none (transcribed).
- **Aspect:** 16:9 or 9:16.
- **Resolution:** 720p / 1080p (recommended) / 1440p / 2160p (4K). Mention that higher resolutions take much longer to render.
- **Captions:** default on for 9:16, off for 16:9.
- **Music:** generated (horror moods), the user's own file, or none. **SFX:** on or off (CRITICAL for horror atmosphere).
- **Title.** Must follow: "If [trigger scenario]... [WARNING IN ALL CAPS]"
Don't ask about style yet. Defaults: 16:9, 1080p, 24 fps, generated horror tension music + SFX, style `abyss`.

## Stage 2: Install or check the studio
Follow `references/install.md`: copy `kit/` to `aitrends-2d-studio-horror/` in the workspace (skip if already present), install dependencies, run `python tools/verify_kit.py` and `python tools/doctor.py`, then run the HORROR example self-test (`examples/phone-101-percent`). Report what was installed in one short list.

## Stage 3: Project + timeline
Run inside `aitrends-2d-studio-horror/`. Use `python3` where `python` isn't Python 3.
```bash
python tools/new_project.py --name <slug> --voice "<voiceover path>" [--script "<script path>"] --aspect 16:9 --resolution 1080p --title "<title>" [--captions]
```
- Timestamped script: `python tools/parse_script.py --project projects/<slug> --script projects/<slug>/input/script.<ext>`
- Plain script: `python tools/transcribe.py --project projects/<slug> --script projects/<slug>/input/script.txt --lang en --model small`. The match must be ≥ 90%; if it's lower, tell the user the script and audio differ.
- No script: `python tools/transcribe.py --project projects/<slug> --lang en --model small` (`base` on slow machines, `large-v3` for hard audio).
Check `timeline/transcript.txt` (its end should be near the voiceover length), then run `python tools/beats.py --project projects/<slug>` to get the beat sheet and a draft `story/shots.json`.

## Stage 4: Horror Protocol Story Breakdown
Read `references/style-bible.md` (HORROR) and `references/story-breakdown.md`. Write `story/bible.md` (logline, horror tone, minimal cast with uncanny traits, locations made wrong, horror motifs, THE RULE visualization, music plan). Write `scenes/cast.js`. Rewrite `story/shots.json`: shots aligned to the Horror Protocol Arc, with longer holds (3-6s) on unsettling details, quick cuts (0.5-1.5s) on scares and glitch moments, a concrete `scene` description for each that emphasizes WHAT IS WRONG. Send the user a 5-10 line plan summary and continue unless they object.

## Stage 5: Horror Style Choice
Build the 1-2 most-used sets plus 3 representative shots (a wide empty room shot, a `bigFace` close-up with dead/empty eyes, a glitch/warning text shot). Then render:
```bash
node render.mjs --project projects/<slug> --styles abyss,bloodmoon,midnight,neondread,vhsnightmare --at <t1>,<t2>,<t3> --scale 0.5
```
Open `build/styles/style_grid.png`, then show it with one line per style:
- **abyss — Deep Abyss:** pure black shadows, blood-red rims, sickly green practicals; the default horror look, maximum dread.
- **bloodmoon — Blood Moon:** deep crimson tint, black shadows, white rims, moon-glow practicals; for animal uncanny and night encounters.
- **midnight — Midnight Blue:** cold navy void, blue-white rims, orange sodium practicals; for tech glitch and empty streets.
- **neondread — Neon Dread:** deep blacks, magenta and sickly green rims, strong bloom; for technology horror and digital wrongness.
- **vhsnightmare — VHS Nightmare:** desaturated, high contrast, heavy grain, scan lines baked in; analog horror aesthetic.

Save the pick in `config.json` → `style`. For tweaks, add a custom entry to `STYLES` in `engine/styles.js` (moods overrides plus the `grade` with extra grain, vignette, contrast crush, and optional `scanlines` 0-1 for baked-in CRT lines; per-shot glitches use `FX.glitch`) and re-render that row.

## Stage 6: Build every shot
Read `references/engine-api.md` and the example scenes in `examples/phone-101-percent/scenes/` once. Work in batches of 8-12 shots:
1. Write `scenes/sets/<location>.js` (reusable, anchored to `GY = E.H * V(0.8, 0.68)` and `CX = E.W/2`, with walls, floor and sky extended past the frame — but make them SLIGHTLY WRONG: windows that don't match the room, doors that lead nowhere, objects that float just enough to notice).
2. Write `scenes/shots/NN_<name>.js` with `registerShot('<id>', {...})` for the ids in shots.json. Add glitch frames, scan lines, static overlays, and red warning text where the protocol calls for it.
3. Run `node render.mjs --project projects/<slug> --sheet --scale 0.5`. Open every `build/sheets/sheet_XX.png` and check it against the QC checklist in `references/render-qc.md`. Fix any MISSING shots, errors printed by the renderer, and composition problems. Ask: does this frame feel UNSETTLING?
4. Check motion with `--stills t1,t2,t3` or `--from A --to B --scale 0.5` (writes `build/preview.mp4`).

Horror non-negotiables from the style bible:
- Rim light on every figure — usually RED for horror, sometimes white for cold tech scenes.
- Colours from `mood()`/`S()` — limited palette, mostly black/white/red.
- A camera move in every shot — slow, creeping, unsettling.
- Atmosphere: dust, static, glitch particles, scan lines, fog.
- Moody value structure: 80-90% dark, 1-2 bright accents (usually RED warning text or a single wrong light).
- Graphics synced to words with `wordTime()` — especially THE RULE and protocol steps.
- `V()` for every aspect-dependent value.
- No `Math.random`/`Date.now`.
- **WRONGNESS:** Every domestic space should have at least one subtly impossible element.

## Stage 7: Sound — HORROR EDITION
Read `references/sound-design.md`. Fill `story/shots.json` → `music` (contiguous horror mood sections: `unease, tension, dread, terror, relief_sting, void`). Add per-shot `sfx` cues: `glitch, static, riser, stinger, heartbeat, tick, hum, buzz, whisper, thud, distant_scream` and `amb` beds: `roomtone_low, hum_evil, static_amb, wind_empty, silence_thick`. Mixing happens after the final render (Stage 8), or run `python audio/mix.py --project projects/<slug>` now to audition `build/mix.wav`.

## Stage 8: Render and deliver
Read `references/render-qc.md`.
1. Preview: `node render.mjs --project projects/<slug> --from 0 --to 30 --scale 0.5`. Show the user the preview or a contact sheet before the long render.
2. Final: `node render.mjs --project projects/<slug>`. Run it in the background for long videos and poll the log. The log prints fps and ETA, so share the estimate.
3. Run `python audio/mix.py --project projects/<slug>`, which generates horror music and unsettling SFX, ducks the music under the voice, normalises to -14 LUFS and muxes `out/<title>.mp4`.
4. QC the final file: duration matches, audio is present and properly unsettling, and a 1-frame-per-10-s contact sheet looks right and feels WRONG. Deliver the MP4 (send the file), then give the location in plain words and one line on what to tweak next if needed.

## Defaults and judgement calls
- When unsure about a visual, choose the MORE UNSETTLING option: a longer hold on something wrong, a slightly off angle, a red glow where there shouldn't be one.
- Keep about 12-20 shots per minute. Horror needs TIME to breathe and build dread. Use 1-2 glitch/stutter moments per video and about one "empty room" 3D shot per minute to emphasize isolation.
- Keep each uncanny element consistent: if the dog's eyes are wrong, they're wrong the same way every time.
- Prefer re-rendering a fixed shot range over the whole video only when the user is comfortable splicing. Otherwise re-render everything.
