# Flip & fix: their weaknesses → what we do

Every row is seen in the frames (details and frame paths in `breakdowns/`). Creator 2 (D–G) rows come from the contact
sheets: real people's photo faces (D Phil Ivey, E judge, G dealer), a mock TikTok UI (E), 202×360 deliveries (E, F).

| # | What they do (evidence) | What we do |
|---|---|---|
| 1 | Box heads with pasted photos / paintings; faces vanish from the side or back, clip, or show on the cube top (A 50.6, 76.0; B 15.4, 55.4, 68.2) | Real 3D heads with emissive eyes and brows that read from every angle; no photos ever |
| 2 | Real people's faces on bodies (B 5/13/37, D, E, G): likeness rights and reused-content risk | Original characters only; real people only as plain text names |
| 3 | Mixed art styles: low-poly + realistic cobra/chimps/army + voxel (A 8–14, C 7–54) | One material system (clay figures + low-poly lit sets) for every asset |
| 4 | Hero inconsistent: costume and head change (C 13.9, 26.2, 43.6); hero and Thor both red-shirted (B 23–40) | Golden Thread marks YOU in every shot; one costume per video; each god has its own colour |
| 5 | Stiff library animation, T-poses, sliding (A 20.8; C 7.4, 8.6) | CMU motion capture for every move; foot-locked root motion; idle breathing layered on still poses |
| 6 | No contact/reactions: projectiles pass through (A 49.7; C 54.8) | Every hit gets a reaction clip + flash + sub-hit SFX; props attach to hands |
| 7 | Captions tiny (0.017–0.03 H), thin, unreadable on snow/sky/fire (A 13.9, B shot 2, C 76.9) | +15 % size, darker shadow, auto dark scrim when the background luma > 170 behind the caption |
| 8 | Narration 199–236 wpm with no breathing room (A, B, C) | 200–215 wpm (keep the energy) + one planned 0.3–0.5 s pause before the loss line |
| 9 | Night/dream scenes too dark to read (A 9.4–12.0 luma 13–34) | Night presets keep the centre ≥ 55 luma with a moon rim + Golden Thread glow |
| 10 | Faces too small; few CUs; hero < 1/4 of the frame in 14 of 33 shots (C) | ≥ 35 % frame height in MS, 1 CU every ~5 shots, MCU address shots on every "you" line |
| 11 | Climax and twist are a 0.3 s flash or an off-screen beat (A 58.0, B 64.7, C 83.2) | The climax gets 3 shots: action (crashIn), impact (flash + macro), consequence (pullOut/topDown) |
| 12 | Twist spent earlier or unshown; abrupt endings with no loop (A 41.2/79.0, B 69.6) | The twist is saved for the last 5 s, shown in picture, and the last line loops to the first frame |
| 13 | Second person breaks for 10 s (B 31–41) | "You" is on screen or addressed in every beat; side scenes are max 2 shots |
| 14 | Promised actions not shown ("drags rocks" B 24.8, "somersault" C 68, "100,000 soldiers" = 50 models C 51.6) | Shot list is checked line by line: every concrete verb/number gets its picture (instanced crowds for armies) |
| 15 | Rendering artefacts: noise, light leaks, stray lines, exposure pops (A 11.5, B 24.8, C 3.9/55) | Deterministic renderer, contact-sheet check of every shot, no grade pops (0.1 s eases) |
| 16 | Empty environments (C 44–71: flat planes, empty party) | Set kits with props, fog depth, sky; crowds where the story says crowds |
| 17 | 12 identical whip transitions (A) | Vary list montages: whip, match cut, rack focus, orbit; max 4 whips in a row |
| 18 | Low delivered resolution (360×640 / 202×360 copies; originals unverified) | Always 1080×1920 30 fps, CRF 16–18 |
| 19 | Flat audio dynamics, no hit under the twist (A LRA 2.5; C 77–78.5) | Music drop + hit on the twist; 0.3 s near-silence before the loss |
| 20 | Fake app UI imitating a real platform (E) | Our own neutral UI cards (scrolls, runes, books) styled to the culture |
| 21 | Logic gaps in narration (C 65.3 the bet condition missing) | Script check: every deal/rule says both sides ("if you can…, then…") |

## Never copy (stays theirs)
Their scripts and lines, box heads with photo faces, their character designs, the rainbow-castle Asgard backdrop, their
casino sets, the mock TikTok UI, their thumbnails, their titles' exact wording.
