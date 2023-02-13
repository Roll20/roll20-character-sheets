/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033,-*/
//# Roll20Async functions #
//These together allow the use of promises and await/async to allow us to escape callback hell
const setActiveCharacterId = function(charId){
  var oldAcid=getActiveCharacterId();
  var ev = new CustomEvent("message");
  ev.data={"id":"0", "type":"setActiveCharacter", "data":charId};
  self.dispatchEvent(ev); 
  return oldAcid;
};
const _getAttrs = function (props){
  var acid=getActiveCharacterId();//save the current activeCharacterID in case it has changed when the promise runs 
  var prevAcid=null;              //local variable defined here, because it needs to be shared across the promise callbacks defined below
  return new Promise((resolve,reject)=>{
    prevAcid=setActiveCharacterId(acid);  //in case the activeCharacterId has changed, restore it to what we were expecting and save the current value to restore later
    try{
        getAttrs(props,(values)=>{  resolve(values); }); 
    }catch{ reject(); }
  }).finally(()=>{
      setActiveCharacterId(prevAcid); //restore activeCharcterId to what it was when the promise first ran
  });
};
const _getAllAttrs = async function(props=baseGet,sectionDetails=repeatingSectionDetails){
  const [repeats,sections] = await _getSections(sectionDetails);
  const attributes = await _getAttrs([...props,...repeats]);
  const casc = expandCascade(cascades,sections,attributes);
  return [attributes,repeats,sections,casc];
}
//use the same pattern for each of the following...
const _setAttrs = function (propObj, options){
  var acid=getActiveCharacterId(); 
  var prevAcid=null;               
  return new Promise((resolve,reject)=>{
    prevAcid=setActiveCharacterId(acid);  
    try{
        setAttrs(propObj,options,(values)=>{ resolve(values); });
    }
    catch{ reject(); }
  }).finally(()=>{
      setActiveCharacterId(prevAcid); 
  });
};
const _getSectionIDs = function(sectionName){
  var acid=getActiveCharacterId(); 
  var prevAcid=null;               
  return new Promise((resolve,reject)=>{
    prevAcid=setActiveCharacterId(acid);  
    try{
        getSectionIDs(sectionName,(values)=>{ resolve(values); });
    }
    catch{ reject(); }
  }).finally(()=>{
      setActiveCharacterId(prevAcid); 
  });
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
const _getSections = function(section_details){
  let queue = _.clone(section_details);
  const worker = async (repeatAttrs=[],sections={})=>{
    let detail = queue.shift();
    let IDs = await _getSectionIDs(detail.section);
    sections[detail.section] = IDs;
    let attrs = IDs.forEach((i)=>{
      detail.fields.forEach((f)=>{
        repeatAttrs.push(`${detail.section}_${i}_${f}`);
      });
    });
    if(queue.length){
      return worker(repeatAttrs,sections);
    }else{
      return [repeatAttrs,sections];
    }
  };
  if(!queue[0]){
    return [[],{}];
  }
  return worker();
};
// Sets the attributes while always calling with {silent:true}
// Can be awaited to get the values returned from _setAttrs
const set = function(obj,vocal){
  let setObj = verifyObj(obj);
  return _setAttrs(setObj,{silent:vocal ? false : true});
};
//verifies that the property/keys of the setObj are valid
const verifyObj = function(obj){
  return Object.keys(obj).reduce((m,p)=>{
    if(obj[p] || obj[p]===0 || obj[p]===''){
      m[p]=obj[p];
    }else{
      debug(`WARNING: setObj[${p}] = ${obj[p]}`);
    }
    return m;
  },{})
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
  let match = string.match(/(repeating_[^_]+)_([^_]+)_(.+)/);
  match.shift();
  return match;
};

const checkRollLog = function(sections,attributes){
  debug({sections});
  return;
  sections.repeating_roll.forEach((id,index)=>{
    let row =`repeating_roll_${id}`;
    if(50 - index >=50 || (Date.now() - value(attributes[`${row}_date`])) > (1000*60*60*24)){
      removeRepeatingRow(row);
      delete attributes[`${row}_date`];
      delete attributes[`${row}_json`];
    }
  });
};

const parseClickTrigger = function(string){
  let match = string.match(/clicked:(?:(repeating_[^_]+)_([^_]+)_)?(.+)/);
  match.shift();
  return match;
};

//Sheet Updaters and styling functions
const updateSheet = async function(){
  const [attributes,repeats,sections] = await _getAllAttrs(['sheet_version','debug_mode',...baseGet]);
  debugMode = !debugMode ? !!attributes.debug_mode : debugMode;
  const setObj = {
    sheet_version:version,
  };
  if(!value(attributes.sheet_version)){
    initialSetup(attributes,setObj,sections);
  }
  log(`Sheet Update applied. Current Sheet Version ${version}`);
  styleOnOpen(attributes);
  set(setObj);
};
const initialSetup = function(attributes,setObj,sections){
  debug('Initial sheet setup');
  ['exertion_max','move_speed','reaction_defense','cognitive_resistance'].forEach((attr)=>{
    setObj[attr] = cascades[attr].calculation(_.clone(cascades[attr]),attributes,setObj,sections);
    debug(`default for ${attr} applied`);
  });
  ['negotiation/persuade_mod','fashion/etiquette_mod','leadership_mod','disguise/blend_in_mod','intimidate/taunt_mod','showmanship_mod','resist_distress_mod','cognitive_resistance','initiative_mod','intuition_mod','occult/scp_lore_mod'].forEach((skill)=>{
    setObj[`${skill}`] = actionModCalc({name:`${skill}`},attributes,setObj,sections);
    debug({[`${skill}`]:setObj[`${skill}_mod`]});
  });
  debug({appearance:attributes.appearance,reasoning:attributes.reasoning});
  setObj.operative_id = getActiveCharacterId();
};
const styleOnOpen = function(attributes){
  styleSecurity({},attributes);
  sectionDisplay({},attributes);
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
    sections[section].forEach((id)=>{
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

const checkNumber = function(name,casc,attributes,setObj){
  if(!casc[name] || casc[name].type!=='number') return;
  const re = /[^\-\d\.]/g;
  if(re.test(attributes[name])){
    setObj[name] = attributes[name].replace(re,'');
    attributes[name] = setObj[name];
  }
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