const modmap = {
    "str":"for",
    "wis":"sag",
}

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
    let _name = attr_name?.toLowerCase();
    let filteredModifierList = [];
    for(let modifier of modifiersList){
        const applyToOther = modifier.applyToOther?.map(apply => apply?.toLowerCase());
        const applyToOtherMap = modifier.applyToOther?.map(apply => modmap[apply?.toLowerCase()]);
        if(modifier.applyTo.endsWith("_all") || !_name || modifier.applyTo.endsWith(_name) ||
            (modifier.applyTo.endsWith("_other") && applyToOther?.includes(_name)) ||
            (modifier.applyTo.endsWith("_other") && applyToOtherMap?.includes(_name))
        ){
            let type = modifier.type;
            //Untyped && circumstance always apply
            if(type === "untyped" || type === "circumstance" || type === "dodge"){
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
            return updateAllCharacteristics;
        case "init":
            return updateInitiative;
        case "speed":
            return updateSpeed;
        case "skill":
            return updateAllSkills;
        case "save":
            return updateAllSaves;
        case "armor":
            return updateArmor;
        default:
            return () => {};
    }
}
