/* global on:false */

import { ABILITIES, CLASSES } from './constants';
import { setClassFeatures } from './classFeatures';
import { updateSpellSlots } from './spells';
import { updateHD } from './hd';
import { getSetItems, getSetRepeatingItems, isUndefinedOrEmpty, getIntValue, exists, capitalize, getRepeatingInfo } from './utilities';

const updateLevels = (repeatingInfo) => {
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

  getSetRepeatingItems('updateLevels', {
    repeatingItems: ['repeating_class'],
    collectionArray,
    collectionArrayAddItems: ['level', 'name', 'custom_name', 'hd', 'spellcasting', 'custom_class_toggle'],
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
        if (isUndefinedOrEmpty(classHd) || repeatingInfo.field === 'name') {
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
        if (isUndefinedOrEmpty(classSpellcasting)) {
          if (defaultClassDetails.hasOwnProperty(className)) {
            classSpellcasting = defaultClassDetails[className].spellcasting;
            if (classSpellcasting) {
              finalSetAttrs[`${repeatingString}spellcasting`] = classSpellcasting;
            }
          } else {
            finalSetAttrs[`${repeatingString}spellcasting`] = 'none';
          }
        } else if (classSpellcasting === 'warlock') {
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
    },
    setFinalAttrsCallback: () => {
      setClassFeatures();
      updateSpellSlots();
    },
  });
};
const watchForClassLevelChanges = () => {
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
    setClassFeatures();
  });
};
const updateJackOfAllTrades = () => {
  getSetItems('updateJackOfAllTrades', {
    collectionArray: ['pb', 'jack_of_all_trades'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.jack_of_all_trades = Math.floor(getIntValue(v.pb) / 2);
    },
  });
};
const updateRemarkableAthlete = () => {
  getSetItems('updateRemarkableAthlete', {
    collectionArray: ['pb', 'remarkable_athlete'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.remarkable_athlete = Math.ceil(getIntValue(v.pb) / 2);
    },
  });
};
const updateD20Mod = () => {
  getSetItems('updateD20Mod', {
    collectionArray: ['halfling_luck'],
    callback: (v, finalSetAttrs) => {
      if (v.halfling_luck === 'on') {
        finalSetAttrs.d20_mod = 'ro<1';
      } else {
        finalSetAttrs.d20_mod = '';
      }
    },
  });
};
const updateAlignment = () => {
  getSetItems('updateAlignment', {
    collectionArray: ['alignment', 'is_npc'],
    callback: (v, finalSetAttrs) => {
      if (v.alignment && v.is_npc === '1') {
        finalSetAttrs.alignment = v.alignment.toLowerCase();
      }
    },
  });
};

const characterSetup = () => {
  on('change:repeating_class', (eventInfo) => {
    const repeatingInfo = getRepeatingInfo('repeating_class', eventInfo);
    if (repeatingInfo) {
      updateLevels(repeatingInfo);
    }
  });
  on('remove:repeating_class', () => {
    updateLevels();
  });
  on('change:halfling_luck', () => {
    updateD20Mod();
  });
  on('change:alignment', () => {
    updateAlignment();
  });
  on('change:remarkable_athlete_toggle', () => {
    updateRemarkableAthlete();
  });
  on('change:jack_of_all_trades_toggle', () => {
    updateJackOfAllTrades();
  });
  on('change:pb', () => {
    updateJackOfAllTrades();
    updateRemarkableAthlete();
  });
  watchForClassLevelChanges();
};

export { characterSetup, updateLevels, updateAlignment, updateD20Mod };
