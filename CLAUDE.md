# Production defaults

- **Every video is 16:9 YouTube format** (1920×1080, 24 fps), long-form like the reference What-If videos in
  `docs/10-what-if-style-reference.md`. Do not make 9:16 unless the user asks for it for a specific video.
- Videos are built with the 2D studio in `aitrends-2d-studio/` (one folder per video in `projects/<slug>/`).
- 16:9 defaults: cinematic letterbox bars, no burned-in captions, end screen with a "What would YOU do?" question + subscribe.
- Voiceovers come from the ElevenLabs connector; word timings from `tools/align_offline.py` (huggingface.co is blocked here).
- Channel: **Parallel You** (@ParallelYou), tagline "Every what if, lived by you.", business email parallelyou.business@gmail.com.
  Brand kit: `aitrends-2d-studio/projects/parallel-you-brand/channel.md`. Descriptions follow the style in
  `aitrends-2d-studio/projects/see-10-seconds/story/youtube.md` (hashtags first, short "you" lines, teasing chapters, then
  the Parallel You sign-off).
