#!/usr/bin/bash
set -x
find ./ -maxdepth 2 -name "*.html" | while read fname; do
  sed -i -e '$a\\n' "$fname"
  #echo "$fname"
done
