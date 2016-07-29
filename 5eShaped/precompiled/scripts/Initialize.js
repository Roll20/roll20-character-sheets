/* global on:false, generateRowID:false, getTranslationByKey:false */

import { Abilities } from './Abilities';
const abilities = new Abilities();
import { AbilityChecks } from './AbilityChecks';
const abilityChecks = new AbilityChecks();
import { Character } from './Character';
const character = new Character();
import { SKILLS } from './constants';
import { Convert } from './Convert';
const convert = new Convert();
import { Equipment } from './Equipment';
const equipment = new Equipment();
import { ProficiencyBonus } from './ProficiencyBonus';
const proficiencyBonus = new ProficiencyBonus();
import { SavingThrows } from './SavingThrows';
const savingThrows = new SavingThrows();
import { Spells } from './Spells';
const spells = new Spells();
import { Upgrade } from './Upgrade';
const upgrade = new Upgrade();
import { getSetItems, getSetRepeatingItems, isUndefinedOrEmpty, setFinalAttrs, getSkillIdByStorageName } from './utilities';
import { currentVersion } from './version';


export class Initialize {
  generateSkills() {
    getSetRepeatingItems('initialize.generateSkills', {
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
            abilityChecks.updateSkill(skillId);
          }
        }
      },
      setFinalAttrsCallback: () => {
        abilityChecks.updateMacro();
      },
    });
  }
  checkVersionFormat(version, finalSetAttrs) {
    const versionRegex = /\d+\.\d+\.\d+/gi;
    const versionIsProperFormat = versionRegex.exec(version);

    if (version && !versionIsProperFormat) {
      finalSetAttrs.version = version = currentVersion;
    }
    return version;
  }
  sheetOpened() {
    console.log('initialize.sheetOpened');
    getSetItems('initialize.sheetOpened', {
      collectionArray: ['version', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'import_data', 'roll_setting'],
      callback: (v, finalSetAttrs) => {
        const version = this.checkVersionFormat(v.version, finalSetAttrs);

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
            proficiencyBonus.update();
            this.generateSkills();
            savingThrows.update();
            character.updateLevels();
            abilityChecks.updateInitiative();
            equipment.updateArmor();
            spells.updateShowHide();
            abilities.updateModifiers();
            convert.convertFromOGL();
          });
        } else {
          upgrade.upgrade();
        }

        if (isUndefinedOrEmpty(version) || !version || version !== currentVersion) {
          finalSetAttrs.version = currentVersion;
        }
      },
    });
  }
  setup() {
    on('change:generate_skills', () => {
      this.generateSkills();
    });
    on('sheet:opened', () => {
      this.sheetOpened();
    });
  }
}
