export ZOLA_PACKAGE_VERSION := v0.19.2

install_zola:
	./script/install-zola.sh

install: install_zola
	npm install

build:
	npm run build

start:
	npm run start

performance:
	npm run lighthouse

test: performance

ship_it: test
	git push

watch:
	npm run watch

download_career_files:
	./script/download-career-files.sh "public"

artifact: build download_career_files

ensure_cloudflare_page_exists:
	chmod +x ./script/cloudflare/ensure-cloudflare-pages-exists.sh
	./script/cloudflare/ensure-cloudflare-pages-exists.sh "tjmaynes-site"

ensure_cloudflare_infra_exists: ensure_cloudflare_page_exists

deploy: install test artifact ensure_cloudflare_infra_exists
	chmod +x ./script/cloudflare/cloudflare-pages-deploy.sh
	./script/cloudflare/cloudflare-pages-deploy.sh "tjmaynes-site" "./public"

optimize_images:
	chmod +x ./script/optimize-images.sh
	./script/optimize-images.sh

clean:
	rm -rf public/

new_post:
	./script/new-post.sh "$(POST_TITLE)"

mp4_to_gif:
	./script/mp4-to-gif.sh "${VIDEO_INPUT}"
