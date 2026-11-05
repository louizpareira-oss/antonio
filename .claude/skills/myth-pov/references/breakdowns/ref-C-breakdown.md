# Reference C: "He bet the..." (Chinese: Sun Wukong, the book of death, the Buddha's palm, the mountain): frame-by-frame breakdown

Source analysed: `scratchpad/ref/C_he_bet_the.mp4` (downloaded copy, 360x640, 30 fps, H.264 ~408 kb/s, mono AAC 48 kHz).
Evidence used: `ana/C_he_bet_the/shots.json`, `per_frame.json`, `captions.json`, `audio.json`, all 36 contact sheets, the
first/mid/last frames, plus extra full-rate (30 fps) frame strips I extracted at every suspicious point
(`scratchpad/work/refC/z/*.jpg`, 5 fps overview `scratchpad/work/refC/d5/t01..t15.jpg`).
"Unverified" = I could not confirm it from pictures or numbers. FOV / lens values are visual estimates.

## Measured totals

| Item | Value | Evidence |
|---|---|---|
| Duration | 84.77 s (2,543 frames) | shots.json |
| Detector shots | 36 | shots.json |
| **Verified shots** | **33** (3 false cuts merged, 0 hidden cuts found) | see "Shot-list corrections" |
| Average shot | **2.57 s** (median 2.80, min 0.47, max 6.43) | corrected list |
| Shot-length spread | <1 s: 4, 1-2 s: 7, 2-3 s: 11, 3-4 s: 8, >=4 s: 3 | corrected list |
| Cuts per half | 13 cuts in 0-42.4 s, 19 cuts in 42.4-84.8 s (pace accelerates) | corrected list |
| Narration | 333 caption words (~337 spoken: "342" is read as a number) | cleaned captions |
| **Words per minute** | **~236 wpm** (333 / 84.77 s x 60); ~3.9 words/s | cleaned captions |
| Caption cards | 105 cards, 1-4 words (mean 3.17), 0.81 s mean on screen | cleaned captions |
| Loudness | -14.3 LUFS integrated, LRA 1.6 LU, true peak -0.9 dBFS, no silences | audio.json |
| Brightness (mid frames) | mean luma 95.6, centre 118.6, edges 85.5 (vignette), warmth r-b +49.8, saturation 148 | shots.json light_mid |
| Brightness arc | first half mean luma 72.9 (underworld, dusk) -> second half 110.0 (Heaven, gold) | shots.json |
| Camera motion | duration-weighted mean flow 9.25 px/frame at 360 px width (~2.6 % of frame width per frame = fast, constantly moving) | shots.json |

### Shot-list corrections (checked at 30 fps)

- **Det. 3 (7.133-7.433) is not a cut.** It is the tail of det. 2: a time-lapse where the sun rotates around the
  head (6.17-7.13 s, per-frame luma swings 67 -> 175 -> 67 three times) and the detector fired on the light flicker.
  Framing at 7.10 and 7.13 is identical (`z/s2b.jpg`). Merged into C2.
- **Det. 16+17 (43.6-47.767) is one shot.** Locked-off red wall, the double door swings open at 44.50-44.57 and the
  brightness jump (luma 25 -> 57) triggered a 0.25-strength "cut" (`z/s16a.jpg`). Merged into C15.
- **Det. 18+19 (47.767-49.767) is one shot.** A fast lateral truck along a table (book -> peaches -> pills -> gourd), split
  at 48.2 by motion (`z/s18a.jpg`). Merged into C16.
- **No hidden cuts.** Every big jump inside a shot was checked frame by frame and is a continuous camera move:
  1.60-2.00 roll + pull-out (`z/s1a.jpg`), 19.7-20.2 180 deg orbit (`z/s6a.jpg`), 25.5-27.2 whip-down + fly-up (`z/s8a.jpg`, `whip8.png`),
  31.1-31.3 whip-pan (`z/s10a.jpg`), 58.63-58.67 and 63.87-63.90 snap-zooms (scale x1.39 then x1.59 in two frames, per_frame).

## Clean narration (OCR fixed against frames)

OCR missed "This time," (on screen 51.5-52.1, seen in `d5/t09.jpg`); "nokqp mou os" at 3.9 is the OCR of "So how do you".

> Imagine you crossed your own name out of the book of death. Nothing can kill you now. So how do you end up trapped
> under a mountain for five hundred years? You're Sun Wukong, the Monkey King, and it all started with a nap. Two ghosts
> dragged your soul down to the underworld while you slept. So you grabbed their book, found your page, "lifespan:
> 342 years", and scribbled it out. The underworld complains to the ruler of Heaven, the Jade Emperor: there's a monkey
> loose who can't die, and won't take orders. His fix: give you a job up in Heaven, where he can keep an eye on you.
> Looking after his horses. The lowest job. So you smash your way out and give yourself a new title: Great Sage, Equal to
> Heaven. But Heaven sends an army. So you smash them with one stick. Now the Emperor lets you keep the title, and puts
> you in charge of his peaches of immortality. But you eat almost all of them. Not only that, you crash Heaven's party
> and eat a whole stash of immortality pills. Now you're immortal three different ways. Can anyone in Heaven still stop
> you? This time, a hundred thousand soldiers finally catch you. They try swords, lightning, and forty-nine days in a
> furnace. You come out with eyes of fire, and wreck the place. Heaven has nobody left to send. So who do they call? The
> Buddha. He bets you can't jump out of the palm of his hand, and Heaven's throne is yours. One somersault takes you thirty
> thousand miles, to the end of the world. You sign a giant pillar, "The Great Sage was here," and pee on it, just to be
> sure. Then you fly back and tell him you won. "You never left my hand." He holds it up. On his middle finger: "The Great
> Sage was here." He flips his hand over, and it turns into a mountain, right on top of you.

## Shot list (all 33 verified shots)

Abbreviations: ECU/CU/MCU/MS/WS/EWS; "det." = detector shot number. Measured = shots.json camera block
(scale = total zoom factor, flow = mean px/frame, h1/h2 = first/second-half speed -> easing). Lens: all shots read as a
normal-to-wide CG lens (est. 50-65 deg vertical FOV); only differences are noted.

| # | det. | start-end (s) | size | angle / height | lens feel | camera move (measured -> seen) | subject and animation | light | caption on screen | why the cut lands here |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 | 1 | 0.000-3.867 | insert ECU -> high WS -> low MCU | starts top-down on book, ends low angle | wide-ish (strong perspective on book at 1.0 s) | scale 0.53, roll 124 deg, flow 11.5, parallax 4.6 -> one take: ECU of a red/gold brush-pen striking through "SUN WUKONG / LIFESPAN: 342 YEARS" (0-1.4), camera rolls ~90 deg and pulls up/back (1.4-2.0) to a high 3/4 wide of the desk, then snap push-in (scale ~1.21-1.24 per frame at 2.67-2.77) to low-angle MCU of Wukong while a halberd blade sweeps past his head | pen stroke draws black bars across the name; a tall white-hatted underworld official (blue robe) swings a glaive at seated Wukong (box head with painted face texture + gold band, red/black suit); blade passes with no effect | "Underworld desk" (P1): black room, warm key from high front-left on book (page luma 150-205), dark red curtains, heavy vignette (last frame centre 93 / edge 23) | Imagine you crossed your / own name out of / the book of death. / Nothing can / kill you now. | cut on "now." (full stop) to the consequence: the opening question shot |
| C2 | 2+3 | 3.867-7.433 | EWS -> MCU (head only) | eye level, slight high at end | normal | scale 2.14, roll -28 deg, flow 12, ease-out -> fast push-in + tilt down from a lone grey low-poly mountain to its base, settles on Wukong's head cube sticking out of the rock (5.2); 6.17-7.13 locked while light time-lapses; 7.13-7.43 hold | head cube only, no animation; shadow of the head swings around it 3 times (sun rotating) = 500 years passing | first 3 frames over-exposed (luma 176, `z/s2a.jpg`), pale green sky pops to orange at 4.13; then "golden hour" (P2): orange sky, warm low key; time-lapse: sky flips navy <-> cream, luma 67-175 | So how do you / end up trapped / under a mountain / for five hundred years? | cut after "years?": the open question is set, flashback starts |
| C3 | 4 | 7.433-13.867 | MWS / WS (hero ~20 % of frame height) | eye level -> slightly high | normal | scale 0.83, flow 12.1 (h1 14.2 / h2 10.0), parallax 4.9 -> 6.4 s "drone" one-take: truck right and down over peach piles (7.9-8.2), swing onto dancing monkeys (8.3-9.0), back left and push in on throne (9.4-10.2), pull back (10.4-10.6), hold as ghosts take the soul, a monkey crosses the lens as a natural wipe (13.27-13.53), settle on the throne (13.6) | Wukong (red jacket, orange trousers) sits on a stone throne; realistic chimp models dance with arms straight out (T-pose-like, 7.43, 8.6-8.9); two white glowing cone-ghosts appear (10.8), lift a glowing yellow soul (11.2-12.4) and drag it off left (12.6-13.0); body stays seated | P2 golden hour: amber sky, warm key from behind-left, long soft shadows to camera-right, saturated grass (sat 167-171), ghosts + soul emissive with bloom, vignette (mid centre 137 / edge 80) | You're Sun Wukong, / the Monkey King, / and it all started / with a nap. / Two ghosts dragged your / soul down to the / underworld while you slept. | cut after "slept.": location jump to the underworld |
| C4 | 5 | 13.867-18.900 | high WS -> OTS MS -> insert ECU (page) -> high WS | high 3/4, ends high with roll | normal; insert slightly wide | scale 1.11, roll -39 deg, flow 8.4 (h1 6.2 / h2 10.6) -> push-in and orbit right to over-the-shoulder as he flips pages (15.0-15.3), glide into a near-static page ECU held ~2.5 s (15.5-18.1), then roll and pull up/out to a high wide (18.4-18.9) | Wukong (now red/black suit with tail) walks to the desk, grabs the book, page-turn animation, page shows "SUN WUKONG LIFESPAN: 342 YEARS" between "MONKEY No.1349 LIFESPAN: 290 YEARS" and "MONKEY No.1351 LIFESPAN: 301 YEARS"; brush enters (17.8) and strikes the name (18.2-18.4) | P1 underworld: first frame luma 15.8 (near black), page lit like a practical spot (mid centre 163), black edges | So you / grabbed their book, / found your page, / "lifespan: / 342 years", / and scribbled it out. | cut after "out.": the hook (C1) is now explained; scene change |
| C5 | 6 | 18.900-21.933 | low MS -> OTS WS -> MS | low angle -> eye level on the Emperor | normal | scale 3.95, flow 6.9 (h1 11.4 / h2 2.4 = ease-out) -> ~180 deg orbit around the kneeling messenger (19.7-20.1, `z/s6a.jpg`) to reveal golden stairs and throne, then fast dolly up the stairs into MS of the Emperor | underworld official (box head with red horns, black robe) kneels holding a petition book over his head; Jade Emperor (cube head with a painted emperor portrait, bead-curtain crown, black suit, white sneakers) sits still | "Palace dusk" (P3): pale cream sky, dark teal/navy silhouetted pagoda and red pillars, teal floor, golden stairs and throne self-lit + bloom; luma ~41, sat 177-188 | The underworld complains to / the ruler of Heaven, / the Jade Emperor: | cut on the colon "Emperor:": the complaint itself is shown in the next shot |
| C6 | 7 | 21.933-24.967 | WS (hero ~25 % of height) | eye level | normal | scale 1.16, flow 2.5 (h1 3.6 / h2 1.4) -> slow push-in with slight tilt down, ease-out | Wukong (red jacket, orange trousers, gold crown) leaps among monkeys, a rock flies through frame (22.77), a heavenly messenger (white box head, white shirt) walks in and kneels with a yellow scroll (23.4); Wukong stands still | first 3 frames washed-out white (luma 169 -> 113 at frame 4, `z/s7a.jpg`), then P2 golden hour, sat 178-181 | there's a monkey loose / who can't die, / and won't take orders. | cut after "orders.": to the Emperor's answer |
| C7 | 8 | 24.967-27.933 | MS -> high WS -> CU -> WS | eye level -> high -> eye level | normal | scale 1.42, roll -80 deg, flow 20.6 (fast) -> one take: Emperor raises a hand, whip-tilt/roll down into the courtyard (25.6-25.9), follow Wukong arriving on a white cloud (26.0-26.7), fly up the stairs past him (26.8-26.9, `whip8.png`) to a CU of the Emperor tapping his temple (27.0), pull back to a palace WS with Wukong at the stairs (27.2-27.9) | Emperor gestures (raise hand, tap head), Wukong rides a cloud of white spheres; cloud trails | P3 palace dusk; mid frame cool (r-b -14.7) in the courtyard, gold again at the throne | His fix: / give you a job / up in Heaven, / where he can keep / an eye on you. | cut after "you.": show the job |
| C8 | 9 | 27.933-30.167 | MS -> EWS (hero tiny) | eye level -> low, looking up | normal | scale 0.24, flow 7.4, h1 2.5 / h2 12.3 = ease-in -> near-static MS (27.9-29.0), then crane up/pull out fast and tilt up to a tall dark pagoda spire (29.0-29.5) | Wukong brushes a white low-poly horse (arm loop); Minecraft-style voxel village and trees | "Dusk village" (P4): cool, pale yellow sky, blue clouds, dark greens; luma ~50, edges 31-35 | Looking after / his horses. / The lowest job. | crane-up on "The lowest job." makes him small; cut after the full stop |
| C9 | 10 | 30.167-31.733 | low MS -> WS | low angle | normal | scale 2.42, flow 17.9, h1 2.1 / h2 33.6 (whip at the end) -> static low MS, then whip-pan right past the fence (31.1-31.27) into a village WS as he leaps onto a cloud and flies off | Wukong swings his staff overhead twice (30.4-31.0), silhouette against pale sky; jumps on cloud | P4 dusk; low key (luma 58), sky as backlight | So you smash your / way out and give | cut mid-sentence on the landing; "yourself a new title" is said over the next picture |
| C10 | 11 | 31.733-34.600 | MS -> insert (banner text) | eye level -> slightly low | normal -> reads tele in the banner insert | scale 1.71, flow 18.4 -> pan right to a flagpole as a red banner is hoisted (32.4-32.8), push into the banner and tilt down it so "GREAT / SAGE, / EQUAL / TO / HEAVEN" scrolls past in time with the voice (32.9-34.6) | Wukong lands on a cloud and points up; monkeys; banner rises on a pole | P2 golden hour; banner red/yellow is the most saturated image in the film (sat 211-218, r-b 163) | yourself a new title: / Great Sage, / Equal to Heaven. | cut after "Heaven." (the title has been read on screen word by word) |
| C11 | 12 | 34.600-37.867 | WS, hero in foreground | low angle | normal | scale 0.81, flow 3.7, h1 5.3 / h2 2.1 -> slow pull-back with slight tilt, ease-out | ~15 white-box-head soldiers ride a cloud down (34.6-36.0); Wukong spins his staff and knocks them over (36.0-36.9), then stands holding a burning staff tip (37.4) | P2 golden hour; luma 80-120 | But Heaven / sends an army. / So you smash them / with one stick. | cut after "stick." |
| C12 | 13 | 37.867-40.700 | WS 2-shot -> MS 2-shot | eye level | normal | scale 0.95, h1 0.4 / h2 9.2 = ease-in -> slow push-in to the throne 2-shot (37.9-40.3), then fast pan right past a red pillar (40.4-40.7) = foreground wipe | Emperor seated, gestures; Wukong (red, tail) stands beside the throne | P3 palace, dark (luma 38 -> 24), gold throne bloom | Now the Emperor lets / you keep the title, / and puts you / in charge of his | cut mid-phrase through the pillar wipe, landing on "peaches" |
| C13 | 14 | 40.700-42.133 | MS (framed gate) | eye level | normal | scale 1.01, h1 7.9 / h2 0.2 = hard ease-out -> pan settles, slight push to a white wall with a round moon gate framing an orchard | trees with glowing yellow fruit (emissive points) | P3; orchard behind the gate darker, fruit = bloom dots | peaches of immortality. | cut after the phrase |
| C14 | 15 | 42.133-43.600 | MS -> overhead EWS | eye level -> top-down | normal | scale 0.25, h1 0.6 / h2 18.5 = ease-in -> static MS, then fast crane up through the tree to top-down (42.9-43.6) | Wukong sits cross-legged under a low-poly tree with red fruit, eats, throws pits; ground littered | dusk/night garden, cool sky behind trees, luma 50 -> 41 | But you eat almost / all of them. | crane-out on "all of them." shows the empty tree; cut after full stop |
| C15 | 16+17 | 43.600-47.767 | WS (static) -> MS | low angle, then eye level | normal | locked-off 0.93 s (43.6-44.5, the only static frame in the film), doors open, then the camera tracks/pushes in as he walks to a table | red double doors burst open (44.5), Wukong walks in backlit, picks up a gold gourd and pours a stream of glowing pills into his mouth (45.6-47.2) | "Red hall" (P7): red walls, dark green noisy floor, cool backlight through the door; luma 25 -> 57 | Not only that, / you crash Heaven's party / and eat a whole / stash of immortality pills. | cut after "pills." |
| C16 | 18+19 | 47.767-49.767 | insert -> MS | high, looking down at table -> eye level | normal | lateral truck right along the table (47.8-49.0), then pull back to MS (49.1-49.7) | still props: the book with the crossed-out name, 3 peaches, glowing pills, gourd; then Wukong behind the table, arm raised | P7 warm red table, luma 47-80 | Now you're immortal / three different ways. | the truck counts the "three ways" as three objects; cut after "ways." |
| C17 | 20 | 49.767-51.567 | MS -> CU (face cube) | eye level | normal | scale 2.60, flow 3.9, h1 4.9 / h2 2.9 -> steady push-in, ease-out | Emperor clutches his head with both hands (panic loop) | P3; throne gold + bloom, face centre luma ~147 | Can anyone in Heaven / still stop you? / This time, | cut after the question (next card leads the cut by ~2 frames) |
| C18 | 21 | 51.567-54.700 | top-down EWS (hero tiny) -> low WS | 90 deg top-down -> low eye level | normal | scale 1.09, roll 10.7 deg -> slow descending crane top-down, then at 54.0-54.2 the camera drops and tilts to a low angle | ring of dark-armoured soldier models closes in on tiny Wukong; a golden lattice dome (net) traps him (54.2) | "Overcast arena" (P5): white-grey ground, light pool in centre (centre 200 / edge 109), long soft shadows, near-neutral (r-b -1), sat 17-59 | This time, / a hundred thousand soldiers / finally catch you. | cut after "you." |
| C19 | 22 | 54.700-55.600 | MS 2-shot -> WS | eye level | normal | scale 0.55, h1 2.1 / h2 12.1 = ease-in -> pull-out | a soldier (white box head) swings at Wukong; no visible sword contact, Wukong does not react | P5 courtyard: flat pale sky, brown walls, white floor; thin white light-leak lines across the wall | They try swords, | cut on the comma: next list item |
| C20 | 23 | 55.600-58.133 | WS | eye level | normal | roll -128 deg, h1 14.9 / h2 0.3 -> fast reposition then a dead-still hold on the furnace (57.0-58.1) | lightning bolts with branching arcs hit Wukong (55.8-56.0); he is thrown up (56.67) and drops into a bronze tripod furnace; black lid falls on it | P5 + lightning: white bloom flash (luma to 190), then flat overcast | lightning, / and forty-nine days / in a furnace. | cut after "furnace." |
| C21 | 24 | 58.133-60.633 | WS -> MS (snap) -> WS | eye level | normal | scale 0.77, h1 8.0 / h2 3.4 -> lid blows off, snap push-in (58.63-58.67, `z/s24a.jpg`), then truck/pull back to WS as the wall explodes | Wukong pops out with orange fire particles, head glows orange (emissive "eyes of fire"), swings staff; back wall breaks into box debris (rigid bodies, 60.07-60.6); guards stand idle | P5 + emissive orange head with bloom (first frame r-b +28 -> head glow) | You come out with / eyes of fire, / and wreck the place. | cut after "place." |
| C22 | 25 | 60.633-63.333 | WS -> MS | eye level | normal | scale 1.13, flow 1.9 -> slow push-in, ease-in | knocked-out soldiers lie flat around a lone Emperor (green robe) who raises his hands (63.3) | P3 palace dusk, spotlight pool on the teal floor; luma 41 -> 86 | Heaven has nobody / left to send. / So who / do they call? | cut on the question "call?"; answer starts the next shot |
| C23 | 26 | 63.333-66.733 | WS -> giant MCU -> MS on palm -> CU face | low -> high -> eye level | normal, snap-zoom to tele | scale 3.63, roll 48 deg, flow 11.7 -> crane up with the rising Buddha, snap-zoom x2.2 in 2 frames (63.87-63.90), crane down onto the raised palm, tilt up to the face (66.6) | giant Buddha (cube head with gold Buddha-face texture, red/orange robe, thin halo ring) rises, raises an open palm of hexagonal-prism fingers (64.0-64.6); tiny Wukong on a cloud for scale; Wukong stands on the palm | "Divine gold" (P6): cream-to-blue sky gradient, gold specular, luma 152-158, r-b 30-103 | The Buddha. / He bets you can't / jump out of the / palm of his hand, / and Heaven's | cut mid-sentence: "throne" is shown as it is said |
| C24 | 27 | 66.733-68.033 | WS (object) | slightly low | normal | roll -187 deg, h1 22.1 / h2 0.3 -> whip-roll that lands on a dead-still frame (1.1 s hold) | golden throne floating on a small cloud | P6 variant: deep blue sky, sun glow top-left; luma 130-141 | throne is yours. | cut after "yours." |
| C25 | 28 | 68.033-70.833 | MS -> WS | eye level | normal | scale 0.10 (clouds rushing past fool the fit), roll 177 deg, flow 18.8 -> fly-through of clouds (68.6-69.0) then tracking alongside him | Wukong floats upright in the air (no flip visible at 68.0), lands on a cloud and surfs it | "Pink cloud plain" (P6b): salmon sky, lilac ground, white clouds with soft shadows; luma 147, sat 55-83 | One somersault takes you / thirty thousand miles, / to the end | cut mid-phrase, landing on "of the world" |
| C26 | 29 | 70.833-71.700 | WS | eye level | normal | scale 0.54, mostly a 1-frame settle then near-static | Wukong arrives on a cloud before five tall tan pillars and one leaning short one (the hand, disguised) | P6b pink plain | of the world. | cut after "world." |
| C27 | 30 | 71.700-75.500 | MS (from behind 3/4) -> side MS | eye level | normal | scale 0.72, h1 1.7 / h2 9.8 = ease-in -> slow orbit left and pull back | Wukong writes on the pillar, a handwritten decal "THE GREAT SAGE WAS HERE" writes on in sync with the words (72.8-73.8), then pees (yellow particle stream 74.3-74.9) | warm yellow haze from the right, luma 157-162, r-b 84-98 | You sign / a giant pillar, / "The Great / Sage was here," / and pee on it, / just to be sure. | cut after "sure." |
| C28 | 31 | 75.500-76.633 | WS -> WS on palm | eye level | normal | scale 1.44, h1 19.0 / h2 3.7 -> fast follow then ease-out | jumps on a cloud, flies, lands on the palm with a white impact puff (75.97) | P6 gold high-key, luma 154-168 | Then you fly / back and tell | cut mid-phrase |
| C29 | 32 | 76.633-77.333 | WS (hero tiny vs giant face) | eye level | normal | near-static (flow 1.4) | Wukong turns and gestures in front of the giant Buddha face | P6, luma 166-168 | him you won. | cut on "won.": the reply |
| C30 | 33 | 77.333-78.467 | ECU (Buddha face) | eye level | tele feel (flat) | scale 1.13, flow 0.5 -> very slow push-in | static smiling gold face, no facial animation | P6 at its brightest: centre luma 199-215, highlights clipped | "You never / left my hand." | cut after the quote = the twist line |
| C31 | 34 | 78.467-81.367 | MS -> WS -> insert (finger text) | low angle at the end | normal | scale 0.58, roll 61 deg, h1 26.9 / h2 0.3 -> crane up/out from Wukong on the palm, whip-roll to the raised middle finger, dead-still hold 1.3 s on the text | the hand rises; the finger shows "THE GREAT SAGE WAS HERE" | P6 gold + blue sky with clouds; luma 155-169, centre 222-226 | He holds it up. / On his middle finger: / "The Great / Sage was here." | cut after the reveal |
| C32 | 35 | 81.367-84.300 | EWS (hero tiny) | high -> low looking up | normal | roll -165 deg, flow 15.0, jitter 122 -> roll with the flipping hand, tilt up to the falling slab | the hand flips (81.6-82.2), Wukong falls onto a green plain (82.2-82.6), a dark untextured slab drops from the sky and blacks out the frame (83.2-84.2) | P6 orange -> black: luma 142 -> 14.7 | He flips / his hand over, / and it turns / into a mountain, / right on | cut mid-phrase on the impact |
| C33 | 36 | 84.300-84.767 | MCU (head only) | eye level | normal | scale 1.28, flow 13.2 -> snap push-in | Wukong's head sticking out of a brown rock mountain, pale low-poly debris bursts out | P2-like orange sky, brown terrain | top of you. | end; the state matches the C2 question shot, so a replay reads as a loop |

## Story structure (with timestamps)

| Beat | Time | What happens |
|---|---|---|
| Hook (impossible act) | 0.0-3.87 | ECU of the brush striking out "SUN WUKONG LIFESPAN 342 YEARS" + "Nothing can kill you now." A blade passes through him (2.3-2.8) as proof |
| Open loop (flash-forward question) | 3.87-7.43 | The ending is shown first: head under a mountain, 500 years pass as a light time-lapse; "So how do you end up trapped...?" |
| Identity + inciting incident | 7.43-13.87 | "You're Sun Wukong", nap, ghosts drag the soul |
| Hook payoff (the rule) | 13.87-18.90 | the book, the page, the strike (same insert as 0 s) |
| Escalation ladder: Heaven tries a fix, it fails, repeat | 18.90-47.77 | complaint -> stable job -> rebellion and self-given title -> army -> peaches -> pills. Linking words "So you" (13.9, 30.2, 36.0), "But" (34.6, 42.1), "Now" (37.9, 47.8) |
| Peak power | 47.77-60.63 | "immortal three different ways", capture, swords, lightning, furnace, eyes of fire, wrecks Heaven |
| Final opponent and the bet | 60.63-67.03 | "So who do they call? The Buddha." The bet. The prize (throne) shown as an object |
| The attempt | 68.03-77.33 | somersault to "the end of the world", signs the pillar, pees on it, flies back |
| Twist | 77.33-81.37 (91-96 % of runtime) | "You never left my hand." The middle finger carries his own graffiti |
| Ending / loop | 81.37-84.77 | the hand becomes the mountain; the last picture is the 3.9-7.4 s picture, so the Short loops into its own question |

## Camera statistics (verified, 33 shots)

- **Primary move per shot:** compound one-take "drone" moves (push + orbit + roll + crane in one shot) 16 (C1, C3, C4, C5, C7, C9,
  C10, C18, C20, C21, C23, C25, C27, C28, C31, C32); push-in 8 (C2, C6, C12, C13, C17, C22, C30, C33); pull-out / crane-up 4
  (C8, C11, C14, C19); lateral truck 1 (C16); static then push 1 (C15); near-static 3 (C24, C26, C29). **Only one shot starts
  locked-off** (C15, 0.93 s at 43.6-44.5); the other dead-still moments are holds at the end of a move, always on an object (furnace 57.0-58.1, throne 66.9-68.0, finger text 80.0-81.3).
- **Speed:** duration-weighted mean flow 9.25 px/frame at 360 px (~2.6 % of frame width per frame). Fast whips reach 20-34 px/frame
  (C7 20.6, C9 h2 33.6, C31 h1 26.9).
- **Easing:** most moves are fast-in / slow-out: h1 > 2 x h2 in C5, C17, C20, C24, C28, C31 (e.g. C24 22.1 -> 0.27). The opposite
  (slow start, fast end) is used for the "reveal by leaving" crane-ups: C8 (2.5 -> 12.3), C14 (0.6 -> 18.5), C19, C27.
- **Rolls:** |roll| > 20 deg in 10 detector shots (det. 1, 2, 5, 8, 23, 26, 27, 28, 34, 35); the biggest are whip-rolls of 165-187 deg
  (66.73, 68.03, 81.37) that act as transitions inside the shot.
- **Snap-zooms** (scale >1.2 per frame): 2.67-2.77 (C1), 5.1 (C2), 26.97-27.0 (C7), 58.63-58.67 (C21), 63.87-63.90 (C23 x2.2 in 2
  frames), 84.3 (C33). Used on the key noun ("kill you now", "eye on you", "eyes of fire", "He bets").
- **Shot sizes:** wides dominate. The hero is under ~1/4 of frame height in about 14 of 33 shots (C3, C7, C8, C9, C14, C18, C20,
  C23, C25, C26, C28, C29, C32 plus the C21 tail; visual estimate). Real close-ups exist only for props/text (C1, C4, C10, C16, C31),
  the Emperor (C7, C17), the Buddha (C30) and the head under the mountain (C2, C33).
- **Angles:** mostly eye level; low angles for power (C5 kneeling messenger, C9 staff swing, C11 army, C31 finger); high/top-down for
  smallness or capture (C1 desk, C4, C14, C18, C32).
- **Lens:** a single normal-to-wide CG lens throughout (est. 50-65 deg vertical); the "tele" moments are snap-zooms, not a lens change.

## Lighting presets (recipes to rebuild, not copy)

| Preset | Used in | Recipe (measured where noted) |
|---|---|---|
| P1 Underworld desk | C1, C4 | Black void (luma 16-50, p5 = 0), one warm spot (est. 3000-3500 K) from high front-left onto the desk only, the page almost white (centre 150-205), dim red curtain shapes behind, heavy vignette (edge 0.25 x centre). No fog, little bloom |
| P2 Mountain golden hour | C2, C3, C6, C10, C11, C33 | Amber-to-pale-yellow sky gradient, sun low behind-left, long soft shadows toward camera, saturated green ground (sat 167-218), warmth r-b +55 to +163, brown low-poly mountains as dark shapes, vignette (edge ~0.6 x centre) |
| P3 Palace dusk | C5, C7, C12, C13, C17, C22 | Pale cream horizon sky, architecture as dark teal/navy silhouettes, teal-green floor, gold throne and stairs emissive with bloom, red railings; mid luma 24-45; in C22 a spotlight pool on the floor centre. Cool base + warm gold accents |
| P4 Dusk village | C8, C9 | Cool, desaturated, pale yellow sky with blue clouds, dark greens; luma ~50-58; sky used as backlight for silhouettes |
| P5 Overcast arena | C18-C21 | White-grey ground, flat pale sky, soft shadows, near-neutral (r-b about -1 to +28), sat 17-80; top-down shot with a central light pool (centre 200 / edge 109); lightning = full-frame white bloom flash (luma to 190) |
| P6 Divine gold (high key) | C23, C24, C27-C31 | Cream/gold sky, gold specular on the Buddha, luma 150-170, centre up to 226 (highlights clip), r-b +84 to +121, heavy bloom; C24 variant with a deep blue gradient sky |
| P6b Pink cloud plain | C25, C26 | Salmon sky, lilac ground, white clouds with soft cast shadows; luma ~147, lower saturation (55-95) |
| P7 Red hall | C15, C16 | Red walls, dark green floor, the open door as the main (cool) light; luma 25-57 |

Grade overall: warm (r-b positive in 33 of the 36 detector mid-frames; the exceptions are the courtyard in det. 8 at -14.7, the top-down arena det. 21 at -1.2 and det. 25 at -2.5), saturated (mean 148), constant vignette (edges ~28 % darker than the centre on
average), bloom on every emissive (ghosts, soul, pills, fruit, throne, halo, eyes of fire). The film brightens as the hero rises: first-half
mean luma 72.9, second-half 110.0.

## Caption spec

- Font: white bold sans (Arial/Helvetica-Bold look), sentence case, punctuation and quote marks kept (crop `work/refC/capcrop.png`).
- Size: cap height ~10-11 px of 640 (**~1.7 % of frame height**), with descenders 14 px (2.2 %); OCR text_h_frac 0.023-0.041.
- Position: one centred line, baseline at y ~464/640 (0.725); OCR centre y_frac fixed at 0.718-0.721 for the whole film. Max width
  ~200/360 px (56 %).
- Style: ~1 px dark outline/shadow, no box, no colour accent, no word highlight, no pop-in animation (hard switch).
- Chunking: 105 cards, 1-4 words (2 w: 18 cards, 3 w: 45, 4 w: 40), mean 0.81 s (0.3-1.7 s). Cards are cut by breath/rhythm, not by
  meaning ("Two ghosts dragged your / soul down to the / underworld..."; "jump out of the / palm of his hand").
- Timing: card changes are within 1-2 frames of the voice; at cuts the picture usually leads the new card by 1-2 frames
  (cut 13.867, card 13.9) or the old card hangs 1-2 frames into the new shot (7.433).
- In-scene text does the "big text" job instead of captions: the death-book page (C1, C4, C16), the banner (C10), the pillar and finger
  graffiti (C27, C31).

## Animation and VFX techniques

- Characters: humanoid rigs with **cube heads carrying a painted/photo face texture** (Wukong, Emperor, Buddha, messengers); no facial
  animation, emotion only through stock body clips (kneel, sit, walk, point, hands-on-head 49.8-51.5, staff swing, temple tap 27.0).
  Realistic chimp and soldier models are mixed in (C3, C18).
- Prop animation that "writes the story": brush stroke-on bars across the name (0.3-1.4, 18.2-18.4), page turn (15.0-15.3), banner
  hoist (32.4-32.8), door swing (44.5), handwritten decal write-on (72.8-73.8).
- Light as storytelling: rotating sun time-lapse for 500 years (6.17-7.13), emissive soul (11.2-12.8), emissive head for "eyes of fire"
  (58.7-59.2), halo ring (63.3), lightning bloom flash (55.8-56.0), emissive peaches and pills.
- Particles/physics: cloud "nimbus" made of white spheres (26.0, 31.3, 68-76), fire burst (58.4), pill stream (46.0-47.2), pee stream
  (74.3-74.9), rigid-body wall debris (60.07-60.6), rock debris burst (84.3-84.7), flying rock (22.77).
- Scale gags: tiny hero vs giant Buddha (63.9-66.6, 76.6-77.3), crane-ups that make him small (C8, C14).
- Camera as transition: whip-rolls, snap-zooms and foreground wipes (monkey 13.27-13.53, pillar 40.4-40.7) replace dissolves.

## Edit rules (from the measured cut times)

1. **One story beat = one continuous camera move.** 33 shots carry 105 caption cards (~3.2 cards per shot). A cut means a new place or a
   new beat, never a new angle on the same moment.
2. **Cut on punctuation:** 25 of 32 cuts land right after a sentence end (". ? :"), 1 on a list comma ("swords," 55.6).
3. **The other 6 cuts are mid-phrase and land on the noun the next picture shows:** "...give / yourself a new title" (31.73),
   "in charge of his / peaches" (40.7), "and Heaven's / throne" (66.73), "to the end / of the world" (70.83), "back and tell / him you won"
   (76.63), "right on / top of you" (84.3).
4. **Picture leads the words** by 1-2 frames at most cuts.
5. **Pace accelerates:** 13 cuts in the first half, 19 in the second; the shortest run (0.7-1.13 s shots C26, C28, C29, C30) sits right
   before the twist.
6. **Hard cuts only**; transitions happen inside shots (whip-roll, snap-zoom, foreground wipe). No fades, no dissolves.
7. **Callbacks and loop:** the book insert three times (0 s, 15.5 s, 47.8 s), the graffiti twice (73 s, 80 s), the last picture repeats the
   question picture (C33 = C2), so the Short loops.
8. **Holds only on objects:** the three dead-still holds are props (furnace 57.0-58.1, throne 66.9-68.0, finger text 80.0-81.3).

## Audio

- Integrated -14.3 LUFS, LRA **1.6 LU** (very compressed), true peak -0.9 dBFS; mono AAC 48 kHz (audio.json, ffprobe).
- **Continuous music bed under the voice**: no silence anywhere; the quietest 100-ms windows are still -24 to -30 dBFS (1st percentile
  -24.9 dBFS) and in pauses 58 % of the energy is below 150 Hz (23.7 s, 43.5 s) = bass/drum bed.
- **No dynamic change at the big beats:** RMS -14.1 dB over the twist (77.0-78.5) vs -14.2 for the whole film; -14.1 over the ending.
- SFX: unverified (high-frequency bursts exist but coincide with sibilants, e.g. "ghosts" 11.2, "still stop" 50.8).
- Voice: one narrator, fast and even (~236 wpm, no pauses); median pitch ~165 Hz (estimate, the music may bias it); gender and whether the
  voice is TTS: unverified.

## Weaknesses (seen, with evidence)

| Time | Issue | Evidence |
|---|---|---|
| whole film | **Narration far too fast** to follow on first view | 333 words in 84.8 s = ~236 wpm (3.9 words/s), 105 cards at 0.81 s, no silences (audio.json) |
| whole film | **Tiny, low-contrast captions** | cap height ~1.7 % of frame height; 1-px outline; behind the captions the median luma reaches 197-202 at 76.9 s and 80.5 s and 170 at 72.5 s vs white text 255 |
| whole film | **No visual identity: assets from different styles** | box-head humans + realistic chimps (7.4-13.9) + Minecraft-style voxel village and horse (27.9-31.7) + realistic soldier army (51.6-54.2) + painted-portrait faces on cubes (21.5, 50.3) |
| 13.9, 26.2, 43.6, 68.4, 72.2 | **Hero model not consistent** | Wukong changes outfit and head: red jacket/orange trousers + painted face + gold band (7.4-13.9, 22-25), red/black patterned suit with tail (13.9-18.9, 43.6-49.7), red shirt/brown trousers with a plain dark box head and yellow eyes (68.4-76.6) |
| 21.5, 39.9 | Costume anachronism | the Jade Emperor wears white sneakers and a plain black suit (`cmp1.jpg`) |
| 7.43, 8.6-8.9 | Stiff/broken animation | monkeys with arms straight out (T-pose-like), sliding in place |
| 54.8-55.2, 60.1-60.6 | No contact, no reactions | the sword never visibly touches Wukong and he does not react; guards stand idle while the wall explodes behind them |
| 55.07, 56.30, 58.13, 59.60 | Rendering artefacts | thin white light-leak lines across the courtyard wall; a small "+" mark on the wall (`cmp2.png`) |
| 27.9-29.2, 43.6-44.5 | Bad textures | tree leaves render as black/white noise blocks; floor is a noisy dark-green texture |
| 3.867-3.933, 21.933-22.000 | Exposure flash at shot start | first 3 frames over-exposed (luma 176 then 134; 169 then 113); sky colour pops pale green -> orange in one frame at 4.13 |
| 1.60-1.63, 26.80-26.83, 63.87-63.90 | Steppy whips | 25-50 px or 30 deg+ jumps per frame with no motion blur at 30 fps |
| 44.4-47.7 | "Heaven's party" is an empty room | red walls, one table of boxes, nobody else present |
| 51.6-54.2 | Scale claim not shown | "a hundred thousand soldiers" = about 50 models in frame |
| 65.3-67.0 | Logic gap in the bet | "He bets you can't jump out of the palm of his hand, and Heaven's throne is yours" (the condition "if you can" is missing) |
| 68.0 | Promised action not shown | "One somersault" but Wukong floats upright, no flip |
| 83.2-84.3 | Weak climax VFX | the hand "turning into a mountain" is a dark untextured slab falling on a flat green plane; the transformation itself is never shown |
| 11.2-14.6 | Continuity of the soul | the soul is a glowing yellow figure when taken (11.2-12.8) but a normal solid body in the underworld (13.9-18.9) |
| 54.7-60.6, 68-71.7, 82.2-84.2 | Empty environments | flat floor plane + walls + flat sky; flat cloud plain; flat green plane |
| ~14 of 33 shots | Hero too small for a phone | Wukong under ~1/4 of frame height in C3, C7, C8, C9, C14, C18, C20, C23, C25, C26, C28, C29, C32; his face (a cube with a texture) has no expression to read |
| 77.0-78.5 | Twist has no sound design | RMS -14.1 dB, same as the whole film; no music drop or hit under "You never left my hand" |
| 43.6-44.5 | Dead frame | the only locked-off shot start (0.93 s) shows an empty red wall before the doors open |
| file | Low delivery quality of our copy | 360x640, ~408 kb/s; original upload resolution unverified |
