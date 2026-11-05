# Reference A: "Nothing in the..." (Norse: Baldr and the mistletoe), frame-by-frame breakdown

Source analysed: `scratchpad/ref/A_nothing_in_the.mp4` (the downloaded copy: 360x640, 30 fps, H.264 ~405 kb/s,
AAC mono 48 kHz). Data: `scratchpad/ana/A_nothing_in_the/` (shots.json, per_frame.json, captions.json, audio.json,
50 contact sheets). I opened all 50 contact sheets plus extra per-frame strips (made with
`scratchpad/work/refA/strip.py`) at every suspicious point.

## Measured totals

| Item | Value | How it was measured |
|---|---|---|
| Duration | 79.53 s (2386 frames) | shots.json |
| Detector shots | 50 (avg 1.59 s) | shots.json |
| **Camera setups after checking** | **49** (mean 1.62 s, median 1.17 s, min 0.43 s, max 5.40 s) | 3 detector splits were grade or light changes, not cuts (27.533, 58.867, 76.733). I found 2 hidden cuts (27.367, 75.267). Two cuts are really 1 frame earlier than detected (10.433 not 10.467, 11.533 not 11.567). |
| Shot-length histogram | ≤1 s: 21, 1–2 s: 13, 2–3 s: 11, >3 s: 4 | corrected list |
| Narration | **264 words, 96 caption chunks** | cleaned OCR, checked against frames |
| Words per minute | **199 wpm** (over 79.5 s; ~201 wpm if you leave out the 0.7 s silence) | words / duration |
| Words per caption | mean 2.75 (1 word: 17, 2: 16, 3: 37, 4: 26). Never more than 4 | cleaned chunks |
| Caption on-screen time | mean 0.83 s, median 0.80 s, min 0.30 s ("Loki." 29.3–29.6), max 1.9 s | chunk starts |
| Loudness | −14.3 LUFS integrated, LRA 2.5 LU, true peak −0.7 dBFS | audio.json (EBU R128) |
| Silence | one gap only: 56.46–57.16 s (0.70 s) | audio.json + 50 ms RMS |
| Audio floor between phrases | ~−27 dBFS RMS (5th percentile −26.5 dB). Only 11 of 1591 50-ms windows fall below −45 dB, and all of them are inside that 0.7 s gap | my RMS pass over the extracted audio |
| Picture brightness | Daylight shots luma ~85–110. Night/candle/cave shots 6–33 | shots.json light_mid |

**Hidden or mislabelled transitions I checked frame by frame.** A cut is a "flight" when the camera physically travels inside one take:

- In-take camera flights, **not cuts** (the detector was right not to cut): 8.77–9.20 (shot 3, crane back),
  12.4–13.2 (shot 7, flight over field), 24.03–24.20 (shot 17, orbit), 29.73–30.93 (shot 22, foreground-tree wipe),
  37.0–38.0 (shot 24, accelerating push), 42.4–43.6 (shot 27, arc dolly), 47.67–47.83 and 49.10–49.27 (shot 31, 5-frame whip/rush),
  52.6–58.0 (shot 34, one 5.4 s take), 69.8–71.0 (shot 46), 72.4–75.2 (shot 47).
- **Real hidden cuts:** 27.367 (f821: Baldr WS → gods from behind, corr 0.69, md 28.8) and 75.267 (f2258: axial cut-in MS→MCU on the giantess, corr 0.28).
- **Grade switches with no camera cut:** 27.533 (colour → B&W, same framing), 58.867 (top-down colour → desaturated grey, same framing).
- **Light change with no camera cut:** 76.767 (portal door white-hot → orange, same framing. Door x-position is identical in 76.70 and 76.73 tiles).
- In-shot **face-texture swaps** that act as reveals: 41.23 (f1237, old woman → Loki) and 79.03 (f2371, old-woman portrait → Loki portrait).
- Montage whips (shots 8–14, 41–45): each object is held, then a 4–6-frame whip-pan right over empty grass (e.g. f498–501 at 16.60–16.70). Unverified: whether each object change is a cut hidden in the blur or one continuous pan along a row of props. I count each object as its own setup.

## Clean narration (264 words)

> You were promised by every single thing in the world that it would never hurt you. So now the gods throw axes at
> you, for fun. You're Baldr, the most loved god in Asgard. And lately, you keep dreaming that you die. So your mother
> makes every single thing in the world swear an oath never to hurt you. Fire, water, iron, rocks, trees, snakes, even
> sickness. They all say yes. So the gods turn you into a game. Spears, rocks, axes. Nothing even scratches you. But one
> god isn't laughing. Loki. Loki dresses up as an old woman, and goes to visit your mother. "Did everything really
> promise not to hurt him?" "Everything, except one tiny plant called mistletoe. It seemed too young to ask." And that
> tiny plant is all Loki needs. He pulls up the mistletoe, and sharpens it into a dart. Then he finds your blind
> brother, standing on the side, missing out on the brutal game of hurting you. Your brother can't see you, and he has
> nothing to throw. So Loki hands him the dart, and aims it for him. Your brother throws. And it goes straight through
> you. You're dead, right? But Hel, the queen of the dead, makes the gods a deal. If everything in the world cries for
> you, you can come back. And everything does. People, animals, rocks, trees, even iron. It's why cold rocks still
> drip when you bring them inside. Everything, except one old giantess in a cave. "Let Hel keep him." So you stay dead.
> And that old giantess? Probably Loki.

OCR fixes: "right?" (59.17–59.40) was missing from captions.json and I confirmed it on the shot 37 sheet. "Pomen u! / Plom eun u!"
(13.9–14.3) and "posyu po6" (8.7–9.0) are OCR failures: the caption sat over bonfire bloom and a fast camera move. They are not narration.

## Look of the world (applies to every shot)

- **Characters:** Mixamo-style low-poly humanoids (rigid limbs, generic clothes) with a **cube head textured with an Old-Master-style
  painted portrait on the front face only** (Baldr: fair youth; Loki: dark-haired man; Höðr: old bald bearded man; giantess: old woman).
  Lesser gods have untextured coloured cubes. Baldr also has a **white emissive halo disc** behind his head that blooms.
  Which paintings were used: unverified.
- **World:** low-poly hills, floating low-poly clouds, a rainbow arc (Bifröst) top-left, a castle on a hill (Asgard), a longhouse,
  standing stones, barrels. The same backdrop appears in ~20 shots.
- **Props in the "everything" montages** (bucket, cobra, sword in stump, conifers) use higher-detail realistic textures on a flat green plane.
- **Post:** bloom on emissives (halo, fire, portal, candle), a mild vignette (shot 1 first frame: centre 194 vs edge 116; candle shots: centre 47–74 vs edge 20–28).
  There is orange/blue colour fringing on caption glyphs (zoom of 46.0 s). That could be a chromatic-aberration filter over the final frame or
  chroma subsampling in this 360p re-encode (unverified which).
- **Captions:** burned-in white text (see Caption spec).

## Shot table (all 49 camera setups; detector numbers kept, a/b = my splits)

Abbreviations: ECU/CU/MCU/MS/WS/EWS. Lens values are estimates of vertical FOV from perspective and are marked "est.".
Movement numbers come from shots.json: dx/dy in px over the shot, scale = zoom factor, flow = mean px/frame
(first half → second half shows the easing).

| # | Time (s) | Size | Angle / height | Lens (est.) | Camera move (verified) | Subject and animation | Light | Caption(s) | Why the cut lands here |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.000–4.233 | WS (low) → high WS → WS | Starts low, looking up at the sky. Cranes to ~45° high angle by 1.8–2.4 s, then settles at a slightly high angle | normal ~50° | **Crane up + pull-out, then settle.** Scale 0.85, dy −113, flow 3.86→1.89 (ease-out), parallax 1.21 | Opening image is impossible: an ox, a tree, a sword, a snake and a virus fly through the sky above Baldr (0.0–1.2). The crane reveals "every thing" gathered around him (barrels, animals, fire, virus, rocks). Baldr stands idle | Noon daylight, sun high behind-right, hard shadows to lower-left. Cyan sky, rainbow, white halo bloom. Luma 131→66→98 (the top-down part is dark grass). Centre 194 vs edge 116 | You were promised by / every single thing in / the world that it / would never hurt you. | Lands on the full stop of the hook sentence ("you." 4.3) |
| 2 | 4.233–6.933 | MS backs (OTS) → WS | Eye level, 1.6 m, behind the gods | normal ~50° | **Truck right past the gods' backs, then dolly back.** dx −163, flow 9.6→3.5 (ease-out), parallax 3.7. A foreground body wipes past at 6.13 | Gods (red, black, green dress) walk toward Baldr, who stands far away with his halo. At 6.5 the group seen from behind | Daylight, backlit by the sun ahead-right, long shadows toward camera, luma ~100 | So now the gods / throw axes at you, / for fun. | On the full stop "fun." (next line 7.0) |
| 3 | 6.933–9.433 | MCU → high WS | Slight low angle → high (~35°) | normal | **Slow push, then a fast crane back/up** (8.77–9.20, 13 frames, ease-in). Flow 0.63→3.36, dy +102 | Baldr waves at camera, smiling stance, halo blooming. The crane back reveals the crowd of gods around him | Daylight, sun camera-right, his shadow on grass left. Centre luma 186 (halo) | You're Baldr, / the most loved / god in Asgard. | On "Asgard." The move ends exactly on the full stop |
| 4 | 9.433–10.433 | MS | High angle ~45° looking down at a bed | normal | **Slow push-in + Dutch roll 8°**, accelerating (flow 1.29→7.26), scale 1.62 | Baldr lies face-down asleep (still pose) | Night interior: navy moonlight from top-right, luma 13–20, cool (r−b −18.6), black surround, heavy vignette (centre 55 / edge 10) | And lately, / you keep dreaming | Cut on "dreaming" into the dream (word-motivated, 1 frame before the detector's 10.467) |
| 5 | 10.433–11.533 | WS → MS | Eye level / slightly low | normal | **Pull-out with drift and roll.** Scale 0.80, flow 2.1→12.0 (speeds up into the hit) | Dream: Baldr stands in a red void. A spear/streak hits him (~11.1), the halo flashes, he drops into a crouch with gold sparks | Red monochrome: sat 252, warm +64, red fog floor, black top, halo as the key. Luma 23–34 | that you die. | On "die" (the death in the dream) |
| 6 | 11.533–12.033 | MCU frontal | Eye level | normal | **Push-in + roll −1.9°.** Background light drops at 11.73 (blue → black), same framing | Baldr wakes on the edge of the bed and clutches his head (shock gesture). The face texture is rotated | Dark blue, then black. Cool key from the front. The body shows heavy dithering noise | that you die. / So your mother | On "mother" (new character) |
| 7 | 12.033–16.167 | WS → MS | Eye level | normal | **One flight:** pans/trucks right as the mother exits, crosses the field (12.4–13.0), arcs and settles static on her behind a fire (13.2–16.1). dx +845, flow 14.5→0.2 (hard ease-out) | Frigg (blue dress, cube head) walks to a bonfire, stands, raises a hand to her face (oath gesture 14.9–16.1) | **Pink dusk**: magenta-pink sky, pink clouds, bonfire as the key with big bloom, warm +66, luma 90–127 | makes every single thing / in the world / swear an oath never / to hurt you. | On "you." Ends the oath sentence, starts the list |
| 8 | 16.167–16.733 | MS insert | Eye level, ~1 m | normal | Hold 0.4 s, then **whip-pan right** (f498–501 blurred grass) | Fire (campfire prop) | Plain daylight field, realistic conifers, sun from the right, shadows left. Bloom on fire | Fire, | Picture arrives 0.23 s before the word. The whip ends the item |
| 9 | 16.733–17.167 | MS insert | Eye level | normal | Object slides in from the right, holds, whip right | Wooden bucket (realistic texture) | Same field preset | water, | Item change on the comma |
| 10 | 17.167–17.867 | MS insert | Eye level | normal | Whip in, hold, whip out. Flow 28→33, parallax 17 | Sword stuck in a stump | Same | iron, | Comma |
| 11 | 17.867–18.367 | MS insert | Eye level | normal | Hold + whip | Big rounded rock | Same | rocks, | Comma |
| 12 | 18.367–19.167 | WS insert | Eye level | normal | Whip + small orbit. Roll value (−135°) is a fit artefact from motion blur | Three conifers | Same | trees, | Comma |
| 13 | 19.167–19.867 | MS insert | Eye level | normal | Hold, then whip | Raised cobra, rigid S pose | Same | snakes, | Comma |
| 14 | 19.867–20.767 | MS insert | Eye level | normal | Whip in, **settle to a hold** (flow 4.4→0.05) | Cartoon green virus ball | Same | even sickness. | The list ends on the full stop. The camera stops = full stop |
| 15 | 20.767–22.200 | WS full figure | Eye level | normal | **Locked off**, micro push 1.04 (flow 0.16) | Frigg stands, almost no motion | Pink dusk preset, rainbow, longhouse. Luma 83, warm +40 | They all say yes. | On "yes." |
| 16 | 22.200–23.767 | MS backs, Baldr tiny in the gap | Eye level | normal | **Slow push-in** 1.10, roll −2.6°, flow 0.25 (constant) | Row of gods seen from behind (green, blue, yellow) framing Baldr far away. A black-clad god steps in left at 23.07 | Noon preset, luma 88 | So the gods turn / you into a game. | On "game." |
| 17 | 23.767–25.667 | Low WS → OTS MS | Camera ~0.5 m, horizon at ~45 % → eye-level OTS | wide ~65° (low WS) | **Hold, then a fast orbit/whip** (24.03–24.20, ~5 frames) to an OTS behind a throwing god. Flow 7.0→0.1 | Baldr by the rocks. Then a red-shirt god winds up and throws, Baldr centred in the background | Noon, rainbow re-enters frame | Spears, / rocks, / axes. | On "axes." |
| 18a | 25.667–27.367 | MCU → WS | Eye level | normal | **Pull-out** (scale 0.47; the roll value is a fit artefact) | Baldr, hand on chest, smug. Logs and axes lie at his feet | Noon. The halo blooms over his face | Nothing even / scratches you. | **Hidden cut** at 27.367 (f821), just after "you." |
| 18b+19 | 27.367–28.233 | MS backs | Eye level | normal | **Slow lateral truck** (dx +34, parallax 8). **Grade snaps to B&W at 27.533** with no camera cut | Gods from behind, watching | Colour noon → **desaturated B&W** (sat 20, luma 91) | But one / god isn't laughing. | The grade switch lands on "But one" (27.6) |
| 20 | 28.233–29.200 | MS backs | Eye level | normal | **Fast truck right along the gods' backs, ease-out** (flow 16.4→1.6) and lands on Loki | Gods (blue, yellow, red), then Loki (green shirt) from behind, gesturing | Colour back, noon | god isn't laughing. | Lands on Loki as the line ends |
| 21 | 29.200–29.733 | MCU → CU | Eye level, slightly low | normal | **Static, then a quick push-in** (29.55–29.70) | Loki frontal, painted face, looks off-screen right | Noon, rainbow behind | Loki. / Loki dresses up as | Hard cut 0.13 s after "Loki dresses up as" starts. The reveal is held for the next shot |
| 22 | 29.733–32.600 | WS | Eye level | normal | **Truck right behind a foreground conifer (natural wipe), then push-in** (scale 1.34, roll −9°, flow 5.3 constant) | Old woman (Loki disguised, brown hooded robe and staff) walks toward the longhouse | Noon, barrels, longhouse | an old woman, / and goes to / visit your mother. | On "mother." |
| 23 | 32.600–34.933 | MS two-shot | Eye level, seated height | normal | **Very slow push-in** 1.10 (flow 0.18) | Frigg (left) and the hooded old woman (right) sit on a bench. The old woman gestures | **Candle interior**: one candle practical frame-right, warm +44, luma 27, sat 245, black ceiling | "Did everything really promise / not to hurt him?" | On "?" |
| 24 | 34.933–38.933 | WS → ECU | Low angle under the tree | normal (dolly, not zoom: perspective changes) | **Continuous accelerating push-in** ×7.2 over 4 s, ease-in. Ends with gold sparkle glints at 38.0 | Low-poly tree on a hill. The mistletoe on a branch grows from a speck to fill the frame | **Sunset gold**: orange sky gradient, low sun, long shadows, warm +70, luma 92→52 | "Everything, / except one tiny / plant called mistletoe. | After "mistletoe." The cut comes mid-sentence ("It seemed too") |
| 25 | 38.933–39.667 | MS | Eye level | normal | Slow push 1.10 (flow 0.38) | Frigg alone, hand gesture | Candle interior, luma 28 | young to ask." | End of the quote |
| 26 | 39.667–42.233 | MCU | Eye level | normal | **Slow push-in** 1.15 (flow 0.17) | Old woman frontal. **Head texture swaps to Loki at 41.23** (f1237) with no cut | Candle frame-right as the key, strong bloom, luma 33, warm +53 | And that tiny plant / is all Loki needs. | The swap lands on the word "Loki". The cut follows "needs." |
| 27 | 42.233–44.967 | WS → low CU | Eye level → low angle | normal | **Tracking arc dolly-in** (scale 4.4, flow 13→6) while Loki walks toward camera and crouches | Loki pulls the mistletoe from the branch, then crouches and whittles a long dart with sparkles | Sunset gold, warmest shot (r−b +93). The tree canopy is a black silhouette at the top | He pulls / up the mistletoe, / and sharpens it / into a dart. | On "dart." |
| 28 | 44.967–45.800 | WS | Low (~0.5 m) with a dark out-of-focus log in the foreground | normal | **Truck with the subject**, fast push in the last frames (flow 0.2→13.7) | Loki walks right across the field | Noon | Then he finds | Cut on the object of "finds" |
| 29 | 45.800–46.400 | MCU OTS (Höðr) → MS | Eye level | normal | Hold, then the camera swings and **passes through Höðr's head** (46.27–46.33) | Höðr (old bearded face, dark clothes) in the foreground. Loki approaches behind him | Noon | your blind brother, | Mid-phrase on the comma |
| 30 | 46.400–47.733 | High WS | Drone height ~8–10 m, ~35° down | normal | **Lateral truck/pan + descent** (dx +245, roll 10°) | The game: the red god throws in the foreground, Baldr far left, Höðr at the right edge "on the side" | Noon | standing on the side, | Comma |
| 31 | 47.733–50.100 | WS → MS | Low WS → eye-level MS | normal | **5-frame whip-orbit (47.67–47.83), hold, then a 5-frame rush-in (49.10–49.27)** to Baldr. Scale 1.40 | Baldr stands still. At 49.73 a thrown log passes through his chest | Noon, rainbow | missing out on / the brutal game / of hurting you. | On "you." |
| 32 | 50.100–51.400 | MS | Eye level, behind and beside Höðr | normal | **Static, then a pan as he turns** (flow 0.16→5.3) | Höðr turns his head. **His face texture vanishes (blank cube) 50.63–51.17** | Noon, luma 92 | Your brother / can't see you, | On "can't see you," |
| 33 | 51.400–52.567 | MS low | Slightly low | normal | Small push 1.04 | Höðr opens his empty hands (nothing-to-throw gesture) | Noon, his face in shadow | and he has / nothing to throw. | On the full stop |
| 34 | 52.567–57.967 | MS two-shot → OTS → tracking → MS | Eye level, ~1.2 m | normal | **One 5.4 s take:** two-shot (52.6–53.2), camera rushes around Höðr (53.27–53.8) into an **OTS along his arm aiming at Baldr** (hold 53.9–55.0), then **follows the dart's flight** across the stones (55.3–56.6) and pans onto Baldr walking in (57.0–57.9) | Loki hands Höðr the dart and guides the aim. The dart flies slowly at hip height. Baldr steps into its path | Noon. Audio drops out 56.46–57.16 | So Loki hands / him the dart, / and aims / it for him. / Your brother throws. / And it goes / straight through you. | The cut is the impact itself (57.97), 0.47 s after "straight through you" starts |
| 35 | 57.967–58.567 | WS | Eye level | normal | **Push-in + tilt** (dy −125). **White flash frames 57.97–58.07** (luma 182) | The dart pierces Baldr and his halo flares. He staggers and falls onto his back (58.53) | Overexposed white flash with bloom, then noon (luma 80) | straight through you. | Fall completed |
| 36+37 | 58.567–59.433 | Top-down WS | **90° overhead**, ~6 m | normal | **Locked.** **Grade drops to desaturated grey at 58.867**, same framing | Baldr's body sprawled, gods standing around, long shadows | Colour (sat 209) → grey (sat 18), luma 56–62 | You're dead, / right? | On "right?" (setup for the reversal) |
| 38 | 59.433–62.267 | WS → MS | **Low angle** up at the throne | normal | **Slow push-in + tilt down** (scale 1.44, flow 0.1→0.7, ease-in) | Hel on a tall stone throne. Her emblem glows blue-orange. She raises a hand on "deal" (61.8) | **Underworld hall**: dark wood, starfield window (deep blue), orange emissive trim **brightens at 59.83** ("lights on"), luma 26 | But Hel, / the queen / of the dead, / makes the / gods a deal. | On "deal." |
| 39 | 62.267–65.033 | MS two-shot | Eye level | normal | **Truck right + push** (dx −155, scale 1.19, constant 1.5 px/f) | Hel's throne (left), Baldr seated on a bench (right). The portal door behind him goes orange → **white-hot** (64.2–64.6) | Portal is the key light, luma 40→74 as it blooms. Hanging lantern top | If everything in the / world cries for you, / you can come back. | On "back." The door glow peaks on the promise |
| 40 | 65.033–66.500 | MS → WS | Eye level | normal | **Slow pull-out** 0.885 (flow 0.7) | Row of gods cry, hands to faces | Noon | And everything does. | On "does." |
| 41 | 66.500–66.933 | MS insert | Eye level | normal | Hold, whip right | Woman in green crying, white tear particles | Field preset | People, | Comma (picture leads by 0.1 s) |
| 42 | 66.933–67.667 | MS insert | Eye level | normal | Whip in, hold, whip | **Same cobra, same pose and framing as shot 13**, plus tear droplets | Field preset | animals, | Comma |
| 43 | 67.667–68.133 | MS insert | Eye level | normal | Hold, whip | Rock (big, close) | Field preset, brightest (luma 124–128) | rocks, | Comma |
| 44 | 68.133–69.067 | WS insert | Eye level | normal | Whip + small orbit | **Same conifer trio as shot 12** | Field preset | trees, | The cut comes 0.17 s **after** "even iron" starts (picture late) |
| 45 | 69.067–69.733 | MS insert | Eye level | normal | Drift, then hold | **Same sword-in-stump framing as shot 10**, with tear droplets | Field preset | even iron. | Full stop |
| 46 | 69.733–72.400 | WS → CU insert | Low, ~0.4 m (table height) | normal | **Push-in + pan** (scale 2.56, flow 5.7→3.7) | A red-shirt man walks past a table with a white frosted rock and a candle. The camera ends on the rock "dripping": ice crystals fly off and it turns brown | Candle interior, warm +59, luma 27–48, candle bloom | It's why cold rocks / still drip when / you bring them inside. | On "inside." |
| 47a | 72.400–75.267 | WS → MS | Low | normal | **Dolly-in past a walking figure** (scale 2.6, flow ~3.5) | A messenger (orange shirt) walks to the giantess standing at the back of a cave by a small fire, then exits frame | **Cave dusk**: orange sky in the cave mouth, violet-blue floor, tiny warm fire, luma 76→6 | Everything, / except one old giantess / in a cave. | **Hidden cut** 75.267 (axial cut-in) right before the quote |
| 47b | 75.267–76.333 | MCU | Low angle | normal | Static, small push | Giantess speaks, then **turns away (76.0)**: the head becomes a blank cube | Cave dusk, luma 6–18 | "Let Hel keep him." | End of the quote |
| 48+49 | 76.333–77.600 | MS | Eye level | normal | **Static** (scale 1.02–1.09). **Portal light falls white → orange at 76.767** with no cut | Baldr seated beside the portal, then raises both hands to his head in despair (77.07–77.57) | Underworld hall. Portal from white-hot bloom to orange. Lantern top | So you stay dead. | On "dead." |
| 50 | 77.600–79.533 | **Split screen**: top half MS, bottom half ECU card | Eye level | normal | **Static** | Top: the giantess in front of a longhouse wall (daylight). Bottom: a flat, slightly tilted portrait card of an old woman on black, which **swaps to Loki's portrait at 79.03** (f2371). The top panel keeps the old-woman face | Top noon, bottom dark card. Luma 41–48 | And that old giantess? / Probably Loki. | The video ends 0.5 s after the swap (punchline = end) |

## Story structure with timestamps

| Beat | Time (s) | What happens |
|---|---|---|
| Hook (paradox + cold open) | 0.0–7.0 | "Promised by every thing... so now the gods throw axes at you, for fun." The first frame is impossible: objects flying in the sky |
| Identity | 7.0–9.4 | "You're Baldr, the most loved god in Asgard." Second-person casting |
| Inciting threat | 9.4–12.0 | Nightmare of death (bed → red dream → waking) |
| Rule | 12.0–22.2 | The mother makes everything swear. One-picture-per-word list montage. "They all say yes." |
| Consequence / fun | 22.2–27.4 | Invulnerability game: "Nothing even scratches you." |
| Antagonist turn | 27.4–34.9 | B&W "But one god isn't laughing." Loki, the disguise, the visit, the question |
| The flaw (clue) | 34.9–42.2 | Mistletoe: 4-second push to ECU. Old woman → Loki face swap |
| Weapon | 42.2–45.0 | He pulls and sharpens the dart |
| Instrument | 45.0–52.6 | Blind brother left out of the game |
| Climax | 52.6–58.6 | 5.4 s single take: aim, throw, **0.7 s audio dropout**, white-flash impact, fall |
| Death beat + tease | 58.6–59.4 | Top-down body, grade to grey, "You're dead, **right?**" |
| Second hope | 59.4–69.7 | Hel's deal, portal glows, the world cries (montage reprise) |
| Etiology aside | 69.7–72.4 | "It's why cold rocks still drip..." (a real-world payoff) |
| Reversal | 72.4–77.6 | One giantess refuses. Portal dims. "So you stay dead." |
| Twist | 77.6–79.5 | Split screen, portrait swap: "Probably Loki." Ends on the punchline. There is no CTA or comment question. A seamless loop is not verified (the last line does not feed the first) |

## Camera statistics (49 setups, verified against the pictures)

- **Slow push-in (primary move): 13** (shots 4, 6, 16, 21, 23, 24, 25, 26, 33, 35, 38, 46, 47a). The typical slow push is scale 1.04–1.15 over
  0.7–2.6 s (≈4–6 %/s, flow 0.15–0.4 px/f at 360p), linear. The exceptions are shot 24 (×7.2 in 4 s, ease-in) and shot 47a (×2.6).
- **Hold + whip-pan right: 12** (montages 8–14, 41–45). Each hold is 0.3–0.6 s, then the whip runs 4–6 frames at 30–64 px/f.
- **In-take flights / orbits instead of cuts: 7** (shots 7, 17, 27, 29, 30, 31, 34). The fast part is 5–13 frames, almost always easing out into a hold
  (e.g. shot 7 flow 14.5→0.2, shot 20 16.4→1.6).
- **Trucks / lateral: 6** (shots 2, 18b, 20, 22, 28, 39). Strong parallax (2–10) shows real 3D camera motion, not 2D pans.
- **Pull-out / crane back: 5** (shots 1, 3, 5, 18a, 40).
- **Locked off: 6** (shots 15, 32 until the turn, 36/37, 47b, 48/49, 50). They are reserved for emotional beats (yes, dead, despair, twist).
- **Dutch roll** of 2–9° is added to dream and suspense moves (shots 4 +8°, 6, 22 −9°, 30 +10°).
- **Shot sizes:** WS ≈ 17, MS (incl. object inserts) ≈ 22, MCU/CU ≈ 7, ECU ≈ 2 (24 end, 50 card), top-down 1. Faces are seldom closer than MCU.
  The emotional close-ups are on the painted face textures (21, 26, 50).
- **Heights and angles:** eye level dominates (~70 %). Low angle (0.3–0.6 m) is used for power or menace (17, 24, 28, 38, 46, 47), high or top-down for
  overview and death (1, 3, 4, 30, 36/37).
- **Lens:** almost everything reads as a normal ~45–55° vertical FOV (est.). There is no visible depth of field and no zoom lens effect: all scale changes
  show perspective shift (parallax), so they are dolly moves.

## Lighting presets (recipes to rebuild)

1. **Asgard noon** (shots 1–3, 16–22, 28–34, 40). Cyan-to-pale sky gradient, one sun-type directional light high and behind-right (shadows fall toward
   lower-left or toward camera, length ≈ body height, hard edges), cool sky ambient, saturated greens, white emissive halo with bloom.
   Measured: luma 85–110, sat 130–160, warmth −2…+20, vignette edge ≈ 0.85× centre.
2. **Pink dusk oath** (7, 15). Magenta-pink sky and clouds, warm flat ambient, the bonfire as an emissive point light with heavy bloom.
   Luma 83–127, warmth +40…+66.
3. **Single candle interior** (23, 25, 26, 46). Black room, one warm point light (~1900 K) with bloom at frame-right, faces half lit.
   Luma 27–48, sat 235–245, warmth +44…+59, strong vignette (centre 47–100 vs edge 20–45).
4. **Sunset gold** (24, 27). Orange-to-yellow sky gradient, low sun, long shadows, the tree canopy as a black silhouette.
   Warmth +70…+93, luma 52–97.
5. **Nightmare pair** (4, 5). Navy moonlight (luma 13–20, warmth −19) cut against a red void with red fog (sat 252, warmth +64). The halo is the only key.
6. **Underworld hall** (38, 39, 48/49). Dark wood, a starfield window as cool fill, emissive orange trim, a portal door whose intensity tells the story
   (orange → white-hot bloom → orange).
7. **Cave dusk** (47). Violet-blue ground bounce plus an orange sky opening plus a tiny campfire. Luma 6–19 (darkest in the video).
8. **Prop showroom** (8–14, 41–45). A flat lawn plane, realistic conifers, bright sky, sun from the right. Luma 90–128.
9. **Grade punctuation:** instant desaturation to B&W (sat 18–20) on "But one god isn't laughing" (27.533) and on the death (58.867).
   Instant white flash on the impact (57.97–58.07).

## Caption spec

- White, sentence-case, bold geometric/grotesque sans (Inter- or Montserrat-SemiBold-like look; the exact font is unverified). A thin soft dark
  shadow is the only separation: no box and no thick stroke.
- **Small:** text-line height ≈ 0.03 of frame height (OCR text_h_frac 0.023–0.043, ≈ 19 px of 640). One line, centred, max width ≈ 0.55 of frame.
- **Position:** fixed at y ≈ **0.72** of the height (OCR y_frac 0.718–0.721 on every chunk), i.e. on the lower torso of a centred MS character.
- 1–4 words per chunk (mean 2.75). Phrase-based breaks, keeping the punctuation. The chunk changes 2–4 frames after the picture cuts
  (cuts lead the next chunk by a median 0.13 s; 35 of 48 cuts sit within 0.2 s of a chunk change).
- No word-by-word highlight, no colour words, no animation. A hard on/off per chunk (verified on sheets: no fade between 0.1-s OCR samples).

## Animation and VFX

- Stock humanoid clips: walk, idle, wave, throw, crouch, sit, despair (hands to head), hand-on-chest. The rigs move like game characters
  (no squash, no facial animation). All "acting" comes from swapping painted face textures, the halo, and camera moves.
- **Face-texture swap** as a no-cut reveal (41.23, 79.03).
- Emissive halo disc + bloom for Baldr. Halo flare + white frame flash on the death. Gold sparkle particles (dream at 11.37, mistletoe at 38.0, dart at 44.5).
- Tear particles (small white droplets) added to the reprise props (41–45). Ice-crystal burst on the "dripping" rock (71.2–72.4).
- Projectile follow: the dart flies slowly (~2.9 s from 55.0 to 57.93) with the camera tracking it.
- Split screen with a flat portrait card in the last shot.
- Post: bloom, vignette, possible chromatic aberration (unverified), grade snaps (B&W).

## Edit rules (observed)

1. **The cut lands on punctuation.** Almost every cut falls just before a new caption chunk that follows a "." "," or "?"
   (e.g. 4.233 "you.", 6.933 "fun.", 9.433 "Asgard.", 22.2 "yes.", 34.933 "him?", 59.433 "right?", 77.6 "dead.").
   **The picture leads the words by 2–4 frames** (median 0.13 s).
2. **Lists get one picture per noun**, a fixed 0.4–0.7 s each, joined by identical whip-pans. When the list comes back later (people, animals, rocks, trees, iron),
   the same props and framings are reused with a new layer (tears). It works like a visual rhyme.
3. **Camera flights replace cuts** when the story moves to a new subject in the same place (3, 7, 17, 20, 31, 34). Cuts are used for changes of place or time.
4. **Every shot moves**, except the emotional full stops, which are locked off (yes, dead, despair, twist).
5. **Grade switches act as punctuation** (B&W for the antagonist's entrance and for the death). Light changes tell the plot (portal opens and closes).
6. **Long takes are kept for the clue and the climax**: 4 s push on the mistletoe, 5.4 s continuous throw.
   Everything else is mostly ≤ 1.2 s (median 1.17 s).
7. **Sound edit:** a continuous bed under the voice (floor ~−27 dBFS) with **one 0.7 s total dropout right before the impact** (56.46–57.16).
8. **Reveals happen inside the shot** (texture swap) instead of cutting to a new angle.
9. The last shot ends 0.5 s after the punchline. There is no outro.

## Audio

- Voice: one male narrator, fast (199 wpm), conversational second person, with a lighter character read on the quoted lines (mother, giantess):
  unverified by ear, inferred from the quotation marks in the captions.
- A bed runs continuously (RMS floor ~−27 dBFS between phrases). That it is music, and which kind, is unverified: I could not listen.
- Mastered loud and flat: −14.3 LUFS, LRA 2.5 LU, peak −0.7 dBFS. Mono AAC.
- The impact at 57.93 does not stand out above the speech level (50-ms RMS −10/−11 dB, the same as speech), so a strong hit SFX is not shown by the
  data (unverified by ear).

## Weaknesses (seen, with evidence)

| Time | Issue | Evidence |
|---|---|---|
| Whole video | Narration is very fast | 264 words in 79.5 s = **199 wpm**. Caption chunks last 0.83 s on average, and "Loki." stays only 0.3 s (29.3–29.6) |
| Whole video | Captions are small and have no stroke | Line height ≈ 0.03 of the frame (≈ 19 px at 640). Only a soft shadow. OCR failed on them over bright backgrounds: 13.9–14.3 ("Pomen u!" over bonfire bloom), 16.4 ("Fre," on the fire), 8.7–9.0 (during the crane move) |
| 50.63–51.17, 76.0–76.33, 33.23, 46.27 | Face textures exist only on the cube's front face, so heads go blank from the side or back | Höðr's head is a plain beige cube (sheet 32). The giantess turns into a blank cube on "Let Hel keep him" (sheet 47). Frigg's head is blank at 33.23 (sheet 23) |
| 46.27–46.33 | Camera clips through a character | Strip f1388–1390: the camera passes through Höðr's head and body, which cut off in half at the frame edge |
| 49.73 | Projectile passes through Baldr's body | Sheet 31: a thrown log crosses his chest with no contact reaction. It reads as clipping, not "bouncing off" |
| 11.53–12.03 | Dithering/noise artifact on the body | Sheet 6: the torso and arms are covered in screen-door speckle noise |
| 2.40, 58.6–59.4 | Stray thin dark horizontal line at ~90 % height in high-angle shots | Full frame at 2.4 s and sheet 36/37: a 1-px dark line across the lower frame. Its cause is unverified (shadow-caster or plane edge) |
| 9.43–12.03 | The nightmare sequence is too dark and too short to read on a phone | Luma 13–34 over three shots of 1.0, 1.1 and 0.5 s. Centre luma 44–55 |
| 20.77–22.20, 38.93–39.67, 77.6–79.5 | Stiff, idle animation | Shot 15 flow 0.16 px/f for 1.4 s with Frigg almost frozen. In shot 50 both panels are static for 1.9 s |
| 8–14 vs 1–3 | Mixed art styles | Realistic-textured bucket, cobra and conifers on a flat lawn (sheets 9, 13) next to low-poly Asgard and painted portraits. Three different visual languages |
| 66.5–69.7 | Repeated assets | The cobra in shot 42 has the same pose and framing as shot 13. The trees in 44 match 12, the sword in 45 matches 10. The Asgard backdrop (longhouse + castle + rainbow) appears in ~20 shots |
| 16.60–16.70 etc. | 12 identical whip transitions | Each whip has 4–6 frames of empty blurred grass (f498–501, 516–519, 592–595). The montage turns mechanical |
| 77.6–79.5 vs 72.4–76.3 | Geography and continuity jump at the twist | The giantess was "in a cave" (dusk, shot 47) but appears in front of the Asgard longhouse in daylight (shot 50). The bottom portrait card (old woman in a white headscarf) is a different face from her 3D head in the top panel and in shot 47 |
| 41.23 vs 79.03 | The twist was spent earlier | The video already swapped the "old woman" face to Loki at 41.23 in the same way. The final "Probably Loki" (old giantess → Loki) repeats the trick, and viewers have seen the reveal device once |
| 55.0–57.93 | Physically slow, floaty dart | The dart takes ~2.9 s to cross ~15 m at hip height while Baldr walks into it. The impact gets no SFX peak above speech level (RMS −10/−11 dB) |
| 53.9–55.0 | Unclear "Loki aims it for him" | The OTS shows Höðr's arm and Baldr far away. Loki's guiding hand is not clearly visible (sheet 34). Unverified on the full-res original |
| 57.97–58.07 | The death payoff is a white flash plus a generic fall | Sheet 35: an overexposed white frame, then a stock fall-on-back. No close-up of Baldr or the mother's reaction. After 39.7 the mother appears at most as a small blue-dress figure in the crying-group WS at 65.0–66.5 (identity unverified) |
| 74–79 | The ending has no emotional close-up of the hero | After 58.6 Baldr is shown only in MS/WS (sheet 49, despair gesture at MS) |
| Whole video | Low delivered resolution | This copy is 360x640 at ~405 kb/s. The original upload resolution is unverified |
| 0–79.5 | Flat audio dynamics | LRA 2.5 LU. The only dynamic event is the 0.7 s dropout |
