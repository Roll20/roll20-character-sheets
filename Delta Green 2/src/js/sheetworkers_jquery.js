
const selector='button.roll';
const sanity_selector='button.sanroll';

let _globalModifier = 0;

on('change:useKey', () => {
    getAttrs(['useKey'], (values) => {
        const val = values['useKey'];
        const update = {use_global_modifier:'inactive'};
        if (val === 'global') {update['use_global_modifier']='active'};
        console.log(`useKey: ${val}`);
        console.log(`use_global_modifier: ${update['use_global_modifier']}`);

        setAttrs(update, {silent:true}, () => {
                console.log(`Set global modifier ${update.use_global_modifier}`);
        });
    });
}); 

on('change:global_modifier_number', (eventInfo) => {
    getAttrs(['global_modifier_number'], (values) => {
        const modifier = parseInt(values['global_modifier_number']) || '';
        console.log(`Global modifier: ${modifier}`);
    });
});

on('clicked:reset_global_modifier', () => {
    const update={'global_modifier_number':''};
    setAttrs(update, {silent:true}, () => {
        console.log('Global modifier reset');
    });
});

usedModifier = (e,callback) => {
    var queryModifier = 0;
    getAttrs(['useKey','global_modifier_number'], (values) => {
        const useKey = values['useKey'];
        console.log(`useKey: ${useKey}`);
        console.log(`global_modifier_number: ${values['global_modifier_number']}`);
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
        console.log(e);
        const roll = e.htmlAttributes.name.match(/^attr_(.*)_r$/)[1];
        const _roll = (roll === 'sanity_points') ? 'sanity' : roll;
        usedModifier(e,(queryModifier) =>{  
            console.log(`queryModifier: ${queryModifier}`);
            console.info(`roll: ${roll} _roll: ${_roll}`);

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
    console.log(e);
    const _input_name={};
    var _parameters = [];

    _input_name['success'] = 'sanity_success';
    _parameters.push(_input_name['success']);
    _input_name['failure'] = 'sanity_failure';
    _parameters.push(_input_name['failure']);

    getAttrs(['character_id','sanity_success','sanity_failure'], (values) => {
        const charid=values['character_id'];
        const sanity_success=values['sanity_success'] !== '' ? values['sanity_success'] : 0;
        const sanity_failure=values['sanity_failure'] !== '' ? values['sanity_failure'] : 1;
        var rollString = `${prefix_sanity_roll} {{header=@{character_name}}}`;
        rollString += ` {{sanity_type=@{sanity_type}}}`;
        rollString += ` {{description=@{npc_description}}}`;
        rollString += ` {{success_roll=[${sanity_success}](~${charid}|sanity_success)}}`;
        rollString += ` {{failure_roll=[${sanity_failure}](~${charid}|sanity_failure)}}`;

        console.log(`rollString: ${rollString}`);
        console.info(sanity_success);
        console.info(sanity_failure);
        startRoll(rollString,results =>{
            finishRoll(results.rollId)
        });
    });
});

$20('button.repeating_roll').on('click', e => {
    console.log(e);
    const id = e.htmlAttributes.value;
    const section = _repeating_sections[e.htmlAttributes.name.split('_')[1]];
    console.log(`in button rep rolls section: ${section})`);
    
    usedModifier(e,(queryModifier) => {
        var _input_names = {};
        var _parameters = [];
        setRepeatingParametersAndInputNames(section, id, _parameters, _input_names)

        console.info(`parameters: ${_parameters}`);
        console.info(`input names: ${_input_names}`);

        clicked_repeating_actions(section, _parameters, _input_names, queryModifier);
    });
});

