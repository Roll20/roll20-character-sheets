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
	"socialLimits": ["essence", "willpower", "charisma"]
}


const functions = {
	convertIntegerNegative: numbers => {
		for (let [key, value] of Object.entries(numbers)) {
			numbers[key] = value > 0 ? -Math.abs(value) : value;
		}
		return numbers
	},
	getReprowid: trigger => {
		const split = trigger.split('_');
		return `${split[0]}_${split[1]}_${split[2]}`
	},
	parseIntegers: numbers => {
		for (let [key, value] of Object.entries(numbers)) {
		    numbers[key] = parseInt(value) || 0;
		}
		return numbers	
	},
	sumIntegers: numbers => numbers.reduce((a,b) => a + b, 0),
	convertInteger: string => parseInt(string) || 0,
}

//for Mocha Unit Texting
module.exports = functions;