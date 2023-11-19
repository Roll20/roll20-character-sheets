function incrementRepeatingSkill(eventinfo) {
  const source_array = eventinfo.sourceAttribute.split('_');
  const direction = source_array[3];
  const base = [source_array[0], source_array[1], source_array[2]].join('_');

  getAttrs([base + '_skill'], attributes => {
    const skill_value = parseInt(attributes[base + '_skill'], 10);
    const update = {};
    const incremented_value = incrementValue();
    update[base + '_skill'] = incremented_value;
    update[base + '_skill_tn'] = roll_step_tn[incremented_value];
    setAttrs(update, { silent: true });

    return true;

    function incrementValue() {
      const new_value = direction === 'up' ? skill_value + 1 : skill_value - 1;
      const bounded_value = boundStepValue(new_value);
      return bounded_value;
    }
  });

  return true;
}
