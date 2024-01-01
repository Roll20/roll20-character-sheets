# No built-in magic
MAKEFLAGS += --no-builtin-rules
.SUFFIXES:

# File Order Important for Concatenation
HTML = \
	dev/html/sheet_intro.html \
	dev/html/sheet.html \
	dev/html/sheet_outro.html \
	dev/html/roll_templates_intro.html \
	dev/html/roll_templates.html \
	dev/html/roll_templates_outro.html \
	$(JS)
JS = \
	dev/js/intro.js \
	dev/js/sheetworker.js \
	dev/js/outro.js
CSS = \
	dev/css/style.css

all: dsa4_1_character_sheet_roll20.html dsa4_1_character_sheet_roll20.css

dsa4_1_character_sheet_roll20.html: $(HTML)
	cat $(HTML) > $@

dsa4_1_character_sheet_roll20.css: $(CSS)
	cat $(CSS) > $@

