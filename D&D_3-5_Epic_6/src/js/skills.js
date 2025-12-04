/*Update Skills*/
on("change:repeating_skills", function(eventInfo) {
    let skillId= eventInfo.triggerName;
    if(eventInfo.sourceAttribute.includes("options-flag")){
        return;
    }
    getModifiersByTypeAndUpdateValues(applicationTypes.skill,updateAllSkills,skillId);
});

let updateAllSkills = (modifierList, skillId) => {
    if (skillId) {
        return updateSkillList([skillId], modifierList);
    }
    getSectionIDs("repeating_skills", function (idarray) {
        return updateSkillList(idarray.map(id => "repeating_skills_"+id), modifierList);
    });
}
function updateSkillList(skillList,modifierList){
    let toGet = [];
    for(let skillId of skillList) {
        toGet.push(skillId + "_name");
        toGet.push(skillId + "_ranks");
        toGet.push(skillId + "_mod");
        toGet.push(skillId + "_mod");
        toGet.push(skillId + "_carac");
        toGet.push(skillId + "_total");
        toGet.push(skillId + "_has_armor_malus");
        toGet.push(skillId + "_caracname");
    }
    toGet.push("skills_malus");
    toGet.push("for_mod");
    toGet.push("dex_mod");
    toGet.push("con_mod");
    toGet.push("int_mod");
    toGet.push("sag_mod");
    toGet.push("cha_mod");

    getAttrs(toGet,function (values){
        let skills_malus = parseInt(values.skills_malus) || 0;
        let caracs = {};
        caracs["for_mod"] = parseInt(values.for_mod) || 0;
        caracs["dex_mod"] = parseInt(values.dex_mod) || 0;
        caracs["con_mod"] = parseInt(values.con_mod) || 0;
        caracs["int_mod"] = parseInt(values.int_mod) || 0;
        caracs["sag_mod"] = parseInt(values.sag_mod) || 0;
        caracs["cha_mod"] = parseInt(values.cha_mod) || 0;

        let toUpdate = {};
        for(let skillId of skillList) {
            let name = values[`${skillId}_name`];
            //Si pas de nom on continue
            if(!name){
                continue;
            }
            let malus = values[`${skillId}_has_armor_malus`];
            let skill_malus = 0;
            if(malus === "on"){
                skill_malus = skills_malus;
            }
            if(malus === "double"){
                skill_malus = skills_malus * 2;
            }
            let rank = parseInt(values[`${skillId}_ranks`]) || 0;
            let carac = values[`${skillId}_carac`];
            let mod = parseInt(values[`${skillId}_mod`]) || 0;
            let synergy = parseInt(values[`${skillId}_synergy`]) || 0;
            carac = carac.replace("@{", "").replace("}", "");
            let caracname = carac.split("_")[0];
            if(getTranslationByKey(`attribute.${caracname}`)){
                caracname = getTranslationByKey(`attribute.${caracname}`)
            }
            caracname = caracname.charAt(0).toUpperCase() + caracname.slice(1).toLowerCase();
            caracname = "(" + caracname + ")";
            let caracVal = caracs[carac] || 0;
            let mods = 0;
            let total = rank + caracVal + skill_malus + synergy + mod;
            let roll = `${rank}[rank] + ${caracVal}[${carac}] + ${mod}[General Modifier] + ${synergy}[Synergy]`;
            if(skill_malus){
                roll += ` ${skill_malus}[Armor Malus]`
            }
            let filteredModifiers = getLargestModifierOfEachTypeFor(modifierList,name);
            for(let modifier of filteredModifiers){
                mods+= modifier.value;
                roll += `+${modifier.value}[${modifier.name}(${modifier.type})]`;
            }
            toUpdate[`${skillId}_modified`] = (!!mods);
            toUpdate[`${skillId}_total`] = total+mods;
            toUpdate[`${skillId}_skillrollvalue`] = `&{template:main} {{titre=^{rolltemplate.rollof} '@{name}'}} {{subtitle=@{character_name} }} {{Jet=[[1d20+${roll}]]}}`;
            toUpdate[`${skillId}_caracname`] = caracname;
        }
        setAttrs(toUpdate, {silent: true});
    });
}
