---
name: myth-pov
description: Master system for the "Myth POV" YouTube Shorts channel — second-person mythology stories ("You're Baldr…") told over code-rendered 3D animation with real motion capture, vertical 9:16. Use for anything on this channel — installing the toolchain, channel identity (name, about text), analysing reference videos frame by frame, writing scripts, voices, building characters and sets, camera/light/cut grammar, rendering, captions, sound, thumbnails/titles and upload text.
---

# Myth POV: master system

One skill for the whole niche: identity, installation, analysis, script, voice, 3D build, render, upload.
Everything here is measured from 7 reference Shorts (3 myth Shorts by creator 1, 4 casino/law Shorts by creator 2
who copies the same format with more polish). We keep their **craft grammar** (framing, camera moves, light logic,
cut rhythm, caption timing, narration pace) and build **our own** characters, worlds and words.

## 0. Read first (in this order)
| File | What it holds |
|---|---|
| `references/channel.md` | Name, handle, tagline, About text, links, upload defaults, profile/banner prompts |
| `references/format-formula.md` | The measured formula: length, wpm, shot length, captions, loudness, story beats |
| `references/style-bible.md` | OUR look: the hero "You", cast rules, worlds, light presets, grade, never-copy list |
| `references/shot-library.md` | Shot recipes with camera numbers (height, distance, FOV, move, easing, duration) |
| `references/script-formula.md` | Narration rules, beat sheet, hook/loop lines, 12 pilot topics |
| `references/production-workflow.md` | Step by step from idea to MP4, with exact commands |
| `references/upload.md` | Title, description, tags, AI-disclosure answer, pinned comment, cross-posting |
| `references/flip-and-fix.md` | Every weakness of the references, with evidence, and what we do instead |
| `references/breakdowns/ref-*-breakdown.md` | Frame-by-frame teardowns of the references (shot tables, numbers) |
| `references/cmu-mocap-index.txt` | Index of the 2,500 CMU motion-capture clips (free for any use) |

## 1. Install (once per machine / container)
```bash
bash skills/myth-pov/scripts/install.sh        # apt + pip + npm, then a self-test
```
It installs Blender 4.0 (headless via xvfb), mesa, numpy for Blender, ffmpeg, tesseract, Python OpenCV,
PySceneDetect, RapidOCR, PocketSphinx, the studio's npm packages (three, playwright), and checks Chromium.
`render.mjs` falls back to the pre-installed Chromium (`/opt/pw-browsers/chromium` or `$CHROME_PATH`).

## 2. The pipeline (one video)
1. **Topic + script** → `references/script-formula.md`. 60–85 s, 200–230 wpm, second person, hook in the first line.
   Save to `scripts/myth/NN-<slug>.md`. Get the user's OK before voicing.
2. **Voice** → ElevenLabs connector (narrator voice from `references/channel.md`), export MP3 to `projects/<slug>/audio/voice.mp3`.
3. **Word timings** → `python tools/align_offline.py --project projects/<slug>` (huggingface is blocked; this is offline).
4. **Shot list** → `projects/<slug>/story/shots.json`: one shot per 1–4 caption chunks (avg 1.6–2.4 s), each with a
   `recipe` id from the shot library, a `light` preset and the actions. Cut on the first word of the next chunk.
5. **Assets** → characters: `scripts/fetch_mocap.sh <clip ids>` then
   `xvfb-run -a blender -b --python skills/myth-pov/scripts/build_character.py -- <spec.json>` → `.glb` with every clip as an animation.
6. **Scenes** → `projects/<slug>/scenes/*.js` using `engine/myth3d.js` (camera recipes, light presets, mocap player, sets).
7. **Check** → `node render.mjs --project P --sheet` (one still per shot) and look at every still before rendering.
8. **Render** in 40-s pieces: `node render.mjs --project P --from 0 --to 40 --out build/segs/seg_000.mp4` … then ffmpeg concat.
9. **Sound** → voice + music bed (−24 to −28 dB under voice) + SFX on cuts/impacts, master at **−14 LUFS**, true peak ≤ −1 dB.
10. **Upload text** → `projects/<slug>/story/upload.md` per `references/upload.md`.

Scaffold a new project: `bash skills/myth-pov/scripts/new_project.sh <slug>` (copies `studio/template`, links the kit).

## 3. Hard rules
- **9:16, 1080×1920, 30 fps**, 60–85 s. Burned-in captions (small, white, y ≈ 0.70 of height, 1–4 words, no box).
- Faces and captions stay out of the Shorts UI: bottom 20 % and right 12 % of the frame.
- Opening frame: the most impossible image of the story, mid-action, within 0.5 s. No logo, no intro.
- A picture change at least every 3 s (references average 1.6–2.6 s). Locked-off shots only on emotional beats.
- Every character moves with **mocap or a deliberate pose**, never a frozen T-pose or sliding feet.
- **Never copy**: no box heads, no pasted photos of real people or paintings as faces, no fake real-app UI,
  no lines lifted from their scripts, no store assets ripped from games. Myths are public domain; their scripts are not.
- Real organisations or people only as plain text names, never logos or faces.
- Facts in the "is this real?" beat must be checkable (name the source in `story/sources.md`).

## 4. Quality gates (before upload)
- Contact sheet: every shot readable at phone size, character ≥ 35 % of frame height in MCU/MS shots.
- Centre brightness 85–120 on day shots (`scripts/measure_reference.py` on our own MP4 gives the numbers).
- Loudness −14 LUFS ±1, no silence gap > 0.4 s except the one planned beat pause.
- Captions match the voice word for word (align_offline prints % heard).
- First 3 s: the hook line is finished and the picture has changed at least once.

## 5. Analysing new references
`python3 -I skills/myth-pov/scripts/measure_reference.py ref.mp4 out_dir` → cuts, per-shot camera motion (push/pull/
pan/tilt/roll/parallax), light stats, OCR captions, loudness, contact sheets. Then write a breakdown in the layout of
`references/breakdowns/ref-A-breakdown.md` and add what is new to the formula, the shot library and flip-and-fix.
