on('change:repeating_bonds:details_button', function(eventinfo) {
  setAttrs({
    repeating_bonds_details: eventinfo.newValue,
  });
});
