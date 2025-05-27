const dropWarning = (v: string) => {
  console.log(
    `%c Compendium Drop Error: ${v}`,
    "color: orange; font-weight:bold"
  );
};

const dropAttrs = ["drop_name", "drop_data", "drop_content"];

const handle_drop = () => {
  getAttrs(dropAttrs, (v) => {
    if (!v.drop_name || !v.drop_data) {
      return;
    }

    const page: CompendiumAttributes = {
      name: v.drop_name,
      data: parseJSON(v.drop_data) ?? v.drop_data,
      content: v.drop_content,
    };

    const { Category } = page.data;

    switch (Category) {
      case "Creatures":
      // resetRepeatingRows(repeatingSections);
      // resetSkillList(page.data.skills);
      case "Conditions":
        handle_conditions(page);
        break;
      case "Backgrounds":
      case "Professions":
        handle_bop(page);
        break;
      case "Equipment":
        handle_equipment(page);
        break;
      case "Features":
        handle_feature(page);
        break;
      case "Lineages":
        handle_lineage(page);
      case "Skills":
        handle_skills(page);
        break;
      case "Spells":
        handle_spell(page);
        break;
      case "Talents":
        handle_talent(page);
        break;
      default:
        dropWarning(`Unknown category: ${Category}`);
    }

    setDropAttrs({
      drop_name: "",
      drop_data: "",
      drop_content: "",
      drop_category: "",
    });
  });
};

["data"].forEach((attr) => {
  on(`change:drop_${attr}`, () => {
    handle_drop();
  });
});
