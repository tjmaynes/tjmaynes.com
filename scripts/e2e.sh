#!/bin/bash

set -e

check_requirements() {
  if [[ -z "$(command -v cypress)" ]]; then
    echo "Please install the CypressJS e2e testing tool."
    exit 1
  fi
}

# Originally found here: https://stackoverflow.com/a/32592965
kill_process_on_port() {
  PORT=$1
  if [[ -z $PORT ]]; then
    echo "Please provide a PORT to kill process from."
  else
    kill -9 "$(lsof -t -i:$PORT)" || true
  fi
}

main() {
  check_requirements

  kill_process_on_port 9000

  ./scripts/preview.sh true & wait-on http://localhost:9000

  pushd ./test/e2e
  cypress run --headless
  popd

  kill_process_on_port 9000
}

main
