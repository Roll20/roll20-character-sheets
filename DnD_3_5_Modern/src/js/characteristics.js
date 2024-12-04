/* CARACTERISTICS UPDATE */
on("change:for_base change:for_bonus",function(){
    updateAttributeList(["for"],[]);
});

on("change:dex_base change:dex_bonus",function(){
    updateAttributeList(["dex"],[]);
});

on("change:con_base change:con_bonus",function(){
    updateAttributeList(["con"],[]);
});

on("change:int_base change:int_bonus",function(){
    updateAttributeList(["int"],[]);
});

on("change:sag_base change:sag_bonus",function(){
    updateAttributeList(["sag"],[]);
});

on("change:cha_base change:cha_bonus",function(){
    updateAttributeList(["cha"],[]);
});

const allAttributes = ["for","dex","con","int","sag","cha"];

let updateAllAttributes = (modifierList,attribute_name) =>{
    if(attribute_name){
        return updateAttributeList([attribute_name],modifierList);
    }
    return updateAttributeList(allAttributes,modifierList);
}
let updateAttributeList = (attributeList,modifierList)=> {
    let toGet = [];
    for (let attribute of attributeList) {
        toGet.push(attribute + "_base");
        toGet.push(attribute + "_bonus")
    }
    getAttrs(toGet, (values) => {
        let toUpdate = {}
        for(let attribute of attributeList){
            let base = parseInt(values[attribute+"_base"])||0;
            let bonus = parseInt(values[attribute+"_bonus"])||0;
            let total = base+bonus;
            let filteredModifierList = getLargestModifierOfEachTypeFor(modifierList,attribute);
            for(let modifier of filteredModifierList){
                total+= modifier.value;
            }

            let modded = total !== base;
            if(total % 2 == 1){
                total--;
            }
            let mod = (total-10)/2;
            toUpdate[attribute+"_modified"] = modded?"true":"false";
            toUpdate[attribute+"_mod"] = mod;
            toUpdate[attribute+"_total"] = ""+total;
        }
        setAttrs(toUpdate);
    });
}

on("change:for_mod change:dex_mod change:con_mod change:int_mod change:sag_mod change:cha_mod change:skills_malus",function(){
    getSectionIDs("skills", function (idarray) {
        for (var i = 0; i < idarray.length; i++) {
            updateSkill("repeating_skills_"+idarray[i]);
        }
    });
    getSectionIDs("attaques", function (idarray) {
        for (var i = 0; i < idarray.length; i++) {
            updateAtq("repeating_attaques_"+idarray[i]);
        }
    });
});