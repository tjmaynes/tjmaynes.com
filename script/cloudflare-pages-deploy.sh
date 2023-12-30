#!/bin/bash

set -e

CLOUDFLARE_PAGES_PROJECT_NAME=$1
CLOUDFLARE_PAGES_DIRECTORY=$2

function check_requirements() {
  if [[ -z "$(command -v node)" ]]; then
    echo "Please install 'node' program before running this script"
    exit 1
  elif [[ -z "$CLOUDFLARE_ACCOUNT_ID" ]]; then
    echo "Please ensure environment variable 'CLOUDFLARE_ACCOUNT_ID' exists before running this script"
    exit 1
  elif [[ -z "$CLOUDFLARE_API_TOKEN" ]]; then
    echo "Please ensure environment variable 'CLOUDFLARE_API_TOKEN' exists before running this script"
    exit 1
  elif [[ -z "$CLOUDFLARE_PAGES_DIRECTORY" ]]; then
    echo "Arg 1 for script 'CLOUDFLARE_PAGES_DIRECTORY' was not given..."
    exit 1 
  elif [[ -z "$CLOUDFLARE_PAGES_PROJECT_NAME" ]]; then
    echo "Arg 2 for script 'CLOUDFLARE_PAGES_PROJECT_NAME' was not given..."
    exit 1 
  fi
}

function main() {
  check_requirements

  ./node_modules/.bin/wrangler pages deploy "$CLOUDFLARE_PAGES_DIRECTORY" --project-name "$CLOUDFLARE_PAGES_PROJECT_NAME"
}

main
