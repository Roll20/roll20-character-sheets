
const agent_info_to_get=['character_name','character_id','hit_points', 'willpower_points', 'sanity_points', 'strength_score', 'constitution_score'
    , 'dexterity_score', 'intelligence_score', 'power_score', 'charisma_score', 'violence_adapted',
    'helplessness_adapted','reached_breaking_point'];

on(`change:repeating_agents:name`, (eventInfo)=> {
    const id = eventInfo.sourceAttribute.split(`_`)[2];
    const repsecid = `repeating_agents_${id}`;
    getAttrs([`${repsecid}_name`],(values)=> {
        const update = {};
        
        const character_identification = values[`${repsecid}_name`] !== undefined ? values[`${repsecid}_name`] : ``;
        update_repeating_agents(update,repsecid,character_identification);
        
    });
});

const not_numeric_pass= ['character_name','character_id'];
const adaptation_fields = ['violence_adapted','helplessness_adapted'];
const update_repeating_agents = (update,repsecid,character_identification) => {
    var string = `&{template:pass-values}`;
    //var string = `!`;
    const rxGrab = /^0\[(.*)\]\s*$/;
    agent_info_to_get.forEach((field)=>{
        if (not_numeric_pass.includes(field)){
            string += `{{${field}=[[0[@{${character_identification}|${field}}] ]]}}`;
        }else{
            string += `{{${field}=[[@{${character_identification}|${field}}]]}} `;
        }
    });
    string+=`{{breaking_point=[[@{${character_identification}|breaking_point}]]}}`;
    string+=`{{breaking_point_max=[[@{${character_identification}|breaking_point_max}]]}}`;
    if (string === ``) {return;}
    startRoll(string,(results)=>{
        agent_info_to_get.forEach((field)=>{
            if (not_numeric_pass.includes(field)){
                update[`${repsecid}_${field}`] = results.results[field].expression.match(rxGrab)[1];
            }else if (field === `reached_breaking_point`){
                update[`${repsecid}_${field}`] = results.results[field].result==1 ? `yes` : `no`;
            }else if (adaptation_fields.includes(field)){
                update[`${repsecid}_${field}`] = results.results[field].result==1 ? `adapted` : `not adapted`;
            }else{
                update[`${repsecid}_${field}`] = results.results[field].result
            }
        });
        
        setAttrs(update,{silent:true},()=>{
            console.info('update',update);
            console.log(`Updated ${repsecid} with ${character_identification}`);
        });
        finishRoll(results.rollId);    
    })
};

on(`sheet:opened clicked:update_agents`,()=>{
    getAttrs([`sheet_type`],(values)=>{
        if (values.sheet_type === `handler`){
            getSectionIDs(`agents`,(ids)=>{
                var repsecids=[];
                ids.forEach((id)=>{
                    repsecids.push(`repeating_agents_${id}`);
                });
                
// map repsecids to make it into an array containing for each repsecid <repsecid>_character_id and <repsecid>_name



                getAttrs(
                    repsecids.flatMap(repsecid => [`${repsecid}_name`, `${repsecid}_character_id`]),
                    (values) => {
                        repsecids.forEach(repsecid => {
                            const update = {};
                            const character_identification = get_character_identification(values, repsecid);
                            if (character_identification !== ``) {
                                update_repeating_agents(update, repsecid, character_identification);
                            }
                        });
                    }
                );
            });
        };
    });
});

const get_character_identification= (values,repsecid) => {
    // FUTURE: Cannot use character_id as a key for an attribute only for abilities in roll20
    const char_id=``;// values[`${repsecid}_character_id`];
    const char_name=values[`${repsecid}_name`];
    return char_id !== `` ? char_id : char_name;
}