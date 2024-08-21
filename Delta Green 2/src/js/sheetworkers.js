import { initRelay } from '@roll20/beacon-sdk';

const dispatch = initRelay({
    handlers: {
        onInit: ({ character } ) => { console.log('sheet character', character) },
        onChange: () => {},
        onSettingsChange: () => {},
        onSharedSettingsChange: () => {},
        onTranslationsRequest: () => {},
        onDragOver: () => {}
    },
    // Refer to our advanced example sheet on how to setup actions and computed properties.
    actions: {},
    computed: {}
})



const setAttributes = (update, silent) => { 
	(silent === true) ? setAttrs(update, {silent:true}) : setAttrs(update); 
};

// === ATTRIBUTE ARRAYS
	// note: I had the underscore in front of the arrays key to distinguish it from the name of the attribute
const arrays = {
		_stats: ['strength', 'constitution', 'dexterity', 'intelligence', 'power', 'charisma'],
		_hit_points: ['strength_score', 'constitution_score'],
		_sanity_points: ['power_score'], //ALSO USED FOR BREAKING POINTS
		_willpower_points: ['power_score'],
		_toggles: ['settings'],
		_sanity_loss: ['san_success', 'san_failure'],
		_skills:['accounting', 'alertness', 'anthropology', 'archeology', 'art_1', 'art_2', 'artillery', 'athletics', 'bureaucracy', 'computer_science', 'craft_1', 'craft_2', 'criminology', 'demolitions', 'disguise', 'dodge', 'drive', 'firearms','first_aid', 'forensics', 'heavy_machinery', 'heavy_weapons', 'history', 'humint', 'law', 'medicine', 'melee_weapons', 'military_science_1', 'military_science_2', 'navigate', 'occult', 'persuade', 'pharmacy', 'pilot_1','pilot_2', 'psychotherapy','ride', 'science_1','science_2', 'search' , 'sigint' , 'stealth' , 'surgery' , 'survival', 'swim', 'unarmed_combat'],
		_colored_derivative:['willpower','hit'],
		_derived_rolls:['sanity_points','luck'],
		_disorder_related:['sanity_points','breaking_point'],
		_bonds_local:['willpower_points','sanity_points'],
		_derived_modifiers:['willpower_points','low_will_power','zero_will_power'],
		_settings_wp:[`mod_will_power_check`],	
		_adaptation:['violence','helplessness'],
		_editable_skills:['art_1','art_2','craft_1','craft_2','military_science_1','military_science_2','pilot_1','pilot_2','science_1','science_2'],
		_weapon :["name", "skill_percent", "base_range", "damage", "armor_piercing", "lethality_percent", "ammo"],
		
};

const _repeating_sections={'skill':'skills','bond':'bonds','special':'special','weapons':'weapon'};
const _rd100 = `[[1d100]]`;
const _rd4   = `[[1d4]]`;
const _rd6   = `[[1d6]]`;
const _rd8   = `[[1d8]]`;
const _rd10  = `[[1d10]]`;
const _rd12  = `[[1d12]]`;
const _rd20  = `[[1d20]]`;
const _queryModifier =`?{Modifier|,0|+20%,20|+40%,40|-20%,-20|-40%,-40|custom (%),?{custom (%)}}`;
const prefix_skill_roll = `@{gm_toggle} &{template:fancy-rolls} {{name=@{character_name}}} {{dice=[[${_rd100}]]}}`; 
const prefix_bond_roll = `@{gm_toggle} &{template:fancy-bonds} {{character_id=@{character_id}}}{{name=@{character_name}}} {{dice=[[${_rd4}]]}}`; 
const criticals = [1,11,22,33,44,55,66,77,88,99,100];

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
    console.info('input string:',str);
    const compar=cleanedSkill(String(str));
    console.info('output str:',compar);
    return arrays['_skills'].concat(arrays['_stats']).includes(compar);
};

on(`remove:repeating_skills`, (eventInfo) => {
	console.info('repeating remove skills removed',eventInfo);
});


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

// Update span on change
const updateSkillSpanOnChange=(skill,value,update,isWhat) =>{
    console.info('skill',skill);
    console.info('value',value);
	
	const rep_and_field={'weapons':'skill_percent','special':'skill_or_stat_used'};
	const sectionDetails = [{section:'repeating_special', fields:['skill_or_stat_used']},
		{section:'repeating_weapons',fields:['skill_percent']}]
	

	getSections(sectionDetails,(attr)=>{
		console.log(attr);
		const allskills1=attr.filter(el => el.startsWith(sectionDetails[0][`section`]) && el.endsWith(sectionDetails[0][`fields`][0]));
		const allskills2=attr.filter(el => el.startsWith(sectionDetails[1][`section`]) && el.endsWith(sectionDetails[1][`fields`][0]));
		const allids1= allskills1.map(el => el.replace(`_${sectionDetails[0][`fields`][0]}`,''));
		const allids2= allskills2.map(el => el.replace(`_${sectionDetails[1][`fields`][0]}`,''));
		const len1=allids1.length;
		const len2=allids2.length;
		console.info(`allids1:`,allids1);
		console.info(`allids2:`,allids2);
		console.info(`allskills1:`,allskills1);
		console.info(`allskills2:`,allskills2);
		getAttrs(allskills1.concat(allskills2),(v)=>{
				
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

			setAttrs(update,{silent:true},()=>{
				console.log(`update ${isWhat} on change`);
				console.log(`update ${skill}  on change`);
				console.info(`update:`,update);
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
        console.info('Sanity loss roll finished',update);
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
		update[`repeating_skills_${id}_skill_r`]=id;
	  });
	  setAttrs(update,{silent:true},()=>{
		console.info('Repeating Skills updated',update);
	  });
    });
};	


const setMinMax = (skill, min, max) => {
	const Iskill=parseInt(skill)||0;
	return (Iskill < min) ? min : (Iskill > max) ? max : Iskill;
};

on(`change:repeating_weapons:shotgun change:repeating_weapons:blastradius`, (eventInfo)=> {
	const possibilities=['shotgun','blastradius'];
	const choice = eventInfo.newValue==='active' ? 1 : 0;
	const whichone= eventInfo.triggerName.split('_')[3];
	const isMinority=isMinorityReport(eventInfo);
	if (!isMinority){
		const other= possibilities.filter(el => el != whichone);
		var update={};
		if (((choice ==0) && (whichone===`shotgun`)) || ((choice ==1) && (other===`shotgun`))){update[`repeating_weapons_double_damage`]=0;}
		if (choice==1 && whichone ==='shotgun'){update[`repeating_weapons_double_damage`]='active';}
		if (choice==1){update[`repeating_weapongs_${other}`]=0;}
		
		setAttrs(update,{silent:true},()=>{
			console.info(`update shotgun/blastradius`,update);
		});

	}
});

const setBondsLocalVariables = () => {
	getAttrs(["willpower_points","sanity_points"],function(value){
		let update={};
		getSectionIDs("bonds",function(idarray){
			idarray.forEach(id=>{
				update["repeating_bonds_"+id+"_wp_points"]=value["willpower_points"];
				update["repeating_bonds_"+id+"_san_points"]=value["sanity_points"];
			});
			console.log('inside repeating section');
			console.info('update bonds',update);
			setAttrs(update,{silent:true},()=>{
				console.log('Bonds updated on open');
			});	
		});
	});
};




arrays['_adaptation'].forEach(adaptation => {
	const adaptation_indexed = [`${adaptation}_1`, `${adaptation}_2`, `${adaptation}_3`];
	on(`change:${adaptation}_1 change:${adaptation}_2 change:${adaptation}_3`, (eventInfo) => {
		const adaptation_idx = parseInt(eventInfo.sourceAttribute.split('_')[1]);
		const adaptation_value = eventInfo.newValue === 'on' ? 1 : 0;
		const adaptation_type = eventInfo.sourceAttribute.split('_')[0];
		console.log(`adaptation changed: ${adaptation_type} with index ${adaptation_idx} and value ${adaptation_value}`);
		var update = {};
		update[`${adaptation}_adapted`] = 0;
		if (adaptation_idx == 1 && adaptation_value === 0){
			update[`${adaptation_indexed[1]}`] = 0;
			update[`${adaptation_indexed[2]}`] = 0;
		}
		if (adaptation_idx == 2 && adaptation_value ===0){
			update[`${adaptation_indexed[2]}`] = 0;
		}
		if (adaptation_idx == 2 && adaptation_value === 1){
			update[`${adaptation_indexed[0]}`] = 'on';
		}
		if (adaptation_idx == 3 && adaptation_value === 1){
			update[`${adaptation_indexed[0]}`] = 'on';
			update[`${adaptation_indexed[1]}`] = 'on';
			update[`${adaptation}_adapted`] = 1;
		}
		console.info(update);
		setAttrs(update, {silent:true}, () => {
			console.log('Adaptation updated');
		});
		
	});
});

arrays['_settings_wp'].forEach(wp_setting => {
	on(`change:${wp_setting}`, (eventInfo) => {
		console.log('wp_setting changed:'+eventInfo.triggerName);
		getAttrs(arrays['_settings_wp'].concat(arrays['_derived_modifiers']), (values) => {
			var update = {};
			if (values['mod_will_power_check'] === 'none'){
				update[`low_will_power`] = 0;
				update[`zero_will_power`] = 0;
			}
			if (values['mod_will_power_check'] === 'lowonly'){
				update[`zero_will_power`] = 0;
				update[`low_will_power`] = 1;
			}
			if (values['mod_will_power_check'] === 'all'){
				update[`low_will_power`] = 1;
				update[`zero_will_power`] = 1;
			}
			console.info(update);
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
	console.info(update);
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
	


// new function to compute san point max
on("change:unnatural", function(eventInfo) {
		const newvalue = setMinMax(parseInt(eventInfo.newValue) || 0,0,99);
		update={sanity_points_max: 99-newvalue, unnatural: newvalue};
		console.info(update);
		setAttrs(update,{silent:true},()=>{
			console.log('Sanity points updated');
		});
});


// === debug note: need to change repeating_special_training and repeating_weapons for visulization purposes
// === Update stats on change
arrays['_stats'].forEach(stat => {
		const stat_score = `${stat}_score`;
		const stat_hidden = `${stat}_hidden`;
		const _san_array=['sanity_points', 'breaking_point','initial_san'];
		const _initial_hp=['initial_str','initial_con','initial_hp'];
		on(`change:${stat_score}`, (eventInfo) => {
			const value = parseInt(eventInfo.newValue) || 0;
			var update = {};
			getAttrs(arrays['_stats'].concat(_san_array,_initial_hp,['unnatural'],arrays['_stats'].map(el=> `${el}_score`)), function(v) {
				
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
				//console.info('update on change stats:',update);
				//setAttrs(update, {silent:true},()=>{
				//	console.log('Stats updated on change');
				//});
			});
		});
});
	
// === Update skills on change
arrays['_skills'].forEach(skill => {
		on(`change:${skill}`, (eventInfo) => {
			const tmpvalue=Math.abs(parseInt(eventInfo.newValue) || 0);
			const value= tmpvalue<=99 ? tmpvalue : 99;
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


// UPDATE THE WP INSIDE EACH BOND
 arrays['_bonds_local'].forEach(attr => {
	on(`change:${attr}`, (eventInfo) => {
		var update={};
		const newvalue = parseInt(eventInfo.newValue) || 0;
		const wporsan = eventInfo.triggerName;
		const _prefix = (wporsan === "willpower_points") ? "wp" : "san";
		console.log('prefix: ' + _prefix);
		const isMinority=isMinorityReport(eventInfo);
		const target=eventInfo.triggerName;
		


		getSectionIDs("bonds",function(idarray){
			idarray.forEach(id=>{
				update["repeating_bonds_"+id+"_"+_prefix+"_points"]=newvalue;
			});
			console.info(update);
			getAttrs([`sanity_points`,`sanity_points_old`,`sanity_points_max`],v=>{
				const sold=parseInt(v[`sanity_points_old`])||0;
				const smax=parseInt(v[`sanity_points_max`])||0;
				const san=value_current(parseInt(v[`sanity_points`]) || 0,sold,smax);
				update[`sanity_points`]=san;
				update[`sanity_points_old`]=san;
		
				setAttrs(update,{silent:true},()=>{
					console.log('Bonds updated on change');
				});
			});
		});
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
// === SAN LOSS Button
arrays['_sanity_loss'].forEach(attr => {
	on(`change:${attr}`, (eventInfo) => {
		const value = eventInfo.newValue;
		if (value ===""){
			setAttributes({[`has_${attr}`]: 0}, true);
		} else {
			setAttributes({[`has_${attr}`]: 1}, true);
		}
	});
});

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