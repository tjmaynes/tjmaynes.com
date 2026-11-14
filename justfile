set shell := ["bash", "-eu", "-o", "pipefail", "-c"]

default: check

build:
    npm run build

dev:
    npm run dev

preview:
    npm run preview

test:
    npm test

check:
    npm run check
