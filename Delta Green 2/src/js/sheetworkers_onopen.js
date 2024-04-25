

on('change:repeating_skills remove:repeating_skills', () => {
  update_additionalskills();
});
    //= force the stats to be positive and the skills to be between 0 and 99
on(`sheet:opened`, (eventInfo) => {
		// For testing
 // setAttrs({version: 1.9}, {silent:true}, () => {
//	console.log('Debug Version downgraded');
 // });
		// === Versioning
	getAttrs(['version'], values => { versioning(parseFloat(values.version) || 1); });

	//setAllSkills();
	updateRollsOnOpen();	
		
		// === Set all stats to be positive
	//setAllStats();
	//setBondsLocalVariables();

		//setRepeatingskills();
	updateRepeatingRollsonOpen();	
	//update_additionalskill();
		
});

