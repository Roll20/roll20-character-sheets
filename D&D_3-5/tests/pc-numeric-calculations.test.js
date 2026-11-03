const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const sheet = fs.readFileSync(path.join(__dirname, '..', 'charsheet_3-5.html'), 'utf8');

const numericStart = sheet.indexOf('const toNumber =');
const abilityEnd = sheet.indexOf('/* ======== NPC STATS */', numericStart);
const weightStart = sheet.indexOf('//  <!---- Copy weight from total equipment weight', abilityEnd);
const weightEnd = sheet.indexOf('/*  ======================================\n            VERSION MANAGEMENT', weightStart);
const actionStart = sheet.indexOf('on("sheet:opened change:rageBonusEnabled change:rageStrBonus');
const actionEnd = sheet.indexOf('//console.log(JSON.stringify(object, null, 4));', actionStart);

assert.notEqual(numericStart, -1, 'numeric helper block was not found');
assert.notEqual(abilityEnd, -1, 'PC ability block end was not found');
assert.notEqual(weightStart, -1, 'carried-weight block was not found');
assert.notEqual(weightEnd, -1, 'carried-weight block end was not found');
assert.notEqual(actionStart, -1, 'action ability bonus block was not found');
assert.notEqual(actionEnd, -1, 'action ability bonus block end was not found');

const workerSource = [
    sheet.slice(numericStart, abilityEnd),
    sheet.slice(weightStart, weightEnd),
    sheet.slice(actionStart, actionEnd)
].join('\n');

const createHarness = (initialAttrs = {}) => {
    const attrs = {...initialAttrs};
    const handlers = [];
    const writes = [];
    const context = {
        console: {log() {}},
        on(events, handler) {
            handlers.push({events: events.split(/\s+/), handler});
        },
        getAttrs(names, callback) {
            callback(Object.fromEntries(names.map(name => [name, attrs[name]])));
        },
        setAttrs(update, options, callback) {
            if(typeof options === 'function'){
                callback = options;
            }
            writes.push({...update});
            Object.assign(attrs, update);
            if(callback){
                callback();
            }
        }
    };

    vm.createContext(context);
    vm.runInContext(workerSource, context);

    return {
        attrs,
        writes,
        trigger(event) {
            const matchingHandlers = handlers.filter(registration => registration.events.includes(event));
            assert.notEqual(matchingHandlers.length, 0, `no handler registered for ${event}`);
            matchingHandlers.forEach(registration => registration.handler({sourceAttribute: event.replace('change:', '')}));
        }
    };
};

const assertNoNonFiniteNumbers = writes => {
    writes.forEach(write => {
        Object.entries(write).forEach(([attribute, value]) => {
            if(typeof value === 'number'){
                assert.equal(Number.isFinite(value), true, `${attribute} must not be NaN or infinite`);
            }
        });
    });
};

{
    const harness = createHarness({
        'str-base': '10',
        'str-misc': '',
        'str-equi': 'invalid',
        'str-temp': '-2'
    });

    harness.trigger('change:str-misc');

    assert.equal(harness.attrs.str, 8, 'blank, missing, and invalid ability components must count as zero');
    assertNoNonFiniteNumbers(harness.writes);
}

{
    const harness = createHarness({
        'str-base': '10.9',
        'str-misc': '1.9',
        'str-equi': '0',
        'str-temp': '0',
        'str-action': '0'
    });

    harness.trigger('change:str-base');

    assert.equal(harness.attrs.str, 11, 'ability components must retain their existing integer behavior');
}

{
    const harness = createHarness({
        sheetversion: '0',
        currentsheetversion: '1',
        recalc: '1',
        'str-base': '18',
        'str-misc': '',
        'str-equi': 'invalid',
        'str-temp': '0',
        'str-action': '0'
    });

    harness.trigger('change:recalc');

    assert.equal(harness.attrs.str, 18);
    assert.equal(harness.attrs['str-mod'], 4);
    assert.equal(harness.attrs.encumbrstr, 300, 'strength 18 must retain its existing heavy-load maximum');
    ['dex', 'con', 'int', 'wis', 'cha'].forEach(ability => {
        assert.equal(harness.attrs[ability], 0);
        assert.equal(harness.attrs[`${ability}-mod`], -5);
    });
    assertNoNonFiniteNumbers(harness.writes);
}

{
    const harness = createHarness({str: ''});

    harness.trigger('change:str');

    assert.equal(harness.attrs['str-mod'], -5);
    assert.equal(harness.attrs.encumbrstr, 0);
    assertNoNonFiniteNumbers(harness.writes);
}

[
    10, 20, 30, 40, 50,
    60, 70, 80, 90, 100,
    115, 130, 150, 175, 200,
    230, 260, 300, 350, 400,
    460, 520, 600, 700, 800,
    920, 1040, 1200, 1400, 1600
].forEach((heavyLoad, index) => {
    const strength = index + 1;
    const harness = createHarness({str: String(strength)});

    harness.trigger('change:str');

    assert.equal(harness.attrs.encumbrstr, heavyLoad, `strength ${strength} must retain its heavy-load maximum`);
});

['dex', 'con', 'int', 'wis', 'cha'].forEach(ability => {
    const harness = createHarness({
        [`${ability}-base`]: '12',
        [`${ability}-misc`]: '',
        [`${ability}-equi`]: 'invalid',
        [`${ability}-temp`]: '-2'
    });

    harness.trigger(`change:${ability}-base`);
    assert.equal(harness.attrs[ability], 10, `${ability} components must use safe numeric defaults`);

    harness.trigger(`change:${ability}`);
    assert.equal(harness.attrs[`${ability}-mod`], 0);
    assertNoNonFiniteNumbers(harness.writes);
});

{
    const harness = createHarness({
        equipmentweightcopy: '1',
        totalequipmentweight: '12.5',
        totalcarriedweight: 'invalid'
    });

    harness.trigger('change:totalequipmentweight');

    assert.equal(harness.attrs.totalcarriedweight, 12.5);
    assertNoNonFiniteNumbers(harness.writes);
}

{
    const harness = createHarness({
        rageBonusEnabled: '1',
        rageStrBonus: '4',
        rageConBonus: '4',
        spellsBonusEnabled: '1',
        spellsStrBonus: 'invalid',
        spellsDexBonus: '2',
        spellsConBonus: '',
        spellsIntBonus: '3',
        spellsWisBonus: '4',
        spellsChaBonus: '5',
        powersBonusEnabled: '',
        maneuversStancesBonusEnabled: '1',
        maneuversStancesStrBonus: '2',
        maneuversStancesDexBonus: '1',
        maneuversStancesConBonus: '3',
        maneuversStancesIntBonus: '2',
        maneuversStancesWisBonus: '1',
        maneuversStancesChaBonus: '0',
        conditionsBonusEnabled: '1',
        entangledEnabled: '-2',
        exhaustedEnabled: '-6',
        fatiguedEnabled: ''
    });

    harness.trigger('change:rageStrBonus');
    harness.trigger('change:spellsDexBonus');
    harness.trigger('change:rageConBonus');
    harness.trigger('change:spellsIntBonus');
    harness.trigger('change:spellsWisBonus');
    harness.trigger('change:spellsChaBonus');

    assert.equal(harness.attrs['str-action'], 0);
    assert.equal(harness.attrs['dex-action'], -7);
    assert.equal(harness.attrs['con-action'], 7);
    assert.equal(harness.attrs['int-action'], 5);
    assert.equal(harness.attrs['wis-action'], 5);
    assert.equal(harness.attrs['cha-action'], 5);
    assertNoNonFiniteNumbers(harness.writes);
}

console.log('D&D 3.5 PC numeric calculation tests passed.');
