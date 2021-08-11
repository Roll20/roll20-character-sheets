on('change:oracle_starforged_button', function(eventinfo) {
  setAttrs({
    oracle_starforged: eventinfo.newValue,
  });
});

on('change:oracle_page_button', function(eventinfo) {
  setAttrs({
    oracle_page: eventinfo.newValue,
  });
});