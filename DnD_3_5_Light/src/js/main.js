
const buttonlist = ["character", "journal","spells", "configuration"];
buttonlist.forEach(button => {
    on(`clicked:${button}`, function() {
        setAttrs({
            sheetTab: button
        });
    });
});


/* CARACTERISTICS UPDATE */
on("change:for_base change:for_bonus",function(){
    getAttrs(["for_base","for_bonus"], function(values) {
        let base = parseInt(values.for_base)||0;
        let bonus = parseInt(values.for_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"for_mod":mod});
    })
});

on("change:dex_base change:dex_bonus",function(){
    getAttrs(["dex_base","dex_bonus"], function(values) {
        let base = parseInt(values.dex_base)||0;
        let bonus = parseInt(values.dex_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"dex_mod":mod});
    })
});

on("change:con_base change:con_bonus",function(){
    getAttrs(["con_base","con_bonus"], function(values) {
        let base = parseInt(values.con_base)||0;
        let bonus = parseInt(values.con_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"con_mod":mod});
    })
});

on("change:int_base change:int_bonus",function(){
    getAttrs(["int_base","int_bonus"], function(values) {
        let base = parseInt(values.int_base)||0;
        let bonus = parseInt(values.int_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"int_mod":mod});
    })
});

on("change:sag_base change:sag_bonus",function(){
    getAttrs(["sag_base","sag_bonus"], function(values) {
        let base = parseInt(values.sag_base)||0;
        let bonus = parseInt(values.sag_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"sag_mod":mod});
    })
});

on("change:cha_base change:cha_bonus",function(){
    getAttrs(["cha_base","cha_bonus"], function(values) {
        let base = parseInt(values.cha_base)||0;
        let bonus = parseInt(values.cha_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"cha_mod":mod});
    })
});

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
on("change:armor_bonus change:armor_malus change:armor_max_dex change:shield_bonus change:shield_malus change:shield_equipe change:touch_bonus change:flatfooted_bonus change:universal_armor_bonus change:dex_mod",function(){
    getAttrs(["armor_bonus","armor_malus","armor_max_dex","shield_bonus","shield_malus","shield_equipe","touch_bonus","flatfooted_bonus","universal_armor_bonus","dex_mod"],function(values){
        let armor_bonus = parseInt(values.armor_bonus) || 0;
        let armor_malus = parseInt(values.armor_malus) || 0;
        let armor_max_dex = parseInt(values.armor_max_dex) || 0;
        if(armor_max_dex < 0) armor_max_dex = 1000;
        let shield_equipe = values.shield_equipe == "on";
        let shield_bonus = shield_equipe ? (parseInt(values.shield_bonus) || 0) : 0;
        let shield_malus = shield_equipe ? (parseInt(values.shield_malus) || 0) : 0;
        let touch_bonus = parseInt(values.touch_bonus) || 0;
        let flatfooted_bonus = parseInt(values.flatfooted_bonus) || 0;
        let universal_armor_bonus = parseInt(values.universal_armor_bonus) || 0;
        let dex_mod = parseInt(values.dex_mod) || 0;
        let dex = (armor_max_dex < dex_mod) ? armor_max_dex : dex_mod;
        let AC = 10 +armor_bonus + dex + shield_bonus + touch_bonus + flatfooted_bonus + universal_armor_bonus;
        let TAC = 10 +dex + touch_bonus + universal_armor_bonus;
        let FFAC = 10 +armor_bonus + shield_bonus + flatfooted_bonus + universal_armor_bonus;
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
/*Update attaques*/
on("change:repeating_attaques", function(eventInfo) {
    let atqId= eventInfo.triggerName;
    if(eventInfo.sourceAttribute.includes("options-flag")){
        return;
    }
    updateAtq(atqId);
});

function updateAtq(atqId){
    /*A Récup */
    const bbaAttr = "bba";
    const atqCaracAttr = atqId+"_atq-carac";
    const atqModAttr = atqId+"_atq-bonus";
    const atqMod2Attr = atqId+"_atq-bonus-2";
    const dgtBaseAttr = atqId+"_dgt-base";
    const dgtCaracAttr = atqId+"_dgt-carac";
    const dgtBonusAttr = atqId+"_dgt-bonus";
    /* A Set */
    const atqCaracValAttr = atqId+"_atq-carac-val";
    const dgtCaracValAttr = atqId+"_dgt-carac-val";
    const dgtTotalAttk = atqId+"_degats";
    const atqTotalAttk = atqId+"_atq-total";
    getAttrs([bbaAttr,atqCaracAttr,atqModAttr,atqMod2Attr,dgtBaseAttr,dgtCaracAttr,dgtBonusAttr,"for_mod","dex_mod"],function (values){
        const bba = parseInt(values[bbaAttr])||0;
        const atqCarac = values[atqCaracAttr];
        const atqMod = parseInt(values[atqModAttr])||0;
        const atqMod2 = parseInt(values[atqMod2Attr])||0;
        const dgtBase = values[dgtBaseAttr];
        const dgtCarac = values[dgtCaracAttr];
        const dgtBonus = parseInt(values[dgtBonusAttr])||0;
        const formod = parseInt(values.for_mod)||0;
        const dexmod = parseInt(values.dex_mod)||0;
        let caracAtk = 0;
        if("FOR" == atqCarac){
            caracAtk = formod;
        }
        else if("DEX" == atqCarac){
            caracAtk = dexmod
        }
        let caracDgt = 0;
        if("FOR" == dgtCarac){
            caracDgt = formod;
        }
        else if("DEX" == dgtCarac){
            caracDgt = dexmod;
        }
        else if("1,5FOR" == dgtCarac){
            caracDgt = Math.floor(1.5*formod);
        }
        else if("1/2FOR" == dgtCarac){
            caracDgt = Math.floor(formod/2);
        }
        let degatsBonus = caracDgt + dgtBonus;
        let atqBonus = bba + caracAtk + atqMod + atqMod2;
        if(atqBonus > 0){
            atqBonus = "+" + atqBonus;
        }
        else if(atqBonus < 0){
            atqBonus = "-" + atqBonus;
        }
        let degats = dgtBase + " + " +  degatsBonus;
        let update = {};
        update[dgtTotalAttk] = degats;
        update[atqTotalAttk] = atqBonus;
        update[atqCaracValAttr] = caracAtk;
        update[dgtCaracValAttr] = caracDgt;
        setAttrs(update,{silent:true});
    });
}
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