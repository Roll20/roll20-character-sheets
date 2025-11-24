on(`clicked:reset_global_modifier`, () => {
    const update={'global_modifier_number':''};
    setAttrs(update, {silent:true}, () => {
        console.info('update',update);    
    });
});

$20(selector).on(`click`, e => {
        
    const roll = e.htmlAttributes.name.match(/^attr_(.*)_r$/)[1];
    const _roll = (roll === 'sanity_points') ? 'sanity' : roll;
    usedModifier(e,(queryModifier) =>{  
        console.log(`queryModifier: ${queryModifier}`);
        

        const additionalParameters={}
        if (arrays[`_editable_skills`].includes(_roll)){
            const prefix_skill=_roll.slice(0,-2);
            additionalParameters['editable_name']=`${_roll}_name`;
            additionalParameters['editable_type']=prefix_skill.replace('_',' ');
        }else{
            const caps = (_roll === 'humint' || _roll === 'sigint') ? _roll.toUpperCase() : _roll.replace('_',' ')
            additionalParameters['name']=caps.replace('_',' ');
        }
        
        const rollString=`${prefix_skill_roll} {{subheader=@{${roll}}}} `;

        rollwithmodifiers(rollString,roll,queryModifier,additionalParameters);
    });
});

$20(sanity_selector).on(`click`, e => {
    
    const _input_name={};
    var _parameters = [];

    _input_name['success'] = 'sanity_loss_success';
    _parameters.push(_input_name['success']);
    _input_name['failure'] = 'sanity_loss_failure';
    _parameters.push(_input_name['failure']);

    getAttrs(['character_id','sanity_loss_success','sanity_loss_failure', 
              'sanity_type','violence_adapted','helplessness_adapted'], (values) => {
        const charid=values['character_id'];
        const sanity_loss_success=values['sanity_loss_success'] !== '' ? values['sanity_loss_success'] : 0;
        const sanity_loss_failure=values['sanity_loss_failure'] !== '' ? values['sanity_loss_failure'] : 1;
        const sanity_loss_type=values['sanity_type'];
        console.log(sanity_loss_type);
        var rollString = `${prefix_sanity_roll} {{header=@{character_name}}}`;
        rollString += ` {{sanity_type=^{@{sanity_type}}}}`;
        rollString += ` {{description=@{npc_description}}}`;
        rollString += ` {{success_roll=[${sanity_loss_success}](~${charid}|sanity_loss_success)}}`;
        rollString += ` {{failure_roll=[${sanity_loss_failure}](~${charid}|sanity_loss_failure)}}`;

        
        console.info(sanity_loss_success);
        console.info(sanity_loss_failure);
        console.info('min roll:',minRoll(sanity_loss_success));
        console.info('max roll:',maxRoll(sanity_loss_failure));
        startRoll(rollString,results =>{
            finishRoll(results.rollId)
        });
    });
});

$20('button.repeating_roll').on(`click`, e => {
    
    const id = e.htmlAttributes.value;
    const section = _repeating_sections[e.htmlAttributes.name.split('_')[1]];
    
    
    usedModifier(e,(queryModifier) => {
        var _input_names = {};
        var _parameters = [];
        setRepeatingParametersAndInputNames(section, id, _parameters, _input_names)
        clicked_repeating_actions(section, _parameters, _input_names, queryModifier);
    });
});

arrays['_sanity_loss'].forEach((attrName) => {
	on(`clicked:${attrName}-action`, (eventInfo) => {
		
		getAttrs([attrName],(values) => {
			const sanloss=check_sanloss(values[attrName],attrName);
			rollSanityDamages(sanloss,attrName);
		});
	});
});


_allrolls.forEach(roll => {
	const _roll = (roll === 'sanity_points') ? 'sanity' : roll;		
	on(`clicked:${roll}-action`, (eventInfo) => {
		const additionalParameters={}
		if (arrays[`_editable_skills`].includes(_roll)){
			const prefix_skill=_roll.slice(0,-2);
			additionalParameters['editable_name']=`${_roll}_name`;
			additionalParameters['editable_type']=prefix_skill.replace('_',' ');
		}else{
			const caps = (_roll === 'humint' || _roll === 'sigint') ? _roll.toUpperCase() : _roll.replace('_',' ')
			additionalParameters['name']=caps.replace('_',' ');
		}
		
		const rollString=`${prefix_skill_roll} {{subheader=@{${roll}}}} `;

		rollwithmodifiers(rollString,roll,_queryModifier,additionalParameters);		
	});
});

Object.entries(_repeating_sections).forEach(([attrName,section]) => {
	on(`clicked:repeating_${section}:${attrName}-action`, (eventInfo) => {
		const id = eventInfo.sourceAttribute.split('_')[2];
		const queryModifier=_queryModifier;
		var _input_names = {};
		var _parameters =[];
		setRepeatingParametersAndInputNames(section, id, _parameters, _input_names)

		clicked_repeating_actions(section, _parameters, _input_names, queryModifier);

	});
});

_ritual_damages.forEach((attrName) => {
	_type_damages.forEach((type) => {
		on(`clicked:repeating_rituals:${attrName}_${type}-action`, (eventInfo) => {
			
			const id = eventInfo.sourceAttribute.split('_')[2];
			const input_names = {};
			var parameters =[];
			input_names[`ritual_type`]=attrName;
			parameters.push(`repeating_rituals_${id}_ritual_type`);
			
			
			const repsecid = `repeating_rituals_${id}`;
			input_names[`repsecid`]=repsecid;
			input_names[`name`]=`${repsecid}_name`;
			input_names[`damage_type`]=`${type}`;
			input_names[`attack_or_heal`]=`${attrName}`;	
			parameters.push(input_names[`name`]);
			
			
			setDamageRitualParametersAndInputNames(id, parameters, input_names);
			clicked_repeating_damages(parameters,input_names,attrName);
		});
	});
});


_ritual_losses.forEach((attrName) => {
	on(`clicked:repeating_rituals:${attrName}-action`, (eventInfo) => {
		
		const id = eventInfo.sourceAttribute.split('_')[2];
		const input_names = {};
		var parameters =[];
		input_names[`ritual_type`]=attrName;
		parameters.push(`repeating_rituals_${id}_ritual_type`);
		
		
		const repsecid = `repeating_rituals_${id}`;
		input_names[`repsecid`]=repsecid;
		input_names[`name`]=`${repsecid}_name`;
		parameters.push(input_names[`name`]);
		
		
		setRitualCostParametersAndInputNames(repsecid, parameters, input_names);
		CurrentValues.forEach((attrName) => {
			input_names[attrName]=`${attrName}`;
			parameters.push(attrName);
		});
		
		clicked_repeating_rituals_cost(parameters,input_names);
	});
});

_alldamages.forEach((attrName) => {
	on(`clicked:repeating_weapons:${attrName}-action`, (eventInfo) => {
		
		const id = eventInfo.sourceAttribute.split('_')[2];
		var _input_names = {};
		var _parameters =[];
		setDamageParametersAndInputNames(id,attrName, _parameters, _input_names)
		_input_names['rollName']=attrName;
		clicked_repeating_damages(_parameters,_input_names);
	});
});



// levelup character
on("clicked:levelup", () =>{
    const copyarray=arrays['_skills'];  // copy of the array containing all skills ranks
    
	console.dir(copyarray);              
    getSectionIDs(`summary`, function(idarray) {
      for(var i=0; i < idarray.length; i++) {
        removeRepeatingRow("repeating_summary_" + idarray[i]);
      }
    });
	
	
	const summary={};                   // object to store the summary of the changes
    const update={};                    // object to update the attributes
	const newrowattrs={};               // object to create a new row in the repeating_summary section   
	const named_skills = copyarray.map((sk) => `${sk}_name`);
	const failed_skills = copyarray.map((sk) => `${sk}_fail`);
	getAttrs(copyarray.concat(named_skills,failed_skills),(val)=>{
		var newrowid;
		var oldval=0;
		var newval=0;
		var name;  
		var var_rnd=0;                    // random variable of 1d4
	
		copyarray.forEach( (sk) => {
        	if (val[`${sk}_fail`]=='on'){                    //if the checkbox is checked
        		var_rnd=Math.ceil(Math.random() * 4);     // generate a random number for each checked value (less number generated)
    
				oldval=(parseInt(val[`${sk}`])||0);
				newval=oldval+var_rnd;
				name=val[`${sk}_name`];
				summary[`${sk}`]=var_rnd;        // how much the skill has changed 0-3
				update[`${sk}`]=newval;  // new value of the skill
				update[`${sk}_fail`]='off';   // uncheck checkbox
				
				newrowid = generateRowID();
				newrowattrs['repeating_summary_' + newrowid + '_skillname'] = name;
				newrowattrs['repeating_summary_' + newrowid + '_oldval'] = oldval;
				newrowattrs['repeating_summary_' + newrowid + '_newval'] = newval;
			}
		});
		
	});	
	getSectionIDs(`skills`, function(idarray) {
			var rep_array=[];
			var rep_rank=[];
			var rep_name=[];
			var rep_fail=[];

			idarray.forEach((id) => {
				rep_array.push(`repeating_skills_${id}`);		
			});
			rep_rank=rep_array.map((sk) => `${sk}_rank`);
			rep_name=rep_array.map((sk) => `${sk}_name`);
			rep_fail=rep_array.map((sk) => `${sk}_fail`);
			getAttrs(rep_rank.concat(rep_name,rep_fail),(val)=>{
				var newrowid;
				var oldval=0;
				var newval=0;
				var name;  
				var var_rnd=0;                    // random variable of 1d4
			
				rep_array.forEach( (sk) => {
					if (val[`${sk}_fail`]=='on'){                    //if the checkbox is checked
						var_rnd=Math.ceil(Math.random() * 4);     // generate a random number for each checked value (less number generated)
						
						oldval=(parseInt(val[`${sk}_rank`])||0);
						newval=oldval+var_rnd;
						name=val[`${sk}_name`];
						summary[`${sk}`]=var_rnd;                    // how much the skill has changed 0-3
						update[`${sk}_rank`]=newval;  // new value of the skill
						update[`${sk}_fail`]='off';                           // uncheck checkbox
							
						newrowid = generateRowID();
						newrowattrs['repeating_summary_' + newrowid + '_skillname'] = name;
						newrowattrs['repeating_summary_' + newrowid + '_oldval'] = oldval;
						newrowattrs['repeating_summary_' + newrowid + '_newval'] = newval;	
                	}
				});
				setAttrs(Object.assign(update,newrowattrs),{silent:false},()=>{
					console.log('inside repeating section');
					console.info(newrowattrs);
					console.info(update);
				});
			});
		});
});
