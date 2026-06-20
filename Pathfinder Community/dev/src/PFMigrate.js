'use strict';
import _ from 'underscore';
import TAS from './TheAaronSheet.js';
import {PFLog, PFConsole} from './PFLog';
import PFConst from './PFConst';
import * as SWUtils from './SWUtils';
import * as PFUtils from './PFUtils';

//all user editable fields at the time
var oldSpellUserFieldDefaults = {
    "spellclass_number": {
        "type": "int",
        "val": 0
    },
    "used": {
        "type": "int",
        "val": 0
    },
    "spell_level": {
        "type": "int",
        "val": -1
    },
    "CL_misc": {
        "type": "int",
        "val": 0
    },
    "SP_misc": {
        "type": "int",
        "val": 0
    },
    "Concentration_misc": {
        "type": "int",
        "val": 0
    },
    "range": {
        "type": "text",
        "val": ""
    },
    "name": {
        "type": "text",
        "val": ""
    },
    "school": {
        "type": "text",
        "val": ""
    },
    "cast-time": {
        "type": "text",
        "val": ""
    },
    "components": {
        "type": "text",
        "val": ""
    },
    "targets": {
        "type": "text",
        "val": ""
    },
    "duration": {
        "type": "text",
        "val": ""
    },
    "save": {
        "type": "text",
        "val": ""
    },
    "sr": {
        "type": "text",
        "val": ""
    },
    "description": {
        "type": "text",
        "val": ""
    },
    "macro-text": {
        "type": "text",
        "val": "@{PC-whisper} &{template:pf_spell} {{color}} {{header_image=@{header_image-pf_spell}}} {{name=@{name}}} {{character_name=@{character_name}}} {{character_id=@{character_id}}} {{subtitle}} @{spell_options}"
    },
    "npc-macro-text": {
        "type": "text",
        "val": "@{NPC-whisper} &{template:pf_spell} {{color}} {{header_image=@{header_image-pf_spell}}} {{name=@{name}}} {{character_name=@{character_name}}} {{character_id=@{character_id}}} {{subtitle}} @{spell_options}"
    },
    "isDomain": {
        "type": "checkbox",
        "val": "0"
    }
};

/** breaks the damage dropdown into 2 dropdowns, one for the multiplier and one for the attribute
 * done as part of migration to .60
 *@param {Array} ids array of strings which are the row ids
 *@param {function} callback when done
 */
export function migrateRepeatingDamage (ids,callback) {
    var done=_.once(function(){
        if (typeof callback === "function") {
            callback();
        }
    }),
    setter = {},
    fields = [],
    /** findMultiplier - OLD not used anymore  - returns old damage multiplier when it was in the dropdown.
    * @param {string} str = the value of the damage ability
    * @returns {float} a number indicating the multiplier for the ability mod. Must be 1, .5, 1.5, 2.
    */
    findMultiplier = function (str) {
        var retNum;
        if (!str) {
            return 0;
        }
        if (str.indexOf("1.5") >= 0) {
            retNum = 1.5;
        } else if (str.indexOf(".5") >= 0) {
            retNum = 0.5;
        } else if (str.indexOf("1/2") >= 0) {
            retNum = 0.5;
        } else if (str.indexOf("3/2") >= 0) {
            retNum = 1.5;
        } else if (str.indexOf("1 1/2") >= 0) {
            retNum = 1.5;
        } else if (str.indexOf("2") >= 0) {
            retNum = 2;
        } else {
            retNum = 1;
        }
        return retNum;
    };
    _.each(ids, function (id) {
        var dmgDropdownField = "repeating_weapon_" + id + "_damage-ability",
        abilityMultField = "repeating_weapon_" + id + "_damage_ability_mult";
        fields.push(dmgDropdownField);
        fields.push(abilityMultField);
    });
    fields.push("migrated_damage-multiplier");
    getAttrs(fields, function (v) {
        var migrated=0, setter = {};
        try {
            migrated=parseInt(v["migrated_damage-multiplier"],10)||0;
            if(!migrated){
                //TAS.debug("migrateRepeatingDamage", "values", v);
                _.each(ids, function (id) {
                    var dmgDropdownField = "repeating_weapon_" + id + "_damage-ability",
                    abilityMultField = "repeating_weapon_" + id + "_damage_ability_mult",
                    ability, multStr, strToSet, multval;
                    try {
                        ability = PFUtils.findAbilityInString(v[dmgDropdownField]);
                        multStr = findMultiplier(v[dmgDropdownField]);
                        strToSet = "@{" + ability + "}";
                        multval = parseFloat(multStr, 10);
                        //multfield is blank but multstr is not.
                        if ((!(v[abilityMultField])) && multStr && ability) {
                            if (!isNaN(multval)) {
                                if (multval !== 1.0) {
                                    setter[abilityMultField] = multStr;
                                } else {
                                    setter[abilityMultField] = 1;
                                }
                            }
                            if (ability) {
                                setter[dmgDropdownField] = strToSet;
                            }
                        }
                    } catch (errinner) {
                        TAS.error("migrateRepeatingDamage dropdown to mult: could not migrate str " + v[dmgDropdownField] + " in attack row " + id, errinner);
                    }
                });
                setter["migrated_damage-multiplier"] = "1";
            }
        } catch (err) {
            TAS.error("migrateRepeatingDamage outer error!? SHOULD NOT HAPPEN", err);
        } finally {
            if (_.size(setter)>0){
                SWUtils.setWrapper(setter, PFConst.silentParams, done);
            } else {
                done();
            }
        }
    });
}
/** sets old dropdown  max dex and acp values to new ones for Magik's updates.
 * because old values were so different, new values are set to either "none" or "armor and load"
 */
export function migrateMaxDexAndACP () {
    getAttrs(["max-dex-source"], function (v) {
        var newMaxDex = 0,
        currMaxDex = parseInt(v["max-dex-source"],10) || 0,
        setter = {};
        if (currMaxDex >= 99) {
            SWUtils.setWrapper(setter, { silent: true });
        }
    });
}
/** updates repeating_spells ranges from text to dropdown and custom text field, and range number
 * @param {function} callback call after finishing */
export function migrateSpellRanges (callback) {
    var done = function () {
        if (typeof callback === "function") {
            callback();
        }
    };
    getAttrs(["spellranges_migrated"], function (m) {
        var rangeFields = ["casterlevel", "range", "range_numeric", "range_pick", "targets", "name"];
        if (parseInt(m["spellranges_migrated"],10) === 1) {
            done();
            return;
        }
        getSectionIDs("repeating_spells", function (ids) {
            var fields = [];
            fields = _.reduce(ids, function (memo, id) {
                var prefix = "repeating_spells_" + SWUtils.getRepeatingIDStr(id),
                row = _.map(rangeFields, function (field) {
                    return prefix + field;
                });
                return memo.concat(row);
            }, []);
            getAttrs(fields, function (v) {
                var setter = {};
                _.each(ids, function (id) {
                    var prefix = "repeating_spells_" + SWUtils.getRepeatingIDStr(id),
                    casterlevel = parseInt(v[prefix + "casterlevel"], 10) || 1,
                    chosenRange = v[prefix + "range_pick"],
                    rangeText = v[prefix + "range"] || "",
                    areaEffect = v[prefix + "targets"] || "",
                    name = v[prefix + "name"],
                    newRange = 0,
                    rangeUpdates,
                    resetDropdown = false;
                    //if dropdown is blank but text filled in try to migrate
                    if (!chosenRange && !rangeText) {
                        setter[prefix + "range"] = "";
                        setter[prefix + "range_numeric"] = 0;
                        setter[prefix + "range_pick"] = "blank";
                    } else if (((!chosenRange) || chosenRange === "blank") && rangeText) {
                        rangeUpdates = PFUtils.parseSpellRangeText(rangeText, areaEffect);
                        chosenRange = rangeUpdates.dropdown;
                        if (chosenRange === "number" || chosenRange === "perlevel" || rangeUpdates.useorig) {
                            rangeText = rangeUpdates.rangeText;
                        }
                        //otherwise leave it in case user had something they wanted.
                        newRange = PFUtils.findSpellRange(rangeText, chosenRange, casterlevel) || 0;
                        setter[prefix + "range"] = rangeText;
                        setter[prefix + "range_numeric"] = newRange;
                        setter[prefix + "range_pick"] = chosenRange;
                    } else if (resetDropdown) {
                        newRange = PFUtils.findSpellRange(rangeText, chosenRange, casterlevel) || 0;
                        setter[prefix + "range_numeric"] = newRange;
                        setter[prefix + "range_pick"] = chosenRange;
                    }
                });
                setter["spellranges_migrated"] = "1";
                if (_.size(setter) > 0) {
                    SWUtils.setWrapper(setter, {
                        silent: true
                    }, callback);
                } else {
                    done();
                }
            });
        });
    });
}
/* fixes rolltemplate image urls in dropdown to update urls from solid bkg to transparent. (from old to new val) */
export function migrateRollTemplateImages () {
    getAttrs(['migrated_rolltemplateimages','header_image-pf_spell', 'header_image-pf_attack-melee', 'header_image-pf_attack-ranged', 'header_image-pf_attack-cmb', 'header_image-pf_defense'], function (v) {
        var isMigrated=parseInt(v.migrated_rolltemplateimages,10)||0,
        setter={};
        try {
            if (!isMigrated){
                setter = _.chain(v).filter(function (val, attr) {
                    return (/\[default\]/).test(val);
                }).reduce(function (memo, val, attr) {
                    var newval = "";
                    try {
                        switch (attr) {
                            case 'header_image-pf_spell':
                                if (val !== "[default](http://imgur.com/9yjOsAD.png)") {
                                    newval = "[default](http://imgur.com/9yjOsAD.png)";
                                }
                                break;
                            case 'header_image-pf_attack-melee':
                                if (val !== "[default](http://i.imgur.com/AGq5VBG.png)") {
                                    newval = "[default](http://i.imgur.com/AGq5VBG.png)";
                                }
                                break;
                            case 'header_image-pf_attack-ranged':
                                if (val !== "[default](http://imgur.com/58j2e8P.png)") {
                                    newval = "[default](http://imgur.com/58j2e8P.png)";
                                }
                                break;
                            case 'header_image-pf_attack-cmb':
                                if (val !== "[default](http://imgur.com/RUJfMGe.png)") {
                                    newval = "[default](http://imgur.com/RUJfMGe.png)";
                                }
                                break;
                            case 'header_image-pf_defense':
                                if (val !== "[default](http://imgur.com/02fV6wh.png)") {
                                    newval = "[default](http://imgur.com/02fV6wh.png)";
                                }
                                break;
                        }
                        if (newval) {
                            memo[attr] = newval;
                        }
                    } catch (err) {
                        TAS.error("migrateRollTemplateImages: inner error on " + attr, err);
                    }
                    return memo;
                }, {}).value();
            }
        } catch (erro){
            TAS.error("migrateRollTemplateImages outer error",erro);
        } finally {
            if (_.size(setter) > 0) {
                setter['migrated_rolltemplateimages']=1;
                SWUtils.setWrapper(setter, PFConst.silentParams);
            }
        }
    });
}
/**addNumberToMacro adds the value to the end of the macro string.
 * so the evaluated value of the returned string equals macroVal + miscVal
 * either "macroText + miscVal" or "macroText - miscVal"
 * This is for conversions only, if we are removing the miscfield. it is pretty useless otherwise.
 *@param {string} macroText the text of the macro to add to. if it is wrapped in [[ ]] make sure to remove that before passing macro in or it will be added outside of the brackets!
 *@param {int} macroVal the value the macro currently evaluates to.
 *@param {string} miscMacroText text of 2nd macro to add to macroText if there is one
 *@param {int} miscVal the value we are adding to macroText , it is value of miscMacroText if there is a macro
 *@returns {string} the resulting new macro text
 */
export function addNumberToMacro (macroText, macroVal, miscMacroText, miscVal){
    //TAS.debug("at addNumberToMacro:" );
    macroText=macroText||"";
    miscMacroText=miscMacroText||"";
    if (macroText || macroVal){
        macroVal += miscVal;
        if (miscMacroText){
            macroText += " "+miscMacroText;
        } else if (miscVal){
            if (miscVal>0){
                macroText+=" + ";
            } else {
                macroText+= " - ";
            }
            macroText += String(Math.abs(miscVal));
        }
    } else if (miscVal){
        macroText = String(miscVal);
        macroVal = miscVal;
    } else {
        macroText="";
        macroVal = 0;
    }
    return {  'macroText':macroText, 'macroVal':macroVal};
}
/** adds the value to the end of the macro string. either "macro + miscVal" or "macro - miscVal"
 * saves new macro to the sheet
 *@param {function} callback call when done
 *@param {migrateFlag} the sheet attribute to check, if 1 do nothing, if 1 then perform migration then set to 1
 *@param {string} macroAttr the attribute name of macro we will update
 *@param {string} modAttr the attribute name containing the # evaluated from macroAttr
 *@param {string} miscMacroAttr the attribute name of macro to remove and whose value to add to macroAttr
 *@param {string} miscAttr the attribute name of a number field, standalone if macroAttr is null, or it is the
            field containing evaluted number of miscMacroAttr
 */
export function migrateMoveIntIntoMacro (callback,migrateFlag,macroAttr,modAttr,miscMacroAttr,miscAttr) {
    var done=_.once(function(){
        ////TAS.debug("leaving PFMigrate.migrateMoveIntIntoMacro: "+ macroAttr);
        if (typeof callback === "function"){
            callback();
        }
    }),
    fields = [macroAttr,modAttr,miscAttr, migrateFlag];
    if (miscMacroAttr){
        fields.push(miscMacroAttr);
    }
    getAttrs(fields,function(v){
        var miscVal=0,formVal=0,newFormula={},setter={},miscFormula="";
        try {
            //TAS.debug("PFMigrate.migrateMoveIntIntoMacro: ",v);
            if (!parseInt(v[migrateFlag],10)){
                miscVal = parseInt(v[miscAttr],10)||0;
                formVal = parseInt(v[modAttr], 10) || 0 ;
                if (miscMacroAttr){
                    miscFormula=v[miscMacroAttr];
                }
                newFormula = addNumberToMacro(v[macroAttr], formVal, miscFormula, miscVal);
                if (newFormula.macroText && newFormula.macroText !== v[macroAttr]){
                    setter[macroAttr]=newFormula.macroText;
                    setter[modAttr]=newFormula.macroVal;
                }
                setter[migrateFlag] = 1;
                setter[miscAttr]="";
                if (miscMacroAttr){
                    setter[miscMacroAttr]="";
                }
            }
        } catch (err){
            TAS.error("PFMigrate.migrateMoveIntIntoMacro:" + migrateFlag,err);
        } finally {
            if (_.size(setter)>0){
                SWUtils.setWrapper(setter,PFConst.silentParams,done);
            } else {
                done();
            }
        }
    });
}
/**migrateHPMisc copies HP-misc into HP-formula-macro-text and HP-formula-mod
 * This modifies the same fields aas migrateNPC so make sure to call them in sequence not at the same time!
 *@param {function} callback when done.
 */
export function migrateHPMisc(callback){
    //TAS.debug("at migrateHPMisc");
    migrateMoveIntIntoMacro(callback,"migrated_hp_misc","HP-formula-macro-text","HP-formula-mod","", "HP-misc");
}
/**migrateHPMisc copies Max-Skill-Ranks-Misc2 into Max-Skill-Ranks-Misc
 *@param {function} callback when done.
 */
export function migrateMaxSkills (callback){
    //TAS.debug("at migrateMaxSkills");
    migrateMoveIntIntoMacro(callback,"migrated_maxskill_misc","Max-Skill-Ranks-Misc","Max-Skill-Ranks-mod","","Max-Skill-Ranks-Misc2");
}
/** updates NPC from pre v 1.00 to version 1.00
 * @param {function} callback call when done
 * @param {number} oldversion the sheet attribute PFVersion.
 */
export function migrateNPC (callback, oldversion) {
    var done = _.once(function () {
        //TAS.debug("leaving migrateNPC");
        if (typeof callback === "function") {
            callback();
        }
    }),
    migrateNPCConfig = function(callback){
            SWUtils.setWrapper({ 'normal_macro_show': 1,
                'use_traits':0 , 'use_racial_traits':0, 'npc-compimport-show':0 },
                PFConst.silentParams,callback);
    },
    /* updates hp and hp|max, resets npc-hp as avg of hit dice only (npc-hd and npc-hd-num) ,
    * sets class-0-hd and class-0-level to values of  npc-hd2 and npc-hd-num2
    * if undead then sets ability to CHA */
    migrateNPCHP = function (callback) {
        var done=_.once(function(){
            //TAS.debug("leaving PFMigrate.migrateNPCHP");
            if(typeof callback === "function"){
                callback();
            }
        });
        getAttrs(["HP-ability", "HP-ability-mod", "npc-type", "CON-mod", "CHA-mod", "total-hp","level","bab", "HP-formula-macro-text", "HP-formula-mod",
            "class-0-level","class-1-level","class-2-level","class-3-level","class-4-level","class-5-level",
            "class-0-hp","class-1-hp","class-2-hp","class-3-hp","class-4-hp","class-5-hp",
            "is_undead",
            "npc-hd-misc", "npc-hd-misc-mod","npc-hd", "npc-hd-num", "npc-hd2", "npc-hd-num2", 'npc-bab'], function (v) {
            var isUndead=0,abilityMod=0,ability='',classLevels=0,classhd=0,level=0,totalhp=0,hitdice=0,hitdie=0,basehp=0,
                tempInt=0,classhp=0,classNum=0,abilityModTot=0,tempLvl=0,temphp=0,
                currLevel=0,currHP=0,setter={},bab=0,npcbab=0,newbab=0,newFormula={},hdMiscVal=0,currhpFormVal=0;
            try {
                hitdice=parseInt(v['npc-hd-num'],10)||0;
                hitdie=parseInt(v["npc-hd"], 10) || 0;
                if (hitdice > 0 && hitdie > 0){
                    setter["auto_calc_hp"]= "1";
                }
                classLevels=parseInt(v['npc-hd-num2'],10)||0;
                classhd=parseInt(v['npc-hd2'],10)||0;

                //get basic numbers
                isUndead = ((/undead/i).test(v["npc-type"])||parseInt(v.is_undead,10))||0;
                setter["is_undead"]= isUndead;

                currLevel=parseInt(v.level,10)||0;
                currHP = parseInt(v.HP,10)||0;

                bab = parseInt(v.bab,10)||0;
                npcbab = parseInt(v['npc-bab'],10)||0;
                newbab = bab + npcbab;
                if (newbab !== bab){
                    setter["bab"]=newbab;
                }

                abilityMod = isUndead ? (parseInt(v["CHA-mod"], 10) || 0) : (parseInt(v["HP-ability-mod"], 10) || 0);
                abilityModTot = abilityMod * (currLevel||hitdice);
                ability=isUndead ? '@{CHA-mod}' : '@{CON-mod}';
                setter["HP-ability"]= ability;
                setter["HP-ability-mod"]= abilityMod;

                //get the +xx portion and move to correct field.
                hdMiscVal = parseInt(v["npc-hd-misc-mod"], 10) || 0;
                currhpFormVal = parseInt(v["HP-formula-mod"],10)||0;
                if (hdMiscVal || v["HP-formula-macro-text"] ){
                    setter["npc-hd-misc"]= "";
                    setter["npc-hd-misc-mod"]= "";
                }
                if (hdMiscVal ){
                    hdMiscVal -= abilityModTot;
                }
                newFormula = addNumberToMacro(v["HP-formula-macro-text"],currhpFormVal,v["npc-hd-misc"],hdMiscVal);
                if (newFormula.macroText && newFormula.macroText !== v["HP-formula-macro-text"]){
                    setter["HP-formula-macro-text"]= newFormula.macroText;
                    setter["HP-formula-mod"]= newFormula.macroVal;
                }
                basehp=PFUtils.getAvgHP(hitdice,hitdie );
                setter["NPC-HP"]=basehp;

                if (classLevels>0 ){
                    //should be class-0-name, if not, something is really wrong.
                    for (classNum=0;classNum<6;classNum++){
                        tempInt=  parseInt(v['class-'+classNum+'-level'],10);
                        temphp =  parseInt(v['class-'+classNum+'-hp'],10);
                        if( ! tempInt && !temphp  ){
                            break;
                        }
                    }
                    if (classNum<6){
                        classhp=PFUtils.getAvgHP(classLevels,classhd);
                        setter['class-'+classNum+'-hp']=classhp;
                        setter['class-'+classNum+'-level']=classLevels;
                        setter['class-'+classNum+'-hd']=classhd;
                    } else {
                        TAS.error("Cannot convert npc class hit dice, the class grid is full! class levels:"+classLevels +", class hit die:"+classhd);
                        classLevels=0;
                    }
                }
                totalhp=currHP+basehp+classhp;
                level=currLevel+classLevels+hitdice;
                if (totalhp !== currHP){
                    setter['total-hp']=totalhp;
                }
                if (level !== currLevel){
                    setter['level']=level;
                }
            } catch(err) {
                TAS.error("PFMigrate.MigrateNPC",err);
            } finally {
                setter["migrated_npc"]= 1;
                if(_.size(setter)>0){
                    SWUtils.setWrapper(setter, PFConst.silentParams,done);
                } else {
                    done();
                }
            }
        });
    },
    /* copies or appends sense to vision */
    migrateNPCSenses = function (callback) {
        var done = function(){
            if(typeof callback === "function"){
                callback();
            }
        };
        getAttrs([ "senses", "vision",  "character-description"], function (v) {
            var a = '', b= '', c ='', setter={};
            try {
                a = v.senses || '';
                b = v.vision || '';
                if (a && b){
                    c=a+', '+b;
                } else {
                    c=a||b;
                }
                if (c) {
                    setter.vision=c;
                }
                if (a) {
                    setter.senses='';
                }
            } catch(err){
                TAS.error("migrateNPCSenses",err);
            } finally {
                if (_.size(setter)>0){
                    SWUtils.setWrapper(setter, PFConst.silentParams, done);
                } else {
                    done();
                }
            }
        });
    };

    getAttrs(["migrated_npc", "is_npc"], function (v) {
        var isNPC = 0, isMigrated=0,
        doneSub=_.after(3,done);
        try {
            isNPC=parseInt(v["is_npc"], 10) || 0;
            isMigrated = parseInt(v["migrated_npc"], 10) || 0;
            if (!isNPC ){
                if  (!isMigrated) {
                    SWUtils.setWrapper({"migrated_npc": 1}, PFConst.silentParams,done);
                } else{
                    done();
                }
            }
            if (!isMigrated){
                migrateNPCSenses(doneSub);
                migrateNPCConfig(doneSub);
                migrateNPCHP(doneSub);
            } else {
                done();
            }
        } catch (err){
            TAS.error("PFMigrate.migrateNPC",err);
            done();
        }
    });
}

/** migrates repeating_item name, short-description, type, and weight to have item- prefix to avoid duplicate attributes
 * @param {function} callback call after finishing */
export function migrateRepeatingItemAttributes (callback) {
    var done = function () {
        if (typeof callback === "function") {
            callback();
        }
    };
    getAttrs(["migrated_repeating_item_attributes"], function (m) {
        var duplicateFields = ["weight", "hp", "hp_max"], // repeating fields can have duplicate attrbitues with other repeating lists, but not non-repeating list attrbiutes
        resetFields=["qty","qty_max"];
        if (parseInt(m["migrated_repeating_item_attributes"],10)) {
            //TAS.debug"Duplicate repeating_item attributes already migrated; exiting");
            done();
            return;
        }
        getSectionIDs("repeating_item", function (ids) {
            var fields = [];
            if(!(ids && _.size(ids)>0)){
                SWUtils.setWrapper({'migrated_repeating_item_attributes':1},PFConst.silentParams,done);
                return;
            }
            fields = _.reduce(ids, function (memo, id) {
                var prefix = "repeating_item_" + SWUtils.getRepeatingIDStr(id),
                row = [];
                _.each(duplicateFields,function(field){
                    row.push(prefix+field);
                });
                _.each(resetFields,function(field){
                    row.push(prefix+field);
                });
                return memo.concat(row);
            }, []);

            getAttrs(fields, function (v) {
                var setter = {};
                try {
                    _.each(ids, function (id) {
                        var prefix = "repeating_item_" + SWUtils.getRepeatingIDStr(id);
                        duplicateFields.forEach(function (attr) {
                            var newInt= parseInt(v[prefix+attr],10)||0;
                            if (v[prefix + attr] && newInt!==0 ) {
                                setter[prefix + "item-" + attr] = newInt;
                                setter[prefix+attr]="";
                            }
                        });

                        //new default is 1, old was undefined
                        if (isNaN(parseInt(v[prefix+"qty"],10))){
                            setter[prefix+"qty"]=1;
                        }
                        if (isNaN(parseInt(v[prefix+"qty_max"],10))){
                            setter[prefix+"qty_max"]=0;
                        }
                    });
                    setter["migrated_repeating_item_attributes"] = "1";
                } catch (err){
                    TAS.error("migrateRepeatingItemAttributes",err);
                } finally {
                    //TAS.debug("##### PFMigrate.migrateRepeatingItemAttributes setting  ",setter);
                    if (_.size(setter) > 0) {
                        SWUtils.setWrapper(setter, {}, done);
                    } else {
                        done();
                    }
                }
            });
        });
    });
}
export function migrateAbilityListFlags (callback){
    var done=_.once(function(){
        //TAS.debug("leaving migrateAbilityListFlags");
        if (typeof callback === "function"){
            callback();
        }
    }),
    setFlag = _.after(5,function(){
        SWUtils.setWrapper({'migrated_abilityflags109':1},PFConst.silentParams,done);
    });
    getAttrs(['migrated_abilityflags109','uses_feats','uses_traits','use_racial_traits','use_class_features','use_npc-spell-like-abilities'],function(vm){
        if (! parseInt(vm['migrated_abilityflags109'],10)){
            getSectionIDs('repeating_npc-spell-like-abilities',function(ids){
                if(ids && _.size(ids)>0){
                    SWUtils.setWrapper( {'use_npc-spell-like-abilities':1},PFConst.silentParams,setFlag );
                } else {
                    SWUtils.setWrapper( {'use_npc-spell-like-abilities':0},PFConst.silentParams,setFlag );
                }
            });
            getSectionIDs('repeating_feat',function(ids){
                if(ids && _.size(ids)>0){
                    SWUtils.setWrapper( {'use_feats':1},PFConst.silentParams,setFlag );
                } else {
                    SWUtils.setWrapper( {'use_feats':0},PFConst.silentParams,setFlag );
                }
            });
            getSectionIDs('repeating_class-ability',function(ids){
                if(ids && _.size(ids)>0){
                    SWUtils.setWrapper( {'use_class_features':1},PFConst.silentParams,setFlag );
                } else {
                    SWUtils.setWrapper( {'use_class_features':0},PFConst.silentParams,setFlag );
                }
            });
            getSectionIDs('repeating_trait',function(ids){
                if(ids && _.size(ids)>0){
                    SWUtils.setWrapper( {'use_traits':1},PFConst.silentParams,setFlag );
                } else {
                    SWUtils.setWrapper( {'use_traits':0},PFConst.silentParams,setFlag );
                }
            });
            getSectionIDs('repeating_racial-trait',function(ids){
                if(ids && _.size(ids)>0){
                    SWUtils.setWrapper( {'use_racial_traits':1},PFConst.silentParams,setFlag );
                } else {
                    SWUtils.setWrapper( {'use_racial_traits':0},PFConst.silentParams,setFlag );
                }
            });
        } else {
            done();
        }
    });
}
export function migrateSpellPointFlag (callback,oldversion){
    var done = _.once(function(){
        if (typeof callback === "function"){
            callback();
        }
    });
    //TAS.debug("AT PFMigrate.migrateSpellPointFlag: oldversion:"+oldversion);
    if (oldversion > 1.18){
        done();
    }
    getAttrs(['spellclass-0-spell-points-class','spellclass-0-spell-points-bonus','spellclass-0-spell-points-misc',
        'spellclass-1-spell-points-class','spellclass-1-spell-points-bonus','spellclass-1-spell-points-misc',
        'spellclass-2-spell-points-class','spellclass-2-spell-points-bonus','spellclass-2-spell-points-misc',
        'use_spell_points'
        ], function(v){
            var usesPoints=parseInt('spellclass-0-spell-points-class',10) || parseInt('spellclass-0-spell-points-bonus',10) || parseInt('spellclass-0-spell-points-misc',10) ||
                parseInt('spellclass-1-spell-points-class',10) || parseInt('spellclass-1-spell-points-bonus',10) || parseInt('spellclass-1-spell-points-misc',10) ||
                parseInt('spellclass-2-spell-points-class',10) || parseInt('spellclass-2-spell-points-bonus',10) || parseInt('spellclass-2-spell-points-misc',10);
                //TAS.debug("PFMigrate.migrateSpellPointFlag found ",v);
            if (usesPoints && (! parseInt(v.use_spell_points,10))) {
                SWUtils.setWrapper({'uses_spell_points':1},PFConst.silentParams,done);
            } else{
                done();
            }
    });
}

export function migrateWhisperDropdowns (callback){
    var done = _.once(function(){
        //TAS.debug("leaving PFMigrate migrateConfigFlags");
        if (typeof callback === "function") { callback(); }
    });
    getAttrs(['migrated_whispers','PC-whisper','NPC-whisper'],function(v){
        var setter={};
        try{
            if(!parseInt(v.migrated_whispers,10)){
                if (v['PC-whisper']==='&nbsp;'|| v['PC-whisper']===' ' ||
                    (v['PC-whisper'] && v['PC-whisper']!=='/w gm')) {
                    setter['PC-whisper']='';
                }
                if (v['NPC-whisper']==='&nbsp;'|| v['NPC-whisper']===' ' ||
                    (v['NPC-whisper'] && v['NPC-whisper']!=='/w gm')) {
                    setter['NPC-whisper']='';
                }
            }
        } catch (err){
            TAS.error("PFMigrate.migrateWhispers",err);
        } finally {
            if(_.size(setter)){
                SWUtils.setWrapper(setter,PFConst.silentParams,done);
            } else {
                done();
            }
        }
    });
}

export function migrateAttackDropdowns (callback,oldversion){
    getAttrs(['migrated_attack_bab_dropdowns','bab'],function(v){
        var setter={},bab=0;
        if(!parseInt(v.migrated_attack_bab_dropdowns,10)){
            bab=parseInt(v.bab,10)||0;
            setter.melee_bab='bab';
            setter['melee_bab-mod']=bab;
            setter.melee2_bab='bab';
            setter['melee2_bab-mod']=bab;
            setter.ranged_bab='bab';
            setter['ranged_bab-mod']=bab;
            setter.ranged2_bab='bab';
            setter['ranged2_bab-mod']=bab;
            setter.cmb_bab='bab';
            setter['cmb_bab-mod']=bab;
            setter.cmb2_bab='bab';
            setter['cmb2_bab-mod']=bab;
            setter.migrated_attack_bab_dropdowns = 1;
            //TAS.debug("####################","migrate attack dropdowns should be silent!",setter);
            SWUtils.setWrapper(setter,PFConst.silentParams,callback);
        } else if (typeof callback === "function"){
            callback();
        }
    });
}

export function migrateConfigFlags (callback,oldversion){
    var done = _.once(function(){
        //TAS.debug("leaving PFMigrate migrateConfigFlags");
        if (typeof callback === "function") { callback(); }
    });
    migrateNPC(function(){migrateHPMisc(done);});
    migrateRollTemplateImages();
    migrateAbilityListFlags();
    migrateSpellPointFlag(null,oldversion);
    migrateWhisperDropdowns();
}

export function getAllMigrateFlags (v){
    //TAS.debug("at PFMigrate.getAllMigrateFlags");
    v=v||{};
    v['classSkillsMigrated']=1;
    v['spellranges_migrated']=1;
    v['migrated_damage-multiplier']=1;
    v['migrated_experience']=1;
    v['migrated_spellflag']=1;
    v['migrated_npc']=1;
    v['migrated_worn_equipment']=1;
    v['migrated_repeating_item_attributes']=1;
    //v['migrated_skill_macrosv1']=1;
    //v['migrated_attack_macrosv1']=1;
    //v['migrated_spells_macrosv1']=1;
    //v['migrated_feature_macrosv109']=1;
    //v['migrated_ability_macrosv112']=1;
	//v['migrated_item_macrosv1']=1;
    v['migrated_hp_misc']=1;
    v['migrated_maxskill_misc']=1;
    v['migrated_featurelists_defaults']=1;
    v['migrated_attacklist_defaults111']=1;
    v['migrated_itemlist_defaults']=1;
    v['migrated_abilityflags109']=1;
    v['migrated_whispers']=1;
    v['migrated_linked_attacks']=1;
    v['migrated_buffs_rangeddmg_ability']=1;
    v["migrated_itemlist_newfields"]=1;
    v['migrate_fatigued_conditions']=1;
    v['migrated_attack_bab_dropdowns']=1;
    v['migrated_skill_dropdowns5']=1;
    //force these to migrate, for some reason sheets using old values even for new Sheets!
    //v['migrated_ability_dropdowns4']=1;
    //v['migrated_take10_dropdown']=1;
    //v['migrated_skill_speedup3']=1;
    return v;
}
export function setAllMigrateFlags (callback){
    var done = _.once(function(){
        //TAS.debug("leaving PFMigrate setAllMigrateFlags");
        if (typeof callback === "function") { callback(); }
    });
    SWUtils.setWrapper(getAllMigrateFlags(), PFConst.silentParams, done);
}