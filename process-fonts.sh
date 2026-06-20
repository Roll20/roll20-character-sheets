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
output_dir="/tmp/discord-fonts"

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
        --output-dir)
            output_dir="$2"
            shift 2
            ;;
        *)
            shift
            ;;
    esac
done

# Clean/create output directory
if [[ -d "$output_dir" ]]; then
    rm -rf "$output_dir"
fi
mkdir -p "$output_dir"

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

# Extract URLs function
extract_font_urls() {
    perl -ne '
        next if /^\s*\/\*/;  # Skip comment lines
        while (/url\(['"'"'"]?(https:\/\/fonts\.googleapis\.com[^'"'"'"\s\)]+)['"'"'"]?\)/g) {
            print "$1\n";
        }
    ' "$1"
}

# Process each directory
for dir in ${dirs[@]}; do
    print "Checking directory: $dir" >&2
    mkdir -p "$output_dir/$dir"

    # Find CSS files directly in this directory
    css_files=($dir/*.css(.N))

    if [[ ${#css_files} -gt 0 ]]; then
        print "Found CSS files in $dir:" >&2
        print -l "    ${css_files[@]}" >&2

        # Collect URLs for this directory
        urls_file=$(mktemp)
        trap "rm -f '$urls_file'" EXIT

        for css_file in ${css_files[@]}; do
            print "Processing: $css_file" >&2

            found_urls=$(extract_font_urls "$css_file")

            if [[ -n "$found_urls" ]]; then
                print "Found font URLs in $css_file:" >&2
                print -l "      $found_urls" >&2
                print "$found_urls" >> "$urls_file"
            fi
        done

        # If we found URLs in this directory
        unique_urls=($(sort -u "$urls_file"))
        if [[ ${#unique_urls} -gt 0 ]]; then
            print "\nFound ${#unique_urls} unique font URLs in $dir" >&2

            if [[ $no_prompt -eq 0 ]]; then
                print "Proceed with fetching and transforming URLs for $dir? [y/N] " >&2
                read -q response || true
                print >&2

                if [[ "$response" != "y" ]]; then
                    print "Skipping $dir" >&2
                    touch "$output_dir/$dir/fonts.css"
                    continue
                fi
            fi

            raw_file=$(mktemp)
            trap "rm -f '$raw_file'" EXIT

            # Process URLs for this directory
            for font_url in $unique_urls; do
                response=$(curl -sS -w "\n%{http_code}" -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" \
                     "$font_url")

                if [[ $? -eq 0 ]]; then
                    http_code=$(print "$response" | tail -n1)
                    content=$(print "$response" | sed '$d')

                    if [[ "$http_code" = "200" ]]; then
                        print "$content" | \
                        sed "s/fonts\.gstatic\.com/${DISCORD_ACTIVITY_CLIENT_ID}.discordsays.com\/.proxy\/gstatic\/fonts/g" \
                        >> "$raw_file"
                        print >> "$raw_file"
                    else
                        print "Error: HTTP $http_code for $font_url" >&2
                    fi
                else
                    print "Error: Failed to fetch $font_url" >&2
                fi
            done

            if [[ -s "$raw_file" ]]; then
                mv "$raw_file" "$output_dir/$dir/fonts.css"
                print "Generated fonts.css for $dir" >&2
            else
                touch "$output_dir/$dir/fonts.css"
                print "Generated empty fonts.css for $dir (no valid content)" >&2
            fi
        else
            touch "$output_dir/$dir/fonts.css"
            print "Generated empty fonts.css for $dir (no URLs found)" >&2
        fi
    else
        touch "$output_dir/$dir/fonts.css"
        print "Generated empty fonts.css for $dir (no CSS files)" >&2
    fi
done