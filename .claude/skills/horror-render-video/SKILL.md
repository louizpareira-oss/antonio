---
name: horror-render-video
description: >
  This skill should be used when the user runs /horror-render-video or asks to "build the horror scenes", "check the shots",
  "show me a contact sheet", "preview the horror video", "render the video", "render in 4K / 9:16", "re-render after a fix",
  or "export the final MP4" for an aiTrends 2D Studio Horror project. It writes or repairs shot code in batches with
  contact-sheet QC, makes preview clips, runs the full frame-by-frame render, and muxes the final video with horror sound.
metadata:
  version: "1.0.0"
  author: aiTrends PRO
---
# /horror-render-video: build, horror QC, preview and final render
Work inside `aitrends-2d-studio-horror/` on the active project (`projects/<slug>`; if several exist, ask which one). Shared references are in `../horror-make-2d-video/references/` relative to this skill's base directory. Read `engine-api.md`, `style-bible.md` (HORROR) and `render-qc.md` before writing or fixing scenes.

## 1. Build or repair horror shots (batches of 8-12)
- List what's missing: `node render.mjs --project projects/<slug> --sheet --scale 0.4`. The console lists MISSING shots and shot errors, and `build/sheets/sheet_XX.png` shows one still per shot.
- Write `scenes/sets/*.js` (make each set SLIGHTLY WRONG — one impossible detail per location) and `scenes/shots/NN_name.js` (`registerShot(id, …)` for each shot id). Study `examples/phone-101-percent/scenes/` for working HORROR patterns.
- After each batch, re-run the sheet and **open every sheet PNG** against the QC checklist in `render-qc.md`. **HORROR QC EXTRA:** Does each frame feel UNSETTLING? Is there at least one wrong detail? Is the palette limited to black/white/red (+ one accent)? Fix and repeat until there are no MISSING or ERROR frames and every shot passes the dread test.
- To check motion, use `--stills t1,t2,t3` (several moments of one shot — does the uncanny thing move WRONG?) or `--from A --to B --scale 0.5` (writes `build/preview.mp4`).

## 2. Preview checkpoint
Render `node render.mjs --project projects/<slug> --from 0 --to 30 --scale 0.5` and send the user the preview, or the contact sheets, before the long render. Mention the expected render time (speed guide in `render-qc.md`: frames = seconds × 24; ~2 frames/s at 720p on a small 2-core CPU, 1080p ~2× slower, 4K ~8× slower, desktops 3-5× faster). Horror videos are typically 4-6 minutes = ~5760-8640 frames at 1080p = budget 1-2 hours on a small machine.

## 3. Final render
- To change resolution or aspect, edit `projects/<slug>/config.json` (`resolution`, `aspect`). Switching aspect needs a fresh sheet review, because 9:16 framing of wrongness differs.
- Run `node render.mjs --project projects/<slug> [--workers N] [--format jpeg]` and run it in the background for anything over a minute or two: `nohup node render.mjs --project projects/<slug> > build/render.log 2>&1 &`. Poll the log and report progress and ETA at sensible intervals.
- Use fewer workers if memory is tight (about 1-1.5 GB each at 1080p, more at 4K). With no GPU, add `--gl swiftshader` (already the Linux default).
- Output: `build/video_silent.mp4`. The end of the log lists any shot errors. Fix them and re-render if there are any.

## 4. Sound, mux and deliver
Make sure the horror music plan and SFX are set (see `/horror-video-sound`), then run `python audio/mix.py --project projects/<slug>`, which writes `out/<title>.mp4`. QC: `ffprobe` duration ≈ `story/shots.json` duration, an audio stream is present, and a contact sheet of the final file (`ffmpeg -i out/<file>.mp4 -vf fps=1/10,scale=320:-1,tile=6x5 -frames:v 1 build/final_sheet.png`) looks right and feels WRONG. Send the MP4 to the user and say in plain words where it was saved.
