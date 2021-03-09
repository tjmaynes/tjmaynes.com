#!/bin/bash

set -e

main() {
  pushd ./tests/performance
  npx lhci autorun
  popd
}

main
