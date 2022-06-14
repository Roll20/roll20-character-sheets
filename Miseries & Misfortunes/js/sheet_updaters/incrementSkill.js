function incrementSkill(eventinfo) {
  const [direction, skill] = eventinfo.sourceAttribute.split('_');
  getAttrs([skill], attributes => {
    const skill_value = parseInt(attributes[skill], 10);
    const update = {};
    const incremented_value = incrementValue();
    update[skill] = incremented_value;
    update[skill + '_tn'] = roll_step_tn[incremented_value];
    setAttrs(update, { silent: true });

    function incrementValue() {
      const new_value = direction === 'up' ? skill_value + 1 : skill_value - 1;
      const bounded_value = boundStepValue(new_value);
      return bounded_value;
    }
  });
}
