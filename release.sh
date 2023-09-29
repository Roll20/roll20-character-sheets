#!/bin/bash
export CDN_SHEETS_FOLDER=custom-sheets-staging;

rm sync_sheets.sh
touch sync_sheets.sh
echo '#!/bin/bash' > sync_sheets.sh
chmod +x sync_sheets.sh
fd release-ci.sh --type f --strip-cwd-prefix -j1 --exec bash -c 'echo ./gcp.sh \"$(printf "%s" "{//}")\" \"$(printf "gs://roll20-cdn/$CDN_SHEETS_FOLDER/%s\n" "{//}")\" \"$(printf "%s" "{//}")/dist\" \"$(printf "%s" "{//}")/translations\"' | tee -a sync_sheets.sh

