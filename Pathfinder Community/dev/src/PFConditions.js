'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import PFConst from './PFConst';
import * as SWUtils from './SWUtils';
import * as PFInitiative from './PFInitiative';
import * as PFSpellCasterClasses from './PFSpellCasterClasses';
import * as PFSkills from './PFSkills';
import * as PFAbilityScores from './PFAbilityScores';
import * as PFSaves from './PFSaves';
import * as PFAttackGrid from './PFAttackGrid';
import * as PFDefense from './PFDefense';
import * as PFHealth from  './PFHealth';
import * as PFChecks from './PFChecks';
import * as PFAttacks from './PFAttacks';
import * as PFEncumbrance from './PFEncumbrance';

export function setParalyzed(dummy,dummy2,eventInfo){
	PFAbilityScores.updateAbilityScore('DEX');
	PFAbilityScores.updateAbilityScore('STR');
	PFDefense.applyConditions(null,null,eventInfo);
}

export function setHelpless(dummy,dummy2,eventInfo){
    PFAbilityScores.updateAbilityScore('DEX');
	PFDefense.applyConditions(null,null,eventInfo);
}

function setPinnedGrappled(dummy,dummy2,eventInfo){
	//TAS.info("AT pfconditions setPinnedGrappled",eventInfo);
	PFAbilityScores.applyConditions(function(){
		PFAttackGrid.applyConditions();
		PFDefense.applyConditions();
	},null,eventInfo);
	PFSpellCasterClasses.applyConditions();
}

/* updateGrapple Ensures Grapple and Pin are mutually exclusive */
function toggleGrappleState (dummy,dummy2,eventInfo) {
	//TAS.debug("at toggle grapple state");
	getAttrs(["condition-Pinned", "condition-Grappled"], function (values) {
		if (parseInt(values["condition-Pinned"],10) && parseInt(values["condition-Grappled"],10)) {
			SWUtils.setWrapper({
				"condition-Pinned": "0"
			},PFConst.silentParams,function(){setPinnedGrappled(eventInfo);});
		} else {
			setPinnedGrappled(eventInfo);
		}
	});
}
/* updatePin Ensures Grapple and Pin are mutually exclusive */
function togglePinnedState (dummy,dummy2,eventInfo) {
	//TAS.debug("at toggle pinned state");
	getAttrs(["condition-Pinned", "condition-Grappled"], function (values) {
		if (parseInt(values["condition-Pinned"],10) && parseInt(values["condition-Grappled"],10)) {
			SWUtils.setWrapper({
				"condition-Grappled": "0"
			},PFConst.silentParams,function(){setPinnedGrappled(eventInfo);});
		} else {
			setPinnedGrappled(eventInfo);
		}
	});
}

function setFatiguedExhausted(eventInfo){
	//TAS.debug("PFConditions setFatiguedExhausted",v);
	PFAbilityScores.applyConditions(null,null,eventInfo);
	PFAttackGrid.applyConditions(null,null,eventInfo);
	PFEncumbrance.updateModifiedSpeed();
}

function toggleFatiguedState (dummy,dummy2,eventInfo) {
	getAttrs(["condition-Fatigued", "condition-Exhausted"], function (v) {
		v = _.mapObject(v,function(val,key){
			return parseInt(val,10)||0;
		});
		if (v['condition-Fatigued'] && v['condition-Exhausted']) {
			SWUtils.setWrapper({
				"condition-Exhausted": "0"
			},PFConst.silentParams,function(){setFatiguedExhausted(eventInfo);});
		} else {
			setFatiguedExhausted(eventInfo);
		}
	});
}

function toggleExhaustedState (dummy,dummy2,eventInfo) {
	getAttrs(["condition-Fatigued", "condition-Exhausted"], function (v) {
		v = _.mapObject(v,function(val,key){
			return parseInt(val,10)||0;
		});
		if (v['condition-Fatigued'] && v['condition-Exhausted']) {
			SWUtils.setWrapper({
				"condition-Fatigued": "0"
			},PFConst.silentParams,function(){setFatiguedExhausted(eventInfo);});
		} else {
			setFatiguedExhausted(eventInfo);
		}
	});
}
/* updates drain for condition status panel */
function updateDrainCheckbox (callback,silently,eventInfo) {
	var done = _.once(function () {
		//TAS.debug("leaving PFConditions.updateDrainCheckbox");
		if (typeof callback === "function") {
			callback();
		}
	});
	getAttrs(["condition-Drained", "condition_is_drained"], function (v) {
		var levels = parseInt(v["condition-Drained"], 10) || 0,
		drained = parseInt(v["condition_is_drained"], 10) || 0;
		if (levels !== 0 && drained === 0) {
			SWUtils.setWrapper({
				"condition_is_drained": 1,
				"condition-Drained-toggle": 1
			}, PFConst.silentParams, done);
		} else if (levels === 0 && drained !== 0) {
			SWUtils.setWrapper({
				"condition_is_drained": 0,
				"condition-Drained-toggle": 0
			}, PFConst.silentParams,done);
		} else {
			done();
		}
	});
}
export function migrate (callback, oldversion){
	getAttrs(['migrated_fatigue_conditions','condition-Fatigued'],function(v){
		var setter={};
		if(!parseInt(v.migrate_fatigued_conditions,10)){
			if(parseInt(v['condition-Fatigued'],10)===3){
				setter['condition-Fatigued']=0;
				setter['condition-Exhausted']=3;
			}
			setter.migrate_fatigued_conditions=1;
			SWUtils.setWrapper(setter,PFConst.silentParams,callback);
		} else if (typeof callback === "function"){
			callback();
		}
	});
}

export var recalculate = TAS.callback(function PFConditionsRecalculate(callback, silently, oldversion) {
	migrate(function(){
		updateDrainCheckbox(callback);
	});
});

var events = {
	conditionEventsEither: {
		"change:condition-wounds change:has_endurance_feat change:wounds_gritty_mode": [PFChecks.applyConditions, PFSaves.applyConditions, PFAttackGrid.applyConditions, PFDefense.applyConditions]
	},
	conditionEventsPlayer: {
		"change:condition-grappled": [toggleGrappleState],
		"change:condition-pinned": [togglePinnedState],
		"change:condition-Fatigued": [toggleFatiguedState],
		"change:condition-Exhausted": [toggleExhaustedState],
		"change:condition-sickened": [PFAttacks.updateRepeatingWeaponDamages, PFChecks.applyConditions, PFSaves.applyConditions, PFAttackGrid.applyConditions],
		"change:condition-stunned": [PFDefense.updateDefenses, PFDefense.applyConditions],
		"change:condition-flat-footed": [PFDefense.updateDefenses],
		"change:condition-deafened": [PFInitiative.updateInitiative, PFSpellCasterClasses.applyConditions, PFChecks.applyConditions],
		"change:condition-fascinated": [PFChecks.applyConditions],
		"change:condition-entangled": [PFAbilityScores.applyConditions, PFAttackGrid.applyConditions, PFEncumbrance.updateModifiedSpeed],
		"change:condition-drained": [updateDrainCheckbox, PFHealth.updateMaxHPLookup, PFChecks.applyConditions, PFSaves.applyConditions, PFAttackGrid.applyConditions, PFDefense.applyConditions],
		"change:condition-fear": [PFChecks.applyConditions, PFSaves.applyConditions, PFAttackGrid.applyConditions],
		"change:condition-blinded": [PFChecks.applyConditions, PFDefense.applyConditions],
		"change:condition-cowering": [PFDefense.applyConditions],
		"change:condition-invisible": [PFDefense.updateDefenses, PFAttackGrid.applyConditions,PFChecks.applyConditions,PFDefense.applyConditions],
		"change:condition-dazzled": [PFAttackGrid.applyConditions, PFChecks.applyConditions],
		"change:condition-prone": [ PFDefense.applyConditions, PFAttackGrid.recalculateMelee],
		"change:condition-paralyzed": [setParalyzed],
		"change:condition-helpless": [setHelpless]
	}
};

function registerEventHandlers () {
	_.each(events.conditionEventsPlayer, function (functions, eventToWatch) {
		_.each(functions, function (methodToCall) {
			on(eventToWatch, TAS.callback(function eventConditionEventsPlayer(eventInfo) {
				if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
					TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
					methodToCall(null,null,eventInfo);
				}
			}));
		});
	});
	_.each(events.conditionEventsEither, function (functions, eventToWatch) {
		_.each(functions, function (methodToCall) {
			on(eventToWatch, TAS.callback(function eventConditionEventsEither(eventInfo) {
				TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
				methodToCall(null,null,eventInfo);
			}));
		});
	});
	on("change:Perception-cond", TAS.callback(function eventUpdateSkillPerceptionCond(eventInfo) {
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		PFSkills.verifyHasSkill("Perception",function(hasSkill){
			if (hasSkill){
				PFSkills.updateSkillAsync("Perception", eventInfo);
			} else {
				PFSkills.updateSkillAsync("CS-Perception", eventInfo);
			}
		});
	}));
}
registerEventHandlers();
//PFConsole.log('   PFConditions module loaded     ');
//PFLog.modulecount++;
