#!/usr/bin/env bash

set -e

TARGET_DIRECTORY=$1

function check_requirements() {
  if [[ -z "$TARGET_DIRECTORY" ]]; then
    echo "Please pass an argument for 'TARGET_DIRECTORY' before running this script"
    exit 1
  fi
}

function download_career_file() {
  curl -Lo "$TARGET_DIRECTORY/career/$1.pdf" \
    "https://github.com/tjmaynes/career/releases/download/latest/$1.pdf"
}

function main() {
  check_requirements

  mkdir -p "$TARGET_DIRECTORY/career" || true

  FILES=(cv resume)
  for file in "${FILES[@]}"; do
    [[ ! -f "$TARGET_DIRECTORY/career/$file.pdf" ]] && download_career_file "$file"
  done
}

main
