# Style Bible: The aiTrends HORROR Look
Follow this closely. It is the only description of the target horror aesthetic; no reference images are available. The goal is UNEASE, not gore. The viewer should think "something is very wrong here" before they can articulate why.

## The Look in One Paragraph
Pure black (`S().ink`) stick figures, each with a circle head and thick round-capped line limbs, carry a **thin BLOOD-RED or cold white rim-light edge** on the side facing the wrong light source. They act inside **oppressive, low-key, slightly wrong domestic environments**: one sickly or harsh light source per scene (a phone screen glowing too bright, a street lamp flickering wrong, a TV with no signal, a moon that's too large), deep black or navy shadows, blood-red or acid-green highlights, scan lines, static particles, VHS glitch artifacts, a slow CREEPING camera drift, heavy letterboxed frames, film grain, a crushed vignette, and occasional full-frame glitch stutters. Characters are often **faceless or feature minimal white dot eyes** (sometimes EMPTY — no eyes at all for maximum uncanny). Faces are tools of wrongness: dead stares, too-wide smiles, eyes that don't blink. The rhythm is broken up with **giant dead-eye close-ups** that fill the frame, **freeze-frame "before it happens" moments** with glitch particles hanging in the air, **glowing red warning text in ALL CAPS**, **navy "field report" diagrams** for protocol explanations, and **low-poly 3D shots of empty rooms and dark streets** that use the same figures and palette. The overall feel is "a stick-figure horror film lit by a cinematographer who hates you": simple shapes, sophisticated wrongness.

## Characters — The Uncanny Human
- **Construction** (handled by `drawFigure`): head circle r = 26 rig units, torso 15, limbs 11-13 with round caps, short forward-pointing foot stubs, no fingers at normal sizes. Hands and fingers appear only in insert close-ups (thick capsules).
- **Depth shading:** the near arm and leg are pure ink. The far arm and leg use `inkFar`, a dark purple-grey or blood-dark red. That's automatic.
- **Rim light on every lit character:** pass `rim: { color: M.rim, dir: [dx, dy] }`, where `dir` points from the figure toward the light. **HORROR DEFAULT: blood red `#c41e3a` rim light.** For cold tech scenes: sickly white `#e8e8e8`. For digital horror: acid green `#39ff14`. Width 4-5 at 1080p. The rim is what makes black-on-dark readable and WRONG.
- **Signature items** — HORROR RULE: Most characters have NO signature colour. They are pure black with red rim. This makes them feel like everyman / faceless / replaceable. The UNCANNINESS comes from what they DO, not what they wear. When a signature item IS needed: one single WRONG detail — eyes that glow red `#ff0000`, a phone that never stops glowing, a shadow that faces the wrong direction. Background people and crowds: plain ink with no rim light at all (they don't matter / they're not real).
- **Faces** are drawn on the side the figure faces (3/4 view). **HORROR EXPRESSIONS ARE THE MAIN ACTING TOOL:**
  `dead, empty, stare, too_wide_smile, frown, slight_smile (WRONG), shocked, terrified, confused, calm_wrong, no_face, blank`.
  **Eyes:** default = tiny white dots (like a doll). For uncanny moments = EMPTY (no eyes at all, just smooth black). For terror = larger white rings. For the THING = glowing red dots.
  **Blinking:** characters blink RARELY, every 6-10 seconds, or NOT AT ALL for uncanny figures. The lack of blinking is a horror tool.
- **Talking:** only when a character speaks a quoted line. Use `talk: talkAmount(info.globalT, lineStart, lineEnd)` (driven by real word timings). The narrator is NEVER lip-synced.
- **Acting:** poses must read as WRONG silhouettes. Use `POSES` but SUBVERT them: a "stand" that's slightly too stiff, a "sit" where the figure doesn't quite touch the chair, a "point" where the arm is slightly too long. Use `posesAt(t, [[0,'stand'],[0.6,'point']])`, blending ~0.3 s. Wrap figures in `breathe(pose, t, 0.5, seed)` — breathing should be SHALLOW or SLIGHTLY WRONG. For uncanny figures: NO BREATHING at all. Walking and running use `walkPose(phase, {run})` but uncanny figures walk TOO SMOOTHLY or with the wrong rhythm.
- **Scale:** wide shots `s` ≈ 0.8-1.2 (figures small and isolated in empty spaces). Medium shots `s` ≈ 1.5-1.8. Horror close-ups use `bigFace` (radius 280-360 at 1080p, head slightly below centre, shoulders cropped, with a RED rim crescent on the lit side — and EMPTY EYES). Always put figures on a floor with a contact shadow and never let them float — unless floating is the uncanny thing.

## Sets and Environments — Domestic Spaces Made Wrong
- Built from **flat shapes and soft linear gradients**: no outlines, no photos, no clip-art, no emoji. Texture is limited to floor lines, window mullions, and — for horror — occasional scan lines, static noise, or glitch artifacts.
- **Value structure — HORROR EDITION:** 80-90% of the frame is PURE BLACK or near-black (walls and floors from the mood, darkened with `shade(c, -0.5)`), with 1-2 bright accents (a phone screen, a single lamp, a TV glow, red warning text, moon through a window). **Stage black figures in front of the brightest wrong area** so their silhouettes read AND feel threatened.
- **Depth layers** with parallax via `layer(g, cam, depth, fn)`: sky 0.1-0.2 → wrong skyline/hills 0.3-0.4 → back wall/facade 0.5-0.6 → floor/props 0.8-0.9 → characters 1.0 → blurred foreground 1.5-1.8 (`blurLayer(g, 8-14, fn, cam, 1.7)`). Most medium shots should have something soft and slightly wrong in the foreground.
- **WRONG ELEMENTS IN EVERY SET:** This is critical. Every domestic space must have at least one subtly impossible detail that the viewer notices but can't immediately explain:
  - A window that shows a landscape that doesn't match the room's location
  - A door that has no handle or opens onto a solid wall
  - A clock where the numbers are wrong or the hands move counter-clockwise
  - A picture frame that shows the room you're currently in
  - Stairs that lead up to a ceiling
  - Electrical outlets where there shouldn't be any
  - A mirror that shows the room empty (or shows something extra)
- **Windows are the signature WRONG element.** Large windows with mullions showing a night sky that's too dark, a moon that's too large and red, a skyline where the lights blink in patterns, or sometimes just pure black nothing behind the glass. Night streets have house facades where some windows glow the wrong colour (sickly green, blood red), lamp posts that flicker in patterns, parked cars that are slightly too long or too short.
- Typical HORROR locations to invent from the script:
  - **Bedroom at 3am:** moonlight too bright, wrong shadow angles, door slightly ajar showing pure black
  - **Living room:** TV glowing with static, furniture slightly rearranged, carpet pattern that doesn't repeat right
  - **Kitchen:** refrigerator door open showing pure black inside, clock running backwards
  - **Hallway:** too long, doors on both sides that are all identical, light at the end that never gets closer
  - **Empty street:** street lamps flickering wrong, no cars, houses with wrong window counts, fog that doesn't move
  - **Phone screen close-up:** the main uncanny element for tech horror — glowing too bright, showing wrong numbers, messages from unknown
  - **Void / Field Report:** navy grid, light-blue line art, red highlights — for protocol explanations
- **Atmosphere in nearly every shot — HORROR EDITION:**
  - `FX.static` — fine TV static particles, very subtle
  - `FX.dust` indoors but moving WRONG (upward, or too slow)
  - `FX.glitch` — horizontal displacement artifacts, occasional
  - `FX.scanlines` — faint horizontal lines across the entire frame
  - `FX.fog` — thick, oppressive, doesn't move naturally
  - `FX.lensStreak` — distorted, wrong-coloured streaks from bright sources
  - **NO god rays** — they're too beautiful. Use harsh, ugly light cones instead.

## Light and Colour — The Horror Palette
- Pick a **horror mood** per location: `M = mood('abyss')` gives `sky[], ambient, key, rim, wall, floor, dark, practical, grass, road, fog`. Take every colour from `M`, `S()` (style tokens) or the cast. The palette is LIMITED: black, white, blood red, and ONE accent colour (sickly green, cold blue, sodium orange).
- The horror drives the mood:
  - `abyss` = pure black, blood red rims, sickly green practicals (DEFAULT HORROR)
  - `bloodmoon` = crimson tint, black shadows, white rims (animal uncanny, night encounters)
  - `night` / `midnight` = cold navy void, blue-white rims, orange sodium practicals (tech glitch, empty streets)
  - `void` = blueprint navy for protocol explanations (the only "safe" feeling)
  - `interiorCool` = slightly wrong domestic, cold and clinical
- **One WRONG key light per shot.** Show it (a phone screen, a flickering lamp, a TV with no signal) and spill it wrong: `glow()` around the source in the WRONG COLOUR, `FX.pool()` on the floor that doesn't match the light shape, light cones that point the wrong direction.
- The global colour grade comes from the chosen horror style and is applied automatically: per-channel lift/gamma/gamma with crushed blacks, high contrast, desaturated except for red accents, heavy vignette, heavy grain, and optional scan lines/glitch.

## Camera (Never Comfortable)
Every shot moves — slowly, creepily, unsettlingly:
- Slow push-in (`z` 1.0 → 1.08 over the shot) — makes the viewer feel like something is approaching
- Lateral drift (`x` ±15-30) — very slow, almost imperceptible
- Slow pull-out for reveals of wrong spaces
- Slight roll (`r` ±0.015) for extreme unease — just enough to feel "off"
- Subtle shake (`shake(t, 0.3)`) during terror moments
- **Sudden snap** for jump scares or glitch moments

**Horror Shot Vocabulary** (use all of these across a video):
1. **Empty establishing wide** (15%): the location with NO figures, or a tiny isolated figure. Slow creep. Opens each new scene. Often 3D to emphasize isolation and wrong geometry.
2. **Medium single** (20%): one figure in a space that feels too large or too small. Emptiness around them.
3. **Over-the-shoulder wrong** (10%): a blurred silhouette in the foreground, but the figure we're looking OVER has no face, or the shoulder is slightly wrong.
4. **Giant dead-eye close-up** (`bigFace`, 15-20%): reactions, realisations, terror moments. Background = blurred and darkened. **Eyes = empty or tiny white dots.** This is the signature horror shot.
5. **Insert / macro of the uncanny thing** (15%): the phone screen showing 101%, the dog's paw that's slightly wrong, the clock hand moving backwards. Big, simple, blurred background. Let the viewer stare at the wrongness.
6. **POV shot** (5%): what the character sees. Slightly distorted, vignetting heavy. Makes the viewer the one in danger.
7. **Freeze frame / glitch stutter** (signature horror moment, 1-2 per video): the frame freezes, scan lines appear, colours shift, red warning text flashes. Enter with `glitch` transition and a `static` SFX.
8. **3D empty room / dark street orbit** (about 1 per minute): slow orbit through an empty space where something is slightly wrong (a door that opens onto nothing, a window showing the wrong view). Emphasizes isolation.
9. **Warning text overlay**: THE RULE appears in ALL CAPS blood-red text, glowing slightly, synced to the narrator's words.
10. **Field Report / Protocol diagram**: the explanation segment (navy grid, light-blue line art, RED highlights for danger, labels synced to words).
11. **Title card**: ALL CAPS title split by the ellipsis: "IF YOUR PHONE EVER CHARGES TO 101%" above, "DO NOT UNPLUG IT" below in BLOOD RED, over a dark cinematic wide.
12. **End screen**: "Have you ever seen something that shouldn't exist?" in white, a comment bubble, a subscribe pill that glitches slightly, and "RULE 1: SUBSCRIBE" in red.

**Letterbox (`bars`):** `wide` (2:1) is the default for that oppressive cinematic feel. `scope` (2.39:1) is for the title card, freezes, and intense close-ups — makes the frame feel like a letter you can't escape. Use `none` for full-frame glitch moments or field reports if wanted. Bars animate smoothly between shots.

## Editing and Transitions — Horror Rhythm
- **Hard cut** by default (70%).
- **glitch** (new transition type): horizontal displacement, colour channels split, 2-3 frames of static. Use for protocol rule reveals, uncanny reveals, moment of realisation.
- **flash** (white or RED): into freeze, glitch moments, terror realisations.
- **dip** (to BLACK, never to white): for time skips, "what happened to them" sections, cuts to black that last just a beat too long.
- **fade** (to black only): for the title card and the very end.
- **whip** (fast, disorienting): between locations when the protocol is escalating.
- **Hold on the wrongness:** let unsettling shots breathe. 4-8 seconds on something that's slightly wrong. The viewer's own imagination fills in the horror.
- **Sudden short cut:** 0.5-1.5 seconds for a scare, a glitch frame, a flash of something.

## On-screen Graphics and Typography — Warning Text
- **Fonts:**
  - **WARNING TEXT:** Impact or similar bold condensed sans-serif, ALL CAPS, letter-spaced, BLOOD RED with a slight glow. This is THE RULE and protocol steps.
  - **Labels and numbers:** Nunito Black, white or sickly green.
  - **Field reports / diagrams:** same blueprint style, but with RED for danger elements.
  - **End screen question:** Playfair Display Black Italic, white, slightly shaky.
- **Colours:**
  - Blood red `#c41e3a` for ALL WARNINGS and danger (primary horror colour)
  - Sickly green `#39ff14` for tech wrongness, digital glitches
  - Cold white `#e8e8e8` for labels, field report text
  - Blueprint navy for protocol explanations
  - **NO gold, NO coral, NO warm colours** — they feel safe.
- **Toolkit (`ui2d`):**
  - `warningCard` — THE RULE displayed prominently, blood red, ALL CAPS
  - `protocolStep` — numbered step in the survival guide
  - `fieldReport` — blueprint-style explanation
  - `glitchText` — text that flickers and distorts
  - `endScreen` — with "RULE 1: SUBSCRIBE"
  - `captions` — high contrast white on black bars
- Every protocol step the narrator says should appear, synced with `wordTime()`, in red warning text. Keep text minimal and impactful.
- Pop warning graphics in with a `glitch` transition and a `static`/`buzz` SFX.

## Horror Story Conventions
Cold-open uncanny moment → title card (split format: trigger... WARNING) → establish THE RULE → what happens if you break it (field reports, dread) → the protocol step by step → the test / the thing fights back → survival / aftermath (never quite right) → sting / next protocol hint → end screen with question and CTA.

## Don't — HORROR EDITION
No realism, gradients on characters, thick outlines, photos, emoji, clip-art or flat white backgrounds (except glitch flashes). No static shots. No figures without rim light in lit scenes. No narrator lip-sync. No walls of text. No more than ~2 characters in focus at once (isolation = horror). No floating figures unless floating IS the uncanny thing. No outfit colour changes. No centring everything (use thirds; the face close-up is the exception). No hard-coded colours that ignore `mood()`/`S()`. No `Math.random()` or `Date.now()` in scenes. **No warm, safe, or beautiful lighting.** No god rays. No happy expressions. No normal blinking.

## 9:16 Vertical Rules — Horror
The logical stage is 1080×1920 (`E.vertical === true`). Use `V(landscape, vertical)` for every size and position that depends on the aspect.
- **Closer, more claustrophobic framing:** medium shots and close-ups dominate. The wrongness fills the frame.
- **Safe area:** keep faces and warning text inside the central ~900×1500, away from platform UI. Captions sit at ~79% of the height.
- **Vertical stacks:** sky → wrong ceiling → figure → wrong floor. The vertical format enhances the feeling of being trapped.
- **Warning text is TALLER and more dominant** in 9:16. It should fill the width of the frame.
- Bars default to `none`, and `scope` gives thin bars. Ground line `GY = E.H * 0.68`, which keeps characters above the captions.
- Check with `--sheet` in 9:16 before rendering. The wrongness must read clearly in vertical.
