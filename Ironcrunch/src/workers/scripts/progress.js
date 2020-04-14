on('change:repeating_vow:mark_progress', function() {
  let vow
  let vow_rank
  getAttrs([
    "repeating_vow_vow_rank",
    'repeating_vow_vow-0',
    'repeating_vow_vow-1',
    'repeating_vow_vow-2',
    'repeating_vow_vow-3',
    'repeating_vow_vow-4',
    'repeating_vow_vow-5',
    'repeating_vow_vow-6',
    'repeating_vow_vow-7',
    'repeating_vow_vow-8',
    'repeating_vow_vow-9'
  ],
  function(values) {
    vow = [ 
      parseInt(values['repeating_vow_vow-0']),
      parseInt(values['repeating_vow_vow-1']),
      parseInt(values['repeating_vow_vow-2']),
      parseInt(values['repeating_vow_vow-3']),
      parseInt(values['repeating_vow_vow-4']),
      parseInt(values['repeating_vow_vow-5']),
      parseInt(values['repeating_vow_vow-6']),
      parseInt(values['repeating_vow_vow-7']),
      parseInt(values['repeating_vow_vow-8']),
      parseInt(values['repeating_vow_vow-9'])
    ]
    vow_rank = parseInt(values.repeating_vow_vow_rank)


  function getCurrentProgress (vowValues) {
    let total = 0
    vowValues.map(x =>{
      total = x + total
    })
    return total
  }

  function updateVowValues (newValue) {
    let vowNumber = 0
    for (; newValue > 0;) {
      let updateValue = (newValue < 4) ? newValue : 4
      setAttrs({
        ['repeating_vow_vow-' + vowNumber]: updateValue
      })
      newValue = newValue - updateValue
      vowNumber++
    }
  }

  function updateVow (mark, vowArray) {
    let newValue = mark + getCurrentProgress(vowArray)
    let finalValue = (newValue < 40) ? newValue : 40
    updateVowValues(finalValue)
  }
  console.log(vow_rank)
  if (vow_rank === 1) {
    let mark = 12
    updateVow(mark, vow)
  } else if (vow_rank === 2) {
    let mark = 8
    updateVow(mark, vow)
  } else if (vow_rank === 3) {
    let mark = 4
    updateVow(mark, vow)
  } else if (vow_rank === 4) {
    let mark = 2
    updateVow(mark, vow)
  } else if (vow_rank === 5) {
    let mark = 1
    updateVow(mark, vow)
  } else {
    setAttrs({ 
      'repeating_vow_mark_error': 'on'
    })
    console.log('error')
  }
});
});

on('change:repeating_vow:clear_vow', function() {
  setAttrs({ 
    'repeating_vow_vow-0': '0',
    'repeating_vow_vow-1': '0',
    'repeating_vow_vow-2': '0',
    'repeating_vow_vow-3': '0',
    'repeating_vow_vow-4': '0',
    'repeating_vow_vow-5': '0',
    'repeating_vow_vow-6': '0',
    'repeating_vow_vow-7': '0',
    'repeating_vow_vow-8': '0',
    'repeating_vow_vow-9': '0',
    'repeating_vow_clear_vow': 'off'
  });
});

on('change:clear_misses', function() {
  setAttrs({ 
    'miss-0': '0',
    'miss-1': '0',
    'miss-2': '0',
    'miss-3': '0',
    'miss-4': '0',
    'miss-5': '0',
    'miss-6': '0',
    'miss-7': '0',
    'miss-8': '0',
    'miss-9': '0',
    'clear_misses': 'off'
  });
});