install:
	./scripts/install.sh

.PHONY: build
build:
	zola build

edit: build
	zola serve --port 4000 --drafts

new_post:
	./scripts/new-post.sh "$(POST_TITLE)"

download_career_files:
	./scripts/download-career-files.sh "public"

build_for_deployment: install build download_career_files

mp4_to_gif:
	./scripts/mp4-to-gif.sh "${VIDEO_INPUT}"
