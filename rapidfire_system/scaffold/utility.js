/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//sanitizes text for use as a regex
sanitizeForRegex = function(text){
  return text.replace(/\.|\||\(|\)|\[|\]|\-|\+|\?|\/|\{|\}|\^|\$|\*/g,'\\$&');
};
//converts a value to a number, it's default value, or 0
const value = function(val,def){
  return (+val||def||0);
};

//extracts the section, rowID, and field name from a repeating attribute name
/*
e.g. repeating_equipment_-09Jhu89z_bulk would give:
section: equipment
rowID: -09Jhu89z
field: bulk
*/
const parseRepeatName = function(string){
  let match = string.match(/(repeating_[^_]+)_([^_]+)(?:_(.+))?/);
  match.shift();
  return match;
};

//Parses out the components of a trigger name. Giving:
//section: e.g repeating_inventory
//rowID: e.g. -189Jlkjw-89
//Field: e.g. strength
//section and rowID may return as undefined
const parseTriggerName = function(string){
  let match = string.replace(/^clicked:/,'').match(/(?:(repeating_[^_]+)_([^_]+)_)?(.+)/);
  match.shift();
  return match;
};
const parseClickTrigger = parseTriggerName;

//parses out the attribute name from the htmlattribute name property
const parseHTMLName = function(string){
  let match = string.match(/(?:attr|act|roll)_(.+)/);
  match.shift();
  return match[0];
};

//Capitalize each word in a string
const capitalize = function(string){
  return string.replace(/(?:^|\s+|\/)[a-z]/ig,(letter)=>letter.toUpperCase());
};

//extracts a roll query result for use in later functions
const extractQueryResult = async function(query){
	debug('entering extractQueryResult');
	let queryRoll = await startRoll(`!{{query=[[0[response=?{${query}}]]]}}`);
	finishRoll(queryRoll.rollId);
	return queryRoll.results.query.expression.replace(/^.+?response=|\]$/g,'');
};

//Simulates a query for ensuring that async/await works correctly in the sheetworker environment
const pseudoQuery = async function(value){
	debug('entering pseudoQuery');
	let queryRoll = await startRoll(`!{{query=[[0[response=${value}]]]}}`);
	finishRoll(queryRoll.rollId);
	return queryRoll.results.query.expression.replace(/^.+?response=|\]$/g,'');
};

//# Utility Functions #
const log = function(msg){
  if(typeof msg === 'string'){
    console.log(`%c${sheetName} log| ${msg}`,"background-color:#159ccf");
  }else if(typeof msg === 'object'){
    Object.keys(msg).forEach((m)=>{
      if(typeof msg[m] === 'string'){
        console.log(`%c${sheetName} log| ${m}: ${msg[m]}`,"background-color:#159ccf");
      }else{
        console.log(`%c${sheetName} log| ${typeof msg[m]} ${m}`,"background-color:#159ccf");
        console.table(msg[m]);
      }
    });
  }
};
const debug = function(msg,force){
  if(!debugMode && !force && version > 0) return;
  if(typeof msg === 'string'){
    console.log(`%c${sheetName} DEBUG| ${msg}`,"background-color:tan;color:red;");
  }else if(typeof msg === 'object'){
    Object.keys(msg).forEach((m)=>{
      if(typeof msg[m] === 'string'){
        console.log(`%c${sheetName} DEBUG| ${m}: ${msg[m]}`,"background-color:tan;color:red;");
      }else{
        console.log(`%c${sheetName} DEBUG| ${typeof msg[m]} ${m}`,"background-color:tan;color:red;font-weight:bold;");
        console.table(msg[m]);
      }
    });
  }
};

//Section ordering
//orders the section id arrays to match the repOrder attribute
const orderSections = function(attributes,sections){
  Object.keys(sections).forEach((section)=>{
    attributes.attributes[`_reporder_${section}`] = commaArray(attributes[`_reporder_${section}`]);
    orderSection(attributes.attributes[`_reporder_${section}`],sections[section]);
  });
};
//orders a single ID array
const orderSection = function(repOrder,IDs=[]){
  IDs.sort((a,b)=>{
    return repOrder.indexOf(a.toLowerCase()) - repOrder.indexOf(b.toLowerCase());
  });
};
//splits a comma delimited string into an array
const commaArray = function(string=''){
  return string.toLowerCase().split(/\s*,\s*/);
};
//Creates a row ID specific for an add section for pseudo nested repeating sections
const generateCustomID = function(string,rowID){
  rowID = rowID || generateRowID();
  let re = new RegExp(`^.{${string.length}}`);
  return `${string}${rowID.replace(re,'')}`;
};