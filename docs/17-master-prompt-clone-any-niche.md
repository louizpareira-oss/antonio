# Master prompt: clone any YouTube niche

Paste this into a new Claude Code session (or any AI) and fill the two blanks. Everything else runs the same way we
built Parallel You and Unreal Science.

---

```
You are my YouTube growth partner. Clone the niche of this reference channel for a NEW channel of mine.

REFERENCE CHANNEL: [paste channel URL or handle]
MY TOOLS: [e.g. 2D stick-figure studio in aitrends-2d-studio/, ElevenLabs voices, SeaArt thumbnails — or "none, give me prompts"]

Work in this order. Do not skip a step and do not ask me questions until step 7.

1. REVERSE-ENGINEER THE REFERENCE
   Pull every video you can reach (vidIQ, web search, or screenshots I paste). For each: title, views, length,
   upload date, thumbnail text. Then write, in 15 lines max:
   - The ONE repeatable format (e.g. "Can [famous X] beat [absurdly weak Y]?").
   - What the top 3 videos share that the bottom 3 do not (title pattern, thumbnail layout, joke, target, length).
   - The audience's shared meme / fear / wish that the hits tap into.
   - Posting rhythm and video length.
   - Thumbnail formula: text position, colors, font weight, what is big, what is empty.

2. BUILD THE CHANNEL
   - 5 channel names + handles + 4-word taglines; recommend one. Names must be normal, searchable, not puns.
   - Profile picture + banner prompts (2D cel-shaded, flat colors, bold outlines, no 3D render, no human skin).
   - Channel description: short, keyword-rich, under 400 characters, ends with a business email.
   - 8 backend channel keywords.

3. WRITE THE FORMAT BIBLE (one page)
   Title template, thumbnail template, hook in the first second, story beats with timestamps, where the
   "is this real?" / payoff moment goes, the ending question that drives comments, forbidden things
   (no keyword stuffing, max 3 hashtags, 5–8 tags, no copied videos from the reference).

4. GENERATE 20 VIDEO IDEAS
   Each: title (in the template), 2-word thumbnail text (say which word is white, which yellow), the one visual
   hook, the twist / punchline. Rank them 1–20 by predicted views and say why the top 3 win.

5. WRITE THE FIRST 3 SCRIPTS IN FULL
   Length and words-per-minute matching the reference. Open on the impossible thing in the first second.
   Include: a family member with a backstory, a lasting price for the hero, world-scale effects, a twist in the
   last 30 s that sets up a sequel, then the comment question. Real science / real facts only, real organisations
   as plain names.

6. PACKAGE EACH SCRIPT
   - 3 SeaArt thumbnail prompts per video (character huge in the foreground, 50–60 % of frame, empty corner for
     text, comic impact lines, flat bright background).
   - YouTube description: exactly 3 hashtags on line 1, a 1-sentence hook, chapters each ≥ 10 s, nothing else.
   - 5–8 backend tags.
   - 3 Shorts cut from the long video: timestamps, 2-line title, 1–3-word captions.

7. ASK ME ONLY THIS
   "Which name, and which 3 scripts should I produce first?" Then stop.

RULES
- Short, direct answers. Tables over paragraphs.
- Original ideas only; never copy a reference video.
- Every file goes in the repo: scripts/NN-slug.md, projects/<slug>/story/{thumbnail,youtube,tiktok,shorts}.md,
  docs/<NN>-<niche>-format.md. Commit and push after each step.
```

---

## How to use it fast
1. Fill the two blanks, paste, hit enter.
2. If the AI cannot reach YouTube, paste a screenshot of the channel's Videos/Shorts tab. Titles + view counts
   are enough.
3. Answer step 7, then say "produce 1, 2, 3" and let it build.

## Worked example (FOOTY LEAKED → our 2D studio)
Format: "Can [team everyone roasts] win against [most pathetic opponent]?". Hits: the weaker the opponent, the more
views (ant 2.5M > breeze 551K > kids 380K). Thumbnail: "X VS. Y" in 2-line yellow caps, game HP bar on the
opponent. Ideas and beat sheet: `docs/16-footyleaked-format.md`.
