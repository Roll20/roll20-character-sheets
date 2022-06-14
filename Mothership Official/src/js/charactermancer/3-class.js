{
    const onLoadClass = () => {
        const data = getCharmancerData();

        if (data?.class?.values?.["selected"]) instanceClass(data.class.values.selected);
        else generateClassList();
    }

    const generateClassList = () => {

        hideChoices();
        showChoices(["showclasses"]);

        clearRepeatingSections("sheet-t__classes");

        getCompendiumQuery("Category:Classes", function(data) {

            custom = [{name:"custom"}];
            data = [...data, ...custom];

            data.forEach(class_object => {
                const saves = (class_object?.data?.["Saves"]) ? JSON.parse(class_object.data["Saves"]) : false;
                const skills = (class_object?.data?.["Skills"]) ? JSON.parse(class_object.data["Skills"]) : false;
                const skills_choice = (class_object?.data?.["Skill Choice"]) ? JSON.parse(class_object.data["Skill Choice"]) : false;
                const stat_bonus = (class_object?.data?.["Stat Bonus"]) ? JSON.parse(class_object.data["Stat Bonus"]) : false;
                const description = (class_object?.data?.["data-Description"]) ? class_object.data["data-Description"] : "Undefined"; 
                const img = (class_object?.data?.["data-class_image"]) ? class_object.data["data-class_image"] : "Undefined";

                addRepeatingSection(`sheet-t__classes`, `class`, section_id => {

                    const updateHTML = {};
                    const updateAttrs = {};
                    
                    if (class_object.name === "custom") {

                        updateAttrs[`${section_id}_name`] = "custom";

                        updateHTML[`${section_id} .sheet-t__img`] = `<img src="https://s3.amazonaws.com/files.d20.io/images/156707384/n7TD2kDSyn433GHWIRI58g/max.png" />`;
                        updateHTML[`${section_id} .sheet-t__title`] = getTranslationByKey("custom");
                        updateHTML[`${section_id} .sheet-t__desc`] = getTranslationByKey("choose this option to enter your own information");

                    } else {

                        updateAttrs[`${section_id}_name`] = class_object.name;

                        updateHTML[`${section_id} .sheet-t__img`] = `<img src="${img}" />`;
                        updateHTML[`${section_id} .sheet-t__title`] = class_object.name;
                        updateHTML[`${section_id} .sheet-t__desc`] = `
                            <p>${description}</p>
                        `;

                        // updateHTML[`${section_id} .sheet-t__desc`] += `
                        //     <h3>${getTranslationByKey("saves")}:</h3>
                        // `;

                        // const saves_array = [];

                        // Object.entries(saves).forEach(([key, value]) => {
                        //     saves_array.push(`<strong>${key}</strong> ${value}`);
                        // })
                        
                        // updateHTML[`${section_id} .sheet-t__desc`] += saves_array.join("<br />");

                        // updateHTML[`${section_id} .sheet-t__desc`] += `<h3>${getTranslationByKey("stats")}:</h3>`;

                        // const stats_array = [];

                        // Object.entries(stat_bonus).forEach(([key, value]) => {
                        //     stats_array.push(`<strong>${key}</strong> +${value}`);
                        // });

                        // updateHTML[`${section_id} .sheet-t__desc`] += stats_array.join(", ");

                        // updateHTML[`${section_id} .sheet-t__desc`] += `<h3>${getTranslationByKey("skills")}:</h3>`;

                        // if (skills) {

                        //     const skills_array = [];

                        //     skills.forEach(skill => skills_array.push(skill));

                        //     updateHTML[`${section_id} .sheet-t__desc`] += `<p>${skills_array.join(", ")}</p>`;

                        // } 

                        // if (skills_choice) {

                        //     const skillchoice_array = [];

                        //     skills_choice[0].forEach((choice) => skillchoice_array.push(choice));

                        //     updateHTML[`${section_id} .sheet-t__desc`] += `<p>${skillchoice_array.join(" or ")}</p>`;

                        // }

                    }
                    
                    setAttrs(updateAttrs);
                    setCharmancerText(updateHTML);

                });

            });

        }); 
    }

    const onSelectClass = (source_section, source_type) => {
        const data = getCharmancerData();

        if (source_type !== "player") return;

        getRepeatingSections("sheet-t__classes", repeating_ids => {
            const updateAttrs = {};

            repeating_ids.list.filter(id => id !== source_section).forEach(id=> updateAttrs[`${id}_selected`] = 0);

            const new_class = data.class.values[`${source_section}_name`];
            
            updateAttrs[`selected`] = new_class;

            setAttrs(updateAttrs, callback => instanceClass(new_class));
        });

    }

    const instanceClass = (class_name) => {
        const cm_data = getCharmancerData();

        hideChoices();
        showChoices(["showclassinfo"]);

        if (class_name === "custom") {
            hideChoices(["presetclass"]);
            showChoices(["customclass"]);

            clearRepeatingSections("sheet-t__skill_choice"); 
        } else {
            showChoices(["presetclass"]);
            hideChoices(["customclass"]);

            getCompendiumPage(`Classes:${class_name}`, data => {

                const updateAttrs = {
                    class: "",
                    sanity: "",
                    fear: "",
                    body: "",
                    armor: "",
                    strength_mod: "",
                    speed_mod: "",
                    intellect_mod: "",
                    combat_mod: "",
                    skill_points: "",
                };

                const updateHTML = {};
                
                updateHTML[`t__cname`] = data.name;
                updateAttrs[`class`] = data.name;
                
                const saves = JSON.parse(data.data["Saves"]);   

                Object.entries(saves).forEach(([key, value]) => {

                    const key_lower = key.toLowerCase();

                    updateHTML[`t__${key_lower}`] = value;
                    updateAttrs[key_lower] = value;

                });
                
                const stats = JSON.parse(data.data["Stat Bonus"]);

                Object.entries(stats).forEach(([key, value]) => {

                    const key_lower = key.toLowerCase();
                    
                    updateAttrs[`${key_lower}_mod`] = value;

                });

                const strength = (cm_data?.class?.values?.strength) ? parseInt(cm_data.class.values.strength) :
                                 (cm_data?.stats?.values?.strength) ? parseInt(cm_data.stats.values.strength) :
                                 0;

                const strength_mod = (cm_data?.class?.values?.strength_mod) ? parseInt(cm_data.class.values.strength_mod) :
                                     (cm_data?.stats?.values?.strength_mod) ? parseInt(cm_data.stats.values.strength_mod) :
                                     0;

                const health = (strength + strength_mod) * 2;

                updateAttrs["health"] = health;

                ["Skills", "Skill Points", "Stress Effect"].forEach(item => {
                    const parsed = item.toLowerCase().replace(/ /g,"_");

                    if (data?.data?.[item]) {
                        const json = (parseJSON(data.data[item])) ? parseJSON(data.data[item]) : data.data[item];
                        const display = (Array.isArray(json)) ? json.join(", ") : json;

                        updateAttrs[parsed] = data.data[item];
                        updateHTML[`t__${parsed}`] = display;
                    } else {
                        updateAttrs[parsed] = "";
                        updateHTML[`t__${parsed}`] = "";
                    }
                });

                clearRepeatingSections("sheet-t__skill_choice"); 

                if (data?.data?.["Skill Choice"]) {
                    const choices = parseJSON(data.data["Skill Choice"]);

                    choices.forEach(group => addRepeatingSection("sheet-t__skill_choice", "skillselection", "choicerow", section_id => setCharmancerOptions(`${section_id}_skill`, group)));

                }

                setAttrs(updateAttrs);
                setCharmancerText(updateHTML);
    
            });

        }

    }

    const reselectClass = () => {
        const data = getCharmancerData();

        getRepeatingSections("sheet-t__classes", repeating_ids => {

            hideChoices();

            const updateAttrs = {};

            repeating_ids.list.forEach(id=> updateAttrs[`${id}_selected`] = 0);
            
            updateAttrs[`selected`] = "";

            setAttrs(updateAttrs, callback => onLoadClass());
        });
    }

    const disableSkills = (new_value) => {
        const data = getCharmancerData();
        const disable = [];
        disable.push(new_value);

        if (data?.class?.repeating) {
            data.class.repeating.forEach(repeating_id => {

               disableCharmancerOptions(`${repeating_id}_skill`, disable);
                
            });
        }

    }

    on(`page:class`, eventInfo => onLoadClass());
    on(`mancerchange:repeating_class_selected`, eventInfo => onSelectClass(eventInfo.sourceSection, eventInfo.sourceType));
    on(`clicked:reselectc`, eventInfo => reselectClass());
    on(`mancerchange:repeating_choicerow`, eventInfo => disableSkills(eventInfo.newValue));
}