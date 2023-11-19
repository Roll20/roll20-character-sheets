on('change:repeating_assets:assettype', function(values) {
  setAttrs({
      ['repeating_assets_Asset' + values.previousValue]: 'off',
      ['repeating_assets_Asset' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:assetDropdownCompanion', function(values) {
  setAttrs({
      ['repeating_assets_AssetCompanionDiv' + values.previousValue]: 'off',
      ['repeating_assets_AssetCompanionDiv' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:assetDropdownPath', function(values) {
  setAttrs({
      ['repeating_assets_AssetPathDiv' + values.previousValue]: 'off',
      ['repeating_assets_AssetPathDiv' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:assetDropdownCombatTalent', function(values) {
  setAttrs({
      ['repeating_assets_AssetCombatTalentDiv' + values.previousValue]: 'off',
      ['repeating_assets_AssetCombatTalentDiv' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:assetDropdownRitual', function(values) {
  setAttrs({
      ['repeating_assets_AssetRitualDiv' + values.previousValue]: 'off',
      ['repeating_assets_AssetRitualDiv' + values.newValue]: 'on'
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
