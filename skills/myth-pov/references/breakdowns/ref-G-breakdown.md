# Reference G: "How the Eye..." (magic glasses that predict roulette; how the casino's eye in the sky catches you): frame-by-frame breakdown

This video comes from the **second creator** (casino, gambling and money topics, with a more polished and more realistic look than the myth creator of refs A–C).
Source analysed: `scratchpad/ref/G_how_the_eye.mp4` (our download: 360x640, 30 fps, H.264 ~462 kb/s, **stereo** AAC 48 kHz ~192 kb/s).
Data: `scratchpad/ana/G_how_the_eye/` (shots.json, per_frame.json, captions.json, audio.json, 22 contact sheets, first/mid/last frames).
I checked the data against the pictures in four ways. I opened all 22 contact sheets (sheets 1–3 at full size and 4–22 in 2x2 grids, `work/G/sheetgrid_*.jpg`).
I made **10 fps strips of the whole video** (790 frames in 16 sheets, `work/G/s10_00..15.jpg`, made with `work/G/scripts/strip.py`)
and **30 fps strips** at every suspicious point (`work/G/f30_a..l.jpg`, `dome.jpg`, `loop.jpg`). I also ran a second, more sensitive cut pass
(`work/G/scripts/cuts.py`: grey-level correlation with the caption band masked, mean abs diff and HSV histogram distance, output `work/G/cuts.json`).
(All `work/G/` paths are under `/tmp/claude-0/-home-user-antonio/f0d0eae3-7958-51c5-8172-cec79a9a45b5/scratchpad/`.)

## Measured totals

| Item | Value | How it was measured |
|---|---|---|
| Duration | 78.93 s (2368 frames) | shots.json |
| Detector shots | 22 (avg 3.59 s) | shots.json |
| **Camera setups after checking** | **25** (mean 3.16 s, median 2.70 s, min 1.13 s, max 6.17 s) | All 22 detector cuts are real hard cuts. I found **3 hidden soft transitions**: a cross-dissolve at 23.60–23.73 (table → ceiling dome camera), a cross-dissolve at 59.27–59.50 (manager on phone → CCTV Cam 7), and a **dip to black** at 77.03–77.17 (guard → casino floor/claw machine). No detector cut was a false split |
| In-take "transitions" that are NOT cuts | 12 | Whips, swoops and fly-into/out-of-screen moves inside one take: 2.50–3.33 (glasses on), 6.70–6.93 (whip right), 18.33–18.57 (dealer head turn), 20.50–20.80 (swoop to wheel), 26.53–27.00 (fly into monitor), 30.10–30.70 (pull out of monitor), 34.03–34.70 (swoop over layout), 38.87–38.97 (paper slides in), 40.20–40.63 (pull out of monitor), 47.0–47.6 (POV look left), 55.53–56.80 (CCTV push-down), 71.10–71.27 (POV whip to guard) |
| Shot-length histogram | ≤1 s: 0, 1–2 s: 10, 2–3 s: 4, 3–5 s: 7, >5 s: 4 | corrected list |
| Narration | **266 words, 74 caption chunks** | cleaned OCR, checked on the 10 fps strips |
| Words per minute | **202 wpm** over 78.9 s (206 wpm over the spoken part 0–77.4 s) | words / duration |
| Words per caption | mean 3.6 (2 words: 13, 3: 25, 4: 22, 5: 8, 6: 5, 7: 1). Longest: "you and see if you are linked" | cleaned chunks |
| Caption on-screen time | mean 1.05 s, median 1.0 s, min 0.5 s ("The dealer", "ask you"), max 1.6 s | chunk starts from OCR (0.1 s resolution) |
| Loudness | **−17.6 LUFS** integrated, LRA 3.0 LU, true peak −2.3 dBFS | audio.json (EBU R128) |
| Silence | none detected | audio.json `silences: []`. My 50 ms RMS pass: p5 −30.3, median −22.4, p95 −15.4 dBFS. Only 18 of 1579 windows fall below −40 dB |
| Picture brightness | mean luma **51**, median 53, min 11, max 118. **19 % of frames are below luma 30** | per_frame.json |
| Brightest presets | top-down roulette macros: luma 98–114 (shots 8, 12, 21) | shots.json light_mid |
| Darkest presets | surveillance room / dome / bar: luma 17–25 (shots 7 mid, 9b, 10 start) | shots.json |

**Hidden transitions I checked frame by frame:**

- **23.60–23.73, cross-dissolve** (f708–712). The table shot tilts up and darkens while the ceiling dome (red LED, white reflection) fades in on top. Both images are visible at 23.633–23.700 (`work/G/dome.jpg`). The detector missed it (score 0.31). My pass shows corr 0.29–0.47 over 5 frames, the signature of a dissolve and not of a hard cut.
- **59.27–59.50, cross-dissolve** (~7 frames). The bald manager on the phone is overlaid by the CCTV Cam 7 face shot, with the face box and timecode fading in (`work/G/f30_e.jpg`). Corr never drops below 0.73, so the detector could not see it.
- **77.03–77.17, dip to black.** At 77.07–77.13 the frame is fully black (luma 9.7), then it fades up on the casino floor (`work/G/f30_d.jpg`).
- **Not cuts:** 6.70–6.93 is a POV whip right (a dark foreground body wipes across). 20.50–20.80 and 34.03–34.70 are continuous swoops over the betting layout. 26.53–27.00 and 30.10–30.70 / 40.20–40.63 fly into or out of one monitor. 55.53–56.80 is a push-down from the CCTV angle onto the table (the CCTV overlay fades out on the way).

## Clean narration (OCR fixed against frames)

> Imagine you have a magic pair of glasses that can tell you upcoming roulette rolls. This is how fast it would take for you to
> get banned. The first few bets you win, nobody notices. Everyone can get this lucky, but as you keep crushing it, suspicion starts at
> the table. The dealer and the pit manager notice your unusual winning pattern, but they just keep an eye on you at first. But as your
> perfect winning streak continues, surveillance gets pinged and the eye in the sky locks onto you. They carefully inspect your bet
> timing and body language. However, nothing about you can be linked to known cheating methods. Nonetheless, at this point, you're
> straight up draining the casino, and this cannot be ignored. They scramble to identify you and see if you are linked to any previous
> incidents, and you're not. At this point, a crowd of people have gathered around the table to witness your incredible streak. A few
> people even started copying your bets, thus making the casino bleed cash. Security fear you might have an inside man, so they change
> the table's dealer, but that doesn't stop you from winning. And thus management is faced with a difficult decision. Let you continue
> or kick you out in front of everyone and face a reputation blow. But as you win a few more times, your unbelievable streak cannot be
> explained by just luck, and you're labeled as an advantage player. They congratulate you on your wins and kindly ask you to stop
> playing roulette. You can play on other games though.

**OCR fixes.** The OCR row merged the burned caption with in-scene text in the same horizontal band. I removed those parts: the sign board ("BLACK!/RED!/GREEN!/Rolling...", "BLAOKI", "RBO!"), the CCTV overlay ("Cam 5/7/11/19 22:10:..."), glitch glyphs ("?..:", "=:?") and chip numbers ("10 50 $10").
Words fixed on frames: "amagiopairofglasses" → "a magic pair of glasses", "rauleite" → "roulette", "survelllange" → "surveillance", "Iocks ontp" → "locks onto",
"Touanokpue" (40.7) → OCR noise over "and you're not." The caption text is ungrammatical in the source itself ("how fast it would take", "a crowd ... have gathered",
"Security fear"). I kept it as written because it is what the viewer reads (see Weaknesses).

## Look of the world (applies to every shot)

- **Engine look:** a real-time 3D render (Unity/Unreal-like, engine unverified) with PBR-ish materials: glossy green felt, lacquered wheel, glass chandeliers, metallic
  stapler and claw machine. Bloom on every emissive (chandelier bulbs, ring lights, monitors, signs). There is mild film grain/noise everywhere and **scan-line noise** in the CCTV shots.
  There is no visible depth of field in most shots. Slight background softening happens only behind the ECU dealer (shot 7), and whether it comes from DOF or from compression is unverified.
- **Characters:** stock humanoid bodies (suits, waistcoats, shirts) with **photo faces of real-looking people mapped onto a box/wedge-shaped head**.
  The dealer's head reads like a paper bag with a face printed on the front (14.3 s full frame). The face is a flat texture, so in profile it stretches and you see a blank back with an ear (18.4 s).
  Hero = bearded man in a blue shirt and **pink/magenta glasses**. Dealers wear a red waistcoat and bow tie. Security wear black suits, sunglasses and a blue badge. The manager is bald with glasses. Other players are
  low-detail mannequins whose faces are often hidden. Where the face photos come from is unverified (stock or AI).
- **POV hands:** pale, mitten-like hands with blue sleeves (the hero's shirt colour), animated by keyframes (place chips, hold glasses, shake hands).
- **Sets:** (1) casino floor, with navy walls, chandeliers (green shade + candle bulbs), slot machines, framed painting, palms, red carpet and one hero roulette table;
  (2) the table close-ups, with a **3D state board** behind the dealer ("BLACK!", "RED!", "GREEN!", "Rolling..." plus a big colour disc or spinning mini-wheel) and a
  row of **5 ring lights** in front of the dealer that show the last results; (3) the surveillance room, with a monitor wall, ceiling downlights and silhouetted guards at a desk;
  (4) the manager's wood-panel office; (5) the bar background; (6) a claw machine with halftone-dot blue panels (the final gag).
- **Overlays:** CCTV HUD (white sans "Cam N" top-left plus a running "HH:MM:SS:FF" timecode top-right), a face-tracking box, cycling glitch glyphs, a rewind « icon,
  and a paper "suspects" sheet with three mugshots (Dealer Collusion / Wheel Bias Exploitation / Card counting).
- **Captions:** burned-in white text at y ≈ 0.71 (see Caption spec).

## Shot table (all 25 camera setups; detector numbers kept, a/b = my splits)

Abbreviations: ECU/CU/MCU/MS/WS/EWS, POV = first-person camera with the hero's hands. Lens values are estimates of vertical FOV ("est.").
Movement numbers come from shots.json: dx/dy px over the shot (360x640), scale = zoom factor, flow = mean px/frame (first half → second half shows easing),
par = parallax. Light: luma first/mid/last, centre vs edge (vignette), warmth = r−b.

| # | Time (s) | Size | Angle / height | Lens (est.) | Camera move (verified) | Subject and animation | Light | On-screen text | Why the cut lands here |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.000–1.300 | WS | Slightly high, ~2 m, over the shoulder of a seated woman (red dress) in the foreground | normal ~50° | **Slow push-in** 1.098, flow 0.52→0.67 (linear), par 0.31 | Hero (bearded, blue shirt) stands by a second table and fiddles with something in his hands (the glasses, too small to read). The seated player is idle | Casino floor: warm chandelier with bloom top-right, cool navy walls, slot-machine screens as blue practicals. Luma 50→57, centre 54 / edge 49, warmth +11..+14 | "Imagine you have" / "a magic pair of glasses" | Cuts on "glasses" to show the object |
| 2 | 1.300–2.433 | CU insert (hands + glasses) | Waist height, side-on | normal | **Truck left + 5° roll** (dx +52, flow 4.1→6.3, par 5.0). Handheld feel | Hero's hands hold up **pink glasses that sparkle with yellow particles**. At 2.3–2.4 the glasses lift toward camera | Dark: the glasses are the only bright thing, warm yellow particle bloom. Luma 29→48, centre 78 vs edge 32 | "a magic pair of glasses" / "that can tell you" | Cuts as the glasses come up to the lens into the POV |
| 3 | 2.433–7.433 | POV → MS dealer → MS bouncers | Seated eye level ~1.2 m | normal ~55° | **One take:** POV hands raise the glasses and the frame passes over the lens (2.50–3.33). **Push-in** toward the dealer (3.4–4.5, flow ~5.4, ease-out), drift. **Whip-pan right** 6.70–6.93 through a dark foreground body to two bouncers, then settle. Net scale 0.884, dy +206 | Glasses on (a yellow glow orb flickers on the felt at 3.4–3.6: the "prediction", unverified). Dealer spins, **board cycles BLACK! → Rolling... (spinning mini-wheel) → RED!** (4.5, 6.0). Two security men in sunglasses stare at camera (6.9–7.4) | Floor preset, luma 31→69→31. Board and ring lights bloom. Centre 84 / edge 49 | "upcoming roulette rolls." / "This is how fast" / "it would take" / "for you to get banned." + 3D board text | Hard cut right after "banned." The bouncers are the visual for "banned" |
| 4 | 7.433–11.300 | POV MS (table) | Seated eye level | normal | **Near-static POV with head-bob drift** (dx −16, dy −33, flow 3.35 constant) | Hands place chips on RED. Board: RED! → Rolling... → RED!. **Dealer's rake sweeps the losing chips** (10.3–10.9) | Floor preset, luma 56–62, centre 78 / edge 39 | "The first few bets you win," / "nobody notices." / "Everyone can get this lucky," | On the comma after "lucky," |
| 5 | 11.300–12.567 | Insert, top-down ECU wheel | ~70° overhead | normal | **Whoosh-in that settles**: flow 10.1→1.1 (hard ease-out), the wheel rotates in frame (roll −24° is mostly wheel spin) | Roulette wheel spinning, white ball, the green 0 pocket passing | Warm overhead key on lacquered wood, specular glints. Luma 49–52, centre 88, warmth +38 | "but as you keep crushing it" | Cut on "crushing it" back to the table |
| 6 | 12.567–14.267 | POV → MS dealer | Seated eye level | normal | **Push-in ×2.58** past the tall chip stacks to the dealer, ease-out (4.7→3.5) | Big blue chip stacks in the foreground (winnings). Board BLACK!. The dealer looks up at you | Floor preset, luma 55→68, board bloom | "suspicion starts at the table." | Lands on the dealer's face. Cut on "The dealer" |
| 7 | 14.267–19.500 | **ECU dealer face (foreground) + WS pit manager (background)** | Eye level | normal ~45° | **Locked** (dx 7, flow 0 in the first half). The motion in the second half (3.7 px/f) is the dealer's head | The dealer's photo face fills the frame left. **15.2–17.5 his face goes dark** (light on him drops, luma 67→17) so the eye goes to the **pit manager** standing at the bar in the back. 17.6 lit again. **18.3–18.5 he turns his head into the lens** (blank back + ear) and exits, revealing the floor | Bar/back-room dark. Luma 67→17→30, centre 24 / edge 19 at mid. Bottle shelf lit behind | "The dealer" / "and the pit manager" / "notice your unusual" / "winning pattern," / "but they just keep an eye" / "on you at first." | Cut on "at first." |
| 8 | 19.500–21.700 | POV CU hands → top-down wheel | Overhead ~60° → 80° | normal | **Hold, then a fast swoop** across the number layout to the wheel (20.50–20.80, 9 frames, blur), then slow orbit. Scale 2.52, par 4.6 | Hands push blue chip stacks onto RED. Wheel spinning, ball rolling, green 0 lit | Bright top-down preset: luma 66→106→74, centre 130, warmth +31 | "But as your perfect" / "winning streak continues," | Cut on "surveillance" |
| 9a | 21.700–23.633 | POV MS | Seated eye level → tilting up | normal | **Push-in and tilt up** (net scale 2.25 with 9b, roll −8°) | Big chip stacks. A security man behind the dealer gets a **red "!" alert icon over his head** (22.2–22.8), game-HUD style | Floor preset, luma 52 | "surveillance gets pinged" / "and the eye in the sky" | **Dissolve 23.60–23.73** on "eye in the sky" |
| 9b | 23.633–25.467 | ECU ceiling dome camera | Low, looking up | normal | **Slow push/drift** | Black dome with a **red LED that blinks on** (24.2–25.3) and **the hero's reflection in the dome glass** (24.7–25.4) | Very dark, red rim on the dome. Luma 22–25, edge 15 | "locks onto you." | On "locks onto you." The red light = locking on |
| 10 | 25.467–28.167 | WS surveillance room → CCTV picture | Eye level behind seated operators | normal | **Slow truck, then accelerating push INTO one monitor** (26.53–27.00) until its picture fills the frame. Scale 4.26 | Monitor wall, silhouettes, an operator's hand on the desk. The CCTV image becomes full frame (hero seated at the table, high angle). **CCTV HUD fades in at 27.5** ("Cam 5", timecode 22:09:16:xx counting) | Surveillance preset (black room, white downlight discs, cool monitor glow, warmth −16), then the **CCTV grade**: desaturated (sat 84), noisy, contrast 68. Luma 33→79→43 | "They carefully" / "inspect your bet timing" / "and body language." + CCTV HUD | Cut at the next camera number (Cam 11), on "However" |
| 11 | 28.167–32.200 | CCTV insert CU (hand + chips) → WS room | High angle | normal | **Static CCTV**, then **pull-out of the monitor** (30.10–30.70, ease-out) back to the room. Scale 0.318 | Hero's hand places a chip stack. **Rewind «** at 28.7–29.0 and the timecode jumps back (17:14 → 17:01): replay of the bet. Then a dark guard at the desk | CCTV grade (sat 97), then surveillance preset. Luma 64→49→36 | "However, nothing about" / "you can be linked" / "to known cheating methods." + HUD | On "Nonetheless" |
| 12 | 32.200–36.467 | Top-down wheel → layout → chip insert | 80–90° overhead | normal | **Slow orbit over the wheel**, then a **swoop over the layout** (34.03–34.70, 20 frames) to the outside bet. Flow 8.45 constant, scale 0.85 | Wheel spinning. Then **the dealer's T-rake pushes a payout** of red/blue chips to the hero (35.1–36.4) | Brightest preset: luma 70→114→72, centre 130, warmth +35 | "Nonetheless, at this point," / "you're straight up" / "draining the casino," / "and this cannot be ignored." | On "ignored." |
| 13 | 36.467–41.467 | CCTV MCU hero → paper insert → WS room | Slightly high (CCTV) | normal | **Static CCTV with micro drift**, a paper slides in from the right (38.87), then **pull-out of the monitor** (40.20–40.63). Scale 0.273 | Hero's photo face with pink glasses. **White face-tracking square follows his head** and **glitch glyphs cycle** next to it ("?..:", "/!..", "=:?") each ~0.1 s. A hand holds a **suspects sheet**. Operator at desk | CCTV grade, face overexposed/blooming (centre 102), sat 95, warmth −13 | "They scramble to identify" / "you and see if you are linked" / "to any previous incidents" / "and you're not." + HUD + sheet labels | On "At this point" |
| 14 | 41.467–46.133 | Top-down EWS (bird's-eye) | 90° overhead, ~8 m | normal | **Slow continuous rotation** (−27° over 4.7 s ≈ 5.8°/s) + **slow push** 1.23, flow 0.47 constant (linear, no easing) | A crowd of ~25 figures packed around the table, idle. The BLACK! board seen from above | **Spotlight cone** on the table, red-brown carpet falling to black: luma 28–34, centre 64 / edge 19, sat 192 | "At this point," / "a crowd of people" / "have gathered" / "around the table" / "to witness your" / "incredible streak." | On "incredible streak." |
| 15 | 46.133–50.700 | POV MS | Seated eye level | normal | **POV look left** to a neighbour (47.0–47.6) and back, push 1.14 ease-out (4.9→1.4) | Other players' hands push chips onto RED beside yours (copying). Board RED! → Rolling... → BLACK! (49.9). Security men line the back | Floor preset, luma 49–59, centre 85 / edge 27 | "A few people even started" / "copying your bets," / "thus making the casino" / "bleed cash." | On "bleed cash." |
| 16 | 50.700–56.867 | CCTV high-angle WS → table CU | ~45° high (ceiling) | normal | **Static CCTV for 4.8 s** (flow 0.13), then a **push-down/crane into the table** (55.53–56.80, ease-in) while the HUD fades. Scale 3.10 | **Dealer swap** plays out in the WS: the old dealer is walked off (52.3–53.2), a new dealer steps in (53.6). Board cycles. Ends on the hero's chip stack | Floor preset seen from above, luma 53→95 at the end | "Security fear" / "you might have an inside man," / "so they change" / "the table's dealer," / "but that doesn't stop you" / "from winning." + "Cam 19" HUD | On "And thus" |
| 17 | 56.867–58.033 | MCU | Eye level | normal | **Locked** (flow 0.0) | Security chief in sunglasses talks into a **walkie-talkie** held to his mouth | Surveillance preset: downlight discs, monitors behind. Luma 38, centre 78 / edge 41, warmth −13 | "And thus" / "management is faced" | Cut on "with a difficult decision" |
| 18a | 58.033–59.400 | MCU | Slightly high | normal | **Near-static** (flow 0.12) | Bald manager on a **desk phone**, hand on forehead (stress pose, held) | **Office preset**: warm wood panelling with a hot spot behind his head. Luma 45–53, centre 100 / edge 24 | "with a difficult decision." / "Let you continue" | **Dissolve 59.27–59.50** on "Let you continue" |
| 18b | 59.400–60.867 | CCTV MCU hero | Slightly high | normal | Static, slight drift (flow ~5 in the second half) | **The same Cam 7 clip as shot 13** (timecodes 22:10:11:19 → 22:10:13:01 repeat). Face box + glyphs | CCTV grade, luma ~60 | "Let you continue" / "or kick you out" | On "in front of everyone" |
| 19 | 60.867–63.767 | Top-down EWS | 90° overhead | normal | **Slow rotation** (+16°) + **slow pull-out** 0.87, flow 0.45 linear | **The same crowd set-up as shot 14** (same BLACK! board, same figures) | Spotlight preset, luma 30–33, centre 68 / edge 18, sat 185 | "in front of everyone" / "and face a reputation blow." | On "But as you win" |
| 20 | 63.767–68.933 | POV MS | Seated eye level | normal | **Slow pull-out** 0.83, ease-out (3.9→0.95) | Board BLACK! → Rolling... → **GREEN!** (65.7: you hit 0). **The other players collapse face-down on the table** in disbelief (66.6–68.0). The hero's hands open | Floor preset, luma 51–61, centre 77 / edge 33 | "But as you win" / "a few more times," / "your unbelievable streak" / "cannot be explained" / "by just luck" | Cut on "and you're labeled" |
| 21 | 68.933–71.100 | POV insert CU | Desk height, looking down | normal | Slow drift up/rotate (dx −43, dy +80) | Operator's dark-sleeved hands **staple the hero's photo onto the suspects sheet** (stapler prop), then hold it up | Surveillance desk, lit paper: luma 98–101 (paper is the key), centre 126, sat 60 | "and you're labeled" / "as an advantage player." + sheet labels | On "They congratulate" |
| 22a | 71.100–77.100 | POV MS (guard) | Seated eye level → standing | wide-normal ~60° | **POV whip** from your own arm to the guard (71.10–71.27), handheld MS, then a **pan right following his pointing arm** (76.70–77.00) into a **dip to black** | Security guard (sunglasses, badge) **shakes your hand** (72.2–73.5), tilts his head, points you to the other games | Dark floor, chandelier behind his head, face front-lit. Luma 49→25→77, centre 40 / edge 14 | "They congratulate" / "you on your wins" / "and kindly" / "ask you" / "to stop playing roulette." / "You can play on" / "other games though." | Dip to black on "other games" |
| 22b | 77.100–78.933 | WS → MS claw machine | Eye level ~1.5 m | normal | **Fade up, then dolly forward + pan** to the claw machine (77.5–77.8, fast, ease-out), hold to the end | Casino floor (the same corner as shot 1: painting, green lamp, slot machines), then a **claw machine full of yellow plush toys** | Cool blue spot on the machine, purple floor, **halftone-dot texture** on the machine panels. Luma 47→77 | "other games though." until ~77.4, then **no caption** for the last 1.5 s | The video ends on the visual punchline (claw machine = "other games") |

## Story structure with timestamps

| Beat | Time (s) | What happens |
|---|---|---|
| Hook (premise + promise) | 0.0–7.4 | "Imagine you have a magic pair of glasses that can tell you upcoming roulette rolls. This is how fast it would take for you to get banned." The superpower is shown (sparkling glasses, POV putting them on) and the end state is teased (two bouncers) |
| Stage 1: lucky | 7.4–12.6 | First wins. "Nobody notices. Everyone can get this lucky." Rake, spinning wheel |
| Stage 2: the table notices | 12.6–19.5 | Stacks grow, the dealer and pit manager watch (lighting moves your eye from the dealer to the manager) |
| Stage 3: surveillance | 19.5–28.2 | Streak continues, a "!" alert, the dome camera's red LED, fly into the monitor wall, CCTV inspection |
| Stage 4: investigation fails | 28.2–41.5 | Rewind of your bets. "Nothing ... linked to known cheating methods." You drain the casino (payout). Face ID against suspects: "and you're not" |
| Escalation: social | 41.5–50.7 | Bird's-eye crowd, other players copy your bets, the casino "bleeds cash" |
| Countermeasure | 50.7–56.9 | Dealer swap seen on CCTV, "doesn't stop you from winning" |
| Dilemma | 56.9–63.8 | Management on walkie-talkie and phone: let you continue or kick you out "in front of everyone" (crowd shot reprise) |
| Climax | 63.8–71.1 | GREEN 0 hit, the crowd collapses. You get labeled "advantage player" (your photo stapled to the suspects sheet) |
| Resolution | 71.1–77.1 | Polite ban: handshake, "kindly ask you to stop playing roulette" |
| Punchline / button | 77.1–78.9 | "You can play on other games though" → claw machine full of plush. Ends on the gag with no CTA. The last setting is the same floor corner as the opening frame (painting, green lamp, slot machines), which works as a visual bookend. A seamless loop is not verified (the last line does not run into "Imagine...") |

The structure is a **ladder of escalating stages** (table → surveillance → investigation → crowd → countermeasure → decision → label → ban). It is driven by "But as...", "At this point...", "And thus..." connectors. It is a process explainer told as a second-person story. There is no named character, no family member and no twist. The ending is a soft joke.

## Camera statistics (25 setups, verified against the pictures)

- **POV / first-person with hands: 9** (3, 4, 6, 8, 9a, 15, 20, 21, 22a). This is the backbone of the video (~33 s of 79). The POV camera sits at seated eye height with a constant
  slow drift (flow 3–5 px/f, the head-bob) and **does real head moves**: look left (15), whip right (3), whip to the guard (22a), tilt up to the ceiling (9a).
- **CCTV-framed shots: 5** (end of 10, 11, 13, 16, 18b), plus 3 **fly-into / fly-out-of-a-monitor** moves (26.5, 30.1, 40.2) that link the world and the screen without a cut.
- **Top-down / overhead: 5** (5, 8 end, 12, 14, 19). The wheel macros orbit or swoop fast. The bird's-eye crowd shots **rotate slowly and linearly** (~5–6°/s) with a 0.87–1.23 push or pull.
- **Fast swoops over props: 3** (20.50–20.80, 34.03–34.70, 55.53–56.80). 9–38 frames, motion blur, used instead of a cut to go from "you" to "the result".
- **Push-ins:** 1, 3, 6, 9a, 10, 15 (scale 1.10–4.3). Ease-out is the default (6: 4.7→3.5, 15: 4.9→1.4). The fly-into-monitor push eases in.
- **Pull-outs:** 11, 13 (out of the monitor), 19, 20 (0.27–0.87).
- **Locked off: 3** (7, 17, 18a). These are character beats (dealer watching, chief on the radio, manager stressed). Shot 7 is locked for 5.2 s and the **light change** does the work.
- **Shot sizes:** POV MS ≈ 9, inserts/ECU props ≈ 6 (glasses, wheel ×3, chips, stapler), MCU/ECU faces ≈ 6 (dealer ECU, CCTV hero ×2, chief, manager, guard), WS/EWS ≈ 4 (opening, 14, 19, floor/claw).
  Faces are much closer than in ref A: the ECU dealer face fills ~45 % of the frame at 14.3.
- **Heights:** seated eye level ~1.2 m dominates (POV). There are ceiling heights for CCTV (~45°) and a true 90° top-down for the crowd. Low angle appears only for the dome (9b).
- **Lens:** normal ~45–55° vertical FOV (est.), with no visible zoom effects. All scale changes show parallax (par 1–5), so they are dolly moves. DOF is not used, except possibly behind the dealer ECU (unverified).
- **Average take is long (3.16 s, 2× ref A)**, but every take has a camera event (a whip, swoop, fly-in, sign change or light change) about every 1.0–1.5 s, so the picture never sits still.

## Lighting presets (recipes to rebuild, not copy)

1. **Casino floor at night** (1, 3, 4, 6, 9a, 15, 20). Navy-blue walls (dominant hue sky-blue/blue) with a dark ceiling. Warm practical chandeliers (shade + candle bulbs, ~2700 K) with heavy bloom.
   Blue emissive slot-machine screens and TV walls. The green felt is lit from above as the brightest surface. Ring lights and the state board are emissive.
   Measured: luma 50–69, sat 135–165, warmth −8…+14, **vignette** centre 74–88 vs edge 27–49.
2. **Roulette macro, top-down** (5, 8, 12). A soft warm overhead key, glossy lacquer with specular highlights, a bright felt. Luma 98–114 at mid, centre 130, warmth +31…+38. These are the brightest shots, used for "winning".
3. **Surveillance room** (10, 11 end, 13 end, 17, 21). A black room, round ceiling downlights read as white discs (they also flare), a monitor wall as cool fill, operators as silhouettes.
   Luma 17–38, warmth −13…−16. The paper sheet becomes the brightest object when held up (shot 21, luma 100).
4. **CCTV grade** (10 end, 11, 13, 16, 18b). Desaturate (sat 84–97 vs 135–165 in colour shots), cool shift, add noise/scanlines and contrast (std 66–70), let faces blow out
   (centre 102 at 37.0). White HUD: "Cam N" top-left, timecode top-right at ~0.06–0.08 height, glyphs left of the face box.
5. **Bird's-eye spotlight** (14, 19). One hard spot cone on the table, a red-brown carpet falling off to near-black. Luma 28–34, sat 185–192, centre 64–68 vs edge 18.
6. **Bar / back room with a key-light cue** (7). Foreground face lit, then dimmed to near-black for 2.3 s (luma 67 → 17), then relit. The light change replaces a rack focus.
7. **Manager's office** (18a). Warm wood panelling with one warm hot spot behind the head (rim), cool shirt. Luma 45–53, centre 100 vs edge 24 (strong vignette).
8. **Ceiling dome** (9b). Near-black. Red LED as the only colour, a white specular arc on the dome glass, the hero reflected in it. Luma 22–25.
9. **Claw-machine finale** (22b). A cool blue spot, purple floor, halftone-dot panels. Brighter than the floor before it (luma 47→77).

## Caption spec

- White, sentence case, **bold grotesque sans** (Inter-Bold / Montserrat-Bold look; exact font unverified) with a **thin dark outline plus a soft drop shadow**
  (zoom `work/G/capzoom.jpg`). There is no box.
- **Small:** cap/x-height line ≈ 0.03 of frame height (OCR text_h_frac 0.021–0.034, ≈ 19 px of 640). One line, centred, max width ≈ 0.55–0.60 of the frame.
- **Position:** fixed at y ≈ **0.71** (OCR y_frac 0.709–0.710 on every clean chunk), i.e. just below the centre of the lower half. It stays there over POV hands and table text.
- 2–7 words per chunk (mean 3.6), phrase-based, punctuation kept. Each chunk shows a hard on/off for ~1.0 s (0.5–1.6 s). No word highlight, no colour words, no animation.
- **Captions run to 77.4 only.** The final 1.5 s (claw machine) has no text.
- **Separate on-screen text layers** (never in the caption style): 3D board words "BLACK!/RED!/GREEN!/Rolling..." in a white serif-ish/italic display face on a green panel,
  the CCTV HUD (white sans with a light shadow), and the suspects-sheet labels (black sans on white paper).
- **Cut/caption sync:** 13 of 21 hard cuts fall within 0.1 s of a new caption chunk (7.43/7.4, 11.30/11.3, 14.27/14.3, 19.50/19.5, 21.70/21.7, 36.47/36.5, 46.13/46.2,
  50.70/50.7, 58.03/58.0, 63.77/63.8, 68.93/69.0, 71.10/71.2, 12.57/12.7). The others sit 0.3–0.4 s off (32.20 vs 31.9, 41.47 vs 41.2, 56.87 vs 56.5,
  60.87 vs 61.2). Ref A's picture led by 2–4 frames; here, within OCR resolution, cut and caption change **together**.

## Animation and VFX

- **Keyframed POV hand animation**: place chips, push stacks, hold glasses up to the face, handshake, open palms (shots 2, 3, 4, 8, 15, 20, 22a).
- **Stock body clips** on NPCs: idle, dealer spin/rake, walk-off and walk-in (dealer swap 52.3–53.6), talk on walkie-talkie, phone + hand-on-forehead,
  head-turn to camera (18.3), players collapsing onto the table (66.6–68.0), guard pointing. They look mocap-like (weight shifts) but are unverified.
- **No lip-sync or facial animation.** The faces are static photo textures. Expression comes from head turns and light.
- **Prop physics/animation:** spinning wheel + ball (5, 8, 12), dealer rake sweeping and paying out (10.3, 35.1), chip stacks growing between shots (6 → 9a → 15 → 20),
  paper slide-in (38.9), stapler (69.0), dome LED blink (24.2).
- **Game-HUD VFX:** yellow sparkle particles on the glasses (1.3–2.4), a glowing yellow orb on the felt (3.4–3.6), a red "!" alert above a guard (22.2–22.8), the 5 ring lights showing the result history,
  and the state board swapping between texture states with a spinning mini-wheel.
- **Screen tricks:** fly into or out of a monitor (render-to-texture), CCTV HUD with a frame-accurate timecode, a rewind icon with the timecode stepping back, a face-tracking box following the head,
  glitch glyphs swapping every ~3 frames.
- **Transitions:** 22 hard cuts, 2 cross-dissolves (5–7 frames), 1 dip to black (~4 frames black). There are no flashes and no B&W grade snaps (unlike ref A).
- **Post:** bloom, vignette, grain/noise, CCTV desaturation and scanlines. Some colour fringing on edges, which may be compression (unverified).

## Edit rules (observed)

1. **One stage of the ladder = one location or device.** Table (POV) → wheel macro → surveillance room → CCTV → bird's-eye crowd → office → handshake. The picture changes when the "who is watching you" changes.
2. **Cut and caption change together** (13 of 21 cuts within 0.1 s). Cuts fall on phrase starts after "," or ".", most often on connector words ("But as...", "However...", "Nonetheless...", "At this point...", "And thus...").
3. **Camera moves replace cuts between world and screen**: fly into a monitor to enter CCTV, pull out to leave (26.5, 30.1, 40.2), push down out of a CCTV angle into the table (55.5).
4. **Soft transitions are kept for changes of POV**: a dissolve from the table to the dome camera ("the eye in the sky", 23.6) and from the manager to the CCTV face ("let you continue", 59.3). The dip to black comes before the punchline (77.07).
5. **Every word with a visual gets a matching picture inside ~0.5 s**: "glasses" → glasses insert, "banned" → bouncers, "crushing it" → wheel, "the eye in the sky" → dome, "body language" → CCTV of you, "copying your bets" → other hands on red, "change the table's dealer" → dealer swap, "labeled" → stapler, "other games" → claw machine.
6. **Reprises** reuse whole set-ups: bird's-eye crowd (14 → 19) and the Cam 7 clip (13 → 18b). The POV table angle comes back 6 times with bigger chip stacks each time, so the stack works as a progress bar.
7. **Long takes (4–6 s) carried by in-take events**: board state changes about every 1.5 s, ring lights, rake, HUD timecode ticking. The longest static stretch without a camera or light event is about 4.8 s (CCTV shot 16, 50.7–55.5), filled by the dealer-swap action.
8. **The ending is a visual gag**, held 1.5 s after the last word, with no CTA and no question.

## Audio

- Voice: one narrator at **202 wpm**, second person, in a flat explanatory read (unverified by ear; inferred from the text and the steady RMS).
- **No silences at all** (audio.json). The 50 ms RMS floor is ~−30 dBFS (p5) between phrases, so a bed is present. Whether it is music, room tone or casino ambience is unverified (I could not listen).
  There are quieter windows (< −30 dB) at 74.0–75.8 and 77.0–77.6, i.e. around the last line and the dip to black: the mix breathes before the punchline.
- **Mastered quieter than ref A**: −17.6 LUFS integrated (A: −14.3), true peak −2.3 dBFS, LRA 3.0 LU. Stereo (A was mono).
- The loudest 50 ms windows (−10.8 to −12.3 dB) sit at 7.6–8.05, 10.0, 15.15, 27.55, 28.55 and 32.3. They line up with chip placements (7.6, 10.0), the rewind (28.55) and the cut to the wheel (32.3), which points to SFX
  (chips, whoosh) over the voice. Unverified by ear.

## Craft above the first creator (what G does that the myth creator in A–C does not), and how we build it

1. **First-person POV with your own hands** (9 setups, ~33 s). Shots 3, 4, 15, 20 and 22a: you put on the glasses (2.5–3.3), push chips, shake the guard's hand (72.2).
   *Build:* in `engine/three-kit.js`, add a `povRig`: a camera at 1.2 m seated eye height, parented to a "head" Object3D with Perlin head-bob (±0.5° / 0.3 Hz) and scripted
   look-at targets for head turns. Two arm meshes (sleeve + mitten hand; model in Blender, export glTF) on simple 2-bone IK toward keyframed targets (chip, glass, hand). Sleeve colour = the hero's costume.
2. **Macro prop inserts and top-down swoops**: wheel spin with ball (5, 8, 12), chip stacks, rake payout, a stapler.
   *Build:* model a 37-pocket wheel, chips and rake in Blender (bevels, lacquer roughness 0.2, felt roughness 0.9), export glTF. Animate the wheel rotation and the ball on a spiral path with an ease-out
   in code. Swoop camera = CatmullRom spline over the layout, 9–20 frames, with per-frame motion blur done by accumulating 4 sub-frames in `render.mjs`.
3. **Diegetic UI layers**: CCTV HUD with a live timecode, face-tracking box, glitch glyphs, rewind icon (10–13, 16, 18b), plus a 3D state board with a result-history ring row.
   *Build:* a 2D canvas overlay pass in `render.mjs` after the WebGL frame, driven by the frame number (timecode = start + frame/30, glyph swap every 3 frames, box = projected bounding box of the head).
   CCTV look = desaturate 0.4, cool LUT, noise + scanline shader, then the HUD. The board = a CanvasTexture on an emissive plane, with state changes keyed to narration words.
4. **Fly-into-the-screen transitions** (26.5–27.0 in; 30.1–30.7 and 40.2–40.6 out).
   *Build:* render the "CCTV scene" into a `WebGLRenderTarget` mapped onto a monitor mesh. Dolly the camera until the monitor fills the frame, then swap to rendering that scene full-frame on the frame where they match
   (the screen-space size of the monitor = 1.0). Reverse it for the pull-out.
5. **Practical, motivated light that tells the story**: chandeliers with bloom, dome LED that turns on at "locks onto you" (24.2), a foreground face dimmed so you look at the background manager (15.2–17.5), a spotlight cone in the bird's-eye.
   *Build:* PointLights + emissive bulb meshes + UnrealBloomPass (strength ~0.8, threshold 0.7). Light-intensity tracks keyed to words. SpotLight with a soft penumbra for the top-down. Vignette in the final pass (edge ≈ 0.4–0.6× centre).
6. **Real-world texture: closer, realistic faces.** ECU on the dealer (14.3) and the guard (72.5). This is the one we should *not* copy as is: real-person photo faces are a likeness/rights risk.
   *Our version:* our own stylized character heads (sculpted in Blender, or one consistent painted face set we own) with a few blend-shape expressions, so a head turn does not show a flat plane.
7. **More transition grammar**: dissolves (23.6, 59.3) and dip to black (77.07), on top of whips and swoops.
   *Build:* the `render.mjs` compositor blends two shot renders with alpha over N frames (dissolve), or ramps to black and back.
8. **State-progress props**: the chip stack grows from shot to shot (6, 9a, 15, 20) and your photo joins the suspects sheet (68.9). Viewers read the escalation without words.
   *Build:* a per-scene `progress` parameter that scales stack height and swaps the sheet texture.
9. **A visual punchline ending** (claw machine, 77.1–78.9) that shows the last line literally, plus a bookend (the same floor corner as frame 0).
   *Build:* plan the last shot as a literal picture of the final sentence, staged in the opening set.
10. **A bigger cast and a social layer**: a bird's-eye crowd of ~25 (14, 19), copycat hands (15), players collapsing (20).
    *Build:* instance one rigged body with colour variants and CMU mocap idles at random phases. Use one "collapse onto table" clip from the CMU set and retarget it.

## Weaknesses (seen, with evidence)

| Time | Issue | Evidence |
|---|---|---|
| 0.0–1.3 | The opening frame is a dark WS with a tiny hero, not an impossible close-up | Sheet 1: the hero is ~15 % of frame height, luma 50. The glasses (the hook object) only appear at 1.3 s |
| Whole video | Too dark for a phone | Mean luma 51. **19 % of frames below 30**. Shot 7 mid luma 16.8 for ~2.3 s, shot 9b 22–25, bird's-eye shots 28–34 |
| 15.2–17.5 | The dealer ECU goes nearly black for 2.3 s | Sheet 7 / strip s10_03: the foreground face is a dark mass and only the small pit manager is lit. Readable on desktop, murky on a phone |
| 14.3, 18.3–18.5 | Photo-face-on-box heads look flat and uncanny | Full frame 14.5: the face texture is printed on a wedge, "paper-bag" silhouette. At 18.4 the head turns and shows a blank plane + ear. No facial animation anywhere |
| Whole video | Uses real-looking people's photos as faces | Hero, dealer, guard, manager and mugshots are photographic faces (full frames 37.0, 72.5, sheet 21). Whose faces they are is unverified: a likeness/rights risk we must not repeat |
| 41.5–46.1 vs 60.9–63.8 | Reused set-up | The bird's-eye crowd shots 14 and 19 are the same scene (same figures, same BLACK! board), only the rotation direction differs |
| 36.5–41.5 vs 59.4–60.9 | Reused clip with a timecode continuity error | Shot 18b replays Cam 7 22:10:11:19–22:10:13:01, already shown in shot 13. In story time it should be later than 22:10:19 (shot 16) |
| Narration | Grammar errors on screen | "This is how fast it would take for you to get banned" (should be how long), "a crowd of people have gathered", "A few people even started" (tense), "Security fear" (OCR consistent across 50.7–51.6, so it is the source text) |
| Whole video | Narration is fast and captions are long and small | 266 words in 78.9 s = **202 wpm**. Chunks up to 7 words at ≈ 0.03 height. 0.5 s chunks ("The dealer", "ask you") |
| 0–7.4 | The superpower is never shown working | Apart from a 0.2 s yellow orb at 3.4–3.6 (unverified as a prediction), no shot shows the glasses predicting a number. The premise is told, not shown |
| 4.5 | "This is how fast..." promises a timer that never appears | No on-screen clock or counter of elapsed time in any strip. The video never says how fast it was |
| Story | No twist, no character arc, no stakes for the hero | A process ladder ending with a polite ban + joke. No personal cost, no named people, no reveal. Compare ref A's double reversal |
| 77.4–78.9 | The last 1.5 s has no caption and no CTA | Strip s10_15: the claw machine is held silent-text after "other games though." A loop is not verified |
| 34.03–34.70 | Long blurred swoop | 20 frames of blurred number layout (strip f30_i). That is long for a 0.67 s word gap and makes the layout unreadable |
| 6.70–6.93, 71.10–71.27 | POV whips through a body or arm | Dark foreground mass fills the frame for 4–5 frames (strips f30_a, f30_c). Fine as energy, but the frames are muddy |
| Whole video | Mastered quieter than the platform norm | −17.6 LUFS vs ~−14 for Shorts. It will play quieter than neighbouring videos |
| Whole video | Low delivered resolution | 360x640 at ~462 kb/s. The original upload resolution is unverified |
| 22.2–22.8 | The red "!" alert icon is tiny | At 360 px it is ~4x12 px above a guard's head (sheet 9). Easy to miss |
