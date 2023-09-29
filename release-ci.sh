#!/bin/sh
# You need GCloud Access to the dropbox to run this script

CURRENT_DIR=$(printf '%s\n' "${PWD##*/}")

gcloud storage rsync --project=roll20-actual ./dist "gs://roll20-cdn/$CDN_SHEETS_FOLDER/$CURRENT_DIR/dist" --delete-unmatched-destination-objects --cache-control='no-cache'
gcloud storage rsync --project=roll20-actual ./translations "gs://roll20-cdn/$CDN_SHEETS_FOLDER/$CURRENT_DIR/translations" --delete-unmatched-destination-objects --cache-control='no-cache' || true

