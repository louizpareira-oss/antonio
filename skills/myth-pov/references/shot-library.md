# Shot library (camera recipes)

Units: metres, hero 1.75 m tall standing at the origin facing +Z (towards camera). FOV = vertical degrees for 9:16.
Every recipe is a named preset in `engine/myth3d.js` → `cam(stage.camera, t, dur, 'NAME', opts)`.
Evidence: shot numbers in `breakdowns/ref-A/B/C`; creator-2 recipes from D–G sheets.

| id | Name | Camera start → end | FOV | Move / easing / time | Use | Seen in |
|---|---|---|---|---|---|---|
| R01 | `pushIn` (default) | (0, 1.5, 4.2) → (0, 1.5, 3.7), look (0, 1.45, 0) | 45 | linear, 0.7–2.6 s, scale ×1.04–1.15 | any line about "you" | A 4,6,16,21,23–26 |
| R02 | `heroLow` | (0.3, 0.45, 2.6) → (0.2, 0.4, 2.2), look (0, 1.5, 0) | 50 | ease-out 1.5–3 s | power, menace, reveals | A 17,24,28,38; B rage |
| R03 | `crashIn` | (0, 1.6, 6) → (0, 1.6, 0.9) look face | 45 | ease-in 0.8–4 s, ×2.6–×7 | shock, "you die" | A 24, 47a |
| R04 | `pullOut` | (0, 1.6, 1.2) → (0, 3.5, 9) | 45 | ease-in-out 1.5–4 s | scale reveal, consequence | A 1,3,5,18a,40 |
| R05 | `crane` | (0, 0.8, 5) → (0, 6, 8), look (0, 1, 0) | 50 | ease-out 1.5–2.5 s | establish a world | A 3, B 2 |
| R06 | `truck` | (−2, 1.5, 4) → (2, 1.5, 4) look (x, 1.3, 0) | 45 | linear 1–2.5 s, foreground objects for parallax | groups, walls, rows | A 2,18b,20,22,28 |
| R07 | `orbit` | radius 3.5, height 1.6, angle −0.6 → 0.4 rad | 45 | ease-in-out 1–2 s (fast part 5–13 frames then hold) | in-take flight instead of a cut | A 17,27,29,30 |
| R08 | `whipList` | hold 0.3–0.6 s on object, whip right 4–6 frames (yaw 35°) | 45 | hold → linear whip | lists ("fire, water, iron") | A 8–14, 41–45 |
| R09 | `topDown` | (0, 9, 0.01) → (0, 7, 0.01), roll 0→8° | 55 | linear 1.5–3 s | death, armies, overview | A 30,36; C armies |
| R10 | `ots` | behind shoulder (0.45, 1.65, −0.6) look at other at (0, 1.5, 2.5) | 40 | slow push 1–2 s | dialogue, plots | A 46; C |
| R11 | `mcuAddress` | (0, 1.55, 1.6), look (0, 1.55, 0) eyes at 0.38 of frame | 40 | push 2–4 % | the hero "talks" to camera | A 21; B 17 |
| R12 | `macro` | 0.25–0.5 m from prop, 30° FOV, DOF focus on prop, f/1.8 look | 30 | slow slide or rotate 1–2 s | prop inserts (dart, scroll, coin) | D cards; E coin |
| R13 | `pov` | camera at eye (1.6 m), hands in frame bottom-centre, slight bob | 70 | handheld noise 0.5–1° | "imagine you…" moments | G roulette, D table |
| R14 | `silhouette` | low (0.3 m) against sky/sun, figure black on bright | 50 | locked or slow push | omen, loneliness | A 24, B sunrise |
| R15 | `dutch` | any recipe + roll 6–10° | — | slow | dreams, dread | A 4,6,22,30 |
| R16 | `stillBeat` | locked MS/MCU, 2–4 s | 40 | none | emotional beats only | A 15,32,36,47b |
| R17 | `chase` | behind runner (0, 1.4, −3) moving with him + shake | 60 | linear + noise | escape, pursuit | B 23–28 |
| R18 | `insertSky` | sun/moon disc time-lapse, 1–2 s | 45 | sky rotation | "that night", "by morning" | B 13,22; C 6 |
| R19 | `godReveal` | low + backlight + slow pull-out, emissive aura blooms | 45 | ease-out 2 s | new god or monster | A 21 halo; C emperor |
| R20 | `uiCard` | flat card/scroll/book page with text, slow push | 35 | linear | rules, numbers, names | C book of death; E poster |

Framing rules: eyes at 0.35–0.42 of frame height from top; character ≥ 35 % of frame height in MS; keep captions
(y 0.70) on the torso, never on the face; nothing important below 0.80 or right of 0.88 (Shorts UI).
Cut rule: new caption chunk → new recipe or a hard light change; never 2 identical recipes in a row.

## Creator-2 techniques to add (verified in breakdowns F and G)
| id | Name | How (our build) | Seen in |
|---|---|---|---|
| R21 | `flight` | camera flies between two set-ups on a CatmullRom spline in 9–20 frames, eased, with motion blur, instead of a cut | F 18.5, G 20.5, 34.0 |
| R22 | `screenDive` | fly into a screen/scroll/mirror (render target on the mesh), swap to that scene on the matching frame | G 26.5–27.0, 30.1 |
| R23 | `split` | same action in two worlds side by side (renderer.setScissor) | F 8.7–11.7 |
| R24 | `matchDissolve` | identical camera in two worlds, 0.5 s cross-fade (`in: {type:'fade'}`) | F 20.5–21.0 |
| R25 | `followShot` | camera chases a thrown object (spear, dart, hammer) with a light trail and an impact ring | F 44.0–47.4 |
| R26 | `xray` | object goes 15 % opaque, emissive edge copy + arrows explain the mechanism | F 12.0–14.8 |
| R27 | `diegeticHUD` | our own culture-styled overlay (rune frame, scroll, scrying mirror) with a ticking counter | G 27.5–41.5 |
Planted twist: show the twist character in the background of ≥ 3 earlier shots (F aliens at 7.2, 20.8, 37.2).
Bookend: the last shot is a literal image of the final line, in the opening set (G 77.5).

## More creator-2 techniques (breakdowns D and E)
| id | Name | How (our build) | Seen in |
|---|---|---|---|
| R28 | `oner` | one take with invisible transitions: tilt to hero → tilt to prop macro → swap the background while the prop fills > 70 % → pull out in the new world | D 0–15.2 |
| R29 | `tableTop` | top-down 2 m over a table/altar, the hero's hand (CMU reach clip) enters from the bottom, slow yaw ~30°/3 s | D 37.4–39.9, 50.5–59.5 |
| R30 | `ladder` | jump-cut time-lapse: 4–6 cuts × 0.6–0.8 s, camera ×1.15 height and +8° yaw each cut | D 52.2–56.3 |
| R31 | `worldText` | 3D words in the scene (rune-carved or gold) popping 0 → 1.1 → 1 in 6 frames; green good / red bad | D 58.7–69.0 |
| R32 | `annotate` | 2D "ink" overlays that draw on (circles, arrows) synced to words | D 21.3, 41.2 |
| R33 | `flyToEyes` | third-person WS → flies into the hero's eyes in ~11 frames → POV (R13) | E 23.6–24.0 |
| R34 | `keywordGlow` | the object named in the narration glows (emissive + bloom) for its word: ease 3 frames in / 6 out | E 24.2, 25.7, 27.7 |
| R35 | `label3D` | floating keyword labels pinned to objects (projected each frame) with a pop | E 37.1–41.6 |
| R36 | `objectWipe` | a prop passes across the lens and wipes to the next scene (full-frame matte; they leave a seam, we don't) | E 17.2–18.3 |
Rules learned: whips inside a take reframe to the next noun (7–12 frames); every quoted speaker gets a caption style;
the ending answers the hook's question in the hook's framing; the last frame matches frame 0 for a seamless loop (D 90.47).
