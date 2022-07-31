const pug = require('pug');
const fs = require('fs');
const path = require('path');
const sourceFolder = path.join(__dirname, '..');
const jsFolder = path.join(sourceFolder, 'javascript');
const pugFolder = path.join(sourceFolder, 'pug');
const htmlFolder = path.join(sourceFolder, 'html', 'components');
const miscFolder = path.join(sourceFolder, 'misc');
const booksPriority = [
    'PHB',
    'The Complete Fighter\'s Handbook',
    'The Complete Thief\'s Handbook',
    'The Complete Priest\'s Handbook',
    'The Complete Wizard\'s Handbook',
    'Tome of Magic',
    'Arms and Equipment Guide',
    'The Complete Book of Dwarves',
    'The Complete Bard\'s Handbook',
    'The Complete Book of Elves',
    'The Complete Book of Humanoids',
    'The Complete Ranger\'s Handbook',
    'The Complete Paladin\'s Handbook',
    'The Complete Druid\'s Handbook',
    'The Complete Barbarian\'s Handbook',
    'The Complete Book of Necromancers',
    'The Complete Ninja\'s Handbook',
    'Player\'s Option: Combat & Tactics',
    'Player\'s Option: Skills & Powers',
    'Player\'s Option: Spells & Magic',
];
function bookShorthand(books) {
    return books.map(b => b.replace('The Complete', '')
        .replace('Book of', '')
        .replace('Handbook', '')
        .replace('Player\'s Option:','')
        .replace('Arms and Equipment Guide', 'A&E')
        .replace('Tome of Magic','ToM')
        .replace('Combat & Tactics', 'PO: C&T')
        .replace('Skills & Powers', 'PO: S&P')
        .replace('Spells & Magic', 'PO: S&M')
        .replace('\'','')
        .trim())
        .join(', ')
}

console.log('---- Generating dynamicDatalists ----');
const spellsJs = ['wizardSpells.js', 'priestSpells.js'];
let html = '';

spellsJs.forEach(jsFile => {
    console.log(jsFile);
    const spells = require(path.join(jsFolder, jsFile));
    html += pug.renderFile(path.join(pugFolder, 'spellsDatalists.pug'), {pretty: true, data: spells});

    if (jsFile === 'wizardSpells.js') {
        let schoolTable = pug.renderFile(path.join(pugFolder, 'schoolsOverview.pug'), {pretty: true, data: spells});
        fs.writeFileSync(path.join(miscFolder, 'schools-overview.html'), schoolTable);
    }
    if (jsFile === 'priestSpells.js') {
        let sphereTable = pug.renderFile(path.join(pugFolder, 'spheresOverview.pug'), {pretty: true, data: spells});
        fs.writeFileSync(path.join(miscFolder, 'spheres-overview.html'), sphereTable);
    }
});

console.log('weapons.js');
console.log('weaponProficiencies.js');
const weapons = require(path.join(jsFolder, 'weapons.js'));
const weaponsProficiencies = require(path.join(jsFolder, 'weaponProficiencies.js'));
html += pug.renderFile(path.join(pugFolder, 'weaponsDatalists.pug'), {pretty: true, data: weapons, proficiencies: weaponsProficiencies, booksPriority, bookShorthand});
let weaponTable = pug.renderFile(path.join(pugFolder, 'weaponsOverview.pug'), {pretty: true, data: weapons, booksPriority});
fs.writeFileSync(path.join(miscFolder, 'weapons-overview.html'), weaponTable);

const nonWeaponProfs = require(path.join(jsFolder, 'nonweaponProficiencies.js'));
html += pug.renderFile(path.join(pugFolder, 'nonweaponProficienciesDatalist.pug'), {pretty: true, data: nonWeaponProfs, booksPriority, bookShorthand})
const nonWeaponProfTable = pug.renderFile(path.join(pugFolder, 'nonweaponProficienciesOverview.pug'), {pretty: true, data: nonWeaponProfs});
fs.writeFileSync(path.join(miscFolder, 'nonweapon-proficiencies-overview.html'), nonWeaponProfTable);

const simpleDatalists = [
    ['players-option-talents.js','talents'],
    ['players-option-traits.js','traits'],
    ['players-option-disadvantages.js','disadvantages']
];
simpleDatalists.forEach(simpleDatalist => {
   console.log(simpleDatalist[0]);
   const data = require(path.join(jsFolder, simpleDatalist[0]));
   html += pug.renderFile(path.join(pugFolder, 'simpleDatalists.pug'), {pretty: true, data: data, id:simpleDatalist[1]})
});

fs.writeFileSync(path.join(htmlFolder, 'dynamicDatalists.html'), html);
console.log('');