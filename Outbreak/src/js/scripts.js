['Strength', 'Perception', 'Empathy', 'Willpower'].forEach((attribute) => {
	on(`change:${attribute}_base change:${attribute}_bonus`, (eventInfo) => {
		getAttrs([`${attribute}_base`, `${attribute}_bonus`], (v) => {
			const base = parseInt(v[`${attribute}_base`]) || 0;
			const bonus = parseInt(v[`${attribute}_bonus`]) || 0;
			const total = Math.floor((bonus*10)+base);

			console.log([`${attribute} : ${total}`]);

			setAttrs({
				[`${attribute}`]: total
			});
		});
	});
});


on("change:repeating_skills", (eventInfo) => {
	getAttrs(['repeating_skills_attribute_base', 'repeating_skills_attribute_bonus'], (v) => {
		const baseAttr = v.repeating_skills_attribute_base.slice(2, -1);
		const bonusAttr = v.repeating_skills_attribute_bonus.slice(2, -1);

		getAttrs([`${baseAttr}`, `${bonusAttr}`, 'repeating_skills_advancement'], (v) => {
			let base = parseInt(v[`${baseAttr}`]) || 0;
			let bonus = parseInt(v[`${bonusAttr}`]) || 0;
			const adv = parseInt(v.repeating_skills_advancement) || 0;

			setAttrs({
				"repeating_skills_skill":  Math.floor((base+bonus)+adv)
			}, {silent:true});
		});
	});
});