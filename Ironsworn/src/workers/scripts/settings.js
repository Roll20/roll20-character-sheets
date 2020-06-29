on('change:settingSites', function(eventinfo) {
  setAttrs({
    'optional_move_sites': eventinfo.newValue,
    'optional_nav_sites': eventinfo.newValue
  });
});

on('change:settingFailures', function(eventinfo) {
  setAttrs({
    'optional_track_failures': eventinfo.newValue,
    'optional_move_failures': eventinfo.newValue
  });
});

on('change:settingRarities', function(eventinfo) {
  setAttrs({
    'optional_move_rarity': eventinfo.newValue
  });
});

on('change:settingThreat', function(eventinfo) {
  setAttrs({
    'optional_move_threat': eventinfo.newValue,
    'optional_vow_threat_1': eventinfo.newValue,
    'optional_vow_threat_2': eventinfo.newValue,
    'optional_vow_threat_3': eventinfo.newValue,
    'optional_vow_threat_4': eventinfo.newValue,
    'optional_vow_threat_5': eventinfo.newValue
  });
});