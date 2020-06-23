on('change:repeating_motivations:motivation_select', function(values) {
  setAttrs({
      ['repeating_motivations_motivation_' + values.previousValue]: 'off',
      ['repeating_motivations_motivation_' + values.newValue]: 'on'
  });
});