on('remove:repeating_vow remove:repeating_bonds remove:repeating_progress remove:repeating_sites remove:repeating_assets', function() { 
  const timestamp = Number(new Date())
  setAttrs({ repeat_delete: timestamp });
});

on('change:repeating_vow:menace-show-button', function(eventinfo) {
  setAttrs({
    'repeating_vow_menace-show': eventinfo.newValue  
  });
});