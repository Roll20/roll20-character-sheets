'use strict';
import _ from 'underscore';
import TAS from './TheAaronSheet.js';
import {PFLog, PFConsole} from './PFLog';
import PFConst from './PFConst';
import * as SWUtils from './SWUtils';
import * as PFUtils from './PFUtils';
import * as PFUtilsAsync from './PFUtilsAsync';
import * as PFMigrate from './PFMigrate';
import * as PFSpells from './PFSpells';

//the 3 spell classes at top of spells page

/**  returns whether a base spell level is filled in or not
 *@param {int} spellclassidx 0,1,2 sellcasting class
 *@param {function} callback - to call if exists
 *@param {function} noExistCallback - to call if not exists
 */
export function ifSpellClassExists (spellclassidx, callback, noExistCallback) {
    getAttrs(["use_spells","spellclass-" + spellclassidx + "-exists"], function (v) {
        try {
            if (! parseInt(v.use_spells,10)){
                if (typeof noExistCallback === "function") {
                    noExistCallback();
                }
            } else if (parseInt(v["spellclass-" + spellclassidx + "-exists"],10)) {
                if (typeof callback === "function") {
                    callback();
                }
            } else {
                if (typeof noExistCallback === "function") {
                    noExistCallback();
                }
            }
        } catch (err) {
            TAS.error("PFSpellCasterClasses.ifSpellClassExists", err);
            if (typeof noExistCallback === "function") {
                noExistCallback();
            }
        }
    });
}

/**  sets {spellclasses_multiclassed} to 1 if more than one spellclass-X-exists is 1
 *@param {nothing} dummy - only here so eventhandlers can call it, since spellclass index is in this position.
 *@param {eventinfo} eventInfo  unused eventinfo from 'on' method
 */
export function updateMultiClassedCasterFlag (dummy, eventInfo, callback) {
    var done=_.once(function(){
        //TAS.debug("leaving updateMultiClassedCasterFlag");
        if (typeof callback === "function"){
            callback();
        }
    });
    getAttrs(["spellclass-0-exists", "spellclass-1-exists", "spellclass-2-exists"], function (v) {
        var multiclassed = parseInt(v["spellclasses_multiclassed"], 10) || 0, setter={};
        if (((parseInt(v["spellclass-0-exists"], 10) || 0) + (parseInt(v["spellclass-1-exists"], 10) || 0) + (parseInt(v["spellclass-2-exists"], 10) || 0)) > 1) {
            if (!multiclassed) {
                setter.spellclasses_multiclassed= 1;
            }
        } else if (multiclassed) {
            setter.spellclasses_multiclassed= 0;
        }
        if(_.size(setter)>0){
            SWUtils.setWrapper(setter,PFConst.silentParams,done);
        } else {
            done();
        }
    });
}

function updateAllSpellMenu (callback, eventInfo){
    getAttrs(['spellclass-0-exists','spellclass-1-exists','spellclass-2-exists',
        'spellclass-0-name','spellclass-1-name','spellclass-2-name','allspells_macro','NPC-allspells_macro'],function(v){
        var macroStr='',npcMacroStr='',tempStr='';
        if(parseInt(v['spellclass-0-exists'],10)){
            tempStr = "{{row10=[" + SWUtils.escapeForChatLinkButton(v['spellclass-0-name']) + " ^{spellbook}](~@{character_id}|";
            macroStr += tempStr + "spellbook-0) }} ";
            npcMacroStr += tempStr + "NPC-spellbook-0) }} ";
        }
        if(parseInt(v['spellclass-1-exists'],10)){
            tempStr = "{{row11=[" + SWUtils.escapeForChatLinkButton(v['spellclass-1-name']) + " ^{spellbook}](~@{character_id}|";
            macroStr += tempStr + "spellbook-1) }} ";
            npcMacroStr += tempStr + "NPC-spellbook-1) }} ";
        }
        if(parseInt(v['spellclass-2-exists'],10)){
            tempStr = "{{row12=[" + SWUtils.escapeForChatLinkButton(v['spellclass-2-name']) + " ^{spellbook}](~@{character_id}|";
            macroStr += tempStr + "spellbook-2) }} ";
            npcMacroStr += tempStr + "NPC-spellbook-2) }} ";
        }
        if(macroStr !== v.allspells_macro){
            SWUtils.setWrapper({'allspells_macro':macroStr,'NPC-allspells_macro':npcMacroStr},PFConst.silentParams,callback);
        } else if (typeof callback === "function") {
			callback();
		}
    });
}

/** updates the ranges at the top for this spellcasting class
 *@param {int} spellclassidx 0,1,2 the spell casting tab
 *@param {eventinfo} eventInfo unused eventinfo from 'on' method
 *@param {bool} force if true update no matter if new ranges are same or not.
 *@param {function} callback - to call when done.
 *@param {bool} silently if true update with PFConst.silentParams
 */
function updateCasterRanges (spellclassidx, eventInfo, force, callback, silently) {
    var done = function () {
        if (typeof callback === "function") {
            callback();
        }
    },
    prefix = "spellclass-" + spellclassidx,
    lvlField = prefix + "-level-total",
    closeField = prefix + "-close",
    medField = prefix + "-medium",
    longField = prefix + "-long";
    getAttrs(["use_metrics", lvlField, closeField, medField, longField], function (v) {
        var use_metrics = parseInt(v["use_metrics"]) || 0,
        level = parseInt(v[lvlField], 10) || 0,
        closeRng = parseInt(v[closeField], 10) || 0,
        medRng = parseInt(v[medField], 10) || 0,
        longRng = parseInt(v[longField], 10) || 0,
        ranges = {},
        setter = {},
        params = {};
        try {
            ranges = PFUtils.calculateSpellRanges(level, use_metrics);
            if (force || ranges.close !== closeRng || ranges.medium !== medRng || ranges["long"] !== longRng) {
                setter[closeField] = ranges.close;
                setter[medField] = ranges.medium;
                setter[longField] = ranges["long"];
            }
        } catch (err) {
            TAS.error("PFSpellCasterClasses.updateCasterRanges", err);
        } finally {
            if (_.size(setter) > 0) {
                if (silently) {
                    params = PFConst.silentParams;
                }
                SWUtils.setWrapper(setter, params, done);
            } else {
                done();
            }
        }
    });
}
/** updateConcentration - updates concentration for spellclass
 *@param {int} classidx 0,1,2 the spellclass
 *@param {eventinfo} eventInfo unused eventinfo from 'on' method
 *@param {function} callback - to call when done.
 *@param {bool} silently if true update with PFConst.silentParams
 */
function updateConcentration (classidx, eventInfo, callback, silently) {
    //TAS.debug("at PFSpellCasterClasses.updateConcentration");
    SWUtils.updateRowTotal(["Concentration-" + classidx, "spellclass-" + classidx + "-level-total", "Concentration-" + classidx + "-mod", "Concentration-" + classidx + "-misc-mod"], 0, null, false, callback, silently);
}

/*********************************** SPELLS PER DAY section *************************************/
/** updateSaveDCs - update save DCs on left  column of Spells Per Day grid
 *@param {int} classidx 0,1,2 the spellclass
 *@param {eventinfo} eventInfo unused eventinfo from 'on' method
 *@param {function} callback - to call when done.
 *@param {bool} silently if true update with PFConst.silentParams
 */
function updateSaveDCs (classidx, eventInfo, callback, silently) {
    var done = _.once(function () {
        if (typeof callback === "function") {
            callback();
        }
    });
    getAttrs(["use_spells", "spellclass-"+classidx+"-exists", "Concentration-" + classidx + "-ability", "Concentration-" + classidx + "-mod", "spellclass-" + classidx + "-level-0-savedc", "spellclass-" + classidx + "-savedc-misc", "buff_SpellDC_" + classidx + "-total"], function (v) {
        var mod = parseInt(v["Concentration-" + classidx + "-mod"], 10) || 0,
        dcMisc = parseInt(v["spellclass-" + classidx + "-savedc-misc"], 10) || 0,
        dcBuff = parseInt(v["buff_SpellDC_" + classidx + "-total"], 10) || 0,
        dcMod = dcMisc + dcBuff,
        currAbility = v["Concentration-" + classidx + "-ability"],
        dcLvlZero = 10 + mod + dcMod,
        currDC = parseInt(v["spellclass-" + classidx + "-level-0-savedc"], 10) || 0,
        setter = {},
        params = {},
        i;
        try {
            //if 0 is different then rest are different. if 0 is same, rest are same.
            if (currDC !== dcLvlZero || isNaN(currDC) || currAbility !== 0) {
                setter["spellclass-" + classidx + "-level-0-savedc"] = dcLvlZero;
                for (i = 1; i < 10; i++) {
                    setter["spellclass-" + classidx + "-level-" + i + "-savedc"] = dcLvlZero + i;
                }
            }
        } catch (err) {
            TAS.error("PFSpellCasterClasses.updateSaveDCs", err);
        } finally {
            if (_.size(setter) > 0) {
                if (silently) {
                    params = PFConst.silentParams;
                }
                SWUtils.setWrapper(setter, params, done);
            } else {
                done();
            }
        }
    });
}

/** updateBonusSpells - updates Bonus Spells for the class
 * Uses attribute, not the attribute-mod. So it does not change with ability damage or penalties.
 *@param {number} classidx 0,1,2 the spellclass
 *@param {eventinfo} eventInfo unused eventinfo from 'on' method
 *@param {function} callback - to call when done.
 *@param {bool} silently if true update with PFConst.silentParams
 */
function updateBonusSpells (classidx, eventInfo, callback, silently) {
    var done = _.once(function () {
        if (typeof callback === "function") {
            callback();
        }
    }),
    conAbility = "Concentration-" + classidx + "-ability";
    getAttrs([conAbility, "INT", "WIS", "CHA", "STR", "DEX", "CON",
    "spellclass-" + classidx + "-level-0-bonus",
    "spellclass-" + classidx + "-level-1-bonus","spellclass-" + classidx + "-level-2-bonus",
    "spellclass-" + classidx + "-level-3-bonus","spellclass-" + classidx + "-level-4-bonus",
    "spellclass-" + classidx + "-level-5-bonus","spellclass-" + classidx + "-level-6-bonus",
    "spellclass-" + classidx + "-level-7-bonus","spellclass-" + classidx + "-level-8-bonus",
    "spellclass-" + classidx + "-level-9-bonus" ], function (v) {
        //eliminate the modifier, we just want @{INT} not @{INT-mod}
        var abilityName = PFUtils.findAbilityInString(v[conAbility]).replace("-mod", ""),
        abilityVal = parseInt(v[abilityName], 10),
        setter = {},
        params = {
            silent: true
        },
        bonusSpells,
        bonusName,
        i,
        prefix = "spellclass-" + classidx + "-level-";
        try {
            if (!isNaN(abilityVal)) {
                if (abilityVal >= 12) {
                    for (i = 1; i < 10; i++) {
                        bonusSpells = Math.floor(Math.max(Math.floor((abilityVal - 10) / 2) + 4 - i, 0) / 4);
                        bonusName = prefix + i + "-bonus";
                        if ((parseInt(v[bonusName],10))!==bonusSpells){
                            setter[bonusName] = bonusSpells;
                        }
                    }
                } else {
                    for (i = 1; i < 10; i++) {
                        bonusName = prefix + i + "-bonus";
                        if((parseInt(v[bonusName],10))!==0){
                            setter[bonusName] = 0;
                        }
                    }
                }
            }
        } catch (err) {
            TAS.error("PFSpellCasterClasses.updateBonusSpells", err);
        } finally {
            if (_.size(setter) > 0) {
                SWUtils.setWrapper(setter, params, done);
            } else {
                done();
            }
        }
    });
}

/** updates max spells per day for a given class. ALWAYS SILENT
 *
 * @param {*} classidx
 * @param {*} spelllvl
 * @param {*} callback
 * @param {*} silently
 */
function updateMaxSpellsPerDay (classidx, spelllvl, callback, silently) {
    var done = _.once(function(){
        if (typeof callback === "function"){
            callback();
        }
    });
    getAttrs(["spellclass-" + classidx + "-level-" + spelllvl + "-spells-per-day_max","spellclass-" + classidx + "-level-" + spelllvl + "-class",
        "spellclass-" + classidx + "-level-" + spelllvl + "-bonus", "spellclass-" + classidx + "-level-" + spelllvl + "-misc"], function(v){
        var newCount=0,base =0, rest=0,total=0,curr=0,setter={};
        try {
            base = parseInt(v["spellclass-" + classidx + "-level-" + spelllvl + "-class"],10);
            curr =  parseInt(v["spellclass-" + classidx + "-level-" + spelllvl + "-spells-per-day_max"],10)||0;
            if(isNaN(base)){
                newCount=0;
            } else {
                rest = (parseInt(v["spellclass-" + classidx + "-level-" + spelllvl + "-bonus"],10)||0) +
                    (parseInt(v["spellclass-" + classidx + "-level-" + spelllvl + "-misc"],10)||0);
                newCount = base + rest;
            }
            if (newCount !== curr){
                setter["spellclass-" + classidx + "-level-" + spelllvl + "-spells-per-day_max"]=newCount;
                SWUtils.setWrapper(setter,PFConst.silentParams,done);
            } else {
                done();
            }
        } catch(err){
            TAS.error("PFSpellCasterClasses.updateMaxSpellsPerDay err",err);
            done();
        }
    });
    //SWUtils.updateRowTotal(["spellclass-" + classidx + "-level-" + spelllvl + "-spells-per-day_max", "spellclass-" + classidx + "-level-" + spelllvl + "-class", "spellclass-" + classidx + "-level-" + spelllvl + "-bonus", "spellclass-" + classidx + "-level-" + spelllvl + "-misc"], 0, [], false, callback, silently);
}

/**  applyConditions - for condition deafened update {SpellFailureNote} on DEFENSE PAGE
 * note drain should have already been applied
 *@param {function} callback - to call when done.
 *@param {bool} silently if true update with PFConst.silentParams
 */
export function applyConditions (callback, silently) {
    var done = _.once(function () {
        if (typeof callback === "function") {
            callback();
        }
    });
    //TAS.debug("at PFSpellCasterClasses.applyConditions");
    getAttrs(["condition_spell_notes", "condition-Deafened", "condition-Grappled", "condition-Pinned"], function (v) {
        var setter = {}, spellNote='';
        if (parseInt(v["condition-Deafened"],10)) {
            spellNote+='**'+SWUtils.getTranslated('deafened')+'**: ';
            spellNote+=SWUtils.getTranslated('condition-deafened-spellonly')+'\r\n';
        }
        if (parseInt(v["condition-Grappled"],10)) {
            spellNote+='**'+SWUtils.getTranslated('grappled')+'**: ';
            spellNote+=SWUtils.getTranslated('condition-grappled-spell-note')+'\r\n';
        }
        if (parseInt(v["condition-Pinned"],10)){
            spellNote+='**'+SWUtils.getTranslated('pinned')+'**: ';
            spellNote+=SWUtils.getTranslated('condition-pinned-spell-note')+' ';
            spellNote+=SWUtils.getTranslated('condition-grappled-spell-note')+'\r\n';
        }
        if(spellNote!==v.condition_spell_notes){
            setter['condition_spell_notes'] = spellNote;
            SWUtils.setWrapper(setter,PFConst.silentParams);
        }
        done();
    });
}

function recalcOneClass (spellClassIdx, callback, silently) {
    var done = _.once(function () {
        //TAS.debug("leaving PFSpells.recalculate.recalcOneClass");
        if (typeof callback === "function") {
            callback();
        }
    }),
    doneOne = _.after(5, done),
    doneOneLevel = _.after(10,doneOne);

    //TAS.debug("at PFSpellCasterClasses.recalcOneClass");
    _.times(10,function(spelllvl){
        updateMaxSpellsPerDay(spellClassIdx,spelllvl,doneOneLevel,silently);
    });

    updateConcentration(spellClassIdx, null, doneOne, silently);
    updateSaveDCs(spellClassIdx, null, doneOne, silently);
    updateCasterRanges(spellClassIdx, null, false, doneOne, silently);
    updateBonusSpells(spellClassIdx, null, doneOne, silently);
}

/** updates {spellclass-X-level-total}, sets minimum of 1 if {spellclass-X-level} is > 0
 *@param {int} spellclassidx 0,1,2 the spell casting tab
 *@param {eventInfo} eventInfo unused eventinfo from 'on' method
 *@param {int} classlevel optional override for class level, use this if you know it and sheet attribute might not be updated yet.
 *@param {function} callback - to call when done.
 *@param {bool} silently if true update with PFConst.silentParams
 */
function updateCasterLevel (spellclassidx, eventInfo, classlevel, callback, silently, forceRecalc) {
    var done = _.once(function () {
        //TAS.debug("leaving updateCasterLevel " + spellclassidx);
        if (typeof callback === "function") {
            callback();
        }
    });
    getAttrs(["use_spells","spellclass-" + spellclassidx + "-level", "spellclass-" + spellclassidx + "-level-total", "spellclass-" + spellclassidx + "-level-misc-mod", "buff_CasterLevel-total", "CasterLevel-Penalty", "spellclass-" + spellclassidx + "-exists"], function (v) {
        var baseLevel = classlevel || parseInt(v["spellclass-" + spellclassidx + "-level"], 10) || 0,
        totalLevel = parseInt(v["spellclass-" + spellclassidx + "-level-total"], 10) || 0,
        spellClassExists = parseInt(v["spellclass-" + spellclassidx + "-exists"], 10) || 0,
        usesSpells = parseInt(v["use_spells"],10)||0,
        casterlevel = 0,
        setter = {},
        recalcAfter=0,
        params = {};
        try {
            if(usesSpells){
                casterlevel = baseLevel + (parseInt(v["spellclass-" + spellclassidx + "-level-misc-mod"], 10) || 0) + (parseInt(v["buff_CasterLevel-total"], 10) || 0) + (parseInt(v["CasterLevel-Penalty"], 10) || 0);
                //if has spells then minimum level is 1 no matter what minuses apply
                if (casterlevel <= 0) {
                    if (baseLevel > 0) {
                        casterlevel = 1;
                    } else {
                        casterlevel = 0;
                    }
                }
                if (casterlevel !== totalLevel) {
                    setter["spellclass-" + spellclassidx + "-level-total"] = casterlevel;
                    if(baseLevel >0){
                        recalcAfter=1;
                    }
                }
                if (baseLevel > 0) {
                    if (spellClassExists === 0) {
                        setter["spellclass-" + spellclassidx + "-exists"] = 1;
                        recalcAfter=1;
                    }
                    if(forceRecalc){
                        recalcAfter=1;
                    }
                } else if (spellClassExists === 1) {
                    setter["spellclass-" + spellclassidx + "-exists"] = 0;
                }
            } else if (spellClassExists === 1) {
                setter["spellclass-" + spellclassidx + "-exists"] = 0;
            }
        } catch (err) {
            TAS.error("PFSpellCasterClasses.updateCasterLevel", err);
        } finally {
            if (_.size(setter) > 0) {
                if (silently) {
                    params = PFConst.silentParams;
                }
                SWUtils.setWrapper(setter, params, function(){
                    if (recalcAfter){
                        recalcOneClass(spellclassidx,done,silently);
                    } else {
                        done();
                    }
                });
            } else {
                done();
            }
        }
    });
}

/** updates all 3 caster class levels, usually due to change in buffs or debuffs
 *@param {nothing} dummy - only here so eventhandlers can call it, since spellclass index is in this position.
 *@param {eventinfo} eventInfo unused eventinfo from 'on' method
 *@param {function} callback - to call when done.
 *@param {bool} silently if true update with PFConst.silentParams
 */
function updateCasterLevels (dummy, eventInfo, callback, silently) {
    updateCasterLevel(0, eventInfo, 0, callback, silently);
    updateCasterLevel(1, eventInfo, 0, callback, silently);
    updateCasterLevel(2, eventInfo, 0, callback, silently);
}

/** sets {spellclass-X-name} and {spellclass-X-level} from the class dropdown {spellclass-X}
 *@param {int} spellclassidx 0,1,2 the spell casting tab
 *@param {eventinfo} eventInfo unused eventinfo from 'on' method
 *@param {function} callback - to call when done.
 *@param {bool} silently if true update with PFConst.silentParams
 * called when the class dropdown is changed.
 */
export function setCasterClassFromDropdown (spellclassidx, eventInfo, callback, silently) {
    var done = _.once(function () {
        if (typeof callback === "function") {
            callback();
        }
    }),
    spellclassdropdown = "spellclass-" + spellclassidx,
    spellclasslevel = "spellclass-" + spellclassidx + "-level";
    getAttrs([spellclassdropdown, spellclasslevel], function (va) {
        var classidx = parseInt(va[spellclassdropdown], 10),
        currClassLevel = parseInt(va[spellclasslevel], 10),
        spellclassname,
        classname,
        classlevel;
        try {
            if (isNaN(classidx) || !va[spellclassdropdown] || parseInt(va[spellclassdropdown],10) === -1) {
                done();
                return;
            }
            spellclassname = "spellclass-" + spellclassidx + "-name";
            classname = "class-" + classidx + "-name";
            classlevel = "class-" + classidx + "-level";
            //if race indicated: use race and HD
            if (classidx === 6) {
                classname = "race";
                classlevel = "npc-hd-num";
            }
            getAttrs([classname, classlevel, spellclassname], function (v) {
                var setter = {},
                setAny = 0,
                updateLevel = 0,
                newClassLevel = parseInt(v[classlevel], 10) || 0;
                try {
                    if (currClassLevel !== newClassLevel || isNaN(currClassLevel)) {
                        setter[spellclasslevel] = newClassLevel;
                        updateLevel = 1;
                    }
                    if (v[classname] && v[classname] !== v[spellclassname]) {
                        setter[spellclassname] = v[classname];
                    }

                } catch (err) {
                    TAS.error("PFSpellCasterClasses.setCasterClassFromDropdown", err);
                } finally {
                    if (_.size(setter) > 0) {
                        SWUtils.setWrapper(setter, {
                            silent: true
                        }, done);
                        if (updateLevel) {
                            updateCasterLevel(spellclassidx, eventInfo, newClassLevel);
                        }
                    } else {
                        done();
                    }
                }
            });
        } catch (errOuter) {
            TAS.error("PFSpellCasterClasses.setCasterClassFromDropdown outer", errOuter);
            done();
        }
    });
}

/** update level on SPELL page when updated on CLASS page, but not vice versa
 *@param {eventinfo} eventInfo unused eventinfo from 'on' method
 *@param {bool} force if true update no matter if new ranges are same or not.
 *@param {function} callback - to call when done.
 *@param {bool} silently if true update with PFConst.silentParams
 *@param {int} classidx 0..6 the row on the CLASS GRID starting with 0 to grab level from, or 6 if {npc-hd-num}
 */
export function updateCasterFromClassLevel (classidx, eventInfo, force, callback, silently) {
    var done = _.once(function () {
        if (typeof callback === "function") {
            callback();
        }
    }),
    spellclassdropdown0 = "spellclass-0",
    spellclassdropdown1 = "spellclass-1",
    spellclassdropdown2 = "spellclass-2";
    if (classidx === "npc-hd-num") {
        classidx = 6;
    } else {
        classidx = parseInt(classidx, 10) || 0;
    }
    getAttrs([spellclassdropdown0, spellclassdropdown1, spellclassdropdown2], function (va) {
        var spellclassidx,
        spellclasslevelField,
        classlevelField,
        prefix,
        classNameField;
        if (parseInt(va[spellclassdropdown0], 10) === classidx) {
            spellclassidx = 0;
        } else if (parseInt(va[spellclassdropdown1], 10) === classidx) {
            spellclassidx = 1;
        } else if (parseInt(va[spellclassdropdown2], 10) === classidx) {
            spellclassidx = 2;
        } else {
            return;
        }
        prefix = "spellclass-" + spellclassidx;
        spellclasslevelField = prefix + "-level";
        classlevelField = "class-" + classidx + "-level";
        classNameField = "class-" + classidx + "-name";
        getAttrs([spellclasslevelField, classlevelField, classNameField], function (v) {
            var setter = {},
            newCasterLevel = parseInt(v[classlevelField], 10) || 0,
            currCasterLevel = parseInt(v[spellclasslevelField], 10);
            if (newCasterLevel !== currCasterLevel || isNaN(currCasterLevel) || force) {
                setter[spellclasslevelField] = newCasterLevel;
                setter[prefix + "-name"] = v[classNameField];
                SWUtils.setWrapper(setter, {
                    silent: true
                });
                updateCasterLevel(classidx, eventInfo, newCasterLevel);
            }
        });
    });
}

export function migrate (callback, oldversion){
    if (typeof callback==="function"){
        callback();
    }
}

export var recalculate = TAS.callback(function PFSpellCasterClassesRecalculate(callback, silently, oldversion) {
    var done = _.once(function () {
        TAS.info("leaving PFSpellCasterClasses.recalculate");
        if (typeof callback === "function") {
            callback();
        }
    }),
    recalcTopSection = function (callback, silently) {
        var done = _.once(function () {
            //TAS.debug("leaving PFSpellCasterClasses.recalculate.recalcTopSection");
            if (typeof callback === "function") {
                callback();
            }
        }),
        doneOne = _.after(3, function(){
            updateAllSpellMenu(callback);
        });
        //TAS.debug("at PFSpellCasterClasses.recalculate.recalcTopSection");
        _.each(PFConst.spellClassIndexes, function (spellClassIdx) {
            try {
                setCasterClassFromDropdown(spellClassIdx, null, function () {
                    updateCasterLevel(spellClassIdx, null, 0, doneOne, silently,true);
                    //updateCasterLevel(spellClassIdx, null, 0,function () {
                    //    ifSpellClassExists(spellClassIdx, function () {
                    //        recalcOneClass(spellClassIdx,doneOne,silently);
                    //    }, doneOne);
                    //}, silently);
                }, silently);
            } catch (err) {
                TAS.error("PFSpellCasterClasses.recalculate_recalcTopSection", err);
                doneOne();
            }
        });
    },
    finishAndLeave = _.once(function () {
        updateMultiClassedCasterFlag(null,null,function(){
            PFSpells.recalculate(done, silently, oldversion);
        });
    }),
    callTopSection = _.once(function () {
        recalcTopSection(finishAndLeave, silently);
    }),
    callApplyConditions = _.once(function () {
        applyConditions(callTopSection, silently);
    });
    migrate(function(){
        callApplyConditions();
    },oldversion);
});
var events = {
    // events for updates to top of class page, each one calls isSpellClassExists
    spellcastingClassEventsAuto: {
        "change:concentration-REPLACE-mod": [updateBonusSpells, updateSaveDCs, updateConcentration, PFSpells.updateSpellsCasterAbilityRelated],
        "change:concentration-REPLACE-ability": [updateSaveDCs, PFSpells.updateSpellsCasterAbilityRelated],
        "change:spellclass-REPLACE-level-total": [updateSaveDCs, updateConcentration, updateCasterRanges, PFSpells.updateSpellsCasterLevelRelated],
        "change:concentration-REPLACE-misc-mod": [updateConcentration, PFSpells.updateSpellsCasterLevelRelated],
        "change:spellclass-REPLACE-SP-mod": [PFSpells.updateSpellsCasterLevelRelated],
        "change:spellclass-REPLACE-level-misc-mod": [updateCasterLevel],
        "change:buff_SpellDC_REPLACE-total": [updateSaveDCs, PFSpells.updateSpellsCasterAbilityRelated]
    },
    spellcastingClassEventsPlayer: {
        "change:concentration-REPLACE-def": [PFSpells.updateSpellsCasterLevelRelated],
        "change:spellclass-REPLACE-savedc-misc": [updateSaveDCs, PFSpells.updateSpellsCasterAbilityRelated]
    },
    // events for updates to top of class page even if no spellcasting class exists
    spellcastingClassEventsIgnoreLevel: {
        "change:spellclass-REPLACE": [setCasterClassFromDropdown],
        "change:spellclass-REPLACE-level": [updateCasterLevel, updateMultiClassedCasterFlag],
        "change:buff_CasterLevel-total change:condition-Drained change:CasterLevel-Penalty": [updateCasterLevels]
    },
    //events for updateBonusSpells section CLASSIDX is the 0-2 classes, SPELLLEVEL is 0-9
    spellcastingClassEventsPerSpellLevel: "change:spellclass-CLASSIDX-level-SPELLLEVEL-class change:spellclass-CLASSIDX-level-SPELLLEVEL-bonus change:spellclass-CLASSIDX-level-SPELLLEVEL-misc"
};
function registerEventHandlers () {
    //spellclass section (3 tabs at top of spell page)
    _.each(PFConst.spellClassIndexes, function (spellClassIdx) {
        var numberIdx = parseInt(spellClassIdx, 10) || 0;
        on("change:Concentration-" + numberIdx + "-ability", TAS.callback(function eventChangeSpellDropdown(eventInfo) {
            TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
            PFUtilsAsync.setDropdownValue("Concentration-" + numberIdx + "-ability", "Concentration-" + numberIdx + "-mod");
        }));
        _.each(events.spellcastingClassEventsPlayer, function (functions, event) {
            var eventToWatch = event.replace(/REPLACE/g, numberIdx);
            _.each(functions, function (methodToCall) {
                on(eventToWatch, TAS.callback(function eventSpellcasterClassSpecificUpdatePlayerOnly(eventInfo) {
                    if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
                        TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                        ifSpellClassExists(numberIdx, function () {
                            methodToCall(numberIdx, eventInfo);
                        });
                    }
                }));
            });
        });
        _.each(events.spellcastingClassEventsAuto, function (functions, event) {
            var eventToWatch = event.replace(/REPLACE/g, numberIdx);
            _.each(functions, function (methodToCall) {
                on(eventToWatch, TAS.callback(function eventSpellcasterClassSpecificUpdateAuto(eventInfo) {
                    if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api") {
                        TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                        ifSpellClassExists(numberIdx, function () {
                            methodToCall(numberIdx, eventInfo);
                        });
                    }
                }));
            });
        });
        //ignore level means do not call "ifSpellClassExists" first
        _.each(events.spellcastingClassEventsIgnoreLevel, function (functions, event) {
            var eventToWatch = event.replace(/REPLACE/g, numberIdx);
            _.each(functions, function (methodToCall) {
                on(eventToWatch, TAS.callback(function eventSpellcasterClassUpdate(eventInfo) {
                    TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                    methodToCall(numberIdx, eventInfo);
                }));
            });
        });
        //spells per day
        _.each(PFSpells.spellLevels, function (spellLevel) {
            var spellNumber = parseInt(spellLevel, 10),
            eventToWatch = events.spellcastingClassEventsPerSpellLevel.replace(/CLASSIDX/g, numberIdx).replace(/SPELLLEVEL/g, spellNumber);
            on(eventToWatch, TAS.callback(function eventSpellsPerDay(eventInfo) {
                TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                ifSpellClassExists(numberIdx, function () {
                    updateMaxSpellsPerDay(numberIdx, spellNumber);
                });
            }));
        });
        on("change:spellclass-0-exists change:spellclass-1-exists change:spellclass-2-exists",TAS.callback(function eventSpellClassExists(eventInfo){
            if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api") {
                TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                updateAllSpellMenu(null,eventInfo);
            }
        }));
        //changing the metric option triggers range recalcs
        on('change:use_metrics', TAS.callback(function eventUpdateSpellRanges(eventInfo) {
            if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
                TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                updateCasterRanges(numberIdx, eventInfo, true, null, true);
            }
        }));
    }); //end of spell classes
}
registerEventHandlers();
//PFConsole.log( 'PFSpellCasterClasses module loaded');
//PFLog.modulecount++;
