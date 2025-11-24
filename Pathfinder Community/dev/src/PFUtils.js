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
export function findAbilityInString (stringToSearch) {
    if (!stringToSearch) {
        return "";
    }
    if (stringToSearch.slice(0, 1) === "0") {
        return "";
    }
    if (/str.mod/i.test(stringToSearch)) {
        return "STR-mod";
    }
    if (/dex.mod/i.test(stringToSearch)) {
        return "DEX-mod";
    }
    if (/con.mod/i.test(stringToSearch)) {
        return "CON-mod";
    }
    if (/int.mod/i.test(stringToSearch)) {
        return "INT-mod";
    }
    if (/wis.mod/i.test(stringToSearch)) {
        return "WIS-mod";
    }
    if (/cha.mod/i.test(stringToSearch)) {
        return "CHA-mod";
    }
    if (/melee2/i.test(stringToSearch)) {
        return "attk-melee2";
    }
    if (/melee/i.test(stringToSearch)) {
        return "attk-melee";
    }
    if (/ranged2/i.test(stringToSearch)) {
        return "attk-ranged2";
    }
    if (/ranged/i.test(stringToSearch)) {
        return "attk-ranged";
    }
    if (/cmb2/i.test(stringToSearch)) {
        return "CMB2";
    }
    if (/cmb/i.test(stringToSearch)) {
        return "CMB";
    }
    if(/dual/i.test(stringToSearch)){
        return "dual";
    }
    if (/str/i.test(stringToSearch)) {
        return "STR";
    }
    if (/dex/i.test(stringToSearch)) {
        return "DEX";
    }
    if (/con/i.test(stringToSearch)) {
        return "CON";
    }
    if (/int/i.test(stringToSearch)) {
        return "INT";
    }
    if (/wis/i.test(stringToSearch)) {
        return "WIS";
    }
    if (/cha/i.test(stringToSearch)) {
        return "CHA";
    }
    if (/npc.type/i.test(stringToSearch)) {
        return "npc-type";
    }
    if (/race/i.test(stringToSearch)) {
        return "race";
    }
    if (/class.0.level/i.test(stringToSearch)) {
        return "class-0-level";
    }
    if (/\{level\}/i.test(stringToSearch)) {
        return "level";
    }
    if (/npc.hd.num/i.test(stringToSearch)) {
        return "npc-hd-num";
    }
    if (/class.1.level/i.test(stringToSearch)) {
        return "class-1-level";
    }
    if (/class.2.level/i.test(stringToSearch)) {
        return "class-2-level";
    }
    if (/class.3.level/i.test(stringToSearch)) {
        return "class-3-level";
    }
    if (/class.4.level/i.test(stringToSearch)) {
        return "class-4-level";
    }
    if (/class.5.level/i.test(stringToSearch)) {
        return "class-5-level";
    }
    if (/class.0.name/i.test(stringToSearch)) {
        return "class-0-name";
    }
    if (/class.1.name/i.test(stringToSearch)) {
        return "class-1-name";
    }
    if (/class.2.name/i.test(stringToSearch)) {
        return "class-2-name";
    }
    if (/class.3.name/i.test(stringToSearch)) {
        return "class-3-name";
    }
    if (/class.4.name/i.test(stringToSearch)) {
        return "class-4-name";
    }
    if (/class.5.name/i.test(stringToSearch)) {
        return "class-5-name";
    }
    return stringToSearch.replace("@{","").replace("}","");
//    return "";
}
/** calculateSpellRanges - returns {close:x, medium:y , long:z} for casterlevel
 *@param {int} casterlevel level of caster
 *@param {int} use_metrics metric flag
 *@returns {jsobject} mapping like this: {close:int,medium:int,long:int}
 */
export function calculateSpellRanges (casterlevel, use_metrics) {
    casterlevel = casterlevel || 0;
        //metric multiplier ft to m
        if (use_metrics > 0) {
            use_metrics = 0.3048;
        }
        else{
            use_metrics = 1;
        }
    return {
        close: Math.round((25 + (5 * (Math.floor(casterlevel / 2))))*use_metrics),
        medium: Math.round((100 + (10 * casterlevel))*use_metrics),
        "long": Math.round((400 + (40 * casterlevel))*use_metrics)
    };
}
/**findSpellRange -  calculates range number based on spell settings
 * @param {int} customRangeVal value that is in the custom range field, for "per level" or "custom" choices
 * @param {string} rangeDropdown selected value from spell range dropdown
 * @param {int} casterlevel the level of caster
 * @param {int} use_metrics metric flag
 * @returns {int_or_""} the spell range
 */
export function findSpellRange (customRangeVal, rangeDropdown, casterlevel, use_metrics) {
    var newRange = 0,
    ranges = calculateSpellRanges(casterlevel, use_metrics);
    casterlevel = casterlevel || 0;
    rangeDropdown=rangeDropdown||'blank';
    if (rangeDropdown[0] === "{") {
        rangeDropdown = rangeDropdown.slice(2, rangeDropdown.indexOf("="));
    }
    //TAS.debug("at find SpellRange. rangetext:"+customRangeVal +", rangeDropdown:"+rangeDropdown+", area:"+area+", casterlevel:"+casterlevel);
    switch (rangeDropdown) {
        case 'number':
        case 'custom':
            newRange = parseInt(customRangeVal, 10) || 0;
            break;
        case 'perlevel':
            newRange = (parseInt(customRangeVal, 10) || 0) * casterlevel;
            break;
        case 'close':
            newRange = ranges.close;
            break;
        case 'medium':
            newRange = ranges.medium;
            break;
        case 'long':
            newRange = ranges["long"];
            break;
        case 'see text':
        case 'touch':
        case 'personal':
        case 'blank':
        default:
            newRange = 0;
            break;
    }
    //TAS.debug("returning customRangeVal "+newRange+" for "+rangeDropdown);
    return newRange;
}
/** getWoundPenalty - applies Endurance feat or Gritty Mode to wound level.
 *@param {int} woundLevel value of wounds attribute
 *@param {boolean} hasEndurance if char has Endurance feat (lessens penalty by 1)
 *@param {boolean} grittyMode if using grittyMode (doubles penalty, applied before hasEndurance)
 *@returns {int} value to apply.
 */
export function getWoundPenalty  (woundLevel, hasEndurance, grittyMode) {
    return (woundLevel !== 0) ? (-1 * ((woundLevel * (grittyMode + 1)) - hasEndurance)) : 0;
}

export function isOptionTemplateReversed  (spellOptionKey) {
    return spellOptionKey === "range_pick";
}
/** getOptionsCompiledRegexMap - finds {{key=*}} in a string to search rolltemplate macros
 * uses lookahead and lookbehind  to ensure must be preceded by start or }} , followed by end or {{
 * @param {jsobj map} options map {} of key , only key looked at.
 * @returns {jsobj map} of key to "{{key=*}}" but as a compiled regex
 */
export function getOptionsCompiledRegexMap  (options) {
    return _.mapObject(options, function (outputstr, key) {
        if (!isOptionTemplateReversed(key)) {
            return new RegExp("\\s*((?=\\{\\{)|(?=^))\\{\\{" + key + "\\=.*?\\}\\}\\s*((?=\\{\\{)|(?=$))");
        }
        return new RegExp("((?=\\{\\{)|(?=^))\\s*\\{\\{\\.*?\\=" + key + "\\}\\}\\s*((?=\\{\\{)|(?=$))");
    });
}
/** shouldNotDisplayOption- returns true if the value is the default so we know not to bother displaying in roll.
 * @param {string} attr: can pass either the attribute or the option name it will be sent to
 * @param {string} val : the value of the attribute
 * @returns {boolean}
 */
export function shouldNotDisplayOption  (attr, val) {
    if (!val) {
        return true;
    }
    switch (attr) {
        case 'sr':
            return (!(/^y/i.test(val)));
        case 'save':
        case 'saving_throw':
            return ((/^no/i.test(val) || /harmless/i.test(val)) && !(/and|or/i.test(val)));
        case 'spell_fail':
            return  ( (parseInt(val,10)||0) !== 0);
        default:
            return false;
    }
}
/** deleteOption - removes option text from string and adds {{optionKey=}}
 * @param {string} optionText the string of a rolltemplate macro
 * @param {string} optionKey the key from rolltemplate setting, as in: {{optionKey=xxxx}}
 * @param {string} regexMap output of keys, what to search for from getOptionsCompiledRegexMap()
 * @returns {string} optionText with the optionKey portion of macro replaced with empty value
 */
export function deleteOption  (optionText, optionKey, regexMap) {
    var repStr = isOptionTemplateReversed(optionKey) ? "{{=" + optionKey + "}}" : "{{" + optionKey + "=}}";
    //TAS.debug("deleteOption optionKey"+optionKey+", regexMap[optionKey]:"+regexMap[optionKey]+", repStr:"+repStr);
    if (optionKey && optionText && regexMap[optionKey]) {
        optionText = optionText.replace(regexMap[optionKey], repStr);
    }
    return optionText;
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
export function getAvgHP  (hdice, hdie, mult, firstMax, ispfs) {
    var hp=0, bonus=1;
    //TAS.debug("PFUtils.getAvgHP called with hdice:"+hdice+", hdie:"+hdie+", mult:"+mult+", firstMax:"+firstMax);
    if (hdie===0){
        return 0;
    }
    if (!(mult === 0.5 || mult === 0.75 || mult === 1)) {
        mult = 0.5;
    }
    if (ispfs) {
        bonus = 2;
        mult = 0.5;
    }
    if (mult === 1) {
        hp = hdie * hdice;
    } else {
        if (firstMax) {
            hdice --;
        }
        hp= Math.floor( (100*(hdie + bonus) * mult * hdice)/100);
        if (firstMax){
            hp+=hdie;
        }
    }
    return hp;
}
/** takes value of auto hit point radio and returns percent it represents 50,75,100.
 * @param {int} autohp_percent the value of attr_autohp_percent
 * @returns {decimal} either 0.5, 0.75,  or 1.00
 */
export function getAutoHPPercentMultiplier  (autohp_percent) {
    var  newhealth=0;
    autohp_percent = parseInt(autohp_percent,10)||0;
    switch (autohp_percent){
        case 1: newhealth=0.5;  break;
        case 2: newhealth=0.75; break;
        case 3: newhealth=1;   break;
        default: newhealth=0.5; break;
    }
    //TAS.debug("at getAutoHPPercentMultiplier called with "+autohp_percent+", returning with :" + newhealth);
    return newhealth;
}
/** parseSpellRangeText - Initial parse of a string from spell , it returns the value to set in the dropdown,
 * plus whether to run the range text through a secondary parse for numbers.
 * returns object with keys: dropdown, useorig, number, rangetext
 * (number only returned if number is a flat number)
 * @param {string} range the range string from a spell
 * @param {string} area the area or target string from a spell (whichever filled in, only 1 will be)
 * @returns {jsobj} map format: {"dropdown":newRangeDropdown,"useorig":useOrigRangeText if special,"number":flatRange,"rangetext":newRangeText if we need to fill in text}
 */
export function parseSpellRangeText  (range, area) {
    var newRangeDropdown = "",
    tempRange = 0,
    tempMatches,
    tempMatches2,
    useOrigRangeText = false,
    flatRange = -1,
    areaRange,
    newRangeText = "";
    //TAS.debug("at parseSpellRangeText: range:"+range+", area:"+area);
    try {
        if (!range) {
            //if range is blank, use the number in area/effect/targets since it will be "30ft emanation" or something similar
            if (!area) {
                return {
                    "dropdown": "blank",
                    "useorig": false,
                    "rangetext": "",
                    "number": 0
                };
            }
            areaRange = parseSpellRangeText(area, null);
            if (areaRange.dropdown === "unknownrange") {
                areaRange.dropdown = "blank";
            }
            if (!(areaRange.dropdown === "number" || areaRange.dropdown === "perlevel")) {
                areaRange.useorig = false;
                areaRange.rangetext = "";
            }
            return areaRange;
        }
        //begin
        range = range.toLowerCase();
        //if unlimited use area/target field
        if (!newRangeDropdown && range === "unlimited") {
            areaRange = parseSpellRangeText(area, null);
            if (areaRange.dropdown === "unknownrange") {
                newRangeDropdown = "blank";
            } else {
                newRangeDropdown = areaRange.dropdown;
                if (!/short|medium|long/.test(newRangeDropdown)) {
                    useOrigRangeText = areaRange.useorig;
                    if (useOrigRangeText && areaRange.rangetext) {
                        range = areaRange.rangetext;
                    }
                }
            }
        }
        if (!newRangeDropdown) {
            //and or or - use the value after and/or if there is one, and keep rangetext
            tempMatches = range.match(/(.*?)\s+(or|and)\s+/);
            if (tempMatches && tempMatches[1]) {
                areaRange = parseSpellRangeText(range.substring(tempMatches[0].length), null);
                if (areaRange && (!(areaRange.dropdown === "unknownrange" || areaRange.dropdown === "blank"))) {
                    newRangeDropdown = areaRange.dropdown;
                    if (areaRange.rangetext) {
                        //If second value is a flat number or per level
                        // then move it BEFORE the and/or so parseInt on rangetext works.
                        if (newRangeDropdown === "number") {
                            if (areaRange.rangetext) {
                                range = areaRange.rangetext + " " + tempMatches[2] + " " + tempMatches[1];
                            } else {
                                range = areaRange.number + " ft. " + tempMatches[2] + " " + tempMatches[1];
                            }
                        } else if (newRangeDropdown === "perlevel") {
                            //must add /level when it is and/or but otherwise not.
                            if (areaRange.rangetext) {
                                range = areaRange.rangetext + "/level " + tempMatches[2] + " " + tempMatches[1];
                            } else {
                                range = areaRange.number + "ft. /level  " + tempMatches[2] + " " + tempMatches[1];
                            }
                        } else {
                            range = tempMatches[1] + " " + tempMatches[2] + " " + areaRange.rangetext;
                        }
                    }
                    useOrigRangeText = true;
                }
            }
        }
        if (!newRangeDropdown) {
            if (range === "you") {
                newRangeDropdown = "personal";
            } else {
                tempMatches = range.match(/close|short|medium|long|touch|see text|personal|special|\/level/);
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
                            newRangeDropdown = "close";
                            break;
                        case 'special':
                            newRangeDropdown = "see_text";
                            break;
                        case '/level':
                            tempMatches2 = range.match(/(\d+)(\D*)\/level/);
                            if (tempMatches2 && tempMatches2[1]) {
                                tempRange = parseInt(tempMatches2[1], 10) || 0;
                                range = tempMatches2[1] + (tempMatches2[2] || "");
                                useOrigRangeText = true;
                                newRangeDropdown = "perlevel";
                                flatRange = tempRange;
                            }
                            break;
                    }
                }
            }
        }
        if (!newRangeDropdown) {
            //number in front usually emanation, line, cone, etc
            tempRange = parseInt(range, 10);
            if (!isNaN(tempRange) && tempRange > 0) {
                newRangeDropdown = "number";
                flatRange = tempRange;
                useOrigRangeText = true;
            } else {
                //number in middle after "more than" or "within"
                tempMatches2 = range.match(/within\s|more\sthan\s/);
                if (tempMatches2 && tempMatches2[0]) {
                    range = range.substring(tempMatches2[0].index + tempMatches2[0].length);
                    tempRange = parseInt(range, 10);
                    if (!isNaN(tempRange) && tempRange > 0) {
                        newRangeDropdown = "number";
                        flatRange = tempRange;
                        useOrigRangeText = true;
                    }
                }
            }
        }
        if (!newRangeDropdown && area) {
            //give up , retry using the text in area/target/effect
            areaRange = parseSpellRangeText(area, null);
            newRangeDropdown = areaRange.dropdown;
            if (newRangeDropdown === "number" || newRangeDropdown === "perlevel") {
                useOrigRangeText = true;
                range = areaRange.rangetext;
            }
        }
    } catch (errorParsing) {
        TAS.error("parseSpellRangeText, error", errorParsing);
        newRangeDropdown = "unknownrange";
        useOrigRangeText = true;
    }
    if (!newRangeDropdown) {
        newRangeDropdown = "unknownrange";
        useOrigRangeText = true;
    }
    if (useOrigRangeText === true) {
        if (newRangeDropdown !== "unknownrange") {
            //erase everything in parenthesis - also ltrim and rtrim
            newRangeText = range.replace(/\s*\(.*?\)/, '').replace(/^\s+/, '').replace(/\s+$/, '').replace('feet', 'ft.');
        } else {
            newRangeText = range;
        }
    }
    return {
        "dropdown": newRangeDropdown,
        "useorig": useOrigRangeText,
        "number": flatRange,
        "rangetext": newRangeText
    };
}

export function replaceMissingNegatives_BadDice (str){
    //match still returns even if 3rd plus missing
    if (PFConst.findBadNegDice.test(str)){
        return str.replace(PFConst.findBadNegDice, '$1d$2-$3');
    }
    return str;
}
export function replaceMissingNegatives_CritRange (str){
    return str.replace(PFConst.findBadCritRange, '$1-20')
}
export function convertDashToMinus(str){
    return str.replace(PFConst.dashtominusreg,'-');
}

/** parseCost gets cost in gp
 * @param {string} str the string containing the cost: 35gp, 20sp, etc
 * @returns {int} cost in gp.
 */
export function getCostInGP  (str){
    var temp=0,
    matches = str.match(/(\d+)/);
    TAS.debug("PFUtil.getCostInGP: parsing:"+str+", match on number:",matches);
    if (matches) {
        temp = parseInt(matches[1],10)||0;
        matches = str.match(/(gp|cp|sp|pp)/i);
        TAS.debug("PFUtil.getCostInGP: parsing:"+str+", match on coins:",matches);
        if (matches){
            switch(matches[1]){
                case 'pp':
                    temp = temp*10;
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
export function getIntFromString(str,cleanedup,atStart){
    var temp=0, matches;
    if (!cleanedup){
        str = replaceMissingNegatives_CritRange(str);
        str = convertDashToMinus(str);
    }
    if (!atStart){
        matches = str.match(/[\+\-]{0,1}\d+/);
    } else {
        matches = str.match(/^[\+\-]{0,1}\d+/);
    }
    if (matches) {
        temp = parseInt(matches[0],10)||0;
    }
    return temp;
}
/**Returns object of a crit string as mapped ints as: crit:minimum threat range (def 20), critmult: how much by which to multiply dice (def 2)
 * spaces: number of spaces string took
 * @param {string} str the string that should have /19-20x2 or x2 in it.
 * @param {boolean} cleanedup if replaceMissingNegatives_CritRange already called on string
 * @returns {{'crit':number,'critmult':number,'spaces':number}}
 */
export function getCritFromString (str,cleanedup){
    var ret={'crit':20,'critmult':2,'spaces':0},matches;
    if (!cleanedup){
        str = convertDashToMinus(str);
        str = replaceMissingNegatives_CritRange(str);
    }
    ret.critmult=2;
    if ((matches = PFConst.critreg.exec(str))!==null){
        ret.crit = parseInt(matches[1],10);
        if (matches[2]){
            ret.critmult=parseInt(matches[2],10);
        }
        ret.spaces =matches[0].length;
    } else if ( ( matches = PFConst.critmultreg.exec(str)) !== null){
        ret.critmult= parseInt(matches[1],10);
        ret.spaces =matches[0].length;
    }
    return ret;
}
/**Returns object of a dice string as mapped ints: dice:# of dice, die:# of sides, plus: plus or minus to roll, spaces:length of string found
 * @param {string} str the string that should have xdy+z in it.
 * @param {boolean} cleanedup if replaceMissingNegatives_BadDice already called on string
 * @param {boolean} atStart if true only look for dice at start of str
 * @returns {{'dice':number,'die':number,'plus':number,'spaces':number}}
 */
export function getDiceDieFromString (str,cleanedup,atStart){
    var matches,ret={'dice':0,'die':0,'plus':0,'spaces':0},sign=1;
    if (!str){return ret;}
    if (!cleanedup){
        str = replaceMissingNegatives_BadDice(str);
        str = convertDashToMinus(str);
    }
    matches =  str.match(PFConst.diceDiereg);//  PFConst.diceDiereg.exec(str);
    if (matches){
        if (!atStart || matches.index===0){
            ret.spaces = matches[0].length + matches.index;
            ret.dice=parseInt(matches[1],10)||0;
            ret.die=parseInt(matches[2],10)||0;
            if (matches[3] && matches[3] === '-'){
                sign=-1;
            }
            if (matches[4]){
                ret.plus = sign * (parseInt(matches[4],10)||0);
            }
        }
    }
    TAS.debug("x1  at getDiceDieFromString parsing "+str,matches,ret);
    return ret;
}
/**replaceDiceDieString puts inline roll brackets [[ ]] around 'xdy +z' dice strings (z exists or not)
 *@param {string} str a string which includes a diceroll substring xdy or xdy +/-z
 *@returns {string} same string with brackets around dice roll
 */
export function replaceDiceDieString  (str) {
    var tempstr = "",tempstrs;
    str = replaceMissingNegatives_BadDice(str);
    return str.replace(PFConst.diceDieregOneGroup,'[[ $1 ]]');
}
/* like replaceDiceDieString but instead of replacing returns the first dice match with [[ ]] around it.
 *@param {string} str a string which includes a diceroll substring xdy or xdy +/-z
 *@returns {string} brackets around dice roll or ""
 */
export function getDiceDieString (str){
    var  matches;
    str = replaceMissingNegatives_BadDice(str);
    matches= PFConst.diceDieregOneGroup.exec(str);
    if(matches){
        return "[[ "+ matches[0] + " ]]";
    }
    return "";
}

export function getSpecialAbilityTypeFromString (str){
    var ret='',matches;
    if(!str){return '';}
    matches = (/\b(Su|Ex|Sp)\b/i).exec(str);
    if (matches){
        return matches[1][0].toUpperCase()+matches[1][2].toLowerCase();
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
export function removeUptoFirstComma  (str, putOutside) {
    var parensplit,
    commasplit,
    retstr,
    i;
    if (str.indexOf('(') < 0 || str.indexOf(',') < 0) {
        return str;
    }
    parensplit = str.split(/\s*\(\s*/);
    if (parensplit.length>1){
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
export function getDCString  (ability, levelAttr, isUndead, miscBonus, doNotDivideByTwo) {
    var tempstr = '', pre = 'floor(', post = '/2)';

    tempstr = "DC [[ 10 ";
    if (ability) {
        if (isUndead && ability === 'CON') {
            ability = 'CHA';
        }
        tempstr += "+ @{" + ability + "-mod} ";
    }
    if (levelAttr) {
        if (doNotDivideByTwo) {
            pre = ''; post = '';
        } else {
            tempstr += "+ " + pre + "@{" + levelAttr + "}" + post + " ";
        }
    }
    if(miscBonus) {
        tempstr +=  "+ " + miscBonus ;
    }
    tempstr += " ]]";

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
export function replaceDCString  (str, ability, levelAttr, isUndead, levelFlatNum, doNotDivideByTwo) {
    var tempstr = '', matches,pre='',post='', retstr=str,rawDC=10;
    try {
        matches = str.match(/D[Cc]\s*\d+/);
        if (matches){
            tempstr =matches[0].match(/\d+/);
            rawDC=parseInt(tempstr,10)||0;
            tempstr = getDCString(ability, levelAttr, isUndead, levelFlatNum, doNotDivideByTwo);
            pre= str.slice(0, matches.index)||'';
            post = str.slice(matches.index + matches[0].length)||'';
            retstr=pre + tempstr + post;
        }
    } catch(er) {
        TAS.error("at replaceDCString, cannot find DC string in "+ str,er);
    } finally {
        return retstr;
    }
}
/** returns rest of string after number
 *@param {string} str the string
 *@returns {string} rest of string after finding a number.
 */
export function getNoteAfterNumber  (str) {
    var match;
    if(str){
        match = str.match(/\d+/);
        if(match){
            str = SWUtils.trimBoth(str.slice( match.index+match.length ));
        }
    }
    return str;
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
export function getCompendiumFunctionSet  (prefix,field,methodToCall,v,setter,setField){
    var temp=0,
        attr=v[prefix+field+'_compendium'];
    setter=setter||{};
    TAS.debug("PFUtils.getCompendiumFunctionSet getting " +prefix+field+"_compendium, val: "+attr);
    if (attr){
        temp= methodToCall(attr);
        TAS.debug("on return value is:"+temp);
        if (temp) {
            setField=setField||field;
            TAS.debug("setting "+prefix+field+" with value "+ temp);
            setter[prefix+setField]= temp;
        }
    }
    return setter;
}
/**gets int value 'field_compendium' from v, then sets in 'field':
 *   setter[<prefix>(<setField>|<field>)] = getIntFromString(v[<prefix><field>_compendium])
 *@param {string} prefix the repeating_section_id_  string
 *@param {string} field the name of compendium field , must have _compendium at end. Without '_compendium' this is the write field
 *@param {Map<string,any>} v the values returned from getAttrs
 *@param {Map<string,any>} setter to pass to SWUtils.setWrapper
 *@param {string} setField optional if the attr to write to is not 'field' it will be prefix+setField
 */
export function getCompendiumIntSet  (prefix,field,v,setter,setField){
    var tempInt=0,attr;
    try {
        attr=v[prefix+field+'_compendium'];
        if (attr){
            tempInt= getIntFromString(attr);
            //TAS.debug("get int field:"+field+", val="+attr+", int:"+tempInt);
            if (tempInt) {
                setField=setField||field;
                setter[prefix+field]= tempInt;
            }
        }
    } catch (err){
        TAS.error("getCompendiumIntSet error on :"+prefix+", field:" +field + ", setField:"+setField,err);
    } finally {
        return setter;
    }
}

export function removeWhisperFromMacro (macrostr){
    var matches;
    if(!macrostr) {return macrostr;}
    //use hisper since some have capital W others not
    matches = macrostr.match(/whisper\}/i);
    if(matches){
        return SWUtils.trimBoth(macrostr.slice(matches.index+matches[0].length));
    }
    return macrostr;
}


//PFConsole.log( '   PFUtils module loaded          ');
//PFLog.modulecount++;
