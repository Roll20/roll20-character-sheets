/*Update init*/
on("change:dex_mod change:init_bonus",function(){
    getAttrs(["dex_base","dex_bonus","dex_mod","init_bonus"],function(values){
        let dex_mod = parseInt(values.dex_mod)||0;
        let init_bonus = parseInt(values.init_bonus)||0;
        let dex_base = parseInt(values.dex_base)||0;
        let dex_bonus = parseInt(values.dex_bonus)||0;
        let dex_total = dex_base+dex_bonus;
        const init_tot = dex_mod+init_bonus+(dex_total/100);
        setAttrs({
            "init_tot":init_tot
        });
    });
});

/*Update armor*/
on("change:armor_bonus change:armor_malus change:armor_max_dex change:armor_equipe change:shield_bonus change:shield_malus change:shield_equipe change:touch_bonus change:flatfooted_bonus change:universal_armor_bonus change:dex_mod",function(){
    getAttrs(["armor_bonus","armor_malus","armor_max_dex","armor_equipe","shield_bonus","shield_malus","shield_equipe","touch_bonus","flatfooted_bonus","universal_armor_bonus","dex_mod"],function(values){
        let armor_bonus = parseInt(values.armor_bonus) || 0;
        let armor_malus = parseInt(values.armor_malus) || 0;
        let armor_max_dex = parseInt(values.armor_max_dex) || 0;
        if(armor_max_dex < 0) armor_max_dex = 1000;
        let shield_equipe = values.shield_equipe == "on";
        let armor_equipe = values.armor_equipe == "on";
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
        let AC = 10 + armor_bonus + dex + shield_bonus + touch_bonus + flatfooted_bonus + universal_armor_bonus;
        let TAC = 10 +dex + touch_bonus + universal_armor_bonus;
        let FFAC = 10 + armor_bonus + shield_bonus + flatfooted_bonus + universal_armor_bonus;
        let skill_malus = (shield_malus > 0 ? -shield_malus : shield_malus) - (armor_malus < 0 ? -armor_malus : armor_malus);
        setAttrs({
            "ac_tot":AC,
            "ac_tot_t":TAC,
            "ac_tot_ff":FFAC,
            "skills_malus":skill_malus
        });
    });
});

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