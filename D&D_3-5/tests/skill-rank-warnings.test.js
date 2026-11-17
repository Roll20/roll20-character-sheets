const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const sheet = fs.readFileSync(path.join(__dirname, '..', 'charsheet_3-5.html'), 'utf8');

const toNumberSource = sheet.match(/const toNumber = \(value, fallback = 0\) => \{[\s\S]*?\n\};/);
const sumNumberedAttributesSource = sheet.match(/const sumNumberedAttributes = \(values, prefix, count = 10\) => \{[\s\S]*?\n\};/);
const trackedSkillsSource = sheet.match(/const trackedSkills = \[[\s\S]*?\n\];/);
const trackedSkillFieldsSource = sheet.match(/const trackedSkillFields = trackedSkills\.reduce\([\s\S]*?\n\}, \["totSkillPoint"\]\);/);
const trackedSkillEventsSource = sheet.match(/const trackedSkillEvents = trackedSkillFields\.map\([\s\S]*?;/);
const warningStart = sheet.indexOf('const skillRankWarningValue =');
const warningEnd = sheet.indexOf('on("change:npcautoCalcHP', warningStart);

assert.ok(toNumberSource, 'numeric conversion helper must be present');
assert.ok(sumNumberedAttributesSource, 'numbered attribute sum helper must be present');
assert.ok(trackedSkillsSource, 'tracked skill list must be present');
assert.ok(trackedSkillFieldsSource, 'tracked skill fields must be present');
assert.ok(trackedSkillEventsSource, 'tracked skill events must be present');
assert.notEqual(warningStart, -1, 'skill-rank warning worker must be present');
assert.notEqual(warningEnd, -1, 'skill-rank warning worker end must be present');

const handlers = {};
const attrs = {
    autoCalcHP: '1',
    hitdie: '20',
    hitdie1: '4',
    level: '20',
    appraiseranks: '7.5',
    appraiseclassskill: '1',
    balanceranks: '3.5',
    balanceclassskill: '0',
    repeating_skills_rowA_otherskillranks: '4',
    repeating_skills_rowA_otherskillskill: '0'
};
const writes = [];
const context = {
    on(events, handler) {
        handlers[events] = handler;
    },
    getSectionIDs(section, callback) {
        callback(section === 'repeating_skills' ? ['rowA'] : []);
    },
    getAttrs(names, callback) {
        callback(Object.fromEntries(names.map(name => [name, attrs[name]])));
    },
    setAttrs(update) {
        writes.push({...update});
        Object.assign(attrs, update);
    }
};

vm.createContext(context);
vm.runInContext(`${toNumberSource[0]}\n${sumNumberedAttributesSource[0]}\n${trackedSkillsSource[0]}\n${trackedSkillFieldsSource[0]}\n${trackedSkillEventsSource[0]}\n${sheet.slice(warningStart, warningEnd)}\nglobalThis.skillRankWarningTestApi = {skillRankWarningValue, skillRankCharacterLevel, updateSkillRankWarnings};`, context);

const {skillRankWarningValue, skillRankCharacterLevel, updateSkillRankWarnings} = context.skillRankWarningTestApi;

assert.equal(skillRankWarningValue('7', '1', '4'), '0');
assert.equal(skillRankWarningValue('7.5', '1', '4'), '1');
assert.equal(skillRankWarningValue('3.5', '0', '4'), '0');
assert.equal(skillRankWarningValue('4', '0', '4'), '1');
assert.equal(skillRankWarningValue('20', '1', ''), '0', 'missing character level must not produce warnings');
assert.equal(skillRankWarningValue('invalid', '1', '4'), '0', 'non-numeric ranks must not produce warnings');

updateSkillRankWarnings();

assert.equal(skillRankCharacterLevel(attrs), 4, 'automatic mode must derive Character Level from the class HD rows');
assert.equal(attrs.appraiserankwarning, '1', 'automatic mode must not use a stale HD Total value');
assert.equal(attrs.balancerankwarning, '0');
assert.equal(attrs.repeating_skills_rowA_otherskillrankwarning, '1', 'repeating skills must be checked');
assert.equal(writes.length, 1);

Object.assign(attrs, {autoCalcHP: '0', hitdie: '4', hitdie1: '20'});
updateSkillRankWarnings();
assert.equal(skillRankCharacterLevel(attrs), '4', 'manual mode must use the entered HD Total value');
assert.equal(attrs.appraiserankwarning, '1');

const warningEvents = Object.keys(handlers).find(events => events.includes('change:autoCalcHP'));
assert.ok(warningEvents, 'warning updates must listen for Auto Calculate changes');
const warningEventNames = warningEvents.split(/\s+/);
assert.ok(warningEventNames.includes('sheet:opened'), 'warnings must be checked when the sheet opens');
assert.ok(warningEventNames.includes('change:hitdie'), 'warning updates must listen for manual HD Total changes');
for(let row = 1; row <= 10; row += 1) {
    assert.ok(warningEventNames.includes(`change:hitdie${row}`), `warning updates must listen for class HD row ${row}`);
}

const warningInputs = [...sheet.matchAll(/name="attr_([a-z0-9]+rankwarning)"/g)].map(match => match[1]);
assert.equal(warningInputs.length, 58, 'every fixed and repeating skill rank input must have a warning indicator');
assert.ok(warningInputs.includes('otherskillrankwarning'));

console.log('D&D 3.5 skill-rank warning tests passed.');
