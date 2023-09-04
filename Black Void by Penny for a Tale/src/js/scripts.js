//Convert Integers to be Negative
const convertIntegerNegative = number => number > 0 ? -Math.abs(number) : number

//Convert an object with negative numbers
const convertIntegersNegatives = numbers => {
  numbers => {
    for (let [key, value] of Object.entries(numbers)) {
      numbers[key] = convertIntegerNegative(value);
    }
    return numbers
  }
}

//Pass in eventinfo.triggerName
const findRepeatingField = trigger => trigger.split('_')[1]

//Pass in eventinfo.triggerName
const getReprowid = trigger => {
  const split = trigger.split('_');
  return `${split[0]}_${split[1]}_${split[2]}`
}

//Pass in an object keep that has the repeating section
//Example repeating_weapon_-m1czg68yzicwhfdpyys_name
const getReprowAttribute = key => {
  const getReprowid = processingFunctions.getReprowid(key)
  return key.split(`${getReprowid}_`)[1]
}

//Provide the function with an array of keys to find transations for 
//Example ['strenght', 'agility', 'willpower']
const getTranslations = translationKeys => {
  let translations = {}
  translationKeys.forEach(key => translations[`${key}`] = getTranslationByKey(key))
  return translations
}

const parseInteger = string => parseInt(string) || 0

//Use for convernting the result of getAttrs from strings into integers
const parseIntegers = numbers => {
  for (let [key, value] of Object.entries(numbers)) {
      numbers[key] = parseInt(value) || 0
  }
  return numbers  
}

const setAttributes = (update, silent) => silent && typeof update === 'object' ? setAttrs(update, {silent:true}) : typeof update === 'object' ? setAttrs(update) : console.error(`${update} is not an object`)

//returns strength from @{strenght}
const sliceAttr = attribute => attribute.slice(2, -1)

const sumIntegers = numbers => numbers.reduce((a,b) => a + b, 0)

//enable name edit

on(`clicked:edit_npc_name`, eventInfo => setAttrs({npc_name_toggle:"on"}));
on(`clicked:save_npc_name`, eventInfo => setAttrs({npc_name_toggle:"0"}));