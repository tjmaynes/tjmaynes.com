#!/bin/bash

set -e

check_requirements() {
  if [[ -z "$(command -v lhci)" ]]; then
    echo "Please install the Lighthouse-CI performance testing tool."
    exit 1
  fi
}

main() {
  check_requirements

  pushd ./test/performance
  lhci autorun
  popd
}

main
