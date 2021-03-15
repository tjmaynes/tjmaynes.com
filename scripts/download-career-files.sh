#!/bin/bash

set -e

download_career_file() {
  FILE=$1

  if [[ ! -f "./public/career/$FILE" ]]; then
    echo "Downloading career file: $FILE"

    curl -Lo ./public/career/$FILE \
     "https://github.com/tjmaynes/career/releases/download/latest/$FILE"
     
  fi
}

main() {
  mkdir -p public/career || true

  FILES=(cv.pdf resume.pdf)
  for file in "${FILES[@]}"; do
    download_career_file $file
  done
}

main
