'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import PFConst from './PFConst';
import * as SWUtils from './SWUtils';


function setSanityThreshold (callback){
    var done=function(){
        if (typeof callback === "function"){
            callback();
        }
    }
    getAttrs(['use_horror_adventures','sanity_threshold','sanity-ability-mod','sanity_threshold_misc-mod'],function(v){
        var currThreshold=0,newThreshold=0,setter={};
        try {
            if (parseInt(v.use_horror_adventures,10)){
                currThreshold=parseInt(v.sanity_threshold,10)||0;
                newThreshold=(parseInt(v['sanity-ability-mod'],10)||0)+(parseInt(v['sanity_threshold_misc-mod'],10)||0);
                newThreshold = Math.max(1,newThreshold);
                if (currThreshold!==newThreshold){
                    setter.sanity_threshold=newThreshold;
                }
            }
        } catch (err){
            TAS.error("PFHorror.setSanityThreshold error",err);
        } finally {
            if (_.size(setter)){
                SWUtils.setWrapper(setter,PFConst.silentParams,done);
            } else {
                done();
            }
        }
    });
}


function setSanityScore (callback){
    var done=function(){
        if (typeof callback === "function"){
            callback();
        }
    }
    getAttrs(['use_horror_adventures','sanity_score_max','sanity_edge','sanity_score_misc-mod',
    'WIS','INT','CHA','WIS-damage','INT-damage','CHA-damage','WIS-penalty','INT-penalty','CHA-penalty',
    'buff_WIS-total_penalty','buff_INT-total_penalty','buff_CHA-total_penalty'],function(v){
        var currSanity=0,newSanity=0,newEdge=0,setter={};
        try {
            if (parseInt(v.use_horror_adventures,10)){
                currSanity = parseInt(v.sanity_score_max,10)||0;
                newSanity = (parseInt(v['sanity_score_misc-mod'],10)||0) +
                    (parseInt(v['WIS'],10)||0)+(parseInt(v['INT'],10)||0)+(parseInt(v['CHA'],10)||0)+
                    (parseInt(v['WIS-damage'],10)||0)+(parseInt(v['INT-damage'],10)||0)+(parseInt(v['CHA-damage'],10)||0)+
                    (parseInt(v['WIS-penalty'],10)||0)+(parseInt(v['INT-penalty'],10)||0)+(parseInt(v['CHA-penalty'],10)||0)+
                    (parseInt(v['buff_WIS-total_penalty'],10)||0)+(parseInt(v['buff_INT-total_penalty'],10)||0)+(parseInt(v['buff_CHA-total_penalty'],10)||0);
                if (currSanity!==newSanity){
                    newEdge = Math.floor(newSanity/2);
                    setter.sanity_score_max = newSanity;
                    setter.sanity_edge = newEdge;
                }
            }
        } catch (err){
            TAS.error("PFHorror.setSanityScore error",err);
        } finally {
            if (_.size(setter)){
                SWUtils.setWrapper(setter,PFConst.silentParams,done);
            } else {
                done();
            }
        }
    });
}

export var recalculate = TAS.callback(function PFHorrorRecalculate(callback){
    setSanityScore();
    setSanityThreshold();
    if (typeof callback === "function"){
        TAS.info("Leaving PFHorror.recalculate");
        callback();
    }
});

function registerEventHandlers () {
 	on("change:sanity_score_misc-mod change:WIS change:INT change:CHA change:buff_WIS-total_penalty change:buff_INT-total_penalty change:buff_CHA-total_penalty",
        TAS.callback(function eventAllMentalStatsAutoUpdate(eventInfo){
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		if(eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api" ) {
            setSanityScore();
		}
	}));
 	on("change:WIS-damage change:INT-damage change:CHA-damage change:WIS-penalty change:INT-penalty change:CHA-penalty",
        TAS.callback(function eventAllMentalStatsPlayerUpdate(eventInfo){
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		if(eventInfo.sourceType === "player" || eventInfo.sourceType === "api" ) {
            setSanityScore();
		}
	}));
 	on("change:sanity-ability-mod change:sanity_threshold_misc-mod",TAS.callback(function eventThresholdUpdate(eventInfo){
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		if(eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api" ) {
            setSanityThreshold();
		}
    }));
    on("change:use_horror_adventures",TAS.callback(function eventUseBurn(eventInfo){
    getAttrs(['use_horror_adventures'],function(v){
        if(parseInt(v.use_horror_adventures,10)){
            setSanityScore();
            setSanityThreshold();
        }
    });
}));


}
registerEventHandlers();
//PFConsole.log('   PFHorror module loaded         ');
//PFLog.modulecount++;

