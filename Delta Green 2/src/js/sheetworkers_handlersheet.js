
const agent_info_to_get=['character_id','hit_points', 'willpower_points', 'sanity_points', 'strength_score', 'constitution_score'
    , 'dexterity_score', 'intelligence_score', 'power_score', 'charisma_score', 'violence_adapted',
    'helplessness_adapted'];

on(`change:repeating_agents:name`, (eventInfo)=> {
    const id = eventInfo.sourceAttribute.split(`_`)[2];
    const repsecid = `repeating_agents_${id}`;
    getAttrs([`${repsecid}_name`],(values)=> {
        const update = {};
        
        const character_identification = values[`${repsecid}_name`] !== undefined ? values[`${repsecid}_name`] : ``;
        update_repeating_agents(repsecid,character_identification);
        
    });
});


const update_repeating_agents = (repsecid,character_identification) => {
    var string = `&{template:pass-values}`;
    agent_info_to_get.forEach((field)=>{
        string += `{{${field}=[[@{${character_identification}|${field}}]]}} `;
    });
    string+=`{{breaking_point=[[@{${character_identification}|breaking_point}]]}}`;
    string+=`{{breaking_point_max=[[@{${character_identification}|breaking_point_max}]]}}`;
    if (string === ``) {return;}
    startRoll(string,(results)=>{
        agent_info_to_get.forEach((field)=>{
            update[`${repsecid}_${field}`] = results.results[field].result
        });
        const bp=parseInt(results.results.breaking_point.result)||0;
        const bpmax=parseInt(results.results.breaking_point_max.result)||0;
        update[`${repsecid}_has_breaking_points`]=bp<bpmax;
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
                    repsecids.push(`repeating_agents_${id}_character_id`);
                });
                
                getAttrs(repsecids,(values)=>{
                    repsecids.forEach( repsecid =>{
                        const character_identification = values[`${repsecid}_character_id`];
                        if (character_identification !== ``) {update_repeating_agents(repsecid,character_identification);}
                    });
                });
            });
        };
    });
});