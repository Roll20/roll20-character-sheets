
const selector='button.roll';
    
$20(selector).on('click', e => {
        var _header = ``;
        console.log(e);
        const roll = e.htmlAttributes.name.match(/^attr_(.*)_r$/)[1];
        const _roll = (roll === 'sanity_points') ? 'sanity' : roll;

        const hasmodifiers = (e.shiftKey) ? true : false;
        console.info(`hasmodifiers:`, hasmodifiers);
        const queryModifier = (hasmodifiers) ? _queryModifier : '0';
        
        console.info(`roll: ${roll} _roll: ${_roll}`);
        if (arrays[`_editable_skills`].includes(_roll)){
            console.log('editable skill');
            const prefix_skill=_roll.slice(0,-2);
            console.log(`prefix: ${prefix_skill}`);
            getAttrs([`${_roll}_name`], (values) => {
                _header = `{{header=^{${prefix_skill.replace('_',' ')}} (${values[`${_roll}_name`]})}}`;
            
                console.log(`header: ${_header}`);
                const rollString=`${prefix_skill_roll} ${_header} {{subheader=@{${roll}}}} `;
                rollwithmodifiers(rollString,roll,queryModifier);
            });
        }else{
            const caps = (_roll === 'humint' || _roll === 'sigint') ? _roll.toUpperCase() : _roll.replace('_',' ')
            _header = `{{header=^{${caps.replace('_',' ')}}}}`;
            const rollString=`${prefix_skill_roll} ${_header} {{subheader=@{${roll}}}} `;

             rollwithmodifiers(rollString,roll,queryModifier);
        
        }
        

});


$20('button.repeating_roll').on('click', e => {
    console.log(e);
    const id = e.htmlAttributes.value;
    const section = _repeating_sections[e.htmlAttributes.name.split('_')[1]];
    console.log(`in button rep rolls section: ${section})`);
    const hasmodifiers = (e.shiftKey) ? true : false;
    console.info(`hasmodifiers:`, hasmodifiers);
    const queryModifier = (hasmodifiers) ? _queryModifier : '0';

    var _input_names = {};
    var _parameters = [];
    setRepeatingParametersAndInputNames(section, id, _parameters, _input_names)

    console.info(`parameters: ${_parameters}`);
    console.info(`input names: ${_input_names}`);

    clicked_repeating_actions(section, _parameters, _input_names, queryModifier);
});

