const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

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
assert.deepEqual(
    [...tabNavigation.matchAll(/name="attr_tab" class="tab (tab\d+)"/g)].map(match => match[1]),
    expectedTabs.map(([, tabClass]) => tabClass),
    'Configuration must follow Action in the main tab row'
);
assert.equal(
    [...tabNavigation.matchAll(/<\/span><!--\s*--><input/g)].length,
    expectedTabs.length - 1,
    'HTML whitespace between adjacent tabs must be suppressed so the tabs touch'
);
assert.doesNotMatch(
    tabNavigation,
    /<(?:table|thead|tbody|tfoot|tr|th|td)\b/i,
    'the main tab navigation must not introduce table-based layout'
);

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

const visibilitySettings = sheet.match(/<div class="tab-visibility-settings">([\s\S]*?)<\/div>/);
assert.ok(visibilitySettings, 'Configuration must include tab visibility settings');
assert.doesNotMatch(visibilitySettings[1], /<(?:table|thead|tbody|tfoot|tr|th|td)\b/i);

const visibilityWorker = sheet.match(/const optionalMainTabs = \{[\s\S]*?\n\}\);/);
assert.ok(visibilityWorker, 'the sheet worker must handle a hidden active tab');
const handlers = new Map();
const attrs = {};
const updates = [];
vm.runInNewContext(visibilityWorker[0], {
    on(events, handler) {
        for (const event of events.split(/\s+/)) {
            handlers.set(event, handler);
        }
    },
    getAttrs(names, callback) {
        callback(Object.fromEntries(names.map(name => [name, attrs[name]])));
    },
    setAttrs(update) {
        updates.push({...update});
    }
});

const visibilityRule = styles.match(/\.content-sheet input\.tab-visibility-spells[^{}]+\{\s*display:\s*none;\s*\}/);
assert.ok(visibilityRule, 'disabled tabs must have a visibility rule');
for (const [name, tab] of [['spells', '6'], ['summons', '9'], ['all', '99']]) {
    const attribute = `show_${name}_tab`;
    const controller = `<input type="hidden" class="tab-visibility-${name}" name="attr_${attribute}" value="1"`;
    const checkbox = `<input type="checkbox" name="attr_${attribute}" value="1" checked`;
    const controllerIndex = sheet.indexOf(controller);
    assert.ok(controllerIndex >= 0 && controllerIndex < tabNavigationStart, `${name} must default to visible`);
    assert.ok(visibilitySettings[1].includes(checkbox), `${name} must have a checked checkbox in Configuration`);

    const selector = `input.tab-visibility-${name}[value="0"] ~ `;
    assert.ok(visibilityRule[0].includes(`${selector}input.tab${tab}`));
    assert.ok(visibilityRule[0].includes(`${selector}span.tab${tab}`));
    if (name !== 'all') {
        assert.ok(visibilityRule[0].includes(`${selector}div.tab-content.tab${tab}`), `${name} must also hide in All`);
    } else {
        assert.ok(!visibilityRule[0].includes(`${selector}div.`), 'hiding All must leave individual panels available');
    }

    attrs.tab = tab;
    assert.ok(handlers.has(`change:${attribute}`));
    for (const event of ['sheet:opened', `change:${attribute}`, 'change:tab']) {
        attrs[attribute] = '0';
        handlers.get(event)();
        assert.deepEqual(updates.splice(0), [{tab: '8'}], `${event} must redirect from disabled ${name}`);
    }

    attrs.tab = '1';
    handlers.get(`change:${attribute}`)();
    assert.deepEqual(updates, [], `hiding ${name} must preserve an unrelated active tab`);

    attrs.tab = tab;
    for (const value of ['1', undefined]) {
        attrs[attribute] = value;
        handlers.get('sheet:opened')();
        assert.deepEqual(updates, [], `enabled or unset ${name} must stay selected`);
    }
}

console.log('D&D 3.5 main tab UI tests passed.');
