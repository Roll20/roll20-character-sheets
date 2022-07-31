on('change:repeating_connection:details_button', function(eventinfo) {
  setAttrs({
    repeating_connection_details: eventinfo.newValue,
  });
});
