#!/bin/bash

# Set directories and files
YAML_DIR="dev/spruchlisten"
HTML_DIR="dev/html"
JS_DIR="dev/js"
CSS_DIR="dev/css"
CSS_FILE="${CSS_DIR}/00_main.sass"
YAML_HML_TEMPLATE_HEADER="${YAML_DIR}/template_header.html"
YAML_HML_TEMPLATE_MAIN="${YAML_DIR}/template_main.html"
YAML_HML_TEMPLATE_FOOTER="${YAML_DIR}/template_footer.html"
OUTPUT_HTML="aborea.html"
OUTPUT_CSS="aborea.css"
JSON_FILE="sheet.json"

# Get all HTML, JS and YAML files
HTML_FILES=$(find "${HTML_DIR}" -name '[0-9]*.html')
JS_FILES=$(find "${JS_DIR}" -name '[0-9]*')
YAML_FILES=$(find "${YAML_DIR}" -name '[0-9]*.yaml')

# Help function
help() {
  echo "Usage: ./generate.sh [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  -h, --help           Show this help message and exit"
  echo "  --spruchlisten       Generate Spruchlisten HTML files"
  echo "  --html               Generate aborea.html by combining HTML and JS files"
  echo "  --css                Generate aborea.css by compiling Sass"
  echo "  --version            Update JSON version if HTML or CSS files changed"
  echo "  --clean              Clean generated files (HTML and CSS)"
  echo ""
  echo "Description:"
  echo "This script is used to generate HTML and CSS files for a Roll20 character sheet"
  echo "from YAML spell lists. It can also combine HTML and JS files into a final output,"
  echo "compile Sass to CSS, and update the version in the JSON file if changes are detected."
  echo ""
  echo "If no option is provided, the entire character sheet (Spruchlisten, HTML, CSS, and JSON version) will be generated."
  echo ""
  echo "Examples:"
  echo "  ./generate.sh --spruchlisten  Generate Spruchlisten HTML files"
  echo "  ./generate.sh --html          Generate the final aborea.html"
  echo "  ./generate.sh --css           Compile and minify the CSS"
  echo "  ./generate.sh --version       Update the JSON version if HTML or CSS changed"
  echo "  ./generate.sh --clean         Clean the generated HTML and CSS files"
  echo "  ./generate.sh                 Generate the entire character sheet"
}

# Function to escape special characters for sed
escape_specialcharacters() {
    echo "$1" | sed 's/ß/ss/g; s/ä/ae/g; s/ö/oe/g; s/ü/ue/g; s/Ä/Ae/g; s/Ö/Oe/g; s/Ü/Ue/g; s/[^a-zA-Z0-9]/-/g'
};

# Function to escape special characters for sed
extract_and_escape() {
    yq_result=$(yq -r "${1}" "${yaml}")
    echo "${yq_result}" | sed 's/[\/&|{}]/\\&/g'
};

# Generate Spruchlisten HTML files
generate_spruchlisten() {
    echo "Generate Spruchlisten HTML files"
    total_spruchlisten=$(echo "${YAML_FILES}" | wc -w)
    current=0
        
    # Print progress bar
    echo -ne "Progress: ["
    for ((j = 0; j < progress / 2; j++)); do echo -n "#"; done
    for ((j = progress / 2; j < 50; j++)); do echo -n "."; done
    echo "] ${progress}% ($current/$total_spruchlisten)"

    for yaml in ${YAML_FILES}; do
        current=$((current + 1))
        progress=$((current * 100 / total_spruchlisten))
        
        # Processing each YAML file
        filename=$(basename "$yaml" .yaml)
        magiekategorie=$(escape_specialcharacters "${filename#[0-9]*_}")
        output_file="${HTML_DIR}/${filename}.html"
        
        sed "s/{{magiekategorie}}/$magiekategorie/g" "${YAML_HML_TEMPLATE_HEADER}" > "${output_file}"
        
        spruch_count=$(yq '.sprueche | length' "${yaml}")
        
        for i in $(seq 0 $((spruch_count - 1))); do
            name=$(extract_and_escape ".sprueche[${i}].name")
            name_sanitized=$(escape_specialcharacters "${name}")
            rang=$(extract_and_escape ".sprueche[${i}].rang")
            beschreibung=$(extract_and_escape ".sprueche[${i}].beschreibung")
            anwendung=$(extract_and_escape ".sprueche[${i}].anwendung")
            beschraenkungen=$(extract_and_escape ".sprueche[${i}].beschraenkungen")
            effekt1=$(extract_and_escape ".sprueche[${i}].effekt1")
            effekt2=$(extract_and_escape ".sprueche[${i}].effekt2")
            effekt3=$(extract_and_escape ".sprueche[${i}].effekt3")
            effekt4=$(extract_and_escape ".sprueche[${i}].effekt4")
            effekt5=$(extract_and_escape ".sprueche[${i}].effekt5")
            
            sed "s/{{name}}/${name}/g; \
                s/{{name_sanitized}}/${name_sanitized}/g; \
                s/{{rang}}/${rang}/g; \
                s/{{beschreibung}}/${beschreibung}/g; \
                s/{{anwendung}}/${anwendung}/g; \
                s/{{beschraenkungen}}/${beschraenkungen}/g; \
                s/{{effekt1}}/${effekt1}/g; \
                s/{{effekt2}}/${effekt2}/g; \
                s/{{effekt3}}/${effekt3}/g; \
                s/{{effekt4}}/${effekt4}/g; \
                s/{{effekt5}}/${effekt5}/g;" \
                "${YAML_HML_TEMPLATE_MAIN}" >> "${output_file}"
        done
        
        cat "$YAML_HML_TEMPLATE_FOOTER" >> "${output_file}"
        
        # Print progress bar
        echo -ne "Progress: ["
        for ((j = 0; j < progress / 2; j++)); do echo -n "#"; done
        for ((j = progress / 2; j < 50; j++)); do echo -n "."; done
        echo "] ${progress}% (${current}/${total_spruchlisten})"
    done
}

# Generate aborea.html
generate_html() {
    echo "Generate aborea.html"
    echo "${HTML_FILES}" | sort | xargs cat > "${OUTPUT_HTML}"
    echo "${JS_FILES}" | sort | xargs cat >> "${OUTPUT_HTML}"
}

# Generate aborea.css
generate_css() {
    echo "Generate aborea.css"
    sass --no-source-map --style=compressed "${CSS_FILE}" "${OUTPUT_CSS}"
}

# Update version in sheet.json
update_version() {
    echo "Update version in sheet.json"
    timestamp=$(date +%s)
    sed -i "s/\"version\": \".*\"/\"version\": \"${timestamp}\"/" "${JSON_FILE}"
}

# Clean function
clean() {
  echo "Cleaning generated files..."
  rm -f "${OUTPUT_HTML}" "${OUTPUT_CSS}"
}

main() {
    generate_spruchlisten
    generate_html
    generate_css
    update_version
    exit 0
}


while [[ $# -gt 0 ]]; do
  case ${1} in
  -h | --help)
    help
    exit 0
    ;;
  --spruchlisten)
    generate_spruchlisten
    exit 0
    ;;
  --html)
    generate_html
    exit 0
    ;;
  --css)
    generate_css
    exit 0
    ;;
  --version)
    update_version
    exit 0
    ;;
  --clean)
    clean
    exit 0
    ;;
  *)
    printf_colored "${RED}" "Unknown option: ${1}"
    exit 1
    ;;
  esac
  shift
done

main
