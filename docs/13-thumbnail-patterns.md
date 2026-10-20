# What the winning What-If thumbnails do (examples the user shared, Oct 20)

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
