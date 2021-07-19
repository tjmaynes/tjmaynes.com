install:
	bundle config set path 'vendor/bundle'
	bundle config build.sassc --disable-lto
	bundle install

build:
	bundle exec jekyll build

edit:
	bundle exec jekyll serve --watch --drafts

preview:
	bundle exec jekyll serve

new_post:
	./scripts/new-post.sh "$(POST_TITLE)"

download_career_files:
	./scripts/download-career-files.sh "_site"

build_for_deployment: install build download_career_files
