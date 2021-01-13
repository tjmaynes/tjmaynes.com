#!/bin/bash

set -e

ENABLE_TEST_MODE=$1

check_requirements() {
  if [[ -z "$(command -v gatsby)" ]]; then
    echo "Please install 'gatsby' package on your machine."
    exit 1
  elif [[ -z "$(command -v wait-on)" ]]; then
    echo "Please install 'wait-on' package on your machine."
    exit 1
  fi
}

main() {
  check_requirements

  if [[ -z "$ENABLE_TEST_MODE" ]]; then
    npm run serve & wait-on http://localhost:9000
    open http://localhost:9000
  else
    npm run serve
  fi
}

main
