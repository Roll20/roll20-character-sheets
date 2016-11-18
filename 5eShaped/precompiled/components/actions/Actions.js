/* global on:false, removeRepeatingRow:false */

import { ABILITIES, TOGGLE_VARS } from './../../scripts/constants';
import { ProficiencyBonus } from './../proficiencyBonus/ProficiencyBonus';
const proficiencyBonus = new ProficiencyBonus();
import { getSetRepeatingItems, isUndefined, isUndefinedOrEmpty, fromVOrFinalSetAttrs, setCritDamage, getIntValue, getRepeatingInfo, lowercaseDamageTypes, exists, ordinalSpellLevel } from './../../scripts/utilities';
import { updateAttackToggle, updateSavingThrowToggle, updateDamageToggle, updateHealToggle } from './../actionComponents/updateToggles';

export class Actions {
  updateAll() {
    this.update('trait');
    this.update('action');
    this.update('reaction');
    this.update('legendaryaction');
    this.update('lairaction');
    this.update('regionaleffect');
  }
  update(type, rowId) {
    const rechargeRegex = /\s*?\((?:Recharge\s*?(\d+\-\d+|\d+)|Recharges\safter\sa\s(.*))\)/gi;
    const rechargeDayRegex = /\s*?\((\d+\/Day)\)/gi;
    const collectionArray = ['pb', 'strength_mod', 'finesse_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability', 'base_dc'];

    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_mod`);
    }

    getSetRepeatingItems('actions.update', {
      repeatingItems: [`repeating_${type}`],
      collectionArray,
      collectionArrayAddItems: ['name', 'type', 'uses', 'uses_max', 'has_uses', 'roll_toggle', 'to_hit', 'attack_formula', 'proficiency', 'attack_ability', 'attack_bonus', 'saving_throw_toggle', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_dc', 'damage_toggle', 'damage_formula', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_toggle', 'second_damage_formula', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'damage_string', 'heal_toggle', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'parsed', 'recharge', 'recharge_display', 'extras_toggle', 'emote', 'freetext', 'freeform'],
      rowId,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;

          const actionName = v[`${repeatingString}name`];
          if (!isUndefinedOrEmpty(actionName)) {
            const rechargeResult = rechargeRegex.exec(actionName);
            if (rechargeResult) {
              finalSetAttrs[`${repeatingString}recharge`] = rechargeResult[1] || rechargeResult[2];
              finalSetAttrs[`${repeatingString}name`] = actionName.replace(rechargeRegex, '');
            }
            const rechargeDayResult = rechargeDayRegex.exec(actionName);
            if (rechargeDayResult) {
              finalSetAttrs[`${repeatingString}recharge`] = rechargeDayResult[1] || rechargeDayResult[2];
              finalSetAttrs[`${repeatingString}name`] = actionName.replace(rechargeDayRegex, '');
            }
          }

          if (v[`${repeatingString}uses`] || v[`${repeatingString}uses_max`]) {
            finalSetAttrs[`${repeatingString}has_uses`] = 1;
          } else if (!isUndefinedOrEmpty(v[`${repeatingString}has_uses`])) {
            finalSetAttrs[`${repeatingString}has_uses`] = 0;
          }

          const recharge = fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}recharge`);
          if (exists(recharge)) {
            if (isNaN(recharge)) {
              finalSetAttrs[`${repeatingString}recharge_display`] = ` (${recharge})`;
            } else {
              finalSetAttrs[`${repeatingString}recharge_display`] = ` (Recharge ${recharge})`;
            }
          } else if (exists(v[`${repeatingString}recharge_display`])) {
            finalSetAttrs[`${repeatingString}recharge_display`] = '';
          }

          let attackOptions = {};
          if (type !== 'trait') {
            attackOptions = {
              globalAttackBonus: v.global_attack_bonus,
              globalAttackBonusLabel: 'global attack bonus',
              globalMeleeAttackBonus: v.global_melee_attack_bonus,
              globalRangedAttackBonus: v.global_ranged_attack_bonus,
              type: 'attack',
            };
          }
          updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

          updateSavingThrowToggle(v, finalSetAttrs, repeatingString);

          let damageOptions = {};
          if (type !== 'trait') {
            damageOptions = {
              globalDamageBonus: v.global_damage_bonus,
              globalMeleeDamageBonus: v.global_melee_damage_bonus,
              globalRangedDamageBonus: v.global_ranged_damage_bonus,
              type: 'attack',
            };
          }
          updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);
          if (v.damage_type) {
            finalSetAttrs.damage_type = lowercaseDamageTypes(v.damage_type);
          }
          if (v.second_damage_type) {
            finalSetAttrs.second_damage_type = lowercaseDamageTypes(v.second_damage_type);
          }
          setCritDamage(v, finalSetAttrs, repeatingString);

          updateHealToggle(v, finalSetAttrs, repeatingString);

          if (isUndefined(v[`${repeatingString}extras_toggle`]) && (v[`${repeatingString}emote`] || v[`${repeatingString}freetext`] || v[`${repeatingString}freeform`])) {
            finalSetAttrs[`${repeatingString}extras_toggle`] = TOGGLE_VARS.extras;
          }
        }
      },
    });
  }
  updateIfTriggered(type, eventInfo) {
    const repeatingInfo = getRepeatingInfo(`repeating_${type}`, eventInfo);
    if (repeatingInfo && repeatingInfo.field !== 'name' && repeatingInfo.field !== 'freetext' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'parsed' && repeatingInfo.field !== 'recharge_display') {
      this.update(type, repeatingInfo.rowId);
    }
  }
  updateChatMacro(type) {
    getSetRepeatingItems('actions.updateChatMacro', {
      repeatingItems: [`repeating_${type}`],
      collectionArray: [`${type}s_macro_var`, `${type}s_chat_var`, `${type}s_exist`],
      collectionArrayAddItems: ['name', 'freetext'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        finalSetAttrs[`${type}s_macro_var`] = '';
        finalSetAttrs[`${type}s_chat_var`] = '';

        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          let actionName = v[`${repeatingString}name`];
          const freeText = v[`${repeatingString}freetext`];

          if (id !== ids[0]) {
            finalSetAttrs[`${type}s_macro_var`] += ', ';
          }
          let actionType = 'action';
          let title;
          if (type === 'trait') {
            title = 'Traits';
            actionType = 'trait';
          } else if (type === 'action') {
            title = 'Actions';
          } else if (type === 'reaction') {
            title = 'Reactions';
          } else if (type === 'legendaryaction') {
            title = 'Legendary Actions';
          } else if (type === 'lairaction') {
            title = 'Lair Actions';
            actionName = freeText;
          } else if (type === 'regionaleffect') {
            title = 'Regional Effects';
            actionName = freeText;
          }

          if (actionName && actionName.length > 50) {
            actionName = `${actionName.substring(0, 50)}...`;
          }

          finalSetAttrs[`${type}s_macro_var`] += `[${actionName}](~repeating_${type}_${id}_${actionType})`;
          finalSetAttrs[`${type}s_chat_var`] += `{{${title}=${finalSetAttrs[`${type}s_macro_var`]}}}`;
        }
      },
    });
  }
  findClosest(array, goal) {
    return array.reduce((prev, curr) => {
      return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
  }
  getCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, fieldName, bonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod) {
    let closest;
    if (bonus) {
      if (spellAttack) {
        closest = this.findClosest(spellMods, bonus);
        bonus -= closest;
        if (closest === spellMods[0]) {
          finalSetAttrs[repeatingString + fieldName] = 'intelligence';
        } else if (closest === spellMods[1]) {
          finalSetAttrs[repeatingString + fieldName] = 'wisdom';
        } else if (closest === spellMods[2]) {
          finalSetAttrs[repeatingString + fieldName] = 'charisma';
        }
      } else {
        if (rangedAttack) {
          finalSetAttrs[`${repeatingString}attack_ability`] = 'dexterity';
          bonus -= dexMod;
        } else {
          closest = this.findClosest(meleeMods, bonus);
          bonus -= closest;
          if (closest === meleeMods[0]) {
            finalSetAttrs[repeatingString + fieldName] = 'strength';
          } else if (closest === meleeMods[1]) {
            finalSetAttrs[repeatingString + fieldName] = 'dexterity';
          }
        }
      }
    } else {
      finalSetAttrs[repeatingString + fieldName] = 0;
    }
    return bonus;
  }
  getAnyCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, fieldName, bonus, abilityMods) {
    const closest = this.findClosest(abilityMods, bonus);
    if (bonus) {
      bonus -= closest;

      if (closest === abilityMods[0]) {
        finalSetAttrs[repeatingString + fieldName] = 'strength';
      } else if (closest === abilityMods[1]) {
        finalSetAttrs[repeatingString + fieldName] = 'dexterity';
      } else if (closest === abilityMods[2]) {
        finalSetAttrs[repeatingString + fieldName] = 'constitution';
      } else if (closest === abilityMods[3]) {
        finalSetAttrs[repeatingString + fieldName] = 'intelligence';
      } else if (closest === abilityMods[4]) {
        finalSetAttrs[repeatingString + fieldName] = 'wisdom';
      } else if (closest === abilityMods[5]) {
        finalSetAttrs[repeatingString + fieldName] = 'charisma';
      }
    } else {
      finalSetAttrs[repeatingString + fieldName] = 0;
    }
    return bonus;
  }
  parseDamage(finalSetAttrs, repeatingString, freetext, regex, name, spellMods, meleeMods, spellAttack, rangedAttack, dexMod) {
    const damageParseRegex = /(\d+d?\d+)(?:\s?(?:\+|\-)\s?(\d+))?/gi;
    const damage = regex.exec(freetext);
    let damageBonus;
    if (damage) {
      /*
       1 is damage with dice. Example '2d6+4'
       2 is damage type. Example 'slashing' or 'lightning or thunder'
       */
      if (damage[1]) {
        const damageParsed = damageParseRegex.exec(damage[1]);
        if (damageParsed) {
          if (damageParsed[1]) {
            finalSetAttrs[repeatingString + name] = damageParsed[1];
          }
          if (damageParsed[2]) {
            damageBonus = damageParsed[2];
          }
        }
      }
      damageBonus = this.getCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, `${name}_ability`, damageBonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
      if (damage[2]) {
        finalSetAttrs[`${repeatingString}${name}_type`] = damage[2];
      }
      if (damageBonus) {
        finalSetAttrs[`${repeatingString}${name}_bonus`] = damageBonus;
      }
      freetext = freetext.replace(regex, '');
      finalSetAttrs[`${repeatingString}${name}_toggle`] = TOGGLE_VARS[name];
    }
    return freetext;
  }
  parse(type, rowId) {
    const collectionArray = ['level', 'challenge', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability', 'spellcasting_class', 'innate_spellcasting', 'spellcasting'];
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_mod`);
    }
    const damageSyntax = /(?:(\d+d?\d+(?:\s?(?:\+|\-)\s?\d+)?)(?:\))?)\s*?/;
    const damageType = /((?:[a-zA-Z]+|[a-zA-Z]+\s(?:or|and)\s[a-zA-Z]+)(?:\s*?\([a-zA-Z\s]+\))?)\s*damage\s?(\([a-zA-Z'\s]+\))?/;
    const altDamageSyntax = /(?:,\s*?or\s*?)/;
    const plus = /\s*?plus\s*?/;
    const savingThrowRe = /(?:DC)\s*?(\d+)\s*?([a-zA-Z]*)\s*?(?:saving throw)/;
    const saveSuccess = /or\s(.*)?\son a successful one./;
    const damageRegex = new RegExp(damageSyntax.source + damageType.source, 'i');
    const damagePlusRegex = new RegExp(plus.source + damageSyntax.source + damageType.source, 'i');
    const altDamageRegex = new RegExp(altDamageSyntax.source + damageSyntax.source + damageType.source, 'i');
    const savingThrowRegex = new RegExp(savingThrowRe.source, 'i');
    const saveSuccessRegex = new RegExp(saveSuccess.source, 'i');

    const typeRegex = /(melee|ranged|melee or ranged)\s*(spell|weapon)\s*attack/gi;
    const toHitRegex = /:\s?\+\s?(\d+)\s*(?:to hit)/gi;
    const reachRegex = /(?:reach)\s?(\d+)\s?(?:ft)/gi;
    const rangeRegex = /(?:range)\s?(\d+)\/(\d+)\s?(ft)/gi;
    const spellcastingRegex = /(\d+)\w+\slevel\s\((\d+)\s?slot(?:s)?\)/gi;
    const spellcastingLevelRegex = /(\d+)(?:st|dn|rd|th)-level spellcaster/i;
    const spellcastingAbilityRegex = /spellcasting ability is (\w+)/i;
    const spellcastingAbilityRegexSecond = /uses (\w+) as (her|his) spellcasting ability/i;
    const spellcastingClassRegex = /following (\w+) spells prepared/i;
    const spellcastingClassRegexSecond = /following spells prepared from the (\w+) list/i;
    const innateSpellcastingComponentRegex = /(.*requiring no material components:)/i;
    const innateSpellcastingComponentRegexSecond = /(.*requiring only verbal components:)/i;

    getSetRepeatingItems('actions.parse', {
      repeatingItems: [`repeating_${type}`],
      collectionArray,
      collectionArrayAddItems: ['name', 'freetext', 'type'],
      rowId,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        const pb = proficiencyBonus.get(v.level, v.challenge);
        const strMod = getIntValue(v.strength_mod);
        const dexMod = getIntValue(v.dexterity_mod);
        const conMod = getIntValue(v.constitution_mod);
        const intMod = getIntValue(v.intelligence_mod);
        const wisMod = getIntValue(v.wisdom_mod);
        const chaMod = getIntValue(v.charisma_mod);
        const meleeMods = [strMod, dexMod];
        const spellMods = [intMod, wisMod, chaMod];
        const abilityMods = [strMod, dexMod, conMod, intMod, wisMod, chaMod];

        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;

          let rangedAttack = false;
          let spellAttack = false;

          const name = v[`${repeatingString}name`];
          if (!name) {
            removeRepeatingRow(`${repeatingItem}_${id}`);
            continue;
          }
          let freetext = v[`${repeatingString}freetext`];

          if (name.indexOf('Spellcasting') !== -1) {
            const spellcastingSearch = spellcastingAbilityRegex.exec(freetext);
            if (spellcastingSearch && spellcastingSearch[1]) {
              finalSetAttrs.default_ability = spellcastingSearch[1].toUpperCase();
            } else {
              const spellcastingSearchSecond = spellcastingAbilityRegexSecond.exec(freetext);
              if (spellcastingSearchSecond && spellcastingSearchSecond[1]) {
                finalSetAttrs.default_ability = spellcastingSearchSecond[1].toUpperCase();
              }
            }
            if (name.indexOf('Innate') !== -1) {
              finalSetAttrs.show_spells = 1;
              finalSetAttrs.innate_spellcasting = 1;

              const innateSpellcastingComponentSearch = innateSpellcastingComponentRegex.exec(freetext);
              if (innateSpellcastingComponentSearch) {
                console.log('innatezz if', innateSpellcastingComponentSearch);
                finalSetAttrs.innate_spellcasting_components = 'INNATE_SPELLCASTING_NO_MATERIAL';
                if (innateSpellcastingComponentSearch[1]) {
                  finalSetAttrs.innate_spellcasting_blurb = freetext.replace(innateSpellcastingComponentSearch[1], '').trim();
                }
              } else {
                const innateSpellcastingComponentSearchSecond = innateSpellcastingComponentRegexSecond.exec(freetext);
                console.log('innatezz else', innateSpellcastingComponentSearchSecond);
                if (innateSpellcastingComponentSearchSecond) {
                  finalSetAttrs.innate_spellcasting_components = 'INNATE_SPELLCASTING_ONLY_VERBAL';
                  if (innateSpellcastingComponentSearchSecond[1]) {
                    console.log('innatezz third if');
                    finalSetAttrs.innate_spellcasting_blurb = freetext.replace(innateSpellcastingComponentSearchSecond[1], '').trim();
                  }
                }
              }
              removeRepeatingRow(`${repeatingItem}_${id}`);
              continue;
            }
            if (name.indexOf('Innate') === -1) {
              finalSetAttrs.show_spells = 1;
              finalSetAttrs.spellcasting = 1;

              let match;
              while ((match = spellcastingRegex.exec(freetext)) !== null) {
                if (match && match[1] && match[2]) {
                  finalSetAttrs[`spell_slots_l${match[1]}_bonus`] = match[2];
                }
              }

              const spellcastingLevelSearch = spellcastingLevelRegex.exec(freetext);
              if (spellcastingLevelSearch && spellcastingLevelSearch[1]) {
                finalSetAttrs.caster_level = spellcastingLevelSearch[1];
                finalSetAttrs.spellcaster_level = ordinalSpellLevel(spellcastingLevelSearch[1]);
              }
              const spellcastingClassSearch = spellcastingClassRegex.exec(freetext);
              if (spellcastingClassSearch && spellcastingClassSearch[1]) {
                finalSetAttrs.spellcasting_class = spellcastingClassSearch[1].toUpperCase();
              } else {
                const spellcastingClassSearchSecond = spellcastingClassRegexSecond.exec(freetext);
                if (spellcastingClassSearchSecond && spellcastingClassSearchSecond[1]) {
                  finalSetAttrs.spellcasting_class = spellcastingClassSearchSecond[1].toUpperCase();
                }
              }
              removeRepeatingRow(`${repeatingItem}_${id}`);
              continue;
            }
          }

          const actionType = typeRegex.exec(freetext);
          if (actionType) {
            if (actionType[1]) {
              actionType[1] = actionType[1].toLowerCase();
              if (isUndefined(v[`${repeatingString}type`]) && (actionType[1] === 'melee' || actionType[1] === 'melee or ranged')) {
                finalSetAttrs[`${repeatingString}type`] = 'Melee Weapon';
              } else if (isUndefined(v[`${repeatingString}type`]) && actionType[1] === 'ranged') {
                finalSetAttrs[`${repeatingString}type`] = 'Ranged Weapon';
                rangedAttack = true;
              } else {
                finalSetAttrs[`${repeatingString}type`] = 'Other';
              }
            }
            if (actionType[2]) {
              actionType[2] = actionType[2].toLowerCase();
              if (actionType[2] === 'spell') {
                spellAttack = true;
              }
            }
            freetext = freetext.replace(typeRegex, '');
          }

          const reach = reachRegex.exec(freetext);
          if (reach && reach[1]) {
            finalSetAttrs[`${repeatingString}reach`] = `${reach[1]}ft.`;
            freetext = freetext.replace(reachRegex, '');
          }
          const range = rangeRegex.exec(freetext);
          if (range && range[1] && range[2]) {
            finalSetAttrs[`${repeatingString}range`] = `${range[1]}ft.`;
            freetext = freetext.replace(rangeRegex, '');
          }

          const toHit = toHitRegex.exec(freetext);
          if (toHit && toHit[1]) {
            let hitBonus = toHit[1];
            hitBonus -= pb;

            hitBonus = this.getCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, 'attack_ability', hitBonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod);

            if (hitBonus) {
              finalSetAttrs[`${repeatingString}attack_bonus`] = hitBonus;
            }
            freetext = freetext.replace(toHitRegex, '');
            finalSetAttrs[`${repeatingString}roll_toggle`] = TOGGLE_VARS.roll;
          } else {
            finalSetAttrs[`${repeatingString}roll_toggle`] = '';
          }

          const savingThrow = savingThrowRegex.exec(freetext);
          if (savingThrow) {
            if (savingThrow[1]) {
              let savingThrowTotal = savingThrow[1];
              savingThrowTotal -= 8;
              savingThrowTotal -= pb;

              savingThrowTotal = this.getAnyCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, 'saving_throw_ability', savingThrowTotal, abilityMods);

              if (savingThrowTotal) {
                finalSetAttrs[`${repeatingString}saving_throw_bonus`] = savingThrowTotal;
              }
              freetext = freetext.replace(savingThrowRegex, '');
              finalSetAttrs[`${repeatingString}saving_throw_toggle`] = TOGGLE_VARS.saving_throw;
            }
            if (savingThrow[2]) {
              finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = savingThrow[2].toUpperCase();
            }
            const halfDamage = saveSuccessRegex.exec(freetext);
            if (halfDamage && halfDamage[1]) {
              finalSetAttrs[`${repeatingString}saving_throw_success`] = halfDamage[1];
              freetext = freetext.replace(saveSuccessRegex, '');
            }
          } else {
            finalSetAttrs[`${repeatingString}saving_throw_toggle`] = '0';
          }

          freetext = this.parseDamage(finalSetAttrs, repeatingString, freetext, damageRegex, 'damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
          freetext = this.parseDamage(finalSetAttrs, repeatingString, freetext, altDamageRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
          freetext = this.parseDamage(finalSetAttrs, repeatingString, freetext, damagePlusRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
          if (!exists(finalSetAttrs[`${repeatingString}second_damage`])) {
            freetext = this.parseDamage(finalSetAttrs, repeatingString, freetext, damageRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
          }

          finalSetAttrs[`${repeatingString}extras_toggle`] = TOGGLE_VARS.extras;
          finalSetAttrs[`${repeatingString}toggle_details`] = 0;
        }
      },
      setFinalAttrsCallback: () => {
        this.update(type, rowId);
      },
    });
  }
  count(type) {
    getSetRepeatingItems('actions.count', {
      repeatingItems: [`repeating_${type}`],
      collectionArray: [`${type}s_exist`],
      callback: (v, finalSetAttrs, ids) => {
        if (ids.length > 0) {
          finalSetAttrs[`${type}s_exist`] = 1;
        } else if (exists(v[`${type}s_exist`])) {
          finalSetAttrs[`${type}s_exist`] = 0;
        }
      },
    });
  }
  setup() {
    on('change:pb', () => {
      this.update();
    });
    on('change:repeating_trait', (eventInfo) => {
      this.updateIfTriggered('trait', eventInfo);
    });
    on('change:repeating_action', (eventInfo) => {
      this.updateIfTriggered('action', eventInfo);
    });
    on('change:repeating_reaction', (eventInfo) => {
      this.updateIfTriggered('reaction', eventInfo);
    });
    on('change:repeating_legendaryaction', (eventInfo) => {
      this.updateIfTriggered('legendaryaction', eventInfo);
    });
    on('change:repeating_lairaction', (eventInfo) => {
      this.updateIfTriggered('lairaction', eventInfo);
    });
    on('change:repeating_regionaleffect', (eventInfo) => {
      this.updateIfTriggered('regionaleffect', eventInfo);
    });
    on('change:repeating_trait remove:repeating_trait', () => {
      this.count('trait');
      this.updateChatMacro('trait');
    });
    on('change:repeating_action remove:repeating_action', () => {
      this.count('action');
      this.updateChatMacro('action');
    });
    on('change:repeating_reaction remove:repeating_reaction', () => {
      this.count('reaction');
      this.updateChatMacro('reaction');
    });
    on('change:repeating_legendaryaction remove:repeating_legendaryaction', () => {
      this.count('legendaryaction');
      this.updateChatMacro('legendaryaction');
    });
    on('change:repeating_lairaction remove:repeating_lairaction', () => {
      this.count('lairaction');
      this.updateChatMacro('lairaction');
    });
    on('change:repeating_regionaleffect remove:repeating_regionaleffect', () => {
      this.count('regionaleffect');
      this.updateChatMacro('regionaleffect');
    });
    on('change:repeating_trait:freetext', (eventInfo) => {
      const repeatingInfo = getRepeatingInfo('repeating_trait', eventInfo);
      this.parse('trait', repeatingInfo.rowId);
    });
    on('change:repeating_action:freetext', (eventInfo) => {
      this.parse('action', getRepeatingInfo('repeating_action', eventInfo).rowId);
    });
    on('change:repeating_reaction:freetext', (eventInfo) => {
      this.parse('reaction', getRepeatingInfo('repeating_reaction', eventInfo).rowId);
    });
    on('change:repeating_legendaryaction:freetext', (eventInfo) => {
      this.parse('legendaryaction', getRepeatingInfo('repeating_legendaryaction', eventInfo).rowId);
    });
    on('change:repeating_lairaction:freetext', (eventInfo) => {
      this.parse('lairaction', getRepeatingInfo('repeating_lairaction', eventInfo).rowId);
    });
    on('change:global_attack_bonus change:global_melee_attack_bonus change:global_ranged_attack_bonus change:global_damage_bonus change:global_melee_damage_bonus change:global_ranged_damage_bonus change:ammo_auto_use', () => {
      this.update('action');
      this.update('reaction');
      this.update('legendaryaction');
      this.update('lairaction');
    });
  }
}
