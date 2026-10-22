# What the winning What-If thumbnails do (examples the user shared, Oct 20)

> **Replaced (Oct 20):** thumbnails are now prompt-only: 3 original SeaArt prompts per video with the required style block from `CLAUDE.md`. No coded or OpenArt thumbnails. This page is kept only as research.

| Channel | Video | Views (age) | Text | Hero | Big element |
|---|---|---|---|---|---|
| Ifverse | What If You Had 500 IQ? | 1M (5 d) | "500 IQ" + "TEST BROKE" | giant head, smug eyes, star glint in one eye | IQ gauge snapping past the top |
| Ifverse | 500 IQ to Disappear (Part 2) | 319K (3 d) | "500 IQ / COME GET ME." | giant head, smirk, star glint | red hooded hunters in the dark |
| Ifverse | One Second Felt Like Forever | 331K (10 d) | "TOO FAST." | red hoodie, shocked wide eyes | lightning bolts, glowing orb at a fingertip |
| Ifverse | 500 IQ to Save Your Sister (Part 3) | 147K (1 d) | "500 IQ / SOLVED." | giant head, smirk, star glint | glowing escape path through a maze to a prison cell |
| IFOLOGY | What IF You Were 10x Faster? | 592K (3 d) | "TOO SLOW." + "10×" | blue hoodie, full-body sprint, smug | sports car left behind, motion blur, neon city |
| IFOLOGY | What IF You Could Stop Time? | 398K (2 d) | "PAUSED." | giant smug face filling the frame | pause button, frozen night city |
| IFOLOGY | What IF You Could Teleport? | 182K (1 d) | none | green hoodie, finger snap | pixel trail of where he was |
| IFOLOGY | What IF You Were 100x Stronger? | 171K (4 d) | "TOO MUCH." + "100×" | blue hoodie, calm, one punch | fire truck crumpling on his fist |
| IFOLOGY | What IF You Could Control Gravity? | 149K (1 d) | "UP IS DOWN." | blue hoodie, standing on a wall | taxi and people falling sideways |
| other | What If Your Money Grew 10x Every Day? | 161K (17 h) | "$40 MILK." | sweating, half-red face | $40 milk carton, shocked shopper |
| other | What If Nobody Could Feel Pain? | 142K (2 d) | "ONLY ME." | crying, teal hoodie | crowd of happy people around him |
| other | What If Nothing Could Hurt You? | 109K (3 d) | "NOTHING." | calm, teal hoodie | the city burning behind him |
| Whatifferent | See Like an Eagle | 48K (10 d) | "TOO CLEAR." | green hoodie, glowing eye | golden eagle with spread wings |

## The rules they all follow
1. **Calm hero, chaos around him.** The best ones (1M, 592K, 398K) show the hero *unbothered*: half-closed white eyes,
   small smirk, arms crossed or one casual hand, while the world breaks. Shock or tears only when the story is the price
   he pays ("ONLY ME.", "TOO FAST.").
2. **One giant consequence, touching him.** The wrecking ball shatters on his shoulder, the fire truck crumples on his
   fist, the car is left behind. One big thing, not many small ones.
3. **Hero big:** either a head that fills 50–70 % of the height (cut off at the shoulders) or a full body in a strong
   action pose taking 60–80 %. On one side; the consequence on the other.
4. **Text: 2 words with a period, in the empty corner.** Line 1 white, line 2 yellow, very thick black outline,
   usually bottom-left or top-left: "TOO SLOW.", "TOO MUCH.", "PAUSED.", "NOTHING.", "ONLY ME.". The "TOO ___." formula
   alone appears 4 times.
5. **Colour:** dark blue/purple night or a bright warm disaster glow, with the hero's hoodie as the strongest colour
   (royal blue, green, teal, red). High saturation, strong rim light, glow and sparks; depth of field blurs the background.
6. **Clean:** no small labels, no busy UI. (They sometimes add a "10×" corner tag or a red "PART 3" badge; we skip
   numbers by the user's rule.)
7. **The star glint:** Ifverse puts a white 4-point sparkle in one eye on almost every thumbnail; it reads as "smart /
   confident" at small size.

## Our prompt template (SeaArt / Midjourney)
```
16:9 aspect ratio, YouTube thumbnail. Cinematic 2.5D 3D render of a slender stick-figure with thin limbs, a solid
black spherical head, and glowing white eyes. Wearing a brightly colored hoodie.
[HERO] <hoodie colour> hoodie, black pants, white sneakers, black gloves; <calm smug half-closed eyes and a small
smirk | shocked wide eyes>; <pose>; on the <right/left> side, filling about 70% of the frame height.
[DISASTER] <one giant physical consequence of the rule, touching or right next to him>, <debris, sparks, dust, glow>.
[LIGHT] <night city / burning sky / dusk>, epic cinematic lighting, strong rim light, depth of field, high
saturation, high contrast, empty space in the <corner> for text.
Strictly NO human skin, NO realistic faces, NO thick/chibi 3D bodies, NO Pixar styles. No text, no letters, no numbers.
```
Midjourney: add `--ar 16:9` at the end. SeaArt: put the "Strictly NO…" line in the negative prompt as well.

## Lessons from our first SeaArt result (2x Heavier, Oct 20)
- "Slender … thin limbs" alone gives a tiny head on very long legs: always add "large round head, about one quarter of
  his total height" so the face reads at phone size.
- "Glowing white eyes" alone comes out angry/evil: always describe the expression ("half-closed flat white eyes, small
  sideways smirk, not angry, not evil").
- Name only ONE consequence and say how it touches him (crushed under his foot, cracks starting at his feet); push
  everything else "out of focus" in the background.
- Reserve the text area in words ("the left 40% of the frame is calm, darker sky with nothing in it").
- Vehicles with company markings (taxis) get fake lettering: use a plain shiny car and add "no logos, no signs".

## Our own look: the Parallel You thumbnail (Oct 20, after the second SeaArt result)
The user doesn't want to copy the other channels. Their thumbnails are cheap flat art; they win on **one clear idea +
a big readable face**, not on rendering. Our second SeaArt result looked fake because it mixed a photoreal Lamborghini,
river and lava with a cartoon figure (pasted-in look), the car wasn't hurt, the lava/splash/sunset is the generic AI
look, and the figure was a tiny head on stilt legs. Our own system:
1. **One stylized world.** Everything (road, cars, buildings) simplified and matte like the hero, "like a frame from a
   premium animated short"; nothing photoreal. Ban: photorealistic, lava, fire-ground, water splash.
2. **A brand signature nobody else has:** a thin glowing **cyan rim light** around the hero ("he belongs to a parallel
   world", from our channel's cyan/gold Mirror logo) against **warm gold** light on the world.
3. **An impossible physical image you can say in 5 words**, built around the face (e.g. "sunk waist-deep into the
   road"), with a low, close camera so the head is 35–45 % of the frame height.
4. Calm, unbothered face; text in the empty dark corner.

## Second reference set (the user, Oct 22): what's new
"Don't copy their style, take the idea of what is powerful." 18 thumbnails from 4 channels (views at 12 h – 4 d).

| Video | Views (age) | Text | The one idea you get in 1 second |
|---|---|---|---|
| Woke Up in Kindergarten With All Your Memories | 271K (2 d) | "I KNEW." + red badge "09.11" | deadpan half-lidded face + a real event everyone recognises |
| Turn Invisible at Will | 235K (4 d) | "TURN INVISIBLE." | an empty hoodie with a dotted outline of the face: the power shown as an *absence* |
| Copy Powers | 141K (1 d) | "MINE TOO." | fire jumping from a scared kid's hand to the smug hero's, curved arrow between them |
| Shapeshift | 112K (18 h) | none | the face split down the middle: half stick figure, half human, mid-change |
| Freeze Time | 47K (3 d) | "TIME STOPPED!" | a coffee splash frozen in mid-air next to his raised palm |
| Time Loop | 40K (12 h) | "AGAIN." + red badge "LIVES: 102" | bored eyes inside a glowing infinity loop with a clock |
| Turn Invisible | 38K (12 h) | "RIGHT HERE." | see-through hero walking past two guards to the prize |
| Double in Size / Clone | 11–12K (1 d) | "DOUBLE EVERY HOUR." / "CLONE INSTANTLY." | red arrow to the tiny original next to the giant / the 3 copies |
| Money 10x / Infinite Money / No Pain | — | "$40 MILK." / "DAY 30" / "ONLY ME." | a price tag, a phone with an absurd number, the one crying face in a smiling crowd |
| (untitled) wrecking ball | — | none | whole picture grey, only the blue hoodie in colour, ball shattering on his shoulder |

**New lessons (on top of the 7 rules above):**
1. **Show the power itself, not a story moment.** The title's verb is made visible: invisible = empty hoodie, copy =
   fire jumping hand to hand, freeze = coffee stuck in the air. A stranger must guess the title from the picture.
2. **Split / half-and-half** shows a change in one image (half stick figure half human, half-yellow half-red emoji).
3. **Selective colour:** a grey world with only the hero (and the one consequence) in colour makes him jump out.
4. **A big specific number in a red box** next to the 2 words ("LIVES: 102", "09.11", "$40.00") adds curiosity. It is
   part of the text overlay the user adds, big, never tiny numbers inside the picture.
5. **A red arrow** to the one detail you might miss (the tiny original, the clone, the copied fire).
6. **Text in the hero's voice** wins over a description: "I KNEW.", "MINE TOO.", "AGAIN.", "RIGHT HERE." sound like
   him talking; "CLONE INSTANTLY." only repeats the title (and got the fewest views).
7. **Dark scene, lit face:** night purple/blue or dusk, with a glow patch right behind the black head so its outline
   reads at phone size.
8. **Two-character tension** (the scared kid losing his fire, the crier in a happy crowd) tells a story without words.

**What we don't take:** brand products and creator lookalikes (the Feastables bars, the guards with a famous
YouTuber's face), real tragedies as bait (9/11), their exact phrases ("ONLY ME.", "AGAIN."), the 3D-render look.
Note: the first channel's hero (black ball head, blue hoodie, "What IF You Could…") looks almost like ours; we stand out
with our own animals, the cyan/orange glow and our titles, not by copying their poses.

## Our new thumbnail style (the user, Oct 22): the reference
`docs/img/thumb-style-v2-my-bad.jpg` (Talk to Animals, "MY BAD."). The user picked it and called it a new style.
Aim every future prompt at this look:
- **Sky as the stage:** a rich dusk gradient (deep purple at the top to hot orange at the horizon) with flat painted
  clouds and a dark city silhouette at the bottom; the whole left 40 % stays sky for the text.
- **Glossy hero:** the black head has a soft white highlight and a thin orange rim on the dark side; the blue hoodie
  gets bright cyan edge light; eyes are big white ovals with an expression (here: guilty, gritted teeth, sweat drops).
- **The palm at the lens:** one black hand, huge and foreshortened, filling the bottom middle, cyan/orange rim on the
  fingers.
- **The threat as silhouettes:** the animals (crows) are flat black shapes with an orange outline and glowing orange
  eyes, lined up on wires behind him, one big one swooping in; no small detail, so it reads at phone size.
- **Small comic marks** (yellow "!" ticks near the head) instead of busy effects.
- **Text:** Fredoka Bold, white line / yellow line, thick black outline, soft drop shadow, top-left in the sky.
- The prompt that made it: concept 4 in `aitrends-2d-studio/projects/talk-to-animals/story/thumbnail.md`.
