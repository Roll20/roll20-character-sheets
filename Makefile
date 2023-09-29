# Change this value to whichever variant you're currently testing a certain sheet with
#DEFAULT_RELEASE_SCRIPT := FACES\ \(French\)/release-ci.sh
#DEFAULT_RELEASE_SCRIPT := 'D&D_4E/release-ci.sh'
DEFAULT_RELEASE_SCRIPT := '5eShaped/release-ci.sh'

listing:
	fd . --exclude contrib --type d --max-depth 1 | sort

config:
	fd . --exclude contrib --type d --max-depth 1 --exec cp $(DEFAULT_RELEASE_SCRIPT) {} \; || true
