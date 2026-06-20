'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';



/* **************PSIONIC************** */
function updatePsionicBonusPower (callback, silently) {
	var done = _.once(function () {
		if (typeof callback === "function") {
			callback();
		}
	});
	SWUtils.getDropdownValue("selected-ability-psionic-power",null,function(value){
		getAttrs(["psionic-level-total", "ability-psionic-power"], function (v) {
			var ability = 0,
			currentTotal = 0,
			newTotal = 0,
			params={};
			try {
				ability = parseInt(value, 10) || 0;
				currentTotal = parseInt(v["ability-psionic-power"], 10) || 0;
				newTotal = Math.floor(ability * (parseInt(v["psionic-level-total"], 10) || 0) * 0.5);
				TAS.debug("PFSIONIC ability=" + ability, "newTotal=" + newTotal, "currentTotal=" + currentTotal);
				if (currentTotal !== newTotal) {
					if (silently) {
						params = PFConst.silentParams;
					}
					SWUtils.setWrapper({
						"ability-psionic-power": newTotal
					}, params, done);
				}
			} catch (err) {
				TAS.error("PFPsionic.updatePsionicBonusPower", err);
			} finally {
				done();
			}
		});
	});
}
export function migrate (callback){
	if (typeof callback === "function"){
		callback();
	}
}
export var recalculate = TAS.callback(function PFPsionicRecalculate(callback, silently, oldversion) {
	var done = _.once(function () {
		TAS.info("Leaving PFPsionic.recalculate");
		if (typeof callback === "function") {
			callback();
		}
	});
	getAttrs(["psionics-show"], function (v) {
		try {
			if (parseInt(v["psionics-show"],10) === 1) {
				updatePsionicBonusPower(done, silently);
			} else {
				done();
			}
		} catch (err2) {
			TAS.error("PFPsionic.recalculate", err2);
			done();
		}
	});
});
function registerEventHandlers () {
	on("change:psionic-level change:psionic-level-misc", TAS.callback(function eventUpdatePsionicLevel(eventInfo) {
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
			SWUtils.updateRowTotal(["psionic-level-total", "psionic-level", "psionic-level-misc"]);
		}
	}));
	on("change:class-psionic-power change:ability-psionic-power change:misc-psionic-power", TAS.callback(function eventUpdatePsionicPower(eventInfo) {
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api" || (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api" && eventInfo.sourceAttribute==='ability-psionic-power')) {
			SWUtils.updateRowTotal(["psionic-power_max", "class-psionic-power", "ability-psionic-power", "misc-psionic-power"]);
		}
	}));
	on("change:selected-ability-psionic-power change:psionic-level-total", TAS.callback(function eventUpdatePsionicBonusPower(eventInfo) {
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		updatePsionicBonusPower();
	}));
}
registerEventHandlers();
//PFConsole.log('   PFPsionic module loaded        ');
//PFLog.modulecount++;
