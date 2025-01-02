let updateClassSaves = () => {
    getAttrs(["class1_lvl", "class2_lvl", "class3_lvl", "class1_ref", "class2_ref", "class3_ref"
        , "class1_vig", "class2_vig", "class3_vig", "class1_vol", "class2_vol", "class3_vol"], (attrs) => {
        let class1_lvl = parseInt(attrs.class1_lvl) || 0;
        let class2_lvl = parseInt(attrs.class2_lvl) || 0;
        let class3_lvl = parseInt(attrs.class3_lvl) || 0;
        let class1_ref = parseInt(attrs.class1_ref) || 0;
        let class2_ref = parseInt(attrs.class2_ref) || 0;
        let class3_ref = parseInt(attrs.class3_ref) || 0;
        let class1_vig = parseInt(attrs.class1_vig) || 0;
        let class2_vig = parseInt(attrs.class2_vig) || 0;
        let class3_vig = parseInt(attrs.class3_vig) || 0;
        let class1_vol = parseInt(attrs.class1_vol) || 0;
        let class2_vol = parseInt(attrs.class2_vol) || 0;
        let class3_vol = parseInt(attrs.class3_vol) || 0;
        let base_ref = 0;
        let base_vol = 0;
        let base_vig = 0;
        if (class1_lvl) {
            base_ref += class1_ref;
            base_vig += class1_vig;
            base_vol += class1_vol;
        }
        if (class2_lvl) {
            base_ref += class2_ref;
            base_vig += class2_vig;
            base_vol += class2_vol;
        }
        if (class3_lvl) {
            base_vol += class3_vol;
            base_ref += class3_ref;
            base_vig += class3_vig;
        }
        setAttrs({ref_base: base_ref, vig_base: base_vig, vol_base: base_vol});
    });
}


on("change:ref_base change:ref_mod change:vig_base change:vig_mod change:vol_base change:vol_mod", function(eventInfo) {
    getModifiersByTypeAndUpdateValues(applicationTypes.save,updateAllSaves);
});

let updateAllSaves = (modifierList) => {
    let saves = ["ref","vig","vol"];
    getAttrs(["dex_mod","con_mod","sag_mod","ref_base","ref_mod","vig_base","vig_mod","vol_base","vol_mod"], (values) => {
        for(let save of saves){
            let carac = 0;
            let caracName = 0;
            switch (save){
                case "ref":
                    carac = parseInt(values[`dex_mod`]) || 0;
                    caracName = `dex_mod`;
                    break;
                case "vig":
                    carac = parseInt(values[`con_mod`]) || 0;
                    caracName = `con_mod`;
                    break;
                case "vol":
                    carac = parseInt(values[`sag_mod`]) || 0;
                    caracName = `sag_mod`;
                    break;
            }
            let base = parseInt(values[`${save}_base`]) || 0;
            let mod = parseInt(values[`${save}_mod`]) || 0;
            let save_name = `^{saves.${save}.roll}`
            let total = base+carac;
            let mods = mod;
            let roll = `${carac}[${caracName}] + ${base}[${save}_base] + ${mod}[${save}_mod]`
            let filteredModifierList = getLargestModifierOfEachTypeFor(modifierList,save);
            for(let modifier of filteredModifierList){
                mods += modifier.value;
                roll += `+${modifier.value}[${modifier.name}(${modifier.type})]`
            }
            let toUpdate = {};
            toUpdate[`${save}_total`] = total + mods;
            toUpdate[`${save}_roll_value`] = `&{template:main} {{titre=${save_name}}} {{subtitle=@{character_name} }} {{Jet=[[1d20+${roll}]]}}`;
            toUpdate[`${save}_modified`] = !!mods;
            setAttrs(toUpdate);
        }
    });
}

