'use strict';
import _ from 'underscore';
import TAS from './TheAaronSheet.js';
import {PFLog, PFConsole} from './PFLog';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils from './PFUtils';
import * as PFAttacks from './PFAttacks';

export var abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
export var abilitymods = ["STR-mod", "DEX-mod", "CON-mod", "INT-mod", "WIS-mod", "CHA-mod"];
var columnMods = ["-base", "-racial", "-asi", "-enhance", "-inherent", "-misc", "-damage", "-penalty", "-drain", "-mod", "-cond", "-modded"],
    columnBuffMods = ["-total", "-total_penalty"],
    columnModHelpers = ["condition-Helpless", "condition-Paralyzed"],
    /** map of event types to event string for 'on' function to look for */
    events = {
        abilityEventsAuto: "change:REPLACE-cond", //buffs events handled in PFBuffs
        abilityEventsPlayer: "change:REPLACE-base change:REPLACE-racial change:REPLACE-asi change:REPLACE-enhance change:REPLACE-inherent change:REPLACE-misc change:REPLACE-temp change:REPLACE-damage change:REPLACE-penalty change:REPLACE-drain"
    };

/**getAbilityAndMod- returns the number and mod for an ability
 * @param {string} numberAsString the ability score -a number in string form
 * @returns {{base: number or '-', mod:number}}
 */
export function getAbilityAndMod (numberAsString) {
    var base = parseInt(numberAsString, 10),
        mod = 0;
    if (!isNaN(base)) {
        mod = Math.floor((base - 10) / 2);
        return {
            "base": base,
            "mod": mod
        };
    }
    if (PFConst.minusreg.test(numberAsString)) {
        return {
            "base": "-",
            "mod": 0
        };
    }
    return {
        "base": 10,
        "mod": 0
    };
}
export function getAttributes (ability) {
    var fields = _.map(columnMods, function (col) {return ability + col;});
    fields.push(ability);
    fields = fields.concat(_.map(columnBuffMods, function (col) {
        return 'buff_' + ability + col;
    }));
    fields = fields.concat(columnModHelpers);
    return fields;
}

export function getAllAttributes () {
    var fields = SWUtils.cartesianAppend(abilities, columnMods);
    fields = fields.concat(abilities);
    fields = fields.concat(SWUtils.cartesianAppend(['buff_'], abilities, columnBuffMods));
    fields = fields.concat(columnModHelpers);
    return fields;
}

function getAbilityModUpdates (abilityModName, newval, v, setter) {
    setter = setter || {};
    return Object.keys(PFConst.abilityScoreManualDropdowns).filter(function (a) {
        return v[a] === abilityModName;
    }).reduce(function (m, a) {
        var oldval = parseInt(v[PFConst.abilityScoreManualDropdowns[a]], 10) || 0;
        if (newval !== oldval) {
            m[PFConst.abilityScoreManualDropdowns[a]] = newval;
        }
        return m;
    }, setter);
}
/** Looks at the ability-mod changed and then updates rest of sheet. For non repeating
 * @param {string|Array} attr string name of attribute, or array of attributes abilitymods, if null then abilitymods
 * @param {int} oldval
 */
function propagateAbilityModsAsync (callback, silently, attr, newval) {
    var attrs, fields, done = _.once(function () {
        if (typeof callback === "function") {
            callback();
        }
    });
    if (Array.isArray(attr)) {
        attrs = attr;
    } else if (attr) {
        attr = attr.slice(0, 3).toUpperCase() + '-mod';
        attrs = [attr];
    } else {
        attrs = abilitymods;
    }
    PFAttacks.updateRepeatingWeaponAbilityDropdowns(null, null, attr);
    fields = attrs;
    fields = fields.concat(Object.keys(PFConst.abilityScoreManualDropdowns));
    fields = fields.concat(_.values(PFConst.abilityScoreManualDropdowns));
    //TAS.debug("propagateAbilityModsAsync about to get fields:",fields);
    getAttrs(fields, function (v) {
        var newval = 0, setter, params = {};
        //TAS.debug("propagateAbilityModsAsync, returned with ",v);
        setter = attrs.reduce(function (m, a) {
            var l;
            newval = newval || parseInt(v[attr], 10) || 0;
            l = getAbilityModUpdates(attr, newval, v);
            _.extend(m, l);
            return m;
        }, {});
        if (_.size(setter)) {
            if (silently) {
                params = PFConst.silentParams;
            }
            setAttrs(setter, params, done);
        } else {
            done();
        }
    });
}

/** modifies ability-base by val (even #s) and adds the new vals to setter.
 *
 * @param {string} ability
 * @param {Number} val
 * @param {Map<string,string>} v
 * @param {Map<string,number>} setter
 * @returns {Map<string,number>} returns setter plus updated values for XYZ-base, XYZ-mod , and XYZ
 */
export function modifyAbility (ability, val, v, setter) {
    var tempint;
    setter = setter || {};
    ability = ability.toUpperCase();
    tempint = parseInt(v[ability + '-base'], 10) || 10;
    tempint += val;
    tempint = Math.max(tempint, 1);
    setter[ability + '-base'] = tempint;
    tempint = parseInt(v[ability], 10) || 10;
    tempint += val;
    tempint = Math.max(tempint, 1);
    setter[ability] = tempint;
    tempint = parseInt(v[ability + '-mod'], 10) || 0;
    tempint += (Math.floor(val / 2));
    tempint = Math.max(tempint, 1);
    setter[ability + '-mod'] = tempint;
    return setter;
}

/** Looks at current values and calculates new ability , ability-mod and ability-modded values
 * @param {string} ability string matching a value in abilities
 * @param {Map} values map of return values from getAttrs
 * @param {Map} setter map of values to pass to SWUtils.setWrapper. or null
 * @returns {Map}  same setter passed in, with added values if necessary
 */
function getAbilityScore (ability, values, setter) {
    var base = 0,
        newVal = 0,
        rawDmg = 0,
        rawPen = 0,
        dmgAndPen = 0,
        rawCond = 0,
        paralyzed = 0,
        helpless = 0,
        penalized = 0,
        rawDmgAndPen = 0,
        currAbility = 0,
        currMod = 0,
        currPenalized = 0,
        mod = 0;
    try {
        setter = setter || {};
        base = parseInt(values[ability + "-base"], 10);
        //if NaN, make sure it's either empty or has a minus
        if (isNaN(base) && !PFConst.minusreg.test(values[ability + '-base'])) {
            return setter;
        }
        currMod = parseInt(values[ability + "-mod"], 10);
        currPenalized = parseInt(values[ability + "-modded"], 10) || 0;
        currAbility = parseInt(values[ability], 10);
        if (isNaN(base)) {
            newVal = "-";
            mod = 0;
            penalized = 0;
        } else {
            helpless = parseInt(values["condition-Helpless"], 10) || 0;
            paralyzed = parseInt(values["condition-Paralyzed"], 10) || 0;
            if (ability === "DEX" && (helpless || paralyzed)) {
                newVal = 0;
                mod = -5;
                penalized = 1;
            } else if (ability === "STR" && paralyzed) {
                newVal = 0;
                mod = -5;
                penalized = 1;
            } else {
                newVal = base + (parseInt(values[ability + "-enhance"], 10) || 0) +
                    (parseInt(values[ability + "-racial"], 10) || 0) +
                    (parseInt(values[ability + "-asi"], 10) || 0) +
                    (parseInt(values[ability + "-inherent"], 10) || 0) + (parseInt(values[ability + "-misc"], 10) || 0) +
                    (parseInt(values[ability + "-drain"], 10) || 0) + (parseInt(values["buff_" + ability + "-total"], 10) || 0);
                rawDmg = Math.abs(parseInt(values[ability + "-damage"], 10) || 0);
                if (rawDmg >= newVal || newVal <= 0) {
                    newVal = 0;
                    mod = -5;
                    penalized = 1;
                } else {
                    rawPen = Math.abs(parseInt(values[ability + "-penalty"], 10) || 0) + Math.abs(parseInt(values["buff_" + ability + "-total_penalty"], 10) || 0);
                    rawCond = Math.abs(parseInt(values[ability + "-cond"], 10) || 0);
                    rawDmgAndPen = rawDmg + rawPen + rawCond;
                    if (rawDmgAndPen >= newVal) {
                        newVal = currAbility;
                        mod = -5;
                        penalized = 1;
                    } else {
                        //normal
                        if (rawDmgAndPen !== 0) {
                            penalized = 1;
                        }
                        dmgAndPen = Math.floor(rawDmgAndPen / 2);
                        mod = Math.max(-5, Math.floor((newVal - 10) / 2) - dmgAndPen);
                    }
                }
            }
        }
        if (currAbility !== newVal) {
            setter[ability] = newVal;
        }
        if (currMod !== mod || isNaN(currMod)) {
            setter[ability + "-mod"] = mod;
        }
        if (penalized !== currPenalized) {
            setter[ability + "-modded"] = penalized;
        }
    } catch (err) {
        TAS.error("updateAbilityScore:" + ability, err);
    } finally {
        return setter;
    }
}

/** updateAbilityScore - Updates the final ability score, ability modifier, condition column based on entries in ability grid plus conditions and buffs.
 * Note: Ability value is not affected by damage and penalties, instead only modifier is affected.
 * @param {string} ability 3 letter abbreviation for one of the 6 ability scores, member of PFAbilityScores.abilities
 */
export function updateAbilityScore (ability, eventInfo, callback, silently) {
    var done = _.once(function () {
        if (typeof callback === "function") {
            callback();
        }
    }),
        fields = getAttributes(ability);
    getAttrs(fields, function (v) {
        var params = {}, setter = {};
        getAbilityScore(ability, v, setter);
        if (_.size(setter)) {
            if (silently) {
                params = PFConst.silentParams;
            }
            SWUtils.setWrapper(setter, params, done);
        } else {
            done();
        }
    });
}
/** calls getAbilityScore for all abilities */
export function updateAbilityScores (callback, silently) {
    var done = _.once(function () {
        if (typeof callback === "function") {
            callback();
        }
    }),
        fields = getAllAttributes();
    getAttrs(fields, function (v) {
        var params = {}, setter = {};
        setter = _.reduce(abilities, function (m, a) {
            getAbilityScore(a, v, m);
            return m;
        }, {});
        if (_.size(setter)) {
            if (silently) {
                params = PFConst.silentParams;
            }
            SWUtils.setWrapper(setter, params, done);
        } else {
            done();
        }
    });
}

export function applyConditions (callback, silently, eventInfo) {
    getAttrs(["STR-cond", "DEX-cond", "condition-Helpless", "condition-Paralyzed", "condition-Exhausted", "condition-Fatigued", "condition-Entangled", "condition-Grappled"], function (v) {
        var setter = {}, silentSetter = {}, params = {}, tempInt = 0,
            strMod = 0, dexMod = 0, helpless = 0, paralyzed = 0, dexAbMod = 0, strAbMod = 0;
        try {
            //TAS.debug("PFAbilityScores.applyconditions: ",v);
            helpless = parseInt(v.helpless, 10) || 0;
            paralyzed = parseInt(v.paralyzed, 10) || 0;
            if (paralyzed) {
                silentSetter["DEX"] = 0;
                silentSetter["DEX-modded"] = 1;
                setter["DEX-mod"] = -5;
                silentSetter["STR"] = 0;
                silentSetter["STR-modded"] = 1;
                setter["STR-mod"] = -5;
            } else if (helpless) {
                silentSetter["DEX"] = 0;
                silentSetter["DEX-modded"] = 1;
                setter["DEX-mod"] = -5;
            } else {
                strMod = (parseInt(v["condition-Fatigued"], 10) || 0) + (parseInt(v["condition-Exhausted"], 10) || 0);
                dexMod = strMod + (parseInt(v["condition-Entangled"], 10) || 0) + (parseInt(v["condition-Grappled"], 10) || 0);
                dexAbMod = dexMod * -2;
                strAbMod = strMod * -2;
                if (dexAbMod !== (parseInt(v["DEX-cond"], 10) || 0)) {
                    setter["DEX-cond"] = dexAbMod;
                }
                if (strAbMod !== (parseInt(v["STR-cond"], 10) || 0)) {
                    setter["STR-cond"] = strAbMod;
                }
            }
        } catch (err) {
            TAS.error("PFAbilityScores.applyConditions", err);
        } finally {
            if (silently) {
                _.extend(silentSetter, setter);
                if (_.size(silentSetter)) {
                    setAttrs(silentSetter, PFConst.silentParams, callback);
                } else if (typeof callback === "function") {
                    callback();
                }
            } else if (_.size(setter)) {
                if (_.size(silentSetter)) {
                    setAttrs(silentSetter, PFConst.silentParams);
                }
                setAttrs(setter, {}, callback);
            } else if (_.size(silentSetter)) {
                setAttrs(silentSetter, PFConst.silentParams, callback);
            } else if (typeof callback === "function") {
                callback();
            }
        }
    });
}


/** migrate (currently empty just calls callback*/
export var migrate = TAS.callback(function callPFAbilityScoreMigrate (callback, oldversion) {
    if (typeof callback === "function") {
        callback();
    }
});
/** recalculates all attributes written to by this module. */
export var recalculate = TAS.callback(function callPFAbilityScoresRecalculate (callback, silently, oldversion) {
    var done = _.once(function () {
        TAS.info("leaving PFAbilityScores.recalculate");
        if (typeof callback === "function") {
            callback();
        }
    }),
        updateDependentAttrs = _.once(function () {
            propagateAbilityModsAsync(done, silently);
        }),
        updateScoresOnce = _.once(function () {
            updateAbilityScores(updateDependentAttrs, silently);
        });
    migrate(function () {
        applyConditions(updateScoresOnce, silently);
    }, oldversion);
});

/** Calls 'on' function for everything related to this module */
function registerEventHandlers () {
    //register event handlers **********************************************
    _.each(abilities, function (ability) {
        on((events.abilityEventsAuto.replace(/REPLACE/g, ability)), TAS.callback(function eventUpdateAbility (eventInfo) {
            if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api") {
                TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                updateAbilityScore(ability, eventInfo);
            }
        }));
        on((events.abilityEventsPlayer.replace(/REPLACE/g, ability)), TAS.callback(function eventUpdateAbilityPlayerUpdated (eventInfo) {
            if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
                TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                updateAbilityScore(ability, eventInfo);
            }
        }));
    });
    on("change:condition-Helpless", TAS.callback(function eventUpdateAbilityHelpless (eventInfo) {
        if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
            TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
            updateAbilityScore("DEX", eventInfo);
        }
    }));

    abilitymods.forEach(function (attr) {
        on("change:" + attr, TAS.callback(function eventAbilityModUpdate (eventInfo) {
            TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
            if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api") {
                propagateAbilityModsAsync(null, null, eventInfo.sourceAttribute);
            }
        }));
    });
}
registerEventHandlers();
