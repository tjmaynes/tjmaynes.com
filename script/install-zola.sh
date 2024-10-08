#!/usr/bin/env bash

set -e

function check_requirements() {
  if [[ -z "$(command -v curl)" ]]; then
    echo "Please install 'curl' on your machine"
    exit 1
  elif [[ -z "$ZOLA_PACKAGE_VERSION" ]]; then
    echo "Please set an environment variable for 'ZOLA_PACKAGE_VERSION' before running this script"
    exit 1
  fi
}

function download_zola_binary() {
  ZOLA_PACKAGE=$1

  if [[ -z "$ZOLA_PACKAGE" ]]; then
    echo "download_zola_binary(missing-arg): Please pass an argument for zola-package"
    exit 1
  fi

  echo "Installing zola package: '$ZOLA_PACKAGE'..."

  curl -fsSL "https://github.com/getzola/zola/releases/download/${ZOLA_PACKAGE_VERSION}/${ZOLA_PACKAGE}.tar.gz" > "${ZOLA_PACKAGE}.tar.gz"

  tar -xf "${ZOLA_PACKAGE}.tar.gz"

  mv zola "$ZOLA_PACKAGE"

  chmod +x "$ZOLA_PACKAGE"

  rm -rf "${ZOLA_PACKAGE}.tar.gz"
}

function setup_zola_symlink() {
  [[ -f "zola" ]] && rm -rf zola

  if [[ "$OSTYPE" = "darwin"* ]]; then
    ln -s "zola-${ZOLA_PACKAGE_VERSION}-x86_64-apple-darwin" zola
  else
    ln -s "zola-${ZOLA_PACKAGE_VERSION}-x86_64-unknown-linux-gnu" zola
  fi
}

function main() {
  check_requirements

  mkdir -p bin || true

  pushd bin
    ZOLA_PACKAGES=(
      "zola-${ZOLA_PACKAGE_VERSION}-x86_64-unknown-linux-gnu"
      "zola-${ZOLA_PACKAGE_VERSION}-x86_64-apple-darwin"
    )
    for zola_package in "${ZOLA_PACKAGES[@]}"; do
      [[ ! -f "$zola_package" ]] && download_zola_binary "$zola_package"
    done

    setup_zola_symlink
  popd
}

main
