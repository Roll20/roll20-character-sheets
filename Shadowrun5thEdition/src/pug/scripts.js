<script type="text/worker">

//Sheet open versioning
	on("sheet:opened", function() {
		getAttrs(["version"], (v) => { versioning(parseFloat(v.version) || 1); });

		let translations = [];
		let attributes = ["attribute", "body", "agility", "reaction", "strength", "willpower", "logic", "intuition", "charisma", "edge", "none"];
		attributes.forEach((attribute) => {
			translations.push(getTranslationByKey(attribute));
		});

		let attribute_roll = `?{${translations[0]}`;
	    for (i = 1; i <= (attributes.length - 2); i += 1) {
	    	attribute_roll +=  `|${translations[i]},@{${attributes[i]}}`;
	    };
	    attribute_roll += `|${translations[10]},0}`; //For None

	    setAttrs({
	    	attribute_roll: attribute_roll
	    });
	});			

    const versioning = (version) => {
    	console.log(`%c Shadowrun 5th Edition versioning, ${version}`, "color: blue; font-weight:bold");
       if (version >= 1.41) {
			console.log(`%c Shadowrun 5th Edition is update to date`, "color: red; font-weight:bold");
       	} else if (version >= 1.4) {
       		const toggles = [`wound_toggle`, `edge_toggle`, `modifier_toggle`];
			getAttrs(toggles, (v) => {
				let set = {};
				toggles.forEach(attr => {
					const name = attr.split("_")[0], value = v[`${attr}`].toString();
					(value != "0" || !value.includes(name)) ? set[`${attr}`] = 0 : false;
				});
				setAttrs(set);
			});
       		setAttrs({version: 1.41}, () => {versioning(1.41)});
        } else if (version >= 1.35) {
        	getAttrs(["sheet_type"], (v) => {
        		let update = {};
        		(v.sheet_type === "goon") ? update["sheet_type"] = "grunt" : false;
        		setAttrs(update);
        	});
            setAttrs({version: 1.36}, () => {versioning(1.4)});
        } else {
			setAttrs({version: 1.35}, () => {versioning(1.35)});
		};
    };

    on("clicked:shots_remove clicked:shots_add", (eventinfo) => {
    	getAttrs([`shots_fired`], (v) => {
    		let shots = parseInt(v[`shots_fired`]) || 0;
    		const trigger = eventinfo.triggerName;
			setAttrs({
				shots_fired: (shots > 0 && trigger.includes("remove")) ? shots -= 1 : trigger.includes("add") ? shots += 1 : shots
			});
		});
	});

    on("clicked:primary_ammo", (eventinfo) => {
    	getAttrs([`primary_range_weapon_ammo`, `shots_fired`], (v) => {
			let ammo  = parseInt(v[`primary_range_weapon_ammo`]) || 0;
			const shots = parseInt(v[`shots_fired`]) || 0;
			setAttrs({
				primary_range_weapon_ammo: ammo -= shots
			});
		});
	});

   on("clicked:reload", (eventinfo) => {
    	getAttrs([`primary_range_weapon_ammo_max`], (v) => {
			const reload  = parseInt(v[`primary_range_weapon_ammo_max`]) || 0;
			setAttrs({
				primary_range_weapon_ammo: reload
			});
		});
	});

	["active", "knowledge", "language"].forEach((attr) => {
		on(`clicked:repeating_${attr}:skill`, (eventinfo) => {
			settingsToggle(eventinfo);
		}); 
	});

	["quality", "martial", "items", "range", "melee", "armor", "spell", "preps", "ritual", "powers", "forms", "vehicle", "augementations", "lifestyle", "contacts", "programs"].forEach((attr) => {
		on(`clicked:repeating_${attr}:${attr}`, (eventinfo) => {
			settingsToggle(eventinfo);
		}); 
	});

	const settingsToggle = (eventinfo) => {
		const split = eventinfo.sourceAttribute.split("_");
		const source = `${split[0]}_${split[1]}_${split[2]}`;
		getAttrs([`${source}_flag`], (v) => {
			setAttrs({
				[`${source}_flag`]: (v[`${source}_flag`] === "settings") ? "display" : "settings"
			});
		});
	};

	on("clicked:whisper", (eventinfo) => {
		getAttrs([`gm_toggle`], (v) => {
			setAttrs({
				gm_toggle: (!v.gm_toggle.includes("gm")) ? "/w gm" : " "
			});
		});
	});  

   [`core`, `arms`, `augs`, `gear`, `magic`, `matrix`, `social`, `vehicle`, `options`].forEach(attr => {
   		on(`clicked:tab_${attr}`, () => {
   			console.log(`%c The button clicked was tab_${attr} update tab to ${attr}`, "color:purple;");
   			setAttrs({tab: attr});
   		});
   });

	//Watch for Updates and Run the needed functions
		on("change:agility change:walk_modifier change:run_modifier", () => {
			update_movement();
		});

		on("change:body change:strength change:lift_carry_modifier", (eventinfo) => {
			const source = eventinfo.sourceAttribute;
			update_common_rolls(["body", "strength", "lift_carry_modifier"]);
			//STRENGTH & BODY RUN THIS
			(source.includes("strength") || source.includes("body")) ? update_limit("physical") : false;
			//ONLY RUN ON BODY CHANGE
			if (source.includes("body")) {
				update_common_rolls(["body", "overflow_modifier"]);
				update_common_rolls(["body", "armor_rating", "soak_modifier", "soak_temp", `soak_temp_flag`]);
				update_track("physical");
			};
		});

		on("change:reaction change:intuition", (eventinfo) => {
			const source = eventinfo.sourceAttribute;
			update_common_rolls(["reaction", "intuition", "defense_modifier", "defense_temp", `defense_temp_flag`]);
			update_initiative();
			//REACTION UPDATES PHYSICAL, INTUITION UPDATES MENTAL
			(source.includes("reaction")) ? update_limit("physical") : update_limit("mental");
			//ONLY RUN ON INTUITION CHANGE
			(source.includes("intuition")) ? update_common_rolls(["charisma", "intuition", "judge_intentions_modifier"]) : false;
		});

		on("change:willpower", () => {
			update_common_rolls(["charisma", "willpower", "composure_modifier"]);
			update_common_rolls(["logic", "willpower", "memory_modifier"]);
			update_track("stun");
			update_limit("social");
			update_limit("mental");
		});

		on("change:logic change:memory_modifier", (eventinfo) => {
			const source = eventinfo.sourceAttribute;
			update_common_rolls(["logic", "willpower", "memory_modifier"]);
			//LOGIC UPDATES LIMIT
			(source.includes("logic")) ? update_limit("mental") : false;
		});

		on("change:charisma change:composure_modifier change:judge_intentions_modifier", (eventinfo) => {
			const source = eventinfo.sourceAttribute;
			//CHARISMA & COMPOSURE UPDATE COMPOSURE
			(source.includes("charisma") || source.includes("composure")) ? update_common_rolls(["charisma", "willpower", "composure_modifier"]) : false;
			//CHARISMA & JUDGE INTENTIONS UPDATE JUDGE INTENTIONS
			(source.includes("charisma") || source.includes("judge")) ? update_common_rolls(["charisma", "intuition", "judge_intentions_modifier"]) : false;
			//ONLY CHARISMA UPDATES SOCIAL LIMIT
			(source.includes("charisma")) ? update_limit("social") : false;
		});

		on("change:essence", () => {
			update_limit("social");
		});

		on("change:physical_modifier change:flag_drone", () => {
			update_track("physical");
		});

		on("change:stun_modifier", () => {
			 update_track("stun");
		});

		on("change:initiative_modifier change:initiative_temp change:initiative_temp_flag", () => {
			update_initiative();
		});

		on("change:defense_modifier change:defense_temp change:defense_temp_flag", () => {
			update_common_rolls(["reaction", "intuition", "defense_modifier", "defense_temp", `defense_temp_flag`]);
		});

		on("change:armor_rating change:soak_modifier change:soak_temp change:soak_temp_flag", () => {
			update_common_rolls(["body", "armor_rating", "soak_modifier", "soak_temp", `soak_temp_flag`]);
		});

		on("change:mental_limit_modifier change:mental_limit_temp change:mental_limit_temp_flag change:physical_limit_modifier change:physical_limit_temp change:physical_limit_temp_flag change:social_limit_modifier change:social_limit_temp change:social_limit_temp_flag",  (eventinfo) => {
			const type = eventinfo.sourceAttribute.split("_")[0]; update_limit(type);
		});

		on("change:pain_tolerance", () => {
			update_wounds();
		});

	//Calculate ATTRIBUTES
	   ['body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition','charisma','magic', 'resonance',
	    ].forEach(attr => {
	        // Attach listener
	        on(`change:${attr}_base change:${attr}_modifier change:${attr}_temp change:${attr}_temp_flag`, () => {
	            // Load attribute values
	            getAttrs([`${attr}_base`, `${attr}_modifier`, `${attr}_temp`, `${attr}_temp_flag`], (v) => {
	                // Do some math to calculate the total
		            const bas = parseInt(v[`${attr}_base`]) || 0;
		            const mod = parseInt(v[`${attr}_modifier`]) || 0;
	              	const tem = (v[`${attr}_temp_flag`] === "on") ? parseInt(v[`${attr}_temp`]) || 0 : 0;
	                const bon = mod + tem;
	                const stat = bas + bon;

	                // Update the finalized total
	                setAttrs({
	                    [attr]: stat,
	                    [`display_${attr}`]: bon === 0 ? bas : `${bas} (${stat})`
	                });
	            });
	        });
	    });

	//Calculaute limts
		const update_limit = (type)  => {
			let attrs = [`${type}_limit_modifier`, `${type}_limit_temp`, `${type}_limit_temp_flag`];

			if (type === "mental") {
				attrs.push("intuition", "willpower", "logic");
			} else if (type === "physical") {
				attrs.push("body", "reaction", "strength");
			} else {
				attrs.push("essence", "willpower", "charisma");
			};

			getAttrs(attrs, (v) => {
				const attr1 = attrs[3], attr2 = attrs[4], attr3 = attrs[5];
				const stat1 = (attr1 === "essence") ? Math.ceil(v[`${attr1}`]) || 0 : parseInt(v[`${attr1}`]) || 0; //Essence, Intuition, Body
				const stat2 = parseInt(v[`${attr2}`]) || 0; //Willpower, Reaction
				const stat3 = parseInt(v[`${attr3}`]) || 0; //Logic, Strenght, Charisma

				const mod = parseInt(v[`${type}_limit_modifier`]) || 0;
				const tem = (v[`${type}_limit_temp_flag`] === "on") ? parseInt(v[`${type}_limit_temp`]) || 0 : 0;

				const tot = ((stat1 + stat2 + (stat3 * 2))/3);
				const update = Math.ceil(tot) + (mod + tem);

				setAttrs({[`${type}_limit`]: update});
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
			const found = attrs.find((mod) => { return mod.includes("_modifier") });
			const name  = found.split("_modifier")[0];
			let numbers = [];

			//DEFENSE & SOAK HAVE TWO EXTRA ATTRIBUTES. TEMP IS NEEDED BUT ONLY IF THE FLAG IS CHECKED IN SETTINGS
			const array = (name === "defense" || name === "soak") ? (v[`${name}_temp_flag`] === "on") ? attrs.splice(0, 4) : attrs.splice(0, 3) : attrs;

			_.each(array, (attr) => { numbers.push(parseInt(v[`${attr}`]) || 0); });
        	const add   = (a, b) => a + b, sum = numbers.reduce(add);

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
		const update_track = (track) => {
			let attrs = [`${track}_modifier`, `${track}_damage`];
			(track === "stun") ? attrs.push("willpower") : attrs.push("body", "sheet_type", "flag_drone");

			getAttrs(attrs, (v) =>{
				const attr1 = attrs[2], stat1 = parseInt(v[`${attr1}`]) || 0; //Willpower or Body
				const mod = parseInt(v[`${track}_modifier`]) || 0;
				const dam = parseInt(v[`${track}_damage`]) || 0;
				let update = {};

				if (track === "stun" || v["sheet_type"] === "pc" || v["sheet_type"] === "grunt") {
					tot = Math.ceil(stat1/2) + 8 + mod;
				} else if (v["sheet_type"] === "vehicle" && v["flag_drone"]  === "drone") {
					tot = (Math.ceil(stat1/2) + 6 + mod);
				} else if (v["sheet_type"] === "vehicle") {
					tot = (Math.ceil(stat1/2) + 12 + mod);
				} else {
					tot = 0; //Sprites don't have Stun or Physical track
				};

				const current = (dam != 0) ? tot - dam : tot;

				update[`${track}`] = current;
				update[`${track}_max`] = tot;

				setAttrs(update, {silent:true});
			});
		};

	//Calculate Device Rating Track
		on("change:device_rating change:matrix_modifier", () => {
			getAttrs(["device_rating","matrix_modifier","matrix"], (v) =>{
				const dev = parseInt(v.device_rating) || 0, mod = parseInt(v.matrix_modifier) || 0;
				const dam = parseInt(v.matrix) || 0;
				const tot = Math.ceil(dev/2) + 8 + mod;
				const current = (dam > 0) ? dam : tot;

				setAttrs({matrix: current});
				setAttrs({matrix_max: tot});
			});
		});

	//Convert physical into the physical damage track boxes and reverse
		['physical', 'stun'].forEach(attr => {
			on(`change:${attr} change:${attr}_damage`, (eventinfo) => {
				getAttrs([`${attr}`, `${attr}_damage`, `${attr}_max`], (v) => {
					const stat = parseInt(v[`${attr}`]) || 0, dam = parseInt(v[`${attr}_damage`]) || 0, max = parseInt(v[`${attr}_max`]) || 0, source = eventinfo.sourceAttribute;
					const wou = (source === `${attr}`) ? max - stat : max - dam;

					if (source === `${attr}`) {
						(dam === wou) ? false : ((stat < max && dam != wou) ? setAttrs({[`${attr}_damage`]: wou}, {silent: true}) : setAttrs({[`${attr}_damage`]: 0}, {silent: true}));
					} else {
						(stat === wou) ? false : setAttrs({[`${attr}`]: wou}, {silent: true});
					};

					update_wounds();
				});
			});
		});

	const update_wounds = () => {
		getAttrs(["stun_damage", "physical_damage", "pain_tolerance"], (v) => {
			const stu = parseInt(v.stun_damage) || 0, phy = parseInt(v.physical_damage) || 0, pai = parseInt(v.pain_tolerance) || 0;
			lowP = (pai < 0) ? 2 : 3;
			highPhy = (pai > 0) ? phy - pai : phy;
			highStu = (pai > 0) ? stu - pai : stu;
			pMod = (phy > 0) ? (Math.floor(highPhy/lowP)) : 0;
			sMod = (stu > 0) ? (Math.floor(highStu/lowP)) : 0;
			wou = Math.floor(-(pMod) + -(sMod));
			
			setAttrs({wounds: wou});
		});
	};

	//Calculate Initiatves
		var update_initiative = () => {
			getAttrs(["reaction", "intuition", "initiative_modifier", "initiative_temp", "initiative_temp_flag"], (v) => {
				const rea = parseInt(v.reaction) || 0;
				const int = parseInt(v.intuition) || 0;
				const mod = parseInt(v.initiative_modifier) || 0;
				const tem = (v.initiative_temp_flag === "on") ? parseInt(v.initiative_temp) || 0 : 0;
				const bas = rea + int;
				const tot = rea + int + mod + tem;
				let update = {};
				update["initiative_mod"] = tot;
				update["display_initiative_mod"] = (mod != 0) ? `${bas} (${tot})` : bas;
				setAttrs(update);
			});
		};

		on("change:initiative_dice_modifier change:edge_toggle change:initiative_dice_temp change:initiative_dice_temp_flag", () => {
			getAttrs(["initiative_dice_modifier", "edge_toggle", "initiative_dice_temp", "initiative_dice_temp_flag"], (v) =>{
				const mod = parseInt(v.initiative_dice_modifier) || 0;
				const tem = (v.initiative_dice_temp_flag === "on") ? parseInt(v.initiative_dice_temp) || 0 : 0;
				const bas = mod + tem;
				const tot = Math.min(bas+1,5);
				edg = (v.edge_toggle == 0) ? tot : 5;

				setAttrs({initiative_dice: edg});
			});
		});

		//Calculate Astral Initiatve
		on("change:intuition change:astral_mod_modifier", () => {
			getAttrs(["intuition", "astral_mod_modifier"], (v) => {
				const int = parseInt(v.intuition) || 0;
				const mod = parseInt(v.astral_mod_modifier) || 0;
				const bas = int * 2;
				const tot = (int * 2) + mod;
				let update = {};

				update["astral_mod"] = tot;
				update["display_astral_mod"] = (mod != 0) ? `${bas} (${tot})` : bas;

				setAttrs(update);
			});
		});

		on("change:astral_dice_modifier change:edge_toggle", () => {
			getAttrs(["astral_dice_modifier", "edge_toggle"], (v) =>{
				var mod = parseInt(v.astral_dice_modifier) || 0;
				var tot = Math.min(mod+3,5);
				edg = (v.edge_toggle == 0) ? tot : 5;

				setAttrs({astral_dice: edg});
			});
		});

	//Calculate Matrix Initiatve.
		on("change:host_rating change:data_processing change:pilot change:intuition change:matrix_mod_modifier change:level change:matrix_dice_modifier change:edge_toggle", () => {
			getAttrs(["sheet_type", "data_processing", "pilot", "intuition", "matrix_mod_modifier", "host_rating", "level", "matrix_dice_modifier", "edge_toggle"], (v) => {
				const dat = parseInt(v.data_processing) || 0;
				const pil = parseInt(v.pilot) || 0;
				const int = parseInt(v.intuition) || 0;
				const mat = parseInt(v.matrix_mod_modifier) || 0;
				const hos = parseInt(v.host_rating) || 0;
				const lev = parseInt(v.level) || 0;
				const dic = parseInt(v.matrix_dice_modifier) || 0;
				let update = {};

				dice = 	(v.sheet_type === "grunt" && v.edge_toggle == 0) ? 4 + dic : 
						((v.sheet_type === "grunt" && v.edge_toggle != 0) ? 5 :
						4);

				tot = (v.sheet_type === "vehicle") ? dat + pil :
					  (v.sheet_type === "host") ? dat + hos :
					  (v.sheet_type === "sprite") ? dat + lev + mat :
					  dat + int + mat;

				bas = (v.sheet_type === "sprite") ? dat + lev : dat + int ;

				update["matrix_mod"] = tot;
				update["matrix_dice"] = dice;

				update["display_matrix_mod"] = (mat != 0) ? `${bas} (${tot})` : tot;

				setAttrs(update);
			});
		});

	//Edge toggle to include ! for exploding dice
		on("change:edge_toggle", () => {
			getAttrs(["edge_toggle"], (v) =>{
				edg = (v.edge_toggle != 0) ? "!" : "";

				setAttrs({explode_toggle: edg});
			});
		});

	//Calculate Reset Condition Track
		on("clicked:cond_reset", () => {
			getAttrs(["sheet_type","physical_max","stun_max", "matrix_max"], (v) => {
				var phy = parseInt(v.physical_max) || 0;
				var stun = parseInt(v.stun_max) || 0;
				var mat = parseInt(v.matrix_max) || 0;
				let update = {};

				if (v.sheet_type === "grunt" || v.sheet_type === "pc") {
					update["physical"] = phy;
					update["stun"] = stun;
				} else if (v.sheet_type === "sprite") {
					update["matrix"] = mat;
				} else if (v.sheet_type === "vehicle") {
					update["physical"] = phy;
					update["matrix"] = mat;
				} else {
					return "Not a grunt or vehicle";
				};

				setAttrs(update);
			});
		});	

	on("clicked:cond_reset_physical clicked:cond_reset_stun", (eventinfo) => {
		const attr = eventinfo.triggerName.split("_")[2];
		setAttrs({
			[`${attr}_damage`] : 0
		});
	});

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
	    getAttrs(["repeating_weapon_weapon_range", "repeating_weapon_weapon_melee", "repeating_weapon_weapon_type", "repeating_weapon_weapon_reach", "repeating_weapon_weapon_acc", "repeating_weapon_weapon_dv", "repeating_weapon_weapon_ap", "repeating_weapon_weapon_mode", "repeating_weapon_weapon_rc", "repeating_weapon_weapon_ammo", "repeating_weapon_weapon_note"], (v) => {
	        // Local builder putting the needed variables into scope for repeatingStringBuilder
	        const b = repeatingStringBuilder(v, 'repeating_weapon_weapon_');
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

	        // Finally wrap square brackets around the weapon display
	        setAttrs({repeating_weapon_weapon: `[${display}]`});
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
				const not = `, ${v.repeating_form_form_note}`;
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
	  	['repeating_active','repeating_knowledge','repeating_language'].forEach(field => {
	        on(`change:${field}`, (eventinfo) => { 
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
	        	} else if (source.includes("skill")) {
	                getAttrs([`${source}`], (v) => {
						const bas   = v[`${source}`];
						const size  = bas.length;
						let display = (size > 0 && size <= 20) ? bas : (size > 20 ) ? bas.slice(0, 20) + "..." : " ";
	                    setAttrs({
	                       [`${field}_display`]: display
	                    });
	                });
	            } else if (source.includes("dicepool")) {
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
			getAttrs(["default_display"], (v) => {
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
	        		getAttrs([`${field}_spec`, `${field}_dicepool_modifier`], (v) => {
	        			const spec = parseInt(v[`${field}_spec`]) || 0;
						const mod = parseInt(v[`${field}_dicepool_modifier`]) || 0;
						const tot = spec + mod;

	                    setAttrs({
	                        [`${field}_dicepool`]: tot
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


// CHARACTERMANCER IMPORTER
	on("clicked:import_launch", (eventinfo) => {
		startCharactermancer("importer");
	});

	on("page:importer", () => {
		setAttrs({builder: "Chummer"});
		setCharmancerText({
			"directions" : chummerDirections
		});
	});

	on("clicked:import", () => {
		const mancerData = getCharmancerData();
		const mancerValues = mancerData["importer"].values;
		let applyEnabled = true;
	    let setText = {};

	    // Verify the user entered a JSON in the textarea. If not, provide user feedabck.
	    if (mancerValues.jsonData) {
	    	const parsedData = JSON.parse(mancerValues.jsonData) || false;
	    	setText[`import-feedback`] = "";
	    	// There is a value in the textarea! Check to see if its a valid JSON. Provide users feeadback 
	    	if (parsedData) {
	    		setText[`import-feedback`] += `<p class="feedback">A valid JSON was imported for ${mancerValues.builder}.</p>`
		      // Send the parsed data to the selected importer or let users know something went wrong 
		      if (mancerValues.builder && mancerValues.builder === "Chummer") {
				if (parsedData.characters && parsedData.characters.character) {
					importChummer(parsedData.characters.character);
		      	} else {
					setText[`import-feedback`] += `<p class="warning">Parsed JSON is missing character data.</p>`;
					applyEnabled = false
		      	}
		      } else if (mancerValues.builder && mancerValues.builder === "Hero Lab") {
		      	importHeroLab();
		      	setText[`import-feedback`] += `<p class="warning">Coming Soon....</p>`;
		      } else {
		      	setText[`import-feedback`] += `<p class="warning">A character builder was not selected. Try changing your selection then change it back if needed.</p>`;
		      	applyEnabled = false
		      }
		    } else {
		      setText[`import-feedback`] += `<p class="warning"><span>The text imported is not a valid JSON. Verify the JSON is formatted correctly. Check the format at,</span> JSONLint.com.</p>`;
		      applyEnabled = false
		    };
	    } else {
	    	 setText[`import-feedback`] = `<p class="warning">No information was entered in the JSON text area.</p>`;
	    	 applyEnabled = false
	    };

	    let buttonStatus = (applyEnabled) ? "" : "disabled";
	    setText[`finish-button`] = `<button class="finish" type="finish" value="apply" data-i18n="apply" ${buttonStatus}>Apply</button>`;

	    setCharmancerText(setText);
	});

	const chummerDirections = `<ol>
				<li>In Chummer mark your character as created</li>
				<li>Go to File -> Export -> Export JSON</li>
				<li>Copy the JSON in the file</li>
				<li>Paste it into the textfield below</li>
				<li>Click the Import button</li>
				<li>Review the data. Use the checkbox <strong>Show Hidden Inputs</strong> to fix data.</li> 
				<li>Click Apply to <u>overwrite</u> information on the character sheet</li>
			</ol>`;

	const herolabDirections = `
		<ol>
			<li>Download the file "HLtoRoll20Export.hl" from: https://drive.google.com/file/d/0B3E3jkp51s8aRmpTU1NMRjRIVkk/view</li>
			<li>Double click the file. Hero Lab will import it automatically now.</li>
			<li>Load a character</li>
			<li>Go to File/Save Custom Output and select the "Roll20 Export"</li>
			<li>Save the file. It should open automatically in your browser</li>
			<li>Follow the directions.</li>
		</ol>`;

	on("change:builder", (eventinfo) => {
		let setText = {};
		setText[`directions`] = (eventinfo.newValue === "Chummer") ? chummerDirections : herolabDirections;
		setCharmancerText(setText);
	});

  const clean = () => {
    ['active', 'knowledge', 'language', 'quality', 'martial',
      'range', 'melee', 'weapon', 'armor', 'augementations',
      'items', 'NPCspell', 'spell', 'rituals', 'preps', 'powers',
      'contacts', 'vehicle', 'lifestyle', "programs", "forms"].forEach(group => {
      getSectionIDs(`repeating_${group}`, (ids) => {
        ids.forEach((id) => {
          removeRepeatingRow(`repeating_${group}_${id}`);
        });
      });
    });
  };

	//USEFUL FUNCTIONS
	const capitialize = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const addFeedback = (attribute, value) => {
		return `<p class="feedback"><strong>${capitialize(attribute)}:</strong> ${value} </p>`
	};

	const alphabatizeKeys = (unsortedJSON) => {
		let alphabeticalKeys = {};
		Object.keys(unsortedJSON).sort().forEach((key) => {
			  alphabeticalKeys[key] = unsortedJSON[key];
		});
		return alphabeticalKeys
	};

	const getValInParen = (value) => {
		return value.split("(")[1].split(")")[0];
	};

	const getArray = (array) => {
		return Array.isArray(array) ? array : [ array ];
	};

	const getSplitNum = (value) => {
		return value.split("/")[0];
	}

	//IMPORTERS
	const importHeroLab = (character) => {
		console.log(`%c HERO LAB IMPORTER:`, "color: purple; font-weight:bold");
	};

	const importChummer = (character) => {
		//Match Chummer JSON keys with their sheet attribute. 
		//Chummer name is on the left, Roll20 sheet atribute on right.
		const jsonKeys = {
			"name": "name"
			,"adept": "flag_special"
			,"age" : "age"
			,"alias": "character_name"
			,"armor": "armor"
			,"calculatednotoriety": "notoriety"
			,"calculatedpublicawareness": "public_awareness"
			,"calculatedstreetcred": "street_cred"
			,"cmoverflow": "overflow"
			,"composure" : "composure"
			,"height": "height"
			,"initdice": "initiative_dice"
			,"initvalue": "initiative_mod"
			,"judgeintentions" : "judge_intentions"
			,"karma": "karma" 
			,"liftandcarry": "lift_carry"
			,"limitmental": "mental_limit"
			,"limitphysical": "physical_limit"
			,"limitsocial": "social_limit"
			,"magician": "flag_special"
			,"memory": "memory"
			,"nuyen":"primary_nuyen"
			,"physicalcm": "physical_max"
			//,"physicalcmfilled": "physical_damage" //RESULTING IN INFINATE LOOP
			,"playername": "player_name"
			,"sex": "sex"
			,"stuncm": "stun_max"
			//,"stuncmfilled": "stun_damage"
			,"technomancer": "flag_special"
			,"totaless": "essence"
			,"totalkarma": "total_karma"
			,"weight": "weight"
			,"indirectdefenseresist": "defense"
		};

		const attributeKeys = {
			"BOD": "body"
			,"AGI": "agility"
			,"REA": "reaction"
			,"STR": "strength"
			,"CHA": "charisma"
			,"INT": "intuition"
			,"LOG": "logic"
			,"WIL": "willpower"
			,"EDG": "edge"
			,"MAG": "magic"
			,"RES": "resonance"
		};

		const processChummer = new Promise((resolve, reject) => {
			console.log(`%c CHUMMER IMPORTER`, "color: purple; font-weight:bold");
			const sortedKeys = alphabatizeKeys(jsonKeys);
			let setText = {
				"error": "",
				"results": "",
				"ignored": ""
			};
			let update = {};

			//MATRIX
			const setCyberdeck = (cyberdeck) => {
				update["cyberdeck"]     = cyberdeck.name;
				update["device_rating"] = cyberdeck.devicerating;
				update["attribute_1"]   = cyberdeck.attack;
				update["attribute_2"]   = cyberdeck.sleaze;
				update["attribute_3"]   = cyberdeck.dataprocessing;
				update["attribute_4"]   = cyberdeck.firewall;
				update["matrix_con"]   = 0;
			}

			// PROCESS TOP LEVEL KEYS
			Object.keys(sortedKeys).forEach((key) => {
				try {
					const charSheetAttr = jsonKeys[key];
					const chummerValue = character[key];
					if ((key === "adept" || key === "magician" || key === "technomancer")) {
			            if (chummerValue.toUpperCase() === "TRUE") {
			              update[`${charSheetAttr}`] = (key === "technomancer") ? "resonance" : "magic";
			            } else if (!update.hasOwnProperty(`${charSheetAttr}`)) { // if we don't have the property set already otherwise keys get overriden
			              update[`${charSheetAttr}`] = "mundane";
			            };
					} else if (key === "totaless") {
						const essence = chummerValue.includes(",") ? chummerValue.replace(",", ".") : chummerValue;
						update[`${charSheetAttr}`] = parseFloat(essence) || 6;
					} else if (chummerValue && chummerValue != null) {
						update[`${charSheetAttr}`] = chummerValue;
					} else {
						setText["error"] += addFeedback(charSheetAttr, chummerValue);
					};

					const textUpdate = (update[`${charSheetAttr}`]) ? "results" : "ignored";
					const feedbackText = addFeedback(jsonKeys[key].replace("_"," "), update[`${charSheetAttr}`]);
					(setText[`results`].includes(feedbackText) || setText[`ignored`].includes(feedbackText)) ? false : setText[`${textUpdate}`] += feedbackText;
				} catch (error) {
					setText["error"] += addFeedback(JSON.stringify(key), error);
				};
			});

			// PROCESS METATYPE
			try {
				update[`metatype`] = character.metatype;
				if (character.metavariant) {
					update[`metatype`] += ` (${character.metavariant})`
				}
			} catch (error) {
				setText["error"] += addFeedback(JSON.stringify(character.metatype), error);
			};

			// PROCESS ATTRIBUTES
			const attributes = character.attributes[1].attribute;
			let attributeTotals = { 
				"essence": update["essence"] 
			}; // USED FOR LIMITS BELOW
			attributes.forEach((object) => {
				try {
					const charSheetAttr = attributeKeys[object.name];
					if (charSheetAttr === "edge") {
						update[`${charSheetAttr}`] = object.base;
					} else {
						update[`${charSheetAttr}_base`] = object.base;
					    update[`${charSheetAttr}_modifier`] = object.total - object.base;
					};

					// USED FOR LIMITS BELOW
					attributeTotals[`${charSheetAttr}`] = parseInt(object.total) || 0;
				} catch (error) {
					setText["error"] += addFeedback(JSON.stringify(object), error);
				};
			});

			//PROCESS LIMITS
			const limitKeys = {
				"limitmental": "mental_limit"
				,"limitphysical": "physical_limit"
				,"limitsocial": "social_limit"
			};

			Object.keys(limitKeys).forEach((key) => {
				//CALCULATE THE BASE FOR LIMIT
				const limitCalculate = (attrsArray) => {
					return Math.ceil(((attrsArray[0] + attrsArray[1] + (attrsArray[2] * 2))/3))
				};

				try {
					let attrs = [];
					if (key === "limitmental") {
						attrs.push(attributeTotals["intuition"], attributeTotals["willpower"], attributeTotals["logic"]);
					} else if (key === "limitphysical") {
						attrs.push(attributeTotals["body"], attributeTotals["reaction"], attributeTotals["strength"]);
					} else {
						attrs.push(attributeTotals["essence"], attributeTotals["willpower"], attributeTotals["charisma"]);
					}; 

					//SET LIMIT MODIFIER EQUAL TO THE TOTAL IN CHUMMER - THE CALCULATED BASE LIMIT
					update[`${limitKeys[key]}_modifier`] = parseInt(character[key]) - limitCalculate(attrs);
				} catch (error) {
					setText["error"] += addFeedback(JSON.stringify(`${key}`), error);
				};
			}); 

			// LOOP THROUGHT QUALITIES
			if (character.qualities != null && character.qualities.quality != null) {
				const qualitiesList = getArray(character.qualities.quality);
				qualitiesList.forEach((quality) => {
					try {
						const id = generateRowID();
						update[`repeating_quality_${id}_flag`] = "display";
						update[`repeating_quality_${id}_quality`] = quality.name;
						update[`repeating_quality_${id}_type`] = (quality.qualitytype === "Positive") ? "P" : "N";
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(quality), error);
					};
				});
			}

			// LOOP THROUGH SKILLS & GENERATE REPEATING FIELDS
			if (character.skills != null && character.skills.skill != null) {
				const skillsList = getArray(character.skills.skill);
				skillsList.forEach((skill) => {
					try {
						const rating = parseInt(skill.rating) || 0;
						if (rating > 0) {
							const id = generateRowID();
							const type = 
								(skill.knowledge.toUpperCase() === "TRUE" && skill.islanguage.toUpperCase() === "TRUE") ? "language" : 
								(skill.knowledge.toUpperCase() === "TRUE") ? "knowledge" : 
								"active";
							const exotic = skill.exotic.toUpperCase();
							const section = `repeating_${type}_${id}`
							// Exotic Weapons need their name in Specialization

							update[`${section}_flag`] = "display";
							update[`${section}_skill`] = 
								(skill.name === "Exotic Melee Weapon") ? "Exotic Melee" : 
								(skill.name === "Exotic Ranged Weapon") ? "Exotic Range" : 
								skill.name;
							update[`${section}_display`] = 
								(skill.name === "Exotic Melee Weapon") ? "Exotic Melee" : 
								(skill.name === "Exotic Ranged Weapon") ? "Exotic Range" : 
								skill.name;
							update[`${section}_rating`] = skill.rating;
							update[`${section}_rating_modifier`] = skill.ratingmod;

              				const skilltotal = parseInt(skill.rating) + parseInt(skill.ratingmod);
							update[`${section}_dicepool`] = skilltotal;

							//ACTIVE SKILLS HAVE THEIR TOTAL SAVED IN A HIDDEN ATTRIBUTE
							if (type === "active") {
								update[skill.name.toLowerCase().replace(/ /g, "")] = skilltotal;
							};

							//This needs to be verified with multiple specializations
							if (skill.skillspecializations && skill.skillspecializations != null) {
								const chummerSpecialization = skill.skillspecializations.skillspecialization.name;
								const specialization = (chummerSpecialization.includes("[")) ? chummerSpecialization.slice(1, -1) : chummerSpecialization;
								update[`${section}_specialization`] = specialization;
							} else if (exotic === "TRUE") {
								update[`${section}_specialization`] = skill.spec;
							};

							//CREATE THE DISPLAYS FOR SKILLS
							if (update[`${section}_specialization`]) {
								update[`${section}_display_specialization`] = `(${update[`${section}_specialization`]})`;
							};

							//DISPLAY FOR RTG
							update[`${section}_display_rating`] = (skill.ratingmod != 0) ? `${skill.rating} (${skilltotal})` : `${skill.rating}`;

							const attribute = skill.attribute;
							update[`${section}_attribute`] = `@{${attributeKeys[attribute]}}`;
							update[`${section}_display_attribute`] = attributeKeys[attribute];

							update[`${section}_limit`] = 
								(attribute === "AGI" || attribute === "BOD" || attribute ===  "STR" || attribute ===  "REA") ? `@{physical_limit}` : 
								(attribute === "WIL" || attribute ===  "LOG" || attribute ===  "INT") ? `@{mental_limit}` : 
								(attribute === "CHA") ? `@{social_limit}` : "none";
						};
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(skill), error);
					};
				});
			}

			//MOVEMENT
			try {
				const movement = character.movementwalk.split(",")[0].split("/");
				update[`walk`] = movement[0];
				update[`run`] = movement[1];
			} catch (error) {
				setText["error"] += addFeedback("movement", error);
			};

			//MARTIAL ARTS
			if (character.martialarts != null && character.martialarts.martialart != null) {
				const martialartsList = getArray(character.martialarts.martialart);
				martialartsList.forEach((art) => {
					const techniqueList = getArray(art.martialarttechniques.martialarttechnique);
					techniqueList.forEach((tech) => {
						try {
							const id = generateRowID();
							update[`repeating_martial_${id}_flag`] = "display";
							update[`repeating_martial_${id}_technique`] = tech.name;
							update[`repeating_martial_${id}_style`] = art.name;
						} catch (error) {
							setText["error"] += addFeedback(JSON.stringify(art), error);
						};
					});
				});
			};

			//WEAPON KEYS
			const weaponKeys = {
				"name": "weapon"
				,"damage": "damage"
				,"ap": "ap"
				,"dicepool": "dicepool"
				,"skill": "skill"
				,"reach": "reach"
				,"rc": "recoil"
				,"mode": "mode_options"
				,"accuracy": "acc"
			};

			//WEAPONS
			if (character.weapons != null && character.weapons.weapon != null) {
				const weaponsList = getArray(character.weapons.weapon);
				weaponsList.forEach((weapon) => {
					try {
						const id = generateRowID();
				      	const section = (weapon.type.toUpperCase() === "MELEE") ? `repeating_melee_${id}` : `repeating_range_${id}`;
				      	const npcWeapon = `repeating_weapon_${id}`;

				      	const category = weapon.category.toUpperCase();
				      	Object.keys(weaponKeys).forEach((key) => {
				      		if (weapon[`${key}`] && weapon[`${key}`] != null) {
				      			update[`${section}_${weaponKeys[key]}`] = 
				      				(key != "damage" && weapon[`${key}`].includes("(")) ? getValInParen(weapon[`${key}`]) :
				      				(key === "skill") ? `@{${weapon[`${key}`].toLowerCase().replace(" ", "")}}` :
				      				weapon[`${key}`];
				      		} else if (key === "skill" && category.includes("EXOTIC")) {
				      			update[`${section}_skill`] = 0;
				      		};
						});

				      	//EXOTIC WEAPONS NEED SPECIAL HANDLING
				      	if (category.includes("EXOTIC")) {
				      		update[`${section}_dicepool_modifier`] = weapon.dicepool;
				      	};

						//RANGED WEAPONS NEED CLIP & RANGES
						if (weapon.type.toUpperCase() === "RANGED") {
					        if (weapon.clips != null && weapon.clips.clip != null) {
					          const clips = Array.isArray(weapon.clips.clip) ? weapon.clips.clip : [ weapon.clips.clip ];
					          update[`${section}_ammo`] = clips[0].count;
					        } else if (weapon.name.includes("Grenade")) {
					        	const gearsList = getArray(character.gears.gear);
					        	gearsList.forEach((gear) => {
					        		if (weapon.name === gear.name) {
					        			update[`${section}_ammo`] = gear.qty || 1;
					        		};
					        	});
					        } else if (weapon.ammo) {
					        	 update[`${section}_ammo`] = weapon.ammo;
					        };

					        //RANGE
							const rangeList = weapon.ranges;
							let range = "";
							Object.keys(rangeList).forEach((key) => {
								if (key != "name" && rangeList[key] != null) {
									const rangeNumber = rangeList[key].split("-")[1];
									range += (key === "short") ? `${rangeNumber}` : `/${rangeNumber}`;
								};
							});
							update[`${section}_range`] = range;
				      	};

				      	//ACCESSORIES
				      	if (weapon.accessories) {
					      	let accessories = "";
					      	const accessoriesList = getArray(weapon.accessories.accessory);
					      	accessoriesList.forEach((accessory) => {
					      		accessories += `${accessory["name"]}, `
					      	});

					      	update[`${section}_notes`] = accessories;
				      	};

				      	// TOGGLE THE SETTINGS OFF
				      	update[`${section}_flag`] =  "display";
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(weapon), error);
					};
				});
			}

			//ARMOR
			if (character.armors != null && character.armors.armor != null) {
				const armorsList = getArray(character.armors.armor);
				armorsList.forEach((armor) => {
					try {
						const id = generateRowID();
						if (armor.category != "Clothing") {
							const section = `repeating_armor_${id}`;
							let armorMods = "";
							let armorGear = "";

							// ARMOR NAME
							update[`${section}_name`] =  armor.name;

							// ARMOR sometimes has a bonus
							update[`${section}_rating`] = (armor.armor.includes("/+")) ? armor.armor.split("/+")[0] : armor.armor;

							// ARMOR MODS
							if (armor.armormods && armor.armormods != null) {
								const modsList = getArray(armor.armormods.armormod);
								modsList.forEach((modification) => {
									armorMods += `${modification.name}, `;

									if (modification.name === "Nonconductivity") {
										update[`${section}_electrical_modifier`] = modification.rating;
									} else if (modification.name === "Thermal Damping" || modification === "Insulation") {
										update[`${section}_cold_modifier`] = modification.rating;
									} else if (modification.name === "Radiation Shielding") {
										update[`${section}_radiation_modifier`] = modification.rating;
									} else if (modification.name === "Chemical Protectio") {
										update[`${section}_acid_modifier`] = modification.rating;
									} else if (modification.name === "Fire Resistance") {
										update[`${section}_fire_modifier`] = modification.rating;
									};
								});
							};

							// ARMOR GEAR
							if (armor.gears && armor.gears != null) {
								const gearList = getArray(armor.gears.gear);
								gearList.forEach((gear) => {
									if (gear.children) {
										const childrenList = getArray(gear.children.gear);
										childrenList.forEach((child) => {
											armorGear += `${gear.name} (${child.name}), `;
										});
									} else {
										armorGear += `${gear.name}, `;
									};
								});
							};

							// HIDE SETTINGS
							update[`${section}_flag`] =  "display";

							update[`${section}_notes`] =  
								(armorMods && armorGear) ? `Modification: ${armorMods} Gear: ${armorGear}` :
								(armorMods) ? `Modification: ${armorMods}` :
								(armorGear) ? `Gear: ${armorGear}` : "";
						} else {
							// Chummer puts Clothing in with armor
							const section = `repeating_items_${id}`;
							update[`${section}_item`] =  armor.name;
							update[`${section}_flag`] =  "display";
						};
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(armor), error);
					}
				});
			}

			//AUGMENTATIONS
			if (character.cyberwares != null && character.cyberwares.cyberware != null) {
				const cyberwaresList = getArray(character.cyberwares.cyberware);
				cyberwaresList.forEach((ware) => {
					const id = generateRowID();
					try {
						const section = `repeating_augementations_${id}`;
						update[`${section}_flag`] = "display";
						update[`${section}_augmentation`] = ware.name;
						update[`${section}_rating`]       = ware.rating;
						update[`${section}_essence`]      = ware.ess;
						update[`${section}_notes`]        = `Grade: ${ware.grade}`;

						if (ware.gears != null && ware.gears.gear != null) {
							const wareGearList = getArray(ware.gears.gear);
							wareGearList.forEach((gear) => {
								if (gear.category.toLowerCase().includes("cyberdeck")) {
									setCyberdeck(gear);
								}
							});
						}
					} catch (error) {
					  setText["error"] += addFeedback(JSON.stringify(ware.name), error);
					}
				});
			};

			console.log(character);

			// GEAR
			if (character.gears != null && character.gears.gear != null) {
				const gearsList = getArray(character.gears.gear);
				gearsList.forEach((gear) => {
					const id = generateRowID();
					try {
						if (gear.name.toLowerCase() === "fake sin") {
							const section = `repeating_lifestyle_${id}`;
							update[`${section}_name`] = `${gear.extra} (rating ${gear.rating})`;
							update[`${section}_lifestyle`] = (gear.location != null) ? `${gear.location},` : "";
							update[`${section}_flag`] = "display";

							update[`${section}_licenses`] = "";
							if (gear.children && gear.children.gear != null) {
								const childrenList = getArray(gear.children.gear);
								childrenList.forEach((child) => {
									update[`${section}_licenses`] += `${child.extra} (rating ${child.rating}), `;
								});
							}
						} else if (gear.category.toLowerCase().includes("cyberdeck")) {
							setCyberdeck(gear);
						} else if (gear.category.toLowerCase().includes("programs")) {
							const section = `repeating_programs_${id}`;
							update[`${section}_program`] = gear.name;
							update[`${section}_flag`] = "display";
						} else {
							const section = `repeating_items_${id}`;
							let gearNotes = "";
							update[`${section}_item`] = gear.name;
							update[`${section}_flag`] = "display";
							update[`${section}_rating`] = (gear.rating >  0) ? gear.rating : "";

							//NAME
							update[`${section}_item`] += (gear.name.includes("Ammo:")) ? ` (${gear.extra}) ` : "";
							update[`${section}_item`] += (gear.qty > 1) ?` x${gear.qty}` : "";

							//NOTES
							gearNotes += (gear.location != null) ? `Location: ${gear.location},` : "";
							gearNotes += (gear.qty != null) ? ` Qty: ${gear.qty},` : "";
							gearNotes += (gear.extra != null) ? ` Extra: ${gear.extra},` : "";

							if (gear.children && gear.children != null) {
								const childrenList = getArray(gear.children.gear);
									childrenList.forEach((child) => {
										gearNotes += `${child.name}, `;
								});
							};

							update[`${section}_notes`] = gearNotes;
						}
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(gear.name), error);
					};
				});
			};

			//SPELL KEYS
			const spellKeys = {
				"category": "category"
				,"name": "name"
				,"range": "range"
			};

			// SPELLS
			if (character.spells != null && character.spells.spell != null) {
				const spellsList = getArray(character.spells.spell);
				spellsList.forEach((spell) => {
					try {
						const id = generateRowID();
						const type = (spell.alchemy.toUpperCase() === "TRUE") ? "preps" : "spell";
						const section = `repeating_${type}_${id}`;

						Object.keys(spellKeys).forEach((key) => {
				      		if (spell[`${key}`] && spell[`${key}`] != null) {
				      			update[`${section}_${spellKeys[key]}`] = spell[`${key}`];
				      		};
						});

						// FLAG
						update[`${section}_flag`] = "display";

						// TYPE
						update[`${section}_type`] = (spell.type === "P") ? "Physical" : "Mana";

						// DRAIN
						update[`${section}_drain`] = spell.dv.replace("F", "");

						// SET COMBAT TYPE
						if (spell.category.toUpperCase() === "COMBAT") {
							const combatType = spell.descriptors.toUpperCase();
							update[`${section}_combat_type`] = 
								(combatType.includes("DIRECT")) ? "Direct, Force " :
								(combatType.includes("INDIRECT")) ? "Indirect, Force ?{Force|}, AP -" :
								"Force ";
							update[`${section}_damage`] = spell.damage;
						}

						// DURATION
						const duration = spell.duration.toUpperCase();
						update[`${section}_duration`] = 
							(duration === "S") ? "Sustained" : 
							(duration === "I") ? "Instant" : 
							(duration === "P") ? "Permanent" :
							"Special";

						// NOTES
						if (spell.descriptors != null) {
				            update[`${section}_notes`] = spell.descriptors;
				         }
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(spell.name), error);
					}
				});
			}

			// POWERS
			if (character.powers != null && character.powers.power != null) {
				const powersList = getArray(character.powers.power);
				powersList.forEach((power) => {
					try {
						const id = generateRowID();
						const section = `repeating_powers_${id}`;

						update[`${section}_name`] = (power.fullname != null) ? power.fullname : power.name;
						update[`${section}_rating`] = power.rating;

						 if (power.totalpoints != null) {
						 	update[`${section}_notes`] = `Total Points: ${power.totalpoints}.`;
						 }
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(power.name), error);
					}
				});
			}

			// LIFESTYLES
			if (character.lifestyles != null && character.lifestyles.lifestyle != null) {
				const lifestyleList = getArray(character.lifestyles.lifestyle);
				lifestyleList.forEach((lifestyle) => {
					try {
						const id = generateRowID();
						const section = `repeating_lifestyle_${id}`;

						update[`${section}_name`] = lifestyle.name;
						update[`${section}_flag`] = "display";

						if (lifestyle.qualities != null && lifestyle.qualities.quality) {
							const lqualitiesList = getArray(lifestyle.qualities.quality);
							let lifestyleQualities = "";
							lqualitiesList.forEach((quality) => {
								try {
									lifestyleQualities += (quality.fullname != null) ? quality.fullname : quality.name;
								} catch (error) {
									setText["error"] += addFeedback(JSON.stringify(quality.name), error);
								}
							});

							update[`${section}_lifestyle`] = lifestyleQualities;
						}
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(lifestyle.name), error);
					}
				});
			}

			// CONTACTS
			if (character.contacts != null && character.contacts.contact != null) {
				const contactList = getArray(character.contacts.contact);
				contactList.forEach((contact) => {
					try {
						const id = generateRowID();
						const section = `repeating_contacts_${id}`;
						let contactNotes = "";

					    update[`${section}_name`] = (contact.role != null) ? `${contact.name} (${contact.role})` : `${contact.name}`;
					    update[`${section}_loyalty`] = contact.loyalty;
					    update[`${section}_connection`] = contact.connection;
					    update[`${section}_flag`] = "display";

					    ["metatype", "sex", "age", "preferredpayment", "hobbiesvice", "personallife"].forEach((detail) => {
					    	if (contact[`${detail}`] != null) {
					    		contactNotes += `${contact[`${detail}`]}. `
					    	}
					    });

					    update[`${section}_notes`] = contactNotes;

					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(contact.name), error);
					}
				});
			}

			// VEHICLE KEYS
			const vehicleKeys = {
				"handling": "handling_base"
				,"accel": "acceleration_base"
				,"speed": "speed_base"
				,"body": "body_base"
				,"armor": "armor_base"
				,"sensor": "sensor_base"
				,"pilot": "pilot_base"
			};

			// VEHICLES
		/*	if (character.vehicles != null && character.vehicles.vehicle != null) {
				const vehicleList = getArray(character.vehicles.vehicle);
				vehicleList.forEach((vehicle) => {
					try {
						const id = generateRowID();
						const section = `repeating_vehicle_${id}`;
						let vehicleNotes = "";

						update[`${section}_name`] = vehicle.name;
						update[`${section}_flag`] = "display";
						Object.keys(vehicleKeys).forEach((key) => {
							if (vehicle[`${key}`] && vehicle[`${key}`] != null) {
								update[`${section}_${vehicleKeys[`${key}`]}`] = 
									(vehicle[`${key}`].includes("/")) ? getSplitNum(vehicle[`${key}`]) : 
									vehicle[`${key}`];
							};
						}); 

						["attack", "sleaze", "dataprocessing", "firewall", "devicerating"].forEach((matrixAttr) => {
							vehicleNotes += (matrixAttr === "devicerating") ? `Device Rating (${vehicle[`${matrixAttr}`]}) ` : 
								(matrixAttr === "firewall") ? `${vehicle[`${matrixAttr}`]} ` : `${vehicle[`${matrixAttr}`]}/`;
						}); 

						if (vehicle.mods != null && vehicle.mods.mod != null) {
							const vehicleModsList = getArray(vehicle.mods.mod);
							vehicleNotes += "Mods: "
							vehicleModsList.forEach((mod) => {
								vehicleNotes += (mod.fullname != null) ? `${mod.fullname}, ` : `${mod.name}, `;
							});
						}
				
						if (vehicle.gears != null && vehicle.gears.gear != null) {
							const vehicleGearList = getArray(vehicle.gears.gear);
							vehicleNotes += "Gear: "
							vehicleGearList.forEach((gear) => {
								if (gear.children != null && gear.children.gear != null) {
									const vehicleChildrenList = getArray(gear.children.gear);
									let vehicleChildrenNotes = "";
									vehicleChildrenList.forEach((child) => {
										vehicleChildrenNotes += `${child.name}, `;
									});
									vehicleNotes += `${gear.name} (${vehicleChildrenNotes}), `;
								} else {
									vehicleNotes += `${gear.name}, `;
								};
							});
						} 
				
						update[`${section}_notes`] = vehicleNotes;
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(vehicle.name), error);
					}
				});
			}

		*/

			setCharmancerText(setText);
			resolve(update);

			console.log(update);
		}).then((update) => {
			let setText = {
				"hidden": ""
			};

			//GENERATE INPUTS TO SAVE THE DATA
			Object.keys(update).forEach((key) => {
				const label = (key.includes("_")) ? key.replace("_", " ") : key;
				const input = `<label><div>${label}</div><input type="text" name="comp_${key}" value="${update[key]}" /></label>`;
				setText[`hidden`] += (setText[`hidden`].includes(input)) ? "" : input;

				const feedbackLabel = 
					(key.includes("repeating")) ? key.split("_")[3] : 
					(key.includes("_")) ? key.replace("_", " ") : key;
				(feedbackLabel === "flag" || feedbackLabel === "display") ? false : setText["results"] += addFeedback(feedbackLabel, update[key]);
			});

			setAttrs(update);

			return setText;
		}).then((result) => {
			setCharmancerText(result);
		});
	};

	// APPLY Changes
	on("mancerfinish:apply", () => {
		const mancerData = getCharmancerData();
		const mancerValues = mancerData["importer"].values;

		Object.keys(mancerValues).forEach((key) => {
			if (key == "builder" || key == "jsonData" || key == "hidden") {
				delete mancerValues[key];
			};
		});

    	clean();
		setAttrs(mancerValues, () => {
			console.log(`%c APPLY IMPORTER:`, "color: blue; font-weight:bold");
			console.log(mancerValues);
			deleteCharmancerData(["importer"]);
			finishCharactermancer();
		});
	}); 
</script>