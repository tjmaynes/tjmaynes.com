#!/bin/bash

set -e

PORT=$1
ARTIFACT_DIRECTORY=$2

check_requirements() {
  if [[ -z "$(command -v http-server)" ]]; then
    echo "Please install http-server package on your machine."
    exit 1
  elif [[ -z $PORT ]]; then
    echo "Please provide a port to serve content on."
    exit 1
  elif [[ -z $ARTIFACT_DIRECTORY ]]; then
    echo "Please provide a directory to serve content from."
    exit 1
  fi
}

main() {
  check_requirements

  http-server \
    --port $PORT \
    $ARTIFACT_DIRECTORY
}

main
