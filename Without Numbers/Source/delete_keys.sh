#!/bin/bash
# Delete unused JSON keys
# sh ./delete_keys.sh ../Without_Number.html ../translation.json 
# Check if both HTML and JSON files are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <html_file> <json_file>"
    exit 1
fi

html_file="$1"
json_file="$2"

# Check if provided files exist
if [ ! -f "$html_file" ]; then
    echo "HTML file not found: $html_file"
    exit 1
fi

if [ ! -f "$json_file" ]; then
    echo "JSON file not found: $json_file"
    exit 1
fi

# Parse JSON and extract keys
json_keys=$(grep -o '"[A-Z_]\+"' "$json_file" | tr -d '"')

# Loop through each key and search for it in HTML file
for key in $json_keys; do
    # Search for the key in the HTML file
    grep -q "$key" "$html_file"

    # If key not found in HTML, remove it from JSON
    if [ $? -ne 0 ]; then
        echo "Key '$key' not found in HTML, removing from JSON"
        sed -i "/$key/d" "$json_file"
    fi
done

echo "Done"

