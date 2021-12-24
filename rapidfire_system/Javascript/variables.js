/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//Sheet Variables
const sheetName = 'Rapidfire System';
const version = 1.0;
let debugMode = false;
//Object that defines how the attributes affect each other
const repeatingSectionDetails = [
  {section:'repeating_health',fields:['damaged','penalty','fill']},
  {section:'repeating_structure',fields:['damaged','penalty','fill']},
  {section:'repeating_skill',fields:['name','level','stat','xp','raw','roll_action']},
  {section:'repeating_weapon',fields:['name','skill','stat','translate skill','damage','notes','collapse','roll_action']},
  {section:'repeating_remnant-weapon',fields:['name','skill','bonus','damage','damage_bonus','type','notes','collapse','roll_action','notes']},
  {section:'repeating_drone',fields:['name','active','sa','collapse','def','arm','spd','struct','assault','assault_dam','strike','strike_dam','strikerange','strike_action','assault_action','description']}
];
//const actionAttributes = ['body','mind','spirit','initiative','repeating_skill_$x_roll','repeating_weapon_$x_roll','situational_awareness','remnant_initiative','assault_roll','strike_roll','motion_roll','repeating_remnant-weapon_$x_roll','repeating_drone_$x_assault','repeating_drone_$x_strike'];
const systemDefaults = {
  'remnants':{
    repeating_skill:{field:'name',additional:true,values:{"archery / throwing":"body","athletics":"body","awareness":"mind","bureaucracy":"mind","command":"mind or spirit","craft":"body / mind / spirit","dodge":"body","etiquette":"spirit","history":"mind","investigation":"mind / spirit","language":"mind","larceny":"mind / body / spirit","lore":"mind","medicine":"mind","melee":"body","perform":"spirit","ride":"body / spirit","sail":"mind / spirit","sciences":"mind","social sciences":"mind","stealth":"body","survival":"mind","unarmed combat":"body"}},
    repeating_health:{field:'penalty',additional:true,values:[0,-1,-1],alternate:true},
    repeating_structure:{field:'penalty',additional:true,values:[0,0,-1,-1,-2],alternate:true},
    attributes:{system_header:'https://s3.amazonaws.com/files.d20.io/images/260489274/xCVgiDGF-dMYpVGKXL5UXA/original.png',armour:5,speed:3,assault_damage:4,strike_damage:2,inspiring:1,terrifying:1}
  }
};

const cascades = {
  /*template
  attribute_name:{
    name:'attribute_name',
    affects:['array','of','attributes','affected'],
    calculation:funcCall,//Calculation for this attribute; optional property
    triggeredFuncs:[func,func]
  }*/
  // ## Character stats ##
  character_name:{name:'character_name',type:'text',affects:[],triggeredFuncs:[setActionCalls]},
  sheet_version:{name:'sheet_version',type:'number',defaultValue:0,affects:[]},
  system:{name:'system',affects:[],triggeredFuncs:[setupSystem]},

  //Stats
  body:{name:'body',type:'number',defaultValue:0,affects:['defence','health_max','situational_awareness'],triggerdFuncs:[syncHealth]},
  mind:{name:'mind',type:'number',defaultValue:0,affects:['initiative','situational_awareness']},
  spirit:{name:'spirit',type:'number',defaultValue:0,affects:['resist','health_max','situational_awareness'],triggerdFuncs:[syncHealth]},

  //Secondary Stats
  initiative:{name:'initiative',type:'number',defaultValue:0,affects:[],calculation:calcInitiative},
  initiative_mod:{name:'initiative_mod',type:'number',defaultValue:0,affects:['initiative']},
  defence:{name:'defence',type:'number',defaultValue:3,affects:[],calculation:calcDefence},
  resist:{name:'resist',type:'number',defaultValue:0,affects:[],calculation:calcResist},
  defence_mod:{name:'defence_mod',type:'number',defaultValue:0,affects:['defence']},
  resist_mod:{name:'resist_mod',type:'number',defaultValue:0,affects:['resist']},
  health:{name:'health',type:'number',defaultValue:3,affects:['defence'],calculation:totalHealth,initialFunc:syncHealth},
  health_max:{name:'health_max',type:'number',defaultValue:3,affects:['defence'],triggeredFuncs:[calcHealth]},
  health_mod:{name:'health_mod',type:'number',defaultValue:0,affects:['health_max']},

  //Combat Gear
  armour_bonus:{name:'armour_bonus',type:'number',defaultValue:0,affects:['resist']},
  shield_bonus:{name:'shield_bonus',type:'number',defaultValue:0,affects:['defence']},
  action_penalty:{name:'action_penalty',type:'number',defaultValue:0,affects:[],triggeredFuncs:[validateActionPenalty]},

  //Health Track
  repeating_health_$x_damaged:{name:'repeating_health_$x_damaged',type:'number',defaultValue:0,affects:['health'],triggeredFuncs:[checkHealth]},
  repeating_health_$x_fill:{name:'repeating_health_$x_fill',type:'number',defaultValue:0,affects:[]},
  repeating_health_$x_penalty:{name:'repeating_health_$x_penalty',type:'number',defaultValue:0,affects:['defence']},

  //Skills
  repeating_skill_$x_level:{name:'repeating_skill_$x_level',type:'number',defaultValue:0,affects:[],triggeredFuncs:[skillEffects]},

  // ## Remnant Attributes ##
  remnant_token:{name:'structure',type:'number',defaultValue:3,affects:[],triggeredFuncs:[imageInput]},

  //Ratings
  situational_awareness:{name:'situational_awareness',type:'number',defaultValue:0,affects:['remnant_initiative','remnant_defence'],calculation:calcSA},
  remnant_defence:{name:'remnant_defence',type:'number',defaultValue:0,affects:[],calculation:calcRemnantDefence},
  remnant_initiative:{name:'remnant_initiative',type:'number',defaultValue:0,affects:[],calculation:calcRemnantInitiative},

  //Stats
  speed:{name:'speed',type:'number',defaultValue:0,affects:['remnant_defence']},
  strike_range:{name:'strike_range',type:'number',defaultValue:0,affects:[],calculation:calcStrikeRange},

  structure:{name:'structure',type:'number',defaultValue:5,affects:['remnant_defence'],calculation:totalHealth,initialFunc:syncHealth},
  structure_base:{name:'structure_base',type:'number',defaultValue:5,affects:['structure_max']},
  structure_max:{name:'structure_max',type:'number',defaultValue:5,affects:['remnant_defence'],triggeredFuncs:[calcHealth]},
  strike_damage:{name:'strike_damage',type:'number',defaultValue:0,affects:['repeating_remnant-weapon_$x_damage']},
  assault_damage:{name:'assault_damage',type:'number',defaultValue:0,affects:['repeating_remnant-weapon_$x_damage']},

  //Remnant Skills
  strike_level:{name:'strike_level',type:'number',defaultValue:0,affects:['strike_range']},
  assault_level:{name:'assault_level',type:'number',defaultValue:0,affects:[]},
  motion_level:{name:'motion_level',type:'number',defaultValue:0,affects:['remnant_defence']},

  //Structure Track
  repeating_structure_$x_damaged:{name:'repeating_structure_$x_damaged',type:'number',defaultValue:0,affects:['structure'],triggeredFuncs:[checkHealth]},
  repeating_structure_$x_fill:{name:'repeating_structure_$x_fill',type:'number',defaultValue:0,affects:[]},
  repeating_structure_$x_penalty:{name:'repeating_structure_$x_penalty',type:'number',defaultValue:0,affects:['remnant_defence']},

  //remnant-weapons
  'repeating_remnant-weapon_$x_damage':{name:'repeating_remnant-weapon_$x_damage',type:'number',defaultValue:0,affects:[],calculation:calcRemnantDamage},
  'repeating_remnant-weapon_$x_skill':{name:'repeating_remnant-weapon_$x_skill',type:'text',defaultValue:'assault',affects:['repeating_remnant-weapon_$x_damage']},
  'repeating_remnant-weapon_$x_damage_bonus':{name:'repeating_remnant-weapon_$x_damage_bonus',type:'number',defaultValue:0,affects:['repeating_remnant-weapon_$x_damage']},

  //remnant Drones
  'repeating_drone_$x_strike':{name:'repeating_drone_$x_strike',type:'number',defaultValue:0,affects:['repeating_drone_$x_strikerange']},
  'repeating_drone_$x_active':{name:'repeating_drone_$x_active',type:'number',defaultValue:0,affects:[]},
  'repeating_drone_$x_strikerange':{name:'repeating_drone_$x_strikerange',type:'number',defaultValue:0,affects:[],calculation:calcStrikeRange},
};
const systems = ['remnants'];
const repeatMonitor = [];
//const rollMonitor = ['body-action','mind-action','spirit-action','initiative-action','situational-awareness-action','remnant-initiative-action','assault-roll-action','strike-roll-action','motion-roll-action','repeating_skill:roll-action','repeating_weapon:roll-action','repeating_drone:assault-action','repeating_drone:strike-action','repeating_remnant-weapon:roll-action'];
//const navButtons = ['character','settings','battle-remnant'];
//const repeatAddMonitors = ['skill','weapon','advantage','disadvantage','adjustment','specialty','trait','drone','remnant-weapon'];
//const queryButtons = ['repeating_weapon:skill'];
//const trackerMonitors = ['repeating_structure:clear','repeating_health:clear'];
const dynamicQueries = {skill:skillQuery};
const baseGet = ['sheet_state','section_state','character_name'];
let toMonitor = Object.keys(cascades).reduce((m,k)=>{
  if(!/repeating/.test(k)){
    baseGet.push(k);
    if(!/max/.test(k)){
      m.push(k);
    }
  }else if(/repeating/.test(k)){
    k.replace(/(repeating_[^_]+?)_[^_]+?_(.+)/,(match,section,field)=>{
      repeatMonitor.push(`${section}:${field}`);
    });
  }
  return m;
},[]);
debug({cascades,baseGet});
toMonitor = [...toMonitor,...repeatMonitor];
registerEventHandlers();
log(`Sheet Loaded`);