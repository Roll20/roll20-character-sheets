/* beautify preserve:start */

"use strict";

const silent = {silent:true};

//-------------------------------------------------------------------------------------
// orcsAsync - https://github.com/onyxring/orcsAsync
// Compensates for a defect in the underlying Roll20 system, where it "loses context"
// (forgets which player is active) during asynchronous methods and callbacks, 
// resulting in error messages like:
//
//      Error: Trying to do getAttrs when no character is active in sandbox.
//
// Include this script at the top of your character sheet's code setion to have 
// setTimeout() and setInterval() just start working as expected; no additional setup
// required.  Additionally, async-safe versions of the typical attribute functions will 
// be available:
//
//      getAttrsAsync
//      setAttrsAsync
//      getSectionIDsAsync
//      
function isRunningOnServer() { return self.dispatchEvent == undefined; }
function setActiveCharacterId(charId){
    var oldAcid=getActiveCharacterId();
    var msg={"id":"0", "type":"setActiveCharacter", "data":charId};
    
    if(isRunningOnServer()==false){ //if in a browser, use "dispatchEvent" to process the message
        var ev = new CustomEvent("message");
        ev.data=msg; 
        self.dispatchEvent(ev);
    }else{ //otherwise, use the API (server) message processor, "onmessage"
        self.onmessage({data:msg});
    }
    return oldAcid; //return what the value used to be, so calling code can be a little cleaner 
} 
/*
var _sIn=setInterval;
setInterval=function(callback, timeout){
    var acid=getActiveCharacterId();
    _sIn(
        function(){
            var prevAcid=setActiveCharacterId(acid);
            callback();
            setActiveCharacterId(prevAcid);
        }
    ,timeout);
}
var _sto=setTimeout
setTimeout=function(callback, timeout){
    var acid=getActiveCharacterId();
    _sto(
        function(){
            var prevAcid=setActiveCharacterId(acid);
            callback();
            setActiveCharacterId(prevAcid);
        }
    ,timeout);
}
*/
function getAttrsAsync(props){
    var acid=getActiveCharacterId(); //save the current activeCharacterID in case it has changed when the promise runs 
    var prevAcid=null;               //local variable defined here, because it needs to be shared across the promise callbacks defined below
    return new Promise((resolve,reject)=>{
            prevAcid=setActiveCharacterId(acid);  //in case the activeCharacterId has changed, restore it to what we were expecting and save the current value to restore later
            try{
                getAttrs(props,(values)=>{  resolve(values); }); 
            }
            catch{ reject(); }
    }).finally(()=>{
        setActiveCharacterId(prevAcid); //restore activeCharcterId to what it was when the promise first ran
    });
}
//use the same pattern for each of the following...
function setAttrsAsync(propObj, options){
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
}

function getSectionIDsAsync(sectionName){
    var acid = getActiveCharacterId(); 
    var prevAcid=null;               
    return new Promise((resolve,reject)=>{
            prevAcid = setActiveCharacterId(acid);  
            try{
                getSectionIDs(sectionName,(values)=>{ resolve(values); });
            }
            catch{ reject(); }
    }).finally(()=>{
        setActiveCharacterId(prevAcid); 
    });
}

function getSingleAttrAsync(prop){ 
var acid=getActiveCharacterId(); 
var prevAcid=null;               
return new Promise((resolve,reject)=>{
       prevAcid=setActiveCharacterId(acid);  
       try{
           getAttrs([prop],(values)=>{  resolve(values[prop]); }); 
       }
       catch{ reject(); }
}).finally(()=>{
   setActiveCharacterId(prevAcid); 
});
}
/* END ASYNC FUNCTIONS */

/*
SPINES
*/

const mainAttributesArr = [
{name:"strength",attr:"strength",abbr:"strength-abbr",damage:"damage"},
{name:"strength_monster",attr:"strength_monster",abbr:"strength-abbr",damage:"damage"},
{name:"agility",attr:"agility",abbr:"agility-abbr",damage:"fatigue"},
{name:"wits",attr:"wits",abbr:"wits-abbr",damage:"coonfusion"},
{name:"empathy",attr:"empathy",abbr:"empathy-abbr",damage:"doubt"},
],
extraAttributesArr = [
{name:"instinct",attr:"empathy",abbr:"instinct-abbr",damage:"doubt"},
{name:"servos",attr:"strength",abbr:"servos-abbr",damage:"damage"},
{name:"stability",attr:"agility",abbr:"stability-abbr",damage:"damage"},
{name:"processor",attr:"wits",abbr:"processor-abbr",damage:"damage"},
{name:"network",attr:"empathy",abbr:"network-abbr",damage:"damage"}
],
attributesArr = [...mainAttributesArr, ...extraAttributesArr],
skillsArr = [
{id:"endure",name:"endure",label:"endure",level:"endure",attr_name:"strength",attr:"strength",misc:"endure_skill_misc",gear:"endure_gear_misc"},
{id:"force",name:"force",label:"force",level:"force",attr_name:"strength",attr:"strength",misc:"force_skill_misc",gear:"force_gear_misc"},
{id:"fight",name:"fight",label:"fight",level:"fight",attr_name:"strength",attr:"strength",misc:"fight_skill_misc",gear:"fight_gear_misc"},
{id:"sneak",name:"sneak",label:"sneak",level:"sneak",attr_name:"agility",attr:"agility",misc:"sneak_skill_misc",gear:"sneak_gear_misc"},
{id:"move",name:"move",label:"move",level:"move",attr_name:"agility",attr:"agility",misc:"move_skill_misc",gear:"move_gear_misc"},
{id:"shoot",name:"shoot",label:"shoot",level:"shoot",attr_name:"agility",attr:"agility",misc:"shoot_skill_misc",gear:"shoot_gear_misc"},
{id:"scout",name:"scout",label:"scout",level:"scout",attr_name:"wits",attr:"wits",misc:"scout_skill_misc",gear:"scout_gear_misc"},
{id:"comprehend",name:"comprehend",label:"comprehend",level:"comprehend",attr_name:"wits",attr:"wits",misc:"comprehend_skill_misc",gear:"comprehend_gear_misc"},
{id:"know_the_zone",name:"know the zone",label:"know-the-zone",level:"know_the_zone",attr_name:"wits",attr:"wits",misc:"know_the_zone_skill_misc",gear:"know_the_zone_gear_misc"},
{id:"sense_emotion",name:"sense emotion",label:"sense-emotion",level:"sense_emotion",attr_name:"empathy",attr:"empathy",misc:"sense_emotion_skill_misc",gear:"sense_emotion_gear_misc"},
{id:"manipulate",name:"manipulate",label:"manipulate",level:"manipulate",attr_name:"empathy",attr:"empathy",misc:"manipulate_skill_misc",gear:"manipulate_gear_misc"},
{id:"heal",name:"heal",label:"heal",level:"heal",attr_name:"empathy",attr:"empathy",misc:"heal_skill_misc",gear:"heal_gear_misc"},
{id:"know_nature",name:"know nature",label:"know-nature",level:"know_the_zone",attr_name:"instinct",attr:"empathy",misc:"know_the_zone_skill_misc",gear:"know_the_zone_gear_misc"},
{id:"sense_emotion_animal",name:"sense emotion animal",label:"sense-emotion-animal",level:"sense_emotion",attr_name:"instinct",attr:"empathy",misc:"sense_emotion_skill_misc",gear:"sense_emotion_gear_misc"},
{id:"dominate",name:"dominate",label:"dominate",level:"manipulate",attr_name:"instinct",attr:"empathy",misc:"manipulate_skill_misc",gear:"manipulate_gear_misc"},
{id:"overload",name:"overload",label:"overload",level:"endure",attr_name:"servos",attr:"strength",misc:"endure_skill_misc",gear:"endure_gear_misc"},
{id:"force_robot",name:"force",label:"force-robot",level:"force",attr_name:"servos",attr:"strength",misc:"force_skill_misc",gear:"force_gear_misc"},
{id:"assault",name:"assault",label:"assault",level:"fight",attr_name:"servos",attr:"strength",misc:"fight_skill_misc",gear:"fight_gear_misc"},
{id:"infiltrate",name:"infiltrate",label:"infiltrate",level:"sneak",attr_name:"stability",attr:"agility",misc:"sneak_skill_misc",gear:"sneak_gear_misc"},
{id:"move_robot",name:"move",label:"move-robot",level:"move",attr_name:"stability",attr:"agility",misc:"move_skill_misc",gear:"move_gear_misc"},
{id:"shoot_robot",name:"shoot",label:"shoot-robot",level:"shoot",attr_name:"stability",attr:"agility",misc:"shoot_skill_misc",gear:"shoot_gear_misc"},
{id:"scan",name:"scan",label:"scan",level:"scout",attr_name:"processor",attr:"wits",misc:"scout_skill_misc",gear:"scout_gear_misc"},
{id:"datamine",name:"datamine",label:"datamine",level:"comprehend",attr_name:"processor",attr:"wits",misc:"comprehend_skill_misc",gear:"comprehend_gear_misc"},
{id:"analyze",name:"analyze",label:"analyze",level:"know_the_zone",attr_name:"processor",attr:"wits",misc:"know_the_zone_skill_misc",gear:"know_the_zone_gear_misc"},
{id:"question",name:"question",label:"question",level:"sense_emotion",attr_name:"network",attr:"empathy",misc:"sense_emotion_skill_misc",gear:"sense_emotion_gear_misc"},
{id:"interact",name:"interact",label:"interact",level:"manipulate",attr_name:"network",attr:"empathy",misc:"manipulate_skill_misc",gear:"manipulate_gear_misc"},
{id:"repair",name:"repair",label:"repair",level:"heal",attr_name:"network",attr:"empathy",misc:"heal_skill_misc",gear:"heal_gear_misc"},
];
    
let race_att_names;

/* START RACE TYPE UPDATES */

  //object reference for Race specific attribute names

  //Upate sheet labels when chartype attribute changes
  on("change:chartype sheet:opened", function(eventInfo) {
      
        var character_types = {
          "Mutant":{  strength: getTranslationByKey("strength"),
                      agility: getTranslationByKey("agility"),
                      wits: getTranslationByKey("wits"),
                      empathy: getTranslationByKey("empathy"),
                      str:getTranslationByKey("strength-abbr"),
                      agi: getTranslationByKey("agility-abbr"),
                      wit: getTranslationByKey("wits-abbr"),
                      emp: getTranslationByKey("empathy-abbr"),
                      damage: getTranslationByKey("damage"),
                      fatigue: getTranslationByKey("fatigue"),
                      confusion: getTranslationByKey("confusion"),
                      doubt: getTranslationByKey("doubt"),
                      endure: getTranslationByKey("endure"),
                      force: getTranslationByKey("force"),
                      fight: getTranslationByKey("fight"),
                      sneak: getTranslationByKey("sneak"),
                      move: getTranslationByKey("move"),
                      shoot: getTranslationByKey("shoot"),
                      scout: getTranslationByKey("scout"),
                      comprehend: getTranslationByKey("comprehend"),
                      know_the_zone: getTranslationByKey("know-the-zone"),
                      sense_emotion: getTranslationByKey("sense-emotion"),
                      manipulate: getTranslationByKey("manipulate"),
                      heal: getTranslationByKey("heal") },
                      
          "Animal":{  strength: getTranslationByKey("strength"),
                      agility: getTranslationByKey("agility"),
                      wits: getTranslationByKey("wits"),
                      empathy: getTranslationByKey("instinct"),
                      str:getTranslationByKey("strength-abbr"),
                      agi: getTranslationByKey("agility-abbr"),
                      wit: getTranslationByKey("wits-abbr"),
                      emp: getTranslationByKey("instinct-abbr"),
                      damage: getTranslationByKey("damage"),
                      fatigue: getTranslationByKey("fatigue"),
                      confusion: getTranslationByKey("confusion"),
                      doubt: getTranslationByKey("doubt"),
                      endure: getTranslationByKey("endure"),
                      force: getTranslationByKey("force"),
                      fight: getTranslationByKey("fight"),
                      sneak: getTranslationByKey("sneak"),
                      move: getTranslationByKey("move"),
                      shoot: getTranslationByKey("shoot"),
                      scout: getTranslationByKey("scout"),
                      comprehend: getTranslationByKey("comprehend"),
                      know_the_zone: getTranslationByKey("know-nature"),
                      sense_emotion: getTranslationByKey("sense-emotion-animal"),
                      manipulate: getTranslationByKey("dominate"),
                      heal: getTranslationByKey("heal") },
            
          "Robot":{   strength: getTranslationByKey("servos"),
                      agility: getTranslationByKey("stability"),
                      wits: getTranslationByKey("processor"),
                      empathy: getTranslationByKey("network"),
                      str: getTranslationByKey("servos-abbr"),
                      agi: getTranslationByKey("stability-abbr"),
                      wit: getTranslationByKey("processor-abbr"),
                      emp: getTranslationByKey("network-abbr"),
                      damage: getTranslationByKey("damage"),
                      fatigue: getTranslationByKey("damage"),
                      confusion: getTranslationByKey("damage"),
                      doubt: getTranslationByKey("damage"),
                      endure: getTranslationByKey("overload"),
                      force: getTranslationByKey("force-robot"),
                      fight: getTranslationByKey("assault"),
                      sneak: getTranslationByKey("infiltrate"),
                      move: getTranslationByKey("move-robot"),
                      shoot: getTranslationByKey("shoot-robot"),
                      scout: getTranslationByKey("scan"),
                      comprehend: getTranslationByKey("datamine"),
                      know_the_zone: getTranslationByKey("analyze"),
                      sense_emotion: getTranslationByKey("question"),
                      manipulate: getTranslationByKey("interact"),
                      heal: getTranslationByKey("repair") },

          "Human":{   strength: getTranslationByKey("strength"),
                      agility: getTranslationByKey("agility"),
                      wits: getTranslationByKey("wits"),
                      empathy: getTranslationByKey("empathy"),
                      str: getTranslationByKey("strength-abbr"),
                      agi: getTranslationByKey("agility-abbr"),
                      wit: getTranslationByKey("wits-abbr"),
                      emp: getTranslationByKey("empathy-abbr"),
                      damage: getTranslationByKey("damage"),
                      fatigue: getTranslationByKey("fatigue"),
                      confusion: getTranslationByKey("confusion"),
                      doubt: getTranslationByKey("doubt"),
                      endure: getTranslationByKey("endure"),
                      force: getTranslationByKey("force"),
                      fight: getTranslationByKey("fight"),
                      sneak: getTranslationByKey("sneak"),
                      move: getTranslationByKey("move"),
                      shoot: getTranslationByKey("shoot"),
                      scout: getTranslationByKey("scout"),
                      comprehend: getTranslationByKey("comprehend"),
                      know_the_zone: getTranslationByKey("know-the-zone"),
                      sense_emotion: getTranslationByKey("sense-emotion"),
                      manipulate: getTranslationByKey("manipulate"),
                      heal: getTranslationByKey("heal") },
      };   
      
      getAttrs(["chartype"], function(values) {
                           
        // race_att_names;
          if (_.has(character_types, values.chartype) ) {
            race_att_names = character_types[values.chartype];
          } 
          else {
            race_att_names = character_types["Mutant"];
            setAttrs({chartype: "Mutant"});
          }
          setAttrs({strength_name: race_att_names.strength});
          setAttrs({agility_name: race_att_names.agility});
          setAttrs({wits_name: race_att_names.wits});
          setAttrs({empathy_name: race_att_names.empathy});
          setAttrs({strength_abbr: race_att_names.str});
          setAttrs({agility_abbr: race_att_names.agi});
          setAttrs({wits_abbr: race_att_names.wit});
          setAttrs({empathy_abbr: race_att_names.emp});
          setAttrs({damage_name: race_att_names.damage});
          setAttrs({fatigue_name: race_att_names.fatigue});
          setAttrs({confusion_name: race_att_names.confusion});
          setAttrs({doubt_name: race_att_names.doubt});
          setAttrs({endure_name: race_att_names.endure});
          setAttrs({force_name: race_att_names.force});
          setAttrs({fight_name: race_att_names.fight});
          setAttrs({sneak_name: race_att_names.sneak});
          setAttrs({move_name: race_att_names.move});
          setAttrs({shoot_name: race_att_names.shoot});
          setAttrs({scout_name: race_att_names.scout});
          setAttrs({comprehend_name: race_att_names.comprehend});
          setAttrs({know_the_zone_name: race_att_names.know_the_zone});
          setAttrs({sense_emotion_name: race_att_names.sense_emotion});
          setAttrs({manipulate_name: race_att_names.manipulate});
          setAttrs({heal_name: race_att_names.heal});
      });
  });

/* END RACE TYPE UPDATES */



/* Attributre damage const */
const attributes = {
    // an Object Literal: damages['strength'] returns 'damage', damages['empathy'] returns 'doubt', etc
    strength: "strength_total",
    agility: "agility_total",
    wits: "wits_total",
    empathy: "empathy_total",
  };


/* Attributre damage const */
const damages = {
    // an Object Literal: damages['strength'] returns 'damage', damages['empathy'] returns 'doubt', etc
    strength: "damage",
    agility: "fatigue",
    wits: "confusion",
    empathy: "doubt",
  };

/* Skill attributes, misc and gear */
const skills = {
  // a javascript Object Literal, containing each skill, and its corresponding skill
  endure: "strength_total",
  force: "strength_total",
  fight: "strength_total",
  sneak: "agility_total",
  Move: "agility_total",
  shoot: "agility_total",
  scout: "wits_total",
  comprehend: "wits_total",
  know_the_zone: "wits_total",
  sense_emotion: "empathy_total",
  manipulate: "empathy_total",
  heal: "empathy_total",
  know_nature: "wits_total",
  dominate: "empathy_total",
  overload: "strength_total",
  assault: "strength_total",
  infiltrate: "agility_total",
  scan: "wits_total",
  datamine: "wits_total",
  analyze: "wits_total",
  question: "empathy_total",
  interact: "empathy_total",
  repair: "empathy_total",
},
skillAttrs = {
  // a javascript Object Literal, containing each skill, and its corresponding attribute
  endure: "strength_total",
  force: "strength_total",
  fight: "strength_total",
  sneak: "agility_total",
  Move: "agility_total",
  shoot: "agility_total",
  scout: "wits_total",
  comprehend: "wits_total",
  know_the_zone: "wits_total",
  sense_emotion: "empathy_total",
  manipulate: "empathy_total",
  heal: "empathy_total",
  know_nature: "wits_total",
  dominate: "empathy_total",
  overload: "strength_total",
  assault: "strength_total",
  infiltrate: "agility_total",
  scan: "wits_total",
  datamine: "wits_total",
  analyze: "wits_total",
  question: "empathy_total",
  interact: "empathy_total",
  repair: "empathy_total",
},
skillLevels = {
  // a javascript Object Literal, containing each skill, and its corresponding attribute
  endure: "endure",
  force: "force",
  fight: "fight",
  sneak: "sneak",
  move: "move",
  shoot: "shoot",
  scout: "scout",
  comprehend: "comprehend",
  know_the_zone: "know_the_zone",
  sense_emotion: "sense_emotion",
  manipulate: "manipulate",
  heal: "heal",
  know_nature: "know_the_zone",
  dominate: "manipulate",
  overload: "endure",
  assault: "fight",
  infiltrate: "sneak",
  scan: "scout",
  datamine: "comprehend",
  analyze: "know_the_zone",
  question: "sense_emotion",
  interact: "manipulate",
  repair: "heal",
},
skillTotals = {
  // a javascript Object Literal, containing each skill, and its corresponding total value
  endure: "endure_total",
  force: "force_total",
  fight: "fight_total",
  sneak: "sneak_total",
  move: "move_total",
  shoot: "shoot_total",
  scout: "scout_total",
  comprehend: "comprehend_total",
  know_the_zone: "know_the_zone_total",
  sense_emotion: "sense_emotion_total",
  manipulate: "manipulate_total",
  heal: "heal_total",
  know_nature: "know_the_zone_total",
  dominate: "manipulate_total",
  overload: "endure_total",
  assault: "fight_total",
  infiltrate: "sneak_total",
  scan: "scout_total",
  datamine: "comprehend_total",
  analyze: "know_the_zone_total",
  question: "sense_emotion_total",
  interact: "manipulate_total",
  repair: "heal_total",
},
misc = {
  // a javascript Object Literal, containing each skill, and its corresponding skill modification
  endure: "endure_skill_misc",
  force: "force_skill_misc",
  fight: "fight_skill_misc",
  sneak: "sneak_skill_misc",
  Move: "move_skill_misc",
  shoot: "shoot_skill_misc",
  scout: "scout_skill_misc",
  comprehend: "comprehend_skill_misc",
  know_the_zone: "know_the_zone_skill_misc",
  sense_emotion: "sense_emotion_skill_misc",
  manipulate: "manipulate_skill_misc",
  heal: "heal_skill_misc",
  know_nature: "know_the_zone_skill_misc",
  dominate: "manipulate_skill_misc",
  overload: "endure_skill_misc",
  assault: "fight_skill_misc",
  infiltrate: "sneak_skill_misc",
  scan: "scout_skill_misc",
  datamine: "comprehend_skill_misc",
  analyze: "know_the_zone_skill_misc",
  question: "sense_emotion_skill_misc",
  interact: "manipulate_skill_misc",
  repair: "heal_skill_misc",
},
miscGear = {
  // a javascript Object Literal, containing each skill, and its corresponding gear modification
  endure: "endure_gear_misc",
  force: "force_gear_misc",
  fight: "fight_gear_misc",
  sneak: "sneak_gear_misc",
  Move: "move_gear_misc",
  shoot: "shoot_gear_misc",
  scout: "scout_gear_misc",
  comprehend: "comprehend_gear_misc",
  know_the_zone: "know_the_zone_gear_misc",
  sense_emotion: "sense_emotion_gear_misc",
  manipulate: "manipulate_gear_misc",
  heal: "heal_gear_misc",
  know_nature: "know_the_zone_gear_misc",
  dominate: "manipulate_gear_misc",
  overload: "endure_gear_misc",
  assault: "fight_gear_misc",
  infiltrate: "sneak_gear_misc",
  scan: "scout_gear_misc",
  datamine: "comprehend_gear_misc",
  analyze: "know_the_zone_gear_misc",
  question: "sense_emotion_gear_misc",
  interact: "manipulate_gear_misc",
  repair: "heal_gear_misc",
}

/* Monster constant */  
const monster_skills = {
    "endure monster": "endure_monster",
    "fight monster": "fight_monster",
    "force monster": "force_monster",
  }, 
  monster_misc = {
    "endure monster": "endure_skill_misc_monster",
    "fight monster": "fight_skill_misc_monster",
    "force monster": "force_skill_misc_monster",
  },
  monster_miscGear = {
    "endure monster": "endure_gear_misc_monster",
    "fight monster": "fight_gear_misc_monster",
    "force monster": "force_gear_misc_monster",
  };

/* Switch between tabs. From version 1.12, using buttons.*/
[`character`, `ark`, `monster`, `zonelog`, 'npc', 'settings'].forEach(attr => {
    on(`clicked:tab_${attr}`, () => {
        setAttrs({tab: attr});
    });
});


/* number and log handling */
const int = (score, on_error = 0) => parseInt(score) || on_error;
const float = (score, on_error = 0) => parseFloat(score) || on_error;
const clog = (text, title = "", color = "green", style = "font-size:12px; font-weight:normal;", headerstyle = "font-size:13px; font-weight:bold;") => {
  let titleStyle = `color:${color}; ${headerstyle} text-decoration:underline;`;
  let textStyle = `color:${color}; ${style}`;
  let output = `%c${title} %c${text}`;
  if (title) {
    console.log(output, titleStyle, textStyle);
  } else {
    output = `%c${text}`;
    console.log(output, textStyle);
  }
};

/* version tracking */

const newAnnouncement = async (old_version, new_version, show_announcement) => {
  const setter = {};
  clog(`Current sheet data version: ${old_version}, Sheet code version: ${new_version}`);

  if (new_version > old_version) {
    setter.version = new_version;
  }
  if (show_announcement) {
    clog("New Announcements: v" + new_version);
    setter.show_announcements = 1;
  }
  if (setter) {
    await setAttrsAsync(setter);
  }
};

/*********************
UPGRADE LOGIC
***********************/

on("sheet:opened", () => {
  getAttrs(["version"], (v) => {
    versionator(float(v.version));
  });
});

const versionator = async (version) => {
  const getter = {},
        setter = {};
  var old_version = version; 

  // set the sheet version you are upgrading sheet to, 
  // and set show_announcement to 1 if you want to force an announcement to be shown.
  // don't set a code_version; we use the switch below for that.
  // let new_version = 2.02; // DEPRECATED, using the attribute attr_sheetversion at top of html for this
  var new_version = (await getAttrsAsync(["sheetversion"])).sheetversion;
  //clog("New version from attr: "+ new_version);
  let show_announcement = 1;
  
  // Test if character is new
  var new_character = (await getAttrsAsync(["is_new_character"])).is_new_character;
  clog("--- New character: "+ new_character);

  // Test for upgrade from previous version 1.x (by checking for previous Attributes)
  var test = await getAttrsAsync(["chartype", "adv-modifiers", "header-bgimg", "rot_permenant", "rot_permanent", "strength_max", "agility_max", "wits_max", "empathy_max", "ark_culture"]); 
  //clog("Test prev version: " + JSON.stringify(test));
  //clog("Test prev version 2: " + ( ( test.strength_max || test.agility_max || test.wits_max || test.empathy_max ) === undefined));
  //clog("Test prev version 3: " + ( test.strength_max === undefined || test.agility_max === undefined || test.wits_max === undefined || test.empathy_max === undefined ));
  const prev_version_one = ( test.strength_max === undefined && test.agility_max === undefined && test.wits_max === undefined && test.empathy_max === undefined ) ? 0 : 1;
  //clog("prev_version_one: "+prev_version_one);

  // Test for upgrade from previous version 2.x (by checking for previous Attributes)
  var test2 = await getAttrsAsync(["strength_total", "agility_total", "wits_total", "empathy_total"]); 
  //clog("Test prev version two: " + JSON.stringify(test2));
  //clog("Test prev version two 1: " + (( test2.strength_total && test2.agility_total && test2.wits_total && test2.empathy_total ) === 0));
  //clog("Test prev version two 2: " + ( test2.agility_total === 0 && test2.wits_total === 0 && test2.empathy_total === 0 ));
  const prev_version_two = ( test2.agility_total === 0 && test2.wits_total === 0 && test2.empathy_total === 0 ) ? 0 : 1;
  //clog("prev_version_two: "+prev_version_two);

  //clog("old_version 1 = "+old_version);
  //if (!old_version) old_version = 2.01; // New sheet
  //clog("old_version 2 = "+old_version);

  /* VERSION DETECTION */
  /* 2025-01-14: Removed callback to versionator() and removed breaks in switch to allow fallback to decide what upgrades to make */
  switch (true) {
      //add checks for updates here
      case new_character == 1 :
          old_version = new_version;
          await setAttrsAsync({is_new_character: 0, version: new_version});
          new_character = (await getAttrsAsync(["is_new_character"])).is_new_character;
          clog("----- New character, no sheet upgrades needed");
          break;
      case old_version < 3.00:            
          clog("---- Updating to version 3.00");
          update_to_3_00(float(2.04), float(3.00));
          //await setAttrsAsync({is_new_character: 0});
          //new_character = (await getAttrsAsync(["is_new_character"])).is_new_character;
          //clog("New character: 0");
          show_announcement = 1;
          //break;
      case old_version < 3.10:
          clog("---- Updating to version 3.10");
          update_to_3_10(float(3.00), float(3.10));
          //await setAttrsAsync({is_new_character: 0});
          //new_character = (await getAttrsAsync(["is_new_character"])).is_new_character;
          //clog("New character: 0");
          show_announcement = 1;
          //break;
      default:
          //clog("----- No sheet update needed, in switch default. ");    
          // if reach this, all codeversion upgrades are complete
          // can run your recalculate function to show announcements
          setAttrs({
            version: new_version,
          });

      }
      newAnnouncement(old_version, new_version, show_announcement);
};
//add update functions here

/* Upgrade to 3.10 version from previous version 3.00 */
const update_to_3_10 = async (old_version, upgraded_version) => {
  clog(`** UPDATING TO V3.10 FROM ${old_version} **`);
  const setter = {
    whisper : 0,
    //whisper_query : 0,
    whisper_option : "",
    whisper_option_api : "!myz",
    whisper_the_roll : 0
  };

  getAttrs(["api_toggle","whisper_option","whisper_option_api","whisper","whisper_the_roll"], (values) => {
    clog(`----- Upgrading from whisper settings: ${JSON.stringify(values)}`);
    const option_api = values.whisper_option_api,
          option = values.whisper_option,
          api = int(values.api_toggle);
 
    if ( ( api === 1 && option_api == "@{translation_whisper_api_macro_query}" ) || 
          ( api !== 1 && option == "@{translation_whisper_macro_query}" ) ) {
      clog(`----- Whisper Upgrade: whisper through QUERY`);
      setter.whisper = 2;
      setter.whisper_option = "@{translation_whisper_macro_query}";
      setter.whisper_option_api = "@{translation_whisper_api_macro_query}";
    } else if ( ( api === 1 && option_api == "!wmyz" ) || 
                ( api !== 1 && option == "/w gm" ) ) {
      clog(`----- Whisper Upgrade: whisper ENABLED through SETTING`);
      setter.whisper = 1;
      setter.whisper_option = "/w gm";
      setter.whisper_option_api = "!wmyz";
      setter.whisper_the_roll = 1;                   
    } else if ( ( api === 1 && option_api == "!myz" ) || 
                ( api !== 1 && option == "" ) ) {
      clog(`----- Whisper Upgrade: whisper DISABLED through SETTING`);
      setter.whisper = 0;
      setter.whisper_option = "";
      setter.whisper_option_api = "!myz";
      setter.whisper_the_roll = 0;         
    } else {
      clog(`----- Whisper Upgrade: roll whisper settings not matched!!!`);          
    }

    //clog(`----- Upgrading to whisper settings: ${JSON.stringify(setter)}`);
    setAttrs(setter, { silent: true });
  });
} 

/* Upgrade to 3.00 version from previous version */
const update_to_3_00 = async (old_version, upgraded_version) => {
  const setter = {};  
  var values = {};
  //const charname = await getAttrsAsync(["character_name"]);
  
  clog(`** UPDATING TO V3.00 FROM ${old_version} **`);

  battleLvl();
  //clog("Correcting battle level.");

  
  //clog("...");
  //clog("...");
  //clog("...");
  //clog("... enabled Custom Roll Parsing for Pushing Rolls in the chat message roll results.");

  setAttrs(setter, { silent: true });

};


/* Upgrade to 2.0 version from previous version */
const update_to_2_0 = async (old_version, upgraded_version) => {

  var values = {};
  const charname = await getAttrsAsync(["character_name"]);
  
  clog(`** UPDATING "${charname.character_name}" TO V2.0 FROM ${old_version} **`);
  
  // On upgrade, set character type to Mutant
  if (old_version < 2.01) {
      //clog(`Upgrade ${charname.character_name}: Setting character type Mutant.`);
      await setAttrsAsync({chartype: "Mutant"});
  }
  
  // On upgrade, turn off modifiers
  if (old_version < 2.01) {
      //clog(`Upgrade ${charname.character_name}: Turning off modifiers.`);
      await setAttrsAsync({"adv-modifiers": 0});;
  }
  
  // On upgrade, turn on Mutant headers
  if (old_version < 2.01) {    
      //clog(`Upgrade ${charname.character_name}: using image header backgrounds.`);
      await setAttrsAsync({"header-bgimg": 1});
  }

  // On upgrade, change tab according to new tab naming
  if (old_version < 2.01) {
    const tab = await getAttrsAsync(["tab"]);
    //clog(`Upgrading tab, current is ${tab.tab}`);
    switch (tab.tab) {
      case "log" :
        await setAttrsAsync({tab: "zonelog"});
        //clog("Setting tab from Log to Zonelog");
        break;
      case "npc" :
        await setAttrsAsync({tab: "monster"});
        await setAttrsAsync({"force_show_monsterinfo":1});          
        //clog("Setting tab from Npc to Monster, and showing legacy npc info.");
        break;
      default: 
        //clog("No need to update tab");
    }       
  }
  
  // Upgrade attributes, no need to update damages
  // const attributes = { strength: "strength_total", agility: "agility_total", wits: "wits_total", empathy: "empathy_total" };
  // const damages = { strength: "damage", agility: "fatigue", wits: "confusion", empathy: "doubt"};
  Object.keys(attributes).forEach( async (attr) => {
    var attrib = {};
    values = await getAttrsAsync([attr, attributes[attr], damages[attr], attr+"_max", "character_name"]);
    
    //charname = values.character_name;

    // Set attributes to the attribute_max value from v1 
    //clog(`Testing attribute ${attr}_total exists (): exists ${(!values[attr+"_total"])} or is zero ${(values[attr+"_total"] == 0)}`);
    // if (!values[attr+"_total"] || values[attr+"_total"] == 0) // replaced with old version test
    //clog(`Old version test: ${old_version < 2}`);
    //clog(`Testing if ${attr}_max exists: ${values[attr+"_max"]}`);
    //clog(`Testing is ${attr} is not equal to ${attr}_max: ${values[attr] != values[attr+"_max"]}`);
    //clog(`Set ${attr} to ${attr}_max test: ${(old_version < 2 || (values[attr+"_max"] && (values[attr] != values[attr+"_max"])) )}`);
    if (old_version < 2 || (values[attr+"_max"] && (values[attr] != values[attr+"_max"])) ) {
        attrib[attr] = int(values[attr+"_max"]); 
        //clog(`Upgrading attribute ${attr} from v1 version ${values[attr+"_max"]} to v2 ${values[attr]}`);
        if (attr == "strength") {
            // Set strength attributes for PC and Monster to attribute_max value
            attrib["strength_pc"] = values["strength_max"];
            attrib["strength_monster"] = values["strength_max"];
            //clog(`Attrib is Strength, pc = ${attrib["strength_pc"]} and Monster is ${attrib["strength_monster"]}`);
        }
    } else {
      attrib[attr] = int(values[attr]);
    }
    //clog(`Attributes ${attr} damage is ${int(values[damages[attr]])}`);
    attrib[attr+"_total"] = attrib[attr] - int(values[damages[attr]]);
    //clog("Attributes attrib: "+JSON.stringify(attrib));
    const attr_name = getSkillName(attr);
    //clog(`Set ${charname.character_name} attribute ${attr_name} from ${attr_name}_max ${values[attr+"_max"]} to ${attr_name} ${attrib[attr]} with total ${attrib[attr+"_total"]}.`);            
    await setAttrsAsync(attrib);        
  });

  // Upgrade conditions - no need
  // Upgrade apprearance - no need
  // Upgrade injuries - non need
  // Upgrade rot - 
  //clog("Pre Upgrade rot points");
  const rot = await getAttrsAsync(["rot_permenant", "rot_permanent"]);
  //clog("Upgrade rot points test 1, permenant exists : "+ rot.rot_permenant);
  //clog("Upgrade rot points test 2, permanent : "+ rot.rot_permanent);    
  const permenant = int(rot.rot_permenant || 0),
      permanent = int(rot.rot_permanent);
  //clog("Upgrade rot points test 3, permenant > permanent : "+ (permenant > permanent) );
  if (permenant > permanent) {
      //clog(`Upgrading ${charname.character_name} permanent rot points from ${permanent} to ${permenant}`);
      await setAttrsAsync({rot_permanent: permenant});
  }  
  rot["value"] = await getAttrsAsync(["rot_permanent"]);          
  //clog(`Post Upgrade ${charname.character_name} permanent rot points ${rot.value.rot_permanent}`);

  // Upgrade experience - no need, same attribute
  
  // Upgrade skills - no need
  // Upgrade repeating skills - no need, aligned

  // Talents - no need - aligned

  // Mutations, checking if need upgrade, checking if mutation names exists, then upgrading
  var muts_actioned = false; 
  // Collect new mutaitons, if any
  const mutationIds = await getSectionIDsAsync("repeating_mutations");
  //clog("Mutation IDs list: "+ JSON.stringify(mutationIds));
  //clog("Mutation IDs length: "+ mutationIds.length);
  const mutations = [];
  mutationIds.forEach( async (mutationId) => {
    const muts = await getAttrsAsync(["repeating_mutations_"+mutationId+"_name", "repeating_mutations_"+mutationId+"_description"]);
    mutations.push({name: muts["repeating_mutations_"+mutationId+"_name"], description: muts["repeating_mutations_"+mutationId+"_description"]});
    //clog("Mutation names: "+JSON.stringify(mutations));
  });
  // Collect old mutantions, if any
  const mutantionIds = await getSectionIDsAsync("repeating_mutantions");
  //clog("Mutations list: "+ JSON.stringify(mutationIds));
  //clog("Mutations length: "+ mutationIds.length);
  //clog("Mutantion IDs list: "+ JSON.stringify(mutantionIds));
  //clog("Mutantion IDs list: "+ mutantionIds.length);

  if(mutantionIds.length > 0 && mutationIds.length < mutantionIds.length) {
      mutantionIds.forEach( async (mutantionsId) => {
          values = await getAttrsAsync(["repeating_mutantions_"+mutantionsId+"_mutantion_name", "repeating_mutantions_"+mutantionsId+"_mutantion_description", "character_name"]);
          const name = values["repeating_mutantions_"+mutantionsId+"_mutantion_name"],
          description = values["repeating_mutantions_"+mutantionsId+"_mutantion_description"],
          newrowid = generateRowID();
          //clog(`Found ${charname.character_name}'s mutantion ${name}.`);
          const found = mutations.find(element => element.name == name);
          //clog("Mutantion and mutations doesnt match? "+(found === undefined));
          if (!found) { 
              //clog("Couldnt find match to "+name); 
          } else {
              //clog("Found match to "+name); 
          }
          var asterisk = "";
          if ( mutationIds.length > 0) { asterisk = "*"; }
          if(found === undefined) {  // No match for mutantion in the new mutations list
              //clog(`Upgrading ${charname.character_name}'s mutantion ${name}.`);
              let newmutation = {};
              newmutation["repeating_mutations_"+newrowid+"_name"] = name + asterisk;
              newmutation["repeating_mutations_"+newrowid+"_description"] = description;
              newmutation["repeating_mutations_"+newrowid+"_rank"] = 1;
              newmutation["repeating_mutations_"+newrowid+"_powerlevel"] = 1;
              await setAttrsAsync(newmutation);
          } else { // Found a match in the new mutation list, skipping
              muts_actioned = true;
              //clog("mutation already re-added, "+name);
          }         
      });
  }

  // Mutation points
  const mp = await getAttrsAsync(["mutation", "mutationpoints", "character_name"]);
  //clog(`${charname.character_name} mutation points mutation: ${mp.mutation}`);
  //clog(`${charname.character_name} mutation points mutationpoints: ${mp.mutationpoints}`);
  //clog("Testing mutpoints 0: " + old_version );
  //clog(`Testing mutpoints 1: ${ old_version < float(2.01) } `);
  //clog(`Testing mutpoints 2: ${ int(mp.mutation) != 0 } `);
  //clog(`Testing mutpoints 3: ${ int(mp.mutationpoints) == 0 } `);
  if (old_version < float(2.01) && int(mp.mutation) != 0 && int(mp.mutationpoints) == 0) {      
    //charname = mp.character_name;
    //clog("Mutations ationed: "+muts_actioned);
    //clog("Mutation points upgrade check: "+ (!mutation && !muts_actioned) || !mutationpoints );
    //clog(`Upgrading ${charname.character_name} mutation points using v1 mutantion points ${mp.mutation}`);
    setAttrs({mutationpoints: mp.mutation});
  } else {
    //clog("Mutation points not upgraded in version 2+, or when mutantion is 0, or mutationpoints is bigger than 0.");
  }


  // Upgrade Weapons ASYNC
  const weaponIds = await getSectionIDsAsync("repeating_weapons");
  weaponIds.forEach( async (weaponId) => {
      var values = await getAttrsAsync(["repeating_weapons_"+weaponId+"_weapon_name", "repeating_weapons_"+weaponId+"_weapon_skill", "repeating_weapons_"+weaponId+"_weapon_skill_misc", "repeating_weapons_"+weaponId+"_weapon_bonus", "repeating_weapons_"+weaponId+"_weapon_bonus_max", "repeating_weapons_"+weaponId+"_weapon_damage", "repeating_weapons_"+weaponId+"_weapon_damage_misc", "repeating_weapons_"+weaponId+"_weapon_range", "repeating_weapons_"+weaponId+"_weapon_features", "repeating_weapons_"+weaponId+"_weapon_grip", "repeating_weapons_"+weaponId+"_weapon_weight", "repeating_weapons_"+weaponId+"_weapon_carried", "strength_total", "agility_total", "shoot", "fight", "character_name"]);
      //clog(`Upgrade weapon attributes: Weapon ${values["repeating_weapons_"+weaponId+"_weapon_name"]} with bonus ${int(values["repeating_weapons_"+weaponId+"_weapon_bonus"])} and damage ${int(values["repeating_weapons_"+weaponId+"_weapon_damage"])} up to ${values["repeating_weapons_"+weaponId+"_weapon_range"]} distance.`);
      //clog("Weapon upgrade json: "+ JSON.stringify(values));
      const name = values["repeating_weapons_"+weaponId+"_weapon_name"],
      skill = int(values["repeating_weapons_"+weaponId+"_weapon_skill"] || 0),
      //skill_misc = int(values["repeating_weapons_"+weaponId+"_weapon_skill_misc"] || 0),
      bonus = int(values["repeating_weapons_"+weaponId+"_weapon_bonus"] || 1),
      bonus_max = values["repeating_weapons_"+weaponId+"_weapon_bonus_max"] ? int(values["repeating_weapons_"+weaponId+"_weapon_bonus_max"]) : int(values["repeating_weapons_"+weaponId+"_weapon_bonus"] || 1),
      //bonus_misc = int(values["repeating_weapons_"+weaponId+"_weapon_bonus_misc" || 0]),
      //bonus_tot = bonus + bonus_misc,
      //damage = int(values["repeating_weapons_"+weaponId+"_weapon_damage"] || 1),
      //damage_misc = int(values["repeating_weapons_"+weaponId+"_weapon_damage_misc"] || 0),
      //damage_tot = damage + damage_misc,
      //range = values["repeating_weapons_"+weaponId+"_weapon_range"] || "Arm", 
      //features = values["repeating_weapons_"+weaponId+"_weapon_features"] || "", 
      //grip = values["repeating_weapons_"+weaponId+"_weapon_grip"] || "1H", 
      //weight = values["repeating_weapons_"+weaponId+"_weapon_weight"] || 1, 
      //carried = values["repeating_weapons_"+weaponId+"_weapon_carried"] || 1,
      //fight = int(values.fight),
      //shoot = int(values.shoot),
      base = skill === 0 ? int(values.strength_total) : int(values.agility_total),
      skill_lvl = skill === 0 ? int(values.fight) : int(values.shoot);
      const max = bonus_max < bonus ? bonus : bonus_max;
      //clog(`Upgrade ${charname.character_name}'s weapon Weapon ${name} with ${base} base and ${skill_level} skill, max bonus ${bonus_max} and damage ${damage} up to ${range} distance.`);

      let weapon = {};
      weapon["repeating_weapons_"+weaponId+"_weapon_name"] = name;
      weapon["repeating_weapons_"+weaponId+"_weapon_base_total"] = base;
      weapon["repeating_weapons_"+weaponId+"_weapon_skill"] = int(values["repeating_weapons_"+weaponId+"_weapon_skill"] || 0);
      weapon["repeating_weapons_"+weaponId+"_weapon_skill_misc"] = int(values["repeating_weapons_"+weaponId+"_weapon_skill_misc"] || 0);
      weapon["repeating_weapons_"+weaponId+"_weapon_skill_total"] = skill_lvl + int(values["repeating_weapons_"+weaponId+"_weapon_skill_misc"] || 0);
      weapon["repeating_weapons_"+weaponId+"_weapon_bonus"] = int(values["repeating_weapons_"+weaponId+"_weapon_bonus"] || 1);
      weapon["repeating_weapons_"+weaponId+"_weapon_bonus_max"] = max;
      weapon["repeating_weapons_"+weaponId+"_weapon_bonus_misc"] = int(values["repeating_weapons_"+weaponId+"_weapon_bonus_misc"] || 0);
      weapon["repeating_weapons_"+weaponId+"_weapon_bonus_total"] = bonus_max + int(values["repeating_weapons_"+weaponId+"_weapon_bonus_misc"] || 0);
      weapon["repeating_weapons_"+weaponId+"_weapon_damage"] = int(values["repeating_weapons_"+weaponId+"_weapon_damage"] || 1);
      weapon["repeating_weapons_"+weaponId+"_weapon_damage_misc"] = int(values["repeating_weapons_"+weaponId+"_weapon_damage_misc"] || 0);
      weapon["repeating_weapons_"+weaponId+"_weapon_damage_total"] = int(values["repeating_weapons_"+weaponId+"_weapon_damage"] || 1) + int(values["repeating_weapons_"+weaponId+"_weapon_damage_misc"] || 0);
      weapon["repeating_weapons_"+weaponId+"_weapon_grip"] = values["repeating_weapons_"+weaponId+"_weapon_grip"] || "1H";
      weapon["repeating_weapons_"+weaponId+"_weapon_range"] = values["repeating_weapons_"+weaponId+"_weapon_range"] || "Arm";
      weapon["repeating_weapons_"+weaponId+"_weapon_carried"] = values["repeating_weapons_"+weaponId+"_weapon_carried"] || 1;
      weapon["repeating_weapons_"+weaponId+"_weapon_weight"] = values["repeating_weapons_"+weaponId+"_weapon_weight"] || 1;
      weapon["repeating_weapons_"+weaponId+"_weapon_features"] = values["repeating_weapons_"+weaponId+"_weapon_features"] || "";

      //clog("Updating weapon: "+JSON.stringify(weapon));
      await setAttrsAsync(weapon);
  });

  // Upgrade armor to repeating section

  var armorIds = await getSectionIDsAsync("repeating_armor");
  //clog("New armor IDs: "+ JSON.stringify(armorIds));

  const armor_names = [];
  var val = "";
  armorIds.forEach( async (armorId) => {
      val = await getAttrsAsync(["repeating_armor_"+armorId+"_name"]);
      armor_names.push(val["repeating_armor_"+armorId+"_name"]);
      //clog("Armor names: "+JSON.stringify(armor_names));
  });
  //clog("Armor names: "+ JSON.stringify(armor_names));
    
  var armors = await getAttrsAsync(["armor1_ar", "armor1_bonus", "armor1_damage", "armor1_equiped", "armor1_name", "armor2_ar", "armor2_bonus", "armor2_damage", "armor2_equiped", "armor2_name", "character_name"]);

  var newarmor1 = {};

  //clog("Upgrade armor1 name: "+armors.armor1_name);
  //clog("Upgrade armor1 bonus: "+armors.armor1_bonus);
  //clog("Upgrade armor1 name not found: "+(armor_names.find(element => element == armors.armor1_name) === undefined));
  //clog(`Upgrading ${charname.character_name}'s Armor1 ${armors.armor1_name} with bonus ${armors.armor1_bonus} and damage ${armors.armor1_damage}, equipped ${armors.armor1_equiped}`);

  if (armors.armor1_name && armors.armor1_bonus && (armor_names.find(element => element == armors.armor1_name) === undefined)) {
      //clog("Upgrading Armor1 : " + armors.armor1_name + " with bonus : "+ armors.armor1_bonus +".");
      //clog(`Upgrading ${charname.character_name}'s Armor1 ${armors.armor1_name} with bonus ${armors.armor1_bonus} and damage ${armors.armor1_damage}, equipped ${armors.armor1_equiped}`);
      const newrowid1 = generateRowID();
      const bonus1_actual = int(armors.armor1_bonus) + int(armors.armor1_damage);
      const rating1 = bonus1_actual * (armors.armor1_equiped == 0 ? 0 : 1);
      //clog("Armor rating calculated: "+rating1);
      var asterisk = "";
      if ( old_version == float(2.01) ) { asterisk = "*"; }
      newarmor1["repeating_armor_" + newrowid1 + "_name"] = armors.armor1_name + asterisk;
      newarmor1["repeating_armor_" + newrowid1 + "_rating"] = rating1;
      newarmor1["repeating_armor_" + newrowid1 + "_carried"] = 1;
      newarmor1["repeating_armor_" + newrowid1 + "_equipped"] = armors.armor1_equiped || 1;
      newarmor1["repeating_armor_" + newrowid1 + "_bonus"] = bonus1_actual;
      newarmor1["repeating_armor_" + newrowid1 + "_bonus_misc"] = 0;
      newarmor1["repeating_armor_" + newrowid1 + "_bonus_max"] = int(armors.armor1_bonus);
      newarmor1["repeating_armor_" + newrowid1 + "_weight"] = 1;
      newarmor1["repeating_armor_" + newrowid1 + "_features"] = '';

      //clog("upgrading armor 1: "+JSON.stringify(newarmor1));
      await setAttrsAsync(newarmor1);
  } else {
      //clog("No need to upgrade Armor_1");
  }

  var newarmor2 = {};

  //clog("Upgrade armor2 name: "+armors.armor2_name);
  //clog("Upgrade armor2 bonus: "+armors.armor2_bonus);
  //clog("Upgrade armor1 name not found: "+(armor_names.find(element => element == armors.armor1_name) === undefined));
  //clog(`Upgrade ${charname.character_name}'s Armor2 ${armors.armor2_name} with bonus ${armors.armor2_bonus} and damage ${armors.armor2_damage}, equipped ${armors.armor2_equiped}`);

  if (armors.armor2_bonus && armors.armor2_name && armor_names.find(element => element == armors.armor2_name) === undefined) {
      //clog("Upgrading Armor2 : " + armors.armor2_name + " with bonus : "+ armors.armor2_bonus +".");
      //clog(`Upgrading ${charname.character_name}'s Armor2 ${armors.armor2_name} with bonus ${armors.armor2_bonus} and damage ${armors.armor2_damage}, equipped ${armors.armor2_equiped}`);
      const newrowid2 = generateRowID();
      const bonus2_actual = int(armors.armor2_bonus) + int(armors.armor2_damage);
      const rating2 = bonus2_actual * (armors.armor2_equiped == 0 ? 0 : 1);
      //clog("Armor rating calculated: "+rating2);
      newarmor2["repeating_armor_" + newrowid2 + "_name"] = armors.armor2_name;
      newarmor2["repeating_armor_" + newrowid2 + "_rating"] = rating2;
      newarmor2["repeating_armor_" + newrowid2 + "_carried"] = 1;
      newarmor2["repeating_armor_" + newrowid2 + "_equipped"] = armors.armor2_equiped || 1;
      newarmor2["repeating_armor_" + newrowid2 + "_bonus"] = bonus2_actual;
      newarmor2["repeating_armor_" + newrowid2 + "_bonus_misc"] = 0;
      newarmor2["repeating_armor_" + newrowid2 + "_bonus_max"] = int(armors.armor2_bonus);
      newarmor2["repeating_armor_" + newrowid2 + "_weight"] = 1;
      newarmor2["repeating_armor_" + newrowid2 + "_features"] = '';
      
      //clog("upgrading armor 2: "+JSON.stringify(newarmor2));
      await setAttrsAsync(newarmor2);
  } else {
      //clog("No need to upgrade Armor_2");
  }


  // Upgrade gear, vehicle and consumables
    // Gear - no need
    // Vehicle - aligned
    // Consumables, aligned

  // Upgrade relationships, notes etc
    // Aligned

  // Upgrade Ark sheet
  // Development levels 
  values = await getAttrsAsync(["ark_food_supply","ark_culture", "ark_technology", "ark_warfare", "ark_dev_food", "ark_dev_cult", "ark_dev_tech", "ark_dev_war", "character_name"]);
  const dev_food = int(values.ark_dev_food),
  dev_culture = int(values.ark_dev_cult),
  dev_tech = int(values.ark_dev_tech),
  dev_war = int(values.ark_dev_war),
  food = dev_food || int(values.ark_food_supply),
  culture = dev_culture || int(values.ark_culture),
  tech = dev_tech || int(values.ark_technology),
  war = dev_war || int(values.ark_warfare);
  //charname = values.character_name;
  //clog(`Upgrade ${charname.character_name}'s ark development levels: food ${food}, culture ${culture}, technology ${tech}, and warfare ${war}.`);
  //clog("Dev levels json: "+ JSON.stringify(values));
  await setAttrsAsync({
      ark_dev_food: food,
      ark_dev_cult: culture,
      ark_dev_tech: tech,
      ark_dev_war: war,
  });

  // Ark details
  // Aligned

  // UPDATE THIS /
  // MUST set the version to a specific value here, the one where the sheet was updated like this.  
  const setter = {};
  //setter.version = upgraded_version;
  
  //clog("Setting upgraded version: "+JSON.stringify(upgraded_version));
  setAttrs(setter, { silent: true });

};   
  
/* rename misspelled items
const update_to_1_12 = (old_version, upgraded_version) => {
  getAttrs(["armor1_equiped", "armor2_equiped"], (v) => {
    const setter = {};

    const statswaps = {
      armor1_equiped: "armor1_equipped",
      armor2_equiped: "armor2_equipped",
    };

    Object.entries(statswaps).forEach(([key, value]) => {
      if (v[key]) {
        setter[key] = v[value];
        //clog(`Upgrading stat setter[key] ${setter[key]} to v[value] ${v[value]}`);
      }
    });

    // UPDATE THIS /
    // MUST set the version to a specific value here, the one where the sheet was updated like this.  
    
    //setter.version = upgraded_version;

    setAttrs(setter, { silent: true });
    //clog("updating misspelled items");
  });
};*/


/* ===== PARAMETERS ==========
GiGs 'Super Simple Summarizer'
*/
const repeatingSum = (destination, section, fields, multiplier = 1) => {
  if (!Array.isArray(fields)) fields = [fields];
  getSectionIDs(`repeating_${section}`, (idArray) => {
    const attrArray = idArray.reduce((m, id) => [...m, ...fields.map((field) => `repeating_${section}_${id}_${field}`)], []);
    getAttrs(attrArray, (v) => {
      //clog("values of v: " + JSON.stringify(v));
      // getValue: if not a number, returns 1 if it is 'on' (checkbox), otherwise returns 0..
      const getValue = (section, id, field) => float(v[`repeating_${section}_${id}_${field}`]) || (v[`repeating_${section}_${id}_${field}`] === "on" ? 1 : 0);

      const sumTotal = idArray.reduce((total, id) => total + fields.reduce((subtotal, field) => subtotal * getValue(section, id, field), 1), 0);
      setAttrs({
        [destination]: sumTotal * multiplier,
      });
    });
  });
};

/* character encumbrance */
on("change:repeating_gear remove:repeating_gear sheet:opened", function () {
  //clog("Change Detected: Character Gear Encumbrance");
  repeatingSum("gear_encumbrance", "gear", ["gear_weight", "gear_qty", "gear_carried"]);
});

/* vehicle encumbrance */
on("change:repeating_vehicle remove:repeating_vehicle sheet:opened", function () {
  //clog("Change Detected: Vehicle Gear Encumbrance");
  repeatingSum("vehiclegear_encumbrance", "vehicle", ["vehiclegear_weight", "vehiclegear_qty", "vehiclegear_carried"]);
});

/* weapons encumbrance */
on("change:repeating_weapons remove:repeating_weapons sheet:opened", function () {
  //clog("Change Detected: Character Weapons Encumbrance");
  repeatingSum("weapons_encumbrance", "weapons", ["weapon_weight", "weapon_carried"]);
});

/* armor encumbrance */
on("change:repeating_armor remove:repeating_armor sheet:opened", function () {
  //clog("Change Detected: Character Armor Encumbrance");
  repeatingSum("armor_encumbrance", "armor", ["weight", "carried"]);
});

/* armor rating */
on("change:repeating_armor remove:repeating_armor sheet:opened", function () {
  //clog("Change Detected: Character Armor Rating");
  repeatingSum("ar_total", "armor", ["rating", "equipped"]);
});

/* Permanent rot */
on("change:rot change:rot_permanent sheet:opened", function () {
    //clog("Change Detected: Rot levels");
    getAttrs(["rot", "rot_permanent"], (values) => {
      var rot = int(values.rot),
      rot_permanent = int(values.rot_permanent);
      if(rot <= rot_permanent) {
        setAttrs ({ rot: rot_permanent });
      }
    });
  });

/* total encumbrance */
on("sheet:opened change:gear_encumbrance change:vehiclegear_encumbrance change:weapons_encumbrance change:armor_encumbrance change:grub change:water change:bullets", function () {
  getAttrs(["gear_encumbrance", "vehiclegear_encumbrance", "weapons_encumbrance", "armor_encumbrance", "grub", "water", "bullets"], function (values) {      
    //clog("Change Detected: Character Encumbrance");

    const gear_encumbrance = float(values["gear_encumbrance"]),
      vehiclegear_encumbrance = float(values["vehiclegear_encumbrance"]),
      weapons_encumbrance = float(values["weapons_encumbrance"]),
      armor_encumbrance = float(values["armor_encumbrance"]),
      grub = float(values["grub"]),
      water = float(values["water"]),
      bullets = float(values["bullets"]),
      consumables_enc = (grub * 0.25) + (water * 0.25),
      bullets_enc = bullets <= 10 ? 0 : (bullets <= 20 ? 0.5 : (bullets <= 40 ? 1 : 2)),
      consumables_encumbrance = consumables_enc + bullets_enc, 
      sum_character_encumbrance = gear_encumbrance + weapons_encumbrance + armor_encumbrance + consumables_encumbrance,
      sum_vehicle_encumbrance = vehiclegear_encumbrance;
    setAttrs({
      weapons_encumbrance: weapons_encumbrance,
      armor_encumbrance: armor_encumbrance,
      character_encumbrance: sum_character_encumbrance,
      consumables_encumbrance: consumables_encumbrance,
      vehicle_encumbrance: sum_vehicle_encumbrance,
    });
  });
});

/* total vehicle encumbrance */
on("sheet:opened change:vehicle_advancedencumbrance change:vehiclegear_encumbrance change:vehicle_occupants change:vehicle_seats change:vehicle_fuel change:vehicle_fuel_cap change:vehicle_maxload", function () { 
 getAttrs(["vehicle_advancedencumbrance", "vehiclegear_total", "vehicle_carry", "vehiclegear_encumbrance", "vehicle_occupants", "vehicle_occupants_weight", "vehicle_seats", "vehicle_fuel", "vehicle_fuel_cap", "vehicle_fuel_weight", "vehicle_maxload", "vehicle_overencumbered"], function (values) {
    //clog("Change Detected: Vehicle Encumbrance");
    const adv = int(values["vehicle_advancedencumbrance"]),
      gear = float(values["vehiclegear_encumbrance"]),
      occupants = int(values["vehicle_occupants"]),
      seats = int(values["vehicle_seats"]),
      fuel_cap = int(values["vehicle_fuel_cap"]),
      fuel_in = float(values["vehicle_fuel"]),
      fuel = fuel_in > fuel_cap ? fuel_cap : fuel_in,
      fuel_wght = (adv > 0) ? fuel * 2 : 0, // If Adv, A unit of fuel weighs 2 units
      maxload = int(values["vehicle_maxload"]),
      carry = (adv > 0) ? maxload + (seats * 10) + (fuel_cap * 2) : maxload, // If Adv, Adjusted to accommodate poccupants and fuel
      occupants_wght = (adv > 0) ? occupants * 10 : 0, // If Adv, A person weighs 10 units
      total = gear + fuel_wght + occupants_wght,
      overencumbered = (carry - total) < 0 ? 1 : 0;
    setAttrs({
      vehiclegear_encumbrance: gear,
      vehicle_fuel_weight: fuel_wght,
      vehicle_occupants_weight: occupants_wght,
      vehiclegear_total: total,
      vehicle_carry: carry,
      vehicle_overencumbered: overencumbered,
    });
  });
});

/* Credits total */
on("sheet:opened change:credits change:credits_vehicle change:credits_stash", function () {
  getAttrs(["credits", "credits_vehicle", "credits_stash"], function (values) {
    //clog("Change Detected: Credits Total");
    const credits = float(values["credits"]),
      credits_vehicle = float(values["credits_vehicle"]),
      credits_stash = float(values["credits_stash"]),
      sum_credits = credits + credits_vehicle + credits_stash;
    setAttrs({
      credits_total: sum_credits,
    });
  });
});

on("change:powerincrease", (ev) => {
  //clog(`Power increase button clicked: ${JSON.stringify(ev)}`);
  getAttrs(["powerincrease","energypoints_max","energypoints"], (values) => {
    const inc = int(values.powerincrease),
          energy = int(values.energypoints),
          setter = {},
          silent = {silent: true};
    if ( inc === 1 ) {
      setter.energypoints_max = 12; 
      clog(`Energy points max increased to 12`);
    } else {
      setter.energypoints_max = 10;
      setter.energypoints = Math.min(energy,10);
      clog(`Energy points max set to 10`);
    }
    setAttrs(setter,silent);
  });
});

//Battle Level
// Function also used in upgrade script
const battleLvl = () => {
  getAttrs(["ark_dev_war"], (values) => {
    //clog(JSON.stringify(values));
    //clog(`Battle level at ${int(values.ark_dev_war) || 1}`);
    const warfare = (Math.floor(float(values.ark_dev_war) / 10 ))+1 || 1;
    setAttrs({
      ark_battle_level: warfare,
    });
  });
}
on("change:ark_dev_war", () => {
  battleLvl();
  /*
  getAttrs(["ark_dev_war"], (values) => {
    //clog(JSON.stringify(values));
    //clog(`Battle level at ${int(values.ark_dev_war) || 1}`);
    const warfare = (Math.floor(float(values.ark_dev_war) / 10 ))+1 || 1;
    setAttrs({
      ark_battle_level: warfare,
    });
  });
  */
});

const houses = ['warburg','fortescue','kilgore','morningstar'],
      sectors = ['novapaloma','oldkoly','pirius','tindertuft','northolme','calista','hindenburg','mosel','laborum','arcadium','cinderfalls','cogsofhel'],
      houseSectors = {},
      houseAttrs = {};
houseSectors.warburg = sectors.map( (sector) => sector + '_warburg' );
houseSectors.fortescue = sectors.map( (sector) => sector + '_fortescue' );
houseSectors.kilgore = sectors.map( (sector) => sector + '_kilgore' );
houseSectors.morningstar = sectors.map( (sector) => sector + '_morningstar' );
//clog(`Warburg: ${houseSectors.warburg}`);
//clog(`Fortescue: ${houseSectors.fortescue}`);
//clog(`kilgore: ${houseSectors.kilgore}`);
//clog(`morningstar: ${houseSectors.morningstar}`);

houses.forEach( (house) => {
  //clog(`SW for ${house}`);
  sectors.forEach( (sector) => {
    //clog(`SW for ${house} and ${sector}`);
    on(`change:${sector}_${house}`, () => {
      updateInfluence(house);
    });
  });
}); 
const updateInfluence = (house) => {
  //clog(`Updating influence for ${house}`);
  getAttrs(houseSectors[`${house}`], (values) => {
    //clog(`House influence values: ${JSON.stringify(values)}`);
    const houseTotal = (Object.values(values)).reduce( (a,n) => a + int(n), 0);
    //clog(`House ${house} influence : ${houseTotal}`);
    setAttrs({
      [`influence_${house}`] : houseTotal,
    });
  });
}
on('sheet:opened', () => {
  //clog('Updating the influence of the four great houses.');
  houses.forEach( (house) => { updateInfluence(house); });
});

/* Monster or PC Strength handling. updates attr_strength depending on sheet tab*/
on("change:tab change:strength_pc change:strength_monster sheet:opened", () => {
  getAttrs(["tab", "strength", "strength_pc", "strength_monster"], (v) => {
    const settings = {},
      tab = (v.tab) ? v.tab : 'character', // sets tab to Character if not recognized - so goes to pc tab;
      str = int(v.strength);
    let pc = int(v.strength_pc),
      monster = int(v.strength_monster),
      forceupdate = 0;
    //clog(`Found updated strength max in tab ${tab}, checking pc = ${pc} and monster = ${monster} strengths, max is now = ${str}.`)

    // check if character existed before strength_pc or _monster stats were introduced.
    if (str > 0) {
      if (0 === pc || 0 === monster) forceupdate = 1;
      if (0 === pc) {
        pc = str;
        settings.strength_pc = str;
      }
      if (0 === monster) {
        monster = str;
        settings.strength_monster = str;
      }
    }
    // if tab is not pc or monster, end the function and leave strength unchanged
    if (tab !== 'character' && tab !== 'monster' && !forceupdate) return;

    // if tab = 1 or 3, set strength to the appropriate value
    settings.strength = tab === 'monster' ? monster : pc;

    setAttrs(settings);
  });
});

/* ability damage calcs */
Object.keys(damages).forEach((stat) => {
  // creates a sheet worker for each stat in damages - first stat = 'strength', then stat = 'agility', etc
  // in each worker, stat = the stat (strength, agility, etc) and damages[stat] = the associated damage ('damage'. 'fatigue', etc)
  on(`change:${stat} change:${damages[stat]}`, function () {
    //clog(`${stat} or ${damages[stat]} has changed.`);
    getAttrs([stat, damages[stat]], (values) => {
      const stat_score = int(values[stat]),
        damage_score = int(values[damages[stat]]);
      setAttrs({
        [stat + "_total"]: Math.max(0, stat_score - damage_score),
        //Math.max returns the highest value from a comma separated list - it's just like roll20's kh1 dice function.
        // so you don't need the if( value > 0) test. With math.max, if the value is below 0, it becomes 0.
      });
    });
  });
});

/*** UPDATE ***/
/* skill total calcs */
const getSkill = (label) => (label.split("-").join("_")).split(" ").join("_").toLowerCase(),
  getSkillLabel = (skill) => (skill.split("-").join("_")).split(" ").join("_").toLowerCase(),
  // a function to change (for example) "Know the Zone" to "know_the_zone"
  // needed for a couple of functions below

  getSkillKey = (label) => (label.split("_").join("-")).split(" ").join("-").toLowerCase(),
  // a function to change (for example) "Know the Zone" to "know-the-zone"
  // needed for a couple of functions below

  getSkillNameByType = (label) => race_att_names[label],
  getSkillName = (label) => getTranslationByKey(label);
  // A function to get the name of a skill specific for the selected race/character type.
  // Needed for a couple of functions below
  // Note, this is joint for all sheets for one logged on user

  /* Skill totals calculation */
  Object.keys(skills).forEach((skill_name) => {
    // creates a sheet worker for each skill in skills - first skill = 'strength', then stat = 'agility', etc
    // in each worker, stat = the stat (strength, agility, etc) and damages[stat] = the associated damage ('damage'. 'fatigue', etc)
    const skill = getSkill(skill_name);
    on(`change:${skill} change:${skills[skill_name]} change:${misc[skill_name]} change:${miscGear[skill_name]}`, function () {
      //clog(`${skill} or ${skills[skill_name]} or ${misc[skill_name]} or ${miscGear[skill_name]} has changed.`);
      getAttrs([skill, skills[skill_name], misc[skill_name], miscGear[skill_name]], function (values) {
        const stat_score = int(values[skills[skill_name]]),
          miscSkill_score = int(values[misc[skill_name]]),
          miscGear_score = int(values[miscGear[skill_name]]),
          skillRank_score = int(values[skill]);
        setAttrs({
          [skill + "_total"]: stat_score + skillRank_score + miscSkill_score + miscGear_score,
        });
      });
    });
  });   
  
/* set profession skill base and skill total FIX courtesy of GiGs*/
on('sheet:opened change:repeating_skills:name change:repeating_skills:attribute change:repeating_skills:skill change:repeating_skills:misc change:repeating_skills:gear change:strength_total change:agility_total change:wits_total change:empathy_total', function () {
  //clog('Change Detected: Profession Skill - recalculating Base & Skill totals');
  getSectionIDs('repeating_skills', idarray => {
    const fields = [];
    idarray.forEach(id => fields.push(
      `repeating_skills_${id}_name`,
      `repeating_skills_${id}_attribute`, 
      `repeating_skills_${id}_base`, 
      `repeating_skills_${id}_skill`, 
      `repeating_skills_${id}_misc`, 
      `repeating_skills_${id}_gear`, 
      `repeating_skills_${id}_total`
    ));
    // made the change event specific, so its only fired when needed, and likewise reduced the getAttrs to those only needed
    getAttrs([...fields, 'strength_total', 'agility_total', 'wits_total', 'empathy_total'], function (values) {
      const output = {};
      idarray.forEach(id => {
        const name = values[`repeating_skills_${id}_name`];
        const attr = values[`repeating_skills_${id}_attribute`];
        const skill_skill = int(values[`repeating_skills_${id}_skill`]);
        const skill_misc = int(values[`repeating_skills_${id}_misc`]);
        const skill_gear = int(values[`repeating_skills_${id}_gear`]);
        // separate out the basic values read from the sheet from those calculated within the worker. for clarity
        const skill_base = int(values[`${attr}_total`] || 0);
        const skill_total = skill_base + skill_skill + skill_misc + skill_gear;
        output[`repeating_skills_${id}_base`] = skill_base;
        output[`repeating_skills_${id}_total`] = skill_total;
        //clog('skill_name: ' + name);
        //clog('skill_base: ' + skill_base);
        //clog('skill_total: ' + skill_total);
      });              
    setAttrs(output);
    });
  });
});
  
/* Monster strength-based skill total calcs */
Object.keys(monster_skills).forEach((skill_name) => {
  const monster_skill = getSkill(skill_name);
  on(`change:${monster_skill} change:${monster_skills[skill_name]} change:${monster_misc[skill_name]} change:${monster_miscGear[skill_name]}`, function () {
    //clog(`${monster_skill} or ${monster_skills[skill_name]} or ${monster_misc[skill_name]} or ${monster_miscGear[skill_name]} has changed.`);
    getAttrs([monster_skill, monster_skills[skill_name], monster_misc[skill_name], monster_miscGear[skill_name]], function (values) {
      const stat_score = int(values[monster_skills[skill_name]]),
        miscSkill_score = int(values[monster_misc[skill_name]]),
        miscGear_score = int(values[monster_miscGear[skill_name]]);
      setAttrs({
        [monster_skill + "_total"]: stat_score + miscSkill_score + miscGear_score,
      });
    });
  });
});

/* set repeating armor rating */
on("change:repeating_armor:bonus change:repeating_armor:bonus_max change:repeating_armor:bonus_misc change:repeating_armor:equipped", function () {
  //clog("Change Detected: Repeating Armor Rating - recalculating rating totals");
  // made the change event specific, so its only fired when needed, and likewise reduced the getAttrs to those only needed
  getAttrs(["repeating_armor_bonus", "repeating_armor_bonus_misc", "repeating_armor_bonus_max", "repeating_armor_rating", "repeating_armor_equipped"], function (values) {
    const bonus = int(values.repeating_armor_bonus),
    bonus_misc = int(values.repeating_armor_bonus_misc),
    bonus_max = int(values.repeating_armor_bonus_max),
    equipped = int(values.repeating_armor_equipped);
    // separate out the basic values read from the sheet from those calculated within the worker
    const bonus_actual = Math.min(bonus, bonus_max);
    const rating = (bonus_actual + bonus_misc) * equipped;
    //clog("armor calculation: ( bonus " + bonus + " + bonus_misc " + bonus_misc + " ) * " + equipped + "  = rating " + rating);
    setAttrs({
      repeating_armor_bonus: bonus_actual,
      repeating_armor_rating: rating,
    });
    //clog("Armor rating: " + rating);
  });
});

/* set weapon base_total and skill_total */
on("change:repeating_weapons:weapon_name change:repeating_weapons:weapon_skill change:repeating_weapons:weapon_skill_misc", function () {
  //clog("Change Detected: Weapon Attacks - recalculating Base & Skill totals");
  // made the change event specific, so its only fired when needed, and likewise reduced the getAttrs to those only needed
  getAttrs(["repeating_weapons_weapon_skill", "repeating_weapons_weapon_skill_value", "repeating_weapons_weapon_skill_misc", "repeating_weapons_weapon_skill_total", "repeating_weapons_weapon_base_total", "strength_total", "agility_total", "shoot", "fight"], function (values) {
    const strength = int(values.strength_total),
      agility = int(values.agility_total),
      fight = int(values.fight),
      shoot = int(values.shoot),
      weapon_skill = int(values.repeating_weapons_weapon_skill),
      weapon_skill_misc = int(values.repeating_weapons_weapon_skill_misc);
    // separate out the basic values read from the sheet from those calculated within the worker. for clarity
    const attribute = weapon_skill === 0 ? strength : agility,
      skill = weapon_skill === 0 ? fight : shoot,
      weapon_base_total = attribute,
      weapon_skill_value = skill,
      weapon_skill_total = skill + weapon_skill_misc;
    setAttrs({
      repeating_weapons_weapon_base_total: weapon_base_total,
      repeating_weapons_weapon_skill_value: weapon_skill_value,
      repeating_weapons_weapon_skill_total: weapon_skill_total,
    });
    //clog(">>>> weapon_base_total: " + weapon_base_total);
    //clog(">>>> weapon_skill_value: " + weapon_skill_value);
    //clog(">>>> weapon_skill_total: " + weapon_skill_total);
  });
});

/* set weapon bonus_total and max */  
on("repeating_weapons:weapon_name change:repeating_weapons:weapon_bonus change:repeating_weapons:weapon_bonus_misc  change:repeating_weapons:weapon_bonus_max", function () {
  //clog("Change Detected: Weapon Attacks - recalculating Bonus totals");
  // made the change event specific, so its only fired when needed, and likewise reduced the getAttrs to those only needed
  getAttrs(["repeating_weapons_weapon_bonus", "repeating_weapons_weapon_bonus_misc", "repeating_weapons_weapon_bonus_max"], function (values) {
    const weapon_bonus_misc = int(values.repeating_weapons_weapon_bonus_misc),
      weapon_bonus = int(values.repeating_weapons_weapon_bonus),
      weapon_bonus_max = int(values.repeating_weapons_weapon_bonus_max);
    // separate out the basic values read from the sheet from those calculated within the worker
    //If weapon bonus max is 0, then set it to the value of the weapon bonus
    if (weapon_bonus_max === 0) {
      //clog("setting weapon bonus max to value of weapon bonus (since no max detected). New max value = "+weapon_bonus);
      setAttrs({repeating_weapons_weapon_bonus_max: weapon_bonus});
    }
    const weapon_bonus_total = Math.min(weapon_bonus, weapon_bonus_max) + weapon_bonus_misc;
    setAttrs({
      repeating_weapons_weapon_bonus_total: weapon_bonus_total,
    });
    //clog(">>>> weapon_bonus_total: " + weapon_bonus_total);
  });
});

/* set weapon damage totals */
on("change:repeating_weapons:weapon_damage change:repeating_weapons:weapon_damage_misc", function () {
 // clog("Change Detected: Weapon Damage - recalculating totals");
  getAttrs(["repeating_weapons_weapon_damage", "repeating_weapons_weapon_damage_misc"], function (values) {
    const weapon_damage = int(values.repeating_weapons_weapon_damage),
      weapon_damage_misc = int(values.repeating_weapons_weapon_damage_misc),
      damage = Math.max(weapon_damage + weapon_damage_misc, 0);
    setAttrs({
      repeating_weapons_weapon_damage_total: damage,
    });
    //clog(">>>> weapon_damage_total: " + damage);
  });
});

/* re-calculate repeating_weapons when outside attributes change */
on("change:strength_total change:agility_total change:fight change:shoot", function () {
  getSectionIDs("repeating_weapons", function (ids) {
    const fieldnames = [];
    ids.forEach((id) => {
      fieldnames.push(`repeating_weapons_${id}_weapon_skill`, `repeating_weapons_${id}_weapon_skill_misc`, `repeating_weapons_${id}_weapon_skill_value`, `repeating_weapons_${id}_weapon_bonus`, `repeating_weapons_${id}_weapon_bonus_max`, `repeating_weapons_${id}_weapon_bonus_misc`);
    });
    getAttrs(["strength_total", "agility_total", "fight", "shoot", ...fieldnames], function (values) {
      const settings = {};
      const strength = int(values.strength_total),
        agility = int(values.agility_total),
        fight = int(values.fight),
        shoot = int(values.shoot);

      ids.forEach((id) => {
        const weapon_skill = int(values[`repeating_weapons_${id}_weapon_skill`]),
          // calculate attribute total
          attribute = weapon_skill === 0 ? strength : agility,
          weapon_base_total = attribute;
        // calculate skill total
        const weapon_skill_misc = int(values[`repeating_weapons_${id}_weapon_skill_misc`]),
          skill = weapon_skill === 0 ? fight : shoot,
          weapon_skill_total = skill + weapon_skill_misc;
        //calculate bonus total
        const weapon_bonus = int(values[`repeating_weapons_${id}_weapon_bonus`]),
          weapon_bonus_max = int(values[`repeating_weapons_${id}_weapon_bonus_max`]),
          weapon_bonus_misc = int(values[`repeating_weapons_${id}_weapon_bonus_misc`]),
          weapon_bonus_total = Math.min(weapon_bonus, weapon_bonus_max) + weapon_bonus_misc;
        // no need to calculate damage total, its not affected by external factors
        settings[`repeating_weapons_${id}_weapon_base_total`] = weapon_base_total;
        settings[`repeating_weapons_${id}_weapon_skill_value`] = skill;
        settings[`repeating_weapons_${id}_weapon_skill_total`] = weapon_skill_total;
        settings[`repeating_weapons_${id}_weapon_bonus_total`] = weapon_bonus_total;
      });
      setAttrs(settings, { silent: true });
    });
  });
});

/* set project completion  */
on("change:repeating_projects:work_points change:repeating_projects:work_points_max", function () {
    //clog("Change Detected: Repeating Project Completion - recalculating completion");
    // made the change event specific, so its only fired when needed, and likewise reduced the getAttrs to those only needed
    getAttrs(["repeating_projects_work_points", "repeating_projects_work_points_max", "repeating_projects_complete"], function (values) {
      var points = int(values.repeating_projects_work_points),
      points_max = int(values.repeating_projects_work_points_max),
      complete = int(values.repeating_projects_complete);
      // separate out the basic values read from the sheet from those calculated within the worker
      points = Math.min(points,points_max),
      complete = (points === points_max) ? 1 : 0;
      const completedStr = (complete === 1) ? "completed" : "not completed";
      //clog("project completion: work points " + points + " < required points " + points_max + " => " + completedStr);
      setAttrs({
        repeating_projects_work_points: points,
        repeating_projects_complete: complete,
      });
    });
  });


/* Wes's Dice Pool */
const pools = {
  attribute: {
    max: 12,
    negative: 0,
  },
  skill: {
    max: 10,
    negative: 3,
  },
  gear: {
    max: 12,
    negative: 0,
  },
};
// need to know the max pool size for each type, and whether negative dice should be in the pool.
const numbers = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
// need to convert numbers 1-12 to text. left index 0 empty, as its not needed.
Object.keys(pools).forEach((which) => {
  on(`change:${which}`, function () {
    getAttrs([which], function (values) {
      let score = Math.min(pools[which].max, int(values[which]));
      const settings = {};
      // loop through numbers from 1 to the pool's max, and enter a value of 1 if less < pool value, or 0 otherwise.
      for (let d = 1; d <= pools[which].max; d++) {
        // pools[which].max gets the max value from the pools object.
        settings[`${which}_die_${numbers[d]}`] = d <= score ? 1 : 0;
        // `${which}_die_${numbers[d]}` creates a name like 'gear_die_three'
        //  (d <= score) ? 1 : 0; checks current index and assigns value of 1 if less than equal to pool score
        // settings[attribute] = value stores the appropriate attribute names and values
      }
      // need to check negative dice, and compare score
      // negative dice are set to zero. They are set to 1 only if pool.negative > 0, score is below zero, and absolute value of score is below 1-3.
      for (let n = 1; n <= 3; n++) {
        settings[`negative_die_${numbers[n]}`] = pools[which].negative && score < 0 && n <= Math.abs(score) ? 1 : 0;

        // clog("Negative dice are being evaluated. |pools.negative value=" + pools[which].negative + " |Skill score=" + score + " |n=" + n + " |abs of score=" + Math.abs(score) + " |include negative die=" + settings[`negative_die_${numbers[n]}`]);
      }
      setAttrs(settings);
    });
  });
});

/* Set whiper options for the sheet */ 
on("change:whisper", (ev) => {
  getAttrs(["api_toggle","whisper","whisper_option","whisper_option_api","translation_whisper_api_macro_query","translation_whisper_macro_query"], function (values) {
    const whisper = int(values.whisper),
          api = int(values.api_toggle),
          setter = {};
    if ( whisper === 1 ) {     
      setter.whisper_option = "/w gm";
      setter.whisper_option_api = "!wmyz";
      setter.whisper_the_roll = 1;
    } else if ( whisper === 2 ) {   
      setter.whisper_option = values.translation_whisper_macro_query;
      setter.whisper_option_api = values.translation_whisper_api_macro_query;
      setter.whisper_the_roll = 0;
    } else {              
      setter.whisper_option = "";
      setter.whisper_option_api = "!myz";
      setter.whisper_the_roll = 0;
    }

    //clog(`Whisper settings: whisper: ${values.whisper}, ${JSON.stringify(setter)}`);
    setAttrs(setter,silent);       
  });
});
on("change:rolltemplate_toggle", function(ev) {
  clog(`Rolltemplate type changed: ${JSON.stringify(ev)}`);
  getAttrs(["rolltemplate_option"], (values) => {
    const option = int(values.rolltemplate_option),
          setter = {};
    if ( option === 1 ) {
      setter.rolltemplate_option = "myz";
    } else {
      setter.rolltemplate_option = "mutantyearzero";
    }
    setAttrs(setter,{silent: true});
  });
});

/* Sheet worker for skills populating the dice pool */  
skillsArr.forEach((skill) => {
  //clog(`Creating sheet worker for skill ${skill.label} with Id ${skill['id']}`);
  on(`clicked:dice_pool_${skill['id']}`, () => skillDicePoolButtons(skill['id']));
});

const skillDicePoolButtons = (skillId) => {
  //clog(`Change Detected: Dice Pool ${skillId} - button clicked`);
  const skill = skillsArr.filter((skill) => skill.id === skillId)[0],
        rollname = getTranslationByKey(skill.label); 
  //clog(`Identified skill with Id ${skill.id}: ${JSON.stringify(skill)}`);
  getAttrs([ skill.attr, skill.level, skill.misc, skill.gear, "whisper" ], (values) => {
    //clog(`skill values: ${JSON.stringify(values)}`);
    //clog(`skill name translation: ${getTranslationByKey(skill.label)} `);
    const base = int(values[skill.attr]),
          whisper = values.whisper === "1" ? 1 : 0; 
    setAttrs({
      attribute: base > 0 ? base : 0 ,
      skill: int(values[skill.level]) + int(values[skill.misc]),
      gear: int(values[skill.gear]),
      current_preset: rollname,
      whisper_the_roll: whisper,
      pushable: 1,
      include_with_roll: `{{skill-base=${base} }} {{skill-skill=${int(values[skill.level])} }} {{skill-bonus-misc-skill=${int(values[skill.misc])}} } {{skill-bonus-misc-gear=${int(values[skill.gear])}} }`
    });
  });
}

/* DEPRECATED */
/*  
Object.keys(skills).forEach((skill) => {
  on(`clicked:dice_pool_${getSkill(skill)}`, () => dicePoolButtons(skill));
}); 

const dicePoolButtons = (which) => {
  //clog(`Change Detected: Dice Pool ${which} - button clicked`);
  getAttrs([skillAttrs[which], skillLevels[which], skillTotals[which], misc[which], miscGear[which], getSkill(which), getSkillKey(which), getSkillName(which),"whisper"], function (values) {
    //clog(`Dice pool button values: ${JSON.stringify(values)}`);
    // skillAttrs[which] returns the attribute; e.g skillAttrs['sneak'] gives 'agility_total'
    // getSkill(which) converts the skill name to a valid attribute string: getSkill('Know the zone') gives 'know-the-zone'
    // getSkillName(which) uses label, string or key to return character type specific translated skill name: getSkillName('Know the zone') gives 'Know nature' for Animals
    const stat = int(values[skillAttrs[which]]),
      miscSkill_score = Math.max(int(values[misc[which]]), -3),
      miscGear_score = int(values[miscGear[which]]),
      // stat here first gets skillAttrs['sneak'] which will be, say, 'agility' and
      //  then values['ability_total'] gives you the score from the character sheet.
      skill_attribute_selected = stat > 0 ? stat : 0,
      skill_bonus_misc_selected = miscSkill_score,
      skill_bonus_misc_gear_selected = miscGear_score,
      skill_only_selected = int(values[`${skillLevels[which]}`]),
      skill = getSkill(which),
      skill_name = getSkillName(skill); // used to get the proper translated character type skill
    //clog("Found skill button click, Skill key "+JSON.stringify(which)+" calculated to "+skill+" corresponding to character type "+skill_name);

    setAttrs({
      attribute: stat > 0 ? stat : 0, // this is a Ternary Operator, it starts with a question (e.g. is stat > 0)
      // and if true, returns the bit after the ? and if false returns the bit after the :
      // you can often replace simple if/then expressions with a single line ternary operator.
      // uses the translation key
      gear: miscGear_score,
      //skill: int(values[getSkill(which)]) + miscSkill_score, // Using skillTotals instead
      skill: int(values[`${skillLevels[which]}`]) + skill_bonus_misc_selected,
      skill_attribute_selected: skill_attribute_selected,
      skill_bonus_misc_selected: skill_bonus_misc_selected,
      skill_bonus_misc_gear_selected: skill_bonus_misc_gear_selected,
      skill_only_selected: skill_only_selected,
      //skill_notes_selected: skill_notes_selected,
      current_preset: skill_name,
      whisper_the_roll: int(values.whisper),
      include_with_roll: `{{skill-base=${skill_attribute_selected}}} {{skill-skill=${skill_only_selected}}} {{skill-bonus-misc-skill=${skill_bonus_misc_selected}}} {{skill-bonus-misc-gear=${skill_bonus_misc_gear_selected}}}}`, // {{skill-notes=${skill_notes_selected}}
    });
  });
}; 
*/

/*  */
Object.keys(monster_skills).forEach((monster_skill) => {
  on(`clicked:dice_pool_${getSkill(monster_skill)}`, () => monster_dicePoolButtons(monster_skill));
});  

/* Monster strength-based skill dice pool */
const monster_dicePoolButtons = (which) => {
  //clog(`Change Detected: Dice Pool ${which} - button clicked`);
  getAttrs([monster_skills[which], monster_misc[which], monster_miscGear[which], getSkill(which), getSkillKey(which), "whisper"], function (values) {
    const stat = int(values[monster_skills[which]]),
      miscSkill_score = Math.max(int(values[monster_misc[which]]), -3),
      miscGear_score = int(values[monster_miscGear[which]]);
    let whichKey = getTranslationByKey(getSkillKey(which));
    setAttrs({
      attribute: stat > 0 ? stat : 0,
      gear: miscGear_score,
      skill: miscSkill_score,
      current_preset: whichKey,
      whisper_the_roll: int(values.whisper),
      include_with_roll: "",
    });
  });
};

/* RESET DICE POOL */
on("sheet:opened clicked:dice_pool_clear", function () {
  getAttrs(["whisper"], (values) => { 
    //clog(`Change Detected: Clear Dice Pool - button clicked or sheet loaded (whisper is ${values.whisper})`);
    //const whisper = (int(values.whisper) === 1) ? 1 : 0;
    setAttrs({
      attribute: 0,
      skill: 0,
      gear: 0,
      current_preset: getTranslationByKey('custom-roll'),
      whisper_the_roll: int(values.whisper),
      include_with_roll: "",
      pushable: 1,
      push_latest: "",
      showattrextra: "0",
      showgearextra: "0",
    });
  });
});

on("clicked:add_die_attr clicked:add_die_gear", function(ev) {
  clog(`clicked add die: ${JSON.stringify(ev)}`);
  getAttrs(["","attribute","gear"], (values) => {
    const base = int(values.attribute),
          gear = int(values.gear),
          setter = {},
          silent = {silent: true};

    if( base <= 12 ) { setter.attribute = 13; }
    else { setter.attribute = base + 1; }
    clog(`clicked add die, setter: ${JSON.stringify(setter)}`);
    setAttrs(setter,silent);
  });
});

/* api dice toggle
on("clicked:api_dice_toggle", function () {
  //clog("Change Detected: API Dice Toggle - button clicked");
  getAttrs(["api_toggle"], function (values) {
    const api_toggle = int(values.api_toggle);
    let buttonState = api_toggle;

    if (buttonState !== 0) {
      buttonState = 0;
    } else {
      buttonState = 1;
    }
    setAttrs({
      api_toggle: buttonState,
    },{silent:true});
  });
});   */

/* Update the Dice Pool indicator */
on(
  "clicked:dice_pool_clear clicked:strength_roll clicked:agility_roll cliecked:wits_roll clicked:empathy_roll clicked:rot_roll clicked:repeating_skills:skill-roll clicked:dice_pool_force_monster clicked:dice_pool_endure_monster clicked:dice_pool_fight_monster clicked:dice_pool_force clicked:dice_pool_endure clicked:dice_pool_fight clicked:dice_pool_sneak clicked:dice_pool_know_the_zone clicked:dice_pool_move clicked:dice_pool_shoot clicked:dice_pool_scout clicked:dice_pool_comprehend clicked:dice_pool_manipulate clicked:dice_pool_sense_emotion clicked:dice_pool_heal clicked:reputation-roll clicked:repeating_weapons:attack-roll clicked:repeating_weapons:attack-parry-roll clicked:repeating_monster:monster-features-roll clicked:repeating_spells:spell-roll clicked:armor-roll",
  function () {
    //clog("Change Detected: Update Dice Pool");
    getAttrs(["roll_the_dice_flag"], function (values) {
      const flag = int(values.roll_the_dice_flag);
      setAttrs({
        roll_the_dice_flag: 1 - flag,
      });
    });
  }
);

on("sheet:opened change:roll_the_dice_flag", function (event) {
  //clog("Change Detected: resetting roll_the_dice_flag to zero");
  const flag = int(event.newValue) || 0; // you don't need to include the ,10
  if (flag === 1)
    setAttrs(
      {
        roll_the_dice_flag: 0,
      },
      {
        silent: true,
      }
    );
});

/* translate query text */
on("sheet:opened", function () {
  //clog("Translation of query text complete.");
  setAttrs({
    translation_push_query: getTranslationByKey("push-query"),
    translation_whisper_macro_query: "?{" + getTranslationByKey("whisper-macro") + "|" + getTranslationByKey("no") + ",|" + getTranslationByKey("yes") + ",/w gm |" + "}",
    translation_whisper_api_macro_query: "?{" + getTranslationByKey("whisper-macro") + "|" + getTranslationByKey("no") + ",!myz |" + getTranslationByKey("yes") + ",!wmyz |" + "}",
  });
});

const rollEscape = {
  chars: {
      '"': '%quot;',
      ',': '%comma;',
      ':': '%colon;',
      '}': '%rcub;',
      '{': '%lcub;',
  },
  escape(str) {
      str = (typeof(str) === 'object') ? JSON.stringify(str) : (typeof(str) === 'string') ? str : null;
      return (str) ? `${str}`.replace(new RegExp(`[${Object.keys(this.chars)}]`, 'g'), (r) => this.chars[r]) : null;
  },
  unescape(str) {
      str = `${str}`.replace(new RegExp(`(${Object.values(this.chars).join('|')})`, 'g'), (r) => Object.entries(this.chars).find(e=>e[1]===r)[0]);
      return JSON.parse(str);
  }
}

const expandDice = (dice,name) => {
  console.log("Expand dice: "+JSON.stringify(dice));
  var diceResults = dice.dice;
  var output = [];
  console.log("Output pre: "+ JSON.stringify(output));
  for(let i = 0; i < diceResults.length; i++) {
    output[`${name}-dice-${i}`] = `{"result": ${diceResults[i]},"dice": [${diceResults[i]}],"expression": "1D6","rolls": [{"sides": 6,"dice": 1,"results": [${diceResults[i]}] } ] }`;
  }
  console.log("Output post: "+ JSON.stringify(output));
  return output;
}

// Array to map number to literal numbers, e.g. 1 to "one", 2 to "two" by using litnum[1] and litnum[2] respectively
const litnum = [ "zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve" ];

on('clicked:push', async (ev) => {
  //clog("Starting push roll!");
  //clog(JSON.stringify(ev));
  const reroll = rollEscape.unescape(ev.originalRollId);
  //clog(`Reroll object: ${JSON.stringify(reroll)}`);
  const attributes = reroll.attributes,
     roll = reroll.roll;
  executeRoll({ev,attributes,roll});
});


on("clicked:roll_the_dice", () => {
  getAttrs( ["character_name", "character_id", "chartype","attribute", "skill", "gear", "current_preset",  "pushable","include_with_roll", "whisper_option", "whisper_the_roll","translation_whisper_macro_query"], async (values) => {

    const trigger = {name : values.current_preset},
      attributes = {
        character_name : values.character_name||"Unknown",
        character_id : values.character_id||0,
        chartype_id : values.chartype === 'Mutant' ? 1 : ( values.chartype === 'Animal' ? 2 : ( values.chartype === 'Robot' ? 3 : ( values.chartype === 'Human' ? 4 : 1 ))), 
      },
      roll = {  
        name: values.current_preset||'Roll',
        attribute: int(values.attribute),
        skill: int(values.skill),
        gear: int(values.gear),
        totalDice: int(values.attribute)+Math.abs(int(values.skill))+int(values.gear),
        whisper: ( int(values.whisper_the_roll) === 1 ) ? 
                  "/w gm" : ( int(values.whisper_the_roll) === 2 ) ? 
                  values.translation_whisper_macro_query : "",
        pushable: int(values.pushable),
        pushroll: 0,
        include: values.include_with_roll,
      };
    executeRoll({trigger,attributes,roll});
  });
});

const executeRoll = function({trigger,attributes,roll}) {
  var attributeStr = "",
      skillStr = "",
      gearStr = "",
      rollStr = "";

  //clog(`TEST: Roll object: ${JSON.stringify(roll)}`);
  //clog(`TEST: Roll pushRollStr: ${!!roll.pushRollStr}`);    

  if (roll.pushRollStr) {
    rollStr = roll.pushRollStr;
  } else {     
    for(let i = 1; i <= roll.attribute; i++) { attributeStr += `{{attribute-die-${litnum[i]}=[[1]] }} {{attribute-roll-${litnum[i]}= [[1d6cf<2cs>5]] }} `; }
    if( roll.skill >= 0 ) {
      for(let i = 1; i <= roll.skill; i++) { skillStr += `{{skill-die-${litnum[i]}= [[1]] }} {{skill-roll-${litnum[i]}= [[1d6cf<0cs>5]] }} `; }
    } else if ( roll.skill < 0) {
      for(let i = 1; i <= Math.abs(roll.skill); i++) { skillStr += `{{negative-die-${litnum[i]}= [[1]] }} {{negative-roll-${litnum[i]}= [[1d6cf<0cs>5]] }} `; }
    }
    for(let i = 1; i <= roll.gear; i++) { gearStr += `{{gear-die-${litnum[i]}= [[1]] }} {{gear-roll-${litnum[i]}= [[1d6cf<2cs>5]] }} `; }
    rollStr = `${roll.whisper} &{template:@{rolltemplate_option}} {{character_id=${attributes['character_id']}}} {{character_name=${attributes['character_name']}}} {{chartype_id=[[${attributes['chartype_id']}]]}} {{name=${roll.name}}} {{successes=[[0]]}} {{push=[[${roll.pushable}]]}} {{pushroll=[[${roll.pushroll}]]}} ${attributeStr} ${skillStr} ${gearStr}`;
  }    

  clog("Roll string; "+ rollStr);

  startRoll(rollStr, (results) => {
    //clog("Roll results: "+ JSON.stringify(results));

    var pushAttributeStr = "",
      pushSkillStr = "",
      pushGearStr = "",
      successes = 0,
      failures = 0,
      gearfails = 0; 
      
    roll.pushroll = roll.pushroll + 1;

    for(let i = 1; i <= roll.attribute; i++) { 
      let r = (results.results[`attribute-roll-${litnum[i]}`]).result;
      //clog(`results attribute ${i} : ${r}`);
      if ( r == '6' || r == 6 ) {        
        pushAttributeStr += `{{attribute-die-${litnum[i]}=[[1]] }} {{attribute-roll-${litnum[i]}=[[6cs>5]]}} `; 
        successes++;
        //clog(`results attribute die ${i} is 6, total ${successes} successes`);
      } else if ( r == '1' || r == 1 ) {     
        pushAttributeStr += `{{attribute-die-${litnum[i]}=[[1]] }} {{attribute-roll-${litnum[i]}=[[1cf<2]]}} `; 
        failures++;          
        //clog(`results attribute die ${i} is 0, total ${failures} failures`);
      } else {
        pushAttributeStr += `{{attribute-die-${litnum[i]}=[[1]] }} {{attribute-roll-${litnum[i]}=[[1d6cf<2cs>5]]}} `; 
        //clog(`results attribute die ${i} is ${r}, total ${successes} successes and ${failures} failures`);
      }
    }
    if ( roll.skill >= 0 ) {
      for(let i = 1; i <= roll.skill; i++) { 
        let r = (results.results[`skill-roll-${litnum[i]}`]).result;
        //clog(`results skill ${i} : ${r}`);
        if ( r == '6' || r == 6 ) {        
          pushSkillStr += `{{skill-die-${litnum[i]}=[[1]]}} {{skill-roll-${litnum[i]}=[[6cs>5]]}} `; 
          successes++;  
          //clog(`results skill die ${i} is 6, total ${successes} successes`);
        } else {
          pushSkillStr += `{{skill-die-${litnum[i]}=[[1]]}} {{skill-roll-${litnum[i]}=[[1d6cs>5]]}} `; 
          //clog(`results skill die ${i} is ${r}, total ${successes} successes and ${failures} failures`);
        }
      }
    } else if ( roll.skill < 0 ) {
      for(let i = 1; i <= Math.abs(roll.skill); i++) { 
        let r = (results.results[`negative-roll-${litnum[i]}`]).result;
        //clog(`negative skill ${i} : ${r}`);
        if ( r == '6' || r == 6 ) {        
          pushSkillStr += `{{negative-die-${litnum[i]}=[[1]]}} {{negative-roll-${litnum[i]}=[[6cs>5]]}} `; 
          successes++;  
          //clog(`results negative skill die ${i} is 6, total ${successes} successes (decreased)`);
        } else {
          pushSkillStr += `{{negative-die-${litnum[i]}=[[1]]}} {{negative-roll-${litnum[i]}=[[1d6cs>5]]}} `; 
          //clog(`results skill die ${i} is ${r}, total ${successes} successes and ${failures} failures`);
        }
      }
    }
    for(let i = 1; i <= roll.gear; i++) { 
      let r = (results.results[`gear-roll-${litnum[i]}`]).result;
      //clog(`results gear ${i} : ${r}`);
      if ( r == '6' || r == 6 ) {        
        pushGearStr += `{{gear-die-${litnum[i]}=[[1]]}} {{gear-roll-${litnum[i]}=[[6cs>5]]}} `; 
        successes++;
        //clog(`results gear die ${i} is 6, total ${successes} successes`);
      } else if ( r == '1' || r == 1 ) {     
        pushGearStr += `{{gear-die-${litnum[i]}=[[1]]}} {{gear-roll-${litnum[i]}=[[1cf<2]]}} `; 
        failures++;   
        gearfails++;       
        //clog(`results gear die ${i} is 0, total ${failures} failures and ${gearfails} from gear`);
      } else {
        pushGearStr += `{{gear-die-${litnum[i]}=[[1]]}} {{gear-roll-${litnum[i]}=[[1d6cf<2cs>5]]}} `;  
        //clog(`results gear die ${i} is ${r}, total ${successes} successes and ${failures} failures`);
      }
    }
    // NB: Successes and failures counts number fo dice which cannot be rerolled. 
    // In case of negative skill dice, the actual successes may be lower  
    if ( (successes + failures) == roll.totalDice ) {
      roll.pushable = 0;
    }

    roll.pushRollStr = `${roll.whisper} &{template:@{rolltemplate_option}} {{character_id=${attributes['character_id']}}} {{character_name=${attributes['character_name']}}} {{chartype_id=[[${attributes['chartype_id']}]]}} {{name=${roll.name}}} {{push=[[${roll.pushable}]]}} {{pushroll=[[${roll.pushroll}]]}} {{successes=[[${successes}]]}} {{failures=[[${failures}]]}} {{gearfails=[[${gearfails}]]}} ${pushAttributeStr} ${pushSkillStr} ${pushGearStr}`;
    
    const pushRoll = {
      attributes: attributes,
      roll: roll,
      successes: successes,
      failures: failures,
      gearfails: gearfails,
      totalDice: roll.totalDice,
      whisper: roll.whisper,
      include: roll.include,
    };
    
    setAttrs({
      push_latest: pushRoll,
      pushable: 1,
    });
    
    //clog("Push data: "+ JSON.stringify(pushRoll));
    finishRoll(results.rollId, {
      pushroll: rollEscape.escape(pushRoll),
      push: roll.pushable,
    });
  });
}

/* set weapon dice pool */
on("clicked:repeating_weapons:attack-roll", function () {
  //clog("Change Detected: Weapon Attack - button clicked");
  getAttrs( ["repeating_weapons_weapon_name", "repeating_weapons_weapon_skill", "repeating_weapons_weapon_base_total", "repeating_weapons_weapon_skill_misc", "repeating_weapons_weapon_skill_total", "repeating_weapons_weapon_bonus", "repeating_weapons_weapon_bonus_max", "repeating_weapons_weapon_bonus_misc", "repeating_weapons_weapon_bonus_total", "repeating_weapons_weapon_damage", "repeating_weapons_weapon_damage_misc", "repeating_weapons_weapon_damage_total", "repeating_weapons_weapon_range", "repeating_weapons_weapon_features", "strength_total", "agility_total", "shoot", "fight", "whisper"],
    function (values) {
      const weapon_name = values.repeating_weapons_weapon_name,
        weapon_base_total = int(values.repeating_weapons_weapon_base_total),
        weapon_bonus = int(values.repeating_weapons_weapon_bonus),
        weapon_bonus_misc = int(values.repeating_weapons_weapon_bonus_misc),
        weapon_bonus_max = int(values.repeating_weapons_weapon_bonus_max),
        weapon_bonus_total = int(values.repeating_weapons_weapon_bonus_total),
        weapon_skill_total = int(values.repeating_weapons_weapon_skill_total),
        weapon_damage = int(values.repeating_weapons_weapon_damage),
        weapon_damage_misc = int(values.repeating_weapons_weapon_damage_misc),
        weapon_range = values.repeating_weapons_weapon_range,
        weapon_features = values.repeating_weapons_weapon_features;
      setAttrs({
        attribute: weapon_base_total,
        gear: weapon_bonus_total,
        skill: weapon_skill_total,
        current_preset: getTranslationByKey(`attack`) + ` - ${weapon_name}`,
        whisper_the_roll: int(values.whisper),
        include_with_roll: `{{weapon-bonus=${weapon_bonus}}} {{weapon-bonus-max=${weapon_bonus_max}}} {{weapon-bonus-misc=${weapon_bonus_misc}}} {{weapon-damage=${weapon_damage}}} {{weapon-damage-misc=${weapon_damage_misc}}} {{weapon-range=${weapon_range}}} {{weapon-features=${weapon_features}}}`,
      });
    }
  );
});

/* set weapon parry dice pool */
on("clicked:repeating_weapons:attack-parry-roll", function () {
  //clog("Change Detected: Weapon Parry - button clicked");
  getAttrs( ["repeating_weapons_weapon_name", "repeating_weapons_weapon_skill", "repeating_weapons_weapon_base_total", "repeating_weapons_weapon_skill_misc", "repeating_weapons_weapon_skill_total", "repeating_weapons_weapon_bonus", "repeating_weapons_weapon_bonus_max", "repeating_weapons_weapon_bonus_misc", "repeating_weapons_weapon_bonus_total", "repeating_weapons_weapon_damage", "repeating_weapons_weapon_damage_misc", "repeating_weapons_weapon_damage_total", "repeating_weapons_weapon_range", "repeating_weapons_weapon_features", "strength_total", "agility_total", "shoot", "fight","whisper"],
    function (values) {
      const weapon_name = values.repeating_weapons_weapon_name,
        weapon_base_total = int(values.repeating_weapons_weapon_base_total),
        weapon_bonus = int(values.repeating_weapons_weapon_bonus),
        weapon_bonus_max = int(values.repeating_weapons_weapon_bonus_max),
        weapon_bonus_misc = int(values.repeating_weapons_weapon_bonus_misc),
        weapon_bonus_total = int(values.repeating_weapons_weapon_bonus_total),
        weapon_skill_total = int(values.repeating_weapons_weapon_skill_total),
        weapon_damage = int(values.repeating_weapons_weapon_damage),
        weapon_damage_misc = int(values.repeating_weapons_weapon_damage_misc),
        weapon_features = values.repeating_weapons_weapon_features;
      setAttrs({
        attribute: weapon_base_total,
        gear: weapon_bonus_total,
        skill: weapon_skill_total,
        current_preset: getTranslationByKey(`parry`) + ` - ${weapon_name}`,
        whisper_the_roll: int(values.whisper),
        include_with_roll: `{{weapon-bonus=${weapon_bonus}}} {{weapon-bonus-max=${weapon_bonus_max}}} {{weapon-bonus-misc=${weapon_bonus_misc}}} {{weapon-damage=${weapon_damage}}} {{weapon-damage-misc=${weapon_damage_misc}}} {{weapon-range=^{arms-length-abbr}}} {{weapon-features=${weapon_features}}}`,
      });
    }
  );
});

/* Monster attacks dice pool */
on("clicked:repeating_monster:monster-features-roll", function () {
  //clog("Change Detected: Monster Attack - button clicked");
  getAttrs(["repeating_monster_attack_name", "repeating_monster_attack_dice", "repeating_monster_attack_damage", "repeating_monster_attack_features", "repeating_monster_attack_range", "repeating_monster_attack_description", "whisper"], function (values) {
    const monster_attack_name = values.repeating_monster_attack_name,
      monster_attack_dice = int(values.repeating_monster_attack_dice),
      monster_attack_damage = int(values.repeating_monster_attack_damage),
      monster_attack_features = values.repeating_monster_attack_features,
      monster_attack_range = values.repeating_monster_attack_range,
      monster_attack_description = values.repeating_monster_attack_description,
      attribute = monster_attack_dice;
    setAttrs({
      attribute: attribute,
      skill: 0,
      gear: 0,
      current_preset: monster_attack_name,
      whisper_the_roll: int(values.whisper),
      include_with_roll: `{{weapon-damage=${monster_attack_damage}}} {{attack-features=${monster_attack_features}}} {{weapon-range=${monster_attack_range}}} {{attack-description=${monster_attack_description}}}`,
    });
  });
});


/* set prof skill dice pool */
on("clicked:repeating_skills", function () {
  //clog("Change Detected: Profession Skill - button clicked");
  getAttrs(["repeating_skills_name", "repeating_skills_base", "repeating_skills_skill", "repeating_skills_misc", "repeating_skills_gear","whisper"], function (values) {
    const skill_name = values.repeating_skills_name,
      skill_base = int(values.repeating_skills_base),
      skill_level = int(values.repeating_skills_skill),
      skill_misc = int(values.repeating_skills_misc),
      skill_gear = int(values.repeating_skills_gear),
      skill_skill = skill_level + skill_misc;
    setAttrs({
      attribute: skill_base,
      skill: skill_skill,
      gear: skill_gear,
      current_preset: `${skill_name}`,
      whisper_the_roll: int(values.whisper),
      include_with_roll: `{{skill-base=${skill_base}}} {{skill-level=${skill_level}}} {{skill-bonus-misc=${skill_misc}}} {{skill-bonus-gear=${skill_gear}}}`,
    });
  });
});

/* set dice pool for Powers action button - NOT WORKING (buttons are hidden) */
const powers = ["mutations","modules","animalpowers","contacts","whisper"];
powers.forEach(pow => {
  on(`clicked:repeating_${pow}:powerroll`, (eventInfo) => {
    //clog(JSON.stringify(eventInfo.sourceAttribute));
    var getAttrsString = [`repeating_${pow}_name`,`repeating_${pow}_powerlevel`];
    getAttrs(getAttrsString, function(values) {
      const name = values[`repeating_${pow}_name`],
        level = int(values[`repeating_${pow}_powerlevel`]),
        setAttrObj = {
          attribute: level,
          skill: 0,
          gear: 0,
          current_preset: getTranslationByKey(`power`) + ` - ${name}`,
          whisper_the_roll: int(values.whisper),
          include_with_roll: ``,
        };
        //clog(name);
        //clog(level);
        //clog(JSON.stringify(setAttrObj));
      SetAttrs(setAttrObj);/**/
    });
  });
});

/* set spell dice pool
on("clicked:repeating_spells:spell-roll", function () {
  //clog("Change Detected: Spell - button clicked");
  getAttrs(["repeating_spells_spell_name", "repeating_spells_spell_rank", "repeating_spells_spell_range", "repeating_spells_spell_duration", "repeating_spells_spell_ingredients", "repeating_spells_spell_description", "repeating_spells_spell_powerpoint", "powerpoint", "whisper"], function (values) {
    const spell_name = values.repeating_spells_spell_name,
      spell_rank = int(values.repeating_spells_spell_rank),
      spell_powerpoint = int(values.repeating_spells_spell_powerpoint),
      spell_range = values.repeating_spells_spell_range,
      spell_duration = values.repeating_spells_spell_duration,
      spell_ingredients = values.repeating_spells_spell_ingredients,
      spell_description = values.repeating_spells_spell_description,
      powerpoint = int(values.powerpoint);
    setAttrs({
      attribute: spell_powerpoint,
      skill: 0,
      gear: 0,
      current_preset: getTranslationByKey(`spell`) + ` - ${spell_name}`,
      whisper_the_roll: int(values.whisper),
      include_with_roll: `{{powerpoint-total=${powerpoint}}} {{spell-rank=${spell_rank}}} {{spell-powerpoint=${spell_powerpoint}}} {{spell-range=${spell_range}}} {{spell-duration=${spell_duration}}} {{spell-ingredients=${spell_ingredients}}} {{spell-description=${spell_description}}}`,
    });
  });
}); */

/* set armor dice pool */
on("clicked:armor-roll", function () {
  //clog("Change Detected: Armor - button clicked");
  getAttrs(["ar_total","whisper"], function (values) {
      const ar_total = int(values.ar_total);
      setAttrs({
        attribute: 0,
        gear: ar_total,
        skill: 0,
        current_preset: getTranslationByKey(`armor-roll`),
        whisper_the_roll: int(values.whisper),
        include_with_roll: `{{armor-rating=[[ ${ar_total} ]]}}`,
        pushable: 0,
      });
    }
  );
});

/* set rot dice pool */
on("clicked:rot_roll", function () {
  //clog("Change Detected: Rot - button clicked");
  getAttrs(["rot", "rot_permanent","whisper"], function (values) {
      const rot = int(values.rot),
        rot_permanent = int(values.rot_permanent);
      setAttrs({
        attribute: rot,
        gear: 0,
        skill: 0,
        current_preset: getTranslationByKey(`rot-roll`),
        whisper_the_roll: int(values.whisper),
        include_with_roll: `{{rot-level=[[ ${rot} ]]}} {{rot-permanent=[[ ${rot_permanent} ]]}}`,
        pushable: 0,
      });
    }
  );
});  
 
/* vehicle/Beast Carry calcs */
const carry = (strength, vehicleed) => (strength * 4) / (vehicleed + 1);

on("change:vehicleed change:vehicle_strength", function () {
  //clog("Change Detected: vehicleed/Unvehicleed");
  getAttrs(["vehicleed", "vehicle_strength"], function (values) {
    const vehicleed = int(values["vehicleed"]),
      strength = int(values["vehicle_strength"]),
      Carry = carry(strength, vehicleed);
    setAttrs({
      vehicle_carry: Carry,
    });
  });
});

on("change:repeating_beasts", function () {
  //clog("Change Detected: Beasts Check Carry Calculation");
  getAttrs(["repeating_beasts_beast_vehicleed", "repeating_beasts_beast_strength"], function (values) {
    const vehicleed = int(values["repeating_beasts_beast_vehicleed"]),
      strength = int(values["repeating_beasts_beast_strength"]),
      Carry = carry(strength, vehicleed);
    setAttrs({
      repeating_beasts_beast_carry: Carry,
    });
  });
});
  
/* Broken Indicator flags*/
// first create an array listing all 4 stats
const stats = ["strength_pc", "strength_monster", "agility", "wits", "empathy"];

// attribute and skill maximum
// function which takes an attribute name, its score, and its max, and checks the score is valid.
// if not, resets its value.
const checkMax = (stat, score, max) => {
  const settings = {};
  if (score > max) {
    settings[stat] = max;
  } else if (score < 0) {
    settings[stat] = 0;
  }
  return settings;
};
stats.forEach((stat) => {
  on(`change:${stat} change:tab`, function () {
    getAttrs([stat, "tab"], function (values) {
      const total = int(values[stat]);
      const tab = values.tab;
      //clog("Attribute "+stat+" on tab "+tab+" is "+total);
      //clog("tab === 'monster' = "+(tab === 3 || tab === 'monster'));
      var max = tab === 'monster' ? 12 : 6;
      // const max attribute = 12 for monsters; 
      //clog("tab === 'monster' && stat === strength_monster = "+tab === 'monster' && stat === 'strength_monster');
      max = tab === 'monster' && stat === 'strength_monster' ? 40 : 12;
      // const max strength = 40 for monsters; 
      const settings = checkMax(stat, total, max);
      if (settings) setAttrs(settings);
    });
  });
});

/* Duplicate
Object.keys(attributes).forEach((stat) => {
  on(`change:${stat}`, function () {
    getAttrs([stat], function (values) {
      const total = int(values[stat]);
      const max = pools.attribute.max;
      const settings = checkMax(stat, total, max);
      if (settings) setAttrs(settings);
    });
  });
});
*/

/* Update attributes total max
on("sheet:opened change:strength_total", function () {
  //clog("Change Detected: strength_total has changed");
  getAttrs(["strength", "strength_total"], function (values) {
    const strength = int(values.strength),
      strength_total = int(values.strength_total);
    setAttrs({
      strength: strength,
      strength_total: strength_total,
    });
  });
});

on("sheet:opened change:agility_total", function () {
  //clog("Change Detected: agility_total has changed");
  getAttrs(["agility", "agility_total"], function (values) {
    const agility = int(values.agility),
      agility_total = int(values.agility_total);
    setAttrs({
      agility: agility,
      agility_total: agility_total,
    });
  });
});

on("sheet:opened change:wits_total", function () {
  //clog("Change Detected: wits_total has changed");
  getAttrs(["wits", "wits_total"], function (values) {
    const wits = int(values.wits),
      wits_total = int(values.wits_total);
    setAttrs({
      wits: wits,
      wits_total: wits_total,
    });
  });
});

on("sheet:opened change:empathy_total", function () {
  //clog("Change Detected: empathy_total has changed");
  getAttrs(["empathy", "empathy_total"], function (values) {
    const empathy = int(values.empathy),
      empathy_total = int(values.empathy_total);
    setAttrs({
      empathy: empathy,
      empathy_total: empathy_total,
    });
  });
}); */

mainAttributesArr.forEach( (attrb) => {
  on(`sheet:opened change:${attrb.name}_total`, function () {
    //clog(`Change Detected: ${attrb.name}_total has changed`);
    getAttrs([`${attrb.name}`, `${attrb.name}_total`], function (values) {
      const attr = int(values[`${attrb.name}`]),
        attr_total = int(values[`${attrb.name}_total`]);
      setAttrs({
        [`${attrb.name}`]: attr,
        [`${attrb.name}_total`]: attr_total,
      });
    });
  });
});
attributesArr.forEach( (attrb) => {
  on(`clicked:${attrb.name}_roll`, function (ev) {
    //clog(`Change Detected: ${attrb.name} - button clicked`);
    //clog(`Event : ${JSON.stringify(ev)}`);
     getAttrs([`${attrb.attr}_total`, "whisper"], function (values) {
       const total = int(values[`${attrb.attr}_total`]),
            name = getTranslationByKey(attrb.name);
       //clog(name + " : " + total);
       setAttrs({
         attribute: total,
         skill: 0,
         gear: 0,
         current_preset: name,
         whisper_the_roll: int(values.whisper),
         include_with_roll: "",
       });
     });
   });
});

/* set strength dice pool
on("clicked:strength_roll", function () {
  //clog("Change Detected: Strength - button clicked");
  getAttrs(["strength_total", "strength_name"], function (values) {
    const strength_total = int(values.strength_total),
    strength_name = values.strength_name;
    //clog(strength_name + " : " + strength);
    setAttrs({
      attribute: strength_total,
      skill: 0,
      gear: 0,
      current_preset: strength_name,
      include_with_roll: "",
    });
  });
}); */

/* set agility dice pool
on("clicked:agility_roll", function () {
  //clog("Change Detected: agility - button clicked");
  getAttrs(["agility_total", "agility_name"], function (values) {
    const agility_total = int(values.agility_total),
    agility_name = values.agility_name;
    //clog(agility_name + " : " + agility_total);
    setAttrs({
      attribute: agility_total,
      skill: 0,
      gear: 0,
      current_preset: agility_name,
      include_with_roll: "",
    });
  });
}); */

/* set wits dice pool
on("clicked:wits_roll", function () {
  //clog("Change Detected: wits - button clicked");
  getAttrs(["wits_total","wits_name"], function (values) {
    const wits_total = int(values.wits_total),
    wits_name = values.wits_name;
    //clog(wits_name + " : " + wits_total);
    setAttrs({
      attribute: wits_total,
      skill: 0,
      gear: 0,
      current_preset: wits_name,
      include_with_roll: "",
    });
  });
}); */

/* set empathy dice pool
on("clicked:empathy_roll", function () {
  //clog("Change Detected: empathy - button clicked");
  getAttrs(["empathy_total", "empathy_name"], function (values) {
    const empathy_total = int(values.empathy_total),
    empathy_name = values.empathy_name;
    //clog(empathy_name + " : " + empathy_total);
    setAttrs({
      attribute: empathy_total,
      skill: 0,
      gear: 0,
      current_preset: empathy_name,
      include_with_roll: "",
    });
  });
}); */

/* beautify preserve:end */