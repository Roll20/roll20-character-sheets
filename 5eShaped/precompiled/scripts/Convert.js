/* global on:false, generateRowID:false */

import { ABILITIES, SKILLS, TOGGLE_VARS } from './constants';
import { Traits } from './../components/traits/Traits';
const traits = new Traits();
import { getSetItems, getSetRepeatingItems, capitalize, getAbilityShortName, getSkillIdByStorageName, getIntValue, ordinalSpellLevel } from './utilities';

export class Convert {
  parseSpellcastingAbility(v, finalSetAttrs) {
    if (v.spellcasting_ability) {
      finalSetAttrs.default_ability = v.spellcasting_ability
        .replace('0*', '')
        .replace('@', '')
        .replace('{', '')
        .replace('_mod', '')
        .replace('}', '')
        .replace('+', '')
        .toUpperCase();
    }
  }
  parseSizeTypeAlignment(v, finalSetAttrs) {
    const type = v.npc_type;
    const match = type.match(/(.*?) (.*?), (.*)/i);
    if (!type || !type[1] || !type[2] || !type[3]) {
      console.error('Character doesn\'t have valid type/size/alignment format');
    }
    finalSetAttrs.size = capitalize(match[1]);
    finalSetAttrs.type = match[2];
    finalSetAttrs.alignment = match[3];
  }
  parseHD(v, finalSetAttrs) {
    finalSetAttrs.hp_srd = `${v.hp_max} (${v.npc_hpformula})`;
  }
  parseSavingThrows(v, finalSetAttrs) {
    const savingThrows = [];
    for (const ability of ABILITIES) {
      const saveValue = v[`npc_${getAbilityShortName(ability)}_save`];
      if (saveValue) {
        savingThrows.push(`${getAbilityShortName(ability, true)} +${saveValue}`);
      }
    }
    if (savingThrows.length > 0) {
      finalSetAttrs.saving_throws_srd = savingThrows.join(', ');
    }
  }
  parseNPCSkills(v, finalSetAttrs) {
    const skills = [];
    for (const skill in SKILLS) {
      if (SKILLS.hasOwnProperty(skill)) {
        const skillValue = v[`npc_${skill.toLowerCase()}`];
        if (skillValue) {
          skills.push(`${capitalize(skill.toLowerCase())} +${skillValue}`);
        }
      }
    }
    if (skills.length > 1) {
      finalSetAttrs.skills_srd = skills.join(', ');
    }
  }
  convertJackOfAllTrades(v, finalSetAttrs) {
    if (v.jack_of_all_trades === '(floor(@{pb}/2))') {
      finalSetAttrs.jack_of_all_trades_toggle = '@{jack_of_all_trades}';
    }
  }
  convertProficienciesAndLanguages(v, finalSetAttrs) {
    if (v.other_proficiencies_and_languages) {
      const proficieniesMatch = v.other_proficiencies_and_languages.match(/Proficiencies. (.*)/i);
      if (proficieniesMatch && proficieniesMatch[1]) {
        finalSetAttrs.proficiencies = proficieniesMatch[1];
      }
      const languagesMatch = v.other_proficiencies_and_languages.match(/Languages. (.*)/i);
      if (languagesMatch && languagesMatch[1]) {
        finalSetAttrs.languages = languagesMatch[1];
      }
    }
  }
  convertClass() {
    getSetRepeatingItems('convert.convertClass', {
      repeatingItems: ['repeating_class'],
      collectionArray: ['class', 'base_level', 'multiclass1_flag'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        if (v.class) {
          let repeatingString = `${repeatingItem}_${generateRowID()}_`;
          finalSetAttrs[`${repeatingString}name`] = v.class.toLowerCase();
          finalSetAttrs[`${repeatingString}level`] = getIntValue(v.base_level);

          for (let i = 1; i <= 3; i++) {
            if (v[`multiclass${i}_flag`]) {
              repeatingString = `${repeatingItem}_${generateRowID()}_`;
              finalSetAttrs[`${repeatingString}name`] = v[`multiclass${i}`].toLowerCase();
              finalSetAttrs[`${repeatingString}level`] = getIntValue(v[`multiclass${i}_lvl`]);
            }
          }
        }
      },
    });
  }
  convertPCSkills() {
    const collectionArray = [];
    for (const skill in SKILLS) {
      if (SKILLS.hasOwnProperty(skill)) {
        collectionArray.push(`${skill.toLowerCase()}_prof`);
        collectionArray.push(`${skill.toLowerCase()}_type`);
      }
    }
    getSetRepeatingItems('convert.convertPCSkills', {
      repeatingItems: ['repeating_skill'],
      collectionArray,
      collectionArrayAddItems: ['proficiency'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const skill in SKILLS) {
          if (SKILLS.hasOwnProperty(skill)) {
            const skillId = getSkillIdByStorageName(v, repeatingItem, ids, skill);
            const repeatingString = `${repeatingItem}_${skillId}_`;

            if (v[`${skill.toLowerCase()}_type`] === '2') {
              finalSetAttrs[`${repeatingString}proficiency`] = 'expertise';
            } else if (v[`${skill.toLowerCase()}_prof`]) {
              finalSetAttrs[`${repeatingString}proficiency`] = 'proficient';
            }
          }
        }
      },
    });
  }
  convertTraits() {
    getSetRepeatingItems('convert.convertTraits', {
      repeatingItems: ['repeating_npctrait'],
      collectionArrayAddItems: ['name', 'desc'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          traits.set({
            freetext: v[`${repeatingString}desc`],
            name: v[`${repeatingString}name`].replace('.', ''),
          });
        }
      },
    });
  }
  convertActions(oldRepeatingName, repeatingName) {
    getSetRepeatingItems('convert.convertActions', {
      repeatingItems: [`repeating_${oldRepeatingName}`],
      collectionArrayAddItems: ['name', 'attack_flag', 'attack_type_display', 'attack_tohitrange', 'attack_tohit', 'attack_onhit', 'description'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingStringOld = `${repeatingItem}_${id}_`;
          const repeatingString = `repeating_${repeatingName}_${generateRowID()}_`;

          if (!v[`${repeatingStringOld}name`]) {
            continue;
          }

          finalSetAttrs[`${repeatingString}name`] = v[`${repeatingStringOld}name`];
          finalSetAttrs[`${repeatingString}freetext`] = '';
          if (v[`${repeatingStringOld}attack_flag`] === 'on' && v[`${repeatingStringOld}attack_type_display`]) {
            finalSetAttrs[`${repeatingString}roll_toggle`] = TOGGLE_VARS.roll;
            finalSetAttrs[`${repeatingString}freetext`] += `${v[`${repeatingStringOld}attack_type_display`]} ${v[`${repeatingStringOld}attack_tohitrange`]} Hit: `;
          }
          if (v[`${repeatingStringOld}attack_onhit`]) {
            finalSetAttrs[`${repeatingString}freetext`] += `${v[`${repeatingStringOld}attack_onhit`]}`;
            if (v[`${repeatingStringOld}description`]) {
              finalSetAttrs[`${repeatingString}freetext`] += ` ${v[`${repeatingStringOld}description`]}`;
            }
          } else {
            if (v[`${repeatingStringOld}description`]) {
              finalSetAttrs[`${repeatingString}freetext`] += `${v[`${repeatingStringOld}description`]}`;
            }
          }
          finalSetAttrs[`${repeatingString}freetext`] = finalSetAttrs[`${repeatingString}freetext`]
            .replace(/Attack:\s?\+(\d+)/i, 'Attack: +$1 to hit')
            .trim()
            .replace(/.*(\\n)/, '')
            .trim()
            .replace(/.*(\\n)/, '')
            .trim()
            .replace(/.*(\\n)/, '');
        }
      },
    });
  }
  convertNPCSpells() {
    getSetRepeatingItems('convert.convertNPCSpells', {
      repeatingItems: ['repeating_spell-npc'],
      collectionArrayAddItems: ['spellname_base', 'spellprepared', 'spellritual', 'spellschool', 'spellcastingtime', 'spellrange', 'spelltarget', 'spellcomp_v', 'spellcomp_s', 'spellcomp_m', 'spellcomp_materials', 'spellconcentration', 'spellduration', 'spelldescription', 'spellathigherlevels', 'spelloutput', 'spelldamage', 'spelldamagetype', 'spelldamage2', 'spelldamagetype2', 'spellhealing', 'spellsave', 'spellsavesuccess', 'spellhldie'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingStringOld = `${repeatingItem}_${id}_`;
          const repeatingString = `repeating_spell_${generateRowID()}_`;

          const nameLevelMatch = v[`${repeatingStringOld}spellname_base`].match(/(.*) \((.*)\)/i);
          if (nameLevelMatch && nameLevelMatch[1]) {
            finalSetAttrs[`${repeatingString}name`] = nameLevelMatch[1];
            if (nameLevelMatch[2] && nameLevelMatch[2] === 'Cantrip') {
              finalSetAttrs[`${repeatingString}level`] = ordinalSpellLevel(0);
            } else if (nameLevelMatch[2]) {
              finalSetAttrs[`${repeatingString}spell_level`] = ordinalSpellLevel(getIntValue(nameLevelMatch[2].replace('Level ', '')));
            }
          }
          if (!v[`${repeatingStringOld}spellprepared`] || getIntValue(v[`${repeatingStringOld}spellprepared`]) === 1) {
            finalSetAttrs[`${repeatingString}is_prepared`] = 'on';
          }
          if (v[`${repeatingStringOld}spellritual`]) {
            finalSetAttrs[`${repeatingString}ritual`] = 'Yes';
          }
          finalSetAttrs[`${repeatingString}school`] = v[`${repeatingStringOld}spellschool`].toUpperCase();
          finalSetAttrs[`${repeatingString}casting_time`] = v[`${repeatingStringOld}spellcastingtime`].trim().toUpperCase().replace(/\s/g, '_');
          finalSetAttrs[`${repeatingString}range`] = v[`${repeatingStringOld}spellrange`];
          finalSetAttrs[`${repeatingString}target`] = v[`${repeatingStringOld}spelltarget`];

          const components = [];
          if (v[`${repeatingStringOld}spellcomp_v`] === '{{v=1}}') {
            components.push('V');
          }
          if (v[`${repeatingStringOld}spellcomp_s`] === '{{s=1}}') {
            components.push('S');
          }
          if (v[`${repeatingStringOld}spellcomp_m`] === '{{m=1}}') {
            components.push('M');
          }
          if (components.length > 0) {
            finalSetAttrs[`${repeatingString}components`] = `COMPONENTS_${components.join('_')}`;
          }
          finalSetAttrs[`${repeatingString}materials`] = v[`${repeatingStringOld}spellcomp_materials`];

          if (v[`${repeatingStringOld}spellduration`]) {
            let duration = '';
            if (v[`${repeatingStringOld}spellconcentration`]) {
              duration += 'CONCENTRATION_';
            }
            duration += v[`${repeatingStringOld}spellduration`].trim().toUpperCase().replace(/\s/g, '_');
            finalSetAttrs[`${repeatingString}duration`] = duration;
          }
          if (v[`${repeatingStringOld}spelloutput`] === 'ATTACK') {
            finalSetAttrs[`${repeatingString}roll_toggle`] = TOGGLE_VARS.roll;
          }
          if (v[`${repeatingStringOld}spelldamage`]) {
            finalSetAttrs[`${repeatingString}damage_toggle`] = TOGGLE_VARS.damage;
            finalSetAttrs[`${repeatingString}damage`] = v[`${repeatingStringOld}spelldamage`];
          }
          if (v[`${repeatingStringOld}spelldamagetype`]) {
            finalSetAttrs[`${repeatingString}damage_type`] = v[`${repeatingStringOld}spelldamagetype`];
          }
          if (v[`${repeatingStringOld}spelldamage2`]) {
            finalSetAttrs[`${repeatingString}second_damage`] = v[`${repeatingStringOld}spelldamage2`];
          }
          if (v[`${repeatingStringOld}spelldamagetype2`]) {
            finalSetAttrs[`${repeatingString}second_damage_type`] = v[`${repeatingStringOld}spelldamagetype2`];
          }
          if (v[`${repeatingStringOld}spellhealing`]) {
            finalSetAttrs[`${repeatingString}heal`] = v[`${repeatingStringOld}spellhealing`];
          }
          if (v[`${repeatingStringOld}spellsave`]) {
            finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = v[`${repeatingStringOld}spellsave`].toUpperCase();
          }
          if (v[`${repeatingStringOld}spellsavesuccess`]) {
            finalSetAttrs[`${repeatingString}saving_throw_success`] = v[`${repeatingStringOld}spellsavesuccess`];
          }
          if (v[`${repeatingStringOld}spellhldie`]) {
            finalSetAttrs[`${repeatingString}higher_level_dice`] = v[`${repeatingStringOld}spellhldie`];
          }
          if (v[`${repeatingStringOld}spellhldietype`]) {
            finalSetAttrs[`${repeatingString}higher_level_die`] = v[`${repeatingStringOld}spellhldietype`];
          }

          finalSetAttrs[`${repeatingString}content`] = `${v[`${repeatingStringOld}spelldescription`]}\nAt Higher Levels: ${v[`${repeatingStringOld}spellathigherlevels`]}`;

          finalSetAttrs[`${repeatingString}toggle_details`] = '0';
        }
      },
    });
  }

  convertFromOGL() {
    const oldToNew = {
      npc: 'is_npc',
      npc_ac: 'AC',
      npc_actype: 'ac_note',
      npc_challenge: 'challenge',
      npc_name: 'character_name',
      npc_vulnerabilities: 'damage_vulnerabilities',
      npc_resistances: 'damage_resistances',
      npc_immunities: 'damage_immunities',
      npc_condition_immunities: 'condition_immunities',
      npc_senses: 'senses',
      npc_languages: 'languages',
      hp_temp: 'temp_HP',
      experience: 'xp',
      npc_legendary_actions: 'legendary_action_amount',
    };
    const collectionArray = ['npc_type', 'hp_max', 'npc_hpformula', 'jack_of_all_trades', 'other_proficiencies_and_languages', 'spellcasting_ability'];

    for (const ability of ABILITIES) {
      collectionArray.push(`npc_${getAbilityShortName(ability).toLowerCase()}_save`);
    }
    for (const skill in SKILLS) {
      if (SKILLS.hasOwnProperty(skill)) {
        collectionArray.push(`npc_${skill.toLowerCase()}`);
      }
    }
    for (const key in oldToNew) {
      if (oldToNew.hasOwnProperty(key)) {
        collectionArray.push(key);
      }
    }
    getSetItems('convert.convertFromOGL', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.tab = 'core';
        for (const key in oldToNew) {
          if (oldToNew.hasOwnProperty(key)) {
            if (v[key]) {
              finalSetAttrs[oldToNew[key]] = v[key];
            }
          }
        }
        this.parseSpellcastingAbility(v, finalSetAttrs);
        this.parseSizeTypeAlignment(v, finalSetAttrs);
        this.parseHD(v, finalSetAttrs);
        this.parseSavingThrows(v, finalSetAttrs);
        this.parseNPCSkills(v, finalSetAttrs);
        this.convertJackOfAllTrades(v, finalSetAttrs);
        this.convertProficienciesAndLanguages(v, finalSetAttrs);
      },
    });
    this.convertPCSkills();
    this.convertTraits();
    this.convertActions('npcaction', 'action');
    this.convertActions('npcaction-l', 'legendaryaction');
    this.convertActions('npcreaction', 'reaction');
    this.convertClass();
    this.convertNPCSpells();
  }
}

//

/*
NPC Convcersion
 * weapons like "3 (1d6-1) bludgeoning damage plus 3 (1d6) poison damage" aren't converting both damages

PC Conversion:
 * convert "attacks" to repeating attacks
 * convert "repeating_inventory" to equipment. "itemcount" to "qty", "itemname", "itemweight", "equipped"
 * convert "repeating_spell-cantrip", "repeating_spell-1" etc to "repeating_spells". "spellname_base", "spellprepared", "spellschool", "spellritual", "spellcastingtime", "spellrange", "spelltarget" to "target", "spellcomp_v" and "spellcomp_s" and "spellcomp_m" and "spellcomp_materials", "spellconcentration", "spellduration", "spelloutput", "spelldescription", "spellathigherlevels"
 * convert ac to some armor

 */
