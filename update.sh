#!/bin/bash

rm -rf sync_sheets.sh
touch sync_sheets.sh
echo '#!/bin/bash' > sync_sheets.sh
echo 'set -e' >> sync_sheets.sh
chmod +x sync_sheets.sh
CWD=$(pwd)
cd $1;
fd dist --type d --strip-cwd-prefix -j1 --exec bash -c 'echo ./gcp.sh \"$(pwd)/$(printf "%s" "{//}")\" \"$(printf "gs://roll20-cdn/$CDN_SHEETS_FOLDER/%s\n" "{//}")\" \"$(printf "gs://roll20-cdn/$CDN_SHEETS_FOLDER/%s" "{//}")/dist\" \"$(printf "gs://roll20-cdn/$CDN_SHEETS_FOLDER/%s" "{//}")/translations\"' | tee -a $CWD/sync_sheets.sh
