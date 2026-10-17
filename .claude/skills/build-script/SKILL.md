---
name: build-script
description: Write the voiceover script and frame-by-frame 3D animation blueprint for the engineering-breakdown channel (Action → Failure → Fix loop, @youbuiltit road video as the template). Use when the user gives a topic like "How a stream becomes a hydroelectric dam" or runs /build-script <topic>.
argument-hint: " <topic> [extended]"
user-invocable: true
---

# /build-script

Turns one topic into a finished script file for the engineering channel.

## Steps

1. Read `docs/10-engineering-channel-format-bible.md` in full, then
   `scripts/eng-01-hydroelectric-dam.md` as the worked example of the output.
2. Research the real engineering before writing. List the actual build sequence
   professionals use, the failure each layer exists to prevent, the real names for each
   layer, and one counter-intuitive fact with a number that has a source. Never invent a
   fix or a statistic.
3. Pick the loop: a naive hook that can be shown in use, then failures that each force
   the next real fix. 3 cycles for the 40–50 s default; 4–5 cycles for an `extended`
   (62–70 s) cut.
4. Write the script with the beat grammar in bible §1.1 ("If you … you have a" / "But" /
   "So you" / "Now" / "This is" / myth "not X. It is Y." / "Add" / "Congratulations, you
   have built a …").
5. Count words and time it at 2.8 words/sec. 110–130 words and 40–50 s for the default;
   175–195 words and 62–70 s for extended. Myth-buster start between 65 % and 85 % of
   runtime. Rewrite until all three hold.
6. Write the blueprint per bible §7: environment kit and cut plane for this topic, then
   every beat with VO, word captions (Title Case), cutaway & assets, colour codes, gag,
   camera, SFX and on-screen text, with sub-beats on any line over 4 s.
7. Run the bible §8 checklist line by line and fix every miss.
8. Save as `scripts/eng-NN-<slug>.md` (next free NN) and add it to the README's
   engineering-channel list.
9. Reply with the script block in chat (so it can be recorded straight away), the
   runtime/word count, and the path to the full blueprint.
