'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as PFUtils from './PFUtils';
import * as SWUtils from './SWUtils';
import * as PFSkills from './PFSkills';

/** PFChecks.applyConditions - handles changes to skill and ability checks due to conditions AND buffs.
 * Reads in condition that affect Ability and Skill checks and updates condition fields.
 * checks-cond, Phys-skills-cond, Perception-cond.
 */
export function applyConditions (callback, silently) {
	var done = function () {
		if (typeof callback === "function") {
			callback();
		}
	};
	getAttrs(["condition-Blinded", "condition-Fear", "condition-Drained", "condition-Sickened",
	"condition-Wounds", "has_endurance_feat", "wounds_gritty_mode", "checks-cond", "Phys-skills-cond",
	"wound_threshold-show", "CasterLevel-Penalty", "condition-Dazzled","condition-Deafened","condition-Fascinated",
	"condition_skill_notes","condition_init_notes"	], function (v) {
		//there is no Fascinated, if we add it then:
		//,"condition-Fascinated" -4 to perception
		var setter = {},
		params = {}, drained = 0, fear = 0, sick = 0, woundPenalty = 0, wounds = 0, allSkillsMod = 0, casterlevel = 0, blindedMod = 0, currAllSkills = 0, currPhysSkills = 0, currPerSkills = 0, currCaster = 0,
		skillNote='',initNote='',attackNote='',defenseNote='';
		try {
			drained = parseInt(v["condition-Drained"], 10) || 0;
			fear = -1 * (parseInt(v["condition-Fear"], 10) || 0);
			sick = -1 * (parseInt(v["condition-Sickened"], 10) || 0);
			woundPenalty = PFUtils.getWoundPenalty((parseInt(v["condition-Wounds"], 10) || 0), (parseInt(v.has_endurance_feat, 10) || 0), (parseInt(v.wounds_gritty_mode, 10) || 0));
			wounds = (parseInt(v["wound_threshold-show"], 10) || 0) * woundPenalty;
			allSkillsMod =  drained + fear + sick + wounds;
			casterlevel = drained + wounds;
			blindedMod = -2 * (parseInt(v["condition-Blinded"], 10) || 0);
			currAllSkills = parseInt(v["checks-cond"], 10) || 0;
			currPhysSkills = parseInt(v["Phys-skills-cond"], 10) || 0;

			currCaster = parseInt(v["CasterLevel-Penalty"], 10) || 0;
			if (allSkillsMod !== currAllSkills || isNaN(currAllSkills)) {
				setter["checks-cond"] = allSkillsMod;
			}
			if (blindedMod !== currPhysSkills || isNaN(currPhysSkills)) {
				setter["Phys-skills-cond"] = blindedMod;
			}
			if (casterlevel !== currCaster || isNaN(currCaster)) {
				setter["CasterLevel-Penalty"] = casterlevel;
			}
			if(blindedMod){
				skillNote+= '**'+SWUtils.getTranslated('blinded')+'**: ';
				skillNote+= SWUtils.getTranslated('condition-blinded-note') + '\r\n';
				initNote+= SWUtils.getTranslated('blinded')+': ';
				initNote+= SWUtils.getTranslated('condition-blinded-speed') + '\r\n';
			}
			if(parseInt(v['condition-Dazzled'],10)){
				skillNote+= '**'+SWUtils.getTranslated('dazzled')+'**: ';
				skillNote+=SWUtils.getTranslated('condition-dazzled-note') + '\r\n';
			}
			if(parseInt(v['condition-Deafened'],10)){
				skillNote+= '**'+SWUtils.getTranslated('deafened')+'**: ';
				skillNote+=SWUtils.getTranslated('condition-deafened-note') + '\r\n';
			}
			if(parseInt(v['condition-Fascinated'],10)){
				skillNote+= '**'+SWUtils.getTranslated('fascinated')+'**: ';
				skillNote+=SWUtils.getTranslated('condition-fascinated-title') + '\r\n';
			}
			if(skillNote!==v.condition_skill_notes){
				setter['condition_skill_notes'] = skillNote;
			}
			if(initNote!==v.condition_init_notes){
				setter['condition_init_notes'] = initNote;
			}
		} catch (err) {
			TAS.error("PFChecks.applyConditions", err);
		} finally {
			if (_.size(setter) > 0) {
				SWUtils.setWrapper(setter, {}, done);
				if(allSkillsMod !== currAllSkills){
					PFSkills.updateAllSkillsDiff(allSkillsMod,currAllSkills);
				}
			} else {
				done();
			}
		}
	});
}
//PFConsole.log('   PFChecks module loaded         ');
//PFLog.modulecount++;
