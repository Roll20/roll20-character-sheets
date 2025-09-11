["attacks", "spells", "reactive-actions"].forEach((fieldset) => {
  on(`change:repeating_${fieldset}`, (event) => {
    updateLinkedAttribute(event);
  });

  on(`remove:repeating_${fieldset}`, ({ sourceAttribute, removedInfo }) => {
    const link = removedInfo[`${sourceAttribute}_link`];

    if (link) {
      const update = { [`${link}_link`]: "" };
      setAttrs(update, { silent: true });
    }
  });
});

["attacks", "skills"].forEach((fieldset) => {
  on(`change:repeating_${fieldset}:attribute`, (event) => {
    const { sourceAttribute, newValue } = event;
    const repeatingRow = getFieldsetRow(sourceAttribute);

    // Attribute will be @{...}. Remove the @{}
    const abbreviation = getAttributeAbbreviation(newValue);

    setAttrs({ [`${repeatingRow}_attribute_abbreviation`]: abbreviation });
  });
});

["attacks", "inventory"].forEach((fieldset) => {
  on(`change:repeating_${fieldset}:name`, (event) => {
    updateLinkedAttribute(event);
  });
});

["abilities", "favorites", "talents"].forEach((fieldset) => {
  ["name", "tags", "description", "ap"].forEach((attr) => {
    on(`change:repeating_${fieldset}:${attr}`, (event) => {
      updateLinkedAttribute(event);
    });
  });

  on(`change:repeating_${fieldset}:toggle_favorite`, (event) => {
    const { sourceAttribute, newValue } = event;
    const abilitiesRow = getFieldsetRow(sourceAttribute);
    const isFavorite = newValue === "true";

    if (isFavorite) {
      getAttrs(
        [
          `${abilitiesRow}_description`,
          `${abilitiesRow}_link`,
          `${abilitiesRow}_name`,
          `${abilitiesRow}_tags`,
        ],
        (values) => {
          const favoriteRow = getRow("favorites");
          const update = {
            [`${favoriteRow}_description`]:
              values[`${abilitiesRow}_description`],
            [`${favoriteRow}_link`]: abilitiesRow,
            [`${favoriteRow}_name`]: values[`${abilitiesRow}_name`],
            [`${favoriteRow}_tags`]: values[`${abilitiesRow}_tags`],
            [`${favoriteRow}_toggle_edit`]: false,
            [`${abilitiesRow}_link`]: favoriteRow,
          };

          setAttrs(update, { silent: true });
        }
      );
    } else {
      getAttrs([`${abilitiesRow}_link`], (values) => {
        const favoriteRow = values[`${abilitiesRow}_link`];
        removeRepeatingRow(favoriteRow);
      });
    }
  });
});

action_points.forEach((attr) => {
  on(`change:${attr}`, () => {
    updateActionPointsPerRound(action_points);
  });
});

critical_attributes.forEach((attr) => {
  on(`change:${attr}`, () => {
    updateCriticalRange(critical_attributes);
  });
});

on(`change:luck`, () => {
  updateLuck(["luck"]);
});

hit_points.forEach((attr) => {
  on(`change:${attr}`, () => {
    updateHitPoints(hit_points);
  });
});

on("change:primary_source", (event) => {
  const { newValue, previousValue } = event;
  const section = "repeating_spells";

  getSectionIDs(section, (ids) => {
    const sourceMap = ids.map((id) => `${section}_${id}_source`);
    const linksMap = ids.map((id) => `${section}_${id}_link`);
    const formulasMap = ids.map((id) => `${section}_${id}_roll_formula`);

    getAttrs([...sourceMap, ...linksMap, ...formulasMap], (v) => {
      const update = {};

      formulasMap.forEach((e) => {
        //This indicates it is a spell card and primary source is irrelevant
        if (v[e] === "{{description=@{description}}}") {
          return;
        }

        const rowId = getFieldsetRow(e);
        const link = v[`${rowId}_link`];

        const source = v[`${rowId}_source`];
        const isPrimarySource = source === newValue;
        const wasPrimarySource = source === previousValue;

        if (wasPrimarySource || isPrimarySource) {
          const formula = getRollFormula(isPrimarySource);
          //@ts-expect-error doesn't like indexing with a string
          update[`${rowId}_roll_formula`] = formula;

          if (link) {
            //@ts-expect-error doesn't like indexing with a string
            update[`${link}_roll_formula`] = formula;
          }

          setAttrs(update, { silent: true });
        }
      });
    });
  });
});

on("change:repeating_spells:source", (event) => {
  const { sourceAttribute, newValue } = event;
  const repeatingRow = getFieldsetRow(sourceAttribute);

  getAttrs(["primary_source"], (values) => {
    const isPrimarySource = values.primary_source === newValue;
    setAttrs({
      [`${repeatingRow}_roll_formula`]: getRollFormula(isPrimarySource),
    });
  });
});

on("change:repeating_spells:toggle_spell_attack", (event) => {
  updateSpellRollFormula(event);
});

[
  "attacks",
  "spells",
  "abilities",
  "favorites",
  "talents",
  "reactive-actions",
].forEach((fieldset) => {
  on(`remove:repeating_${fieldset}`, ({ sourceAttribute, removedInfo }) => {
    const link = removedInfo[`${sourceAttribute}_link`];

    if (link) {
      const update = { [`${link}_link`]: "" };
      setAttrs(update, { silent: true });
    }
  });
});

on("change:repeating_actions:toggle_action_attack", (event) => {
  updateCreatureAttackRollFormula(event);
});

["skills", "features", "actions", "reactions", "spells"].forEach((section) => {
  on(`change:section_${section}`, (event) => {
    const { newValue } = event;
    getAttrs(["creature_sections"], (values) => {
      const sections = values.creature_sections
        ? values.creature_sections.split(",")
        : [];

      if (newValue === "on" && !sections.includes(section)) {
        sections.push(section);
      } else if (newValue !== "on" && sections.includes(section)) {
        const index = sections.indexOf(section);
        if (index > -1) {
          sections.splice(index, 1);
        }
      }

      console.log(sections);
      setAttrs({ creature_sections: sections.join(",") });
    });
  });
});
