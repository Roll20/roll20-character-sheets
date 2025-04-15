'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils from './PFUtils';
import * as PFCustom from './PFCustom';
import * as PFMigrate from './PFMigrate';
import * as PFDefense from './PFDefense';
import * as PFSize from './PFSize';
import * as PFUtilsAsync from './PFUtilsAsync';
import * as PFInitiative from './PFInitiative';
import * as PFSkills from './PFSkills';
import * as PFEncumbrance from './PFEncumbrance';
import * as PFInventory from './PFInventory';
import * as PFAbilityScores from './PFAbilityScores';
import * as PFBuffs from './PFBuffs';
import * as PFSaves from './PFSaves';
import * as PFHealth from './PFHealth';
import * as PFChecks from './PFChecks';
import * as PFAbility from './PFAbility';
import * as PFNPC from './PFNPC';
import * as PFAttackGrid from './PFAttackGrid';
import * as PFAttackOptions from './PFAttackOptions';
import * as PFAttacks from './PFAttacks';
import * as PFFeatures from './PFFeatures';
import * as PFSpells from './PFSpells';
import * as PFSpellCasterClasses from './PFSpellCasterClasses';
import * as PFPsionic from './PFPsionic';
import * as PFMythic from './PFMythic';
import * as PFClassRaceGrid from './PFClassRaceGrid';
import * as PFConditions from './PFConditions';
import * as PFHorror from './PFHorror';
import * as PFOccult from './PFOccult';
import * as PFMacros from './PFMacros';

function expandAll() {
  getAttrs(['expandall'], function (v) {
    var skilltab = '4',
      setter = {};
    if (parseInt(v['expandall'], 10)) {
      //set expandall to 0
      //set tabs to "all"
      //set conditions and buffs to "show"
      //set all others to default (which is "show")
      SWUtils.setWrapper({
        expandall: '0',
        pagetab: '99',
        buffs_tab: '99',
        abilities_tab: '99',
        'npc-abilities_tab': '99',
        skills_tab: '99',
        spellclass_tab: '99',
        spells_tab: '99',
        npc_spellclass_tab: '99',
        equipment_tab: '99',
        'conditions-show': 1,
        'buffstop-show': 1,
        'command-buttons-show': 1,
        'NPC-command-buttons-show': 1,
        'character-details-show': 1,
        'ability-scores-show': 1,
        'class-info-show': 1,
        class1_show: 1,
        class2_show: 1,
        class3_show: 1,
        'health-and-wounds-show': 1,
        'initiative-show': 1,
        'macro-text-show': 1,
        'notes-show': 1,
        'saves-show': 1,
        'all-saves-macro-show': 1,
        'save-notes-show': 1,
        'defense-values-show': 1,
        'armor-shield-show': 1,
        'sanity-show': 1,
        'defense-notes-show': 1,
        'attack-bonuses-show': 1,
        atkm2_show: 1,
        ranged_2_show: 1,
        cmb_2_show: 1,
        'attack-notes-show': 1,
        'attack-options-show': 1,
        'two-weapon-show': 1,
        'attacks-show': 1,
        'skill-ranks-show': 1,
        'skill_options-show': 1,
        'skills-show': 1,
        'artistry-show': 1,
        'craft-show': 1,
        'knowledge-show': 1,
        'lore-show': 1,
        'perform-show': 1,
        'profession-show': 1,
        'misc-show': 1,
        'skill-notes-show': 1,
        'ability-command-buttons-show': 1,
        'NPC-ability-command-buttons-show': 1,
        'feats-show': 1,
        'mythic-info-show': 1,
        'psionic-info-show': 1,
        'burn-show': 1,
        'abilities-show': 1,
        'spellclasses-show': 1,
        'spellclass-0-show': 1,
        'spellclass-0-spellpoints-show': 1,
        'spellclass-0-spells-notes-show': 1,
        'spellclass-0-perday-show': 1,
        'spellclass-0-domains-show': 1,
        domain02_show: 1,
        domain03_show: 1,
        'spellclass-1-show': 1,
        'spellclass-1-spellpoints-show': 1,
        'spellclass-1-spells-notes-show': 1,
        'spellclass-1-perday-show': 1,
        'spellclass-1-domains-show': 1,
        'spellclass-2-show': 1,
        'spellclass-2-spellpoints-show': 1,
        'spellclass-2-spells-notes-show': 1,
        'spellclass-2-perday-show': 1,
        'spellclass-2-domains-show': 1,
        'spelloptions-show': 1,
        'spell-lists-show': 1,
        'currency-show': 1,
        'carried-weight-show': 1,
        'loads-show': 1,
        'worn-items-show': 1,
        'other-items-show': 1,
        'equipment-show': 1,
        'npc-compimport-show': 1,
        'npc-details-show': 1,
        'npc-defense-show': 1,
        'npc-offense-show': 1,
        'npc-speed-show': 1,
        'npc-repeating-weapons-show': 1,
        'npc-spells-show': 1,
        'npc-spell-like-abilities-show': 1,
        'npc-tactics-show': 1,
        'npc-statistics-show': 1,
        'npc-feats-show': 1,
        'npc-mythic-feats-show': 1,
        'npc-skills-show': 1,
        'npc-ecology-show': 1,
        'npc-special-abilities-show': 1,
        'custom-attr-sect-a-show': 1,
        'custom-attr-sect-c-show': 1,
        'custom-attr-sect-b-show': 1,
        'custom-attr-sect-d-show': 1,
        'custom-attr-sect-n-show': 1,
        'header-image-show': 1,
        'sheet-import-show': 1,
        'roll-template-info-show': 1,
        'macros-show': 1,
        'migrations-show': 1,
        'cleanup-show': 1,
        'san-show': 1,
        'buff-min-show': 0,
        'buff-expand-show': 0,
        'buff-column-show': 0,
        'weapon-min-show': 0,
        'weapon-expand-show': 0,
        'weapon-column-show': 0,
        'abilities-min-show': 0,
        'abilities-expand-show': 0,
        'abilities-column-show': 0,
        'class-ability-min-show': 0,
        'class-ability-expand-show': 0,
        'class-ability-column-show': 0,
        'feat-min-show': 0,
        'feat-expand-show': 0,
        'feat-column-show': 0,
        'mythic-feats-min-show': 0,
        'mythic-feats-expand-show': 0,
        'mythic-feats-column-show': 0,
        'racial-trait-min-show': 0,
        'racial-trait-expand-show': 0,
        'racial-trait-column-show': 0,
        'traits-min-show': 0,
        'traits-expand-show': 0,
        'traits-column-show': 0,
        'npc-spell-like-abilities-min-show': 0,
        'npc-spell-like-abilities-expand-show': 0,
        'npc-spell-like-abilities-column-show': 0,
        'mythic-min-show': 0,
        'mythic-expand-show': 0,
        'mythic-column-show': 0,
        'newspells-min-show': 0,
        'newspells-expand-show': 0,
        'newspells-column-show': 0,
        'item-min-show': 0,
        'item-expand-show': 0,
        'item-column-show': 0,
        'npcweapon-min-show': 0,
        'npcweapon-expand-show': 0,
        'npcweapon-column-show': 0,
        'npcnewspells-min-show': 0,
        'npcnewspells-expand-show': 0,
        'npcnewspells-column-show': 0,
        'npcfeat-min-show': 0,
        'npcfeat-expand-show': 0,
        'npcfeat-column-show': 0,
        'npcmythic-feats-min-show': 0,
        'npcmythic-feats-expand-show': 0,
        'npcmythic-feats-column-show': 0,
        'npc-abilities-min-show': 0,
        'npc-abilities-expand-show': 0,
        'npc-abilities-column-show': 0,
        'npc-special-abilities-min-show': 0,
        'npc-special-abilities-expand-show': 0,
        'npc-special-abilities-column-show': 0,
        extra_fields_san_show: 1,
        extra_fields_attacks_show: 1,
        skill_onetimecolumns_show: 1,
        extra_fields_saves_show: 1,
        extra_fields_spells_show: 1,
        extra_fields_caster_show: 1,
        extra_fields_abilities_show: 1,
        extra_fields_init_show: 1,
        extra_fields_speeds_show: 1,
        extra_fields_defense_show: 1,
        extra_fields_conditions_show: 1,
      });
      //now go through repeating sections and expand those to be sure users can see them.
      _.each(PFConst.repeatingSections, function (section) {
        var rsection = 'repeating_' + section;
        getSectionIDs(rsection, function (ids) {
          var setter = _.reduce(
            ids,
            function (memo, id) {
              var prefix = rsection + '_' + id + '_';
              switch (section) {
                case 'weapon':
                  memo[prefix + 'misc-show'] = 1;
                  memo[prefix + 'add-damage-show'] = 1;
                  memo[prefix + 'iterative-attacks-show'] = 1;
                  memo[prefix + 'advmacro-text-show'] = 1;
                  break;
                case 'buff':
                  memo[prefix + 'options-show'] = 1;
                  memo[prefix + 'description-show'] = 1;
                  break;
                case 'buff2':
                  memo[prefix + 'options-show'] = 1;
                  memo[prefix + 'description-show'] = 1;
                  break;
                case 'spells':
                  memo[prefix + 'misc-show'] = 1;
                  memo[prefix + 'attack-show'] = 1;
                  memo[prefix + 'description-show'] = 1;
                  break;
                case 'class-ability':
                case 'feat':
                case 'racial-trait':
                case 'trait':
                case 'mythic-ability':
                case 'mythic-feat':
                  memo[prefix + 'description-show'] = 1;
                  break;
                case 'item':
                  memo[prefix + 'description-show'] = 1;
                  memo[prefix + 'armor-attributes-show'] = 1;
                  memo[prefix + 'weapon-attributes-show'] = 1;
                  break;
                case 'npc-spell-like-abilities':
                  memo[prefix + 'attack-show'] = 1;
                  break;
                case 'ability':
                  memo[prefix + 'options-show'] = 1;
                  memo[prefix + 'description-show'] = 1;
                  memo[prefix + 'misc-show'] = 1;
                  memo[prefix + 'showextrafields'] = 1;
                  memo[prefix + 'range-show'] = 1;
                  memo[prefix + 'attack-show'] = 1;
                  break;
              }
              memo[prefix + 'row-show'] = 1;
              memo[prefix + 'ids-show'] = 1;
              if (section !== 'buff' && section !== 'buff2') {
                memo[prefix + 'macro-text-show'] = 1;
              }
              return memo;
            },
            {},
          );
          SWUtils.setWrapper(setter, {
            silent: true,
          });
        });
      });
    }
  });
}

/** Sets any values if sheet created brand new. Makes sure all migrations up to date.
 * makes sure NPC value set.
 */
function setupNewSheet(callback) {
  var done = _.once(function () {
    var setter = {is_newsheet: 0, is_v1: 1, use_buff_bonuses: 1, use_advanced_options: 0, modify_dmg_by_size: 1, PFSheet_Version: String(PFConst.version.toFixed(2))};
    setter[PFConst.announcementVersionAttr] = 1;
    SWUtils.setWrapper(setter, PFConst.silentParams, function () {
      if (typeof callback === 'function') {
        callback();
      }
    });
  });
  getAttrs(['is_npc', 'set_pfs'], function (v) {
    var isNPC = parseInt(v.is_npc, 10) || 0,
      isPFS = parseInt(v.set_pfs, 10) || 0;
    PFMigrate.setAllMigrateFlags(function () {
      PFSkills.migrate();
      PFCustom.migrate();
      if (isNPC) {
        PFNPC.setToNPC(done);
      } else if (isPFS) {
        PFHealth.setToPFS(done);
      } else {
        done();
      }
    });
  });
}

/** Only updates things between versions, normally things that are not part of migrate()
 *@param {number} oldversion the current version attribute
 *@param {function} callback when done if no errors
 *@param {function} errorCallback  call this if we get an error
 */
function migrate(oldversion, callback, errorCallback) {
  var done = _.once(function () {
      TAS.debug('leaving PFSheet.migrate');
      if (typeof callback === 'function') {
        callback();
      }
    }),
    errorDone = _.once(function () {
      TAS.warn('leaving PFSheet.migrate ERROR UPGRADE NOT FINISHED');
      if (typeof errorCallback === 'function') {
        errorCallback();
      } else {
        done();
      }
    }),
    doneOne;
  try {
    //don't need to check if oldversion > 0 since this is only called if it is.
    //TAS.debug("At PFSheet.migrate from oldversion:"+oldversion);
    if (oldversion < 1.0) {
      doneOne = _.after(7, function () {
        TAS.info('PFSheet.migrate we finished calling all the migrates');
        done();
      });
      PFMigrate.migrateConfigFlags(
        TAS.callback(function () {
          PFInventory.migrate(doneOne, oldversion);
          PFSkills.migrate(doneOne, oldversion);
          PFHealth.migrate(doneOne, oldversion);
          PFAttacks.migrate(doneOne, oldversion);
          PFAbility.migrate(doneOne, oldversion);
          PFFeatures.migrate(doneOne, oldversion);
          PFSpells.migrate(doneOne, oldversion);
        }),
        oldversion,
      );
    } else if (oldversion < 1.17) {
      if (oldversion < 1.02) {
        PFAbility.migrate(null, oldversion);
        PFFeatures.migrate(null, oldversion);
      }
      if (oldversion < 1.05) {
        PFAttackOptions.resetOptions();
      }
      if (oldversion < 1.07) {
        PFInventory.migrate(null, oldversion);
      }
      if (oldversion < 1.1) {
        PFMigrate.migrateAbilityListFlags();
        PFFeatures.migrate(null, oldversion);
      }
      if (oldversion < 1.12) {
        PFAbility.migrate(null, oldversion);
      }
      if (oldversion < 1.17) {
        PFInventory.migrate(function () {
          PFInventory.resetCommandMacro();
        });
      }
    } else {
      if (oldversion < 1.18) {
        //future updates here. any above will recalc whole sheet after callback
        PFInitiative.recalculate(null, false, oldversion);
        PFHealth.recalculate(null, false, oldversion);
        PFMigrate.migrateSpellPointFlag(null, oldversion);
      }
      if (oldversion < 1.2) {
        PFHealth.recalculate();
      }
      if (oldversion < 1.4) {
        PFMigrate.migrateWhisperDropdowns();
        PFInventory.resetCommandMacro();
        PFAttackGrid.resetCommandMacro();
        PFAbility.resetCommandMacro();
        PFFeatures.resetCommandMacro();
        PFAttacks.recalculate();
        PFClassRaceGrid.setHitPoints();
      }
      if (oldversion < 1.43) {
        PFSpells.recalculate();
        PFSkills.resetCommandMacro();
      }
      if (oldversion < 1.5) {
        PFSpells.resetSpellsTotals(null, null, null, true);
        PFInventory.updateRepeatingItems();
        PFAttacks.migrateLinkedAttacks(null, oldversion);
      }
      if (oldversion < 1.53) {
        PFSkills.migrate(null, oldversion);
        PFSize.recalculate(function () {
          PFEncumbrance.migrate();
        });
      }
      if (oldversion < 1.54) {
        PFBuffs.recalculate();
      }
      if (oldversion < 1.55) {
        PFAttacks.recalculate();
        PFSkills.migrate();
      }
      if (oldversion < 1.56) {
        PFAttacks.updateRepeatingWeaponDamages();
      }
      if (oldversion < 1.57) {
        PFDefense.updateDefenses();
      }
      if (oldversion <= 1.65) {
        PFCustom.migrate(function () {
          PFBuffs.migrate(function () {
            PFConditions.migrate(function () {
              PFBuffs.recalculate(function () {
                PFCustom.recalculate(function () {
                  PFSkills.migrate(function () {
                    PFSkills.recalculateSkills();
                  }, oldversion);
                  PFAbility.setRuleTabs();
                  PFInventory.updateLocations();
                  PFAttackGrid.recalculate(function () {
                    PFAttacks.adjustAllDamageDiceAsync();
                    PFAttacks.updateDualWieldAttacks();
                    PFAttacks.recalculateRepeatingWeapons();
                  });
                  PFInventory.migrate();
                });
              });
            }, oldversion);
          }, oldversion);
        }, oldversion);
      }
      if (oldversion < 1.68) {
        PFCustom.migrate(function () {
          PFSkills.recalculate(null, null, oldversion);
          PFDefense.recalculate(null, null, oldversion);
          PFAttackGrid.recalculate(null, null, oldversion);
        });
      }
      if (oldversion < 1.69) {
        PFSpellCasterClasses.recalculate(null, null, oldversion);
        PFFeatures.recalculate(null, null, oldversion);
        PFAttacks.recalculate(null, null, oldversion);
        PFAbility.recalculate(null, null, oldversion);
        PFInventory.recalculate(null, null, oldversion);
        PFBuffs.recalculate(null, null, oldversion);
        PFDefense.recalculate(null, null, oldversion);
      }
      if (oldversion < 1.693) {
        PFCustom.fixProfessionDropdowns(PFSkills.recalculate);
      }
      if (oldversion < 1.697) {
        PFAttacks.recalculate(null, null, oldversion);
      }
      if (oldversion < 1.72) {
        PFSize.recalculate(oldversion, function () {
          PFAttacks.adjustAllDamageDiceAsync(null, null);
        });
        PFSpells.resetSpellsTotals();
      }
      if (oldversion < 1.724) {
        PFSkills.migrate(null, oldversion);
      }
      if (oldversion < 1.731) {
        PFMacros.checkScrollDesc();
      }
      if (oldversion < 1.732) {
        PFMacros.checkBaseAttacks();
      }
      if (oldversion < 1.787) {
        PFAbility.updateIncludeLinkVersionCheck();
      }
      if (oldversion < 1.822) {
        PFSpells.setCasterTypeSpells();
      }
      if (oldversion < 1.826) {
        PFMacros.checkAbilityType2();
      }
      if (oldversion < 1.829) {
        PFAttacks.recalculate(null, null, oldversion);
      }
    }
  } catch (err) {
    TAS.error('PFSheet.migrate', err);
    errorDone();
  } finally {
    done();
  }
}
function recalculateParallelModules(callback, silently, oldversion) {
  var done = _.once(function () {
      TAS.info('leaving PFSheet.recalculateParallelModules');
      if (typeof callback === 'function') {
        callback();
      }
    }),
    parallelRecalcFuncs = [
      PFSpellCasterClasses.recalculate,
      PFSaves.recalculate,
      PFFeatures.recalculate,
      PFPsionic.recalculate,
      PFSkills.recalculate,
      PFAbility.recalculate,
      PFInitiative.recalculate,
      PFAttacks.recalculate,
      PFHorror.recalculate,
      PFOccult.recalculate,
    ],
    numberModules = _.size(parallelRecalcFuncs),
    doneOneModuleInner = _.after(numberModules, done),
    curr = 0,
    currstarted = 0,
    doneOneModule = function () {
      curr++;
      TAS.info('PFSheet.recalculateParallelModules, finished ' + curr + ' modules');
      doneOneModuleInner();
    };

  //TAS.debug("at recalculateParallelModules! there are "+numberModules +" modules");
  try {
    _.each(parallelRecalcFuncs, function (methodToCall) {
      try {
        currstarted++;
        //TAS.info("starting " + currstarted + " parallel modules calling:"+methodToCall);
        methodToCall(doneOneModule, silently, oldversion);
      } catch (err) {
        TAS.error('PFSheet.recalculateParallelModules error calling recalculate', err);
        doneOneModule();
      }
    });
  } catch (err2) {
    TAS.error('PFSheet.recalculateParallelModules OUTER error!', err2);
    done();
  }
}
function recalculateDefenseAndEncumbrance(callback, silently, oldversion) {
  var done = _.once(function () {
      //TAS.debug("leaving PFSheet.recalculateDefenseAndEncumbrance");
      if (typeof callback === 'function') {
        callback();
      }
    }),
    callEncumbrance = function () {
      PFEncumbrance.recalculate(done, silently, oldversion);
    },
    doneBeforeEncumbrance = _.after(2, callEncumbrance);
  try {
    PFInventory.recalculate(doneBeforeEncumbrance, silently, oldversion);
    PFDefense.recalculate(doneBeforeEncumbrance, silently, oldversion);
  } catch (err) {
    TAS.error('pfsheet.recalculateDefenseAndEncumbrance', err);
    callEncumbrance();
  }
}
function recalculateCore(callback, silently, oldversion) {
  var done = _.once(function () {
      //TAS.debug("leaving PFSheet.recalculateCore");
      if (typeof callback === 'function') {
        callback();
      }
    }),
    sizeOnce = _.once(function () {
      PFSize.recalculate(done, silently, oldversion);
    }),
    healthOnce = _.once(function () {
      PFHealth.recalculate(sizeOnce, silently, oldversion);
    }),
    npcOnce = _.once(function () {
      PFNPC.recalculate(healthOnce, silently, oldversion);
    }),
    mythicOnce = _.once(function () {
      PFMythic.recalculate(npcOnce, silently, oldversion);
    }),
    customOnce = _.once(function () {
      PFCustom.recalculate(mythicOnce, silently, oldversion);
    }),
    conditioncheckOnce = _.once(function () {
      PFChecks.applyConditions(customOnce, silently, oldversion);
    }),
    classOnce = _.once(function () {
      PFClassRaceGrid.recalculate(conditioncheckOnce, silently, oldversion);
    }),
    abilityScoresOnce = _.once(function () {
      PFAbilityScores.recalculate(classOnce, silently, oldversion);
    }),
    abilityAffectingConditionsOnce = _.once(function () {
      PFConditions.recalculate(abilityScoresOnce, silently, oldversion);
    }),
    buffsOnce = _.once(function () {
      PFBuffs.recalculate(abilityAffectingConditionsOnce, silently, oldversion);
    });

  PFMigrate.migrateConfigFlags(buffsOnce, oldversion);

  //TAS.debug("at recalculateCore!!!!");
}

/** recalculate - all pages in sheet!
 *@param {number} oldversion the current version attribute
 *@param {function} callback when done if no errors
 *@param {function} errorCallback  call this if we get an error
 */
export function recalculate(oldversion, callback, silently) {
  var done = function () {
      TAS.info('leaving PFSheet.recalculate');
      if (typeof callback === 'function') {
        callback();
      }
    },
    callParallel = TAS.callback(function callRecalculateParallelModules() {
      recalculateParallelModules(done, silently, oldversion);
    }),
    callEncumbrance = TAS.callback(function callRecalculateDefenseAndEncumbrance() {
      recalculateDefenseAndEncumbrance(callParallel, silently, oldversion);
    }),
    callRecalcCore = TAS.callback(function callRecalculateCore() {
      recalculateCore(callEncumbrance, silently, oldversion);
    });
  silently = true;
  callRecalcCore();
}
/* checkForUpdate looks at current version of page in PFSheet_Version and compares to code PFConst.version
 *  calls recalculateSheet if versions don't match or if recalculate button was pressed.
 * */
export function checkForUpdate(forceRecalc) {
  var done = function () {
      TAS.info('leaving PFSheet.checkForUpdate');
      SWUtils.setWrapper({recalc1: 0, migrate1: 0, is_newsheet: 0}, PFConst.silentParams);
    },
    errorDone = _.once(function () {
      TAS.warn('leaving PFSheet.checkForUpdate ERROR UPGRADE NOT FINISHED DO NOT RESET VERSION');
      SWUtils.setWrapper({recalc1: 0, migrate1: 0}, {silent: true});
    });
  getAttrs(
    [
      'PFSheet_Version',
      'migrate1',
      'recalc1',
      'is_newsheet',
      'is_v1',
      'hp',
      'hp_max',
      'npc-hd',
      'npc-hd-num',
      'race',
      'class-0-name',
      'npc-type',
      'level',
      'hide_announcements',
      PFConst.announcementVersionAttr,
    ],
    function (v) {
      var setter = {},
        setAny = 0,
        migrateSheet = false,
        newSheet = false,
        recalc = false,
        currVer = parseFloat(v.PFSheet_Version, 10) || 0,
        setUpgradeFinished = function () {
          SWUtils.setWrapper(
            {recalc1: 0, migrate1: 0, is_newsheet: 0, character_sheet: 'Pathfinder_Neceros v' + String(PFConst.version), PFSheet_Version: String(PFConst.version.toFixed(3))},
            PFConst.silentParams,
            function () {
              if (currVer < 1.17) {
                recalculate(currVer, null, false);
              }
            },
          );
        };
      TAS.notice('Attributes at version: ' + currVer);

      if (forceRecalc) {
        recalc = true;
      } else {
        if (parseInt(v['recalc1'], 10)) {
          //HIT RECALC
          recalc = true;
        }
        if (parseInt(v['migrate1'], 10)) {
          migrateSheet = true;
        }
        if (
          parseInt(v['is_newsheet'], 10) ||
          (currVer === 0 &&
            (parseInt(v.is_v1, 10) ||
              !(
                parseInt(v.hp, 10) ||
                parseInt(v.hp_max, 10) ||
                parseInt(v['npc-hd'], 10) ||
                parseInt(v['npc-hd-num'], 10) ||
                v.race ||
                v['class-0-name'] ||
                v['npc-type'] ||
                parseInt(v['level'], 10)
              )))
        ) {
          //NEW SHEET:
          newSheet = true;
        }
      }
      //force this on sheet open, not sure wtf is wrong
      if (currVer !== PFConst.version) {
        migrateSheet = true;
      }
      if (!newSheet && parseInt(v.hide_announcements, 10) && !parseInt(v[PFConst.announcementVersionAttr], 10)) {
        setter[PFConst.announcementVersionAttr] = 1;
        SWUtils.setWrapper(setter, PFConst.silentParams);
      }
      if (newSheet) {
        setupNewSheet(done);
      } else if (migrateSheet) {
        TAS.notice('UPGRADE SHEET');
        migrate(currVer, setUpgradeFinished, errorDone);
      } else if (recalc) {
        currVer = -1;
        recalculate(currVer, done, true);
      } else {
        done();
      }
    },
  );
}

function registerEventHandlers() {
  var eventToWatch = '';

  on(
    'sheet:opened',
    TAS.callback(function eventSheetOpened() {
      //eventInfo has undefined values for this event.
      checkForUpdate();
    }),
  );
  on(
    'change:recalc1 change:migrate1',
    TAS.callback(function eventRecalculateSheet(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        checkForUpdate();
      }
    }),
  );
  on('change:expandall', function (eventInfo) {
    TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
    if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
      expandAll();
    }
  });

  on(
    'change:repeating_weapon:source-item',
    TAS.callback(function eventUpdateAttackSourceItem(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        getAttrs([eventInfo.sourceAttribute], function (v) {
          var weaponId = SWUtils.getRowId(eventInfo.sourceAttribute),
            sourceId = v[eventInfo.sourceAttribute];
          //TAS.debug("PFSheet new item id: " + sourceId + " this row weapon id: "+weaponId, v);
          if (sourceId) {
            sourceId = 'repeating_item_' + sourceId + '_create-attack-entry';
            PFInventory.createAttackEntryFromRow(sourceId, null, false, weaponId);
          }
        });
      }
    }),
  );
  on(
    'change:repeating_weapon:source-ability',
    TAS.callback(function eventUpdateAttackSourceAbility(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        getAttrs([eventInfo.sourceAttribute], function (v) {
          var weaponId = SWUtils.getRowId(eventInfo.sourceAttribute),
            sourceId = v[eventInfo.sourceAttribute];
          if (sourceId) {
            PFAbility.createAttackEntryFromRow(sourceId, null, false, null, weaponId);
          }
        });
      }
    }),
  );
  on(
    'change:repeating_weapon:source-spell',
    TAS.callback(function eventUpdateAttackSourceSpell(eventInfo) {
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
        getAttrs([eventInfo.sourceAttribute], function (v) {
          var weaponId = SWUtils.getRowId(eventInfo.sourceAttribute),
            sourceId = v[eventInfo.sourceAttribute];
          if (sourceId) {
            PFSpells.createAttackEntryFromRow(sourceId, null, false, null, weaponId);
          }
        });
      }
    }),
  );

  //delete a list
  on(
    'change:delete_rep_spells change:delete_rep_weapon change:delete_rep_item change:delete_rep_ability change:delete_rep_mythic-feat change:delete_rep_mythic-ability change:delete_rep_buff change:delete_rep_buff2 change:delete_rep_trait change:delete_rep_racial-trait change:delete_rep_feat change:delete_rep_class-ability change:delete_rep_npc-spell-like-abilities',
    TAS.callback(function eventDeleteOldList(eventInfo) {
      TAS.debug('caught ' + eventInfo.sourceAttribute + ' event: ' + eventInfo.sourceType);
      if (eventInfo.sourceType === 'player' || eventInfo.sourceType === 'api') {
        getAttrs([eventInfo.sourceAttribute], function (v) {
          var section = '';
          if (parseInt(v[eventInfo.sourceAttribute], 10)) {
            section = eventInfo.sourceAttribute.replace('delete_rep_', '');
            SWUtils.deleteRepeating(function () {
              var setter;
              setter = {};
              setter[eventInfo.sourceAttribute] = 0;
              setter[eventInfo.sourceAttribute + '_btn'] = 0;
              SWUtils.setWrapper(setter, {silent: true});
              if (/buff/i.test(eventInfo.sourceAttribute)) {
                PFBuffs.clearBuffTotals();
              }
            }, section);
          }
        });
      }
    }),
  );

  on('change:hide_announcements', function () {
    var setter = {};
    setter[PFConst.announcementVersionAttr] = 1;
    setAttrs(setter, PFConst.silentParams);
  });
}
registerEventHandlers();
