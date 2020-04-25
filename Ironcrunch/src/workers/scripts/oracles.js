on('change:oracle_core_button', function(eventinfo) {
  setAttrs({
    oracle_core: eventinfo.newValue,
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