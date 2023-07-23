# Building and Testing
<!-- TODO -->

# Style Guidelines
## Translation Keys
- Please try to keep the translation.json keys sorted to make it easy to find translations.
- Should be all lowercase with - for spaces conversion of the english text. Some advanced logic depends on this. Coder discretion for non translation keys like list orders.
- The assumption is that Title case is used by default.
- Use the following suffixes for these use cases:
  - **-u**: For all upper case
  - **-l**: For all lower case
  - **-abrv**: For shorthand abbreviations. Eg. `attribute-abrv` for `attr`
  - **-order**: For i18n list orders.
  - **-bugfix**: In at least one case the intended key resulted in unexpected results.  Add this to avoid any conflicts we find with Roll20 bugs.

# Advanced Patterns
## No Cascading Calculations
<!-- TODO -->
## Skill Selection by Id
<!-- TODO -->

# Standard Task HowTos
## Adding a new setting
- Add setting class to templates/sheet.css Under `Setting Display Toggles`
- Find any instance of sheet-setting-option class in the HTML and ensure the new setting is added where needed and/or a new option is added.

# Known Issues
- Inputs sit lower than selects at times for reasons I don't understand.  Putting them into a flexbox div seem to align things nicely.

