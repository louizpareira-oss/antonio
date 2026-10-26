# WRONG KNOCK style library

Visual looks to draw from whenever a new video idea is developed. Each new idea picks **one primary look** that fits its setting, and may borrow devices from the others. The looks were studied from reference contact sheets supplied by the channel owner. They are execution references only: never reuse another creator's story, creature, rules, wording, watermarks or shot order.

Baseline (already produced): **Casefile**, the look of *Two Peepholes*. Muted navy room, white outlined pictograms, yellow for attention, red for danger, green for confirmation, side-cutaway stage plus frontal inserts.

---

## 1. Night-vision case

*Best for:* stories about a pet, a home at night, or something only seen on camera.

- **Base:** near-black charcoal with a faint vertical-stripe wall texture; furniture in dark gray (armchair, bed, door frames).
- **Subject:** a realistic-silhouette animal or figure in solid white with a dark outline. Colour the subject **yellow** when it is the focus or behaving wrongly.
- **Mode switch:** whole sequences flip to **green night-vision / CCTV** (monochrome green, white-hot subject, grain). Use it for "what the camera saw".
- **Devices:** CCTV grid (2×3 camera feeds); top-down **floor plan** of the home with red and green route lines; polaroid / evidence photos with a red ✕; incident report sheets; clock faces; a phone screen at the end; round icon badges; a 7-dot progress row.
- **Chapter markers:** big numerals (`05`) with a one-line subtitle, instead of a RULE card.

## 2. House cutaway

*Best for:* intruders, things outside the house, multi-room stories.

- **Base:** pure black void.
- **Stage:** a **dollhouse cross-section** of the home in white line art (roof triangle, two floors, stairs, bedroom with bed and sleeper, front door). Characters move room to room inside it.
- **Exterior:** night yard with bare trees, a yellow crescent moon in the top corner, a car with headlight cones, windows that light up yellow.
- **Threat:** a tall, wrong-proportioned white creature silhouette with **glowing yellow eyes**. It grows taller or closer each return.
- **Devices:** red command banner (e.g. `LEAVE YOUR HOUSE`); red dashed movement paths inside the cutaway; red digital timer; speaker/sound icon; gray TV-static frames as hard breaks; window close-ups with a figure behind the glass.
- **Chapter markers:** big numerals (`03`) with a subtitle; green night-vision for the final sequence.

## 3. City night / phone UI

*Best for:* rides, deliveries, apps, travel, anything the viewer follows on a screen.

- **Base:** black, crisp white line art with white fills; occasional horizontal glitch lines.
- **Stages:** car side view with headlight beam; **dashboard POV** through the windshield; apartment blocks; lobby; elevator doors.
- **Phone UI as evidence:** app screens with map grids, a yellow pin, dotted routes that bend wrong, ETA timers that do not add up (`4 min` that never changes), receipts arriving.
- **Accents:** **yellow** for lights that matter (lamp, traffic light, pin); **red** for stamps (`ON FILE`) and prohibitions.
- **Rule card:** `RULE 1` with a boxed numeral and a short command line.
- **Ending:** one big type line on black (e.g. a closing phrase) as the final image.

## 4. Red elevator / icon rules

*Best for:* buildings, elevators, workplaces, rules about what you must not see, say or touch.

- **Base:** near-black with **red-tinted frames** for danger beats (a red veil over the whole image).
- **Stage:** front-on elevator doors with a **digital floor display** (white numerals that turn red on the wrong floor); button panel close-ups; corridor with a single gray figure.
- **Icon-based rules:** each rule has one bold icon: a red eye pill (don't look), red lips (don't speak), raised palm (stop), music note with lock (the song), calendar day. The icon is the rule title.
- **Devices:** large numerals (`2021`, `13`, `11`); red ECG / sound-wave lines; a progress row with check marks; an `UNFILED` folder stamp; a white smiling face as the uncanny presence; ×2 multipliers.

## 5. Field report (pictogram + zones)

*Best for:* open spaces with groups of people, "stay in your area" rules, anything mapped from above.

- **Base:** pure black; a perspective floor (lines converging to a vanishing point, fading into the dark); background props in mid grey (vehicles, machines) along the horizon, softly out of focus.
- **Figures:** solid white pictograms (round head, rounded body, thick limbs) with two-tone shading; the threat or the odd one out marked by a single accent (a yellow object, red eyes).
- **Zones:** glowing white rings on the floor in perspective, drawn on when a rule starts.
- **HUD:** file label top left (`FILE 049 // NAME`), numbered chapter boxes top centre with the current one filled, a running timecode top right.
- **Captions:** bold white uppercase, centred low, one short phrase at a time.

## 6. Crowd grid (rows of seated people)

*Best for:* classrooms, waiting rooms, theatres, buses: places where many people face the same way.

- **Stage:** rows of seated figures seen from behind, receding in perspective (front rows bigger and brighter, back rows smaller, greyer, slightly blurred).
- **Beats:** everyone turns at once (a wave of heads), one figure with red eyes, a red marker circle drawn around the one that matters.
- **Props:** paper sheets with ruled lines and handwriting, folded paper, speech bubbles, red outlined stamps (`DO NOT LOOK UP`), a few drifting red dots.

## 7. Shaded portrait (semi-real cartoon)

*Best for:* character beats: a face that changes, a smile that is wrong.

- **Faces:** grey-skinned cartoon heads with soft shading, rim light and heavy upper lids; expressions go from neutral to a too-wide grin; red irises with a glow for the uncanny turn.
- **Setting:** dark red and black spaces (red seats, an exit sign), a big bright screen as the light source.
- **Devices:** big chapter numerals (`02`) with a red underline and a one-line rule; seat-grid diagrams with one red seat; phone screens; glitch frames only as a diegetic failure; a big red closing line (`YOUR TURN.`).

The three looks above were studied from contact sheets the owner supplied on 2026-10-26. Use their conventions only, never their stories, characters or wording.

## Pro finish kit (`engine/pro2d.js`)

Built to match and beat the references above; proven in `projects/pro-look-test/` (`out/Pro_Look_Test.mp4`).

| Need | Function |
|---|---|
| Slow camera push with a little handheld drift | `camAt(t, keys)` with `core.layer` for parallax and `core.blurLayer` for depth of field |
| Perspective floor, contact shadows, zone rings that draw on and pulse | `floor`, `contact`, `ring` |
| Two-tone pictogram figures (white, or the cobalt-hoodie protagonist) in poses | `figure`, `POSE`, `poseMix` |
| Rows of seated people whose heads turn in a wave; red-eyed individuals | `crowd`, `seatedBack` |
| Semi-real shaded portrait: blink, gaze, grin, red eyes, rim light, optional cap | `portrait` |
| File label, chapter boxes, running timecode | `hud` |
| Big-numeral chapter card with a red bar that draws under the rule | `chapterCard` |
| Red marker circle, stamp, speech bubble, paper with handwriting | `markerCircle`, `stamp`, `bubble`, `paper` |
| Drifting red embers, light shafts with dust | `embers`, `shaft` |
| Big closing line | `bigType` |
| Dark band under captions so they stay readable over bright figures | `scrim` |

---

## Shared devices across the new looks

- **Chapter numerals** (`01`–`07`) with a single subtitle line, as an alternative to RULE cards.
- **Mode tints** that mark a different kind of seeing: green = camera / night vision, red = danger / wrong floor.
- **Evidence props:** phone screens, maps with routes, CCTV grids, polaroids, case files with stamps, timers, radar, waveforms.
- **Hard breaks:** gray static or overexposed white frames, used once per act, not constantly.
- **Captions:** small, uppercase, white, bottom-centre, one short phrase at a time.
- **One recurring creature design,** consistent in every appearance, revealed in stages (eyes → silhouette → full body).

## How to use this for a new idea

1. In the plan, name the primary look and any borrowed devices, and say why they fit the setting.
2. Keep one palette logic for the whole episode (which colour means danger, attention, safety).
3. Build the stage and creature as reusable assets first, as with `two-peepholes/scenes/sets/entry.js`.
4. Pictogram engine support today: black `archive` and navy `casefile` styles, outlined people, a dog asset, portraits, rule cards, progress rows, evidence cards, static/glitch/scanline effects, and the Two Peepholes door, lens and tape assets.
5. **Not built yet** (create on first use, then keep for reuse): house cutaway set, green night-vision grade and CCTV grid, phone UI with map, pin and timer, polaroid and stamped-file props, big chapter-numeral card, elevator set with floor display, tall creature with glowing eyes, car side view and dashboard POV, waveform line.
