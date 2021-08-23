on('change:ship-modules_button change:ship-support-vehicles_button change:ship-crew_button change:ship-impacts_button', function(eventinfo) {
  const type = eventinfo.sourceAttribute.match(/(.*?)_button/)[1]
  setAttrs({
    [`${type}`]: eventinfo.newValue
  });
});