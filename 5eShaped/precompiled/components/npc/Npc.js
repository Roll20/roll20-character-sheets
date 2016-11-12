/* global on:false, generateRowID:false */

import { ABILITIES } from './../../scripts/constants';
import { getSetItems, getIntValue, isUndefinedOrEmpty, addArithmeticOperator, getAbilityMod, numberWithCommas, exists, updateHD } from './../../scripts/utilities';

export class Npc {
  updateType() {
    getSetItems('npc.updateType', {
      collectionArray: ['type'],
      callback: (v, finalSetAttrs) => {
        if (v.type) {
          finalSetAttrs.type = v.type.toLowerCase();
        }
      },
    });
  }
  updateSize() {
    getSetItems('npc.updateSize', {
      collectionArray: ['size'],
      callback: (v, finalSetAttrs) => {
        const creatureSize = v.size || 'Large';
        const sizeToHdSize = {
          Tiny: 4,
          Small: 6,
          Medium: 8,
          Large: 10,
          Huge: 12,
          Gargantuan: 20,
        };
        finalSetAttrs.hit_die = `d${sizeToHdSize[creatureSize]}`;
      },
    });
  }
  updateAC() {
    getSetItems('npc.updateAC', {
      collectionArray: ['ac_srd', 'ac', 'ac_note', 'dexterity_mod'],
      callback: (v, finalSetAttrs) => {
        if (exists(v.ac_srd)) {
          const match = v.ac_srd.match(/(\d+)\s?(.*)/);
          if (match && match[1]) {
            finalSetAttrs.AC = match[1];
          }
          if (match && match[2]) {
            finalSetAttrs.ac_note = match[2].replace(/\(|\)/g, '');
          }
        }
      },
    });
  }
  switchTo() {
    getSetItems('npc.switchTo', {
      collectionArray: ['is_npc', 'size'],
      callback: (v, finalSetAttrs) => {
        const isNPC = getIntValue(v.is_npc) === 1;

        if (isNPC && isUndefinedOrEmpty(v.size)) {
          finalSetAttrs.size = 'Large';
        }

        if (isNPC) {
          finalSetAttrs.hit_dice_output_option = '/w GM';
        } else {
          finalSetAttrs.hit_dice_output_option = '';
        }
      },
    });
  }
  updateChallenge() {
    const xpPerChallenge = {
      0: 0,
      '1/8': 25,
      '1/4': 50,
      '1/2': 100,
      1: 200,
      2: 450,
      3: 700,
      4: 1100,
      5: 1800,
      6: 2300,
      7: 2900,
      8: 3900,
      9: 5000,
      10: 5900,
      11: 7200,
      12: 8400,
      13: 10000,
      14: 11500,
      15: 13000,
      16: 15000,
      17: 18000,
      18: 20000,
      19: 22000,
      20: 25000,
      21: 33000,
      22: 41000,
      23: 50000,
      24: 62000,
      25: 75000,
      26: 90000,
      27: 105000,
      28: 120000,
      29: 135000,
      30: 155000,
    };

    getSetItems('npc.updateChallenge', {
      collectionArray: ['challenge', 'xp'],
      callback: (v, finalSetAttrs) => {
        const challenge = v.challenge;

        finalSetAttrs.xp = xpPerChallenge[challenge];
        finalSetAttrs.xp_readable = numberWithCommas(finalSetAttrs.xp);

        finalSetAttrs.level = challenge;
        if (finalSetAttrs.level < 1) {
          finalSetAttrs.level = 1;
        }
      },
    });
  }
  updateHPFromSRD() {
    getSetItems('npc.updateHPFromSRD', {
      collectionArray: ['hp_srd', 'constitution', 'constitution_mod', 'constitution_bonus', 'global_ability_bonus'],
      callback: (v, finalSetAttrs) => {
        if (exists(v.hp_srd)) {
          const match = v.hp_srd.match(/\((\d+)d(\d+)(?:\s?(\+|\-)\s?(\d+))?\)/i);
          if (!match || !match[1] || !match[2]) {
            console.warn('Character doesn\'t have valid HP/HD format');
          } else {
            const hdNum = getIntValue(match[1]);

            let conMod = getIntValue(v.constitution_mod);
            if (!conMod) {
              const conScore = getIntValue(v.constitution);
              const conBonus = getIntValue(v.constitution_bonus);
              const globalAbilityBonus = getIntValue(v.global_ability_bonus);

              conMod = getAbilityMod((conScore + conBonus + globalAbilityBonus));
            }

            finalSetAttrs.hit_dice = hdNum;
            finalSetAttrs.hit_die = `d${getIntValue(match[2])}`;

            const hpExpectedBonus = hdNum * conMod;
            const hpBonusSign = match[3];
            const hpBonus = getIntValue(match[4]);
            if (hpBonus !== hpExpectedBonus) {
              if (hpBonusSign === '-') {
                finalSetAttrs.hp_extra = hpBonus + hpExpectedBonus;
              } else {
                finalSetAttrs.hp_extra = hpBonus - hpExpectedBonus;
              }
            }
          }
        }
      },
    });
  }
  updateHP() {
    getSetItems('npc.updateHP', {
      collectionArray: ['HP', 'HP_max', 'hp_formula', 'hit_dice', 'hit_die', 'hp_extra', 'constitution_mod'],
      callback: (v, finalSetAttrs) => {
        const hdNum = getIntValue(v.hit_dice);
        const hdSize = getIntValue(v.hit_die.replace('d', ''));
        const hdAverage = (hdSize / 2) + 0.5;
        let hpFormula = `${hdNum}d${hdSize}`;
        const conMod = getIntValue(v.constitution_mod);
        let totalHP = Math.floor(hdNum * hdAverage);
        let amount;

        if (conMod !== 0) {
          const bonusHP = hdNum * conMod;
          totalHP += bonusHP;
          hpFormula += addArithmeticOperator(hpFormula, bonusHP);
        }

        if (exists(v.hp_extra)) {
          const regex = (/(?:(\+|\-)\s?)?(\d+)(?:d(\d+))?/gi);
          let splitFormula;

          while ((splitFormula = regex.exec(v.hp_extra)) !== null) {
            if (!splitFormula || !splitFormula[2]) {
              console.warn('Character doesn\'t have valid hp formula');
            } else {
              amount = 0;

              if (!splitFormula[3]) {
                amount = getIntValue(splitFormula[2]);
              } else {
                const extraHdNum = getIntValue(splitFormula[2]);
                const extraHdSize = getIntValue(splitFormula[3]);
                const extraHdAverage = (extraHdSize / 2) + 0.5;
                amount = Math.floor(extraHdNum * extraHdAverage);
              }

              if (!splitFormula[1] || splitFormula[1] === '+') {
                totalHP += amount;
                hpFormula += ` + ${amount}`;
              } else if (splitFormula[1] === '-') {
                totalHP -= amount;
                hpFormula += ` - ${amount}`;
              }
            }
            v.hp_extra.toString().replace(splitFormula[0], '');
          }
        }

        if (totalHP) {
          finalSetAttrs.HP = totalHP;
          finalSetAttrs.HP_max = totalHP;
          finalSetAttrs.hp_formula = hpFormula;
        }
      },
    });
  }
  updateHD() {
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
    const collectionArray = ['hit_dice', 'hit_die'];
    for (const key in hd) {
      if (hd.hasOwnProperty(key)) {
        collectionArray.push(`hd_${key}`);
        collectionArray.push(`hd_${key}_max`);
        collectionArray.push(`hd_${key}_query`);
        collectionArray.push(`hd_${key}_toggle`);
      }
    }
    getSetItems('npc.updateHD', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        const hdNum = getIntValue(v.hit_dice);
        const hdSize = v.hit_die;

        if (hdNum && hdSize) {
          hd[hdSize] = hdNum;

          updateHD(v, finalSetAttrs, hd);
        }
      },
    });
  }
  parseSRDContentSection(content, finalSetAttrs, title, name) {
    const re = /@(.*)@:\s([^@]+)/gi;
    let match;
    let section;

    if (content.indexOf(title) !== -1) {
      const contentSplit = content.split(`${title}\n`);
      section = contentSplit[1];
      content = contentSplit[0];
    }
    if (exists(section)) {
      if (name === 'legendaryaction') {
        const legendaryActionsMatch = section.match(/Can take (\d+) Legendary Actions/i);
        if (legendaryActionsMatch && legendaryActionsMatch[1]) {
          finalSetAttrs.legendary_action_amount = legendaryActionsMatch[1];
        }
      }

      while ((match = re.exec(section.replace(/\*\*/g, '@'))) !== null) {
        if (match && match[1] && match[2]) {
          const repeatingString = `repeating_${name}_${generateRowID()}_`;
          finalSetAttrs[`${repeatingString}name`] = match[1];
          const text = match[2].trim();
          if (name === 'trait') {
            finalSetAttrs[`${repeatingString}display_text`] = text;
          }
          finalSetAttrs[`${repeatingString}freetext`] = text;
        } else {
          console.warn(`Character doesn\'t have a valid ${name} format`);
        }
      }
    }
    return content;
  }
  setDefaultAbility(v, finalSetAttrs) {
    const abilityScores = [getIntValue(v.intelligence), getIntValue(v.wisdom), getIntValue(v.charisma)];
    const highestAbilityScore = Math.max.apply(Math, abilityScores);
    let highestAbilityName = 'intelligence';

    if (highestAbilityScore === abilityScores[1]) {
      highestAbilityName = 'wisdom';
    } else if (highestAbilityScore === abilityScores[2]) {
      highestAbilityName = 'charisma';
    }

    finalSetAttrs.default_ability = highestAbilityName;
  }
  updateContent() {
    const collectionArray = ['content_srd'];
    for (const ability of ABILITIES) {
      collectionArray.push(ability);
    }

    getSetItems('npc.updateContent', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        let content = v.content_srd;
        let regionalEffects;
        let lairActions;
        let repeatingString;

        this.setDefaultAbility(v, finalSetAttrs);

        if (exists(content)) {
          if (content.indexOf('Regional Effects') !== -1) {
            const regionalEffectsSplit = content.split(/Regional Effects\n/);
            regionalEffects = regionalEffectsSplit[1];
            content = regionalEffectsSplit[0];
          }
          if (exists(regionalEffects)) {
            const regionalEffectsList = regionalEffects.split(/\*\*/);
            regionalEffectsList.slice(1, -1).forEach((regionalEffect) => {
              repeatingString = `repeating_regionaleffect_${generateRowID()}_`;
              finalSetAttrs[`${repeatingString}freetext`] = regionalEffect.trim();
            });
          }
          if (content.indexOf('Lair Actions') !== -1) {
            const lairActionsSplit = content.split(/Lair Actions\n/);
            lairActions = lairActionsSplit[1];
            content = lairActionsSplit[0];
          }
          if (exists(lairActions)) {
            lairActions.split(/\*\*/).slice(1).forEach((lairAction) => {
              repeatingString = `repeating_lairaction_${generateRowID()}_`;
              finalSetAttrs[`${repeatingString}freetext`] = lairAction.trim();
            });
          }

          content = this.parseSRDContentSection(content, finalSetAttrs, 'Legendary Actions', 'legendaryaction');
          content = this.parseSRDContentSection(content, finalSetAttrs, 'Reactions', 'reaction');
          content = this.parseSRDContentSection(content, finalSetAttrs, 'Actions', 'action');
          this.parseSRDContentSection(content, finalSetAttrs, 'Traits', 'trait');
        }
      },
    });
  }
  updateSenses() {
    getSetItems('npc.updateSenses', {
      collectionArray: ['senses'],
      callback: (v, finalSetAttrs) => {
        if (v.senses) {
          finalSetAttrs.senses_exist = 1;
          finalSetAttrs.senses = v.senses.toLowerCase();
        } else {
          finalSetAttrs.senses_exist = 0;
        }
      },
    });
  }
  updateLanguages() {
    getSetItems('npc.updateLanguages', {
      collectionArray: ['languages', 'languages_exist', 'languages_chat_var'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.languages_exist = 0;
        finalSetAttrs.languages_chat_var = '';

        if (v.languages) {
          finalSetAttrs.languages_exist = 1;
          finalSetAttrs.languages_chat_var = '{{Languages=@{languages}}}';
        }
      },
    });
  }
  updateSpeed() {
    getSetItems('npc.updateSpeed', {
      collectionArray: ['npc_speed'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.npc_speed = v.npc_speed.toLowerCase();
        const match = finalSetAttrs.npc_speed.match(/^\s*(\d+)\s*ft/);
        if (match && match[1]) {
          finalSetAttrs.speed = match[1];
        }
      },
    });
  }
  updateACNote() {
    getSetItems('npc.updateACNote', {
      collectionArray: ['ac_note'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.ac_note = v.ac_note.toLowerCase();
      },
    });
  }
  npcDroppedOnTabletop() {
    getSetItems('npc.npcDroppedOnTabletop', {
      collectionArray: ['is_npc', 'edit_mode'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.is_npc = 1;
        finalSetAttrs.edit_mode = 0;
      },
    });
  }
  setup() {
    on('change:type', () => {
      this.updateType();
    });
    on('change:size', () => {
      this.updateSize();
    });
    on('change:ac_srd', () => {
      this.updateAC();
    });
    on('change:is_npc', () => {
      this.switchTo();
    });
    on('change:challenge', () => {
      this.updateChallenge();
    });
    on('change:hp_srd', () => {
      this.updateHPFromSRD();
    });
    on('change:hit_dice change:hit_die change:hp_extra change:constitution_mod', () => {
      this.updateHP();
    });
    on('change:hit_dice change:hit_die', () => {
      this.updateHD();
    });
    on('change:content_srd', () => {
      this.updateContent();
    });
    on('change:senses', () => {
      this.updateSenses();
    });
    on('change:languages', () => {
      this.updateLanguages();
    });
    on('change:npc_speed', () => {
      this.updateSpeed();
    });
    on('change:ac_note', () => {
      this.updateACNote();
    });
    on('sheet:compendium-drop', () => {
      this.npcDroppedOnTabletop();
    });
  }
}
