#!/bin/bash

set -e

OUTPUT_DIRECTORY=$1

check_requirements() {
  if [[ -z "$(command -v pug)" ]]; then
    echo "Please install the pug-cli tool."
    exit 1
  elif [[ -z "$(command -v purifycss)" ]]; then
    echo "Please install the purify-css tool."
    exit 1
  elif [[ -z $OUTPUT_DIRECTORY ]]; then
    echo "Please provide an output directory for the generated website"
    exit 1 
  fi
}

generate_html() {
  PAGES=(index 404)
  for page in "${PAGES[@]}"; do
    pug \
      --obj ../common/data.json \
      --basedir $(pwd)/templates \
      --path $(pwd)/templates/index.pug \
      --out $OUTPUT_DIRECTORY \
      templates/$page.pug
  done
}

generate_css() {
  mkdir -p $OUTPUT_DIRECTORY/public/stylesheets || true

  purifycss --min --info \
    --out $OUTPUT_DIRECTORY/public/stylesheets/bundle.min.css \
    static/stylesheets/{normalize,skeleton}.css $OUTPUT_DIRECTORY/index.html

  purifycss --min --info \
    --out $OUTPUT_DIRECTORY/public/stylesheets/main.min.css \
    static/stylesheets/main.css $OUTPUT_DIRECTORY/index.html
}

copy_static_files() {
  cp -rf static/fonts $OUTPUT_DIRECTORY/public/fonts
  cp -rf static/images $OUTPUT_DIRECTORY/public/images
  cp -f static/favicon.ico $OUTPUT_DIRECTORY
  cp -f static/CNAME $OUTPUT_DIRECTORY
}

main() {
  check_requirements

  pushd ./src
  generate_html
  generate_css
  copy_static_files
  popd
}

main
