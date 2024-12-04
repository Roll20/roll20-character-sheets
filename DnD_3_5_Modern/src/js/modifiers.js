/* Concept : Construire une liste de modificateurs


 */

const modifiersTypes = ["alchemical", "circumstance", "competence", "enhancement", "insight", "luck", "morale",
    "profane", "racial", "resistance", "sacred", "divine", "epic", "untyped"];
const modifiersApplicationSubTypes = ["carac_all", "carac_other", "init", "speed", "skill_all", "skill_other",
    "save_all", "save_ref", "save_vig", "save_vol", "armor_ca", "armor_cac", "armor_cad"];
const modifiersApplicationTypes = ["carac", "init", "speed", "skill", "saves", "armor"];

on("change:repeating_modifiers", (eventInfo) => {
    let modifierId = eventInfo.triggerName;
    if (eventInfo.sourceAttribute.includes("options-flag")) {
        return;
    }
    updateModifierAndApplyChanges(modifierId);
});

//Update Modifier Description, then call getModifiersByTypeAndUpdateValue
let updateModifierAndApplyChanges = (modifier_id) => {
    const attr_applyTo = modifier_id + "_apply-to";
    const attr_applyToOther = modifier_id + "_apply-to-other";
    getAttrs([attr_applyTo, attr_applyToOther], (attrs) => {
        let applyTo = attrs[attr_applyTo]
        let applyToOther = attrs[attr_applyToOther]
        let applicationType = applyTo?.split("_")[0];
        let applyToDesc = applicationType;
        if(applyTo.endsWith("_other")){
            applyToDesc += " x"+applyToOther.split(/[,;]/).length;
        }
        if(applyTo.endsWith("_all")){
            applyToDesc += " (Toutes)";
        }
        //Get the method associated with this modifier ApplicationType
        let callback = getModifierCallBackByApplicationType(applicationType);
        let toUpdate= {};
        toUpdate[modifier_id+"_apply-to-desc"] = applyToDesc;
        setAttrs(toUpdate,{silent:true}, () =>{
            getModifiersByTypeAndUpdateValues(applicationType,callback,null);
        });
    });
}

//Get all modifiers Id then call a recursive method to build a list of modifiers
let getModifiersByTypeAndUpdateValues = (applicationType,callback,callback_id) => {
    getSectionIDs("repeating_modifiers", (idArray) => {
        getNextModifierByTypeAndUpdateValues(idArray, [], applicationType,callback,callback_id);
    });
}

/*
    - Get the last entry of modifierToGetList and remove it from the list
    - if last entry is enabled and is of type applicationType, add it to modifierList as an object.
    - If modifierToGetList is empty,call callback with modifiers and callback_id
 */
let getNextModifierByTypeAndUpdateValues = (modifierToGetList,modifierList,applicationType,callback,callback_id) =>{
    if(!modifierToGetList?.length){
        return callback(modifierList,callback_id);
    }
    let newModifierToGetList = [...modifierToGetList];

    let id = "repeating_modifiers_" + newModifierToGetList.pop();
    let name = id + "_name";
    let enabled = id + "_enabled";
    let value = id + "_value";
    let type = id + "_type";
    let applyTo = id + "_apply-to";
    let applyToOther = id + "_apply-to-other";
    getAttrs([id,name,enabled,value,type,applyTo,applyToOther],(attrs) => {
        let modifier = {
            name : attrs[name],
            enabled : attrs[enabled],
            value : Number(attrs[value]),
            type : attrs[type],
            applyTo : attrs[applyTo],
            applyToOther : attrs[applyToOther]?.split(/[,;]/)
        };
        if(modifier.enabled === "on" && modifier.applyTo?.startsWith(applicationType)){
            modifierList.push(modifier)
        }
        getNextModifierByTypeAndUpdateValues(newModifierToGetList,modifierList,applicationType,callback,callback_id);
    });
}

let getLargestModifierOfEachTypeFor = (modifiersList,attr_name) =>{
    let types = {};
    let filteredModifierList = []
    debugger;
    for(let modifier of modifiersList){
        if(modifier.applyTo.endsWith("_all") ||
            (modifier.applyTo.endsWith("_other") && modifier.applyToOther.includes(attr_name))
        ){
            let type = modifier.type;
            //Untyped && circumstance always apply
            if(type === "untyped" || type === "circumstance"){
                filteredModifierList.push(modifier);
                continue;
            }
            let val = modifier.value;
            if(!types[type] || types[type].value < modifier.value){
                types[type] = modifier;
            }
        }
    }
    for(let key in types){
        filteredModifierList.push(types[key]);
    }
    return filteredModifierList;
}
let getModifierCallBackByApplicationType = (applicationType) =>{
    switch (applicationType) {
        case "carac":
            return updateAllAttributes;
        case "init":
            return updateInitiative;
        case "speed":
            return updateSpeed;
        case "skill":
            return updateAllSkills;
        case "saves":
            return updateAllSaves;
        case "armor":
            return updateAllArmors;
        default:
            return () => {};
    }
}
