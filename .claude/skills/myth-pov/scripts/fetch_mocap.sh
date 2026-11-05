#!/usr/bin/env bash
# Download CMU motion-capture clips (BVH, free for any use) by id, e.g.:
#   bash skills/myth-pov/scripts/fetch_mocap.sh 07_01 86_02 143_18      -> skills/myth-pov/mocap/<id>.bvh
# Find ids in references/cmu-mocap-index.txt (grep -i "walk\|sit\|punch" ...). Starter set: see production-workflow.md.
set -e
DIR="$(cd "$(dirname "$0")/.." && pwd)/mocap"; mkdir -p "$DIR"
BASE=https://raw.githubusercontent.com/una-dinosauria/cmu-mocap/master/data
for id in "$@"; do
  subj=${id%%_*}; subj=$(printf "%03d" $((10#$subj)))
  out="$DIR/$id.bvh"; [ -s "$out" ] && { echo "have $id"; continue; }
  code=$(curl -sSL -o "$out" -w "%{http_code}" "$BASE/$subj/$id.bvh")
  if [ "$code" = "200" ] && head -1 "$out" | grep -q HIERARCHY; then echo "got $id ($(du -h "$out" | cut -f1))"; else rm -f "$out"; echo "MISSING $id (http $code)"; fi
done
