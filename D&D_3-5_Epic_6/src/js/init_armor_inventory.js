/*Update init*/
on("change:dex_mod change:init_bonus",function(){
    getModifiersByTypeAndUpdateValues(applicationTypes.init, updateInitiative, null);
});

let updateInitiative = (modifierList) => {
    getAttrs(["dex_total","dex_mod","init_bonus"],function(values){
        let dex_mod = parseInt(values.dex_mod)||0;
        let init_bonus = parseInt(values.init_bonus)||0;
        let dex_total = parseInt(values.dex_total)||0;
        let filteredModifiersList = getLargestModifierOfEachTypeFor(modifierList,null);
        let roll = `1d20+${dex_mod}[dex]+${init_bonus}[legacy bonus]`;
        for(let modifier of filteredModifiersList){
            let str_mod = (modifier.value < 0) ? ""+modifier.value : "+"+modifier.value;
            roll+=`${str_mod}[${modifier.name}(${modifier.type})]`;
            init_bonus += modifier.value;
        }
        const init_tot = dex_mod+init_bonus+(dex_total/100);
        const init_roll = `&{template:main} {{titre=Initiative}} {{subtitle=@{character_name}}} {{Jet=[[${roll} &{tracker}]]}}`;
        setAttrs({
            "init_modified": ""+(init_bonus !== 0),
            "init_rol_value":init_roll,
            "init_tot":init_tot
        });
    });
}

on("change:vit_base", () =>{
    getModifiersByTypeAndUpdateValues(applicationTypes.speed, updateSpeed, null);
});

let updateSpeed = (modifierList) =>{
    getAttrs(["vit_base"], (attrs) => {
        let vit_base = parseFloat(attrs.vit_base)||0;
        let vit_total = vit_base;
        let filteredModifierList = getLargestModifierOfEachTypeFor(modifierList,null);
        for(let modifier of filteredModifierList){
            vit_total += modifier.value;
        }
        let toUpdate = {};
        toUpdate.vit_total = vit_total;
        toUpdate.vit_modified = ""+(vit_total !== vit_base);
        setAttrs(toUpdate,{silent:true});
    });
}

/*Update armor*/
on("change:armor_bonus change:armor_malus change:armor_max_dex change:armor_equipe change:shield_bonus change:shield_malus change:shield_equipe change:touch_bonus change:flatfooted_bonus change:universal_armor_bonus change:dex_mod",function(){
    getModifiersByTypeAndUpdateValues(applicationTypes.armor, updateArmor, null);
});

let updateArmor = (modifierList) => {
    getAttrs(["armor_bonus","armor_malus","armor_max_dex","size","armor_equipe","shield_bonus","shield_malus","shield_equipe","touch_bonus","flatfooted_bonus","universal_armor_bonus","dex_mod"],function(values){
        let armor_equipe = values.armor_equipe === "on";
        let armor_bonus = armor_equipe ? parseInt(values.armor_bonus) || 0 : 0;
        let armor_malus = armor_equipe ? parseInt(values.armor_malus) || 0 : 0;
        let armor_max_dex = armor_equipe ? parseInt(values.armor_max_dex) || 0 : 0;
        let size = parseInt(values.size) || 0;
        if(armor_max_dex < 0) armor_max_dex = 1000;
        let shield_equipe = values.shield_equipe === "on";
        let shield_bonus = shield_equipe ? (parseInt(values.shield_bonus) || 0) : 0;
        let shield_malus = shield_equipe ? (parseInt(values.shield_malus) || 0) : 0;
        let touch_bonus = parseInt(values.touch_bonus) || 0;
        let flatfooted_bonus = parseInt(values.flatfooted_bonus) || 0;
        let universal_armor_bonus = parseInt(values.universal_armor_bonus) || 0;
        let dex_mod = parseInt(values.dex_mod) || 0;
        let dex = dex_mod
        if(armor_equipe && armor_max_dex < dex_mod){
            dex = armor_max_dex;
        }
        let universalArmorModifier = 0;
        let touchArmorModifier = 0;
        let flatArmorModifier = 0;
        if(modifierList?.length) {
            let universalArmorModifierList = ([...modifierList]).filter(modifier => modifier.applyTo === "armor_ca");
            universalArmorModifierList = getLargestModifierOfEachTypeFor(universalArmorModifierList, null);
            for (let modifier of universalArmorModifierList) {
                universalArmorModifier += modifier.value;
            }
            let touchArmorModifierList = ([...modifierList]).filter(modifier => modifier.applyTo === "armor_cac");
            touchArmorModifierList = getLargestModifierOfEachTypeFor(touchArmorModifierList, null);
            for (let modifier of touchArmorModifierList) {
                touchArmorModifier += modifier.value;
            }
            let flatArmorModifierList = ([...modifierList]).filter(modifier => modifier.applyTo === "armor_cad");
            flatArmorModifierList = getLargestModifierOfEachTypeFor(flatArmorModifierList, null);
            for (let modifier of flatArmorModifierList) {
                flatArmorModifier += modifier.value;
            }
        }
        let AC = 10 + armor_bonus + dex + shield_bonus + touch_bonus + flatfooted_bonus + universal_armor_bonus
            + universalArmorModifier + touchArmorModifier + flatArmorModifier;
        let TAC = 10 +dex + touch_bonus + universal_armor_bonus + universalArmorModifier + touchArmorModifier;
        let FFAC = 10 + (dex < 0 ? dex : 0) + armor_bonus + shield_bonus + flatfooted_bonus + universal_armor_bonus + universalArmorModifier + flatArmorModifier;
        let skill_malus = (shield_malus > 0 ? -shield_malus : shield_malus) - (armor_malus < 0 ? -armor_malus : armor_malus);
        setAttrs({
            "ac_tot":AC,
            "ac_tot_t":TAC,
            "ac_tot_ff":FFAC,
            "skills_malus":skill_malus
        });
    });
}

/*Update resume */
on('clicked:inv_refresh',function() {
    getSectionIDs("inventaire", function (idarray) {
        for (var i = 0; i < idarray.length; i++) {
            updateSkill("repeating_inventaire_"+idarray[i]);
        }
    });
});

on("change:repeating_inventaire",function(eventInfo){
    let invId= eventInfo.triggerName;
    if(eventInfo.sourceAttribute.includes("options-flag")){
        return;
    }
    updateInv(invId);
});

function updateInv(invId){
    /* A recup */
    const nom = invId+"_name";
    const qte = invId+"_qte";
    const poids = invId+"_poids";
    const description = invId+"_description";
    /* A Set 34 Caracteres */
    const resume = invId+"_btn-text";
    const nom_bold = invId+"_btn-bold-text";
    getAttrs([nom,qte,poids,description],function (values){
        const vNom = values[nom];
        const vQte = values[qte];
        const vPoids = values[poids];
        const vDesc = values[description];
        let boldText = "Objet non défini";
        let normalText = "";
        let charLeft = 35;
        if(!!vNom){
            boldText = vNom;
            charLeft -= vNom.length;
        }

        let vQteInt = parseInt(vQte)||0;
        let vPoidsFloat = parseFloat(vPoids)||0.0;
        let vPoidsTotal = (vQteInt * vPoidsFloat).toFixed(2);

        let text = "";
        if(!!vQte && !!vPoids){
            text = " ("+vPoidsTotal+"Kg)";
        }
        else if(!!vQte){
            text = " ("+vQteInt+"x)";
        }
        else if(!!vPoids){
            text = " ("+vPoidsFloat.toFixed(2)+"Kg)";
        }
        boldText += text;
        charLeft -= text.length;
        if(!!vDesc){
            if(vDesc.length < charLeft){
                normalText = vDesc;
            }
            else{
                normalText = vDesc.substring(0,charLeft-3)+"...";
            }
        }
        let update = {};
        update[nom_bold]= boldText;
        update[resume] = normalText;
        setAttrs(update,{silent:true});
    });
}