'use strict';
import _ from 'underscore';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFAbilityScores from './PFAbilityScores';
import * as PFSize from './PFSize';
import * as PFSheet from './PFSheet';

function applyTemplate(name){
	if (name==='giant'){
		getAttrs(['npc-type','size','AC-natural','is_undead','npc-cr',
		'STR-base','STR','STR-mod','CON-base','CON','CON-mod','DEX-base','DEX','DEX-mod'],function(v){
			var setter={},tempstr='',tempint=0;
			tempstr = SWUtils.getTranslated('giant');
			setter['npc-type'] = tempstr+' '+v['npc-type'];

			setter = PFAbilityScores.modifyAbility('STR',4,v,setter);
			setter = PFAbilityScores.modifyAbility('DEX',-2,v,setter);
			if(!parseInt(v.is_undead,10)){
				setter = PFAbilityScores.modifyAbility('CON',4,v,setter);
			} else {
				setter = PFAbilityScores.modifyAbility('CHA',4,v,setter);
			}

			tempint = parseInt(v['AC-natural'],10)||0;
			tempint+=3;
			setter['AC-natural']=tempint;

			tempint = parseInt(v['npc-cr'],10)||0;
			tempint++;
			setter['npc-cr']=tempint;

			setter = PFSize.updateSize(1,v,null,setter);
			SWUtils.setWrapper(setter,PFConst.silentParams,PFSheet.recalculate);
		});
	} else 	if (name==='giantremove'){
		getAttrs(['npc-type','size','AC-natural','is_undead','npc-cr',
		'STR-base','STR','STR-mod','CON-base','CON','CON-mod','DEX-base','DEX','DEX-mod'],function(v){
			var setter={},tempstr='',tempint=0;
			tempstr = SWUtils.getTranslated('giant') + ' ';
			if(v['npc-type']){
				setter['npc-type'] = v['npc-type'].replace(tempstr,'');
			}

			setter = PFAbilityScores.modifyAbility('STR',-4,v,setter);
			setter = PFAbilityScores.modifyAbility('DEX',2,v,setter);
			if(!parseInt(v.is_undead,10)){
				setter = PFAbilityScores.modifyAbility('CON',-4,v,setter);
			} else {
				setter = PFAbilityScores.modifyAbility('CHA',-4,v,setter);
			}
			tempint = parseInt(v['AC-natural'],10)||0;
			tempint-=3;
			setter['AC-natural']=tempint;

			tempint = parseInt(v['npc-cr'],10)||0;
			tempint--;
			setter['npc-cr']=tempint;

			setter = PFSize.updateSize(-1,v,null,setter);
			SWUtils.setWrapper(setter,PFConst.silentParams,PFSheet.recalculate);
		});
	} else if (name==='young') {
		getAttrs(['npc-type','size','AC-natural','is_undead','npc-cr',
		'STR-base','STR','STR-mod', 'CON-base','CON','CON-mod','DEX-base','DEX','DEX-mod'],function(v){
			var setter={},tempstr='',tempint=0;
			tempstr = SWUtils.getTranslated('young');
			setter['npc-type'] = tempstr+' '+v['npc-type'];

			setter = PFAbilityScores.modifyAbility('STR',-4,v,setter);
			setter = PFAbilityScores.modifyAbility('DEX',4,v,setter);
			if(!parseInt(v.is_undead,10)){
				setter = PFAbilityScores.modifyAbility('CON',-4,v,setter);
			} else {
				setter = PFAbilityScores.modifyAbility('CHA',-4,v,setter);
			}

			tempint = parseInt(v['AC-natural'],10)||0;
			tempint = Math.max(0, (tempint-2));
			setter['AC-natural']=tempint;
			tempint = parseInt(v['npc-cr'],10)||0;
			tempint--;
			if(tempint<=0){
				tempint='.5';
			}
			setter['npc-cr']=tempint;

			setter = PFSize.updateSize(-1,v,null,setter);
			SWUtils.setWrapper(setter,PFConst.silentParams,PFSheet.recalculate);
		});
	} else if (name==='youngremove') {
		getAttrs(['npc-type','size','AC-natural','is_undead','npc-cr',
		'STR-base','STR','STR-mod', 'CON-base','CON','CON-mod','DEX-base','DEX','DEX-mod'],function(v){
			var setter={},tempstr='',tempint=0;
			tempstr = SWUtils.getTranslated('young')+' ';
			if (v['npc-type']){
				setter['npc-type'] = v['npc-type'].replace(tempstr,'');
			}
			setter = PFAbilityScores.modifyAbility('STR',4,v,setter);
			setter = PFAbilityScores.modifyAbility('DEX',-4,v,setter);
			if(!parseInt(v.is_undead,10)){
				setter = PFAbilityScores.modifyAbility('CON',4,v,setter);
			} else {
				setter = PFAbilityScores.modifyAbility('CHA',4,v,setter);
			}

			tempint = parseInt(v['AC-natural'],10)||0;
			tempint += 2;
			setter['AC-natural']=tempint;
			tempint = parseInt(v['npc-cr'],10)||0;
			tempint++;
			setter['npc-cr']=tempint;
			setter = PFSize.updateSize(1,v,null,setter);
			SWUtils.setWrapper(setter,PFConst.silentParams,PFSheet.recalculate);
		});
	} else if (name==='advanced'){
		getAttrs(['npc-type','size','is_undead','AC-natural','npc-cr',
		'STR-base','STR','STR-mod',	'CON-base','CON','CON-mod','DEX-base','DEX','DEX-mod',
		'INT-base','INT','INT-mod',	'WIS-base','WIS','WIS-mod','CHA-base','CHA','CHA-mod'],function(v){
			var setter={},tempstr='',tempint=0;
			tempstr = SWUtils.getTranslated('advanced');
			setter['npc-type'] = tempstr+' '+v['npc-type'];

			setter = PFAbilityScores.modifyAbility('STR',4,v,setter);
			if(!parseInt(v.is_undead,10)){
				setter = PFAbilityScores.modifyAbility('CON',4,v,setter);
			}
			setter = PFAbilityScores.modifyAbility('DEX',4,v,setter);
			if(parseInt(v['INT-base'])>2){
				setter = PFAbilityScores.modifyAbility('INT',4,v,setter);
			}
			setter = PFAbilityScores.modifyAbility('WIS',4,v,setter);
			setter = PFAbilityScores.modifyAbility('CHA',4,v,setter);

			tempint = parseInt(v['AC-natural'],10)||0;
			tempint+=2;
			setter['AC-natural']=tempint;
			tempint = parseInt(v['npc-cr'],10)||0;
			tempint++;
			setter['npc-cr']=tempint;

			SWUtils.setWrapper(setter,PFConst.silentParams,PFSheet.recalculate);
		});
	} else if (name==='degenerate'){
		getAttrs(['npc-type','size','is_undead','AC-natural','npc-cr',
		'STR-base','STR','STR-mod',	'CON-base','CON','CON-mod','DEX-base','DEX','DEX-mod',
		'INT-base','INT','INT-mod',	'WIS-base','WIS','WIS-mod','CHA-base','CHA','CHA-mod'],function(v){
			var setter={},tempstr='',tempint=0;
			tempstr = SWUtils.getTranslated('degenerate');
			setter['npc-type'] = tempstr+' '+v['npc-type'];
			setter = PFAbilityScores.modifyAbility('STR',-4,v,setter);
			if(!parseInt(v.is_undead,10)){
				setter = PFAbilityScores.modifyAbility('CON',-4,v,setter);
			}
			setter = PFAbilityScores.modifyAbility('DEX',-4,v,setter);
			setter = PFAbilityScores.modifyAbility('INT',-4,v,setter);
			setter = PFAbilityScores.modifyAbility('WIS',-4,v,setter);
			setter = PFAbilityScores.modifyAbility('CHA',-4,v,setter);
			tempint = parseInt(v['AC-natural'],10)||0;
			tempint-=2;
			setter['AC-natural']=tempint;
			tempint = parseInt(v['npc-cr'],10)||0;
			tempint--;
			if(tempint<=0){
				tempint='.5';
			}
			setter['npc-cr']=tempint;
			SWUtils.setWrapper(setter,PFConst.silentParams,PFSheet.recalculate);
		});
	} else if (name==='celestial'||name==='fiendish'||name==='entropic'||name==='resolute' ){
		getAttrs(['npc-type','npc-cr','npc-hd','DR','SR-macro-text','SR','resistances','vision','CHA-mod'],function(v){
			var setter={},tempstr='',samestr='',opstr='',tempcr=0,temphd=0,tempint=0,newId='',prefix='';

			tempstr = SWUtils.getTranslated(name);
			setter['npc-type'] = tempstr+' '+v['npc-type'];

			temphd=parseInt(v['npc-hd'],10)||0;
			if(!(/darkvision/i).test(v.vision)){
				tempstr = SWUtils.getTranslated('darkvision');
				tempstr = tempstr+' 60' + getTranslationByKey('feet-abbrv');
				if(v.vision){
					tempstr = tempstr + ' ' + v.vision;
				}
				setter.vision=tempstr;
			}

			if(name==='celestial'){
				opstr='Evil';
				samestr='good';
				tempstr='Resist Cold, Acid, Electricity ';
			} else if (name==='fiendish'){
				opstr='Good';
				samestr='evil';
				tempstr='Resist Cold and Fire ';
			} else if (name==='entropic'){
				opstr='Lawful';
				samestr='chaos';
				tempstr='Resist Acid and Fire ';
			} else if (name==='resolute'){
				opstr='chaotic';
				samestr='law';
				tempstr='Resist Acid, Cold, and Fire ';
			}

			if(temphd<5){
				tempstr+=' 5;';
			} else if (temphd >=5 && temphd <=10){
				tempstr+=' 10;';
			} else {
				tempstr+=' 15;';
			}
			setter.resistances= tempstr + (v.resistances||'');

			tempstr='';
			if(temphd >=5 && temphd <=10){
				tempstr='5/'+opstr+';';
			} else if (temphd > 10){
				tempstr='10/'+opstr+';';
			}
			if(tempstr){
				setter.DR = tempstr+(v.DR||'');
			}
			tempcr = parseInt(v['npc-cr'],10)||0;
			if(temphd>=5){
				tempcr++;
				setter['npc-cr']=tempint;
			}
			tempint = parseInt(v.SR,10)||0;
			if(tempint < (tempcr+5)){
				tempstr=(v['SR-macro-text']||'')+'+5';
				setter['SR-macro-text']= '@{npc-cr}+5';
				setter.SR= (tempcr+5);
			}
			newId=generateRowID();
			prefix='repeating_ability_'+newId+'_';
			setter[prefix+'name']='Smite '+opstr;
			setter[prefix + "ability_type"] = 'Su';
			setter[prefix + "rule_category"] = 'monster-rule';
			setter[prefix + 'showinmenu'] = '1';
			setter[prefix + 'description']='smite '+opstr+' 1/day as a swift action (adds Cha bonus to attack rolls and damage bonus equal to HD against '+opstr+' foes; smite persists until target is dead or the celestial creature rests).';
			setter[prefix + 'short-description']='Enable in buff list against 1 evil creature';
			setter[prefix + 'frequency']='perday';
			setter[prefix + 'max-calculation']='1';
			setter[prefix + 'used_max']=1;

			newId=generateRowID();
			prefix='repeating_buff2_'+newId+'_';
			setter[prefix+'name']='Smite '+opstr+' (Su) 1/day';
			setter[prefix+'b1_bonus']='attack';
			setter[prefix+'b1_bonustype']='untyped';
			setter[prefix+'b1_macro-text']='@{CHA-mod}';
			setter[prefix+'b1_val']=parseInt(v['CHA-mod'],10);
			setter[prefix+'b2_bonus']='attack';
			setter[prefix+'b2_bonustype']='untyped';
			setter[prefix+'b2_macro-text']='@{npc-hd}';
			setter[prefix+'b2_val']=parseInt(v['npc-hd'],10);
			setter[prefix+'notes'] = 'vs one '+opstr+' creature';

			SWUtils.setWrapper(setter,PFConst.silentParams,PFSheet.recalculate);
		});
	}
	//reset dropdown
	SWUtils.setWrapper({'template_to_add':'','add_template':0},PFConst.silentParams);
}

function registerEventHandlers () {
	on("change:add_template",TAS.callback(function eventAddTemplate(eventInfo){
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
		if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
			getAttrs(['template_to_add','add_template'],function(v){
				if(parseInt(v.add_template,10)){
					applyTemplate(v.template_to_add);
				}
			});
		}
    }));
}

registerEventHandlers();