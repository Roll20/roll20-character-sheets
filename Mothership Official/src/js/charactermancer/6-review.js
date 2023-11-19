{

    const onLoadReview = () => {
        const data = getCharmancerData();

        const updateHTML = {};
        const updateAttrs = {};

        ["strength","speed","intellect","combat","health","stress","resolve","sanity","fear","body","armor"].forEach(item => {
            let value = (data?.equipment?.values?.[item]) ? data.equipment.values[item] :
                        (data?.skills?.values?.[item]) ? data.skills.values[item] :
                        (data?.class?.values?.[item]) ? data.class.values[item] :
                        (data?.stats?.values?.[item]) ? data.stats.values[item] :
                        false;

            let mod = (data?.equipment?.values?.[`${item}_mod`]) ? data.equipment.values[`${item}_mod`] :
                      (data?.skills?.values?.[`${item}_mod`]) ? data.skills.values[`${item}_mod`] :
                      (data?.class?.values?.[`${item}_mod`]) ? data.class.values[`${item}_mod`] :
                      (data?.stats?.values?.[`${item}_mod`]) ? data.stats.values[`${item}_mod`] :
                      0;

            const total =  parseInt(value) + parseInt(mod);
            
            updateHTML[`t__${item}`] = total;
            updateAttrs[`${item}_final`] = total;
        });

        updateHTML[`t__class`] = data?.class?.values?.class;
        updateAttrs[`class_final`] = data?.class?.values?.class;

        updateHTML[`t__stresseffect`] = data?.class?.values?.stress_effect;
        updateAttrs[`stresseffect_final`] = data?.class?.values?.stress_effect;

        const skills = [];
        
        const filter = ["owned", "skillpoints_max", "trained_lock", "expert_lock", "master_lock", "unlocked"];

        Object.entries(data.skills.values).forEach(([key, value]) => {
            if (!key.match(/type/) && !filter.includes(key) && value === "on") skills.push(capitalizeString(key));
        });

        updateHTML[`t__skilllist`] = skills.join(', ');
        updateAttrs[`skills_final`] = JSON.stringify(skills);

        const skillpoints = (data?.skills?.values?.skillpoints) ? data.skills.values.skillpoints : "0";

        updateHTML[`t__skillpoints`] = skillpoints;
        updateAttrs[`skillpoints_final`] = skillpoints;

        const starting_credits = (data?.equipment?.values?.credits) ? data.equipment.values.credits : "Not Rolled";

        updateHTML[`t__credits`] = starting_credits;
        updateAttrs[`credits_final`] = starting_credits;

        const trinket = (data?.equipment?.values?.trinket) ? data.equipment.values.trinket : "Not Rolled";

        updateHTML[`t__trinket`] = trinket;
        updateAttrs[`trinket_final`] = trinket;

        const patch = (data?.equipment?.values?.patch) ? data.equipment.values.patch : "Not Rolled";

        updateHTML[`t__patch`] = patch;
        updateAttrs[`patch_final`] = patch;

        const package = (data?.equipment?.values?.equipment) ? parseJSON(data.equipment.values.equipment) : [];

        const items = package.map(item => (Array.isArray(item)) ? `${item[0]} (${item[1]})` : item).join(", ");

        updateHTML[`t__equipmentlist`] = items;
        updateAttrs[`equipment_final`] = data?.equipment?.values?.equipment;

        setCharmancerText(updateHTML)
        setAttrs(updateAttrs);
    }

    on(`page:review`, eventInfo => onLoadReview());

}