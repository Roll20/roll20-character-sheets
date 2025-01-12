#!/usr/bin/env python3

# Write Changes Back From Generated Files
# With the dev split 2024 new people contributed for the first time.
# Unfortunately, some of them were unaware of the consequences of applying
# their changes to the sheet files directly. In order to fix their commits, the
# concatenation must be executed in reverse ("decatenation"?). Since every file
# contains a unique header and a matching unique footer this should work without
# major issues.
#
# Running the Script
# Always run in the top directory of the sheet. The script will look for the
# respective signatures for the single files, save the line numbers and then cut
# the full files. THIS OVERWRITES THE EXISTING SOURCE FILES!
#
# Disclaimer
# This script is far from being "hardened" and should only be used when really
# sure to understand what the script is supposed to do.

import re

# Setup
generated = [
	'dsa4_1_character_sheet_roll20.html',
	'dsa4_1_character_sheet_roll20.css'
]

filesHTML = [
 	'dev/html/sheet/intro.html',
 	'dev/html/sheet/header.html',
 	'dev/html/sheet/section_allgemein.html',
 	'dev/html/sheet/section_grundwerte.html',
 	'dev/html/sheet/section_fertigkeiten.html',
 	'dev/html/sheet/section_inventar.html',
 	'dev/html/sheet/section_talente.html',
 	'dev/html/sheet/section_magie.html',
 	'dev/html/sheet/section_liturgien.html',
 	'dev/html/sheet/section_kampfwerte.html',
 	'dev/html/sheet/section_regeneration.html',
 	'dev/html/sheet/section_notizen.html',
 	'dev/html/sheet/section_config.html',
 	'dev/html/sheet/section_info.html',
 	'dev/html/sheet/footer.html',
 	'dev/html/sheet/outro.html',
 	'dev/html/roll templates/intro.html',
 	'dev/html/roll templates/crp.html',
 	'dev/html/roll templates/regeneration.html',
 	'dev/html/roll templates/legacy.html',
 	'dev/html/roll templates/tests.html',
 	'dev/html/roll templates/outro.html',
 	'dev/js/intro.js',
 	'dev/js/constants.js',
 	'dev/js/utilities_general.js',
 	'dev/js/utilities_dsa.js',
 	'dev/js/initialization_migration_common.js',
 	'dev/js/initialization.js',
 	'dev/js/migration.js',
 	'dev/js/base_values.js',
 	'dev/js/advantages_disadvantages.js',
 	'dev/js/talents.js',
 	'dev/js/magic.js',
 	'dev/js/magic_myranor.js',
 	'dev/js/liturgies.js',
 	'dev/js/melee.js',
 	'dev/js/ranged_combat_calculator.js',
 	'dev/js/ranged_combat_other.js',
 	'dev/js/armour_encumbrance_initiative.js',
 	'dev/js/wounds.js',
 	'dev/js/regeneration.js',
 	'dev/js/debug_mode.js',
 	'dev/js/roll_macro_generator.js',
 	'dev/js/other.js',
 	'dev/js/outro.js'
]

filesCSS = [
 	'dev/css/style.css'
]

fileSignaturesHTML = {
 	'dev/html/sheet/intro.html': [ '<!-- sheet intro start -->', '<!-- sheet intro end -->' ],
 	'dev/html/sheet/header.html': [ '<!-- sheet header start -->', '<!-- sheet header end -->' ],
 	'dev/html/sheet/section_allgemein.html': [ '<!-- sheet section allgemein start -->', '<!-- sheet section allgemein end -->' ],
 	'dev/html/sheet/section_grundwerte.html': [ '<!-- sheet section grundwerte start -->', '<!-- sheet section grundwerte end -->' ],
 	'dev/html/sheet/section_fertigkeiten.html': [ '<!-- sheet section fertigkeiten start -->', '<!-- sheet section fertigkeiten end -->' ],
 	'dev/html/sheet/section_inventar.html': [ '<!-- sheet section inventar start -->', '<!-- sheet section inventar end -->' ],
 	'dev/html/sheet/section_talente.html': [ '<!-- sheet section talente start -->', '<!-- sheet section talente end -->' ],
 	'dev/html/sheet/section_magie.html': [ '<!-- sheet section magie start -->', '<!-- sheet section magie end -->' ],
 	'dev/html/sheet/section_liturgien.html': [ '<!-- sheet section liturgien start -->', '<!-- sheet section liturgien end -->' ],
 	'dev/html/sheet/section_kampfwerte.html': [ '<!-- sheet section kampfwerte start -->', '<!-- sheet section kampfwerte end -->' ],
 	'dev/html/sheet/section_regeneration.html': [ '<!-- sheet section regeneration start -->', '<!-- sheet section regeneration end -->' ],
 	'dev/html/sheet/section_notizen.html': [ '<!-- sheet section notizen start -->', '<!-- sheet section notizen end -->' ],
 	'dev/html/sheet/section_config.html': [ '<!-- sheet section config start -->', '<!-- sheet section config end -->' ],
 	'dev/html/sheet/section_info.html': [ '<!-- sheet section info start -->', '<!-- sheet section info end -->' ],
 	'dev/html/sheet/footer.html': [ '<!-- sheet footer start -->', '<!-- sheet footer end -->' ],
 	'dev/html/sheet/outro.html': [ '<!-- sheet outro start -->', '<!-- sheet outro end -->' ],
 	'dev/html/roll templates/intro.html': [ '<!-- roll templates intro start -->', '<!-- roll templates intro end -->' ],
 	'dev/html/roll templates/crp.html': [ '<!-- crp roll templates start -->', '<!-- crp roll templates end -->' ],
 	'dev/html/roll templates/regeneration.html': [ '<!-- regeneration roll templates start -->', '<!-- regeneration roll templates end -->' ],
 	'dev/html/roll templates/legacy.html': [ '<!-- legacy roll templates start -->', '<!-- legacy roll templates end -->' ],
 	'dev/html/roll templates/tests.html': [ '<!-- test roll templates start -->', '<!-- test roll templates end -->' ],
 	'dev/html/roll templates/outro.html': [ '<!-- roll templates outro start -->', '<!-- roll templates outro end -->' ],
 	'dev/js/intro.js': [ '<!-- js intro start -->', '/* js intro end */' ],
 	'dev/js/constants.js': [ '/* constants begin */', '/* constants end */' ],
 	'dev/js/utilities_general.js': [ '/* utilities general begin */', '/* utilities general end */' ],
 	'dev/js/utilities_dsa.js': [ '/* utilities dsa begin */', '/* utilities dsa end */' ],
 	'dev/js/initialization_migration_common.js': [ '/* initialization migration common begin */', '/* initialization migration common end */' ],
 	'dev/js/initialization.js': [ '/* initialization begin */', '/* initialization end */' ],
 	'dev/js/migration.js': [ '/* migration begin */', '/* migration end */' ],
 	'dev/js/base_values.js': [ '/* base values begin */', '/* base values end */' ],
 	'dev/js/advantages_disadvantages.js': [ '/* advantages disadvantages begin */', '/* advantages disadvantages end */' ],
 	'dev/js/talents.js': [ '/* talents begin */', '/* talents end */' ],
 	'dev/js/magic.js': [ '/* magic begin */', '/* magic end */' ],
 	'dev/js/magic_myranor.js': [ '/* magic_myranor begin */', '/* magic_myranor end */' ],
 	'dev/js/liturgies.js': [ '/* liturgies begin */', '/* liturgies end */' ],
 	'dev/js/melee.js': [ '/* melee begin */', '/* melee end */' ],
 	'dev/js/ranged_combat_calculator.js': [ '/* ranged combat calculator begin */', '/* ranged combat calculator end */' ],
 	'dev/js/ranged_combat_other.js': [ '/* ranged combat other begin */', '/* ranged combat other end */' ],
 	'dev/js/armour_encumbrance_initiative.js': [ '/* armour encumbrance initiative begin */', '/* armour encumbrance initiative end */' ],
 	'dev/js/wounds.js': [ '/* wounds begin */', '/* wounds end */' ],
 	'dev/js/regeneration.js': [ '/* regeneration begin */', '/* regeneration end */' ],
 	'dev/js/debug_mode.js': [ '/* debug mode begin */', '/* debug mode end */' ],
 	'dev/js/roll_macro_generator.js': [ '/* roll macro generator begin */', '/* roll macro generator end */' ],
 	'dev/js/other.js': [ '/* other begin */', '/* other end */' ],
 	'dev/js/outro.js': [ '/* js outro start */', '<!-- js outro end -->' ]
}
fileSignaturesCSS = {
 	'dev/css/style.css': [ '/* start CSS */', '/* end CSS */' ]
}

# Finding Lines
with open("dsa4_1_character_sheet_roll20.html", mode = "r", encoding = "utf8") as html:
	htmlLines = html.readlines()

linesHTML = {}
for file in filesHTML:
	linesHTML[file] = []

for file in filesHTML:
	for entry in fileSignaturesHTML[file]:
		try:
			linesHTML[file].append(htmlLines.index(entry + '\n'))
		except:
			print(entry, 'could not be found')

with open("dsa4_1_character_sheet_roll20.css", mode = "r", encoding = "utf8") as css:
	cssLines = css.readlines()

linesCSS= {}
for file in filesCSS:
	linesCSS[file] = []

for file in filesCSS:
	for entry in fileSignaturesCSS[file]:
		try:
			linesCSS[file].append(cssLines.index(entry + '\n'))
		except:
			print(entry, 'could not be found')

# Writing files
for file in filesHTML:
	with open(file, mode = "w") as outfile:
		rangeStart = linesHTML[file][0]
		rangeEnd = linesHTML[file][1]+1
		print("file:", file, "rangeStart:", rangeStart, "rangeEnd:", rangeEnd)
		outfile.writelines(htmlLines[rangeStart:rangeEnd])
		outfile.close()

for file in filesCSS:
	with open(file, mode = "w") as outfile:
		rangeStart = linesCSS[file][0]
		rangeEnd = linesCSS[file][1]+1
		print("file:", file, "rangeStart:", rangeStart, "rangeEnd:", rangeEnd)
		outfile.writelines(cssLines[rangeStart:rangeEnd])
		outfile.close()






















