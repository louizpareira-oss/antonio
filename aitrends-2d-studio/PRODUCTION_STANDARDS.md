# WRONG KNOCK production standards

Owner's production mandate for every rule/instruction horror film. Where this file and `STYLE_LIBRARY.md` disagree, **this file wins**: the library supplies devices and settings; this file sets the rules for story, light, character, type, editing and thumbnails.

All compositions must be 100% original: never copy competitor layouts, characters or thumbnail templates.

## 1. Visual causality (no filler)

Every rule and scene follows this chain:

1. **Recognizable normal condition:** an ordinary space, machine or routine with clear physical geography.
2. **Observable violation:** a specific visual or auditory contradiction shown before or as the narrator names it (a timer counting backward, a shadow falling the wrong way, a lock changing state by itself).
3. **The rule:** a concrete physical prohibition or procedure that directly counters the mechanism of that violation.
4. **Visible trigger signal:** how the protagonist knows the rule is active right now.
5. **Believable pressure / temptation:** a logical human reason to hesitate or break the rule. Never advance the plot through random stupidity.
6. **Consequence / escalating exception:** what happens when the rule is tested, obeyed, or complicated by a second condition.
7. **Reinterpreting final image:** pay off an exact physical clue planted in Act 1 that recontextualises the opening frame.

Writing constraints:
- No intros, greetings or throat-clearing; start on the first physical event.
- If three consecutive lines describe the same unchanged object, merge them or add a new visual state change.
- Use only as many rules as the premise needs; never pad the rule count or the runtime.

## 2. Light and texture

Every light is either **physical** or **graphic**.

- **Physical light** needs an on-screen or implied architectural source.
  - *Ceiling / room fixture:* a soft directional cone downward. It lights the top edges of props and characters and grounds them with a floor shadow.
  - *Local emissive source (clock, peephole, phone screen, LED):* a localised coloured radial falloff that lights only surfaces facing it. A solid door passes light only through a keyhole, peephole or the gap beneath.
- **Graphic rays** (dashed sightlines, red view cones) appear only in diagram / instructional cuts, to explain spatial danger. Never mix them with real room light.
- Never bake an unreadable dark scene and add a glow to rescue it.
- **Surface:** deep charcoal / void backgrounds `#07080C`–`#0E1118`, unified by a subtle vignette and low-contrast film grain. Keep grain off small UI text.

## 3. Character rig, pose and motion

- **Protagonist:** solid obsidian head `#0A0A0F` with a crisp white rim stroke (2.5 px), minimalist white eye-dots, rounded white limbs, and a **cobalt blue `#1E5EFF` torso / hoodie** so the silhouette reads at any scale.
- **Grounded physics:** feet, hands, hips and props keep contact with floors, walls and furniture. No floating silhouettes.
- **State holds:** stay still while listening, freezing or obeying; pair the stillness with an environmental change (a clock ticking, light shifting).
- **Micro-actions:** move only the joint the beat needs, e.g. a 15° head tilt toward a sound, a hand stopping 2 inches from a handle, eyelids snapping open, breathing scale 1.0–1.02.
- **Spasm / threat motion:** stepped keyframes or 2-frame ghost trails at 20% opacity, only for sudden involuntary movement or an entity violation.
- **No unchanged repeated shots:** never repeat the same framing and pose on consecutive beats unless a visible element in the frame has changed state.

## 4. Typography and HUD (at 1080p)

- One strong geometric sans display weight plus one clean supporting weight.
- **Rule headings / core revelations:** 80–110 px, uppercase, reserved for major commands or structural turns.
- **Captions:** 42–54 px, brief phrase groups synced to the spoken phrasing; never flash single words rapidly or contradict the voiceover.
- **Diegetic labels (clocks, notes, phone UI, badges):** 28–36 px, sentence case where natural, legible at reduced preview sizes.
- **Secondary file / time markers:** subtle (opacity 0.45), or omit when they add no story value.

## 5. Editing, transitions and sound

- Hard cuts for new information; short cross-fades for time or state passage; match cuts for visual comparisons.
- Glitch effects only when a glitch is a specific diegetic failure.
- Continuous, restrained room tone suited to the space.
- Mechanical foley (switches, locks, footsteps, paper) hard-synced to the exact frame of contact.
- Deliberate silence right before or during a visual contradiction. No cinematic hit on every subtitle.

## 6. Thumbnail (original, no templates)

Do not use the competitor 50/50 red box + curved white arrow + framed monster template. Build the thumbnail from the film's strongest visual event:

1. **One dominant focal point:** the cobalt-hoodie protagonist in a clear spatial relationship with the central threat or object.
2. **Readable at 320×180 and 160×90** in under a second: simplify background geometry so the threat signal (an eye, a wrong number, an open latch) and the character's reaction silhouette read on mobile.
3. **2–4 high-impact words** in `#FFFFFF` and `#FF1E27`, placed in the scene's negative space, complementing (not repeating) the title.

(The owner may still supply their own final thumbnail; follow `CLAUDE.md`.)

## 7. Required order of work

1. Output the complete **12-column scene table** before any animation or rendering code:

   `| Scene # | Story Beat | Narration | Composition & Crop | Character Pose & Joints Moved | Motion Timing & Easing | Light Source & Occlusion | Camera | On-Screen Text & Size | Sound & Sync Cue | Continuity State | Acceptance Check |`

2. Check the table against the review gates: no unmotivated shot repetition, grounded contact points, source-driven lighting, causal rule logic.
3. Build a **one-scene representative vertical slice** (environment + close-up + character micro-action + light state change + caption) to lock the look.
4. Only then render the full film.

## 8. Pro finish (added 2026-10-26 at the owner's request)

Every new film is built with `engine/pro2d.js` and checked against this list before the full render:

1. **Depth in every wide shot:** a foreground plane, a sharp subject plane and a soft, darker background (`blurLayer`, `toneAt`). Nothing floats: figures and props get a contact shadow.
2. **The camera is never dead:** a slow push or drift on every shot (`camAt`), faster only on a story beat. Parallax between planes.
3. **Volume on figures:** two-tone shading with a consistent light side per scene; rim light on portraits.
4. **One accent colour does the pointing:** red for the threat (eyes, marker circles, stamps, the rule bar); nothing else is red.
5. **Readable type at phone size:** captions over a scrim; HUD (file label, chapter boxes, running timecode) at 0.55 opacity; chapter cards with big numerals.
6. **Motion beats are designed, not incidental:** at least one group action per act (heads turning in a wave, lights failing in order), eased, with overlap between figures.
7. **Texture:** grain and vignette from the style grade; embers or dust only where the scene's light would show them.
