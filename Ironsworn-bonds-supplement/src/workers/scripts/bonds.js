//- BONDS PAGE
on('change:relationships_button', function(eventinfo) {
  if (eventinfo.newValue == 'on') {
    setAttrs({
      relationships: eventinfo.newValue,
      communities: 'off',
      communities_button: 'off'
    });
  } else {
    setAttrs({
      relationships: eventinfo.newValue,
    });
  }
});

on('change:communities_button', function(eventinfo) {
  if (eventinfo.newValue == 'on') {
    setAttrs({
      communities: eventinfo.newValue,
      relationships: 'off',
      relationships_button: 'off'
    });
  } else {
    setAttrs({
      communities: eventinfo.newValue,
    });
  }
});

//- RELATIONSHIP SUB-PAGE
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
  setAttrs({
    repeating_bonds_flip_0: eventinfo.newValue,
    repeating_bonds_test_var: eventinfo.newValue
  });
});

on('change:repeating_bonds:flip_button_1', function(eventinfo) {
  setAttrs({
    repeating_bonds_flip_1: eventinfo.newValue
  });
});

on('change:repeating_bonds:flip_button_2', function(eventinfo) {
  setAttrs({
    repeating_bonds_flip_2: eventinfo.newValue
  });
});

//- COMMUNITY SUB-PAGE
on('change:repeating_community:details_button', function(eventinfo) {
  if (eventinfo.newValue == 'on') {
    setAttrs({
      repeating_community_details: eventinfo.newValue,
      repeating_community_reputation: 'off',
      repeating_community_reputation_button: 'off'
    });
  } else {
    setAttrs({
      repeating_community_details: eventinfo.newValue,
    });
  }
});

on('change:repeating_community:reputation_button', function(eventinfo) {
  if (eventinfo.newValue == 'on') {
    setAttrs({
      repeating_community_reputation: eventinfo.newValue,
      repeating_community_details: 'off',
      repeating_community_details_button: 'off'
    });
  } else {
    setAttrs({
      repeating_community_reputation: eventinfo.newValue,
    });
  }
});

//- ASSETS SUB-PAGE
on('change:repeating_assets:assetDropdownBonds', function(values) {
  setAttrs({
      ['repeating_assets_AssetBondsDiv' + values.previousValue]: 'off',
      ['repeating_assets_AssetBondsDiv' + values.newValue]: 'on'
  });
});