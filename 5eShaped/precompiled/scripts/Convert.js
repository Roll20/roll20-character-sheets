/* global on:false, generateRowID:false */

import { getSetItems, isUndefinedOrEmpty } from './utilities';

export class Convert {
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
      spellcasting_ability: 'default_ability',
    };
    const collectionArray = [];
    for (var key in oldToNew) {
      if (oldToNew.hasOwnProperty(key)) {
        collectionArray.push(key);
        collectionArray.push(oldToNew[key]);
      }
    }

    getSetItems('convert.convertFromOGL', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        for (var key in oldToNew) {
          if (oldToNew.hasOwnProperty(key)) {
            if (isUndefinedOrEmpty(v[oldToNew[key]]) && v[key]) {
              finalSetAttrs[oldToNew[key]] = v[key];
            }
          }
        }
      },
    });
  }
}

//convert "npc_type" to size, type, alignment
//convert "npc_hpformula" to hd
//convert "npc_str_save" to save prof -- all attributes
//convert "npc_acrobatics" to repeating skills -- all skills
//convert "acrobatics_prof" to repeating skills -- all skills
//convert "repeating_npctrait" to repeating traits. "name", "desc"
//convert "repeating_npcaction" to repeating actions. "name", "attack_flag" to attack toggle, "attack_type" to type - "Melee" or "Ranged", "attack_range" to reach and range, "attack_tohit" as integer, "attack_target" ignored, "attack_damage" to "damage", "attack_damagetype" to "damage_type", "attack_damage2" to "second_damage", "attack_damagetype2" to "second_damage_type", "description" empty?
//convert "other_proficiencies_and_languages" to profs and languages: "Proficiencies. All armor, shields, simple weapons, martial weapons, carpenter’s tools, vehicles (land)   Languages. Common, Elvish"
//convert "hit_dice_max" to something
//convert "attacks" to repeating attacks
//convert "class" and "base_level" to repeating class
//convert "repeating_inventory" to equipment. "itemcount" to "qty", "itemname", "itemweight", "equipped"

//convert "repeating_spell-cantrip", "repeating_spell-1" etc to "repeating_spells". "spellname_base", "spellprepared", "spellschool", "spellritual", "spellcastingtime", "spellrange", "spelltarget" to "target", "spellcomp_v" and "spellcomp_s" and "spellcomp_m" and "spellcomp_materials", "spellconcentration", "spellduration", "spelloutput", "spelldescription", "spellathigherlevels"

//convert ac to some armor


