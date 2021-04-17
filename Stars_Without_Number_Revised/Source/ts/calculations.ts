/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/* Calculations */
const calculateSaves = () => {
    getAttrs([...attributes.map(attr => `${attr}_mod`), "level",
        "homebrew_luck_save", "save_physical", "save_mental", "save_evasion", "save_luck"
    ], v => {
        const base = 16 - (parseInt(v.level) || 1);
        const setting: {[key: string]: any} = {
            save_physical: base - (Math.max(parseInt(v.strength_mod), parseInt(v.constitution_mod)) || 0),
            save_mental: base - (Math.max(parseInt(v.charisma_mod), parseInt(v.wisdom_mod)) || 0),
            save_evasion: base - (Math.max(parseInt(v.intelligence_mod), parseInt(v.dexterity_mod)) || 0),
        };
        if (v.homebrew_luck_save === "1") setting.save_luck = base;
        mySetAttrs(setting, v);
    });
};

const calculateEffort = () => {
    getSectionIDs("repeating_psychic-skills", idArray => {
        getAttrs([...effortAttributes,
            "psionics_total_effort",
            ...idArray.map(id => `repeating_psychic-skills_${id}_skill`)], v => {
            const attrBonus = Math.max(parseInt(v.wisdom_mod), parseInt(v.constitution_mod)) || 0,
                skillBonus = Math.max(
                    ...skills.psionic.map(x => parseInt(v[`skill_${x}`]) || 0),
                    ...idArray.map(id => parseInt(v[`repeating_psychic-skills_${id}_skill`]) || 0)
                );
            const psionics_total_effort = (Math.max(1 + attrBonus + skillBonus, 1) + parseInt(v.psionics_extra_effort) -
                parseInt(v.psionics_committed_effort_current) - parseInt(v.psionics_committed_effort_scene) -
                parseInt(v.psionics_committed_effort_day)) || 0;
            mySetAttrs({
                psionics_total_effort
            }, v);
        });
    });
};

const calculateMagicEffort = () => {
    getAttrs(["magic_total_effort", "magic_committed_effort_current", "magic_committed_effort_scene", "magic_committed_effort_day", "magic_uncommitted_effort"], v => {
        const magic_uncommitted_effort = (parseInt(v.magic_total_effort) - (parseInt(v.magic_committed_effort_current) +
            parseInt(v.magic_committed_effort_scene) + parseInt(v.magic_committed_effort_day))) || 0;
        mySetAttrs({
            magic_uncommitted_effort
        }, v);
    });
};

const calculateProcessing = () => {
    getSectionIDs("repeating_processing-nodes", idArray => {
        const sourceAttrs = [
            ...idArray.map(id => `repeating_processing-nodes_${id}_node_value`),
            ...idArray.map(id => `repeating_processing-nodes_${id}_node_connected`),
            "wisdom_mod", "intelligence_mod", "ai_extra_processing", "ai_committed_processing_current", "ai_committed_processing_scene", "ai_committed_processing_day", "ai_total_processing"
        ];
        getAttrs(sourceAttrs, v => {
            const maxProcessing = (1 + Math.max(parseInt(v.wisdom_mod) , parseInt(v.intelligence_mod)) || 0)
                + Math.max(
                    ...idArray.filter(id => v[`repeating_processing-nodes_${id}_node_connected`] === "1")
                        .map(id => parseInt(v[`repeating_processing-nodes_${id}_node_value`]) || 0)
                    , 0
                );
            const ai_total_processing = (maxProcessing + parseInt(v.ai_extra_processing) - parseInt(v.ai_committed_processing_current) -
                parseInt(v.ai_committed_processing_scene) - parseInt(v.ai_committed_processing_day)) || 0;
            mySetAttrs({
                ai_total_processing
            }, v);
        });
    });
}

const calculateAC = () => {
    getSectionIDs("repeating_armor", idArray => {
        const sourceAttrs = [
            ...idArray.map(id => `repeating_armor_${id}_armor_ac`),
            ...idArray.map(id => `repeating_armor_${id}_armor_active`),
            ...idArray.map(id => `repeating_armor_${id}_armor_type`),
            "npc", "AC", "innate_ac", "dexterity_mod",
        ];
        getAttrs(sourceAttrs, v => {
            if (v.npc === "1") return;
            const baseAC = Math.max(
                parseInt(v.innate_ac) || 0,
                ...idArray.filter(id => v[`repeating_armor_${id}_armor_active`] === "1")
                    .filter(id => v[`repeating_armor_${id}_armor_type`] !== "SHIELD")
                    .map(id => parseInt(v[`repeating_armor_${id}_armor_ac`]) || 0)
            );
            const shieldAC = Math.max(
                0,
                ...idArray.filter(id => v[`repeating_armor_${id}_armor_active`] === "1")
                    .filter(id => v[`repeating_armor_${id}_armor_type`] === "SHIELD")
                    .map(id => parseInt(v[`repeating_armor_${id}_armor_ac`]) || 0)
            );
            const AC = (shieldAC > 0 ? shieldAC <= baseAC ? (baseAC + 1) : shieldAC : baseAC) +
                (parseInt(v.dexterity_mod) || 0);

            mySetAttrs({
                AC
            }, v);
        });
    });
};

const calculateMaxStrain = () => {
    getAttrs(["constitution", "strain_max"], v => {
        mySetAttrs({
            strain_max: parseInt(v.constitution) || 0
        }, v);
    });
};

const calculatePermanentStrain = () => {
    getAttrs(["cyberware_strain_total", "strain_permanent_extra", "strain_permanent"], v => {
        const permStrain = parseInt(v.cyberware_strain_total) + parseInt(v.strain_permanent_extra) || 0;
        mySetAttrs({
            strain_permanent: permStrain
        }, v);
    });
};

const calculateCyberwareStrain = () => {
    //Loop through the cyberware and add up the strain.
    getSectionIDs("repeating_cyberware", idArray => {
        const sourceAttrs = [
            ...idArray.map(id => `repeating_cyberware_${id}_cyberware_strain`),
            "cyberware_strain_total"
        ];
        getAttrs(sourceAttrs, v => {
            const cyberwareStrain = idArray.reduce((m, id) => {
                m += parseInt(v[`repeating_cyberware_${id}_cyberware_strain`]) || 0;
                return m
            }, 0)
            mySetAttrs({
                cyberware_strain_total: cyberwareStrain
            }, v);
        });
    });
};

const calculateStrain = () => {
    //Add up all the strain
    getAttrs(["strain_permanent", "strain_extra", "strain", "strain_max", "strain_above_max"], v => {
        const strain = (parseInt(v.strain_permanent) || 0) + (parseInt(v.strain_extra) || 0)
        const strain_above_max = strain > parseInt(v.strain_max) ? 1 : 0
        mySetAttrs({
            strain: strain,
            strain_above_max: strain_above_max
        }, v)
    })
}

const calculateAttr = (attr: string) => {
    getAttrs([attr, `${attr}_base`, `${attr}_boosts`], v => {
        const setting = {
            [`${attr}`]: `${(parseInt(v[`${attr}_base`]) || 10) + (parseInt(v[`${attr}_boosts`]) || 0)}`
        };
        mySetAttrs(setting, v, null, () => {
            calculateMod(attr);
        });
    });
}

const calculateMod = (attr: string) => {
    getAttrs([attr, `${attr}_bonus`, `${attr}_mod`], v => {
        const mod = (value => {
            if (value >= 18) return 2;
            else if (value >= 14) return 1;
            else if (value >= 8) return 0;
            else if (value >= 4) return -1;
            else return -2;
        })(parseInt(v[attr]) || 10);

        const setting = {
            [`${attr}_mod`]: `${mod + (parseInt(v[`${attr}_bonus`]) || 0)}`
        };

        mySetAttrs(setting, v, null, () => {
            calculateSaves();
            generateWeaponDisplay();
            calculateStrDexMod();
            if (attr === "dexterity") calculateAC();
        });
    });
};
const calculateStrDexMod = () => {
    getAttrs(["str_dex_mod", "strength_mod", "dexterity_mod"], v => {
        const str_dex_mod = Math.max(parseInt(v.strength_mod) || 0, parseInt(v.dexterity_mod) || 0);
        mySetAttrs({
            str_dex_mod
        }, v);
    });
};

const calculateShellAttrs = () => {
    const physicalAttrs = ["strength", "dexterity", "constitution"];
    getSectionIDs("repeating_shells", idArray => {
        const sourceAttrs = [
            ...idArray.map(id => `repeating_shells_${id}_shell_active`),
            ...idArray.map(id => `repeating_shells_${id}_shell_strength`),
            ...idArray.map(id => `repeating_shells_${id}_shell_dexterity`),
            ...idArray.map(id => `repeating_shells_${id}_shell_constitution`),
            ...physicalAttrs, "setting_transhuman_enable", "setting_ai_enable",

        ];
        getAttrs(sourceAttrs, v => {
            if (v.setting_transhuman_enable === "transhuman" || v.setting_ai_enable === "ai"){
                let attributes: {[key: string]: string} = {};
                physicalAttrs.forEach(attr => attributes[attr] = idArray
                    .filter(id => v[`repeating_shells_${id}_shell_active`] === "1")
                    .map(id => v[`repeating_shells_${id}_shell_${attr}`])[0] || "None")
                mySetAttrs(attributes, v, null, () => {
                    physicalAttrs.filter(attr => attributes[attr] !== "None").forEach(attr => calculateMod(attr));
                });
            } else {
                physicalAttrs.forEach(attr => calculateAttr(attr));
            }
        })
    })
}

const calculateNextLevelXP = () => {
    const xp = [0, 3, 6, 12, 18, 27, 39, 54, 72, 93];
    getAttrs(["level", "setting_xp_scheme"], v => {
        const level = parseInt(v.level)
        if (v.setting_xp_scheme === "xp") {
            if (level < 10) {
                setAttrs({
                    xp_next: xp[level]
                });
            } else {
                setAttrs({
                    xp_next: 93 + ((level - 9) * 24)
                });
            }
        } else if (v.setting_xp_scheme === "money") {
            setAttrs({
                xp_next: 2500 * (2 * level)
            });
        }
    });
};

const calculateGearReadiedStowed = () => {
    const doCalc = (gearIDs: string[], weaponIDs: string[], armorIDs: string[]) => {
        const attrs = [
            ...gearIDs.map(id => `repeating_gear_${id}_gear_amount`),
            ...gearIDs.map(id => `repeating_gear_${id}_gear_encumbrance`),
            ...gearIDs.map(id => `repeating_gear_${id}_gear_status`),
            ...gearIDs.map(id => `repeating_gear_${id}_gear_bundled`),
            ...armorIDs.map(id => `repeating_armor_${id}_armor_encumbrance`),
            ...armorIDs.map(id => `repeating_armor_${id}_armor_encumbrance_bonus`),
            ...armorIDs.map(id => `repeating_armor_${id}_armor_status`),
            ...weaponIDs.map(id => `repeating_weapons_${id}_weapon_encumbrance`),
            ...weaponIDs.map(id => `repeating_weapons_${id}_weapon_status`),
            "gear_readied", "gear_stowed", "strength", "gear_readied_max",
            "gear_readied_over", "gear_stowed_over", "gear_stowed_max"
        ];
        getAttrs(attrs, v => {
            const [gear_readied, gear_stowed] = armorIDs.reduce((m, id) => {
                if (v[`repeating_armor_${id}_armor_status`] === "READIED") {
                    m[0] += parseInt(v[`repeating_armor_${id}_armor_encumbrance`]) || 0;
                } else if (v[`repeating_armor_${id}_armor_status`] === "STOWED")
                    m[1] += parseInt(v[`repeating_armor_${id}_armor_encumbrance`]) || 0;
                return m;
            }, weaponIDs.reduce((m, id) => {
                if (v[`repeating_weapons_${id}_weapon_status`] === "READIED")
                    m[0] += parseInt(v[`repeating_weapons_${id}_weapon_encumbrance`]) || 0;
                else if (v[`repeating_weapons_${id}_weapon_status`] === "STOWED")
                    m[1] += parseInt(v[`repeating_weapons_${id}_weapon_encumbrance`]) || 0;
                return m;
            }, gearIDs.reduce((m, id) => {
                const amount = parseInt(v[`repeating_gear_${id}_gear_amount`]) || 0;
                let packingFactor = 1;
                if (v[`repeating_gear_${id}_gear_bundled`] === "on") {
                    packingFactor = 3;
                }
                if (v[`repeating_gear_${id}_gear_status`] === "READIED")
                    m[0] += Math.ceil((amount * parseFloat(v[`repeating_gear_${id}_gear_encumbrance`]))/packingFactor) || 0;
                else if (v[`repeating_gear_${id}_gear_status`] === "STOWED")
                    m[1] += Math.ceil((amount * parseFloat(v[`repeating_gear_${id}_gear_encumbrance`]))/packingFactor) || 0;
                return m;
            }, [0, 0])));

            const armor_encumbrance_bonus = Math.max(0,
                ...armorIDs.filter(id => v[`repeating_armor_${id}_armor_status`] === "READIED")
                    .map(id => parseInt(v[`repeating_armor_${id}_armor_encumbrance_bonus`]) || 0)
            );
            const gear_stowed_max = parseInt(v.strength) + armor_encumbrance_bonus || 0;
            const gear_readied_max = Math.floor(gear_stowed_max / 2);
            const setting = {
                gear_readied,
                gear_stowed,
                gear_readied_max,
                gear_stowed_max,
                gear_readied_over: (parseInt(v.gear_readied) > gear_readied_max) ? "1" : "0",
                gear_stowed_over: (parseInt(v.gear_stowed) > gear_stowed_max) ? "1" : "0",
            };

            mySetAttrs(setting, v, {
                silent: true
            });
        });
    };

    getSectionIDs("repeating_gear", gearIDs => {
        getSectionIDs("repeating_weapons", weaponIDs => {
            getSectionIDs("repeating_armor", armorIDs => doCalc(gearIDs, weaponIDs, armorIDs));
        });
    });
};

const generateWeaponDisplay = () => {
    // Generates the weapon menu and sets the display of weapons
    // in display mode in one go.
    getSectionIDs("repeating_weapons", idArray => {
        const prefixes = idArray.map(id => `repeating_weapons_${id}`);
        const sourceAttrs = [
            ...prefixes.map(prefix => `${prefix}_weapon_attack`),
            ...prefixes.map(prefix => `${prefix}_weapon_name`),
            ...prefixes.map(prefix => `${prefix}_weapon_skill_bonus`),
            ...prefixes.map(prefix => `${prefix}_weapon_attribute_mod`),
            ...prefixes.map(prefix => `${prefix}_weapon_damage`),
            ...prefixes.map(prefix => `${prefix}_weapon_shock`),
            ...prefixes.map(prefix => `${prefix}_weapon_shock_damage`),
            ...prefixes.map(prefix => `${prefix}_weapon_shock_ac`),
            ...prefixes.map(prefix => `${prefix}_weapon_skill_to_damage`),
            ...prefixes.map(prefix => `${prefix}_weapon_attack_display`),
            ...prefixes.map(prefix => `${prefix}_weapon_damage_display`),
            ...attributes.map(attr => `${attr}_mod`),
            ...weaponSkills,
            "attack_bonus",
            "str_dex_mod",
            "macro_weapons"
        ];
        getAttrs(sourceAttrs, v => {
            const setting: {[key: string]: string} = {};
            const baseAttackBonus = parseInt(v.attack_bonus) || 0;
            prefixes.forEach(prefix => {
                const attrBonus = parseInt(v[(v[`${prefix}_weapon_attribute_mod`] || "").slice(2, -1)]) || 0;
                const skillBonus = parseInt(v[(v[`${prefix}_weapon_skill_bonus`] || "").slice(2, -1)]) ||
                    parseInt(v[`${prefix}_weapon_skill_bonus`]) || 0;
                const damageBonus = attrBonus +
                    ((v[`${prefix}_weapon_skill_to_damage`] === "@{weapon_skill_bonus}") ? skillBonus : 0);
                const weaponDamage = (v[`${prefix}_weapon_damage`] === "0") ? "" : v[`${prefix}_weapon_damage`];
                const shockString = (v[`${prefix}_weapon_shock`] !== "0") ? `, ${
                    (parseInt(v[`${prefix}_weapon_shock_damage`])||0) + damageBonus
                }\xa0${translate("SHOCK").toString().toLowerCase()}${
                    v[`${prefix}_weapon_shock_ac`] ? ` ${translate("VS_AC_LEQ")} ${v[`${prefix}_weapon_shock_ac`]}` : ""
                }` : "";

                const attack = baseAttackBonus + (parseInt(v[`${prefix}_weapon_attack`]) || 0) +
                    ((skillBonus === -1) ? -2 : skillBonus) + attrBonus;
                const damage = weaponDamage + (weaponDamage ?
                    ((damageBonus === 0) ? "" : ((damageBonus > 0) ? ` + ${damageBonus}` : ` - ${-damageBonus}`)) :
                    damageBonus);

                setting[`${prefix}_weapon_attack_display`] = (attack >= 0) ? `+${attack}` : attack.toString();
                setting[`${prefix}_weapon_damage_display`] = `${damage || 0}\xa0${translate("DAMAGE").toString().toLowerCase()}${shockString}`;
            });
            setting.macro_weapons = prefixes.map((prefix, index) => {
                const label = `${v[`${prefix}_weapon_name`]} (${setting[`${prefix}_weapon_attack_display`]})`;
                return buildLink(label, `${prefix}_attack`, index === prefixes.length - 1);
            }).join(" ");
            mySetAttrs(setting, v, {
                silent: true
            });
        });
    });
};

const handleAmmoAPI = (sName: string) => {
    const formula = (sName === "weapons") ? "[[-1 - @{weapon_burst}]]" : "-1";
    getSectionIDs(`repeating_${sName}`, idArray => {
        getAttrs([
            "setting_use_ammo",
            ...idArray.map(id => `repeating_${sName}_${id}_weapon_use_ammo`),
            ...idArray.map(id => `repeating_${sName}_${id}_weapon_api`)
        ], v => {
            const setting = idArray.reduce((m: {[k: string]: string}, id) => {
                m[`repeating_${sName}_${id}_weapon_api`] =
                    (v.setting_use_ammo === "1" && v[`repeating_${sName}_${id}_weapon_use_ammo`] !== "0") ?
                        `\n!modattr --mute --charid @{character_id} --repeating_${sName}_${id}_weapon_ammo|${formula}` :
                        "";
                return m;
            }, {});
            mySetAttrs(setting, v, {
                silent: true
            });
        });
    });
};