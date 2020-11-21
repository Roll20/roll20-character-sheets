const buttonlist = ["character","inventory","combat","magic","skills","languages","biographical","documentation"];
buttonlist.forEach(button => {
    on(`clicked:${button}`, function() {
        setAttrs({
            sheetTab: button
        });
    });
});

on('change:equippedammo change:equippedrangedwep change:equippedmeleewep change:shield change:attack change:defence change:magicammobonus change:magicrangedweaponbonus change:magicmeleeweaponbonus change:armourattackpenalty change:armourdefencepenalty change:magicshield change:miscattackmelee change:miscdefencemelee change:miscattackranged change:miscdefenceranged sheet:opened', function() {
    getAttrs(['shield','attack','defence','magicammobonus','magicrangedweaponbonus','magicmeleeweaponbonus','armourattackpenalty','armourdefencepenalty','magicshield','miscattackmelee','miscdefencemelee','miscattackranged','miscdefenceranged'], function(v) {
        let atk = parseInt(v.attack)||0;
        let def = parseInt(v.defence)||0;
        let ammo = parseInt(v.magicammobonus)||0;
        let ranged = parseInt(v.magicrangedweaponbonus)||0;
        let melee = parseInt(v.magicmeleeweaponbonus)||0;
        let armouratk = parseInt(v.armourattackpenalty)||0;
        let armourdef = parseInt(v.armourdefencepenalty)||0;
        let shieldequipped = parseInt(v.shield)||0;
        if (shieldequipped === 1) {
            let shield = parseInt(v.magicshield)||0;}
        else {
            shield = 0;
        }
        let miscmeleea = parseInt(v.miscattackmelee)||0;
        let miscmeleed = parseInt(v.miscdefencemelee)||0;
        let miscrangeda = parseInt(v.miscattackranged)||0;
        let miscrangedd = parseInt(v.miscdefenceranged)||0;
        let basemeleeatk = (atk + melee - armouratk + miscmeleea);
        let basemeleedef = (def + melee - armourdef + shield + miscmeleed);
        let baserangedatk = (atk + ranged + ammo - armouratk + miscrangeda);
        let baserangeddef= (def - armourdef + shield + miscrangedd + shield);
        setAttrs({
            baserangedattack: baserangedatk,
            baserangeddefence: baserangeddef,
            basemeleeattack: basemeleeatk,
            basemeleedefence: basemeleedef
        });
    });
});	

on('change:berserktoranged change:attack change:basemeleeattack change:basemeleedefence change:baserangedattack change:baserangeddefence change:defence change:rattackmodded change:rdefencemodded change:mattackmodded change:mdefencemodded change:berserkneg change:preciseneg change:stillnessneg change:bloodrageselect change:nonprofselect change:deathvowselect sheet:opened', function() {
    getAttrs(['berserktoranged','finalattack','finaldefence','basemeleedefence','basemeleeattack','baserangedattack','baserangeddefence','mdefencemodded','rattackmodded','rdefencemodded','mattackmodded','berserkneg','berserkpos','preciseneg','precisepos','stillnessneg','bloodrageselect','nonprofselect','deathvowselect'], function(v) {
        let bloodrage = parseInt(v.bloodrageselect) || 0;
        let berserkappliestoranged = parseInt(v.berserktoranged)||0;
        
        if (bloodrage === 1) {
            bloodragemod = parseInt(v.basemeleedefence) || 0;
            berserkattack = 0;
            berserkdefence = 0;
            mattackmod = parseInt(v.basemeleeattack)||0;
            mdefencemod= parseInt(v.basemeleedefence)||0;
            rattackmod = parseInt(v.baserangedattack)||0;
            rdefencemod = parseInt(v.baserangeddefence)||0;
        }
        else {
            bloodragemod = 0;
            berserkattack = parseInt(v.berserkpos) || 0;
            berserkdefence = parseInt(v.berserkneg) || 0;
            rattackmod = parseInt(v.rattackmodded) || 0;
            rdefencemod = parseInt(v.rdefencemodded) || 0;
            mattackmod = parseInt(v.mattackmodded)||0;
            mdefencemod = parseInt(v.mdefencemodded)||0;
            nonprofmod = parseInt(v.nonprofselect) || 0;
            deathvowmod = parseInt(v.deathvowselect) || 0;
            preciseattack = parseInt(v.precisepos) || 0;
            precisedefence = parseInt(v.preciseneg) || 0;
            stillnessdefence = parseInt(v.stillnessneg) || 0;
            ;}
        
        let fmatk = (mattackmod + berserkattack - nonprofmod + deathvowmod + bloodragemod);
        let fmdef = (mdefencemod - berserkdefence - precisedefence - stillnessdefence - bloodragemod);
        
        if (berserkappliestoranged === 1) {
            fratk = (rattackmod + berserkattack - nonprofmod + deathvowmod + preciseattack)||0;
            frdef = (rdefencemod - berserkdefence - precisedefence - stillnessdefence)||0;
            }
        else {
            fratk = (rattackmod - nonprofmod + deathvowmod + preciseattack)||0;
            frdef = (rdefencemod - berserkdefence - precisedefence - stillnessdefence)||0;
            }
        
        setAttrs({                            
            finalmeleeattack: parseInt(fmatk)||0,
            finalmeleedefence: parseInt(fmdef)||0,
            finalrangedattack: parseInt(fratk)||0,
            finalrangeddefence: parseInt(frdef)||0

            });
    });
    });	

    on('change:repeating_meleeweapons:equippedmeleewep', function(event) {
        if (event.sourceType === 'sheetworker' ) return;
        const playerclickedid = (event.sourceAttribute.split('_')[2] || '').toLowerCase(); 
        getSectionIDs('repeating_meleeweapons', function (ids) {
            const fieldnames = [];
            ids.forEach(id => fieldnames.push(
                `repeating_meleeweapons_${id}_equippedmeleewep`,
                `repeating_meleeweapons_${id}_magicmeleeweaponbonus`,
                `repeating_meleeweapons_${id}_meleeweapon`,
                `repeating_meleeweapons_${id}_meleeabr`,
                `repeating_meleeweapons_${id}_meleedamage`
    
            ));
            getAttrs(fieldnames, values => {
                const output = {};
                ids.forEach(id => {
                    const checkbox = parseInt(values[`repeating_meleeweapons_${id}_equippedmeleewep`]) || 0;
                    const magicbonus = parseInt(values[`repeating_meleeweapons_${id}_magicmeleeweaponbonus`]) || 0;
                    const meleeweaponname = (values[`repeating_meleeweapons_${id}_meleeweapon`]) || None;
                    const meleeweaponabr = (values[`repeating_meleeweapons_${id}_meleeabr`]) || None;
                    const meleeweapondam = (values[`repeating_meleeweapons_${id}_meleedamage`]) || None;
    
                    if(id.toLowerCase() === playerclickedid) {
                        output.magicmeleeweaponbonus = checkbox ? magicbonus : 0;
                        output.meleeweapon = checkbox ? meleeweaponname : "None";
                        output.meleeabr = checkbox ? meleeweaponabr : "0d0";
                        output.meleedamage = checkbox ? meleeweapondam : "0d0";
    
                    } else if(checkbox) {
                        output[`repeating_meleeweapons_${id}_equippedmeleewep`] = 0;
                    }
                    setAttrs(output);
                });
            });
        });
    });

    on('change:repeating_rangedweapons:equippedrangedwep', function(event) {
        if (event.sourceType === 'sheetworker' ) return;
        const playerclickedid = (event.sourceAttribute.split('_')[2] || '').toLowerCase(); 
        getSectionIDs('repeating_rangedweapons', function (ids) {
            const fieldnames = [];
            ids.forEach(id => fieldnames.push(
                `repeating_rangedweapons_${id}_equippedrangedwep`,
                `repeating_rangedweapons_${id}_magicrangedweaponbonus`,
                `repeating_rangedweapons_${id}_rangedweapon`,
                `repeating_rangedweapons_${id}_rangedabr`,
                `repeating_rangedweapons_${id}_rangeddamage`,
                `repeating_rangedweapons_${id}_weaponshortrange`,
                `repeating_rangedweapons_${id}_weaponmediumrange`,
                `repeating_rangedweapons_${id}_weaponlongrange`

            ));
            getAttrs(fieldnames, values => {
                const output = {};
                ids.forEach(id => {
                    const checkbox = parseInt(values[`repeating_rangedweapons_${id}_equippedrangedwep`]) || 0;
                    const magicbonus = parseInt(values[`repeating_rangedweapons_${id}_magicrangedweaponbonus`]) || 0;
                    const rangedweaponname = (values[`repeating_rangedweapons_${id}_rangedweapon`]) || None;
                    const rangedweaponabr = (values[`repeating_rangedweapons_${id}_rangedabr`]) || None;
                    const rangedweapondam = (values[`repeating_rangedweapons_${id}_rangeddamage`]) || None;
                    const shortrange = (values[`repeating_rangedweapons_${id}_weaponshortrange`]) || None;
                    const mediumrange = (values[`repeating_rangedweapons_${id}_weaponmediumrange`]) || None;
                    const longrange = (values[`repeating_rangedweapons_${id}_weaponlongrange`]) || None;

                    if(id.toLowerCase() === playerclickedid) {
                        output.magicrangedweaponbonus = checkbox ? magicbonus : 0;
                        output.rangedweapon = checkbox ? rangedweaponname : "None";
                        output.rangedabr = checkbox ? rangedweaponabr : "0d0";
                        output.rangeddamage = checkbox ? rangedweapondam : "0d0";
                        output.weaponshortrange = checkbox ? shortrange : 0;
                        output.weaponmediumrange = checkbox ? mediumrange : 0;
                        output.weaponlongrange = checkbox ? longrange : 0;

                    } else if(checkbox) {
                        output[`repeating_rangedweapons_${id}_equippedrangedwep`] = 0;
                    }
                    setAttrs(output);
                });
            });
        });
    });
    
    on('change:repeating_ammo:equippedammo', function(event) {
        if (event.sourceType === 'sheetworker' ) return;
        const playerclickedid = (event.sourceAttribute.split('_')[2] || '').toLowerCase(); 
        getSectionIDs('repeating_ammo', function (ids) {
            const fieldnames = [];
            ids.forEach(id => fieldnames.push(
                `repeating_ammo_${id}_equippedammo`,
                `repeating_ammo_${id}_magicammobonus`,
                `repeating_ammo_${id}_ammotype`

            ));
            getAttrs(fieldnames, values => {
                const output = {};
                ids.forEach(id => {
                    const checkbox = parseInt(values[`repeating_ammo_${id}_equippedammo`]) || 0;
                    const magicbonus = parseInt(values[`repeating_ammo_${id}_magicammobonus`]) || 0;
                    const ammo = (values[`repeating_ammo_${id}_ammotype`]) || 0;
    
                    if(id.toLowerCase() === playerclickedid) {
                        output.magicammobonus = checkbox ? magicbonus : 0;
                        output.ammotype = checkbox ? ammo : "None";
    
                    } else if(checkbox) {
                        output[`repeating_ammo_${id}_equippedammo`] = 0;
                    }
                    setAttrs(output);
                });
            });
        });
    });
            
    on('change:strength', function() {  
        getAttrs(['strength','meleedmgbonus','meleeabrbonus'], function(value) {

            let str = parseInt(value.strength)||0;

            if (str < 5) {
                output.maxenc = 6;
                output.meleeabrbonus = 0 || 0;
                output.meleedmgbonus = 0 || 0;
                } 
                else if (str < 8) {
                    output.maxenc = 8;
                    output.meleeabrbonus = 0 || 0;
                    output.meleedmgbonus = 0 || 0;

                } 
                else if (str < 12) {
                    output.maxenc = 10;
                    output.meleeabrbonus = 0 || 0;
                    output.meleedmgbonus = 0 || 0;

                } 
                else if (str < 15) {
                    output.maxenc = 12;
                    output.meleeabrbonus = 0 || 0;
                    output.meleedmgbonus = 0 || 0;

                } 
                else if (str < 18) {
                    output.maxenc = 14;
                    output.meleeabrbonus = 1 || 0;
                    output.meleedmgbonus = 1 || 0;

                }
                else {
                    output.maxenc = 14;
                    output.meleeabrbonus = 1 || 0;
                    output.meleedmgbonus = 1 || 0;

                }
                setAttrs(output);
            });
        });
        

on('change:rank sheet:opened', function() {  
    getAttrs(['pfc','rank','espchance','premonitionchance'], function(value) {
        let rank = parseInt(value.rank)||0;
        let psycfatcheck = rank + 13;
        let esp = 5 + rank * 3;
        let prem = 35 + rank * 2;
        setAttrs({                            
            pfc: psycfatcheck,
            espchance: esp,
            premonitionchance: prem 
            });
        });
    });
              
    on('change:strength change:weaponskillselect change:shield change:expertparryselect change:guardcountered change:guardcurrent change:attack change:defence change:basemeleeattack change:basemeleedefence change:baserangedattack change:baserangeddefence change:evasion sheet:opened', function() {
        getAttrs(['weaponskillselect','strength','rangedabrbonus','rangeddmgbonus','meleedmgbonus','meleeabrbonus','shield','expertparryselect','shieldsuccessvalue','shielddievalue','guardcountered','basemeleeattack','basemeleedefence','baserangedattack','baserangeddefence','evasion','guardcurrent'], function(value) {
            
            const forms = {
                Hawk: {mattackmodded: 1, mdefencemodded: -2, rattackmodded: 1, rdefencemodded: -2, evasionmodded: 0, meleeabrbonus: 0, meleedmgbonus: 0, rangedabrbonus: 0, rangeddmgbonus: 0, othermodifications: "If wielding a two-handed weapon: -1 Evasion and +1 Armour Penetration"},
                Snake: {mattackmodded: 1, mdefencemodded: -3, rattackmodded: 1, rdefencemodded: -3, evasionmodded: 0, meleeabrbonus: 0, meleedmgbonus: 0, rangedabrbonus: 0, rangeddmgbonus: 0, othermodifications: "Critical Hits do +1 HP damage"},
                Wolf: {mattackmodded: 2, mdefencemodded: -3, rattackmodded: 2, rdefencemodded: -3, evasionmodded: -1, meleeabrbonus: 0, meleedmgbonus: 0, rangedabrbonus: 0, rangeddmgbonus: 0, othermodifications: "None"},
                Bear: {mattackmodded: -2, mdefencemodded: 1, rattackmodded: -2, rdefencemodded: 1, evasionmodded: 0, meleeabrbonus: 0, meleedmgbonus: 0, rangedabrbonus: 0, rangeddmgbonus: 0, othermodifications: "+1 additional Defence for each opponent beyond the first (enter in the Miscelaneous Modifiers Section manually)"},
                Cat: {mattackmodded: -2, mdefencemodded: 1, rattackmodded: -2, rdefencemodded: 1, evasionmodded: 1, meleeabrbonus: 0, meleedmgbonus: 0, rangedabrbonus: 0, rangeddmgbonus: 0, othermodifications: "If using a shield: an additional -1 Attack and Shields block on a roll of 1 on 1d4"},
                Crab: {mattackmodded: -2, mdefencemodded: 2, rattackmodded: -2, rdefencemodded: 2, evasionmodded: 0, meleeabrbonus: 0, meleedmgbonus: 0, rangedabrbonus: 0, rangeddmgbonus: 0, othermodifications: "None"},
                Neutral: {mattackmodded: 0, mdefencemodded: 0, rattackmodded: 0, rdefencemodded: 0, evasionmodded: 0, meleeabrbonus: 0, meleedmgbonus: 0, rangedabrbonus: 0, rangeddmgbonus: 0, othermodifications: "None"},
                Defensive: {mattackmodded: -2, mdefencemodded: 1, rattackmodded: -2, rdefencemodded: 1, evasionmodded: 1, meleeabrbonus: -1, meleedmgbonus: -1, rangedabrbonus: -1, rangeddmgbonus: -1, othermodifications: "-1 Damage and -1 Armour Penetration"},
                Offensive: {mattackmodded: 1, mdefencemodded: -2, rattackmodded: 1, rdefencemodded: -2, evasionmodded: -1, meleeabrbonus: 0, meleedmgbonus: 0, rangedabrbonus: 0, rangeddmgbonus: 0, othermodifications: "None"}
                
            };

            let guac = parseInt(value.guardcountered)||0;
            let gua = value.guardcurrent || 'Neutral';
            const output = forms[gua] || forms.Neutral;

            let shieldeq = parseInt(value.shield)||0;
            let shielddie = (value.shielddievalue)||'1d6';
            let shieldsuccess = parseInt(value.shieldsuccessvalue)||1;

            let expertparry = parseInt(value.expertparryselect)||0;
            let weaponskill = parseInt(value.weaponskillselect)||0;
            let str = parseInt(value.strength)||0;

            if (gua === "Cat") {
                shielddie = '1d4';
                shieldsuccess = 1;
            }
            else if (expertparry === 1) {
                shielddie = '1d10';
                shieldsuccess = 2;
            }
            else {
                shielddie = '1d6';
                shieldsuccess = 1;
            }
        
            if (guac === 1 && gua !== "Neutral") {
                if (gua === "Hawk" || gua === "Snake" || gua === "Wolf") {
                    output.mattackmodded += (parseInt(value.basemeleeattack)-2) || 0;
                    output.mdefencemodded += parseInt(value.basemeleedefence) || 0;
                    output.rattackmodded += (parseInt(value.baserangedattack)-2) || 0;
                    output.rdefencemodded += parseInt(value.baserangeddefence) || 0;
                    }
                    else if (gua === "cat" && shieldeq === 1) {
                    output.mattackmodded += (parseInt(value.basemeleeattack)-1) || 0;
                    output.mdefencemodded += (parseInt(value.basemeleedefence)-2) || 0;
                    output.rattackmodded += parseInt(value.baserangedattack)-1 || 0;
                    output.rdefencemodded += (parseInt(value.baserangeddefence)-2) || 0;
                    }
                    else {
                    output.mattackmodded += parseInt(value.basemeleeattack) || 0;
                    output.mdefencemodded += (parseInt(value.basemeleedefence)-2) || 0;
                    output.rattackmodded += parseInt(value.baserangedattack) || 0;
                    output.rdefencemodded += (parseInt(value.baserangeddefence)-2) || 0;
                    }   	    
                }     
            else if (gua === "Cat" && shieldeq === 1) {
                output.mattackmodded += (parseInt(value.basemeleeattack)-1) || 0;
                output.mdefencemodded += parseInt(value.basemeleedefence) || 0;
                output.rattackmodded += (parseInt(value.baserangedattack)-1) || 0;
                output.rdefencemodded += parseInt(value.baserangeddefence) || 0;    
                }
            else {
                output.mattackmodded += parseInt(value.basemeleeattack) || 0;
                output.mdefencemodded += parseInt(value.basemeleedefence) || 0;
                output.rattackmodded += parseInt(value.baserangedattack) || 0;
                output.rdefencemodded += parseInt(value.baserangeddefence) || 0;    
                }
    
            output.evasionmodded += parseInt(value.evasion) || 0;
            output.othermodifications = (value.othermodifications) || "None";
            output.shielddievalue = shielddie;	
            output.shieldsuccessvalue = shieldsuccess;	  
            
            setAttrs(output);
        });
        });

on('change:mdefencemodded  change:berserkneg ', () => {
    getAttrs(['berserkneg', 'mdefencemodded', 'rdefencemodded'], v=> {
        const stats = ['berserk'];
        const output = {};
        const mdef = parseInt(v.mdefencemodded) || 0;
        const rdef = parseInt(v.rdefencemodded) || 0;
        stats.forEach(stat => {
            let neg = parseInt(v[`${stat}neg`]) || 0; 
            let score = (neg > mdef || neg > rdef) ? Math.max(mdef, rdef) : (neg < 0 ? 0 : neg);
            let factor = 3;
            let pos = Math.floor(score / factor);
            output[`${stat}neg`] = Math.floor(score/factor)*factor;
            output[`${stat}pos`] = pos;
        });
        setAttrs(output, {silent:true});
    });
});

on('change:rdefencemodded change:preciseneg change:stilnessneg', () => {
    getAttrs(['preciseneg', 'stillnessneg','rdefencemodded'], v=> {
        const stats = ['precise', 'stillness'];
        const output = {};
        const mdef = parseInt(v.rdefencemodded) || 0;
        stats.forEach(stat => {
            let neg = parseInt(v[`${stat}neg`]) || 0; 
            let score = (neg > rdef) ? rdef : (neg < 0 ? 0 : neg);
            let factor = (stat === 'stillness') ? 2 : 3;
            let pos = Math.floor(score / factor);
            output[`${stat}neg`] = Math.floor(score/factor)*factor;
            output[`${stat}pos`] = pos;
        });
        setAttrs(output, {silent:true});
    });
});
    
on('change:guardstomeleeonly change:attack change:basemeleeattack change:basemeleedefence change:baserangedattack change:baserangeddefence change:defence change:mattackmodded change:mdefencemodded change:rattackmodded change:rdefencemodded change:berserkneg change:preciseneg change:stillnessneg change:bloodrageselect change:nonprofselect change:deathvowselect sheet:opened', function() {
    getAttrs(['guardstomeleeonly','finalattack','finaldefence','basemeleedefence','basemeleeattack','baserangedattack','baserangeddefence','rdefencemodded','rattackmodded', 'mdefencemodded','mattackmodded','berserkneg','berserkpos','preciseneg','precisepos','stillnessneg','bloodrageselect','nonprofselect','deathvowselect'], function(v) {
        let bloodrage = parseInt(v.bloodrageselect)||0;
        let restrictedguards = parseInt(v.guardstomeleeonly)||0;

        if (restrictedguards === 1) {
            rattackmod = parseInt(v.baserangedattack)||0;
            rdefencemod = parseInt(v.baserangeddefence)||0;
            mattackmod = parseInt(v.mattackmodded)||0;
            mdefencemod = parseInt(v.mdefencemodded)||0;
            nonprofmod = parseInt(v.nonprofselect) || 0;
            deathvowmod = parseInt(v.deathvowselect) || 0;
            preciseattack = parseInt(v.precisepos) || 0;
            precisedefence = parseInt(v.preciseneg) || 0;
            stillnessdefence = parseInt(v.stillnessneg) || 0;
            }
        else if (bloodrage === 1) {
            bloodragemod = parseInt(v.basemeleedefence) || 0;
            berserkattack = 0;
            berserkdefence = 0;
            mattackmod = parseInt(v.basemeleeattack)||0;
            mdefencemod= parseInt(v.basemeleedefence)||0;
            rattackmod = parseInt(v.baserangedattack)||0;
            rdefencemod = parseInt(v.baserangeddefence)||0;
            }
        else {
            mattackmod = parseInt(v.mattackmodded) || 0;
            mdefencemod = parseInt(v.mdefencemodded) || 0;
            rattackmod = parseInt(v.rattackmodded) || 0;
            rdefencemod = parseInt(v.rdefencemodded) || 0;
            bloodragemod = 0;
            berserkattack = parseInt(v.berserkpos) || 0;
            berserkdefence = parseInt(v.berserkneg) || 0;
            nonprofmod = parseInt(v.nonprofselect) || 0;
            deathvowmod = parseInt(v.deathvowselect) || 0;
            preciseattack = parseInt(v.precisepos) || 0;
            precisedefence = parseInt(v.preciseneg) || 0;
            stillnessdefence = parseInt(v.stillnessneg) || 0;
            }

        let fmatk = mattackmod + berserkattack - nonprofmod + deathvowmod + bloodragemod;
        let fmdef = mdefencemod - berserkdefence - precisedefence - stillnessdefence - bloodragemod;
        let fratk = rattackmod + berserkattack - nonprofmod + deathvowmod + preciseattack;
        let frdef = rdefencemod - berserkdefence - precisedefence - stillnessdefence;
        
        setAttrs({                            
            finalmeleeattack: parseInt(fmatk)||0,
            finalmeleedefence: parseInt(fmdef)||0,
            finalrangedattack: parseInt(fratk)||0,
            finalrangeddefence: parseInt(frdef)||0

            });
    });
    });	
    
const woundValues = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
  woundValues.forEach(function(value) {
    on(`clicked:wound_${value}`, function() {
      setAttrs({
        wtwound: 0,
        wound: value
        });
    });
});

const wtwoundValues = ["0","1","2","3"];
wtwoundValues.forEach(function(value) {
    on(`clicked:wtwound_${value}`, function() {
        getAttrs(["maxhp","wound"], function(v) {    
        let w1= parseInt(v.wound);
        let m1= parseInt(v.maxhp);
            if (w1 < m1) 
                wou = m1,
                wtw = value;
            else
                wtw = value;
  setAttrs({
  wtwound: wtw,
  wound: wou
});
});
});
});
                    
const manausedValues = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
  manausedValues.forEach(function(value) {
    on(`clicked:manaused_${value}`, function() {
      setAttrs({
        manaused: value
        });
    });
});

const secmanausedValues = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
  secmanausedValues.forEach(function(value) {
    on(`clicked:secmanaused_${value}`, function() {
      setAttrs({
        secmanaused: value
        });
    });
});

const termanausedValues = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
  termanausedValues.forEach(function(value) {
    on(`clicked:termanaused_${value}`, function() {
      setAttrs({
        termanaused: value
        });
    });
});

on("clicked:wound_reset", function() {
    setAttrs({
        wound: 0,
        wtwound: 0
    });
});

on("clicked:mp_reset", function() {
    setAttrs({
        manaused: 0
    });
});

on("clicked:secmp_reset", function() {
    setAttrs({
        secmanaused: 0
    });
});

on("clicked:termp_reset", function() {
    setAttrs({
        termanaused: 0
    });
});    

const repeatingSum = (destinations, section, fields, ...extras) => {
    const isNumber = value => parseFloat(value).toString() === value.toString();
    const isOption = value => [...checks.valid, ...checks.roundtypes].includes(value);
    const isRounding = value => checks.roundtypes.includes(value);
    const isFraction = value => value.includes('/') && !(value.includes(',') || value.includes('|'));
    const getTrimmed = value => value.toLowerCase().replace(/\s/g, '');
    const getRounded = (type, value, pow) => (Math[type](value * Math.pow(10, pow)) / Math.pow(10, pow)).toFixed(Math.max(0, pow));
    const getFraction = (value) => /*{ console.log(`value: ${value}`); */
        parseInt(value.split('/')[0]) / parseInt(value.split('/')[1]);
    const getMultiplier = (value, rounding = 1) => 'undefined' === typeof value ? (rounding ? 0: 1) : (
        isNumber(value) ? parseFloat(value) : (isFraction(value) ? getFraction(value) : value));
    if (!Array.isArray(destinations)) destinations = [getTrimmed(destinations)];
    if (!Array.isArray(fields)) fields = [getTrimmed(fields)];
    const fields_trimmed = fields.map(field => getTrimmed(field).split(':')[0]);
    const subfields = fields_trimmed.slice(0,destinations.length);
    const checks = { valid: ['multiplier'], roundtypes: ['ceil', 'round', 'floor'] };
    let properties = {attributes: {}, options: {}};
    extras.forEach(extra => {
        const [prop, v] = getTrimmed(extra).split(':');
        const multiplier_maybe = getMultiplier(v, isRounding(prop));
        const obj = isNumber(multiplier_maybe) ? subfields.reduce((obj,field) => {
            obj[field] = multiplier_maybe;
            return obj;
        },{}) : multiplier_maybe.split(',').reduce((obj, item) => {
            const [stat, value] = item.split('|');
            const multiplier = getMultiplier(value, isRounding(prop));
            obj[stat] = multiplier;
            return obj;
        }, {});
        properties[isOption(prop) ? 'options' : 'attributes'][prop] = obj;
    });
    getSectionIDs(`repeating_${section}`, idArray => {
        const attrArray = idArray.reduce((m, id) => [...m, ...(fields_trimmed.map(field => `repeating_${section}_${id}_${field}`))], []);
        getAttrs([...attrArray, ...Object.keys(properties.attributes)], v => {
            const getValue = (section, id, field) => v[`repeating_${section}_${id}_${field}`] === 'on' ? 1 : parseFloat(v[`repeating_${section}_${id}_${field}`]) || 0;
            const commonMultipliers = (fields.length <= destinations.length) ? [] : fields.splice(destinations.length, fields.length - destinations.length);
            const output = destinations.reduce((obj, destination, index) => {
                let sumTotal = idArray.reduce((total, id) => total + getValue(section, id, fields_trimmed[index]) * commonMultipliers.reduce((subtotal, mult) => subtotal * ((!mult.includes(':') || mult.split(':')[1].split(',').includes(fields_trimmed[index])) ? getValue(section, id, mult.split(':')[0]) : 1), 1), 0);
                sumTotal *= (properties.options.hasOwnProperty('multiplier') && Object.keys(properties.options.multiplier).includes(fields_trimmed[index])) ? (parseFloat(properties.options.multiplier[fields_trimmed[index]]) || 0): 1;
                sumTotal += Object.entries(properties.attributes).reduce((total, [key, value]) => 
                    total += (value.hasOwnProperty(fields_trimmed[index]) ? parseFloat(v[key] || 0) * (parseFloat(value[fields_trimmed[index]]) || 1): 0) , 0);
                checks.roundtypes.forEach(type => {
                    if (properties.options.hasOwnProperty(type)) {
                        if (Object.keys(properties.options[type]).includes(fields_trimmed[index])) {
                            sumTotal = getRounded(type, sumTotal, (+properties.options[type][fields_trimmed[index]] || 0));
                        } else if (properties.options[type] == '0' || !isNaN(+properties.options[type] || 'x') ) {
                            sumTotal = getRounded(type, sumTotal, +properties.options[type]);
                        } 
                    } 
                });
                obj[destination] = sumTotal;
                return obj;
            }, {});
            setAttrs(output);
        }); 
    }); 
};

on("change:repeating_meleeweapons remove:repeating_meleeweapons sheet:opened", function() {
repeatingSum("totalweapons", "weapons", "weaponweight");
});

on("change:repeating_rangedweapons remove:repeating_rangedweapons sheet:opened", function() {
    repeatingSum("totalweapons", "weapons", "weaponweight");
    });
    
on("change:repeating_ammo remove:repeating_ammo sheet:opened", function() {
repeatingSum("ammoweight", "ammo", "ammoqty");
});

on("change:gc change:sf change:cp sheet:opened", function() {  
    getAttrs(["gc","sf", "cp"], function(value) {
        let gc = parseFloat(value.GC)||0;
        let sf = parseFloat(value.SF)||0;
        let cp = parseFloat(value.CP)||0;
    });
});    

on("change:repeating_inventoryitems remove:repeating_inventoryitems change:gc change:sf change:cp change:totalweapons change:ammoweight change:shield sheet:opened", function() {
repeatingSum("totalencumbrance", "inventoryitems", ["inventoryqty", "encumbrancevalue"], "gc:1/150", "sf:1/150", "cp:1/150", "ammoweight:1/12", "totalweapons", "shield", "round");
});
