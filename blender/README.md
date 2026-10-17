# Blender scenes

3D animation for the engineering channel, built from the blueprints in `scripts/` and timed
to the voiceovers in `voiceovers/`. Needs **Blender 4.2 or newer** (built and tested on
5.2.2 LTS).

| File | What it is |
|---|---|
| `channel_kit.py` | Shared kit for every video: brand house, fence, low-poly trees, striped lawn, sky, the colour-coded materials from the format bible, cutaway layers, arrows, camera rig, render settings. |
| `eng01_dam.py` | ENG-01 hydroelectric dam: builds the whole 44.4 s shot and keys every event to the voiceover's word timings. |
| `eng01_dam.blend` | The scene that script produces, ready to open and render. |

## Render ENG-01

1. Open `blender/eng01_dam.blend` in Blender. Keep it inside the repo: the voiceover is
   linked from `../voiceovers/`.
2. **Render → Render Animation** (Ctrl+F12).
3. The MP4 lands in `blender/renders/`: 1080×1920, 30 fps, H.264, with the voiceover
   already on it. EEVEE on a recent GPU takes roughly 1–3 s per frame, so about 30–60
   minutes for the 1,334 frames.

To change the payoff sign or rebuild after editing the script:

```
blender --background --python blender/eng01_dam.py -- --save blender/eng01_dam.blend --sign "LOUIZ DAM"
```

You can also open `eng01_dam.py` in Blender's **Scripting** tab and press **Run Script**.
That rebuilds the scene in the open file; then use File → Save As.

## Finish in the editor (CapCut / Premiere / Resolve)

Blender renders the picture, the voiceover and the yellow "1 MILE = 1 FOOT" callout.
Add the rest in the editor:

1. **Word-by-word captions:** import `voiceovers/eng-01-hydroelectric-dam.captions.srt`.
   Style: heavy rounded white font, thin black outline, soft shadow, centred at ~48 %
   height (format bible §4.2). The SRT is already one word per cue in Title Case.
2. **Sound effects:** follow the SFX lines per beat in `scripts/eng-01-hydroelectric-dam.md`.
   Keep any music well under the voice.
3. Export 1080×1920. The voiceover is AI-generated (ElevenLabs), so check TikTok's
   current AI-content labelling rules before posting.

## How the timing works

`eng01_dam.py` never hard-codes seconds for story events. It looks words up in
`voiceovers/eng-01-hydroelectric-dam.words.json`, e.g. `cue("thick")` or `cue("so", 2)` for
the second "so". Re-record the voiceover, regenerate the words file, re-run the script, and
every animation moves with the new read.

## QC previews without a GPU

The script can render low-res Cycles CPU stills or a whole preview animation:

```
blender --background --python blender/eng01_dam.py -- --stills 4.9,12.9,33.5 --stills-dir stills
blender --background --python blender/eng01_dam.py -- --preview preview_frames --percent 25 --samples 6 --step 2
```

## Where ENG-01 differs from the written blueprint

- The hero pickup drives along the far bank in the payoff instead of across the crest: at
  this scale a truck is wider than the dam crest.
- The payoff sign stands on the far bank, left of the dam, so it stays readable in the
  final wide shot.
- Concrete "flowing around the rebar" is a pour that rises from the foundation behind the
  cage, then the wall swells into its triangle on "thick".
- Pipe cutaways (penstock) are drawn as a section band on the cut face (steel edges, water
  core) rather than a round pipe, so the water inside is visible.
