# No built-in magic
MAKEFLAGS += --no-builtin-rules
.SUFFIXES:

# File Order Important for Concatenation
HTML = \
	dev/html/sheet/intro.html \
	dev/html/sheet/header.html \
	dev/html/sheet/section_allgemein.html \
	dev/html/sheet/section_grundwerte.html \
	dev/html/sheet/section_fertigkeiten.html \
	dev/html/sheet/section_inventar.html \
	dev/html/sheet/section_talente.html \
	dev/html/sheet/section_magie.html \
	dev/html/sheet/section_liturgien.html \
	dev/html/sheet/section_kampfwerte.html \
	dev/html/sheet/section_regeneration.html \
	dev/html/sheet/section_notizen.html \
	dev/html/sheet/section_config.html \
	dev/html/sheet/section_info.html \
	dev/html/sheet/footer.html \
	dev/html/sheet/outro.html \
	dev/html/roll\ templates/intro.html \
	dev/html/roll\ templates/crp.html \
	dev/html/roll\ templates/regeneration.html \
	dev/html/roll\ templates/legacy.html \
	dev/html/roll\ templates/tests.html \
	dev/html/roll\ templates/outro.html \
	$(JS)
JS = \
	dev/js/intro.js \
	dev/js/constants.js \
	dev/js/utilities_general.js \
	dev/js/utilities_dsa.js \
	dev/js/initialization_migration_common.js \
	dev/js/initialization.js \
	dev/js/migration.js \
	dev/js/base_values.js \
	dev/js/advantages_disadvantages.js \
	dev/js/talents.js \
	dev/js/magic.js \
	dev/js/liturgies.js \
	dev/js/melee.js \
	dev/js/ranged_combat_calculator.js \
	dev/js/ranged_combat_other.js \
	dev/js/armour_encumbrance_initiative.js \
	dev/js/wounds.js \
	dev/js/regeneration.js \
	dev/js/debug_mode.js \
	dev/js/roll_macro_generator.js \
	dev/js/other.js \
	dev/js/outro.js
CSS = \
	dev/css/style.css

all: dsa4_1_character_sheet_roll20.html dsa4_1_character_sheet_roll20.css

dsa4_1_character_sheet_roll20.html: $(HTML)
	cat $(HTML) > $@

dsa4_1_character_sheet_roll20.css: $(CSS)
	cat $(CSS) > $@

