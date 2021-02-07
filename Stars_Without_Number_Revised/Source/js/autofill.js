/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/* Autofill stuff */
const fillClassStats = () => {
    getAttrs(["class", "class_ability", "attack_bonus"], v => {
        const label = v.class && reverseClasses[v.class.toLowerCase()];
        if (label && autofillData.classes.hasOwnProperty(label)) {
            const data = Object.assign({}, autofillData.classes[label]);
            Object.keys(data).forEach(key => {
                if (!(["", "0"].includes(`${v[key]}`))) delete data[key];
            });
            mySetAttrs(data, v);
        }
    });
};
const getShipMultiplier = (shipClass) => {
    if ((shipClass || "").toLowerCase() === "frigate") return 2;
    else if ((shipClass || "").toLowerCase() === "cruiser") return 3;
    else if ((shipClass || "").toLowerCase() === "capital") return 4;
    else return 1;
};
const getShipPriceMultiplier = (shipClass) => {
    if ((shipClass || "").toLowerCase() === "frigate") return 10;
    else if ((shipClass || "").toLowerCase() === "cruiser") return 25;
    else if ((shipClass || "").toLowerCase() === "capital") return 100;
    else return 1;
}
const getAutofillData = (sName, v, data, label) => {
    // Transforms the stored data to be suitable for
    // inclusion into the sheet.
    const output = Object.assign({}, data);
    if (sName === "ship-defenses") {
        if (label) output.defense_name = translate(label.toUpperCase());
        if (output.defense_mass.includes("#")) {
            output.defense_mass = `${parseInt(output.defense_mass) * v.ship_multiplier}`;
        }
        if (output.defense_price.includes("*")) {
            output.defense_price = `${parseInt(output.defense_price) * v.ship_price_multiplier}`;
        }
    }
    if (sName === "ship-fittings") {
        if (label) {
            output.fitting_name = translate(label.toUpperCase());
            output.fitting_effect = translate(`${label.toUpperCase()}_DESC`);
        }
        if (output.fitting_mass.includes("#")) {
            output.fitting_mass = `${Math.round(parseFloat(output.fitting_mass) * v.ship_multiplier)}`;
        }
        if (output.fitting_power.includes("#")) {
            output.fitting_power = `${parseInt(output.fitting_power) * v.ship_multiplier}`;
        }
        if (output.fitting_price.includes("*")) {
            output.fitting_price = `${parseInt(output.fitting_price) * v.ship_price_multiplier}`;
        }
    }
    if (sName === "ship-weapons") {
        if (label) output.weapon_name = translate(label.toUpperCase());
        if (output.weapon_ammo) {
            output.weapon_ammo_max = output.weapon_ammo;
            output.weapon_use_ammo = "{{ammo=[[@{weapon_ammo} - 1]] / @{weapon_ammo_max}}}";
        }
    }
    if (sName === "weapons") {
        if (label) {
            output.weapon_name = translate(label.toUpperCase());
            output.weapon_description = translate(`${label.toUpperCase()}_DESC`);
        }
        if (output.weapon_ammo) {
            output.weapon_ammo_max = output.weapon_ammo;
            output.weapon_use_ammo = "{{ammo=[[0@{weapon_ammo} - (1 @{weapon_burst})]] / @{weapon_ammo|max}}}";
        }
        if (output.weapon_shock_damage) {
            output.weapon_shock = "{{shock=[[@{weapon_shock_damage} + @{weapon_attribute_mod}[Attribute] + @{weapon_skill_to_damage}[Skill]]] ^{SHOCK_DAMAGE_AGAINST_AC_LEQ} @{weapon_shock_ac}!}}";
        }
        if (output.weapon_burst) {
            output.weapon_burst = "@{burst_query}";
        }
        if (!output.weapon_attribute_mod) {
            output.weapon_attribute_mod = "@{dexterity_mod}";
        }
    }
    if (sName === "armor") {
        if (label) {
            output.armor_name = translate(label.toUpperCase());
            output.armor_description = translate(`${label.toUpperCase()}_DESC`) || "";
        }
    }
    if (sName === "cyberware") {
        if (label) {
            output.cyberware_name = translate(label.toUpperCase());
            output.cyberware_description = translate(`${label.toUpperCase()}_DESC`);
        }
    }
    if (sName === "foci") {
        if (label) {
            output.focus_name = translate(label.toUpperCase());
            output.focus_level = "1";
            output.focus_description = translate(`${label.toUpperCase()}_DESC`);
        }
    }
    if (sName === "techniques") {
        if (label) {
            output.technique_name = translate(label.toUpperCase());
            output.technique_description = translate(`${label.toUpperCase()}_DESC`);
        }
    }
    if (sName === "gear") {
        if (label) {
            output.gear_name = translate(label.toUpperCase());
            output.gear_description = translate(`${label.toUpperCase()}_DESC`);
        }
        if (output.gear_encumbrance === "1#") {
            output.gear_encumbrance = "1";
            output.gear_bundled = "on";
        }
    }
    return output;
};
const getAutofillInfo = (sName, v, inputData, label) => {
    const data = getAutofillData(sName, v, inputData, label);
    const formatter = new Intl.NumberFormat();
    // Generates info text from the stored data
    if (sName === "ship-defenses") {
        return `${translate(data.class)}+. ${translate("POWER_INIT")}: ${data.defense_power}, ${
            translate("MASS_INIT")}: ${data.defense_mass}, ${translate("CREDITS")}: ${formatter.format(data.defense_price) !== "NaN" ? formatter.format(data.defense_price) : data.defense_price}. ${data.defense_effect}`;
    }
    if (sName === "ship-fittings") {
        return `${translate(data.class)}+. ${translate("POWER_INIT")}: ${data.fitting_power}, ${
            translate("MASS_INIT")}: ${data.fitting_mass}, ${translate("CREDITS")}: ${formatter.format(data.fitting_price) !== "NaN" ? formatter.format(data.fitting_price) : data.fitting_price}. ${data.fitting_effect}`;
    }
    if (sName === "ship-weapons") {
        return `${translate(data.class)}+. ${
            translate("POWER_INIT")}: ${data.weapon_power}, ${
            translate("MASS_INIT")}: ${data.weapon_mass}, ${
            translate("HARDPOINTS_INIT")}: ${data.weapon_hardpoints}, ${
            translate("CREDITS")}: ${formatter.format(data.weapon_price) !== "NaN" ? formatter.format(data.weapon_price) : data.weapon_price}. ${
            translate("DAMAGE_SHORT")} ${data.weapon_damage}. ${
            data.weapon_qualities}${
            (data.weapon_ammo ? `, ${translate("AMMO")}: ${data.weapon_ammo}`: "")}.`;
    }
    if (sName === "weapons") {
        const getNamedAttrMod = expr => {
            if (expr === "@{dexterity_mod}") return translate("DEXTERITY_SHORT");
            else if (expr === "@{strength_mod}") return translate("STRENGTH_SHORT");
            else if (expr === "@{str_dex_mod}") return translate("STR_DEX");
        };
        return `${translate("DAMAGE_SHORT")} ${data.weapon_damage}${data.weapon_burst ? ` (${translate("BURST")})` : ""}${
            data.weapon_ab ? `, ${translate("ATTACK_BONUS_SHORT")} +${data.weapon_ab}` : ""}${
            data.weapon_range ? `, ${translate("RANGE")} ${data.weapon_range}` : ""}${
            data.weapon_ammo ? `, ${translate("AMMO")} ${data.weapon_ammo}` : ""}${
            data.weapon_shock ? `, ${data.weapon_shock_damage} ${translate("SHOCK_DAMAGE_AGAINST_AC_LEQ")} ${data.weapon_shock_ac}` : ""}, +${getNamedAttrMod(data.weapon_attribute_mod)}${
            data.weapon_encumbrance ? `, ${translate("ENCUMBRANCE_SHORT")} ${data.weapon_encumbrance}` : ""}${
            data.weapon_price ? `, ${translate("CREDITS")}: ${formatter.format(data.weapon_price) !== "NaN" ? formatter.format(data.weapon_price) : data.weapon_price}` : ""}.`
    }
    if (sName === "armor") {
        return `${translate("AC")} ${data.armor_ac}, ${translate(data.armor_type)
        }, ${translate("ENCUMBRANCE_SHORT")} ${data.armor_encumbrance}, ${translate("CREDITS")}: ${formatter.format(data.armor_price) !== "NaN" ? formatter.format(data.armor_price) : data.armor_price}.`;
    }
    if (sName === "cyberware") {
        return `${translate("STRAIN")}: ${data.cyberware_strain}, ${translate("CREDITS")}: ${formatter.format(data.cyberware_price) !== "NaN" ? formatter.format(data.cyberware_price) : data.cyberware_price}.`;
    }
    if (sName === "techniques") {
        if (data.level === "0") return `${translate("CORE_TECHNIQUE")}.`;
        else return `${translate("LEVEL")}-${data.level}.`;
    }
    if (sName === "gear") {
        return `${translate("ENCUMBRANCE_SHORT")} ${data.gear_encumbrance}${data.gear_bundled === "on" ? "#" : ""}${
            data.gear_price ? `, ${translate("CREDITS")}: ${formatter.format(data.gear_price) !== "NaN" ? formatter.format(data.gear_price) : data.gear_price}` : ""
        }.`
    }
    return "";
};
const generateAutofillRow = (sName) => {
    // Event handler for generating a new row when button is pressed
    getAttrs([`generate_${sName}_source`, "ship_class"], v => {
        const label = v[`generate_${sName}_source`];
        v.ship_multiplier = getShipMultiplier(v.ship_class);
        v.ship_price_multiplier = getShipPriceMultiplier(v.ship_class);
        if (label && autofillData[sName].hasOwnProperty(label)) {
            const data = getAutofillData(sName, v, autofillData[sName][label], label);
            delete data.class;
            delete data.level;
            fillRepeatingSectionFromData(sName, data);
        }
    });
};
const generateAutofillInfo = (sName) => {
    // Event handler for showing info about the selected item
    getAttrs([`generate_${sName}_source`, "ship_class"], v => {
        const label = v[`generate_${sName}_source`];
        v.ship_multiplier = getShipMultiplier(v.ship_class);
        v.ship_price_multiplier = getShipPriceMultiplier(v.ship_class);
        if (label && autofillData[sName].hasOwnProperty(label)) {
            const info = getAutofillInfo(sName, v, autofillData[sName][label], label);
            if (info) setAttrs({
                [`generate_${sName}_info`]: info
            });
        } else setAttrs({
            [`generate_${sName}_info`]: " "
        });
    });
};