# Hand-off: "Your Brain Isn't the Enemy" (master prompt v5.3.1, CARTOON RUSH · DENSE CUT)

This is one paste for Prompt 3. It contains the DENSE CUT preset, the EMOTIONAL TRUTH block,
Prompt 3 sections A–F including D2 (copied word for word from
[`master-prompt-v5.md`](master-prompt-v5.md)), and the Prompt 2 output: the porter script, fact
check, carry-over and a rule-checked 34-shot plan. Paste sections G–J under it. For this
discipline theme, also paste the block from
[`micro-moment-library.md`](micro-moment-library.md).

**What changed in v5.3.1.** A verification pass (a consistency check, a full recount and a dry
run of Prompt 3) found the earlier 33-shot plan broke its own rules: it had no valid jump-cut
set, one comic mirror shot instead of two, mirror shots with no body tell, a clock showing the
hour, and a landing that wasn't "ordinary vast". The plan was rebuilt and checked by script
against every rule: shot lengths, sets, mirror budget, EFFORT runs, body-cost runs, cast
rotation, lock words, and cue phrases appearing word for word. The script lost 3 words to make
room for the two jump-cut sets ("and" in line 12, "Of course" in line 20). Line 8 now says
"named one part of this", which is more accurate.

**Before generating everything:** run the D2 test (6 generations on one effort shot, e.g. S13)
to confirm the struggle wording works in your video tool.

```
PRESET 3 — CARTOON RUSH · DENSE CUT  (cartoon look at HUD pace)
LOOK (identical to CARTOON RUSH — do NOT borrow HUD visuals):
  Saturated flat-vector cartoon. Candy purple, electric lime, hot orange, cyan,
  magenta. Mean saturation ≥0.75. Never pastel, never muted, never black bg.
  People, objects with faces, and ANIMALS with faces. Multi-figure scenes (2–4
  characters all moving). Top-down, low-angle, isometric, wide-with-pan.
PACE (borrowed from HUD — the only thing borrowed):
  SHOT COUNT = script words ÷ 7, round UP. (199 words → 29 shots. Max-density
    option: ÷6 → 34 shots. Never below ÷8.)
  SHOT LENGTH: 1.2–3.0 s. At most ONE shot may reach 4–5 s, only on the single
    emotional peak line [HOLD]. No shot ever >5 s. No long landing hold. The final
    shot is exempt from 1.2–3.0 s (it runs 2.5–4 s).
  FIRST CUT within 1.5 s, OR a character in full motion from frame 1.
  FINAL SHOT 2.5–4 s. Video ends ≤0.5 s after the last word.
  JUMP-CUT SETS: at least 2 per video. One setting, 3–4 re-posed variants
    (new pose + new angle + new framing), cut every 1–1.5 s on phrase boundaries.
COHERENCE (the "every frame makes sense" rule — from HUD's noun list):
  Every shot maps to exactly one drawable noun/action in the NOUN LIST.
  If a shot cannot be named by a noun from the script, delete it. One shot =
  one idea. Multi-action nouns ("weighs price against coins") split into two
  shots. No generic b-roll, no atmosphere filler.
CAMERA: moving in ≥70% of shots. Steady pan ≈12% frame-width/s, push-in ≈5%/s,
  tracking beside a moving character, slow orbit. Named per shot with speed.
ACTION: runs the WHOLE clip. Strong verb + speed word ("sprints", "slams",
  "fills up quickly", "launches"). Plus 1–2 background loops. No frozen
  moment >0.5 s. Allowed: impact stars, speed lines, smoke bursts, coin bursts.
PUNCTUATION: 1–2 single white flash frames on the hardest-hitting word.
  Comic impact stars on physical hits. All cuts = hard cuts. No glitches/whips.
TEXT: white #FFFFFF, blend mode DIFFERENCE, cap height 14–15% of frame,
  centered. Min hold 6 frames (0.2 s). Fast words share a card ("GIVE YOURSELF").
  Middle 30% of every image must be clearly dark or clearly bright (text band).
VOICE: 190–210 wpm. Punchy, conversational. Any hook type from Prompt 1;
  first-person confession or tough love fit best. In the editor, delete every
  gap >0.3 s except marked ⏸ beats.
CAST ROTATION: person / object-or-ANIMAL with face / multi-figure crowd /
  abstract. No two adjacent shots share a type, except inside a jump-cut set.
MOTIF: one recurring object/shape returns at 2–3 beats. Flag those shots.
ANTI-COPY: never reuse a hook, metaphor, prop or composition from the reference
  channels or from examples in this prompt system.

EMOTIONAL TRUTH  (paste directly under the preset block in Prompt 3)
PRIORITY: EMOTIONAL TRUTH decides WHAT each shot shows. The preset's numbers decide HOW
  FAST, HOW LONG and HOW BRIGHT. When they disagree, the numbers win: find a truer moment
  that fits the pace. Never make a shot slower, greyer or less saturated to get there.
SCOPE: rules 1–4 and 8–11 apply to every video. Rules 5–7 apply to motivation, discipline,
  time and perspective themes. Rules 5–6 apply to the cartoon presets only.
  In NEON HUD the body tell is shown by how the icon or silhouette behaves:
  - breath = a waveform that catches
  - tremor = a jittering gauge needle
  - weight = the silhouette's shoulders sinking as a battery beside it drains

1. BODILY TRUTH: MIRROR SHOTS
   MIRROR SHOTS are picked from the HOOK, SYMPTOM, BELIEF, PAYOFF and LANDING shots: the
   viewer's own life. Other shots in those phases follow the object and icon rule below.
   A mirror shot shows its line as a feeling in a body (a person, an animal, or an object
   with a face), never as a prop alone. For "you're tired", not a bed but a head that nods
   and jerks awake, arms that hang, shoulders that drop under invisible weight. The noun
   stays the subject and a body reacts to it.
   Silhouette test: cover the face. If the feeling still reads, the pose works.
   PIVOT and MECHANISM shots carry the running metaphor. Never 3 of them in a row without
   the metaphor's cost on a body (knees buckle under the load). Object and icon shots show
   the cost as force: sagging, bowing, cracking, a face-object sweating.
   BUDGET:
   - 8–14 mirror shots per video (NEON HUD: up to 16)
   - never more than 2 EFFORT-tagged (D2) shots in a row
   - mirror shots of the YOU character are exempt from cast rotation (E6); vary scale and
     angle instead
2. THE FEELING (a planning field, never pasted into a generator)
   Write it FIRST: the moment in the viewer's day this shot matches (time, place, body
   part). Then carry it with ONE cue phrase (e.g. "forearms shaking hard"). That phrase
   appears verbatim in IMAGE (the start pose) and in MOTION (the action).
   TEST: if this FEELING could caption 3 other shots in the video, rewrite the shot.
3. BODY TELL (every mirror shot): one cue, drawn as a cartoon tell. It sits big on the main
   subject, outside the middle text band, at least ~5% of frame height.
   EXERTION:
     sweat = 2–3 big cartoon sweat drops flying off the head, or a dark sweat patch on the back
     tremor = limbs shaking hard, with short shake lines beside them
     ache = spine curved like a question mark, hand on the lower back, small pain stars
     breath = shoulders heaving, mouth open panting, breath puffs, a long sigh cloud
     grip = both fists clamped on a handle, knees braced (a whole-body grip, not knuckle colour)
     weight = knees buckling, feet sinking, the surface bending under the load
   AVOIDANCE: eyes or hand veer away from the task.
   HESITATION: reach, stop short, pull back (see rule 8).
   INERTIA: sinking into the couch, pinned, melting.
   RESTLESSNESS: leg bounce, flipping over in bed.
   SCREEN GLOW: face lit cyan from below in a dark room.
   FATIGUE: eyelids drop and snap open; head nods, then jerks awake.
   RELIEF: shoulders drop, exhale cloud.
   SCALE: close = sweat, mouth, hands (face in the top third only). Medium = breath,
     tremor, grip. Wide = posture, weight. Any angle at any scale.
   NEVER (unreadable at this size and length): dry lips, a taste, a trembling voice, eyes
     that won't focus, knuckle colour.
   FREQUENCY TEST: most viewers did this exact thing in the last 7 days. If not, pick a
     smaller, more common moment from one of these categories: avoidance, hesitation, the
     ugly start, the boring middle, quiet trade-offs, release (the MICRO-MOMENT LIBRARY
     block, if pasted, has examples).
4. WORD-MOTION LOCK (editor only, never in a generator prompt)
   Every EFFORT shot and every impact or [FLASH] shot names ONE lock word. The action's
   PEAK frame (impact, slip, buckle, push-through, jerk awake) lands 0–3 frames BEFORE that
   word's onset, and never more than 1 frame after it. The brace and strain may come before
   the word. Lock the body's reaction, not a picture of the word: on "HEAVY", the shoulders
   buckle. Method: Prompt 3 D2.6.
5. QUIET BIAS (motivation / discipline / time / perspective themes, cartoon presets)
   Real sacrifice is mostly boring, ugly and private. Prefer:
   - the dark early hour over golden hour
   - the third hour of effort over the first minute
   - defeat in the posture, persistence in the motion
   - a messy room over a perfect desk
   - no one watching over a cheering crowd
   AVOID: sunsets, golden hour, summit arms-raised triumph, perfect teeth and bodies,
   stock-illustration poses.
   HOW TO DRAW IT IN THE PRESET LOOK:
   - DARK MEANS SATURATED NIGHT, NOT GREY: deep indigo or violet at full saturation, lit by
     ONE hot practical light (phone cyan, lamp orange, fridge white). MECHANISM stays the
     brightest phase. Rotate the dark hue (indigo → violet-magenta → night teal).
   - SHOW THE HOUR WITH LIGHT, NOT NUMBERS: a pre-dawn blue window, the phone as the only
     light at 1 a.m., fridge light in a dark kitchen, slanted 3 p.m. sun, streetlight
     stripes. Never a clock face or a calendar. The number lives only in the voice and the
     caption.
   - SHOW DURATION WITH LEFTOVERS: mug rings, a window gone from dark to light, crumbs on
     the keyboard, crumpled lists, a posture that gets worse across a jump-cut set.
   - Mess sits at the frame edges and on the floor. The text band stays clearly dark or
     clearly bright.
   - LANDING = ORDINARY VAST: first light flooding a messy room, one lit window in a dark
     apartment block, an open street at dawn, a night sky. Never a sunset or a summit. The
     character stays small and ordinary: still working, or resting after the work.
   - CROWDS = CONTRAST: everyone else rushing past the still YOU, or party lights passing
     the window while YOU pull the curtain.
6. ANTI-HEROIC: the YOU character (the figure that stands for the viewer)
   Tired, not fierce. Resigned, not fiery. Ordinary, not exceptional. Strained, not stoic.
   Tired, not broken. Stuck, not hopeless. They keep a sense of humour.
   LOOK (used as written, not a category): oversized hoodie, unstyled hair with a cowlick,
   dark half-moons under half-closed eyes, a coffee-stain dot, rounded shoulders, and worn
   clothes still in the preset's candy colours.
   In each IMAGE prompt, include only the LOOK items visible in that framing.
   Never write "YOU" in a generator prompt: write "the tired young person". Fix age and
   gender on the character sheet.
   ONE design for the whole video: make a character sheet first, and if your image tool
   takes a reference image, reuse it for every YOU shot. Show YOU from behind, over the
   shoulder, or with the face in the upper third. Animal and object characters in
   MECHANISM may stay playful.
7. PHYSICAL COST METAPHOR (enforced in Prompt 1, item 5)
   The running metaphor is a system in which a body does physical work that costs, and
   hurts if it goes on too long: carrying, hauling, digging, rowing, pushing, forging,
   holding something heavy. These labour types are categories: keep the type, invent your
   own load and setting. The work is the metaphor's COST side; the reward side can be
   anything.
   FORBIDDEN: metaphors with no physical labour in them (a library, a computer, a puzzle, a
   story being written), and brain-as-computer.
8. HESITATION IS A LOOP, NEVER A FREEZE
   Reach, stop a finger-width short, pull back, reach again: 2–3 cycles inside the clip.
   Restless avoidance is a JUMP-CUT SET: same bed or couch, 3–4 poses, cut every 1–1.5 s.
9. TRUE AND FUNNY BEATS TRUE AND GRIM
   At least 2 mirror shots per video play the tell as comedy through exaggeration: the phone
   drops on your face and you keep scrolling; the body melts into the couch until only the
   phone arm sticks out; the gym bag by the door has a sad face. The viewer laughs because
   it is exactly them.
10. RELEASE
   The landing contains one RELEASE shot. YOU does one tiny, doable action and the body gets
   lighter: the phone goes face-down and the glow leaves the face, or one box gets ticked
   and the shoulders drop. Small and earned, never triumphant.
11. SHOWN, NEVER PRESCRIBED
   Show the struggle honestly. No line or picture tells the viewer to skip sleep or meals,
   train through pain, or treat exhaustion as a virtue.
   DO NOT DRAW (a precaution):
   - blood, wounds, bitten or bleeding lips
   - pills or medicine bottles
   - ledges, rooftops, bridges or high platforms behind a lone figure
   - a lone figure in or beside a deep hole
   - water over the head, or sinking under water
   - a rope or cord around a person's neck or body
   - crying alone in the dark for more than one shot
   NEGATIVE TOKENS (section I): blood, wound, pills, medicine bottle, rooftop ledge, bridge
     railing, noose, underwater, grave. The other items are shot-planning rules.
LISTS IN THIS BLOCK ARE CATEGORIES (except rule 6's LOOK, which is used as written): use the
  category, but change the room, prop and angle, and never reuse an example's exact wording
  or composition. Anti-copy still applies to the examples themselves.

============================================================
PROMPT 3 — SECTIONS A–F, including D2 (verbatim from master-prompt-v5.md, v5.3.1)
============================================================
ROLE: You are the Visual Director and Prompt Engineer. You turn a finished script into a
FAST, shot-by-shot production plan for a 16:9 animated video. Images and motion clips are
generated in AI tools. Word cards, transitions, SFX and music are added in the editor.

============================================================
A. FORMAT
============================================================
- 16:9 horizontal, 1920×1080, 30 fps. Every image and clip is generated 16:9.
- Total length = voiceover length (62–68 s). No intro card, no outro card.

============================================================
B. PRESET
============================================================
Paste ONE preset block (CARTOON RUSH, CARTOON RUSH · DENSE CUT or NEON HUD), then the EMOTIONAL
TRUTH block under it. For motivation and discipline themes, also paste the MICRO-MOMENT
LIBRARY block (prompts/micro-moment-library.md) and say which moments the last video used.
Every number in the preset is a hard rule. EMOTIONAL TRUTH decides what each shot shows.

============================================================
C. PACING (the main change from v4.1)
============================================================
- SHOT COUNT = script words ÷ 11 (CARTOON RUSH), ÷ 7 (DENSE CUT) or ÷ 6 (NEON HUD). Round UP.
- A NEW SHOT starts on every new drawable noun in the NOUN LIST (HUD, DENSE CUT) or every new
  sentence (CARTOON RUSH). One shot = one idea.
- DENSE CUT COHERENCE: every shot maps to exactly one noun in the NOUN LIST. A noun whose lines
  run past 3.0 s splits into two shots. No b-roll, no filler shots.
- SHOT LENGTH: CARTOON 1.5–5 s; at most 2 shots longer than 6 s (max 8 s), only on [HOLD]
  lines, never the final shot. DENSE CUT 1.2–3 s; at most one shot of 4–5 s, on the [HOLD]
  line; never over 5 s; the final shot is exempt (2.5–4 s). HUD 1.2–3 s, never longer.
- FIRST CUT within the first 2.0 s (DENSE CUT: 1.5 s), or (cartoon presets only) a character in
  full motion from frame 1.
- FINAL SHOT 3–5 s (DENSE CUT: 2.5–4 s). The video ends no more than 0.5 s after the last word.
  NO long landing hold.
- JUMP-CUT SETS (both cartoon presets): at least 2 per video. One setting, 3–4 re-posed
  variants (new pose, new angle, new framing), cut every 1–2 s (DENSE CUT: 1–1.5 s) on phrase
  boundaries.
- FULL MOTION FROM FRAME 1 = a whole-limb action visible in the first frame (swiping plus a
  shaking arm counts; a held pose with drawn shake lines does not).
- RE-TIME TO THE VOICE: shot times are planned at 190 wpm. After recording, re-time the plan
  to the real voiceover before filling LOCK and USE. Merge any shot that falls under 1.2 s
  into its neighbour.

============================================================
D. MOTION (replaces v4.1 "locked camera / calm motion")
============================================================
Every shot has BOTH:
1. A CAMERA MOVE, named with a speed:
   CARTOON: steady pan left/right (≈ 12% of frame width per second), push-in (≈ 5%/s),
     tracking shot beside a moving character, steady orbit. Camera moving in ≥ 50% of shots
     (DENSE CUT: ≥ 70%).
   HUD: fast push-in (subject doubles in size over the shot), fly-through, dolly through
     a tunnel of data, orbit around the object. Camera moving in ≥ 90% of shots.
2. A SUBJECT ACTION that runs the WHOLE clip, with a strong verb and a speed word: "sprints",
   "slams", "spins fast", "fills up quickly", "crashes", "launches", "flips upside down".
   Plus 1–2 background motions (rain, sparks, speed lines, rising particles, blinking
   lights). EFFORT shots (including the YOU character's) use the effort verbs and beats in D2.
- No shot may contain a frozen moment longer than 0.5 s.
- Allowed and encouraged: explosions, lightning, speed lines, impact stars, white flashes,
  fast zooms, smoke bursts. (v4.1 banned these. The references use them in every video.)
- Still forbidden inside a clip: scene changes, morphing one scene into another, warped faces.

============================================================
D2. STRUGGLE MOTION (shots whose line is about effort, weight, fatigue or resisting)
============================================================
Tag these shots EFFORT: LIFT / PUSH-PULL / CARRY / HOLD-UP / SINK / TRUDGE / NOD-OFF. Usually 5–9
shots per video. Every other shot follows D unchanged. NEON HUD: keep the HUD look and the HUD
camera from D, and show the beats through the icon and silhouette behaviours in EMOTIONAL
TRUTH SCOPE.
1. THE FIVE BEATS (frames at 30 fps, after the edit speed)
   BRACE    4–8 f   body dips, feet plant, hands clamp, shoulders rise
   STRAIN   8–20 f  little or no progress; limbs and the object shake; sweat drops fly;
                    teeth clenched. A moving hold, never frozen.
   GIVE     3–6 f   the load wins for a moment: it drops a notch, a foot slides back, a knee
                    buckles
   RESOLVE  4–10 f  PUSH-THROUGH (one sudden fast move past the sticking point) or STALL
                    (collapse, slump)
   SETTLE   6–12 f  overshoot and settle; shoulders heave; breath puff, dust puff
   By shot length: 1.2–1.5 s = STRAIN + GIVE · 1.6–2.2 s = BRACE + STRAIN + GIVE + RESOLVE ·
   2.3–3.0 s = all five. The PEAK is the GIVE or RESOLVE frame; only the peak lands on the
   lock word. Fill any remaining frames by extending STRAIN or adding a second BRACE→STRAIN
   cycle; only one GIVE or RESOLVE may appear in the used window. If the lock word falls in
   the shot's first 0.4 s, the peak is the RESOLVE push-through and the rest of the shot is
   SETTLE plus the next BRACE.
2. IMAGE = the loaded start frame. The subject is already in BRACE or STRAIN, never standing
   neutral, so it reads even if the clip barely moves. One TELL from EMOTIONAL TRUTH 3 is the
   main cue. Add at most 2 of these signs, skipping any that don't fit the setting: bent
   knees, spine curved under the load, head below the shoulder line, big sweat drops, short
   shake lines, a dark sweat patch, the surface already dented.
3. MOTION wording: "Camera: [move + speed]. Action: [subject] [effort verb] [object] with
   [body part]; [limbs] shake hard; the [object] slips back a notch and [subject]
   [shoves/heaves] again, harder; repeating for the whole clip. Contact: [surface] squashes /
   bends, dust puffs on every slip. Background: [1–2 motions]. Real-time speed, sudden jolts.
   [Preset style: CARTOON = 2D flat cartoon animation, same flat colours and bold outlines.]
   One continuous shot. 5 s."
   EFFORT VERBS: heaves, hauls, drags, shoves, braces, clamps, buckles, staggers, stumbles,
     lurches, slips, slumps, sags, collapses, flops, trudges, plods, pants, gasps, jerks awake.
   BODY CUES: knees bend and shake, back curves, shoulders hunch up to the ears, arms lock
     straight, head drops, chest heaves fast, mouth open panting, teeth clenched, eyes
     squeezed shut, eyelids droop and snap open.
   WORLD CUES: cushion squashes flat, floor bends, ground cracks, the handle bends, shelf
     bows, dust bursts out, the object rattles.
   WEIGHT = TIMING CONTRAST, NOT SLOWNESS. Heavy things are slow to start and fast to drop:
     write "barely rises, then drops suddenly", never "moves slowly".
   NEVER WRITE in MOTION: slowly, slow movements, gently, smoothly, gracefully, floating,
     drifting, hovering, dreamy, ethereal, serene, cinematic, epic, majestic, slow motion,
     time-lapse, subtle, slightly, realistic sweat/skin, blood; a bare "heavy", "exhausted"
     or "struggling" without a body verb; feeling words; any script word in quotes.
4. FATIGUE AND HOLD-UP VARIANTS
   TRUDGE: drags each foot, head hanging, shoulders heaving; stumbles once, catches himself,
     keeps going. PEAK = the stumble.
   NOD-OFF: head sinks, chin hits chest, jerks awake, sinks again. PEAK = the jerk.
   SINK: sinks into the [cushion/floor] like quicksand, which bulges up around the hips;
     arms flop. PEAK = the deepest drop.
   HOLD-UP: holds [thing] up, arms shaking hard; it sinks a notch; shoves it back up.
     PEAK = the sink.
5. CAMERA FOR WEIGHT: low angle under a looming load; top-down or high angle for being
   pressed flat; steady push-in (≈ 5%/s) through STRAIN; tracking beside a trudge at walking
   pace. The body moves more than the camera. No orbit, fly-through or crane on an EFFORT
   shot. The impact jolt is added in the editor (POST HIT).
6. USE WINDOW AND LOCK (editor):
   a. Find the PEAK in the 5 s clip first.
      lock offset = the lock word's onset, in seconds into the shot, minus 1 frame.
      in-point = peak − (lock offset × speed); out-point = in-point + (shot length × speed).
      (With the speed ramp in e, compute the pre-peak part as 0.1 + (offset − 0.1) × speed.)
   b. Line up the PEAK 1 frame before the lock word's card. Acceptable range: 3 frames early
      to 1 frame late.
   c. Slip the clip; never move the cut.
   d. Too few frames before the peak? Try, in order: the next cycle's peak; 1.5× before the
      peak; another take; start mid-STRAIN; or re-split the shot so the lock word falls at
      least 5 frames after its cut.
   e. Keep at least 4 frames before and 6 after the peak. Speed 1.2–1.5× through BRACE /
      STRAIN / SETTLE, 1.0× for 3 frames each side of the peak, never below 1.0×.
   f. Reject a take if hands melt, fingers multiply or the object passes through the body
      within 6 frames of the peak.
   POST HIT (impact locks only; no two within any 3 consecutive shots): on the lock frame, punch the video
   layer in to 104% over 2 frames, then a 4–6-frame decaying mostly-vertical shake
   (≈ 15 px at 1080p, halving each frame), plus a low thud under the voice. Word cards stay
   on top and do not shake.
TEST BEFORE ADOPTING (6 generations): take one EFFORT shot and generate 3 MOTION variants,
   2 takes each: (A) plain D wording, (B) D2 wording, (C) D2 plus "slowly, heavy,
   cinematic". Score each take:
   - is there a peak, and at what clip second
   - are the hands intact at the peak
   - can you see the tell on your phone at arm's length
   - does the clip keep the preset look (flat 2D for cartoon)
   Adopt the variant with the most usable takes. Drop any never-write word that turns out not
   to hurt in your tool.

============================================================
E. CRAFT RULES (kept from v4.1/v4.2)
============================================================
1. ONE SURPRISE per shot: one thing the viewer doesn't expect.
2. SPECIFIC PROPS: 3–5 props that belong only to this shot (CARTOON). HUD shots use one
   icon plus 1–2 HUD elements instead.
3. SCALE AND ANGLE CONTRAST: no three consecutive shots at the same shot scale or angle. Use
   top-down, low-angle and isometric views as well as close-up / medium / wide.
4. COLOUR FOLLOWS THE ARC: SYMPTOM/BELIEF = darker and tighter; MECHANISM = brightest and most
   saturated; LANDING = vast. Cartoon presets: ordinary vast (Emotional Truth 5: first
   light, one lit window in a dark block, a night sky; never a sunset). NEON HUD: a widening
   field of light on black, no sky. No more than 3 consecutive shots in the
   same hue family. (HUD: alternate red-dominant and cyan/white-dominant shots.)
5. LIGHTING HAS A SOURCE: state it (CARTOON).
6. CAST ROTATION (CARTOON; mirror shots of the YOU character are exempt, Emotional Truth 1):
   person / object or ANIMAL with a face / crowd or multi-figure
   scene (2–5 characters, all moving) / abstract. No two adjacent shots share a type, except
   inside a jump-cut set.
7. TEXT BAND: the horizontal band from 35% to 65% of frame height (where the word sits)
   must be clearly dark or clearly bright (average luma under ~25% or over ~75%). Never a
   face, a mid-grey/beige surface, or a large block of hot orange or magenta there. A body
   may cross it if its colour meets the same test.
8. ANTI-COPY: never reuse a hook, metaphor, prop or composition from any example in this
   prompt system or from the reference channels' videos. Exception: the lists in EMOTIONAL
   TRUTH, D2 and the MICRO-MOMENT LIBRARY are categories to choose from. Change the room,
   prop and angle, and never use the same micro-moment in two videos in a row.
9. MOTIF: the idea's motif returns at 2–3 beats. Flag those shots in the output.

============================================================
F. ON-SCREEN TEXT (editor only, never in AI generation)
============================================================
- Make the cards from the recorded VO with auto-captions, set to one word per caption.
- Font: heavy rounded or geometric sans, ALL CAPS, white #FFFFFF, blend mode DIFFERENCE.
- Size: cap height 14–15% of frame height for both cartoon presets. HUD cap height 6.5%. Centred, middle of
  frame.
- Every card cuts in on its word's first syllable and out when the next word starts.
- MINIMUM HOLD 6 frames (0.2 s). A faster word shares one card with the next word
  ("GIVE YOURSELF").
- LEGIBILITY FALLBACK: if a shot's centre is still mid-tone, use solid white with a soft
  40% black shadow on that shot only.

============================================================
PROMPT 2 OUTPUT (the SCRIPT input for Prompt 3)
============================================================
1. TITLE: Your Brain Isn't the Enemy

2. SCRIPT
Why can you hold your phone up for hours,
but can't lift one five-minute task?
It's eleven forty. The laptop's still shut.
Your hand hovers, then drops.
Your shoulders sag before you've lifted anything.
You blame your willpower.
You lie awake asking what's wrong with you.  ← LOW POINT
But psychologists have named one part of this. [FACT]
It's called effort discounting. Not a flaw. [FACT: first sentence]
Your brain is a porter. Above him, a long staircase.
Every task lands at his feet as a box.
He hefts each box, eyes the payoff upstairs. [FACT]
The heavier the box, the smaller that payoff feels. [FACT]
Not worth it? The box hits the floor. [FLASH]
And payoffs that come later look smaller from down here. [FACT]
A report due in three weeks?
That's a crate with its payoff lost in clouds.
Your phone is a feather.
And it pays him right here, on the ground floor.
He grabs the feather.
He's saving his back for loads worth lifting.
⏸
That's why your shoulders sag at the laptop,
but your arm can hold the phone up for hours.
⏸
That heaviness isn't weakness. It's information.
Lighten the box. Put a payoff on the first stair.
Your brain isn't the enemy. It's your tired porter. [FLASH]

3. WORD COUNT: 200 words (whitespace count; every line 4–10 words). ESTIMATED LENGTH:
   64.4 s at 190 wpm including two 0.6 s beats; the video ends at 64.9 s (0.5 s tail).

4. FACT CHECK
| Claim | Status | Wording used |
|---|---|---|
| "But psychologists have named one part of this." (line 8) | Accurate as worded: procrastination research mostly explains scrolling-over-tasks through delay discounting and short-term mood repair; effort discounting is one well-established part, not the whole label. | Rewritten from "have a real name for this" to "named one part of this". |
| "It's called effort discounting." (line 9; "Not a flaw." is the reframe, not a fact) | Well-established term: a reward's subjective value falls with the effort it costs (e.g. cognitive-effort discounting studies such as Westbrook, Kester & Braver 2013; check the citation before citing it anywhere). | Kept. No study, university or number on screen. |
| "He hefts each box, eyes the payoff upstairs." (line 12): effort is weighed against expected reward | Well-established cost–benefit account of effort-based decisions. Said as a metaphor. | Kept as metaphor. |
| "The heavier the box, the smaller that payoff feels." (line 13) | Well-established: the definition of effort discounting. "Feels" = subjective value. | Kept. |
| "And payoffs that come later look smaller from down here." (line 15) | Well-established: delay (temporal) discounting. | Kept. |
| "Your phone is a feather… it pays him right here." (lines 18–19) | Metaphor for a low-effort, immediate reward. No dopamine or addiction claim. | Kept as metaphor; never caption it "dopamine hit". |
| "He's saving his back for loads worth lifting." (line 21) | Metaphor for selectivity: effort is spent where it pays. It is NOT a draining willpower tank (the limited-resource "ego depletion" idea failed a large multi-lab replication). | Kept; never voice or caption it as "saving energy" or "willpower runs out". |

5. ELEVENLABS: Speed 1.10–1.15, stability below default for energy, 2 takes. Honest words, punchy
   delivery. In the editor, delete every gap over 0.3 s except the two ⏸ beats. Keep the
   delivery at 190–200 wpm: at 210 wpm this script drops under 62 s and the 4-word shots fall
   under 1.2 s. Re-time the shot plan to the recorded voice before filling LOCK and USE.

6. PHASE MAP (start times at 190 wpm)
| Start | Phase | Words | Length |
|---|---|---|---|
| 0.0 s | HOOK | 15 | 4.7 s |
| 4.7 s | SYMPTOM | 19 | 6.0 s |
| 10.7 s | WRONG BELIEF (low point) | 12 | 3.8 s |
| 14.5 s | PIVOT | 15 | 4.7 s |
| 19.3 s | MECHANISM | 96 | 30.3 s (47% of the 64.4 s runtime) |
| 50.2 s | PAYOFF | 18 | 5.7 s |
| 56.5 s | LANDING | 25 | 7.9 s |

7. EMOTION ARC: stuck, heavy late-night tiredness (lines 1–5, night indigo + screen cyan) →
   LOW POINT: private self-blame, "what's wrong with you" (line 7, S07, the darkest saturated
   shot) → steady, unglamorous relief: the weight is information (lines 24–26, pre-dawn light).

8. CARRY-OVER
   RUNNING METAPHOR: your brain is a tired porter at the foot of a long staircase. Every task is
     a box (the cost, which hurts); the payoff waits upstairs (the reward). Later payoffs sit
     higher and look smaller. The phone is a feather that pays on the ground floor.
   PORTER LOOK (every porter shot, character sheet first): a stocky porter whose head is a
     round pink cartoon brain, flat cap, rolled sleeves, cyan work apron, big orange gloves.
   YOU LOOK (every YOU shot, character sheet first; fix age and gender on the sheet): "the
     tired young person": oversized lime hoodie, unstyled hair with a cowlick, dark half-moons
     under half-closed eyes, a coffee-stain dot. Never write "YOU" in a generator prompt.
   MOTIF + LOOK: the small task box (the "five-minute task"): hot-orange cardboard, one lime
     tape stripe across the top, a tiny worried face; no markings or writing. Shots S02, S32,
     S33.
   MIRROR MOMENTS (categories): avoidance (S03), hesitation (S04), inertia / sinking (S05,
     S28), restlessness at night (S07), screen glow (S06, S29), the boring middle (S30),
     release (S32).
   MARKERS: [FLASH] on line 14 (S17, latest slam on "floor") and on the last line (S34, mask
     off on "enemy"). [HOLD]: none.

9. SHOT PLAN FOR DENSE CUT (computed and rule-checked at 190 wpm)
   - 34 shots (minimum: ceil(200 ÷ 7) = 29)
   - every shot 1.26–2.84 s; final shot 3.34 s (exempt; rule 2.5–4 s)
   - first cut at 2.84 s: allowed, because S01 is in full motion from frame 1
   - jump-cut sets: A = S13–S15 (foot of the stairs), B = S24–S26 (ground floor), cuts every
     1.26 s
   - 13 mirror shots (8–14); comic mirror shots S01, S06, S30; RELEASE S32; LOW POINT S07
   - EFFORT shots S01, S02, S05, S13, S15, S17, S21, S28, S30, never more than 2 in a row
   - no run of 3 PIVOT/MECHANISM shots without a body cost
   - no cast-rotation clash (outside sets; YOU mirror shots exempt)
   - lock times are estimates at 190 wpm (seconds into the shot); re-measure on the recorded
     voice
   - text in parentheses inside PICTURE, like "(PEAK on 'hours')" or "Callback to S05", is a
     planning note: leave it out of generator prompts
S01 0.00–2.84 (2.84 s) · HOOK · person (YOU) · medium · high (~60°) · MIRROR · EFFORT HOLD-UP · comic · lock "hours" +2.53 s
     WORDS: "Why can you hold your phone up for hours,"
     PICTURE: High angle (about 60°) onto a rumpled bed at night; the tired young person's head in the top third, the phone a plain glowing cyan screen and the only light. Full motion from frame 1: the thumb flicks fast up the screen while the raised forearm shaking hard sinks a notch toward the nose (PEAK on 'hours'); they swap the phone to the other hand without looking away, still flicking. Centre band = dark indigo duvet.
S02 2.84–4.74 (1.89 s) · HOOK · person (YOU, POV hands) · medium · POV · MIRROR · EFFORT LIFT · MOTIF · lock "lift" +0.63 s
     WORDS: "but can't lift one five-minute task?"
     PICTURE: First-person view, only two forearms in lime hoodie sleeves entering from the bottom edge: both fists clamped under the small task box (hot orange, one lime tape stripe, tiny worried face) on a desk at night, forearms shaking hard. The box barely rises a finger-width, then drops back with a thud and a dust puff (PEAK on 'lift'); the fists clamp again. Lamp-orange light from the left; centre band = dark desk.
S03 4.74–6.95 (2.21 s) · SYMPTOM · person (YOU) · medium · over the shoulder · MIRROR · lock —
     WORDS: "It's eleven forty. The laptop's still shut."
     PICTURE: Over the tired young person's shoulder at a cluttered desk late at night, head in the upper-left third: their eyes and chin veer away from the shut laptop toward the black window, snap back, and veer away again, for the whole clip. One hot-orange desk lamp is the only light; a cold mug with dried rings and crumpled lists at the frame edges. Night indigo. Centre band = the dark shut lid. No clock.
S04 6.95–8.53 (1.58 s) · SYMPTOM · person (YOU, hand) · close · eye · MIRROR · lock —
     WORDS: "Your hand hovers, then drops."
     PICTURE: Close on one hand over the shut laptop: the fingertips dip toward the lid, stop short and drop limp to the lap; again, three times. Lamp-orange rim light; centre band = dark lid.
S05 8.53–10.74 (2.21 s) · SYMPTOM · person (YOU) · medium · from behind · MIRROR · EFFORT SINK · lock "sag" +0.63 s
     WORDS: "Your shoulders sag before you've lifted anything."
     PICTURE: Medium from behind: the tired young person in a desk chair at the shut laptop, already hunched, shoulders up to the ears, nothing on them. They sink into the seat cushion, shoulders sagging, the cushion squashing flat and bulging up around the hips (PEAK = deepest drop on 'sag'); they push up and sink again. Centre band = dark wall.
S06 10.74–12.00 (1.26 s) · BELIEF · person (YOU) · medium · over the shoulder · MIRROR · comic · lock "blame" +0.32 s
     WORDS: "You blame your willpower."
     PICTURE: Over the shoulder in a dark bedroom, head in the upper third, face lit cyan from below by the phone in one hand: the tired young person jabs a finger at their tired reflection in the black window; the reflection jabs back first and harder, and they flinch back (PEAK on 'blame'). Both heads in the top third; centre band = the black window.
S07 12.00–14.53 (2.53 s) · BELIEF · person (YOU) · wide · top-down · MIRROR · LOW POINT · lock —
     WORDS: "You lie awake asking what's wrong with you."
     PICTURE: Top-down, the darkest shot, deep saturated indigo; one streetlight stripe across the duvet is the only light; the tired young person's head in the top third. They keep flipping from back to side to back, the duvet twisting, one foot bouncing hard off the mattress edge, for the whole clip. Centre band = dark duvet.
S08 14.53–17.05 (2.53 s) · PIVOT · crowd (2 psychologists + figure) · medium · eye · lock —
     WORDS: "But psychologists have named one part of this."
     PICTURE: Two cartoon psychologists in lab coats click on a big desk lamp over a slumped figure at a desk, the slumped figure's spine curved; warm light floods in and the figure's head lifts a little. Faces and the slumped head in the upper third; centre band = the bright lamp pool.
S09 17.05–19.26 (2.21 s) · PIVOT · abstract · close · eye · lock —
     WORDS: "It's called effort discounting. Not a flaw."
     PICTURE: Close: a heavy iron weight lowers onto a glowing gold reward on a plain table; the reward squashes and shrinks as the weight presses down, then a crack in the table seals shut. Bright lime backdrop; centre band = bright backdrop.
S10 19.26–20.84 (1.58 s) · MECHANISM · person (porter) · close · eye · lock —
     WORDS: "Your brain is a porter."
     PICTURE: Close, face in the top third: the porter (round pink brain for a head, flat cap, rolled sleeves, cyan work apron, big orange gloves) at the foot of a stairwell, chest heaving, breath puffs, rolling one stiff shoulder. Bright stairwell light from above; centre band = bright wall.
S11 20.84–22.42 (1.58 s) · MECHANISM · abstract · wide · low, tilting up · lock —
     WORDS: "Above him, a long staircase."
     PICTURE: Low angle tilting up a long staircase in a bright stairwell, lime and orange, light pouring from the top; a small glowing payoff sits on the top step. Centre band = bright stairs.
S12 22.42–25.26 (2.84 s) · MECHANISM · object with faces (boxes) · medium · eye · comic · lock —
     WORDS: "Every task lands at his feet as a box."
     PICTURE: Medium at floor level: worried-faced task boxes thud down one after another beside the porter's orange boots, the pile wobbling higher and the bottom boxes squashing flat; dust puffs on every thud. Bright orange floor; centre band = bright wall.
S13 25.26–26.53 (1.26 s) · MECHANISM · person (porter) · medium · low · set A1 · EFFORT LIFT · lock "hefts" +0.32 s
     WORDS: "He hefts each box,"
     PICTURE: Set A, low angle at the foot of the stairs: the porter already in STRAIN, both gloved fists under a big box, knees bent and shaking; he heaves it up to his chest in one sudden push (PEAK on 'hefts'), dust puff, then braces again.
S14 26.53–27.79 (1.26 s) · MECHANISM · person (porter) · medium · over the shoulder · set A2 · lock —
     WORDS: "eyes the payoff upstairs."
     PICTURE: Set A, over the porter's shoulder at the foot of the stairs, the box in his arms, arms locked straight under the box: he squints up the stairwell at the small glowing payoff on the top step; the box sags a notch.
S15 27.79–29.05 (1.26 s) · MECHANISM · person (porter) · medium · high · set A3 · EFFORT HOLD-UP · lock "box" +0.95 s
     WORDS: "The heavier the box,"
     PICTURE: Set A, high angle at the foot of the stairs: the box in the porter's arms swells bigger and heavier, his arms sinking a notch, sweat drops flying (PEAK on 'box'); he shoves it back up, arms shaking.
S16 29.05–30.63 (1.58 s) · MECHANISM · object with a face (payoff) · close · eye · lock —
     WORDS: "the smaller that payoff feels."
     PICTURE: Close on the top step: the small glowing payoff shrinks and dims, its tiny face drooping. Bright lime stairwell; centre band = bright wall.
S17 30.63–33.16 (2.53 s) · MECHANISM · person (porter) · medium · eye · EFFORT LIFT · [FLASH] · lock "floor" +2.21 s
     WORDS: "Not worth it? The box hits the floor."
     PICTURE: Medium: his arms give way and the box slams onto the floor, impact stars, dust burst, floorboards cracking; the porter staggers back; the box bounces and slams again (use the latest slam as the PEAK, on 'floor').
S18 33.16–34.74 (1.58 s) · MECHANISM · abstract · wide · side-on · lock —
     WORDS: "And payoffs that come later"
     PICTURE: Wide, side-on staircase: glowing payoffs pop onto higher and higher steps, each one placed further up. Bright orange stairwell; centre band = bright stairs.
S19 34.74–36.32 (1.58 s) · MECHANISM · person (porter) · medium · low, from the bottom step · lock —
     WORDS: "look smaller from down here."
     PICTURE: Low angle from the bottom step: the porter cranes up, shoulders slumping, as the high payoffs shrink to specks. Centre band = bright stair wall.
S20 36.32–38.21 (1.89 s) · MECHANISM · object (report folder) · medium · eye · lock —
     WORDS: "A report due in three weeks?"
     PICTURE: A plain report folder sits on a stair far up the stairwell under a thick cartoon dust layer, a tiny cobweb on its corner; nothing written. Centre band = bright wall.
S21 38.21–41.05 (2.84 s) · MECHANISM · person (porter) · wide · low · EFFORT LIFT · lock "crate" +0.63 s
     WORDS: "That's a crate with its payoff lost in clouds."
     PICTURE: Low angle under a giant crate at the foot of a stairwell whose top is lost in a cloud ceiling: the porter already in STRAIN, fists clamped on its side handles, knees bent and shaking, big sweat drops; the crate barely rises, then drops with a dust burst and his knees buckle (PEAK on 'crate'); he heaves again, harder.
S22 41.05–42.63 (1.58 s) · MECHANISM · object with a face (phone) · close · eye · lock —
     WORDS: "Your phone is a feather."
     PICTURE: Close: a phone with a tiny cheeky face pops into a white feather that zig-zags down fast. Bright cyan backdrop; centre band = bright backdrop.
S23 42.63–44.53 (1.89 s) · MECHANISM · abstract (coin burst) · close · top-down · lock —
     WORDS: "And it pays him right here,"
     PICTURE: Close, top-down: the feather lands in an open orange-gloved palm and turns into a shiny gold coin with a burst of light. Centre band = bright floor.
S24 44.53–45.79 (1.26 s) · MECHANISM · person (porter) · wide · eye · set B1 · lock —
     WORDS: "on the ground floor."
     PICTURE: Set B, wide on the ground floor: the porter flops down against the box pile, coin in hand, chest heaving, breath puffs; the stairs above him empty. Centre band = bright wall.
S25 45.79–47.05 (1.26 s) · MECHANISM · person (porter) · medium · low · set B2 · comic · lock —
     WORDS: "He grabs the feather."
     PICTURE: Set B, low-angle medium by the same box pile: the porter snatches the feather and hugs it to his chest, shoulders dropping with relief, a happy exhale cloud.
S26 47.05–48.32 (1.26 s) · MECHANISM · person (porter) · close · side · set B3 · lock —
     WORDS: "He's saving his back"
     PICTURE: Set B, side close by the same box pile, face in the top third: the porter straightens up, hand pressed to his lower back, spine curved like a question mark, small pain stars popping; he winces and rubs the spot.
S27 48.32–50.18 (1.86 s) · MECHANISM · object (boxes) · close · floor level · lock —
     WORDS: "for loads worth lifting."
     PICTURE: Close at floor level: an orange boot nudges the lightest box out of the pile; the heavy boxes behind it sag. Centre band = bright floor.
S28 50.18–52.71 (2.53 s) · PAYOFF · person (YOU) · medium · high · MIRROR · EFFORT SINK · lock "sag" +1.26 s
     WORDS: "That's why your shoulders sag at the laptop,"
     PICTURE: Callback to S05, high angle: the same desk chair and shut laptop; the tired young person sinks into the seat cushion, shoulders sagging, arms flopping (PEAK on 'sag'). Nothing visible on the shoulders. Pre-dawn blue window; centre band = dark wall.
S29 52.71–54.92 (2.21 s) · PAYOFF · person (YOU) · close · low, from the pillow · MIRROR · lock —
     WORDS: "but your arm can hold the phone"
     PICTURE: Callback to S01, low angle from the pillow: the tired young person's face in the top third, face lit cyan from below by a plain glowing screen; the phone arm still up, still shaking a little; the thumb flicks fast.
S30 54.92–56.46 (1.55 s) · PAYOFF · person (YOU) · wide · eye · MIRROR · EFFORT NOD-OFF · comic · lock "hours" +0.63 s
     WORDS: "up for hours."
     PICTURE: Same bed, wide, face in the top third: their head sinks, chin hits chest, jerks awake (PEAK on 'hours'), sinks again, while the phone arm never moves an inch. The window behind has turned from night indigo to pre-dawn blue.
S31 56.46–58.36 (1.89 s) · LANDING · person (YOU) · medium · over the shoulder · MIRROR · lock —
     WORDS: "That heaviness isn't weakness. It's information."
     PICTURE: Over the shoulder at the desk: for the first time the invisible weight appears as the porter's box on the tired young person's shoulders, knees bent, spine curved under it; they turn to look and the box blinks cyan like a dashboard warning light. Pre-dawn blue in the window; centre band = dark wall.
S32 58.36–60.25 (1.89 s) · LANDING · person (YOU) · medium · eye · MIRROR · MOTIF · RELEASE · lock —
     WORDS: "Lighten the box. Put a payoff"
     PICTURE: Medium: the tired young person tips two bricks out of the box with a clunk and a dust puff; it shrinks to the small task box (hot orange, lime tape stripe, tiny face); they lift it with one hand, shoulders drop, exhale cloud. No porter in this shot.
S33 60.25–61.52 (1.26 s) · LANDING · person (YOU) · wide · eye · MIRROR · MOTIF · lock —
     WORDS: "on the first stair."
     PICTURE: Wide, ordinary vast: pre-dawn light spills across a cluttered bedroom floor, a laundry pile and mug rings at the edges; small in frame, the tired young person sets the small task box and a little glowing payoff on the first stair of the porter's staircase, which rises out of the bedroom floor; breath puffs. Centre band = bright window light.
S34 61.52–64.86 (3.34 s) · LANDING · object with a face (brain-headed porter) · wide · eye · [FLASH] · lock "enemy" +1.26 s
     WORDS: "Your brain isn't the enemy. It's your tired porter."
     PICTURE: Wide: a deep-violet pre-dawn sky over a sleeping street with one lit window (ordinary vast); in the lower-left third, a brain-headed figure in a black villain mask pulls the mask off (PEAK on 'enemy'): underneath, the porter's tired, friendly face; he exhales a breath cloud and gives a small nod. Centre band = dark sky.

10. NOUN LIST = SHOTS (one noun per shot, with THE FEELING)
S01 [HOOK] person (YOU) — tell/cue: raised forearm shaking hard
     THE FEELING: 1 a.m. in bed: the dull burn in your raised forearm after an hour of scrolling, and you still don't put the phone down.
S02 [HOOK] person (YOU, POV hands) — tell/cue: forearms shaking hard
     THE FEELING: Evening at your desk: the dead weight in your arms when the smallest job on the list feels bolted down.
S03 [SYMPTOM] person (YOU) — tell/cue: eyes and chin veer away
     THE FEELING: 11:40 at your desk: the tightness behind your eyes when you look at the shut laptop and already know you won't open it.
S04 [SYMPTOM] person (YOU, hand) — tell/cue: fingertips dip toward the lid, stop short and drop
     THE FEELING: Late at the desk: the half-second your fingertips almost touch the lid before they go limp and fall back to your lap.
S05 [SYMPTOM] person (YOU) — tell/cue: shoulders sagging
     THE FEELING: Late evening in the desk chair: the slump across your shoulders, like carrying a full bag you never picked up.
S06 [BELIEF] person (YOU) — tell/cue: face lit cyan from below
     THE FEELING: Midnight at the bedroom window: the hot prickle in your face when you call yourself weak and half believe it.
S07 [BELIEF] person (YOU) — tell/cue: one foot bouncing hard
     THE FEELING: 2 a.m. in bed: flipping from your back to your side, one foot bouncing, replaying the hours you didn't use.
S08 [PIVOT] crowd (2 psychologists + figure) — tell/cue: the slumped figure's spine curved
     THE FEELING: The small loosening in your chest when someone tells you this feeling has a name.
S09 [PIVOT] abstract — tell/cue: (object force / none)
     THE FEELING: The breath you finally let out when the weight starts to make sense instead of just hurting.
S10 [MECHANISM] person (porter) — tell/cue: chest heaving, breath puffs
     THE FEELING: At the bottom of a long climb: the tiredness in your calves before you've taken a single step.
S11 [MECHANISM] abstract — tell/cue: (object force / none)
     THE FEELING: Your neck craning back at a climb that seems to go on forever.
S12 [MECHANISM] object with faces (boxes) — tell/cue: (object force / none)
     THE FEELING: Monday morning: the flinch in your gut each time another job lands on a pile you can't finish.
S13 [MECHANISM] person (porter) — tell/cue: knees bent and shaking
     THE FEELING: The burn in your forearms and the catch in your breath the moment a load leaves the ground.
S14 [MECHANISM] person (porter) — tell/cue: arms locked straight under the box
     THE FEELING: Your neck craning and your eyes narrowing at a reward so far up it barely looks real.
S15 [MECHANISM] person (porter) — tell/cue: arms sinking a notch, sweat drops flying
     THE FEELING: Your arms getting heavier while the thing you're working for gets harder to feel.
S16 [MECHANISM] object with a face (payoff) — tell/cue: (object force / none)
     THE FEELING: The flat moment when the reward stops feeling worth the climb.
S17 [MECHANISM] person (porter) — tell/cue: his arms give way
     THE FEELING: The guilty, buzzing relief in your hands the second you put something heavy down.
S18 [MECHANISM] abstract — tell/cue: (object force / none)
     THE FEELING: Watching the reward move further up every time you look.
S19 [MECHANISM] person (porter) — tell/cue: shoulders slumping
     THE FEELING: The flat nothing in your chest when the reward is weeks away and feels like it belongs to someone else.
S20 [MECHANISM] object (report folder) — tell/cue: (object force / none)
     THE FEELING: The faint dread at the back of your throat when you remember a deadline that's still weeks off.
S21 [MECHANISM] person (porter) — tell/cue: fists clamped on its side handles, knees bent and shaking
     THE FEELING: Your legs going heavy at the foot of something so big you can't see where it ends.
S22 [MECHANISM] object with a face (phone) — tell/cue: (object force / none)
     THE FEELING: The weightless ease of your thumb finding the phone before you've decided anything.
S23 [MECHANISM] abstract (coin burst) — tell/cue: (object force / none)
     THE FEELING: The tiny warm flick of reward landing in your hand before you've done any work.
S24 [MECHANISM] person (porter) — tell/cue: chest heaving, breath puffs
     THE FEELING: Sitting down on the bottom step with the job untouched and a little reward already in your hand.
S25 [MECHANISM] person (porter) — tell/cue: shoulders dropping with relief
     THE FEELING: The almost embarrassing relief of choosing the thing that asks nothing of your body.
S26 [MECHANISM] person (porter) — tell/cue: hand pressed to his lower back, spine curved like a question mark
     THE FEELING: End of a long day: the ache low in your back that's really your body asking whether this load is worth it.
S27 [MECHANISM] object (boxes) — tell/cue: (object force / none)
     THE FEELING: Testing the lightest load with your foot before you'll commit your back to anything.
S28 [PAYOFF] person (YOU) — tell/cue: sinks into the seat cushion, shoulders sagging
     THE FEELING: Back at the desk: recognising that same shoulder slump, and finally knowing what it was measuring.
S29 [PAYOFF] person (YOU) — tell/cue: face lit cyan from below
     THE FEELING: In bed at 2 a.m.: your arm that never quits on the phone suddenly making perfect, uncomfortable sense.
S30 [PAYOFF] person (YOU) — tell/cue: head sinks, chin hits chest, jerks awake
     THE FEELING: 3 a.m., dozing off mid-scroll with the phone still held perfectly up.
S31 [LANDING] person (YOU) — tell/cue: knees bent, spine curved under it
     THE FEELING: Dawn at the desk: the weight still on your shoulders, but now it feels like a signal instead of a verdict.
S32 [LANDING] person (YOU) — tell/cue: shoulders drop, exhale cloud
     THE FEELING: The surprise in your arms when the load you dreaded comes off the desk easily.
S33 [LANDING] person (YOU) — tell/cue: breath puffs
     THE FEELING: First light in your room: the small warm click in your chest of getting something back right after the first step.
S34 [LANDING] object with a face (brain-headed porter) — tell/cue: exhales a breath cloud
     THE FEELING: Your jaw unclenching as the thing you've been fighting turns out to be on your side.
```
