# 11. Master prompt v7 — merging the two v6 prompts

The copy-paste prompt is [`prompts/reynard-master-prompt-v7.txt`](../prompts/reynard-master-prompt-v7.txt).
It replaces both [`reynard-master-prompt-v6.txt`](../prompts/reynard-master-prompt-v6.txt) and the
"Rotating Cast / Cinematic Story v6.0" prompt.

## The verdict on "Rotating Cast / Cinematic Story v6.0"

It is the better-engineered prompt: it protects the character, the facts and the continuity
better than anything before it. But it is written to *avoid mistakes*, not to *win the first
second* — and it quietly removes the things that make a series recognisable. Followed as
written, it produces slower, calmer, well-made shorts that all feel different from each other.

## What it does better — kept in v7

| Idea | Why it matters |
|---|---|
| The attached reference is the source of truth; a PROVISIONAL label when it's missing | Stops the AI from redesigning Reynard from text |
| Cast the role in the conflict first, species second; counterparts can be skeptics, sellers, proud defenders | Stops "the same naive friend with different ears" |
| Barnaby optional; another counterpart *replaces* him instead of adding a third | Fixes the original two-characters-every-time problem |
| Reuse the exact voice asset ID; one speech method per shot | A text description alone never gives the same voice twice |
| Edit shots and generated clips are different units, mapped explicitly | Makes 25 shots practical with 5–10 s generators |
| Screen direction, eyelines, prop ownership, room layout | The continuity checks the earlier prompts lacked |
| Captions timed from the final voice track | Script estimates are always off |
| FACTUAL / FICTIONAL / MIXED labels; illustrations are not evidence | Protects the account from misinformation strikes |
| PLANNED vs VERIFIED in the quality check | Nothing counts as "done" before it has been rendered and checked |
| Physical background motion only; no swaying lamps, no floating dust | A fair correction to v5 and v6 |

## What it breaks — fixed in v7

| # | It said | Measured in the 5 reference videos | v7 |
|---|---|---|---|
| 1 | 10–16 shots for 75 s, most 3–7 s | A new shot about every 3 s (25–37 per video); the proof section cuts every 1.7–2.7 s | 22–30 shots; nothing over 4 s before the return without a reason. **Replaced in v7.2 by 11 long shots — see below** |
| 2 | Hook within "roughly 2–4 s"; "a quiet opening can work" | First spoken word at 0.2–0.9 s | First line within 0.5 s, object in frame 1 |
| 3 | 140–160 words for 75 s | 126–162 wpm with speech almost wall to wall → about 155–195 words for 75 s | 155–180 words, runtime maths shown |
| 4 | Five structures to rotate; TV, flashback and direct-to-camera ending "never required" | All 5 references use one spine: hook → challenge → portal → proof → return → moral | One fixed spine; the MODE (exposé, fable, pattern, demonstration) is what rotates |
| 5 | "Watch this" and a sign-off are optional; "no automatic engagement request" | 4 of 5 end on the same mantra with the follow ask built in, plus a visual signature | Three fixed signature moments: portal, payoff + mantra, outro sting |
| 6 | Two caption systems, including sentence fragments | The one sentence-caption video was the hardest to read; the other four use one bold word at a time | 1–2 bold words by default; fragments only for calm fables on request |
| 7 | "Platform-appropriate loudness rather than one universal target" | Every reference sits at −14 to −15 LUFS | −14 LUFS, −1 dBTP, every episode |
| 8 | Music "restrained", with occasional space without music; "a few" sounds | The music bed never stops; sound effects land on the words; booms at section changes | Continuous bed with one allowed drop-out; portal hit, riser, outro sting |
| 9 | Almost every rule is "may", "can", "optional", "not required" | — | Numbers are decisions: FIXED format, VARIES story |
| 10 | No 65 s floor, no export size, no safe-zone numbers, no AI label | [Doc 03](03-technical-spec.md) | All in the technical spec (1.5) |
| 11 | Meta text about not claiming to have heard the reference audio | — | Cut: it spends the model's attention on nothing |

## v7.1 — character reference sheets

Consistency now starts before the first shot: every on-screen character gets **one approved
9:16 reference sheet** (hero face, face rotation grid, T-poses, turnaround, walking pose), and
every shot is generated from crops of that sheet. The layout is yours; it lives in section 1.6
of the prompt, and Reynard's ready-to-paste version is
[`prompts/reynard-reference-sheet.txt`](../prompts/reynard-reference-sheet.txt).

Three changes to the sheet spec as it was written:

| Original wording | Changed to | Why |
|---|---|---|
| "Photorealistic appearance preserved 100% consistently" | The reference's own vintage cartoon style preserved 100% | "Photorealistic" would turn Reynard into a realistic fox and fight the style of every shot |
| "skin texture, hair" | fur colour, markings, fur texture, eyes | The whole cast are animals |
| A garbled line ("Fl basy pon remin trge…") | "Full-body poses stay large enough for every face, outfit and prop detail to read clearly, while the face sheet at the top keeps priority." | Best reading of the damaged text |

Two rules added around it:

1. **Design image first for new characters.** A whole sheet generated from text alone drifts
   from panel to panel. One approved full-body design image, then the sheet from that image.
2. **Shots use single-view crops, never the whole board.** A multi-panel board as a reference can
   make the model return a grid, several copies of the character, or the grey studio backdrop.
   The prompt picks the crop that matches each shot's angle (face close-up → FACE + 34, profile →
   the matching SIDE, from behind → BACK).

**Cost:** Reynard's sheet is made once (3–4 takes on Nano Banana Pro ≈ 120–160 credits). Each new
companion needs a design image and a sheet: roughly 150–200 credits, then reused whenever they
return.

## v7.2 — 11 long shots by default

Your call: 22–30 shots was too much to generate for every episode. Fewer, longer shots also mean
fewer places for a character to drift between clips. Every episode is now **exactly 11 shots**
(PART 4 of the prompt), each one a single clip of 5–12 s. A `SHOTS:` input changes the number
for a single episode.

The honest trade-off: the reference videos cut about every 3 seconds, and a long shot where
nothing changes feels slow. So v7.2 keeps each shot moving instead of cutting:

- **A fixed 11-shot map:** hook and challenge in two shots, the portal in one, five proof shots,
  two return shots, and one shot for the sign-off and outro together.
- **Timed beats:** every motion prompt has a camera move plus a new action or change at least every
  3–4 seconds ("0–2.5 s: … 2.5–5 s: …"). No shot runs over 12 s.
- **The proof changes inside its shots:** start and end frames, and one master frame shown in
  several states (made as image-to-image edits), instead of cutting to new pictures.
- **One lip-synced character per shot:** the other speaks off-screen, or the shot is wide.
- **Word-by-word captions** keep the rhythm on screen.

Two more changes came from building [Script 02](../scripts/02-seventy-percent-off.md) this way:

1. **Output E is now keyframes + motion.** One keyframe can serve several shots, such as the
   store floor shown red, honest and empty.
2. **Image prompts follow a fixed order:** style → look → "Characters:" (each full lock as its own
   sentence) → "Scene:" by name. Dropping a long description into the middle of a sentence made it
   unclear which details belonged to which character.

**Tools:** long clips need a tool that makes them: Kling 3.0 (up to 15 s), Wan 3.0 (up to 30 s) or
MiniMax H3 Max (up to 15 s). A long clip costs more than a 5 s one, so check the price per clip
length before generating.

## v7.3 — same rules, 30% shorter

The same prompt in about 30% fewer words (4,230 → 2,955). Wordy explanations became short rules
and the cast menu became a table. The style block, the reference-sheet template, Reynard's lock
and the mantra are word for word the same, and every rule, number and section number is
unchanged, so Script 02 and the sheet prompt still match it exactly.

→ Prompt: [`prompts/reynard-master-prompt-v7.txt`](../prompts/reynard-master-prompt-v7.txt)
