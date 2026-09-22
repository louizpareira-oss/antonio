# 10. Plugging the prompt pack into OpenArt

[`prompts/01-forgive-the-past-anime.txt`](../prompts/01-forgive-the-past-anime.txt) is written
tool-agnostic on purpose. This page is the OpenArt-specific version: which of its features
map onto which instruction in the pack, what order to click things in, and what it costs.

Nothing here changes the prompts. It changes how you run them.

---

## Why OpenArt fits this particular job

Three of the pack's hard requirements are things most generators make you fight for, and
OpenArt exposes all three directly:

| The pack demands | OpenArt's answer |
|---|---|
| "The man looks the same in every clip" | **Consistent characters** — build a character once from a single reference image, then reuse it in every image *and* video generation |
| "9:16 vertical, 1080×1920, never cropped" | Native vertical generation on its video models — LTX-2.3 and the PixVerse/Seedance line generate 9:16 natively rather than cropping down from a wide frame |
| "Lock the seed" | A fixed-seed field for repeatable results |

The fourth thing — matching a night shot to a dawn shot for clips 3 and 20 — is the part no
tool does for you. Section 6 below is how you force it.

---

## Budget first, because this is the part that bites

Video generation is roughly **two orders of magnitude** more expensive than image
generation in credits. Treat that as the design constraint, not an afterthought.

The pack asks for 22 clips × 3 takes = **66 generations**. At video rates that is far
beyond the free allowance (40 credits on signup, plus a small Discord trial top-up) and
will eat a chunk of a paid month.

**So do not generate 66 videos. Do this instead:**

1. **Generate stills.** Run all 22 prompts as *images*, 3–4 takes each. Images cost about
   1 credit where a video costs dozens, so this whole pass is cheap.
2. **Pick your 22 winners.** Judge them on composition and on whether the character reads
   as the same person. Throw away the rest. This is where you should be spending time.
3. **Animate only the winners**, image-to-video, one pass each. 22 video generations, not 66.
4. **Re-roll individually.** If three clips come out wrong, re-animate those three. Do not
   re-run the batch.

This also happens to produce a better video. Doc [`09`](09-anime-visuals-legitimately.md)
makes the point already: a slow push-in on a still anime frame looks *exactly* like the
reference video, because half the reference video is basically that. An image-to-video pass
on a still you already approved gives you more control than text-to-video ever will.

> Prices and credit costs move. Check the current pricing page before you subscribe — the
> ratio between image and video cost is the durable fact, the exact numbers are not.

---

## Step 1 — Build the character before you generate anything

This is the single highest-leverage thing OpenArt gives you, and it replaces technique 1
and technique 2 from doc [`09`](09-anime-visuals-legitimately.md) with something stronger.

1. Generate one image of the man alone, using the character string from the pack verbatim:

   > *a young man in his mid-twenties, dark overcoat, black hair, thin build*

   plus the style block. Medium shot, neutral pose, plain background. Re-roll until he is
   exactly right — this one image sets the face for the whole video.
2. Save it as a **character** in OpenArt. One reference image is enough.
3. Attach that character to **every** prompt in the pack that includes a person.

Clips with no person in them — 1, 4, 5A, 5C, 8, 10, 11, 13, 16, 17, 18, 20 — do **not** need
the character attached. Attaching it anyway risks inserting a figure into shots that are
deliberately empty. Clip 20's whole meaning is that the doorway is empty; do not let a
character reference put him back in it.

Clip 14 is a *different* person sleeping peacefully. Do not attach your character to it.

---

## Step 2 — Lock the frame before the first generation

Set aspect ratio to **9:16** and pick a model that generates vertical natively. Verify the
output dimensions on the first clip you make, before generating the other 21.

If a model hands you a horizontal frame, change models. Do not crop, do not mask, do not
letterbox. That is the exact failure that got the account marked low-quality in the first
place — see [`03-technical-spec.md`](03-technical-spec.md).

---

## Step 3 — Paste the prompt

Each numbered block in the pack is already a complete prompt. Paste the whole scene
description; the quoted line above it is the voiceover, not part of the prompt — do not
paste it, or the model may try to render text on screen.

**Negative prompts.** The pack ships one negative block for every clip. OpenArt runs many
models, and not all of them take a negative prompt — the older SDXL-family models do, the
newer Flux-style ones generally do not.

- **If there is a negative field:** paste the pack's block into it, unchanged.
- **If there is no negative field:** fold the important exclusions into the positive prompt
  as things that *are* true, because negation-by-description is what these models respond
  to. Append:

  > *clean frame with no text and no watermark, full-bleed vertical composition edge to
  > edge, single continuous shot, hand-drawn 2D animation*

  That covers the four exclusions that actually matter for monetization — text, watermark,
  letterboxing, and 3D/photoreal drift. The anatomy exclusions matter far less once you are
  shooting backs, hands and silhouettes, which most of the pack already does.

---

## Step 4 — Seed discipline

Set a fixed seed and **write it down**. You want the same seed across every clip featuring
the man, because seed + identical character string + character reference is three
consistency mechanisms stacked on each other.

Keep a running note as you go:

```
character seed: 000000        <- fill in yours
clip 01  seed ...... take 2   OK
clip 02  seed ...... take 1   OK
clip 03  seed ...... take 3   OK  <- pair seed, reuse for 20
...
```

You will need this in a week when one clip needs regenerating and everything else is done.

---

## Step 5 — Animate the stills

For each approved still, run an image-to-video pass and put **only the camera move** in the
motion prompt. The pack already names the move for every clip: *static camera*, *slow dolly
in*, *slow dolly out*, *low angle static shot*.

Keep the motion minimal and keep the clip short — 5 seconds, 3–4 for 5A/5B/5C. Anime style
transfer wobbles when things move a lot; a still frame with a slow push reads as
intentional, a thrashing one reads as AI slop. Doc [`09`](09-anime-visuals-legitimately.md)
makes the same point about style-transfer wobble: hide the instability, don't fight it.

---

## Step 6 — Clips 3 and 20, the matched pair

The pack marks these `*** PAIR WITH ***` and calls clip 20 the most important shot in the
video. Same room, same doorway, same framing — night and empty-at-dawn. If they don't
match, the payoff doesn't land.

Do it in this order:

1. Generate clip 3 as a still. Re-roll until the doorway framing is right.
2. **Do not start a new session.** With clip 3 still on screen, use it as the reference
   image for clip 20 and change only the light: *pale gold dawn light*, *warm nostalgic
   palette*, *no person in frame*.
3. Same seed as clip 3.
4. Put the two stills side by side before you animate either. If the doorway has moved,
   redo clip 20, not clip 3.
5. Both get a **static camera**. A camera move on either one destroys the match.

---

## A note on Director mode

OpenArt's Director will take a premise and write, shot-list and generate a whole sequence
for you, up to five minutes, keeping characters consistent across it.

**For this video, don't.** You already have a shot list, and it was built beat by beat
against the voiceover using the method in
[`07-matching-visuals-to-dialogue.md`](07-matching-visuals-to-dialogue.md). Handing the
premise to Director throws that away and gives you back its choices — which will be the
literal ones, the exact failure mode doc 07 exists to prevent.

Where Director *is* worth a look is script 02 onward, as a drafting tool: let it propose a
shot breakdown, then throw out the literal shots and keep the two or three that surprise
you. Never ship its cut untouched.

---

## Step 7 — Out of OpenArt, into the edit

Download the clips and go straight to the `AFTER YOU GENERATE` block at the bottom of the
prompt pack. Nothing changes there. But check two things on the way out:

- **Dimensions.** Open one clip and confirm 1080×1920 with no black bars baked in. Catch it
  here, not after you have cut 70 seconds of video.
- **Watermark.** Free tiers on most platforms watermark output. A watermark is a visible
  third-party mark on a monetized video — check your plan before you build the edit around
  clips you cannot use.

And the thing that is easy to forget because it happens outside the tool entirely:

> **Turn on TikTok's AI-generated content label when you upload.**

Every frame of this video is synthetic. Labelling it is required, and an unlabelled
AI video that gets caught is a far worse outcome for an account already carrying a
low-quality-content rejection than a labelled one ever is.
