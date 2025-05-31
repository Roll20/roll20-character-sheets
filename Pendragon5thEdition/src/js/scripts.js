const attributes = {
	damage: ['strength', 'size'],
	healing: ['strength', 'constitution'],
	movement: ['strength', 'dexterity'],
	hp: ['size', 'constitution'],
	unconcious: ['total_hit_points'],
	knights: ['old_knights', 'middle_aged_knights', 'young_knights'],
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
	Object.values(values).forEach(num => sum += parseFloat(num) || 0)
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

const calculateTreasure = () => {
	getSectionIDs('treasure-record', idArray => {
		let attributes = []
		idArray.forEach(id => attributes.push(`repeating_treasure-record_${id}_amount_worth`))

		getAttrs(attributes, values => {
			const parsedNums = helpers.parseIntegers(values)
			const objectValues = Object.values(parsedNums) 

	    setAttrs({
	    	'treasure_total': helpers.sumIntegers(objectValues)
	    });
		})
	})
}

const calculateGlory = ({ triggerName }) => {
	const repeatingRow = helpers.getReprowid(triggerName)

	getSectionIDs('events', idArray => {
		let attributes = []
		idArray.forEach(id => attributes.push(`repeating_events_${id}_new_glory`))

		getAttrs(attributes, values => {
			const parsedNums = helpers.parseIntegers(values)
			const gloryValues = Object.values(parsedNums) 
			const sum = helpers.sumIntegers(gloryValues)

	    setAttrs({
	    	'glory_total': sum,
				[`${repeatingRow}_total_glory`]: sum,
	    })
		})
	})
}


const manorAttrs = {
	anticipated_income: ['normal_income', 'investment_income'],
	misfortune: ['fate', 'care'],
	treasury: ['emergency_income', 'expenses', 'manor_income'],
	manor_income: ['anticipated_income', 'harvest_result'],
	annual: ['annual_income', 'annual_maintenance', 'annual_glory'],
	expenses: ['lifestyle', 'annual_maintenance_total', 'new_improvements', 'retinue_total']
}

const formatRepeatinRow = (rowId, array) => array.map( x => `${rowId}_${x}` )

const calculateMisfortune = ({ triggerName }) => {
	const repeatingRow = helpers.getReprowid(triggerName)
	const attributes = formatRepeatinRow( repeatingRow, manorAttrs.misfortune )

  getAttrs(attributes, values => {
			const parsedNums = helpers.parseIntegers(values)
			const fate = parsedNums[`${repeatingRow}_fate`]
			const care = helpers.convertIntegerNegative(parsedNums[`${repeatingRow}_care`])

	    setAttrs({
	    	[`${repeatingRow}_misfortune`]: Math.max(fate + care, 0)
	    });
	});
};


const sumOfRepeatingValues = ({ triggerName }, set) => {
	const repeatingRow = helpers.getReprowid(triggerName)
	const attributes = formatRepeatinRow(repeatingRow, manorAttrs[`${set}`])
	sumOfCalculator(attributes, `${repeatingRow}_${set}`)
}

const calculateExpenses = ({ triggerName }) => {
	const repeatingRow = helpers.getReprowid(triggerName)
	const attributes = formatRepeatinRow(repeatingRow, manorAttrs.treasury)

	getAttrs(attributes, values => {
		const parsedNums = helpers.parseIntegers(values)
		const emergency = parsedNums[`${repeatingRow}_emergency_income`]
		const expenses = helpers.convertIntegerNegative(parsedNums[`${repeatingRow}_expenses`])
		const manor = parsedNums[`${repeatingRow}_manor_income`]

		setAttrs({
			[`${repeatingRow}_treasury`]: manor + (emergency + expenses)
		});
	});
}

const calculateManorIncome = ({ triggerName }) => {
	const repeatingRow = helpers.getReprowid(triggerName)
	const attributes = formatRepeatinRow(repeatingRow, manorAttrs.manor_income)

	getAttrs(attributes, values => {
		const parsedNums = helpers.parseIntegers(values)
		const anticipated = parsedNums[`${repeatingRow}_anticipated_income`]
		const harvest = parsedNums[`${repeatingRow}_harvest_result`]

		setAttrs({
			[`${repeatingRow}_manor_income`]: (anticipated * harvest).toFixed(1)
		});
	});
}

const calculateAnnualTotal = (attr) => {
	getSectionIDs('land-record', idArray => {
		let attributes = []
		idArray.forEach(id => attributes.push(`repeating_land-record_${id}_${attr}`))

		getAttrs(attributes, values => {
			const parsedNums = helpers.parseIntegers(values)
			const objectValues = Object.values(parsedNums)

	    setAttrs({
	    	[`${attr}_total`]: helpers.sumIntegers(objectValues)
	    });
		})
	})
}

const calculateRetinueAnnualTotal = () => {
	getSectionIDs('manor-personnel-retinue', idArray => {
		let attributes = []
		idArray.forEach(id => attributes.push(`repeating_manor-personnel-retinue_${id}_cost`))

		getAttrs(attributes, values => {
			const parsedNums = helpers.parseIntegers(values)
			const objectValues = Object.values(parsedNums)

	    setAttrs({
	    	[`retinue_total`]: helpers.sumIntegers(objectValues)
	    });
		})
	})
}

