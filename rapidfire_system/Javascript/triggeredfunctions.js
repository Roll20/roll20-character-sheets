/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
// Triggered Functions
const setActionCalls = function({attributes,sections}){
  debug('setting action calls');
  debug({actionAttributes});
  debug({attributes});
  debug({character_name:attributes.character_name,assault_roll_action:attributes.assault_roll_action});
  actionAttributes.forEach((base)=>{
    let [section,,field] = parseTriggerName(base);
    let fieldAction = field.replace(/_/g,'-');
    if(section){
      sections[section].forEach((id)=>{
        attributes[`${section}_${id}_${field}`] = `%{${attributes.character_name}|${section}_${id}_${fieldAction}}`;
      });
    }else{
      attributes[`${field}`] = `%{${attributes.character_name}|${fieldAction}}`;
    }
  });
};
funcs.setActionCalls = setActionCalls;

const checkHealth = function({trigger,attributes,sections}){
  debug('checking current health trackers')
  let [section,rowID] = parseRepeatName(trigger.name);
  let currDamage = sections[section].indexOf(rowID);
  sections[section].forEach((id,index)=>{
    if(index !== currDamage){
      attributes[`${section}_${id}_damaged`] =  0;
    }
    attributes[`${section}_${id}_fill`] = index < currDamage ? 1 : 0;
  });
};
funcs.checkHealth = checkHealth;

const updateTrack = function({section,attributes,sections}){
  let newTracks = attributes[`${section}_max`] - sections[`repeating_${section}`].length;
  if(newTracks > 0){
    _.range(newTracks).forEach((n)=>{
      let newID = generateRowID();
      let priorPenalties = sections[`repeating_${section}`].slice(Math.max(0,sections[`repeating_${section}`].length - 2))
        .map((id)=>{
          return attributes[`repeating_${section}_${id}_penalty`];
        });
      let newPenalty;
      if(priorPenalties[0] !== priorPenalties[1]){
        newPenalty = priorPenalties[1] || priorPenalties[0];
      }else{
        let penStart = priorPenalties[1] || priorPenalties[0];
        newPenalty = Math.max(Math.min(-3,penStart),penStart - 1);
      }
      attributes[`repeating_${section}_${newID}_damaged`] = 0;
      attributes[`repeating_${section}_${newID}_penalty`] = newPenalty;
      sections[`repeating_${section}`].push(newID);
    });
  }else if(newTracks < 0){
    let slicePoint = Math.max(0,sections[`repeating_${section}`].length + newTracks);
    let extraTracks = sections[`repeating_${section}`].slice(slicePoint);
    extraTracks.forEach((id)=>{
      _removeRepeatingRow(`repeating_${section}_${id}`,attributes,sections);
    });
  }
};
funcs.updateTrack = updateTrack;

const maxHealth = function({type,attributes}){
  const typeSwitch = {
    structure:()=> attributes.structure_base,
    health:()=> 3 + attributes.body + attributes.body_mod + attributes.spirit + attributes.spirit_mod + attributes.health_mod
  }
  return Math.max(typeSwitch[type](),1);
};
funcs.maxHealth = maxHealth;

const calcHealth = function({trigger,attributes,sections}){
  const type = trigger.name.replace(/_max/,'');
  debug(`calculating ${type}`);
  attributes[`${type}_max`] = maxHealth({type,attributes});
  let healthDiff = attributes[`${type}_max`] - value(attributes.attributes[`${type}_max`]);
  updateTrack({section:type,attributes,sections});
  attributes[type] = attributes[type] + healthDiff;
  syncHealth({trigger,attributes,sections});
};
funcs.calcHealth = calcHealth;

const skillEffects = function({trigger,attributes,sections}){
  let [section,rowID,field] = parseRepeatName(trigger.name);
  let skillName = attributes[`${section}_${rowID}_name`];
  const skillSwitch = {
    dodge:['defence'],
    awareness:['initiative']
  };
  if(skillSwitch[skillName]){
    trigger.affects = [...trigger.affects,...skillSwitch[skillName]];
  }
};
funcs.skillEffects = skillEffects;

const validateActionPenalty = function({attributes}){
  if(attributes.action_penalty > 0){
    attributes.action_penalty = attributes.action_penalty * -1;
  }
};
funcs.validateActionPenalty = validateActionPenalty;