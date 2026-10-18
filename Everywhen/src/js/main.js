/*=include tools.js */
/*=include visibility.js */
/*=include life.js */
/*=include resolve.js */
//Armour Changes
on("change:repeating_armours", (eventInfo) => {
    let armourId = eventInfo.triggerName;
    if (eventInfo.sourceAttribute.includes("options-flag")
        || eventInfo.sourceAttribute.includes("armour_roll_value")
        || eventInfo.sourceAttribute.includes("armour_roll_label")
        || eventInfo.sourceAttribute.includes("name_label")
        || eventInfo.sourceAttribute.includes("armour_fixed_label")
    ) {
        return;
    }
    // Get the weapon values
    let name = armourId + "_name";
    let type = armourId + "_type";
    let armour_dice = armourId + "_armour_dice";
    let armour_malus = armourId + "_armour_malus";
    getAttrs([name,type,armour_dice,armour_malus], (attrs) => {
        let nameVal = attrs[name];
        let typeVal = attrs[type];
        let armourDiceVal = attrs[armour_dice];
        let armourMalusVal = parseInt(attrs[armour_malus],10) || 0;

        let avg = Math.ceil(averageDice(armourDiceVal) || 0);
        avg += armourMalusVal;

        let nameLabel = nameVal;
        if(typeVal){
            nameLabel+= " ("+getTranslationByKey("armour."+typeVal)+")";
        }

        let rollLabel = armourDiceVal;
        rollLabel += getPositiveSign(armourMalusVal) + armourMalusVal;

        let rollValue = normalizeDice(armourDiceVal)+"[Roll]";
        rollValue += getPositiveSign(armourMalusVal) + armourMalusVal+"[Modifier]";

        let update = {};
        update[armourId + "_name_label"] = nameLabel;
        update[armourId + "_armour_roll_label"] = rollLabel +" ("+avg+")";
        update[armourId + "_armour_roll_value"] = "[[" + rollValue + "]]";
        setAttrs(update);
    });
});


//weapons Changes
on("change:repeating_weapons", (eventInfo) => {
    let attackId = eventInfo.triggerName;
    if (eventInfo.sourceAttribute.includes("options-flag")
        || eventInfo.sourceAttribute.includes("weapon_attack_value")
        || eventInfo.sourceAttribute.includes("weapon_damage_value")
        || eventInfo.sourceAttribute.includes("type_label")
        || eventInfo.sourceAttribute.includes("damage_label")) {
        return;
    }
    // Get the weapon values
    let name = attackId + "_name";
    let type = attackId + "_type";
    let damage_dice = attackId + "_damage_dice";
    let damage_bonus = attackId + "_damage_bonus";
    let damage_ability = attackId + "_damage_ability";
    let ability = attackId + "_ability";
    let range = attackId + "_range";
    getAttrs([name, type, damage_dice, damage_bonus, damage_ability,range, ability,"strength","agility","mind","appeal","melee","ranged"], (attrs) => {
        let nameval = attrs[name];
        let typeval = attrs[type];;
        let abilityVal  = attrs[ability];
        let abiliyMod = parseInt(attrs[abilityVal],10) || 0;

        let rangeVal = attrs[range];

        let damage_dice_val = attrs[damage_dice];
        let damage_bonus_val = parseInt(attrs[damage_bonus],10) || 0;
        let damage_ability_val = attrs[damage_ability];
        let damage_ability_mod = parseInt(attrs[damage_ability_val],10) || 0;

        let meleeVal = attrs["melee"];
        let rangedVal = attrs["ranged"];

        let attackMod = typeval === "melee" ? parseInt(meleeVal,10) : parseInt(rangedVal,10);
        
        let AtkText = "@{roll}[Roll]";
        if(abilityVal != "none")
        {
            AtkText += getPositiveSign(abiliyMod) + abiliyMod + "[^{attributes."+abilityVal+"}]";
        }
        AtkText += getPositiveSign(attackMod) + attackMod + (typeval === "melee" ? "[^{attack.type.melee}]" : "[^{attack.type.ranged}]");

        let damageText = normalizeDice(damage_dice_val)+"[Roll]";
        damageText += getPositiveSign(damage_bonus_val) + damage_bonus_val + "[Bonus]";
        if(damage_ability_val != "none")
        {
            damageText += getPositiveSign(damage_ability_mod) + damage_ability_mod + "[^{attributes."+damage_ability_val+"}]";
        }

        let typeLabel = getTranslationByKey("attack.type." + typeval) || typeval;
        if(typeval == "ranged" && !!rangeVal){
            typeLabel += " (" + rangeVal + ")";
        }

        let damageLabel = damage_dice_val;
        let damageLabelMod = damage_bonus_val+damage_ability_mod;
        damageLabel += getPositiveSign(damageLabelMod) + damageLabelMod;

        let update = {};
        update[attackId + "_weapon_attack_value"] = "[[" + AtkText + "]]";
        update[attackId + "_weapon_damage_value"] = "[[" + damageText + "]]";
        update[attackId + "_type_label"] = typeLabel;
        update[attackId + "_damage_label"] = damageLabel;
        setAttrs(update);
    });
});

/*Translate Roll query */
on("sheet:opened", function(eventInfo){
    initSheetIfNeeded();     
    let rollQuery = {}
    rollQuery["attribute_choose"] = "?{"+getTranslationByKey("common.choose")+"|"+getTranslationByKey("attributes.strength")+",@{strength}|"+getTranslationByKey("attributes.agility")+",@{agility}|"+getTranslationByKey("attributes.mind")+",@{mind}|"+getTranslationByKey("attributes.appeal")+",@{appeal}}";
    setAttrs(rollQuery);
});

function initSheetIfNeeded(){ 
    getAttrs(["page","has_faith","has_arcana","has_psionics","has_resolve","has_credit"], (attrs) => {
        let toUpdate = {};
        console.log(attrs);
        if(!attrs["page"]){
            toUpdate["page"] = "core";
        }
        if(!attrs["has_faith"] || attrs["has_faith"] == "on"){
            toUpdate["has_faith"] = "on";
        }
        if(!attrs["has_arcana"] || attrs["has_arcana"] == "on"){
            toUpdate["has_arcana"] = "on";
        }
        if(!attrs["has_psionics"] || attrs["has_psionics"] == "on"){
            toUpdate["has_psionics"] = "on";
        }
        if(!attrs["has_resolve"] || attrs["has_resolve"] == "on"){
            toUpdate["has_resolve"] = "on";
        }
        if(!attrs["has_credit"] || attrs["has_credit"] == "on"){
            toUpdate["has_credit"] = "on";
        }
        console.log(toUpdate);
        setAttrs(toUpdate);
    });

}
/* add - remove bonus dices from roll */
on("change:roll_base change:bonus_dices", (eventInfo) => {
    
    getAttrs(["roll_base","bonus_dices"], (attrs) => {
        let roll_base = normalizeDice(attrs["roll_base"]);
        let bonus_dices = parseInt(attrs["bonus_dices"],10) || 0;

        const match = roll_base.match(/^(\d+)[dD](\d+)(k[hHlL]?(\d+))?$/);
        if (!match) {
            return;
        }
        const count = parseInt(match[1], 10);
        const sides = parseInt(match[2], 10);
        const modifier = match[3] ? match[3].toLowerCase() : null;
        const value = match[4] ? parseInt(match[4], 10) : null;
        if(modifier && !value)
        {
            return;
        }

        let baseDice = modifier ? value : count;
        let bonusDice = 0;
        if(modifier == "kh"){
            bonusDice = count - value;
        } 
        else if(modifier == "kl"){
            bonusDice = value - count;
        }
        bonusDice += bonus_dices;

        let totalDice = baseDice + Math.abs(bonusDice);
        let stringRoll = totalDice+"d"+sides;
        if(bonusDice > 0){
            stringRoll += "kh"+baseDice;
        }
        else if(bonusDice < 0){
            stringRoll += "kl"+baseDice;
        }

        let toUpdate = {};
        toUpdate["roll"] = stringRoll;
        setAttrs(toUpdate);
        
    });
});
