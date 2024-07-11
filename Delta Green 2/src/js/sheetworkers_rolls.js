

const updateRepeatingRollsonOpen = () => {
	
	getAttrs(['character_id'], (values) => {
		
		const charid=values.character_id;
		console.info('Repeating Sections',_repeating_sections);
		Object.entries(_repeating_sections).forEach(([element,section])=> {
			getSectionIDs(section, function(idarray) {
				var update={};
				console.log('section: '+section+' element: '+element+' idarray: '+idarray);
				idarray.forEach(id => {
					update[`repeating_${section}_${id}_${element}_action`] = `%{${charid}|repeating_${section}_${id}_${element}-action}`;
					update[`repeating_${section}_${id}_${element}_r`] = id;
				});				
				console.info('Value of update inside repeating rollUpdate',update);
				setAttrs(update, {silent:true}, () => {
					console.log('Repeating Rolls updated');
					console.info('update',update);
				});
				getAttrs(Object.keys(update),function(v){
					Object.entries(v).forEach(([key,value])=>{
						console.log(`key: ${key} value: ${value}`);
					});
				});
			});
		});
	});
};


const updateRollsOnOpen= () => {
	console.log('===update rolls===');
	const fullrolls = _allrolls;
	console.info(`all rolls`,_allrolls);
	getAttrs(['character_id'], (values) => {
		var update={};
		const charid=values.character_id;
		console.log('character id: '+charid);
		fullrolls.forEach(roll => {
			update[`${roll}_action`] = `%{${charid}|${roll}-action}`;
		});
		console.info('Value of update inside rollUpdate',update);
		setAttrs(update, {silent:false}, () => {
			console.log('Rolls updated');
			console.log('update:',update);
		});
	});
};
//='roll' value=`@{gm_toggle} &{template:rolls} {{header=^{${val}}}} {{subheader=@{${attrName}}}} {{rating=[[@{${attrName}}+?{Modifier|,0|+20%,20|+40%,40|-20%,-20|-40%,-40|custom (%),?{custom (%)}}]]}}  {{modifier=[[?{Modifier|,0|+20%,20|+40%,40|-20%,-20|-40%,-40|custom (%),?{custom (%)}}]]}}  {{dice=[[1d100]]}}`)
const changeRepeatingRolls = (section,element,id) => {
	const attrName = `repeating_${section}_${id}_${element}`;
	getAttrs(['character_id'], (values) => {
		const character_id = values.character_id;
		const update = {};
		update[`${attrName}_action`] = `%{${character_id}|${attrName}-action}`;
		update[`${attrName}_r`] = id;
		console.info(update);
		setAttrs(update, {silent:true}, () => {
			console.log(`Update repeating ${element} rolls`);
		});
	});
	
};

const rollwithmodifiers = (rollString,roll,queryModifier) => {
	getAttrs(arrays['_derived_modifiers'], (values) => {
		console.log('wp: '+values['willpower_points']);
		console.log('low wp: '+values['low_will_power']);
		console.log('zero wp: '+values['zero_will_power']);

		///////////////////////////////////////////////////////////
		const wp_modifiers=check_for_wp_modifiers(values,roll);

		const _zero_will_power = wp_modifiers.zero_will_power;
		const _low_will_power = wp_modifiers.low_will_power;
		
		var rollValue = `${rollString} {{rating=[[@{${roll}}]]}}  {{zero_will_power=${_zero_will_power}}} {{low_will_power=${_low_will_power}}}}  {{modifier=[[${queryModifier}]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}`;		

		if(_zero_will_power!='[[1]]') {
			rollValue = `${rollValue}`; 			
		}

		console.log(rollValue);
		const isSkill=arrays[`_skills`].concat([`unnatural`]).includes(roll) ? 1 : 0;
		console.log(`isSkill: ${isSkill}`);
		const rollFail=`${roll}_fail`;
		rollSkillAndStats(rollValue,roll,rollFail,isSkill);

	});

};


const check_for_wp_modifiers = (values,roll) => {
	console.log('wp: '+values['willpower_points']);
	console.log('low wp: '+values['low_will_power']);
	console.log('zero wp: '+values['zero_will_power']);
	
	const _willpower_points = parseInt(values[`willpower_points`]) || 0;
	const _zero_will_power = (values[`zero_will_power`]== 1 && _willpower_points== 0 && roll !== 'luck') ? '[[1]]' : '[[0]]';
	const _low_will_power  = (values[`low_will_power`] == 1 && _willpower_points <= 2 && _willpower_points>0 && roll !== 'luck' && roll !== 'sanity_points') ? '[[1]]' : '[[0]]';
	
	console.log(`zero will power: ${_zero_will_power}`);
	console.log(`low will power: ${_low_will_power}`);
	return {zero_will_power: _zero_will_power, low_will_power: _low_will_power};
};


const rollSkillAndStats=(rollValue,rollName,rollFail,_isSkill) => {
	
	startRoll(`${rollValue} {{isSkill=[[${_isSkill}]]}}`, (results)=> {
		console.log(results);
		const isSkill=(results.results.isSkill.result==0)? false : true;
		const modifier=results.results.modifier.result;
		const zero_will_power=results.results.zero_will_power.result;
		const low_will_power=results.results.low_will_power.result;
		const rating=results.results.rating.result;
		const fullmodifier= (modifier - (20*low_will_power))>40 ? 40 : (modifier - (20*low_will_power));
		const dice=results.results.dice.result;
		const rating_check=(rating+fullmodifier)<0 ? 0 : (rating+fullmodifier)>99 ? 99 : (rating+fullmodifier);
		var newroll={a: 15,b:-2};
		console.log(`full modifier: ${fullmodifier}`);
		console.log(`rating: ${rating}`);
		console.log(`rating check: ${rating_check}`);
		console.log(`dice: ${dice}`);
		var isSuccess=0;
		var isCritical=0;
		
		if (rating<100){
			isSuccess=dice<=rating_check ? 1 : 0;
			isCritical=criticals.includes(dice) ? 1 : 0;
		}else {
			const score=Math.round(rating/5);
			isSuccess= dice !=99 ? 1 : 0;
			isCritical= (criticals.includes(dice) || dice<=score) ? 1 : 0;
		}	
		
		if (isSkill && isSuccess==0){
			var failure={};
			failure[`${rollFail}`]='on';
			console.info(`Skill ${rollName} failed`);
			console.info(`failure`,failure);
			setAttrs(failure, () => {
				console.info(`Skill ${rollName} failed`);
			});
		}


		newroll={
			rating: rating_check,
			dice: dice,
			modifier: fullmodifier,
			isSuccess: isSuccess,
			isCritical: isCritical,
			zero_will_power: zero_will_power,
			low_will_power: low_will_power
		};

		console.log(newroll);

		finishRoll(results.rollId,newroll);
	});
};

const rollBonds=(rollValue,_value,_names,_parameters) => {
	
	startRoll(`${rollValue}`, (results)=> {
		console.log(results);

		
		///////////////////////////////////////////////////////////
		const dice=results.results.dice.result;
		const local_wp=Math.max(0,parseInt(results.results.local_wp.result)-dice);
		const score=Math.max(0,parseInt(results.results.score.result)-dice);

		const zerowp=local_wp==0 ? 1 : 0;
		console.log(`local_wp: ${local_wp}`);
		console.log(`score: ${score}`);
		console.log(`dice: ${dice}`);
		console.log(`zerowp: ${zerowp}`);
		var update={};
		console.info('parameters',_parameters);
		console.info('names',_names);
		update[_names['local_wp_points']]=local_wp;
		update[`willpower_points`]=local_wp;
		update[_names[`score`]]=score;
		
		newroll={
			dice: dice,
			local_wp: local_wp,
			score: score,
			zerowp: zerowp
		};

		finishRoll(results.rollId,newroll);
		setAttrs(update,{silent:false}, () => {
			console.info(`Bonds updated`,update);
		});
	});
};

const rollWeaponsAndRituals = (rollValue,rollName,isLethal,hasAmmo) => {

};


const clicked_repeating_weapons= (parameters) => {
	console.info(`parameters:`, parameters)
	getAttrs(parameters, (values) => {
	});
};

const clicked_repeating_actions = (type,parameters,names,queryModifier) => {
	if (type==='weapons'){
		clicked_repeating_weapons(parameters,names,queryModifier);
	}
	if (type==='bonds'){
		clicked_repeating_bonds(parameters,names,queryModifier);
	}
	if (type==='special'){
		clicked_repeating_skills(parameters,names,queryModifier);
	}
	if (type==='skills'){
		clicked_repeating_skills(parameters,names,queryModifier);
	}
}

const clicked_repeating_skills = (parameters,names,queryModifier) => {
	getAttrs(parameters, (values) => {
		const skillname=values[names['name']];
		const skillfail=names['fail'];
		const skillrank=parseInt(values[names['rank']]) || 0;
		console.log(`skillname: ${skillname} name: ${names['name']}`);
		console.log(`skillrank: ${skillrank} rank: ${names['rank']}`);
		console.info('values',values);


		const rollString=`${prefix_skill_roll} {{header=${skillname}}} {{subheader=${skillrank}}} `;
		///////////////////////////////////////////////////////////
		const wp_modifiers=check_for_wp_modifiers(values);

		const _zero_will_power = wp_modifiers.zero_will_power;
		const _low_will_power = wp_modifiers.low_will_power;
		const rating=parseInt(values[parameters[names['rank']]]) || 0;
		var rollValue = `${rollString} {{rating=[[${skillrank}]]}}  {{zero_will_power=${_zero_will_power}}} {{low_will_power=${_low_will_power}}}}  {{modifier=[[${queryModifier}]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}`;		


		if(_zero_will_power!='[[1]]') {
			rollValue = `${rollValue}`; 			
		}

		console.log(rollValue);
		rollSkillAndStats(rollValue,skillname,skillfail,1);


	});

};



const clicked_repeating_bonds = (parameters,names) => {
	getAttrs(parameters, (values) => {
		const bondname=values[names['name']];
		const bondscore=parseInt(values[names['score']]) || 0;
        const local_wp_points=parseInt(values[names['local_wp_points']]) || 0;
		const local_san_points=parseInt(values[names['local_san_points']]) || 0;
		const charid=values['character_id'];
		console.log(`bondname: ${bondname} name: ${names['name']}`);
		console.log(`bondscore: ${bondscore} score: ${names['score']}`);
		console.log(`local_wp_points: ${local_wp_points} wp_points: ${parameters[`willpower_points`]}`);
		console.log(`local_san_points: ${local_san_points} san_points: ${parameters[`sanity_points`]}`);
		console.info('values',values);


		const rollString=`${prefix_bond_roll} {{header=${bondname}}} {{subheader=${bondscore}}} `;
		///////////////////////////////////////////////////////////
		
		var rollValue = `${rollString} {{zerowp=[[0]]}} {{score=[[${bondscore}]]}} {{local_wp=[[${local_wp_points}]]}} {{local_sanity=[[${local_san_points}}]]}} {{repress= [^{repress}](~${charid}|sanity_points)}}`;
		rollValue=`${rollValue} {{projection=1}} {{repression=1}}`;
		console.info('rollValue',rollValue);

		console.log(rollValue);
		rollBonds(rollValue,values,names,parameters);


	});

};
// Important functions
const _allrolls=arrays['_derived_rolls'].concat(arrays[`_stats`],arrays[`_skills`],['unnatural']);
_allrolls.forEach(roll => {
		const _roll = (roll === 'sanity_points') ? 'sanity' : roll;
		
		const queryModifier=_queryModifier;
		on(`clicked:${roll}-action`, (eventInfo) => {
			console.log(eventInfo);
			var _header = ``;
			
			if (arrays[`_editable_skills`].includes(_roll)){
				console.log('editable skill');
				const prefix_skill=_roll.slice(0,-2);
				console.log(`prefix: ${prefix_skill}`);
				getAttrs([`${_roll}_name`], (values) => {
					_header = `{{header=^{${prefix_skill.replace('_',' ')}} (${values[`${_roll}_name`]})}}`;
				
					console.log(`header: ${_header}`);
					const rollString=`${prefix_skill_roll} ${_header} {{subheader=@{${roll}}}} `;
					rollwithmodifiers(rollString,roll,queryModifier);
				});
			}else{
				const caps = (_roll === 'humint' || _roll === 'sigint') ? _roll.toUpperCase() : _roll.replace('_',' ')
				_header = `{{header=^{${caps.replace('_',' ')}}}}`;
				const rollString=`${prefix_skill_roll} ${_header} {{subheader=@{${roll}}}} `;
				rollwithmodifiers(rollString,roll,queryModifier);
			
			}
	
		});
});
on('clicked:repeating_weapons:weapon-action', (eventInfo) => {
	console.log(eventInfo);
	const id = eventInfo.sourceAttribute.split('_')[2];
	var weaponRollValue = `@{gm_toggle} &{template:fancy-attack} {{dice=[[1d100]]}}`;
	const weaponsAttrs = arrays[`_weapon`];
	
	var _header = ``;
	var _rank =``;
	var _input_names = {};
	var _parameters =weaponAttrs.map(el => `repeating_weapons_${id}_${el}`);
	// Common for all rolls, modifiers
	_parameters.push(`willpower_points`);
	_parameters.push(`low_will_power`);
	_parameters.push(`zero_will_power`);

	clicked_repeating_weapons(_parameters);
});


Object.entries(_repeating_sections).forEach(([element,section]) => {
	on(`clicked:repeating_${section}:${element}-action`, (eventInfo) => {
		console.log(eventInfo);
		const id = eventInfo.sourceAttribute.split('_')[2];
		const queryModifier=_queryModifier;
		var _header = ``;
		var _rank =``
		var _input_names = {};
		var _parameters =[`repeating_${section}_${id}_name`];
		// Common for all rolls, modifiers
		_parameters.push(`willpower_points`);
		_parameters.push(`low_will_power`);
		_parameters.push(`zero_will_power`);

		_input_names[`name`]=`repeating_${section}_${id}_name`;
		//skill dependent parameters
		if (section==='skills'){
			_input_names[`rank`]=`repeating_${section}_${id}_rank`;	
			_input_names[`fail`]=`repeating_${section}_${id}_fail`;
			_parameters.push(`repeating_${section}_${id}_rank`);
			_parameters.push(`repeating_${section}_${id}_fail`);
			clicked_repeating_skills(_parameters,_input_names,queryModifier);
		//bond dependent parameters
		}else if (section==='bonds'){
			_parameters.push(`repeating_${section}_${id}_score`);
			_parameters.push(`repeating_${section}_${id}_wp_points`);
			_parameters.push(`repeating_${section}_${id}_san_points`);
		//special training dependent parameters
		}else if (section==='special'){
			_parameters.push(`repeating_${section}_${id}_skill_or_stat_used`);
		}else{	
			console.error(`Section ${section} not found`);
		}

		console.log(`parameters: ${_parameters}`);

		//getAttrs(_parameters, (values) => {
		//	Object.entries(values).forEach(([key,value]) => {
		//		console.log(`key: ${key} value: ${value}`);
		//	});
		//});

	});
});



//levelup character
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

	var addskill=[];
	
	getSectionIDs('skills', (idarray) => {
		addskills=idarray.map(id =>`repeating_skills_${id}`) ; 
		console.log(addskills);  //log of debugging to be sure
	
		copyarray=copyarray.concat(addskills);           // concatenate skill array with repeating skill array
		console.dir(copyarray);              
		getSectionIDs("summary", function(idarray) {
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
});
