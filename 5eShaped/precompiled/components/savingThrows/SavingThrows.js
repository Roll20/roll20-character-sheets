/* global on:false */

import { getSetItems, getIntValue, getAbilityShortName, addArithmeticOperator, isUndefinedOrEmpty, exists, showSign, getAbilityMod, getAbilityValue } from './../../scripts/utilities';
import { ABILITIES } from './../../scripts/constants';

export class SavingThrows {
  getHighestOfAbilityScoresForSavingThrow(v, savingThrowName) {
    let abilityName;
    let highestValue = 0;
    for (const ability of ABILITIES) {
      const abilityMod = getIntValue(v[`${ability}_mod`]);
      if (getIntValue(v[`${savingThrowName}_${ability}`]) === 1 && (highestValue === 0 || abilityMod > highestValue)) {
        highestValue = abilityMod;
        abilityName = ability;
      }
    }
    return abilityName;
  }
  findHighest(arr) {
    const highestAbility = Math.max.apply(Math, arr.map((ability) => ability.score));
    return arr.find((ability) => ability.score === highestAbility);
  }
  getHighestAbilityScores(v, savingThrowName) {
    const abilities = [];
    for (const ability of ABILITIES) {
      if (getIntValue(v[`${savingThrowName}_${ability}`]) === 1) {
        abilities.push({
          name: ability,
          score: getIntValue(v[`${ability}_calculated`]),
        });
      }
    }

    const highestAbilities = [];
    if (abilities.length > 0) {
      const highestAbilityObj = this.findHighest(abilities);

      highestAbilities.push(highestAbilityObj);
      abilities.splice(abilities.findIndex((ability) => ability.name === highestAbilityObj.name), 1);
    }
    if (abilities.length > 0) {
      const secondHighestAbilityObj = this.findHighest(abilities);
      highestAbilities.push(secondHighestAbilityObj);
    }

    return highestAbilities;
  }
  getAverageOfHighestAbilityScoresForSavingThrow(v, savingThrowName) {
    const obj = {
      abilitiesUsed: [],
    };
    let sum = 0;

    const highestAbilities = this.getHighestAbilityScores(v, savingThrowName);
    for (const ability of highestAbilities) {
      obj.abilitiesUsed.push(getAbilityShortName(ability.name));
      sum += getIntValue(v[`${ability.name}_calculated`]);
    }

    if (obj.abilitiesUsed.length > 0) {
      obj.avg = getAbilityMod(sum / obj.abilitiesUsed.length);
    }
    return obj;
  }
  setCustomSaveProf(v, finalSetAttrs, savingThrowName) {
    const pbVar = '@{PB}';
    for (const ability of ABILITIES) {
      if (getIntValue(v[`${savingThrowName}_${ability}`]) === 1 && v[`${ability}_save_prof`] === pbVar && !exists(v[`${savingThrowName}_save_prof`])) {
        finalSetAttrs[`${savingThrowName}_save_prof`] = pbVar;
      }
    }
  }
  updateSavingThrow(savingThrowName) {
    const collectionArray = ['pb', `${savingThrowName}_save_prof`, `${savingThrowName}_save_bonus`, 'global_saving_throw_bonus', 'saving_throws_half_proficiency', 'average_of_abilities'];
    const customSaves = ['fortitude', 'reflex', 'will'];
    const customSavingThrow = customSaves.indexOf(savingThrowName) !== -1;
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_calculated`);
      collectionArray.push(`${ability}_mod`);
      if (customSavingThrow) {
        collectionArray.push(`${ability}_save_prof`);
        collectionArray.push(`${savingThrowName}_${ability}`);
      }
    }

    getSetItems('savingThrows.updateSavingThrow', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        let total = 0;
        let totalFormula = '';
        let ability;

        if (customSavingThrow) {
          if (getIntValue(v.average_of_abilities) === 1) {
            const obj = this.getAverageOfHighestAbilityScoresForSavingThrow(v, savingThrowName);

            if (obj.avg) {
              total = obj.avg;
              totalFormula = `${obj.avg}[${obj.abilitiesUsed.join(' ')} avg]`;
            }
          } else {
            ability = this.getHighestOfAbilityScoresForSavingThrow(v, savingThrowName);
          }
          this.setCustomSaveProf(v, finalSetAttrs, savingThrowName);
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
  }
  updateCustomSavingThrows() {
    this.updateSavingThrow('fortitude');
    this.updateSavingThrow('reflex');
    this.updateSavingThrow('will');
  }
  updateCustomSavingThrowToggle() {
    getSetItems('savingThrows.updateCustomSavingThrowToggle', {
      collectionArray: ['use_custom_saving_throws', 'saving_throw_macro_var_to_use'],
      callback: (v, finalSetAttrs) => {
        if (getIntValue(v.use_custom_saving_throws) === 1) {
          finalSetAttrs.saving_throw_macro_var_to_use = '@{custom_saving_throw_macro_var}';
        } else {
          finalSetAttrs.saving_throw_macro_var_to_use = '@{saving_throw_macro_var}';
        }
      },
    });
  }
  update() {
    this.updateSavingThrow('strength');
    this.updateSavingThrow('dexterity');
    this.updateSavingThrow('constitution');
    this.updateSavingThrow('intelligence');
    this.updateSavingThrow('wisdom');
    this.updateSavingThrow('charisma');
    this.updateCustomSavingThrows();
  }
  updateFromSRD(checkedSavingThrowSRDCount) {
    const collectionArray = ['pb', 'saving_throws_srd'];
    if (!checkedSavingThrowSRDCount) {
      checkedSavingThrowSRDCount = 0;
    }
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_mod`);
      collectionArray.push(`${ability}_save_prof`);
      collectionArray.push(`${ability}_save_bonus`);
    }
    getSetItems('savingThrows.updateFromSRD', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        if (v.pb === 2 && checkedSavingThrowSRDCount < 50) {
          checkedSavingThrowSRDCount += 1;
          this.updateFromSRD(checkedSavingThrowSRDCount); // timeouts lose context so just have to bruteforce it.
          return;
        }
        for (const ability of ABILITIES) {
          const shortAbility = getAbilityShortName(ability, true);
          if (v.saving_throws_srd && v.saving_throws_srd.indexOf(shortAbility) !== -1) {
            finalSetAttrs[`${ability}_save_prof`] = '@{PB}';

            const regex = new RegExp(`${shortAbility}\\s?\\+(\\d+)`, 'i');
            const match = v.saving_throws_srd.match(regex);
            if (match && match[1]) {
              const savingThrowValue = getIntValue(match[1]) - getIntValue(v.pb) - getAbilityValue(v, ability);
              if (savingThrowValue !== 0) {
                finalSetAttrs[`${ability}_save_bonus`] = savingThrowValue;
              }
            }
          }
        }
      },
    });
  }
  watchForCustomSavingThrowChanges(savingThrowName) {
    const classFeatureWatch = [`change:${savingThrowName}_save_prof`, `change:${savingThrowName}_save_bonus`, 'change:average_of_abilities'];
    for (const ability of ABILITIES) {
      classFeatureWatch.push(`change:${savingThrowName}_${ability}`);
    }
    on(classFeatureWatch.join(' '), () => {
      this.updateSavingThrow(savingThrowName);
    });
  }
  watchAbilityChanges() {
    const classFeatureWatch = [];
    for (const ability of ABILITIES) {
      classFeatureWatch.push(`change:${ability}`);
      classFeatureWatch.push(`change:${ability}_mod`);
    }
    on(classFeatureWatch.join(' '), () => {
      this.updateCustomSavingThrows();
    });
  }
  setup() {
    on('change:strength_mod change:strength_save_prof change:strength_save_bonus', () => {
      this.updateSavingThrow('strength');
    });
    on('change:dexterity_mod change:dexterity_save_prof change:dexterity_save_bonus', () => {
      this.updateSavingThrow('dexterity');
    });
    on('change:constitution_mod change:constitution_save_prof change:constitution_save_bonus', () => {
      this.updateSavingThrow('constitution');
    });
    on('change:intelligence_mod change:intelligence_save_prof change:intelligence_save_bonus', () => {
      this.updateSavingThrow('intelligence');
    });
    on('change:wisdom_mod change:wisdom_save_prof change:wisdom_save_bonus', () => {
      this.updateSavingThrow('wisdom');
    });
    on('change:charisma_mod change:charisma_save_prof change:charisma_save_bonus', () => {
      this.updateSavingThrow('charisma');
    });
    on('change:pb change:global_saving_throw_bonus change:saving_throws_half_proficiency', () => {
      this.update();
    });
    on('change:use_custom_saving_throws', () => {
      this.updateCustomSavingThrowToggle();
    });
    on('change:saving_throws_srd', () => {
      this.updateFromSRD();
    });
    this.watchForCustomSavingThrowChanges('fortitude');
    this.watchForCustomSavingThrowChanges('reflex');
    this.watchForCustomSavingThrowChanges('will');
    this.watchAbilityChanges();
  }
}
