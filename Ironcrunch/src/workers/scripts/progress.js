function getCurrentProgress (progressValues) {
  let total = 0
  progressValues.map(x =>{ total = x + total })
  return total
}

function updateProgressValues (newValue) {
  let progressNumber = 0
  for (; newValue > 0;) {
    let updateValue = (newValue < 4) ? newValue : 4
    setAttrs({
      ['repeating_progress_progress_' + progressNumber]: updateValue
    })
    newValue = newValue - updateValue
    progressNumber++
  }
}

function updateProgress (mark, progressArray) {
  let newValue = mark + getCurrentProgress(progressArray)
  let finalValue = (newValue < 40) ? newValue : 40
  updateProgressValues(finalValue)
}

function chosenDifficulty (rank) {
  switch (rank) {
    case 1:
      return 12
      break;
    case 2:
      return 8
      break;
    case 3:
      return 4
      break;
    case 4:
      return 2
      break;
    case 5:
      return 1
      break;
    default:
      return null
  }
}

on('change:repeating_progress:mark_progress change:repeating_vow:mark_progress', function(values) {
  const type = values.sourceAttribute.match(/repeating_(.*?)_/)[1]
  getAttrs([
    `repeating_${type}_rank`,
    `repeating_${type}_progress_0`,
    `repeating_${type}_progress_1`,
    `repeating_${type}_progress_2`,
    `repeating_${type}_progress_3`,
    `repeating_${type}_progress_4`,
    `repeating_${type}_progress_5`,
    `repeating_${type}_progress_6`,
    `repeating_${type}_progress_7`,
    `repeating_${type}_progress_8`,
    `repeating_${type}_progress_9`
  ],
  function(attrValues) {
    const progress = [ 
      parseInt(attrValues[`repeating_${type}_progress_0`]),
      parseInt(attrValues[`repeating_${type}_progress_1`]),
      parseInt(attrValues[`repeating_${type}_progress_2`]),
      parseInt(attrValues[`repeating_${type}_progress_3`]),
      parseInt(attrValues[`repeating_${type}_progress_4`]),
      parseInt(attrValues[`repeating_${type}_progress_5`]),
      parseInt(attrValues[`repeating_${type}_progress_6`]),
      parseInt(attrValues[`repeating_${type}_progress_7`]),
      parseInt(attrValues[`repeating_${type}_progress_8`]),
      parseInt(attrValues[`repeating_${type}_progress_9`])
    ]
    const rank = parseInt(attrValues[`repeating_${type}_rank`])
    const mark = chosenDifficulty(rank)
    updateProgress(mark, progress)
  });
});

on('change:repeating_progress:clear_progress change:repeating_vow:clear_progress', function(values) {
  const type = values.sourceAttribute.match(/repeating_(.*?)_/)[1]
  setAttrs({ 
    ['repeating_' + type + '_progress_0']: '0',
    ['repeating_' + type + '_progress_1']: '0',
    ['repeating_' + type + '_progress_2']: '0',
    ['repeating_' + type + '_progress_3']: '0',
    ['repeating_' + type + '_progress_4']: '0',
    ['repeating_' + type + '_progress_5']: '0',
    ['repeating_' + type + '_progress_6']: '0',
    ['repeating_' + type + '_progress_7']: '0',
    ['repeating_' + type + '_progress_8']: '0',
    ['repeating_' + type + '_progress_9']: '0'
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

on('remove:repeating_vow', function(eventinfo) { 
  setArchive(eventinfo)
});

function setArchive (eventinfo) {
  // let vowName = eventinfo.removedInfo[`${eventinfo.sourceAttribute}_vow_name`]
  // console.log(vowName)
  let vowName = eventinfo.removedInfo[`${eventinfo.sourceAttribute}_vow_name`]
  let newrowid = generateRowID();
  let attrs = {};
  attrs['repeating_vowarchive_' + newrowid + '_vow_name'] = vowName
  console.log(attrs)
  setAttrs(attrs);
}