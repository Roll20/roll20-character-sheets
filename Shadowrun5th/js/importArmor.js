function importSingleArmor(armor, attributes) {

    if(armor.armor.includes("/")) {
        var armorValueArray = armor.armor.toString().split("/");

        var splitArmor = armor;
        splitArmor.armor = armorValueArray[0];
        importSingleArmor(splitArmor, attributes);

        armor.armor = armorValueArray[1];
    }

    var newrowid = generateRowID()
    attributes["repeating_armors_"+newrowid+"_armorname"] = armor.name;
    if(armor.equipped == "True") {
           attributes["repeating_armors_"+newrowid+"_armorworn"] = "on";
    }
    attributes["repeating_armors_"+newrowid+"_armorrating"] = armor.armor;
    attributes["repeating_armors_"+newrowid+"_armornotes"] = "";
    if(armor.armormods!=null){
        if(armor.armormods.armormod.length > 1){
            for(var j=0; j < armor.armormods.armormod.length; j++){
                if(Number(armor.armormods.armormod[j].rating) > 0){
                    attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.armormods.armormod[j].name + " " + armor.armormods.armormod[j].rating + "\n";
                }else{
                    attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.armormods.armormod[j].name + "\n";
                }
            }
        }else{
            if(Number(armor.armormods.armormod.rating)>0){
                attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.armormods.armormod.name + " " + armor.armormods.armormod.rating + "\n";
            }else{
                attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.armormods.armormod.name + "\n";
            }
        }
    }
    if(armor.gears!=null){
        if(armor.gears.gear.length > 1){
            for(var j=0; j < armor.gears.gear.length; j++){
                attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.gears.gear[j].name + "\n";
            }
        }else{
            attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.gears.gear.name + "\n";
        }
    }
}

function importCyberwareArmor(nightly, cyberware, attributes) {
    if(nightly != "on") {
        return;
    }

    var cyberwareEnhancements = [];
    if(cyberware.children != null && cyberware.children.cyberware.length > 1) {
        cyberwareEnhancements = cyberware.children.cyberware;
    }

    cyberwareEnhancements.forEach(enhancement => importSingleCyberwareArmor(cyberware.name, enhancement, attributes));
}

function importSingleCyberwareArmor(parentname, cyberware, attributes) {

    if(cyberware.name_english === "Armor") {
        var newrowid = generateRowID()
        attributes["repeating_armors_"+newrowid+"_armorname"] = parentname;
        attributes["repeating_armors_"+newrowid+"_armorworn"] = "on";
        attributes["repeating_armors_"+newrowid+"_armorrating"] = cyberware.rating;
        attributes["repeating_armors_"+newrowid+"_armornotes"] = "";
    }
}
