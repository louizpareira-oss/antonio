# 12. Review: your EMOTIONAL TRUTH section (→ master prompt v5.3)

Your goal, in your words: *"motion that feels real — not generic animation, but movement that
captures the actual visceral experience of sacrifice, discipline and struggle. The viewer should
feel like 'this is my life right now.'"*

**How it was checked.**
- **4 measurers:** one agent per reference video classified every shot from the frames. Is a
  body state shown? Which bodily cue? Is there effortful motion? Is there triumph imagery? Is it
  dark?
- **4 reviewers,** each with one lens: conflicts with v5.2, whether AI generators can render it,
  how the current script fares under it, and whether it will feel like "this is my life".
- **2 skeptics** tried to refute every high and medium finding. A finding refuted by both was
  dropped.
- **3 script drafts,** each built on a different physical metaphor. The judging agent failed, so
  I re-counted all three drafts with Python and chose the winner by hand.

---

## 1. What the references actually do

| | A (cartoon) | B (cartoon) | C (HUD) | D (HUD) |
|---|---|---|---|---|
| Shots showing a **body state** | 8/19 (42%) | 6/19 (32%) | 3/29 (10%) | 0/33 (0%) |
| … share of runtime | 25% | 28% | 8% | 0% |
| Shots with **effortful motion** | 3/19 (16%) | 3/19 (16%) | 0 | 0 |
| Cues used | face 3, ache 2, mouth 2, posture 1 | face 3, posture 2, mouth 1 | posture 2, weight 2 | none |
| **Sweat / tremor / breath / grip** | **0** | **0** | **0** | **0** |
| Triumph / stock imagery | 1 (an ironic pub toast) | 1 (a jogger on the globe) | 1 (a crown) | 3 (glow reveals) |
| Dark or night shots | 68% | 53% | 100% | 97% |

- **Body states cluster in the opening.** In A, 4 of the first 5 shots show one. In C, all three
  are in the first 9.3 s. B's are at the open and in its consequence block.
- **The middle of every reference is metaphor**: space, money towers, waveforms, chips.
- **The most "this is my life" shots** are mostly static states, not effort:
  - a boy flopped upside down off the bed, eye-bags, eyes snapping open on "BILLS" (A 3.3 s)
  - a duck working on a laptop with an ice pack on its head (A 6.8 s)
  - a man folded face-down on the gym floor, sipping through a straw (B 0 s)
  - a head hanging, chin to chest, on "can barely lift your head" (C 7.8 s)

**What that means:** your rules are not a copy of what the references do. They are a new
direction. The quiet, unglamorous tone is already there in the references (almost no triumph,
mostly dark). The bodily detail, effort motion and sensory cues are new. That can set the
channel apart, but it is untested, so try it on one video before you lock it in.

---

## 2. Verdict, rule by rule

| Your rule | Verdict | What changed and why |
|---|---|---|
| Header: "most important… applies to everything" | **Keep, edited** | It sat outside every paste block, so no prompt run would ever see it. It is now its own block, pasted under the preset. **Priority:** Emotional Truth decides *what* a shot shows; the preset numbers decide how fast, long and bright. Without that, a model trades pace for "feeling", which was the v4.1 failure. |
| 1 Bodily truth, every shot | **Keep, scoped** | "Every shot" clashes with the metaphor shots, the object and icon cast, and NEON HUD. It is now **MIRROR SHOTS** (hook, symptom, belief, payoff, landing: 8–14 per video). At least every third MECHANISM shot puts the cost on a body. |
| 2 THE FEELING | **Keep, moved** | Generators never see this field, and "if you cannot write it" never triggers, because a model can always write a sentence. It is now written **first**, its cue must appear in IMAGE and MOTION, and the test is "if it could caption 3 other shots, rewrite". |
| 3 Sensory anchor list | **Keep, translated** | Dry lips, a copper taste, a trembling voice and unfocused eyes can't be read in a 1.5 s flat-vector shot on a phone. Each cue is now a **cartoon tell** (flying sweat drops, shake lines, a question-mark spine, panting puffs), sized for the frame. Avoidance cues were added (hesitation, inertia, screen glow), because procrastination is about not starting, not exertion. |
| "weight … slow movements" | **Changed** | It asked for slowness, while the negative prompt bans slow motion: opposite orders to the generator. **Weight is timing contrast: slow to start, fast to drop.** |
| 4 Word-motion lock | **Keep, moved to the editor** | A generator never hears your voiceover and can't time an action to a word. A quoted word in the prompt may even get drawn as text. The lock is done by slipping the clip: the PEAK frame lands 0–3 frames before the word (D2.6). |
| 5 Quiet bias | **Keep, with drawing rules** | "Dark" now means saturated indigo with one hot light, never grey; reference A's bedroom proves it fits the look. The hour is shown with light, not numbers. Duration is shown with leftovers. The landing is "ordinary vast" (first light, a lit window), never a sunset. |
| 6 Anti-heroic | **Keep** | Applied to the YOU character, with a fixed look and one reusable character sheet. "Tired, not broken; stuck, not hopeless." |
| 7 Physical metaphor that hurts | **Keep** | Two skeptics refuted a proposal to drop "must hurt", because that would reverse your intent. It now lives in Prompt 1 item 5. **The merchant script fails it**, so the script was rewritten (section 3). |
| P1 Wrong belief ("'you're just lazy' is lazy") | **Changed** | "I'm so lazy" is the most common thing a procrastinator says to themselves. A straw man is a belief nobody holds. The rule is now: the viewer's own words plus their evidence. |
| P1 Identity flip as information | **Keep** | |
| P1 Low point in the arc | **Keep, placed** | It sits on the WRONG BELIEF beat: 4 s or less, before 20 s, self-blame and not despair, darkest but still saturated. |
| P2 Boring detail | **Keep** | Numbers live in the voice and the caption, never in the picture (the negative prompt bans them). |
| P2 Honest, not hype | **Keep, clarified** | The honesty is in the words, not the tempo. Delivery stays 190–210 wpm, because speed was the #1 measured gap. |
| New J format | **Keep, repaired** | Restored the dropped "set:" field and HUD elements, added the missing ÷7, and moved the lock out of MOTION. Added BODY TELL, LOCK, USE peak, POST HIT and a TRUTH CHECK line. |

**Added, because the review found them missing**:
- **8 Hesitation is a loop, never a freeze.** Reach, stop short, pull back, 2–3 times. The most
  recognisable procrastination motion would otherwise render as a frozen frame.
- **9 True and funny beats true and grim.** At least 2 comic mirror shots. The cartoon references
  make struggle relatable through exaggeration, and a laugh is what gets shared.
- **10 Release shot.** Recognition with no release is the misery trap.
- **11 Shown, never prescribed.** A short do-not-draw list, as a precaution.

**Dropped after verification** (refuted by both skeptics):
- "Tired voice" was read as a delivery instruction, but it means fed up.
- The anti-copy rule was said to cancel all your lists. It doesn't: they are categories, and that
  is now stated.
- "5 AM darkness" was said to break the saturated look. Reference A disproves it.
- "Glamorises overtraining" contradicts your own anti-glamour rules.
- "Self-harm classifier risk" was unverified.

---

## 3. What makes the motion feel physically real (D2 STRUGGLE MOTION)

This is the direct answer to your goal. It is now section D2 of Prompt 3.

1. **Five beats.** BRACE → STRAIN (a moving hold, never frozen) → GIVE (the load wins for a
   moment) → RESOLVE (push through or stall) → SETTLE (heave, breath puff). Short shots use
   STRAIN + GIVE.
2. **Weight = timing contrast, not slowness.** Write "barely rises, then drops suddenly".
3. **Start mid-effort.** The IMAGE already shows the brace or strain pose, with the tells drawn
   on, so the shot reads even if the clip barely moves.
4. **Weight shows in the world.** The cushion squashes, the shelf bows, dust bursts out.
5. **Never-write words** that pull generators toward floaty motion: *slowly, gently, smoothly,
   floating, cinematic, epic, subtle*.
6. **Lock in the editor, then hit.** Slip the clip so the peak lands on the word. On impact
   locks, add a 104% punch-in, a 5-frame shake and a low thud (at most 1 shot in 3).

Labelled honestly:
- **Established practice:** the beats (Disney's principles), the cartoon sweat drops and shake
  lines (comic lettering conventions), and the editing (slip, cut on action, post shake).
- **My expectation of how models behave, which you should test:** the never-write list, and the
  claim that small details melt while big shapes hold.

**Test before adopting it:** 3 MOTION wordings × 2 takes on one effort shot. The scoring is in
D2.

---

## 4. The script: from merchant to porter

The merchant metaphor fails rule 7: weighing and bookkeeping don't hurt. Three drafts were
written to every rule, then re-counted:

| Draft | Metaphor | Words | Length | Mechanism | Verdict |
|---|---|---|---|---|---|
| **1** | **Porter carrying boxes up stairs** | 203 | 65.3 s | 49% | **Winner.** The hook is physical ("hold your phone up for hours / can't lift one five-minute task") and the payoff calls back to it. The low point sits on the belief line. Boxes, stairs and a feather are easy to draw. |
| 2 | Digging for a buried prize | 200 | 64.4 s | 49% | Has the single best image ("standing at the edge, gripping the shovel, not digging"). But a person beside a deep hole, plus "bury", reads close to a grave. |
| 3 | Swimming against a current | 200 | 64.4 s | 49% | The low point lands late (47 s), and it leans on water and drowning imagery. |

The porter script, a fact check, a 30-noun list with a FEELING line per noun, and a computed
33-shot DENSE CUT plan (every shot 1.26–2.84 s, final shot 3.34 s, 14 mirror shots, 8 effort
shots) are in [`prompts/02-your-brain-isnt-the-enemy-v5-handoff.md`](../prompts/02-your-brain-isnt-the-enemy-v5-handoff.md).
The merchant version stays in git history.

→ Back to [README](../README.md)
