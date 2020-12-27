#!/bin/bash

set -e

check_requirements() {
  if [[ -z "$(command -v npm)" ]]; then
    echo "Please install npm on your machine."
    exit 1
  fi
}

uninstall_npm_package() {
  NPM_PACKAGE_NAME=$1;NPM_PACKAGE=$2
  if [[ -z "$(command -v $NPM_PACKAGE_NAME)" ]]; then
    npm uninstall $NPM_PACKAGE --global
  fi
}

main() {
  check_requirements

  uninstall_npm_package pug pug-cli
  uninstall_npm_package lhci @lhci/cli
  uninstall_npm_package purifycss purify-css 
  uninstall_npm_package cypress cypress
  uninstall_npm_package http-server http-server
  uninstall_npm_package wait-on wait-on
}

main
