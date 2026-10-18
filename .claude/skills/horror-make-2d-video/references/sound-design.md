# Sound Design — HORROR EDITION
`audio/mix.py` builds the soundtrack from `story/shots.json`. It ducks the music -9 dB and ambience -5 dB under the voice and normalises the master to -14 LUFS (YouTube), or `config.loudness`.

**Horror mixing principle:** The calm deadpan voiceover should feel like the ONLY stable thing in a world of sonic wrongness. Music and SFX create the unease AROUND the voice, never overpowering it.

## Music Plan (`"music"` in shots.json)
Contiguous sections with a HORROR mood and intensity (0-1; higher adds more layers, more dissonance, more pulse). Change sections at protocol turns (the title card, THE RULE, the "what happens if you break it" section, the protocol steps, the test, the aftermath, the sting).

**HORROR MOODS — use these:**
- `unease` — subtle wrongness, low hum, distant detuned tones. Cold open, everyday moments that are slightly off.
- `tension` — building dread, slow pulse, held dissonant notes. The rule is established, something is coming.
- `dread` — deep bass, oppressive, sustained wrong notes. "What happens if you break it" section. The horror is real.
- `terror` — staccato pulses, sharp string stabs, frantic. The test, the thing fights back, peak danger.
- `relief_sting` — false calm, slightly wrong "safety" that doesn't feel safe. Aftermath, survival.
- `void` — cold, empty, clinical. Field report / protocol explanation sections.
- `dark` — deep, rumbling, existential. Used sparingly for the biggest wrongness reveals.

**Legacy moods still available but not preferred for horror:** `mystery, action, wonder, hopeful, sad, triumph, playful, calm, epic`.

Audition with `python audio/music.py --mood dread --intensity 0.7 --dur 20 --out test.wav`. To use the user's own track, set `config.music.file = "input/music.mp3"` (it loops or trims and fades the end). Set `config.music.gainDb` (default -17 relative to the voice) — for horror, music is often quieter (-20 to -24) to let the silence and SFX breathe.

## SFX Cues — HORROR LIBRARY
Per shot `"sfx": [{"at": 0.3, "name": "glitch", "gain": -8}]`, where `at` is seconds from the shot start; optional `dur`, `seed`, `pitch`; `name` can also be a path to the user's own WAV/MP3).

**Core library** (`python audio/sfx.py --list`, audition all with `--demo build/sfx_demo`):
`whoosh, swish, impact, hit, riser, slowmo, freeze, tick, clock, heartbeat, pop, blip, counter, ding, shimmer, stinger, footstep, kick, whistle, carpass, phonebuzz, phonering, cheer, applause, murmur, rain, thunder, wind, roomtone, city, hum, powerup, glitch, flash, buzz, static, whisper, thud, distant_scream, creak, metal_scrape, breath_shallow, tone_low`

**HORROR SFX CONVENTIONS — when to use what:**
- `glitch` / `static` — on visual glitch frames, warning text appearing, the uncanny thing doing something impossible
- `riser` (1-3 seconds, slow build) — before a wrongness reveal, before THE RULE appears, building to a scare
- `stinger` / `impact` — ON the reveal, ON the scare, when the thing makes its move
- `heartbeat` — under tension moments, when the viewer's heart should be racing. Slow at first, speeding up.
- `tick` / `clock` — but SLOWED or SLIGHTLY WRONG speed. Time feels off.
- `hum` / `buzz` — under tech horror scenes (phone, TV, electronics). The wrong electricity.
- `whisper` — very quiet, barely audible, under scenes where something is watching. Use sparingly.
- `thud` — distant, muffled. Something wrong happening off-screen.
- `breath_shallow` — the viewer's own breathing during terror moments.
- `tone_low` — a single sustained low note that shouldn't exist. Dread foundation.
- `creak` — a floorboard, a door, something moving when nothing should be.
- `metal_scrape` — harsh, unpleasant. The thing in the walls.
- `distant_scream` — VERY distant, muffled, almost not there. Someone else broke the rule.
- `freeze` — on time-stop or glitch-freeze moments.
- `flash` — on red warning text flashes.

**Gains for horror:**
- Subtle wrongness cues: -16 to -22 (barely there, almost imagined)
- Normal effects: -8 to -14
- Big stingers / scares: -3 to -6 (but never louder than the voice)
- **SILENCE is a horror tool.** Leave gaps. Let the absence of sound create dread.

**Don't stack more than ~2 cues at the same instant.** Horror works best with SPACE between sounds. The VOICE is the anchor.

## Ambience Beds — HORROR EDITION
Per shot `"amb": {"name": "roomtone_low", "gain": -22}`; looped with 0.4 s fades.

**HORROR AMBIENCES:**
- `roomtone_low` — a very low, almost subsonic room hum. Default domestic uncanny.
- `hum_evil` — slightly detuned, pulsing electrical hum. Tech horror.
- `static_amb` — constant fine static. Analog horror / VHS aesthetic.
- `wind_empty` — wind through empty spaces, no leaves rustling. Isolation.
- `silence_thick` — almost nothing, but with a very subtle pressure. Used for the most tense moments.
- `rain` — but slowed, wrong rhythm.
- `murmur` — distant, indistinct voices that don't quite form words.
- `city` — but empty, distant, wrong-sounding.

Use ambience on MOST shots for a continuous world of wrongness. Levels: -20 to -30. Ambience should be FELT more than heard. The viewer should think "why does this feel so oppressive?" before they notice the sound design.

## Horror Music Section Guide (Protocol Arc)
| Beat | Mood | Intensity | Purpose |
|------|------|-----------|---------|
| Cold Open | `unease` | 0.3-0.4 | Subtle wrongness, everyday scene slightly off |
| THE RULE | `tension` | 0.5-0.6 | The rule lands, dread begins |
| What happens if you break it | `dread` | 0.6-0.8 | Horror section, wrongness revealed |
| Protocol Steps | `void` or `tension` | 0.4-0.5 | Instructional, clinical but underlying tension |
| The Test / Push Back | `terror` | 0.7-1.0 | Peak danger, frantic, the thing fights back |
| Aftermath / Survival | `relief_sting` | 0.2-0.3 | False safety, never quite right |
| Sting / Next Protocol | `unease` or `dread` | 0.4 | Door opens to more horror |
| CTA / End Screen | `void` | 0.2 | Cold, empty, clinical sign-off |
