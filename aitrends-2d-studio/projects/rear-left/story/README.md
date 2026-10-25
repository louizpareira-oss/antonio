# Rear Left — production plan (WRONG KNOCK)

Files in this folder:
- `README.md` — premise, the four upgrades, mechanism, look, reference notes, self-review (this file)
- [`script.md`](script.md) — complete narration, word for word; lines starting with ▸ are directions, not spoken
- [`scene_table.md`](scene_table.md) — 74 scenes in the 12 required columns, with provisional times
- [`description.md`](description.md) — 6-block YouTube description, title, tags, chapters, thumbnail direction
- `stats.json` — computed word count, runtime estimate, close-up count, breach position
- `build_package.py` — regenerates the script, table and stats from one data source and fails if a framing repeats unchanged

## 1. Premise and mechanism

**Logline:** *If your car says a door is open, don't pull over.*

You pull away from pump six and a red door icon lights on your dashboard: rear left, the door behind you, the one nobody uses. It doesn't flicker on bumps. It stays steady at sixty. The narrator's rules keep you driving.

**What is really happening (never drawn, only shown through the car):** while you paid, something opened the rear-left door, sat down behind you and pulled the door to without latching it. The door warning only wakes above 5 mph, so the dashboard stayed dark until you were already moving with it on board. Every rule the narrator gives keeps the car **moving and sealed**, and it treats every warning as something *outside* the car.

**The threat tracker** is the car's own sensor chain, one cheap icon at a time:

| Stage | Sensor | What it really means |
|---|---|---|
| 1 | `RL` door-ajar segment (red) | It is holding the rear-left door from inside. |
| 2 | Rear-left seatbelt unbuckled + chime (Rule 4) | Something heavy is sitting behind you. |
| 3 | `PASSENGER AIRBAG ON` lamp (Rule 6) | It has moved to the seat beside you, without climbing over the console. |
| End | Every door segment dark, airbag still ON | It is in the car with you, buckled in. |

## 2. The four mandatory upgrades, and where they land

| # | Upgrade | Implemented in |
|---|---|---|
| 1 | **Audio hijack instead of a verbal stumble.** | SC42–SC44 (2:23–2:34, 53% in). The narrator's *own* voice suddenly comes out of the car speakers; the centre screen shows `Incoming audio / Unknown device` with a live waveform: "Pull over under the next streetlight. Get out and check the rear-left latch yourself." A 4-frame static cut (picture and sound together, a diegetic failure), then the narrator, dry and level: "Please disregard that last instruction. Do not take your foot off the gas." SC45: you pass that streetlight without slowing. |
| 2 | **Weight-sensor escalation.** | Door-ajar icon (SC01) → rear seatbelt-unbuckled chime at the red light (SC35) → in Rule 6 the rear seat light goes out (SC48) and `PASSENGER AIRBAG: OFF → ON` (SC49). The 2-lb bag tips into the footwell and the seat sinks (SC50); the console lid is shut and the coffee unspilled (SC51), so nothing climbed over. |
| 3 | **Sharper complicity ending.** | Rule 1 makes you press Lock All (SC07). The ending: the light only wakes above five miles an hour (SC66); the door was open before you started the car, opened while you paid (SC67); "You pressed Lock All. You locked it in with you." (SC68); every rule kept the car moving and sealed, all the way into a closed garage (SC69). Then Rule 4 pays off: in the sealed garage, park unlocks every door (SC63). |
| 4 | **Thumbnail text `DON'T PULL OVER`.** | `description.md`, thumbnail direction: `DON'T` white, `PULL OVER` red, over-the-shoulder on the hands gripping the wheel and the glowing red rear-left door icon. |

## 3. The seven rules

Each rule starts from a driver's micro-habit and is a step in keeping the car moving and sealed.

| # | Micro-habit | Rule | Narrator's reason (cover story) | What it actually does |
|---|---|---|---|---|
| 1 | Pull onto the shoulder and slam the door | Don't pull over. Lock all doors. | "Something is holding that door." | Locks it inside with you. |
| 2 | Braking for the off-ramp | Keep the needle above twenty. | A hand outside "needs you slow to pull it open." | Keeps you from stopping and getting out. |
| 3 | Thumbing the dome light to glance back | Don't turn on the dome light. | "A lit cabin shows it which seat you're in." | Keeps you from seeing the back seat. The warning jumps to *your* door when you reach. |
| 4 | Shifting into park at a long light | At a red light, never shift into park. | "Your car unlocks every door in park." | Keeps every door locked until the garage is shut. |
| 5 | Fixing a mirror that's been moved | Don't touch the mirror. | "See a face at the rear window, and you'll brake." | The mirror now points at the roof, so you can't see the seat. **Midpoint breach** follows. |
| 6 | Reaching over to steady the passenger seat | Passenger airbag light on? Both hands on the wheel. | "It's leaning on the passenger door." | Keeps your hand off the seat it's sitting in. |
| 7 | Stopping in the driveway and running for the house | Close the garage before you open your door. | "Out there, every door is a way in." | Seals you in with it. Only then does the narrator let you shift into park. |

**Payoff clues seeded on screen (all physical):**
1. SC01: the icon lights at exactly 5 mph, not at 0 (paid off in SC66).
2. SC10: a car door thunks outside while you pay (paid off in SC67).
3. SC11: the dome light is still fading when you walk back to the car (SC67).
4. SC13: the rear-view mirror was tilted down at the dented rear-left cushion (SC39 shows it moved again).
5. SC14: a 1 cm gap along the rear-left door edge as you roll out (SC67, SC68).
6. SC08: the fourth lock click (rear left) is the quietest (SC68: its door isn't latched).
7. SC29: a streetlight sweep shows the rear-left cushion dented with nothing on it.
8. SC12: the bag is on the *front* seat, so the rear belt chime can't be the bag (SC35–SC36).
9. SC46: fog on the *inside* of the rear window.

All names, places and events are fictional. There are no case files, recordings, institutions or statistics.

## 4. Look and production rules

- **Standards:** `aitrends-2d-studio/PRODUCTION_STANDARDS.md` (cobalt-hoodie rig, physical vs. graphic light, type sizes, vertical slice before full render).
- **Primary look from `STYLE_LIBRARY.md`:** *City night / phone UI*. Black base, crisp white line art, **dashboard POV**, **car side view with headlight beams**, a screen as evidence (the centre screen's map and the breach call screen), yellow-amber for lights that matter, red for prohibitions, RULE cards with a boxed numeral.
- **Borrowed devices:**
  - *Red elevator / icon rules:* the dashboard's own icons carry the threat. Each escalation is a single bold glyph (door, seat-and-belt, airbag lamp).
  - *Shared devices:* one hard static break, used once and only as a diagnosed failure (the breach).
  - *House cutaway:* a side cross-section of the cabin (SC29) so driver and rear seat read in one frame.
- **New reusable assets to build** (listed as "not built yet" in the library): car side view, dashboard POV / instrument cluster, centre screen with map and call states, waveform line, garage interior.
- **Physical light sources only:**
  - instrument-cluster backlight (cool white `#E8EEF6`, from below)
  - headlight cones
  - sodium streetlamp pools sweeping the cabin (`#FF9A3C`)
  - gas-station canopy LEDs (cool white)
  - traffic signal (red `#FF2A2A` / green `#3BE37A`)
  - dome light (warm `#FFC98A`)
  - centre screen (blue-white `#9FC4FF`)
  - garage opener bulb (warm) and visor remote LED (red)
  - dashboard glyphs: door-ajar `#FF1E27`, belt amber `#FFB020`, airbag lamp amber
- **Graphic marks:** none in this film. Every light is physical, and the static is a diegetic failure.
- **Protagonist (YOU):** obsidian head `#0A0A0F` with a 2.5 px white rim, white eye-dots, rounded white limbs, cobalt `#1E5EFF` hoodie. Build driver-seat front, three-quarter, profile, foot and hand close-ups before animation. Hands stay in contact with the wheel unless a beat says otherwise.
- **The threat:** never drawn. It exists only as sensor states, a dent, fog on glass, a moving mirror, a latch click and a belt pulling across nothing.
- **Type:** rule headings 96 px; captions 44–48 px; diegetic labels (dash readouts, screen text, signs) 28–36 px; secondary markers at 0.45 opacity.
- **Voice:** ElevenLabs `eleven_v4`, *Charliee – Calm Cinematic Narrator*. The two breach lines (SC42–SC43) use the **same voice**, generated as a separate clip and processed in the mix as car speakers: band-limited (about 200 Hz–6 kHz), short cabin reflections, road noise not ducked. The correction (SC44) returns to the dry narration mic.

## 5. Reference notes

- **Cadence:** modelled on the *101% Phone* script in `examples/phone-101-percent/input/script.txt`: short declarative lines, "Everyone does.", a habit named and then stopped ("Don't."). The *Spider* script is not in the repository, so it was not consulted directly.
- **Looks:** the four contact sheets in `STYLE_LIBRARY.md`. Only conventions were borrowed: dashboard POV, icon-as-rule, screen-as-evidence, a single static break, rule cards. No premise, creature, interface layout, rule or wording from any reference is reused.
- None of the excluded premises (spiders over beds, horses in driveways, laughing theaters, classroom notes, impossible battery percentages) appear.

## 6. Self-review (done before delivery)

| Check | Result |
|---|---|
| Originality | A car's own sensor chain (door → rear belt → passenger airbag) as the tracker, a narrator who seals you in, and a same-voice breach. Not a reference premise, not an excluded one, not *Two Peepholes* or *Stairwell Lights*. |
| Rule logic and escalation | Every rule keeps the car moving or sealed, and each adds information. Fixed during review: Rule 2 originally relied on auto-lock above 20 mph, which made no sense after Lock All; it now says Lock All can't hold an unlatched door. Rule 5's mirror now points *up* at the roof (not down), so obeying it really does keep you from seeing the back seat. The rear-left light now goes out with a latch click when nothing is holding the door. |
| Character motivation | Every temptation is a real driving habit: pulling over, braking for a ramp, the dome light, park at a long light, fixing a mirror, steadying a bag, running for the house. |
| Object positions and states | Bag on the front passenger seat (SC12) → footwell (SC50) → still there (SC71). Coffee in the holder (SC07, SC12, SC51). Mirror: down (SC13) → fixed → up at the roof (SC39), never touched again; the garage is watched in the *side* mirror (SC61). Selector in D from SC32 until SC63. |
| Light direction and blocking | Every lit surface has a listed source. Dark scenes stay readable through the cluster backlight and sweeping sodium pools, not added glow. |
| Grounded movement | Contact points are listed for every action (wheel rim, pedals, heel on the mat, buttons, selector knob). Stillness is used for tension; there is no idle bobbing. |
| No unchanged repeated shots | Enforced by `build_package.py`: no framing is reused unchanged, consecutive or not. The ending's callbacks (SC66–SC69) are re-framed, each with a new visible element. |
| Narrator slip / breach | 2:23–2:34 of 4:31 (53% in). Two sentences, then the static cut and the correction, word for word as requested. Paid off in SC70: "One instruction could have saved you. You were told to disregard it." |
| Clues for the ending | Nine physical clues, listed in section 3. |
| Phone readability | Tracker states are single large glyphs on a dark cluster; captions stay to one or two lines; rule cards have one command each. |
| Close-ups | 36 of 74 scenes (48.6%) are object, interface or diagram extreme close-ups (target ≥25%). |
| Sentence length | 722 spoken words in 163 sentences, averaging 4.4 words; the longest is 10. |
| Runtime | **About 4:31 provisional** (~180 wpm plus authored holds; not verified playback). This is below the brief's 6–8 minute range. Seven rules plus the reveal fill about four and a half minutes without padding, and the standards say never pad. |

## 7. Next step

Following the standards, build a **one-scene vertical slice** before anything else. Recommended: **SC42–SC44, the breach**. It needs the dashboard environment, the centre-screen asset, a character close-up micro-action (eyes flicking to the screen), a light-state change (blue screen light rising on YOU's cheek) and captions, and it tests the same-voice speaker processing. Then record the narration and re-time the table to the real word timestamps.
