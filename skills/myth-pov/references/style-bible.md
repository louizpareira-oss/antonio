# Style bible: our own look

Same grammar as the references, a look that is ours.

## Signature: "the Golden Thread"
- **YOU** (the hero of every Short) wears a **glowing golden thread of light** across the chest (an emissive band with
  bloom). Whatever myth you become, the thread marks you in every shot, so viewers always know who "you" are, and every
  frame is recognisably ours. When you die or lose, the thread snaps or goes grey (the grade punctuation beat).
- Gods and monsters glow in **their own colour** (Loki green, Hel blue-white, Odin storm-grey, Ra gold-orange…).

## Characters
- **Body:** stylised matte "living clay" figures (slightly soft, warm-grey base), adult proportions (7 heads tall), slim
  limbs with rounded joints (built on the CMU mocap skeleton by `scripts/build_character.py`, rigid-skinned segments, so
  every move is real motion capture).
- **Face:** simple rounded head, **two big expressive eyes** (white emissive sclera + dark pupils that move and blink,
  brows as small dark bars that can rotate for anger/worry). No mouth, no nose: the narrator talks, not the character.
  Expression = eyes + brows + head tilt + body mocap. Readable at phone size.
- **Costume per myth:** cloak/tunic/armour/headgear pieces as separate meshes (horned helm for jotnar, laurel for Greeks,
  nemes for Egypt, circlet for Sun Wukong, etc.). Colour-coded per character, max 3 colours each.
- **Never:** box heads, pasted photos, painted portrait faces, real people's likeness, game-store characters.
- Crowds: same figure with costume swaps and 4–6 colour variants, staggered mocap offsets.

## Worlds (set kits, built in code or Blender, low-poly but lit like premium)
- Norse: longhouses, snowy pines, rune stones, rainbow bridge, Yggdrasil, fjord cliffs.
- Greek: marble temples, olive trees, cliffs over a bright sea, Olympus clouds, labyrinth walls.
- Egyptian: sandstone halls, pillars with carved bands, the Nile reeds, the scales of judgement.
- Chinese: mountain palace, peach orchard, cloud sea, red lacquer halls, bronze furnaces.
- Japanese: torii, cedar forest, storm sea, shrine interiors.
- Underworlds: one per culture, all dark with a single coloured practical light.
- Props get **macro inserts** (DOF, shallow focus) like creator 2: the dart, the oath scroll, the book of death.

## Light presets (Three.js recipes; values for `engine/myth3d.js` → `light(stage, name)`)
| Preset | Sky (top→bottom) | Key | Fill/env | Rim | Fog | Bloom | Use |
|---|---|---|---|---|---|---|---|
| `day` | #6fb8e8 → #d8eef7 | sun #fff2d8, 2.6, high back-right | hemi #bfe0ff/#4a6a3a 0.9, env 0.35 | #ffffff 0.6 | #cfe6f2 30–120 m | 0.35 / thr 0.9 | exposition, worlds |
| `dusk` | #3a2a5a → #e66a8a → #ffc08a | sun #ffb27a 2.0, low side | hemi #b07aa0 0.6 | #ffd0a0 1.0 | #c87a8a 15–80 | 0.6 / 0.85 | oaths, deals |
| `gold` | #ff8a3a → #ffe08a | sun #ffc070 2.4, very low | hemi #a06a40 0.5 | #fff0c0 1.2 | #e8a060 20–90 | 0.7 / 0.8 | tension, sunset |
| `candle` | #050308 | point #ff9a40 9.0 (flicker ±8 %), 1 practical | env 0.05 | none | #120806 4–14 | 0.9 / 0.75 | secrets, plots |
| `night` | #040a1e → #12204a | moon #b8c8ff 0.9 | hemi #2a3a6a 0.35 | #a0b8ff 0.8 | #0a1530 10–60 | 0.5 / 0.85 | threat, journeys |
| `dream` | #3a0006 → #000000 | red point #ff2a20 6.0 | none | thread only | #300004 3–18 | 1.0 / 0.7 | nightmares, death |
| `under` | #020206 | coloured practical (culture colour) 7.0 | env 0.08 | #6080ff 0.6 | #04060c 6–30 | 0.8 / 0.75 | underworlds |
| `showroom` | #8ac8f0 → #ffffff | sun #ffffff 2.8 | env 0.5 | none | off | 0.3 / 0.95 | object montages |
Grade: ACES filmic, exposure 1.0–1.15, vignette 0.35 (day) to 0.6 (night), grain 0.03, saturation +10 % (creator 1 runs
sat 120–160; keep it rich). Day centre brightness target 90–120.
Grade punctuation: `bw` (desaturate to 0.1 in 1 frame) on the turn, `flash` (white 2–3 frames) on impact, `snap` (thread
breaks + 0.3 s near-silence) on the loss.

## Camera (see shot-library.md for numbers)
Vertical FOV 40–55° by default, 30° for macro inserts with DOF, 70° for POV and speed. Eye level 70 % of shots. Hero
framed with eyes at 0.35–0.42 of frame height from the top; nothing important below 0.80 or right of 0.88.

## Captions
White bold sans (Nunito 800 or Fredoka 600 from the studio fonts), text height 0.034 of frame height, y = 0.70,
soft shadow (0 2 px 6 px rgba(0,0,0,.8)), 1–4 words, no box, no highlight.

## Sound
Narrator dry and upfront; low cinematic bed (drone + light percussion) at −26 dB under voice; whooshes on whip pans,
sub-hit on impacts, 0.3 s near-silence before the loss line. Master −14 LUFS.
