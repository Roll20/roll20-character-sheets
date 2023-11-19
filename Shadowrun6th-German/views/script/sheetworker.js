
on("sheet:opened change:wilddie_toggle",function(){
    getAttrs(["wilddie_toggle"], function (v) {
        console.log("Check Wilddie_Toggle");
        if(parseInt(v.wilddie_toggle)==1) {
            console.log("wilddie_toggle is on");
            setAttrs({wilddieprop: "1",
                      wilddiemod:"-1"});

        }
        else{
            console.log("wilddie_toggle is off");
            setAttrs({wilddieprop: "0",
                      wilddiemod:"+0"});
        }
    });
});   

on("sheet:opened change:sustain_count change:sustain_mod change:sustain_mod2", function(){
    getAttrs(["sustain_count","sustain_mod","sustain_mod2"], function (v) {
        let val=Math.max(pInt(v.sustain_count)-1,0) *2+(pInt(v.sustain_mod)+pInt(v.sustain_mod2))
        log("Sustain val:" + val)
        setAttrs({
            sustain_malus:Math.max(val,0)
        });

    });
});


on("change:repeating_armor remove:repeating_armor",function(){
       repeatingSum("armor_total_prot","armor",["armor_prot","armor_selected"]);
    repeatingSum("armor_total_sozial","armor",["armor_sozial","armor_selected"]);
});


on("sheet:opened change:display_angriff change:display_angriffmod change:display_schleicher change:display_schleichermod change:display_datenverarbeitung change:display_datenverarbeitungmod change:display_firewall change:display_firewallmod change:display_decklevel change:display_deckschadenakt change:prgtb",function(){
    getAttrs(["display_angriff","display_angriffmod","display_schleicher","display_schleichermod","display_datenverarbeitung","display_datenverarbeitungmod","prgtb",
                "display_firewall","display_firewallmod","display_decklevel","display_deckschadenakt"],function(v){
                    let ag=(pInt(v.display_angriff)+pInt(v.display_angriffmod));
                    let sl=pInt(v.display_schleicher)+pInt(v.display_schleichermod);
                    setAttrs({
                        display_angrifftotal           : ag,
                        display_schleichertotal        : sl,
                        display_datenverarbeituntotal  : pInt(v.display_datenverarbeitung)+pInt(v.display_datenverarbeitungmod)+pInt(v.prgtb),
                        display_firewalltotal          : pInt(v.display_firewall)+pInt(v.display_firewallmod),
                        display_deckschaden            : 8+Math.ceil(pInt(v.display_decklevel)/2),
                        display_deckasdif: Math.min( ag-sl,0),
                        display_decksadif: Math.min(sl-ag,0),
                        display_deckschadenmod: Math.floor(pInt(v.display_deckschadenakt)/3),
                        display_deckaw: sl+ag,
                        display_deckvw:pInt(v.display_firewall)+pInt(v.display_firewallmod)+pInt(v.display_firewall)+pInt(v.display_firewallmod),
                    });
                });
})

on("change:armor_total_prot change:defence_statusmodifier change:optionalarmorrule",function(){
    getAttrs(["armor_total_prot","display_body","optionalarmorrule","defence_statusmodifier"], function (v) {

        let dr=pInt(v.display_body)+pInt(v.armor_total_prot)+pInt(v.defence_statusmodifier);
            let a=Math.floor( pInt(v.armor_total_prot)/4);
            log("defence_Update: " + dr)
        if (pInt(v.optionalarmorrule)==1){
            
            setAttrs({defense_rating: dr,
            damage_autoSoak:a,damage_autoSoakstun:a});
        }else{
            setAttrs({defense_rating: dr});
        }
       
        
    });
});
on("change:optionalarmorrule",function(){
    getAttrs(["optionalarmorrule"], function (v) {
          if (pInt(v.optionalarmorrule)!=1){
            
            setAttrs({            damage_autoSoak:0});
        }
       
        
    });
});


on("clicked:addgenericrolls",function(){
    let c={};
    let newrowid = generateRowID();
    let rw="repeating_customrolls_";
    c[rw + newrowid + "_name"]="Angriffswurf";
    c[rw + newrowid + "_cr_titel"]="Angriffswurf";
    c[rw + newrowid + "_cr_weaponnname"]="Ares Predator VI";
    c[rw + newrowid + "_cr_attackrating"]="[[2]]";
    c[rw + newrowid + "_cr_damage"]="[[2]] " + getTranslationByKey("phys");
    c[rw + newrowid + "_pool"]="2";

    newrowid = generateRowID();
    c[rw + newrowid + "_name"]="Verteidigungswurf";
    c[rw + newrowid + "_cr_titel"]="Verteidigungswurf";
    c[rw + newrowid + "_cr_defenserating"]="[[2]]";
    c[rw + newrowid + "_pool"]="2";

    newrowid = generateRowID();
    c[rw + newrowid + "_name"]="Schadenswiderstand";
    c[rw + newrowid + "_cr_titel"]="Schadenswiderstand";
    c[rw + newrowid + "_defense_autosoak"]="[[0]]";
    c[rw + newrowid + "_pool"]="2";
    
    newrowid = generateRowID();
    c[rw + newrowid + "_name"]="Initative";
    c[rw + newrowid + "_cr_titel"]="Initative";
    c[rw + newrowid + "_cr_rollbonus"]="4";
    c[rw + newrowid + "_cr_tracker"]="&{tracker}";
    c[rw + newrowid + "_pool"]="2";

    newrowid = generateRowID();
    c[rw + newrowid + "_name"]="Attributs- oder Fertigkeitswurf";
    c[rw + newrowid + "_cr_titel"]="Attributs- oder Fertigkeitswurf";
    c[rw + newrowid + "_cr_titelsec"]="?{" + getTranslationByKey("rollfor") + "}";
    c[rw + newrowid + "_pool"]="2"

    setAttrs(c);
});


on("change:spell_filter",function(){
    getAttrs(["spell_filter"], function (v) {
        getSectionIDs('spells', (idarray) => {
            getAttrs(idarray.map((id) => `repeating_spells_${id}_spell_name`), (values) => {
                getAttrs(idarray.map((id) => `repeating_spells_${id}_spellscategory`), (valuesc) => {
                    let rows={};
                   
                    for(var i = 0; i < idarray.length; i++ ){
                        if(!(v.spell_filter) || (values["repeating_spells_" + idarray[i] + "_spell_name" ].toLowerCase().includes(v.spell_filter.toLowerCase())) || 
                        ((valuesc["repeating_spells_" + idarray[i] + "_spellscategory" ]) && getTranslationByKey(valuesc["repeating_spells_" + idarray[i] + "_spellscategory" ]).toLowerCase().includes(v.spell_filter.toLowerCase())))
                        {
                            rows['repeating_spells_' + idarray[i] + '_spells_colapse'] ="0";
                            console.log( values["repeating_spells_" + idarray[i] + "_spell_name" ] + " ON");
                        }
                        else{
                            rows['repeating_spells_' + idarray[i] + '_spells_colapse'] ="1";
                            console.log( values["repeating_spells_" + idarray[i] + "_spell_name" ] + " OFF");
                        }
                        
                    }
                    if(rows) setAttrs(rows);
                });
            });
          });
    });
});

on("change:repeating_rangeweapons:wilddie_toggle",function(){
    getAttrs(["repeating_rangeweapons_wilddie_toggle"], function (v) {
        console.log("Check Wilddie_Toggle");
        if(parseInt(v.repeating_rangeweapons_wilddie_toggle)==1) {
            console.log("wilddie_toggle is on");
            setAttrs({repeating_rangeweapons_wilddieproprw: "1",
            repeating_rangeweapons_wilddiemodrw:"-1"});

        }
        else{
            console.log("wilddie_toggle is off");
            setAttrs({repeating_rangeweapons_wilddieproprw: "0",
            repeating_rangeweapons_wilddiemodrw:"+0"});
        }
    });
});
on("change:repeating_meleeweapons:meele_wilddie_toggle",function(){
    getAttrs(["repeating_meleeweapons_meele_wilddie_toggle"], function (v) {
        console.log("Check Wilddie_Toggle mw");
        if(parseInt(v.repeating_meleeweapons_meele_wilddie_toggle)==1) {
            console.log("wilddie_toggle mw is on");
            setAttrs({repeating_meleeweapons_wilddiepropmw: "1",
                      repeating_meleeweapons_wilddiemodmw:"-1"});

        }
        else{
            console.log("wilddie_toggle mw is off");
            setAttrs({repeating_meleeweapons_wilddiepropmw: "0",
                     repeating_meleeweapons_wilddiemodmw:"+0"});
        }
    });
});



on("change:repeating_vehicle:vehicle_speed",function(){
    console.log("Calc Handicap speed");
        getAttrs(["repeating_vehicle_vehicle_speed","repeating_vehicle_vehicle_interv"],
                    function (v) {
           
            let v1=Math.abs( parseInt(v.repeating_vehicle_vehicle_speed)||0);
            let interv=parseInt(v.repeating_vehicle_vehicle_interv)||0;

            let val=Math.ceil((v1+1)/interv)-1
           
            setAttrs({repeating_vehicle_vehicle_speed_mod: (val)});
             console.log("VAL: " + val);
          
        });
    });
    
    //vehicle_dmg change and calc mod
    on("change:repeating_vehicle:vehicle_dmg",function(){
       
       getAttrs(["repeating_vehicle_vehicle_dmg","repeating_vehicle_vehicle_armor"],function (v) {
           let dmg=parseInt(v["repeating_vehicle_vehicle_dmg"])||0;
           let arm=parseInt(v["repeating_vehicle_vehicle_armor"])||0;
           let val =Math.floor(dmg/3);
           
           setAttrs({repeating_vehicle_vehicle_dmgmod: (val)});
       });
   });

    on("sheet:opened change:prgsr change:display_rauschen",function(){
       
        getAttrs(["prgsr","display_rauschen"],function (v) {
            let sr=parseInt(v["prgsr"])||0;
            let dr=parseInt(v["display_rauschen"])||0;
            let val=dr-2*sr;
            val=val>0?val:0;
            setAttrs({display_rauschenclean: (val)});
             
          
        });
    });

   
    on("change:repeating_kf:kf_at1 change:repeating_kf:kf_at2 change:repeating_kf:kf_mod",function(){
        getAttrs(["repeating_kf_kf_at1","repeating_kf_kf_at2","repeating_kf_kf_mod","display_logic","display_body","display_agility","display_reaction" ,
                  "display_strength" ,"display_willpower","display_logic","display_intuition","display_charisma" ,"display_resonance",
                  "skill_electronics_base","skill_cracking_base","skill_piloting_base","skill_electronics_mod","skill_cracking_mod","skill_piloting_mod",
                  "skill_electronics_statusmodifier","skill_cracking_statusmodifier","skill_piloting_statusmodifier"],
                    function (v) {
            
            let at1=v["repeating_kf_kf_at1"]||"";
            let at2=v["repeating_kf_kf_at2"]||"";
            let v1=parseInt(v[at1])||0;
            let v2=parseInt(v[at2 + "_base"])||0;
                v2+=parseInt(v[at2 + "_mod"])||0;
                v2+=parseInt(v[at2 + "_statusmodifier"])||0;
            let mod=parseInt(v["repeating_kf_kf_mod"])||0;
            let val=v1+v2+mod;
            val=val>0?val:0;
            setAttrs({repeating_kf_kf_total: (val)});
             
          
        });
    });
   


    on("change:repeating_sprites:spritetype change:repeating_sprites:sp_stufe",function(){
        getAttrs(["repeating_sprites_spritetype","repeating_sprites_sp_stufe"],function(v){
            let typ=v["repeating_sprites_spritetype"];
            let val=parseInt(v["repeating_sprites_sp_stufe"])||0;
            console.log("Change Sprite:" + typ + " " + val);
            if (typ=="sprite_ds"){
                console.log("DS:" + typ + " " + val);
                setAttrs({
                    repeating_sprites_sp_at: (val-1),
                    repeating_sprites_sp_sch: (val),
                    repeating_sprites_sp_dv: (val+4),
                    repeating_sprites_sp_fw: (val+1),
                    repeating_sprites_sp_ini: (val*2+4),
                    repeating_sprites_sp_max: (8+Math.ceil(val/2)),
                    repeating_sprites_sp_power1:"Tarnung",
                    repeating_sprites_sp_power2:"Wasserzeichen"
                });      
            }
            if (typ=="sprite_is"){
                setAttrs({
                    repeating_sprites_sp_at: (val),
                    repeating_sprites_sp_sch: (val+3),
                    repeating_sprites_sp_dv: (val+2),
                    repeating_sprites_sp_ini: (val*2+2),
                    repeating_sprites_sp_max: (8+Math.ceil(val/2)),
                    repeating_sprites_sp_power1:"Spuk",
                    repeating_sprites_sp_power2:"Unterdrücken"
                });      
            }
            if (typ=="sprite_ks"){
                setAttrs({
                   repeating_sprites_sp_at: (val),
                   repeating_sprites_sp_sch: (val+3),
                   repeating_sprites_sp_dv: (val+1),
                   repeating_sprites_sp_fw: (val+2),
                   repeating_sprites_sp_ini: (val*2+1),
                   repeating_sprites_sp_max: (8+Math.ceil(val/2)),
                   repeating_sprites_sp_power1:"Cookie",
                   repeating_sprites_sp_power2:"Hash"
                });      
            }
            if (typ=="sprite_ms"){
                setAttrs({
                    repeating_sprites_sp_at: (val+1),
                    repeating_sprites_sp_sch: (val),
                    repeating_sprites_sp_dv: (val+3),
                    repeating_sprites_sp_fw: (val+2),
                    repeating_sprites_sp_ini: (val*2+3),
                    repeating_sprites_sp_max: (8+Math.ceil(val/2)),
                    repeating_sprites_sp_power1:"Diagnose",
                    repeating_sprites_sp_power2:"Stabilität",
                    repeating_sprites_sp_power3:"Übernehmen"
                });      
            }
            if (typ=="sprite_ss"){
                setAttrs({
                    repeating_sprites_sp_at: (val+3),
                    repeating_sprites_sp_sch: (val),
                    repeating_sprites_sp_dv: (val+1),
                    repeating_sprites_sp_fw: (val+2),
                    repeating_sprites_sp_ini: (val*2+1),
                    repeating_sprites_sp_max: (8+Math.ceil(val/2)),
                    repeating_sprites_sp_power1:"Elektronensturm",
                    repeating_sprites_sp_power2:"Falle"
                });      
            }
          
        });
    });


    const buttonlist = ["copyright","chardata","attributes","skills","attacks","magic","matrix","rigging","contacts","gear","notes","customrolls","configuration"];
    buttonlist.forEach(button => {
        on(`clicked:${button}`, function() {
            setAttrs({
                sheetTab: button
            });
        })
    });

    //Da Roll20 for-Schleifen außerhalb von Funktionen bei Systemstart initialisiert, scheint es nicht anders zu gehen
    const stunmonitor = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"];
    stunmonitor.forEach(stuncheckbox => {
        on(`clicked:stun_toggle_${stuncheckbox}`, function(){
            getAttrs([`stun_${stuncheckbox}`,"stunmonitor_max"], function(v){
                let checkstate=v[`stun_${stuncheckbox}`]!=="unchecked"?"unchecked":"checked";
                for(var checkedBoxes = 1; checkedBoxes < stuncheckbox; checkedBoxes++){
                    setAttrs({
                        [`stun_${checkedBoxes}`]: "checked",
                    })
                }
                for(var uncheckedBoxes = stuncheckbox; uncheckedBoxes < 19; uncheckedBoxes++){
                    setAttrs({[`stun_${uncheckedBoxes}`]: "unchecked",})
                }
                if(checkstate == "checked"){
                    setAttrs({
                        [`stun_${stuncheckbox}`]: "checked",
                        "wounds_stun_base": -Math.floor(stuncheckbox/3),
                        "stunmonitor":parseInt(v.stunmonitor_max)- parseInt(stuncheckbox)
                        
                    })
                } else {
                    setAttrs({"wounds_stun_base": -Math.floor((stuncheckbox-1)/3),
                              "stunmonitor":parseInt(v.stunmonitor_max)- parseInt(stuncheckbox)+1})
                }
            })
        })
    })
    const physmonitor = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19"];
    physmonitor.forEach(physcheckbox => {
        on(`clicked:phys_toggle_${physcheckbox}`, function(){
            getAttrs([`phys_${physcheckbox}`,"physmonitor_max"], function(v){
                let checkstate=v[`phys_${physcheckbox}`]!=="unchecked"?"unchecked":"checked";
                for(var checkedBoxes = 1; checkedBoxes < physcheckbox; checkedBoxes++){
                    setAttrs({
                        [`phys_${checkedBoxes}`]: "checked",
                    })
                }
                for(var uncheckedBoxes = physcheckbox; uncheckedBoxes < 20; uncheckedBoxes++){
                    setAttrs({[`phys_${uncheckedBoxes}`]: "unchecked",})
                }
                if(checkstate == "checked"){
                    setAttrs({
                        [`phys_${physcheckbox}`]: "checked",
                        "wounds_phys_base": -Math.floor(physcheckbox/3),
                        "physmonitor":parseInt(v.physmonitor_max)- parseInt(physcheckbox)
                    })
                } else {
                    setAttrs({"wounds_phys_base": -Math.floor((physcheckbox-1)/3),
                    "physmonitor":parseInt(v.physmonitor_max)- parseInt(physcheckbox)})
                }
            })
        })
    })
    on("change:wounds_stun_base change:wounds_phys_base change:wounds_mod", function(){
        getAttrs(["wounds_stun_base","wounds_phys_base","wounds_mod"], function(v){
            let woundsum = Math.min(0,+v.wounds_stun_base+ +v.wounds_phys_base+ +v.wounds_mod)
            setAttrs({wounds_total: woundsum})
        })
    })

    //Handlungsverwaltung
    on("sheet:opened change:minor_action_count", function(){
        getAttrs(["minor_action_count"], function(v){
            let mac = v.minor_action_count;
            if(mac <= 2){
                setAttrs({
                    "minor_action_count":2,"major_1_show":1,"major_2_show":0,
                    "minor_1_show":1,"minor_2_show":1,"minor_3_show":0,"minor_4_show":0,"minor_5_show":0,
                })
            }
            if(mac == 3){
                setAttrs({
                    "minor_action_count":3,"major_1_show":1,"major_2_show":0,
                    "minor_1_show":1,"minor_2_show":1,"minor_3_show":1,"minor_4_show":0,"minor_5_show":0,
                })
            }
            if(mac == 4){
                setAttrs({
                    "minor_action_count":4,"major_1_show":1,"major_2_show":1,
                    "minor_1_show":1,"minor_2_show":1,"minor_3_show":1,"minor_4_show":1,"minor_5_show":0,
                })
            }
            if(mac >= 5){
                setAttrs({
                    "minor_action_count":5,"major_1_show":1,"major_2_show":1,
                    "minor_1_show":1,"minor_2_show":1,"minor_3_show":1,"minor_4_show":1,"minor_5_show":1,
                })
            }
        })
    })
    const actions = ["major_1","major_2","minor_1","minor_2","minor_3","minor_4","minor_5"]; //major_1_toggle
    actions.forEach(action => {
        on(`clicked:${action}_toggle`, function(){ //one-way-toggle does not need getAttrs
            console.log(action + " clicked");
             if (action=="major_2"){
                getAttrs(["major_1","major_2","minor_1","minor_2","minor_3","minor_4","minor_5"],function(v){
                    let first=1;
                    if (v.minor_1=="struck"){
                        first+=1
                    }
                    if (v.minor_2=="struck"){
                        first+=1
                    }
                    if (v.minor_3=="struck"){
                        first+=1
                    }

                    if (v.major_2!="struck" && v.major_1=="struck" ){
                        setAttrs({
                            [`${action}`]: "struck",
                            ["minor_" +first]: "struck",
                            ["minor_" +(first+1)]: "struck",
                            ["minor_" +(first+2)]: "struck",
                            ["minor_" +(first+3)]: "struck",
                        });
                    }
                    if (v.major_1!="struck" ){
                        setAttrs({
                            ["major_1"]: "struck",
                        });
                    }
                });
             } 
             else if(action.includes("minor")){
                getAttrs(["major_1","major_2","minor_1","minor_2","minor_3","minor_4","minor_5","minor_action_count"],function(v){
                    let minorcnt=pInt(v.minor_action_count);
                    if (v.minor_1=="struck") minorcnt-=1;
                    if (v.minor_2=="struck") minorcnt-=1;
                    if (v.minor_3=="struck") minorcnt-=1;
                    if (v.minor_4=="struck") minorcnt-=1;
                    if (v.minor_5=="struck") minorcnt-=1;
                    if (minorcnt<=4) {
                        setAttrs({
                            ["major_2"]: "struck",
                            [`${action}`]: "struck"
                        });
                    }
                    else{
                        setAttrs({
                            [`${action}`]: "struck",
                        });
                    }
                });
               
             }
             else{
                setAttrs({
                    [`${action}`]: "struck",
                });
             }
           
        })
    })

    on("clicked:reset_action_count", function(){
        setAttrs({
            "major_1": "unstruck","major_2": "unstruck",
            "minor_1": "unstruck","minor_2": "unstruck","minor_3": "unstruck","minor_4": "unstruck","minor_5": "unstruck",
        })
    })

    //Edge Management
    on("clicked:edge_plus_two", function(){getAttrs(["edge_current"], function(v){setAttrs({edge_current: Math.min(7,+v.edge_current+2),})})})
    on("clicked:edge_plus_one", function(){getAttrs(["edge_current"], function(v){setAttrs({edge_current: Math.min(7,+v.edge_current+1),})})})
    on("clicked:edge_minus_one", function(){getAttrs(["edge_current"], function(v){setAttrs({edge_current: Math.max(0,+v.edge_current-1),})})})
    on("clicked:edge_minus_two", function(){getAttrs(["edge_current"], function(v){setAttrs({edge_current: Math.max(0,+v.edge_current-2),})})})
    on("clicked:edge_minus_three", function(){getAttrs(["edge_current"], function(v){setAttrs({edge_current: Math.max(0,+v.edge_current-3),})})})
    on("clicked:edge_minus_four", function(){getAttrs(["edge_current"], function(v){setAttrs({edge_current: Math.max(0,+v.edge_current-4),})})})
    on("clicked:edge_minus_five", function(){getAttrs(["edge_current"], function(v){setAttrs({edge_current: Math.max(0,+v.edge_current-5),})})})
    on("sheet:opened change:edge_current", function(eventInfo){
          getAttrs(["edge_current"], function(v){
              console.log("Souce: " + eventInfo.sourceType)
              if (eventInfo.sourceType=="player" &&  pInt(v.edge_current)==0 && eventInfo.previousValue>1){
                setAttrs({edge_current:pInt(eventInfo.previousValue)-1});
            }
            else if (eventInfo.sourceType=="player" &&  pInt(v.edge_current)<eventInfo.previousValue){
                setAttrs({edge_current:pInt(v.edge_current)-1});
            }
            else
            {
                for(var i=v.edge_current; i<8; i++){
                    setAttrs({
                        [`edge_${i}`]:1,
                    })
                }
                for(var i=1;i <= v.edge_current;i++){
                    setAttrs({
                        [`edge_${i}`]:0,
                    })
                }
                if(v.edge_current == 0){ //reverse logic for edge 0, otherwise it destroys the shape of the sheet
                    setAttrs({edge_0:0})
                } else {
                    setAttrs({edge_0:1})
                }
            }
        })
    })
    on("clicked:edge_reset", () => {
        getAttrs(["display_edge","edge_current"], (v) => {
            if(v.edge_current > v.display_edge){
                setAttrs({
                    edge_current: v.display_edge,
                })
            }
        })
    })

    //exploding dice
    on("change:explode_toggle", function(){
        getAttrs(["explode_toggle"], function(v){
            let edge = (v.explode_toggle != 0) ? "!" : "";
            setAttrs({
                exploding_dice: edge,
            })
        })
    })

    

    const attributes = ["body","agility","reaction","strength","willpower","logic","intuition","charisma","edge","magic","resonance","composure","judgeintent","memory","liftcarry","ini","inidice","iniphys","inimatrix","iniastral","soak","soakstun","magic","adeptpowerpoints"];
    const s_attributes = ["body","agility","reaction","strength","willpower","logic","intuition","charisma","edge","magic","resonance"];
    const skills = ["athletics","influence","electronics","firearms","stealth","engineering","melee","outdoors","piloting","con","perception","astral","biotech","cracking","task","conjuring","sorcery","enchanting","exoticweapon1","exoticweapon2"];/*,"exoticweapons"*/
    const magicalSkills = ["astral","conjuring","sorcery","enchanting"];
    const spirittypes = ["air","fire","water","earth","man","beast","plant","task","guardian","guidance"];


function updateAttribute(attribute){
    getAttrs([`${attribute}_base`,`${attribute}_modifier`,`${attribute}_statusmodifier`], function(v){
               
               let total=pInt(v[`${attribute}_base`]) + pInt(v[`${attribute}_modifier`]) +pInt(v[`${attribute}_statusmodifier`]);
              //  console.log("set display_" +attribute + " total: " + total);
                setAttrs({
                    [`display_${attribute}`]: total,
                    //inidice_base:       1,
                }) //no switches?!
                
                if(attribute == "body"){
                    getAttrs(["display_willpower"], function(val){
                        setAttrs({
                            liftcarry_base: total  + pInt(val.display_willpower),
                            soak_base:total,
                            soakstun_base:total
                        })
                    })
                    getAttrs(["phys_monitor_shift"], (val) => {
                        var physmonitorsize = 8 + +val.phys_monitor_shift + Math.ceil(total/2);
                        for(var a = 1; a <= physmonitorsize; a++){setAttrs({[`phys_${a}_hide`]: 0,})}
                        for(var i = physmonitorsize+1; i < 20; i++){setAttrs({[`phys_${i}_hide`]: 1,[`phys_${i}`]: "unchecked",})}
                    })
                }
                if(attribute == "agility"){console.log("working on: "+attribute);}
                if(attribute == "reaction"){
                    getAttrs(["display_intuition"], function(val){
                        setAttrs({
                            ini_base: total + +val.display_intuition,
                            iniphys_base: total + +val.display_intuition,
                        })
                    })
                }
                if(attribute == "strength"){console.log("working on: "+attribute);}
                if(attribute == "willpower"){
                    getAttrs(["display_body","display_intuition","display_charisma"], function(val){
                        setAttrs({
                            liftcarry_base: +total + pInt(val.display_body),
                            judgeintent_base: +total + pInt(val.display_intuition),
                            composure_base: total + pInt(val.display_charisma),
                        })
                    })
                    getAttrs(["stun_monitor_shift"], (val) => {
                   //     console.log(val.stun_monitor_shift);
                        var stunmonitorsize = 8 + +val.stun_monitor_shift + Math.ceil((total)/2);
                    //    console.log(stunmonitorsize);
                        for(var a = 1; a <= stunmonitorsize; a++){setAttrs({[`stun_${a}_hide`]: 0,})}
                        for(var i = stunmonitorsize+1; i < 19; i++){setAttrs({[`stun_${i}_hide`]: 1,[`stun_${i}`]: "unchecked",})}
                    })
                }
                if(attribute == "logic"){
                    getAttrs(["display_intuition"], function(val){
                        setAttrs({
                            iniastral_base: total +pInt(val.display_intuition),
                            memory_base: total +pInt(val.display_intuition),
                        })
                    })
                }
                if(attribute == "intuition"){
                    getAttrs(["display_reaction","display_willpower","display_logic","display_datenverarbeitung"], function(val){
                        setAttrs({
                            composure_base: total + pInt(val.display_willpower),
                            judgeintent_base: +total + pInt(val.display_willpower),
                            ini_base: total + pInt(val.display_reaction),
                            iniastral_base: total + pInt(val.display_logic),
                            inimatrix_base: total + pInt(val.display_datenverarbeitung),
                            iniphys_base: total + pInt(val.display_reaction),
                            memory_base: total + pInt(val.display_logic),
                        })
                    })
                }
                if(attribute == "charisma"){
                    getAttrs(["display_willpower"], function(val){
                        setAttrs({
                            composure_base: total + pInt(val.display_willpower),
                        })
                    })
                }
            /*    if(attribute == "edge"){console.log("working on: "+attribute);}
                if(attribute == "magic"){console.log("working on: "+attribute);}
                if(attribute == "resonance"){console.log("working on: "+attribute);}*/
            });
            
};

function updateSkill(skill){
    
    getAttrs([`skill_${skill}_base`,`skill_${skill}_modifier`,`skill_${skill}_attribute`,`skill_${skill}_statusmodifier`], (v) => {
                s_attributes.forEach(s_attribute => {
                    getAttrs([`display_${s_attribute}`], function(va){
                        if(`display_${s_attribute}` == v[`skill_${skill}_attribute`]){
                           
                           let total = pInt(va[`display_${s_attribute}`]) + pInt(v[`skill_${skill}_base`])+ pInt(v[`skill_${skill}_modifier`]) + pInt(v[`skill_${skill}_statusmodifier`])
                          console.log("Update: " + skill + " attrib:" + s_attribute + " total:" + total);
                            if(v[`skill_${skill}_base`] > 4) {
                                setAttrs({
                                    [`skill_${skill}_exp_visibility`]:1,
                                    [`skill_${skill}_spec_visibility`]:1,
                                    [`skill_${skill}_total_exp`]:total+3,
                                    [`skill_${skill}_total_spec`]: total+2,
                                    [`skill_${skill}_total`]: total,
                                })
                            }
                            if(v[`skill_${skill}_base`] > 0 && v[`skill_${skill}_base`] < 5){
                                setAttrs({
                                    [`skill_${skill}_exp`]:"",
                                    [`skill_${skill}_exp_visibility`]:0,
                                    [`skill_${skill}_spec_visibility`]:1,
                                    [`skill_${skill}_total_exp`]:0,
                                    [`skill_${skill}_total_spec`]: total+2,
                                    [`skill_${skill}_total`]: total,
                                })
                            }
                            if(skill == "astral" || skill == "biotech" || skill == "conjuring" || skill == "exoticweapons" || skill == "sorcery" || skill == "task" || skill == "enchanting"){
                                if(v[`skill_${skill}_base`] < 1) {
                                    setAttrs({
                                        [`skill_${skill}_base`]: 0,
                                        [`skill_${skill}_exp`]:"",
                                        [`skill_${skill}_exp_visibility`]:0,
                                        [`skill_${skill}_spec`]:"",
                                        [`skill_${skill}_spec_visibility`]:0,
                                        [`skill_${skill}_total`]: 0,
                                        [`skill_${skill}_total_exp`]:0,
                                        [`skill_${skill}_total_spec`]: 0,
                                    })
                                }
                            } else {
                                if(v[`skill_${skill}_base`] < 1) {
                                    setAttrs({
                                        [`skill_${skill}_base`]: 0,
                                        [`skill_${skill}_exp`]:"",
                                        [`skill_${skill}_exp_visibility`]:0,
                                        [`skill_${skill}_spec_visibility`]:0,
                                        [`skill_${skill}_spec`]:"",
                                        [`skill_${skill}_total`]: pInt(va[`display_${s_attribute}`]) -1 + pInt(v[`skill_${skill}_modifier`]) + pInt(v[`skill_${skill}_statusmodifier`]),
                                        [`skill_${skill}_total_spec`]: 0,
                                        [`skill_${skill}_total_exp`]:0,
                                    })
                                }
                            }
                        }
                    })
                })
                
            })
           
}

on("sheet:opened", function(){
    attributes.forEach(attribute => {
        try {
            updateAttribute(attribute);
        } catch (error) {
            console.log("Error attribute: " + attribute + " =>" + error)
        }
       
    });
    skills.forEach(skill => {
        try {
            updateSkill(skill);
        } catch (error) {
            console.log("Error Skills: "  + skill + " =>" + error)
        }
       
    });
   

    getAttrs(["sheetTab"],function(v){
        console.log("TAB:" +v.sheetTab);
        if (v.sheetTab=="copyright"){

            setAttrs({
                sheetTab:"chardata",
            })
        }
    });

});
on("change:phys_monitor_shift", () => {
    updateAttribute("body");
})
on("sheet:opened change:stun_monitor_shift", () => {
        updateAttribute("willpower");
})

    attributes.forEach(attribute => {
        on(`change:${attribute}_base change:${attribute}_modifier change:${attribute}_statusmodifier`, function(eventInfo){
            updateAttribute(attribute);
            //renew all skill pools
            
            if (!attribute.startsWith("ini") && attribute!="liftcarry" && attribute!="memory" && attribute!="judgeintent" && attribute!="composure"){
               // console.log("working on: skill pools "+attribute + " by " + eventInfo.sourceAttribute + "/" + eventInfo.sourceType  + " prev: " + eventInfo.previousValue + " new: " + eventInfo.newValue)
                skills.forEach(skilla => {
                    updateSkill(skilla);
                })
               
            }
        })
    })




    //Fertigkeitspools
    skills.forEach(skill => {
        on(`change:skill_${skill}_base change:skill_${skill}_modifier change:skill_${skill}_statusmodifier change:skill_${skill}_attribute`, function(eventInfo){
            //offensichtlich ist es über den Alias nur möglich einen Wert zu übergeben, da er beim Betreten der Funktion nur den letzten Wert für skill_attribute behalten kann
            //damit ist das Erhalten von Attributen, bei denen die Kette "Skill -> verlinktes Attribut -> Wert" gegangen werden muss, nicht ohne weiteres möglich
         //   console.log("working on: "+skill + " by " + eventInfo.sourceAttribute + "/" + eventInfo.sourceType  + " prev: " + eventInfo.previousValue + " new: " + eventInfo.newValue)
            updateSkill(skill);
        })
    })

    on("change:skill_exoticweapon1_name", function(){
        getAttrs(["skill_exoticweapon1_name"],function(v){
            if(!v.skill_exoticweapon1_name || v.skill_exoticweapon1_name==""){
                setAttrs({
                    skill_attackexoticweapon1_hide: 1,
                    skill_attackexoticweapon2_hide: 1,
                    skill_exoticweapon2_hide: 1,
                });
            }
            else{
                setAttrs({
                    skill_attackexoticweapon1_hide: 0,
                    
                });
            }
        });
    });
    on("change:skill_exoticweapon2_name", function(){
        getAttrs(["skill_exoticweapon2_name"],function(v){
            if(!v.skill_exoticweapon2_name || v.skill_exoticweapon2_name==""){
                setAttrs({
                    skill_attackexoticweapon2_hide: 1,
                });
            }
            else{
                setAttrs({
                    skill_attackexoticweapon2_hide: 0,
                });
            }
        });
    });


    //Ausblenden von Rolls ohne Spez und Exp
    skills.forEach(skill => {
        on(`change:skill_${skill}_spec change:skill_${skill}_exp`, function(){
            getAttrs([`skill_${skill}_spec`,`skill_${skill}_exp`], function(v){
                if(!!v[`skill_${skill}_spec`] && v[`skill_${skill}_spec`]!=""){setAttrs({[`skill_${skill}_spec_roll_visibility`]:1,})
                } else {setAttrs({[`skill_${skill}_spec_roll_visibility`]:0,})}
                if(!!v[`skill_${skill}_exp`] && v[`skill_${skill}_exp`]!=""){setAttrs({[`skill_${skill}_exp_roll_visibility`]:1,})
                } else {setAttrs({[`skill_${skill}_exp_roll_visibility`]:0,})}
            })
        })
    })
    

    on("clicked:hide_illegal_actions",function(){
        setAttrs({mh_dbl_hide:1,
            mh_bf_hide:1,
            mh_bv_hide:1,
            mh_ds_hide:1,
            mh_dc_hide:1,
            mh_gsi_hide:1,
            mh_ht_hide:1,
            mh_ia_hide:1,
            mh_ml_hide:1,
            mh_ow_hide:1,
            mh_pa_hide:1,
            mh_ps_hide:1,
            mh_so_hide:1,
            mh_ss_hide:1,
            mh_tg_hide:1,
            mh_ua_hide:1,
            mh_vs_hide:1 });
    });

    on("clicked:reset_actions_visibility",function(){
        setAttrs({mh_dbl_hide:0,
            mh_as_hide:0,
            mh_bf_hide:0,
            mh_bv_hide:0,
            mh_db_hide:0,
            mh_dc_hide:0,
            mh_de_hide:0,
            mh_ds_hide:0,
            mh_dv_hide:0,
            mh_gf_hide:0,
            mh_gn_hide:0,
            mh_gs_hide:0,
            mh_gsi_hide:0,
            mh_hs_hide:0,
            mh_ht_hide:0,
            mh_ia_hide:0,
            mh_ml_hide:0,
            mh_ms_hide:0,
            mh_mw_hide:0,
            mh_ow_hide:0,
            mh_pa_hide:0,
            mh_ps_hide:0,
            mh_so_hide:0,
            mh_ss_hide:0,
            mh_tg_hide:0,
            mh_ua_hide:0,
            mh_vs_hide:0 });
    });

    //alle Fertigkeiten sichtbar machen
    on("clicked:reset_skill_visibility", function(){ //für den Reiter Fertigkeiten
        skills.forEach(skill => {
            setAttrs({
                [`skill_${skill}_hide`]:0,
            })
        })
    })
    

    on("clicked:reset_magic_visibility", () => { //für den Reiter Magie
        magicalSkills.forEach(skill => {
            setAttrs({
                [`skill_magic${skill}_hide`]:0,
            })
        })
    })
    //Ausblenden von Fertigkeiten
    on("clicked:hide_unused_skills", function(){
        skills.forEach(skill => {
            getAttrs([`skill_${skill}_base`], function(v){
                if(v[`skill_${skill}_base`] <= 0){
                    setAttrs({
                        [`skill_${skill}_hide`]:1,
                    })
                }
            })
        })
    })
    on("clicked:hide_unused_magics", () => {
        magicalSkills.forEach(skill => {
            getAttrs([`skill_${skill}_base`], (v) => {
                if(v[`skill_${skill}_base`] <= 0){
                    setAttrs({
                        [`skill_magic${skill}_hide`]:1,
                    })
                }
            })
        })
    })
    //Zurücksetzen von Fertigkeiten, Attribute sind ein Krampf ^_^
    on("clicked:reset_magic_values", function(){
        magicalSkills.forEach(skill => {
           setAttrs({
               [`skill_${skill}_base`]:-1,
               [`skill_${skill}_exp`]:"",
               [`skill_${skill}_exp_roll_visibility`]:0,
               [`skill_${skill}_exp_visibility`]:0,
               [`skill_${skill}_hide`]:0,
               [`skill_${skill}_spec`]:"",
               [`skill_${skill}_spec_roll_visibility`]:0,
               [`skill_${skill}_spec_visibility`]:0,
               [`magic_${skill}_total`]:0,
           })
           if(skill = "astral"){
               setAttrs({
                        [`magic_${skill}_attribute`]:"display_intuition",
                })
           } else {
              setAttrs({
                        [`magic_${skill}_attribute`]:"display_magic",
                })
           }
        });
    });
    on("clicked:reset_skill_values", function(){
        skills.forEach(skill => {
            setAttrs({
                [`skill_${skill}_base`]:-1,
                [`skill_${skill}_exp`]:"",
                [`skill_${skill}_exp_roll_visibility`]:0,
                [`skill_${skill}_exp_visibility`]:0,
                [`skill_${skill}_hide`]:0,
                [`skill_${skill}_spec`]:"",
                [`skill_${skill}_spec_roll_visibility`]:0,
                [`skill_${skill}_spec_visibility`]:0,
            })
            if(skill == "athletics" || skill == "firearms" || skill == "stealth" || skill == "melee"){
                getAttrs(["display_agility"], function(v){
                    setAttrs({
                        [`skill_${skill}_attribute`]:"display_agility",
                        [`skill_${skill}_total`]: +v.display_agility -1,
                    })
                })
            }
            if(skill == "piloting"){
                getAttrs(["display_reaction"], function(v){
                    setAttrs({
                        [`skill_${skill}_attribute`]:"display_reaction",
                        [`skill_${skill}_total`]: +v.display_reaction -1,
                    })
                })
            }
            if(skill == "outdoors" ||skill == "perception"){
                getAttrs(["display_intuition"], function(v){
                    setAttrs({
                        [`skill_${skill}_attribute`]:"display_intuition",
                        [`skill_${skill}_total`]: +v.display_intuition -1,
                    })
                })
            }
            if(skill == "astral"){
                getAttrs(["display_intuition"], function(v){
                    setAttrs({
                        [`skill_${skill}_attribute`]:"display_intuition",
                        [`skill_${skill}_total`]:0,
                    })
                })
            }
            if(skill == "engineering"){
                getAttrs(["display_logic"], function(v){
                    setAttrs({
                        [`skill_${skill}_attribute`]:"display_logic",
                        [`skill_${skill}_total`]: +v.display_logic -1,
                    })
                })
            }
            if(skill == "biotech" || skill == "cracking" || skill == "electronics"){
                getAttrs(["display_logic"], function(v){
                    setAttrs({
                        [`skill_${skill}_attribute`]:"display_logic",
                        [`skill_${skill}_total`]:0,
                    })
                })
            }
            if(skill == "influence" || skill == "con"){
                getAttrs(["display_charisma"], function(v){
                    setAttrs({
                        [`skill_${skill}_attribute`]:"display_charisma",
                        [`skill_${skill}_total`]: +v.display_charisma -1,
                    })
                })
            }
        })
    });




    on("clicked:repeating_vehicle:speedup", function(){
        getAttrs(["repeating_vehicle_vehicle_speed","repeating_vehicle_vehicle_velakt"], function(values){
            let newmax=parseInt(values.repeating_vehicle_vehicle_speed)+parseInt(values.repeating_vehicle_vehicle_velakt);
            setAttrs({
                'repeating_vehicle_vehicle_speed': newmax,
                'repeating_vehicle_vehicle_velakt': 0
            });
       })
    });

    /* ALWAYS REMEMBER ... ACTION BUTTONS IN REPEATING SECTIONS WITHOUT UNDERSCORES*/
    on("clicked:repeating_rangeweapons:reload", function(){
        getAttrs(["repeating_rangeweapons_maximum_ammo","repeating_rangeweapons_total_ammo"], function(values){
            let newmax=values.repeating_rangeweapons_total_ammo-values.repeating_rangeweapons_maximum_ammo;
            setAttrs({
                'repeating_rangeweapons_current_ammo': values.repeating_rangeweapons_maximum_ammo,
                'repeating_rangeweapons_total_ammo': newmax
            });
       })
    });
    on("clicked:repeating_rangeweapons:shoot", function(){
        getAttrs(["repeating_rangeweapons_maximum_ammo","repeating_rangeweapons_current_ammo","repeating_rangeweapons_firemodehm",
                   "repeating_rangeweapons_firemodesm","repeating_rangeweapons_firemodeem","repeating_rangeweapons_firemodeam"], function(v){
           let mun=1;
            if (v.repeating_rangeweapons_firemodeam==1) mun=10;
            if (v.repeating_rangeweapons_firemodehm==1) mun=2;
            if (v.repeating_rangeweapons_firemodesm==1) mun=4;
            let newmun=parseInt(v.repeating_rangeweapons_current_ammo)||0;
            newmun-=mun;

            setAttrs({
                repeating_rangeweapons_current_ammo: newmun
                });
       })
    });


    on("change:repeating_rangeweapons:smartgun change:repeating_rangeweapons:range_attack_pool",function(){
        getAttrs(["repeating_rangeweapons_range_attack_pool","repeating_rangeweapons_smartgun"],function(v){
            setAttrs({repeating_rangeweapons_range_attack_pooltotal:pInt(v.repeating_rangeweapons_range_attack_pool)+pInt(v.repeating_rangeweapons_smartgun)});
        });
    });

    //ChangeammpType
    on("change:repeating_rangeweapons:ammotype",function(){
        getAttrs(["repeating_rangeweapons_ammotype","repeating_rangeweapons_ammodamagemodifier","repeating_rangeweapons_ammoarmodifier","repeating_rangeweapons_rwtype",
        "repeating_rangeweapons_ammo_cur_apds","repeating_rangeweapons_ammo_mag_apds","repeating_rangeweapons_ammo_total_apds",
        "repeating_rangeweapons_ammo_cur_explosive","repeating_rangeweapons_ammo_mag_explosive","repeating_rangeweapons_ammo_total_explosive",
         "repeating_rangeweapons_ammo_cur_flechette","repeating_rangeweapons_ammo_mag_flechette","repeating_rangeweapons_ammo_total_flechette",
         "repeating_rangeweapons_ammo_cur_gel","repeating_rangeweapons_ammo_mag_gel","repeating_rangeweapons_ammo_total_gel",
         "repeating_rangeweapons_ammo_cur_precision","repeating_rangeweapons_ammo_mag_precision","repeating_rangeweapons_ammo_total_precision",
         "repeating_rangeweapons_ammo_cur_revo","repeating_rangeweapons_ammo_mag_revo","repeating_rangeweapons_ammo_total_revo",
         "repeating_rangeweapons_ammo_cur_selfmade","repeating_rangeweapons_ammo_mag_selfmade","repeating_rangeweapons_ammo_total_selfmade",
         "repeating_rangeweapons_ammo_cur_shocker","repeating_rangeweapons_ammo_mag_shocker","repeating_rangeweapons_ammo_total_shocker",
         "repeating_rangeweapons_ammo_cur_standard","repeating_rangeweapons_ammo_mag_standard","repeating_rangeweapons_ammo_total_standard",
         "repeating_rangeweapons_ammo_cur_standard_ac","repeating_rangeweapons_ammo_mag_standard_ac","repeating_rangeweapons_ammo_total_standard_ac"],function (v) {
            let at=v["repeating_rangeweapons_ammotype"];
            let adm=parseInt(v["repeating_rangeweapons_ammodamagemodifier"])||0;
            let aam=parseInt(v["repeating_rangeweapons_ammoarmodifier"])||0;
            let rw="phys";
            switch(at){
                case "apds":adm=-1;aam=2;break;
                case "explosive":adm=1;aam=0;break;
                case "flechette":adm=-1;aam=1;break;
                case "gel":adm=0;aam=0;rw="stun";break;
                case "precision":adm=0;aam=0;break;
                case "revo":adm=0;aam=0;break;
                case "selfmade":adm=0;aam=0;break;
                case "shocker":adm=-1;aam=1;rw="shock";break;
                case "standard":adm=0;aam=0;break;
                case "standard_ac":adm=0;aam=0;break;
            }

            setAttrs({repeating_rangeweapons_ammodamagemodifier: (adm),
                        repeating_rangeweapons_ammoarmodifier:(aam),
                        repeating_rangeweapons_rwtype:rw,
                        repeating_rangeweapons_damagevclosemod: adm,
                        repeating_rangeweapons_damageclosemod: adm,
                        repeating_rangeweapons_damagemediummod: adm,
                        repeating_rangeweapons_damagelongmod: adm,
                        repeating_rangeweapons_damagevlongmod: adm,
                        repeating_rangeweapons_arvclosemod: aam,
                        repeating_rangeweapons_arclosemod: aam,
                        repeating_rangeweapons_armediummod: aam,
                        repeating_rangeweapons_arlongmod: aam,
                        repeating_rangeweapons_arvlongmod: aam,
                        repeating_rangeweapons_total_ammo:parseInt(v["repeating_rangeweapons_ammo_total_"+ at])||0,
                        repeating_rangeweapons_maximum_ammo:parseInt(v["repeating_rangeweapons_ammo_mag_"+ at])||0,
                        repeating_rangeweapons_current_ammo:parseInt(v["repeating_rangeweapons_ammo_cur_"+ at])||0
                      

            });





        });
    });
    on("change:repeating_rangeweapons:total_ammo ",function(){
        getAttrs(["repeating_rangeweapons_ammotype","repeating_rangeweapons_total_ammo"],function (v) {
            let at=v["repeating_rangeweapons_ammotype"];
            setAttrs({["repeating_rangeweapons_ammo_total_"+at]:v.repeating_rangeweapons_total_ammo});
        });
    });
    on("change:repeating_rangeweapons:maximum_ammo ",function(){
        getAttrs(["repeating_rangeweapons_ammotype","repeating_rangeweapons_maximum_ammo"],function (v) {
            let at=v["repeating_rangeweapons_ammotype"];
            setAttrs({["repeating_rangeweapons_ammo_mag_"+at]:v.repeating_rangeweapons_maximum_ammo});
        });
    });
    on("change:repeating_rangeweapons:current_ammo ",function(){
        getAttrs(["repeating_rangeweapons_ammotype","repeating_rangeweapons_current_ammo"],function (v) {
            let at=v["repeating_rangeweapons_ammotype"];
            setAttrs({["repeating_rangeweapons_ammo_cur_"+at]:v.repeating_rangeweapons_current_ammo});
        });
    });


    on("change:repeating_rangeweapons:firemodeem", function(){getAttrs(["repeating_rangeweapons_firemodeem"], function(values){if(values.repeating_rangeweapons_firemodeem == 1){setAttrs({'repeating_rangeweapons_firemodehm': 0,'repeating_rangeweapons_firemodesm': 0,'repeating_rangeweapons_firemodeam': 0,'repeating_rangeweapons_firemode_ar_mod': 0,'repeating_rangeweapons_firemode_dam_mod': 0,'repeating_rangeweapons_firemode_name': "firemode_em",});}})});
    on("change:repeating_rangeweapons:firemodehm", function(){getAttrs(["repeating_rangeweapons_firemodehm"], function(values){if(values.repeating_rangeweapons_firemodehm == 1){setAttrs({'repeating_rangeweapons_firemodeem': 0,'repeating_rangeweapons_firemodesm': 0,'repeating_rangeweapons_firemodeam': 0,'repeating_rangeweapons_firemode_ar_mod': -2,'repeating_rangeweapons_firemode_dam_mod': 1,'repeating_rangeweapons_firemode_name': "firemode_hm",})
           }
       })
    });
        on("change:repeating_rangeweapons:firemodesm", function(){ /* only ask for single changing field ... thus the element of change is obvious*/
       getAttrs(["repeating_rangeweapons_firemodesm"], function(values){
           if(values.repeating_rangeweapons_firemodesm == 1){
               setAttrs({
                   'repeating_rangeweapons_firemodehm': 0,
                   'repeating_rangeweapons_firemodeem': 0,
                   'repeating_rangeweapons_firemodeam': 0,
                   'repeating_rangeweapons_firemode_ar_mod': -4,
                   'repeating_rangeweapons_firemode_dam_mod': 2,
                   'repeating_rangeweapons_firemode_name': "firemode_sm",
               })
           }
       })
    });
        on("change:repeating_rangeweapons:firemodeam", function(){ /* only ask for single changing field ... thus the element of change is obvious*/
       getAttrs(["repeating_rangeweapons_firemodeam"], function(values){
           if(values.repeating_rangeweapons_firemodeam == 1){
               setAttrs({
                   'repeating_rangeweapons_firemodehm': 0,
                   'repeating_rangeweapons_firemodesm': 0,
                   'repeating_rangeweapons_firemodeem': 0,
                   'repeating_rangeweapons_firemode_ar_mod': -6,
                   'repeating_rangeweapons_firemode_dam_mod': 0,
                   'repeating_rangeweapons_firemode_name': "firemode_am",
               })
           }
       })
    });

    on("change:repeating_rangeweapons:firemode", function(){
       getAttrs(["repeating_rangeweapons_firemode"], function(values){
          if(values.repeating_rangeweapons_firemode > 3){setAttrs({'repeating_rangeweapons_am_visibility': 1});
          } else {setAttrs({'repeating_rangeweapons_am_visibility': 0});}
          if(values.repeating_rangeweapons_firemode % 2 == 1){setAttrs({'repeating_rangeweapons_hm_visibility': 1});
          } else {setAttrs({'repeating_rangeweapons_hm_visibility': 0});}
          if(values.repeating_rangeweapons_firemode % 4 > 1){setAttrs({'repeating_rangeweapons_sm_visibility': 1});
          } else {setAttrs({'repeating_rangeweapons_sm_visibility': 0});}
          setAttrs({'repeating_rangeweapons_em_visibility': 1,});
       })
    });
    on("change:repeating_rangeweapons:ammodamagemodifier change:repeating_rangeweapons:rangehidecomplexammo", function(){
        getAttrs(["repeating_rangeweapons_rangehidecomplexdamage","repeating_rangeweapons_ammodamagemodifier"], function(values){
            if(values.repeating_rangeweapons_rangehidecomplexdamage == "0"){
                setAttrs({
                    'repeating_rangeweapons_damagevclosemod': values.repeating_rangeweapons_ammodamagemodifier,
                    'repeating_rangeweapons_damageclosemod': values.repeating_rangeweapons_ammodamagemodifier,
                    'repeating_rangeweapons_damagemediummod': values.repeating_rangeweapons_ammodamagemodifier,
                    'repeating_rangeweapons_damagelongmod': values.repeating_rangeweapons_ammodamagemodifier,
                    'repeating_rangeweapons_damagevlongmod': values.repeating_rangeweapons_ammodamagemodifier,
                });
            }
        })
    });
    on("change:repeating_rangeweapons:ammoarmodifier change:repeating_rangeweapons:rangehidecomplexammo", function(){
        getAttrs(["repeating_rangeweapons_rangehidecomplexammo","repeating_rangeweapons_ammoarmodifier"], function(values){
            if(values.repeating_rangeweapons_rangehidecomplexammo == "0"){
                setAttrs({
                   'repeating_rangeweapons_arvclosemod': values.repeating_rangeweapons_ammoarmodifier,
                   'repeating_rangeweapons_arclosemod': values.repeating_rangeweapons_ammoarmodifier,
                   'repeating_rangeweapons_armediummod': values.repeating_rangeweapons_ammoarmodifier,
                   'repeating_rangeweapons_arlongmod': values.repeating_rangeweapons_ammoarmodifier,
                   'repeating_rangeweapons_arvlongmod': values.repeating_rangeweapons_ammoarmodifier,
                });
            }
        })
    });

    on("change:repeating_rangeweapons:rangeweapondamage change:repeating_rangeweapons:rangehidecomplexdamage", function(){
        getAttrs(["repeating_rangeweapons_rangeweapondamage","repeating_rangeweapons_rangehidecomplexdamage"], function(values){
            if(values.repeating_rangeweapons_rangehidecomplexdamage == "0"){
                setAttrs({
                    'repeating_rangeweapons_damage_vclose': values.repeating_rangeweapons_rangeweapondamage,
                    'repeating_rangeweapons_damage_close': values.repeating_rangeweapons_rangeweapondamage,
                    'repeating_rangeweapons_damage_medium': values.repeating_rangeweapons_rangeweapondamage,
                    'repeating_rangeweapons_damage_long': values.repeating_rangeweapons_rangeweapondamage,
                    'repeating_rangeweapons_damage_vlong': values.repeating_rangeweapons_rangeweapondamage,
                });
            }
        })
    });
    /* for visual purposes ... multi-connected CSS sucks*/
    on("change:repeating_rangeweapons:rangehidecomplexdamage change:repeating_rangeweapons:rangehidecomplexammo", function(){
       getAttrs(["repeating_rangeweapons_rangehidecomplexdamage","repeating_rangeweapons_rangehidecomplexammo"], function(values){
          if(values.repeating_rangeweapons_rangehidecomplexdamage == "1" && values.repeating_rangeweapons_rangehidecomplexammo == "1") {
              setAttrs({
                  'repeating_rangeweapons_rangehideboth': 1,
              });
          } else {
              setAttrs({
                  'repeating_rangeweapons_rangehideboth': 0,
              });
          }
       })
    });

    on("clicked:repeating_adeptpowers:lockrules", function(){setAttrs({'repeating_adeptpowers_toggle_rule_adeptpowers': 0,});});
    on("clicked:repeating_adeptpowers:unlockrules", function(){
        console.log("UNLOCK POWER");
        setAttrs({'repeating_adeptpowers_toggle_rule_adeptpowers': 1,});});
    on("clicked:repeating_spells:lockrules", function(){setAttrs({'repeating_spells_toggle_rule_spells': 0,});});
    on("clicked:repeating_spells:unlockrules", function(){setAttrs({'repeating_spells_toggle_rule_spells': 1,});});

    on("change:spirit_con_type1 change:spirit_con_type2 change:spirit_con_type3 change:spirit_con_type4 change:spirit_con_type1_bonus change:spirit_con_type2_bonus change:spirit_con_type3_bonus change:spirit_con_type4_bonus change:mod_magic change:mod_conjuring change:conjuring_summoning_type change:skill_conjuring_exp change:skill_conjuring_spec  change:con_fire_bonus change:con_water_bonus change:con_earth_bonus change:con_air_bonus change:con_man_bonus change:con_beast_bonus change:con_task_bonus change:con_guardian_bonus change:con_plant_bonus change:con_blood_bonus change:banishing_fire_bonus change:banishing_water_bonus change:banishing_earth_bonus change:banishing_air_bonus change:banishing_man_bonus change:banishing_beast_bonus change:banishing_task_bonus change:banishing_guardian_bonus change:banishing_plant_bonus change:banishing_blood_bonus", () => {
        getAttrs(["spirit_con_type1","spirit_con_type2","spirit_con_type3","spirit_con_type4",
                  "spirit_con_type1_bonus","spirit_con_type2_bonus","spirit_con_type3_bonus","spirit_con_type4_bonus",
                  "mod_magic","mod_conjuring","conjuring_summoning_type","skill_conjuring_spec","skill_conjuring_exp",
                  "con_fire_bonus", "con_water_bonus", "con_earth_bonus", "con_air_bonus", "con_man_bonus", "con_beast_bonus", "con_task_bonus", "con_guardian_bonus", "con_plant_bonus", "con_blood_bonus",
                  "banishing_fire_bonus", "banishing_water_bonus", "banishing_earth_bonus", "banishing_air_bonus", "banishing_man_bonus", "banishing_beast_bonus", "banishing_task_bonus", "banishing_guardian_bonus", "banishing_plant_bonus", "banishing_blood_bonus"], (v) => {
            let totalbonus = 0;
            let banbonus=0
            if("con_" + v.conjuring_summoning_type == v.spirit_con_type1){totalbonus += +v.spirit_con_type1_bonus}
            if("con_" + v.conjuring_summoning_type == v.spirit_con_type2){totalbonus += +v.spirit_con_type2_bonus}
            if("con_" + v.conjuring_summoning_type == v.spirit_con_type3){totalbonus += +v.spirit_con_type3_bonus}
            if("con_" + v.conjuring_summoning_type == v.spirit_con_type4){totalbonus += +v.spirit_con_type4_bonus}
            if("con_" + v.conjuring_summoning_type == "con_fire"){totalbonus += +v.con_fire_bonus}
            if("con_" + v.conjuring_summoning_type == "con_water"){totalbonus += +v.con_water_bonus}
            if("con_" + v.conjuring_summoning_type == "con_earth"){totalbonus += +v.con_earth_bonus}
            if("con_" + v.conjuring_summoning_type == "con_air"){totalbonus += +v.con_air_bonus}
            if("con_" + v.conjuring_summoning_type == "con_man"){totalbonus += +v.con_man_bonus}
            if("con_" + v.conjuring_summoning_type == "con_beast"){totalbonus += +v.con_beast_bonus}
            if("con_" + v.conjuring_summoning_type == "con_task"){totalbonus += +v.con_task_bonus}
            if("con_" + v.conjuring_summoning_type == "con_guardian"){totalbonus += +v.con_guardian_bonus}
            if("con_" + v.conjuring_summoning_type == "con_plant"){totalbonus += +v.con_plant_bonus}
            if("con_" + v.conjuring_summoning_type == "con_blood"){totalbonus += +v.con_blood_bonus}

            
            if("banishing_" + v.conjuring_summoning_type == v.spirit_con_type1){banbonus += +v.spirit_con_type1_bonus}
            if("banishing_" + v.conjuring_summoning_type == v.spirit_con_type2){banbonus += +v.spirit_con_type2_bonus}
            if("banishing_" + v.conjuring_summoning_type == v.spirit_con_type3){banbonus += +v.spirit_con_type3_bonus}
            if("banishing_" + v.conjuring_summoning_type == v.spirit_con_type4){banbonus += +v.spirit_con_type4_bonus}
            if("banishing_" + v.conjuring_summoning_type == "banishing_fire"){banbonus += +v.banishing_fire_bonus}
            if("banishing_" + v.conjuring_summoning_type == "banishing_water"){banbonus += +v.banishing_water_bonus}
            if("banishing_" + v.conjuring_summoning_type == "banishing_earth"){banbonus += +v.banishing_earth_bonus}
            if("banishing_" + v.conjuring_summoning_type == "banishing_air"){banbonus += +v.banishing_air_bonus}
            if("banishing_" + v.conjuring_summoning_type == "banishing_man"){banbonus += +v.banishing_man_bonus}
            if("banishing_" + v.conjuring_summoning_type == "banishing_beast"){banbonus += +v.banishing_beast_bonus}
            if("banishing_" + v.conjuring_summoning_type == "banishing_task"){banbonus += +v.banishing_task_bonus}
            if("banishing_" + v.conjuring_summoning_type == "banishing_guardian"){banbonus += +v.banishing_guardian_bonus}
            if("banishing_" + v.conjuring_summoning_type == "banishing_plant"){banbonus += +v.banishing_plant_bonus}
            if("banishing_" + v.conjuring_summoning_type == "banishing_blood"){banbonus += +v.banishing_blood_bonus}
            

            
            if(v.conjuring_summoning_type == v.spirit_detection_type){totalbonus += +v.conjuring_detection}
            totalbonus += +v.mod_magic;
            totalbonus += +v.mod_conjuring;
            banbonus += +v.mod_magic;
            banbonus += +v.mod_conjuring;

            if(v.skill_conjuring_spec.toLowerCase() ==getTranslationByKey("conjuration_title").toLowerCase() || v.skill_conjuring_spec.toLowerCase() == "conjuring"){totalbonus += 2; }
            if(v.skill_conjuring_exp.toLowerCase() ==getTranslationByKey("conjuration_title").toLowerCase() || v.skill_conjuring_exp.toLowerCase() == "conjuring"){totalbonus += 3; }
            if(v.skill_conjuring_spec.toLowerCase() ==getTranslationByKey("banishing_title").toLowerCase() || v.skill_conjuring_spec.toLowerCase() == "banishing"){banbonus += 2; }
            if(v.skill_conjuring_exp.toLowerCase() ==getTranslationByKey("banishing_title").toLowerCase() || v.skill_conjuring_exp.toLowerCase() == "banishing"){banbonus += 3; }


            log(totalbonus+ "= " + v.mod_magic+ " +" +v.mod_conjuring + "+ " + v.conjuring_summoning_type + " =?" + v.spirit_con_type1 + " " + v.spirit_con_type1_bonus  )
            setAttrs({
                conjuring_bonus: +totalbonus,
                banishing_bonus: +banbonus
            })
        })
    });

    on("change:repeating_spells:spellaktive",function(eventInfo){
        repeatingSum("sustain_count","spells",["spellaktive"]);
        
    }
    );

    on("sheet:opened change:skill_sorcery_exp change:skill_sorcery_spec change:spell_combat_bonus change:spell_health_bonus change:spell_illusion_bonus change:spell_manipulation_bonus change:spell_detection_bonus change:mod_magic change:mod_spells change:spell_combat_bonus2 change:spell_health_bonus2 change:spell_illusion_bonus2 change:spell_manipulation_bonus2 change:spell_detection_bonus2",function(){
        getSectionIDs("repeating_spells", pids=>{
            getAttrs(["spell_combat_bonus","spell_health_bonus","spell_illusion_bonus","spell_manipulation_bonus",
                      "spell_detection_bonus","mod_magic","mod_spells","skill_sorcery_spec","skill_sorcery_exp",
                      "spell_combat_bonus2", "spell_health_bonus2", "spell_illusion_bonus2", "spell_manipulation_bonus2", "spell_detection_bonus2"], (v) => {
                let attrArray =[];
                pids.forEach(id=>{attrArray.push("repeating_spells_" + id + "_spellscategory" )});
                
                getAttrs(attrArray,(vr)=>{

                    const getValue = (id, field) => vr[`repeating_spells_${id}_${field}`];
        
                    pids.forEach(id=>{
                   log("Check:" + id )
                        let cat=getValue(id,"spellscategory");
                            log(cat);
                        let totalbonus = 0;
                        if(cat == "spells_combat_indirect" || cat == "spells_combat_direct"){totalbonus += +pInt(v.spell_combat_bonus)+pInt(v.spell_combat_bonus2);}
                        if(cat == "spells_health"){totalbonus += +v.spell_health_bonus + pInt(v.spell_health_bonus2);}
                        if(cat == "spells_illusion"){totalbonus += +v.spell_illusion_bonus+pInt(v.spell_illusion_bonus2);}
                        if(cat == "spells_manipulation"){totalbonus += +v.spell_manipulation_bonus+pInt(v.spell_manipulation_bonus2);}
                        if(cat == "spells_detection"){totalbonus += +v.spell_detection_bonus+pInt(v.spell_detection_bonus2);}
                        
                        if(v.skill_sorcery_spec.toLowerCase() ==getTranslationByKey("sorcery").toLowerCase() || v.skill_sorcery_spec.toLowerCase() == "spellingcasting"){totalbonus += 2; }
                        
                        if(v.skill_sorcery_exp.toLowerCase() == getTranslationByKey("sorcery").toLowerCase() || v.skill_sorcery_exp.toLowerCase() == "spellingcasting"){totalbonus += 3}
                        totalbonus += +v.mod_magic;
                        totalbonus += +v.mod_spells;
                        console.log("Over base " + totalbonus + " = " + v.spell_combat_bonus + " " + v.spell_health_bonus + " " + v.spell_illusion_bonus + " " + v.spell_manipulation_bonus + " " + v.spell_detection_bonus + " / " + v.mod_magic + " / " + v.mod_spells + " | " + cat);
                        setAttrs({
                            ["repeating_spells_"+ id + "_sorcery_bonus"]: +totalbonus,
                        })
                    });
                    
                });
                

            });
        });
    });

    on("change:repeating_spells:spellscategory", () => {
            getAttrs(["spell_combat_bonus","spell_health_bonus","spell_illusion_bonus","spell_manipulation_bonus","spell_detection_bonus","mod_magic","mod_spells","repeating_spells_spellscategory","skill_sorcery_spec","skill_sorcery_exp"], (v) => {
                let totalbonus = 0;
                if(v.repeating_spells_spellscategory == "spells_combat_indirect" || v.repeating_spells_spellscategory == "spells_combat_direct"){totalbonus += +v.spell_combat_bonus;}
                if(v.repeating_spells_spellscategory == "spells_health"){totalbonus += +v.spell_health_bonus;}
                if(v.repeating_spells_spellscategory == "spells_illusion"){totalbonus += +v.spell_illusion_bonus;}
                if(v.repeating_spells_spellscategory == "spells_manipulation"){totalbonus += +v.spell_manipulation_bonus;}
                if(v.repeating_spells_spellscategory == "spells_detection"){totalbonus += +v.spell_detection_bonus;}
                
                if(v.skill_sorcery_spec.toLowerCase()  ==getTranslationByKey("sorcery").toLowerCase()|| v.skill_sorcery_spec.toLowerCase() == "sorcery"){totalbonus += 2; console.log("#2");}
                
                if(v.skill_sorcery_exp.toLowerCase()  ==getTranslationByKey("sorcery").toLowerCase()|| v.skill_sorcery_exp.toLowerCase() == "sorcery"){totalbonus += 3}
                totalbonus += +v.mod_magic;
                totalbonus += +v.mod_spells;
                console.log(totalbonus + " = " + v.spell_combat_bonus + " " + v.spell_health_bonus + " " + v.spell_illusion_bonus + " " + v.spell_manipulation_bonus + " " + v.spell_detection_bonus + " / " + v.mod_magic + " / " + v.mod_spells + " | " + v.repeating_spells_spellscategory);
                setAttrs({
                    repeating_spells_sorcery_bonus: +totalbonus,
                })
            })
    });

    on("change:repeating_spells:spellscategory change:repeating_spells:spelldrainampup", () => {
        getAttrs(["repeating_spells_spellscategory","repeating_spells_spelldrainampup","display_magic"], (v) => {
          console.log(v.repeating_spells_spellscategory + ", " + v.repeating_spells_spelldrainampup + ", " + v.display_magic + ", " +Math.ceil(v.display_magic/2));
          if(v.repeating_spells_spellscategory == "spells_combat_indirect"){
              setAttrs({
                  repeating_spells_spelldamage: +Math.ceil(v.display_magic/2) + +v.repeating_spells_spelldrainampup,
              })
          }
          if(v.repeating_spells_spellscategory == "spells_combat_direct"){
              setAttrs({
                  repeating_spells_spelldamage: +v.repeating_spells_spelldrainampup,
              })
          }
          if(!v.repeating_spells_spellscategory.includes("combat")){
              setAttrs({
                  repeating_spells_spelldamage: 0,
                  repeating_spells_spelldrainampup: 0,
              })
          }
        })
    });

 /*   on("change:display_magic", () => {
        getAttrs(["repeating_spells_spellscategory","repeating_spells_spelldrainampup","display_magic"], (v) => {
          console.log(v.repeating_spells_spellscategory + ", " + v.repeating_spells_spelldrainampup + ", " + v.display_magic + ", " +Math.ceil(v.display_magic/2));
          if(v.repeating_spells_spellscategory == "spells_combat_indirect"){
              setAttrs({
                  repeating_spells_spelldamage: +Math.ceil(v.display_magic/2) + +v.repeating_spells_spelldrainampup,
              })
          }
          if(v.repeating_spells_spellscategory == "spells_combat_direct"){
              setAttrs({
                  repeating_spells_spelldamage: +v.repeating_spells_spelldrainampup,
              })
          }
          if(!v.repeating_spells_spellscategory.includes("combat")){
              setAttrs({
                  repeating_spells_spelldamage: 0,
                  repeating_spells_spelldrainampup: 0,
              })
          }
        })
    });*/
    on("change:togglespelldetails change:repeating_spells:togglespelldetails", () => {
        getAttrs(["togglespelldetails"], (v) => {
            getSectionIDs('repeating_spells', (idarray) => {
                idarray.forEach(id => {
                    setAttrs({
                        [`repeating_spells_${id}_togglespelldetails`]: v.togglespelldetails,
                    });
                });
            })
       });
    })








