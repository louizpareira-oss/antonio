# Generates the Rear Left production package: script.md, scene_table.md, stats.json.
# One data source, so the narration in the script and the table can never drift apart.
# Usage: python3 build_package.py [output dir]   (defaults to this folder)
import json, os, re, sys

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.abspath(__file__))
WPS = 3.0  # ~180 words/min: the pace measured on the Charliee takes used for Two Peepholes

S = []
def sc(id, tag, sec, narr, purpose, framing, pose, prop, light, falloff, tracker, text, sound, check, pre=0.0, hold=0.0, voice="N"):
    S.append(dict(id=id, tag=tag, sec=sec, narr=narr, purpose=purpose, framing=framing, pose=pose, prop=prop, light=light,
                  falloff=falloff, tracker=tracker, text=text, sound=sound, check=check, pre=pre, hold=hold, voice=voice))

# Abbreviations used in the cells:
# DASH instrument cluster · RL rear-left door-ajar segment · RB rear-left seatbelt-unbuckled icon
# PAB passenger-airbag status lamp (overhead console, under the mirror) · MEDIA centre screen · YOU protagonist (cobalt hoodie)
# [true: …] = where it really is. It is never drawn.

sec = "Cold open"
sc("SC01","ECU",sec,"You pull away from pump six. A light comes on. A little red door on your dashboard.",
   "Anomaly in the first frame. The 5 mph trigger is visible but unexplained (seed for the ending).",
   "ECU DASH: speedometer low arc and door diagram. Locked-off camera.",
   "—","Needle rises 0→5 mph. At exactly 5 the RL segment lights red.",
   "DASH backlight (cool white) + gas-canopy LEDs through the windshield.",
   "Canopy light glances across the cluster glass top-left. Icon glow stays inside its glyph (no bloom).",
   "RL red, steady. [true: rear-left seat; door unlatched]","Diegetic: '5 mph' digital readout (32 px).",
   "Door-ajar chime on the icon frame, 0.6 s before the first word. Engine idle.","Icon lights exactly at 5 mph, before the narration names it.", pre=0.6)
sc("SC02","M",sec,"Ten minutes later, it's still on. Rear left. The door behind you. Nobody has opened it in weeks.",
   "Geography: the warning is the door directly behind YOU, a door nobody uses.","Medium interior from the passenger seat toward YOU. The rear-left door is visible over YOU's shoulder. 0.4 s cross-fade in (time passage).",
   "YOU seated, hands at 9 and 3 on the wheel (contact), gaze forward. No head turn.","Rear-left door looks shut from inside.",
   "DASH backlight from below + sodium streetlamps overhead.","Cool under-light on chin and hands. Every 3 s an orange pool slides along the roof liner, front to back.",
   "RL red. [true: rear-left seat]","—","Highway tyre roar, low.","Rear-left door appears closed in frame.")
sc("SC03","CU",sec,"You'll want to pull over and slam it shut. Everyone does.",
   "Name the automatic reaction.","Close-up YOU, three-quarter front.",
   "Eyes flick 15° toward the shoulder and back (eyes only, 0.3 s each way). Hands stay on the wheel.","—",
   "DASH backlight.","Cool under-light on the face; eye-dots readable.","RL red.","—","Indicator stalk not touched (no click).","No head turn.")
sc("SC04","CARD",sec,"Rule one. Don't pull over.","Rule 1, first half.","Rule card over the DASH, dimmed to 25%.","—","—","None (graphic card).","Underlying frame dimmed to 25%.",
   "RL red (dimmed).","RULE 1 (96 px) / DON'T PULL OVER. LOCK ALL DOORS. (44 px)","Silence under the line.","Card text matches narration.")
sc("SC05","ECU",sec,"A loose door flickers on bumps. This one doesn't flicker. It stays on. Steady. At sixty.",
   "Rule out the ordinary explanation.","ECU DASH, tighter on the door diagram and the needle at 60.",
   "—","Wheels hit a road seam: the needle shivers ±1 mph, the RL segment does not flicker.",
   "DASH backlight + passing sodium lamps.","A sodium pool sweeps the cluster glass every 3 s; the icon stays constant underneath.",
   "RL steady at 60 mph.","'60' readout (32 px).","Road-seam thump synced to the needle shiver. No chime.","Icon constant through the bump.")
sc("SC06","W",sec,"Something is holding that door.",
   "The narrator's cover story. The frame shows nothing outside.","Wide exterior side view. Camera locked to the car; road and lamps scroll past.",
   "YOU visible through the side glass, driving.","Rear-left door exterior: no hand, nothing on the handle.",
   "Headlights forward; sodium lamps overhead.","Each lamp drops a moving orange pool across the roof and doors; the rear-left handle catches a highlight with nothing on it.",
   "RL red. [true: inside]","—","Wind rush; lamp hum pass-bys.","Nothing drawn on the car's exterior.")
sc("SC07","ECU",sec,"Press Lock All. Once.",
   "Rule 1, second half: the act the ending turns against YOU.","ECU centre console: LOCK ALL button, coffee cup in the holder beside it.",
   "YOU's right index finger presses the button 4 mm (contact frame), releases.","Button's padlock glyph lights green. Coffee surface still.",
   "Button LED + DASH spill.","Green falloff 20 px around the button only; the coffee lid catches a thin cool line.","RL red.","Button glyph (no text).",
   "Button click on the contact frame.","Finger touches the button, not the air above it.")
sc("SC08","ECU",sec,"Four clicks. Every door locked. Now drive.",
   "Confirm the sealed car.","ECU driver-door sill: lock pin drops; DASH padlock glyph appears in the corner.",
   "—","Lock pin drops 8 mm.","DASH backlight.","Pin's top edge catches cool light.","RL red; padlock locked.","—",
   "Four lock clicks in sequence (front-left, front-right, rear-right, rear-left). The rear-left click is the quietest.","Four clicks = four doors.")
sc("SC09","CARD","Title","",
   "Title.","Black card.","—","—","None.","—","RL red (offscreen).",
   "WRONG KNOCK (34 px, 0.45) / IF YOUR CAR SAYS THE DOOR BEHIND YOU IS OPEN (84 px).","Silence, then engine hum returns.","—", pre=2.4)

sec = "Pump six"
sc("SC10","W",sec,"Back at pump six, you went inside to pay.",
   "Flashback to the moment it got in.","Wide: the shop interior from behind the counter. YOU at the till; the car at pump 6 through the window. 0.4 s cross-fade in.",
   "YOU at the counter, back to the window, hand on the counter (contact).","Pump 6 screen lit. Outside, the car sits dark.","Shop ceiling panels + canopy LEDs outside.",
   "YOU top-lit by the shop panels; the car evenly lit under the canopy.","[true: crossing the forecourt]","Pump sign '6' (32 px).",
   "Shop door chime; fridge hum; outside, one car door thunks shut (very low).","Car parked nose-out at pump 6.")
sc("SC11","M",sec,"You left the car unlocked. It was only two minutes.",
   "Plant: the dome light is still fading as YOU walks back (a door closed seconds ago).","Medium exterior: YOU walking to the car, coffee in the left hand, paper bag in the right arm.",
   "Three steps (heel-toe contact), gaze on the car.","Inside the car, the dome light glows warm and fades to off over 1.5 s as YOU arrives.",
   "Canopy LEDs + the car's dome light.","Warm dome glow fills the cabin glass, then fades. Canopy light stays constant on YOU.",
   "[true: rear-left seat, door pulled to but unlatched]","—","Footsteps. The narration does not mention the dome light.","Dome fade ends before YOU touches the handle.")
sc("SC12","ECU",sec,"Your bag went on the passenger seat. Your coffee went in the holder.",
   "Plant the baseline: a light bag leaves the passenger airbag OFF; plant the coffee.","ECU passenger seat from the driver's side; the PAB lamp at the top edge of frame.",
   "YOU's hand sets the bag down (contact), withdraws.","Bag rests upright; cushion barely dents. PAB lamp reads PASSENGER AIRBAG OFF.",
   "Canopy light through the windshield.","Bag casts a short shadow toward the door; the PAB lamp is a small amber glyph.",
   "PAB OFF.","PAB lamp 'Passenger airbag OFF' (28 px).","Paper rustle; cup seated in the holder.","Seat dent ≤ 5 mm (the bag is light).")
sc("SC13","ECU",sec,"Your mirror was tilted down. You fixed it without thinking.",
   "Plant: someone in the back moved the mirror.","ECU rear-view mirror, tilted down: its glass shows the rear-left cushion, dented.",
   "YOU's fingers tilt the mirror up 6° (contact on the frame); the dent leaves the mirror's view.","—",
   "Canopy light.","Mirror glass reflects the canopy brightly once tilted up.","[true: the dent in the mirror is it]","—",
   "Mirror ball-joint click.","Dent visible for ≥0.5 s before the tilt.")
sc("SC14","ECU",sec,"",
   "Plant: the rear-left door is visibly unlatched as the car rolls out.","ECU exterior rear-left door seam as the car leaves pump 6.",
   "—","A 1 cm dark gap along the rear-left door edge, unchanged as the car moves.","Canopy LEDs.","The gap reads as a black line between two lit panels.",
   "[true: holding the door to from inside]","—","Tyres; no chime yet (under 5 mph).","Gap visible for 1.2 s, then cross-fade back to the highway.", pre=1.2)

sec = "Rule 2"
sc("SC15","CARD",sec,"Rule two. Keep the needle above twenty.","Rule 2.","Rule card over the dimmed speedometer.","—","—","None.","—","RL red.",
   "RULE 2 (96 px) / KEEP THE NEEDLE ABOVE 20 (44 px)","Silence.","—")
sc("SC16","ECU",sec,"Lock All can't hold a door that isn't latched. Rear left isn't.",
   "Escalation: locking was not enough (and the viewer learns the door is unlatched).","ECU DASH door diagram with the padlock glyph.","—",
   "Padlock lit, but the RL door panel in the diagram is drawn swung 10° out.",
   "DASH backlight.","Glyph glow stays inside its outline.","RL red; padlock locked.","—","Silence under the second sentence.","Padlock glyph identical to SC08.")
sc("SC17","ECU",sec,"At speed, a hand outside can only hold on. It needs you slow to pull it open.",
   "Cover story; the frame contradicts it (no hand).","ECU exterior rear-left handle at 60 mph.",
   "—","Handle empty; a sodium pool slides across it.","Sodium lamps.","The highlight slides along the handle chrome; nothing casts a shadow on the door.",
   "RL red. [true: inside]","—","Wind roar.","Handle provably empty for the whole line.")
sc("SC18","W",sec,"Exit twelve. You have to take it.",
   "A forced slowdown approaches.","Wide exterior: overhead green sign EXIT 12, lit by the headlights.","—","Sign rushes toward camera.",
   "Headlights.","Retroreflective letters flare white as the beams hit; the rest stays dark.","RL red.","Sign 'EXIT 12' (36 px).","Sign whoosh overhead.","Exit 12 matches the route plan.")
sc("SC19","CU",sec,"You'll want to brake for the ramp. Everyone brakes for the ramp. Lift off the gas instead. Let the curve take the speed.",
   "Micro-habit (braking) replaced by an easing action.","Close-up YOU's right foot in the footwell.",
   "Foot lifts off the gas 2 cm (ankle only), hovers over the brake, does not press. Heel stays on the mat (contact).","—",
   "DASH spill into the footwell.","Faint cool light on the shoe's top edge; pedals in shadow.","RL red.","—","Engine note drops.","Heel never leaves the mat.")
sc("SC20","ECU",sec,"Forty. Thirty. Twenty-two. The light flickers. It's pulling harder.",
   "The tracker reacts to speed (cover story). Truthfully, it is shifting its weight.","ECU DASH: needle and RL segment together.",
   "—","Needle sweeps 40→30→22; RL flickers off/on (2 frames) at 22, 0.5 s before 'flickers'.",
   "DASH backlight.","Flicker only inside the icon.","RL flickering. [true: shifting in the seat]","Digital speed (32 px).","A faint latch rattle from behind.","Flicker begins before the word.")
sc("SC21","W",sec,"Twenty-one. The ramp straightens. Thirty again.",
   "Survive the slowdown.","Wide top-down of the curving ramp; the car follows the curve.","—","Headlight cones sweep along the guardrail.",
   "Headlights + one ramp lamp.","Cones slide across the rail reflectors in order.","RL red.","—","Tyre hum rises with speed.","Car stays in lane; speed never drops below 21.")
sc("SC22","ECU",sec,"Steady red.","The tracker settles.","ECU of the RL segment only (tightest framing).","—","RL steady again.","DASH.","—","RL steady.","—","Silence.","New framing (icon only).")

sec = "Rule 3"
sc("SC23","CARD",sec,"Rule three. Don't turn on the dome light.","Rule 3.","Rule card over the dimmed roof liner.","—","—","None.","—","RL red.",
   "RULE 3 (96 px) / DON'T TURN ON THE DOME LIGHT (44 px)","Silence.","—")
sc("SC24","ECU",sec,"Your thumb knows where the switch is.",
   "Micro-habit: reaching for the dome switch.","ECU overhead console: dome switch with the PAB lamp beside it.",
   "YOU's thumb rises into frame and stops 5 cm below the switch.","PAB lamp reads OFF.","DASH spill from below.","Thumb top lit faintly; switch in shadow.",
   "PAB OFF; RL red.","PAB lamp (28 px).","Sleeve rustle.","Same PAB lamp as SC12.")
sc("SC25","CU",sec,"Light the cabin, glance back, done. Everyone does. Don't.",
   "Name the habit and stop it.","Close-up YOU, eyes up toward the switch.","Eyes up 20°; on 'Don't.' they return to the road (0.2 s).",
   "—","DASH backlight.","Under-light on the face.","RL red.","—","Held breath.","Arm stays raised (continuity with SC24).")
sc("SC26","ECU",sec,"A lit cabin shows it which seat you're in. Even reaching is enough. Look. The light just moved to your door.",
   "Escalation: the warning jumps to YOU's own door.","ECU DASH door diagram.",
   "—","RL goes dark; the front-left (driver) segment lights red, 0.5 s before 'Look'.","DASH.","—",
   "Driver door red. [true: its hand on YOU's inside handle, reaching from behind]","—","Single chime at the jump.","The jump happens before 'Look'.")
sc("SC27","M",sec,"Hand back on the wheel.",
   "Obey; show the door that lit.","Medium from the passenger side: driver's door panel, inside handle, lock pin down.",
   "YOU's hand lowers to the wheel at 10 o'clock (contact).","Inside handle sits still.","DASH backlight + a passing sodium pool.",
   "The pool sweeps across the door panel; the handle casts a normal shadow.","Driver door red.","—","Wheel creaks under the grip.","Hand lands on the rim.")
sc("SC28","ECU",sec,"It goes back to rear left.","The tracker returns.","ECU DASH door diagram, wider (includes the speed readout).","—",
   "Driver segment off; RL back on.","DASH.","—","RL red.","—","Chime.","New framing vs SC26 (includes speed).")
sc("SC29","M",sec,"",
   "Plant: a streetlight sweep shows the rear-left cushion dented.","Medium side cross-section of the cabin (driver and rear seat visible).",
   "YOU driving, still.","Rear-left cushion pressed 4 cm, nothing visible on it.","Sodium lamp passing overhead.",
   "The orange pool travels windshield → front seats → rear seat; the dent's shadow shows for 3 frames, then darkness.",
   "[true: rear-left seat]","—","Lamp hum pass-by.","Dent visible only while the pool crosses it.", pre=1.4)

sec = "Rule 4"
sc("SC30","CARD",sec,"Rule four. At a red light, never shift into park.","Rule 4.","Rule card over the dimmed street.","—","—","None.","—","RL red.",
   "RULE 4 (96 px) / AT A RED LIGHT, NEVER SHIFT INTO PARK (44 px)","Silence.","—")
sc("SC31","W",sec,"The first light on Harlan turns red. The road is empty. You stop anyway.",
   "A forced stop.","Wide exterior: empty avenue, traffic signal ahead; the car rolls to a stop at the line.",
   "—","Signal yellow → red 0.5 s before 'red'.","Traffic signal + streetlamps + headlights.",
   "Red light tints the hood and windshield; headlight cones stop at the stop line.","RL red.","Street sign 'Harlan Av' (30 px).",
   "Brake hiss; the signal relay clicks.","Car stops before the line.")
sc("SC32","ECU",sec,"Long lights make people shift into park.",
   "Micro-habit: shifting to park.","ECU gear selector with YOU's hand on it.","Thumb rests on the release button, presses 1 mm, stops.",
   "—","Red signal through the windshield + DASH spill.","Red cast on the knuckles; selector in shadow.","RL red.","Selector letters P R N D (30 px).","—","Selector stays in D.")
sc("SC33","ECU",sec,"Your car unlocks every door in park.","Stake of the rule.","ECU DASH gear readout 'D' beside the padlock glyph.","—",
   "Padlock locked; 'D' lit.","DASH.","—","RL red; locked.","'D' (32 px).","—","Padlock glyph matches SC08 and SC16.")
sc("SC34","CU",sec,"Foot on the brake. Stay in drive.","Obey.","Close-up YOU's right foot on the brake pedal.",
   "Foot presses the pedal (contact) and holds; ankle steady.","—","Red signal light into the footwell.","Faint red on the shoe.","RL red.","—","Pedal creak.","Constant pressure, no slip.")
sc("SC35","ECU",sec,"Zero miles an hour. A chime. A new light. Rear seat, left side. Seatbelt unbuckled.",
   "Escalation 1 → 2: the rear seat sensor says someone is sitting behind YOU.","ECU DASH rear-row seat diagram beside the door diagram.",
   "—","Speed 0. The rear-left seat icon lights red with an unbuckled-belt glyph, 0.5 s before 'A chime'.","DASH + red signal.",
   "Red signal washes the cluster glass; icons stay crisp.","RL red; RB red. [true: sitting there]","Seat diagram (glyphs).",
   "Belt chime: five rings, 1 s apart, starting on the icon frame.","RB lights before the narration names it.")
sc("SC36","CU",sec,"Rear sensors misread bags. You know that. Let it chime.",
   "Cover story; the viewer knows the bag is in front.","Close-up YOU in red signal light.","Jaw tightens; eyes forward; no head turn.",
   "—","Traffic signal (red).","Red key light from front-left; DASH under-light.","RL red; RB red.","—","The fifth chime ends under the line.","Bag is on the front seat (SC12).")
sc("SC37","W",sec,"Green. Go. Above twenty.","Escape the stop.","Wide exterior: the signal turns green; the car pulls away.","—",
   "Signal red → green.","Signal + streetlamps.","Green tint replaces red on the hood.","RL red; RB red (silent).","—","Relay click; acceleration.","Speed passes 20 before the cut.")

sec = "Rule 5 (midpoint)"
sc("SC38","CARD",sec,"Rule five. Don't touch the mirror.","Rule 5.","Rule card over the dimmed mirror.","—","—","None.","—","RL red; RB red.",
   "RULE 5 (96 px) / DON'T TOUCH THE MIRROR (44 px)","Silence.","—")
sc("SC39","ECU",sec,"It's tilted again. Up, at the roof. The bumps did that.",
   "Clue: the mirror moved again, now so YOU can't see the back seat.","ECU rear-view mirror, tilted up 8°: the glass shows only roof liner.","—",
   "Mirror angle changed since YOU fixed it in SC13.","Sodium pool passing.","The pool flashes across the roof liner in the glass; no seat is visible.","RL red; RB red.","—","Road hum.","Angle differs from SC13 (up, not down).")
sc("SC40","M",sec,"You'll want to set it right. Everyone does.",
   "Micro-habit.","Medium YOU from the passenger side, mirror at the top of frame.",
   "Right hand rises off the wheel toward the mirror (shoulder and elbow, 0.4 s), stops 3 cm from the frame, holds.","—",
   "DASH + sodium pools.","The hand's shadow does not touch the mirror.","RL red; RB red.","—","Sleeve rustle.","No contact with the mirror.")
sc("SC41","CU",sec,"See a face at the rear window, and you'll brake. And braking is slow.",
   "Cover story for not looking.","Close-up YOU, eyes forward; the hand lowers back to the wheel at frame edge.",
   "Hand returns to the wheel (contact) by the end of the line.","—","DASH backlight.","Under-light.","RL red; RB red.","—","Road hum.",
   "Hand lands where it started.")
sc("SC42","CU",sec,"Pull over under the next streetlight.",
   "The breach begins: the same voice, but from the car.","Close-up YOU, three-quarter: the centre screen glows at frame right.",
   "Eyes flick 20° to the centre screen on the first word; head stays still.","Centre screen switches from the map to a bright blue call screen.",
   "MEDIA screen (cool blue-white), new light in the scene.","Blue light rises on YOU's right cheek and rim when the screen changes; DASH under-light unchanged.",
   "RL red; RB red.","—",
   "HIJACK VOICE: the narrator's own voice, routed through the car speakers (band-limited, cabin reflections). Road noise does not duck.",
   "Screen change lands 0.3 s before the first word.", voice="HIJACK")
sc("SC43","ECU",sec,"Get out and check the rear-left latch yourself.",
   "The one true instruction in the film.","ECU MEDIA screen: INCOMING AUDIO / UNKNOWN DEVICE with a live waveform.",
   "—","Waveform moves with the voice.","MEDIA screen.","Screen light falls on the console and YOU's right knee only.",
   "RL red; RB red.","MEDIA: 'Incoming audio' / 'Unknown device' (32 px).","HIJACK VOICE continues, same processing.",
   "Waveform peaks match the syllables.", voice="HIJACK")
sc("SC44","ECU",sec,"Please disregard that last instruction. Do not take your foot off the gas.",
   "The narrator overrides the breach (pays off in the ending).","Same MEDIA screen: a 4-frame static bar cut, then the map returns.",
   "—","Static bar (diegetic failure), then the normal map.","MEDIA screen.","Static flashes the console grey for 4 frames; then map blue.",
   "RL red; RB red.","Map labels (28 px).","Hard static cut (4 frames, picture and sound together), then the narrator, dry and level, back on the normal mic.",
   "Static only here: a diegetic failure, not a style effect.")
sc("SC45","W",sec,"",
   "YOU passes the streetlight the voice meant, without slowing.","Wide exterior: one tall streetlamp ahead; the car passes through its pool.",
   "—","Car keeps its speed.","Streetlamp.","The car is lit fully for 0.6 s, then dark again.","RL red; RB red.","—","Pass-by hum; engine steady.","Speed constant.", pre=1.0)
sc("SC46","ECU",sec,"The rear window fogs in one small patch. That's the cold. Keep driving.",
   "Clue: breath on the inside of the glass.","ECU rear window from outside, behind the car.",
   "—","A palm-sized fog patch blooms and fades on the inside of the glass.","Headlights of a distant following car + sodium.",
   "The fog catches light as a soft grey bloom; the outer surface of the glass stays clean.","[true: rear-left seat, breathing]","—","Wind.","Fog is on the inside surface.")

sec = "Rule 6"
sc("SC47","CARD",sec,"Rule six. Passenger airbag light on? Both hands on the wheel.","Rule 6.","Rule card over the dimmed passenger seat.","—","—","None.","—",
   "RL red; RB red.","RULE 6 (96 px) / PASSENGER AIRBAG LIGHT ON? BOTH HANDS ON THE WHEEL. (44 px, two lines)","Silence.","—")
sc("SC48","ECU",sec,"The rear seat light goes out.","The rear seat empties.","ECU DASH rear-row seat diagram.","—","RB goes dark.",
   "DASH.","—","RL red; RB off. [true: moving forward]","—","Seat-foam creak behind YOU, very low.","RB off before the line.")
sc("SC49","ECU",sec,"Then the small light under your mirror changes. Passenger airbag. Off. Then on.",
   "Escalation 3: an adult's weight on the seat beside YOU.","ECU overhead console PAB lamp (as in SC24).",
   "—","PAB OFF → ON, 0.5 s before 'Then on'.","PAB lamp + DASH spill.","A small amber glow on the console only.","PAB ON. [true: in the passenger seat]",
   "PAB 'Passenger airbag ON' (28 px).","No chime; a tiny relay tick.","Same lamp as SC12, now ON.")
sc("SC50","ECU",sec,"That sensor wakes for an adult's weight. Your bag weighs two pounds. It tips into the footwell. The seat beside you sinks.",
   "Visual proof of weight.","ECU passenger seat (same angle as SC12).",
   "—","Cushion sinks 3 cm; the bag tips and slides into the footwell; the seatbelt buckle sways.","Sodium pools + DASH spill.",
   "The dent's shadow deepens as each pool passes; nothing above it casts a shadow.","PAB ON.","—","Paper bag slump; seat-foam creak.","Dent on the seat where the bag sat.")
sc("SC51","ECU",sec,"The console lid is still shut. Your coffee hasn't spilled.",
   "Proof it did not climb over.","ECU centre console: closed armrest lid, coffee cup in the holder.","—","Coffee surface still; lid shut.",
   "DASH spill.","Coffee lid reflects a thin cool line.","PAB ON.","—","Silence.","Cup position identical to SC07 and SC12.")
sc("SC52","CU",sec,"Nothing climbed over.","Reaction.","Close-up YOU, eyes flick right 10° and back.","Eyes only.","—","DASH backlight.","—","PAB ON.","—","One breath.","No head turn.")
sc("SC53","M",sec,"You'll want to reach right. Push the bag back. Feel the seat. Don't. Both hands on the wheel.",
   "Micro-habit stopped.","Medium from the windshield: YOU and the passenger seat side by side.",
   "Right hand lifts 4 cm off the wheel toward the seat (wrist and elbow), stops on 'Don't.', returns (contact).","Passenger seat dented, empty-looking.",
   "DASH + sodium pools.","Each pool shows the dent beside YOU; YOU's shoulder catches the light.","PAB ON.","—","Seat creak once.","Hand returns to 3 o'clock.")
sc("SC54","ECU",sec,"The rear-left light goes out. Behind you, the door clicks shut.",
   "The door warning ends: nothing is holding that door any more.","ECU DASH door diagram, centred on the rear-left panel.",
   "—","Car crosses a road seam; nothing is holding the door now, so it swings in and latches. RL goes dark 0.5 s before the line.","DASH.","—","RL off; PAB ON.","—","Rear-left latch click on the icon frame. No chime.","All door segments dark.")
sc("SC55","CU",sec,"It's on your side of the car now. Leaning on the passenger door. That's all the sensor feels.",
   "The narrator's last cover story; the viewer has already seen the dent inside.","Close-up YOU in profile; the passenger window behind, dark and empty.",
   "YOU still; breathing scale 1.0–1.02.","Passenger window exterior: nothing.","Sodium pools.","A pool passes the window: nothing outside casts a shadow.",
   "PAB ON. [true: beside YOU]","—","Road hum.","Window exterior visibly empty.")

sec = "Rule 7"
sc("SC56","CARD",sec,"Rule seven. Close the garage before you open your door.","Rule 7.","Rule card over the dimmed house front.","—","—","None.","—","PAB ON.",
   "RULE 7 (96 px) / CLOSE THE GARAGE BEFORE YOU OPEN YOUR DOOR (44 px)","Silence.","—")
sc("SC57","W",sec,"Birch Lane. Forty-one.","Home.","Wide exterior: house 41 with an attached garage and a porch light.","—","Porch light on.","Porch light + streetlamp.",
   "Warm porch pool on the steps; garage door dark.","PAB ON.","House number '41' (32 px).","Engine slows; indicator ticks once.","House geometry fixed for the ending.")
sc("SC58","CU",sec,"You'll want to stop in the driveway. Run for the front door. Everyone does. Don't. Out there, every door is a way in.",
   "Micro-habit: the dash for the front door.","Close-up YOU looking left at the porch.","Head turns 20° left toward the porch (neck), holds; turns back on 'Don't.'",
   "—","Porch light through the side window.","Warm light on the left cheek; DASH under-light.","PAB ON.","—","Breath.","Hands stay on the wheel.")
sc("SC59","W",sec,"Pull into the garage.","Enter the trap.","Wide exterior: the car drives into the open garage.","—","Garage opener bulb on.",
   "Opener bulb (warm) + headlights on the back wall.","Headlights hit the back wall and shrink as the car stops; the opener bulb lights the roof.","PAB ON.","—","Tyres on concrete.","Car fully inside.")
sc("SC60","ECU",sec,"Press the remote on your visor.","Seal.","ECU visor remote button.","Thumb presses (contact), releases.","Remote LED blinks red.",
   "Remote LED + opener bulb.","A tiny red blink on the visor fabric.","PAB ON.","—","Button click; opener motor starts.","Contact frame exact.")
sc("SC61","ECU",sec,"Watch the door come down in your side mirror.","Watch the seal close.","ECU driver's side mirror showing the garage door descending.",
   "—","Door panels descend in the mirror glass.","Streetlamp outside + opener bulb.","The outside light in the mirror shrinks with the door.","PAB ON.","—","Motor drone; chain rattle.","Side mirror, not the rear-view mirror (Rule 5).")
sc("SC62","W",sec,"The streetlight shrinks to a line under it. Then nothing. Sealed.",
   "The sealed space.","Wide interior garage side view: car, garage door, floor.","—","Door reaches the floor; the streetlight wedge on the concrete narrows to a line, then disappears.",
   "Streetlamp through the closing gap → opener bulb only.","The orange wedge on the floor thins to a line, then is gone; only the warm opener bulb remains.","PAB ON.","—","Door thud on the floor.","Door fully closed.")
sc("SC63","ECU",sec,"Now you can shift into park. Every door unlocks.",
   "Payoff of Rule 4: the rules only cared until the garage was sealed.","ECU gear selector (as in SC32), now moving.",
   "Hand slides the selector D → P (contact on the knob).","DASH padlock glyph opens.","Opener bulb + DASH spill.","Warm top light on the knuckles.","PAB ON; all doors unlocked.",
   "Selector letters (30 px).","Four unlock clicks, the rear-left one first.","Selector ends in P.")
sc("SC64","ECU",sec,"Engine off.","Stop.","ECU start button; YOU's finger presses it.","Finger presses (contact).","DASH dims to accessory mode; the PAB lamp stays lit.",
   "DASH dimming + PAB.","Cluster backlight drops to 20%.","PAB ON.","—","Engine stops; cooling metal ticks.","PAB still lit after engine off.")

sec = "Ending"
sc("SC65","ECU",sec,"Here's what the dashboard never told you.","Turn to the reveal.","ECU dimmed DASH; the door diagram all dark.","—","—",
   "DASH at 20%.","—","PAB ON.","—","Cooling ticks.","New state: cluster dimmed.")
sc("SC66","ECU",sec,"The door light only wakes above five miles an hour.",
   "Reveal 1: the 5 mph trigger seen in SC01.","ECU speedometer low arc (0–10 mph only), labelled; a new, tighter framing than SC01.","—",
   "Needle creeps 0→4 with RL dark; at 5 it lights.",
   "DASH backlight (memory, desaturated).","—","Memory.","'5 mph' (32 px).","The SC01 chime, muffled.","RL dark at 4 mph, lit at 5.")
sc("SC67","W",sec,"The door was open before you started the car. It opened while you paid.",
   "Reveal 2: the door, the thunk and the dome light.","Wide from inside the shop (as SC10), desaturated, but the camera now looks past YOU at the car.",
   "YOU at the till, back to the window (as SC10).","Outside: the car's dome light on; the rear-left door swings nearly shut and stops 1 cm short.",
   "Canopy LEDs + dome light (memory).","Dome glow fills the cabin glass; the gap is a dark line.","Memory.","—","The low door thunk from SC10, now clear.",
   "Matches the SC10 blocking; only the camera's attention changes.")
sc("SC68","ECU",sec,"You pressed Lock All. You locked it in with you.",
   "Reveal 3: complicity.","ECU Lock All button (as SC07), desaturated, with the rear-left lock pin in focus behind it.","Finger presses (memory).",
   "Glyph lights green; behind it, the rear-left pin drops while the door edge stays open.","As SC07 (memory).","—","Memory.","—",
   "The four lock clicks, slowed.","Rear-left pin drops; its door is still unlatched.")
sc("SC69","W",sec,"Every rule kept the car moving. Every rule kept it sealed. All the way home. Into a closed garage.",
   "The pattern of the rules.","Wide interior garage (as SC62), back in the present.","YOU inside, still.","The opener bulb switches off (timer).",
   "Opener bulb → off.","After the bulb goes off, only the DASH glow lights the windshield.","PAB ON.","—","Opener relay click.","Bulb off is the only change from SC62.")
sc("SC70","ECU",sec,"One instruction could have saved you. You were told to disregard it.",
   "Recontextualise the breach.","ECU MEDIA screen, dark, with a faint burned-in ghost of 'Unknown device'.","—","The ghost text fades.",
   "MEDIA residual glow.","A barely visible blue-grey ghost.","PAB ON.","Ghost 'Unknown device' (32 px, 0.3 opacity).","Silence.","Same screen as SC43.")
sc("SC71","M",sec,"The dome light comes on by itself. Now you can see the seat beside you.",
   "Physical light reveals the dent.","Medium interior: YOU and the passenger seat from the windshield (as SC53).",
   "YOU's head turns 30° right (neck), eyes to the seat; hands on the wheel (contact).","Dome light fades up warm; the passenger cushion is deeply dented; the bag lies in the footwell.",
   "Dome light (warm, overhead).","Warm light from above on the hood top, shoulders and the dent's rim; the dent's interior in shadow.","PAB ON.","—",
   "Dome relay click.","The head turn is YOU's first look at the seat in the film.")
sc("SC72","ECU",sec,"The belt pulls out. Slowly. Across nothing. Click.",
   "The final deliberate action.","ECU passenger seat belt and buckle.","—",
   "Webbing pays out 40 cm across the empty seat and latches; the passenger-belt glyph goes dark.","Dome light.",
   "The webbing casts a strap shadow across the dent.","PAB ON; passenger belt buckled.","—","Webbing ratchet; latch click on the contact frame.","Latch click on the exact frame.")
sc("SC73","CU",sec,"It isn't going anywhere.","Reaction.","Close-up YOU under the dome light.","Eyes widen 10%; no other movement.","—","Dome light.",
   "Warm top light; eye-dots readable.","PAB ON.","—","Silence.","Stillness held.")
sc("SC74","ECU",sec,"Tomorrow, your dashboard will be clear. Every door shut. Passenger airbag, on.",
   "Reinterpreting final image: the mirror of SC01.","ECU DASH, same framing as SC01.","—",
   "Dome light fades out; every door segment dark; the PAB lamp glows 'Passenger airbag ON' at the top edge.","DASH (20%) + PAB.",
   "Only the PAB's amber glow and the dim cluster remain.","PAB ON. [true: buckled in beside YOU]","PAB (28 px).","Dome fade, then silence to black.",
   "Same framing as SC01; the meaning has flipped.", hold=2.6)

# ---------------- build ----------------
t = 0.0; words_total = 0
for s in S:
    w = len(re.findall(r"[A-Za-z0-9']+", s["narr"]))
    words_total += w
    dur = s["pre"] + w / WPS + s["hold"] + (0.3 if w else 0)
    s["start"], s["end"], s["words"] = t, t + dur, w
    t += dur
total = t
fmt = lambda x: f"{int(x//60)}:{x%60:04.1f}"

# Gates
ids = [s["id"] for s in S]
assert ids == [f"SC{i:02d}" for i in range(1, len(S) + 1)], "scene IDs must run SC01..SCnn in order"
for a, b in zip(S, S[1:]):  # no unchanged repeated shots
    if a["framing"] == b["framing"]:
        raise SystemExit(f"Same framing on consecutive scenes: {a['id']} → {b['id']}")
dupes = {f for f in (s["framing"] for s in S) if sum(x["framing"] == f for x in S) > 1}
assert not dupes, f"framing reused unchanged: {dupes}"
for s in S:
    for ref in re.findall(r"SC\d{2}", " ".join(str(v) for v in s.values())):
        assert ref in ids, f"{s['id']} references missing {ref}"

ecu = sum(1 for s in S if s["tag"] == "ECU"); n = len(S)
cols = ["Scene ID & provisional time","Exact narration passage","New information / story purpose","Framing & camera behavior",
        "Character pose & movement","Prop / environment action","Primary light source","Falloff, shadows & occlusion",
        "Threat tracker state","On-screen text","Sound & synchronization","Continuity & acceptance check"]
esc = lambda x: (x or "—").replace("|","/").replace("\n"," ")
lines = ["| " + " | ".join(cols) + " |", "|" + "---|"*len(cols)]
cur = None
for s in S:
    if s["sec"] != cur:
        cur = s["sec"]; lines.append("| **" + cur + "** |" + " |"*(len(cols)-1))
    narr = s["narr"] or "(silent)"
    if s["voice"] == "HIJACK": narr = "HIJACK VOICE: " + narr
    lines.append("| " + " | ".join(esc(x) for x in [f"{s['id']} [{s['tag']}] {fmt(s['start'])}–{fmt(s['end'])}", narr, s["purpose"],
        s["framing"], s["pose"], s["prop"], s["light"], s["falloff"], s["tracker"], s["text"], s["sound"], s["check"]]) + " |")
os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, "scene_table.md"), "w").write(
    "# Rear Left — scene breakdown (12 columns)\n\n"
    "Times are **provisional** (~180 words/min plus authored holds), not verified playback. Re-time against the recorded narration's word timestamps.\n\n"
    "Tags: W wide · M medium · CU character close-up · ECU object/interface/diagram extreme close-up · CARD rule/title card.\n\n"
    "Abbreviations: DASH instrument cluster · RL rear-left door-ajar segment · RB rear-left seatbelt-unbuckled icon · "
    "PAB passenger-airbag status lamp · MEDIA centre screen · YOU protagonist (cobalt hoodie) · [true: …] where it really is (never drawn).\n\n"
    + "\n".join(lines) + "\n")

sl = ["# Rear Left — narration script\n",
      "Word for word. Plain lines are spoken by the narrator. Lines starting with ▸ are directions and are not spoken.\n"]
cur = None
for s in S:
    if s["sec"] != cur:
        cur = s["sec"]; sl.append(f"\n## {cur}\n")
    if not s["narr"]:
        sl.append(f"▸ *{s['id']} (silent): {s['purpose']}*\n"); continue
    if s["voice"] == "HIJACK":
        sl.append(f"▸ *{s['id']}: HIJACK. Same narrator voice, coming out of the car speakers.*")
    elif s["id"] == "SC44":
        sl.append(f"▸ *{s['id']}: hard static cut. Narrator back on the normal mic, dry and level.*")
    sl.append("\n".join(re.split(r"(?<=[.?!])\s+(?=[A-Z\"])", s["narr"])))
    sl.append("")
open(os.path.join(OUT, "script.md"), "w").write("\n".join(sl) + "\n")

spoken = " ".join(s["narr"] for s in S if s["narr"])
sents = [x for x in re.split(r"(?<=[.?!])\s+", spoken) if x.strip()]
lens = [len(re.findall(r"[A-Za-z0-9']+", x)) for x in sents]
CHAPTERS = {"SC01": "The light behind you", "SC10": "Pump six", "SC15": "Rule 2: Above twenty", "SC23": "Rule 3: The dome light",
            "SC30": "Rule 4: The red light", "SC38": "Rule 5: The mirror", "SC47": "Rule 6: Passenger airbag",
            "SC56": "Rule 7: The garage", "SC65": "What the dashboard never told you"}
by_id = {s["id"]: s for s in S}
slip = by_id["SC42"]
stats = dict(scenes=n, ecu=ecu, ecu_pct=round(100*ecu/n,1), words=words_total, sentences=len(sents),
             avg_sentence_words=round(sum(lens)/len(lens),1), max_sentence_words=max(lens),
             runtime=fmt(total), runtime_s=round(total,1),
             breach=f"{fmt(slip['start'])}–{fmt(by_id['SC44']['end'])} ({round(100*slip['start']/total)}% in)",
             chapters=[(fmt(by_id[k]["start"]), v) for k, v in CHAPTERS.items()])
open(os.path.join(OUT, "stats.json"), "w").write(json.dumps(stats, indent=1) + "\n")
print(json.dumps(stats, indent=1))
