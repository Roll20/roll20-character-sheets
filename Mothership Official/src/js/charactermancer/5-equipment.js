{
    let packages = {};

    const onLoadEquipment = () => {        
        initEquipmentPackages();
        initTrinketsandPatches();
    };

    const initEquipmentPackages = () => {
        
        getCompendiumPage("Character Creation", (data) => {

            let choices = ["custom"];

            if (data?.data?.equipment_packages) {
                packages = JSON.parse(data.data.equipment_packages);

                Object.keys(packages).forEach(key => choices.unshift(key));
            }

            setCharmancerOptions(`package`, choices);

        }); 

    };

    const chooseEquipmentPackage = (new_value) => {

        hideChoices();

        if (new_value === "choose") return;

        if (packages[new_value]) {

            const items = packages[new_value].map(item => (Array.isArray(item)) ? `${item[0]} (${item[1]})` : item).join(", ");

            setCharmancerText({"t__package":items});
            setAttrs({"equipment":JSON.stringify(packages[new_value])});

        } else if (new_value === "custom") {

            showChoices(["custompackage"]);

            setCharmancerText({"t__package":""});
            setAttrs({"equipment":""});

        }
        

    };

    const initTrinketsandPatches = () => {
        const data = getCharmancerData();

        let trinkets = [];
        let patches = [];
        
        getCompendiumPage("Trinkets", (data) => {

            trinkets = (data?.data?.trinkets) ? parseJSON(data.data.trinkets) : [];
            
            getCompendiumPage("Patches", (data) => {
    
                patches = (data?.data?.patches) ? parseJSON(data.data.patches) : [];

                const trinkets_map = trinkets.map((trinket, index) => `{{opt${index}=${trinket}}}`);
                const patches_map = patches.map((patch, index) => `{{opt${index}=${patch}}}`);
                
                const trinkets_roll = `&{template:ms-cm} {{title=trinket roll}} {{roll=[[1d100-1]]}} ${trinkets_map.join(" ")}`; 
                const patches_roll = `&{template:ms-cm} {{title=patch roll}} {{roll=[[1d100-1]]}} ${patches_map.join(" ")}`; 

                const updateHTML = {};

                updateHTML[`t__trinketroll`] = `<button class="sheet-ms-cm-trinketroll" name="roll_trinket" type="roll" value="${trinkets_roll}"></button>`;
                updateHTML[`t__patchroll`] = `<button class="sheet-ms-cm-patchesroll" name="roll_patch" type="roll" value="${patches_roll}"></button>`;

                setCharmancerText(updateHTML);
    
            });

        });

        if (data?.equipment?.values?.credits) setCharmancerText({t__credits:data.equipment.values.credits});
        if (data?.equipment?.values?.trinket) setCharmancerText({t__trinket:data.equipment.values.trinket});
        if (data?.equipment?.values?.patch) setCharmancerText({t__patch:data.equipment.values.patch});
    };

    const rollCredits = (roll) => {

        setAttrs({credits:roll[0].result});
        setCharmancerText({t__credits:`${roll[0].result}`});
        
    };

    const rollTrinket = (roll) => {
        
        getCompendiumPage("Trinkets", (data) => {

            trinkets = (data?.data?.trinkets) ? parseJSON(data.data.trinkets) : [];

            setAttrs({trinket:trinkets[roll[0].result]});
            setCharmancerText({t__trinket:trinkets[roll[0].result]});
        
        });

    };

    const rollPatch = (roll) => {
        
        getCompendiumPage("Patches", (data) => {

            patches = (data?.data?.patches) ? parseJSON(data.data.patches) : [];

            setAttrs({patch:patches[roll[0].result]});
            setCharmancerText({t__patch:patches[roll[0].result]});
        
        });

    }

    on(`page:equipment`, eventInfo => onLoadEquipment());
    on(`mancerchange:package`, eventInfo => chooseEquipmentPackage(eventInfo.newValue));
    on(`mancerroll:credits`, eventInfo => rollCredits(eventInfo.roll));
    on(`mancerroll:trinket`, eventInfo => rollTrinket(eventInfo.roll));
    on(`mancerroll:patch`, eventInfo => rollPatch(eventInfo.roll));
}