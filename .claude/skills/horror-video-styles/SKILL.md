---
name: horror-video-styles
description: >
  This skill should be used when the user runs /horror-video-styles or asks to "show me horror style options", "compare the horror looks",
  "pick a visual horror style", "make it darker / bloodier / more glitchy", "create a custom horror style",
  or "change the colour grade" for an aiTrends 2D Studio Horror video. It renders the same shots of the user's story
  in five HORROR preset styles (abyss, bloodmoon, midnight, neondread, vhsnightmare) as a comparison grid,
  records the choice, and builds custom horror styles.
metadata:
  version: "1.0.0"
  author: aiTrends PRO
---
# /horror-video-styles: render horror style options and lock the look
Work inside `aitrends-2d-studio-horror/` on the active project (`projects/<slug>`; if several exist, ask which one). Shared references are in `../horror-make-2d-video/references/` relative to this skill's base directory.

## 1. Make sure there is something representative to show
The grid uses the user's own shots, never the bundled example. If the project has fewer than 3 finished shots, first build (following `../horror-make-2d-video/references/style-bible.md` (HORROR) and `engine-api.md`):
- `scenes/cast.js` and the 1-2 most-used wrong sets,
- an empty wide set shot (to show isolation), a `bigFace` close-up with empty/dead eyes, and a glitch/warning text shot.
Pick one time inside each shot (about 45% through it) for the grid columns.

## 2. Render the horror style grid
```bash
node render.mjs --project projects/<slug> --styles abyss,bloodmoon,midnight,neondread,vhsnightmare --at <t1>,<t2>,<t3> --scale 0.5
```
Open `build/styles/style_grid.png` (one row per style) and check it, then send it to the user with one line each:
- **abyss — Deep Abyss:** pure black shadows, blood-red rim lights, sickly green practicals. DEFAULT HORROR — maximum dread, domestic uncanny, animal wrongness.
- **bloodmoon — Blood Moon:** deep crimson tint everywhere, black shadows, white rims, moon-glow practicals. For night encounters, animal uncanny, outdoor horror.
- **midnight — Midnight Blue:** cold navy void, blue-white rims, sodium-orange practicals. For tech glitch horror, empty streets, digital wrongness.
- **neondread — Neon Dread:** deep blacks, magenta and sickly acid-green rims, strong bloom. For technology horror, phone/TV uncanny, digital realms.
- **vhsnightmare — VHS Nightmare:** desaturated, crushed contrast, heavy grain, scan lines baked in. Analog horror aesthetic, found footage feel.

Ask which they want (AskUserQuestion when available).

## 3. Save or customise
- Preset chosen → set `"style"` in `projects/<slug>/config.json`.
- Horror tweaks requested → add a new entry to `STYLES` in `engine/styles.js`. Copy the closest preset, give it a new id and a `name`/`desc`, then adjust:
  - `moods` overrides (per mood: `sky`, `key`, `rim`, `wall`, `floor`, `practical`),
  - `grade`: `lift` [r,g,b] tints shadows (lower r/g, raise b for colder, deader shadows), `gain` [r,g,b] tints highlights (raise r for bloodier, lower all for darker), `gamma` [r,g,b], `sat` (LOWER for horror — desaturate everything except red), `contrast` (RAISE for crushed blacks), `vignette` (HEAVIER for claustrophobia), `grain` (HEAVIER for analog), `bloom` (3D),
  - `ui` colours (make warning red more prominent, gold → sickly green or remove), `rimWidth` (wider for more uncanny glow).
  Re-render with `--styles <newid>,<closest preset> --at …` so the user can compare, iterate until they're happy, then set it in config.json. `tools/verify_kit.py` will now report `engine/styles.js` as changed; that's expected.

Scenes only follow a style switch if they take colours from `mood()`/`S()`. If one shot ignores the style, find the hard-coded colours in it and replace them.
