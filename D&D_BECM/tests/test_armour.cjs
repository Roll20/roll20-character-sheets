// Run with: node --test tests/test_armour.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'BDnDSheet.html'), 'utf8');
const worker = html.match(/\/\* ---- BEGIN: Armour calculations ---- \*\/([\s\S]*?)\/\* ---- END: Armour calculations ---- \*\//)[1];

// AC comes from the original standard armour labels and Mystaran Armoury table 1.3.
// Encumbrance retains the original sheet values, including its optional armour.
const expected = [
    ['none', 0, 9], ['classic-leather', 200, 7], ['classic-scale', 300, 6],
    ['classic-chain', 400, 5], ['classic-banded', 450, 4], ['classic-plate', 500, 3],
    ['suit', 750, 0], ['skins', 50, 8], ['fur', 150, 8], ['paper', 80, 8],
    ['padded', 100, 8], ['corded', 120, 8], ['slat', 180, 7], ['leather', 140, 7],
    ['plated-leather', 170, 7], ['studded-leather', 160, 7], ['cuir-boulli', 150, 7],
    ['hide', 200, 6], ['breastplate', 200, 6], ['scale', 300, 6],
    ['brigandine', 250, 6], ['banded-leather', 300, 5], ['lamellar', 350, 5],
    ['chainmail', 400, 5], ['splint', 450, 4], ['banded-mail', 500, 4],
    ['plate-mail', 600, 3], ['full-plate', 900, 0],
];

function fixture(initial = {}) {
    const values = { eqarmourtype: 'none', eqarmour: '0', eqarmourbaseac: '9', eqarmourversion: '0', ...initial };
    const events = {};
    let writes = 0;
    const context = {
        on: (name, callback) => { events[name] = callback; },
        getAttrs: (names, callback) => callback(Object.fromEntries(names.map(name => [name, values[name]]))),
        setAttrs: updates => {
            writes += 1;
            for (const [name, value] of Object.entries(updates)) values[name] = String(value);
        },
    };
    vm.runInNewContext(worker, context);
    return { values, fire: name => events[name](), writes: () => writes };
}

test('every armour option has a unique identity and displays its AC', () => {
    const select = html.match(/<select name="attr_eqarmourtype">([\s\S]*?)<\/select>/)[1];
    const options = [...select.matchAll(/<option value="([^"]+)"[^>]*>([^<]+)<\/option>/g)];
    assert.deepEqual(options.map(option => option[1]), expected.map(armour => armour[0]));
    assert.equal(new Set(options.map(option => option[1])).size, options.length);
    expected.forEach(([type, enc, ac], index) => {
        if (type !== 'none') assert.ok(options[index][2].endsWith(`(AC ${ac})`));
    });
});

for (const [type, enc, ac] of expected) {
    test(`${type}: correct AC and encumbrance persist across reopening`, () => {
        const sheet = fixture({ eqarmourtype: type });
        sheet.fire('change:eqarmourtype');
        assert.equal(sheet.values.eqarmour, String(enc));
        assert.equal(sheet.values.eqarmourbaseac, String(ac));
        const writes = sheet.writes();
        sheet.fire('sheet:opened');
        assert.equal(sheet.values.eqarmourtype, type);
        assert.equal(sheet.values.eqarmourbaseac, String(ac));
        assert.equal(sheet.writes(), writes, 'opening an unchanged sheet must not rewrite attributes');
    });
}

test('legacy weights migrate to the original dropdown first matching option', () => {
    const seen = new Set();
    for (const [type, enc, ac] of expected) {
        if (seen.has(enc)) continue;
        seen.add(enc);
        const sheet = fixture({ eqarmour: String(enc), eqarmourbaseac: '(old polynomial)' });
        sheet.fire('sheet:opened');
        assert.equal(sheet.values.eqarmourtype, type);
        assert.equal(sheet.values.eqarmour, String(enc));
        assert.equal(sheet.values.eqarmourbaseac, String(ac));
        assert.equal(sheet.values.eqarmourversion, '1');
    }
});

test('changing between equal-weight armour updates AC', () => {
    const sheet = fixture({ eqarmourtype: 'classic-leather' });
    sheet.fire('change:eqarmourtype');
    assert.equal(sheet.values.eqarmourbaseac, '7');
    sheet.values.eqarmourtype = 'hide';
    sheet.fire('change:eqarmourtype');
    assert.equal(sheet.values.eqarmour, '200');
    assert.equal(sheet.values.eqarmourbaseac, '6');
});

test('unrecognized legacy weights are preserved until the user chooses an armour', () => {
    const sheet = fixture({ eqarmour: '123', eqarmourbaseac: '7' });
    sheet.fire('sheet:opened');
    assert.equal(sheet.values.eqarmour, '123');
    assert.equal(sheet.values.eqarmourbaseac, '7');
    assert.equal(sheet.writes(), 0);
});
