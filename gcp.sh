#!/bin/bash
# You need GCloud Access to the dropbox to run this script

gcloud storage rsync --project=roll20-actual "$1/dist" "$3" --delete-unmatched-destination-objects --cache-control='no-cache' --no-clobber
gcloud storage rsync --project=roll20-actual "$1/translations" "$4" --delete-unmatched-destination-objects --cache-control='no-cache' --no-clobber || true
