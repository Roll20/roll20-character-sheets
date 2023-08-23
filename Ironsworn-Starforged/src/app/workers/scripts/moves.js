on('change:selected_move', function(eventinfo) {
  if (eventinfo.newValue !== 'none') {
    setAttrs({
      move_view: '2',
      move_preview: eventinfo.newValue
    });
  }
});

on('change:close_move_preview', function() {
  setAttrs({
    move_view: '1',
    selected_move: 'none'
  });
});
