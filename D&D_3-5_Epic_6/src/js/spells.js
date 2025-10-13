for(let i = 0 ; i < 10; i++) {
    on("change:repeating_spells"+i,  (eventInfo) => {
        let id = eventInfo.triggerName;
        if (eventInfo.sourceAttribute.includes("options-flag")) {
            return;
        }
        update_spell(id,i);
    });
}


let baseSpell = "&{template:spell} {{name=^{spells.spell}: @{name}}}";
let update_spell = (id,level) =>{
    let school = id+"_school";
    let casting = id+"_casting-time";
    let range = id+"_range";
    let duration = id+"_duration";
    let innate = id+"_innate";
    let description = id+"_description";
    getAttrs([school,casting,range,duration,innate,description], (attrs) =>{
        let rollValue = baseSpell+" {{level="+level+"}}";
        for(let key in attrs){
            if(attrs[key]){
                let attr_name = key.split("_")[3];
                rollValue += ` {{${attr_name}=@{${attr_name}}}}`;
            }
        }
        let update= {};
        update[`${id}_rollvalue`] = rollValue;
        setAttrs(update,false);
    })
}