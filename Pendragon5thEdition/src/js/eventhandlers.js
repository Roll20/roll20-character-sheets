attributes.movement.forEach(attr => {
	on(`change:${attr}`, eventinfo => attributeSumDivide(attributes.movement, 'movement_rate'));
})

attributes.damage.forEach(attr => {
	on(`change:${attr}`, eventinfo => attributeSumDivide(attributes.damage, 'damage'));
})

attributes.healing.forEach(attr => {
	on(`change:${attr}`, eventinfo => attributeSumDivide(attributes.healing, 'healing_rate'));
})

attributes.hp.forEach(attr => {
	on(`change:${attr}`, eventinfo => sumOfCalculator(attributes.hp, 'total_hit_points'));
})

attributes.unconcious.forEach(attr => {
	on(`change:${attr}`, eventinfo => unconciousCalculator(attributes.unconcious, 'unconcious'));
})

attributes.knights.forEach(attr => {
	on(`change:${attr}`, eventinfo => sumOfCalculator(attributes.knights, 'total_family_knights'));
})

on(`change:sheet_select`, eventinfo => sheetSelect(eventinfo))


