/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
/*
  Sheet Styling
*/
const navigateSheet = function(event){
  debug('navigating sheet');
  const setObj = {};
  let [,,page] = parseClickTrigger(event.triggerName);
  page = page.replace(/nav-|-action/g,'');
  debug({page});
  navButtons.forEach((button)=>{
    let element = button.replace(/-action/,'');
    let action = element === page ? 'addClass' : 'removeClass';
    $20(`.${element}`)[action]('active');
  });
  setObj.sheet_state = page;
  debug({setObj});
  set(setObj);
};
funcs.navigateSheet = navigateSheet;

const setupSystem = function(trigger,attributes,sections){
  setupAttributes(attributes,sections);
  setupSkills(attributes,sections);
  setupHealth(attributes,sections);
};

const setupAttributes = function(attributes,sections){
  const attrDetails = systemDefaults[attributes.system].attributes;
  Object.entries(attrDetails).forEach(([attr,value])=>{
    attributes[attr] = value;
  });
};

const setupSkills = function(attributes,sections){
  let skillDetails = systemDefaults[attributes.system].repeating_skill.values;
  let missingSkills = Object.keys(skillDetails).filter((skill)=>sections.repeating_skill.every((id)=>attributes[`repeating_skill_${id}_name`]===skill));
  missingSkills.forEach((skill)=>{
    let newID = generateRowID();
    attributes[`repeating_skill_${newID}_name`] = skill;
    attributes[`repeating_skill_${newID}_stat`] = /\//.test(skillDetails[skill]) ? 'query' : skillDetails[skill];
    attributes[`repeating_skill_${newID}_raw`] = 1;
  });
};

const setupHealth = function(attributes,sections){
  let healthDetails = systemDefaults[attributes.system].repeating_health.values;
  if(healthDetails && !sections.repeating_health.length){
    healthDetails.forEach((penalty)=>{
      let newID = generateRowID();
      attributes[`repeating_health_${newID}_penalty`] = penalty;
    });
    attributes.health = healthDetails.length;
    attributes.health_max = attributes.health;
  }
  let structureDetails = systemDefaults[attributes.system].repeating_structure.values;
  if(structureDetails && !sections.repeating_structure.length){
    structureDetails.forEach((penalty)=>{
      let newID = generateRowID();
      attributes[`repeating_structure_${newID}_penalty`] = penalty;
    });
    attributes.structure = structureDetails.length;
    attributes.structure_max = attributes.structure;
    attributes.structure_base = attributes.structure;
  }
};