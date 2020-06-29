const attributes = {
	damage: ['strength', 'size'],
	healing: ['strength', 'constitution'],
	movement: ['strength', 'dexterity'],
	hp: ['size', 'constitution'],
	unconcious: ['total_hit_points'],
	knights: ['old_knights', 'middle_aged_knights', 'young_knights']
}

const sheetSelect = eventinfo => {
	const newValue = eventinfo.newValue;
	let update = {}

	update.sheet_type = newValue === 'knight' || newValue === 'woman' ? 'character' : newValue;
	update.character_type = newValue === 'woman' ? 'woman' : 'knight';

	setAttrs(update);	
}

//When performing calculations in King Arthur Pendragon, round
//0.5 and higher fractions upward and lesser fractions downward.
//For example, a character with a Damage value of 4.43 would
//have an effective value of 4, while a character with a Damage val-
//ue of 4.5 would have a 5.
const roundFraction = sum => (sum % 1) >= 0.5 ? Math.ceil(sum) : Math.floor(sum)
const divideBy = (sum, num) => sum/num;

const totalAttributes = values => {
	let sum = 0
	Object.values(values).forEach(num => sum += parseInt(num) || 0)
	return sum
}

const attributeSumDivide = (attributes, set) => {
    getAttrs(attributes, (values) => {
    	const divide = set == 'damage' ? 6 : 10;
    	let sum = totalAttributes(values);
			sum = divideBy(sum, divide);

	    setAttrs({
	    	[`${set}`]: roundFraction(sum)
	    });
	});
};

const sumOfCalculator = (attributes, set) => {
    getAttrs(attributes, (values) => {
	    setAttrs({
	    	[`${set}`]: totalAttributes(values)
	    });
	});
};

const unconciousCalculator = (attributes, set) => {
    getAttrs(attributes, (values) => {
    	let sum = totalAttributes(values);
    	sum = divideBy(sum, 4) ;

	    setAttrs({
	    	[`${set}`]: roundFraction(sum)
	    });
	});
};