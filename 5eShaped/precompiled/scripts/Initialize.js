/* global on:false, generateRowID:false, getTranslationByKey:false */

import { Abilities } from './Abilities';
const abilities = new Abilities();
import { AbilityChecks } from './AbilityChecks';
const abilityChecks = new AbilityChecks();
import { Character } from './Character';
const character = new Character();
import { ABILITIES, SKILLS } from './constants';
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

  sheetOpened() {
    const collectionArray = ['version', 'npc', 'base_level', 'convertedFromOGL', 'import_data', 'roll_setting'];
    for (const ability of ABILITIES) {
      collectionArray.push(ability);
    }
    getSetItems('initialize.sheetOpened', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        const convertOGL = (v.npc || v.base_level) && !v.convertedFromOGL;
        if (!v.version || convertOGL) {
          if (!v.import_data && !convertOGL) {
            finalSetAttrs.edit_mode = 'on';
          }
          if (isUndefinedOrEmpty(v.roll_setting)) { // API Script import sets this when making characters
            finalSetAttrs.roll_setting = '{{ignore=[[0';
          }
          const setAbilities = {};
          for (const ability of ABILITIES) {
            if (isUndefinedOrEmpty(v[ability])) {
              setAbilities[ability] = 10;
            }
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
          });
          if (convertOGL) {
            proficiencyBonus.update();
            this.generateSkills();
            savingThrows.update();
            abilities.updateModifiers();
            convert.convertFromOGL();
          }
        } else {
          upgrade.upgrade();
        }

        if (isUndefinedOrEmpty(v.version) || !v.version || v.version !== currentVersion) {
          finalSetAttrs.version = currentVersion;
        }
        if (isUndefinedOrEmpty(v.convertedFromOGL) || !v.convertedFromOGL) {
          finalSetAttrs.convertedFromOGL = true;
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
