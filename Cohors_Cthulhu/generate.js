//Require the K-scaffold that we installed via NPM
const k = require('@kurohyou/k-scaffold');
const fs = require("fs");

const kOpts = {
    destination: '.',
    testDestination: './__tests__',
    source: './source',
    pugOptions: { "require": require, "fs": fs },
    // Readable CSS with comments; comments don't affect roll-template
    // styling.
    scssOptions: { style: 'expanded' },
};

// The CSS loads images from Roll20's repo, where they only exist once the
// sheet is merged. Cohors_Cthulhu.test.css loads them from the fork's
// Cohors_Cthulhu branch instead, for test games before the merge. It's
// committed with every build, and left out of the Roll20 submission.
const ROLL20_IMAGES = 'https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Cohors_Cthulhu/images/';
const TEST_IMAGES = 'https://raw.githubusercontent.com/Seppun/roll20-character-sheets/Cohors_Cthulhu/Cohors_Cthulhu/images/';

// Checks a value against the JSON Schema keywords source/data/spells.schema.json
// uses (type, enum, pattern, required, properties, additionalProperties,
// propertyNames, $ref to #/definitions), so a typo in spells.json stops the
// build with the spell and field named.
const validateAgainst = (schema, root, value, where, problems) => {
    if (schema.$ref) { return validateAgainst(root.definitions[schema.$ref.split('/').pop()], root, value, where, problems); }
    if (schema.type === 'object' && (typeof value !== 'object' || value === null || Array.isArray(value))) { problems.push(`${where}: must be an object`); return; }
    if (schema.type === 'string' && typeof value !== 'string') { problems.push(`${where}: must be a string`); return; }
    if (schema.enum && !schema.enum.includes(value)) { problems.push(`${where}: "${value}" is not one of ${schema.enum.join(', ')}`); }
    if (schema.pattern && typeof value === 'string' && !new RegExp(schema.pattern).test(value)) { problems.push(`${where}: "${value}" doesn't match ${schema.pattern}`); }
    if (schema.type !== 'object') { return; }
    (schema.required || []).forEach((key) => { if (!(key in value)) { problems.push(`${where}: missing "${key}"`); } });
    Object.keys(value).forEach((key) => {
        const sub = `${where}/${key}`;
        if (schema.propertyNames) { validateAgainst(schema.propertyNames, root, key, `${sub} (name)`, problems); }
        if (schema.properties && schema.properties[key]) {
            validateAgainst(schema.properties[key], root, value[key], sub, problems);
        } else if (schema.additionalProperties === false) {
            problems.push(`${sub}: unknown field`);
        } else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
            validateAgainst(schema.additionalProperties, root, value[key], sub, problems);
        }
    });
};
const checkSpells = () => {
    const schema = JSON.parse(fs.readFileSync('./source/data/spells.schema.json', 'utf8'));
    const spells = JSON.parse(fs.readFileSync('./source/data/spells.json', 'utf8'));
    const problems = [];
    validateAgainst(schema, schema, spells, 'spells.json', problems);
    // Attack spells without damage aren't an error (it's filled in by hand
    // as the data is written), but they are listed.
    const noDamage = [];
    Object.keys(spells).forEach((tradition) => Object.keys(spells[tradition]).forEach((name) => {
        const spell = spells[tradition][name];
        if (/attack/i.test(spell.category || '') && !spell.damage_effects) { noDamage.push(name); }
    }));
    if (problems.length) {
        console.error(`spells.json does not match source/data/spells.schema.json:\n  ${problems.join('\n  ')}`);
        process.exit(1);
    }
    if (noDamage.length) { console.log(`spells.json: ${noDamage.length} attack spells have no damage_effects yet: ${noDamage.join(', ')}`); }
};
checkSpells();

if (process.argv[2] === '--watch') {
    kOpts.watch = true;
    k.all(kOpts);
} else {
    k.all(kOpts).then(() => {
        const css = fs.readFileSync('Cohors_Cthulhu.css', 'utf8');
        fs.writeFileSync('Cohors_Cthulhu.test.css', css.split(ROLL20_IMAGES).join(TEST_IMAGES));
        // Local additions kept outside the published sheet, if present.
        if (fs.existsSync('./private/build.js')) { require('./private/build.js'); }
    });
}
