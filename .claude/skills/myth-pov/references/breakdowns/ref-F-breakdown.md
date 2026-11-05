# Reference F: "CASINO on the..." (Casino on the Moon), frame-by-frame breakdown

Source analysed: `scratchpad/ref/F_casino_on_the.mp4` (the downloaded copy: **202x360**, 30 fps, H.264 ~445 kb/s,
AAC stereo 44.1 kHz 96 kb/s). Data: `scratchpad/ana/F_casino_on_the/` (shots.json, per_frame.json, captions.json, audio.json,
15 contact sheets). I opened all 15 contact sheets and all four 1-fps peek strips, then rebuilt the whole video as 5-fps strips
(`scratchpad/work/F/frames/p5_*.jpg`, 16 strips of 4 s) and made 30-fps strips at every suspicious point
(`scratchpad/work/F/frames/c_*.jpg`: 3.85, 7.0, 16.8, 18.5, 20.4, 22.7, 33.6, 36.6, 42.9, 44.1, 45.5, 50.6, 53.05, 54.85,
60.6, 62.0) plus my own frame-difference cut detector (`scratchpad/work/F/scripts/diff.py`) and light pass (`light.py`).
Topic (from captions): "If you ever woke up on the moon with the urge to play at a casino, gambling there would be a nightmare."

## Measured totals

| Item | Value | How it was measured |
|---|---|---|
| Duration | 63.77 s (1913 frames) | shots.json |
| Detector shots | 15 (avg 4.25 s) | shots.json |
| **Camera setups after checking** | **16** (mean 3.99 s, median 3.0 s, min 1.03 s, max 8.57 s) | 1 detector split is a glitch tint, not a cut (60.733: the ground turns green, same framing, 30-fps strip c_60.6). I found 2 hidden transitions the detector merged into shot 6: a **15-frame cross-dissolve 20.467–20.967** (Earth casino → Moon casino, same framing) and a **3-frame dissolve 22.933–23.033** (Moon casino → empty moonscape). No other hidden hard cuts: my own diff detector found exactly the detector's 13 hard cuts. |
| Transitions | 13 hard cuts + 2 dissolves | strips |
| **In-shot camera flights instead of cuts** | **8** (1.9–2.3, 4.0–4.4, 7.10–7.33, 18.53–19.17, 36.73–37.17, 44.33–44.40, 50.4–51.1, 54.85–55.35) | 30-fps strips. This is why the setup count is low: the picture changes subject every ~1.5 s, but by moving the camera, not by cutting |
| Shot-length histogram | ≤1.5 s: 1, 1.5–3 s: 7, 3–5 s: 3, >5 s: 5 | corrected list |
| Narration | **210 words** (206 spoken in clean chunks + the glitched "fr... that are kn..."), **64 caption chunks + 4 glitched chunks** | cleaned OCR, checked on strips |
| Words per minute | **198 wpm** over 63.8 s; **211 wpm** over the spoken part 0–59.8 s | words / duration |
| Words per caption | mean 3.2 (1 word: 4, 2: 14, 3: 18, 4: 20, 5: 8). Max 5 ("since there's no air drag,") | cleaned chunks |
| Caption on-screen time | mean 0.92 s, median 0.90 s, min 0.4 s ("well," 38.0–38.4), max 1.6 s ("would take absurdly long" 7.2–8.8) | chunk starts |
| Loudness | −15.4 LUFS integrated, LRA 2.3 LU, true peak −1.8 dBFS | audio.json (EBU R128) |
| Silence | none (audio.json). Only 12 of 1275 50-ms windows fall below −35 dBFS (0.0, 1.0, 20.4, 40.15, 40.95–41.0, 41.65, 44.7–44.8, 45.1) | my RMS pass |
| Audio level shape | RMS 5th pct −31 dB, median −19 dB, 95th −11.6 dB. **56.5–62.5 s runs 5–8 dB louder** (−9…−13 dB vs −15…−22 dB before) | 0.5-s RMS windows |
| Picture brightness | Moon shots mid-luma 58–89; Earth park insert 116 (brightest); Earth casino interior 46 (centre 89 / edge 29); sky-follow shot 14 at 29 (darkest) | my light pass on the corrected setups |

**Hidden or mislabelled transitions I checked frame by frame:**

- In-take camera flights, **not cuts** (the detector was right not to cut): 1.9–2.3 (orbit from crater WS to MCU in front of the casino),
  4.0–4.4 (swing back to the face), 7.10–7.33 (7-frame pull-back from the wheel to the bored gambler), 18.53–19.17 (19-frame ease-in/out
  pull-out from the croupier's hand to the table WS), 33.6–34.6 (the two men walk out of a held frame and come back with beers, no cut),
  36.73–37.17 (14-frame motion-blurred whip-pan left to the craps table), 44.33–44.40 (5-frame whip right after the thrown dice),
  50.4–51.1 (tilt up after the dice into the sky and back down), 54.85–55.35 (crane up out of the table trench, truck to the players),
  62.23 (alien walks into the lens).
- **Real hidden transitions:** 20.467–20.967 (15-frame cross-dissolve, luma 42→70, identical camera, the scene swaps from Earth to Moon:
  a match dissolve) and 22.933–23.033 (3-frame dissolve to the empty moonscape).
- **Glitch overlays with no cut:** 58.8–59.1, 60.73–60.93 (green tint on the ground), 61.0–62.2 and 63.07–63.77 (full TV static).
  The detector's frames 1867–1912 (cut score 0.44–0.76 every frame) are the static, not cuts.
- **In-shot gag edits:** 40.2–40.8 the craps table teleports between 4 positions and angles (one per ~3 frames) while the people stay put;
  40.9–41.0 the whole frame washes grey/white ("Not responding" look); 41.1 a Windows error dialog pops on.

## Clean narration (210 words)

> If you ever woke up on the moon with the urge to play at a casino, gambling there would be a nightmare. Every roulette spin
> would take absurdly long, since the lunar gravity is 6 times weaker than on Earth, the wheel bearing would experience much
> less gravitational loading, and almost no air resistance slowing the wheel down. So a normal roll that would last 10 seconds on
> Earth could take up to a minute on the moon. You might think that something like a coin flip would be a simpler game in that
> environment, but NO. Using your coin toss muscle memory from Earth will send that coin flying multiple stories high, and you'd
> have to wait around 7 seconds just to get it back. And if you like dice games, well, you're out of luck, because craps would be
> the most cursed one. Because if you threw the dice with the same force that you do at home, it could travel 15 meters before
> bouncing. So the table would have to be incredibly long, and even then, after the dice hit the wall, since there's no air drag,
> they could go flying almost anywhere. But the worst part would probably be protecting your chips fr... ...that are kn...

OCR fixes: run-together words ("youeverwokeup", "is6timesweaker", "wouldbeasimplergame") split by reading the strips. "5meters" /
"15meters" alternates in OCR; the strips (p5_44 at 45.6–46.4) show "15 meters". "So a normal roll" (17.8–18.4) was missing from
captions.json and is visible on strip p5_16. "fr... ........" (58.9–59.8) was missing; it is on strip p5_56 at 59.0–59.6. All the
in-scene text that OCR mixed in ("LUNA ROYALE casino" at y 0.40–0.55, roulette numbers "13 / 1811 / 27 / 34" at y 0.58, the
Windows dialog text at y 0.53) is not narration. The sentence is deliberately cut off: "fr[om]... [aliens] that are kn[own]..." is my
guess and **unverified**; the captions only ever show "fr..." and "that are kn...".

## Look of the world (applies to every shot)

- **Characters:** game-asset humanoids (low-poly bodies, rigid hands with blocky fingers, simple clothes) with **detailed faces**. The
  hero (old man, white beard, blue-white striped polo, jeans) has a sculpted, expressive 3D face (big eyes, open-mouth shock at 4.4–6.0)
  inside a **faceted white low-poly hood/helmet**. Other gamblers wear the same hood. Some faces look like **flat photo textures**
  (old woman in green dress at 50.35, young dealer in red vest at 51.8, bearded man in brown suit at 55.4). Whose photos: unverified.
  Green **"grey-alien" style** characters (smooth green bodies, black almond eyes, a drawn frown line at 62.4) are gamblers from 7.2 on.
  The Earth casino has different people: bald croupier in red vest/white sleeves, camo-shirt player, white-suit player.
- **World:** a photoreal lunar regolith (high-detail displacement, craters), pure black starfield sky with **photoreal Earth, Mars and a
  Jupiter-like planet hanging huge and close**. The casino is a low-poly beige tent/pavilion with a **3D arched sign "LUNA ROYALE casino"**
  topped by a spinning blue poker-chip logo ringed with sparkling bulbs (0.5–4.3). Inside: roulette and craps tables, slot machines.
- **Two contrast worlds for "on Earth":** a sunny park (green lawn, two trees, blue sky) used for the split screen (8.73) and the coin-hand
  insert (27.7), and a dark Earth casino interior with a pendant lamp (17.7–20.5).
- **Props:** a PBR roulette wheel (wood, red/black pockets, gold turret), a **photo-textured US quarter**, red and blue translucent dice,
  stacks of red/white/blue chips, beer glasses, a pink vacuum-gun, a green neon UFO.
- **Diagram layer:** x-ray wheel with a glowing cyan bearing, red/green 3D arrows, blue/white "air molecule" spheres, light-trail VFX,
  shockwave rings, a Windows 7 error dialog, TV static.
- **Post:** bloom on all emissives (chip logo, hologram, trails, UFO), light vignette (shot 1 mid: centre 66 / edge 56), strong colour
  fringing around caption glyphs (zoom `frames/caps.png`): chroma subsampling or a chromatic-aberration filter, unverified which.
- **Captions:** burned-in white text with a thin dark stroke (see Caption spec).

## Shot table (all 16 camera setups; detector numbers kept, a/b/c = my splits, 14 merges detector 14 and 15)

Abbreviations: ECU/CU/MCU/MS/WS/EWS. Lens values are estimates of vertical FOV from perspective and are marked "est.".
Movement numbers come from shots.json or from my sums over per_frame.json: dx/dy in px (at 202 px width) over the shot,
scale = zoom factor, flow = mean px/frame (first half → second half shows easing). Character motion inflates "scale"
(e.g. shot 11), so every move below was checked on the strips.

| # | Time (s) | Size | Angle / height | Lens (est.) | Camera move (verified) | Subject and animation | Light | On-screen text | Why the cut lands here |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.000–6.033 | WS → MCU → WS → CU | Eye level ~1.2 m, then chest height for the CU | normal ~50° | **Three moves in one take.** 0–1.85 slow push-in (scale ~1.86, flow 1.1→0.3). 1.9–2.3 fast orbit right + push to MCU (6 frames). 3.3–4.0 the hero swings out of frame left while the camera holds on the casino. 4.0–4.4 swing back + push to CU, then a slow push 4.4–6.0 (×1.11, flow 1.1→0.3, ease-out). Roll 6.4° overall | **Impossible opening:** an old man lies in a lunar crater (0.0), climbs out (0.8–1.9, mocap-like climb), rubs his chin (2.4–3.4, thinking gesture), then turns to camera with a wide-eyed open-mouth **shock face** (4.4–6.0, held pose, no lip-sync visible at 360p). A cart with red spoked wheels behind him (identity unverified). The chip logo on the sign spins | Moon preset: black sky, hard white sun from camera-left (hero lit on his left), Earth with blue rim. Luma 42→74, centre 20→123 (the face fills the centre at the end). Sign bulbs and chip logo bloom | "If you ever woke up / on the moon / with the urge / to play at a casino / gambling there / would be a nightmare". 3D text "LUNA ROYALE casino" | On "nightmare" (the hook ends). Cut 2 frames before "Every roulette spin" |
| 2 | 6.033–8.733 | Insert ECU → MS | High angle ~50° over the wheel → eye level | normal ~50° | Slow drift/rotation on the wheel 6.0–7.1, then a **7-frame pull-back + tilt up** (7.10–7.33) to an MS of the gambler; held after. Scale 0.28, roll −21° (the fit reads the wheel's rotation) | Roulette wheel spinning slowly, ball resting near the green 0 pocket (6.0–7.0: the ball barely moves = "absurdly long"). Then a bored old gambler in a brown jacket slumps over the table, head propped on his hand (static pose). Behind: alien, slot machines, helmeted players, Mars | Moon preset. PBR wood with a specular hot spot on the turret. Luma 102→61 | "Every roulette spin / would take absurdly long" | On "long" + comma. The picture explains "since the lunar gravity" next |
| 3 | 8.733–11.667 | WS (split screen) | Eye level ~1 m | normal ~45° | **Locked off** (dx −1, scale 1.004, flow 0.0) | **Vertical 50/50 split screen**: left = the hero on Earth (park, no helmet) jumping a little and landing at once; right = the hero on the Moon (helmet) jumping and **floating high with arms out** (9.6–11.4), still in the air when the left one has landed. Mocap-like jump clips with slowed gravity on the right | Left: daylight park, blue sky, sun from the left, green 150+ sat. Right: black sky, hard sun. Mid luma 60, sat 159, warm +18.6 | "since the lunar gravity / is 6 times weaker / than on Earth," | On "Earth," (the comparison is complete) |
| 4 | 11.667–14.833 | MS insert (wheel with dealers' torsos behind) | Table height ~1 m, slight high angle | normal ~45°, foreground table rim soft | **Slow push-in** ×1.17 with roll −5.4°, flow 0.24→0.32 (linear) | Wheel at rest; dealers (green dress, red-vest croupier) stand behind, heads cropped. **12.05 two red 3D arrows pointing down** pop on; **12.1–12.55 the wheel fades to an x-ray ghost and a glowing cyan octagonal bearing appears**. 13.8 the arrows turn saturated red, **14.0 they swap to pale-green arrows pointing up** (less load) | Scene darkened under the diagram (centre 99 / edge 46). Cyan emissive bearing + red/green arrows with bloom | "the wheel bearing / would experience / much less / gravitational loading" | On "loading" (end of the clause) |
| 5 | 14.833–17.733 | ECU insert (wheel pockets 17, 34, 6, 27) | Eye level with the rim, ~5 cm above the wood | wide close-up ~60° est., foreground wood strongly blurred (shallow DOF look) | **Truck/pan along the rim** dx +588, flow 9.7→5.0 (ease-out), then held from 17.0 | **Columns of blue low-poly spheres ("air") rain down** over the pockets 14.8–16.9, then **dissolve out in 2 frames (16.93–17.0)** on "slowing the wheel down", leaving an empty, still wheel | Warm wood (warm +32, sat 163), blue spheres, black sky. Luma 75–88 | "and almost / no air resistance / slowing the wheel down" | On "down" → the result sentence |
| 6a | 17.733–20.467 | Insert ECU (hand) → WS | High angle ~50° → eye level 1.6 m | normal ~50° | Hold on the hand 17.73–18.5, then a **19-frame pull-out / crane back** 18.53–19.17 (scale drops 0.89×/frame at the peak, flow 9.6→0.4: ease-in-out), then held | **Earth casino.** The croupier's white-sleeved hand spins the wheel (17.8–18.6, keyframed hand), pull-out reveals bald croupier in a red vest and two seated players (camo shirt, white suit). Idle loops | **Interior preset:** dark room, warm pendant lamp over the table with bloom on its rim, blue slot-machine screens, plants, dark red carpet. Centre 89 / edge 29 (pool of light) | "So a normal roll / that would last / 10 seconds on Earth" | Dissolve starts on "Earth" |
| 6b | 20.467–22.933 | WS | Eye level 1.6 m | normal ~50° | **Locked off, identical framing to 6a.** Entered by a 15-frame **match cross-dissolve** (20.467–20.967) | **Same croupier and table, now on the Moon**: regolith floor, Mars in the sky, an alien, helmeted gamblers and slots behind. The croupier leans over the wheel (waiting) | Moon preset. Luma 42→70 through the dissolve (brighter than Earth's interior) | "could take up to / a minute on the moon" | Dissolve out on "moon" → new game |
| 6c | 22.933–27.667 | WS → MS two-shot | Eye level ~1.3 m | normal ~45° | 3-frame dissolve in. Empty WS, the two men walk in from the left (23.1–23.4), then a **slow push-in** to a two-shot (23.4–27.6: ×1.9 by the fit, flow 1.2→0.5) | Hero (striped polo) and a brown-suit man stand idle; the hero looks at his hand (coin, too small to see). An **orange loaf-shaped object drifts across the sky** past Earth 24.0–26.4 (identity unverified: gold bar or space debris). "NO" on a held frame | Moon preset, hard sun from camera-left, faces half shadowed. Luma 63–65 | "You might think that / something like / a coin flip / would be a simpler game / in that environment, / but / **NO**" (all caps) | On "NO" (the punch) → the coin insert |
| 7 | 27.667–30.033 | ECU insert (hand + coin), side view | Hand height, ~0.5 m from the hand | ~50°, background trees slightly soft | **Locked off** (dx 0.4, scale 1.002) | Low-poly hand (striped sleeve visible at 29.0–29.4) with a **quarter on the thumb**; flick at 28.4–28.6, hand opens, coin flies up out of frame (29.4). Keyframed, blocky fingers | **Earth park preset:** bright noon, blue sky, green lawn. Brightest shot: luma 116, centre 172, warm +48 | "Using your coin toss / muscle memory / from Earth" | On "Earth" → the result |
| 8 | 30.033–33.133 | Top-down EWS → coin ECU | **90° top-down**, rising from ~5 m to ~30 m | normal ~45° | **Crane straight up** (scale 0.30, flow 2.49 → 0: fast start, hard ease-out), then held | The two men seen from above with **very long hard shadows** to upper-left; then the **quarter rises toward the lens** from 31.2, spinning (heads, edge, tails, edge), fills ~60 % of the frame at 32.6 | Grey moon, desaturated (sat 6.7), low sun from lower-right. The coin has a photo texture with real specular | "will send that coin / flying / multiple stories high" | On "high" (the coin peaks) |
| 9 | 33.133–41.700 | WS two-shot → WS group | Eye level ~1.3 m | normal ~45° | Slow push ×1.5 (33.1–36.7), **whip-pan left 36.73–37.17** (14 frames, heavy motion blur), then near-static push ×1.1 on the craps table | **Gag in a held frame:** the two men tilt their heads up (33.2), walk out of frame left (33.6–33.8), the frame stays empty while the **coin falls as a thin blue light streak** (34.2–36.6), they **walk back in carrying beer glasses** (34.6) and wait, the hero holds his palm out. Whip to the craps table: 6 players (dealer, brown suit, hero, alien, old woman). **40.2–40.8 the table glitches** through 4 positions/rotations; 40.9–41.0 the frame washes grey; **41.1–41.7 a Windows 7 dialog "LoadedDice.exe has stopped working / Windows is checking for a solution to the problem..." with a green progress bar and Cancel** | Moon preset (luma 70–94, sat 114). Dialog is flat white UI | "and you'd have to wait / around 7 seconds / just to get it back. / And if you like / dice games / well, / you're out of luck / because craps would be / the most cursed one." Overlay: error dialog | On "one." (the crash joke) |
| 10 | 41.700–47.633 | MS → WS → EWS tracking → WS | Eye level ~1.3 m, then rising to ~3 m | normal ~45° | **Pull-back** 42.9–43.4 (continuous, c_42.9), throw at 44.0, **5-frame whip right** (44.33–44.40) following the dice, then **tracks/pans the dice across the sky** past Earth and Mars (44.4–46.0, flow 7.4→5.0), **tilts down** to a far table (46.0–46.5) | Old woman (photo face) throws, alien watches. Dice leave **glowing cyan-white light trails**. They land in a long craps table sunk in the regolith ~15 m away and bounce: **an expanding cyan shockwave ring** 46.8–47.4 | Moon preset; trails and ring bloom. Luma 60→95 | "Because if you threw / the dice / with the same force / that you do at home, / it could travel / 15 meters / before bouncing." | On "bouncing." (the impact ring) |
| 11 | 47.633–50.100 | High WS | High angle ~45°, ~4 m up | normal ~45° | **Crane up/back** (scale 0.17, flow 2.7→0.8, ease-out) | The craps table **stretches along its length to ~5×** (48.2–49.2, scale animation), players at one end, dealer at the other | Flat grey moon, sat 53, luma 111 (the most even light) | "So the table / would have to be / incredibly long" | On "long" |
| 12 | 50.100–51.133 | MCU → sky → WS | Low angle ~0.8 m looking up | normal ~50° | **Fast follow:** the camera tilts up with the dice into the sky (Earth passes), then back down onto the table end (flow 14.8→20.7, parallax 9.3) | Old woman (photo face) throws hard; dice streak up with trails | Darkest setup (luma 29, centre 15): mostly black sky. Cool (warm −17) | "and even then," | Cut on the comma, reverse angle |
| 13 | 51.133–56.300 | MS → ECU (die) → MS | Table-rail height ~1.1 m, then inside the trench | normal ~50° → close | **Push down the table** with the dice (×4.3 in 1.5 s, flow 4.9→9.2, ease-in), slow-motion **macro on one tumbling blue die** 52.6–54.8, then **crane up out of the trench** (54.85–55.2) and **truck right** onto the players (55.2–55.4) | Dealer at the far end (photo face); dice fly toward camera, **hit the wall at 52.0–52.4 with a blue shockwave ring**, bounce back. **White spheres pop on at 53.18** (one frame, no fade) around the slow-motion die. Players (bearded brown suit, hero, alien) with chip stacks; a dice trail flies over their heads | Moon preset, cool (warm −29), trails bloom; luma 35–88 | "after the dice / hit the wall, / since there's no air drag, / they could go flying / almost anywhere." | On "anywhere." → the last beat |
| 14 | 56.300–63.767 | WS → (foreground MS) → ECU face → static | Low, ~0.9 m, behind the table rail (dark band across the lower third) | normal ~45° | **Near-static** 56.3–58.7 (scale 0.87, flow 0.8→0.6), then the **subjects bring the motion:** an alien crosses close to the lens (59.2–59.6) and another **walks into the lens** (62.23–63.0, face fills the frame). Glitch overlays at 58.8–59.1, 61.0–62.2, 63.07–end | The two men **hunch over their chips** (protecting). **Earth flares white-hot 56.6–57.8, fading to orange** (meaning unverified). Aliens walk in from the right (57.2), a **green neon UFO** descends (58.0), aliens **vacuum the chips with a pink gun** (59.8–60.8). The last alien stops in ECU and **frowns into the camera** (62.4–63.0), then **full TV static** to the end | **Neon UFO preset:** green emissive rings flood the top half, black sky; luma 42→97 as the UFO arrives. Static frames luma ~90 | "But the worst part / would probably be / protecting your chips / fr... / ....that are kn..... / ..... / ......." (dots only) | The video ends cut off by static: the sentence never finishes |

## Story structure with timestamps

| Beat | Time (s) | What happens |
|---|---|---|
| Hook (premise + impossible image) | 0.0–6.1 | "If you ever woke up on the moon with the urge to play at a casino, gambling there would be a nightmare." A man wakes in a lunar crater, the LUNA ROYALE sign, his shock face |
| Game 1: roulette, claim | 6.1–8.8 | "Every roulette spin would take absurdly long" (still ball, bored gambler) |
| Mechanism (3 pictures, 3 causes) | 8.8–17.8 | Split screen of jumps (gravity), x-ray bearing + arrows (load), blue air spheres removed (no air) |
| Payoff in one transition | 17.8–22.8 | Earth casino → match dissolve → Moon casino: "10 seconds on Earth could take up to a minute on the moon" |
| Game 2: coin flip, expectation flip | 22.8–27.7 | "You might think... a coin flip would be simpler... but NO." |
| Mechanism + gag | 27.7–36.6 | Hand insert, top-down coin rising "multiple stories high", the men leave and come back with beers while it falls "7 seconds" |
| Game 3: craps, escalation | 36.6–41.7 | "The most cursed one." Glitching table + Windows crash dialog |
| Mechanism (escalating set pieces) | 41.7–55.8 | Dice fly 15 m past planets, the table stretches 5×, dice bounce off the wall and fly "almost anywhere" |
| Twist / ending | 55.8–63.8 | "The worst part would probably be protecting your chips fr..." Aliens (planted as gamblers since 7.2) raid the chips, the transmission jams, an alien stares into the lens, static. The last line is cut off. There is no CTA. A seamless loop is not verified (the static does not match the dark first frame) |

## Camera statistics (16 setups, verified against the pictures)

- **Every setup but 3 moves.** Locked off: 3 (split screen), 6b (match-dissolve target), 7 (hand insert). Shot 14 is almost static and lets
  the characters move instead.
- **In-take flights (fast part 5–19 frames, then a hold): 8**, in shots 1 (×2), 2, 6a, 9, 10, 12 and 13 (1.9, 4.0, 7.10, 18.53, 36.73, 44.33, 50.4, 54.85 s). Easing is usually fast-in / hard ease-out
  (shot 6a flow 9.6→0.4, shot 8 2.5→0, shot 11 2.7→0.8). Whips: 36.73 (14 frames, left), 44.33 (5 frames, right).
- **Slow push-in: 5** (1 start and end, 4 ×1.17, 6c, 9 first half, 13). Typical ×1.1–1.2 over 1.5–3 s.
- **Pull-out / crane back or up: 4** (2, 6a, 8 top-down crane, 11 high crane).
- **Object-follow moves: 3** (10 dice across the sky, 12 dice up and down, 13 dice down the table). The camera behaves like a
  sports camera chasing a projectile.
- **Shot sizes:** inserts / ECU of props or hands 5 (2, 4, 5, 6a start, 7), WS 8, top-down 1 (8), MS/MCU 3, face CU 2 (1 end, 14 end).
  Many shots pass through two or three sizes inside the take.
- **Heights and angles:** eye level ~60 %. Table height / rim level for props (4, 5, 13). High angle for overview (2 start, 11),
  **one 90° top-down** (8). Low angle for the throw (12) and the alien into the lens (14).
- **Lens:** mostly a normal ~45–55° vertical FOV (est.). The props inserts read wider and closer (~60° est.) with a blurred foreground
  (5: the wood at the bottom of frame is soft). Depth of field elsewhere is unverified at 360p.
- **Roll:** small (−5° to +6°) and only during pushes; the large roll values in shots.json (−37°, −62°) are fit artefacts from the
  spinning wheel and the dice trails.

## Lighting presets (recipes to rebuild)

1. **Moon, hard sun** (1, 2, 6b, 6c, 9, 10, 11, 13). Pure black sky with a sparse starfield; one directional sun (white, ~5500 K) from
   camera-left or behind-left, hard-edged shadows; almost no fill (dark sides read 20–40 luma), no atmosphere/haze. Earth, Mars and a
   Jupiter-like planet as large textured spheres lit from the same side (Earth gets a thin blue rim). Regolith with high-frequency
   normal/displacement detail. Measured: mid-luma 58–89, sat 106–160 (from colourful clothes and green tables), warmth −29…+14,
   centre/edge 54–112 / 50–84 (mild vignette).
2. **Earth park noon** (3 left half, 7). Blue sky gradient, sun high-left, bright green lawn, two trees. The brightest preset:
   luma 116, centre 172, warmth +48. Used **only to say "on Earth"**, so colour itself labels the planet.
3. **Earth casino interior** (6a). Dark room, a **warm pendant lamp over the table** (practical light with bloom on the shade rim),
   blue slot-machine screens as background practicals, plants, dark red carpet. Centre 89 / edge 29: a pool of light on the table.
4. **Diagram mode** (4, 5). Scene kept but dimmed; the explanation is drawn in emissive colour: cyan x-ray bearing, red down / green up
   arrows, blue air spheres. Bloom on all of it.
5. **Top-down grey** (8). Fully desaturated look (sat 6), low sun → long shadows across the frame, the coin as the only bright object.
6. **Projectile VFX light** (10, 12, 13). Cyan-white light trails behind the dice and cyan shockwave rings at impacts, strongly bloomed;
   they act as the key light on the green felt in 13.
7. **Neon UFO finale** (14). Green emissive UFO rings and a green spot pool; luma climbs 42→97 as it arrives; green spill onto the
   aliens and the ground (60.73).
8. **Glitch punctuation.** Grey wash + white UI dialog (40.9–41.7); TV static (58.8–59.1, 61.0–62.2, 63.07–63.77).

## Caption spec

- White, sentence case (one exception: "NO" in caps at 27.2), bold rounded sans (Inter/Montserrat-Bold-like; the exact font is
  unverified), **thin dark outline (~1 px at 360p, ≈3 px at 1080p) plus a soft shadow** (zoom `scratchpad/work/F/frames/caps.png`).
  No box, no colour highlight, no word-by-word animation.
- **Small:** text-line height 0.022–0.036 of the frame height (OCR text_h_frac; ≈ 10–13 px of 360). One line, centred, max width ≈ 0.6.
- **Position:** fixed at y ≈ **0.70** of the height (OCR y_frac 0.697–0.701 on every narration chunk).
- 1–5 words per chunk (mean 3.2), phrase-based, punctuation kept ("Earth," "one." "anywhere."). Hard on/off per chunk.
- Sync: the picture leads the next chunk by 0–5 frames (13 of 15 transitions sit within 0.1 s of a chunk start: e.g. 6.033 → 6.1,
  41.700 → 41.7, 51.133 → 51.1).
- **Captions are part of the gag at the end:** the text glitches to "fr..." and then to dots while the static takes over.

## Animation and VFX

- Body animation: mocap-like clips (climb out of crater, jumps with different gravity, walk in/out, throw, lean on the table,
  hunch over chips). Hands in inserts are keyframed with blocky fingers. Faces: held expressions (shock), no visible lip-sync at 360p.
- **Physics gags:** slow-floating jump (3), coin rising 30 m and falling as a streak (8–9), dice flying 15 m (10), wall bounce (13).
- **Object deformation as a joke:** the craps table stretches 5× (11).
- **Glitch teleport** of a prop (9, 40.2–40.8) and a **fake OS crash dialog** (41.1).
- **Diagram VFX:** x-ray fade of the wheel + emissive bearing (4), 3D arrows that change colour and direction (4), air-sphere fields
  that appear/disappear (5, 13).
- **Trails and rings:** cyan light trails on dice and coin, cyan shockwave rings on impacts (46.8, 52.0).
- **Match dissolve** Earth → Moon with the same camera (6a → 6b).
- **Signage:** 3D arched text with a spinning chip logo and sparkling bulbs (1).
- **Ending:** UFO arrival, chip-vacuum gun, alien walks into the lens, TV static over picture and captions.
- Post: bloom, mild vignette, colour fringing (unverified source).

## Edit rules (observed)

1. **Cut (or dissolve) on the end of a clause**, 0–5 frames before the next caption chunk: "nightmare" 6.033, "long," 8.733, "Earth,"
   11.667, "loading" 14.833, "down" 17.733, "Earth" 20.467, "moon" 22.933, "NO" 27.667, "one." 41.7, "bouncing." 47.633.
2. **One idea per setup, but the picture keeps changing inside the setup.** A flight, whip or gag changes the subject every ~1–1.5 s
   while true setups last 4 s on average (8.57 s max with three gags inside).
3. **Every mechanism gets its own diagram picture**: split screen for gravity, x-ray + arrows for load, spheres for air. The narration
   lists three causes and the picture gives three different devices.
4. **Earth vs Moon is shown by a colour switch** (bright park or warm interior vs black sky), never by a label.
5. **A dissolve is used once, for the before/after payoff** (same framing, Earth → Moon). Everything else is a hard cut or a camera move.
6. **Each "game" escalates the spectacle**: roulette (still wheel) → coin (30 m, top-down) → craps (dice past planets, table stretch,
   wall bounce) → aliens + broadcast failure.
7. **Plant and pay off:** aliens appear as background gamblers at 7.2, 20.8, 37.2 and 55.4 before the finale raid.
8. **Comic timing on single words:** "NO" gets its own chunk and a held frame (27.2–27.7); "well," gets 0.4 s.
9. **The end is an interrupted sentence plus static** instead of a CTA: the open loop invites comments (inferred, unverified).

## Audio

- Voice: one male narrator, fast (198 wpm overall, 211 wpm over 0–59.8), conversational explainer, second person ("you", "your").
  Voice quality and accent unverified (I could not listen).
- A continuous bed under the voice: no silence anywhere; RMS floor −31 dB. Whether it is music, and which kind, is unverified.
- **Finale is louder:** 56.5–62.5 s runs 5–8 dB above the rest (−9…−13 dB vs −15…−22 dB). The 56.5 window has a very low spectral
  flatness (0.086 = tonal/low), which fits a boom or music swell under the Earth flare (unverified by ear).
- Short dips below −35 dB at 40.95–41.0 (the crash freeze) and 20.4 (the dissolve): possibly sound cut for the gag, unverified.
- Whether the TV static has a noise SFX is unverified (63.0–63.77 flatness 0.40–0.48, not white-noise-like).
- Mastered loud and flat: −15.4 LUFS, LRA 2.3 LU, true peak −1.8 dBFS, stereo AAC.

## Craft above the first creator (vs ref A, the myth channel)

| What F does | Evidence | How we build it with our tools |
|---|---|---|
| **Camera flights instead of cuts**: 8 fast moves (5–19 frames, hard ease-out) carry the viewer to the next subject | 7.10–7.33, 18.53–19.17, 36.73–37.17, 44.33–44.40, 54.85–55.35 | In Three.js, keyframe camera position + lookAt with a cubic ease-in/ease-out curve per segment; add per-frame motion blur by accumulating 4–8 sub-frames in render.mjs (or a velocity blur pass) for the whips |
| **Prop macro inserts** (wheel pockets, coin on thumb, tumbling die) with a blurred foreground | 14.8–17.7, 27.7–30.0, 52.6–54.8 | Model the prop in Blender (PBR, bevels so speculars catch), export glTF; render in Three.js with a 60° camera 5–30 cm away and a BokehPass (DOF) with focus on the prop |
| **Diagram overlays inside the 3D scene**: x-ray fade, emissive bearing, colour-changing 3D arrows, air spheres | 12.05–14.8, 14.8–17.0 | Material opacity tween to 0.15 on the real object, a duplicated wireframe/emissive mesh (EdgesGeometry + MeshBasicMaterial cyan) with UnrealBloomPass; arrows as extruded glTF shapes with colour tweens; spheres as an InstancedMesh with a fade |
| **Split screen comparison** (same action, two worlds, side by side) | 8.733–11.667 | Render two scenes into two viewports (renderer.setScissor) in one frame; drive both from the same mocap clip with different gravity on the root-height curve |
| **Match dissolve** between two worlds with an identical camera | 20.467–20.967 | Render both scenes with the same camera keyframes; crossfade the two image sequences in ffmpeg (xfade=fade:duration=0.5) or in the render loop with a mix pass |
| **Top-down crane + projectile into the lens** | 30.033–33.133 | Camera at (x, h, z) looking straight down, h tweened 5→30 m with ease-out; coin is a cylinder with a photo texture of a real coin we photograph ourselves (or a made-up coin design, our own), spun on two axes |
| **Projectile-follow camera with light trails and impact rings** | 44.0–47.4, 50.1–52.4 | Dice simulated by a simple ballistic integrator (g = 1.62 m/s²) or cannon-es; camera target = die position with lag; trails as a TubeGeometry/ribbon along the last N positions with additive blending + bloom; impact ring = a torus that scales up and fades |
| **Visual comedy beats**: walking out and back with beers, glitching table, fake crash dialog, alien staring into the lens | 33.6–34.6, 40.2–41.7, 62.23–63.0 | Mocap walk clips (CMU BVH retargeted to our rig); a "glitch" = random transform per 3 frames; the dialog = an HTML/canvas UI card composited in ffmpeg (our own fake app, never a real OS brand); the lens stare = walk clip ending at 0.4 m from camera |
| **Story built as three escalating games + a planted twist** | 6.1 / 22.8 / 36.6 / 55.8; aliens planted at 7.2, 20.8, 37.2 | Script template: premise → 3 rounds, each claim → mechanism picture → payoff picture, bigger each time → planted interruption. Plant the twist character in the background of ≥3 earlier shots |
| **Expressive faces** (shock CU) instead of flat painted cube faces | 4.4–6.0 | Blender-sculpted stylised head with shape keys (jaw open, brows up, eyes wide) exported as glTF morph targets; drive visemes from the ElevenLabs word timings. Our own characters, never photos of real people |
| **Colour as geography** (Earth = bright green/blue or warm interior, Moon = black + grey) | 8.73, 17.7–20.5, 27.7 | Two lighting presets in three-kit.js (park sun + HemisphereLight sky; interior SpotLight pendant + emissive screens) vs moon (one DirectionalLight, ambient ≈ 0, black background) |
| **Practical lights and set dressing** (pendant lamp, slot screens, sign bulbs, neon UFO) | 17.7–20.5, 0.5–4.3, 58.0–62.0 | Emissive materials + small PointLights/SpotLights, bloom threshold tuned so only emissives glow |
| **Finale with a broadcast-failure device** (static over picture and captions, cut-off sentence) | 58.8–63.77 | Generate static with ffmpeg (`noise=alls=100:allf=t`) and blend it in short bursts; cut the voice line mid-word in the audio edit and glitch the caption text the same way |

What F does **not** do better than A: it is not second-person roleplay ("You're Baldr"), only a second-person hypothetical; it has no
character arc or emotion beyond one shock face; there is no grade punctuation like A's B&W switches.

## Weaknesses (seen, with evidence)

| Time | Issue | Evidence |
|---|---|---|
| Whole video | Low delivered resolution | This copy is 202x360 at ~445 kb/s. Captions are ~10–13 px tall and the Windows dialog text (41.1–41.7) is ~5 px: the "LoadedDice.exe" joke is unreadable on this copy. Original upload resolution unverified |
| Whole video | Narration is very fast | 210 words in 63.8 s = 198 wpm (211 wpm over 0–59.8). "well," stays 0.4 s |
| Whole video | Captions small, with colour fringing | Line height 0.022–0.036 of the frame; orange/blue fringes on the glyph edges (`frames/caps.png`) |
| 31.8–36.6 | Overstated physics numbers | A 6× weaker gravity makes the same flick go 6× higher and stay 6× longer. A normal flip (~0.3–0.5 m, ~0.6 s on Earth) gives ~2–3 m and ~3.5 s on the Moon, not "multiple stories" and "7 seconds" (my estimate; the claim needs a ~1.2 m Earth flip) |
| 6.1–22.8 | Questionable roulette claim | The 60-s spin is attributed to less bearing load and no air; bearing friction also scales with load, so "up to a minute" is not shown to follow. The picture (still ball 6.0–7.0) sells it without proof |
| 14.8–17.0 vs 53.18–54.8 | Inconsistent visual code for air | In shot 5 air spheres are shown and then **removed** for "no air resistance". In shot 13 white spheres **pop on** exactly while the line says "since there's no air drag" |
| 33.8–34.6 | Empty frame | 0.8 s of bare moonscape with only a ~2 px blue streak in the sky: on a phone nothing happens |
| 44.4–46.0 | Projectile too small | The dice are 2–4 px dots next to Mars; only the trail reads |
| 45.6–46.5 | Visible geometry seam | The sunk craps table shows a grey rectangular box with hard edges cutting into the terrain (c_45.5) |
| 27.7–30.0 | Style clash in the hero insert | Blocky low-poly fingers in the brightest, largest insert, next to the sculpted face (5.5) and photo-textured faces (50.35, 51.8). Three face styles in one video: sculpted 3D, flat photo, alien |
| 23.0–27.6 | Stiff idle two-shot | 4.7 s of two men standing still with a slow push; the coin in the hero's hand is not visible |
| 56.6–57.8 | Unclear image | The Earth flares white-hot and fades to orange with no narration to explain it (could read as Earth exploding) |
| Whole video | World logic | Characters breathe, talk and drink beer on the Moon in open-face hoods; the narration's physics is strict while the world is not (fine for comedy, but it undercuts the "science" tone) |
| 58.8–63.77 | Ending withholds the payoff | The sentence is cut ("fr... that are kn..."), the last 0.7 s is pure static. The open loop may drive comments, but viewers do not learn the "worst part" |
| 0–63.8 | Flat audio dynamics | LRA 2.3 LU; the only dynamic event is the +5–8 dB finale |
