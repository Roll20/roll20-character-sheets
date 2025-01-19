'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils  from './PFUtils';
import * as PFAbilityScores from './PFAbilityScores';
import * as PFSaves from './PFSaves';
import * as PFAttackGrid from './PFAttackGrid';
import * as PFAttacks from './PFAttacks';
import * as PFDefense from './PFDefense';
import * as PFHealth from  './PFHealth';
import * as PFChecks from './PFChecks';
import * as PFInitiative from './PFInitiative';
import * as PFEncumbrance from './PFEncumbrance';
import * as PFSize from './PFSize';
import * as PFSkills from './PFSkills';

export var buffColumns = ['Ranged', 'Melee','CMB', 'DMG', 'DMG_ranged',
	"AC", "Touch", "CMD","flat-footed",
	"speed", "initiative","size","check_skills",
	"HP-temp", "Fort", "Will", "Ref", "Check", "CasterLevel",
	'STR','DEX','CON','INT','WIS','CHA',
	'STR_skills','DEX_skills','CON_skills','INT_skills','WIS_skills','CHA_skills'],
buffToTotExceptions = {
	'Check':'check_ability','DMG':'dmg_melee',
},
//all total fields
buffTotFields = _.chain(buffColumns).map(function(buff){
		var isAbility = (PFAbilityScores.abilities.indexOf(buff) >= 0) && buff.indexOf('skill')<1;
		if (!isAbility){
			return ['buff_'+buff+'-total','buff_'+buff+'_exists'];
		} else {
			return ['buff_'+buff+'-total','buff_'+buff+'_exists','buff_'+buff+'-total_penalty', 'buff_'+buff+'_penalty_exists'];
		}
	}).flatten().value().concat(['buff_check_ability-total','buff_dmg_melee-total'])
;

function clearBuffTotals (callback,silently){
	var done=function(){
		if(typeof callback === "function"){
			callback();
		}
	};
	//TAS.notice("the total fields are ",buffTotFields2);
	getAttrs(buffTotFields,function(v){
		var setter={},params={};
		//TAS.debug("PFBuffsOld.clearBuffTotals we got back the following: ",v);
		//TAS.notice("now using ",totColumns);
		setter = _.reduce(buffColumns,function(memo,col){
			var val = parseInt(v['buff_'+col+'-total'],10)||0,
			exists =parseInt(v['buff_'+col+'_exists'],10)||0;
			if(val ){
				memo['buff_'+col+'-total']=0;
			}
			if (exists){
				memo['buff_'+col+'_exists']=0;
			}
			return memo;
		},{});
		setter = _.reduce(PFAbilityScores.abilities,function(memo,col){
			var val = parseInt(v['buff_'+col+'-total_penalty'],10)||0,
			exists =parseInt(v['buff_'+col+'_penalty_exists'],10)||0;
			if(val ){
				memo['buff_'+col+'-total_penalty']=0;
			}
			if (exists){
				memo['buff_'+col+'_penalty_exists']=0;
			}
			return memo;
		},setter);
		if (_.size(setter)){
			if(silently){
				params =PFConst.silentParams;
			}
			SWUtils.setWrapper(setter,params,done);
		} else {
			done();
		}
	});
}

export function getAllRowAttrs(callback){
	getSectionIDs('repeating_buff',function(ids){
		var fields,attrs;
		if(!(ids && _.size(ids))){
			return callback(null,null);
		}
		attrs = SWUtils.cartesianAppend(['_buff-'],buffColumns,['_macro-text','','-show']);
		attrs = attrs.concat(['_buff-enable_toggle','_buff-name','_buff-notes']);
		fields =  SWUtils.cartesianAppend(['repeating_buff_'],ids,attrs );
		//TAS.debug("these are the fields "+fields);
		getAttrs(fields,function(v){
			callback(ids,v);
		});
	});

}

/**Sets 1 or 0 for buff_*_exists in status panel - only called by updateBuffTotalAsync.
 * @param {function} callback
 */
function resetStatuspanel (callback) {
	var done = _.once(function () { if (typeof callback === "function") { callback(); } }),
	 fields;

	try {
		fields = SWUtils.cartesianAppend(["buff_"], buffColumns, ["-total", "_exists"]).concat(
			SWUtils.cartesianAppend(["buff_"], PFAbilityScores.abilities, [ "-total_penalty",  "_penalty_exists"])
		);
	} catch (errO) {
		TAS.error("PFBuffsOld.resetStatuspanel error creating field array, abort:", errO);
		done();
		return;
	}
	getAttrs(fields, function (v) {
		var setter = {},
		getExists= function(pre,post){
			var val,exists;
			post=post||'';
			val = parseInt(v[pre + "-total"+post], 10) || 0;
			exists = parseInt(v[pre +post+ "_exists"], 10) || 0;
			if (val !== 0 && !exists) {
				return 1;
			} else if (val === 0 && exists) {
				return 0;
			}
		};
		try {
			setter = _.reduce(buffColumns, function (memo, col) {
				var pre,v;
				try {
					pre="buff_" + col;
					v=getExists(pre,'');
					if (v || v===0){
						memo[pre+'_exists']=v;
					}
				} catch (erri1) { } finally {
					return memo;
				}
			}, setter);
			setter = _.reduce(PFAbilityScores.abilities, function (memo, col) {
				var pre,v;
				try {
					pre="buff_" + col;
					v=getExists(pre,'_penalty');
					if (v || v===0){
						memo[pre+'_penalty_exists']=v;
					}
				} catch (erri1) { } finally {
					return memo;
				}
			}, setter);
		} catch (err) {
			TAS.error("PFBuffsOld.resetStatuspanel error inside calculate exists", err);
		} finally {
			if (_.size(setter) > 0) {
				SWUtils.setWrapper(setter, { silent: true }, done);
			} else {
				done();
			}
		}
	});
}

function updateBuffTotal (col,ids,v,setter){
	var isAbility=0,
	sums={'sum':0,'pen':0},
	tempInt=0,
	totcol=col,
	rows=[];
	try {
		setter = setter || {};
		if(buffToTotExceptions[col]){
			totcol=buffToTotExceptions[col];
		}
		PFSkills.recalculateSkills();
		TAS.notice("Updating "+col+" the total is "+totcol,buffToTotExceptions,v);
		isAbility=(PFAbilityScores.abilities.indexOf(col) >= 0) && col.indexOf('skill')<9;
		ids = ids.filter(function(id){
				var prefix = 'repeating_buff_'+id+'_buff-';
				return  ((parseInt(v[prefix + col + '-show'],10)||0)!==0) && ((parseInt(v[prefix+col],10)||0)!==0);
			});
		TAS.debug("updating "+ col+" there are "+_.size(ids)+" rows");
		if(_.size(ids)>0){
			rows = ids.map(function(id){
				return (parseInt(v['repeating_buff_'+id+'_buff-'+col],10)||0);
			});

			TAS.debug("PFBuffsOld ROWS NOW:",rows);
			if(col==='HP-temp'){
				sums.sum = rows.filter(function(row){
					return row>0;
				}).reduce(function(m,row){
					m+=row;
					return m;
				},0);
			} else if (col==='size' ){
				sums = rows.reduce(function(m,row){
					if(row>0){
						m.sum = Math.max(m.sum,row);
					}  else if (row<0){
						m.pen = Math.min(m.pen,row);
					}
					return m;
				},sums);
				sums.sum += sums.pen;
				sums.pen =0;
			} else if (isAbility) {
				sums = rows.reduce(function(m,row){
					if (row<0){
						m.pen += row;
					} else if (row > 0){
						m.sum += row;
					}
					return m;
				},sums);
			} else {
				TAS.debug("now calculating sum for "+ col);
				sums.sum = rows.reduce(function(m,row){
					TAS.debug("ADDING "+row+" to m for "+col +" is "+ row);
					m += row;
					return m;
				},0);
				TAS.debug("calculating "+ col+" sum is "+sums.sum);
			}
		}
		//TAS.debug("PFBuffsOldNOW totals are: ",sums);
		if ( (parseInt(v['buff_'+totcol+'-total'],10)||0)!==sums.sum){
			setter['buff_'+totcol+'-total']=sums.sum;
		}
		if (sums.sum ){
			setter['buff_'+totcol+'_exists']=1;
		} else if ((parseInt(v['buff_'+totcol+'_exists'],10)||0)===1){
			setter['buff_'+totcol+'_exists']=0;
		}
		if (isAbility){
			if ( (parseInt(v['buff_'+totcol+'-total_penalty'],10)||0)!==sums.pen){
				setter['buff_'+totcol+'-total_penalty']=sums.pen;
			}
			if (sums.pen){
				setter['buff_'+totcol+'_penalty_exists']=1;
			} else if ((parseInt(v['buff_'+totcol+'_penalty_exists'],10)||0)===1){
				setter['buff_'+totcol+'_penalty_exists']=0;
			}
		}
	} catch(err){
		TAS.error("PFBuffsOld.updateBuffTotal",err);
	} finally {
		return setter;
	}
}
function updateBuffTotalAsync (col, callback,silently){
	var done = _.once(function () {
		//TAS.debug("leaving PFBuffsOld.updateBuffTotalAsync for "+col);
		if (typeof callback === "function") {
			callback();
		}
	}),
	isAbility = (PFAbilityScores.abilities.indexOf(col) >= 0) && col.indexOf('skill')<9;

	getSectionIDs('repeating_buff',function(ids){
		var fields,totfields,otherfields,totcol=col;
		if(ids){
			if(buffToTotExceptions[col]){
				totcol=buffToTotExceptions[col];
			}
			fields = SWUtils.cartesianAppend(['repeating_buff_'],ids,['_buff-'+col,'_buff-'+col+'-show','_buff-enable_toggle']);
			totfields = ['buff_'+totcol+'-total', 'buff_'+totcol+'_exists'];
			if (isAbility){
				totfields = totfields.concat(['buff_'+totcol+'-total_penalty', 'buff_'+totcol+'_penalty_exists']);
			}
			fields = fields.concat(totfields);
			getAttrs(fields,function(v){
				var bonuses = {},
				params={}, setter={};
				try {
					//TAS.debug("PFBuffsOld.totals for "+ col+" v is",v);
					//don't need to put this in different loop but do it for future since when we move to multi column at once will need.
					ids = ids.filter(function(id){
						var prefix = 'repeating_buff_'+id+'_buff-';
						return  (parseInt(v[prefix+'enable_toggle'],10)||0);
					});
					setter = updateBuffTotal(col,ids,v,setter);
					//reset old buffs.
					if(buffToTotExceptions[col]){
						setter['buff_'+col+'-total']=0;
						setter['buff_'+col+'_exists']=0;
						setter['buff_'+col+'-total_penalty']=0;
						setter['buff_'+col+'_penalty_exists']=0;
					}
				} catch (errou){
					TAS.error("PFBuffsOld.updateBuffTotalAsync errou on col "+col,errou);
				} finally {
					if (_.size(setter)){
						TAS.debug("######################","PFBuffsOld setting ",setter);
						if (silently){
							params = PFConst.silentParams;
						}
						SWUtils.setWrapper(setter,params,done);
					} else {
						done();
					}
				}
			});
		} else {
			done();
		}
	});
}
function updateAllBuffTotalsAsync (callback,silently){
	var done = _.once(function () {
		//TAS.debug("leaving PFBuffsOld.updateBuffTotalAsync for "+col);
		if (typeof callback === "function") {
			callback();
		}
	});
	TAS.debug("PFBuffsOld.updateAllBuffTotalsAsync");
	getSectionIDs('repeating_buff',function(ids){
		var fields;
		if(!ids || _.size(ids)===0){
			clearBuffTotals(done,silently);
			return;
		}
		fields = SWUtils.cartesianAppend(['repeating_buff_'],ids,['_buff-'],buffColumns,['','-show']);
		fields = fields.concat(SWUtils.cartesianAppend(['repeating_buff_'],ids,['_buff-enable_toggle']));
		fields = fields.concat(buffTotFields);
		//fields = fields.concat(charBonusFields);
		fields.push('use_buff_bonuses');
		TAS.debug("############ BUFF FIELDS ARE:", fields);

		getAttrs(fields,function(v){
			var useBonuses=false,
			bonuses = {},
			params={}, setter={};
			try {
				TAS.debug("PFBuffsOld.updateAllBuffTotalsAsync found:",v);
				useBonuses=parseInt(v.use_buff_bonuses,10)||0;
				ids = ids.filter(function(id){
					return parseInt(v['repeating_buff_'+id+'_buff-enable_toggle'],10);
				});
				if(!ids || _.size(ids)===0){
					TAS.debug("there are no ids with enable toggle checked");
					clearBuffTotals(done,silently);
					return;
				}
				_.each(buffColumns,function(col){
					setter=updateBuffTotal(col,ids,v,setter,useBonuses);
				});
			} catch (errou){
				TAS.error("PFBuffsOld.updateAllBuffTotalsAsync errou on col ",errou);
			} finally {
				if (_.size(setter)){
					TAS.debug("######################","PFBuffsOldsetting ",setter);
					if (silently){
						params = PFConst.silentParams;
					}
					SWUtils.setWrapper(setter,params,done);
				} else {
					done();
				}
			}
		});

	});
}

function setBuff (id, col, callback, silently) {
	var done = function () {
		if (typeof callback === "function") {
			callback();
		}
	},
	idStr = SWUtils.getRepeatingIDStr(id),
	prefix = "repeating_buff_" + idStr + "buff-" + col;
	if(col==='size'){
		done();
		return;
	}
	SWUtils.evaluateAndSetNumber(prefix + "_macro-text", prefix,0,
		function(a,b,c){
			if (c){
				updateBuffTotalAsync(col,done,silently);
			} else {
				done();
			}
		},true,done);
}

export function reEvaluateCustomMacros(callback,silently){
	var done = _.once(function () {
		resetStatuspanel();
		if (typeof callback === "function") {
			callback();
		}
	}),
	numColumns = _.size(buffColumns),
	columnDone = _.after(numColumns, function(){updateAllBuffTotalsAsync(done,silently);}),
	recalculateBuffColumn = function (ids, col) {
		var rowtotal = _.size(ids),
			rowDone;
		TAS.debug("PFBuffsOld.recalculateBuffColumn:"+col);
		if (col==='size'){
			columnDone();
			return;
		}
		rowDone = _.after(rowtotal, function () {
			columnDone();
		});
		try {
			if(col==='size'){
				columnDone();
				return;
			}
			_.each(ids, function (id) {
				try {
					getAttrs(['repeating_buff_'+id+'_buff-enable_toggle',
					'repeating_buff_'+id+'_buff-' + col + '-show'],function(v){
						if (parseInt(v['repeating_buff_'+id+'_buff-enable_toggle'],10) &&
							parseInt(v['repeating_buff_'+id+'_buff-' + col + '-show'],10) ) {
								//setBuff(id, col, rowDone, silently);
								SWUtils.evaluateAndSetNumber('repeating_buff_'+id+'_buff-' + col + "_macro-text", 'repeating_buff_'+id+'_buff-' + col,0,rowDone,true);
						} else {
							rowDone();
						}
					});
				} catch (err) {
					TAS.error("PFBuffsOld.recalculate_recalculateBuffColumn:" + col + ", rowid" + id, err);
					rowDone();
				}
			});
		} catch (err2) {
			TAS.error("PFBuffsOld.recalculate_recalculateBuffColumn OUTER error:" + col, err2);
			columnDone();
		}
	};

	getSectionIDs("repeating_buff", function (ids) {
		//TAS.debug("PFBuffs.recalculate there are " + _.size(ids) + " rows and " + numColumns + " columns");
		try {
			if (_.size(ids) > 0) {
				_.each(buffColumns, function (col) {
					recalculateBuffColumn(ids, col);
				});
			} else {
				clearBuffTotals(done);
			}
		} catch (err) {
			TAS.error("PFBuffsOld.recalculate.recalculateAll", err);
			//what to do? just quit
			done();
		}
	});
}

export function migrate (outerCallback) {
	var done = _.once(function () {
		//TAS.debug("leaving PFBuffsOld.migrate");
		if (typeof outerCallback === "function") {
			outerCallback();
		}
	}),
	//if DMG has values and DMG_ranged does not, copy to DMG_ranged
	//if Check has value but check_skills does not, copy to check_skills
	migrateMeleeAndAbilityChecks = function(callback){
		var done= _.once(function(){
			if (typeof callback==="function"){
				callback();
			}
		}),
		migrated = function(){
			SWUtils.setWrapper({'migrated_buffs_rangeddmg_ability':1},PFConst.silentParams,done);
		};
		getAttrs(['migrated_buffs_rangeddmg_ability'],function(vout){
			var wasmigrated=parseInt(vout.migrated_buffs_rangeddmg_ability,10)||0;
			if (!wasmigrated){
				getSectionIDs('repeating_buff',function(ids){
					var fields;
					if (_.size(ids)){
						fields = SWUtils.cartesianAppend(['repeating_buff_'],ids,
							['_buff-DMG_macro-text','_buff-DMG','_buff-DMG-show','_buff-DMG_ranged_macro-text','_buff-DMG_ranged',
							'_buff-Melee_macro-text','_buff-Melee','_buff-Melee-show','_buff-CMB_macro-text','_buff-CMB_ranged',
							'_buff-Check_macro-text','_buff-Check','_buff-Check-show','_buff-check_skills_macro-text','_buff-check_skills']);
						fields = fields.concat(['buff_Check-total','buff_check_skills-total','buff_Melee-total','buff_DMG-total','buff_DMG_ranged-total','buff-CMB-total']);
						getAttrs(fields,function(v){
							var setter={},resetconditions=false,tempInt=0;
							try {
								//TAS.debug("###########","PFBuffsOld.migrate found ",v);
								ids.forEach(function(id){
									var prefix = 'repeating_buff_'+id+'_buff-';
									//TAS.debug("at id "+id);
									if(v[prefix+'DMG_macro-text']&&!v[prefix+'DMG_ranged_macro-text']){
										setter[prefix+'DMG_ranged_macro-text']=v[prefix+'DMG_macro-text'];
										setter[prefix+'DMG_ranged']=parseInt(v[prefix+'DMG'],10)||0;
										if (parseInt(v[prefix+'DMG-show'],10)){
											setter[prefix+'DMG_ranged-show']=1;
										}
									}
									if(v[prefix+'Check_macro-text']&&!v[prefix+'check_skills_macro-text']){
										setter[prefix+'check_skills_macro-text']=v[prefix+'Check_macro-text'];
										setter[prefix+'check_skills']=parseInt(v[prefix+'Check'],10)||0;
										resetconditions=true;
										if (parseInt(v[prefix+'Check-show'],10)){
											setter[prefix+'check_skills-show']=1;
										}
									}
									if(v[prefix+'Melee_macro-text']&&!v[prefix+'CMB_macro-text']){
										setter[prefix+'CMB_macro-text']=v[prefix+'Melee_macro-text'];
										setter[prefix+'CMB']=parseInt(v[prefix+'Melee'],10)||0;
										resetconditions=true;
										if (parseInt(v[prefix+'Melee-show'],10)){
											setter[prefix+'CMB-show']=1;
										}
									}
								});
								tempInt = parseInt(v['buff_DMG-total'],10)||0;
								if(tempInt){
									setter['buff_DMG_ranged-total']=tempInt + parseInt(v['buff_DMG_ranged-total'],10)||0;
								}
								tempInt = parseInt(v['buff_Check-total'],10)||0;
								if (tempInt){
									setter['buff_check_skills-total']=tempInt+ parseInt(v['buff_check_skills-total'],10)||0;
								}
								tempInt = parseInt(v['buff_Melee-total'],10)||0;
								if (tempInt){
									setter['buff_CMB-total']=tempInt+ parseInt(v['buff_CMB-total'],10)||0;
								}
							}catch (err){
								TAS.error("PFBuffsOld.migrateDmgAbility",err);
							}finally {
								if (_.size(setter)){
									//TAS.debug("###########","PFBuffsOldmigrate setting ",setter);
									SWUtils.setWrapper(setter,PFConst.silentParams,migrated);
									if(resetconditions){
										PFChecks.applyConditions();
										PFInitiative.updateInitiative();
									}
								} else {
									migrated();
								}
							}
						});
					} else{
						migrated();
					}
				});
			} else {
				done();
				return;
			}
		});
	};
	migrateMeleeAndAbilityChecks(done);
}

export var recalculate = TAS.callback(function recalculateBuffs(callback, silently, oldversion) {
	var done = _.once(function () {
		if (typeof callback === "function") {
			callback();
		}
	});
	getAttrs(['use_buff_bonuses'],function(v){
		if(!parseInt(v.use_buff_bonuses,10)){
			TAS.debug("USING OLD BUFFS");
			migrate(function(){
				reEvaluateCustomMacros(done,silently);
			});
		} else {
			TAS.debug("USING NEW BUFFS");
			done();
		}
	});
});
function registerEventHandlers () {
	_.each(buffColumns, function (col) {
		//Evaluate macro text upon change
		var prefix = "change:repeating_buff:buff-" + col ;
		if (col!=='size'){
			on(prefix + "_macro-text", TAS.callback(function eventBuffMacroText(eventInfo) {
				TAS.debug("caught " + eventInfo.sourceAttribute + " for column " + col + ", event: " + eventInfo.sourceType);
				setBuff(null, col);
			}));
		}
		on(prefix + "-show", TAS.callback(function PFBuffs_updateBuffRowShowBuff(eventInfo) {
			if (eventInfo.sourceType === "player" || eventInfo.sourceType ==="api") {
				TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
				TAS.debug("we updated "+col+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				getAttrs(['repeating_buff_buff-'+col,'repeating_buff_buff-enable_toggle'],function(v){
					if (parseInt(v['repeating_buff_buff-enable_toggle'],10) && parseInt(v['repeating_buff_buff-'+col],10) ) {
						TAS.debug("Show or don't show update "+col);
						updateBuffTotalAsync(col);
					}
				});
			}
		}));
	});
	//size is special users modify it via dropdown - no macro
	on("change:repeating_buff:buff-size", TAS.callback(function PFBuffs_updateBuffSize(eventInfo) {
		if (eventInfo.sourceType === "player" || eventInfo.sourceType ==="api") {
			TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
			updateBuffTotalAsync('size');
		}
	}));
	on("remove:repeating_buff", TAS.callback(function PFBuffs_removeBuffRow(eventInfo) {
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		if (eventInfo.sourceType === "player") {
			updateAllBuffTotalsAsync();
		}
	}));
	on("change:repeating_buff:buff-enable_toggle", TAS.callback(function PFBuffs_enableBuffRow(eventInfo) {
		var fields;
		if (eventInfo.sourceType === "player" || eventInfo.sourceType ==="api") {
			TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
			fields = buffColumns.map(function(col){return 'repeating_buff_buff-'+col;});
			fields = fields.concat(fields.map(function(row){return row+'-show';}));
			getAttrs(fields,function(v){
				_.each(buffColumns, function (col) {
					if( parseInt(v['repeating_buff_buff-'+col+'-show'],10) && parseInt(v['repeating_buff_buff-'+col],10)){
						updateBuffTotalAsync(col);
					}
				});
			});
		}
	}));
	//======== END OF OLD BUFFS ==================================================
}
registerEventHandlers();
//PFConsole.log('   PFBuffsOldmodule loaded          ');
//PFLog.modulecount++;
