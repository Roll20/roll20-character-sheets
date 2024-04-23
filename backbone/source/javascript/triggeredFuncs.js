/**
 * (un)equips armor items
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const equipArmor = function({trigger,attributes,sections,casc}){
  const [section,rowID,attr] = k.parseTriggerName(trigger.name);
  const row = section ?
    `${section}_${rowID}` :
    k.generateRowID('repeating_stored',sections);
  const armorAttrs = {
    equipped:{
      'armor':attributes[`${row}_armor_bonus`],
      'armor_name':attributes[`${row}_name`],
      'armor_details':attributes[`${row}_description`],
      'armor_size':attributes[`${row}_item_size`],
    },
    stored:{
      [`${row}_armor_bonus`]:attributes.armor,
      [`${row}_name`]:attributes.armor_name,
      [`${row}_description`]:attributes.armor_details,
      [`${row}_item_size`]:attributes.armor_size,
    }
  };
  const actionType = section ? 'equipped' : 'stored';
  const attrMap = armorAttrs[actionType];
  // If we are equipping a stored armor, then store the currently equipped armor in the stored items repeating section.
  if(section){
    equipArmor({trigger:{name:'armor_name'},attributes,sections,casc});
  }
  if(
    !section && attributes.armor_name
  ){
    attrMap[`${row}_type`] = 'armor';
  }
  // copy the values to the target
  Object.entries(attrMap)
    .forEach(([key,val]) => {
      if(section || val){
        attributes[key] = val;
      }
    });
  // If we equipped a stored armor, remove it from the stored gear repeating section.
  if(section){
    k.removeRepeatingRow(row,attributes,sections);
  }else{
    Object.keys(armorAttrs.equipped).forEach(
      attr => attributes[attr] = ''
    );
  }
};
k.registerFuncs({equipArmor});

/**
 * Moves gear/weapon/armor items around on the sheet equip/unequip them.
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const equipItem = function({trigger,attributes,sections,casc}){
  const [section,rowID,attr] = k.parseTriggerName(trigger.name);
  const row = `${section}_${rowID}`;
  if(
    section === 'repeating_stored' &&
    attributes[`${row}_type`] === 'armor'){
      equipArmor({trigger,attributes,sections,casc});
      return;
    }
  const newSection = section === 'repeating_stored' ?
    (
      attributes[`${row}_type`] === 'weapon' ?
        'repeating_weapon' :
        'repeating_equipped'
    ):
    'repeating_stored';
  const newRow = k.generateRowID(newSection,sections);
  Object.keys(casc)
    .forEach(cascKey => {
      if(cascKey.startsWith(`attr_${row}`)){
        const attrRef = cascKey.replace(/attr_repeating_[^_]+_[^_]+_/,'');
        k.debug({[attrRef]:attributes[`${row}_${attrRef}`]})
        attributes[`${newRow}_${attrRef}`] = attributes[`${row}_${attrRef}`];
      }
    });
  attributes[`${newRow}_equipped`] = newSection.endsWith('stored') ?
    0 :
    1;
  if(section !== 'repeating_stored'){
    attributes[`${newRow}_type`] = section.endsWith('equipped') ?
      'gear' :
      'weapon';
  }else{
    attributes[`${newRow}_type`] = attributes[`${newRow}_type`] || 'gear';
  }
  k.removeRepeatingRow(row,attributes,sections);
  k.setActionCalls({attributes,sections});
};
k.registerFuncs({equipItem});

/**
 * Manipulates the classes on the npc skill containers to ensure that only those with an entered value are displayed in collapsed mode
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const displayNPCSkill = function({trigger,attributes,sections,casc}){
  const skill = trigger.name;
  const rawSkillValue = attributes.attributes[skill];
  const action = rawSkillValue ?
    'removeClass' :
    'addClass';
  const $elem = $20(`.npc-${skill.replace(/\s+/g,'-').replace(/\(|\)|\//g,'')}-container`);
  $elem[action]('expanded');
};
k.registerFuncs({displayNPCSkill});

/**
 * Sets up the npc skill display based on the collected values by calling displayNPCSkill for each skill
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const NPCSkillSetup = function({trigger,attributes,sections,casc}){
  Object
    .keys(skills)
    .forEach((skill) =>
      displayNPCSkill({trigger:{name:skill},attributes,sections,casc}));
};
k.registerFuncs({NPCSkillSetup},{type:['opener']});

/**
 * 
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const showConditions = function({trigger,attributes,sections,casc}){
  $20('#pc-conditions .sidebar-toggle,#pc-conditions').removeClass('fresh');
  $20('#pc-conditions').toggleClass('active');
};
k.registerFuncs({showConditions});

/**
 * Resets the tracker for a condition to 0 when the condition is turned off
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const resetCondition = function({trigger,attributes,sections,casc}){
  if(attributes[trigger.name]){
    attributes[`track_${trigger.name}`] = '';
  }
};
k.registerFuncs({resetCondition});

/**
 * Decrements the indicated input
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
 const decrementInput = function({trigger,attributes,sections,casc}){
  const [section,rowID,buttonName] = k.parseTriggerName(trigger.name);
  const attrName = buttonName.replace(/^decrement-/,'').replace(/-/g,'_');
  attributes[attrName] -= 1;
};
k.registerFuncs({decrementInput});

/**
 * Increments the indicated input
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const incrementInput = function({trigger,attributes,sections,casc}){
  const [section,rowID,buttonName] = k.parseTriggerName(trigger.name);
  const attrName = buttonName.replace(/^increment-/,'').replace(/-/g,'_');
  attributes[attrName] += 1;
};
k.registerFuncs({incrementInput});

/**
 * Sets the pc/npc specific button displays
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const sheetTypeDisplay = function({trigger,attributes,sections,casc}){
  if(attributes.character_type === 'pc'){
    $20('.tabs--backbone__button--pc').removeClass('inactive');
    $20('.tabs--backbone__button--npc').addClass('inactive');
  }else{
    $20('.tabs--backbone__button--pc').addClass('inactive');
    $20('.tabs--backbone__button--npc').removeClass('inactive');
  }
};
k.registerFuncs({sheetTypeDisplay},{type:['opener']});


/**
 * Handles the necessary setup for adding a weapon
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const addWeapon = function({trigger,attributes,sections,casc,newRow}){
  attributes[`${newRow}_type`] = 'weapon';
};
k.registerFuncs({addWeapon});