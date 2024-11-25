// Handle conditions that affect other rolls
for (const condition of CONDITIONS) {
  on(`change:${condition.name} change:${condition.name}_level`, (eventInfo) => {
    getAttrs(CONDITIONS_REQUEST, (attributes) => {
      const state = attributes[condition.name];
      const level = state === "on" ? Number(attributes[`${condition.name}_level`]) : 0;

      switch (condition.name) {
        case "fatigued":
          setAttrs({ hp_mod: -1 * level }, { silent: true });
          break;

        default:
          break;
      }
    });
  });
}

// Handle attributes with an underscore_max attribute
for (const field of MAX_FIELDS) {
  on(`change:${field}`, (eventInfo) => {
    if (eventInfo.sourceType !== "player") return;

    getAttrs([field, `${field}_max`, `${field}_mod`], (attributes) => {
      const current = Number(attributes[field]);
      const max = Number(attributes[`${field}_max`]);
      const mod = Number(attributes[`${field}_mod`]) || 0;

      if (current > max + mod) {
        setAttrs({ [field]: max + mod }, { silent: true });
      }
    });
  });
}
