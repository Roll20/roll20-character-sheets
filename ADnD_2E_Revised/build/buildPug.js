const pug = require('pug');
const fs = require('fs');
const path = require('path');
const sourceFolder = path.join(__dirname, '..');
const jsFolder = path.join(sourceFolder, 'javascript');
const pugFolder = path.join(sourceFolder, 'pug');
const htmlFolder = path.join(sourceFolder, 'html', 'components');
const miscFolder = path.join(sourceFolder, 'misc');
const booksPriority = [
    {book: 'PHB', print: 'First Printing May 2013'},
    {book: 'The Complete Fighter\'s Handbook', print: '11th Printing, May 1996'},
    {book: 'The Complete Thief\'s Handbook', print: 'November 1993'},
    {book: 'The Complete Priest\'s Handbook', print: 'Seventh printing, October 1996'},
    {book: 'The Complete Wizard\'s Handbook', print: '10th printing, March 1996'},
    {book: 'The Complete Psionics Handbook', print: 'Ninth printing: October 1996'},
    {book: 'Tome of Magic', print: 'Seventh Printing: March, 1996'},
    {book: 'Arms and Equipment Guide', print: 'Fifth Printing: January 1994'},
    {book: 'The Complete Book of Dwarves', print: 'November 1993'},
    {book: 'The Complete Bard\'s Handbook', print: 'Fourth printing, November 1994'},
    {book: 'The Complete Book of Elves', print: ''},
    {book: 'The Complete Book of Humanoids', print: 'Sixth printing, March 1999'},
    {book: 'The Complete Ranger\'s Handbook', print: 'Fifth printing, July 1995'},
    {book: 'The Complete Paladin\'s Handbook', print: ''},
    {book: 'The Complete Druid\'s Handbook', print: ''},
    {book: 'The Complete Barbarian\'s Handbook', print: ''},
    {book: 'The Complete Book of Necromancers', print: ''},
    {book: 'The Complete Ninja\'s Handbook', print: '2nd printing, March 1996'},
    {book: 'Player\'s Option: Combat & Tactics', print: ''},
    {book: 'Player\'s Option: Skills & Powers', print: ''},
    {book: 'Player\'s Option: Spells & Magic', print: ''},
];
let sortOrder = booksPriority.map(bookPriority => bookPriority.book)
function bookShorthand(books) {
    return books.sort((x,y) => sortOrder.indexOf(x) - sortOrder.indexOf(y))
        .map(b => b.replace('The Complete', '')
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
        let schoolTable = pug.renderFile(path.join(pugFolder, 'schoolsOverview.pug'), {pretty: true, data: spells, booksPriority});
        fs.writeFileSync(path.join(miscFolder, 'schools-overview.html'), schoolTable);
    }
    if (jsFile === 'priestSpells.js') {
        let sphereTable = pug.renderFile(path.join(pugFolder, 'spheresOverview.pug'), {pretty: true, data: spells, booksPriority});
        fs.writeFileSync(path.join(miscFolder, 'spheres-overview.html'), sphereTable);
    }
});

const wizardSpells = require(path.join(jsFolder, 'wizardSpells.js'));
const priestSpells = require(path.join(jsFolder, 'priestSpells.js'));
html += pug.renderFile(path.join(pugFolder, 'spellScrollsDatalists.pug'), {pretty: true, wizardSpells, priestSpells});

const psionicCorePowers = require(path.join(jsFolder, 'psionicPowers.js'));
html += pug.renderFile(path.join(pugFolder, 'psionicCorePowerDatalists.pug'), {pretty: true, data: psionicCorePowers});

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