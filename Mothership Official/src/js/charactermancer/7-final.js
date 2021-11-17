const clearSheet = (data) => {

    const clearAttrs = {};

    const all_repeating_sections = ["equipment", "attacks"];

    all_repeating_sections.forEach(section => {
        getSectionIDs(`repeating_${section}`, ids => {
            ids.forEach(id => {
                removeRepeatingRow(`repeating_${section}_${id}`);
            });
        });
    });

    for (skill in skillList) {
        clearAttrs[skill] = "0";
    }

    setAttrs(clearAttrs,{silent:true}, callback => compileCharacter(data));
}

const compileCharacter = (data) => {
    
    const updateAttrs = {};

    ["armor","body","class","combat","credits","fear","intellect","patch","sanity","speed","strength","trinket","stress","resolve"].forEach(item => {
        updateAttrs[item] = data?.review?.values?.[`${item}_final`] || "";
    });

    

    updateAttrs["stress_panic"] = data?.review?.values?.[`stressresponse_final`] || "";
    updateAttrs["health"] = data?.review?.values?.[`health_final`] || "";
    updateAttrs["health_max"] = data?.review?.values?.[`health_final`] || "";
    updateAttrs["skill_points"] = data?.review?.values?.[`skillpoints_final`] || "";
    updateAttrs["level"] = "0";
    updateAttrs["xp"] = "0";

    if (parseJSON(data?.review?.values?.skills_final)) {
        parseJSON(data.review.values.skills_final).forEach(skill => {
            updateAttrs[skill] = "on";
        });
    }

    if (parseJSON(data?.review?.values?.equipment_final)) {

        const request = [];

        parseJSON(data.review.values.equipment_final).forEach(item => {

            if (Array.isArray(item)) {
                request.push(item[0]);
            } else {
                request.push(item);
            }
        });

        getCompendiumPage(request, pages => {
            
            pages.forEach(data => {

                console.log(data);

                const id = generateRowID();        
                const address = `repeating_equipment_${id}_equipment`;
            
                updateAttrs[`${address}_name`] = data.name;
                updateAttrs[`${address}_notes`] = data.Special || "";
                updateAttrs[`${address}_settings`] = "0";
            
                if (data.data.Damage) {
                    const attack_id = generateRowID();
                    const attack_address = `repeating_attacks_${id}_attack`
            
                    updateAttrs[`${address}_type`] = "Weapon";
                    updateAttrs[`${address}_linkedid`] = attack_id;
                    
                    updateAttrs[`${attack_address}_linkedid`] = id;
                    updateAttrs[`${attack_address}_name`] = data.name;
                    updateAttrs[`${attack_address}_damage`] = data.data.Damage;
                    updateAttrs[`${attack_address}_critical_damage`] = data.data["Critical Damage"] || "";
                    updateAttrs[`${attack_address}_critical_effect`] = data.data["Critical Effect"] || "-";
                    updateAttrs[`${attack_address}_settings`] = "0";
            
                    let combined_string = (data.data.Description) ? `${data.data.Description} ` : ``;
                    combined_string += (data.data.Special) ? `${data.data.Special} ` : ``;
            
                    updateAttrs[`${attack_address}_notes`] = combined_string;
            
                    const range = JSON.parse(data.data.Range) || {};
            
                    if (range && range.CQC !== "Yes") {
                        updateAttrs[`${attack_address}_type`] = "Ranged";
            
                        updateAttrs[`${attack_address}_shots`] = data.data.Shots;
                        updateAttrs[`${attack_address}_ammunition`] = data.data.Ammunition;
            
                        updateAttrs[`${attack_address}_range_s`] = range.Short;
                        updateAttrs[`${attack_address}_range_m`] = range.Medium || "-";
                        updateAttrs[`${attack_address}_range_l`] = range.Long || "-";
            
                    } else {
                        updateAttrs[`${attack_address}_type`] = "Melee";      
                    }
                } else if (data["Armor Save"]) {
                    updateAttrs[`${address}_type`] = "Armor";
                    updateAttrs[`${address}_armor_bonus`] = data.data["Armor Save"];
                } else {
                    updateAttrs[`${address}_type`] = "Gear";
                }

            });

            const total = Object.keys(updateAttrs).length;

            Object.entries(updateAttrs).forEach(([key, value], index) => {
                const percentage = (100 / total) * index; 
                const progress_bar = `<div style="width:${percentage}%"> </div>`; 
                
                setAttrs({[key]:value},{silent:true});
                setCharmancerText({"t__progressbar":progress_bar});
            });

            deleteCharmancerData();
            finishCharactermancer();
        });
    }
}

on("mancerfinish:newcharacter", eventInfo => clearSheet(eventInfo.data));