const pug = require('pug');
const fs = require('fs');
const path = require('path');
const jsFolder = path.join(__dirname, '..', 'javascript');
const pugFolder = path.join(__dirname, '..', 'pug');
const htmlFolder = path.join(__dirname, '..', 'html', 'components');

console.log('---- Generating dynamicDatalists ----');
const spellsJs = ['wizardSpells.js', 'priestSpells.js'];
let html = '';

spellsJs.forEach(jsFile => {
    console.log(jsFile);
    const spells = require(path.join(jsFolder, jsFile));
    html += pug.renderFile(path.join(pugFolder, 'spellsDatalists.pug'), {pretty: true, data: spells});
});

console.log('weapons.js')
const weapons = require(path.join(jsFolder, 'weapons.js'));
const weaponsProficiencies = require(path.join(jsFolder, 'weaponProficiencies.js'));
html += pug.renderFile(path.join(pugFolder, 'weaponsDatalists.pug'), {pretty: true, data: weapons, proficiencies: weaponsProficiencies});

console.log('nonweaponProficiencies.js')
const nonweaponProficiencies = require(path.join(jsFolder, 'nonweaponProficiencies.js'));
html += pug.renderFile(path.join(pugFolder, 'nonweaponProficienciesDatalists.pug'), {pretty: true, data: nonweaponProficiencies});

fs.writeFileSync(path.join(htmlFolder, 'dynamicDatalists.html'), html);
console.log('');