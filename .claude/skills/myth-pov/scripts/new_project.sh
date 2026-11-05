#!/usr/bin/env bash
# Scaffold a new Myth POV Short in the studio:  bash skills/myth-pov/scripts/new_project.sh tyr-hand
set -e
SLUG="$1"; [ -z "$SLUG" ] && { echo "usage: new_project.sh <slug>"; exit 1; }
SK="$(cd "$(dirname "$0")/.." && pwd)"
REPO="$(git -C "$SK" rev-parse --show-toplevel 2>/dev/null || (cd "$SK/../.." && pwd))"
P="$REPO/aitrends-2d-studio/projects/$SLUG"; [ -e "$P" ] && { echo "exists: $P"; exit 1; }
cp -r "$SK/studio/template" "$P"
cp "$SK/studio/myth3d.js" "$REPO/aitrends-2d-studio/engine/myth3d.js"
mkdir -p "$P/audio" "$P/build/segs" "$P/out"
echo "created $P
next:
  1. script  -> $REPO/scripts/myth/NN-$SLUG.md   (references/script-formula.md)
  2. voice   -> $P/audio/voice.mp3 (ElevenLabs), input/script.txt = the exact narration
  3. timings -> cd aitrends-2d-studio && python tools/align_offline.py --project projects/$SLUG
  4. shots   -> $P/story/shots.json + scenes/*.js (recipes: references/shot-library.md)
  5. check   -> node render.mjs --project projects/$SLUG --sheet
  6. render  -> node render.mjs --project projects/$SLUG --from 0 --to 40 --out build/segs/seg_000.mp4 (then 40-80 ...)"
