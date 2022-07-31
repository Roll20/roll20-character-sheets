{

    const trained_skills = [
        "linguistics",
        "biology",
        "first_aid",
        "hydroponics",
        "geology",
        "zero-g",
        "scavenging",
        "heavy_machinery",
        "computers",
        "mechanical_repair",
        "driving",
        "piloting",
        "mathematics",
        "art",
        "archaeology",
        "theology",
        "military_training",
        "rimwise",
        "athletics",
        "chemistry"
    ];

    const expert_skills = [
        "psychology",
        "genetics",
        "pathology",
        "botany",
        "planetology",
        "asteroid_mining",
        "jury_rigging",
        "engineering",
        "hacking",
        "vehicle_specialization",
        "astrogation",
        "physics",
        "mysticism",
        "tactics",
        "gunnery",
        "firearms",
        "close-quarters_combat",
        "explosives"
    ];

    const master_skills = [
        "sophontology",
        "xenobiology",
        "surgery",
        "cybernetics",
        "robotics",
        "artificial_intelligence",
        "command",
        "hyperspace",
        "xenoesotericism",
        "weapon_specialization"
    ];

    const onLoadSkills = () => {
        const data = getCharmancerData();

        resetClassSkills();

        if (data?.skills?.values?.skillpoints_max) calcAllSkills();
        else if (data?.class?.values?.skill_points) setAttrs({skillpoints_max:data.class.values.skill_points}, callback => calcAllSkills());
        else setCharmancerText({[`t__skillpointserror`]:getTranslationByKey("Ensure you have selected a class")});
    };

    const resetClassSkills = () => {
        const data = getCharmancerData();
        const all_skills = [...trained_skills, ...expert_skills, ...master_skills];

        const updateAttrs = {};

        all_skills.forEach(skill => {
            if (data?.skills?.values[`${skill}_type`] === "class") {
                updateAttrs[skill] = 0;
                updateAttrs[`${skill}_type`] = "";
            }
        });

        const class_skills = (data?.class?.values?.skills) ? JSON.parse(data.class.values.skills).map(skill => skill.replace(/ /g, "_")) : [];

        class_skills.forEach(skill => {
            updateAttrs[skill] = "on";
            updateAttrs[`${skill}_type`] = "class";
        });

        if (data?.class?.repeating?.length > 0) {
            const skill_choices = data.class.repeating.filter(repeating_id => repeating_id.indexOf("choicerow") > -1);

            if (skill_choices.length > 0) {
                skill_choices.forEach(repeating_id => {
                    const skill_name = data.class.values[`${repeating_id}_skill`].toLowerCase().replace(/ /g, "_");
    
                    if (skill_name !== "choose") {
                        updateAttrs[skill_name] = "on";
                        updateAttrs[`${skill_name}_type`] = "class";
                    }
                });
            }
        }

        setAttrs(updateAttrs, callback => checkAllSkills());
    };

    const calcAllSkills = () => {
        const data = getCharmancerData();

        const sp_total = (data?.skills?.values?.skillpoints_max) ? parseInt(data.skills.values.skillpoints_max) : 0;
        let sp_spent = 0;
        
        trained_skills.forEach(skill => {
            const skill_toggle = data.skills.values[skill];
            const skill_type = data.skills.values[`${skill}_type`];
            if (skill_toggle === "on" && skill_type !== "class") sp_spent += 1;
        }); 
        
        expert_skills.forEach(skill => { 
            const skill_toggle = data.skills.values[skill];
            const skill_type = data.skills.values[`${skill}_type`];
            if (skill_toggle === "on" && skill_type !== "class") sp_spent += 2;
        });
        
        master_skills.forEach(skill => { 
            const skill_toggle = data.skills.values[skill];
            const skill_type = data.skills.values[`${skill}_type`];
            if (skill_toggle === "on" && skill_type !== "class") sp_spent += 3;
        });

        const updateAttrs = {
            trained_lock: "0",
            expert_lock: "0",
            master_lock: "0"
        };

        const updateHTML = {};

        const sp_remaining = sp_total - sp_spent;

        if (sp_remaining <= 2) updateAttrs["master_lock"] = "on";
        if (sp_remaining <= 1) updateAttrs["expert_lock"] = "on";
        if (sp_remaining <= 0) updateAttrs["trained_lock"] = "on";

        updateAttrs["skillpoints"] = sp_remaining;
        updateHTML["t__skillpoints"] = `${sp_remaining} / ${sp_total}`;

        setCharmancerText(updateHTML);
        setAttrs(updateAttrs);
    }

    const toggleSkill = (skill) => {
        const data = getCharmancerData();

        if (!data?.skills?.values?.[`${skill}_type`] || data.skills.values[`${skill}_type`] !== "class") {
            if (data?.skills?.values?.[skill] === "on") {
                data.skills.values[skill] = "0";
                setAttrs({[skill]:0}, callback => checkAllSkills());
            } else {
                data.skills.values[skill] = "on";
                setAttrs({[skill]:"on"}, callback => checkAllSkills());
            }
        }

    };

    const checkAllSkills = () => {
        const data = getCharmancerData();
        
        const owned = [];
        const unlocked = [];

        for (const key in skillList) {

            if (data?.skills?.values?.[key] === "on") {
                owned.push(key);

                for (const skill of skillList[key].unlocks) {
                    if (!unlocked.includes(skill)) unlocked.push(skill);
                }
            } 
        }
            
        setAttrs({unlocked:unlocked.join(" "), owned: owned.join(" ")});
    }

    on(`page:skills`, eventInfo => onLoadSkills());

    [...trained_skills, ...expert_skills, ...master_skills].forEach(skill => {
        on(`clicked:toggle-${skill}`, eventInfo => {
            toggleSkill(skill);
            calcAllSkills();
        });
});
}