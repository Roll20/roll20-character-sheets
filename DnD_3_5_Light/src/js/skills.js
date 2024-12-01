/*Update Skills*/
on("change:repeating_skills", function(eventInfo) {
    let skillId= eventInfo.triggerName;
    if(eventInfo.sourceAttribute.includes("options-flag")){
        return;
    }
    updateSkill(skillId);
});

function updateSkill(skillId){
    const rankAttr = skillId+"_ranks";
    const modAttr = skillId+"_mod";
    const caracAttr = skillId+"_carac";
    const totalAttr = skillId+"_total";
    const malusAttr = skillId+"_has_armor_malus";
    const caracnameAttr = skillId+"_caracname";
    getAttrs(["skills_malus",modAttr,rankAttr,caracAttr,malusAttr],function (values){
        let malus = values[malusAttr] == "on";
        let skills_malus = malus ? (parseInt(values.skills_malus)||0) : 0;
        let rank = parseInt(values[rankAttr])||0;
        let carac = values[caracAttr];
        let mod = parseInt(values[modAttr])||0;
        carac = carac.replace("@{","").replace("}","");
        let caracname = carac.split("_")[0];
        caracname = caracname.charAt(0).toUpperCase() + caracname.slice(1);
        caracname = "("+caracname+")";
        getAttrs([carac],function(values){
            let caracVal = parseInt(values[carac])||0;
            let total = rank+caracVal+mod+skills_malus;
            let update = {};
            update[totalAttr] = total;
            update[caracnameAttr] = caracname;
            setAttrs(update,{silent:true});
        });
    });
}