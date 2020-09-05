/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/**
 * Validations
 */
const validateTab = () => {
    getAttrs(["tab", "npc"], v => {
        if (v.tab === "character" && v.npc === "1") setAttrs({
            tab: "npc"
        });
        if (v.tab === "npc" && v.npc === "0") setAttrs({
            tab: "character"
        });
    });
};
const validateSuperTab = () => {
    getAttrs(["setting_super_type", "tab_super"], v => {
        const setting = {};
        if (v.setting_super_type === "magic") setting.tab_super = "magic";
        if (v.setting_super_type === "psionics") setting.tab_super = "psionics";
        mySetAttrs(setting, v);
    });
};
const validateStrain = () => {
    getAttrs(["strain", "strain_permanent", "strain_max"], v => {
        const currentStrain = parseInt(v.strain) || 0,
            permanentStrain = parseInt(v.strain_permanent) || 0,
            strain = Math.min(parseInt(v.strain_max), Math.max(currentStrain, permanentStrain)) || 0;

        if (strain !== currentStrain) setAttrs({
            strain
        });
    });
};
const validateWeaponSkills = (ids) => {
    // Makes sure that the select for the weapon skill is never in an invalid state.
    const prefixes = (ids && ids.map(id => `repeating_weapons_${id}`)) || ["repeating_weapons"];
    getAttrs(["homebrew_skill_list", ...prefixes.map(p => `${p}_weapon_skill_bonus`)], v => {
        const revisedList = ["@{skill_exert}", "@{skill_punch}", "@{skill_shoot}", "@{skill_stab}",
                "@{skill_telekinesis}", "0"
            ],
            firstList = ["@{skill_combat_energy}", "@{skill_combat_gunnery}", "@{skill_combat_primitive}", "@{skill_combat_projectile}",
                "@{skill_combat_psitech}", "@{skill_combat_unarmed}", "@{skill_telekinesis}", "0"
            ],
            type = v.homebrew_skill_list,
            setting = {};
        prefixes.forEach(prefix => {
            if (type === "revised" && !revisedList.includes(v[`${prefix}_weapon_skill_bonus`]))
                setting[`${prefix}_weapon_skill_bonus`] = "@{skill_shoot}";
            if (type === "first" && !firstList.includes(v[`${prefix}_weapon_skill_bonus`]))
                setting[`${prefix}_weapon_skill_bonus`] = "@{skill_combat_energy}";
        });
        setAttrs(setting);
    });
};
const validateShells = (e) => {
    //Unchecks every shell 'active' toggle except the one toggle now.
    console.log(e.sourceAttribute);
    console.log(e.sourceAttribute.slice(17, -13));
    console.log(e.sourceAttribute.slice(-6));
    if (e.sourceAttribute.slice(-6) === "active") {
        console.log("Changing");
        getSectionIDs("repeating_shells", idArray => {
            idArray = idArray.filter(item => item !== e.sourceAttribute.slice(17, -13))
            const setting = {}
            idArray.forEach(id => setting[`repeating_shells_${id}_shell_active`] = "0");
            setAttrs(setting, () => {
                calculateShellAttrs();
            })
        })
    } else {
        console.log("No change needed");
        calculateShellAttrs();
    }

}
