ARTIFACT_DIRECTORY = $(PWD)/build
PORT               = 8080

install_dependencies:
	./scripts/install-dependencies.sh

.PHONY: build
build: clean
	./scripts/build.sh \
		$(ARTIFACT_DIRECTORY)

preview: build
	./scripts/preview.sh \
		$(PORT) \
		$(ARTIFACT_DIRECTORY)

test: clean install_dependencies build
	./scripts/test.sh \
		$(PORT) \
		$(ARTIFACT_DIRECTORY)

test_with_details: build
	lhci collect --config config/lighthouse.js && lhci open

clean:
	rm -rf build/ temp/

teardown:
	./scripts/teardown.sh
