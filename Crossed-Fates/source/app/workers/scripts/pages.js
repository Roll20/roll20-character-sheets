
on('change:page_button', function(eventinfo) {
  setAttrs({
    page: eventinfo.newValue
  });
  console.log({page: eventinfo.newValue});
});

on('change:act_page_button', function(eventinfo) {
  setAttrs({
    act_page: eventinfo.newValue
  });
  console.log({act_page: eventinfo.newValue});
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

on('change:left_side change:right_side', function(eventinfo) {
  setAttrs({
    character_name: eventinfo.newValue,
  });
});

// update character sheet name
on('sheet:opened change:left_side change:right_side', function() {
  getAttrs(['left_side', 'right_side'], function(values) {
    const name = values.left_side + ' × ' + values.right_side;
    updateAttrs = { character_name: name };
    setAttrs(updateAttrs);
    console.log(updateAttrs);
  });
});
