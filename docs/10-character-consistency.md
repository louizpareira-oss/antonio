# 10. Keeping the character the same in every shot

Doc 07 makes the claim: *"Cheap edits change the person every cut; good ones follow one."*
Following one person is what separates a film from a slideshow. But 07 never says how to
do it, and the generator will not do it for you — every clip is generated independently,
with no memory of the last one.

This is the how.

---

## Seed-locking is not the answer

`prompts/01-forgive-the-past-anime.txt` currently says *"Lock the SEED if your tool has
one, so the man looks the same."* That advice is not wrong, it is just not enough:

- A seed reproduces a result **for the same prompt**. Change the prompt — which you must,
  every shot — and the seed no longer protects the face.
- Plenty of tools do not expose one.
- It does nothing at all across tools, sessions, or a re-generation next week.

The thing that actually holds a character together is **the words**. The seed is a bonus.

---

## The master character description

Write it once, at the top of the prompt pack. Every shot prompt starts with it.

```
MASTER CHARACTER
A [specific subject], with [distinctive markings],
[eye / face details], [body proportions], wearing [outfit / accessory].
Visual style: [style]. Lighting: [lighting]. Environment: [world / location].
Keep the character design, markings, proportions and accessories consistent
across every shot.
```

Six fields, and each one is load-bearing:

| Field | Why it holds the character | Weak vs strong |
|---|---|---|
| **Subject** | The base identity the model rebuilds each time | "a man" → "a young man in his mid-twenties, lean build" |
| **Distinctive markings** | The single detail a viewer tracks between cuts | "dark hair" → "straight black hair falling over the right eyebrow" |
| **Eyes / face** | Faces drift fastest; name them or lose them | "sad eyes" → "tired dark brown eyes, faint shadows beneath" |
| **Proportions** | Stops the character changing height and build between shots | "normal" → "lean, narrow shoulders, slightly hollow cheeks" |
| **Outfit / accessory** | The most reliable anchor of all — clothing survives angle changes | "a coat" → "a long charcoal overcoat, collar turned up" |
| **Style / lighting / world** | Keeps the *frame* consistent, not just the person | see the style block below |

**One distinctive marking beats five vague ones.** The example in the source material is a
pigeon with a dark neck marking and a red hoodie — a viewer locks onto the hoodie
instantly. Give your character one thing that unmistakable.

---

## Script 01's master block

Ready to paste at the top of the prompt pack:

```
MASTER CHARACTER
A young man in his mid-twenties, lean build with narrow shoulders and
slightly hollow cheeks, straight black hair falling over his right
eyebrow, tired dark brown eyes with faint shadows beneath them, wearing
a long charcoal overcoat with the collar turned up over a plain grey shirt.
Visual style: 90s cel-shaded anime, clean line art, hand-painted
watercolour backgrounds, muted nostalgic palette, subtle film grain.
Lighting: single-source — cold blue night, or flat grey morning.
Environment: an unnamed city at night, and an empty wood-panelled courtroom.
Keep the character design, hair, eyes, proportions and the overcoat
consistent across every shot.
```

**Short form**, for shots where he is not the subject (hands, objects, the doorway):

```
the same young man — black hair over the right eyebrow, charcoal overcoat,
collar turned up — same design as previous shots
```

---

## Then change only what needs to change

Everything in the master block is **locked**. Exactly five things are free to move:

| Locked — never rephrase | Free — change every shot |
|---|---|
| Species / age / build | Camera angle and shot size |
| Markings, hair, eyes | Location within the world |
| Outfit and accessories | Pose |
| Visual style | Expression |
| Lighting family | Action |

The most common way people lose a character is not changing too much — it is
**re-describing the locked half in different words each time**. "Dark coat" in one prompt
and "black jacket" in the next is two different characters as far as the model is
concerned. Paste the block. Do not paraphrase it.

---

## The shot prompt formula

```
[MASTER CHARACTER] + [ACTION] + [ENVIRONMENT] +
[CAMERA / COMPOSITION] + [EXPRESSION] + [LIGHTING] +
[STYLE / CONSISTENCY INSTRUCTION]
```

Worked example, in the source material's register:

> *A small gray pigeon with a distinctive dark neck marking and expressive eyes, wearing
> the same red hoodie as previous shots, standing outside a convenience store, looking
> shocked after seeing something off-screen. Medium shot, vertical composition, natural
> cinematic lighting, expressive pose, consistent character design and proportions.*

### This supersedes the doc 07 formula

Doc 07 gives `[subject] + [action] + [environment] + [light] + [mood] + [camera] + 9:16`.
That is still correct for a shot with **no recurring character** — an empty doorway, a
folder on a table, rain on a street. Use this one whenever a person is on screen. Three
differences:

1. **Subject becomes the master block**, verbatim.
2. **Expression is its own slot.** Left implicit, faces default to neutral, and doc 07's
   whole method depends on the face doing the emotional work.
3. **A consistency instruction closes every prompt.** `consistent character design and
   proportions` — cheap, and it measurably helps.

---

## Do not over-prompt

More words do not mean better images. Past a point they mean **worse** ones, because the
model spreads attention across terms that are not controlling anything.

Order by how much each part actually controls the shot:

> **character → action → setting → camera → expression**

Front-load that. Anything after it is decoration, and decoration is the first thing to cut
when a shot is coming out wrong.

**Do not stuff unrelated style terms into every prompt.** The failure looks like a prompt
where two thirds of the words are `cinematic, 8k, masterpiece, highly detailed, trending,
volumetric lighting, unreal engine` — none of which describe the shot you want. Debugging
a bad generation is impossible when you cannot tell which of forty terms caused it.

**The style block is written once, not per shot.** Put it in the master block and in a
header at the top of the pack. If your tool has no style field, append a short fixed tag —
not a fresh paragraph each time.

---

## Audit: what the current pack gets wrong

Measured against `prompts/01-forgive-the-past-anime.txt` as it stands:

| Finding | Count | Effect |
|---|---|---|
| Prompts containing a consistency instruction | **0 of 22** | Nothing tells the model the man is the same man |
| Distinct phrasings of the same character | **9** | "young man in his mid-twenties", "young man in a dark overcoat", "young man waking on a futon" … |
| Shots naming his age | **2** | He will read as a different age in the other shots |
| Shots naming his hair | **2** | Hair colour and cut will drift |
| Shots naming his eyes | **0** | Faces drift fastest and nothing is holding them |
| Full style block repeated per prompt | **20 times** | ~30 words per prompt describing style, not the shot |

Clips 3 and 20 are the matched pair the whole video's rewatch depends on — the doorway,
seen again at dawn. They are the shots most at risk from drift, and right now they are
protected by a seed and nothing else.

**The fix:** paste the master block at the top of the pack, replace all nine phrasings with
it, strip the repeated style paragraph down to a short tag, and close every prompt with
`consistent character design and proportions`.

---

## More than one character

Script 01 has one man on screen, so one block is enough. For a scene with dialogue
(`scripts/00-template.md`'s Character A / Character B register):

- **One master block per character**, labelled, both at the top of the pack.
- **One shared world block** — style, lighting, location — that both inherit.
- In a two-shot, paste **both** blocks in full. This is the one place a long prompt is
  justified; halving one character's description is how you get one good character and one
  stranger.
- Keep the two visually separable at a glance: different silhouette, different colour.
  Viewers track shape and colour between cuts, not faces.

---

## Checklist before generating a character shot

- [ ] The master block exists and is written once.
- [ ] I pasted it, rather than paraphrasing it.
- [ ] Only camera, location, pose, expression and action changed.
- [ ] Expression is stated explicitly.
- [ ] The prompt ends with a consistency instruction.
- [ ] Character → action → setting → camera → expression, in that order.
- [ ] No style terms that do not describe this shot.
- [ ] Seed locked as well, where the tool allows it.
