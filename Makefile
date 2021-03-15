install_dependencies:
	./scripts/$@.sh

build:
	npm run build

performance:
	./scripts/$@.sh

e2e:
	./scripts/$@.sh true

preview: build download_career_files
	./scripts/$@.sh

test: build performance e2e

download_career_files:
	./scripts/download-career-files.sh

ship_it: install_dependencies test download_career_files
