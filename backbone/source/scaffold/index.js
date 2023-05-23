const path = require('path');
const {pathToFileURL} = require('url');
const fs = require('fs/promises');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const pug = require('pug');
const sass = require('sass-embedded');
// Object to hold the last edited times of each file to prevent extraneous renders

const getTemplate = (filePath) => fs.readFile(filePath,'utf8')
  .then(text => text.replace(/include k-scaffold/g,'include /node_modules/k-scaffold/_k.pug'));

const outputPug = async (html,destination) => {
  if(!destination) return;
  const destDir = path.dirname(destination);
  await fs.mkdir(destDir,{recursive:true});
  await fs.writeFile(destination,html);
  console.log(`HTML written to ${destination}`);
  const dom = new JSDOM(html);
  const { window } = dom;
  const { document } = window;
  
  const transArr = [...document.querySelectorAll('[data-i18n]')];
  const attrTransKeys = ['title','placeholder','label','aria-label','alt','list']
  const attrTransArr = attrTransKeys.reduce((memo,key) =>  [...new Set([
    ...memo,
    ...document.querySelectorAll(`[data-i18n-${key}]`)
  ])] ,[]);
  const translations = transArr.reduce((memo,el)=>{
    memo[el.dataset.i18n] = el.textContent?.trim() || el.dataset.i18n;
    return memo;
  },{});
  const capitalizeI18n = string => string.replace(/(?:^|\s+|\/|-)[a-z]/ig,(letter)=>letter.toUpperCase()).replace(/-/g,'');
  attrTransArr.forEach(el => {
    attrTransKeys.forEach(key => {
      if(el.dataset[`i18n${capitalizeI18n(key)}`]){
        translations[el.dataset[`i18n${capitalizeI18n(key)}`]] = el[key] || el.dataset[`i18n${capitalizeI18n(key)}`];
      }
    });
  });
  if(translations){
    const transPath = path.resolve(path.dirname(destination),'translation.json');
    const currTranslation = await fs.readFile(transPath,'utf8')
      .then(t => JSON.parse(t))
      .catch( e => {return {}});
    Object.entries(translations)
      .forEach(([key,val]) => {
        if(!currTranslation[key]){
          currTranslation[key] = val;
        }
      });
    await fs.writeFile(transPath,JSON.stringify(currTranslation,null,2));
    console.log(`${transPath} updated`);
  }

};

const renderPug = async ({source,destination,options={suppressStack:true}}) => {
  const template = await getTemplate(source);
  try{
    console.log('original source',source);
    console.log('manipulated filename',source);
    const html = pug.render(template,{pretty:true,...options,filename:source,basedir:path.dirname(process.argv[1])})
    await outputPug(html,destination);
    return html;
  }catch(err){
    if(err.message.endsWith('kScript mixin already used. Kscript should be the final mixin used in the sheet code.')){
      console.log('\x1b[31m%s\x1b[0m',
      '================================\n==== K-scaffold PARSE ERROR ====\n================================');
      console.log('kScript mixin already used. Kscript should be the final mixin used in the sheet code.');
    }else{
      console.log('\x1b[31m%s\x1b[0m',
        '=========================\n==== PUG PARSE ERROR ====\n=========================');
      if(options.suppressStack){
        console.error(err.message)
      }else{
        console.log('showing full err');
        console.error(err);
      }
    }
  }
};

const renderSASS = async ({source,destination,options={}}) => {
  const dirname = path.dirname(process.argv[1]);
  const compileOptions = {
    charset:false,
    importers: [
      {
        findFileUrl(url) {
          if(!url.startsWith('k/')) return null;
          const sub = url.substring(2);
          const fileURL = pathToFileURL('node_modules/k-scaffold');
          const newURL = new URL(sub, pathToFileURL('node_modules/k-scaffold/'));
          return newURL;
        }
      }
    ]
  };
  const currOptions = {...options};
  if(currOptions.importers){
    compileOptions.importers.push(...currOptions.importers);
    delete currOptions.importers;
  }
  Object.assign(compileOptions,currOptions);

  const {css} = await sass.compileAsync(source,compileOptions);
  if(destination){
    await fs.writeFile(destination,css);
    console.log(`CSS written to ${destination}`);
  }

  return css
};

const renderAll = async ({source ='./',destination,pugOptions={suppressStack:true},scssOptions={}}) => {
  const sourceDir = path.dirname(source);
  const destDir = path.dirname(destination);
  const files = await fs.opendir(source);
  const pugOutput = [];
  const scssOutput = [];
  for await (entry of files){
    if(entry.isFile()){
      const resSource = path.resolve(source,entry.name);
      const resDest = destination ?
        path.resolve(destination,entry.name.replace(/\.pug$/,'.html').replace(/\.scss$/,'.css')) :
        undefined;
      if(entry.name.endsWith('.scss')){
        console.log(`Processing ${entry.name}`);
        const newSass = await renderSASS({source:resSource,destination:resDest,options:scssOptions});
        scssOutput.push(newSass);
      }
      if(entry.name.endsWith('.pug')){
        console.log(`Processing ${entry.name}`);
        const newPug = await renderPug({source:resSource,destination:resDest,options:pugOptions});
        pugOutput.push(newPug);
      }
    }
  }
  return [pugOutput,scssOutput];
};

module.exports = {
  pug:renderPug,
  scss:renderSASS,
  all:renderAll
};