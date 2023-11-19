function activateRollModal(sourceAttribute) {
  const attribute = getTrimmedAttribute(sourceAttribute);
  const roll_data = roll_table[attribute];

  const update = { show_roll_modal: 1 };
  update.roll_name = roll_data.name ? roll_data.name : attribute.toUpperCase();
  update[sourceAttribute] = 0;
  update.roll_mod = 0;
  update.roll_type = roll_data.type;

  if (roll_data.type === 'd20') {
    getAttrs([attribute], attributes => {
      update.roll_die = 'd20';
      update.roll_die_base = 'd20';
      update.roll_tn = attributes[attribute];
      update.roll_tn_base = attributes[attribute];
      update.roll_tn_display = attributes[attribute];
      update.roll_final =
        '&{template:skill} {{roll=[[@{roll_die}]]}} {{roll_tn=[[@{roll_tn_display}]]}} {{mod=[[@{roll_mod}]]}} {{die_type=@{roll_die}}} {{roll_name=@{roll_name}}} {{character_name=@{character_name}}}';
      setAttrs(update, { silent: true });
    });
  } else if (roll_data.type === 'skill') {
    getAttrs([attribute], attributes => {
      const attribute_value = attributes[attribute];
      update.roll_die = roll_step_die[attribute_value];
      update.roll_die_base = roll_step_die[attribute_value];
      update.roll_tn = roll_step_tn[attribute_value];
      update.roll_tn_base = roll_step_tn[attribute_value];
      update.roll_tn_display = roll_step_tn[attribute_value];
      update.roll_final =
        '&{template:skill} {{roll=[[@{roll_die}]]}} {{roll_tn=[[@{roll_tn_display}]]}} {{mod=[[@{roll_mod}]]}} {{die_type=@{roll_die}}} {{roll_name=@{roll_name}}} {{character_name=@{character_name}}}';
      setAttrs(update, { silent: true });
    });
  } else if (roll_data.type === 'save') {
    getAttrs([attribute], attributes => {
      update.roll_die = 'd20';
      update.roll_die_base = 'd20';
      update.roll_tn = attributes[attribute];
      update.roll_tn_base = attributes[attribute];
      update.roll_tn_display = attributes[attribute];
      update.roll_final =
        '&{template:save} {{roll=[[@{roll_die}+@{roll_mod}[MOD]]]}} {{roll_tn=[[@{roll_tn_display}]]}} {{mod=[[@{roll_mod}]]}} {{die_type=@{roll_die}}} {{roll_name=@{roll_name}}} {{character_name=@{character_name}}}';
      setAttrs(update, { silent: true });
    });
  } else {
    console.log('ERROR: ROLL MODAL SKILL DATA NOT FOUND');
  }

  return true;
}

function closeRollModal() {
  const update = {
    show_roll_modal: 0,
    roll_mod: 0,
  };
  setAttrs(update, { silent: true });
}

function activateRepeatingRollModal(sourceAttribute) {
  const source_array = sourceAttribute.split('_');
  const base = [source_array[0], source_array[1], source_array[2]].join('_');
  const update = { show_roll_modal: 1, roll_type: 'skill' };
  update[sourceAttribute] = 0;
  update.roll_mod = 0;

  getAttrs([base + '_skill_name', base + '_skill'], attributes => {
    const value = attributes[base + '_skill'];
    update.roll_name = attributes[base + '_skill_name'].toUpperCase();
    update.roll_die = roll_step_die[value];
    update.roll_die_base = roll_step_die[value];
    update.roll_tn = roll_step_tn[value];
    update.roll_tn_base = roll_step_tn[value];
    update.roll_tn_display = roll_step_tn[value];
    update.roll_final =
      '&{template:skill} {{roll=[[@{roll_die}]]}} {{roll_tn=[[@{roll_tn_display}]]}} {{mod=[[@{roll_mod}]]}} {{die_type=@{roll_die}}} {{roll_name=@{roll_name}}} {{character_name=@{character_name}}}';
    setAttrs(update, { silent: true });

    return true;
  });

  return true;
}

function updateRollModal() {
  getAttrs(['roll_tn_base', 'roll_type', 'roll_mod', 'roll_die_base', 'tn_mod'], attributes => {
    const { roll_tn_base, roll_type, roll_mod, roll_die_base, tn_mod } = attributes;
    const update = {};
    const tn = parseInt(roll_tn_base, 10);
    const mod = parseInt(roll_mod, 10) || 0;
    const tn_modifier = parseInt(tn_mod, 10) || 0;
    if (roll_type === 'd20') {
      const updated_tn = tn + mod;
      update.roll_tn_display = updated_tn;
    } else if (roll_type === 'skill') {
      const step = convert_tn_to_step(tn, roll_die_base);
      const bounded_step = boundStepValue(step + mod);
      update.roll_tn_display = roll_step_tn[bounded_step] + tn_modifier;
      update.roll_die = roll_step_die[bounded_step];
    }
    setAttrs(update, { silent: true });
    return true;
  });
}

function convert_tn_to_step(tn, die) {
  if (tn === 1 && die === 'd10') {
    return 0;
  }
  if (tn === 7) {
    return 6;
  }
  if (tn === 9) {
    return 7;
  }
  if (tn === 11) {
    return 8;
  }
  if (tn === 19) {
    return 9;
  }
  return tn;
}
