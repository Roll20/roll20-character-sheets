
arrays['_colored_derivative'].forEach(vitality => {
    on(`change:${vitality}_points`, (eventInfo) => {

        var value = parseInt(eventInfo.newValue) || 0;
        value = (value < 0) ? 0 : value;
        const maxval=`${vitality}_points_max`;
        getAttrs([maxval], function(v) {

            const max_val = parseInt(v[maxval]) || 0;	
            const low_val=2;
            var update={};

            update[`color_${vitality}`]='normal';
            update[`${vitality}_modifier`]=0;

            if (value > max_val) {
                update[`color_${vitality}`]='extra';
            }
            if (value <= low_val) {
                update[`color_${vitality}`]='low';
                update[`${vitality}_modifier`]=1;
             }
            if (value == 0) {
                update[`color_${vitality}`]='zero';
                update[`${vitality}_modifier`]=2;
            }
            update[`${vitality}_points`]=value;

            setAttrs(update, {silent:false}, ()=>{
               console.info('update',update);
            });
        });
    });
 });

 _skill_percent.forEach(_skill_sec_percent => {
    const section=_skill_sec_percent.section;
    const field=_skill_sec_percent.field;
    const input=`repeating_${section}_${field}`;
    const skillspan=`repeating_${section}_skill_span`;
    on(`change:repeating_${section}:${field}`, () => {
        getAttrs([input], (value) => {
            const SkillPercent = value[`repeating_${section}_${field}`];
            const isInLinkingForm=isValidLinkInput(SkillPercent);
            const isInNumericalForm=isSkillNumber(SkillPercent);
            const update={};
            var   skillname='';

            if (isInLinkingForm===false && isInNumericalForm===false) {
                update[input]=0;
                if (section !=='skills') {update[skillspan]=update[input];}
                setAttrs(update,{silent:true},()=>{
                  console.info('update',update);
                });
            }

            if (isInNumericalForm){
                const number= setMinMax(SkillPercent);
                update[input]=number;
                if (section !=='skills') {update[skillspan]=update[input];}
                setAttrs(update,{silent:true},()=>{
                  console.info('update',update);
                });
            }

            if (isInLinkingForm) {
                const skill=cleanedSkill(SkillPercent);
                skillname=skill;
                getAttrs([`${skillname}`], (values) => {
                    const number= setMinMax(values[skillname]);
                    if (section !=='skills') {update[skillspan]=number;}
                    setAttrs(update,{silent:true},()=>{
                        console.info('update',update);
                    });
                });
            };
        });
    });
});     

_only_number.forEach(_sect_object => {
    const section=_sect_object.section;
    const fields=_sect_object.fields;
    if (Array.isArray(fields)) {
        fields.forEach(field => {
            const input=`repeating_${section}_${field}`;
            on(`change:repeating_${section}:${field}`, () => {
                getAttrs([input], (value) => {
                    const update={};
                    const number=setMinMax(value[input]);
                    update[input]=number;
                    setAttrs(update,{silent:true},()=>{
                        console.info('update',update);
                    });
                });
            });
        });
    };
});



_number_or_roll.forEach(_sect_object => {
    const section=_sect_object.section;
    const fields=_sect_object.fields;

    if (Array.isArray(fields)) {
        fields.forEach(field => {
            const input=`repeating_${section}_${field}`;
            on(`change:repeating_${section}:${field}`, () => {
                getAttrs([input], (value) => {
                    const update={};
                    const number=parseRoll(value[input]);
                    update[input]=number;
                    setAttrs(update,{silent:true},()=>{
                        console.info('update',update);
                    });
                });
            });
        });
    };
});

arrays['_sanity_loss'].forEach(sanity => {
    on(`change:${sanity}`, () => {
        getAttrs([`${sanity}`], (v) => {
            const value= parseRoll(v[sanity]);
            const update={};
            update[sanity]=value;
            setAttrs(update, {silent:true}, () => {
               console.info('update',update);
               console.info(`Sanity points updated`); 
            });
        });    
    });
});

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
               console.info('update',update);
               console.log('Shotgun or Blast Radius updated');

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
               console.info('update',update);
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
        console.info('update',update);
        console.log('Repeating Skills updated on change');
	});
});

Object.entries(_repeating_sections).forEach(([attrName,section]) => {
	on(`change:repeating_${section}`, (eventInfo) => {
		const id = eventInfo.sourceAttribute.split('_')[2];
		changeRepeatingRolls(section,attrName,id);
	});
});



// new function to compute san point max
on(`change:unnatural`, function(eventInfo) {
    const newvalue = setMinMax(parseInt(eventInfo.newValue) || 0,0,99);
    update={sanity_points_max: 99-newvalue, unnatural: newvalue};

    setAttrs(update,{silent:true},()=>{
        console.info('update',update);
        console.log('Sanity points updated');
    });
});

arrays['_stats'].forEach(stat => {
    const stat_score = `${stat}_score`;

    const _sanity_array=['sanity_points', 'breaking_point','initial_san'];
    const _initial_hp=['initial_str','initial_con','initial_hp'];
    on(`change:${stat_score}`, () => {
        var update = {};
        getAttrs(arrays['_stats'].concat(_sanity_array,_initial_hp,['unnatural'],arrays['_stats'].map(el=> `${el}_score`)), function(values) {
            const stat_score_value=parseInt(values[stat_score],10) || 0;
            statInfo=setStatScore(stat_score_value,stat);
            InitializationFlags=getInitializationFlags(statInfo,values)

            setInitialPower(update,values,statInfo,InitializationFlags);
            setInitialHp(update,values,statInfo,InitializationFlags)
            update[stat]=statInfo[`stat`];
            update[stat_score]=statInfo[`score`];
            Object.assign(update,InitializationFlags);
            updateSkillSpanOnChange(statInfo[`name`],statInfo[`score`],update,'Stats')
        });
    });
});

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
        if (value !== _initial_skills[skill]) { update[`${skill}_visible`]=`visible`; }
        updateSkillSpanOnChange(skill,value,update,'Skills')				
    });
});

on(`change:sanity_points`, () => {
    updatebreakingpoints();
});

on(`change:breaking_point`, () => { 
    getAttrs(['breaking_point'], (values)=> {
        const breaking_point = Math.max(0,parseInt(values.breaking_point, 10) || 0);
        const update = {};
        update['breaking_point_reset'] = breaking_point;
        update['breaking_point']=breaking_point;
        setAttrs(update, {silent:true}, () => { 
        });
    });
});

on(`change:breaking_point_reset`,(eventInfo)=>{
    const breaking_point_reset = parseInt(eventInfo.newValue, 10) || 0;
    getAttrs(['breaking_point_reset'], (values)=> {
        const breaking_point_reset = parseInt(values.breaking_point_reset, 10) || 0;

        const update = {};
        update['breaking_point_reset'] = Math.min(Math.max(0,breaking_point_reset),99);
        setAttrs(update, {silent:true}, () => {
            console.info('update',update);
        });
    });
});

on(`clicked:breaking_point_resets`, () => {
    resetBreakingPoints();
});

on(`change:global_modifier_number`, () => {
    getAttrs(['global_modifier_number'], (values) => {
        const modifier = parseInt(values['global_modifier_number']) || 0;
        const update = {global_modifier_number:modifier};
        setAttrs(update, {silent:true}, () => {
            console.info('update',update);
        });
    });
});

on(`change:repeating_skills remove:repeating_skills`, () => {
    update_additionalskills();
});

on(`change:repeating_weapons:armor_piercing`, () => {  
    getAttrs(['repeating_weapons_armor_piercing'], (values) => {
        const update = {};
        update_armor_piercing(values.repeating_weapons_armor_piercing,update);
        setAttrs(update, {silent:true}, () => {
            console.info('update',update);
        });    
    });
});
on(`change:repeating_weapons:ammo_total remove:repeating_weapons`, (values) => {
    const ammo_total = Math.max(0,parseInt(values.newValue)||0);
    const update = {};
    update[`repeating_weapons_ammo_total`] = ammo_total;
    update[`repeating_weapons_ammo`] = ammo_total;
    update[`repeating_weapons_hasammo`] = ammo_total > 0 ? 'active' : '0';

    setAttrs(update, {silent:true}, () => {
        console.info('update',update);
    });
});

on(`change:repeating_weapons:ammo`, (values) => {
    const ammo = Math.max(0,parseInt(values.newValue)||0);
    const update = {};
    update[`repeating_weapons_ammo`] = ammo;
    setAttrs(update, {silent:true}, () => {
        console.info('update',update)
    });
});


_bond_attributes.forEach(attrName => {
    on(`change:repeating_bonds:${attrName}`, (eventInfo) => {
        const update={};
        getAttrs(_score_info, (values) => {
            updatebondscore(values,update,attrName==='score');
            setAttrs(update, {silent:true}, () => {
                console.log('Bond color updated');
                console.info(update);
            });
        });
    });
});

on(`change:repeating_rituals`, (eventinfo) => {
    const id = eventinfo.sourceAttribute.split('_')[2];
    ritual_rolls_info(`repeating_rituals_${id}`);
});

arrays['_adaptation'].forEach(adaptation => {
	on(`change:${adaptation}`, () => {
		getAttrs([adaptation], (values) => {
			console.log('values:',values);
			const value=parseInt(values[adaptation]) || 0;
			console.log('adaptation changed:'+value);
			const update={};
			update[`${adaptation}_adapted`]= value===2 ? 1 : 0;
			setAttrs(update, {silent:true}, () => {
               console.info('update',update);
               update[`${adaptation}_adapted`] == 1 ? console.log(`${adaptation} adapted`) : console.log(`${adaptation} not adapted`);
			});
		});
	});
});	

on(`change:advanced_weapons`,()=>{
    updateadvancedweapons()
});

on(`change:useKey`, () => {
    getAttrs(['useKey'], (values) => {
        const val = values['useKey'];
        const update = {use_global_modifier:'inactive'};
        if (val === 'global') {update['use_global_modifier']='active'};
        console.log(`useKey: ${val}`);


        setAttrs(update, {silent:true}, () => {
            console.info('update',update);
        });
    });
}); 
// === Update repeating skills on change
on(`change:repeating_skills:rank`, function(eventInfo) {
    const value = parseInt(eventInfo.newValue) || 0;
    if (value < 0) {
        setAttributes({[eventInfo.sourceAttribute]: 0}, false);
    }
    if (value > 99) {
        setAttributes({[eventInfo.sourceAttribute]: 99}, false);
    }
});