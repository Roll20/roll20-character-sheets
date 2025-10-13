// update the rollDamage dice for the hidden buttons in the repeating sections
// it should only be used at creation of the field on in versioning
// since characterID and repeatingSectionID does not change
// if it does, using transmogrifer, I might have to add a reset button to reset the rolls

const updateRepeatingDamageRolls = (update,character_id,attrPrefix,nameRoll,hasCritical=false) => {
	const fullAttrPrefix = (attrPrefix==='') ? nameRoll : `${attrPrefix}_${nameRoll}`;

	const dicePrefix=`%{${character_id}|${fullAttrPrefix}`;


	update[`${fullAttrPrefix}_action`] = `${dicePrefix}-action}`;
	if (hasCritical) {
		update[`${fullAttrPrefix}_critical_action`] = `${dicePrefix}_critical-action}`;
	}
};

const updateRepeatingRolls = (section, attrName, id, character_id) => {
    const update = {};
    const attrPrefix = `repeating_${section}_${id}`;
	const rep_attrName = `${attrPrefix}_${attrName}`;
	const dicePrefix = `%{${character_id}|${rep_attrName}`;
    update[`${rep_attrName}_action`] = `${dicePrefix}-action}`;
    update[`${rep_attrName}_r`] = id;

	update[`${rep_attrName}_initialized`] = `1`;

	if (section === 'weapons') {
		arrays['_weapon_hidden_buttons'].forEach((buttonName) => {
			updateRepeatingDamageRolls(update,character_id,attrPrefix,buttonName,true);
		});
	}
	if (section === 'rituals') {
		arrays['_ritual_hidden_buttons'].forEach((buttonName) => {
			updateRepeatingDamageRolls(update,character_id,attrPrefix,buttonName);
		});
	}
    return update;
};

const updateAllRollsOnOpen = () => {
	const update = {};
	getAttrs(['character_id'], (values) => {
		const character_id = values.character_id;
		updateRollsOnOpen(update,character_id);
		updateRepeatingRollsonOpen(update,character_id);
	});
};

const updateRollsOnOpen= (update, character_id) => {
	console.log('===update rolls===');
	const fullrolls = _allrolls;		
	fullrolls.forEach(roll => {
		const dicePrefix = `%{${character_id}|${roll}`;
		update[`${roll}_action`] = `${dicePrefix}-action}`;

		if (roll.includes('sanity_loss')) {
			updateRepeatingDamageRolls(update,character_id,'',roll+'_success');
			updateRepeatingDamageRolls(update,character_id,'',roll+'_failure');

		}
	});		
};

const updateRepeatingRollsonOpen = (update,character_id) => {
	Object.entries(_repeating_sections).forEach(([attrName,section])=> {
		getSectionIDs(section, function(idarray) {
			idarray.forEach(id => {
				Object.assign(update, updateRepeatingRolls(section, attrName, id, character_id));
			});					
			setAttrs(update, {silent:true}, () => {
               console.info('update',update);
			   console.log('Repeating and Normal Rolls updated');

			});				
		});
	});
};




const changeRepeatingRolls = (section,attrName,id) => {
	getAttrs(['character_id',`repeating_${section}_${id}_initialized`], (values) => {
		const character_id = values.character_id;
		const isInitialized = parseInt(values[`repeating_${section}_${id}_initialized`],10) || 0;
		const update = {};

		if (isInitialized===0) {
			console.log('===update rolls===');
			Object.assign(update, updateRepeatingRolls(section, attrName, id, character_id));
		} else {
			console.log('===no need to update===');
		}

		setAttrs(update, {silent:true}, () => {
               console.info('update',update);
		});
	});
};


const rollwithmodifiers = (rollString,rollName,queryModifier,additionalParameters) => {
	const attr_to_get=arrays['_derived_modifiers']
	if (additionalParameters.hasOwnProperty('editable_name')) {
		attr_to_get.push(additionalParameters['editable_name']);
	}
	getAttrs(attr_to_get, (values) => {

		const wp_mod=check_for_wp_modifiers(values,rollName);

		rollString += `{{rating=[[@{${rollName}}]]}}`;
		rollString += `{{zero_willpower=[[${wp_mod.zero_willpower}]]}}`;
		rollString += `{{low_willpower=[[${wp_mod.low_willpower}]]}}} `;
		rollString += `{{modifier=[[${queryModifier}]]}}`;
		rollString += `{{isCritical=[[0]]}} {{isSuccess=[[0]]}}`;		

		rollString += get_header_skills(values,additionalParameters);

		rollFail=`${rollName}_fail`;
		rollSkillAndStats(rollString,rollName,isSkillName(rollName));

	});

};

const rollAttacks = (rollValue,options) => {
	startRoll(rollValue, (results) => {
		const dice=results.results.dice.result;
		options.modifier=results.results.modifier.result;
		const modifier=check_weapon_modifiers(options);
		const rating=correct_rating(options.rating,modifier);

		const outcome=check_success(dice,rating,options.isSkill);	

		newroll={
			rating: rating,
			modifier: modifier,
			isSuccess: outcome.isSuccess,
			isCritical: outcome.isCritical,
			zero_willpower: options.zero_willpower,
			low_willpower: options.low_willpower,
			advanced_weapons: options.hasAdvancedWeapons
		};

		finishRoll(results.rollId,newroll);
	});
};	


const rollSkillAndStats=(rollValue,rollName,isSkill) => {
	// Input:
	// rollValue is the string to roll the dice
	// rollName is the name of the skill or stat
	// rollFail used only for stats to check for failure
	// limit_to_99 is the flag to limit the upper bound rating to 99% (0 for inhuman stats) [0,1]
	startRoll(rollValue, (results)=> {
		// low and zero willpower flags only used if the setting is on
		const zero_willpower=results.results.zero_willpower.result;
		const low_willpower=results.results.low_willpower.result;

		const _modifier= correct_modifier(results.results.modifier.result,low_willpower);
		const _rating  = correct_rating(results.results.rating.result,_modifier,isSkill);
		const dice=results.results.dice.result;

		var newroll={};
		const outcome=check_success(dice,_rating,isSkill);
		newroll={
			rating: _rating,
			modifier: _modifier,
			isSuccess: outcome.isSuccess,
			isCritical: outcome.isCritical,
			zero_willpower: zero_willpower,
			low_willpower: low_willpower
		};
		finishRoll(results.rollId,newroll);

		update=check_for_failed_skill(rollName,outcome.isSuccess,isSkill);
		setAttrs(update,{silent:false}, () => {
               console.info('update',update);
		});

	});
};

const rollBonds=(rollValue,_value,_names,_parameters) => {

	startRoll(`${rollValue}`, (results)=> {


		const dice=results.results.dice.result;
		const local_wp=Math.max(0,parseInt(results.results.local_wp.result)-dice);
		var score=Math.max(0,parseInt(results.results.score.result)-dice);
		const original_wp=parseInt(results.results.local_wp.result) || 0;

		const zerowp=local_wp==0 ? 1 : 0;

		var update={};

		update[_names['local_wp_points']]=local_wp;
		update[`willpower_points`]=local_wp;
		update[_names[`hurt`]]='hurt';
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
            console.info('update',update);
		});
	});
};

const clicked_repeating_rituals_cost = (parameters,names) => {
	getAttrs(parameters, (values) => {
		const ritual_type = names['ritual_type'];
		// cost of the ritual
		const other_costs={};
		getOtherCosts(other_costs,values,names,RitualCosts);
		getOtherCosts(other_costs,values,names,CurrentValues);


		if(ritual_type==='pay_cost'){
			paythecost(other_costs['sanity_loss_failure'],other_costs);
		}

		if(ritual_type==='force_connection'){
			forceconnection(other_costs['sanity_loss_failure'],other_costs);
		}	

		if(ritual_type==='accept_failure'){
			acceptfailure(other_costs['sanity_loss_success'],other_costs);
		}

	});
};

const setDamageParametersAndInputNames=(id,attrName, _parameters, _input_names) => {
	_input_names[`name`] = `repeating_weapons_${id}_name`;
	_input_names[`repsecid`] = `repeating_weapons_${id}`;
	_parameters.push(_input_names[`name`]);

	_input_names[`hasammo`] = `repeating_weapons_${id}_hasammo`;
	_parameters.push(_input_names[`hasammo`]);
	var flagCritical=false;	
	flagCritical= flagCritical || (attrName==='damage_critical');
	flagCritical= flagCritical || (attrName==='double_barrel_critical');
	flagCritical= flagCritical || (attrName==='lethality_percent_critical');
	flagCritical= flagCritical || (attrName==='selective_fire_critical');

	_input_names[`isCritical`] = (flagCritical==true) ? 1 :  0;
	const isCritical=_input_names[`isCritical`];	

	if (attrName==='damage' || attrName==='damage_critical') {

		if (isCritical==1){
			_input_names[`header`] = `damage (×2)`;
		}else{
			_input_names[`header`] = `damage`;
		}
		_input_names[`damage`] = `repeating_weapons_${id}_damage`;
		_parameters.push(_input_names[`damage`]);
		_input_names[`damage_type`]='damage';
	}else if (attrName==='double_barrel' || attrName==='double_barrel_critical') {

		_input_names[`damage_type`]='damage';

		if (isCritical==1){
			_input_names[`header`] = `damage (×2)`;	
		}else{
			_input_names[`header`] = `damage`;
		}

		_input_names[`damage`] = `repeating_weapons_${id}_double_barrel`;
		_parameters.push(_input_names[`damage`]);
	}else if (attrName==='lethality_percent' || attrName==='lethality_percent_critical') {

		_input_names[`damage_type`]='lethality_percent';
		if (isCritical==1){
			_input_names[`header`] = `lethality (×2)`;
		}else{
			_input_names[`header`] = `lethality`;
		}
		_input_names[`damage`] = `repeating_weapons_${id}_lethality_percent`;
		_parameters.push(_input_names[`damage`]);
	}else if (attrName==='selective_fire' || attrName==='selective_fire_critical') {

		if (isCritical==1){
			_input_names[`header`] = `_tmp_header_ (×2)`;
		}else{
			_input_names[`header`] = `_tmp_header_`;
		}

		_input_names[`damage_type`]='lethality_percent';
		_input_names[`damage`] = `repeating_weapons_${id}_selfire_lethality_percent`;
		_parameters.push(_input_names[`damage`]);
		_input_names[`selfire_type`] = `repeating_weapons_${id}_selfire_type`;
		_parameters.push(_input_names[`selfire_type`]);
	}

	_input_names[`ammo`] = `repeating_weapons_${id}_ammo`;
	_parameters.push(_input_names[`ammo`]);
	_input_names[`track_bullets`] = `track_bullets`;
	_parameters.push(_input_names[`track_bullets`]);
};
const addAttackHeader=(values,names) => {
	if (names.hasOwnProperty('header')){
		return `{{header=^{${realDmgHeader(values,names)}}}}`;
	}
	return '';
};

const realDmgHeader=(values,names) => {
	if (names.hasOwnProperty)
	var header=names['header'];
	if (header.includes('_tmp_header_')){  // I can use it for other things
		//if (names['rollName']==='selective_fire'){
			return header.replace('_tmp_header_',values[names[`selfire_type`]]);
		//}
	}
	return header;
};

const prefixDamageRoll = (type_prefix) => {
	if (type_prefix==='damage'){ return prefix_damage_roll;}
	if (type_prefix==='heal'){ return prefix_health_roll;}
	if (type_prefix==='attack'){ return prefix_attack_roll;}
};

const clicked_repeating_damages = (parameters,names,type_prefix='damage') => {
	getAttrs(parameters, (values) => {
		const isCritical=names['isCritical'];
		const track_bullets=values[names['track_bullets']]==='active' ? 1 : 0;
		const hasammo=values[names['hasammo']]==='active' ? 1 : 0;
		const trackAmmo=track_bullets==1 && hasammo==1 ? 1 : 0;
		const currentAmmo=Math.max(0,parseInt(values[names['ammo']]) || 0);
		const selfire_type=(values[names['selfire_type']]) || '';
		const used_ammo=getUsedAmmo(selfire_type);

		const damage_type=names['damage_type'];
		var damage=values[names['damage']];

		var rollString=``;
		
		rollString += prefixDamageRoll(type_prefix);
		rollString += addAttackHeader(values,names)


        rollString += addTargetStat(values,names,type_prefix);
	
				

		var damageString='';

		if (damage_type === 'damage') {
			if (isCritical==1){
				damageString=`{{damage=[[2*${damage}]]}}`;
			}else{
				damageString=`{{damage=[[${damage}]]}}`;
			}

			rollString = `${rollString}  ${damageString}`;

			rollString = check_track_ammo(rollString,trackAmmo,currentAmmo,used_ammo)
		}else if (damage_type === 'lethality_percent') {
			if (isCritical==1){
				damage=2*damage;
			}
			damageString=`{{lethality_percent=[[${damage}]]}}`;

			rollString = `${rollString} ${damageString}`;
			rollString = `${rollString} {{roll=[[1d100]]}}`;

			rollString = check_track_ammo(rollString,trackAmmo,currentAmmo,used_ammo)
		}
		rollString = `${rollString} {{isCritical=[[${isCritical}]]}}`;

		startRoll(rollString, (results) => {

			const newroll = getRollDamage(results,trackAmmo,damage_type,isCritical);

			newroll['isCritical']=isCritical;
			newroll['trackbullets']=trackAmmo;
			finishRoll(results.rollId,newroll);
			if (trackAmmo==1){
				const update={};
				update[names['ammo']]=newroll['current_ammo'];
				setAttrs(update, () => {
               		console.info('update',update);
				});
			}
		});
	});
};


const setDamageRitualParametersAndInputNames=(id, _parameters, _input_names) => {
	_input_names[`name`] = `repeating_rituals_${id}_name`;
	_input_names[`isCritical`]=0;

	const damage_type=_input_names[`damage_type`];
	const attack_or_heal = _input_names[`attack_or_heal`];
	const repsecid=_input_names[`repsecid`]; //

	_parameters.push(_input_names[`name`]);

	var prefix_names=`${repsecid}_${attack_or_heal}`;
	
	_input_names[`repsecid`] = prefix_names;
	
	_input_names[`damage`]=`${prefix_names}_${damage_type}_amount`;
	
	_parameters.push(_input_names[`damage`]);
	
	_input_names[`target_stat`] = `${prefix_names}_target_stat`;
	_parameters.push(_input_names[`target_stat`]);

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
	if (damage_type==='lethality_percent'){
		const lethality_percent=results.results.lethality_percent.result;
		const roll=results.results.roll.result;
		var computed_lethality_percent=lethality_percent;
		var computed_roll=DeltaGreenLethalityFail(roll);

		

		if (critical==1) {
			computed_lethality_percent=lethality_percent*2;
			computed_roll= computed_roll*2;
		}

		newroll['roll']=computed_roll;
		newroll['lethality_percent']=computed_lethality_percent;
	}
	return newroll;
};

const clicked_repeating_weapons= (parameters,names,queryModifier) => {
	getAttrs(parameters, (values) => {
		// used to set the roll string
		const character_id=values['character_id'];
		const repsecid= names['repsecid'];

		const skillname=values[names['name']];
		const skillrank=setMinMax(values[names['rank']]);
		const trackAmmo= need_to_track_ammo(values,names);
		const current_ammo=Math.max(0,parseInt(values[names['ammo']]) || 0);

		const hasAdvancedWeapons=values[names['advanced_weapons']] === 'active' ? 1 : 0;
		const isShotgun = values[names['shotgun']] === 'active' ? 1 : 0;
		const hasDoubleBarrel = values[names['hasDoubleBarrel']] === 'active' ? 1 : 0;
		const hasSelectiveFire = values[names['selfire']] === 'active' ? 1 : 0;
		const hasAccessories = values[names['accessories']] === 'active' ? 1 : 0;
		const hasBlastRadius = values[names['blast_radius']] === 'active' ? 1 : 0;
		const isAiming = values[names['aiming']] === 'active' ? 1 : 0;

		const lethality_percent=setMinMax(values[names['lethality_percent']]);
		const damage= parseRoll(values[names['damage']]);
		const armor_piercing=Math.min(parseInt(values[names['armor_piercing']],10)||0,0);
		const base_range=values[names['range']];
		const kill_radius=values[names['kill_radius']];


		var _options={};
		_options['rating']=skillrank;
		_options['hasLethality']= lethality_percent>0 ? 1 : 0;
		_options['hasDamage']= damage !=0 ? 1 : 0;
		_options['isAiming']= isAiming;
		if (_options['hasDamage']===1) {_options['damage']=damage;}
		if (_options['hasLethality']===1) {_options['lethality_percent']=lethality_percent;}
		if (trackAmmo==1) {_options['trackAmmo']=1;_options['current_ammo']=current_ammo;}
		if (hasAdvancedWeapons===1) {_options['hasAdvancedWeapons']=1;}
		if (isShotgun===1) {_options['isShotgun']=1;}
		if (hasDoubleBarrel===1) {_options['hasDoubleBarrel']=1;_options['double_barrel']=parseRoll(values[names['double_barrel']]);}
		if (hasSelectiveFire===1) {
				_options['hasSelectiveFire']=1;	
				_options['selfire_lethality_percent']=setMinMax(values[names['selfire_lethality_percent']]);
				_options['selfire_type']=values[names['selfire_type']];}
		if (hasAccessories===1) {
			_options['hasAccessories']=1;
			_options['accessory_modifier']=values[names['accessory_modifier']];
			_options['accessory_name']=values[names['accessory_name']];
		}
		if (hasBlastRadius===1) {_options['hasBlastRadius']=1;}

		const wp_mod=check_for_wp_modifiers(values);
		_options['wp_mod']=wp_mod
		const rollString=`${prefix_skill_roll} {{header=${skillname}}} {{subheader=${skillrank}}}`;

		var rollValue = `${rollString} {{rating=[[${skillrank}]]}} {{modifier=[[${queryModifier}]]}} `;
		rollValue += ` {{low_willpower=[[${wp_mod.low_willpower}]]}}  {{zero_willpower=[[${wp_mod.zero_willpower}]]}}`;
		rollValue += ` {{isCritical=[[0]]}} {{isSuccess=[[0]]}}`;		
		rollValue += ` {{advanced_weapons=[[${hasAdvancedWeapons}]]}}`;		

		if (base_range != "")   {rollValue += '{{base_range=' + base_range + '}}';}
		if (armor_piercing !=0) {rollValue += '{{armor_piercing=' + armor_piercing + '}}';}
		if (kill_radius != "")  {rollValue += '{{kill_radius=' + kill_radius + '}}';}

		const options = setWeaponOptions(_options)
		rollValue += setAdvancedWeaponsString(options,character_id,repsecid);
//********************************************
		rollAttacks(rollValue,options);

	});
};

const clicked_repeating_actions = (section,parameters,names,queryModifier) => {

	initializeRolls();		// Initialize the rolls if flag is not set
	if (section==='weapons'){
		clicked_repeating_weapons(parameters,names,queryModifier);
	}
	if (section==='bonds'){
		clicked_repeating_bonds(parameters,names,queryModifier);
	}
	if (section==='special'){
		clicked_repeating_skills(parameters,names,queryModifier,0);
	}
	if (section==='skills'){
		clicked_repeating_skills(parameters,names,queryModifier,1);
	}
	if (section==='rituals'){
		clicked_repeating_rituals(parameters,names,queryModifier);
	}
}

const clicked_repeating_skills = (parameters,names,queryModifier,isRepSkill) => {
	getAttrs(parameters, (values) => {
		const skillname=values[names['name']];
		const skillrank=parseInt(values[names['rank']]) || 0;

		const rollString=`${prefix_skill_roll} {{header=${skillname}}} {{subheader=${skillrank}}} `;

		const wp_modifiers=check_for_wp_modifiers(values);

		const _zero_willpower = wp_modifiers.zero_willpower;
		const _low_willpower = wp_modifiers.low_willpower;
		const rating=parseInt(values[parameters[names['rank']]]) || 0;
		var rollValue = `${rollString} {{rating=[[${skillrank}]]}}  {{zero_willpower=[[${_zero_willpower}]]}} {{low_willpower=[[${_low_willpower}]]}}}  {{modifier=[[${queryModifier}]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}`;		

		if(_zero_willpower!='[[1]]') {
			rollValue = `${rollValue}`; 			
		}

		attrName=names['repsecid'];
		rollSkillAndStats(rollValue,attrName,isRepSkill);

	});

};


const clicked_repeating_bonds = (parameters,names) => {
	getAttrs(parameters, (values) => {
		const bondname=values[names['name']];
		const bondscore=parseInt(values[names['score']]) || 0;
        const local_wp_points=parseInt(values[names['local_wp_points']]) || 0;
		const local_sanity_points=parseInt(values[names['local_sanity_points']]) || 0;
		const character_id=values['character_id'];


		if (bondscore<=0) {return;}  // No need to roll if the bond is already broken


		const rollString=`${prefix_bond_roll} {{header=${bondname}}} {{subheader=${bondscore}}} `;


		var rollValue = `${rollString} {{zerowp=[[0]]}} {{score=[[${bondscore}]]}} {{local_wp=[[${local_wp_points}]]}} {{local_sanity=[[${local_sanity_points}}]]}} {{repress= [^{repress}](~${character_id}|sanity_points)}}`;
		rollValue=`${rollValue} {{projection=1}} {{repression=1}}`;

		rollBonds(rollValue,values,names,parameters);

	});

};


// Important functions


const setCommonParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`name`] = `${repsecid}_name`;
	_input_names[`repsecid`] = `${repsecid}`;
	_parameters.push(_input_names[`name`]);
	_input_names[`willpower_points`] = `willpower_points`;
    _parameters.push(`willpower_points`);
	_input_names[`sanity_points`] = `sanity_points`;
    _parameters.push(`sanity_points`);
	_input_names[`low_willpower`] = `low_willpower`;
    _parameters.push(`low_willpower`);
	_input_names[`zero_willpower`] = `zero_willpower`;
    _parameters.push(`zero_willpower`);
	_input_names[`character_id`] = `character_id`;	
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
	_input_names[`hurt`] = `${repsecid}_hurt`;
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

	_input_names[`lethality_percent`]=`${repsecid}_lethality_percent`;
	_parameters.push(_input_names[`lethality_percent`]);
	_input_names[`kill_radius`]=`${repsecid}_kill_radius`;
	_parameters.push(_input_names[`kill_radius`]);
};

const setShotgunParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`shotgun`] = `${repsecid}_shotgun`;
	_parameters.push(_input_names[`shotgun`]);
	_input_names[`hasDoubleBarrel`] = `${repsecid}_hasDoubleBarrel`;	
	_parameters.push(_input_names[`hasDoubleBarrel`]);
	_input_names[`double_barrel`] = `${repsecid}_double_barrel`;
	_parameters.push(_input_names[`double_barrel`]);
};

const setAccessoriesParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`accessories`]=`${repsecid}_hasAccessories`;	
	_parameters.push(_input_names[`accessories`]);
	_input_names[`accessory_name`]=`${repsecid}_accessory_name`;
	_parameters.push(_input_names[`accessory_name`]);
	_input_names[`accessory_modifier`]=`${repsecid}_accessory_modifier`;
	_parameters.push(_input_names[`accessory_modifier`]);
};

const setBlastRadiusParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`blast_radius`]=`${repsecid}_blast_radius`;
	_parameters.push(_input_names[`blast_radius`]);
};

const setSelectiveFireParametersAndInputNames=(repsecid, _parameters, _input_names) => {
	_input_names[`selfire`]=`${repsecid}_selfire`;
	_parameters.push(_input_names[`selfire`]);	
	_input_names[`selfire_lethality_percent`]=`${repsecid}_selfire_lethality_percent`;
	_parameters.push(_input_names[`selfire_lethality_percent`]);
	_input_names[`selfire_type`]=`${repsecid}_selfire_type`;
	_parameters.push(_input_names[`selfire_type`]);
};

const setAdvancedWeaponParametersAndInputNames=(repsecid, _parameters, _input_names) => {

	_input_names[`advanced_weapons`]=`advanced_weapons`;
	_parameters.push(_input_names[`advanced_weapons`]);

	setShotgunParametersAndInputNames(repsecid, _parameters, _input_names);
	setAccessoriesParametersAndInputNames(repsecid, _parameters, _input_names);
	setBlastRadiusParametersAndInputNames(repsecid, _parameters, _input_names);
	setSelectiveFireParametersAndInputNames(repsecid, _parameters, _input_names);	
};

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
};


const initializeRolls = () => {
    if (!_isInitialized) {
        // Perform the necessary setup for rolls

        // Example setup code
        updateAllRollsOnOpen();

		setResetBreakingPointsOnOpen();
		updateRitualInfoOnOpen();
        updateadvancedweapons();
        // Set the flag to true after initialization
        _isInitialized = true;

    }
};

const rollSanityDamages = (sanloss) => {
	const standard =`{{trackbullets=[[0]]}} {{isCritical=[[0]]}}`;

	var rollString= `${prefix_damage_roll} {{header=^{sanity loss}}}`
	rollString+=`{{subheader=${sanloss}}}  {{damage=[[${sanloss}]]}} ${standard}`;

	startRoll(rollString, (results) => {
		const newroll = getRollDamage(results,0,'damage',0);
		newroll['isCritical']=0;
		newroll['trackbullets']=0;

		finishRoll(results.rollId,newroll);

	});	 
};

