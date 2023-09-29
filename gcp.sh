#!/bin/bash
# You need GCloud Access to the dropbox to run this script

gcloud storage rsync --project=roll20-actual "$1" "$3" --delete-unmatched-destination-objects --cache-control='no-cache'
gcloud storage rsync --project=roll20-actual "$1" "$4" --delete-unmatched-destination-objects --cache-control='no-cache'
