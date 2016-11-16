/* global on:false, generateRowID:false, removeRepeatingRow:false */

import { ABILITIES, TOGGLE_VARS } from './../../scripts/constants';
import { updateAttackToggle, updateSavingThrowToggle, updateDamageToggle, updateHealToggle, updateHigherLevelToggle } from './../actionComponents/updateToggles';
import { getSetItems, getSetRepeatingItems, getIntValue, isUndefined, isUndefinedOrEmpty, setCritDamage, fromVOrFinalSetAttrs, lowercaseDamageTypes, getRepeatingInfo } from './../../scripts/utilities';

export class Psionics {
  constructor() {
    this.conversionArray = ['type', 'add_casting_modifier', 'add_second_casting_modifier', 'manifest_as_level', 'name', 'psionic_level', 'discipline', 'meditate', 'meditate_output', 'manifesting_time', 'range', 'display', 'materials', 'materials_show', 'duration', 'concentration', 'content_toggle', 'content', 'toggle_details', 'attack_formula', 'roll_toggle', 'proficiency', 'attack_ability', 'attack_bonus', 'crit_range', 'saving_throw_toggle', 'saving_throw_condition', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_dc', 'saving_throw_vs_ability', 'saving_throw_failure', 'saving_throw_success', 'damage_formula', 'damage_crit_formula', 'damage_toggle', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_formula', 'second_damage_crit_formula', 'second_damage_toggle', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'heal_formula', 'heal_toggle', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'higher_level_query', 'higher_level_toggle', 'higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal', 'extras_toggle', 'emote', 'freetext', 'freeform', 'special_effects_toggle', 'special_effects_type', 'special_effects_color', 'special_effects_points_of_origin', 'parsed'];
    this.levelToPsiCost = {
      0: 0,
      1: 2,
      2: 3,
      3: 5,
      4: 6,
      5: 7,
      6: 9,
      7: 10,
      8: 11,
      9: 13,
    };
  }
  updateDefaultAbility() {
    const repeatingItems = [];
    for (let level = 0; level <= 9; level++) {
      repeatingItems.push(`repeating_psionic${level}`);
    }
    getSetRepeatingItems('psionics.update', {
      repeatingItems,
      collectionArray: ['default_ability'],
      collectionArrayAddItems: ['name', 'attack_ability', 'damage_ability', 'second_damage_ability', 'saving_throw_ability', 'heal_ability'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const name = v[`${repeatingString}name`];

          if (!name) {
            removeRepeatingRow(`${repeatingItem}_${id}`);
            continue;
          }

          finalSetAttrs[`${repeatingString}attack_ability`] = v.default_ability;
          if (v[`${repeatingString}damage_ability`]) {
            finalSetAttrs[`${repeatingString}damage_ability`] = v.default_ability;
          }
          if (v[`${repeatingString}second_damage_ability`]) {
            finalSetAttrs[`${repeatingString}second_damage_ability`] = v.default_ability;
          }
          finalSetAttrs[`${repeatingString}saving_throw_ability`] = v.default_ability;
          if (v[`${repeatingString}heal_ability`]) {
            finalSetAttrs[`${repeatingString}heal_ability`] = v.default_ability;
          }
        }
      },
    });
  }
  update(rowId, level) {
    const collectionArray = ['is_npc', 'pb', 'finesse_mod', 'global_psionics_attack_bonus', 'global_psionics_damage_bonus', 'global_psionics_dc_bonus', 'global_psionics_heal_bonus', 'default_ability', 'caster_level', 'base_dc'];
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_mod`);
    }
    getSetRepeatingItems('psionics.update', {
      repeatingItems: [`repeating_psionic${level}`],
      collectionArray,
      collectionArrayAddItems: ['name', 'discipline', 'psionic_level', 'manifesting_time', 'display', 'concentration', 'duration', 'type', 'roll_toggle', 'to_hit', 'attack_formula', 'proficiency', 'attack_ability', 'attack_bonus', 'saving_throw_toggle', 'saving_throw_ability', 'saving_throw_vs_ability', 'saving_throw_bonus', 'saving_throw_dc', 'damage_toggle', 'damage_formula', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_toggle', 'second_damage_formula', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'damage_string', 'parsed', 'heal_toggle', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'higher_level_toggle', 'higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal', 'meditate', 'meditate_output', 'materials', 'materials_show', 'extras_toggle', 'emote', 'freetext', 'freeform'],
      rowId,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const name = v[`${repeatingString}name`];

          if (!name) {
            removeRepeatingRow(`${repeatingItem}_${id}`);
            continue;
          }

          if (isUndefinedOrEmpty(v[`${repeatingString}psionic_level`]) || v[`${repeatingString}psionic_level`] === 'TALENT') {
            finalSetAttrs[`${repeatingString}manifest_as_level`] = '';
          } else {
            const psionicLevel = getIntValue(v[`${repeatingString}psionic_level`]);
            finalSetAttrs[`${repeatingString}manifest_as_level`] = `@{manifest_as_level_${psionicLevel}}`;
          }

          if (!isUndefined(fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}duration`)) && fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}duration`).indexOf('CONCENTRATION') !== -1) {
            finalSetAttrs[`${repeatingString}concentration`] = 'Yes';
          } else {
            finalSetAttrs[`${repeatingString}concentration`] = '';
          }
          if (v[`${repeatingString}meditate`] === 'Yes') {
            finalSetAttrs[`${repeatingString}meditate_output`] = '?{Cast as|Meditate,{{meditate=1&#125;&#125;|Psionic,}';
          } else {
            finalSetAttrs[`${repeatingString}meditate_output`] = '';
          }
          if (!isUndefinedOrEmpty(v[`${repeatingString}materials`])) {
            finalSetAttrs[`${repeatingString}materials_show`] = 1;
          } else if (!isUndefinedOrEmpty(v[`${repeatingString}materials_show`])) {
            finalSetAttrs[`${repeatingString}materials_show`] = 0;
          }

          const attackOptions = {
            attackAbility: true,
            globalAttackBonus: v.global_psionics_attack_bonus,
            globalAttackBonusLabel: 'global psionics attack bonus',
            type: 'psionic',
          };
          updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

          const savingThrowOptions = {
            bonusDC: v.global_psionics_dc_bonus,
          };
          updateSavingThrowToggle(v, finalSetAttrs, repeatingString, savingThrowOptions);

          const damageOptions = {
            globalDamageBonus: v.global_psionics_damage_bonus,
            globalDamageBonusLabel: 'global psionics damage bonus',
            type: 'psionic',
          };
          updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);
          if (v.damage_type) {
            finalSetAttrs.damage_type = lowercaseDamageTypes(v.damage_type);
          }
          if (v.second_damage_type) {
            finalSetAttrs.second_damage_type = lowercaseDamageTypes(v.second_damage_type);
          }
          setCritDamage(v, finalSetAttrs, repeatingString);

          if (getIntValue(v.is_npc) === 1 && v.caster_level && v[`${repeatingString}damage`] && v[`${repeatingString}damage`].indexOf('@{level}') !== -1) {
            finalSetAttrs[`${repeatingString}damage`] = v[`${repeatingString}damage`].replace('@{level}', '@{caster_level}');
          }

          updateHealToggle(v, finalSetAttrs, repeatingString);

          updateHigherLevelToggle(v, finalSetAttrs, repeatingString);

          if (isUndefinedOrEmpty(v[`${repeatingString}extras_toggle`]) && (v[`${repeatingString}emote`] || v[`${repeatingString}freetext`] || v[`${repeatingString}freeform`])) {
            finalSetAttrs[`${repeatingString}extras_toggle`] = TOGGLE_VARS.extras;
          }
        }
      },
    });
  }
  oldValueToNew(v, finalSetAttrs, repeatingString, newRepeatingString, field) {
    if (typeof v[`${repeatingString}${field}`] !== 'undefined') {
      finalSetAttrs[`${newRepeatingString}${field}`] = v[`${repeatingString}${field}`];
    }
  }
  changeLevel(rowId, oldLevel) {
    const collectionArrayAddItems = this.conversionArray;
    getSetRepeatingItems('psionics.changePsionicLevel', {
      repeatingItems: [`repeating_psionic${oldLevel}`],
      collectionArrayAddItems,
      rowId,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const newLevel = getIntValue(v[`${repeatingString}psionic_level`]);
          if (oldLevel !== newLevel) {
            const newRepeatingString = `repeating_psionic${newLevel}_${generateRowID()}_`;
            for (const field of collectionArrayAddItems) {
              this.oldValueToNew(v, finalSetAttrs, repeatingString, newRepeatingString, field);
            }
            removeRepeatingRow(`${repeatingItem}_${id}`);
            this.updateChatMacro([oldLevel, newLevel]);
          }
        }
      },
    });
  }
  updateShowHide(levelsToUpdate) {
    const collectionArray = ['psi_limit'];
    if (!levelsToUpdate) {
      levelsToUpdate = [];
      for (let level = 0; level <= 9; level++) {
        levelsToUpdate.push(level);
      }
    }
    for (const level of levelsToUpdate) {
      collectionArray.push(`psionics_level_${level}_macro_var`);
      collectionArray.push(`psionics_level_${level}_show`);
    }
    getSetItems('psionics.updateShowHide', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        const psiLimit = getIntValue(v.psi_limit, 2);
        for (const level of levelsToUpdate) {
          const hasPsionics = v[`psionics_level_${level}_macro_var`];
          const belowPsiLimit = this.levelToPsiCost[level] <= psiLimit;

          if (hasPsionics && belowPsiLimit) {
            finalSetAttrs[`psionics_level_${level}_show`] = true;
          } else {
            finalSetAttrs[`psionics_level_${level}_show`] = '';
          }
        }
      },
    });
  }
  updateChatMacro(levelsToUpdate) {
    const collectionArray = [];
    const repeatingItems = [];
    if (!levelsToUpdate) {
      levelsToUpdate = [];
      for (let level = 0; level <= 9; level++) {
        levelsToUpdate.push(level);
      }
    }
    for (const level of levelsToUpdate) {
      collectionArray.push(`psionics_level_${level}_macro_var`);
      repeatingItems.push(`repeating_psionic${level}`);
    }
    getSetRepeatingItems('psionics.updateChatMacro', {
      repeatingItems,
      collectionArray,
      collectionArrayAddItems: ['name'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        const chatMacro = [];
        const level = getIntValue(repeatingItem.substr(repeatingItem.length - 1));
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const name = v[`${repeatingString}name`];

          if (!name) {
            removeRepeatingRow(`${repeatingItem}_${id}`);
            continue;
          }
          let classes = ['psionic-wrapper'];
          classes = classes.map((className) => {
            return `sheet-${className}`;
          }).join(' ');
          chatMacro.push(`<span class="${classes}">[${name}](~repeating_psionic${level}_${id}_psionic)</span>`);
        }

        finalSetAttrs[`psionics_level_${level}_macro_var`] = chatMacro.join(', ');
      },
    });
  }
  generateHigherLevelQueries() {
    const collectionArray = ['psi_limit'];
    getSetItems('psionics.generateHigherLevelQueries', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        const psiLimit = getIntValue(v.psi_limit);
        for (let level = 1; level <= 8; level++) {
          const levels = [];

          for (let psiCost = this.levelToPsiCost[level]; psiCost <= psiLimit; psiCost++) {
            levels.push(psiCost);
          }

          let higherLevelQuery;

          if (levels.length > 1) {
            higherLevelQuery = `?{Psi Points|${levels.join('|')}}`;
          } else if (levels.length === 1) {
            higherLevelQuery = levels[0];
          } else {
            higherLevelQuery = level;
          }
          finalSetAttrs[`higher_level_query_${level}`] = higherLevelQuery;
          finalSetAttrs[`manifest_as_level_${level}`] = higherLevelQuery;
        }
      },
    });
  }
  watchForChanges() {
    for (let level = 0; level <= 9; level++) {
      on(`change:psionics_level_${level}_macro_var`, () => {
        this.updateShowHide([level]);
      });
    }
  }
  repeatingSectionChange() {
    for (let level = 0; level <= 9; level++) {
      on(`change:repeating_psionic${level}`, (eventInfo) => {
        const repeatingInfo = getRepeatingInfo(`repeating_psionic${level}`, eventInfo);
        if (repeatingInfo) {
          if (repeatingInfo.field === 'psionic_level') {
            this.changeLevel(repeatingInfo.rowId, level);
          }
          if (repeatingInfo.field !== 'psionic_level' && repeatingInfo.field !== 'roll_toggle' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'heal_formula' && repeatingInfo.field !== 'higher_level_query' && repeatingInfo.field !== 'manifest_as_level' && repeatingInfo.field !== 'parsed') {
            if (repeatingInfo.field !== 'toggle_details') {
              this.update(repeatingInfo.rowId, level);
            }
            this.updateChatMacro([level]);
          }
        }
      });
      on(`remove:repeating_psionic${level}`, () => {
        this.updateChatMacro([level]);
      });
    }
  }
  setup() {
    this.repeatingSectionChange();
    this.watchForChanges();
    on('change:default_ability', () => {
      this.updateDefaultAbility();
    });
    on('change:pb change:global_psionics_attack_bonus change:global_psionics_damage_bonus change:global_psionics_dc_bonus change:global_psionics_heal_bonus', () => {
      this.update();
    });
    on('change:psi_limit', () => {
      this.generateHigherLevelQueries();
      this.updateShowHide();
    });
  }
}
