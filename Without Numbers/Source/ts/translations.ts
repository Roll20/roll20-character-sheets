/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/* Translations */
const setTranslatedDefaults = () => {
  const specialSkills = {
    skill_culture_alien_name: {
      trans: `${translate("CULTURE_ALIEN")}/`,
      default: "Culture/Alien/",
    },
    skill_culture_one_name: {
      trans: `${translate("CULTURE")}/`,
      default: "Culture/",
    },
    skill_culture_two_name: {
      trans: `${translate("CULTURE")}/`,
      default: "Culture/",
    },
    skill_culture_three_name: {
      trans: `${translate("CULTURE")}/`,
      default: "Culture/",
    },
    skill_profession_name: {
      trans: `${translate("PROFESSION")}/`,
      default: "Profession/",
    },
  };
  getAttrs([...Object.keys(specialSkills), "system", "innate_ac_name"], (v) => {
    const setting: { [key: string]: string } = {};
    setting.innate_ac_name = translate("INNATE_AC").toString();
    mySetAttrs(setting, v);
  });
};
const handleAttributeQueries = () => {
  // Attribute query magic to set the global query variables according to
  // translations and the state of the setting_skill_query attribute.
  const getAttributeTranslation = (attr: string) =>
    translate(attr.toUpperCase());

  const attrQueries = attributes.map((attr) => {
    const translated = getAttributeTranslation(attr);
    return `${translated},+ @{${attr}_mod}[${translated}]]]&#125;&#125; {{attribute= + ${translated})}&#125;&#125;`;
  });

  const queryPrefix = `?{${translate("ATTRIBUTE")}|`;

  getAttrs(
    [
      "attribute_query",
      "setting_skill_query",
      ...attributes.map((a) => `attribute_query_${a.slice(0, 3)}`),
    ],
    (v) => {
      const translatedString = (attr: string) => {
        const translated = getAttributeTranslation(attr);
        const abbr = translated && translate(translated.slice(0, 3));
        return `+ @{${attr}_mod}[${`${translated}`}]]]}} {{attribute= + ${abbr}}}`;
      };

      const attributeObject: { [key: string]: string } = {};
      attributes.forEach((a) => {
        attributeObject[
          `attribute_query_${a.slice(0, 3)}` as keyof typeof attributeObject
        ] = translatedString(a);
      });

      if (
        v.setting_skill_query === "hover" ||
        v.setting_skill_query === "hide"
      ) {
        mySetAttrs(
          {
            attribute_query: `${queryPrefix}${[
              attrQueries[0],
              ...attrQueries.slice(1),
            ].join("|")}}`,
            ...attributeObject,
          },
          v
        );
      } else if (v.setting_skill_query === "query") {
        mySetAttrs(
          {
            attribute_query: `${queryPrefix}${[
              attrQueries[0],
              ...attrQueries.slice(1),
            ].join("|")}}`,
            attribute_query_str: `${queryPrefix}${[
              attrQueries[0],
              ...attrQueries.slice(1),
            ].join("|")}}`,
            attribute_query_dex: `${queryPrefix}${[
              attrQueries[1],
              attrQueries[0],
              ...attrQueries.slice(2),
            ].join("|")}}`,
            attribute_query_con: `${queryPrefix}${[
              attrQueries[2],
              ...attrQueries.slice(0, 2),
              ...attrQueries.slice(3),
            ].join("|")}}`,
            attribute_query_int: `${queryPrefix}${[
              attrQueries[3],
              ...attrQueries.slice(0, 3),
              ...attrQueries.slice(4),
            ].join("|")}}`,
            attribute_query_wis: `${queryPrefix}${[
              attrQueries[4],
              ...attrQueries.slice(0, 4),
              ...attrQueries.slice(5),
            ].join("|")}}`,
            attribute_query_cha: `${queryPrefix}${[
              attrQueries[5],
              ...attrQueries.slice(0, 5),
            ].join("|")}}`,
          },
          v
        );
      }
    }
  );
};
const handleModifierQuery = () => {
  getAttrs(["modifier_query", "setting_modifier_query"], (v) => {
    if (`${v.setting_modifier_query}` === "1") {
      mySetAttrs(
        {
          modifier_query: `+ ?{${translate("MODIFIER")}|0}[${translate(
            "MOD"
          )}]`,
        },
        v
      );
    } else
      mySetAttrs(
        {
          modifier_query: " ",
        },
        v
      );
  });
};
const setTranslatedQueries = () => {
  getAttrs(
    [
      "burst_query",
      "extra_hp_query",
      "translation_numdice",
      "proficient_query",
      "skill_name_query",
    ],
    (v) => {
      const setting = {
        burst_query:
          `?{${translate("BURST")}|${translate("YES")},+ 2[${translate(
            "BURST"
          )}]|${translate("NO")},&` +
          "#" +
          "32;}",
        extra_hp_query: `?{${translate("EXTRA_HP_QUERY")}|0}[${translate(
          "BONUS"
        )}]`,
        proficient_query: `?{${translate("PROFICIENT")}|${translate(
          "YES"
        )}, @{npc_skills}|${translate("NO")}, 0}[${translate("SKILL")}]`,
        skill_name_query: `?{${translate("SKILL_NAME")}|${translate("SKILL")}}`,
        translation_numdice: translate("NUMBER_OF_DICE"),
      };
      mySetAttrs(setting, v);
    }
  );
};
