/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//# Attribute Obj Proxy handler
const createAttrProxy = function(attributes){
  //creates a proxy for the attributes object so that values can be worked with more easily.
  const attrTarget = {
    updates:{},
    attributes:{...attributes},
    repOrders:{}
  };
  const attrHandler = {
    get:function(obj,prop){//gets the most value of the attribute.
      //If it is a repeating order, returns the array, otherwise returns the update value or the original value
      if(prop === 'set'){
        return function(){
          set(obj.updates,...arguments);
        }
      }else if(Object.keys(obj).some(key=>key===prop)){ 
        return Reflect.get(...arguments)
      }else{
        let retValue;
        switch(true){
          case obj.repOrders.hasOwnProperty(prop):
            retValue = obj.repOrders[prop];
            break;
          case obj.updates.hasOwnProperty(prop):
            retValue = obj.updates[prop];
            break;
          default:
            retValue = obj.attributes[prop];
            break;
        }
        let cascRef = prop.replace(/(repeating_[^_]+_)[^_]+/,'$1\$x');
        let numRetVal = +retValue;
        if(!Number.isNaN(numRetVal)){
          retValue = numRetVal;
        }else if(cascades[cascRef] && cascades[cascRef].type === 'number'){
          retValue = cascades[cascRef].defaultValue || 0;
        }
        return retValue;
      }
    },
    set:function(obj,prop,value){
      //Sets the value. Also verifies that the value is a valid attribute value
      //e.g. not undefined, null, or NaN
      if(value || value===0 || value===''){
        if(/reporder|^repeating_[^_]+$/.test(prop)){
          let section = prop.replace(/_reporder_/,'');
          obj.repOrders[section] = value;
        }else{
          obj.updates[prop] = value;
        }
      }else{
        debug(`!!!Warning: Attempted to set ${prop} to an invalid value:${value}; value not stored!!!`);
      }
      return true;
    },
    deleteProperty(obj,prop){
      //removes the property from the original attributes, updates, and the reporders
      Object.keys(obj).forEach((key)=>{
        delete obj[key][prop.toLowerCase()];
      });
    }
  };
  return new Proxy(attrTarget,attrHandler);
};

const _setSectionOrder = function(section,order){
  let trueSection = section.replace(/repeating_/,'');
  setSectionOrder(trueSection,order);
};
const _removeRepeatingRow = function(row,attributes,sections){
  debug(`removing ${row}`);
  Object.keys(attributes.attributes).forEach((key)=>{
    if(key.startsWith(row)){
      delete attributes[key];
    }
  });
  let [,section,rowID] = row.match(/(repeating_[^_]+)_(.+)/,'');
  sections[section] = sections[section].filter((id)=>id!==rowID);
  removeRepeatingRow(row);
};
const _getAttrs = function(props=baseGet,callback){
  getAttrs(props,(values)=>{
    const attributes = createAttrProxy(values);
    callback(attributes);
  });
};
const getAllAttrs = function({callback,props=baseGet,sectionDetails=repeatingSectionDetails}){
  getSections(sectionDetails,(repeats,sections)=>{
    getAttrs([...props,...repeats],(values)=>{
      const attributes = createAttrProxy(values);
      orderSections(attributes,sections);
      const casc = expandCascade(cascades,sections,attributes);
      callback(attributes,sections,casc);
    })
  });
};
const getSections = function(section_details,callback){
  let queueClone = _.clone(section_details);
  const worker = (queue,repeatAttrs=[],sections={})=>{
    let detail = queue.shift();
    getSectionIDs(detail.section,(IDs)=>{
      sections[detail.section] = IDs;
      IDs.forEach((id)=>{
        detail.fields.forEach((f)=>{
          repeatAttrs.push(`${detail.section}_${id}_${f}`);
        });
      });
      repeatAttrs.push(`_reporder_${detail.section}`);
      if(queue.length){
        worker(queue,repeatAttrs,sections);
      }else{
        callback(repeatAttrs,sections);
      }
    });
  };
  if(!queueClone[0]){
    callback([],{});
  }
  worker(queueClone);
};
// Sets the attributes while always calling with {silent:true}
// Can be awaited to get the values returned from _setAttrs
const set = function(obj,vocal=false){
  setAttrs(obj,{silent:!vocal});
};
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

const parseTriggerName = function(string){
  let match = string.match(/(?:(repeating_[^_]+)_([^_]+)_)?(.+)/);
  match.shift();
  return match;
};

const parseClickTrigger = function(string){
  let match = string.match(/clicked:(?:(repeating_[^_]+)_([^_]+)_)?(.+)/);
  match.shift();
  return match;
};

const parseHTMLName = function(string){
  let match = string.match(/(?:attr|act|roll)_(.+)/);
  match.shift();
  return match[0];
};

const capitalize = function(string){
  return string.replace(/(?:^|\s+|\/)[a-z]/ig,(letter)=>letter.toUpperCase());
};

const extractQueryResult = async function(query){
	debug('entering extractQueryResult');
	let queryRoll = await startRoll(`!{{query=[[0[response=?{${query}}]]]}}`);
	finishRoll(queryRoll.rollId);
	return queryRoll.results.query.expression.replace(/^.+?response=|\]$/g,'');
};

const pseudoQuery = async function(value){
	debug('entering pseudoQuery');
	let queryRoll = await startRoll(`!{{query=[[0[response=${value}]]]}}`);
	finishRoll(queryRoll.rollId);
	return queryRoll.results.query.expression.replace(/^.+?response=|\]$/g,'');
};

//Determines which penalty to apply (if any)
const determinePenalty = function(type,attributes,sections){
  let damageID = sections[`repeating_${type}`].find((id)=> attributes[`repeating_${type}_${id}_damaged`] === 1);
  return damageID ?  attributes[`repeating_${type}_${damageID}_penalty`] : 0;
};

//determines which health track's penalties should affect an attribute
const determineHealthType = function(section,field){
  const attrCharacterLookup = {
    'situational-awareness':'structure',
    'remnant-initiative':'structure',
    'assault-roll':'structure',
    'strike-roll':'structure',
    'motion-roll':'structure',
    repeating_drone:'structure',
    'repeating_remnant-weapon':'structure'
  };
  return attrCharacterLookup[section] || attrCharacterLookup[field] || 'health';
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

//Sheet Updaters and styling functions
const updateSheet = function(){
  debug('updating sheet');
  getAllAttrs({props:['sheet_version','debug_mode','collapsed',...baseGet],callback:(attributes,sections,casc)=>{
    debugMode = !!attributes.debug_mode;
    attributes.sheet_version = version;
    if(!attributes.sheet_version){
      initialSetup(attributes,sections);
    }
    log(`Sheet Update applied. Current Sheet Version ${version}`);
    styleOnOpen(attributes,sections);
    setActionCalls({},attributes,sections);
    attributes.set();
    log('Sheet ready for use');
  }})
};
const initialSetup = function(attributes,sections){
  debug('Initial sheet setup');
};
const styleOnOpen = function(attributes,sections){
  navigateSheet({triggerName:`clicked:${attributes.sheet_state}`});
  setupSystem({},attributes,sections);
};

/*
Cascade Expansion functions
*/
//Expands the repeating section templates in cascades to reflect the rows actually available
const expandCascade = function(cascade,sections,attributes){
  return _.keys(cascade).reduce((memo,key)=>{//iterate through cascades and replace references to repeating attributes with correct row ids.
    if(/^repeating/.test(key)){//If the attribute is a repeating attribute, do special logic
      expandRepeating(memo,key,cascade,sections,attributes);
    }else{//for non repeating attributes do this logic
      expandNormal(memo,key,cascade,sections);
    }
    return memo;
  },{});
};

const expandRepeating = function(memo,key,cascade,sections,attributes){
  key.replace(/(repeating_[^_]+)_[^_]+?_(.+)/,(match,section,field)=>{
    (sections[section]||[]).forEach((id)=>{
      memo[`${section}_${id}_${field}`]=_.clone(cascade[key]);//clone the details so that each row's attributes have correct ids
      memo[`${section}_${id}_${field}`].name = `${section}_${id}_${field}`;
      memo[`${section}_${id}_${field}`].affects = memo[`${section}_${id}_${field}`].affects.reduce((m,affected)=>{
        if(section === affected){//otherwise if the affected attribute is in the same section, simply set the affected attribute to have the same row id.
          m.push(applyID(affected,id));
        }else if(/repeating/.test(affected)){//If the affected attribute isn't in the same repeating section but is still a repeating attribute, add all the rows of that section
          addAllRows(affected,m,sections);
        }else{//otherwise the affected attribute is a non repeating attribute. Simply add it to the computed affected array
          m.push(affected);
        }
        return m;
      },[]);
    });
  });
};

const applyID = function(affected,id){
  return affected.replace(/(repeating_[^_]+_)[^_]+(.+)/,`$1${id}$2`);
};

const expandNormal = function(memo,key,cascade,sections){
  memo[key] = _.clone(cascade[key]);
  memo[key].affects = memo[key].affects.reduce((m,a)=>{
    if(/^repeating/.test(a)){
      addAllRows(a,m,sections);
    }else{
      m.push(a);
    }
    return m;
  },[]);
};

const triggerFunctions = function(obj,attributes,sections){
  debug(`triggering functions for ${obj.name}`);
  obj.triggeredFuncs && obj.triggeredFuncs.forEach(func=>func(obj,attributes,sections));
};

const initialFunction = function(obj,attributes,sections){
  debug(`initial functions for ${obj.name}`);
  obj.initialFunc && obj.initialFunc(obj,attributes,sections);
};

const addAllRows = function(affected,memo,sections){
  affected.replace(/(repeating_[^_]+?)_[^_]+?_(.+)/,(match,section,field)=>{
    sections[section].forEach(id=>memo.push(`${section}_${id}_${field}`));
  });
};

let clickDelay = 500;
const defaultThrottle = callback => _.throttle(callback,clickDelay,{trailing:false});
const isDieRoll = function(field){
  return /(?:d(?:8|10|12)(?:Crit)?|exertion)/.test(field);
};