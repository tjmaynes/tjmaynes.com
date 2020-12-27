#!/bin/bash

set -e

PORT=$1
ARTIFACT_DIRECTORY=$2

check_requirements() {
  if [[ -z "$(command -v lhci)" ]]; then
    echo "Please install the Lighthouse-CI performance testing tool."
    exit 1
  elif [[ -z "$(command -v cypress)" ]]; then
    echo "Please install the CypressJS e2e testing tool."
    exit 1
  elif [[ -z $PORT ]]; then
    echo "Please provide a port to run the http-server from."
    exit 1
  elif [[ -z $ARTIFACT_DIRECTORY ]]; then
    echo "Please provide a directory to serve content from."
    exit 1
  fi
}

# Originally found here: https://stackoverflow.com/a/32592965
kill_process_on_port() {
  PORT=$1
  if [[ -z $PORT ]]; then
    echo "Please provide a PORT to kill process from."
  else
    kill -9 $(lsof -t -i:$PORT)
  fi
}

run_performance_tests() {
  lhci \
    --config config/lighthouse.js \
    autorun
}

run_e2e_tests() {
  ./scripts/preview.sh $PORT $ARTIFACT_DIRECTORY & wait-on http://localhost:$PORT

  cypress run \
    --config-file config/cypress.json \
    --headless

  kill_process_on_port $PORT
}

main() {
  check_requirements

  run_performance_tests
  run_e2e_tests
}

main
