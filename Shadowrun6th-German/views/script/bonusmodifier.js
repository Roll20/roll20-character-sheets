function updatestatusmodifier(allids,attrArray)
{
    const output = {body_statusmodifier:0,agility_statusmodifier:0,reaction_statusmodifier:0,strength_statusmodifier:0,willpower_statusmodifier:0,
        logic_statusmodifier:0,intuition_statusmodifier:0,charisma_statusmodifier:0,edge_statusmodifier:0,composure_statusmodifier:0,soak_statusmodifier:0,soakstun_statusmodifier:0,
        phys_monitor_shift:0,stun_monitor_shift:0,allmod:0,
        wounds_mod:0,judgeintent_statusmodifier:0,memory_statusmodifier:0,liftcarry_statusmodifier:0,ini_statusmodifier:0,inidice_statusmodifier:0,iniphys_statusmodifier:0,
        inidicematrix_statusmodifier:0,inimatrix_statusmodifier:0,iniastral_statusmodifier:0,skill_astral_statusmodifier:0,skill_athletics_statusmodifier:0,skill_biotech_statusmodifier:0,
        skill_cracking_statusmodifier:0,skill_influence_statusmodifier:0,skill_electronics_statusmodifier:0,skill_firearms_statusmodifier:0,skill_stealth_statusmodifier:0,
        skill_engineering_statusmodifier:0,skill_melee_statusmodifier:0,skill_outdoors_statusmodifier:0,skill_piloting_statusmodifier:0,skill_con_statusmodifier:0,
        skill_perception_statusmodifier:0,skill_conjuring_statusmodifier:0,skill_sorcery_statusmodifier:0,skill_enchanting_statusmodifier:0,skill_task_statusmodifier:0,
        con_fire_bonus:0,con_water_bonus:0,con_earth_bonus:0,con_air_bonus:0,con_man_bonus:0,con_beast_bonus:0,con_task_bonus:0,con_guardian_bonus:0,con_plant_bonus:0,con_blood_bonus:0,
        banishing_fire_bonus:0,banishing_water_bonus:0,banishing_earth_bonus:0,banishing_air_bonus:0,banishing_man_bonus:0,banishing_beast_bonus:0,banishing_task_bonus:0,banishing_guardian_bonus:0,banishing_plant_bonus:0,banishing_blood_bonus:0,
        mod_magic:0,drain_mod2:0,sustain_mod2:0,defence_statusmodifier:0,
        foki_metamagic_form:0,foki_metamagic_mask:0,foki_metamagic_signature:0,drain_mod:0,foki_qi:0,foki_entchantment:0,foki_disentchantment:0,foki_weapon:0,foki_spell_conterspell:0,foki_spell_rituals:0,foki_spell_container:0,
        spell_combat_bonus2:0,spell_health_bonus2:0,spell_illusion_bonus2:0,spell_manipulation_bonus2:0,spell_detection_bonus2:0,
};
    //  log("Getattrs:" + attrArray )
    getAttrs([...attrArray], v => {

        const getValue = (id, field) => v[`${id}_${field}`];
        
        allids.forEach(id=>{
          // log("Check:" + id )
         
            if (getValue(id,"active")==1){
                let attr=getValue(id,"attribute");
                if (attr && attr!="") output[attr]+=pInt(getValue(id,"bonus"));
                attr=getValue(id,"attribute2");
                if (attr && attr!="") output[attr]+=pInt(getValue(id,"bonus2"));
            }   
           
            
        });
        output.sustain_mod2=output.sustain_mod2*-1
        setAttrs(output);
       }); 
}

function countStates(){
    let attrArray =[]
    let allids =[]
    getSectionIDs("repeating_states", idArray => {
        getAttributes(idArray,"repeating_states",allids,attrArray);
        //LoadCyberware
        getSectionIDs("repeating_cyberware", cids=>{
            getAttributes(cids,"repeating_cyberware",allids,attrArray);
            getSectionIDs("repeating_perks", pids=>{
                getAttributes(pids,"repeating_perks",allids,attrArray);
                getSectionIDs("repeating_perks", pids=>{
                    getAttributes(pids,"repeating_perks",allids,attrArray);
                    getSectionIDs("repeating_focus", pids=>{
                        getAttributes(pids,"repeating_focus",allids,attrArray);
                        getSectionIDs("repeating_adeptpowers", pids=>{
                            getAttributes(pids,"repeating_adeptpowers",allids,attrArray);
                            updatestatusmodifier(allids,attrArray);
                        });
                    });
                });
            });
        });
    }); 
}

on("sheet:opened change:repeating_states remove:repeating_states change:repeating_cyberware remove:repeating_cyberware change:repeating_perks remove:repeating_perks change:repeating_gear remove:repeating_gear change:repeating_focus remove:repeating_focus change:repeating_adeptpowers remove:repeating_adeptpowers ",function(){
    countStates();
 });