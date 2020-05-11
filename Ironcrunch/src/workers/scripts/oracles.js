on('change:oracle_ironsworn_button', function(eventinfo) {
  setAttrs({
    oracle_ironsworn: eventinfo.newValue,
  });
});

on('change:oracle_ironcrunch_button', function(eventinfo) {
  setAttrs({
    oracle_ironcrunch: eventinfo.newValue,
  });
});


on('change:oracle_delve_button', function(eventinfo) {
  setAttrs({
    oracle_delve: eventinfo.newValue,
  });
});

on('change:oracle_page_button', function(eventinfo) {
  setAttrs({
    oracle_page: eventinfo.newValue,
  });
});