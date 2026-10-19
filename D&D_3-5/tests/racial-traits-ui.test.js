const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const sheetDirectory = path.join(__dirname, '..');
const sheet = fs.readFileSync(path.join(sheetDirectory, 'charsheet_3-5.html'), 'utf8');
const styles = fs.readFileSync(path.join(sheetDirectory, 'charsheet_3-5.css'), 'utf8');
const sheetMetadata = JSON.parse(fs.readFileSync(path.join(sheetDirectory, 'sheet.json'), 'utf8'));
const translations = JSON.parse(fs.readFileSync(path.join(sheetDirectory, 'translation.json'), 'utf8'));

const legacyFields = [...sheet.matchAll(/name="attr_racialabilities"/g)];
assert.equal(legacyFields.length, 1, 'the legacy racial abilities field must remain available exactly once');

const modeToggle = sheet.match(/<input[^>]+class="racial-traits-mode-toggle"[^>]*>/);
assert.ok(modeToggle, 'the per-character structured racial traits toggle must exist');
assert.match(modeToggle[0], /name="attr_use_structured_racial_traits"/);
assert.match(modeToggle[0], /id="racial_traits_mode_toggle"/);
assert.doesNotMatch(
    modeToggle[0],
    /\schecked(?:\s|=|\/|>)/,
    'the HTML toggle must remain unchecked so existing characters keep the legacy UI'
);
assert.match(
    sheet,
    /<label for="racial_traits_mode_toggle"[^>]*data-i18n="use-structured-racial-traits"/,
    'the visible toggle text must label the checkbox'
);

const repeatingSection = sheet.match(/<fieldset class="repeating_racialtraits">([\s\S]*?)<\/fieldset>/);
assert.ok(repeatingSection, 'the structured racial traits repeating section must exist');
[
    'racialtrait_expanded',
    'racialtrait_name',
    'racialtrait_summary',
    'racialtrait_description',
    'racialtrait_notes'
].forEach(field => {
    assert.match(repeatingSection[1], new RegExp(`name="attr_${field}"`), `${field} must be stored on each racial trait row`);
});
const expandedToggle = repeatingSection[1].match(/<input[^>]+name="attr_racialtrait_expanded"[^>]*>/);
assert.ok(expandedToggle, 'each racial trait row must have an expand toggle');
assert.doesNotMatch(expandedToggle[0], /\schecked(?:\s|=|\/|>)/, 'new racial trait rows must start collapsed');

const chatButton = repeatingSection[1].match(/<button[^>]+class="racial-trait-roll"[^>]*>/);
assert.ok(chatButton, 'each racial trait title must be a chat roll button');
assert.match(chatButton[0], /type="roll"/);
assert.match(chatButton[0], /name="roll_racialtrait"/);
assert.match(chatButton[0], /&{template:DnD35StdRoll}/);
assert.match(chatButton[0], /{{abilityflag=true}}/);
assert.match(chatButton[0], /{{name=@{racialtrait_name}}}/);
assert.match(chatButton[0], /{{subtags=@{racialtrait_summary}}}/);
assert.match(chatButton[0], /{{traitdescription=@{racialtrait_description}}}/);
assert.match(chatButton[0], /{{traitnotes=@{racialtrait_notes}}}/);
assert.match(
    repeatingSection[1],
    /class="racial-trait-summary-display"[^>]+name="attr_racialtrait_summary"/,
    'the summary must remain visible in the compact row'
);
assert.match(
    styles,
    /\.racial-trait-summary-display\s*{[\s\S]*?grid-column:\s*2;[\s\S]*?grid-row:\s*2;[\s\S]*?overflow-wrap:\s*anywhere;[\s\S]*?white-space:\s*normal;/,
    'the compact summary must wrap on its own line beneath the title'
);

assert.match(
    sheet,
    /{{#traitdescription}}<tr class="sheet-racial-trait-section">[\s\S]*?{{traitdescription}}[\s\S]*?{{\/traitdescription}}/,
    'the D&D 3.5 standard roll template must render a full-width trait description'
);
assert.match(
    sheet,
    /{{#traitnotes}}<tr class="sheet-racial-trait-section sheet-racial-trait-notes">[\s\S]*?{{traitnotes}}[\s\S]*?{{\/traitnotes}}/,
    'the D&D 3.5 standard roll template must render a separate notes section'
);
assert.match(
    sheet,
    /{{#allprops\(\) notes traitdescription traitnotes /,
    'trait-only template properties must not be repeated as generic key/value rows'
);

assert.match(
    styles,
    /\.racial-traits-mode-toggle:not\(:checked\)\s*~\s*\.racial-traits-structured/,
    'unchecked toggles must hide the structured list'
);
assert.match(
    styles,
    /\.racial-traits-mode-toggle:checked\s*~\s*\.racial-traits-legacy/,
    'checked toggles must hide the legacy field'
);
assert.match(
    styles,
    /\.racial-trait-expanded:not\(:checked\)\s*~\s*\.racial-trait-details/,
    'collapsed rows must hide all editing fields'
);
assert.match(
    styles,
    /button\.racial-trait-roll\[type="roll"\]::before\s*{[\s\S]*?content:\s*"";/,
    'the compact title button must not show the default dice icon'
);
assert.match(
    styles,
    /\.racial-traits-structured\s+\.repcontrol_add::before\s*{[\s\S]*?content:\s*"\+ ";/,
    'the native repeating-section add control must display a plus sign'
);

const defaultOption = sheetMetadata.useroptions.find(option => option.attribute === 'use_structured_racial_traits');
assert.ok(defaultOption, 'sheet.json must define the new-character default');
assert.equal(defaultOption.type, 'checkbox');
assert.equal(defaultOption.value, '1');
assert.equal(defaultOption.checked, 'checked', 'new characters must use the structured UI by default');

[
    'use-structured-racial-traits',
    'use-structured-racial-traits-description',
    'racial-trait-name',
    'racial-trait-summary',
    'racial-trait-description'
].forEach(key => {
    assert.equal(typeof translations[key], 'string', `translation key ${key} must exist`);
    assert.notEqual(translations[key], '', `translation key ${key} must not be blank`);
});

console.log('D&D 3.5 structured racial traits UI tests passed.');
