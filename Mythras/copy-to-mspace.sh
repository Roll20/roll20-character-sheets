#!/bin/bash
# The M-Space sheet uses the same code base as Mythras.  This script exist to help the author copy changes over to M-Space when the Mythras sheet is updated.

# Copy relevant code
cp ./Changelog.md ../M-Space/Changelog.md
cp ./README.md ../M-Space/README.md
cp ./Mythras.html ../M-Space/M-Space.html
cp ./Mythras.css ../M-Space/M-Space.css
cp ./translation.json ../M-Space/translation.json
#cp -r ./translations ../M-Space/

# Flip the sheet variant toggle
sed -i 's/name="attr_sheet_varient" value="mythras" checked/name="attr_sheet_varient" value="mythras"/' ../M-Space/M-Space.html
sed -i 's/name="attr_sheet_varient" value="m-space"/name="attr_sheet_varient" value="m-space" checked/' ../M-Space/M-Space.html
