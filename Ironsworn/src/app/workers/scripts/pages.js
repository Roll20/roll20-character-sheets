on('change:character_page_button', function(eventinfo) {
  setAttrs({
    character_page: eventinfo.newValue
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

on('change:close_changelog', function() {
  setAttrs({
    'changelog_2.3.0': 'on',
  });
});
