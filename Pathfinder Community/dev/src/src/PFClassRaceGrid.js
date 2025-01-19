'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils  from './PFUtils';
import * as PFSpells from './PFSpells';
import * as PFSpellCasterClasses from './PFSpellCasterClasses';

export var classColumns = ["skill", "fcskill", "fcalt", "bab", "Fort", "Ref", "Will", "level"],
raceColumns = ['skill', 'bab', 'Fort', 'Ref', 'Will', 'hd-num'],
classRows = ["0", "1", "2", "3", "4", "5"];
var events = {
    basehp: "change:auto_calc_hp change:autohp_percent change:maxhp_lvl1",
    racialhp: "change:npc-hd-num change:npc-hd change:npc-hp",
    perClassRowhp: "change:class-REPLACE-level change:class-REPLACE-hd change:class-REPLACE-hp change:class-REPLACE-fchp"
};

export function setMulticlassed (){
    var fields =['multiclassed','class-0-level','class-1-level','class-2-level','class-3-level','class-4-level','class-5-level','npc-hd-num'];
    //TAS.debug("at PFClassRaceGrid.setMulticlassed");
    getAttrs(fields,function(v){
        var isMulti=parseInt(v.multiclassed,10)||0,totalWLevels;
        totalWLevels=Math.min(1,parseInt(v['class-0-level'],10)||0) + Math.min(1,parseInt(v['class-1-level'],10)||0) +
            Math.min(1,parseInt(v['class-2-level'],10)||0) + Math.min(1,parseInt(v['class-3-level'],10)||0) +
            Math.min(1,parseInt(v['class-4-level'],10)||0) + Math.min(1,parseInt(v['class-5-level'],10)||0) +
            Math.min(1,parseInt(v['npc-hd-num'],10)||0);
        //TAS.debug("PFClassRaceGrid.setMulticlassed, "+ totalWLevels +" rows have levels");
        if (totalWLevels > 1){
            if (!isMulti){
                SWUtils.setWrapper({multiclassed:1});
            }
        } else if (isMulti){
            SWUtils.setWrapper({multiclassed:0});
        }
    });
}
/** PFClassRaceGrid.updateClassInformation Updates totals at bottom of Class Information grid
 *@param {string} col end of name of attribute that references column, must be in classColumns or raceColumns
 *@param {function} callback optional call when finished updating
 *@param {bool} silently if true then call SWUtils.setWrapper with PFConst.silentParams
 */
function updateClassInformation  (col, callback, silently, eventInfo) {
    var done = function () {
        if (typeof callback === "function") {
            callback();
        }
    },
    updateClassInformationInner = function (col, callback, silently) {
        var getFields = [],
        totalColName, col0Name, col1Name, col2Name, col3Name, col4Name, col5Name,
        col0NameTwo,
        col1NameTwo,
        col2NameTwo,
        col3NameTwo,
        col4NameTwo,
        col5NameTwo;

        if (col === "fchp") {
            col = "hp";
        } else if (col === "hd-num") {
            col = "level";
        }

        col0Name = "class-0-" + col;
        col1Name = "class-1-" + col;
        col2Name = "class-2-" + col;
        col3Name = "class-3-" + col;
        col4Name = "class-4-" + col;
        col5Name = "class-5-" + col;

        totalColName = (col === "bab" || col === "level") ? col : "total-" + col;
        getFields = [totalColName, col0Name, col1Name, col2Name, col3Name, col4Name, col5Name];
        if (col !== "skill") {
            //add npc values
            switch (col) {
                case 'bab':
                case 'Fort':
                case 'Will':
                case 'Ref':
                    getFields = getFields.concat(["npc-" + col]);
                    break;
                case 'level':
                    getFields = getFields.concat(["npc-hd-num"]);
                    break;
            }
            //TAS.debug(getFields);
            SWUtils.updateRowTotal(getFields, 0, [], 0, done, silently);
        } else {
            col0NameTwo = "class-0-level";
            col1NameTwo = "class-1-level";
            col2NameTwo = "class-2-level";
            col3NameTwo = "class-3-level";
            col4NameTwo = "class-4-level";
            col5NameTwo = "class-5-level";

            getFields = getFields.concat([col0NameTwo, col1NameTwo, col2NameTwo, col3NameTwo, col4NameTwo, col5NameTwo,"npc-skill",'npc-hd-num']);
            //TAS.debug(getFields);
            getAttrs(getFields, function (v) {
                var setter = {},
                currTot=0,
                params = {},
                tot=0;
                tot = Math.floor((parseFloat(v[col0Name], 10) || 0) * (parseInt(v[col0NameTwo], 10) || 0) +
                    (parseFloat(v[col1Name], 10) || 0) * (parseInt(v[col1NameTwo], 10) || 0) +
                    (parseFloat(v[col2Name], 10) || 0) * (parseInt(v[col2NameTwo], 10) || 0) +
                    (parseFloat(v[col3Name], 10) || 0) * (parseInt(v[col3NameTwo], 10) || 0) +
                    (parseFloat(v[col4Name], 10) || 0) * (parseInt(v[col4NameTwo], 10) || 0) +
                    (parseFloat(v[col5Name], 10) || 0) * (parseInt(v[col5NameTwo], 10) || 0) +
                    (parseFloat(v["npc-skill"], 10) || 0) * (parseInt(v['npc-hd-num'], 10) || 0)
                    );
                currTot = parseInt(v[totalColName], 10);
                if (isNaN(currTot) || tot !== currTot) {
                    setter[totalColName] = tot;
                    if (silently) {
                        params = PFConst.silentParams;
                    }
                    SWUtils.setWrapper(setter, params, done);
                } else {
                    done();
                }
            });
        }
    };
    //TAS.debug("at PFClassRaceGrid.updateClassInformation: " + col);
    //no sum for hd
    if (!col || col === "hd" || col==="hp") {
        TAS.warn("at updateClassInformation called with bad column:"+col);
        done();
        return;
    }
    if ((/^npc/i).test(col)) {
        col = col.slice(4);
    }
    updateClassInformationInner(col,done,silently);
}

export function setHitPoints (callback,silently,eventInfo){
    var done = _.once(function(){ if (typeof callback === "function") {
        //TAS.debug("leaving updateClassHpGrid");
        callback();}
    }),
    fields=["auto_calc_hp", "autohp_percent","maxhp_lvl1","is_npc","set_pfs",
        "total-hp", "NPC-HP", "npc-hd-num","npc-hd",
        "class-0-hp","class-0-level","class-0-hd","class-0-fchp",
        "class-1-hp","class-1-level","class-1-hd","class-1-fchp",
        "class-2-hp","class-2-level","class-2-hd","class-2-fchp",
        "class-3-hp","class-3-level","class-3-hd","class-3-fchp",
        "class-4-hp","class-4-level","class-4-hd","class-4-fchp",
        "class-5-hp","class-5-level","class-5-hd","class-5-fchp"
        ];
    getAttrs(fields,function(v){
        var auto=0,maxFirst =0, mult=1, isPFS=0, setter={}, isNPC=0, loudSetter={}, currrowhp=0, rowhp=0, level=0, hd=0, totalhp=0, rowUpdated = -1, matches;
        try {
            //TAS.debug("at autocalc hp",v);
            auto =parseInt(v.auto_calc_hp,10)||0;
            if (eventInfo && eventInfo.sourceAttribute){
                matches = eventInfo.sourceAttribute.match(/(\d)/);
                if (matches && matches[1]) {
                    rowUpdated = parseInt(matches[1],10)||0;
                } else if ((/NPC/i).test(eventInfo.sourceAttribute)){
                    rowUpdated = 6;
                }
            }
            if(auto){
                isPFS = parseInt(v.set_pfs,10)||0;
                isNPC = parseInt(v.is_npc,10)||0;
                mult= PFUtils.getAutoHPPercentMultiplier(v.autohp_percent);
                maxFirst=parseInt(v.maxhp_lvl1,10)||0;
                if (maxFirst) {
                    if (rowUpdated===6){
                        rowUpdated=-1;
                    }
                }
            }
            //TAS.debug("at autocalc hp, rowupdated is:" + rowUpdated);
            level = parseInt(v['npc-hd-num'],10)||0;
            hd = parseInt(v['npc-hd'],10);
            currrowhp = parseInt(v['NPC-HP'],10)||0;
            if (isNaN(hd)|| !auto){
                totalhp += currrowhp;
            } else if (level > 0 && hd > 0 ) {
                if ( rowUpdated===6 || rowUpdated===-1){
                    //first do NPC.
                    rowhp = PFUtils.getAvgHP(level,hd,mult,maxFirst,false); //monster type hd uses regular rules even for PFS animal companions
                    totalhp += rowhp;
                    //TAS.debug("adding: "+rowhp);
                    if (rowhp !== currrowhp){
                        setter['NPC-HP']=rowhp;
                    }
                } else {
                    totalhp += currrowhp;
                }
                if (maxFirst){ maxFirst = 0;}
                //TAS.debug("adding "+currrowhp);
            } else if (hd===0){
                if (currrowhp !==0){
                    setter['NPC-HP']=0;
                }
            }

            _.each(classRows,function(rowindex){
                var fchp=0,
                row=parseInt(rowindex,10);
                rowhp=0;
                level = parseInt(v["class-"+rowindex+"-level"],10)||0;
                hd = parseInt(v["class-"+rowindex+"-hd"],10);
                currrowhp = parseInt(v["class-"+rowindex+"-hp"],10)||0;
                fchp =  parseInt(v["class-"+rowindex+"-fchp"],10)||0;
                if (isNaN(hd)||!auto){
                    totalhp += currrowhp + fchp;
                } else if(level > 0 && hd > 0){
                    if (rowUpdated===-1 || rowUpdated===row){
                        rowhp = PFUtils.getAvgHP(level,hd,mult,maxFirst,isPFS) ;
                        totalhp += rowhp + fchp;
                        if (rowhp !== currrowhp){
                            setter["class-"+rowindex+"-hp"]=rowhp;
                        }
                    } else {
                        totalhp += currrowhp + fchp;
                    }
                    if (maxFirst){ maxFirst = 0;}
                } else if (hd===0 ){
                    if (currrowhp !==0){
                        setter["class-"+rowindex+"-hp"]=0;
                    }
                }
            });
            if (totalhp !== parseInt(v['total-hp'],10)){
                loudSetter["total-hp"]= totalhp;
            }
        } catch (err){
            TAS.error("PFClassRaceGrid.setHitPoints",err);
        } finally {
            if (_.size(loudSetter)>0){
                SWUtils.setWrapper(loudSetter);
            }
            if (_.size(setter)>0){
                SWUtils.setWrapper(setter,PFConst.silentParams,done);
            } else {
                done();
            }
        }
    });
}
export function migrate (callback,oldversion){
    if (typeof callback === "function"){
        callback();
    }
}
export var recalculate = TAS.callback(function PFClassRaceGridRecalculate(callback, silently, oldversion) {
    var done = _.once(function () {
        TAS.info("leaving PFClassRaceGrid.recalculate");
        if (typeof callback === "function") {
            callback();
        }
    }),
    numcols = classColumns.length,
    columnDone = _.after(numcols, function(){
        setHitPoints(done,silently);
    });
    _.each(classColumns, function (col) {
        updateClassInformation(col, columnDone, silently);
    });
    setMulticlassed();
});
function registerEventHandlers  () {
    var tempString="";
    _.each(classColumns, function (col) {
        var eventsToWatch = _.map(classRows, function (row) {
            return "change:class-" + row + "-" + col;
        }).join(" ");
        on(eventsToWatch, TAS.callback(function eventTotalClassInformation(eventInfo) {
            TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
            if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api" ) {
                updateClassInformation(col, null, null, eventInfo);
            }
        }));
        if (col === "level") {
            on(eventsToWatch, TAS.callback(function eventTotalClassInformationLevel(eventInfo) {
                TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
                if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
                    updateClassInformation("skill", null, null, eventInfo);
                    setMulticlassed();
                }
            }));
        }
    });
    _.each(raceColumns, function (col) {
        on("change:npc-" + col, TAS.callback(function eventUpdateRacialRow(eventInfo) {
            TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
            if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api" || (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api" && eventInfo.sourceAttribute.slice(-2)==='hp')) {
                if (col === 'hd-num') {
                    updateClassInformation('level', null, null, eventInfo);
                    updateClassInformation("skill", null, null, eventInfo);
                    setMulticlassed();
                } else {
                    updateClassInformation(col, null, null, eventInfo);
                }
            }
        }));
    });
    _.each(classRows,function(row){
        tempString = events.perClassRowhp.replace(/REPLACE/g,row);
        on(tempString,TAS.callback(function eventUpdateClassHitPoints(eventInfo){
            TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
            if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
                setHitPoints(null,null,eventInfo);
                //can we move this to spells? or keep here
                //or do we even need to do it, isn't roll20 handling?
                if ( (/level/i).test(eventInfo.sourceAttribute) ) {
                    PFSpellCasterClasses.updateCasterFromClassLevel(parseInt(row, 10), eventInfo);
                }
            }
        }));
    });
    on(events.racialhp,TAS.callback(function eventUpdateRacialHitPoints(eventInfo){
        TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
        if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
            setHitPoints(null,null,eventInfo);
            if (eventInfo.sourceAttribute === "npc-hd-num"){
                PFSpellCasterClasses.updateCasterFromClassLevel(6, eventInfo);
            }
        }
    }));
    on(events.basehp,TAS.callback(function eventHPAutoCalcSwitches(eventInfo){
        TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
        if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
            setHitPoints();
        }
    }));
    on("change:class-0-level change:class-1-level change:class-2-level change:class-3-level change:class-4-level change:class-5-level change:bab change:level",TAS.callback(function eventUpdateLevel(eventInfo){
        if (((eventInfo.sourceAttribute==='level' || eventInfo.sourceAttribute==='bab') && eventInfo.sourceType === "sheetworker") ||
         eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
            TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
            _.each(PFConst.levelPlusBABManualDropdowns,function(attr){
                SWUtils.setDropdownValue(attr,attr+'-mod');
            });
        }
    }));

}
registerEventHandlers();
//PFConsole.log('   PFClassRaceGrid module loaded  ' );
//PFLog.modulecount++;
