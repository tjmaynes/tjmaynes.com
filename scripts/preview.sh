#!/bin/bash

set -e

ENABLE_TEST_MODE=$1

serve_content() {
  npx serve -l 9000 public/
}

main() {
  if [[ -z "$ENABLE_TEST_MODE" ]]; then
    serve_content & npx wait-on http://localhost:9000
    open http://localhost:9000
  else
    serve_content
  fi
}

main
