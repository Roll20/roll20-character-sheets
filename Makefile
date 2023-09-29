# Change this value to whichever variant you're currently testing a certain sheet with
#DEFAULT_RELEASE_SCRIPT := FACES\ \(French\)
#DEFAULT_RELEASE_SCRIPT := 'D&D_4E/release-ci.sh'
DEFAULT_RELEASE_SCRIPT := '5eShaped'

listing:
	fd . --exclude contrib --type d --max-depth 1 | sort

config:
	fd . --exclude contrib --type d --max-depth 1 --exec cp $(DEFAULT_RELEASE_SCRIPT)/release-ci.sh {} \; || true
	fd . --exclude contrib --type d --max-depth 1 --exec cp $(DEFAULT_RELEASE_SCRIPT)/Makefile {} \; || true

