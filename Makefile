export ZOLA_PACKAGE_VERSION := v0.16.0

install_zola:
	./scripts/install-zola.sh

install: install_zola

.PHONY: build
build: install
	./bin/zola build

edit: build
	./bin/zola serve --port 4000 --drafts

new_post:
	./scripts/new-post.sh "$(POST_TITLE)"

download_career_files:
	./scripts/download-career-files.sh "public"

artifact: build download_career_files

mp4_to_gif:
	./scripts/mp4-to-gif.sh "${VIDEO_INPUT}"
