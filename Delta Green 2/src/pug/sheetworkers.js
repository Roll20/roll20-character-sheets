	// === ATTRIBUTE ARRAYS
	// note: I had the underscore in front of the arrays key to distinguish it from the name of the attribute
		const arrays = {
			_stats: ['strength', 'constitution', 'dexterity', 'intelligence', 'power', 'charisma'],
			_hit_points: ['strength_score', 'constitution_score'],
			_sanity_points: ['power_score'], //ALSO USED FOR BREAKING POINTS
			_willpower_points: ['power_score'],
			_toggles: ['settings'],
			_sanity_loss: ['san_success', 'san_failure'],
			_skills:['accounting', 'alertness', 'anthropology', 'archeology', 'art', 'artillery', 'athletics', 'bureaucracy', 'computer_science', 'craft', 'criminology', 'demolitions', 'disguise', 'dodge', 'drive', 'firearms','first_aid', 'forensics', 'heavy_machinery', 'heavy_weapons', 'history', 'humint', 'law', 'medicine', 'melee_weapons', 'military_science', 'navigate', 'occult', 'persuade', 'pharmacy', 'pilot', 'psychotherapy','ride', 'science', 'search' , 'sigint' , 'stealth' , 'surgery' , 'survival', 'swim', 'unarmed_combat']
		};
_additionalskills=[];
		
	
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
	
	// === SAN LOSS Button
	arrays['_sanity_loss'].forEach(attr => {
		on(`change:${attr}`, (eventinfo) => {
			const value = eventinfo.newValue;
			if (value ===""){
				setAttributes({[`has_${attr}`]: 0}, true);
			} else {
				setAttributes({[`has_${attr}`]: 1}, true);
			}
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
		getAttrs(['version'], values => { versioning(parseFloat(values.version) || 1); });
	});			

	const versioning = (version) => {
	   console.log(`%c Versioning, ${version}`, 'color: green; font-weight:bold');
	   if (version < 1.05) {
		   version_0_105();
	    } 
		else if (version <1.5) {
			version_105_150();
		}
		else if (version<1.7) {
			version_150_170();
		}
	};

	// UPDATE TO VERSION 1.05
	const version_0_105= () => {
		getAttrs(['version'], function(v) {
			let codeversion=1.05;
			let update={version: codeversion,
						 initial_san: 0,
						 initial_hp:  0,
						 initial_str: 0,
						 initial_con: 0
			};
			setAttrs(update, //Update attributes
				{silent:true},  // will not trigger sheet workers
				versioning(codeversion)); // call versioning again
		});
	};
	// UPDATE TO VERSION 1.5
	// UPDATE TO VERSION 1.5
	const version_105_150 = () => {
		
		let codeversion=1.5;
		let update={};
		
		getSectionIDs("weapons",idarray=>{
	   console.log(`%c idarray`, 'color: green; font-weight:bold');
	   console.info(idarray);
			let fieldnames=['sheet_type','version'];
	        console.log(`%c did I found weapons?`, 'color: green; font-weight:bold');
			idarray.forEach(id => {
        	        console.log(`%c ${id}`, 'color: green; font-weight:bold');
					fieldnames.push(`repeating_weapons_${id}_damage`,`repeating_weapons_${id}_lethality_percent`,`repeating_weapons_${id}_attack`);
			});
	   		getAttrs(fieldnames,function(v) {
        	   console.log(`%c v`, 'color: green; font-weight:bold');
        	   console.info(v);
        	   update['version']=codeversion;
        	   console.info(update);
				idarray.forEach(id=>{
				    console.log(`%c ${id}`, 'color: green; font-weight:bold');
					if (v[`repeating_weapons_${id}_damage`]===""){
					    update["repeating_weapons_"+id+"_hasdamage"]="0";
        	   console.info(update);
					} else{
					    update["repeating_weapons_"+id+"_hasdamage"]="1";
        	   console.info(update);
					}
						
					if (v[`repeating_weapons_${id}_lethality_percent`]>0){
					    update["repeating_weapons_"+id+"_haslethality"]="1";
        	   console.info(update);
					} else {
					    update["repeating_weapons_"+id+"_haslethality"]="0";
        	   console.info(update);
					}
					if (v['sheet_type']==='npc'){
					    update["repeating_weapons_"+id+"_weapons"]=v[`repeating_weapons_${id}_attack`];
					}
    			});
    			
    		   console.log(`%c update`, 'color: green; font-weight:bold');
        	   console.info(update);
        		setAttrs(update, //Update attributes
        				{silent:true},  // will not trigger sheet workers
        				versioning(codeversion)); // call versioning again
				
			});
		});
	};

	// UPDATE TO VERSION 1.7
	const version_150_170 = () => {
		let codeversion=1.7;
		let update={};
		update['version']=codeversion;
		update['luck']=50;
		update['luck_max']=50;
		console.log(`%c update`, 'color: green; font-weight:bold');
		console.info(update);
		setAttrs(update, //Update attributes
				{silent:true},  // will not trigger sheet workers
				versioning(codeversion)); // call versioning again
	};

	
// UPDATE THE VALUE OF THE BOND IN THE REPEATING SECTION WHEN CREATED
	on("change:repeating_bonds",function(){
		getAttrs(["repeating_bonds_flag","charisma_score"],function(value){
			if (value["repeating_bonds_flag"]==0){
				let update={
							repeating_bond_score:value["charisma_score"],
							repeating_bond_flag:1
							};
				setAttributes(update,true);
			}
		});
	});

// CHECK IF DAMAGE OR LETHALITY EXISTS
	on("change:repeating_weapons",function(){
		getAttrs(['repeating_weapons_damage','repeating_weapons_lethality_percent'],function(value){
			let update={};
			if (value['repeating_weapons_damage']===""){
				update['repeating_weapons_hasdamage']=0;
			}else{
				update['repeating_weapons_hasdamage']=1;
			}
			
			if (value['repeating_weapons_lethality_percent']>0){
				update['repeating_weapons_haslethality']=1;
			}else{
				update['repeating_weapons_haslethality']=0;
			}
			setAttributes(update,true);
		});
	});
	
// Find max and min of a function
	on("sheet:opened change:san_success change:san_failure",function(){
	   getAttrs(['san_success', 'san_failure'], function(v) {
			let maxsan=v.san_failure;
			let minsan=v.san_success;
			let update={};
			maxsan="("+maxsan+")";
			minsan="("+minsan+")";
			var m1 = minsan.toLowerCase().replace(/[\\+\\-\\*\\/]/gi,"$&").replace(/[dD](\s?\d+[.,]?\d*)/gi,'').replace(/[\\+\\-\\*\\/]/gi,")$&(");
			var m2 = maxsan.toLowerCase().replace(/[\\+\\-\\*\\/]/gi,")$&(").replace(/[dD]/gi,'*');
			update['maxsanloss']=Function('"use strict";return (' + m2 + ')')();
			update['minsanloss']=Function('"use strict";return (' + m1 + ')')();
			console.log(m1);
			console.log(m2);
			setAttributes(update,true);
		});
	});
// Create array with list of repeating skills
var addskills=[];	//name of the array
// function to populate the array
on('sheet:opened change:repeating_skills remove:repeating_skills', () => {
  addskills=[];
  getSectionIDs('repeating_skills', (idarray) => {
    addskills=idarray.map(id =>`repeating_skills_${id}`) ; 
    console.log(addskills);  //log of debugging to be sure
  });
});


// levelup character
on("clicked:levelup", () =>{
    let update={};
    let copyarray=arrays['_skills'];  // copy of the array containing all skills ranks
    let len=copyarray.length;         // length of the original copyarray
    let getarray=[];                  // used only to update the values
    let summary={};                   // information in the log for the users
    let var_rnd=0;                    // random variable of 1d4
    let block_to_insert ;
    let container_block ;
    let newrowid;
    let newrowattrs = {};
    let oldval=0;
    let newval=0;
    let name;  

                //console.dir(copyarray);
    //getSectionIDs('repeating_skills', (idarray) => {
    //    for (i=0;i<idarray.length;i++){
    //       copyarray.push(`repeating_skills_${idarray[i]}`) ;
    //    }
    //});
    copyarray=copyarray.concat(addskills);           // concatenate skill array with repeating skill array
    console.dir(copyarray);              
    getSectionIDs("repeating_summary", function(idarray) {
      for(var i=0; i < idarray.length; i++) {
        removeRepeatingRow("repeating_summary_" + idarray[i]);
      }
    });
	
	
	copyarray.forEach((sk,idx)=>{
        //console.log(idx);
        if (idx<len){                                // if the idx<len it means I an in the skill array part
            getAttrs([`${sk}`,`${sk}_name`,`${sk}_fail`],(val)=>{
                getarray.push(`${sk}`);
                //console.log(val[`${sk}_fail`]);
                //    console.log(`${sk}`);
                if (val[`${sk}_fail`]=='on'){                    //if the checkbox is checked
                    var_rnd=Math.ceil(Math.random() * 4);     // generate a random number for each checked value (less number generated)
                    //console.log(`${idx}`);
                    oldval=(parseInt(val[`${sk}`])||0);
                    newval=oldval+var_rnd;
                    name=val[`${sk}_name`];
                    summary[`${sk}`]=var_rnd;                    // how much the skill has changed 0-3
                    update[`${sk}`]=newval;  // new value of the skill
                    update[`${sk}_fail`]='off';                           // uncheck checkbox
                     
                    //block_to_insert = document.createElement( 'div' );
                    //block_to_insert.innerHTML = 'This demo DIV block was inserted into the page using JavaScript.' ;
                     
                    //container_block = document.getElementById( 'summary' );
                    //container_block.appendChild( block_to_insert );
                    newrowid = generateRowID();
                    newrowattrs['repeating_summary_' + newrowid + '_skillname'] = name;
                    newrowattrs['repeating_summary_' + newrowid + '_oldval'] = oldval;
                    newrowattrs['repeating_summary_' + newrowid + '_newval'] = newval;
                    
                }
            });
        } else { // if the idx>=len it means I an in the  repeating skill array part
            getAttrs([`${sk}_name`,`${sk}_rank`,`${sk}_fail`],(val)=>{
                getarray.push(`${sk}_rank`);
                //console.log(val[`${sk}_fail`]);
                //    console.log(`${sk}`);
                if (val[`${sk}_fail`]=='on'){
                    var_rnd=Math.ceil(Math.random() * 4);       // generate a random number for each checked value (less number generated)
                    //console.log(`${idx}`);
                    summary[`${idx-len}_rank`]=var_rnd;           // since the repeating skill don't have a name, they are identified by number 0-N
                    //
					oldval=(parseInt(val[`${sk}_rank`])||0);
                    newval=oldval+var_rnd;
                    name=val[`${sk}_name`];
                    //
					update[`${sk}_rank`]=(parseInt(val[`${sk}_rank`])||0)+var_rnd;
                    update[`${sk}_fail`]='off';
                    newrowid = generateRowID();
                    newrowattrs['repeating_summary_' + newrowid + '_skillname'] = name;
                    newrowattrs['repeating_summary_' + newrowid + '_oldval'] = oldval;
                    newrowattrs['repeating_summary_' + newrowid + '_newval'] = newval;
                }
            });
        }
    });
    //console.log(getarray);
    console.log(newrowattrs);             // summary in console for the user
    //setAttrs(newrowattrs);
    console.log(summary);             // summary in console for the user
    getAttrs(getarray,()=>{             // update fields
	    setAttributes(update,false);
        setAttributes(newrowattrs,false);
    });
    //console.dir(update);
});