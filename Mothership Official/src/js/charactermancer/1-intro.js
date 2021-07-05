{
    const addTopBar = () => {

        addRepeatingSection(`sheet-t__topbar`, `topbar`, section_id => {
            const data = getCharmancerData();
            const updateHTML = {};

            ["strength","speed","intellect","combat","health","stress","resolve","sanity","fear","body","armor"].forEach(item => {
                const value = (data?.equipment?.values?.[item]) ? data.equipment.values[item] :
                              (data?.skills?.values?.[item]) ?  data.skills.values[item] :
                              (data?.class?.values?.[item]) ?  data.class.values[item] :
                              (data?.stats?.values?.[item]) ?  data.stats.values[item] :
                              false;

                const mod = (data?.equipment?.values?.[`${item}_mod`]) ? data.equipment.values[`${item}_mod`] :
                            (data?.skills?.values?.[`${item}_mod`]) ?  data.skills.values[`${item}_mod`] :
                            (data?.class?.values?.[`${item}_mod`]) ?  data.class.values[`${item}_mod`] :
                            (data?.stats?.values?.[`${item}_mod`]) ?  data.stats.values[`${item}_mod`] :
                            0;

                const final = (!value) ? "-" : parseInt(value) + parseInt(mod);
                              
                updateHTML[`${section_id} .sheet-t__${item}`] = final;
            });

            setCharmancerText(updateHTML);

        });

    };

    const recalcStats = () => {
        
        getRepeatingSections("sheet-t__topbar", section_ids => {
            const section_id = section_ids.list[0];
            const data = getCharmancerData();
            const updateHTML = {};

            ["strength","speed","intellect","combat","health","stress","resolve","sanity","fear","body","armor"].forEach(item => {
                
                const value = (data?.equipment?.values?.[item]) ? data.equipment.values[item] :
                              (data?.skills?.values?.[item]) ? data.skills.values[item] :
                              (data?.class?.values?.[item]) ? data.class.values[item] :
                              (data?.stats?.values?.[item]) ? data.stats.values[item] :
                              false;

                const mod = (data?.equipment?.values?.[`${item}_mod`]) ? data.equipment.values[`${item}_mod`] :
                            (data?.skills?.values?.[`${item}_mod`]) ? data.skills.values[`${item}_mod`] :
                            (data?.class?.values?.[`${item}_mod`]) ? data.class.values[`${item}_mod`] :
                            (data?.stats?.values?.[`${item}_mod`]) ? data.stats.values[`${item}_mod`] :
                            0;

                const final = (value === false) ? "-" : parseInt(value) + parseInt(mod);
                              
                updateHTML[`${section_id} .sheet-t__${item}`] = final;
            });

            setCharmancerText(updateHTML);

        });
        
    }

    ["intro", "stats", "class", "skills", "equipment"].forEach(page => on(`page:${page}`, eventInfo => addTopBar(page)));
    ["strength","speed","intellect","combat","health","stress","resolve","sanity","fear","body","armor","strength","speed","intellect","combat"].forEach(stat => {
        on(`mancerchange:${stat} mancercange:${stat}_mod`, eventInfo => recalcStats());
    });
}