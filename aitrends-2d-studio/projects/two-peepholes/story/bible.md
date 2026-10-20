# Two Peepholes — story bible

Original WRONG KNOCK episode built from the creator's idea: *If your front door has two peepholes… don't use the new one.* Full episode: 1:48, 31 shots, 4 rules (revision 2, staging pass). The first 25 s is the approved preview, kept unchanged as the cold open; `out/Two_Peepholes__preview.mp4` is that preview render.

## Promise, contradiction, payoff

- **Familiar situation:** you come home at night to your own apartment door.
- **Impossible detail:** the door now has a second peephole, set *higher* than anyone's eye. The hallway lamp shines on both, but only the old one lets light into the dark entry. The new one stays black, even though the hallway outside is visibly empty.
- **Viewer's immediate goal:** work out which hole is safe, and why the new one is dark.
- **Cold-open payoff:** the black lens blinks. It was never a lens for looking out; it is for something to look in. A dotted sight-line from the new hole locks onto the person and follows them backwards across the room. Final beat: the old peephole's floor light also goes out. Now both are dark (this hooks Rule 2).

## Episode structure (as produced)

| Time | Rule | What happens | Visual proof |
|---|---|---|---|
| 0:00–0:25 | 1. **Don't use the new one.** | Cold open (approved preview). The new lens blinks; a sight-line locks on; the old light dies. | Floor light spot; blink; red lock |
| 0:25–0:54 | 2. **If both are dark, sit against the door.** | A peephole only sees in and a little down (−3° to 41°). Sitting under the door puts you in its blind spot; the search line hunts the table, the picture and the old spot but never reaches you. | View cones + green blind-spot triangle |
| 0:54–1:18 | 3. **Don't cover them.** | Hypothetical, tagged IF YOU COVER THEM. Taping both holes makes it open a closer one: a brass eye punches through the picture on the wall and sees straight into the blind spot. | Picture-eye insert; red line into the blind spot; evidence cards |
| 1:18–1:48 | 4. **Wait for the light.** | Before morning the old light returns and the new hole disappears: it let go of the door. Look at the light first. Two feet and a long body shadow stand in it. It came in. | Top-down floor spot with a body shadow; glint in the air above it, higher than the door, with a red lock |

## Revision 2 (staging pass, same narration)

- **Opening:** a front view of the door's inner face (`door-front-v1`) shows one lit lens; after the side-view arrival, the same front view shows a brass lens growing above it on "two". The PEEPHOLES badge is removed.
- **Rule 2:** the cone diagram appears once (s10). Survival is shown as physical beats: a both-dark insert, the searching eye insert, a 2x medium close with the back pressed flat and a hand braced on the floor, a wide search beam that lights each named object, and a red beam that grazes the tucked head.
- **Rule 3:** the "what if" is framed by a flash in, a dashed border, a faint red veil and a red IF YOU COVER THEM banner. In an insert, a sleeved hand presses an opaque tape patch onto each lens, and both stay. A white wipe from the door to the left erases tape, picture eye, line and frame, returning to the real room.
- **Rule 4:** inserts show the old lens relighting and the brass lens closing; the wide returns to the established floor-spot position.
- **Ending:** two dark legs stand in the old beam, warm-rimmed. A faceless silhouette taller than the door resolves on "came", with one yellow eye glint. The person recoils on "IN". The figure takes one slow step toward them, its shadow sliding across the floor light, then holds.
- **Captions:** 78 short phrase cues of up to 28 characters each, with every spoken word preserved.

**Prepared callbacks:** the floor light spot (shown from the first second) reveals the intruder. "Higher than anyone's eye" pays off as a glint above the door height. The cold open's "to look IN" is answered by the final "It came IN." The blink returns as the glint blinking.

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
| Interior props | console table x 300–540, framed picture (420, 467), unlit pendant lamp x = 780 |
| Seated position | `SIT` pose, facing left, x = 1395 (back on the door); taping position x = 1350 (`REACH_MID` / `REACH_UP`) |
| Sight geometry | each hole sees from 3° up to 41° down (`SIGHT`, `aim()`); the blind spot is the triangle under the old hole to the floor at x ≈ 1129 |
| Intruder (final) `presence-v1` | dark pictogram at scale 1.78 (head top ≈ y 275, above the door top 392), standing at x = 1012, then stepping to 1072; warm rim only where the old beam hits; eye glint on the head |
| Front door `door-front-v1` | 440-wide panel centred at x = 960, floor y = 880; old lens y = 420, new lens y = 250 (r 40); handle and deadbolt on the right |
| Medium close | 2x camera on (1320, 661): door, both holes and the seated person; the floor maps to y = 860 |

Insert `door-face-v1` (frontal) keeps the same order: new lens **above** old lens. The POV `fisheye-v1` shows the hallway's opposite wall, sconce and neighbour door 4D. It is always empty. Insert `picture-v1` is the same framed hill picture; `floor-spot-v1` is a top-down view of the old hole's light on the boards, with the door at the right.

## Palette and type

`casefile` navy stage; white/gray pictograms. **Yellow** = attention (new brass fitting, sight-line, key words). **Red** = danger/negative (new lens dark, "WATCHED"). **Green** = confirmed condition (old lens passes light; hallway empty). Montserrat 800/900, sentence-level phrase captions at y ≈ 969.

## Audio

ElevenLabs `eleven_v4`, voice *Charliee – Calm Cinematic Narrator*. Cold open: take 2 of 4 (generation `XcMr6HQPYRLOZGldpBlo`, `input/voice_part1_coldopen.mp3`). Rules 2–4: take B of 4 (generation `MiKz6oKjET3V24pIXkuL`, `input/voice_part2_rules2-4.mp3`), joined at exactly 25.0 s, +0.7 dB to match loudness, in `input/voiceover.wav`. Word timings from ElevenLabs Scribe; pauses cross-checked with ffmpeg silence detection. The bed is a quiet procedural `unease` → `dread` score. A few sparse effects are tied to visible actions: footsteps, door shut, rule hit, blink, lock-on and the light going out.

## Rebuild

From `aitrends-2d-studio/` (after `npm install` and `pip install numpy scipy`):

```bash
python tools/validate_project.py --project projects/two-peepholes --creative
node render.mjs --project projects/two-peepholes --workers 4 --format jpeg   # build/video_silent.mp4
python audio/mix.py --project projects/two-peepholes                          # out/Two_Peepholes.mp4
```

Animation cue times in `scenes/shots/peephole.js` are local seconds taken from `timeline/words.json`. If the narration changes, re-derive them and re-author `timeline/phrases.json`.
