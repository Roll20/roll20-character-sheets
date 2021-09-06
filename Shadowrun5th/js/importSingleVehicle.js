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
            for(var j = 0; j < vehicle.mods.mod.length; j++){
                importSingleVehicleMod(vehicle.mods.mod[j], newrowid,  attributes);
            }
        }else{
            attributes["repeating_vehicles_"+newrowid+"_vehiclenotes"] += vehicle.mods.mod.name + "\n";
            importSingleVehicleMod(vehicle.mods.mod, newrowid, attributes);
        }
    }
}

function importSingleVehicleMod(mod, newrowid, attributes) {
    attributes["repeating_vehicles_" + newrowid + "_vehiclenotes"] += mod.name + "\n";
    if(mod.weapons != null && mod.weapons.weapon != null){
        if(mod.weapons.weapon.length > 1){
           importSingleVehicleWeapon(mod.weapons.weapon[0], newrowid, attributes);
        }
        else {
            importSingleVehicleWeapon(mod.weapons.weapon, newrowid, attributes);
        }
    }
}

function importSingleVehicleWeapon(weapon, newrowid, attributes) {
    if(weapon.category != "Gear"){
        attributes["repeating_vehicles_"+newrowid+"_vehicleweaponname"] = weapon.name;
        attributes["repeating_vehicles_"+newrowid+"_vehicleweaponaccuracy"] = weapon.accuracy.match(/\d+/g).pop();
        if(weapon.type == "Ranged")
            attributes["repeating_vehicles_"+newrowid+"_vehicleweaponrc"] = weapon.rc.match(/\d+/g).pop();
        if(Number(weapon.ap) != "NaN"){
            attributes["repeating_vehicles_"+newrowid+"_vehicleweaponap"] = weapon.ap;
        }else{
            attributes["repeating_vehicles_"+newrowid+"_vehicleweaponap"] = 0;
        }
        attributes["repeating_vehicles_"+newrowid+"_vehicleweapondv"] = weapon.damage_english.match(/\d*/);
        attributes["repeating_vehicles_"+newrowid+"_vehicleweapondmgtype"] = weapon.damage_english.match(/^\d*/);
        attributes["repeating_vehicles_"+newrowid+"_vehicleweaponnotes"] = "";
        if(typeof weapon.accessories != "undefined"){
            if(weapon.accessories.accessory.length > 1){
                for(var h = 0; h < weapon.accessories.accessory.length; h++){
                    attributes["repeating_vehicles_"+newrowid+"_vehicleweaponnotes"] += weapon.accessories.accessory[h].name+"\n";
                }
            }else{
                attributes["repeating_vehicles_"+newrowid+"_vehicleweaponnotes"] += weapon.accessories.accessory.name+"\n";
            }
        }
    }
}