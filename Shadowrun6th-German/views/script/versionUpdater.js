on("sheet:opened",function(){
    let newversion=2;
    getAttrs(["version","magic_conjuring_attribute","magic_sorcery_attribute","magic_enchanting_attribute",
                        "display_magic","display_powerpoints","display_resonance"],function(v){
        if (pInt(v.version)<1){
            updatetoVersion1(v,newversion);
        }else if (pInt(v.version)<2) 
        {
            updatetoVersion2(v,newversion);
        }
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
    