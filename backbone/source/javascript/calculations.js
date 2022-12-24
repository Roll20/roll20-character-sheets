/**
 * Function to calculate the raw attribute score
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcAttribute = function({trigger,attributes,sections,casc}){
  const [charac1,charac2] = attributesDetails[trigger.name];
  return 10 + attributes[charac1] + attributes[charac2];
};
k.registerFuncs({calcAttribute});

/**
 * Function to calculate the attribute modifier
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcAttributeMod = function({trigger,attributes,sections,casc}){
  const baseName = `${trigger.name}_goal`;
  return attributes[baseName] - 11;
};
k.registerFuncs({calcAttributeMod});

/**
 * Function to calculate the sprint speed of a character
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcSprint = function({trigger,attributes,sections,casc}){
  return attributes.athletics * 5 + 10;
};
k.registerFuncs({calcSprint});

/**
 * Function to calculate the movement speed of a character
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcMovement = function({trigger,attributes,sections,casc}){
  return attributes.athletics * 5 + 20;
};
k.registerFuncs({calcMovement});

/**
 * Calculates the maximum item slots that can be used without penalty
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcItemSlotsMax = function({trigger,attributes,sections,casc}){
  return Math.max(
    attributes.size + 3,
    attributes.athletics + attributes.size + 1
  );
};
k.registerFuncs({calcItemSlotsMax});

/**
 * Calculates how many slots have been used based on the equipped gear and weapon sections
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcUsedSlots = function({trigger,attributes,sections,casc}){
  const equippedIDs = [
    ...sections.repeating_equipped.map(id => `repeating_equipped_${id}`),
    ...sections.repeating_weapon.map(id => `repeating_weapon_${id}`)
  ];
  let freeWeapons = 3;
  return equippedIDs
    .reduce((total,section) => {
      if(
        attributes[`${section}_uses_slot`] && 
        (
          !section.startsWith('repeating_weapon') ||
          freeWeapons <= 0
        )  
      ){
        total += 1;
      }
      if(
        section.startsWith('repeating_weapon') &&
        freeWeapons > 0
      ){
        freeWeapons--;
      }
      return total;
    },0);
};
k.registerFuncs({calcUsedSlots});

/**
 * Calculates whether the character is overburdened or not, returning 1 if they are and 0 otherwise
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcOverburdened = function({trigger,attributes,sections,casc}){
  return attributes.item_slots_max - attributes.item_slots < 0 ?
    1 :
    0;
};
k.registerFuncs({calcOverburdened});