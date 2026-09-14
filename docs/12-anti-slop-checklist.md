# 12. The anti-slop checklist

Revisit this before every upload.

It is the **editorial** gate. [`03-technical-spec.md`](03-technical-spec.md) is the
**technical** one — resolution, bars, watermarks, the AI-generated label, the caption safe
zone. A video has to pass both, and they fail differently: the technical list is what gets
a video flagged, this list is what gets it scrolled.

That distinction matters for this account specifically. The rejection said *"account with
low quality content."* Doc 03 fixes the measurable half. This is the half a reviewer and a
viewer both judge by eye.

---

## The checklist

- [ ] **Does the first second immediately communicate something interesting?**
      Not the first five. The first one.
- [ ] **Does the character look like the same character from shot to shot?**
      → [`10-character-consistency.md`](10-character-consistency.md)
- [ ] **Does every shot have a clear purpose?**
      Every shot traces back to a beat, and every beat has a job.
      → [`08-start-with-the-story.md`](08-start-with-the-story.md)
- [ ] **Does the animation contain unnecessary weird movement?**
      Drifting hands, a face that reorganises, a background that breathes.
      → [`11-animating-shots.md`](11-animating-shots.md)
- [ ] **Does the voice match the character and the register of the script?**
      A confessional script read like an advert is the most common mismatch.
- [ ] **Does the visible movement line up with the spoken audio?**
      For a monologue this is the cut, not lip-sync: change the picture *in the silence
      between sentences*, never mid-word.
- [ ] **Are there dead seconds that can be removed?**
      Trim from the front of every clip first. That is where the dead frames live.
- [ ] **Are captions covering important visuals?**
      → doc 03's safe zone: 12% top, 20% bottom, 20% right.
- [ ] **Is music or SFX louder than the voice?**
      The voice is the video. Music sits under it, always.
- [ ] **Does the ending actually deliver the payoff the opening promised?**
      If the hook set up a question, the last beat answers it — or deliberately reframes it.
- [ ] **Would I keep watching if I did not know who made this?**

The last question is the only one that matters, and it is the hardest to answer honestly.
Leave a day between finishing and uploading if you can. You cannot see your own video on
the day you made it.

---

## If a character speaks on screen

Script 01 is a voiceover monologue, so lip-sync is not a risk. If you make a scene where a
character speaks on camera, two extra rows apply:

- [ ] The clip has usable head and mouth movement at the moment of the line.
- [ ] When the speaking movement is weak, the shot cuts to a **reaction** instead — of the
      listener, or of what is being described. Reaction shots are how every real film hides
      exactly this problem.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| The character looks different in every shot | Re-describing instead of reusing | Paste the master block verbatim. Generate variations *around* one identity, never reinvent it → doc 10 |
| The tool keeps redesigning the character | Animation instruction too complex | Simplify it. State: preserve the existing character and environment, then request **one** action → doc 11 |
| The animation looks chaotic | Too many simultaneous actions | One character action + one camera move. Nothing else |
| The voice sounds disconnected | Delivery does not match the emotion, or the audio starts on nothing | Match delivery to the beat's emotion; start the audio at a visually believable moment |
| The character does not look like it is talking | Weak mouth/head movement in the clip | Use a clip with real head movement, time audio to it, or cut to a reaction |
| The video feels slow | Pauses and repeated information | Cut the pauses. Start closer to the conflict. Shorter visual beats |
| It looks like random AI clips | Continuity failure | Same character, same world, logical camera progression, dialogue tied to action, clear beginning/middle/end |
| **Technically good but boring** | Story problem wearing a production costume | **Fix the story, not the effects.** A better hook and a real escalation beat any transition |

---

## The last row is the important one

The instinct when a video underperforms is to add: another transition, a filter, a sound
effect, a faster cut. That instinct is what produced the video that got this account
rejected in the first place — a VHS filter over a 576p GIF.

When a video is technically fine and still boring, the problem is upstream, in
[`08-start-with-the-story.md`](08-start-with-the-story.md). Go back to the claim and the
spine. **No effect has ever rescued a sequence that had nothing to say.**
