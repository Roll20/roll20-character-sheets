/* Encumbrance */
const loadTable = {
    /* Normal */ '0': {"skills": '0', "movement": '+0'},
    /* Burdened */ '1': {"skills": '1', "movement": '-2'},
    /* Overloaded */ '2': {"skills": '2', "movement": '*.5'},
    /* Max */ '3': {"skills": '3', "movement": '*0'}
}
/**
 * Will return an object of all the attrs needed to perform enc calculations along with the repeating IDs of equipment
 * repeatingIds object containing the repeatingIds of meleeweapon rangedweapon equipment and currency
 * return []
 */
function encGetAttrs(repeatingIds) {
    let repeatingGetAttrs = [];
    repeatingIds['meleeWeaponIds'].forEach(meleeWeaponId => {
        repeatingGetAttrs.push(`repeating_meleeweapon_${meleeWeaponId}_enc`, `repeating_meleeweapon_${meleeWeaponId}_location`);
    });
    repeatingIds['rangedWeaponIds'].forEach(rangedWeaponId => {
        repeatingGetAttrs.push(`repeating_rangedweapon_${rangedWeaponId}_enc`, `repeating_rangedweapon_${rangedWeaponId}_location`);
    });
    repeatingIds['gearIds'].forEach(gearId => {
        repeatingGetAttrs.push(`repeating_equipment_${gearId}_enc`, `repeating_equipment_${gearId}_quantity`, `repeating_equipment_${gearId}_location`);
    });
    repeatingIds['currencyIds'].forEach(currencyId => {
        repeatingGetAttrs.push(`repeating_currency_${currencyId}_enc`, `repeating_currency_${currencyId}_quantity`, `repeating_currency_${currencyId}_location`);
    });

    return ['str', 'pack_equipped', 'half_effective_armor_enc', 'avg_species_siz', 'encumbrance_temp',
        'location1_armor_enc', 'location1_armor_equipped',
        'location2_armor_enc', 'location2_armor_equipped',
        'location3_armor_enc', 'location3_armor_equipped',
        'location4_armor_enc', 'location4_armor_equipped',
        'location5_armor_enc', 'location5_armor_equipped',
        'location6_armor_enc', 'location6_armor_equipped',
        'location7_armor_enc', 'location7_armor_equipped',
        'location8_armor_enc', 'location8_armor_equipped',
        'location9_armor_enc', 'location9_armor_equipped',
        'location10_armor_enc', 'location10_armor_equipped',
        'location11_armor_enc', 'location11_armor_equipped',
        'location12_armor_enc', 'location12_armor_equipped'].concat(repeatingGetAttrs);
}
function calcEncAndArmorPenalty(repeatingIds, v) {
    let newAttrs = {};

    /* Calculate Armor Enc */
    let wornArmorEnc = 0;
    let packArmorEnc = 0;
    let effectiveWornArmorEnc;
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach(location => {
        const locationEnc = parseFloat(v[`location${location}_armor_enc`]) || 0;
        if (v[`location${location}_armor_equipped`] === '1') {
            wornArmorEnc = wornArmorEnc + locationEnc;
        } else if (v[`location${location}_armor_equipped`] === '0') {
            packArmorEnc = packArmorEnc + locationEnc;
        }
    });
    if (v['half_effective_armor_enc'] === '1') {
        effectiveWornArmorEnc = Math.ceil(wornArmorEnc/4);
    } else {
        effectiveWornArmorEnc = Math.ceil(wornArmorEnc/2);
    }
    newAttrs['armor_penalty'] = 0 - Math.ceil(wornArmorEnc/5);
    let wornEnc = effectiveWornArmorEnc;
    let packEnc = packArmorEnc;

    /* Add up all the rest of the ENC */
    repeatingIds['meleeWeaponIds'].forEach(meleeWeaponId => {
        const weaponEnc = parseFloat(v[`repeating_meleeweapon_${meleeWeaponId}_enc`]) || 0;
        if (v[`repeating_meleeweapon_${meleeWeaponId}_location`] === 'loadout') {
            wornEnc = wornEnc + weaponEnc;
        } else if (v[`repeating_meleeweapon_${meleeWeaponId}_location`] === 'pack') {
            packEnc = packEnc + weaponEnc;
        }
    });
    repeatingIds['rangedWeaponIds'].forEach(rangedWeaponId => {
        const weaponEnc = parseFloat(v[`repeating_rangedweapon_${rangedWeaponId}_enc`]) || 0;
        if (v[`repeating_rangedweapon_${rangedWeaponId}_location`] === 'loadout') {
            wornEnc = wornEnc + weaponEnc;
        } else if (v[`repeating_rangedweapon_${rangedWeaponId}_location`] === 'pack') {
            packEnc = packEnc + weaponEnc;
        }
    });
    repeatingIds['gearIds'].forEach(gearId => {
        const gearEnc = parseFloat(v[`repeating_equipment_${gearId}_enc`]) || 0;
        const gearQty = parseInt(v[`repeating_equipment_${gearId}_quantity`]) || 0;
        if (v[`repeating_equipment_${gearId}_location`] === 'loadout') {
            wornEnc = wornEnc + (gearEnc * gearQty);
        } else if (v[`repeating_equipment_${gearId}_location`] === 'pack') {
            packEnc = packEnc + (gearEnc * gearQty);
        }
    });
    repeatingIds['currencyIds'].forEach(currencyId => {
        const currencyEnc = parseFloat(v[`repeating_currency_${currencyId}_enc`]) || 0;
        const currencyQty = parseInt(v[`repeating_currency_${currencyId}_quantity`]) || 0;
        if (v[`repeating_currency_${currencyId}_location`] === 'loadout') {
            wornEnc = wornEnc + (currencyEnc * currencyQty);
        } else if (v[`repeating_currency_${currencyId}_location`] === 'pack') {
            packEnc = packEnc + (currencyEnc * currencyQty);
        }
    });

    /* Find the total enc to apply for effect with avg species siz factored in */
    let enc = 0;
    const avgSpeciesSiz = parseInt(v['avg_species_siz']) || 0;
    const encTemp = parseInt(v['encumbrance_temp']) || 0;
    if (v['pack_equipped'] === '1') {
        enc = Math.ceil((wornEnc + packEnc + encTemp) * (avgSpeciesSiz/13));
    } else {
        enc = Math.ceil((wornEnc + encTemp) * (avgSpeciesSiz/13));
    }
    newAttrs['encumbrance_current'] = enc.toFixed(2);

    /* Set load and related effects */
    const str = parseInt(v['str']) || 0;
    if (enc >= (str * 4)) {
        newAttrs['encumbrance_load'] = '3';
        newAttrs['encumbrance_skills'] = loadTable['3']['skills'];
        newAttrs['movement_rate_enc'] = loadTable['3']['movement'];
    } else if (enc > (str * 3)) {
        newAttrs['encumbrance_load'] = '2';
        newAttrs['encumbrance_skills'] = loadTable['2']['skills'];
        newAttrs['movement_rate_enc'] = loadTable['2']['movement'];
    } else if (enc > (str * 2)) {
        newAttrs['encumbrance_load'] = '1';
        newAttrs['encumbrance_skills'] = loadTable['1']['skills'];
        newAttrs['movement_rate_enc'] = loadTable['1']['movement'];
    } else {
        newAttrs['encumbrance_load'] = '0';
        newAttrs['encumbrance_skills'] = loadTable['0']['skills'];
        newAttrs['movement_rate_enc'] = loadTable['0']['movement'];
    }

    return newAttrs;
}
on("change:location1_armor_enc change:location1_armor_equipped change:location2_armor_enc change:location2_armor_equipped change:location3_armor_enc change:location3_armor_equipped change:location4_armor_enc change:location4_armor_equipped change:location5_armor_enc change:location5_armor_equipped change:location6_armor_enc change:location6_armor_equipped change:location7_armor_enc change:location7_armor_equipped change:location8_armor_enc change:location8_armor_equipped change:location9_armor_enc change:location9_armor_equipped change:location10_armor_enc change:location10_armor_equipped change:location11_armor_enc change:location11_armor_equipped change:location12_armor_enc change:location12_armor_equipped change:half_effective_armor_enc change:pack_equipped change:avg_species_siz change:encumbrance_temp change:repeating_meleeweapon:enc change:repeating_meleeweapon:location change:repeating_rangedweapon:enc change:repeating_rangedweapon:location change:repeating_equipment:enc change:repeating_equipment:location change:repeating_equipment:quantity change:repeating_currency:enc change:repeating_currency:location change:repeating_currency:quantity remove:repeating_meleeweapon remove:repeating_rangedweapon remove:repeating_equipment remove:repeating_currency", function(event) {
    if (event.sourceType === "sheetworker") {return;}

    let repeatingIds = {}
    getSectionIDs("repeating_meleeweapon", function(meleeWeaponIds) {
        repeatingIds['meleeWeaponIds'] = meleeWeaponIds;
        getSectionIDs("repeating_rangedweapon", function(rangedWeaponIds) {
            repeatingIds['rangedWeaponIds'] = rangedWeaponIds;
            getSectionIDs("repeating_equipment", function(gearIds) {
                repeatingIds['gearIds'] = gearIds;
                getSectionIDs("repeating_currency", function(currencyIds) {
                    repeatingIds['currencyIds'] = currencyIds;
                    getAttrs(encGetAttrs(repeatingIds).concat(initGetAttrs, moveRateGetAttrs), function(v) {
                        let newAttrs = calcEncAndArmorPenalty(repeatingIds, v);
                        /* Update v with new values need for attribute calculations */
                        v = {...v, ...newAttrs};
                        setAttrs({
                            ...newAttrs,
                            ...calcInitiativeBonus(v),
                            ...calcMoveRate(v)
                        });
                    });
                });
            });
        });
    });
});