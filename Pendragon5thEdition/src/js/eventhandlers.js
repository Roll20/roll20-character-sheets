attributes.movement.forEach(attr => {
	on(`change:${attr}`, () => attributeSumDivide(attributes.movement, 'movement_rate'));
})

attributes.damage.forEach(attr => {
	on(`change:${attr}`, () => attributeSumDivide(attributes.damage, 'damage'));
})

attributes.healing.forEach(attr => {
	on(`change:${attr}`, () => attributeSumDivide(attributes.healing, 'healing_rate'));
})

attributes.hp.forEach(attr => {
	on(`change:${attr}`, () => sumOfCalculator(attributes.hp, 'total_hit_points'));
})

attributes.unconcious.forEach(attr => {
	on(`change:${attr}`, () => unconciousCalculator(attributes.unconcious, 'unconcious'));
})

attributes.knights.forEach(attr => {
	on(`change:${attr}`, () => sumOfCalculator(attributes.knights, 'total_family_knights'));
})

on(`change:sheet_select`, eventinfo => sheetSelect(eventinfo))

on(`change:repeating_events:new_glory`, (eventinfo) => calculateGlory(eventinfo))

on(`change:repeating_treasure-record:amount_worth`, () => calculateTreasure())

on(`change:repeating_manor-personnel-retinue:cost`, () => calculateRetinueAnnualTotal())

manorAttrs.annual.forEach(attr => {
	on(`change:repeating_land-record:${attr}`, () => calculateAnnualTotal( attr ))
})

manorAttrs.misfortune.forEach(attr => {
	on(`change:repeating_income-worksheet:${attr}`, ( eventinfo ) => calculateMisfortune( eventinfo ))
})

manorAttrs.anticipated_income.forEach(attr => {
	on(`change:repeating_income-worksheet:${attr}`, ( eventinfo ) => sumOfRepeatingValues( eventinfo, 'anticipated_income' ))
})

manorAttrs.treasury.forEach(attr => {
	on(`change:repeating_income-worksheet:${attr}`, ( eventinfo ) => calculateExpenses( eventinfo ))
})

manorAttrs.manor_income.forEach(attr => {
	on(`change:repeating_income-worksheet:${attr}`, ( eventinfo ) => calculateManorIncome( eventinfo ))
})

manorAttrs.expenses.forEach(attr => {
	on(`change:${attr}`, ( ) => sumOfCalculator( manorAttrs.expenses, 'expense_total' ))
})

