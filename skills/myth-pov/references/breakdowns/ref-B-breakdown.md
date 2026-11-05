# Reference B: "The gods couldn't..." (Norse, the giant builder of Asgard's wall, Svadilfari): frame-by-frame breakdown

Source: `scratchpad/ref/B_gods_couldnt.mp4` (our download: 360x640, 30 fps, H.264 ~407 kb/s, mono AAC 48 kHz).
Data: `scratchpad/ana/B_gods_couldnt/` (shots.json, captions.json, per_frame.json, audio.json, sheets/, frames/).
Extra frame strips I extracted to check cuts: `scratchpad/work/refB/*.jpg`.

## Measured totals

| Metric | Value | Source |
|---|---|---|
| Duration | 69.567 s (2087 frames) | shots.json |
| Shots (detector) | 42 | shots.json |
| Shots (verified) | **42** (detector's 35+36 merged into one shot, detector's 29 split by a hidden cut at 47.967 s) | sheets + frame strips |
| Mean / median shot | 1.66 s / 1.43 s (min 0.30, max 4.57) | corrected list |
| Shot-length spread | 11 shots < 1 s, 17 shots 1-2 s, 10 shots 2-3 s, 4 shots ≥ 3 s | corrected list |
| Narration | 258 words, 82 caption chunks (3.1 words per chunk, ~0.85 s per chunk) | cleaned captions |
| Speaking rate | **222 wpm** (258 words / 69.57 s, voice runs from 0.0 s to the last frame) | captions.json |
| Loudness | -14.3 LUFS integrated, LRA 2.0 LU, true peak -0.8 dBFS, no silences | audio.json |
| Audio floor | 50 ms RMS windows: p5 -25.6 dBFS, median -15.2 dBFS. The floor between words sits ~10 dB under the voice, so there is probably a continuous music/ambience bed (I can't listen, so what the bed contains is **unverified**) | ffmpeg astats |
| Picture brightness | mean luma 79 (min 28, max 176), mean centre luma 84, mean edge luma 73.5, so a mild vignette of ~10 levels | per_frame.json, shots.json |
| Colour | mean saturation 120 (range 11-189), warmth r-b from -56 (night) to +57 (dusk/rage) | shots.json light_mid |

## Clean narration

> You offered to build the gods a wall to keep out giants, in just one winter. Your price: the sun, the moon, and the
> goddess Freyja. The gods think nobody can build that fast, so they say yes. But there are rules: nobody helps you, and if
> it isn't done by the first day of summer, you get nothing. Either way, the gods get a free wall. You ask for just one
> thing: can your horse help? Loki talks the gods into it. It's just a horse. It's not just a horse. Every night, it drags
> in rocks the size of houses. Three days before summer, the whole wall is done, except the gate. Now the gods are about
> to lose the sun, the moon, and Freyja. So they grab Loki. "This was your idea. Fix it, or you die." And Loki comes up
> with a very weird plan. That night, you take your horse into the woods for one last load of rocks. And out of the trees
> walks a beautiful mare. Your horse takes one look at her, snaps its ropes, and runs. You chase them all night, and by
> morning, you know you're not going to make it. You get so angry, you grow back to your real size. You're a giant, the
> exact thing this wall was built to keep out. So instead of paying you, the gods call Thor, and he pays you with his
> hammer. And that beautiful mare who stole your horse? That was Loki, who turned himself into a horse.

OCR fixes I checked against the frames: 0.9-1.8 s the OCR returned "iem e spob aun", but the frame (s01full.jpg, f26-28)
reads **"the gods a wall"**. 33.6 s "'uns eun eso]" is "lose the sun," (frame strip s22). "41" at 35.0 s is OCR noise from
the picture. All "youask / thetrees / Ioad" items are spacing errors.

## Shot list (all shots, verified)

Abbreviations: ECU/CU/MCU/MS/WS/EWS = shot size. FOV = estimated vertical field of view (an estimate from perspective
and background compression, not measured). "meas." = OpenCV label. "vis." = what the frames show. Speeds are mean
optical flow in px/frame at 360x640.

| # | Time (s) | Size | Angle / height | Lens feel | Camera move (meas. → vis.) | Subject & animation | Light | Caption(s) | Why the cut lands here |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.000-2.233 | CU→high WS | Starts at ground level behind a block wall, ends at a high angle (~8-10 m) over the courtyard | Wide (~65°) | meas. push-in 1.07 + truck R + crane up, "roll -84°" (an artifact of the fast move). vis.: **one continuous fast crane-up + swing over the wall** (s01full.jpg f23-28: ladder, then wall, then courtyard, no cut). Strong ease-out: 21.6 → 0.6 px/f | The hero (red jacket, beard, cube head with a photo face) crouches and lifts a stone; ends on the courtyard with a longhouse, 4 small gods and crates | Overcast winter day, cool (warmth -15), luma 100, soft top light, almost no cast shadows, light snowfall, haze in the distance | "You offered to build" / "the gods a wall" / "to keep out giants," | Hook: impossible job + place established in one move. Cuts on "giants" to show a giant |
| 2 | 2.233-3.067 | MS→full (figure) | Worm's-eye, low camera, looking up | Normal (~50°) | meas. push-in 1.49 + tilt down, accelerating 1.9 → 3.8. vis.: fast push-in toward a giant | A dark-shirted giant stands among jagged dark peaks (Jotunheim), idle sway | Strong backlight: misty white-blue sky, centre luma 204, figure close to silhouette, high contrast (std 73.5) | "to keep out giants," | Literal illustration of "giants"; cuts on "in just one winter" |
| 3 | 3.067-4.233 | EWS | Eye-level, slightly high | Wide (~70°) | meas. slow push 1.07, flow 0.23 → vis. near-static slow push | Diorama of the wall ring with a bench; snow spreads over the green grass in patches (season time-lapse) | Stylised day: cyan sky with cartoon clouds, saturated green (sat 113), heavy dark ground vignette (bottom third 33.5) | "in just one winter." | Time-lapse visual for "one winter" |
| 4 | 4.233-6.367 | MS (OTS) | Eye-level behind the hero's shoulder | Normal (~50°) | meas. truck R dx -243, constant 8.8/8.1 px/f. vis.: **linear pan right** from the sun to a white moon (s04.jpg) | Hero's back, gods ahead; the sun sprite leaves the frame left and the moon enters right | Golden dusk: peach-orange sky (warmth +53), walls blue-violet in shadow, sun sprite with bloom | "Your price:" / "the sun," / "the moon," | The list is staged as one pan (sun, then moon); cuts on "Freyja" |
| 5 | 6.367-7.233 | MS→MCU | Eye-level | Normal-tele (~40°) | meas. push 1.10 → slow linear push-in | Freyja (green dress, gold necklace, photo face) stands, small breathing idle | Dusk: warm sky top, dark blue walls, dim (luma 52, centre 30) | "and the goddess Freyja." | Name, then face |
| 6 | 7.233-10.500 | WS→2-shot MS | Eye-level | Normal (~50°) | meas. push 2.40 + tilt + "roll 19°" (character motion). vis.: **steady push-in with a slight arc** from the group to a 2-shot | Hero walks to Odin (dark clothes), Freyja behind; ends on a handshake | Overcast winter, cool, luma ~97, snow particles drifting past the lens | "The gods think nobody" / "can build that fast," / "so they say yes." | Push ends on the handshake = "yes" |
| 7 | 10.500-11.367 | WS | Eye-level | Normal | meas. push 1.24, accelerating 1.9 → 4.2 → vis. push-in | Hero holds a scroll that starts to unroll downward | **Grade snaps to near monochrome** at 10.667 (sat 11.4) on "But there are rules:" (s07.jpg f4) | "so they say yes." / "But there are rules:" | Tone change for "rules" |
| 8 | 11.367-11.833 | MS (high) | Slightly high, looking down at the scroll | Normal | meas. push 1.11, ease-out 3.6 → 0.9 | The scroll unrolls to the ground toward camera (match on action from 7); colour back (sat 65) | Overcast, neutral (warmth +1) | "But there are rules:" | Match cut on the unrolling scroll (0.47 s insert) |
| 9 | 11.833-12.867 | WS | Eye-level | Normal | meas. slight truck, flow 1.1 → vis. near-static drift | A small cube-head helper runs to the hero; the hero kicks him away | Overcast winter, luma 108 | "nobody helps you," | Gag illustrating the rule |
| 10 | 12.867-15.000 | EWS | Eye-level | Wide (~70°) | meas. static (flow 0.08) → **locked-off** | Same diorama as 3: the sun sprite arcs left → upper right (time-lapse), snow patches melt to green grass | Bright cyan sky, sat 146, ground in black vignette (bottom third 7.1) | "and if it isn't" / "done by the" / "first day of summer," | Locked frame lets the time-lapse read; cuts on "you get nothing" |
| 11 | 15.000-15.967 | MS-full | Eye-level | Normal | meas. slight truck, flow 2.0 → vis. near-static | Hero slumps and shrugs; **the cube head turns so the photo face shows on the top/side** (15.40-15.93) | Overcast winter, luma 100 | "you get nothing." | Reaction to "nothing" |
| 12 | 15.967-17.767 | WS→wall | Eye-level, tilting up | Normal | meas. push 1.38 + tilt up, **ease-in** 0.95 → 5.6 | Four gods lined up against the wall (Freyja, Loki green, Odin dark, Thor red), idle; the camera rises up the wall | Low-key: luma 45, cool blue, wall in shadow | "Either way," / "the gods get" / "a free wall." | Tilt ends on the wall = "free wall" reveal |
| 13 | 17.767-19.300 | MS→CU | Eye-level | Normal → tele | meas. push 1.54, truck, ease-out 10.8 → 4.0. vis. (s13.jpg): hero walks in, then a **fast snap push/arc to a CU**; the background swings from wall to pine trees (continuous, no cut) | Hero raises his index finger ("one thing") | Overcast winter, luma 106 | "You ask for" / "just one thing:" | Snap-in on "one thing" |
| 14 | 19.300-20.433 | WS | Eye-level | Normal | meas. truck R dx -277, roll -8.6 → vis. lateral truck | Low-poly brown horse in profile, hero beside it | Overcast winter | "can your horse help?" | Noun "horse", then horse |
| 15 | 20.433-21.700 | MS (3-shot) | Eye-level | Normal | meas. slow push 1.12 | Odin, Loki (green) and Thor (red); Loki gestures to persuade | Overcast winter, luma 89 | "Loki talks the" / "gods into it." | Name, then character |
| 16 | 21.700-23.267 | WS | Eye-level | Normal | meas. slow push 1.07 (flow 0.31) | Loki next to the grazing horse, shrugs | Overcast winter | "It's just a horse." | Set-up of the reversal |
| 17 | 23.267-24.800 | WS | Low-ish, looking up at the sky | Normal | meas. truck L dx +110, "roll 13°" → vis. **tracks the horse's leap** | The horse rears and leaps across the sky | **Night**: deep blue (warmth -53, sat 173), stars, **two bright moon discs** with bloom halo | "It's not" / "just a horse." | Reversal punchline gets a mood switch to night |
| 18 | 24.800-27.933 | WS | Eye-level, low | Normal | meas. static (flow 0.12) → **locked-off** | The horse walks past huge grey low-poly boulders and blocks (the rocks never move) | Night: blue sky, bright snow, **heavy per-pixel noise on snow and rock** (frame shot018_mid_f00790) | "Every night," / "it drags in rocks" / "the size of houses." | Scale shot for "houses" |
| 19 | 27.933-29.233 | MS insert | Eye-level | Normal | meas. push 1.14 + crane down, ease-in 1.3 → 4.8 | Calendar post with a sun icon on top and tally marks; Loki's hand points; the sun icon heats up with growing bloom | Bright stylised day, sat 144, warm sun glow | "Three days" / "before summer," | Countdown prop |
| 20 | 29.233-31.400 | EWS aerial → WS | High (crane) → eye-level | Wide (~70°) | meas. pull-out 0.78 + crane. vis. (s20.jpg, s20b.jpg): **crane up/back to an aerial of the ring, then dolly in to the two gate towers** (one continuous move) | The finished wall ring with a gap; gate towers grow in frame | Stylised day, cyan sky, very dark ground (bottom third 5.7), sat 189 | "the whole" / "wall is done," / "except the gate." | Reveal ends on the gap = "except the gate" |
| 21 | 31.400-32.900 | WS (3-shot) | Eye-level | Normal | meas. "roll -2°", ease-in at the end (0.24 → 6.7) | Thor, Odin, Freyja on green grass panic (hands to head) | Day, cyan sky, green grass, luma 74 | "Now the gods" / "are about to" | Reaction, then the whip into 22 |
| 22 | 32.900-34.000 | Sky insert | Tilts from eye-level to straight up | Normal | meas. flow 14, ease-in 2.9 → 25 px/f. vis. (s22.jpg): **whip-tilt up** to the sun sprite, hold, then **whip-pan right** to the moon (f1009-1011) | Sun sprite (outlined cartoon sun), then a glowing white moon | Bright sky (centre 229), strong bloom | "lose the sun," / "the moon," | Whip-pans as visual commas in the list |
| 23 | 34.000-34.867 | MS (2-shot) | Eye-level | Normal | meas. slow push 1.10 | Thor (red shirt, beard) and Freyja; Freyja ducks behind Thor | Day, cyan sky, dim green | "and Freyja." | Ends the list on her face |
| 24 | 34.867-35.933 | MS | Eye-level | Normal | meas. slow push 1.08 | Thor grabs Loki and lifts him; Loki's head is a plain dark cube in the first frames | Day, cyan sky | "So they grab Loki." | Action on the verb "grab" |
| 25 | 35.933-38.400 | MS | Eye-level, side | Normal-tele | meas. static (flow 0.21) | Thor pins Loki against the wall; glowing blue hammer icon | Dark (luma 28-32); **red-magenta threat tint fades in** at 36.1 on the quote (s25.jpg f3) | "\"This was your idea." / "Fix it," / "or you die.\"" | The threat holds 2.5 s on a static frame |
| 26 | 38.400-40.933 | WS→MS | Eye-level | Normal | meas. push 1.19 + arc ("roll 12.6°") | Loki walks to the horse (back to camera), then turns to camera, scheming | **Red tint from 25 stays for 5 frames, then pops off at 38.567** (s26.jpg), then day | "And Loki comes" / "up with a" / "very weird plan." | Turn-to-camera on "plan" |
| 27 | 40.933-44.667 | WS | Eye-level | Wide-normal (~55°) | meas. truck dx +893 (largest move). vis. (s27.jpg, 112 frames): **one continuous lateral tracking shot**, constant speed, no hidden cut | Hero leads the horse on a rope through a snowy pine forest to boulders | **Moonlit night**: blue (warmth -41), hard directional key from upper left, long crisp shadows on snow, stars | "That night," / "you take your" / "horse into the" / "woods for one last" / "load of rocks." | Longest moving shot: a "journey" beat |
| 28 | 44.667-47.067 | WS | Eye-level | Normal | meas. truck dx +75, slow | A white mare walks out of the trees; **gold sparkle particles** at 45.33 | Moonlit night, cold (warmth -54) | "And out of" / "the trees walks" / "a beautiful mare." | Reveal of the lure |
| 29 | 47.067-47.967 | MS | Eye-level, low | Normal | meas. truck, flow ~1.9 | The hero's horse grazes, roped near a boulder | Moonlit night | "Your horse takes one" | **Hidden cut** at 47.967 (s29.jpg f4→f5: angle and pose jump) |
| 30 | 47.967-48.567 | MS | Eye-level | Normal | slight drift | The horse lifts its head and looks | Moonlit night | "look at her," | Detector missed this cut (score 0.16) |
| 31 | 48.567-50.933 | MS→WS | Eye-level | Normal | meas. truck dx -666, **ease-out** 13 → 5.5. vis. (s30.jpg): tracks the horse, then settles and lets it run away | The horse snaps the rope (sled behind) and gallops into the trees | Moonlit, full moon with bloom, sat 151 | "snaps its ropes," / "and runs." | Action on the verbs |
| 32 | 50.933-52.300 | WS | Eye-level | Normal | meas. truck dx -337, constant | The hero runs (chase), run cycle | Moonlit; **a second moon glow appears behind the rocks** at 51.50 | "You chase" / "them all night," | Chase beat |
| 33 | 52.300-55.100 | WS→MS | Eye-level, framed between gate towers | Normal | meas. slow push 1.08 (frame strips s32/s32b: no cut) | The hero walks from far to mid-frame, arms out in despair | **Dawn**: peach sky, foreground towers almost black (edge luma 10), sat 179 | "and by morning," / "you know you're not" / "going to make it." | Time jump to dawn |
| 34 | 55.100-55.967 | MS | Eye-level | Normal | meas. slow push 1.06 | The hero shakes with rage; the cube head tumbles so the face shows sideways | **Red rage grade** (warmth +46, sat 186) | "You get so angry," | Mood grade on emotion |
| 35 | 55.967-57.633 | WS | Low → rising | Wide | meas. **pull-out 0.51** + crane up, ease-out 3.8 → 1.5 | The hero grows to tower above the wall; white dust puffs at his feet | Warm dawn backlight, red-tinted, silhouette | "you grow back to" / "your real size." | Pull-out to show the growth |
| 36 | 57.633-58.500 | WS | **Low angle**, looking up | Normal | static. Detector split this at 58.0; s35.jpg shows the **same camera, only the grade switches from red to neutral** at 58.0 | The giant silhouetted above the wall, gods' silhouettes in the foreground | Backlit dawn, cream sky (luma 107) | "your real size." / "You're a giant," | Hero-scale low angle |
| 37 | 58.500-60.800 | WS (OTS) | Eye-level, between two foreground gods | Wide (~60°) | meas. slow push 1.14 | Giant (in the middle ground) spreads his arms; two cube-head gods in the foreground, one with its face on the cube's side | Warm dawn, sat 141, warmth +57 | "the exact thing" / "this wall was built" / "to keep out." | Irony line, the gods' point of view |
| 38 | 60.800-62.300 | MS insert | Eye-level | Normal | meas. push 1.15. vis. (s38.jpg): push on the open chest, then a fast swing at ~61.77 as the lid slams shut. A masked cut is possible but **unverified** | Treasure chest glowing gold inside; Odin slams the lid | **Practical light**: gold glow from inside the chest + bloom, warm dusk | "So instead" / "of paying you," | Lid slam = "instead of paying" |
| 39 | 62.300-63.467 | MS→WS | Eye-level | Normal | meas. pull-out 0.93, **ease-in** 2.9 → 19.9. vis. (s39.jpg): a god blows a horn, the camera pulls back/up, Thor drops from the sky into frame and lands in a white low-poly smoke puff | Horn, then Thor's landing | Dusk: peach sky, dark walls | "the gods call Thor," | Summon, then arrival in one move |
| 40 | 63.467-64.700 | WS | **Low angle** | Normal | meas. pull-out 0.91 + crane | Thor walks toward the giant towering over the wall, raises the glowing hammer | Warm dusk backlight (sat 143) | "and he pays you" / "with his hammer." | Wind-up |
| 41 | 64.700-65.000 | WS | Low | Normal | meas. "roll -131°" (artifact of the flash). vis. (s41.jpg): **3-frame white bloom flash** (f1941-1943), then 6 frames of a cooler, wider angle on the giant | Hammer impact implied, not shown | White-out flash, then a cool grade | "with his hammer." | Impact as a flash frame (0.3 s) |
| 42 | 65.000-69.567 | WS→MS | Eye-level | Normal | meas. slow push 1.26 + tilt, ease-out 0.93 → 0.19 | Forest edge: the white mare and the brown horse by boulders; **green hexagon particle puff** at 67.5 shows Loki, then the mare with **Loki's photo-face plane on its head** | Pink-peach dusk sky, warm (warmth +22), snow | "And that beautiful mare" / "Who stole your horse?" / "That was Loki," / "who turned himself" / "into a horse." | Twist reveal; the video ends on the last word (no tail) |

Cut-detector corrections: detector 29 (47.067-48.567) = verified shots 29 + 30 (hidden cut at 47.967). Detector 35 + 36 =
verified 36 (same camera, grade change only). Detector shot 21/22 boundary is 1 frame late (the real cut is at f987 =
32.900 s, s22.jpg). Checked and **not** cuts: shot 1 f23-28 (continuous crane), 13 f552-557 (snap push), 20 (crane + dolly),
22 (whip pans), 27 (continuous truck), 31 (tracking), 33 (push), 39 (pull-back + drop-in).

## Story structure

| Beat | Time (s) | What |
|---|---|---|
| Hook / premise | 0.0-4.2 | "You offered to build the gods a wall... in just one winter." Crane over the wall, giant, season time-lapse |
| Stakes (price) | 4.2-7.2 | Sun, moon, Freyja, each one shown |
| Deal | 7.2-10.5 | Gods say yes (handshake) |
| Rules | 10.5-17.8 | No help, deadline, "the gods get a free wall" (a cynical aside) |
| The one ask | 17.8-24.8 | The horse. Reversal "It's not just a horse" at 23.3 with a cut to night |
| Escalation | 24.8-31.4 | Rocks, countdown, wall finished except the gate |
| Antagonist counter-move | 31.4-41.0 | Point of view moves to the gods; they threaten Loki; Loki's "weird plan" |
| Sabotage | 41.0-52.3 | Night trip, mare appears, horse runs, chase |
| Failure + reveal of identity | 52.3-61.0 | Dawn, rage, he grows: "You're a giant" (second twist: you were the enemy) |
| Punishment | 61.0-65.0 | Chest slammed, Thor summoned, hammer flash |
| Final twist | 65.0-69.6 | The mare was Loki. No CTA, no comment question, no loop line; it ends on the last word |

Pattern: second-person "you" premise, then a price list, rules, an innocent ask, "It's not just X" reversal, a montage of
progress, a counter-move by the opponents, sabotage, an identity twist, punishment, and a last-line twist.

## Camera statistics (verified, 42 shots)

| Move | Count | Shots | Typical speed / easing |
|---|---|---|---|
| Slow push-in (total scale 1.03-1.26 over the shot) | 12 | 3, 5, 8, 15, 16, 19, 23, 24, 33, 34, 37, 42 (38 also opens with a push, counted under swing) | 0.2-1 px/f, linear; 42 eases out |
| Strong / snap push-in (scale ≥ 1.2 or accelerating) | 6 | 2, 6, 7, 12, 13, 26 | Ease-in on 2, 7, 12; ease-out on 13 |
| Crane / pull-out reveal | 5 | 1, 20, 35, 39, 40 | 1 and 35 ease-out; 39 ease-in |
| Lateral truck / tracking / pan | 8 | 4, 14, 17, 27, 28, 29, 31, 32 | 5-9 px/f constant; 31 ease-out |
| Whip pan / swing | 2 | 22 (whip tilt + whip pan), 38 (swing) | 25 px/f peak |
| Locked-off | 5 | 10, 18, 25, 36, 41 | Used for time-lapse (10), scale (18), threat (25), hero-scale (36) |
| Near-static drift | 4 | 9, 11, 21, 30 | Character motion only |

The camera is almost never fully still: 33 of 42 shots move. Default lens feel is normal (~45-55° vertical); wide
(~65-70°) only for establishing shots (1, 3, 10, 20). Height: eye level in ~30 shots. Low angles are kept for power
(2, 17, 36, 40). High angles only for establishing shots (1, 8, 20). No Dutch angles (the measured "roll" values come
from fast motion and character motion; in the frames the horizon stays level). No handheld shake. Shot sizes: WS
dominates (~22), then MS (~15); there are almost no true CUs (only shot 13's end). Faces are small in the 9:16 frame.

## Lighting presets (recipes to rebuild, not copy)

1. **Overcast winter day** (shots 1, 6-9, 11, 13-16): hemisphere light (sky #b8c6d8 / ground #8a93a3), soft
   directional key at ~60° elevation with very soft or no shadows, exposure for luma ~95-105, warmth r-b about -10 to
   -15, saturation ~60, light distance fog, slow snow particle sprites (some large, out-of-focus, near the lens), mild
   vignette.
2. **Golden dusk backlight** (4, 5, 33-40, 42): sky gradient from peach-orange at the horizon to cream at the top
   (warmth +40 to +57), key behind the subjects so the foreground walls and characters drop to blue-violet silhouettes,
   sun sprite with a strong bloom halo, ACES tone map, foreground edge luma down to 10-50.
3. **Moonlit night** (17, 18, 27-32): deep ultramarine sky with star points, hard directional moon key from upper left
   (long, crisp shadows on bright snow), cold (warmth -48 to -56), high saturation 140-175, moon disc with bloom.
4. **Stylised diorama day** (3, 10, 19-24): flat cyan sky with cartoon cloud cards, saturated green grass (sat 113-189),
   strong bottom vignette that crushes the near ground to black (bottom third 5-35), sun sprite animated for time-lapse.
5. **Mood grade overlays** (7, 25, 26, 34-36, 41): (a) desaturate to ~10 for "rules", (b) red-magenta multiply for
   threat/rage, (c) a 3-frame white bloom flash for impact. In the reference these switch on and off abruptly (see
   weaknesses).

## Caption spec

- White sans-serif (Inter / Helvetica-like), regular-medium weight, sentence case with punctuation kept, one line.
- Box height about 0.032 of the frame height (~20 px at 640 tall, ~35 px at 1080x1920); line width usually 25-45 % of
  the frame width.
- Centred horizontally; vertical centre at y = 0.72 of height (OCR mean 0.7196), fixed position in every shot.
- Thin dark outline / soft shadow (about 1 px at 640p); no box, no colour highlight, no word-by-word pop.
- 1-5 words per chunk (mean 3.1), phrase-based, ~0.85 s on screen. Captions run across cuts (e.g. "to keep out giants,"
  covers shots 1-3).

## Animation and VFX

- Low-poly game-engine assets (a Unity-style look): block walls, longhouse, low-poly pines with snow caps, boulders,
  low-poly horses with run, rear and graze clips.
- Characters: humanoid rigs with **cube heads carrying photo-face textures** (hero, Thor, Loki, Freyja), stock clips (walk,
  run, kick, shrug, point, grab/lift, arms-spread). Mixamo-like library motion; no lip sync, no facial animation.
- VFX: snow particle sprites (some near the lens), gold sparkle particles (mare, 45.3 s), white low-poly hexagon smoke
  puffs (Thor landing 63.1 s, giant growth 56.2 s), green hexagon puff (Loki transformation, 67.5 s), sun/moon sprites
  with bloom, sun time-lapse arc (shot 10), snow spreading/melting via ground-texture patches (3, 10), scroll unroll
  (7-8), scale-up growth (35), bloom white-out (41), chest interior glow (38).
- Post: bloom, ACES-like tone map, vignette, grade switches.

## Edit rules (from the measured cut times)

1. **Every noun gets its own picture.** Cuts land on the thing named: giants → shot 2, Freyja → shot 5, rules → scroll,
   free wall → tilt to the wall, horse → shot 14, Loki → shot 15/24, mare → 28, Thor → 39, hammer → 40/41.
2. **The cut leads the phrase by 0.15-0.25 s** (4-7 frames): 4.233 vs "Your price" 4.4; 10.5 vs "But there are rules"
   10.7; 15.0 vs "you get nothing" 15.2; 17.767 vs "You ask for" 18.0; 19.3 vs "can your horse help?" 19.5; 23.267 vs
   "It's not" 23.5; 38.4 vs "And Loki comes" 38.6; 40.933 vs "That night" 41.1; 50.933 vs "You chase" 51.1; 65.0 vs
   "And that beautiful mare" 65.2 (OCR timing is ±0.1 s).
3. **Lists are staged inside one camera move** (sun-moon pan in 4; whip-tilt + whip-pan in 22).
4. **Reversals get a light change, not just a cut** ("It's not just a horse" → night; "rules" → monochrome; threat → red;
   rage → red; impact → white flash).
5. **The camera move ends on the payoff** (handshake 6, wall 12, gate 20, giant scale 35).
6. Pacing: 11 shots under 1 s, mostly in the setup; long holds (≥ 2.4 s) for the threat (25), the journey (27), the
   chase (31), dawn (33) and the twist (42). The only transitions are hard cuts, whip pans and one flash; no dissolves.

## Audio

- Mono AAC. -14.3 LUFS integrated (streaming target), LRA only 2.0 LU (heavy compression/limiting), true peak -0.8 dBFS.
- No silences longer than the detector's minimum; the voice runs wall to wall from 0.0 s to the last frame.
- Floor between words is ~-25.6 dBFS (p5 of 50 ms windows) against a median of -15.2, which points to a quiet
  continuous bed. Music type and SFX: **unverified** (I could not listen; no frame evidence).
- Voice: 222 wpm, a fast, flat narrator delivery (inferred from the rate; timbre unverified).

## Weaknesses (seen, with evidence)

| Time | Issue | Evidence |
|---|---|---|
| Whole video | Narration far too fast for storytelling | 258 words / 69.6 s = 222 wpm; captions change every ~0.85 s (82 chunks) |
| Whole video | Tiny, low-contrast captions | Text height 0.032 H; thin white text with a 1-px edge over bright sky/snow: shot 2 (centre luma 204), shot 18 (snow), shot 41 (white flash) |
| 15.4-15.9, 55.4-55.8, 58.5-60.8 | Cube-head face textures break: the photo face shows on the side or top of the cube when the head turns | Sheets shot011, shot033, frame shot037_mid_f01789 |
| 34.87-35.3 | Loki's head renders as a plain dark cube (no face texture) | Sheet shot024 |
| 68.2-69.5 | The twist shot has the photo face stuck as a flat plane on the mare's head, clipping the mesh | frame shot042_last_f02086 |
| Whole video | Photo-real faces on low-poly bodies clash with the style (uncanny), and the faces may be real people's photos (rights **unverified**) | Shots 5, 13, 37, 42 |
| 24.8-27.9 | Heavy per-pixel noise/grain on snow and rock (looks like unfiltered AO/shadow sampling) | frame shot018_mid_f00790 |
| 24.8-27.9 | "It drags in rocks" but nothing is dragged: the boulders never move; the horse just walks past | Sheet shot018 |
| 23.27, 51.50 | Two moons / an extra glow in the night sky | Sheets shot017, shot031 |
| 4.2-6.4 | Sun and moon in the same dusk sky in one pan (reads as an error rather than a symbol) | Sheet shot004, s04.jpg |
| 38.40-38.57 | Red threat grade leaks 5 frames into the next shot, then pops off | s26.jpg f0-4 vs f5 (cut score 0.428) |
| 10.667, 58.0 | Grade switches are hard pops mid-shot, not eased | s07.jpg f3→f4; s35.jpg f3→f4 |
| 23-40 | Colour-coding clash: the hero ("you") and Thor both wear red shirts with beards, so the viewer can't tell them apart in the WS | Sheets shot006/shot011 vs shot023/shot025/shot040 |
| 31.4-41.1 | The second person breaks: 10 s in scenes where "you" is absent (the gods threaten Loki) | Narration 31.6-41.1, shots 21-26 |
| 64.7-65.0 | The climax (Thor kills the giant) is a 0.3 s white flash; there is no impact, reaction or consequence shot | s41.jpg |
| 69.567 | Abrupt ending: the last caption ends on the last frame, with no breath, comment question or sequel hook (myth's Sleipnir payoff unused) | captions.json last item 68.8-69.6 |
| Whole video | Faces are small: almost no CUs in 9:16 (WS ~22 of 42 shots), so emotion is carried by stock body clips | Shot list |
| Whole video | Stiff library animation: no lip sync, no facial animation, generic clips (kick, shrug, point) | Sheets shot009, shot011, shot015 |
| 2.23-3.07 | The giant in shot 2 is a different design from the hero, who is revealed as a giant at 58 s, which muddles who "you" are | Sheets shot002 vs shot001 |
| Whole file | Delivered at 360x640, 407 kb/s (our download; the uploaded original resolution is **unverified**) with visible compression | ffprobe |
