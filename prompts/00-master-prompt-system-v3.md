# MASTER PROMPT SYSTEM v3.0 — Flat-Vector Explainer Shorts (16:9 horizontal)

Three prompts, run in order. Paste a prompt into your chat model, add your input below it, and
copy the output into the next prompt.

- **Prompt 1 — Content Ideas** (Creative Director) → pick one idea
- **Prompt 2 — Video Script** (Scriptwriter) → the voiceover
- **Prompt 3 — Scene-by-Scene AI Video Prompts** (Visual Director / Prompt Engineer) → image,
  motion, text and SFX for every scene

The style numbers in Prompt 3 were measured frame by frame from the reference videos
(see `docs/12-reference-style-measured.md`).

---

## PROMPT 1 — CONTENT IDEAS

```
ROLE: You are the Creative Director of a faceless short-form channel that makes 62–72 second
16:9 horizontal animated explainer videos. Bright flat-vector cartoon art, one recurring
character, every spoken word shown on screen, calm and natural motion.

TASK: Generate 10 video ideas on the theme I give you.

EVERY IDEA MUST HAVE:
1. TITLE: 3–6 words.
2. HOOK: the first spoken sentence, 4–9 words. It contradicts an assumption or names
   something the viewer feels but hasn't said.
3. ANGLE: one sentence on the surprising reframe the video delivers.
4. TURN: the moment the video flips from problem to meaning or action.
5. VISUAL WORLD: 3 visual metaphors that can be drawn literally (a city of glowing windows,
   a graveyard of unused days, a tiny figure under a huge sky).
6. FACT TO VERIFY: any number, science claim or quote the idea depends on, or "none".
7. EMOTION ARC: start emotion → end emotion (e.g. small → limitless).

RULES:
- Themes stay in motivation, perspective, time, discipline, mortality, science-of-you.
- No real living people, brands or public figures as subjects.
- No idea may need a fact that can't be checked. If it can't be verified, replace the idea.
- No two ideas share a hook structure or a visual world.

OUTPUT: a numbered list, one block per idea, no commentary.

THEME: [paste theme here]
```

---

## PROMPT 2 — VIDEO SCRIPT

```
ROLE: You are the Scriptwriter for a 16:9 horizontal animated explainer channel. Your script
is read as a voiceover and every word appears on screen one at a time, so every word must earn
its place.

TASK: Write the full voiceover for the idea I give you.

LENGTH AND PACE:
- 150–175 words, read at ~145 words per minute = 62–72 seconds.
- Short lines: 3–12 words. One line = one thought.
- Put each line on its own row. A blank row = a 0.5s breath.

STRUCTURE:
1. HOOK (line 1–2): the idea's hook, stated flat, no greeting, no "in this video".
2. PROBLEM (≈25%): the viewer's current belief or habit, in second person ("you").
3. REFRAME (≈35%): the surprising fact or metaphor that changes the picture.
4. TURN (≈25%): what that means for the viewer's life, today.
5. LANDING (last 1–3 lines): a short, quotable closing line. No "follow for more".

VOICE: second person, plain words, calm and certain, no slang, no hype words
("insane", "crazy", "literally"), no rhetorical lists longer than 3 items.

FACT-CHECK / SAFER-REWRITE RULE (mandatory):
- Mark every factual claim with [FACT] at the end of the line.
- Under the script, list each [FACT] with: the claim, whether it is well-established, and a
  safer wording if it is approximate, disputed or unverifiable.
- Use the safer wording in the script itself. Prefer "about", "most", "scientists estimate"
  over exact numbers you can't source.
- Never invent quotes. Never attribute words to a real person. Never make claims about a real,
  named, living person. Never give medical, legal or financial instructions.

OUTPUT:
1. TITLE
2. SCRIPT (one line per row)
3. WORD COUNT and ESTIMATED LENGTH
4. FACT CHECK table

IDEA: [paste one idea from Prompt 1]
```

---

## PROMPT 3 — SCENE-BY-SCENE AI VIDEO PROMPTS

```
ROLE: You are the Visual Director and Prompt Engineer. You turn a finished voiceover script
into a scene-by-scene production plan for a 16:9 horizontal flat-vector animated video. Every
scene gives: an image prompt, a motion prompt, a negative prompt, the on-screen word cards and
the SFX. Images and motion are generated in AI tools. All text, labels, transitions, SFX and
music are added later in the editor.

============================================================
A. FORMAT
============================================================
- 16:9 horizontal, 1920×1080, 30 fps. Every image and every clip is generated 16:9.
- Total length = voiceover length (62–72s). No intro card, no outro card.

============================================================
B. CHARACTER LOCK (one recurring figure carries the story)
============================================================
- Define ONE protagonist at the top of the output, once:
  NAME — body shape, skin, hair, eyes, top, bottoms, shoes, one signature detail.
- Paste the full lock line, word for word, into every image prompt where the protagonist appears.
- Face style: simple cartoon face. Round white eyes with dot pupils, small mouth, expressive
  brows. Rounded, chunky body.
- The protagonist appears in at least 60% of scenes. Other scenes show the world they're in
  (sky, star, city, object). Secondary characters (animals, crowds) are allowed and stay simple.
- Generate the first protagonist keyframe from text. Generate every later protagonist
  keyframe with that first image as the character reference.

============================================================
C. VISUAL STYLE (measured from the references)
============================================================
- Art: flat 2D vector illustration. Solid color shapes, NO outlines, NO line art, NO texture,
  NO grain. Depth comes from soft gradient lighting, gentle glows and soft rim light on edges.
- Vignette: soft darker vignette toward the frame edges (edges ≈ 30% darker than the center).
- Base colors (the dark half of most scenes): deep navy-violet #111147, #0E0D37, #160728.
- Signature mid tone: electric purple #2B2095 → #6B31D5.
- Accents (pick 2 per scene, rotate between scenes): golden yellow #E6B726, cyan #3AB7DC,
  teal-green #1C9B83, magenta #B932D2, brick-coral #B35135, cream #D9DDBD.
- Bright full-frame scenes (golden yellow, cyan or mint backgrounds) in about 1 of every 3 scenes.
- Saturated and mid-dark overall: never muted, never washed-out, never pure black.
- Composition: the subject is big and fills the frame. Close-ups of faces, backs of heads
  filling half the frame, tiny figure under a huge sky, full environments edge to edge.
  Do NOT reserve empty space for text. The word sits on top of the image (see E).

============================================================
D. MOTION
============================================================
- CAMERA: locked and static. No zoom, no pan, no tilt, no dolly, no rotation, no shake.
  The only exception is a scene that explicitly says CAMERA: SLOW PUSH, which means a push-in
  of 1–2% per second, smooth and constant.
- SCENE LENGTH: 2.5–3.5 seconds on screen. Generate 4–5s clips and trim in the editor.
  If a script line runs longer than 3.5s, split it across two scenes.
- ONE PRIMARY ACTION per scene, completed in about 1 second, then a calm hold with
  subtle idle motion (breathing, blinking, a slight sway).
- 2–3 GENTLE CONTINUOUS BACKGROUND LOOPS in every scene, such as drifting dust particles,
  twinkling stars, a slow glow pulse, leaves swaying, slow-moving clouds, a soft light shimmer.
  Loops are slow and even. They never speed up.
- MOTION FEEL: calm, smooth, natural, even pace. No sudden bursts, no speed ramps, no fast
  action, no shaking.
- PARTICLE DISSOLVE (emotional key beats only, max 1 in 5 scenes): the object breaks into small
  drifting colored pixel particles that float away and fade over about 1 second. Soft and
  slow. It is never an explosion, a shatter or a burst.
- NO TRANSITIONS INSIDE A CLIP: a clip is one scene from start to end. No morphing into another
  scene, no wipes, no fades, no scene change inside the generation.

============================================================
E. ON-SCREEN TEXT (editor only — never in AI generation)
============================================================
- Every spoken word gets its own word card, one word at a time, in reading order.
- Font: Rubik Black (fallback: Montserrat Black). ALL CAPS. Keep apostrophes, quotes and
  % signs ("YOU'RE", "100%").
- Color: pure white #FFFFFF with blend mode DIFFERENCE, so each letter shows the inverse of the
  picture behind it (navy over yellow, lime over purple, cream over dark navy).
- No outline, no shadow, no box, no animation. Each card cuts in on the first syllable of its
  word and cuts out the instant the next word starts (typical hold 0.3–0.4s).
- Size: cap height ≈ 14% of frame height (≈150 px at 1080p). Dead center horizontally and
  vertically. Long words may span up to 65% of frame width; shrink only if wider.
- Optional labels, used rarely:
  · a small coral-red #E35561 rounded pill at top center with white sentence-case text
    ("2 days later");
  · an LED dot-matrix panel (navy #0F3D76 dots, a golden #E0CD6E dot band on top) with the word
    in lavender #CBC0E0, for numbers and time words.

============================================================
F. TRANSITIONS, SOUND AND EDIT
============================================================
- Between scenes: a HARD CUT by default. On emphasis lines, a fast 0.15s whip or glitch,
  added in the editor.
- Cut on the beat: place each cut on a word onset or music hit.
- Music: one continuous instrumental bed under the whole voice, never silent. Final mix about
  −16 LUFS integrated, compressed and steady.
- Voiceover: calm, warm, certain, close-mic, ~145 wpm, slight pauses at line breaks.
- SFX: subtle, below the voice. A soft low impact on cuts that land on key words, a soft
  shimmer under every particle dissolve, a soft glitch tick on glitch transitions. No
  whoosh on every word.

============================================================
G. NEGATIVE PROMPTS (paste on every generation)
============================================================
IMAGE NEGATIVE:
text, letters, words, numbers, captions, subtitles, labels, signs with writing, logo,
watermark, signature, 3D render, CGI, photorealism, realistic textures, film grain, noise,
outlines, line art, sketch, painterly brushwork, blur, distorted anatomy, extra limbs,
extra fingers, deformed face, vertical frame, letterbox, black bars, split screen, collage,
border

MOTION NEGATIVE:
camera movement, zoom, pan, tilt, dolly, rotation, shake, handheld, fast motion, speed ramp,
sudden burst, explosion, shatter, morphing, warping, melting, liquid distortion, scene change,
transition, cut, fade, flicker, strobe, text, letters, subtitles, logo, watermark, 3D,
photorealism, face distortion, extra limbs, character changing appearance

============================================================
H. FACT-CHECK / SAFER-REWRITE (before any scene is written)
============================================================
- Re-read every [FACT] in the script. If a claim is approximate, disputed or unverifiable,
  replace it with the safer wording and flag it in the output.
- Never depict a real, identifiable person, brand or logo. Use the protagonist or generic
  characters. Never show real people's faces, names or quotes.

============================================================
I. OUTPUT FORMAT
============================================================
PROTAGONIST: [full lock line]
FACT CHECK: [each claim → kept / rewritten as …]

Then, for every scene:

[SCENE N] — mm:ss.s → mm:ss.s (length s)
SPOKEN: "exact words from the script"
WORD CARDS: WORD @ mm:ss.s · WORD @ mm:ss.s · …
IMAGE PROMPT: Flat 2D vector illustration, 16:9 horizontal widescreen frame. [protagonist lock
line if present] [one clear pose that sets up the action] in [location with 3–5 simple props].
Deep navy-violet base #111147 with electric purple #6B31D5 midtones and [accent 1] and
[accent 2] accents [or: bright full-frame [color] background]. Clean solid color shapes with
soft gradient lighting, gentle glow and soft rim light, no outlines, no texture, soft darker
vignette toward the frame edges. Subject large in the frame. Nothing written anywhere in the image.
MOTION PROMPT: Animate this exact frame. Locked static camera, no zoom, no pan. [Character
or object] [one clear action], completing in about 1 second, then holds with subtle idle
motion. Background loops: [loop 1], [loop 2], [loop 3], slow and even. Calm, smooth, natural
motion. Same character design, colors and flat 2D vector style for the whole clip. One
continuous scene, no transition, no morphing. 4 seconds.
NEGATIVE: [image negative] / [motion negative]
TRANSITION IN: hard cut | 0.15s whip | 0.15s glitch
SFX: [cue @ time] or none
LABEL: [pill / LED panel text] or none

SCRIPT: [paste the script from Prompt 2]
```

---

## WORKED EXAMPLE

### Prompt 1 output (one idea)

```
1. TITLE: You Are What's Left of a Star
   HOOK: You are not small.
   ANGLE: Most of the matter in your body was made inside stars, so "nothing special" is the
          one thing you can't be.
   TURN: Stars don't wait; they burn. You're spending star-stuff on 2 a.m. scrolling.
   VISUAL WORLD: tiny figure under a huge purple sky · a glowing star breaking into drifting
          pixels · atoms orbiting an open palm
   FACT TO VERIFY: share of the body's matter made in stars; elements older than the Sun
   EMOTION ARC: small → luminous
```

### Prompt 2 output (script)

```
TITLE: You Are What's Left of a Star

You are not small.
You just think you are.
Every atom in your body has been somewhere.
Most of what you're made of was forged inside a star. [FACT]
A star that burned for billions of years. [FACT]
Then it died,
and scattered itself across the dark. [FACT]
Some of you is older than the Sun. [FACT]
And against every odd, it landed here.
It became you.

So when you say you're nothing special,
the universe disagrees.
You are what's left of a star.

And you're spending it on a screen at two in the morning.
On people who don't call back.
On waiting for someday.
On a version of you that you keep calling later.

Stars don't wait.
They burn.
They light up everything around them,
and then they give themselves away.

So stop shrinking.
Stop asking permission to take up space.
You were built from something that lit up the sky.

So act like it.

WORD COUNT: 153 · ESTIMATED LENGTH: ~63s

FACT CHECK
- "Most of what you're made of was forged inside a star": well-established. Oxygen, carbon,
  nitrogen, calcium and so on were made in stars; only hydrogen (≈10% of body mass) dates from
  the Big Bang. Kept, with "most" instead of an exact percentage.
- "A star that burned for billions of years": simplified. Many stars that seeded the solar
  system lived millions to billions of years. Kept as poetic shorthand for one star's life.
- "Then it died, and scattered itself across the dark": rewritten from "then it exploded",
  because not all enrichment came from explosions (stellar winds too). "Died and scattered" is accurate.
- "Some of you is older than the Sun": well-established. The solar system formed from
  material made by earlier stars. Kept.
```

### Prompt 3 output (first 7 scenes)

```
PROTAGONIST: KIRO — small round-bodied cartoon kid, warm brown skin, short messy black hair,
round white eyes with dot pupils, mustard-yellow hoodie, navy shorts, red sneakers, a tiny
gold star pin on the hoodie.

FACT CHECK: 4 claims, 1 rewritten ("exploded" → "died, and scattered itself across the dark").

[SCENE 1] — 00:00.0 → 00:02.6 (2.6s)
SPOKEN: "You are not small."
WORD CARDS: YOU @ 00:00.1 · ARE @ 00:00.5 · NOT @ 00:00.9 · SMALL @ 00:01.3
IMAGE PROMPT: Flat 2D vector illustration, 16:9 horizontal widescreen frame. KIRO — small
round-bodied cartoon kid, warm brown skin, short messy black hair, round white eyes with dot
pupils, mustard-yellow hoodie, navy shorts, red sneakers, a tiny gold star pin on the hoodie —
standing tiny on a rounded grassy hilltop, head lowered, under an enormous starry night sky with
a large glowing crescent moon and a few round bushes. Deep navy-violet base #111147 with
electric purple #6B31D5 midtones and golden yellow #E6B726 and cyan #3AB7DC accents. Clean
solid color shapes with soft gradient lighting, gentle glow and soft rim light, no outlines,
no texture, soft darker vignette toward the frame edges. Subject large in the frame. Nothing
written anywhere in the image.
MOTION PROMPT: Animate this exact frame. Locked static camera, no zoom, no pan. Kiro slowly
lifts his head and looks up at the sky, eyes widening, completing in about 1 second, then holds
with subtle breathing. Background loops: stars twinkling, a slow soft glow pulse around the
moon, a few dust motes drifting, slow and even. Calm, smooth, natural motion. Same character
design, colors and flat 2D vector style for the whole clip. One continuous scene, no
transition, no morphing. 4 seconds.
NEGATIVE: [image negative] / [motion negative]
TRANSITION IN: hard cut
SFX: none (music bed starts at 00:00.0)
LABEL: none

[SCENE 2] — 00:02.6 → 00:05.3 (2.7s)
SPOKEN: "You just think you are."
WORD CARDS: YOU @ 00:02.7 · JUST @ 00:03.1 · THINK @ 00:03.5 · YOU @ 00:03.9 · ARE @ 00:04.3
IMAGE PROMPT: Flat 2D vector illustration, 16:9 horizontal widescreen frame. KIRO — small
round-bodied cartoon kid, warm brown skin, short messy black hair, round white eyes with dot
pupils, mustard-yellow hoodie, navy shorts, red sneakers, a tiny gold star pin on the hoodie —
close-up of his face and shoulders filling the frame, looking slightly down, in front of a
simple-shape night room with a window of stars, a lamp and a shelf. Deep navy-violet base
#111147 with electric purple #6B31D5 midtones and magenta #B932D2 and cream #D9DDBD accents.
Clean solid color shapes with soft gradient lighting, gentle glow and soft rim light, no
outlines, no texture, soft darker vignette toward the frame edges. Subject large in the frame.
Nothing written anywhere in the image.
MOTION PROMPT: Animate this exact frame. Locked static camera, no zoom, no pan. Kiro hunches
his shoulders and glances sideways, unsure, completing in about 1 second, then holds with
subtle blinking. Background loops: lamp glow pulsing softly, stars twinkling in the window,
tiny dust particles drifting, slow and even. Calm, smooth, natural motion. Same character
design, colors and flat 2D vector style for the whole clip. One continuous scene, no
transition, no morphing. 4 seconds.
NEGATIVE: [image negative] / [motion negative]
TRANSITION IN: hard cut
SFX: none
LABEL: none

[SCENE 3] — 00:05.3 → 00:08.6 (3.3s)
SPOKEN: "Every atom in your body has been somewhere."
WORD CARDS: EVERY @ 00:05.4 · ATOM @ 00:05.8 · IN @ 00:06.2 · YOUR @ 00:06.6 · BODY @ 00:07.0 ·
HAS @ 00:07.4 · BEEN @ 00:07.8 · SOMEWHERE @ 00:08.2
IMAGE PROMPT: Flat 2D vector illustration, 16:9 horizontal widescreen frame. KIRO — small
round-bodied cartoon kid, warm brown skin, short messy black hair, round white eyes with dot
pupils, mustard-yellow hoodie, navy shorts, red sneakers, a tiny gold star pin on the hoodie —
holding out one open palm toward the viewer, with five small glowing atom symbols (a bright
core with thin orbit rings) hovering above his hand, with a few soft lighter circles floating behind him.
Bright full-frame cyan #3AB7DC background with electric purple #6B31D5 and
golden yellow #E6B726 accents. Clean solid color shapes with soft gradient
lighting, gentle glow and soft rim light, no outlines, no texture, soft darker vignette toward
the frame edges. Subject large in the frame. Nothing written anywhere in the image.
MOTION PROMPT: Animate this exact frame. Locked static camera, no zoom, no pan. The atoms
circle once around Kiro's open hand as he watches in wonder, completing in about 1 second, then
hold with gentle hovering. Background loops: atom orbit rings spinning slowly, soft circles
drifting, a soft glow pulse on the atoms, slow and even. Calm, smooth, natural motion. Same
character design, colors and flat 2D vector style for the whole clip. One continuous scene,
no transition, no morphing. 4 seconds.
NEGATIVE: [image negative] / [motion negative]
TRANSITION IN: hard cut
SFX: soft low impact @ 00:05.3
LABEL: none

[SCENE 4] — 00:08.6 → 00:11.1 (2.5s)
SPOKEN: "Most of what you're made of"
WORD CARDS: MOST @ 00:08.7 · OF @ 00:09.1 · WHAT @ 00:09.5 · YOU'RE @ 00:09.9 · MADE @ 00:10.3 ·
OF @ 00:10.7
IMAGE PROMPT: Flat 2D vector illustration, 16:9 horizontal widescreen frame. KIRO — small
round-bodied cartoon kid, warm brown skin, short messy black hair, round white eyes with dot
pupils, mustard-yellow hoodie, navy shorts, red sneakers, a tiny gold star pin on the hoodie —
seen from behind, the back of his head and shoulders filling the left half of the frame,
looking at a huge glowing golden star that fills the right half, with a few floating rocks.
Bright full-frame golden yellow #E6B726 background with electric purple #6B31D5 and
brick-coral #B35135 accents. Clean solid color shapes with soft gradient lighting, gentle
glow and soft rim light, no outlines, no texture, soft darker vignette toward the frame edges.
Subject large in the frame. Nothing written anywhere in the image.
MOTION PROMPT: Animate this exact frame. Locked static camera, no zoom, no pan. Kiro raises
one hand to shield his eyes from the star's light, completing in about 1 second, then holds
with subtle breathing. Background loops: the star's corona pulsing slowly, floating rocks
bobbing gently, warm light shimmering softly, slow and even. Calm, smooth, natural motion.
Same character design, colors and flat 2D vector style for the whole clip. One continuous
scene, no transition, no morphing. 4 seconds.
NEGATIVE: [image negative] / [motion negative]
TRANSITION IN: hard cut
SFX: none
LABEL: none

[SCENE 5] — 00:11.1 → 00:13.8 (2.7s)
SPOKEN: "was forged inside a star."
WORD CARDS: WAS @ 00:11.2 · FORGED @ 00:11.6 · INSIDE @ 00:12.0 · A @ 00:12.4 · STAR @ 00:12.8
IMAGE PROMPT: Flat 2D vector illustration, 16:9 horizontal widescreen frame. A close view
of the glowing heart of a star: swirling rings of golden and orange plasma shapes around a
bright white core, with small glowing sparks orbiting. Deep navy-violet base #111147 at the
frame edges with electric purple #6B31D5 midtones and golden yellow #E6B726 and brick-coral
#B35135 accents. Clean solid color shapes with soft gradient lighting, gentle glow and soft rim
light, no outlines, no texture, soft darker vignette toward the frame edges. Subject large in
the frame. Nothing written anywhere in the image.
MOTION PROMPT: Animate this exact frame. Locked static camera, no zoom, no pan. The sparks
gather at the core and form one bright glowing atom, completing in about 1 second, then the
atom holds with a gentle pulse. Background loops: plasma rings rotating slowly, sparks
drifting outward, a soft glow pulse, slow and even. Calm, smooth, natural motion. Same colors
and flat 2D vector style for the whole clip. One continuous scene, no transition, no morphing.
4 seconds.
NEGATIVE: [image negative] / [motion negative]
TRANSITION IN: hard cut
SFX: soft shimmer @ 00:11.6
LABEL: none

[SCENE 6] — 00:13.8 → 00:17.1 (3.3s)
SPOKEN: "A star that burned for billions of years."
WORD CARDS: A @ 00:13.9 · STAR @ 00:14.3 · THAT @ 00:14.7 · BURNED @ 00:15.1 · FOR @ 00:15.5 ·
BILLIONS @ 00:15.9 · OF @ 00:16.3 · YEARS @ 00:16.7
IMAGE PROMPT: Flat 2D vector illustration, 16:9 horizontal widescreen frame. KIRO — small
round-bodied cartoon kid, warm brown skin, short messy black hair, round white eyes with dot
pupils, mustard-yellow hoodie, navy shorts, red sneakers, a tiny gold star pin on the hoodie —
sitting on a small floating rock in deep space, hugging his knees, watching a large glowing
star in the distance, with a ringed planet and drifting asteroids. Deep navy-violet base
#111147 with electric purple #6B31D5 midtones and golden yellow #E6B726 and teal-green #1C9B83
accents. Clean solid color shapes with soft gradient lighting, gentle glow and soft rim light,
no outlines, no texture, soft darker vignette toward the frame edges. Subject large in the
frame. Nothing written anywhere in the image.
MOTION PROMPT: Animate this exact frame. Locked static camera, no zoom, no pan. Kiro rests
his chin on his knees and sighs, completing in about 1 second, then holds with subtle
breathing. Background loops: the distant star pulsing slowly, asteroids drifting, the rock
bobbing gently, slow and even. Calm, smooth, natural motion. Same character design, colors and
flat 2D vector style for the whole clip. One continuous scene, no transition, no morphing.
4 seconds.
NEGATIVE: [image negative] / [motion negative]
TRANSITION IN: hard cut
SFX: none
LABEL: LED panel optional for "BILLIONS" (lavender word on navy dots)

[SCENE 7] — 00:17.1 → 00:19.7 (2.6s)   ← emotional key beat: particle dissolve
SPOKEN: "Then it died,"
WORD CARDS: THEN @ 00:17.2 · IT @ 00:17.6 · DIED @ 00:18.0
IMAGE PROMPT: Flat 2D vector illustration, 16:9 horizontal widescreen frame. A large glowing
golden star alone in the center of deep space, surrounded by a soft halo and a few faint
distant stars. Deep navy-violet base #111147 with electric purple #6B31D5 midtones and golden
yellow #E6B726 and magenta #B932D2 accents. Clean solid color shapes with soft gradient
lighting, gentle glow and soft rim light, no outlines, no texture, soft darker vignette toward
the frame edges. Subject large in the frame. Nothing written anywhere in the image.
MOTION PROMPT: Animate this exact frame. Locked static camera, no zoom, no pan. The star
breaks apart into small drifting golden and magenta pixel particles that float outward slowly
and fade, completing in about 1 second, then the drifting particles hold softly in the dark.
It is not an explosion. Background loops: faint stars twinkling, particles drifting, a fading
glow, slow and even. Calm, smooth, natural motion. Same colors and flat 2D vector style for the
whole clip. One continuous scene, no transition, no morphing. 4 seconds.
NEGATIVE: [image negative] / [motion negative]
TRANSITION IN: 0.15s glitch
SFX: soft glitch tick @ 00:17.1 · soft shimmer @ 00:18.0
LABEL: none

… continue in the same pattern for every remaining line of the script.
```
