action_points.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(action_points, (values) => {
      const { coordination, action_points_base } = parseIntegers(values);
      let action_points_per_round = action_points_base;

      switch (coordination) {
        case -1:
        case -2:
          action_points_per_round = action_points_base - 1 || 0;
          break;
        case -3:
          action_points_per_round = action_points_base - 2 || 0;
          break;
        default:
          // Action Points Per Round + half of the Coordination attribute
          action_points_per_round =
            Math.ceil(coordination / 2) + action_points_base;
          break;
      }

      setAttrs({ action_points_per_round });
    });
  });
});

hit_points.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(hit_points, (values) => {
      const { endurance, hit_points_base, level } = parseIntegers(values);

      let die_pips = 0;
      let set_hit_points = 0;

      if (endurance >= -2 && endurance <= 12) {
        if (endurance === -3) {
          die_pips = 0;
          set_hit_points = 0;
        } else if (endurance >= -2 && endurance <= -1) {
          die_pips = 2;
          set_hit_points = 1;
        } else if (endurance >= 0 && endurance <= 2) {
          die_pips = 4;
          set_hit_points = 2;
        } else if (endurance >= 3 && endurance <= 5) {
          die_pips = 6;
          set_hit_points = 3;
        } else if (endurance >= 6 && endurance <= 8) {
          die_pips = 8;
          set_hit_points = 4;
        } else if (endurance >= 9 && endurance <= 11) {
          die_pips = 10;
          set_hit_points = 5;
        } else if (endurance >= 12) {
          die_pips = 12;
          set_hit_points = 6;
        }
      }

      // 10+(level)d(X) + level;
      const hit_point_die = die_pips ? `${level}d${die_pips}` : 0;
      const hit_die_formula = `${hit_points_base}+${hit_point_die}+${level}`;

      setAttrs({ hit_point_die, hit_die_formula, set_hit_points });
    });
  });
});

critical_range.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(critical_range, (values) => {
      const { luck, critical_range_base, critical_range } =
        parseIntegers(values);

      if (luck < 0) {
        //Luck < 0 never Critically Hit
        setAttrs({
          critical_range: 0, // Reset to default
        });
        return;
      }

      let range = critical_range_base;

      if (luck >= 12) {
        range = critical_range_base - 2;
      } else if (luck >= 6 && luck <= 11) {
        range = critical_range_base - 1;
      }

      const cr = range < 16 ? 16 : range;

      if (cr !== critical_range) {
        setAttrs({
          critical_range: cr,
        });
      }
    });
  });
});

on(`change:luck`, () => {
  getAttrs(["luck"], (values) => {
    const luck = parseInt(values.luck);
    const attrs: Attrs = {};
    //Reroll 1d20 for every 2 points of Luck
    attrs.rerolls_max = Math.ceil(luck / 2) || 0;

    if (luck < 0) {
      //Luck < 0 never Critically Hit and subtract LUCK from every d20 roll
      attrs.luck_negative_modifier = luck;
    } else {
      attrs.luck_negative_modifier = 0;
    }

    setAttrs(attrs);
  });
});

[anticipation, fortitude, logic, reflexes, willpower].forEach(
  (scoreAttributes) => {
    scoreAttributes.forEach((attr) => {
      on(`change:${attr}`, () => {
        getAttrs(scoreAttributes, (values) => {
          const sum = sumIntegers(Object.values(parseIntegers(values)));
          const name = scoreAttributes
            .find((e) => e.includes("base"))
            .replace("_base", "");
          setAttrs({ [name]: sum });
        });
      });
    });
  }
);

on("change:repeating_skills:attribute", (event) => {
  const { sourceAttribute, newValue } = event;
  const repeatingRow = getFieldsetRow(sourceAttribute);

  // Attribute will be @{...}. Remove the @{}
  const attribute = newValue.substring(2, newValue.length - 1);
  const abbreviation = getAttributeAbbreviation(attribute);

  setAttrs({ [`${repeatingRow}_attribute_abbreviation`]: abbreviation });
});

const favoriteAttributes = ["name", "tags", "description"];

["abilities", "favorites", "talents"].forEach((fieldset) => {
  favoriteAttributes.forEach((attr) => {
    on(`change:repeating_${fieldset}:${attr}`, (event) => {
      const { newValue } = event;

      getAttrs([`repeating_${fieldset}_link`], (values) => {
        const favoriteRow = values[`repeating_${fieldset}_link`];
        if (favoriteRow) {
          const update: Attrs = {
            [`${favoriteRow}_${attr}`]: newValue,
          };
          setAttrs(update, { silent: true });
        }
      });
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

["attacks", "inventory"].forEach((fieldset) => {
  on(`change:repeating_${fieldset}:name`, (event) => {
    const { newValue } = event;
    getAttrs([`repeating_${fieldset}_link`], (values) => {
      const row = values[`repeating_${fieldset}_link`];
      if (row) {
        const update: Attrs = {
          [`${row}_name`]: newValue,
        };
        setAttrs(update, { silent: true });
      }
    });
  });
});
