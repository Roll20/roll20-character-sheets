	// === ATTRIBUTE ARRAYS
		const arrays = {
			stats: ['strength', 'constitution', 'dexterity', 'intelligence', 'power', 'charisma'],
			hit_points: ['strength_score', 'constitution_score'],
			sanity_points: ['power_score'],
			breaking_point: ['sanity_score', 'power_score'],
			willpower_points: ['power_score'],
			repeating_settings: [''],
			sheets: ['settings'],
			toggles: ['sheet']
		};

	// === SHARED FUNCTIONS
	const setAttributes = (update, silent) => { 
		(silent === true) ? setAttrs(update, {silent:true}) : setAttrs(update); 
	};

	// === GET ATTRIBUTES
	const getAttributes = (array) => {
		return new Promise((resolve, reject)  => {
			try {
				getAttrs(array, (values) => {
					resolve(values);
				});
			} catch (error) {
				reject(`ERROR: ${error}`);
			}
		});
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
			getAttributes(attributes).then(values => {
				const strength = parseInt(values.strength_score) || 0, constitution = parseInt(values.constitution_score) || 0; 
				const calculated = Math.ceil((strength + constitution)/2);
				let update = { hit_points_max: calculated }
				if (values.hit_points === undefined || values.hit_points === "") { update['hit_points'] = calculated }
			  	console.log(`%c HIT POINTS UPDATE`, 'color: green; font-weight:bold');
			  	console.log(update);

			  	return update
			}).then(result => {
				console.log(`%c HIT POINTS RESULT`, 'color: green; font-weight:bold');
			  	console.log(result);
			  	setAttributes(result, true);
			});
		});
	});

	// === TOGGLE SETTINGS
		arrays['sheets'].forEach(attr => {
	        on(`clicked:${attr}`, (eventinfo) => {
	            setAttributes({sheet_type: `${attr}`}, true);
	        });
	    });

	// === SWITCH BETWEEN SHEETS
	    on(`change:sheet_select`, (eventinfo) => {
	        setAttributes({sheet_type: eventinfo.newValue}, true);
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

	// === GM WHISPER TOGGLES
		on('clicked:whisper', (eventinfo) => {
			getAttrs(['gm_toggle'], (values) => {
				setAttributes({gm_toggle: (values.gm_toggle.includes('gm')) ?  ' ' : '/w gm'}, true);
			});
		});

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


