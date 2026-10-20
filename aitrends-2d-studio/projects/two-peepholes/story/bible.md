# Two Peepholes — story bible

Original Skotoma episode built from the creator's idea: *If your front door has two peepholes… don't use the new one.* This project currently holds the **25-second narrated preview** (cold open). The full-episode outline below is a plan, not yet produced.

## Promise, contradiction, payoff

- **Familiar situation:** you come home at night to your own apartment door.
- **Impossible detail:** the door now has a second peephole, set *higher* than anyone's eye. The hallway lamp shines on both, but only the old one lets light into the dark entry. The new one stays black, even though the hallway outside is visibly empty.
- **Viewer's immediate goal:** work out which hole is safe, and why the new one is dark.
- **Preview payoff:** the black lens blinks. It was never a lens for looking out; it is for something to look in. A dotted sight-line from the new hole locks onto the person and follows them backwards across the room. Final beat: the old peephole's floor light also goes out. Now both are dark (this hooks Rule 2).

## Full-episode outline (proposed, 4 rules, about 3 minutes)

1. **Don't use the new one.** (preview) Old = light on the floor. New = dark, watching.
2. **Don't cover it.** Taping over the new hole makes the *old* one go dark: the light spot moves to wherever you are not looking.
3. **Answer knocks through the old one only, and only if the floor spot is lit.** No spot means something is already using the old one from outside.
4. **Count the peepholes every morning.** If there are three, leave through the window.

Final callback for the full episode: you come home and the door has **one** peephole again, but it is the high, brass one. The floor stays dark.

## Continuity: set `entry-v1` (side cutaway, 1920×1080 logical)

| Element | Value |
|---|---|
| Floor | y = 821 (0.76 H), from x = 115 to the right edge |
| Door wall, inner face | x = 1420; slab 36 px thick (outer face 1456); door top y = 392; lintel above |
| Old peephole | y = 578 (head height in the `peer` pose), muted-gray fittings |
| New peephole | y = 486 (53 px above the head top), brass/yellow fittings |
| Handle | lever on the inner face at y = 690 |
| Hallway | x > 1456, warm wall sconce at (1860, 330); empty in every shot |
| Old beam | lamp → old hole → floor spot centred near x = 1030 |
| Person `person-v1` | `P.human`, scale 0.92, plain wardrobe; stands at x = 1230 inside; peers at x = 1369 |
| Interior props | console table x 300–540, framed picture (420, 470), unlit pendant lamp x = 780 |

Insert `door-face-v1` (frontal) keeps the same order: new lens **above** old lens. The POV `fisheye-v1` shows the hallway's opposite wall, sconce and neighbour door 4D. It is always empty.

## Palette and type

`casefile` navy stage; white/gray pictograms. **Yellow** = attention (new brass fitting, sight-line, key words). **Red** = danger/negative (new lens dark, "WATCHED"). **Green** = confirmed condition (old lens passes light; hallway empty). Montserrat 800/900, sentence-level phrase captions at y ≈ 969.

## Audio

ElevenLabs `eleven_v4`, voice *Charliee – Calm Cinematic Narrator*, take 2 of 4 (generation `XcMr6HQPYRLOZGldpBlo`). Word timings from ElevenLabs Scribe; pauses cross-checked with ffmpeg silence detection. The bed is a quiet procedural `unease` → `dread` score. A few sparse effects are tied to visible actions: footsteps, door shut, rule hit, blink, lock-on and the light going out.

## Rebuild

From `aitrends-2d-studio/` (after `npm install` and `pip install numpy scipy`):

```bash
python tools/validate_project.py --project projects/two-peepholes --creative
node render.mjs --project projects/two-peepholes --workers 4 --format jpeg   # build/video_silent.mp4
python audio/mix.py --project projects/two-peepholes                          # out/Two_Peepholes__preview.mp4
```

Animation cue times in `scenes/shots/peephole.js` are local seconds taken from `timeline/words.json`. If the narration changes, re-derive them and re-author `timeline/phrases.json`.
