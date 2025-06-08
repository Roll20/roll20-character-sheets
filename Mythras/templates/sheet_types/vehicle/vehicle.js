const vehicleSystemsTable = {
    "terrestrial": [
        getTranslationByKey('cargo_compartment'),
        getTranslationByKey('communications'),
        getTranslationByKey('controls'),
        getTranslationByKey('drive') + "/" + getTranslationByKey('repulsorlift'),
        getTranslationByKey('pilot') + "/" + getTranslationByKey('passengers'),
        getTranslationByKey('power_core'),
        getTranslationByKey('sensors'),
        getTranslationByKey('weapons'),
        '',
        ''
    ],
    "spaceship": [
        getTranslationByKey('avionics'),
        getTranslationByKey('communications'),
        getTranslationByKey('crew'),
        getTranslationByKey('hold') + "/" + getTranslationByKey('hanger_bay'),
        getTranslationByKey('hyperdrive'),
        getTranslationByKey('reactor_core'),
        getTranslationByKey('sensors'),
        getTranslationByKey('shields'),
        getTranslationByKey('sublight_drive'),
        getTranslationByKey('weapons')
    ]
}

function calcSystemHits(num, v) {
    const hitsBase = parseInt(v['vehicle_size']) || 1;
    const hitsMod = parseInt(v[`vehicle_system${num}_hits_mod`]) || 0;
    const hitsCurr = parseInt(v[`vehicle_system${num}_hits`]) || 0;
    const hitsMaxCurr = parseInt(v[`vehicle_system${num}_hits_max`]) || 0;
    const newMax = hitsBase + hitsMod;
    const diff = hitsCurr - hitsMaxCurr;
    return {[`vehicle_system${num}_hits`]: newMax + diff, [`vehicle_system${num}_hits_max`]: newMax};
}

function calcAllSystemHits(v) {
    return {
        ...calcSystemHits('1', v),
        ...calcSystemHits('2', v),
        ...calcSystemHits('3', v),
        ...calcSystemHits('4', v),
        ...calcSystemHits('5', v),
        ...calcSystemHits('6', v),
        ...calcSystemHits('7', v),
        ...calcSystemHits('8', v),
        ...calcSystemHits('9', v),
        ...calcSystemHits('10', v)
    }
}

on('change:vehicle_size', function(event) {
    if (event.sourceType === "sheetworker") {return;}

    getAttrs(['vehicle_size', 'vehicle_system1_hits', 'vehicle_system1_hits_mod', 'vehicle_system1_hits_max',
        'vehicle_system2_hits', 'vehicle_system2_hits_mod', 'vehicle_system2_hits_max',
        'vehicle_system3_hits', 'vehicle_system3_hits_mod', 'vehicle_system3_hits_max',
        'vehicle_system4_hits', 'vehicle_system4_hits_mod', 'vehicle_system4_hits_max',
        'vehicle_system5_hits', 'vehicle_system5_hits_mod', 'vehicle_system5_hits_max',
        'vehicle_system6_hits', 'vehicle_system6_hits_mod', 'vehicle_system6_hits_max',
        'vehicle_system7_hits', 'vehicle_system7_hits_mod', 'vehicle_system7_hits_max',
        'vehicle_system8_hits', 'vehicle_system8_hits_mod', 'vehicle_system8_hits_max',
        'vehicle_system9_hits', 'vehicle_system9_hits_mod', 'vehicle_system9_hits_max',
        'vehicle_system10_hits', 'vehicle_system10_hits_mod', 'vehicle_system10_hits_max'], function(v) {
        setAttrs(calcAllSystemHits(v));
    });
});

['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].forEach(num => {
    on(`change:vehicle_system${num}_hits_mod`, function(event) {
        if (event.sourceType === "sheetworker") {return;}

        getAttrs(['vehicle_size', `vehicle_system${num}_hits`, `vehicle_system${num}_hits_mod`, `vehicle_system${num}_hits_max`], function(v) {
            setAttrs(calcSystemHits(num, v))
        });
    });
});

on(`change:mythras_vehicle_type`, function(event) {
    if (event.sourceType === "sheetworker") {return;}

    let newAttrs = {}
    if (event.newValue === 'spaceship') {
        newAttrs['vehicle_system_die'] = '1d10';
        newAttrs['vehicle_starship_system_display'] = '1';
    } else {
        newAttrs['vehicle_system_die'] = '1d8';
        newAttrs['vehicle_starship_system_display'] = '0';
    }
    for (let i = 0; i < 10; i++) {
        const systemNum = i + 1;
        newAttrs[`vehicle_system${systemNum}_name`] = vehicleSystemsTable[event.newValue][i];
    }
    setAttrs(newAttrs);
});

/* Frostbyte Vehicle Scripts */
const movementClassTable = {
    "regular": {
        "moduleMod": .1
    },
    "terrain": {
        "moduleMod": .2
    },
    "walker": {
        "moduleMod": 2
    },
    "burrower": {
        "moduleMod": 3,
        "speedMod": .1
    },
    "motor": {
        "moduleMod": 2,
        "speedMod": .5
    },
    "sail": {
        "moduleMod": 2,
        "speedMod": .5
    },
    "sub": {
        "moduleMod": 3,
        "speedMod": .5
    },
    "wings": {
        "moduleMod": 3
    },
    "anti-grav": {
        "moduleMod": .1
    },
    "rotor_blades": {
        "moduleMod": 2
    },
    "hover_craft": {
        "moduleMod": 2
    },
    "gas_bag": {
        "moduleMod": 100
    },
    "spaceship": {
        "moduleMod": 0
    }
};

on(`change:msvehicle_type`, function(event) {
    let newAttrs = {};
    newAttrs['msvehicle_spaceship_toggle'] = event.newValue === 'spaceship' ? '1' : '0';
    setAttrs(newAttrs);
});

on('change:repeating_fbvehiclemodule:moduletype change:repeating_fbvehiclemodule:rating change:repeating_fbvehiclemodule:count change:msvehicle_type remove:repeating_fbvehiclemodule', function(event) {
    if (event.sourceType === "sheetworker") {return;}

    getSectionIDsOrdered("repeating_fbvehiclemodule", function(moduleIds) {
        let moduleGetAttrs = [];

        moduleIds.forEach(id => {
            moduleGetAttrs.push(`repeating_fbvehiclemodule_${id}_moduletype`, `repeating_fbvehiclemodule_${id}_rating`, `repeating_fbvehiclemodule_${id}_count`);
        });

        getAttrs(moduleGetAttrs.concat(['fbvehicle_movement_class_count', 'msvehicle_type']), function(v) {
            const moduleMod = movementClassTable[v['msvehicle_type']]['moduleMod'];
            let newAttrs = {};
            let totalEngineRating = 0;
            let totalManeuveringRating = 0;
            let totalHyperdriveCount = 0;
            let totalRepeatingModuleCount = 0;
            let totalModules = 0;

            moduleIds.forEach(id => {
                const moduleCount = parseFloat(v[`repeating_fbvehiclemodule_${id}_count`]) || 0;
                totalRepeatingModuleCount = totalRepeatingModuleCount + moduleCount;

                if (v[`repeating_fbvehiclemodule_${id}_moduletype`] === 'engine') {
                    const moduleRating = parseInt(v[`repeating_fbvehiclemodule_${id}_rating`]);
                    totalEngineRating = totalEngineRating + (moduleCount * moduleRating);
                } else if (v[`repeating_fbvehiclemodule_${id}_moduletype`] === 'maneuvering') {
                    const moduleRating = parseInt(v[`repeating_fbvehiclemodule_${id}_rating`]);
                    totalManeuveringRating = totalManeuveringRating + (moduleCount * moduleRating);
                } else if (v[`repeating_fbvehiclemodule_${id}_moduletype`] === 'hyperdrive') {
                    totalHyperdriveCount = totalHyperdriveCount + moduleCount;
                }

                newAttrs['msvehicle_hyperspace'] = Math.ceil(totalHyperdriveCount);

                /* Set the movement class module adjustment */
                let movementClassModules = totalRepeatingModuleCount * moduleMod;
                if (v['msvehicle_type'] === "spaceship") {
                    movementClassModules = 0;
                } else if (v['msvehicle_type'] === "terrain" && movementClassModules < 2) {
                    movementClassModules = 2;
                } else if (movementClassModules < 1){
                    movementClassModules = 1;
                }
                totalModules = movementClassModules + totalRepeatingModuleCount;
                newAttrs['msvehicle_total_modules'] = parseFloat(totalModules.toFixed(2));
                newAttrs['fbvehicle_movement_class_count'] = parseFloat(movementClassModules.toFixed(2));

                /* Set Size and Size Rating */
                if (v['msvehicle_type'] === "spaceship") {
                    newAttrs['msvehicle_size'] = Math.ceil(totalModules);
                    newAttrs['msvehicle_size_rating'] = Math.floor(Math.log2(newAttrs['msvehicle_size'])) + 1;
                } else {
                    newAttrs['msvehicle_size'] = Math.ceil(totalModules * 10);
                }

                /* Speed & Handling */
                let speedMod = 1;
                if ('speedMod' in movementClassTable[v['msvehicle_type']]) {
                    speedMod = movementClassTable[v['msvehicle_type']]['speedMod'];
                }
                newAttrs['msvehicle_speed'] = Math.ceil((totalEngineRating / totalModules) * speedMod);
                newAttrs['msvehicle_handling'] = Math.ceil((totalManeuveringRating / totalModules) * speedMod);
            });

            /* Hit Location */
            if (v['msvehicle_type'] === 'spaceship') {
                let hitTableArray = [];
                let totalRatio = 0;
                let moduleOrder = 0;
                moduleIds.forEach(id => {
                    let moduleObj = {};
                    const moduleCount = parseFloat(v[`repeating_fbvehiclemodule_${id}_count`]) || 0;
                    const ratioRaw = (moduleCount / totalModules) * 100;
                    moduleObj['id'] = id;
                    moduleObj['order'] = moduleOrder;
                    moduleObj['roundedness'] = Math.abs((ratioRaw % 1) - .5);
                    moduleObj['ratio'] = Math.round(ratioRaw);
                    if (moduleObj['ratio'] > 0 && moduleObj['ratio'] < 1) {
                        moduleObj['ratio'] = 1;
                    }
                    totalRatio = totalRatio + moduleObj['ratio'];
                    hitTableArray.push(moduleObj);
                    moduleOrder = moduleOrder + 1;
                });

                let ratioLastValue = 0;
                let ratioDiff = 0;


                if (totalRatio !== 100) {
                    /* We want to modify the modules which where most rounded so we sort by inverse roundedness */
                    hitTableArray.sort((a, b) => {
                        return b['roundedness'] - a['roundedness'];
                    });
                    if (totalRatio > 100) {
                        ratioDiff = totalRatio - 100;
                        console.log("table over by " + ratioDiff);
                        hitTableArray.forEach(module => {
                            if (ratioDiff > 0 && module['ratio'] !== 1) {
                                module['ratio'] = module['ratio'] - 1;
                                ratioDiff = ratioDiff - 1;
                            }
                        });
                    } else {
                        ratioDiff = 100 - totalRatio;
                        console.log("table under by " + ratioDiff);
                        hitTableArray.forEach(module => {
                            if (ratioDiff > 0) {
                                module['ratio'] = module['ratio'] + 1;
                                ratioDiff = ratioDiff - 1;
                            }
                        });
                    }
                    /* Re-sort back into order */
                    hitTableArray.sort((a, b) => {
                        return a['order'] - b['order'];
                    });
                }
                hitTableArray.forEach(module => {
                    const hitRollStart = (ratioLastValue + 1) === 100 ? '00' : ratioLastValue + 1;
                    const hitRollEnd = (ratioLastValue + module['ratio']) === 100 ? '00' : ratioLastValue + module['ratio'];
                    ratioLastValue = hitRollEnd;
                    if (hitRollStart === hitRollEnd) {
                        newAttrs[`repeating_fbvehiclemodule_${module['id']}_hitroll`] = hitRollEnd === 100 ? '00' : hitRollEnd;
                    } else {

                        newAttrs[`repeating_fbvehiclemodule_${module['id']}_hitroll`] = hitRollStart + '-' + hitRollEnd;
                    }
                });
            }

            setAttrs(newAttrs);
        });
    });
});

/* Mythras Vehicle Upgrades */
function upgradeMythrasVehicle3Dot0() {
    getSectionIDs("repeating_vehicleweapon", function(vehicleweaponIds) {
        let vehicleweaponGetAttrs = [];
        vehicleweaponIds.forEach(id => {
            vehicleweaponGetAttrs.push(`repeating_vehicleweapon_${id}_name`, `repeating_vehicleweapon_${id}_range`, `repeating_vehicleweapon_${id}_damage`, `repeating_vehicleweapon_${id}_load`, `repeating_vehicleweapon_${id}_ammo`, `repeating_vehicleweapon_${id}_traits`);
        });
        getAttrs(vehicleweaponGetAttrs.concat(['vehicle_size', 'mythras_vehicle_type']), function (v) {
            let newAttrs = {
                'version': '3.0',
                'sheet_type': 'vehicle',
                'hit_location_roll': '@{vehicle_system_roll}',
                'hit_location_low_roll': '@{vehicle_system_roll}',
                'hit_location_high_roll': '@{vehicle_system_roll}'
            };
            if (v['mythras_vehicle_type'] === "spaceship") {
                newAttrs['vehicle_starship_system_display'] = 1;
            }
            for (let num = 1; num < 11; num++) {
                newAttrs[`vehicle_system${num}_hits_max`] = v['vehicle_size'];
            }
            vehicleweaponIds.forEach(id => {
                const weaponId = 'repeating_rangedweapon_' + generateRowID();
                newAttrs[`${weaponId}_name`] = v[`repeating_vehicleweapon_${id}_name`] ? v[`repeating_vehicleweapon_${id}_name`] : "?";
                newAttrs[`${weaponId}_damage`] = v[`repeating_vehicleweapon_${id}_damage`] ? v[`repeating_vehicleweapon_${id}_damage`] : "";
                newAttrs[`${weaponId}_range`] = v[`repeating_vehicleweapon_${id}_range`] ? v[`repeating_vehicleweapon_${id}_range`] : "";
                newAttrs[`${weaponId}_load`] = v[`repeating_vehicleweapon_${id}_load`] ? v[`repeating_vehicleweapon_${id}_load`] : "";
                newAttrs[`${weaponId}_notes`] = v[`repeating_vehicleweapon_${id}_traits`] ? v[`repeating_vehicleweapon_${id}_traits`] : "";
                newAttrs[`${weaponId}_ammo`] = v[`repeating_vehicleweapon_${id}_ammo`] ? v[`repeating_vehicleweapon_${id}_ammo`] : "0";
                newAttrs[`${weaponId}_ammo_max`] = v[`repeating_vehicleweapon_${id}_ammo`] ? v[`repeating_vehicleweapon_${id}_ammo`] : "0";
            });

            console.log(newAttrs);
            setAttrs(newAttrs);
        });
    });
}

/* Frostbyte Vehicle Upgrades */
function upgradeFrostbyteVehicle3Dot0() {
    getSectionIDs("repeating_msvehicleweapon", function(msvehicleweaponIds) {
        const oldModules = ['airlock', 'cargo', 'cockpit', 'crew', 'engines', 'escape_pod', 'extra_sensors', 'environment', 'hanger', 'hyperspace', 'lab', 'maneuvering', 'open_space', 'passengers', 'rescue_utilities', 'robot_arm', 'self_repair', 'sensors', 'sickbay', 'storage', 'weapons'];
        let oldModuleGetAttrs = [];
        oldModules.forEach(oldModule => {
            oldModuleGetAttrs.push(`msvehicle_${oldModule}`, `msvehicle_${oldModule}_hp`, `msvehicle_${oldModule}_table_start`, `msvehicle_${oldModule}_table_end`);
        });
        let msvehicleweaponGetAttrs = [];
        msvehicleweaponIds.forEach(id => {
            msvehicleweaponGetAttrs.push(`repeating_msvehicleweapon_${id}_name`, `repeating_msvehicleweapon_${id}_range`, `repeating_msvehicleweapon_${id}_damage`, `repeating_msvehicleweapon_${id}_ammo`);
        });
        getAttrs(msvehicleweaponGetAttrs.concat(oldModuleGetAttrs, ['type', 'msvehicle_type', 'msvehicle_notes', 'msvehicle_size', 'msvehicle_engines_hphp', 'msvehicle_hyperdrive_table_start', 'msvehicle_hyperdrive_table_end', 'msvehicle_engines_tr', 'msvehicle_maneuvering_tr']), function (v) {
            let newAttrs = {
                'version': '3.0',
                'sheet_type': 'vehicle'
            };
            if (v['msvehicle_type'] === 'spaceship') {
                newAttrs['hit_location_roll'] = '@{d100_hit_location_roll}';
                newAttrs['hit_location_low_roll'] = '@{d100_hit_location_low_roll}';
                newAttrs['hit_location_high_roll'] = '@{d100_hit_location_high_roll}';
            } else {
                newAttrs['hit_location_roll'] = '@{none_hit_location_roll}';
                newAttrs['hit_location_low_roll'] = '@{none_hit_location_roll}';
                newAttrs['hit_location_high_roll'] = '@{none_hit_location_roll}';
            }
            msvehicleweaponIds.forEach(id => {
                const weaponId = 'repeating_rangedweapon_' + generateRowID();
                newAttrs[`${weaponId}_name`] = v[`repeating_msvehicleweapon_${id}_name`] ? v[`repeating_msvehicleweapon_${id}_name`] : "?";
                newAttrs[`${weaponId}_damage`] = v[`repeating_msvehicleweapon_${id}_damage`] ? v[`repeating_msvehicleweapon_${id}_damage`] : "";
                newAttrs[`${weaponId}_range`] = v[`repeating_msvehicleweapon_${id}_range`] ? v[`repeating_msvehicleweapon_${id}_range`] : "";
                newAttrs[`${weaponId}_ammo`] = v[`repeating_msvehicleweapon_${id}_ammo`] ? v[`repeating_msvehicleweapon_${id}_ammo`] : "0";
                newAttrs[`${weaponId}_ammo_max`] = v[`repeating_msvehicleweapon_${id}_ammo`] ? v[`repeating_msvehicleweapon_${id}_ammo`] : "0";
            });

            let total_modules = 0;
            oldModules.forEach(oldModule => {
                const moduleCount = parseFloat(v[`msvehicle_${oldModule}`]) || 0;
                if (moduleCount > 0) {
                    const moduleId = 'repeating_fbvehiclemodule_' + generateRowID();
                    total_modules = total_modules + moduleCount;
                    if (oldModule === 'engines') {
                        newAttrs[`${moduleId}_moduletype`] = 'engine';
                        newAttrs[`${moduleId}_rating`] = v['msvehicle_engines_tr'];
                    } else if (oldModule === 'maneuvering') {
                        newAttrs[`${moduleId}_moduletype`] = 'maneuvering';
                        newAttrs[`${moduleId}_rating`] = v['msvehicle_maneuvering_tr'];
                    } else if (oldModule === 'hyperspace') {
                        newAttrs[`${moduleId}_moduletype`] = 'hyperdrive';
                    }

                    if (oldModule === 'cargo') {
                        newAttrs[`${moduleId}_name`] = getTranslationByKey('cargo_hold');
                    } else if (oldModule === 'hanger') {
                        newAttrs[`${moduleId}_name`] = getTranslationByKey('hangar_bay');
                    } else {
                        newAttrs[`${moduleId}_name`] = getTranslationByKey(oldModule);
                    }

                    // Hyperspace module had a difference base var name for table values in v2
                    if (oldModule === 'hyperspace') {
                        if (v[`msvehicle_hyperdrive_table_start`] === v[`msvehicle_hyperdrive_table_end`]) {
                            newAttrs[`${moduleId}_hitroll`] = v[`msvehicle_hyperdrive_table_end`];
                        } else {
                            newAttrs[`${moduleId}_hitroll`] = v[`msvehicle_hyperdrive_table_start`] + '-' + v[`msvehicle_hyperdrive_table_end`];
                        }
                    } else {
                        if (v[`msvehicle_${oldModule}_table_start`] && v[`msvehicle_${oldModule}_table_end`]) {
                            if (v[`msvehicle_${oldModule}_table_start`] === v[`msvehicle_${oldModule}_table_end`]) {
                                newAttrs[`${moduleId}_hitroll`] = v[`msvehicle_${oldModule}_table_end`];
                            } else {
                                newAttrs[`${moduleId}_hitroll`] = v[`msvehicle_${oldModule}_table_start`] + '-' + v[`msvehicle_${oldModule}_table_end`];
                            }
                        }
                    }

                    // There was a type in v2 in the engine hp variable name
                    if (oldModule === 'engines') {
                        newAttrs[`${moduleId}_hp`] = v[`msvehicle_${oldModule}_hphp`] ? v[`msvehicle_${oldModule}_hphp`] : 0;
                    } else {
                        newAttrs[`${moduleId}_hp`] = v[`msvehicle_${oldModule}_hp`] ? v[`msvehicle_${oldModule}_hp`] : 0;
                    }

                    newAttrs[`${moduleId}_count`] = moduleCount;
                }
            });

            /* Set the movement class module adjustment */
            const moduleMod = movementClassTable[v['msvehicle_type']]['moduleMod'];
            let movementClassModules = total_modules * moduleMod;
            if (v['msvehicle_type'] === "spaceship") {
                movementClassModules = 0;
            } else if (v['msvehicle_type'] === "terrain" && movementClassModules < 2) {
                movementClassModules = 2;
            } else if (movementClassModules < 1){
                movementClassModules = 1;
            }
            newAttrs['fbvehicle_movement_class_count'] = parseFloat(movementClassModules).toFixed(2);
            total_modules = total_modules + movementClassModules;
            newAttrs['msvehicle_total_modules'] = parseFloat(total_modules).toFixed(2);

            if (v['msvehicle_type'] === "spaceship") {
                newAttrs['msvehicle_size'] = Math.ceil(total_modules);
                newAttrs['msvehicle_size_rating'] = Math.floor(Math.log2(newAttrs['msvehicle_size'])) + 1;
            } else {
                newAttrs['msvehicle_size'] = Math.ceil(total_modules * 10);
            }

            /* Convert notes */
            newAttrs[`sheet_notes`] = v['msvehicle_notes'] ? v['msvehicle_notes'] : "";

            setAttrs(newAttrs);
        });
    });
}

/* General Upgrades */
function upgradeVehicle3Dot0() {
    getAttrs(['vehicle_type'], function(v) {
        if (v['vehicle_type'] === 'mythras') {
            upgradeMythrasVehicle3Dot0()
        } else if (v['vehicle_type'] === 'mspace') {
            upgradeFrostbyteVehicle3Dot0()
        }
    });
}