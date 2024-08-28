

on('change:repeating_skills remove:repeating_skills', () => {
  update_additionalskills();
});

const update_armor_piercing = (value,update) => {
	const armor_piercing_text = value;
	const armor_piercing_number = parseInt(armor_piercing_text) || 0;
	
	if (armor_piercing_text !== '') { update[`repeating_weapons_armor_piercing`] = armor_piercing_number; }
	console.log('Armor piercing updated',update);
};

on('change:repeating_weapons:armor_piercing', () => {
	getAttrs(['repeating_weapons_armor_piercing'], (values) => {
		const update = {};
		update_armor_piercing(values.repeating_weapons_armor_piercing,update);
		setAttrs(update, {silent:true}, () => {
			console.log('Base range updated',update);
		});
	});
});





on('change:repeating_weapons:ammo_total remove:repeating_weapons', (values) => {
	
	const ammo_total = Math.max(0,parseInt(values.newValue)||0);
	const update = {};
	update[`repeating_weapons_ammo_total`] = ammo_total;
	update[`repeating_weapons_ammo`] = ammo_total;
	update[`repeating_weapons_hasammo`] = ammo_total > 0 ? 'active' : '0';
	console.log('Ammo updated',update);
	setAttrs(update, {silent:true}, () => {
		console.log('Ammo updated',update);
	});
});

on('change:repeating_weapons:ammo', (values) => {
	const ammo = Math.max(0,parseInt(values.newValue)||0);
	const update = {};
	update[`repeating_weapons_ammo`] = ammo;
	setAttrs(update, {silent:true}, () => {
		console.log('Ammo updated',update);
	});
});


    //= force the stats to be positive and the skills to be between 0 and 99
on(`sheet:opened`, () => {
		
		// === Versioning
	getAttrs(['version'], values => { versioning(parseFloat(values.version) || 1); });
	changeBondButtonColorOnOpen();
	//initializeRolls();		
		
});

