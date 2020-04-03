

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
