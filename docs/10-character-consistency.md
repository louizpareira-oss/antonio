# 10. Keeping the character the same in every shot

Doc 07 makes the claim: *"Cheap edits change the person every cut; good ones follow one."*
Following one person is what separates a film from a slideshow. But 07 never says how to
do it, and the generator will not do it for you — every clip is generated independently,
with no memory of the last one.

This is the how.

---

## Seed-locking is not the answer

The usual advice is *"lock the seed so the character looks the same."* That is not wrong,
it is just nowhere near enough:

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

## A worked master block

From [`scripts/02-the-feeding.md`](../scripts/02-the-feeding.md) — a character who is a
human body with a pigeon's head, which makes every field above do visible work:

```
MASTER CHARACTER — MARCUS
A man in his late twenties with the head of a common city pigeon:
smooth grey feathers, an iridescent green-violet sheen across the
throat, a narrow coral-red ring around each dark orange eye, short
pale beak. Human body, average height, slightly narrow shoulders,
human hands. Wearing a good navy wool overcoat over a white shirt,
with an office lanyard at the chest.
Visual style: 90s cel-shaded anime, clean line art, hand-painted
watercolour backgrounds, muted nostalgic palette, subtle film grain.
Lighting: overcast grey daylight, sodium streetlight at night, or
cold blue dawn.
Environment: an unnamed grey city — a park bench, an open-plan
office, a corner shop.
Keep the head, eye-ring, throat sheen, proportions, overcoat and
lanyard consistent across every shot.
```

**Short form**, for shots where he is not the subject (hands, objects, an empty bench):

```
the same man with a pigeon's head — coral-red eye-ring, navy overcoat,
lanyard — same design as previous shots
```

The coral-red eye-ring is the distinctive marking; the navy overcoat and lanyard are the
anchors that survive any angle. `human hands` is in there for a reason — a character who is
part bird will grow talons the moment you stop saying otherwise.

### Negatives are part of the character

A composite character needs negative terms as specific as its positive ones. Script 02
carries `multiple heads, bird body, full bird` on every clip, because generators drift
toward a whole pigeon, or a bird perched on a human neck. Work out your character's
failure mode early and name it every time.

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

## Audit your own prompt pack

Before generating, run these counts over the pack you are about to spend money on. They
take a minute and they predict exactly how the character will fall apart:

| Check | Target | What failing it costs |
|---|---|---|
| Prompts containing a consistency instruction | **all of them** | Nothing tells the model this is the same character |
| Distinct phrasings of the character | **1** | Every extra phrasing is another person as far as the model is concerned |
| Prompts naming the eyes | **all with a face** | Faces drift fastest; nothing else holds them |
| Prompts naming the distinctive marking | **all** | The one thing a viewer tracks between cuts |
| Style block repeated per prompt | **0** | Words spent on style are words not spent on the shot |

```sh
grep -c "consistent character design" prompts/your-pack.txt
```

The shots most at risk are always the **matched pair** — the frame you show early and
bring back changed. They carry the rewatch, and a seed alone will not protect them.

---

## More than one character

Script 02 has one recurring character, so one block is enough. For a scene with dialogue
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
