#!/bin/bash

set -e

ZOLA_PACKAGE_VERSION="v0.14.1"

function check_requirements() {
  if [[ -z "$(command -v curl)" ]]; then
    echo "Please install 'curl' on your machine"
    exit 1
  fi
}

function install_zola() {
  ZOLA_PACKAGE="zola-${ZOLA_PACKAGE_VERSION}-x86_64-unknown-linux-gnu"
  if [[ "$OSTYPE" = "darwin"* ]]; then
    ZOLA_PACKAGE="zola-${ZOLA_PACKAGE_VERSION}-x86_64-apple-darwin"
  fi

  [[ ! -f "${ZOLA_PACKAGE}.tar.gz" ]] && curl -fsSL "https://github.com/getzola/zola/releases/download/${ZOLA_PACKAGE_VERSION}/${ZOLA_PACKAGE}.tar.gz" > "${ZOLA_PACKAGE}.tar.gz"
  [[ ! -f "zola" ]] && tar -xf "${ZOLA_PACKAGE}.tar.gz" && chmod +x zola
  sudo cp -f zola /usr/local/bin
}

function main() {
  check_requirements

  if [[ -z "$(command -v zola)" ]]; then
    install_zola
  fi
}

main
