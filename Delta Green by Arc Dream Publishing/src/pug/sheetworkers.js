	// === ATTRIBUTE ARRAYS
		const arrays = {
			stats: ['strength', 'constitution', 'dexterity', 'intelligence', 'power', 'charisma'],
			hit_points: ['strength_score', 'constitution_score'],
			sanity_points: ['power_score'], //ALSO USED FOR BREAKING POINTS
			willpower_points: ['power_score'],
			toggles: ['settings']
		};

	// === SHARED FUNCTIONS
	const setAttributes = (update, silent) => { 
		(silent === true) ? setAttrs(update, {silent:true}) : setAttrs(update); 
	};

	// === STAT SCORES
	arrays['stats'].forEach(attr => {
		on(`change:${attr}_score`, (eventinfo) => {
			const score = parseInt(eventinfo.newValue) || 0;
			setAttributes({[`${attr}`]: score * 5}, true);
		});
	});

	// === HIT POINTS
	arrays['hit_points'].forEach(attr => {
		on(`change:${attr}`, (eventinfo) => {
			const attributes = arrays['hit_points'].concat(['hit_points']);
			getAttrs(attributes, (values) => {
				const strength = parseInt(values.strength_score) || 0, constitution = parseInt(values.constitution_score) || 0; 
				const calculated = Math.ceil((strength + constitution)/2);
				let update = { 
					hit_points: calculated,
					hit_points_max: calculated 
				}
				setAttributes(update, true);
			});
		});
	});

	// === WILLPOWER POINTS
	arrays['willpower_points'].forEach(attr => {
		on(`change:${attr}`, (eventinfo) => {
			const attributes = arrays['willpower_points'].concat(['willpower_points']);
			getAttrs(attributes, (values) => {
				const calculated = parseInt(values.power_score) || 0; 
				let update = { 
					willpower_point: calculated,
					willpower_points_max: calculated 
				}
				setAttributes(update, true);
			});
		});
	});

	// === SANITY POINTS & BREAKING POINT
	arrays['sanity_points'].forEach(attr => {
		on(`change:${attr}`, (eventinfo) => {
			const attributes = arrays['sanity_points'].concat(['sanity_points', 'breaking_point']);
			getAttrs(attributes, (values) => {
				const sanity = parseInt(values.power_score) || 0, calculatedSanity = sanity*5, calculatedBreakingPoint = calculatedSanity - sanity; 
				let update = { 
					sanity_points: calculatedSanity,
					sanity_points_max: calculatedSanity,
					breaking_point: calculatedBreakingPoint,
					breaking_point_max: calculatedBreakingPoint
				}
				setAttributes(update, true);
			});
		});
	});

	// === TOGGLE INPUT SETTINGS
    arrays['toggles'].forEach(attr => {
        on(`clicked:toggle_${attr}`, () => {
        	getAttrs(['toggles'], (values) => {
 				let string = toggleBuilder(attr, v['toggles']);
                setAttributes({toggles: string}, true);
        	});
        });
    });

	// === UPDATE TOGGLE STRING
	const toggleBuilder = (attr, oldString) => {
        let newString = (oldString.includes(`${attr}`)) ? oldString.replace(`${attr},`, '') : `${oldString}${attr},`;
        return newString
	};

	// === SHEET VERSIONING
	on('sheet:opened', () => {
		getAttrs(['version'], (values) => { versioning(parseFloat(values.version) || 1); });
	});			

	const versioning = (version) => {
	   console.log(`%c Versioning, ${version}`, 'color: green; font-weight:bold');
	   if (version >= 1) {
			console.log(`%c Version is update to date`, 'color: orange; font-weight:bold');
	    } else {
			setAttrs({version: 1}, () => {versioning(1)});
		};
	};


