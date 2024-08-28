

let _isInitialized = false;

const setAttributes = (update, silent) => { 
	(silent === true) ? setAttrs(update, {silent:true}) : setAttrs(update); 
};

// === ATTRIBUTE ARRAYS
	// note: I had the underscore in front of the arrays key to distinguish it from the name of the attribute
const arrays = {
		_stats: ['strength', 'constitution', 'dexterity', 'intelligence', 'power', 'charisma'],
		_derived_stats: ['hit_points', 'sanity_points', 'willpower_points', 'breaking_point'],
		_derived_stats_max: ['hit_points_max', 'willpower_points_max', 'breaking_point_max'],
		_hit_points: ['strength_score', 'constitution_score'],
		_sanity_points: ['power_score'], //ALSO USED FOR BREAKING POINTS
		_willpower_points: ['power_score'],
		_toggles: ['settings'],
		_sanity_loss: ['sanity_success', 'sanity_failure'],
		_skills:['accounting', 'alertness', 'anthropology', 'archeology', 'art_1', 'art_2', 'artillery', 'athletics', 'bureaucracy', 'computer_science', 'craft_1', 'craft_2', 'criminology', 'demolitions', 'disguise', 'dodge', 'drive', 'firearms','first_aid', 'forensics', 'heavy_machinery', 'heavy_weapons', 'history', 'humint', 'law', 'medicine', 'melee_weapons', 'military_science_1', 'military_science_2', 'navigate', 'occult', 'persuade', 'pharmacy', 'pilot_1','pilot_2', 'psychotherapy','ride', 'science_1','science_2', 'search' , 'sigint' , 'stealth' , 'surgery' , 'survival', 'swim', 'unarmed_combat'],
		_colored_derivative:['willpower','hit'],
		_derived_rolls:['sanity_points','luck'],
		_disorder_related:['sanity_points','breaking_point'],
		_derived_modifiers:['willpower_points','low_willpower','zero_willpower'],
		_settings_wp:[`mod_willpower_check`],	
		_adaptation:['violence','helplessness'],
		_editable_skills:['art_1','art_2','craft_1','craft_2','military_science_1','military_science_2','pilot_1','pilot_2','science_1','science_2'],
		_weapon :["name", "skill_percent", "base_range", "damage", "armor_piercing", "lethality_percent", "ammo"],
		_rituals : ['name','skill_span','unnatural_gain','study_time','sanity_loss_for_learning','activation_time','description','complexity'],
		_personal_data : [
			'profession',
			'employer',
			'occupation',
			'nationality_and_residence',
			'sex',
			'age',
			'education',
			'personal_details_and_notes',
			'developments_which_affect_home_and_family',
			'description',
			'physical_description',
			'npc_sources',
			'npc_remarks'],
};

const _initial_skills={'accounting': 10, 'alertness': 20, 'anthropology': 0, 'archeology': 0, 'art_1': 0, 
	'art_2': '0', 'artillery': 0, 'athletics': 30, 'bureaucracy': 10, 'computer_science': 0,
	 'craft_1': 0, 'craft_2': 0, 'criminology': 10, 'demolitions': 0, 'disguise': 10, 'dodge': 30, 
	 'drive': 20, 'firearms': 20, 'first_aid': 10, 'forensics': 0, 'heavy_machinery': 10, 'heavy_weapons': 0,
	 'history': 10, 'humint': 10, 'law': 0, 'medicine': 0, 'melee_weapons': 30, 'military_science_1': 0,
	 'military_science_2': 0, 'navigate': 10, 'occult': 10, 'persuade': 20, 'pharmacy': 0, 'pilot_1': 0, 
	 'pilot_2': 0, 'psychotherapy': 10, 'ride': 10, 'science_1': 0, 'science_2': 0, 'search': 20, 'sigint': 0,
	  'stealth': '10', 'surgery': 0, 'survival': 10, 'swim': 20, 'unarmed_combat': 40,'unnatural': 0};


const _repeating_sections={
	'skill':'skills',
	'bond':'bonds',
	'special':'special',
	'weapons':'weapons',
	'ritual':'rituals'
	};
const _additional_repeating_sections={
	
	'pay_cost':'rituals',
	'force_connection':'rituals',
	'accept_failure':'rituals'};

const _repeating_damages = [
	'damage',
	'damage_critical',
	'lethality',
	'lethality_critical',
	'second_damage',
	'second_damage_critical',
	'selective_fire',
	'selective_fire_critical',
]

const _repeating_ammo = [
	'hasammo',
	'ammo',
	'ammo_total'
]

const _rd100 = `[[1d100]]`;
const _rd4   = `[[1d4]]`;
const _rd6   = `[[1d6]]`;
const _rd8   = `[[1d8]]`;
const _rd10  = `[[1d10]]`;
const _rd12  = `[[1d12]]`;
const _rd20  = `[[1d20]]`;
const _queryModifier = `?{Modifier|0|+20%,20|+40%,40|-20%,-20|-40%,-40|custom (%),?{custom (%)}}`;
const prefix_skill_roll = `@{gm_toggle} &{template:fancy-rolls} {{name=@{character_name}}} {{dice=[[${_rd100}]]}}`; 
const prefix_sanity_roll = `@{gm_toggle} &{template:fancy-sanloss} `;
const prefix_damage_roll = `@{gm_toggle} &{template:fancy-damages} {{name=@{character_name}}}`;
const prefix_bond_roll = `@{gm_toggle} &{template:fancy-bonds} {{character_id=@{character_id}}}{{name=@{character_name}}} {{dice=[[${_rd4}]]}}`; 
const prefix_ritual_roll = `@{gm_toggle} &{template:fancy-rituals} {{name=@{character_name}}} {{dice=[[${_rd100}]]}}`;
const prefix_ritualloss_roll = `@{gm_toggle} &{template:fancy-ritualloss} {{name=@{character_name}}} {{header=^{ritual cost}}}`;
 // check skill value for weapons and special training
 const isSkillNumber = (str) => {
    let num=Number(str);
    return !isNaN(num) && num>=0 && num<=99
};


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

on(`remove:repeating_skills`, (eventInfo) => {
	
});


const isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

const getSections = function(sectionDetails,callback){
	let queueClone = _.clone(sectionDetails);
	const worker = (queue,repeatAttrs=[],sections={})=>{
	  let detail = queue.shift();
	  console.log('in getSections',detail.section);
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

// Update span on change
const updateSkillSpanOnChange=(skill,value,update,isWhat) =>{
    
    
	
	const sectionDetails = [{section:'repeating_special', fields:['skill_or_stat_used']},
		{section:'repeating_weapons',fields:['skill_percent']},
		{section:'repeating_rituals',fields:['skill_percent']}];

	getSections(sectionDetails,(attr)=>{
		console.log(attr);
		const allskills1=attr.filter(el => el.startsWith(sectionDetails[0][`section`]) && el.endsWith(sectionDetails[0][`fields`][0]));
		const allskills2=attr.filter(el => el.startsWith(sectionDetails[1][`section`]) && el.endsWith(sectionDetails[1][`fields`][0]));
		const allskills3=attr.filter(el => el.startsWith(sectionDetails[2][`section`]) && el.endsWith(sectionDetails[2][`fields`][0]));
		
		const allids1= allskills1.map(el => el.replace(`_${sectionDetails[0][`fields`][0]}`,''));
		const allids2= allskills2.map(el => el.replace(`_${sectionDetails[1][`fields`][0]}`,''));
		const allids3= allskills3.map(el => el.replace(`_${sectionDetails[2][`fields`][0]}`,''));
		const len1=allids1.length;
		const len2=allids2.length;
		const len3=allids3.length;
		
		
		
		
		
		
		getAttrs(allskills1.concat(allskills2).concat(allskills3),(v)=>{
				
			for (i=0;i<len1; i++){
				if (cleanedSkill(v[allskills1[i]])===skill){
					update[`${allids1[i]}_skill_span`]=value;
				}
				
			}

			for (i=0;i<len2; i++){
			if (cleanedSkill(v[allskills2[i]])===skill){
					update[`${allids2[i]}_skill_span`]=value;
				}
			}

			for (i=0;i<len3; i++){
				if (cleanedSkill(v[allskills3[i]])===skill){
						update[`${allids3[i]}_skill_span`]=value;
					}
				}
			setAttrs(update,{silent:true},()=>{
				console.log(`update ${isWhat} on change`);
				console.log(`update ${skill}  on change`);
				
			});
		});

	});

    
}


const saneffects=(snew,sold,smax,bnew,bmax,bold,pow,trackbp) => {
    const san = value_current(snew,sold,smax);            
    const diffsan=san-sold;

    const flag_2san = (diffsan>=2) ? 1 : 0;
    const flag_temp = (diffsan>=5) ? 1 : 0;
    const flag_bp   = (san<=bnew && trackbp==1)  ? 1 : 0;    
    return {san2:flag_2san,temp:flag_temp,bp:flag_bp};
};




const definesanroll=(san,sold,bnew,bold,sanflags,character_name,San2_disorder={},Temp_disorder={}) => {
    const diffsan=san-sold;
    const flag_2san=(sanflags.san2 && !(isEmpty(San2_disorder)));
    const flag_temp=sanflags.temp;
    const flag_bp=sanflags.bp;

    var rollString=`&{template:fancy-rolls} {{name=${character_name}}} {{header=^{sanity_loss}}} `;
    rollString= `${rollString} {{sanity_loss=[[${diffsan}]]}} {{sanity_new=[[${san}]]}}`;
    rollString= `${rollString} {{sanity_old=[[${sold}]]}} {{bp_old=[[${bold}]]}} {{bp_new=[[${bnew}]]}}`;
    
    if (flag_bp == 1){
        rollString= `${rollString} {{flag_bp=1}} `;
    }
    if (flag_temp==1){
        rollString=`${rollString} {{flag_temp=1}}`;
        if (!(isEmpty(Temp_disorder))){
            Object.entries(Temp_disorder).forEach(([key,val],index)=>{
                rollString= `${rollString} {{tdis_name${index}=${key}}} {{tdis_desc${index}=${val}}} `;
            });
        }
    }    

    if (flag_2san==1){
        rollString=`${rollString} {{flag_2san=1}}`;
        if (!(isEmpty(Temp_disorder))){
            Object.entries(Temp_disorder).forEach(([key,val],index)=>{
                rollString= `${rollString} {{tdis_name${index}=${key}}} {{tdis_desc${index}=${val}}} `;
            });
        }
    }   
    

    var update={};    
    update['sanity_points']=san;
    update['sanity_points_old']=sold;
    if (flag_bp==='on'){
        update['breaking_point']=Math.max(0,san-pow);
        update['breaking_point_max']=bold;
        update['breaking_point_old']==Math.max(0,san-pow);
    }

    
    setAttrs(update, {silent:true},()=>{
        
    });

    startRoll(`${rollValue} {{isSkill=[[${_isSkill}]]}}`, (results)=> {
        const sanity_old=results.results.sanity_old.result;
        const sanity_new=results.results.sanity_new.result;
        const sanity_loss=results.results.sanity_loss.result;
        const bp_old=results.results.bp_old.result;
        const bp_new=results.results.bp_new.result;

        
        
		finishRoll(results.rollId,{});

    });
 
}


const value_current = (current,old,max) => {
	
    if (current>=max) {
        return (current<=old) ? current : old;
    }
    return Math.max(current,0);
}
   
var addskills=[];	//name of the array
const update_additionalskills= ()=>{
    addskills=[];
	var update={};
    getSectionIDs('skills', (idarray) => {
      addskills=idarray.map(id =>`repeating_skills_${id}`) ; 
      console.log(addskills);  //log of debugging to be sure
	  idarray.forEach(id=>{
		update[`repeating_skills_${id}_${element}_action`] = `%{${character_id}|repeating_skills_${id}_${element}-action}`;			
		update[`repeating_skills_${id}_skill_r`]=id;
	  });
	  setAttrs(update,{silent:true},()=>{
		
	  });
    });
};	


const setMinMax = (skill, min, max) => {
	const Iskill=parseInt(skill)||0;
	return (Iskill < min) ? min : (Iskill > max) ? max : Iskill;
};	

const _shotgun_or_blast_radius =[`shotgun`,`blast_radius`];
_shotgun_or_blast_radius.forEach(whichone => {
	other= _shotgun_or_blast_radius.filter(el => el != whichone);
	on(`change:repeating_weapons_${whichone}`, (eventInfo) => {
		getAttrs([`repeating_weapons_${whichone}`,`repeating_weapons_${other}`], (values) => {
			const whichone_value=values[`repeating_weapons_${whichone}`]==='active' ? 1 : 0;
			const other_value=values[`repeating_weapons_${other}`]==='active' ? 1 : 0;
			const update={};
			update[`repeating_weapons_${whichone}`]=whichone_value;
			update[`repeating_weapons_${other}`]=other_value;
			if (whichone===1 && other===1){
				 update[`repeating_weapons_${other}`]=0;
			}
			if (whichone==='shotgun' && whichone_value===1){
				update[`repeating_weapons_second_damage`]=1;
			}
			
			setAttrs(update,{silent:true},()=>{
				console.log('Shotgun or Blast Radius updated');
				console.info(update);	
			});
		});
	});
});

const setBondsLocalVariables = () => {
	getAttrs(["willpower_points","sanity_points"],function(value){
		let update={};
		getSectionIDs("bonds",function(idarray){
			idarray.forEach(id=>{
				update["repeating_bonds_"+id+"_wp_points"]=value["willpower_points"];
				update["repeating_bonds_"+id+"_sanity_points"]=value["sanity_points"];
			});
			console.log('inside repeating section');
			
			setAttrs(update,{silent:true},()=>{
				console.log('Bonds updated on open');
			});	
		});
	});
};




arrays['_adaptation'].forEach(adaptation => {
	console.log('adaptation:',adaptation);
	on('change:'+adaptation, () => {
		getAttrs([adaptation], (values) => {
			console.log('values:',values);
			const value=parseInt(values[adaptation]) || 0;
			console.log('adaptation changed:'+value);
			const update={};
			update[`${adaptation}_adapted`]= value===2 ? 1 : 0;
			setAttrs(update, {silent:true}, () => {
				update[`${adaptation}_adapted`] == 1 ? console.log(`${adaptation} adapted`) : console.log(`${adaptation} not adapted`);
			});
		});
	});
});	

arrays['_settings_wp'].forEach(wp_setting => {
	on(`change:${wp_setting}`, (eventInfo) => {
		console.log('wp_setting changed:'+eventInfo.triggerName);
		getAttrs(arrays['_settings_wp'].concat(arrays['_derived_modifiers']), (values) => {
			var update = {};
			if (values['mod_willpower_check'] === 'none'){
				update[`low_willpower`] = 0;
				update[`zero_willpower`] = 0;
			}
			if (values['mod_willpower_check'] === 'lowonly'){
				update[`zero_willpower`] = 0;
				update[`low_willpower`] = 1;
			}
			if (values['mod_willpower_check'] === 'all'){
				update[`low_willpower`] = 1;
				update[`zero_willpower`] = 1;
			}
			
			setAttrs(update, {silent:true}, () => {
				console.log('Willpower Settings updated');
			});
		});
	});
});

on(`change:repeating_skills:rank`, (eventInfo) => {
	const newValue = setMinMax(parseInt(eventInfo.newValue) || 0, 0, 99);
	update={};
	update[eventInfo.sourceAttribute]=newValue;
	
	setAttrs(update,{silent:true},()=>{
		console.log('Repeating Skills updated on change');
	});
});


Object.entries(_repeating_sections).forEach(([element,section]) => {
	on(`change:repeating_${section}`, (eventInfo) => {
		const id = eventInfo.sourceAttribute.split('_')[2];
		changeRepeatingRolls(section,element,id);
	});
});
Object.entries(_additional_repeating_sections).forEach(([element,section]) => {
	on(`change:repeating_${section}`, (eventInfo) => {
		const id = eventInfo.sourceAttribute.split('_')[2];
		changeRepeatingRolls(section,element,id);
	});
});	



// new function to compute san point max
on("change:unnatural", function(eventInfo) {
		const newvalue = setMinMax(parseInt(eventInfo.newValue) || 0,0,99);
		update={sanity_points_max: 99-newvalue, unnatural: newvalue};
		
		setAttrs(update,{silent:true},()=>{
			console.log('Sanity points updated');
		});
});


// === debug note: need to change repeating_special_training and repeating_weapons for visulization purposes
// === Update stats on change
arrays['_stats'].forEach(stat => {
		const stat_score = `${stat}_score`;
		
		const _sanity_array=['sanity_points', 'breaking_point','initial_san'];
		const _initial_hp=['initial_str','initial_con','initial_hp'];
		on(`change:${stat_score}`, (eventInfo) => {
			const value = parseInt(eventInfo.newValue) || 0;
			var update = {};
			getAttrs(arrays['_stats'].concat(_sanity_array,_initial_hp,['unnatural'],arrays['_stats'].map(el=> `${el}_score`)), function(v) {
				
				update[stat]=value*5;
				update[stat_score]=value;
				if (stat==='power'){
					const sanmax=99-parseInt(v['unnatural']||0);
					update[`willpower_points_max`]=value;
					update['sanity_point_max']=sanmax;
					const flag_initial_san=v.initial_san;
					if (flag_initial_san==1){
						const InitialSanity = value*5;
						const InitialBreakingPoint = value*4;
						const InitialWillPower = value; 
						
						update['sanity_points']= InitialSanity;
						update['sanity_points_old']= InitialSanity;
						update['breaking_point']= InitialBreakingPoint;
						update['breaking_point_max']= InitialBreakingPoint;
						update['willpower_points']=InitialWillPower;
						update['initial_san']=0;
					}

				}

				if (stat==='strength' || stat==='constitution'){
					// no matter what the flag will be trigger, I save the check for the initial hp
					
					const flag_initial_str=v.initial_str;
					const flag_initial_con=v.initial_con;
					const flag_initial_hp=v.initial_hp;
					const con=parseInt(v[`constitution_score`] ||0);
					const str=parseInt(v[`strength_score`] ||0);
					var new_flag_initial_hp=1;
					if (stat==='strength') {
						update[`initial_str`]=0;
						if (flag_initial_con ===0) {
							new_flag_initial_hp=0;
						}
					}else{
						update[`initial_con`]=0;
						if (flag_initial_str ===0) {
							new_flag_initial_hp=0;
						}
					}
					if (flag_initial_hp === 0 || new_flag_initial_hp === 0){
						update[`hit_points_max`]=Math.ceil((con+str)/2);	
					}
					if (new_flag_initial_hp === 0){
						update[`hit_points`]=update[`hit_points_max`];
						update[`initial_hp`]=0;
					}
				}
				updateSkillSpanOnChange(stat,value*5,update,'Stats')
			});
		});
});

const skill_in_bounds = (skill) => {
	const skill_value = parseInt(skill) || 0;
	return Math.min(99, Math.max(0, skill_value));
};
on(`change:ritual_skill`, (eventInfo) => {
	const value = skill_in_bounds(eventInfo.newValue);
	var update = {};
	console.log('ritual_skill:',value);
	update['ritual_skill'] = value;
	updateSkillSpanOnChange('ritual_skill',value,update,'Rituals');
});
// === Update skills on change
arrays['_skills'].forEach(skill => {
		on(`change:${skill}`, (eventInfo) => {
			const value= skill_in_bounds(eventInfo.newValue);
			var update={};
			update[skill]=value;
			updateSkillSpanOnChange(skill,value,update,'Skills')				
		});
});




	// === Update repeating skills on change
on("change:repeating_skills:rank", function(eventInfo) {
		const value = parseInt(eventInfo.newValue) || 0;
		if (value < 0) {
			setAttributes({[eventInfo.sourceAttribute]: 0}, false);
		}
		if (value > 99) {
			setAttributes({[eventInfo.sourceAttribute]: 99}, false);
		}
});

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
	


on("change:sanity_success change:sanity_failure",function(){
	   getAttrs(['sanity_success', 'sanity_failure'], function(v) {
			let maxsan=v.sanity_failure;
			let minsan=v.sanity_success;
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
const elementid_off= (element) =>{
	var element=document.getElementById(element);
	element.style.display="none";
};
// Create array with list of repeating skills
const elementid_on= (element) =>{
	var element=document.getElementById(element);
	element.style.display="block";
};

on(`change:testjsid`,(eventInfo)=>{
	const value=eventInfo.newValue;
	if (value == 'on') {
		elementid_off("personal_data");
	}else{
		elementid_on("personal_data");
	}
});