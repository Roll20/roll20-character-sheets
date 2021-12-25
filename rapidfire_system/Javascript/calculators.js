/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//Calculation Functions

const calcInitiative = function(trigger,attributes,sections){
  debug('calculating initiative');
  let awarenessID = sections.repeating_skill.find((id)=>attributes[`repeating_skill_${id}_name`] === 'awareness');
  let awareness = attributes[`repeating_skill_${awarenessID}_level`];
  return awareness + attributes.mind + attributes.initiative_mod;
};

const calcDefence = function(trigger,attributes,sections){
  debug('calculating defense');
  let dodgeID = sections.repeating_skill.find((id)=>attributes[`repeating_skill_${id}_name`] === 'dodge');
  let dodge = attributes[`repeating_skill_${dodgeID}_level`];
  let damagePenalty = determinePenalty('health',attributes,sections);
  let total =  3 + attributes.body + dodge + attributes.shield_bonus + damagePenalty + attributes.defence_mod;
  return Math.max(total,0);
};

const totalHealth = function(trigger,attributes,sections){
  const type = trigger.name.replace(/_max/,'');
  debug(`calculating total ${type}`);
  return sections[`repeating_${type}`].reduce((total,id)=>{
    total -= attributes[`repeating_${type}_${id}_damaged`] + attributes[`repeating_${type}_${id}_fill`];
    return total;
  },attributes[`${type}_max`]);
};

const calcResist = function(trigger,attributes,sections){
  debug('calculating resist');
  return Math.max(attributes.spirit + attributes.armour_bonus + attributes.resist_mod,0);
};

const calcSA = function(trigger,attributes,sections){
  debug('calculating situational awareness');
  return ['body','mind','spirit'].reduce((m,attr)=>{
    return m + attributes[attr];
  },0);
};

const calcRemnantInitiative = function(trigger,attributes,sections){
  debug('calculating remnant initiative');
  let awarenessID = sections.repeating_skill.find((id)=>attributes[`repeating_skill_${id}_name`] === 'awareness');
  let awareness = attributes[`repeating_skill_${awarenessID}_level`];
  let penalty = determinePenalty('structure',attributes,sections);
  return attributes.situational_awareness + awareness + penalty;
};

const calcRemnantDefence = function(trigger,attributes,sections){
  debug('calculating remnant defence');
  let damagePenalty = determinePenalty('structure',attributes,sections);
  debug({damagePenalty});
  return Math.max(attributes.speed + attributes.situational_awareness + attributes.motion_level + damagePenalty,0);
};

const calcStrikeRange = function(trigger,attributes,sections){
  debug('calculating strike range');
  const [section,rowID,field] = parseTriggerName(trigger.name);
  let strike = section ? `${section}_${rowID}_strike` : 'strike_level';
  return attributes[strike] * 100;
};

const calcRemnantDamage = function(trigger,attributes,sections){
  debug('calculating remnant damage');
  let [section,rowID,field] = parseTriggerName(trigger.name);
  let skill = attributes[`${section}_${rowID}_skill`];
  return attributes[`${skill}_damage`] + attributes[`${section}_${rowID}_damage_bonus`];
};