const k = require('./source/scaffold');
const fs = require('fs/promises');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const generate = async ()=>{
  const [pugOut] = await k.all({source:'./source',destination:'./'});
  const dom = new JSDOM(pugOut);
  const { window } = dom;
  const { document } = window;
  const scriptContent = document.querySelector('script').innerHTML;
  const scriptPrepend = await fs.readFile('./source/scaffold/scripts/mock20.js','utf8');
  const scriptAppend = await fs.readFile('./source/scaffold/scripts/mockScaffold.js','utf8');
  fs.writeFile('./source/javascript/index.js',`${scriptPrepend}\n${scriptContent}\n${scriptAppend}`);
}

generate();