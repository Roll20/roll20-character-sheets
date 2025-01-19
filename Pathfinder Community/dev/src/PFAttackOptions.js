'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils  from './PFUtils';

var optionTemplates = {
    melee_notes: "{{melee_notes=REPLACE}}",
    ranged_notes: "{{ranged_notes=REPLACE}}",
    CMB_notes: "{{CMB_notes=REPLACE}}",
    attack_notes: "{{attack_notes=REPLACE}}",
    header_image: "{{header_image=REPLACE}}"
},
optionDefaults = {
    notes: {
        melee: "@{melee-attack-notes}",
        ranged: "@{ranged-attack-notes}",
        CMB: "@{CMB-notes}",
        attack: "@{attack-notes}",
        dual: "@{melee-attack-notes}"
    },
    image: {
        melee: "@{header_image-pf_attack-melee}",
        ranged: "@{header_image-pf_attack-ranged}",
        CMB: "@{header_image-pf_attack-cmb}",
        dual: "@{header_image-pf_attack-dual}"
    }
},
//not used since melee options field actually look at the text..
//optionAttrs = ["melee-attack-notes", "ranged-attack-notes", "CMB-notes", "attack-notes", "header_image-pf_attack-melee", "header_image-pf_attack-ranged", "header_image-pf_attack-cmb"],
optionToggles = ["toggle_attack_melee_notes", "toggle_attack_ranged_notes", "toggle_attack_CMB_notes", "toggle_attack_attack_notes", "toggle_attack_header_image"],
optionMacros = ["toggle_global_attack_macro_insert","toggle_global_cmb_macro_insert","toggle_global_ranged_macro_insert","toggle_global_melee_macro_insert",
    "toggle_global_damage_macro_insert","toggle_global_cmb_damage_macro_insert","toggle_global_damage_ranged_macro_insert","toggle_global_melee_damage_macro_insert",
    "global_attack_macro_insert","global_cmb_macro_insert","global_ranged_macro_insert","global_melee_macro_insert",
    "global_damage_macro_insert","global_cmb_damage_macro_insert","global_damage_ranged_macro_insert","global_melee_damage_macro_insert"],
//attackOptionRegex = PFUtils.getOptionsCompiledRegexMap(optionTemplates),
repeatingOptionAttrs = ["attack-type", "damage-ability", "damage-dice-num","damage-die","damage","attack"],
repeatingOptionHelperAttrs = [""],// ["damage-mod", "attack-mod"],
repeatingOptionGetAttrs = repeatingOptionAttrs.concat(repeatingOptionHelperAttrs),
repeatingOptionGetAttrsLU = _.map(repeatingOptionGetAttrs,function(field){return '_'+field;}),
events = {
    attackOptionEventsPlayer: repeatingOptionAttrs,
    attackOptionEventsAuto: repeatingOptionHelperAttrs
};


/********* REPEATING WEAPON FIELDSET *********/
/** getOptionText - resets entire macro options text for a repeating_weapon row
 *@param {string} prefix repeating_weapon_id_
 *@param {map} toggleValues map of ".showxxxx" where xxxx is what to display, already calculated for us
 *@param {map} rowValues output from getAttrs
 */
export function getOptionText  (prefix, toggleValues, rowValues) {
    var
    attackType = PFUtils.findAbilityInString(rowValues[prefix + "attack-type"]),
    damageAbility = PFUtils.findAbilityInString(rowValues[prefix + "damage-ability"]),
    optionText = "{{buff_note=@{buff_attack_notes}}} {{condition_note=@{condition_attack_notes}}}";
    if (attackType!=='dual' && !(attackType || rowValues[prefix + "attack"] )) {
        optionText += " {{no_attack_roll=1}}";
    } else if (attackType){
        if(attackType!=='dual'){
            attackType = attackType.replace('attk-','').replace('2', '')||"";
        }
        if(toggleValues['show'+attackType.toLowerCase()]){
            optionText += " ";
            optionText += optionTemplates[attackType + "_notes"].replace("REPLACE", optionDefaults.notes[attackType])||"";
        }
    }
    if (toggleValues.showheader_image) {
        optionText += " ";
        optionText += optionTemplates.header_image.replace("REPLACE", optionDefaults.image[attackType||'melee'])||"";
    }
    if (attackType!=='dual' && !(damageAbility || rowValues[prefix + "damage"] ||
        (parseInt(rowValues[prefix + "damage-dice-num"], 10) && parseInt(rowValues[prefix + "damage-die"], 10)))) {
        optionText += " {{no_damage=1}}";
    }
    if (toggleValues.showattack) {
        optionText += " ";
        optionText += optionTemplates.attack_notes.replace("REPLACE", optionDefaults.notes.attack)||"";
    }
    return optionText;
}
/* resets one row of repeating_weapons
 * note this is almost exactly like resetOption suggesting there is a way to refactor these*/
export function resetOption (id, eventInfo, callback) {
    var done = _.once(function(){
        //TAS.debug("leaving PFAttackOptions.resetOption, rowid: "+ id);
        if (typeof callback === "function"){
            callback();
        }
    }),
    prefix = "repeating_weapon_" + SWUtils.getRepeatingIDStr(id),
    rowfields = _.map(repeatingOptionGetAttrs, function (attr) {
        return prefix + attr;
    }),
    allFields = optionToggles;
    allFields = allFields.concat(rowfields);
    allFields.push(prefix + "macro_options");
    //TAS.log("resetOption, fields to get",allFields);
    getAttrs(allFields, function (v) {
        var toggleValues = _.reduce(optionToggles, function (memo, attr) {
            memo['show' + attr.toLowerCase().slice(14).replace('_notes', '')] = (parseInt(v[attr], 10) || 0);
            return memo;
        }, {}),
        optionText = "",
        setter = {};
        optionText = getOptionText(prefix, toggleValues, v)||"";
        if ( optionText !== v[prefix + "macro_options"]) {
            setter[prefix + "macro_options"] = optionText;
        }
        if (_.size(setter) > 0) {
            SWUtils.setWrapper(setter, PFConst.silentParams, done);
        } else {
            done();
        }
    });
}
export function resetSomeOptions (ids,eventInfo,callback){
    var done=_.once(function(){
        if (typeof callback === 'function'){
            callback();
        }
    });
    if(!(ids && _.size(ids))){
        done();
        return;
    }
    getAttrs(optionToggles,function(vout){
        var fields,
        toggleValues = _.reduce(optionToggles, function (memo, attr) {
            memo['show' + attr.toLowerCase().slice(14).replace('_notes', '')] = (parseInt(vout[attr], 10) || 0);
            return memo;
        }, {});
        fields = SWUtils.cartesianAppend(["repeating_weapon_"],ids,repeatingOptionGetAttrsLU);
        fields = fields.concat(SWUtils.cartesianAppend(["repeating_weapon_"],ids,["_macro_options"]));
        getAttrs(fields,function(v){
            var setter = _.reduce(ids,function(memo,id){
                var prefix='repeating_weapon_'+id+'_',tempstr='';
                try{
                    tempstr = getOptionText(prefix,toggleValues,v);
                    //tempstr= getOptionTextNew(prefix,toggleValues,v)||'';
                    if(tempstr!== v[prefix+'macro_options']){
                        memo[prefix+'macro_options']=tempstr;
                    }
                } finally {
                    return memo;
                }
            },{});
            if(_.size(setter)){
                SWUtils.setWrapper(setter,PFConst.silentParams,done);
            } else {
                done();
            }
        });
    });
}
/*resetOptions - updates repeating_weapon_ attack _options for all attacks.*/
export function resetOptions (callback,eventInfo) {
    getSectionIDs("repeating_weapon", function (ids) {
        resetSomeOptions(ids,eventInfo,callback);
    });
}
export function migrate (callback){
    if (typeof callback === "function"){
        callback();
    }
}
export var recalculate = TAS.callback(function callPFAttackOptionsRecalculate (callback) {
    resetOptions(callback);
});
function registerEventHandlers () {
    _.each(optionToggles, function (toggleField) {
        on("change:" + toggleField, TAS.callback(function toggleAttackNoteOption(eventInfo) {
            if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
                TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                resetOptions(null,eventInfo);
            }
        }));
    });
    //attack options for one row
    _.each(events.attackOptionEventsAuto, function (fieldToWatch) {
        var eventToWatch = "change:repeating_weapon:" + fieldToWatch;
        on(eventToWatch, TAS.callback(function eventUpdateAttackTypeOptionSheet(eventInfo) {
            if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api") {
                TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                resetOption(null, eventInfo);
            }
        }));
    });
    _.each(events.attackOptionEventsPlayer, function (fieldToWatch) {
        var eventToWatch = "change:repeating_weapon:" + fieldToWatch;
        on(eventToWatch, TAS.callback(function eventUpdateAttackTypeOptionPlayer(eventInfo) {
            if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
                TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                resetOption(null, eventInfo);
            }
        }));
    });
}
registerEventHandlers();
