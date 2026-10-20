const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const sheetDirectory = path.join(__dirname, '..');
const sheet = fs.readFileSync(path.join(sheetDirectory, 'charsheet_3-5.html'), 'utf8');
const styles = fs.readFileSync(path.join(sheetDirectory, 'charsheet_3-5.css'), 'utf8');

const expectedTabs = [
    ['1', 'tab1', 'Stats'],
    ['2', 'tab2', 'Weapons'],
    ['3', 'tab3', 'AC'],
    ['4', 'tab4', 'Equipment'],
    ['5', 'tab5', 'Skills'],
    ['6', 'tab6', 'Spells'],
    ['7', 'tab7', 'Notes'],
    ['8', 'tab8', 'Misc'],
    ['9', 'tab9', 'Summons'],
    ['10', 'tab10', 'Action'],
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
assert.equal(
    [...tabNavigation.matchAll(/<\/span><!--\s*--><input/g)].length,
    expectedTabs.length - 1,
    'HTML whitespace between adjacent tabs must be suppressed so the tabs touch'
);

assert.match(
    styles,
    /\.content-sheet span\.tab\s*{[\s\S]*?background:\s*#c7c7c7;[\s\S]*?border:\s*1px solid #666;[\s\S]*?text-transform:\s*uppercase;/,
    'inactive tabs must use the connected PF1-inspired tab styling'
);
assert.match(
    styles,
    /\.content-sheet span\.tab\s*{[\s\S]*?margin:\s*0 -1px -1px -70px;/,
    'adjacent tab borders must overlap by one pixel'
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
