const updateHitPoints = (attributes: Attributes) => {
  getAttrs(attributes, (values) => {
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
};
