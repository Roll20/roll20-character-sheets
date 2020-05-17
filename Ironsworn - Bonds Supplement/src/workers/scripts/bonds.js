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