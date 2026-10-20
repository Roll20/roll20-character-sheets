const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const sheetDirectory = path.join(__dirname, '..');
const sheet = fs.readFileSync(path.join(sheetDirectory, 'charsheet_3-5.html'), 'utf8');
const styles = fs.readFileSync(path.join(sheetDirectory, 'charsheet_3-5.css'), 'utf8');
const translations = JSON.parse(fs.readFileSync(path.join(sheetDirectory, 'translation.json'), 'utf8'));

const summaryInput = sheet.match(/<input[^>]+class="pc-class-summary-value"[^>]*>/);
assert.ok(summaryInput, 'the character header must include a class summary field');
assert.match(summaryInput[0], /name="attr_class_summary"/);
assert.match(summaryInput[0], /\sreadonly(?:\s|=|\/|>)/, 'the class summary must not be directly editable');
assert.match(summaryInput[0], /data-i18n-title="class-summary-help"/);
assert.match(summaryInput[0], /data-i18n-placeholder="no-classes-configured"/);

const headerStart = sheet.indexOf('<input type="checkbox" class="pc-charrpinfo-show');
const tabStart = sheet.indexOf('<input type="radio" name="attr_tab" class="tab tab1"');
const header = sheet.slice(headerStart, tabStart);
const racePosition = header.indexOf('name="attr_race"');
const summaryPosition = header.indexOf('class="pc-class-summary"');
const agePosition = header.indexOf('name="attr_age"');
assert.match(header, /<tr><td rowspan=5>/, 'the header spacer must span the added class-summary row');
assert.notEqual(summaryPosition, -1, 'the summary must appear in the persistent character header');
assert.ok(racePosition < agePosition, 'the Age field row must follow the Race field row');
assert.ok(agePosition < summaryPosition, 'the summary must appear below the Age, Weight, and related fields');

assert.equal(translations['classes-and-levels'], 'Classes and levels');
assert.equal(translations['class-summary-help'], 'Derived from the Classes section in Configuration.');
assert.equal(translations['no-classes-configured'], 'No classes configured');
assert.match(
    styles,
    /\.content-sheet input\.pc-class-summary-value:read-only\s*{[\s\S]*?background:\s*#e0e0e0;[\s\S]*?flex:\s*0 1 400px;[\s\S]*?width:\s*400px;/,
    'the read-only summary must use a compact width and gray background'
);
assert.match(
    styles,
    /\.sheet-darkmode \.content-sheet input\.pc-class-summary-value:read-only\s*{[\s\S]*?background-color:\s*#595959;/,
    'the read-only summary must retain an appropriate gray background in dark mode'
);

const workerStart = sheet.indexOf('const classSummaryRows =');
const workerEnd = sheet.indexOf('on("change:autoCalcHP change:level1', workerStart);
assert.notEqual(workerStart, -1, 'class summary worker start was not found');
assert.notEqual(workerEnd, -1, 'class summary worker end was not found');

const workerSource = `${sheet.slice(workerStart, workerEnd)}
globalThis.classSummaryTestApi = {buildClassSummary, updateClassSummary, classSummaryFields};`;
const attrs = {};
const handlers = [];
const updates = [];
const context = {
    on(events, handler) {
        handlers.push({events: events.split(/\s+/), handler});
    },
    getAttrs(names, callback) {
        callback(Object.fromEntries(names.map(name => [name, attrs[name]])));
    },
    setAttrs(update, options) {
        Object.assign(attrs, update);
        updates.push({update, options});
    }
};

vm.createContext(context);
vm.runInContext(workerSource, context);

const {buildClassSummary, updateClassSummary, classSummaryFields} = context.classSummaryTestApi;
assert.equal(classSummaryFields.length, 20, 'all ten class names and levels must be observed');
assert.equal(buildClassSummary({}), '');
assert.equal(buildClassSummary({class1: 'Fighter', level1: '5'}), 'Fighter 5');
assert.equal(
    buildClassSummary({class1: ' Fighter ', level1: '5', class2: 'Wizard', level2: '3'}),
    'Fighter 5 / Wizard 3'
);
assert.equal(
    buildClassSummary({class1: 'Rogue', level1: '', class2: '', level2: '4'}),
    'Rogue',
    'empty class rows must be ignored and a named class without a level must remain visible'
);

const registration = handlers.find(handler => handler.events.includes('sheet:opened'));
assert.ok(registration, 'the summary must update when the sheet opens');
for(let row = 1; row <= 10; row += 1) {
    assert.ok(registration.events.includes(`change:class${row}`), `class row ${row} name changes must update the summary`);
    assert.ok(registration.events.includes(`change:level${row}`), `class row ${row} level changes must update the summary`);
}

Object.assign(attrs, {class1: 'Fighter', level1: '5', class2: 'Wizard', level2: '3'});
updateClassSummary();
assert.equal(attrs.class_summary, 'Fighter 5 / Wizard 3');
assert.equal(updates.at(-1).options.silent, true, 'summary updates must not trigger unrelated sheet workers');

console.log('D&D 3.5 class summary tests passed.');
