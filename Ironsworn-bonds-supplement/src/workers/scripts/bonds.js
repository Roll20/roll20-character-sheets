on('change:repeating_bonds:details_button', function(eventinfo) {
  if (eventinfo.newValue == 'on') {
    setAttrs({
      repeating_bonds_details: eventinfo.newValue,
      repeating_bonds_links: 'off',
      repeating_bonds_links_button: 'off'
    });
  } else {
    setAttrs({
      repeating_bonds_details: eventinfo.newValue,
    });
  }
});

on('change:repeating_bonds:links_button', function(eventinfo) {
  if (eventinfo.newValue == 'on') {
    setAttrs({
      repeating_bonds_links: eventinfo.newValue,
      repeating_bonds_details: 'off',
      repeating_bonds_details_button: 'off'
    });
  } else {
    setAttrs({
      repeating_bonds_links: eventinfo.newValue,
    });
  }
});

on('change:repeating_bonds:flip_button_0', function(eventinfo) {
  console.log(`0 ${eventinfo.newValue}`)
  setAttrs({
    repeating_bonds_flip_0: eventinfo.newValue,
    repeating_bonds_test_var: eventinfo.newValue
  });
});

on('change:repeating_bonds:flip_button_1', function(eventinfo) {
  console.log(`1 ${eventinfo.newValue}`)
  setAttrs({
    repeating_bonds_flip_1: eventinfo.newValue
  });
});

on('change:repeating_bonds:flip_button_2', function(eventinfo) {
  console.log(`2 ${eventinfo.newValue}`)
  setAttrs({
    repeating_bonds_flip_2: eventinfo.newValue
  });
});

on('change:repeating_assets:assetDropdownBonds', function(values) {
  setAttrs({
      ['repeating_assets_AssetBondsDiv' + values.previousValue]: 'off',
      ['repeating_assets_AssetBondsDiv' + values.newValue]: 'on'
  });
});