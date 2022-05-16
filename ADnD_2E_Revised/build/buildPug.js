const pug = require('pug');
const fs = require('fs');
const path = require('path');
const sourceFolder = path.join(__dirname, '..');
const jsFolder = path.join(sourceFolder, 'javascript');
const pugFolder = path.join(sourceFolder, 'pug');
const htmlFolder = path.join(sourceFolder, 'html', 'components');
const miscFolder = path.join(sourceFolder, 'misc');

console.log('---- Generating dynamicDatalists ----');
const spellsJs = ['wizardSpells.js', 'priestSpells.js'];
let html = '';

spellsJs.forEach(jsFile => {
    console.log(jsFile);
    const spells = require(path.join(jsFolder, jsFile));
    html += pug.renderFile(path.join(pugFolder, 'spellsDatalists.pug'), {pretty: true, data: spells});

    if (jsFile === 'wizardSpells.js') {
        let schoolTable = pug.renderFile(path.join(pugFolder, 'schoolOverview.pug'), {pretty: true, data: spells});
        fs.writeFileSync(path.join(miscFolder, 'school-overview.html'), schoolTable);
    }
    if (jsFile === 'priestSpells.js') {
        let sphereTable = pug.renderFile(path.join(pugFolder, 'sphereOverview.pug'), {pretty: true, data: spells});
        fs.writeFileSync(path.join(miscFolder, 'sphere-overview.html'), sphereTable);
    }
});

console.log('weapons.js');
console.log('weaponProficiencies.js');
const weapons = require(path.join(jsFolder, 'weapons.js'));
const weaponsProficiencies = require(path.join(jsFolder, 'weaponProficiencies.js'));
html += pug.renderFile(path.join(pugFolder, 'weaponsDatalists.pug'), {pretty: true, data: weapons, proficiencies: weaponsProficiencies});

let weaponTable = pug.renderFile(path.join(pugFolder, 'weaponsOverview.pug'), {pretty: true, data: weapons});
fs.writeFileSync(path.join(miscFolder, 'weapons-overview.html'), weaponTable);

const simpleDatalists = [
    ['nonweaponProficiencies.js','nonweapon-proficiencies'],
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