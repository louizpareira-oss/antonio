# Script 00 — Template

Copy this file to `scripts/NN-your-title.md` and fill it in **top to bottom**. Do not skip
down to the shot list. Do not open an image generator until section 5 is complete.

Method behind it: [`docs/08-start-with-the-story.md`](../docs/08-start-with-the-story.md)
(story) and [`docs/07-matching-visuals-to-dialogue.md`](../docs/07-matching-visuals-to-dialogue.md)
(shots).

---

**Target length:** __ seconds (__s of voice + 2s silent hold at the end)
**Format:** 1080 × 1920, full bleed, no bars
**Beats:** __ · **Average shot:** __s

---

## 1. The idea underneath

**The claim** (one sentence, and someone could disagree with it):

> _______________________________________________

**The shape:** Reversal / Confession / Reframe / Escalation — ______________

**The controlling image** (one concrete world, all vocabulary comes from here):

> _______________________________________________

**The return** (an image shown early, brought back changed at the end):

> Early: ____________________  →  Late: ____________________

---

## 2. The spine

Fill in one line per movement before writing any dialogue.

| # | Movement | What happens here | Target share | Your seconds |
|---|---|---|---|---|
| 1 | **Hook** | | ~8% | |
| 2 | **Setup** | | ~15% | |
| 3 | **Escalation** | | ~40% | |
| 4 | **Payoff setup** | | ~25% | |
| 5 | **Payoff** | | ~10% | |

Escalation is the longest movement. The payoff is the shortest. If yours are the other way
round, fix it here — it will not be fixable in the edit.

---

## 3. The script

Write in beats. Blank line between each — those are your pauses and your cuts.

**Dialogue rule:** every spoken line must be attachable to a **specific character action**
happening in that shot. If you cannot name the action, the line is too long or too
abstract. Long speeches are allowed only when the entire shot is built around the speech
(one held shot, one face, no cutting).

Use whichever register the video needs. Delete the other.

### Single voice (monologue — the Script 01 register)

```
[beat 1 line]

[beat 2 line]

[beat 3 line]
```

### Multiple characters (scene)

```
Character A: [short line]
    (action: ____________________)

Character B: [short line]
    (action: ____________________)

Narration: [only if the pictures genuinely cannot carry it]
```

Narration is a last resort, not a default. If a narration line describes something the
viewer can already see, cut it.

---

## 4. The job sheet

Every beat gets exactly **one** job. A beat with no job gets deleted, not generated.

Jobs: **Hook · Turn · Evidence · Escalation · Reveal · Landing**

| # | Line | Job | Delete test — what breaks without it? |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

Run the delete test on every row before continuing. Cutting a beat costs nothing now and
costs a generated clip later.

**Energy map** — mark each beat loud or quiet and look at the shape. A flat line is a flat
video.

```
```

---

## 5. The shot list

Translate every beat into a shot **before generating anything**. This is the step that
stops you paying for clips that never make the final cut.

Count visuals, not sentences: if the picture does not change, hold the shot; if one line
contains three places, that is three shots.

| # | Time | Voice | Line | Job | Emotion | Shot | Folder |
|---|---|---|---|---|---|---|---|
| 1 | 0.0–__ | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| — | __–__ | *(silence)* | | — | — | Hold the final shot | — |

Folders (from doc 07): `01-alone` · `02-turning-away` · `03-storm` · `04-crowd` ·
`05-hands` · `06-threshold` · `07-open` · `08-face`

Timing rules: 2–5s per shot · cut on the breath, not mid-word · bring the final image in
~1s before the last line and hold it 2s after the voice stops.

---

## 6. Generation prompts

Only now. One per shot, using the doc 07 formula:

```
[subject] + [action] + [environment] + [light] + [mood] + [camera] + 9:16 vertical
```

| # | Prompt |
|---|---|
| 1 | |
| 2 | |
| 3 | |

Generate 3 takes of each, keep the best. Native 9:16, 1080 × 1920 — never generate 4:3 and
letterbox it.

---

## Pre-generation checklist

- [ ] The claim is one arguable sentence.
- [ ] All five spine movements are present; the Hook opens inside the situation.
- [ ] Escalation is the longest movement, the Payoff the shortest.
- [ ] One controlling image, not three.
- [ ] Every spoken line is attached to a specific character action.
- [ ] Every beat has exactly one job.
- [ ] The delete test has been run on every beat.
- [ ] The energy map is not a flat line.
- [ ] The last beat recontextualises the first.
- [ ] Every shot has a prompt written before a single generation is spent.
