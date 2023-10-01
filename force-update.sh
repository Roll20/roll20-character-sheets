#!/bin/bash

gcloud storage rsync --project=roll20-actual $1 gs://roll20-cdn/$CDN_SHEETS_FOLDER --delete-unmatched-destination-objects --cache-control='no-cache' --recursive
