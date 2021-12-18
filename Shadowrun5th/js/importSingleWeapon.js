function importSingleWeapon(text, weapon, number,  ammunition, attributes) {
    if(weapon.type == "Ranged"){
        attributes["weaponismelee"+number] = 0;
        attributes["weaponrc"+number] = weapon.rc.match(/\d+/g).pop()-Math.ceil((parseInt(attributes.str_base) + parseInt(attributes.str_aug))/3)- 1;

        if(weapon.rawdamage.match(/\d+/) !== null && !weapon.rawdamage.includes("STR")) {
            attributes["weapondv"+number] = weapon.rawdamage.match(/\d+/)[0];
        }
        else if(weapon.rawdamage.includes("STR")) {
           attributes["weapondv"+number] = weapon.damage.match(/\d+/)[0];
        }
        else {
            attributes["weapondv"+number] = weapon.damage.match(/\d+/) != null ? weapon.damage.match(/\d+/)[0] : 0;
        }

        attributes["weapondmgtype"+number] = weapon.rawdamage.match(/S\(e\)|S\b|P|Special\b/) != null ? weapon.rawdamage.match(/S\(e\)|S\b|P|Special\b/)[0] : 0;
    }else{
        attributes["weaponismelee"+number] = "on";
        attributes["weaponreach"+number] = weapon.reach;
        attributes["weapondv"+number] = weapon.damage_english.match(/\d+/)[0];
        attributes["weapondmgtype"+number] = weapon.damage_english.match(/S\(e\)|S\b|P|Special\b/) != null ? weapon.damage_english.match(/S\(e\)|S\b|P|Special\b/)[0] : 0;
    }

    attributes["weaponname"+number] = weapon.name;
    attributes["weaponaccuracy"+number] = weapon.accuracy.match(/\d+/g).pop();
    if(isNaN(weapon.ap)){
        attributes["weaponap"+number] = 0;
    }else{
        attributes["weaponap"+number] = weapon.ap;
        if(weapon.rawap != null) {
            attributes["weaponap"+number] = weapon.rawap;
        }
    }
    attributes["weaponnotes"+number] = "";

    if(typeof weapon.accessories != "undefined"){
        if(weapon.accessories.accessory.length>1){
            for(var j=0; j<weapon.accessories.accessory.length; j++){
                attributes["weaponnotes"+number] += weapon.accessories.accessory[j].name+"\n";
            }
        }else{
            attributes["weaponnotes"+number] += weapon.accessories.accessory.name+"\n";
        }
    }

    if(weapon.clips !== null){
        if(weapon.clips.clip.length>1){
            for(var j=0; j<weapon.clips.clip.length; j++){

                if(weapon.clips.clip[j].location === "loaded") {
                    //skip loaded, they will be found later anyway
                    continue;
                }

                var newrowid=generateRowID();
                //find ammo to get stats
                ammo = ammunition.find(clip => clip.guid === weapon.clips.clip[j].id);
                if(ammo != null) {
                    importRepeatingAmmo(ammo, number, attributes);
                }
            }
        }else{
            var newrowid = generateRowID();
            //find ammo to get stats
            ammo = ammunition.find(clip => clip.guid === weapon.clips.clip.id);

            if(ammo != null) {
                importRepeatingAmmo(ammo, number, attributes);
            }
        }
    }
}

function importRepeatingAmmo(ammunition, number, attributes) {

    var newrowid = generateRowID();

    attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoname"] = ammo.name;

    if(ammo.weaponbonusdamage_english != null && ammo.weaponbonusap != null && ammo.weaponbonusacc != null) {
        attributes["repeating_ammotype"+number+"_"+newrowid+"_ammodv"] = ammo.weaponbonusdamage_english.substring(0,2);
        attributes["repeating_ammotype"+number+"_"+newrowid+"_ammodmgtype"] = ammo.weaponbonusdamage_english.substring(2);
        if(ammo.name_english === "Ammo: Stick-n-Shock") {
            attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoap"] = -5 - attributes["weaponap" + number]
        }
        else {
            attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoap"] = ammo.weaponbonusap;
        }
        attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoacc"] = ammo.weaponbonusacc;
    }
    else {
        attributes["repeating_ammotype"+number+"_"+newrowid+"_ammodv"] = 0;
        attributes["repeating_ammotype"+number+"_"+newrowid+"_ammodmgtype"] = 0;
        if(ammo.name_english === "Ammo: Stick-n-Shock") {
            attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoap"] = -5 - attributes["weaponap" + number]
        }
        else {
            attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoap"] = 0;
        }
        attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoacc"] = 0;
    }
}