install_dependencies:
	./scripts/install-dependencies.sh

build:
	npm run build

performance:
	./scripts/$@.sh

e2e:
	./scripts/$@.sh true

preview: build
	./scripts/$@.sh

test: install_dependencies build performance e2e
