const updateRepeatingRollsonOpenJQ = () => {

    Object.entries(_repeating_sections).forEach(([element,section])=> {
        getSectionIDs(section, function(idarray) {
            var update={};
            console.log('section: '+section+' element: '+element+' idarray: '+idarray);
            idarray.forEach(id => {
                update[`repeating_${section}_${id}_${element}_r`] = `${id}`;
            });				
            console.info('Value of update inside repeating rollUpdate',update);
            setAttrs(update, {silent:true}, () => {
                console.log('Repeating Rolls updated');
                console.info('update',update);
            });
            
        });
    });

};


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
                const rollString=`${prefix_roll} ${_header} {{subheader=@{${roll}}}} `;
                rollwithmodifiers(rollString,roll,queryModifier);
            });
        }else{
            const caps = (_roll === 'humint' || _roll === 'sigint') ? _roll.toUpperCase() : _roll.replace('_',' ')
            _header = `{{header=^{${caps.replace('_',' ')}}}}`;
            const rollString=`${prefix_roll} ${_header} {{subheader=@{${roll}}}} `;

             rollwithmodifiers(rollString,roll,queryModifier);
        
        }
        

});

$20('button.repeating_roll').on('click', e => {
console.log(e);
const id = e.htmlAttributes.value;
const section = _repeating_sections[e.htmlAttributes.name.split('_')[1]];
const hasmodifiers = (e.shiftKey) ? true : false;
console.info(`hasmodifiers:`, hasmodifiers);
const queryModifier = (hasmodifiers) ? _queryModifier : '0';

var _header = ``;
var _rank =``
var _input_names = {};
var _parameters =[`repeating_${section}_${id}_name`];
// Common for all rolls, modifiers
_parameters.push(`willpower_points`);
_parameters.push(`low_will_power`);
_parameters.push(`zero_will_power`);

_input_names[`name`]=`repeating_${section}_${id}_name`;
//skill dependent parameters
if (section==='skills'){
    _input_names[`rank`]=`repeating_${section}_${id}_rank`;	
    _input_names[`fail`]=`repeating_${section}_${id}_fail`;
    _parameters.push(`repeating_${section}_${id}_rank`);
    _parameters.push(`repeating_${section}_${id}_fail`);
    clicked_repeating_skills(_parameters,_input_names,queryModifier);
//bond dependent parameters
}else if (section==='bonds'){
    _parameters.push(`repeating_${section}_${id}_score`);
    _parameters.push(`repeating_${section}_${id}_wp_points`);
    _parameters.push(`repeating_${section}_${id}_san_points`);
//special training dependent parameters
}else if (section==='special'){
    _parameters.push(`repeating_${section}_${id}_skill_or_stat_used`);
}else{	
    console.error(`Section ${section} not found`);
}

console.log(`parameters: ${_parameters}`);

});

