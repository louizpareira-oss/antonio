# 10. Master prompt v6 — what was wrong with v5.0, and why

The copy-paste prompt is [`prompts/reynard-master-prompt-v6.txt`](../prompts/reynard-master-prompt-v6.txt).
This page explains every change, using measurements from the 5 reference videos
(a frame every 2 s, full transcripts, cut detection, colour, voice pitch and loudness).

## What the reference videos measured

| | Across the 5 videos |
|---|---|
| Length | 60.2–110.1 s (median 82.6 s) |
| First spoken word | 0.2–0.9 s (one video: 2.6 s) |
| Speaking speed | 126–162 words per minute |
| Speakers | exactly 2 per video: a fixed mentor + a companion who changes |
| Voices | mentor deep, about 105–125 Hz; kid companions about 250–400 Hz |
| Shots | a new shot about every 3 s; the proof section cuts every 1.7–2.7 s, the ending holds shots 5–10 s |
| Colour | the proof section loses 64–70% of its saturation (black and white); one object keeps its colour |
| Sound | music under the whole video, 3–10 dB below the voices; sound effects on the words; low booms at section changes |
| Loudness | −14 to −15 LUFS on every video, loudness range 3–4.6 LU |

## What v5.0 already got right — kept

- The drop-in hook: the companion is mid-action with the object in frame.
- Reynard as the calm mentor who listens first.
- "Watch this" as the door into a black-and-white proof.
- The return to colour and a close-up sign-off.
- Locked character descriptions, living backgrounds, only the speaker acting.

## The mistakes, one by one

| # | v5.0 said | What the reference actually does | v6 does |
|---|---|---|---|
| 1 | "Full 60s script", sign-off at 55–60 s | 60–110 s long. TikTok pays only over 60 s; [doc 03](03-technical-spec.md) says 65–90 s | 70–85 s, default 75 s, never under 65 s |
| 2 | "all 4 clip image prompts" | A new shot about every 3 s (25–37 shots per video; only the 60 s one holds longer). 4 clips in 60 s is a slideshow — the "slides format" TikTok flagged | 24–30 shots from about 18–22 generated clips |
| 3 | "Slow camera push-in. No fast cuts." | The proof cuts every 1.7–2.7 s; the moral holds each shot 5–10 s | The rhythm changes by section |
| 4 | 2 s of silence at 12–18 s while the innocent realises "I never thought about that…" | Early beats are short (1.2–1.6 s) and the music keeps playing. The companion reacts with pushback or curiosity ("Everyone knows that." → "Now that you say it."); they only understand after the proof. The long pauses (1.6–3.1 s) sit at the portal | Pushback first, a ~1 s beat over music, one curious line. The full realisation moves to the return |
| 5 | Nothing about voices | Two cast voices in every video: a deep calm mentor and a clearly higher companion; talking shots show mouth movement | Voice casting section, Reynard's fixed voice, voice-first workflow, lip-sync on close-ups |
| 6 | Nothing about sound | Music never stops; a ~1.1 kHz beep plays exactly on the word "beep"; low booms at section changes; every video mastered to the same loudness | Sound direction section, −14 LUFS |
| 7 | "Warm sepia over EVERYTHING … NEVER cool gray/blue" | Warm present, black-and-white truth, one object kept in colour, cool blue night for loneliness. Sepia everywhere erases the colour arc | Four LOOK blocks + one signature colour object per episode |
| 8 | Grain and scanlines in every image prompt | Grain requested from an AI model comes out different in every clip and flickers; the reference's texture is identical in every shot | Clean generations + one grain/scanline overlay in CapCut |
| 9 | Barnaby as the "main innocent" + a guest | The AI picks Barnaby every time, so every episode has the same pair. The reference has exactly two speakers: the mentor is fixed, the companion changes (dog, cub, she-wolf, pig — the cub twice in five) | Reynard + one rotating companion. Barnaby is a roster member (at most 1 episode in 4) |
| 10 | Final truth = "one short line" | 3–5 short quotable lines; the last one turns to "you" | A moral block ending on "you" |
| 11 | "Now you see. Stay sharp." | A two-option line + the brand mantra with the follow/subscribe built in + a visual signature | "…or notice everything, believe slowly, and follow the fox." + notebook snap, lamp off, glint on the glasses |
| 12 | Hook window 0–5 s | First word at 0.2–0.9 s | The companion speaks within 0.5 s |
| 13 | Only one proof type (who created it → how → who profited) | Three kinds: history exposé (the handbag factory, the orange-juice ads), fable (the hare, the ungrateful cat), everyday pattern (the beeps) | MODE: EXPOSE, FABLE or PATTERN |
| 14 | "Specific years, specific machines, specific money" with no fact rule | An AI asked for specifics will invent them. The reference builds on real history (Albert Lasker's orange campaign, WWII frozen concentrate) | Real facts only + a FACT CHECK section in every output |
| 15 | `--no …` list incl. "notebook in rabbit hands", "zootopia style", "slow start" | `--no` is Midjourney syntax; naming an object can pull it into the image; "slow start" is not something a picture can show | Positive wording; a short negative list only in a tool's negative field |
| 16 | "--no text" only | Products, prices and years still need words; AI garbles them (the reference left in "ORANGE JUCE") | Blank labels in the image; real text added in the edit |
| 17 | Captions "bottom center", 1–3 words | The bottom 20% is covered by TikTok's buttons ([doc 03](03-technical-spec.md)); the reference shows one word at a time about 75% down | One word, centred at ~72% height, keywords in gold |
| 18 | Guest "never repeat" | A returning companion builds attachment, and a brand-new design every time is hard to keep consistent | A roster: never the same companion twice in a row |

**Note on shot length:** the proof section in this format runs faster than the 2–5 s rule in
[doc 07](07-matching-visuals-to-dialogue.md) — the reference measured 1.7–2.7 s there. The
dialogue and the ending follow doc 07.

## Making an episode with your OpenArt credits

Voice first, picture second. This is how animated shorts are made professionally.

1. **Voices.** Generate every line in ElevenLabs (you know it from the course). Save Reynard's
   voice once and use that exact voice in every episode; pick a new, clearly different voice for
   each companion. Strongest option for originality: record Reynard's lines yourself and pass
   them through a voice changer. Lay the lines out in CapCut — this voice track now sets the
   length of every shot.
2. **Reference sheets.** Reynard: your existing reference. Each new companion: one turnaround
   sheet (the prompt comes in section 2 of the output). Keep the best take forever.
3. **Keyframes.** One still per shot, image-to-image with the reference sheets attached.
   Nano Banana 2 (20 credits, up to 14 references) for final quality; Seedream 4.5 (15) is strong
   at 2D cartoon; Kling 3 Omni images (10) for cheap drafts.
4. **Silent shots** (proof, inserts, outro): image-to-video in PixVerse V6 (50 credits).
5. **Talking close-ups:** a model that accepts an audio element — MiniMax H3 Max (125),
   Wan 3.0 (100) or Seedance 2.0 Mini (200). Attach that line's audio and name the speaker in the
   prompt ("the fox in image 1 speaks with this voice"). Check that the lips land on the words;
   slip the clip a few frames in the edit if needed.
6. **Portal:** a start/end-frame clip (PixVerse V6, Kling 3.0 or Veo 3.1): start on the notebook
   sketch, end on the first black-and-white proof frame.
7. **Edit in CapCut:** mute every clip's own audio → voice track → cut the picture between
   sentences → captions → SFX and music → one grain/scanline overlay → export 1080×1920, 30 fps →
   bring the mix to −14 LUFS (Audacity → Effect → Loudness Normalization, if CapCut can't).

**Rough cost per 75 s episode at today's default prices:** about 22 keyframes with retakes
≈ 450–650, about 14 silent clips ≈ 700, about 8 talking clips ≈ 800–1,000 → **roughly
2,000–2,500 credits**, so the current 5,941 balance covers about two episodes that way.
Budget route (about 1,400–1,600): Kling 3 Omni keyframes, PixVerse for every clip, real
lip-sync only on the 2–3 closest close-ups. Longer clips and higher resolutions cost more —
check the price before batch-generating.

## Example — what a v6 episode sounds like

Topic: planned obsolescence · Mode: EXPOSE · Companion: **Otis**, a raccoon neighbour (new) ·
Opening: Otis's porch at dusk, on a stepladder · Signature object: the light bulb, glowing
yellow in every black-and-white shot.

| Time | Speaker | Line |
|---|---|---|
| 0:00 | OTIS *(cheerful, twisting in a bulb)* | Third bulb this year! They just burn out, huh? |
| 0:03 | REYNARD *(calm, amused)* | Burn out? Or were they told to? |
| 0:06 | OTIS *(laughs)* | Told to? It's a light bulb, Reynard. |
| 0:08 | REYNARD | There's a bulb in California that's been glowing since 1901. |
| 0:12 | — | *(Otis freezes, bulb in hand — 1 s, music continues)* |
| 0:13 | OTIS *(curious)* | Then why does mine keep dying? |
| 0:15 | REYNARD *(opens the notebook)* | Watch this. |
| 0:16 | — | *(portal: push into a sketch of a bulb — whoosh, low boom)* |
| 0:18 | REYNARD *(VO)* | Geneva. December, 1924. The biggest bulb makers in the world meet in secret. Their problem? Bulbs last too long. Longer bulbs. Fewer sales. Smaller profits. So they make a deal. They call it Phoebus. From now on, a bulb dies at one thousand hours. Samples are tested in a lab. Last too long, and the company pays a fine. |
| 0:43 | OTIS *(VO, stunned)* | A fine… for a better bulb? |
| 0:45 | REYNARD *(VO)* | For a longer one. The war breaks the cartel in 1939. But the idea survives, under a quieter name: planned obsolescence. And in a Livermore firehouse, that old bulb still glows. |
| 0:58 | — | *(back to colour, same porch, now fully dark — Otis stares at the dead bulb, 1 s)* |
| 0:59 | OTIS *(quiet)* | So it was made to break? |
| 1:01 | REYNARD *(gentle)* | Made to be bought again. A thing that lasts is bad for business. A customer who notices is worse. You're not unlucky. You're a subscription you never signed. |
| 1:13 | REYNARD *(to camera)* | So keep buying bulbs… or notice everything, believe slowly, and follow the fox. |
| 1:19 | — | *(notebook snap, lamp click, glint on the glasses — hold 2 s)* |

184 spoken words · about 80 s. Facts to verify before posting: the Phoebus cartel meeting in
Geneva (December 1924), the 1,000-hour limit, lab testing and fines, the cartel ending with the
war in 1939, and the Centennial Light in Livermore, California (lit since 1901).

→ Prompt: [`prompts/reynard-master-prompt-v6.txt`](../prompts/reynard-master-prompt-v6.txt)
