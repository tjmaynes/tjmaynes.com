#!/bin/bash

set -e

PORT=$1
ARTIFACT_DIRECTORY=$2
ENABLE_TEST_MODE=$3

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

run_http_server() {
  http-server \
    --port $PORT \
    $ARTIFACT_DIRECTORY
}

main() {
  check_requirements

  if [[ -z $ENABLE_TEST_MODE ]]; then
    run_http_server & wait-on http://localhost:$PORT
    open http://localhost:$PORT
  else
    run_http_server
  fi
}

main
