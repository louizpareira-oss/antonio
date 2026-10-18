---
name: horror-new-video
description: >
  This skill should be used when the user runs /horror-new-video or asks to "start a new horror video", "set up a survival protocol video",
  "timestamp my horror voiceover", "transcribe and time my warning narration", "import my SRT/timestamped script",
  or "plan the shots for my horror script" in the aiTrends 2D Studio Horror Edition. It covers intake, installing or checking
  the studio, creating the project, building word-level timestamps (Whisper or the user's timestamped script),
  and the horror protocol story breakdown with the shot list.
metadata:
  version: "1.0.0"
  author: aiTrends PRO
---
# /horror-new-video: intake → install → timeline → horror protocol breakdown
This command covers stages 1-4 of the aiTrends 2D Studio Horror pipeline. Shared references live in the sibling skill folder `../horror-make-2d-video/references/` (relative to this skill's base directory), and the studio kit lives in `../horror-make-2d-video/kit/`.
## 1. Intake
Ask once (AskUserQuestion when available), skipping anything the user already said:
- **Voiceover file** (required). Should be calm, deadpan, authoritative narrator delivery.
- **Script:** timestamped (SRT, VTT, JSON, or TXT with `[mm:ss]`), plain text, or none.
- **Aspect:** 16:9 or 9:16.
- **Resolution:** 720p / 1080p / 1440p / 2160p.
- **Captions:** default on for 9:16. Horror captions use high contrast white on black bars.
- **Music:** generated (horror moods), own file, or none. **SFX:** on or off (critical for horror).
- **Title.** Must follow the format: "If [trigger]... [WARNING IN ALL CAPS]"
- **Horror sub-style:** uncanny domestic (animals/objects), tech glitch (phones/electronics), environmental (encounters), body horror (reflection/shadow).
Defaults: 16:9, 1080p, generated horror tension music + SFX, style "abyss".
## 2. Studio
If `aitrends-2d-studio-horror/render.mjs` doesn't exist in the workspace, follow `../horror-make-2d-video/references/install.md` in full. Otherwise run `python tools/doctor.py` inside it and fix anything reported.
## 3. Project and timestamps (inside `aitrends-2d-studio-horror/`)
```bash
python tools/new_project.py --name <slug> --voice "<voiceover>" [--script "<script>"] --aspect <16:9|9:16> --resolution <res> --title "<title>" [--captions]
```
- **Timestamped script** → `python tools/parse_script.py --project projects/<slug> --script projects/<slug>/input/script.<ext>`. It accepts SRT, VTT, JSON (`[{start,end,text}]`, `{segments}`, `{words}`) and TXT lines like `[00:12.5] text`, `00:12 - 00:15 text` or `00:00:12,500 --> 00:00:15,000 text`. If the parser reports no timestamps, fall back to the plain-script route.
- **Plain script** → `python tools/transcribe.py --project projects/<slug> --script projects/<slug>/input/script.txt --lang <code> --model small`. It keeps the script's exact words with Whisper timing. Require ≥ 90% match; if lower, tell the user the script and audio differ.
- **No script** → `python tools/transcribe.py --project projects/<slug> --lang <code> --model small` (`base` for speed, `large-v3` for difficult audio). The first run downloads the model.
Open `timeline/transcript.txt` and confirm it reads correctly and ends near the voiceover length. Then run `python tools/beats.py --project projects/<slug>` (add `--force` to overwrite an existing shots.json).
## 4. Horror Protocol Story Breakdown
Read `../horror-make-2d-video/references/style-bible.md` (HORROR edition) and `../horror-make-2d-video/references/story-breakdown.md` fully, then:
1. Write `projects/<slug>/story/bible.md`: logline and horror tone (uncanny dread / building tension / existential wrongness), the cast (faceless figures, one signature item each if any — often NO signature colour for maximum unease), locations (domestic spaces made wrong: bedrooms at 3am, living rooms with wrong windows, empty streets, phone screens), horror motifs (glitch frames, red warning text, static, the uncanny thing that shouldn't exist, "THE RULE" visual), and the horror music plan.
2. Write `projects/<slug>/scenes/cast.js` — minimal, faceless, often just "YOU" (the viewer's proxy), "THE THING" (the uncanny entity/object), "VOICE" (off-screen or distorted).
3. Rewrite `projects/<slug>/story/shots.json` following the horror pacing rules: longer holds on unsettling details, quick cuts on scares, glitch transitions at key moments. Every shot needs a concrete `scene` description that emphasizes WHAT IS WRONG, plus transitions (flash, glitch, dip to black), bars, sfx and amb where they matter.
4. Send the user a 5-10 line summary: the uncanny trigger, THE RULE, the locations, the shot count, and the horror highlights per protocol act.
Finish by saying the next step is `/horror-video-styles` (or continue with the full pipeline in the `horror-make-2d-video` skill if the user asked for the whole video).
