on('change:character_page_button', function(eventinfo) {
  setAttrs({
    character_page: eventinfo.newValue
  });
});

on('change:companion_page_button', function(eventinfo) {
  setAttrs({
    companion_page: eventinfo.newValue
  });
});

on('change:shared_page_button', function(eventinfo) {
  setAttrs({
    shared_page: eventinfo.newValue
  });
});

on('change:mode_button', function(eventinfo) {
  setAttrs({
    mode: eventinfo.newValue,
    modes_choice: 'off'
  });
});

on('change:stat_mode_button', function(eventinfo) {
  setAttrs({
    stat_mode: eventinfo.newValue,
  });
});

on('change:repeating_bonds:details_button', function(eventinfo) {
  setAttrs({
    repeating_bonds_details: eventinfo.newValue,
  });
});