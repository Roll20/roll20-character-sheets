import { ABILITIES, TOGGLE_VARS } from './constants';
import { getSetRepeatingItems, isUndefined, isUndefinedOrEmpty, fromVOrFinalSetAttrs, setCritDamage, getCorrectAbilityBasedOnBonus, getAnyCorrectAbilityBasedOnBonus, getIntValue, getRepeatingInfo, lowercaseDamageTypes } from './utilities';
import { updateAttackToggle, updateSavingThrowToggle, updateDamageToggle, updateHealToggle } from './updateToggles';
import { getPB } from './proficiencyBonus';

const updateAction = (type, rowId) => {
  const rechargeRegex = /\s*?\((?:Recharge\s*?(\d+\-\d+|\d+)|Recharges\safter\sa\s(.*))\)/gi;
  const rechargeDayRegex = /\s*?\((\d+\/Day)\)/gi;
  const collectionArray = ['pb', 'strength_mod', 'finesse_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability', 'base_dc'];

  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }

  getSetRepeatingItems('updateAction', {
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
};
const updateActions = () => {
  updateAction('trait');
  updateAction('action');
  updateAction('reaction');
  updateAction('legendaryaction');
  updateAction('lairaction');
  updateAction('regionaleffect');
};
const updateActionIfTriggered = (type, eventInfo) => {
  const repeatingInfo = getRepeatingInfo(`repeating_${type}`, eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'name' && repeatingInfo.field !== 'freetext' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'parsed' && repeatingInfo.field !== 'recharge_display') {
    updateAction(type, repeatingInfo.rowId);
  }
};
const updateActionChatMacro = (type) => {
  getSetRepeatingItems('updateActionChatMacro', {
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
};
const parseDamage = (finalSetAttrs, repeatingString, freetext, regex, name, spellMods, meleeMods, spellAttack, rangedAttack, dexMod) => {
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
    damageBonus = getCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, `${name}_ability`, damageBonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
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
};
const parseAction = (type, rowId) => {
  const collectionArray = ['level', 'challenge', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability'];
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }
  const damageSyntax = /(?:(\d+d?\d+(?:\s\+\s\d+)?)(?:\))?)\s*?/;
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

  getSetRepeatingItems('parseAction', {
    repeatingItems: [`repeating_${type}`],
    collectionArray,
    collectionArrayAddItems: ['name', 'freetext', 'type'],
    rowId,
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      const pb = getPB(v.level, v.challenge);
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
        let freetext = v[`${repeatingString}freetext`];

        if (name && name.indexOf('Spellcasting') !== -1) {
          const spellcastingSearch = spellcastingAbilityRegex.exec(freetext);
          if (spellcastingSearch && spellcastingSearch[1]) {
            const spellcastingAbility = spellcastingSearch[1].toLowerCase();
            finalSetAttrs.default_ability = `@{${spellcastingAbility}_mod}`;
          }
          const spellcastingLevelSearch = spellcastingLevelRegex.exec(freetext);
          if (spellcastingLevelSearch && spellcastingLevelSearch[1]) {
            finalSetAttrs.caster_level = spellcastingLevelSearch[1];
          }

          let match;
          while ((match = spellcastingRegex.exec(freetext)) !== null) {
            if (match && match[1] && match[2]) {
              finalSetAttrs[`spell_slots_l${match[1]}_bonus`] = match[2];
            }
          }
        }

        const actionType = typeRegex.exec(freetext);
        if (actionType) {
          if (actionType[1]) {
            actionType[1] = actionType[1].toLowerCase();
            if (isUndefined(v[`${repeatingString}type`]) && actionType[1] === 'melee') {
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

          hitBonus = getCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, 'attack_ability', hitBonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod);

          if (hitBonus) {
            finalSetAttrs[`${repeatingString}attack_bonus`] = hitBonus;
          }
          freetext = freetext.replace(toHitRegex, '');
          finalSetAttrs[`${repeatingString}roll_toggle`] = TOGGLE_VARS.roll;
        } else {
          finalSetAttrs[`${repeatingString}roll_toggle`] = '0';
        }

        const savingThrow = savingThrowRegex.exec(freetext);
        if (savingThrow) {
          if (savingThrow[1]) {
            let savingThrowTotal = savingThrow[1];
            savingThrowTotal -= 8;
            savingThrowTotal -= pb;

            savingThrowTotal = getAnyCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, 'saving_throw_ability', savingThrowTotal, abilityMods);

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

        freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damageRegex, 'damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        freetext = parseDamage(finalSetAttrs, repeatingString, freetext, altDamageRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damagePlusRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        if (!exists(finalSetAttrs[`${repeatingString}second_damage`])) {
          freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damageRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        }

        finalSetAttrs[`${repeatingString}extras_toggle`] = TOGGLE_VARS.extras;
        finalSetAttrs[`${repeatingString}toggle_details`] = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateAction(type, rowId);
    },
  });
};
const countAction = (type) => {
  getSetRepeatingItems('countAction', {
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
};

const actionsSetup = () => {
  on('change:pb', () => {
    updateActions();
  });
  on('change:repeating_trait', (eventInfo) => {
    updateActionIfTriggered('trait', eventInfo);
  });
  on('change:repeating_action', (eventInfo) => {
    updateActionIfTriggered('action', eventInfo);
  });
  on('change:repeating_reaction', (eventInfo) => {
    updateActionIfTriggered('reaction', eventInfo);
  });
  on('change:repeating_legendaryaction', (eventInfo) => {
    updateActionIfTriggered('legendaryaction', eventInfo);
  });
  on('change:repeating_lairaction', (eventInfo) => {
    updateActionIfTriggered('lairaction', eventInfo);
  });
  on('change:repeating_regionaleffect', (eventInfo) => {
    updateActionIfTriggered('regionaleffect', eventInfo);
  });
  on('change:repeating_trait remove:repeating_trait', () => {
    countAction('trait');
    updateActionChatMacro('trait');
  });
  on('change:repeating_action remove:repeating_action', () => {
    countAction('action');
    updateActionChatMacro('action');
  });
  on('change:repeating_reaction remove:repeating_reaction', () => {
    countAction('reaction');
    updateActionChatMacro('reaction');
  });
  on('change:repeating_legendaryaction remove:repeating_legendaryaction', () => {
    countAction('legendaryaction');
    updateActionChatMacro('legendaryaction');
  });
  on('change:repeating_lairaction remove:repeating_lairaction', () => {
    countAction('lairaction');
    updateActionChatMacro('lairaction');
  });
  on('change:repeating_regionaleffect remove:repeating_regionaleffect', () => {
    countAction('regionaleffect');
    updateActionChatMacro('regionaleffect');
  });
  on('change:repeating_trait:freetext', (eventInfo) => {
    const repeatingInfo = getRepeatingInfo('repeating_trait', eventInfo);
    parseAction('trait', repeatingInfo.rowId);
  });
  on('change:repeating_action:freetext', (eventInfo) => {
    const repeatingInfo = getRepeatingInfo('repeating_action', eventInfo);
    parseAction('action', repeatingInfo.rowId);
  });
  on('change:repeating_reaction:freetext', (eventInfo) => {
    const repeatingInfo = getRepeatingInfo('repeating_reaction', eventInfo);
    parseAction('reaction', repeatingInfo.rowId);
  });
  on('change:repeating_legendaryaction:freetext', (eventInfo) => {
    const repeatingInfo = getRepeatingInfo('repeating_legendaryaction', eventInfo);
    parseAction('legendaryaction', repeatingInfo.rowId);
  });
  on('change:repeating_lairaction:freetext', (eventInfo) => {
    const repeatingInfo = getRepeatingInfo('repeating_lairaction', eventInfo);
    parseAction('lairaction', repeatingInfo.rowId);
  });
  on('change:global_attack_bonus change:global_melee_attack_bonus change:global_ranged_attack_bonus change:global_damage_bonus change:global_melee_damage_bonus change:global_ranged_damage_bonus change:ammo_auto_use', () => {
    updateAction('action');
    updateAction('reaction');
    updateAction('legendaryaction');
    updateAction('lairaction');
  });
};

export { actionsSetup, updateAction, updateActions, updateActionChatMacro };
