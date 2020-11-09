/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/* Menu builders */
/* Helper functions for  producing skill chat menus */
const skillToMacro = v => skill => {
    const namedSkills = [
        "culture_one", "culture_two", "culture_three",
        "culture_alien", "profession", "magic2"
    ];
    if (namedSkills.includes(skill))
        return [`@{skill_${skill}_name} (${sign(v[`skill_${skill}`])})`, `skill_${skill}`];
    else
        return [`^{${skill.toUpperCase()}} (${sign(v[`skill_${skill}`])})`, `skill_${skill}`];
};
const idToSkillMacro = (v, sName) => id => {
    const prefix = `repeating_${sName}_${id}_skill`;
    return [`${v[`${prefix}_name`]} (${sign(v[prefix])})`, prefix];
};
const buildSkillMacro = ([name, command], index, allSkills) => {
    return buildLink(name, command, index + 1 === allSkills.length);
};
/* End helper functions */
const buildSaveMenu = () => {
    getAttrs(["homebrew_luck_save", "macro_saves"], v => {
        const macro_saves = buildLink("^{PHYSICAL} (v@{save_physical})", ("save_physical")) + " " +
            buildLink("^{MENTAL} (v@{save_mental})", ("save_mental")) + " " +
            buildLink("^{EVASION} (v@{save_evasion})", ("save_evasion"), v.homebrew_luck_save !== "1") +
            ((v.homebrew_luck_save === "1") ?
                (" " + buildLink("^{LUCK} (v@{save_luck})", ("save_luck"), true)) : "");
        mySetAttrs({
            macro_saves
        }, v);
    });
};
const buildSkillMenu = () => {
    getSectionIDs("repeating_skills", idArray => {
        const sourceAttrs = [
            ...skills.revised.map(sk => `skill_${sk}`),
            ...skills.first.map(sk => `skill_${sk}`),
            "homebrew_skill_list",
            "setting_show_untrained_skills",
            "macro_skills",
            ...idArray.map(id => `repeating_skills_${id}_skill_name`),
            ...idArray.map(id => `repeating_skills_${id}_skill`),
        ];
        getAttrs(sourceAttrs, v => {
            const skillList = skills[v.homebrew_skill_list] || [];
            const hasSkills = skillList.filter(skill => v[`skill_${skill}`] !== "-1").length ||
                idArray.filter(id => v[`repeating_skills_${id}_skill`] !== "-1").length;

            const macro_skills = `${[
                ...skillList.filter(skill => v[`skill_${skill}`] !== "-1").map(skillToMacro(v)),
                ...idArray.filter(id => v[`repeating_skills_${id}_skill`] !== "-1").map(idToSkillMacro(v, "skills"))
            ].map(buildSkillMacro).join(" ")}${v.setting_show_untrained_skills === "1" ? `${
                hasSkills ? "\n\n**^{UNTRAINED}**\n" : ""}${[
                ...skillList.filter(skill => v[`skill_${skill}`] === "-1").map(skillToMacro(v)),
                ...idArray.filter(id => v[`repeating_skills_${id}_skill`] === "-1").map(idToSkillMacro(v, "skills"))
            ].map(buildSkillMacro).join(" ")}` : ""}`;
            mySetAttrs({
                macro_skills
            }, v);
        });
    });
};
const buildPsionicsMenu = () => {
    getSectionIDs("repeating_techniques", techniqueIDs => {
        getSectionIDs("repeating_psychic-skills", skillIDs => {
            const sourceAttrs = [
                ...skills.psionic.map(sk => `skill_${sk}`),
                "setting_super_type",
                "macro_psionics",
                ...skillIDs.map(id => `repeating_psychic-skills_${id}_skill_name`),
                ...skillIDs.map(id => `repeating_psychic-skills_${id}_skill`),
                ...techniqueIDs.map(id => `repeating_techniques_${id}_technique_name`),
            ];
            getAttrs(sourceAttrs, v => {
                if (v.setting_super_type === "magic" || v.setting_super_type === "neither") return;
                const macro_psionics = `${[
                    ...skills.psionic.filter(skill => v[`skill_${skill}`] !== "-1").map(skillToMacro(v)),
                    ...skillIDs.filter(id => v[`repeating_psychic-skills_${id}_skill`] !== "-1")
                        .map(idToSkillMacro(v, "psychic-skills"))
                ].map(buildSkillMacro).join(" ")}${(techniqueIDs.length ? "\n\n" : "")}${
                    techniqueIDs.map((id, index, allIDs) => buildLink(v[`repeating_techniques_${id}_technique_name`],
                        `repeating_techniques_${id}_technique`, index + 1 === allIDs.length)).join(" ")}`;
                mySetAttrs({
                    macro_psionics
                }, v);
            });
        });
    });
};
const buildMagicMenu = () => {
    getSectionIDs("repeating_spells", spellIDs => {
        getSectionIDs("repeating_magic-skills", skillIDs => {
            const sourceAttrs = [
                "skill_know_magic", "skill_use_magic", "skill_sunblade_magic", "skill_fight", "skill_magic2", "skill_magic2_name",
                "setting_super_type", "macro_magic",
                ...skillIDs.map(id => `repeating_magic-skills_${id}_skill_name`),
                ...skillIDs.map(id => `repeating_magic-skills_${id}_skill`),
                ...spellIDs.map(id => `repeating_spells_${id}_spell_name`),
            ];
            getAttrs(sourceAttrs, v => {
                if (v.setting_super_type === "psionics" || v.setting_super_type === "neither") return;
                const macro_magic = `${[
                    ...(v.skill_magic2_name ? ["know_magic", "use_magic", "fight", "sunblade", "magic2"] : ["know_magic", "use_magic", "fight", "sunblade"]).map(skillToMacro(v)),
                    ...skillIDs.map(idToSkillMacro(v, "magic-skills"))
                ].map(buildSkillMacro).join(" ")}${spellIDs.length ? "\n\n" : ""}${
                    spellIDs.map(id => buildLink(v[`repeating_spells_${id}_spell_name`], `repeating_spells_${id}_spell`))
                        .join(" ")}`;
                mySetAttrs({
                    macro_magic
                }, v);
            });
        });
    });
};
const buildShipWeaponsMenu = () => {
    getSectionIDs("repeating_ship-weapons", idArray => {
        const sourceAttrs = [
            ...idArray.map(id => `repeating_ship-weapons_${id}_weapon_name`),
            ...idArray.map(id => `repeating_ship-weapons_${id}_weapon_attack_bonus`),
            "macro_ship_weapons"
        ];
        getAttrs(sourceAttrs, v => {
            const macro_ship_weapons = idArray.map((id, index) => {
                const title = v[`repeating_ship-weapons_${id}_weapon_name`] +
                    ` ${sign(v[`repeating_ship-weapons_${id}_weapon_attack_bonus`])}`;
                return buildLink(title, `repeating_ship-weapons_${id}_attack`, index + 1 === idArray.length);
            }).join(" ");
            mySetAttrs({
                macro_ship_weapons
            }, v);
        });
    });
};
const buildAttacksMenu = () => {
    getSectionIDs("repeating_npc-attacks", idArray => {
        const sourceAttrs = [
            ...idArray.map(id => `repeating_npc-attacks_${id}_attack_name`),
            ...idArray.map(id => `repeating_npc-attacks_${id}_attack_ab`),
            ...idArray.map(id => `repeating_npc-attacks_${id}_attack_number`),
            "macro_npc_attacks"
        ];
        getAttrs(sourceAttrs, v => {
            const macro_npc_attacks = idArray.map((id, index) => {
                const title = v[`repeating_npc-attacks_${id}_attack_name`] +
                    ` ${sign(v[`repeating_npc-attacks_${id}_attack_ab`])}` +
                    ((v[`repeating_npc-attacks_${id}_attack_number`] !== "1") ?
                        ` (${v[`repeating_npc-attacks_${id}_attack_number`]} attacks)` : "");
                return buildLink(title, `repeating_npc-attacks_${id}_attack`, index + 1 === idArray.length);
            }).join(" ");
            mySetAttrs({
                macro_npc_attacks
            }, v);
        });
    });
};
const buildAbilitiesMenu = () => {
    getSectionIDs("repeating_npc-abilities", idArray => {
        const sourceAttrs = [
            ...idArray.map(id => `repeating_npc-abilities_${id}_ability_name`),
            "macro_npc_abilities"
        ];
        getAttrs(sourceAttrs, v => {
            const macro_npc_abilities = idArray.map((id, index) => {
                return buildLink(v[`repeating_npc-abilities_${id}_ability_name`],
                    `repeating_npc-abilities_${id}_ability`, index + 1 === idArray.length);
            }).join(" ");
            mySetAttrs({
                macro_npc_abilities
            }, v);
        });
    });
};
const buildStatblock = () => {
    const sourceAttrs = [
        "npc",
        "macro_npc_abilities",
        "macro_npc_attacks",
        "macro_statblock",
    ];
    getAttrs(sourceAttrs, v => {
        if (v.npc !== "1") return;
        const macroList = [
            "[**^{SAVES}** v@{npc_saves},](~npc_save) [**^{SKILLS}** +@{npc_skills},](~npc_skill) ",
            "[**^{MORALE}** v@{npc_morale}](~npc_morale)\n",
            "[**^{INITIATIVE_FIXED}** d8,](~npc_initiative) [**^{REACTION}** 2d6,](~npc_reaction) ",
            "**Move** @{npc_move}\n"
        ];
        if (v.macro_npc_attacks) macroList.push("\n**Attacks:** @{macro_npc_attacks}");
        if (v.macro_npc_abilities) macroList.push("\n**Abilities:** @{macro_npc_abilities}");
        mySetAttrs({
            macro_statblock: macroList.join("")
        }, v);
    });
};
