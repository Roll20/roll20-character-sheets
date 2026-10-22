const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const sheetDirectory = path.join(__dirname, '..');
const sheet = fs.readFileSync(path.join(sheetDirectory, 'charsheet_3-5.html'), 'utf8');
const translations = JSON.parse(fs.readFileSync(path.join(sheetDirectory, 'translation.json'), 'utf8'));

const bonusHelpText = 'Include the Intelligence modifier, +1 for Humans, and similar per-level bonuses.';

for(let row = 1; row <= 10; row += 1){
    const input = sheet.match(new RegExp(`<input[^>]+name="attr_skillPointBonus${row}"[^>]*>`));
    assert.ok(input, `class row ${row} must retain its skill-point bonus field`);
    assert.ok(input[0].includes(`title="${bonusHelpText}"`), `class row ${row} must explain the per-level bonus`);
    assert.match(input[0], /data-i18n-title="skill-point-bonus-per-level-help"/);
}

const bonusLabels = [...sheet.matchAll(/<span data-i18n="skill-point-bonus-per-level">Bonus\/lvl<\/span>/g)];
assert.equal(bonusLabels.length, 10, 'all ten class rows must label the field as Bonus/lvl');
assert.equal(translations['skill-point-bonus-per-level'], 'Bonus/lvl');
assert.equal(translations['skill-point-bonus-per-level-help'], bonusHelpText);

const calculationStart = sheet.indexOf('const classSkillPointRows =');
const calculationEnd = sheet.indexOf('const trackedSkills =', calculationStart);
assert.notEqual(calculationStart, -1, 'skill-point calculation block start was not found');
assert.notEqual(calculationEnd, -1, 'skill-point calculation block end was not found');

const workerSource = `${sheet.slice(calculationStart, calculationEnd)}
globalThis.skillPointTestApi = {calculateClassSkillPoints};`;

const attrs = {};
const handlers = [];
const context = {
    console: {log() {}},
    on(events, handler) {
        handlers.push({events: events.split(/\s+/), handler});
    },
    getAttrs(names, callback) {
        callback(Object.fromEntries(names.map(name => [name, attrs[name]])));
    },
    setAttrs(update) {
        Object.assign(attrs, update);
        Object.keys(update).forEach(attribute => {
            handlers
                .filter(registration => registration.events.includes(`change:${attribute}`))
                .forEach(registration => registration.handler({sourceType: 'sheetworker'}));
        });
    },
    sumNumberedAttributes(values, prefix) {
        return Array.from({length: 10}, (unused, index) => {
            return parseInt(values[`${prefix}${index + 1}`], 10) || 0;
        }).reduce((total, value) => total + value, 0);
    }
};

vm.createContext(context);
vm.runInContext(workerSource, context);

const {calculateClassSkillPoints} = context.skillPointTestApi;
const firstLevelValues = {
    firstLevelClass: '1',
    hitdie1: '1',
    skillPointLiv1: '2',
    skillPointBonus1: '0'
};

const nonHumanFirstLevel = calculateClassSkillPoints(1, firstLevelValues);
const humanFirstLevel = calculateClassSkillPoints(1, {...firstLevelValues, skillPointBonus1: '1'});
assert.equal(nonHumanFirstLevel, 8);
assert.equal(humanFirstLevel, 12);
assert.equal(humanFirstLevel - nonHumanFirstLevel, 4, 'Human +1 must grant four extra points at first level');

const nonHumanSecondLevel = calculateClassSkillPoints(1, {...firstLevelValues, hitdie1: '2'});
const humanSecondLevel = calculateClassSkillPoints(1, {...firstLevelValues, hitdie1: '2', skillPointBonus1: '1'});
assert.equal(nonHumanSecondLevel, 10);
assert.equal(humanSecondLevel, 15);
assert.equal(
    (humanSecondLevel - nonHumanSecondLevel) - (humanFirstLevel - nonHumanFirstLevel),
    1,
    'Human +1 must add one more racial skill point at the next level'
);

Object.assign(attrs, {...firstLevelValues, skillPointBonus1: '1'});
const bonusHandler = handlers.find(registration => registration.events.includes('change:skillPointBonus1'));
const hitDieHandler = handlers.find(registration => registration.events.includes('change:hitdie1'));
assert.ok(bonusHandler, 'per-level bonus changes must trigger skill-point recalculation');
assert.ok(hitDieHandler, 'class HD changes must trigger skill-point recalculation');
bonusHandler.handler({sourceType: 'player'});
assert.equal(attrs.totSkillPoint1, 12);
assert.equal(attrs.totSkillPoint, 12, 'the overall skill-point total must follow the recalculated class total');

attrs.hitdie1 = '2';
hitDieHandler.handler({sourceType: 'player'});
assert.equal(attrs.totSkillPoint1, 15);
assert.equal(attrs.totSkillPoint, 15, 'increasing class HD must update the overall total');

console.log('D&D 3.5 skill-point tests passed.');
