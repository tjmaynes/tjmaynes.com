#!/bin/bash

set -e

POST_TITLE=$1
POST_DATE=$(date '+%Y-%m-%d %H:%M:%S')

function check_requirements() {
  if [[ -z "$POST_TITLE" ]]; then
    echo "Please provide a title for the new blog-post (1st arg)."
    exit 1
  fi
}

function main() {
  check_requirements

  FILE_POST_DATE=$(date '+%Y-%m-%d')
  FILE_POST_TITLE="$(echo "$POST_TITLE" | tr '[:upper:]' '[:lower:]')"
  FILE_POST_TITLE="${FILE_POST_TITLE// /-}"
  FILE_POST_TITLE="${FILE_POST_TITLE//:/}"

  POST="${FILE_POST_DATE}-${FILE_POST_TITLE}"

  NEW_POST_IMAGE_DIRECTORY="public/images/posts/$POST"
  [[ ! -d "$NEW_POST_IMAGE_DIRECTORY" ]] && mkdir -p "$NEW_POST_IMAGE_DIRECTORY"

  NEW_POST="_drafts/$POST.md"

  (mkdir -p _drafts || true) && [[ ! -f "$NEW_POST" ]] && tee -a $NEW_POST > /dev/null <<EOT
---
layout: post
title: "${POST_TITLE}"
author: tjmaynes
date: ${POST_DATE}
image: /${NEW_POST_IMAGE_DIRECTORY}/background.jpg
published: true 
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
EOT

  echo "Finished creating new post: $NEW_POST."
}

main
