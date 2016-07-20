/* global on:false, generateRowID:false, getTranslationByKey:false */

import { updateAbilityModifiers } from './abilities';
import { updateSkill, updateAbilityChecksMacro } from './abilityChecks';
import { updateLevels } from './character';
import { updateArmor } from './equipment';
import { updateInitiative } from './initiative';
import { updatePb } from './proficiencyBonus';
import { updateSavingThrows } from './savingThrows';
import { updateSpellShowHide } from './spells';
import { getSetItems, getSetRepeatingItems, getIntValue, isUndefinedOrEmpty, setFinalAttrs, getSkillIdByStorageName } from './utilities';
import { currentVersion } from './version';

const setDefaultAbility = (v, finalSetAttrs) => {
  const abilityScores = [getIntValue(v.intelligence), getIntValue(v.wisdom), getIntValue(v.charisma)];
  const highestAbilityScore = Math.max.apply(Math, abilityScores);
  let highestAbilityName = 'intelligence';

  if (highestAbilityScore === abilityScores[1]) {
    highestAbilityName = 'wisdom';
  } else if (highestAbilityScore === abilityScores[2]) {
    highestAbilityName = 'charisma';
  }

  finalSetAttrs.default_ability = highestAbilityName;
};
const generateSkills = () => {
  getSetRepeatingItems('generateSkills', {
    repeatingItems: ['repeating_skill'],
    collectionArrayAddItems: ['storage_name', 'name', 'ability'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const prop in SKILLS) {
        if (SKILLS.hasOwnProperty(prop)) {
          let skillId = getSkillIdByStorageName(v, repeatingItem, ids, prop);

          if (!skillId) {
            skillId = generateRowID();
          }
          const repeatingString = `${repeatingItem}_${skillId}_`;

          finalSetAttrs[`${repeatingString}storage_name`] = prop;
          finalSetAttrs[`${repeatingString}name`] = getTranslationByKey(prop);
          finalSetAttrs[`${repeatingString}ability`] = SKILLS[prop];
          updateSkill(skillId);
        }
      }
    },
    setFinalAttrsCallback: () => {
      updateAbilityChecksMacro();
    },
  });
};
const checkVersionFormat = (version, finalSetAttrs) => {
  const versionRegex = /\d+\.\d+\.\d+/gi;
  const versionIsProperFormat = versionRegex.exec(version);

  if (version && !versionIsProperFormat) {
    finalSetAttrs.version = version = currentVersion;
  }
  return version;
};
const sheetOpened = () => {
  getSetItems('sheetOpened', {
    collectionArray: ['version', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'import_data', 'roll_setting'],
    callback: (v, finalSetAttrs) => {
      const version = checkVersionFormat(v.version, finalSetAttrs);

      if (!version) {
        if (!v.import_data) {
          finalSetAttrs.edit_mode = 'on';
        }
        if (isUndefinedOrEmpty(v.roll_setting)) { // API Script import sets this when making characters
          finalSetAttrs.roll_setting = '{{ignore=[[0';
        }
        const setAbilities = {};
        if (isUndefinedOrEmpty(v.strength)) {
          setAbilities.strength = 10;
        }
        if (isUndefinedOrEmpty(v.dexterity)) {
          setAbilities.dexterity = 10;
        }
        if (isUndefinedOrEmpty(v.constitution)) {
          setAbilities.constitution = 10;
        }
        if (isUndefinedOrEmpty(v.intelligence)) {
          setAbilities.intelligence = 10;
        }
        if (isUndefinedOrEmpty(v.wisdom)) {
          setAbilities.wisdom = 10;
        }
        if (isUndefinedOrEmpty(v.charisma)) {
          setAbilities.charisma = 10;
        }
        setFinalAttrs(v, setAbilities, 'initialize', () => {
          updatePb();
          generateSkills();
          updateSavingThrows();
          updateLevels();
          updateInitiative();
          updateArmor();
          updateSpellShowHide();
          updateAbilityModifiers();
        });
      } else {
        upgrade();
      }

      if (isUndefinedOrEmpty(version) || !version || version !== currentVersion) {
        finalSetAttrs.version = currentVersion;
      }
    },
  });
};


const initializeSetup = () => {
  on('change:generate_skills', () => {
    generateSkills();
  });
  on('sheet:opened', () => {
    sheetOpened();
  });
};

export { initializeSetup, sheetOpened };