install:
	npm install

lint:
	npm run lint

build:
	npm run build

dev:
	npm run dev

start: build
	npm start

performance:
	npm run lighthouse

test: performance

download_career_files:
	chmod +x ./script/download-career-files.sh
	./script/download-career-files.sh "public"

artifact: build test install download_career_files

optimize_images:
	chmod +x ./script/optimize-images.sh
	./script/optimize-images.sh