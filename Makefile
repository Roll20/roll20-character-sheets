SHELL := /bin/bash

listing:
	fd . --exclude contrib --type d --max-depth 1 | sort

config:
	fd . --exclude contrib --type d --max-depth 1 --exec cp $(DEFAULT_RELEASE_SCRIPT) {} \; || true

clean:
	rm -rf **/*/dist

all:
	fd . --strip-cwd-prefix --exclude contrib --exclude "Zelda BOTW" --type d --max-depth 1 --exec bun run contrib/sheet-pixie/index.ts "{}/sheet.json" \;
