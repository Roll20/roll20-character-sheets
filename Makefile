SOURCE=source
BUILD=build

.PHONY: all

all: Ars_Magica_5th.html Ars_Magica_5th.css local

# Make the top-level files by copying from BUILD
Ars_Magica_5th.html Ars_Magica_5th.css: %: $(BUILD)/%
	cp $< $@

# Build HTML and CSS by calling the appropriate scripts
$(BUILD)/%.html: $(SOURCE)/%.pug $(SOURCE)/k-scaffold/_kpug.pug
	node scripts/compile-pug.js "$$(realpath "$<")" "$$(realpath "$@")"

$(BUILD)/%.css: $(SOURCE)/%.scss $(SOURCE)/k-scaffold/_k.scss
	node scripts/compile-scss.js "$$(realpath "$<")" "$$(realpath "$@")"

# Declare that the root pug and SCSS depends on all other files, to recompile
# on update
# We do this because Makefile doesn't see the "include" of PUG
$(BUILD)/Ars_Magica_5th.html: $(shell find $(SOURCE) -type f -name '*.pug') $(shell find $(SOURCE) -type f -name '*.js')

$(BUILD)/Ars_Magica_5th.css: $(shell find $(SOURCE) -type f -name '*.scss')


# Rule to download k-scaffold where needed
# Specify intermediates so that k-scaffold is not deleted each time

.INTERMEDIATE: %/k-scaffold/_kpug.pug %/k-scaffold/_k.scss

%/k-scaffold/_kpug.pug %/k-scaffold/_k.scss:
	bash ./scripts/get_kscaffold.sh "$*/k-scaffold"

# To quickly compile all local small tests found in .local: rule that
# requires all the .pug and .css that can be made
local: $(patsubst %.pug,%.html,$(wildcard local/*.pug)) $(patsubst %.scss,%.css,$(wildcard local/*.scss))

# Those more generic rules are a bit more difficult
# They compile any .pug file, and require the presence of the k-scaffold directory
# next to those files. This means we need to use the automatic variable
# $(@D), which is the directory of the target, as part of the pre-requisites
# This require using secondary extensions
.SECONDEXPANSION:

%.html: %.pug $$(@D)/k-scaffold/_kpug.pug
	node scripts/compile-pug.js "$$(realpath "$<")" "$$(realpath "$@")"

%.css: %.scss $$(@D)/k-scaffold/_k.scss
	node scripts/compile-scss.js "$$(realpath "$<")" "$$(realpath "$@")"