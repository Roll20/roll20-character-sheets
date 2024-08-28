
const RitualCosts   = ['sanity_loss_low','sanity_loss_high',
    'willpower_points_cost','power_score_cost','hit_points_cost',
    'strength_score_cost','constitution_score_cost',
    'dexterity_score_cost','intelligence_score_cost',
    'charisma_score_cost'];

const CurrentValues = ['sanity_points',
    'willpower_points','power_score','hit_points',
    'strength_score','constitution_score',
    'dexterity_score','intelligence_score',
    'charisma_score'];

const RitualRolls   = ['name','skill_span','unnatural_gain',
    'study_time','sanity_loss_for_learning','activation_time',
    'description','complexity','flawed_ritual'];

const RitualDamages = ['damage_target_stat','damage_amount','damage_isLethal'];
const RitualHeals   = ['health_target_stat','health_amount','health_isLethal'];

const paythecost=(sanity_loss,other_costs,fraction=1) => {
        // lower sanity loss (not half)
        console.info('pay the cost',other_costs);   
        rollSan=  `${prefix_ritualloss_roll}`;
        //used for before the roll
        var hasCosts = {};
        CurrentValues.forEach((attrName) => {
            const current=parseInt(other_costs[attrName]) || 0;
            var price= other_costs[attrName+'_cost'];
            if (attrName !== 'sanity_points') {
                if (price === '1' && fraction === 2) {price=0;}                
                rollSan += ` {{${attrName}_cost=[[${price}/${fraction}]]}}`
                rollSan += ` {{${attrName}=${current}}}`
                if (price !== 0 && price !== '0') {
                    rollSan += ` {{has_${attrName}=1}}`
                    hasCosts[attrName] = 1;
                } else {
                    console.log('no cost for',attrName);
                };
            }
        });

        rollSan += ` {{sanity_points_cost=[[${sanity_loss}]]}}`;
        rollSan += ` {{sanity_points=${other_costs.sanity_points}}}`;
        rollSan += ` {{has_sanity_points=1}}`;

        hasCosts['sanity_points'] = 1;


        console.info('roll for san cost:',rollSan);
        startRoll(rollSan, (results) => {
            const newroll = {};
            const update = {};

            CurrentValues.forEach((attrName) => {
                const attrCost=attrName+'_cost';
                const old_value=parseInt(other_costs[attrName]) || 0;
                const cost = parseInt(results.results[attrCost].result) || 0;
                console.log(`${attrCost}: ${cost}`);
                const new_value = Math.max(0,old_value - cost);
                newroll[attrCost] = new_value;
                if (hasCosts.hasOwnProperty(attrName)) {
                    update[attrName] = new_value;
                }
            });
            
            finishRoll(results.rollId,newroll);

            console.info('update',update);
            console.info('newroll',update);

            setAttrs(update, {silent:true}, () => {
                updatebreakingpoints() // I need to update the breaking points in the callback
                console.log('sanity points updated');
                console.info(update);
            });
        });

};

const acceptfailure=(sanity_loss_low,other_costs) => {
    paythecost(sanity_loss_low,other_costs,2);
};

const forceconnection=(sanity_loss_high,other_costs) => {
    other_costs['power_score'] = other_costs['power_score']+1 ;
    paythecost(sanity_loss_high,other_costs,1);
};

const name_and_param=(repsecid,attrName, _parameters, _input_names) => {
    _input_names[attrName] = `${repsecid}_${attrName}`;
    console.log(_input_names[attrName]);
    _parameters.push(_input_names[attrName]);
    console.log(_parameters);
};

const general_manipulation=(repsecid, _parameters, _input_names) => {
    // general informations to manupulate results
    _input_names['charname'] = 'character_name';
    _parameters.push(_input_names['charname']);
    _input_names['charid'] = 'character_id';
    _parameters.push(_input_names['charid']);
    _input_names['ritualid'] = repsecid;
};

const setRitualCostParametersAndInputNames = (repsecid, _parameters, _input_names) => {
    console.info('RitualCosts',RitualCosts);
    console.info('type of _parameters',typeof(_parameters));
    console.info('parameters',_parameters);
    RitualCosts.forEach((attrName) => {
        name_and_param(repsecid,attrName, _parameters, _input_names);
        console.log(attrName+': '+_parameters[_input_names[attrName]]);
    });
};

const setRitualDamageParametersAndInputNames = (repsecid, _parameters, _input_names) => {
    
    RitualDamages.forEach((attrName) => {
        name_and_param(repsecid,attrName, _parameters, _input_names);
    });
        
    RitualHeals.forEach((attrName) => {
        name_and_param(repsecid,attrName, _parameters, _input_names);
    });
};



const setRitualParametersAndInputNames = (repsecid, _parameters, _input_names) => {
    
    console.info('Get general informations');
    general_manipulation(repsecid, _parameters, _input_names);
    console.info(_parameters);
    
    // general informations
    console.info('Get RitualRolls');
    RitualRolls.forEach((attrName) => {
        name_and_param(repsecid,attrName, _parameters, _input_names);
    });    
    console.info(_parameters);

    console.info('Get RitualCosts');
    setRitualCostParametersAndInputNames(repsecid, _parameters, _input_names);
    console.info(_parameters);
    console.info('Get RitualDamages');
    setRitualDamageParametersAndInputNames(repsecid, _parameters, _input_names);
    console.log(_parameters);
};

const getOtherCosts = (other_costs,values,names,array) => {   
    array.forEach((element) => {
			other_costs[element]=(values[names[element]]    != '') ? values[names[element]] : 0;;
    });
};

const name_to_shorthand = (name) => {
    if (name === 'willpower_points') {return 'WP';}
    if (name === 'hit_points') {return 'HP';}
    if (name === 'strength_score') {return 'STR';}
    if (name === 'constitution_score') {return 'CON';}
    if (name === 'dexterity_score') {return 'DEX';}
    if (name === 'intelligence_score') {return 'INT';}
    if (name === 'charisma_score') {return 'CHA';}
    if (name === 'power_score') {return 'POW';}
};
const prepare_ritual_rolls = (other_costs,values,names) => {
    var localString='';  
    const damage_target_stat=name_to_shorthand(other_costs.damage_target_stat);
    const health_target_stat=name_to_shorthand(other_costs.health_target_stat);
    const damage_amount = other_costs.damage_amount;
    const health_amount = other_costs.health_amount;
    const isLethalAttack=((parseInt(damage_amount,10) || 0 !==0) && other_costs.damage_isLethal=='lethal');
    const isNormalAttack=(damage_amount !=='' && other_costs.damage_isLethal=='normal');
    const isLethalHeal=((parseInt(health_amount,10) || 0 !==0) && other_costs.health_isLethal=='lethal');
    const isNormalHeal=(health_amount !=='' && other_costs.health_isLethal=='normal;');
    var damage_button = '';
    var heal_button = '';
    const const_button_part = '](~'+values[names['charid']]+'|'+names['repsecid']+'_';
    const prefix_damage_button = '{{damage_button=[';
    const prefix_heal_button = '{{heal_button=[';
    const prefix_power_reaction='{{power_reaction=[';
    const suffix_damage_button = damage_target_stat+const_button_part+'damage_button)}}';
    const suffix_heal_button = health_target_stat+const_button_part+'heal_button)}}';
    const suffix_power_reaction = const_button_part+'power_reaction)}}';
    const power_reaction_button = prefix_power_reaction+'^{POWER}'+suffix_power_reaction;
    if(isLethalAttack){
        damage_button += prefix_damage_button
        damage_button += parseInt(damage_amount,10)+'% '
        damage_button += suffix_damage_button
    }
    if(isNormalAttack){
        damage_button += prefix_damage_button
        damage_button += damage_amount.toUpperCase()+ ' ';
        damage_button += suffix_damage_button
    }

    if(isLethalHeal){
        heal_button += prefix_heal_button
        heal_button += parseInt(health_amount,10)+'% ';
        heal_button += suffix_heal_button
    }
    if(isNormalHeal){
        heal_button += prefix_heal_button
        heal_button += health_amount.toUpperCase()+ ' ';
        heal_button += suffix_heal_button
    }
    
    localString += damage_button;
    localString += heal_button;
    
    
    const power_reaction=values[names['power_reaction']] === 'active' ? 1 : 0;
    if (power_reaction === 1) {
        localString += power_reaction_button;
    }
    
    console.log('localString',localString);


    return localString;
};

const clicked_repeating_rituals = (parameters,names,queryModifier) => {
    getAttrs(parameters, (values) => {
        // cost of the ritual
        const other_costs={};
        getOtherCosts(other_costs,values,names,RitualCosts);
        getOtherCosts(other_costs,values,names,RitualDamages);
        getOtherCosts(other_costs,values,names,RitualHeals);

        // what is needed to roll
        const rating = values[names['skill_span']];
        const sanity_loss_low = other_costs['sanity_loss_low'];
        const sanity_loss_high = other_costs['sanity_loss_high'];
        console.info('other_costs',other_costs);
        // info ritual
        const ritual_name = values[names['name']];
        const description = values[names['description']];

        var rollString=`${prefix_ritual_roll} {{header=${ritual_name}}}`;
        rollString +=` {{subheader=${rating}}}`;
        rollString +=` {{rating=[[${rating}]]}}`;
        rollString +=` {{queryModifier=${queryModifier}}}`;
        
        if (description !=='') {rollString += `{{description=${description}}}`;}
        
        rollString += `{{sanity_loss_low=${sanity_loss_low}}}`;
        rollString += `{{sanity_loss_high=${sanity_loss_high}}}`;
        
        var hasOtherCosts = false;
        var costString = '';    
        Object.entries(other_costs).forEach(([key, value]) => {
            if (value != '' && value!= '0') {costString += `{{${key}=${value}}}`; hasOtherCosts = true;}
        });
        
        console.info('costString',costString);
        rollString += costString;


        rollString += `{{hasCost=[[0]]}}`;
        rollString += prepare_ritual_rolls(other_costs,values,names);

        const flawed_ritual = values[names['flawed_ritual']] === 'active' ? 1 : 0; 
        rollString += `{{flawed_ritual=[[${flawed_ritual}]]}}`;
        rollString += `{{modifier=[[${queryModifier}]]}}`;

        const charid=values[names['charid']];
        const ritualid=names['ritualid']; // ritualid is the repeating section id, not a parameter

        rollString += `{{pay_cost=[^{pay the cost}](~${charid}|${ritualid}_pay_cost)}}`;
        rollString += `{{accept_failure=[^{accept}](~${charid}|${ritualid}_accept_failure)}}`;
        rollString += `{{reject_failure=[^{reject}](~${charid}|${ritualid}_force_connection)}}`;
        /// This are the only quantities than I need to manupulate
        rollString += `{{isSuccess=[[0]]}}`;

        console.info(rollString);
        console.info('parameters',parameters);
        console.info('names',names);
        

        startRoll(rollString, (results) => {
            const activation_rating = parseInt(results.results.rating.result) || 0;
            const dice = parseInt(results.results.dice.result) || 0;    
            const flawed_ritual = (results.results.flawed_ritual.result ===1) ? -20 : 0;
            const modifier = (parseInt(results.results.modifier.result) || 0)+flawed_ritual;
            const hasCost = hasOtherCosts ? 1 : 0;
            const isSuccess = (dice <= activation_rating+modifier) ? 1 : 0;

            newroll = {
                isSuccess: isSuccess,
                dice: dice,
                modifier: modifier,
                hasCost: hasCost,
            };
            console.info('newroll',newroll);    
            console.info('results',results);

            finishRoll(results.rollId,newroll);
        });
    });
};

const _ritualInfo=[
    'complexity',
    'activation_time',
    'activation_time_unit',
    'study_time',
    'study_time_unit',
    'unnatural_gain',
    'sanity_loss_for_learning',
    'willpower_points_cost',
    'power_score_cost',
    'hit_points_cost',
    'strength_score_cost',
    'constitution_score_cost',
    'dexterity_score_cost',
    'intelligence_score_cost',
    'charisma_score_cost',
    'sanity_loss_low',
    'sanity_loss_high'
]

const empty_to_zero=(value) => {
    return (value !== '' || value !=='0') ? value : 0;
}

on('change:repeating_rituals', (eventinfo) => {
    console.info(eventinfo)
    console.log('ritual info to update');
    const id = eventinfo.sourceAttribute.split('_')[2];
    ritual_rolls_info(`repeating_rituals_${id}`);
});

const updateRitualInfoOnOpen = () => {
    getSectionIDs('repeating_rituals', (ids) => {
        ids.forEach((id) => {
            ritual_rolls_info(`repeating_rituals_${id}`);
        });
    });
};


const ritual_rolls_info = (repsecid) => {
    const update = {};
    const _names={};
    const _parameters=[];

    _ritualInfo.forEach((ritual_name) => {
        _names[ritual_name] = `${repsecid}_${ritual_name}`;
        _parameters.push(_names[ritual_name]);
    });

    
    getAttrs(_parameters, (values) => {
        console.info(_parameters);
        console.info(_names);
        console.info(values);
        const complexity = values[_names['complexity']];
        const sanity_loss_low = empty_to_zero(values[_names['sanity_loss_low']]);
        const sanity_loss_high = empty_to_zero(values[_names['sanity_loss_high']]);
        const activation_time = empty_to_zero(values[_names['activation_time']])==0 ? '' : empty_to_zero(values[_names['activation_time']]); 
        const activation_time_unit = values[_names['activation_time_unit']];
        const study_time = empty_to_zero(values[_names['study_time']])==0 ? '' : empty_to_zero(values[_names['study_time']]);
        const study_time_unit = values[_names['study_time_unit']];
        const unnatural_gain = empty_to_zero(values[_names['unnatural_gain']]);
        const sanity_loss_for_learning = empty_to_zero(values[_names['sanity_loss_for_learning']]);
        const willpower_points_cost = empty_to_zero(values[_names['willpower_points_cost']]);
        const power_score_cost = empty_to_zero(values[_names['power_score_cost']]);
        const hit_points_cost = empty_to_zero(values[_names['hit_points_cost']]);
        const strength_score_cost = empty_to_zero(values[_names['strength_score_cost']]);
        const constitution_score_cost = empty_to_zero(values[_names['constitution_score_cost']]);
        const dexterity_score_cost = empty_to_zero(values[_names['dexterity_score_cost']]);
        const intelligence_score_cost = empty_to_zero(values[_names['intelligence_score_cost']]);
        const charisma_score_cost = empty_to_zero(values[_names['charisma_score_cost']]);
        console.log('ritual info to update');
        console.info(repsecid);
        console.info(values);
        // complexity text
        update[`${repsecid}_complexity_text`] = `${complexity} ritual`;
        
        // study time text
        var study_time_text = '';
        if (study_time != '') {
            study_time_text = `${study_time} ${study_time_unit}`;
        } else {
            study_time_text = study_time_unit;
        }
        update[`${repsecid}_study_time_text`] = `${study_time_text}`;
        // learning text
        var learning_cost_text = `${String(sanity_loss_for_learning).toUpperCase()}SAN`;
        if (unnatural_gain != 0) {learning_cost_text += `; ${unnatural_gain} Unnatural`;}

        
        update[`${repsecid}_study_cost_text`] = `${learning_cost_text}`;
        // activation time text
        var activation_time_text = '';
        if (activation_time != '') {
            activation_time_text = `${activation_time} ${activation_time_unit}`;
        } else {
            activation_time_text = activation_time_unit;
        }
        update[`${repsecid}_activation_time_text`] = `${String(activation_time_text).toUpperCase()}`;
        // costs text
        var costs_text = '';
        if (willpower_points_cost != 0) {costs_text += `${willpower_points_cost}WP, `;}
        if (hit_points_cost != 0) {costs_text += `${hit_points_cost}HP, `;}
        if (power_score_cost != 0) {costs_text += `${power_score_cost}POW, `;}
        if (strength_score_cost != 0) {costs_text += `${strength_score_cost}STR, `;}
        if (constitution_score_cost != 0) {costs_text += `${constitution_score_cost}CON, `;}
        if (dexterity_score_cost != 0) {costs_text += `${dexterity_score_cost}DEX, `;}
        if (intelligence_score_cost != 0) {costs_text += `${intelligence_score_cost}INT, `;}
        if (charisma_score_cost != 0) {costs_text += `${charisma_score_cost}CHA, `;}
        if (sanity_loss_low != 0) {costs_text += `${sanity_loss_low}SAN/`;}
        costs_text += `${sanity_loss_high}SAN`;

        update[`${repsecid}_cost_text`] = `${String(costs_text).toUpperCase()}`;
        
        console.log('ritual info updated');
        setAttrs(update, {silent:true}, () => {
            console.log('ritual info updated');
            console.info(update);
        });
    });
};

        