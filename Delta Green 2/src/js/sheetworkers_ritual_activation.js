
const paythecost=(sanity_loss,other_costs,fraction=1) => {
        // lower sanity loss (not half)
        
        rollSan=  `${prefix_ritualloss_roll}`;
        //used for before the roll
        var hasCosts = {};
        CurrentValues.forEach((attrName) => {
            const current=parseInt(other_costs[attrName]) || 0;
            var price= other_costs[attrName+'_cost'];
            if (attrName !== 'sanity_points') {               
                rollSan += ` {{${attrName}_cost=[[floor(${price}/${fraction})]]}}`
                rollSan += ` {{${attrName}=${current}}}`
                if (price !== 0 && price !== '0') {
                    rollSan += ` {{has_${attrName}=1}}`
                    hasCosts[attrName] = 1;
                } else {
                    
                };
            }
        });

        rollSan += ` {{sanity_points_cost=[[${sanity_loss}]]}}`;
        rollSan += ` {{sanity_points=${other_costs.sanity_points}}}`;
        rollSan += ` {{has_sanity_points=1}}`;

        hasCosts['sanity_points'] = 1;

        startRoll(rollSan, (results) => {
            const newroll = {};
            const update = {};

            CurrentValues.forEach((attrName) => {
                const attrCost=attrName+'_cost';
                const old_value=parseInt(other_costs[attrName]) || 0;
                const cost = parseInt(results.results[attrCost].result) || 0;
                
                const new_value = Math.max(0,old_value - cost);
                newroll[attrCost] = new_value;
                if (hasCosts.hasOwnProperty(attrName)) {
                    update[attrName] = new_value;
                }
            });
            
            finishRoll(results.rollId,newroll);

            setAttrs(update, {silent:true}, () => {
               console.info('update',update);
               updatebreakingpoints() // I need to update the breaking points in the callback

            });
        });

};

const acceptfailure=(sanity_loss_success,other_costs) => {
    paythecost(sanity_loss_success,other_costs,2);
};

const forceconnection=(sanity_loss_failure,other_costs) => {
    other_costs['power_score'] = other_costs['power_score']+1 ;
    paythecost(sanity_loss_failure,other_costs,1);
};

const name_and_param=(repsecid,attrName, _parameters, _input_names) => {
    _input_names[attrName] = `${repsecid}_${attrName}`;
    
    _parameters.push(_input_names[attrName]);
    
};

const setRitualCostParametersAndInputNames = (repsecid, _parameters, _input_names) => {

    RitualCosts.forEach((attrName) => {
        name_and_param(repsecid,attrName, _parameters, _input_names);
        
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

    // general informations
    
    RitualRolls.forEach((attrName) => {
        name_and_param(repsecid,attrName, _parameters, _input_names);
    });    

    setRitualCostParametersAndInputNames(repsecid, _parameters, _input_names);

    setRitualDamageParametersAndInputNames(repsecid, _parameters, _input_names);
    
};

const getOtherCosts = (other_costs,values,names,array) => {   
    array.forEach((attrName) => {
			other_costs[attrName]=(values[names[attrName]]    != '') ? values[names[attrName]] : 0;;
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

const ritual_power_action = (character_id,repsecid,other_costs) => {
    const const_button_part = '](~'+character_id+'|';
    const prefix_power_reaction='{{power_button=[';
    const suffix_power_reaction = const_button_part+'power)}}';
    return prefix_power_reaction+'^{power}'+suffix_power_reaction;
}
/*

const ritual_attack_or_heal_action = (character_id,repsecid,other_costs,heal_or_attack='attack') => {
    const value_target=heal_or_attack.replace('_damage','').replace('_lethality_percent','');
    const value = real_damage(other_costs,value_target);
    if (value === '') {return '';}
    const const_button_part = '](~'+character_id+'|'+repsecid+'_';
    const target_stat=name_to_shorthand(other_costs[`${value_target}_target_stat`]);
    
    const prefix_button = `{{${heal_or_attack}_button=[`;
    const suffix_button = target_stat+const_button_part+heal_or_attack+'-action)}}';
    return prefix_button+value+suffix_button;
};


const ritual_attack_action = (character_id,repsecid,other_costs) => {
    var ritual_rolls='';
    ritual_rolls+= ritual_attack_or_heal_action(character_id,repsecid,other_costs,'attack_damage');
    ritual_rolls+= ritual_attack_or_heal_action(character_id,repsecid,other_costs,'attack_lethality_percent');
    return ritual_rolls;
};
const ritual_heal_action = (character_id,repsecid,other_costs) => {
    var ritual_rolls='';
    ritual_rolls+= ritual_attack_or_heal_action(character_id,repsecid,other_costs,'heal_damage');
    ritual_rolls+= ritual_attack_or_heal_action(character_id,repsecid,other_costs,'heal_lethality_percent');
    return ritual_rolls;
};
*/


const real_damage = (other_costs,heal_or_damage,damage_type) => {
    if (damage_type === 'lethality_percent') {
        return `${setMinMax(other_costs[`${heal_or_damage}_${damage_type}_amount`])}% `;
    } else if (damage_type === 'damage') {
        return parseRoll(other_costs[`${heal_or_damage}_${damage_type}_amount`]);
    }
    return '';
};

const ritual_attack_or_heal_action = (character_id,repsecid,other_costs,heal_or_attack,damage_type) => {
    const value = real_damage(other_costs,heal_or_attack,damage_type);
    if (value === 0) {return '';}
    const const_button_part = '](~'+character_id+'|'+repsecid+'_';
    const target_stat=name_to_shorthand(other_costs[`${heal_or_attack}_target_stat`]);
    
    const prefix_button = `{{${heal_or_attack}_button=[`;
    const suffix_button = ` ${target_stat}${const_button_part}${heal_or_attack}_${damage_type}-action)}}`;
    return prefix_button+value+suffix_button;
};


const ritual_attack_action = (character_id,repsecid,other_costs,damage_type) => {
    return ritual_attack_or_heal_action(character_id,repsecid,other_costs,'attack',damage_type);
};
const ritual_heal_action = (character_id,repsecid,other_costs,damage_type) => {
    return ritual_attack_or_heal_action(character_id,repsecid,other_costs,'heal',damage_type);
};






const prepare_ritual_rolls = (other_costs,values,names) => {
    var localString='';  
    const attack_type = other_costs['attack_isLethal']
    const heal_type   = other_costs['heal_isLethal'] 
    localString += ritual_attack_action(values[names['character_id']],names['repsecid'],other_costs,attack_type);
    localString += ritual_heal_action(values[names['character_id']],names['repsecid'],other_costs,heal_type);   

    if (values[names['power_reaction']] === 'active') {
        localString += ritual_power_action(values[names['character_id']],names['repsecid']);
    }

    return localString;
};

const clicked_repeating_rituals = (parameters,names,queryModifier) => {
    getAttrs(parameters, (values) => {
        // cost of the ritual
        const other_costs={};
        getOtherCosts(other_costs,values,names,RitualCosts);
        getOtherCosts(other_costs,values,names,RitualDamages);
        getOtherCosts(other_costs,values,names,RitualHeals);

        //----------------------------------------------------------------------------------------------
        //---------Not used for the roll, they are always zero. Ask Shane if he wants it----------------
        //const wp_mod=check_for_wp_modifiers(values,rollName);
        const low_willpower  = 0 //wp_mod.low_willpower;
        const zero_willpower = 0 //wp_mod.zero_willpower;
        //----------------------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------------------
        // what is needed to roll
        const rating = values[names['skill_span']];
        const sanity_loss_success = other_costs['sanity_loss_success'];
        const sanity_loss_failure = other_costs['sanity_loss_failure'];
        
        // info ritual
        const ritual_name = values[names['name']];
        const description = values[names['description']];

        var rollString=`${prefix_ritual_roll} {{header=${ritual_name}}}`;
        rollString +=` {{subheader=${rating}}}`;
        rollString +=` {{rating=[[${rating}]]}}`;
        rollString +=` {{queryModifier=${queryModifier}}}`;
        
        if (description !=='') {rollString += `{{description=${description}}}`;}
        
        rollString += `{{sanity_loss_success=${sanity_loss_success}}}`;
        rollString += `{{sanity_loss_failure=${sanity_loss_failure}}}`;
        
        rollString += `{{zero_willpower=[[${zero_willpower}]]}}`;
        rollString += `{{low_willpower=[[${low_willpower}]]}}`;

        var hasOtherCosts = false;
        var costString = '';    
        Object.entries(other_costs).forEach(([key, value]) => {
            if (value != '' && value!= '0') {costString += `{{${key}=${value}}}`; hasOtherCosts = true;}
        });

        rollString += costString;

        rollString += `{{hasCost=[[0]]}}`;
        rollString += prepare_ritual_rolls(other_costs,values,names);

        const flawed_ritual = values[names['flawed_ritual']] === 'active' ? 1 : 0; 
        if (flawed_ritual === 1) {rollString += `{{flawed_ritual=${flawed_ritual}}}`;}  
        
        rollString += `{{modifier=[[${queryModifier}]]}}`;

        const character_id=values['character_id'];
        const repsecid=names['repsecid']; // ritualid is the repeating section id, not a parameter

        rollString += `{{pay_cost=[^{pay the cost}](~${character_id}|${repsecid}_pay_cost)}}`;
        rollString += `{{accept_failure=[^{accept}](~${character_id}|${repsecid}_accept_failure)}}`;
        rollString += `{{reject_failure=[^{reject}](~${character_id}|${repsecid}_force_connection)}}`;
        /// This are the only quantities than I need to manupulate
        rollString += `{{isSuccess=[[0]]}}`;

        startRoll(rollString, (results) => {
            const activation_rating = parseInt(results.results.rating.result) || 0;
            const dice = parseInt(results.results.dice.result) || 0;    
            const _flawed_ritual = (flawed_ritual ===1) ? -20 : 0;
            const _modifier = correct_modifier((parseInt(results.results.modifier.result) || 0)+flawed_ritual,low_willpower);
            const _rating = correct_rating(activation_rating,_modifier);
            const hasCost = hasOtherCosts ? 1 : 0;
            const outcome=check_success(dice,_rating);

            newroll = {
                isSuccess: outcome.isSuccess,
                IsCritical: outcome.IsCritical,
                dice: dice,
                modifier: _modifier,
                hasCost: hasCost,
                flawed_ritual: _flawed_ritual,
                low_willpower: low_willpower,
                zero_willpower: zero_willpower,
            };

            finishRoll(results.rollId,newroll);
        });
    });
};

const empty_to_zero=(value) => {
    return (value !== '' || value !=='0') ? value : 0;
}

const updateRitualInfoOnOpen = () => {
    getSectionIDs(`rituals`, (ids) => {
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

        const complexity = values[_names['complexity']];
        const sanity_loss_success = empty_to_zero(values[_names['sanity_loss_success']]);
        const sanity_loss_failure = empty_to_zero(values[_names['sanity_loss_failure']]);
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
        if (sanity_loss_success != 0) {costs_text += `${sanity_loss_success}SAN/`;}
        costs_text += `${sanity_loss_failure}SAN`;

        update[`${repsecid}_cost_text`] = `${String(costs_text).toUpperCase()}`;

        setAttrs(update, {silent:true}, () => {
               console.info('update',update);
        });
    });
};

        