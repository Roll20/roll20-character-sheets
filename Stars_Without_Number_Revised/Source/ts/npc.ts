/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/* NPC */
const fillNPC = () => {
    getAttrs(["npc_stat_block"], (v ) => {
        if (v.npc_stat_block && Object.keys(autofillData.statblocks).includes(v.npc_stat_block)) {
            const {
                npc_hd, npc_ac, npc_attack_bonus, npc_damage, npc_attacks, npc_move,
                npc_morale, npc_skills, npc_saves, npc_armor_type
            } = autofillData.statblocks[v.npc_stat_block as keyof (typeof autofillData.statblocks)];

            const setting: {[key: string]: string | false} = {
                npc_ac,
                npc_attack_bonus,
                npc_move,
                npc_morale,
                npc_skills,
                npc_saves
            };

            if (npc_armor_type) setting.npc_armor_type = npc_armor_type;
            if (typeof npc_hd === "string" && npc_hd.includes("hp")) setting.HP = npc_hd.replace("hp", "");
            else setting.npc_hd = npc_hd;

            setAttrs(setting);

            if (npc_damage !== "Unarmed") {
                const newAttack = {
                    attack_ab: npc_attack_bonus,
                    attack_damage: npc_damage || 0,
                    attack_name: translate("ATTACK"),
                    attack_number: npc_attacks
                };
                fillRepeatingSectionFromData("npc-attacks", newAttack);
            }
        }
    });
};
const addNPCAttackBonus = () => {
    getAttrs(["repeating_npc-attacks_attack_ab", "npc_attack_bonus"], v => {
        if (`${v["repeating_npc-attacks_attack_ab"]}` === "0") {
            setAttrs({
                ["repeating_npc-attacks_attack_ab"]: v.npc_attack_bonus
            });
        }
    });
};
const setNPCMultiAttacks = () => {
    getSectionIDs("repeating_npc-attacks", idArray => {
        const sourceAttrs = [
            ...idArray.map(id => `repeating_npc-attacks_${id}_attack_number`),
            "npc_roll_full_attack"
        ];
        getAttrs(sourceAttrs, v => {
            const setting = idArray.reduce((m: {[key: string]: string}, id) => {
                if (v.npc_roll_full_attack === "1") {
                    const num = parseInt(v[`repeating_npc-attacks_${id}_attack_number`]) || 1;
                    m[`repeating_npc-attacks_${id}_attack_extra_macro`] = [2, 3, 4, 5, 6, 7, 8].map(n => {
                        if (n <= num)
                            return `{{attack${n}=[[1d20 + @{attack_ab} @{attack_burst} @{modifier_query}]]}} ` +
                                `{{damage${n}=[[@{attack_damage} @{attack_burst}]]}} `;
                        else return "";
                    }).join("");
                } else {
                    m[`repeating_npc-attacks_${id}_attack_extra_macro`] = "";
                }
                return m;
            }, {});
            setAttrs(setting);
        });
    });
};
const handleNPCRollHide = () => {
    const types = ["hp", "initiative", "save", "skill", "morale", "reaction"];
    getAttrs(["npc_rolls_hidden", ...types.map(x => `npc_${x}_hidden`)], v => {
        const setting = types.reduce((m: {[key: string]: string}, n) => {
            m[`npc_${n}_hidden`] = v.npc_rolls_hidden;
            return m;
        }, {});
        mySetAttrs(setting, v);
    });
};
