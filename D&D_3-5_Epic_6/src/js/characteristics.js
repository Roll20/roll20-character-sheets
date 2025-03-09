/* CARACTERISTICS UPDATE */
on("change:for_base change:for_bonus " +
    "change:dex_base change:dex_bonus " +
    "change:con_base change:con_bonus " +
    "change:int_base change:int_bonus " +
    "change:sag_base change:sag_bonus " +
    "change:cha_base change:cha_bonus", (eventInfo) => {
    getModifiersByTypeAndUpdateValues(applicationTypes.carac, updateAllCharacteristics, eventInfo.triggerName.split("_")[0]);
});


let updateAllCharacteristics = (modifierList, characteristic_name) => {
    if (characteristic_name) {
        return updateCharacteristicsList([characteristic_name], modifierList);
    }
    return updateCharacteristicsList(allCharacteristics, modifierList);
}
let updateCharacteristicsList = (characteristicList, modifierList) => {
    let toGet = [];
    for (let characteristic of characteristicList) {
        toGet.push(characteristic + "_base");
        toGet.push(characteristic + "_bonus")
    }
    getAttrs(toGet, (values) => {
        let toUpdate = {}
        for (let characteristic of characteristicList) {
            let base = parseInt(values[characteristic + "_base"]) || 0;
            let bonus = parseInt(values[characteristic + "_bonus"]) || 0;
            let total = base + bonus;
            let filteredModifierList = getLargestModifierOfEachTypeFor(modifierList, characteristic);
            for (let modifier of filteredModifierList) {
                total += modifier.value;
            }

            let modded = total !== base;
            let effective_total = total;
            if (effective_total % 2 == 1) {
                effective_total--;
            }
            let mod = (effective_total - 10) / 2;
            toUpdate[characteristic + "_modified"] = modded ? "true" : "false";
            toUpdate[characteristic + "_mod"] = mod;
            toUpdate[characteristic + "_total"] = "" + total;
        }
        setAttrs(toUpdate);
    });
}

on("change:for_mod change:dex_mod change:con_mod change:int_mod change:sag_mod change:cha_mod change:skills_malus", function () {
    getModifiersByTypeAndUpdateValues(applicationTypes.skill,updateAllSkills);
    getModifiersByTypeAndUpdateValues(applicationTypes.save,updateAllSaves);
    getAttacksModifiersAndUpdateValues();
});
