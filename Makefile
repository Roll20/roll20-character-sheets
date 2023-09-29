SHELL := /bin/bash

# Change this value to whichever variant you're currently testing a certain sheet with
DEFAULT_RELEASE_SCRIPT := release-ci.sh
CDN_SHEETS_FOLDER := custom-sheets-staging

listing:
	fd . --exclude contrib --type d --max-depth 1 | sort

config:
	fd . --exclude contrib --type d --max-depth 1 --exec cp $(DEFAULT_RELEASE_SCRIPT) {} \; || true

clean:
	rm -rf **/*/dist

all:
	fd . --exclude contrib --exclude "Zelda BOTW" --type d --max-depth 1 --exec bun run contrib/sheet-pixie/index.ts "{}/sheet.json" \;
