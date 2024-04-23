/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//Expands/collapses the sections
const expandHeader = function(jEvent){
  debug('entering expandHeader');
  const name = jEvent.htmlAttributes.name.replace(/act_/,'');
  const target = `.${name}.expandable-header`;
  _getAttrs(['collapsed'],(attributes)=>{
    attributes.collapsed = attributes.collapsed.split(/\s*,\s*/).filter(b => b!==name && !/^\s*$/.test(b) );
    if(!/collapse/.test(jEvent.htmlAttributes.class)){
      attributes.collapsed.push(name);
    }
    attributes.collapsed = attributes.collapsed.join(',');
    $20(target).toggleClass('collapse');
    attributes.set();
  });
};
funcs.expandHeader = expandHeader;

const imageInput = function({trigger,attributes,sections}){
  debug('entering imageInput');
  let [section,rowID,field] = parseTriggerName(trigger.name);
  if(!field) return;
  if(!attributes[field]){
    attributes[field] = 'https://s3.amazonaws.com/files.d20.io/images/259054779/OzN3yQwg7MbfXNtMYs-iOg/original.png';
  }
  $20(`.${field.replace(/_/g,'-')} .image-container__input`).removeClass('active');
};
funcs.imageInput = imageInput;

const toggleImageInput = function(jEvent){
  debug({jEvent});
  let field = parseHTMLName(jEvent.htmlAttributes.name);
  debug({field});
  $20(`.${field.replace(/_/g,'-')} .image-container__input`).toggleClass('active');
};
funcs.toggleImageInput = toggleImageInput;

//Calls the appropriate dynamic query function for the event
const dynamicSelect = function(event){
  let[section,rowID,field] = parseClickTrigger(event.triggerName);
  field = field.replace(/-action$/,'');
  if(dynamicQueries[field]){
    getAllAttrs({callback:async (attributes,sections)=>{
      let selection = await dynamicQueries[field]({section,rowID,field},attributes,sections);
      attributes[`${section}_${rowID}_${field}`] = selection;
      attributes[`${section}_${rowID}_translate_${field}`] = getTranslationByKey(selection) ? 1 : 0;
      attributes.set();
    }});
  }
};
funcs.dynamicSelect = dynamicSelect;

const skillQuery = function(click,attributes,sections){
  let query = sections.repeating_skill.reduce((prompt,id)=>{
    if(attributes[`repeating_skill_${id}_raw`]){
      prompt.push(`${capitalize(getTranslationByKey(attributes[`repeating_skill_${id}_name`]))},${attributes[`repeating_skill_${id}_name`]}`);
    }else{
      prompt.push(capitalize(attributes[`repeating_skill_${id}_name`]));
    }
    return prompt;
  },[`${getTranslationByKey('skill query')}`]).join('|');
  query = `${query}`
  return extractQueryResult(query); 
};
funcs.skillQuery = skillQuery;
dynamicQueries.skill = skillQuery;
//Click Functions
//These functions are fired in response to an action button being clicked.
//Clears a tracker of all damage
const clearTracker = function(event){
  debug('clearing tracker');
  let [section,rowID,field] = parseClickTrigger(event.triggerName);
  getAllAttrs({callback:(attributes,sections,casc)=>{
    sections[section].forEach((id)=>{
      attributes[`${section}_${id}_damaged`] = 0;
      attributes[`${section}_${id}_fill`] = 0;
    });
    let attr = section.replace(/repeating_/,'');
    attributes[attr] = attributes[`${attr}_max`];
    let trigger = casc[`attr_${attr}`];
    attributes.processChange({trigger,attributes,sections,casc});
  }});
};
funcs.clearTracker = clearTracker;

const addItem = function(event){
  debug(`adding repeating item from ${event.triggerName}`);
  let [,,section] = parseClickTrigger(event.triggerName);
  section = section.replace(/add-/,'');
  let rowID = generateRowID();
  const setObj = {};
  setObj[`repeating_${section}_${rowID}_name`] = '';
  set(setObj);
};
funcs.addItem = addItem;

const editSection = function(event){
  debug(`editing repeating section from ${event.triggerName}`);
  let [,,section] = parseClickTrigger(event.triggerName);
  section = section.replace(/edit-/,'');
  let target = `fieldset.repeating_${section} + .repcontainer`;
  $20(target).toggleClass('editmode');
};
funcs.editSection = editSection;