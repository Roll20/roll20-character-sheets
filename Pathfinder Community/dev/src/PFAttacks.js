'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils from './PFUtils';
import * as PFUtilsAsync from './PFUtilsAsync';
import * as PFMacros from './PFMacros';
import * as PFMigrate from './PFMigrate';
import * as PFAttackOptions from './PFAttackOptions';
import * as PFAttackGrid from './PFAttackGrid';
import * as PFInventory from './PFInventory';
import * as PFSpells from './PFSpells';
import * as PFAbility from './PFAbility';
import * as PFSize from './PFSize';

/** module for repeating_weapon section  */
/* **********************************ATTACKS PAGE ********************************** */
export var damageRowAttrsLU = [
    '_damage-ability-max',
    '_damage-ability',
    '_damage-ability-mod',
    '_damage-mod',
    '_damage_ability_mult',
    '_enhance',
    '_total-damage',
    '_attack-type',
    '_isranged',
    'buff_dmg_power_attack-total',
  ],
  updateRowAttrsLU = [
    '_attack-mod',
    '_attack-type',
    '_attack-type-mod',
    '_crit_conf_mod',
    '_crit_confirm',
    '_crit_confirm_temp',
    '_isranged',
    '_masterwork',
    '_proficiency',
    '_total-attack',
    '_attack-type_macro_insert',
    '_damage-type_macro_insert',
  ].concat(damageRowAttrsLU),
  sizeFieldsLU = ['_default_damage-dice-num', '_default_damage-die', '_default_size', '_not_default_size', '_damage-dice-num', '_damage-die', '_size_affects'],
  updateCharAttrs = [
    'attk_ranged_crit_conf',
    'attk_ranged2_crit_conf',
    'attk_melee_crit_conf',
    'attk_melee2_crit_conf',
    'attk_cmb_crit_conf',
    'attk_cmb2_crit_conf',
    'buff_DMG-total',
    'buff_dmg_melee-total',
    'buff_dmg_ranged-total',
    'buff_dmg_melee2-total',
    'buff_dmg_ranged2-total',
    'condition-Sickened',
    'size',
    'default_char_size',
    'modify_dmg_by_size',
    'buff_dmg_power_attack-total',
    'buff_crit_conf-total',
  ],
  linkedAttackType = {equipment: 1, spell: 2, ability: 3, weapon: 4};

function getRepeatingAddInMacroPortion(macro, toggle, portion) {
  if (!(macro === '' || macro === '0' || macro === undefined || macro === null || toggle === '' || toggle === '0' || toggle === undefined || toggle === null)) {
    return ' ' + portion;
  }
  return '';
}
function getDamageMult(str) {
  var abilityMult = 1;
  if (str) {
    abilityMult = Number(String(str).replace(',', '.'));
    if (!abilityMult) {
      abilityMult = 1;
    }
  }
  return abilityMult;
}
function updateRepeatingAddInMacro(id, eventInfo) {
  var idStr = SWUtils.getRepeatingIDStr(id),
    prefix = 'repeating_weapon_' + idStr,
    attackType = prefix + 'attack-type',
    tattackPlusNm = prefix + 'toggle_attack_macro_insert',
    tdamagePlusNm = prefix + 'toggle_damage_macro_insert',
    attackPlusNm = prefix + 'attack_macro_insert',
    damagePlusNm = prefix + 'damage_macro_insert',
    tattackGlobalNm = 'toggle_global_attack_macro_insert',
    tdamageGlobalNm = 'toggle_global_damage_macro_insert',
    attackGlobalNm = 'global_attack_macro_insert',
    damageGlobalNm = 'global_damage_macro_insert',
    attackMacroNm = prefix + 'attack_macro',
    damageMacroNm = prefix + 'damage_macro',
    fields = ['adv_macro_show', attackType, attackGlobalNm, damageGlobalNm, attackPlusNm, damagePlusNm, attackMacroNm, damageMacroNm];
  getAttrs(fields, function (v) {
    var showMacros = parseInt(v.adv_macro_show, 10) || 0,
      newAtkMacro = '[[ @{total-attack} ]]',
      newDmgMacro = '[[ @{total-damage} ]]',
      setter = {};
    if (showMacros) {
      newAtkMacro += getRepeatingAddInMacroPortion(v[attackPlusNm], v[tattackPlusNm], '@{toggle_attack_macro_insert}');
      newAtkMacro += ' @{attack-type_macro_insert}';
      newAtkMacro += getRepeatingAddInMacroPortion(v[attackGlobalNm], v[tattackGlobalNm], '@{toggle_global_attack_macro_insert}');
      newDmgMacro += ' @{damage-type_macro_insert}';
      newDmgMacro += getRepeatingAddInMacroPortion(v[damagePlusNm], v[tdamagePlusNm], '@{toggle_damage_macro_insert}');
      newDmgMacro += getRepeatingAddInMacroPortion(v[damageGlobalNm], v[tdamageGlobalNm], '@{toggle_global_damage_macro_insert}');
    }
    if (newAtkMacro !== v[attackMacroNm]) {
      setter[attackMacroNm] = newAtkMacro;
    }
    if (newDmgMacro !== v[damageMacroNm]) {
      setter[damageMacroNm] = newDmgMacro;
    }
    if (_.size(setter)) {
      SWUtils.setWrapper(setter);
    }
  });
}
function setAdvancedMacroCheckbox() {
  getAttrs(
    [
      'adv_macro_show',
      'global_melee_macro_insert',
      'global_ranged_macro_insert',
      'global_cmb_macro_insert',
      'global_attack_macro_insert',
      'global_melee_damage_macro_insert',
      'global_ranged_damage_macro_insert',
      'global_cmb_damage_macro_insert',
      'global_damage_macro_insert',
    ],
    function (v) {
      var showAdv = parseInt(v.adv_macro_show, 10) || 0,
        hasAnyMacros = _.reduce(
          v,
          function (tot, value, fieldname) {
            if (fieldname !== 'adv_macro_show' && !(value === '' || value === '0' || value === undefined || value === null)) {
              tot += 1;
            }
            return tot;
          },
          0,
        );
      //TAS.debug("setAdvancedMacroCheckbox, checked:" + showAdv + " , has macros:" + hasAnyMacros);
      if (hasAnyMacros && !showAdv) {
        SWUtils.setWrapper(
          {
            adv_macro_show: 1,
          },
          PFConst.silentParams,
        );
      }
    },
  );
}

/********* REPEATING WEAPON FIELDSET *********/
function setRepeatingWeaponInsertMacro(id, eventInfo) {
  var done = function () {}, //updateRepeatingAddInMacro(id,eventInfo);},
    idStr = SWUtils.getRepeatingIDStr(id),
    prefix = 'repeating_weapon_' + idStr,
    attkTypeField = prefix + 'attack-type';
  getAttrs([attkTypeField], function (v) {
    var attkType = PFUtils.findAbilityInString(v[attkTypeField]),
      setter = {};
    if (attkType) {
      attkType = attkType.replace('attk-', '');
      setter[prefix + 'attack-type_macro_insert'] = PFAttackGrid.attackGridFields[attkType].attackmacro;
      setter[prefix + 'damage-type_macro_insert'] = PFAttackGrid.attackGridFields[attkType].damagemacro;
    } else {
      setter[prefix + 'attack-type_macro_insert'] = '0';
    }
    //TAS.debug("setRepeatingWeaponInsertMacro",setter);
    SWUtils.setWrapper(setter, PFConst.silentParams, done);
  });
}
function updateRepeatingWeaponAttackQuick(eventInfo, newval, oldval, callback) {
  var diff = (newval || 0) - (oldval || 0);
  if (diff !== 0) {
    getAttrs(['repeating_weapon_total-attack'], function (v) {
      var curr = parseInt(v['repeating_weapon_total-attack'], 10) || 0;
      curr += diff;
      setAttrs({'repeating_weapon_total-attack': curr}, PFConst.silentParams, callback);
    });
  }
}

/** updateRepeatingWeaponAttack - calculates total-attack
 * @param {string} id optional = id of row, if blank we are within the context of the row
 * @param {string} overrideAttr optional = if we are passing in a value this is the fieldname after "repeating_weapon_"
 * @param {number} overrideValue optional = if overrideAttr then this should be a number usually int but it won't check
 */
export function updateRepeatingWeaponAttackAsync(id, eventInfo) {
  //is it faster to not do the idStr each time? try it with ?:
  var resetOptionsWhenDone = function () {
      PFAttackOptions.resetOption(id, eventInfo);
    },
    idStr = SWUtils.getRepeatingIDStr(id),
    attackTypeField = 'repeating_weapon_' + idStr + 'attack-type',
    enhanceField = 'repeating_weapon_' + idStr + 'enhance',
    mwkField = 'repeating_weapon_' + idStr + 'masterwork',
    attkTypeModField = 'repeating_weapon_' + idStr + 'attack-type-mod',
    profField = 'repeating_weapon_' + idStr + 'proficiency',
    attkMacroModField = 'repeating_weapon_' + idStr + 'attack-mod',
    totalAttackField = 'repeating_weapon_' + idStr + 'total-attack';
  getAttrs([enhanceField, mwkField, attackTypeField, attkTypeModField, profField, attkMacroModField, totalAttackField], function (v) {
    var enhance = 0,
      masterwork = 0,
      attkTypeMod = 0,
      prof = 0,
      attkMacroMod = 0,
      currTotalAttack = 0,
      attackType = '',
      newTotalAttack = 0,
      setter = {};
    try {
      attkMacroMod = parseInt(v[attkMacroModField], 10) || 0;
      currTotalAttack = parseInt(v[totalAttackField], 10) || 0;
      attackType = v[attackTypeField];
      if (attackType === 'dual') {
        newTotalAttack = attkMacroMod;
      } else {
        enhance = parseInt(v[enhanceField], 10) || 0;
        masterwork = parseInt(v[mwkField], 10) || 0;
        attkTypeMod = parseInt(v[attkTypeModField], 10) || 0;
        prof = parseInt(v[profField], 10) || 0;
        attkMacroMod = parseInt(v[attkMacroModField], 10) || 0;
        newTotalAttack = Math.max(enhance, masterwork) + attkTypeMod + prof + attkMacroMod;
      }
      if (newTotalAttack !== currTotalAttack || isNaN(currTotalAttack)) {
        setter[totalAttackField] = newTotalAttack;
        SWUtils.setWrapper(setter, PFConst.silentParams, resetOptionsWhenDone);
      }
    } catch (e) {
      TAS.error('PFAttacks.updateRepeatingWeaponAttack');
    }
  });
}
function updateRepeatingWeaponDamageDiff(id, newval, oldval, callback) {
  var diff = (newval || 0) - (oldval || 0);
  if (diff !== 0) {
    getAttrs([`repeating_weapon_${id}_total-damage`], function (v) {
      var curr = parseInt(v[`repeating_weapon_${id}_total-damage`], 10) || 0;
      curr += diff;
      setAttrs({[`repeating_weapon_${id}_total-damage`]: curr}, PFConst.silentParams, callback);
    });
  }
}

function updateRepeatingWeaponCritConfDiff(eventInfo, newval, oldval, callback) {
  var diff = (newval || 0) - (oldval || 0);
  getAttrs(['repeating_weapon_crit_conf_mod'], function (v) {
    var curr = parseInt(v['repeating_weapon_crit_conf_mod'], 10) || 0;
    curr += diff;
    setAttrs({repeating_weapon_crit_conf_mod: curr}, PFConst.silentParams, callback);
    // updateRepeatingWeaponCritAsync(null, eventInfo);
  });
}
export function updateRepeatingWeaponAbilityDropdowns(eventInfo, ability) {
  getSectionIDs('repeating_weapon', function (ids) {
    _.each(ids, function (id) {
      PFUtilsAsync.setRepeatingDropdownValue(
        'weapon',
        id,
        'damage-ability',
        'damage-ability-mod',
        function (newval, oldval, changed) {
          if (changed) {
            updateRepeatingWeaponDamageDiff(id, newval, oldval);
          }
        },
        true,
      );
    });
  });
}
/** updateRepeatingWeaponDamage - updates total-damage*/
function updateRepeatingWeaponDamage(id, eventInfo) {
  var resetOptionsWhenDone = function () {
      PFAttackOptions.resetOption(id, eventInfo);
    },
    rangedUpdate = false,
    idStr = SWUtils.getRepeatingIDStr(id),
    maxname = 'repeating_weapon_' + idStr + 'damage-ability-max',
    modname = 'repeating_weapon_' + idStr + 'damage-ability-mod',
    totalDamageField = 'repeating_weapon_' + idStr + 'total-damage',
    enhanceField = 'repeating_weapon_' + idStr + 'enhance',
    miscDmgField = 'repeating_weapon_' + idStr + 'damage-mod',
    abilityMultField = 'repeating_weapon_' + idStr + 'damage_ability_mult',
    attacktypeField = 'repeating_weapon_' + idStr + 'attack-type',
    rangedField = 'repeating_weapon_' + idStr + 'isranged';
  //TAS.debug("at PFAttacks.updateRepeatingWeaponDamage evenetinfo: ",eventInfo);
  if (eventInfo && eventInfo.sourceAttribute.toLowerCase().indexOf('buff_dmg_range') >= 0) {
    rangedUpdate = true;
  }
  getAttrs(
    [
      maxname,
      modname,
      'buff_DMG-total',
      'buff_dmg_melee-total',
      'buff_dmg_ranged-total',
      'buff_dmg_melee2-total',
      'buff_dmg_ranged2-total',
      'buff_dmg_power_attack-total',
      'condition-Sickened',
      rangedField,
      totalDamageField,
      attacktypeField,
      enhanceField,
      miscDmgField,
      abilityMultField,
    ],
    function (v) {
      var maxA,
        ability,
        abilityMult,
        abilityTot,
        damageBuffs = 0,
        currTotalDmg,
        dmgConditions,
        genDmgBuff = 0,
        tempint,
        miscDmg,
        enhance,
        totalDamage,
        rangedAttack = 0,
        setter = {},
        meleeAttack = 0,
        secondAttack = 0,
        damagePowerAttack = 0;
      rangedAttack = /range/i.test(v[attacktypeField]);
      if (!rangedAttack) {
        meleeAttack = /melee/i.test(v[attacktypeField]);
      }
      secondAttack = /2/.test(v[attacktypeField]);
      ability = parseInt(v[modname], 10) || 0;
      abilityMult = 1;
      dmgConditions = parseInt(v['condition-Sickened'], 10) || 0;
      currTotalDmg = parseInt(v[totalDamageField], 10);
      miscDmg = parseInt(v[miscDmgField], 10) || 0;
      enhance = parseInt(v[enhanceField], 10) || 0;
      //TAS.debug('PFAttacks type is :'+v[attacktypeField]+ ', update damage values are :',v);
      //if(v[attacktypeField] !== '0' && v[attacktypeField] !=='dual'){
      if (rangedAttack) {
        damageBuffs = parseInt(v['buff_dmg_ranged-total'], 10) || 0;
        damagePowerAttack = 0;
        if (secondAttack) {
          tempint = parseInt(v['buff_dmg_ranged2-total'], 10) || 0;
          damageBuffs = damageBuffs + tempint;
          damagePowerAttack = 0;
        }
      } else if (meleeAttack) {
        damageBuffs = parseInt(v['buff_dmg_melee-total'], 10) || 0;
        damagePowerAttack = parseInt(v['buff_dmg_power_attack-total'], 10) || 0;
        if (secondAttack) {
          tempint = parseInt(v['buff_dmg_melee2-total'], 10) || 0;
          damageBuffs = damageBuffs + tempint;
        }
      } else {
        damageBuffs = 0;
      }
      genDmgBuff = parseInt(v['buff_DMG-total'], 10) || 0;
      damageBuffs += genDmgBuff;

      abilityMult = getDamageMult(v[abilityMultField]) || 1;
      damageBuffs -= dmgConditions;
      maxA = parseInt(v[maxname], 10);
      if (!rangedAttack || isNaN(maxA)) {
        maxA = 999;
      }
      //Multiplier only applies to an Ability bonus.
      if (ability <= 0) {
        abilityMult = 1;
        TAS.debug('~~~~~~ Multiplier only applies to an Ability bonus. Current Ability-Mod: ' + ability);
      }
      abilityTot = Math.floor(Math.min(abilityMult * (ability + damagePowerAttack), maxA));
      totalDamage = abilityTot + damageBuffs + miscDmg + enhance;
      if (totalDamage !== currTotalDmg || isNaN(currTotalDmg)) {
        //TAS.debug("setting damage to "+totalDamage);
        setter[totalDamageField] = totalDamage;
      }
      if (_.size(setter)) {
        SWUtils.setWrapper(setter, PFConst.silentParams, resetOptionsWhenDone);
      }
    },
  );
}
/** Updates crit_conf_mod for an attack row synchronously
 * @param {string} id  row to update
 * @param {Map<string,Number>} v  values from getAttrs already passed to parseInt
 * @param {Map<string,Number>} setter optional setter for setAttrs
 * @param {boolean} wasChecked  if true then we already verified all needed fields exist
 * @returns {Map<string,Number>} setter passed in or new map
 */
function updateRepeatingWeaponCrit(id, v, setter, wasChecked) {
  var idStr = SWUtils.getRepeatingIDStr(id),
    critConfirmTotalField = 'repeating_weapon_' + idStr + 'crit_conf_mod',
    critConfirmField = 'repeating_weapon_' + idStr + 'crit_confirm',
    critConfirmFieldTemp = 'repeating_weapon_' + idStr + 'crit_confirm_temp',
    attkTypeField = 'repeating_weapon_' + idStr + 'attack-type',
    attackBuff = v['buff_crit_conf-total'] || 0,
    critConfirmTemp = v[critConfirmFieldTemp] || 0,
    critConfirmBonus = 0,
    attkTypeForGrid = '',
    attackTypeBonusField = '',
    attackTypeBonus = 0,
    newBonus = 0;
  try {
    setter = setter || {};
    critConfirmBonus = v[critConfirmField] || 0;
    if (wasChecked || (v[attkTypeField] !== '0' && v[attkTypeField] !== 'dual')) {
      attkTypeForGrid = v[attkTypeField].replace('attk-', '');
      if (wasChecked || PFAttackGrid.attackGridFields[attkTypeForGrid]) attackTypeBonusField = PFAttackGrid.attackGridFields[attkTypeForGrid].crit;
      if (wasChecked || attackTypeBonusField) {
        attackTypeBonus = v[attackTypeBonusField] || 0;
      }
    }
    // newBonus = critConfirmBonus + attackTypeBonus + critConfirmTemp + attackBuff;
    newBonus = critConfirmBonus + attackTypeBonus + attackBuff;
    // if (newBonus !== (v[critConfirmTotalField] || 0)) {
    //   setter[critConfirmTotalField] = newBonus; // sets crit_conf_mod
    // }
    setter[critConfirmTotalField] = newBonus;
  } catch (err) {
    TAS.error('updateRepeatingWeaponCrit: error updating crit for id  ' + id, err);
  } finally {
    return setter;
  }
}
/** Updates crit_conf_mod for row. Called when crit_confirm is updated on a row
 * @param {string} id  row to update
 * @param {Map<string,string>} eventInfo from event
 */
function updateRepeatingWeaponCritAsync(id, eventInfo) {
  var idStr = SWUtils.getRepeatingIDStr(id),
    critConfirmTotalField = 'repeating_weapon_' + idStr + 'crit_conf_mod',
    critConfirmField = 'repeating_weapon_' + idStr + 'crit_confirm',
    critConfirmTempField = 'repeating_weapon_' + idStr + 'crit_confirm_temp',
    attkTypeField = 'repeating_weapon_' + idStr + 'attack-type',
    attrs = [
      'attk_ranged_crit_conf',
      'attk_ranged2_crit_conf',
      'attk_melee_crit_conf',
      'attk_melee2_crit_conf',
      'attk_cmb_crit_conf',
      'attk_cmb2_crit_conf',
      'buff_crit_conf-total',
      critConfirmTotalField,
      critConfirmField,
      attkTypeField,
      critConfirmTempField,
    ];
  getAttrs(attrs, function (v) {
    var setter = {};
    try {
      v = _.mapObject(v, function (val, key) {
        if (/attack\-type$/i.test(key) || /damage\-ability$/i.test(key) || /damage\-ability\-max$/i.test(key) || /damage_ability_mult$/i.test(key)) {
          return val;
        } else {
          return parseInt(val, 10) || 0;
        }
      });

      updateRepeatingWeaponCrit(id, v, setter);
    } catch (err) {
      TAS.error('updateRepeatingWeaponCritAsync: error updating crit for id  ' + id, err);
    } finally {
      if (_.size(setter)) {
        SWUtils.setWrapper(setter, PFConst.silentParams);
      }
    }
  });
}
/** Updates crit_conf_mod for each attack row matching the attack type just updated.
 * Called when global crit bonus field updated: attk_melee_crit_conf or similar is updated
 * @param {string} attacktype  value from key of attackGridFields
 * @param {Map<string,string>} eventInfo from event
 */
function updateRepeatingWeaponsFromCritAsync(attacktype, eventInfo) {
  var globalCritBonusField = PFAttackGrid.attackGridFields[attacktype] ? PFAttackGrid.attackGridFields[attacktype].crit : '';
  if (!globalCritBonusField) {
    TAS.error('updateRepeatingWeaponsFromCritAsync: Invalid attack type');
    return;
  }
  getSectionIDs('repeating_weapon', function (ids) {
    var attrs = [globalCritBonusField, 'buff_crit_conf-total'];
    if (!ids || _.size(ids) < 1) {
      return;
    }
    _.each(ids, function (id) {
      var idStr = SWUtils.getRepeatingIDStr(id);
      attrs.push('repeating_weapon_' + idStr + 'crit_conf_mod');
      attrs.push('repeating_weapon_' + idStr + 'crit_confirm');
      attrs.push('repeating_weapon_' + idStr + 'crit_confirm_temp');
      attrs.push('repeating_weapon_' + idStr + 'attack-type');
    });
    //TAS.debug("about to get ",attrs);
    getAttrs(attrs, function (v) {
      var globalCritBonus = parseInt(v[globalCritBonusField], 10) || 0,
        setter = {};
      try {
        v = _.mapObject(v, function (val, key) {
          if (/attack\-type$/i.test(key) || /damage\-ability$/i.test(key) || /damage\-ability\-max$/i.test(key) || /damage_ability_mult$/i.test(key)) {
            return val;
          } else {
            return parseInt(val, 10) || 0;
          }
        });
        _.each(ids, function (id) {
          var idStr = SWUtils.getRepeatingIDStr(id),
            attackTypeField = 'repeating_weapon_' + idStr + 'attack-type',
            rowCritTotField = '',
            rowCrit = 0,
            rowTot = 0,
            currRowTot = 0;
          //TAS.debug("row:"+id+" attacktypefield:"+v[attackTypeField]+", ability:"+ PFUtils.findAbilityInString(v[attackTypeField]) +", type is:"+attacktype);
          if (v[attackTypeField] === 'attk-' + attacktype) {
            updateRepeatingWeaponCrit(id, v, setter, true);
          }
        });
      } catch (err) {
        TAS.error('updateRepeatingWeaponsFromCritAsync: error', err);
      } finally {
        if (_.size(setter) > 0) {
          SWUtils.setWrapper(setter, PFConst.silentParams);
        }
      }
    });
  });
}
/** sets 'isranged' checkbox to 1 if attack-type is ranged or ranged2
 * @param {string} id the row id or null for current row
 */
function setRepeatingWeaponRangedFlag(id) {
  var idStr = SWUtils.getRepeatingIDStr(id),
    prefix = 'repeating_weapon_' + idStr,
    attypeAttr = prefix + 'attack-type',
    isRangedAttr = prefix + 'isranged';
  getAttrs([attypeAttr, isRangedAttr], function (v) {
    var setter = {},
      newIsRanged = 0;
    if (/ranged/i.test(v[attypeAttr])) {
      newIsRanged = 1;
    }
    if ((parseInt(v[isRangedAttr], 10) || 0) !== newIsRanged) {
      setter[isRangedAttr] = newIsRanged;
      SWUtils.setWrapper(setter, PFConst.silentParams);
    }
  });
}

function getRecalculatedDamageOnly(id, v) {
  var idStr = SWUtils.getRepeatingIDStr(id),
    prefix = 'repeating_weapon_' + idStr,
    damagetype = v[prefix + 'damage-ability'],
    isRanged = 0,
    enhance = 0,
    abilitydmg = 0,
    abilityMult = 1,
    currTotalDmg = 0,
    dmgMacroMod = 0,
    maxAbility = 999,
    dmgConditions = v['condition-Sickened'],
    meleeBuffs = v['buff_dmg_melee-total'] || 0,
    rangedBuff = v['buff_dmg_ranged-total'] || 0,
    damageBuffs = v['buff_DMG-total'] || 0,
    damagePowerAttack = v['buff_dmg_power_attack-total'] || 0,
    abilityTotDmg = 0,
    newTotalDamage = 0,
    localsetter = {};
  try {
    if (damagetype === 'dual') {
      if (currTotalDmg !== 0) {
        localsetter[prefix + 'total-damage'] = 0;
      }
    } else {
      isRanged = parseInt(v[prefix + 'isranged'], 10) || 0;
      enhance = parseInt(v[prefix + 'enhance'], 10) || 0;
      abilitydmg = parseInt(v[prefix + 'damage-ability-mod'], 10) || 0;
      currTotalDmg = parseInt(v[prefix + 'total-damage'], 10) || 0;
      dmgMacroMod = parseInt(v[prefix + 'damage-mod'], 10) || 0;
      if (v[prefix + 'attack-type'].indexOf('2') >= 0) {
        rangedBuff += parseInt(v['buff_dmg_ranged2-total'], 10) || 0;
        meleeBuffs += parseInt(v['buff_dmg_melee2-total'], 10) || 0;
      }
      if (isRanged) {
        damagePowerAttack = 0;
        damageBuffs += rangedBuff;
        maxAbility = parseInt(v[prefix + 'damage-ability-max'], 10);
        if (isNaN(maxAbility)) {
          maxAbility = 999;
        }
      } else {
        damageBuffs += meleeBuffs;
      }
      abilityMult = getDamageMult(v[prefix + 'damage_ability_mult']);
      damageBuffs -= dmgConditions;
      //Multiplier only applies to an Ability bonus.
      if (abilitydmg <= 0) {
        abilityMult = 1;
        TAS.debug('~~~~~~ Multiplier only applies to an Ability bonus. Current Ability-Mod: ' + abilitydmg);
      }
      abilityTotDmg = Math.floor(Math.min(abilityMult * (abilitydmg + damagePowerAttack), maxAbility));
      newTotalDamage = abilityTotDmg + damageBuffs + dmgMacroMod + enhance;
      if (newTotalDamage !== currTotalDmg || isNaN(currTotalDmg)) {
        localsetter[prefix + 'total-damage'] = newTotalDamage;
      }
    }
  } catch (err) {
    TAS.error('PFAttacks.recalculateAttack for id ' + id, err);
  } finally {
    return localsetter;
  }
}
/* updateRepeatingWeaponDamages - updates all attacks when buff to damage changes */
export function updateRepeatingWeaponDamages(callback, silently, eventInfo) {
  var done = _.once(function () {
    if (typeof callback === 'function') {
      callback();
    }
  });
  getSectionIDs('repeating_weapon', function (ids) {
    var fields;
    fields = SWUtils.cartesianAppend(['repeating_weapon_'], ids, damageRowAttrsLU);
    fields.push('buff_DMG-total');
    fields.push('buff_dmg_melee-total');
    fields.push('buff_dmg_ranged-total');
    fields.push('buff_dmg_melee2-total');
    fields.push('buff_dmg_ranged2-total');
    fields.push('condition-Sickened');
    fields.push('buff_dmg_power_attack-total');
    getAttrs(fields, function (v) {
      var setter;
      //replace with int versions
      v['buff_DMG-total'] = parseInt(v['buff_DMG-total'], 10) || 0;
      v['buff_dmg_ranged-total'] = parseInt(v['buff_dmg_ranged-total'], 10) || 0;
      v['buff_dmg_melee-total'] = parseInt(v['buff_dmg_melee-total'], 10) || 0;
      v['condition-Sickened'] = parseInt(v['condition-Sickened'], 10) || 0;
      v['buff_dmg_power_attack-total'] = parseInt(v['buff_dmg_power_attack-total'], 10) || 0;
      setter = _.reduce(
        ids,
        function (m, id) {
          var xtra = getRecalculatedDamageOnly(id, v);
          _.extend(m, xtra);
          return m;
        },
        {},
      );
      if (_.size(setter)) {
        SWUtils.setWrapper(setter, {}, done);
      } else {
        done();
      }
    });
  });
}

/* this is faster than looping through the 3 parent lists */
export function updateAssociatedAttacksFromParents(callback) {
  var done = _.once(function () {
    if (typeof callback === 'function') {
      callback();
    }
  });
  getSectionIDs('repeating_weapon', function (ids) {
    var doneOne,
      attrs = [];
    if (_.size(ids) === 0) {
      done();
      return;
    } else {
      doneOne = _.after(_.size(ids), function () {
        done();
      });
    }
    attrs = _.map(ids, function (id) {
      return ['repeating_weapon_' + id + '_source-item', 'repeating_weapon_' + id + '_source-spell', 'repeating_weapon_' + id + '_source-ability'];
    });
    attrs = _.flatten(attrs);
    getAttrs(attrs, function (v) {
      ids = _.map(ids, function (id) {
        return id.toLowerCase();
      });
      getSectionIDs('repeating_spells', function (spellIDs) {
        spellIDs = _.map(spellIDs, function (id) {
          return id.toLowerCase();
        });
        getSectionIDs('repeating_item', function (itemIDs) {
          itemIDs = _.map(itemIDs, function (id) {
            return id.toLowerCase();
          });
          getSectionIDs('repeating_ability', function (abilityIDs) {
            var setter = {};
            abilityIDs = _.map(abilityIDs, function (id) {
              return id.toLowerCase();
            });
            TAS.debug('################', 'Checking linked attacks. attack links, spellids, itemids, abilityids', v, spellIDs, itemIDs, abilityIDs);
            _.each(ids, function (id) {
              if (v['repeating_weapon_' + id + '_source-item']) {
                TAS.debug('checking ' + id + ' for item:' + v['repeating_weapon_' + id + '_source-item']);
                if (v['repeating_weapon_' + id + '_source-item'] !== 'DELETED') {
                  TAS.debug('looking for ' + v['repeating_weapon_' + id + '_source-item'] + ' in item list');
                  if (_.size(itemIDs > 0) && _.contains(itemIDs, v['repeating_weapon_' + id + '_source-item'])) {
                    PFInventory.createAttackEntryFromRow(v['repeating_weapon_' + id + '_source-item'], doneOne, true, null, id);
                  } else {
                    TAS.warn('weapon ' + id + ' item link is not found:' + v['repeating_weapon_' + id + '_source-item']);
                    //setter['repeating_weapon_'+id+'_source-item']='DELETED';
                  }
                }
              } else if (v['repeating_weapon_' + id + '_source-spell']) {
                TAS.debug('checking ' + id + ' for spell:' + v['repeating_weapon_' + id + '_source-spell']);
                if (v['repeating_weapon_' + id + '_source-spell'] !== 'DELETED') {
                  TAS.debug('looking for ' + v['repeating_weapon_' + id + '_source-spell'] + ' in spell list');
                  if (_.size(spellIDs > 0) && _.contains(spellIDs, v['repeating_weapon_' + id + '_source-spell'])) {
                    PFSpells.createAttackEntryFromRow(v['repeating_weapon_' + id + '_source-spell'], doneOne, true, null, id);
                  } else {
                    TAS.warn('weapon ' + id + ' spell link is not found:' + v['repeating_weapon_' + id + '_source-spell']);
                    //setter['repeating_weapon_'+id+'_source-spell']='DELETED';
                  }
                }
              } else if (v['repeating_weapon_' + id + '_source-ability']) {
                TAS.debug('checking ' + id + ' for ability:' + v['repeating_weapon_' + id + '_source-ability']);
                if (v['repeating_weapon_' + id + '_source-ability'] !== 'DELETED') {
                  TAS.debug('looking for ' + v['repeating_weapon_' + id + '_source-ability'] + ' in ability list');
                  if (_.size(abilityIDs > 0) && _.contains(abilityIDs, v['repeating_weapon_' + id + '_source-ability'])) {
                    PFAbility.createAttackEntryFromRow(v['repeating_weapon_' + id + '_source-ability'], doneOne, true, null, id);
                  } else {
                    TAS.warn('weapon ' + id + ' ability link is not found:' + v['repeating_weapon_' + id + '_source-ability']);
                    //setter['repeating_weapon_'+id+'_source-ability']='DELETED';
                  }
                }
              } else {
                TAS.debug('nothing linked to ' + id);
                doneOne();
              }
            });
            if (_.size(setter) > 0) {
              SWUtils.setWrapper(setter, PFConst.silentParams);
            }
          });
        });
      });
    });
  });
}

function getRecalculatedAttack(id, v, setter) {
  var prefix = 'repeating_weapon_' + id + '_',
    isRanged = v[prefix + 'isranged'] || 0,
    enhance = v[prefix + 'enhance'] || 0,
    masterwork = v[prefix + 'masterwork'] || 0,
    attkTypeMod = v[prefix + 'attack-type-mod'] || 0,
    prof = v[prefix + 'proficiency'] || 0,
    attkMacroMod = v[prefix + 'attack-mod'] || 0,
    currTotalAttack = v[prefix + 'total-attack'],
    abilitydmg = v[prefix + 'damage-ability-mod'] || 0,
    abilityMult = 1,
    currTotalDmg = v[prefix + 'total-damage'],
    dmgMacroMod = v[prefix + 'damage-mod'] || 0,
    maxAbility = v[prefix + 'damage-ability-max'],
    currCritBonus = v[prefix + 'crit_conf_mod'] || 0,
    critConfirmBonus = v[prefix + 'crit_confirm'] || 0,
    critConfirmTempBonus = v[prefix + 'crit_confirm_temp'] || 0,
    attackBuffBonus = v['buff_crit_conf-total'] || 0,
    attkType = v[prefix + 'attack-type'],
    damageBuffs = v['buff_DMG-total'] || 0,
    damagePowerAttack = v['buff_dmg_power_attack-total'] || 0,
    attkTypeForGrid = '',
    attackTypeCritBonusField = '',
    attackTypeCritBonus = 0,
    newCritBonus = 0,
    abilityTotDmg = 0,
    newTotalDamage = 0,
    newTotalAttack = 0,
    localsetter;
  try {
    localsetter = setter || {};
    if (attkType && attkType !== 'dual' && attkType !== '0') {
      if (/range/i.test(attkType)) {
        if (!isRanged) {
          isRanged = 1;
          localsetter[prefix + 'isranged'] = 1;
        }
      } else if (isRanged) {
        localsetter[prefix + 'isranged'] = 0;
      }
    } else if (isRanged) {
      localsetter[prefix + 'isranged'] = 0;
      isRanged = 0;
      damagePowerAttack = 0;
    }
    abilityMult = getDamageMult(v[prefix + 'damage_ability_mult']);
    if (isRanged) {
      damageBuffs += v['buff_dmg_ranged-total'] || 0;
      damagePowerAttack = 0;
      if (attkType.indexOf('2') >= 0) {
        damageBuffs += v['buff_dmg_ranged2-total'] || 0;
        damagePowerAttack = 0;
      }
    } else {
      damageBuffs += v['buff_dmg_melee-total'] || 0;
      if (attkType.indexOf('2') >= 0) {
        damageBuffs += v['buff_dmg_melee2-total'] || 0;
      }
    }
    damageBuffs -= v['condition-Sickened'] || 0;
    newTotalAttack = Math.max(enhance, masterwork) + attkTypeMod + prof + attkMacroMod;
    if (newTotalAttack !== currTotalAttack || isNaN(currTotalAttack)) {
      localsetter[prefix + 'total-attack'] = newTotalAttack;
    }
    maxAbility = parseInt(maxAbility, 10);
    if (!isRanged || isNaN(maxAbility)) {
      maxAbility = 999;
    }
    //Multiplier only applies to an Ability bonus.
    if (abilitydmg <= 0) {
      abilityMult = 1;
      TAS.debug('~~~~~~ Multiplier only applies to an Ability bonus. Current Ability-Mod: ' + abilitydmg);
    }
    abilityTotDmg = Math.min(Math.floor(abilityMult * (abilitydmg + damagePowerAttack)), maxAbility);
    newTotalDamage = abilityTotDmg + damageBuffs + dmgMacroMod + enhance;
    TAS.debug(
      '###########################',
      'getRecalculatedAttack attackType:' +
        attkType +
        ', ability:' +
        v['repeating_weapon_' + id + '_damage-ability'] +
        ' mod:' +
        v['repeating_weapon_' + id + '_damage-ability-mod'] +
        ', isranged:' +
        isRanged +
        ', damageBuffs:' +
        damageBuffs +
        ', maxability:' +
        maxAbility +
        ', abilityMult:' +
        abilityMult +
        ', abilitydmg:' +
        abilitydmg +
        ', ability dmg tot:' +
        abilityTotDmg +
        ', new total:' +
        newTotalDamage +
        ', old total:' +
        currTotalDmg,
      '###########################',
    );
    if (newTotalDamage !== currTotalDmg || isNaN(currTotalDmg)) {
      localsetter[prefix + 'total-damage'] = newTotalDamage;
    }
    if (attkType && attkType !== 'dual' && attkType !== '0') {
      attkTypeForGrid = attkType.replace('attk-', '');
      //TAS.debug("at update nonmacro attack id "+id+" attkTypeForGrid="+attkTypeForGrid+", comparing to:",PFAttackGrid.attackGridFields);
      if (attkTypeForGrid) {
        attackTypeCritBonusField = PFAttackGrid.attackGridFields[attkTypeForGrid].crit;
        attackTypeCritBonus = !attackTypeCritBonusField ? 0 : v[attackTypeCritBonusField];
        if (v[prefix + 'attack-type_macro_insert'] !== PFAttackGrid.attackGridFields[attkTypeForGrid].attackmacro) {
          localsetter[prefix + 'attack-type_macro_insert'] = PFAttackGrid.attackGridFields[attkTypeForGrid].attackmacro;
        }
        if (v[prefix + 'damage-type_macro_insert'] !== PFAttackGrid.attackGridFields[attkTypeForGrid].damagemacro) {
          localsetter[prefix + 'damage-type_macro_insert'] = PFAttackGrid.attackGridFields[attkTypeForGrid].damagemacro;
        }
      }
    }
    updateRepeatingWeaponCrit(id, v, localsetter);

    // newCritBonus = critConfirmBonus + attackTypeCritBonus + critConfirmTempBonus + attackBuffBonus;
    newCritBonus = critConfirmBonus + attackTypeCritBonus + attackBuffBonus;
    // if (newCritBonus !== currCritBonus) {
    //   localsetter[prefix + 'crit_conf_mod'] = newCritBonus;
    // }
    localsetter[prefix + 'crit_conf_mod'] = newCritBonus;
    if (!attkTypeForGrid) {
      if (v[prefix + 'attack-type_macro_insert'] !== '0') {
        localsetter[prefix + 'attack-type_macro_insert'] = '0';
      }
      if (v[prefix + 'damage-type_macro_insert'] !== '0') {
        localsetter[prefix + 'damage-type_macro_insert'] = '0';
      }
    }
  } catch (err) {
    TAS.error('PFAttacks.getRecalculatedAttack for id ' + id, err);
  } finally {
    return localsetter;
  }
}
/**ONLY CALL IF modify_dmg_by_size = 0
 *
 * @param {*} id
 * @param {*} v
 * @param {*} setter
 */
function syncDefaultDamageDice(id, v, setter, useSizeMod, prefix) {
  if (!prefix) {
    prefix = 'repeating_weapon_' + SWUtils.getRepeatingIDStr(id);
  }
  if (!useSizeMod || !parseInt(v[prefix + 'size_affects'], 10)) {
    setter[prefix + 'default_damage-dice-num'] = v[prefix + 'damage-dice-num'] || 0;
    setter[prefix + 'default_damage-die'] = v[prefix + 'damage-die'] || 0;
  }
  return setter;
}
/**   Called when updating damage dice  on a row
 *
 * @param {string} id
 */
function syncDefaultDamageDiceAsync(id, eventInfo) {
  var idStr = SWUtils.getRepeatingIDStr(id),
    prefix = 'repeating_weapon_' + idStr;
  getAttrs(['modify_dmg_by_size', prefix + 'size_affects', prefix + 'damage-dice-num', prefix + 'damage-die'], function (v) {
    var setter = {},
      useSizeMod = 0;
    if (parseInt(v.modify_dmg_by_size, 10) || parseInt(v[prefix + 'size_affects'], 10)) {
      useSizeMod = 1;
    }
    syncDefaultDamageDice(id, v, setter, useSizeMod, prefix);
    if (_.size(setter)) {
      SWUtils.setWrapper(setter, PFConst.silentParams);
    }
  });
}
export function syncAllDefaultDamageDiceAsync() {
  getAttrs(['modify_dmg_by_size'], function (vout) {
    getSectionIDs('repeating_weapons', function (ids) {
      var setter = {},
        fields;
      if (_.size(ids)) {
        fields = SWUtils.cartesianAppend(['repeating_weapon_'], ids, ['_damage-dice-num', '_damage-die', '_size_affects']);
        fields.push('modify_dmg_by_size');
        getAttrs(fields, function (v) {
          var modifyGlobal = 0;
          _.each(ids, function (id) {
            var modifyDice = (modifyGlobal && parseInt(v['repeating_weapon_' + id + '_size_affects'], 10)) || 0;
            syncDefaultDamageDice(id, v, setter, modifyDice);
          });
          if (_.size(setter)) {
            SWUtils.setWrapper(setter, PFConst.silentParams);
          }
        });
      }
    });
  });
}
/** ONLY CALL IF modify_dmg_by_size = 1.
 *
 * @param {string} id
 * @param {number} currCharSize
 * @param {Map<string,string>} v
 * @param {Map<string,string>} setter
 * @param {object} eventInfo
 * @returns {Map<string,string>} setter
 */
function adjustDamageDice(id, currCharSize, v, setter, prefix) {
  var currDice = 0,
    defDice = 0,
    weaponSizeDiff = 0,
    currDie = 0,
    defDie = 0,
    defWeaponSize = 0,
    currNotDefault = 0,
    defSize = 0,
    sizeDiff = 0,
    newDice = {};
  try {
    if (!prefix) {
      prefix = 'repeating_weapon_' + SWUtils.getRepeatingIDStr(id);
    }
    //TAS.debug("#########","PFAttacks.adjustDamageDice for "+prefix,v);
    currNotDefault = parseInt(v[prefix + 'not_default_size'], 10) || 0;
    if (parseInt(v[prefix + 'size_affects'], 10)) {
      currDice = parseInt(v[prefix + 'damage-dice-num'], 10) || 0;
      currDie = parseInt(v[prefix + 'damage-die'], 10) || 0;
      //TAS.debug("PFAttacks.adjustDamageDice curr size:"+ currCharSize+" and current dmg: "+currDice+"d"+currDie);
      if (!(currDice === 0 || currDie === 0)) {
        defSize = parseInt(v['default_char_size'], 10);
        defWeaponSize = parseInt(v[prefix + 'default_size'], 10);
        defDice = parseInt(v[prefix + 'default_damage-dice-num'], 10) || 0;
        defDie = parseInt(v[prefix + 'default_damage-die'], 10) || 0;
        //TAS.debug("PFAttacks.adjustDamageDice default is:"+defDice+"d"+defDie+", for size:"+defWeaponSize+", "+"def char size:"+defSize+", and curr char size:"+ currCharSize);

        //check for errors
        if (isNaN(defWeaponSize)) {
          defWeaponSize = defSize;
          setter[prefix + 'default_size'] = defWeaponSize;
        }
        if (isNaN(defSize)) {
          defSize = currCharSize;
        }
        if (defDice === 0 || defDie === 0) {
          defDice = currDice;
          defDie = currDie;
          setter[prefix + 'default_damage-dice-num'] = defDice;
          setter[prefix + 'default_damage-die'] = defDie;
        }
        //check for change
        if (currCharSize !== defSize) {
          if (!currNotDefault) {
            setter[prefix + 'not_default_size'] = 1;
          }
          sizeDiff = PFSize.getSizeLevelChange(currCharSize, defSize);
          //TAS.debug("PFAttacks update dice, char size change is "+sizeDiff);
        }
        if (defWeaponSize !== defSize) {
          if (!currNotDefault) {
            setter[prefix + 'not_default_size'] = 1;
          }
          weaponSizeDiff = PFSize.getSizeLevelChange(defWeaponSize, defSize);
          //TAS.debug("PFAttacks update dice, weapon size change is "+weaponSizeDiff);
        }
        sizeDiff += weaponSizeDiff;
        TAS.debug('PFAttacks update dice, total size change is  ' + sizeDiff);
        if (sizeDiff) {
          newDice = PFSize.updateDamageDice(sizeDiff, defSize, defDice, defDie);
          TAS.debug('###########', 'PFAttacks.adjustDamageDice NEW DAMAGE is:' + newDice.dice + 'd' + newDice.die + ', for sizeDiff:' + sizeDiff);
          if (currDice !== newDice.dice || currDie !== newDice.die) {
            setter[prefix + 'damage-dice-num'] = newDice.dice;
            setter[prefix + 'damage-die'] = newDice.die;
          }
        } else {
          if (currNotDefault) {
            setter[prefix + 'not_default_size'] = 0;
          }
          if (currDice !== defDice || currDie !== defDie) {
            setter[prefix + 'damage-dice-num'] = defDice;
            setter[prefix + 'damage-die'] = defDie;
          }
        }
      } else {
        //size affects was 1, but no damage dice
        setter[prefix + 'size_affects'] = 0;
      }
    } else {
      //TAS.debug("PFAttacks.adjustDamageDice: size_affects is blank so reset regular to default")
      if (!(currDice === 0 || currDie === 0)) {
        setter[prefix + 'damage-dice-num'] = v[prefix + 'default_damage-dice-num'];
        setter[prefix + 'damage-die'] = v[prefix + 'default_damage-die'];
        if (currNotDefault) {
          setter[prefix + 'not_default_size'] = 0;
        }
      }
    }
  } catch (err) {
    TAS.error('PFAttacks.adjustDamageDice', err);
  } finally {
    return setter;
  }
}
/** Only called when updating the size dropdown, default damage dice, or size affects checkbox on a row.
 *
 * @param {string} id
 * @param {function} callback
 */
function adjustDamageDiceAsync(id, callback) {
  var idStr = SWUtils.getRepeatingIDStr(id),
    prefix = 'repeating_weapon_' + idStr;
  getAttrs(
    [
      'modify_dmg_by_size',
      'size',
      'default_char_size',
      prefix + 'default_size',
      prefix + 'size_affects',
      prefix + 'default_damage-dice-num',
      prefix + 'default_damage-die',
      prefix + 'not_default_size',
      prefix + 'damage-dice-num',
      prefix + 'damage-die',
    ],
    function (v) {
      var setter = {},
        currCharSize = 0;
      try {
        //TAS.debug("at PFAttacks.adjustDamageDiceAsync for id "+id+", got ",v);
        if (parseInt(v['modify_dmg_by_size'], 10)) {
          currCharSize = parseInt(v.size, 10) || 0;
          adjustDamageDice(id, currCharSize, v, setter, prefix);
        }
      } finally {
        if (_.size(setter)) {
          SWUtils.setWrapper(setter);
        }
      }
    },
  );
}

export function adjustAllDamageDiceAsync(callback, eventInfo) {
  var done = _.once(function () {
    if (typeof callback === 'function') {
      callback();
    }
  });
  //TAS.debug("at PFAttacks.adjustAllDamageDiceAsync");
  getAttrs(['modify_dmg_by_size', 'size', 'default_char_size'], function (vout) {
    var currCharSize = 0;
    if (parseInt(vout['modify_dmg_by_size'], 10)) {
      currCharSize = parseInt(vout.size, 10) || 0;
      getSectionIDs('repeating_weapon', function (ids) {
        var fields;
        if (_.size(ids)) {
          fields = SWUtils.cartesianAppend(['repeating_weapon_'], ids, sizeFieldsLU);
          getAttrs(fields, function (v) {
            var setter = {};
            v.default_char_size = parseInt(vout.default_char_size, 10) || 0;
            _.each(ids, function (id) {
              var idStr = SWUtils.getRepeatingIDStr(id),
                prefix = 'repeating_weapon_' + idStr;
              adjustDamageDice(id, currCharSize, v, setter);
            });
            if (_.size(setter)) {
              SWUtils.setWrapper(setter, PFConst.silentParams, done);
            }
          });
        }
      });
    }
  });
}
function resetWeaponSizeAndDamage(id, currCharSize, v, setter, useSizeMod) {
  var idStr = SWUtils.getRepeatingIDStr(id),
    prefix = 'repeating_weapon_' + idStr;
  if (useSizeMod) {
    adjustDamageDice(id, currCharSize, v, setter, prefix);
  } else {
    syncDefaultDamageDice(id, v, setter, useSizeMod, prefix);
  }
  return setter;
}

/** call when bab changes, or when name changes but how to know? must keep them in linked fields.
 * @param {{'mainhand_name':string,'mainhand_id':string,'mainhand_penalty':int,	'offhand_name':string,'offhand_id':string,'offhand_penalty':int,'offhand_improved':boolean,'bab':int, 'offhand_mult':number }  } params
 * @param {Map<string,any>} setter already built setter if applicable.
 * @param {String} id the id of the row
 * @param {Boolean} updMode if true then do not update names of attacks
 * @returns {Map<string,any>} setter
 */
export function setDualWieldVals(params, setter, id, updMode) {
  var fields,
    numAttacks = 1,
    currAttack = 1,
    totAttacks = 2,
    macroText = '',
    macroIter =
      '{{attackREPLACEITER=[[ 1d20cs>[[ @{repeating_weapon_REPLACEHAND_crit-target} ]] + [[ @{repeating_weapon_REPLACEHAND_attack_macro} ]] + @{iterative_attackREPLACEITER_value} ]]}} {{damageREPLACEITER=[[ @{repeating_weapon_REPLACEHAND_damage-dice-num}d@{repeating_weapon_REPLACEHAND_damage-die} + @{repeating_weapon_REPLACEHAND_damage_macro} ]]}} {{typeREPLACEITER=@{typeREPLACEITER}}} {{crit_confirmREPLACEITER=[[ 1d20 + [[ @{repeating_weapon_REPLACEHAND_attack_macro}  ]] + @{iterative_attackREPLACEITER_value} + @{repeating_weapon_REPLACEHAND_crit_conf_mod} ]]}} {{crit_damageREPLACEITER=[[ [[ @{repeating_weapon_REPLACEHAND_damage-dice-num} * [[ @{repeating_weapon_REPLACEHAND_crit-multiplier} - 1 ]] ]]d@{repeating_weapon_REPLACEHAND_damage-die} + ((@{repeating_weapon_REPLACEHAND_damage_macro}) * [[ @{repeating_weapon_REPLACEHAND_crit-multiplier} - 1 ]]) ]]}} {{precision_dmgREPLACEITER1=@{repeating_weapon_REPLACEHAND_precision_dmg_macro}}} {{critical_dmgREPLACEITER1=@{repeating_weapon_REPLACEHAND_critical_dmg_macro}}} {{precision_dmgREPLACEITER2=@{global_precision_dmg_macro}}} {{critical_dmgREPLACEITER2=@{global_critical_dmg_macro}}} {{attackREPLACEITERname=@{iterative_attackREPLACEITER_name}}} ',
    macroIterOffhand =
      '{{attackREPLACEITER=[[ 1d20cs>[[ @{repeating_weapon_REPLACEHAND_crit-target} ]] + [[ @{repeating_weapon_REPLACEHAND_attack_macro} ]] + @{iterative_attackREPLACEITER_value} ]]}} {{damageREPLACEITER=[[ @{repeating_weapon_REPLACEHAND_damage-dice-num}d@{repeating_weapon_REPLACEHAND_damage-die} + @{repeating_weapon_REPLACEHAND_damage_macro} REPLACEMULT ]]}} {{typeREPLACEITER=@{typeREPLACEITER}}} {{crit_confirmREPLACEITER=[[ 1d20 + [[ @{repeating_weapon_REPLACEHAND_attack_macro} ]] + @{iterative_attackREPLACEITER_value}  + @{repeating_weapon_REPLACEHAND_crit_conf_mod} ]]}} {{crit_damageREPLACEITER=[[ [[ @{repeating_weapon_REPLACEHAND_damage-dice-num} * [[ @{repeating_weapon_REPLACEHAND_crit-multiplier} - 1 ]] ]]d@{repeating_weapon_REPLACEHAND_damage-die} + ((@{repeating_weapon_REPLACEHAND_damage_macro} REPLACEMULT ) * [[ @{repeating_weapon_REPLACEHAND_crit-multiplier} - 1 ]]) ]]}} {{precision_dmgREPLACEITER1=@{repeating_weapon_REPLACEHAND_precision_dmg_macro}}} {{critical_dmgREPLACEITER1=@{repeating_weapon_REPLACEHAND_critical_dmg_macro}}} {{precision_dmgREPLACEITER2=@{global_precision_dmg_macro}}} {{critical_dmgREPLACEITER2=@{global_critical_dmg_macro}}} {{attackREPLACEITERname=@{iterative_attackREPLACEITER_name}}} ',
    replaceMultStr = '- [[ ceil(@{repeating_weapon_REPLACEHAND_damage-ability-mod}/2) ]] ',
    tempInt = 0,
    currMacro = '',
    tempMacroArray = [],
    mainPen = 0,
    origMainPen = 0,
    offhandCountdown = 0,
    offPen = 0,
    prefix = '',
    tempStr = '',
    tempStr2 = '';

  try {
    TAS.debug('PFAttacks.setDualWieldVals', params);
    setter = setter || {};
    if (!id) {
      id = generateRowID();
      //TAS.debug("the new id is "+id);
    }
    prefix = 'repeating_weapon_' + id + '_';
    //TAS.debug("prefix is "+prefix);
    if (updMode) {
      currMacro = params['macro-text'];
      TAS.debug('currMacro is ', currMacro);
      if (currMacro) {
        TAS.debug('about to call gettracking');
        tempMacroArray = PFMacros.getTracking(currMacro);
        if (_.size(tempMacroArray) === 0) {
          currMacro = params['NPC-macro-text'];
          if (currMacro) {
            tempMacroArray = PFMacros.getTracking(currMacro);
          }
        }
      }
    }
    offhandCountdown = params.offhand_improved;
    tempStr = SWUtils.getTranslated('dual-wield');
    if (!tempStr) {
      tempStr = 'Dual Wield';
    }
    setter[prefix + 'dualwield'] = 1;
    setter[prefix + 'source-main'] = params.mainhand_id;
    setter[prefix + 'source-off'] = params.offhand_id;
    //for update of existing just for this version:
    setter[prefix + 'group'] = tempStr;
    if (!updMode) {
      setter[prefix + 'group'] = tempStr;
      setter[prefix + 'source-main-name'] = params.mainhand_name || '';
      setter[prefix + 'source-off-name'] = params.offhand_name || '';
      setter[prefix + 'name'] = tempStr + ' ' + (params.mainhand_name || '') + '/' + (params.offhand_name || '');
      setter[prefix + 'iterative_attack1_name'] = params.mainhand_name + ' [[@{repeating_weapon_' + params.mainhand_id + '_total-attack} + ' + params.mainhand_penalty + ']]';
    }
    setter[prefix + 'link_type'] = linkedAttackType.weapon;
    setter[prefix + 'size_affects'] = 0;
    //by filling it in we make sure template rolls
    setter[prefix + 'attack-type'] = 'dual';
    setter[prefix + 'attack-type-mod'] = 0;
    setter[prefix + 'damage-ability'] = 'dual';
    setter[prefix + 'damage-ability-mod'] = 0;
    setter[prefix + 'damage'] = '0';
    setter[prefix + 'damage-mod'] = 0;
    currAttack = 1;
    setter[prefix + 'damage'] = '0';
    setter[prefix + 'damage-mod'] = 0;
    //macroText
    //mainhand attack:
    macroText =
      '&{template:pf_attack} @{toggle_attack_accessible} @{toggle_rounded_flag} {{header_image=@{header_image-pf_attack-dual}}} {{font=@{apply_specfont_chat}@{use_specfont}}} {{scroll_desc=@{scroll-desc}}} {{color=@{rolltemplate_color}}} {{character_name=@{character_name}}} {{character_id=@{character_id}}} {{subtitle}} {{name=@{name}}} ' +
      '{{attack=[[ 1d20cs>[[ @{repeating_weapon_' +
      params.mainhand_id +
      '_crit-target} ]] + [[@{repeating_weapon_' +
      params.mainhand_id +
      '_attack_macro} ]] + @{attack-mod} ]]}} ' +
      '{{damage=[[@{repeating_weapon_' +
      params.mainhand_id +
      '_damage-dice-num}d@{repeating_weapon_' +
      params.mainhand_id +
      '_damage-die} + @{repeating_weapon_' +
      params.mainhand_id +
      '_damage_macro} ]]}} ' +
      //  	'{{type=@{repeating_weapon_' + params.mainhand_id + '_type}}} ' +
      '{{type=@{type}}} ' +
      '{{crit_confirm=[[ 1d20 + [[ @{repeating_weapon_' +
      params.mainhand_id +
      '_attack_macro} ]] + @{attack-mod} ]]}} ' +
      '{{crit_damage=[[ [[ @{repeating_weapon_' +
      params.mainhand_id +
      '_damage-dice-num} * (@{repeating_weapon_' +
      params.mainhand_id +
      '_crit-multiplier} - 1) ]]d@{repeating_weapon_' +
      params.mainhand_id +
      '_damage-die} + ((@{repeating_weapon_' +
      params.mainhand_id +
      '_damage_macro} ) * [[ @{repeating_weapon_' +
      params.mainhand_id +
      '_crit-multiplier} - 1 ]]) ]]}} ' +
      '{{precision_dmg1=@{repeating_weapon_' +
      params.mainhand_id +
      '_precision_dmg_macro}}} {{precision_dmg1_type=@{repeating_weapon_' +
      params.mainhand_id +
      '_precision_dmg_type}}} ' +
      '{{critical_dmg1=@{repeating_weapon_' +
      params.mainhand_id +
      '_critical_dmg_macro}}} {{critical_dmg1_type=@{repeating_weapon_' +
      params.mainhand_id +
      '_critical_dmg_type}}} ' +
      '{{weapon_notes=@{repeating_weapon_' +
      params.mainhand_id +
      '_notes}@{repeating_weapon_' +
      params.offhand_id +
      '_notes}}} ' +
      '{{vs=@{repeating_weapon_' +
      params.mainhand_id +
      '_vs}}} {{vs@{repeating_weapon_' +
      params.mainhand_id +
      '_vs}=@{repeating_weapon_' +
      params.mainhand_id +
      '_vs}}} ' +
      '{{precision_dmg2=@{global_precision_dmg_macro}}} {{precision_dmg2_type=@{global_precision_dmg_type}}} {{critical_dmg2=@{global_critical_dmg_macro}}} {{critical_dmg2_type=@{global_critical_dmg_type}}} ' +
      '{{dual_precision_dmg=@{precision_dmg_macro}}} {{dual_precision_dmg_type=@{precision_dmg_type}}} ' +
      '@{iterative_attacks} @{macro_options} {{attack1name=@{iterative_attack1_name}}}';

    if (_.size(tempMacroArray)) {
      currMacro = ' ' + tempMacroArray.join(' ');
      macroText += currMacro;
    }
    setter[prefix + 'macro-text'] = macroText;
    setter[prefix + 'NPC-macro-text'] = macroText;
    setter[prefix + 'attack'] = params.mainhand_penalty;
    setter[prefix + 'attack-mod'] = params.mainhand_penalty;
    setter[prefix + 'total-attack'] = params.mainhand_penalty;
    //rest of attacks
    numAttacks = Math.floor(params.bab / 5) + 1;
    totAttacks = numAttacks + params.offhand_improved;
    currAttack = 2;
    origMainPen = mainPen;
    while (currAttack <= totAttacks) {
      tempStr = '';
      //if odd attack or no more offhand then mainhand
      if (offhandCountdown === 0 || currAttack % 2 === 1) {
        //mainhand
        mainPen -= 5;
        tempStr = macroIter.replace(/REPLACEHAND/g, params.mainhand_id);
        tempInt = mainPen + params.mainhand_penalty;
        setter[prefix + 'iterative_attack' + currAttack + '_name'] =
          params.mainhand_name + ' [[ @{repeating_weapon_' + params.mainhand_id + '_total-attack} - ' + Math.abs(mainPen) + ' - ' + Math.abs(params.mainhand_penalty) + ' ]]';
      } else {
        //offhand
        tempStr = macroIterOffhand.replace(/REPLACEHAND/g, params.offhand_id);
        if (params.offhand_mult === 0.5) {
          tempStr2 = replaceMultStr.replace(/REPLACEHAND/g, params.offhand_id);
          tempStr = tempStr.replace(/REPLACEMULT/g, tempStr2);
        } else {
          tempStr = tempStr.replace(/REPLACEMULT/g, '');
        }
        tempInt = offPen + params.offhand_penalty;
        setter[prefix + 'iterative_attack' + currAttack + '_name'] =
          params.offhand_name + ' [[@{repeating_weapon_' + params.offhand_id + '_total-attack} - ' + Math.abs(offPen) + ' - ' + Math.abs(params.offhand_penalty) + ']]';
        offPen -= 5;
        offhandCountdown--;
      }
      tempStr = tempStr.replace(/REPLACEITER/g, currAttack);

      setter[prefix + 'iterative_attack' + currAttack + '_value'] = tempInt;
      setter[prefix + 'var_iterative_attack' + currAttack + '_macro'] = tempStr;
      setter[prefix + 'toggle_iterative_attack' + currAttack] = '@{var_iterative_attack' + currAttack + '_macro}';
      currAttack++;
    }
    if (currAttack <= 8) {
      //add one more in case of Haste
      tempStr = macroIter.replace(/REPLACEHAND/g, params.mainhand_id);
      tempStr = tempStr.replace(/REPLACEITER/g, currAttack);
      tempInt = origMainPen + params.mainhand_penalty;
      setter[prefix + 'iterative_attack' + currAttack + '_name'] = 'Extra full BAB MH attack';
      setter[prefix + 'iterative_attack' + currAttack + '_value'] = tempInt;
      setter[prefix + 'var_iterative_attack' + currAttack + '_macro'] = tempStr;
      //this one is off by default
      //setter[prefix+'toggle_iterative_attack'+currAttack]="@{var_iterative_attack"+currAttack+"_macro}";
    }
  } catch (err) {
    TAS.error('PFAttacks.setDualWieldVals outererr', err);
  } finally {
    //TAS.debug("PFAttacks.setDualWieldVals returning:",setter);
    return setter;
  }
}
/** Updates all existing dual wield attacks.
 *
 * @param {function} callback
 * @param {Map<string,string>} eventInfo
 */
export function updateDualWieldAttacks(callback, eventInfo) {
  var done = _.once(function () {
      if (typeof callback === 'function') {
        callback();
      }
    }),
    finished = _.once(function () {
      if (eventInfo) {
        SWUtils.setWrapper({update_twoweapon_attack: 0}, PFConst.silentParams, done);
      } else {
        done();
      }
    });
  getAttrs(['update_twoweapon_attack', 'mainhand_penalty', 'offhand_penalty', 'offhand_improved', 'bab', 'offhand_str_mult'], function (vout) {
    if (eventInfo && !parseInt(vout.update_twoweapon_attack, 10)) {
      done();
      return;
    }
    getSectionIDs('repeating_weapon', function (ids) {
      var fields,
        mhpen = 0,
        ohpen = 0,
        ohatks = 0,
        babt = 0,
        mult = 0;
      if (!ids || _.size(ids) === 0) {
        finished();
        return;
      }
      mhpen = parseInt(vout.mainhand_penalty, 10) || 0;
      ohpen = parseInt(vout.offhand_penalty, 10) || 0;
      ohatks = parseInt(vout.offhand_improved, 10) || 0;
      babt = parseInt(vout.bab, 10) || 0;
      mult = parseFloat(vout.offhand_str_mult) || 0.5;
      fields = SWUtils.cartesianAppend(['repeating_weapon_'], ids, [
        '_source-main',
        '_source-off',
        '_link_type',
        '_source-main-name',
        '_source-off-name',
        '_macro-text',
        '_NPC-macro-text',
      ]);
      //TAS.debug("PFAttacks.migrateLinkedAttacks FIELDS are ",fields);
      getAttrs(fields, function (v) {
        var setter = {};
        if (ids && _.size(ids)) {
          ids.forEach(function (id) {
            var prefix = 'repeating_weapon_' + id + '_',
              linktype = parseInt(v[prefix + 'link_type'], 10),
              params = {};
            try {
              if (linktype === linkedAttackType.weapon) {
                params.mainhand_id = v[prefix + 'source-main'];
                params.offhand_id = v[prefix + 'source-off'];
                params.mainhand_penalty = mhpen;
                params.offhand_penalty = ohpen;
                params.offhand_improved = ohatks;
                params.bab = babt;
                params.mainhand_name = v[prefix + 'source-main-name'];
                params.offhand_name = v[prefix + 'source-off-name'];
                params.offhand_mult = mult;
                params['macro-text'] = v[prefix + 'macro-text'];
                params['NPC-macro-text'] = v[prefix + 'NPC-macro-text'];
                //TAS.debug("PFAttacks.createDualWield calling setDualWieldVals with ",params);
                setDualWieldVals(params, setter, id, true);
              }
            } catch (erri) {}
          });
        }
        if (_.size(setter)) {
          //TAS.debug("after updating now set with ",setter);
          SWUtils.setWrapper(setter, PFConst.silentParams, finished);
        } else {
          finished();
        }
      });
    });
  });
}

function createDualWield(v) {
  var params = {},
    setter = {};
  try {
    TAS.debug('at createDualWield:', v);
    params.mainhand_id = v.mainhand_id;
    params.offhand_id = v.offhand_id;
    params.mainhand_penalty = parseInt(v.mainhand_penalty, 10) || 0;
    params.offhand_penalty = parseInt(v.offhand_penalty, 10) || 0;
    params.offhand_improved = parseInt(v.offhand_improved, 10) || 0;
    params.bab = parseInt(v.bab, 10) || 0;
    params.mainhand_name = v.mainhand_name;
    params.offhand_name = v.offhand_name;
    params.offhand_mult = parseFloat(v.offhand_str_mult) || 0.5;
    //TAS.debug("PFAttacks.createDualWield calling setDualWieldVals with ",params);
    setter = setDualWieldVals(params, setter);
  } catch (outererr) {
    TAS.error('PFAttacks.createDualWield outererr', outererr);
  } finally {
    return setter;
  }
}

/** Creates new dual wield attack
 *
 * @param {function} callback
 */
export function createDualWieldAsync(callback) {
  var done = _.once(function () {
      if (typeof callback === 'function') {
        callback();
      }
    }),
    setDualWield = function (setter) {
      //TAS.debug("back at set Dual WIeld",setter);
      if (setter && _.size(setter)) {
        setter.create_twoweapon_attack = 0;
        setter.mainhand_id = '';
        setter.offhand_id = '';
        SWUtils.setWrapper(setter, PFConst.silentParams, function () {
          PFAttackGrid.resetCommandMacro();
          done();
        });
      } else {
        SWUtils.setWrapper({create_twoweapon_attack: 0}, PFConst.silentParams, done);
      }
    };
  getAttrs(['create_twoweapon_attack', 'mainhand_id', 'mainhand_penalty', 'offhand_id', 'offhand_penalty', 'offhand_improved', 'bab', 'offhand_str_mult'], function (v) {
    try {
      if (parseInt(v.create_twoweapon_attack, 10) === 1) {
        getSectionIDs('repeating_weapon', function (ids) {
          var fields = [],
            setter = {};
          try {
            if (!ids || _.size(ids) === 0) {
              setDualWield();
              return;
            }
            //TAS.debug("PFAttacks.createDualWield ids are ",ids);
            if (_.contains(ids, v.mainhand_id) && _.contains(ids, v.offhand_id)) {
              //TAS.debug("the ids contain the two variables");
              getAttrs(['repeating_weapon_' + v.mainhand_id + '_name', 'repeating_weapon_' + v.offhand_id + '_name'], function (w) {
                v.mainhand_name = w['repeating_weapon_' + v.mainhand_id + '_name'];
                v.offhand_name = w['repeating_weapon_' + v.offhand_id + '_name'];
                TAS.debug('they are there! calling with ', v, w);
                setter = createDualWield(v);
                setDualWield(setter);
              });
            } else {
              //TAS.debug("ids do not contain variables, check the names");
              fields = ids.map(function (id) {
                return 'repeating_weapon_' + id + '_name';
              });
              //TAS.debug("getting ",fields);
              getAttrs(fields, function (w) {
                var mainhandid = '',
                  offhandid = '';
                //TAS.debug("the names are ",w);
                _.each(w, function (val, key) {
                  TAS.debug('comparing ' + v.mainhand_id + ' to ' + val + ' of row ' + key);
                  if (val === v.mainhand_id) {
                    mainhandid = SWUtils.getRowId(key);
                    v.mainhand_name = val;
                    v.mainhand_id = mainhandid;
                  } else if (val === v.offhand_id) {
                    offhandid = SWUtils.getRowId(key);
                    v.offhand_name = val;
                    v.offhand_id = offhandid;
                  }
                });
                if (mainhandid && offhandid) {
                  TAS.debug('calling createDualWield with :', v);
                  setter = createDualWield(v);
                }
                setDualWield(setter);
              });
            }
          } catch (ierr) {
            TAS.error('PFAttacks.createDualWieldAsync ierr', ierr);
            setDualWield();
          }
        });
      }
    } catch (err) {
      TAS.error('PFAttack.createDualWieldAsync outererror', err);
      setDualWield();
    }
  });
}

/** Recalculates all other non macro fields on the repeating attacks
 * calls getRecalculatedAttack and resetWeaponSizeAndDamage
 * @param {[string]} ids
 * @param {function} callback
 */
function recalcRepeatingNonMacroFields(ids, callback) {
  var done = function () {
      if (typeof callback === 'function') {
        callback();
      }
    },
    doneWithAllRows,
    fields;
  if (!ids || _.size(ids) === 0) {
    done();
    return;
  }
  doneWithAllRows = _.after(_.size(ids), done);
  fields = SWUtils.cartesianAppend(['repeating_weapon_'], ids, updateRowAttrsLU);
  fields = fields.concat(SWUtils.cartesianAppend(['repeating_weapon_'], ids, sizeFieldsLU));
  fields = fields.concat(updateCharAttrs);
  getAttrs(fields, function (v) {
    var charAttMap = {},
      setter,
      modifyDiceGlobal = 0,
      currSize = 0;
    //set values to int so we don't have to do it over and over per row.
    v = _.mapObject(v, function (val, key) {
      if (/attack\-type$/i.test(key) || /damage\-ability$/i.test(key) || /damage\-ability\-max$/i.test(key) || /damage_ability_mult$/i.test(key)) {
        return val;
      } else {
        return parseInt(val, 10) || 0;
      }
    });
    currSize = parseInt(v.size, 10) || 0;
    modifyDiceGlobal = parseInt(v.modify_dmg_by_size, 10) || 0;
    //TAS.debug("PFAttacks.recalcOtherFields has values ",v);
    setter = _.reduce(
      ids,
      function (m, id) {
        var xtra = {},
          useSize = 0;
        try {
          if (modifyDiceGlobal && v['repeating_weapon_' + id + '_size_affects']) {
            useSize = 1;
          }
          if (v['repeating_weapon_' + id + '_attack-type'] !== 'dual') {
            xtra = getRecalculatedAttack(id, v);
            resetWeaponSizeAndDamage(id, currSize, v, xtra, useSize);
            _.extend(m, xtra);
          }
        } catch (erri) {
          TAS.error('PFAttacks.recalcOtherFields erri', erri);
        } finally {
          return m;
        }
      },
      {},
    );
    if (_.size(setter)) {
      SWUtils.setWrapper(setter, {}, done);
    } else {
      done();
    }
  });
}
/** Recalculates all attack and defense macro fields on the repeating attacks
 *
 * @param {[string]} ids
 * @param {function} callback
 */
function recalcRepeatingMacroFields(ids, callback) {
  var done = _.once(function () {
      if (typeof callback === 'function') {
        callback();
      }
    }),
    doneWithCalculatedFields = _.after(_.size(ids), done),
    fields;
  fields = _.chain(ids)
    .map(function (id) {
      var prefix = 'repeating_weapon_' + id + '_';
      return [prefix + 'damage', prefix + 'attack', prefix + 'crit_confirm', prefix + 'damage-mod', prefix + 'attack-mod', prefix + 'crit_confirm_temp'];
    })
    .flatten()
    .value();
  getAttrs(fields, function (v) {
    try {
      _.each(ids, function (id) {
        var doneWithField = _.after(4, doneWithCalculatedFields),
          prefix = 'repeating_weapon_' + id + '_';
        if ((!v[prefix + 'damage'] || v[prefix + 'damage'] === '0' || v[prefix + 'damage'] === '+0') && parseInt(v[prefix + 'damage-mod'], 10) === 0) {
          doneWithField();
        } else {
          SWUtils.evaluateAndSetNumber(prefix + 'damage', prefix + 'damage-mod', 0, doneWithField, true);
        }
        if ((!v[prefix + 'attack'] || v[prefix + 'attack'] === '0' || v[prefix + 'attack'] === '+0') && parseInt(v[prefix + 'attack-mod'], 10) === 0) {
          doneWithField();
        } else {
          SWUtils.evaluateAndSetNumber(prefix + 'attack', prefix + 'attack-mod', 0, doneWithField, true);
        }
        if ((!v[prefix + 'crit_confirm'] || v[prefix + 'crit_confirm'] === '0' || v[prefix + 'crit_confirm'] === '+0') && parseInt(v[prefix + 'crit_confirm_temp'], 10) === 0) {
          doneWithField();
        } else {
          SWUtils.evaluateAndSetNumber(prefix + 'crit_confirm', prefix + 'crit_confirm_temp', 0, doneWithField, true);
        }
        //TAS.debug("recalcRepeatingMacroFields updating damage ability for "+id);
        SWUtils.setDropdownValue(prefix + 'attack-type', prefix + 'attack-type-mod', null, doneWithField, true);
        SWUtils.setDropdownValue(prefix + 'damage-ability', prefix + 'damage-ability-mod', null, doneWithField, true);
      });
    } catch (err) {
      TAS.error('recalcEquationFields', err);
      done();
    }
  });
}
export function updateRepeatingAttacks(attackType) {
  var updateRow = function (id) {
    var prefix = 'repeating_weapon_' + id + '_';
    SWUtils.setDropdownValue(
      prefix + 'attack-type',
      prefix + 'attack-type-mod',
      null,
      function () {
        updateRepeatingWeaponAttackAsync(id);
      },
      true,
    );
  };
  getSectionIDs('repeating_weapon', function (ids) {
    if (!ids || _.size(ids) === 0) {
      return;
    }
    _.each(ids, function (id) {
      updateRow(id);
    });
    //recalcRepeatingNonMacroFields(ids);
  });
}

export function recalcRepeatingWeapon(id, callback) {
  recalcRepeatingMacroFields([id], function () {
    recalcRepeatingNonMacroFields([id], callback);
  });
}

export function recalculateRepeatingWeapons(callback) {
  var done = _.once(function () {
      //TAS.debug("leaving PFAttacks.recalculateRepeatingWeapons");
      if (typeof callback === 'function') {
        callback();
      }
    }),
    doneWithNonDual = function () {
      updateDualWieldAttacks(callback);
    };
  getSectionIDs('repeating_weapon', function (ids) {
    if (!ids || _.size(ids) === 0) {
      done();
      return;
    }
    recalcRepeatingMacroFields(ids, function () {
      recalcRepeatingNonMacroFields(ids, doneWithNonDual);
    });
  });
}
/** removes the given id link from any attacks.
 * @param {function} callback to call when done
 * @param {int} linkType value from PFAttacks.linkedAttackType
 * @param {string} linkid string of source id attack links to
 */
export function removeLinkedAttack(callback, linkType, linkid) {
  var done = _.once(function () {
      if (typeof callback === 'function') {
        callback();
      }
    }),
    attrprefix = '',
    attrprefix2 = '';
  switch (linkType) {
    case linkedAttackType.ability:
      attrprefix = 'source-ability';
      break;
    case linkedAttackType.equipment:
      attrprefix = 'source-item';
      break;
    case linkedAttackType.spell:
      attrprefix = 'source-spell';
      break;
    case linkedAttackType.weapon:
      attrprefix = 'source-main';
      attrprefix2 = 'source-off';
      break;
    default:
      done();
      return;
  }
  getSectionIDs('repeating_weapon', function (ids) {
    var fields, attrs;
    if (!ids || _.size(ids) === 0) {
      done();
      return;
    }
    attrs = ['_' + attrprefix, '_' + attrprefix + '-name'];
    if (attrprefix2) {
      attrs.push('_' + attrprefix2);
      attrs.push('_' + attrprefix2 + '-name');
      attrs.push('_name');
    }
    fields = SWUtils.cartesianAppend(['repeating_weapon'], ids, attrs);
    getAttrs(fields, function (v) {
      var setter = {};
      ids.forEach(function (id) {
        var prefix = 'repeating_weapon_' + id + '_';
        if (v[prefix + attrprefix] === linkid) {
          setter[prefix + 'link_type'] = 0;
          setter[prefix + attrprefix] = '';
          setter[prefix + attrprefix + '-name'] = '';
          if (attrprefix2) {
            setter[prefix + attrprefix2] = '';
            setter[prefix + attrprefix2 + '-name'] = '';
            setter[prefix + 'name'] = 'UNLINKED ' + v[prefix + 'name'];
          }
        }
      });
      if (_.size(setter)) {
        SWUtils.setWrapper(setter, PFConst.silentParams, done);
      } else {
        done();
      }
    });
  });
}
function setNewDefaults(ids, v, setter) {
  var localsetter, defaultSize;
  try {
    setter = setter || {};
    defaultSize = parseInt(v['size'], 10) || 0;
    localsetter = _.reduce(
      ids,
      function (m, id) {
        var prefix = 'repeating_weapon_' + id + '_';
        try {
          m[prefix + 'default_size'] = defaultSize;
          if (v[prefix + 'damage-dice-num']) {
            m[prefix + 'default_damage-dice-num'] = v[prefix + 'damage-dice-num'];
          } else {
            m[prefix + 'default_damage-dice-num'] = 0;
            m[prefix + 'damage-dice-num'] = 0;
          }
          if (v[prefix + 'damage-die']) {
            m[prefix + 'default_damage-die'] = v[prefix + 'damage-die'];
          } else {
            m[prefix + 'default_damage-die'] = 0;
            m[prefix + 'damage-die'] = 0;
          }
        } catch (errin) {
          TAS.error('PFAttacks.setNewDefaultsSync errin id ' + id, errin);
        } finally {
          return m;
        }
      },
      {},
    );
    _.extend(setter, localsetter);
  } catch (errout) {
    TAS.error('PFAttacks.getNewDefaults errout ', errout);
  } finally {
    return setter;
  }
}
export function setNewDefaultsAsync(callback) {
  var done = _.once(function () {
      //TAS.debug("leaving PFAttacks.setNewDefaults");
      if (typeof callback === 'function') {
        callback();
      }
    }),
    finishedMigrating = _.once(function () {
      SWUtils.setWrapper({migrated_attacklist_defaults111: 1}, PFConst.silentParams, done);
    });
  //TAS.debug("At PFAttacks.setNewDefaults");
  getAttrs(['migrated_attacklist_defaults111'], function (vsize) {
    var upd = parseInt(vsize['migrated_attacklist_defaults111'], 10) || 0;
    if (upd) {
      done();
      return;
    }
    getSectionIDs('repeating_weapon', function (ids) {
      var fields;
      if (!(ids || _.size(ids))) {
        finishedMigrating();
        return;
      }
      fields = SWUtils.cartesianAppend(['repeating_weapon_'], ids, ['_damage-dice-num', '_damage-die']);
      fields.push('size');
      getAttrs(fields, function (v) {
        var setter = {};
        try {
          setter = setNewDefaults(ids, v, setter);
        } catch (errout) {
          TAS.error('PFAttacks.setNewDefaults errout ', errout);
        } finally {
          if (_.size(setter)) {
            SWUtils.setWrapper(setter, PFConst.silentParams, finishedMigrating);
          } else {
            done();
          }
        }
      });
    });
  });
}

export function migrateLinkedAttacks(callback, oldversion) {
  var done = _.once(function () {
    if (typeof callback === 'function') {
      callback();
    }
  });
  if (oldversion <= 0 && oldversion >= 1.5) {
    done();
    return;
  }
  getSectionIDs('repeating_weapon', function (ids) {
    var fields;
    if (!ids || _.size(ids) === 0) {
      done();
      return;
    }
    fields = SWUtils.cartesianAppend(['repeating_weapon_'], ids, [
      '_source-item',
      '_source-spell',
      '_source-ability',
      '_source-main',
      '_source-off',
      '_source-spell-name',
      '_source-ability-name',
    ]);
    fields.push('migrated_linked_attacks');
    getAttrs(fields, function (v) {
      var setter = {};
      if (parseInt(v.migrated_linked_attacks, 10)) {
        done();
        return;
      }
      ids.forEach(function (id) {
        var toSet = 0;
        if (v['repeating_weapon_' + id + '_source-item']) {
          toSet = linkedAttackType.equipment;
        } else if (v['repeating_weapon_' + id + '_source-spell']) {
          toSet = linkedAttackType.spell;
        } else if (v['repeating_weapon_' + id + '_source-ability']) {
          toSet = linkedAttackType.ability;
          if (v['repeating_weapon_' + id + '_source-spell-name'] && !v['repeating_weapon_' + id + '_source-ability-name']) {
            setter['repeating_weapon_' + id + '_source-ability-name'] = v['repeating_weapon_' + id + '_source-spell-name'];
            setter['repeating_weapon_' + id + '_source-spell-name'] = '';
          }
        } else if (v['repeating_weapon_' + id + '_source-main'] || v['repeating_weapon_' + id + '_source-off']) {
          toSet = linkedAttackType.weapon;
        }
        setter['repeating_weapon_' + id + '_link_type'] = toSet;
      });
      setter.migrated_linked_attacks = 1;
      if (_.size(setter)) {
        SWUtils.setWrapper(setter, PFConst.silentParams, done);
      } else {
        done();
      }
    });
  });
}

export function migrate(callback, oldversion) {
  var done = _.once(function () {
    //TAS.debug("leaving PFAttacks.migrate");
    if (typeof callback === 'function') {
      callback();
    }
  });
  getAttrs(['migrated_damage-multiplier'], function (v) {
    var migrateDamage = 0,
      migrateIteratives = 0;
    migrateDamage = parseInt(v['migrated_damage-multiplier'], 10) || 0;
    migrateIteratives = parseInt(v['migrated_attacklist_defaults111']);
    if (migrateDamage && migrateIteratives) {
      done();
      return;
    }
    getSectionIDs('repeating_weapon', function (ids) {
      var callmigrateMacrostov64, callmigrateRepeatingDamage, callSetDefaults;
      try {
        if (!ids || _.size(ids) <= 0) {
          SWUtils.setWrapper({'migrated_damage-multiplier': 1, migrated_attacklist_defaults111: 1}, PFConst.silentParams, done);
          return;
        }
        callSetDefaults = function () {
          setNewDefaultsAsync(function () {
            migrateLinkedAttacks(done);
          });
        };
        callmigrateRepeatingDamage = function () {
          if (!migrateDamage) {
            PFMigrate.migrateRepeatingDamage(ids, callSetDefaults);
          } else {
            callSetDefaults();
          }
        };
        callmigrateRepeatingDamage();
      } catch (err) {
        TAS.error('PFAttacks.migrate', err);
        done();
      } finally {
      }
    });
  });
}
export var recalculate = TAS.callback(function callPFAttacksRecalculate(callback, silently, oldversion) {
  var done = function () {
    TAS.info('leaving PFAttacks.recalculate');
    if (typeof callback === 'function') {
      callback();
    }
  };
  //TAS.debug("at PFAttacks.recalculate");
  PFAttackGrid.recalculate(
    function () {
      migrate(function () {
        setAdvancedMacroCheckbox();
        recalculateRepeatingWeapons();
        PFAttackGrid.resetCommandMacro();
        PFAttackOptions.recalculate();
        updateAssociatedAttacksFromParents();
        adjustAllDamageDiceAsync();
        done();
      }, oldversion);
    },
    silently,
    oldversion,
  );
});
function registerEventHandlers() {
  on(
    'change:repeating_weapon:attack-type',
    TAS.callback(function eventHandleRepeatingAttackDropdown(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        //should do this every time api is used due to loops we can't eliminate:
        //if (eventInfo.previousValue !== eventInfo.newValue){
        PFUtilsAsync.setRepeatingDropdownValue(
          'weapon',
          null,
          'attack-type',
          'attack-type-mod',
          function (newval, oldval, changed) {
            if (changed) {
              updateRepeatingWeaponAttackQuick(eventInfo, newval, oldval);
            }
          },
          true,
        );
        updateRepeatingWeaponCritAsync(null, eventInfo);
        setRepeatingWeaponInsertMacro(null, eventInfo);
        //if (eventInfo.previousValue.indexOf('ange')>0 || eventInfo.newValue.indexOf('ange')>0)
        setRepeatingWeaponRangedFlag();
        //if there is a damage buff, we need to update damage if the type changed.
        updateRepeatingWeaponDamage(null, eventInfo);
      }
    }),
  );
  on(
    'change:repeating_weapon:attack',
    TAS.callback(function eventRepeatingWeaponAttack(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      SWUtils.evaluateAndSetNumber(
        'repeating_weapon_attack',
        'repeating_weapon_attack-mod',
        0,
        function (newval, oldval, changed) {
          if (changed) {
            updateRepeatingWeaponAttackQuick(eventInfo, newval, oldval);
          }
        },
        true,
      );
    }),
  );
  on(
    'change:repeating_weapon:attack-type-mod change:repeating_weapon:attack-mod',
    TAS.callback(function eventUpdateRepeatingWeaponAttackSheet(eventInfo) {
      if (eventInfo.sourceType === 'sheetworker' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        updateRepeatingWeaponAttackAsync(null, eventInfo);
      }
    }),
  );
  on(
    'change:repeating_weapon:masterwork change:repeating_weapon:proficiency',
    TAS.callback(function eventUpdateRepeatingWeaponAttackPlayer(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        updateRepeatingWeaponAttackAsync(null, eventInfo);
      }
    }),
  );
  on(
    'change:repeating_weapon:damage-ability',
    TAS.callback(function eventHandleRepeatingDamageDropdown(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api' || eventInfo.sourceType === 'sheetworker') {
        PFUtilsAsync.setRepeatingDropdownValue('weapon', null, 'damage-ability', 'damage-ability-mod');
      }
    }),
  );
  on(
    'change:repeating_weapon:damage',
    TAS.callback(function eventRepeatingWeaponDamage(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      SWUtils.evaluateAndSetNumber(
        'repeating_weapon_damage',
        'repeating_weapon_damage-mod',
        0,
        function (newval, oldval, changed) {
          if (changed) {
            updateRepeatingWeaponDamageDiff(id, newval, oldval);
          }
        },
        true,
      );
    }),
  );

  on(
    'change:repeating_weapon:crit_confirm',
    TAS.callback(function eventWeaponCritConfirmBonus(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      SWUtils.evaluateAndSetNumber(
        'repeating_weapon_crit_confirm',
        'repeating_weapon_crit_confirm_temp',
        0,
        function (newval, oldval, changed) {
          if (changed) {
            updateRepeatingWeaponCritConfDiff(eventInfo, newval, oldval);
          }
        },
        true,
      );
    }),
  );
  // on("change:repeating_weapon:crit_confirm change:buff_crit_conf-total", TAS.callback(function eventWeaponCritConfirmBonus(eventInfo) {
  // 	if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
  // 		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
  // 		updateRepeatingWeaponCritAsync(null, eventInfo);
  // 	}
  // }));

  on(
    'change:repeating_weapon:damage_ability_mult',
    TAS.callback(function eventUpdateRepeatingWeaponDamagePlayer(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        updateRepeatingWeaponDamage(null, eventInfo);
      }
    }),
  );
  on(
    'change:repeating_weapon:damage-ability-max',
    TAS.callback(function eventUpdateRepeatingWeaponDamageMaxPlayer(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        updateRepeatingWeaponDamage(null, eventInfo);
      }
    }),
  );
  on(
    'change:repeating_weapon:damage-ability-mod change:repeating_weapon:damage-mod',
    TAS.callback(function eventUpdateRepeatingWeaponDamageSheet(eventInfo) {
      if (eventInfo.sourceType === 'sheetworker' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        updateRepeatingWeaponDamage(null, eventInfo);
      }
    }),
  );
  on(
    'change:repeating_weapon:enhance',
    TAS.callback(function eventUpdateRepeatingWeaponAttackAndDamage(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        updateRepeatingWeaponAttackAsync(null, eventInfo);
        updateRepeatingWeaponDamage(null, eventInfo);
      }
    }),
  );
  _.each(PFAttackGrid.attackGridFields, function (attackFields, attack) {
    on(
      'change:' + attackFields.crit,
      TAS.callback(function eventAttackCrit(eventInfo) {
        if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
          TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
          updateRepeatingWeaponsFromCritAsync(attack, eventInfo);
        }
      }),
    );

    on(
      'change:' + attackFields.critconfirm,
      TAS.callback(function eventAttackCrit(eventInfo) {
        if (eventInfo.sourceType === 'sheetworker' || eventInfo.sourceType === 'api') {
          TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
          let attack = 'melee';
          updateRepeatingWeaponsFromCritAsync(attack, eventInfo);
        }
      }),
    );

    on(
      'change:' + attackFields.atk,
      TAS.callback(function eventAttackUpdate(eventInfo) {
        if (eventInfo.sourceType === 'sheetworker' || eventInfo.sourceType === 'api') {
          TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
          TAS.debug('Yeah baby!');
          //recalculateRepeatingWeapons();
          updateRepeatingAttacks(eventInfo.sourceAttribute);
          //updateRepeatingWeaponAttacks(); //does not exist yet
        }
      }),
    );
  });

  on(
    'change:repeating_weapon:default_damage-dice-num change:repeating_weapon:default_size change:repeating_weapon:default_damage-die change:repeating_weapon:size_affects',
    TAS.callback(function eventWeaponDice(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        adjustDamageDiceAsync();
      }
    }),
  );
  on(
    'change:repeating_weapon:damage-dice-num change:repeating_weapon:damage-die',
    TAS.callback(function eventWeaponDice(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        syncDefaultDamageDiceAsync();
      }
    }),
  );
  on(
    'remove:repeating_weapon change:repeating_weapon:attack-type change:_reporder_repeating_weapon change:repeating_weapon:group change:repeating_weapon:name change:include_attack_totals',
    TAS.callback(function eventRepeatingWeaponChange(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        PFAttackGrid.resetCommandMacro();
      }
    }),
  );
  on(
    'remove:repeating_weapon',
    TAS.callback(function eventUpdateRepeatingWeaponAttackPlayer(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        removeLinkedAttack(null, linkedAttackType.weapon, SWUtils.getRowId(eventInfo.sourceAttribute));
      }
    }),
  );
  on(
    'change:create_twoweapon_attack',
    TAS.callback(function eventCreateTwoWeaponAttack(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        createDualWieldAsync();
      }
    }),
  );
  on(
    'change:update_twoweapon_attack',
    TAS.callback(function eventUpdateDualWield(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        updateDualWieldAttacks(null, eventInfo);
      }
    }),
  );
}
registerEventHandlers();
