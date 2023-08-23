# PARANOIA 25th Anniversary Edition

Custom character sheet by [Guillaume Fortin-Debigar&eacute;](https://www.debigare.com/).

Refer to `sheet.json` for end-user instructions, and `LICENSE.md` for full licensing information.

The following assumes that the reader is already familiar with [building character sheets for Roll20](https://roll20.zendesk.com/hc/en-us/articles/360037773393-Building-Character-Sheets).

## Initial setup

1. Install [Node.js](https://nodejs.org/en/).
2. Run `npm ci` in the root directory of this project.

## Editing

This project uses [Nunjucks templating](https://mozilla.github.io/nunjucks/templating.html) to simplify editing of repetitive content. The HTML is generated from `html.njk`, while the CSS is generated from `css.njk`.

Default translation values should be directly added and edited in `html.njk`.

`sheet.json` is not automatically generated and must be edited manually.

## Building

Running `node index` will generate `paranoia25.html` and `paranoia25.css`. Alternatively, Windows users can also run `build.bat` for convenience.

You should then update `translation.json` with the new default translation values by performing the following:

1. Load `paranoia25.html` as a Roll20 character sheet.
2. Refresh the page.
3. Execute `i18nOutput` in the browser's console.
4. Copy the returned string without the beginning and ending quotes if applicable.
5. Remove backslashes from the escaped quotes if applicable.
6. Prettify the JSON object. (You may do so by pasting the translation data in a Roll20 non-sandbox custom game, saving it, and copying it back.)
7. Replace the contents of `translation.json` with the prettified output.
8. **IMPORTANT** - Make sure that the "fallback_for" entry appears in-between "roll" and "rating", as due to a bug in Roll20, `i18nOutput` doesn't extract that entry automatically as of this writing.

You should also update `paranoia25.png` with a new screenshot after loading the resulting `paranoia25.html`, `paranoia25.css` and `translation.json` in Roll20. As per Roll20's guidelines, the image should be 500x500 px. (For 1920x1080 screen resolutions, reducing the screenshot size by 59% before cropping it generates the best results.)

## Development notes

### Character sheet design

- This character sheet was designed for a potential future support for Internal Security and High Programmers characters.
- Due to a Roll20 limitation, specialty rolls always execute two 1d20 rolls instead of just one to support Roll20 attribute fallback. Only the relevant roll is displayed to users however.
- GM-exclusive information must not be added to this character sheet, as it enables cheating.

### Technical maintenance

- You might want to update Node.js packages to their latest version after validating that builds are successful locally.
- Builds must be commited in this Git repository for Roll20 integration.

## Macros documentation

### html.njk

- **i18n**: A `span` element whose name and default value will be exported to `translation.json` during the build process.
- **roll_classified**: A `button` element of type `roll` for PARANOIA Attribute tests. The embedded Modifiers roll query defaults to 0.
- **roll_red**: A `button` element of type `roll` for normal PARANOIA tests. The embedded Modifiers roll query defaults to 0. If the Roll20 attribute of the given name is blank, the fallback parameters are used instead.
- **field**: An arbitrary optional label that will be followed by ": " if present, followed by an `input` element of the given type for a Roll20 attribute of the given name. If a placeholder name and value are provided, they will be exported to `translation.json` during the build process, and will be used as the `placeholder` property of the `input` element. If the given type is `number`, its minimum value is set to 1 and its maximum value to 20.
- **input**: Same as the field macro, except that the label is wrapped in an i18n macro.
- **attribute**: A row containing a roll_classified macro, followed by an i18n macro label, followed by ": CLASSIFIED".
- **checkbox**: A row containing an input macro of type `checkbox`.
- **number**: A row containing a roll_red macro, followed by an labelled input macro of type `number`.
- **number_custom**: Same as the number macro, except that the label is a field macro of type `text` instead of normal text.
- **text**: A row containing an input macro with a label of type `text`.
- **textarea**: A row containing an i18n macro label, followed by a `textarea` element of the given CSS class for a Roll20 attribute of the given name.
- **repeating_number_custom**: Same as the number_custom macro, but wrapped around a `fieldset` element for a repeating Roll20 attribute of the given base name.

### css.njk

N/A
