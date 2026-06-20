'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils  from './PFUtils';


export var saveTypes = ["Fort", "Ref", "Will"];
var events = {
	saveEventsAuto: "change:saves-cond change:total-REPLACE change:REPLACE-ability-mod change:REPLACE-misc-mod",
	saveEventsPlayer: "change:REPLACE-trait change:REPLACE-resist"
};

export function applyConditions (callback, silently) {
	var done = _.once(function () {
		if (typeof callback === "function") {
			callback();
		}
	});
	getAttrs(["condition-Fear", "condition-Sickened", "condition-Drained", "condition-Wounds", "saves-cond", "has_endurance_feat", "wounds_gritty_mode", "wound_threshold-show"], function (v) {
		var fear = 0,
		sickened = 0,
		drained = 0,
		wounds = 0,
		currCond = 0,
		newCond = 0,
		params = {},
		setter = {};
		try {
			fear = parseInt(v["condition-Fear"], 10) || 0;
			sickened = parseInt(v["condition-Sickened"], 10) || 0;
			drained = parseInt(v["condition-Drained"], 10) || 0;
			wounds = (parseInt(v["wound_threshold-show"], 10) || 0) * PFUtils.getWoundPenalty((parseInt(v["condition-Wounds"], 10) || 0), (parseInt(v.has_endurance_feat, 10) || 0), (parseInt(v.wounds_gritty_mode, 10) || 0));
			currCond = parseInt(v["saves-cond"], 10) || 0;
			newCond = drained - fear - sickened + wounds;
			if (currCond !== newCond) {
				setter["saves-cond"] = newCond;
			}
		} catch (err) {
			TAS.error("PFSaves.applyConditions", err);
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
/* updateSave - updates the saves for a character
 * @save = type of save: Fort, Ref, Will  (first character capitalized)
 */
export function updateSave (save, callback, silently) {
	var fields = [save, "total-" + save, save + "-ability-mod", save + "-trait", save + "-resist", save + "-misc-mod", "saves-cond", "buff_" + save + "-total", "buff_saves-total"];
	SWUtils.updateRowTotal(fields, 0, [], false, callback, silently);
}
export function updateSaves (callback, silently) {
	var done = _.once(function () {
		if (typeof callback === "function") {
			callback();
		}
	}),
	saved = _.after(3, function () {
		done();
	});
	updateSave("Fort", saved, silently);
	updateSave("Ref", saved, silently);
	updateSave("Will", saved, silently);
}
export var recalculate = TAS.callback(function PFSavesRecalculate(callback, silently, oldversion) {
	var done = _.once(function () {
		TAS.info("leaving PFSaves.recalculate");
		if (typeof callback === "function") {
			callback();
		}
	});
	//TAS.debug("at PFSaves.recalculate");
	try {
		applyConditions(function () {
			updateSaves(done,silently);
		}, silently);
	} catch (err) {
		TAS.error("PFSaves.recalculate OUTER", err);
		done();
	}
});
function registerEventHandlers () {
	_.each(saveTypes, function (save) {
		var eventToWatch = events.saveEventsAuto.replace(/REPLACE/g, save);
		on(eventToWatch, TAS.callback(function eventUpdateSaveAuto(eventInfo) {
			if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api") {
				TAS.debug("caught " + eventInfo.sourceAttribute + " event for " + save + ": " + eventInfo.sourceType);
				updateSave(save, eventInfo);
			}
		}));
	});
	_.each(saveTypes, function (save) {
		var eventToWatch = events.saveEventsPlayer.replace(/REPLACE/g, save);
		on(eventToWatch, TAS.callback(function eventUpdateSavePlayer(eventInfo) {
			if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
				TAS.debug("caught " + eventInfo.sourceAttribute + " event for " + save + ": " + eventInfo.sourceType);
				updateSave(save, eventInfo);
			}
		}));
	});
}
registerEventHandlers();
//PFConsole.log('   PFSaves module loaded          ');
//PFLog.modulecount++;
