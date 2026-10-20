# Production defaults

- **Every video is 16:9 YouTube format** (1920×1080, 24 fps), long-form like the reference What-If videos in
  `docs/10-what-if-style-reference.md`. Do not make 9:16 unless the user asks for it for a specific video.
- Videos are built with the 2D studio in `aitrends-2d-studio/` (one folder per video in `projects/<slug>/`).
- 16:9 defaults: cinematic letterbox bars, no burned-in captions, end screen with a "What would YOU do?" question + subscribe.
- **YouTube "AI use" on upload:** answer **No**. The form only asks about a real person made to say/do something,
  altered real footage, a realistic-looking scene that didn't happen, or AI music as the main focus; our designed
  ElevenLabs voices, code-drawn stick figures and studio-generated background music are none of those. If a video ever
  clones a real person's voice or shows realistic scenes, answer Yes. TikTok's rule is broader (realistic AI audio
  counts), so there "AI-generated content" stays on.
- Voiceovers come from the ElevenLabs connector; word timings from `tools/align_offline.py` (huggingface.co is blocked here).
- Channel: **Parallel You** (@ParallelYou), tagline "Every what if, lived by you.", business email parallelyou.business@gmail.com.
  Brand kit: `aitrends-2d-studio/projects/parallel-you-brand/channel.md`. Descriptions follow the template in
  `docs/12-viral-descriptions.md` (measured from the viral examples the user shared, Oct 19): 3 hashtags on top, the
  title question, short "you" lines with a "Sounds amazing. Until…" turn, "This is Part 1." when there's a sequel, one
  specific "Be honest…" comment question, a 📺 link to our previous video, chapters, the Parallel You sign-off, 4
  hashtags at the end. Example: `aitrends-2d-studio/projects/stronger-couldnt-stop/story/youtube.md`.
- **Tools:** the video is always built in the 2D studio (no AI video clips).
- **Thumbnails (rule from the user, Oct 20, replaces all earlier thumbnail rules):** never draw or code thumbnails here
  and never use OpenArt. Deliver only a text prompt for the user to run in SeaArt/Midjourney, plus the text overlay,
  saved in the video's `story/thumbnail.md`. Every prompt must contain:
  1. Style, word for word: "16:9 aspect ratio, YouTube thumbnail. Cinematic 2.5D 3D render of a slender stick-figure
     with thin limbs, a solid black spherical head, and glowing white eyes. Wearing a brightly colored hoodie."
  2. Ban list, word for word: "Strictly NO human skin, NO realistic faces, NO thick/chibi 3D bodies, NO Pixar styles."
  3. Background: a high-stakes, dramatic disaster showing the physical consequence of the video's rule (shattered
     glowing concrete, crushed vehicles, burning cities…), epic cinematic lighting, depth of field. No small details,
     no math numbers, no traffic signs.
  4. Text overlay: 2 words, all caps, punchy ("TOO HEAVY.", "ONLY ME.", "NOTHING."); say which word is white and
     which is yellow. The user adds the text.
  5. From the winning examples (`docs/13-thumbnail-patterns.md`, template there): calm smug hero (half-closed eyes,
     small smirk) while one giant consequence breaks around him and touches him; hero fills ~70 % of the height on one
     side; text in the empty corner; hoodie is the strongest colour. Example: `heavier-every-day/story/thumbnail.md`.
- **Style rules from the measured references** (`docs/11-reference-analysis-500iq-and-zero-pain.md`):
  - Picture: brighter (aim for centre brightness ~85–100, ours was 60), big faces and close-ups, no stretch over
    ~15 s without a picture change.
  - Opening: a close-up of something impossible within the first second.
  - Narration: ~130–145 words per minute.
  - Story: a family member with a backstory, a lasting price for the hero, a villain or organization, world-scale
    effects, a twist in the last 30 s that sets up a sequel, then the comment question.

# New video checklist (what a finished Parallel You video includes)

1. Script in `scripts/NN-<slug>.md` (next number after the last one), approved by the user before voicing.
2. Voices: ask whether to reuse the narrator "What-If Narrator (relaxed)" and the side-character voices or design new ones.
3. Video in `aitrends-2d-studio/projects/<slug>/`, final MP4 in its `out/`.
   Long renders: render in 40-s pieces with `--from/--to --out build/segs/seg_NNN.mp4` and join them with ffmpeg concat;
   the cloud container can restart while idle and kill a single 2-hour render (it happened on video 4).
4. Thumbnail: a SeaArt/Midjourney prompt + 2-word text overlay in `story/thumbnail.md` (rules above); the user makes it.
5. `story/youtube.md` (title, description, chapters each ≥ 10 s, pinned comment, tags) and `story/tiktok.md`
   (short caption, 7 hashtags, same 16:9 file).
