# Generates the Stairwell Lights production package (script + 12-column scene table + stats).
import json, os, re, sys

OUT = sys.argv[1]
WPS = 3.0  # narration pace: ~180 words/min, measured on the Charliee takes used for Two Peepholes

# Each scene: id, tag (W=wide, M=medium, CU=character close-up, ECU=object/interface/diagram close-up, CARD=rule/title card),
# section, pre (silent lead-in s), hold (silent tail s), narr (spoken), then the 12-column cells.
S = []
def sc(id, tag, sec, narr, purpose, framing, pose, prop, light, falloff, tracker, text, sound, check, pre=0.0, hold=0.0):
    S.append(dict(id=id, tag=tag, sec=sec, narr=narr, purpose=purpose, framing=framing, pose=pose, prop=prop, light=light,
                  falloff=falloff, tracker=tracker, text=text, sound=sound, check=check, pre=pre, hold=hold))

YOU = "YOU"
# ---------------- COLD OPEN ----------------
sec = "Cold open"
sc("SC01","W",sec,"Floor four just turned on. You're still on floor one.",
   "Anomaly first: a light wakes two floors above anyone.",
   "Wide stairwell cutaway, all six landings, static. Lobby at bottom left.",
   "YOU standing in lobby, profile facing stairs, weight on both feet; gaze snaps up 25° (head + neck only, 0.25 s ease-out), hold.",
   "FX4 clicks on; PIR4 LED blinks green twice.",
   "FX1 (lobby, cool white) on above YOU; FX4 on.",
   "FX1 cone lights YOU's head top and shoulders, floor shadow under feet. FX4 cone lights L4 floor and the top step edges below it; L4 empty. Flights 2–3 dark except faint sodium window spill.",
   "IT@4, lit, unseen.","Caption only.",
   "Room tone (low HVAC). FX4 relay click at frame of light-on, 0.5 s before 'Floor four'.",
   "L4 visibly lit ≥0.5 s before the word; nobody on L4.", pre=0.8)
sc("SC02","ECU",sec,"These lights only wake for movement.",
   "Introduce the sensor: the 'eye' that will track everything.",
   "ECU ceiling dome FX4 + PIR sensor beside it, from below.",
   "—","PIR4 LED: green blink ×2 (0.15 s on/0.15 s off).",
   "FX4 diffuser (emissive).","Diffuser blooms softly onto ceiling; sensor dome lit from the side; LED adds a 12 px green falloff only on the dome.",
   "IT@4 (sensor saw it).","Diegetic: none.",
   "Two soft electronic ticks synced to LED blinks.","Same fixture design as SC01; LED double-blink matches SC69.")
sc("SC03","M",sec,"One floor at a time, as you climb. Nobody is on four.",
   "Establish normal behavior and YOU's position below.",
   "Medium, low angle from lobby floor up the stairwell gap; YOU in left third.",
   "YOU: head stays tilted up 25°; right hand rests on newel post (contact); breathing scale 1.0→1.02 (2 s cycle).",
   "Gap between flights shows FX4 glow two floors up.",
   "FX1 overhead; FX4 seen as distant glow.","FX4's light falls on rail undersides of L4; FX1 rims YOU from above; YOU's shadow on lobby floor.",
   "IT@4 lit.","Caption only.","Room tone; distant building hum.","Hand never leaves the post; no foot slide.")
sc("SC04","CARD",sec,"Rule one. Don't climb into a light you didn't turn on.",
   "State the core prohibition (Rule 1).",
   "Rule card over darkened wide (frame dims to 25%).",
   "—","—","None (graphic card).","Card is graphic; underlying frame dimmed, no added glow.",
   "IT@4 lit (visible dimmed behind card).",
   "RULE 1 (96 px, white) / DON'T CLIMB INTO A LIGHT YOU DIDN'T TURN ON (44 px).",
   "Silence under the line; no hit.","Card text matches narration exactly.", hold=0.4)
sc("SC05","CU",sec,"You'll want to call up the stairs. Just a quiet \"hello?\" Don't.",
   "Name the automatic reaction, then stop it.",
   "Close-up YOU's head and shoulders, three-quarter, looking up.",
   "Jaw opens 6° on 'call up' (0.2 s), holds; on 'Don't.' jaw closes (stepped, 2 frames) and eyes widen 10%. Hold 0.6 s.",
   "—","FX1 overhead (out of frame).","Top of hood and head rim lit; face front mostly in shade; eye-dots read.",
   "IT@4 lit.","Caption only.","Breath in on 'call up'; held silence after 'Don't.'",
   "Mouth state returns to closed; no head bob.", hold=0.6)
sc("SC06","ECU",sec,"A neighbor's light would climb with them, floor by floor. This one stays on four.",
   "Distinguish from the ordinary explanation.",
   "ECU printed evacuation plan framed on the lobby wall, under FX1.",
   "—","Red marker draws a stair-step of dots L1→L2→L3 (normal climb), then a single circled dot at L4 that doesn't move.",
   "FX1 lights the plan from above (plan is paper under glass).","Soft top-down falloff across the plan, slight glare band on glass top edge; marker strokes are graphic, inside the plan only.",
   "Plan: IT marker at 4 (static).","Plan labels 'FLOOR 1–6' (30 px); marker only.",
   "Marker squeak per dot.","Diagram lives on a physical plan; no rays in the room.")
sc("SC07","W",sec,"No footsteps. No door opening. Nobody comes to the rail.",
   "Hold on the contradiction.",
   "Wide cutaway, static (same as SC01).",
   "YOU still, gaze up; breathing only.","FX4 stays on; FX4 20-s timer ring (graphic, tiny) appears beside L4.",
   "FX1, FX4.","As SC01.","IT@4 lit, stationary.","Timer ring 0.45 opacity.",
   "Deliberate silence; room tone only.","Repeated framing justified: timer state is new.", hold=1.0)
sc("SC08","W",sec,"Twenty seconds later, four goes dark. And three turns on.",
   "First movement: it comes one floor toward YOU.",
   "Wide cutaway; 0.4 s cross-fade marks time passing.",
   "YOU: still; head lowers 8° as FX3 lights (0.3 s).",
   "FX4 off (relay click), 0.5 s later FX3 on; PIR3 blinks green.",
   "FX1, FX3.","FX3 cone now lights L3 floor and top of flight 2–3; L4 drops to sodium spill only.",
   "IT@3 lit.","—","Click (FX4 off) on frame; click (FX3 on) 0.5 s before 'three'.",
   "Off/on visible ≥0.5 s before each phrase.", hold=0.6)
sc("SC09","CARD","Title","",
   "Title.","Black card, title centered.","—","—","None.","—","IT@3.",
   "WRONG KNOCK (34 px, 0.45) / IF THE STAIRWELL LIGHT TURNS ON ABOVE YOU (88 px).",
   "Silence, then room tone returns.","Title complements thumbnail text, not identical.", pre=2.6)
# ---------------- MECHANISM ----------------
sec = "How the lights work"
sc("SC10","ECU",sec,"",
   "Plant: YOU's mailbox 5B; an older name label shows under YOU's.",
   "ECU lobby mailbox 5B, slight top-down.",
   "YOU's index finger brushes the label edge (contact), withdraws 3 cm.",
   "Label: YOU's name printed; under it the curled corner of an older label: '…ALE'.",
   "FX1 overhead.","Label lit from above; finger casts a small shadow onto the box door.",
   "IT@3 (offscreen).","Diegetic labels 30 px.","Paper rustle as finger brushes.",
   "Silent plant; geography: YOU lives on 5.", pre=1.6)
sc("SC11","ECU",sec,"Every landing has a sensor above its light. It blinks green when something moves beneath it.",
   "Teach the tracker rule (LED = motion seen).",
   "ECU FX1 + PIR1 from below; YOU's hood edge at frame bottom.",
   "YOU's head turns 10° (the motion that trips it).","PIR1 blinks green on YOU's turn, 0.5 s before 'blinks green'.",
   "FX1.","Diffuser bloom; LED's green falloff only on dome.","IT@3.","—","LED tick.","Same sensor model as SC02.")
sc("SC12","ECU",sec,"Twenty seconds of stillness, and the light goes out. Still things don't keep a light on.",
   "Teach the timer and the stillness principle (seeds the ending).",
   "ECU lobby plan; a 20-s ring is drawn next to each landing.",
   "—","Marker draws rings; one ring empties as the line plays.","FX1 on plan.","As SC06.",
   "Plan: IT marker at 3.","'20 s' marker note (30 px).","Marker squeak; soft tick per 5 s of ring.",
   "Line 'Still things…' lands on the ring reaching zero.")
sc("SC13","ECU",sec,"Whatever lit four moves only in the dark. One floor at a time. Toward the newest movement it can find. When nothing moves, it goes back to four.",
   "Teach the threat's movement grammar.",
   "ECU lobby plan.",
   "—","Marker: dashed hop 3→2 drawn only through a shaded (dark) band; a curled arrow back to 4 on 'goes back to four'.",
   "FX1 on plan.","As SC06.","Plan: IT at 3; 'home' arrow to 4.","Marker notes: 'DARK ONLY' (30 px).",
   "Marker strokes synced to phrases.","Every later movement obeys this diagram.")
# ---------------- RULE 2 ----------------
sec = "Rule 2"
sc("SC14","CARD",sec,"Rule two.","Rule 2 heading.","Rule card over dimmed medium of YOU on flight 1–2.","—","—","None.","—","IT@3 lit.",
   "RULE 2 (96 px) / WHEN YOUR LIGHT GOES OUT, DON'T WAVE (44 px).","Silence.","Card text = rule.")
sc("SC15","M",sec,"Your light will go out on you. It always does, about halfway up the stairs.",
   "Normal habit setup.","Medium side view, YOU on flight 1–2, stopped.",
   "YOU: left foot on step 3, right on step 2 (contact both); hand on rail; gaze up toward FX3 glow.",
   "FX1 still on (YOU's light).","FX1 behind/below; FX3 glow above.","YOU rim-lit from below-left by FX1; upper body edges catch faint FX3 light.",
   "IT@3 lit.","—","Room tone.","Feet planted; no sliding.")
sc("SC16","CU",sec,"You know the move. Arms up. A little wave. The light comes back. Not tonight.",
   "Name the micro-habit and stop it mid-action.","Close-up YOU's right arm and shoulder.",
   "Right arm rises from rail 30° (shoulder + elbow, 0.4 s ease-out) on 'Arms up'; stops 5 cm short of full wave on 'Not tonight', holds 0.4 s, lowers back onto rail (contact).",
   "—","FX1 overhead.","Arm's top edge lit; arm shadow sweeps the wall and returns.","IT@3 lit.","—",
   "Fabric rustle on rise; silence on stop.","Hand returns to the same rail point.")
sc("SC17","ECU",sec,"When your light dims, freeze. The sensor turns amber first. You get two seconds.",
   "Teach the trigger signal for Rule 2.","ECU PIR1 + FX1.",
   "—","FX1 dims to 40%; PIR1 LED turns amber 0.5 s before 'amber'.","FX1 dimming.",
   "Bloom shrinks; amber LED falloff on dome only.","IT@3 lit.","—","Low electrical whine as it dims.","Amber appears before the word.")
sc("SC18","M",sec,"Then dark.",
   "Obey the rule in darkness.","Medium YOU on flight 1–2 (match of SC15).",
   "YOU frozen: no joint moves; breathing scale reduced to 1.0–1.01.",
   "FX1 off.","Sodium streetlight through L1 window (low, orange) + orange timer button glow (L1).",
   "YOU becomes a cobalt silhouette with readable eye-dots; window spill draws a faint orange rectangle on wall; no global glow.",
   "IT@3 lit (seen as glow above).","—","Relay click; then silence 1.2 s.","Readable at 320 px via window spill, not a fake glow.", hold=1.2)
sc("SC19","W",sec,"Three stays lit above you. Nothing new moves. Twenty seconds. Three goes dark. Then four turns on again.",
   "Consequence: obeying makes it lose YOU; it returns home.","Wide cutaway; 0.4 s cross-fade on 'Twenty seconds'.",
   "YOU frozen on flight 1–2.","FX3 on → off (click) → FX4 on (click); PIR4 blinks green.",
   "FX3 then FX4.","Lit patch moves from L3 to L4; YOU in sodium spill only.",
   "IT@3 → IT@4.","—","Clicks 0.5 s before 'goes dark' and 'four'.","Tracker obeys SC13 diagram.")
sc("SC20","ECU",sec,"It went back. Four is where it waits. It follows movement, not you.",
   "Plant: four is its home.","ECU PIR4 + FX4 (same as SC02).","—","LED double-blink.",
   "FX4.","As SC02.","IT@4 lit.","—","Two LED ticks.","Double-blink motif repeated (seed for SC69).")
# ---------------- RULE 3 ----------------
sec = "Rule 3"
sc("SC21","CARD",sec,"Rule three.","Rule 3 heading.","Card over dimmed wide.","—","—","None.","—","IT@4.",
   "RULE 3 (96 px) / CLIMB SLOWER THAN THE SENSOR CAN SEE (44 px).","Silence.","—")
sc("SC22","ECU",sec,"Your apartment is on five, the floor right above it. Four is in the way.",
   "Spatial goal and obstacle.","ECU lobby plan.","—",
   "Marker circles 5B; draws a line from YOU's position up to 5B that must cross L4 (red X at 4).",
   "FX1 on plan.","As SC06.","Plan: IT at 4 between YOU and 5B.","'5B' (30 px).","Marker squeak.","Same plan, same labels.")
sc("SC23","CU",sec,"Scared people take stairs two at a time. Don't.",
   "Micro-habit (rushing) stopped.","Close-up YOU's feet on flight 1–2.",
   "Right foot lifts toward step +2 (hip/knee, 0.25 s) → on 'Don't.' retracts and plants on step +1 (contact), hold 0.5 s.",
   "—","Sodium window spill (low).","Toe edges catch orange spill; step nosings visible.","IT@4 (dark now).","—",
   "Shoe scuff on plant.","Foot lands fully on tread.", hold=0.5)
sc("SC24","ECU",sec,"These sensors miss slow movement. One step. One breath. Another step.",
   "Teach the slow-climb technique.","ECU PIR2 (dark) with YOU's hood passing slowly beneath.",
   "Hood rises 1 step per 1.2 s (stepped holds between).","PIR2 LED stays dark.",
   "Sodium spill + orange button L2.","Dome edge faintly orange; no LED light.","IT@4 dark.","—",
   "One soft step sound per 'step'; breath on 'breath'.","LED provably dark during slow passage.")
sc("SC24b","ECU",sec,"On three, the dust on the rail is wiped clean in one spot. The size of a palm.",
   "Plant: something rested on three's rail when it stood there.","ECU handrail at L3, YOU's hand sliding up into frame.",
   "Hand slides 15 cm, stops 2 cm before the clean patch, lifts over it, continues.","Dust on rail; one palm-sized clean patch.",
   "Sodium spill L3 window.","Dust reads as fine pale speckle catching orange spill; clean patch darker and glossy.","IT@4 dark.","—",
   "Faint fabric-on-rail slide; stops at patch.","Patch sits where IT stood (L3) in SC08.")
sc("SC25","M",sec,"If the green eye above you blinks, it saw you.",
   "Set the trigger signal.","Medium side, YOU on flight 2–3 near L2.",
   "YOU climbing slowly; left hand slides on rail (contact).","—","Sodium + orange button L2.","Silhouette with edge light.",
   "IT@4 dark.","—","Steps.","Same rig proportions as SC15.")
sc("SC26","ECU",sec,"Stop.",
   "A slip: YOU moved too fast.","ECU PIR2 LED.","—","LED blinks green 0.5 s before 'Stop.'",
   "LED only.","12 px green falloff on dome.","IT@4 dark (now has a target: L2).","—","LED tick; then silence.",
   "Blink precedes the word.", hold=0.4)
sc("SC27","M",sec,"Let the light run out before you move again. Twenty seconds is a long time to hold a breath.",
   "Hold under pressure (time compressed).","Medium YOU frozen mid-step on flight 2–3; 0.4 s cross-fade for elapsed time.",
   "YOU frozen: right foot on edge of step, left hand on rail (contact); chest stays still (no breathing scale) for the hold.",
   "FX2 on (YOU's own light), then off after cross-fade.","FX2.","FX2 cone lights YOU from above: hood top bright, shadow pooled at feet; after off, sodium spill only.",
   "IT@4 dark; IT does not come (YOU stayed still).","20-s ring (0.45) at FX2.","Clock-like silence; one held breath.","No limb drift during hold.")
sc("SC28","W",sec,"Three turns on. It came one floor closer to the blink.",
   "Consequence of the slip: it moves toward the blink.","Wide cutaway.",
   "YOU on flight 2–3, frozen.","FX3 clicks on 0.5 s before 'Three'; PIR3 blinks; FX4 already dark.","FX3.",
   "FX3 cone lights L3 and the top of flight 2–3, a few treads above YOU's head; YOU stays in the dark below it.","IT@3 lit — one landing above YOU.","—",
   "Click; YOU's breath stops.","The lit patch ends above YOU's head: YOU is outside it.")
sc("SC28b","M",sec,"Hold. Twenty more seconds. Three goes dark, and four lights up again. Good.",
   "Obedience works; narrator approval (complicity seed).","Medium YOU frozen just below L3's lit edge; 0.4 s cross-fade.",
   "YOU frozen: right foot on tread edge, left hand on rail (contact); no breathing scale.","FX3 off → FX4 on (PIR4 blinks).",
   "FX3 then FX4 (distant).","While FX3 is on, its cone edge falls across the tread 20 cm above YOU's head; then only sodium spill.",
   "IT@3 → IT@4.","20-s ring (0.45) at FX3.","Silence, clicks; 'Good.' dry, close-mic.","Lit edge never touches YOU.")
# ---------------- RULE 4 ----------------
sec = "Rule 4"
sc("SC29","CARD",sec,"Rule four.","Rule 4 heading.","Card over dimmed medium.","—","—","None.","—","IT@4 dark.",
   "RULE 4 (96 px) / PUT YOUR KEYS DOWN (44 px).","Silence.","—")
sc("SC30","ECU",sec,"Your keys are in your fist. One between each finger. Everyone does that.",
   "Micro-habit: keys as a weapon.","ECU YOU's right fist with three keys between fingers.","Fist clenched; knuckles shift 2° on 'Everyone'.",
   "Keys protrude between fingers.","Sodium spill.","Metal edges catch orange glints.","IT@4 dark.","—","Faint metal creak.","Same key ring in SC31, SC33, SC63.")
sc("SC31","ECU",sec,"They swing when you climb. They chime against each other.",
   "Problem: small motion and sound.","ECU key ring hanging below fist, mid-step.",
   "Fist bobs 1 cm per step.","Keys swing 15° arc, collide on 'chime'.","Sodium spill.","Glint moves with swing.","IT@4 dark.","—",
   "Key chime synced to collision frame.","Swing arc consistent with step timing.")
sc("SC32","ECU",sec,"It notices small movement, even in the dark.",
   "Consequence shown: it reacts to the chime.","ECU PIR4 (two floors up).","—","PIR4 blinks green once, 0.5 s before 'notices'.",
   "LED only.","Green falloff on dome.","IT@4 stirs (alert).","—","LED tick; distant floor creak above.","Reaction precedes narration.")
sc("SC33","ECU",sec,"Set them down on the step. Slowly. No sound.",
   "Obey: physical action.","ECU step tread between L3 and L4; hand enters.",
   "Hand lowers keys 20 cm over 1.0 s (wrist + fingers only); fingers open one at a time; keys contact tread.",
   "Keys settle without bounce.","Sodium spill.","Hand shadow on tread; keys' edges glint.","IT@4 dark.","—","No sound (deliberate).","Keys left exactly at step 3-4 front edge.")
sc("SC34","CU",sec,"You can come back for them in the morning. Your door key is the brass one, on top.",
   "Plant: keys left behind.","Close-up keys on step, hand withdrawing.","Hand withdraws 15 cm, out of frame.","Keys remain.",
   "Sodium spill.","As SC33.","IT@4 dark.","—","Room tone.","Keys' position recorded for SC63.")
# ---------------- RULE 5 ----------------
sec = "Rule 5"
sc("SC35","CARD",sec,"Rule five.","Rule 5 heading.","Card over dimmed medium.","—","—","None.","—","IT@4 dark.",
   "RULE 5 (96 px) / DON'T STOP ON A LANDING (44 px).","Silence.","—")
sc("SC36","M",sec,"Your legs are shaking by floor three. You'll want to stop on a landing. Flat floor. A wall to lean on.",
   "Pressure: fatigue.","Medium side, YOU on flight 3–4, L3 landing behind.",
   "Knees tremble 1° at 8 Hz (knee joints only); right hand reaches 20 cm toward L3 wall, stops short.",
   "—","Sodium spill L3 window.","YOU edge-lit orange; wall rectangle glow.","IT@4 dark.","—","Uneven breath.","Tremor isolated to knees.")
sc("SC37","ECU",sec,"But the sensors watch the landings. Not the steps between them.",
   "Teach blind zones (mechanism).","ECU lobby plan.","—","Marker shades coverage over each landing; steps left blank.",
   "FX1 on plan.","As SC06.","Plan: IT at 4.","'BLIND' on steps (30 px).","Marker squeak.","Diagram stays on paper.")
sc("SC38","M",sec,"Rest on the fourth landing until it's quiet.",
   "Narrator slip (midpoint).","Medium low angle, YOU on steps just below L4.",
   "YOU's right foot lifts toward the L4 landing edge (hip/knee, 0.4 s), hangs 3 cm above it.",
   "—","Sodium spill L4 window.","Foot edge-lit; landing floor faint.","IT@4 dark (right there).","—","Breath held.","Foot does not touch the landing.")
sc("SC39","M",sec,"Below it. I meant the steps below it.",
   "Correction; seeds the reveal.","Same framing (state changed: foot retracts).",
   "Foot retracts and plants on the step (0.3 s); YOU sits on step (hips lower 40 cm over 0.8 s, hands on step for contact).",
   "—","Sodium spill.","As SC38.","IT@4 dark.","—","Silence 0.8 s after the line.","Seated contact: hips + both hands on step.", hold=0.8)
sc("SC40","M",sec,"From the steps, four is at eye level.",
   "New viewpoint on four.","Medium POV-ish over YOU's shoulder: L4 floor edge at eye level.","YOU seated; head turns 10° up.",
   "—","Sodium spill L4.","L4 floor faint orange.","IT@4 dark (unseen).","—","Room tone.","Eye line matches L4 floor edge.")
sc("SC41","ECU",sec,"There are two worn patches in its floor. Shoe-shaped. Facing the wall. Someone stood there long enough to wear through the paint.",
   "Plant: someone stood on four for a long time.","ECU L4 floor: two pale, shoe-shaped worn patches in the paint, toes to the wall.",
   "—","—","Sodium spill L4 window.","Patches slightly paler where orange spill hits; paint wear texture.",
   "IT@4 (standing there, unseen).","—","Silence.","Patch positions recorded for SC59 and SC69.")
# ---------------- RULE 6 ----------------
sec = "Rule 6"
sc("SC42","CARD",sec,"Rule six.","Rule 6 heading.","Card over dimmed wide.","—","—","None.","—","IT@4 dark.",
   "RULE 6 (96 px) / IF EVERY LIGHT COMES ON, DON'T RUN (44 px).","Silence.","—")
sc("SC43","W",sec,"The lobby door opens below you. A neighbor, home late, with a grocery bag.",
   "Escalating exception arrives.","Wide cutaway.","NEIGHBOR (pale gray coat) enters lobby; YOU seated below L4, still.",
   "Lobby door swings open 70°; closes.","Sodium streetlight through open door; then FX1 on (neighbor's motion).",
   "Door wedge of orange light across lobby floor; then FX1 cone.","IT@4 dark.","—",
   "Door latch + street noise burst, cut off on close.","NEIGHBOR design distinct from YOU.")
sc("SC44","ECU",sec,"They press the orange button by the mailboxes.",
   "Cause of the all-lights state.","ECU orange timer button, neighbor's finger.","Finger presses 4 mm (contact), releases.",
   "Button ring LED fills.","Button's own orange glow + FX1.","Orange falloff 30 px on wall; finger lit from button below.","IT@4 dark.","—",
   "Mechanical click on contact frame.","Contact frame exact.")
sc("SC45","W",sec,"Every light comes on at once. One minute, every floor.",
   "New state: all fixtures on.","Wide cutaway.","YOU seated; flinches 5° (head) at the snap.",
   "FX1–FX6 snap on together 0.5 s before 'Every'.","FX1–FX6.","Six cones; every landing lit; flights partially lit from above.",
   "IT@4 frozen (can't move in light).","—","Relay clatter (six clicks within 2 frames).","All six on simultaneously.")
sc("SC46","M",sec,"Now you can see four. Nobody is standing on it. But the light throws a shadow on the worn patches.",
   "Visible proof without showing a creature.","Medium on L4 from YOU's seated eye line.",
   "YOU's head tilts up 5°; eyes widen.","Under FX4: a person-shaped shadow lies across the worn patches, cast by nothing.",
   "FX4 directly above L4.","Shadow falls straight down and back from the fixture onto the patches (physically consistent with FX4's position); nothing in the air.",
   "IT@4 visible as shadow only.","—","Silence 0.5 s before 'shadow'; low hum.","Shadow direction matches FX4 position.")
sc("SC47","W",sec,"Your neighbor walks right past it. Their bag swings against their leg. Nothing happens. The lights were on. They kept moving.",
   "Temptation: proof that light is safe.","Wide cutaway; NEIGHBOR climbs (time-compressed walk cycle, grounded steps).",
   "NEIGHBOR climbs L1→L6 at normal pace; YOU presses into the wall to let them pass (torso shifts 10 cm).",
   "Shadow on L4 rotates its head 20° as NEIGHBOR passes.","FX1–FX6.","Neighbor's shadow moves under each fixture correctly.",
   "IT@4 shadow tracks NEIGHBOR.","—","Neighbor footsteps synced to foot contacts.","Feet contact every tread.")
sc("SC47b","CU",sec,"They don't look up at four. People never do.",
   "Make the threat's indifference to light-time movement concrete.","Close-up NEIGHBOR passing L4, profile.",
   "NEIGHBOR's gaze stays on the treads (head down 15°); bag swings 10°; feet contact each tread.","Shadow on L4 floor turns its head.",
   "FX4 overhead.","Neighbor lit top-down; their shadow and IT's shadow both fall under FX4 consistently.","IT@4 shadow tracking.","—",
   "Footsteps; bag rustle.","Two shadows, one source.")
sc("SC48","CU",sec,"You'll want to run now. Past four. Home.",
   "Pressure.","Close-up YOU seated, three-quarter.",
   "Weight shifts forward 4 cm (hips); right hand grips rail (contact); gaze to five.","—","FX3/FX4 above.",
   "Hood top lit; face in partial shade.","IT@4.","—","Heartbeat-free: breath only.","Hand on rail.")
sc("SC49","ECU",sec,"Don't run while every light is on. The timer ends on every floor at once.",
   "Rule 6 + mechanism.","ECU orange button's ring LED draining.","—","Ring drains segment by segment.",
   "Button glow.","Orange falloff shrinks as ring drains.","IT@4.","—","Soft tick per segment.","Ring speed matches 60 s compressed.")
sc("SC50","M",sec,"And whatever is moving then is the newest thing in the dark. You would be halfway up the flight.",
   "Stakes of running.","Medium YOU seated, still.","YOU frozen; hand stays on rail.","—","FX3/FX4.","As SC48.","IT@4.","—","Room tone.","Stillness held.")
sc("SC51","W",sec,"Your neighbor's door closes on six.",
   "Newest movement = six.","Wide cutaway.","YOU still.","Door 6B closes.","FX1–FX6.","—","IT@4 (target: six).","—","Door close thud on contact frame.","Door 6B at top floor.")
sc("SC52","W",sec,"The minute ends.",
   "All dark at once.","Wide cutaway.","YOU still.","FX1–FX6 off together 0.5 s before line.","Sodium spill only.",
   "Every landing drops to orange window spill.","IT moves (unseen).","—","Six clicks, then 1.5 s silence.","Simultaneous off.", hold=1.5)
sc("SC53","W",sec,"Then five turns on. Your floor. Nobody is on five.",
   "Escalation: it's at YOU's door.","Wide cutaway.","YOU's head turns up 15°.","FX5 on 0.5 s before 'five'; PIR5 blinks.",
   "FX5.","FX5 cone on L5 floor and door 5B; empty.","IT@5 lit.","—","Click.","Moved one floor toward six, obeying SC13.")
# ---------------- RULE 7 ----------------
sec = "Rule 7"
sc("SC54","CARD",sec,"Rule seven.","Rule 7 heading.","Card over dimmed wide.","—","—","None.","—","IT@5 lit.",
   "RULE 7 (96 px) / TAKE FOUR BEFORE IT DOES (44 px).","Silence.","—")
sc("SC55","ECU",sec,"It's outside your door.",
   "Threat at home.","ECU door 5B: number plate, knob, mat; empty landing.","—","—","FX5 overhead.",
   "Cone lights door top and knob; mat lit; no shadow cast (nobody visible).","IT@5 lit.","Door plate '5B' (32 px).","Silence.","5B matches mailbox.")
sc("SC56","CU",sec,"When you see your own floor, you'll want to hurry. Don't.",
   "Micro-habit: hurrying home.","Close-up YOU seated, looking up.","Hips lift 3 cm (starting to rise) → stop on 'Don't.', settle back (contact).",
   "—","FX5 glow above.","Rim of hood catches FX5 light.","IT@5.","—","Breath.","Settles back to same contact.")
sc("SC57","ECU",sec,"When nothing moves, it goes back to four. But it can't stand where someone's already standing.",
   "The trap disguised as a rule (complicity).","ECU lobby plan.","—","Marker arrow 5→4; then a stick mark placed on 4 'occupied', arrow blocked.",
   "FX1 on plan.","As SC06.","Plan: IT at 5, home arrow blocked.","'OCCUPIED' (30 px).","Marker squeak.","Consistent with SC13 grammar.")
sc("SC58","M",sec,"Take four before it does. Step onto the landing slowly, the way you climbed. Face the wall, and hold still.",
   "YOU obeys.","Medium side on L4.",
   "YOU rises (hips up 40 cm over 0.8 s, hands push off step), steps up onto L4 (two steps, 0.6 s each), turns to face the wall (90° over 0.6 s), arms at sides; hold.",
   "—","Sodium spill L4 + FX5 glow from above.","YOU's back lit faintly from FX5 above; face toward wall in shadow.","IT@5 lit.","—",
   "Two soft steps on landing.","Feet land on the worn patches (same coordinates as SC41).")
sc("SC59","ECU",sec,"Your feet fit the worn patches.",
   "Payoff of the worn patches (clue 1).","ECU YOU's shoes on the patches.","Shoes settle; toes to wall.","—","Sodium spill.","Shoes cover patches exactly.",
   "IT@5.","—","Silence.","Exact fit, same orientation.")
sc("SC60","W",sec,"Five goes dark.",
   "It moves.","Wide cutaway.","YOU still on L4.","FX5 off 0.5 s before line.","Sodium spill.","—","IT moving (unseen).","—","Click; silence 1.0 s.","—", hold=1.0)
sc("SC61","M",sec,"Something comes down the stairs. Slowly. One step, one breath, another step.",
   "Approach, heard not seen.","Medium: YOU's back on L4, flight 4–5 behind.","YOU frozen; no motion.","—","Sodium spill.","—",
   "IT descending flight 5–4.","—","Five footsteps descending, slower than human, synced to imagined treads.","Steps count = treads in flight.")
sc("SC62","ECU",sec,"Four turns on as it passes. Its shadow crosses the wall in front of you. Don't turn around.",
   "Shadow moving against established light.","ECU wall in front of YOU's face.","YOU frozen (eye-dots only, no blink).",
   "FX4 on (0.5 s before 'Four'); a tall shadow sweeps right→left across the wall.","FX4 above/behind YOU.",
   "Shadow geometry consistent with FX4 above and the stairs behind; YOU's own shadow static on the wall beside it.",
   "IT passing L4 (lit).","—","Click; cloth-like whisper as shadow sweeps.","Two shadows: YOU's static, IT's moving.")
sc("SC63","ECU",sec,"It stops on the step below you. Your keys lift off the step.",
   "Payoff of the keys (clue 2).","ECU step 3-4 tread with keys.","—","Keys rise 10 cm, ring swings, carried upward out of frame (no visible hand).",
   "FX4 spill reaching the step.","Keys glint; their shadow lifts off the tread.","IT on step 3-4.","—","Key jingle synced to lift.","Same keys, same spot as SC34.")
sc("SC64","W",sec,"Then it climbs back up. Five turns on. Your door unlocks. Your door closes.",
   "Replacement: it goes home as YOU.","Wide cutaway.","YOU still on L4 facing wall.",
   "FX5 on; door 5B opens (warm interior light wedge), closes; warm line under door remains.","FX4, FX5, 5B interior.",
   "Warm #FFC98A wedge on L5 floor, then a thin line under the door.","IT@5 → inside 5B.","—",
   "Ascending steps; lock turn (two-stage click) on contact; door close.","Lock sounds sync to door state.")
sc("SC65","M",sec,"Four is still on. Stand still. Twenty seconds.",
   "The swap condition.","Medium side, YOU on L4 under FX4; 0.4 s cross-fade.","YOU frozen.","FX4 on → 20-s ring empties → FX4 off.",
   "FX4.","Cone lights YOU's hood top; floor shadow under feet; after off, sodium spill only.","Swap in progress.","20-s ring (0.45).",
   "Silence; ring ticks.","Light goes out on a still person — the rule from SC12.", hold=0.6)
# ---------------- ENDING ----------------
sec = "Ending"
sc("SC66","CU",sec,"You can stop holding your breath now. It won't matter. The sensor can't see you anymore.",
   "YOU is now a still thing.","Close-up YOU's face in sodium spill.","Chest releases (scale 1.02→1.0) — PIR4 does not react.",
   "PIR4 stays dark (inset corner of frame).","Sodium spill.","Face edge-lit orange; eye-dots.","YOU is the one on four.","—","One exhale; no LED tick.","No detection on breath.")
sc("SC67","W",sec,"Every rule kept you still. Every rule kept you in the dark. Thank you for standing still. I stood there for years. The patches are mine.",
   "Reveal: the narrator was the one on four.","Wide cutaway: YOU on L4 dark; 5B with warm line under the door.","YOU still.","—",
   "Sodium spill; 5B interior warm line.","—","Narrator inside 5B.","—","Narration closer-miked; TV murmur faint behind 5B.","Line under door continuous since SC64.")
sc("SC67b","CU",sec,"When someone new walks in, you'll turn toward them. You won't mean to. Four will light up, and they'll see it.",
   "Explain the cycle that produces the opening image.","Close-up YOU on L4 in sodium spill, facing wall.","YOU's head turns 5° toward the stairwell and stops (only the neck moves).",
   "PIR4 LED blinks green twice in the corner.","Sodium spill.","Edge light on hood; eye-dots.","YOU is the one on four.","—",
   "Two LED ticks.","Double-blink matches SC02/SC20.")
sc("SC68","ECU",sec,"",
   "Payoff of the mailbox (clue 3).","ECU mailbox 5B (as SC10), next evening.","—","The older label 'D. HALE' is taped back over YOU's name.",
   "FX1 overhead.","As SC10.","—","Label 30 px.","Paper rustle.","Same box, same framing as SC10.", pre=1.8)
sc("SC69","W",sec,"Floor four just turned on.",
   "Reinterpreting final image (mirror of SC01).","Wide cutaway, identical framing to SC01.",
   "STRANGER (gray) enters lobby, looks up 25°. On L4, YOU turns head 15° toward the stairwell — FX4 clicks on.",
   "FX4 on; PIR4 double-blink.","FX1, FX4.","FX4 cone now reveals YOU standing on the worn patches, facing the wall.",
   "YOU@4 lit.","—","Click 0.5 s before line.","Matches SC01 composition exactly; now readable as YOU.")
sc("SC70","W",sec,"Don't climb into a light you didn't turn on.",
   "Closing callback.","Same wide, hold.","YOU still on L4; STRANGER looks up.","—","FX1, FX4.","As SC69.","YOU@4 lit.","—",
   "Room tone; silence to black.","Hold then cut to black.", hold=2.5)

# ---------------- build ----------------
mapping = {}
for i, s_ in enumerate(S): mapping[s_["id"]] = f"SC{i+1:02d}"
pat = re.compile(r"\bSC\d{2}b?\b")
for s_ in S:
    for k in ["purpose","framing","pose","prop","light","falloff","tracker","text","sound","check"]:
        s_[k] = pat.sub(lambda m: mapping.get(m.group(0), m.group(0)), s_[k])
    s_["id"] = mapping[s_["id"]]
t = 0.0; rows = []; words_total = 0
for s in S:
    w = len(re.findall(r"[A-Za-z0-9']+", s["narr"]))
    words_total += w
    dur = s["pre"] + w / WPS + s["hold"] + (0.3 if w else 0)
    s["start"], s["end"], s["words"] = t, t + dur, w
    t += dur
total = t
fmt = lambda x: f"{int(x//60)}:{x%60:04.1f}"
ecu = sum(1 for s in S if s["tag"] == "ECU"); n = len(S)
holds = sum(s["pre"] + s["hold"] for s in S)

cols = ["Scene ID & provisional time","Exact narration passage","New information / story purpose","Framing & camera behavior",
        "Character pose & movement","Prop / environment action","Primary light source","Falloff, shadows & occlusion",
        "Threat tracker state","On-screen text","Sound & synchronization","Continuity & acceptance check"]
esc = lambda x: (x or "—").replace("|","/").replace("\n"," ")
lines = ["| " + " | ".join(cols) + " |", "|" + "---|"*len(cols)]
cur = None
for s in S:
    if s["sec"] != cur:
        cur = s["sec"]; lines.append("| **" + cur + "** |" + " |"*(len(cols)-1))
    lines.append("| " + " | ".join(esc(x) for x in [f"{s['id']} [{s['tag']}] {fmt(s['start'])}–{fmt(s['end'])}", s["narr"] or "(silent)", s["purpose"],
        s["framing"], s["pose"], s["prop"], s["light"], s["falloff"], s["tracker"], s["text"], s["sound"], s["check"]]) + " |")
os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, "scene_table.md"), "w").write(
    "# Stairwell Lights — scene breakdown (12 columns)\n\n"
    "All times are **provisional**, estimated at ~180 words/min plus authored holds. They are not verified playback; re-time against the recorded narration's word timestamps.\n\n"
    "Tags: W wide · M medium · CU character close-up · ECU object/interface/diagram extreme close-up · CARD rule/title card. "
    "Abbreviations: L4 = landing 4; FX4 = landing-4 ceiling fixture; PIR4 = its motion sensor; IT = the one on four.\n\n" + "\n".join(lines) + "\n")
# Script: spoken text only in plain lines; directions in ▸ italics.
sl = ["# Stairwell Lights — narration script\n", "Spoken text is plain. Lines starting with ▸ are production directions and are not spoken.\n"]
cur = None
for s in S:
    if s["sec"] != cur:
        cur = s["sec"]; sl.append(f"\n## {cur}\n")
    sl.append(f"▸ *{s['id']}: {s['purpose']}*")
    if s["narr"]: sl.append("\n".join(re.split(r"(?<=[.?!])\s+(?=[A-Z\"])", s["narr"])))
    sl.append("")
open(os.path.join(OUT, "script.md"), "w").write("\n".join(sl) + "\n")
spoken = " ".join(s["narr"] for s in S if s["narr"])
sents = [x for x in re.split(r"(?<=[.?!])\s+", spoken) if x.strip()]
avg = sum(len(re.findall(r"[A-Za-z0-9']+", x)) for x in sents) / len(sents)
stats = dict(scenes=n, ecu=ecu, ecu_pct=round(100*ecu/n,1), words=words_total, sentences=len(sents), avg_sentence_words=round(avg,1),
             narration_minutes=round(words_total/WPS/60,2), holds_seconds=round(holds,1), runtime=fmt(total), runtime_s=round(total,1))
open(os.path.join(OUT, "stats.json"), "w").write(json.dumps(stats, indent=1))
print(json.dumps(stats, indent=1))
