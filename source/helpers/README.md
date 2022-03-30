# `source/helpers`

This folder contains all the generic helpers used to build the sheet.

Helpers are not meant to create specific elements in the sheet. Rather, they implement
systems and functionalities useful to build & run the sheet. Examples include:

- The `load_js` helper, that allows loading external `.js` into PUG during PUG compilation,
  so that all our other helpers are written in `.js` files, making development easier compared
  to source code being in PUG unbuffered code blocks
- The `data_persistance` helper, that implements transfering data from PUG compilation time into
  the sheet runtime (i.e. when sheetworkers execute).
- The `markdown` helper, that loads external markdown files into the sheet at PUG compilation time,
  so that the sheet's documentation and changelog are written in `.md` and also accessible in
  github, instead of hard-coded into the PUG and hard-to-find
- The `updater` helper, which implements an update system on top of k-scaffold, supporting multiple
  update function per version of the sheet
- The `alert` helper, which provides a system to define alerts to show on top of the sheet to notify
  important event to the players. This helpers register showing update alerts into the aforementioned
  `updater` helper, so that once k-scaffold has run an update function, the corresponding notification
  banner appears to notify the players.

## Folder organisation

As everywhere in this repo, `.js` javascript file should be named so that sheetworker code and PUG compilation
code, which run at _very_ different time, are clearly distinct:

- PUG compilation time javascript should end in `.pug.js`
- sheetworker code should end in `.sheetworker.js`

When a helper needs a single file (of any type), this file should be directly into this folder (see e.g. `load_js.pug`).
If a helper needs multiple files (e.g. pug, and both javascript kind), create a sub-folder and keep all the files for the
helper together.

To add sheetworker to the sheet, a helper:

- define a mixin named `sheetworker_helpers_<helper_name>` that performs the required `include`
- call that mixin in the `sheetworker_helpers` mixin defined in `helpers.pug`

Similarly, the mixin `setup_helpers_<helper_name>` is used to run PUG code before the sheet code (e.g. set the
sheet version), and the mixin `post_sheetworker_helpers_<helper_name>` is used to execute code after all the
sheetworker includes (e.g. to write a JS line to call the sheet implementation that register into k-scaffold the
bridging functions between our update system and k-scaffold's system).
See the `updater` helper for a helper using all of those.
