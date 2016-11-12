/* global on:false, generateRowID:false, getTranslationByKey:false */

import { getSetItems, getSetRepeatingItems, isUndefinedOrEmpty, getAbilityValue, getAbilityShortName, getIntValue, addArithmeticOperator, showSign, exists, getRepeatingInfo, isUndefined } from './../../scripts/utilities';
import { ABILITIES } from './../../scripts/constants';
import { ProficiencyBonus } from './../proficiencyBonus/ProficiencyBonus';
const proficiencyBonus = new ProficiencyBonus();

export class AbilityChecks {
  updateMacro() {
    const collectionArray = ['ability_checks_query_var', 'ability_checks_macro_var', 'ability_checks_show_totals'];
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_check_mod`);
      collectionArray.push(`${ability}_check_mod_with_sign`);
    }

    getSetRepeatingItems('abilityChecks.updateMacro', {
      repeatingItems: ['repeating_skill'],
      collectionArray,
      collectionArrayAddItems: ['name', 'ability', 'total_with_sign'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        finalSetAttrs.ability_checks_query_var = '?{Ability Check';
        finalSetAttrs.ability_checks_macro_var = '';
        finalSetAttrs.skills_macro_var = '';


        for (const ability of ABILITIES) {
          finalSetAttrs.ability_checks_query_var += `|${getTranslationByKey(ability.toUpperCase())},{{title=${getTranslationByKey(ability.toUpperCase())}&#125;&#125; {{roll1=[[@{shaped_d20} + ${v[`${ability}_check_mod`]}]]&#125;&#125; @{roll_setting} + ${v[`${ability}_check_mod`]}]]&#125;&#125;`;
          if (v.ability_checks_show_totals === 'on') {
            finalSetAttrs.ability_checks_macro_var += `[${getTranslationByKey(ability.toUpperCase())} ${v[`${ability}_check_mod_with_sign`]}](~shaped_${ability}_check)`;
          } else {
            finalSetAttrs.ability_checks_macro_var += `[${getTranslationByKey(ability.toUpperCase())}](~shaped_${ability}_check)`;
          }
          finalSetAttrs.ability_checks_macro_var += ', ';
        }
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          finalSetAttrs.ability_checks_query_var += `|${v[`${repeatingString}name`]}, {{title=${v[`${repeatingString}name`]} (${getTranslationByKey(getAbilityShortName(v[`${repeatingString}ability`]).toUpperCase())})&#125;&#125; {{roll1=[[@{shaped_d20} + @{${repeatingString}formula}]]&#125;&#125; @{roll_setting} + @{${repeatingString}formula}]]&#125;&#125;`;
          if (id !== ids[0]) {
            finalSetAttrs.ability_checks_macro_var += ', ';
            finalSetAttrs.skills_macro_var += ', ';
          }
          let skillButton;
          if (v.ability_checks_show_totals === 'on') {
            skillButton = `[${v[`${repeatingString}name`]} ${v[`${repeatingString}total_with_sign`]}](~repeating_skill_${id}_skill)`;
          } else {
            skillButton = `[${v[`${repeatingString}name`]}](~repeating_skill_${id}_skill)`;
          }
          finalSetAttrs.ability_checks_macro_var += skillButton;
          finalSetAttrs.skills_macro_var += skillButton;
        }
        finalSetAttrs.ability_checks_query_var += '}';
      },
    });
  }
  updateSkill(rowId) {
    const collectionArray = ['jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete', 'pb', 'exp', 'global_check_bonus'];
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_mod`);
      collectionArray.push(`${ability}_check_bonus`);
    }

    getSetRepeatingItems('abilityChecks.updateSkill', {
      repeatingItems: ['repeating_skill'],
      collectionArray,
      collectionArrayAddItems: ['skill_d20', 'skill_info', 'proficiency', 'name', 'storage_name', 'ability', 'bonus', 'ability_key', 'formula', 'total', 'total_with_sign', 'passive_bonus', 'passive_total'],
      rowId,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;

          const skillName = v[`${repeatingString}name`];
          if (isUndefinedOrEmpty(skillName)) {
            return;
          }

          finalSetAttrs[`${repeatingString}ability_key`] = getAbilityShortName(v[`${repeatingString}ability`]).toUpperCase();

          let total = 0;
          let totalFormula = '';
          const proficiency = v[`${repeatingString}proficiency`];
          if (!proficiency || proficiency === 'unproficient') {
            if ((v[`${repeatingString}ability`] === 'strength' || v[`${repeatingString}ability`] === 'dexterity' || v[`${repeatingString}ability`] === 'constitution') && v.remarkable_athlete_toggle === '@{remarkable_athlete}') {
              const remarkableAthlete = getIntValue(v.remarkable_athlete);
              total += remarkableAthlete;
              totalFormula += `${remarkableAthlete}[remarkable athlete]`;
            } else if (v.jack_of_all_trades_toggle === '@{jack_of_all_trades}') {
              const jackOfAllTrades = getIntValue(v.jack_of_all_trades);
              total += jackOfAllTrades;
              totalFormula += `${jackOfAllTrades}[jack of all trades]`;
            }
          } else if (proficiency === 'proficient') {
            const pb = getIntValue(v.pb);
            total += pb;
            totalFormula += `${pb}[proficient]`;
          } else if (proficiency === 'expertise') {
            const exp = getIntValue(v.exp);
            total += exp;
            totalFormula += `${exp}[expertise]`;
          }

          const abilityValue = getAbilityValue(v, v[`${repeatingString}ability`], 'strength');
          if (exists(abilityValue)) {
            total += abilityValue;
            totalFormula += `${addArithmeticOperator(totalFormula, abilityValue)}[${getAbilityShortName(v[`${repeatingString}ability`])}]`;
          }

          const skillBonus = getIntValue(v[`${repeatingString}bonus`]);
          if (exists(skillBonus)) {
            total += skillBonus;
            totalFormula += `${addArithmeticOperator(totalFormula, skillBonus)}[bonus]`;
          }

          if (exists(v[`${repeatingString}ability`])) {
            let checkBonus = v[`${v[`${repeatingString}ability`]}_check_bonus`];
            if (exists(checkBonus)) {
              checkBonus = getIntValue(checkBonus);
              total += checkBonus;
              totalFormula += `${addArithmeticOperator(totalFormula, checkBonus)}[${getAbilityShortName(v[`${repeatingString}ability`])} check bonus]`;
            }
          }

          const globalCheckBonus = v.global_check_bonus;
          if (exists(globalCheckBonus)) {
            if (!isNaN(globalCheckBonus)) {
              total += getIntValue(globalCheckBonus);
            }
            if (totalFormula) {
              totalFormula += ' + ';
            }
            totalFormula += '(@{global_check_bonus})[global check bonus]';
          }
          const passiveBonus = getIntValue(v[`${repeatingString}passive_bonus`]);
          let advantageOrDisadvantage = 0;

          finalSetAttrs[`${repeatingString}skill_info`] = '';

          if (v[`${repeatingString}skill_d20`] && v[`${repeatingString}skill_d20`].indexOf('kh1') !== -1) {
            finalSetAttrs[`${repeatingString}skill_info`] = '{{advantage=1}}';
            advantageOrDisadvantage = 5;
          } else if (v[`${repeatingString}skill_d20`] && v[`${repeatingString}skill_d20`].indexOf('kl1') !== -1) {
            finalSetAttrs[`${repeatingString}skill_info`] = '{{disadvantage=1}}';
            advantageOrDisadvantage = -5;
          } else {
            finalSetAttrs[`${repeatingString}skill_info`] = '';
          }

          const passiveTotal = 10 + total + passiveBonus + advantageOrDisadvantage;

          finalSetAttrs[`${repeatingString}total`] = total;
          finalSetAttrs[`${repeatingString}passive`] = passiveTotal;
          finalSetAttrs[`${repeatingString}total_with_sign`] = showSign(total);
          finalSetAttrs[`${repeatingString}formula`] = totalFormula;
        }
      },
      setFinalAttrsCallback: () => {
        this.updateMacro();
      },
    });
  }
  updateSkillsFromSRD() {
    getSetRepeatingItems('abilityChecks.updateSkillsFromSRD', {
      repeatingItems: ['repeating_skill'],
      collectionArray: ['skills_srd', 'level', 'challenge', 'strength_mod', 'dexterity_mod', 'constitution_mod', 'intelligence_mod', 'wisdom_mod', 'charisma_mod', 'expertise_as_advantage'],
      collectionArrayAddItems: ['name', 'ability'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        const skillsFromSRD = v.skills_srd;
        const skillsObj = {};
        const pb = proficiencyBonus.get(v.level, v.challenge);
        const expertise = pb * 2;
        let skillName;
        let repeatingString;

        if (!isUndefinedOrEmpty(skillsFromSRD)) {
          for (const id of ids) {
            repeatingString = `${repeatingItem}_${id}_`;
            skillName = v[`${repeatingString}name`];
            skillsObj[skillName] = id;
          }

          const re = /(\w+)\s?((?:\+|\-)\d+)/gi;
          let match;
          while ((match = re.exec(skillsFromSRD)) !== null) {
            if (match && match[1] && match[2]) {
              skillName = match[1];
              if (skillsObj[skillName]) {
                const skillId = skillsObj[skillName];
                repeatingString = `${repeatingItem}_${skillId}_`;

                const skillAbility = v[`${repeatingString}ability`];
                const abilityValue = getAbilityValue(v, skillAbility);
                const skillBonus = getIntValue(match[2]) - abilityValue;

                if (skillBonus >= expertise) {
                  if (getIntValue(v.expertise_as_advantage) === 1) {
                    finalSetAttrs[`${repeatingString}skill_d20`] = '2d20@{d20_mod}kh1';
                    finalSetAttrs[`${repeatingString}proficiency`] = 'proficient';
                  } else {
                    finalSetAttrs[`${repeatingString}proficiency`] = 'expertise';
                  }
                  if (skillBonus > expertise) {
                    finalSetAttrs[`${repeatingString}bonus`] = skillBonus - expertise;
                  }
                } else if (skillBonus >= pb) {
                  finalSetAttrs[`${repeatingString}proficiency`] = 'proficient';
                  if (skillBonus > pb) {
                    finalSetAttrs[`${repeatingString}bonus`] = skillBonus - pb;
                  }
                }
              } else {
                console.warn(`${skillName} does not exist in the list of skills`);
              }
            }
          }
        }
      },
    });
  }
  updateInitiative() {
    const collectionArray = ['initiative', 'initiative_ability', 'initiative_formula', 'initiative_bonus', 'jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete', 'global_check_bonus'];
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_mod`);
      collectionArray.push(`${ability}_check_bonus`);
    }

    getSetItems('abilityChecks.updateInitiative', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.initiative = 0;

        let initiativeAbility = v.initiative_ability;

        if (isUndefined(initiativeAbility)) {
          initiativeAbility = 'dexterity';
        }

        const abilityMod = getAbilityValue(v, initiativeAbility);
        if (exists(abilityMod)) {
          finalSetAttrs.initiative += abilityMod;
        }
        finalSetAttrs.initiative_formula = `${abilityMod}[${getAbilityShortName(initiativeAbility)}]`;

        const abilityCheckBonus = getIntValue(v[`${initiativeAbility}_check_bonus`]);
        if (exists(abilityCheckBonus)) {
          finalSetAttrs.initiative += abilityCheckBonus;
          finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, abilityCheckBonus)}[${getAbilityShortName(initiativeAbility)} check bonus]`;
        }

        const initiativeBonus = v.initiative_bonus;
        if (exists(initiativeBonus)) {
          if (!isNaN(initiativeBonus)) {
            finalSetAttrs.initiative += getIntValue(initiativeBonus);
          }
          finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, initiativeBonus)}[initiative bonus]`;
        }

        if (v.remarkable_athlete_toggle === '@{remarkable_athlete}') {
          const remarkableAthlete = getIntValue(v.remarkable_athlete);
          if (exists(remarkableAthlete)) {
            finalSetAttrs.initiative += remarkableAthlete;
            finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, remarkableAthlete)}[remarkable athlete]`;
          }
        } else if (v.jack_of_all_trades_toggle === '@{jack_of_all_trades}') {
          const jackOfAllTrades = getIntValue(v.jack_of_all_trades);
          if (exists(jackOfAllTrades)) {
            finalSetAttrs.initiative += jackOfAllTrades;
            finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, jackOfAllTrades)}[jack of all trades]`;
          }
        }

        if (finalSetAttrs.initiative) {
          finalSetAttrs.initiative = showSign(finalSetAttrs.initiative);
        }

        const globalCheckBonus = v.global_check_bonus;
        if (exists(globalCheckBonus)) {
          if (finalSetAttrs.initiative_formula) {
            finalSetAttrs.initiative_formula += ' + ';
          }
          finalSetAttrs.initiative_formula += '(@{global_check_bonus})[global check bonus]';
        }
      },
    });
  }
  setup() {
    on('change:repeating_skill', (eventInfo) => {
      const repeatingInfo = getRepeatingInfo('repeating_skill', eventInfo);
      if (repeatingInfo && repeatingInfo.field !== 'ability_key' && repeatingInfo.field !== 'total' && repeatingInfo.field !== 'total_with_sign' && repeatingInfo.field !== 'passive_total' && repeatingInfo.field !== 'passive_total_with_sign' && repeatingInfo.field !== 'formula') {
        this.updateSkill(repeatingInfo.rowId);
      }
    });
    on('change:pb change:jack_of_all_trades_toggle change:jack_of_all_trades change:remarkable_athlete_toggle change:remarkable_athlete change:global_check_bonus change:strength_check_bonus change:dexterity_check_bonus change:constitution_check_bonus change:intelligence_check_bonus change:wisdom_check_bonus change:charisma_check_bonus', () => {
      this.updateSkill();
    });
    on('change:skills_srd', () => {
      this.updateSkillsFromSRD();
    });
    on('remove:repeating_skill change:ability_checks_show_totals', () => {
      this.updateMacro();
    });
    const initiativeWatch = ['change:initiative_ability', 'change:initiative_bonus', 'change:jack_of_all_trades_toggle', 'change:jack_of_all_trades', 'change:remarkable_athlete_toggle', 'change:remarkable_athlete', 'change:global_check_bonus'];
    for (const ability of ABILITIES) {
      initiativeWatch.push(`change:${ability}_mod`);
      initiativeWatch.push(`change:${ability}_check_bonus`);
    }
    on(initiativeWatch.join(' '), () => {
      this.updateInitiative();
    });
  }
}
