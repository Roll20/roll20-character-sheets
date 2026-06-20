# No built-in magic
MAKEFLAGS += --no-builtin-rules
.SUFFIXES:

# File Order Important for Concatenation
HTML = \
	dev/html/sheet/intro.html \
	dev/html/sheet/header.html \
	dev/html/sheet/sections/general.html \
	dev/html/sheet/sections/stats.html \
	dev/html/sheet/sections/advantages_disadvantages_special_skills.html \
	dev/html/sheet/sections/inventory/intro.html \
	dev/html/sheet/sections/inventory/header.html \
	dev/html/sheet/sections/inventory/main.html \
	dev/html/sheet/sections/inventory/purse.html \
	dev/html/sheet/sections/inventory/outro.html \
	dev/html/sheet/sections/talents/intro.html \
	dev/html/sheet/sections/talents/header.html \
	dev/html/sheet/sections/talents/combat_techniques.html \
	dev/html/sheet/sections/talents/physical.html \
	dev/html/sheet/sections/talents/social.html \
	dev/html/sheet/sections/talents/nature.html \
	dev/html/sheet/sections/talents/knowledge.html \
	dev/html/sheet/sections/talents/languages.html \
	dev/html/sheet/sections/talents/crafts.html \
	dev/html/sheet/sections/talents/gifts.html \
	dev/html/sheet/sections/talents/meta.html \
	dev/html/sheet/sections/talents/outro.html \
	dev/html/sheet/sections/magic/intro.html \
	dev/html/sheet/sections/magic/header.html \
	dev/html/sheet/sections/magic/aventuria/spells.html \
	dev/html/sheet/sections/magic/myranor/conjuration.html \
	dev/html/sheet/sections/magic/aventuria/rituals.html \
	dev/html/sheet/sections/magic/advantages_disadvantages_special_skills.html \
	dev/html/sheet/sections/magic/outro.html \
	dev/html/sheet/sections/liturgies.html \
	dev/html/sheet/sections/combat/intro.html \
	dev/html/sheet/sections/combat/header.html \
	dev/html/sheet/sections/combat/equipment.html \
	dev/html/sheet/sections/combat/hand_to_hand.html \
	dev/html/sheet/sections/combat/ranged.html \
	dev/html/sheet/sections/combat/special_skills.html \
	dev/html/sheet/sections/combat/outro.html \
	dev/html/sheet/sections/regeneration/intro.html \
	dev/html/sheet/sections/regeneration/header.html \
	dev/html/sheet/sections/regeneration/relax.html \
	dev/html/sheet/sections/regeneration/rest.html \
	dev/html/sheet/sections/regeneration/sleep.html \
	dev/html/sheet/sections/regeneration/astral_meditation.html \
	dev/html/sheet/sections/regeneration/karmic_meditation.html \
	dev/html/sheet/sections/regeneration/outro.html \
	dev/html/sheet/sections/notes/intro.html \
	dev/html/sheet/sections/notes/header.html \
	dev/html/sheet/sections/notes/main.html \
	dev/html/sheet/sections/notes/entities.html \
	dev/html/sheet/sections/notes/locations.html \
	dev/html/sheet/sections/notes/outro.html \
	dev/html/sheet/sections/config.html \
	dev/html/sheet/sections/info.html \
	dev/html/sheet/footer.html \
	dev/html/sheet/outro.html \
	dev/html/roll_templates/intro.html \
	dev/html/roll_templates/crp/intro.html \
	dev/html/roll_templates/crp/talents.html \
	dev/html/roll_templates/crp/spells.html \
	dev/html/roll_templates/crp/liturgies.html \
	dev/html/roll_templates/crp/hand_to_hand_combat.html \
	dev/html/roll_templates/crp/outro.html \
	dev/html/roll_templates/regeneration/intro.html \
	dev/html/roll_templates/regeneration/deepbreath.html \
	dev/html/roll_templates/regeneration/relax.html \
	dev/html/roll_templates/regeneration/rest.html \
	dev/html/roll_templates/regeneration/sleep.html \
	dev/html/roll_templates/regeneration/astralmeditation.html \
	dev/html/roll_templates/regeneration/karmicmeditation.html \
	dev/html/roll_templates/regeneration/outro.html \
	dev/html/roll_templates/legacy/intro.html \
	dev/html/roll_templates/legacy/talents.html \
	dev/html/roll_templates/legacy/spells.html \
	dev/html/roll_templates/legacy/liturgies.html \
	dev/html/roll_templates/legacy/stats.html \
	dev/html/roll_templates/legacy/hand_to_hand_combat.html \
	dev/html/roll_templates/legacy/ranged_combat.html \
	dev/html/roll_templates/legacy/combat_shared.html \
	dev/html/roll_templates/legacy/outro.html \
	dev/html/roll_templates/tests.html \
	dev/html/roll_templates/outro.html \
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
	dev/js/magic_myranor.js \
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

