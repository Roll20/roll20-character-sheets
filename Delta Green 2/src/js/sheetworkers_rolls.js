
const updateRepeatingSection = (section, element, id, character_id) => {
    const update = {};
    const attrPrefix = `repeating_${section}_${id}`;
	const attrName = `${attrPrefix}_${element}`;
    update[`${attrName}_action`] = `%{${character_id}|${attrName}-action}`;
    update[`${attrName}_r`] = id;

	console.log(' in update repeating section',section);
	if (section === 'weapons') {
		update[`${attrPrefix}_damage_action`] = `%{${character_id}|${attrPrefix}_damage-action}`;
		update[`${attrPrefix}_damage_critical_action`] = `%{${character_id}|${attrPrefix}_damage_critical-action}`;
		update[`${attrPrefix}_lethality_action`] = `%{${character_id}|${attrPrefix}_lethality-action}`;
		update[`${attrPrefix}_lethality_critical_action`] = `%{${character_id}|${attrPrefix}_lethality_critical-action}`;
		update[`${attrPrefix}_selective_fire_action`] = `%{${character_id}|${attrPrefix}_selective_fire-action}`;
		update[`${attrPrefix}_selective_fire_critical_action`] = `%{${character_id}|${attrPrefix}_selective_fire_critical-action}`;
		update[`${attrPrefix}_second_damage_action`] = `%{${character_id}|${attrPrefix}_second_damage-action}`;
		update[`${attrPrefix}_second_damage_critical_action`] = `%{${character_id}|${attrPrefix}_second_damage_critical-action}`;
	}
    return update;
};
const updateRepeatingRollsonOpen = () => {
	
	getAttrs(['character_id'], (values) => {
		
		const character_id=values.character_id;
		console.info('Repeating Sections',_repeating_sections);
		Object.entries(_repeating_sections).forEach(([element,section])=> {
			console.log(' in update repeating rolls on open',section);
			getSectionIDs(section, function(idarray) {
				var update={};
				console.log('section: '+section+' element: '+element+' idarray: '+idarray);
				idarray.forEach(id => {
					Object.assign(update, updateRepeatingSection(section, element, id, character_id));
				});				
				console.info('Value of update inside repeating rollUpdate',update);
				setAttrs(update, {silent:true}, () => {
					console.log('Repeating Rolls updated');
					console.info('update',update);
				});
				
			});
		});
		Object.entries(_additional_repeating_sections).forEach(([element,section])=> {
			console.log(' in update repeating rolls on open',section);
			getSectionIDs(section, function(idarray) {
				var update={};
				console.log('section: '+section+' element: '+element+' idarray: '+idarray);
				idarray.forEach(id => {
					Object.assign(update, updateRepeatingSection(section, element, id, character_id));
				});				
				console.info('Value of update inside repeating rollUpdate',update);
				setAttrs(update, {silent:true}, () => {
					console.log('Repeating Rolls updated');
					console.info('update',update);
				});
				
			});
		});
		Object.entries(_repeating_damages).forEach((element)=> {
			getSectionIDs('weapons', function(idarray) {
				var update={};
				console.log('section: weapons element: '+element+' idarray: '+idarray);
				idarray.forEach(id => {
					update[`repeating_weapons_${id}_${element}`] = `%{${character_id}|repeating_weapons_${id}_${element}`;
				});				
				console.info('Value for weapons damage',update);
				getAttrs(_repeating_ammo.map((element) => `repeating_weapons_${id}_${element}`), (values) => {
					const currentAmmo=Math.max(0,parseInt(values['ammo']) || 0);
					const hasammo=values['hasammo']==='active' ? 1 : 0;
					const ammo_total=Math.max(0,parseInt(values['ammo_total']) || 0);
					if (ammo_total>=0) {
						update['hasammo']='inactive';
					}else{
						update['hasammo']='active';
					}

					setAttrs(update, {silent:true}, () => {
						console.log('Repeating weapon damage updated');
						console.info('update',update);
					});
				});
			});
		})
	});
};


const updateRollsOnOpen= () => {
	console.log('===update rolls===');
	const fullrolls = _allrolls;
	console.info(`all rolls`,_allrolls);
	getAttrs(['character_id'], (values) => {
		var update={};
		const character_id=values.character_id;
		console.log('character id: '+character_id);
		fullrolls.forEach(roll => {
			update[`${roll}_action`] = `%{${character_id}|${roll}-action}`;
		});
		console.info('Value of update inside rollUpdate',update);
		setAttrs(update, {silent:false}, () => {
			console.log('Rolls updated');
			console.log('update:',update);
		});
	});
};

const changeRepeatingRolls = (section,element,id) => {
	console.log(' in change repeating rolls',section);
	const attrName = `repeating_${section}_${id}_${element}`;
	getAttrs(['character_id'], (values) => {
		const character_id = values.character_id;
		const update = updateRepeatingSection(section, element, id, character_id);
		console.info(update);
		setAttrs(update, {silent:true}, () => {
			console.log(`Update repeating ${element} rolls`);
		});
	});
	
};

const rollwithmodifiers = (rollString,rollName,queryModifier,additionalParameters) => {
	initializeRolls();		// Initialize the rolls if flag is not set

	
	const attr_to_get=arrays['_derived_modifiers']
	if (additionalParameters.hasOwnProperty('editable_name')) {
		attr_to_get.push(additionalParameters['editable_name']);
	}

	getAttrs(attr_to_get, (values) => {
		console.log('wp: '+values['willpower_points']);
		console.log('low wp: '+values['low_willpower']);
		console.log('zero wp: '+values['zero_willpower']);

		///////////////////////////////////////////////////////////
		const wp_modifiers=check_for_wp_modifiers(values,rollName);

		const _zero_willpower = wp_modifiers.zero_willpower;
		const _low_willpower = wp_modifiers.low_willpower;

		var rollValue = `${rollString} {{rating=[[@{${rollName}}]]}}`;
		rollValue= `${rollValue} {{zero_willpower=${_zero_willpower}}}`;
		rollValue= `${rollValue} {{low_willpower=${_low_willpower}}}} `;
		rollValue= `${rollValue} {{modifier=[[${queryModifier}]]}}`;
		rollValue= `${rollValue} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}`;		
		var _header = ``;
		if (values.hasOwnProperty(additionalParameters['editable_name'])) {
			_header = '{{header=^{'+additionalParameters['editable_type']+'}';
			_header = _header +' ('+values[additionalParameters['editable_name']]+')}}';
		}else {
			_header = '{{header=^{'+additionalParameters['name']+'} }}';
		}
		rollValue = `${rollValue} ${_header}`;
                

		if(_zero_willpower!='[[1]]') {
			rollValue = `${rollValue}`; 			
		}

		const isSkill=arrays[`_skills`].includes(rollName) ? 1 : 0;
		const isStat=arrays[`_stats`].includes(rollName) ? 1 : 0;

		var rollType=0;
		if (isSkill==1){
			rollType=1;
		} else if (isStat==1){
			rollType=2;
		}
		rollFail=`${rollName}_fail`;
		rollSkillAndStats(rollValue,rollName,rollFail,rollType);

	});

};


const check_for_wp_modifiers = (values,roll) => {
	console.log('wp: '+values['willpower_points']);
	console.log('low wp: '+values['low_willpower']);
	console.log('zero wp: '+values['zero_willpower']);
	
	const _willpower_points = parseInt(values[`willpower_points`]) || 0;
	const _zero_willpower = (values[`zero_willpower`]== 1 && _willpower_points== 0 && roll !== 'luck') ? '[[1]]' : '[[0]]';
	const _low_willpower  = (values[`low_willpower`] == 1 && _willpower_points <= 2 && _willpower_points>0 && roll !== 'luck' && roll !== 'sanity_points') ? '[[1]]' : '[[0]]';
	
	console.log(`zero willpower: ${_zero_willpower}`);
	console.log(`low willpower: ${_low_willpower}`);
	return {zero_willpower: _zero_willpower, low_willpower: _low_willpower};
};


const check_success= (dice,rollName,rollFail,rating,typeRoll=0) => {
	// typeRoll=2 for stats -> can go above 100
	// typeRoll=1 for skill -> have to check for failure
	// typeRoll=0 for attacks and special
	var isSuccess=0;
	var isCritical=0;
	const criticals=[1,11,22,33,44,55,66,77,88,99,100];
	if (typeRoll<2 || rating<100){ // only stats can go above 100 
		isSuccess= dice<=rating ? 1 : 0;
		isCritical=criticals.includes(dice) ? 1 : 0;
	}else{
		const score=Math.round(rating/5);
		isSuccess= dice !=99 ? 1 : 0;
		isCritical= (criticals.includes(dice) || dice<=score) ? 1 : 0;
	}	

	if (typeRoll==1 && isSuccess==0){ // you need to check for failure when it's a skill
		var failure={};
		failure[`${rollFail}`]='on';
		console.info(`Skill ${rollName} failed`);
		console.info(`failure`,failure);
		setAttrs(failure, () => {
			console.info(`Skill ${rollName} failed`);
		});
	}
	return [isSuccess,isCritical];
};

const rollAttacks = (rollValue,rollName,options) => {
	startRoll(`${rollValue}`, (results) => {
		console.info(results.results);
		console.info(results.results.advanced_weapons.result);
		const dice=results.results.dice.result;
		const rating=results.results.rating.result;
		const modifier=results.results.modifier.result;
		const zero_willpower=results.results.zero_willpower.result;
		const low_willpower=results.results.low_willpower.result;
		const basemodifier= (modifier - (20*low_willpower));

		
		const advanced_weapons=results.results.advanced_weapons.result;

		console.info('options',options);
		if (options.hasBlastRadius==1){
			const blast_radius=results.results.blast_radius.result;
		}
		
		var full_modifier=basemodifier;
		if (options.advanced_weapons==1){
			if (options.isShotgun==1){
				full_modifier+=20;
			}
			
			else if (options.hasBlastRadius==1){
				full_modifier+=20;
			}
			
			if (options.hasAccessories==1){
				const accessoriesMod=parseInt(results.results.accessoriesMod.result)||0;
				console.log('accessoriesMod: ',accessoriesMod);
				full_modifier+=accessoriesMod;
			}
			

		}

		full_modifier= full_modifier>40 ? 40 : full_modifier;
		const rating_check=(rating+full_modifier)<0 ? 0 : (rating+full_modifier)>99 ? 99 : (rating+full_modifier);	
		console.log('rating: ',rating);
		console.log('rating_check: ',rating_check);
		console.log('dice: ',dice);
		console.log('dice<rating:',dice<rating_check);
		console.log('dice<rating_check:',dice<rating_check);
		const [isSuccess,isCritical]=check_success(dice,rollName,'',rating_check,0)	
		
		console.log('isSuccess:',isSuccess);
		console.log('isCritical:',isCritical);

		newroll={
			rating: rating_check,
			dice: dice,
			modifier: full_modifier,
			isSuccess: isSuccess,
			isCritical: isCritical,
			zero_willpower: zero_willpower,
			low_willpower: low_willpower,
			advanced_weapons: advanced_weapons
		};


		console.log(newroll);
		finishRoll(results.rollId,newroll);
	});
};	


const rollSkillAndStats=(rollValue,rollName,rollFail,typeRoll) => {
	console.log(rollValue);
	startRoll(rollValue, (results)=> {
		console.log(results);
		const modifier=results.results.modifier.result;
		const zero_willpower=results.results.zero_willpower.result;
		const low_willpower=results.results.low_willpower.result;
		const rating=results.results.rating.result;
		const full_modifier= (modifier - (20*low_willpower))>40 ? 40 : (modifier - (20*low_willpower));
		const dice=results.results.dice.result;
		const rating_check=(rating+full_modifier)<0 ? 0 : (rating+full_modifier)>99 ? 99 : (rating+full_modifier);
		var newroll={a: 15,b:-2};
		console.log(`full modifier: ${full_modifier}`);
		console.log(`rating: ${rating}`);
		console.log(`rating check: ${rating_check}`);
		console.log(`dice: ${dice}`);
		console.log(`typeRoll: ${typeRoll}`);
		const [isSuccess,isCritical]=check_success(dice,rollName,rollFail,rating_check,typeRoll);
		newroll={
			rating: rating_check,
			dice: dice,
			modifier: full_modifier,
			isSuccess: isSuccess,
			isCritical: isCritical,
			zero_willpower: zero_willpower,
			low_willpower: low_willpower
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
		var score=Math.max(0,parseInt(results.results.score.result)-dice);
		const original_wp=parseInt(results.results.local_wp.result) || 0;

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
		if (parseInt(results.results.local_wp.result)||0 !=0){
			update[_names[`score`]]=score;
		}else{
			score=parseInt(results.results.score.result) || 0;
		}
		update[_names[`color`]]=BondButtonColor(score);

		newroll={
			dice: Math.min(dice,original_wp),
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

const _alldamages=['damage','damage_critical','second_damage','second_damage_critical',
	'lethality','lethality_critical','selective_fire','selective_fire_critical'
];

_alldamages.forEach((element) => {
	console.log('element: '+element);
	console.log(`clicked:repeating_weapons:${element}-action`);
	on(`clicked:repeating_weapons:${element}-action`, (eventInfo) => {
		console.log(eventInfo);
		const id = eventInfo.sourceAttribute.split('_')[2];
		var _input_names = {};
		var _parameters =[];
		setDamageParametersAndInputNames(id,element, _parameters, _input_names)
		clicked_repeating_damages(_parameters,_input_names);
	});
});

const check_sanloss = (sanloss,element) => {
	console.log('element: '+element);
	console.log('sanloss: '+sanloss);
	if (element==='sanity_success'){
		console.log('sanity_success');
		return sanloss=='' ? 0 : sanloss;
	} else if(element==='sanity_failure'){ 
		console.log('sanity_failure');
		return sanloss=='' ? 1 : sanloss;
	}
};

const _npc_san_losses=['sanity_success','sanity_failure'];

_npc_san_losses.forEach((element) => {
	console.log('element: '+element);
	on(`clicked:${element}-action`, (eventInfo) => {
		console.log(eventInfo);
		getAttrs([element],(values) => {
			const sanloss=check_sanloss(values[element],element);
			console.log(sanloss);
			rollSanityDamages(sanloss,element);
		});
	});
});

const _ritual_losses=['pay_cost','force_connection','accept_failure'];

_ritual_losses.forEach((element) => {
	console.log('element: '+element);
	on(`clicked:repeating_rituals:${element}-action`, (eventInfo) => {
		console.log(eventInfo);
		const id = eventInfo.sourceAttribute.split('_')[2];
		const input_names = {};
		var parameters =[];
		input_names[`ritual_type`]=element;
		parameters.push(`repeating_rituals_${id}_ritual_type`);
		console.log('ritual_type: '+element);
		console.log('id: '+id);
		const repsecid = `repeating_rituals_${id}`;
		input_names[`repsecid`]=repsecid;
		input_names[`name`]=`${repsecid}_name`;
		parameters.push(input_names[`name`]);
		console.log('repsecid: '+repsecid);
		console.info('parameters',parameters);
		setRitualCostParametersAndInputNames(repsecid, parameters, input_names);
		CurrentValues.forEach((element) => {
			input_names[element]=`${element}`;
			parameters.push(element);
		});
		console.log('log all parameters: ',parameters);
		clicked_repeating_rituals_cost(parameters,input_names);
	});
});

const clicked_repeating_rituals_cost = (parameters,names) => {
	getAttrs(parameters, (values) => {
		const ritual_type = names['ritual_type'];
		// cost of the ritual
		const other_costs={};
		getOtherCosts(other_costs,values,names,RitualCosts);
		getOtherCosts(other_costs,values,names,CurrentValues);
		console.info('other costs: ',other_costs);

		if(ritual_type==='pay_cost'){
			paythecost(other_costs['sanity_loss_high'],other_costs);
		}

		if(ritual_type==='force_connection'){
			forceconnection(other_costs['sanity_loss_high'],other_costs);
		}	
		
		if(ritual_type==='accept_failure'){
			acceptfailure(other_costs['sanity_loss_low'],other_costs);
		}

	});
};


const setDamageParametersAndInputNames=(id,element, _parameters, _input_names) => {
	_input_names[`name`] = `repeating_weapons_${id}_name`;
	_input_names[`repsecid`] = `repeating_weapons_${id}`;
	_parameters.push(_input_names[`name`]);
	
	
	_input_names[`hasammo`] = `repeating_weapons_${id}_hasammo`;
	_parameters.push(_input_names[`hasammo`]);
	var flagCritical=false;	
	flagCritical= flagCritical || (element==='damage_critical');
	flagCritical= flagCritical || (element==='second_damage_critical');
	flagCritical= flagCritical || (element==='lethality_critical');
	flagCritical= flagCritical || (element==='selective_fire_critical');
	
	_input_names[`isCritical`] = (flagCritical==true) ? 1 :  0;
	const isCritical=_input_names[`isCritical`];	

	console.log('isCritical: '+isCritical);
	
	
	if (element==='damage' || element==='damage_critical') {
		console.log('damage');
		if (isCritical==1){
			_input_names[`header`] = `damage (×2)`;
		}else{
			_input_names[`header`] = `damage`;
		}
		_input_names[`damage`] = `repeating_weapons_${id}_damage`;
		_parameters.push(_input_names[`damage`]);
		_input_names[`damage_type`]='damage';
	}else if (element==='second_damage' || element==='second_damage_critical') {
		console.log('double damage');
		_input_names[`damage_type`]='damage';
		
		if (isCritical==1){
			_input_names[`header`] = `damage (×2)`;	
		}else{
			_input_names[`header`] = `damage`;
		}

		_input_names[`damage`] = `repeating_weapons_${id}_second_damage_value`;
		_parameters.push(_input_names[`damage`]);
	}else if (element==='lethality' || element==='lethality_critical') {
		console.log('lethality');
		_input_names[`damage_type`]='lethality';
		if (isCritical==1){
			_input_names[`header`] = `lethality (×2)`;
		}else{
			_input_names[`header`] = `lethality`;
		}
		_input_names[`damage`] = `repeating_weapons_${id}_lethality_percent`;
		_parameters.push(_input_names[`damage`]);
	}else if (element==='selective_fire' || element==='selective_fire_critical') {

		if (isCritical==1){
			_input_names[`header`] = `selective fire (×2)`;
		}else{
			_input_names[`header`] = `selective fire`;
		}
		
		_input_names[`damage_type`]='lethality';
		_input_names[`header`] = `selective fire`;
		_input_names[`damage`] = `repeating_weapons_${id}_selfireLethality`;
		_parameters.push(_input_names[`damage`]);
		_input_names[`selfireType`] = `repeating_weapons_${id}_selfireType`;
		_parameters.push(_input_names[`selfireType`]);
	}


	_input_names[`ammo`] = `repeating_weapons_${id}_ammo`;
	_parameters.push(_input_names[`ammo`]);
	_input_names[`track_bullets`] = `track_bullets`;
	_parameters.push(_input_names[`track_bullets`]);
};

const check_track_ammo=(rollString,trackAmmo,currentAmmo,used_ammo=1) => {
	if (trackAmmo==1) {
		rollString = `${rollString} {{trackbullets=[[1]]}} {{used_ammo=[[${used_ammo}]]}}`;
		rollString = `${rollString} {{current_ammo=[[${currentAmmo}]]}}`;
	} else {
		rollString = `${rollString} {{trackbullets=[[0]]}}`;
	}
	return rollString;
};

const getUsedAmmo=(selfireType='') => {
	if (selfireType==='short burst'){return 3} ;
	if (selfireType==='long burst'){return 5} ;
	if (selfireType==='short spray'){return 10} ;
	if (selfireType==='long spray'){return 20} ;
	return 1;
}

const clicked_repeating_damages = (parameters,names) => {
	getAttrs(parameters, (values) => {
		const isCritical=names['isCritical'];
		const track_bullets=values[names['track_bullets']]==='active' ? 1 : 0;
		const hasammo=values[names['hasammo']]==='active' ? 1 : 0;
		const trackAmmo=track_bullets==1 && hasammo==1 ? 1 : 0;
		const currentAmmo=Math.max(0,parseInt(values[names['ammo']]) || 0);
		const selfireType=(values[names['selfireType']]) || '';
		const usedAmmo=getUsedAmmo(selfireType);
		console.log('trackAmmo: '+trackAmmo);
		console.log('hasammo: '+hasammo);
		console.log('currentAmmo: '+currentAmmo);
		console.log('selfireType: '+selfireType);
		console.log('usedAmmo: '+usedAmmo);
		const damage_type=names['damage_type'];
		var damage=values[names['damage']];

		const header=names['header'];
		
		var rollString=`${prefix_damage_roll} {{header=^{${header}}}}`;

		
		var damageString='';

		if (damage_type === 'damage') {
			if (isCritical==1){
				damageString=`{{damage=[[2*${damage}]]}}`;
			}else{
				damageString=`{{damage=[[${damage}]]}}`;
			}
			
			rollString = `${rollString}  ${damageString}`;
			
			rollString = check_track_ammo(rollString,trackAmmo,currentAmmo,usedAmmo)
		}else if (damage_type === 'lethality') {
			if (isCritical==1){
				damage=2*damage;
			}
			damageString=`{{lethality=[[${damage}]]}}`;
			
			rollString = `${rollString} ${damageString}`;
			rollString = `${rollString} {{roll=[[1d100]]}}`;
			
			rollString = check_track_ammo(rollString,trackAmmo,currentAmmo,usedAmmo)
		}
		rollString = `${rollString} {{isCritical=[[${isCritical}]]}}`;
		
		console.info(rollString);
		
		startRoll(rollString, (results) => {
			
			const newroll = getRollDamage(results,trackAmmo,damage_type,isCritical);
			
			newroll['isCritical']=isCritical;
			newroll['trackbullets']=trackAmmo;
			finishRoll(results.rollId,newroll);
			if (trackAmmo==1){
				const update={};
				update[names['ammo']]=newroll['current_ammo'];
				setAttrs(update, () => {
					console.log('Ammo updated',update);
				});
			}
		});
	});
};


const getRollDamage= (results,trackammo,damage_type,critical) =>{
	const newroll={};
	if (trackammo==1){
		const trackbullets=[[1]];
		newroll['trackbullets']=trackbullets;
		const used_ammo=results.results.used_ammo.result;
		const current_ammo=results.results.current_ammo.result;
		const expended_ammo= current_ammo - used_ammo;

		newroll['current_ammo']= expended_ammo;
	}
	if (damage_type==='damage'){
		const damage=results.results.damage.result;
		newroll['damage']=damage;
	}
	if (damage_type==='lethality'){
		const lethality=results.results.lethality.result;
		const roll=results.results.roll.result;
		const quotient=Math.round(roll/10);
		const remainder=Math.round(roll%10);
		var computed_lethality=lethality;
		var computed_roll= quotient+ (remainder>0 ? remainder : 10);

		if (critical==1) {
			computed_lethality=lethality*2;
			computed_roll= computed_roll*2;
		}
		
		newroll['roll']=computed_roll;
		newroll['lethality']=computed_lethality;
	}
	return newroll;
};

const clicked_repeating_weapons= (parameters,names,queryModifier) => {
	getAttrs(parameters, (values) => {
		const character_id=values['character_id'];
		const repsecid= names['repsecid'];
		const skillname=values[names['name']];
		const skillrank=parseInt(values[names['rank']]) || 0;
		
		const track_bullets=values[names['track_bullets']]==='active' ? 1 : 0;
		const hasammo=values[names['hasammo']]==='active' ? 1 : 0;
		const current_ammo=Math.max(0,parseInt(values[names['ammo']]) || 0);
		
		const advanced_weapons=values[names['advanced_weapons']] === 'active' ? 1 : 0;
		
		const isShotgun = values[names['shotgun']] === 'active' ? 1 : 0;
		const hassecond_damage = values[names['second_damage']] === 'active' ? 1 : 0;
		const hasSelectiveFire = values[names['selfire']] === 'active' ? 1 : 0;
		const hasAccessories = values[names['accessories']] === 'active' ? 1 : 0;
		const hasBlastRadius = values[names['blast_radius']] === 'active' ? 1 : 0;

		const armor_piercing=values[names['armor_piercing']];
		const base_range=values[names['range']];
		const kill_radius=values[names['kill_radius']];
		console.info('values',values);
		

		const full_damage= values[names['damage']];
		const full_lethality=values[names['lethality']];

		const rollString=`${prefix_skill_roll} {{header=${skillname}}} {{subheader=${skillrank}}}`;

		const wp_modifiers=check_for_wp_modifiers(values);

		const _zero_willpower = wp_modifiers.zero_willpower;
		const _low_willpower = wp_modifiers.low_willpower;
		console.log('queryModifier: '+queryModifier);
		var rollValue = `${rollString} {{rating=[[${skillrank}]]}}  {{zero_willpower=${_zero_willpower}}} {{low_willpower=${_low_willpower}}}  {{modifier=[[${queryModifier}]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}`;		
		rollValue = `${rollValue} {{advanced_weapons=[[${advanced_weapons}]]}}`;

		

		if (base_range != "") {rollValue = rollValue + '{{base_range=' + base_range + '}}';}
		if (armor_piercing != "" || parseInt(armor_piercing)==0) {rollValue = rollValue + '{{armor_piercing=' + armor_piercing + '}}';}
		if (kill_radius != "") {rollValue = rollValue + '{{kill_radius=' + kill_radius + '}}';}


		const weaponWithAmmo= (track_bullets==1 && hasammo==1) ? 1 : 0;
		console.log('weaponWithAmmo: '+weaponWithAmmo);
		console.log('hasammo: '+hasammo);
		console.log('track_bullets: '+track_bullets);
		if (weaponWithAmmo==1 && hasammo==1) {
			rollValue = rollValue + '{{trackbullets=1}}';
			rollValue = rollValue + '{{current_ammo=' + values['ammo'] + '}}';
		}

		if (current_ammo==0 && weaponWithAmmo==1 ) {
			rollValue = rollValue + '{{noammo=1}}';
		}else{
			rollValue = rollValue + '{{wammo=0}}';
		}

		if (full_damage != "") {
			
			rollValue = rollValue + '{{damage= ['+full_damage+'](~'+ character_id +'|'+repsecid+'_damage)}}';
			rollValue = rollValue + '{{voiddamage= ['+full_damage+'](~'+ character_id +'|nothing)}}';
			
			rollValue = rollValue + '{{damage_critical= [('+full_damage+')×2](~'+ character_id +'|'+repsecid+'_damage_critical)}}';
			rollValue = rollValue + '{{voiddamage_critical= [('+full_damage+')×2](~'+ character_id +'|nothing)}}';
		}
		if (full_lethality >0) {
			const critical_lethality=full_lethality*2;
			rollValue = rollValue + '{{lethality= ['+full_lethality+'%](~'+ character_id +'|'+repsecid+'_lethality)}}';	
			rollValue = rollValue + '{{voidlethality= ['+full_lethality+'%](~'+ character_id +'|nothing)}}';

			rollValue = rollValue + '{{lethality_critical= ['+critical_lethality+'%](~'+ character_id +'|'+repsecid+'_lethality_critical)}}';
			rollValue = rollValue + '{{voidlethality_critical= ['+critical_lethality+'%](~'+ character_id +'|nothing)}}';
		}

		if (advanced_weapons===1) {
			if (isShotgun===1) {
				rollValue = rollValue + '{{shotgun=[[1]]}}';
				if (hassecond_damage===1) {
					const full_second_damage=values[names['second_damage']];
					if (full_second_damage != "") {
						rollValue = rollValue + '{{second_damage=['+full_second_damage+'](~'+ character_id +'|'+repsecid+'_second_damage)}}';
						rollValue = rollValue + '{{voidsecond_damage=['+full_second_damage+'](~'+ character_id +'|nothing)}}';
						rollValue = rollValue + '{{second_damage_critical=[('+full_second_damage+')×2](~'+ character_id +'|'+repsecid+'_second_damage_critical)}}';
						rollValue = rollValue + '{{voidsecond_damage_critical=[('+full_second_damage+')×2](~'+ character_id +'|nothing)}}';
					}
				}
			}
			//*********************
			if (hasSelectiveFire===1) {
				const full_sellethality=Math.max(0,parseInt(values[names['selfireLethality']])|| 0);
				
				const selfireType=values[names['selfireType']];
				const selfireAmmos=getUsedAmmo(selfireType)

				console.log('full_sellethality: '+full_sellethality);
				console.log('selfire type: '+selfireType);	
				if (full_sellethality>0) {
					const critical_sellethality=full_sellethality*2;
					
					rollValue = rollValue + '{{selective_fire=[' + selfireType;
					rollValue = rollValue + '(' + full_sellethality + '%)]';
					rollValue = rollValue + '(~' + character_id + '|'+repsecid+'_selective_fire)}}';
					rollValue = rollValue + '{{voidselective_fire=[' + selfireType;
					rollValue = rollValue + '(' + full_sellethality + '%)](~'+ character_id +'|nothing)}}';



					rollValue = rollValue + '{{selective_fire_critical=[' + selfireType;
					rollValue = rollValue + '(' + critical_sellethality + '%)]';
					rollValue = rollValue + '(~' + character_id + '|'+repsecid+'_selective_fire_critical)}}';
					rollValue = rollValue + '{{voidselective_fire_critical=[' + selfireType;
					rollValue = rollValue + '(' + critical_sellethality + '%)](~'+ character_id +'|nothing)}}';
				}
				
				if (selfireAmmos>=current_ammo && weaponWithAmmo==1){
					rollValue = rollValue + '{{selfire_noammo=1}}';
				}else{
					rollValue = rollValue + '{{selfire_wammo=0}}';
				}
			}
			if (hasAccessories===1) {
				rollValue = rollValue + '{{accessories=[[1]]}}';
				var accessoriesName=values[names['accessoriesName']];
				accessoriesName=(accessoriesName==='') ? '^{accessory}' : accessoriesName;
				rollValue = rollValue + '{{accessoriesName=' + accessoriesName + '}}';
				rollValue = rollValue + '{{accessoriesMod=[[' + (parseInt(values[names['accessoriesMod']])||0) + ']]}}';
			}
			if (hasBlastRadius===1) {
				rollValue = rollValue + '{{blast_radius=[[1]]}}';
			}
		}	


		const options= {
			isLethality: full_lethality>0 ? 1 : 0,
			isShotgun: isShotgun,
			hassecond_damage: hassecond_damage,
			hasSelectiveFire: hasSelectiveFire,
			hasAccessories: hasAccessories,
			hasBlastRadius: hasBlastRadius,
			track_bullets: weaponWithAmmo,
			has_ammo: hasammo,
			advanced_weapons: advanced_weapons
		};
		

		console.log(rollValue);
		rollAttacks(rollValue,skillname,options);


	});
};

const clicked_repeating_actions = (type,parameters,names,queryModifier) => {
	
	initializeRolls();		// Initialize the rolls if flag is not set
	if (type==='weapons'){
		clicked_repeating_weapons(parameters,names,queryModifier);
	}
	if (type==='bonds'){
		clicked_repeating_bonds(parameters,names,queryModifier);
	}
	if (type==='special'){
		clicked_repeating_skills(parameters,names,queryModifier,0);
	}
	if (type==='skills'){
		clicked_repeating_skills(parameters,names,queryModifier,1);
	}
	if (type==='rituals'){
		clicked_repeating_rituals(parameters,names,queryModifier);
	}
}

const clicked_repeating_skills = (parameters,names,queryModifier,rollType) => {
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

		const _zero_willpower = wp_modifiers.zero_willpower;
		const _low_willpower = wp_modifiers.low_willpower;
		const rating=parseInt(values[parameters[names['rank']]]) || 0;
		var rollValue = `${rollString} {{rating=[[${skillrank}]]}}  {{zero_willpower=${_zero_willpower}}} {{low_willpower=${_low_willpower}}}}  {{modifier=[[${queryModifier}]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}`;		


		if(_zero_willpower!='[[1]]') {
			rollValue = `${rollValue}`; 			
		}

		console.log(rollValue);
		rollSkillAndStats(rollValue,skillname,skillfail,rollType);


	});

};



const clicked_repeating_bonds = (parameters,names) => {
	getAttrs(parameters, (values) => {
		const bondname=values[names['name']];
		const bondscore=parseInt(values[names['score']]) || 0;
        const local_wp_points=parseInt(values[names['local_wp_points']]) || 0;
		const local_sanity_points=parseInt(values[names['local_sanity_points']]) || 0;
		const character_id=values['character_id'];
		console.log(`bondname: ${bondname} name: ${names['name']}`);
		console.log(`bondscore: ${bondscore} score: ${names['score']}`);
		console.log(`local_wp_points: ${local_wp_points} wp_points: ${parameters[`willpower_points`]}`);
		console.log(`local_sanity_points: ${local_sanity_points} sanity_points: ${parameters[`sanity_points`]}`);
		console.info('values',values);
		/////////////////////////////////////
		if (bondscore<=0) {return;}  // No need to roll if the bond is already broken
		////////////////////////////////////

		const rollString=`${prefix_bond_roll} {{header=${bondname}}} {{subheader=${bondscore}}} `;
		///////////////////////////////////////////////////////////
		
		var rollValue = `${rollString} {{zerowp=[[0]]}} {{score=[[${bondscore}]]}} {{local_wp=[[${local_wp_points}]]}} {{local_sanity=[[${local_sanity_points}}]]}} {{repress= [^{repress}](~${character_id}|sanity_points)}}`;
		rollValue=`${rollValue} {{projection=1}} {{repression=1}}`;
		
		console.info('rollValue',rollValue);

		console.log(rollValue);
		rollBonds(rollValue,values,names,parameters);


	});

};



// Important functions

const _allrolls=arrays['_derived_rolls'].concat(arrays[`_stats`],arrays[`_skills`],['unnatural','sanity_loss']);

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

const setCommonParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`name`] = `${repsecid}_name`;
	_input_names[`repsecid`] = `${repsecid}`;
	_parameters.push(_input_names[`name`]);
    _parameters.push(`willpower_points`);
    _parameters.push(`sanity_points`);
    _parameters.push(`low_willpower`);
    _parameters.push(`zero_willpower`);
    _parameters.push(`character_id`);
	
}

const setSkillsParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`rank`] = `${repsecid}_rank`;    
	_input_names[`fail`] = `${repsecid}_fail`;
	_parameters.push(_input_names[`rank`]);
	_parameters.push(_input_names[`fail`]);
}

const setBondsParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`local_wp_points`] = `willpower_points`;
	_input_names[`local_sanity_points`] = `sanity_points`;
	
	
	_input_names[`score`] = `${repsecid}_score`;
	_input_names[`color`] = `${repsecid}_color`;
	_parameters.push(_input_names[`local_wp_points`]);
	_parameters.push(_input_names[`local_sanity_points`]);
	_parameters.push(_input_names[`score`]);
	_parameters.push(_input_names[`color`]);
};

const setSpecialParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`rank`] = `${repsecid}_skill_span`;   
	_parameters.push(_input_names[`rank`]);
};

const setGeneralWeaponParametersAndInputNames=(repsecid, _parameters, _input_names)=>{
	_input_names[`rank`] = `${repsecid}_skill_span`;
	_parameters.push(_input_names[`rank`]);
	_input_names[`range`] = `${repsecid}_base_range`;
	_parameters.push(_input_names[`range`]);
	_input_names[`damage`] = `${repsecid}_damage`;
	// write the push in function of the input name
	_parameters.push(_input_names[`damage`]);
	_input_names[`armor_piercing`] = `${repsecid}_armor_piercing`;
	_parameters.push(_input_names[`armor_piercing`]);
	_input_names[`ammo`] = `${repsecid}_ammo`;
	_parameters.push(_input_names[`ammo`]);
	_input_names[`hasammo`] = `${repsecid}_hasammo`;
	_parameters.push(_input_names[`hasammo`]);
		
	_input_names[`lethality`]=`${repsecid}_lethality_percent`;
	_parameters.push(_input_names[`lethality`]);
	_input_names[`kill_radius`]=`${repsecid}_kill_radius`;
	_parameters.push(_input_names[`kill_radius`]);
};

const setShotgunParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`shotgun`] = `${repsecid}_shotgun`;
	_parameters.push(_input_names[`shotgun`]);
	_input_names[`second_damage`] = `${repsecid}_second_damage`;	
	_parameters.push(_input_names[`second_damage`]);
	_input_names[`second_damage`] = `${repsecid}_second_damage`;
	_parameters.push(_input_names[`second_damage`]);
};

const setAccessoriesParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`accessories`]=`${repsecid}_accessories`;	
	_parameters.push(_input_names[`accessories`]);
	_input_names[`accessoriesName`]=`${repsecid}_accessoriesName`;
	_parameters.push(_input_names[`accessoriesName`]);
	_input_names[`accessoriesMod`]=`${repsecid}_accessoriesMod`;
	_parameters.push(_input_names[`accessoriesMod`]);
};

const setBlastRadiusParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`blast_radius`]=`${repsecid}_blast_radius`;
	_parameters.push(_input_names[`blast_radius`]);
};

const setSelectiveFireParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`selfire`]=`${repsecid}_selfire`;
	_parameters.push(_input_names[`selfire`]);	
	_input_names[`selfireLethality`]=`${repsecid}_selfireLethality`;
	_parameters.push(_input_names[`selfireLethality`]);
	_input_names[`selfireType`]=`${repsecid}_selfireType`;
	_parameters.push(_input_names[`selfireType`]);
};

const setAdvancedWeaponParametersAndInputNames=(repsecid, _parameters, _input_names) => {

	_input_names[`advanced_weapons`]=`advanced_weapons`;
	_parameters.push(_input_names[`advanced_weapons`]);

	setShotgunParametersAndInputNames(repsecid, _parameters, _input_names);
	setAccessoriesParametersAndInputNames(repsecid, _parameters, _input_names);
	setBlastRadiusParametersAndInputNames(repsecid, _parameters, _input_names);
	setSelectiveFireParametersAndInputNames(repsecid, _parameters, _input_names);	

}

const setRepeatingParametersAndInputNames=(section, id, _parameters, _input_names) => {
	const repsecid = `repeating_${section}_${id}`;
	_input_names[`section`] = section;
	_input_names[`id`] = id;
	setCommonParametersAndInputNames(repsecid, _parameters, _input_names);
    if (section === 'skills') {
        setSkillsParametersAndInputNames(repsecid, _parameters, _input_names);
    } else if (section === 'bonds') {
		setBondsParametersAndInputNames(repsecid, _parameters, _input_names);
    } else if (section === 'special') {
		setSpecialParametersAndInputNames(repsecid, _parameters, _input_names);
	} else if (section==='rituals') {
		setRitualParametersAndInputNames(repsecid, _parameters, _input_names);
    } else if (section==='weapons') {

		setGeneralWeaponParametersAndInputNames(repsecid, _parameters, _input_names);

		setAdvancedWeaponParametersAndInputNames(repsecid, _parameters, _input_names);

		_input_names[`track_bullets`]=`track_bullets`;	
		_parameters.push(_input_names[`track_bullets`]);

	} else {
        console.error(`Section ${section} not found`);
    }
}

Object.entries(_repeating_sections).forEach(([element,section]) => {
	on(`clicked:repeating_${section}:${element}-action`, (eventInfo) => {
		
		console.log(eventInfo);
		const id = eventInfo.sourceAttribute.split('_')[2];
		const queryModifier=_queryModifier;
		var _input_names = {};
		var _parameters =[];
		setRepeatingParametersAndInputNames(section, id, _parameters, _input_names)

		console.info(`parameters: ${_parameters}`);
		console.info(`input names: ${_input_names}`);

		
		clicked_repeating_actions(section, _parameters, _input_names, queryModifier);

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

const initializeRolls = () => {
    if (!_isInitialized) {
        // Perform the necessary setup for rolls
        console.info('Initializing rolls...');
        
        // Example setup code
        updateRollsOnOpen();
        updateRepeatingRollsonOpen();
		setResetBreakingPointsOnOpen();
		updateRitualInfoOnOpen();
        console.log('Rolls initialized');
        // Set the flag to true after initialization
        _isInitialized = true;
		updateritualskill();	
    }
};


const rollSanityDamages = (sanloss) => {
	const standard =`{{trackbullets=[[0]]}} {{isCritical=[[0]]}}`;
	console.log('Sanity loss: '+sanloss);
	var rollString= `${prefix_damage_roll} {{header=^{sanity loss}}}`
	rollString+=`{{subheader=${sanloss}}}  {{damage=[[${sanloss}]]}} ${standard}`;
	console.log(rollString);
	startRoll(rollString, (results) => {
		const newroll = getRollDamage(results,0,'damage',0);
		newroll['isCritical']=0;
		newroll['trackbullets']=0;
		
		finishRoll(results.rollId,newroll);

		console.log('Sanity loss updated',newroll);
		console.log(results);
	});	 
};

