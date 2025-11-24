/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//Calculation Functions

const calcInitiative = function({trigger,attributes,sections}){
  debug('calculating initiative');
  let awarenessID = sections.repeating_skill.find((id)=>attributes[`repeating_skill_${id}_name`] === 'awareness');
  let awareness = attributes[`repeating_skill_${awarenessID}_level`];
  return awareness + attributes.mind + attributes.mind_mod + attributes.initiative_mod;
};
funcs.calcInitiative = calcInitiative;

//Determines which penalty to apply (if any)
const determinePenalty = function(type,attributes,sections){
  let damageID = sections[`repeating_${type}`].find((id)=> attributes[`repeating_${type}_${id}_damaged`] === 1);
  return damageID ?  attributes[`repeating_${type}_${damageID}_penalty`] : 0;
}; 

const calcDefence = function({trigger,attributes,sections}){
  debug('calculating defense');
  let dodgeID = sections.repeating_skill.find((id)=>attributes[`repeating_skill_${id}_name`] === 'dodge');
  let dodge = attributes[`repeating_skill_${dodgeID}_level`];
  let damagePenalty = determinePenalty('health',attributes,sections);
  let total =  3 + attributes.body + attributes.body_mod + dodge + attributes.shield_bonus + damagePenalty + attributes.defence_mod;
  return Math.max(total,0);
};
funcs.calcDefence = calcDefence;

const totalHealth = function({trigger,attributes,sections}){
  const type = trigger.name.replace(/_max/,'');
  debug(`calculating total ${type}`);
  return sections[`repeating_${type}`].reduce((total,id)=>{
    total -= attributes[`repeating_${type}_${id}_damaged`] + attributes[`repeating_${type}_${id}_fill`];
    return total;
  },attributes[`${type}_max`]);
};
funcs.totalHealth = totalHealth;

const calcResist = function({trigger,attributes,sections}){
  debug('calculating resist');
  return Math.max(attributes.spirit + attributes.spirit_mod + attributes.armour_bonus + attributes.resist_mod,0);
};
funcs.calcResist = calcResist;

const calcSA = function({trigger,attributes,sections}){
  debug('calculating situational awareness');
  return ['body','mind','spirit'].reduce((m,attr)=>{
    return m + attributes[attr] + attributes[`${attr}_mod`];
  },0);
};
funcs.calcSA = calcSA;

const calcRemnantInitiative = function({trigger,attributes,sections}){
  debug('calculating remnant initiative');
  let awarenessID = sections.repeating_skill.find((id)=>attributes[`repeating_skill_${id}_name`] === 'awareness');
  let awareness = attributes[`repeating_skill_${awarenessID}_level`];
  let penalty = determinePenalty('structure',attributes,sections);
  return attributes.situational_awareness + awareness + penalty;
};
funcs.calcRemnantInitiative = calcRemnantInitiative;

const calcRemnantDefence = function({trigger,attributes,sections}){
  debug('calculating remnant defence');
  let damagePenalty = determinePenalty('structure',attributes,sections);
  debug({damagePenalty});
  return Math.max(attributes.speed + attributes.situational_awareness + attributes.motion_level + damagePenalty,0);
};
funcs.calcRemnantDefence = calcRemnantDefence;

const calcStrikeRange = function({trigger,attributes,sections}){
  debug('calculating strike range');
  const [section,rowID,field] = parseTriggerName(trigger.name);
  let strike = section ? `${section}_${rowID}_strike` : 'strike_level';
  return attributes[strike] * 100;
};
funcs.calcStrikeRange = calcStrikeRange;

const calcRemnantDamage = function({trigger,attributes,sections}){
  debug('calculating remnant damage');
  let [section,rowID,field] = parseTriggerName(trigger.name);
  let skill = attributes[`${section}_${rowID}_skill`];
  return attributes[`${skill}_damage`] + attributes[`${section}_${rowID}_damage_bonus`];
};
funcs.calcRemnantDamage = calcRemnantDamage;