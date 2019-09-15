
	// === SHARED FUNCTIONS
	const setAttributes = (update, silent) => { 
		(silent === true) ? setAttrs(update, {silent:true}) : setAttrs(update); 
	};

	// === ATTRIBUTE ARRAYS
		const arrays = {
			attributes: [""], 
			repeating_settings: [""],
			sheets: ["settings"]
			toggles: ["sheet"]
		};

	// === TOGGLE SETTINGS
		arrays["sheets"].forEach(attr => {
	        on(`clicked:${attr}`, (eventinfo) => {
	            setAttributes({sheet_type: `${attr}`}, true);
	        });
	    });

	// === SWITCH BETWEEN SHEETS
	    on(`change:sheet_select`, (eventinfo) => {
	        setAttributes({sheet_type: eventinfo.newValue}, true);
	    });

	// === TOGGLE INPUT SETTINGS
	    arrays["toggles"].forEach(attr => {
	        on(`clicked:toggle_${attr}`, () => {
	        	getAttrs(["toggles"], (v) => {
	 				let string = toggleBuilder(attr, v["toggles"]);
	                setAttributes({toggles: string}, true);
	        	});
	        });
	    });

	// === UPDATE TOGGLE STRING
		const toggleBuilder = (attr, oldString) => {
	        let newString = (oldString.includes(`${attr}`)) ? oldString.replace(`${attr},`, "") : `${oldString}${attr},`;
	        return newString
		};

	// === GM WHISPER TOGGLES
		on("clicked:whisper", (eventinfo) => {
			getAttrs(["gm_toggle"], (v) => {
				setAttributes({gm_toggle: (v.gm_toggle.includes("gm")) ?  " " : "/w gm"}, true);
			});
		});

	// === SHEET VERSIONING
		on("sheet:opened", () => {
			getAttrs(["version"], (v) => { versioning(parseFloat(v.version) || 1); });
		});			

		const versioning = (version) => {
		   console.log(`%c Versioning, ${version}`, "color: green; font-weight:bold");
		   if (version >= 1) {
				console.log(`%c Version is update to date`, "color: orange; font-weight:bold");
		    } else {
				setAttrs({version: 1}, () => {versioning(1)});
			};
		};


