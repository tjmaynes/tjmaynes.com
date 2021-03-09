#!/bin/bash

set -e

main() {
  npx serve -l tcp://0.0.0.0:9000 public/
}

main