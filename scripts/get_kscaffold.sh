#!/bin/bash
set -e

# the directory of the script
here="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -z "$1" ]; then
    printf "usage: get_kscaffold.sh k-scaffold-directory\n" ;
    exit 0
fi

# Clean target dir if it already exists
if [ -d "$1" ]; then
    rm -rf "$1"
fi

# Get a temporary directoty do download to
tempdir=$(basename $(mktemp -d -p "${here}"))

# check if tmp dir was created
if [ ! "${tempdir}" ] || [ ! -d "${here}/${tempdir}" ] ; then
    printf "Could not create temp dir, aborting...\n"
    exit 1
fi

# deletes the temp directory when script is finished
function cleanup {
    if [ ! -z "${here}/${tempdir}" ]; then
        printf "Deleting temp working directory ${here}/${tempdir}\n"
        rm -rf "${here}/${tempdir}"
        printf "Deleted temp working directory ${here}/${tempdir}\n"
    fi
}
trap cleanup EXIT

# Clone k-scaffold (at a specific version) to our temp direcotory
git clone https://github.com/Kurohyou/Roll20-Snippets.git "${here}/${tempdir}"
# Checkout to our commit
previous="$(pwd)" \
&& cd "${here}/${tempdir}" \
&& git config advice.detachedHead false \
&& git checkout 21efd24ee35eb24e4eaf0597924f5855516ac7a7 \
&& cd "${previous}"

printf "$(pwd)\n"

# Copy to target directory
cp -r "${here}/${tempdir}/K_Scaffold/Template v2/scaffold" "$1"
