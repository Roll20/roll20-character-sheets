/* global on:false */

import { ABILITIES, CLASSES } from './constants';
import { ClassFeatures } from './ClassFeatures';
const classFeatures = new ClassFeatures();
import { Spells } from './Spells';
const spells = new Spells();
import { getSetItems, getSetRepeatingItems, isUndefinedOrEmpty, getIntValue, exists, capitalize, getRepeatingInfo, updateHD } from './utilities';

export class Character {
  updateLevels(repeatingInfo) {
    const defaultClassDetails = {
      barbarian: {
        hd: 'd12',
      },
      bard: {
        hd: 'd8',
        spellcasting: 'full',
      },
      cleric: {
        hd: 'd8',
        spellcasting: 'full',
      },
      druid: {
        hd: 'd8',
        spellcasting: 'full',
      },
      fighter: {
        hd: 'd10',
      },
      monk: {
        hd: 'd8',
      },
      paladin: {
        hd: 'd10',
        spellcasting: 'half',
      },
      ranger: {
        hd: 'd10',
        spellcasting: 'half',
      },
      rogue: {
        hd: 'd8',
      },
      sorcerer: {
        hd: 'd6',
        spellcasting: 'full',
      },
      warlock: {
        hd: 'd8',
        spellcasting: 'warlock',
      },
      wizard: {
        hd: 'd6',
        spellcasting: 'full',
      },
    };
    const hd = {
      d20: 0,
      d12: 0,
      d10: 0,
      d8: 0,
      d6: 0,
      d4: 0,
      d2: 0,
      d0: 0,
    };
    const spellcasting = {
      full: 0,
      half: 0,
      third: 0,
      warlock: 0,
    };
    let totalLevel = 0;
    const classLevels = {};
    let classesWithSpellcasting = 0;
    const xpTable = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000, 385000, 405000, 435000, 465000, 495000, 525000, 555000, 585000, 605000, 635000, 665000];

    const collectionArray = ['is_npc', 'caster_level', 'caster_type', 'class_and_level', 'level', 'xp_next_level'];
    for (const className of CLASSES) {
      collectionArray.push(`${className}_level`);
      collectionArray.push(`has_${className}_levels`);
    }
    for (const key in hd) {
      if (hd.hasOwnProperty(key)) {
        collectionArray.push(`hd_${key}_max`);
        collectionArray.push(`hd_${key}_query`);
        collectionArray.push(`hd_${key}_toggle`);
      }
    }

    getSetRepeatingItems('character.updateLevels', {
      repeatingItems: ['repeating_class'],
      collectionArray,
      collectionArrayAddItems: ['level', 'name', 'custom_name', 'hd', 'spellcasting', 'custom_class_toggle', 'has_warlock_slots', 'warlock_spell_slots_calc', 'warlock_spells_max_level'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const className of CLASSES) {
          finalSetAttrs[`${className}_level`] = 0;
        }
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;

          let className = v[`${repeatingString}name`];
          let classLevel = v[`${repeatingString}level`];

          if (isUndefinedOrEmpty(className) && isUndefinedOrEmpty(classLevel)) {
            continue;
          }

          if (isUndefinedOrEmpty(className)) {
            className = 'barbarian';
          }
          if (className === 'custom') {
            finalSetAttrs[`${repeatingString}custom_class_toggle`] = 'on';
            const customName = v[`${repeatingString}custom_name`];
            if (exists(customName)) {
              className = customName;
            } else {
              className = 'custom';
            }
          } else if (v[`${repeatingString}custom_class_toggle`]) {
            finalSetAttrs[`${repeatingString}custom_class_toggle`] = 0;
          }

          if (isUndefinedOrEmpty(classLevel)) {
            classLevel = 1;
            finalSetAttrs[`${repeatingString}level`] = classLevel;
            finalSetAttrs[`${className}_level`] = classLevel;
          } else {
            classLevel = getIntValue(classLevel);
            totalLevel += classLevel;
            if (classLevels[className]) {
              classLevels[className] += classLevel;
            } else {
              classLevels[className] = classLevel;
            }
          }

          let classHd = v[`${repeatingString}hd`];
          if (isUndefinedOrEmpty(classHd) || (repeatingInfo && repeatingInfo.field === 'name')) {
            if (defaultClassDetails.hasOwnProperty(className)) {
              classHd = defaultClassDetails[className].hd;
            } else {
              classHd = 'd12';
            }
            finalSetAttrs[`${repeatingString}hd`] = classHd;
          }
          if (classHd && classLevel) {
            hd[classHd] += classLevel;
          }

          let classSpellcasting = v[`${repeatingString}spellcasting`];
          if (defaultClassDetails.hasOwnProperty(className)) {
            classSpellcasting = defaultClassDetails[className].spellcasting;
            if (classSpellcasting) {
              finalSetAttrs[`${repeatingString}spellcasting`] = classSpellcasting;
            }
          } else {
            finalSetAttrs[`${repeatingString}spellcasting`] = 'none';
          }
          if (classSpellcasting === 'warlock') {
            spellcasting[classSpellcasting] += classLevel;
          } else {
            classesWithSpellcasting += 1;
            spellcasting[classSpellcasting] += classLevel;
          }
        }

        finalSetAttrs.number_of_classes = 0;
        finalSetAttrs.class_and_level = '';
        for (const prop in classLevels) {
          if (classLevels.hasOwnProperty(prop)) {
            finalSetAttrs.number_of_classes = finalSetAttrs.number_of_classes + 1;
            if (classLevels.hasOwnProperty(prop)) {
              finalSetAttrs[`${prop}_level`] = classLevels[prop];
              if (finalSetAttrs.class_and_level !== '') {
                finalSetAttrs.class_and_level += ', ';
              }
              finalSetAttrs.class_and_level += `${capitalize(prop)} ${classLevels[prop]}`;
            }
          }
        }

        finalSetAttrs.level = totalLevel;

        let xpForNextLevel = 0;
        if (!totalLevel) {
          totalLevel = 0;
        }
        if (totalLevel > 30) {
          xpForNextLevel = xpTable[30];
        } else {
          xpForNextLevel = xpTable[totalLevel];
        }
        finalSetAttrs.xp_next_level = xpForNextLevel;

        for (const className of CLASSES) {
          if (finalSetAttrs[`${className}_level`] > 0) {
            finalSetAttrs[`has_${className}_levels`] = 1;
          } else if (!isUndefinedOrEmpty(v[`has_${className}_levels`])) {
            finalSetAttrs[`has_${className}_levels`] = 0;
          }
        }

        updateHD(v, finalSetAttrs, hd);

        let casterLevel = 0;
        if (!v.is_npc || v.is_npc === '0' || v.is_npc === 0) {
          if (classesWithSpellcasting > 1) {
            casterLevel += spellcasting.full;
            casterLevel += Math.floor(spellcasting.half / 2);
            casterLevel += Math.floor(spellcasting.third / 3);
          } else {
            casterLevel = spellcasting.full + spellcasting.half + spellcasting.third;
          }
          finalSetAttrs.caster_level = casterLevel;
        }

        if (classesWithSpellcasting > 1 || spellcasting.full) {
          finalSetAttrs.caster_type = 'full';
        } else if (spellcasting.half) {
          finalSetAttrs.caster_type = 'half';
        } else if (spellcasting.third) {
          finalSetAttrs.caster_type = 'third';
        }

        if (spellcasting.warlock) {
          finalSetAttrs.has_warlock_slots = 1;

          let warlockSpellSlots;
          if (spellcasting.warlock >= 17) {
            warlockSpellSlots = 4;
          } else if (spellcasting.warlock >= 11) {
            warlockSpellSlots = 3;
          } else if (spellcasting.warlock >= 2) {
            warlockSpellSlots = 2;
          } else {
            warlockSpellSlots = 1;
          }
          finalSetAttrs.warlock_spell_slots_calc = warlockSpellSlots;

          let warlockSpellsMaxLevel;
          if (spellcasting.warlock >= 9) {
            warlockSpellsMaxLevel = 5;
          } else if (spellcasting.warlock >= 7) {
            warlockSpellsMaxLevel = 4;
          } else if (spellcasting.warlock >= 5) {
            warlockSpellsMaxLevel = 3;
          } else if (spellcasting.warlock >= 3) {
            warlockSpellsMaxLevel = 2;
          } else {
            warlockSpellsMaxLevel = 1;
          }
          finalSetAttrs.warlock_spells_max_level = warlockSpellsMaxLevel;
        } else {
          finalSetAttrs.has_warlock_slots = 0;
          finalSetAttrs.warlock_spell_slots_calc = 0;
          finalSetAttrs.warlock_spells_max_level = 1;
        }
      },
      setFinalAttrsCallback: () => {
        classFeatures.set();
        spells.updateSlots();
      },
    });
  }
  watchForClassLevelChanges() {
    const classFeatureWatch = [];
    for (const ability of ABILITIES) {
      classFeatureWatch.push(`change:${ability}_mod`);
    }
    classFeatureWatch.push('change:careful_spell_toggle');
    classFeatureWatch.push('change:distant_spell_toggle');
    classFeatureWatch.push('change:empowered_spell_toggle');
    classFeatureWatch.push('change:extended_spell_toggle');
    classFeatureWatch.push('change:heightened_spell_toggle');
    classFeatureWatch.push('change:quickened_spell_toggle');
    classFeatureWatch.push('change:subtle_spell_toggle');
    classFeatureWatch.push('change:twinned_spell_toggle');

    on(classFeatureWatch.join(' '), () => {
      classFeatures.set();
    });
  }
  updateJackOfAllTrades() {
    getSetItems('character.updateJackOfAllTrades', {
      collectionArray: ['pb', 'jack_of_all_trades'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.jack_of_all_trades = Math.floor(getIntValue(v.pb) / 2);
      },
    });
  }
  updateRemarkableAthlete() {
    getSetItems('character.updateRemarkableAthlete', {
      collectionArray: ['pb', 'remarkable_athlete'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.remarkable_athlete = Math.ceil(getIntValue(v.pb) / 2);
      },
    });
  }
  updateD20Mod() {
    getSetItems('character.updateD20Mod', {
      collectionArray: ['halfling_luck'],
      callback: (v, finalSetAttrs) => {
        if (v.halfling_luck === 'on') {
          finalSetAttrs.d20_mod = 'ro<1';
        } else {
          finalSetAttrs.d20_mod = '';
        }
      },
    });
  }
  updateAlignment() {
    getSetItems('character.updateAlignment', {
      collectionArray: ['alignment', 'is_npc'],
      callback: (v, finalSetAttrs) => {
        if (v.alignment && getIntValue(v.is_npc) === 1) {
          finalSetAttrs.alignment = v.alignment.toLowerCase();
        }
      },
    });
  }
  setup() {
    on('change:repeating_class', (eventInfo) => {
      const repeatingInfo = getRepeatingInfo('repeating_class', eventInfo);
      if (repeatingInfo) {
        this.updateLevels(repeatingInfo);
      }
    });
    on('remove:repeating_class', () => {
      this.updateLevels();
    });
    on('change:halfling_luck', () => {
      this.updateD20Mod();
    });
    on('change:alignment', () => {
      this.updateAlignment();
    });
    on('change:pb change:remarkable_athlete_toggle', () => {
      this.updateRemarkableAthlete();
    });
    on('change:pb change:jack_of_all_trades_toggle', () => {
      this.updateJackOfAllTrades();
    });
    this.watchForClassLevelChanges();
  }
}
