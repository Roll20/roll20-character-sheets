SHELL := /bin/bash

listing:
	fd . --exclude contrib --type d --max-depth 1 | sort

config:
	fd . --exclude contrib --type d --max-depth 1 --exec cp $(DEFAULT_RELEASE_SCRIPT) {} \; || true

clean:
	rm -rf **/dist

all:
	find * -mindepth 1 -maxdepth 1 -not -path 'Zelda BOTW/sheet.json' -type f -name "sheet.json" -print0 | parallel -0 bun run contrib/sheet-pixie/index.ts {}
