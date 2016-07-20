import { getSetRepeatingItems, isUndefinedOrEmpty, fromVOrFinalSetAttrs, setCritDamage } from './utilities';
import { updateAttackToggle, updateSavingThrowToggle, updateDamageToggle, updateHealToggle } from './updateToggles';
import { ABILITIES } from './constants';

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

export { updateAction, updateActions, updateActionIfTriggered, updateActionChatMacro };
