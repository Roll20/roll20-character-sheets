'use strict';
import _ from 'underscore';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFDefense from './PFDefense';

var load = {
'Light':0,
'Medium':1,
'Heavy':2,
'Overloaded':3,
'OverDouble':4
}
/** Returns the carrying capacity for a given strength score and load type
 * Will recursively calculate for strength scores over 29
 * @param {int} str strength score
 * @param {int} loadToFind load val from load param
 */
function getCarryingCapacity(str, loadToFind) {
    var l,
    m,
    h,
    r;
    if(str>=30){
        return (getCarryingCapacity(str - 10, loadToFind) * 4);
    }
    //https://www.reddit.com/r/Pathfinder_RPG/comments/1k5hsf/carry_capacity_how_is_it_calculated/
    switch (str) {
        case 0:
            l = 0;
            m = 0;
            h = 0;
            break;
        case 1:
            l = 3;
            m = 6;
            h = 10;
            break;
        case 2:
            l = 6;
            m = 13;
            h = 20;
            break;
        case 3:
            l = 10;
            m = 20;
            h = 30;
            break;
        case 4:
            l = 13;
            m = 26;
            h = 40;
            break;
        case 5:
            l = 16;
            m = 33;
            h = 50;
            break;
        case 6:
            l = 20;
            m = 40;
            h = 60;
            break;
        case 7:
            l = 23;
            m = 46;
            h = 70;
            break;
        case 8:
            l = 26;
            m = 53;
            h = 80;
            break;
        case 9:
            l = 30;
            m = 60;
            h = 90;
            break;
        case 10:
            l = 33;
            m = 66;
            h = 100;
            break;
        case 11:
            l = 38;
            m = 76;
            h = 115;
            break;
        case 12:
            l = 43;
            m = 86;
            h = 130;
            break;
        case 13:
            l = 50;
            m = 100;
            h = 150;
            break;
        case 14:
            l = 58;
            m = 116;
            h = 175;
            break;
        case 15:
            l = 66;
            m = 133;
            h = 200;
            break;
        case 16:
            l = 76;
            m = 153;
            h = 230;
            break;
        case 17:
            l = 86;
            m = 173;
            h = 260;
            break;
        case 18:
            l = 100;
            m = 200;
            h = 300;
            break;
        case 19:
            l = 116;
            m = 233;
            h = 350;
            break;
        case 20:
            l = 133;
            m = 266;
            h = 400;
            break;
        case 21:
            l = 153;
            m = 306;
            h = 460;
            break;
        case 22:
            l = 173;
            m = 346;
            h = 520;
            break;
        case 23:
            l = 200;
            m = 400;
            h = 600;
            break;
        case 24:
            l = 233;
            m = 466;
            h = 700;
            break;
        case 25:
            l = 266;
            m = 533;
            h = 800;
            break;
        case 26:
            l = 306;
            m = 613;
            h = 920;
            break;
        case 27:
            l = 346;
            m = 693;
            h = 1040;
            break;
        case 28:
            l = 400;
            m = 800;
            h = 1200;
            break;
        case 29:
            l = 466;
            m = 933;
            h = 1400;
            break;
        default:
            return 0;
    }
    switch (loadToFind) {
        case load.Light:
            return l;
        case load.Medium:
            return m;
        case load.Heavy:
            return h;
    }
    return 0;
}

/** updateCurrentLoad-updates the current load radio button
 * @param {function} callback when done
 * @param {boolean} silently
 */
function updateCurrentLoad(callback, silently) {
    var done = function () {
        if (typeof callback === "function") {
            callback();
        }
    };
    getAttrs(["use_metrics", "load-light", "load-medium", "load-heavy", "load-max", "current-load", "carried-total", "max-dex-source"], function (v) {
        var curr = 0,
        carried = 0,
        light = 0,
        medium = 0,
        heavy = 0,
        max = 0,
        maxDexSource = 0,
        ignoreEncumbrance = 0,
        newLoad = 0,
        setter = {},
        params = {};
        try {
        //metric multiplier to convert lbs to kgs
            let use_metrics = parseInt(v["use_metrics"], 10) || 0;
            if (parseInt(v["use_metrics"]) > 0) {
                use_metrics = 0.454;
            }
            //TAS.debug("at updateCurrentLoad",v);
            maxDexSource = parseInt(v["max-dex-source"],10)||0;
            ignoreEncumbrance =  (maxDexSource===1 || maxDexSource===3)?1:0;
            curr = parseInt(v["current-load"],10)||0;
            if (ignoreEncumbrance){
                newLoad=load.Light;
            } else {
                carried = parseFloat(v["carried-total"])||0;
                light = parseFloat(v["load-light"])||0;
                medium = parseFloat(v["load-medium"])||0;
                heavy = parseFloat(v["load-heavy"])||0;
                max = heavy * 2;
                //TAS.debug"current-load=" + curr + ", carried-total=" + carried + ", load-light=" + light + ", load-medium=" + medium);
                if (carried <= light) {
                    //TAS.debug("light load");
                    newLoad = load.Light;
                } else if (carried <= medium) {
                    //TAS.debug("medium load");
                    newLoad = load.Medium;
                } else if (carried <= heavy) {
                    //TAS.debug("heavy load");
                    newLoad = load.Heavy;
                } else if (carried <= max) {
                    //TAS.debug"over heavy but under max");
                    newLoad = load.Overloaded;
                } else if (carried > max) {
                    //TAS.debug"maximum load");
                    newLoad = load.OverDouble;
                }
            }
            if (curr !== newLoad){
                setter["current-load"] = newLoad;
            }
        } catch (err) {
            TAS.error("PFEncumbrance.updateCurrentLoad", err);
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

/** updates the load and lift numbers
 * @param {function} callback when done
 * @param {boolean} silently
 */
export function updateLoadsAndLift (callback, silently) {
    var done = _.once(function () {
        if (typeof callback === "function") {
            callback();
        }
    });
    getAttrs(["STR", "size", "size-multiplier", "legs", "load-light", "load-medium", "load-heavy", "load-max",
    "lift-above-head", "lift-off-ground", "lift-drag-and-push", "load-str-bonus", "load-multiplier",
    "total-load-multiplier", "load-misc", "use_metrics"], function (v) {
        var str = 10,
        size = 1,
        sizeMult = 1,
        currSizeMult = 1,
        currTotalLoadMult = 1,
        legs = 2,
        light = 0,
        medium = 0,
        heavy = 0,
        max = 0,
        aboveHead = 0,
        offGround = 0,
        drag = 0,
        strMod = 0,
        loadMult = 1,
        mult = 1,
        misc = 0,
        l = 0,
        m = 0,
        h = 0,
        a = 0,
        o = 0,
        d = 0,
        setter = {},
        params = {};
        try {
            str = parseInt(v["STR"],10)||0;
            size = parseInt(v["size"],10)||0;
            sizeMult = parseInt(v["size-multiplier"],10)||0;
            currSizeMult = sizeMult;
            currTotalLoadMult = parseInt(v["total-load-multiplier"],10)||0;
            legs = parseInt(v["legs"],10)||0;
            if (legs!==4){legs=2;}
            light = parseInt(v["load-light"],10)||0;
            medium = parseInt(v["load-medium"],10)||0;
            heavy = parseInt(v["load-heavy"],10)||0;
            max = parseInt(v["load-max"],10)||0;
            aboveHead = parseInt(v["lift-above-head"],10)||0;
            offGround = parseInt(v["lift-off-ground"],10)||0;
            drag = parseInt(v["lift-drag-and-push"],10)||0;
            strMod = parseInt(v["load-str-bonus"],10)||0;
            loadMult = parseInt(v["load-multiplier"],10)||0;
            mult = 1;
            misc = parseInt(v["load-misc"],10)||0;
            l = getCarryingCapacity(str + strMod, load.Light) + misc;
            m = getCarryingCapacity(str + strMod, load.Medium) + misc;
            h = getCarryingCapacity(str + strMod, load.Heavy) + misc;
        //metric multiplier to convert lbs to kgs
            let use_metrics = parseInt(v["use_metrics"], 10) || 0;
            if (parseInt(v["use_metrics"]) > 0) {
                use_metrics = 0.454;
                l = getCarryingCapacity(str + strMod, load.Light);
                m = getCarryingCapacity(str + strMod, load.Medium);
                h = getCarryingCapacity(str + strMod, load.Heavy);
                l *= use_metrics;
                m *= use_metrics;
                h *= use_metrics;
        //rounding to 2 decimal places after metric multiplier conversion
                l = Math.round(l * 100)/100;
                m = Math.round(m * 100)/100;
                h = Math.round(h * 100)/100;
                l += misc;
                m += misc;
                h += misc;
            }
            if (loadMult < 1) {
                loadMult = 1;
            }
            loadMult--;
            //TAS.debug("STR=" + str + ", legs=" + legs + ", load-light=" + light + ", load-medium=" + medium + ", load-heavy=" + heavy + ", lift-above-head=" + aboveHead + ", lift-off-ground=" + offGround + ", lift-drag-and-push=" + drag + ", load-str-bonus=" + strMod + ", load-multiplier=" + loadMult + ", load-misc=" + misc);
            if (legs !== 4 ) {
                switch (size) {
                    case -8:
                        sizeMult = 16;
                        break;
                    case -4:
                        sizeMult = 8;
                        break;
                    case -2:
                        sizeMult = 4;
                        break;
                    case -1:
                        sizeMult = 2;
                        break;
                    case 1:
                        sizeMult = 3 / 4;
                        break;
                    case 2:
                        sizeMult = 1 / 2;
                        break;
                    case 4:
                        sizeMult = 1 / 4;
                        break;
                    case 8:
                        sizeMult = 1 / 8;
                        break;
                    default:
                        sizeMult = 1;
                }
            } else if (legs === 4) {
                switch (size) {
                    case -8:
                        sizeMult = 24;
                        break;
                    case -4:
                        sizeMult = 12;
                        break;
                    case -2:
                        sizeMult = 6;
                        break;
                    case -1:
                        sizeMult = 3;
                        break;
                    case 0:
                        sizeMult = 1.5;
                        break;
                    case 1:
                        sizeMult = 1;
                        break;
                    case 2:
                        sizeMult = 3 / 4;
                        break;
                    case 4:
                        sizeMult = 1 / 2;
                        break;
                    case 8:
                        sizeMult = 1 / 4;
                        break;
                    default:
                        sizeMult = 1.5;
                }
            }
            mult += loadMult;
            mult *= sizeMult;
            l *= mult;
            m *= mult;
            h *= mult;
            a = h;
            o = h * 2;
            d = h * 5;
            //TAS.debug("new light load=" + l + ", new medium load=" + m + ", new heavy load=" + h + ", new above head=" + a + ", new off ground=" + o + ", new drag=" + d);
            if (currSizeMult !== sizeMult) {
                setter["size-multiplier"] = sizeMult;
            }
            if (currTotalLoadMult !== mult) {
                setter["total-load-multiplier"] = mult;
            }
            if (light !== l) {
                setter["load-light"] = l;
            }
            if (medium !== m) {
                setter["load-medium"] = m;
            }
            if (heavy !== h) {
                setter["load-heavy"] = h;
            }
            if (max !== (h * 2)) {
                setter["load-max"] = (h * 2);
            }
            if (aboveHead !== a) {
                setter["lift-above-head"] = a;
            }
            if (offGround !== o) {
                setter["lift-off-ground"] = o;
            }
            if (drag !== d) {
                setter["lift-drag-and-push"] = d;
            }
        } catch (err) {
            TAS.error("updateLoadsAndLift", err);
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
/** updates the modified speed and run values
 *  do not round to 5 since if it's 2.5, then double move allows one more square.
 * always updates silently
 * @param {function} callback when done
 */
export function updateModifiedSpeed (callback) {
    var attribList = ["current-load", "speed-base", "speed-modified", "speed-run",
        "is_dwarf", "max-dex-source", "run-mult", "buff_speed-total","condition-Slowed","run_cond_applied",
    	"condition-Entangled", "condition-Fatigued", "condition-Exhausted", "use_metrics"];
    _.each(PFDefense.defenseArmorShieldRows, function (row) {
        attribList.push(row + "-equipped");
        attribList.push(row + "-type");
    });
    getAttrs(attribList, function (v) {
        var use_metrics = parseInt(v["use_metrics"],10)||0,
        currLoad = parseInt(v["current-load"],10)||0,
        buff = parseInt(v["buff_speed-total"], 10) || 0,
        base = parseInt(v["speed-base"],10)||0,
        speedDropdown = parseInt(v["max-dex-source"],10)||0,
        origRunMult = isNaN(parseInt(v["run-mult"],10)) ? 4 : parseInt(v["run-mult"],10),
        slowed = 0,
        cannotRun = 0,
        newSpeed = base,
        runMult = origRunMult,
        newRun = base * runMult,
        combinedLoad = 0,
        isDwarf = false,
        inHeavy = false,
        inMedium = false,
        armor3Equipped = 0,
        armorLoad = 0,
        setter = {};
        try {
            if (use_metrics > 0) {
                base = parseFloat(v["speed-base"]) || 0;
                buff = parseFloat(v["buff_speed-total"]) || 0;
                newSpeed = base;
                newRun = base * runMult;
            } else {
                base = parseInt(v["speed-base"], 10) || 0;
                buff = parseInt(v["buff_speed-total"], 10) || 0;
                newSpeed = base;
                newRun = base * runMult;
            }
            base = base + buff;
            //speed penalties stack: http://paizo.com/pathfinderRPG/prd/coreRulebook/combat.html#special-movement-rules
            if(parseInt(v['condition-Entangled'],10)===2) {
                slowed = 1;
                base = base/2;  //Math.floor(base/10)*5;
                cannotRun = 1;
            }
            if(parseInt(v['condition-Exhausted'],10)===3) {
                slowed = 1;
                base = base/2;
                cannotRun = 1;
            }
            newSpeed = base ;
            if (parseInt(v['condition-Fatigued'],10)===1) {
                cannotRun = 1;
            }
            if (buff < 0) {
                slowed = 1;
            }
            //TAS.debug("speed-modified=" + currSpeed + ", speed-run=" + currRun + ", current-load=" + currLoad + ", speed-base=" + base + ", load-heavy=" + heavy + ", carried-total=" + carried);
            /*
            speedDropdown from settings|encumbrance
            #0: Armor, Shield & Load
            #1: Armor & Shield only
            #2: Load only
            #3: None
            */
            if (speedDropdown !== 3) {
                armor3Equipped = parseInt(v["armor3-equipped"], 10) || 0;
                //dwarf base speed not lowered but run multiplier can be.
                isDwarf = parseInt(v.is_dwarf, 10) || 0;
                if (armor3Equipped && (speedDropdown === 0 || speedDropdown === 1)) {
                    if (v["armor3-type"] === "Heavy") {
                        armorLoad = 2;
                    } else if (v["armor3-type"] === "Medium") {
                        armorLoad = 1;
                    }
                }
                combinedLoad = Math.max(armorLoad, currLoad);
                if (combinedLoad === load.OverDouble) {
                    newSpeed = 0;
                    newRun = 0;
                    cannotRun = 1;
                } else if (!isDwarf && combinedLoad > load.Light) {
                    //metric multiplier ft to m
                    if (use_metrics > 0) {
                        if (combinedLoad === load.Overloaded) {
                            newSpeed = 0.75;
                            newRun = 0;
                            cannotRun = 1;
                        } else if (combinedLoad === load.Heavy || combinedLoad === load.Medium) {
                            if (base < 3) {
                                newSpeed = 1.5;
                            } else if (base >= 3 && base < 6.5) {
                                newSpeed = 3;
                            } else if (base >= 6.5 && base < 7.5) {
                                newSpeed = 4.5;
                            } else {
                                //newSpeed = ((base + 3) * 2 / 3) - 1.5;
                                newSpeed = Math.ceil(Math.ceil((base / 3) * 2) / 1.5) * 1.5;
                            }
                            if (combinedLoad === load.Heavy) {
                                runMult--;
                            }
                        }
                    } else {
                        if (combinedLoad === load.Overloaded) {
                            newSpeed = 2.5;
                            newRun = 0;
                            cannotRun = 1;
                        } else if (combinedLoad === load.Heavy || combinedLoad === load.Medium) {
                            if (base <= 5) {
                                newSpeed = 5;
                            } else if (base % 15 === 0) {
                                newSpeed = base * 2 / 3;
                            } else if ((base + 5) % 15 === 0) {
                                newSpeed = (base + 5) * 2 / 3;
                            } else {
                                newSpeed = ((base + 10) * 2 / 3) - 5;
                            }
                            if (combinedLoad === load.Heavy) {
                                runMult--;
                            }
                        }
                    }

                }
            }
            if (use_metrics > 0) {
                    if (cannotRun) {
                        runMult = 0;
                    }
                    if (slowed) {
                        //round to 3 decimal places
                        newSpeed = Math.floor(newSpeed * 1000) / 1000;
                    }
                    newRun = newSpeed * runMult;
                    if (newSpeed !== (parseInt(v["speed-modified"], 10) || 0)) {
                        setter["speed-modified"] = newSpeed;
                    }
                    if (newRun !== (parseInt(v["speed-run"], 10) || 0)) {
                        setter["speed-run"] = newRun;
                    }
                    if (slowed !== (parseInt(v['condition-Slowed'], 10) || 0)) {
                        setter['condition-Slowed'] = slowed;
                    }
                    if (origRunMult > runMult) {
                        cannotRun = 1; //for flag even if can run
                    }
                    if (cannotRun !== (parseInt(v.run_cond_applied, 10) || 0)) {
                        setter.run_cond_applied = cannotRun;
                    }
            } else {
                    if (cannotRun) {
                        runMult = 0;
                    }
                    if (slowed) {
                        //round to 3 decimal places
                        newSpeed = Math.floor(newSpeed * 1000) / 1000;
                    }
                    newRun = newSpeed * runMult;
                    if (newSpeed !== (parseInt(v["speed-modified"], 10) || 0)) {
                        setter["speed-modified"] = newSpeed;
                    }
                    if (newRun !== (parseInt(v["speed-run"], 10) || 0)) {
                        setter["speed-run"] = newRun;
                    }
                    if (slowed !== (parseInt(v['condition-Slowed'], 10) || 0)) {
                        setter['condition-Slowed'] = slowed;
                    }
                    if (origRunMult > runMult) {
                        cannotRun = 1; //for flag even if can run
                    }
                    if (cannotRun !== (parseInt(v.run_cond_applied, 10) || 0)) {
                        setter.run_cond_applied = cannotRun;
                    }
            }

        }
        catch (err) {
            TAS.error("PFEncumbrance.updateModifiedSpeed", err);
        }
        finally {
            if (_.size(setter) > 0) {
                SWUtils.setWrapper(setter, PFConst.silentParams, callback);
            }
            else if (typeof callback === "function") {
                callback();
            }
        }
    });
}
export function migrate (callback){
    var done = function(){
        if (typeof callback === "function"){
            callback();
        }
    }
    getAttrs(['max-dex-source'],function(v){
        var val = parseInt(v['max-dex-source'],10);
        if (isNaN(val)){
            SWUtils.setWrapper({'max-dex-source':0},PFConst.silentParams,done);
        } else {
            done();
        }
    });
}
export var recalculate = TAS.callback(function PFEncumbranceRecalculate(callback, silently, oldversion) {
    var done = _.once(function () {
        TAS.info("leaving PFEncumbrance.recalculate");
        if (typeof callback === "function") {
            callback();
        }
    }),
    setSpeedWhenDone = _.once(function () {
        updateModifiedSpeed(done);
    }),
    setEncumbrance = _.once(function () {
        updateCurrentLoad(setSpeedWhenDone);
    }),
    setLoadCapability = _.once(function () {
        updateLoadsAndLift(setEncumbrance, silently);
    });
    try {
        migrate(setLoadCapability)
    } catch (err) {
        TAS.error("PFEncumbrance.recalculate", err);
        done();
    }
});
function registerEventHandlers  () {
    on("change:speed-base change:race change:armor3-equipped change:max-dex-source change:run-mult", TAS.callback(function eventUpdateSpeedPlayer(eventInfo) {
        TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
        if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api"){
            updateModifiedSpeed();
        }
    }));
    on("change:is_dwarf change:current-load change:armor3-equipped change:armor3-type", TAS.callback(function eventUpdateSpeedAuto(eventInfo) {
        TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
        if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api"){
            updateModifiedSpeed();
        }
    }));
    on('change:load-light change:carried-total', TAS.callback(function eventUpdateCurrentLoad(eventInfo) {
        TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
        if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api"){
            updateCurrentLoad();
        }
    }));
    on("change:size-multiplier change:legs change:load-str-bonus change:load-multiplier change:load-misc", TAS.callback(function eventUpdateLoadsAndLiftPlayer(eventInfo) {
        if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api"){
            TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
            updateLoadsAndLift();
        }
    }));
    //changing the metric option triggers weight recalc
    on("change:use_metrics", TAS.callback(function eventUpdateLoadsAndLiftPlayer(eventInfo) {
        if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
            TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
            updateLoadsAndLift();
            updateCurrentLoad();
            updateModifiedSpeed();
        }
    }));
    on("change:STR change:size", TAS.callback(function eventUpdateLoadsAndLiftAuto(eventInfo) {
        TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
        if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api"){
            updateLoadsAndLift();
        }
    }));
}
registerEventHandlers();