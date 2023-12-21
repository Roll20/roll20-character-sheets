# `source/` folder

This folder contains the PUG, SCSS and javascript sources to build the sheet with
k-Scaffold.

## Layout

- `legacy/`
  old sheet building code (raw HTML with a python layer) as well as
  the last build of the sheet with this legacy build. The last build has been
  reformatted and splitted so that it may be re-used in the new buid system for
  elements that have not yet be entirely re-coded (i.e. almost everything).
- `helpers/`
  various helpers for building the sheet (PUG mixins, javascript code, etc...) that
  are not specific to Ars Magica 5th. Those could reasonably be pasted in another
  sheet and re-used with minimal tweaks.
- `header/`
  Sources for the header bar at the top of the sheet
- `updates/`
  Sources for the update function and code, that keep the sheet up-to-date when an old
  character is opened with a newer sheet.
- `shared/`
  Some shared components that needs to be accessed from multiple files

The following folders are currently _not_ used in the sheet building and contains experimental
code, WIP improvements and re-work of the sheet.

- `elements/`
  Basic elements to build the sheet from.
- `mixins/`
  More complex building blocks in the form of PUG mixins.
- `nested_fieldset/`
  An attempt at nesting repeating section. Highly experimental and absolutely non-functional.
