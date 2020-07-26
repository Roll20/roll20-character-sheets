	// === ATTRIBUTE ARRAYS
	// note: I had the underscore in front of the arrays key to distinguish it from the name of the attribute
		const arrays = {
			_stats: ['strength', 'constitution', 'dexterity', 'intelligence', 'power', 'charisma'],
			_hit_points: ['strength_score', 'constitution_score'],
			_sanity_points: ['power_score'], //ALSO USED FOR BREAKING POINTS
			_willpower_points: ['power_score'],
			_toggles: ['settings']
		};

		
	// VERSIONING
	on("sheet:opened", function() {
		getAttrs(['version'], function(v) {
			if(v.version != '1.05') {
				let update={version: '1.05',
							 initial_san: 0,
							 initial_hp:  0,
							 initial_str: 0,
							 initial_con: 0
				}
				setAttributes(update, true);
			}
		});
	});
	// === SHARED FUNCTIONS
	const setAttributes = (update, silent) => { 
		(silent === true) ? setAttrs(update, {silent:true}) : setAttrs(update); 
	};

	// === STAT SCORES
	arrays['_stats'].forEach(attr => {
		on(`change:${attr}_score`, (eventinfo) => {
			const score = parseInt(eventinfo.newValue) || 0;
			setAttributes({[`${attr}`]: score * 5}, true);
		});
	});

	// === HIT POINTS
	// First time player set you
	arrays['_hit_points'].forEach(attr => {
		on(`change:${attr}`, (eventInfo) => {
			// Check if STR or CON has been changed, if changed the relative initial flag is set to 0
			if (eventInfo.sourceAttribute === 'strength_score'){
				setAttributes({initial_str:0}, true);
			} else if (eventInfo.sourceAttribute === 'constitution_score'){
				setAttributes({initial_con:0}, true);
			}
			getAttrs(['initial_str','initial_con','initial_hp'],function(v){
				let flag1=(parseInt(v.initial_con)||0);
				let flag2=(parseInt(v.initial_str)||0);
				// This flag is 0 if both CON and STR has been initialized, otherwise it is 1
				let flag_stats = flag1+flag2;
				// This flag is 0 if the initial value for current hp has already been initialized, otherwise it is 1
				let flag_hp=(parseInt(v.initial_hp)||0);
				if (flag_stats == 0){
					const attributes = arrays['_hit_points'].concat(['hit_points']);
					if (flag_hp == 1){
						getAttrs(attributes, (values) => {
							const strength = parseInt(values.strength_score) || 0, constitution = parseInt(values.constitution_score) || 0; 
							const calculated = Math.ceil((strength + constitution)/2);
							let update = {
								hit_points_max: calculated,
								hit_points    : calculated,
								initial_hp    : 0
							}
							setAttributes(update, true);
						});
					} else {
						getAttrs(attributes, (values) => {
							const strength = parseInt(values.strength_score) || 0, constitution = parseInt(values.constitution_score) || 0; 
							const calculated = Math.ceil((strength + constitution)/2);
							let update = {
								hit_points_max: calculated
							}
							setAttributes(update, true);
						});
					}
					
				} 
			});
		});
	});

	
	// === WILLPOWER POINTS
	arrays['_willpower_points'].forEach(attr => {
		on(`change:${attr}`, (eventinfo) => {
			const attributes = arrays['_willpower_points'].concat(['willpower_points']);
			getAttrs(attributes, (values) => {
				const calculated = parseInt(values.power_score) || 0; 
				let update = { 
					willpower_points_max: calculated 
				}
				setAttributes(update, true);
			});
		});
	});

	// === SANITY POINTS & BREAKING POINT
	arrays['_sanity_points'].forEach(attr => {
		on(`change:${attr}`, (eventinfo) => {
			const attributes = arrays['_sanity_points'].concat(['sanity_points', 'breaking_point','initial_san']);
			getAttrs(attributes, (values) => {
				const flag_initial_san=parseInt(values.initial_san)||0,zero=0;
				// Only updated the BP and Current Sanity if it is a new character
				if (flag_initial_san==1){
					const power = parseInt(values.power_score) || 0, calculatedSanity = power*5, calculatedBreakingPoint = power*4; calculatedWillPower = power; 
					let update = { 
						willpower_points: calculatedWillPower,
						sanity_points: calculatedSanity,
						breaking_point: calculatedBreakingPoint,
						breaking_point_max: calculatedBreakingPoint,
						initial_san:zero
					}
					setAttributes(update, true);
				}
			});
		});
	});
	// new function to compute san point max
	on("sheet:opened change:unnatural", function() {
		getAttrs(['unnatural'], function(values) {
			setAttrs({sanity_points_max: 99-Math.floor(values.unnatural)});
		});
	});
	
	// === TOGGLE INPUT SETTINGS
    arrays['_toggles'].forEach(attr => {
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

// UPDATE THE VALUE OF THE BOND IN THE REPEATING SECTION WHEN CREATED
	on("change:repeating_bonds",function(){
		getAttrs(["repeating_bonds_flag","charisma_score"],function(value){
			if (value["repeating_bonds_flag"]==0){
				let update={
							repeating_bond_score:value["charisma_score"],
							repeating_bond_flag:1
							}
				setAttributes(update,true);
			}
		});
	});
