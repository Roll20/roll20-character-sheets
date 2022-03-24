function importSingleVehicle(vehicle, attributes) {

    var newrowid = generateRowID();
    attributes["repeating_vehicles_"+newrowid+"_vehiclename"]= vehicle.name;
    attributes["repeating_vehicles_"+newrowid+"_vehiclehand"]= vehicle.handling.match(/\d+/);
    attributes["repeating_vehicles_"+newrowid+"_vehiclespeed"]= vehicle.speed.match(/\d+/);
    attributes["repeating_vehicles_"+newrowid+"_vehicleaccl"]= vehicle.accel.match(/\d+/);
    attributes["repeating_vehicles_"+newrowid+"_vehiclepilot"]= vehicle.pilot;
    attributes["repeating_vehicles_"+newrowid+"_vehiclesens"]= vehicle.sensor;
    attributes["repeating_vehicles_"+newrowid+"_vehicleseats"]= vehicle.seats;
    attributes["repeating_vehicles_"+newrowid+"_vehicleprice"]= vehicle.cost;
    attributes["repeating_vehicles_"+newrowid+"_vehiclebody"]= vehicle.body;
    attributes["repeating_vehicles_"+newrowid+"_vehiclearmor"]= vehicle.armor;
    attributes["repeating_vehicles_"+newrowid+"_vehiclenotes"]="";

    if(vehicle.mods != null){
        if(vehicle.mods.mod.length > 1){
            var weaponnumber = 1;
            for(var j = 0; j < vehicle.mods.mod.length; j++){
                weaponnumber = importSingleVehicleMod(vehicle.mods.mod[j], newrowid, attributes, weaponnumber);
            }
        }else{
            attributes["repeating_vehicles_"+newrowid+"_vehiclenotes"] += vehicle.mods.mod.name + "\n";
            importSingleVehicleMod(vehicle.mods.mod, newrowid, attributes, weaponnumber);
        }
    }
}

const importSingleVehicleMod = (mod, newrowid, attributes, weaponnumber) => {
    attributes["repeating_vehicles_" + newrowid + "_vehiclenotes"] += mod.name + "\n";
    if(mod.weapons != null && mod.weapons.weapon != null){
        if(mod.weapons.length > 1){
           return importSingleVehicleWeapon(mod.weapons.weapon[0], newrowid, attributes, weaponnumber);
        }
        else {
           return importSingleVehicleWeapon(mod.weapons.weapon, newrowid, attributes, weaponnumber);
        }
    }
    return weaponnumber;
}

const importSingleVehicleWeapon = (weapon, newrowid, attributes, weaponnumber) => {
    attributes["repeating_vehicles_"+newrowid+"_vehicleweaponname" + weaponnumber] = weapon.name;
    attributes["repeating_vehicles_"+newrowid+"_vehicleweaponaccuracy"+ weaponnumber] = weapon.accuracy.match(/\d+/g).pop();
    if(weapon.type == "Ranged")
        attributes["repeating_vehicles_"+newrowid+"_vehicleweaponrc"+ weaponnumber] = weapon.rc.match(/\d+/g).pop();
    if(Number(weapon.ap) != "NaN"){
        attributes["repeating_vehicles_"+newrowid+"_vehicleweaponap"+ weaponnumber] = weapon.ap;
    }else{
        attributes["repeating_vehicles_"+newrowid+"_vehicleweaponap"+ weaponnumber] = 0;
    }
    attributes["repeating_vehicles_"+newrowid+"_vehicleweapondv"+ weaponnumber] = weapon.damage_english.match(/\d*/);
    attributes["repeating_vehicles_"+newrowid+"_vehicleweapondmgtype"+ weaponnumber] = weapon.damage_english.match(/^\d*/);
    attributes["repeating_vehicles_"+newrowid+"_vehicleweaponnotes"+ weaponnumber] = "";
    if(typeof weapon.accessories != "undefined"){
        if(weapon.accessories.accessory.length > 1){
            for(var h = 0; h < weapon.accessories.accessory.length; h++){
                attributes["repeating_vehicles_"+newrowid+"_vehicleweaponnotes"+ weaponnumber] += weapon.accessories.accessory[h].name+"\n";
            }
        }else{
            attributes["repeating_vehicles_"+newrowid+"_vehicleweaponnotes"+ weaponnumber] += weapon.accessories.accessory.name+"\n";
        }
    }
    return weaponnumber +1;
}