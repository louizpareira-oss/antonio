# The format formula (measured, not guessed)

Sources: OpenCV measurement of every frame (`scripts/measure_reference.py`) + frame-by-frame checks in
`breakdowns/`. A, B, C = creator 1 (myths, low-poly). D, E, F, G = creator 2 (casino/law, polished, same format).

## Numbers (creator 1, verified shot lists)
| | A Baldr | B Asgard wall | C Sun Wukong | Target for us |
|---|---|---|---|---|
| Length | 79.5 s | 69.6 s | 84.8 s | **65–85 s** |
| Words | 264 | 258 | 333 | 230–300 |
| Words per minute | 199 | 222 | 236 | **200–230** |
| Camera setups | 49 | 42 | 33 | 35–50 |
| Mean shot | 1.62 s | 1.66 s | 2.57 s | **1.6–2.2 s** |
| Median shot | 1.17 s | 1.43 s | 2.80 s | ~1.4 s |
| Shots < 1 s | 21 | 11 | 4 | montages only |
| Longest shot | 5.4 s | 4.6 s | 6.4 s | ≤ 5 s |
| Caption chunk | 1–4 words, mean 2.75, 0.83 s | 3.1 words, 0.85 s | 3.17 words, 0.81 s | **1–4 words, ~0.8 s** |
| Loudness | −14.3 LUFS, TP −0.7 | −14.3, TP −0.8 | −14.3, TP −0.9 | **−14 LUFS, TP ≤ −1** |
| Silence gaps | one 0.7 s (death beat) | none | none | one planned pause max |
| Brightness (luma) | day 85–110, night 6–33 | mean 79 | mean 96, arc 73→110 | day 90–120 |
| Pace over time | — | — | 13 cuts in 1st half, 19 in 2nd | **accelerate into the climax** |

Creator 2 (D 90.5 s at 191 wpm, 28 setups, 3.23 s mean; E 89.7 s at 202 wpm, 15 long takes, 5.98 s mean; F 63.8 s at 198 wpm and 16 setups; G 78.9 s at 202 wpm and 25 setups / 3.16 s mean;
two of the files are only 202×360) keeps the same length, pace and caption system, uses LONGER shots with camera flights
instead of cuts, and adds: POV hands, macro inserts of props, top-down machine shots, 3D text, mock phone UI,
practical lights (chandeliers, neon, screens), PBR materials and chips/cards physics. Full teardowns land in
`breakdowns/ref-D…G-breakdown.md`.

## Story beats (all references follow this)
| Time | Beat | Example (paraphrased, never reuse their words) |
|---|---|---|
| 0–3 s | **Impossible hook** in the second person, mid-action | "Everything in the world swore it can't hurt you…" |
| 3–8 s | **Who you are**: "You're <name>, the <role>." | |
| 8–25 s | **The rule / the deal / the power** (how it works, 3 quick examples) | montage of objects swearing an oath |
| 25–45 s | **The game / escalation**: you exploit it, it gets bigger | gods throwing things for fun |
| 45–60 s | **The trickster / the catch**: one detail breaks it | the one plant nobody asked |
| 60–75 s | **The cost**: death, punishment, loss (a grade change, a silence) | |
| last 5 s | **Twist + loop**: a last fact or a line that sends you back to the first frame | "And that old woman? Probably…" |

## Camera grammar (A verified, 49 setups)
- Slow push-in is the default move (scale 1.04–1.15 over 0.7–2.6 s, linear). Fast exceptions for shock (×2.6–×7 with ease-in).
- Hold + whip-pan montage for lists (hold 0.3–0.6 s, whip 4–6 frames).
- In-take camera flights/orbits instead of cuts (5–13 fast frames easing into a hold).
- Trucks with real parallax; pull-out/crane back for scale reveals; locked-off only for emotional beats.
- Dutch roll 2–10° in dreams and suspense. Low angle (0.3–0.6 m) for power/menace, high/top-down for overview and death.
- Lens: normal, ~45–55° vertical FOV, no depth of field (creator 2 uses shallow DOF on macro inserts — we add it).
- Shot sizes: WS 35 %, MS/inserts 45 %, MCU/CU 15 %, ECU 5 %.

## Light grammar (8 presets reused across videos; recipes in style-bible.md)
Day exposition · dusk oath (pink/magenta) · candle interior (secret, deal) · sunset gold (tension) · nightmare red void ·
underworld hall · cave dusk · prop showroom. Grade punctuation: instant B&W on the turn, white flash on impact.

## Edit grammar
- Cuts lead the next caption chunk by ~0.13 s (35 of 48 cuts within 0.2 s of a chunk change).
- New noun = new picture (each listed thing gets its own 0.3–0.6 s shot).
- The punchline word lands on a cut or a hard light change.
- Transitions: hard cuts ~90 %, whip pans in montages, flash on impact, grade switch on the turn.

## Captions
White, sentence case, bold sans (Inter/Montserrat SemiBold look), text height ≈ 0.03 of frame height, centred, one line,
max width ≈ 0.55 of frame, y ≈ 0.70–0.72, soft dark shadow, no box, no word highlight, hard on/off per chunk.
(We keep this: it is calm and readable; our only change is +15 % size and a 2 px darker shadow for small phones.)
