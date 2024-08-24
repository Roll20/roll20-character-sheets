
const updateRepeatingSection = (section, element, id, character_id) => {
    const update = {};
    const attrPrefix = `repeating_${section}_${id}`;
	const attrName = `${attrPrefix}_${element}`;
    update[`${attrName}_action`] = `%{${character_id}|${attrName}-action}`;
    update[`${attrName}_r`] = id;

	console.log(' in update repeating section',section);
	if (section === 'weapons') {
		update[`${attrPrefix}_damage_action`] = `%{${character_id}|${attrPrefix}_damage-action}`;
		update[`${attrPrefix}_damageCritical_action`] = `%{${character_id}|${attrPrefix}_damageCritical-action}`;
		update[`${attrPrefix}_lethality_action`] = `%{${character_id}|${attrPrefix}_lethality-action}`;
		update[`${attrPrefix}_lethalityCritical_action`] = `%{${character_id}|${attrPrefix}_lethalityCritical-action}`;
		update[`${attrPrefix}_selective_fire_action`] = `%{${character_id}|${attrPrefix}_selective_fire-action}`;
		update[`${attrPrefix}_selective_fireCritical_action`] = `%{${character_id}|${attrPrefix}_selective_fireCritical-action}`;
		update[`${attrPrefix}_double_damage_action`] = `%{${character_id}|${attrPrefix}_double_damage-action}`;
		update[`${attrPrefix}_double_damageCritical_action`] = `%{${character_id}|${attrPrefix}_double_damageCritical-action}`;
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
		Object.entries(_repeating_damages).forEach((element)=> {
			getSectionIDs('weapons', function(idarray) {
				var update={};
				console.log('section: weapons element: '+element+' idarray: '+idarray);
				idarray.forEach(id => {
					update[`repeating_weapons_${id}_${element}`] = `%{${character_id}|repeating_weapons_${id}_${element}`;
				});				
				console.info('Value for weapons damage',update);
				setAttrs(update, {silent:true}, () => {
					console.log('Repeating weapon damage updated');
					console.info('update',update);
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

const rollwithmodifiers = (rollString,rollName,queryModifier) => {
	initializeRolls();		// Initialize the rolls if flag is not set
	getAttrs(arrays['_derived_modifiers'], (values) => {
		console.log('wp: '+values['willpower_points']);
		console.log('low wp: '+values['low_will_power']);
		console.log('zero wp: '+values['zero_will_power']);

		///////////////////////////////////////////////////////////
		const wp_modifiers=check_for_wp_modifiers(values,rollName);

		const _zero_will_power = wp_modifiers.zero_will_power;
		const _low_will_power = wp_modifiers.low_will_power;
		
		var rollValue = `${rollString} {{rating=[[@{${rollName}}]]}}`;
		rollValue= `${rollValue} {{zero_will_power=${_zero_will_power}}}`;
		rollValue= `${rollValue} {{low_will_power=${_low_will_power}}}} `;
		rollValue= `${rollValue} {{modifier=[[${queryModifier}]]}}`;
		rollValue= `${rollValue} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}`;		

		if(_zero_will_power!='[[1]]') {
			rollValue = `${rollValue}`; 			
		}

		console.log(rollValue);
		const isSkill=arrays[`_skills`].includes(rollName) ? 1 : 0;
		const isStat=arrays[`_stats`].includes(rollName) ? 1 : 0;

		console.log(`isSkill: ${isSkill}`);
		console.log(`isStat: ${isStat}`);

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
	console.log('low wp: '+values['low_will_power']);
	console.log('zero wp: '+values['zero_will_power']);
	
	const _willpower_points = parseInt(values[`willpower_points`]) || 0;
	const _zero_will_power = (values[`zero_will_power`]== 1 && _willpower_points== 0 && roll !== 'luck') ? '[[1]]' : '[[0]]';
	const _low_will_power  = (values[`low_will_power`] == 1 && _willpower_points <= 2 && _willpower_points>0 && roll !== 'luck' && roll !== 'sanity_points') ? '[[1]]' : '[[0]]';
	
	console.log(`zero will power: ${_zero_will_power}`);
	console.log(`low will power: ${_low_will_power}`);
	return {zero_will_power: _zero_will_power, low_will_power: _low_will_power};
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
		const zero_will_power=results.results.zero_will_power.result;
		const low_will_power=results.results.low_will_power.result;
		const basemodifier= (modifier - (20*low_will_power));

		const advanced_weapons=results.results.advanced_weapons.result;

		
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
			zero_will_power: zero_will_power,
			low_will_power: low_will_power
		};

		if (options.isLethality==1){
			newroll['lethality']=parseInt(results.results.lethality.result)||0;
		}
		console.log(newroll);
		finishRoll(results.rollId,newroll);
	});
};	


const rollSkillAndStats=(rollValue,rollName,rollFail,typeRoll) => {
	
	startRoll(rollValue, (results)=> {
		console.log(results);
		const modifier=results.results.modifier.result;
		const zero_will_power=results.results.zero_will_power.result;
		const low_will_power=results.results.low_will_power.result;
		const rating=results.results.rating.result;
		const full_modifier= (modifier - (20*low_will_power))>40 ? 40 : (modifier - (20*low_will_power));
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

['damage','damageCritical','double_damage','double_damageCritical','lethality','lethalityCritical','selective_fire','selective_fireCritical'].forEach((element) => {
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

const setDamageParametersAndInputNames=(id,element, _parameters, _input_names) => {
	_input_names[`name`] = `repeating_weapons_${id}_name`;
	_input_names[`repsecid`] = `repeating_weapons_${id}`;
	_parameters.push(_input_names[`name`]);
	
	
	_input_names[`hasammo`] = `repeating_weapons_${id}_hasammo`;
	_parameters.push(_input_names[`hasammo`]);
	var flagCritical=false;	
	flagCritical= flagCritical || (element==='damageCritical');
	flagCritical= flagCritical || (element==='double_damageCritical');
	flagCritical= flagCritical || (element==='lethalityCritical');
	flagCritical= flagCritical || (element==='selective_fireCritical');
	
	_input_names[`isCritical`] = (flagCritical==true) ? 1 :  0;
	const isCritical=_input_names[`isCritical`];	

	console.log('isCritical: '+isCritical);
	
	
	if (element==='damage' || element==='damageCritical') {
		console.log('damage');
		if (isCritical==1){
			_input_names[`header`] = `damage (×2)`;
		}else{
			_input_names[`header`] = `damage`;
		}
		_input_names[`damage`] = `repeating_weapons_${id}_damage`;
		_parameters.push(_input_names[`damage`]);
		_input_names[`damage_type`]='damage';
	}else if (element==='double_damage' || element==='double_damageCritical') {
		console.log('double damage');
		_input_names[`damage_type`]='damage';
		
		if (isCritical==1){
			_input_names[`header`] = `lethality (×2)`;	
		}else{
			_input_names[`header`] = `lethality`;
		}

		_input_names[`damage`] = `repeating_weapons_${id}_damage_2`;
		_parameters.push(_input_names[`damage`]);
	}else if (element==='lethality' || element==='lethalityCritical') {
		console.log('lethality');
		_input_names[`damage_type`]='lethality';
		if (isCritical==1){
			_input_names[`header`] = `lethality (×2)`;
		}else{
			_input_names[`header`] = `lethality`;
		}
		_input_names[`damage`] = `repeating_weapons_${id}_lethality_percent`;
		_parameters.push(_input_names[`damage`]);
	}else if (element==='selective_fire' || element==='selective_fireCritical') {

		if (isCritical==1){
			_input_names[`header`] = `lethality (×2)`;
		}else{
			_input_names[`header`] = `lethality`;
		}
		
		_input_names[`damage_type`]='lethality';
		_input_names[`header`] = `selective fire`;
		_input_names[`damage`] = `repeating_weapons_${id}_selfireLethality`;
		_parameters.push(_input_names[`damage`]);
		_input_names[`selfireType`] = `repeating_weapons_${id}_selfireType`;
		_parameters.push(_input_names[`selfireType`]);
	}


	_input_names[`ammo`] = `repeating_weapons_${id}_ammo`;
	_parameters.push(`repeating_weapons_${id}_ammo`);
	_input_names[`track_bullets`] = `repeating_weapons_${id}_track_bullets`;
	_parameters.push(`repeating_weapons_${id}_track_bullets`);
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
		const trackAmmo =((values[names['track_bullets']]==='active') && (values[names['hasammo']]===1)) ? 1 : 0;
		const currentAmmo=Math.max(0,parseInt(values[names['ammo']]) || 0);
		const selfireType=(values[names['selfireType']]) || '';
		const usedAmmo=getUsedAmmo(selfireType);
		console.log('trackAmmo: '+trackAmmo);
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
		const quotient=roll/10;
		const remainder=Math.round((roll%10) * 10);
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
		const hasammo=values[names['hasammo']];
		const track_bullets=values[names['track_bullets']] === 'active' ? 1 : 0;
		const track_and_hasammo=(hasammo+track_bullets)===2 ? 1 : 0;	
		const advanced_weapons=values[names['advanced_weapons']] === 'active' ? 1 : 0;
		
		const isShotgun = values[names['shotgun']] === 'active' ? 1 : 0;
		const hasdouble_damage = values[names['double_damage']] === 'active' ? 1 : 0;
		const hasSelectiveFire = values[names['selfire']] === 'active' ? 1 : 0;
		const hasAccessories = values[names['accessories']] === 'active' ? 1 : 0;
		const hasBlastRadius = values[names['blast_radius']] === 'active' ? 1 : 0;
		/************************************************
		console.log(`isShotgun: ${isShotgun}`);	
		console.log(`hasdouble_damage: ${hasdouble_damage}`);
		console.log(`hasSelectiveFire: ${hasSelectiveFire}`);
		console.log(`hasAccessories: ${hasAccessories}`);
		console.log(`hasBlastRadius: ${hasBlastRadius}`);
		************************************************/
		const full_damage= values[names['damage']];
		const full_lethality=values[names['lethality']];

		const rollString=`${prefix_skill_roll} {{header=${skillname}}} {{subheader=${skillrank}}}`;

		const wp_modifiers=check_for_wp_modifiers(values);

		const _zero_will_power = wp_modifiers.zero_will_power;
		const _low_will_power = wp_modifiers.low_will_power;
		
		var rollValue = `${rollString} {{rating=[[${skillrank}]]}}  {{zero_will_power=${_zero_will_power}}} {{low_will_power=${_low_will_power}}}}  {{modifier=[[${queryModifier}]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}`;		
		rollValue = `${rollValue} {{advanced_weapons=[[${advanced_weapons}]]}}`;
		
		if (full_damage != "") {
			
			rollValue = rollValue + '{{damage= ['+full_damage+'](~'+ character_id +'|'+repsecid+'_damage)}}';
			rollValue = rollValue + '{{damageCritical= [('+full_damage+')×2](~'+ character_id +'|'+repsecid+'_damageCritical)}}';
		}
		if (full_lethality >0) {
			const critical_lethality=full_lethality*2;
			rollValue = rollValue + '{{lethality= ['+full_lethality+'](~'+ character_id +'|'+repsecid+'_lethality)}}';
			rollValue = rollValue + '{{lethalityCritical= ['+critical_lethality+'](~'+ character_id +'|'+repsecid+'_lethalityCritical)}}';
		}

		if (track_and_hasammo===1) {
			rollValue = rollValue + '{{trackbullets=1}}';
			rollValue = rollValue + '{{current_ammo=' + values['ammo'] + '}}';
		}
		if (advanced_weapons===1) {
			if (isShotgun===1) {
				rollValue = rollValue + '{{shotgun=[[1]]}}';
				if (hasdouble_damage===1) {
					const full_damage_2=values[names['damage_2']];
					if (full_damage_2 != "") {
						rollValue = rollValue + '{{double_damage=['+full_damage_2+'](~'+ character_id +'|'+repsecid+'_double_damage)}}';
						rollValue = rollValue + '{{double_damageCritical=[('+full_damage_2+')×2](~'+ character_id +'|'+repsecid+'_double_damageCritical)}}';
					}
				}
			}
			//*********************
			if (hasSelectiveFire===1) {
				const full_sellethality=Math.max(0,parseInt(values[names['selfireLethality']])|| 0);
				
				const selfireType=values[names['selfireType']];

				console.log('full_sellethality: '+full_sellethality);
				console.log('selfire type: '+selfireType);	
				if (full_sellethality>0) {
					const critical_sellethality=full_sellethality*2;
					console.log('selfire type: '+selfireType);
					console.info('values',values);
					rollValue = rollValue + '{{selective_fire=[' + selfireType;
					rollValue = rollValue + '(' + full_sellethality + ')]';
					rollValue = rollValue + '(~' + character_id + '|'+repsecid+'_selective_fire)}}';
					rollValue = rollValue + '{{selective_fireCritical=[' + selfireType;
					rollValue = rollValue + '(' + critical_sellethality + ')]';
					rollValue = rollValue + '(~' + character_id + '|'+repsecid+'_selective_fireCritical)}}';
				}
			}
			if (hasAccessories===1) {
				rollValue = rollValue + '{{accessories=[[1]]}}';
				var accessoriesName=values[names['accessoriesName']];
				accessoriesName=(accessoriesName==='') ? '^[accessory]' : accessoriesName;
				rollValue = rollValue + '{{accessoriesName=' + values[names['accessoriesName']] + '}}';
				rollValue = rollValue + '{{accessoriesMod=[[' + (parseInt(values[names['accessoriesMod']])||0) + ']]}}';
			}
			if (hasBlastRadius===1) {
				rollValue = rollValue + '{{blast_radius=[[1]]}}';
			}
		}	


		const options= {
			isLethality: full_lethality>0 ? 1 : 0,
			isShotgun: isShotgun,
			hasdouble_damage: hasdouble_damage,
			hasSelectiveFire: hasSelectiveFire,
			hasAccessories: hasAccessories,
			hasBlastRadius: hasBlastRadius,
			track_and_hasammo: track_and_hasammo,
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

		const _zero_will_power = wp_modifiers.zero_will_power;
		const _low_will_power = wp_modifiers.low_will_power;
		const rating=parseInt(values[parameters[names['rank']]]) || 0;
		var rollValue = `${rollString} {{rating=[[${skillrank}]]}}  {{zero_will_power=${_zero_will_power}}} {{low_will_power=${_low_will_power}}}}  {{modifier=[[${queryModifier}]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}`;		


		if(_zero_will_power!='[[1]]') {
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
		const local_san_points=parseInt(values[names['local_san_points']]) || 0;
		const character_id=values['character_id'];
		console.log(`bondname: ${bondname} name: ${names['name']}`);
		console.log(`bondscore: ${bondscore} score: ${names['score']}`);
		console.log(`local_wp_points: ${local_wp_points} wp_points: ${parameters[`willpower_points`]}`);
		console.log(`local_san_points: ${local_san_points} san_points: ${parameters[`sanity_points`]}`);
		console.info('values',values);
		/////////////////////////////////////
		if (bondscore<=0) {return;}  // No need to roll if the bond is already broken
		////////////////////////////////////

		const rollString=`${prefix_bond_roll} {{header=${bondname}}} {{subheader=${bondscore}}} `;
		///////////////////////////////////////////////////////////
		
		var rollValue = `${rollString} {{zerowp=[[0]]}} {{score=[[${bondscore}]]}} {{local_wp=[[${local_wp_points}]]}} {{local_sanity=[[${local_san_points}}]]}} {{repress= [^{repress}](~${character_id}|sanity_points)}}`;
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

const setCommonParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`name`] = `${repsecid}_name`;
	_input_names[`repsecid`] = `${repsecid}`;
	_parameters.push(_input_names[`name`]);
    _parameters.push(`willpower_points`);
    _parameters.push(`sanity_points`);
    _parameters.push(`low_will_power`);
    _parameters.push(`zero_will_power`);
    _parameters.push(`character_id`);
	
}

const setSkillsParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`rank`] = `${repsecid}_rank`;    
	_input_names[`fail`] = `${repsecid}_fail`;
	_parameters.push(_input_names[`rank`]);
	_parameters.push(_input_names[`fail`]);
}

const setBondsParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`local_wp_points`] = `${repsecid}_wp_points`;
	_input_names[`local_san_points`] = `${repsecid}_san_points`;
	_input_names[`score`] = `${repsecid}_score`;
	_parameters.push(_input_names[`local_wp_points`]);
	_parameters.push(_input_names[`local_san_points`]);
	_parameters.push(_input_names[`score`]);
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
	_input_names[`hasAmmo`] = `${repsecid}_hasammo`;
	_parameters.push(_input_names[`hasAmmo`]);
		
	_input_names[`lethality`]=`${repsecid}_lethality_percent`;
	_parameters.push(_input_names[`lethality`]);
	_input_names[`kill_radius`]=`${repsecid}_kill_radius`;
	_parameters.push(_input_names[`kill_radius`]);
};

const setShotgunParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`shotgun`] = `${repsecid}_shotgun`;
	_parameters.push(_input_names[`shotgun`]);
	_input_names[`double_damage`] = `${repsecid}_double_damage`;	
	_parameters.push(_input_names[`double_damage`]);
	_input_names[`damage_2`] = `${repsecid}_damage_2`;
	_parameters.push(_input_names[`damage_2`]);
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
		console.log('in repeating action section',section);
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
    if (!isInitialized) {
        // Perform the necessary setup for rolls
        console.info('Initializing rolls...');
        
        // Example setup code
        updateRollsOnOpen();
        updateRepeatingRollsonOpen();
        console.log('Rolls initialized');
        // Set the flag to true after initialization
        isInitialized = true;
    }
};