#!/usr/bin/env bash

set -e

VIDEO_INPUT=$1
VIDEO_TYPE=mp4
SCALE=320
FPS=10

function main() {
  ffmpeg -y \
    -i "${VIDEO_INPUT}.${VIDEO_TYPE}" \
    -vf "fps=${FPS},scale=${SCALE}:-1:flags=lanczos,palettegen" \
    "${VIDEO_INPUT}.png"

  ffmpeg \
    -i "${VIDEO_INPUT}.${VIDEO_TYPE}" \
    -i "${VIDEO_INPUT}.png" \
    -filter_complex "fps=${FPS},scale=${SCALE}:-1:flags=lanczos[x];[x][1:v]paletteuse" \
    "${VIDEO_INPUT}.gif"

  rm "$VIDEO_INPUT.png"
}

main
