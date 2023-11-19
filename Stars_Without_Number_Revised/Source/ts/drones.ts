/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/* Drones */
const fillDroneStats = () => {
    // This must be run from a repeating event, otherwise it will not know where to draw the data from.
    getAttrs(["repeating_drones_drone_model"], v => {
        const model = (v.repeating_drones_drone_model || "").toLowerCase().trim().replace(/ /g, "_");
        if (autofillData.drones.hasOwnProperty(model)) {
            const setting = Object.entries(autofillData.drones[model as keyof typeof autofillData.drones]).reduce((m: {[key: string]: string}, [key, value]) => {
                if (typeof value === "string") {
                    m[`repeating_drones_${key}`] = value;
                }
                return m;
            }, {});
            setting.repeating_drones_drone_HP_max = setting.repeating_drones_drone_HP;
            setAttrs(setting);
        }
    });
};
const fillDroneFitting = (num: number) => {
    const prefix = `repeating_drones_drone_fitting_${num}`;
    getAttrs([`${prefix}_desc`, `${prefix}_name`], v => {
        const fittingName = (v[`${prefix}_name`] || "").toLowerCase().trim().replace(/ /g, "_");
        if (v[`${prefix}_desc`] === "" && autofillData.droneFittings.includes(fittingName)) {
            setAttrs({
                [`${prefix}_desc`]: translate(`${fittingName.toUpperCase()}_DESC`)
            });
        }
    });
};
const calculateDroneAttack = (prefixes: string[], callback?: (values: {[key: string]: string}) => void) => {
    const sourceAttrs = prefixes.reduce((m, prefix) => {
        return m.concat([
            `${prefix}_drone_weapon1_ab`,
            `${prefix}_drone_weapon1_active`,
            `${prefix}_drone_weapon1_attack`,
            `${prefix}_drone_weapon1_skill`,
            `${prefix}_drone_weapon2_ab`,
            `${prefix}_drone_weapon2_active`,
            `${prefix}_drone_weapon2_attack`,
            `${prefix}_drone_weapon2_skill`,
            `${prefix}_drone_weapon3_ab`,
            `${prefix}_drone_weapon3_active`,
            `${prefix}_drone_weapon3_attack`,
            `${prefix}_drone_weapon3_skill`,
        ]);
    }, ["attack_bonus", "intelligence_mod", "skill_pilot", "skill_program", "npc", "npc_attack_bonus"]);
    getAttrs(sourceAttrs, v => {
        let skillMod: number,
            intMod: number,
            attackBonus: number;
        if (v.npc !== "1") {
            skillMod = Math.max(parseInt(v.skill_pilot), parseInt(v.skill_program)) || 0;
            intMod = parseInt(v.intelligence_mod) || 0;
            attackBonus = parseInt(v.attack_bonus) || 0;
        } else {
            skillMod = 0;
            intMod = 0;
            attackBonus = parseInt(v.npc_attack_bonus) || 0;
        }
        const setting = prefixes.reduce((m: {[key:string]: string}, prefix) => {
            [1, 2, 3].filter(num => v[`${prefix}_drone_weapon${num}_active`] === "1")
                .forEach(num => {
                    m[`${prefix}_drone_weapon${num}_attack`] = (intMod + attackBonus +
                        ((skillMod === -1) ? -2 : skillMod) +
                        parseInt(v[`${prefix}_drone_weapon${num}_ab`]) || 0).toString();
                    m[`${prefix}_drone_weapon${num}_skill`] =
                        ((skillMod === -1) ? -2 : skillMod).toString();
                });
            return m;
        }, {});
        mySetAttrs(setting, v, null, callback);
    });
};