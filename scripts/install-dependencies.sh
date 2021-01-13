#!/bin/bash

set -e

check_requirements() {
  if [[ -z "$(command -v npm)" ]]; then
    echo "Please install npm on your machine."
    exit 1
  fi
}

install_cypressjs_dependencies() {
  if [[ "$OSTYPE" == "linux-gnu"* ]] && [[ -z "$(command -v cypress)" ]]; then
    sudo apt-get update && sudo apt-get install \
      libgtk2.0-0 \
      libgtk-3-0 \
      libgbm-dev \
      libnotify-dev \
      libgconf-2-4 \
      libnss3 \
      libxss1 \
      libasound2 \
      libxtst6 \
      xauth \
      xvfb
  fi
}

main() {
  check_requirements

  install_cypressjs_dependencies

  npm install --silent
}

main
