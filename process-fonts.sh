#!/bin/zsh

setopt ERR_EXIT
setopt PIPE_FAIL
setopt NO_UNSET

if [[ -z "${DISCORD_ACTIVITY_CLIENT_ID}" ]]; then
    print "Error: DISCORD_ACTIVITY_CLIENT_ID environment variable is required" >&2
    exit 1
fi

# Process arguments
test_mode=0
no_prompt=0
output_file="fonts.css"

while [[ $# -gt 0 ]]; do
    case $1 in
        --test)
            test_mode=1
            shift
            ;;
        --no-prompt)
            no_prompt=1
            shift
            ;;
        *)
            output_file="$1"
            shift
            ;;
    esac
done

print "Starting directory search..." >&2

# Get directories
dirs=(*(/))
dirs=(${dirs:#contrib})    # Exclude contrib
dirs=(${dirs:#.git})       # Exclude .git
dirs=(${dirs:#node_modules}) # Exclude node_modules

if [[ ${#dirs} -eq 0 ]]; then
    print "No directories found!" >&2
    exit 1
fi

if [[ $test_mode -eq 1 ]]; then
    print "Test mode: processing first 5 directories" >&2
    dirs=(${dirs[1,5]})
fi

print "\nFound directories:" >&2
print -l "  ${dirs[@]}" >&2

# First collect all URLs
urls_file=$(mktemp)
trap "rm -f '$urls_file'" EXIT

extract_font_urls() {
    perl -ne '
        next if /^\s*\/\*/;  # Skip comment lines
        while (/url\(['"'"'"]?(https:\/\/fonts\.googleapis\.com[^'"'"'"\s\)]+)['"'"'"]?\)/g) {
            print "$1\n";
        }
    ' "$1"
}

# Process each directory to collect URLs
for dir in ${dirs[@]}; do
    print "Checking directory: $dir" >&2

    # Find CSS files directly in this directory
    css_files=($dir/*.css(.N))

    if [[ ${#css_files} -gt 0 ]]; then
        print "Found CSS files in $dir:" >&2
        print -l "    ${css_files[@]}" >&2

        for css_file in ${css_files[@]}; do
            print "Processing: $css_file" >&2

            found_urls=$(extract_font_urls "$css_file")

            if [[ -n "$found_urls" ]]; then
                print "Found font URLs in $css_file:" >&2
                print -l "      $found_urls" >&2
                print "$found_urls" >> "$urls_file"
            fi
        done
    else
        print "No CSS files found in $dir" >&2
    fi
done

# Get unique URLs and show summary
unique_urls=($(sort -u "$urls_file"))
total_urls=${#unique_urls}

if [[ $total_urls -eq 0 ]]; then
    print "No Google Font URLs found" >&2
    exit 1
fi

print "\nFound $total_urls unique Google Font URLs:" >&2
print -l "  ${unique_urls[@]}" >&2

if [[ $no_prompt -eq 0 ]]; then
    print "\nProceed with fetching and transforming these URLs? [y/N] " >&2
    read -q response || true
    print >&2

    if [[ "$response" != "y" ]]; then
        print "Operation cancelled" >&2
        exit 0
    fi
fi

# Create temporary files for the transformed CSS
raw_file=$(mktemp)
temp_file=$(mktemp)
trap "rm -f '$temp_file' '$urls_file' '$raw_file'" EXIT

# Process each unique URL
for font_url in $unique_urls; do
    response=$(curl -sS -w "\n%{http_code}" -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" \
         "$font_url")

    if [[ $? -eq 0 ]]; then
        http_code=$(print "$response" | tail -n1)
        content=$(print "$response" | sed '$d')

        if [[ "$http_code" = "200" ]]; then
            print "$content" >> "$raw_file"
            print >> "$raw_file" # Add newline between font definitions
        else
            print "Error: HTTP $http_code for $font_url" >&2
        fi
    else
        print "Error: Failed to fetch $font_url" >&2
    fi
done

# Deduplicate font declarations and transform URLs
if [[ -s "$raw_file" ]]; then
    # Extract unique @font-face blocks and transform URLs
    perl -0777 -ne '
        while (/(\@font-face\s*\{[^}]+\})/gs) {
            $block = $1;
            $seen{$block}++ or print "$block\n\n";
        }
    ' "$raw_file" | \
    sed "s/fonts\.gstatic\.com/${DISCORD_ACTIVITY_CLIENT_ID}.discordsays.com\/.proxy\/gstatic\/fonts/g" \
    > "$temp_file"

    if [[ -s "$temp_file" ]]; then
        mv "$temp_file" "$output_file"
        print "Generated $output_file" >&2
    else
        print "Error: No valid font definitions found after deduplication" >&2
        exit 1
    fi
else
    print "Error: No valid font definitions found" >&2
    exit 1
fi
