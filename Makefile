install:
	npm install

edit:
	npm run dev

.PHONY: build
build:
	npm run build

start: build
	npm run start

lint:
	npm run lint

lint_fix:
	npm run lint:fix

lighthouse:
	npx @lhci/cli autorun

test: lint build lighthouse

download_career_files:
	./scripts/download-career-files.sh "public"

artifact: test download_career_files build