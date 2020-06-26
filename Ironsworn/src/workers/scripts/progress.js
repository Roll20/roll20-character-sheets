const progressStrings = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten'
]

function getCurrentProgress (progressValues) {
  let total = 0
  progressValues.map(x =>{ total = x + total })
  return total
}

function updateProgressValues (newValue) {
  let progressNumber = 0
  for (; newValue > 0;) {
    let updateValue = (newValue < 4) ? newValue : 4
    let attNumber = progressStrings[progressNumber]
    setAttrs({
      ['repeating_progress_' + 'progress_'+ attNumber]: updateValue
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
    `repeating_${type}_progress_${progressStrings[0]}`,
    `repeating_${type}_progress_${progressStrings[1]}`,
    `repeating_${type}_progress_${progressStrings[2]}`,
    `repeating_${type}_progress_${progressStrings[3]}`,
    `repeating_${type}_progress_${progressStrings[4]}`,
    `repeating_${type}_progress_${progressStrings[5]}`,
    `repeating_${type}_progress_${progressStrings[6]}`,
    `repeating_${type}_progress_${progressStrings[7]}`,
    `repeating_${type}_progress_${progressStrings[8]}`,
    `repeating_${type}_progress_${progressStrings[9]}`
  ],
  function(attrValues) {
    const progress = [ 
      parseInt(attrValues[`repeating_${type}_progress_${progressStrings[0]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${progressStrings[1]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${progressStrings[2]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${progressStrings[3]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${progressStrings[4]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${progressStrings[5]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${progressStrings[6]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${progressStrings[7]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${progressStrings[8]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${progressStrings[9]}`])
    ]
    const rank = parseInt(attrValues[`repeating_${type}_rank`])
    const mark = chosenDifficulty(rank)
    updateProgress(mark, progress)
  });
});

on('change:repeating_progress:clear_progress change:repeating_vow:clear_progress', function(values) {
  const type = values.sourceAttribute.match(/repeating_(.*?)_/)[1]
  setAttrs({ 
    ['repeating_' + type + '_progress_' + progressStrings[0]]: '0',
    ['repeating_' + type + '_progress_' + progressStrings[1]]: '0',
    ['repeating_' + type + '_progress_' + progressStrings[2]]: '0',
    ['repeating_' + type + '_progress_' + progressStrings[3]]: '0',
    ['repeating_' + type + '_progress_' + progressStrings[4]]: '0',
    ['repeating_' + type + '_progress_' + progressStrings[5]]: '0',
    ['repeating_' + type + '_progress_' + progressStrings[6]]: '0',
    ['repeating_' + type + '_progress_' + progressStrings[7]]: '0',
    ['repeating_' + type + '_progress_' + progressStrings[8]]: '0',
    ['repeating_' + type + '_progress_' + progressStrings[9]]: '0'
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
