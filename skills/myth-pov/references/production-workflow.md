# Production workflow (exact commands)

All commands from the repo root unless noted. Studio = `aitrends-2d-studio/`.

## 0. Once
```bash
bash skills/myth-pov/scripts/install.sh
bash skills/myth-pov/scripts/fetch_mocap.sh 02_01 07_01 07_04 07_12 08_07 09_01 16_35 13_29 86_02 143_18
```
Starter mocap set by need (search more in `references/cmu-mocap-index.txt` with grep):
walk 02_01, 07_01; slow walk 07_04; brisk 07_12; exaggerated stride 08_07; run 09_01; jump 16_35 (check);
mixed actions (walk/squat/run/jump/punch/drink) 86_02; sit down/get up 143_18. Check each new clip on a contact sheet.

## 1. Script (user approves before voicing)
`scripts/myth/NN-<slug>.md` per `script-formula.md`. Read it aloud at 200–215 wpm: 65–85 s.

## 2. Project
```bash
bash skills/myth-pov/scripts/new_project.sh <slug>
```
Creates `projects/<slug>/` (config 9:16 1080×1920 30 fps, captions on, template shots s01/s02, `assets/hero.json`).

## 3. Voice + timings
- ElevenLabs connector: narrator voice (channel.md) → `projects/<slug>/audio/voice.mp3`; exact text → `projects/<slug>/input/script.txt`.
- `cd aitrends-2d-studio && python tools/align_offline.py --project projects/<slug>` → `timeline/words.json` (+ % heard check).

## 4. Characters
Edit `projects/<slug>/assets/hero.json` (colours, helmet, thread true for YOU only, the clips the story needs) and one json per
side character (`thread: false`, `glow: [r,g,b]` for gods). Then from the project folder:
```bash
cd aitrends-2d-studio/projects/<slug>
xvfb-run -a blender -b --python ../../../skills/myth-pov/scripts/build_character.py -- assets/hero.json
```
The .glb holds every clip as an animation named by its CMU id; scenes call `h.play(t, '07_01')`.

## 5. Shot list
`story/shots.json`: shots back to back, `start`/`end` in seconds from `timeline/words.json`. One shot per 1–4 caption chunks;
cut 0.1 s before the first word of the chunk. Fields: `id`, `start`, `end`, `line` (the words), optional `in` transition
(`flash` on impacts, `whip` in lists, `dip`, `fade`). Plan in this order: hook frame, every noun/number gets a picture,
recipes never repeat twice in a row, light preset per story mood (style-bible.md), 1 CU every ~5 shots.

## 6. Scenes
One file per shot (or a shared set file + shots) in `scenes/`, using `engine/myth3d.js`:
`M.world(T, preset)`, `M.spawn(stage, glb, {clip, at, face, inPlace, offset})`, `h.play(t, clip)`, `h.look(dx, dy)`,
`M.cam(camera, t, dur, recipe, {target})`, `M.whipList(...)`, set pieces `pine/rock/longhouse/pillar/fire/aura`, `M.flicker`.

## 7. Check
```bash
cd aitrends-2d-studio
node render.mjs --project projects/<slug> --sheet          # one still per shot -> build/sheets
node render.mjs --project projects/<slug> --stills 1,5,12  # specific times
```
Look at every still: framing (eyes at 0.35–0.42 from top, nothing important below 0.80 / right of 0.88), readable on a phone,
the right preset, no clipping, no T-pose.

## 8. Render (40-s pieces; the container can restart)
```bash
node render.mjs --project projects/<slug> --from 0  --to 40 --out build/segs/seg_000.mp4
node render.mjs --project projects/<slug> --from 40 --to 80 --out build/segs/seg_001.mp4
printf "file '%s'\n" build/segs/seg_*.mp4 > build/segs/list.txt   # run inside the project folder
ffmpeg -f concat -safe 0 -i build/segs/list.txt -c copy build/video_silent.mp4
```
Speed: ~0.9 frames/s with 2 workers for a shadowed 1080×1920 scene (80 s ≈ 45 min).

## 9. Sound + master
```bash
ffmpeg -i build/video_silent.mp4 -i audio/voice.mp3 -i audio/music.mp3 -filter_complex \
 "[2:a]volume=-26dB[m];[1:a][m]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1:LRA=7[a]" \
 -map 0:v -map "[a]" -c:v libx264 -crf 17 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart out/<slug>.mp4
```
SFX (whoosh on whips, hit on flashes) are mixed into `audio/music.mp3` or added as extra inputs at their times (adelay).

## 10. QA + upload
`python3 -I skills/myth-pov/scripts/measure_reference.py out/<slug>.mp4 build/qa` → check shot lengths, brightness, loudness.
Write `story/upload.md` (references/upload.md). Post.

## Known tuning items (from the first test render, Nov 5)
- Golden Thread torus orientation: rotate so it crosses the chest diagonally (now it reads as two shoulder arcs).
- `hood` helmet sits slightly in front of the face; set its offset backwards along the head's forward axis.
- `heroLow` in small rooms: increase distance to 3.0 m so the head stays in frame.
- Add a 4-sub-frame motion-blur option to render.mjs for whips (creator 2 does this).
- Add the DOF (BokehPass) to `macro` and a 2D overlay pass for diegetic UI (scroll cards, rune HUD).
