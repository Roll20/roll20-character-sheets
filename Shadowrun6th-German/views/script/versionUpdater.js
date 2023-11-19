on("sheet:opened",function(){
    let newversion=2;
    getAttrs(["version","magic_conjuring_attribute","magic_sorcery_attribute","magic_enchanting_attribute",
                        "display_magic","display_powerpoints","display_resonance",
                        "skill_conjuring_spec","skill_conjuring_exp","skill_sorcery_spec","skill_sorcery_exp"],function(v){
        if (pInt(v.version)<1){
            updatetoVersion1(v,newversion);
        }else if (pInt(v.version)<2) 
        {
            updatetoVersion2(v,newversion);
        }
        if (v.skill_conjuring_spec.toString().toLowerCase().startsWith("beschw")) setAttrs({skill_conjuring_spec:"conjuring"});
        if (v.skill_conjuring_exp.toString().toLowerCase().startsWith("beschw")) setAttrs({skill_conjuring_exp:"conjuring"});
        if (v.skill_conjuring_spec.toString().toLowerCase().startsWith("verb")){ log("Verbannung:"); setAttrs({skill_conjuring_spec:"banishing"});}
        if (v.skill_conjuring_exp.toString().toLowerCase().startsWith("verb")) setAttrs({skill_conjuring_exp:"banishing"});

        if (v.skill_sorcery_spec.toString().toLowerCase().startsWith("spruch")) setAttrs({skill_sorcery_spec:"spellingcasting"});
        if (v.skill_sorcery_exp.toString().toLowerCase().startsWith("spruch")) setAttrs({skill_sorcery_exp:"spellingcasting"});
        if (v.skill_sorcery_spec.toString().toLowerCase().startsWith("anti")) setAttrs({skill_sorcery_spec:"rituals"});
        if (v.skill_sorcery_exp.toString().toLowerCase().startsWith("anti")) setAttrs({skill_sorcery_exp:"rituals"});
        if (v.skill_sorcery_spec.toString().toLowerCase().startsWith("ritu")) setAttrs({skill_sorcery_spec:"counterspelling"});
        if (v.skill_sorcery_exp.toString().toLowerCase().startsWith("ritu")) setAttrs({skill_sorcery_exp:"counterspelling"});

        
        
    });
    
});
function updatetoVersion1(v,newversion){
    setAttrs({version:newversion,
        skill_conjuring_attribute:v.magic_conjuring_attribute,
        skill_enchanting_attribute:v.magic_enchanting_attribute,
        skill_sorcery_attribute:v.magic_sorcery_attribute,
        magic_base:pInt(v.display_magic),
        resonance_base:pInt(v.display_resonance),
        adeptpowerpoints:pInt(v.display_powerpoints)
    });
}
function updatetoVersion2(v,newversion){
    setAttrs({version:newversion,
        resonance_base:pInt(v.display_resonance),
      });
}
    