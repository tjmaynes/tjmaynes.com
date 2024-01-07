#!/usr/bin/env bash

set -e

function check_requirements() {
  if [[ -z "$(command -v cwebp)" ]]; then
    echo "Please install 'cwebp' program before running this script"
    exit 1
  fi
}

function main() {
  check_requirements

  if find src/assets/images -name "*.jpg" | grep .; then
    echo "Optimizing the following images:" 
    find src/assets/images -name "*.jpg"
    find src/assets/images -name "*.jpg" -exec bash -c '[[ ! -f "${0%.jpg}.webp" ]] && cwebp -q 50 "${0%}" -o "${0%.jpg}.webp"' {} \;
    find src/assets/images -name "*.jpg" -exec bash -c '[[ -f "${0%.jpg}.webp" ]] && rm -f "${0%}"' {} \;
  else
    echo "No JPG images to optimize..."
  fi
}

main
