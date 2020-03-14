const sheetAttribues = {
	"attributes": ["body", "agility", "reaction", "strength", "willpower", "logic", "intuition", "charisma", "edge"],
	"translationsAttributes": ["attribute", "body", "agility", "reaction", "strength", "willpower", "logic", "intuition", "charisma", "edge", "none"],
	"calculatedAttributes": ['body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition','charisma','magic', 'resonance'],
	"repeating": ["quality", "martial", "items", "range", "melee", "armor", "spell", "preps", "ritual", "powers", "forms", "vehicle", "augementations", "lifestyle", "contacts", "programs"],
	"repeatingSkills": ["active", "knowledge", "language"],
	"tabs": [`core`, `arms`, `augs`, `gear`, `magic`, `matrix`, `social`, `vehicle`, `options`],
	"woundCalculation": ["high_pain_tolerance", "low_pain_tolerance", "damage_compensators_physical", "damage_compensators_stun", "stun", "physical"],
	"mentalLimits": ["intuition", "willpower", "logic"],
	"physicalLimits": ["body", "reaction", "strength"],
	"socialLimits": ["essence", "willpower", "charisma"],
}

const errorMessage = (name, error) => console.error(`%c ${name}: ${error}`, "color: orange; font-weight:14px;");
const warningMessage = (name, error) => console.warn(`%c ${name}: ${error}`, "color: orange; font-weight:14px;");

const functions = {
	convertIntegerNegative: numbers => {
		for (let [key, value] of Object.entries(numbers)) {
			numbers[key] = value > 0 ? -Math.abs(value) : value;
		}
		return numbers
	},
  //Roll20 does not all for Promises
  //getAttributes: array => new Promise((resolve, reject) => array ? getAttrs(array, v => resolve(v)) : reject(errorMessage('getAttributes', 'Function failed'))),
	getReprowid: trigger => {
		const split = trigger.split('_');
		return `${split[0]}_${split[1]}_${split[2]}`
	},
  parseInteger: string => parseInt(string) || 0,
	parseIntegers: numbers => {
		for (let [key, value] of Object.entries(numbers)) {
		    numbers[key] = parseInt(value) || 0;
		}
		return numbers	
	},
  setAttributes: (update, silent) => silent && typeof update === 'object' ? setAttrs(update, {silent:true}) : typeof update === 'object' ? setAttrs(update) : errorMessage('setAttributes', `${update} is not an object`),
	sumIntegers: numbers => numbers.reduce((a,b) => a + b, 0),

  shadowrun: {
    shotsFired: (shots, trigger) => shots > 0 && trigger.includes("remove") ? shots -= 1 : trigger.includes("add") ? shots += 1 : shots
  }
}

//for Mocha Unit Texting
module.exports = functions;

