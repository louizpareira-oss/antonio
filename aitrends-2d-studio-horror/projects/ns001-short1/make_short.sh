#!/usr/bin/env bash
# Builds out/short1.mp4: the engine-rendered 9:16 frame (build/video_silent.mp4) with the first 35.2 s of the long
# video laid into the black band (y 640..1169). The long video keeps its full width (its text cards span x 80..1842)
# and is cut off above its own small captions (source y 0..940 -> 1080x529), since the Short has big captions of its
# own. Audio fades out over the cut.
set -euo pipefail
cd "$(dirname "$0")"
LONG=../ns001-empty-seat/out/If_Your_Car_Ever_Beeps_For_The_Empty_Passenger_Seat_DONT_LOOK.mp4
END=35.2
mkdir -p out
ffmpeg -y -v error -i build/video_silent.mp4 -t "$END" -i "$LONG" -filter_complex \
  "[1:v]crop=1920:940:0:0,scale=1080:529[v];[0:v][v]overlay=0:640:shortest=1[out];[1:a]afade=t=out:st=$(echo "$END - 0.25" | bc):d=0.25[a]" \
  -map '[out]' -map '[a]' -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -movflags +faststart out/short1.mp4
echo "wrote $(pwd)/out/short1.mp4"
