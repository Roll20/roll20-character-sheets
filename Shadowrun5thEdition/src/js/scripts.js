
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

	const updateInitiativeDice = () => {
		getAttrs(["initiative_dice_modifier", "edge_toggle", "initiative_dice_temp", "initiative_dice_temp_flag"], values => {
      console.log(values)
			const edgeFlag = values.edge_toggle === "@{edge}" ? true : false;

			values = processingFunctions.shadowrun.processTempFlags(values)
			values = processingFunctions.parseIntegers(values)

			const bonus = processingFunctions.shadowrun.calculateBonuses(values)
      const total = Math.min(values.bonus+1,5);
			setAttrs({
				initiative_dice: edgeFlag ? 5 : total
			});
		});
	};

	//Calculate Astral Initiatve
	const updateAstralInitiative = () => {
		getAttrs(["intuition", "astral_mod_modifier"], v => {
			v = processingFunctions.parseIntegers(v);
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

			v = processingFunctions.parseIntegers(v);

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
