# 10. Engineering channel — format bible

The rulebook for every script and animation blueprint on the 3D engineering-breakdown
channel. The sole template is the **@youbuiltit road video**. The @trialandeureka (instant
noodles, history-of-invention) and @selfmade.engineer (Tesla loop, physics stunt) videos
are context only — their formats are **not** replicated.

Sections 1–6 are the rules. Section 7 is how every deliverable is laid out. Section 8 is
the pre-delivery checklist.

---

## 0. What the road video actually does (measured)

Measured from the uploaded file (576×1024, 30 fps): frames sampled every 0.17 s, narration
read off the burned-in word captions, cuts found with ffmpeg scene detection.

| Measure | Value |
|---|---|
| Narration length | **66.3 s** (0:00.0 → 1:06.3). TikTok's own end card runs after it. |
| Words | **~258**, about **3.9 words per second**: fast, clipped and still flat |
| Hard cuts | **Zero.** The whole video is one continuous camera move. The only "transition" is the pickup driving past the lens at 0:33.5–0:35.0, which works as a natural wipe. |
| Failure → fix cycles | **5 full cycles** after the hook, each closed by a fix |
| Myth-buster position | **0:54.3–1:02.0 (82–94 % of runtime)** — after the last fix, right before the finishing touches |
| Captions | One word at a time, **Title Case** ("Congratulations", "Macadam"), heavy rounded white sans, thin black outline + soft shadow, centred horizontally at **~48 % frame height** — on the horizon line, just above the cutaway |
| Stat callout | "**= 9,600 CARS**" — **yellow/gold, all caps**, a separate layer *above* the word caption, held ~2 s. Narration says "almost ten thousand"; the screen shows the precise figure. |
| Loudness | −17.9 LUFS integrated |

### Reference narration, time-coded

| Time | Role | Narration |
|---|---|---|
| 0:00.0–0:03.8 | **Hook** | If you scrape the grass off a strip of your yard and drive on it, you have a road. |
| 0:03.8–0:07.5 | Failure 1 | But the first rain turns it to mud, and your wheels sink in up to the axles. |
| 0:07.7–0:09.9 | Fix 1 + **Now** | So you fill it with stones. Now your weight spreads out. |
| 0:10.3–0:12.8 | Failure 2 | But round stones roll out under the tires like marbles. |
| 0:13.0–0:20.5 | Fix 2 + **Name** | So you use crushed rock: big sharp pieces on the bottom and small ones on top. And you pack it down until the edges lock together. This is called macadam. |
| 0:20.8–0:23.9 | Failure 3 | But the rain still soaks through it and softens the dirt underneath. |
| 0:24.0–0:31.4 | Fix 3 + **Name** + **Now** | So you build the middle of the road a little higher than the sides and dig a ditch along each edge. This is a crown. Now the water runs off before it gets in. |
| 0:31.7–0:34.8 | Failure 4 | But fast tires throw the small stones and blow away the dust that holds them. |
| 0:35.2–0:41.9 | Fix 4 + **Name** | So you glue the top layer together with a thick black tar left over from making gasoline. Spread it hot and roll it flat. This is asphalt. |
| 0:42.5–0:51.6 | Failure 5 + **Name** | But in winter, water gets into the smallest crack, freezes, swells, and lifts the road from below. And when it melts, it leaves a hollow that the next wheel breaks through. That is a pothole. |
| 0:52.0–0:54.0 | Fix 5 | So you seal every crack before the cold comes. |
| 0:54.3–1:02.0 | **Myth-buster** | And that road is not worn out by the cars. It is worn out by trucks. Because one loaded truck does the damage of almost ten thousand cars. *(on screen: = 9,600 CARS)* |
| 1:02.5–1:04.3 | Finishing touches | Add painted lines and curbs. |
| 1:04.5–1:06.3 | **Payoff** | Congratulations, you have built a road. *(green sign: YOU BUILT IT RD)* |

### Corrections to the escalation list in the brief

1. **There is a fifth fix.** After the freeze-thaw pothole the loop closes with "So you seal
   every crack before the cold comes." The loop never ends on an unsolved failure.
2. **The myth-buster comes late, not halfway.** It lands at 82 % of runtime, after the last
   fix. Rule for this channel: myth-buster between **65 % and 85 %** of runtime.
3. **Two beat types were missing from the brief:** the **Name beat** ("This is called
   macadam." / "This is a crown." / "This is asphalt." / "That is a pothole.") and the
   **Now beat** ("Now your weight spreads out." / "Now the water runs off before it gets
   in."). Both are now rules (section 1).
4. **Trees are not low-poly** in the road video — they are realistic broadleaf trees. There
   is also **no fence**. The low-poly trees in the brief come from the @selfmade.engineer
   video. Keep the fence and low-poly trees anyway: they are a cheap way to make the yard
   *yours* instead of @youbuiltit's (section 6).
5. **Weight arrows come in two colours.** Load spreading out through stone (0:09–0:10) is
   shown with **white** downward arrows. Damaging force (the loaded truck, 0:58) is shown
   with **red-orange** chunky downward arrows. Red means harm.

---

## 1. Narrative architecture — the Action → Failure → Fix loop

Never write a linear or standard educational script. Every video is an escalating loop:
**Action → Physical/Environmental Failure → Engineering Fix**, repeated. Each fix creates or
exposes the next failure.

### 1.1 The beat grammar

Every sentence in a script is one of these beats, and each beat has a fixed opener. This is
what makes the reference sound like a bedtime story.

| Beat | Opener | Job | Reference example |
|---|---|---|---|
| **Hook** | "If you … , you have a [subject]." | The naive, intuitive premise, shown being attempted | "If you scrape the grass off a strip of your yard and drive on it, you have a road." |
| **Failure** | "But …" | Nature, physics or biology ruins the current version. Always states the physical consequence. | "But round stones roll out under the tires like marbles." |
| **Fix** | "So you …" | One concrete engineering action, shown being applied | "So you fill it with stones." |
| **Now** *(optional)* | "Now …" | One short sentence proving the fix works before the next failure | "Now your weight spreads out." |
| **Name** *(optional)* | "This is called …" / "This is a …" / "That is a …" | Gives the real engineering term right after it appears on screen | "This is called macadam." |
| **Myth-buster** | "And …" + "not X. It is Y." + "Because …" | Exactly one surprising real-world fact with one big number | "And that road is not worn out by the cars. It is worn out by trucks. Because one loaded truck does the damage of almost ten thousand cars." |
| **Finishing touches** | Bare imperative: "Add …" | Aesthetic additions — landscaping, tiles, paint lines, railings, lights. When the subject has a job to switch on (power, cooling), the switch-on rides here too, as a bare imperative. | "Add painted lines and curbs." |
| **Payoff** | "Congratulations, you have built a [subject]." | Exact closing phrase, every video | "Congratulations, you have built a road." |

### 1.2 Loop rules

- **The hook is shown being attempted**, not just said. The naive version is on screen and
  being used (driven on, swum in, sat on) before the first "But".
- **The first failure is dramatic and visual**: mud swallowing wheels to the axles, an empty
  pool shell bobbing out of the ground like a boat, a living room sprouting lily pads.
- **At least 2–3 full Failure → Fix cycles** in a 40–50 s cut (the 66 s reference fits 5).
  Each fix is shown being applied, then the next failure point is revealed.
- **Every failure states its physical cause and consequence** — rain → mud → wheels sink.
  "It doesn't work" is never a failure line.
- **Every fix is real engineering practice**, and the real terms get spoken: at least one
  Name beat in a 40–50 s cut, two or more in a 60 s+ cut (the 66 s reference has four). Fix
  lines use the real term too ("stepped spillway", "crushed rock").
- **The loop always closes on a fix.** The last failure gets a fix before the myth-buster.
- **Exactly one myth-buster**, placed at 65–85 % of runtime, after the main build is mostly
  complete and before the finishing touches. It debunks a common belief or reveals a
  fascinating reality ("the smell is chloramines, not chlorine"; "the roof pipe is a vent,
  not a chimney"; "the drip is water pulled from room air, not a leak").
  - Narration may round ("almost ten thousand"); the **on-screen callout shows the precise
    number** ("= 9,600 CARS").
  - Every myth-buster number carries a **source line** in the script file. The 9,600 figure,
    for example, is from a 1979 US General Accounting Office report based on the AASHO Road
    Test (fourth-power law); it is an estimate that trucking groups dispute, so it stays
    framed as "almost" in the narration.
- **Finishing touches, then the exact closing line**, then a branded sign (section 6).

### 1.3 Tone — deadpan

Deadpan, authoritative, conversational. Complex civil and mechanical engineering told like a
simple bedtime story. No excitement, no surprise, no exclamation marks, no rhetorical
questions, no "imagine", no "here's the crazy part". Short declarative sentences in second
person ("you"). Calm, matter-of-fact explanation of each failure and fix. The comedy comes
from the visuals; the voice never acknowledges it.

---

## 2. Visual style and art direction

### 2.1 The split-level cross-section cutaway

Every scene is anchored by a permanent vertical slice down through the yard and earth (and
through the house when the subject is inside the house). **The cutaway never disappears** —
not during the hook, not during the myth-buster, not at the payoff.

- **Placement (measured):** the cutaway fills the **lower ~45 %** of the 9:16 frame. Ground
  level sits just below the frame's midline, which is also where the word captions sit.
- **The cut plane is chosen so the hidden infrastructure reads in profile** — across the road
  for a road, along the stream for a dam, through the bathroom floor for a toilet.
- **Layers, top to bottom:**
  1. Ground surface / structures / water / air
  2. Topsoil — rich brown
  3. Subsoil / compacted earth — medium brown
  4. Clay — dense, darker brown
  5. Groundwater table — blue band (when relevant)
  6. Bedrock — grey (when relevant)
  7. Underground piping, foundations, rebar and other hidden infrastructure, drawn inside
     the layers they live in
- **Texture (measured):** the dirt is a sculpted, photoreal face with vertical gouges and
  visible particle detail, not a flat colour band. Stones in the cutaway are individual
  faceted rocks, and they get visibly bigger as the camera pushes in.
- **The cutaway evolves in place.** New layers appear by being dumped, poured, rolled or
  dug *inside* the same slice. The slice never resets between beats.

### 2.2 Asset continuity — the baseline environment

The same environment kit opens every video, for brand recognition:

- **The house:** standard suburban house — white (light grey) siding, red-orange/brown
  roof, windows with **blue frames**. Matches the reference.
- **The lawn:** striped green mowing pattern. Matches the reference.
- **Fence line** and **low-poly trees** — the brief's own additions (the reference uses
  realistic trees and no fence). Keep them as this channel's signature.
- **The hero vehicle:** one recurring vehicle that "tests" each version of the build (the
  reference uses an orange-red heavy-duty pickup with a black grille). Pick one for this
  channel and never change it.
- **Supporting machines:** a yellow compactor/roller, a heavy white loaded truck for weight
  gags, an excavator bucket. Same models every video.
- **Sky and weather as actors:** the reference shifts from blue sky with cumulus → grey
  overcast with rain streaks → white winter with falling snow → blue again. Weather is how
  failures arrive. Grade the sky with each failure; return to clear blue for the payoff.

### 2.3 Strict thermodynamic and physical colour coding

| Category | Colour / treatment |
|---|---|
| Geology | Rich brown dirt cross-sections with visible texture and particle detail |
| Steel | Steel-grey rebar cages and steel elements |
| Concrete | Matte medium grey |
| Asphalt | Dark matte black |
| Heat flow | Wavy, glowing **orange** arrows |
| Weight / pressure that harms | Descending **red** (red-orange) force-vector arrows |
| Weight that is being spread or handled safely | Descending **white** arrows (reference 0:09) |
| Temperature | Floating temperature badges that tick (e.g. 95°F → 72°F) |
| Water and fluids | Clear **blue** liquid streams with visible surface highlights |
| Airflow / cold | Crisp **blue** airflow arrows |
| Moisture | White floating mist / condensation particles |
| Constriction cold | Ice-cold white spray bursts at constriction points |
| Seepage | **Blue** droplets and paths winding down through soil and stone voids; the soaked layer darkens with a blue tint (reference 0:21–0:24) |
| Surface water flow | Shallow clear-blue sheet with **white flow arrows** on its surface (reference 0:29–0:31) |
| Ice | A **white lens** that grows inside a void and bulges the layer above (reference 0:44–0:47) |
| Voids / hollows | A **black-rimmed empty cavity** in the cutaway (reference 0:48–0:50) |
| Electricity | Small **yellow lightning-bolt** icons travelling along power lines |

### 2.4 Visual metaphors and practical gags

Translate abstract concepts into funny, memorable, physically exaggerated 3D. **Not
cartoonish** — photoreal materials and lighting with exaggerated physics.

From the reference: round stones behaving like **marbles**, rolling and shifting out from
under the truck's tires; **ice bubbles** expanding in asphalt micro-cracks and pushing the
road up from underneath to form a pothole; crushed rock **raining from the sky** onto the
road bed; the truck's wheels **sinking to the axles** in mud.

From the brief: an empty concrete pool shell **bobbing up out of the dirt like a ship**; a
living-room floor **sprouting green lily pads** and turning into a swamp as humidity builds.

Rule: every failure beat gets one physical gag; fixes are shown straight.

---

## 3. Camera direction and cinematography

Every beat in a blueprint states its camera move explicitly.

- **One continuous camera (measured).** The reference has **no hard cuts**. Changes happen
  in-frame — layers fall, pour, roll and dig while the camera glides. When a transition is
  needed, a vehicle passes through the lens (reference 0:33.5–0:35.0) or the camera
  pushes through a surface. Default to no cuts.
- **Home position (measured):** low, centred, looking straight down the build (down the road,
  along the stream) with the cutaway filling the lower half. The camera leaves home for a
  move and comes back.
- **Macro-to-micro focus zooms.** Whenever a failure or fix happens at a small scale, the
  camera pushes straight into that point of the cutaway: water seeping between soil
  particles, a crack forming in asphalt and water entering it, concrete flowing around a
  rebar cage. Pull back out to home before the next beat.
- **Tracking rigs and panning.** Smooth forward tracking that moves with objects to keep
  momentum: following a pickup down the road (behind or alongside), following water down a
  spillway, a dump truck approaching the site.
- **Shallow depth of field.** When focusing on foreground mechanical components, blur the
  background slightly. Cutaway elements in focus are sharp; everything above ground or
  further away is softly blurred.

---

## 4. Pacing, text and sound

### 4.1 Attention resets

A new problem, physical reaction or mechanical upgrade happens **every 3–5 s, never
longer**. The reference averages a new visual event every **2–4 s**. Any narration line over
4 s gets a mid-line visual event. No shot lingers.

### 4.2 Central kinetic typography

- **Word by word, not sentence by sentence.** One word on screen at a time, replaced by the
  next word exactly as the voiceover speaks it. Each word holds until the next one starts
  (no blank gaps mid-sentence).
- **Style (measured):** large, bold, heavy rounded sans; **Title Case on every word**; white
  fill; subtle thin black outline plus soft drop shadow.
- **Position:** horizontally centred, at **~48 % of frame height** — on the horizon line,
  just above the cutaway. This is inside TikTok's safe zone (see
  [`03-technical-spec.md`](03-technical-spec.md)).
- **Stat callout:** the myth-buster number appears as a separate layer **above** the word
  caption (~42 % height) in **yellow/gold all caps** with an "=" prefix ("= 9,600 CARS"),
  held for ~2 s while the word captions keep running under it. Only the myth-buster gets one.
- No other on-screen labels. The Name beats are spoken, not captioned as labels.

### 4.3 Voice

Deadpan delivery, even pitch, no dramatic inflection, a short breath (~0.2 s) between
sentences. "Congratulations" gets no lift.

**Pace:** the channel default is **~2.8 words per second**, which is what makes 110–130 words
fill 40–50 s. The reference reads much faster, at ~3.9 words per second. At that pace 130
words lasts only ~33 s, so match the reference's speed only together with a bigger word
budget (~160–190 words for 40–50 s).

### 4.4 Synchronized audio triggers

Every visual event gets an explicit sound effect cue in the blueprint. Standard library:

| Event | Sound |
|---|---|
| Concrete spraying / pouring | Wet, forceful whoosh |
| Water siphoning / gulping / draining | Glug-glug liquid sound |
| Steamroller compacting rocks | Deep, heavy rumble with crunching |
| Compressor pistons | Steady mechanical thrum |
| Steel pile driving | Sharp metallic impacts |
| Asphalt application | Hot sizzle + steam hiss |
| Truck driving | Engine + tire roar |

Extend the library per topic (rain, thunder, ice creak, drill whine, electrical hum) and keep
any music bed well under the voice.

---

## 5. Deliverable spec

For every topic the deliverable is:

### A. Voiceover script
- **Length: 40–50 s, ~110–130 words.**
- **Must contain:** Naive Hook → at least 2–3 Failure → Fix cycles → one Myth-buster →
  Finishing touches → signature closing line.
- **Tone:** deadpan, authoritative, conversational.

### B. Frame-by-frame 3D animation blueprint
A time-coded beat list that, for every line, specifies:
- the exact 3D cross-section cutaway assets shown
- thermodynamic colour codes used
- visual gags or metaphors
- macro-to-micro camera movements
- sound effect triggers
- on-screen kinetic typography

> **Platform note — length.** TikTok's Creator Rewards Program only pays on videos **longer
> than 1 minute** (see [`03-technical-spec.md`](03-technical-spec.md)). A 40–50 s cut earns
> nothing from Creator Rewards, though it works on YouTube Shorts. The road video itself runs
> 66 s. For TikTok, use an **extended cut of 62–70 s (~175–195 words at 2.8 words/sec,
> 4–5 cycles)**: the same rules with more cycles. The default stays 40–50 s until that's
> changed here.

---

## 6. Brand and originality guardrails

This account was already rejected once for unoriginal content
([`01-why-the-appeal-failed.md`](01-why-the-appeal-failed.md)). The *format* is free to use;
@youbuiltit's *identity* is not.

- **Sign:** the payoff sign uses this channel's own name — `[CHANNEL NAME] RD` /
  `[CHANNEL NAME] DAM` etc. Never "YOU BUILT IT".
- **Own assets:** your own house model, hero vehicle, low-poly trees and fence (section 2.2).
- **Opening frame:** same environment kit, but vary weather, time of day or camera height
  so no two videos open on an identical frame (TikTok flags identical template openers).
- **Your own words:** every script is written fresh. Never reuse reference narration lines.
- **AI label:** if any shot comes from an AI video tool, switch on TikTok's AI-generated
  content label.
- **Closing line:** "Congratulations, you have built a [subject]." is kept exactly as
  specified; it is @youbuiltit's signature line, so the visual identity around it has to be
  clearly yours.

---

## 7. Output template

Every topic is saved as `scripts/eng-NN-<slug>.md` with this layout:

```
# ENG-NN — How a [X] becomes a [Y]
Runtime · word count · words/sec · cycles · myth-buster position (%)

## A. Voiceover script
Plain lines, one beat per line, each tagged [HOOK] [FAIL n] [FIX n] [NOW] [NAME] [MYTH] [FINISH] [PAYOFF]

## Loop map
| Time | Beat | Failure / fix in five words |

## B. Frame-by-frame 3D animation blueprint
Environment kit and cutaway layers for this topic (once, at the top)
Then per beat:
### t_start–t_end · BEAT
VO: "…"
Captions: Word · By · Word
- Cutaway & assets
- Colour codes
- Gag / metaphor
- Camera
- SFX
- On-screen text
(sub-beats a/b/c with their own timestamps for any line over 4 s)

## Sources
Myth-buster number and any engineering claim that needs one
```

---

## 8. Pre-delivery checklist

- [ ] Opens with "If you … , you have a [subject]." and the naive version is shown in use
- [ ] ≥ 2–3 full Failure → Fix cycles; every failure starts with "But", every fix with "So you"
- [ ] Every failure names its physical cause and consequence
- [ ] ≥ 1 Name beat (≥ 2 in a 60 s+ cut), real engineering terms in the fix lines
- [ ] The loop closes on a fix
- [ ] Exactly one myth-buster, at 65–85 % of runtime, with a precise on-screen number and a source
- [ ] Finishing touches with "Add …", then "Congratulations, you have built a [subject]."
- [ ] 110–130 words, 40–50 s at ~2.8 words/sec (or the extended cut)
- [ ] Deadpan: no exclamation marks, no questions, no hype words
- [ ] Cutaway present in every beat, with the layer list stated
- [ ] A new visual event at least every 3–5 s; mid-line events on any line over 4 s
- [ ] Camera move, SFX and colour codes stated for every beat
- [ ] Captions word by word, Title Case, centred at ~48 % height
- [ ] Sign uses this channel's name, not "YOU BUILT IT"
