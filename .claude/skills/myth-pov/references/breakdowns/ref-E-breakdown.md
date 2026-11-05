# Reference E: "How you GAMBLED..." (second creator: when a street bet or a coin flip legally counts as gambling) - frame-by-frame breakdown

Source analysed: `scratchpad/ref/E_how_you_gambled.mp4` (the downloaded copy: **202x360**, 30 fps, H.264 ~317 kb/s, AAC stereo
44.1 kHz ~96 kb/s, 89.67 s). Data: `scratchpad/ana/E_how_you_gambled/` (shots.json, per_frame.json, captions.json, audio.json,
18 contact sheets). I opened all 18 contact sheets, the five 1 fps peek strips, a full 10 fps strip of the whole video
(`scratchpad/work/E/s10_00..14.jpg`, made with `scratchpad/work/E/strip2.py`), 30 fps zoom strips at every suspicious point
(`scratchpad/work/E/z_*.jpg`), enlarged single frames (`fr8a..e.jpg`, `capcrop.jpg`), my own frame-difference pass
(`scratchpad/work/E/diff.json`) and a 50 ms RMS pass over the audio.
"Unverified" = I could not confirm it from pictures or numbers. FOV / lens values are visual estimates ("est.").

## Measured totals

| Item | Value | How it was measured |
|---|---|---|
| Duration | 89.67 s (2,690 frames) | shots.json |
| Detector shots | 18 (avg 4.98 s) | shots.json |
| **Camera setups after checking** | **15** (mean 5.98 s, median 6.47 s, min 0.87 s, max 11.77 s) | 5 detector cuts are not cuts (24.200 blue highlight, 27.667 blue highlight, 68.967 panel turns grey, 82.533 grade to B&W, 87.267 grade back to colour). 2 transitions the detector missed (17.30 coin wipe courtroom -> diner, 29.93 whip-dissolve diner -> banquet hall) |
| Shot-length histogram | <=1 s: 2, 1-3 s: 1, 3-5 s: 2, 5-8 s: 7, >8 s: 3 | corrected list |
| **Picture-change events** | ~45 in 89.7 s (one every ~2.0 s): 14 cuts/transitions, 4 whip pans, 1 fly-in, 1 crane, 2 push-ins, 8 infographic-panel events, 7 object glows, 3 floating labels, 1 freeze, 3 grade snaps, 4 in-scene gags (police, crash) | my count from the 10 fps strips |
| Narration | **302 narrator words in 85 caption chunks** + 27 influencer words + 4 "you" words = **333 words on screen** | cleaned OCR, checked against frames |
| Words per minute | **narrator ~202 wpm** (302 / 89.67 s); all speech ~223 wpm | words / duration |
| Words per narrator chunk | mean 3.6, median 4 (1 word: 4, 2: 17, 3: 19, 4: 21, 5: 20, 6: 2, 7: 2). Longest: "I think you have a better chance" (7) | cleaned chunks |
| Caption on-screen time | mean ~0.95 s per narrator chunk | 85 chunks over ~80 s of narration |
| Loudness | **-13.7 LUFS** integrated, LRA 3.0 LU, true peak -0.9 dBFS. No silences | audio.json (EBU R128) |
| Audio floor | 50 ms RMS: p5 -30.1 dBFS, median -17.9, p95 -11.7, max -9.0. Only 15 of 1,794 windows below -35 dB, 8 of them inside 82.6-86.6 s (the B&W section) | my RMS pass |
| Picture brightness | Street daylight 146-160, phone-UI shots 123-129, diner POV 161-185, banquet 92-122, courtroom 74-86, panel-darkened backgrounds 75-88 | per_frame.json luma, shots.json light_mid |

**Hidden or mislabelled transitions I checked frame by frame.**

- **False cuts (no camera change):** 24.200 (plate turns glowing blue, f726), 27.667 (receipt turns glowing blue, f831),
  68.967 (the infographic panel turns grey, same background), 82.533 (top-down street snaps to B&W: f2475 and f2476 have the
  identical framing, z_8247.jpg), 87.267 (the phone shot snaps from B&W back to colour: f2617 and f2618 identical framing, z_8717.jpg).
- **Missed transition 1, 17.20-18.30: coin wipe.** A 3D US quarter flies up from the bottom of the courtroom frame (17.20), fills
  the frame, and behind it the background changes to the diner window (from f519, 17.30). The top band of the frame still shows the
  courtroom wood and the judge's hand until 18.23 (z_171.jpg), so it is a masked layer wipe, not a clean cut.
- **Missed transition 2, 29.83-30.07: motion-matched whip-dissolve.** The high-angle diner shot trucks right and accelerates
  (frame diff 19 -> 80 px/frame, 29.17-29.73), then a ~7-frame cross-dissolve into the banquet hall, which is already moving the
  same way and eases out by 30.6 (z_290.jpg).
- **In-take moves, not cuts (the detector was right):** 13.70-14.20 fast push-in on the judge; 19.00-19.60 crane/tilt down from the
  diner window to the booth; 23.60-23.97 third-person -> first-person fly-in (z_236.jpg); 24.77-25.00 whip up to the window and
  26.33-26.67 whip back down to the table (z_247.jpg, z_263.jpg); 38.50-38.80 and 41.00-41.40 POV whips past a guest's head;
  47-55 slow orbit around "you" behind the panel; 62.43-62.97 the phone UI slides off while the 3D camera pushes in (z_623.jpg).
- **Freeze, not a cut:** 8.97-9.07 a 3-frame dissolve into a B&W freeze frame with the red word "GAMBLING" (z_089.jpg). Same
  camera, the police have moved a few frames on.
- **Same take across two table rows:** rows 4 and 5 (17.30-29.067) are one continuous camera: coin -> crane down -> fly-in -> POV.
  I split them only to keep the table readable.
- **Re-used setups:** the phone-UI framing appears 3 times (2.6, 56.133, 82.933); the top-down street framing twice (64.967, 78.300).

## Clean narration (302 narrator words; dialogue marked)

> If an influencer comes up to you in a street and says:
> **INFLUENCER:** "For $5, how many states are in the U.S.?"
> Don't instantly answer them, because you could be engaging in an illegal act of gambling! According to the US lottery laws,
> for a game to be an illegal lottery, it has to have elements of prize, chance, and consideration. So if you ever used a coin
> flip to decide whether you or your friend pays for dinner, that technically could have been unlicensed gambling. Since there's
> a prize - dinner, determined by chance - a coin flip, and you're risking paying for the entire bill - consideration. Or worse,
> if you're American and have ever had a group dinner, you may have committed illegal gambling by playing credit card roulette.
> It's where you let the waiter RANDOMLY pick a credit card that would PAY for yours and everyone's dinner, with the RISK of your
> card being selected. Of course, no one will arrest you for engaging in social gambling like this. And an influencer offering
> you $5 to answer a question is likely just a giveaway, since it lacks the element of you putting your money on the line. But
> let's say you answer his question correctly, and he offers you this:
> **INFLUENCER:** "Do you want to go double or nothing?" **YOU:** "Mhm." **INFLUENCER:** "Name 5 countries other than the U.S."
> Now you're actually betting the $5 that you previously won, which is the final piece needed for it to count as gambling, or an
> illegal lottery. Or at least... that's what I thought, because it turns out that trivia questions like these are not seen as
> chance, but rather a skill based outcome. So unless they start asking you truly random stuff like *"what number am I thinking
> of?"* You're good. It's not illegal gambling, but to be honest, I think you have a better chance of guessing the number in their
> head than naming 5 countries other than the US.
> **YOU:** "Umh... London?" **INFLUENCER:** "Mhmn.." **YOU:** "F###"

OCR fixes (checked on frames): the in-scene phone UI text ("douchebag_interviews", "bahah dude doesnt know map", "see translation",
"Original sound") was glued onto almost every caption line from 2.6-9.6, 56.1-62.9 and 82.9-89.7 and is not narration.
"PRIZE CHANCE CONSIDE- RATION" (judge's sign and the infographic), "LOADED DINER ... NO TIP >:C" (receipt), "1800 OCEAN DRIVE"
(building sign), "SKILL" (sticker) and "GAMBLING" (title) are overlays or in-scene text. "detemined", "acoinflp", "Islikely",
"thattivia", "I's" are OCR errors. The word in CAPS (RANDOMLY, PAY, RISK) is really capitalised on screen (37.5 frame).
"F###" is censored on screen. Who speaks which bubble is inferred from the bubble colour (maroon = influencer, green = you).

## Look of the world (applies to every shot)

- **Engine look:** realistic game-engine sets (Unreal/Unity-store-like, engine unverified) with PBR materials: white Art-Deco
  apartment blocks, palm trees, a cumulus blue sky and a "1800 OCEAN DRIVE" address sign (a Miami-Beach-like street); a 1950s
  American diner (red/white striped booths, black-white checker floor, teal trim, chrome jukebox selectors, pendant lamps, a big
  window onto a lake and trees); a wood-panelled courtroom (bookshelf, potted palms, gavel, leather books); a gilded banquet
  hall (crystal chandelier, wall sconces, gold drapes, Corinthian columns, parquet).
- **Characters:** a mixed cast. The influencer is a **low-poly, boxy body** (blocky shoulders and forearms, flat orange skin,
  floral swim shorts) with a **photo-like face texture and sunglasses** (63.5, 72.0). The judge is a 3D body with a 3D wig and a
  photo-like old-man face (12.0, 15.0); identity unverified. The diner friends have semi-realistic 3D heads (25.6). "You" on
  the street is a stylised figure in a red vest, white sleeves, black trousers and white headphones, mostly seen from behind or
  from above. Banquet guests are generic store NPCs. The friend in the white tank top has an almost featureless, blurred face (72.0).
- **Props as heroes:** a US quarter (Washington profile and eagle reverse) in extreme close-up; a steak plate; a joke receipt
  ("LOADED DINER ... 1 LOBSTER ... 2 MAYO PACKS ... 1 DINO NUGGET ... NO TIP >:C"); a fan of credit cards and one gold card;
  a wad of dollar bills; police cars and officers.
- **Overlays (a second layer over the 3D):** a fake short-video app UI (right rail with avatar, heart, comments, bookmark,
  share; bottom handle, caption, "see translation", "Original sound", a spinning disc icon, a bottom nav bar); speaker-coded
  speech subtitles; a 3-card blue infographic (PRIZE / CHANCE / CONSIDERATION) with icon art; floating blue keyword labels;
  a "SKILL" sticker; a red "GAMBLING" title.
- **Post:** soft bloom on whites and practicals, a light haze; vignette only in dark interiors (courtroom centre 120 vs edge 57).
  Colour fringing on caption edges is visible at 202x360 (capcrop.jpg); whether it is a filter or chroma subsampling is unverified.

## Shot table (all 15 camera setups; rows 4 and 5 are one take)

Abbreviations: ECU/CU/MCU/MS/WS/EWS, OTS = over the shoulder, POV = first person. Movement numbers from shots.json (dx/dy px at
202 px width, scale = zoom factor, flow = mean px/frame, first -> second half) and per_frame.json; every move checked on the strips.

| # | Time (s) | Size | Angle / height | Lens (est.) | Camera move (verified) | Subject and animation | Light | On-screen text (caption + overlay) | Why the cut lands here |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.000-2.600 | WS street, ends as OTS | Eye level, ~1.2 m, looking down the sidewalk | normal ~50° vert., deep focus | **Slow dolly forward** (scale 1.25, flow 0.49 -> 0.53, linear). "You" (red vest) enters frame right at 2.2 and becomes a foreground OTS shoulder by 2.57. Detector roll 8° not visible on the sheet (unverified) | The influencer (orange, floral shorts) and his heavy friend walk toward camera (mocap-like walk cycles), suited NPCs on the pavement | **Miami noon**: blue sky with cumulus, white facades, sun high, short soft shadows. Luma 146-156, centre 157 vs edge 129, sat 65-75, warmth -14 -> +8 | If an influencer / comes up to you in a street / and says: | Cut on the colon "says:" (2.2), so the quoted question gets its own picture |
| 2 | 2.600-9.667 | MS two-shot inside a **fake phone UI** | Eye level, ~1.5 m, frontal | ~45°, deep focus | **Near-locked, light handheld jitter** (flow 0.36 -> 0.48, jitter 0.88). 8.97-9.07 3-frame dissolve into a **B&W freeze** that slowly darkens (luma 135 -> 108 by 9.47) | Influencer fans dollar bills and holds a phone, friend holds a blue cup; idle gestures, hand on chest (mocap-like). 8.60-8.93 **two police officers walk in** from the left and grab them (the gag on "illegal act") | Street daylight under a white top scrim and dark bottom scrim from the UI; luma 108-138. **7.73-8.93 a magenta wash** (warmth 22 -> 4.6, hues red/magenta/blue-violet) before the police arrive. 9.03 desaturated freeze | Speech bubbles (white bold on translucent maroon box, $5 in green): For $5 / how many states / are in the U.S.? Narrator: Don't instantly answer them / because you / could be engaging / in an illegal act / of gambling! At 9.03 red bold "GAMBLING" title with dark drop shadow at y ~0.45 | Lands on "According" (9.6-9.7): the freeze ends the hook, the cut starts the rule |
| 3 | 9.667-17.300 | MS -> MCU (judge + sign) | Eye level, ~1.4 m, frontal, symmetrical | ~45° then ~30° after the push; background slightly soft | **Locked 9.67-13.70, then a fast push-in 13.70-14.20** (15 frames, eases out) to an MCU of the sign. Then held while the gavel swings into lens | Judge in a wig holds a printed sign "PRIZE / CHANCE / CONSIDERATION" and bangs a gavel on each element (keyframed arm, 14.4, 15.0, 15.9). Each word on the sign turns **blue** as it is said | **Courtroom**: warm wood, key from front-top, bookshelf top, potted palms; luma 74-86, sat 143-175, warmth +38 -> +62, vignette centre 90-124 vs edge 57-62 | According to the US / lottery laws, / for a game / to be an illegal lottery, / it has to have elements / of prize, / chance, / and consideration. In-scene sign words highlighted blue | The coin is thrown on "So if you ever used / a coin flip" (17.2-17.5): an **object wipe** carries us to the next place |
| 4 | 17.300-23.600 (same take as 5) | ECU coin -> WS diner booth | Eye level at the window, then crane down to ~1.3 m | ~50°; the coin is in a near-macro foreground | **Coin tumbles in the foreground 17.3-18.97** (3D quarter, edges and both faces visible), then **crane/tilt down 19.00-19.60** from the window to the booth, then **locked** 19.6-23.6 | Two friends at a booth, small arm gestures over plates. **21.6-23.6 a police officer appears behind the window and salutes/peers in** (gag on "unlicensed gambling") | **Diner daylight**: big window backlight, pendant lamps, red/white/teal palette. Luma 116-131, warmth -13 to -32 (cool) | a coin flip to decide / whether you or your friend / pays for dinner, / that technically / could have been / unlicensed gambling. / Since there's a prize - | No cut: the camera flies into the hero's eyes at 23.6 on "Since there's a prize -" |
| 5 | 23.600-29.067 (same take as 4) | **POV**: insert of plate, sky, receipt | First person, seated, looking down ~50°, then up, then down | ~60° (wide POV), deep focus | **Fly-in 23.60-23.97** (fast dolly forward and down into the seat). Hold on plate. **Whip up 24.77-25.00** to the window, hold, **whip down 26.33-26.67** to the receipt, slow drift, locked 28.1-29.07 | Untextured beige low-poly POV hands on the table. Plate **glows blue 24.20-24.70** ("dinner"). The friend's face sits low-left looking up while **the coin flips in the air 25.1-26.3 and glows blue at 25.7** ("a coin flip"). Receipt **glows blue 27.70-28.10** ("consideration") | Very bright white tabletop; luma 106-185, sat 21-56, warmth -12 to -32 (cool) | dinner, / determined by chance - / a coin flip, / and you're risking / paying for the entire bill - / consideration. In-scene receipt joke text | Cut on "Or worse," (29.1), picture 1 frame ahead |
| 6 | 29.067-29.933 | High WS diner (other booths) | High angle ~35°, ~3 m | ~55° | **Truck right, accelerating** (frame diff 19 -> 80, 29.17-29.73), slight roll, ending in a **7-frame cross-dissolve** while still moving | Static diners, empty booths, a records-decor orange wall | Diner daylight; luma 93-105 | Or worse, / if you're American | The dissolve hides the change of place under "if you're American" (29.8) |
| 7 | 29.933-35.900 | High WS banquet table | High angle ~45°, ~4 m | ~55° | Arrives moving, **eases out by 30.6, then near-locked** for 5.3 s | Eight seated guests, idle loops. 35.0-35.6 they toss credit cards onto the table | **Banquet gold**: orange parquet, chandelier glow top of frame, columns. Luma 96-122, sat 170-173, warmth +103 -> +105 | and have ever / had a group dinner, / you may have committed / illegal gambling by playing / credit card roulette. / It's where you let | Cut on "the waiter" (36.2), picture 0.3 s ahead so the waiter is already walking |
| 8 | 35.900-36.767 | MS waiter with OTS foreground | Eye level, ~1.2 m (seated guest height) | ~45°, foreground shoulder soft | **Locked** | Waiter in red vest and bow tie walks in between a seated guest (left) and a blue-dress shoulder (right) | Banquet gold, sconces, gold drapes; luma 91-94, warmth +54 | the waiter / RANDOMLY pick a credit card | Cut exactly on "RANDOMLY pick a credit card" (36.7) |
| 9 | 36.767-43.233 | **POV** of the waiter: hands + cards insert | First person standing, looking down ~45° | ~60°, deep focus | **Handheld-like POV, two whips:** 38.50-38.80 left past a guest's dark head (a black occluder frame, luma dips to 44) to the table; 41.00-41.40 back right to the cards. Roll up to -13° | Waiter's sleeve (red/white) reaches for a fan of cards held by a guest; picks a **gold card 42.7-43.2** | Banquet gold; luma 44-110, warmth +55 -> +70 | Floating blue labels anchored to objects: **"Chance"** over the cards (37.1), **"Prize"** over the table (39.1), **"Consideration"** over the cards (41.6). Captions: RANDOMLY pick a credit card / that would PAY for yours / and everyone's dinner, / with the RISK of your card / being selected. | Cut on "Of course," (43.3) |
| 10 | 43.233-46.767 | WS banquet hall, symmetric | Eye level ~1.6 m, chandelier top centre | ~55° | **Slow pull-out** (scale 0.88, flow 0.40 -> 0.16, ease-out) | **The back wall bursts (43.4), debris flies, two police cars crash in (43.7-44.3), officers walk in and arrest the guests (44.5-46.7)**. Physics debris, keyframed cars | Banquet gold, chandelier emissive with bloom, sconces; luma 103-117, warmth +78 -> +81 | Of course, / no one will arrest you / for engaging / in social gambling like this. | Visual contradiction gag; cut on "And an influencer" (46.9) |
| 11 | 46.767-56.133 | MS OTS behind "you" -> 3/4 front | Eye level ~1.3 m behind "you", ends front-left | ~45° | **Slow orbit left around "you"** (dx -132, detector roll -29° is the orbit), continued behind the panel; arrives at a 3/4 front angle at 54.9 | "You" stands, influencer and friend approach in the background, NPCs pass | Miami noon (luma 113-136). **Behind the panel 50.7-54.9 the scene is dimmed to ~50 % and cooled** (mid luma 88, warmth -46) | And an influencer / offering you $5 / to answer a question / is likely just a giveaway, / since it lacks the element / of you putting your money / on the line. / But let's say / you answer his question / correctly. **Infographic panel fades in 50.7-51.1**: three blue cards; CONSIDERATION turns dark grey at 52.73 ("lacks the element"); panel fades out 54.6-54.9 | Cut on "and he offers you this:" (56.1) |
| 12 | 56.133-64.967 | MS in phone UI -> MCU low angle | Eye level, then lower (~1.0 m) | ~45° -> ~35° | **Near-locked, then push-in with ease-in** (scale 2.0, flow 0.20 -> 0.92). **62.43-62.97 the phone UI slides down and away** while the 3D camera pushes in to an MCU under the "1800 OCEAN DRIVE" sign | Influencer fans the cash, talks on the phone; friend lifts his cup. **Cash glows blue 62.83-64.3** ("betting the $5") | Street daylight; luma 123-147 | Bubbles: Do you want to go / Double or nothing? (maroon) / mhm (green) / Name 5 countries / other than the U.S. (maroon). Narrator: Now you're actually / betting the $5 / that you previously won, / which is the final piece | Cut on "which is the final piece" (64.9-65.0) |
| 13 | 64.967-70.600 | High WS, near top-down | ~60° down, ~8 m up | ~50° | **Locked** | "You" (bottom), influencer and friend (top), NPCs walk; paper litter on the grass | Miami noon, then dimmed behind the panel (luma 68-152, mid 83, warmth -25 -> -44) | **Panel fades in 65.7-66.2**: CONSIDERATION dark ("needed for it to count") -> **turns blue at 67.1** ("as gambling"). **68.97 the whole panel turns grey** ("Or at least..."), **69.3-70.57 it tips back in 3D, shrinks and falls away** toward the pavement ("that's what I thought,") | Cut on "because it turns out" (70.6) |
| 14 | 70.600-78.300 | MS low angle (influencer) | Low ~1.0 m, looking up ~10° | ~40° | **Near-locked, slight drift** (dx +76, scale 1.06, flow 0.45 -> 0.13) | Influencer talks with a phone, friend (blurred face) right foreground, a walker crosses | Daylight under a green awning, dark doorway behind; luma 74-114; dimmed/cooled behind the panel (warmth -30) | that trivia questions like these. **Panel 73.0-77.7**: CHANCE goes dark at 74.3 ("are not seen as chance,"), **"SKILL" sticker slams on 75.5-75.8** (big -> small, rotates ~-10°) ("but rather / a skill based outcome. / So unless they start asking") | Cut 0.6 s into "you truly random stuff like" (77.7), after the panel exit |
| 15a | 78.300-82.533 | High WS, near top-down (re-use of 13) | ~60° down, ~8 m | ~50° | **Locked** | "You" scratches his head (thinking loop), NPCs walk | Miami noon, luma 149-159 | you truly random stuff like / *"what number / am I thinking of?"* (italic for the quote) / You're good. / It's not illegal gambling, | Grade snap (not a cut) on "but to be honest," |
| 15b | 82.533-82.933 | same framing | same | same | Locked, **snap to B&W** | same | sat 19-24 | but to be honest, | Cut 0.4 s into the chunk |
| 16 | 82.933-89.667 | MS two-shot in phone UI (re-use of 2/12) | Eye level ~1.5 m | ~45° | **Locked** (flow 0.27 -> 0.50) | Influencer holds up the phone to the friend; 89.2-89.6 the friend turns away | **B&W** 82.93-87.27 (sat 24-30), **snaps back to colour at 87.267** on "Umh..." (sat 66-72) | I think you have a better chance / of guessing the number / in their head / than naming 5 countries / other than the US. Then bubbles: Umh... / London? (green) / Mhmn.. (maroon) / F### (green) | Ends 0.27 s after "F###"; no outro |

(Table rows: 16 + split 15a/15b; camera setups: 15.)

## Story structure with timestamps

| Beat | Time (s) | What happens |
|---|---|---|
| Hook (situation + second person) | 0.0-2.6 | "If an influencer comes up to you in a street and says:" over a walking two-shot |
| Hook question (diegetic) | 2.6-5.1 | The influencer's own question in a phone UI: "For $5, how many states are in the U.S.?" |
| Hook threat | 5.1-9.67 | "Don't instantly answer them... illegal act of gambling!" Police walk in, B&W freeze, red GAMBLING title |
| Rule / mechanism | 9.67-17.3 | The judge and the three elements: prize, chance, consideration (each word lit blue + gavel hit) |
| Example 1 (everyday) | 17.3-29.07 | Coin flip for dinner, each element shown on an object: plate = prize, coin = chance, receipt = consideration |
| Example 2 (escalation) | 29.07-43.23 | "Or worse, if you're American..." credit card roulette in a banquet hall, labels Chance / Prize / Consideration |
| Comic release | 43.23-46.77 | "No one will arrest you" while police cars crash through the wall |
| Back to the hook, rule applied | 46.77-56.13 | The $5 street question is just a giveaway: consideration is missing (panel, CONSIDERATION goes grey) |
| Escalation | 56.13-68.97 | "Double or nothing?" Now all three elements are lit (panel all blue, 67.1) |
| **Twist** | 68.97-78.3 | "Or at least... that's what I thought": trivia is skill, not chance (panel goes grey and falls, SKILL sticker) |
| Resolution | 78.3-82.5 | "You're good. It's not illegal gambling" |
| Punchline / payoff | 82.5-89.67 | B&W deadpan "to be honest, you'd better guess the number...", colour snaps back for "Umh... London?" "Mhmn.." "F###". The ending answers the question set up at 2.6; it is not a seamless loop and has no CTA |

## Camera statistics (15 setups, verified against the pictures)

- **Locked or near-locked: 8** (2, 7 after 30.6, 8, 13, 14, 15, 16, and 3 before 13.7). This creator holds the camera still and moves the
  **content** instead (overlays, glows, gags).
- **Push-in: 3** (1 slow dolly x1.25 over 2.6 s; 3 fast 15-frame push to MCU, ease-out; 12 push x2.0 with ease-in while the UI slides away).
- **Pull-out: 1** (10, x0.88, ease-out).
- **Orbit: 1** (11, slow arc around "you" over ~9 s, partly behind the panel).
- **Crane/tilt down: 1** (4, 19.0-19.6). **Truck: 1** (6, accelerating into a dissolve).
- **POV first-person takes: 2** (5 and 9), with **4 whip pans** of 7-12 frames each (24.77-25.00, 26.33-26.67, 38.50-38.80, 41.00-41.40)
  and **one third-person -> first-person fly-in** (23.60-23.97, 11 frames).
- **Shot sizes:** WS 6 (1, 4, 6, 7, 10, 13/15), MS 5 (2, 8, 11, 14, 16), MCU 2 (3 end, 12 end), ECU/insert 3 (coin, plate, receipt, cards),
  POV 2. Faces are almost never in close-up; the close-ups go to **props**.
- **Heights and angles:** eye level dominates; high/near-top-down for the "overview of you" beats (6, 7, 13, 15), low angle for the
  influencer's power moments (12 end, 14).
- **Lens:** normal 40-55° throughout, deep focus; mild background softness only in 3 and 8. POV shots read wider (~60°).
- **Stillness vs. Ref A:** 15 setups in 89.7 s (mean 5.98 s) vs. Ref A's 49 in 79.5 s (1.62 s). The picture still changes every ~2 s
  because of ~30 non-cut events (overlays, glows, whips, gags).

## Lighting presets (recipes to rebuild)

1. **Resort-street noon** (1, 11, 13, 15). Directional sun high (~60-70° elevation), soft short shadows, sky dome with cumulus
   (HDRI), white plaster facades as a giant bounce, palms, green grass strip. Measured luma 146-160, sat 57-75, warmth -14...+24,
   centre/edge ~157/129 (very mild vignette). Rebuild: Three.js `DirectionalLight` 3.0 + `HemisphereLight` sky #bcd8ff / ground #d9d2c4,
   ACES tone mapping, exposure ~1.1, an HDRI of a sunny sky.
2. **Phone-feed look** (2, 12, 16). Same street, plus a **white top scrim and black bottom scrim** from the UI, slight wash and bloom;
   luma 123-138. Rebuild as a 2D overlay layer, not a light.
3. **Wood courtroom** (3). Warm key from front-top-left on the face and sign, dark wood panelling, a warm bookshelf strip on top, plants as
   silhouettes, strong vignette. Luma 74-86, sat 143-175, warmth +38...+62, centre 90-124 vs edge 57-62.
4. **Diner daylight** (4-6). Big window as the key (cool backlight), white table as a reflector, pendant lamps as small emissives, saturated
   red booths and a checker floor. Luma 93-131 in the WS, 161-185 in the POV inserts, warmth -12...-32 (the only cool interior).
5. **Banquet gold** (7-10). Crystal chandelier (emissive + bloom), wall sconces, orange parquet bouncing warm light everywhere. Luma 92-122,
   sat 150-173, **warmth +54...+105** (the warmest look in the video). Rebuild: warm point lights 2700 K at the sconces, an emissive
   chandelier mesh with `UnrealBloomPass` strength ~0.6, floor albedo orange-tan.
6. **Infographic dim** (11, 13, 14 under the panel). Background dimmed to ~50 % and pushed cool (mid luma 75-88, warmth -25...-46) so the
   blue cards pop. Rebuild: a black 50 % layer plus a slight blue tint between the 3D render and the panel.
7. **Grade punctuation.** B&W snap with no transition at 82.533 (sat 19-24) and the snap back at 87.267; a B&W freeze with a 3-frame
   dissolve at 9.03; a magenta wash 7.73-8.93 before the police.
8. **Diegetic "element" glow.** The object that equals the current keyword turns cyan-blue (plate 24.2, coin 25.7, receipt 27.7, cash
   62.83) for 0.4-1.5 s. Rebuild: swap the material to a cyan emissive (#4fc3ff) with a fresnel rim and bloom, ease in 3 frames, out 6 frames.

## Caption spec

- **Narrator captions:** white, sentence case, bold rounded geometric sans (Nunito/Montserrat-Bold-like; the exact font is unverified),
  **thin black outline** (~1 px at 360 p, ≈0.003 of height) plus a soft shadow; no box (capcrop.jpg).
- **Small:** text height ≈ 0.028-0.036 of frame height (OCR text_h_frac on the 0.71 line; ≈ 10-13 px of 360). One line, centred,
  max width ≈ 0.6 of the frame.
- **Position fixed at y ≈ 0.71** in every scene, even over the phone UI and on top of the infographic's CONSIDERATION card
  (sheet 12 at 66.67, 50.77; OCR y_frac 0.71 on the clean chunks; the OCR's 0.50-0.80 values come from merging with in-scene text).
- 1-7 words per chunk (mean 3.6), phrase-based, keeps punctuation, ~0.95 s each. Hard on/off, no word-by-word highlight.
- **Emphasis by CAPS** inside the caption (RANDOMLY 36.7, PAY 38.5, RISK 41.0) and **italic for a quoted line** ("what number am I thinking of?" 79.5-80.6).
- **Dialogue bubbles (separate style):** larger bold white text (≈0.04 of height) on a **translucent coloured box with a thin dark border**,
  at y ≈ 0.64 (above the narrator line). **Maroon = influencer, green = you.** Money in green ("$5", 2.6). Censored swear "F###".
- **Keyword labels** in the scene: blue (#3aa0ff-like) bold rounded text with a dark outline, pinned above the object (y ≈ 0.29, 37.5 frame).
- **Infographic text:** heavy white condensed caps with dark stroke on blue cards with a white border, hyphenated "CONSIDE-/RATION".

## Animation and VFX

- **Stock/mocap-like body animation** on store characters: walk cycles (1), idle talking gestures (2, 12, 16), seated idles (7, 9), a
  head-scratch "thinking" loop (15), arrests with hands behind the back (10). No lip sync and no facial animation visible at 202x360.
- **Keyframed hero props:** gavel strikes (3), a tumbling 3D coin with readable faces (4), a coin toss in the POV (5), card pick (9).
- **Physics/destruction gag:** wall debris and two police cars crashing in (43.4-44.3), done once.
- **Object glow highlights** (see preset 8) and **floating labels** pinned to 3D objects (9).
- **Infographic panel system** (11, 13, 14): fade in over 0.4 s, per-card state changes (blue = element present, dark grey = missing),
  a whole-panel grey-out, a **3D tumble-away exit** (69.3-70.57), and a **sticker slam** ("SKILL", 6 frames, overshoot then settle, tilted).
- **Phone-UI layer:** static UI with a spinning disc icon; exits by sliding down while the 3D camera pushes in (62.43-62.97).
- **Transitions:** object wipe with a coin (17.2-18.3), motion-matched whip-dissolve (29.83-30.07), dissolve to a B&W freeze with a red title (9.03).
- **Post:** bloom on practicals and whites, mild haze, B&W snaps.

## Edit rules (observed)

1. **The picture leads the words by 0-4 frames.** Cuts land on the first word of a new phrase: 9.667 "According", 29.067 "Or worse,",
   36.767 "RANDOMLY", 43.233 "Of course,", 46.767 "And an influencer", 56.133 "and he offers you this:", 64.967 "which is the final
   piece", 70.6 "because it turns out". Grade snaps land on the phrase too (82.533 "but to be honest,", 87.267 "Umh...").
2. **One concept = one object.** Each legal element gets a physical prop that lights up blue on its noun (plate/prize, coin/chance,
   receipt/consideration; cards/chance, table/prize, card/consideration; cash/prize).
3. **A recurring checklist graphic** (the three cards) comes back four times (sign 9.7, panel 50.7, 65.7, 73.0) and changes state with
   the argument. The viewer reads the logic as a scoreboard.
4. **Hold the camera, move the meaning.** 8 of 15 setups are locked; change comes from overlays, glows, gags and whips.
5. **Visual contradiction gags** under reassuring lines: "illegal act" -> cops arrive (8.6); "unlicensed gambling" -> cop at the window
   (21.6); "no one will arrest you" -> SWAT-style crash (43.4).
6. **Place changes ride on motion:** a thrown coin, a whip-dissolve, a fly-in. Hard cuts are kept for new places or new speakers.
7. **POV for "you" moments** (you pay, you risk) and third person or phone feed for "what the influencer does".
8. **B&W = narrator's aside / deadpan; colour returns for the punchline.**
9. **The ending pays off the opening question** (2.6 "how many states" -> 88.2 "London?") with a 4-beat dialogue and stops 0.27 s after the last word.

## Audio

- One male narrator, fast (~202 wpm), conversational, second person ("you"), with an "I" aside at 69.9 ("that's what I thought").
  Two extra voices are implied by the coloured bubbles (influencer, you); whether they are separate voice actors is unverified by ear.
- A continuous bed under the voice (50 ms RMS floor p5 -30.1 dBFS). **In the B&W section 82.6-86.6, 8 windows fall below -35 dB**
  (none elsewhere except 0.0, 3.45, 42.0, 54.15, 88.7), so the bed most likely drops out for the deadpan (unverified by ear).
- Loud, flat master: -13.7 LUFS, LRA 3.0 LU, true peak -0.9 dBFS, stereo AAC 96 kb/s.
- No SFX peak stands above speech: the loudest 50-ms windows (-9.0...-10.1 dBFS) are all speech; the crash at 43.4-44.3 does not
  exceed them (unverified by ear whether it has a crash SFX at all).

## Craft above the first creator (what E does that the myth creator in Ref A does not, and how we build it)

| # | Technique | Evidence | How we would build it (our tools) |
|---|---|---|---|
| 1 | **POV first-person shots with the hero's own hands** | 23.6-29.07, 36.77-43.23 | Three.js: camera parented to the character's head bone; two low-poly hand meshes (or the Quaternius rig's arms) attached to the camera rig with simple IK targets on the props; head bob from a 0.5 Hz noise |
| 2 | **Third-person -> first-person fly-in** (no cut) | 23.60-23.97 | Tween camera position from the WS to the eye bone in 11 frames with easeInOutCubic; switch to the POV rig on arrival |
| 3 | **Whip pans inside a take** that reframe to the next noun | 24.77, 26.33, 38.50, 41.00 | Quaternion slerp between two look targets over 7-10 frames with per-frame motion blur (render 4 subframes and average in render.mjs) |
| 4 | **Diegetic glow on the object that equals the keyword** | 24.2, 25.7, 27.7, 62.83 | Cue sheet: word time -> mesh id; swap to a cyan emissive + fresnel shader, `UnrealBloomPass`; ease 3 in / 6 out |
| 5 | **Floating labels pinned to 3D objects** | "Chance" 37.1, "Prize" 39.1, "Consideration" 41.6 | Project the object's world position to screen each frame (`Vector3.project`), draw the text on the 2D overlay canvas with a pop-in scale 1.2 -> 1.0 |
| 6 | **A recurring stateful infographic** (3 cards, blue/grey, sticker, 3D exit) | 50.7, 65.7, 68.97, 69.3-70.57, 73.0, 75.5 | One overlay component in our own design (not their blue cards): state per card driven by the cue sheet; dim the 3D layer 50 %; exit as a CSS-3D/Three.js plane rotation; a stamp animation for "SKILL"-type words |
| 7 | **Fake short-video app UI layer** and push-through into the scene | 2.6-9.6, 56.13-62.97, 82.93-89.67 | Our own fictional app skin (own icons, own handle, no TikTok marks) drawn on the overlay canvas; exit by sliding the layer while the 3D camera pushes in |
| 8 | **Speaker-coded dialogue bubbles** (maroon vs green) | 2.6, 57.2-60.1, 87.3-89.4 | Two subtitle styles in the caption renderer; ElevenLabs: narrator + two character voices |
| 9 | **Macro prop inserts** (coin, receipt, plate, cards) | 17.3-19.0, 24.0, 26.6-29.07, 37.1 | Blender: a coin with an embossed normal map, a receipt with a canvas texture (our own joke lines), glTF export; render with a 25-30° FOV and a near camera |
| 10 | **Object-wipe transition** | coin 17.2-18.3 | Render both scenes, composite with the coin's alpha as the matte (fix their seam: our matte covers the whole frame) |
| 11 | **Motion-matched whip-dissolve** | 29.83-30.07 | Same camera velocity at the end of A and start of B, 6-frame cross-dissolve in ffmpeg/render.mjs |
| 12 | **Visual contradiction gags + physics** | police 8.6, 21.6, 43.4-46.7 | Keyframed car + Blender rigid-body debris baked to glTF animation; CMU mocap walk/arrest clips for officers |
| 13 | **Realistic PBR sets with practical lights** | chandelier 43.2, sconces 36.4, pendant lamps 21.8 | glTF sets with PBR materials, emissive practicals + point lights, HDRI environment, ACES tone mapping, bloom |
| 14 | **Grade as punctuation for tone** (B&W deadpan, colour on the punchline) | 82.533, 87.267, freeze 9.03 | A saturation uniform in the final pass, switched on the cue sheet |
| 15 | **Ending pays off the opening question** | 2.6 question -> 88.2 "London?" | Script rule: the last 6 s show the hook's question answered badly/funnily, in the same framing as the hook |

## Weaknesses (seen, with evidence)

| Time | Issue | Evidence |
|---|---|---|
| Whole video | **Mixed fidelity:** realistic PBR sets next to boxy low-poly bodies with photo-like faces | Influencer's block forearms and flat orange skin against the "1800 OCEAN DRIVE" facade (63.5, 72.0). The friend in the white tank top has an almost featureless, blurred face (72.0) |
| 9.7-17.3 | Photo face on a 3D head reads flat and pasted | Judge at 15.0: the face is a flat photo inside a 3D wig, no shading change while the gavel swings |
| 23.6-29.07, 36.77-43.23 | POV hands are untextured beige blocks | Frames 24.0, 26.6: no fingers detail, no skin shading |
| 17.77-18.23 | **Visible seam in the coin wipe** | The top band still shows the courtroom (wood and the judge's hand) above the diner window (z_171.jpg) |
| 50.7-54.9, 65.7-70.6, 73.0-77.7 | **~14 s of 89.7 is a static infographic over a dimmed scene** | Three panel sections of 4.2 s, 4.9 s, 4.7 s; the 3D picture behind is at ~50 % and barely moves (flow 0.13-0.45) |
| 30.6-35.0, 9.67-13.7, 2.6-7.7 | Long holds with little change | Banquet top-down near-static for 4.4 s; judge locked 4.0 s; phone-UI two-shot same framing 2.6-7.7 (5.1 s) with only bubble changes |
| 2.6, 56.13, 82.93 / 64.97, 78.3 | Re-used setups | The same phone-UI framing three times (16.5 s total); the same top-down street framing twice (9.9 s) |
| 7.73-8.93 | The magenta wash reads as a colour glitch | It starts 0.9 s before any police are visible (8.6); no visible light source |
| 2.6-9.6 etc. | Parody of a real app's UI and a crude handle ("douchebag_interviews") | The right rail, bottom nav and "+" button copy a well-known app's layout; a brand/legal risk we must not copy |
| Whole video | Small captions at a low delivered resolution | 202x360 copy; caption text ≈ 0.03 of height (≈ 11 px); OCR mixed captions with UI text in every phone shot |
| Whole video | Very fast narration | ~202 wpm narrator, ~223 wpm with dialogue; 85 chunks at ~0.95 s each |
| 9.03-9.67 | The "GAMBLING" freeze is dark and busy | Luma falls 135 -> 108, grey bodies behind red text; low contrast between title and background at 202x360 |
| 82.93-87.27 | The B&W section adds no new picture | 4.3 s of the same two-shot already seen twice, only desaturated |
| 43.4-44.3 | The crash has no visible weight in sound | No RMS window above speech level during the crash (loudest windows are all speech) |
| 89.4-89.67 | Abrupt end, no loop, no CTA | Last frame 0.27 s after "F###" |
| 0-89.67 | Flat audio dynamics | LRA 3.0 LU |
