/* global setAttrs:false, getAttrs:false, on:false, getSectionIDs:false, generateRowID:false, getTranslationByKey:false */
'use strict';
import { SKILLS, CLASSES, ABILITIES, TOGGLE_VARS } from './constants';
import { capitalize, firstThree, round, isUndefined, isUndefinedOrEmpty, exists, getIntValue, getFloatValue, getAbilityMod, getAbilityValue, getAbilityShortName, getRepeatingInfo, setFinalAttrs, fromVOrFinalSetAttrs, versionCompare, addArithmeticOperator, showSign, numberWithCommas, getCorrectAbilityBasedOnBonus, getAnyCorrectAbilityBasedOnBonus, lowercaseDamageTypes, getSetItems, getSetRepeatingItems, checkVersionFormat, sumRepeating, getSkillIdByStorageName } from './utilities';
import { extasToExtrasFix, armorPlusDexRemoval, fixRollTwo, updateDefaultAbility, updateHideFreetext, updateSkillAbility, updateArmorAbility, atSyntaxToAbilityName, updateActionComponents, newAttackToggle, newAttackToggleTwo, newAbilityDefaults, changeOldToggleToNew, removeToggleVar, changeOldRepeatingToggleToNew, updateActionComponentsToRemoveExtraFields, displayTextForTraits, updateSpellToTranslations, updateSpellLevelForCantrips } from './upgrade';
import { updateAbilityModifier, updateAbilityModifiers } from './abilities';
import { updateAttackToggle, updateSavingThrowToggle, updateDamageToggle, updateHealToggle, updateHigherLevelToggle } from './updateToggles';
import { updateSpellFromSRD, updateSpellsFromSRD, updateSpell, updateSpellSlots, updateSpellShowHide, watchForSpellChanges, updateSpellChatMacro } from './spells';
import { setClassFeatures } from './classFeatures';
import { setTrait } from './traits';
import { updateType, updateSize } from './npc';
import { currentVersion } from './version';
import { updateInitiative, watchInitiativeChanges } from './initiative';
import { setAdvantageOnStealth, updateArmor, updateEquipment, weighEquipment, weighAmmo, updateWeight } from './equipment';
import { updateAction, updateActions, updateActionIfTriggered, updateActionChatMacro } from './actions';
import { updateSkill, updateSkillsFromSRD, updateAbilityChecksMacro } from './abilityChecks';
import { getPB, updatePb } from './proficiencyBonus';

const calculateGold = () => {
  getSetItems('calculateGold', {
    collectionArray: ['cp', 'copper_per_gold', 'sp', 'silver_per_gold', 'ep', 'electrum_per_gold', 'gp', 'pp', 'platinum_per_gold'],
    callback: (v, finalSetAttrs) => {
      const copperPieces = getFloatValue(v.cp);
      const silverPieces = getFloatValue(v.sp);
      const electrumPieces = getFloatValue(v.ep);
      const goldPieces = getFloatValue(v.gp);
      const platinumPieces = getFloatValue(v.pp);
      const copperPerGold = getFloatValue(v.copper_per_gold, 100);
      const silverPerGold = getFloatValue(v.silver_per_gold, 10);
      const electrumPerGold = getFloatValue(v.electrum_per_gold, 2);
      const platinumPerGold = getFloatValue(v.platinum_per_gold, 10);

      finalSetAttrs.total_gp = ((copperPieces / copperPerGold) + (silverPieces / silverPerGold) + (electrumPieces / electrumPerGold) + goldPieces + (platinumPieces * platinumPerGold)).toFixed(2);
      finalSetAttrs.weight_coinage = (copperPieces + silverPieces + electrumPieces + goldPieces + platinumPieces) / 50;
    },
  });
};
on('change:cp change:copper_per_gold change:sp change:silver_per_gold change:ep change:electrum_per_gold change:gp change:pp change:platinum_per_gold', () => {
  calculateGold();
});

on('change:jack_of_all_trades_toggle change:jack_of_all_trades change:global_ability_bonus change:global_check_bonus', () => {
  updateAbilityModifiers();
});
on('change:strength change:strength_bonus change:strength_check_mod change:strength_check_bonus change:remarkable_athlete_toggle change:remarkable_athlete change:weight_multiplier', () => {
  updateAbilityModifier('strength');
});
on('change:dexterity change:dexterity_bonus change:dexterity_check_mod change:dexterity_check_bonus change:remarkable_athlete_toggle change:remarkable_athlete', () => {
  updateAbilityModifier('dexterity');
});
on('change:constitution change:constitution_bonus change:constitution_check_mod change:constitution_check_bonus change:remarkable_athlete_toggle change:remarkable_athlete', () => {
  updateAbilityModifier('constitution');
});
on('change:intelligence change:intelligence_bonus change:intelligence_check_mod change:intelligence_check_bonus', () => {
  updateAbilityModifier('intelligence');
});
on('change:wisdom change:wisdom_bonus change:wisdom_check_mod change:wisdom_check_bonus', () => {
  updateAbilityModifier('wisdom');
});
on('change:charisma change:charisma_bonus change:charisma_check_mod change:charisma_check_bonus', () => {
  updateAbilityModifier('charisma');
});

const updateHD = (v, finalSetAttrs, hd) => {
  for (const key in hd) {
    if (hd.hasOwnProperty(key)) {
      if (hd[key] && hd[key] !== 0) {
        finalSetAttrs[`hd_${key}_max`] = hd[key];
        finalSetAttrs[`hd_${key}_query`] = '?{HD';
        for (let x = 1; x <= hd[key]; x++) {
          finalSetAttrs[`hd_${key}_query`] += `|${x}`;
        }
        finalSetAttrs[`hd_${key}_query`] += '}';
        finalSetAttrs[`hd_${key}_toggle`] = 1;
      } else {
        if (!isUndefinedOrEmpty(v[`hd_${key}_max`])) {
          finalSetAttrs[`hd_${key}_max`] = 0;
        }
        if (!isUndefinedOrEmpty(v[`hd_${key}_query`])) {
          finalSetAttrs[`hd_${key}_query`] = '';
        }
        if (exists(v[`hd_${key}_toggle`])) {
          finalSetAttrs[`hd_${key}_toggle`] = 0;
        }
      }
    }
  }
};

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
on('change:repeating_class', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_class', eventInfo);
  if (repeatingInfo) {
    updateLevels(repeatingInfo);
  }
});
on('remove:repeating_class', () => {
  updateLevels();
});

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
watchForClassLevelChanges();
on('change:spell_slots_l1_bonus change:spell_slots_l2_bonus change:spell_slots_l3_bonus change:spell_slots_l4_bonus change:spell_slots_l5_bonus change:spell_slots_l6_bonus change:spell_slots_l7_bonus change:spell_slots_l8_bonus change:spell_slots_l9_bonus', () => {
  updateSpellSlots();
});

on('change:level', () => {
  updatePb();
});


on('change:repeating_armor', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_armor', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'ac_total') {
    updateArmor(repeatingInfo.rowId);
  }
});
on('change:dexterity_mod change:medium_armor_max_dex change:ac_unarmored_ability remove:repeating_armor', () => {
  updateArmor();
});
on('change:repeating_equipment', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_equipment', eventInfo);
  updateEquipment(repeatingInfo.rowId);
});
on('change:repeating_equipment:carried change:repeating_equipment:qty change:repeating_equipment:weight remove:repeating_equipment', () => {
  weighEquipment();
});
on('change:repeating_ammo:weight change:repeating_ammo:qty', () => {
  weighAmmo();
});
on('change:weight_attacks change:weight_ammo change:weight_armor change:weight_equipment change:weight_coinage', () => {
  updateWeight();
});

const updateJackOfAllTrades = () => {
  getSetItems('updateJackOfAllTrades', {
    collectionArray: ['pb', 'jack_of_all_trades'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.jack_of_all_trades = Math.floor(getIntValue(v.pb) / 2);
    },
  });
};
on('change:jack_of_all_trades_toggle', () => {
  updateJackOfAllTrades();
});

const updateRemarkableAthlete = () => {
  getSetItems('updateRemarkableAthlete', {
    collectionArray: ['pb', 'remarkable_athlete'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.remarkable_athlete = Math.ceil(getIntValue(v.pb) / 2);
    },
  });
};
on('change:remarkable_athlete_toggle', () => {
  updateRemarkableAthlete();
});


watchInitiativeChanges();

const updateCritDamage = () => {
  getSetRepeatingItems('updateCritDamage', {
    repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_trait', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['damage', 'damage_crit', 'second_damage', 'second_damage_crit'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (!v[`${repeatingString}damage_crit`] && v[`${repeatingString}damage`]) {
          finalSetAttrs[`${repeatingString}damage_crit`] = v[`${repeatingString}damage`];
        } else if (v[`${repeatingString}damage`] && v[`${repeatingString}damage_crit`]) {
          finalSetAttrs[`${repeatingString}damage_crit`] = `${v[`${repeatingString}damage`]} + ${v[`${repeatingString}damage_crit`]}`;
        }
        if (!v[`${repeatingString}second_damage_crit`] && v[`${repeatingString}second_damage`]) {
          finalSetAttrs[`${repeatingString}second_damage_crit`] = v[`${repeatingString}second_damage`];
        } else if (v[`${repeatingString}second_damage`] && v[`${repeatingString}second_damage_crit`]) {
          finalSetAttrs[`${repeatingString}second_damage_crit`] = `${v[`${repeatingString}second_damage`]} + ${v[`${repeatingString}second_damage_crit`]}`;
        }
      }
    },
  });
};

const findAmmo = (name, callback) => {
  let repeatingString;

  getSetRepeatingItems('findAmmo', {
    repeatingItems: ['repeating_ammo'],
    collectionArrayAddItems: ['name', 'qty'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        repeatingString = `${repeatingItem}_${id}_`;
        if (v[`${repeatingString}name`] === name) {
          callback(`@{${repeatingString}qty}`);
          return;
        }
      }
      console.warn(`cannot find ammo field by the name ${name}, adding it`);
      repeatingString = `${repeatingItem}_${generateRowID()}_`;
      finalSetAttrs[`${repeatingString}name`] = name;
      finalSetAttrs[`${repeatingString}qty`] = 20;
      callback(`@{${repeatingString}qty}`);
    },
  });
};

on('change:repeating_trait', (eventInfo) => {
  updateActionIfTriggered('trait', eventInfo);
});
on('change:repeating_action', (eventInfo) => {
  updateActionIfTriggered('action', eventInfo);
});
on('change:repeating_reaction', (eventInfo) => {
  updateActionIfTriggered('reaction', eventInfo);
});
on('change:repeating_legendaryaction', (eventInfo) => {
  updateActionIfTriggered('legendaryaction', eventInfo);
});
on('change:repeating_lairaction', (eventInfo) => {
  updateActionIfTriggered('lairaction', eventInfo);
});
on('change:repeating_regionaleffect', (eventInfo) => {
  updateActionIfTriggered('regionaleffect', eventInfo);
});

const updateAttack = (rowId) => {
  const collectionArray = ['pb', 'strength_mod', 'finesse_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability', 'ammo_auto_use', 'base_dc'];
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }

  getSetRepeatingItems('updateAttack', {
    repeatingItems: ['repeating_attack'],
    collectionArray,
    collectionArrayAddItems: ['name', 'type', 'roll_toggle', 'to_hit', 'attack_formula', 'proficiency', 'attack_ability', 'attack_bonus', 'ammo_toggle_var', 'ammo_field_name', 'ammo_used', 'saving_throw_toggle', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_dc', 'damage_toggle', 'damage_formula', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_toggle', 'second_damage_formula', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'damage_string', 'modifiers', 'properties', 'weight', 'parsed'],
    rowId,
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        const attackName = v[`${repeatingString}name`];
        if (isUndefinedOrEmpty(attackName)) {
          return;
        }

        if (isUndefinedOrEmpty(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('modifiers') === -1) {
          const attackModifiers = v[`${repeatingString}modifiers`];
          if (exists(attackModifiers)) {
            const attackBonus = attackModifiers.replace(/.*(?:Melee|Ranged) Attacks \+(\d+).*/gi, '$1');
            const damageBonus = attackModifiers.replace(/.*(?:Melee|Ranged) Damage \+(\d+).*/gi, '$1');

            finalSetAttrs[`${repeatingString}attack_bonus`] = attackBonus;
            finalSetAttrs[`${repeatingString}damage_bonus`] = damageBonus;
            if (!finalSetAttrs[`${repeatingString}parsed`]) {
              finalSetAttrs[`${repeatingString}parsed`] = '';
            }
            finalSetAttrs[`${repeatingString}parsed`] += ' modifiers';
          }
        }
        if (isUndefinedOrEmpty(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('attackProperties') === -1) {
          const attackProperties = v[`${repeatingString}properties`];
          if (exists(attackProperties)) {
            if (attackProperties.indexOf('Reach') !== -1) {
              finalSetAttrs[`${repeatingString}reach`] = '10 ft';
            } else if (v[`${repeatingString}type`] === 'Melee Weapon') {
              finalSetAttrs[`${repeatingString}reach`] = '5 ft';
            }
            if (attackProperties.indexOf('Finesse') !== -1) {
              finalSetAttrs[`${repeatingString}attack_ability`] = 'finesse';
              finalSetAttrs[`${repeatingString}damage_ability`] = 'finesse';
            }
            if (!finalSetAttrs[`${repeatingString}parsed`]) {
              finalSetAttrs[`${repeatingString}parsed`] = '';
            }
            finalSetAttrs[`${repeatingString}parsed`] += ' attackProperties';
          }
        }

        const attackOptions = {
          globalAttackBonus: v.global_attack_bonus,
          globalAttackBonusLabel: 'global attack bonus',
          globalMeleeAttackBonus: v.global_melee_attack_bonus,
          globalRangedAttackBonus: v.global_ranged_attack_bonus,
          type: 'attack',
        };
        updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

        const ammoName = v[`${repeatingString}ammo_field_name`];
        const ammoUsed = getIntValue(v[`${repeatingString}ammo_used`], 1);
        if (!isUndefinedOrEmpty(ammoName)) {
          let ammoAutoUse;
          if (v.ammo_auto_use === '1') {
            ammoAutoUse = 1;
          } else {
            ammoAutoUse = 0;
          }

          findAmmo(ammoName, (ammoQtyName) => {
            const setAmmo = {};
            setAmmo[`${repeatingString}ammo_toggle_var`] = `{{ammo=[[${ammoQtyName}-${ammoAutoUse * ammoUsed}]]}} {{ammo_name=${ammoName}}}`;
            setFinalAttrs(v, setAmmo, 'findAmmo');
          });
        }

        updateSavingThrowToggle(v, finalSetAttrs, repeatingString);

        const damageOptions = {
          globalDamageBonus: v.global_damage_bonus,
          globalMeleeDamageBonus: v.global_melee_damage_bonus,
          globalRangedDamageBonus: v.global_ranged_damage_bonus,
          type: 'attack',
        };
        updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);
        if (v.damage_type) {
          finalSetAttrs.damage_type = lowercaseDamageTypes(v.damage_type);
        }
        if (v.second_damage_type) {
          finalSetAttrs.second_damage_type = lowercaseDamageTypes(v.second_damage_type);
        }
        setCritDamage(v, finalSetAttrs, repeatingString);
      }
    },
  });
};
on('change:repeating_attack', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_attack', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'roll_toggle' && repeatingInfo.field !== 'toggle_details' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'qty' && repeatingInfo.field !== 'weight' && repeatingInfo.field !== 'parsed') {
    updateAttack(repeatingInfo.row);
  }
});
const weighAttacks = () => {
  const options = {
    collection: 'attack',
    toggle: 'carried',
    qty: 'qty',
  };
  const sumItems = [
    {
      fieldToAdd: 'weight',
      itemTotal: 'weight_total',
      totalField: 'weight_attacks',
    },
  ];
  sumRepeating(options, sumItems);
};

const updateAttackChatMacro = () => {
  getSetRepeatingItems('updateAttackChatMacro', {
    repeatingItems: ['repeating_attack'],
    collectionArray: ['attacks_macro_var'],
    collectionArrayAddItems: ['name'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      finalSetAttrs.attacks_macro_var = '';

      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        let actionName = v[`${repeatingString}name`];
        if (actionName && actionName.length > 50) {
          actionName = `${actionName.substring(0, 50)}...`;
        }

        if (id !== ids[0]) {
          finalSetAttrs.attacks_macro_var += ', ';
        }

        finalSetAttrs.attacks_macro_var += `[${actionName}](~repeating_attack_${id}_attack)`;
      }
    },
  });
};
on('change:repeating_attack remove:repeating_attack', () => {
  updateAttackChatMacro();
});
on('change:repeating_attack:carried change:repeating_attack:qty change:repeating_attack:weight remove:repeating_attack', () => {
  weighAttacks();
});
on('change:global_attack_bonus change:global_melee_attack_bonus change:global_ranged_attack_bonus change:global_damage_bonus change:global_melee_damage_bonus change:global_ranged_damage_bonus change:ammo_auto_use', () => {
  updateAttack();
  updateAction('action');
  updateAction('reaction');
  updateAction('legendaryaction');
  updateAction('lairaction');
});

on('change:repeating_spell', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_spell', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'roll_toggle' && repeatingInfo.field !== 'toggle_details' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'heal_formula' && repeatingInfo.field !== 'higher_level_query' && repeatingInfo.field !== 'parsed') {
    updateSpell(repeatingInfo.rowId);
  }
});
on('change:global_spell_attack_bonus change:global_spell_damage_bonus change:global_spell_dc_bonus change:global_spell_heal_bonus', () => {
  updateSpell();
});

on('change:repeating_spell', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_spell', eventInfo);
  if (repeatingInfo && (repeatingInfo.field === 'name' || repeatingInfo.field === 'spell_level' || repeatingInfo.field === 'is_prepared')) {
    updateSpellChatMacro();
  }
});
on('change:spells_show_unprepared', () => {
  updateSpellChatMacro();
});
on('remove:repeating_spell', () => {
  updateSpellChatMacro();
});

watchForSpellChanges();

const generateHigherLevelQueries = () => {
  const collectionArray = ['warlock_level', 'number_of_classes'];
  for (let i = 1; i <= 8; i++) {
    collectionArray.push(`cast_as_level_${i}`);
    collectionArray.push(`higher_level_query_${i}`);
  }
  for (let i = 1; i <= 9; i++) {
    collectionArray.push(`spell_slots_l${i}`);
  }

  getSetItems('generateHigherLevelQueries', {
    collectionArray,
    callback: (v, finalSetAttrs) => {
      for (let i = 1; i <= 8; i++) {
        let higherLevelQuery = '';

        if (i < 6 && v.number_of_classes === 1 && v.warlock_level > 0 && Math.ceil(getIntValue(v.warlock_level) / 2) >= i) {
          let spellLevel = 1;
          if (v.warlock_level >= 9) {
            spellLevel = 5;
          } else if (v.warlock_level >= 7) {
            spellLevel = 4;
          } else if (v.warlock_level >= 5) {
            spellLevel = 3;
          } else if (v.warlock_level >= 3) {
            spellLevel = 2;
          }
          higherLevelQuery = spellLevel;
        } else {
          let levelQuery = '';
          for (let j = i; j <= 9; j++) {
            if (getIntValue(v[`spell_slots_l${j}`])) {
              levelQuery += `|${j}`;
            }
          }
          higherLevelQuery = `?{Spell Level${levelQuery}}`;
        }
        if (higherLevelQuery !== '') {
          finalSetAttrs[`higher_level_query_${i}`] = higherLevelQuery;
        } else {
          finalSetAttrs[`higher_level_query_${i}`] = i;
        }
        if (v[`spell_slots_l${i}`] === '0' && higherLevelQuery !== i) {
          finalSetAttrs[`cast_as_level_${i}`] = higherLevelQuery;
        } else {
          finalSetAttrs[`cast_as_level_${i}`] = '';
        }
      }
    },
  });
};
on('change:warlock_level change:spell_slots_l1 change:spell_slots_l2 change:spell_slots_l3 change:spell_slots_l4 change:spell_slots_l5 change:spell_slots_l6 change:spell_slots_l7 change:spell_slots_l8 change:spell_slots_l9', () => {
  generateHigherLevelQueries();
});

function updateD20Mod() {
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
}
on('change:halfling_luck', () => {
  updateD20Mod();
});

const updateShapedD20 = () => {
  getSetItems('updateShapedD20', {
    collectionArray: ['roll_setting', 'roll_info', 'shaped_d20'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.roll_info = '';
      finalSetAttrs.shaped_d20 = 'd20';

      if (v.roll_setting === 'adv {{ignore=[[0') {
        finalSetAttrs.roll_info = '{{advantage=1}}';
        finalSetAttrs.shaped_d20 = '2d20@{d20_mod}kh1';
      } else if (v.roll_setting === 'dis {{ignore=[[0') {
        finalSetAttrs.roll_info = '{{disadvantage=1}}';
        finalSetAttrs.shaped_d20 = '2d20@{d20_mod}kl1';
      }
    },
  });
};
on('change:roll_setting', () => {
  updateShapedD20();
});

on('change:repeating_skill', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_skill', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'ability_key' && repeatingInfo.field !== 'total' && repeatingInfo.field !== 'total_with_sign' && repeatingInfo.field !== 'passive_total' && repeatingInfo.field !== 'passive_total_with_sign' && repeatingInfo.field !== 'formula') {
    updateSkill(repeatingInfo.rowId);
  }
});
on('remove:repeating_skill change:ability_checks_show_totals', () => {
  updateAbilityChecksMacro();
});
on('change:jack_of_all_trades_toggle change:jack_of_all_trades change:remarkable_athlete_toggle change:remarkable_athlete change:global_check_bonus change:strength_check_bonus change:dexterity_check_bonus change:constitution_check_bonus change:intelligence_check_bonus change:wisdom_check_bonus change:charisma_check_bonus', () => {
  updateSkill();
});

on('change:skills_srd', () => {
  updateSkillsFromSRD();
});

const getHighestOfAbilityScoresForSavingThrow = (v, savingThrowName) => {
  let abilityName;
  let highestValue = 0;
  for (const ability of ABILITIES) {
    const abilityMod = getIntValue(v[`${ability}_mod`]);
    if (v[`${savingThrowName}_${ability}`] === '1' && (highestValue === 0 || abilityMod > highestValue)) {
      highestValue = abilityMod;
      abilityName = ability;
    }
  }
  return abilityName;
};
const findHighest = (arr) => {
  const highestAbility = Math.max.apply(Math, arr.map((ability) => ability.score));
  return arr.find((ability) => ability.score === highestAbility);
};

const getHighestAbilityScores = (v, savingThrowName) => {
  const abilities = [];
  for (const ability of ABILITIES) {
    if (v[`${savingThrowName}_${ability}`] === '1') {
      abilities.push({
        name: ability,
        score: getIntValue(v[`${ability}_calculated`]),
      });
    }
  }

  const highestAbilities = [];
  if (abilities.length > 0) {
    const highestAbilityObj = findHighest(abilities);

    highestAbilities.push(highestAbilityObj);
    abilities.splice(abilities.findIndex((ability) => ability.name === highestAbilityObj.name), 1);
  }
  if (abilities.length > 0) {
    const secondHighestAbilityObj = findHighest(abilities);
    highestAbilities.push(secondHighestAbilityObj);
  }

  return highestAbilities;
};
const getAverageOfHighestAbilityScoresForSavingThrow = (v, savingThrowName) => {
  const obj = {
    abilitiesUsed: [],
  };
  let sum = 0;

  const highestAbilities = getHighestAbilityScores(v, savingThrowName);
  for (const ability of highestAbilities) {
    obj.abilitiesUsed.push(getAbilityShortName(ability.name));
    sum += (getIntValue(v[`${ability.name}_calculated`]) - 10) / 2;
  }

  if (obj.abilitiesUsed.length > 0) {
    obj.avg = Math.floor(sum / obj.abilitiesUsed.length);
  }
  return obj;
};

const setCustomSaveProf = (v, finalSetAttrs, savingThrowName) => {
  const pbVar = '@{PB}';
  for (const ability of ABILITIES) {
    if (v[`${savingThrowName}_${ability}`] === '1' && v[`${ability}_save_prof`] === pbVar && !exists(v[`${savingThrowName}_save_prof`])) {
      finalSetAttrs[`${savingThrowName}_save_prof`] = pbVar;
    }
  }
};

const updateSavingThrow = (savingThrowName) => {
  const collectionArray = ['pb', `${savingThrowName}_save_prof`, `${savingThrowName}_save_bonus`, 'global_saving_throw_bonus', 'saving_throws_half_proficiency', 'average_of_abilities'];
  const customSaves = ['fortitude', 'reflex', 'will'];
  const customSavingThrow = customSaves.indexOf(savingThrowName) !== -1;
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_calculated`);
    collectionArray.push(`${ability}_mod`);
    collectionArray.push(`${savingThrowName}_${ability}`);
    if (customSavingThrow) {
      collectionArray.push(`${ability}_save_prof`);
      for (const ability of ABILITIES) {
        collectionArray.push(`${savingThrowName}_${ability}`);
      }
    }
  }

  getSetItems('updateSavingThrow', {
    collectionArray,
    callback: (v, finalSetAttrs) => {
      let total = 0;
      let totalFormula = '';
      let ability;

      if (customSavingThrow) {
        if (v.average_of_abilities === '1') {
          const obj = getAverageOfHighestAbilityScoresForSavingThrow(v, savingThrowName);

          if (obj.avg) {
            total = obj.avg;
            totalFormula = `${obj.avg}[${obj.abilitiesUsed.join(' ')} avg]`;
          }
        } else {
          ability = getHighestOfAbilityScoresForSavingThrow(v, savingThrowName);
        }
        setCustomSaveProf(v, finalSetAttrs, savingThrowName);
      } else {
        ability = savingThrowName;
      }

      if (ability) {
        const abilityMod = getIntValue(v[`${ability}_mod`]);
        total = abilityMod;
        totalFormula = `${abilityMod}[${getAbilityShortName(ability)}]`;
      }

      const pb = getIntValue(v.pb);
      if (v[`${savingThrowName}_save_prof`] === '@{PB}') {
        total += pb;
        totalFormula += `${addArithmeticOperator(totalFormula, pb)}[proficient]`;
      } else if (v.saving_throws_half_proficiency === 'on') {
        const halfPB = Math.floor(pb / 2);
        total += halfPB;
        totalFormula += `${addArithmeticOperator(totalFormula, halfPB)}[half proficiency]`;
      }

      const abilitySavingThrowBonus = getIntValue(v[`${savingThrowName}_save_bonus`]);
      if (abilitySavingThrowBonus) {
        total += abilitySavingThrowBonus;
        totalFormula += `${addArithmeticOperator(totalFormula, abilitySavingThrowBonus)}[${getAbilityShortName(ability)}saving throw bonus]`;
      }

      const globalSavingThrowBonus = v.global_saving_throw_bonus;
      if (!isUndefinedOrEmpty(globalSavingThrowBonus)) {
        if (!isNaN(globalSavingThrowBonus)) {
          total += getIntValue(globalSavingThrowBonus);
        }
        totalFormula += `${addArithmeticOperator(totalFormula, globalSavingThrowBonus)}[global saving throw bonus]`;
      }

      finalSetAttrs[`${savingThrowName}_saving_throw_mod`] = totalFormula;
      finalSetAttrs[`${savingThrowName}_saving_throw_mod_with_sign`] = showSign(total);
    },
  });
};
const updateCustomSavingThrows = () => {
  updateSavingThrow('fortitude');
  updateSavingThrow('reflex');
  updateSavingThrow('will');
};
const updateSavingThrows = () => {
  updateSavingThrow('strength');
  updateSavingThrow('dexterity');
  updateSavingThrow('constitution');
  updateSavingThrow('intelligence');
  updateSavingThrow('wisdom');
  updateSavingThrow('charisma');
  updateCustomSavingThrows();
};
on('change:pb change:global_saving_throw_bonus change:saving_throws_half_proficiency', () => {
  updateSavingThrows();
});
on('change:strength_mod change:strength_save_prof change:strength_save_bonus', () => {
  updateSavingThrow('strength');
});
on('change:dexterity_mod change:dexterity_save_prof change:dexterity_save_bonus', () => {
  updateSavingThrow('dexterity');
});
on('change:constitution_mod change:constitution_save_prof change:constitution_save_bonus', () => {
  updateSavingThrow('constitution');
});
on('change:intelligence_mod change:intelligence_save_prof change:intelligence_save_bonus', () => {
  updateSavingThrow('intelligence');
});
on('change:wisdom_mod change:wisdom_save_prof change:wisdom_save_bonus', () => {
  updateSavingThrow('wisdom');
});
on('change:charisma_mod change:charisma_save_prof change:charisma_save_bonus', () => {
  updateSavingThrow('charisma');
});
const watchAbilityChanges = () => {
  const classFeatureWatch = [];
  for (const ability of ABILITIES) {
    classFeatureWatch.push(`change:${ability}`);
    classFeatureWatch.push(`change:${ability}_mod`);
  }
  on(classFeatureWatch.join(' '), () => {
    updateCustomSavingThrows();
  });
};
watchAbilityChanges();
const watchForCustomSavingThrowChanges = (savingThrowName) => {
  const classFeatureWatch = [`change:${savingThrowName}_save_prof`, `change:${savingThrowName}_save_bonus`, 'change:average_of_abilities'];
  for (const ability of ABILITIES) {
    classFeatureWatch.push(`change:${savingThrowName}_${ability}`);
  }
  on(classFeatureWatch.join(' '), () => {
    updateSavingThrow(savingThrowName);
  });
};
watchForCustomSavingThrowChanges('fortitude');
watchForCustomSavingThrowChanges('reflex');
watchForCustomSavingThrowChanges('will');

const updateCustomSavingThrowToggle = () => {
  getSetItems('updateCustomSavingThrowToggle', {
    collectionArray: ['use_custom_saving_throws', 'saving_throw_macro_var_to_use'],
    callback: (v, finalSetAttrs) => {
      if (v.use_custom_saving_throws === '1') {
        finalSetAttrs.saving_throw_macro_var_to_use = '@{custom_saving_throw_macro_var}';
      } else {
        finalSetAttrs.saving_throw_macro_var_to_use = '@{saving_throw_macro_var}';
      }
    },
  });
};
on('change:use_custom_saving_throws', () => {
  updateCustomSavingThrowToggle();
});

const updateSavingThrowsFromSRD = () => {
  getSetItems('updateSavingThrowsFromSRD', {
    collectionArray: ['saving_throws_srd'],
    callback: (v, finalSetAttrs) => {
      const savingThrowsFromSRD = v.saving_throws_srd;
      const pbVar = '@{PB}';

      if (savingThrowsFromSRD.indexOf('Str') !== -1) {
        finalSetAttrs.strength_save_prof = pbVar;
      }
      if (savingThrowsFromSRD.indexOf('Dex') !== -1) {
        finalSetAttrs.dexterity_save_prof = pbVar;
      }
      if (savingThrowsFromSRD.indexOf('Con') !== -1) {
        finalSetAttrs.constitution_save_prof = pbVar;
      }
      if (savingThrowsFromSRD.indexOf('Int') !== -1) {
        finalSetAttrs.intelligence_save_prof = pbVar;
      }
      if (savingThrowsFromSRD.indexOf('Wis') !== -1) {
        finalSetAttrs.wisdom_save_prof = pbVar;
      }
      if (savingThrowsFromSRD.indexOf('Cha') !== -1) {
        finalSetAttrs.charisma_save_prof = pbVar;
      }
    },
  });
};
on('change:saving_throws_srd', () => {
  updateSavingThrowsFromSRD();
});

on('change:spells_srd', () => {
  updateSpellsFromSRD();
});

const updateAttachers = () => {
  const collectionArray = ['attacher_initiative', 'attacher_death_saving_throw', 'attacher_hit_dice', 'attacher_attack', 'attacher_spell', 'attacher_skill', 'attacher_crit'];
  const itemsToPush = ['initiative', 'death_saving_throw', 'hit_dice', 'attack', 'spell', 'skill'];
  for (const ability of ABILITIES) {
    collectionArray.push(`attacher_${ability}_check`);
    collectionArray.push(`attacher_${ability}_saving_throw`);
    itemsToPush.push(`${ability}_check`);
    itemsToPush.push(`${ability}_saving_throw`);
  }

  getSetRepeatingItems('updateAttachers', {
    repeatingItems: ['repeating_attacher'],
    collectionArray,
    collectionArrayAddItems: ['name', 'freetext', 'freeform', 'crit_attacher'],
    itemsToPush,
    itemToPushSuffix: 'attacher',
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const itemToPush of itemsToPush) {
        finalSetAttrs[`attacher_${itemToPush}`] = '';
      }
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        for (const itemToPush of itemsToPush) {
          const attacher = v[`${repeatingString}${itemToPush}_attacher`];
          if (exists(attacher) && attacher === 'on') {
            const attacherName = v[`${repeatingString}name`] || '';

            const freeText = v[`${repeatingString}freetext`];
            if (exists(attacherName) && exists(freeText)) {
              const critAttacher = v[`${repeatingString}crit_attacher`];
              if (critAttacher === 'on') {
                finalSetAttrs[`attacher_${itemToPush}`] += `{{crit_name=${attacherName}}} `;
                finalSetAttrs[`attacher_${itemToPush}`] += `{{crit_text=${freeText}}} `;
              } else {
                finalSetAttrs[`attacher_${itemToPush}`] += `{{${attacherName}=${freeText}}} `;
              }
            }
            const freeForm = v[`${repeatingString}freeform`];
            if (exists(freeForm)) {
              finalSetAttrs[`attacher_${itemToPush}`] += `${freeForm} `;
            }
          }
        }
      }
    },
  });
};
on('change:repeating_attacher remove:repeating_attacher', () => {
  updateAttachers();
});

const updateNPCChallenge = () => {
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

  getSetItems('updateNPCChallenge', {
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
};

on('change:challenge', () => {
  updateNPCChallenge();
});

const updateNPCHPFromSRD = () => {
  getSetItems('updateNPCHPFromSRD', {
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
};
on('change:hp_srd', () => {
  updateNPCHPFromSRD();
});

const updateNPCHP = () => {
  getSetItems('updateNPCHP', {
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
              hpFormula += `${addArithmeticOperator(hpFormula, amount)}`;
            } else if (splitFormula[1] === '-') {
              totalHP -= amount;
              hpFormula += `${addArithmeticOperator(hpFormula, amount)}`;
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
};
on('change:hit_dice change:hit_die change:hp_extra change:constitution_mod', () => {
  updateNPCHP();
});
const updateNPCHD = () => {
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
      collectionArray.push(`hd_${key}_max`);
      collectionArray.push(`hd_${key}_query`);
      collectionArray.push(`hd_${key}_toggle`);
    }
  }
  getSetItems('updateNPCHD', {
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
};
on('change:hit_dice change:hit_die', () => {
  updateNPCHD();
});

const updateNPCAC = () => {
  getSetItems('updateNPCAC', {
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
};
on('change:ac_srd', () => {
  updateNPCAC();
});

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

const parseSRDContentSection = (content, finalSetAttrs, title, name) => {
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
};

const updateNPCContent = () => {
  const collectionArray = ['content_srd'];
  for (const ability of ABILITIES) {
    collectionArray.push(ability);
  }

  getSetItems('updateNPCContent', {
    collectionArray,
    callback: (v, finalSetAttrs) => {
      let content = v.content_srd;
      let regionalEffects;
      let lairActions;
      let repeatingString;

      setDefaultAbility(v, finalSetAttrs);

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
          finalSetAttrs.regional_effects_fade = regionalEffectsList.slice(-1)[0];
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

        content = parseSRDContentSection(content, finalSetAttrs, 'Legendary Actions', 'legendaryaction');
        content = parseSRDContentSection(content, finalSetAttrs, 'Reactions', 'reaction');
        content = parseSRDContentSection(content, finalSetAttrs, 'Actions', 'action');
        parseSRDContentSection(content, finalSetAttrs, 'Traits', 'trait');
      }
    },
  });
};
on('change:content_srd', () => {
  updateNPCContent();
});

const parseDamage = (finalSetAttrs, repeatingString, freetext, regex, name, spellMods, meleeMods, spellAttack, rangedAttack, dexMod) => {
  const damageParseRegex = /(\d+d?\d+)(?:\s?(?:\+|\-)\s?(\d+))?/gi;
  const damage = regex.exec(freetext);
  let damageBonus;
  if (damage) {
    /*
     1 is damage with dice. Example '2d6+4'
     2 is damage type. Example 'slashing' or 'lightning or thunder'
     */
    if (damage[1]) {
      const damageParsed = damageParseRegex.exec(damage[1]);
      if (damageParsed) {
        if (damageParsed[1]) {
          finalSetAttrs[repeatingString + name] = damageParsed[1];
        }
        if (damageParsed[2]) {
          damageBonus = damageParsed[2];
        }
      }
    }
    damageBonus = getCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, `${name}_ability`, damageBonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
    if (damage[2]) {
      finalSetAttrs[`${repeatingString}${name}_type`] = damage[2];
    }
    if (damageBonus) {
      finalSetAttrs[`${repeatingString}${name}_bonus`] = damageBonus;
    }
    freetext = freetext.replace(regex, '');
    finalSetAttrs[`${repeatingString}${name}_toggle`] = TOGGLE_VARS[name];
  }
  return freetext;
};

const parseAction = (type, rowId) => {
  const collectionArray = ['level', 'challenge', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability'];
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }
  const damageSyntax = /(?:(\d+d?\d+(?:\s\+\s\d+)?)(?:\))?)\s*?/;
  const damageType = /((?:[a-zA-Z]+|[a-zA-Z]+\s(?:or|and)\s[a-zA-Z]+)(?:\s*?\([a-zA-Z\s]+\))?)\s*damage\s?(\([a-zA-Z'\s]+\))?/;
  const altDamageSyntax = /(?:,\s*?or\s*?)/;
  const plus = /\s*?plus\s*?/;
  const savingThrowRe = /(?:DC)\s*?(\d+)\s*?([a-zA-Z]*)\s*?(?:saving throw)/;
  const saveSuccess = /or\s(.*)?\son a successful one./;
  const damageRegex = new RegExp(damageSyntax.source + damageType.source, 'i');
  const damagePlusRegex = new RegExp(plus.source + damageSyntax.source + damageType.source, 'i');
  const altDamageRegex = new RegExp(altDamageSyntax.source + damageSyntax.source + damageType.source, 'i');
  const savingThrowRegex = new RegExp(savingThrowRe.source, 'i');
  const saveSuccessRegex = new RegExp(saveSuccess.source, 'i');

  const typeRegex = /(melee|ranged|melee or ranged)\s*(spell|weapon)\s*attack/gi;
  const toHitRegex = /:\s?\+\s?(\d+)\s*(?:to hit)/gi;
  const reachRegex = /(?:reach)\s?(\d+)\s?(?:ft)/gi;
  const rangeRegex = /(?:range)\s?(\d+)\/(\d+)\s?(ft)/gi;
  const spellcastingRegex = /(\d+)\w+\slevel\s\((\d+)\s?slot(?:s)?\)/gi;
  const spellcastingLevelRegex = /(\d+)(?:st|dn|rd|th)-level spellcaster/i;
  const spellcastingAbilityRegex = /spellcasting ability is (\w+)/i;

  getSetRepeatingItems('parseAction', {
    repeatingItems: [`repeating_${type}`],
    collectionArray,
    collectionArrayAddItems: ['name', 'freetext', 'type'],
    rowId,
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      const pb = getPB(v.level, v.challenge);
      const strMod = getIntValue(v.strength_mod);
      const dexMod = getIntValue(v.dexterity_mod);
      const conMod = getIntValue(v.constitution_mod);
      const intMod = getIntValue(v.intelligence_mod);
      const wisMod = getIntValue(v.wisdom_mod);
      const chaMod = getIntValue(v.charisma_mod);
      const meleeMods = [strMod, dexMod];
      const spellMods = [intMod, wisMod, chaMod];
      const abilityMods = [strMod, dexMod, conMod, intMod, wisMod, chaMod];

      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        let rangedAttack = false;
        let spellAttack = false;

        const name = v[`${repeatingString}name`];
        let freetext = v[`${repeatingString}freetext`];

        if (name && name.indexOf('Spellcasting') !== -1) {
          const spellcastingSearch = spellcastingAbilityRegex.exec(freetext);
          if (spellcastingSearch && spellcastingSearch[1]) {
            const spellcastingAbility = spellcastingSearch[1].toLowerCase();
            finalSetAttrs.default_ability = `@{${spellcastingAbility}_mod}`;
          }
          const spellcastingLevelSearch = spellcastingLevelRegex.exec(freetext);
          if (spellcastingLevelSearch && spellcastingLevelSearch[1]) {
            finalSetAttrs.caster_level = spellcastingLevelSearch[1];
          }

          let match;
          while ((match = spellcastingRegex.exec(freetext)) !== null) {
            if (match && match[1] && match[2]) {
              finalSetAttrs[`spell_slots_l${match[1]}_bonus`] = match[2];
            }
          }
        }

        const actionType = typeRegex.exec(freetext);
        if (actionType) {
          if (actionType[1]) {
            actionType[1] = actionType[1].toLowerCase();
            if (isUndefined(v[`${repeatingString}type`]) && actionType[1] === 'melee') {
              finalSetAttrs[`${repeatingString}type`] = 'Melee Weapon';
            } else if (isUndefined(v[`${repeatingString}type`]) && actionType[1] === 'ranged') {
              finalSetAttrs[`${repeatingString}type`] = 'Ranged Weapon';
              rangedAttack = true;
            } else {
              finalSetAttrs[`${repeatingString}type`] = 'Other';
            }
          }
          if (actionType[2]) {
            actionType[2] = actionType[2].toLowerCase();
            if (actionType[2] === 'spell') {
              spellAttack = true;
            }
          }
          freetext = freetext.replace(typeRegex, '');
        }

        const reach = reachRegex.exec(freetext);
        if (reach && reach[1]) {
          finalSetAttrs[`${repeatingString}reach`] = `${reach[1]}ft.`;
          freetext = freetext.replace(reachRegex, '');
        }
        const range = rangeRegex.exec(freetext);
        if (range && range[1] && range[2]) {
          finalSetAttrs[`${repeatingString}range`] = `${range[1]}ft.`;
          freetext = freetext.replace(rangeRegex, '');
        }

        const toHit = toHitRegex.exec(freetext);
        if (toHit && toHit[1]) {
          let hitBonus = toHit[1];
          hitBonus -= pb;

          hitBonus = getCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, 'attack_ability', hitBonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod);

          if (hitBonus) {
            finalSetAttrs[`${repeatingString}attack_bonus`] = hitBonus;
          }
          freetext = freetext.replace(toHitRegex, '');
          finalSetAttrs[`${repeatingString}roll_toggle`] = TOGGLE_VARS.roll;
        } else {
          finalSetAttrs[`${repeatingString}roll_toggle`] = '0';
        }

        const savingThrow = savingThrowRegex.exec(freetext);
        if (savingThrow) {
          if (savingThrow[1]) {
            let savingThrowTotal = savingThrow[1];
            savingThrowTotal -= 8;
            savingThrowTotal -= pb;

            savingThrowTotal = getAnyCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, 'saving_throw_ability', savingThrowTotal, abilityMods);

            if (savingThrowTotal) {
              finalSetAttrs[`${repeatingString}saving_throw_bonus`] = savingThrowTotal;
            }
            freetext = freetext.replace(savingThrowRegex, '');
            finalSetAttrs[`${repeatingString}saving_throw_toggle`] = TOGGLE_VARS.saving_throw;
          }
          if (savingThrow[2]) {
            finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = savingThrow[2].toUpperCase();
          }
          const halfDamage = saveSuccessRegex.exec(freetext);
          if (halfDamage && halfDamage[1]) {
            finalSetAttrs[`${repeatingString}saving_throw_success`] = halfDamage[1];
            freetext = freetext.replace(saveSuccessRegex, '');
          }
        } else {
          finalSetAttrs[`${repeatingString}saving_throw_toggle`] = '0';
        }

        freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damageRegex, 'damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        freetext = parseDamage(finalSetAttrs, repeatingString, freetext, altDamageRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damagePlusRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        if (!exists(finalSetAttrs[`${repeatingString}second_damage`])) {
          freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damageRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        }

        finalSetAttrs[`${repeatingString}extras_toggle`] = TOGGLE_VARS.extras;
        finalSetAttrs[`${repeatingString}toggle_details`] = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateAction(type, rowId);
    },
  });
};
on('change:repeating_trait:freetext', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_trait', eventInfo);
  parseAction('trait', repeatingInfo.rowId);
});
on('change:repeating_action:freetext', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_action', eventInfo);
  parseAction('action', repeatingInfo.rowId);
});
on('change:repeating_reaction:freetext', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_reaction', eventInfo);
  parseAction('reaction', repeatingInfo.rowId);
});
on('change:repeating_legendaryaction:freetext', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_legendaryaction', eventInfo);
  parseAction('legendaryaction', repeatingInfo.rowId);
});
on('change:repeating_lairaction:freetext', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_lairaction', eventInfo);
  parseAction('lairaction', repeatingInfo.rowId);
});

const countAction = (type) => {
  getSetRepeatingItems('countAction', {
    repeatingItems: [`repeating_${type}`],
    collectionArray: [`${type}s_exist`],
    callback: (v, finalSetAttrs, ids) => {
      if (ids.length > 0) {
        finalSetAttrs[`${type}s_exist`] = 1;
      } else if (exists(v[`${type}s_exist`])) {
        finalSetAttrs[`${type}s_exist`] = 0;
      }
    },
  });
};
on('change:repeating_trait remove:repeating_trait', () => {
  countAction('trait');
  updateActionChatMacro('trait');
});
on('change:repeating_action remove:repeating_action', () => {
  countAction('action');
  updateActionChatMacro('action');
});
on('change:repeating_reaction remove:repeating_reaction', () => {
  countAction('reaction');
  updateActionChatMacro('reaction');
});
on('change:repeating_legendaryaction remove:repeating_legendaryaction', () => {
  countAction('legendaryaction');
  updateActionChatMacro('legendaryaction');
});
on('change:repeating_lairaction remove:repeating_lairaction', () => {
  countAction('lairaction');
  updateActionChatMacro('lairaction');
});
on('change:repeating_regionaleffect remove:repeating_regionaleffect', () => {
  countAction('regionaleffect');
  updateActionChatMacro('regionaleffect');
});

const switchToNPC = () => {
  getSetItems('switchToNPC', {
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
};
on('change:is_npc', () => {
  switchToNPC();
});

on('change:size', () => {
  updateSize();
});
on('change:type', () => {
  updateType();
});

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
on('change:alignment', () => {
  updateAlignment();
});

const updateSenses = () => {
  getSetItems('updateSenses', {
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
};
on('change:senses', () => {
  updateSenses();
});

const updateLanguages = () => {
  getSetItems('updateLanguages', {
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
};
on('change:languages', () => {
  updateLanguages();
});

const updateSpeed = () => {
  getSetItems('updateSpeed', {
    collectionArray: ['npc_speed'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.npc_speed = v.npc_speed.toLowerCase();
      const match = finalSetAttrs.npc_speed.match(/^\s*(\d+)\s*ft/);
      if (match && match[1]) {
        finalSetAttrs.speed = match[1];
      }
    },
  });
};
on('change:npc_speed', () => {
  updateSpeed();
});

const updateACNote = () => {
  getSetItems('updateACNote', {
    collectionArray: ['ac_note'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.ac_note = v.ac_note.toLowerCase();
    },
  });
};
on('change:ac_note', () => {
  updateACNote();
});

const updateDamageResistancesVar = () => {
  getSetItems('updateDamageResistancesVar', {
    collectionArray: ['damage_resistances_var', 'damage_vulnerabilities_exist', 'damage_resistances_exist', 'damage_immunities_exist', 'condition_immunities_exist'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.damage_resistances_var = '';

      if (v.damage_vulnerabilities_exist) {
        finalSetAttrs.damage_resistances_var += '{{Damage Vulnerabilities=@{damage_vulnerabilities}}}';
      }
      if (v.damage_resistances_exist) {
        if (finalSetAttrs.damage_resistances_var !== '') {
          finalSetAttrs.damage_resistances_var += ' ';
        }
        finalSetAttrs.damage_resistances_var += '{{Damage Resistances=@{damage_resistances}}}';
      }
      if (v.damage_immunities_exist) {
        if (finalSetAttrs.damage_resistances_var !== '') {
          finalSetAttrs.damage_resistances_var += ' ';
        }
        finalSetAttrs.damage_resistances_var += '{{Damage Immunities=@{damage_immunities}}}';
      }
      if (v.condition_immunities_exist) {
        if (finalSetAttrs.damage_resistances_var !== '') {
          finalSetAttrs.damage_resistances_var += ' ';
        }
        finalSetAttrs.damage_resistances_var += '{{Condition Immunities=@{condition_immunities}}}';
      }
    },
  });
};
const updateDamageVulnerabilities = () => {
  getSetItems('updateDamageVulnerabilities', {
    collectionArray: ['damage_vulnerabilities'],
    callback: (v, finalSetAttrs) => {
      if (v.damage_vulnerabilities) {
        finalSetAttrs.damage_vulnerabilities_exist = 1;
        finalSetAttrs.damage_vulnerabilities = lowercaseDamageTypes(v.damage_vulnerabilities);
      } else {
        finalSetAttrs.damage_vulnerabilities_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};
on('change:damage_vulnerabilities', () => {
  updateDamageVulnerabilities();
});
const updateDamageResistances = () => {
  getSetItems('updateDamageResistances', {
    collectionArray: ['damage_resistances'],
    callback: (v, finalSetAttrs) => {
      if (v.damage_resistances) {
        finalSetAttrs.damage_resistances_exist = 1;
        finalSetAttrs.damage_resistances = lowercaseDamageTypes(v.damage_resistances);
      } else {
        finalSetAttrs.damage_resistances_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};
on('change:damage_resistances', () => {
  updateDamageResistances();
});
const updateDamageImmunities = () => {
  getSetItems('updateDamageImmunities', {
    collectionArray: ['damage_immunities'],
    callback: (v, finalSetAttrs) => {
      if (v.damage_immunities) {
        finalSetAttrs.damage_immunities_exist = 1;
        finalSetAttrs.damage_immunities = lowercaseDamageTypes(v.damage_immunities);
      } else {
        finalSetAttrs.damage_immunities_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};
on('change:damage_immunities', () => {
  updateDamageImmunities();
});
const updateConditionImmunities = () => {
  getSetItems('updateConditionImmunities', {
    collectionArray: ['condition_immunities'],
    callback: (v, finalSetAttrs) => {
      if (v.condition_immunities) {
        finalSetAttrs.condition_immunities_exist = 1;
        finalSetAttrs.condition_immunities = lowercaseDamageTypes(v.condition_immunities);
      } else {
        finalSetAttrs.condition_immunities_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};
on('change:condition_immunities', () => {
  updateConditionImmunities();
});

const oldValueToNew = (v, finalSetAttrs, repeatingString, newRepeatingString, field) => {
  finalSetAttrs[`${newRepeatingString}${field}`] = v[`${repeatingString}${field}`];
};
const resourcesToTraits = () => {
  getSetRepeatingItems('resourcesToTraits', {
    repeatingItems: ['repeating_resource'],
    collectionArrayAddItems: ['name', 'uses', 'uses_max', 'toggle_details', 'recharge', 'extras_toggle', 'freetext', 'freeform'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      const fieldsToSwap = ['name', 'uses', 'uses_max', 'toggle_details', 'recharge', 'extras_toggle', 'freetext', 'freeform'];
      for (const id of ids) {
        for (const field of fieldsToSwap) {
          oldValueToNew(v, finalSetAttrs, `${repeatingItem}_${id}_`, `repeating_trait_${generateRowID()}_`, field);
        }
      }
    },
  });
};
const classFeaturesToTraits = () => {
  getSetRepeatingItems('classFeaturesToTraits', {
    repeatingItems: ['repeating_classfeature'],
    collectionArrayAddItems: ['name', 'uses', 'uses_max', 'recharge', 'saving_throw_toggle', 'saving_throw_condition', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_vs_ability', 'saving_throw_failure', 'saving_throw_success', 'damage_toggle', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'second_damage_toggle', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'extras_toggle', 'emote', 'freetext', 'freeform'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      const fieldsToSwap = ['name', 'uses', 'uses_max', 'recharge', 'saving_throw_toggle', 'saving_throw_condition', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_vs_ability', 'saving_throw_failure', 'saving_throw_success', 'damage_toggle', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'second_damage_toggle', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'extras_toggle', 'emote', 'freetext', 'display_text', 'freeform'];

      for (const id of ids) {
        for (const field of fieldsToSwap) {
          oldValueToNew(v, finalSetAttrs, `${repeatingItem}_${id}_`, `repeating_trait_${generateRowID()}_`, field);
        }
      }
    },
  });
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
on('change:generate_skills', () => {
  generateSkills();
});

on('change:pb', () => {
  updateSkill();
  updateAttack();
  updateSpell();
  updateJackOfAllTrades();
  updateRemarkableAthlete();
  updateActions();
});
on('change:strength_mod change:dexterity_mod change:constitution_mod change:intelligence_mod change:wisdom_mod change:charisma_mod', () => {
  updateSkill();
  updateAttack();
  updateSpell();
  updateActions();
});

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
        if (versionCompare(version, '2.1.0') < 0) {
          updateNPCChallenge();
          updateDamageVulnerabilities();
          updateDamageResistances();
          updateDamageImmunities();
          updateConditionImmunities();
          updateLanguages();
          updateSenses();
        }
        if (versionCompare(version, '2.1.3') < 0) {
          updateType();
          updateAlignment();
        }
        if (versionCompare(version, '2.1.5') < 0) {
          updateNPCAC();
        }
        if (versionCompare(version, '2.1.10') < 0) {
          updateSavingThrows();
        }
        if (versionCompare(version, '2.1.13') < 0) {
          weighEquipment();
        }
        if (versionCompare(version, '2.1.15') < 0) {
          displayTextForTraits();
        }
        if (versionCompare(version, '2.2.2') < 0) {
          resourcesToTraits();
        }
        if (versionCompare(version, '2.2.4') < 0) {
          updateInitiative();
        }
        if (versionCompare(version, '2.2.5') < 0) {
          weighAmmo();
        }
        if (versionCompare(version, '2.2.6') < 0) {
          updateLevels();
          extasToExtrasFix('repeating_attack');
          extasToExtrasFix('repeating_action');
          extasToExtrasFix('repeating_spell');
        }
        if (versionCompare(version, '2.3.3') < 0) {
          updateAttachers();
        }
        if (versionCompare(version, '2.4.2') < 0) {
          updateAbilityModifiers();
          updateActionChatMacro('trait');
          updateActionChatMacro('action');
          updateActionChatMacro('reaction');
          updateActionChatMacro('legendaryaction');
        }
        if (versionCompare(version, '2.4.3') < 0) {
          setClassFeatures();
        }
        if (versionCompare(version, '2.4.7') < 0) {
          classFeaturesToTraits();
          updateAction('trait');
        }
        if (versionCompare(version, '2.4.8') < 0) {
          fixRollTwo();
        }
        if (versionCompare(version, '2.4.12') < 0) {
          armorPlusDexRemoval();
          updateArmor();
        }
        if (versionCompare(version, '3.1.0') < 0) {
          updateAttackChatMacro();
        }
        if (versionCompare(version, '3.1.1') < 0) {
          updateActionChatMacro('lairaction');
          updateActionChatMacro('regionaleffect');
        }
        if (versionCompare(version, '3.2.1') < 0) {
          updateCritDamage();
        }
        if (versionCompare(version, '3.2.3') < 0) {
          updateDamageResistancesVar();
        }
        if (versionCompare(version, '3.5.0') < 0) {
          updateSpellChatMacro();
        }
        if (versionCompare(version, '3.5.1') < 0) {
          updateSpellSlots();
        }
        if (versionCompare(version, '3.6.1') < 0) {
          updateNPCHD();
          switchToNPC();
        }
        if (versionCompare(version, '4.1.4') < 0) {
          updateArmorAbility();
          updateActionComponents();
          updateSkillAbility();
        }
        if (versionCompare(version, '4.1.5') < 0) {
          updateSkill();
        }
        if (versionCompare(version, '4.2.0') < 0) {
          updateD20Mod();
          updateShapedD20();
        }
        if (versionCompare(version, '4.2.1') < 0) {
          updateActionComponentsToRemoveExtraFields();
          updateAbilityChecksMacro();
          removeToggleVar();
        }
        if (versionCompare(version, '4.2.3') < 0) {
          updateArmor();
        }
        if (versionCompare(version, '4.4.0') < 0) {
          updateCustomSavingThrows();
          newAttackToggle();
          generateHigherLevelQueries();
        }
        if (versionCompare(version, '4.4.1') < 0) {
          newAbilityDefaults();
        }
        if (versionCompare(version, '4.4.2') < 0) {
          updateSpellShowHide();
        }
        if (versionCompare(version, '5.0.0') < 0) {
          updateSpellToTranslations();
        }
        if (versionCompare(version, '5.0.3') < 0) {
          updateSpell();
          updateAttack();
          updateActions();
          updateCustomSavingThrowToggle();
        }
        if (versionCompare(version, '5.0.4') < 0) {
          updateDefaultAbility();
        }
        if (versionCompare(version, '5.0.6') < 0) {
          updateSpellLevelForCantrips();
        }
        if (versionCompare(version, '5.0.8') < 0) {
          newAttackToggleTwo();
        }
        if (versionCompare(version, '5.2.3') < 0) {
          updateHideFreetext();
        }
      }

      if (isUndefinedOrEmpty(version) || !version || version !== currentVersion) {
        finalSetAttrs.version = currentVersion;
      }
    },
  });
};
on('sheet:opened', () => {
  sheetOpened();
});

const importData = () => {
  getSetItems('importData', {
    collectionArray: ['import_data', 'version'],
    callback: (v, finalSetAttrs) => {
      if (v.import_data) {
        const importObject = JSON.parse(v.import_data);

        if (importObject.npc) {
          if (!v.version) {
            sheetOpened();
          }
          for (const prop in importObject.npc) {
            if (importObject.npc.hasOwnProperty(prop)) {
              finalSetAttrs[prop] = importObject.npc[prop];
            }
          }
        }
        if (importObject.spells) {
          importObject.spells.forEach(spell => {
            const repeatingString = `repeating_spell_${generateRowID()}_`;
            for (const prop in spell) {
              if (spell.hasOwnProperty(prop)) {
                finalSetAttrs[`${repeatingString}${prop}`] = spell[prop];
              }
            }
          });
        }
        finalSetAttrs.import_data = '';
        finalSetAttrs.import_data_present = 'off';
      }
    },
  });
};

const deleteImportData = () => {
  getSetItems('deleteImportData', {
    collectionArray: ['import_data', 'version'],
    callback: (v, finalSetAttrs) => {
      const importObject = JSON.parse(v.import_data);
      if (importObject.npc && !v.version) {
        sheetOpened(); // NPC import will have wiped all the existing attributes
      }
      finalSetAttrs.import_data = '';
      finalSetAttrs.import_data_present = 'off';
    },
  });
};
on('change:accept_import', importData);
on('change:reject_import', deleteImportData);
