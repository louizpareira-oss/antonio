# Voices — What If You Got Stronger and Couldn't Stop?

Designed in ElevenLabs on Oct 18, 2026. The samples are in `voice_previews/`.

| Role | Pick | ElevenLabs voice | voice_id |
|---|---|---|---|
| Narrator | sample 3 (picked for the user: most expressive, moderate pace) | What-If Narrator (Parallel You) | `QgAb0ER9CrKjFmHbuY3t` |
| Dad | sample 1 | Dad (Stronger, Parallel You) | `vkv4hZ6kHug4RGtCobGb` |
| Mom | sample 2 (the user changed from 3) | Mom v2 (Stronger, Parallel You) | `2h2ctd6TBF6IHVnBD8Wi` |
| Dr. Voss | sample 3 (the user's pick) | Dr. Voss v3 (Stronger, Parallel You) | `hXQy7dxS6bm66JNYI7of` |

## Recording
- **Model and flow:** eleven_v4, ElevenLabs flow `kh9ihrDJoQExLPDfksoL`.
- **Narrator:** one take in two parts (`narration_part1.txt`, `narration_part2.txt`), because eleven_v4 allows at
  most 5,000 characters per take. The character lines are left out of the narration and spliced in afterwards.
- **Character lines (4 takes each):**
  - Dad: "[warmly] Strong is easy, kiddo. Gentle is hard." and "[trembling voice] …" for the climax.
  - Dr. Voss: "[calmly] We can't stop the doubling…"
  - Mom: "[trembling voice] It's Lily. She pulled the bars off her crib."

## Final voiceover (`input/voiceover.mp3`, built by `input/assemble_vo.py`)
- **Length and pace:** 7:52 at 139 words per minute. The raw narrator takes ran at ~165 words/min; they are slowed with
  rubberband (tempo 0.93, pitch unchanged) and every pause is 0.22 s longer.
- **Takes used:**
  - Dad: `dad_warm_take3` and `dad_trembling_take3`.
  - Dr. Voss: `voss_take4`.
  - Mom: `mom_take2`.
  - All were picked by checking that the takes say the right words. Swap a take in `SLOTS` and re-run the script.
- **Where each line sits:** `input/vo_slots.json`. Word timings: `timeline/words.json`.
