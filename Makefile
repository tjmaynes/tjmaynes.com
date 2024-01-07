install:
	npm install

lint:
	npm run lint

build: clean
	npm run build

dev:
	npm run dev

start: build
	npm start

performance:
	npm run lighthouse

test: build performance

download_career_files:
	chmod +x ./script/download-career-files.sh
	./script/download-career-files.sh "./public"

artifact: install build test download_career_files

ensure_cloudflare_page_exists:
	chmod +x ./script/cloudflare/ensure-cloudflare-pages-exists.sh
	./script/cloudflare/ensure-cloudflare-pages-exists.sh "tjmaynes-site"

ensure_cloudflare_infra_exists: ensure_cloudflare_page_exists

deploy: artifact ensure_cloudflare_infra_exists
	chmod +x ./script/cloudflare/cloudflare-pages-deploy.sh
	./script/cloudflare/cloudflare-pages-deploy.sh "tjmaynes-site" "./public"

ship_it: test
	git push

optimize_images:
	chmod +x ./script/optimize-images.sh
	./script/optimize-images.sh

clean:
	rm -rf public/