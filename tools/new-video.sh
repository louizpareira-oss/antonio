#!/usr/bin/env sh
# Create the folder structure for a new video and seed it with the script template.
# Usage: tools/new-video.sh 002 [target-dir]

set -eu

if [ $# -lt 1 ]; then
    echo "usage: $0 <number> [target-dir]" >&2
    echo "example: $0 002" >&2
    exit 1
fi

num=$1
base=${2:-.}
repo=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
dir="$base/VIDEO_$num"

if [ -e "$dir" ]; then
    echo "$dir already exists — refusing to overwrite" >&2
    exit 1
fi

for sub in 01_SCRIPT 02_STILLS 03_ANIMATION 04_AUDIO 05_EDIT_EXPORTS 06_FINAL; do
    mkdir -p "$dir/$sub"
done

cp "$repo/scripts/00-template.md" "$dir/01_SCRIPT/script.md"

echo "created $dir"
echo "next: fill in $dir/01_SCRIPT/script.md before generating anything"
