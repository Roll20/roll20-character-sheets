function importSingleDrone(drone, attributes) {

    var newrowid = generateRowID();
    attributes["repeating_drones_"+newrowid+"_dronename"]= drone.name;
    attributes["repeating_drones_"+newrowid+"_dronehand"]= drone.handling.match(/\d+/);
    attributes["repeating_drones_"+newrowid+"_dronespeed"]= drone.speed.match(/\d+/);
    attributes["repeating_drones_"+newrowid+"_droneaccl"]= drone.accel.match(/\d+/);
    attributes["repeating_drones_"+newrowid+"_dronepilot"]= drone.pilot;
    attributes["repeating_drones_"+newrowid+"_dronesens"]= drone.sensor;
    attributes["repeating_drones_"+newrowid+"_droneprice"]= drone.cost;
    attributes["repeating_drones_"+newrowid+"_dronebody"]= drone.body;
    attributes["repeating_drones_"+newrowid+"_dronearmor"]= drone.armor;
    attributes["repeating_drones_"+newrowid+"_dronenotes"]="";

    if(drone.mods != null){
        if(drone.mods.mod.length > 1){
            var weaponnumber = 1;
            for(var j = 0; j < drone.mods.mod.length; j++){
                weaponnumber = importSingleDroneMod(drone.mods.mod[j], newrowid, attributes, weaponnumber);
            }
        }else{
            attributes["repeating_drones_"+newrowid+"_dronenotes"] += drone.mods.mod.name + "\n";
            importSingleDroneMod(drone.mods.mod, newrowid, attributes, weaponnumber);
        }
    }
}

const importSingleDroneMod = (mod, newrowid, attributes, weaponnumber) => {
    attributes["repeating_drones_" + newrowid + "_dronenotes"] += mod.name + "\n";
    if(mod.weapons != null && mod.weapons.weapon != null){
        if(mod.weapons.length > 1){
           return importSingleDroneWeapon(mod.weapons.weapon[0], newrowid, attributes, weaponnumber);
        }
        else {
           return importSingleDroneWeapon(mod.weapons.weapon, newrowid, attributes, weaponnumber);
        }
    }
    return weaponnumber;
}

const importSingleDroneWeapon = (weapon, newrowid, attributes, weaponnumber) => {
    attributes["repeating_drones_"+newrowid+"_droneweaponname" + weaponnumber] = weapon.name;
    attributes["repeating_drones_"+newrowid+"_droneweaponaccuracy"+ weaponnumber] = weapon.accuracy.match(/\d+/g).pop();
    if(weapon.type == "Ranged")
        attributes["repeating_drones_"+newrowid+"_droneweaponrc"+ weaponnumber] = weapon.rc.match(/\d+/g).pop();
    if(Number(weapon.ap) != "NaN"){
        attributes["repeating_drones_"+newrowid+"_droneweaponap"+ weaponnumber] = weapon.ap;
    }else{
        attributes["repeating_drones_"+newrowid+"_droneweaponap"+ weaponnumber] = 0;
    }
    attributes["repeating_drones_"+newrowid+"_droneweapondv"+ weaponnumber] = weapon.damage_english.match(/\d*/);
    attributes["repeating_drones_"+newrowid+"_droneweapondmgtype"+ weaponnumber] = weapon.damage_english.match(/^\d*/);
    attributes["repeating_drones_"+newrowid+"_droneweaponnotes"+ weaponnumber] = "";
    if(typeof weapon.accessories != "undefined"){
        if(weapon.accessories.accessory.length > 1){
            for(var h = 0; h < weapon.accessories.accessory.length; h++){
                attributes["repeating_drones_"+newrowid+"_droneweaponnotes"+ weaponnumber] += weapon.accessories.accessory[h].name+"\n";
            }
        }else{
            attributes["repeating_drones_"+newrowid+"_droneweaponnotes"+ weaponnumber] += weapon.accessories.accessory.name+"\n";
        }
    }
    return weaponnumber +1;
}
const importAutosofts = (drone, newrowid, attributes) => {

    let autosofts;
    if(drone.gears.gear.length > 1) {
        autosofts = drone.gears.gear.filter(gear => gear.category_english.includes("Autosofts"));
    }
    else {
        if(drone.gears.gear.category_english == "Autosofts") {
            autosofts = [drone.gears.gear];
        }
    }

    if(autosofts != null) {
        //search for clearsight
        let clearsight = autosofts.find(soft => soft.name_english.includes("Clearsight Autosoft"));
        if(clearsight != null) {
            attributes["repeating_drones_"+newrowid+"_droneperceptionsoft"] = clearsight.rating;
        }

        //Maneuvering
        let maneuvering = autosofts.find(soft => soft.name_english.includes("Maneuvering Autosoft"));
        if(maneuvering != null) {
            attributes["repeating_drones_"+newrowid+"_dronemaneuversoft"] = maneuvering.rating;
        }

        //stealth
        let stealth = autosofts.find(soft => soft.name_english.includes("Stealth Autosoft"));
        if(stealth != null) {
            attributes["repeating_drones_"+newrowid+"_dronesneaksoft"] = stealth.rating;
        }

        //evasion
        let evasion = autosofts.find(soft => soft.name_english.includes("Evasion Autosoft"));
        if(evasion != null) {
            attributes["repeating_drones_"+newrowid+"_dronedodgesoft"] = evasion.rating;
        }
    }

}