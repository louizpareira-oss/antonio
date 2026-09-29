#!/bin/bash
# Installs the system tools the /peek skill shells out to (ffmpeg, ffprobe, yt-dlp)
# in Claude Code on the web sessions. Safe to re-run: each step is skipped if the
# tool is already on PATH.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# ffmpeg package provides both ffmpeg and ffprobe
if ! command -v ffmpeg >/dev/null 2>&1 || ! command -v ffprobe >/dev/null 2>&1; then
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y -qq --no-install-recommends ffmpeg
fi

if ! command -v yt-dlp >/dev/null 2>&1; then
  python3 -m pip install --quiet yt-dlp
fi

echo "peek deps ready: $(ffmpeg -version | head -1 | cut -d' ' -f1-3), yt-dlp $(yt-dlp --version)"
