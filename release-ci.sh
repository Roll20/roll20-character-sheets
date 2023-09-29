#!/bin/sh
# You need GCloud Access to the dropbox to run this script

CURRENT_DIR=$(printf '%s\n' "${PWD##*/}")

gcloud storage rsync --project=roll20-actual ./ "gs://roll20-cdn/$CDN_SHEETS_FOLDER/$CURRENT_DIR" --delete-unmatched-destination-objects --cache-control='no-cache' --exclude=".*\.css$|.*\.html$|.*\.md$|.*\.sh$|TODO$" --no-clobber
gcloud storage rsync --project=roll20-actual ./dist "gs://roll20-cdn/$CDN_SHEETS_FOLDER/$CURRENT_DIR/dist" --delete-unmatched-destination-objects --cache-control='no-cache' --no-clobber
gcloud storage rsync --project=roll20-actual ./translations "gs://roll20-cdn/$CDN_SHEETS_FOLDER/$CURRENT_DIR/translations" --delete-unmatched-destination-objects --cache-control='no-cache' --no-clobber || true

