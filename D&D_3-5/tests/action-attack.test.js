const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const sheet = fs.readFileSync(path.join(__dirname, '..', 'charsheet_3-5.html'), 'utf8');

assert.match(
    sheet,
    /name="attr_offyHandAttackBonus"/,
    'the off-hand attack input must remain available for existing characters'
);

const offHandBonus = sheet.match(/bonusAttackList\.set\("off hand",\s*"([^"]+)"\);/);
assert.ok(offHandBonus, 'the off-hand attack modifier must be registered');
assert.match(offHandBonus[1], /@\{twoWeaponsEnabled\}/);
assert.match(
    offHandBonus[1],
    /@\{offyHandAttackBonus\}/,
    'the attack macro must use the attribute populated by the off-hand input'
);
assert.doesNotMatch(
    offHandBonus[1],
    /@\{offHandAttackBonus\}/,
    'the attack macro must not reference the nonexistent offHandAttackBonus attribute'
);

console.log('D&D 3.5 action attack tests passed.');
