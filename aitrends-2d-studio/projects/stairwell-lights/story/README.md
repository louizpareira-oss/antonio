# Stairwell Lights — production plan (WRONG KNOCK)

Files in this folder:
- `README.md` — premise, mechanism, look, reference analysis, title/thumbnail direction, self-review (this file)
- [`script.md`](script.md) — complete narration; lines starting with ▸ are directions, not spoken
- [`scene_table.md`](scene_table.md) — 74 scenes in the 12 required columns, with provisional times
- `stats.json` — computed word count, runtime estimate, close-up count
- `build_package.py` — regenerates the script, table and stats from one data source, so the narration in both always matches

## 1. Premise and mechanism

**Logline:** *If the stairwell light turns on above you, don't climb into it.*

Your building's stairwell has a motion-sensor light on every landing. Each light wakes for movement and goes out after twenty seconds of stillness. Tonight, floor four's light turns on while you are still in the lobby. Nobody is on four.

**Mechanism (taught on screen, then obeyed every time):**
- A landing lit with nobody in it means *it* is there. The lit landing is the threat tracker: a lit patch in a vertical stack of six, plus each sensor's LED (green blink = motion seen, amber = about to time out).
- It moves only in the dark, one floor at a time, toward the newest movement any sensor or sound gives away. When nothing moves, it goes back to four.
- Still things don't keep a motion light on.

**The seven rules** each start from a human micro-habit and develop the same mechanism:

| # | Micro-habit | Rule | New information / consequence |
|---|---|---|---|
| 1 | Calling "hello?" up the stairs | Don't climb into a light you didn't turn on. | A neighbor's light would climb; this one stays, then moves one floor toward you. |
| 2 | Waving to wake a motion light | When your light goes out, don't wave. | Stillness in the dark makes it lose you; it returns to four. |
| 3 | Taking stairs two at a time | Climb slower than the sensor can see. | A single slip lights your landing, and it comes one floor closer until you hold still. |
| 4 | Keys between your fingers | Put your keys down. | It hears small movement even in the dark; the keys stay on the step (brass key on top). |
| 5 | Resting on a landing | Don't stop on a landing. | Sensors watch landings, not steps. **Narrator slip** (2:43): "Rest on the fourth landing… Below it. I meant the steps below it." The worn shoe patches on four are revealed. |
| 6 | Running when the lights come on | If every light comes on, don't run. | A neighbor's all-lights button shows its shadow on four and proves it can't move in light. The timer ends everywhere at once, and the newest movement draws it to five, your floor. |
| 7 | Hurrying when you see your own floor | Take four before it does. | "It can't stand where someone's already standing." You stand still on four; it passes you, takes your keys and goes home into 5B. |

**Ending (replacement + complicity):** the narrator was the previous person on four. Every rule kept you still and in the dark, which is exactly what four needs. When the light goes out on you standing still, you become the one on four. The final image repeats the opening frame: a newcomer in the lobby, floor four lighting by itself, and now we can see it is you.

**Payoff clues seeded earlier (physical, on screen):**
1. Floor four's sensor double-blinks in the first shot (it is the stander shifting); the same double-blink returns when you become the stander.
2. Your mailbox label, 5B, is taped over an older label (`…ALE`); at the end the older label `D. HALE` is back on top.
3. Two shoe-shaped worn patches on four, facing the wall; your feet fit them.
4. Your keys left on the step, brass key on top; they are lifted and used to open 5B.
5. A palm-sized clean patch in the rail dust on three, where it stood earlier.
6. "It always goes back to four", stated in the mechanism and shown twice.

All names, the building and events are fictional. There are no case files, recordings, institutions or statistics.

## 2. Look and production rules

- **Standards:** `aitrends-2d-studio/PRODUCTION_STANDARDS.md` (cobalt-hoodie rig, physical vs. graphic light, type sizes, vertical slice before full render).
- **Primary look from `STYLE_LIBRARY.md`:** *House cutaway*, adapted as a **stairwell cross-section**: six stacked landings in white line art on a charcoal void (`#0A0C11`). Every lit or dark landing is readable at once.
- **Borrowed devices:** indicator-LED logic (from the red elevator look's displays); a printed evacuation plan as the diagram surface (evidence prop); RULE headings with a boxed numeral.
- **Physical light sources only, in the room:**
  - ceiling fixtures FX1–FX6 (cool white `#E8EEF6`, downward cones)
  - PIR sensor LEDs (green `#3BE37A`, amber `#FFB020`)
  - orange timer buttons (`#FF7A1A`)
  - sodium streetlight through one tall window per landing (low orange `#FF9A3C`), which keeps dark scenes readable without fake glow
  - warm interior of 5B (`#FFC98A`)
- **Graphic marks** (red marker on the evacuation plan) appear only in plan inserts.
- **Protagonist (YOU):** obsidian head `#0A0A0F` with a 2.5 px white rim, white eye-dots, rounded white limbs, cobalt `#1E5EFF` hoodie. Build front, profile, seated and close-up versions before animation.
- **Neighbor and stranger:** pale gray coat `#8C96A3`, so they never read as YOU.
- **The threat:** never drawn as a creature. It is shown only through lights, LED blinks, one shadow under FX4, its shadow sweeping a wall, footsteps and the keys lifting.
- **Type:** rule headings 96 px; captions 44–48 px; diegetic labels 30–32 px; secondary markers at 0.45 opacity.
- **Voice:** ElevenLabs `eleven_v4`, *Charliee – Calm Cinematic Narrator* (as for *Two Peepholes*). The ending lines become slightly closer-miked to hint the narrator is in the building.

## 3. Reference analysis

Sources reviewed: four contact sheets supplied in this session (an animal under night-vision, a deer and house cutaway, a car and phone UI story, an elevator story with red icons) and the earlier dog-reference study. No transcripts were supplied for the four new sheets.

**Visible in the screenshots:**
- Every opening shows one concrete wrong state: an animal where it shouldn't be, a light in a window, a number on a display.
- Ordinary devices carry the rules: phones and maps, elevator floor displays, timers, door states.
- Threats are tracked spatially through cutaways, floor plans with route lines and camera grids.
- Large numerals and short rule cards mark chapters; captions are short and white.
- Colour carries meaning: red for danger or stamps, yellow for focal lights or eyes, green for night-vision modes.
- Endings return to an earlier space with something changed (for example a closing big-type line, a repeated room).

**Assumed, not verifiable from stills:** animation speed, camera moves, shot lengths, sound design, narration pace, and how each story actually ends.

**Transferred as principles, not content:** an immediate contradiction; household habits as story mechanisms; one cheap, consistent tracker; a callback to the opening frame. None of the referenced premises, creatures, interfaces, compositions, rules or wording is reused, and none of the excluded premises from the brief appear.

## 4. Title and thumbnail direction

**Title:** *If the Stairwell Light Turns On Above You, Don't Climb Into It*

**Thumbnail (original composition, not the red-panel / curved-arrow / framed-monster template):**
- **Frame:** low angle from the bottom of a flight. YOU (cobalt hoodie) in profile, one foot on the next step, head tilted up.
- **Threat signal:** the landing above is lit by its ceiling fixture, empty, with a human shadow lying on the worn patches and nobody to cast it. One green sensor LED glows beside the fixture.
- **Everything else** stays near-black so the lit landing and the cobalt silhouette read at 160×90.
- **Text** (3 words, top-left negative space): `NOBODY'S UP THERE`, with "NOBODY'S" in `#FF1E27` and the rest in `#FFFFFF`. It adds the contradiction the title doesn't state.
- It shows the film's real central image: a light on, a shadow, no one there.

(Per `CLAUDE.md`, this is a direction only; the owner makes the final thumbnail.)

## 5. Self-review (done before delivery)

| Check | Result |
|---|---|
| Originality | Not in the excluded list, not *Two Peepholes* or *Coat Check*, not any reference premise. The event sequence (motion lights as tracker, stillness as trap, swap on the landing) is new. |
| Rule logic and escalation | All seven rules use the same mechanism and each adds information. Fixed during review: Rule 3 wrongly said "Four goes dark" (four had already timed out); Rule 7 now says to step onto four slowly, because a normal step would trip the sensor. |
| Character motivation | Each break temptation is human: calling out, waving at a light, rushing, gripping keys, resting, running home, hurrying to your door. |
| Object positions and states | Keys left on the step between 3 and 4 and lifted from the same spot. Worn patches are fixed on four. Mailbox 5B uses the same framing at the start and end. Door 6B is the neighbor's, 5B is yours. |
| Light direction and blocking | Every lit area comes from a fixture, LED, button, window or the 5B interior. The impossible shadow falls under FX4. The sweeping shadow crosses the wall from FX4 behind YOU. Cones and marker lines appear only on the printed plan. |
| Grounded movement | Every action lists its contact points (rail, treads, step, newel post). Stillness is used for tension; there is no idle bobbing. |
| Narrator slip | At 2:43–2:50 of 5:14 (52%). It is tied to the ending: four is where the narrator wanted you all along. |
| Clues for the ending | Six physical clues, listed in section 1. |
| Phone readability | The tracker is a lit rectangle in a six-level stack, legible at 160×90. Captions are kept to one or two lines. |
| Close-ups | 26 of 74 scenes (35%) are object, interface or diagram extreme close-ups (target ≥25%). |
| Sentence length | 824 spoken words in 159 sentences, averaging 5.2 words. |
| Runtime | **About 5:15 provisional** (824 words at ~180 wpm plus authored holds; not verified playback). This is below the 6–8 minute target. The premise supports about 5 minutes without padding, so I kept it tight as the brief allows. |

**Departures from the house standards:** `PRODUCTION_STANDARDS.md` says to use only as many rules as needed; this brief asked for seven, so each rule was built to earn a distinct step. The 12 columns follow this brief's list, which differs slightly from the standards file's list.

## 6. Next step

Following the standards, build a **one-scene vertical slice** before anything else. Recommended: SC01–SC08, the cold open. It covers the cutaway environment, the sensor close-up, YOU's micro-action (looking up, mouth starting to call out), the light state change (four → three) and phrase captions. Then record the narration and re-time the table to the real word timestamps.
