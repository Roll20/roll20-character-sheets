const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const sheetDirectory = path.join(__dirname, '..');
const sheet = fs.readFileSync(path.join(sheetDirectory, 'charsheet_3-5.html'), 'utf8');
const styles = fs.readFileSync(path.join(sheetDirectory, 'charsheet_3-5.css'), 'utf8');
const translations = JSON.parse(fs.readFileSync(path.join(sheetDirectory, 'translation.json'), 'utf8'));

const expectedTabs = [
    ['1', 'tab1', 'Stats'],
    ['2', 'tab2', 'Weapons'],
    ['3', 'tab3', 'AC'],
    ['4', 'tab4', 'Equipment'],
    ['5', 'tab5', 'Skills'],
    ['6', 'tab6', 'Spells'],
    ['7', 'tab7', 'Notes'],
    ['9', 'tab9', 'Summons'],
    ['10', 'tab10', 'Action'],
    ['8', 'tab8', 'Configuration'],
    ['99', 'tab99', 'All']
];

expectedTabs.forEach(([value, tabClass, title]) => {
    const input = sheet.match(new RegExp(`<input[^>]+name="attr_tab"[^>]+class="tab ${tabClass}"[^>]+value="${value}"[^>]*>`));
    assert.ok(input, `${title} must retain its attr_tab radio button and value`);
    assert.match(input[0], new RegExp(`title="${title}"`), `${title} must have an accurate tooltip`);
    assert.match(
        sheet,
        new RegExp(`<span class="tab ${tabClass}"[^>]*>`),
        `${title} must retain its visual tab label`
    );
});

const tabNavigationStart = sheet.indexOf('<input type="radio" name="attr_tab" class="tab tab1"');
const tabNavigationEnd = sheet.indexOf('<div class="tab-content tab1 tab99">', tabNavigationStart);
assert.notEqual(tabNavigationStart, -1, 'the main tab row must exist');
assert.notEqual(tabNavigationEnd, -1, 'the first main tab content section must exist');
const tabNavigation = sheet.slice(tabNavigationStart, tabNavigationEnd);
const tabOrder = [...tabNavigation.matchAll(/name="attr_tab" class="tab (tab\d+)"/g)].map(match => match[1]);
assert.deepEqual(
    tabOrder,
    ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6', 'tab7', 'tab9', 'tab10', 'tab8', 'tab99'],
    'Configuration must appear after Action in the main tab row'
);
assert.equal(
    [...tabNavigation.matchAll(/<\/span><!--\s*--><input/g)].length,
    expectedTabs.length - 1,
    'HTML whitespace between adjacent tabs must be suppressed so the tabs touch'
);
assert.match(
    tabNavigation,
    /class="tab tab8"[^>]+title="Configuration"[^>]*><span class="tab tab8" data-i18n="configuration">Configuration<\/span>/,
    'the former Misc tab must be named Configuration'
);

[
    ['show_spells_tab', 'spells', 'show-spells-tab'],
    ['show_summons_tab', 'summons', 'show-summons-tab'],
    ['show_all_tab', 'all', 'show-all-tab']
].forEach(([attribute, tabName, translationKey]) => {
    const controller = sheet.match(new RegExp(`<input[^>]+class="main-tab-visibility tab-visibility-${tabName}"[^>]+name="attr_${attribute}"[^>]+value="1"[^>]*>`));
    assert.ok(controller, `${tabName} tab visibility must have an enabled-by-default CSS controller`);

    const checkbox = sheet.match(new RegExp(`<input[^>]+type="checkbox"[^>]+class="tab-visibility-checkbox"[^>]+name="attr_${attribute}"[^>]*>`));
    assert.ok(checkbox, `Configuration must include a checkbox for the ${tabName} tab`);
    assert.match(checkbox[0], /\schecked(?:\s|=|\/|>)/, `${tabName} must be visible by default`);
    assert.match(sheet, new RegExp(`data-i18n="${translationKey}"`));
});

assert.equal(translations.configuration, 'Configuration');
assert.equal(translations['visible-tabs'], 'Visible tabs');
assert.equal(translations['show-spells-tab'], 'Show Spells tab');
assert.equal(translations['show-summons-tab'], 'Show Summons tab');
assert.equal(translations['show-all-tab'], 'Show All tab');

assert.match(
    styles,
    /\.content-sheet span\.tab\s*{[\s\S]*?background:\s*#c7c7c7;[\s\S]*?border:\s*1px solid #666;[\s\S]*?text-transform:\s*uppercase;/,
    'inactive tabs must use the connected PF1-inspired tab styling'
);
assert.match(
    styles,
    /\.content-sheet input\.tab\s*{[\s\S]*?width:\s*74px;/,
    'tabs must be wide enough for Equipment when selected text becomes bold'
);
assert.match(
    styles,
    /\.content-sheet span\.tab\s*{[\s\S]*?width:\s*74px;[\s\S]*?margin:\s*0 -1px -1px -74px;/,
    'adjacent tab borders must overlap by one pixel'
);
assert.match(
    styles,
    /\.content-sheet input\.tab8,[\s\S]*?\.content-sheet span\.tab8\s*{\s*width:\s*98px;/,
    'the Configuration tab must be wide enough for its full label'
);
assert.match(
    styles,
    /input\.tab-visibility-spells\[value="0"\][\s\S]*?~ div\.tab6,[\s\S]*?input\.tab-visibility-summons\[value="0"\][\s\S]*?~ div\.tab9\s*{\s*display:\s*none;/,
    'disabled optional tabs and their All-view content must be hidden'
);
assert.match(
    styles,
    /input\.tab-visibility-all\[value="0"\] ~ input\.tab99,[\s\S]*?input\.tab-visibility-all\[value="0"\] ~ span\.tab99\s*{\s*display:\s*none;/,
    'the All tab button must be hidden when disabled'
);
assert.doesNotMatch(
    styles,
    /tab-visibility-all\[value="0"\][^,{]*~ div\.tab99/,
    'hiding the All tab must not hide every content section carrying the tab99 class'
);
assert.match(
    sheet,
    /on\("change:show_all_tab", eventInfo => \{[\s\S]*?eventInfo\.newValue !== "1"[\s\S]*?setAttrs\(\{tab: "8"\}\);[\s\S]*?\}\);/,
    'disabling the active All tab must return the user to Configuration'
);
assert.match(
    styles,
    /\.content-sheet input\.tab99:checked \+ span\.tab99\s*{[\s\S]*?background:\s*#fff;[\s\S]*?border-bottom-color:\s*#fff;[\s\S]*?font-weight:\s*bold;/,
    'the selected tab must visually join the white sheet content'
);
assert.match(
    styles,
    /\.content-sheet input\.tab::before\s*{\s*content:\s*none;/,
    'the old gradient pseudo-tabs must stay disabled'
);
assert.match(
    styles,
    /\.content-sheet div\.tab-content,[^{]+{[\s\S]*?border-top-color:\s*#000;[\s\S]*?margin:\s*-1px 0 0 5px;/,
    'tab content must share a border with the tab row'
);
assert.match(
    styles,
    /\.sheet-darkmode \.content-sheet input\.tab99:checked \+ span\.tab99\s*{[\s\S]*?background:\s*#1f1f1f;[\s\S]*?border-bottom-color:\s*#1f1f1f;/,
    'the active tab must also join the content in dark mode'
);

console.log('D&D 3.5 main tab UI tests passed.');
