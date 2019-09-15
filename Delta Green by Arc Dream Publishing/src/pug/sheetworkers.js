
	// === SHARED FUNCTIONS
	const setAttributes = (update, silent) => { 
		(silent === true) ? setAttrs(update, {silent:true}) : setAttrs(update); 
	};

	// === ATTRIBUTE ARRAYS
		const arrays = {
			stats: ['strength', 'constitution', 'dexterity', 'intelligence', 'power', 'charisma'],
			attributes: {'willpower_points': ['power'], 'sanity_points': ['power'], 'breaking_point': ['sanity', 'power']},
			hit_points: ['strength', 'constitution'],
			repeating_settings: [''],
			sheets: ['settings'],
			toggles: ['sheet']
		};


	// === STAT SCORES
	arrays['stats'].forEach(attr => {
		on(`change:${attr}_score`, (eventinfo) => {
			const score = parseInt(eventinfo.newValue) || 0;

			setAttributes({attr: score * 5}, true);
		});
	});

	// === DERIVED ATTRIBUTES
	/*arrays['hit_points'].forEach(attr => {
		on(`change:${attr}`, (eventinfo) => {
			const attributes = arrays['hit_points'];
			attributes.push('hit_points');
			getAttrs(attributes, (value) => {
				const strength = parseInt(value.strength) || 0, constitution = parseInt(value.constitution) || 0; 
				const calculated = Math.ceil((strength + constitution)/2);
				let update = { hit_points_max: calculated }
				if (value.hit_points === undefined) { update['hit_points'] = calculated; }
				setAttributes(update, true);
			});
		});
	})

*/

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
	        	getAttrs(['toggles'], (value) => {
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
			getAttrs(['gm_toggle'], (value) => {
				setAttributes({gm_toggle: (v.gm_toggle.includes('gm')) ?  ' ' : '/w gm'}, true);
			});
		});

	// === SHEET VERSIONING
		on('sheet:opened', () => {
			getAttrs(['version'], (value) => { versioning(parseFloat(v.version) || 1); });
		});			

		const versioning = (version) => {
		   console.log(`%c Versioning, ${version}`, 'color: green; font-weight:bold');
		   if (version >= 1) {
				console.log(`%c Version is update to date`, 'color: orange; font-weight:bold');
		    } else {
				setAttrs({version: 1}, () => {versioning(1)});
			};
		};


