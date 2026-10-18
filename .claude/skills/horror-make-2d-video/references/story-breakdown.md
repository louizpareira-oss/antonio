# Story Breakdown — HORROR PROTOCOL EDITION
Read the whole transcript twice. Feel the dread. Then write `story/bible.md` (short, practical, horror-focused):

- **Logline and horror tone** (uncanny dread / building tension / existential wrongness / tech uncanny / animal uncanny), plus who "you" is (the viewer, the one in danger).
- **Cast table.** HORROR RULE: Keep cast MINIMAL. Usually just:
  - `YOU` — the viewer's proxy, faceless or minimal features, pure black with red rim light. No signature colour. Everyman.
  - `THE THING` — the uncanny element (the phone, the dog, the cat, the figure outside). Has ONE wrong visual trait (glowing red eyes, moves wrong, doesn't cast shadow).
  - `SUBJECT` (optional) — someone from a "field report" who broke the rule. Shows what happens.
  - `VOICE` (optional) — distorted, off-screen, or from the wrong thing.
  For each: id, role, outfit `{top, color, head, headColor, face, legs, gloves, kid}`, wrong trait, and the expressions they use most (mostly `dead, empty, stare, terrified, calm_wrong`). Put the outfits in `scenes/cast.js`.

- **Locations (sets) — MADE WRONG.** For each: name, horror mood (`abyss|bloodmoon|night|midnight|void|interiorCool`), where the WRONG light comes from, the window/view (what's wrong with it), 3-6 signature props (one of which is subtly impossible), the wrong layers (sky → wrong far → mid → floor → foreground wrong element).
  - Every location needs at least one "WRONG detail" that gets its own close-up shot.

- **Horror Motifs:** recurring visual devices tied to the story:
  - `THE RULE` displayed as blood-red ALL CAPS warning text
  - Glitch frames / scan lines at moments of peak wrongness
  - Static particles in the air
  - A colour that marks danger (usually blood red)
  - The uncanny thing's signature wrong trait (e.g., phone always glowing even when "off")
  - "Field Report" navy blueprint look for protocol explanations
  - Empty spaces — the camera lingering where nothing is, but something should be

- **Horror Protocol Arc / music plan:** the 8 story beats with a horror mood and intensity (sound-design.md). Change sections at each protocol turn.

Then **rewrite `story/shots.json`** (schema in engine-api.md). For every shot set:
`id, start, end, line, scene` (one concrete sentence describing the picture AND WHAT IS WRONG, e.g. "Medium: You stand in kitchen. Phone on counter glows too bright. Battery reads 101%. Clock hand moves slightly wrong."), `set`, `bars`, `in` (transition — use `glitch` for horror reveals), `sfx`, `amb`, `notes`.

## Horror Pacing Rules
- Shots are **contiguous**: each `end` equals the next `start`. The first starts at 0 and the last ends at `duration`, which is the voiceover length plus about 1.5 s.
- Cut on phrase boundaries. Start a shot **0.1-0.2 s before** the phrase it illustrates.
- **HORROR PACING IS DUAL:**
  - **DREAD BUILDUP:** Longer holds of 4-8 seconds on unsettling details. Let the viewer stare at the wrongness. Let their imagination fill in the horror.
  - **TERROR / SCARE:** Quick cuts of 0.5-1.5 seconds for glitch moments, jump scares, the thing fighting back.
  - **PROTOCOL STEPS:** Medium pace of 2-4 seconds per step, clear and instructional.
- **Never go beyond ~12 seconds** without a new camera angle or visual element — but a single unsettling close-up CAN hold for 8 seconds if it's wrong enough.
- Every new location opens with an **empty establishing shot** (wide 2D or 3D, NO figures — let the emptiness breathe).
- Expect roughly **12-20 shots per minute** of narration. Horror needs TIME to breathe. Fewer shots = more dread.

## The 8-Beat Protocol Arc — Shot Allocation Guide
For a typical 5-6 minute video (300-360 seconds):

| Beat | Time | Shots | Purpose |
|------|------|-------|---------|
| 1. COLD OPEN — Uncanny Moment | 0:00-0:30 | 4-6 | Drop into wrongness. Show the familiar thing behaving impossibly. End on first warning. |
| 2. THE RULE | 0:30-1:00 | 3-4 | Establish THE RULE clearly. Red warning text. Visualize it. |
| 3. WHAT HAPPENS IF YOU BREAK IT | 1:00-2:00 | 6-10 | Field reports. Dread building. Wrongness revealed. |
| 4. THE PROTOCOL — Step by Step | 2:00-4:00 | 10-16 | Core instructional section. 4-6 steps, each visualized clearly. |
| 5. THE TEST / Push Back | 4:00-5:00 | 5-8 | Tension peak. The thing fights back. Tricks you. |
| 6. SURVIVAL / Aftermath | 5:00-5:30 | 3-4 | How it ends. Never quite right. Trace remains. |
| 7. STING / Next Protocol | 5:30-5:45 | 1-2 | Hint this isn't isolated. Open door to next video. |
| 8. CTA | 5:45-6:00 | 1-2 | End screen. Question + subscribe. |

Give the user a 5-10 line summary: the uncanny trigger, THE RULE, the wrong locations, the number of shots, and the horror highlights per protocol beat. Continue unless they object.
