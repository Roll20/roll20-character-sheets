/*Update attaques*/
on("change:bba", (eventInfo) => {
    getSectionIDs("repeating_attaques-modifiers", (idArray) => {
        getNextModifierFromList(idArray, [], null);
    });
});

on("change:repeating_attaques", (eventInfo) => {
    let attackId = eventInfo.triggerName;
    if (eventInfo.sourceAttribute.includes("options-flag")
        || eventInfo.sourceAttribute.includes("rollvalue")) {
        return;
    }
    getSectionIDs("repeating_attaques-modifiers", (idArray) => {
        getNextModifierFromList(idArray, [], attackId);
    });
});
on("change:repeating_attaques-modifiers",  (eventInfo) => {
    let attackId = eventInfo.triggerName;
    if (eventInfo.sourceAttribute.includes("options-flag")) {
        return;
    }
    getAttacksModifiersAndUpdateValues();
});

let getAttacksModifiersAndUpdateValues = () =>{
    getSectionIDs("repeating_attaques-modifiers", (idArray) => {
        getNextModifierFromList(idArray, [], null);
    });
}
let getNextModifierFromList = (modifierList, modifiers, attackId) => {
    let modifierListToChange = [... modifierList];
    if (!modifierListToChange.length) {
        return updateAttacks(attackId, modifiers);
    }
    let id = "repeating_attaques-modifiers_" + modifierListToChange.pop();
    let nom = id + "_name";
    let enabled = id + "_enabled";
    let attack_mod = id + "_attack-mod";
    let damage_mod = id + "_damage-mod";
    /*Récupérer les Attributs*/
    getAttrs([nom, enabled, attack_mod, damage_mod], (attrs) => {
        let modifier = {
            nom: attrs[nom],
            enabled: attrs[enabled],
            attack_mod: attrs[attack_mod],
            damage_mod: attrs[damage_mod],
        }
        modifiers.push(modifier)
        getNextModifierFromList(modifierListToChange, modifiers, attackId);
    });
}

let updateAttacks = (attackId, modifiers) => {
    if (!attackId) {
        getSectionIDs("repeating_attaques", (idArray) => {
            for (let id of idArray) {
                updateAttack("repeating_attaques_" + id, modifiers);
            }
        });
        return;
    }
    updateAttack(attackId, modifiers);
};


let updateAttack = (attackId, modifiers) => {
    /*A Récup */
    const bbaAttr = "bba";
    const atqCaracAttr = attackId + "_atq-carac";
    const atqModAttr = attackId + "_atq-bonus";
    const atqMod2Attr = attackId + "_atq-bonus-2";
    const dgtBaseAttr = attackId + "_dgt-base";
    const dgtCaracAttr = attackId + "_dgt-carac";
    const dgtBonusAttr = attackId + "_dgt-bonus";
    /* A Set */
    const atqRollValue = attackId + "_atq-rollvalue";
    const atqCaracValAttr = attackId + "_atq-carac-val";
    const dgtCaracValAttr = attackId + "_dgt-carac-val";
    const dgtTotalAttk = attackId + "_degats";
    const atqTotalAttk = attackId + "_atq-total";
    getAttrs([bbaAttr, atqCaracAttr, atqModAttr, atqMod2Attr, dgtBaseAttr, dgtCaracAttr, dgtBonusAttr, "for_mod", "dex_mod"], function (values) {
        let atkAttrs = {
            bba: values[bbaAttr],
            atqCarac: values[atqCaracAttr],
            atqMod: values[atqModAttr],
            atqMod2: values[atqMod2Attr],
            dgtBase: values[dgtBaseAttr],
            dgtCarac: values[dgtCaracAttr],
            dgtBonus: values[dgtBonusAttr],
        }
        const bba = parseInt(values[bbaAttr]) || 0;
        const atqCarac = values[atqCaracAttr];
        const atqMod = parseInt(values[atqModAttr]) || 0;
        const atqMod2 = parseInt(values[atqMod2Attr]) || 0;
        const dgtBase = values[dgtBaseAttr];
        const dgtCarac = values[dgtCaracAttr];
        const dgtBonus = parseInt(values[dgtBonusAttr]) || 0;
        const formod = parseInt(values.for_mod) || 0;
        const dexmod = parseInt(values.dex_mod) || 0;
        let caracAtk = 0;
        if ("FOR" === atqCarac) {
            caracAtk = formod;
        } else if ("DEX" === atqCarac) {
            caracAtk = dexmod
        }
        let caracDgt = 0;
        if ("FOR" === dgtCarac) {
            caracDgt = formod;
        } else if ("DEX" === dgtCarac) {
            caracDgt = dexmod;
        } else if ("1,5FOR" === dgtCarac) {
            caracDgt = Math.floor(1.5 * formod);
        } else if ("1/2FOR" === dgtCarac) {
            caracDgt = Math.floor(formod / 2);
        }
        let degatsBonus = caracDgt + dgtBonus;
        let atqBonus = bba + caracAtk + atqMod + atqMod2;
        if (atqBonus > 0) {
            atqBonus = "+" + atqBonus;
        } else if (atqBonus < 0) {
            atqBonus = "-" + atqBonus;
        }
        let degats = dgtBase + " + " + degatsBonus;
        let rollValue = updateRoll(atkAttrs,modifiers);
        let update = {};
        update[dgtTotalAttk] = degats;
        update[atqTotalAttk] = atqBonus;
        update[atqCaracValAttr] = caracAtk;
        update[dgtCaracValAttr] = caracDgt;
        update[atqRollValue] = rollValue;
        setAttrs(update, {silent: true});
    });
}

let updateRoll = (atk_attrs,modifiers) => {
    console.log(atk_attrs);
    let baseRoll = `&{template:attack} {{titre=^{rolltemplate.attack.with} @{name}}} {{subtitle=@{character_name}}}`;

    let attackRoll = "1d20";
    if(atk_attrs.bba){
        attackRoll+= "+@{bba}[BAB]"
    }
    if(atk_attrs.atqCarac){
        attackRoll+= "+@{atq-carac-val}[Caracteristic]";
    }
    if(atk_attrs.atqMod){
        attackRoll+= "+@{atq-bonus}[Enhancement Bonus]";
    }
    if(atk_attrs.atqMod2){
        attackRoll+= "+@{atq-bonus-2}[Misc Bonus]";
    }

    let damageRoll = "@{dgt-base}[Base Damage]";
    if(atk_attrs.dgtCarac){
        damageRoll+= "+@{dgt-carac-val}[Caracteristic]";
    }
    if(atk_attrs.dgtBonus){
        damageRoll+= "+@{dgt-bonus}[Enhancement Bonus]";
    }

    for(let modifier of modifiers){
        if(modifier.enabled !== "on" || (!modifier.attack_mod && !modifier.damage_mod)){
            continue;
        }
        if(modifier.attack_mod) {
            let sign = (modifier.attack_mod.startsWith("-") || modifier.attack_mod.startsWith("+")) ? "" : "+";
            attackRoll += sign + modifier.attack_mod+"["+modifier.nom+"]"
        }
        if(modifier.damage_mod) {
            let sign = (modifier.damage_mod.startsWith("-") || modifier.damage_mod.startsWith("+")) ? "" : "+";
            damageRoll += sign + modifier.damage_mod+"["+modifier.nom+"]"
        }
    }
    return `${baseRoll} {{attack=[[${attackRoll}]]}} {{damage=[[${damageRoll}]]}} {{notes=@{notes}}}`
}