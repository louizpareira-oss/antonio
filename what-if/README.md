# What If: faceless YouTube channel

A cute-cartoon "what if this happened to you" channel aimed at young viewers, especially gamers.
It's the same genre as the hypothetical-animation channels doing well right now. The topics,
scripts, character and jokes here are all original, and that's what keeps the channel monetizable
(see the last section).

## Files

| File | What it is |
|---|---|
| [`01-topics.md`](01-topics.md) | 10 topics, each with its rule, 3 titles and why it should get clicks. Includes the order to make them in. |
| [`scripts/01-inventory-in-real-life.md`](scripts/01-inventory-in-real-life.md) | Full ~10-minute script with a visual note on every line. |
| [`prompts/01-inventory-in-real-life-visuals.txt`](prompts/01-inventory-in-real-life-visuals.txt) | 45 copy-paste image prompts, one per scene, plus what to overlay in the edit. |

## How the scripts are written

1. **Second person, from the first word.** Start with "You wake up and…", never "Imagine if…".
   The viewer is the main character.
2. **Rules and a striking image within 15 seconds.** By 0:15 the viewer knows the rule and has
   seen it work once. Explain the details after that, not before.
3. **The fun first, then the cost.** Roughly 2–5 minutes of payoffs, then 3 minutes of
   consequences that build on each other. Each cost should grow out of a payoff the viewer
   already enjoyed. The time-stop pizza turns into the 2 a.m. inventory spreadsheet.
4. **Light, quick and a little dark. Never preachy.** Dark humor works through understatement
   ("The cat will remember this"). No moral at the end. The ending is a choice or a twist.
5. **The rules never change.** Write them out at the top of every script and stick to them.
   Gamer audiences will find any loophole and point it out in the comments.
6. **End on a question the viewer can answer in one line** ("What's in your slot 1?"). Easy
   comments mean more comments.

| Section | Time | Job |
|---|---|---|
| Golden hook | 0:00–0:30 | Drop the viewer into the scene, state the rule, show it once |
| The rules | 0:30–2:00 | How it works in detail, with one joke per rule |
| The fun part | 2:00–5:00 | Payoffs, each bigger than the last |
| The cost | 5:00–8:00 | Consequences that build on each other |
| The choice | 8:00–10:00 | A decision or a cliffhanger, then the comment prompt |

At 1,300–1,600 words, the voiceover runs about 9:30–10:00 at a normal-to-slightly-fast pace.

## The character and look

**Blob** is a small round white blob with big glossy eyes, an oversized **mustard-yellow hoodie**
and a **tiny green leaf sprout** on top of its head. Everyone else in the world is a white blob too,
told apart by clothes and props.

The hoodie color and the sprout are what make Blob *your* character rather than a lookalike of
another channel's. Keep them in every video, every thumbnail and your profile picture.

The base style is in every prompt: *clean minimalist animation style, bright vibrant colors,
soft lighting, high quality, 16:9.* Build UI elements like hotbars, health bars and counters as
reusable graphics in the editor. Don't generate them.

## Voiceover (ElevenLabs)

You want a young, clear male voice that sounds slightly curious, not deep and not hyped.
Three voices in your ElevenLabs workspace match that description. I picked them from their
listings and haven't listened to them, so play the previews before you choose:

| Voice | Listing description | Voice ID |
|---|---|---|
| Diego – Friendly, Conversational | Young American, warm, conversational | `v2B6bRGVWhlh1ZpeWMGw` |
| Chris | Young American, "calm, irreverent", which suits the dark humor | `bTw8AqIDQenIK3kFqvhT` |
| Gordon – Sincere, Warm & Clear | Young American, made for kids' content | `H1bMkFdFKqJn79KaV9qt` |

**Settings**
- Stability: about **70%**. That keeps a 10-minute read consistent without going flat.
- Similarity: about 75%. Style exaggeration: 0–10%. Higher style makes long reads drift.
- Speed: normal to slightly fast (about 1.05x).
- **Generate one script section at a time, not all 10 minutes at once.** It's easier to redo
  one line, and the energy stays even across the video.
- Once you've picked a voice and these settings, keep them for every video. The narrator's voice
  is part of the brand, just like Blob.

## Making one video

1. Pick the next topic from `01-topics.md` and write the script, keeping the rules list at the top.
2. Record or generate the voiceover section by section.
3. Generate the scene images. Do Blob's close-up first and use it as the character reference
   for every other scene.
4. Run the images through image-to-video for 3–5 second clips, aiming for a new shot every 4–6
   seconds.
5. Edit: voiceover, then clips, then UI overlays, sound effects, and music kept quiet under
   the voice.
6. Thumbnail: Blob's face showing a big emotion, the one rule-graphic (hotbar, health bar,
   counter), and three words at most.

## Staying monetizable on YouTube

The TikTok account was rejected for "low quality content": downloaded clips, an AI voice and a
borrowed quote ([`../docs/01-why-the-appeal-failed.md`](../docs/01-why-the-appeal-failed.md)).
YouTube has the same rule under a different name. Its Partner Program turns down "inauthentic
content" (it used to be called "repetitious content"): videos that look mass-produced from a
template with little original work in them. An AI voice by itself isn't banned. What gets
channels rejected is when *everything* about the videos is generic.

What keeps this channel on the right side of that rule:
- **Original scripts.** Every script is written for this channel, with no reworded scripts
  from other channels.
- **An original recurring character** (Blob, with the hoodie and sprout) and a consistent world.
- **Real editing:** custom UI overlays, timed sound effects, and a new shot every few seconds.
  Not a slideshow of still images under a voiceover.
- **Don't reuse the source channel's titles or topics.** `01-topics.md` lists the ones to avoid.
- **Quality over volume.** One good video a week beats a daily template. Mass uploading is
  exactly what that policy targets.
