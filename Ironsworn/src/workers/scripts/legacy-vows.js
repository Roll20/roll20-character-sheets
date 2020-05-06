function getCurrentVow (VowValues) {
  let total = 0
  VowValues.map(x =>{ total = x + total })
  return total
}

function updateVowValues (newValue) {
  let VowNumber = 0
  for (; newValue > 0;) {
    let updateValue = (newValue < 4) ? newValue : 4
    setAttrs({
      ['repeating_Vow_Vow_' + VowNumber]: updateValue
    })
    newValue = newValue - updateValue
    VowNumber++
  }
}

function updateVow (mark, vowArray) {
  let newValue = mark + getCurrentVow(vowArray)
  let finalValue = (newValue < 40) ? newValue : 40
  updateVowValues(finalValue)
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

on('change:mark_vow_1 change:mark_vow_2 change:mark_vow_3 change:mark_vow_4 change:mark_vow_5', function(values) {
  const number = values.sourceAttribute.match(/repeating_(.*?)_/)[1]
  getAttrs([
    `vow${number}_rank`,
    `vow${number}_0`,
    `vow${number}_1`,
    `vow${number}_2`,
    `vow${number}_3`,
    `vow${number}_4`,
    `vow${number}_5`,
    `vow${number}_6`,
    `vow${number}_7`,
    `vow${number}_8`,
    `vow${number}_9`
  ],
  function(attrValues) {
    const Vow = [ 
      parseInt(attrValues[`${number}_vow${number}_0`]),
      parseInt(attrValues[`${number}_vow${number}_1`]),
      parseInt(attrValues[`${number}_vow${number}_2`]),
      parseInt(attrValues[`${number}_vow${number}_3`]),
      parseInt(attrValues[`${number}_vow${number}_4`]),
      parseInt(attrValues[`${number}_vow${number}_5`]),
      parseInt(attrValues[`${number}_vow${number}_6`]),
      parseInt(attrValues[`${number}_vow${number}_7`]),
      parseInt(attrValues[`${number}_vow${number}_8`]),
      parseInt(attrValues[`${number}_vow${number}_9`])
    ]
    const rank = parseInt(attrValues[`${number}_rank`])
    const mark = chosenDifficulty(rank)
    updateVow(mark, Vow)
  });
});

on('change:clear_vow', function(values) {
  const number = values.sourceAttribute.match(/repeating_(.*?)_/)[1]
  setAttrs({ 
    ['repeating_' + number + '_Vow_0']: '0',
    ['repeating_' + number + '_Vow_1']: '0',
    ['repeating_' + number + '_Vow_2']: '0',
    ['repeating_' + number + '_Vow_3']: '0',
    ['repeating_' + number + '_Vow_4']: '0',
    ['repeating_' + number + '_Vow_5']: '0',
    ['repeating_' + number + '_Vow_6']: '0',
    ['repeating_' + number + '_Vow_7']: '0',
    ['repeating_' + number + '_Vow_8']: '0',
    ['repeating_' + number + '_Vow_9']: '0'
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