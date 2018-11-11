#!/bin/bash

# Validate Javascript
echo "Javascript validation:"
acorn --silent templates/scripts/base.js

# Compile files
./render_templates.py

# HTML
read -p "<Enter to copy HTML>"
cat ./Mythras2.html | xclip -selection clipboard

# CSS
echo ""
echo "CSS validation:"
css-validator ./Mythras.css 2>&1 | grep -v "unknown vendor exten"
read -p "<Enter to copy CSS>"
cat ./Mythras.css | xclip -selection clipboard

# Translations
echo ""
echo "Translation JSON Validation:"
cat ./translation.json | json_verify
read -p "<Enter to copy translations>"
cat ./translation.json | xclip -selection clipboard

# Copy to M-Space if all has been successful
./copy-to-mspace.sh
echo ""
echo "Copied to M-Space"

echo ""
echo "Done"
