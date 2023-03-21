/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
docs.js['k.sanitizeForRegex'] = {
  type:'function',
  invocation:`k.sanitizeForRegex(text)`,
  description:'Replaces problem characters to use a string as a regex.',
  arguments:[
    {type:'string',name:'text',description:'The text to replace characters in.'}
  ]
};
const sanitizeForRegex = function(text){
  return text.replace(/\.|\||\(|\)|\[|\]|\-|\+|\?|\/|\{|\}|\^|\$|\*/g,'\\$&');
};
kFuncs.sanitizeForRegex = sanitizeForRegex;

docs.js['k.value'] = {
  type:'function',
  invocation:`k.value(val,def)`,
  description:'Converts a value to a number, it\'s default value, or `0` if no default value passed.',
  arguments:[
    {type:'any',name:'val',description:'The value to coerce into a number.'},
    {type:'number',name:'def',description:'A default value to use, if not passed, 0 is used instead.'}
  ]
};
const value = function(val,def){
  return (+val||def||0);
};
kFuncs.value = value;

docs.js['k.parseRepeatName'] = {
  type:'function',
  invocation:`k.parseRepeatName(string)`,
  description:'Extracts the section (e.g. `repeating_equipment`), rowID (e.g `-;lkj098J:LKj`), and field name (e.g. `bulk`) from a repeating attribute name.',
  arguments:[
    {type:'string',name:'string',description:'The attribute name to parse.'}
  ],
  retValue:{
    type:'array',
    description:'For a repeating attribute named `repeating_equipment_-LKJhpoi98;lj_weight`, the array will be `[\'repeating_equipment\',\'-LKJhpoi98;lj\',\'weight\']`.'
  }
};
const parseRepeatName = function(string){
  let match = string.match(/(repeating_[^_]+)_([^_]+)(?:_(.+))?/);
  match.shift();
  return match;
};
kFuncs.parseRepeatName = parseRepeatName;

docs.js['k.parseTriggerName'] = {
  type:'function',
  invocation:`k.parseTriggerName(string)`,
  description:'Parses out the components of a trigger name similar to [parseRepeatName](#parserepeatname). Aliases: parseClickTrigger.\n\nAliases: `k.parseClickTrigger`',
  arguments:[
    {type:'string',name:'string',description:'The triggerName property of the [event](https://wiki.roll20.net/Sheet_Worker_Scripts#eventInfo_Object).'}
  ],
  retValue:{
    type:'array',
    description:'For a repeating button named `repeating_equipment_-LKJhpoi98;lj_roll`, the array will be `[\'repeating_equipment\',\'-LKJhpoi98;lj\',\'roll\']`. For a non repeating button named `roll`, the array will be `[undefined,undefined,\'roll\']`'
  }
};
const parseTriggerName = function(string){
  let match = string.replace(/^clicked:/,'').match(/(?:(repeating_[^_]+)_([^_]+)_)?(.+)/);
  match.shift();
  return match;
};
kFuncs.parseTriggerName = parseTriggerName;
const parseClickTrigger = parseTriggerName;
kFuncs.parseClickTrigger = parseClickTrigger;

docs.js['k.parseHTMLName'] = {
  type:'function',
  invocation:`k.parseHTMLName(string)`,
  description:'Parses out the attribute name from the htmlattribute name.',
  arguments:[
    {type:'string',name:'string',description:'The triggerName property of the [event](https://wiki.roll20.net/Sheet_Worker_Scripts#eventInfo_Object).'}
  ],
  retValue:{
    type:'array',
    description:'For a repeating button named `act_repeating_equipment_-LKJhpoi98;lj_roll`, the array will be `[\'repeating_equipment\',\'-LKJhpoi98;lj\',\'roll\']`. For a non repeating button named `act_roll`, the array will be `[undefined,undefined,\'roll\']`'
  }
};
const parseHTMLName = function(string){
  let match = string.match(/(?:attr|act|roll)_(.+)/);
  match.shift();
  return match[0];
};
kFuncs.parseHTMLName = parseHTMLName;

docs.js['k.capitalize'] = {
  type:'function',
  invocation:`k.capitalize(string)`,
  description:'Capitalize each word in a string.',
  arguments:[
    {type:'string',name:'string',description:'The string to capitalize'},
  ],
  retValue:{
    type:'string',
    description:'The capitalized string'
  }
};
const capitalize = function(string){
  return string.replace(/(?:^|\s+|\/)[a-z]/ig,(letter)=>letter.toUpperCase());
};
kFuncs.capitalize = capitalize;

docs.js['k.extractQueryResult'] = {
  type:'function',
  invocation:`k.extractQueryResult(section,sections,customText)`,
  description:'Extracts a roll query result for use in later functions. Must be awaited as per [startRoll documentation](https://wiki.roll20.net/Sheet_Worker_Scripts#Roll_Parsing.28NEW.29). Stolen from [Oosh\'s Adventures with Startroll thread](https://app.roll20.net/forum/post/10346883/adventures-with-startroll).',
  arguments:[
    {type:'string',name:'query',description:'The query should be just the text as the `?{` and `}` at the start/end of the query are added by the function.'}
  ],
  retValue:{
    type:'string',
    description:'The selected value from the roll query'
  }
};
const extractQueryResult = async function(query){
	debug('entering extractQueryResult');
	let queryRoll = await startRoll(`!{{query=[[0[response=?{${query}}]]]}}`);
	finishRoll(queryRoll.rollId);
	return queryRoll.results.query.expression.replace(/^.+?response=|\]$/g,'');
};
kFuncs.extractQueryResult = extractQueryResult;

docs.js['k.pseudoQuery'] = {
  type:'function',
  invocation:`k.pseudoQuery(section,sections,customText)`,
  description:'Simulates a query for ensuring that async/await works correctly in the sheetworker environment when doing conditional startRolls. E.g. if you have an if/else and only one of the conditions results in `startRoll` being called (and thus an `await`), the sheetworker environment would normally crash. Awaiting this in the condition that does not actually need to call `startRoll` will keep the environment in sync.',
  arguments:[
    {type:'number|string',name:'value',description:'The value to return. Optional.'}
  ],
  retValue:{
    type:'string',
    description:'The `value` passed to the function is returned after startRoll resolves.'
  }
};
const pseudoQuery = async function(value){
	debug('entering pseudoQuery');
	let queryRoll = await startRoll(`!{{query=[[0[response=${value}]]]}}`);
	finishRoll(queryRoll.rollId);
	return queryRoll.results.query.expression.replace(/^.+?response=|\]$/g,'');
};
kFuncs.pseudoQuery = pseudoQuery;

docs.js['k.log'] = {
  type:'function',
  invocation:`k.log(msg)`,
  description:'An alias for console.log.',
  arguments:[
    {type:'string|object|array',name:'msg',description:'The message can be a straight string, an object, or an array. If it is an object or array, the object will be broken down so that each key is used as a label to output followed by the value of that key. If the value of the key is an object or array, it will be output via `console.table`.'}
  ]
};
const log = function(msg){
  if(typeof msg === 'string'){
    console.log(`%c${kFuncs.sheetName} log| ${msg}`,"background-color:#159ccf");
  }else if(typeof msg === 'object'){
    Object.keys(msg).forEach((m)=>{
      if(typeof msg[m] === 'string'){
        console.log(`%c${kFuncs.sheetName} log| ${m}: ${msg[m]}`,"background-color:#159ccf");
      }else{
        console.log(`%c${kFuncs.sheetName} log| ${typeof msg[m]} ${m}`,"background-color:#159ccf");
        console.table(msg[m]);
      }
    });
  }
};
kFuncs.log = log;

docs.js['k.debug'] = {
  type:'function',
  invocation:`k.debug(msg,force)`,
  description:'Alias for console.log that only triggers when debug mode is enabled or when the sheet\'s version is `0`.',
  arguments:[
    {type:'string',name:'setObj',description:'See [k.log](#klog)'},
    {type:'boolean',name:'force',description:'Pass as a truthy value to force the debug output to be output to the console regardless of debug mode.'}
  ]
};
const debug = function(msg,force){
  if(!kFuncs.debugMode && !force && kFuncs.version > 0) return;
  if(typeof msg === 'string'){
    console.log(`%c${kFuncs.sheetName} DEBUG| ${msg}`,"background-color:tan;color:red;");
  }else if(typeof msg === 'object'){
    Object.keys(msg).forEach((m)=>{
      if(typeof msg[m] === 'string'){
        console.log(`%c${kFuncs.sheetName} DEBUG| ${m}: ${msg[m]}`,"background-color:tan;color:red;");
      }else{
        console.log(`%c${kFuncs.sheetName} DEBUG| ${typeof msg[m]} ${m}`,"background-color:tan;color:red;font-weight:bold;");
        console.table(msg[m]);
      }
    });
  }
};
kFuncs.debug = debug;

docs.js['k.orderSections'] = {
  type:'function',
  invocation:`k.orderSections(attributes,sections)`,
  description:'Orders the section id arrays for all sections in the `sections` object to match the repOrder attribute.',
  arguments:[
    {type:'object',name:'attributes',description:'The attributes object that must have a value for the reporder for each section.'},
    {type:'object',name:'sections',description:'Object containing the IDs for the repeating sections, indexed by repeating section name.'}
  ]
};
const orderSections = function(attributes,sections){
  Object.keys(sections).forEach((section)=>{
    attributes.attributes[`_reporder_${section}`] = commaArray(attributes[`_reporder_${section}`]);
    orderSection(attributes.attributes[`_reporder_${section}`],sections[section]);
  });
};
kFuncs.orderSections = orderSections;

docs.js['k.orderSection'] = {
  type:'function',
  invocation:`k.orderSection(repOrder,IDs)`,
  description:'Orders a single ID array.',
  arguments:[
    {type:'array',name:'setObj',description:'Array of IDs in the order they are in on the sheet.'},
    {type:'array',name:'vocal',description:'Array of IDs to be ordered.'}
  ]
};
const orderSection = function(repOrder,IDs=[]){
  IDs.sort((a,b)=>{
    return repOrder.indexOf(a.toLowerCase()) - repOrder.indexOf(b.toLowerCase());
  });
};
kFuncs.orderSection = orderSection;

/**
 * Splits a comma delimited string into an array
 * @param {string} [string='']
 * @returns {string[]}
 */
docs.js['k.commaArray'] = {
  type:'function',
  invocation:`k.commaArray(string)`,
  description:'Splits a comma delimited string into an array',
  arguments:[
    {type:'string',name:'setObj',description:'The string to split.'}
  ],
  retValue:{
    type:'array',
    description:'The string segments of the comma delimited list.'
  }
};
const commaArray = function(string=''){
  return string.toLowerCase().split(/\s*,\s*/);
};
kFuncs.commaArray = commaArray;