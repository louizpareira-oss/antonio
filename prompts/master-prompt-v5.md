# MASTER PROMPT SYSTEM v5.3: Fast Explainer Shorts (16:9 horizontal)

There are three prompts, run in order:

- **Prompt 1:** Content Ideas → pick one idea
- **Prompt 2:** Video Script → record the voiceover in ElevenLabs
- **Prompt 3:** Shot List + AI Prompts → generate images and clips, then edit with the **Editor Checklist** at the bottom

## Why v5 exists

v4.1 said its rules were "measured from the reference videos". They were not. Its motion rules
(locked camera, "calm, even pace", "no sudden bursts", "final scene holds longest") are the
opposite of what the references do. v5 is rebuilt from a frame-by-frame measurement of four
reference videos (2× @iddietothissong, 2× @thecognitionswitch) and of your first v4.1 video. The
full numbers and method are in [`docs/11-reference-speed-teardown.md`](../docs/11-reference-speed-teardown.md).

| | Your v4.1 video | 4 references | v5 target |
|---|---|---|---|
| Speaking speed | 135 wpm | **186–210 wpm** | 185–200 wpm |
| Words in ~65 s | 149 | **192–242** | 195–215 |
| Shots | 14 | **19–33** | words ÷ 11 ≈ 19 (Cartoon) / ÷ 7 ≈ 29 (Dense Cut) / ÷ 6 ≈ 33 (HUD) |
| Average shot | 4.7 s | **1.9–3.6 s** | ≤ 3.3 s / ≤ 2.1 s |
| Shots longer than 5 s | 43% | **0–21%** | ≤ 15% / 0% |
| Frames where the camera is moving | 7% | **45–98%** | ≥ 50% / ≥ 90% |
| Motion inside the frame | 1× | **10–28× yours** | always moving |
| Cuts that land on an audio hit | 31% (no better than chance) | **64–83%** | ≥ 70% |
| Final shot | 9.5 s | **2.8–4.9 s** | 3–5 s |
| Word cards held 0.8 s or longer | 23 | **7–10** | ≤ 8 |

**v5.1** adds six ideas from your own v5 draft that the measurements back up: choose the preset
by theme, a recurring motif, animal and multi-figure casts, top-down/low-angle/isometric views,
up to 2 holds over 6 s in the cartoon style (measured 2–3), and planning flashes and black
beats in the script.

**v5.2** adds PRESET 3, CARTOON RUSH · DENSE CUT: the cartoon look at HUD pace. Presets 1 and 2
are each measured from one channel. Preset 3 combines the two sets of measurements, so it stays
untested until you post a video made with it and measure it.

**v5.3** adds your EMOTIONAL TRUTH section, edited after a review (four lenses and two
skeptics; see docs/12). It also adds D2 STRUGGLE MOTION (how to make effort and weight read as
physically real), a MICRO-MOMENT LIBRARY, and new J fields (THE FEELING, BODY TELL, LOCK,
POST HIT). One measured fact to keep in mind: the references show a body state in 0–42% of
shots, mostly in the opening seconds. They never show sweat, tremor, breath or grip. These
rules are a new direction for the channel, not a copy of the references, so test them on one
video first.

What did **not** need to change: 16:9 (all four references are 16:9 on TikTok), 30 fps, word-by-word
cards in white with DIFFERENCE blend (all four use it), card size for the cartoon style (≈ 14% cap
height, same as yours), loudness around −16 LUFS, and your fact-check rules.

---

## STYLE PRESETS: pick one per video and paste it into Prompt 3

```
PRESET 1 — CARTOON RUSH   (measured from @iddietothissong, 2 videos)
LOOK: saturated flat-vector cartoon. Candy purple, electric lime, hot orange, cyan, magenta.
  Measured mean saturation 0.76–0.78 (your v4.1 video: 0.58). Never pastel, never muted.
PACE: 19 shots per 69 s. Average shot 3.6 s, median 2.7–3.5 s. At most 1 shot in 5 is longer
  than 5 s, and at most 2 longer than 6 s (measured 2–3; longest 8.3 s), only on emotional
  or scale beats and never the final shot. About 12 spoken words per shot.
CAST: people, objects with faces, and ANIMALS with faces (a bird flexing in a gym, a sick bird
  on a couch, a chick driving through speed lines). Multi-figure scenes with 3–4 characters,
  all moving at once (a gym where everyone is working out).
ANGLES: top-down (a bedroom seen from above), isometric (a money tower), low-angle, and wide
  landscapes crossed by a slow pan.
CAMERA: moving in 45–55% of all frames. Pans ≈ 12% of frame width per second (a slow but
  clearly visible slide), push-ins ≈ 4–6% per second, tracking alongside a moving character.
ACTION: characters act the whole clip: push-ups, running, slamming a desk, flying, fighting,
  a money tower building itself. Never "move once, then hold".
JUMP-CUT SETS: the same setting re-posed 3–4 times and cut every 1–2 s (reference: 4 shots of
  one bedroom in the first 6.8 s, each with a new pose and angle).
PUNCTUATION: 1–2 single white flash frames per video, on the hardest-hitting word. Comic
  impact stars on hits.
TEXT: cap height 14–15% of frame height, centred at 50%. White + DIFFERENCE blend.
VOICE: 190–210 wpm. Punchy and conversational: a first-person confession ("I don't want to…")
  or tough love ("Lock in.").
```

```
PRESET 2 — NEON HUD   (measured from @thecognitionswitch, 2 videos)
LOOK: pure black background (60–65% of pixels near-black). Glowing line art and HUD
  graphics in red, cyan and white, with electric blue accents. Silhouette figures in solid
  glowing red.
PACE: 29–33 shots per 62 s. Average shot 1.9–2.2 s; no shot longer than 3 s; 85–90% of
  shots are 2.5 s or shorter. About 6 spoken words per shot: the picture changes on every
  phrase.
CAMERA: moving in 95–98% of frames. Fast push-in: the subject roughly doubles in size over the
  shot (≈ 35–45% per second). Also fly-throughs, orbits and data tunnels.
ACTION: every element animates for the whole shot: rings spin and draw themselves, waveforms
  oscillate, batteries fill, gauge needles rise, lightning arcs, hourglass sand pours.
LITERAL ICONS: one icon per key noun. Ring loader = time/hours, battery or tank =
  energy/recharge, gauge = capacity/limit, waveform = sound/speech, ECG line = health,
  chip/processor = thinking, power button + padlock = shutting down, hourglass = time
  running out, red silhouette = "you".
PUNCTUATION: 3–4 "black beats" per video (0.25–0.6 s of pure black with only the word on it,
  on pivot words like "BUT"), plus 1 white starburst flash on the reveal word.
TEXT: cap height ≈ 6.5% of frame height (small), centred at 49%. White + DIFFERENCE blend
  (it turns cyan over red and gold over blue).
MOTIF: one graphic bookends the video. The ring loader appears near the start and again near
  the end of both videos (C at 2.0 s and 50.0 s; D at 2.0 s and 58.3 s); D's red waveform
  rings return at 45.5 s.
VOICE: 185–195 wpm, calm and certain, second person, built around a "Why do you…?" question.
```

```
PRESET 3 — CARTOON RUSH · DENSE CUT  (cartoon look at HUD pace)
LOOK (identical to CARTOON RUSH — do NOT borrow HUD visuals):
  Saturated flat-vector cartoon. Candy purple, electric lime, hot orange, cyan,
  magenta. Mean saturation ≥0.75. Never pastel, never muted, never black bg.
  People, objects with faces, and ANIMALS with faces. Multi-figure scenes (2–4
  characters all moving). Top-down, low-angle, isometric, wide-with-pan.
PACE (borrowed from HUD — the only thing borrowed):
  SHOT COUNT = script words ÷ 7, round UP. (199 words → 29 shots. Max-density
    option: ÷6 → 34 shots. Never below ÷8.)
  SHOT LENGTH: 1.2–3.0 s. At most ONE shot may reach 4–5 s, only on the single
    emotional peak line [HOLD]. No shot ever >5 s. No long landing hold.
  FIRST CUT within 1.5 s, OR a character in full motion from frame 1.
  FINAL SHOT 2.5–4 s. Video ends ≤0.5 s after the last word.
  JUMP-CUT SETS: at least 2 per video. One setting, 3–4 re-posed variants
    (new pose + new angle + new framing), cut every 1–1.5 s on phrase boundaries.
COHERENCE (the "every frame makes sense" rule — from HUD's noun list):
  Every shot maps to exactly one drawable noun/action in the NOUN LIST.
  If a shot cannot be named by a noun from the script, delete it. One shot =
  one idea. Multi-action nouns ("weighs price against coins") split into two
  shots. No generic b-roll, no atmosphere filler.
CAMERA: moving in ≥70% of shots. Slow pan ≈12% frame-width/s, push-in ≈5%/s,
  tracking beside a moving character, slow orbit. Named per shot with speed.
ACTION: runs the WHOLE clip. Strong verb + speed word ("sprints", "slams",
  "fills up quickly", "launches"). Plus 1–2 background loops. No frozen
  moment >0.5 s. Allowed: impact stars, speed lines, smoke bursts, coin bursts.
PUNCTUATION: 1–2 single white flash frames on the hardest-hitting word.
  Comic impact stars on physical hits. All cuts = hard cuts. No glitches/whips.
TEXT: white #FFFFFF, blend mode DIFFERENCE, cap height 14–15% of frame,
  centered. Min hold 6 frames (0.2 s). Fast words share a card ("GIVE YOURSELF").
  Middle 30% of every image must be clearly dark or clearly bright (text band).
VOICE: 190–210 wpm. Punchy, conversational. Any hook type from Prompt 1;
  first-person confession or tough love fit best. In the editor, delete every
  gap >0.3 s except marked ⏸ beats.
CAST ROTATION: person / object-or-ANIMAL with face / multi-figure crowd /
  abstract. No two adjacent shots share a type, except inside a jump-cut set.
MOTIF: one recurring object/shape returns at 2–3 beats. Flag those shots.
ANTI-COPY: never reuse a hook, metaphor, prop or composition from the reference
  channels or from examples in this prompt system.
```

---

## EMOTIONAL TRUTH: paste under the preset block in Prompt 3

Your Emotional Truth section, edited after a review: four review lenses, two skeptics, and a
frame-by-frame check of the four reference videos. The reasons for each edit are in
[`docs/12-emotional-truth-review.md`](../docs/12-emotional-truth-review.md). Rule 7 and the
script-level rules also appear inside Prompts 1 and 2 below.

```
EMOTIONAL TRUTH  (paste directly under the preset block in Prompt 3)
PRIORITY: EMOTIONAL TRUTH decides WHAT each shot shows. The preset's numbers decide HOW
  FAST, HOW LONG and HOW BRIGHT. When they disagree, the numbers win: find a truer moment
  that fits the pace. Never make a shot slower or darker to get there.
SCOPE: rules 1–4 and 8–11 apply to every video. Rules 5–7 apply to motivation, discipline,
  time and perspective themes. In NEON HUD the body tell is shown by how the icon or
  silhouette behaves: breath = a waveform that catches; tremor = a jittering gauge needle;
  weight = the silhouette's shoulders sinking, or a battery draining. Rules 5–6 apply to
  the cartoon presets only.

1. BODILY TRUTH: MIRROR SHOTS
   HOOK, SYMPTOM, BELIEF, PAYOFF and LANDING shots are MIRROR SHOTS: the viewer's own life.
   Each shows its line as a feeling in a body (a person, an animal, or an object with a
   face), never as a prop alone. For "you're tired", not a bed but a head that nods and
   jerks awake, arms that hang, shoulders that drop under invisible weight. The noun stays
   the subject and a body reacts to it. Silhouette test: cover the face. If the feeling
   still reads, the pose works.
   PIVOT and MECHANISM shots carry the running metaphor. At least every third one puts the
   metaphor's cost on a body (knees buckle under the load). Object and icon shots show the
   cost as force: sagging, bowing, cracking, a face-object sweating.
   BUDGET: 8–14 mirror shots per video. Never more than 2 strain shots in a row.
2. THE FEELING (a planning field, never pasted into a generator)
   Write it FIRST: the moment in the viewer's day this shot matches (time, place, body
   part). Then carry it: its body cue appears word for word in IMAGE (the start pose) and
   MOTION (the verb).
   TEST: if this FEELING could caption 3 other shots in the video, rewrite the shot.
3. BODY TELL (every mirror shot): one cue, drawn as a cartoon tell. It sits big on the main
   subject, outside the middle 30% band, at least ~5% of frame height.
   EXERTION:
     sweat = 2–3 big cartoon sweat drops flying off the head, or a dark sweat patch on the back
     tremor = limbs shaking hard, with short shake lines beside them
     ache = spine curved like a question mark, hand on the lower back, small pain stars
     breath = shoulders heaving, mouth open panting, breath puffs, a long sigh cloud
     grip = both fists clamped on a handle, knees braced (a whole-body grip, not knuckle colour)
     weight = knees buckling, feet sinking, the surface bending under the load
   AVOIDANCE: eyes or hand veer away from the task.
   HESITATION: reach, stop short, pull back (see rule 8).
   INERTIA: sinking into the couch, pinned, melting.
   RESTLESSNESS: leg bounce, flipping over in bed.
   SCREEN GLOW: face lit cyan from below in a dark room.
   FATIGUE: eyelids drop and snap open; head nods, then jerks awake.
   RELIEF: shoulders drop, exhale cloud.
   SCALE: close-up = grip, sweat, mouth (face in the top third only). Medium = breath,
     tremor. Wide / top-down / isometric = posture and weight.
   NEVER (unreadable at this size and length): dry lips, a taste, a trembling voice, eyes
     that won't focus, knuckle colour.
   FREQUENCY TEST: most viewers did this exact thing in the last 7 days. If not, pick a
     smaller, more common moment from the MICRO-MOMENT LIBRARY
     (prompts/micro-moment-library.md).
4. WORD-MOTION LOCK (editor only, never in a generator prompt)
   Each shot names ONE lock word. The action's PEAK frame (impact, slip, buckle,
   push-through, jerk awake) lands 0–3 frames BEFORE that word's onset, and never more than
   1 frame after it. The brace and strain may come before the word; the peak may not come
   after it. Lock the body's reaction, not a picture of the word: on "HEAVY", the shoulders
   buckle. Method: Prompt 3 D2.6.
5. QUIET BIAS (motivation / discipline themes)
   Real sacrifice is mostly boring, ugly and private. Prefer:
   - the dark early hour over golden hour
   - the third hour of effort over the first minute
   - defeat in the posture, persistence in the motion
   - a messy room over a perfect desk
   - no one watching over a cheering crowd
   AVOID: sunsets, golden hour, summit arms-raised triumph, perfect teeth and bodies,
   stock-illustration poses.
   HOW TO DRAW IT IN THE PRESET LOOK:
   - DARK MEANS SATURATED NIGHT, NOT GREY: deep indigo or violet at full saturation, lit by
     ONE hot practical light (phone cyan, lamp orange, fridge white). MECHANISM stays the
     brightest phase. Rotate the dark hue (indigo → violet-magenta → night teal).
   - SHOW THE HOUR WITH LIGHT, NOT NUMBERS: a pre-dawn blue window, the phone as the only
     light at 1 a.m., fridge light in a dark kitchen, slanted 3 p.m. sun, streetlight
     stripes. The number lives only in the voice and the caption.
   - SHOW DURATION WITH LEFTOVERS: mug rings, a window gone from dark to light, crumbs on
     the keyboard, crumpled lists, a posture that gets worse across a jump-cut set.
   - Mess sits at the frame edges and on the floor. The middle 30% stays clearly dark or
     clearly bright.
   - LANDING = ORDINARY VAST: first light flooding a messy room, one lit window in a dark
     apartment block, an open street at dawn, a night sky. Never a sunset or a summit. The
     character stays small and still working.
   - CROWDS = CONTRAST: everyone else rushing past the still YOU, or party lights passing
     the window while YOU pull the curtain.
6. ANTI-HEROIC: the YOU character (the figure that stands for the viewer)
   Tired, not fierce. Resigned, not fiery. Ordinary, not exceptional. Strained, not stoic.
   Tired, not broken. Stuck, not hopeless. They keep a sense of humour.
   LOOK, written into every IMAGE prompt for this character: oversized hoodie, unstyled
   hair with a cowlick, dark half-moons under half-closed eyes, a coffee-stain dot, rounded
   shoulders, and worn clothes still in the preset's candy colours.
   ONE design for the whole video: make a character sheet first, and if your image tool
   takes a reference image, reuse it for every YOU shot. Show YOU from behind, over the
   shoulder, or with the face in the upper third. Animal and object characters in
   MECHANISM may stay playful.
7. PHYSICAL COST METAPHOR (enforced in Prompt 1, item 5)
   The running metaphor is a system in which a body does physical work that costs, and
   hurts if it goes on too long: carrying, hauling, digging, rowing, pushing, forging,
   holding something heavy. The work is the metaphor's COST side; the reward side can be
   anything.
   FORBIDDEN: metaphors with no physical labour in them (a library, a computer, a puzzle, a
   story being written), and brain-as-computer.
8. HESITATION IS A LOOP, NEVER A FREEZE
   Reach, stop a finger-width short, pull back, reach again: 2–3 cycles inside the clip.
   Restless avoidance is a JUMP-CUT SET: same bed or couch, 3–4 poses, cut every 1–1.5 s.
9. TRUE AND FUNNY BEATS TRUE AND GRIM
   At least 2 mirror shots per video play the tell as comedy through exaggeration: the phone
   drops on your face and you keep scrolling; the body melts into the couch until only the
   phone arm sticks out; the gym bag by the door has a sad face. The viewer laughs because
   it is exactly them.
10. RELEASE
   The landing contains one RELEASE shot. YOU does one tiny, doable action and the body gets
   lighter: the phone goes face-down and the glow leaves the face, or one box gets ticked
   and the shoulders drop. Small and earned, never triumphant.
11. SHOWN, NEVER PRESCRIBED
   Show the struggle honestly. No line or picture tells the viewer to skip sleep or meals,
   train through pain, or treat exhaustion as a virtue.
   DO NOT DRAW (a precaution): blood, wounds, bitten or bleeding lips, pills or medicine
   bottles; ledges, rooftops, bridges or platforms behind a lone figure; water over the head
   or sinking under water; ropes or cords around anything; crying alone in the dark for
   more than one shot.
LISTS IN THIS BLOCK ARE CATEGORIES: use the category, but change the room, prop and angle,
  and never reuse an example's exact wording or composition. Anti-copy still applies to the
  examples themselves.
```


---

## PROMPT 1: CONTENT IDEAS

```
ROLE: You are the Creative Director of a faceless short-form channel that makes 62–70 second
16:9 horizontal animated explainer videos. Every spoken word is shown on screen one at a
time. The videos are FAST: 185–210 words per minute, a new picture every 2–4 seconds, and a
camera that is almost always moving.

TASK: Generate 10 video ideas on the theme I give you, for the PRESET I name
(CARTOON RUSH, CARTOON RUSH · DENSE CUT or NEON HUD). If I don't name one, pick it per idea.

EVERY IDEA MUST HAVE:
1. TITLE: 3–6 words. The title phrase must be speakable as a line in the script.
2. HOOK: the first spoken sentence, 8–16 words, using ONE of these measured hook types:
   a. SYMPTOM QUESTION: "Why do you [relatable thing] even after/before [expected fix]?"
   b. COMMAND: a 2-word order, then why ("Lock in. …").
   c. CONFESSION: first person, "I don't want to [thing everyone secretly feels]…"
3. WRONG BELIEF: the sentence the viewer says in their own head, in their own words, plus the
   evidence they hold against themselves ("I'm so lazy. Two hours of scrolling proves it.").
   A common label like "lazy" is fine if the next line names the fear under it. A straw man
   is a belief almost nobody holds.
4. MECHANISM: the real explanation in one sentence, with 4–8 DRAWABLE NOUNS (things that can be
   literally drawn or shown as an icon). List those nouns.
5. RUNNING METAPHOR: one system the whole video compares the viewer to, in which a body does
   PHYSICAL WORK that costs, and hurts if it goes on too long (a porter, a digger, a rower,
   a smith, someone holding something heavy). It is set up in the mechanism and paid off in
   the last line. FORBIDDEN: metaphors with no physical labour in them (a library, a
   computer, a puzzle, a story being written), and the brain-as-computer / supercomputer /
   processor metaphor, which belongs to @thecognitionswitch.
6. IDENTITY FLIP: the last line reframes the struggle as INFORMATION, not toxic positivity
   ("You aren't lazy, you're carrying something heavy"). Forbidden: "you're amazing and
   perfect".
7. FACT TO VERIFY: every number, study or named term the idea depends on, or "none".
8. EMOTION ARC: start → LOW POINT → end, with a colour mood for each. The LOW POINT sits on
   the WRONG BELIEF beat (4 s or less, before 20 s). It is self-blame or shame, never despair,
   and it gets the darkest (still saturated) shot. No second low point after the PIVOT.
9. PRESET PICK: CARTOON RUSH, DENSE CUT or NEON HUD, with a one-line reason. NEON HUD suits
   brain / body / science-of-you ideas; CARTOON RUSH suits motivation / time / discipline /
   perspective; DENSE CUT suits the same themes when the mechanism has many drawable nouns.
10. MOTIF: one simple shape or object that returns at 2–3 beats (opening, mechanism peak,
   landing), e.g. a ring, a waveform, a coin, a doorway.
11. MIRROR MOMENTS: 3–5 specific, unglamorous moments the viewer lived this week, in the
   categories of the MICRO-MOMENT LIBRARY (prompts/micro-moment-library.md).

RULES:
- Themes: motivation, perspective, time, discipline, mortality, science-of-you.
- No real living people, brands or public figures as subjects.
- No idea may depend on a fact that cannot be checked. Never "Researchers at [named
  university] discovered…" unless the study is real and named in FACT TO VERIFY.
- No two ideas share a hook type AND a running metaphor.
- Do not reuse hooks, metaphors or props from any example in this prompt system.
OUTPUT: a numbered list, one block per idea, no commentary.
PRESET: [CARTOON RUSH / DENSE CUT / NEON HUD]
THEME: [paste theme here]
```

---

## PROMPT 2: VIDEO SCRIPT

```
ROLE: You are the Scriptwriter for a FAST 16:9 animated explainer channel. The voiceover is
recorded in ElevenLabs and every word appears on screen one at a time.

TASK: Write the full voiceover for the idea I give you.

LENGTH AND PACE (measured from the reference channels):
- 195–215 words. Read at 185–200 words per minute, that is 62–68 seconds.
- Lines of 3–10 words. One line = one picture-able thought.
- NO breathing rows. There are no pauses except at most TWO marked beats (write ⏸), one
  before the PAYOFF and one before the LANDING, each 0.6 s max.
- PUNCTUATION MARKERS (write them at the end of the line):
  CARTOON RUSH: [FLASH] on the 1–2 hardest-hitting lines; [HOLD] on at most 2 lines whose
  shot may run longer than 6 s.
  DENSE CUT: [FLASH] on the 1–2 hardest-hitting lines; [HOLD] on at most 1 line (its shot
  may run 4–5 s).
  NEON HUD: [BLACK] on 3–4 pivot words ("But…"); [FLASH] on the 1 reveal line. No [HOLD].

STRUCTURE (measured from the reference timelines; seconds are for a 65 s video):
1. HOOK (0–5 s, 12–18 words): the idea's hook. No greeting, no "in this video".
2. SYMPTOM (5–11 s): 2–3 physical, visceral images of the problem ("your limbs feel like
   concrete"). Second person.
3. WRONG BELIEF (3–4 s): the viewer's own words plus their evidence. This is the LOW POINT:
   self-blame, never despair or hopelessness.
4. PIVOT (4–5 s): starts with "But". Introduce the real explanation. Use a real named term
   or "research suggests". NEVER invent a university or a study.
5. MECHANISM (40–50% of the runtime, 26–32 s; measured 41% and 49%): explain it through the
   RUNNING METAPHOR. Every line carries at least one drawable noun or action. Each new noun
   becomes a new shot.
6. PAYOFF (5–6 s): connect the mechanism back to the symptom from line 2.
7. LANDING (6–8 s, 18–25 words): the identity flip plus a callback to the running metaphor.
   Speak the title phrase here or in the hook. Do not reuse any earlier line.

VOICE: second person (or first person for a CONFESSION hook). Plain words, short sentences,
certain tone. No profanity. No "follow for more". No list longer than 3 items. No more than 3
consecutive lines making the same point.
HONEST, NOT HYPE: the words name the real cost. No "you can do anything", no "become
unstoppable". Test: if a line would sound natural shouted at a motivational seminar, rewrite
it. Would a tired friend say it to you quietly at 1 a.m.? The honesty is in the words, not the
tempo: delivery stays 190–210 wpm.
SPECIFIC, BORING DETAIL: at least one SYMPTOM or PAYOFF line names a specific, unglamorous
detail ("it's eleven forty", "the same tab since Monday", "your bed still looks warm from
across the room"). Write numbers the way they are said. They live in the voice and the
caption, never in the picture.
SHOWN, NEVER PRESCRIBED: no line tells the viewer to skip sleep or meals, train through pain,
or treat exhaustion as a virtue.

MECHANISM RULE: if the mechanism has two sides (cost vs reward, threat vs safety), the
landing or payoff acts on BOTH.

FACT-CHECK / SAFER-REWRITE (mandatory):
- Mark every factual claim with [FACT].
- Under the script, list each [FACT] with: the claim, whether it is well-established, and a
  safer wording if it is approximate, disputed or unverifiable. Use the safer wording in the
  script.
- Never invent quotes, studies, universities or numbers. Never make claims about a real,
  named, living person. Never give medical, legal or financial instructions.

ELEVENLABS NOTES (for the creator, not spoken):
- Speed: start at 1.10–1.15. Stability: lower than default for more energy; test 2 takes.
- Target 185–200 wpm after editing. In the editor, delete every gap longer than 0.3 s except
  the two ⏸ beats.

OUTPUT:
1. TITLE
2. SCRIPT (one line per row, ⏸ beats marked, [FACT] tags)
3. WORD COUNT and ESTIMATED LENGTH at 190 wpm
4. FACT CHECK table
5. PHASE MAP: each line labelled HOOK / SYMPTOM / BELIEF / PIVOT / MECHANISM / PAYOFF /
   LANDING, with estimated start second. Rewrite before output if MECHANISM < 40% or the
   total is under 195 words.
6. NOUN LIST: every drawable noun or action in order of appearance (Prompt 3 turns these into
   shots).
7. EMOTION ARC: start → low point (line number) → end, with a colour mood for each.
IDEA: [paste one idea from Prompt 1]
```

---

## PROMPT 3: SHOT LIST + AI PROMPTS

```
ROLE: You are the Visual Director and Prompt Engineer. You turn a finished script into a
FAST, shot-by-shot production plan for a 16:9 animated video. Images and motion clips are
generated in AI tools. Word cards, transitions, SFX and music are added in the editor.

============================================================
A. FORMAT
============================================================
- 16:9 horizontal, 1920×1080, 30 fps. Every image and clip is generated 16:9.
- Total length = voiceover length (62–68 s). No intro card, no outro card.

============================================================
B. PRESET
============================================================
Paste ONE preset block (CARTOON RUSH, CARTOON RUSH · DENSE CUT or NEON HUD), then the EMOTIONAL
TRUTH block under it. Every number in the preset is a hard rule. EMOTIONAL TRUTH decides what
each shot shows.

============================================================
C. PACING (the main change from v4.1)
============================================================
- SHOT COUNT = script words ÷ 11 (CARTOON RUSH), ÷ 7 (DENSE CUT) or ÷ 6 (NEON HUD). Round UP.
- A NEW SHOT starts on every new drawable noun in the NOUN LIST (HUD, DENSE CUT) or every new
  sentence (CARTOON RUSH). One shot = one idea.
- DENSE CUT COHERENCE: every shot maps to exactly one noun in the NOUN LIST. A noun whose lines
  run past 3.0 s splits into two shots. No b-roll, no filler shots.
- SHOT LENGTH: CARTOON 1.5–5 s; at most 2 shots longer than 6 s (max 8 s), only on [HOLD]
  lines, never the final shot. DENSE CUT 1.2–3 s; at most one shot of 4–5 s, on the [HOLD]
  line; never over 5 s. HUD 1.2–3 s, never longer.
- FIRST CUT within the first 2.0 s (DENSE CUT: 1.5 s), or (cartoon presets only) a character in
  full motion from frame 1.
- FINAL SHOT 3–5 s (DENSE CUT: 2.5–4 s). The video ends no more than 0.5 s after the last word.
  NO long landing hold.
- JUMP-CUT SETS (both cartoon presets): at least 2 per video. One setting, 3–4 re-posed
  variants (new pose, new angle, new framing), cut every 1–2 s (DENSE CUT: 1–1.5 s) on phrase
  boundaries.

============================================================
D. MOTION (replaces v4.1 "locked camera / calm motion")
============================================================
Every shot has BOTH:
1. A CAMERA MOVE, named with a speed:
   CARTOON: slow pan left/right (≈ 12% of frame width per second), push-in (≈ 5%/s),
     tracking shot beside a moving character, slow orbit. Camera moving in ≥ 50% of shots
     (DENSE CUT: ≥ 70%).
   HUD: fast push-in (subject doubles in size over the shot), fly-through, dolly through
     a tunnel of data, orbit around the object. Camera moving in ≥ 90% of shots.
2. A SUBJECT ACTION that runs the WHOLE clip, with a strong verb and a speed word: "sprints",
   "slams", "spins fast", "fills up quickly", "crashes", "launches", "flips upside down".
   Plus 1–2 background motions (rain, sparks, speed lines, rising particles, flickering
   lights). EFFORT shots and the YOU character use the effort verbs and beats in D2.
- No shot may contain a frozen moment longer than 0.5 s.
- Allowed and encouraged: explosions, lightning, speed lines, impact stars, white flashes,
  fast zooms, smoke bursts. (v4.1 banned these. The references use them in every video.)
- Still forbidden inside a clip: scene changes, morphing one scene into another, warped faces.

============================================================
D2. STRUGGLE MOTION (shots whose line is about effort, weight, fatigue or resisting)
============================================================
Tag these shots EFFORT: LIFT / PUSH-PULL / CARRY / HOLD / SINK / TRUDGE / NOD-OFF. Usually 5–8
shots per video. Every other shot follows D unchanged.
1. THE FIVE BEATS (frames at 30 fps, after the edit speed)
   BRACE    4–8 f   body dips, feet plant, hands clamp, shoulders rise
   STRAIN   8–20 f  little or no progress; limbs and the object shake; sweat drops fly;
                    teeth clenched. A moving hold, never frozen.
   GIVE     3–6 f   the load wins for a moment: it drops a notch, a foot slides back, a knee
                    buckles
   RESOLVE  4–10 f  PUSH-THROUGH (one sudden fast move past the sticking point) or STALL
                    (collapse, slump)
   SETTLE   6–12 f  overshoot and settle; shoulders heave; breath puff, dust puff
   By shot length: 1.2–1.5 s = STRAIN + GIVE · 1.6–2.2 s = BRACE + STRAIN + GIVE + RESOLVE ·
   2.3–3.0 s = all five. The PEAK is the GIVE or RESOLVE frame; only the peak lands on the
   lock word.
2. IMAGE = the loaded start frame. The subject is already in BRACE or STRAIN, never standing
   neutral, with the effort signs drawn in so it reads even if the clip barely moves: bent
   knees, spine curved under the load, head below the shoulder line, 2–3 big sweat drops,
   short shake lines, a dark sweat patch, the surface already dented.
3. MOTION wording: "Camera: [move + speed]. Action: [subject] [effort verb] [object] with
   [body part]; [limbs] shake hard; big sweat drops fly off; the [object] slips back a little
   and [subject] [shoves/heaves] again, harder; repeating for the whole clip. Contact:
   [surface] squashes / bends, dust puffs on every slip. Background: [1–2 motions].
   Real-time speed, sudden jolts. 2D flat cartoon animation, same flat colours and bold
   outlines. One continuous shot. 5 s."
   EFFORT VERBS: heaves, hauls, drags, shoves, braces, clamps, buckles, staggers, stumbles,
     lurches, slips, slumps, sags, collapses, flops, trudges, plods, pants, gasps, jerks awake.
   BODY CUES: knees bend and shake, back curves, shoulders hunch up to the ears, arms lock
     straight, head drops, chest heaves fast, mouth open panting, teeth clenched, eyes
     squeezed shut, eyelids droop and snap open.
   WORLD CUES: cushion squashes flat, floor bends, ground cracks, rope pulls taut, shelf
     bows, dust bursts out, the object rattles.
   WEIGHT = TIMING CONTRAST, NOT SLOWNESS. Heavy things are slow to start and fast to drop:
     write "barely rises, then drops suddenly", never "moves slowly".
   NEVER WRITE in MOTION: slowly, slow movements, gently, smoothly, gracefully, floating,
     drifting, hovering, dreamy, ethereal, serene, cinematic, epic, majestic, slow motion,
     time-lapse, subtle, slightly, realistic sweat/skin, blood; a bare "heavy", "exhausted"
     or "struggling" without a body verb; feeling words; any script word in quotes.
4. FATIGUE VARIANTS (no object)
   TRUDGE: drags each foot, head hanging, shoulders heaving; stumbles once, catches himself,
     keeps going. PEAK = the stumble.
   NOD-OFF: head sinks, chin hits chest, jerks awake, sinks again. PEAK = the jerk.
   SINK: sinks into the [cushion/floor] like quicksand, which bulges up around the hips;
     arms flop. PEAK = the deepest drop.
   HOLD: holds [thing] up, arms shaking hard; it sinks a notch; shoves it back up.
     PEAK = the sink.
5. CAMERA FOR WEIGHT: low angle under a looming load; top-down or high angle for being
   pressed flat; slow push-in (≈ 5%/s) through STRAIN; tracking beside a trudge at walking
   pace. The body moves more than the camera. No orbit, fly-through or crane on an EFFORT
   shot. The impact jolt is added in the editor (POST HIT).
6. USE WINDOW AND LOCK (editor):
   a. Find the PEAK in the 5 s clip first.
      in-point = peak − (lock offset × speed); out-point = in-point + (shot length × speed).
   b. Line up the PEAK 1 frame before the lock word's card. Acceptable range: 3 frames early
      to 1 frame late.
   c. Slip the clip; never move the cut.
   d. Too few frames before the peak? Try, in order: the next cycle's peak; 1.5× before the
      peak; another take; start mid-STRAIN; or re-split the shot so the lock word opens it.
   e. Keep at least 4 frames before and 6 after the peak. Speed 1.2–1.5× through BRACE /
      STRAIN / SETTLE, 1.0× for 3 frames each side of the peak, never below 1.0×.
   f. Reject a take if hands melt, fingers multiply or the object passes through the body
      within 6 frames of the peak.
   POST HIT (impact locks only, at most 1 shot in 3): on the lock frame, punch the video
   layer in to 104% over 2 frames, then a 4–6-frame decaying mostly-vertical shake
   (≈ 15 px at 1080p, halving each frame), plus a low thud under the voice. Word cards stay
   on top and do not shake.
TEST BEFORE ADOPTING (6 generations): take one EFFORT shot and generate 3 MOTION variants,
   2 takes each: (A) plain D wording, (B) D2 wording, (C) D2 plus "slowly, heavy,
   cinematic". Score each take:
   - is there a peak, and at what clip second
   - are the hands intact at the peak
   - can you see the tell on your phone at arm's length
   - does the clip stay flat 2D
   Adopt the variant with the most usable takes. Drop any never-write word that turns out not
   to hurt in your tool.

============================================================
E. CRAFT RULES (kept from v4.1/v4.2)
============================================================
1. ONE SURPRISE per shot: one thing the viewer doesn't expect.
2. SPECIFIC PROPS: 3–5 props that belong only to this shot (CARTOON). HUD shots use one
   icon plus 1–2 HUD elements instead.
3. SCALE AND ANGLE CONTRAST: no three consecutive shots at the same shot scale or angle. Use
   top-down, low-angle and isometric views as well as close-up / medium / wide.
4. COLOUR FOLLOWS THE ARC: SYMPTOM/BELIEF = darker and tighter; MECHANISM = brightest and most
   saturated; LANDING = ordinary vast (Emotional Truth 5: first light, one lit window in a dark
   block, a night sky; never a sunset). No more than 3 consecutive shots in the
   same hue family. (HUD: alternate red-dominant and cyan/white-dominant shots.)
5. LIGHTING HAS A SOURCE: state it (CARTOON).
6. CAST ROTATION (CARTOON): person / object or ANIMAL with a face / crowd or multi-figure
   scene (2–5 characters, all moving) / abstract. No two adjacent shots share a type, except
   inside a jump-cut set.
7. TEXT BAND: the middle 30% of every image (where the word sits) must be clearly dark or
   clearly bright. Never a face or a mid-grey/beige surface there.
8. ANTI-COPY: never reuse a hook, metaphor, prop or composition from any example in this
   prompt system or from the reference channels' videos. Exception: the lists in EMOTIONAL
   TRUTH, D2 and the MICRO-MOMENT LIBRARY are categories to choose from. Change the room,
   prop and angle, and never use the same micro-moment in two videos in a row.
9. MOTIF: the idea's motif returns at 2–3 beats. Flag those shots in the output.

============================================================
F. ON-SCREEN TEXT (editor only, never in AI generation)
============================================================
- Make the cards from the recorded VO with auto-captions, set to one word per caption.
- Font: heavy rounded or geometric sans, ALL CAPS, white #FFFFFF, blend mode DIFFERENCE.
- Size: cap height 14–15% of frame height for both cartoon presets. HUD cap height 6.5%. Centred, middle of
  frame.
- Every card cuts in on its word's first syllable and out when the next word starts.
- MINIMUM HOLD 6 frames (0.2 s). A faster word shares one card with the next word
  ("GIVE YOURSELF").
- LEGIBILITY FALLBACK: if a shot's centre is still mid-tone, use solid white with a soft
  40% black shadow on that shot only.

============================================================
G. EDIT, TRANSITIONS, SOUND
============================================================
- CUT ON THE WORD: the cut and the first card of the new phrase land on the same frame. The
  previous card never appears over the new shot.
- AUDIO HIT ON ≥ 70% OF CUTS (measured 64–83% in the references): soft whoosh, low impact,
  riser hit or glitch tick, under the voice.
- PUNCTUATION: CARTOON 1–2 one-frame white flashes. HUD 3–4 black beats + 1 white starburst.
- MUSIC: one continuous bed, never silent, energy rising into the landing. Final mix −14 to
  −16 LUFS integrated, true peak ≤ −1 dBTP. (The HUD channel mixes at about −25 LUFS. Don't
  copy that; it is just quiet.)

============================================================
H. GENERATION TIPS
============================================================
- Generate 3 image takes per shot and keep the best.
- Generate 5 s clips. Use only the most active 1.5–3.5 s.
- If a clip still moves too slowly, speed it to 1.2–1.5× in the editor (this is a production
  tip, not a measured value).
- Jump-cut sets: same image prompt + "same setting, different pose: [pose]".
- EFFORT shots: prompt a repeating cycle so the 5 s clip holds 2–3 peaks, then pick the
  cleanest peak (hands intact). See D2.6.
- The YOU character: one character sheet, reused as the reference image wherever your tool
  allows it.

============================================================
I. NEGATIVE PROMPTS (paste on every generation)
============================================================
IMAGE NEGATIVE:
text, letters, words, numbers, captions, subtitles, labels, signs with writing, logo,
watermark, signature, photorealism, realistic photo, film grain, noise, sketch, painterly
brushwork, blur, muted colours, pastel, washed-out, distorted anatomy, extra limbs, extra
fingers, deformed face, letterbox, black bars, split screen, collage, border
NEON HUD only, also add: daylight, sky, nature, landscape, skin texture
MOTION NEGATIVE:
static camera, frozen frame, slow motion, still image, floating, weightless drifting,
morphing, face distortion, warping anatomy, extra limbs, scene change, cut, transition, text,
letters, subtitles, logo, watermark, photorealism, flicker
CONTENT (all presets): add the DO NOT DRAW list from EMOTIONAL TRUTH 11.

============================================================
J. OUTPUT FORMAT
============================================================
PRESET: [CARTOON RUSH / DENSE CUT / NEON HUD] · MOTIF: [shape → shot numbers]
TOTAL: [n] shots · [mm:ss] at [wpm] wpm
FACT CHECK: [each claim → kept / rewritten as …]
PACE CHECK: shots = [n] (target ≥ words ÷ 11 CARTOON RUSH / ÷ 7 DENSE CUT / ÷ 6 NEON HUD) ·
  longest shot [x] s · shots > 3 s: [n] (DENSE CUT: max 1) · shots > 5 s: [n] · jump-cut
  sets: [n] · camera move in [x]% of shots · first cut at [x] s · final shot [x] s
TRUTH CHECK: mirror shots [n] (8–14) · strain shots in a row ≤ 2 · comic mirror shots ≥ 2 ·
  low point: shot [n] · release shot: shot [n] · every tell appears in both IMAGE and MOTION ·
  no D2 never-write word in MOTION · no quoted word in IMAGE or MOTION
CRAFT CHECK: list any shot that breaks a rule in C, D, D2, E or EMOTIONAL TRUTH and fix it
  before output.

Then one block per shot:
[SHOT 07] ~00:14.2 → 00:16.0 (1.8 s) · MECHANISM · cast: [type] · scale: [type] · set: [A1 / —]
  · MIRROR: [yes / no] · EFFORT: [none / LIFT / PUSH-PULL / CARRY / HOLD / SINK / TRUDGE / NOD-OFF]
WORDS: "exact words this shot covers"
THE FEELING (planning only): [the viewer's moment: time, place, body part]
  → carried by: [the one body cue]
BODY TELL: [one cartoon tell from Emotional Truth 3, on the main subject]
  (non-mirror shots: OBJECT FORCE: [sag / bow / crack / sweat on a face-object] or none)
SURPRISE: [one unexpected thing; may be the tell]
IMAGE: [preset look statement]. [Subject already in the start pose of the action (EFFORT shots:
  the BRACE/STRAIN pose), with the tell drawn on] in [setting with specific props / HUD
  elements]. [Light source]. [Colours for this phase]. Centre of frame [dark / bright].
  Nothing written.
MOTION: Camera: [move + speed]. Action: [subject verb + speed, done WITH the tell, lasting the
  whole clip; EFFORT shots: D2 wording with one clear peak]. Background: [1–2 motions].
  [EFFORT: Real-time speed, sudden jolts. | other shots: Energetic, fast, continuous.]
  2D flat cartoon animation. One continuous shot. 5 s.
LOCK (editor only): lock word at +[s.ss] s into the shot · PEAK = [the one frame]
USE: peak at clip [x.x] s · in [a] → out [b] · speed [1.0–1.5×, 1.0× at the peak]
CUT IN: hard cut on "[word]" + [whoosh / impact / riser / glitch] | white flash | black beat
POST HIT: [none | punch-in 104% + 5-frame shake + low thud on the lock frame]
SCRIPT: [paste the script, NOUN LIST, PHASE MAP and EMOTION ARC from Prompt 2]
```

---

## EDITOR CHECKLIST: measure before posting

| Check | How | Pass |
|---|---|---|
| Speaking speed | words ÷ seconds of speech × 60 | 185–210 wpm |
| Shot count | count cuts + 1 | ≥ words ÷ 11 (Cartoon) / ÷ 7 (Dense Cut) / ÷ 6 (HUD) |
| Longest shot | timeline | ≤ 8 s Cartoon (at most 2 over 6 s) / ≤ 5 s Dense Cut (only one over 3 s) / ≤ 3 s HUD |
| First cut | timeline | ≤ 2.0 s (Dense Cut ≤ 1.5 s), or a character in full motion from frame 1 |
| Frozen frames | scrub every shot | nothing holds still longer than 0.5 s |
| Gaps in the voice | waveform | none over 0.3 s except the two ⏸ beats |
| Word cards | captions track | every card ≥ 6 frames; no old word over a new shot |
| Cuts on audio hits | listen at every cut | ≥ 70% |
| Final shot | timeline | 3–5 s (Dense Cut 2.5–4 s), ends ≤ 0.5 s after the last word |
| Loudness | export meter | −14 to −16 LUFS, peak ≤ −1 dBTP |
| Text legibility | watch at phone size | every word readable; fall back to solid white if not |
| Word lock | step through each EFFORT shot | the peak frame lands 3 frames early to 1 frame late on its lock word |
| Body tells | watch at phone size, arm's length | every mirror shot's tell is visible; 8–14 mirror shots; a release shot in the landing |
| POST HIT | timeline | impact locks only, at most 1 shot in 3 |
| AI label | upload screen | AI-generated content label ON |
