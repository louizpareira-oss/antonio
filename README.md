# Pigeon

A complete system for making original short-form video with AI-generated visuals: story
first, then shots, then a character that survives every cut, then motion, then the two
gates a video has to clear before it goes out.

**The rule the whole thing is built on:** the story is the engine. A good-looking clip
cannot rescue a weak sequence. Nothing gets generated until every shot has a job.

## Read in order

1. [`docs/01-start-with-the-story.md`](docs/01-start-with-the-story.md) — the claim, the
   five-beat spine, and giving every beat a job. Everything else depends on this.
2. [`docs/02-matching-visuals-to-dialogue.md`](docs/02-matching-visuals-to-dialogue.md) —
   deciding which picture goes on which line, and the 8-folder clip library.
3. [`docs/03-character-consistency.md`](docs/03-character-consistency.md) — the master
   character block, and why seed-locking alone will not keep a face the same.
4. [`docs/04-animating-shots.md`](docs/04-animating-shots.md) — one action, one camera
   move, and forbidding drift.
5. [`docs/05-file-organization-and-batching.md`](docs/05-file-organization-and-batching.md)
   — folder structure, file naming, and the four production batches.
6. [`docs/06-before-you-upload.md`](docs/06-before-you-upload.md) — the technical gate and
   the editorial gate, plus a troubleshooting table.

## Working files

- [`ideas/00-idea-bank.md`](ideas/00-idea-bank.md) — **Batch 1 lives here.** Shaped
  concepts, raw hooks, and the shared world the characters come from.
- [`scripts/00-template.md`](scripts/00-template.md) — **blank fill-in template.** Claim,
  spine, job sheet, shot list, prompts, and the checklist that gates generating.
- [`scripts/01-the-feeding.md`](scripts/01-the-feeding.md) — 75s, 22 beats. A worked
  script: pigeon-headed character, master block, full shot list and prompts.
- [`scripts/02-no-rush.md`](scripts/02-no-rush.md) — 78s, 22 beats. Tortoise-headed
  character, from idea 09 in the bank.
- [`prompts/00-master-prompt-library.txt`](prompts/00-master-prompt-library.txt) —
  **reusable fill-in prompts for every stage:** hooks, story, character, scene, animation,
  negatives.
- [`tools/new-video.sh`](tools/new-video.sh) — creates `VIDEO_NNN/` with the six stage
  folders and seeds the script template.

## How Pigeon runs

```
hooks  ->  story  ->  shot list  ->  master character  ->  stills
                                                             |
                                    upload  <-  edit  <-  animation
```

Ten hooks, keep three. Five beats, twenty shots, one job each. One character block, pasted
never paraphrased. One action and one camera move per clip. Approve every still before you
animate it — that gate is where the money is saved.

## Start here

```sh
tools/new-video.sh 001
```

Then fill in `VIDEO_001/01_SCRIPT/script.md` top to bottom. Do not open an image generator
until the pre-generation checklist at the bottom of it is fully ticked.
