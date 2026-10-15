# Script 04 — "Your Punch Isn't Over"

**Theme:** returning the hand after a punch · script #5 from [`scripts/03-five-boxing-scripts.md`](03-five-boxing-scripts.md)
**Target length:** 68.6s (66.6s voice + 2s silent hold) · **Words:** 150 · **Scenes:** 20 · **Average scene:** 3.4s
**Format:** 9:16 vertical, 1080×1920, full bleed
**Copy-paste pack:** [`prompts/04-your-punch-isnt-over.txt`](../prompts/04-your-punch-isnt-over.txt)

---

## The idea

Everyone trains the punch going out. Almost nobody trains it coming back, and the gap while the
hand is out there is where counters land. The video reframes the punch as a round trip, gives one
counting drill, and ends on a mirrored line: *"Anyone can throw a punch out. / Fighters bring it home."*

**The return:** scene 1 and scene 20 use the same frame. In scene 1, the jab lands and a red target
ring appears on the puncher's *own* chin. In scene 20, the glove is already home and the opponent's
counter hits empty air.

---

## Script

Blank line = 0.5s breath. The last blank line (before "Fighters bring it home.") = 1.0s.

```
[HOOK] Your punch isn't over when it lands.
[HOOK] It's over when your hand is home.

[PROBLEM] You throw the jab. It connects.
[PROBLEM] For half a second, you watch it.
[PROBLEM] Your hand hangs out there. Your chin is open.
[PROBLEM] That half second is the counter's window. [FACT]

[REFRAME] The return is the other half of the punch.
[REFRAME] Most people only train the way out.

[REFRAME] Watch skilled fighters in slow motion.
[REFRAME] The hand snaps back as fast as it went. [FACT]
[REFRAME] Same path. Same speed. Back to the chin.

[TURN] Here's how you train it.
[TURN] Make the return the part you focus on.
[TURN] On the bag, touch and snap back.

[TURN] Count "one" on the way out. "Two" on the way home.
[TURN] If "two" comes late, you're still admiring it.
[TURN] Rear hand stays glued to your chin. [FACT]

[LANDING] After every combination, move your head.
[LANDING] Hand home. Head off the line.

[LANDING] Anyone can throw a punch out.

[LANDING] Fighters bring it home.
```

### Word count / length

| | |
|---|---|
| Words | **150** (target 150–175) |
| Speech at 145 wpm | 62.1s |
| Breaths | 7 × 0.5s + 1 × 1.0s = 4.5s |
| Voice ends | **66.6s** |
| Silent hold + end card | 2.0s |
| **Total** | **68.6s** (inside 60–75, above the 60s Creator Rewards line) |

If the voice comes in short (under 64s), slow the speed setting rather than adding words. Never
export under 65s.

### Fact check

| Line | Claim | Status | What to do |
|---|---|---|---|
| 6 | "That half second is the counter's window." | **Figure of speech, not a measurement.** That a hand left extended opens you to a counter is coaching consensus. | Keep it in the voice. Never put "0.5s" on screen. |
| 10 | "The hand snaps back as fast as it went." | **Coaching ideal, not a measurement.** "Return at least as fast as you throw" is a standard cue. | Kept. On screen, the label says "SAME SPEED" with no numbers. |
| 17 | "Rear hand stays glued to your chin." | **Standard guard coaching.** | Kept |
| 9 | "Watch skilled fighters in slow motion." | Advice, not a claim. No fighter is named. | Kept |

No real fighters named, no statistics, no links.

### ElevenLabs settings

| Setting | Value |
|---|---|
| Model | Eleven Multilingual v2 (supports `<break>` tags) |
| Voice | Calm, low-to-mid, dry. A coach talking to one person. |
| Stability | 55% |
| Similarity | 75% |
| Style exaggeration | 0–10% |
| Speaker boost | On |
| Speed | 0.95 (aim for ~145 wpm) |
| Pauses | `<break time="0.5s" />` at each blank line, `<break time="1.0s" />` before "Fighters bring it home." |
| Delivery note | Say "one" and "two" plainly, like counting reps, not shouted. |

### Emotion-phase map

| Phase | Time | Emotion | Palette | Scenes |
|---|---|---|---|---|
| HOOK | 0.0–6.0s | "Wait, what?" | Noir Intensity | 1–2 |
| PROBLEM | 6.0–18.5s | Exposed, caught out | Sepia Legend | 3–6 |
| REFRAME | 18.5–35.7s | Curiosity → clarity | Navy Precision | 7–11 |
| TURN | 35.7–55.7s | Focus, a little humor (mirror, glue) | Navy Precision | 12–16 |
| LANDING | 55.7–68.6s | Confidence → calm | Vibrant Explainer → Noir callback | 17–20 |

---

## Scene-by-scene production plan

**How to read this:**
- **Word cards** are the two-line headlines you add in CapCut. The first line is white and the
  **second line is the accent color**. Place them 12–30% from the top. Timings are planned at
  145 wpm, so re-snap them to the real audio.
- **Kicker** is the small label above the headline. It changes once per phase.
- **Label** is a small diagram tag placed next to the thing it names, added in the editor.
  Scene 14's "1" and "2" go here too, never in the AI prompt.
- Generate the **image first**, then animate it with the **motion prompt** (image-to-video).
  Make 3 takes of each and keep the best.

### Scene 1: 0.0–2.9s (2.9s)

| | |
|---|---|
| **Cast** | Person |
| **Phase** | HOOK: Noir Intensity |
| **Shot** | Close-up, side profile |
| **Surprise** | The jab lands, and a small red target ring appears on the puncher's own exposed chin. The danger is on them, not the opponent. |
| **Spoken** | “Your punch isn't over when it lands.” |
| **Kicker** | `▪ THE RETURN` |
| **Word cards** | `0.0–2.9` YOUR PUNCH ISN'T OVER / **WHEN IT LANDS.** |
| **Generate** | 5s clip, trim to 2.9s |
| **Transition in** | None (opening frame) |
| **SFX** | Glove pop + low warning tone |
| **Label** | OPEN (at the chin) |
| **Note** | Matched pair with scene 20. Same framing, same seed. Generate them back to back. |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Close-up side profile of a faceless demonstrator figure built from simple rounded flat shapes (plain round head with no face, capsule-shaped limbs), bone-white, its lead arm fully extended, the red glove landed on the head of a slate-grey faceless opponent at the right edge of frame. Its own chin is raised and exposed, and a small flat red target ring sits on it. Setting props: three taut ring ropes, a padded corner post, a hanging overhead ring lamp, a folded towel draped on the top rope. Light: a single hard overhead spotlight cone from above, deep shadow everywhere else. Color: Noir Intensity palette, near-black charcoal background (#141416), bone-white figure (#E6DFD1), signal-red gloves (#E63B2E), slate-grey opponent (#4A4D55). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The jab lands and the small red target ring appears on the puncher's own chin, completing within the first second, then everything holds still. Background loops only: the overhead lamp sways very slightly on its cable; dust specks drift down through the light cone; the towel edge ripples gently. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 2: 2.9–6.0s (3.1s)

| | |
|---|---|
| **Cast** | Anthropomorphic object |
| **Phase** | HOOK: Noir Intensity |
| **Shot** | Medium |
| **Surprise** | The boomerang lands perfectly in its own wall bracket, shaped like a tiny house roof. |
| **Spoken** | “It's over when your hand is home.” |
| **Kicker** | `▪ THE RETURN` |
| **Word cards** | `2.9–5.8` IT'S OVER WHEN / **YOUR HAND IS HOME.** |
| **Generate** | 5s clip, trim to 3.1s |
| **Transition in** | Hard cut |
| **SFX** | Whirr + satisfying wooden click |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Medium shot of an anthropomorphic wooden boomerang with two tiny red boxing gloves, arcing back through the air and settling neatly into a small wall bracket shaped like a little house roof. A faint flat red arc shows the path it flew out and back. Setting props: the wooden wall bracket, a coiled jump rope hanging on a nail, a corner stool, a water bottle. Light: a single narrow overhead spotlight with a hard edge, dark surroundings. Color: Noir Intensity palette, near-black charcoal background (#141416), bone-white figure (#E6DFD1), signal-red gloves (#E63B2E), slate-grey opponent (#4A4D55). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The boomerang completes its arc and clicks into the bracket, completing within the first second, then everything holds still. Background loops only: the jump rope sways slightly on its nail; dust drifts in the spotlight; the faint red arc fades softly. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 3: 6.0–8.8s (2.7s)

| | |
|---|---|
| **Cast** | Person |
| **Phase** | PROBLEM: Sepia Legend |
| **Shot** | Wide, side view |
| **Surprise** | A flat burst of amber dust puffs off the opponent's guard on contact and hangs in the air. |
| **Spoken** | “You throw the jab. It connects.” |
| **Kicker** | `▪ THE GAP` |
| **Word cards** | `6.3–8.8` YOU THROW THE JAB. / **IT CONNECTS.** |
| **Generate** | 5s clip, trim to 2.7s |
| **Transition in** | Hard cut |
| **SFX** | Clean leather pop |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Wide side view of a faceless demonstrator figure built from simple rounded flat shapes (plain round head with no face, capsule-shaped limbs), parchment-colored with rust-red gloves, throwing a straight jab that connects with an umber-brown faceless opponent's raised guard, a flat burst of amber dust puffing off the point of contact. Setting props: a worn ring canvas, ring ropes, a wooden corner stool, a tin bucket. Light: warm low sunlight from a high window on the left, long shadows across the canvas. Color: Sepia Legend palette, dark umber background (#2A1F17), parchment figure (#D8C3A0), burnt-amber light (#C27C2C), rust-red gloves (#8E3B22), umber-brown opponent (#5A4232). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The jab extends and connects, and the amber dust burst puffs out, completing within the first second, then everything holds still. Background loops only: the dust burst drifts and settles slowly; ring ropes vibrate faintly; motes float in the window light. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 4: 8.8–11.7s (2.9s)

| | |
|---|---|
| **Cast** | Crowd-silhouette |
| **Phase** | PROBLEM: Sepia Legend |
| **Shot** | Extreme wide, high angle |
| **Surprise** | Every silhouette in the stands leans in to admire the extended arm, and so does the puncher's own shadow. |
| **Spoken** | “For half a second, you watch it.” |
| **Kicker** | `▪ THE GAP` |
| **Word cards** | `8.8–11.7` FOR HALF A SECOND, / **YOU WATCH IT.** |
| **Generate** | 5s clip, trim to 2.9s |
| **Transition in** | Hard cut |
| **SFX** | Muffled crowd “ooh” fading out |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Extreme wide high-angle view of an old boxing hall: in the ring, a small parchment-colored figure holds a jab fully extended, and rows of faceless umber-brown silhouettes in the stands all lean forward toward the extended arm as if admiring it. The puncher's long shadow on the canvas points toward its own glove. Setting props: wooden bleachers, a ring with four corner posts, hanging ceiling lamps, a folded towel on the ring apron. Light: warm overhead lamps over the ring, the stands in amber dusk. Color: Sepia Legend palette, dark umber background (#2A1F17), parchment figure (#D8C3A0), burnt-amber light (#C27C2C), rust-red gloves (#8E3B22), umber-brown opponent (#5A4232). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. All the silhouettes in the stands lean forward together toward the extended arm, completing within the first second, then everything holds still. Background loops only: ceiling lamps sway slightly; dust drifts through the lamp light; the towel edge ripples. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 5: 11.7–15.4s (3.7s)

| | |
|---|---|
| **Cast** | Person |
| **Phase** | PROBLEM: Sepia Legend |
| **Shot** | Extreme close-up |
| **Surprise** | A flat rust-red wedge of empty space fills the gap between the hanging arm and the exposed chin. |
| **Spoken** | “Your hand hangs out there. Your chin is open.” |
| **Kicker** | `▪ THE GAP` |
| **Word cards** | `11.7–15.4` YOUR HAND HANGS OUT THERE. / **YOUR CHIN IS OPEN.** |
| **Generate** | 5s clip, trim to 3.7s |
| **Transition in** | Hard cut |
| **SFX** | Low rising tone |
| **Label** | OPEN (in the wedge) |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Extreme close-up of a parchment-colored faceless figure's extended lead arm and its chin: the arm hangs out at full length, the chin is raised and unguarded, and a flat rust-red wedge shape fills the open gap between the arm and the chin. Setting props: the glove cuff, a hand-wrap at the wrist, simplified ring-rope shapes behind, the edge of a corner pad. Light: warm hard light from the upper left, deep umber shadows. Color: Sepia Legend palette, dark umber background (#2A1F17), parchment figure (#D8C3A0), burnt-amber light (#C27C2C), rust-red gloves (#8E3B22), umber-brown opponent (#5A4232). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The rust-red wedge slowly widens into the gap between arm and chin, completing within the first second, then everything holds still. Background loops only: ring ropes behind sway faintly; the wedge pulses softly; tiny dust specks drift. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 6: 15.4–18.5s (3.1s)

| | |
|---|---|
| **Cast** | Abstract-concept |
| **Phase** | PROBLEM: Sepia Legend |
| **Shot** | Medium flat graphic |
| **Surprise** | A narrow window in a dark wall swings open for an instant, and a glove is already flying through it. |
| **Spoken** | “That half second is the counter's window.” |
| **Kicker** | `▪ THE GAP` |
| **Word cards** | `15.4–18.3` THAT HALF SECOND IS / **THE COUNTER'S WINDOW.** |
| **Generate** | 5s clip, trim to 3.1s |
| **Transition in** | Hard cut |
| **SFX** | Shutter bang + whoosh |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Medium flat graphic of a tall dark umber wall with one narrow window: its two shutters swing open and a rust-red glove shape flies through the opening, warm amber light spilling in behind it. Setting props: the narrow window, two wooden shutters, a window latch, a small sill. Light: warm amber light pouring through the open window, the rest of the wall in shadow. Color: Sepia Legend palette, dark umber background (#2A1F17), parchment figure (#D8C3A0), burnt-amber light (#C27C2C), rust-red gloves (#8E3B22), umber-brown opponent (#5A4232). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The shutters swing open and the rust-red glove shape flies through the gap, completing within the first second, then everything holds still. Background loops only: the shutters drift gently on their hinges; the amber light pool breathes softly; dust floats in the light shaft. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 7: 18.5–22.5s (4.0s)

| | |
|---|---|
| **Cast** | Person |
| **Phase** | REFRAME: Navy Precision |
| **Shot** | Medium-wide, three-quarter view |
| **Surprise** | The punch path is drawn as one closed cyan loop, out and back, not a straight line. |
| **Spoken** | “The return is the other half of the punch.” |
| **Kicker** | `▪ THE OTHER HALF` |
| **Word cards** | `18.8–22.5` THE RETURN IS / **THE OTHER HALF OF THE PUNCH.** |
| **Generate** | 5s clip, trim to 4.0s |
| **Transition in** | WHIP (1 of 3), into the reframe |
| **SFX** | Soft whoosh + chime |
| **Label** | OUT (on the ghost arm) + BACK (on the returning arm) |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Medium-wide three-quarter view of a faceless demonstrator figure built from simple rounded flat shapes (plain round head with no face, capsule-shaped limbs), cool-white with red gloves: a translucent steel-blue ghost of its lead arm at full extension, and the solid arm already returning to the chin, joined by a single closed cyan loop that traces the punch out and back. Setting props: a hanging heavy bag, a training floor with a painted line, a wall-mounted speed-bag platform, a folded skipping rope. Light: cool overhead panel light, crisp flat shadow beneath the feet. Color: Navy Precision palette, deep navy background (#0F1B2D), cool-white figure (#E3E9F0), steel-blue opponent and shapes (#3C5A7A), cyan cue accent (#3FD0E0), signal-red gloves (#E63B2E). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The arm returns to the chin as the cyan loop draws itself closed, completing within the first second, then everything holds still. Background loops only: the heavy bag sways slowly; the cyan loop glows softly; dust drifts in the overhead light. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 8: 22.5–25.7s (3.1s)

| | |
|---|---|
| **Cast** | Crowd-silhouette |
| **Phase** | REFRAME: Navy Precision |
| **Shot** | Wide, frontal |
| **Surprise** | A whole row of figures holds their arms out in their bags like a line of signposts. Not one comes back. |
| **Spoken** | “Most people only train the way out.” |
| **Kicker** | `▪ THE OTHER HALF` |
| **Word cards** | `22.5–25.4` MOST PEOPLE ONLY TRAIN / **THE WAY OUT.** |
| **Generate** | 5s clip, trim to 3.1s |
| **Transition in** | Hard cut |
| **SFX** | Six bag thuds in unison |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Wide frontal view of a training hall with a row of six faceless steel-blue silhouette figures at six heavy bags, every one with its lead arm fully extended into its bag and none returning, like a row of signposts. Setting props: six hanging heavy bags, a long mirror wall, floor tape marks, gloves hanging on pegs. Light: cool overhead strip lights. Color: Navy Precision palette, deep navy background (#0F1B2D), cool-white figure (#E3E9F0), steel-blue opponent and shapes (#3C5A7A), cyan cue accent (#3FD0E0), signal-red gloves (#E63B2E). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. All six arms punch out into the bags together and stay extended, completing within the first second, then everything holds still. Background loops only: the bags sway faintly from the impacts; hanging gloves swing slightly on their pegs; dust drifts under the strip lights. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 9: 25.7–28.4s (2.7s)

| | |
|---|---|
| **Cast** | Anthropomorphic object |
| **Phase** | REFRAME: Navy Precision |
| **Shot** | Medium |
| **Surprise** | The glove on the projected image is already halfway home while the reel barely turns. |
| **Spoken** | “Watch skilled fighters in slow motion.” |
| **Kicker** | `▪ THE OTHER HALF` |
| **Word cards** | `25.9–28.4` WATCH SKILLED FIGHTERS / **IN SLOW MOTION.** |
| **Generate** | 5s clip, trim to 2.7s |
| **Transition in** | Hard cut |
| **SFX** | Projector clatter, slowed down |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Medium shot of an anthropomorphic vintage film projector with two tiny red boxing gloves, sitting on a small table, its reel turning very slowly and projecting a cool beam onto a wall where a flat silhouette of a glove is shown halfway back to a chin. Setting props: the film projector, a film reel, a small wooden table, a folding chair. Light: the projector beam is the main light, cool cyan, the room in deep navy. Color: Navy Precision palette, deep navy background (#0F1B2D), cool-white figure (#E3E9F0), steel-blue opponent and shapes (#3C5A7A), cyan cue accent (#3FD0E0), signal-red gloves (#E63B2E). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The reel turns slowly and the projected glove slides back toward the chin, completing within the first second, then everything holds still. Background loops only: dust drifts through the projector beam; the reel turns slowly; the folding chair's shadow shifts slightly. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 10: 28.4–32.1s (3.7s)

| | |
|---|---|
| **Cast** | Person |
| **Phase** | REFRAME: Navy Precision |
| **Shot** | Medium close-up, side view |
| **Surprise** | Two identical cyan speed streaks point in opposite directions, out and back, like a mirror image. |
| **Spoken** | “The hand snaps back as fast as it went.” |
| **Kicker** | `▪ THE OTHER HALF` |
| **Word cards** | `28.4–32.1` THE HAND SNAPS BACK / **AS FAST AS IT WENT.** |
| **Generate** | 5s clip, trim to 3.7s |
| **Transition in** | Hard cut |
| **SFX** | Two matching whips, out and back |
| **Label** | SAME SPEED (between the streaks) |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Medium close-up side view of a faceless demonstrator figure built from simple rounded flat shapes (plain round head with no face, capsule-shaped limbs), cool-white, its lead red glove snapping back to the chin. Two identical flat cyan speed streaks run along the arm's path, one pointing out and one pointing back, exactly the same length. Setting props: ring ropes, a padded corner post, a towel on the top rope, a water bottle on the ring apron. Light: cool key light from the right, flat steel-blue shadow on the left. Color: Navy Precision palette, deep navy background (#0F1B2D), cool-white figure (#E3E9F0), steel-blue opponent and shapes (#3C5A7A), cyan cue accent (#3FD0E0), signal-red gloves (#E63B2E). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The glove snaps back to the chin and the return streak appears, matching the outgoing one, completing within the first second, then everything holds still. Background loops only: ring ropes sway faintly; both streaks glow softly; dust drifts. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 11: 32.1–35.7s (3.6s)

| | |
|---|---|
| **Cast** | Abstract-concept |
| **Phase** | REFRAME: Navy Precision |
| **Shot** | Top-down flat graphic |
| **Surprise** | The dot goes out and back in the exact same groove and settles into its starting socket without leaving a new mark. |
| **Spoken** | “Same path. Same speed. Back to the chin.” |
| **Kicker** | `▪ THE OTHER HALF` |
| **Word cards** | `32.1–35.4` SAME PATH. SAME SPEED. / **BACK TO THE CHIN.** |
| **Generate** | 5s clip, trim to 3.6s |
| **Transition in** | Hard cut |
| **SFX** | Tick-tock click |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Top-down flat graphic on a deep navy grid: a single straight vertical groove with a round socket at the bottom. A cool-white dot travels up the groove to a cyan mark and back down into the socket along the exact same path. Setting props: the groove, the round socket, a cyan turnaround mark, faint steel-blue grid squares. Light: flat even ambient light, a soft cyan glow around the socket. Color: Navy Precision palette, deep navy background (#0F1B2D), cool-white figure (#E3E9F0), steel-blue opponent and shapes (#3C5A7A), cyan cue accent (#3FD0E0), signal-red gloves (#E63B2E). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The dot travels up the groove and back down into its socket, completing within the first second, then everything holds still. Background loops only: grid lines pulse very softly; the socket glow breathes; tiny particles drift upward. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 12: 35.7–41.3s (5.6s)

| | |
|---|---|
| **Cast** | Person |
| **Phase** | TURN: Navy Precision |
| **Shot** | Wide |
| **Surprise** | A spotlight beam follows only the returning hand. The heavy bag stays dark. |
| **Spoken** | “Here's how you train it. Make the return the part you focus on.” |
| **Kicker** | `▪ THE DRILL` |
| **Word cards** | `35.9–38.0` HERE'S HOW / **YOU TRAIN IT.**<br>`38.0–41.3` MAKE THE RETURN / **THE PART YOU FOCUS ON.** |
| **Generate** | 10s clip (or 5s + freeze the last frame), trim to 5.6s |
| **Transition in** | WHIP (2 of 3), into the turn |
| **SFX** | Spotlight clunk |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Wide shot of a dark training room: a faceless demonstrator figure built from simple rounded flat shapes (plain round head with no face, capsule-shaped limbs), cool-white, at a heavy bag, its lead red glove returning to its chin. A narrow cyan spotlight beam from above lights only the returning glove, while the heavy bag stays in shadow. Setting props: a hanging heavy bag on a chain, a wall-mounted spotlight, a bench, a pair of hand-wraps on the bench. Light: a single narrow cyan spotlight from above tracking the glove, everything else dark navy. Color: Navy Precision palette, deep navy background (#0F1B2D), cool-white figure (#E3E9F0), steel-blue opponent and shapes (#3C5A7A), cyan cue accent (#3FD0E0), signal-red gloves (#E63B2E). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The glove returns to the chin and the spotlight beam follows it home, completing within the first second, then everything holds still. Background loops only: the heavy bag sways slowly in shadow; dust drifts in the spotlight beam; the bag's chain sways. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 13: 41.3–44.5s (3.1s)

| | |
|---|---|
| **Cast** | Anthropomorphic object |
| **Phase** | TURN: Navy Precision |
| **Shot** | Close-up |
| **Surprise** | The tape snaps all the way back into its case in an instant, and the case barely moves. |
| **Spoken** | “On the bag, touch and snap back.” |
| **Kicker** | `▪ THE DRILL` |
| **Word cards** | `41.3–44.2` ON THE BAG, / **TOUCH AND SNAP BACK.** |
| **Generate** | 5s clip, trim to 3.1s |
| **Transition in** | Hard cut |
| **SFX** | Tape-measure zip-snap |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Close-up of an anthropomorphic steel tape measure with two tiny red boxing gloves, its plain blank steel blade (no markings, no numbers) extended to touch the side of a heavy bag and snapping back into its case. Setting props: the tape measure, the heavy bag surface, a wooden workbench, a pencil. Light: cool overhead light, a cyan glint on the tape blade. Color: Navy Precision palette, deep navy background (#0F1B2D), cool-white figure (#E3E9F0), steel-blue opponent and shapes (#3C5A7A), cyan cue accent (#3FD0E0), signal-red gloves (#E63B2E). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The tape blade touches the bag and snaps back into the case, completing within the first second, then everything holds still. Background loops only: the heavy bag sways faintly; a cyan glint slides along the case; dust drifts. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 14: 44.5–49.3s (4.8s)

| | |
|---|---|
| **Cast** | Person |
| **Phase** | TURN: Navy Precision |
| **Shot** | Medium-wide, side view |
| **Surprise** | Two small glowing dots mark the turnaround point and home, and the glove touches both. |
| **Spoken** | “Count "one" on the way out. "Two" on the way home.” |
| **Kicker** | `▪ THE DRILL` |
| **Word cards** | `44.7–47.2` COUNT “ONE” / **ON THE WAY OUT.**<br>`47.2–49.3` “TWO” / **ON THE WAY HOME.** |
| **Generate** | 5s clip, trim to 4.8s |
| **Transition in** | Hard cut |
| **SFX** | Two soft beeps |
| **Label** | 1 (at the far dot) + 2 (at the chin dot) |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Medium-wide side view of a faceless demonstrator figure built from simple rounded flat shapes (plain round head with no face, capsule-shaped limbs), cool-white, jabbing at a heavy bag: one small glowing cyan dot floats at the arm's full extension and a second small glowing cyan dot sits at the chin, the red glove already back at the second dot. Setting props: a hanging heavy bag, a training floor with a painted line, a water bottle, a folded skipping rope. Light: cool overhead panel light. Color: Navy Precision palette, deep navy background (#0F1B2D), cool-white figure (#E3E9F0), steel-blue opponent and shapes (#3C5A7A), cyan cue accent (#3FD0E0), signal-red gloves (#E63B2E). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The glove touches the far dot and returns to the chin dot, completing within the first second, then everything holds still. Background loops only: the heavy bag sways slowly; both dots pulse gently; dust drifts. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 15: 49.3–52.6s (3.3s)

| | |
|---|---|
| **Cast** | Anthropomorphic object |
| **Phase** | TURN: Navy Precision |
| **Shot** | Medium |
| **Surprise** | The mirror is busy admiring its own extended glove while an opponent's glove creeps in from the edge. |
| **Spoken** | “If "two" comes late, you're still admiring it.” |
| **Kicker** | `▪ THE DRILL` |
| **Word cards** | `49.3–52.6` IF “TWO” COMES LATE, / **YOU'RE STILL ADMIRING IT.** |
| **Generate** | 5s clip, trim to 3.3s |
| **Transition in** | Hard cut |
| **SFX** | Vain little “ding”, then a thud |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Medium shot of an anthropomorphic oval hand mirror on a small stand, with two tiny red boxing gloves: one glove held out, its glass turned toward it in admiration, while a steel-blue glove shape creeps in from the right edge toward it. Setting props: the mirror on its stand, a dresser top, a comb, a small potted plant. Light: cool lamp light from the left, a soft cyan glint on the glass. Color: Navy Precision palette, deep navy background (#0F1B2D), cool-white figure (#E3E9F0), steel-blue opponent and shapes (#3C5A7A), cyan cue accent (#3FD0E0), signal-red gloves (#E63B2E). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The mirror tilts lovingly toward its extended glove as the steel-blue glove slides in from the edge, completing within the first second, then everything holds still. Background loops only: the plant's leaves sway faintly; the cyan glint slides slowly across the glass; dust drifts. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 16: 52.6–55.7s (3.1s)

| | |
|---|---|
| **Cast** | Person |
| **Phase** | TURN: Navy Precision |
| **Shot** | Close-up, front three-quarter |
| **Surprise** | A small flat drop of amber glue joins the rear glove to the jaw. |
| **Spoken** | “Rear hand stays glued to your chin.” |
| **Kicker** | `▪ THE DRILL` |
| **Word cards** | `52.6–55.5` REAR HAND STAYS / **GLUED TO YOUR CHIN.** |
| **Generate** | 5s clip, trim to 3.1s |
| **Transition in** | Hard cut |
| **SFX** | Light, comedic sticky squelch |
| **Label** | GLUED (at the glue drop) |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Close-up front three-quarter view of a faceless demonstrator figure built from simple rounded flat shapes (plain round head with no face, capsule-shaped limbs), cool-white, its rear red glove pressed against the side of its chin and joined to the jaw by a small flat honey-amber drop of glue, while its lead arm is just returning. Setting props: ring ropes, a corner pad, a towel on the top rope, a water bottle on the ring apron. Light: cool key light from the right. Color: Navy Precision palette, deep navy background (#0F1B2D), cool-white figure (#E3E9F0), steel-blue opponent and shapes (#3C5A7A), cyan cue accent (#3FD0E0), signal-red gloves (#E63B2E). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The lead arm returns while the rear glove stays stuck to the chin and the glue drop squishes slightly, completing within the first second, then everything holds still. Background loops only: ring ropes sway faintly; the glue drop glistens softly; dust drifts. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 17: 55.7–58.4s (2.7s)

| | |
|---|---|
| **Cast** | Crowd-silhouette |
| **Phase** | LANDING: Vibrant Explainer |
| **Shot** | Wide, frontal |
| **Surprise** | Every figure in the row finishes the combination and moves its head off the line at the same instant. |
| **Spoken** | “After every combination, move your head.” |
| **Kicker** | `▪ THE HABIT` |
| **Word cards** | `56.0–58.4` AFTER EVERY COMBINATION, / **MOVE YOUR HEAD.** |
| **Generate** | 5s clip, trim to 2.7s |
| **Transition in** | WHIP (3 of 3), into the landing |
| **SFX** | One unison swish |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Wide frontal view of a bright training room with a row of six faceless charcoal silhouette figures, all finishing a combination with hands back at their chins and heads shifted off the line in perfect unison. A thin lime vertical line marks the centerline each head has just left. Setting props: heavy bags hanging behind them, a long mirror wall, floor tape marks, a bench with water bottles. Light: bright warm daylight from large windows on the left. Color: Vibrant Explainer palette, warm sand background (#F3E9D2), charcoal figure (#2B2B2E), mid-grey partner (#8C8A86), coral-red gloves (#FF5A45), lime accent (#9BE15D), sunny-yellow accent (#FFC93C). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. All six bring their hands home and shift their heads off the line together, completing within the first second, then everything holds still. Background loops only: heavy bags sway; sunbeams shift slightly; dust motes drift. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 18: 58.4–61.2s (2.7s)

| | |
|---|---|
| **Cast** | Person |
| **Phase** | LANDING: Vibrant Explainer |
| **Shot** | Overhead top-down |
| **Surprise** | The opponent's counter goes straight through a faint yellow ghost circle where the head used to be. |
| **Spoken** | “Hand home. Head off the line.” |
| **Kicker** | `▪ THE HABIT` |
| **Word cards** | `58.4–60.9` HAND HOME. / **HEAD OFF THE LINE.** |
| **Generate** | 5s clip, trim to 2.7s |
| **Transition in** | Hard cut |
| **SFX** | Whoosh past |
| **Label** | WHERE YOUR HEAD WAS (at the ghost circle) |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Overhead top-down view inside a bright boxing ring: a faceless demonstrator figure built from simple rounded flat shapes (plain round head with no face, capsule-shaped limbs), charcoal with coral-red gloves, seen from above with both gloves back at its chin and its head shifted off the centerline. A mid-grey opponent's counter extends through a faint yellow ghost circle that marks where the head used to be. Setting props: four corner posts, ring ropes on each side, a square canvas, two stools in opposite corners. Light: bright even daylight from above, short shadows beneath the figures. Color: Vibrant Explainer palette, warm sand background (#F3E9D2), charcoal figure (#2B2B2E), mid-grey partner (#8C8A86), coral-red gloves (#FF5A45), lime accent (#9BE15D), sunny-yellow accent (#FFC93C). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The opponent's counter extends through the empty ghost circle, completing within the first second, then everything holds still. Background loops only: ring ropes vibrate slightly; the ghost circle fades softly in and out; dust drifts across the canvas. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 19: 61.2–64.4s (3.2s)

| | |
|---|---|
| **Cast** | Abstract-concept |
| **Phase** | LANDING: Vibrant Explainer |
| **Shot** | Flat graphic, wide |
| **Surprise** | Among dozens of arrows pointing outward, one single arrow curves around and points back to the center. |
| **Spoken** | “Anyone can throw a punch out.” |
| **Kicker** | `▪ THE HABIT` |
| **Word cards** | `61.4–63.9` ANYONE CAN THROW / **A PUNCH OUT.** |
| **Generate** | 5s clip, trim to 3.2s |
| **Transition in** | Hard cut |
| **SFX** | Scatter whoosh + soft chime |
| **Label** | None |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Flat graphic on warm sand: dozens of identical coral-red arrows scattered around a small charcoal center circle, all pointing outward and away from it, and one single lime arrow curving around to point back into the center. Setting props: the coral arrows, the lime arrow, the charcoal center circle, a few small yellow dots. Light: flat even daylight, a soft yellow glow around the lime arrow. Color: Vibrant Explainer palette, warm sand background (#F3E9D2), charcoal figure (#2B2B2E), mid-grey partner (#8C8A86), coral-red gloves (#FF5A45), lime accent (#9BE15D), sunny-yellow accent (#FFC93C). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The coral arrows shoot outward and the lime arrow curves back into the center, completing within the first second, then everything holds still. Background loops only: the yellow dots pulse gently; the lime arrow glows softly; tiny particles drift. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

### Scene 20: 64.4–68.6s (4.2s)

| | |
|---|---|
| **Cast** | Person |
| **Phase** | LANDING: Noir Intensity |
| **Shot** | Close-up, side profile (same framing as scene 1) |
| **Surprise** | The return: same frame as the opening, but the glove is already home and the counter hits empty air. |
| **Spoken** | “Fighters bring it home.” |
| **Kicker** | `▪ THE HABIT` |
| **Word cards** | `64.9–66.6` FIGHTERS / **BRING IT HOME.**<br>`66.6–68.6` DO YOU LEAVE YOUR JAB OUT? / **COMMENT IT.** *(no voice, end card)* |
| **Generate** | 5s clip, trim to 4.2s |
| **Transition in** | Hard cut |
| **SFX** | Counter whiffs; one ring-bell ding on the last frame |
| **Label** | HOME (at the glove) |
| **Note** | Matched pair with scene 1. Same seed, same framing. Hold the final frame 2s after the voice ends. |

**IMAGE PROMPT**
```
Flat 2D vector illustration, solid flat color shapes, no outlines, simple geometric forms, soft flat shadow shapes, clean minimal motion-graphics look. Close-up side profile, identical framing to the opening shot: a faceless demonstrator figure built from simple rounded flat shapes (plain round head with no face, capsule-shaped limbs), bone-white, its lead red glove already back at its chin, chin tucked, head slightly off the line. A slate-grey opponent's counter from the right edge passes through the empty space where the chin used to be. Setting props: three taut ring ropes, a padded corner post, a hanging overhead ring lamp, a folded towel draped on the top rope. Light: a single hard overhead spotlight cone from above, deep shadow everywhere else. Color: Noir Intensity palette, near-black charcoal background (#141416), bone-white figure (#E6DFD1), signal-red gloves (#E63B2E), slate-grey opponent (#4A4D55). Vertical 9:16 composition, 1080x1920: main subject in the lower two-thirds, top third left as plain empty background for a headline added later.
```
**MOTION PROMPT**
```
Locked-off static camera, no camera movement. The opponent's counter passes through the empty space and stops while the figure stays tucked and still, completing within the first second, then everything holds still. Background loops only: the overhead lamp sways very slightly on its cable; dust specks drift down through the light cone; the towel edge ripples gently. Calm, slow pace. No cuts or transitions inside the clip.
```
**NEGATIVE**
```
text, letters, numbers, words, captions, subtitles, watermark, logo, signature, 3D render, CGI, photorealistic, photo, outlines, line-art strokes, film grain, noise, texture, camera movement, zoom, pan, dolly, morphing, flicker, extra limbs, extra fingers, deformed hands, facial features, eyes, mouth, horizontal, landscape, letterbox, black bars, split screen
```

---

## Final craft check

| Rule | Result |
|---|---|
| 60–75s total | ✅ 68.6s |
| Aspect | ✅ 9:16 vertical (overrides the master prompt's 16:9, same as Script 02) |
| Faceless | ✅ Plain round heads, and `facial features, eyes, mouth` are in the negative |
| No recurring character | ⚠️ Same interpretation as Script 02: an anonymous demonstrator recolored by each palette. Only scenes 1 and 20 match on purpose. |
| No real named boxers, no app/bio links | ✅ The end card is a comment question |
| Flat 2D vector, no outlines / 3D / photorealism | ✅ |
| No text in AI generation | ✅ The tape measure's blade is specified blank. Scene 14's "1/2" and every word card go in the editor. |
| Palette matches emotion phase | ✅ Noir → Sepia → Navy → Navy → Vibrant → Noir callback |
| Cast rotates, no adjacent repeats | ✅ P · O · P · C · P · A · P · C · O · P · A · P · O · P · O · P · C · P · A · P |
| Unique surprise per scene | ✅ 20 different ones |
| 3–5 props per scene | ✅ 4 in every scene |
| Defined light source | ✅ Every scene |
| Shot scale varies | ✅ No two adjacent scenes share a scale |
| Locked camera, action in ~1s, then hold | ✅ |
| 2–3 background loops | ✅ 3 per scene |
| Negative prompt on every generation | ✅ |
| Hard cuts by default, max 2–3 whip/glitch | ✅ 3 whips (scenes 7, 12, 17), one at the start of each new phase |
| 150–175 words, lines 3–12 words | ✅ 150 words; shortest line 4, longest 11 |
| Hook 4–9 words, contradicts an assumption | ✅ 7 words |
| Fixed during the check | The tape measure's blade is specified "blank, no markings, no numbers" so the AI doesn't draw a ruler. Scene 12 merges two lines (5.6s), so generate 10s or 5s + freeze. |

## Before posting

- [ ] Turn on TikTok's **AI-generated content** label
- [ ] 1080×1920, 30 fps, no watermark (CapCut end card off)
- [ ] Between 65 and 75 seconds
- [ ] Headlines inside the safe zone: top 12%, bottom 20% and right 20% kept clear
- [ ] Caption: one real sentence, e.g. *"Nobody trains the way back."*, plus 3–5 hashtags (`#boxing #boxingtips #jab #boxingtechnique`)
