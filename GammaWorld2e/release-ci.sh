#!/bin/sh
# You need GCloud Access to the dropbox to run this script

CURRENT_DIR=$(printf '%s\n' "${PWD##*/}")

gcloud storage rsync --project=roll20-actual ./ "gs://roll20-cdn/$CDN_SHEETS_FOLDER/$CURRENT_DIR" --recursive --delete-unmatched-destination-objects --cache-control='no-cache' --exclude=".*\.css$|.*\.html$|.*\.md$|.*\.sh$"

