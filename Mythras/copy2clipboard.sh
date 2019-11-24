#!/bin/bash

cat ./Mythras.html | xclip -selection clipboard
echo "Paste HTML"

# CSS
read -p "<Enter to copy CSS>"
cat ./Mythras.css | xclip -selection clipboard
echo "Paste CSS"

# Translations
read -p "<Enter to copy translations>"
cat ./translation.json | xclip -selection clipboard
echo "Paste translations"
