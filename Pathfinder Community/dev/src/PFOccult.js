'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFAttacks from './PFAttacks';
import * as PFAttackGrid from './PFAttackGrid';
import * as PFAttackOptions from './PFAttackOptions';


function updateDC (callback,dummy,eventInfo){
    getAttrs(['kineticist_level-mod','kineticist_ability-mod','kineticblast_dc'],function(v){
        var setter={},currVal=0,newVal=0;
        currVal=parseInt(v.kineticblast_dc,10)||0;
        newVal = 10 + (parseInt(v['kineticist_ability-mod'],10)||0)+ Math.floor((parseInt(v['kineticist_level-mod'],10)||0)/2);
        if(currVal!==newVal){
            setter.kineticblast_dc=newVal;
            SWUtils.setWrapper(setter,PFConst.silentParams,callback);
        } else if (typeof callback === "function"){
            callback();
        }
    });
}

function createAttackMacros(eventInfo){
    getAttrs(['kineticblast_attack_type','kineticblast_type','kineticblast_damage_type','use_devastating_infusion'],function(v){
        var attackstr='',damagestr='',levels='',devastating=0,composite=0,dice='6',setter={};
        devastating=parseInt(v.use_devastating_infusion,10)||0;
        if(v.kineticblast_type==='composite'){
            composite=1;
        }
        if(devastating && (v.kineticblast_attack_type==='ranged' || v.kineticblast_damage_type==='energy')){
           damagestr='INVALID';
           attackstr='INVALID';
        } else {
            attackstr='@{kineticblast_attack-mod}+@{buff_kineticblast-total}';
            if(devastating){
                dice='8';
                levels='@{kineticist_level-mod}';
            } else {
                levels='floor((@{kineticist_level-mod}+1)/2)';
            }
            if(composite){
                levels = '2*'+levels+'';
            }
            damagestr='[[ '+levels+' ]]d'+dice;
            if(devastating){
                damagestr = damagestr + '+ @{kineticist_ability-mod}';
            } else if(v.kineticblast_damage_type==='physical'){
                damagestr = damagestr+'+ [[ '+levels+' ]] + @{kineticist_ability-mod}';
            } else {
                damagestr = damagestr+'+ [[ floor(@{kineticist_ability-mod}/2) ]]';
            }
            damagestr = damagestr + '+@{kineticblast_dmg-mod}';
            if(v.kineticblast_attack_type==='ranged'){
                damagestr = damagestr + '+@{buff_dmg_kineticblast-total}';
            }
        }
        setter.kineticblast_tempattack=attackstr;
        setter.kineticblast_tempdmg='[[ '+damagestr+' ]]';
        setter.create_kineticblast_macro=0;
        SWUtils.setWrapper(setter,PFConst.silentParams);
    });
}


function createAttack (eventInfo){
    getAttrs(['adv_macro_show','create_kineticblast_attack','kineticblast_attack_type','kineticblast_type', 'kineticblast_damage_type','kineticblast_tempattack','kineticblast_tempdmg'],function(v){
        var weaponPrefix='',id='',attackType='',setter={},name='',damage='',dmgname='',kblastattack=0;
        if(parseInt(v.create_kineticblast_attack,10)){
            try {
                id = generateRowID();
                weaponPrefix = 'repeating_weapon_'+id+'_';
                name=v.kineticblast_type+'-'+v.kineticblast_damage_type+'-';
                name+= v.kineticblast_attack_type==='ranged'?'blast':'blade';
                name = SWUtils.getTranslated(name);
                name = name.replace('-',' '); //just in case
                setter[weaponPrefix + "name"] = name;
                if(v.kineticblast_damage_type==='physical'){
                    setter[weaponPrefix + "vs"] = "AC";
                    dmgname = SWUtils.getTranslated('physical');
                } else {
                    setter[weaponPrefix + "vs"] = "touch";
                    dmgname = SWUtils.getTranslated('energy');
                }
                if(parseInt(v.adv_macro_show)){
                    setter[weaponPrefix + "attack_macro_insert"]=v.kineticblast_tempattack;
                } else {
                    setter[weaponPrefix + "attack"]=v.kineticblast_tempattack;
                }
                if(v.kineticblast_attack_type==='ranged'){
                    setter[weaponPrefix + "attack-type"] = 'attk-ranged';
                    setter[weaponPrefix + "range"] = "@{kineticblast_range}";
                    setter[weaponPrefix + "isranged"] = 1;
                } else {
                    setter[weaponPrefix + "attack-type"] = 'attk-melee';
                }
                setter[weaponPrefix + "precision_dmg_macro"] = v.kineticblast_tempdmg;
                setter[weaponPrefix + "precision_dmg_type"] = dmgname;
                setter[weaponPrefix + "critical_dmg_macro"] = v.kineticblast_tempdmg;
                setter[weaponPrefix + "critical_dmg_type"] = dmgname;
                setter[weaponPrefix + "notes"] = "DC [[@{kineticblast_dc}]] (if applicable)";
                setter[weaponPrefix + "default_damage-dice-num"] = 0;
                setter[weaponPrefix + "default_damage-die"] = 0;
                setter[weaponPrefix + "damage-dice-num"] = 0;
                setter[weaponPrefix + "damage-die"] = 0;
                setter[weaponPrefix + "size_affects"] = 0;
                setter[weaponPrefix + "damage-ability"] = "0";
                //TAS.debug("PFOccult.createAttack",setter);
            } catch (err) {
                TAS.error("PFAttacks.createAttack err creating "+v.kineticblast_attack_type,err);
            } finally {
                if(_.size(setter)){
                    setter.create_kineticblast_attack=0;
                    SWUtils.setWrapper(setter,PFConst.silentParams,function(){
                        //TAS.debug("################ created attack "+id);
                        PFAttacks.recalcRepeatingWeapon(id,function(){
                            PFAttackGrid.resetCommandMacro();
                            PFAttackOptions.resetOption(id);
                        });
                    });
                } else {
                    SWUtils.setWrapper({'create_kineticblast_attack':0},PFConst.silentParams);
                }
            }
        }
    });
}

export function updateNLDamageFromBurn (eventInfo){
    getAttrs(['non-lethal-damage','kineticistburn','oldkineticistburn','level'],function(v){
        var nld=0,oldburn=0,newburn=0,diff=0,level=0,newdmg=0,newnld=0,setter={};
        try{
            oldburn=parseInt(v['oldkineticistburn'],10)||0;
            newburn=parseInt(v['kineticistburn'],10)||0;
            if(oldburn!==newburn){
                setter.oldkineticistburn=newburn;
                nld=parseInt(v['non-lethal-damage'],10)||0;
                diff = (newburn-oldburn)||0;
                level = parseInt(v.level,10)||0;
                newdmg=diff*level;
                TAS.debug("PFOccult.change:kineticistburn level:"+ level+", newdmg:"+newdmg+", curr nld:"+nld,v);
                newnld = nld + newdmg;
                if (newnld<0){
                    newnld=0;
                }
                setter['non-lethal-damage']=newnld;
            }
        } catch (err){
            TAS.error("PFOccult.change:kineticistburn kineticburn",err);
        } finally {
            if (_.size(setter)){
            //  SWUtils.setWrapper(setter,PFConst.silentParams);
            // when including the PFConst.silentParams option ie silent:true, buffs do not detect linked tokenbar updates
                SWUtils.setWrapper(setter);
            }
        }
    });
}

export var recalculate = TAS.callback(function PFOccultRecalculate(callback,dummy,oldversion){
    getAttrs(['use_burn'],function(vout){
        if(parseInt(vout.use_burn,10)){
            updateDC();
        }
        if (typeof callback === "function"){
            TAS.info("leaving PFOccult.recalculate");
            callback();
        }
    });
});

on("change:create_kineticblast_macro",TAS.callback(function eventCreateKineticMacros(eventInfo){
    if(eventInfo.sourceType==="player"||eventInfo.sourceType==="api"){
        TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
        getAttrs(['create_kineticblast_macro'],function(v){
            if(parseInt(v.create_kineticblast_macro,10)){
                createAttackMacros(eventInfo);
            }
        });
    }
}));

on("change:kineticist_level-mod change:kineticist_ability-mod",TAS.callback(function eventKineticistDC(eventInfo){
    if(eventInfo.sourceType==="sheetworker"||eventInfo.sourceType==="api"){
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
        updateDC(null,null,eventInfo);
    }
}));

on("change:use_burn",TAS.callback(function eventUseBurn(eventInfo){
    if(eventInfo.sourceType==="player"||eventInfo.sourceType==="api"){
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
        recalculate();
    }
}));

on("change:create_kineticblast_attack",TAS.callback(function eventCreateKineticAttack(eventInfo){
    if(eventInfo.sourceType==="player"||eventInfo.sourceType==="api"){
		TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
        createAttack(eventInfo);
    }
}));

on("change:kineticistburn", TAS.callback(function eventUpdateBurn(eventInfo) {
    if(eventInfo.sourceType==="player" || eventInfo.sourceType==="api"){
        TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
        updateNLDamageFromBurn(eventInfo);
    }
}));