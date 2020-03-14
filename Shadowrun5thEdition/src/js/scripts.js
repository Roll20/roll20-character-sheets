
	const translations = () => {
		const attributes = sheetAttribues.translationsAttributes;
		const translations = getTranslations(attributes);
		let attribute_roll = `?{${translations[0]}`;

	    for (i = 1; i <= (attributes.length - 2); i += 1) {
	    	attribute_roll +=  `|${translations[i]},@{${attributes[i]}}`;
	    };

	    attribute_roll += `|${translations[10]},0}`; //For None

	    setAttrs({
	    	attribute_roll: attribute_roll
	    });
	}	

	//Calculate ATTRIBUTES
	sheetAttribues.calculatedAttributes.forEach(attr => {
        on(`change:${attr}_base change:${attr}_modifier change:${attr}_temp change:${attr}_temp_flag`, () => {
            getAttrs([`${attr}_base`, `${attr}_modifier`, `${attr}_temp`, `${attr}_temp_flag`], v => {
                v = processTempFlags(`${attr}_temp_flag`, `${attr}_temp`, v);
                v = parseIntegers(v);

                const base = v[`${attr}_base`], bonus = calculateBonuses(v), total = base + bonus;

                setAttrs({
                    [attr]: total,
                    [`display_${attr}`]: bonus === 0 ? base : `${base} (${total})`
                });
            });
        });
    });

	//Calculaute limts
		const update_limit = type => {
			let attrs = [`${type}_limit_modifier`, `${type}_limit_temp`, `${type}_limit_temp_flag`].concat(sheetAttribues[`${type}Limits`]);
			getAttrs(attrs, v => {
				v = processTempFlags(`${type}_limit_temp_flag`, `${type}_limit_temp`, v);
				v = parseIntegers(v);

				const bonus = calculateBonuses(v), total = calculateLimitTotal(v, type);

				setAttrs({
					[`${type}_limit`]: Math.ceil(total) + bonus
			});
			})
		};

	//This function checks changes to repeating_armor and updates the Primary Armor if needed
	on("change:repeating_armor", (eventInfo) => {
		const source = eventInfo.sourceAttribute;
		const newV   = eventInfo.newValue;
		const arm    = ["repeating_armor"];
		const armors = [`${arm}_name`, `${arm}_rating`, `${arm}_acid_modifier`, `${arm}_electrical_modifier`, `${arm}_cold_modifier`,`${arm}_fire_modifier`, `${arm}_radiation_modifier`, `${arm}_dicepool_modifier`];

		//Check if the event was related to the primary flag & armor is set to primary
		if (source.includes('primary') && newV === 'primary') {
			//Get attributes from the repeating_armor
			getAttrs(armors, (v) => {
				let update = {};
				//Update the hidden static Primary Armor attributes with the repeating_armor attributes
				_.each(armors, (armor) => {
					const name = (armor.includes("name") || armor.includes("rating")) ? armor.split("repeating_")[1] : armor.split(`${arm}_`)[1];
					update[`${name}`] = v[`${armor}`];
            	});

            	setAttrs(update);
            });

			//Set the other repeating_armor primary flags to 0 aka unchecked
            getSectionIDs(`${arm}`, function(ids) {
				let IDs    = [];
				let update = {};

		        for(var i=0; i < ids.length; i++) {
		            IDs.push(`${arm}_` + ids[i] + "_primary");
	        	};

	        	IDs.forEach(id => {
	        		if (id != source) {
	        			update[`${id}`] = 0;
	        		};
	        	});

	        	setAttrs(update);
	        });
		//Check if the event was for a relevant Primary Armor attribute
		} else if (source.includes('name') || source.includes('rating') || source.includes('dicepool') || source.includes('acid') || source.includes('cold') || source.includes('electrical') || source.includes('fire') || source.includes('radiation')) {
			//Get the primary flag attribute for this armor. Also get the repeating_armor attribute we'll need for an update, doing it now is more efficient.
			getAttrs([`${arm}_primary`, `${source}`], (v) => {
				//Check if this armor is the designated Primary Armor.
				if (v[`${arm}_primary`] === 'primary') {
					let update = {};
					//Apply the repeating_armor attribute to its static counterpart
					switch (true) {
						case /name/.test(source)      : update["armor_name"] = v[`${source}`]; break;
						case /rating/.test(source)    : update["armor_rating"] = v[`${source}`]; break;
						case /dicepool/.test(source)  : update["soak_modifier"] = v[`${source}`]; break;
						case /acid/.test(source)      : update["acid_modifier"] = v[`${source}`]; break;
						case /cold/.test(source)      : update["cold_modifier"] = v[`${source}`]; break;
						case /electrical/.test(source): update["electrical_modifier"] = v[`${source}`]; break;
						case /fire/.test(source)      : update["fire_modifier"] = v[`${source}`]; break;
						case /radiation/.test(source) : update["radiation_modifier"] = v[`${source}`]; break;
						default: console.log(`Source  ${source} was invalid`);}

					setAttrs(update);
				};
			});
		} else {
			console.log("CHANGE NOT RELEVENT Primary Armor");
		};
	});

	// COMMON ROLLS: MEOMORY, JUDGE INTETIONS, COMPOSURE, LIFT & CARRY, OVERFLOW, DEFENSE, & SOAK ROLLS
	const update_common_rolls = (attrs) => {
		getAttrs(attrs, (v) => {
			const found = attrs.find(mod => { return mod.includes("_modifier") });
			const name  = found.split("_modifier")[0];
			let numbers = [];

			//DEFENSE & SOAK HAVE TWO EXTRA ATTRIBUTES. TEMP IS NEEDED BUT ONLY IF THE FLAG IS CHECKED IN SETTINGS
			const array = name === "defense" || name === "soak" ? (v[`${name}_temp_flag`] === "on") ? attrs.splice(0, 4) : attrs.splice(0, 3) : attrs;

			_.each(array, (attr) => { 
				numbers.push(parseInt(v[`${attr}`]) || 0); 
			});
        	const add = (a, b) => a + b, sum = numbers.reduce(add);

			setAttrs({[`${name}`]: sum});
		});
	};

	//Calculate Movement Rates
		var update_movement = () => {
			getAttrs(["agility", "walk_modifier", "run_modifier"], (v) => {
				const agi = parseInt(v.agility) || 0, wmod = parseInt(v.walk_modifier) || 0, rmod = parseInt(v.run_modifier) || 0;
				let update = {};
				update["walk"] = (agi * 2) + wmod;
				update["run"] = (agi * 4) + rmod;
				setAttrs(update);
			});
		};

	//Update condition tracks
	const update_track = track => {
		let attrs = [`${track}_modifier`];
		track === "stun" ? attrs.push("willpower") : attrs.push("body", "sheet_type", "flag_drone");

		getAttrs(attrs, v =>{
			const stat = parseInt(v[`${attrs[1]}`]) || 0; //Willpower or Body
			const mod = parseInt(v[`${track}_modifier`]) || 0;
			let update = {};

			if (track === "stun" || v["sheet_type"] === "pc" || v["sheet_type"] === "grunt") {
				tot = Math.ceil(stat/2) + 8 + mod;
			} else if (v["sheet_type"] === "vehicle" && v["flag_drone"]  === "drone") {
				tot = (Math.ceil(stat/2) + 6 + mod);
			} else if (v["sheet_type"] === "vehicle") {
				tot = (Math.ceil(stat/2) + 12 + mod);
			} else {
				tot = 0; //Sprites don't have Stun or Physical track
			};

			update[`${track}_max`] = tot;

			setAttrs(update, {silent:true});
		});
	};

	//Calculate Device Rating Track
	const updateMatrixMaximum = () => {
		getAttrs(["device_rating","matrix_modifier"], (v) => {
			v = parseIntegers(v);

			setAttrs({
				matrix_max: Math.ceil(v.device_rating/2) + 8 + v.matrix_modifier
			});
		});
	};

	const update_wounds = () => {
		getAttrs(sheetAttribues.woundCalculation, v => {
			v = parseIntegers(v);

	       	const divisor  = v.low_pain_tolerance === 2 ? v.low_pain_tolerance : 3;
	       	const highPain = v.high_pain_tolerance >= 1 ? v.high_pain_tolerance : 0;
	       	let sum = 0;

	       	["stun", "physical"].forEach(attr => {
	       		let dividend = v[`${attr}`];
	       		dividend -= highPain + v[`damage_compensators_${attr}`]
	       		sum -= dividend > 0 ? Math.floor(dividend / divisor) : Math.floor(0 / divisor)
			});

			setAttrs({
				wounds: sum
			});
		});
	};

	//Calculate Initiatves
	const update_initiative = () => {
		getAttrs(["reaction", "intuition", "initiative_modifier", "initiative_temp", "initiative_temp_flag"], v => {
			v = processTempFlags(`initiative_temp_flag`, `initiative_temp`, v);
            v = parseIntegers(v);
            const base = v.reaction + v.intuition, bonus = calculateBonuses(v), total = base + bonus;

			setAttrs({
				["initiative_mod"]: total,
				["display_initiative_mod"]: bonus === 0 ? base : `${base} (${total})`
			});
		});
	};

	const updateInitiative = () => {
		getAttrs(["initiative_dice_modifier", "edge_toggle", "initiative_dice_temp", "initiative_dice_temp_flag"], v => {
			const edgeFlag = v.edge_toggle === "@{edge}" ? true : false;

			v = processTempFlags(`initiative_dice_temp_flag`, `initiative_dice_temp`, v);
			v = parseIntegers(v);

			const bonus = calculateBonuses(v), total = Math.min(bonus+1,5);
			setAttrs({
				initiative_dice: edgeFlag ? 5 : total
			});
		});
	};

	//Calculate Astral Initiatve
	const updateAstralInitiative = () => {
		getAttrs(["intuition", "astral_mod_modifier"], v => {
			v = parseIntegers(v);
			const base = v.intuition * 2, bonus = v.astral_mod_modifier, total = base + bonus;

			setAttrs({
				["astral_mod"]: total,
				["display_astral_mod"]: bonus === 0 ? base : `${base} (${total})`
			});
		});
	};

	const updateAstralInitiativeDice = () => {
		getAttrs(["astral_dice_modifier", "edge_toggle"], v => {
			const edgeFlag = v.edge_toggle === "@{edge}" ? true : false;
			const bonus = parseInt(v.astral_dice_modifier) || 0;

			setAttrs({
				astral_dice: edgeFlag ? 5 : Math.min(bonus+3,5)
			});
		});
	};

	//Calculate Matrix Initiatve.
	const updateMatrixInitiative = () => {
		getAttrs(["sheet_type", "data_processing", "pilot", "intuition", "matrix_mod_modifier", "host_rating", "level", "matrix_dice_modifier", "edge_toggle"], v => {
			const sheetType = v.sheet_type;
			const edgeFlag = v.edge_toggle === "@{edge}" ? true : false;

			v = parseIntegers(v);

			let base = v.data_processing;
			base += sheetType === "sprite" ? v.level : sheetType === "vehicle" ? v.pilot : sheetType === "host" ? v.host_rating : v.intuition;

			const total = base + v.matrix_mod_modifier;

			setAttrs({
				["matrix_mod"]: total,
				["matrix_dice"]: sheetType === "grunt" && edgeFlag ? 5 : sheetType === "grunt" && !edgeFlag ? 4 + v.matrix_dice_modifier : 4,
				["display_matrix_mod"]: v.matrix_mod_modifier === 0 ? base : `${base} (${total})`
			});
		});
	};

	//Edge toggle to include ! for exploding dice
	const edgeToggle = eventinfo => {
		setAttrs({
			explode_toggle: eventinfo.newValue != 0 ? "!" : ""
		});
	};

	//Calculate Reset Condition Track
	on("clicked:cond_reset", () => {
		setAttrs({
			physical: 0,
			stun: 0,
			matrix: 0
		});
	});	

	const resetConditionTrack = eventinfo => {
		const attr = eventinfo.triggerName.split("_").pop();
		setAttrs({
			[`${attr}`] : 0
		});	
	}

//Weapon displays set into an Array
	// Builder function to display details properly
	// Note that since undefined are falsey if there's no label or sign we can leave the parameters blank
	function repeatingStringBuilder(v, keyBase) {
	    return function(key, label, sign) {
	        // fetch the attr from v checking if it has a value
	        const val = v[`${keyBase}${key}`];
	        if (!val) return '';

	        // Apply the sign if needed
	        const disp = sign && val > 0 ? `+${val}` : val;

	        // Apply label if needed
	        return label ? `${label} ${disp}` : disp;
	    }
	}

	on("change:repeating_weapon", () => {
		const source = "repeating_weapon_weapon";
	    getAttrs([`${source}_range`, `${source}_type`, `${source}_reach`, `${source}_acc`, `${source}_dv`, `${source}_ap`, `${source}_mode`, `${source}_rc`, `${source}_ammo`, `${source}_note`, `${source}_primary`], (v) => {
	        // Local builder putting the needed variables into scope for repeatingStringBuilder
	        const b = repeatingStringBuilder(v, `${source}_`);
	        // Determine fields to display and in their proper order and formatting
	        // Anonymous function is purely stylistic and adds more overhead than just a simple switch/case.  Personally I find the function looks cleaner and hides any internal scope that might conflict with outside
	        const display = (() => {
	            // 0 for weapon_range is a ranged weapon. A 1 is a melee weapon.
	            switch(v.repeating_weapon_weapon_range) {
	                case '0':
	                // Not a fan of how ammo has to be handled.  Could potentially be placed in the repeatingStringBuilder if used more often for other change:repeating functions as some sort of suffix parameter
	                const ammo = b('amm');
	                return [
	                    b('type'),
	                    b('acc', 'ACC'),
	                    b('dv', 'DV'),
	                    b('ap', 'AP', true),
	                    b('mode'),
	                    b('rc', 'RC'),
	                    ammo ? `${ammo} (c)` : '',
	                    b('note')
	                ];
	                case '1': return [
	                    b('type'),
	                    b('reach', 'Reach', true),
	                    b('acc', 'ACC'),
	                    b('dv', 'DV'),
	                    b('ap', 'AP', true),
	                    b('note')
	                ];
	                default: return [
	                    b('type'),
	                    b('acc', 'ACC'),
	                    b('dv', 'DV'),
	                    b('ap', 'AP', true),
	                    b('note')
	                ];
	            }
	        })()
	            // Remove all empty strings
	            .filter(s => s)
	            // Concat all the strings and add comma between
	            .join(', ');

	        let update = {};
	        update[`${source}`] = `[${display}]`;

	        // Finally wrap square brackets around the weapon display
	        setAttrs(update);
	    });
	});


	//Spell displays set into an Array
		on("change:repeating_NPCspell", () => {
		    getAttrs(["repeating_NPCspell_combat_type", "repeating_NPCspell_type", "repeating_NPCspell_range", "repeating_NPCspell_damage", "repeating_NPCspell_duration", "repeating_NPCspell_drain", "repeating_NPCspell_note"], (v) =>{
		        const com = v.repeating_NPCspell_combat_type;
		        const typ = `Type ${v.repeating_NPCspell_type}, `;
				const ran = `${v.repeating_NPCspell_range}, `;
				const dam = `Damage ${v.repeating_NPCspell_damage}, `;
				const dur = `Duration ${v.repeating_NPCspell_duration}, `;
				const not = `, ${v.repeating_NPCspell_note}`;
				const dra = v.repeating_NPCspell_drain;

				const drain = (dra > 0) ? `F+${dra} ` : (dra < 0) ? `F${dra} ` :"F ";
				const info = `[${typ}${ran}${dam}${dur}${drain}${not}]`;

				display = (com === "Direct, Force ") ? ` (Direct) ${info}` : 
					(com === "Indirect, Force ?{Force|}, AP -") ? ` (Indirect) ${info}` : `${info}`;
		        setAttrs({repeating_NPCspell_spell: display});
		    });
		});

	//Complex Form displays  set into an Array
		on("change:repeating_form", () => {
		    getAttrs(["repeating_form_form_duration", "repeating_form_form_target", "repeating_form_form_fade", "repeating_form_form_note", ], (v) =>{
		    	const tar = `Target ${v.repeating_form_form_target}, `;
				const dur = `Duration ${v.repeating_form_form_duration}, `;
				const not = `, ${v.repeating_form_form_note}` || '';
				const fad = (v.repeating_form_form_fade > 0) ? `L+${v.repeating_form_form_fade}` : 
							(v.repeating_form_form_fade < 0) ? `L${v.repeating_form_form_fade}` : "L";

		        setAttrs({
		        	repeating_form_form: ` [${tar}${dur}${fad}${not}]`
		        });
		    });
		});

	//IC displays are set into an Array
		on("change:repeating_IC", () => {
		    getAttrs(["attack", "data_processing", "repeating_IC_IC_limit", "repeating_IC_IC_attribute", "repeating_IC_IC_matrix", "repeating_IC_IC_note"], (v) =>{
		    	const att = parseInt(v.attack) || 0;
		    	const data = parseInt(v.data_processing) || 0;
				const attr = v.repeating_IC_IC_attribute;
				const mat = v.repeating_IC_IC_matrix;
				const not = v.repeating_IC_IC_note;

		        setAttrs({
		        	repeating_IC_IC: (v.repeating_IC_IC_limit === "@{data_processing}") ? ` ([${data}] vs. ${attr} + ${mat}, ${not})` : `([${att}] vs. ${attr} + ${mat}, ${not})`
		        });
		    });
		});

	//IC  Attack Dice & Condition Track
		on("change:host_rating", () => {
			getAttrs(["host_rating"], (v) => {
				var hos = parseInt(v.host_rating) || 0;
				var tot = 8 + Math.ceil(hos/2);
				var atk = Math.min(hos + hos);

				setAttrs({matrix: tot});
				setAttrs({ic_attack: atk});
			});
		});

	//Sprite Condition Track
		on("change:level", () => {
			getAttrs(["level"], (v) => {
				var lev = parseInt(v.level) || 0;
				var tot = 8 + Math.ceil(lev/2);

				setAttrs({matrix: tot});
			});
		});

	//REFACTORED Skills
  	sheetAttribues.repeatingSkills.forEach(field => {
        on(`change:repeating_${field}`, eventinfo => { 
			const source = eventinfo.sourceAttribute;
			const type   = eventinfo.sourceType;
        	if (source.includes("rating")) {
        		getAttrs([`${field}_rating`, `${field}_rating_modifier`], (v) => {
        			const bas = parseInt(v[`${field}_rating`]) || 0;
					const mod = parseInt(v[`${field}_rating_modifier`]) || 0;
					const tot = bas + mod;
                    setAttrs({
                        [`${field}_dicepool`]: tot,
                        [`${field}_display_rating`]: (mod === 0) ? bas : `${bas} (${tot})`
                    });
        		});
        	} else if (source.includes("attribute") && type === "player") {
        		getAttrs([`${source}`], (v) => {
					const attribute   = v[`${source}`].slice(2, -1);
					const translation = getTranslationByKey(`${attribute}`);
        			setAttrs({
                       [`${field}_display_attribute`]: translation
                    });
        		});
        	} else if (source.includes("limit") && type === "player") {
        		const limit = eventinfo.newValue.slice(2, -1);
        		if (eventinfo.newValue === "none") {
        			setAttrs({
	                   [`${field}_display_limit`]: ""
	                });
        		} else {
					const translation = getTranslationByKey(`${limit}`);
        			setAttrs({
                       [`${field}_display_limit`]: `${translation} ${eventinfo.newValue}`
                    });
        		}
        	} else if (source.includes("specialization") && type === "player")  {	
        		getAttrs([`${source}`], (v) => {
					const bas   = v[`${source}`];
					const size  = bas.length;
					let display = (size > 0 && size <= 20) ? `(${bas})` : (size > 20 ) ? "(" + bas.slice(0, 20) + "...)" : " ";
        			setAttrs({
                       [`${field}_display_specialization`]: display
                    });
        		});
        	} else if (source.includes("skill") && type === "player") {
                getAttrs([`${source}`], (v) => {
					const bas   = v[`${source}`];
					const size  = bas.length;
					let display = (size > 0 && size <= 20) ? bas : (size > 20 ) ? bas.slice(0, 20) + "..." : " ";
                    setAttrs({
                       [`${field}_display`]: display
                    });
                });
            } else if (source.includes("dicepool") && type === "player") {
                getAttrs([`${source}`, `${field}_skill`], (v) => {
					const skill     = v[`${field}_skill`];
					let lowercase   = skill.toLowerCase();
					let removeGroup = (lowercase.includes("group")) ? lowercase.slice(0, -6) : lowercase;
					let skillSet    = (removeGroup.includes(" ")) ? removeGroup.replace(/ /g,"") : removeGroup;
                    setAttrs({
                       [`${skillSet}`]: v[`${source}`]
                    });
                });
        	}  else  {
        		console.log(`Change to ${field} did not set attr`);
        	};
        });
    }); 


   	//Setting the Default attribute name for default skill
	on("change:default_attribute", (eventinfo) => {
		getAttrs(["default_display"], v => {
			const display   = (v.default_display);
			let update      = {};

			//This sets a hidden input with the Attribute name so the roll template can use it to indicate what attribute was rolled
			const attribute   = eventinfo.newValue.slice(2, -1);
			const translation = getTranslationByKey(`${attribute}`);
			if (translation != display) {
				setAttrs({
					default_display: translation
				});
			};
		});
	});

	//REFACTORED Range & MELEE UPDATES
	   ['repeating_range','repeating_melee'].forEach(weap => {
	        on(`change:${weap}`, (eventInfo) => {
				const source = eventInfo.sourceAttribute;
				const newV   = eventInfo.newValue;
				const type   = weap.slice(-5);

	            //Setting this here for now to ensure dicepool attribute gets updated. Remove in a future update
	        	getAttrs([`${weap}_dicepool_modifier`, `${weap}_spec`], (v) => {
	        		const mod = parseInt(v[`${weap}_dicepool_modifier`]) || 0;
					const spec = parseInt(v[`${weap}_spec`]) || 0;
					const tot = mod + spec;

					setAttrs({[`${weap}_dicepool`]: tot});
	        	});

	            if (source.includes('primary')) {
	                if (newV === 'primary') {
	                	//Shared attributes names. 
	                	let array = ["dicepool", "weapon", "damage", "acc", "ap", "skill"];
	                	//Add the range or melee specific ones
	                	(type === "range") ? array.push("ammo", "ammo_max", "mode", "recoil") : array.push("reach");
	                	//Add the repeating section to the begining of each attribute
	                	let attrs = [];
				        for(var i=0; i < array.length; i++) {
				            attrs.push(`${weap}_` + array[i]);
			        	};

		                getAttrs(attrs, (v) => {
		                	let update = {};
		                	//Primary weapon name does not follow the naming scheme.
		                	update[`primary_${type}_weapon`] = v[`${weap}_weapon`];

		                	_.each(array, (value) => {
		                		if (value != undefined || value != "weapon") {
		                			update[`primary_${type}_weapon_${value}`] = (value === "ammo_max") ? v[`${weap}_ammo`] : v[`${weap}_${value}`];
		                		};
		                	});

		                	setAttrs(update);
		                });

						//Set the other repeating_weapon primary flags to 0 aka unchecked
			            getSectionIDs(`${weap}`, function(ids) {
					        let IDs = [];
					        let update = {};

					        for(var i=0; i < ids.length; i++) {
					            IDs.push(`${weap}_` + ids[i] + "_primary");
				        	};

				        	IDs.forEach(id => {
				        		if (id != source) {
				        			update[`${id}`] = 0;
				        		};
				        	});

				        	setAttrs(update);
				        });
		            };
	           	} else if (source.includes('dicepool') || source.includes('weapon') || source.includes('damage') || source.includes('acc') || source.includes('ap') || source.includes('skill') || source.includes('reach') || source.includes('ammo') || source.includes('mode') || source.includes('recoil')) {
					getAttrs([`${weap}_primary`, `${source}`], (v) => {
						if (v[`${weap}_primary`] === 'primary') {
							let update = {};
							//This whole process needs refactored in the future. Its working for now.
							if (source.includes('ammo')) {
								update[`primary_${type}_weapon_ammo`]     = v[`${source}`];
								update[`primary_${type}_weapon_ammo_max`] = v[`${source}`];
							} else {
								console.log(eventinfo);
							};

							setAttrs(update);
						};
					});
	            } else {
	                 console.log("Change was not relevant.");
	            };
	        });
	    });

	//PC SPELLS/PREPS/RITUALS
	  	['repeating_spell','repeating_preps','repeating_ritual'].forEach(field => {
	        // Attach listener
	        on(`change:${field}`, (eventInfo) => {
	        	const source = eventInfo.sourceAttribute;
	        	if (source.includes("dicepool") || source.includes("specialization")) {
	        		getAttrs([`${field}_specialization`, `${field}_dicepool_modifier`], v => {
	        			v = parseIntegers(v);
	                    setAttrs({
	                        [`${field}_dicepool`]: v[`${field}_specialization`] + v[`${field}_dicepool_modifier`]
	                    });
	        		});
	        	}  else  {
	        		console.log(`Change to ${field} did not set attr`);
	        	};
	        });
	    });

	//Repeating contacts for PC sheet
		on("change:repeating_contacts", () => {
			getAttrs(["repeating_contacts_name"], (v) => {
				const name = (v.repeating_contacts_name);

				((name).length > 0 && (name).length <= 30) ? setAttrs({repeating_contacts_display: (name)}) : 
					((name).length > 30) ? setAttrs({repeating_contacts_display: (name).slice(0, 30) + "..."}) :
					setAttrs({repeating_contacts_display: " "});
			});
		});


	//Cyberdeck Calculations
	 	['attack', 'sleaze', 'data_processing', 'firewall'].forEach(attr => {
	        on(`change:${attr}_base change:${attr}_modifier change:${attr}_temp`, () => {
	            update_common_rolls([`${attr}_base`, `${attr}_modifier`, `${attr}_temp`]);
	        });
	    });

	   ['acceleration', 'armor', 'body', 'data_processing', 'handling', 'pilot', 'sensor','speed'].forEach(attr => {
	        // Attach listener
	        on(`change:repeating_vehicle:${attr}_base change:repeating_vehicle:${attr}_modifier change:repeating_vehicle:${attr}_temp`, () => {
	            // Load attribute values
	            getAttrs([`repeating_vehicle_${attr}_base`, `repeating_vehicle_${attr}_modifier`, `repeating_vehicle_${attr}_temp`], (v) => {
	                // Do some math to calculate the total
	                const bas = parseInt(v[`repeating_vehicle_${attr}_base`]) || 0;
	                const mod = parseInt(v[`repeating_vehicle_${attr}_modifier`]) || 0;
	                const tem = parseInt(v[`repeating_vehicle_${attr}_temp`]) || 0;
	                const bon = mod + tem;
	                const stat = bas + bon;

	                // Update the finalized total
	                setAttrs({
	                    [attr]: stat,
	                    [`repeating_vehicle_display_${attr}`]: bon === 0 ? bas : `${bas} (${stat})`
	                }, {silent: true});
	            });
	        });
	    });
