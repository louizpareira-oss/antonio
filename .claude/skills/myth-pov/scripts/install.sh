#!/usr/bin/env bash
# Myth POV toolchain installer (Ubuntu 24.04 / Debian; cloud container or local Linux). Safe to re-run.
#   bash skills/myth-pov/scripts/install.sh
set -e
SK="$(cd "$(dirname "$0")/.." && pwd)"
REPO="$(git -C "$SK" rev-parse --show-toplevel 2>/dev/null || (cd "$SK/../.." && pwd))"
STUDIO="$REPO/aitrends-2d-studio"
SUDO=""; [ "$(id -u)" != "0" ] && SUDO="sudo"
echo "== apt: Blender (3D assets + mocap), xvfb + mesa (headless GL), numpy for Blender, ffmpeg, tesseract"
$SUDO apt-get update -q
DEBIAN_FRONTEND=noninteractive $SUDO apt-get install -y -q --no-install-recommends \
  blender xvfb mesa-utils libgl1-mesa-dri python3-numpy ffmpeg tesseract-ocr curl
echo "== pip: reference analysis (OpenCV, PySceneDetect, RapidOCR) + offline word alignment (PocketSphinx)"
python3 -m pip install -q opencv-python-headless scenedetect rapidocr-onnxruntime pocketsphinx numpy pillow \
  || python3 -m pip install -q --break-system-packages opencv-python-headless scenedetect rapidocr-onnxruntime pocketsphinx numpy pillow
echo "== npm: studio (three.js, playwright, fonts)"
(cd "$STUDIO" && npm install --no-audit --no-fund)
echo "== studio kit: link engine/myth3d.js"
cp "$SK/studio/myth3d.js" "$STUDIO/engine/myth3d.js"
echo "== Chromium: render.mjs uses Playwright's browser, else /opt/pw-browsers/chromium or \$CHROME_PATH"
if ! (cd "$STUDIO" && node -e "import('playwright').then(p=>{const f=p.chromium.executablePath();process.exit(require('fs').existsSync(f)?0:1)})" 2>/dev/null); then
  [ -e /opt/pw-browsers/chromium ] || [ -n "$CHROME_PATH" ] || (cd "$STUDIO" && npx playwright install chromium)
fi
echo "== self-test"
blender --version | head -1
xvfb-run -a blender -b --python-expr "import bpy; print('BLENDER_OK')" 2>/dev/null | grep BLENDER_OK
python3 -c "import cv2, scenedetect, rapidocr_onnxruntime; print('PY_OK', cv2.__version__)"
node -e "console.log('NODE_OK', process.version)"
ffmpeg -version | head -1
echo "== done. Next: bash skills/myth-pov/scripts/fetch_mocap.sh 07_01 86_02  (CMU clips)"
