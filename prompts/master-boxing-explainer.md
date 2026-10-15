# Master prompt — Boxing Technique Explainer Shorts

Saved as received. The notes at the bottom record where it conflicts with the rest of this repo and
with the reference account it is modeled on. First run: [`scripts/02-you-cant-slip-what-you-see.md`](../scripts/02-you-cant-slip-what-you-see.md).

```
MASTER PROMPT SYSTEM — Boxing Technique Explainer Shorts
# One prompt to run everything. Save this entire block in your Docs.

---
INSTRUCTIONS:
1. Replace [YOUR THEME] below with your topic (e.g. "how to slip punches")
2. Paste this whole block into chat
3. It will output: 10 ideas → selected idea → full script → fact check → ElevenLabs notes → complete scene-by-scene AI prompts
4. Generate each image/video clip one at a time in OpenArt AI from the final scene list
---

RUN FULL WORKFLOW FOR THEME: [YOUR THEME]

FULL SYSTEM RULES:
- Output: 60–75s total, 16:9 horizontal, faceless, NO recurring character, NO real named boxers, NO app/bio links
- Visual default: flat 2D vector, solid shapes, no outlines, no 3D, no photorealism, no text in AI generation
- Palettes: Sepia Legend / Navy Precision / Noir Intensity / Vibrant Explainer — match emotion phase
- Cast types rotate per scene: person / anthropomorphic object / crowd-silhouette / abstract-concept — no repeats adjacent
- Every scene has: unique surprise element, 3–5 specific props, scene-specific motion, defined light source, shot scale varies, color follows emotion
- Motion: locked camera, slow environmental motion only, action resolves in ~1s then hold, calm pace
- Negative prompts included for every generation
- Text/transitions/SFX added later in editor — never in AI

STEP 1 — CONTENT IDEAS:
Generate 10 video ideas on the theme above. Each includes: TITLE (3–6 words), HOOK (4–9 words, contradicts assumption), ANGLE (surprising reframe), TURN (problem→action), VISUAL WORLD (3 realized mini-worlds with details), FACT TO VERIFY, EMOTION ARC (start→end emotion + color mood per phase). No real public figures. Practical, actionable advice.

STEP 2 — SELECT BEST IDEA & WRITE SCRIPT:
Pick the strongest idea. Write full voiceover: 150–175 words, ~145 wpm = 60–75s. Structure: HOOK → PROBLEM → REFRAME → TURN → LANDING. Short lines 3–12 words, blank line = 0.5s breath. Tone: calm, certain, coach-like, no hype. Label every line with phase. Mark factual claims [FACT]. Output: TITLE, SCRIPT, WORD COUNT/LENGTH, FACT CHECK TABLE (claim → status → safer wording), ELEVENLABS SETTINGS (pace, tone, pauses), EMOTION-PHASE MAP.
STEP 3 — SCENE-BY-SCENE AI PROMPTS:
Convert script to full production plan. For every scene:
- Time range + duration
- Cast type / Emotion phase / Shot scale / Surprise element
- Exact spoken line + word card timings
- IMAGE PROMPT: style + subject + pose + location (3–5 props) + light source + color — flat vector, no text, 16:9
- MOTION PROMPT: locked camera, action resolves in 1s, 2–3 unique background loops, calm pace, no transitions inside clip
- NEGATIVE: text, 3D, photorealism, outlines, grain, logos, camera movement, morphing, flicker
- TRANSITION IN: hard cut (default) or max 2–3 total whip/glitch
- SFX cue or none
- Label or none
Final craft check: all rules satisfied — list/fix any violation. End ready to copy/paste each scene prompt directly
```

---

## Repo notes (read before running it again)

1. **Use 9:16 vertical, not 16:9.** Both reference videos from @jabmaxapp are 9:16
   (see [`docs/10-jabmax-reference-teardown.md`](../docs/10-jabmax-reference-teardown.md)), and
   [`docs/03-technical-spec.md`](../docs/03-technical-spec.md) requires 1080×1920 full bleed. When
   you run this prompt, add the line: *"Override: 9:16 vertical, 1080×1920, top third empty for headline."*
2. **Length.** The prompt allows 60–75s. Creator Rewards only pays above 60s, so aim for 65–75s and
   never export under 62s.
3. **"No recurring character" does not match the reference look.** @jabmaxapp uses one demonstrator
   figure in every shot. The rotating cast works, but put the technique on the *person* scenes and use
   the other cast types for metaphor beats. Script 02 does this.
4. **Word cards and labels are the reference's real engine.** A two-line headline changes about every
   2 seconds. That happens in the editor, not in the AI generation, so plan it from the word-card
   timings.
5. Turn on TikTok's AI-generated content label for every upload that uses these clips.
