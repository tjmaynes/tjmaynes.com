#!/bin/bash

set -e

main() {
  pushd ./test/performance
  npx lhci autorun
  popd
}

main
