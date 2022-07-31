/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/**
 * Migrations
 */
/* Upgrade event handler */
const handleUpgrade = () => {
    getAttrs(["character_sheet"], v => {
        if (!v.character_sheet || v.character_sheet.indexOf(sheetName) !== 0)
            upgradeFrom162();
        else if (v.character_sheet.slice(32) !== sheetVersion)
            upgradeSheet(v.character_sheet.slice(32), true);
    });
};

/* Versioned upgrade */
const upgradeSheet = (version: string, firstTime = false, finalTime = false) => {
    // Any version upgrade code should go here
    const performUpgrade = (version: string) => {
        const [major, minor, patch] = version.split(".").map(x => parseInt(x));
        console.log(`Upgrading from version ${version}.`);

        /** v2.1.0
         *  convert old format for burst settings for weapons and attacks
         *  set ammo and shock checkboxes to reasonable values
         *  convert old format for gear readied/stowed
         **/
        if (major === 2 && minor < 1) {
            const upgradeFunction = _.after(4, () => {
                // recalculate these things just to be sure, in case the v1.6.2 update
                // missed them.
                buildShipWeaponsMenu();
                buildAttacksMenu();
                buildMagicMenu();
                generateWeaponDisplay();
                attributes.forEach(calculateMod);

                upgradeSheet("2.1.0");
            });

            getSectionIDs("repeating_weapons", idArray => {
                const sourceAttrs = [
                    ...idArray.map(id => `repeating_weapons_${id}_weapon_burst`),
                    ...idArray.map(id => `repeating_weapons_${id}_weapon_shock_damage`),
                    ...idArray.map(id => `repeating_weapons_${id}_weapon_ammo`)
                ];
                getAttrs(sourceAttrs, v => {
                    const setting = idArray.reduce((m: {[k: string]: string}, id) => {
                        if (v[`repeating_weapons_${id}_weapon_burst`] === "0")
                            m[`repeating_weapons_${id}_weapon_burst`] = "";
                        else if (v[`repeating_weapons_${id}_weapon_burst`] === "2")
                            m[`repeating_weapons_${id}_weapon_burst`] = "+ 2[Burst]";
                        if (v[`repeating_weapons_${id}_weapon_shock_damage`] !== "0")
                            m[`repeating_weapons_${id}_weapon_shock`] = "{{shock=[[@{weapon_shock_damage} + @{weapon_attribute_mod}[Attribute] + @{weapon_skill_to_damage}[Skill]]] ^{SHOCK_DAMAGE_AGAINST_AC_LEQ} @{weapon_shock_ac}!}}";
                        if (v[`repeating_weapons_${id}_weapon_ammo`] && v[`repeating_weapons_${id}_weapon_ammo`] !== "0") {
                            m[`repeating_weapons_${id}_weapon_use_ammo`] = "{{ammo=[[0@{weapon_ammo} - (1 @{weapon_burst})]] / @{weapon_ammo|max}}}";
                        }
                        return m;
                    }, {});
                    setAttrs(setting, {}, () => upgradeFunction());
                });
            });
            getSectionIDs("repeating_ship-weapons", idArray => {
                getAttrs(idArray.map(id => `repeating_ship-weapons_${id}_weapon_ammo_max`), v => {
                    const setting = idArray.reduce((m: {[key: string]: string}, id) => {
                        if (v[`repeating_ship-weapons_${id}_weapon_ammo_max`] && v[`repeating_ship-weapons_${id}_weapon_ammo_max`] !== "0") {
                            m[`repeating_ship-weapons_${id}_weapon_use_ammo`] = "{{ammo=[[@{weapon_ammo} - 1]] / @{weapon_ammo_max}}}";
                        }
                        return m;
                    }, {});
                    setAttrs(setting, {}, () =>upgradeFunction());
                });
            });
            getSectionIDs("repeating_npc-attacks", idArray => {
                getAttrs(idArray.map(id => `repeating_npc-attacks_${id}_attack_burst`), v => {
                    const setting = idArray.reduce((m: {[key: string]: string}, id) => {
                        if (v[`repeating_npc-attacks_${id}_attack_burst`] === "0")
                            m[`repeating_npc-attacks_${id}_attack_burst`] = "";
                        else if (v[`repeating_npc-attacks_${id}_attack_burst`] === "2")
                            m[`repeating_npc-attacks_${id}_attack_burst`] = "+ 2[Burst]";
                        return m;
                    }, {});
                    setAttrs(setting, {}, () => upgradeFunction());
                });
            });
            getSectionIDs("repeating_gear", idArray => {
                getAttrs(idArray.map(id => `repeating_gear_${id}_gear_status`), v => {
                    const setting = idArray.reduce((m: {[key: string]: string}, id) => {
                        m[`repeating_gear_${id}_gear_status`] =
                            (v[`repeating_gear_${id}_gear_status`] || "").toUpperCase();
                        return m;
                    }, {});
                    mySetAttrs(setting, v, null, () => upgradeFunction());
                });
            });
        }
        /** v2.2.0
         *  convert single armor line to repeating armor
         *  Change @{attribute_query_none} to @{attribute_query}
         **/
        else if (major === 2 && minor < 2) {
            const upgradeFunction = _.after(2, () => {
                calculateStrDexMod();
                calculateEffort();
                buildPsionicsMenu();
                buildSkillMenu();

                upgradeSheet("2.2.0");
            });
            getAttrs(["armor_name", "armor_ac", "armor_encumbrance", "armor_type", "setting_ship_tab_name"], v => {
                if (v.armor_ac) {
                    const data = {
                        armor_active: "1",
                        armor_ac: v.armor_ac,
                        armor_encumbrance: v.armor_encumbrance || "0",
                        armor_name: v.armor_name || "",
                        armor_status: "READIED",
                        armor_type: (v.armor_type || "").toUpperCase()
                    };
                    fillRepeatingSectionFromData("armor", data, () => upgradeFunction());
                } else upgradeFunction();
                if (v.setting_ship_tab_name === "MECH") setAttrs({
                    ship_vehicle_type: "MECH"
                });
            });
            getSectionIDs("repeating_skills", skillIDs => getSectionIDs("repeating_magic-skills", magicIDs => {
                getSectionIDs("repeating_psychic-skills", psychicIDs => {
                    const sourceAttrs = [
                        ...skillIDs.map(id => `repeating_skills_${id}_skill_query`),
                        ...magicIDs.map(id => `repeating_magic-skills_${id}_skill_query`),
                        ...psychicIDs.map(id => `repeating_psychic-skills_${id}_skill_query`),
                        ...skills.revised.map(skill => `skill_${skill}_query`),
                        ...skills.first.map(skill => `skill_${skill}_query`),
                        ...skills.psionic.map(skill => `skill_${skill}_query`),
                        "skill_magic_query", "skill_magic2_query"
                    ];
                    getAttrs(sourceAttrs, v => {
                        const setting = sourceAttrs.reduce((m: {[key: string]: string}, attrName) => {
                            if (v[attrName] === "@{attribute_query_none}") m[attrName] = "@{attribute_query}";
                            return m;
                        }, {});
                        mySetAttrs(setting, v, null, () => upgradeFunction());
                    });
                });
            }));
        }
        /** v2.3.1
         *  Regenerate drone and weapon ABs
         **/
        else if (major === 2 && (minor < 3 || (minor === 3 && patch === 0))) {
            const upgradeFunction = _.after(1, () => {
                upgradeSheet("2.3.1");
            });
            generateWeaponDisplay();
            getSectionIDs("repeating_drones", idArray => {
                calculateDroneAttack(idArray.map(id => `repeating_drones_${id}`), () => upgradeFunction());
            });
        }
        /** v2.4.3
         * Regenerate Cyberware strain because it was bugged
         **/
        else if (major === 2 && (minor < 4 || (minor === 4 && patch < 3))) {
            calculateCyberwareStrain();
            upgradeSheet("2.4.3");
        }
        /** v2.4.7
         * Move attr to attr_base, and recalculate attr
         **/
        else if (major === 2 && minor === 4 && patch < 7) {
            attributes.forEach(attr => {
                getAttrs([attr, `${attr}_base`], v => {
                    mySetAttrs({[`${attr}_base`]: parseInt(v[`${attr}`]) || 10}, v, null, () => {
                        calculateAttr(attr);
                    });
                });
            });
            upgradeSheet("2.4.7");
        }

        /** v2.4.11
         * Recalculate drone attack to remove incorrect double Int bonus
         */
        else if (major === 2 && minor === 4 && patch < 12) {
            getSectionIDs("repeating_drones", idArray => {
                calculateDroneAttack(idArray.map(id => `repeating_drones_${id}`));
            })
            upgradeSheet("2.4.12");
        }

        /** v2.5.3
         * Rebuild magic "Quick Menu" to fix incorrect skills being listed.
         */
        else if (major === 2 && minor < 5) {
            buildMagicMenu();
            upgradeSheet("2.5.3")
        }


        /** v2.6.0
         * Move extra strain into strain_extra
         * Move NPC AC and HD into npc_ac and npc_hd
         */
        else if (major === 2 && minor < 6) {
            getAttrs(["strain", "strain_permanent", "strain_extra", "AC", "HP", "HP_max"], v => {
                const strain_extra = (parseInt(v.strain) || 0) - (parseInt(v.strain_permanent) || 0)
                mySetAttrs({
                    strain_extra: strain_extra,
                    npc_ac: v.AC,
                    npc_hd: v.HD,
                    npc_hd_max: v.HP_max
                }, v, null, () => {
                    upgradeSheet("2.6.0")
                })
            })
        }

        /** v2.6.3
         * Regenerate weapon displays (to fix incorrect bonus displayed with Sunblade)
         */
        else if (major === 2 && minor < 6) {
            generateWeaponDisplay()
            upgradeSheet("2.6.3")
        }

        /** Final upgrade clause, always leave this around */
        else upgradeSheet(sheetVersion, false, true);
    };

    if (firstTime) performUpgrade(version);
    else setAttrs({
        character_sheet: `${sheetName} v${version}`,
    }, {}, () => {
        if (!finalTime) performUpgrade(version);
    });
};
/* Main upgrade from pre-worker versioning */
const upgradeFrom162 = () => {
    console.log("Upgrading from versionless sheet (assumed to be fresh or v1.6.2).");
    const upgradeFunction = _.after(13, () => {
        upgradeSheet("2.0.1");
    });

    // Legacy migration
    getAttrs([1, 2, 3, 4, 5, 6, 7, 8].map(i => `psionics_mastered_${i}`), v => {
        const setting: {[key: string]: string} = {};
        for (let i = 1; i < 9; i++) {
            const technique = v[`psionics_mastered_${i}`];
            if (technique) {
                const newRowId = generateRowID();
                setting[`repeating_techniques_${newRowId}_technique_name`] = technique;
            }
        }
        setAttrs(setting);
    });
    getAttrs([1, 2, 3, 4].map(i => `cyberware_${i}`), v => {
        const setting: {[key: string]: string} = {};
        for (let i = 1; i < 5; i++) {
            const cyberware = v[`cyberware_${i}`];
            if (cyberware) {
                const newRowId = generateRowID();
                setting[`repeating_cyberware_${newRowId}_cyberware_name`] = cyberware;
            }
        }
        setAttrs(setting);
    });
    getAttrs(["languages"], v => {
        if (v.languages) {
            const setting: {[key: string]: string} = {};

            v.languages.split(/\r?\n/).filter(l => !!l).forEach(language => {
                const newRowId = generateRowID();
                setting[`repeating_languages_${newRowId}_language`] = language;
            });
            setAttrs(setting);
        }
    });

    const attrConversionData = {
        armor_enc: "armor_encumbrance",
        cha: "charisma",
        cha_misc: "charisma_bonus",
        con: "constitution",
        con_misc: "constitution_bonus",
        dex: "dexterity",
        dex_misc: "dexterity_bonus",
        gender: "species_gender",
        hd: "npc_hd",
        int: "intelligence",
        int_misc: "intelligence_bonus",
        morale: "npc_morale",
        move: "npc_move",
        name: "npc_name",
        notes: "npc_notes",
        npc_ac: "AC",
        saves: "npc_saves",
        ship_hp_min: "ship_hp",
        ship_current_crew: "ship_crew",
        ship_last_maintenance_cost: "ship_last_maintenance",
        skills: "npc_skills",
        skill_biopsion: "skill_biopsionics",
        skill_metapsion: "skill_metapsionics",
        skill_points: "unspent_skill_points",
        str: "strength",
        strain_perm: "strain_permanent",
        str_misc: "strength_bonus",
        wis: "wisdom",
        wis_misc: "wisdom_bonus",
    };
    const attrsToConvertFromOnTo1 = [
        "homebrew_luck_save",
        "homebrew_extra_skills",
        "setting_heroic_enable",
    ];
    const customConversionAttrs = [
        "damage",
        "homebrew_psionics_disable",
        "npc_attacks",
        "npc_attack_bonus",
        "setting_space_magic_enable",
        "ship_other_notes",
        "ship_free_hardpoints",
        "ship_free_mass",
        "ship_free_power",
        "skill_culture_alien_type",
        "skill_culture_one_value",
        "skill_culture_two_value",
        "skill_culture_three_value",
        "profession_type",
        "tab",
        ...[1, 2, 3, 4].map(n => `homebrew_custom_counter_${n}_name`),
        ...[1, 2, 3, 4].map(n => `homebrew_custom_counter_${n}_counter`),
    ];
    // convert non-repeating attributes
    getAttrs([
        ...Object.keys(attrConversionData),
        ...Object.values(attrConversionData),
        ...attrsToConvertFromOnTo1,
        ...customConversionAttrs,
    ], v => {
        const setting = Object.entries(attrConversionData).reduce((m: {[key: string]: string}, [oldName, newName]) => {
            if (v[oldName] && v[oldName] !== "" && `${v[newName]}` !== `${v[oldName]}`)
                m[newName] = v[oldName];
            return m;
        }, {});
        attrsToConvertFromOnTo1.forEach(name => {
            if (v[name] === "on") setting[name] = "1";
        });

        // convert skill name format
        ["one", "two", "three"].forEach(num => {
            if (v[`skill_culture_${num}_value`])
                setting[`skill_culture_${num}_name`] = `Culture/${v[`skill_culture_${num}_value`]}`;
        });
        if (v.profession_type) setting.skill_profession_name = `Profession/${v.profession_type}`;
        if (v.skill_culture_alien_type)
            setting.skill_culture_alien_name = `Culture/Alien/${v.skill_culture_alien_type}`;

        // Write legacy ship data
        if (v.ship_free_hardpoints || v.ship_free_mass || v.ship_free_power) {
            setting.ship_other_notes = `\nLegacy attributes${
                v.ship_free_power ? `\nFree Power: ${v.ship_free_power}` : ""}${
                v.ship_free_mass ? `\nFree Mass: ${v.ship_free_mass}` : ""}${
                v.ship_free_hardpoints ? `\nFree Hardpoints: ${v.ship_free_hardpoints}` : ""}
					${v.ship_other_notes || ""}`;
        }
        // convert homebrew custom counter stuff
        const customCounterData = [1, 2, 3, 4].reduce((m, num) => {
            if (v[`homebrew_custom_counter_${num}_name`]) m.push({
                resource_name: v[`homebrew_custom_counter_${num}_name`],
                resource_count: v[`homebrew_custom_counter_${num}_counter`] || 0
            });
            return m;
        }, []);
        fillRepeatingSectionFromData("resources", customCounterData, () => upgradeFunction());

        // Tab
        if (`${v.tab}` === "1" || `${v.tab}` === "4") setting.tab = "character";
        if (`${v.tab}` === "2") setting.tab = "ship";
        if (`${v.tab}` === "3") {
            setting.tab = "character";
            setting.npc = "1";
        }

        // NPC attack
        if (v.damage) {
            const newAttack = {
                attack_damage: v.damage,
                attack_name: translate("ATTACK"),
                attack_number: v.npc_attacks || "1"
            };
            fillRepeatingSectionFromData("npc-attacks", newAttack, () => upgradeFunction());
        } else upgradeFunction();

        // Psionics/Space Magic toggle conversion
        if (v.setting_space_magic_enable === "on" && v.homebrew_psionics_disable !== "on")
            setting.setting_super_type = "both";
        else if (v.setting_space_magic_enable === "on")
            setting.setting_super_type = "magic";
        else if (v.homebrew_psionics_disable === "on")
            setting.setting_super_type = "neither";

        setAttrs(setting, {}, () => upgradeFunction());
    });
    // convert weapon attributes, and extract ship weapons
    getSectionIDs("repeating_weapons", idArray => {
        const oldAttrs = [
            ...idArray.map(id => `repeating_weapons_${id}_attribute_mod`),
            ...idArray.map(id => `repeating_weapons_${id}_add_skill`),
            ...idArray.map(id => `repeating_weapons_${id}_weapon_shock`),
            ...idArray.map(id => `repeating_weapons_${id}_ship_weapon_name`),
            ...idArray.map(id => `repeating_weapons_${id}_ship_weapon_power`),
            ...idArray.map(id => `repeating_weapons_${id}_ship_weapon_ab`),
            ...idArray.map(id => `repeating_weapons_${id}_ship_weapon_damage`),
            ...idArray.map(id => `repeating_weapons_${id}_ship_weapon_ammo`),
            ...idArray.map(id => `repeating_weapons_${id}_ship_weapon_special_effects`),
            ...idArray.map(id => `repeating_weapons_${id}_ship_weapon_broken`),
        ];
        getAttrs(oldAttrs, v => {
            const setting = idArray.reduce((m: {[key: string]: string}, id) => {
                if (v[`repeating_weapons_${id}_add_skill`] === "@{weapon_skill_bonus}")
                    m[`repeating_weapons_${id}_weapon_skill_to_damage`] = "@{weapon_skill_bonus}";
                if (v[`repeating_weapons_${id}_weapon_shock`])
                    m[`repeating_weapons_${id}_weapon_shock_damage`] = v[`repeating_weapons_${id}_weapon_shock`];
                const modValue = v[`repeating_weapons_${id}_attribute_mod`];
                switch (modValue) {
                    case "@{dex_bonus}":
                        m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{dexterity_mod}";
                        break;
                    case "@{con_bonus}":
                        m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{constitution_mod}";
                        break;
                    case "@{int_bonus}":
                        m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{intelligence_mod}";
                        break;
                    case "@{wis_bonus}":
                        m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{wisdom_mod}";
                        break;
                    case "@{cha_bonus}":
                        m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{charisma_mod}";
                        break;
                    default:
                        m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{strength_mod}";
                }
                return m;
            }, {});
            const data = idArray.filter(id => v[`repeating_weapons_${id}_ship_weapon_name`])
                .map(id => {
                    const row: {[key: string]: string} = {};
                    row.weapon_name = v[`repeating_weapons_${id}_ship_weapon_name`];
                    if (v[`repeating_weapons_${id}_ship_weapon_power`])
                        row.weapon_power = v[`repeating_weapons_${id}_ship_weapon_power`];
                    if (v[`repeating_weapons_${id}_ship_weapon_ab`])
                        row.weapon_attack_bonus = v[`repeating_weapons_${id}_ship_weapon_ab`];
                    if (v[`repeating_weapons_${id}_ship_weapon_damage`])
                        row.weapon_damage = v[`repeating_weapons_${id}_ship_weapon_damage`];
                    if (v[`repeating_weapons_${id}_ship_weapon_ammo`])
                        row.weapon_ammo = v[`repeating_weapons_${id}_ship_weapon_ammo`];
                    if (v[`repeating_weapons_${id}_ship_weapon_special_effects`])
                        row.weapon_qualities = v[`repeating_weapons_${id}_ship_weapon_special_effects`];
                    if (v[`repeating_weapons_${id}_ship_weapon_broken`] === "on")
                        row.weapon_broken = "1";
                    return row;
                });
            fillRepeatingSectionFromData("ship-weapons", data, () => upgradeFunction());
            setAttrs(setting, null, () => upgradeFunction());
        });
    });
    // convert skills
    getSectionIDs("repeating_skills", idArray => {
        const oldAttrs = [
            ...idArray.map(id => `repeating_skills_${id}_custom_skill_1_name`),
            ...idArray.map(id => `repeating_skills_${id}_custom_skill_2_name`),
            ...idArray.map(id => `repeating_skills_${id}_custom_skill_1_level`),
            ...idArray.map(id => `repeating_skills_${id}_custom_skill_2_level`),
            ...idArray.map(id => `repeating_skills_${id}_custom_skill_1_specialist`),
            ...idArray.map(id => `repeating_skills_${id}_custom_skill_2_specialist`),
        ];
        getAttrs(oldAttrs, v => {
            const data = idArray.reduce((m, id) => {
                [1, 2].forEach(i => {
                    if (v[`repeating_skills_${id}_custom_skill_${i}_name`]) {
                        const skillLevel = (typeof v[`repeating_skills_${id}_custom_skill_${i}_level`] === "undefined") ?
                            "-1" : v[`repeating_skills_${id}_custom_skill_${i}_level`];
                        m.push({
                            skill_name: v[`repeating_skills_${id}_custom_skill_${i}_name`],
                            skill: skillLevel,
                            skill_specialist: v[`repeating_skills_${id}_custom_skill_${i}_specialist`] || "2d6"
                        });
                    }
                });
                return m;
            }, []);
            idArray.forEach(id => removeRepeatingRow(`repeating_skills_${id}`));
            fillRepeatingSectionFromData("skills", data, () => upgradeFunction());
        });
    });
    // convert techniques
    getSectionIDs("repeating_technique", idArray => {
        const oldAttrs = [
            ...idArray.map(id => `repeating_technique_${id}_technique`),
            ...idArray.map(id => `repeating_technique_${id}_technique_description`),
        ];
        getAttrs(oldAttrs, v => {
            const data = idArray.reduce((m, id) => {
                if (v[`repeating_technique_${id}_technique`])
                    m.push({
                        technique_name: v[`repeating_technique_${id}_technique`],
                        technique_description: v[`repeating_technique_${id}_technique_description`] || ""
                    });
                return m;
            }, []);
            fillRepeatingSectionFromData("techniques", data, () => upgradeFunction());
            idArray.forEach(id => removeRepeatingRow(`repeating_technique_${id}`));
        });
    });
    // convert cyberware name
    getSectionIDs("repeating_cyberware", idArray => {
        getAttrs(idArray.map(id => `repeating_cyberware_${id}_cyberware`), v => {
            const setting = idArray.reduce((m: {[key: string]: string}, id) => {
                if (v[`repeating_cyberware_${id}_cyberware`])
                    m[`repeating_cyberware_${id}_cyberware_name`] = v[`repeating_cyberware_${id}_cyberware`];
                return m;
            }, {});
            setAttrs(setting, null, () => upgradeFunction());
        });
    });
    // convert goals
    getSectionIDs("repeating_goals", idArray => {
        const oldAttrs = [
            ...idArray.map(id => `repeating_goals_${id}_misc_goal`),
            ...idArray.map(id => `repeating_goals_${id}_misc_goal_xp`),
        ];
        getAttrs(oldAttrs, v => {
            const setting = idArray.reduce((m: {[key: string]: string}, id) => {
                if (v[`repeating_goals_${id}_misc_goal`])
                    m[`repeating_goals_${id}_goal_name`] = v[`repeating_goals_${id}_misc_goal`];
                if (v[`repeating_goals_${id}_misc_goal_xp`])
                    m[`repeating_goals_${id}_goal_xp`] = v[`repeating_goals_${id}_misc_goal_xp`];
                return m;
            }, {});
            setAttrs(setting, null, () => upgradeFunction());
        });
    });
    // convert languages
    getSectionIDs("repeating_languages", idArray => {
        getAttrs(idArray.map(id => `repeating_languages_${id}_languages`), v => {
            const setting = idArray.reduce((m: {[key: string]: string}, id) => {
                if (v[`repeating_languages_${id}_languages`])
                    m[`repeating_languages_${id}_language`] = v[`repeating_languages_${id}_languages`];
                return m;
            }, {});
            setAttrs(setting, null, () => upgradeFunction());
        });
    });
    // convert gear status
    getSectionIDs("repeating_gear", idArray => {
        getAttrs(idArray.map(id => `repeating_gear_${id}_gear_readied`), v => {
            const setting = idArray.reduce((m: {[key: string]: string}, id) => {
                if (`${v[`repeating_gear_${id}_gear_readied`]}` === "1")
                    m[`repeating_gear_${id}_gear_status`] = "readied";
                else if (`${v[`repeating_gear_${id}_gear_readied`]}` === "2")
                    m[`repeating_gear_${id}_gear_status`] = "stowed";
                return m;
            }, {});
            setAttrs(setting, null, () => upgradeFunction());
        });
    });
    // convert defenses
    getSectionIDs("repeating_defenses", idArray => {
        const oldAttrs = [
            ...idArray.map(id => `repeating_defenses_${id}_ship_defense_name`),
            ...idArray.map(id => `repeating_defenses_${id}_ship_defense_special_effects`),
            ...idArray.map(id => `repeating_defenses_${id}_ship_defense_broken`),
        ];
        getAttrs(oldAttrs, v => {
            const data = idArray.map(id => {
                const row: {[key: string]: string} = {};
                if (v[`repeating_defenses_${id}_ship_defense_name`])
                    row.defense_name = v[`repeating_defenses_${id}_ship_defense_name`];
                if (v[`repeating_defenses_${id}_ship_defense_special_effects`])
                    row.defense_effect = v[`repeating_defenses_${id}_ship_defense_special_effects`];
                if (v[`repeating_defenses_${id}_ship_defense_broken`])
                    row.defense_broken = "1";
                return row;
            });
            fillRepeatingSectionFromData("ship-defenses", data, () => upgradeFunction());
        });
    });
    // convert fittings
    getSectionIDs("repeating_fittings", idArray => {
        const oldAttrs = [
            ...idArray.map(id => `repeating_fittings_${id}_ship_fitting_name`),
            ...idArray.map(id => `repeating_fittings_${id}_ship_fitting_special_effects`),
            ...idArray.map(id => `repeating_fittings_${id}_ship_fitting_broken`),
        ];
        getAttrs(oldAttrs, v => {
            const data = idArray.map(id => {
                const row: {[key: string]: string} = {};
                if (v[`repeating_fittings_${id}_ship_fitting_name`])
                    row.fitting_name = v[`repeating_fittings_${id}_ship_fitting_name`];
                if (v[`repeating_fittings_${id}_ship_fitting_special_effects`])
                    row.fitting_effect = v[`repeating_fittings_${id}_ship_fitting_special_effects`];
                if (v[`repeating_fittings_${id}_ship_fitting_broken`])
                    row.fitting_broken = "1";
                return row;
            });
            fillRepeatingSectionFromData("ship-fittings", data, () => upgradeFunction());
        });
    });
};
