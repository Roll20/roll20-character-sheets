function provideRepeatingWeaponRowName(weapon) {

    var weaponrow = "weapons";

    switch(weapon.skill) {
        case "Pistols":
            weaponrow = weapon.skill.replaceAll(' ', '').toLowerCase();
            break;
        case "Automatics":
            weaponrow = weapon.skill.replaceAll(' ', '').toLowerCase();
            break;
        case "Longarms":
            weaponrow = weapon.skill.replaceAll(' ', '').toLowerCase();
            break;
        case "Heavy Weapons":
            weaponrow = weapon.skill.replaceAll(' ', '').toLowerCase();
            break;
        case "Unarmed Combat":
            weaponrow = "closecombat"
            break;
        case "Blades":
            weaponrow = "closecombat"
            break;
        case "Clubs":
            weaponrow = "closecombat"
            break;
    }

    var row = "repeating_" + weaponrow + "_" + generateRowID() + "_";

    return row;
}

async function importSingleRepeatingWeapon(text, weapon, ammunition, attributes) {
    var row = provideRepeatingWeaponRowName(weapon);
    console.log(row);
    if(weapon.type == "Ranged"){
        attributes[row + "weaponismelee"] = 0;
        attributes[row + "weaponrc"] = weapon.rc.match(/\d+/g).pop()-Math.ceil((parseInt(attributes.str_base) + parseInt(attributes.str_aug))/3)- 1;
        if(!weapon.rawdamage.includes("STR") && weapon.rawdamage.match(/\d+/) !== null) {
            attributes[row + "weapondv"] = weapon.rawdamage.match(/\d+/)[0];
        }
        else {
            attributes[row + "weapondv"] = weapon.damage.match(/\d+/) != null ? weapon.damage.match(/\d+/)[0] : 0;
        }

        attributes[row + "weapondmgtype"] = weapon.rawdamage.match(/S\(e\)|S\b|P|Special\b/) != null ? weapon.rawdamage.match(/S\(e\)|S\b|P|Special\b/)[0] : 0;
    }else{
        attributes[row + "weaponismelee"] = "on";
        attributes[row + "weaponreach"] = weapon.reach;
        attributes[row + "weapondv"] = weapon.damage_english.match(/\d+/) != null ? weapon.damage_english.match(/\d+/)[0] : 0;
        attributes[row + "weapondmgtype"] = weapon.damage_english.match(/S\(e\)|S\b|P|Special\b/) != null ? weapon.damage_english.match(/S\(e\)|S\b|P|Special\b/)[0] : 0;
    }

    let skills = [];
    for(var i=43;i<52;i++)
    {
        var name = 'skillname'+i;
        skills.push(name);
        var rating = 'skillrating'+i;
        skills.push(rating);
        var bonus = 'skillbonus'+i;
        skills.push(bonus);
        var attr = 'skillattr_value'+i;
        skills.push(attr);
    }
    skills = await asw.getAttrs(skills);
    for(var i=43; i<52; i++)
    {
        var compname = 'skillname'+i;
        var rating = 'skillrating'+i;
        var bonus = 'skillbonus'+i;
        var skillattr = 'skillattr_value'+i;

        if(skills[compname] == weapon.skill){
            attributes[row + "weaponcategory"] = "@{skilldicepool"+i+"}";
            let attribute = await asw.getAttrs([skillattr]);
            let attrTotal = attribute[skillattr].replace(/[^a-zA-Z0-9_]/g, "");
            let attributeSum = await asw.getAttrs([attrTotal]);
            let targetAttributes = attributeSum[attrTotal].replace(/[+]/g, ",").replace(/[^a-zA-Z0-9_,]/g, "").split(",");
            let attributesValues = [attributes[targetAttributes[0]], attributes[targetAttributes[1]]]
            attributes[row + "weaponbonus"] = weapon.dicepool - skills[rating] - skills[bonus] - attributesValues.reduce((a,b) => parseInt(a) + parseInt(b));
        }
    }

    attributes[row + "weaponname"] = weapon.name;
    attributes[row + "weaponaccuracy"] = weapon.accuracy.match(/\d+/g).pop();
    if(weapon.ap == null || isNaN(weapon.ap)){
        attributes[row + "weaponap"] = 0;
    }else{
        attributes[row + "weaponap"] = weapon.ap;
        if(weapon.rawap != null) {
            attributes[row + "weaponap"] = weapon.rawap;
        }
    }
    attributes[row + "weaponnotes"] = "";

    if(typeof weapon.accessories != "undefined"){
        if(weapon.accessories.accessory.length>1){
            for(var j=0; j<weapon.accessories.accessory.length; j++){
                attributes[row + "weaponnotes"] += weapon.accessories.accessory[j].name+"\n";
            }
        }else{
            attributes[row + "weaponnotes"] += weapon.accessories.accessory.name+"\n";
        }
    }

    if(weapon.clips !== null){
        if(weapon.clips.clip.length > 1){
            let amountImported = 0;
            for(var j=0; j < weapon.clips.clip.length && amountImported < 4; j++){

                if(weapon.clips.clip[j].location === "loaded") {
                    //skip loaded, they will be found later anyway
                    continue;
                }

                var newrowid=generateRowID();
                //find ammo to get stats
                ammo = ammunition.find(clip => clip.guid === weapon.clips.clip[j].id);

                if(ammo != null && !ammo.name_english.includes("Regular")) {
                    importRepeatingWeaponAmmo(row, ammo, amountImported, attributes);
                    amountImported++;
                }
            }
        }else{
            var newrowid = generateRowID();
            //find ammo to get stats
            ammo = ammunition.find(clip => clip.guid === weapon.clips.clip.id);

            if(ammo != null) {
                importRepeatingWeaponAmmo(row, ammo, 0, attributes);
            }
        }
    }
}

async function importRepeatingWeaponAmmo(row, ammunition, number, attributes) {

    attributes[row + "ammoname"+number] = ammo.name;

    attributes[row + "ammodv" + number] = ammo.weaponbonusdamage_english != null ? ammo.weaponbonusdamage_english.substring(0,2) : 0;
    if(ammo.weaponbonusdamage_english != null) {
         attributes[row + "ammodmgtype" + number] = ammo.weaponbonusdamage_english.substring(2);
    }

    if(ammo.name_english === "Ammo: Stick-n-Shock") {
        attributes[row + "_ammoap" + number] = -5 - attributes[row + "weaponap"]
    }
    else {
        attributes[row + "ammoap" + number] = ammo.weaponbonusap != null? ammo.weaponbonusap : 0;
    }
    attributes[row + "ammoacc" + number] = ammo.weaponbonusacc != null ? ammo.weaponbonusacc : 0;
}