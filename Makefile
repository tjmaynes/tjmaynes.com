install_dependencies:
	./scripts/install-dependencies.sh

build: clean
	npm run build

preview:
	./scripts/preview.sh

test: build e2e performance

e2e:
	./scripts/e2e.sh true

performance:
	./scripts/performance.sh

clean:
	rm -rf public/ temp/
