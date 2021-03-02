/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/* Translations */
const setTranslatedDefaults = () => {
    const specialSkills = {
        skill_culture_alien_name: {
            trans: `${translate("CULTURE_ALIEN")}/`,
            default: "Culture/Alien/"
        },
        skill_culture_one_name: {
            trans: `${translate("CULTURE")}/`,
            default: "Culture/"
        },
        skill_culture_two_name: {
            trans: `${translate("CULTURE")}/`,
            default: "Culture/"
        },
        skill_culture_three_name: {
            trans: `${translate("CULTURE")}/`,
            default: "Culture/"
        },
        skill_profession_name: {
            trans: `${translate("PROFESSION")}/`,
            default: "Profession/"
        },
    };
    getAttrs([...Object.keys(specialSkills), "homebrew_skill_list", "innate_ac_name"], v => {
        const setting: {[key: string]: string} = {};
        if (v.homebrew_skill_list === "first") {
            Object.entries(specialSkills).forEach(([name, data]) => {
                if (v[name] === data.default && v[name] !== data.trans) setting[name] = data.trans;
            });
        }
        setting.innate_ac_name = translate("INNATE_AC").toString();
        mySetAttrs(setting, v);
    });
};
const handleAttributeQueries = () => {
    // Attribute query magic to set the global query variables according to
    // translations and the state of the setting_skill_query attribute.
    const attrQueries = attributes.map(attr => {
        const translated = translate(attr.toUpperCase());
        return `${translated},+ @{${attr}_mod}[${translated}]]]&#125;&#125; ` +
            `{{attribute= + ${translate(`${attr.toUpperCase()}_SHORT`)}&#125;&#125;`;
    });

    getAttrs(["attribute_query", "setting_skill_query",
        ...attributes.map(a => `attribute_query_${a.slice(0,3)}`)
    ], v => {

        if (v.setting_skill_query === "hover" || v.setting_skill_query === "hide") {
            mySetAttrs({
                attribute_query: `?{${translate("ATTRIBUTE")}|${[attrQueries[0], ...attrQueries.slice(1)].join("|")}}`,
                attribute_query_str: `+ @{strength_mod}[${translate("STRENGTH")}]]]}} {{attribute= + ${translate("STRENGTH_SHORT")}}}`,
                attribute_query_dex: `+ @{dexterity_mod}[${translate("DEXTERITY")}]]]}} {{attribute= + ${translate("DEXTERITY_SHORT")}}}`,
                attribute_query_con: `+ @{constitution_mod}[${translate("CONSTITUTION")}]]]}} {{attribute= + ${translate("CONSTITUTION_SHORT")}}}`,
                attribute_query_int: `+ @{intelligence_mod}[${translate("INTELLIGENCE")}]]]}} {{attribute= + ${translate("INTELLIGENCE_SHORT")}}}`,
                attribute_query_wis: `+ @{wisdom_mod}[${translate("WISDOM")}]]]}} {{attribute= + ${translate("WISDOM_SHORT")}}}`,
                attribute_query_cha: `+ @{charisma_mod}[${translate("CHARISMA")}]]]}} {{attribute= + ${translate("CHARISMA_SHORT")}}}`,
            }, v);
        } else if (v.setting_skill_query === "query") {
            mySetAttrs({
                attribute_query: `?{${translate("ATTRIBUTE")}|${[attrQueries[0], ...attrQueries.slice(1)].join("|")}}`,
                attribute_query_str: `?{${translate("ATTRIBUTE")}|${[attrQueries[0], ...attrQueries.slice(1)].join("|")}}`,
                attribute_query_dex: `?{${translate("ATTRIBUTE")}|${[attrQueries[1], attrQueries[0], ...attrQueries.slice(2)].join("|")}}`,
                attribute_query_con: `?{${translate("ATTRIBUTE")}|${[attrQueries[2], ...attrQueries.slice(0,2), ...attrQueries.slice(3)].join("|")}}`,
                attribute_query_int: `?{${translate("ATTRIBUTE")}|${[attrQueries[3], ...attrQueries.slice(0,3), ...attrQueries.slice(4)].join("|")}}`,
                attribute_query_wis: `?{${translate("ATTRIBUTE")}|${[attrQueries[4], ...attrQueries.slice(0,4), ...attrQueries.slice(5)].join("|")}}`,
                attribute_query_cha: `?{${translate("ATTRIBUTE")}|${[attrQueries[5], ...attrQueries.slice(0,5)].join("|")}}`,
            }, v);
        }
    });
};
const handleModifierQuery = () => {
    getAttrs(["modifier_query", "setting_modifier_query"], v => {
        if (`${v.setting_modifier_query}` === "1") {
            mySetAttrs({
                modifier_query: `+ ?{${translate("MODIFIER")}|0}[${translate("MODIFIER_SHORT")}]`,
            }, v);
        } else mySetAttrs({
            modifier_query: " "
        }, v);
    });
};
const setTranslatedQueries = () => {
    getAttrs(["burst_query", "extra_hp_query", "translation_numdice", "proficient_query", "skill_name_query"], v => {
        const setting = {
            burst_query: `?{${translate("BURST")}|${translate("YES")},+ 2[${translate("BURST")}]|${translate("NO")},&` + "#" + "32;}",
            extra_hp_query: `?{${translate("EXTRA_HP_QUERY")}|0}[${translate("BONUS")}]`,
            proficient_query: `?{${translate("PROFICIENT")}|${translate("YES")}, @{npc_skills}|${translate("NO")}, 0}[${translate("SKILL")}]`,
            skill_name_query: `?{${translate("SKILL_NAME")}|${translate("SKILL")}}`,
            translation_numdice: translate("NUMBER_OF_DICE")
        };
        mySetAttrs(setting, v);
    });
};
