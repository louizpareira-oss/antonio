# MASTER PROMPT SYSTEM v5.1: Fast Explainer Shorts (16:9 horizontal)

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
| Shots | 14 | **19–33** | words ÷ 11 ≈ 19 (Cartoon) / words ÷ 6 ≈ 33 (HUD) |
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

---

## PROMPT 1: CONTENT IDEAS

```
ROLE: You are the Creative Director of a faceless short-form channel that makes 62–70 second
16:9 horizontal animated explainer videos. Every spoken word is shown on screen one at a
time. The videos are FAST: 185–210 words per minute, a new picture every 2–4 seconds, and a
camera that is almost always moving.

TASK: Generate 10 video ideas on the theme I give you, for the PRESET I name
(CARTOON RUSH or NEON HUD). If I don't name one, pick it per idea.

EVERY IDEA MUST HAVE:
1. TITLE: 3–6 words. The title phrase must be speakable as a line in the script.
2. HOOK: the first spoken sentence, 8–16 words, using ONE of these measured hook types:
   a. SYMPTOM QUESTION: "Why do you [relatable thing] even after/before [expected fix]?"
   b. COMMAND: a 2-word order, then why ("Lock in. …").
   c. CONFESSION: first person, "I don't want to [thing everyone secretly feels]…"
3. WRONG BELIEF: what the viewer currently blames (laziness, bad hearing, weak willpower).
4. MECHANISM: the real explanation in one sentence, with 4–8 DRAWABLE NOUNS (things that can be
   literally drawn or shown as an icon). List those nouns.
5. RUNNING METAPHOR: one system the whole video compares the viewer to (a machine, a network,
   an animal, a city, a body organ…). It is set up in the mechanism and paid off in the last
   line. FORBIDDEN: the brain-as-computer/supercomputer/processor metaphor. That one belongs
   to @thecognitionswitch.
6. IDENTITY FLIP: the last line turns the viewer's "flaw" into something that makes sense or
   is a hidden strength ("You aren't lazy, you're …").
7. FACT TO VERIFY: every number, study or named term the idea depends on, or "none".
8. EMOTION ARC: start emotion → end emotion, with a colour mood for each phase.
9. PRESET PICK: CARTOON RUSH or NEON HUD, with a one-line reason. NEON HUD suits brain / body /
   science-of-you ideas; CARTOON RUSH suits motivation / time / discipline / perspective.
10. MOTIF: one simple shape or object that returns at 2–3 beats (opening, mechanism peak,
   landing), e.g. a ring, a waveform, a coin, a doorway.

RULES:
- Themes: motivation, perspective, time, discipline, mortality, science-of-you.
- No real living people, brands or public figures as subjects.
- No idea may depend on a fact that cannot be checked. Never "Researchers at [named
  university] discovered…" unless the study is real and named in FACT TO VERIFY.
- No two ideas share a hook type AND a running metaphor.
- Do not reuse hooks, metaphors or props from any example in this prompt system.
OUTPUT: a numbered list, one block per idea, no commentary.
PRESET: [CARTOON RUSH / NEON HUD]
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
  NEON HUD: [BLACK] on 3–4 pivot words ("But…"); [FLASH] on the 1 reveal line. No [HOLD].

STRUCTURE (measured from the reference timelines; seconds are for a 65 s video):
1. HOOK (0–5 s, 12–18 words): the idea's hook. No greeting, no "in this video".
2. SYMPTOM (5–11 s): 2–3 physical, visceral images of the problem ("your limbs feel like
   concrete"). Second person.
3. WRONG BELIEF (3–4 s): "You think it's [wrong belief]."
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
Paste ONE preset block (CARTOON RUSH or NEON HUD). Every number in it is a hard rule.

============================================================
C. PACING (the main change from v4.1)
============================================================
- SHOT COUNT = script words ÷ 11 (CARTOON RUSH) or ÷ 6 (NEON HUD). Round UP.
- A NEW SHOT starts on every new drawable noun in the NOUN LIST (HUD) or every new sentence
  (CARTOON). One shot = one idea.
- SHOT LENGTH: CARTOON 1.5–5 s; at most 2 shots longer than 6 s (max 8 s), only on [HOLD]
  lines, never the final shot. HUD 1.2–3 s, never longer.
- FIRST CUT within the first 2.0 s, or (CARTOON only) a character in full motion from frame 1.
- FINAL SHOT 3–5 s. The video ends no more than 0.5 s after the last word. NO long landing hold.
- JUMP-CUT SETS (CARTOON): at least 2 per video. One setting, 3–4 re-posed variants
  (new pose, new angle, new framing), cut every 1–2 s on phrase boundaries.

============================================================
D. MOTION (replaces v4.1 "locked camera / calm motion")
============================================================
Every shot has BOTH:
1. A CAMERA MOVE, named with a speed:
   CARTOON: slow pan left/right (≈ 12% of frame width per second), push-in (≈ 5%/s),
     tracking shot beside a moving character, slow orbit. Camera moving in ≥ 50% of shots.
   HUD: fast push-in (subject doubles in size over the shot), fly-through, dolly through
     a tunnel of data, orbit around the object. Camera moving in ≥ 90% of shots.
2. A SUBJECT ACTION that runs the WHOLE clip, with a strong verb and a speed word: "sprints",
   "slams", "spins fast", "fills up quickly", "crashes", "launches", "flips upside down".
   Plus 1–2 background motions (rain, sparks, speed lines, rising particles, flickering
   lights).
- No shot may contain a frozen moment longer than 0.5 s.
- Allowed and encouraged: explosions, lightning, speed lines, impact stars, white flashes,
  fast zooms, smoke bursts. (v4.1 banned these. The references use them in every video.)
- Still forbidden inside a clip: scene changes, morphing one scene into another, warped faces.

============================================================
E. CRAFT RULES (kept from v4.1/v4.2)
============================================================
1. ONE SURPRISE per shot: one thing the viewer doesn't expect.
2. SPECIFIC PROPS: 3–5 props that belong only to this shot (CARTOON). HUD shots use one
   icon plus 1–2 HUD elements instead.
3. SCALE AND ANGLE CONTRAST: no three consecutive shots at the same shot scale or angle. Use
   top-down, low-angle and isometric views as well as close-up / medium / wide.
4. COLOUR FOLLOWS THE ARC: SYMPTOM/BELIEF = darker and tighter; MECHANISM = brightest and most
   saturated; LANDING = vast (sky, space, horizon). No more than 3 consecutive shots in the
   same hue family. (HUD: alternate red-dominant and cyan/white-dominant shots.)
5. LIGHTING HAS A SOURCE: state it (CARTOON).
6. CAST ROTATION (CARTOON): person / object or ANIMAL with a face / crowd or multi-figure
   scene (2–5 characters, all moving) / abstract. No two adjacent shots share a type, except
   inside a jump-cut set.
7. TEXT BAND: the middle 30% of every image (where the word sits) must be clearly dark or
   clearly bright. Never a face or a mid-grey/beige surface there.
8. ANTI-COPY: never reuse a hook, metaphor, prop or composition from any example in this
   prompt system or from the reference channels' videos.
9. MOTIF: the idea's motif returns at 2–3 beats. Flag those shots in the output.

============================================================
F. ON-SCREEN TEXT (editor only, never in AI generation)
============================================================
- Make the cards from the recorded VO with auto-captions, set to one word per caption.
- Font: heavy rounded or geometric sans, ALL CAPS, white #FFFFFF, blend mode DIFFERENCE.
- Size: CARTOON cap height 14–15% of frame height. HUD cap height 6.5%. Centred, middle of
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
static camera, frozen frame, slow motion, still image, morphing, face distortion, warping
anatomy, extra limbs, scene change, cut, transition, text, letters, subtitles, logo,
watermark, photorealism, flicker

============================================================
J. OUTPUT FORMAT
============================================================
PRESET: [CARTOON RUSH / NEON HUD] · MOTIF: [shape → shot numbers]
TOTAL: [n] shots · [mm:ss] at [wpm] wpm
FACT CHECK: [each claim → kept / rewritten as …]
PACE CHECK: shots = [n] (target ≥ words ÷ 11 or ÷ 6) · longest shot [x] s · shots > 5 s:
  [n] · camera move in [x]% of shots · first cut at [x] s · final shot [x] s
CRAFT CHECK: list any shot that breaks a rule in C, D or E and fix it before output.

Then one block per shot:
[SHOT 07] ~00:14.2 → 00:16.0 (1.8 s) · MECHANISM · cast: icon · scale: close-up · set: —
WORDS: "exact words this shot covers"
SURPRISE: [one unexpected thing]
IMAGE: [preset look statement]. [Subject + pose at the START of the action] in [setting with
  specific props / HUD elements]. [Light source]. [Colours for this phase]. Centre of frame
  [dark / bright]. Nothing written.
MOTION: Camera: [move + speed]. Action: [subject verb + speed, lasting the whole clip].
  Background: [1–2 motions]. Energetic, fast, continuous. One continuous shot. 5 s.
USE: seconds [a–b] of the clip · speed [1.0–1.5×]
CUT IN: hard cut on "[word]" + [whoosh / impact / riser / glitch] | white flash | black beat
SCRIPT: [paste the script, NOUN LIST and PHASE MAP from Prompt 2]
```

---

## EDITOR CHECKLIST: measure before posting

| Check | How | Pass |
|---|---|---|
| Speaking speed | words ÷ seconds of speech × 60 | 185–210 wpm |
| Shot count | count cuts + 1 | ≥ words ÷ 11 (Cartoon) / ÷ 6 (HUD) |
| Longest shot | timeline | ≤ 8 s Cartoon (only one over 5 s) / ≤ 3 s HUD |
| First cut | timeline | ≤ 2.0 s, or a character in full motion from frame 1 |
| Frozen frames | scrub every shot | nothing holds still longer than 0.5 s |
| Gaps in the voice | waveform | none over 0.3 s except the two ⏸ beats |
| Word cards | captions track | every card ≥ 6 frames; no old word over a new shot |
| Cuts on audio hits | listen at every cut | ≥ 70% |
| Final shot | timeline | 3–5 s, ends ≤ 0.5 s after the last word |
| Loudness | export meter | −14 to −16 LUFS, peak ≤ −1 dBTP |
| Text legibility | watch at phone size | every word readable; fall back to solid white if not |
| AI label | upload screen | AI-generated content label ON |
