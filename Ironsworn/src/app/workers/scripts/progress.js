const stdProgress = [
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

const vowProgress = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

function getCurrentProgress(progressValues) {
  let total = 0
  progressValues.map(x => { total = x + total })
  return total
}

function updateProgressValues(type, newValue, progressStrings) {
  let progressNumber = 0
  for (; newValue > 0;) {
    let updateValue = (newValue < 4) ? newValue : 4
    let attNumber = progressStrings[progressNumber]
    setAttrs({
      [`repeating_${type}_progress_${attNumber}`]: updateValue
    })
    newValue = newValue - updateValue
    progressNumber++
  }
}

function updateProgress(type, mark, progressArray, progressStrings) {
  let newValue = mark + getCurrentProgress(progressArray)
  let finalValue = (newValue < 40) ? newValue : 40
  updateProgressValues(type, finalValue, progressStrings)
}

function chosenDifficulty(rank) {
  switch (rank) {
    case 1:
      return 12;
    case 2:
      return 8;
    case 3:
      return 4;
    case 4:
      return 2;
    case 5:
      return 1;
    default:
      return null;
  }
}

on('change:repeating_progress:mark_progress change:repeating_vow:mark_progress change:repeating_sites:mark_progress', function (values) {
  const type = values.sourceAttribute.match(/repeating_(.*?)_/)[1]
  const progressStrings = type === 'vow' ? vowProgress : stdProgress

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
    function (attrValues) {
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
      updateProgress(type, mark, progress, progressStrings)
    });
});

on('change:repeating_progress:clear_progress change:repeating_vow:clear_progress change:repeating_sites:clear_progress', function (values) {
  const type = values.sourceAttribute.match(/repeating_(.*?)_/)[1]
  const progressStrings = type === 'vow' ? vowProgress : stdProgress

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

on('change:clear_misses', function () {
  setAttrs({
    'miss_0': '0',
    'miss_1': '0',
    'miss_2': '0',
    'miss_3': '0',
    'miss_4': '0',
    'miss_5': '0',
    'miss_6': '0',
    'miss_7': '0',
    'miss_8': '0',
    'miss_9': '0'
  });
});

on('change:repeating_progress:challenge-show-button', function (eventinfo) {
  setAttrs({
    'repeating_progress_challenge-show': eventinfo.newValue
  });
});
