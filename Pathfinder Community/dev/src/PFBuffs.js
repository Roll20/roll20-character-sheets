'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils from './PFUtils';
import * as PFAbilityScores from './PFAbilityScores';
import * as PFSaves from './PFSaves';
import * as PFAttackGrid from './PFAttackGrid';
import * as PFAttacks from './PFAttacks';
import * as PFDefense from './PFDefense';
import * as PFHealth from './PFHealth';
import * as PFChecks from './PFChecks';
import * as PFInitiative from './PFInitiative';
import * as PFEncumbrance from './PFEncumbrance';
import * as PFSize from './PFSize';
import * as PFSkills from './PFSkills';
import * as PFBuffsOld from './PFBuffsOld';

export var
	//values in the bonus dropdown
	buffColumns = [
		'ac', 'armor', 'attack', 'casterlevel', 'cha', 'cha_skills', 'check', 'check_ability', 'check_skills', 'cmb', 'cmb2', 'cmd', 'con', 'con_skills', 'crit_conf', 'customa1', 'customa10', 'customa11', 'customa12', 'customa2', 'customa3', 'customa4', 'customa5', 'customa6', 'customa7', 'customa8', 'customa9', 'dex', 'dex_skills', 'dmg', 'dmg_kineticblast', 'dmg_melee', 'dmg_melee2', 'dmg_power_attack', 'dmg_ranged', 'dmg_ranged2', 'flatfooted', 'fort', 'hptemp', 'initiative', 'int', 'int_skills', 'kineticblast', 'melee', 'melee2', 'natural', 'ranged', 'ranged2', 'ref', 'saves', 'shield', 'size', 'speed', 'spelldc_0', 'spelldc_1', 'spelldc_2', 'str', 'str_skills', 'touch', 'will', 'wis', 'wis_skills'],
	//map of buffColumns to corresponding total field (buff_XYZ-total only XYZ portion)
	buffToTot = {
		'ac': 'AC', 'armor': 'armor', 'attack': 'attack', 'casterlevel': 'CasterLevel', 'cha': 'CHA', 'cha_skills': 'CHA_skills', 'check': 'Check', 'check_ability': 'check_ability', 'check_skills': 'check_skills', 'cmb': 'CMB', 'cmd': 'CMD', 'con': 'CON', 'con_skills': 'CON_skills', 'dex': 'DEX', 'dex_skills': 'DEX_skills', 'dmg': 'DMG', 'dmg_melee': 'dmg_melee', 'dmg_ranged': 'dmg_ranged', 'flatfooted': 'flat-footed', 'fort': 'Fort', 'hptemp': 'HP-temp', 'initiative': 'Initiative', 'int': 'INT', 'int_skills': 'INT_skills', 'melee': 'Melee', 'natural': 'natural', 'ranged': 'Ranged', 'ref': 'Ref', 'saves': 'saves', 'shield': 'shield', 'size': 'size', 'speed': 'speed', 'spelldc_0': 'SpellDC_0', 'spelldc_1': 'SpellDC_1', 'spelldc_2': 'SpellDC_2', 'str': 'STR', 'str_skills': 'STR_skills', 'touch': 'Touch', 'will': 'Will', 'wis': 'WIS', 'wis_skills': 'WIS_skills', 'melee2': 'melee2', 'ranged2': 'ranged2', 'cmb2': 'cmb2', 'dmg_melee2': 'dmg_melee2', 'dmg_ranged2': 'dmg_ranged2', 'kineticblast': 'kineticblast', 'dmg_kineticblast': 'dmg_kineticblast', 'dmg_power_attack': 'dmg_power_attack', 'customa1': 'customa1', 'customa2': 'customa2', 'customa3': 'customa3', 'customa4': 'customa4', 'customa5': 'customa5', 'customa6': 'customa6', 'customa7': 'customa7', 'customa8': 'customa8', 'customa9': 'customa9', 'customa10': 'customa10', 'customa11': 'customa11', 'customa12': 'customa12', 'crit_conf': 'crit_conf'
	},
	//only the total fields (buff_XYZ-total only XYZ portion) (no penalty fields)
	totColumns = _.values(buffToTot).concat(['dodge']).sort(),
	bonusTypes = ['alchemical', 'circumstance', 'competence', 'deflection', 'dodge', 'enhancement', 'inherent', 'insight', 'luck', 'morale', 'profane', 'racial', 'resistance', 'sacred', 'size', 'trait', 'untyped'];
//these have only their own type, enhancement, or untyped
var armorcols = ['armor', 'shield', 'natural'],

	//buffsFFcmdOnlyTemp = '',

	//map of buffs to other buffs that affect it. left is "parent" buff that is substracted from right
	buffsAffectingOthers = {
		'ac': ['cmd', 'touch', 'flatfooted'],
		'attack': ['melee', 'ranged', 'cmb', 'melee2', 'ranged2', 'cmb2'],
		'check': ['initiative', 'check_skills', 'check_ability', 'str_skills', 'dex_skills', 'con_skills', 'int_skills', 'wis_skills', 'cha_skills'],
		'dmg': ['dmg_melee', 'dmg_ranged', 'dmg_melee2', 'dmg_ranged2'],
		'dmg_melee': ['dmg_melee2'],
		'dmg_ranged': ['dmg_ranged2'],
		'saves': ['fort', 'ref', 'will'],
		'check_skills': ['str_skills', 'dex_skills', 'con_skills', 'int_skills', 'wis_skills', 'cha_skills']
	},
	//reverse map of buffsAffectingOthers, left is "child" buff, buff on right added to (and checked for stacking)
	affectedBuffs = {
		'melee': ['attack'],
		'melee2': ['melee', 'attack'],
		'ranged': ['attack'],
		'ranged2': ['ranged', 'attack'],
		'cmb': ['attack'],
		'cmb2': ['cmb', 'attack'],
		'dmg_melee': ['dmg'],
		'dmg_melee2': ['dmg_melee', 'dmg'],
		'dmg_ranged': ['dmg'],
		'dmg_ranged2': ['dmg_ranged', 'dmg'],
		'cmd': ['ac'],
		'flatfooted': ['ac'],
		'touch': ['ac'],
		'fort': ['saves'],
		'ref': ['saves'],
		'will': ['saves'],
		'check_skills': ['check'],
		'check_ability': ['check'],
		'initiative': ['check_ability', 'check'],
		'str_skills': ['check_skills', 'check'],
		'dex_skills': ['check_skills', 'check'],
		'con_skills': ['check_skills', 'check'],
		'int_skills': ['check_skills', 'check'],
		'wis_skills': ['check_skills', 'check'],
		'cha_skills': ['check_skills', 'check']
	},
	//all total fields plus "_exists", INCLUDING penalty fields
	buffTotFields = _.chain(totColumns).map(function (totstr) {
		var isAbility = (PFAbilityScores.abilities.indexOf(totstr) >= 0) && totstr.indexOf('skill') < 1;
		if (!isAbility) {
			return ['buff_' + totstr + '-total', 'buff_' + totstr + '_exists'];
		} else {
			return ['buff_' + totstr + '-total', 'buff_' + totstr + '_exists', 'buff_' + totstr + '-total_penalty', 'buff_' + totstr + '_penalty_exists'];
		}
	}).flatten().value(),
	//map of buffs to another map of bonus type to other fields on sheet of same bonus and type
	otherCharBonuses = {
		'str': {'inherent': 'STR-inherent', 'enhancement': 'STR-enhance'},
		'dex': {'inherent': 'DEX-inherent', 'enhancement': 'DEX-enhance'},
		'con': {'inherent': 'CON-inherent', 'enhancement': 'CON-enhance'},
		'int': {'inherent': 'INT-inherent', 'enhancement': 'INT-enhance'},
		'wis': {'inherent': 'WIS-inherent', 'enhancement': 'WIS-enhance'},
		'cha': {'inherent': 'CHA-inherent', 'enhancement': 'CHA-enhance'},
		'initiative': {'trait': 'init-trait'},
		'fort': {'resistance': 'Fort-resist', 'trait': 'Fort-trait'},
		'ref': {'resistance': 'Ref-resist', 'trait': 'Ref-trait'},
		'will': {'resistance': 'Will-resist', 'trait': 'Will-trait'},
		'ac': {'deflection': 'AC-deflect'},
		'armor': {'armor': 'armor3-acbonus', 'enhancement': 'armor3-enhance'},
		'shield': {'shield': 'shield3-acbonus', 'enhancement': 'shield3-enhance'},
		'natural': {'natural': 'AC-natural'}
	},
	charHelperFields = {
		'armor': ['armor3-equipped'],//,'use_piecemeal_armor'],
		'shield': ['shield3-equipped']//,'use_piecemeal_armor']
	},
	//reverse otherCharBonuses: fields on sheet that affect buffs (all leaf nodes of otherCharBonuses)
	charBonusFields = _.chain(otherCharBonuses).values().map(function (v) {return _.values(v);}).flatten().uniq().value().sort(),
	//note fields
	buffNoteFields = ['buff_attack_notes', 'buff_save_notes', 'buff_init_notes', 'buff_skill_notes', 'buff_defense_notes'],
	//the buff field prefixes for each row
	buffsPerRow = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
	//bonus types that always stack don't need to use max (penalty is fake type used internally)
	stackingTypes = ['untyped', 'circumstance', 'dodge', 'penalty'],
	//these buff columns dont have bonus types use this to hide the type dropdown
	bonusesWithNoTypes = ['size', 'hptemp'],
	//all attributes on a buff row, to make getAttrs easier when totalling
	buffRowAttrs = ['_b1-show', '_b1_val', '_b1_bonus', '_b1_bonustype',
		'_b2-show', '_b2_val', '_b2_bonus', '_b2_bonustype',
		'_b3-show', '_b3_val', '_b3_bonus', '_b3_bonustype',
		'_b4-show', '_b4_val', '_b4_bonus', '_b4_bonustype',
		'_b5-show', '_b5_val', '_b5_bonus', '_b5_bonustype',
		'_b6-show', '_b6_val', '_b6_bonus', '_b6_bonustype',
		'_enable_toggle', '_add_note_to_roll'],
	events = {
		// events pass in the column updated macro-text is "either", buffs are auto only
		buffTotalNonAbilityEvents: {
			"Fort": [PFSaves.updateSave],
			"Will": [PFSaves.updateSave],
			"Ref": [PFSaves.updateSave],
			"STR_skills": [PFSkills.recalculateAbilityBasedSkills],
			"DEX_skills": [PFSkills.recalculateAbilityBasedSkills],
			"CON_skills": [PFSkills.recalculateAbilityBasedSkills],
			"INT_skills": [PFSkills.recalculateAbilityBasedSkills],
			"WIS_skills": [PFSkills.recalculateAbilityBasedSkills],
			"CHA_skills": [PFSkills.recalculateAbilityBasedSkills],
			"Melee": [PFAttackGrid.updateAttackGrid],
			"Ranged": [PFAttackGrid.updateAttackGrid],
			"CMB": [PFAttackGrid.updateAttackGrid],
			"melee2": [PFAttackGrid.updateAttackGrid],
			"ranged2": [PFAttackGrid.updateAttackGrid],
			"cmb2": [PFAttackGrid.updateAttackGrid]
		},
		buffTotalAbilityEvents: {
			"STR": [PFAbilityScores.updateAbilityScore],
			"DEX": [PFAbilityScores.updateAbilityScore],
			"CON": [PFAbilityScores.updateAbilityScore],
			"INT": [PFAbilityScores.updateAbilityScore],
			"WIS": [PFAbilityScores.updateAbilityScore],
			"CHA": [PFAbilityScores.updateAbilityScore]
		},
		buffEventsTotalOnUpdate: {
			"buff_Check-total": [PFSkills.updateAllSkillsDiff],
			"buff_check_skills-total": [PFSkills.updateAllSkillsDiff]
		},
		// events do NOT pass in column updated
		buffTotalEventsNoParam: {
			"DMG": [PFAttacks.updateRepeatingWeaponDamages],
			"dmg_ranged": [PFAttacks.updateRepeatingWeaponDamages],
			"dmg_melee": [PFAttacks.updateRepeatingWeaponDamages],
			"dmg_ranged2": [PFAttacks.updateRepeatingWeaponDamages],
			"dmg_melee2": [PFAttacks.updateRepeatingWeaponDamages],
			"dmg_power_attack": [PFAttacks.updateRepeatingWeaponDamages],
			"saves": [PFSaves.updateSaves],
			"attack": [PFAttackGrid.updateAttacks],
			"AC": [PFDefense.updateDefenses],
			"Touch": [PFDefense.updateDefenses],
			"armor": [PFDefense.updateDefenses],
			"shield": [PFDefense.updateDefenses],
			"dodge": [PFDefense.updateDefenses],
			"natural": [PFDefense.updateDefenses],
			"flat-footed": [PFDefense.updateDefenses],
			"CMD": [PFDefense.updateDefenses],
			"HP-temp": [PFHealth.updateTempMaxHP],
			"Check": [PFInitiative.updateInitiative],
			"check_ability": [PFInitiative.updateInitiative],
			"initiative": [PFInitiative.updateInitiative],
			"speed": [PFEncumbrance.updateModifiedSpeed]
		}
	};

/** Copies buffs from repeating_buff to repeating_buff2
 * Reverse engineers "to all attacks", "to all damage" etc
 * @param {function} callback when done
 */
function mergeOldIntoNewBuffs (callback) {
	var done = function (failed) {
		//set checkbox
		SWUtils.setWrapper({'merge_buffs_now': 0}, PFConst.silentParams, function () {
			if (typeof callback === "function") {
				callback();
			}
		});
	};
	PFBuffsOld.getAllRowAttrs(function (ids, v) {
		var setter = {};
		if (!ids || !v) {
			done(1);
			return;
		}
		//TAS.debug("OLD BUFFS ARE: ", ids, v);
		ids.forEach(function (id) {
			var prefix = 'repeating_buff_' + id + '_',
				newId = '',
				newprefix = '',
				buffCounter = 0,
				tempprefix = '',
				buffprefix = '',
				newBuffName = '',
				buffs = [],
				doneAttacks = 0,
				doneAC = 0,
				doneSaves = 0;
			try {
				//filter for attribute/ values from v for this id row:
				//then filter for buffs w macro-text only (to get one val per row, and only where user entered text, cause others there too w/defaults
				//then get the attr name from the macro text attribute (after id_, before _macro-text)
				//then filter for buffs where -show is 1
				buffs = Object.keys(v).filter(function (attr) {
					return (attr.indexOf(prefix) === 0);
				}).filter(function (attr) {
					return (/size$|macro\-text$/i).test(attr);
				}).filter(function (macroattr) {
					if (v[macroattr]) {
						return true;
					}
					return false;
				}).map(function (attr) {
					if (attr.indexOf('size') >= 0) {
						return 'size';
					}
					return SWUtils.getAttributeName(attr).slice(5, -11); //get only the buff name
				}).filter(function (attr) {
					return (parseInt(v[prefix + 'buff-' + attr + '-show'], 10) === 1); //only where -show checked
				});
				//TAS.debug("BUFFS MERGE LEFT ON ROW "+id+" are ",buffs);
				//if any left then create new buff2 row
				if (_.size(buffs)) {
					newId = generateRowID();
					newprefix = 'repeating_buff2_' + newId + '_';
					tempprefix = newprefix + 'b';
					setter[newprefix + 'enable_toggle'] = v[prefix + 'buff-enable_toggle'] || '0';
					setter[newprefix + 'name'] = v[prefix + 'buff-name'] || '';
					if (v[prefix + 'buff-notes']) {
						setter[newprefix + 'notes'] = v[prefix + 'buff-notes'];
					}
					//size has special handling
					if (buffs.indexOf('size') >= 0) {
						//TAS.debug("adding buff for size");
						buffCounter++;
						buffprefix = tempprefix + buffCounter;
						setter[buffprefix + '-show'] = 1;
						setter[buffprefix + '_macro-text'] = v[prefix + 'buff-size'];
						setter[buffprefix + '_val'] = v[prefix + 'buff-size'];
						setter[buffprefix + '_bonus'] = 'size';
						buffs = _.without(buffs, 'size');
					}
					//check for buffs that should be combined into 1:
					if (buffs.indexOf('CMD') >= 0 && buffs.indexOf('AC') >= 0) {
						if (parseInt(v[prefix + 'buff-AC'], 10) === parseInt(v[prefix + 'buff-CMD'], 10)) {
							//TAS.debug('both ac and cmd');
							buffCounter++;
							buffprefix = tempprefix + buffCounter;
							setter[buffprefix + '-show'] = 1;
							setter[buffprefix + '_macro-text'] = v[prefix + 'buff-AC_macro-text'];
							setter[buffprefix + '_val'] = v[prefix + 'buff-AC'];
							setter[buffprefix + '_bonus'] = 'ac';
							if (buffs.indexOf('Touch')) {
								setter[buffprefix + '_bonustype'] = 'deflection';
							} else {
								setter[buffprefix + '_bonustype'] = 'untyped';
							}
							//if flat footed assume uncanny dodge already so will be built in
							buffs = _.without(buffs, 'AC', 'CMD', 'flat-footed', 'Touch');
						}
					}
					if (buffs.indexOf('Melee') >= 0 && buffs.indexOf('Ranged') >= 0) {
						//assume they did not add CMB since it is brand new
						if (parseInt(v[prefix + 'buff-Melee'], 10) === parseInt(v[prefix + 'buff-Ranged'], 10)) {
							//TAS.debug('both melee and ranged');
							buffCounter++;
							buffprefix = tempprefix + buffCounter;
							setter[buffprefix + '-show'] = 1;
							setter[buffprefix + '_macro-text'] = v[prefix + 'buff-Melee_macro-text'];
							setter[buffprefix + '_val'] = v[prefix + 'buff-Melee'];
							setter[buffprefix + '_bonus'] = 'attack';
							setter[buffprefix + '_bonustype'] = 'untyped';
							buffs = _.without(buffs, 'Melee', 'Ranged', 'CMB');
						}
					}
					if (buffs.indexOf('Fort') >= 0 && buffs.indexOf('Will') >= 0 && buffs.indexOf('Ref') >= 0) {
						if (parseInt(v[prefix + 'buff-Fort'], 10) === parseInt(v[prefix + 'buff-Will'], 10) === parseInt(v[prefix + 'buff-Ref'], 10)) {
							//TAS.debug('all saves');
							buffCounter++;
							buffprefix = tempprefix + buffCounter;
							setter[buffprefix + '-show'] = 1;
							setter[buffprefix + '_macro-text'] = v[prefix + 'buff-Fort_macro-text'];
							setter[buffprefix + '_val'] = v[prefix + 'buff-Fort'];
							setter[buffprefix + '_bonus'] = 'saves';
							setter[buffprefix + '_bonustype'] = 'untyped';
							buffs = _.without(buffs, 'Fort', 'Will', 'Ref');
						}
					}
					if (buffs.indexOf('Check') >= 0 && buffs.indexOf('check_skills') >= 0) {
						if (parseInt(v[prefix + 'buff-Check'], 10) === parseInt(v[prefix + 'buff-check_skills'], 10)) {
							//TAS.debug('both Check and check_skills');
							buffCounter++;
							buffprefix = tempprefix + buffCounter;
							setter[buffprefix + '-show'] = 1;
							setter[buffprefix + '_macro-text'] = v[prefix + 'buff-Check_macro-text'];
							setter[buffprefix + '_val'] = v[prefix + 'buff-Check'];
							setter[buffprefix + '_bonus'] = 'check';
							setter[buffprefix + '_bonustype'] = 'untyped';
							buffs = _.without(buffs, 'Check', 'check_skills');
						}
					}
					if (buffs.indexOf('DMG') >= 0 && buffs.indexOf('DMG_ranged') >= 0) {
						if (parseInt(v[prefix + 'buff-DMG'], 10) === parseInt(v[prefix + 'buff-DMG_ranged'], 10)) {
							//TAS.debug("found all damage");
							buffCounter++;
							buffprefix = tempprefix + buffCounter;
							setter[buffprefix + '_macro-text'] = v[prefix + 'buff-DMG_macro-text'];
							setter[buffprefix + '_val'] = v[prefix + 'buff-DMG'];
							setter[buffprefix + '_bonus'] = 'dmg';
							setter[buffprefix + '_bonustype'] = 'untyped';
							setter[buffprefix + '-show'] = 1;
							buffs = _.without(buffs, 'DMG', 'DMG_ranged');
						}
					}
					//loop through any buffs left
					//TAS.debug("NON SPECIAL BUFFS LEFT: ",buffs);
					buffs.forEach(function (buff) {
						//TAS.debug("adding buff "+buff+" to setter, macro is "+v[prefix+'buff-'+buff+'_macro-text']);
						buffCounter++;
						if (buffCounter > 6) {
							buffCounter = 1;
							newId = generateRowID();
							newprefix = 'repeating_buff2_' + newId + '_';
							tempprefix = newprefix + 'b';
							setter[newprefix + 'enable_toggle'] = v[prefix + 'buff-enable_toggle'];
							setter[newprefix + 'name'] = v[prefix + 'buff-name'];
						}
						buffprefix = tempprefix + buffCounter;
						setter[buffprefix + '-show'] = 1;
						setter[buffprefix + '_macro-text'] = v[prefix + 'buff-' + buff + '_macro-text'];
						setter[buffprefix + '_val'] = v[prefix + 'buff-' + buff] || 0;
						newBuffName = buff.toLowerCase().replace('-', '');
						if (newBuffName === 'check') {
							newBuffName = 'check_ability';
						} else if (newBuffName === 'dmg') {
							newBuffName = 'dmg_melee';
						}
						setter[buffprefix + '_bonus'] = newBuffName;
						setter[buffprefix + '_bonustype'] = 'untyped';
					});
				}
			} catch (erri) {
				TAS.error("Buff copy error for " + id + " " + (v['repeating_buff_' + id + '_buff-name'] || ''), erri);
			}
		});
		if (_.size(setter)) {
			TAS.debug("##############################", "MERGE BUFFS NEW BUFFS ARE: ", setter);
			SWUtils.setWrapper(setter, PFConst.silentParams, done);
			//done();
		} else {
			done();
		}
	});
}

/** Looks at add_note_to_roll attribute of row and sets notes appropriately.
 * @param {string} id id of row to calculate on
 * @param {Map<string,string>} v from getAttrs
 * @param {Map<string,string>} setter map to write to for setAttrs, optional
 * @returns {Map<string,string>} setter or new map for setAttrs
 */
function getBuffNotes (id, v, setter) {
	var idStr = SWUtils.getRepeatingIDStr(id),
		prefix = 'repeating_buff2_' + idStr,
		notestr = '', buffstr = '', notefield = '', notereg, addNote = 0, tempstr = '';
	try {
		setter = setter || {};
		if (v[prefix + 'add_note_to_roll']) {
			notefield = 'buff_' + v[prefix + 'add_note_to_roll'] + '_notes';
		}
		if (parseInt(v[prefix + 'enable_toggle'], 10) === 1 && notefield) {
			addNote = 1;
		}
		buffstr = SWUtils.getTranslated('buff');
		notestr = '**' + buffstr + ": @{" + prefix + 'name}:** @{' + prefix + 'notes}';
		notereg = new RegExp(SWUtils.escapeForRegExp(notestr), 'i');
		if (notefield) {
			tempstr = v[notefield] || '';
			//TAS.debug("the note is "+tempstr);
			if (!tempstr) {
				if (addNote) {
					setter[notefield] = notestr;
				}
			} else if (notereg.test(tempstr)) {
				if (!addNote) {
					setter[notefield] = tempstr.replace(notereg, '');
				}
			} else if (addNote) {
				setter[notefield] = tempstr + notestr;
			}
			buffNoteFields.forEach(function (note) {
				if (note !== notefield) {
					tempstr = v[note];
					if (tempstr) {
						tempstr = tempstr.replace(notereg, '');
						if (tempstr !== v[note]) {
							setter[note] = tempstr;
						}
					}
				}
			});
		} else {
			//delete from all
			buffNoteFields.forEach(function (note) {
				tempstr = v[note];
				if (tempstr) {
					tempstr = tempstr.replace(notereg, '');
					if (tempstr !== v[note]) {
						setter[note] = tempstr;
					}
				}
			});
		}
	} catch (er) {

	} finally {
		return setter;
	}
}
/**Looks at add_note_to_roll attribute of row and sets notes appropriately.
 * calls getBuffNotes
 * @param {string} id id of row, optional
 * @param {object} eventInfo from on function, either id or this must be populated.
 */
function addNoteAsync (id, eventInfo) {
	var idStr, prefix, fields;
	if (!id && !eventInfo) {
		return;
	}
	id = id || SWUtils.getRowId(eventInfo.sourceAttribute);
	idStr = SWUtils.getRepeatingIDStr(id);
	prefix = 'repeating_buff2_' + idStr;

	fields = buffNoteFields.concat([prefix + 'add_note_to_roll', prefix + 'enable_toggle']);
	//TAS.debug("the fields are ",fields);
	getAttrs(fields, function (v) {
		var setter = getBuffNotes(id, v);
		if (_.size(setter)) {
			//TAS.debug('PFBuffs set notes',setter);
			SWUtils.setWrapper(setter, PFConst.silentParams);
		}
	});
}
/** sets all buff totals to 0, and the buff notes fields to blank.
 * @param {function} callback
 * @param {boolean} silently
 */
export function clearBuffTotals (callback, silently) {
	var done = function () {
		if (typeof callback === "function") {
			callback();
		}
	};
	//TAS.notice("the total fields are ",buffTotFields2);
	getAttrs(buffTotFields, function (v) {
		var setter = {}, params = {};
		//TAS.debug("PFBuffs.clearBuffTotals we got back the following: ",v);
		//TAS.notice("now using ",totColumns);
		setter = _.reduce(totColumns, function (memo, col) {
			var val = parseInt(v['buff_' + col + '-total'], 10) || 0,
				exists = parseInt(v['buff_' + col + '_exists'], 10) || 0;
			if (val) {
				memo['buff_' + col + '-total'] = 0;
			}
			if (exists) {
				memo['buff_' + col + '_exists'] = 0;
			}
			return memo;
		}, {});
		//zero ability penalties
		setter = _.reduce(PFAbilityScores.abilities, function (memo, col) {
			var val = parseInt(v['buff_' + col + '-total_penalty'], 10) || 0,
				exists = parseInt(v['buff_' + col + '_penalty_exists'], 10) || 0;
			if (val) {
				memo['buff_' + col + '-total_penalty'] = 0;
			}
			if (exists) {
				memo['buff_' + col + '_penalty_exists'] = 0;
			}
			return memo;
		}, setter);
		//clear notes
		buffNoteFields.forEach(function (attr) {
			setter[attr] = '';
		});
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

/** Gets list of buffs from the buff rows for so we don't have to keep looping through the ids.
 * Returns between 0 to 6 "rows" for each id, each corresponds to b1..b6 buffs.
 * only returns buffs where -show is 1 and _val is != 0 (i.e. ones that exist for totalling)
 * @param {[string]} ids ids for list
 * @param {Map<string,string>} v from getAttrs
 * @param {string} col optional, buff to limit on. If supplied, only returns buffs where bonus =col, plus any related buffs
 * @returns {[{'bonus':string,'bonusType':string,'val':Number}]} array of entries from rows
 */
function assembleRows (ids, v, col) {
	var relatedBuffsL = [];
	if (col) {
		relatedBuffsL = affectedBuffs[col] || [];
		relatedBuffsL = relatedBuffsL.concat(buffsAffectingOthers[col] || []);
	}
	//TAS.debug("assembleRows for "+col + " includes fields "+ relatedBuffsL);
	var rows = ids.reduce(function (m, id) {
		var valArray, prefix = 'repeating_buff2_' + id + '_';
		try {
			valArray = buffsPerRow.reduce(function (im, n) {
				var innerPrefix = prefix + n,
					bonusField = innerPrefix + '_bonus', vals = {};
				try {
					//TAS.debug("assembleRows looking at "+ bonusField  +" = " + v[bonusField] + " show is "+ v[innerPrefix+'-show']);
					if (v[bonusField] && parseInt(v[innerPrefix + '-show'], 10) === 1) {
						if (!col || v[bonusField] === col || relatedBuffsL.indexOf(v[bonusField]) >= 0) {
							vals.bonus = v[bonusField];
							vals.val = parseInt(v[innerPrefix + '_val'], 10) || 0;
							if (vals.bonus === 'size') {
								vals.bonusType = vals.bonus;
							} else if (vals.bonus === 'hptemp') {
								vals.bonusType = 'untyped';
							} else if (armorcols.indexOf(vals.bonus) >= 0) {
								//TAS.debug("PFBUFFS rows type: "+vals.bonus+" is "+ v[innerPrefix+'_bonustype']);
								if (v[innerPrefix + '_bonustype'] === 'enhancement') {
									vals.bonusType = 'enhancement';
								} else {
									vals.bonusType = vals.bonus;
								}
							} else {
								vals.bonusType = v[innerPrefix + '_bonustype'] || 'untyped';
							}
							//TAS.debug("adding the set ",vals);
							im.push(vals);
						}
					}
				} catch (er2) {
					TAS.error("PFBuffs.assembleRows col:" + col + ", row:" + id + ", buff:" + n, er2);
				} finally {
					return im;
				}
			}, []);
			if (valArray && _.size(valArray)) {
				//TAS.debug("assembleRows this row had these",valArray);
				m = m.concat(valArray);
			}
		} catch (erri3) {
			TAS.error("PFBuffs.assembleRows erri3:", erri3);
		} finally {
			return m;
		}
	}, []);
	//TAS.debug("assembleRows returning with ",rows);
	return rows;
}
/** Calculates total for given bonus and returns it in setter map. Synchronous.
 * @param {string} col which bonus we are calculating (val from 'bonus' dropdown)
 * @param {[{'bonus':string,'bonusType':string,'val':Number}]} rows output from assembleRows
 * @param {Map<string,string>} v from getAttrs
 * @param {Map<string,string>} setter map to write to for setAttrs, optional
 * @returns {Map<string,string>} setter or new map for setAttrs
 */
function updateBuffTotal (col, rows, v, setter) {
	var isAbility = 0,
		bonuses = {},
		sums = {'sum': 0, 'pen': 0},
		tempInt = 0,
		totaldodge = 0, tempdodge = 0,
		totalcol = '',
		isWorn = 1,
		//stackArmor=0,
		columns = [col];

	try {
		//TAS.debug("total sync for "+col,rows,v);
		setter = setter || {};
		isAbility = (PFAbilityScores.abilities.indexOf(col) >= 0) && col.indexOf('skill') < 9;
		if (affectedBuffs[col]) {
			columns = columns.concat(affectedBuffs[col]);
		}
		rows = rows.filter(function (row) {
			if (columns.indexOf(row.bonus) >= 0) {
				return 1;
			}
			return 0;
		});
		if (rows && _.size(rows)) {
			TAS.debug("PFBUFFS ROWS NOW:", rows);
			if (col === 'hptemp') {
				//hptemp=alwaysstack
				sums.sum = rows.filter(function (row) {
					return row.val > 0;
				}).reduce(function (m, row) {
					m += (row.val || 0);
					return m;
				}, 0);
			} else if (col === 'size') {
				//size=neverstack , negative is not a penalty
				sums = rows.reduce(function (m, row) {
					if (row.val > 0) {
						m.sum = Math.max(m.sum, row.val);
					} else if (row.val < 0) {
						m.pen = Math.min(m.pen, row.val);
					}
					return m;
				}, sums);
				sums.sum += sums.pen;
			} else {
				//if (col==='armor'||col==='shield'){
				//	stackArmor = 0;//parseInt(v.use_piecemeal_armor,10)||0;
				//}
				//stack all rows
				bonuses = rows.reduce(function (m, row) {
					if (row.bonus === col) {
						if (row.val < 0) {
							m.penalty = (m.penalty || 0) + row.val;
						} else if (stackingTypes.includes(row.bonusType)) { // || stackArmor ) {
							m[row.bonusType] = (m[row.bonusType] || 0) + row.val;
						} else {
							m[row.bonusType] = Math.max((m[row.bonusType] || 0), row.val);
						}
					}
					return m;
				}, {});
				//subtract any nonstacking parent buffs affecting it:
				if (_.size(columns) > 1) {
					bonuses = rows.reduce(function (m, row) {
						if (stackingTypes.indexOf(row.bonusType) < 0 &&
							affectedBuffs[col].indexOf(row.bonus) >= 0 &&
							row.val > 0 && m[row.bonusType] > 0) {
							if (row.val < m[row.bonusType]) {
								m[row.bonusType] -= row.val;
							} else {
								m[row.bonusType] = 0;
							}
						}
						return m;
					}, bonuses);
				}
				if (!((col === 'armor' && bonuses.armor > 0) || (col === 'shield' && bonuses.shield > 0))) {
					//subtract charsheet fields (charField) that overlap:
					_.each(otherCharBonuses[col], function (charField, bonusType) {
						TAS.debug("PFBUFFS ################## type:" + bonusType + ", comparing to " + charField);
						if (bonuses[bonusType]) {
							tempInt = parseInt(v[charField], 10) || 0;
							if (bonuses[bonusType] <= tempInt) {
								bonuses[bonusType] = 0;
							} else {
								bonuses[bonusType] -= tempInt;
							}
						}
					});
					//NOW START SUMMING
					//if ability, penalty is applied seperately
					if (isAbility && _.contains(bonuses, 'penalty')) {
						sums.pen = bonuses.penalty;
						bonuses.penalty = 0;
					}
					//if ac,touch,cmd,flatfooted, copy dodge out
					if (col === 'ac' && bonuses.dodge) {
						if (col === 'ac') {
							totaldodge += bonuses.dodge;
						}
						bonuses.dodge = 0;
					}
					sums.sum = _.reduce(bonuses, function (m, bonus, bonusType) {
						m += bonus;
						return m;
					}, 0);
				} else {
					//if armor or shield then compare both
					//if only enhance then is ok to use above
					TAS.debug("PFBUFFS ac bonsuses  ", bonuses, otherCharBonuses[col]);
					sums.sum = _.reduce(bonuses, function (m, bonus, bonusType) {
						if (bonus > 0) {
							m += bonus;
						}
						return m;
					}, 0);
					sums.pen = _.reduce(bonuses, function (m, bonus, bonusType) {
						if (bonus < 0) {
							m += bonus;
						}
						return m;
					}, 0);
					//if (!stackArmor){ ]
					isWorn = parseInt(v[col + '3-equipped'], 10) || 0;
					tempInt = 0;
					if (isWorn) {
						tempInt = _.reduce(otherCharBonuses[col], function (tot, charField, bonusType) {
							tot += parseInt(v[charField], 10) || 0;
							return tot;
						}, 0);
					}

					if (sums.sum > 0 && tempInt > 0) {
						if (sums.sum <= tempInt) {
							sums.sum = 0;
						} else if (sums.sum > tempInt) {
							sums.sum -= tempInt;
						}
					}
					if (sums.pen !== 0) {
						sums.sum += sums.pen;
					}
				}
			}
		}
		if (col === 'ac') {
			TAS.info("column is AC, setting dodge to " + totaldodge);
			//this means we ignore dodge, deflection to touch, cmd, flatfooted
			tempdodge = parseInt(v['buff_dodge-total'], 10) || 0;
			//ignore dodge and deflect for any other than ac
			if (totaldodge !== tempdodge) {
				setter['buff_dodge-total'] = totaldodge;
			}
			tempInt = parseInt(v['buff_dodge_exists'], 10) || 0;
			if (totaldodge && !tempInt) {
				setter['buff_dodge_exists'] = 1;
			} else if (tempInt && !totaldodge) {
				setter['buff_dodge_exists'] = 0;
			}
		}

		// section added below to prevent cmd(type:dodge) buff from being included with cmdff
		if(col==='cmd' && bonuses.dodge!==0) {
			TAS.info('column is CMD, setting buffsFFcmdOnlyTemp to dodge buff:'+bonuses.dodge);
			let buffsFFcmdOnlyTemp = bonuses.dodge;
			setter['buff_ffCMD-nododge'] = buffsFFcmdOnlyTemp || 0;
			TAS.info('buff_ffCMD-nododge now set same as dodge buff:'+buffsFFcmdOnlyTemp);
		}

		totalcol = buffToTot[col];
		if (totalcol) {
			if (parseInt(v['buff_' + totalcol + '-total'], 10) !== sums.sum) {
				setter['buff_' + totalcol + '-total'] = sums.sum;
			}
			tempInt = parseInt(v['buff_' + totalcol + '_exists'], 10) || 0;
			if (sums.sum !== 0 && tempInt === 0) {
				setter['buff_' + totalcol + '_exists'] = 1;
			} else if (sums.sum === 0 && tempInt === 1) {
				setter['buff_' + totalcol + '_exists'] = 0;
			}
			if (isAbility) {
				if (parseInt(v['buff_' + totalcol + '-total_penalty'], 10) !== sums.pen) {
					setter['buff_' + totalcol + '-total_penalty'] = sums.pen;
				}
				tempInt = parseInt(v['buff_' + totalcol + '_penalty_exists'], 10) || 0;
				if (sums.pen !== 0 && tempInt === 0) {
					setter['buff_' + totalcol + '_penalty_exists'] = 1;
				} else if (sums.pen === 0 && tempInt === 1) {
					setter['buff_' + totalcol + '_penalty_exists'] = 0;
				}
			}
		} else {
			TAS.error("PFBuffs.updateBuffTotal cannot find total column corresponding to " + col);
		}
	} catch (err) {
		TAS.error("PFBuffs.updateBuffTotal", err);
	} finally {
		TAS.debug("######################", "PFBuffs setting ", setter);
		return setter;
	}
}
/** update total for given buff. calls assembleRows, updateBuffTotal for the column.
 * @param {string} col the bonus/buff to calculate
 * @param {function} callback when done
 * @param {boolean} silently if set with silent true
 */
function updateBuffTotalAsync (col, callback, silently) {
	var done = _.once(function () {
		//TAS.debug("leaving PFBuffs.updateBuffTotalAsync for "+col);
		if (typeof callback === "function") {
			callback();
		}
	}),
		isAbility = (PFAbilityScores.abilities.indexOf(col) >= 0) && col.indexOf('skill') < 0;
	//TAS.debug("totalling async vfor "+ col);
	getSectionIDs('repeating_buff2', function (ids) {
		var fields, totfields, otherfields, totals = [], columnsToGet = [], columnsToUpdate = [];
		if (ids && _.size(ids)) {
			try {
				fields = SWUtils.cartesianAppend(['repeating_buff2_'], ids, buffRowAttrs);
				//columns = concat(buffsAffectingOthers[col]||[]).concat(affectedBuffs[col]||[]);
				columnsToGet = [col];
				columnsToUpdate = [col];
				if (buffsAffectingOthers[col]) {
					columnsToGet = columnsToGet.concat(buffsAffectingOthers[col]);
					columnsToUpdate = columnsToUpdate.concat(buffsAffectingOthers[col]);
				}
				if (affectedBuffs[col]) {
					columnsToGet = columnsToGet.concat(affectedBuffs[col]);
				}
				totals = columnsToUpdate.map(function (b) {return buffToTot[b];});
				if (col === 'ac') {
					totals.push('dodge')
				}
				totfields = totals.map(function (t) {return 'buff_' + t + '-total'}).concat(
					totals.map(function (t) {return 'buff_' + t + '_exists'}));
				if (isAbility) {
					totfields = totfields.concat(['buff_' + buffToTot[col] + '-total_penalty', 'buff_' + buffToTot[col] + '_penalty_exists']);
				}
				fields = fields.concat(totfields);
				fields = fields.concat(buffNoteFields);

				otherfields = columnsToGet.reduce(function (m, c) {
					if (otherCharBonuses[c]) {
						_.each(otherCharBonuses[c], function (bonus, bonustype) {
							m.push(bonus);
						});
					}
					return m;
				}, []);
				if (_.size(otherfields)) {
					fields = fields.concat(otherfields);
				}
				if (col === 'armor') {
					fields.push('armor3-equipped');
					//fields.push('use_piecemeal_armor');
				} else if (col === 'shield') {
					fields.push('shield3-equipped');
					//fields.push('use_piecemeal_armor');
				}
			} catch (outerr) {
				TAS.error("PFBUffs.updateBuffTotalAsync2 " + col + " error before getAttrs", outerr);
				done();
				return;
			}
			//TAS.debug("updateBuffTotalAsync fields ",fields,'#######################################');
			getAttrs(fields, function (v) {
				var rows, params = {}, setter = {}, diff = 0;
				try {
					//TAS.debug("PFBuffsasync got for "+ col+" v is",v);
					//don't need to put this in different loop but do it for future since when we move to multi column at once will need.
					ids = ids.filter(function (id) {
						return (parseInt(v['repeating_buff2_' + id + '_enable_toggle'], 10) || 0);
					});
					//TAS.debug("PFBuffsasync there are " +_.size(ids)+" rows" );
					if (_.size(ids)) {
						rows = assembleRows(ids, v, col);
						//TAS.debug("PFBUFFSASYNC rows ",rows);
						setter = columnsToUpdate.reduce(function (m, c) {
							return updateBuffTotal(c, rows, v, m);
						}, setter);
					} else {
						clearBuffTotals();
					}
				} catch (errou) {
					TAS.error("PFBuffs.updateBuffTotalAsync errou on col " + col, errou);
				} finally {
					if (_.size(setter)) {
						if (silently) {
							params = PFConst.silentParams;
						}
						_.each(setter, function (val, key) {
							if (events.buffEventsTotalOnUpdate[key]) {
								var tempint = parseInt(v[key], 10) || 0;
								diff += (parseInt(val, 10) - tempint);
							}
						});
						if (diff) {
							PFSkills.updateAllSkillsDiff(diff, 0);
						}
						SWUtils.setWrapper(setter, params, done);
					} else {
						done();
					}
				}
			});
		} else {
			clearBuffTotals(callback);
		}
	});
}
/** Updates all buff totals
 * @param {function} callback
 * @param {boolean} silently
 * @param {Map} eventInfo
 */
function updateAllBuffTotalsAsync (callback, silently, eventInfo) {
	var done = _.once(function () {
		//TAS.debug("leaving PFBuffs.updateBuffTotalAsync for "+col);
		if (typeof callback === "function") {
			callback();
		}
	});

	getSectionIDs('repeating_buff2', function (ids) {
		var fields, buffRepFields;
		if (!ids || _.size(ids) === 0) {
			clearBuffTotals(done, silently);
			return;
		}
		fields = SWUtils.cartesianAppend(['repeating_buff2_'], ids, buffRowAttrs);
		fields = fields.concat(buffTotFields);
		fields = fields.concat(charBonusFields);
		fields = fields.concat(['armor3-equipped', 'shield3-equipped']);//,'use_piecemeal_armor']);
		//TAS.debug("##########################","added in " , charBonusFields);
		//don't need to get notes since we're forcing a reset
		//fields = fields.concat(buffNoteFields);

		getAttrs(fields, function (v) {
			var rows = [], params = {}, setter = {};
			try {
				ids = ids.filter(function (id) {
					return (parseInt(v['repeating_buff2_' + id + '_enable_toggle'], 10) || 0);
				});
				if (!ids || _.size(ids) === 0) {
					clearBuffTotals(done, silently);
					return;
				}
				//start with blank notes to force reset
				buffNoteFields.forEach(function (attr) {
					setter[attr] = '';
					v[attr] = '';
				});
				//TAS.debug("PFBuffs.updateAllBuffTotalsAsync2 v is",v);
				setter = ids.reduce(function (m, id) {
					m = getBuffNotes(id, v, m);
					v = _.extend(v, m); // copy any updates back for next pass
					return m;
				}, setter);
				//now calculate totals.
				rows = assembleRows(ids, v);
				_.each(buffColumns, function (col) {
					setter = updateBuffTotal(col, rows, v, setter);
				});
			} catch (errou) {
				TAS.error("PFBuffs.updateAllBuffTotalsAsync2 errou on col ", errou);
			} finally {
				if (_.size(setter)) {
					//TAS.debug("######################","PFBuffs.updateAllBuffTotalsAsync2 setting ",setter);
					if (silently) {
						params = PFConst.silentParams;
					}
					SWUtils.setWrapper(setter, params, done);
				} else {
					done();
				}
			}
		});
	});
}
/**Sets 1 or 0 for buffexists in status panel (only for recalculate)
 * REFACTOR:  i think this can be deleted
 * @param {function} callback when done
 */
function resetStatuspanel (callback) {
	var done = _.once(function () {if (typeof callback === "function") {callback();} });
	getAttrs(buffTotFields, function (v) {
		var setter = {},
			getExists = function (pre, post) {
				var val, exists;
				post = post || '';
				val = parseInt(v[pre + "-total" + post], 10) || 0;
				exists = parseInt(v[pre + post + "_exists"], 10) || 0;
				if (val !== 0 && !exists) {
					return 1;
				}
				if (val === 0 && exists) {
					return 0;
				}
				return -1;
			};
		try {
			setter = _.reduce(totColumns, function (memo, col) {
				var pre, v;
				pre = "buff_" + col;
				v = getExists(pre, '');
				if (v === 1 || v === 0) {
					memo[pre + '_exists'] = v;
				}
				return memo;
			}, setter);
			setter = _.reduce(PFAbilityScores.abilities, function (memo, col) {
				var pre, v;
				pre = "buff_" + col;
				v = getExists(pre, '_penalty');
				if (v === 1 || v === 0) {
					memo[pre + '_penalty_exists'] = v;
				}
				return memo;
			}, setter);
		} catch (err) {
			TAS.error("PFBuffs.resetStatuspanel2 error inside calculate exists", err);
		} finally {
			if (_.size(setter) > 0) {
				SWUtils.setWrapper(setter, PFConst.silentParams, done);
			} else {
				done();
			}
		}
	});
}
function reEvaluateCustomMacros (callback, silently) {
	var done = _.once(function () {
		if (typeof callback === "function") {
			callback();
		}
	}),
		buffRowMacros2 = ['_b1-show', '_b1_val', '_b1_macro-text',
			'_b2-show', '_b2_val', '_b2_macro-text',
			'_b3-show', '_b3_val', '_b3_macro-text',
			'_b4-show', '_b4_val', '_b4_macro-text',
			'_b5-show', '_b5_val', '_b5_macro-text',
			'_b6-show', '_b6_val', '_b6_macro-text',
			'_enable_toggle'],
		recalculateBuffRow = function (callback, id, v) {
			var buffDone = _.after(6, callback);
			try {
				buffsPerRow.forEach(function (b) {
					if (parseInt(v['repeating_buff2_' + id + '_enable_toggle'], 10) &&
						parseInt(v['repeating_buff2_' + id + '_' + b + '-show'], 10)) {
						SWUtils.evaluateAndSetNumber('repeating_buff2_' + id + '_' + b + '_macro-text', 'repeating_buff2_' + id + '_' + b + '_val', 0, buffDone, true);
					} else {
						buffDone();
					}
				});
			} catch (err) {
				TAS.error("PFBuffs.reEvaluateCustomMacros2:  rowid" + id, err);
				buffDone();
			}

		};

	getSectionIDs("repeating_buff", function (ids) {
		//TAS.debug("PFBuffs.recalculate there are " + _.size(ids) + " rows and " + numColumns + " columns");
		var fields;
		try {
			if (_.size(ids) > 0) {
				fields = SWUtils.cartesianAppend(['repeating_buff2_'], ids, buffRowMacros2);
				getAttrs(fields, function (v) {
					var numRows = _.size(ids),
						doneRow = _.after(numRows, done);
					ids.forEach(function (id) {
						recalculateBuffRow(doneRow, id, v);
					});
				});
			} else {
				clearBuffTotals(done);
			}
		} catch (err) {
			TAS.error("PFBuffs.reEvaluateCustomMacros2", err);
			//what to do? just quit
			done();
		}
	});
}
/**
 *
 * @param {string} name name of buff from dropdown
 * @param {Map<string,string>} v attributes for con, speed, level
 * @param {boolean} onByDefault 1 or 0, 1 means enable buff on creation
 * @returns {Map<string,string>} to pass to setAttrs
 */
function getCommonBuffEntries (name, v, onByDefault) {
	var id, prefix = '', setter = {},
		calc = 0, conmod = 0, speed = 0, level = 0, tempint = 0, bab = 0;
	if (!name) {
		return setter;
	}
	id = generateRowID();
	prefix = 'repeating_buff2_' + id + '_';
	setter[prefix + 'enable_toggle'] = onByDefault ? 1 : 0;
	setter[prefix + 'tabcat2'] = '1';
	if (v) {
		conmod = parseInt(v['CON-mod'], 10);
		speed = parseInt(v['speed-base'], 10);
		level = parseInt(v['level'], 10);
		bab = parseInt(v['bab'], 10);
		if (!(isNaN(conmod) || isNaN(speed) || isNaN(level) || isNaN(bab))) {
			calc = 1;
		}
	}
	//TAS.debug("adding common buff for :"+name+" should calc is:"+calc,v);
	switch (name) {
		case 'rage':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-rage');
			setter[prefix + 'bufftype'] = 'class';
			setter[prefix + 'tabcat'] = 'class';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'str';
			setter[prefix + 'b1_bonustype'] = 'morale';
			setter[prefix + 'b1_macro-text'] = '4 + min(4,2*(floor(@{level}/11)+floor(@{level}/20)))';
			if (calc === 1) {
				if (level < 11) {
					tempint = 4;
				} else if (level === 20) {
					tempint = 8;
				} else {
					tempint = 6;
				}
			} else {
				tempint = 4;
			}
			setter[prefix + 'b1_val'] = tempint;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'con';
			setter[prefix + 'b2_bonustype'] = 'morale';
			setter[prefix + 'b2_macro-text'] = '4 + min(4,2*(floor(@{level}/11)+floor(@{level}/20)))';
			setter[prefix + 'b2_val'] = tempint;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'ac';
			setter[prefix + 'b3_bonustype'] = 'untyped';
			setter[prefix + 'b3_macro-text'] = '-2';
			setter[prefix + 'b3_val'] = -2;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b4_bonus'] = 'will';
			setter[prefix + 'b4_bonustype'] = 'morale';
			setter[prefix + 'b4_macro-text'] = '2 + min(4,(floor(@{level}/11)+floor(@{level}/20)))';
			tempint = tempint / 2;
			setter[prefix + 'b4_val'] = tempint;
			setter[prefix + 'add_note_to_roll'] = 'skill';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-rage-note');
			setter[prefix + 'description-show'] = 1;
			break;
		case 'unchainedrage':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-rage-unchained');
			setter[prefix + 'bufftype'] = 'class';
			setter[prefix + 'tabcat'] = 'class';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'melee';
			setter[prefix + 'b1_bonustype'] = 'untyped';
			setter[prefix + 'b1_macro-text'] = '2 + min(2,(floor(@{level}/11)+floor(@{level}/20)))';
			if (calc === 1) {
				if (level < 11) {
					tempint = 2;
				} else if (level === 20) {
					tempint = 4;
				} else {
					tempint = 3;
				}
			} else {
				tempint = 2;
			}
			setter[prefix + 'b1_val'] = tempint;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg_melee';
			setter[prefix + 'b2_bonustype'] = 'untyped';
			setter[prefix + 'b2_macro-text'] = '2 + min(2,(floor(@{level}/11)+floor(@{level}/20)))';
			setter[prefix + 'b2_val'] = tempint;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'ac';
			setter[prefix + 'b3_bonustype'] = 'untyped';
			setter[prefix + 'b3_macro-text'] = '-2';
			setter[prefix + 'b3_val'] = -2;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b4_bonus'] = 'will';
			setter[prefix + 'b4_bonustype'] = 'untyped';
			setter[prefix + 'b4_macro-text'] = '2 + min(2,(floor(@{level}/11)+floor(@{level}/20)))';
			tempint = tempint;
			setter[prefix + 'b4_val'] = tempint;
			setter[prefix + 'b5-show'] = 1;
			setter[prefix + 'b5_bonus'] = 'hptemp';
			setter[prefix + 'b5_hide'] = 1;
			setter[prefix + 'b5_macro-text'] = '@{level}*(2+(floor(@{level}/11)+floor(@{level}/20)))';
			tempint = tempint * level;
			setter[prefix + 'b5_val'] = tempint;
			setter[prefix + 'add_note_to_roll'] = 'skill';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-rage-note');
			setter[prefix + 'description-show'] = 1;
			break;
		case 'prayer':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-prayer');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'luck';
			setter[prefix + 'b1_macro-text'] = '1';
			setter[prefix + 'b1_val'] = 1;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg';
			setter[prefix + 'b2_bonustype'] = 'luck';
			setter[prefix + 'b2_macro-text'] = '1';
			setter[prefix + 'b2_val'] = 1;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'saves';
			setter[prefix + 'b3_bonustype'] = 'luck';
			setter[prefix + 'b3_macro-text'] = '1';
			setter[prefix + 'b3_val'] = 1;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b4_bonus'] = 'check_skills';
			setter[prefix + 'b4_bonustype'] = 'luck';
			setter[prefix + 'b4_macro-text'] = '1';
			setter[prefix + 'b4_val'] = 1;
			break;
		case 'prayerdebuff':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-prayer-debuff');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'luck';
			setter[prefix + 'b1_macro-text'] = '-1';
			setter[prefix + 'b1_val'] = -1;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg';
			setter[prefix + 'b2_bonustype'] = 'luck';
			setter[prefix + 'b2_macro-text'] = '-1';
			setter[prefix + 'b2_val'] = -1;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'saves';
			setter[prefix + 'b3_bonustype'] = 'luck';
			setter[prefix + 'b3_macro-text'] = '-1';
			setter[prefix + 'b3_val'] = -1;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b4_bonus'] = 'check_skills';
			setter[prefix + 'b4_bonustype'] = 'luck';
			setter[prefix + 'b4_macro-text'] = '-1';
			setter[prefix + 'b4_val'] = -1;
			break;
		case 'bless':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-bless');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'morale';
			setter[prefix + 'b1_macro-text'] = '1';
			setter[prefix + 'b1_val'] = 1;
			setter[prefix + 'b2-show'] = 0;
			setter[prefix + 'b2_bonus'] = 'will';
			setter[prefix + 'b2_bonustype'] = 'morale';
			setter[prefix + 'b2_macro-text'] = '1';
			setter[prefix + 'b2_val'] = 1;
			setter[prefix + 'add_note_to_roll'] = 'save';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-bless-note');
			setter[prefix + 'description-show'] = 1;
			break;
		case 'aid':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-aid');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'morale';
			setter[prefix + 'b1_macro-text'] = '1';
			setter[prefix + 'b2-show'] = 0;
			setter[prefix + 'b2_bonus'] = 'will';
			setter[prefix + 'b2_bonustype'] = 'morale';
			setter[prefix + 'b2_macro-text'] = '2';
			setter[prefix + 'b2_val'] = 2;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'hptemp';
			setter[prefix + 'b3_hide'] = 1;
			setter[prefix + 'b3_val_error'] = 1;
			setter[prefix + 'b3_macro-text'] = '1d8 + @{level}';
			if (calc) {
				tempint = 4 + level;
			} else {
				tempint = 4;
			}
			setter[prefix + 'b3_val'] = tempint;
			setter[prefix + 'add_note_to_roll'] = 'save';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-aid-note');
			setter[prefix + 'description-show'] = 1;
			break;
		case 'haste':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-haste');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'untyped';
			setter[prefix + 'b1_macro-text'] = '1';
			setter[prefix + 'b1_val'] = 1;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'ac';
			setter[prefix + 'b2_bonustype'] = 'dodge';
			setter[prefix + 'b2_macro-text'] = '1';
			setter[prefix + 'b2_val'] = 1;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'ref';
			setter[prefix + 'b3_bonustype'] = 'dodge';
			setter[prefix + 'b3_macro-text'] = '1';
			setter[prefix + 'b3_val'] = 1;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b4_bonus'] = 'speed';
			setter[prefix + 'b4_bonustype'] = 'enhancement';
			setter[prefix + 'b4_macro-text'] = 'min(@{speed-base},30)';
			tempint = 30;
			if (calc) {
				if (speed < 30) {
					tempint = speed;
				}
			}
			setter[prefix + 'b4_val'] = tempint;
			setter[prefix + 'add_note_to_roll'] = 'attack';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-haste-note');
			setter[prefix + 'description-show'] = 1;
			break;
		case 'enlargeperson':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-enlarge-person');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'size';
			setter[prefix + 'b1_hide'] = 1;
			setter[prefix + 'b1_macro-text'] = '1';
			setter[prefix + 'b1_val'] = 1;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'str';
			setter[prefix + 'b2_bonustype'] = 'size';
			setter[prefix + 'b2_macro-text'] = '2';
			setter[prefix + 'b2_val'] = 2;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'dex';
			setter[prefix + 'b3_bonustype'] = 'size';
			setter[prefix + 'b3_macro-text'] = '-2';
			setter[prefix + 'b3_val'] = -2;
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-enlarge-person-note');
			break;
		case 'divinefavor':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-divine-favor');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'luck';
			setter[prefix + 'b1_macro-text'] = 'min(3, max(1, floor(@{level}/3)))';
			tempint = 1;
			if (calc) {
				if (level <= 5) {
					tempint = 1;
				} else if (level <= 8) {
					tempint = 2;
				} else {
					tempint = 3;
				}
			}
			setter[prefix + 'b1_val'] = tempint;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg';
			setter[prefix + 'b2_bonustype'] = 'luck';
			setter[prefix + 'b2_macro-text'] = 'min(3, max(1, floor(@{level}/3)))';
			setter[prefix + 'b2_val'] = tempint;
			break;
		case 'shieldoffaith':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-shield-of-faith');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'ac';
			setter[prefix + 'b1_bonustype'] = 'deflection';
			setter[prefix + 'b1_macro-text'] = '2+floor((@{level})/6)';
			tempint = 2;
			if (calc) {
				if (level < 6) {
					tempint = 2;
				} else if (level < 12) {
					tempint = 3;
				} else if (level < 18) {
					tempint = 4;
				} else {
					tempint = 5;
				}
			}
			setter[prefix + 'b1_val'] = tempint;
			break;
		case 'shield':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-shield');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'shield';
			setter[prefix + 'b1_bonustype'] = 'shield';
			setter[prefix + 'b1_macro-text'] = '4';
			setter[prefix + 'b1_val'] = 4;
			setter[prefix + 'add_note_to_roll'] = 'defense';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-shield-note');
			setter[prefix + 'description-show'] = 1;
			break;
		case 'magearmor':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-mage-armor');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'armor';
			setter[prefix + 'b1_bonustype'] = 'armor';
			setter[prefix + 'b1_macro-text'] = '4';
			setter[prefix + 'b1_val'] = 4;
			setter[prefix + 'add_note_to_roll'] = 'defense';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-magearmor-note');
			setter[prefix + 'description-show'] = 1;
			break;
		case 'inspirecourage':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-inspire-courage');
			setter[prefix + 'bufftype'] = 'song';
			setter[prefix + 'tabcat'] = 'song';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'competence';
			setter[prefix + 'b1_macro-text'] = '1+floor((@{level}+1)/6)';
			tempint = 1;
			if (calc) {
				if (level < 5) {
					tempint = 1;
				} else if (level < 11) {
					tempint = 2;
				} else if (level < 16) {
					tempint = 3;
				} else {
					tempint = 4;
				}
			}
			setter[prefix + 'b1_val'] = tempint;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'dmg';
			setter[prefix + 'b3_bonustype'] = 'competence';
			setter[prefix + 'b3_macro-text'] = '1+floor((@{level}+1)/6)';
			setter[prefix + 'b3_val'] = tempint;
			setter[prefix + 'b2-show'] = 0;
			setter[prefix + 'b2_bonus'] = 'will';
			setter[prefix + 'b2_bonustype'] = 'morale';
			setter[prefix + 'b2_macro-text'] = '1+floor((@{level}+1)/6)';
			setter[prefix + 'b2_val'] = tempint;
			setter[prefix + 'add_note_to_roll'] = 'save';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-inspire-courage-note');
			setter[prefix + 'description-show'] = 1;
			break;
		case 'inspiregreatness':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-inspire-greatness');
			setter[prefix + 'bufftype'] = 'song';
			setter[prefix + 'tabcat'] = 'song';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'competence';
			setter[prefix + 'b1_macro-text'] = '2';
			setter[prefix + 'b1_val'] = 2;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'fort';
			setter[prefix + 'b2_bonustype'] = 'competence';
			setter[prefix + 'b2_macro-text'] = '2';
			setter[prefix + 'b2_val'] = 2;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'hptemp';
			setter[prefix + 'b3_hide'] = 1;
			setter[prefix + 'b3_macro-text'] = '2d10+(2*@{CON-mod})';
			tempint = 10;
			if (calc) {
				tempint = 10 + (2 * conmod);
			}
			setter[prefix + 'b3_val'] = tempint;
			setter[prefix + 'b3_val_error'] = 1;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b4_bonus'] = 'casterlevel';
			setter[prefix + 'b4_bonustype'] = 'untyped';
			setter[prefix + 'b4_macro-text'] = '2';
			setter[prefix + 'b4_val'] = 2;
			break;
		case 'inspireheroics':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-inspire-heroics');
			setter[prefix + 'bufftype'] = 'song';
			setter[prefix + 'tabcat'] = 'song';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'saves';
			setter[prefix + 'b1_bonustype'] = 'morale';
			setter[prefix + 'b1_macro-text'] = '4';
			setter[prefix + 'b1_val'] = 4;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'ac';
			setter[prefix + 'b2_bonustype'] = 'dodge';
			setter[prefix + 'b2_macro-text'] = '4';
			setter[prefix + 'b2_val'] = 4;
			break;
		case 'inspiredrage':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-inspired-rage');
			setter[prefix + 'bufftype'] = 'song';
			setter[prefix + 'tabcat'] = 'song';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'str';
			setter[prefix + 'b1_bonustype'] = 'morale';
			setter[prefix + 'b1_macro-text'] = '2+(2*floor(@{level}/8))';
			tempint = 2;
			if (calc) {
				if (level < 8) {
					tempint = 2;
				} else if (level < 16) {
					tempint = 4;
				} else {
					tempint = 6;
				}
			}
			setter[prefix + 'b1_val'] = tempint;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'con';
			setter[prefix + 'b2_bonustype'] = 'morale';
			setter[prefix + 'b2_macro-text'] = '2+(2*floor(@{level}/8))';
			setter[prefix + 'b2_val'] = tempint;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'ac';
			setter[prefix + 'b3_bonustype'] = 'untyped';
			setter[prefix + 'b3_macro-text'] = '-1';
			setter[prefix + 'b3_val'] = -1;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b4_bonus'] = 'will';
			setter[prefix + 'b4_bonustype'] = 'morale';
			setter[prefix + 'b4_macro-text'] = '1+floor(@{level}/4)';
			tempint = 1;
			if (calc) {
				tempint = 1 + Math.floor(level / 4);
			}
			setter[prefix + 'b4_val'] = tempint;
			setter[prefix + 'add_note_to_roll'] = 'skill';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-inspired-rage-note');
			setter[prefix + 'description-show'] = 1;
			break;
		case 'heroism':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-heroism');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'morale';
			setter[prefix + 'b1_macro-text'] = '2';
			setter[prefix + 'b1_val'] = 2;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'saves';
			setter[prefix + 'b2_bonustype'] = 'morale';
			setter[prefix + 'b2_macro-text'] = '2';
			setter[prefix + 'b2_val'] = 2;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'check_skills';
			setter[prefix + 'b3_bonustype'] = 'morale';
			setter[prefix + 'b3_macro-text'] = '2';
			setter[prefix + 'b3_val'] = 2;
			break;
		case 'blessingoffervor':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-blessing-of-fervor');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'untyped';
			setter[prefix + 'b1_macro-text'] = '2';
			setter[prefix + 'b1_val'] = 2;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'ac';
			setter[prefix + 'b2_bonustype'] = 'dodge';
			setter[prefix + 'b2_macro-text'] = '2';
			setter[prefix + 'b2_val'] = 2;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'ref';
			setter[prefix + 'b3_bonustype'] = 'dodge';
			setter[prefix + 'b3_macro-text'] = '2';
			setter[prefix + 'b3_val'] = 2;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b4_bonus'] = 'speed';
			setter[prefix + 'b4_bonustype'] = 'enhancement';
			setter[prefix + 'b4_macro-text'] = '30';
			setter[prefix + 'b4_val'] = 30;
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-blessing-of-fervor-note');
			setter[prefix + 'description-show'] = 1;
			break;
		case 'goodhope':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-good-hope');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'morale';
			setter[prefix + 'b1_macro-text'] = '2';
			setter[prefix + 'b1_val'] = 2;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg';
			setter[prefix + 'b2_bonustype'] = 'morale';
			setter[prefix + 'b2_macro-text'] = '2';
			setter[prefix + 'b2_val'] = 2;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'saves';
			setter[prefix + 'b3_bonustype'] = 'morale';
			setter[prefix + 'b3_macro-text'] = '2';
			setter[prefix + 'b3_val'] = 2;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b4_bonus'] = 'check';
			setter[prefix + 'b4_bonustype'] = 'morale';
			setter[prefix + 'b4_macro-text'] = '2';
			setter[prefix + 'b4_val'] = 2;
			break;
		case 'crushingdespair':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-crushing-despair');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_macro-text'] = '-2';
			setter[prefix + 'b1_val'] = -2;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg';
			setter[prefix + 'b2_macro-text'] = '-2';
			setter[prefix + 'b2_val'] = -2;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'saves';
			setter[prefix + 'b3_macro-text'] = '-2';
			setter[prefix + 'b3_val'] = -2;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b4_bonus'] = 'check';
			setter[prefix + 'b4_macro-text'] = '-2';
			setter[prefix + 'b4_val'] = -2;
			break;
		case 'archonsaura':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-archons-aura');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_macro-text'] = '-2';
			setter[prefix + 'b1_val'] = -2;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'saves';
			setter[prefix + 'b2_macro-text'] = '-2';
			setter[prefix + 'b2_val'] = -2;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'ac';
			setter[prefix + 'b3_macro-text'] = '-2';
			setter[prefix + 'b3_val'] = -2;
			setter[prefix + 'add_note_to_roll'] = 'defense';
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-archons-aura-note');
			break;
		case 'curse':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-curse');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'str';
			setter[prefix + 'b1_macro-text'] = '-6';
			setter[prefix + 'b1_val'] = -6;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'attack';
			setter[prefix + 'b2_macro-text'] = '-4';
			setter[prefix + 'b2_val'] = -4;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'saves';
			setter[prefix + 'b2_macro-text'] = '-4';
			setter[prefix + 'b2_val'] = -4;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'check';
			setter[prefix + 'b2_macro-text'] = '-4';
			setter[prefix + 'b2_val'] = -4;
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-curse-note');
			break;
		case 'desecrate':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-desecrate');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'profane';
			setter[prefix + 'b1_macro-text'] = '1';
			setter[prefix + 'b1_val'] = 1;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg';
			setter[prefix + 'b2_bonustype'] = 'profane';
			setter[prefix + 'b2_macro-text'] = '1';
			setter[prefix + 'b2_val'] = 1;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'saves';
			setter[prefix + 'b3_bonustype'] = 'profane';
			setter[prefix + 'b3_macro-text'] = '1';
			setter[prefix + 'b3_val'] = 1;
			setter[prefix + 'add_note_to_roll'] = 'save'
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-desecrate-note');
			break;
		case 'consecrate':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-consecrate');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_macro-text'] = '-1';
			setter[prefix + 'b1_val'] = -1;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg';
			setter[prefix + 'b2_macro-text'] = '-1';
			setter[prefix + 'b2_val'] = -1;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'saves';
			setter[prefix + 'b3_macro-text'] = '-1';
			setter[prefix + 'b3_val'] = -1;
			setter[prefix + 'add_note_to_roll'] = 'save'
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-consecrate-note');
			break;
		case 'slow':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-slow');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_macro-text'] = '-1';
			setter[prefix + 'b1_val'] = -1;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'ac';
			setter[prefix + 'b2_macro-text'] = '-1';
			setter[prefix + 'b2_val'] = -1;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'ref';
			setter[prefix + 'b3_macro-text'] = '-1';
			setter[prefix + 'b3_val'] = -1;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'speed';
			setter[prefix + 'b3_macro-text'] = '-ceil(ceil(@{speed-base}/2)/5)*5';
			setter[prefix + 'b3_val'] = -15;
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-slow-note');
			break;
		case 'reduceperson':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-reduce-person');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'size';
			setter[prefix + 'b1_hide'] = 1;
			setter[prefix + 'b1_macro-text'] = '-1';
			setter[prefix + 'b1_val'] = -1;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'str';
			setter[prefix + 'b2_bonustype'] = 'size';
			setter[prefix + 'b2_macro-text'] = '-2';
			setter[prefix + 'b2_val'] = -2;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'dex';
			setter[prefix + 'b3_bonustype'] = 'size';
			setter[prefix + 'b3_macro-text'] = '+2';
			setter[prefix + 'b3_val'] = +2;
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-reduce-person-note');
			break;
		case 'bane':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-bane');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_macro-text'] = '-1';
			setter[prefix + 'b1_val'] = -1;
			setter[prefix + 'b2-show'] = 0;
			setter[prefix + 'b2_bonus'] = 'will';
			setter[prefix + 'b2_macro-text'] = '-1';
			setter[prefix + 'b2_val'] = -1;
			setter[prefix + 'add_note_to_roll'] = 'save';
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-bane-note');
			break;
		case 'deathknell':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-death-knell');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'str';
			setter[prefix + 'b1_bonustype'] = 'enhancement';
			setter[prefix + 'b1_macro-text'] = '2';
			setter[prefix + 'b1_val'] = 2;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'casterlevel';
			setter[prefix + 'b2_bonustype'] = 'untyped';
			setter[prefix + 'b2_macro-text'] = '1';
			setter[prefix + 'b2_val'] = 1;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'hptemp';
			setter[prefix + 'b3_hide'] = 1;
			setter[prefix + 'b3_macro-text'] = '1d8';
			setter[prefix + 'b3_val'] = 4;
			setter[prefix + 'b3_val_error'] = 1;
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = 'roll 1d8 and place in temp hp macro textbox';
			break;
		case 'magicvestment':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-magic-vestment');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'armor';
			setter[prefix + 'b1_bonustype'] = 'enhancement';
			setter[prefix + 'b1_macro-text'] = 'min(5,floor(@{level}/4))';
			tempint = 1;
			if (calc) {
				tempint = 1 + Math.floor(level / 8);
			}
			setter[prefix + 'b1_val'] = tempint;
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = 'Can change bonus to shield';
			break;
		case 'ward':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-ward');
			setter[prefix + 'bufftype'] = 'hex';
			setter[prefix + 'tabcat'] = 'hex';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'ac';
			setter[prefix + 'b1_bonustype'] = 'deflection';
			setter[prefix + 'b1_macro-text'] = '2 + (floor(@{level}/8))';
			tempint = 2;
			if (calc) {
				tempint = 2 + Math.floor(level / 8);
			}
			setter[prefix + 'b1_val'] = tempint;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'saves';
			setter[prefix + 'b2_bonustype'] = 'resistance';
			setter[prefix + 'b2_macro-text'] = '2 + (floor(@{level}/8))';
			setter[prefix + 'b2_val'] = tempint;
			setter[prefix + 'add_note_to_roll'] = 'save';
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-ward-note');
			break;
		case 'battlespirit':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-battle-spirit');
			setter[prefix + 'bufftype'] = 'aura';
			setter[prefix + 'tabcat'] = 'aura';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_bonustype'] = 'morale';
			setter[prefix + 'b1_macro-text'] = '1 + (floor(@{level}/8))';
			tempint = 1;
			if (calc) {
				tempint = 1 + Math.floor(level / 8);
			}
			setter[prefix + 'b1_val'] = tempint;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg';
			setter[prefix + 'b2_bonustype'] = 'morale';
			setter[prefix + 'b2_macro-text'] = '1 + (floor(@{level}/8))';
			setter[prefix + 'b2_val'] = tempint;
			break;
		case 'battleward':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-battle-ward');
			setter[prefix + 'bufftype'] = 'hex';
			setter[prefix + 'tabcat'] = 'hex';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'ac';
			setter[prefix + 'b1_bonustype'] = 'deflection';
			setter[prefix + 'b1_macro-text'] = '3 + (floor(@{level}/8))';
			tempint = 3;
			if (calc) {
				tempint = 3 + Math.floor(level / 8);
			}
			setter[prefix + 'b1_val'] = tempint;
			setter[prefix + 'add_note_to_roll'] = 'defense';
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-battle-ward-note');
			break;
		case 'hamperinghex':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-hampering-hex');
			setter[prefix + 'bufftype'] = 'hex';
			setter[prefix + 'tabcat'] = 'hex';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'ac';
			setter[prefix + 'b1_macro-text'] = '-2';
			setter[prefix + 'b1_val'] = -2;
			setter[prefix + 'notes'] = 'At 8th level the penalty becomes -4';
			break;
		case 'boneward':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-bone-ward');
			setter[prefix + 'bufftype'] = 'hex';
			setter[prefix + 'tabcat'] = 'hex';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'ac';
			setter[prefix + 'b1_bonustype'] = 'deflection';
			setter[prefix + 'b1_macro-text'] = '2 + (floor(@{level}/8))';
			tempint = 2;
			if (calc) {
				tempint = 2 + Math.floor(level / 8);
			}
			setter[prefix + 'b1_val'] = tempint;
			break;
		case 'stardust':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-stardust');
			setter[prefix + 'bufftype'] = 'spell';
			setter[prefix + 'tabcat'] = 'spell';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'attack';
			setter[prefix + 'b1_macro-text'] = '-1 - (floor(@{level}/4))';
			tempint = -1;
			if (calc) {
				tempint = -1 * (1 + Math.floor(level / 4));
			}
			setter[prefix + 'b1_val'] = tempint;
			setter[prefix + 'add_note_to_roll'] = 'skill';
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-stardust-note');
			break;
		case 'airbarrier':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-air-barrier');
			setter[prefix + 'bufftype'] = 'hex';
			setter[prefix + 'tabcat'] = 'hex';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'armor';
			setter[prefix + 'b1_bonustype'] = 'armor';
			setter[prefix + 'b1_macro-text'] = '4 + (2*(floor (max((@{level}-3),0) /4)))';
			tempint = 4;
			if (calc) {
				if (level < 7) {
					tempint = 4;
				} else if (tempint < 11) {
					tempint = 6;
				} else if (tempint < 15) {
					tempint = 8;
				} else if (tempint < 19) {
					tempint = 10;
				}
			}
			setter[prefix + 'b1_val'] = tempint;
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-air-barrier-note');
			break;
		case 'elementaloverflow':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-elemental-overflow');
			setter[prefix + 'bufftype'] = 'class';
			setter[prefix + 'tabcat'] = 'class';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'kineticblast';
			setter[prefix + 'b1_bonustype'] = 'untyped';
			setter[prefix + 'b1_macro-text'] = 'min(@{kineticistburn},max(0,floor(@{kineticist_level-mod}/3)))';
			setter[prefix + 'b1_val'] = 0;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg_kineticblast';
			setter[prefix + 'b2_bonustype'] = 'untyped';
			setter[prefix + 'b2_macro-text'] = '2*min(@{kineticistburn},max(0,floor(@{kineticist_level-mod}/3)))';
			setter[prefix + 'b2_val'] = 0;
			setter[prefix + 'b3-show'] = 1;
			setter[prefix + 'b3_bonus'] = 'dex';
			setter[prefix + 'b3_bonustype'] = 'size';
			setter[prefix + 'b3_macro-text'] = 'min(3,max(0,floor((@{kineticistburn}-1)/2)),floor((@{kineticist_level-mod}-1)/5))*2';
			setter[prefix + 'b3_val'] = 0;
			setter[prefix + 'b4-show'] = 1;
			setter[prefix + 'b4_bonus'] = 'con';
			setter[prefix + 'b4_bonustype'] = 'size';
			setter[prefix + 'b4_macro-text'] = 'min(2,max(0,floor((@{kineticistburn}+1)/4)),floor((@{kineticist_level-mod}+4)/10))*2';
			setter[prefix + 'b4_val'] = 0;
			setter[prefix + 'b5-show'] = 1;
			setter[prefix + 'b5_bonus'] = 'str';
			setter[prefix + 'b5_bonustype'] = 'size';
			setter[prefix + 'b5_macro-text'] = 'min(1,max(0,floor(@{kineticistburn}/5)),floor(@{kineticist_level-mod}/11))*2';
			setter[prefix + 'b5_val'] = 0;
			setter[prefix + 'description-show'] = '1';
			setter[prefix + 'add_note_to_roll'] = 'defense';
			setter[prefix + 'notes'] = "**:" + SWUtils.getTranslated('buff-elemental-overflow') + "** [[({1d1,{1d0,(@{kineticist_level-mod}-2)d1}kh1}kl1)*5*@{kineticistburn}]]**%** " + SWUtils.getTranslated('buff-elemental-overflow-note');
			break;
		case 'powerattack':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-power-attack');
			setter[prefix + 'bufftype'] = 'other';
			setter[prefix + 'tabcat'] = 'other';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'melee';
			setter[prefix + 'b1_bonustype'] = 'untyped';
			setter[prefix + 'b1_macro-text'] = '-1-floor(@{bab}/4)';
			tempint = 1;
			if (calc) {
				tempint = 1 + Math.floor(bab / 4);
			}
			setter[prefix + 'b1_val'] = -tempint;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg_power_attack';
			setter[prefix + 'b2_bonustype'] = 'untyped';
			setter[prefix + 'b2_macro-text'] = '2+2*floor(@{bab}/4)';
			setter[prefix + 'b2_val'] = 2 * tempint;
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-power-attack-note');
			break;
		case 'deadlyaim':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-deadly-aim');
			setter[prefix + 'bufftype'] = 'other';
			setter[prefix + 'tabcat'] = 'other';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'ranged';
			setter[prefix + 'b1_bonustype'] = 'untyped';
			setter[prefix + 'b1_macro-text'] = '-1-floor(@{bab}/4)';
			tempint = 1;
			if (calc) {
				tempint = 1 + Math.floor(bab / 4);
			}
			setter[prefix + 'b1_val'] = -tempint;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'dmg_ranged';
			setter[prefix + 'b2_bonustype'] = 'untyped';
			setter[prefix + 'b2_macro-text'] = '2+2*floor(@{bab}/4)';
			setter[prefix + 'b2_val'] = 2 * tempint;
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-deadly-aim-note');
			break;
		case 'combatexpertise':
			setter[prefix + 'name'] = SWUtils.getTranslated('buff-combat-expertise');
			setter[prefix + 'bufftype'] = 'other';
			setter[prefix + 'tabcat'] = 'other';
			setter[prefix + 'b1-show'] = 1;
			setter[prefix + 'b1_bonus'] = 'melee';
			setter[prefix + 'b1_bonustype'] = 'untyped';
			setter[prefix + 'b1_macro-text'] = '-1-floor(@{bab}/4)';
			tempint = 1;
			if (calc) {
				tempint = 1 + Math.floor(bab / 4);
			}
			setter[prefix + 'b1_val'] = -tempint;
			setter[prefix + 'b2-show'] = 1;
			setter[prefix + 'b2_bonus'] = 'ac';
			setter[prefix + 'b2_bonustype'] = 'dodge';
			setter[prefix + 'b2_macro-text'] = '1+floor(@{bab}/4)';
			setter[prefix + 'b2_val'] = 2 * tempint;
			setter[prefix + 'notes'] = SWUtils.getTranslated('buff-combat-expertise-note');
			break;
	}

	return setter;
}
/** Creates buff entries
 *
 * @param {function} callback
 * @param {Map} eventInfo
 */
export function addCommonBuff (callback, eventInfo) {
	var done = function () {
		if (typeof callback === "function") {
			callback();
		}
	}, setter = {}, fields;
	fields = ['add_common_buff', 'common_buff_toadd', 'CON-mod', 'level', 'speed-base'];
	getAttrs(fields, function (v) {
		var onByDefault = 0;
		TAS.debug("adding common buff:", v);
		if (parseInt(v.add_common_buff, 10)) {
			if (v['common_buff_toadd']) {
				if (eventInfo && eventInfo.sourceType === 'player') {
					onByDefault = 1;
				}
				setter = getCommonBuffEntries(v['common_buff_toadd'], v, onByDefault);
				setter.common_buff_toadd = '';
				if (v['common_buff_toadd'] === 'slow') {
					setter['condition-Staggered'] = 1;
				}
			}
			setter.add_common_buff = 0;
			//TAS.debug("common buff setting: ",setter);
			SWUtils.setWrapper(setter, PFConst.silentParams, updateAllBuffTotalsAsync);
		}
	});
}

export function migrate (callback) {
	PFBuffsOld.migrate(callback);
}

export var recalculate = TAS.callback(function recalculateBuffs (callback, silently, oldversion) {
	var done = _.once(function () {
		if (typeof callback === "function") {
			callback();
		}
	});
	migrate(function () {
		getAttrs(['is_newsheet', 'use_buff_bonuses'], function (v) {
			//new sheets have nothing
			if (parseInt(v.is_newsheet, 10)) {
				done();
				return;
			}
			if (parseInt(v.use_buff_bonuses, 10)) {
				reEvaluateCustomMacros(function () {
					updateAllBuffTotalsAsync(function () {
						resetStatuspanel();//no need to wait
						done();
					}, silently);
				}, silently);
			} else {
				PFBuffsOld.recalculate(done, silently);
			}
		});
	});
});
function registerEventHandlers () {
	var custombuffs = ['customa1', 'customa2', 'customa3', 'customa4', 'customa5', 'customa6', 'customa7', 'customa8', 'customa9',
		'customa10', 'customa11', 'customa12'];

	on("change:add_common_buff", TAS.callback(function eventAddCommonBuff (eventInfo) {
		if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
			TAS.debug("caught " + eventInfo.sourceAttribute + ", event: " + eventInfo.sourceType);
			addCommonBuff(null, eventInfo);
		}
	}));

	_.each(otherCharBonuses, function (charFieldMap, buff) {
		_.each(charFieldMap, function (field, bonustype) {
			on("change:" + field, TAS.callback(function eventCharFieldUpdatesBuff (eventInfo) {
				if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
					TAS.debug("caught " + eventInfo.sourceAttribute + ", event: " + eventInfo.sourceType);
					updateBuffTotalAsync(buff);
				}
			}));
		});
	});

	_.each(charHelperFields, function (charFieldArray, buff) {
		_.each(charFieldArray, function (field) {
			on("change:" + field, TAS.callback(function eventCharBuffHelperField (eventInfo) {
				if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
					TAS.debug("caught " + eventInfo.sourceAttribute + ", event: " + eventInfo.sourceType);
					updateBuffTotalAsync(buff);
				}
			}));
		});
	});

	buffsPerRow.forEach(function (b) {
		var prefix = "change:repeating_buff2:" + b;
		on(prefix + "_macro-text", TAS.callback(function eventBuffMacroText (eventInfo) {
			TAS.debug("caught " + eventInfo.sourceAttribute + " for column " + b + ", event: " + eventInfo.sourceType);
			SWUtils.evaluateAndSetNumber('repeating_buff2_' + b + '_macro-text', 'repeating_buff2_' + b + '_val', 0, null, false);
		}));
		on(prefix + "_bonustype", TAS.callback(function PFBuffs_updateBuffbonustype (eventInfo) {
			if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
				getAttrs(['repeating_buff2_' + b + '_val', 'repeating_buff2_' + b + '-show', 'repeating_buff2_' + b + '_bonus', 'repeating_buff2_enable_toggle'], function (v) {
					TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType, v);
					if (parseInt(v['repeating_buff2_' + b + '-show'], 10) && parseInt(v['repeating_buff2_enable_toggle'], 10) &&
						parseInt(v['repeating_buff2_' + b + '_val'], 10) && v['repeating_buff2_' + b + '_bonus']) {
						updateBuffTotalAsync(v['repeating_buff2_' + b + '_bonus']);
					}
				});
			}
		}));
		on(prefix + "-show ", TAS.callback(function PFBuffs_updateBuffRowShowBuff (eventInfo) {
			TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
			if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
				getAttrs(['repeating_buff2_' + b + '_val', 'repeating_buff2_' + b + '_bonus', 'repeating_buff2_enable_toggle'], function (v) {
					TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType, v);
					if (parseInt(v['repeating_buff2_enable_toggle'], 10) && parseInt(v['repeating_buff2_' + b + '_val'], 10) &&
						v['repeating_buff2_' + b + '_bonus']) {
						updateBuffTotalAsync(v['repeating_buff2_' + b + '_bonus']);
					}
				});
			}
		}));
		on(prefix + "_val", TAS.callback(function updateBuffValue (eventInfo) {
			TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
			if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api") {
				getAttrs(['repeating_buff2_' + b + '-show', 'repeating_buff2_' + b + '_bonus', 'repeating_buff2_enable_toggle'], function (v) {
					TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType, v);
					if (parseInt(v['repeating_buff2_enable_toggle'], 10) && parseInt(v['repeating_buff2_' + b + '-show'], 10) &&
						v['repeating_buff2_' + b + '_bonus']) {
						updateBuffTotalAsync(v['repeating_buff2_' + b + '_bonus']);
					}
				});
			}
		}));
		on(prefix + "_bonus", TAS.callback(function PFBuffs_updateBuffbonus (eventInfo) {
			if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
				getAttrs(['repeating_buff2_' + b + '_val', 'repeating_buff2_' + b + '_bonus', 'repeating_buff2_' + b + '_hide', 'repeating_buff2_enable_toggle'], function (v) {
					TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType, v);
					var setter = {};
					if (bonusesWithNoTypes.indexOf(v['repeating_buff2_' + b + '_bonus']) >= 0) {
						setter['repeating_buff2_' + b + '_hide'] = 1;
						SWUtils.setWrapper(setter, PFConst.silentParams);
					} else if (parseInt(v['repeating_buff2_' + b + '_hide'], 10) === 1) {
						setter['repeating_buff2_' + b + '_hide'] = 0;
						SWUtils.setWrapper(setter, PFConst.silentParams);
					}
					if (parseInt(v['repeating_buff2_enable_toggle'], 10) && parseInt(v['repeating_buff2_' + b + '_val'], 10)) {
						updateAllBuffTotalsAsync(null, null, eventInfo);
					}
				});
			}
		}));
	});
	on('change:repeating_buff2:add_note_to_roll', TAS.callback(function PFBuffs_addnote (eventInfo) {
		if (eventInfo.sourceType === "player") {
			TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
			addNoteAsync(null, eventInfo);
		}
	}));
	on('change:repeating_buff2:enable_toggle', TAS.callback(function PFBuffs_enabletoggle (eventInfo) {
		if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
			getAttrs(['repeating_buff2_b1_bonus', 'repeating_buff2_b2_bonus', 'repeating_buff2_b3_bonus',
				'repeating_buff2_b4_bonus', 'repeating_buff2_b5_bonus', 'repeating_buff2_b6_bonus',
				'repeating_buff2_b1-show', 'repeating_buff2_b2-show', 'repeating_buff2_b3-show',
				'repeating_buff2_b4-show', 'repeating_buff2_b5-show', 'repeating_buff2_b6-show',
				'repeating_buff2_enable_toggle', 'repeating_buff2_tabcat2'], function (v) {
					var setter = {};
					TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType, v);
					buffsPerRow.forEach(function (b) {
						if (v['repeating_buff2_' + b + '_bonus'] && parseInt(v['repeating_buff2_' + b + '-show'], 10)) {
							updateBuffTotalAsync(v['repeating_buff2_' + b + '_bonus']);
						}
					});
					addNoteAsync(null, eventInfo);
					setter['repeating_buff2_tabcat2'] = v.repeating_buff2_enable_toggle || '0';
					SWUtils.setWrapper(setter, PFConst.silentParams);
				});
		}
	}));
	on("change:repeating_buff2:bufftype", TAS.callback(function eventBuff2Type (eventInfo) {
		var setter = {};
		if (eventInfo.sourceType === "player") {
			TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
			getAttrs(['buffs_tab', 'repeating_buff2_bufftype', 'repeating_buff2_tabcat'], function (v) {
				setter['buffs_tab'] = v.repeating_buff2_bufftype || '99';
				setter['repeating_buff2_tabcat'] = v.repeating_buff2_bufftype || '-1';
				SWUtils.setWrapper(setter, PFConst.silentParams);
			});
		}
	}));
	on("remove:repeating_buff2", TAS.callback(function PFBuffs_removeBuffRow (eventInfo) {
		TAS.debug("caught remove " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
			updateAllBuffTotalsAsync(null, null, eventInfo);
		}
	}));

	//generic easy buff total updates
	_.each(events.buffTotalNonAbilityEvents, function (functions, col) {
		var eventToWatch = "change:buff_" + col + "-total";
		_.each(functions, function (methodToCall) {
			on(eventToWatch, TAS.callback(function event_updateBuffNonAbilityEvents (eventInfo) {
				TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
				if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api") {
					methodToCall(col, eventInfo);
				}
			}));
		});
	});
	_.each(events.buffTotalAbilityEvents, function (functions, col) {
		var eventToWatch = "change:buff_" + col + "-total change:buff_" + col + "-total_penalty";
		_.each(functions, function (methodToCall) {
			on(eventToWatch, TAS.callback(function event_updateBuffAbilityEvents (eventInfo) {
				TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
				if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api") {
					methodToCall(col, eventInfo);
				}
			}));
		});
	});
	_.each(events.buffTotalEventsNoParam, function (functions, col) {
		var eventToWatch = "change:buff_" + col + "-total";
		_.each(functions, function (methodToCall) {
			on(eventToWatch, TAS.callback(function eventBuffTotalNoParam (eventInfo) {
				TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
				if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api") {
					methodToCall(null, false, null, eventInfo);
				}
			}));
		});
	});
	on('change:merge_buffs_now', TAS.callback(function eventMergeBuffs (eventInfo) {
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		if (eventInfo.sourceType === "player") {
			getAttrs(['merge_buffs_now'], function (v) {
				if (parseInt(v.merge_buffs_now), 10) {
					mergeOldIntoNewBuffs(updateAllBuffTotalsAsync);
				}
			});
		}
	}));

	custombuffs.forEach(function (buff) {
		on('change:buff_' + buff + '-total', TAS.callback(function customBuffTotal (eventInfo) {
			if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api") {
				TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
				SWUtils.evaluateAndAddAsync(null, null, buff, PFConst.customEquationMacros[buff], 'buff_' + buff + '-total');
			}
		}));
	});

}
registerEventHandlers();
//PFConsole.log('   PFBuffs module loaded          ');
//PFLog.modulecount++;
