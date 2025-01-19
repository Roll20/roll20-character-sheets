'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils  from './PFUtils';
import * as PFUtilsAsync from './PFUtilsAsync';

/** splitMacro Splits macro into {{x=y}} components
 * and @{attr} if at top level (not inside a {{x=@{attr}}})
 * @param {string} macrostr the macro-text from a repeating row
 * @returns {Array} of strings comprising macro
 */
function splitMacro (macrostr){
    var splitted,newsplit,lastclosing,temparray;
    if (!macrostr) {return "";}
    splitted = macrostr.split(/(?=\{\{)|(?=\&\{)|(?=\|\|)/);
    splitted = SWUtils.trimBoth(splitted);
    newsplit = _.reduce(splitted,function(memo,val){
        try {
            if (val.slice(0,2)==='{{') {
                if (val.slice(-2)==='}}'){
                    memo.push(val);
                } else {
                    lastclosing= val.lastIndexOf('}}');
                    if (lastclosing <0){
                        TAS.error ("error! no closing brackets for ",val);
                        //just fix it
                        val += '}}';
                        lastclosing= val.lastIndexOf('}}');
                        memo.push(val);
                    } else {
                        memo.push(SWUtils.trimBoth(val.slice(0,lastclosing+2)));
                        memo=memo.concat(SWUtils.trimBoth(SWUtils.trimBoth(val.slice(lastclosing+2)).replace('&amp;','&').split(/(?=[\@\&]\{)/)));
                    }
                }
            } else if (val.slice(0,2)==='&{'){
                val=val.replace('&amp;','&');
                memo=memo.concat(SWUtils.trimBoth(val.split(/(?=[\@\&]\{)/)));
            } else if (val.slice(0,2)==='||'){
                if(SWUtils.trimBoth(val)!=='||'){
                    val=val.replace('&amp;','&');
                    temparray=SWUtils.trimBoth(val.split(/(?=[\@\&]\{)/));
                    if (temparray[0]==='||'){
                        //skip first one
                        temparray = temparray.slice(1);
                    } else if (temparray[0].slice(-2)!=='||'){
                        //only add || to end of first one
                        temparray[0]= temparray[0]+'||';
                    }
                    memo=memo.concat(temparray);
                }
            } else {
                val=val.replace('&amp;','&');
                memo=memo.concat(SWUtils.trimBoth(val.split(/(?=[\@\&]\{)/)));
            }
        } catch (err){
            TAS.error("splitmacro",err);
        } finally {
            return memo;
        }
    },[]);
    return newsplit;
}

export function getTracking(macrostr){
    var trackArray=[],entries=[],last;
    try {
        //TAS.debug("PFMacros.getTracking on" ,macrostr);
        entries = splitMacro(macrostr);
        TAS.debug("PFMacros.getTracking array is ",entries);
        if(entries && _.size(entries) ){
            trackArray = entries.filter(function(entry){
                return (/^\{\{[a-z]+tracking\d+=/i).test(entry);
            }).concat(entries.filter(function(entry){
                if (entry.slice(0,1)!=='{{' && entry.indexOf('||')>=0){
                    return 1;
                }
                return 0;
            }));
        }
        TAS.debug("PFMacros.getTracking tracking is ",trackArray);
    } catch (err){
        TAS.error("PFMacros.getTracking error",err);
    } finally {
        return trackArray;
    }
}

// row-only: check macro-text for @{ability_type2} and updates macrotext if not
export function checkAbilityType2Row (eventInfo) {
  const rowid = eventInfo.sourceAttribute.split('_')[2];
  getAttrs(['repeating_ability_macro-text', 'repeating_ability_ability_type2', 'repeating_ability_rule_category'],
    function (values) {
      const update = {};
        const macroText = values['repeating_ability_macro-text'];
        const abilityType2 = values['repeating_ability_ability_type2'];
        const ruleCategory = values['repeating_ability_rule_category'];
        const featOrTraitCheck = /feats/g.test(ruleCategory) || /traits/g.test(ruleCategory) ? 1 : 0;
        let macroTextReplaced = '';
            TAS.debug(`~~~ id:${rowid} featOrTraitCheck:${featOrTraitCheck} ability_type2:${abilityType2} ~~~`);
        if (featOrTraitCheck === 0) {
          if (/{{subtitle=.*{@{rule_category}} - @{ability_type2}}}/g.test(macroText)) {
            macroTextReplaced = macroText.replace(
              /{{subtitle=.*{@{rule_category}} - @{ability_type2}}}/g,
              '{{subtitle=^{@{rule_category}}}}'
            );
            update['repeating_ability_' + rowid + '_macro-text'] = macroTextReplaced;
            // TAS.debug('macro-text updated for repeating_ability_' + rowid + '_macro-text: ' + macroTextReplaced);
          }
        } else if (featOrTraitCheck === 1 && abilityType2 !== '') {
          if (/{{subtitle=.*@{rule_category}}}}/g.test(macroText)) {
            macroTextReplaced = macroText.replace(
              /{{subtitle=.*@{rule_category}}}}/g,
              '{{subtitle=^{@{rule_category}} - @{ability_type2}}}'
            );
            update['repeating_ability_' + rowid + '_macro-text'] = macroTextReplaced;
            // TAS.debug('macro-text updated for repeating_ability_' + rowid + '_macro-text: ' + macroTextReplaced);
          }
        }
      setAttrs(update, {silent: true});
    }
  );
}

// one-time update to check macro-text for @{ability_type2} and updates macrotext if not
export function checkAbilityType2 () {
    getSectionIDs('repeating_ability', function (idarray) {
        const fieldnames = [];
        _.each(idarray, function (rowid) {
            fieldnames.push('repeating_ability_' + rowid + '_macro-text',
                            'repeating_ability_' + rowid + '_ability_type2',
                            'repeating_ability_' + rowid + '_rule_category');
        });
        getAttrs([...fieldnames], function (values) {
            const update = {};
            _.each(idarray, function (rowid) {
                const macroText = values['repeating_ability_' + rowid + '_macro-text'];
                const abilityType2 = values['repeating_ability_' + rowid + '_ability_type2'];
                const ruleCategory = values['repeating_ability_' + rowid + '_rule_category'];
                const featOrTraitCheck = ((/feats/g.test(ruleCategory)) || (/traits/g.test(ruleCategory))) ? 1 : 0;
                let macroTextReplaced = "";
                    TAS.debug(`~~~ id:${rowid} featOrTraitCheck:${featOrTraitCheck} ability_type2:${abilityType2} ~~~`);
                if (featOrTraitCheck === 0) {
                    if (/{{subtitle=.*{@{rule_category}} - @{ability_type2}}}/g.test(macroText)) {
                        macroTextReplaced = macroText.replace(
                        /{{subtitle=.*{@{rule_category}} - @{ability_type2}}}/g,
                        '{{subtitle=^{@{rule_category}}}}'
                        );
                        update['repeating_ability_' + rowid + '_macro-text'] = macroTextReplaced;
                        TAS.debug('macro-text updated for repeating_ability_' + rowid + '_macro-text: ' + macroTextReplaced);
                    }
                } else if (featOrTraitCheck === 1 && abilityType2 !== '') {
                    if (/{{subtitle=.*@{rule_category}}}}/g.test(macroText)) {
                        macroTextReplaced = macroText.replace(/{{subtitle=.*@{rule_category}}}}/g,'{{subtitle=^{@{rule_category}} - @{ability_type2}}}');
                        update['repeating_ability_' + rowid + '_macro-text'] = macroTextReplaced;
                        TAS.debug('macro-text updated for repeating_ability_' + rowid + '_macro-text: ' + macroTextReplaced);
                    }
                }
            });
            setAttrs(update, {silent: true});
        });
    });
}

//one-time update that checks all repeating macro-text for scroll_desc and adds if not
export function checkScrollDescOLD () {
    getSectionIDs("repeating_ability", function(ids) {
        var fields = _.map(ids, function(id) {
            return "repeating_ability_" + id + "_macro-text"
        });
        getAttrs(fields, function(values) {
            _.each(ids, function(rowid, i) {
                var macroText = values["repeating_ability_" + rowid + "_macro-text"];
                if (!/{{scroll_desc=@{scroll-desc}}}/.test(macroText)) {
                    macroText = macroText.replace(/(&{template:[^}]+})/g,'$1 {{scroll_desc=@{scroll-desc}}}');
                    setAttrs({
                        ["repeating_ability_" + rowid + "_macro-text"]: macroText
                    })
                    TAS.debug("macro-text updated for repeating_ability_" + rowid + "_macro-text:" + macroText);
                }
            });
        });
    });

    getSectionIDs("repeating_weapon", function(ids) {
        var fields = _.map(ids, function(id) {
            return "repeating_weapon_" + id + "_macro-text"
        });
        getAttrs(fields, function(values) {
            _.each(ids, function(rowid, i) {
                var macroText = values["repeating_weapon_" + rowid + "_macro-text"];
                if (!/{{scroll_desc=@{scroll-desc}}}/.test(macroText)) {
                    macroText = macroText.replace(/(&{template:[^}]+})/g,'$1 {{scroll_desc=@{scroll-desc}}}');
                    setAttrs({
                        ["repeating_weapon_" + rowid + "_macro-text"]: macroText
                    })
                    TAS.debug("macro-text updated for repeating_weapon_" + rowid + "_macro-text:" + macroText);
                }
            });
        });
    });

    getSectionIDs("repeating_spells", function(ids) {
        var fields = _.map(ids, function(id) {
            return "repeating_spells_" + id + "_macro-text"
        });
        getAttrs(fields, function(values) {
            _.each(ids, function(rowid, i) {
                var macroText = values["repeating_spells_" + rowid + "_macro-text"];
                if (!/{{scroll_desc=@{scroll-desc}}}/.test(macroText)) {
                    macroText = macroText.replace(/(&{template:[^}]+})/g,'$1 {{scroll_desc=@{scroll-desc}}}');
                    setAttrs({
                        ["repeating_spells_" + rowid + "_macro-text"]:macroText
                    })
                    TAS.debug("macro-text updated for repeating_spells_" + rowid + "_macro-text:" + macroText);
                }
            });
        });
    });

    getSectionIDs("repeating_spells", function(ids) {
        var fields = _.map(ids, function(id) {
            return "repeating_spells_" + id + "_npc-macro-text"
        });
        getAttrs(fields, function(values) {
            _.each(ids, function(rowid, i) {
                var macroText = values["repeating_spells_" + rowid + "_npc-macro-text"];
                if (!/{{scroll_desc=@{scroll-desc}}}/.test(macroText)) {
                    macroText = macroText.replace(/(&{template:[^}]+})/g,'$1 {{scroll_desc=@{scroll-desc}}}');
                    setAttrs({
                        ["repeating_spells_" + rowid + "_npc-macro-text"]:macroText
                    })
                    TAS.debug("macro-text updated for repeating_spells_" + rowid + "_npc-macro-text:" + macroText);
                }
            });
        });
    });
}

//one-time update that checks all repeating macro-text for scroll_desc and adds if not
export function checkScrollDesc() {
  getSectionIDs('repeating_ability', (idAbility) => {
    getSectionIDs('repeating_weapon', (idWeapon) => {
      getSectionIDs('repeating_spells', (idSpells) => {
        getSectionIDs('repeating_spells', (idNPCSpells) => {
            const output = {};
            const attrsAbility = [];
            const attrsWeapon = [];
            const attrsSpells = [];
            const attrsNPCSpells = [];
            _.each(idAbility, (itemid) => {
                attrsAbility.push(`repeating_ability_${itemid}_macro-text`);
            });
            _.each(idWeapon, (itemid) => {
                attrsWeapon.push(`repeating_weapon_${itemid}_macro-text`);
            });
            _.each(idSpells, (itemid) => {
                attrsSpells.push(`repeating_spells_${itemid}_macro-text`);
            });
            _.each(idNPCSpells, (itemid) => {
                attrsNPCSpells.push(`repeating_spells_${itemid}_npc-macro-text`);
            });
            getAttrs([...idAbility, ...idWeapon, ...idSpells, ...idNPCSpells], (v) => {
                _.each(idAbility, (id) => {
                    let macroText = v['repeating_ability_' + id + '_macro-text'] || "";
                    if (!/{{scroll_desc=@{scroll-desc}}}/.test(macroText)) {
                    macroText = macroText.replace(/(&{template:[^}]+})/g, '$1 {{scroll_desc=@{scroll-desc}}}');
                    output['repeating_ability_' + id + '_macro-text'] = macroText;
                    TAS.debug('macro-text updated for repeating_ability_' + id + '_macro-text:' + macroText);
                    }
                });
                _.each(idWeapon, (id) => {
                    let macroText = v['repeating_weapon_' + id + '_macro-text'] || "";
                    if (!/{{scroll_desc=@{scroll-desc}}}/.test(macroText)) {
                    macroText = macroText.replace(/(&{template:[^}]+})/g, '$1 {{scroll_desc=@{scroll-desc}}}');
                    output['repeating_weapon_' + id + '_macro-text'] = macroText;
                    TAS.debug('macro-text updated for repeating_weapon_' + id + '_macro-text:' + macroText);
                    }
                });
                _.each(idSpells, (id) => {
                    let macroText = v['repeating_spells_' + id + '_macro-text'] || "";
                    if (!/{{scroll_desc=@{scroll-desc}}}/.test(macroText)) {
                    macroText = macroText.replace(/(&{template:[^}]+})/g, '$1 {{scroll_desc=@{scroll-desc}}}');
                    output['repeating_spells_' + id + '_macro-text'] = macroText;
                    TAS.debug('macro-text updated for repeating_spells_' + id + '_macro-text:' + macroText);
                    }
                });
                _.each(idNPCSpells, (id) => {
                    let macroText = v['repeating_spells_' + id + '_npc-macro-text'] || "";
                    if (!/{{scroll_desc=@{scroll-desc}}}/.test(macroText)) {
                    macroText = macroText.replace(/(&{template:[^}]+})/g, '$1 {{scroll_desc=@{scroll-desc}}}');
                    output['repeating_spells_' + id + '_npc-macro-text'] = macroText;
                    TAS.debug('macro-text updated for repeating_spells_' + id + '_npc-macro-text:' + macroText);
                    }
                });
            });
            setAttrs(output, {
            silent: true
            });
        });
      });
    });
  });
}

// one-time update to check base attack macro-text for "@{toggle_global" and adds it if not
export function checkBaseAttacks () {
    getAttrs(["Melee-Attack-macro", "Melee2-Attack-macro", "Ranged-Attack-macro", "Ranged2-Attack-macro", "CMB-Check-macro", "CMB2-Check-macro"], function(values) {
        var macroTextMelee = values['Melee-Attack-macro'],
        macroTextMelee2 = values['Melee2-Attack-macro'],
        macroTextRanged = values['Ranged-Attack-macro'],
        macroTextRanged2 = values['Ranged2-Attack-macro'],
        macroTextCMB = values['CMB-Check-macro'],
        macroTextCMB2 = values['CMB2-Check-macro'];

        if (/@{global/.test(macroTextMelee)) {
        macroTextMelee = macroTextMelee.replace(/@{global/g,'@{toggle_global');
            TAS.debug("~~~~~~~~~current macroTextMelee macro-text: " + macroTextMelee);
            setAttrs({
                ['Melee-Attack-macro']: macroTextMelee
            })
            TAS.debug("~~~~~~~~~@{Melee-Attack-macro} macro-text updated: " + macroTextMelee);
        }

        if (/@{global/.test(macroTextMelee2)) {
        macroTextMelee2 = macroTextMelee2.replace(/@{global/g,'@{toggle_global');
            TAS.debug("~~~~~~~~~current macroTextMelee2 macro-text: " + macroTextMelee2);
            setAttrs({
                ['Melee2-Attack-macro']: macroTextMelee2
            })
            TAS.debug("~~~~~~~~~@{Melee2-Attack-macro} macro-text updated: " + macroTextMelee2);
        }

        if (/@{global/.test(macroTextRanged)) {
        macroTextRanged = macroTextRanged.replace(/@{global/g,'@{toggle_global');
            TAS.debug("~~~~~~~~~current macroTextRanged macro-text: " + macroTextRanged);
            setAttrs({
                ['Ranged-Attack-macro']: macroTextRanged
            })
            TAS.debug("~~~~~~~~~@{Ranged-Attack-macro} macro-text updated: " + macroTextRanged);
        }

        if (/@{global/.test(macroTextRanged2)) {
        macroTextRanged2 = macroTextRanged2.replace(/@{global/g,'@{toggle_global');
            TAS.debug("~~~~~~~~~current macroTextRanged2 macro-text: " + macroTextRanged2);
            setAttrs({
                ['Ranged2-Attack-macro']: macroTextRanged2
            })
            TAS.debug("~~~~~~~~~@{Ranged2-Attack-macro} macro-text updated: " + macroTextRanged2);
        }

        if (/@{global/.test(macroTextCMB)) {
        macroTextCMB = macroTextCMB.replace(/@{global/g,'@{toggle_global');
            TAS.debug("~~~~~~~~~current macroTextCMB macro-text: " + macroTextCMB);
            setAttrs({
                ['CMB-Check-macro']: macroTextCMB
            })
            TAS.debug("~~~~~~~~~@{CMB-Check-macro} macro-text updated: " + macroTextCMB);
        }

        if (/@{global/.test(macroTextCMB2)) {
        macroTextCMB2 = macroTextCMB2.replace(/@{global/g,'@{toggle_global');
            TAS.debug("~~~~~~~~~current macroTextCMB2 macro-text: " + macroTextCMB2);
            setAttrs({
                ['CMB2-Check-macro']: macroTextCMB2
            })
            TAS.debug("~~~~~~~~~@{CMB2-Check-macro} macro-text updated: " + macroTextCMB2);
        }
    });
}