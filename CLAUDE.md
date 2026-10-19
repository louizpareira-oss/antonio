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
- **Tools (decided with the user, Oct 18):** the video is always built in the 2D studio (no AI video clips). Thumbnails
  use OpenArt *images* in a 3D look like the "ONLY ME." reference (15–40 credits each; confirm before spending). The
  OpenArt CDN is blocked here, so the user downloads the image and sends it; text and finishing are added here.
- **Thumbnail update (Oct 18, from the viral examples the user shared: IFOLOGY "100x Stronger", "500 IQ", "Teleport"…):**
  use the video's own stick-figure hero (black round head, white eyes, coloured hoodie), never a 3D/realistic human.
  One big face or one big action, one strong prop, 2–3 heavy words in white + yellow with a thick black outline.
  Draw it in the studio (`projects/<slug>-thumb/`, text added by `finish.py`); OpenArt only for that same 2D style.
- **Style rules from the measured references** (`docs/11-reference-analysis-500iq-and-zero-pain.md`):
  - Picture: brighter (aim for centre brightness ~85–100, ours was 60), big faces and close-ups, no stretch over
    ~15 s without a picture change.
  - Opening: a close-up of something impossible within the first second.
  - Narration: ~130–145 words per minute.
  - Story: a family member with a backstory, a lasting price for the hero, a villain or organization, world-scale
    effects, a twist in the last 30 s that sets up a sequel, then the comment question.
  - Thumbnail: one big face (40–55 % of the height) with one emotion, one contrasting element, 2–4 words ending in a
    period that add the twist rather than repeat the title.

# New video checklist (what a finished Parallel You video includes)

1. Script in `scripts/NN-<slug>.md` (next number after the last one), approved by the user before voicing.
2. Voices: ask whether to reuse the narrator "What-If Narrator (relaxed)" and the side-character voices or design new ones.
3. Video in `aitrends-2d-studio/projects/<slug>/`, final MP4 in its `out/`.
4. Thumbnail in `projects/<slug>-thumb/` (1280×720, big text + one danger moment).
5. `story/youtube.md` (title, description, chapters each ≥ 10 s, pinned comment, tags) and `story/tiktok.md`
   (short caption, 7 hashtags, same 16:9 file).
