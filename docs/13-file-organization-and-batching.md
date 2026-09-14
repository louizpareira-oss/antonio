# 13. File organization and batch production

One video, you can keep in your head. Four videos in flight, and you will lose twenty
minutes hunting for the right take of clip 14 — or worse, ship the wrong one.

---

## One folder per video

```
VIDEO_001/
  01_SCRIPT/
  02_STILLS/
  03_ANIMATION/
  04_AUDIO/
  05_EDIT_EXPORTS/
  06_FINAL/
```

### Name the stage, not the tool

The source this is adapted from uses vendor folder names — `03_GROK_ANIMATION`,
`04_FLASHLOOP_AUDIO`. Do not. This repo's workflow names **four** possible stills tools and
**three** animation tools, and doc 09 tells you outright to switch tools if yours cannot do
native 9:16. A folder called `03_GROK_ANIMATION` full of Kling output is a folder that lies
to you, and renaming it later breaks every path you already wrote down.

`02_STILLS` and `03_ANIMATION` stay true whatever you are using this month.

---

## File naming

```
<beat>_<MOVEMENT>_<STAGE>.<ext>
```

| File | What it is |
|---|---|
| `01_HOOK_STILL.png` | Beat 1's generated still |
| `01_HOOK_ANIM.mp4` | Beat 1, animated |
| `03_SETUP_STILL.png` | Beat 3's still |
| `14_PAYOFFSETUP_ANIM.mp4` | Beat 14, animated |
| `VO_FULL.mp3` | The whole voiceover, one take |
| `FINAL_V1.mp4` | First full export |
| `FINAL_V2.mp4` | Second |

Four rules that matter more than they look:

- **Zero-pad the beat number.** `01`, not `1`. Otherwise your file manager sorts
  `1, 10, 11, 12, 2, 20, 3` and the shot list stops matching the folder.
- **Keep split beats lettered**, matching the prompt pack: beat 5 is already `5A`, `5B`,
  `5C` in `prompts/01-forgive-the-past-anime.txt`, so the files are `05A_SETUP_STILL.png`
  and so on. Twenty beats, twenty-two clips — the numbering has to absorb that.
- **The movement name is there so you can see the spine in the file list.** Scrolling a
  folder that reads HOOK, HOOK, SETUP, SETUP, SETUP, ESCALATION… tells you instantly
  whether your escalation is too short.
- **Never overwrite a take.** `_v2`, `_v3`. The take you deleted is the one you wanted.

### Mark the matched pair

Script 01's clips 3 and 20 are the same doorway, and the rewatch depends on them matching.
Name them so you cannot miss it:

```
03_SETUP_STILL_PAIR.png
20_PAYOFF_STILL_PAIR.png
```

---

## Create the structure

`tools/new-video.sh` makes the folders and drops the template in:

```sh
tools/new-video.sh 002
```

`scripts/` in this repo holds *video scripts*, not shell scripts — hence `tools/`.

---

## Batch production

Once the workflow is familiar, stop treating each video as one long task. Batching cuts
the setup cost — you stay in one tool, one headspace, one set of settings.

| Batch | Stage | Do this | Then stop |
|---|---|---|---|
| **1** | **Ideas** | Ten hooks per topic, using the hook generator in `prompts/00-master-prompt-library.txt`. Write only the hook | Keep three. Most die here, cheaply |
| **2** | **Scripts** | Turn the survivors into complete five-beat stories | Every beat has a job and passes the delete test |
| **3** | **Stills** | Generate visual assets for several videos in one sitting | Approve stills before animating a single one |
| **4** | **Animation** | Animate only approved stills | — |

**The gate between batch 3 and batch 4 is the one that saves money.** Animating an
unapproved still is the most expensive mistake in this workflow: you pay for the still, pay
again for the motion, then throw both away. Approve the frame first, always.

Batch 1 is where the leverage is. Ideas are free and hooks are quick — generate ten, keep
three. Doing this properly means batches 2–4 only ever run on material that already earned
its place.

**Do not batch across the master character.** If two videos share a character, generate
their stills in the same sitting with the same master block, or the character will drift
between videos as well as within them.

---

## What this does not change

Batching is a production convenience. It does not compress the schedule in doc 04 — that
plan wants **one video per day, posted daily, for thirty days**. Batching is how you
survive that without doing a full cold start every morning; it is not permission to post
four videos on Sunday and nothing until Friday. Consistency is the thing being measured.
