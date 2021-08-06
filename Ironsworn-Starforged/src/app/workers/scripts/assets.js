on('change:repeating_assets:assettype', function(values) {
  setAttrs({
      ['repeating_assets_Asset' + values.previousValue]: 'off',
      ['repeating_assets_Asset' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:asset', function(values) {
  setAttrs({
      ['repeating_assets_' + values.previousValue]: 'off',
      ['repeating_assets_' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:builder-titles', function(values) {
  setAttrs({
      ['repeating_assets_builder-titles-' + values.previousValue]: 'off',
      ['repeating_assets_builder-titles-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:builder-ability-1', function(values) {
  setAttrs({
      ['repeating_assets_builder-ability-1-' + values.previousValue]: 'off',
      ['repeating_assets_builder-ability-1-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:builder-ability-2', function(values) {
  setAttrs({
      ['repeating_assets_builder-ability-2-' + values.previousValue]: 'off',
      ['repeating_assets_builder-ability-2-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:builder-ability-3', function(values) {
  setAttrs({
      ['repeating_assets_builder-ability-3-' + values.previousValue]: 'off',
      ['repeating_assets_builder-ability-3-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:track-dropdown', function(values) {
  setAttrs({
      ['repeating_assets_track-dropdown-' + values.previousValue]: 'off',
      ['repeating_assets_track-dropdown-' + values.newValue]: 'on'
  });
});
