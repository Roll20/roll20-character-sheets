'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';

/****************************SYNCHRONOUS UTILITIES ***********************************
NO asynchronous FUNCTIONS SHOULD GO HERE
************************************************************************************** */
/** findAbilityInString - returns the attribute referenced by a dropdown option value.
 * Looks at a string for instances of an ability modifier DEX-mod, STR-mod,  etc and returns the modifier it finds.
 * if none are found, or if the first character is "0", return ""
 * NOTE: YOU MUST PUT ANY NEW DROPDOWN VALUES HERE!
 * (if they are references to other fields. obviously, dropdowns with 0, 1, 2 as values are not needed here)
 *@param {string} stringToSearch the value of the dropdown option selected
 *@returns {string} the attribute referenced by a dropdown option value.
 */
export function findAbilityInString(stringToSearch) {
  if (!stringToSearch) {
    return '';
  }
  if (stringToSearch.slice(0, 1) === '0') {
    return '';
  }
  if (/str.mod/i.test(stringToSearch)) {
    return 'STR-mod';
  }
  if (/dex.mod/i.test(stringToSearch)) {
    return 'DEX-mod';
  }
  if (/con.mod/i.test(stringToSearch)) {
    return 'CON-mod';
  }
  if (/int.mod/i.test(stringToSearch)) {
    return 'INT-mod';
  }
  if (/wis.mod/i.test(stringToSearch)) {
    return 'WIS-mod';
  }
  if (/cha.mod/i.test(stringToSearch)) {
    return 'CHA-mod';
  }
  if (/melee2/i.test(stringToSearch)) {
    return 'attk-melee2';
  }
  if (/melee/i.test(stringToSearch)) {
    return 'attk-melee';
  }
  if (/ranged2/i.test(stringToSearch)) {
    return 'attk-ranged2';
  }
  if (/ranged/i.test(stringToSearch)) {
    return 'attk-ranged';
  }
  if (/cmb2/i.test(stringToSearch)) {
    return 'CMB2';
  }
  if (/cmb/i.test(stringToSearch)) {
    return 'CMB';
  }
  if (/dual/i.test(stringToSearch)) {
    return 'dual';
  }
  if (/str/i.test(stringToSearch)) {
    return 'STR';
  }
  if (/dex/i.test(stringToSearch)) {
    return 'DEX';
  }
  if (/con/i.test(stringToSearch)) {
    return 'CON';
  }
  if (/int/i.test(stringToSearch)) {
    return 'INT';
  }
  if (/wis/i.test(stringToSearch)) {
    return 'WIS';
  }
  if (/cha/i.test(stringToSearch)) {
    return 'CHA';
  }
  if (/npc.type/i.test(stringToSearch)) {
    return 'npc-type';
  }
  if (/race/i.test(stringToSearch)) {
    return 'race';
  }
  if (/class.0.level/i.test(stringToSearch)) {
    return 'class-0-level';
  }
  if (/\{level\}/i.test(stringToSearch)) {
    return 'level';
  }
  if (/npc.hd.num/i.test(stringToSearch)) {
    return 'npc-hd-num';
  }
  if (/class.1.level/i.test(stringToSearch)) {
    return 'class-1-level';
  }
  if (/class.2.level/i.test(stringToSearch)) {
    return 'class-2-level';
  }
  if (/class.3.level/i.test(stringToSearch)) {
    return 'class-3-level';
  }
  if (/class.4.level/i.test(stringToSearch)) {
    return 'class-4-level';
  }
  if (/class.5.level/i.test(stringToSearch)) {
    return 'class-5-level';
  }
  if (/class.0.name/i.test(stringToSearch)) {
    return 'class-0-name';
  }
  if (/class.1.name/i.test(stringToSearch)) {
    return 'class-1-name';
  }
  if (/class.2.name/i.test(stringToSearch)) {
    return 'class-2-name';
  }
  if (/class.3.name/i.test(stringToSearch)) {
    return 'class-3-name';
  }
  if (/class.4.name/i.test(stringToSearch)) {
    return 'class-4-name';
  }
  if (/class.5.name/i.test(stringToSearch)) {
    return 'class-5-name';
  }
  return stringToSearch.replace('@{', '').replace('}', '');
  //    return "";
}

/** calculateSpellRanges - returns {close:x, medium:y , long:z} for casterlevel
 *@param {int} casterlevel level of caster
 *@param {int} use_metrics metric flag
 *@returns {jsobject} mapping like this: {close:int,medium:int,long:int}
 */
export function calculateSpellRanges(casterlevel, use_metrics) {
  const level = casterlevel || 0;
  //metric multiplier ft to m
  const multiplier = use_metrics > 0 ? 0.3048 : 1;
  return {
    close: Math.round((25 + 5 * Math.floor(level / 2)) * multiplier),
    medium: Math.round((100 + 10 * level) * multiplier),
    long: Math.round((400 + 40 * level) * multiplier),
  };
}

/** findSpellRange - calculates range number based on spell settings
 * @param {number} customRangeVal value that is in the custom range field
 * @param {string} rangeDropdown selected value from spell range dropdown
 * @param {number} casterlevel the level of caster
 * @param {number} use_metrics metric flag
 * @returns {number} the spell range
 */
export function findSpellRange(customRangeVal, rangeDropdown, casterlevel, use_metrics) {
  let newRange = 0;
  const ranges = calculateSpellRanges(casterlevel, use_metrics);
  const level = casterlevel || 0;
  let rangeKey = rangeDropdown || 'blank';
  if (rangeKey[0] === '{') {
    rangeKey = rangeKey.slice(2, rangeKey.indexOf('='));
  }
  // TAS.debug("at find SpellRange. rangetext:" + customRangeVal + ", rangeDropdown:" + rangeKey + ", casterlevel:" + level);
  switch (rangeKey) {
    case 'number':
    case 'custom':
      newRange = parseInt(customRangeVal, 10) || 0;
      break;
    case 'perlevel':
      newRange = (parseInt(customRangeVal, 10) || 0) * level;
      break;
    case 'close':
      newRange = ranges.close;
      break;
    case 'medium':
      newRange = ranges.medium;
      break;
    case 'long':
      newRange = ranges.long;
      break;
    case 'see text':
    case 'touch':
    case 'personal':
    case 'blank':
    default:
      newRange = 0;
      break;
  }
  // TAS.debug("returning customRangeVal " + newRange + " for " + rangeKey);
  return newRange;
}

/** getWoundPenalty - applies Endurance feat or Gritty Mode to wound level.
 *@param {int} woundLevel value of wounds attribute
 *@param {boolean} hasEndurance if char has Endurance feat (lessens penalty by 1)
 *@param {boolean} grittyMode if using grittyMode (doubles penalty, applied before hasEndurance)
 *@returns {int} value to apply.
 */
export function getWoundPenalty(woundLevel, hasEndurance, grittyMode) {
  return woundLevel !== 0 ? -1 * (woundLevel * (grittyMode + 1) - hasEndurance) : 0;
}

export function isOptionTemplateReversed(spellOptionKey) {
  return spellOptionKey === 'range_pick';
}

/** getOptionsCompiledRegexMap - finds {{key=*}} in a string to search rolltemplate macros
 * uses lookahead and lookbehind  to ensure must be preceded by start or }} , followed by end or {{
 * @param {jsobj map} options map {} of key , only key looked at.
 * @returns {jsobj map} of key to "{{key=*}}" but as a compiled regex
 */
export function getOptionsCompiledRegexMap(options) {
  return _.mapObject(options, function (outputstr, key) {
    if (!isOptionTemplateReversed(key)) {
      return new RegExp('\\s*((?=\\{\\{)|(?=^))\\{\\{' + key + '\\=.*?\\}\\}\\s*((?=\\{\\{)|(?=$))');
    }
    return new RegExp('((?=\\{\\{)|(?=^))\\s*\\{\\{\\.*?\\=' + key + '\\}\\}\\s*((?=\\{\\{)|(?=$))');
  });
}

/** shouldNotDisplayOption- returns true if the value is the default so we know not to bother displaying in roll.
 * @param {string} attr: can pass either the attribute or the option name it will be sent to
 * @param {string} val : the value of the attribute
 * @returns {boolean}
 */
export function shouldNotDisplayOption(attr, val) {
  if (!val) {
    return true;
  }
  switch (attr) {
    case 'sr':
      return !/^y/i.test(val);
    case 'save':
    case 'saving_throw':
      return (/^no/i.test(val) || /harmless/i.test(val)) && !/and|or/i.test(val);
    case 'spell_fail':
      return (parseInt(val, 10) || 0) !== 0;
    default:
      return false;
  }
}

/** deleteOption - removes option text from string and adds {{optionKey=}}
 * @param {string} optionText the string of a rolltemplate macro
 * @param {string} optionKey the key from rolltemplate setting
 * @param {string} regexMap output of keys
 * @returns {string} modified text with the optionKey portion replaced
 */
export function deleteOption(optionText, optionKey, regexMap) {
  let resultText = optionText || '';
  const repStr = isOptionTemplateReversed(optionKey) ? '{{=' + optionKey + '}}' : '{{' + optionKey + '=}}';
  // TAS.debug("deleteOption optionKey: " + optionKey + ", regexMap[optionKey]: " + regexMap[optionKey] + ", repStr: " + repStr);
  if (optionKey && resultText && regexMap[optionKey]) {
    resultText = resultText.replace(regexMap[optionKey], repStr);
  }
  return resultText;
}

/**getAvgHP returns average hp for given hit dice and die
 * also can return 75% or 100% of max hp
 * @param {int} hdice # of dice
 * @param {int} hdie # of sides (4,6,8,10,12,etc)
 * @param {float} mult optional percent of max to average, must be .5 (average), .75, or 1. If null then assume .5
 * @param {boolean} firstMax if true then 1st level gets 100% hp
 * @param {boolean} ispfs if true then round up EVERY level.
 * @returns {int} hit point average.
 */
export function getAvgHP(hdice, hdie, mult, firstMax, ispfs) {
  let hp = 0;
  let bonus = 1;
  let hpMult = mult || 1;
  let diceCount = hdice || 0;
  //TAS.debug("PFUtils.getAvgHP called with hdice:"+hdice+", hdie:"+hdie+", mult:"+hpMult+", firstMax:"+firstMax);
  if (hdie === 0) {
    return 0;
  }
  if (!(hpMult === 0.5 || hpMult === 0.75 || hpMult === 1)) {
    hpMult = 0.5;
  }
  if (ispfs) {
    bonus = 2;
    hpMult = 0.5;
  }
  if (hpMult === 1) {
    hp = hdie * hdice;
  } else {
    if (firstMax) {
      diceCount--;
    }
    hp = Math.floor((100 * (hdie + bonus) * hpMult * diceCount) / 100);
    if (firstMax) {
      hp += hdie;
    }
  }
  return hp;
}

/** takes value of auto hit point radio and returns percent it represents 50,75,100.
 * @param {int} autohp_percent the value of attr_autohp_percent
 * @returns {decimal} either 0.5, 0.75,  or 1.00
 */
export function getAutoHPPercentMultiplier(autohp_percent) {
  let newhealth = 0;
  const autoHpPercent = parseInt(autohp_percent, 10) || 0;
  switch (autoHpPercent) {
    case 1:
      newhealth = 0.5;
      break;
    case 2:
      newhealth = 0.75;
      break;
    case 3:
      newhealth = 1;
      break;
    default:
      newhealth = 0.5;
      break;
  }
  //TAS.debug("at getAutoHPPercentMultiplier called with "+autoHpPercent+", returning with :" + newhealth);
  return newhealth;
}

/** parseSpellRangeText - Initial parse of a string from spell
 * @param {string} range the range string from a spell
 * @param {string} area the area or target string from a spell
 * @returns {object} map format: {"dropdown":newRangeDropdown,"useorig":useOrigRangeText,"number":flatRange,"rangetext":newRangeText}
 */
export function parseSpellRangeText(range, area) {
  var newRangeDropdown = '',
    tempRange = 0,
    tempMatches,
    tempMatches2,
    useOrigRangeText = false,
    flatRange = -1,
    areaRange,
    newRangeText = '';
  let currentRange = (range || '').toLowerCase();
  // TAS.debug("at parseSpellRangeText: range:" + currentRange + ", area:" + area);
  try {
    if (!currentRange) {
      if (!area) {
        return {
          dropdown: 'blank',
          useorig: false,
          rangetext: '',
          number: 0,
        };
      }
      areaRange = parseSpellRangeText(area, null);
      if (areaRange.dropdown === 'unknownrange') {
        areaRange.dropdown = 'blank';
      }
      if (!(areaRange.dropdown === 'number' || areaRange.dropdown === 'perlevel')) {
        areaRange.useorig = false;
        areaRange.rangetext = '';
      }
      return areaRange;
    }

    // if unlimited use area/target field
    if (!newRangeDropdown && currentRange === 'unlimited') {
      areaRange = parseSpellRangeText(area, null);
      if (areaRange.dropdown === 'unknownrange') {
        newRangeDropdown = 'blank';
      } else {
        newRangeDropdown = areaRange.dropdown;
        if (!/short|medium|long/.test(newRangeDropdown)) {
          useOrigRangeText = areaRange.useorig;
          if (useOrigRangeText && areaRange.rangetext) {
            currentRange = areaRange.rangetext;
          }
        }
      }
    }

    if (!newRangeDropdown) {
      // and or or - use value after and/or if there is one
      tempMatches = currentRange.match(/(.*?)\s+(or|and)\s+/);
      if (tempMatches && tempMatches[1]) {
        areaRange = parseSpellRangeText(currentRange.substring(tempMatches[0].length), null);
        if (areaRange && !(areaRange.dropdown === 'unknownrange' || areaRange.dropdown === 'blank')) {
          newRangeDropdown = areaRange.dropdown;
          if (areaRange.rangetext || areaRange.number !== -1) {
            if (newRangeDropdown === 'number') {
              if (areaRange.rangetext) {
                currentRange = areaRange.rangetext + ' ' + tempMatches[2] + ' ' + tempMatches[1];
              } else {
                currentRange = areaRange.number + ' ft. ' + tempMatches[2] + ' ' + tempMatches[1];
              }
            } else if (newRangeDropdown === 'perlevel') {
              if (areaRange.rangetext) {
                currentRange = areaRange.rangetext + '/level ' + tempMatches[2] + ' ' + tempMatches[1];
              } else {
                currentRange = areaRange.number + 'ft. /level  ' + tempMatches[2] + ' ' + tempMatches[1];
              }
            } else {
              currentRange = tempMatches[1] + ' ' + tempMatches[2] + ' ' + (areaRange.rangetext || '');
            }
          }
          useOrigRangeText = true;
        }
      }
    }

    if (!newRangeDropdown) {
      if (currentRange === 'you') {
        newRangeDropdown = 'personal';
      } else {
        tempMatches = currentRange.match(/close|short|medium|long|touch|see text|personal|special|\/level/);
        if (tempMatches && tempMatches[0]) {
          switch (tempMatches[0]) {
            case 'close':
            case 'medium':
            case 'long':
            case 'personal':
            case 'touch':
            case 'see text':
              newRangeDropdown = tempMatches[0];
              break;
            case 'short':
              newRangeDropdown = 'close';
              break;
            case 'special':
              newRangeDropdown = 'see_text';
              break;
            case '/level':
              tempMatches2 = currentRange.match(/(\d+)(\D*)\/level/);
              if (tempMatches2 && tempMatches2[1]) {
                tempRange = parseInt(tempMatches2[1], 10) || 0;
                currentRange = tempMatches2[1] + (tempMatches2[2] || '');
                useOrigRangeText = true;
                newRangeDropdown = 'perlevel';
                flatRange = tempRange;
              }
              break;
          }
        }
      }
    }

    if (!newRangeDropdown) {
      tempRange = parseInt(currentRange, 10);
      if (!isNaN(tempRange) && tempRange > 0) {
        newRangeDropdown = 'number';
        flatRange = tempRange;
        useOrigRangeText = true;
      } else {
        tempMatches2 = currentRange.match(/within\s|more\sthan\s/);
        if (tempMatches2) {
          const searchIndex = tempMatches2.index + tempMatches2[0].length;
          const searchRange = currentRange.substring(searchIndex);
          tempRange = parseInt(searchRange, 10);
          if (!isNaN(tempRange) && tempRange > 0) {
            newRangeDropdown = 'number';
            flatRange = tempRange;
            useOrigRangeText = true;
            currentRange = searchRange;
          }
        }
      }
    }

    if (!newRangeDropdown && area) {
      areaRange = parseSpellRangeText(area, null);
      newRangeDropdown = areaRange.dropdown;
      if (newRangeDropdown === 'number' || newRangeDropdown === 'perlevel') {
        useOrigRangeText = true;
        currentRange = areaRange.rangetext;
      }
    }
  } catch (errorParsing) {
    TAS.error('parseSpellRangeText, error', errorParsing);
    newRangeDropdown = 'unknownrange';
    useOrigRangeText = true;
  }

  if (!newRangeDropdown) {
    newRangeDropdown = 'unknownrange';
    useOrigRangeText = true;
  }

  if (useOrigRangeText === true) {
    if (newRangeDropdown !== 'unknownrange') {
      newRangeText = currentRange
        .replace(/\s*\(.*?\)/, '')
        .trim()
        .replace('feet', 'ft.');
    } else {
      newRangeText = currentRange;
    }
  }
  return {
    dropdown: newRangeDropdown,
    useorig: useOrigRangeText,
    number: flatRange,
    rangetext: newRangeText,
  };
}

export function replaceMissingNegatives_BadDice(str) {
  //match still returns even if 3rd plus missing
  if (PFConst.findBadNegDice.test(str)) {
    return str.replace(PFConst.findBadNegDice, '$1d$2-$3');
  }
  return str;
}

export function replaceMissingNegatives_CritRange(str) {
  return str.replace(PFConst.findBadCritRange, '$1-20');
}

export function convertDashToMinus(str) {
  return str.replace(PFConst.dashtominusreg, '-');
}

/** parseCost gets cost in gp
 * @param {string} str the string containing the cost: 35gp, 20sp, etc
 * @returns {int} cost in gp.
 */
export function getCostInGP(str) {
  var temp = 0,
    matches = str.match(/(\d+)/);
  TAS.debug('PFUtil.getCostInGP: parsing:' + str + ', match on number:', matches);
  if (matches) {
    temp = parseInt(matches[1], 10) || 0;
    matches = str.match(/(gp|cp|sp|pp)/i);
    TAS.debug('PFUtil.getCostInGP: parsing:' + str + ', match on coins:', matches);
    if (matches) {
      switch (matches[1]) {
        case 'pp':
          temp = temp * 10;
          break;
        case 'sp':
          temp = temp / 10;
          break;
        case 'cp':
          temp = temp / 100;
          break;
      }
    }
  }
  return temp;
}

export function getIntFromString(str, cleanedup, atStart) {
  let temp = 0;
  let matches;
  let workingStr = str || '';

  if (!cleanedup) {
    workingStr = replaceMissingNegatives_CritRange(workingStr);
    workingStr = convertDashToMinus(workingStr);
  }
  if (!atStart) {
    matches = workingStr.match(/[\+\-]{0,1}\d+/);
  } else {
    matches = workingStr.match(/^[\+\-]{0,1}\d+/);
  }
  if (matches) {
    temp = parseInt(matches[0], 10) || 0;
  }
  return temp;
}

/**Returns object of a crit string as mapped ints as: crit:minimum threat range (def 20), critmult: how much by which to multiply dice (def 2)
 * spaces: number of spaces string took
 * @param {string} str the string that should have /19-20x2 or x2 in it.
 * @param {boolean} cleanedup if replaceMissingNegatives_CritRange already called on string
 * @returns {{'crit':number,'critmult':number,'spaces':number}}
 */
export function getCritFromString(str, cleanedup) {
  let ret = {crit: 20, critmult: 2, spaces: 0};
  let matches;
  let workingStr = str || '';
  if (!cleanedup) {
    workingStr = convertDashToMinus(workingStr);
    workingStr = replaceMissingNegatives_CritRange(workingStr);
  }
  ret.critmult = 2;
  if ((matches = PFConst.critreg.exec(workingStr)) !== null) {
    ret.crit = parseInt(matches[1], 10) || 20;
    if (matches[2]) {
      ret.critmult = parseInt(matches[2], 10);
    }
    ret.spaces = matches[0].length;
  } else if ((matches = PFConst.critmultreg.exec(workingStr)) !== null) {
    ret.critmult = parseInt(matches[1], 10);
    ret.spaces = matches[0].length;
  }
  return ret;
}

/**Returns object of a dice string as mapped ints: dice:# of dice, die:# of sides, plus: plus or minus to roll, spaces:length of string found
 * @param {string} str the string that should have xdy+z in it.
 * @param {boolean} cleanedup if replaceMissingNegatives_BadDice already called on string
 * @param {boolean} atStart if true only look for dice at start of str
 * @returns {{'dice':number,'die':number,'plus':number,'spaces':number}}
 */
export function getDiceDieFromString(str, cleanedup, atStart) {
  let matches;
  let sign = 1;
  const ret = {dice: 0, die: 0, plus: 0, spaces: 0};
  let workingStr = str || '';
  if (!workingStr) {
    return ret;
  }
  if (!cleanedup) {
    workingStr = replaceMissingNegatives_BadDice(workingStr);
    workingStr = convertDashToMinus(workingStr);
  }
  matches = workingStr.match(PFConst.diceDiereg);
  if (matches) {
    // If we don't care about the start, or it IS at the start
    if (!atStart || matches.index === 0) {
      ret.spaces = matches[0].length + (matches.index || 0);
      ret.dice = parseInt(matches[1], 10) || 0;
      ret.die = parseInt(matches[2], 10) || 0;
      if (matches[3] === '-') {
        sign = -1;
      }
      if (matches[4]) {
        ret.plus = sign * (parseInt(matches[4], 10) || 0);
      }
    }
  }
  TAS.debug('getDiceDieFromString parsed: ' + workingStr, matches, ret);
  return ret;
}

/**replaceDiceDieString puts inline roll brackets [[ ]] around 'xdy +z' dice strings (z exists or not)
 *@param {string} str a string which includes a diceroll substring xdy or xdy +/-z
 *@returns {string} same string with brackets around dice roll
 */
export function replaceDiceDieString(str) {
  let workingStr = str || '';
  workingStr = replaceMissingNegatives_BadDice(workingStr);
  return workingStr.replace(PFConst.diceDieregOneGroup, '[[ $1 ]]');
}

/* like replaceDiceDieString but instead of replacing returns the first dice match with [[ ]] around it.
 *@param {string} str a string which includes a diceroll substring xdy or xdy +/-z
 *@returns {string} brackets around dice roll or ""
 */
export function getDiceDieString(str) {
  let matches;
  let workingStr = str || '';
  workingStr = replaceMissingNegatives_BadDice(workingStr);
  matches = PFConst.diceDieregOneGroup.exec(workingStr);
  if (matches) {
    return '[[ ' + matches[0] + ' ]]';
  }
  return '';
}

export function getSpecialAbilityTypeFromString(str) {
  var ret = '',
    matches;
  if (!str) {
    return '';
  }
  matches = /\b(Su|Ex|Sp)\b/i.exec(str);
  if (matches) {
    return matches[1][0].toUpperCase() + matches[1][2].toLowerCase();
  }
  return '';
}

/** returns string after first comma ( that is after an opening parenthesis )
 * or after first comma if there is no opening parenthesis
 * @param {string} str the string to split
 * @param {boolean} putOutside if true then return whatever is before first comma and after opening paren.
 *      if false, then return everything up to first paren then between 1st and 2nd comma. why? who the hell knows?
 * @returns {?} ?
 */
export function removeUptoFirstComma(str, putOutside) {
  var parensplit, commasplit, retstr, i;
  if (str.indexOf('(') < 0 || str.indexOf(',') < 0) {
    return str;
  }
  parensplit = str.split(/\s*\(\s*/);
  if (parensplit.length > 1) {
    commasplit = parensplit[1].split(/,\s*/);
  } else {
    commasplit = str.split(/,\s*/);
  }
  retstr = putOutside ? commasplit[0] : parensplit[0] + '(' + commasplit[1];
  //rejoin rest of string this is really slow, why bother doing it this way?
  if (commasplit.length > 2) {
    for (i = 2; i < commasplit.length; i++) {
      retstr += ',' + commasplit[i];
    }
  }
  return retstr;
}

/**getDCString - gets macro formula for special ability calculating DC using ability score, what the level attribute is, and
 * whether to divide that level by 2 or not.
 * @param {string} ability the ability score string the DC is based on. Usually CON for special abilities.
 * @param {string} levelAttr optional the level attribute , either "level" or "class-0-level" or "npc-hd-num" etc
 * @param {boolean} isUndead flag if undead, if true, then if ability is 'CON' change to 'CHA'
 * @param {int} miscBonus a flat number to add in
 * @param {boolean} doNotDivideByTwo if true then do not divide level attr value by 2
 * @returns {string} default is: "DC [[ 10 + @{" + ability + "-mod} + floor(@{"+levelAttr+"}/2) ]]";
 */
export function getDCString(ability, levelAttr, isUndead, miscBonus, doNotDivideByTwo) {
  let tempstr = '';
  let pre = 'floor(';
  let post = '/2)';
  let workingAbility = ability || '';

  tempstr = 'DC [[ 10 ';
  if (workingAbility) {
    if (isUndead && workingAbility === 'CON') {
      workingAbility = 'CHA';
    }
    tempstr += '+ @{' + workingAbility + '-mod} ';
  }
  if (levelAttr) {
    if (doNotDivideByTwo) {
      pre = '';
      post = '';
    } else {
      tempstr += '+ ' + pre + '@{' + levelAttr + '}' + post + ' ';
    }
  }
  if (miscBonus) {
    tempstr += '+ ' + miscBonus;
  }
  tempstr += ' ]]';
  return tempstr;
}
/**replaceDCString looks for DC n, and replaces "n" with the [[ calculated DC  ]] by calling getDCString
 * @param {string} str the string to search and replace
 * @param {string} ability the ability score string the DC is based on. Usually CON for special abilities.
 * @param {string} levelAttr optional the level attribute , either "level" or "class-0-level" or "npc-hd" etc
 * @param {boolean} isUndead flag if undead, if true, then if ability is 'CON' change to 'CHA'
 * @param {int} levelFlatNum optional the level, if levelAttr is blank, this must be filled in, or vice versa
 * @param {boolean} doNotDivideByTwo if true then do not divide level by 2 to calculate DC
 * @returns {string} default is: "DC [[ 10 + @{" + ability + "-mod} + floor(@{"+levelAttr+"}/2) ]]"
 */
export function replaceDCString(str, ability, levelAttr, isUndead, levelFlatNum, doNotDivideByTwo) {
  var tempstr = '',
    matches,
    pre = '',
    post = '',
    retstr = str,
    rawDC = 10;
  try {
    matches = str.match(/D[Cc]\s*\d+/);
    if (matches) {
      tempstr = matches[0].match(/\d+/);
      rawDC = parseInt(tempstr, 10) || 0;
      tempstr = getDCString(ability, levelAttr, isUndead, levelFlatNum, doNotDivideByTwo);
      pre = str.slice(0, matches.index) || '';
      post = str.slice(matches.index + matches[0].length) || '';
      retstr = pre + tempstr + post;
    }
  } catch (er) {
    TAS.error('at replaceDCString, cannot find DC string in ' + str, er);
  } finally {
    return retstr;
  }
}
/** returns rest of string after number
 *@param {string} str the string
 *@returns {string} rest of string after finding a number.
 */
export function getNoteAfterNumber(str) {
  let match;
  let workingStr = str || '';
  if (workingStr) {
    match = workingStr.match(/\d+/);
    if (match) {
      workingStr = SWUtils.trimBoth(workingStr.slice(match.index + match.length));
    }
  }
  return workingStr;
}

/**gets value of '<field>_compendium' from v,passes it to synchronous methodToCall mapping function, then adds 'field' to setter with val:
 *   setter[<prefix>(<setField>|<field>)] = methodToCall(v[<prefix><field>_compendium])
 *@param {string} prefix the repeating_section_id_  string
 *@param {string} field the name of compendium field , must have _compendium at end. Without '_compendium' this is the write field
 *@param {function} methodToCall synchronous function that maps value of field_compendium to another val to set
 *@param {Map<string,any>} v the values returned from getAttrs
 *@param {Map<string,any>} setter to pass to SWUtils.setWrapper
 *@param {string} setField optional if the attr to write to is not 'field' it will be prefix+setField
 */
export function getCompendiumFunctionSet(prefix, field, methodToCall, v, setter, setField) {
  let temp = 0;
  const attr = v[prefix + field + '_compendium'];
  const output = setter || {};
  const targetField = setField || field;
  TAS.debug('PFUtils.getCompendiumFunctionSet getting ' + prefix + field + '_compendium, val: ' + attr);
  if (attr) {
    temp = methodToCall(attr);
    TAS.debug('on return value is:' + temp);
    if (temp) {
      TAS.debug('setting ' + prefix + field + ' with value ' + temp);
      // We modify the property of the object, which is perfectly fine
      output[prefix + targetField] = temp;
    }
  }
  return output;
}

/** gets int value 'field_compendium' from v, then sets in 'field'
 * @param {string} prefix the repeating_section_id_ string
 * @param {string} field the name of compendium field
 * @param {Map} v the values returned from getAttrs
 * @param {Map} setter to pass to SWUtils.setWrapper
 * @param {string} setField optional target field name
 */
export function getCompendiumIntSet(prefix, field, v, setter, setField) {
  let tempInt = 0;
  let attr;
  const targetField = setField || field;
  const output = setter || {};
  try {
    attr = v[prefix + field + '_compendium'];
    if (attr) {
      tempInt = getIntFromString(attr);
      if (tempInt) {
        // Use targetField instead of field
        output[prefix + targetField] = tempInt;
      }
    }
  } catch (err) {
    TAS.error('getCompendiumIntSet error on :' + prefix + ', field:' + field + ', setField:' + targetField, err);
  } finally {
    return output;
  }
}

export function removeWhisperFromMacro(macrostr) {
  var matches;
  if (!macrostr) {
    return macrostr;
  }
  //use hisper since some have capital W others not
  matches = macrostr.match(/whisper\}/i);
  if (matches) {
    return SWUtils.trimBoth(macrostr.slice(matches.index + matches[0].length));
  }
  return macrostr;
}

//PFConsole.log( '   PFUtils module loaded          ');
//PFLog.modulecount++;
