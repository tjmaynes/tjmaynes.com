#!/bin/bash

set -e

check_requirements() {
  if [[ -z "$(command -v npm)" ]]; then
    echo "Please install npm on your machine."
    exit 1
  fi
}

install_npm_package() {
  NPM_PACKAGE_NAME=$1;NPM_PACKAGE=$2
  if [[ -z "$(command -v $NPM_PACKAGE_NAME)" ]]; then
    npm install $NPM_PACKAGE --global
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

  install_npm_package pug pug-cli
  install_npm_package lhci @lhci/cli
  install_npm_package purifycss purify-css
  install_npm_package cypress cypress
  install_npm_package http-server http-server
  install_npm_package wait-on wait-on
}

main
