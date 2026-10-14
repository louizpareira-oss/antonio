# Hand-off: "Your Brain Isn't the Enemy" (master prompt v5, CARTOON RUSH)

This is everything Prompt 3 needs that you didn't have yet: the preset, Prompt 3 sections A–F
(copied word for word from [`master-prompt-v5.md`](master-prompt-v5.md)) and the Prompt 2 output
(script, fact check, PHASE MAP, NOUN LIST). You already have G–J (edit/sound, generation tips,
negative prompts, output format). Paste the block below, then paste G–J under it.

**Preset: CARTOON RUSH.** It matches your flat-vector look, and the merchant/market metaphor is a
cartoon world (stalls, coins, characters). A brain topic in NEON HUD would look like a copy of
@thecognitionswitch.

```
PRESET 1 — CARTOON RUSH   (measured from @iddietothissong, 2 videos)
LOOK: saturated flat-vector cartoon. Candy purple, electric lime, hot orange, cyan, magenta.
  Measured mean saturation 0.76–0.78 (your v4.1 video: 0.58). Never pastel, never muted.
PACE: 19 shots per 69 s. Average shot 3.6 s, median 2.7–3.5 s. At most 1 shot in 5 is longer
  than 5 s; longest 8 s. About 12 spoken words per shot.
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

============================================================
PROMPT 3 — SECTIONS A–F (verbatim from master-prompt-v5.md)
============================================================
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
- SHOT LENGTH: CARTOON 1.5–5 s (max one shot per video up to 8 s). HUD 1.2–3 s, never longer.
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
3. SCALE CONTRAST: no three consecutive shots at the same shot scale.
4. COLOUR FOLLOWS THE ARC: SYMPTOM/BELIEF = darker and tighter; MECHANISM = brightest and most
   saturated; LANDING = vast (sky, space, horizon). No more than 3 consecutive shots in the
   same hue family. (HUD: alternate red-dominant and cyan/white-dominant shots.)
5. LIGHTING HAS A SOURCE: state it (CARTOON).
6. CAST ROTATION (CARTOON): person / object with a face / crowd / abstract. No two adjacent
   shots share a type, except inside a jump-cut set.
7. TEXT BAND: the middle 30% of every image (where the word sits) must be clearly dark or
   clearly bright. Never a face or a mid-grey/beige surface there.
8. ANTI-COPY: never reuse a hook, metaphor, prop or composition from any example in this
   prompt system or from the reference channels' videos.

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
PROMPT 2 OUTPUT — PASTE AS "SCRIPT"
============================================================
1. TITLE: Your Brain Isn't the Enemy

2. SCRIPT
Why can you scroll for two straight hours,
but can't start one five-minute task?
The laptop lid weighs a hundred pounds.
Your body sinks into the couch.
But your thumb keeps swiping by itself.
You think it's laziness.
That something in you is broken.
But scientists have a name for this.
It's called effort discounting. It isn't a flaw. [FACT]
Picture a merchant at a market stall inside your head.
Every task walks up with a price tag.
The price is effort: time, focus, boredom.
The payment is the reward you expect to get.
Relief, pride, or a finished thing.
Before you move a finger,
the merchant weighs both on a scale. [FACT]
Big price, small payment? Deal rejected.
And payments that arrive later look smaller. [FACT]
A report due in three weeks pays in fog.
That's like working for free.
Your phone pays a shiny coin every swipe.
Of course the merchant takes that deal.
It's not laziness. It's bookkeeping.
⏸
That's why the laptop feels heavy
and the phone feels light.
One only costs. The other only pays.
⏸
Cut the price to one sentence.
Pay it with a checkmark.
Your brain isn't the enemy.
It's a merchant. Give it a deal.

3. WORD COUNT: 199 words. ESTIMATED LENGTH: ~64.0 s at 190 wpm (incl. two 0.6 s beats).
   All lines 4–10 words.

4. FACT CHECK
| Claim | Status | Wording used |
| "It's called effort discounting." | Well-established term: the value of a reward is discounted by the effort it costs (cognitive effort discounting, e.g. Westbrook, Kester & Braver, 2013). Verify the citation before posting; do not name a university on screen. | Kept |
| "the merchant weighs both on a scale" (the brain weighs effort against expected reward) | Well-established cost–benefit account of effort-based decisions. Said as a metaphor. | Kept |
| "payments that arrive later look smaller" | Well-established: delay (temporal) discounting. | Kept |
| "Your phone pays a shiny coin every swipe." | Metaphor for small, immediate rewards. Not a claim about dopamine or addiction. | Kept as metaphor; no "dopamine hit" |
| "It isn't a flaw." | The video's interpretation, not a measured fact. | Kept, framed as the reframe |

5. ELEVENLABS: Speed 1.10–1.15, stability below default for energy, 2 takes. In the editor,
   delete every gap over 0.3 s except the two ⏸ beats. Target 185–200 wpm.

6. PHASE MAP (start times at 190 wpm)
| Start | Phase | Words | Length | Lines |
| 0.0 s | HOOK | 14 | 4.4 s | 1–2 |
| 4.4 s | SYMPTOM | 20 | 6.3 s | 3–5 |
| 10.7 s | WRONG BELIEF | 10 | 3.2 s | 6–7 |
| 13.9 s | PIVOT | 15 | 4.7 s | 8–9 |
| 18.6 s | MECHANISM | 99 | 31.3 s (49%) | 10–23 |
| 49.9 s | ⏸ beat | — | 0.6 s | — |
| 50.5 s | PAYOFF | 18 | 5.7 s | 24–26 |
| 56.2 s | ⏸ beat | — | 0.6 s | — |
| 56.8 s | LANDING | 23 | 7.3 s | 27–30 |
Line-by-line starts: 0.0 · 2.5 · 4.4 · 6.6 · 8.5 · 10.7 · 12.0 · 13.9 · 16.1 · 18.6 · 21.8 ·
24.3 · 26.5 · 29.4 · 31.3 · 32.8 · 35.1 · 36.9 · 39.2 · 42.0 · 43.6 · 46.1 · 48.3 · ⏸ · 50.5 ·
52.4 · 54.0 · ⏸ · 56.8 · 58.7 · 60.3 · 61.8 → end ≈ 64.0
RUNNING METAPHOR: the brain as a merchant at a market stall (price = effort, payment = reward).
IDENTITY FLIP: "enemy" → "merchant you can make a deal with".
MECHANISM RULE: two sides (price, payment) → the landing acts on both (cut the price, pay
with a checkmark).

7. NOUN LIST (drawable nouns and actions, in order; [line])
 1. thumb scrolling a phone while a clock spins through two hours [1]
 2. one tiny five-minute task (a single sticky note) nobody touches [2]
 3. a laptop lid as heavy as a hundred-pound weight [3]
 4. a body sinking into a couch like quicksand [4]
 5. a thumb swiping on its own [5]
 6. "laziness": the viewer seeing a sloth in the mirror [6]
 7. "broken": a cracked figure with a loose spring [7]
 8. cartoon scientists peering at the couch scene through a giant magnifying glass [8]
 9. "effort discounting / not a flaw": a price tag with a sale slash; the cracked figure's
    crack sealing shut (no written words anywhere) [9]
10. a merchant at a market stall inside a cut-away head [10]
11. a task (walking box or envelope) arriving with a price tag [11]
12. price = effort: a clock (time), a spotlight (focus), a yawning cloud (boredom) [12]
13. payment = reward: a coin pouch [13]
14. relief (a sigh cloud), pride (a medal), a finished thing (a completed tower) [14]
15. the merchant weighing price tag against coins on a scale [15–16]
16. "deal rejected": the stall shutter slamming down [17]
17. coins shrinking as they travel down a long road into the distance [18]
18. a report on a far-off calendar page lost in fog [19]
19. a worker carrying boxes for an empty pay envelope [20]
20. a phone spitting shiny coins with every swipe, like a slot machine [21]
21. the merchant grabbing the phone's coins happily [22]
22. bookkeeping: ledger and abacus, the merchant tallying [23]
23. the laptop sinking and the phone floating on a seesaw [24–25]
24. the laptop swallowing coins, the phone spitting them out [26]
25. scissors snipping a giant price tag down to a tiny one [27]
26. a checkmark turning into a gold coin that drops into the merchant's palm [28]
27. the brain pulling off a villain mask [29]
28. the merchant and the viewer shaking hands over the stall [30]
Shot count for CARTOON RUSH: 199 ÷ 11 = 18.1 → at least 19 shots. 28 nouns, so group
neighbouring nouns into shots. Jump-cut set candidates: nouns 3–5 (the couch room, re-posed
3 times) and nouns 10–16 (the market stall, re-posed).
```
