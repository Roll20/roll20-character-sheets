'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils  from './PFUtils';
import * as PFUtilsAsync from './PFUtilsAsync';
import * as PFBuffs from './PFBuffs';
import * as PFAbilityScores from './PFAbilityScores';
import * as PFSkills from './PFSkills';
import { buffColumns } from './PFBuffsOld';

export function resetCommandMacro (callback, eventInfo){
    getAttrs(['customd1','customd2','customd3','customd4','customd5','customd6',
        	'customd1-name','customd2-name','customd3-name','customd4-name','customd5-name','customd6-name',
			'allcustom_macro','NPC-allcustom_macro'],function(v){
        var macroStr='',npcMacroStr='',tempStr='';
		try {
			if(v['customd1'] ){
				tempStr = "[" + (SWUtils.escapeForChatLinkButton(v['customd1-name'])||'customd1') + "](~@{character_id}|";
				macroStr+=tempStr + "customd1_roll) ";
				npcMacroStr+=tempStr + "NPC-customd1_roll) ";
			}
			if(v['customd2'] ){
				tempStr = "[" + (SWUtils.escapeForChatLinkButton(v['customd2-name'])||'customd2') + "](~@{character_id}|";
				macroStr+=tempStr + "customd2_roll) ";
				npcMacroStr+=tempStr + "NPC-customd2_roll) ";
			}
			if(v['customd3'] ){
				tempStr = "[" + (SWUtils.escapeForChatLinkButton(v['customd3-name'])||'customd3') + "](~@{character_id}|";
				macroStr+=tempStr + "customd3_roll) ";
				npcMacroStr+=tempStr + "NPC-customd3_roll) ";
			}
			if(v['customd4'] ){
				tempStr = "[" + (SWUtils.escapeForChatLinkButton(v['customd4-name'])||'customd4') + "](~@{character_id}|";
				macroStr+=tempStr + "customd4_roll) ";
				npcMacroStr+=tempStr + "NPC-customd4_roll) ";
			}
			if(v['customd5'] ){
				tempStr = "[" + (SWUtils.escapeForChatLinkButton(v['customd5-name'])||'customd5') + "](~@{character_id}|";
				macroStr+=tempStr + "customd5_roll) ";
				npcMacroStr+=tempStr + "NPC-customd5_roll) ";
			}
			if(v['customd6'] ){
				tempStr = "[" + (SWUtils.escapeForChatLinkButton(v['customd6-name'])||'customd6') + "](~@{character_id}|";
				macroStr+=tempStr + "customd6_roll) ";
				npcMacroStr+=tempStr + "NPC-customd6_roll) ";
			}
			if(macroStr || npcMacroStr){
				macroStr = "{{roll20=^{custom}}} {{roll21="+macroStr+" }}";
				npcMacroStr = "{{roll20=^{custom}}} {{roll21="+npcMacroStr+" }}";
			}
		} catch (err){
			TAS.error("PFCustom.resetCommandMacro ",err);
		} finally {
			if(macroStr !== v.allcustom_macro || npcMacroStr !== v['NPC-allcustom_macro']){
				SWUtils.setWrapper({'allcustom_macro':macroStr,
					'NPC-allcustom_macro':npcMacroStr},PFConst.silentParams,callback);
			} else if (typeof callback === "function") {
				callback();
			}
		}
    });
}

function showMiscFields () {
	SWUtils.setWrapper({
		'extra_fields_attacks_show':1,
		'skill_onetimecolumns_show':1,
		'extra_fields_saves_show':1,
		'extra_fields_spells_show':1,
		'extra_fields_defense_show':1,
		'extra_fields_caster_show':1,
		'extra_fields_abilities_show':1,
		'extra_fields_init_show':1,
		'extra_fields_speeds_show':1,
		'extra_fields_conditions_show':1
	},PFConst.silentParams);
}
function hideMiscFields () {
	SWUtils.setWrapper({
		'extra_fields_attacks_show':0,
		'skill_onetimecolumns_show':0,
		'extra_fields_saves_show':0,
		'extra_fields_spells_show':0,
		'extra_fields_defense_show':0,
		'extra_fields_caster_show':0,
		'extra_fields_abilities_show':0,
		'extra_fields_init_show':0,
		'extra_fields_speeds_show':0,
		'extra_fields_conditions_show':0
	},PFConst.silentParams);
}


function recalcExpressions (callback, silently, oldversion) {
	var countEqs = _.size(PFConst.equationMacros),
	done = _.once(function () {
		//TAS.debug("leaving PFSheet.recalcExpressions");
		if (typeof callback === "function") {
			callback();
		}
	}),
	doneOne = _.after(countEqs, done);
	try {
		_.each(PFConst.equationMacros, function (writeField, readField) {
			try {
				SWUtils.evaluateAndSetNumber(readField, writeField, 0, doneOne, silently);
			} catch (err) {
				TAS.error("PFSheet.recalcExpressions", err);
				doneOne();
			}
		});
	} catch (err2) {
		TAS.error("PFSheet.recalcExpressions OUTER wtf how did this happen?", err2);
	} finally {
		done();
	}
}
function recalcDropdowns (callback, silently, oldversion) {
	var countEqs = _.size(PFConst.abilityScoreManualDropdowns),
	countDD2 = _.size(PFConst.levelPlusBABManualDropdowns),
	done = _.once(function () {
		if (typeof callback === "function") {
			callback();
		}
	}),
	donetwo = _.after(2,done),
	doneOne = _.after(countEqs, donetwo),
	doneOther = _.after(countDD2,donetwo);
	try {
		_.each(PFConst.abilityScoreManualDropdowns, function (writeField, readField) {
			try {
				PFUtilsAsync.setDropdownValue(readField, writeField, doneOne, silently);
			} catch (err) {
				TAS.error("PFSheet.recalcDropdowns", err);
				doneOne();
			}
		});
		_.each(PFConst.levelPlusBABManualDropdowns,function(readField){
			try {
				PFUtilsAsync.setDropdownValue(readField, readField+'-mod', doneOther, silently);
			} catch (err) {
				TAS.error("PFSheet.recalcDropdowns", err);
				doneOther();
			}
		});
	} catch (err2) {
		TAS.error("PFSheet.recalcDropdowns OUTER wtf how did this happen?", err2);
	} finally {
		done();
	}
}

function recalcCustomExpressions (callback, silently, oldversion) {
	var countEqs = _.size(PFConst.customEquationMacros),
	fields,
	done = _.once(function () {
		//TAS.debug("leaving PFCustom.recalculate");
		if (typeof callback === "function") {
			callback();
		}
	}),
	doneOne = _.after(countEqs, done);
	try {
		fields = _.reduce(PFConst.customEquationMacros,function(m,writeField,readField){
			m = m.concat( [readField,writeField,'buff_'+PFBuffs.buffToTot[readField]+'-total'] );
			return m;
		},[]);
		getAttrs(fields,function(v){
			_.each(PFConst.customEquationMacros, function (writeField, readField) {
				SWUtils.evaluateAndAdd(doneOne,silently,v[readField],writeField,v[writeField],v['buff_'+PFBuffs.buffToTot[readField]+'-total']);
			});
		});
	} catch (err2) {
		TAS.error("PFCustom.recalculate OUTER wtf how did this happen?", err2);
	} finally {
		done();
	}
}

export function migrate(callback,oldversion){
    var done = _.once(function(){
        if (typeof callback === "function"){
            callback();
        }
    }),
    updatedGroup = _.after(4,function(){
        setAttrs({'migrated_ability_dropdowns4':1},PFConst.silentParams,done);
    }),
	updateRepeatingAttackTypes = function(){
		var sections,doneOneSection;
		sections  = Object.keys(PFConst.repeatingAttackTypeManualDropdowns);
		if(!_.size(sections)){
			updatedGroup();
			return;
		}
		doneOneSection = _.after(_.size(sections),updatedGroup);
		//TAS.debug("the sections are ",sections);
		sections.forEach(function(section){
			getSectionIDs('repeating_'+section,function(ids){
				var fields, attr='';
				if(!ids || _.size(ids)===0){
					TAS.warn("migrate repeating attacktype Dropdowns, there are no rows for " + section);
					doneOneSection();
					return;
				}
				attr='_'+PFConst.repeatingAttackTypeManualDropdowns[section];
				fields = ids.map(function(id){return 'repeating_'+section+'_'+id+attr; });
				getAttrs(fields,function(v){
					var setter, tempstr='';
					//TAS.debug("migrate repeating attackDropdowns for "+section+", getting:",v);
					setter = Object.keys(v).reduce(function(m,a){
						try{
							if (v[a] && v[a][0]!=="0"){
								tempstr=v[a].replace('@{','').replace('}','');
								if (tempstr!==v[a]){
									m[a]=tempstr;
								}
							}
						} catch (err){
							TAS.error("PFSheet.migrate repeating attacktype dropdowns for: "+section,err);
						} finally {
							return m;
						}
					},{});
					if (_.size(setter)>0){
						TAS.debug("Migrate attack dropdowns setting:",setter);
						setAttrs(setter,PFConst.silentParams,doneOneSection);
					} else {
						doneOneSection();
					}
				});
			});
		});
	},
    updateRepeating= function(){
        getSectionIDs("repeating_weapon",function(ids){
            var fields;
            if (!ids || _.size(ids)===0){
                updatedGroup();
                return;
            }
            fields =SWUtils.cartesianAppend(['repeating_weapon_'],ids,['_damage-ability']);
            getAttrs(fields,function(v){
                var setter;
				try {
					//TAS.debug("migrate repeatingweapon AbilityDropdowns getting:",v);
					setter = Object.keys(v).reduce(function(m,a){
						var tempstr='';
						if (v[a] && v[a]!=="0"){
							tempstr=v[a].replace('@{','').replace('}','');
							if (tempstr!==v[a]){
								m[a]=tempstr;
							}
						}
						return m;
					},{});
				} catch (err){
					TAS.error("PFSheet.migrate repeating ability dropdowns ",err);
				} finally {
					if (_.size(setter)){
						TAS.debug("Migrate repeatingweapon ability dropdowns setting:",setter);
						setAttrs(setter,PFConst.silentParams,updatedGroup);
					} else {
						updatedGroup();
					}
				}
            });
        });
    },
    updateNonRepeating = function(){
        var fields = Object.keys(PFConst.abilityScoreManualDropdowns);
        getAttrs(fields,function(v){
            var setter={};
			try{
				//TAS.debug("migrateAbilityDropdowns getting:",v);
				setter =fields.reduce(function(m,a){
					var tempstr='';
					if (v[a]){
						switch(a){
							case 'concentration-0-ability':
							case 'concentration-1-ability':
							case 'concentration-2-ability':
							case 'FF-ability':
							case 'CMD-ability':
							case 'sanity-ability':
							case 'selected-ability-psionic-power':
							case 'melee2-ability':
							case 'ranged2-ability':
							case 'cmb2-ability':
								tempstr=PFUtils.findAbilityInString(v[a])||"0";
								break;
							default:
								tempstr=PFUtils.findAbilityInString(v[a]);
								break;
						}
					}
					if (!tempstr && PFConst.manualDropdownDefaults[a]){
						tempstr=PFConst.manualDropdownDefaults[a];
					}
					if (tempstr && tempstr!==v[a]){
						m[a]=tempstr;
					}
					return m;
				},{});
			} catch (err){
				TAS.error("PFSheet.migrate AbilityModDropdowns ",err);
			} finally {
				if (_.size(setter)){
					TAS.debug("Migrate ability dropdowns setting:",setter);
					setAttrs(setter,PFConst.silentParams,updatedGroup);
				} else {
					updatedGroup();
				}
			}
        });
    },
    updateSkills = function(){
        var fields = PFSkills.allTheSkills.map(function(s){return s+"-ability";});
        getAttrs(fields,function(v){
            var setter={};
			try{
				//TAS.debug("updateSkills getting:",fields,v);
				setter = fields.reduce(function(m,a){
					var tempstr='',tempskill='',matches,tempmatch='';
					try {
						if (v[a] && v[a].indexOf('@{')>=0){
							tempstr=v[a].replace('@{','').replace('}','');
						} else if ( !(/misc/i).test(a) && ( !v[a] ||  PFAbilityScores.abilitymods.indexOf(v[a])<0)){
							matches = a.match(/Perform|Profession|Craft|Lore|Artistry|Knowledge/i);
							if(matches){
								switch(matches[0]){
									case 'Perform':
										tempstr='CHA-mod';
										break;
									case 'Profession':
										tempstr='WIS-mod';
										break;
									case 'Craft':
									case 'Knowledge':
									case 'Artistry':
									case 'Lore':
										tempstr='INT-mod';
										break;
								}
							}
							if (!tempstr){
								tempskill=a.slice(0,-8);
								tempstr=PFSkills.coreSkillAbilityDefaults[tempskill];
								if (!tempstr) {
									tempstr = PFSkills.consolidatedSkillAbilityDefaults[tempskill];
								}
								if(tempstr){
									tempstr=tempstr.toUpperCase()+'-mod';
								}
							}
						}
						if (tempstr && tempstr!==v[a]){
							m[a]=tempstr;
						}
					} catch (skillerri) {
						TAS.error("Migrate Skill dropdowns error skillerri on "+a,skillerri);
					} finally {
						return m;
					}
				},{});
			} catch (err){
				TAS.error("PFSheet.migrate Skills dropdowns ",err);
			} finally {
				if (_.size(setter)){
					//TAS.debug("Migrate skill dropdowns setting:",setter);
					setAttrs(setter,PFConst.silentParams,updatedGroup);
				} else {
					TAS.warn("Migrate skill dropdowns, there was nothing to set!");
					updatedGroup();
				}
			}
        });
	};
    getAttrs(['migrated_ability_dropdowns4'],function(v){
        var setter={};
        if(!parseInt(v.migrated_ability_dropdowns4,10)){
            updateRepeating();
            updateNonRepeating();
			updateRepeatingAttackTypes();
			updateSkills();
        } else {
            done();
        }
    });
}

export function fixProfessionDropdowns (callback){
	var fields = ['migrated_skill_dropdowns5', 'Profession-ability','Profession2-ability','Profession3-ability','Profession4-ability',
	'Profession5-ability','Profession6-ability','Profession7-ability','Profession8-ability',
	'Profession9-ability','Profession10-ability'];
	getAttrs(fields,function(v){
		var setter={},count=0,i=0,attr='';
		try{
			if(!parseInt(v.migrated_skill_dropdowns5,10)){
				setter['migrated_skill_dropdowns5']=1;
				for (i=10;i>0;i--){
					if(i>1){
						attr='Profession'+i+'-ability';
					}else {
						attr='Profession-ability';
					}
					if(v[attr]==='INT-mod'){
						setter[attr]='WIS-mod';
						count++;
					} else {
						break;
					}
				}
			}
		} catch (err){
			TAS.error("PFSheet.migrate Skills dropdowns ",err);
		} finally {
			if (_.size(setter)){
				//TAS.debug("Migrate skill dropdowns setting:",setter);
				setAttrs(setter,PFConst.silentParams,callback);
			} else if (typeof callback === "function"){
				callback();
			}
		}
	});
}


export var recalculate = TAS.callback(function PFCustomRecalculate(callback,silently,oldversion){
	migrate(function(){
		recalcDropdowns(function(){
			fixProfessionDropdowns();
			recalcExpressions(function(){
				recalcCustomExpressions(function(){
					resetCommandMacro(callback);
				},silently,oldversion);
			},silently,oldversion);
		},silently,oldversion);
	},oldversion);
});

function registerEventHandlers () {
	//custom page
	on("change:customd1 change:customd2 change:customd3 change:customd4 change:customd5 change:customd6 change:customd1-name change:customd2-name change:customd3-name change:customd4-name change:customd5-name change:customd6-name",
		TAS.callback(function customRollUpdate(eventInfo){
			if(eventInfo.sourceType==='player'){
				TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
				resetCommandMacro(eventInfo);
			}
    }));
	//show / hide extra fields
	on("change:use_advanced_options", TAS.callback(function eventShowMisc(eventInfo){
		if(eventInfo.sourceType==='player'||eventInfo.sourceType==='api'){
			TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
			getAttrs(['use_advanced_options'],function(v){
				if(parseInt(v.use_advanced_options,10)){
					showMiscFields();
				} else {
					hideMiscFields();
				}
			});
		}
    }));
	//GENERIC DROPDOWNS
	_.each(PFConst.abilityScoreManualDropdowns, function (write, read) {
		on("change:" + read, TAS.callback(function eventManualDropdown(eventInfo) {
			if (eventInfo.sourceType==="player" || eventInfo.sourceType==="api"){
				TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
				//user changed the SELECTION
				PFUtilsAsync.setDropdownValue(read, write);
			}
		}));
	});

	//GENERIC EQUATIONS
	_.each(PFConst.equationMacros, function (write, read) {
		on("change:" + read, TAS.callback(function eventGenericEquationMacro(eventInfo) {
			TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
			SWUtils.evaluateAndSetNumber(read, write);
		}));
	});

	_.each(PFConst.customEquationMacros,function(writeField,custField){
		on('change:'+custField,TAS.callback(function customEquationMacro(eventInfo){
				TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
				SWUtils.evaluateAndAddAsync(null,null,custField,writeField,'buff_'+custField+'-total');
		}));
	});

	on("change:kineticist_level", TAS.callback(function eventKineticistLevel(eventInfo){
		if(eventInfo.sourceType==='player'){
			TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
			PFUtilsAsync.setDropdownValue('kineticist_level', 'kineticist_level-mod');
		}
	}));
}

registerEventHandlers();

