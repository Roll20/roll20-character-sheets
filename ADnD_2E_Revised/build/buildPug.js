const pug = require('pug');
const fs = require('fs');
const path = require('path');
const sourceFolder = path.join(__dirname, '..');
const jsFolder = path.join(sourceFolder, 'javascript');
const pugFolder = path.join(sourceFolder, 'pug');
const htmlFolder = path.join(sourceFolder, 'html');
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

function writeFile(folderPath, file, content) {
    console.log(file);
    fs.writeFileSync(path.join(folderPath, file), content)
}

const wizardSpellsJs = require(path.join(jsFolder, 'wizardSpells.js'));
const priestSpellsJs = require(path.join(jsFolder, 'priestSpells.js'));
const psionicPowersJs = require(path.join(jsFolder, 'psionicPowers.js'));
const weaponsJs = require(path.join(jsFolder, 'weapons.js'));
const weaponsProficienciesJs = require(path.join(jsFolder, 'weaponProficiencies.js'));
const nonWeaponProfsJs = require(path.join(jsFolder, 'nonweaponProficiencies.js'));
const talentsJs = require(path.join(jsFolder,'players-option-talents.js'));
const traitsJs = require(path.join(jsFolder,'players-option-traits.js'));
const disadvantagesJs = require(path.join(jsFolder,'players-option-disadvantages.js'));
const dexterityModifier = require(path.join(jsFolder,'abilityScores.js'))

console.log('---- Generating HTML files ----');
writeFile(miscFolder, 'schools-overview.html',
    pug.renderFile(path.join(pugFolder, 'schoolsOverview.pug'), {pretty: true, data: wizardSpellsJs, booksPriority})
);
writeFile(miscFolder, 'spheres-overview.html',
    pug.renderFile(path.join(pugFolder, 'spheresOverview.pug'), {pretty: true, data: priestSpellsJs, booksPriority})
);
writeFile(miscFolder, 'weapons-overview.html',
    pug.renderFile(path.join(pugFolder, 'weaponsOverview.pug'), {pretty: true, data: weaponsJs, booksPriority})
);
writeFile(miscFolder, 'nonweapon-proficiencies-overview.html',
    pug.renderFile(path.join(pugFolder, 'nonweaponProficienciesOverview.pug'), {pretty: true, data: nonWeaponProfsJs})
);
writeFile(path.join(htmlFolder,'shared'), 'wizard-spell-template.html',
    pug.renderFile(path.join(pugFolder, 'spellTemplate.pug'), {pretty: true, isPriest: false})
);
writeFile(path.join(htmlFolder,'shared'), 'priest-spell-template.html',
    pug.renderFile(path.join(pugFolder, 'spellTemplate.pug'), {pretty: true, isPriest: true})
);
writeFile(path.join(htmlFolder,'tabs','character-tab','rogue-tab'), 'thieving-skills-dexterity-adjustments.html',
    pug.renderFile(path.join(pugFolder, 'thievingSkillsDexterityAdjustments.pug'), {pretty: true, data: dexterityModifier})
);

let datalistHtml = '';
datalistHtml += pug.renderFile(path.join(pugFolder, 'spellsDatalists.pug'), {pretty: true, data: wizardSpellsJs});
datalistHtml += pug.renderFile(path.join(pugFolder, 'spellsDatalists.pug'), {pretty: true, data: priestSpellsJs});
datalistHtml += pug.renderFile(path.join(pugFolder, 'spellScrollsDatalists.pug'), {pretty: true, wizardSpells: wizardSpellsJs, priestSpells: priestSpellsJs});
datalistHtml += pug.renderFile(path.join(pugFolder, 'psionicCorePowerDatalists.pug'), {pretty: true, data: psionicPowersJs});
datalistHtml += pug.renderFile(path.join(pugFolder, 'weaponsDatalists.pug'), {pretty: true, data: weaponsJs, proficiencies: weaponsProficienciesJs, booksPriority, bookShorthand});
datalistHtml += pug.renderFile(path.join(pugFolder, 'nonweaponProficienciesDatalist.pug'), {pretty: true, data: nonWeaponProfsJs, booksPriority, bookShorthand});
datalistHtml += pug.renderFile(path.join(pugFolder, 'simpleDatalists.pug'), {pretty: true, data: talentsJs, id:'talents'});
datalistHtml += pug.renderFile(path.join(pugFolder, 'simpleDatalists.pug'), {pretty: true, data: traitsJs, id:'traits'});
datalistHtml += pug.renderFile(path.join(pugFolder, 'simpleDatalists.pug'), {pretty: true, data: disadvantagesJs, id:'disadvantages'});
writeFile(path.join(htmlFolder, 'components'), 'dynamicDatalists.html', datalistHtml);
console.log('    wizardSpells.js');
console.log('    priestSpells.js');
console.log('    psionicPowers.js');
console.log('    weapons.js');
console.log('    weaponProficiencies.js');
console.log('    nonweaponProficiencies.js');
console.log('    players-option-talents.js');
console.log('    players-option-traits.js');
console.log('    players-option-disadvantages.js');

console.log('');