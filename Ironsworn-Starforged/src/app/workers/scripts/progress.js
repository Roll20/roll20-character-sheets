const stdProgress = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

on('change:repeating_progress:mark_progress change:repeating_vow:mark_progress change:repeating_connection:mark_progress', function(values) {
  const type = values.sourceAttribute.match(/repeating_(.*?)_/)[1];
  const progressStrings = stdProgress
  const rankValue = `repeating_${type}_rank`;
  const progressBoxAttrs = [
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
  ];

  updateProgressBoxes({ attributes: progressBoxAttrs, rank: { kind: 'attribute', value: rankValue }});
});

function updateProgressBoxes(opts) {
  getAttrs(opts.attributes, function(attrValues) {
    const progress = [ 
      parseInt(attrValues[opts.attributes[0]]),
      parseInt(attrValues[opts.attributes[1]]),
      parseInt(attrValues[opts.attributes[2]]),
      parseInt(attrValues[opts.attributes[3]]),
      parseInt(attrValues[opts.attributes[4]]),
      parseInt(attrValues[opts.attributes[5]]),
      parseInt(attrValues[opts.attributes[6]]),
      parseInt(attrValues[opts.attributes[7]]),
      parseInt(attrValues[opts.attributes[8]]),
      parseInt(attrValues[opts.attributes[9]])
    ]

    opts.rank.kind === 'static'
    ? generateMarkAndUpdateProgress(opts.rank.value, progress, opts.attributes)
    : getAttrs([opts.rank.value], function(value) { generateMarkAndUpdateProgress(parseInt(value[opts.rank.value]), progress, opts.attributes) })
  });
}

function generateMarkAndUpdateProgress(rank, progress, attributes) {
  const mark = chosenDifficulty(rank);
  updateProgress(mark, progress, attributes);
}

function getCurrentProgress (progressValues) {
  let total = 0
  progressValues.map(x =>{ total = x + total })
  return total
}

function updateProgress (mark, progressValues, attributes) {
  const newValue = mark + getCurrentProgress(progressValues)
  let finalValue = (newValue < 40) ? newValue : 40
  let progressNumber = 0
  for (; finalValue > 0;) {
    let updateValue = (finalValue < 4) ? finalValue : 4
    setAttrs({
      [attributes[progressNumber]]: updateValue
    })
    finalValue = finalValue - updateValue
    progressNumber++
  }
}

function chosenDifficulty (rank) {
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

on('change:repeating_progress:clear_progress change:repeating_vow:clear_progress change:repeating_connection:clear_progress', function(values) {
  const type = values.sourceAttribute.match(/repeating_(.*?)_/)[1]
  const progressStrings = stdProgress

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

on('change:repeating_progress:challenge-show-button', function(eventinfo) {
  setAttrs({
    'repeating_progress_challenge-show': eventinfo.newValue  
  });
});
