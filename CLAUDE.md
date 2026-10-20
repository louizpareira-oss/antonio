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
  Brand kit: `aitrends-2d-studio/projects/parallel-you-brand/channel.md`.
- **YouTube metadata (rule from the user, Oct 20, replaces `docs/12-viral-descriptions.md`):** no keyword stuffing.
  The description is only: exactly 3 hashtags on the first line (e.g. `#whatif #animation #storytime`, never more
  than 3), a 1-sentence hook, the chapter timestamps (each ≥ 10 s), and nothing else (no sign-off, links, email or
  SEO text). Backend tags: 5–8 highly targeted ones, never more (user, repeated Oct 20).
  Example: `aitrends-2d-studio/projects/heavier-every-day/story/youtube.md`.
- **Tools:** the video is always built in the 2D studio (no AI video clips).
- **Thumbnails (rule from the user, Oct 20, replaces all earlier thumbnail rules):** prompt only. Never draw or code
  thumbnails (no `thumb.js`, no thumbnail projects) and never spend OpenArt credits on them. For every video, write
  **3 original, high-concept SeaArt prompts** in the video's `story/thumbnail.md`; the user generates them. Our own
  visual hooks, never a copy of another channel's idea. Every prompt starts with this block, word for word
  (updated by the user Oct 20: no 3D/octane render, it looks like fake AI; close-ups only):
  "16:9 aspect ratio, YouTube thumbnail. 2D cel-shaded cartoon illustration style with bold black outlines, flat
  vibrant colors, and dramatic comic-book glow. A slender stick-figure with thin limbs, a solid black spherical head,
  and glowing white eyes, wearing a bright blue hoodie. Close-up: the stick-figure is huge in the foreground, taking
  up 50-60% of the frame, his facial expression big and readable on a phone screen. High contrast, dramatic cyan and
  neon orange glow. Strictly NO human skin, NO realistic faces, NO thick/chibi bodies, NO 3D render, NO realistic
  textures."
  Then one epic, physical consequence of the video's rule right around him, with a dynamic pose toward the camera
  (foreshortening: a hand or sneaker coming at the lens), comic-book impact/speed lines and a simple, bright, flat
  background (the user's "TOO FAST?" example). Never a wide shot, a whole street or a
  cross-section; always the character big in the foreground with an empty corner for text. No small clutter, no tiny
  numbers, no signs. Each concept gets a punchy 2-word ALL-CAPS text overlay, saying which word is white and which
  is yellow; the user adds the text.
- **Style rules from the measured references** (`docs/11-reference-analysis-500iq-and-zero-pain.md`):
  - Picture: brighter (aim for centre brightness ~85–100, ours was 60), big faces and close-ups, no stretch over
    ~15 s without a picture change.
  - Opening: a close-up of something impossible within the first second.
  - Narration: ~130–145 words per minute.
  - Story: a family member with a backstory, a lasting price for the hero, world-scale effects, a twist in the last
    30 s that sets up a sequel, then the comment question. When an organization is needed, use real-world ones
    (NASA, SpaceX…) shown as plain text names without logos; no secret labs or white-coat agencies (user, Oct 20).
  - Structure (user, Oct 20): the "Is any of this real?" science section goes in the **middle** (between Act 2 and
    Act 3), never at the end. The final act runs from the climax straight into the twist and the end question.

# New video checklist (what a finished Parallel You video includes)

1. Script in `scripts/NN-<slug>.md` (next number after the last one), approved by the user before voicing.
2. Voices: ask whether to reuse the narrator "What-If Narrator (relaxed)" and the side-character voices or design new ones.
3. Video in `aitrends-2d-studio/projects/<slug>/`, final MP4 in its `out/`.
   Long renders: render in 40-s pieces with `--from/--to --out build/segs/seg_NNN.mp4` and join them with ffmpeg concat;
   the cloud container can restart while idle and kill a single 2-hour render (it happened on video 4).
4. Thumbnail: 3 SeaArt prompts + 2-word text overlays in `story/thumbnail.md` (rules above); the user makes it.
5. `story/youtube.md` (title, 3 hashtags + 1-sentence hook + chapters each ≥ 10 s, 5–8 tags, optional pinned
   comment) and `story/tiktok.md` (short caption, same 16:9 file).
