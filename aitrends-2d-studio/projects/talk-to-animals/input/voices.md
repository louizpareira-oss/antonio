# Voices — What If You Could Talk to Animals?

| Role | Choice | ElevenLabs voice | voice_id |
|---|---|---|---|
| Narrator | the user's choice (Oct 21) | What-If Narrator (relaxed) | `tU5OsKP4quMjdJ22MRVH` |
| Biscuit | new; sample 3 (deepest, slowest), my pick on the user's instruction | Biscuit (Talk to Animals, Parallel You) | `TTXgcSM9epARxrJqZrfP` |
| Pickles | the user's choice | Laura - Enthusiast, Quirky Attitude (premade) | `FGY2WhTYpPnrIDTdsKH5` |
| Mom | reused | Mom v2 (Stronger, Parallel You) | `2h2ctd6TBF6IHVnBD8Wi` |
| Pigeon | premade, pitched +2 semitones | Roger - Laid-Back (premade) | `CwhRBWXzGAHq8TQ4Fs17` |
| Prairie dog | premade, pitched up | Charlie - Deep, Confident, Energetic (premade) | `IKne3meq5aSn9XLyUdCD` |
| Birds / pet-shop chorus | Harry + Charlie + Laura layered, pitched up | Harry - Fierce Warrior (premade) | `SOYHLrjzK2X1ezoPC6cr` |
| Whales | the narrator's line, pitched very deep, 3 layers with echo (the user's choice) | What-If Narrator (relaxed) | `tU5OsKP4quMjdJ22MRVH` |

Biscuit design (the user said "do what's better"): "Old, deep, warm male voice, slow and gentle, a little gravelly, kind
and a bit tired, American accent." Test line: his bacon line + "The day you were born…" from the approved script.

## Recording (Oct 21)
- **Model and flow:** eleven_v4, flow `aX8hrASV45ZkqDZIg8Xm`. 4 variations per call; picked with `score_takes.py`
  (rough recognition match): narrator_p1_v1 (85 %), narrator_p2_v1 (84 %), biscuit_v1, laura_v2, charlie_v2, harry_v2,
  pigeon_v1, mom_v1, whale_v3.
- Each character's lines were recorded in one take and cut apart by forced alignment (`assemble_vo.py`).

## Final voiceover (`input/voiceover.mp3`)
- 9:09 (548.9 s), 1,243 words, ~136 words per minute (tempo 0.93, +0.22 s on every pause).
- 17 character slots in `vo_slots.json`; word timings in `timeline/words.json`.
