const pug = require('pug');
const fs = require('fs');
console.log('---- Generating spells datalists ----');
const spellsJs = ['wizardSpells.js', 'priestSpells.js'];
let html = '';
spellsJs.forEach(jsFile => {
    console.log(jsFile);
    const spells = require(`../javascript/${jsFile}`);
    html += pug.renderFile('../pug/spellsDatalists.pug', {pretty: true, data: spells});
});
fs.writeFileSync('../html/spellsDatalists.html', html);
console.log('');