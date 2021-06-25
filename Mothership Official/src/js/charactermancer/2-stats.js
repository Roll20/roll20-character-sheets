{
    const stats = ["strength","speed","intellect","combat"];

    const onLoadStats = () => {
        const data = getCharmancerData();

        if (data?.stats?.values?.["strength"]) {
            const updateHTML = {};
        
            showChoices(["showstats"]); 

            stats.forEach(stat => updateHTML[`t__${stat}`] = data.stats.values[stat]);
    
            setCharmancerText(updateHTML);
        }
    }

    const onRollStats = (rolls) => {
        const updateHTML = {};
        const updateAttrs = {};
        
        showChoices(["showstats"]); 

        rolls.forEach((roll, index) => { 
            updateHTML[`t__${stats[index]}`] = roll.result;
            updateAttrs[`${stats[index]}`] = roll.result;
        });

        updateAttrs["health"] = updateAttrs["strength"] * 2;
        updateAttrs["stress"] = 2;
        updateAttrs["resolve"] = "0";
        
        setCharmancerText(updateHTML);
        setAttrs(updateAttrs);

    }

    on(`mancerroll:stats`, eventInfo => onRollStats(eventInfo.roll));
    on(`page:stats`, eventInfo => onLoadStats(eventInfo.roll));
}