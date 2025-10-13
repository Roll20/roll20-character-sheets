'use strict';
import _ from 'underscore';
import TAS from './TheAaronSheet.js';
import {PFLog, PFConsole} from './PFLog';
import PFConst from './PFConst';
import * as SWUtils from './SWUtils';
import * as PFUtils from './PFUtils';

export var optionToggles = ["toggle_spell_school_notes", "toggle_spell_casting_time_notes", "toggle_spell_duration_notes",
    "toggle_spell_saving_throw_notes", "toggle_spell_sr_notes", "toggle_spell_range_notes", "toggle_spell_targets_notes",
    "toggle_spell_description_notes", "toggle_spell_concentration_notes", "toggle_spell_concentration_check",
    "toggle_spell_casterlevel_notes", "toggle_spell_casterlevel_check", "toggle_spell_level_notes", "toggle_spell_components_notes", "toggle_spell_spellnotes_notes", "toggle_spell_spell_fail_check", "toggle_spell_damage_notes", "toggle_spell_spellPen_check", "toggle_spell_dc_notes"],
optionTemplates = {
    school: "{{school=@{school}}}",
    casting_time: "{{casting_time=@{cast-time}}}",
    components: "{{components=@{components}}}",
    duration: "{{duration=@{duration}}}",
    saving_throw: "{{saving_throw=@{save}}}",
    sr: "{{sr=@{sr}}}",
    casterlevel: "{{casterlevel=[[ @{casterlevel} ]]}}",
    range: "{{range=@{range_numeric}}}",
    targets: "{{targets=@{targets}}}",
    Concentration: "{{Concentration=[[ @{Concentration-mod} ]]}}",
    description: "{{description=@{description}}}",
    dc: "{{dc=[[ @{savedc} ]]}}",
    spellPen: "{{spellPen=[[ @{SP-mod} ]]}}",
    range_pick: "{{@{range_pick}=Range_pick}}",
    rangetext: "{{rangetext=@{range}}}",
    level: "{{level=@{spell_level}}}",
    spellclass: "{{spellclass=@{spellclass}}}",
    cast_def: "{{cast_def=[[ REPLACE ]]}}",
    cast_defDC: "{{cast_defDC=[[ REPLACE ]]}}",
    concentrationNote: "{{concentrationNote=REPLACE}}",
    spellPenNote: "{{spellPenNote=REPLACE}}",
    casterlevel_chk: "{{casterlevel_chk=[[ 1d20 + @{casterlevel} ]]}}",
    Concentration_chk: "{{Concentration_chk=[[ 1d20 + @{Concentration-mod} ]]}}",
    spellnotes: "{{spells_notes=REPLACE}}",
    spell_fail_check: "{{spell_fail_check=[[ 1d100cf<[[ @{spell-fail} ]]cs>[[ @{spell-fail}+1 ]] ]]}}",
    spell_fail: "{{spell_fail=@{spell-fail}}}",
    spelldamage: "{{spelldamage=@{damage-macro-text}}}",
    spelldamagetype: "{{spelldamagetype=@{damage-type}}}",
	spellPen_chk: "{{spellPen_chk=[[ 1d20 + @{casterlevel} + @{SP-mod} ]]}}"
},
optionTemplateRegexes = PFUtils.getOptionsCompiledRegexMap(optionTemplates);

/* non repeating */
var optionHelperAttrs = ["Concentration-0-def", "Concentration-1-def", "Concentration-2-def", "spell-fail"],
optionTogglesPlusOptionAttrs = optionToggles.concat(optionHelperAttrs),
/* repeating*/
repeatingOptionAttrs = ["school", "cast-time", "duration", "save", "sr", "range_numeric", "targets", "description", "Concentration-mod", "savedc", "SP-mod", "range_pick", "range", "spell_level", "spellclass", "casterlevel", "components", "spellclass_number", "damage-macro-text", "damage-type"],
repeatingOptionHelperAttrs = ["spellclass_number", "SP_misc", "CL_misc", "Concentration_misc", "slot", "spell-attack-type"],
repeatingOptionAttrsToGet = repeatingOptionAttrs.concat(repeatingOptionHelperAttrs),
rowattrToOptionToggleMap = {
    school: "toggle_spell_school_notes",
    "cast-time": "toggle_spell_casting_time_notes",
    components: "toggle_spell_components_notes",
    duration: "toggle_spell_duration_notes",
    save: "toggle_spell_saving_throw_notes",
    dc: "toggle_spell_dc_notes",
    sr: "toggle_spell_sr_notes",
    range: "toggle_spell_range_notes",
    targets: "toggle_spell_targets_notes",
    description: "toggle_spell_description_notes",
    spellnotes:"toggle_spells_notes",
    spell_fail_check: "toggle_spell_spell_fail_check",
    "damage-macro-text": "toggle_spell_damage_notes",
    "damage-type": "toggle_spell_damage_notes"
},
events = {
    spellOptionEventsPlayer: ["school", "cast-time", "components", "duration", "save", "sr", "range", "targets", "damage-macro-text", "damage-type","sp-mod"]
 };
/** updateSpellOption - updates an existing @{spell_options} text for a row depending on the field updated on existing row
 *
 * @param {obj} eventInfo
 * @param {string} fieldUpdated
 */
export function updateSpellOption (eventInfo, fieldUpdated) {
    var fieldName = "repeating_spells_" + fieldUpdated,
    toggleField = rowattrToOptionToggleMap[fieldUpdated];
    getAttrs([fieldName, "repeating_spells_spell_options", "repeating_spells_spell_lvlstr", toggleField, "repeating_spells_sr", "repeating_spells_SP-mod", "repeating_spells_savedc"], function (v) {
        var optionText = v["repeating_spells_spell_options"],
        newValue = "",
        setter = {};
        //make sure we are not updating from compendium
        //this works it is just fast enough that it will not do anything since importFromCompendium is not done.
        if ((!v["repeating_spells_spell_lvlstr"]) && optionText) {
            try {
                //TAS.debug("PFSpellOptions.updateSpellOption, field: "+ fieldUpdated,v);
                newValue = v[fieldName] || "";
                if (parseInt(v[toggleField],10) === 1) {
                    //TAS.debug"made it inside toggleField");
                    switch (fieldUpdated) {
                        case 'school':
                            optionText = optionText.replace(optionTemplateRegexes.school, optionTemplates.school);//.replace("REPLACE", SWUtils.escapeForRollTemplate(newValue)));
                            break;
                        case 'cast-time':
                            if ( !newValue || (/1\s+(S\.A\.|standard action)/i).test( newValue )){
                                optionText = PFUtils.deleteOption(optionText, "casting_time", optionTemplateRegexes);
                            } else {
                                optionText = optionText.replace(optionTemplateRegexes.casting_time, optionTemplates.casting_time);//.replace("REPLACE", SWUtils.escapeForRollTemplate(newValue)));
                            }
                            break;
                        case 'components':
                            optionText = optionText.replace(optionTemplateRegexes.components, optionTemplates.components);//.replace("REPLACE", SWUtils.escapeForRollTemplate(newValue)));
                            break;
                        case 'duration':
                            optionText = optionText.replace(optionTemplateRegexes.duration, optionTemplates.duration);//replace("REPLACE", SWUtils.escapeForRollTemplate(newValue)));
                            break;
                        case 'range':
                            optionText = optionText.replace(optionTemplateRegexes.range, optionTemplates.range);//.replace("REPLACE", SWUtils.escapeForRollTemplate(newValue)));
                            break;
                        case 'targets':
                            optionText = optionText.replace(optionTemplateRegexes.targets, optionTemplates.targets);//.replace("REPLACE", SWUtils.escapeForRollTemplate(newValue)));
                            break;
                        case 'save':
                            if (PFUtils.shouldNotDisplayOption('saving_throw', newValue)) {
                                optionText = PFUtils.deleteOption(optionText, "saving_throw", optionTemplateRegexes);
                            } else {
                                optionText = optionText.replace(optionTemplateRegexes.saving_throw, optionTemplates.saving_throw);//.replace("REPLACE", SWUtils.escapeForRollTemplate(newValue)));
                            }
                            break;
                        case 'sr':
                            if (PFUtils.shouldNotDisplayOption('sr', newValue)) {
                                optionText = PFUtils.deleteOption(optionText, "sr", optionTemplateRegexes);
                            } else {
                                optionText = optionText.replace(optionTemplateRegexes.sr, optionTemplates.sr);//.replace("REPLACE", newValue));
                            }
                            break;
                        case 'damage-macro-text':
                            //TAS.debug("found damage macro-text="+newValue);
                            if (!newValue) {
                                optionText = PFUtils.deleteOption(optionText, "spelldamage", optionTemplateRegexes);
                            } else {
                                optionText = optionText.replace(optionTemplateRegexes.spelldamage, optionTemplates.spelldamage);//.replace("REPLACE", newValue));
                            }
                            break;
                        case 'damage-type':
                            //TAS.debug("found damage type"+newValue);
                            if (!newValue) {
                                optionText = PFUtils.deleteOption(optionText, "spelldamagetype", optionTemplateRegexes);
                            } else {
                                optionText = optionText.replace(optionTemplateRegexes.spelldamagetype, optionTemplates.spelldamagetype);//.spelldamagetype.replace("REPLACE", newValue));
                            }
                            break;
                        case 'sp-mod':
                            TAS.debug("found damage type"+newValue);
                            if (!newValue) {
                                optionText = PFUtils.deleteOption(optionText, "spellPen", optionTemplateRegexes);
                            } else {
                                optionText = optionText.replace(optionTemplateRegexes.spellPen, optionTemplates.spellPen);//.spelldamagetype.replace("REPLACE", newValue));
                            }
                    }
                    setter["repeating_spells_spell_options"] = optionText;
                    SWUtils.setWrapper(setter, {
                        silent: true
                    });
                }
            } catch (err){
                TAS.error("PFSpellOptions.updateSpellOption",err);
            }
        }
    });
}


/** getOptionText - resets entire @{spell_options} text for a spell row
 * if the field to update is one that is set by updateSpellOption, then need to set {{key=}} so it can find correct one to replace.
 *@param {string} id of row or null
 *@param {jsobj} eventInfo NOT USED
 *@param {object} toggleValues values from getAttrs of spell toggle option fields
 *@param {object} rowValues values from getAttrs of row attributes
 *@returns {string}
 */
export function getOptionText (id, eventInfo, toggleValues, rowValues) {
    var prefix = "repeating_spells_" + SWUtils.getRepeatingIDStr(id),
    customConcentration = parseInt(rowValues[prefix + "Concentration_misc"], 10) || 0,
    customCasterlevel = parseInt(rowValues[prefix + "CL_misc"], 10) || 0,
    classNum = parseInt(rowValues[prefix + "spellclass_number"], 10),
    spellLevel = parseInt(rowValues[prefix + "spell_level"], 10),
    spellSlot = parseInt(rowValues[prefix + "slot"], 10),
    casterlevel = parseInt(rowValues[prefix + "casterlevel"], 10),
    concentrationMod = parseInt(rowValues[prefix + "Concentration-mod"], 10),
    levelForConcentrate = (isNaN(spellSlot) || spellSlot === spellLevel) ? spellLevel : spellSlot,
    defDC = 15 + (levelForConcentrate * 2),
    defMod = parseInt(toggleValues["Concentration-" + classNum + "-def"], 10) || 0,
    optionText = "{{condition_note=@{condition_spell_notes}}}",
    newValue = "";
    //TAS.debug("getOptionText, defMod: " + defMod);
    if (isNaN(classNum) || isNaN(spellLevel)) {
        TAS.warn("cannot set options for spell! id:" + id + "  class or level are not numbers");
        return "{{condition_note=@{condition_spell_notes}}}";
    }
    if (toggleValues.showschool) {
        optionText += optionTemplates.school;//.replace("REPLACE", SWUtils.escapeForRollTemplate(rowValues[prefix + "school"]))||"";
    }
    if (toggleValues.showlevel) {
        optionText += optionTemplates.spellclass;//.replace("REPLACE", SWUtils.escapeForRollTemplate(rowValues[prefix + "spellclass"]))||"";
        optionText += optionTemplates.level;//.replace("REPLACE", spellLevel);
    }
    if (toggleValues.showcasting_time) {
        if (  !rowValues[prefix+"cast-time"] || (/1 (S\.A\.|standard action)/i).test( rowValues[prefix+"cast-time"])){
            optionText += "{{casting_time=}}";
        } else {
            optionText += optionTemplates.casting_time;//.replace("REPLACE", SWUtils.escapeForRollTemplate(rowValues[prefix + "cast-time"]))||"";
        }
    }
    if (toggleValues.showcomponents) {
        optionText += optionTemplates.components;//.replace("REPLACE", SWUtils.escapeForRollTemplate(rowValues[prefix + "components"]))||"";
    }
    if (toggleValues.showsaving_throw && toggleValues.showdc) { //checks to see if DC should be included
        newValue = rowValues[prefix + "save"] || "";
        if (PFUtils.shouldNotDisplayOption('saving_throw', newValue)) {
            optionText += "{{saving_throw=}}";
        } else {
            optionText += optionTemplates.saving_throw;//.replace("REPLACE", SWUtils.escapeForRollTemplate(newValue)||"");
        }
        optionText += optionTemplates.dc;//.replace("REPLACE", parseInt(rowValues[prefix + "savedc"], 10) || 0);
    }
    else {
        newValue = rowValues[prefix + "save"] || "";
        if (PFUtils.shouldNotDisplayOption('saving_throw', newValue)) {
            optionText += "{{saving_throw=}}";
        } else {
            optionText += optionTemplates.saving_throw; //.replace("REPLACE", SWUtils.escapeForRollTemplate(newValue)||"");
        }
        optionText += "{{dc=}}"; //.replace("REPLACE", parseInt(rowValues[prefix + "savedc"], 10) || 0);
    }
    if (toggleValues.showrange) {
        optionText += optionTemplates.range_pick;//.replace("REPLACE", rowValues[prefix + "range_pick"] || "blank")||"";
        optionText += optionTemplates.range;//.replace("REPLACE", parseInt(rowValues[prefix + "range_numeric"], 10) || 0)||"";
        optionText += optionTemplates.rangetext;//.replace("REPLACE", SWUtils.escapeForRollTemplate(rowValues[prefix + "range"] || "")||"");
    }
    if (toggleValues.showtargets) {
        optionText += optionTemplates.targets;//.replace("REPLACE", SWUtils.escapeForRollTemplate(rowValues[prefix + "targets"])||"");
    }
    if (toggleValues.showduration) {
        optionText += optionTemplates.duration;//.replace("REPLACE", SWUtils.escapeForRollTemplate(rowValues[prefix + "duration"])||"");
    }
    if (toggleValues.showsr) {
        newValue = rowValues[prefix + "sr"] || "";
        if (PFUtils.shouldNotDisplayOption('sr', newValue)) {
            optionText += "{{sr=}}";
        } else {
            optionText += optionTemplates.sr;//.replace("REPLACE", newValue)||"";
        }
        newValue = parseInt(rowValues[prefix+"SP-mod"],10)||0;
        if(newValue){
            optionText += optionTemplates.spellPen;
        } else {
            optionText += "{{spellPen=}}";
        }
    }
    if (toggleValues.showcasterlevel && customCasterlevel) {
        optionText += optionTemplates.casterlevel;//.replace("REPLACE", casterlevel)||"";
    } else {
        optionText += "{{casterlevel=}}";
    }
    if (toggleValues.showcasterlevel) {
        optionText += optionTemplates.casterlevel;//.replace("REPLACE", casterlevel)||"";
    }
    if (toggleValues.showcasterlevel_check) {
        optionText += optionTemplates.casterlevel_chk;//.replace("REPLACE", casterlevel)||"";
    }
    if (toggleValues.showspellpen_check) {
        optionText += optionTemplates.spellPen_chk;
    }
    if (toggleValues.showcasterlevel || toggleValues.showcasterlevel_check) {
        newValue = parseInt(rowValues[prefix + "SP-mod"], 10) || 0;
        if (newValue === 0) {
            optionText += optionTemplates.spellPen;//.replace("REPLACE", newValue)||"";
        }
    }
    if (toggleValues.showconcentration && (customConcentration || customCasterlevel)) {
        optionText += optionTemplates.Concentration;//.replace("REPLACE", concentrationMod)||"";
    } else {
        optionText += "{{Concentration=}}";
    }
    if (toggleValues.showconcentration_check && toggleValues.showcasterlevel) {
        optionText += optionTemplates.Concentration;//.replace("REPLACE", concentrationMod)||"";
    }
    if (toggleValues.showconcentration_check) {
        optionText += optionTemplates.Concentration_chk;//.replace("REPLACE", concentrationMod)||"";
    }
    if ((toggleValues.showconcentration || toggleValues.showconcentration_check) && toggleValues.showdc) { //checks to see if DC should be included
        if (defMod > 0) {
            optionText += optionTemplates.cast_def.replace("REPLACE", defMod)||"";
        } else {
            optionText += "{{cast_def=}}";
        }
        optionText += optionTemplates.cast_defDC.replace("REPLACE", defDC)||"";
    }
    else {
        if (defMod > 0) {
            optionText += optionTemplates.cast_def.replace("REPLACE", defMod) || "";
        } else {
            optionText += "{{cast_def=}}";
        }
        optionText += "{{cast_defDC=}}";
    }
    if (toggleValues.showdescription) {
        optionText += optionTemplates.description;//.replace("REPLACE", "@{description}")||"";
    }
    if (toggleValues.showspellnotes) {
        optionText += optionTemplates.spellnotes.replace("REPLACE", "@{spell-class-"+classNum+"-spells-notes}")||"";
    }
    if (toggleValues.showspell_fail_check) {
        optionText += optionTemplates.spell_fail_check;
        optionText += optionTemplates.spell_fail;
    }
    if (toggleValues.showdamage ) {
        if(rowValues[prefix+"damage-macro-text"]){
            optionText += optionTemplates.spelldamage;//.replace("REPLACE",(rowValues[prefix+"damage-macro-text"])||"");
        } else {
            optionText += "{{spelldamage=}}";
        }
        if (rowValues["damage-type"]){
            optionText += optionTemplates.spelldamagetype;//.replace("REPLACE", rowValues["damage-type"]||"");
        } else {
            optionText += "{{spelldamagetype=@{damage-type}}}";
        }
    } else {
        optionText += "{{spelldamage=}}{{spelldamagetype=@{damage-type}}}";
    }
    //TAS.debug("PFSpell.resetOption returning "+optionText);
    return optionText;
 }
/** resetOption updates repeating_spells_$X_spell_options
*@param {string} id id of row or null
*@param {jsobj} eventInfo NOT USED
*/
export function resetOption (id, eventInfo) {
    var prefix = "repeating_spells_" + SWUtils.getRepeatingIDStr(id),
    allFields;
    allFields = _.map(repeatingOptionAttrsToGet, function (field) {
        return prefix + field;
    }).concat(optionTogglesPlusOptionAttrs);
    getAttrs(allFields, function (v) {
        var toggleValues = _.chain(optionToggles).reduce(function (memo, attr) {
            memo['show' + attr.toLowerCase().slice(13).replace('_notes', '')] = (parseInt(v[attr], 10) || 0);
            return memo;
        }, {}).extend({
            "Concentration-0-def": (parseInt(v["Concentration-0-def"], 10) || 0),
            "Concentration-1-def": (parseInt(v["Concentration-1-def"], 10) || 0),
            "Concentration-2-def": (parseInt(v["Concentration-2-def"], 10) || 0)
        }).value(),
        optionText = "",
        setter = {};
        TAS.debug("PFSPellOptions.resetOption id : "+id,toggleValues);
        optionText = getOptionText(id, eventInfo, toggleValues, v)||"{{condition_note=@{condition_spell_notes}}}";
        //TAS.debug("resetOption","About to set",setter);
        setter["repeating_spells_" + SWUtils.getRepeatingIDStr(id) + "spell_options"] = optionText;
        SWUtils.setWrapper(setter, {
            silent: true
        });
    });
 }
/**resetOptions - updates repeating_spells_spell_options for all spells.
*@param {function} callback call when done
*@param {object} eventInfo NOT USED
*/
export function resetOptions (callback, eventInfo) {
    var done = _.once(function(){
        if (typeof callback === "function"){
            callback();
        }
    });
    getAttrs(optionTogglesPlusOptionAttrs, function (tv) {
        var toggleValues;
        try {
            TAS.debug("PFSpellOptions.resetOptions:",tv);
            toggleValues = _.chain(optionToggles).reduce(function (memo, attr) {
                //get word between toggle_spell_ and _notes
                memo['show' + attr.toLowerCase().slice(13).replace('_notes', '')] = (parseInt(tv[attr], 10) || 0);
                return memo;
            }, {}).extend({
                "Concentration-0-def": (parseInt(tv["Concentration-0-def"], 10) || 0),
                "Concentration-1-def": (parseInt(tv["Concentration-1-def"], 10) || 0),
                "Concentration-2-def": (parseInt(tv["Concentration-2-def"], 10) || 0)
            }).value();
            TAS.debug("PFSPellOptions.resetOptions: ",toggleValues);
            getSectionIDs("repeating_spells", function (ids) {
                var fields,prefixes;
                if (!ids || _.size(ids)===0){
                    done();
                    return;
                }
                prefixes = _.map(ids, function (id) {
                    return "repeating_spells_" + id + "_";
                });
                fields = SWUtils.cartesianAppend(prefixes,repeatingOptionAttrsToGet);
                getAttrs(fields, function (v) {
                    var setter = {};
                    _.each(ids, function (id) {
                        var optionText ='';
                        try {
                            optionText= getOptionText(id, eventInfo, toggleValues, v)||"{{condition_note=@{condition_spell_notes}}}";
                            //TAS.debug("setting option text for "+id+" to "+optionText);
                            setter["repeating_spells_" + id + "_spell_options"] = optionText;
                        } catch (innererr){
                            TAS.error("PFSpellOptions.resetOptions error on id "+id+", innererr",innererr);
                        }
                    });
                    if(_.size(setter)>0){
                        SWUtils.setWrapper(setter,PFConst.silentParams,done);
                    } else {
                        done();
                    }
                });
            });
        } catch (outererr){
            TAS.error("PFSpellOptions.resetOptions outererr:",outererr);
            done();
        }
    });
}
export var recalculate = TAS.callback(function PFSpellOptionsRecalculate(callback) {
    resetOptions(callback);
});

function registerEventHandlers () {
    //spell options for one row
    _.each(events.spellOptionEventsPlayer, function (fieldToWatch) {
        var eventToWatch = "change:repeating_spells:" + fieldToWatch;
        on(eventToWatch, TAS.callback(function eventOptionsRepeatingSpellsPlayer(eventInfo) {
            if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
                TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                updateSpellOption(eventInfo, fieldToWatch);
            }
        }));
    });
    //update the spell options
    _.each(optionToggles, function (toggleField) {
        on("change:" + toggleField, TAS.callback(function toggleSpellOptionField(eventInfo) {
            if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
                TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                resetOptions(null, eventInfo);
            }
        }));
    });
}
registerEventHandlers();
//PFConsole.log('   PFSpellOptions module loaded   ');
//PFLog.modulecount++;


