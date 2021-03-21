#!/bin/bash

set -e

PORT=$1

# Originally found here: https://stackoverflow.com/a/32592965
kill_process_on_port() {
  PORT=$1
  if [[ ! -z "$(lsof -t -i :$PORT)" ]]; then
    (kill -9 "$(lsof -t -i:$PORT -sTCP:LISTEN)" >/dev/null 2>&1) || true
  fi
}

main() {
  echo "Starting server on http://localhost:$PORT..."
  make start & npx wait-on "http://localhost:$PORT"

  CYPRESS_OPTS="--headless --config-file=false --config=baseUrl=http://localhost:$PORT,video=false"

  pushd ./tests/e2e
  npx cypress run $CYPRESS_OPTS || {
    kill_process_on_port $PORT
    exit 1
  }
  popd
}

main