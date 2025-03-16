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

on('change:repeating_module-assets:assettype', function(values) {
  setAttrs({
    ['repeating_module-assets_Asset' + values.previousValue]: 'off',
    ['repeating_module-assets_Asset' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets:asset', function(values) {
  setAttrs({
    ['repeating_module-assets_' + values.previousValue]: 'off',
    ['repeating_module-assets_' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets:assettype', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets_Asset' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets_Asset' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets:asset', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets_' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets_' + values.newValue]: 'on'
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

// Custom Ship Assets

on('change:repeating_support-vehicle-assets:builder-titles', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets_builder-titles-' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets_builder-titles-' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets:builder-ability-1', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets_builder-ability-1-' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets_builder-ability-1-' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets:builder-ability-2', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets_builder-ability-2-' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets_builder-ability-2-' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets:builder-ability-3', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets_builder-ability-3-' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets_builder-ability-3-' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets:track-dropdown', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets_track-dropdown-' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets_track-dropdown-' + values.newValue]: 'on'
  });
});

// Custom Module Assets

on('change:repeating_module-assets:builder-titles', function(values) {
  setAttrs({
    ['repeating_module-assets_builder-titles-' + values.previousValue]: 'off',
    ['repeating_module-assets_builder-titles-' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets:builder-ability-1', function(values) {
  setAttrs({
    ['repeating_module-assets_builder-ability-1-' + values.previousValue]: 'off',
    ['repeating_module-assets_builder-ability-1-' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets:builder-ability-2', function(values) {
  setAttrs({
    ['repeating_module-assets_builder-ability-2-' + values.previousValue]: 'off',
    ['repeating_module-assets_builder-ability-2-' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets:builder-ability-3', function(values) {
  setAttrs({
    ['repeating_module-assets_builder-ability-3-' + values.previousValue]: 'off',
    ['repeating_module-assets_builder-ability-3-' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets:track-dropdown', function(values) {
  setAttrs({
    ['repeating_module-assets_track-dropdown-' + values.previousValue]: 'off',
    ['repeating_module-assets_track-dropdown-' + values.newValue]: 'on'
  });
});

// Legacy Asset Button

on('change:legacy_assets_toggle_button', function(values) {
  setAttrs({
    showhide_legacy_assets: values.newValue,
  });
});

on('change:hide_legacy_assets_button', function() {
  setAttrs({
    hide_legacy_assets_button_box: 'off'
  });
});

// Legacy Asset Helpers / Changelog
const versionNumber = '2.0.0'

on('change:close_changelog', function() {
  setAttrs({
    [`changelog_${versionNumber}`]: 'on',
  });
});

on('sheet:opened', function() {
  checkIfLegacyAssetsExistAndEnable('assets')
});

function checkIfLegacyAssetsExistAndEnable(section) {
  const formattedBoxAttr = `hide_legacy_${section.replace('-', '_')}_button_box`
  const formattedShowHideAttr = `showhide_legacy_${section.replace('-', '_')}`
  getAttrs([formattedBoxAttr, `changelog_${versionNumber}`], function(values) {
    if(values[formattedBoxAttr] !== 'off') {
      getSectionIDs(section, function(idarray) {
        if(idarray.length > 0) {
          if(values[`changelog_${versionNumber}`] === 'on') { 
            setAttrs({
              [formattedBoxAttr]: 'on',
              [formattedShowHideAttr]: 'on'
            })
          } else {
            setAttrs({
              [formattedBoxAttr]: 'on',
              [formattedShowHideAttr]: 'on',
              'changelog_2.0.0': 'off'
            })
          }
        } else {
          setAttrs({
            [formattedBoxAttr]: 'off',
            [formattedShowHideAttr]: 'off',
            'changelog_2.0.0': 'on'
          })
        }
      })
    }
  })
}