# ENG-01 — How a stream becomes a hydroelectric dam

**43.4 s voiceover + 1.0 s end hold = 44.5 s · 130 words · 3.0 words/sec · 3 Failure → Fix
cycles · myth-buster at 65 %**

Built to [`docs/10-engineering-channel-format-bible.md`](../docs/10-engineering-channel-format-bible.md).
This is the calibration piece for the format: the 40–50 s default cut.

**Voiceover:** [`voiceovers/eng-01-hydroelectric-dam.mp3`](../voiceovers/eng-01-hydroelectric-dam.mp3)
— ElevenLabs, voice "Patrick", model eleven_v4, take 2 of 4.
**Word-by-word captions:** [`voiceovers/eng-01-hydroelectric-dam.captions.srt`](../voiceovers/eng-01-hydroelectric-dam.captions.srt)
(one word per cue, Title Case, each word held until the next one starts). Raw word timings:
[`voiceovers/eng-01-hydroelectric-dam.words.json`](../voiceovers/eng-01-hydroelectric-dam.words.json).
All timecodes below are taken from that recording.

---

## A. Voiceover script

```
[HOOK]    If you pile rocks across a stream, you have a dam.
[FAIL 1]  But the water slips through the gaps and washes it away.
[FIX 1]   So you pour a concrete wall, thick at the bottom, where water pushes hardest.
[NAME]    This is a gravity dam.
[FAIL 2]  But water seeps underneath and lifts it from below.
[FIX 2]   So you pump grout into the rock and drill drains to bleed the pressure.
[FAIL 3]  But in a storm, water pours over the top and digs out the base.
[FIX 3]   So you add a stepped spillway to break the fall.
[MYTH]    And the wall feels the lake's depth, not its size. A mile-long lake pushes as hard as a foot-long one.
[FINISH]  Pipe the water through a turbine and run the wires home.
[FINISH]  Add railings and lamps.
[PAYOFF]  Congratulations, you have built a hydroelectric dam.
```

## Loop map

Each beat runs from its first spoken word to the next beat's first word, so the visuals
fill the pauses.

| Time | Beat | In five words |
|---|---|---|
| 0:00.0–0:03.8 | Hook | Rock pile blocks the stream |
| 0:03.8–0:07.2 | Failure 1 | Water squirts through, pile collapses |
| 0:07.2–0:12.1 | Fix 1 | Triangular concrete wall on bedrock |
| 0:12.1–0:14.2 | Name | Gravity dam |
| 0:14.2–0:17.4 | Failure 2 | Seepage uplift floats the wall |
| 0:17.4–0:21.4 | Fix 2 | Grout curtain plus drain holes |
| 0:21.4–0:25.3 | Failure 3 | Storm overtops, scours the toe |
| 0:25.3–0:28.3 | Fix 3 | Stepped spillway breaks the fall |
| 0:28.3–0:35.8 | **Myth-buster** | Depth matters, lake size doesn't |
| 0:35.8–0:40.4 | Finishing touches | Turbine, power lines, railings, lamps |
| 0:40.4–0:44.5 | Payoff | Closing line + channel sign |

---

## B. Frame-by-frame 3D animation blueprint

### Environment kit for this topic

- **Frame:** 1080×1920, 30 fps, one continuous camera, no hard cuts.
- **Cut plane:** a vertical slice **along the stream's centreline**, so the dam reads in
  profile. Stream flows **left → right**; the lake forms on the left (upstream), the
  powerhouse sits at the right (downstream).
- **Home camera:** low, centred, square-on to the cut plane. Ground level just below frame
  centre; the cutaway fills the lower ~45 %.
- **Above ground (background, softly blurred):** the channel house on the far bank — white
  siding, red-brown roof, blue window frames — with the fence line, low-poly trees and the
  striped lawn running down to the water.
- **Cutaway layers, top to bottom:** stream water (clear blue, surface highlights) → topsoil
  (rich brown) → subsoil (medium brown) → clay (dense dark brown) → groundwater table (blue
  band) → bedrock (grey, with hairline cracks drawn in, lower 15 % of frame).
- **Recurring machines:** excavator bucket, drill rig, the channel's hero pickup (payoff).
- **Captions:** word by word from the SRT, Title Case, white with thin black outline and
  soft shadow, centred at 48 % height. One yellow stat callout only (myth-buster).

---

### 0:00.0–0:03.8 · HOOK
**VO (0:00.24–0:03.52):** "If you pile rocks across a stream, you have a dam."
**Captions:** If · You · Pile · Rocks · Across · A · Stream · You · Have · A · Dam

- **a · 0:00.0–0:01.3** ("If you pile rocks") — Wet, round river rocks drop one at a time
  into the stream and stack into a knee-high pile across it.
- **b · 0:01.3–0:03.8** ("across a stream, you have a dam") — It works for a second: water
  backs up behind the pile into a little pond and the water line climbs on the left of the
  cutaway.
- **Cutaway & assets:** full layer stack; the pile sits on the topsoil of the stream bed.
- **Colour codes:** clear blue water with surface highlights; brown geology layers.
- **Gag / metaphor:** none. The naive version is shown working, played straight.
- **Camera:** home position, slow push-in toward the pile. Shallow depth of field: the house
  and trees are soft and the pile is sharp.
- **SFX:** stone-on-stone clacks and water plops (a) → gentle trickle settling to still (b).
- **On-screen text:** word captions only.

### 0:03.8–0:07.2 · FAILURE 1
**VO (0:03.84–0:06.80):** "But the water slips through the gaps and washes it away."
**Captions:** But · The · Water · Slips · Through · The · Gaps · And · Washes · It · Away

- **a · 0:03.8–0:05.4** ("But the water slips through the gaps") — Macro push into the
  pile: thin blue jets squirt out between the rocks like a lawn sprinkler, while blue seepage
  paths snake underneath it through the topsoil particles.
- **b · 0:05.4–0:07.2** ("and washes it away") — The pile gives way. The rocks tumble and
  roll downstream like bowling balls, and the pond drains out of frame.
- **Cutaway & assets:** pile, topsoil particles in macro, seepage paths.
- **Colour codes:** blue jets with white foam at each gap; blue seepage paths winding through
  the soil.
- **Gag / metaphor:** the rock pile turns into a sprinkler, then a bowling alley.
- **Camera:** macro-to-micro zoom into the gaps (a), quick pull back to home to watch the
  collapse (b).
- **SFX:** pressurised water hiss (a) → rumbling clatter of tumbling rocks → glug-glug as
  the pond drains (b).
- **On-screen text:** word captions only.

### 0:07.2–0:12.1 · FIX 1
**VO (0:07.20–0:11.72):** "So you pour a concrete wall, thick at the bottom, where water
pushes hardest."
**Captions:** So · You · Pour · A · Concrete · Wall · Thick · At · The · Bottom · Where ·
Water · Pushes · Hardest

- **a · 0:07.2–0:08.0** ("So you pour a") — An excavator bucket bites a trench straight
  down through topsoil, subsoil and clay until it scrapes grey bedrock.
- **b · 0:08.0–0:09.1** ("concrete wall") — A steel-grey rebar cage drops into the trench
  and rises above the stream. Concrete sprays in and flows around the bars.
- **c · 0:09.1–0:12.1** ("thick at the bottom, where water pushes hardest") — On "thick"
  the wall's profile swells from a thin slab into a triangle: thick base, thin top. On
  "where water" the lake refills behind it, and red force arrows grow on the upstream face,
  short at the surface and longer at each step down, forming the triangular pressure diagram.
- **Cutaway & assets:** trench to bedrock, rebar cage, poured wall keyed into the bedrock,
  rising lake.
- **Colour codes:** steel-grey rebar; matte medium-grey concrete; **red force arrows**
  (horizontal, pointing into the wall, length growing with depth); blue lake.
- **Gag / metaphor:** the wall "inflates" into its triangle at the exact moment the arrows
  show why.
- **Camera:** tilt down following the bucket into the trench (a) → macro zoom on concrete
  flowing around the rebar cage (b) → pull back to home profile to reveal the triangle (c).
- **SFX:** diesel growl plus deep digging crunch (a) → steel clank, then wet, forceful
  whoosh of concrete spraying (b) → low rushing fill and a soft thrum as each arrow appears
  (c).
- **On-screen text:** word captions only.

### 0:12.1–0:14.2 · NAME
**VO (0:12.08–0:13.68):** "This is a gravity dam."
**Captions:** This · Is · A · Gravity · Dam

- **Visual:** the lake settles near the crest. On "gravity" one large **white** arrow
  presses straight down through the middle of the wall: its own weight is what holds it in
  place.
- **Cutaway & assets:** finished triangular wall, full lake, all layers.
- **Colour codes:** white downward arrow (load handled safely); red pressure arrows held.
- **Gag / metaphor:** none. Clean reveal.
- **Camera:** slight crane up from home, holding the full profile.
- **SFX:** deep settling thud; water lapping.
- **On-screen text:** word captions only.

### 0:14.2–0:17.4 · FAILURE 2
**VO (0:14.16–0:17.08):** "But water seeps underneath and lifts it from below."
**Captions:** But · Water · Seeps · Underneath · And · Lifts · It · From · Below

- **a · 0:14.2–0:15.8** ("But water seeps underneath") — Macro into the foundation: blue
  seepage paths wind from the lake bed down through the bedrock's hairline cracks and spread
  as a thin blue film under the dam's base.
- **b · 0:15.8–0:17.4** ("and lifts it from below") — Red arrows push up on the base and
  the white weight arrow shrinks. The whole concrete wall lifts at its upstream heel and bobs
  like a floating dock.
- **Cutaway & assets:** dam base, bedrock cracks, seepage film.
- **Colour codes:** blue seepage paths and film; **red upward force arrows** (red = harm);
  white weight arrow shrinking.
- **Gag / metaphor:** millions of pounds of concrete bobbing like a dock, matching the
  pool-shell-floating gag.
- **Camera:** macro push into the base/bedrock joint (a) → snap back to the full profile to
  see the wall rock (b).
- **SFX:** rising pressure hiss (a) → deep concrete groan and a creak as it bobs (b).
- **On-screen text:** word captions only.

### 0:17.4–0:21.4 · FIX 2
**VO (0:17.36–0:21.12):** "So you pump grout into the rock and drill drains to bleed the
pressure."
**Captions:** So · You · Pump · Grout · Into · The · Rock · And · Drill · Drains · To · Bleed ·
The · Pressure

- **a · 0:17.4–0:18.4** ("So you pump grout") — A drill rig on the crest drives a steel
  drill string down through the dam's heel into the bedrock, and thick grey grout is pumped
  straight down behind it.
- **b · 0:18.4–0:19.2** ("into the rock") — Macro: the grout spreads through the rock
  cracks and sets into a grey vertical **grout curtain**. The blue seepage paths hit it and
  stop.
- **c · 0:19.2–0:21.4** ("and drill drains to bleed the pressure") — A row of drain holes
  is drilled just downstream of the curtain. The little water that gets past gurgles into
  them and out. The red upward arrows shrink to nothing, and the dam drops back onto its
  foundation.
- **Cutaway & assets:** drill string, grout curtain under the heel, drain holes in the
  bedrock.
- **Colour codes:** steel-grey drill; grey grout; blue seepage stopped dead at the curtain;
  red arrows fading; white weight arrow restored to full size.
- **Gag / metaphor:** the seepage paths "bump their heads" on the curtain and pool against it.
- **Camera:** tilt down following the drill (a) → macro on grout filling cracks (b) → pull
  back to home to see the dam settle (c).
- **SFX:** drill whine plus sharp metallic impacts, then a steady pump thrum (a) → thick
  gloopy push (b) → second drill burst, glug-glug of the drains, then one heavy thud as the
  dam lands (c).
- **On-screen text:** word captions only.

### 0:21.4–0:25.3 · FAILURE 3
**VO (0:21.44–0:25.04):** "But in a storm, water pours over the top and digs out the base."
**Captions:** But · In · A · Storm · Water · Pours · Over · The · Top · And · Digs · Out ·
The · Base

- **a · 0:21.4–0:22.5** ("But in a storm") — The sky grades to dark grey, rain streaks
  in, lightning flashes. The lake climbs the upstream face and the red pressure arrows
  stretch with it.
- **b · 0:22.5–0:23.8** ("water pours over the top") — Water spills over the crest and
  free-falls down the downstream face.
- **c · 0:23.8–0:25.3** ("and digs out the base") — At the toe, the plunging water churns
  the ground like a blender. In the cutaway, topsoil and subsoil particles are blasted out
  and a scour hole spreads under the toe. The dam starts to tip forward.
- **Cutaway & assets:** rising lake, overtopping sheet, scour hole growing under the toe.
- **Colour codes:** blue water with white spray where it hits; brown particles flying;
  red arrows lengthening.
- **Gag / metaphor:** the falling water drills into the yard like a pressure washer
  through sand.
- **Camera:** hold home as the storm rolls in (a) → tracking shot that rides the falling
  water down the downstream face (b) → macro into the scour hole (c).
- **SFX:** thunder crack and heavy rain (a) → roaring waterfall (b) → churning gurgle and a
  deep cracking groan (c).
- **On-screen text:** word captions only.

### 0:25.3–0:28.3 · FIX 3
**VO (0:25.28–0:27.96):** "So you add a stepped spillway to break the fall."
**Captions:** So · You · Add · A · Stepped · Spillway · To · Break · The · Fall

- **a · 0:25.3–0:26.8** ("So you add a stepped spillway") — Concrete steps snap into
  place one after another down the downstream face, bottom to top. A concrete basin fills
  the scour hole at the toe.
- **b · 0:26.8–0:28.3** ("to break the fall") — Water pours down the steps. Each step
  breaks it into white foam, and at the bottom it slides into a calm pool. The storm clears.
- **Cutaway & assets:** stepped spillway on the downstream face, stilling basin at the toe.
- **Colour codes:** matte grey concrete; blue water turning white at each step; sky back to
  blue.
- **Gag / metaphor:** the steps turn a waterfall into a staircase the water has to walk
  down.
- **Camera:** tracking shot following the water down the spillway, step by step, landing at
  the basin.
- **SFX:** a rhythmic concrete thunk per step (a) → the roar chopping into
  splash-splash-splash, then calm lapping (b).
- **On-screen text:** word captions only.

### 0:28.3–0:35.8 · MYTH-BUSTER
**VO (0:28.32–0:35.12):** "And the wall feels the lake's depth, not its size. A mile-long
lake pushes as hard as a foot-long one."
**Captions:** And · The · Wall · Feels · The · Lake's · Depth · Not · Its · Size · A ·
Mile-Long · Lake · Pushes · As · Hard · As · A · Foot-Long · One

- **a · 0:28.3–0:31.6** ("And the wall feels the lake's depth, not its size") — The
  camera cranes up and back from home and reveals the lake stretching a mile into the
  distance behind the dam. The house is tiny now. The red pressure arrows on the upstream
  face stay visible in the cutaway.
- **b · 0:31.6–0:34.3** ("A mile-long lake pushes as hard as a foot-long") — The whole
  mile of water slides toward the dam and compresses into a one-foot-wide sliver, held by a
  glass pane, at exactly the same depth. The red arrows on the dam face do not change length
  at all.
- **c · 0:34.3–0:35.8** ("one") — The lake springs back out to a mile. Arrows still
  unchanged.
- **Cutaway & assets:** dam face with the full red arrow stack; the lake, then the glass
  sliver.
- **Colour codes:** red force arrows (constant); blue water; glass pane with white edge
  highlights.
- **Gag / metaphor:** a mile of lake squeezed into a fish-tank-thin slice, and the dam
  can't tell the difference.
- **Camera:** crane up and back to the widest shot of the video (a) → hold while the lake
  squeezes (b) → settle back toward home (c).
- **SFX:** airy wind whoosh on the crane (a) → long suction whoosh ending in a glass "tink"
  (b) → reverse whoosh (c).
- **On-screen text:** stat callout **"1 MILE = 1 FOOT"** in yellow/gold all caps, above
  the word caption, 0:31.8–0:34.8. Word captions keep running underneath.

### 0:35.8–0:38.9 · FINISHING TOUCHES — power
**VO (0:35.76–0:38.64):** "Pipe the water through a turbine and run the wires home."
**Captions:** Pipe · The · Water · Through · A · Turbine · And · Run · The · Wires · Home

- **a · 0:35.8–0:37.3** ("Pipe the water through a turbine") — A steel penstock pipe
  bores through the lower body of the dam, from an intake on the lake side down to a
  powerhouse at the toe. Water rushes through it and spins the turbine runner.
- **b · 0:37.3–0:38.9** ("and run the wires home") — Power lines run from the powerhouse up
  the bank to the house. Small yellow lightning bolts travel along the wires, and the house
  windows light up warm on "home".
- **Cutaway & assets:** penstock through the dam, turbine and generator in the powerhouse,
  power lines.
- **Colour codes:** steel-grey penstock; blue water stream with highlights inside the pipe;
  yellow lightning bolts along the wires.
- **Gag / metaphor:** the house lights snap on as the first bolt arrives.
- **Camera:** macro zoom into the spinning turbine (a) → tracking rig riding along the
  power line from powerhouse to house (b).
- **SFX:** rushing glug through the pipe and a turbine whine rising in pitch (a) → steady
  electrical hum, tick-tick of the bolts, light-switch click (b).
- **On-screen text:** word captions only.

### 0:38.9–0:40.4 · FINISHING TOUCHES — aesthetics
**VO (0:38.88–0:40.16):** "Add railings and lamps."
**Captions:** Add · Railings · And · Lamps

- **Visual:** steel railings snap onto the crest on "railings", lamps pop up along it and
  switch on as bolts reach them on "lamps", and grass rolls back over the scarred banks.
- **Cutaway & assets:** everything built so far, now finished.
- **Colour codes:** steel grey; warm lamp glow; striped green lawn.
- **Gag / metaphor:** none. Quick and satisfying.
- **Camera:** glide back to home profile with a slight crane up.
- **SFX:** two crisp metallic clicks, lamp buzz-on.
- **On-screen text:** word captions only.

### 0:40.4–0:44.5 · PAYOFF
**VO (0:40.40–0:43.44):** "Congratulations, you have built a hydroelectric dam."
**Captions:** Congratulations · You · Have · Built · A · Hydroelectric · Dam

- **Visual:** clear blue sky. The hero pickup drives across the crest under the lamps. The
  spillway foams gently, and yellow bolts keep flowing to the lit house. A green
  street-style sign at the end of the crest reads **[CHANNEL NAME] DAM**. Hold the finished
  frame for 1 s after the last word (to 0:44.5).
- **Cutaway & assets:** full final stack, all visible at once: bedrock, grout curtain, drain
  holes, triangular dam, penstock, turbine, stepped spillway, basin.
- **Colour codes:** all codes at rest: blue water, grey concrete, yellow bolts; no red
  arrows left.
- **Gag / metaphor:** none. The finished build is the payoff.
- **Camera:** slow push back to the full frame; the cutaway stays sharp.
- **SFX:** pickup engine and tire roar passing; birds; soft water.
- **On-screen text:** word captions; the sign is part of the scene, not a caption.

---

## Sources

- **Myth-buster:** the horizontal water force on a dam, per metre of dam width, is ½ρgh².
  It depends only on depth *h*, not on how far the reservoir extends upstream (the
  hydrostatic paradox). Standard fluid-statics result, used in every gravity-dam stability
  calculation (e.g. US Bureau of Reclamation, *Design of Gravity Dams*).
- **Gravity dam, uplift, grout curtain, foundation drains, stepped spillway, penstock:**
  standard concrete-dam practice (USBR, *Design of Gravity Dams*; USACE EM 1110-2-2200,
  *Gravity Dam Design*).
