'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils  from './PFUtils';
import * as PFMigrate from './PFMigrate';
import * as PFEncumbrance from './PFEncumbrance';
import * as PFAttacks from './PFAttacks';

//these use strings on the left so javascript doesn't confuse the number with array indices
//converts from the attack mod value to easy 0 through 8
export var sizeModToEasySizeMap={
	 '0':4, //medium
	 '1':3, //small
	 '2':2, //tiny
	'-8':8, //colossal
	 '4':1, //diminutive
	'-4':7, //gargantuan
	'-2':6, //huge
	'-1':5, //large
	 '8':0 //fine
},
reverseSizeMap={
	 '0':8, //fine
	 '1':4, //diminutive
	 '2':2, //tiny
	 '3':1, //small
	 '4':0, //medium
	'5':-1, //large
	'6':-2, //huge
	'7':-4, //gargantuan
	'8':-8 //colossal
},
skillSizeMap = {
	'0':0, //medium
	'1':2, //small
	'2':4, //tiny
	'8':8, //diminutive
	'4':6, //fine
	'-8':-8, //colossal
	'-4':-6, //gargantuan
	'-2':-4, //huge
	'-1':-2 //large
},
sizeNameMap = {
	'colossal':-8,
	'gargantuan':-4,
	'huge':-2,
	'large':-1,
	 'medium':0,
	 'small':1,
	 'tiny':2,
	 'diminutive':4,
	 'fine':8
},
reverseSizeNameMap = {
	'0':'medium',
	'1':'small',
	'2':'tiny',
	'-8':'colossal',
	'4':'diminutive',
	'-4':'gargantuan',
	'-2':'huge',
	'-1':'large',
	'8':'fine'
};

/** getSizeFromText - returns size mod based on size display name
 * @param {string} sizeDisplay size in english (medium, large, gargantuan, tiny, etc)
 * @returns {jsobj} map of {"size":size mod for AC,"skillSize": size mod for fly}
 */
export function getSizeFromText (sizeDisplay) {
	var sizeMap = {
		"size": 0,
		"skillSize": 0
	};
	try {
		if (sizeDisplay) {
			sizeDisplay = SWUtils.trimBoth(sizeDisplay);
			sizeDisplay = sizeDisplay.toLowerCase();
			sizeMap.size=sizeNameMap[sizeDisplay];
			sizeMap.skillSize = skillSizeMap[String(sizeMap.size)];
		}
	} catch (err) {
		TAS.error("get size from text:" + sizeDisplay, err);
		sizeMap.size = 0;
		sizeMap.skillSize = 0;
	} finally {
		return sizeMap;
	}
}
/**returns number of levels size went up or down
 * ex: Med to Lg is +1, Med to Sm is -1, Md to Tiny is -2, etc
 * @param {int} currSize new size mod , usually value of @{size}
 * @param {int} defaultSize default size mod, for sheet it is value of @{default_char_size}
 * 		  for weapon it is @{repeating_weapon_$X_default_size}
 * @returns {int} difference in sizes (not difference in size mods)
 */
export function getSizeLevelChange (currSize,defaultSize) {
	var newSize,oldSize,levelChange;
	newSize=sizeModToEasySizeMap[String(currSize)];
	oldSize=sizeModToEasySizeMap[String(defaultSize)];
	levelChange = newSize-oldSize;
	return levelChange;
}
/**updateDamageDice returns new dice for weapon/attack damage change due to size
 *@param {Number} sizediff difference in LEVELS of size (Medium to Large is 1, Medium to Small is -1)
 *@param {Number} defaultSize size modifier, necessary since different rules for small
 *@param {Number} currDice num dice from 1 to n
 *@param {Number} currDie num sides of die : valid only from 1 to 12
 *@returns {jsobj} {dice:n,die:n}
 */
export function updateDamageDice (sizediff,defaultSize,currDice,currDie){
	var diceSizes = { 1:["1d1"], 2:["1d2"], 3:["1d3"],
		4:["1d4"],
		5:["1d6"],
		6:["1d8","2d4"],
		7:["1d10"],
		8:["2d6","3d4","1d12"],
		9:["2d8","4d4"],    10:["3d6","5d4"],    11:["3d8","6d4","2d10"],
		12:["4d6","7d4","2d12"],    13:["4d8","8d4","9d4","5d6","3d10"],
		14:["6d6","5d8","10d4","11d4","9d4","3d12"],
		15:["6d8","7d6","12d4","13d4","4d10"],
		16:["8d6","7d8","14d4","15d4","4d12"],
		17:["8d8","16d4","9d6","10d6","11d6","5d10","17d4","18d4","19d4","5d12"],
		18:["12d6","20d4","9d8","7d10","6d12","21d4","22d4","23d4"],
		19:["12d8","24d4","13d6","14d6","15d6","8d10"],
		20:["16d6","13d8","10d10","8d12"]
	},
	currSize=0,
	dicestring="",
	newDice=0,newDie=0,matches,
	rowdiff=0, currow=0, newrow=0, newrowstring="",
	reversedDiceSizes=_.reduce(diceSizes,function(memo,pairs,idx){
		_.each(pairs,function(pair){ memo[pair]=idx;  });
		return memo;
	  },{});
	try {
		//TAS.debug("PFSize.updateDamageDice defSize:"+defaultSize+", diff:"+sizediff+", dice:"+currDice+"d"+currDie);
		currDice=parseInt(currDice,10);
		currDie=parseInt(currDie,10);
		if(!(isNaN(currDice)||isNaN(currDie))){
			dicestring=currDice+"d"+currDie;
			currSize=sizeModToEasySizeMap[String(defaultSize)];
			//TAS.debug("currSize now : "+currSize);
			if (currDice<=0 || currDie > 12 ) {return null;}
			if (currDie===4 && currDice >24){ currDice=24;}
			else if (currDie===6 && currDice > 16) {currDice=16;}
			else if (currDie===8 && currDice > 13) {currDice=13;}
			else if (currDie===10 && currDice > 10) {currDice=10;}
			else if (currDie===12 && currDice > 8) {currDice=8;}
			currow=parseInt(reversedDiceSizes[dicestring],10)||0;
			if (!currow){return null;}
			while (sizediff !== 0){
				if (sizediff > 0){
					if  ((currDie<=6 && currDice===1)|| currSize <=3) {
						rowdiff=1;
					} else {
						rowdiff=2;
					}
				} else if (sizediff<0) {
					if  ((currDie<=8 && currDice===1)||currSize<=4 ) {
						rowdiff=-1;
					} else {
						rowdiff = -2;
					}
				}
				newrow = currow + rowdiff;
				newrow = Math.min(Math.max(newrow,1),20);
				dicestring = diceSizes[newrow][0];
				//TAS.debug("PFSize "+currDice+"d"+currDie+" is currrow:"+currow+" going from size:"+currSize+" of diff:"+sizediff+", move "+rowdiff+" levels to "+ newrow+" dice is "+dicestring);
				matches=dicestring.match(/(\d+)d(\d+)/);
				currDice=parseInt(matches[1],10);
				currDie=parseInt(matches[2],10);
				currow =newrow;
				if (sizediff >0 ) {
					currSize++;
					sizediff--;
					if (currow>=20){
						TAS.warn("PFSize.updateDamageDice increased off top of grid to row "+currow);
						break;
					}
				} else {
					currSize--;
					sizediff++;
					if (currow<=1) {
						TAS.warn("PFSize.updateDamageDice decreased under bottom of grid to row "+currow);
						break;
					}
				}
				//TAS.debug("updateDamageDice: currow is now"+currow+", diff still:"+sizediff);
			}
		}
	} catch(err){
		TAS.error("updateDamageDice: ",err);
	} finally {
		return {"dice":currDice,"die":currDie};
	}
}
/** sets the size variables based on the string passed in
 *
 * @param {string} str  the name of the size in english
 * @param {Map<string,int>} setter to pass to setAttrs
 */
export function setSizeFromString(str,setter){
	var tempstr='',sizeMap={};
	try {
		sizeMap = getSizeFromText(str);
		if (sizeMap && sizeMap.size !== 0) {
			setter.size = sizeMap.size;
			setter['default_char_size']=sizeMap.size;
			setter.size_skill = sizeMap.skillSize;
			setter["CMD-size"] = (sizeMap.size * -1);
			setter.size_skill_double = (sizeMap.skillSize * 2);
		} else {
			setter['size']=0;
			setter['default_char_size']=0;
			setter.size_skill = 0;
			setter["CMD-size"] = 0;
			setter.size_skill_double =0;
			if (!sizeMap){
				sizeMap = {'size':0,'skillSize':0};
			}
		}
		//tempstr=reverseSizeNameMap[String(sizeMap.size)];
		setter['size_display']=SWUtils.getTranslated(str.toLowerCase());
	} finally {
		return sizeMap
	}
}

function setSizeDisplay (size,v,setter){
	var tempstr='',sizeDisplay='';
	setter=setter||{};
	tempstr=reverseSizeNameMap[String(size)];
	sizeDisplay=SWUtils.getTranslated(tempstr);
	if (sizeDisplay && (sizeDisplay!== v.size_display || !v.size_display)){
		setter.size_display=sizeDisplay;
	}
	return setter;
}

/** Overwrites any current change to size with change to size from buffs
 *
 * @param {*} levelChange
 * @param {*} v
 * @param {*} eventInfo
 * @param {*} setter
 */
export function updateSize (levelChange,v,eventInfo,setter) {
	var size =  0,newSize=0, defaultSize=0,deflevel=0,newlevel=0, skillSize = 0;
	try {
		setter=setter||{};
		defaultSize = parseInt(v.default_char_size,10)||0;
		//if levelchange is 0, then we are resetting it to defaultSize
		newSize=defaultSize;
		if (levelChange!==0 ){
			deflevel = sizeModToEasySizeMap[String(defaultSize)];
			newlevel = deflevel+levelChange;
			newSize = reverseSizeMap[String(newlevel)];
		}

		size = parseInt(v['size'], 10) || 0;
		if (newSize!==size){
			setter['size']=newSize;
			setter["CMD-size"] = (newSize * -1);
			skillSize = skillSizeMap[String(newSize)];
			setter.size_skill = skillSize;
			setter.size_skill_double = (2*skillSize);
		} else {
			//if the same, we may be resetting, so check each one:
			if ((parseInt(v["CMD-size"],10)||0) !== (newSize *-1)){
				setter["CMD-size"] = (newSize * -1);
			}
			skillSize = skillSizeMap[String(newSize)];
			if ((parseInt(v.size_skill,10)||0) !== skillSize){
				setter.size_skill = skillSize;
			}
			if ((parseInt(v.size_skill_double,10)||0) !== (2*skillSize)){
				setter.size_skill_double = (2*skillSize);
			}
		}
		setSizeDisplay(newSize,v,setter);
	} catch (err) {
		TAS.error("PFSize.updateSize", err);
	} finally {
		TAS.debug("PFSize.updateSize returning with  ",setter);
		return setter;
	}
}
/**
 *
 * @param {function(Number)} callback  call with the value of the change in sizes so if 0 we know there was no change
 * @param {*} silently
 * @param {*} eventInfo
 */
function updateSizeAsync (callback, silently,eventInfo) {
	var done = function (change) {
		if (typeof callback === "function") {
			callback(change);
		}
	};
	getAttrs(["size", "size_skill","size_skill_double", "default_char_size", "CMD-size", "buff_size-total","size_display"], function (v) {
		var params = {},
		setter = {},
		levelChange=0,currSize=0,defSize=0,ddLevelChange=0,forceResize=0;
		try {
			//if updating buff just overwrite the size dropdown
			if (eventInfo &&  eventInfo.sourceAttribute==='buff_size-total'){
				levelChange=parseInt(v['buff_size-total'],10)||0;
				updateSize(levelChange,v,eventInfo,setter);
			} else if (!eventInfo || eventInfo.sourceAttribute==='size'){
				//user must remove the buff if they want to use the dropdown
				levelChange=parseInt(v['buff_size-total'],10)||0;
				if (levelChange===0){
					currSize=parseInt(v.size,10)||0;
					defSize=parseInt(v.default_char_size,10)||0;
					levelChange=getSizeLevelChange(currSize,defSize);
					if (levelChange===0 ){
						if (eventInfo){
							if ((parseInt(eventInfo.previousValue,10)||0) !== (parseInt(eventInfo.newValue,10)||0)){
								forceResize=(parseInt(eventInfo.newValue,10)||0) - (parseInt(eventInfo.previousValue,10)||0);
							}
						}
					}
				}
				updateSize(levelChange,v,eventInfo,setter);
			} else if (eventInfo.sourceAttribute==='default_char_size'){
				//just pass the new level diff to callback
				currSize=parseInt(v.size,10)||0;
				defSize=parseInt(v.default_char_size,10)||0;
				levelChange=getSizeLevelChange(currSize,defSize);
			} else {
				TAS.warn("Called updateSizeAsync with unexpected event:",eventInfo);
			}

		} catch (err) {
			TAS.error("PFSize.updateSizeAsync", err);
		} finally {
			if (_.size(setter) > 0) {
				//TAS.debug("PFSize.updateSizeAsync, setting:",setter);
				if (silently) {
					params = PFConst.silentParams;
				}
				SWUtils.setWrapper(setter, params, function(){done(levelChange);});
			} else if (levelChange!==0 || forceResize !== 0){
				done(1);
			} else {
				done(0);
			}
		}
	});
}
function setNewSize(eventInfo){
	updateSizeAsync(function(changed){
		if (changed ){
			PFEncumbrance.updateLoadsAndLift();
			PFAttacks.adjustAllDamageDiceAsync(null,eventInfo);
		}
	},false,eventInfo);
	// changing size back to medium would never update DamageDice
	PFEncumbrance.updateLoadsAndLift();
	PFAttacks.adjustAllDamageDiceAsync(null,eventInfo);
}
function applyNewSizeToSheet(eventInfo){
	//TAS.debug("PFSize.applyNewSizeToSheet");
	PFEncumbrance.updateLoadsAndLift();
	PFAttacks.adjustAllDamageDiceAsync(null,eventInfo);
}
export function migrate (callback){
	if (typeof callback === "function") {
		callback();
	}
}
export var recalculate = TAS.callback(function PFSizeRecalculate(callback, silently, oldversion) {
	var done = _.once(function () {
		TAS.info("leaving PFSize.recalculate");
		if (typeof callback === "function") {
			callback();
		}
	});
	updateSizeAsync(done, silently,null);
});
function registerEventHandlers () {
	//size
	on("change:size change:default_char_size", TAS.callback(function eventUpdateSize(eventInfo) {
		var prevv=0,newv=0;
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType );
		TAS.debug(eventInfo);
		if (eventInfo.sourceType === "player" ) {
			setNewSize(eventInfo);
		} else {
			//if sheetworker then it may be a loop, so don't change size just make sure everything is using the new size.
			//this will happen every time we call with buffs so it will be called twice
			//applyNewSizeToSheet(eventInfo);
		}
	}));
	on("change:size change:buff_size-total", TAS.callback(function eventUpdateSize(eventInfo) {
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		if (eventInfo.sourceType === "sheetworker" || eventInfo.sourceType === "api" ) {
			setNewSize(eventInfo);
		}
	}));
}
registerEventHandlers();
