#!/bin/bash

set -e

TARGET_DIRECTORY=$1

function download_career_file() {
  [[ ! -f "$TARGET_DIRECTORY/career/$1.pdf" ]] && curl -Lo "$TARGET_DIRECTORY/career/$1.pdf" \
    "https://github.com/tjmaynes/career/releases/download/latest/$1.pdf"
}

function main() {
  mkdir -p "$TARGET_DIRECTORY/career" || true

  FILES=(cv resume)
  for file in "${FILES[@]}"; do
    download_career_file $file
  done
}

main
