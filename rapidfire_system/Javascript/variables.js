/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//Sheet Variables
const sheetName = 'Rapidfire System';
const version = 1.01;
let debugMode = false;
//const actionAttributes = ['body','mind','spirit','initiative','repeating_skill_$x_roll','repeating_weapon_$x_roll','situational_awareness','remnant_initiative','assault_roll','strike_roll','motion_roll','repeating_remnant-weapon_$x_roll','repeating_drone_$x_assault','repeating_drone_$x_strike'];
const systemDefaults = {
  'remnants':{
    repeating_skill:{field:'name',additional:true,values:{"archery / throwing":"body","athletics":"body","awareness":"mind","bureaucracy":"mind","command":"mind or spirit","craft":"body / mind / spirit","dodge":"body","etiquette":"spirit","history":"mind","investigation":"mind / spirit","language":"mind","larceny":"mind / body / spirit","lore":"mind","medicine":"mind","melee":"body","perform":"spirit","ride":"body / spirit","sail":"mind / spirit","sciences":"mind","social sciences":"mind","stealth":"body","survival":"mind","unarmed combat":"body"}},
    repeating_health:{field:'penalty',additional:true,values:[0,-1,-1],alternate:true},
    repeating_structure:{field:'penalty',additional:true,values:[0,0,-1,-1,-2],alternate:true},
    attributes:{system_header:'https://s3.amazonaws.com/files.d20.io/images/260489274/xCVgiDGF-dMYpVGKXL5UXA/original.png',armour:5,speed:3,assault_damage:4,strike_damage:2,inspiring:1,terrifying:1}
  }
};
const systems = ['remnants'];
const repeatMonitor = [];
const listeners = {};
const dynamicQueries = {};
const baseGet = Object.entries(cascades).reduce((memo,[attrName,detailObj])=>{
  if(!/repeating/.test(attrName) && detailObj.type !== 'action'){
    memo.push(detailObj.name);
  }
  if(detailObj.listener){
    listeners[detailObj.listener] = detailObj.listenerFunc;
  }
  return memo;
},['sheet_state','section_state','character_name']);
const updateHandlers = {};