# Reference D: "Is this cheating?" (Phil Ivey, edge sorting), frame-by-frame breakdown

Source analysed: `scratchpad/ref/D_is_this_cheating.mp4` (the downloaded copy: 360x640, 30 fps, H.264 ~567 kb/s,
AAC stereo 48 kHz 192 kb/s). Data: `scratchpad/ana/D_is_this_cheating/` (shots.json, per_frame.json, captions.json,
audio.json, 25 contact sheets). I opened all 25 contact sheets and the five 1-fps peek strips, then made my own
per-frame difference pass (`scratchpad/work/refD/cuts.py`: HSV histogram + 45x80 grey correlation + mean abs diff,
saved to `diff.json`) and 10–30 fps strips (`scratchpad/work/refD/strip.py`, files `s_a.jpg` … `s_r.jpg`) at every
point where a sheet showed a jump or the detector reported a cut I doubted.

This creator is the second channel doing the format. The same "explainer over 3D game engine" idea, but much more
polished: PBR-looking materials, practical lights with bloom, macro inserts, top-down POV, in-scene 3D text, 2D graphic
overlays, diegetic CCTV UI, and photo faces pasted onto 3D heads.

## Measured totals

| Item | Value | How it was measured |
|---|---|---|
| Duration | 90.50 s (2715 frames) | shots.json |
| Detector shots | 25 (avg 3.62 s) | shots.json |
| **Camera setups after checking** | **28** (mean 3.23 s, median 2.63 s, min 0.63 s, max 15.23 s) | 3 detector cuts are not cuts: 2.900 (grade snap to B&W, same framing), 21.400 (magnifier overlay dissolving in over 21.33–21.40), 62.900 (dealer's hand wiping across the lens in one take). I found 7 hidden cuts: 52.833, 53.467, 54.267, 54.967, 55.600, 56.267 (jump-cut time-lapse) and ~75.467 (push into a CCTV monitor that becomes the full frame) |
| Shot-length histogram | ≤1 s: 7, 1–2 s: 6, 2–3 s: 3, 3–5 s: 8, >5 s: 4 | corrected list. Bimodal: long flying takes plus one burst of 0.63–0.8 s jump cuts |
| Picture changes (cuts + in-take reveals) | ~60, about one every 1.5 s | In-take reveals counted from the strips (tilts to a new subject, face swaps, props flying in, overlays, pose changes). Example: the 15.2 s opening take has 11 of them |
| Narration | **288 words, 79 caption chunks** | cleaned OCR, checked against frames |
| Words per minute | **191 wpm** over 90.5 s (192 wpm without the 0.33 s silence) | words / duration |
| Words per caption | mean 3.65, from 1 ("process", "for", "Mhm...") to 7 ("But how do you even use it") | cleaned chunks |
| Caption on-screen time | mean 1.15 s, shortest ~0.5 s ("process" 16.3–16.8), longest ~2.4 s ("nearly $22 million" 68.5–70.9) | chunk starts in captions.json |
| Loudness | −14.2 LUFS integrated, LRA 2.1 LU, true peak −1.8 dBFS | audio.json (EBU R128) |
| Silence | one gap only: 3.36–3.69 s (0.33 s, down to −73 dB RMS) | audio.json + my 50 ms RMS pass |
| Audio floor between phrases | ~−32 dBFS (5th percentile −32.2 dB, median −18.7, p95 −12.1). Dips to −40/−45 dB at 27.9, 29.5, 30.1, 30.6 | my 50 ms RMS pass over the extracted audio |
| Picture brightness | Mostly dark: luma_mid 29–99, median ~67. Brightest: the overhead felt insert (shot 23, 94–99) and the showroom (115 at 2.9 s). Darkest: surveillance room (21–28) and the final WS (27–29) | shots.json light_mid |
| Loop | Last frame (90.47) ≈ first frame (0.00): same WS of Ivey at the poker table, same chandelier and TV. 45x80 grey correlation 0.73 | `scratchpad/work/refD/firstlast.jpg` |

**Hidden or mislabelled transitions I checked frame by frame.**

- **One 15.2 s opening take (0.000–15.233) built from in-camera transitions, with no cut** (`s_a`, `s_b`, `s_c`, `s_d`, `s_e`, `s_g`, `s_h`):
  push-in from WS onto two cards → **grade snaps to B&W at 2.900** (sat 213 → 21, same framing) → 0.33 s of silence →
  **6-frame tilt/crane up** (3.33–3.53) to Ivey's MCU, with colour returning mid-move at 3.47 → **face texture swaps from neutral to smirk at
  5.10** → **12-frame tilt down** (5.70–6.10) back to the cards → push into a macro of one card edge (6.3–7.2) → **the background
  dissolves green felt → blue under the card at 8.27–8.37** while the card stays → **pull-out** (8.43–9.3) reveals Ivey standing in a
  new room holding that card → slow push. Props pop in, and a card box is thrown into his hand (13.6–13.8).
- **21.400 is not a cut:** two magnifier-oval overlays fade in over 3 frames (21.33–21.40, `s_j`). Same camera.
- **62.900 is not a cut:** the dealer's huge hand slides the top card out of the shoe, filling 60 % of the frame for 10 frames (62.90–63.23, `s_p`). The label then changes from "ROTATED" to a red edge bar with no camera change.
- **Pose snaps inside a locked frame, not cuts:** 31.1→31.2 (praying hands → shrug) and 32.5→32.7 (shrug → cap tip). The chandelier stays fixed in frame
  (`s_l`). My diff shows only md 11.9 at 32.6, against 45–70 at real cuts.
- **Jump-cut time-lapse (real cuts):** 52.833, 53.467, 54.267, 54.967, 55.600, 56.267 (`s_n`). Each cut brings a new deal and a camera that is higher or rotated a step. The
  detector merged them into shots 17 and 18.
- **Push through a screen (~75.467):** the camera trucks along the monitor wall and accelerates into one screen (75.13–75.47, md 26–37 over 12 frames).
  The screen picture becomes the full frame with a "Cam 7" timecode overlay (`s_q`). I count it as a new setup.
- **Short cross-dissolve at 76.533** (2–3 frames): CCTV frame → courtroom. At 76.53 a ghost of "Cam 7 22:10:12:13" sits over the bald man's face.
- **The courtroom is one 8.9 s flight (76.533–85.467), not several shots** (`s_r`): CU of a man holding his face → pull-out and truck right past the
  prosecutor → pan to the defence lawyer → fast push-in (80.2–81.4) to his MCU holding a sign.

## Clean narration (288 words)

> Can you tell the difference between these two cards? Well, you can't, but this guy can. And he's about to win
> millions just because of this tiny printing mistake. It's undetectable to the average eye, but Phil Ivey
> accidentally noticed that one brand of cards has this fatal flaw. During the production process of cutting these
> cards, the cuts were not perfectly aligned, making the ends of the pattern slightly different on both edges. But how
> do you even get the dealer to use that specific brand of cards? Well, Phil told the dealer that he wanted that one
> deck because it brought him good luck... And since Ivey was a high roller, the dealer agreed. But how do you even use
> it to your advantage? Well, after each play, the gambler asked the dealer to rotate the high value cards 180 degrees,
> and when he asked why, Ivey played dumb again and said it's because of his superstition. The dealer was confused, but
> had no idea how this could benefit the player, so he complied. Repeat that many times till you've gone through the
> entire deck, and now all the cards are sorted! Hence the name: Edge sorting. Now Ivey could distinguish the best cards
> before they were revealed. This gave him a 5% advantage in baccarat, and that was just enough for him to win nearly
> $22 million over a few months. However, after the casinos checked the tapes and realized what he had done, two
> casinos sued him and he was forced to give back all that money for "failing to provide the casino with a fair gaming
> experience." Mhm... So is this actually cheating, or was he just punished for having really good vision?

OCR fixes:
- **"so he complied."** (~50.9–52.1) is missing from captions.json. I read it on sheet 16 (50.93–51.90).
- "lvey/ivey" → Ivey. "S22 / s22" → $22.
- Lines 13.8–15.3, 25.2–29.2, 37.4–39.9, 50.5–58.7 and 64.5–72.1 are mixed with in-scene text. That text is not narration: the box names, the PLAYER/BANKER felt print, the "EDGE SORTING" title, "~$22,000,000", "High/Low value", "ROTATED / NOT ROTATED", "Cam 7" timecodes, and the lawyer's sign.
- "sorted!" against "sorted.": OCR reads both. I keep "!" (the majority of reads).

**The voice is mostly third person**, unlike the "You're Baldr" format of the first creator. "You" appears only in the hook challenge ("Can you
tell…? Well, you can't"), the rhetorical questions ("how do you even…"), one instruction ("Repeat that many times till you've gone…") and the
final question to the viewer.

## Look of the world (applies to every shot)

- **Characters:** stock-proportioned game humanoids (Mixamo-like rigs, low-poly hands with mitten fingers) with **photographic face textures** on
  the front of the head.
  - **Ivey:** a black flat cap and black zip jacket. Uses at least 4 different face photos: neutral, smirk (5.10), light-lit (29.2–30.0), darker (30.1–31.1), and a grinning one with closed eyes on the cap-tip.
  - **Dealer:** red waistcoat, white shirt, red bow tie. Has neutral, smiling and frowning photos (47.57).
  - **Prosecutor:** bald, blue suit.
  - **Defence lawyer:** black suit. His face is the most photoreal, with stubble and skin pores at 81.2 (strip `s_r`).
  - Faces are swapped to "act" (expression changes). Who the photos show is unverified. They look like a real-person likeness for Ivey.
- **World:** a casino built from game-asset-store pieces. Baccarat and poker tables with printed felt (PLAYER / BANKER / 1 / 2), chip racks, slot
  machines with lit screens, brass chandeliers, palm plants, a bar with bottles and a roulette wheel on the wall. There is also a dark surveillance room with a
  monitor wall, a wood-panelled UK-style courtroom (Union flag), a card factory (conveyor rollers, red rails, cutter bars, carbon-fibre floor),
  and a blue "showroom" void with spotlight cones and metal railings.
- **Props are the stars:** card backs with a red diamond lattice (a proper texture in macro: hearts, clubs and diamonds visible at 7.3 s), card faces (A♠, K♥,
  7♠, 2♦), chips with edge stripes, a card shuffler with a rotating drum and "OUT" labels, and three joke card boxes ("LUCKY LOADED DICE CARDS",
  "LOSE YOUR SAVINGS CARDS", "GAMBLE GAMBLE GAMBLE CARDS").
- **Post:**
  - Bloom on practicals (chandeliers, monitors).
  - A strong vignette. Shot 25 centre 46 vs edge 18. Shot 9 first frame 114 vs 60.
  - Mild film grain or noise in dark shots, unverified at this bitrate.
  - Per-scene colour grades: B&W punctuation at 2.9, cyan noisy CCTV at 75.5, a warm amber courtroom (warmth +51…+53).
- **Captions:** burned-in, small, white (see Caption spec). **No other on-screen branding**: no watermark, logo or CTA was seen in any sheet.

## Shot table (all 28 camera setups; detector numbers kept, a/b = my splits, + = merged)

Abbreviations: ECU/CU/MCU/MS/WS/EWS, OTS, POV, top-down (90°). Lens values are estimates of vertical FOV and are marked "est.".
Movement numbers come from shots.json: dx/dy in px, scale = zoom factor over the shot, flow = mean px/frame (first half → second half shows the easing).
For the long takes, the row lists the beats inside the take.

| # | Time (s) | Size | Angle / height | Lens (est.) / DOF | Camera move (verified) | Subject and animation | Light | On-screen text (caption + overlay) | Why the cut lands here |
|---|---|---|---|---|---|---|---|---|---|
| 1+2 | 0.000–15.233 | WS → insert → MCU → insert → ECU macro → MS → MCU | Eye level seated (~1.2 m), ~25° down on the table; macro at ~10 cm | normal ~45° in WS. Macro reads ~25–30° with the background falling to soft green. No visible DOF blur in WS | **One take, 11 beats.** (a) 0–0.9 fast push-in from WS onto the two cards (scale ×3 across shot 1, flow 7.6→0.73, hard ease-out). (b) 0.9–2.9 slow creep. (c) **2.900 grade → B&W**. (d) **3.33–3.53 6-frame tilt/crane up** to Ivey. (e) 3.5–5.7 slow push on Ivey. (f) **5.70–6.10 tilt down**. (g) 6.3–7.2 push to the card-edge macro, ease-out. (h) 7.2–8.4 slow drift along the edge. (i) **8.27–8.37 background dissolves green → blue**. (j) 8.43–9.3 pull-out, ease-out. (k) 9.3–15.2 slow push MS → MCU with a small whip at 13.6–13.8 | Ivey sits behind chips (red and blue stacks), hands resting. **Face swap neutral → smirk at 5.10.** Standing in the showroom, he holds a red card back and an A♠, then K♥+A♠ (11.6), then two backs (12.2). The props change between holds (keyframed swaps). **A card box flies in from the lower right and snaps into his hand (13.6–13.8)**, and he slides a card into it | WS: VIP-lounge preset (chandelier, TV on the back wall, slot machines, luma 52, centre 41). Felt inserts: top-lit green, luma 88–91, warm +45. B&W at 2.9 (sat 21, luma 115). Ivey MCU: black void, TV backlight, blue rim. Showroom: cool blue (warmth −15), spotlight cones from above, white floor, luma 71–74 | Can you tell the difference / between these two cards? / Well, you can't, / but this guy can / And he's about / to win millions / just because of this tiny / printing mistake / It's undetectable / to the average eye / but Phil Ivey / accidentally noticed / that one brand of cards / has this fatal flaw. In-scene: "LUCKY LOADED DICE CARDS" box (13.6–15.2) | Hard cut on the full stop "flaw." (15.233), right before "During the production" (15.3) |
| 3+4 | 15.233–23.133 | Top-down insert → 45° insert | **90° overhead**, then tilts to ~45° | normal; hard shadows from the cutter bars | **Top-down follow:** the camera travels with the card sheet down a roller conveyor (dy −982 = scene moving up, scale ×3.6 as it nears the floor, flow ~5.4 constant). **Tilt from 90° to ~45° over 20.6–21.2**, then **locked** 21.2–23.1 (scale 1.012, flow 0.11) | A printed sheet slides along the conveyor. **Black cutter bars sweep diagonally across the frame (an X) and slice it**: 1 sheet → 4 strips (17.2) → 4x3 grid (18.2) → 12 cards with gaps (19.6). At 21.33 two **blue 2D magnifier ovals with handles** fade in over the left and right card ends. The edge stripes inside then **flash blue/white (22.1–23.1)** to show the uneven border | Factory preset: dark grey with red-orange rails (warmth +17…+33), an overhead softbox, carbon-fibre floor, luma 77–94, centre 96–161. Overlay ovals are flat bright blue (no scene light) | During the production / process / of cutting these cards, / the cuts were not / perfectly aligned, / making the ends / of the pattern / slightly different / on both edges. Overlay: magnifier ovals + highlighted edge stripes | Cut after "edges." on the new question "But how do you even" (23.2) |
| 5 | 23.133–26.567 | WS → MS insert | Starts high at chandelier height (~3 m), cranes down to table height (~1.1 m) | normal ~45°; background slightly soft | **Crane down + push-in + arc right**, over the shoulder of a dark foreground figure (Ivey's back, frame-right). Passes the dealer and lands on the three card boxes. Scale ×4.36, dy −499, flow 3.96→3.12. The dealer's arm sweeps through at 24.9–25.2 | The dealer stands behind the baccarat table and gestures. The joke boxes stand on a little rack | VIP lounge: brass chandelier in the top of frame with bloom, slots and the bar behind, warm key on the dealer. Luma 35→73 as it descends onto the felt | But how do you even / get the dealer / to use that specific / brand of cards? In-scene: LUCKY LOADED DICE / LOSE YOUR SAVINGS / GAMBLE GAMBLE GAMBLE boxes | Lands on the boxes on "brand of cards?". Cut on "Well, Phil" (26.5) |
| 6 | 26.567–27.900 | MCU (seated, chest up) | Slightly low, ~1.0 m | normal; black background | **Locked** (scale 0.996, flow 0.00) | Ivey leans in and talks with his hands (gesture clip). Light-skinned face photo | **Ivey portrait preset:** black void, a blue-cyan hanging lamp practical at upper left, blue backlight on palm fronds, warm key from frame-right, chips in the foreground. Luma 38, centre 37 / edge 27 | Well, Phil told the dealer | Mid-sentence cut on "dealer" to the object of the request |
| 7 | 27.900–29.200 | MS insert (props) | Table height, ~0.9 m | normal | **Locked** (all motion values 0) | The three boxes. **A big white low-poly hand (the dealer's? or Ivey's?) enters from the top and points at / taps the red "Loaded Dice" box** | Bar background (roulette wheel, bottles, bartender), warm, luma 73, warmth +35 | that he wanted / that one deck | On "that one deck" the hand picks the deck. The cut follows "deck" |
| 8 | 29.200–33.467 | MCU | Slightly low | normal | **Near-locked micro push** (scale 1.17, flow 0.13→1.16, ease-in) | Ivey's praying-hands "please" pose. **Face photo changes between 29.5–30.0 (light) and 30.1–31.1 (darker)**. **Pose snap to a shrug at 31.2** ("good luck..."), then **cap-tip at 32.6** with a grinning face ("And since Ivey"). Clip blends of ≤3 frames | Ivey portrait preset (luma 32–37, centre 33–40, edge 16–28) | because it brought him / good luck... / And since Ivey / was a high roller, | Cut to the dealer on "high roller," → his reaction is the payoff |
| 9 | 33.467–35.433 | MCU → MS | Eye level | normal | **Pull-out + pan left** (scale 0.60, dx +294), accelerating (1.9→6.4) | The dealer smiles, then grabs the Loaded Dice box and holds it up (35.1) | Dealer preset: warm chandelier at top, cyan slot machines and palms behind out of focus, luma 66, centre 114–125 | the dealer agreed. | Full stop "agreed." |
| 10 | 35.433–37.400 | EWS | **High angle ~45°, ~8 m** | normal ~50° | **Slow push + arc** (scale 1.14, dx −94; the roll −10.8° comes from the arc) | The whole casino floor: the baccarat table with dealer and Ivey, other tables, green lamp shades. Background players are idle | Purple-violet carpet, green-shade pool lamps, luma 40–47, vignette | But how do you even use it / to your advantage? | On "?" |
| 11 | 37.400–39.900 | Top-down insert / POV | **Overhead, ~90°, ~2 m, from the player's side** | normal | **Locked** (flow 0.00) | **POV over the table:** the dealer's head and shoulders at the top, his white sleeves deal cards into the PLAYER/BANKER boxes. Ivey's hand (dark sleeve) enters from the lower right and pushes chips (38.8–39.9) | **Overhead baccarat preset:** green felt, a red-to-orange gradient wall at the top, deep blue corners. Luma 70–73, sat ~172 | Well, after each play, / the gambler / asked the dealer. In-scene felt print PLAYER / BANKER / 2 / 1 | On "to rotate" (39.9). The cut and the caption change land on the same frame |
| 12 | 39.900–42.933 | MCU | Slightly low | normal | **Locked** (flow 0.11) | Ivey holds up a card and turns it. **Two blue 2D curved arrows draw in around the card (41.17–42.5)** to show the 180° turn | Ivey portrait preset, luma 36–41 | to rotate the high value cards / 180 degrees. Overlay: blue circular rotate arrows | On "and when he asked why" → the dealer |
| 13 | 42.933–43.933 | MS | Eye level, OTS from behind Ivey's shoulder (dark foreground lower right) | normal | **Locked** | The dealer opens his arms in a "why?" gesture, puzzled face photo | Dealer preset, luma 51, centre 100 | and when he asked why | On "Ivey played dumb" back to Ivey |
| 14 | 43.933–47.567 | MCU | Slightly low | normal | **Near-locked** (scale 1.036) | Ivey shows a card (43.9), leans forward (44.4), then a "who, me?" shrug (45.5), then scratches the back of his head, with a different smug face photo (46.0–47.5) | Ivey portrait preset, luma 38–39 | Ivey played dumb again / and said it's / because of his superstition. | On "The dealer was confused" |
| 15 | 47.567–50.467 | CU → MCU | Eye level | normal | **Pull-out** (scale 0.68, ~1 px/f constant, linear) | The dealer, **frowning face photo** (47.6–49.2), then switches to a smiling one (49.6) | Dealer preset: chandelier at top centre, slots, palms. Luma 64–80, warm +39…+69 | The dealer was confused, / but had no idea how / this could benefit the player, | The cut leads "so he complied." by ~0.4 s |
| 16 | 50.467–52.200 | Top-down insert | Overhead ~80°, high | normal | **Slow push** (scale 1.09, flow 0.5→0.17, ease-out) | The dealer's hand turns a card on the PLAYER box (complying) | Overhead baccarat preset, luma 73–79 | so he complied. | On "Repeat" |
| 17a | 52.200–52.833 | Insert | Low, ~40° to the felt, Dutch tilt | normal | Static with a slight drift | Cards dealt: 2♦ 3♦ / A♠ | Overhead preset, close | Repeat that many times | **Jump cut 1** (time-lapse) |
| 17b | 52.833–53.467 | Insert | Same angle | normal | Static | A new deal; the dealer's arm crosses | Same | Repeat that many times | **Jump cut 2** |
| 17c | 53.467–54.267 | MS overhead | Higher, the dealer's chest in frame | normal | Static | A new deal; hands rest on the chip rack | Same | till you've gone | **Jump cut 3** (camera higher) |
| 18a | 54.267–54.967 | Top-down MS | ~80° overhead, higher still | normal | Static | A new deal; the dealer bends over the rack | Gradient wall now orange/red at the top | through the entire deck | **Jump cut 4** |
| 18b | 54.967–55.600 | Top-down WS | Higher, table edge visible | normal | Static | A new deal; Ivey's hand at lower right | Same | through the entire deck / and now | **Jump cut 5** |
| 18c | 55.600–56.267 | Top-down WS | Rotated a step; the dealer faces the camera | normal | Static | The dealer stands upright | Same | and now | **Jump cut 6** |
| 18d | 56.267–59.533 | Top-down WS | ~85° overhead, highest (~3 m) | normal | **Slow yaw orbit + pull-out** (the table rotates ~30° in frame between 56.3 and 59.5; roll value 29°, scale 0.55, flow 0.77→0.54) | The dealer reaches over the sorted cards, Ivey's hands lower right. **"EDGE SORTING" title pops in at 58.7** (blue "EDGE" + white "SORTING", bold condensed, black outline/shadow, ~0.12 of the height, top third) | Overhead preset with chevron-pattern orange wall. Luma 50–67 | all the cards are sorted! / Hence the name / Edge sorting. Overlay: EDGE SORTING title | The title lands on the spoken name. Cut on "Now Ivey" |
| 19+20 | 59.533–64.500 | MS insert → ECU macro | Table height, ~30° down | normal → macro ~30°, background soft | **Slow push (59.5–61.2), then a 10-frame fast push-in (61.27–61.6)** to the OUT slot, then a hold (flow 1.47→6.71 in shot 19; 2.2→0 in shot 20) | **A card shuffler** spins its drum, and cards fan out and stack in the OUT slot. On "revealed" **the dealer's giant hand slides the top card out across the lens (62.90–63.23)**, revealing the next card | Purple casino-floor blues behind (warmth −23), the machine lit warm from the front. ECU: black machine + bright card, luma 42–70, centre 102–151 | Now Ivey could distinguish / the best cards before / they were revealed. / This gave him. **3D text lying on the card plane:** green extruded "ROTATED" with a green edge bar (62.2–63.0), then a **red bar wipes in left→right on the new card's edge** (63.3–63.5) and red "NOT ROTATED" (63.5–64.5) | On "a 5% advantage" (64.3) |
| 21 | 64.500–67.267 | Top-down ECU insert | 90° overhead, low (~0.5 m) | normal | **Locked** | Two cards face down: the left with a green edge bar labelled "High value" (green), the right with a red bar labelled "Low value" (red). **The dealer's hand flips them: 7♠ (high) and 2♦ (low)** | Brightest shot: green felt, luma 94–99, centre 122–143 | a 5% advantage in baccarat, / and that was just enough. Overlay: High value / Low value 2D labels with coloured bars | On "for him to win" → the money |
| 22 | 67.267–72.067 | High WS | **High angle ~60°**, ~3 m | normal | **Slow orbit** around Ivey (roll −28° across the shot, scale 0.80, flow 0.83→0.72, linear) | Ivey sits with arms crossed (smug), the dealer pushes cards. **Chip towers grow beside him (68.7–69.3)**. **Green "~$22,000,000" text with a black outline pops in at 69.0** and floats beside the stacks (69.0–70.5) | Purple/violet carpet, cool fill (warmth −10…−12), green felt, luma 57–61 | for him to win / nearly $22 million / over a few months. Overlay: ~$22,000,000 | Cut on "However," (72.1), the turn of the story |
| 23a | 72.067–75.467 | MS → push into a screen | Eye level, ~1.6 m | normal ~50° | **Slow truck left along the monitor wall + push, accelerating into one monitor** (flow 1.22→5.71, scale ×3.66) | Security staff: a red-waistcoat man holding his head (despair), suited guards with arms crossed, all static or looped idles | **Surveillance-room preset:** near black, a row of round white ceiling downlights, a wall of glowing CCTV monitors as the key, blue spill. Luma 21–46, warmth −12…−19 | However, after the casinos / checked the tapes / and realized | The monitor fills the frame on "what he had done," |
| 23b | 75.467–76.533 | WS (CCTV view) | High-corner security-camera angle | wide ~60° | **Locked** (diegetic CCTV) | Inside the monitor: Ivey at the table with the dealer, playing; a woman in red in the foreground | **CCTV grade:** cyan-blue cast, noise, slight softness | what he had done, / two casinos sued him. **UI: "Cam 7" + running timecode "22:10:11:11 … 22:10:12:13"** (advancing every frame) | 2–3-frame cross-dissolve to court on "two casinos sued him" |
| 24 | 76.533–85.467 | CU → WS → MS → MCU | Eye level, seated → standing | normal; the background soft in the final MCU | **One flight:** CU of a man with his face in his hand (76.5–77.2) → **pull-out and truck right** across the courtroom past the prosecutor (77.2–78.6) → **pan to the defence lawyer** (78.6–79.0) → **hold** (79–80.2) → **fast push-in to MCU** (80.2–81.4) → hold (81.4–85.5). Scale 1.28, dx −426, flow 4.34→0.78 | A man (bald, dark suit, face photo) slumps, head in hand. The prosecutor (bald, blue suit) gestures. The lawyer puts down papers, then **holds up a white paper sign whose words write on in sync with the quote** ("Failing / to provide / the casino / with a FAIR / gaming / experience"). **Photoreal stubble face** | **Courtroom preset:** warm wood panelling, gold ceiling light, a bright window at the right edge, Union flag. Warm grade (warmth +51…+53), luma 27→91 as the camera enters the light, contrast 70–76 | two casinos sued him / and he was forced / to give back all that money / for / **"Failing to provide the casino / with a fair gaming experience"** (italic) / Mhm... In-scene: the handwritten-serif sign | Cut on "So is this" (85.6) to the question shot |
| 25 | 85.467–90.500 | WS → (loops to) WS | Eye level seated, ~1.4 m, ~20° down | normal ~45° | **Slow push-in** (scale 1.27, flow 0.48→1.05, ease-in), ending on the exact framing of frame 0 | Ivey (cap, face hidden in shadow) sits at the poker table with chips, two cards in front of him. Other players idle. The dealer stands at the back right | **VIP-lounge preset:** big TV top centre, brass chandelier with bloom, navy walls, slot machines either side, green felt with an orange rim light. Luma 27–52, centre 42–49, edge 18–38 | Mhm... / So is this / actually cheating / or was he just punished / for having / really good vision? | The video ends on "vision?" and **loops seamlessly into 0.0** "Can you tell the difference" |

## Story structure with timestamps

| Beat | Time (s) | What happens |
|---|---|---|
| Hook (challenge to the viewer) | 0.0–3.6 | "Can you tell the difference between these two cards? Well, you can't" + B&W snap + 0.33 s silence. A direct test aimed at the viewer |
| Hero + stakes | 3.6–8.4 | "but this guy can... about to win millions... this tiny printing mistake". Smirk face swap on "millions", macro on the edge |
| Mechanism (the flaw) | 8.4–23.1 | Who (Phil Ivey) + why (factory cutting misalignment), shown as a top-down factory animation, then magnifier ovals on both edges |
| Obstacle 1 → trick | 23.1–35.4 | "How do you even get the dealer to use that brand?" → "it brought him good luck" → "the dealer agreed" |
| Obstacle 2 → trick | 35.4–52.2 | "How do you even use it?" → rotate the high cards → "superstition" → "the dealer was confused... so he complied" |
| Process + name drop | 52.2–59.5 | Jump-cut time-lapse "Repeat that many times..." → "Hence the name: Edge sorting" (3D title) |
| Payoff | 59.5–72.1 | He can see the best cards → 5% advantage → "nearly $22 million over a few months" (chip towers + money text) |
| Reversal | 72.1–85.5 | Tapes → sued → gave the money back for "failing to provide... a fair gaming experience" → sarcastic "Mhm..." |
| Ending question + loop | 85.5–90.5 | "So is this actually cheating, or was he just punished for having really good vision?" The last frame matches the first frame, and the last line ("good vision") feeds the first ("Can you tell the difference") |

The pattern is **question → answer → new question** ("But how do you even...?" appears twice, at 23.2 and 35.2). Each "how?" opens a mini-heist step, and the
"Well, ..." answer closes it. The end question is a moral debate (comment bait), not a twist.

## Camera statistics (28 setups, verified against the pictures)

- **Long flying takes with in-camera transitions: 6** (1+2, 3+4, 5, 19+20, 23a, 24). Together they cover 51.2 s of the 90.5 s (57 %). They mix
  push, tilt, crane and truck, with fast 6–12-frame moves (3.33–3.53 tilt up, 5.70–6.10 tilt down, 61.27–61.6 push, 80.2–81.4 push) between slow holds.
  Fast moves always ease out into a hold (shot 1 flow 7.6→0.73; shot 20 2.2→0).
- **Locked off: 8** (6, 7, 11, 12, 13, 21, 23b, and 17a–18c as near-static). These are reserved for the dialogue / reaction exchange between Ivey and the dealer
  (26.6–50.5) and for the explanatory inserts.
- **Slow push-in: 5** (8 ×1.17, 14 ×1.036, 16 ×1.09, 25 ×1.27, 10 ×1.14 + arc). It is slower than ref A: 0.1–1.1 px/f at 360p.
- **Pull-out: 2** (9 ×0.60 with a pan, 15 ×0.68).
- **Orbit: 2** (18d top-down yaw ~30°, 22 high-angle ~28°).
- **Jump-cut ladder: 6 cuts in 4.07 s** (52.2–56.27). Each cut is a new deal and a higher or rotated camera.
- **Shot sizes (by beat):**
  - Inserts and macros of props are the largest group: ~17 beats (cards, box, factory, felt, shuffler, High/Low cards, CCTV).
  - MCU/CU of faces: 9 (Ivey ×5, dealer ×3, lawyer ×1).
  - WS/EWS: 6 (opening/closing WS, casino floor, orbit, surveillance room, courtroom).
- **Angles:**
  - **Top-down or near top-down: 10 setups** (3+4, 11, 16, 17a–18d, 21). This is this creator's signature "table view".
  - Slightly low for Ivey's MCUs (power and smugness).
  - High for overviews (10, 22).
  - A diegetic security-cam angle (23b).
- **Lens:** a normal ~45–50° vertical FOV (est.) for most shots, with no visible zoom (parallax 0.3–2.9 shows dolly moves). Macros (cards, shuffler) show a softened
  background, so a narrower FOV or DOF was likely used (unverified at 360p). The lawyer MCU (81–85) has a soft background.

## Lighting presets (recipes to rebuild)

1. **VIP lounge night** (shots 1 WS, 5, 25). Navy walls, a big wall TV as a cool emissive, brass chandeliers with warm bulb emissives and bloom, slot
   machines as cyan/blue emissive screens left and right, a top light on the green felt with an orange-wood rim. The edges fall to near black.
   Measured: luma 27–52, centre 41–49 vs edge 18–38, sat 155–204.
2. **Ivey portrait** (6, 8, 12, 14). Black background, one blue-cyan hanging lamp practical in the top-left as the visible source, a blue backlight on palm
   fronds lower left, a warm key from frame-right on the face and hands, the chip stacks as foreground colour. Luma 32–41, warmth +11…+15, centre 33–56 vs
   edge 16–28.
3. **Dealer portrait** (9, 13, 15). The chandelier directly above his head in frame (warm bloom), slot machines and palms soft behind, frontal warm key.
   Luma 51–80, warmth +14…+69.
4. **Overhead baccarat** (11, 16–18). Green felt lit flat from above, a red→orange gradient wall with a chevron pattern at the top of frame, deep blue
   corners. Orange/blue complementary split. Luma 50–86, sat 158–197, warmth +14…+69.
5. **Felt insert** (1b, 21). Bright, flat top light on green felt and white cards. Luma 88–99, the brightest look in the video.
6. **Factory top-down** (3+4). Dark grey and carbon-fibre floor, saturated red-orange rails, an overhead softbox, cutter bars throwing hard shadows. Luma 77–94.
7. **Showroom void** (1j–1k). Cool blue walls, visible spotlight cones from above (volumetric look), a white tiled floor, steel railings. Luma 71–74,
   warmth −15. Used for "presenter" beats.
8. **Casino floor high angle** (10, 19, 22). Violet-purple carpet, blue ambient, green pool-lamp shades, warmth −10…−23.
9. **Surveillance room** (23a). Near black, a row of round white downlights in perspective, a monitor wall as the key light. Luma 21–46, warmth −12…−19.
10. **CCTV grade** (23b). Cyan tint, noise, softness, plus a white "Cam 7" label and a running HH:MM:SS:FF timecode.
11. **Courtroom amber** (24). Wood panelling, a gold ceiling, a bright window edge, strong warm grade (warmth +51…+53), contrast std 70–76.
12. **Grade punctuation:** instant B&W (sat 21) for 0.57 s on "Well, you can't," (2.90–3.47), colour back during the whip.

## Caption spec

- White, sentence case, a bold geometric/grotesque sans (Montserrat/Poppins-Bold look; exact font unverified) with a **thin dark outline plus a soft drop
  shadow** (zoom `scratchpad/work/refD/caps.png`). No box.
- **Quoted speech is set in bold italic with quote marks** ("Failing to provide the casino / with a fair gaming experience", 81.1–84.9).
- **Small:** text-line height ≈ 0.023–0.036 of frame height (OCR, ≈ 15–23 px at 640). One line, centred, max width ≈ 0.6 of frame.
- **Position:** y ≈ **0.72** of height (OCR y_frac 0.718–0.721) for almost all chunks. The exception is **0.76 during 59.6–63.5** (shuffler macro),
  where it was moved down, probably to clear the card. The 0.76 values are measured.
- 1–7 words per chunk (mean 3.65). Phrase breaks keep the punctuation, including "..." on pauses ("good luck...", "Mhm...").
- No word highlight, no colour words in the caption itself. Colour emphasis lives in the **scene graphics** instead (EDGE SORTING, ROTATED, ~$22,000,000).
  A hard on/off per chunk.

## Animation and VFX

- **Characters:** stock humanoid clips: idle, talk gestures, praying hands, shrug, cap tip, head scratch, arms crossed, despair (hands to head), dealing,
  card flip, sliding a card from the shoe, holding a sign. Clips change with fast blends (≤3 frames, e.g. 31.1→31.2), which reads as a snap.
- **Face acting by photo swap:** neutral → smirk (Ivey 5.10), light → dark versions (29.5 / 30.1), puzzled / frowning / smiling dealer (43.0, 47.6, 49.6).
  There is no lip sync. The face is a flat texture on the head front.
- **Prop animation:**
  - The card box flies into his hand (13.6–13.8).
  - The cutter bars slice a sheet into a grid (15.2–19.6).
  - The shuffler drum spins and cards fan out (59.5–61.3).
  - The dealer's hand slides a card out of the shoe (62.9–63.2) and flips cards (65.3–66.0).
  - Chip towers grow (68.7–69.3).
  - The sign's text writes on word by word (81.2–84.9).
- **In-scene 3D text** with extrusion and outline: "ROTATED" (green), "NOT ROTATED" (red) lying on the card plane. "~$22,000,000" (green, black outline)
  floating. "EDGE SORTING" (blue + white, bold condensed) as a screen-aligned title.
- **2D overlays:** blue magnifier ovals with handles (3-frame fade-in at 21.33), edge highlights flashing blue/white, blue circular rotate arrows that draw
  in (41.17–42.5), coloured edge bars wiping in left→right (63.3–63.5), "High value / Low value" labels.
- **Transitions:**
  - The background dissolve under a held macro (8.27–8.37).
  - The push through a monitor into the CCTV frame (75.13–75.47).
  - A 2–3-frame cross-dissolve (76.53).
  - The hand wipe (62.9–63.2).
  - Fast tilts as whips (3.33, 5.70).
  - The seamless loop at the end.
- **Post:** bloom, vignette, per-scene grades (B&W, CCTV cyan + noise, amber courtroom).

## Edit rules (observed)

1. **The cut follows the grammatical subject.** When the sentence names the dealer, we cut to the dealer (33.467 "was a high roller, the dealer
   agreed", 42.933 "when he asked why", 47.567 "The dealer was confused"). When it names Ivey, we cut to Ivey (39.9, 43.933). The objects get inserts
   (27.9 "that one deck", 64.5 "5% advantage").
2. **Cuts sit on phrase starts, within ±0.25 s** (37.4, 39.9, 72.067 and 76.533 are on the same frame as the caption change; 35.433, 42.933 and 47.567 lag by 0.2–0.27 s). One outlier: 67.267 lags "and that was just enough" by 0.67 s.
3. **Explain inside one take.** Explanatory chains (flaw → factory → magnifier; question → boxes) are told with camera flights and in-take reveals, not
   cuts. That is why there are only 28 setups but ~60 picture changes.
4. **The conversation is shot as locked shot / reverse shot** (26.6–50.5: Ivey MCU ↔ dealer MCU ↔ inserts), with face-photo swaps for reactions.
5. **Time-lapse = jump cuts with a rising camera** (6 cuts in 4.07 s, 52.2–56.27). Repetition is shown by rhythm, not by narration alone.
6. **Name drops get a title card in the scene** ("EDGE SORTING" exactly on the spoken name, 58.7). Numbers get 3D money text (69.0).
7. **Grade + silence as punctuation in the hook** (2.9–3.65): B&W and a 0.33 s silence on "Well, you can't," then a whip to the hero.
8. **Ending:** a slow push on the question, landing on the first frame, so the loop is seamless. No CTA.

## Audio

- **Voice:** one male narrator, fast (191 wpm), casual explainer tone ("Well, ...", "Mhm..."). The quoted lines get no visible change of voice
  (unverified by ear).
- **Bed:** continuous under the voice. RMS floor ~−32 dBFS between phrases, lower than ref A's ~−27. Dips to −40/−45 dB at 27.9 and 29.4–30.6 suggest
  ducking or a sparse bed. Whether it is music, and of what kind, is unverified: I could not listen.
- **One hard silence:** 3.36–3.69 s (−73 dB) under the B&W "you can't" beat.
- **Master:** −14.2 LUFS, LRA 2.1 LU, peak −1.8 dBFS. Stereo AAC 192 kb/s. SFX hits (box catch, chip stacks, hand slide) are not visible as peaks in the
  RMS (p95 −12.1 dB is speech level). Unverified by ear.

## Craft above the first creator (what D does better or differently than the myth creator A)

Each item: time and evidence in D → what A did → how we build it with our tools (Three.js renderer in `aitrends-2d-studio`, Blender 4.0.2 headless, CMU BVH mocap,
glTF assets, ffmpeg).

1. **The oner with invisible transitions** (0–15.23: tilt to the hero, face swap, tilt to the prop, macro, **background swap under the macro at 8.27**,
   pull-out into a new room). A cuts on most location changes. *Build:* hold the hero prop at a fixed camera-relative pose while it fills >70 % of the frame.
   Render scene A and scene B and cross-fade the background over 3–4 frames (two render passes, alpha mix in the compositor), then dolly out in scene B. Camera paths
   are keyed curves with an ease-out on every fast move (6–12 frames, then a hold).
2. **Macro prop inserts with real texture detail** (card edge 6.3–8.4, shuffler OUT slot 61.6–64.5, High/Low cards 64.5–67.3). A's props were mid-size
   inserts on a lawn. *Build:* a bevelled card mesh with real thickness, a 2K canvas-drawn back pattern with mipmaps and anisotropy (to avoid the moiré
   seen in D), a narrow FOV (~20–25°), and BokehPass DOF for background falloff.
3. **Top-down "table view" POV** (37.4–39.9, 50.47–59.53, 64.5–67.3) with the player's hand entering the bottom of frame. A used one top-down
   shot (the death). *Build:* camera at ~2 m looking straight down, with a foreground arm rig driven by a CMU reach/push clip retargeted in Blender. A slow yaw orbit
   (~30° in 3 s) for the long holds.
4. **Jump-cut time-lapse ladder** (52.2–56.27, 6 cuts × 0.63–0.8 s, the camera stepping higher each time). A has nothing like it. *Build:* one scene, cards
   re-dealt with a new random seed per segment, camera height ×1.15 and yaw +8° per cut, rendered as separate `--from/--to` pieces.
5. **Diegetic and 3D information graphics** ("ROTATED/NOT ROTATED" lying on the card 62.2–64.5, "EDGE SORTING" 58.7, "~$22,000,000" 69.0, "High/Low
   value" bars 64.5). A had no text except captions. *Build:* troika-three-text or TextGeometry meshes placed in world space (on the card plane, beside the chips),
   an outline via a second, slightly larger black mesh or an SDF outline, a pop-in scale 0→1.1→1 over 6 frames, colour coding green = good / red = bad.
6. **2D explainer overlays that draw on** (magnifier ovals 21.33, rotate arrows 41.17–42.5, edge bars wiping 63.3). *Build:* SVG paths rendered to a canvas
   texture per frame (stroke-dashoffset write-on) and composited screen-space over the render. Keep one overlay colour (D uses one blue) as the channel's
   "annotation ink".
7. **Push through a screen into a diegetic UI** (75.13–75.47 into "Cam 7" with a running timecode). *Build:* render the table scene into a
   WebGLRenderTarget, map it onto a monitor mesh, dolly until the screen fills the frame, then switch to the full-frame RT with a cyan/noise grade and canvas-text
   "CAM 07  22:10:11:11" advancing per frame. The same trick works for phone-app mock-ups.
8. **Practical lights as the look** (chandeliers with bloom in 5/9/15/25, slot screens, the monitor wall in 23a, spotlight cones in the showroom). A lit mostly with
   one sun. *Build:* emissive materials + UnrealBloomPass (threshold ~0.8), cheap volumetric cones (additive, depth-faded transparent cone meshes), one
   coloured practical per portrait (cyan lamp top-left plus a warm key frame-right = D's portrait recipe), and a vignette pass.
9. **Joke props as copywriting** ("LOSE YOUR SAVINGS CARDS", "GAMBLE GAMBLE GAMBLE CARDS", 23–29). *Build:* box meshes with canvas-drawn packaging. Our
   own brand names, not D's.
10. **Write-on prop text in sync with the voice** (the lawyer's sign 81.2–84.9). *Build:* a canvas texture re-drawn per frame from the word timings of
    `tools/align_offline.py`.
11. **Reaction acting through face swaps** (Ivey smirk 5.10; dealer puzzled/frown/smile 43.0/47.6/49.6). A swapped faces only for plot reveals. *Build:* our
    own original characters with 4–6 painted or designed expression textures (or morph-target faces on our own glTF heads), swapped on the word.
    **Never real people's photos** (see weaknesses).
12. **Seamless loop** (90.47 ≈ 0.00) and a closing moral question. A ended on a punchline with no loop. *Build:* end the last camera move on the exact
    pose of frame 0, and write the last line so it leads into the first.
13. **Italic captions for quotes** (81.1–84.9) and "..." for comic pauses. *Build:* a caption style flag in the caption burner.
14. **Hook = a test for the viewer** ("Can you tell the difference...? Well, you can't") with a B&W snap and 0.33 s of silence. *Build:* a grade-switch keyframe
    and a cut in the voice track.

## Weaknesses (seen, with evidence)

| Time | Issue | Evidence |
|---|---|---|
| Whole video | Uses a real person's likeness: photo face textures of Phil Ivey (named), and photo faces on the dealer, prosecutor and lawyer | Sheets 2, 6, 8, 12, 14 (Ivey). Lawyer photoreal stubble face at 81.2 (`s_r`). Whose photos they are is unverified. Not something we copy |
| 29.2–31.1, 43.9–47.5 | Ivey's identity flickers: the face photo changes skin tone and lighting between beats of the same locked shot | `s_l`: light-lit face at 29.5–30.0, much darker face 30.1–31.1, a third face with a grin at 32.5. The photos' lighting does not match the scene light |
| 31.1→31.2, 32.5→32.7 | Pose snaps inside a locked frame look like glitches | `s_l`: praying hands → shrug and shrug → cap tip within ≤3 frames, with the camera fixed |
| 27.9–29.2, 62.9–63.2 | Low-poly mitten hands in close shots | Sheet 7: a white hand with facets and fused fingers fills the top third. `s_p`: the dealer's hand covers 60 % of the frame as a smooth faceted blob |
| 0.8–3.3 | The hook's two cards cannot be compared, and the shot doesn't reward the question | Sheet 1: two small card backs with a moiré-shimmering pattern. The difference is only shown at 21.4–23.1, 18 s later |
| 0.0–0.8 | Weak first frame: a dim WS | Luma 52, centre 41 (shots.json light_first). There is no close-up or impossible image in the first second |
| 21.4–23.1 | The key visual (the edge difference) is hard to read on a phone | Sheet 4: the blue/white edge stripes inside the ovals are a few pixels wide at 360x640 and change colour without a label |
| 0–90.5 | Narration is fast and mostly third person | 288 words in 90.5 s = **191 wpm**. "You" only in the hook, the two "how do you even" questions and "Repeat that many times" |
| 44.0 | Script error: "Ivey played dumb **again**" although he had not played dumb before | Narration 44.0–45.4. Earlier he only claimed good luck (29.5–31.2) |
| 37.4–39.9 | Wording/logic: "**the gambler** asked the dealer" switches name mid-explanation (Phil / Ivey / this guy / the gambler / the player) | Captions 38.6–39.9, 49.8 |
| 72.1–80.4 | Facts simplified: "two casinos sued him and he was forced to give back all that money". From public court records (not the video): Crockfords (London) never paid out, and Ivey sued them and lost (UK Supreme Court 2017). Only the Borgata (Atlantic City) sued him | Narration 76.6–80.4. The courtroom has a Union flag (sheet 24). Legal-history detail from my own knowledge, not checked in this session |
| 59.6–63.5 | Caption position jumps from y 0.72 to 0.76 | captions.json y_frac 0.76 for "Now Ivey could distinguish... they were revealed." against 0.718–0.721 elsewhere |
| 76.533 | Dissolve leaves a ghost "Cam 7 22:10:12:13" over the court CU | Strip `s_q` frame 2296 |
| 76.5–77.2 | Unclear who the man holding his head is (no cap; bald or shaved, suit) | The Ivey design (cap) is not used in court, so continuity of the hero is broken. Identity unverified |
| 72.1–75.4 | Background security staff are frozen idles | Sheet 23: the red-waistcoat man holds the same pose for 3.3 s |
| 10–15 (showroom), 23 (factory) | Location logic: Ivey suddenly stands in a blue railing showroom, and the card factory is generic | Sheets 2/3: no establishing cue for either place. They work as a "presenter void", but the space is unexplained |
| Whole video | Low delivered resolution | 360x640 at ~567 kb/s. Moiré on card backs in every WS (strip `s_a`) |
| 0–90.5 | Flat dynamics | LRA 2.1 LU. The only dynamic event is the 0.33 s silence at 3.36 |
