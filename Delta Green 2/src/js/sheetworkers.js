



// Update span on change
const updateSkillSpanOnChange=(skill,value,update,isWhat) =>{

	const sectionDetails = [{section:'repeating_special', fields:['skill_or_stat_used']},
		{section:'repeating_weapons',fields:['skill_percent']},
		{section:'repeating_rituals',fields:['skill_percent']}];

	getSections(sectionDetails,(attr)=>{
		
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


_shotgun_or_blast_radius.forEach(main => {
	other= _shotgun_or_blast_radius.filter(el => el == main);
	
	
	on(`change:repeating_weapons:${main}`, (eventInfo) => {
		id = eventInfo.sourceAttribute.split('_')[2];
		const main_name=`repeating_weapons_${id}_${main}`;
		const other_name=`repeating_weapons_${id}_${other}`;
		const double_barrel_name=`repeating_weapons_${id}_hasDoubleBarrel`;
		
		getAttrs([main_name,other_name], (values) => {
			
			console.info(values);
			const main_value=values[main_name]==='active' ? 1 : 0;
			const update={};
			
			
			
			if (main_value===1 ){
				if  (main==='shotgun'){
					update[`repeating_weapons_${id}_blast_radius`]=0;
					update[double_barrel_name]='active';
				}else{
					update[double_barrel_name]=0;
					update[`repeating_weapons_${id}_shotgun`]=0;
				}
			}
			if (main_value===0){
				update[double_barrel_name]=0;
			}
			
			setAttrs(update,{silent:true},()=>{
				console.log('Shotgun or Blast Radius updated');
				
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



Object.entries(_repeating_sections).forEach(([attrName,section]) => {
	on(`change:repeating_${section}`, (eventInfo) => {
		const id = eventInfo.sourceAttribute.split('_')[2];
		/*if (_repeating_exceptions.hasOwnProperty(section)){
			const _array_to_check = _repeating_exceptions[section];
			const _event_target = eventInfo.sourceAttribute;
			const flag= _array_to_check.some(v=> _event_target.includes(v));
			if (flag){
				attrName= _repeating_exceptions[`weapons`].filter( v=>  eventInfo.sourceAttribute.includes(v))[0];
				changeRepeatingExceptions(section,attrName);
			} else {
				console.log('no exceptions');
				changeRepeatingRolls(section,attrName,id);
			}
		} else {
			changeRepeatingRolls(section,attrName,id);
		}*/
		changeRepeatingRolls(section,attrName,id);
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
			var update = {};
			getAttrs(arrays['_stats'].concat(_sanity_array,_initial_hp,['unnatural'],arrays['_stats'].map(el=> `${el}_score`)), function(v) {
				const value=parseInt(stat[stat_score],10) || 0;
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

on('change:advanced_weapons',()=>{
    updateadvancedweapons()
});



const updateadvancedweapons = () => {
	getAttrs(['advanced_weapons'],(v)=>{
		const advanced_weapons=v['advanced_weapons'];
		getSectionIDs('repeating_weapons',(ids)=>{
		
			const update={};
		
			const prefix='repeating_weapons_';
		
			
			ids.forEach((id)=>{
				update[prefix+id+'_hasAdvancedWeapons']=advanced_weapons;
				arrays['_advanced_weapons_featurs'].forEach((feat)=>{
					update[prefix+id+'_'+feat]=0;
				});
			});
			setAttrs(update,{silent:true});
		});
	});
};