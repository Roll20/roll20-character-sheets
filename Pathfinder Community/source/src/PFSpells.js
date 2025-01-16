// 'use strict';
import _ from 'underscore';
import TAS from './TheAaronSheet.js';
import {PFLog, PFConsole} from './PFLog';
import PFConst from './PFConst';
import * as SWUtils from './SWUtils';
import * as PFUtils from './PFUtils';
import * as PFMigrate from './PFMigrate';
import * as PFMacros from './PFMacros';
import * as PFSpellOptions from './PFSpellOptions';
import * as PFAttackOptions from './PFAttackOptions';
import * as PFAttackGrid from './PFAttackGrid';
import * as PFAttacks from './PFAttacks';
// import on from '../stubs/on/index';
export let //spell levels for repeating spell sections
  spellLevels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  //for parsing: classes without their own spell lists plus bloodrager as sorcerer, whose list is not in compendium - hunter handled special
  classesUsingOtherSpellLists = {
    arcanist: 'wizard',
    investigator: 'alchemist',
    warpriest: 'cleric',
    skald: 'bard',
    bloodrager: 'sorcerer',
  };

export function resetCommandMacro(dummy, eventInfo, callback) {
  //TAS.debug("at PFSpells.resetCommandMacro");
  let done = _.once(function () {
      if (typeof callback === 'function') {
        callback();
      }
    }),
    repeatingSpellAttrs = ['spell_level', 'spellclass_number', 'name', 'school', 'slot', 'metamagic', 'used', 'isDomain', 'isMythic'],
    class0BaseMacro =
      '&{template:pf_block} @{toggle_spell_accessible} @{toggle_rounded_flag}{{font=@{apply_specfont_chat}@{use_specfont}}} {{scroll_desc=@{scroll-desc}}} {{color=@{rolltemplate_color}}} {{header_image=@{header_image-pf_block}}} {{character_name=@{character_name}}} {{character_id=@{character_id}}} {{subtitle}} {{name=@{spellclass-0-name} ^{spells}}} {{concentration=@{Concentration-0}}} {{casterlevel=@{spellclass-0-level-total}}} {{row01=**^{checks}**}} {{row02=[^{caster-level-check}](~@{character_id}|Spell-Class-0-CL-Check) [^{concentration-check}](~@{character_id}|Concentration-Check-0) [^{spell-failure}](~@{character_id}|Spell-Fail-Check)}}',
    class1BaseMacro =
      '&{template:pf_block} @{toggle_spell_accessible} @{toggle_rounded_flag}{{font=@{apply_specfont_chat}@{use_specfont}}} {{scroll_desc=@{scroll-desc}}} {{color=@{rolltemplate_color}}} {{header_image=@{header_image-pf_block}}} {{character_name=@{character_name}}} {{character_id=@{character_id}}} {{subtitle}} {{name=@{spellclass-1-name} ^{spells}}} {{concentration=@{Concentration-1}}} {{casterlevel=@{spellclass-1-level-total}}} {{row01=**^{checks}**}} {{row02=[^{caster-level-check}](~@{character_id}|Spell-Class-1-CL-Check) [^{concentration-check}](~@{character_id}|Concentration-Check-1) [^{spell-failure}](~@{character_id}|Spell-Fail-Check)}}',
    class2BaseMacro =
      '&{template:pf_block} @{toggle_spell_accessible} @{toggle_rounded_flag}{{font=@{apply_specfont_chat}@{use_specfont}}} {{scroll_desc=@{scroll-desc}}} {{color=@{rolltemplate_color}}} {{header_image=@{header_image-pf_block}}} {{character_name=@{character_name}}} {{character_id=@{character_id}}} {{subtitle}} {{name=@{spellclass-2-name} ^{spells}}} {{concentration=@{Concentration-2}}} {{casterlevel=@{spellclass-2-level-total}}} {{row01=**^{checks}**}} {{row02=[^{caster-level-check}](~@{character_id}|Spell-Class-2-CL-Check) [^{concentration-check}](~@{character_id}|Concentration-Check-2) [^{spell-failure}](~@{character_id}|Spell-Fail-Check)}}',
    npcClass0BaseMacro =
      '&{template:pf_block} @{toggle_spell_accessible} @{toggle_rounded_flag}{{font=@{apply_specfont_chat}@{use_specfont}}} {{scroll_desc=@{scroll-desc}}} {{color=@{rolltemplate_color}}} {{header_image=@{header_image-pf_block}}} {{character_name=@{character_name}}} {{character_id=@{character_id}}} {{subtitle}} {{name=^{npc} @{spellclass-0-name} ^{spells}}} {{concentration=@{Concentration-0}}} {{casterlevel=@{spellclass-0-level-total}}} {{row01=**^{checks}**}} {{row02=[^{caster-level-check}](~@{character_id}|Spell-Class-0-CL-Check) [^{concentration-check}](~@{character_id}|Concentration-Check-0) [^{spell-failure}](~@{character_id}|Spell-Fail-Check)}}',
    npcClass1BaseMacro =
      '&{template:pf_block} @{toggle_spell_accessible} @{toggle_rounded_flag}{{font=@{apply_specfont_chat}@{use_specfont}}} {{scroll_desc=@{scroll-desc}}} {{color=@{rolltemplate_color}}} {{header_image=@{header_image-pf_block}}} {{character_name=@{character_name}}} {{character_id=@{character_id}}} {{subtitle}} {{name=^{npc} @{spellclass-1-name} ^{spells}}} {{concentration=@{Concentration-1}}} {{casterlevel=@{spellclass-1-level-total}}} {{row01=**^{checks}**}} {{row02=[^{caster-level-check}](~@{character_id}|Spell-Class-1-CL-Check) [^{concentration-check}](~@{character_id}|Concentration-Check-1) [^{spell-failure}](~@{character_id}|Spell-Fail-Check)}}',
    npcClass2BaseMacro =
      '&{template:pf_block} @{toggle_spell_accessible} @{toggle_rounded_flag}{{font=@{apply_specfont_chat}@{use_specfont}}} {{scroll_desc=@{scroll-desc}}} {{color=@{rolltemplate_color}}} {{header_image=@{header_image-pf_block}}} {{character_name=@{character_name}}} {{character_id=@{character_id}}} {{subtitle}} {{name=^{npc} @{spellclass-2-name} ^{spells}}} {{concentration=@{Concentration-2}}} {{casterlevel=@{spellclass-2-level-total}}} {{row01=**^{checks}**}} {{row02=[^{caster-level-check}](~@{character_id}|Spell-Class-2-CL-Check) [^{concentration-check}](~@{character_id}|Concentration-Check-2) [^{spell-failure}](~@{character_id}|Spell-Fail-Check)}}',
    pcBaseMacro = [class0BaseMacro, class1BaseMacro, class2BaseMacro],
    npcBaseMacro = [npcClass0BaseMacro, npcClass1BaseMacro, npcClass2BaseMacro],
    resetToDefault = function (configV) {
      let attrs = [],
        i = 0;
      for (i = 0; i < 3; i++) {
        if (configV['spellclass-' + i + '-book'].slice(13) !== pcBaseMacro[i].slice(13)) {
          attrs['spellclass-' + i + '-book'] = pcBaseMacro[i];
        }
        if (configV['spellclass-' + i + '-book-npc'].slice(13) !== npcBaseMacro[i].slice(13)) {
          attrs['spellclass-' + i + '-book-npc'] = npcBaseMacro[i];
        }
      }
      if (_.size(attrs) > 0) {
        SWUtils.setWrapper(attrs, PFConst.silentParams, done);
      } else {
        done();
      }
    };
  getAttrs(
    [
      'spellclass-0-casting_type',
      'spellclass-1-casting_type',
      'spellclass-2-casting_type',
      'spellclass-0-hide_unprepared',
      'spellclass-1-hide_unprepared',
      'spellclass-2-hide_unprepared',
      'spellclass-0-book',
      'spellclass-1-book',
      'spellclass-2-book',
      'spellclass-0-book-npc',
      'spellclass-1-book-npc',
      'spellclass-2-book-npc',
      'spellclass-0-show_domain_spells',
      'spellclass-1-show_domain_spells',
      'spellclass-2-show_domain_spells',
      'spellmenu_groupby_school',
      'spellmenu_show_uses',
      'mythic-adventures-show',
    ],
    function (configV) {
      let isPrepared = [],
        showDomain = [],
        hideUnprepared = [],
        groupBySchool = 0,
        showUses = 0,
        usesMythic = 0;
      try {
        isPrepared = [
          parseInt(configV['spellclass-0-casting_type'], 10) === 2,
          parseInt(configV['spellclass-1-casting_type'], 10) === 2,
          parseInt(configV['spellclass-2-casting_type'], 10) === 2,
        ];
        showDomain = [
          parseInt(configV['spellclass-0-show_domain_spells'], 10) || 0,
          parseInt(configV['spellclass-1-show_domain_spells'], 10) || 0,
          parseInt(configV['spellclass-2-show_domain_spells'], 10) || 0,
        ];
        hideUnprepared = [
          parseInt(configV['spellclass-0-hide_unprepared'], 10) || 0,
          parseInt(configV['spellclass-1-hide_unprepared'], 10) || 0,
          parseInt(configV['spellclass-2-hide_unprepared'], 10) || 0,
        ];
        groupBySchool = parseInt(configV['spellmenu_groupby_school'], 10) || 0;
        showUses = parseInt(configV['spellmenu_show_uses'], 10) || 0;
        usesMythic = parseInt(configV['mythic-adventures-show'], 10) || 0;
      } catch (outererr) {
        TAS.error('PFSpells.resetCommandMacro, error assembling global vars', outererr);
        done();
        return;
      }
      getSectionIDs('repeating_spells', function (idarray) {
        let attrs = {};
        //TAS.debug(idarray);
        if (!idarray || idarray.length === 0) {
          resetToDefault(configV);
          return;
        }
        getAttrs(['_reporder_repeating_spells'], function (repValues) {
          //TAS.debug("PFSpells.resetCommandMacro order repValues:",repValues);
          let spellAttrs;
          try {
            spellAttrs = _.chain(idarray)
              .map(function (id) {
                let prefix = 'repeating_spells_' + SWUtils.getRepeatingIDStr(id),
                  retVal = [];
                _.each(repeatingSpellAttrs, function (attr) {
                  retVal.push(prefix + attr);
                });
                return retVal;
              })
              .flatten()
              .value();
          } catch (errouter2) {
            TAS.error('PFSpells.resetCommandMacro errouter', errouter2);
            done();
            return;
          }
          getAttrs(spellAttrs, function (values) {
            //TAS.debug(values);
            let orderedList,
              repList,
              filteredIds,
              spellsByClass,
              npcSpellsArray,
              customSorted = 0,
              spellsPC,
              spellsNPC,
              i,
              groups = [],
              spellSchoolReg = /[^\(\[]*/,
              attrs = {},
              rollTemplateCounter = 0,
              tempstr;
            try {
              if (!_.isUndefined(repValues._reporder_repeating_spells) && repValues._reporder_repeating_spells !== '') {
                repList = repValues._reporder_repeating_spells.split(',');
                repList = _.map(repList, function (ID) {
                  return ID.toLowerCase();
                });
                orderedList = _.intersection(_.union(repList, idarray), idarray);
                customSorted = 1;
              } else {
                orderedList = idarray;
              }
              spellsByClass = _.chain(orderedList)
                .map(function (id) {
                  let prefix = '',
                    metaMagic = 0,
                    spellSlot = 0,
                    matches,
                    schoolForGroup = '',
                    levelstr = '',
                    rawlevel = 0,
                    spellClass = '',
                    classStr = '',
                    isDomain = 0,
                    isMythic = 0,
                    uses = 0,
                    name = '';
                  try {
                    prefix = 'repeating_spells_' + SWUtils.getRepeatingIDStr(id);
                    metaMagic = parseInt(values[prefix + 'metamagic'], 10) || 0;
                    spellSlot = metaMagic ? values[prefix + 'slot'] || values[prefix + 'spell_level'] : values[prefix + 'spell_level'];
                    schoolForGroup = values[prefix + 'school'] || '';
                    matches = spellSchoolReg.exec(values[prefix + 'school'] || '');
                    if (matches && matches[0]) {
                      schoolForGroup = SWUtils.trimBoth(matches[0]);
                      schoolForGroup = schoolForGroup[0].toUpperCase() + schoolForGroup.slice(1).toLowerCase();
                    }
                    levelstr = '^{level} ' + String(spellSlot);
                    rawlevel = parseInt(values[prefix + 'spell_level'], 10) || 0;
                    spellClass = parseInt(values[prefix + 'spellclass_number'], 10) || 0;
                    classStr = 'class' + (values[prefix + 'spellclass_number'] || '0');
                    isDomain = parseInt(values[prefix + 'isDomain'], 10) || 0;
                    isMythic = usesMythic * parseInt(values[prefix + 'isMythic'], 10) || 0;
                    uses = parseInt(values[prefix + 'used'], 10) || 0;
                    name = values[prefix + 'name'] || '';
                  } catch (errmap) {
                    TAS.error('PFSpells.resetCommandMacro errmap on id ' + id, errmap);
                  } finally {
                    return {
                      id: id,
                      level: spellSlot,
                      levelstr: levelstr,
                      rawlevel: rawlevel,
                      school: schoolForGroup,
                      spellClass: spellClass,
                      spellClassstr: classStr,
                      isDomain: isDomain,
                      isMythic: isMythic,
                      uses: uses,
                      name: name,
                    };
                  }
                })
                .omit(function (spellObj) {
                  return hideUnprepared[spellObj.spellClass] && isPrepared[spellObj.spellClass] && spellObj.uses === 0 && !(showDomain[spellObj.spellClass] && spellObj.isDomain);
                })
                .map(function (spellObj) {
                  let spellName = spellObj.name,
                    usesStr = '',
                    dstr = '',
                    mystr = '',
                    lvlstr = '',
                    spacestr = '';
                  try {
                    spellName = SWUtils.escapeForChatLinkButton(spellName);
                    spellName = SWUtils.escapeForRollTemplate(spellName);
                    spellName = SWUtils.trimBoth(spellName);
                    usesStr = showUses ? '(' + spellObj.uses + ')' : '';
                    if (showUses && isPrepared[spellObj.spellClass] && spellObj.isDomain) {
                      usesStr = '';
                    }
                    mystr = spellObj.isMythic ? '&#x1f11c;' : ''; //   // "&#x24A8;":"";//"(m)":"";//
                    dstr = spellObj.isDomain ? '&#x1f113;' : ''; // "";  //"&#x249F;":"";//"(d)":"";//
                    lvlstr = groupBySchool ? spellObj.level + ':' : '';
                    spacestr = usesStr || mystr || dstr ? ' ' : '';
                    spellName = ' [' + lvlstr + spellName + spacestr + dstr + mystr + usesStr + ']';
                  } catch (maperr) {
                    TAS.error('PFSpells.resetCommandMacro error creating link name:', maperr);
                  } finally {
                    spellObj.pcChatLink = spellName + '(~@{character_name}|repeating_spells_' + spellObj.id + '_roll)';
                    spellObj.npcChatLink = spellName + '(~@{character_id}|repeating_spells_' + spellObj.id + '_npc-roll)';
                    return spellObj;
                  }
                })
                .value();
              if (!customSorted) {
                spellsByClass = _.sortBy(spellsByClass, 'level');
              }
              spellsByClass = _.chain(spellsByClass)
                .groupBy('spellClassstr')
                .mapObject(function (classArray) {
                  return _.chain(classArray)
                    .sortBy(groupBySchool ? 'school' : 'levelstr')
                    .groupBy(groupBySchool ? 'school' : 'levelstr')
                    .value();
                })
                .value();

              //TAS.debug("#############################");
              //TAS.debug(spellsByClass);
              //TAS.debug("#############################");

              //was 2 sets of 3 reduces but can do this faster with 3 each loops and populating both at once
              spellsPC = {};
              spellsNPC = {};
              rollTemplateCounter = 10;
              _.each(spellsByClass, function (groupList, classGroup) {
                let pcstr = '',
                  npcstr = '';
                _.each(groupList, function (spellList, groupName) {
                  rollTemplateCounter++;
                  pcstr += ' {{row' + rollTemplateCounter + '=**' + groupName + '**}}';
                  npcstr += ' {{row' + rollTemplateCounter + '=**' + groupName + '**}}';
                  rollTemplateCounter++;
                  pcstr += ' {{row' + rollTemplateCounter + '=';
                  npcstr += ' {{row' + rollTemplateCounter + '=';
                  _.each(spellList, function (spellObj) {
                    pcstr += spellObj.pcChatLink;
                    npcstr += spellObj.npcChatLink;
                  });
                  pcstr += '}}';
                  npcstr += '}}';
                });
                spellsPC[classGroup] = pcstr;
                spellsNPC[classGroup] = npcstr;
              });
              //TAS.debug("#############################");
              //TAS.debug(spellsPC,spellsNPC);
              //TAS.debug("#############################");

              for (i = 0; i < 3; i++) {
                tempstr = pcBaseMacro[i] + spellsPC['class' + i];
                if (tempstr && configV['spellclass-' + i + '-book'].slice(13) !== tempstr.slice(13)) {
                  attrs['spellclass-' + i + '-book'] = tempstr;
                } else if (!tempstr && configV['spellclass-' + i + '-book'].slice(13) !== pcBaseMacro[i].slice(13)) {
                  attrs['spellclass-' + i + '-book'] = '';
                }
                tempstr = npcBaseMacro[i] + spellsNPC['class' + i];
                if (tempstr && configV['spellclass-' + i + '-book-npc'].slice(13) !== tempstr.slice(13)) {
                  attrs['spellclass-' + i + '-book-npc'] = tempstr;
                } else if (!tempstr && configV['spellclass-' + i + '-book-npc'].slice(13) !== npcBaseMacro[i].slice(13)) {
                  attrs['spellclass-' + i + '-book-npc'] = '';
                }
              }
              if (_.size(attrs) > 0) {
                SWUtils.setWrapper(attrs, PFConst.silentParams, done);
              } else {
                done();
              }
            } catch (err) {
              TAS.error('PFSpells.resetCommandMacro', err);
              done();
            }
          });
        });
      });
    },
  );
}

/** update spells if a user changes "uses" on spell row
 * @param {string} dummy normally id but not used
 * @param {map} eventInfo from event, not used
 * @param {function} callbackwhen done
 * @param {boolean} silently if you want to update silently
 */
function updateSpellsPerDay(dummy, eventInfo, callback, silently) {
  let done = _.once(function () {
      //TAS.debug("leaving PFSpells.updateSpellsPerDay");
      if (typeof callback === 'function') {
        callback();
      }
    }),
    fields = [
      'total_spells_manually',
      'repeating_spells_used',
      'repeating_spells_spellclass_number',
      'repeating_spells_spell_level',
      'repeating_spells_slot',
      'repeating_spells_metamagic',
    ];
  getAttrs(fields, function (v) {
    let classNum = 0,
      spellLevel,
      slot = 0,
      metamagic = 0,
      fieldname = '',
      fieldname2 = '',
      initialtot = {};
    try {
      //TAS.debug("PFSpells.updateSpellsPerDay: ",v);
      if (!parseInt(v.total_spells_manually, 10)) {
        spellLevel = parseInt(v.repeating_spells_spell_level, 10) || 0;
        //TAS.debug("total spells manually is off spellLEvel is "+spellLevel);
        classNum = parseInt(v.repeating_spells_spellclass_number, 10);
        if (isNaN(classNum)) {
          setAttrs({repeating_spells_spellclass_number: 0});
        }
        metamagic = parseInt(v.repeating_spells_metamagic, 10) || 0;
        if (metamagic) {
          slot = parseInt(v.repeating_spells_slot, 10);
          if (!isNaN(slot)) {
            spellLevel = slot;
          }
        }
        //now update the spells per day for the associated class idx and spell level
        fieldname = 'spellclass-' + classNum + '-level-' + spellLevel + '-spells-per-day';
        fieldname2 = 'spellclass-' + classNum + '-level-' + spellLevel + '-spells-prepared';
        initialtot[fieldname] = 0;
        initialtot[fieldname2] = 0;
        //TAS.debug("about to set "+fieldname+", and "+ fieldname2);
        TAS.repeating('spells')
          .attrs(fieldname, fieldname2)
          .fields('row_id', 'used', 'spell_level', 'metamagic', 'slot')
          .reduce(
            function (m, r) {
              try {
                if (r.I.spell_level === spellLevel || (r.I.metamagic && r.I.slot === spellLevel)) {
                  m += r.I.used;
                }
              } catch (innererr) {
                TAS.error('PFSpells.updateSpellsPerDay innererr', innererr);
              } finally {
                return m;
              }
            },
            0,
            function (m, r, a) {
              try {
                a.S[fieldname] = m;
                a.S[fieldname2] = m;
              } catch (erri) {
                TAS.error('ERROR calculating spells per day!', erri);
                if (a && a.I) {
                  a.I[fieldname] = m;
                  a.I[fieldname2] = m;
                }
              }
            },
          )
          .execute(done);
      } else {
        done();
      }
    } catch (erro) {
      TAS.error('PFSpells.updateSpellsPerDay  ERROR', erro, eventInfo);
    }
  });
}

function getSpellTotals(ids, v, setter) {
  let doNotProcess = 0,
    casterTypeMap = {spontaneous: 1, prepared: 2},
    casterTypes = [0, 0, 0],
    totalPrepped = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    totalListed = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  try {
    doNotProcess = parseInt(v.total_spells_manually, 10) || 0;
    casterTypes[0] = parseInt(v['spellclass-0-casting_type'], 10) || 0;
    if (parseInt(v.spellclasses_multiclassed, 10)) {
      casterTypes[1] = parseInt(v['spellclass-1-casting_type'], 10) || 0;
      casterTypes[2] = parseInt(v['spellclass-2-casting_type'], 10) || 0;
    }
    _.each(ids, function (id) {
      let prefix = 'repeating_spells_' + SWUtils.getRepeatingIDStr(id),
        spellLevel,
        classNum = 0,
        metamagic = 0,
        slot,
        uses = 0;
      try {
        spellLevel = parseInt(v[prefix + 'spell_level'], 10) || 0;
        classNum = parseInt(v[prefix + 'spellclass_number'], 10);
        if (isNaN(classNum)) {
          classNum = 0;
          setter[prefix + 'spellclass_number'] = 0;
        }
        metamagic = parseInt(v[prefix + 'metamagic'], 10) || 0;
        slot = parseInt(v[prefix + 'slot'], 10);
        if (isNaN(slot)) {
          setter[prefix + 'slot'] = spellLevel;
        } else if (metamagic && slot !== spellLevel) {
          spellLevel = slot;
        } else if (slot !== spellLevel) {
          slot = spellLevel;
          setter[prefix + 'slot'] = spellLevel;
        }
        totalListed[classNum][spellLevel] += 1;
        if (!doNotProcess) {
          uses = parseInt(v[prefix + 'used'], 10) || 0;
          totalPrepped[classNum][spellLevel] += uses;
        }
      } catch (err2) {
        TAS.error('PFSpells.getSpellTotals err2', err2);
      }
    });

    _.each(PFConst.spellClassIndexes, function (classidx) {
      _.each(spellLevels, function (spellLevel) {
        let prefix = 'spellclass-' + classidx + '-level-' + spellLevel,
          total = 0,
          prepped = 0,
          perday = 0;
        total = parseInt(v[prefix + '-total-listed'], 10) || 0;
        if (total !== totalListed[classidx][spellLevel]) {
          setter[prefix + '-total-listed'] = totalListed[classidx][spellLevel];
        }
        //prepped  = parseInt(v[prefix + "-spells-prepared"], 10) || 0;
        perday = parseInt(v[prefix + '-spells-per-day'], 10) || 0;
        if (casterTypes[classidx] > 0 && !doNotProcess) {
          //if (prepped !== totalPrepped[classidx][spellLevel]) {
          //    setter[prefix + "-spells-prepared"] = totalPrepped[classidx][spellLevel];
          //}
          if (perday !== totalPrepped[classidx][spellLevel]) {
            setter[prefix + '-spells-per-day'] = totalPrepped[classidx][spellLevel];
          }
        } else {
          //if (prepped !== 0){
          //    setter[prefix + "-spells-prepared"] =0;
          //}
          if (perday === 0) {
            setter[prefix + '-spells-per-day'] = 0;
          }
        }
      });
    });
  } catch (err) {
    TAS.error('PFSpells.getSpellTotals', err);
  } finally {
    return setter;
  }
}

export function resetSpellsTotals(dummy, eventInfo, callback, silently) {
  let done = _.once(function () {
    //TAS.debug("leaving PFSpells.resetSpellsTotals");
    if (typeof callback === 'function') {
      callback();
    }
  });
  getSectionIDs('repeating_spells', function (ids) {
    let fields = ['total_spells_manually', 'spellclasses_multiclassed', 'spellclass-0-casting_type', 'spellclass-1-casting_type', 'spellclass-2-casting_type'],
      rowattrs = ['spellclass_number', 'spell_level', 'slot', 'metamagic', 'used'];
    try {
      _.each(ids, function (id) {
        let prefix = 'repeating_spells_' + SWUtils.getRepeatingIDStr(id);
        _.each(rowattrs, function (attr) {
          fields.push(prefix + attr);
        });
      });
      _.each(PFConst.spellClassIndexes, function (classidx) {
        _.each(spellLevels, function (spellLevel) {
          fields.push('spellclass-' + classidx + '-level-' + spellLevel + '-total-listed');
          fields.push('spellclass-' + classidx + '-level-' + spellLevel + '-spells-prepared');
          fields.push('spellclass-' + classidx + '-level-' + spellLevel + '-spells-per-day');
        });
      });
      getAttrs(fields, function (v) {
        let setter = {};
        try {
          setter = getSpellTotals(ids, v, setter);
          if (_.size(setter)) {
            SWUtils.setWrapper(setter, PFConst.silentParams, done);
          } else {
            done();
          }
        } catch (innererr) {
          TAS.error('PFSpells.resetSpellsTotals innererror:', innererr);
          done();
        }
      });
    } catch (err) {
      TAS.error('PFSpells.resetSpellsTotals:', err);
      done();
    }
  });
}

/* ******************************** REPEATING SPELL FUNCTIONS ********************************** */
function setAttackEntryVals(spellPrefix, weaponPrefix, v, setter, noName) {
  let notes = '',
    attackType = '';
  setter = setter || {};
  try {
    TAS.debug('UPDATING SPELL ATTACK: ' + spellPrefix, v);
    attackType = PFUtils.findAbilityInString(v[spellPrefix + 'spell-attack-type']);
    if (v[spellPrefix + 'name']) {
      if (!noName) {
        setter[weaponPrefix + 'name'] = v[spellPrefix + 'name'];
      }
      setter[weaponPrefix + 'source-spell-name'] = v[spellPrefix + 'name'];
    }
    if (attackType) {
      setter[weaponPrefix + 'attack-type'] = v[spellPrefix + 'spell-attack-type'];
      if (/CMB/i.test(attackType)) {
        setter[weaponPrefix + 'vs'] = 'cmd';
      } else {
        setter[weaponPrefix + 'vs'] = 'touch';
      }
    }
    if (v[spellPrefix + 'range_numeric']) {
      setter[weaponPrefix + 'range'] = v[spellPrefix + 'range_numeric'];
    }
    if (v[spellPrefix + 'range'] && v[spellPrefix + 'range_pick'] === 'see_text') {
      notes += 'Range: ' + v[spellPrefix + 'range'];
    }

    if (v[spellPrefix + 'damage-macro-text']) {
      setter[weaponPrefix + 'precision_dmg_macro'] = v[spellPrefix + 'damage-macro-text'];
      if (attackType) {
        setter[weaponPrefix + 'critical_dmg_macro'] = v[spellPrefix + 'damage-macro-text'];
      }
    }
    if (v[spellPrefix + 'damage-type']) {
      setter[weaponPrefix + 'precision_dmg_type'] = v[spellPrefix + 'damage-type'];
      if (attackType) {
        setter[weaponPrefix + 'critical_dmg_type'] = v[spellPrefix + 'damage-type'];
      }
    }
    if (v[spellPrefix + 'save']) {
      notes += '\n**Save:** ' + v[spellPrefix + 'save'];
      if (!/none/.test(v[spellPrefix + 'save'])) {
        notes += ' **DC:** ' + v[spellPrefix + 'savedc'];
      }
    }
    if (v[spellPrefix + 'sr']) {
      if (notes) {
        notes += '';
      }
      notes += '\n**Spell Resistance:** ' + v[spellPrefix + 'sr'];
    }
    // include a link in the weapon notes to execute the spell from chat
    let toggle_attack_entry = v[spellPrefix + 'toggle_attack_entry'];
    if (toggle_attack_entry === 1) {
      if (v[spellPrefix + 'name']) {
        if (notes) {
          notes += '';
        }
        notes += `\n[${v[spellPrefix + 'name']}](\~@\{character_name\}|${spellPrefix}roll)`;
      }
    }
    if (toggle_attack_entry !== 1) {
      if (v[spellPrefix + 'name']) {
        if (notes) {
          notes += '';
        }
        notes += '';
      }
    }
    if (notes) {
      setter[weaponPrefix + 'notes'] = notes;
    }
  } catch (err) {
    TAS.error('PFSpells.setAttackEntryVals', err);
  } finally {
    return setter;
  }
}

/*Triggered from a button in repeating spells */
export function createAttackEntryFromRow(id, callback, silently, eventInfo, weaponId) {
  let done = _.once(function () {
      if (typeof callback === 'function') {
        callback();
      }
    }),
    attribList = [],
    itemId = '',
    idStr = '',
    item_entry = '',
    attributes = ['create-attack-entry', 'range_pick', 'range', 'range_numeric', 'damage-macro-text', 'damage-type', 'sr', 'savedc', 'save'],
    commonAttributes = ['spell-attack-type', 'name', 'toggle_attack_entry'];
  try {
    if (id == 'DELETED') {
      done();
      return;
    }
    itemId = id || (eventInfo ? SWUtils.getRowId(eventInfo.sourceAttribute) : '');
    idStr = SWUtils.getRepeatingIDStr(itemId);
    item_entry = 'repeating_spells_' + idStr;

    //TAS.debug("at PFSpells creatattack entry ");
    attributes.forEach(function (attr) {
      attribList.push(item_entry + attr);
    });
    commonAttributes.forEach(function (attr) {
      attribList.push(item_entry + attr);
    });
  } catch (erro) {
    TAS.error('PFSpells.createAttackEntryFromRow erro:', erro, id, eventInfo);
    done();
    return;
  }
  //TAS.debug("attribList=" + attribList);
  getAttrs(attribList, function (v) {
    let newRowId = '',
      setter = {},
      prefix = 'repeating_weapon_',
      idStr = '',
      spellexists = true,
      deletedspell = false,
      params = {};
    try {
      TAS.debug('PFSpells.createAttack ##### create attack linked from spell, using ', v);
      if (_.size(v) === 0) {
        spellexists = false;
      }

      TAS.debug('PFSpells.createAttack ##### spellexists = ' + spellexists);
      if (spellexists) {
        //TAS.debug("at PFSpells.createAttackEntryFromRow",v);
        if (!PFUtils.findAbilityInString(v[item_entry + 'spell-attack-type']) && !v[item_entry + 'damage-macro-text']) {
          TAS.warn('no attack to create for spell ' + v[item_entry + 'name'] + ', ' + itemId);
        } else {
          if (!weaponId) {
            newRowId = generateRowID();
          } else {
            newRowId = weaponId;
          }
          idStr = newRowId + '_';
          prefix += idStr;
          setter = setAttackEntryVals(item_entry, prefix, v, setter);
          setter[prefix + 'source-spell'] = itemId;
          setter[prefix + 'group'] = 'Spell';
          setter[prefix + 'link_type'] = PFAttacks.linkedAttackType.spell;
        }
      } else {
        if (weaponId) {
          setter['repeating_weapon_' + weaponId + '_source-spell'] = 'DELETED';
          deletedspell = true;
          TAS.debug('seting deletedspell to ' + deletedspell, setter);
        }
      }
    } catch (err) {
      TAS.error('PFSpells.createAttackEntryFromRow', err);
    } finally {
      if (deletedspell) {
        SWUtils.setWrapper(setter, PFConst.silentParams, done);
      } else if (_.size(setter) > 0) {
        setter[item_entry + 'create-attack-entry'] = 0;
        if (silently) {
          params = PFConst.silentParams;
        }
        SWUtils.setWrapper(setter, params, function () {
          //can do these in parallel
          PFAttackOptions.resetOption(newRowId);
          PFAttackGrid.resetCommandMacro();
          done();
        });
      } else {
        setter[item_entry + 'create-attack-entry'] = 0;
        SWUtils.setWrapper(setter, PFConst.silentParams, done);
      }
    }
  });
}

export function updateAssociatedAttack(id, callback, silently, eventInfo) {
  let done = _.once(function () {
      if (typeof callback === 'function') {
        callback();
      }
    }),
    itemId = '',
    item_entry = '',
    attrib = '',
    attributes = [];
  try {
    itemId = id || (eventInfo ? SWUtils.getRowId(eventInfo.sourceAttribute) : '');
    item_entry = 'repeating_spells_' + SWUtils.getRepeatingIDStr(itemId);
    attributes = [
      item_entry + 'range_pick',
      item_entry + 'range',
      item_entry + 'range_numeric',
      item_entry + 'damage-macro-text',
      item_entry + 'damage-type',
      item_entry + 'sr',
      item_entry + 'savedc',
      item_entry + 'save',
      item_entry + 'spell-attack-type',
      item_entry + 'name',
      item_entry + 'toggle_attack_entry',
    ];
    /*
        attrib = (eventInfo ? SWUtils.getAttributeName(eventInfo.sourceAttribute) : "");
        if (attrib){
            attributes = [item_entry+attrib];
            if ((/range/i).test(attrib)){
                attributes =[item_entry+'range_pick',item_entry+'range',item_entry+'range_numeric'];
            }
        } else {
            attributes = ["range_pick", "range", "range_numeric", "damage-macro-text", "damage-type", "sr", "savedc", "save", "spell-attack-type", "name"];
        }
        */
  } catch (erro) {
    TAS.error('PFSpells.updateAssociatedAttack erro', erro, id, eventInfo);
    done();
    return;
  }
  getAttrs(attributes, function (spellVal) {
    getSectionIDs('repeating_weapon', function (idarray) {
      // get the repeating set
      let spellsourcesFields = [];
      spellsourcesFields = _.reduce(
        idarray,
        function (memo, currentID) {
          memo.push('repeating_weapon_' + currentID + '_source-spell');
          return memo;
        },
        [],
      );
      getAttrs(spellsourcesFields, function (v) {
        let setter = {},
          params = {},
          idlist = [];
        try {
          _.each(idarray, function (currentID) {
            let prefix = 'repeating_weapon_' + currentID + '_';
            if (v[prefix + 'source-spell'] === itemId) {
              idlist.push(currentID);
              setter = setAttackEntryVals(item_entry, prefix, spellVal, setter, true);
            }
          });
          if (silently) {
            params = PFConst.silentParams;
          }
        } catch (err) {
          TAS.error('PFSpells.updateAssociatedAttack', err);
        } finally {
          if (_.size(setter) > 0) {
            SWUtils.setWrapper(setter, params, function () {
              PFAttackOptions.resetSomeOptions(idlist);
            });
          } else {
            done();
          }
        }
      });
    });
  });
}

function updatePreparedSpellState(id, eventInfo) {
  getAttrs(
    [
      'repeating_spells_used',
      'repeating_spells_spellclass_number',
      'repeating_spells_prepared_state',
      'spellclass-0-hide_unprepared',
      'spellclass-1-hide_unprepared',
      'spellclass-2-hide_unprepared',
    ],
    function (values) {
      let uses = parseInt(values.repeating_spells_used, 10) || 0,
        preparedState = parseInt(values.repeating_spells_prepared_state, 10) || 0,
        classnum = values['repeating_spells_spellclass_number'],
        isPrepared = (parseInt(values['spellclass-' + classnum + '-casting_type'], 10) || 0) === 2 ? 1 : 0,
        hideUnprepared = isPrepared * (parseInt(values['spellclass-' + classnum + '-hide_unprepared'], 10) || 0),
        setter = {};
      if (uses > 0 && preparedState === 0) {
        setter['repeating_spells_prepared_state'] = '1';
      } else if (uses < 1 && preparedState !== 0) {
        setter['repeating_spells_prepared_state'] = '0';
      }
      if (isNaN(classnum)) {
        setter['repeating_spells_spellclass_number'] = 0;
      }
      if (_.size(setter)) {
        if (hideUnprepared) {
          SWUtils.setWrapper(setter, PFConst.silentParams, resetCommandMacro());
        } else {
          SWUtils.setWrapper(setter, PFConst.silentParams);
        }
      }
    },
  );
}

/** - sets prepared_state to 1 if used has a value > 0 */
function resetSpellsPrepared() {
  getSectionIDs('repeating_spells', function (ids) {
    let fieldarray = [];
    _.each(ids, function (id) {
      let idStr = SWUtils.getRepeatingIDStr(id),
        prefix = 'repeating_spells_' + idStr;
      fieldarray.push(prefix + 'used');
      fieldarray.push(prefix + 'prepared_state');
    });
    getAttrs(fieldarray, function (v) {
      let setter = {};
      _.each(ids, function (id) {
        let idStr = SWUtils.getRepeatingIDStr(id),
          prefix = 'repeating_spells_' + idStr,
          uses = parseInt(v[prefix + 'used'], 10) || 0,
          preparedState = parseInt(v[prefix + 'prepared_state'], 10) || 0,
          setter = {};
        if (uses > 0 && preparedState === 0) {
          setter[prefix + 'prepared_state'] = '1';
          //TAS.debug("resetSpellsPrepared, setting to 1:" + prefix);
        } else if (uses < 1 && preparedState !== 0) {
          setter[prefix + 'prepared_state'] = '0';
        }
      });
      if (_.size(setter)) {
        SWUtils.setWrapper(setter, PFConst.silentParams);
      }
    });
  });
}

/************* SPELL OPTIONS *********************/
/** updates all spells when level or concentration or spell penetration is updated
 *@param {int} classIdx 0..2
 *@param {object} eventInfo from on event
 *@param {function} callback when done
 */
export function updateSpellsCasterLevelRelated(classIdx, eventInfo, callback) {
  let done = _.once(function () {
    if (typeof callback === 'function') {
      callback();
    }
  });
  //TAS.debug("updateSpellsCasterLevelRelated", eventInfo);
  if (!(classIdx >= 0 && classIdx <= 2) || isNaN(parseInt(classIdx, 10))) {
    done();
    return;
  }
  getAttrs(
    [
      'spellclass-' + classIdx + '-level-total',
      'spellclasses_multiclassed',
      'Concentration-' + classIdx + '-misc-mod',
      'spellclass-' + classIdx + '-name',
      'spellclass-' + classIdx + '-SP-mod',
      'Concentration-' + classIdx + '-def',
      'Concentration-' + classIdx + '-mod',
      'use_metrics',
    ],
    function (vout) {
      let use_metrics = parseInt(vout['use_metrics']) || 0,
        classLevel = parseInt(vout['spellclass-' + classIdx + '-level-total'], 10) || 0,
        abilityMod = parseInt(vout['Concentration-' + classIdx + '-mod'], 10) || 0,
        multiclassed = parseInt(vout['spellclasses_multiclassed'], 10) || 0,
        defMod = parseInt(vout['Concentration-' + classIdx + '-def'], 10),
        classConcentrationMisc = parseInt(vout['Concentration-' + classIdx + '-misc-mod'], 10) || 0,
        classSPMisc = parseInt(vout['spellclass-' + classIdx + '-SP-mod'], 10) || 0,
        newClassName = vout['spellclass-' + classIdx + '-name'] || '',
        updateDefensiveCasting = eventInfo ? /\-def$/i.test(eventInfo.sourceAttribute) : false;
      if (classLevel <= 0) {
        done();
        return;
      }
      //TAS.debug("updateSpellsCasterLevelRelated,class:"+classIdx+", class values:",vout);
      getSectionIDs('repeating_spells', function (ids) {
        let rowFieldAppnd = [
            'casterlevel',
            'CL_misc',
            'spell_class_r',
            'spellclass_number',
            'spellclass',
            'range',
            'range_numeric',
            'range_pick',
            'SP-mod',
            'SP_misc',
            'Concentration_misc',
            'Concentration-mod',
            'spell_options',
          ],
          fields = _.reduce(
            ids,
            function (memo, id) {
              let prefix = 'repeating_spells_' + SWUtils.getRepeatingIDStr(id),
                row;
              row = _.map(rowFieldAppnd, function (field) {
                return prefix + field;
              });
              return memo.concat(row);
            },
            ['spellclass-0-name', 'spellclass-1-name', 'spellclass-2-name'],
          );
        getAttrs(fields, function (v) {
          let doneOneRow = _.after(_.size(ids), done),
            classNumSetter = {},
            setter = {};
          try {
            //TAS.debug("updateSpellsCasterLevelRelated,class:"+classIdx+", spells:",v);
            _.each(ids, function (id) {
              let prefix = 'repeating_spells_' + SWUtils.getRepeatingIDStr(id),
                classNum = parseInt(v[prefix + 'spellclass_number'], 10),
                classRadio = parseInt(v[prefix + 'spell_class_r'], 10),
                chosenRange = v[prefix + 'range_pick'] || '',
                currRange = parseInt(v[prefix + 'range_numeric'], 10) || 0,
                spellConcentrationMisc = parseInt(v[prefix + 'Concentration_misc'], 10) || 0,
                optionText = v[prefix + 'spell_options'],
                setOption = 0,
                tempstr = '',
                casterlevel = 0,
                newcasterlevel = 0,
                newConcentration = 0,
                newSP = 0,
                newClassName = '',
                newRange = 0;
              try {
                if (isNaN(classNum)) {
                  classNum = 0;
                  classNumSetter[prefix + 'spellclass_number'] = 0;
                  classNumSetter[prefix + 'spellclass'] = v['spellclass-0-name'] || '';
                }
                if (!multiclassed || classNum === classIdx) {
                  if (classNum !== classRadio || isNaN(classRadio)) {
                    setter[prefix + 'spell_class_r'] = classNum;
                  }
                  newClassName = v['spellclass-' + classNum + '-name'] || '';
                  if (newClassName !== v[prefix + 'spellclass']) {
                    setter[prefix + 'spellclass'] = newClassName;
                    if (optionText) {
                      optionText = optionText.replace(
                        PFSpellOptions.optionTemplateRegexes.spellclass,
                        PFSpellOptions.optionTemplates.spellclass.replace('REPLACE', SWUtils.escapeForRollTemplate(newClassName)),
                      );
                      setOption = 1;
                    }
                  }
                  casterlevel = parseInt(v[prefix + 'casterlevel'], 10);
                  newcasterlevel = classLevel + (parseInt(v[prefix + 'CL_misc'], 10) || 0);
                  if (newcasterlevel < 1) {
                    newcasterlevel = 1;
                  }
                  if (newcasterlevel !== casterlevel || isNaN(casterlevel)) {
                    casterlevel = newcasterlevel;
                    setter[prefix + 'casterlevel'] = newcasterlevel;
                    if (optionText) {
                      optionText = optionText.replace(
                        PFSpellOptions.optionTemplateRegexes.casterlevel,
                        PFSpellOptions.optionTemplates.casterlevel.replace('REPLACE', newcasterlevel),
                      );
                      optionText = optionText.replace(
                        PFSpellOptions.optionTemplateRegexes.casterlevel_chk,
                        PFSpellOptions.optionTemplates.casterlevel_chk.replace('REPLACE', newcasterlevel),
                      );
                      setOption = 1;
                    }
                  }
                  newRange = PFUtils.findSpellRange(v[prefix + 'range'], chosenRange, casterlevel, use_metrics) || 0;
                  if (newRange !== currRange) {
                    setter[prefix + 'range_numeric'] = newRange;
                    if (optionText) {
                      optionText = optionText.replace(PFSpellOptions.optionTemplateRegexes.range, PFSpellOptions.optionTemplates.range.replace('REPLACE', newRange));
                      setOption = 1;
                    }
                  }
                  if (updateDefensiveCasting && optionText) {
                    if (defMod > 0) {
                      tempstr = PFSpellOptions.optionTemplates.cast_def.replace('REPLACE', defMod);
                    } else {
                      tempstr = '{{cast_def=}}';
                    }
                    if (optionText.indexOf('{{cast_def=') >= 0) {
                      optionText = optionText.replace(PFSpellOptions.optionTemplateRegexes.cast_def, tempstr);
                    } else {
                      optionText += tempstr;
                    }
                    setOption = 1;
                  }
                  newConcentration = newcasterlevel + abilityMod + classConcentrationMisc + spellConcentrationMisc;
                  if (newConcentration !== (parseInt(v[prefix + 'Concentration-mod'], 10) || 0)) {
                    setter[prefix + 'Concentration-mod'] = newConcentration;
                    if (optionText) {
                      optionText = optionText.replace(
                        PFSpellOptions.optionTemplateRegexes.Concentration,
                        PFSpellOptions.optionTemplates.Concentration.replace('REPLACE', newConcentration),
                      );
                      optionText = optionText.replace(
                        PFSpellOptions.optionTemplateRegexes.Concentration_chk,
                        PFSpellOptions.optionTemplates.Concentration_chk.replace('REPLACE', newConcentration),
                      );
                      setOption = 1;
                    }
                  }
                  newSP = classSPMisc + (parseInt(v[prefix + 'SP_misc'], 10) || 0);
                  if (newSP !== (parseInt(v[prefix + 'SP-mod'], 10) || 0)) {
                    setter[prefix + 'SP-mod'] = newSP;
                    if (optionText) {
                      optionText = optionText.replace(PFSpellOptions.optionTemplateRegexes.spellPen, PFSpellOptions.optionTemplates.spellPen.replace('REPLACE', newSP));
                      setOption = 1;
                    }
                  }
                  if (setOption) {
                    setter[prefix + 'spell_options'] = optionText;
                  }
                }
              } catch (innererror) {
                TAS.error('updateSpellsCasterLevelRelated innererror on id: ' + id, innererror);
              }
            });
          } catch (err) {
            TAS.error('updateSpellsCasterLevelRelated error:', err);
          } finally {
            if (_.size(setter) > 0 || _.size(classNumSetter) > 0) {
              //TAS.debug"updateSpellsCasterLevelRelated, setting:",classNumSetter,setter);
              if (_.size(classNumSetter) > 0) {
                SWUtils.setWrapper(classNumSetter, {}, done);
              }
              if (_.size(setter) > 0) {
                SWUtils.setWrapper(setter, PFConst.silentParams, done);
              }
            } else {
              done();
            }
          }
        });
      });
    },
  );
}

/** updates all spells when caster ability or DCs are updated
 *@param {int} classIdx 0..2
 *@param {map} eventInfo from on event
 *@param {function} callback when done
 */
export function updateSpellsCasterAbilityRelated(classIdx, eventInfo, callback) {
  let done = _.once(function () {
    if (typeof callback === 'function') {
      callback();
    }
  });
  //TAS.debug("updateSpellsCasterAbilityRelated", eventInfo);
  if (!(classIdx >= 0 && classIdx <= 2) || isNaN(parseInt(classIdx, 10))) {
    done();
    return;
  }
  getAttrs(
    [
      'spellclass-' + classIdx + '-level-total',
      'Concentration-' + classIdx + '-mod',
      'Concentration-' + classIdx + '-misc-mod',
      'spellclasses_multiclassed',
      'spellclass-' + classIdx + '-savedc-misc',
      'buff_SpellDC_' + classIdx + '-total',
    ],
    function (vout) {
      let abilityMod, classConcentrationMisc, multiclassed, saveDCmisc, saveDCbuff, saveDCmod;
      try {
        abilityMod = parseInt(vout['Concentration-' + classIdx + '-mod'], 10) || 0;
        classConcentrationMisc = parseInt(vout['Concentration-' + classIdx + '-misc-mod'], 10) || 0;
        multiclassed = parseInt(vout['spellclasses_multiclassed'], 10) || 0;
        saveDCmisc = parseInt(vout['spellclass-' + classIdx + '-savedc-misc'], 10) || 0;
        saveDCbuff = parseInt(vout['buff_SpellDC_' + classIdx + '-total'], 10) || 0;
        saveDCmod = saveDCmisc + saveDCbuff;
        if (!parseInt(vout['spellclass-' + classIdx + '-level-total'], 10)) {
          done();
          return;
        }
        getSectionIDs('repeating_spells', function (ids) {
          let fields = [];
          _.each(ids, function (id) {
            let prefix = 'repeating_spells_' + SWUtils.getRepeatingIDStr(id);
            fields = fields.concat([
              prefix + 'spellclass_number',
              prefix + 'spell_level',
              prefix + 'spell_level_r',
              prefix + 'spellclass_number',
              prefix + 'casterlevel',
              prefix + 'DC_misc',
              prefix + 'savedc',
              prefix + 'Concentration-mod',
              prefix + 'Concentration_misc',
              prefix + 'spell_options',
            ]);
          });
          getAttrs(fields, function (v) {
            let newConcentration = 0,
              casterlevel = 0,
              setter = {};
            try {
              _.each(ids, function (id) {
                let spellLevel = 0,
                  spellLevelRadio = 0,
                  newDC = 0,
                  setOption = 0,
                  currDC = 0,
                  prefix = 'repeating_spells_' + SWUtils.getRepeatingIDStr(id),
                  optionText = v[prefix + 'spell_options'],
                  classNumber,
                  spellConcentrationMisc = parseInt(v[prefix + 'Concentration_misc'], 10) || 0;
                try {
                  classNumber = parseInt(v[prefix + 'spellclass_number'], 10);
                  if (isNaN(classNumber)) {
                    classNumber = 0;
                    setter[prefix + 'spellclass_number'] = 0;
                  }
                  if (!multiclassed || classNumber === classIdx) {
                    spellLevel = parseInt(v[prefix + 'spell_level'], 10);
                    spellLevelRadio = parseInt(v[prefix + 'spell_level_r'], 10);
                    if (isNaN(spellLevel)) {
                      spellLevel = 0;
                      setter[prefix + 'spell_level'] = 0;
                      TAS.warn('spell level was NaN for ' + prefix);
                    }
                    if (spellLevel !== spellLevelRadio || isNaN(spellLevelRadio)) {
                      setter[prefix + 'spell_level_r'] = spellLevel;
                    }
                    newDC = 10 + spellLevel + abilityMod + saveDCmod + (parseInt(v[prefix + 'DC_misc'], 10) || 0);
                    currDC = parseInt(v[prefix + 'savedc'], 10) || 0;
                    if (newDC !== currDC) {
                      setter[prefix + 'savedc'] = newDC;
                      if (optionText) {
                        optionText = optionText.replace(PFSpellOptions.optionTemplateRegexes.dc, PFSpellOptions.optionTemplates.dc.replace('REPLACE', newDC));
                        setOption = 1;
                      }
                    }
                    casterlevel = parseInt(v[prefix + 'casterlevel'], 10) || 0;
                    if (!isNaN(casterlevel)) {
                      newConcentration = casterlevel + abilityMod + classConcentrationMisc + spellConcentrationMisc;
                      if (newConcentration !== (parseInt(v[prefix + 'Concentration-mod'], 10) || 0)) {
                        setter[prefix + 'Concentration-mod'] = newConcentration;
                        if (optionText) {
                          optionText = optionText.replace(
                            PFSpellOptions.optionTemplateRegexes.Concentration,
                            PFSpellOptions.optionTemplates.Concentration.replace('REPLACE', newConcentration),
                          );
                          optionText = optionText.replace(
                            PFSpellOptions.optionTemplateRegexes.Concentration_chk,
                            PFSpellOptions.optionTemplates.Concentration_chk.replace('REPLACE', newConcentration),
                          );
                          setOption = 1;
                        }
                      }
                      if (setOption && optionText) {
                        setter[prefix + 'spell_options'] = optionText;
                      }
                    } else {
                      TAS.warn('spell casterlevel is NaN for ' + prefix);
                    }
                  }
                } catch (innererror) {
                  TAS.error('updateSpellsCasterAbilityRelated innererror on id:' + id, innererror);
                }
              });
            } catch (miderr) {
              TAS.error('updateSpellsCasterAbilityRelated miderr :', miderr);
            } finally {
              if (_.size(setter) > 0) {
                //TAS.debug("updateSpellsCasterAbilityRelated setting:",setter);
                SWUtils.setWrapper(setter, PFConst.silentParams, done());
              } else {
                done();
              }
            }
          });
        });
      } catch (err) {
        TAS.error('updateSpellsCasterAbilityRelated outer error:', err);
      }
    },
  );
}

//faster smaller than updateSpell NOT USED
function updateSpellSlot(id, eventInfo, callback) {
  let done = _.once(function () {
      if (typeof callback === 'function') {
        callback();
      }
    }),
    idStr = SWUtils.getRepeatingIDStr(id),
    prefix = 'repeating_spells_' + idStr,
    spellLevelRadioField = prefix + 'spell_level_r',
    spellSlotField = prefix + 'slot',
    metamagicField = prefix + 'metamagic';
  //TAS.debug("updateSpellSlot", eventInfo, id);
  getAttrs([spellSlotField, metamagicField, spellLevelRadioField], function (v) {
    let slot = parseInt(v[spellSlotField], 10) || 0,
      metamagic = parseInt(v[metamagicField], 10) || 0,
      spellLevelRadio = parseInt(v[spellLevelRadioField], 10) || 0,
      setter = {};
    try {
      if (metamagic && slot !== spellLevelRadio) {
        //TAS.debug("updating slot to " + slot);
        setter[spellLevelRadioField] = slot;
        setter['spells_tab'] = slot;
      }
    } catch (err) {
      TAS.error('PFSpells.updateSpellSlot', err);
    } finally {
      SWUtils.setWrapper(setter, PFConst.silentParams, done);
    }
  });
}

/**
 *
 * @param {string} prefix
 * @param {Map<string,object>} v
 * @param {Map<string,string>} setter
 */
function getUpdateType(eventInfo) {}

/** updates a spell
 *@param {string} id optional, pass id if looping through list of IDs. Null if context is row itself.
 *@param {eventInfo} eventInfo ACTUALLY USED : if not present forces recalc of everything
 *@param {function} callback - to call when done.
 *@param {bool} doNotUpdateTotals - if true do NOT call resetSpellsTotals() and resetCommandMacro() at end, otherwise do.
 */

function updateSpell(id, eventInfo, callback, doNotUpdateTotals) {
  let spellLevelUndefined = false,
    classNumWasUndefined = false,
    done = _.once(function () {
      ////TAS.debug("leaving PFSpells.updateSpell: id:" + id + " spelllevelundefined=" + spellLevelUndefined);
      //these asynchronous functions can be called at same time as callback.
      if (!spellLevelUndefined) {
        PFSpellOptions.resetOption(id, eventInfo);
        if (!doNotUpdateTotals) {
          resetSpellsTotals();
          resetCommandMacro();
          setCasterTypeSpells(eventInfo);
        }
      }
      if (typeof callback === 'function') {
        callback();
      }
    }),
    idStr = '',
    prefix = '',
    classNameField = '',
    classRadioField = '',
    classNumberField = '',
    classCasterTypeField = '',
    casterlevelField = '',
    spellLevelField = '',
    spellLevelRadioField = '',
    dcMiscField = '',
    currDCField = '',
    fields = [],
    updateClass = false,
    updateClassLevel = false,
    updateRange = false,
    updateSP = false,
    updateConcentration = false,
    updateSpellLevel = false,
    updateDC = false,
    updateSlot = false,
    updateStr = '',
    tempMatches;

  if (!(eventInfo && eventInfo.sourceAttribute)) {
    updateClass = true;
    updateSpellLevel = true;
  } else {
    updateStr = eventInfo.sourceAttribute.toLowerCase();
    tempMatches = updateStr.match(/name|use_metrics|toggle_casting_type|lvlstr|category|meta|range_pick|range|sp_misc|cl_misc|spellclass_number|spell_level|dc_misc|concen|slot/);
    if (tempMatches && tempMatches[0]) {
      switch (tempMatches[0]) {
        case 'name':
          //only for first time
          updateClass = true;
          updateSpellLevel = true;
          break;
        case 'use_metrics':
        case 'toggle_casting_type':
        case 'range_pick':
        case 'range':
          updateRange = true;
          break;
        case 'sp_misc':
          updateSP = true;
          break;
        case 'cl_misc':
          updateClassLevel = true;
          updateRange = true;
          updateConcentration = true;
          break;
        case 'spellclass_number':
          updateClass = true;
          break;
        case 'concen':
          updateConcentration = true;
          break;
        case 'spell_level':
          updateSpellLevel = true;
          break;
        case 'dc_misc':
          updateDC = true;
          break;
        case 'slot':
        case 'meta':
          updateSlot = true;
          break;
        case 'lvlstr':
        case 'category':
          updateClass = true;
          updateSpellLevel = true;
          break;
        default:
          updateClass = true; //unknown just update all
          updateSpellLevel = true;
      }
    } else {
      //if we called from importFromCompendium then it's lvlstr
      TAS.warn('Unimportant field updated, do not update row: ' + eventInfo.sourceAttribute);
      if (typeof callback === 'function') {
        callback();
      }
      return;
    }
    idStr = SWUtils.getRepeatingIDStr(id);
    prefix = 'repeating_spells_' + idStr;
    classNameField = prefix + 'spellclass';
    classRadioField = prefix + 'spell_class_r';
    classNumberField = prefix + 'spellclass_number';
    classCasterTypeField = prefix + 'toggle_casting_type';
    casterlevelField = prefix + 'casterlevel';
    spellLevelField = prefix + 'spell_level';
    spellLevelRadioField = prefix + 'spell_level_r';
    dcMiscField = prefix + 'DC_misc';
    currDCField = prefix + 'savedc';
  }
  fields = [
    classNumberField,
    classRadioField,
    classCasterTypeField,
    classNameField,
    casterlevelField,
    prefix + 'CL_misc',
    prefix + 'range_pick',
    prefix + 'range',
    prefix + 'range_numeric',
    prefix + 'SP-mod',
    prefix + 'SP_misc',
    prefix + 'Concentration_misc',
    prefix + 'Concentration-mod',
    prefix + 'spell_options',
    prefix + 'used',
    prefix + 'slot',
    prefix + 'metamagic',
    spellLevelField,
    spellLevelRadioField,
    dcMiscField,
    currDCField,
    'spellclass-0-level-total',
    'spellclass-1-level-total',
    'spellclass-2-level-total',
    'spellclass-0-SP-mod',
    'spellclass-1-SP-mod',
    'spellclass-2-SP-mod',
    'Concentration-0-mod',
    'Concentration-1-mod',
    'Concentration-2-mod',
    'Concentration-0-misc-mod',
    'Concentration-1-misc-mod',
    'Concentration-2-misc-mod',
    'spellclass-0-savedc-misc',
    'spellclass-1-savedc-misc',
    'spellclass-2-savedc-misc',
    'buff_SpellDC_0-total',
    'buff_SpellDC_1-total',
    'buff_SpellDC_2-total',
    'Concentration-0-def',
    'Concentration-1-def',
    'Concentration-2-def',
    'spellclass-0-name',
    'spellclass-1-name',
    'spellclass-2-name',
    'use_metrics',
  ];

  //TAS.debug("PFSPells.updateSpell: getting fields",fields);

  getAttrs(fields, function (v) {
    let setter = {},
      use_metrics,
      baseClassNum,
      classNum = 0,
      classRadio = 0,
      currClassName = '',
      className = '',
      baseSpellLevel,
      spellLevel = 0,
      spellSlot,
      metaMagic = 0,
      spellLevelRadio = 0,
      currCasterLevel,
      casterlevel = 0,
      spellAbilityMod = 0,
      spellDCmisc = 0,
      spellDCbuff = 0,
      spellDCmod = 0,
      newDC = 10,
      levelSlot = 0,
      currRange = 0,
      currChosenRange = '',
      newSP = 0,
      newConcentration = 0,
      hadToSetClass = false,
      newRange = 0;
    try {
      baseClassNum = parseInt(v[classNumberField], 10);
      if (isNaN(baseClassNum)) {
        classNumWasUndefined = true;
        baseClassNum = 0;
        setter[classNumberField] = 0;
        setter[classRadioField] = 0;
        setter[classCasterTypeField] = 0;
        hadToSetClass = true;
        updateClass = true;
      }

      baseSpellLevel = parseInt(v[spellLevelField], 10);
      spellSlot = parseInt(v[prefix + 'slot'], 10);
      if (isNaN(baseSpellLevel)) {
        spellLevelUndefined = true;
        baseSpellLevel = 0;
        spellSlot = 0;
        setter[spellLevelRadioField] = 0;
        setter[prefix + 'slot'] = 0;
        setter[spellLevelField] = 0;
        updateSpellLevel = true;
      }

      if (updateClass || updateClassLevel || updateConcentration || updateDC || updateRange || updateSP) {
        classNum = baseClassNum || 0;
        classRadio = parseInt(v[classRadioField], 10);
      }

      if (updateSpellLevel || updateDC || updateSlot || updateClass) {
        spellLevel = baseSpellLevel || 0;
        metaMagic = parseInt(v[prefix + 'metamagic'], 10) || 0;
        spellLevelRadio = parseInt(v[spellLevelRadioField], 10);
        levelSlot = metaMagic ? spellSlot : spellLevel;
      }

      if (updateClass || updateClassLevel || updateConcentration || updateRange) {
        currCasterLevel = parseInt(v[casterlevelField], 10);
        if (isNaN(currCasterLevel)) {
          updateClassLevel = true;
          updateRange = true;
          updateConcentration = true;
        } else {
          casterlevel = currCasterLevel;
        }
      }

      if (updateClass || updateConcentration || updateDC || updateSpellLevel) {
        spellAbilityMod = parseInt(v['Concentration-' + classNum + '-mod'], 10) || 0;
      }

      if (updateClass || updateRange || updateClassLevel) {
        currRange = parseInt(v[prefix + 'range_numeric'], 10) || 0;
        currChosenRange = v[prefix + 'range_pick'] || 'blank';
      }

      if (updateClass) {
        if (classNum !== classRadio) {
          setter[classRadioField] = classNum;
        }
        className = v['spellclass-' + classNum + '-name'] || '';
        if (v[classNameField] !== className) {
          //TAS.debug("setting class name field, should be doing this if classnum was undefined");
          setter[classNameField] = className;
        }
      }

      if (updateSpellLevel || updateSlot) {
        if (!metaMagic) {
          if (spellLevel !== spellLevelRadio) {
            setter[spellLevelRadioField] = spellLevel;
            setter['spells_tab'] = spellLevel;
          }
          if (spellLevel !== spellSlot) {
            setter[prefix + 'slot'] = spellLevel;
            spellSlot = spellLevel;
          }
        } else {
          if (spellSlot !== spellLevelRadio) {
            setter[spellLevelRadioField] = spellSlot;
            setter['spells_tab'] = spellSlot;
          }
        }
      }

      //set caster level
      if (updateClassLevel || updateClass) {
        casterlevel = (parseInt(v['spellclass-' + classNum + '-level-total'], 10) || 0) + (parseInt(v[prefix + 'CL_misc'], 10) || 0);
        if (casterlevel < 1) {
          casterlevel = 1;
        }
        if (currCasterLevel !== casterlevel || isNaN(currCasterLevel)) {
          setter[prefix + 'casterlevel'] = casterlevel;
        }
      }

      if (updateDC || updateSpellLevel) {
        spellDCmisc = parseInt(v['spellclass-' + classNum + '-savedc-misc'], 10) || 0;
        spellDCbuff = parseInt(v['buff_SpellDC_' + classNum + '-total'], 10) || 0;
        spellDCmod = spellDCmisc + spellDCbuff;
        newDC = 10 + spellLevel + spellAbilityMod + spellDCmod + (parseInt(v[dcMiscField], 10) || 0);
        if (newDC !== (parseInt(v[currDCField], 10) || 0)) {
          setter[currDCField] = newDC;
        }
      }

      if (updateConcentration || updateClassLevel || updateClass) {
        newConcentration =
          casterlevel + spellAbilityMod + (parseInt(v['Concentration-' + classNum + '-misc-mod'], 10) || 0) + (parseInt(v[prefix + 'Concentration_misc'], 10) || 0);
        if (newConcentration !== (parseInt(v[prefix + 'Concentration-mod'], 10) || 0)) {
          setter[prefix + 'Concentration-mod'] = newConcentration;
        }
      }

      use_metrics = parseInt(v['use_metrics']) || 0;
      if (updateRange || updateClassLevel || updateClass) {
        newRange = PFUtils.findSpellRange(v[prefix + 'range'], currChosenRange, casterlevel, use_metrics) || 0;
        if (newRange !== currRange) {
          setter[prefix + 'range_numeric'] = newRange;
        }
      }

      if (updateSP || updateClass) {
        newSP = (parseInt(v['spellclass-' + classNum + '-SP-mod'], 10) || 0) + (parseInt(v[prefix + 'SP_misc'], 10) || 0);
        if (newSP !== (parseInt(v[prefix + 'SP-mod'], 10) || 0)) {
          setter[prefix + 'SP-mod'] = newSP;
        }
      }
    } catch (err) {
      TAS.error('PFSpells.updateSpell:' + id, err);
    } finally {
      if (_.size(setter) > 0) {
        SWUtils.setWrapper(setter, PFConst.silentParams, done);
      } else {
        done();
      }
    }
  });
}

function toggleMetaMagic(id, eventInfo, callback) {
  let done = function () {
      if (typeof callback === 'function') {
        callback();
      }
    },
    idStr = SWUtils.getRepeatingIDStr(id),
    prefix = 'repeating_spells_' + idStr,
    spellLevelRadioField = prefix + 'spell_level_r',
    spellSlotField = prefix + 'slot',
    spellLevelField = prefix + 'spell_level',
    metamagicField = prefix + 'metamagic';
  getAttrs([spellSlotField, spellLevelField, metamagicField, spellLevelRadioField], function (v) {
    let slot,
      level,
      metamagic,
      spellLevelRadio,
      callUpdateSpell = false,
      setter = {};
    try {
      slot = parseInt(v[spellSlotField], 10);
      level = parseInt(v[spellLevelField], 10);
      metamagic = parseInt(v[metamagicField], 10) || 0;
      spellLevelRadio = parseInt(v[spellLevelRadioField], 10) || 0;
      if (isNaN(level)) {
        level = 0;
        setter[spellLevelField] = 0;
        setter[spellSlotField] = 0;
      }
      if (isNaN(slot)) {
        slot = level;
        setter[spellSlotField] = level;
      }
      if (metamagic) {
        if (slot !== level) {
          setter[spellLevelRadioField] = slot;
          setter['spells_tab'] = slot;
          callUpdateSpell = true;
        }
      } else if (spellLevelRadio !== level) {
        setter[spellLevelRadioField] = level;
        callUpdateSpell = true;
      }
    } catch (err) {
      TAS.error('PFSpells.toggleMetaMagic', err);
    } finally {
      if (_.size(setter)) {
        SWUtils.setWrapper(setter, PFConst.silentParams, function () {
          if (callUpdateSpell) {
            updateSpell(id, eventInfo, callback);
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

/** - updates all spells
 *@param {function} callback when done
 *@param {silently} if should call SWUtils.setWrapper with {silent:true}
 *@param {object} eventInfo not used
 */

export function updateSpells(callback, silently, eventInfo) {
  let done = _.once(function () {
      //TAS.debug("leaving PFSpells.updateSpells");
      if (typeof callback === 'function') {
        callback();
      }
    }),
    doneOne = _.after(3, done);
  getAttrs(['use_spells', 'spellclass-0-exists', 'spellclass-1-exists', 'spellclass-2-exists'], function (v) {
    //TAS.debug"at PFSpells.updateSpells. Existing classes:",v);
    if (parseInt(v.use_spells, 10)) {
      _.times(3, function (n) {
        //TAS.debug("###############", "PFSpells.updateSpells index is: "+n);
        if (parseInt(v['spellclass-' + n + '-exists'], 10)) {
          updateSpellsCasterAbilityRelated(n, null, function () {
            updateSpellsCasterLevelRelated(n, null, doneOne);
          });
        } else {
          doneOne();
        }
      });
    } else {
      done();
    }
  });
}

function updateSpellsOld(callback, silently, eventInfo) {
  getSectionIDs('repeating_spells', function (ids) {
    let done = _.after(_.size(ids), function () {
      //TAS.debug("leaving PFSpells.updateSpells after " + _.size(ids)+" rows");
      if (typeof callback === 'function') {
        callback();
      }
    });
    _.each(ids, function (id) {
      try {
        updateSpell(id, eventInfo, done, true);
      } catch (err) {
        TAS.error('PFSpells.updateSpells error - should never happen!', err);
        done();
      }
    });
  });
}

/** gets level and class from repeating_spells_spell_lvlstr then updates spell
 * matches class name in compendium against current spell classes in this order:
 * spell class already selected by spell dropdown, spellclass0, spellclass1, spellclass2
 * then sets spell level to the matching level for that class
 * if it cannot find then sets class name to the class level string and updates silently.
 *@param {string} id the id of the row
 *@param {object} eventInfo used to find row id since id param will be null
 */
export function importFromCompendium(id, eventInfo) {
  if (eventInfo) {
    if (!id) {
      id = SWUtils.getRowId(eventInfo.sourceAttribute);
    }
  }
  getAttrs(
    [
      'repeating_spells_compendium_category',
      'repeating_spells_spell_lvlstr',
      'spellclass-0-name',
      'spellclass-1-name',
      'spellclass-2-name',
      'repeating_spells_range_from_compendium',
      'repeating_spells_target_from_compendium',
      'repeating_spells_area_from_compendium',
      'repeating_spells_effect_from_compendium',
      'repeating_spells_description',
      'repeating_spells_cast-time',
    ],
    function (v) {
      let levelStrBase = v['repeating_spells_spell_lvlstr'],
        rangeText = v['repeating_spells_range_from_compendium'],
        areaEffectText =
          (v['repeating_spells_target_from_compendium'] || '') + (v['repeating_spells_area_from_compendium'] || '') + (v['repeating_spells_effect_from_compendium'] || ''),
        classesInital = [],
        classes = [],
        originalClasses = ['', '', ''],
        classMatch = '',
        level = 0,
        idx = -1,
        foundMatch = false,
        setSilent = {},
        i = 0,
        classesToMatch = {},
        tempclassname = '',
        newRangeSettings,
        hasHunter = false,
        hasDruid = false,
        hasRanger = false,
        minHunterSpellLevel = 99,
        hunterIdx = 99,
        isAttack = false,
        levels,
        allSame = 1,
        modeLevel = -1,
        counter = 0,
        callUpdateSpell = true;
      TAS.info('at pfspells.importFromCompendium', v);
      if (!/spell/i.test(v.repeating_spells_compendium_category)) {
        setSilent.repeating_spells_name = 'Cannot parse ' + v.repeating_spells_compendium_category;
        setAttrs(setSilent, PFConst.silentParams);
        return;
      }
      if (levelStrBase) {
        try {
          levelStrBase = levelStrBase.toLowerCase();
          //get first word in names of classes (since users may put archetypes or other variables in)
          //if (currClass) {classesToMatch[0]=currClass.toLowerCase().replace(/^\s+/,"").match(/\w[^\d]+/)[0];}
          if (v['spellclass-0-name']) {
            tempclassname = v['spellclass-0-name'].toLowerCase().replace(/^\s+/, '').match(/\w+/)[0];
            classesToMatch[tempclassname] = 0;
            originalClasses[0] = tempclassname;
            if (/hunter/.test(tempclassname)) {
              hasHunter = true;
              hunterIdx = 0;
            } else if (/druid/.test(tempclassname)) {
              hasDruid = true;
            } else if (/ranger/.test(tempclassname)) {
              hasRanger = true;
            }
          }
          if (v['spellclass-1-name']) {
            tempclassname = v['spellclass-1-name'].toLowerCase().replace(/^\s+/, '').match(/\w+/)[0];
            classesToMatch[tempclassname] = 1;
            originalClasses[1] = tempclassname;
            if (/hunter/.test(tempclassname)) {
              hasHunter = true;
              hunterIdx = 1;
            } else if (/druid/.test(tempclassname)) {
              hasDruid = true;
            } else if (/ranger/.test(tempclassname)) {
              hasRanger = true;
            }
          }
          if (v['spellclass-2-name']) {
            tempclassname = v['spellclass-2-name'].toLowerCase().replace(/^\s+/, '').match(/\w+/)[0];
            classesToMatch[tempclassname] = 2;
            originalClasses[2] = tempclassname;
            if (/hunter/.test(tempclassname)) {
              hasHunter = true;
              hunterIdx = 2;
            } else if (/druid/.test(tempclassname)) {
              hasDruid = true;
            } else if (/ranger/.test(tempclassname)) {
              hasRanger = true;
            }
          }
          if (!(hasHunter && (hasDruid || hasRanger))) {
            //if user is hunter AND other class it's based on then can't tell.
            if (_.size(classesToMatch) > 0) {
              //add the translated classes from classesUsingOtherSpellLists
              _.each(classesToMatch, function (classindex, classname) {
                _.each(classesUsingOtherSpellLists, function (toclass, fromclass) {
                  if (classname.indexOf(fromclass) >= 0) {
                    classesToMatch[toclass] = classindex;
                  }
                });
              });
              //from spell: first split on comma between classes, then on spaces between classname and level
              classesInital = levelStrBase.split(/\s*,\s*/);
              classes = _.map(classesInital, function (a) {
                return a.split(/\s+/);
              });
              for (i = 0; i < classes.length; i++) {
                classes[i][1] = parseInt(classes[i][1], 10) || 0;
                if (i === 0) {
                  modeLevel = classes[i][1];
                } else {
                  if (modeLevel !== classes[i][1]) {
                    allSame = 0;
                  }
                }
              }
              //classes example: [["sorcerer/wizard","2"],["summoner","1"],["inquisitor","3"],["magus","2"]]
              if (hasHunter) {
                for (i = 0; i < classes.length; i++) {
                  if (/druid|ranger/.test(classes[i][0]) && classes[i][1] < minHunterSpellLevel) {
                    minHunterSpellLevel = classes[i][1];
                    classMatch = classes[i][0];
                  }
                }
                if (minHunterSpellLevel < 99) {
                  counter++;
                  foundMatch = true;
                  level = minHunterSpellLevel;
                  idx = hunterIdx;
                }
              }
              _.each(classesToMatch, function (classindex, classname) {
                for (i = 0; i < classes.length; i++) {
                  //classes on left because it can be longer and have multiple class names such as cleric/druid
                  if (classes[i][0].indexOf(classname) >= 0) {
                    counter++;
                    if (!foundMatch) {
                      classMatch = originalClasses[classindex];
                      level = classes[i][1];
                      idx = classindex;
                      foundMatch = true;
                    }
                  }
                }
              });
            }
          }
        } catch (err2) {
          TAS.error('PFSpells.importfromCompendium err2:', err2);
          classMatch = '';
          foundMatch = 0;
        }
        try {
          if (!foundMatch) {
            TAS.warn('importFromCompendium: did not find class match');
            setSilent['repeating_spells_description'] = 'Original spell level:' + v['repeating_spells_spell_lvlstr'] + ' \r\n' + v['repeating_spells_description'];
            // If the levels/classes is an array get mode and use that for level
            levels = _.map(classes, function (oneclass) {
              return oneclass[1];
            });
            level = _.chain(levels).countBy().pairs().max(_.last).head().value() || 0;
            idx = 0;
            classMatch = originalClasses[0];
          } else {
            setSilent['repeating_spells_description'] = SWUtils.trimBoth(v['repeating_spells_description']);
          }
        } catch (err3) {
          TAS.error('PFSpells.importFromCompendium err3', err3);
        } finally {
          level = level || 0;
          idx = idx || 0;
          classMatch = classMatch || originalClasses[0] || 'Sorcerer';
          foundMatch = true;
        }
        if (v['repeating_spells_cast-time']) {
          setSilent['repeating_spells_cast-time'] = v['repeating_spells_cast-time'].replace(/standard action/i, 'S.A.');
        }
        setSilent['repeating_spells_spell_level'] = level;
        setSilent['repeating_spells_slot'] = level;
        setSilent['repeating_spells_spell_level_r'] = level;
        setSilent['repeating_spells_spellclass_number'] = idx;
        setSilent['repeating_spells_spell_class_r'] = idx;
        setSilent['repeating_spells_spellclass'] = classMatch;
        //change tab so spell doesn't disappear.
        setSilent['spells_tab'] = level;
      }
      if (rangeText) {
        try {
          newRangeSettings = PFUtils.parseSpellRangeText(rangeText, areaEffectText);
          setSilent['repeating_spells_range_pick'] = newRangeSettings.dropdown;
          setSilent['repeating_spells_range'] = newRangeSettings.rangetext;
          if (newRangeSettings.dropdown === 'touch') {
            isAttack = true;
            setSilent['repeating_spells_spell-attack-type'] = 'attk-melee';
          } else if (/ranged touch|ray\s/i.test(v['repeating_spells_description'])) {
            isAttack = true;
            setSilent['repeating_spells_spell-attack-type'] = 'attk-ranged';
          }
        } catch (err2) {
          TAS.error(err2);
          setSilent['repeating_spells_range'] = rangeText.replace(/\s*\(..*/, '');
          setSilent['repeating_spells_range_pick'] = 'unknownrange';
        }
      }
      if (areaEffectText) {
        setSilent['repeating_spells_targets'] = areaEffectText;
      }
      setSilent['repeating_spells_spell_lvlstr'] = '';
      setSilent['repeating_spells_range_from_compendium'] = '';
      setSilent['repeating_spells_target_from_compendium'] = '';
      setSilent['repeating_spells_area_from_compendium'] = '';
      setSilent['repeating_spells_effect_from_compendium'] = '';
      if (_.size(setSilent) > 0) {
        SWUtils.setWrapper(setSilent, PFConst.silentParams, function () {
          updateSpell(id, eventInfo);
        });
      }
    },
  );
}

export function migrate(callback) {
  PFMigrate.migrateSpellRanges(callback);
}

export let recalculate = TAS.callback(function callPFSpellsRecalculate(callback, silently, oldversion) {
  let done = _.once(function () {
      if (typeof callback === 'function') {
        callback();
      }
    }),
    recalcTotals = _.once(function () {
      resetSpellsPrepared();
      resetSpellsTotals(null, null, null, silently);
      resetCommandMacro();
      PFSpellOptions.resetOptions();
      done();
    }),
    callUpdateSpells = _.once(function () {
      getAttrs(['use_spells'], function (v) {
        if (parseInt(v.use_spells, 10)) {
          updateSpells(recalcTotals, silently);
        } else {
          done();
        }
      });
    });
  migrate(callUpdateSpells);
});

//sync repeating_spells with settings>attacks>link spells
function updateIncludeLink() {
  getSectionIDs('repeating_spells', function (ids) {
    _.each(ids, function (id) {
      getAttrs(['include_link_spells'], function (values) {
        let include_link_spells = parseInt([values.include_link_spells]) || 0;
        setAttrs({
          ['repeating_spells_' + id + '_toggle_attack_entry']: include_link_spells,
        });
      });
    });
  });
}

// sync repeating_spells locally to match the spellclass caster type
export function setCasterTypeSpells(eventInfo) {
  getSectionIDs('repeating_spells', (idArray) => {
    const fieldnames = idArray.reduce((fields, id) => [...fields, `repeating_spells_${id}_spellclass_number`], []);
    getAttrs(['spellclass_number', 'spellclass-0-casting_type', 'spellclass-1-casting_type', 'spellclass-2-casting_type', ...fieldnames], (v) => {
      const output = {};
      const spellClass0 = +v['spellclass-0-casting_type'];
      const spellClass1 = +v['spellclass-1-casting_type'];
      const spellClass2 = +v['spellclass-2-casting_type'];
      idArray.forEach((id) => {
        let thisCastingType = '';
        const thisSpellClass = +v[`repeating_spells_${id}_spellclass_number`];
        if (thisSpellClass === 0) {
          thisCastingType = spellClass0;
        }
        if (thisSpellClass === 1) {
          thisCastingType = spellClass1;
        }
        if (thisSpellClass === 2) {
          thisCastingType = spellClass2;
        }
        thisCastingType === 1 ? (thisCastingType = 0) : (thisCastingType = 1);
        // TAS.debug(`~~~ Casting Type Set for: ${id} ~~~`);
        output[`repeating_spells_${id}_toggle_casting_type`] = thisCastingType;
      });
      setAttrs(output, {
        silent: true,
      });
    });
  });
}
function setCasterTypeRow(eventInfo) {
  const id = eventInfo.sourceAttribute.split('_')[2] || '';
  getAttrs(['repeating_spells_spellclass_number', 'spellclass-0-casting_type', 'spellclass-1-casting_type', 'spellclass-2-casting_type'], (v) => {
    const output = {};
    const spellClass0 = +v['spellclass-0-casting_type'];
    const spellClass1 = +v['spellclass-1-casting_type'];
    const spellClass2 = +v['spellclass-2-casting_type'];
    const thisSpellClass = +v.repeating_spells_spellclass_number;
    let thisCastingType = '';
    if (thisSpellClass === 0) {
      thisCastingType = spellClass0;
    }
    if (thisSpellClass === 1) {
      thisCastingType = spellClass1;
    }
    if (thisSpellClass === 2) {
      thisCastingType = spellClass2;
    }
    thisCastingType === 1 ? (thisCastingType = 0) : (thisCastingType = 1);
    // TAS.debug(`~~~ Casting Type Set for: ${id} ~~~`);
    output[`repeating_spells_${id}_toggle_casting_type`] = thisCastingType;
    setAttrs(output, {
      silent: true,
    });
  });
}

let events = {
  //events for spell repeating rows
  repeatingSpellUpdatesPlayer: ['DC_misc', 'Concentration_misc', 'range', 'range_pick', 'CL_misc', 'SP_misc', 'spellclass_number', 'spell_level'],
  repeatingSpellEventsPlayer: {
    'change:repeating_spells:compendium_category': [importFromCompendium],
    'change:repeating_spells:used': [updateSpellsPerDay, updatePreparedSpellState, resetCommandMacro],
    'change:repeating_spells:metamagic': [toggleMetaMagic],
    'change:repeating_spells:name': [updateSpell],
  },
  repeatingSpellMenuUpdatePlayer: ['name', 'spellclass_number', 'spell_level', 'slot', 'used', 'school', 'metamagic', 'isDomain', 'isMythic'],
  repeatingSpellAttackEventsPlayer: ['range_pick', 'range', 'damage-macro-text', 'damage-type', 'save', 'spell-attack-type', 'name'],
  repeatingSpellAttackEventsAuto: ['range_numeric', 'sr', 'savedc', 'toggle_attack_entry'],
};
function registerEventHandlers() {
  let tempstr = '';
  // combined all tempstr reduce functions
  const reducers = [events.repeatingSpellUpdatesPlayer, events.repeatingSpellMenuUpdatePlayer, events.repeatingSpellAttackEventsPlayer, events.repeatingSpellAttackEventsAuto];

  tempstr = reducers.reduce((accumulator, eventList) => {
    return eventList.reduce((memo, attr) => {
      return memo + 'change:repeating_spells:' + attr + ' ';
    }, accumulator); // Use the outer accumulator as the initial memo value
  }, ''); // Initial value for the outer reduce

  // tempstr = _.reduce(
  //   events.repeatingSpellUpdatesPlayer,
  //   function (memo, attr) {
  //     memo += 'change:repeating_spells:' + attr + ' ';
  //     return memo;
  //   },
  //   '',
  // );
  // tempstr = _.reduce(
  //   events.repeatingSpellMenuUpdatePlayer,
  //   function (memo, attr) {
  //     memo += 'change:repeating_spells:' + attr + ' ';
  //     return memo;
  //   },
  //   '',
  // );
  // tempstr = _.reduce(
  //   events.repeatingSpellAttackEventsPlayer,
  //   function (memo, attr) {
  //     memo += 'change:repeating_spells:' + attr + ' ';
  //     return memo;
  //   },
  //   '',
  // );
  // tempstr = _.reduce(
  //   events.repeatingSpellAttackEventsAuto,
  //   function (memo, attr) {
  //     memo += 'change:repeating_spells:' + attr + ' ';
  //     return memo;
  //   },
  //   '',
  // );
  on(
    tempstr,
    TAS.callback(function playerUpdateSpell(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event' + eventInfo.sourceType);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        updateSpell(null, eventInfo);
      }
    }),
  );
  on(
    'change:use_metrics',
    TAS.callback(function playerUpdateSpell(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event' + eventInfo.sourceType);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        getSectionIDs('repeating_spells', function (ids) {
          _.each(ids, function (id) {
            updateSpell(id, eventInfo, null, true);
          });
        });
      }
    }),
  );
  _.each(events.repeatingSpellEventsPlayer, function (functions, eventToWatch) {
    _.each(functions, function (methodToCall) {
      on(
        eventToWatch,
        TAS.callback(function eventRepeatingSpellsPlayer(eventInfo) {
          TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
          if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
            methodToCall(null, eventInfo);
          }
        }),
      );
    });
  });
  on(
    'remove:repeating_spells',
    TAS.callback(function eventUpdateRemoveSpell(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        PFAttacks.removeLinkedAttack(null, PFAttacks.linkedAttackType.spell, SWUtils.getRowId(eventInfo.sourceAttribute));
        resetCommandMacro();
        resetSpellsTotals();
      }
    }),
  );
  on(
    'change:spellmenu_groupby_school change:spellmenu_show_uses change:spellclass-0-hide_unprepared change:spellclass-1-hide_unprepared change:spellclass-2-hide_unprepared change:spellclass-0-show_domain_spells change:spellclass-1-show_domain_spells change:spellclass-2-show_domain_spells',
    TAS.callback(function eventOptionChange(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        resetCommandMacro();
      }
    }),
  );
  on(
    tempstr,
    TAS.callback(function eventRepeatingSpellMenuUpdate(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event' + eventInfo.sourceType);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        updateSpell(null, eventInfo);
      }
    }),
  );
  on(
    'change:_reporder_repeating_spells',
    TAS.callback(function eventReorderRepeatingspells(eventInfo) {
      if (eventInfo.sourceType === 'player') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        resetCommandMacro();
      }
    }),
  );
  on(
    'change:repeating_spells:spellclass_number change:repeating_spells:spell_level',
    TAS.callback(function eventRepeatingSpellsTotals(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        resetSpellsTotals();
        setCasterTypeRow(eventInfo);
      }
    }),
  );
  on(
    'change:repeating_spells:create-attack-entry',
    TAS.callback(function eventcreateAttackEntryFromSpell(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        createAttackEntryFromRow(null, null, false, eventInfo);
      }
    }),
  );
  on(
    tempstr,
    TAS.callback(function eventupdateAssociatedSpellAttack(eventInfo) {
      let attr;
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event' + eventInfo.sourceType);
      attr = SWUtils.getAttributeName(eventInfo.sourceAttribute);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        updateAssociatedAttack(null, null, null, eventInfo);
      }
    }),
  );
  on(
    tempstr,
    TAS.callback(function eventupdateAssociatedSpellAttack(eventInfo) {
      let attr;
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event' + eventInfo.sourceType);
      attr = SWUtils.getAttributeName(eventInfo.sourceAttribute);
      if (eventInfo.sourceType === 'sheetworker' || eventInfo.sourceType === 'api') {
        updateAssociatedAttack(null, null, null, eventInfo);
      }
    }),
  );
  // sync repeating_spells with settings>attacks>link spells
  on('change:include_link_spells', function (eventInfo) {
    TAS.debug('caught ' + eventInfo.sourceAttribute + ' event' + eventInfo.sourceType);
    if (eventInfo.sourceType === 'sheetworker' || eventInfo.sourceType === 'player') {
      updateIncludeLink();
    }
  });
  // sync repeating_spells locally to match the spellclass caster type
  on('change:spellclass-0-casting_type change:spellclass-1-casting_type change:spellclass-2-casting_type', function (eventInfo) {
    if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      setCasterTypeSpells(eventInfo);
    }
  });
}
registerEventHandlers();
