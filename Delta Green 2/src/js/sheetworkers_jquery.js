
on('change:useKey', () => {
    getAttrs(['useKey'], (values) => {
        const val = values['useKey'];
        const update = {use_global_modifier:'inactive'};
        if (val === 'global') {update['use_global_modifier']='active'};
        console.log(`useKey: ${val}`);
        

        setAttrs(update, {silent:true}, () => {
                
        });
    });
}); 

on('change:global_modifier_number', () => {
    getAttrs(['global_modifier_number'], (values) => {
        const modifier = parseInt(values['global_modifier_number']) || 0;
        const update = {global_modifier_number:modifier};
        setAttrs(update, {silent:true}, () => {
            
        });
    });
});

on('clicked:reset_global_modifier', () => {
    const update={'global_modifier_number':''};
    setAttrs(update, {silent:true}, () => {
        
    });
});

usedModifier = (e,callback) => {
    var queryModifier = 0;
    getAttrs(['useKey','global_modifier_number'], (values) => {
        const useKey = values['useKey'];
        
        
        const globalModifier = parseInt(values['global_modifier_number']) || 0;
        if (useKey === 'global') {
            queryModifier = globalModifier;
        }
        if (e.altKey && useKey === 'alt') {queryModifier=_queryModifier;}
        if (e.ctrlKey && useKey === 'ctrl') {queryModifier=_queryModifier;}
        if (e.metaKey && useKey === 'meta') {queryModifier=_queryModifier;}
        if (e.shiftKey && useKey === 'shift') {queryModifier=_queryModifier;}
        if (useKey === 'none') {queryModifier=_queryModifier;}
        console.log(`queryModifier: ${queryModifier}`);
        callback(queryModifier);
    });
}

$20(selector).on('click', e => {
        
        const roll = e.htmlAttributes.name.match(/^attr_(.*)_r$/)[1];
        const _roll = (roll === 'sanity_points') ? 'sanity' : roll;
        usedModifier(e,(queryModifier) =>{  
            console.log(`queryModifier: ${queryModifier}`);
            

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

            rollwithmodifiers(rollString,roll,queryModifier,additionalParameters);
        });

});

$20(sanity_selector).on('click', e => {
    
    const _input_name={};
    var _parameters = [];

    _input_name['success'] = 'sanity_loss_success';
    _parameters.push(_input_name['success']);
    _input_name['failure'] = 'sanity_loss_failure';
    _parameters.push(_input_name['failure']);

    getAttrs(['character_id','sanity_loss_success','sanity_loss_failure', 
              'sanity_type','violence_adapted','helplessness_adapted'], (values) => {
        const charid=values['character_id'];
        const sanity_loss_success=values['sanity_loss_success'] !== '' ? values['sanity_loss_success'] : 0;
        const sanity_loss_failure=values['sanity_loss_failure'] !== '' ? values['sanity_loss_failure'] : 1;
        const sanity_loss_type=values['sanity_type'];
        console.log(sanity_loss_type);
        var rollString = `${prefix_sanity_roll} {{header=@{character_name}}}`;
        rollString += ` {{sanity_type=^{@{sanity_type}}}}`;
        rollString += ` {{description=@{npc_description}}}`;
        rollString += ` {{success_roll=[${sanity_loss_success}](~${charid}|sanity_loss_success)}}`;
        rollString += ` {{failure_roll=[${sanity_loss_failure}](~${charid}|sanity_loss_failure)}}`;

        
        console.info(sanity_loss_success);
        console.info(sanity_loss_failure);
        console.info('min roll:',minRoll(sanity_loss_success));
        console.info('max roll:',maxRoll(sanity_loss_failure));
        startRoll(rollString,results =>{
            finishRoll(results.rollId)
        });
    });
});

$20('button.repeating_roll').on('click', e => {
    
    const id = e.htmlAttributes.value;
    const section = _repeating_sections[e.htmlAttributes.name.split('_')[1]];
    
    
    usedModifier(e,(queryModifier) => {
        var _input_names = {};
        var _parameters = [];
        setRepeatingParametersAndInputNames(section, id, _parameters, _input_names)

        
        

        clicked_repeating_actions(section, _parameters, _input_names, queryModifier);
    });
});

