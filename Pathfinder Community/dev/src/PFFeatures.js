'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils  from './PFUtils';
import * as PFMacros from './PFMacros';
import * as PFMenus from './PFMenus';
import * as PFAbility from './PFAbility';

export var featureLists = ["class-ability", "feat", "racial-trait", "trait", "mythic-ability", "mythic-feat",'npc-spell-like-abilities'],
migrateMap  = {
	'feat':{'copyAttrs':['name','short-description','used','used_max','showinmenu','description','max-calculation','ability_type'],
		'LU':['_name','_short-description','_used','_used_max','_showinmenu','_description','_macro-text','_npc-macro-text','_max-calculation','_ability_type'],
		'classDefault':'0',
		'hasNPCMacro':true,
		'ruleCategory':'feats'},
	'racial-trait':{'copyAttrs':['name','short-description','used','used_max','showinmenu','description','max-calculation','ability_type'],
		'LU':['_name','_short-description','_used','_used_max','_showinmenu','_description','_macro-text','_npc-macro-text','_max-calculation','_ability_type'],
		'hasNPCMacro':true,
		'classDefault':'@{level}',
		'ruleCategory':'racial-traits'},
	'trait':{'copyAttrs':['name','short-description','used','used_max','showinmenu','description','max-calculation','ability_type'],
		'LU':['_name','_short-description','_used','_used_max','_showinmenu','_description','_macro-text','_max-calculation','_ability_type'],
		'classDefault':'@{level}',
		'ruleCategory':'traits'},
	'class-ability':{'copyAttrs':['name','short-description','used','used_max','showinmenu','description','max-calculation'],
		'LU':['_name','_short-description','_used','_used_max','_showinmenu','_description','_macro-text','_max-calculation','_class-number'],
		'ruleCategory':'class-features',
		'convertClass':true},
	'npc-spell-like-abilities':{'copyAttrs':['name','short-description','used','used_max','showinmenu','description','max-calculation','duration','save','range'],
		'LU':['_name','_short-description','_used','_used_max','_showinmenu','_description','_macro-text','_npc-macro-text','_max-calculation','_level','_range','_duration','_save','_sr'],
		'hasNPCMacro':false,
		'classDefault':'@{level}',
		'ruleCategory':'spell-like-abilities'},
};
var migrateButtonMap = {
	merge_traits_now:'trait',
	merge_race_traits_now:'racial-trait',
	merge_feats_now:'feat',
	merge_class_features_now:'class-ability',
	merge_slas_now:'npc-spell-like-abilities',
	delete_traits_now:'trait',
	delete_race_traits_now:'racial-trait',
	delete_feats_now:'feat',
	delete_class_features_now:'class-ability',
	delete_slas_now:'npc-spell-like-abilities'
},
baseCommandMacro = "/w \"@{character_name}\" &{template:pf_block} @{toggle_attack_accessible} @{toggle_rounded_flag} {{font=@{apply_specfont_chat}@{use_specfont}}} {{scroll_desc=@{scroll-desc}}} {{color=@{rolltemplate_color}}} {{header_image=@{header_image-pf_generic}}} {{character_name=@{character_name}}} {{character_id=@{character_id}}} {{subtitle}} {{name=^{all-abilities}}} ",
otherCommandMacros = {
	'class-ability':" [^{original-class-features-list}](~@{character_id}|class-ability_button)",
	'mythic':" [^{mythic-abilities}](~@{character_id}|mythic-ability_button) [^{mythic-feats}](~@{character_id}|mythic-feat_button)",
	'feat':" [^{original-feats-list}](~@{character_id}|REPLACENPCfeat_button)",
	'racial-trait':" [^{original-racial-traits-list}](~@{character_id}|REPLACENPCracial-trait_button)",
	'trait':" [^{original-traits-list}](~@{character_id}|trait_button)",
	'npc-spell-like-abilities': " [^{original-spell-like-abilities-list}](~@{character_id}|npc-spell-like-abilities_button)"
},
events = {
	commandMacroFields:["name","used","used_max","showinmenu"]
};

/** resetTopCommandMacro sets orig_ability_header_macro  (macro to plug into pf_block, read by PFAbility.resetCommandMacro)
 *@param {function} callback call when done
 */
export function resetTopCommandMacro (callback){
	var done = _.once(function () {
		//TAS.debug("leaving PFFeatures.resetTopCommandMacro");
		if (typeof callback === "function") {
			callback();
		}
	});
	getAttrs(["is_npc","NPC-orig_ability_header_macro","orig_ability_header_macro","mythic-adventures-show","use_traits","use_racial_traits","use_feats","use_class_features","use_spell-like-abilities"],function(v){
		var isMythic = 0,
		usesTraits=0,
		usesRacialTraits=0,
		hasMythicMacro=0,
		usesFeats=0,
		usesClass=0,
		usesSLAs=0,
		newMacro="",
		isNPC=0,
		prefix="",
		setter={}
		;
		try {
			isNPC=parseInt(v.is_npc,10)||0;
			prefix=isNPC?"NPC-":"";
			isMythic = parseInt(v["mythic-adventures-show"],10)||0;
			usesFeats = parseInt(v["use_feats"],10)||0;
			usesClass = parseInt(v["use_class_features"],10)||0;
			usesTraits = parseInt(v.use_traits,10)||0;
			usesRacialTraits=parseInt(v.use_racial_traits,10)||0;
			usesSLAs = parseInt(v["use_spell-like-abilities"],10)||0;

			newMacro =
				(usesClass?otherCommandMacros['class-ability']:"") +
				(usesFeats?otherCommandMacros['feat'].replace(/REPLACENPC/g,prefix):"") +
				(usesSLAs?otherCommandMacros['npc-spell-like-abilities']:"") +
				(usesTraits?otherCommandMacros['trait']:"") +
				(usesRacialTraits?otherCommandMacros['racial-trait'].replace(/REPLACENPC/g,prefix):"") +
				(isMythic?otherCommandMacros['mythic']:"") ;
			if (newMacro) {
				//no space in front needed for this one
				newMacro = "{{row01=^{original-abilities-menus}}} {{row02=" + newMacro + "}}";
			}
			if (newMacro!==v[prefix+'orig_ability_header_macro']){
				setter[prefix+'orig_ability_header_macro']=newMacro;
			}
			if (isNPC){
				newMacro =
					(usesClass?otherCommandMacros['class-ability']:"") +
					(usesFeats?otherCommandMacros['feat'].replace(/REPLACENPC/g,''):"") +
					(usesSLAs?otherCommandMacros['npc-spell-like-abilities']:"") +
					(usesTraits?otherCommandMacros['trait']:"") +
					(usesRacialTraits?otherCommandMacros['racial-trait'].replace(/REPLACENPC/g,''):"") +
					(isMythic?otherCommandMacros['mythic']:"") ;
				if (newMacro) {
					//no space in front needed for this one
					newMacro = "{{row01=^{original-abilities-menus}}} {{row02=" + newMacro + "}}";
				}
				if (newMacro!==v.orig_ability_header_macro){
					setter['orig_ability_header_macro']=newMacro;
				}
			}
		} catch(err) {
			TAS.error("PFFeatures.resetTopCommandMacro",err);
		}finally {
			if (_.size(setter)>0){
				SWUtils.setWrapper(setter,PFConst.silentParams,done);
			} else {
				done();
			}
		}
	});
}
/** resets the chat menu macro for all repeating lists in abilities tab
 *@param {function} callback call when done
 */
export function resetCommandMacro (callback){
	var done = _.once(function () {
		//TAS.debug("leaving PFFeatures.resetCommandMacro");
		if (typeof callback === "function") {
			callback();
		}
	});

	getAttrs(["mythic-adventures-show","use_traits","use_racial_traits","use_class_features","use_feats","use_spell-like-abilities"],function(v){
		var featureList = [],
		doneWithOneButton,
		isMythic = 0,
		usesTraits=0,
		usesRacialTraits=0,
		usesFeats=0,
		usesClass=0,
		usesSLAs=0,
		newMacro="",
		numberLists=0,
		setter={};
		try {
			isMythic = parseInt(v["mythic-adventures-show"],10)||0;
			usesFeats = parseInt(v["use_feats"],10)||0;
			usesClass = parseInt(v["use_class_features"],10)||0;
			usesTraits = parseInt(v.use_traits,10)||0;
			usesRacialTraits=parseInt(v.use_racial_traits,10)||0;
			usesSLAs = parseInt(v["use_spell-like-abilities"],10)||0;
			//TAS.debug("at PFFeatures.resetCommandMacro",v);
			if (usesFeats){
				featureList.push('feat');
				numberLists += 2;
			}
			if (usesTraits){
				featureList.push('trait');
				numberLists++;
			}
			if (usesRacialTraits){
				featureList.push('racial-trait');
				numberLists += 2;
			}
			if (isMythic){
				featureList = featureList.concat(['mythic-ability','mythic-feat']);
				numberLists += 2;
			}
			if (usesClass){
				featureList.push('class-ability');
				numberLists++;
			}
			if (usesSLAs){
				featureList.push('npc-spell-like-abilities');
				numberLists++;
			}
			if (numberLists > 0){
				doneWithOneButton = _.after(numberLists,done);
				_.each(featureList,function(section){
					if (section !== 'npc-spell-like-abilities') {
						PFMenus.resetOneCommandMacro(section,false,doneWithOneButton);
					}
					if (section==='racial-trait' || section==='feat'||section === 'npc-spell-like-abilities' ){
						PFMenus.resetOneCommandMacro(section,true,doneWithOneButton);
					}
				});
			} else {
				done();
			}
		} catch (err){
			TAS.error("PFFeatures.resetCommandMacro",err);
			done();
		} finally {
			resetTopCommandMacro();
		}
	});
}
/** recalculateRepeatingMaxUsed - Parses the macro text "...max-calculation" in the repeating items
 * (such as class-abilities, feats, traits, racial-traits)
 * and sets the used|max value.
 * Loops through all rows in the given repeating section.
 * @param {string} section= the name of the section after the word "repeating_"
 * @param {function} callback when done
 * @param {boolean} silently if T then call SWUtils.setWrapper with {silent:true}
 */
function recalculateRepeatingMaxUsed (section, callback, silently) {
	var done = _.once(function () {
		if (typeof callback === "function") {
			callback();
		}
	});
	getAttrs(['is_newsheet'],function(vout){
		//new sheets have nothing
		if(parseInt(vout.is_newsheet,10)){
			done();
			return;
		}
		getSectionIDs("repeating_" + section, function (ids) {
			var totrows = _.size(ids),
			rowdone = _.after(totrows, done);
			if (totrows > 0) {
				//if(section ==='ability'){
				//	TAS.notice("checking max used for ability silent is:"+silently);
				//}
				_.each(ids, function (id, index) {
					var prefix = "repeating_" + section + "_" + id;
					SWUtils.evaluateAndSetNumber(prefix + "_max-calculation", prefix + "_used_max", 0, rowdone, true);
				});
			} else {
				done();
			}
		});
	});
}
export function convertNameToLevel (name){
	var classnum ;
	if ((/\d/).test(name)){
		classnum = parseInt(  name.match(/\d/)[0],10 )||0;
		return '@{class-'+classnum+'-level}';
	} else if ((/race/i).test(name)){
		return '@{level}';
	} else {
		return '';
	}
}
/** Converts the 4 "old" feature lists into array of objects for repeating_ability
 *
 * @param {function([{}])} callback
 * @param {function} errorcallback
 * @param {string} section
 */
export function getAbilities (callback,errorcallback,section){
	var done = _.once(function(param){
		if (typeof callback === "function"){
			callback(param);
		}
	}),
	notDone =_.once(function(){
		if (typeof errorcallback === "function"){
			errorcallback();
		} else {
			done();
		}
	});
	//TAS.debug("at PFFeatures.getAbilities "+section);
	if (!section){notDone();return;}
	getSectionIDs('repeating_'+section,function(ids){
		var fields,isSLA=0;
		try {
			if (section==="npc-spell-like-abilities"){
				isSLA=1;
			}
			if(_.size(ids)){
				fields = SWUtils.cartesianAppend(['repeating_'+section+'_'],ids,migrateMap[section].LU);
				fields = fields.concat(["is_npc","race","class-0-name","class-1-name","class-2-name","class-3-name","class-4-name","class-5-name"]);
				if (section === "npc-spell-like-abilities"){
					fields = fields.concat(["spellclass-0-level-total","spellclass-1-level-total","spellclass-2-level-total",
					"spellclass-0","spellclass-1","spellclass-2","level","npc-hd-num",
					"class-0-level","class-1-level","class-2-level","class-3-level","class-4-level","class-5-level"]);
				}
				getAttrs(fields,function(v){
					var abilities,defaultClass='',isNPC=0,macrotextAttr='macro-text',tempInt;
					try {
						isNPC = parseInt(v.is_npc,10)||0;
						if(migrateMap[section].hasNPCMacro && isNPC){
							macrotextAttr='npc-macro-text';
						}
						defaultClass = migrateMap[section].classDefault||'';
						abilities = _.map(ids,function(id){
							var prefix , obj;
							try {
								prefix = 'repeating_'+section+'_'+id+'_';
								obj= _.reduce(migrateMap[section].copyAttrs,function(m,attr){
									m[attr]=v[prefix+attr]||'';
									return m;
								},{});
								obj['CL-basis'] = defaultClass || convertNameToLevel(v[prefix+'class-number']);
								if (obj['CL-basis']){
									if (obj['CL-basis']==="@{level}"){
										obj["class-name"]=v['race'];
									} else if (v[prefix+'class-number']){
										//TAS.debug("setting class-name to "+ v[prefix+'class-number'] +" value is "+ v[v[prefix+'class-number']]);
										obj["class-name"]=v[PFUtils.findAbilityInString(v[prefix+'class-number'])];
									} else {
										obj["class-name"]="";
									}
								} else {
									obj["class-name"]="";
								}
								if (isSLA){
									obj["abil-sr"]=v[prefix+'sr']||'';
									if(v[prefix+'level']){
										tempInt=parseInt(v[prefix+'level'],10);
										if(!isNaN(tempInt)){
											obj['spell_level-misc']=tempInt;
											obj['spell_level-misc-mod']=tempInt;
											obj['spell_level-basis']='0';
										}
									}
									if(v[prefix+'range']){
										tempInt=parseInt(v[prefix+'range'],10);
										obj['range_pick']='number';
										if(!isNaN(tempInt)){
											obj['range_numeric']=tempInt;
										}
									}
									if(v[prefix+'used']){
										tempInt=parseInt(v[prefix+'used'],10);
										if(!isNaN(tempInt)){
											obj['used_max']=tempInt;
											obj['max-calculation']=tempInt;
										}
									}
								}
								obj['macro-text'] = v[prefix+macrotextAttr]||'';
								obj['rule_category']=migrateMap[section].ruleCategory;

								return obj;
							} catch (errorinner) {
								TAS.error("PFFeatures.getAbilities errorinner on " +id ,errorinner);
							}
						});
					} catch (errmid){
						TAS.error("PFFeatures.getAbilities errmid",errmid);
					} finally {
						if (_.size(abilities)){
							done(abilities);
						} else {
							TAS.warn("PFFeatures.getAbilities none generated for "+ section+" even though there are ids");
							notDone();
						}
					}
				});
			} else {
				done([]);
				return;
			}
		} catch (err) {
			TAS.error("PFFeatures.copyFeatsToAbilities",err);
			notDone();
		}
	});
}
export function copyToAbilities(callback,section,eventInfo){
	var done = _.once(function(param){
		var setter;
		if(eventInfo && (/merge/i).test(eventInfo.sourceAttribute)){
			setter={};
			setter[eventInfo.sourceAttribute]=0;
			SWUtils.setWrapper(setter,PFConst.silentParams);
		}
		if (typeof callback === "function"){
			callback(param);
		}
	}),
	merged = _.once(function(){
		PFAbility.recalculate(function(){
			done();
			PFMenus.resetOneCommandMacro(section,false);
			PFMenus.resetOneCommandMacro(section,true);
		},true,0);
	});
	//TAS.debug("at PFFeatures.copyToAbilities:"+section);
	getAbilities(function(list){
		//TAS.debug("PFFeatures.copyToAbilities returned from get Abilities list is: ",list);
		if(list && _.size(list)>0){
			//TAS.debug("now calling PFAbilitycopytoAbilities");
			PFAbility.copyToAbilities(merged,list);
		} else {
			done();
		}
	},function(){
		TAS.error("PFFeatures ################# error trying to migrate "+section);
		done();
	},section);
}
export function setNewDefaults (callback,section){
	var done = _.once(function(){
		//TAS.debug("leaving PFFeatures.setNewDefaults");
		if(typeof callback === "function"){
			callback();
		}
	}),
	sectionToDefaultRuleCategoryMap={
		'feat':'feats',
		'trait':'traits',
		'racial-trait':'racial-traits',
		'mythic-ability':'mythic-abilities',
		'mythic-feat':'mythic-feats',
		'class-ability':'class-features',
		'npc-spell-like-abilities': 'spell-like-abilities'
	},
	defaultabilitytype,defaultrulecategory,defaultshow;
	defaultshow = (section==='class-abilities'||section==='npc-spell-like-abilities')?'1':'0';
	defaultabilitytype= (section==='npc-spell-like-abilities')?'Sp':'not-applicable';
	defaultrulecategory = sectionToDefaultRuleCategoryMap[section]||'';
	getSectionIDs('repeating_'+section,function(ids){
		var setter={};
		try {
			setter = _.reduce(ids,function(m,id){
				var prefix = 'repeating_'+section+'_'+id+'_';
				try {
					m[prefix+'showinmenu']=defaultshow;
					m[prefix+'ability_type']=defaultabilitytype;
					m[prefix+'rule_category']=defaultrulecategory;
				} catch (errin){
					TAS.error("PFFeatures.setNewDefaults error "+section+" id "+id,errin);
				} finally {
					return m;
				}
			},{});
			setter['migrated_featurelists_defaults']=1;
		} catch (err){
			TAS.error("PFFeatures.setNewDefaults error setting defaults for "+section,err);
		} finally {
			if (_.size(setter)>0){
				SWUtils.setWrapper(setter,PFConst.silentParams,done);
			} else {
				done();
			}
		}
	});
}

export function migrate (callback, oldversion){
	var done = function(){
		//TAS.debug("leaving PFFeatures.migrate");
		if (typeof callback === "function"){
			callback();
		}
	},
	numLists = _.size(featureLists),
	doneOne = _.after(numLists,done);
	//TAS.debug"at PFFeatures.migrate");
	getAttrs(['migrated_featurelists_defaults'],function(vm){
		var featuremigrated=0,abilitymigrated=0;
		featuremigrated=parseInt(vm['migrated_featurelists_defaults'],10)||0;
		//so current beta is not screwed up:
		if (!featuremigrated) {
			_.each(featureLists,function(section){
				setNewDefaults(doneOne,section);
			});
		} else {
			done();
		}
	});
}
export var recalculate = TAS.callback(function PFFeaturesRecalculate(callback, silently, oldversion) {
	var done = _.once(function () {
		TAS.info("leaving PFFeatures.recalculate");
		if (typeof callback === "function") {
			callback();
		}
	}), numLists, doneWithList, calculateMaxUses, callRecalcSLAs;
	try {
		//TAS.debug("at PFFeatures.recalculate");
		numLists = _.size(PFConst.repeatingMaxUseSections);
		doneWithList = _.after(numLists, function(){
			resetCommandMacro(done);
		});
		calculateMaxUses = function(){
			_.each(PFConst.repeatingMaxUseSections, function (section) {
				recalculateRepeatingMaxUsed(section, doneWithList, silently);
			});
		};
		migrate(calculateMaxUses,oldversion);
	} catch (err) {
		TAS.error("PFFeatures.recalculate, ", err);
		done();
	}
});
function registerEventHandlers () {
	var tempstr="";

	on("change:merge_traits_now change:merge_race_traits_now change:merge_feats_now change:merge_class_features_now change:merge_slas_now",
		TAS.callback(function eventMergeOldList(eventInfo){
			TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
			if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api" ) {
				getAttrs([eventInfo.sourceAttribute],function(v){
					if (parseInt(v[eventInfo.sourceAttribute],10)){
						copyToAbilities(null,migrateButtonMap[eventInfo.sourceAttribute],eventInfo);
					}
				});
			}
	}));
	//GENERIC REPEATING LISTS USED MAX
	_.each(PFConst.repeatingMaxUseSections, function (section) {
		var maxEvent = "change:repeating_" + section + ":max-calculation";
		on(maxEvent, TAS.callback(function eventRepeatingMaxUseSections(eventInfo) {
			TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
			SWUtils.evaluateAndSetNumber("repeating_" + section + "_max-calculation", "repeating_" + section + "_used_max");
		}));
	});
	on("change:mythic-adventures-show change:use_traits change:use_racial_traits change:use_class_features change:use_feats change:use_spell-like-abilities", TAS.callback(function eventEnableMythicConfig(eventInfo) {
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api" ) {
			resetTopCommandMacro(null,eventInfo);
		}
	}));
	_.each(featureLists, function (section) {
		var macroEvent = "remove:repeating_"+section+" ",
			singleEvent = "change:repeating_" + section + ":";
		macroEvent = _.reduce(events.commandMacroFields,function(m,a){
			m+= singleEvent + a + " ";
			return m;
		},macroEvent);
		on (macroEvent, TAS.callback(function eventRepeatingOldListsCommandMacroUpdate(eventInfo){
			var attr;
			attr = SWUtils.getAttributeName(eventInfo.sourceAttribute);
			if ( eventInfo.sourceType === "player" || eventInfo.sourceType === "api" || (eventInfo.sourceType === "sheetworker"  && attr==='used_max')) {
				TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
				var show = 'repeating_'+section+'_showinmenu';
				getAttrs([show,'is_npc'],function(v){
					var isNPC=parseInt(v.is_npc,10)||0;
					if (parseInt(v[show],10)===1 || attr==='showinmenu'){
						PFMenus.resetOneCommandMacro(section,isNPC);
					}
				});
			}
		}));
	});
}
registerEventHandlers();
//PFConsole.log('   PFFeatures module loaded       ' );
//PFLog.modulecount++;

