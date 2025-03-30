import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFSheet from './PFSheet';
import PFDB from './PFDB';
import * as PFMigrate from './PFMigrate';
import * as PFUtils from './PFUtils';
import * as PFSize from './PFSize';
import * as PFSkills from './PFSkills';
import * as PFAbilityScores from './PFAbilityScores';
import * as PFBuffs from './PFBuffs';

let npcCompendiumAttributesPlayer = [
  'npc-spellike-ability-text',
  'npc-spells-known-text',
  'character_name',
  'cr_compendium',
  'xp_compendium',
  'alignment',
  'size_compendium',
  'type_compendium',
  'init_compendium',
  'senses_compendium',
  'npc-aura',
  'ac_compendium',
  'npc_hp_compendium',
  'fort_compendium',
  'ref_compendium',
  'will_compendium',
  'dr_compendium',
  'sr_compendium',
  'npc-defensive-abilities',
  'immunities',
  'resistances',
  'weaknesses',
  'speed_compendium',
  'space_compendium',
  'reach_compendium',
  'npc-melee-attacks-text',
  'npc-ranged-attacks-text',
  'npc-special-attacks',
  'str_compendium',
  'dex_compendium',
  'con_compendium',
  'int_compendium',
  'wis_compendium',
  'cha_compendium',
  'bab_compendium',
  'cmb_compendium',
  'cmd_compendium',
  'class_compendium',
  'npc-feats-text',
  'skills_compendium',
  'racial_mods_compendium',
  'environment',
  'organization',
  'other_items_treasure',
  'languages',
  'SQ_compendium',
  'content_compendium',
  'npc-spells-prepared_compendium',
];

/* ******************************** PARSING ******************************** */

/** returns number from a string, first looks at end of string, then beginning, then anywhere in middle
 * so it works with both compendium (number at end) and SRD ("init " number at beginning) or just a string number
 *@param {string} initstring from the compendium entry
 *@returns {int} the initiative modifier
 */
function getNPCInit(initstring) {
  let numberInit, matches;
  //Init +0;
  initstring = PFUtils.convertDashToMinus(initstring);
  initstring = SWUtils.trimBoth(initstring);
  if (/^Init/i.test(initstring) || /^[\+\-]{0,1}\d+/.test(initstring)) {
    //number at front
    numberInit = PFUtils.getIntFromString(initstring, true);
  } else if ((matches = initstring.match(/[\+\-]{0,1}\d+$/)) !== null) {
    //number at end
    initstring = initstring.slice(matches.index);
    if (initstring[0] !== '+') {
      initstring = '-' + initstring;
    }
    numberInit = parseInt(initstring.match(/[\-\+]\d+$/), 10) || 0;
  } else {
    numberInit = PFUtils.getIntFromString(initstring, true);
  }
  return numberInit;
}
/*buildImportantFeatObj - saves feats that require updates to the sheet in an object, no spaces and all lowercase.
 * returns sub objects for feats that only apply to certain attacks, and a criticaldamage subobject.
 * for instance:::  obj.weaponfinesse=1 obj.criticaldamage.bleedingcritical:1 obj.longsword.weaponfocus:1
 * @returns object of feats   as  {featname:1,feat2name:1, attacks:{attack1name:{featname:1}}, criticaldamage:{featname:1}}
 */
function buildImportantFeatObj(featlist) {
  TAS.debug('buildImportantFeatObj is ', featlist);
  let importantFeats = _.chain(featlist)
    .filter(function (feat) {
      if (!feat) {
        return false;
      }
      return true;
    })
    .filter(function (feat) {
      return PFDB.importantFeatRegExp.test(feat);
    })
    .map(function (feat) {
      //TAS.debug("checking <" + feat + "> for ending letter");
      //if there is an "endnote" letter indicator at the end then remove it
      //some end with B for instance
      feat = SWUtils.trimBoth(feat);
      if (/\b[A-Z]$/i.test(feat)) {
        feat = feat.slice(0, -2);
        feat = SWUtils.trimBoth(feat);
      }
      return feat;
    })
    .reduce(function (memo, feat) {
      let origfeat = feat,
        atktype = '',
        matches,
        attacks = {},
        attack = {},
        crits = {},
        skills = [],
        skill = '';
      try {
        if (feat.indexOf('(') >= 0) {
          matches = /(.*?)\((.*)\)/.exec(feat);
          TAS.debug('looking at ' + feat + ', split into ', matches);
          feat = matches[1];
          atktype = matches[2];
          feat = SWUtils.trimBoth(feat);
          atktype = SWUtils.trimBoth(atktype);
        }
        feat = feat.replace(/\s/g, '').toLowerCase();
        if (feat === 'improvedcritical' || feat === 'criticalmastery') {
          return memo;
        }
        memo[feat] = 1;
        if (feat.indexOf('critical') > 0) {
          atktype = feat;
          feat = 'criticaldamage';
          crits = memo.criticaldamage || {};
          crits[atktype] = 1;
          memo.criticaldamage = crits;
        } else if (feat.indexOf('skillfocus') >= 0) {
          skill = atktype.replace(' ', '-');
          if (skill) {
            skill = skill[0].toUpperCase() + skill.slice(1);
            skills = memo.skillfocuses || [];
            skills.push(skill);
            memo.skillfocuses = skills;
          }
        } else if (feat === 'weaponfinesse' || feat === 'improvedcritical') {
          attacks = memo.attacks || {};
          attack = attacks[atktype] || {};
          attack[feat] = 1;
          attacks[atktype] = attack;
          memo.attacks = attacks;
        }
      } catch (err) {
        TAS.error('buildImportantFeatObj error:', err);
        memo[feat] = 1;
      } finally {
        return memo;
      }
    }, {})
    .value();
  TAS.debug('returning important feats:', importantFeats);
  return importantFeats;
}
/** parseNPChp - parses statblock hp string such as 203 (14d10+126)
 * @param {string} hpstring - string format: "15 (3d8 + 4) Fast Healing 5"  can have multiple xdy, and any string left after ) is considered healing note.
 * @param {int} abilityMod: number representing ability score mod (normally CON-mod)
 * @returns {{hp:number,hdie1:number,hdice1:number,hdie2:number,hdice2:number,misc:number,heal:string}
 */
function parseNPChp(hpstring, abilityMod) {
  let hparray = {
      hp: 0,
      hdie1: 0,
      hdice1: 0,
      basehp: 0,
      misc: 0,
      heal: '',
    },
    totalAbility = 0,
    tempInt = 0,
    dice,
    calcHP = 0;
  try {
    abilityMod = abilityMod || 0;
    if (/^hp/i.test(hpstring)) {
      hpstring = hpstring.slice(2);
    }
    //this line should fix flying squirrel:
    hpstring = PFUtils.replaceMissingNegatives_BadDice(hpstring);
    hpstring = PFUtils.convertDashToMinus(hpstring);
    hpstring = hpstring.replace('plus', '+');
    //TAS.debug"parseNPChp", hpstring, abilityMod);
    hparray.hp = parseInt(hpstring, 10) || 0;
    hpstring = hpstring.slice(hpstring.indexOf('(') + 1);
    dice = PFUtils.getDiceDieFromString(hpstring, true);
    if (dice.dice !== 0) {
      hparray.hdice1 = dice.dice;
      hparray.hdie1 = dice.die;
      totalAbility = abilityMod * hparray.hdice1;
      hparray.misc = dice.plus - totalAbility;
      //set the base hp (for class/race) to only the hd average, so will be less than what is in statblock
      hparray.basehp = PFUtils.getAvgHP(hparray.hdice1, hparray.hdie1);
      //check total, if does not match, change 'misc' attr
      calcHP = hparray.basehp + dice.plus;
      if (calcHP !== hparray.hp) {
        TAS.warn('parseNPChp, hp not adding right, should be:' + hparray.hp + ' but getNPCHP returns ' + calcHP, hparray);
        hparray.misc += hparray.hp - calcHP;
      }
      hpstring = hpstring.slice(dice.spaces + 1);
    }
    if (hpstring) {
      hpstring = SWUtils.trimBoth(hpstring.replace(/[\);]/g, ''));
      hparray.heal = hpstring || '';
    }
  } catch (err) {
    TAS.error('parseNPChp', err);
  } finally {
    return hparray;
  }
}
/** parseNPCAC - parses AC string from statblock
 * @param {string} acstring - format: "24, Touch 24, Flat-footed 16 (+6 Deflection, +7 Dex, +1 Dodge, +1 Armor, +1 Shield, +1 Size, +6 Natural) some note can go here"
 * can start with "AC " or not.
 * if it doesn't add up then the bonus will be added to misc.
 * (others include: Luck, Sacred/Profane, Circumstance, Enhancement, Insight, Morale) - these ALL go to CMD too (and dodge, deflection).
 * @param {string} cmdStr string for cmd , just checks for a number in the string
 * @param {int} abilityMod - to apply, usually dex.
 * @param {int} sizeMod - ac mod due to size.
 * @returns {ac:10,touch:10,ff:10,armor:0,shield:0,deflect:0,dex:0,dodge:0,natural:0,misc:0,note:,size:0,acbuff:0,altability:""}
 */
function parseNPCAC(acstring, cmdStr, abilityMod, sizeMod) {
  let matches,
    tempnum = 0,
    tempstr = '',
    acMap = {
      ac: 10,
      touch: 10,
      ff: 10,
      armor: 0,
      shield: 0,
      deflect: 0,
      dex: 0,
      dodge: 0,
      natural: 0,
      misc: 0,
      note: '',
      size: 0,
      altability: '',
      acbuff: 0,
      uncanny: 0,
      cmd: 10,
      notes: '',
      cmdnotes: '',
    };
  abilityMod = abilityMod || 0;
  sizeMod = sizeMod || 0;
  //TAS.debug"parseNPCAC: string:" + acstring + ", ability:" + abilityMod + ", size:" + sizeMod);
  try {
    if (/^ac\s/i.test(acstring)) {
      acstring = acstring.slice(3);
    }
    acMap.ac = parseInt(acstring, 10) || 0;

    matches = cmdStr.match(/(\d+)/); //get first match
    if (matches && matches[1]) {
      //TAS.debug("getting cmd matches is cmd is : "+matches[1],matches);
      acMap.cmd = parseInt(matches[1], 10) || 0;
      tempstr = cmdStr.slice(matches.index + matches[0].length);
      if (tempstr) {
        tempstr = SWUtils.trimBoth(tempstr);
        acMap.cmdnotes = tempstr;
      }
    }

    //get other AC totals
    matches = acstring.match(/Touch\s*?(\d+)/i);
    if (matches && matches[1]) {
      acMap.touch = parseInt(matches[1], 10);
    }
    matches = acstring.match(/Flat\-footed\s*?(\d+)/i);
    if (matches && matches[1]) {
      acMap.ff = parseInt(matches[1], 10);
    }
    //get modifiers compendium has all negatives as "1" instead of "-1"
    matches = acstring.match(/([+\-]??\d+)\s*?Deflect[,\i\s]/i);
    if (matches && matches[1]) {
      acMap.deflect = parseInt(matches[1], 10);
    }
    matches = acstring.match(/([+\-]??\d+)\s*?Nat[,u\s]/i);
    if (matches && matches[1]) {
      acMap.natural = parseInt(matches[1], 10);
    }
    matches = acstring.match(/([+\-]??\d+)\s*?Dodge/i);
    if (matches && matches[1]) {
      acMap.dodge = parseInt(matches[1], 10);
    }
    matches = acstring.match(/([+\-]??\d+)\s*?Size/i);
    if (matches && matches[1]) {
      acMap.size = parseInt(matches[1], 10);
    }
    //compendium size wrong: missing minus sign.
    // see Marilith
    if (acMap.size !== sizeMod) {
      acMap.size = sizeMod;
    }
    matches = acstring.match(/([+\-]??\d+)\s*?armor/i);
    if (matches && matches[1]) {
      acMap.armor = parseInt(matches[1], 10);
    }
    matches = acstring.match(/([+\-]??\d+)\s*?shield/i);
    if (matches && matches[1]) {
      acMap.shield = parseInt(matches[1], 10);
    }
    matches = acstring.match(/\)\s*?(.*)/);
    if (matches && matches[1]) {
      acMap.note = matches[1];
    }
    //get ability modifier, should be Dex by default.
    matches = acstring.match(/([+\-]??\d+)\s*?Dex/i);
    if (matches && matches[1]) {
      acMap.dex = parseInt(matches[1], 10) || 0;
      //if different then set, compendium error no minus
      // see Fire Giant.
      if (abilityMod !== acMap.dex) {
        acMap.dex = abilityMod;
      }
    } else {
      matches = acstring.match(/([+\-]??\d+)\s*?(Wis|Int|Str|Con|Cha)/i);
      if (matches && matches[1] && matches[2]) {
        acMap.dex = parseInt(matches[1], 10) || 0;
        //should not happen anymore since 6th printing of PRD they removed abilities that change ability to AC, now
        // just add dodge instead.
        acMap.altability = matches[2].toUppercase();
      }
    }
    //check total for any other (untyped, Luck, Sacred/Profane, Circumstance, Enhancement, Insight, Morale)
    //touch - if touch does not add up put difference in misc. (AC not match we'll put in a buff row)
    // we need to track a separate ac misc buff/penalty. we can put it in buffs.
    tempnum = acMap.dodge + acMap.dex + acMap.deflect + acMap.size + 10;
    if (acMap.touch !== tempnum) {
      acMap.misc = acMap.touch - tempnum;
    }
    //if AC does not add up, even including misc found above, then put it in ac buff row.
    tempnum = acMap.armor + acMap.shield + acMap.dodge + acMap.dex + acMap.natural + acMap.deflect + acMap.size + acMap.misc + 10;
    if (acMap.ac !== tempnum) {
      acMap.acbuff = acMap.ac - tempnum;
    }
    //check for not caught flat footed
    if (acMap.ac === acMap.ff && (acMap.dex > 0 || acMap.dodge > 0)) {
      acMap.uncanny = 1;
    }
  } catch (err) {
    TAS.error('parseNPCAC', err);
  } finally {
    return acMap;
  }
}
/* parseSpeed -returns object with speeds {land:base,fly:xx,swim:xx} etc*/
function parseSpeed(speedstr) {
  let speeds = speedstr.split(/,\s*/),
    retobj;
  retobj = _.reduce(
    speeds,
    function (memo, speedComponent, idx) {
      let matches,
        speedNum = 0;
      try {
        if (idx === 0) {
          speedNum = parseInt(speedComponent.match(/(\d+)/)[1], 10) || 0;
          if (speedNum) {
            memo['land'] = speedNum;
          }
        } else {
          matches = speedComponent.match(/([\w]+)\s*(\d+)/);
          if (matches) {
            speedNum = parseInt(matches[2], 10) || 0;
            if (speedNum) {
              memo[matches[1].toLowerCase()] = speedNum;
              if (/fly/i.test(matches[1])) {
                matches = speedComponent.match(/\(([\w]+)\)/);
                if (matches && matches[1].length > 0) {
                  memo['flyability'] = matches[1];
                }
              }
            }
          }
        }
      } catch (err) {
        TAS.error('parseSped', err);
      } finally {
        return memo;
      }
    },
    {},
  );
  return retobj;
}
/* getAtkNameFromStr get names of an attack or special attack
 * { Name :(full str up to first parens) , abilityName (without pluses the base ability ), basename (ability name lower case no spaces)}
 * for instance: Mwk Longsword +6/+1 would be : {name:Mwk longsword +6/+1, abilityName:Longsword, basename: longsword}
 */
function getAtkNameFromStr(abilitystr) {
  let matches = abilitystr.match(/^\s*([^\(]+)/),
    name = '',
    abilityName = '',
    basename = '';
  if (matches && matches[1]) {
    name = matches[1];
    name = SWUtils.trimBoth(name);
    abilityName = name.replace(/\d+d\d+|\-\d+|\+|\d+|\//g, '');
    abilityName = SWUtils.trimBoth(abilityName);
    abilityName = abilityName[0].toUpperCase() + abilityName.slice(1);
    basename = abilityName.toLowerCase();
    basename = basename.replace(/ray|cone|aura|mwk/gi, '');
    basename = basename.replace(/\s+/g, '');
  }
  return {
    name: name,
    basename: basename,
    abilityName: abilityName,
  };
}
/*parseReach - parses reach string from compendium or statblock: giant frog: Reach 5 ft. (15 ft. with tongue)
 * returns the default reach, rest of the string (if any), and an array of exceptions and reaches if any.
 * @returns = {reach:number (5,10,15 etc), reachNotes:"rest of string", reachExceptions:[['Bite':10],['Claw':5]]}
 */
function parseReach(reachStr) {
  let numerator = 0,
    denominator = 1,
    tempInt = 0,
    tempFloat = 0.0,
    tempstr,
    restOf = '',
    matches,
    exceptionstr = '',
    tempArray = [],
    reachExceptions = [],
    retobj = {
      reach: 5,
      reachNotes: '',
      reachExceptions: [],
    };
  if (!reachStr) {
    return retobj;
  }
  try {
    //to handle PRD, SRD:
    matches = reachStr.match(/reach/i);
    if (matches) {
      reachStr = reachStr.slice(matches.index + matches[0].length);
    }
    reachStr = SWUtils.trimBoth(reachStr);
    reachStr = PFUtils.convertDashToMinus(reachStr);
    reachStr = reachStr.replace('21/2', '2-1/2');
    reachStr = reachStr.replace('2.5', '2-1/2');
    if (reachStr.slice(0, 5) === '2-1/2') {
      retobj.reach = 2.5;
      exceptionstr = reachStr.slice(5);
    } else {
      retobj.reach = parseInt(reachStr, 10) || 0;
      exceptionstr = PFUtils.getNoteAfterNumber(reachStr);
    }
    if (exceptionstr && exceptionstr.indexOf('(') >= 0) {
      retobj.reachNotes = exceptionstr;
      exceptionstr = SWUtils.trimBoth(
        exceptionstr
          .replace('(', '')
          .replace(')', '')
          .replace(/with\s/gi, '')
          .replace(';', '')
          .replace(/ft[\.\s]*/gi, '')
          .replace(/,\s*/g, ','),
      );
      if (exceptionstr) {
        tempArray = exceptionstr.split(',');
        reachExceptions = _.reduce(
          tempArray,
          function (memo, exceptioninstance) {
            let reachExceptions = [],
              matches;
            try {
              if (exceptioninstance.slice(0, 5) === '2-1/2') {
                reachExceptions.push(SWUtils.trimBoth(exceptioninstance.slice(5)));
                if (reachExceptions[0]) {
                  reachExceptions.push(2.5);
                  memo.push(reachExceptions);
                }
              } else {
                reachExceptions.push(PFUtils.getNoteAfterNumber(reachStr) || '');
                if (reachExceptions[0]) {
                  reachExceptions.push(parseInt(reachStr, 10) || 0);
                  memo.push(reachExceptions);
                }
              }
            } catch (erri) {
              TAS.error('parseReach inner error erri:', erri);
            } finally {
              return memo;
            }
          },
          [],
        );
        if (reachExceptions && reachExceptions.length > 0) {
          retobj.reachExceptions = reachExceptions;
        }
      }
    }
  } catch (err) {
    TAS.error('parseReach error:', err);
  } finally {
    return retobj;
  }
}
function getCreatureClassSkills(creatureType) {
  let typeToCheck = creatureType.toLowerCase().replace(/\s/g, ''),
    classSkills,
    subSkills;
  try {
    subSkills = _.find(PFDB.creatureTypeClassSkills, function (skills, mainType) {
      let reg = new RegExp(mainType);
      return reg.test(typeToCheck);
    });
    if (subSkills && subSkills.length > 0) {
      classSkills = subSkills;
    }
    subSkills = _.find(PFDB.creatureSubtypeClassSkills, function (skills, mainType) {
      let reg = new RegExp(mainType);
      return reg.test(typeToCheck);
    });
    if (subSkills) {
      if (classSkills) {
        classSkills = classSkills.concat(subSkills);
      } else {
        classSkills = subSkills;
      }
    }
  } catch (err) {
    TAS.error('parseCreatureClassSkills', err);
  } finally {
    if (classSkills) {
      return classSkills;
    }
    return [];
  }
}
/* assignPrimarySecondary
 * to each attack in array, assigns attack.naturaltype='primary|secondary' and sometimes attack.dmgMult=1.5
 * returns attacks for chaining.
 */
function assignPrimarySecondary(attacks) {
  let attackGroups, attacksToCheck;
  try {
    attacksToCheck = _.filter(attacks, function (attack) {
      return attack.type === 'natural';
    });
    if (_.size(attacksToCheck) <= 0) {
      return attacks;
    }
    if (_.size(attacksToCheck) === 1) {
      attacksToCheck[0].naturaltype = 'primary';
      if ((attacksToCheck[0].iter && attacksToCheck[0].iter.length === 1) || isNaN(parseInt(attacksToCheck[0].iter, 10))) {
        attacksToCheck[0].dmgMult = 1.5;
      }
    } else {
      attackGroups = _.groupBy(attacksToCheck, function (attack) {
        return PFDB.primaryNaturalAttacksRegExp.exec(attack.name);
      });
      if (_.size(attackGroups) === 1) {
        _.each(attacksToCheck, function (attack) {
          attack.naturaltype = 'primary';
        });
      } else {
        _.each(attacksToCheck, function (attack) {
          if (PFDB.primaryNaturalAttacksRegExp.test(attack.name)) {
            attack.naturaltype = 'primary';
          } else {
            attack.naturaltype = 'secondary';
          }
        });
      }
    }
  } catch (err) {
    TAS.error('assignPrimarySecondary', err);
  } finally {
    return attacks;
  }
}
function parseAttack(atkstr, atktypestr, addgroups, groupidx, isUndead) {
  let matches,
    currpos = 0,
    name = '',
    iteratives,
    i = 0,
    tempInt = 0,
    dice,
    beforeBetweenAfterParens,
    bonus = '',
    origStr = atkstr,
    countspaces = 0,
    specCMB = 0,
    abilityBaseName = '',
    tempstr = '',
    tempidx = 0,
    names,
    attackdescs,
    retobj = {
      enh: 0,
      mwk: 0,
      name: '',
      basename: '',
      atktype: 'melee',
      type: '',
      range: '',
      countFullBAB: 1,
      iter: [],
      dmgdice: 0,
      dmgdie: 0,
      dmgtype: '',
      crit: 20,
      critmult: 2,
      dmgbonus: 0,
      plus: '',
      plusamount: '',
      plustype: '',
      note: '',
    };
  try {
    TAS.debug('parseAttack: ' + atkstr);
    if (addgroups) {
      //retobj.name += "Group " + groupidx + ": ";
      retobj.group = 'Full attack ' + groupidx;
    }
    names = getAtkNameFromStr(atkstr);
    retobj.name += names.name;
    retobj.basename = names.basename;
    atkstr = SWUtils.trimBoth(atkstr);
    //if starts with number, it means number of attacks
    matches = atkstr.match(/^(\d+)\s*/);
    if (matches && matches[1]) {
      retobj.countFullBAB = parseInt(matches[1], 10) || 1;
      //move up
      atkstr = atkstr.slice(matches[0].length);
    }
    //starts with '+/-' number or 'mwk': enh or mwk
    matches = atkstr.match(/^([+\-]\d+|mwk)\s*/i);
    if (matches) {
      //starts with +n, is weapon
      //retobj.name += matches[0];
      if (matches[1].toLowerCase() === 'mwk') {
        retobj.mwk = 1;
      } else {
        retobj.enh = parseInt(matches[1], 10) || 0;
      }
      retobj.type = 'weapon'; //for sure is a weapon
      //move up
      atkstr = atkstr.slice(matches[0].length);
    }
    if (PFDB.cmbPlusStrsrch.test(retobj.basename)) {
      retobj.atktype = 'cmb';
      retobj.vs = 'cmd';
      retobj.type = 'natural';
      specCMB = 1;
    } else if (atktypestr === 'melee' && PFDB.combatManeuversRegExp.test(retobj.basename)) {
      retobj.atktype = 'cmb';
      retobj.vs = 'cmd';
    } else if (PFDB.cmbMonsterSrch.test(retobj.basename)) {
      retobj.atktype = 'cmb';
      retobj.type = 'natural';
      retobj.vs = 'cmd';
    } else if (/web/i.test(retobj.basename)) {
      retobj.atktype = 'ranged';
      retobj.type = 'special';
      retobj.vs = 'touch';
      retobj.range = 10;
    } else if (/touch/i.test(retobj.basename)) {
      if (/range/i.test(retobj.basename)) {
        retobj.atktype = 'ranged';
      } else {
        retobj.atktype = 'melee';
      }
      retobj.vs = 'touch';
    } else if (/special/i.test(atktypestr)) {
      retobj.atktype = 'special';
      retobj.type = 'special';
    } else {
      retobj.atktype = atktypestr;
    }
    if (!retobj.type) {
      if (PFDB.naturalAttackRegExp.test(retobj.basename)) {
        retobj.type = 'natural';
      } else if (PFDB.unarmedAttacksRegExp.test(name)) {
        retobj.type = 'unarmed';
      } else {
        retobj.type = 'weapon';
      }
    }
    if (!retobj.vs) {
      if (/touch|web/i.test(retobj.name)) {
        retobj.vs = 'touch';
        if (/ranged|web/i.test(retobj.name)) {
          retobj.atktype = 'ranged';
          if (/web/i.test(retobj.basename)) {
            retobj.range = 10;
          }
        }
      }
    }
    //skip past name
    atkstr = SWUtils.trimBoth(atkstr);
    matches = atkstr.match(/^[a-z\s]+/i);
    //matches = atkstr.match(/\s*([^0-9\/\+\-\(]+)/);
    if (matches && matches[0]) {
      if (matches.index) {
        tempidx = matches.index;
      }
      atkstr = atkstr.slice(tempidx + matches[0].length);
    }
    TAS.debug('PFNPCParse atkstr is now ' + atkstr);
    if (atkstr) {
      //after name split rest by parenthesis
      // format: name   attack bonus ( damage ) plus additional
      beforeBetweenAfterParens = atkstr.split(/\(|\)/);
      //attack amounts before paren
      iteratives = beforeBetweenAfterParens[0].split(/\//);
      if (/\d/.test(iteratives[0])) {
        retobj.iter = _.map(iteratives, function (iter, index) {
          if (/^[+\-]/.test(iter)) {
            return parseInt(iter, 10) || 0;
          }
          //minus missing assume minus
          return -1 * (parseInt(iter, 10) || 0);
        });
      } else if (retobj.atktype === 'cmb') {
        retobj.iter[0] = 0;
      }
      //damage between parens
      if (beforeBetweenAfterParens[1]) {
        attackdescs = beforeBetweenAfterParens[1].split(/,\s*/);
        //TAS.debug("pfattackparse split on commas: ",attackdescs);
        //split on commas and strip out non damage, put damage in tempstr
        tempstr = _.reduce(
          attackdescs,
          function (memo, subattack) {
            //TAS.debug("current comma is "+subattack);
            if (/ft\./i.test(subattack)) {
              retobj.range = subattack;
            } else if (/D[Cc]\s\d+/.test(subattack)) {
              matches = subattack.match(/(D[Cc]\s\d+)/);
              retobj.DC = matches[1].toUpperCase();
              retobj.DCability = PFDB.specialAttackDCAbilityBase[retobj.basename] || 'CON';
              if (isUndead && retobj.DCability === 'CON') {
                retobj.DCability = 'CHA';
              }
              retobj.DCEquation = PFUtils.getDCString(retobj.DCability, 'npc-hd-num', isUndead);
              //TAS.debug("PFNPCParser.parseAttack looking for dc save:"+subattack);
              matches = subattack.match(/(Will|Fort|Ref|Fortitude|Reflex)\s*D[Cc]\s*\d+([^),.])/i);
              if (matches) {
                if (matches[1]) {
                  tempstr = matches[1][0].toUpperCase() + matches[1].slice(1).toLowerCase();
                  retobj.save = tempstr;
                }
                if (matches[2]) {
                  retobj.save += ' ' + matches[2];
                }
              } else {
                matches = subattack.match(/(Will|Fort|Ref|Fortitude|Reflex)/i);
                if (matches) {
                  if (matches[1]) {
                    tempstr = matches[1][0].toUpperCase() + matches[1].slice(1).toLowerCase();
                    retobj.save = tempstr;
                  }
                }
              }
            } else if (/freq|day|constant|at.will/i.test(subattack)) {
              retobj.frequency = subattack;
            } else if (/AC|hp/.test(subattack) || !/\d|plus/.test(subattack)) {
              //if no number or 'plus' don't know what to do so stick it in note.
              retobj.note += subattack + ', ';
            } else {
              memo += subattack + ' ';
            }
            return memo;
          },
          '',
        );
        // find damage
        //damage dice and die
        tempstr = SWUtils.trimBoth(tempstr);
        dice = PFUtils.getDiceDieFromString(tempstr, true, true);
        TAS.debug('##### Attack dice parse of ' + tempstr + ' is ', dice);
        if (dice && dice.dice) {
          retobj.dmgdice = dice.dice;
          retobj.dmgdie = dice.die;
          retobj.dmgbonus = dice.plus;
          tempstr = tempstr.slice(dice.spaces); //no plus 1 why?
        }

        //look for crit
        TAS.debug('PFParseAttack e3:' + tempstr);
        if (tempstr) {
          //--does not find dash in crit check for different types of minus
          let critter = PFUtils.getCritFromString(tempstr, true);
          TAS.debug('PFParseAttack e4:' + tempstr + ', crits:', critter);
          retobj.crit = critter.crit;
          retobj.critmult = critter.critmult;
          tempstr = tempstr.slice(critter.spaces);
        }
        bonus = SWUtils.trimBoth(tempstr);

        //any text after damage is 'plus' or damage type
        if (bonus) {
          //if engulf or swallowwhole, there will be inner AC and hp to put in notes
          if (specCMB) {
            matches = bonus.match(/\sac\s\d+/i);
            if (matches) {
              retobj.note += bonus.slice(matches.index);
              bonus = SWUtils.trimBoth(bonus.slice(0, matches.index));
            }
          }
          //look for plus
          matches = bonus.match(/plus(.*)/i);
          if (matches) {
            tempstr = SWUtils.trimBoth(matches[1]);
            bonus = SWUtils.trimBoth(bonus.slice(0, matches.index));
            if (/\d+d\d+/i.test(tempstr)) {
              matches = tempstr.match(/(\d+d\d+)\s*([\w\s]*)/);
              retobj.plusamount = matches[1];
              if (matches[2]) {
                retobj.plustype = matches[2].replace(/^\s+|\s+$/g, '');
              }
            } else {
              retobj.plus = tempstr;
            }
          }
          if (bonus && bonus.length > 0) {
            retobj.dmgtype += bonus;
          }
        }
        //TAS.debug("Parse e5 retobj:",retobj);
        if (
          retobj.atktype !== 'cmb' &&
          !retobj.iter[0] &&
          retobj.dmgtype &&
          retobj.dmgdice &&
          retobj.dmgdie &&
          !retobj.plusamount &&
          !retobj.plustype &&
          !/bludg|slash|pierc/i.test(retobj.dmgtype)
        ) {
          retobj.plustype = retobj.dmgtype;
          tempstr = String(retobj.dmgdice) + 'd' + String(retobj.dmgdie);
          if (retobj.dmgbonus) {
            if (retobj.dmgbonus > 0) {
              tempstr += '+' + retobj.dmgbonus;
            } else {
              tempstr += '-' + Math.abs(retobj.dmgbonus);
            }
          }
          retobj.plusamount = tempstr;
          retobj.dmgtype = '';
          retobj.dmgdice = 0;
          retobj.dmgdie = 0;
        }
      }
      //any notes at end
      i = 2;
      while (i < beforeBetweenAfterParens.length) {
        //can use filter then reduce, or use each, or use easy for loop.
        retobj.note += SWUtils.trimBoth(beforeBetweenAfterParens[i]);
        i++;
      }
    }
    if (retobj.note) {
      retobj.note = SWUtils.trimBoth(retobj.note);
    }
  } catch (err) {
    TAS.error('parseAttack: error parsing:' + atkstr, err);
    if (retobj.name) {
      retobj.name += ' ';
    }
    retobj.name += 'Could not parse attack!';
    retobj.note = origStr + ' , error: ';
    retobj.note += err;
  } finally {
    TAS.debug('parse attack returning parse of ' + atkstr, retobj);
    return retobj;
  }
}
/** parseAttacks parse atttack string one at a time, returns arrays grouped by full attacks
 * attacks split by commas, full attack groups split by 'or'
 * the name of the attack starts with Group 0, Group 1, etc.
 * @param {string} atkstr
 * @param {string} atktypestr "melee" or "ranged"
 * @returns {[{enh:0,mwk:0,name:"",atktype:"melee",type:"",countFullBAB:1,plus:"",plusamount:"",plustype:"",note:"",iter:[],dmgdice:0,dmgdie:0,crit:20,critmult:2,dmgbonus:0}]}
 */
function parseAttacks(atkstr, atktypestr, cmbval) {
  let atkarrayout,
    atkarraysub,
    attacksouter = [],
    matches,
    addgroups = false;
  try {
    if (!atkstr) {
      return null;
    }
    if (!atktypestr) {
      atktypestr = 'melee';
    }
    if (atkstr.slice(0, atktypestr.length).toLowerCase() === atktypestr) {
      atkstr = atkstr.slice(atktypestr.length);
    }
    if (atkstr[0] === '*' || atkstr[0] === ':') {
      atkstr = atkstr.slice(1);
    }
    atkstr = SWUtils.trimBoth(atkstr);
    atkstr = PFUtils.convertDashToMinus(atkstr);
    atkstr = PFUtils.replaceMissingNegatives_BadDice(atkstr);
    atkstr = PFUtils.replaceMissingNegatives_CritRange(atkstr);
    //TAS.debug("########","Now the attack is ",atkstr);
    atkarrayout = atkstr.split(/\bor\b/i);
    if (atkarrayout.length > 1) {
      addgroups = true;
    }
    attacksouter = _.reduce(
      atkarrayout,
      function (memoout, atkstrout, groupidx) {
        let atkarray, attacks;
        try {
          atkarray = SWUtils.splitByCommaIgnoreParens(atkstrout); //.split(/,\s*(?![^\(\)]*\))/),
          if (atkarray.length > 1) {
            addgroups = true;
          }
          //TAS.debug('parseattacks outer group: ' + groupidx);
          attacks = _.reduce(
            atkarray,
            function (memo, atkstr) {
              let retobj;
              try {
                //TAS.debug('parseattacks: ' + atkstr);
                retobj = parseAttack(atkstr, atktypestr, addgroups, groupidx, cmbval);
                //TAS.debug("parseAttacks return for this attack: ",retobj);
                if (retobj) {
                  memo.push(retobj);
                }
              } catch (erri) {
                TAS.error('parseAttacks', erri);
              } finally {
                return memo;
              }
            },
            [],
          );
        } catch (erro) {
          TAS.error('parseAttacks', erro);
        } finally {
          return memoout.concat(attacks);
        }
      },
      [],
    );
  } catch (err3) {
    TAS.error('parseAttacks', err3);
  }
  return attacksouter;
}
function parseSkillRacialBonuses(racialstr) {
  //abilitymods = modify default ability score for a skill
  let abilitieslower = _.map(PFAbilityScores.abilities, function (ab) {
      return ab.toLowerCase();
    }),
    allCoreSkillsLower = _.map(PFSkills.allCoreSkills, function (skill) {
      return skill.toLowerCase();
    }),
    skillsWithSubSkillsLower = _.map(PFSkills.skillsWithSubSkills, function (skill) {
      return skill.toLowerCase();
    }),
    skillsWithSpaces = PFSkills.skillsWithSpaces,
    temparray,
    modifiers = [],
    abilitymodstr = '',
    abilitymodlower = '',
    ability = '',
    setability = false,
    tempskill = '',
    matches,
    skillmods = {},
    skillnotes = [],
    abilitymods = {},
    retobj = {
      skillmods: skillmods,
      skillnotes: skillnotes,
      abilitymods: abilitymods,
    };
  if (!racialstr) {
    return retobj;
  }
  temparray = racialstr.split(';');
  if (temparray.length > 1) {
    racialstr = temparray[0];
    abilitymodstr = temparray[1];
  }
  if (abilitymodstr) {
    try {
      abilitymodlower = abilitymodstr.toLowerCase();
      ability = _.find(abilitieslower, function (ab) {
        return abilitymodlower.indexOf(ab) >= 0;
      });
      if (ability) {
        tempskill = _.find(allCoreSkillsLower, function (skill) {
          return abilitymodlower.indexOf(skill) >= 0;
        });
        if (tempskill) {
          abilitymods[tempskill[0].toUpperCase() + tempskill.slice(1)] = ability.toLowerCase();
          setability = true;
        }
      }
    } catch (err1) {
      TAS.error('parseSkillRacialBonuses inner', err1);
    }
    if (!setability) {
      skillnotes.push(abilitymodstr);
    }
  }
  modifiers = racialstr.split(/,\s*/);
  _.each(modifiers, function (modstr) {
    let modstrlower = modstr.toLowerCase(),
      mod = 0,
      moddedTitle,
      modded = '',
      tempstr = '',
      exceptionstr = '',
      conditionmod = 0,
      conditionstr = '',
      hasSubSkill = false,
      matches;
    try {
      matches = modstr.match(/\s*([+\-]\d+)\s*(?:on|to)?\s*([\w]+)\s*([\w\s]+)?\s*(\([^)]*\))?/);
      if (!matches) {
        //is an exception or note
        tempskill = _.find(allCoreSkillsLower, function (skill) {
          return modstrlower.indexOf(skill) >= 0;
        });
        if (tempskill) {
          ability = _.find(abilitieslower, function (ab) {
            return modstrlower.indexOf(ab) >= 0;
          });
          if (ability) {
            abilitymods[tempskill.toLowerCase()] = ability;
          } else {
            skillnotes.push(modstr);
          }
        } else {
          skillnotes.push(modstr);
        }
        return;
      }
      exceptionstr = matches[3];
      mod = parseInt(matches[1], 10) || 0;
      modded = matches[2];
      if (!_.contains(allCoreSkillsLower, modded.toLowerCase())) {
        //TAS.warn("does not match " + modded);
        // +8 Sleight of Hand
        tempskill = _.find(skillsWithSpaces, function (skill) {
          return modstrlower.indexOf(skill) >= 0;
        });
        if (!tempskill || tempskill.length < 1) {
          //not sure what this is
          skillnotes.push(modstr);
          return;
        }
        temparray = tempskill.split(/\s/);
        temparray = _.map(temparray, function (part) {
          if (part === 'of') {
            return 'of';
          }
          return part[0].toUpperCase() + part.slice(1);
        });
        modded = temparray.join('-');
        exceptionstr = exceptionstr.slice(tempskill.length - tempskill.indexOf(' ') + 1);
        //TAS.debug("found skill with space converted to modded:"+modded+", exceptionstr:"+exceptionstr);
      }
      if (exceptionstr) {
        //entire thing is a "when" exception
        skillnotes.push(modstr);
        return;
      }
      moddedTitle = modded[0].toUpperCase() + modded.slice(1);
      if (!matches[4]) {
        skillmods[moddedTitle] = mod;
        return;
      }
      //if craft, knowledge, etc
      exceptionstr = matches[4].replace(/^\s+|\(|\)|\s+$/g, '');
      if (_.contains(skillsWithSubSkillsLower, modded.toLowerCase())) {
        exceptionstr = exceptionstr[0].toUpperCase() + exceptionstr.slice(1);
        if (modded.toLowerCase() === 'knowledge') {
          moddedTitle += '-' + exceptionstr;
        } else {
          moddedTitle += '[' + exceptionstr + ']';
        }
        skillmods[moddedTitle] = mod;
      } else {
        //has bonus
        matches = exceptionstr.match(/([+\-]\d+)\s(.*)$/);
        if (matches && matches[1]) {
          conditionmod = parseInt(matches[1], 10) || 0;
          if (matches[2]) {
            conditionstr = matches[2];
          }
          conditionmod = conditionmod - mod;
          skillmods[moddedTitle] = mod;
          tempstr = (conditionmod > 0 ? '+' : '') + conditionmod + ' ' + moddedTitle + ' ' + conditionstr;
          skillnotes.push(tempstr);
        } else {
          skillnotes.push(modstr);
        }
      }
    } catch (err) {
      TAS.error('parseSkillRacialBonuses outer error', err);
      skillnotes.push(modstr);
    }
  });
  return retobj;
}
function parseSkills(skillstr) {
  let rawSkills = skillstr.match(/[\w][\w\s]+\s*(?:\([\w\s,]+\))?\s*[+\-]\d+[,]??/g),
    skills = _.reduce(
      rawSkills,
      function (memo, skill) {
        let matches = skill.match(/^([\w][\w\s]+[\w])\s*(\([\w\s,]+\))??([+\s]+\d+)$/),
          tempskill = '',
          tempval = 0,
          tempskill2 = '',
          subskills;
        if (matches) {
          tempval = parseInt(matches[3], 10) || 0;
          tempskill = matches[1].replace(/^\s+|\s+$/g, '');
          tempskill = tempskill[0].toUpperCase() + tempskill.slice(1);
          tempskill = tempskill.replace(/\s/g, '-');
          if (matches[2]) {
            subskills = matches[2].split(/,\s*/);
            _.each(subskills, function (subskill) {
              subskill = subskill.replace(/^\s+|,|\(|\)|\s+$/g, '');
              subskill = subskill[0].toUpperCase() + subskill.slice(1);
              if (tempskill === 'Knowledge') {
                subskill = '-' + subskill;
              } else {
                subskill = '[' + subskill + ']';
              }
              memo[tempskill + subskill] = tempval;
            });
          } else {
            memo[tempskill] = tempval;
          }
        }
        return memo;
      },
      {},
    );
  return skills || {};
}
function parseAbilityScores(v) {
  let aS = {};
  aS.str = PFAbilityScores.getAbilityAndMod(v.str_compendium);
  aS.dex = PFAbilityScores.getAbilityAndMod(v.dex_compendium);
  aS.con = PFAbilityScores.getAbilityAndMod(v.con_compendium);
  aS.wis = PFAbilityScores.getAbilityAndMod(v.wis_compendium);
  aS['int'] = PFAbilityScores.getAbilityAndMod(v.int_compendium);
  aS.cha = PFAbilityScores.getAbilityAndMod(v.cha_compendium);
  return aS;
}
function parseSpecialAttack(setter, sastr) {
  let origsastr,
    names,
    tempstr,
    tempstr2,
    match,
    matches,
    parensplit,
    atktyp = 'special',
    baseability = '',
    abilitytype = '',
    isAttack = false,
    retobj = {};
  try {
    origsastr = sastr;
    names = getAtkNameFromStr(sastr);
    if (sastr.indexOf('(') >= 0) {
      if (PFDB.spAttackAttacksPreProcess.test(names.basename)) {
        //preprocess
        if (/rake/i.test(names.basename)) {
          sastr = PFUtils.removeUptoFirstComma(sastr, true);
        } else if (/rend/i.test(names.basename)) {
          sastr = PFUtils.removeUptoFirstComma(sastr);
        } else if (/web/i.test(names.basename)) {
          sastr = PFUtils.removeUptoFirstComma(sastr, true);
          sastr = 'web ' + sastr;
          atktyp = 'ranged';
        }
        isAttack = true;
      } else if (PFDB.spAttackAttacks.test(names.basename)) {
        isAttack = true;
      }
    } else if (/damage|drain|dmg/i.test(names.basename) && !/blood|energy/i.test(names.basename) && PFDB.abilitySrch.test(names.basename)) {
      match = names.basename.match(/damage|drain/i);
      names.AbilityName = 'Ability ' + match[0];
      sastr = names.AbilityName + ' (' + sastr + ')';
      isAttack = true;
    }

    if (isAttack) {
      retobj = parseAttack(sastr, atktyp, false, 0);
      retobj.specialtype = 'attack';
      retobj.group = 'Special';
      retobj.name = names.AbilityName && names.AbilityName.slice(0, 7) === 'Ability' ? names.AbilityName : names.name;
      retobj.basename = names.basename;
    }
    if (!isAttack) {
      retobj.name = names.abilityName || names.name;
      retobj.basename = names.basename;
      retobj.specialtype = 'ability';
      retobj.rule_category = 'special-attacks';
      matches = /usable\severy/i.exec(origsastr);
      if (matches) {
        retobj.frequency = 'everyrounds';
        tempstr = origsastr.slice(matches.index + matches[0].length);
        tempstr2 = PFUtils.getDiceDieString(tempstr);
        if (tempstr2) {
          retobj.used = tempstr2;
          matches = tempstr.match(/rounds|days|minutes/i);
          if (matches) {
            retobj.used += ' ' + matches[0];
          }
        }
      }
      if (PFDB.specialAttackDCAbilityBase[retobj.basename]) {
        retobj.DCability = PFDB.specialAttackDCAbilityBase[retobj.basename];
        if (parseInt(setter['is_undead'], 10) === 1 && retobj.DCability === 'CON') {
          retobj.DCability = 'CHA';
        }
      }
      retobj.shortdesc = PFUtils.replaceDCString(PFUtils.replaceDiceDieString(origsastr), retobj.DCability, 'npc-hd-num', setter.is_undead);
    }
    abilitytype = PFUtils.getSpecialAbilityTypeFromString(sastr);
    if (abilitytype) {
      retobj.ability_type = abilitytype;
    }
  } catch (err) {
    TAS.error('parseSpecialAttack', err);
  } finally {
    return retobj;
  }
}
function parseSpecialAttacks(setter, saString, cmb) {
  let retarray;
  if (!saString) {
    return {};
  }
  retarray = SWUtils.splitByCommaIgnoreParens(saString); //.split(/,\s*(?![^\(\)]*\))/);
  return _.reduce(
    retarray,
    function (memo, sa) {
      let retobj, tempstr, names;
      try {
        retobj = parseSpecialAttack(setter, sa);
      } catch (err) {
        TAS.error('parseSpecialAttacks', err);
        retobj = {};
        retobj.name = sa;
        retobj.specialtype = 'ability';
        retobj.rule_category = 'special-attacks';
      } finally {
        memo.push(retobj);
        return memo;
      }
    },
    [],
  );
}
function parseSpecialAbilities(str) {
  let saObj = {},
    initiallines,
    lines,
    extralines,
    contentstr,
    tempstr,
    lastLineIndex = 0;
  saObj.description = [];
  saObj.specialAbilities = [];
  //need to remove newlines that are right after an (Su) this is necessary for PRD
  str = str.replace(/\((Ex|Sp|Su)\)\s*(?:\r\n|[\n\v\f\r\x85\u2028\u2029])/gi, '($1) ');
  //break on newlines
  //We break 3 spaces, or on last period before a (Ex|Sp|Su)
  //because sometimes special abilities do not have newlines between them.
  lines = str.split(/\s\s\s|\r\n|[\n\v\f\r\x85\u2028\u2029]|special abilities|\.(?=[^\.]+\((?:Ex|Sp|Su)\))/i);
  //here is the one that grabs period before (su)
  //	initiallines = str.split(/(?:\s\s\s|\r\n|^|[\.\n\v\f\r\x85\u2028\u2029])(?=\s*spells[:\s]|\s*[\w\s]+:|[^\.\v\r\n\x85\u2028\u2029]+(?:\(Su\):??|\(Ex\):??|\(Sp\):??))/i);
  lines = SWUtils.trimBoth(lines).filter(function (line) {
    return line && !/^special abilities$/i.test(line);
  });
  //TAS.debug("PFNPCParser.parseSpecialAbilities  split into ",lines);
  saObj = _.reduce(
    lines,
    function (memo, line) {
      let spObj = {},
        splitter = '',
        tempstr = '',
        startIdx,
        endIdx = -1,
        matches,
        abilitytype = '';
      try {
        //TAS.debug("PFNPCParser.parseSpecialAbilities on line:"+line);
        //why am i removing non word characters from the ends? what would be there?
        matches = line.match(/\((Su|Ex|Sp)\)|^(\w+):/i);
        if (!matches) {
          //this is just part of the description
          memo.description.push(line + '\r\n');
        } else if (matches[2]) {
          spObj.name = matches[2];
          spObj.description = SWUtils.trimBoth(line.slice(matches[0].length + 1));
          memo.specialAbilities.push(spObj);
        } else {
          tempstr = line.slice(0, matches.index);
          spObj.name = tempstr.replace(/^[^\w]+|[^\w]$/, '');
          spObj.basename = spObj.name.replace(/\s/g, '').toLowerCase();
          spObj.rule_category = 'special-abilities';
          spObj.ability_type = matches[1][0].toUpperCase() + matches[1][1].toLowerCase();
          spObj.description = SWUtils.trimBoth(line.slice(matches.index + matches[0].length + 1));
          matches = spObj.description.match(/(\d+d\d+) (?:points of){0,1}(.*?) damage/i);
          if (matches) {
            if (matches[1]) {
              spObj.extraDamage = '[[' + matches[1] + ']]';
            }
            if (matches[2]) {
              spObj.extraDamageType = matches[2];
            }
          } else {
            matches = spObj.description.match(/([a-z]) for (\d+d\d+) (rounds|minutes|hours|days)/i);
            if (matches) {
              if (matches[2]) {
                spObj.extraDamage = '[[' + matches[2] + ']] ' + matches[3] || '';
              }
              if (matches[1]) {
                spObj.extraDamageType = matches[1];
              }
            }
          }
          //before dc is usually 'the save'
          matches = spObj.description.match(/dc is (cha|con|wis|int|str|dex)[a-zA-Z]*.based/i);
          //TAS.debug"parseSpecialAbilities looking for DC ability it is: ",matches);
          if (matches && matches[1]) {
            tempstr = matches[1].toUpperCase();
            spObj.DCability = tempstr;
            //TAS.debug"parseSpecialAbilities setting DC ability to "+tempstr);
          } else if (PFDB.specialAttackDCAbilityBase[spObj.basename]) {
            spObj.DCability = PFDB.specialAttackDCAbilityBase[spObj.basename];
            //TAS.debug"parseSpecialAbilities setting DC ability to "+spObj.DCability+" based on "+ spObj.basename);
          }
          //before dc could be 'must make a', 'fails a'
          matches = spObj.description.match(/DC (\d+) (Will|Fort|Ref)[a-zA-Z]* save/i);
          if (matches) {
            if (matches[1]) {
              spObj.DC = matches[1];
            }
            if (matches[2]) {
              tempstr = matches[2][0].toUpperCase() + matches[2].slice(1).toLowerCase();
              spObj.save = tempstr;
            }
          } else {
            matches = spObj.description.match(/(Will|Fort|Ref)[a-zA-Z]* DC (\d+) ([^),.])/i);
            if (matches) {
              if (matches[1]) {
                tempstr = matches[1][0].toUpperCase() + matches[1].slice(1).toLowerCase();
                spObj.save = tempstr;
                if (matches[3]) {
                  spObj.save += ' ' + matches[3];
                }
              }
              if (matches[2]) {
                spObj.DC = matches[2];
              }
            }
          }
          memo.specialAbilities.push(spObj);
        }
      } catch (err) {
        TAS.error('parseSpecialAbilities error parsing: ' + line + ' error is' + err);
      } finally {
        return memo;
      }
    },
    saObj,
  );
  //TAS.debug("parseSpecialAbilities returning",saObj);
  return saObj;
}
function parseSpecialQualities(str) {
  let matches,
    rawAbilities,
    saObjs = [];
  if (str) {
    //TAS.debug("PFNPCParser.parseSpecialQualities: "+str);
    //skip over "SQ" in front
    matches = str.match(/^SQ[\s:]*/i);
    if (matches) {
      str = str.slice(matches[0].length);
    }
    rawAbilities = SWUtils.splitByCommaIgnoreParens(str);
    //TAS.debug("found the following:", rawAbilities);
    _.each(rawAbilities, function (ability) {
      let saAb = {},
        type = '';
      saAb.name = ability;
      type = PFUtils.getSpecialAbilityTypeFromString(ability);
      if (type) {
        saAb.ability_type = type;
      }
      saAb.rule_category = 'special-qualities';
      saObjs.push(saAb);
    });
    //TAS.debug"returning ", saObjs);
    return saObjs;
  }
  return null;
}
function parseSLAs(spLAstr) {
  let lines,
    clname = '',
    lastFreq = '',
    tempstr = '',
    lastPerDay = 0,
    slas = {};
  try {
    slas.spellLikeAbilities = [];
    slas.CL = 0;
    slas.concentration = 0;
    slas.classname = '';
    lines = spLAstr.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/);
    _.each(lines, function (line) {
      let matches,
        slatdivider,
        SLAArray,
        freqStr = '',
        slaofTypeStr = '',
        thisSlaObj = {},
        rawDC = 0,
        tempstr2 = '',
        slatype = '',
        numPerDay = 0,
        slasOfType,
        header = 0,
        row = 0,
        hasSpellLevel = 0,
        freqIsPer = 0,
        tempsplit;
      try {
        //TAS.debug"parsing "+line);
        if (/CL\s*\d+/i.test(line) || /concentrat/i.test(line) || /psychic\smagic/i.test(line) || /spell.like.abilit/i.test(line)) {
          header = 1;
        } else if (/\u2013|\u2014|-/.test(line)) {
          row = 1;
        }
        if (header) {
          if (/CL\s*\d+/i.test(line)) {
            matches = line.match(/CL\s*(\d+)/i);
            if (matches[1]) {
              slas.CL = parseInt(matches[1], 10) || 0;
            }
          }
          if (/concentrat/i.test(line)) {
            matches = line.match(/concentrat[\w]*\s*[+\-]??(\d+)/i);
            if (matches[1]) {
              slas.concentration = parseInt(matches[1], 10) || 0;
            }
          }
          if (/psychic\smagic/i.test(line)) {
            slas.classname = 'Psychic Magic';
          } else {
            slas.classname = 'Spell-like abilities';
          }
        } else if (row) {
          //TAS.debug"splitting line "+line);
          matches = line.match(/\u2013|\u2014|\-/);
          slaofTypeStr = line.slice(matches.index + 1);
          freqStr = SWUtils.trimBoth(line.slice(0, matches.index)).toLowerCase();
          matches = freqStr.match(/constant|will|day|month/i);
          if (matches && matches[0]) {
            slatype = matches[0].toLowerCase();
            thisSlaObj.type = slatype;
            if (slatype === 'day' || slatype === 'month') {
              freqIsPer = 1;
              matches = freqStr.match(/\d+/);
              if (matches && matches[0]) {
                numPerDay = parseInt(matches[0], 10) || 0;
                thisSlaObj.perDay = numPerDay;
              }
            }
          } else {
            tempsplit = freqStr.split('/');
            if (tempsplit.length >= 2) {
              freqIsPer = 1;
              matches = tempsplit[0].match(/\d+/);
              if (matches && matches[0]) {
                numPerDay = parseInt(matches[0], 10) || 0;
                thisSlaObj.perDay = numPerDay;
              }
              slatype = 'other';
              thisSlaObj.type = slatype;
              thisSlaObj.otherPer = tempsplit[1];
            }
          }
          //TAS.debug"the frequency is " + slatype + " and are " + numPerDay + " per that");
          slasOfType = SWUtils.splitByCommaIgnoreParens(slaofTypeStr);
          //slaofTypeStr.split(/,\s*(?![^\(\)]*\))/);
          SLAArray = _.reduce(
            slasOfType,
            function (memo, sla) {
              let thissla = {},
                dcstr = '';
              try {
                thissla.type = slatype;
                if (freqIsPer && numPerDay > 0) {
                  thissla.perDay = numPerDay;
                }
                //look for spell level.
                matches = sla.match(/level\s*(\d+)/i);
                if (matches) {
                  if (matches[1]) {
                    //TAS.debug"spell level match on "+ sla+ " Is " + matches[1]);
                    thissla.spell_level = parseInt(matches[1], 10) || 0;
                    hasSpellLevel = 1;
                  }
                  sla = sla.replace(matches[0], '');
                }

                matches = sla.match(/D[Cc]\s*\d+/);
                if (matches) {
                  tempstr2 = sla.replace(matches[0], '');
                  tempstr = matches[0].match(/\d+/);
                  rawDC = parseInt(tempstr, 10) || 0;
                  thissla.DC = rawDC;
                  matches = tempstr2.match(/\b(fortitude|willpower|reflex|fort|will|ref)\b([^,]+,)/i);
                  if (matches) {
                    thissla.save = matches[0]; //type of save up to first comma after it
                  }
                }
                //if parenthesis, name should be only what is in parens,
                if (sla.indexOf('(') > 0) {
                  thissla.name = sla.slice(0, sla.indexOf('(') - 1);
                  tempstr = sla.slice(sla.indexOf('(') - 1);
                  //sla= tempstr;
                  //summon spells have levels
                  thissla.shortdesc = tempstr;
                } else {
                  thissla.name = sla;
                }
                if (thissla.spell_level && /^summon/i.test(thissla.name)) {
                  thissla.name += ' Level ' + String(thissla.spell_level);
                }
                memo.push(thissla);
              } catch (errslain) {
                TAS.error('parseSLAs, error reducing to SLAArray for: ' + sla, errslain);
                if (!thissla.name) {
                  thissla.name = sla;
                } else {
                  thissla.description = sla;
                }
                memo.push(thissla);
              } finally {
                return memo;
              }
            },
            [],
          );
          if (SLAArray && _.size(SLAArray) > 0) {
            thisSlaObj.type = slatype;
            if (freqIsPer && numPerDay > 0) {
              thisSlaObj.perDay = numPerDay;
            }
            thisSlaObj.SLAs = SLAArray;
            slas.spellLikeAbilities.push(thisSlaObj);
          }
        } else {
          TAS.warn('Cannot parse ' + line);
          return;
        }
      } catch (ierr) {
        TAS.error('parseSLAs error parsing' + line, ierr);
      }
    });
  } catch (err) {
    TAS.error('parseSLAs', err);
  } finally {
    if (slas.spellLikeAbilities && _.size(slas.spellLikeAbilities) > 0) {
      return slas;
    }
    return null;
  }
}
/** parseSpells - parses spell string from compendium and returns js object
 *@param {string} spellstr the block of spells known text ex: "Sorcerer Spells Known (CL 8th)\r\n3rd (3/day)-Fireball (DC12)," etc
 *@returns {{classname:string,classLevel:number,concentration:number,domains:[string],oppositionschools:string, spellsByLevel:[{spelllevel:number,perDay:number,spells:[{name:string,DC:number,isDomain:number}]}]}
 */
function parseSpells(spellstr) {
  let lines,
    spells = {};
  if (!spellstr) {
    return null;
  }
  spells.classLevel = -1;
  spells.concentration = -1;
  spells.classname = '';
  spells.spellsByLevel = [];
  spells.spellnotes = '';
  lines = spellstr.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/);
  spells = _.reduce(
    lines,
    function (omemo, line) {
      let matches,
        spellarray,
        slatdivider,
        splittedSpells,
        dcstr,
        tempstr,
        temparray = [],
        match,
        thislvl = {},
        slasOfType;
      try {
        if (/C[Ll]\s*\d+/i.test(line)) {
          if (omemo.classLevel === -1) {
            matches = line.match(/C[Ll]\s*(\d+)/i);
            if (matches && matches[1]) {
              omemo.classLevel = parseInt(matches[1], 10) || 0;
            }
            matches = line.match(/concentrat[\w]*\s*[+\-]??(\d+)/i);
            if (matches && matches[1]) {
              omemo.concentration = parseInt(matches[1], 10) || 0;
            }
            matches = line.match(/([\w\s]*)spells\s(?:known|prepared)/i);
            if (matches && matches[1]) {
              omemo.classname = matches[1].replace(/^\s|\s$/g, '');
              omemo.classname = omemo.classname.toLowerCase();
            } else if (/spells\sprepared/i.test(line)) {
              omemo.classname = 'cleric'; //if prep caster then not a sorcerer
            } else {
              omemo.classname = 'sorcerer'; //default
            }
          }
        } else if (/opposition schools|domains/i.test(line)) {
          match = line.match(/opposition schools/i);
          if (match) {
            tempstr = line.slice(match.index + match[0].length);
            omemo.oppositionschools = SWUtils.trimBoth(tempstr);
          } else {
            matches = line.match(/domains/i);
            line = line.slice(matches.index + matches[0].length);
            slatdivider = line.split(',');
            temparray = slatdivider.map(function (d) {
              return SWUtils.trimBoth(d);
            });
            omemo.domains = temparray;
          }
        } else if (/\u2013|\u2014|-/.test(line)) {
          thislvl.perDay = -1;
          thislvl.spellLevel = -1;
          //look for endash, emdash, or dash default is emdash
          slatdivider = line.split(/\u2013|\u2014|-/);
          if (slatdivider && slatdivider[0]) {
            matches = slatdivider[0].match(/^(\d+)/);
            if (matches && matches[1]) {
              thislvl.spellLevel = parseInt(matches[1], 10) || 0;
              matches = slatdivider[0].match(/(\d+)\/day/i);
              if (matches && matches[1]) {
                thislvl.perDay = parseInt(matches[1], 10) || 0;
              }
            }
          }
          if (slatdivider && slatdivider[1]) {
            splittedSpells = slatdivider[1].split(',');
            spellarray = _.reduce(
              splittedSpells,
              function (memo, spell) {
                let thisspell = {};
                try {
                  matches = spell.split(/\(dc/i);
                  thisspell.name = matches[0].replace(/^\s|\s$/g, '');
                  if (matches[1]) {
                    dcstr = matches[1];
                    matches = dcstr.match(/\d+/);
                    if (matches && matches[0]) {
                      thisspell.DC = parseInt(matches[0], 10) || 0;
                    }
                  }
                  if (thisspell.name.slice(-1) === 'D') {
                    thisspell.name = SWUtils.trimBoth(thisspell.name.slice(0, -1));
                    thisspell.isDomain = 1;
                    if (!omemo.classname || omemo.classname !== 'cleric') {
                      omemo.classname = 'cleric';
                    }
                  }
                  memo.push(thisspell);
                } catch (errinner) {
                  TAS.error('PFNPCParser.parseSpells errinner on spell: ' + spell + ' on line' + line, errinner);
                } finally {
                  return memo;
                }
              },
              [],
            );
          }
          if (thislvl.spellLevel >= 0 && spellarray && spellarray.length > 0) {
            thislvl.spells = spellarray;
            omemo.spellsByLevel.push(thislvl);
          }
        } else {
          //stuff is here but what? add to notes
          omemo.spellnotes += line;
        }
      } catch (err) {
        TAS.error('PFNPCParser.parseSpells error on line ' + line, err);
      } finally {
        return omemo;
      }
    },
    spells,
  );
  return spells;
}
function parseSpace(spaceStr) {
  let retstr = spaceStr,
    matches,
    tempFloat;
  try {
    matches = spaceStr.match(/\s*(\d*\.?\d*)?/);
    if (matches) {
      tempFloat = parseFloat(matches[1]);
      if (!isNaN) {
        retstr = String(tempFloat);
      }
    }
  } finally {
    return retstr;
  }
}
/** Gets info on caster from the spells known/prepared section.
 * @param {Map<string,any>} spellObj output from parseSpells
 * @param {Map<string,number>} abilityScores ability score base and modifiers
 * @param {Map<string,any>} healthObj output from parseNPChp
 * @param {boolean} isSLA if spell-like-ability then 1 else 0
 * @returns {{'classname':string,'ability':string,'abilityMod':number,'CL':number,'concentrationBonus':number,'oppositionschools':string,'domains':[string],'spellnotes':string}}
 */
function getCasterObj(spellObj, abilityScores, healthObj, isSLA, forceCleric) {
  let caster = {};
  if (!spellObj || !abilityScores || !healthObj) {
    return null;
  }
  try {
    TAS.debug('getCasterObj spellObj,abilities,health are:', spellObj, abilityScores, healthObj);
    caster.abilityMod = 0;
    caster.CL = 0;
    caster.concentrationBonus = 0;
    if (forceCleric) {
      caster.classname = 'Cleric';
      caster.ability = 'WIS';
      caster.abilityMod = abilityScores.wis.mod;
    } else if (isSLA || !spellObj.classname) {
      caster.classname = isSLA ? 'Spell-like abilities' : 'Sorcerer';
      caster.ability = 'CHA';
      caster.abilityMod = abilityScores.cha.mod;
    } else {
      caster.classname = spellObj.classname[0].toUpperCase() + spellObj.classname.slice(1).toLowerCase();
      if (PFDB.casterDefaultAbility[spellObj.classname] && abilityScores[PFDB.casterDefaultAbility[spellObj.classname]]) {
        caster.ability = PFDB.casterDefaultAbility[spellObj.classname].toUpperCase();
        caster.abilityMod = abilityScores[PFDB.casterDefaultAbility[spellObj.classname]].mod;
      } else {
        caster.ability = 'CHA';
        caster.abilityMod = abilityScores.cha.mod;
      }
    }
    if (spellObj.classLevel) {
      caster.CL = spellObj.classLevel;
    } else {
      //assume HD
      caster.CL = healthObj.hdice1;
    }
    if (spellObj.concentration) {
      caster.concentrationBonus = spellObj.concentration - caster.abilityMod - caster.CL;
    }
    if (spellObj.oppositionschools) {
      caster.oppositionschools = spellObj.oppositionschools;
      spellObj.oppositionschools = null;
    }
    if (spellObj.spellnotes) {
      caster.spellnotes = spellObj.spellnotes;
      spellObj.spellnotes = null;
    }
    if (spellObj.domains) {
      caster.domains = spellObj.domains;
      spellObj.domains = null;
    }
  } catch (err) {
    TAS.error('getCasterObj error trying to create obj returning null', err);
    caster = null;
  } finally {
    //TAS.debug"returning ", caster);
    return caster;
  }
}
function setCasterFields(casterObj, classidx, attrs, setter) {
  let alreadyPresent = false,
    tempint = 0;
  try {
    //TAS.debug"setCasterFields");
    setter = setter || {};
    classidx = classidx || 0;
    if (classidx < 0) {
      classidx = 0;
    }
    if (attrs) {
      if (attrs['spellclass-' + classidx + '-name'] || attrs['spellclass-' + classidx + '-level']) {
        if (
          !(
            parseInt(attrs['spellclass-' + classidx + '-level'], 10) === parseInt(casterObj.CL, 10) &&
            PFUtils.findAbilityInString(attrs['Concentration-' + classidx + '-ability']) === casterObj.ability.toUpperCase()
          )
        ) {
          classidx++;
        } else {
          alreadyPresent = true;
        }
      }
    }
    if (classidx > 2) {
      TAS.error('Could not setCasterFields, 0,1,2 spellclasses already defined:');
      casterObj.pageClassIdx = -1;
    } else if (alreadyPresent) {
      setter['spellclass-' + classidx + '-name'] = setter['spellclass-' + classidx + '-name'] + ' and ' + casterObj.classname;
      casterObj.pageClassIdx = classidx;
    } else {
      setter['spellclass-' + classidx + '-name'] = casterObj.classname;
      //should add class here ? setter['class-'+what+'-name']
      setter['spellclass-' + classidx + '-level'] = casterObj.CL; //if they have hit dice, this will make it increase? not if we don't do class-x-level
      setter['spellclass-' + classidx + '-level-total'] = casterObj.CL;
      if (/wizard|cleric|druid|paladin|ranger|investigator|shaman|witch|alchemist|warpriest/i.test(casterObj.classname)) {
        setter['spellclass-' + classidx + '-casting_type'] = 2; //prepared
      } else {
        setter['spellclass-' + classidx + '-casting_type'] = 1; //spontaneous
      }
      if (casterObj.ability) {
        setter['Concentration-' + classidx + '-ability'] = casterObj.ability + '-mod';
      }
      setter['Concentration-' + classidx + '-mod'] = casterObj.abilityMod;
      if (casterObj.concentrationBonus) {
        setter['Concentration-' + classidx + '-misc'] = casterObj.concentrationBonus;
      }
      casterObj.pageClassIdx = classidx;
      if (casterObj.oppositionschools) {
        setter['spellclass-' + classidx + '-oppositionschool-0'] = casterObj.oppositionschools;
      }
      if (casterObj.spellnotes) {
        setter['spellclass-' + classidx + '-notes'] = casterObj.spellnotes;
      }
      if (casterObj.domains) {
        setter['spellclass-' + classidx + '-domains-show'] = 1;
        tempint = 0;
        _.each(casterObj.domains, function (domain) {
          setter['spellclass-' + classidx + '-domain-' + tempint] = domain;
          setter['spellclass-' + classidx + '-domaintype-' + tempint] = 'Domain';
          tempint++;
          if (tempint > 1) {
            setter['domain0' + tempint + '_show'] = 1;
          }
        });
      }
    }
  } catch (err) {
    TAS.error('setCasterFields', err);
  } finally {
    return setter;
  }
}
/** createSpellEntries
 *@param {jsobject} setter - map to pass to SWUtils.setWrapper
 *@param {jsobject} spellObj obj like: {classname:"name",CL:#,concentration:#,
 *	spells:{
 *		0:[{name:spellname,DC:#}],
 *		1:[{name:spellname},{name:spellname}]
 *	}}
 *@param {?} casterObj ?
 *@param {?} section ?
 *@returns {jsobject} setter
 */
function createSpellEntries(spellObj, casterObj, setter) {
  let section = 'spells';
  setter = setter || {};
  if (!spellObj || !casterObj) {
    return setter;
  }
  _.each(spellObj.spellsByLevel, function (spellLevel) {
    let thisSpellLevel = parseInt(spellLevel.spellLevel, 10) || 0,
      baseDC = 0,
      perdayPrefix = '';
    try {
      //TAS.debug"now look at level " + thisSpellLevel + " spells", spellLevel);
      perdayPrefix = 'spellclass-' + casterObj.pageClassIdx + '-level-' + thisSpellLevel;
      if (spellLevel.perDay) {
        setter[perdayPrefix + '-class'] = spellLevel.perDay;
        setter[perdayPrefix + '-spells-per-day_max'] = spellLevel.perDay;
        setter[perdayPrefix + '-spells-per-day'] = spellLevel.perDay;
      }
      baseDC = 10 + thisSpellLevel + (parseInt(casterObj.abilityMod, 10) || 0);
    } catch (errlvl) {
      TAS.error('createSpellEntries error setting spells per day', errlvl);
    }
    setter = _.reduce(
      spellLevel.spells,
      function (memo, spell) {
        let newRowId = generateRowID(),
          thisDC = 0,
          prefix = 'repeating_' + section + '_' + newRowId + '_';
        try {
          setter[prefix + 'name'] = spell.name[0].toUpperCase() + spell.name.slice(1);
          setter[prefix + 'classnumber'] = casterObj.pageClassIdx;
          setter[prefix + 'spell_class_r'] = casterObj.pageClassIdx;
          setter[prefix + 'spellclass'] = casterObj.classname;
          setter[prefix + 'spell_level'] = thisSpellLevel;
          setter[prefix + 'spell_level_r'] = thisSpellLevel;
          if (spell.DC) {
            thisDC = parseInt(spell.DC, 10) || 0;
            if (thisDC !== baseDC) {
              setter[prefix + 'DC_misc'] = thisDC - baseDC;
            }
            setter[prefix + 'savedc'] = thisDC;
          }
          if (casterObj.concentration) {
            setter[prefix + 'Concentration-mod'] = casterObj.concentration;
          }
          if (spell.isDomain) {
            setter[prefix + 'isDomain'] = 1;
          }
        } catch (err) {
          TAS.error('createSpellEntries error setting spell :', spell, err);
        } finally {
          return setter;
        }
      },
      setter,
    );
  });
  return setter;
}
function createSLAEntries(slaObj, casterObj, race, level, setter) {
  let section = 'ability';
  setter = setter || {};
  if (!slaObj || !casterObj) {
    return setter;
  }
  level = level || 0;

  _.each(slaObj.spellLikeAbilities, function (perDaySLAs) {
    let thisPerDay = parseInt(perDaySLAs.perDay, 10) || 0,
      freqType = perDaySLAs.type;
    //TAS.debug" at one set of SLAs, freq:" + freqType + " and perday:" + thisPerDay, perDaySLAs);
    setter = _.reduce(
      perDaySLAs.SLAs,
      function (memo, SLA) {
        let newRowId,
          prefix = 'repeating_' + section + '_' + newRowId + '_',
          casterAbility,
          dcTot = 0,
          dcMod = 0,
          sdstr = '',
          charlvl = 0,
          clmisc = 0,
          tempint = 0,
          slmisc = 0,
          casterlevel = 0;
        try {
          newRowId = generateRowID();
          prefix = 'repeating_' + section + '_' + newRowId + '_';
          memo[prefix + 'name'] = SLA.name[0].toUpperCase() + SLA.name.slice(1);
          memo[prefix + 'ability_type'] = 'Sp';
          memo[prefix + 'rule_category'] = 'spell-like-abilities';
          memo[prefix + 'showinmenu'] = '1';
          if (casterObj.ability) {
            casterAbility = casterObj.ability;
            memo[prefix + 'ability-basis'] = '@{' + casterObj.ability + '-mod}';
          } else {
            casterAbility = 'CHA';
            memo[prefix + 'ability-basis'] = '@{CHA-mod}';
          }
          memo[prefix + 'CL-basis'] = '@{npc-hd-num}';
          memo[prefix + 'CL-basis-mod'] = level;
          if (race) {
            memo[prefix + 'class-name'] = race;
          }
          //TAS.debug"CREATE SLA casterObj.CL: " + casterObj.CL + ", level:" + setter.level + " when processing "+ SLA );
          if (casterObj.CL) {
            tempint = level || 0;
            if (tempint > 0) {
              memo[prefix + 'CL-misc'] = casterObj.CL - tempint;
              memo[prefix + 'CL-misc-mod'] = casterObj.CL - tempint;
            }
            casterlevel = casterObj.CL;
          } else {
            casterlevel = level;
          }

          memo[prefix + 'casterlevel'] = casterlevel;
          //assume 1/2? or calc based on DC?
          if (SLA.spell_level) {
            if (SLA.spell_level === level) {
              memo[prefix + 'spell_level-basis'] = '@{casterlevel}';
            } else if (SLA.spell_level === Math.floor(level / 2)) {
              memo[prefix + 'spell_level-basis'] = 'floor(@{casterlevel}/2)';
            } else {
              memo[prefix + 'spell_level-basis'] = '0';
              memo[prefix + 'spell_level-misc'] = SLA.spell_level;
            }
          } else {
            memo[prefix + 'spell_level-basis'] = 'floor(@{casterlevel}/2)';
          }
          //memo[prefix+"classnumber"]=casterObj.pageClassIdx;
          //memo[prefix+"spellclass"]=casterObj.classname;
          switch (freqType) {
            case 'day':
              memo[prefix + 'frequency'] = 'perday';
              memo[prefix + 'used'] = thisPerDay;
              memo[prefix + 'used_max'] = thisPerDay;
              memo[prefix + 'max-calculation'] = thisPerDay;
              memo[prefix + 'hasfrequency'] = '1';
              memo[prefix + 'hasuses'] = '1';
              break;
            case 'will':
              memo[prefix + 'frequency'] = 'atwill';
              memo[prefix + 'hasfrequency'] = '1';
              break;
            case 'constant':
              memo[prefix + 'frequency'] = 'constant';
              memo[prefix + 'hasfrequency'] = '1';
              break;
            case 'month':
              memo[prefix + 'frequency'] = 'permonth';
              memo[prefix + 'used'] = thisPerDay;
              memo[prefix + 'used_max'] = thisPerDay;
              memo[prefix + 'max-calculation'] = thisPerDay;
              memo[prefix + 'hasfrequency'] = '1';
              memo[prefix + 'hasuses'] = '1';
              break;
            case 'everyrounds':
              memo[prefix + 'frequency'] = 'everyrounds';
              memo[prefix + 'hasfrequency'] = '1';
              memo[prefix + 'rounds_between'] = SLA.used || '';
              break;
            case 'other':
              memo[prefix + 'frequency'] = 'other';
              memo[prefix + 'used'] = thisPerDay;
              memo[prefix + 'used_max'] = thisPerDay;
              memo[prefix + 'max-calculation'] = thisPerDay;
              memo[prefix + 'hasfrequency'] = '1';
              memo[prefix + 'hasuses'] = '1';
              if (slaObj.otherPer) {
                sdstr = 'Frequency per :' + slaObj.otherPer;
              }
              break;
            default:
              memo[prefix + 'frequency'] = 'not-applicable';
              memo[prefix + 'used'] = 0;
              memo[prefix + 'used_max'] = 0;
              memo[prefix + 'max-calculation'] = '';
              memo[prefix + 'hasfrequency'] = '';
              memo[prefix + 'hasuses'] = '';
              break;
          }
          if (SLA.save) {
            memo[prefix + 'save'] = SLA.save;
          }
          if (SLA.DC) {
            try {
              if (!SLA.save) {
                memo[prefix + 'save'] = 'See Text';
              }
              if (casterObj.abilityMod) {
                tempint = 0;
                if (SLA.spell_level) {
                  tempint = 10 + casterObj.abilityMod + SLA.spell_level;
                } else {
                  tempint = 10 + casterObj.abilityMod + Math.floor(casterlevel / 2);
                }
                if (tempint !== SLA.DC) {
                  memo[prefix + 'spell_level-misc'] = SLA.DC - tempint;
                  memo[prefix + 'spell_level-misc-mod'] = SLA.DC - tempint;
                }
              }
            } catch (err3) {
              TAS.error('createSLAentries, error trying to calculate DC: ' + SLA, err3);
            }
          }
          if (SLA.description) {
            memo[prefix + 'description'] = SLA.description;
          }
          if (SLA.shortdesc) {
            if (sdstr) {
              sdstr = SLA.shortdesc + ', ' + sdstr;
            } else {
              sdstr = SLA.shortdesc;
            }
          }
          if (sdstr) {
            memo[prefix + 'short-description'] = sdstr;
          }
        } catch (err) {
          TAS.error('createSLAEntries error setting SLA :', SLA, err);
        } finally {
          return memo;
        }
      },
      setter,
    );
  });
  return setter;
}
/**createAttacks - creates rows in repeating_weapon
 * @param {[{enh:number,name:string,type:string,countFullBAB:number,plus:string,note:string,iter:[number],dmgdice:number,dmgdie:number,crit:number,critmult:number,dmgbonus:number}]} attacklist
 * @param {Map<string,number>} attackGrid populated as out param by parseAndCreateAttacks
 * @param {Map<string,number>} abilityScores output of parseAbilityScores
 * @param {[string]} importantFeats list of attack-affecting feats this char has
 * @param {number} defaultReach the default reach for melee attacks
 * @param {[[string,number]]} exceptionReaches list of attack names and reach numbers
 * @param {Map<string,number>} sizeMap output from PFSize.getSizeFromText
 * @param {Map<string,any>} setter the map to pass to SWUtils.setWrapper
 * @returns {Map<string,any>} setter
 */
function createAttacks(attacklist, attackGrid, abilityScores, importantFeats, defaultReach, exceptionReaches, sizeMap, setter) {
  setter = setter || {};
  if (!attacklist || _.size(attacklist) === 0) {
    return setter;
  }

  //TAS.debug("##################","create attacks:", attacklist, attackGrid, abilityScores, importantFeats, defaultReach, exceptionReaches);
  setter = _.reduce(
    attacklist,
    function (memo, attack) {
      let newRowId = '',
        prefix = '',
        dmgAbilityStr = false,
        specCMB = false,
        i = 0,
        iterativeNum = 0,
        basebonus = 0,
        tempInt = 0,
        dmgMult = 1,
        dmgMod = 0,
        tohitbonus = 0,
        name = '',
        tempstr = '',
        basename = '',
        iterZero = NaN,
        reach,
        newRowId2,
        prefix2;
      //TAS.debug"creating attack row id:" + newRowId);
      try {
        newRowId = generateRowID();
        prefix = 'repeating_weapon_' + newRowId + '_';
        //TAS.debug"looking at attack:", attack);
        tohitbonus = Math.max(attack.enh, attack.mwk);
        basename = attack.basename;
        //basename.replace(/^group.*?:\s*/,'');
        name += attack.name;
        if (attack.plus) {
          name += ' Plus ' + attack.plus;
        }
        memo[prefix + 'name'] = name;
        memo[prefix + 'default_size'] = sizeMap.size;
        if (attack.atktype === 'ranged') {
          basebonus = attackGrid.ranged;
          memo[prefix + 'attack-type'] = 'attk-ranged';
          memo[prefix + 'attack-type-mod'] = attackGrid.ranged;
          memo[prefix + 'isranged'] = 1;
        } else if (PFDB.cmbPlusStrsrch.test(basename)) {
          basebonus = attackGrid.cmb;
          memo[prefix + 'attack-type'] = 'CMB';
          memo[prefix + 'attack-type-mod'] = attackGrid.cmb;
          dmgAbilityStr = true;
          dmgMult = 1.5;
          specCMB = true;
        } else if (attack.atktype === 'cmb') {
          basebonus = attackGrid.cmb;
          memo[prefix + 'attack-type'] = 'CMB';
          memo[prefix + 'attack-type-mod'] = attackGrid.cmb;
        } else if (attack.atktype === 'special') {
          basebonus = 0;
          memo[prefix + 'attack-type-mod'] = 0;
          memo[prefix + 'total-attack'] = 0;
          if (attack.basename === 'trample') {
            dmgAbilityStr = true;
            dmgMult = 1.5;
            TAS.debug('CREATEATTACKS trample the attack is : ', attack);
          }
        } else {
          dmgAbilityStr = true;
          //melee
          if (importantFeats.weaponfinesse) {
            //assume all attacks use weapon finesse
            basebonus = attackGrid.melee2;
            memo[prefix + 'attack-type'] = 'attk-melee2';
            memo[prefix + 'attack-type-mod'] = attackGrid.melee2;
          } else {
            basebonus = attackGrid.melee;
            memo[prefix + 'attack-type'] = 'attk-melee';
            memo[prefix + 'attack-type-mod'] = attackGrid.melee;
          }
          if (attack.type === 'natural') {
            if (attack.naturaltype === 'secondary') {
              dmgMult = 0.5;
            } else if (attack.dmgMult && attack.dmgMult === 1.5) {
              memo[prefix + 'damage_ability_mult'] = '1.5';
              dmgMult = 1.5;
            }
          }
        }
        //if(specCMB){
        //	TAS.debug("############ SPEC CMB ###############","dmgAbilityStr:"+dmgAbilityStr+" attackbonus:"+basebonus +", mult:"+ dmgMult);
        //}
        if (dmgAbilityStr || specCMB) {
          if (specCMB && attack.dmgbonus === 0) {
            memo[prefix + 'damage-ability'] = '0';
            dmgMod = 0;
          } else {
            memo[prefix + 'damage-ability'] = 'STR-mod';
            if (dmgMult !== 1) {
              dmgMod = Math.floor(dmgMult * abilityScores.str.mod);
              memo[prefix + 'damage_ability_mult'] = dmgMult;
            } else {
              dmgMod = abilityScores.str.mod;
            }
          }
          memo[prefix + 'damage-ability-mod'] = dmgMod;
        }
        if (attack.enh) {
          memo[prefix + 'enhance'] = attack.enh;
        }
        if (attack.mwk) {
          memo[prefix + 'masterwork'] = '1';
        }
        if (!specCMB && attack.iter && attack.iter.length > 0) {
          iterZero = parseInt(attack.iter[0], 10);
        } else if (specCMB) {
          iterZero = basebonus;
        }
        if (!isNaN(iterZero)) {
          if (specCMB) {
            memo[prefix + 'attack'] = 0;
            memo[prefix + 'attack-mod'] = 0;
            memo[prefix + 'total-attack'] = basebonus;
          } else {
            memo[prefix + 'attack'] = iterZero - tohitbonus - basebonus;
            memo[prefix + 'attack-mod'] = iterZero - tohitbonus - basebonus;
            memo[prefix + 'total-attack'] = iterZero;
          }
        } else if (attack.atktype === 'cmb') {
          if (/swallowwhole|pin/i.test(attack.basename)) {
            //if confirming crit add +5
            memo[prefix + 'attack'] = 5;
            memo[prefix + 'attack-mod'] = 5;
            memo[prefix + 'total-attack'] = attackGrid.cmb + 5;
          } else {
            memo[prefix + 'total-attack'] = attackGrid.cmb;
          }
        } else {
          memo[prefix + 'total-attack'] = 0;
        }
        if (attack.crit !== 20) {
          memo[prefix + 'crit-target'] = attack.crit;
        }
        if (attack.critmult !== 2 && attack.critmult) {
          memo[prefix + 'crit-multiplier'] = attack.critmult;
        }
        if (importantFeats.criticalfocus) {
          memo[prefix + 'crit_conf_mod'] = 4;
        }
        //somewhere this is getting lost:  just bandaid it:
        if (!memo[prefix + 'total-attack']) {
          memo[prefix + 'total-attack'] = 0;
        }
        TAS.debug('Create attack e6 ' + attack.name + ', enhance:' + attack.enh + ' dmg from attack:' + attack.dmgbonus + ', from str:' + dmgMod);
        memo[prefix + 'damage-dice-num'] = attack.dmgdice;
        memo[prefix + 'default_damage-dice-num'] = attack.dmgdice;
        memo[prefix + 'damage-die'] = attack.dmgdie;
        memo[prefix + 'default_damage-die'] = attack.dmgdie;
        memo[prefix + 'damage'] = attack.dmgbonus - attack.enh - dmgMod;
        memo[prefix + 'damage-mod'] = attack.dmgbonus - attack.enh - dmgMod;
        memo[prefix + 'total-damage'] = attack.dmgbonus;
        if (attack.note) {
          memo[prefix + 'notes'] = '(' + attack.type + ') ' + attack.note;
        } else {
          memo[prefix + 'notes'] = '(' + attack.type + ')';
        }
        if (attack.iter.length > 1) {
          for (i = 1; i < attack.iter.length; i++) {
            iterativeNum = i + 1;
            //TAS.debug"at iteration " + iterativeNum + ", difference is :" + (attack.iter[i] - attack.iter[0]));
            memo[prefix + 'toggle_iterative_attack' + iterativeNum] = '@{var_iterative_attack' + iterativeNum + '_macro}';
            memo[prefix + 'iterative_attack' + iterativeNum + '_value'] = attack.iter[i] - attack.iter[0];
          }
        } else if (attack.countFullBAB > 1) {
          for (i = 1; i < attack.countFullBAB; i++) {
            iterativeNum = i + 1;
            memo[prefix + 'toggle_iterative_attack' + iterativeNum] = '@{var_iterative_attack' + iterativeNum + '_macro}';
            memo[prefix + 'iterative_attack' + iterativeNum + '_value'] = 0;
          }
        }
        // plus extra damage  **********************
        if (attack.plusamount) {
          memo[prefix + 'precision_dmg_macro'] = '[[' + attack.plusamount + ']]';
          if (attack.plustype) {
            memo[prefix + 'precision_dmg_type'] = attack.plustype;
          }
        } else if (attack.plus) {
          memo[prefix + 'precision_dmg_type'] = 'Plus';
          memo[prefix + 'precision_dmg_macro'] = attack.plus;
        }
        if (attack.dmgtype) {
          memo[prefix + 'notes'] = memo[prefix + 'notes'] + ', damage type:' + attack.dmgtype;
        }
        //reach **************************
        if (attack.range) {
          tempInt = parseInt(attack.range, 10);
          if (isNaN(tempInt)) {
            memo[prefix + 'notes'] = memo[prefix + 'notes'] + ', range:' + attack.range;
          }
        } else if (/tongue/i.test(attack.name)) {
          reach = defaultReach * 3;
          memo[prefix + 'range'] = reach;
          memo[prefix + 'vs'] = 'touch';
        } else if (attack.atktype === 'melee') {
          if (exceptionReaches && exceptionReaches.length > 0) {
            //TAS.log("looking for match",exceptionReaches);
            reach = _.filter(exceptionReaches, function (reacharray) {
              //TAS.log("matching "+basename+" with "+reacharray[0]);
              if (basename.indexOf(reacharray[0]) >= 0) {
                //TAS.log("it matches!"+reacharray[0]);
                return true;
              }
              return false;
            });
            //TAS.log(reach);
            if (reach && reach[0] && reach[0][1]) {
              memo[prefix + 'range'] = reach[0][1];
            } else if (defaultReach) {
              memo[prefix + 'range'] = defaultReach;
            }
          } else if (defaultReach) {
            memo[prefix + 'range'] = defaultReach;
          }
        }
        if (attack.vs && !/tongue/i.test(attack.name)) {
          memo[prefix + 'vs'] = attack.vs;
        }
        if (attack.group) {
          memo[prefix + 'group'] = attack.group;
        }
        if (attack.DC) {
          TAS.debug('PFNPCParser has attack dc', attack);
          memo[prefix + 'notes'] = memo[prefix + 'notes'] + ' ' + (attack.save || '') + ' ' + attack.DC + attack.DCEquation ? ' ' + attack.DCEquation : '';
        }
      } catch (err) {
        TAS.error('createattacks error on:', attack, err);
      } finally {
        return memo;
      }
    },
    setter,
  );
  //TAS.debug("end of create attacks returning:", setter);
  return setter;
}
function createACEntries(acMap, abilityScores, importantFeats, hpMap, bab, level, setter) {
  let acAbility = 'DEX',
    acDexDef = abilityScores.dex.mod,
    calcCMD = 0,
    altbab = 0;
  try {
    setter = setter || {};
    //TAS.debug("acMap", acMap);
    if (acMap.altability) {
      //this should no longer happen.
      //TAS.debug("different ability score for AC!");
      acAbility = acMap.altability.toUpperCase();
      if (acAbility !== 'DEX') {
        setter['AC-ability'] = acAbility + '-mod';
        setter['CMD-ability2'] = acAbility + '-mod';
        switch (acMap.altability.toLowerCase()) {
          case 'wis':
            acDexDef = abilityScores.wis.mod;
            break;
          case 'int':
            acDexDef = abilityScores['int'].mod;
            break;
          case 'cha':
            acDexDef = abilityScores.cha.mod;
            break;
          case 'con':
            acDexDef = abilityScores.con.mod;
            break;
          default:
            acDexDef = abilityScores.dex.mod;
            break;
        }
        setter['AC-ability-mod'] = acDexDef;
      }
    }
    //has uncanny dodge
    if (acMap.uncanny) {
      setter['FF-ability'] = acAbility + '-mod';
      setter['FF-ability-mod'] = acDexDef;
      setter['CMD-ability'] = acAbility + '-mod';
      setter['CMD-ability'] = acDexDef;
      setter['uncanny_dodge'] = 1;
      setter['uncanny_cmd_dodge'] = 1;
    }
    altbab = bab;
    if (importantFeats.defensivecombattraining) {
      setter['hd_not_bab'] = 1;
      altbab = Math.max((hpMap.hdice1 || 0) + (hpMap.hdice2 || 0), level || 0);
    }
    try {
      calcCMD = 10 + altbab + abilityScores.str.mod + acDexDef + -1 * acMap.size;
      //TAS.debug("bab:"+altbab+"+ str:"+ abilityScores.str.mod + "+ dex" + acDexDef + " - size: " +acMap.size + ", calcCMD:"+calcCMD+", cmdparsed:"+acMap.cmd);
      if (isNaN(acMap.cmd) || calcCMD === acMap.cmd) {
        setter['CMD'] = calcCMD;
      } else {
        setter['CMD'] = acMap.cmd;
        setter['CMD-misc'] = acMap.cmd - calcCMD;
        setter['CMD-misc-mod'] = acMap.cmd - calcCMD;
      }
    } catch (err2) {
      TAS.error('createACEntries error trying to calculate CMD', err2);
    }

    setter['AC'] = acMap.ac;
    setter['Touch'] = acMap.touch;
    setter['Flat-Footed'] = acMap.ff;
    setter['AC-deflect'] = acMap.deflect;
    setter['AC-dodge'] = acMap.dodge;
    setter['AC-misc'] = acMap.misc;
    setter['AC-misc-mod'] = acMap.misc;
    setter['AC-natural'] = acMap.natural;
    if (acMap.armor) {
      setter['armor3-equipped'] = '1';
      setter['armor3-acbonus'] = acMap.armor;
      setter['armor3'] = 'Armor bonus';
      setter['AC-armor'] = acMap.armor;
    }
    if (acMap.shield) {
      setter['shield3-equipped'] = '1';
      setter['shield3-acbonus'] = acMap.shield;
      setter['shield3'] = 'Shield bonus';
      setter['AC-shield'] = acMap.shield;
    }
    if (acMap.notes) {
      setter['defense-notes'] = acMap.notes;
    }
    if (acMap.cmdnotes) {
      setter['cmd-notes'] = acMap.cmdnotes;
    }
  } catch (err) {
  } finally {
    return setter;
  }
}
function createSkillEntries(skills, racial, abilityScores, importantFeats, classSkills, sizeMap, isUndead, setter) {
  let npcSkillsWithFillInNames = ['Craft', 'Perform', 'Profession'],
    craftLevel = -1,
    performLevel = -1,
    professionLevel = -1,
    runningTot = 0,
    counter = 0,
    tempAbilities = PFSkills.coreSkillAbilityDefaults,
    tempstr = '';
  try {
    setter = setter || {};
    TAS.info('PFNPC createSkillEntries sizemap is: ', skills, racial, abilityScores, importantFeats, classSkills, sizeMap, isUndead);
    if (racial) {
      if (racial.abilitymods && _.size(racial.abilitymods) > 0) {
        //set default ability for skill and substitute adjustments, make sure to use copy not original
        tempAbilities = _.extend({}, PFSkills.coreSkillAbilityDefaults, racial.abilitymods);
        /*setter = _.reduce(racial.abilitymods, function (memo, ability, skill) {
					//CBTEST 20170601
					///memo[skill + "-ability"] =  + ability.toUpperCase() ; //can we do without setting this?
					memo[skill + "-ability"] = ability+'-mod';
					memo[skill + "-ability-mod"] = abilityScores[ability].mod;
					return memo;
				}, setter);*/
      }
      if (racial.skillmods && _.size(racial.skillmods) > 0) {
        _.each(racial.skillmods, function (mod, skill) {
          if (skill === 'Knowledge') {
            _.each(PFSkills.knowledgeSkills, function (kSkill) {
              setter[kSkill + '-racial'] = mod;
            });
          } else if (_.contains(PFSkills.coreSkillsWithFillInNames, skill)) {
            _.each(PFSkills.allFillInSkillInstances[skill], function (subskill) {
              setter[subskill + '-racial'] = mod;
            });
          } else {
            setter[skill + '-racial'] = mod;
          }
        });
      }
      if (racial.skillnotes && racial.skillnotes.length > 0) {
        tempstr = '';
        _.each(racial.skillnotes, function (note) {
          tempstr += note + ', ';
        });
        tempstr.replace(/,\s$/, '');
        if (tempstr) {
          setter['Skill-notes'] = tempstr;
        }
      }
    }
    if (importantFeats && _.size(importantFeats) > 0) {
      if (importantFeats.intimidatingprowess) {
        setter['Intimidate-feat'] = abilityScores.str.mod;
        //setter["Intimidate-misc"] = '@{STR-mod}';
        //setter["Intimidate-misc-mod"] = abilityScores.str.mod;
      }
      if (importantFeats.skillfocuses) {
        _.each(importantFeats.skillfocuses, function (skill) {
          if (skill === 'Knowledge') {
            _.each(PFSkills.knowledgeSkills, function (kSkill) {
              setter[kSkill + '-feat'] = 3;
            });
          } else if (_.contains(PFSkills.coreSkillsWithFillInNames, skill)) {
            _.each(PFSkills.allFillInSkillInstances[skill], function (subskill) {
              setter[subskill + '-feat'] = 3;
            });
          } else {
            setter[skill + '-feat'] = 3;
          }
        });
      }
    }
    if (classSkills && _.size(classSkills) > 0) {
      _.each(classSkills, function (skill) {
        try {
          if (skill === 'Knowledge') {
            _.each(PFSkills.knowledgeSkills, function (kSkill) {
              setter[kSkill + '-cs'] = 3;
            });
          } else if (_.contains(PFSkills.coreSkillsWithFillInNames, skill)) {
            _.each(PFSkills.allFillInSkillInstances[skill], function (subskill) {
              setter[subskill + '-cs'] = 3;
            });
          } else {
            setter[skill + '-cs'] = 3;
          }
        } catch (err) {
          TAS.error('createSkillEntries', err);
        }
      });
    }
    _.each(skills, function (tot, skill) {
      let ability = '',
        tempint = 0,
        abilitymod = 0,
        ranks = 0;
      try {
        tot = parseInt(tot, 10) || 0;
        if (tempAbilities[skill]) {
          ability = tempAbilities[skill];
          abilitymod = abilityScores[ability] ? abilityScores[ability].mod : 0;
          setter[skill + '-ability'] = ability.toUpperCase() + '-mod';
          setter[skill + '-ability-mod'] = abilitymod;
          setter[skill] = tot;
          ranks = tot;
          if (skill === 'Stealth') {
            TAS.debug('skilltot 1:' + ranks);
          }
          ranks -= abilitymod;
          if (skill === 'Stealth') {
            TAS.debug('skilltot 2 minus  ' + abilitymod + ' =:' + ranks);
          }
          if (skill === 'Stealth') {
            if (sizeMap.skillSize !== 0) {
              ranks -= 2 * sizeMap.skillSize;
            }
            TAS.debug('skilltot 3 minus  ' + 2 * sizeMap.skillSize + ' =:' + ranks);
          } else if (skill === 'Fly') {
            if (sizeMap.skillSize !== 0) {
              ranks -= sizeMap.skillSize;
            }
          }
          if (racial && racial.skillmods && racial.skillmods[skill]) {
            ranks -= parseInt(racial.skillmods[skill], 10) || 0;
            if (skill === 'Stealth') {
              TAS.debug('skilltot 4 minus  ' + (parseInt(racial.skillmods[skill], 10) || 0) + ' =:' + ranks);
            }
          }
          // 	if(importantFeats && importantFeats.skillfocuses && _.contains(importantFeats.skillfocuses,skill)){
          if (parseInt(setter[skill + '-feat'], 10) > 0) {
            ranks -= 3;
            //ranks -= (parseInt(memo[skill + "-feat"], 10)||0);
            if (skill === 'Stealth') {
              TAS.debug('skilltot 5 minus 3 =:' + ranks);
            }
          }
          if (ranks > 0) {
            if (parseInt(setter[skill + '-cs'], 10) > 0) {
              ranks -= 3;
              if (skill === 'Stealth') {
                TAS.debug('skilltot 6 minus 3 =:' + ranks);
              }
            }
          }
          if (skill === 'Stealth') {
            TAS.debug('skilltot 7 final ranks are :' + ranks);
          }
          setter[skill + '-ranks'] = ranks;
          if (ranks < 0) {
            setter[skill + '-note'] = 'Ranks less than 0, possible parse error or error in statblock';
          }
          runningTot++;
        } else {
          TAS.warn('createSkillEntries, skill ' + skill + ' not found');
          setter[skill + '-note'] = (setter[skill + '-note'] || '') + ', ' + skill + ':' + tot;
        }
      } catch (err) {
        TAS.error('createSkillEntries inner reduce', err);
      }
    });
  } catch (errouter) {
    TAS.error('at createskillEntries OUTER error', errouter);
  } finally {
    TAS.info('leaving createskills:', setter);
    return setter;
  }
}
/**createInitEntries adds init,init-misc,init-misc-mod,init-ability-mod values to setter
 * @param {Map<string,any>} setter the map to pass to SWUtils.setWrapper
 * @param {number} baseInit the total initiative bonus
 * @param {Map<string,{Map<string,number>>}} abilityScores output of parseAbilityScores
 * @param {[string]} importantFeats list of attack-affecting feats this char has, IGNORED
 * @returns {Map<string,any>} setter
 */
function createInitEntries(baseInit, abilityScores, importantFeats, setter) {
  let initMisc = 0;
  try {
    setter = setter || {};
    initMisc = baseInit - abilityScores.dex.mod;
    setter['init'] = baseInit;
    setter['init-misc'] = initMisc;
    setter['init-misc-mod'] = initMisc;
    setter['init-ability-mod'] = abilityScores.dex.mod;
  } catch (err) {
    TAS.error('createInitEntries', err);
  } finally {
    return setter;
  }
}
function createHPAbilityModEntry(abilityScores, isUndead, setter) {
  try {
    setter = setter || {};
    if (isUndead || abilityScores.con.base === '-') {
      setter['HP-ability'] = 'CHA-mod';
      setter['HP-ability-mod'] = abilityScores.cha.mod;
    } else {
      setter['HP-ability-mod'] = abilityScores.con.mod;
    }
  } finally {
    return setter;
  }
}
function createHealthEntries(abilityScores, isUndead, hpMap, setter) {
  let currlevel = 0;
  try {
    setter = setter || {};
    setter['npc-hd-num'] = hpMap.hdice1;
    setter['level'] = hpMap.hdice1;
    setter['npc-hd'] = hpMap.hdie1;
    setter['HP'] = hpMap.hp;
    setter['HP_max'] = hpMap.hp;
    setter['non-lethal-damage_max'] = hpMap.hp;
    setter['auto_calc_hp'] = '1';
    setter['both_whisper_show'] = '1';
    //NPC: add to race row of class/race grid
    if (hpMap.basehp) {
      setter['NPC-HP'] = hpMap.basehp;
    }
    //bonuses
    if (hpMap.misc) {
      setter['HP-formula-macro-text'] = hpMap.misc;
      setter['HP-formula-mod'] = hpMap.misc;
    }
    if (hpMap.heal) {
      setter['npc-heal-conditions'] = hpMap.heal;
    }
  } catch (err) {
    TAS.error('createHealthEntries', err);
  } finally {
    return setter;
  }
}
function createSpeedEntries(speedMap, importantFeats, setter) {
  let tempstr = '';
  try {
    setter = setter || {};
    _.each(speedMap, function (speed, stype) {
      switch (stype) {
        case 'land':
          setter['speed-base'] = speed;
          setter['speed-modified'] = speed;
          break;
        case 'fly':
          setter['speed-fly'] = speed;
          break;
        case 'climb':
          setter['speed-climb'] = speed;
          break;
        case 'swim':
          setter['speed-swim'] = speed;
          break;
        case 'flyability':
          setter['speed-fly-maneuverability'] = speed;
          break;
        default:
          setter['speed-misc'] = speed;
          if (tempstr.length > 0) {
            tempstr += ', ';
          }
          tempstr += stype + ' ' + speed;
          break;
      }
    });
    if (tempstr) {
      setter['speed-notes'] = tempstr;
    }
    if (importantFeats.run) {
      setter['run-mult'] = 5;
    }
  } catch (err) {
    TAS.error('parseAndSetSpeed error, speedMap', speedMap, err);
  } finally {
    return setter;
  }
}
function createSaveEntries(abilityScores, isUndead, baseSaves, v, importantFeats, setter) {
  let fortMisc,
    refMisc,
    willMisc,
    tempNote = '',
    tempstr = '';
  try {
    setter = setter || {};
    fortMisc = baseSaves.baseFort - abilityScores.con.mod;
    refMisc = baseSaves.baseRef - abilityScores.dex.mod;
    willMisc = baseSaves.baseWill - abilityScores.wis.mod;
    if (isUndead || abilityScores.con.base === '-') {
      fortMisc = baseSaves.baseFort - abilityScores.cha.mod;
      setter['Fort-ability'] = 'CHA-mod';
      setter['Fort-ability-mod'] = abilityScores.cha.mod;
    } else {
      setter['Fort-ability-mod'] = abilityScores.con.mod;
    }
    if (importantFeats.greatfortitude) {
      setter['Fort-misc'] = 2;
      setter['Fort-misc-mod'] = 2;
      fortMisc -= 2;
    }
    setter['total-Fort'] = fortMisc;
    setter['npc-Fort'] = fortMisc;
    setter['Fort'] = baseSaves.baseFort;
    tempNote = '';
    tempstr = PFUtils.getNoteAfterNumber(v['fort_compendium']);
    if (tempstr) {
      tempNote += 'Fortitude ' + tempstr;
    }
    if (importantFeats.lightningreflexes) {
      setter['Ref-misc'] = 2;
      setter['Ref-misc-mod'] = 2;
      refMisc -= 2;
    }
    setter['total-Ref'] = refMisc;
    setter['npc-Ref'] = refMisc;
    setter['Ref'] = baseSaves.baseRef;
    if (abilityScores.dex.mod !== 0) {
      setter['Ref-ability-mod'] = abilityScores.dex.mod;
    }
    tempstr = PFUtils.getNoteAfterNumber(v['ref_compendium']);
    if (tempstr) {
      tempNote += 'Reflex ' + tempstr;
    }
    if (importantFeats.ironwill) {
      setter['Will-misc'] = 2;
      setter['Will-misc-mod'] = 2;
      willMisc -= 2;
    }
    setter['total-Will'] = willMisc;
    setter['npc-Will'] = willMisc;
    setter['Will'] = baseSaves.baseWill;
    if (abilityScores.wis.mod !== 0) {
      setter['Will-ability-mod'] = abilityScores.wis.mod;
    }
    tempstr = PFUtils.getNoteAfterNumber(v['will_compendium']);
    if (tempstr) {
      tempNote += tempstr;
    }
    if (tempNote) {
      setter['saves_notes'] = tempNote;
      setter['toggle_save_notes'] = '1';
    }
  } catch (err) {
    TAS.error('createSaveEntries', err);
  } finally {
    return setter;
  }
}
function createAbilityScoreEntries(abilityScores, setter) {
  try {
    setter = setter || {};
    setter['STR-base'] = abilityScores.str.base;
    setter['DEX-base'] = abilityScores.dex.base;
    setter['CON-base'] = abilityScores.con.base;
    setter['WIS-base'] = abilityScores.wis.base;
    setter['INT-base'] = abilityScores['int'].base;
    setter['CHA-base'] = abilityScores.cha.base;
    setter['STR'] = abilityScores.str.base;
    setter['DEX'] = abilityScores.dex.base;
    setter['CON'] = abilityScores.con.base;
    setter['WIS'] = abilityScores.wis.base;
    setter['INT'] = abilityScores['int'].base;
    setter['CHA'] = abilityScores.cha.base;
    setter['STR-mod'] = abilityScores.str.mod;
    setter['DEX-mod'] = abilityScores.dex.mod;
    setter['CON-mod'] = abilityScores.con.mod;
    setter['WIS-mod'] = abilityScores.wis.mod;
    setter['INT-mod'] = abilityScores['int'].mod;
    setter['CHA-mod'] = abilityScores.cha.mod;
  } catch (err) {
    TAS.error('createAbilityScoreEntries', err);
  } finally {
    return setter;
  }
}
function parseAndCreateAttackGrid(abilityScores, sizeMap, importantFeats, bab, level, cmb_compendium, setter) {
  let matches,
    tempstr = '',
    tempCMB,
    tempBab = 0,
    attackGrid = {},
    miscCMB = 0,
    calcCMB = 0;
  try {
    setter = setter || {};
    attackGrid.melee = abilityScores.str.mod + bab + sizeMap.size;
    setter['bab'] = bab;
    setter['npc-bab'] = bab;
    setter['melee-ability-mod'] = abilityScores.str.mod;
    setter['attk-melee'] = attackGrid.melee;
    setter['melee-ability'] = 'STR-mod';
    setter['melee-ability-mod'] = abilityScores.str.mod;
    setter['melee_bab'] = 'bab';
    setter['melee_bab-mod'] = bab;

    attackGrid.melee2 = abilityScores.dex.mod + bab + sizeMap.size;
    setter['melee2-ability'] = 'DEX-mod';
    setter['melee2-ability-mod'] = abilityScores.dex.mod;
    setter['attk-melee2'] = attackGrid.melee2;
    setter['attk_melee2_note'] = 'Weapon Finesse';
    setter['melee2_bab'] = 'bab';
    setter['melee2_bab-mod'] = bab;

    attackGrid.ranged = abilityScores.dex.mod + bab + sizeMap.size;
    attackGrid.ranged2 = attackGrid.ranged;
    setter['ranged-ability'] = 'DEX-mod';
    setter['ranged-ability-mod'] = abilityScores.dex.mod;
    setter['attk-ranged'] = attackGrid.ranged;
    setter['ranged_bab'] = 'bab';
    setter['ranged_bab-mod'] = bab;
    setter['ranged2-ability'] = 'DEX-mod';
    setter['ranged2-ability-mod'] = abilityScores.dex.mod;
    setter['attk-ranged2'] = attackGrid.ranged;
    setter['ranged2_bab'] = 'bab';
    setter['ranged2_bab-mod'] = bab;

    if (importantFeats.defensivecombattraining) {
      setter['cmb_bab'] = 'level';
      setter['cmb_bab-mod'] = level;
      setter['cmb2_bab'] = 'level';
      setter['cmb2_bab-mod'] = level;
      tempBab = level;
    } else {
      setter['cmb_bab'] = 'bab';
      setter['cmb_bab-mod'] = bab;
      setter['cmb2_bab'] = 'bab';
      setter['cmb2_bab-mod'] = bab;
      tempBab = bab;
    }

    if (importantFeats.agilemaneuvers) {
      setter['CMB-ability'] = 'DEX-mod';
      setter['CMB-ability-mod'] = abilityScores.dex.mod;
      setter['CMB2-ability'] = 'DEX-mod';
      setter['CMB2-ability-mod'] = abilityScores.dex.mod;
      calcCMB = abilityScores.dex.mod + tempBab - sizeMap.size;
      setter['cmb_desc'] = 'Agile Maneuvers';
    } else {
      setter['CMB-ability'] = 'STR-mod';
      setter['CMB-ability-mod'] = abilityScores.str.mod;
      setter['CMB2-ability'] = 'STR-mod';
      setter['CMB2-ability-mod'] = abilityScores.str.mod;
      calcCMB = abilityScores.str.mod + tempBab - sizeMap.size;
    }
    tempCMB = calcCMB;
    if (cmb_compendium) {
      matches = cmb_compendium.match(/\d+/);
      if (matches) {
        tempCMB = parseInt(matches[0], 10);
        tempstr = cmb_compendium.slice(matches.index + matches[0].length);
        if (tempstr) {
          attackGrid.cmbnotes = tempstr;
          setter['CMB-notes'] = tempstr;
        }
      }
    }
    setter['CMB'] = tempCMB;
    attackGrid.cmb = tempCMB;
    setter['CMB2'] = tempCMB;
    attackGrid.cmb2 = tempCMB;
    miscCMB = tempCMB - calcCMB;
    if (miscCMB) {
      setter['attk-CMB-misc'] = miscCMB;
      setter['attk-CMB-misc-mod'] = miscCMB;
      setter['attk-CMB2-misc'] = miscCMB;
      setter['attk-CMB2-misc-mod'] = miscCMB;
    }

    if (importantFeats.criticalfocus) {
      setter['cmb_crit_conf'] = 4;
      setter['ranged_crit_conf'] = 4;
      setter['melee_crit_conf'] = 4;
      setter['cmb2_crit_conf'] = 4;
      setter['ranged2_crit_conf'] = 4;
      setter['melee2_crit_conf'] = 4;
    }
  } catch (errC) {
    TAS.error('parseAndCreateAttackGrid error creating CMB attack types', errC);
  } finally {
    return attackGrid;
  }
}
function parseAndCreateAttacks(abilityScores, sizeMap, importantFeats, bab, attackGrid, reachObj, meleeAtkStr, rangedAtkStr, setter) {
  let attacklist = [],
    matches,
    tempstr = '';
  try {
    setter = setter || {};
    // Attacks *****************************
    if (meleeAtkStr) {
      try {
        attacklist = parseAttacks(meleeAtkStr, 'melee');
        assignPrimarySecondary(attacklist);
        createAttacks(attacklist, attackGrid, abilityScores, importantFeats, reachObj.reach, reachObj.reachExceptions, sizeMap, setter);
      } catch (errM) {
        TAS.error('parseAndCreateAttacks error creating melee attacks', errM);
      }
    }
    if (rangedAtkStr) {
      try {
        attacklist = parseAttacks(rangedAtkStr, 'ranged');
        createAttacks(attacklist, attackGrid, abilityScores, importantFeats, null, null, sizeMap, setter);
      } catch (errR) {
        TAS.error('parseAndCreateAttacks error creating ranged attacks', errR);
      }
    }
  } catch (err) {
    TAS.error('parseAndCreateAttacks', err);
  } finally {
    return setter;
  }
}
function createFeatEntries(featlist, race, level, setter) {
  return _.reduce(
    featlist,
    function (memo, feat) {
      let newRowId = generateRowID(),
        prefix = 'repeating_ability_' + newRowId + '_';
      memo[prefix + 'name'] = feat;
      memo[prefix + 'rule_category'] = 'feats';
      memo[prefix + 'showinmenu'] = '1';
      memo[prefix + 'CL-basis'] = '@{npc-hd-num}';
      memo[prefix + 'CL-basis-mod'] = level || 0;
      if (race) {
        memo[prefix + 'class-name'] = race;
      }
      memo[prefix + 'row_id'] = newRowId;
      memo[prefix + 'frequency'] = 'not-applicable'; //'not-applicable';
      memo[prefix + 'ability_type'] = ''; //'not-applicable';
      return memo;
    },
    setter,
  );
}
function parseFeats(featstring2) {
  if (featstring2.slice(0, 5).toLowerCase() === 'feats') {
    featstring2 = featstring2.slice(5);
  }
  return SWUtils.splitByCommaIgnoreParens(featstring2);
}
function createFeatureEntries(abilitylist, abilityScoreMap, race, level, setter) {
  let attrs = {},
    creatureRace = '',
    tempint = 0,
    dc = 0,
    abilityMod = 0,
    charlevel = 0,
    calcDC = 0;
  try {
    //TAS.debug("at createFeatureEntries:", abilitylist);
    charlevel = Math.floor(level / 2);
    creatureRace = race;
    attrs = _.chain(abilitylist)
      .map(function (ability) {
        let match = null,
          tempstr;
        //copy only settings we want to keep and return them in a new obj.
        //TAS.debug("first iter: ", ability);
        try {
          ability.description = ability.description || '';
          if (ability.note) {
            if (ability.description) {
              ability.description += ', ';
            }
            ability.description += ability.note.replace(/,\s$/, '');
          }
          if (ability.other) {
            if (ability.description) {
              ability.description += ', ';
            }
            ability.description += ability.other.replace(/,\s$/, '');
            ability.other = null;
          }
          if (!ability.ability_type) {
            if (ability.name) {
              tempstr = PFUtils.getSpecialAbilityTypeFromString(ability.name);
              if (tempstr) {
                ability.ability_type = tempstr;
                ability.name = ability.name.replace(/\b(Su|Ex|Sp)\b/i, '').replace('()', '');
              }
            }
          }
        } catch (err3) {
          TAS.error('createFeatureEntries err3', err3);
        } finally {
          //TAS.debug("this ability is:", ability);
          return ability;
        }
      })
      .filter(function (ability) {
        if (ability.name) {
          return true;
        }
        return false;
      })
      .reduce(function (memo, ability) {
        let newRowId, prefix;
        try {
          newRowId = generateRowID();
          prefix = 'repeating_ability_' + newRowId + '_';
          memo[prefix + 'name'] = ability.name;
          memo[prefix + 'row_id'] = newRowId;
          memo[prefix + 'showinmenu'] = '1';
          if (ability.shortdesc) {
            memo[prefix + 'short-description'] = ability.shortdesc;
          }
          if (ability.description) {
            memo[prefix + 'description'] = ability.description;
          }
          if (ability.used) {
            if (ability.frequency && ability.frequency === 'everyrounds') {
              memo[prefix + 'frequency'] = ability.frequency;
              memo[prefix + 'rounds_between'] = ability.used;
              memo[prefix + 'hasfrequency'] = '1';
              memo[prefix + 'used'] = 0;
              memo[prefix + 'used_max'] = 0;
              memo[prefix + 'max-calculation'] = '';
            } else {
              if (ability.frequency) {
                memo[prefix + 'frequency'] = ability.frequency;
                memo[prefix + 'hasfrequency'] = ability.frequency;
              } else {
                memo[prefix + 'frequency'] = 'perday';
                memo[prefix + 'hasfrequency'] = 'perday';
              }
              memo[prefix + 'hasuses'] = '1';
              memo[prefix + 'used'] = ability.used;
              memo[prefix + 'used_max'] = ability.used;
              memo[prefix + 'max-calculation'] = ability.used;
            }
          } else {
            memo[prefix + 'frequency'] = 'not-applicable'; //'not-applicable';
            memo[prefix + 'used'] = 0;
            memo[prefix + 'used_max'] = 0;
            memo[prefix + 'max-calculation'] = '';
            memo[prefix + 'hasfrequency'] = '';
            memo[prefix + 'hasuses'] = '';
          }
          if (ability.dmgtype) {
            memo[prefix + 'damage-type'] = ability.dmgtype;
          }
          if (ability.rule_category) {
            memo[prefix + 'rule_category'] = ability.rule_category;
          }
          if (ability.ability_type) {
            memo[prefix + 'ability_type'] = ability.ability_type;
          } else {
            memo[prefix + 'ability_type'] = ''; //'not-applicable';
          }
          memo[prefix + 'CL-basis'] = '@{npc-hd-num}';
          memo[prefix + 'CL-basis-mod'] = setter.level || 0;
          if (creatureRace) {
            memo[prefix + 'class-name'] = creatureRace;
          }
          if (ability.save) {
            memo[prefix + 'save'] = ability.save;
          }

          if (ability.DCability) {
            memo[prefix + 'ability-basis'] = '@{' + ability.DCability.toUpperCase() + '-mod}';
            abilityMod = abilityScoreMap[ability.DCability.toLowerCase()].mod;
          } else if (ability.ability_type === 'Sp' || setter.is_undead) {
            memo[prefix + 'ability-basis'] = '@{CHA-mod}';
            abilityMod = abilityScoreMap.cha.mod;
          } else {
            memo[prefix + 'ability-basis'] = '@{CON-mod}';
            abilityMod = abilityScoreMap.con.mod;
          }
          if (ability.extraDamage) {
            memo[prefix + 'damage-macro-text'] = ability.extraDamage;
          }
          if (ability.extraDamageType) {
            memo[prefix + 'damage-type'] = ability.extraDamageType;
          }
          memo[prefix + 'spell_level-basis'] = 'floor(@{casterlevel}/2)';
          if (ability.DC) {
            dc = parseInt(ability.DC, 10) || 0;
            calcDC = abilityMod + charlevel + 10;
            tempint = dc - calcDC;
            if (tempint !== 0) {
              memo[prefix + 'spell_level-misc'] = tempint;
              memo[prefix + 'spell_level-misc-mod'] = tempint;
            }
          }
        } catch (ierr2) {
          TAS.error('createFeatureEntries', ierr2);
        } finally {
          return memo;
        }
      }, {})
      .value();
    //TAS.debug"createFeatureAttrs adding " + _.size(attrs) + " to " + _.size(setter), attrs);
    setter = _.extend(setter, attrs);
  } catch (err) {
    TAS.error('createFeatureEntries', err);
  } finally {
    return setter;
  }
}
/** appends values of objects in sa2 to sa1 if name already exists in sa1
 * by reference
 * @param {Array} sa1 Array of {} js objects:list of special abilities maps. Must have 'name' property to compare
 * @param {Array} sa2 Array of {} js objects:list of special abilities maps. Must have 'name' property to compare
 * @returns {Array} sa2 concatenated with sa2, for any duplicates, we add properties from the sa2 version to sa1, but do not overwrite.
 */
function combineSpecialAbilities(sa1, sa2) {
  let combined;
  combined = _.map(sa1, function (sa) {
    let existingSA;
    try {
      existingSA = _.findWhere(sa2, {name: sa.name});
      if (existingSA) {
        _.each(_.keys(existingSA), function (key) {
          //TAS.debug("combining abilities: "+sa[key]+ " plus "+ existingSA[key]);
          if (key === 'description') {
            sa.description = (sa.description ? sa.description + ', ' : '') + (existingSA.description || '');
          } else if (key === 'shortdesc') {
            sa.shortdesc = (sa.shortdesc ? sa.shortdesc + ', ' : '') + (existingSA.shortdesc || '');
          } else if (!sa[key] && existingSA[key]) {
            sa[key] = existingSA[key];
          }
        });
      }
    } catch (err1) {
      TAS.error('combineSpecialAbilities err1', err1);
    } finally {
      return sa;
    }
  });
  sa2 = _.reject(sa2, function (sa) {
    if (_.findWhere(sa1, {name: sa.name})) {
      return true;
    }
    return false;
  });

  combined = _.union(combined, sa2);
  return combined;
}
function createClassEntries(characterClass, attrs, setter) {
  let sumlvls = 0,
    currlvls = 0,
    i = 0,
    startidx = 0,
    alreadyPresent = false;
  try {
    setter = setter || {};
    currlvls = setter.level || 0;
    if (characterClass.CL && characterClass.classname) {
      for (i = 0; i < 7; i++) {
        if (attrs['class-' + i + '-name'] || attrs['class-' + i + '-level'] > 0) {
          startidx = i;
          if (attrs['class-' + i + '-name'].toLowerCase() === characterClass.classname.toLowerCase()) {
            alreadyPresent = true;
            break;
          }
        }
      }
      if (startidx >= 6) {
        TAS.warning('too many classes, cannot add ' + characterClass.classname);
      } else {
        setter['class-' + startidx + '-name'] = characterClass.classname || '';
        setter['class-' + startidx + '-level'] = characterClass.CL || 0;
      }
      if (characterClass.CL) {
        currlvls += characterClass.CL || 0;
      }
      if ((setter.level || 0) !== currlvls) {
        setter.level = currlvls;
      }
    }
  } catch (err) {
    TAS.error('createClassEntries', err);
  } finally {
    return setter;
  }
}
/**************************** THE BIG ONE ***********************/
/*importFromCompendium - imports all stuff*/
export function importFromCompendium(eventInfo, callback, errorCallback) {
  let done = function (shouldupdate) {
      TAS.info('##############################################');
      TAS.info('Leaving importFromCompendium');
      if (shouldupdate) {
        PFSheet.checkForUpdate(true);
      }
      if (typeof callback === 'function') {
        callback();
      }
    },
    errorDone = _.once(function () {
      //TAS.info("##############################################");
      TAS.warn('Leaving importFromCompendium NOTHING DONE');
      if (typeof errorCallback === 'function') {
        errorCallback();
      }
    }),
    fields = npcCompendiumAttributesPlayer.concat(['is_npc', 'alignment', 'npc_parse_no_recalc']);
  getAttrs(fields, function (v) {
    let setter = {},
      abilityScores = {},
      sizeMap = {},
      speedMap = {},
      hpMap = {},
      acMap = {},
      importantFeats = {},
      reachObj = {},
      racialModsMap = {},
      skillsMap = {},
      attackGrid = {},
      baseFort = 0,
      baseRef = 0,
      baseWill = 0,
      bab = 0,
      featlist = [],
      level = 0,
      isUndead = false,
      forceCleric = false,
      specAbilObj = {},
      npcdesc = '',
      spellStr = '',
      tempNote = '',
      tempstr = '',
      tempInt = 0,
      tempFloat = 0.0,
      tempobj = null,
      baseInit = 0,
      initMisc = 0,
      spellcastingclass = -1,
      cr,
      attacklist,
      hpMod,
      tempArray,
      spellObj,
      casterObj,
      matches,
      attackArray,
      classSkillArray,
      specialAttacks,
      SLAs,
      attackArrays,
      specialAbilities = {},
      reachExceptions = [],
      allSoFar = {},
      specialQualities = [],
      recalcWhenDone = 0,
      match,
      baseSaves = {};
    //TAS.debug("importFromCompendium", v);
    try {
      baseFort = parseInt(v.fort_compendium, 10) || 0;
      baseRef = parseInt(v.ref_compendium, 10) || 0;
      baseWill = parseInt(v.will_compendium, 10) || 0;
      bab = parseInt(v['bab_compendium'], 10) || 0;
      //some basics ***************************************************
      setter['level'] = 0;
      if (!parseInt(v.npc_parse_no_recalc, 10)) {
        recalcWhenDone = 1;
      }
      setter['is_npc'] = '1';
      setter['is_v1'] = '1';
      setter['PFSheet_Version'] = String(PFConst.version.toFixed(3));
      setter['max-dex-source'] = 3;
      PFMigrate.getAllMigrateFlags(setter);
      if (v.xp_compendium) {
        setter['npc-xp'] = v.xp_compendium;
      }
      if (v.cr_compendium) {
        cr = v.cr_compendium.replace(/\s*cr\s*/i, '');
        cr = SWUtils.trimBoth(cr);
        setter['npc-cr'] = cr;
      }
      //setter["PC-Whisper"] = "/w gm";
      //Creature Race and Type *****************************************************
      //undead means use CHA instead of CON
      if (v.type_compendium) {
        setter['npc-type'] = v.type_compendium;
      }
      isUndead = /undead/i.test(v.type_compendium) || /undead/i.test(v.character_name);
      if (isUndead) {
        setter['is_undead'] = '1';
      }
      if (v.character_name) {
        setter['race'] = v['character_name'];
      }
      /****************** class(es)******************************/
      if (v.class_compendium) {
        setter['add_class'] = 1;
        tempInt = 0;
        matches = v.class_compendium.split(',');
        _.each(matches, function (classstr) {
          let lvl = 0,
            newclassstr = '',
            localmatch;
          try {
            localmatch = classstr.match(/\d+/);
            if (localmatch) {
              lvl = parseInt(localmatch[0], 10) || 0;
              newclassstr = SWUtils.trimBoth(classstr.replace(/\s*\d+\s*/, ' '));
            }
            createClassEntries({classname: newclassstr, CL: lvl}, {}, setter);
            tempInt++;
          } catch (cerr) {
            TAS.error('PFNPCparser error trying to parse class' + v.class_compendium);
          }
        });
        if (tempInt > 1) {
          setter['multiclassed'] = 1;
          setter['class1_show'] = 1;
        }
        tempInt = 0;
        level = setter.level;
      }
      // Ability Scores *****************************************************************
      abilityScores = parseAbilityScores(v, isUndead);
      createAbilityScoreEntries(abilityScores, setter);
      // Size **********************************************************************
      sizeMap = PFSize.setSizeFromString(v.size_compendium, setter);

      // Feats *********************************************************************
      featlist = parseFeats(v['npc-feats-text']);
      //TAS.debug("parseNPC featlist is ",featlist);
      importantFeats = buildImportantFeatObj(featlist);

      // Initiative *****************************************************************
      baseInit = getNPCInit(v.init_compendium);
      createInitEntries(baseInit, abilityScores, importantFeats, setter);
      /********************** Saves and defense ************************/
      if (v.dr_compendium) {
        setter['DR'] = v.dr_compendium;
      }
      if (v.sr_compendium) {
        setter['SR'] = v.sr_compendium;
        setter['SR-macro-text'] = v.sr_compendium;
      }
      baseSaves = {
        baseFort: baseFort,
        baseRef: baseRef,
        baseWill: baseWill,
      };
      createSaveEntries(abilityScores, isUndead, baseSaves, v, importantFeats, setter);
      //hit points ****************************
      createHPAbilityModEntry(abilityScores, isUndead, setter);
      hpMod = parseInt(setter['HP-ability-mod'], 10);
      //TAS.debug("calling parse hp with con mod of :" + hpMod);
      hpMap = parseNPChp(v['npc_hp_compendium'], hpMod);
      level += hpMap.hdice1 || 0;
      setter.level = level;
      createHealthEntries(abilityScores, isUndead, hpMap, setter);
      //AC ************************************************
      acMap = parseNPCAC(v['ac_compendium'], v.cmd_compendium, abilityScores.dex.mod, sizeMap.size);

      createACEntries(acMap, abilityScores, importantFeats, hpMap, bab, level, setter);

      // Misc *********************************************
      if (!v.senses_compendium) {
        matches = v.init_compendium.match(/senses/i);
        if (matches && matches[0]) {
          v.senses_compendium = SWUtils.trimBoth(v.init_compendium.slice(matches.index + 7));
        }
      }
      if (v.senses_compendium) {
        matches = v.senses_compendium.match(/perception/i);
        if (matches) {
          setter['vision'] = v.senses_compendium.slice(0, matches.index - 1);
        } else {
          setter['vision'] = v.senses_compendium;
        }
      }
      if (v.speed_compendium) {
        speedMap = parseSpeed(v.speed_compendium);
        createSpeedEntries(speedMap, importantFeats, setter);
      }
      if (v.alignment) {
        setter['alignment'] = v.alignment.toUpperCase();
      }
      if (v.space_compendium) {
        setter['space'] = parseSpace(v.space_compendium);
      }

      // Reach *******************************************
      reachObj = parseReach(v.reach_compendium);
      if (reachObj) {
        setter.reach = reachObj.reach;
        if (reachObj.reachNotes) {
          setter['reach-notes'] = reachObj.reachNotes;
        }
      } else {
        reachObj = {};
        reachObj.reach = 5;
        reachObj.reachExceptions = [];
      }
      // Attacks *********************************************************
      attackGrid = parseAndCreateAttackGrid(abilityScores, sizeMap, importantFeats, bab, level, v.cmb_compendium, setter);
      //TAS.debug("PFNPCParser attack Grid is: ",attackGrid);
      //#######set non list fields
      _.extend(allSoFar, setter);
      SWUtils.setWrapper(setter, PFConst.silentParams, function () {
        TAS.notice('saved 1');
      });
      setter = {};

      //######### set feats in list
      createFeatEntries(featlist, allSoFar.race, allSoFar.level, setter);
      if (_.size(setter)) {
        _.extend(allSoFar, setter);
        SWUtils.setWrapper(setter, PFConst.silentParams, function () {
          TAS.notice('saved 2');
        });
        setter = {};
      }

      parseAndCreateAttacks(abilityScores, sizeMap, importantFeats, bab, attackGrid, reachObj, v['npc-melee-attacks-text'], v['npc-ranged-attacks-text'], setter);
      if (_.size(setter)) {
        _.extend(allSoFar, setter);
        SWUtils.setWrapper(setter, PFConst.silentParams, function () {
          TAS.notice('saved 3');
        });
        setter = {};
      }

      //spells***************************************************
      //TAS.debug("checking for spells");

      if (v['npc-spells-prepared_compendium']) {
        spellStr = v['npc-spells-prepared_compendium'];
        forceCleric = true;
      } else if (v['npc-spells-known-text']) {
        spellStr = v['npc-spells-known-text'];
      }
      if (spellStr) {
        //advance index
        spellcastingclass = 0;
        setter['use_spells'] = 1;
        //TAS.debug("has some spells");
        spellObj = parseSpells(spellStr);
        //TAS.info("the spells are:",spellObj);
        if (spellObj) {
          setter['use_spells'] = 1;
          casterObj = getCasterObj(spellObj, abilityScores, hpMap, false, forceCleric);
          //TAS.info("the caster object is",casterObj);
          //do not add caster levels to hit dice or it gets screwed up
          //setter = createClassEntries (setter,casterObj);
          setCasterFields(casterObj, spellcastingclass, allSoFar, setter);
          createSpellEntries(spellObj, casterObj, setter);
          if (_.size(setter)) {
            _.extend(allSoFar, setter);
            SWUtils.setWrapper(setter, PFConst.silentParams, function () {
              TAS.notice('saved 4');
            });
            setter = {};
          }
        }
      }
      //Spell-like-abilities***************************************************
      //TAS.debug("checking for SLAs");
      if (v['npc-spellike-ability-text']) {
        SLAs = parseSLAs(v['npc-spellike-ability-text']);
        if (SLAs) {
          //TAS.debug("the SLAs are:", SLAs);
          casterObj = getCasterObj(SLAs, abilityScores, hpMap, true);
          setter = createSLAEntries(SLAs, casterObj, allSoFar.race, allSoFar.level, setter);
          if (_.size(setter)) {
            _.extend(allSoFar, setter);
            SWUtils.setWrapper(setter, PFConst.silentParams, function () {
              TAS.notice('saved 5');
            });
            setter = {};
          }
        }
      }

      //TAS.debug("after parseAndCreateAttacks attrnum:" + _.size(setter));
      //special Attacks ***************************************************
      specialAttacks = parseSpecialAttacks(setter, v['npc-special-attacks'], attackGrid.cmb);
      if (specialAttacks && specialAttacks.length > 0) {
        attackArrays = _.groupBy(specialAttacks, 'specialtype');
        createAttacks(attackArrays.attack, attackGrid, abilityScores, importantFeats, null, null, sizeMap, setter);
        specialAbilities = attackArrays.ability;
        if (_.size(setter)) {
          _.extend(allSoFar, setter);
          SWUtils.setWrapper(setter, PFConst.silentParams, function () {
            TAS.notice('saved 6');
          });
          setter = {};
        }
        //TAS.debug("after createSpecialAttackEntries attrnum:" + _.size(setter));
      }
      //TAS.debug("before parsing special abilities are:", specialAbilities);
      // content and special abilities ***************************
      if (v.content_compendium) {
        //TAS.debug("before parseSpecialAbilities attrnum:"+_.size(setter));
        specAbilObj = parseSpecialAbilities(v.content_compendium);

        //TAS.debug("returned from parse special abilities with", specAbilObj);
        if (specAbilObj) {
          if (specAbilObj.description && _.size(specAbilObj.description) > 0) {
            npcdesc = _.reduce(
              specAbilObj.description,
              function (memo, line) {
                memo += ' ';
                memo += line;
                return memo;
              },
              '',
            );
            setter['character_description'] = npcdesc;
          }
          if (specAbilObj.specialAbilities) {
            specialAbilities = combineSpecialAbilities(specialAbilities, specAbilObj.specialAbilities);
          }
        } else {
          setter['character_description'] = v.content_compendium;
        }
        //TAS.debug("now special abilities are:", specialAbilities);
      }
      if (v.SQ_compendium) {
        //TAS.debug("found special qualities");
        specialQualities = parseSpecialQualities(v.SQ_compendium);
        if (specialQualities) {
          specialAbilities = combineSpecialAbilities(specialAbilities, specialQualities);
        }
      }
      if (specialAbilities && _.size(specialAbilities) > 0) {
        createFeatureEntries(specialAbilities, abilityScores, allSoFar.race, allSoFar.level, setter);
        //look for sneak attack
        tempobj = _.find(specialAbilities, function (atkobj) {
          return /sneak.attack/i.test(atkobj.name);
        });
        if (tempobj) {
          setter['global_precision_dmg_macro'] = '[[[[floor((@{level}+1)/2)]]d6]]';
          setter['global_precision_dmg_type'] = tempobj.name;
        }
        if (_.size(setter)) {
          _.extend(allSoFar, setter);
          SWUtils.setWrapper(setter, PFConst.silentParams, function () {
            TAS.notice('saved 7');
          });
          setter = {};
        }
        //TAS.debug("after createFeatureEntries attrnum:" + _.size(setter));
      }

      //TAS.debug("before skills attrnum:" + _.size(setter));
      // skills *********************************************************
      if (v.skills_compendium) {
        skillsMap = parseSkills(v.skills_compendium);
        classSkillArray = getCreatureClassSkills(v.type_compendium);
        if (v.racial_mods_compendium) {
          racialModsMap = parseSkillRacialBonuses(v.racial_mods_compendium);
        }
        if (skillsMap && _.size(skillsMap) > 0) {
          createSkillEntries(skillsMap, racialModsMap, abilityScores, importantFeats, classSkillArray, sizeMap, isUndead, setter);
          //TAS.debug("after createSkillEntries attrnum:" + _.size(setter));
        }
      }
      //if(_.size(setter)){
      //	_.extend(allSoFar,setter);
      //	SWUtils.setWrapper(setter,PFConst.silentParams,function(){TAS.notice("saved 8 SKILLS");});
      //	setter={};
      //}
    } catch (err2) {
      TAS.error('importFromCompendium outer at end', err2);
    } finally {
      if (_.size(setter) || _.size(allSoFar)) {
        setter['npc_import_now'] = 0;
        setter['npc-compimport-show'] = 0;
        setter['modify_dmg_by_size'] = 1;
        setter['use_buff_bonuses'] = 1;
        //TAS.info("##############################################","END OF importFromCompendium");
        //TAS.debug("setting",setter);
        if (recalcWhenDone) {
          setter['is_newsheet'] = 1;
          setter['recalc1'] = 1;
        }
        SWUtils.setWrapper(setter, PFConst.silentParams, function () {
          TAS.notice('##### finished settings now done');
          done(recalcWhenDone);
        });
      } else {
        setter['npc_import_now'] = 0;
        setter['npc-compimport-show'] = 0;
        SWUtils.setWrapper(setter, PFConst.silentParams, errorDone);
      }
    }
  });
}
// PARSE CREATE NPC MONSTER
// change:npc_compendium_category
on(
  'change:npc_import_now',
  TAS.callback(function eventParseMonsterImport(eventInfo) {
    if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      getAttrs(['npc_import_now'], function (v) {
        if (parseInt(v.npc_import_now, 10) === 1) {
          importFromCompendium(eventInfo);
        }
      });
    }
  }),
);
/*
on("sheet:compendium-drop", TAS.callback(function eventCompendiumDrop(eventInfo) {
	if (eventInfo.sourceType === "player" ) {
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		importFromCompendium(eventInfo,function(){
			getAttrs(['vision'],function(v){
				var setter={}, matches,tempint=0;
				setter.bar1_link = 'HP';
				//setter.light_hassight = 1;
				if(v.vision){
					matches= v.vision.match(/darkvision (\d+)/i);
					if (matches && matches[1]){
						tempint = parseInt(matches[1],10)||60;
						setter.light_radius=tempint;
						setter.light_dimradius=tempint;
					}
				}
				//setDefaultToken(setter);
			});
		});
	}
}));

*/
