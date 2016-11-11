/* global on:false, generateRowID:false, removeRepeatingRow:false */

import { ABILITIES, TOGGLE_VARS } from './constants';
import { updateAttackToggle, updateSavingThrowToggle, updateDamageToggle, updateHealToggle, updateHigherLevelToggle } from './updateToggles';
import { getSetItems, getSetRepeatingItems, ordinalSpellLevel, getIntValue, emptyRepeatingSection, isUndefined, isUndefinedOrEmpty, setCritDamage, fromVOrFinalSetAttrs, lowercaseDamageTypes, getRepeatingInfo, exists } from './utilities';

export class Spells {
  parseSRD(v, finalSetAttrs, repeatingString) {
    if (v[`${repeatingString}spell_level_from_srd`]) {
      finalSetAttrs[`${repeatingString}spell_level`] = ordinalSpellLevel(v[`${repeatingString}spell_level_from_srd`]);
      finalSetAttrs[`${repeatingString}spell_level_from_srd`] = '';
    }
    if (v[`${repeatingString}school_from_srd`]) {
      finalSetAttrs[`${repeatingString}school`] = v[`${repeatingString}school_from_srd`].toUpperCase();
      finalSetAttrs[`${repeatingString}school_from_srd`] = '';
    }
    if (v[`${repeatingString}casting_time_from_srd`]) {
      finalSetAttrs[`${repeatingString}casting_time`] = v[`${repeatingString}casting_time_from_srd`].trim().toUpperCase().replace(/\s/g, '_');
      finalSetAttrs[`${repeatingString}casting_time_from_srd`] = '';
    }
    if (v[`${repeatingString}components_from_srd`]) {
      finalSetAttrs[`${repeatingString}components`] = `COMPONENTS_${v[`${repeatingString}components_from_srd`].trim().toUpperCase().replace(/\s/g, '_')}`;
      finalSetAttrs[`${repeatingString}components_from_srd`] = '';
    }
    if (v[`${repeatingString}duration_from_srd`]) {
      let duration = '';
      if (v[`${repeatingString}duration_from_srd`].toLowerCase().indexOf('up to') !== -1) {
        duration += 'CONCENTRATION_';
      }
      duration += v[`${repeatingString}duration_from_srd`].trim().toUpperCase().replace(/\s/g, '_');
      finalSetAttrs[`${repeatingString}duration`] = duration;
      finalSetAttrs[`${repeatingString}duration_from_srd`] = '';
    }
    if (v[`${repeatingString}saving_throw_vs_ability_from_srd`]) {
      finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = v[`${repeatingString}saving_throw_vs_ability_from_srd`].toUpperCase();
      finalSetAttrs[`${repeatingString}saving_throw_vs_ability_from_srd`] = '';
    }
  }
  updateFromSRD() {
    getSetItems('spells.updateFromSRD', {
      collectionArray: ['spells_srd'],
      callback: (v, finalSetAttrs) => {
        const spellsFromSrd = v.spells_srd.split(', ');

        for (const spell of spellsFromSrd) {
          const repeatingString = `repeating_spell_${generateRowID()}_`;
          finalSetAttrs[`${repeatingString}name`] = spell;
          finalSetAttrs[`${repeatingString}toggle_details`] = 0;
        }
      },
    });
  }
  updateDefaultAbility() {
    const repeatingItems = [];
    for (let i = 0; i <= 9; i++) {
      repeatingItems.push(`repeating_spell${i}`);
    }
    getSetRepeatingItems('spells.update', {
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
    const collectionArray = ['is_npc', 'pb', 'finesse_mod', 'global_spell_attack_bonus', 'global_spell_damage_bonus', 'global_spell_dc_bonus', 'global_spell_heal_bonus', 'default_ability', 'caster_level', 'base_dc'];
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_mod`);
    }
    getSetRepeatingItems('spells.update', {
      repeatingItems: [`repeating_spell${level}`],
      collectionArray,
      collectionArrayAddItems: ['name', 'spell_level', 'spell_level_from_srd', 'school', 'school_from_srd', 'ritual', 'ritual_output', 'casting_time', 'casting_time_from_srd', 'components', 'components_from_srd', 'materials', 'materials_show', 'duration', 'duration_from_srd', 'concentration', 'add_casting_modifier', 'add_second_casting_modifier', 'type', 'parsed', 'roll_toggle', 'to_hit', 'attack_formula', 'proficiency', 'attack_ability', 'attack_bonus', 'saving_throw_toggle', 'saving_throw_ability', 'saving_throw_vs_ability', 'saving_throw_vs_ability_from_srd', 'saving_throw_bonus', 'saving_throw_dc', 'damage_toggle', 'damage_formula', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_toggle', 'second_damage_formula', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'damage_string', 'heal_toggle', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'higher_level_toggle', 'higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal', 'extras_toggle', 'emote', 'freetext', 'freeform'],
      rowId,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const name = v[`${repeatingString}name`];

          if (!name) {
            removeRepeatingRow(`${repeatingItem}_${id}`);
            continue;
          }

          this.parseSRD(v, finalSetAttrs, repeatingString);

          if (v[`${repeatingString}spell_level`] === 'CANTRIP') {
            finalSetAttrs[`${repeatingString}is_prepared`] = 'Yes';
          } else {
            const spellLevel = getIntValue(v[`${repeatingString}spell_level`]);
            finalSetAttrs[`${repeatingString}cast_as_level`] = `@{cast_as_level_${spellLevel}}`;
          }

          if (!isUndefined(fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}duration`)) && fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}duration`).indexOf('CONCENTRATION') !== -1) {
            finalSetAttrs[`${repeatingString}concentration`] = 'Yes';
          } else {
            finalSetAttrs[`${repeatingString}concentration`] = '';
          }
          if (v[`${repeatingString}ritual`] === 'Yes') {
            finalSetAttrs[`${repeatingString}ritual_output`] = '?{Cast as|Ritual,{{ritual=1&#125;&#125;|Spell,}';
          } else {
            finalSetAttrs[`${repeatingString}ritual_output`] = '';
          }
          if (!isUndefinedOrEmpty(v[`${repeatingString}materials`])) {
            finalSetAttrs[`${repeatingString}materials_show`] = 1;
          } else if (!isUndefinedOrEmpty(v[`${repeatingString}materials_show`])) {
            finalSetAttrs[`${repeatingString}materials_show`] = 0;
          }

          const attackOptions = {
            attackAbility: true,
            globalAttackBonus: v.global_spell_attack_bonus,
            globalAttackBonusLabel: 'global spell attack bonus',
            type: 'spell',
          };
          updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

          const savingThrowOptions = {
            bonusDC: v.global_spell_dc_bonus,
          };
          updateSavingThrowToggle(v, finalSetAttrs, repeatingString, savingThrowOptions);

          const damageOptions = {
            globalDamageBonus: v.global_spell_damage_bonus,
            globalDamageBonusLabel: 'global spell damage bonus',
            type: 'spell',
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
    const collectionArrayAddItems = ['toggle_details', 'name', 'spell_level', 'school', 'ritual', 'ritual_output', 'is_prepared', 'casting_time', 'range', 'components', 'materials', 'materials_show', 'duration', 'concentration', 'add_casting_modifier', 'add_second_casting_modifier', 'type', 'parsed', 'content_toggle', 'content', 'roll_toggle', 'proficiency', 'attack_ability', 'attack_bonus', 'crit_range', 'saving_throw_toggle', 'saving_throw_condition', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_vs_ability', 'saving_throw_failure', 'saving_throw_success', 'damage_toggle', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_toggle', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'heal_toggle', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'higher_level_toggle', 'higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal', 'extras_toggle', 'emote', 'freetext', 'freeform', 'special_effects_toggle', 'special_effects_type', 'special_effects_color', 'special_effects_points_of_origin'];
    getSetRepeatingItems('spells.changeLevel', {
      repeatingItems: [`repeating_spell${oldLevel}`],
      collectionArrayAddItems,
      rowId,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const newLevel = getIntValue(v[`${repeatingString}spell_level`]);
          if (oldLevel !== newLevel) {
            const newRepeatingString = `repeating_spell${newLevel}_${generateRowID()}_`;
            for (const field of collectionArrayAddItems) {
              this.oldValueToNew(v, finalSetAttrs, repeatingString, newRepeatingString, field);
            }
            removeRepeatingRow(`${repeatingItem}_${id}`);
          }
        }
      },
    });
  }
  updateSlots() {
    const collectionArray = ['caster_level', 'caster_type'];
    const levels = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    };
    for (const level in levels) {
      if (levels.hasOwnProperty(level)) {
        const repeatingString = `spell_slots_l${level}`;
        collectionArray.push(`${repeatingString}_calc`);
        collectionArray.push(`${repeatingString}_bonus`);
        collectionArray.push(`${repeatingString}_max`);
        collectionArray.push(`${repeatingString}_toggle`);
      }
    }

    getSetItems('spells.updateSlots', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        const casterLevel = getIntValue(v.caster_level);
        const casterType = v.caster_type;

        if (casterType === 'full') {
          if (casterLevel >= 3) {
            levels[1] = 4;
          } else if (casterLevel === 2) {
            levels[1] = 3;
          } else if (casterLevel === 1) {
            levels[1] = 2;
          }
          if (casterLevel >= 4) {
            levels[2] = 3;
          } else if (casterLevel === 3) {
            levels[2] = 2;
          }
          if (casterLevel >= 6) {
            levels[3] = 3;
          } else if (casterLevel === 5) {
            levels[3] = 2;
          }
          if (casterLevel >= 9) {
            levels[4] = 3;
          } else if (casterLevel === 8) {
            levels[4] = 2;
          } else if (casterLevel === 7) {
            levels[4] = 1;
          }
          if (casterLevel >= 18) {
            levels[5] = 3;
          } else if (casterLevel >= 10) {
            levels[5] = 2;
          } else if (casterLevel === 9) {
            levels[5] = 1;
          }
          if (casterLevel >= 19) {
            levels[6] = 2;
          } else if (casterLevel >= 11) {
            levels[6] = 1;
          }
          if (casterLevel >= 20) {
            levels[7] = 2;
          } else if (casterLevel >= 13) {
            levels[7] = 1;
          }
          if (casterLevel >= 15) {
            levels[8] = 1;
          }
          if (casterLevel >= 17) {
            levels[9] = 1;
          }
        }

        if (casterType === 'half') {
          if (casterLevel >= 5) {
            levels[1] = 4;
          } else if (casterLevel >= 3) {
            levels[1] = 3;
          } else if (casterLevel === 2) {
            levels[1] = 2;
          }
          if (casterLevel >= 7) {
            levels[2] = 3;
          } else if (casterLevel >= 5) {
            levels[2] = 2;
          }
          if (casterLevel >= 11) {
            levels[3] = 3;
          } else if (casterLevel >= 9) {
            levels[3] = 2;
          }
          if (casterLevel >= 17) {
            levels[4] = 3;
          } else if (casterLevel >= 15) {
            levels[4] = 2;
          } else if (casterLevel >= 13) {
            levels[4] = 1;
          }
          if (casterLevel >= 19) {
            levels[5] = 2;
          } else if (casterLevel >= 17) {
            levels[5] = 1;
          }
        }

        if (casterType === 'third') {
          if (casterLevel >= 7) {
            levels[1] = 4;
          } else if (casterLevel >= 4) {
            levels[1] = 3;
          } else if (casterLevel === 3) {
            levels[1] = 2;
          }
          if (casterLevel >= 10) {
            levels[2] = 3;
          } else if (casterLevel >= 7) {
            levels[2] = 2;
          }
          if (casterLevel >= 16) {
            levels[3] = 3;
          } else if (casterLevel >= 13) {
            levels[3] = 2;
          }
          if (casterLevel >= 19) {
            levels[4] = 1;
          }
        }

        for (const level in levels) {
          if (levels.hasOwnProperty(level)) {
            const repeatingString = `spell_slots_l${level}`;
            finalSetAttrs[repeatingString] = 0;
            if (levels[level] !== 0 || exists(v[`${repeatingString}_calc`])) {
              finalSetAttrs[`spell_slots_l${level}_calc`] = levels[level];
            }

            const slots = v[`${repeatingString}`];
            const slotBonus = getIntValue(v[`${repeatingString}_bonus`]);
            const spellSlotMax = levels[level] + slotBonus;

            if (spellSlotMax > 0) {
              finalSetAttrs[`${repeatingString}_max`] = spellSlotMax;
              if (isUndefinedOrEmpty(slots)) {
                finalSetAttrs[repeatingString] = spellSlotMax;
              }
            } else {
              if (exists(v[`${repeatingString}_max`])) {
                finalSetAttrs[`${repeatingString}_max`] = 0;
              }
            }
          }
        }
      },
    });
  }
  updateWarlockSlots() {
    getSetItems('spells.updateWarlockSlots', {
      collectionArray: ['warlock_spell_slots', 'warlock_spell_slots_calc', 'warlock_spell_slots_bonus', 'warlock_spell_slots_max'],
      callback: (v, finalSetAttrs) => {
        const warlockSlots = getIntValue(v.warlock_spell_slots_calc) + getIntValue(v.warlock_spell_slots_bonus);
        finalSetAttrs.warlock_spell_slots = warlockSlots;
        finalSetAttrs.warlock_spell_slots_max = warlockSlots;
        if (warlockSlots) {
          finalSetAttrs.has_warlock_spell_slots = true;
        } else {
          finalSetAttrs.has_warlock_spell_slots = '';
        }
      },
    });
  }
  checkIfSpellHasHigherLevelSlots(v, spellLevel) {
    const warlockSlots = getIntValue(v.warlock_spell_slots);
    const warlockSpellsMaxLevel = getIntValue(v.warlock_spells_max_level);
    let hasHigherLevelSlots = false;
    for (let level = spellLevel + 1; level <= 9; level++) {
      const hasSlotsOrWarlockSlots = (getIntValue(v[`spell_slots_l${level}`]) > 0) || (warlockSlots && level <= warlockSpellsMaxLevel);
      if (hasSlotsOrWarlockSlots) {
        hasHigherLevelSlots = true;
        break;
      }
    }
    return hasHigherLevelSlots;
  }
  updateShowHide() {
    const collectionArray = ['warlock_spell_slots', 'warlock_spells_max_level'];
    for (let i = 0; i <= 9; i++) {
      collectionArray.push(`spell_slots_l${i}`);
      collectionArray.push(`spell_slots_l${i}_max`);
      collectionArray.push(`spell_slots_l${i}_toggle`);
      collectionArray.push(`spells_level_${i}_macro_var`);
      collectionArray.push(`spells_level_${i}_show`);
    }

    getSetItems('spells.updateShowHide', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        for (let level = 0; level <= 9; level++) {
          const hasSpells = v[`spells_level_${level}_macro_var`];
          const hasSlots = getIntValue(v[`spell_slots_l${level}`]) > 0;
          const hasSlotsMax = getIntValue(v[`spell_slots_l${level}_max`]) > 0;

          if (hasSpells || hasSlots || hasSlotsMax) {
            finalSetAttrs[`spell_slots_l${level}_toggle`] = 'on';
          } else {
            finalSetAttrs[`spell_slots_l${level}_toggle`] = 0;
          }
          const hasHigherLevelSlots = this.checkIfSpellHasHigherLevelSlots(v, level);
          const warlockSlots = getIntValue(v.warlock_spell_slots);
          const warlockSpellsMaxLevel = getIntValue(v.warlock_spells_max_level);
          const hasSlotsOrWarlockSlots = hasSlots || (warlockSlots && level <= warlockSpellsMaxLevel);

          if (hasSpells || hasSlotsOrWarlockSlots || hasHigherLevelSlots) {
            finalSetAttrs[`spells_level_${level}_show`] = true;
          } else {
            finalSetAttrs[`spells_level_${level}_show`] = '';
          }
        }
      },
    });
  }
  updateChatMacro(level) {
    const levels = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    };

    let minLevel = 0;
    let maxLevel = 9;
    if (level) {
      minLevel = level;
      maxLevel = level;
    }

    const collectionArray = [];
    const repeatingItems = [];
    for (let i = minLevel; i <= maxLevel; i++) {
      collectionArray.push(`spells_level_${i}_macro_var`);
      repeatingItems.push(`repeating_spell${i}`);
    }
    getSetRepeatingItems('spells.updateChatMacro', {
      repeatingItems,
      collectionArray,
      collectionArrayAddItems: ['name', 'spell_level', 'is_prepared', 'ritual', 'concentration', 'components', 'casting_time'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const name = v[`${repeatingString}name`];
          const spellLevel = getIntValue(v[`${repeatingString}spell_level`], 0);

          if (!name) {
            removeRepeatingRow(`${repeatingItem}_${id}`);
            continue;
          }

          let classes = ['spell-wrapper'];
          classes.push(`${v[`${repeatingString}spell_level`]}`);
          if (!v[`${repeatingString}is_prepared`] || v[`${repeatingString}is_prepared`] === 'Yes') {
            classes.push('prepared');
          }
          if (v[`${repeatingString}ritual`] === 'Yes') {
            classes.push('ritual');
          }
          if (v[`${repeatingString}concentration`] === 'Yes') {
            classes.push('concentration');
          }
          classes.push(`${v[`${repeatingString}components`]}`);
          classes.push(`${v[`${repeatingString}casting_time`]}`);

          classes = classes.map((className) => {
            return `sheet-${className}`;
          }).join(' ');
          levels[spellLevel].push(`<span class="${classes}">[${name}](~repeating_spell${spellLevel}_${id}_spell)</span>`);
        }

        for (let i = minLevel; i <= maxLevel; i++) {
          if (levels[i].length > 0) {
            finalSetAttrs[`spells_level_${i}_macro_var`] = levels[i].join(', ');
          } else {
            finalSetAttrs[`spells_level_${i}_macro_var`] = '';
          }
        }
      },
    });
  }
  generateHigherLevelQueries() {
    const collectionArray = ['warlock_spell_slots', 'warlock_spells_max_level'];
    for (let i = 1; i <= 8; i++) {
      collectionArray.push(`cast_as_level_${i}`);
      collectionArray.push(`higher_level_query_${i}`);
    }
    for (let i = 1; i <= 9; i++) {
      collectionArray.push(`spell_slots_l${i}`);
    }

    getSetItems('spells.generateHigherLevelQueries', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        for (let i = 1; i <= 8; i++) {
          const levels = [];
          const warlockSpellsMaxLevel = getIntValue(v.warlock_spells_max_level);

          for (let j = i; j <= 9; j++) {
            if (getIntValue(v[`spell_slots_l${j}`]) || j === warlockSpellsMaxLevel) {
              levels.push(j);
            }
          }

          let higherLevelQuery;

          if (levels.length > 1) {
            higherLevelQuery = `?{Spell Level|${levels.join('|')}}`;
          } else if (levels.length === 1) {
            higherLevelQuery = levels[0];
          } else {
            higherLevelQuery = i;
          }
          finalSetAttrs[`higher_level_query_${i}`] = higherLevelQuery;

          if (v[`spell_slots_l${i}`] === '0' && higherLevelQuery !== i) {
            finalSetAttrs[`cast_as_level_${i}`] = higherLevelQuery;
          } else {
            finalSetAttrs[`cast_as_level_${i}`] = '';
          }
        }
      },
    });
  }
  updateHasSpellSlots() {
    getSetItems('spells.updateHasSpellSlots', {
      collectionArray: ['spell_slots_toggle', 'has_spell_slots'],
      callback: (v, finalSetAttrs) => {
        if (v.spell_slots_toggle === 'on') {
          finalSetAttrs.has_spell_slots = true;
        } else {
          finalSetAttrs.has_spell_slots = '';
        }
      },
    });
  }
  updateHasSpellPoints() {
    getSetItems('spells.updateHasSpellPoints', {
      collectionArray: ['spell_points_toggle', 'has_spell_points'],
      callback: (v, finalSetAttrs) => {
        if (v.spell_points_toggle === 'on') {
          finalSetAttrs.has_spell_points = true;
        } else {
          finalSetAttrs.has_spell_points = '';
        }
      },
    });
  }
  watchForChanges() {
    let watch = ['warlock_spells_max_level', 'warlock_spell_slots'];
    for (let i = 0; i <= 9; i++) {
      watch.push(`spells_level_${i}_macro_var`);
      watch.push(`spell_slots_l${i}`);
      watch.push(`spell_slots_l${i}_max`);
    }
    watch = watch.map((item) => {
      return `change:${item}`;
    }).join(' ');
    on(watch, () => {
      this.updateShowHide();
    });
  }
  repeatingSectionChange() {
    for (let level = 0; level <= 9; level++) {
      on(`change:repeating_spell${level}`, (eventInfo) => {
        const repeatingInfo = getRepeatingInfo(`repeating_spell${level}`, eventInfo);
        if (repeatingInfo) {
          if (repeatingInfo.field === 'spell_level') {
            this.changeLevel(repeatingInfo.rowId, level);
          }
          if (repeatingInfo.field !== 'roll_toggle' && repeatingInfo.field !== 'toggle_details' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'heal_formula' && repeatingInfo.field !== 'higher_level_query' && repeatingInfo.field !== 'cast_as_level' && repeatingInfo.field !== 'parsed') {
            this.update(repeatingInfo.rowId, level);
            this.updateChatMacro(level);
          }
        }
      });
      on(`remove:repeating_spell${level}`, () => {
        this.updateChatMacro(level);
      });
    }
  }
  setup() {
    this.repeatingSectionChange();
    this.watchForChanges();
    on('change:default_ability', () => {
      this.updateDefaultAbility();
    });
    on('change:pb change:global_spell_attack_bonus change:global_spell_damage_bonus change:global_spell_dc_bonus change:global_spell_heal_bonus', () => {
      this.update();
    });
    on('change:spells_srd', () => {
      this.updateFromSRD();
    });
    on('change:spell_slots_l1_bonus change:spell_slots_l2_bonus change:spell_slots_l3_bonus change:spell_slots_l4_bonus change:spell_slots_l5_bonus change:spell_slots_l6_bonus change:spell_slots_l7_bonus change:spell_slots_l8_bonus change:spell_slots_l9_bonus', () => {
      this.updateSlots();
    });
    on('change:warlock_spell_slots_calc change:warlock_spell_slots_bonus', () => {
      this.updateWarlockSlots();
    });
    on('change:spell_slots_toggle', () => {
      this.updateHasSpellSlots();
    });
    on('change:spell_points_toggle', () => {
      this.updateHasSpellPoints();
    });
    on('change:warlock_spell_slots change:warlock_spells_max_level change:spell_slots_l1 change:spell_slots_l2 change:spell_slots_l3 change:spell_slots_l4 change:spell_slots_l5 change:spell_slots_l6 change:spell_slots_l7 change:spell_slots_l8 change:spell_slots_l9', () => {
      this.generateHigherLevelQueries();
    });
  }
}
