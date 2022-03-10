on('sheet:opened', () => {
  getAttrs(['dark_mode'], (values) => {
    if (values.dark_mode === 'on') {
      $20('.charsheet').addClass('dark-mode');
    } else {
      $20('.charsheet').addClass('light-mode');
    }
  })
})

on('change:dark_mode', (eventinfo) => {
  if (eventinfo.newValue === 'on') {
    $20('.charsheet').addClass('dark-mode');
    $20('.charsheet').removeClass('light-mode');
  } else {
    $20('.charsheet').removeClass('dark-mode');
    $20('.charsheet').addClass('light-mode');
  }
})