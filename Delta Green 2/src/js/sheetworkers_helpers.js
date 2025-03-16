
const setWeaponOptions = ({isFlawed=0, isAiming=0 ,modifier=0,wp_mod={low_willpower:0,zero_willpower:0},hasLethality=0,
	hasDamage=0,damage='',rating=0,lethality_percent=0,hasAdvancedWeapons=0,isShotgun=0,hasDoubleBarrel=0,hasSelectiveFire=0,
	hasAccessories=0,hasBlastRadius=0,	trackAmmo=0,current_ammo=0,double_barrel='',selfire_lethality_percent=0,selfire_type='',
	accessory_modifier=0,accessory_name='',isSkill=1}) => {
	const _hasAdvancedWeapons=hasAdvancedWeapons;
	const _hasLethality= hasLethality;
	const _hasDamage=hasDamage;
	const _trackAmmo=trackAmmo;
	const _rating=rating;
	const _isSkill=isSkill;
	const _modifier=modifier;
	const _wp_mod=wp_mod;
	const _isFlawed=isFlawed;
	const _isAiming=isAiming;
	var _isShotgun=0;
	var _hasDoubleBarrel=0;
	var _hasSelectiveFire=0;
	var _hasAccessories=0;
	var _hasBlastRadius=0;
	var _double_barrel=double_barrel;
	var _selfire_lethality_percent=selfire_lethality_percent;
	var _selfire_type=selfire_type;
	var _selfire_ammo=0;
	var _current_ammo=current_ammo;
	const _has_ammo=(_current_ammo>0) ? 1 : 0;
	var _accessory_modifier=accessory_modifier;
	var _accessory_name=(accessory_name==='') ? '^{accessory}' : accessory_name;

	var _damage='';
	var _lethality_percent=0;
	var _low_willpower=0;
	var _zero_willpower=0;
	if (_wp_mod.hasOwnProperty('low_willpower')) { _low_willpower=_wp_mod.low_willpower; }
	if (_wp_mod.hasOwnProperty('zero_willpower')) { _zero_willpower=_wp_mod.zero_willpower; }
	if (_hasDamage==1) { _damage=damage; }
	if (_hasLethality==1) { _lethality_percent=lethality_percent; }

	if (_hasAdvancedWeapons==1) {
	_isShotgun=isShotgun;
	_hasDoubleBarrel=hasDoubleBarrel;
	_hasSelectiveFire=hasSelectiveFire;
	_hasAccessories=hasAccessories;
	_hasBlastRadius=hasBlastRadius;
	}

	if (hasDoubleBarrel==1) { _double_barrel=double_barrel; }
	if (hasSelectiveFire==1) { 
		_selfire_lethality_percent=selfire_lethality_percent;
		_selfire_type=selfire_type;
		_selfire_ammo=getRollDamage(selfire_type);
	 }
	 
	return { hasLethality: _hasLethality,lethality_percent: _lethality_percent, isSkill: _isSkill, rating: _rating,
		hasDamage: _hasDamage,damage: _damage,
		isShotgun: _isShotgun,hasDoubleBarrel: _hasDoubleBarrel,
		hasSelectiveFire: _hasSelectiveFire,hasAccessories: _hasAccessories,hasBlastRadius: _hasBlastRadius,
	trackAmmo: _trackAmmo,current_ammo: _current_ammo, double_barrel: _double_barrel,
	selfire_lethality_percent: _selfire_lethality_percent, selfire_type: _selfire_type, selfire_ammo: _selfire_ammo,
	accessory_modifier: _accessory_modifier,
	accessory_name: _accessory_name,hasAdvancedWeapons: _hasAdvancedWeapons,
	zero_willpower: _zero_willpower, low_willpower: _low_willpower, modifier: _modifier,
	isFlawed: _isFlawed, isAiming: _isAiming};
};

const getInitializationFlags = (statInfo,values) => {
	// note: flags are INITIALLY set to 1, it was a mistake but now it's better to keep it that way
	const statName=statInfo['name'];
	const _stat_used={
		              strength:'initial_str',
					  constitution:'initial_con',
					};
	const InitializationFlags={
		'initial_hp':1,
		'initial_str':1,
		'initial_con':1,
		'initial_san':1
	};
	Object.keys(InitializationFlags).forEach((key)=>{
		if (values.hasOwnProperty(key) && values[key] == 0){ InitializationFlags[key]=0;}
	});
	if (_stat_used.hasOwnProperty(statName)) { InitializationFlags[_stat_used[statName]]=0;}

	console.info('InitializationFlags:',InitializationFlags);
	return InitializationFlags;
};

const setInitialHp = (update,values,statInfo,InitializationFlags) => {
	if (statInfo['name'] !== 'strength' && statInfo['name'] !== 'constitution') { return; } // check if the stat is strength or constitution
	if (statInfo['name'] == 'strength') {InitializationFlags[`initial_str`]=0;} // set the initial strength to 0
	if (statInfo['name'] == 'constitution') {InitializationFlags[`initial_con`]=0;} // set the initial constitution to 0	
	if (InitializationFlags['initial_str']==1 || InitializationFlags['initial_con']==1) { return; } // if either flag is set, I cannot set the initial hp
	///////// Set Hp regardless of the initial hp
	const _strength_score=Math.max(0,parseInt(values['strength_score'],10)||0);
	const _constitution_score=Math.max(0,parseInt(values['constitution_score'],10)||0);
	const initial_hit_points= Math.ceil((_strength_score+_constitution_score)/2); // update max hp regardless of the initial hp
	update['hit_points_max']=initial_hit_points;
	//////// If the initial hp is not set yet, set it
	if (InitializationFlags['initial_hp']==0) { return; }        // check if initial hp is already set

	update['hit_points']=initial_hit_points;
	update['hit_points_old']=initial_hit_points;
	InitializationFlags['initial_hp']=0;
};


const setInitialPower = (update,values,statInfo,InitializationFlags) => {
	if (statInfo['name'] !== 'power') { return; }  // only power can change the sanity points
	const sanmax=setSanMax(values[`unnatural`]);
	const InitialWillPower = statInfo.score; 
	update[`willpower_points_max`]=InitialWillPower;
	// only updates if the flag is set
	update['sanity_points_max']=sanmax;
	if (InitializationFlags['initial_san']==0) { return; }
	const InitialSanity = statInfo.stat;
	const InitialBreakingPoint = statInfo.score*4;
	//update['initial_san']=0;
	update['sanity_points']= InitialSanity;
	update['sanity_points_old']= InitialSanity;
	update['breaking_point']= InitialBreakingPoint;
	update['breaking_point_max']= InitialBreakingPoint;
	update['willpower_points']=InitialWillPower;
	InitializationFlags['initial_san']=0;
};

const setStatScore=(score,statName) =>{
	const validNames=['strength','constitution','dexterity','power','intelligence','charisma'];
	if (!validNames.includes(statName)) { return false; }
	const _score = Math.max(0,parseInt(score));
	return {name: statName, stat: _score*5, score: _score}; 
};

const setSanMax = (unnatural) => {
	// Input:
	// unnatural is the unnatural value
	// Output:
	// the maximum value for sanity points
	return 99-setMinMax(unnatural,0,99);
};

const setDiceSection = (character_id,repsecid,use_=true) => {
	// Input:
	// charid is the character id
	// repsecid is the repeating section id
	// Output:
	// ](~<charid>|<repsecid>_
	return '](~'+ character_id +'|'+repsecid+ ((use_) ? '_' : '');
}

const setAdvancedWeaponsString = (options,character_id,repsecid) => {
	var advancedWeaponsString='';
	const dice_section = setDiceSection(character_id,repsecid);
	const nothing_section = setDiceSection(character_id,'nothing)}}',false);
	const rollEnding='-action)}}';
	if (options.hasAdvancedWeapons===1) {
		if (options.isShotgun===1) {advancedWeaponsString +=  '{{shotgun=[[1]]}}';}
		if (options.hasDoubleBarrel===1) {
			if (options.double_barrel != '') {
				advancedWeaponsString +=  '{{double_barrel=['+options.double_barrel+dice_section+'double_barrel'+rollEnding;
				advancedWeaponsString +=  '{{voiddouble_barrel=['+options.double_barrel+nothing_section;
				advancedWeaponsString +=  '{{double_barrel_critical=[('+options.double_barrel+')×2'+dice_section+'double_barrel_critical'+rollEnding;
				advancedWeaponsString +=  '{{voiddouble_barrel_critical=[('+options.double_barrel+')×2'+nothing_section;
			}
		}
		if (options.hasSelectiveFire===1) {
			if (options.selfire_lethality_percent>0) {
				const critical_selfire_lethality_percent=options.selfire_lethality_percent*2;

				advancedWeaponsString +=  '{{selective_fire=[' + options.selfire_type;
				advancedWeaponsString +=  '('+options.selfire_lethality_percent + '%)'+dice_section+'selective_fire'+rollEnding;

				advancedWeaponsString +=  '{{voidselective_fire=[' + options.selfire_type;
				advancedWeaponsString +=  '(' + options.selfire_lethality_percent + '%)'+nothing_section;

				advancedWeaponsString +=  '{{selective_fire_critical=[' + options.selfire_type;
				advancedWeaponsString +=  '(' + critical_selfire_lethality_percent + '%)'+dice_section+'selective_fire_critical'+rollEnding;
				advancedWeaponsString +=  '{{voidselective_fire_critical=[' + options.selfire_type;
				advancedWeaponsString +=  '(' + critical_selfire_lethality_percent + '%)'+nothing_section;
			}

			if (options.selfire_ammo>=options.current_ammo && options.trackAmmo==1) {
				advancedWeaponsString +=  '{{selfire_noammo=1}}';
			}else{
				advancedWeaponsString +=  '{{selfire_wammo=0}}';
			}
		}
		if (options.hasAccessories===1) {
			advancedWeaponsString +=  '{{accessories=[[1]]}}';

			advancedWeaponsString +=  '{{accessory_name=' + options.accessory_name + '}}';
			advancedWeaponsString +=  '{{accessory_modifier=[[' + options.accessory_modifier + ']]}}';
		}
		if (options.hasBlastRadius===1) {
			advancedWeaponsString +=  '{{blast_radius=[[1]]}}';
		}
	}	

	if (options.trackAmmo) {
		advancedWeaponsString += '{{trackbullets=1}}';
		advancedWeaponsString += '{{current_ammo=[[' + options.current_ammo + ']]}}';
		if (options.current_ammo==0) {
			advancedWeaponsString += '{{noammo=1}}';
		}else{
			advancedWeaponsString += '{{wammo=0}}';
		}
	} else {
		advancedWeaponsString += '{{wammo=0}}';
	}

	if (options.hasDamage==1) {

		advancedWeaponsString += '{{damage= ['+options.damage+dice_section+'damage'+rollEnding;
		advancedWeaponsString += '{{voiddamage= ['+options.damage+nothing_section;

		advancedWeaponsString += '{{damage_critical= [('+options.damage+')×2'+dice_section+'damage_critical'+rollEnding;
		advancedWeaponsString += '{{voiddamage_critical= [('+options.damage+')×2'+nothing_section;
	}
	if (options.hasLethality==1) {
		const label_lethality = `^{Lethality}`;
		advancedWeaponsString += '{{lethality_percent= [';
		advancedWeaponsString += label_lethality+' ('+options.lethality_percent+'%)';
		advancedWeaponsString += dice_section+'lethality_percent'+rollEnding;
		advancedWeaponsString += '{{voidlethality_percent= [';
		advancedWeaponsString += label_lethality+' ('+options.lethality_percent+'%)'+nothing_section;

		advancedWeaponsString += '{{lethality_percent_critical= [';
		advancedWeaponsString += label_lethality+' (2×'+options.lethality_percent+'%)';
		advancedWeaponsString += dice_section+'lethality_percent_critical'+rollEnding;
		advancedWeaponsString += '{{voidlethality_percent_critical= [';
		advancedWeaponsString += label_lethality+' (2×'+options.lethality_percent+'%)'+ nothing_section;
	}

	return advancedWeaponsString;
}

const check_for_wp_modifiers = (values,roll) => {

	const _willpower_points = parseInt(values[`willpower_points`]) || 0;
	var flag_for_zero_willpower = values[`zero_willpower`]== 1;
	flag_for_zero_willpower = flag_for_zero_willpower && _willpower_points== 0 && roll !== 'luck';

	const _zero_willpower = (flag_for_zero_willpower) ? 1 : 0;
	
	var flag_for_low_willpower = values[`low_willpower`]== 1;
	flag_for_low_willpower = flag_for_low_willpower && _willpower_points <= 2;
	flag_for_low_willpower = flag_for_low_willpower && roll !== 'luck' && roll !== 'sanity_points';
	/// important it is either one or the other
	flag_for_low_willpower = flag_for_low_willpower && flag_for_zero_willpower==false;
	const _low_willpower  = (flag_for_low_willpower) ? 1 : 0;
	return {zero_willpower: _zero_willpower, low_willpower: _low_willpower};
};

const check_success= (dice,rating,isSkill=1) => {
	// Input:
	// dice is the result of the roll
	// rollName is the name of the skill or stat
	// rollFail used only for stats to check for failure
	// rating is the rating of the skill or stat
	// isSkill is the flag to check if it's a skill or a stat [0,1]

	var isSuccess=0;
	var isCritical=0;

	if (dice==100){ // 100 is always a fumble
		isCritical=1;
		isSuccess=0;
	} else { // check for criticals normally
		isSuccess = dice<=rating ? 1 : 0;
		isCritical = _criticals.includes(dice) ? 1 : 0;			
	}

	const isInhuman=(isSkill==0 && rating>=_INHUMAN_STAT_);
	const isNormalSuccess=(isSuccess==1 && isCritical==0);

	if (isInhuman && isNormalSuccess){ // special case for stats to evaluate criticals
		const score=Math.round(rating/5);
		isCritical = (dice<=score) ? 1 : 0;
	}

	return {isSuccess:isSuccess,isCritical:isCritical};

};

const check_weapon_modifiers = (options) => { 
	const advanced_weapons = options.hasAdvancedWeapons;
	var modifier = options.modifier;
	const low_willpower = options.low_willpower;
	if (advanced_weapons==0) { return correct_modifier(modifier,low_willpower) ;}

	if (options.isShotgun==1 || options.hasBlastRadius==1){ modifier+=20;}
	if (options.hasAccessories==1){modifier+=options.accessory_modifier;}
	if (options.isFlawed==1){modifier-=20;}
	if (options.isAiming==1){modifier+=20;}
	return correct_modifier(modifier,low_willpower);	
}

const correct_modifier = (modifier,low_willpower,limit_to_40=1) => {
	// Input:
	// modifier is the base modifier provided by the used
	// low_willpowe is the  low willpower flag [0,1]
	// limit_to_40 is the flag to limit the upper bound modifier to 40% (not used but for future and debugging) [0,1]
	// Output:
	// the corrected modifier
	var corrected_modifier=modifier - (20*low_willpower);
	return limit_to_40==1 ? Math.min(40,corrected_modifier) : corrected_modifier;
}
const correct_rating = (rating,modifier,limit_to_99=1) => {
	// Input:
	// rating is the base rating of the skill
	// modifier is the corrected modifier
	// limit_to_99 is the flag to limit the upper bound rating to 99% (0 for inhuman stats) [0,1]
	// Output:
	// the corrected rating
	var corrected_rating=rating+modifier;
	return limit_to_99==1 ? Math.min(99,corrected_rating) : corrected_rating;
}

const check_sanloss = (sanloss,attrName) => {
	if (attrName==='sanity_loss_success'){

		return sanloss=='' ? 0 : sanloss;
	} else if(attrName==='sanity_loss_failure'){ 

		return sanloss=='' ? 1 : sanloss;
	}
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

const getUsedAmmo=(selfire_type='') => {
	if (selfire_type==='short burst'){return 3} ;
	if (selfire_type==='long burst'){return 5} ;
	if (selfire_type==='short spray'){return 10} ;
	if (selfire_type==='long spray'){return 20} ;
	return 1;
}

const need_to_track_ammo = (_values,_names)=>{
	const track_bullets=_values[_names['track_bullets']]==='active' ? 1 : 0;
	const hasammo=_values[_names['hasammo']]==='active' ? 1 : 0;
	return (track_bullets==1 && hasammo==1) ? 1 : 0;
}


const setAttributes = (update, silent) => { 
	(silent === true) ? setAttrs(update, {silent:true}) : setAttrs(update); 
};

// check skill value for weapons and special training
 const isSkillNumber = (str) => {
    let num=Number(str);
    return !isNaN(num) && num>=0 && num<=99
};

const isSkillName= (rollName) => {return arrays[`_skills`].includes(rollName) ? 1 : 0;};


// check if linking skill in in linking form
const isStringInForm=(str)=> {
    var regex = /^@\{[\w\s]+\}$/;
    return regex.test(str);
};

// used for linking skills
const cleanedSkill= (str) =>{return String(str).toLowerCase().replace(' ','_').replace('@{','').replace('}','')};

// When the trigger comes from another call
const isMinorityReport = (eventInfo) => !(eventInfo.hasOwnProperty('newValue'));

// check if the format is the one of a linking skill
const isValidSkill=(str)=> {

    const compar=cleanedSkill(String(str));

    return arrays['_skills'].concat(arrays['_stats']).concat(['unnatural','ritual_skill']).includes(compar);
};

const isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

const getSections = function(sectionDetails,callback){
	let queueClone = _.clone(sectionDetails);
	const worker = (queue,repeatAttrs=[],sections={})=>{
	  let detail = queue.shift();

	  getSectionIDs(detail.section,(IDs)=>{
		sections[detail.section] = IDs;
		IDs.forEach((id)=>{
		  detail.fields.forEach((f)=>{
			repeatAttrs.push(`${detail.section}_${id}_${f}`);
		  });
		});
		repeatAttrs.push(`_reporder_${detail.section}`);
		if(queue.length){
		  worker(queue,repeatAttrs,sections);
		}else{
		  callback(repeatAttrs,sections);
		}
	  });
	};
	if(!queueClone[0]){
	  callback([],{});
	}else{
	  worker(queueClone);
	}
  };

  const get_header_skills = (values,property) => {
    var _header = ``;
	if (values.hasOwnProperty(property['editable_name'])) {
	    _header = '{{header=^{'+property['editable_type']+'}';
		_header = _header +' ('+values[property['editable_name']]+')}}';
    }else {
		_header = '{{header=^{'+property['name']+'} }}';
    }    
    return _header;
}

const check_for_failed_skill = (rollName,isSuccess=0,isSkill=1) => {    
    // Input:
    // rollName is the name of the skill if it's a skill, if it's a repeating section, it's the name of the section
    // outcome is the result of the roll [0,1]
    // isSkill is the flag to check if it's a skill [0,1]

    var failure={};
    if (isSkill==false) {return failure;}; // if it's not a skill, return empty object
    if (isSuccess==1) {return failure;}; // if it's a success, return empty object

    failure[`${rollName}_fail`]='on';

    return failure;
}

const setMinMax = (skill, min=0, max=99) => {
	const IntegerSkill=parseInt(skill)||0;
	if (min>max) {return IntegerSkill}
	return Math.min(Math.max(IntegerSkill,min),max);
};	

const isValidLinkInput = (newValue) => {return (isStringInForm(newValue) && isValidSkill(newValue));};

const parseRoll = (roll) => {
    const regex_int = /^(\s*[\+\-]?\d{1,100}\s*)$/;
    const regex_roll  = /^((\s*[\+\-\(\)]\s*){0,4}?\d{0,10}[dD]?\d{1,10}((\s*[\+\-\*\/\(\)]\s*){0,4}?\d{0,10}[dD]?\d{1,10})*(\s*[\)]\s*){0,4}?)+$/
    if (regex_int.test(roll)) {return parseInt(roll);}
	if (regex_roll.test(roll)) {return roll.replace(/\s/g, '').toUpperCase();}
    return 0;
}

const maxRoll = (roll) => {
	if (isNaN(Number(roll))==false) {return roll;}
	return parseRoll(roll).replace(/[dD]/g, '*')
}

const minRoll = (roll) => {
	if (isNaN(Number(roll))==false) {return roll;}
	return parseRoll(roll).replace(/[dD]\d{1,100}/g,'')
}
const addTargetStat=(values,names,attrName) => {
	var target_stat='';
	if (attrName==='attack' || attrName==='heal'){
		target_stat+=`{{target_unit=${name_to_shorthand(values[names['target_stat']])}}}`;
		target_stat+=`{{target_stat=${values[names['target_stat']].replace(/_/g,' ')}}}`;
	}
	return target_stat;
};
const updatebondscore = (values,update,manualscore=true) => {

	const character_creation_bonds = values[`character_creation_bonds`] === 'active' ? true : false;
	const charisma_score = parseInt(values[`charisma_score`]) || 0;
	const bond_value =  (character_creation_bonds) ? charisma_score : Math.floor(charisma_score/2);
	const flag = (manualscore) ? 1 : parseInt(values[`repeating_bonds_setScore`]) || 0;
	const bond_score_old = parseInt(values[`repeating_bonds_score_old`]) || 0;
	var bond_score = 0;
	
	if (flag === 0) {
		bond_score = bond_value; 
	} else {
		bond_score = parseInt(values[`repeating_bonds_score`]) || 0;
		if (bond_score > charisma_score) {
			if (bond_score_old<= charisma_score) {
				bond_score = charisma_score;
			}

		}
	}    
	update[`repeating_bonds_score`] = bond_score;
	update[`repeating_bonds_score_old`] = bond_score;
	update[`repeating_bonds_setScore`] = 1;
	update[`repeating_bonds_color`] = BondButtonColor(bond_score);
}
const DeltaGreenLethalityFail=(roll) => {
	const quotient=Math.floor(roll/10)== 0 ? 10 : Math.floor(roll/10);
	const remainder= (roll%10 ==0) ? 10 : Math.floor(roll%10);
	return quotient+ remainder;
};