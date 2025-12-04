var update_shield_points = function() {
    getAttrs(["hp_max", "ship_shield_capacity", "ship_shield_max", "ship_shield_active_flag"], function(attrs) {
        if(attrs.ship_shield_active_flag == "1") {
            var tryParseShieldCapacity = parseFloat(attrs.ship_shield_capacity);
            if(!isNaN(tryParseShieldCapacity)) {
                var update = {};
                update.ship_shield_max = Math.ceil(tryParseShieldCapacity * attrs.hp_max);
                setAttrs(update, {silent: true});
            }
        }
    });
}

var update_shield_regen = function() {
    getAttrs(["ship_size", "ship_shield_regen_rate_coefficient", "ship_shield_active_flag"], function(attrs) {
        if(attrs.ship_shield_active_flag == "1") {
            var tryParseShieldCoefficient = isNaN(parseFloat(attrs.ship_shield_regen_rate_coefficient)) == false ? parseFloat(attrs.ship_shield_regen_rate_coefficient) : 0;

            var shipSizeHitDie = 0;
            switch(attrs.ship_size) {
                case "Tiny":
                    shipSizeHitDie = 4;
                    break;
                case "Small":
                    shipSizeHitDie = 6;
                    break;
                case "Medium":
                    shipSizeHitDie = 8;
                    break;
                case "Large":
                    shipSizeHitDie = 10;
                    break;
                case "Huge":
                    shipSizeHitDie = 12;
                    break;
                case "Gargantuan":
                    shipSizeHitDie = 20;
                    break;
            }

            setAttrs({
                ship_shield_regen_rate: Math.ceil(tryParseShieldCoefficient * shipSizeHitDie)
            }, {silent: true});
        }
    })
}

var update_ship_dice = function() {
    getAttrs(["ship_size", "hulldie_final", "hull_dice_max", "shielddie_final", "shield_dice_max", "base_ship_tier", "pwrdie_final", "hp_max", "hp", "constitution_mod", "strength_mod", "ship_shield", "ship_shield_points", "ship_shield_max", "ship_armor", "ship_armor_active_flag", "ship_armor_hp_per_hit_die", "ship_shield_capacity", "ship_shield_regen_rate_coefficient", "ship_shield_active_flag", "ship_shield_regen_rate"], function(attrs) {
        if(true) {
            var shipSizeDie = 0;
            var shipSizeDiceMax = 0;
            var shipSizeHullPoints = 0;
            var shipSizeShieldPoints = 0;
            var shipHullPointsAfterFirst = 0;
            var armorHpPerHitDieMod = 0;
            var shieldCapacity = 0;
            var shieldRegenRate = 0;
            var tierDieMultiplier = 0;
            var shipPwrDie = 0;
            var sTier = isNaN(parseInt(attrs.base_ship_tier)) == false ? parseInt(attrs.base_ship_tier) : 0;
            var localCon = isNaN(parseInt(attrs.constitution_mod)) == false ? parseInt(attrs.constitution_mod) : 0;
            var localStr = isNaN(parseInt(attrs.strength_mod)) == false ? parseInt(attrs.strength_mod) : 0;

            switch(attrs.ship_size) {
                case "Tiny":
                    shipSizeDie = 4;
                    shipSizeDiceMax = 1;
                    tierDieMultiplier = 1;
                    shipHullPointsAfterFirst = 3;
                    break;
                case "Small":
                    shipSizeDie = 6;
                    shipSizeDiceMax = 3;
                    tierDieMultiplier = 1;
                    shipHullPointsAfterFirst = 4;
                    break;
                case "Medium":
                    shipSizeDie = 8;
                    shipSizeDiceMax = 5;
                    tierDieMultiplier = 1;
                    shipHullPointsAfterFirst = 5;
                    break;
                case "Large":
                    shipSizeDie = 10;
                    shipSizeDiceMax = 7;
                    tierDieMultiplier = 1;
                    shipHullPointsAfterFirst = 6;
                    break;
                case "Huge":
                    shipSizeDie = 12;
                    shipSizeDiceMax = 9;
                    tierDieMultiplier = 2;
                    shipHullPointsAfterFirst = 7;
                    break;
                case "Gargantuan":
                    shipSizeDie = 20;
                    shipSizeDiceMax = 11;
                    tierDieMultiplier = 2;
                    shipHullPointsAfterFirst = 11;
                    break;
            }

            switch(sTier){
                case 0:
                    shipPwrDie = 1;
                    break;
                case 1:
                    shipPwrDie = 4;
                    break;
                case 2:
                    shipPwrDie = 6;
                    break;
                case 3:
                    shipPwrDie = 8;
                    break;
                case 4:
                    shipPwrDie = 10;
                    break;
                case 5:
                    shipPwrDie = 12;
                    break;
            }


            switch(attrs.ship_armor){
                case "none":
                    break;
                case "deflection":
                    break;
                case "lightweight":
                    armorHpPerHitDieMod = -1
                    break;
                case "reinforced":
                    armorHpPerHitDieMod = 1
                    break;
                case "customshiparmor":
                    if(attrs.ship_armor_active_flag == "1") {
                        var tempHpAttrBonus = attrs["ship_armor_hp_per_hit_die"]
                        var tryParseHpBonus = parseInt(tempHpAttrBonus);
                        if(!isNaN(tryParseHpBonus)) {
                            armorHpPerHitDieMod = tryParseHpBonus;
                        }
                    }
                    break;
            }

            switch(attrs.ship_shield){
                case "none":
                    break;
                case "directional":
                    shieldCapacity = 1;
                    shieldRegenRate = 1;
                    break;
                case "fortress":
                    shieldCapacity = 3/2;
                    shieldRegenRate = 2/3;
                    break;
                case "quickcharge":
                    shieldCapacity = 2/3;
                    shieldRegenRate = 3/2;
                    break;
                case "customshipshield":
                    if(attrs.ship_shield_active_flag == "1") {
                        shieldCapacity = isNaN(parseFloat(attrs.ship_shield_capacity)) == false ? parseFloat(attrs.ship_shield_capacity) : 0;
                        shieldRegenRate = isNaN(parseFloat(attrs.ship_shield_regen_rate_coefficient)) == false ? parseFloat(attrs.ship_shield_regen_rate_coefficient) : 0;
                    }
                    break;
            }



            var adjustedTierDies = shipSizeDiceMax + (sTier * tierDieMultiplier);
            shipSizeHullPoints = shipSizeDie + localCon + ((adjustedTierDies-1) * shipHullPointsAfterFirst) + ((adjustedTierDies-1) * localCon) + (adjustedTierDies * armorHpPerHitDieMod);
            shipSizeShieldPoints = Math.floor(((shipSizeDie + localStr) + ((adjustedTierDies-1) * shipHullPointsAfterFirst) + ((adjustedTierDies-1) * localStr)) * shieldCapacity);
            var shipSizeShieldRegen = Math.floor(shipSizeDie * shieldRegenRate);

            setAttrs({hulldie_final: shipSizeDie}, {silent: true});
            setAttrs({hull_dice_max: adjustedTierDies}, {silent: true});
            setAttrs({shielddie_final: shipSizeDie}, {silent: true});
            setAttrs({shield_dice_max: adjustedTierDies}, {silent: true});
            setAttrs({pwrdie_final: shipPwrDie}, {silent: true});
            setAttrs({hp_max: shipSizeHullPoints}, {silent: true});
            setAttrs({hp: shipSizeHullPoints}, {silent: true});
            setAttrs({ship_shield_max: shipSizeShieldPoints}, {silent: true});
            setAttrs({ship_shield_points: shipSizeShieldPoints}, {silent: true});
            setAttrs({ship_shield_regen_rate: shipSizeShieldRegen}, {silent: true});
        }
        else {
            setAttrs({hull_dice_max: 0}, {silent: true});
        }
    })
};

var update_pwr_die_recovery = function() {
    getAttrs(["pwrdie_recovery", "ship_reactor", "pwrdie_mod"], function(attrs) {
        if(true) {
            var pwrDieRecov = 0;
            var pwrDieMod = 0;

            switch(attrs.ship_reactor) {
                case "none":
                    pwrDieRecov = 0;
                    break;
                case "fuelcell":
                    pwrDieRecov = 1;
                    break;
                case "ionization":
                    pwrDieRecov = 2;
                    pwrDieMod = 1;
                    break;
                case "powercore":
                    pwrDieRecov = 2;
                    break;
            }

            setAttrs({pwrdie_recovery: pwrDieRecov}, {silent: true});
            setAttrs({pwrdie_mod: pwrDieMod}, {silent: true});

        }
        else {
            setAttrs({pwrdie_recovery: 0}, {silent: true});
            setAttrs({pwrdie_mod: 0}, {silent: true});
        }
    })
};

var update_pwr_die_capacity = function() {
    getAttrs(["ship_pwr_coupling", "pwr_s_storage", "pwr_c_storage"], function(attrs) {
        if(true) {
            var pwrCentralStore = 0;
            var pwrSystemStore = 0;

            switch(attrs.ship_pwr_coupling) {
                case "none":
                    pwrCentralStore = 0;
                    pwrSystemStore = 0;
                    break;
                case "direct":
                    pwrCentralStore = 4;
                    pwrSystemStore = 0;
                    break;
                case "distributed":
                    pwrCentralStore = 0;
                    pwrSystemStore = 2;
                    break;
                case "hubspoke":
                    pwrCentralStore = 2;
                    pwrSystemStore = 1;
                    break;
            }

            setAttrs({pwr_s_storage: pwrSystemStore}, {silent: true});
            setAttrs({pwr_c_storage: pwrCentralStore}, {silent: true});

        }
        else {
            setAttrs({pwr_s_storage: 0}, {silent: true});
            setAttrs({pwr_c_storage: 0}, {silent: true});
        }
    })
};

var update_ship_capacity = function() {
    getAttrs(["ship_size", "ship_fuel_max", "ship_food_max", "ship_reg_cargo_max", "ship_fuel_cost", "ship_reactor"], function(attrs) {
        if(true) {
            var shipCargoCap = 0;
            var shipFuelCap = 0;
            var shipFoodCap = 0;
            var shipFuelCost = 0;
            var shipFuelMod = 0;

            switch(attrs.ship_reactor) {
                case "none":
                    shipFuelMod = 1;
                    break;
                case "fuelcell":
                    shipFuelMod = 1;
                    break;
                case "ionization":
                    shipFuelMod = 2/3;
                    break;
                case "powercore":
                    shipFuelMod = 3/2;
                    break;
            }

            switch(attrs.ship_size) {
                case "Tiny":
                    shipCargoCap = 0;
                    shipFoodCap = 0;
                    shipFuelCap = 5;
                    shipFuelCost = 25;
                    break;
                case "Small":
                    shipCargoCap = 2;
                    shipFoodCap = 10;
                    shipFuelCap = 10;
                    shipFuelCost = 50;
                    break;
                case "Medium":
                    shipCargoCap = 25;
                    shipFoodCap = 120;
                    shipFuelCap = 30;
                    shipFuelCost = 100;
                    break;
                case "Large":
                    shipCargoCap = 500;
                    shipFoodCap = 240000;
                    shipFuelCap = 300;
                    shipFuelCost = 1000;
                    break;
                case "Huge":
                    shipCargoCap = 10000;
                    shipFoodCap = 9600000;
                    shipFuelCap = 600;
                    shipFuelCost = 10000;
                    break;
                case "Gargantuan":
                    shipCargoCap = 200000;
                    shipFoodCap = 576000000;
                    shipFuelCap = 1800;
                    shipFuelCost = 100000;
                    break;
            }

            setAttrs({ship_fuel_max: shipFuelCap}, {silent: true});
            setAttrs({ship_food_max: shipFoodCap}, {silent: true});
            setAttrs({ship_reg_cargo_max: shipCargoCap}, {silent: true});
            setAttrs({ship_fuel_cost: Math.ceil(shipFuelCost * shipFuelMod)}, {silent: true})
        }
        else {
            setAttrs({ship_fuel_max: 0}, {silent: true});
            setAttrs({ship_food_max: 0}, {silent: true});
            setAttrs({ship_reg_cargo_max: 0}, {silent: true});
            setAttrs({ship_fuel_cost: 0}, {silent: true})
        }
    })
};

var update_ship_suite_capacity = function() {
    getAttrs(["ship_size", "attr_ship_suites_max", "attr_ship_mod_max", "constitution_mod"], function(attrs) {
        if(true) {
            var shipModCap = 0;
            var shipSuiteCap = 0;
            var cons_mod = attrs.constitution_mod

            switch(attrs.ship_size) {
                case "Tiny":
                    shipModCap = 10;
                    shipSuiteCap = 0;
                    break;
                case "Small":
                    shipModCap = 20;
                    shipSuiteCap = -1 + cons_mod;
                    break;
                case "Medium":
                    shipModCap = 30;
                    shipSuiteCap = 3 + cons_mod;
                    break;
                case "Large":
                    shipModCap = 50;
                    shipSuiteCap = 3 + (2*cons_mod);
                    break;
                case "Huge":
                    shipModCap = 60;
                    shipSuiteCap = 6 + (3*cons_mod);
                    break;
                case "Gargantuan":
                    shipModCap = 70;
                    shipSuiteCap = 10 + (4*cons_mod);
                    break;
            }

            setAttrs({ship_suites_max: shipSuiteCap}, {silent: true});
            setAttrs({ship_mod_max: shipModCap}, {silent: true});
        }
        else {
            setAttrs({ship_suites_max: 0}, {silent: true});
            setAttrs({ship_mod_max: 0}, {silent: true});
        }
    })
};

var update_ship_tier_cost = function() {
    getAttrs(["ship_size", "base_ship_tier", "ship_cr_next"], function(attrs) {
        if(true) {
            var sTier = isNaN(parseInt(attrs.base_ship_tier)) == false ? parseInt(attrs.base_ship_tier) : 0;
            var shipTierCostMod = 0;
            var shipTierCostFinal = 0;

            switch(attrs.ship_size) {
                case "Tiny":
                    shipTierCostMod = 1/2;
                    break;
                case "Small":
                    shipTierCostMod = 1;
                    break;
                case "Medium":
                    shipTierCostMod = 2;
                    break;
                case "Large":
                    shipTierCostMod = 10;
                    break;
                case "Huge":
                    shipTierCostMod = 100;
                    break;
                case "Gargantuan":
                    shipTierCostMod = 1000;
                    break;
            }

            switch(sTier) {
                case 0:
                    shipTierCostFinal = 3900*shipTierCostMod;
                    break;
                case 1:
                    shipTierCostFinal = 77500*shipTierCostMod;
                    break;
                case 2:
                    shipTierCostFinal = 297000*shipTierCostMod;
                    break;
                case 3:
                    shipTierCostFinal = 620000*shipTierCostMod;
                    break;
                case 4:
                    shipTierCostFinal = 1150000*shipTierCostMod;
                    break;
                case 5:
                    shipTierCostFinal = "N/A";
            }

            setAttrs({ship_cr_next: shipTierCostFinal}, {silent: true});
        }
        else {
            setAttrs({ship_cr_next: 0}, {silent: true});
        }
    })
};
