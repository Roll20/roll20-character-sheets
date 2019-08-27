#!/bin/bash

# Validate Javascript
echo "### Javascript validation:"
acorn --silent templates/scripts/base.js

# CSS Validation
echo ""
echo "### CSS validation:"
css-validator ./Mythras.css 2>&1 | grep -v "unknown vendor exten"

# Translation Validation
echo ""
echo "### Translation JSON Validation:"
cat ./translation.json | json_verify

# Validate sheet.json
echo ""
echo "### sheet.json validation:"
cat ./sheet.json | json_verify

# HTML
read -p "<Enter to compile and copy HTML>"
./render_templates.py
cat ./Mythras.html | xclip -selection clipboard

# CSS
read -p "<Enter to copy CSS>"
cat ./Mythras.css | xclip -selection clipboard

# Translations
read -p "<Enter to copy translations>"
cat ./translation.json | xclip -selection clipboard

echo ""
echo "Done"
