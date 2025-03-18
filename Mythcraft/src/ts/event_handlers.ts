action_points.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(action_points, (values) => {
      const { coordination, action_points_base } = parseIntegers(values);
      let action_points = action_points_base;

      switch (coordination) {
        case -1:
        case -2:
          action_points = action_points_base - 1 || 0;
          break;
        case -3:
          action_points = action_points_base - 2 || 0;
          break;
        default:
          // Base Action Points + half of the Coordination attribute
          action_points = Math.ceil(coordination / 2) + action_points_base;
          break;
      }

      setAttrs({ action_points });
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
      let range = critical_range_base;

      if (luck === 12) {
        range = critical_range_base - 2;
      } else if (luck >= 6 && luck <= 11) {
        range = critical_range_base - 1;
      }

      const cr = range < 16 ? 16 : range;

      if (cr !== critical_range) {
        setAttrs({ critical_range: cr });
      }
    });
  });
});

on(`change:luck`, () => {
  getAttrs(["luck"], (values) => {
    const luck = parseInt(values.luck);
    const attrs: Attrs = {};
    //Reroll 1d20 for every 2 points of Luck
    attrs.rerolls = Math.ceil(luck / 2);

    if (luck < 0) {
      //Luck < 0 never Critically Hit and subtract LUCK from every d20 roll
      attrs.never_crit = true;
      attrs.luck_negative_modifier = luck;
    } else {
      attrs.luck_critical_modifier = luck;
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

//Calculate a simple derived attribute

//Calculate all the values of a repeating section. Useful for calculating weights, totals, etc.
// on(`change:repeating_events:weight`, ({ triggerName }) => {
//   const repeatingRow = getRepeatingRowId(triggerName);

//   getSectionIDs("events", (idArray) => {
//     let rows = [];
//     idArray.forEach((id) =>
//       rows.push(`repeating_events_${id}_weight`)
//     );

//     getAttrs(rows, (values) => {
//       const parsedNumbers = parseIntegers(values);
//       const weightValues = Object.values(parsedNumbers);
//       const sum = sumIntegers(weightValues);

//       setAttrs({
//         weight_total: sum,
//         [`${repeatingRow}_total_weight`]: sum,
//       });
//     });
//   });
// });
