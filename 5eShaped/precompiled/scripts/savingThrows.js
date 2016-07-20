/* global on:false */

import { ABILITIES } from './constants';
import { getSetItems, getIntValue, getAbilityShortName, addArithmeticOperator, isUndefinedOrEmpty, exists, showSign } from './utilities';

const getHighestOfAbilityScoresForSavingThrow = (v, savingThrowName) => {
  let abilityName;
  let highestValue = 0;
  for (const ability of ABILITIES) {
    const abilityMod = getIntValue(v[`${ability}_mod`]);
    if (v[`${savingThrowName}_${ability}`] === '1' && (highestValue === 0 || abilityMod > highestValue)) {
      highestValue = abilityMod;
      abilityName = ability;
    }
  }
  return abilityName;
};
const findHighest = (arr) => {
  const highestAbility = Math.max.apply(Math, arr.map((ability) => ability.score));
  return arr.find((ability) => ability.score === highestAbility);
};
const getHighestAbilityScores = (v, savingThrowName) => {
  const abilities = [];
  for (const ability of ABILITIES) {
    if (v[`${savingThrowName}_${ability}`] === '1') {
      abilities.push({
        name: ability,
        score: getIntValue(v[`${ability}_calculated`]),
      });
    }
  }

  const highestAbilities = [];
  if (abilities.length > 0) {
    const highestAbilityObj = findHighest(abilities);

    highestAbilities.push(highestAbilityObj);
    abilities.splice(abilities.findIndex((ability) => ability.name === highestAbilityObj.name), 1);
  }
  if (abilities.length > 0) {
    const secondHighestAbilityObj = findHighest(abilities);
    highestAbilities.push(secondHighestAbilityObj);
  }

  return highestAbilities;
};
const getAverageOfHighestAbilityScoresForSavingThrow = (v, savingThrowName) => {
  const obj = {
    abilitiesUsed: [],
  };
  let sum = 0;

  const highestAbilities = getHighestAbilityScores(v, savingThrowName);
  for (const ability of highestAbilities) {
    obj.abilitiesUsed.push(getAbilityShortName(ability.name));
    sum += (getIntValue(v[`${ability.name}_calculated`]) - 10) / 2;
  }

  if (obj.abilitiesUsed.length > 0) {
    obj.avg = Math.floor(sum / obj.abilitiesUsed.length);
  }
  return obj;
};
const setCustomSaveProf = (v, finalSetAttrs, savingThrowName) => {
  const pbVar = '@{PB}';
  for (const ability of ABILITIES) {
    if (v[`${savingThrowName}_${ability}`] === '1' && v[`${ability}_save_prof`] === pbVar && !exists(v[`${savingThrowName}_save_prof`])) {
      finalSetAttrs[`${savingThrowName}_save_prof`] = pbVar;
    }
  }
};
const updateSavingThrow = (savingThrowName) => {
  const collectionArray = ['pb', `${savingThrowName}_save_prof`, `${savingThrowName}_save_bonus`, 'global_saving_throw_bonus', 'saving_throws_half_proficiency', 'average_of_abilities'];
  const customSaves = ['fortitude', 'reflex', 'will'];
  const customSavingThrow = customSaves.indexOf(savingThrowName) !== -1;
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_calculated`);
    collectionArray.push(`${ability}_mod`);
    collectionArray.push(`${savingThrowName}_${ability}`);
    if (customSavingThrow) {
      collectionArray.push(`${ability}_save_prof`);
    }
  }

  getSetItems('updateSavingThrow', {
    collectionArray,
    callback: (v, finalSetAttrs) => {
      let total = 0;
      let totalFormula = '';
      let ability;

      if (customSavingThrow) {
        if (v.average_of_abilities === '1') {
          const obj = getAverageOfHighestAbilityScoresForSavingThrow(v, savingThrowName);

          if (obj.avg) {
            total = obj.avg;
            totalFormula = `${obj.avg}[${obj.abilitiesUsed.join(' ')} avg]`;
          }
        } else {
          ability = getHighestOfAbilityScoresForSavingThrow(v, savingThrowName);
        }
        setCustomSaveProf(v, finalSetAttrs, savingThrowName);
      } else {
        ability = savingThrowName;
      }

      if (ability) {
        const abilityMod = getIntValue(v[`${ability}_mod`]);
        total = abilityMod;
        totalFormula = `${abilityMod}[${getAbilityShortName(ability)}]`;
      }

      const pb = getIntValue(v.pb);
      if (v[`${savingThrowName}_save_prof`] === '@{PB}') {
        total += pb;
        totalFormula += `${addArithmeticOperator(totalFormula, pb)}[proficient]`;
      } else if (v.saving_throws_half_proficiency === 'on') {
        const halfPB = Math.floor(pb / 2);
        total += halfPB;
        totalFormula += `${addArithmeticOperator(totalFormula, halfPB)}[half proficiency]`;
      }

      const abilitySavingThrowBonus = getIntValue(v[`${savingThrowName}_save_bonus`]);
      if (abilitySavingThrowBonus) {
        total += abilitySavingThrowBonus;
        totalFormula += `${addArithmeticOperator(totalFormula, abilitySavingThrowBonus)}[${getAbilityShortName(ability)}saving throw bonus]`;
      }

      const globalSavingThrowBonus = v.global_saving_throw_bonus;
      if (!isUndefinedOrEmpty(globalSavingThrowBonus)) {
        if (!isNaN(globalSavingThrowBonus)) {
          total += getIntValue(globalSavingThrowBonus);
        }
        totalFormula += `${addArithmeticOperator(totalFormula, globalSavingThrowBonus)}[global saving throw bonus]`;
      }

      finalSetAttrs[`${savingThrowName}_saving_throw_mod`] = totalFormula;
      finalSetAttrs[`${savingThrowName}_saving_throw_mod_with_sign`] = showSign(total);
    },
  });
};
const updateCustomSavingThrows = () => {
  updateSavingThrow('fortitude');
  updateSavingThrow('reflex');
  updateSavingThrow('will');
};
const updateCustomSavingThrowToggle = () => {
  getSetItems('updateCustomSavingThrowToggle', {
    collectionArray: ['use_custom_saving_throws', 'saving_throw_macro_var_to_use'],
    callback: (v, finalSetAttrs) => {
      if (v.use_custom_saving_throws === '1') {
        finalSetAttrs.saving_throw_macro_var_to_use = '@{custom_saving_throw_macro_var}';
      } else {
        finalSetAttrs.saving_throw_macro_var_to_use = '@{saving_throw_macro_var}';
      }
    },
  });
};
const updateSavingThrows = () => {
  updateSavingThrow('strength');
  updateSavingThrow('dexterity');
  updateSavingThrow('constitution');
  updateSavingThrow('intelligence');
  updateSavingThrow('wisdom');
  updateSavingThrow('charisma');
  updateCustomSavingThrows();
};
const updateSavingThrowsFromSRD = () => {
  getSetItems('updateSavingThrowsFromSRD', {
    collectionArray: ['saving_throws_srd'],
    callback: (v, finalSetAttrs) => {
      const savingThrowsFromSRD = v.saving_throws_srd;
      const pbVar = '@{PB}';

      if (savingThrowsFromSRD.indexOf('Str') !== -1) {
        finalSetAttrs.strength_save_prof = pbVar;
      }
      if (savingThrowsFromSRD.indexOf('Dex') !== -1) {
        finalSetAttrs.dexterity_save_prof = pbVar;
      }
      if (savingThrowsFromSRD.indexOf('Con') !== -1) {
        finalSetAttrs.constitution_save_prof = pbVar;
      }
      if (savingThrowsFromSRD.indexOf('Int') !== -1) {
        finalSetAttrs.intelligence_save_prof = pbVar;
      }
      if (savingThrowsFromSRD.indexOf('Wis') !== -1) {
        finalSetAttrs.wisdom_save_prof = pbVar;
      }
      if (savingThrowsFromSRD.indexOf('Cha') !== -1) {
        finalSetAttrs.charisma_save_prof = pbVar;
      }
    },
  });
};
const watchForCustomSavingThrowChanges = (savingThrowName) => {
  const classFeatureWatch = [`change:${savingThrowName}_save_prof`, `change:${savingThrowName}_save_bonus`, 'change:average_of_abilities'];
  for (const ability of ABILITIES) {
    classFeatureWatch.push(`change:${savingThrowName}_${ability}`);
  }
  on(classFeatureWatch.join(' '), () => {
    updateSavingThrow(savingThrowName);
  });
};
const watchAbilityChanges = () => {
  const classFeatureWatch = [];
  for (const ability of ABILITIES) {
    classFeatureWatch.push(`change:${ability}`);
    classFeatureWatch.push(`change:${ability}_mod`);
  }
  on(classFeatureWatch.join(' '), () => {
    updateCustomSavingThrows();
  });
};

const savingThrowsSetup = () => {
  on('change:strength_mod change:strength_save_prof change:strength_save_bonus', () => {
    updateSavingThrow('strength');
  });
  on('change:dexterity_mod change:dexterity_save_prof change:dexterity_save_bonus', () => {
    updateSavingThrow('dexterity');
  });
  on('change:constitution_mod change:constitution_save_prof change:constitution_save_bonus', () => {
    updateSavingThrow('constitution');
  });
  on('change:intelligence_mod change:intelligence_save_prof change:intelligence_save_bonus', () => {
    updateSavingThrow('intelligence');
  });
  on('change:wisdom_mod change:wisdom_save_prof change:wisdom_save_bonus', () => {
    updateSavingThrow('wisdom');
  });
  on('change:charisma_mod change:charisma_save_prof change:charisma_save_bonus', () => {
    updateSavingThrow('charisma');
  });
  on('change:pb change:global_saving_throw_bonus change:saving_throws_half_proficiency', () => {
    updateSavingThrows();
  });
  on('change:use_custom_saving_throws', () => {
    updateCustomSavingThrowToggle();
  });
  on('change:saving_throws_srd', () => {
    updateSavingThrowsFromSRD();
  });
  watchForCustomSavingThrowChanges('fortitude');
  watchForCustomSavingThrowChanges('reflex');
  watchForCustomSavingThrowChanges('will');
  watchAbilityChanges();
};

export { savingThrowsSetup, updateCustomSavingThrows, updateCustomSavingThrowToggle, updateSavingThrows };
