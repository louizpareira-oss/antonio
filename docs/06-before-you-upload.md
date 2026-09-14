# 6. Before you upload

Two gates. A video has to pass both, and they fail differently: the technical list is what
gets a video **flagged**, the editorial list is what gets it **scrolled**.

---

## Gate 1 — Technical

| Setting | Value | Why |
|---|---|---|
| Resolution | **1080×1920** | Anything below reads as low quality |
| Aspect ratio | **9:16, full bleed** | No black bars, no framed box, no letterbox |
| Frame rate | 30 or 60 fps | 60 if the source supports it |
| Bitrate | Highest available | "Recommended" or higher |
| Length | **65–90 seconds** | Never export at 55–62s — leave margin |
| Codec | H.264 | Default |
| Editor watermark | **Off** | Turn off the end-card and watermark in your editor's settings |

### Auto-fail

Any one of these can sink a video, and repeats sink an account:

- [ ] Black bars or empty space anywhere in the frame
- [ ] Another platform's watermark visible
- [ ] A logo or username from someone else's clip in a corner
- [ ] Screen recording of anything
- [ ] Slideshow of stills with no motion
- [ ] Split screen with someone else's video
- [ ] Identical opening frame on every post — the template look
- [ ] AI visuals without the AI-generated label enabled

### Caption safe zone

The app's UI covers real estate. Keep all text inside:

- **Top:** 12% clear
- **Bottom:** 20% clear
- **Right:** 20% clear

Text outside that gets covered, which reads as careless.

### Upload

- Upload the highest-quality version, and turn on high-quality upload in app settings.
- Write a real caption — one line that adds to the video, not a hashtag stack.
- 3–5 relevant hashtags. Not 30.

---

## Gate 2 — Editorial

## The checklist

- [ ] **Does the first second immediately communicate something interesting?**
      Not the first five. The first one.
- [ ] **Does the character look like the same character from shot to shot?**
      → [`03-character-consistency.md`](03-character-consistency.md)
- [ ] **Does every shot have a clear purpose?**
      Every shot traces back to a beat, and every beat has a job.
      → [`01-start-with-the-story.md`](01-start-with-the-story.md)
- [ ] **Does the animation contain unnecessary weird movement?**
      Drifting hands, a face that reorganises, a background that breathes.
      → [`04-animating-shots.md`](04-animating-shots.md)
- [ ] **Does the voice match the character and the register of the script?**
      A confessional script read like an advert is the most common mismatch.
- [ ] **Does the visible movement line up with the spoken audio?**
      For a monologue this is the cut, not lip-sync: change the picture *in the silence
      between sentences*, never mid-word.
- [ ] **Are there dead seconds that can be removed?**
      Trim from the front of every clip first. That is where the dead frames live.
- [ ] **Are captions covering important visuals?**
      → the safe zone above: 12% top, 20% bottom, 20% right.
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

Script 01 is voiceover-led, and its character has a beak — lip-sync is not merely a risk
there, it is impossible, which is why the script routes its one spoken line to a human.
If you make a scene where a
character speaks on camera, two extra rows apply:

- [ ] The clip has usable head and mouth movement at the moment of the line.
- [ ] When the speaking movement is weak, the shot cuts to a **reaction** instead — of the
      listener, or of what is being described. Reaction shots are how every real film hides
      exactly this problem.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| The character looks different in every shot | Re-describing instead of reusing | Paste the master block verbatim. Generate variations *around* one identity, never reinvent it → doc 03 |
| The tool keeps redesigning the character | Animation instruction too complex | Simplify it. State: preserve the existing character and environment, then request **one** action → doc 04 |
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
[`01-start-with-the-story.md`](01-start-with-the-story.md). Go back to the claim and the
spine. **No effect has ever rescued a sequence that had nothing to say.**
