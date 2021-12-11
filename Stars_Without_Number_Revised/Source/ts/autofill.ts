///<reference path="constants.ts"/>
///<reference path="util.ts"/>

/* Autofill stuff */
const fillClassStats = () => {
    getAttrs(["class", "class_ability", "attack_bonus"], v => {
        const label = v.class && reverseClasses[v.class ? v.class.toLowerCase() : ""];
        if (label && autofillData.classes.hasOwnProperty(label)) {
            const data = Object.assign({}, autofillData.classes[label as keyof typeof autofillData.classes]);
            Object.keys(data).forEach(key => {
                if (!(["", "0"].includes(`${v[key]}`))) delete data[key as keyof typeof data];
            });
            mySetAttrs(data, v);
        }
    });
};
const getShipMultiplier = (shipClass: string) => {
    if ((shipClass || "").toLowerCase() === "frigate") return 2;
    else if ((shipClass || "").toLowerCase() === "cruiser") return 3;
    else if ((shipClass || "").toLowerCase() === "capital") return 4;
    else return 1;
};
const getShipPriceMultiplier = (shipClass: string) => {
    if ((shipClass || "").toLowerCase() === "frigate") return 10;
    else if ((shipClass || "").toLowerCase() === "cruiser") return 25;
    else if ((shipClass || "").toLowerCase() === "capital") return 100;
    else return 1;
}

interface AutofillData {
    sName: string;
    v: { [p: string]: string | number; ship_multiplier?: number; ship_price_multiplier?: number };
    data: any;
    label: string;
}

const getAutofillData = ({sName, v, data, label}: AutofillData) => {
    // Transforms the stored data to be suitable for
    // inclusion into the sheet.
    const output = Object.assign({}, data);
    if (sName === "ship-defenses") {
        if (label) output.defense_name = translate(label.toUpperCase()) ? translate(label.toUpperCase()) : "false";
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
const getAutofillInfo = ({sName, v, data, label}: AutofillData) => {
    const dataOut = getAutofillData({sName : sName, v : v, data : data, label : label});
    const formatter = new Intl.NumberFormat();
    // Generates info text from the stored data
    if (sName === "ship-defenses") {
        return `${translate(dataOut.class)}+. ${translate("POWER_INIT")}: ${dataOut.defense_power}, ${
            translate("MASS_INIT")}: ${dataOut.defense_mass}, ${translate("CREDITS")}: ${formatter.format(dataOut.defense_price) !== "NaN" ? formatter.format(data.defense_price) : data.defense_price}. ${dataOut.defense_effect}`;
    }
    if (sName === "ship-fittings") {
        return `${translate(dataOut.class)}+. ${translate("POWER_INIT")}: ${dataOut.fitting_power}, ${
            translate("MASS_INIT")}: ${dataOut.fitting_mass}, ${translate("CREDITS")}: ${formatter.format(dataOut.fitting_price) !== "NaN" ? formatter.format(data.fitting_price) : data.fitting_price}. ${dataOut.fitting_effect}`;
    }
    if (sName === "ship-weapons") {
        return `${translate(dataOut.class)}+. ${
            translate("POWER_INIT")}: ${dataOut.weapon_power}, ${
            translate("MASS_INIT")}: ${dataOut.weapon_mass}, ${
            translate("HARDPOINTS_INIT")}: ${dataOut.weapon_hardpoints}, ${
            translate("CREDITS")}: ${formatter.format(dataOut.weapon_price) !== "NaN" ? formatter.format(data.weapon_price) : data.weapon_price}. ${
            translate("DAMAGE_SHORT")} ${dataOut.weapon_damage}. ${
            dataOut.weapon_qualities}${
            (dataOut.weapon_ammo ? `, ${translate("AMMO")}: ${dataOut.weapon_ammo}`: "")}.`;
    }
    if (sName === "weapons") {
        const getNamedAttrMod = (expr: string) => {
            if (expr === "@{dexterity_mod}") return translate("DEXTERITY_SHORT");
            else if (expr === "@{strength_mod}") return translate("STRENGTH_SHORT");
            else if (expr === "@{str_dex_mod}") return translate("STR_DEX");
        };
        return `${translate("DAMAGE_SHORT")} ${dataOut.weapon_damage}${dataOut.weapon_burst ? ` (${translate("BURST")})` : ""}${
            dataOut.weapon_ab ? `, ${translate("ATTACK_BONUS_SHORT")} +${dataOut.weapon_ab}` : ""}${
            dataOut.weapon_range ? `, ${translate("RANGE")} ${dataOut.weapon_range}` : ""}${
            dataOut.weapon_ammo ? `, ${translate("AMMO")} ${dataOut.weapon_ammo}` : ""}${
            dataOut.weapon_shock ? `, ${dataOut.weapon_shock_damage} ${translate("SHOCK_DAMAGE_AGAINST_AC_LEQ")} ${dataOut.weapon_shock_ac}` : ""}, +${getNamedAttrMod(dataOut.weapon_attribute_mod)}${
            dataOut.weapon_encumbrance ? `, ${translate("ENCUMBRANCE_SHORT")} ${dataOut.weapon_encumbrance}` : ""}${
            dataOut.weapon_price ? `, ${translate("CREDITS")}: ${formatter.format(dataOut.weapon_price) !== "NaN" ? formatter.format(data.weapon_price) : data.weapon_price}` : ""}.`
    }
    if (sName === "armor") {
        return `${translate("AC")} ${dataOut.armor_ac}, ${translate(dataOut.armor_type)
        }, ${translate("ENCUMBRANCE_SHORT")} ${dataOut.armor_encumbrance}, ${translate("CREDITS")}: ${formatter.format(dataOut.armor_price) !== "NaN" ? formatter.format(data.armor_price) : data.armor_price}.`;
    }
    if (sName === "cyberware") {
        return `${translate("STRAIN")}: ${dataOut.cyberware_strain}, ${translate("CREDITS")}: ${formatter.format(dataOut.cyberware_price) !== "NaN" ? formatter.format(data.cyberware_price) : data.cyberware_price}.`;
    }
    if (sName === "techniques") {
        if (dataOut.level === "0") return `${translate("CORE_TECHNIQUE")}.`;
        else return `${translate("LEVEL")}-${dataOut.level}.`;
    }
    if (sName === "gear") {
        return `${translate("ENCUMBRANCE_SHORT")} ${dataOut.gear_encumbrance}${dataOut.gear_bundled === "on" ? "#" : ""}${
            dataOut.gear_price ? `, ${translate("CREDITS")}: ${formatter.format(dataOut.gear_price) !== "NaN" ? formatter.format(data.gear_price) : data.gear_price}` : ""
        }.`
    }
    return "";
};

const generateAutofillRow = (sName: Exclude<keyof typeof autofillData, 'droneFittings'>) => {
    // Event handler for generating a new row when button is pressed
    getAttrs([`generate_${sName}_source`, "ship_class"], v => {
        const label = v[`generate_${sName}_source`];
        v.ship_multiplier = getShipMultiplier(v.ship_class).toString();
        v.ship_price_multiplier = getShipPriceMultiplier(v.ship_class).toString();
        if (label && autofillData[sName].hasOwnProperty(label)) {
            const data = getAutofillData({sName : sName, v : v, data : autofillData[sName][label as keyof typeof autofillData[typeof sName]], label : label});
            delete data.class;
            delete data.level;
            fillRepeatingSectionFromData(sName, data);
        }
    });
};
const generateAutofillInfo = (sName: Exclude<keyof typeof autofillData, 'droneFittings'>) => {
    // Event handler for showing info about the selected item
    getAttrs([`generate_${sName}_source`, "ship_class"], v => {
        const label = v[`generate_${sName}_source`];
        v.ship_multiplier = getShipMultiplier(v.ship_class).toString();
        v.ship_price_multiplier = getShipPriceMultiplier(v.ship_class).toString();
        if (label && autofillData[sName].hasOwnProperty(label)) {
            const info = getAutofillInfo({sName: sName, v: v, data: autofillData[sName][label as keyof typeof autofillData[typeof sName]], label: label});
            if (info) setAttrs({
                [`generate_${sName}_info`]: info
            });
        } else setAttrs({
            [`generate_${sName}_info`]: " "
        });
    });
};

const fillRepeatingSectionFromData = (sName: string, data: {[key: string]: AttributeContent}[] | {[key: string]: AttributeContent}, callback?: () => void) => {
    // Populates the repeating section repeating_${SName} with new
    // rows from the data array. Every entry of the array is expected
    // to be an object, and its key/value pairs will be written into
    // the repeating section as a new row. If data is not an array
    // but a single object, it will be treated like an array with
    // a single element.
    callback = callback || (() => {});
    const createdIDs: string[] = [],
        getRowID = () => {
            while (true) {
                let newID = generateRowID();
                if (!createdIDs.includes(newID)) {
                    createdIDs.push(newID);
                    return newID;
                }
            }
        };
    const setting = (Array.isArray(data) ? data : [data]).map(o => {
        const newID = getRowID();
        return Object.entries(o).reduce((m: {[k: string]: string}, [key, value]) => {
            m[`repeating_${sName}_${newID}_${key}`] = `${value}`;
            return m;
        }, {});
    }).reduce((m, o) => Object.assign(m, o), {});
    setAttrs(setting, {}, callback);
};