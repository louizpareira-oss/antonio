# Reference style, measured

Six reference videos supplied by the owner, analysed frame by frame with ffmpeg and OpenCV
(30 fps, every frame read). Every number below was measured. The one thing I could not
measure, the exact font, is marked **estimate**.

| # | Size | Length (content + platform end card) |
|---|---|---|
| V1 | 1024×576 (16:9) | 69.0s + 4.0s |
| V2 | 768×576 (4:3) | 50.0s + 19.4s |
| V3 | 1024×576 (16:9) | 70.7s + 4.0s |
| V4 | 1024×576 (16:9) | 69.0s + 4.0s |
| V5 | 1024×576 (16:9) | 73.0s |
| V6 ("Lock In") | 1024×576 (16:9) | 69.0s |

**V1, V3, V4, V5, V6 are one consistent style. V2 is a different style**
(see the last section). The spec below is the V1/V3/V4/V5/V6 style. V6 matches the others on every measure (169 word cards, 147/min, 0.33s median hold, 18 shots of 3.8s mean).

> The footage in these references is existing studio explainer animation re-cut under a
> voiceover. Reusing that footage is exactly what the "low quality / unoriginal" rejection is
> about. Match the *style*. Generate every frame new.

---

## 1. Kinetic text: the signature

| Property | Measured |
|---|---|
| Which words | **Every spoken word.** 166–169 word cards per ~70s (136–146 per minute), matching speech rate. Not keywords. |
| Hold per word | median **0.33s** (10 frames), mean 0.41s |
| Entrance / exit | **Instant swap on a single frame.** No fade, pop, scale or slide (frame-by-frame check). |
| Position | Dead center: word center at **50.0% x, 49.7% y**, every video. |
| Size | Cap height **13–15% of frame height**. Typical word width 26–37% of frame width (long words up to 65%). |
| Case | ALL CAPS. Punctuation kept ("YOU'RE", "\"LIFE\"", "100%"). |
| Color | **White text in Difference blend mode.** Each letter shows 255 minus the pixel behind it, so color changes inside a single word wherever the background changes: navy over yellow sky, lime over purple, cream over dark navy, light blue over a dark head. Pixel test: up to 67% of changed pixels match exactly; the rest is compression and edges. |
| Outline / shadow | **None.** |
| Font | **Estimate:** heavy geometric sans with slightly softened corners. Closest free matches: **Rubik Black**, then Montserrat Black. |

Occasional extra overlays (all edit layers):
- Small **coral-red #E35561 rounded pill** (sampled), top center, white sentence-case text ("2 days later", "85 Years Old").
- **Counter pill** at bottom center (a "💀 1,000,000,000" style tally).
- **LED dot-matrix panel** (sampled): navy #0F3D76 dots with a golden #E0CD6E dot band on top. The word sits on it in lavender #CBC0E0 or peach (V1 "ALMOST", "MINUTE"; V4 "HEAVY", "TODAY", "IS", "OUT", "TINY", "YOUR").

## 2. Shots and cuts

| Property | V1 | V3 | V4 | V5 |
|---|---|---|---|---|
| Shots | 13 | 14 | 11 | 18 |
| Mean / median length | 5.3s / 3.2s | 5.1s / 3.9s | 6.3s / 6.1s | 4.1s / 4.0s |
| Range | 0.4–20.8s | 2.6–12.1s | 0.2–10.7s | 1.7–9.6s |

- **About 80% hard cuts.** The rest are short 3–9-frame transitions.
- Pace is uneven on purpose: long holds of 8–20s, then a **rapid montage of 0.4–1.4s cuts**
  on a list or emphasis line (V1 57–61s).
- A shot covers a phrase or sentence. Many word cards play over one shot.

## 3. Camera

Similarity transform estimated every 0.5s on the background (text band and watermarks masked out):
- **~40% of shots: fully static** (scale 1.00, pan ≈ 0).
- **Most others: slow push-in or pull-out of 1–3% per second**, sometimes with a gentle pan.
- **A few emphasis shots: fast push of 10–17% per second.**
- Never handheld or shaky. No rotation.

So the rule is **static or slow zoom**, not "always static".

## 4. Motion inside the shot

- Frames with no background change: 18% (V1), 21% (V3), 46% (V4), 23% (V5). That means held poses
  and partly limited animation, not constant full motion.
- Median per-frame change while moving is low (~2 on a 0–255 scale): **gentle, continuous**
  character acting and ambient motion (drifting particles, twinkling stars, bobbing heads).
- Bursts are reserved for beats: papers exploding, starbursts, a monster lunging (90th percentile up to ~12).

## 5. Composition

Measured from frames, not assumed:
- **Subjects fill the frame**: big characters at center, close-ups of faces, a character's back
  of head filling half the frame, full environments edge to edge.
- **The word sits on top of the subject.** No empty space is reserved for it. The Difference blend
  is what keeps it readable on any background.
- So the earlier v2.x rule ("character in lower third, upper 45% empty") **is not in the
  reference** and works against the look.

## 6. Color

k-means palette over the content frames (share of pixels):
- V1: #160728 28% · #440D77 22% · #6E05C4 11% · #AD82E1 11% · #5E54C3 8% · #DFD9E8 8% · #DEC85F 7%
- V3: #0D0D34 28% · #400E79 26% · #2A815B 11% · #D6B147 9% · #A73537 7% · #30B5CB 7% · #B348C0 6%
- V4: #1A082E 25% · #134168 17% · #45059D 16% · #E8CB44 10% · #A25F35 9% · #D8D4C9 8% · #B932D2 8%
- V5: #0E0D37 36% · #330F7F 15% · #44C4D3 12% · #EABB2A 10% · #347953 9% · #8232D7 7% · #C33749 6%

What this means:
- **Base is deep violet and navy:** #0E0D37, #160728, #1A082E. That's darker than the v2.x
  "#131650 floor", so drop that rule.
- **Signature mid tone is electric purple:** #440D77 to #6E05C4.
- Accents: golden yellow (#DEC85F to #EABB2A), cyan (#30B5CB to #44C4D3), forest green, magenta, coral red.
- **Bright full-frame scenes are common:** yellow living room, cyan bedroom, orange jungle, mint
  park, roughly 1 in 3 shots.
- Mean saturation 71–79%, mean brightness 54–58%: saturated, mid-dark.

## 7. Illustration style (from the frames)

- Flat vector, solid fills, **soft gradient lighting and glows**, rim light on edges. No outlines.
- **Grain: none.** High-pass noise in flat areas is 0.00–0.05 (V2: 1.64, visible grain and scanlines).
- **Vignette: soft.** Frame edges average 0.65–0.73× the center brightness (V2: 0.46).
- Characters: rounded, chunky cartoon people with **simple faces** (dot or round eyes, small
  mouth, big expressive brows). Lots of animals (birds, monkeys, platypus, rabbit, sabre-tooth cat).
  Often seen from behind or in tight close-up.
- Worlds: night jungles, purple cosmos, glowing cities, cozy rooms, graveyards, micro-biology
  blobs, math-equation backdrops. Literal or comic visual metaphors for the line.

## 8. Audio

- **Continuous music bed under the voice.** Zero silences longer than 0.4s below −45 dB.
- **Cuts land on audio beats.** Sound onset strength at cuts is 1.4–1.7× the strength at random moments (V1, V3, V4, V5).
- **No whoosh on every cut.** The high-frequency (>4 kHz) band at cuts is about the same as at random
  moments (1.0–1.4×), so SFX are subtle and sparse.
- Voice pitch varies by video (median 127–212 Hz), so it isn't one fixed voice.
- Integrated loudness **−15 to −18 LUFS**, loudness range **3–5 LU**, so heavily compressed and
  steady. Speech is ~140–146 wpm.

## 9. Format

The references are **16:9 horizontal**, and the owner confirmed 16:9 horizontal is the
production format. Master prompt system v3.0 is built on 16:9.

---

## V2: a different style

- Text: **small white bold italic, Title Case**, one keyword per ~2.5s (13 cards in 50s). Normal
  blend, not Difference.
- Art: textured explainer illustration with **CRT scanlines and grain**, symbolic objects
  (DNA hourglass, golden scales, chain, asteroid, Earth).
- Camera: frequent slow push-ins (1–3%/s), one fast 41%/s push.
- 4:3 frame.

It doesn't match the other five. Don't blend the two styles.
