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
## List of the files normally generated through running "make"
generated = [
	'dsa4_1_character_sheet_roll20.html',
	'dsa4_1_character_sheet_roll20.css'
]

## List of the files that make up the sheet's HTML file (order important)
filesHTML = [
	'dev/html/sheet/intro.html',
	'dev/html/sheet/header.html',
	'dev/html/sheet/sections/general.html',
	'dev/html/sheet/sections/stats.html',
	'dev/html/sheet/sections/advantages_disadvantages_special_skills.html',
	'dev/html/sheet/sections/inventory/intro.html',
	'dev/html/sheet/sections/inventory/header.html',
	'dev/html/sheet/sections/inventory/main.html',
	'dev/html/sheet/sections/inventory/purse.html',
	'dev/html/sheet/sections/inventory/outro.html',
	'dev/html/sheet/sections/talents/intro.html',
	'dev/html/sheet/sections/talents/header.html',
	'dev/html/sheet/sections/talents/combat_techniques.html',
	'dev/html/sheet/sections/talents/physical.html',
	'dev/html/sheet/sections/talents/social.html',
	'dev/html/sheet/sections/talents/nature.html',
	'dev/html/sheet/sections/talents/knowledge.html',
	'dev/html/sheet/sections/talents/languages.html',
	'dev/html/sheet/sections/talents/crafts.html',
	'dev/html/sheet/sections/talents/gifts.html',
	'dev/html/sheet/sections/talents/meta.html',
	'dev/html/sheet/sections/talents/outro.html',
	'dev/html/sheet/sections/magic/intro.html',
	'dev/html/sheet/sections/magic/header.html',
	'dev/html/sheet/sections/magic/aventuria/spells.html',
	'dev/html/sheet/sections/magic/myranor/conjuration.html',
	'dev/html/sheet/sections/magic/aventuria/rituals.html',
	'dev/html/sheet/sections/magic/advantages_disadvantages_special_skills.html',
	'dev/html/sheet/sections/magic/outro.html',
	'dev/html/sheet/sections/liturgies.html',
	'dev/html/sheet/sections/combat/intro.html',
	'dev/html/sheet/sections/combat/header.html',
	'dev/html/sheet/sections/combat/equipment.html',
	'dev/html/sheet/sections/combat/hand_to_hand.html',
	'dev/html/sheet/sections/combat/ranged.html',
	'dev/html/sheet/sections/combat/special_skills.html',
	'dev/html/sheet/sections/combat/outro.html',
	'dev/html/sheet/sections/regeneration/intro.html',
	'dev/html/sheet/sections/regeneration/header.html',
	'dev/html/sheet/sections/regeneration/relax.html',
	'dev/html/sheet/sections/regeneration/rest.html',
	'dev/html/sheet/sections/regeneration/sleep.html',
	'dev/html/sheet/sections/regeneration/astral_meditation.html',
	'dev/html/sheet/sections/regeneration/karmic_meditation.html',
	'dev/html/sheet/sections/regeneration/outro.html',
	'dev/html/sheet/sections/notes/intro.html',
	'dev/html/sheet/sections/notes/header.html',
	'dev/html/sheet/sections/notes/main.html',
	'dev/html/sheet/sections/notes/entities.html',
	'dev/html/sheet/sections/notes/locations.html',
	'dev/html/sheet/sections/notes/outro.html',
	'dev/html/sheet/sections/config.html',
	'dev/html/sheet/sections/info.html',
	'dev/html/sheet/footer.html',
	'dev/html/sheet/outro.html',
	'dev/html/roll_templates/intro.html',
	'dev/html/roll_templates/crp/intro.html',
	'dev/html/roll_templates/crp/talents.html',
	'dev/html/roll_templates/crp/spells.html',
	'dev/html/roll_templates/crp/liturgies.html',
	'dev/html/roll_templates/crp/hand_to_hand_combat.html',
	'dev/html/roll_templates/crp/outro.html',
	'dev/html/roll_templates/regeneration/intro.html',
	'dev/html/roll_templates/regeneration/deepbreath.html',
	'dev/html/roll_templates/regeneration/relax.html',
	'dev/html/roll_templates/regeneration/rest.html',
	'dev/html/roll_templates/regeneration/sleep.html',
	'dev/html/roll_templates/regeneration/astralmeditation.html',
	'dev/html/roll_templates/regeneration/karmicmeditation.html',
	'dev/html/roll_templates/regeneration/outro.html',
	'dev/html/roll_templates/legacy/intro.html',
	'dev/html/roll_templates/legacy/talents.html',
	'dev/html/roll_templates/legacy/spells.html',
	'dev/html/roll_templates/legacy/liturgies.html',
	'dev/html/roll_templates/legacy/stats.html',
	'dev/html/roll_templates/legacy/hand_to_hand_combat.html',
	'dev/html/roll_templates/legacy/ranged_combat.html',
	'dev/html/roll_templates/legacy/combat_shared.html',
	'dev/html/roll_templates/legacy/outro.html',
	'dev/html/roll_templates/tests.html',
	'dev/html/roll_templates/outro.html',
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

## List of the files that make up the sheet's CSS file (order important)
filesCSS = [
	'dev/css/style.css'
]

fileSignaturesCSS = {
	'dev/css/style.css': [ '/* start CSS */', '/* end CSS */' ]
}

# Generate HTML File Signatures
## Takes the list of HTML files (= files making up the sheet HTML file, so JS is covered by this as well),
## analyses the general directory structure,
## analyses the specific directory structure and filename,
## builds the general file signature and
## builds the file signature pair by appending "start" or "end"

# Initialize set for carrying file signature pairs
fileSignaturesHTML = {}

# Iteration over all files
for file in filesHTML:
	# General directory structure analysis: prefix, type, rest
	prefixPattern = re.compile(r"^(?P<prefix>dev/(html|js))")
	prefixMatches = re.search(prefixPattern, file)
	prefix = prefixMatches.group('prefix')

	match prefix:
		case 'dev/html':
			# 'HTML' refers to files under dev/html
			HTMLPattern = re.compile(r"^dev/html/(?P<type>sheet|roll_templates)/((?P<level1>[^/]+)/)?((?P<level2>[^/]+)/)?((?P<level3>[^/]+)/)?(?P<name>[^/]+)\.html$")
			HTMLMatches = re.search(HTMLPattern, file)
			if HTMLMatches:
				snippetType = HTMLMatches.group('type')
				restLevels = [ 'level1', 'level2', 'level3' ]
				# Specific directory structure analysis: levels 1 to 3, filename including extension ("file"), filename excluding extension ("name")
				# Initialize empty variables
				signatures = []
				levels = []
				levelString = ''

				# Assign signature parts
				## Name
				name = HTMLMatches.group('name')

				## Levels
				for matchLevel in restLevels:
					if HTMLMatches.groupdict()[matchLevel]:
						level = HTMLMatches.group(matchLevel)
						# Singular sections only exist in singular form
						if matchLevel == 'level1' and level == 'sections':
							level = 'section'
						levels.append(level)
				levelString = ' '.join(levels)

				# Build signature pair
				match len(levels):
					case 0:
						signature = '<!-- {type} {name} {{}} -->'.format(type = snippetType, name = name)
					case 1 | 2 | 3:
						signature = '<!-- {type} {levels} {name} {{}} -->'.format(type = snippetType, name = name, levels = levelString)
					case _:
						print('len(levels) has suspicious value: {}'.format(maxLevel))
				signatures.append(signature.format('start'))
				signatures.append(signature.format('end'))
				print(signatures)

				# Assign signature pair
				fileSignaturesHTML[file] = signatures
		case 'dev/js':
			# 'JS' refers to files under dev/js
			JSPattern = re.compile(r"^dev/js/(?P<name>[^/]+)\.js$")
			JSMatches = re.search(JSPattern, file)
			if JSMatches:
				# Initialize empty variables
				signatures = []

				# Assign signature parts
				## Name
				name = JSMatches.group('name')

				# Build signature pair
				signature = '/* {name} {{}} */'.format(name = name)
				signatures.append(signature.format('start'))
				signatures.append(signature.format('end'))

				# Handle special cases (intro and outro)
				if file == 'dev/js/intro.js' or file == 'dev/js/outro.js':
					mixedLimiters = {
						'dev/js/intro.js': [ '<!-- js intro start -->', '/* js intro end */' ],
						'dev/js/outro.js': [ '/* js outro start */', '<!-- js outro end -->' ]
					}
					signatures = mixedLimiters[file]

				# Assign signature pair
				fileSignaturesHTML[file] = signatures
		case _:
			print('Prefix unknown: {}'.format(prefix))

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
