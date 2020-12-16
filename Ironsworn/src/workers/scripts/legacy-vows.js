function getCurrentVow (VowValues) {
  let total = 0
  VowValues.map(x =>{ total = x + total })
  return total
}

function updateVowValues (newValue, vowID) {
  let VowNumber = 0
  for (; newValue > 0;) {
    let updateValue = (newValue < 4) ? newValue : 4
    setAttrs({
      ['vow' + vowID + '-' + VowNumber]: updateValue
    })
    newValue = newValue - updateValue
    VowNumber++
  }
}

function updateVow (mark, vowArray, number) {
  let newValue = mark + getCurrentVow(vowArray)
  let finalValue = (newValue < 40) ? newValue : 40
  updateVowValues(finalValue, number)
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

on('change:mark_progress_1 change:mark_progress_2 change:mark_progress_3 change:mark_progress_4 change:mark_progress_5', function(values) {
  const number = values.sourceAttribute.match(/mark_progress_([0-9])/)[1]
  getAttrs([
    `vow${number}_rank`,
    `vow${number}-0`,
    `vow${number}-1`,
    `vow${number}-2`,
    `vow${number}-3`,
    `vow${number}-4`,
    `vow${number}-5`,
    `vow${number}-6`,
    `vow${number}-7`,
    `vow${number}-8`,
    `vow${number}-9`
  ],
  function(attrValues) {
    const Vow = [ 
      parseInt(attrValues[`vow${number}-0`]),
      parseInt(attrValues[`vow${number}-1`]),
      parseInt(attrValues[`vow${number}-2`]),
      parseInt(attrValues[`vow${number}-3`]),
      parseInt(attrValues[`vow${number}-4`]),
      parseInt(attrValues[`vow${number}-5`]),
      parseInt(attrValues[`vow${number}-6`]),
      parseInt(attrValues[`vow${number}-7`]),
      parseInt(attrValues[`vow${number}-8`]),
      parseInt(attrValues[`vow${number}-9`])
    ]
    const rank = parseInt(attrValues[`vow${number}_rank`])
    const mark = chosenDifficulty(rank)
    updateVow(mark, Vow, number)
  });
});

on('change:clear_progress_1 change:clear_progress_2 change:clear_progress_3 change:clear_progress_4 change:clear_progress_5', function(values) {
  const number = values.sourceAttribute.match(/clear_progress_([0-9])/)[1]
  setAttrs({ 
    ['vow' + number + '-' + '0']: '0',
    ['vow' + number + '-' + '1']: '0',
    ['vow' + number + '-' + '2']: '0',
    ['vow' + number + '-' + '3']: '0',
    ['vow' + number + '-' + '4']: '0',
    ['vow' + number + '-' + '5']: '0',
    ['vow' + number + '-' + '6']: '0',
    ['vow' + number + '-' + '7']: '0',
    ['vow' + number + '-' + '8']: '0',
    ['vow' + number + '-' + '9']: '0'
  });
});

on('change:vow1_menace-show-button change:vow2_menace-show-button change:vow3_menace-show-button change:vow4_menace-show-button change:vow5_menace-show-button', function(values) {
  const number = values.sourceAttribute.match(/vow([0-9])/)[1]
  setAttrs({ 
    ['vow' + number + '_menace-show']: values.newValue,
  });
});