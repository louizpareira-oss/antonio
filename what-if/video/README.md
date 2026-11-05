# Animated opening: Script 01, 0:00–0:10

`inventory-opening.mp4` is the first 10 seconds of *What If You Had an Inventory in Real Life?*
(scenes S01–S02). It's 1920×1080, 30 fps, with burned-in captions and sound effects. There's no
voiceover yet; the captions carry the narration.

Shots:

| Time | Shot | What happens |
|---|---|---|
| 0.0–3.0 | Wide bedroom | Mustard is asleep, sits up and stretches |
| 3.0–4.8 | Medium | The hotbar pops in and Mustard startles |
| 4.8–6.2 | Face close-up | Blinks twice, then a deadpan stare |
| 6.2–10.0 | Medium with the nightstand | Reaches for the phone, it sparkles away, the icon flies into slot 1 |

## How it's made

The whole video is code. Nothing is AI-generated.

- `anim.html`: the 3D scene (three.js) plus the HTML overlay (hotbar, captions, label).
  `window.render(t)` draws exactly what the frame at time `t` should look like.
- `render.js`: opens the page in headless Chromium and saves one PNG per frame.
- `sfx.py`: synthesizes the sound effects with plain Python, no samples needed.
- `fonts/Fredoka-Bold.woff2`: caption font (SIL Open Font License).

## Re-render

From this folder:

```bash
npm init -y && npm install three@0.160.0
```

```bash
node render.js 30
```

```bash
python3 sfx.py sfx.wav
```

```bash
ffmpeg -y -framerate 30 -i frames/f%04d.png -i sfx.wav -c:v libx264 -pix_fmt yuv420p -crf 18 -preset slow -c:a aac -b:a 192k -shortest inventory-opening.mp4
```

To check a few moments without rendering all 300 frames, run `node render.js 30 --test 0.5,3.6,8.25`.
Those frames are saved to `test/`.

## Changing things

- **Timing:** every action is keyed by seconds inside `window.render(t)`, using `seg(t, start, end)`.
- **Captions:** the `CAPTIONS` array. Wrap a word in `<em>` to make it mustard.
- **Outfit colors:** `makeHero({hoodie, pants})` and the `P` object.
- **Adding a voiceover:** generate the lines, then mix them under the sound effects with
  `ffmpeg -i inventory-opening.mp4 -i voice.wav -filter_complex "[0:a][1:a]amix=inputs=2:duration=first:weights=0.6 1[a]" -map 0:v -map "[a]" -c:v copy out.mp4`.
