/* global on:false, generateRowID:false */

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
    getSetRepeatingItems('spells.update', {
      repeatingItems: ['repeating_spell'],
      collectionArray: ['default_ability'],
      collectionArrayAddItems: ['attack_ability', 'damage_ability', 'second_damage_ability', 'saving_throw_ability', 'heal_ability'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;

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
  update(rowId) {
    const collectionArray = ['is_npc', 'pb', 'finesse_mod', 'global_spell_attack_bonus', 'global_spell_damage_bonus', 'global_spell_dc_bonus', 'global_spell_heal_bonus', 'default_ability', 'caster_level', 'base_dc'];
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_mod`);
    }
    getSetRepeatingItems('spells.update', {
      repeatingItems: ['repeating_spell'],
      collectionArray,
      collectionArrayAddItems: ['name', 'school', 'spell_level', 'spell_level_from_srd', 'school_from_srd', 'casting_time', 'casting_time_from_srd', 'components', 'components_from_srd', 'concentration', 'duration', 'duration_from_srd', 'type', 'roll_toggle', 'to_hit', 'attack_formula', 'proficiency', 'attack_ability', 'attack_bonus', 'saving_throw_toggle', 'saving_throw_ability', 'saving_throw_vs_ability', 'saving_throw_vs_ability_from_srd', 'saving_throw_bonus', 'saving_throw_dc', 'damage_toggle', 'damage_formula', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_toggle', 'second_damage_formula', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'damage_string', 'parsed', 'heal_toggle', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'add_casting_modifier', 'add_second_casting_modifier', 'higher_level_toggle', 'higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal', 'ritual', 'ritual_output', 'materials', 'materials_show', 'extras_toggle', 'emote', 'freetext', 'freeform'],
      rowId,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;

          this.parseSRD(v, finalSetAttrs, repeatingString);

          if (v[`${repeatingString}spell_level`] === 'CANTRIP') {
            finalSetAttrs[`${repeatingString}is_prepared`] = 'on';
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
  updateSlots() {
    const collectionArray = ['caster_level', 'caster_type'];
    const spellSlots = {
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
    for (const level in spellSlots) {
      if (spellSlots.hasOwnProperty(level)) {
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
            spellSlots[1] = 4;
          } else if (casterLevel === 2) {
            spellSlots[1] = 3;
          } else if (casterLevel === 1) {
            spellSlots[1] = 2;
          }
          if (casterLevel >= 4) {
            spellSlots[2] = 3;
          } else if (casterLevel === 3) {
            spellSlots[2] = 2;
          }
          if (casterLevel >= 6) {
            spellSlots[3] = 3;
          } else if (casterLevel === 5) {
            spellSlots[3] = 2;
          }
          if (casterLevel >= 9) {
            spellSlots[4] = 3;
          } else if (casterLevel === 8) {
            spellSlots[4] = 2;
          } else if (casterLevel === 7) {
            spellSlots[4] = 1;
          }
          if (casterLevel >= 18) {
            spellSlots[5] = 3;
          } else if (casterLevel >= 10) {
            spellSlots[5] = 2;
          } else if (casterLevel === 9) {
            spellSlots[5] = 1;
          }
          if (casterLevel >= 19) {
            spellSlots[6] = 2;
          } else if (casterLevel >= 11) {
            spellSlots[6] = 1;
          }
          if (casterLevel >= 20) {
            spellSlots[7] = 2;
          } else if (casterLevel >= 13) {
            spellSlots[7] = 1;
          }
          if (casterLevel >= 15) {
            spellSlots[8] = 1;
          }
          if (casterLevel >= 17) {
            spellSlots[9] = 1;
          }
        }

        if (casterType === 'half') {
          if (casterLevel >= 5) {
            spellSlots[1] = 4;
          } else if (casterLevel >= 3) {
            spellSlots[1] = 3;
          } else if (casterLevel === 2) {
            spellSlots[1] = 2;
          }
          if (casterLevel >= 7) {
            spellSlots[2] = 3;
          } else if (casterLevel >= 5) {
            spellSlots[2] = 2;
          }
          if (casterLevel >= 11) {
            spellSlots[3] = 3;
          } else if (casterLevel >= 9) {
            spellSlots[3] = 2;
          }
          if (casterLevel >= 17) {
            spellSlots[4] = 3;
          } else if (casterLevel >= 15) {
            spellSlots[4] = 2;
          } else if (casterLevel >= 13) {
            spellSlots[4] = 1;
          }
          if (casterLevel >= 19) {
            spellSlots[5] = 2;
          } else if (casterLevel >= 17) {
            spellSlots[5] = 1;
          }
        }

        if (casterType === 'third') {
          if (casterLevel >= 7) {
            spellSlots[1] = 4;
          } else if (casterLevel >= 4) {
            spellSlots[1] = 3;
          } else if (casterLevel === 3) {
            spellSlots[1] = 2;
          }
          if (casterLevel >= 10) {
            spellSlots[2] = 3;
          } else if (casterLevel >= 7) {
            spellSlots[2] = 2;
          }
          if (casterLevel >= 16) {
            spellSlots[3] = 3;
          } else if (casterLevel >= 13) {
            spellSlots[3] = 2;
          }
          if (casterLevel >= 19) {
            spellSlots[4] = 1;
          }
        }

        for (const level in spellSlots) {
          if (spellSlots.hasOwnProperty(level)) {
            const repeatingString = `spell_slots_l${level}`;
            finalSetAttrs[repeatingString] = 0;
            if (spellSlots[level] !== 0 || exists(v[`${repeatingString}_calc`])) {
              finalSetAttrs[`spell_slots_l${level}_calc`] = spellSlots[level];
            }

            const slots = v[`${repeatingString}`];
            const slotBonus = getIntValue(v[`${repeatingString}_bonus`]);
            const spellSlotMax = spellSlots[level] + slotBonus;

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
  updateSheetList() {
    const repeatingSpellListLevel = 'repeating_spelllistlevel';
    for (let i = 0; i <= 9; i++) {
      emptyRepeatingSection({
        repeatingItems: [`${repeatingSpellListLevel}${i}`],
      });
    }

    const collectionArray = [];
    getSetRepeatingItems('spells.updateSheetList', {
      repeatingItems: ['repeating_spell'],
      collectionArray,
      collectionArrayAddItems: ['name', 'spell_level', 'is_prepared', 'ritual', 'concentration', 'components', 'casting_time'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const spellName = v[`${repeatingString}name`];
          const spellLevel = getIntValue(v[`${repeatingString}spell_level`], 0);

          if (spellName) {
            const newRepeatingString = `${repeatingSpellListLevel}${spellLevel}_${generateRowID()}_`;
            finalSetAttrs[`${newRepeatingString}name`] = spellName;
            finalSetAttrs[`${newRepeatingString}spell_level`] = spellLevel;
            finalSetAttrs[`${newRepeatingString}is_prepared`] = v[`${repeatingString}is_prepared`];
            finalSetAttrs[`${newRepeatingString}ritual`] = v[`${repeatingString}ritual`];
            finalSetAttrs[`${newRepeatingString}concentration`] = v[`${repeatingString}concentration`];
            finalSetAttrs[`${newRepeatingString}components`] = v[`${repeatingString}components`];
            finalSetAttrs[`${newRepeatingString}casting_time`] = v[`${repeatingString}casting_time`];
            finalSetAttrs[`${newRepeatingString}spell_output`] = `@{${repeatingString}spell_output}`;
          }
        }
      },
    });
  }
  updateChatMacro() {
    const spellSlots = {
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

    const collectionArray = ['spells_show_unprepared'];
    for (let i = 0; i <= 9; i++) {
      collectionArray.push(`spells_level_${0}_macro_var`);
    }
    getSetRepeatingItems('spells.updateChatMacro', {
      repeatingItems: ['repeating_spell'],
      collectionArray,
      collectionArrayAddItems: ['name', 'spell_level', 'is_prepared', 'ritual', 'concentration', 'components', 'casting_time'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const spellName = v[`${repeatingString}name`];
          const spellLevel = getIntValue(v[`${repeatingString}spell_level`], 0);

          let classes = [];
          classes.push(`${v[`${repeatingString}spell_level`]}`);
          if (v[`${repeatingString}is_prepared`] === 'on') {
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
          if (spellName) {
            spellSlots[spellLevel].push(`<span class="${classes}">[${spellName}](~repeating_spell_${id}_spell)</span>`);
          }
        }

        for (let i = 0; i <= 9; i++) {
          if (spellSlots[i].length > 0) {
            finalSetAttrs[`spells_level_${i}_macro_var`] = spellSlots[i].join(', ');
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
          const spellLevels = [];
          const warlockSpellsMaxLevel = getIntValue(v.warlock_spells_max_level);

          for (let j = i; j <= 9; j++) {
            if (getIntValue(v[`spell_slots_l${j}`]) || j === warlockSpellsMaxLevel) {
              spellLevels.push(j);
            }
          }

          let higherLevelQuery;

          if (spellLevels.length > 1) {
            higherLevelQuery = `?{Spell Level|${spellLevels.join('|')}}`;
          } else if (spellLevels.length === 1) {
            higherLevelQuery = spellLevels[0];
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
    let spellsWatch = ['warlock_spells_max_level', 'warlock_spell_slots'];
    for (let i = 0; i <= 9; i++) {
      spellsWatch.push(`spells_level_${i}_macro_var`);
      spellsWatch.push(`spell_slots_l${i}`);
      spellsWatch.push(`spell_slots_l${i}_max`);
    }
    spellsWatch = spellsWatch.map((item) => {
      return `change:${item}`;
    }).join(' ');
    on(spellsWatch, () => {
      this.updateShowHide();
    });
  }
  setup() {
    on('change:repeating_spell', (eventInfo) => {
      const repeatingInfo = getRepeatingInfo('repeating_spell', eventInfo);
      if (repeatingInfo && repeatingInfo.field !== 'roll_toggle' && repeatingInfo.field !== 'toggle_details' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'heal_formula' && repeatingInfo.field !== 'higher_level_query' && repeatingInfo.field !== 'parsed') {
        this.update(repeatingInfo.rowId);
      }
    });
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
    this.watchForChanges();
    on('change:repeating_spell', (eventInfo) => {
      const repeatingInfo = getRepeatingInfo('repeating_spell', eventInfo);
      if (repeatingInfo && (repeatingInfo.field === 'name' || repeatingInfo.field === 'spell_level')) {
        this.updateSheetList();
      }
    });
    on('remove:repeating_spell', () => {
      this.updateSheetList();
    });
    on('change:repeating_spell', (eventInfo) => {
      const repeatingInfo = getRepeatingInfo('repeating_spell', eventInfo);
      if (repeatingInfo && (repeatingInfo.field === 'name' || repeatingInfo.field === 'spell_level' || repeatingInfo.field === 'is_prepared')) {
        this.updateChatMacro();
      }
    });
    on('change:spells_show_unprepared remove:repeating_spell', () => {
      this.updateChatMacro();
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
