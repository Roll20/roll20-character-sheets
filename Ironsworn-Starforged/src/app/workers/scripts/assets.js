on('change:repeating_assets-final:assettype', function(values) {
  setAttrs({
    ['repeating_assets-final_Asset' + values.previousValue]: 'off',
    ['repeating_assets-final_Asset' + values.newValue]: 'on'
  });
});

on('change:repeating_assets-final:asset', function(values) {
  setAttrs({
    ['repeating_assets-final_' + values.previousValue]: 'off',
    ['repeating_assets-final_' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets-final:assettype', function(values) {
  setAttrs({
    ['repeating_module-assets-final_Asset' + values.previousValue]: 'off',
    ['repeating_module-assets-final_Asset' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets-final:asset', function(values) {
  setAttrs({
    ['repeating_module-assets-final_' + values.previousValue]: 'off',
    ['repeating_module-assets-final_' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets-final:assettype', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets-final_Asset' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets-final_Asset' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets-final:asset', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets-final_' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets-final_' + values.newValue]: 'on'
  });
});

on('change:repeating_assets-final:builder-titles', function(values) {
  setAttrs({
    ['repeating_assets-final_builder-titles-' + values.previousValue]: 'off',
    ['repeating_assets-final_builder-titles-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets-final:builder-ability-1', function(values) {
  setAttrs({
    ['repeating_assets-final_builder-ability-1-' + values.previousValue]: 'off',
    ['repeating_assets-final_builder-ability-1-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets-final:builder-ability-2', function(values) {
  setAttrs({
    ['repeating_assets-final_builder-ability-2-' + values.previousValue]: 'off',
    ['repeating_assets-final_builder-ability-2-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets-final:builder-ability-3', function(values) {
  setAttrs({
    ['repeating_assets-final_builder-ability-3-' + values.previousValue]: 'off',
    ['repeating_assets-final_builder-ability-3-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets-final:track-dropdown', function(values) {
  setAttrs({
    ['repeating_assets-final_track-dropdown-' + values.previousValue]: 'off',
    ['repeating_assets-final_track-dropdown-' + values.newValue]: 'on'
  });
});

// Custom Ship Assets

on('change:repeating_support-vehicle-assets-final:builder-titles', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets-final_builder-titles-' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets-final_builder-titles-' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets-final:builder-ability-1', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets-final_builder-ability-1-' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets-final_builder-ability-1-' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets-final:builder-ability-2', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets-final_builder-ability-2-' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets-final_builder-ability-2-' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets-final:builder-ability-3', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets-final_builder-ability-3-' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets-final_builder-ability-3-' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets-final:track-dropdown', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets-final_track-dropdown-' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets-final_track-dropdown-' + values.newValue]: 'on'
  });
});

// Custom Module Assets

on('change:repeating_module-assets-final:builder-titles', function(values) {
  setAttrs({
    ['repeating_module-assets-final_builder-titles-' + values.previousValue]: 'off',
    ['repeating_module-assets-final_builder-titles-' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets-final:builder-ability-1', function(values) {
  setAttrs({
    ['repeating_module-assets-final_builder-ability-1-' + values.previousValue]: 'off',
    ['repeating_module-assets-final_builder-ability-1-' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets-final:builder-ability-2', function(values) {
  setAttrs({
    ['repeating_module-assets-final_builder-ability-2-' + values.previousValue]: 'off',
    ['repeating_module-assets-final_builder-ability-2-' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets-final:builder-ability-3', function(values) {
  setAttrs({
    ['repeating_module-assets-final_builder-ability-3-' + values.previousValue]: 'off',
    ['repeating_module-assets-final_builder-ability-3-' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets-final:track-dropdown', function(values) {
  setAttrs({
    ['repeating_module-assets-final_track-dropdown-' + values.previousValue]: 'off',
    ['repeating_module-assets-final_track-dropdown-' + values.newValue]: 'on'
  });
});
