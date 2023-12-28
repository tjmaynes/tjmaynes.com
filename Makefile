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

deploy: artifact
	chmod +x ./script/cloudflare-pages-deploy.sh
	./script/cloudflare-pages-deploy.sh "./public" "tjmaynes-site"

ship_it: test
	git push

optimize_images:
	chmod +x ./script/optimize-images.sh
	./script/optimize-images.sh

clean:
	rm -rf public/