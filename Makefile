ENVIRONMENT := development

include .env.$(ENVIRONMENT)
export $(shell sed 's/=.*//' .env.$(ENVIRONMENT))

install_dependencies:
	./scripts/$@.sh

build:
	npm run build

performance:
	./scripts/$@.sh

e2e:
	./scripts/$@.sh $(PORT)

start: build download_career_files
	npx serve -l tcp://0.0.0.0:$(PORT) public/

test: build performance e2e

download_career_files:
	./scripts/download-career-files.sh

ship_it: install_dependencies test download_career_files
