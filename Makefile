install:
	npm install

lint:
	npm run lint

build:
	npm run build

dev: build
	npm run dev

download_career_files:
	./scripts/download-career-files.sh "public"

artifact: install build download_career_files
