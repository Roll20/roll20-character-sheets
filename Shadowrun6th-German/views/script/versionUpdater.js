on("sheet:opened",function(){
    getAttrs(["version","magic_conjuring_attribute","magic_sorcery_attribute","magic_enchanting_attribute",
                        "display_magic","display_powerpoints"],function(v){
        if (pInt(v.version)<1){
            updatetoVersion1(v)
        }
    });
    
});
function updatetoVersion1(v){
    setAttrs({version:1,
        skill_conjuring_attribute:pInt(v.magic_conjuring_attribute),
        skill_enchanting_attribute:pInt(v.magic_enchanting_attribute),
        skill_sorcery_attribute:pInt(v.magic_sorcery_attribute),
        magic_base:pInt(v.display_magic),
        adeptpowerpoints:pInt(v.display_powerpoints)
    });
}
    