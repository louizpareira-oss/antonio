# Voices — What If You Got 2x Heavier Every Single Day?

| Role | Choice | ElevenLabs voice | voice_id |
|---|---|---|---|
| Narrator | reused from "Stronger" (user's choice, Oct 19) | What-If Narrator (Parallel You) | `QgAb0ER9CrKjFmHbuY3t` |
| Dr. Voss | reused from "Stronger" (user's choice) | Dr. Voss v3 (Stronger, Parallel You) | `hXQy7dxS6bm66JNYI7of` |
| Grandpa | sample 1 (the user's pick, Oct 19) | saved in ElevenLabs as "success parallel" (rename it to Grandpa if you like) | `P533R6LaQqFsvwdOt1YB` |

Grandpa design (description and test line approved by the user):
"A warm, slightly gravelly American man in his seventies, a retired lifeguard. Slow, gentle and kind, with a smile in his
voice, calm and reassuring, like a grandfather teaching a child to swim."
Test line: "Lie back. Spread your arms. Trust the water. It'll hold you up. You still floating, kiddo? Up there, everything floats."

## Recording (Oct 19)
- **Model and flow:** eleven_v4, flow `I1rJr9FWEtQFVLnXqhvr`.
- **Narrator:** 2 parts, 1 take each (180 s + 227 s raw, ~166 words/min).
- **Character lines:** 4 takes each. Picked by checking the words with offline recognition (swap them in `SLOTS` in
  `assemble_vo.py`):
  - `grandpa_float_take1`
  - `grandpa_kiddo_take1`
  - `voss_take1`
  - `grandpa_floats_take2`

## Final voiceover (`input/voiceover.mp3`)
- **Length and pace:** 8:20 (500.1 s), 1,169 words, ~140 words per minute. Made with tempo 0.93 and +0.22 s on every pause.
- **Slots:** Grandpa at 112.1 s and 219.5 s, Dr. Voss at 253.1 s, Grandpa at 325.2 s (`vo_slots.json`).
- **Word timings:** `timeline/words.json` (172 sentences).
