#!/usr/bin/env bash

set -e

CLOUDFLARE_PAGES_PROJECT_NAME=$1

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
  elif [[ -z "$CLOUDFLARE_PAGES_PROJECT_NAME" ]]; then
    echo "Arg 1 for script 'CLOUDFLARE_PAGES_PROJECT_NAME' was not given..."
    exit 1
  fi
}

function main() {
  check_requirements

  if ./node_modules/.bin/wrangler pages project list | grep -q "$CLOUDFLARE_PAGES_PROJECT_NAME"; then
    echo "Cloudflare pages project '$CLOUDFLARE_PAGES_PROJECT_NAME' exists..."
  else
    echo "Cloudflare pages project '$CLOUDFLARE_PAGES_PROJECT_NAME' does not exist..."
    ./node_modules/.bin/wrangler pages project create "$CLOUDFLARE_PAGES_PROJECT_NAME" --production-branch main
  fi
}

main
