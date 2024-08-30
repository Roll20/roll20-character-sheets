
arrays['_colored_derivative'].forEach(vitality => {
    on(`change:${vitality}_points`, (eventInfo) => {
        
        
        
 
        var value = parseInt(eventInfo.newValue) || 0;
        value = (value < 0) ? 0 : value;
        const maxval=`${vitality}_points_max`;
        getAttrs([maxval], function(v) {
            
            const max_val = parseInt(v[maxval]) || 0;	
            const low_val=2;
            var update={};
 
            
            update[`color_${vitality}`]='normal';
            update[`${vitality}_modifier`]=0;
 
            if (value > max_val) {
                update[`color_${vitality}`]='extra';
            }
            if (value <= low_val) {
                update[`color_${vitality}`]='low';
                update[`${vitality}_modifier`]=1;
             }
            if (value == 0) {
                update[`color_${vitality}`]='zero';
                update[`${vitality}_modifier`]=2;
            }
            update[`${vitality}_points`]=value;
            
            
            setAttrs(update, {silent:false}, ()=>{
                
            });
        });
    });
 });

 

const BondButtonColor= (bondvalue) => {
    const score = parseInt(bondvalue)||0;
    const color = (score > 0) ? 'on' : 'off';
    return color;
};

const changeBondButtonColorOnOpen = () => {
    getSectionIDs(`repeating_bonds`, (idarray) => {
        
		const allbonds=idarray.map(id =>`repeating_bonds_${id}_score`);
        getAttrs(allbonds, (value) => {
            const update={};
            Object.entries(value).forEach(([key, value]) => {
                const id = key.split('_')[2];
                const score = parseInt(value)||0;
                update['repeating_bonds_'+id+'_color'] = BondButtonColor(score);
            });
            setAttrs(update, {silent:true}, () => {
                console.log('Bond color updated');
                
            });
        });
    });
};

on('change:repeating_bonds:score', (eventInfo) => {
    const update={};
    const value = parseInt(eventInfo.newValue)||0;
    update['repeating_bonds_color'] = BondButtonColor(value);
    setAttrs(update, {silent:true}, () => {
        console.log('Bond color updated');
        
    });
});


_skill_percent.forEach(_skill_sec_percent => {
    const section=_skill_sec_percent.section;
    const field=_skill_sec_percent.field;
    const input=`repeating_${section}_${field}`;
    const skillspan=`repeating_${section}_skill_span`;
    on(`change:repeating_${section}:${field}`, () => {
        getAttrs([input], (value) => {
            const SkillPercent = value[`repeating_${section}_${field}`];
            const isInLinkingForm=isValidLinkInput(SkillPercent);
            const isInNumericalForm=isSkillNumber(SkillPercent);
            const update={};
            var   skillname='';

            if (isInLinkingForm===false && isInNumericalForm===false) {
                update[input]=0;
                if (section !=='skills') {update[skillspan]=update[input];}
                setAttrs(update,{silent:true},()=>{
                    
                });
            }

            if (isInNumericalForm){
                const number= setMinMax(SkillPercent);
                update[input]=number;
                if (section !=='skills') {update[skillspan]=update[input];}
                setAttrs(update,{silent:true},()=>{
                    
                });
            }

            if (isInLinkingForm) {
                const skill=cleanedSkill(SkillPercent);
                skillname=skill;
                getAttrs([`${skillname}`], (values) => {
                    const number= setMinMax(values[skillname]);
                    if (section !=='skills') {update[skillspan]=number;}
                    setAttrs(update,{silent:true},()=>{
                        
                    });
                });
            };
        });
    });
});     




_only_number.forEach(_sect_object => {
    const section=_sect_object.section;
    const fields=_sect_object.fields;
    if (Array.isArray(fields)) {
        fields.forEach(field => {
            const input=`repeating_${section}_${field}`;
            on(`change:repeating_${section}:${field}`, () => {
                getAttrs([input], (value) => {
                    const update={};
                    const number=setMinMax(value[input]);
                    update[input]=number;
                    setAttrs(update,{silent:true},()=>{
                    });
                });
            });
        });
    };
});


_number_or_roll.forEach(_sect_object => {
    const section=_sect_object.section;
    const fields=_sect_object.fields;
   
    if (Array.isArray(fields)) {
        fields.forEach(field => {
            const input=`repeating_${section}_${field}`;
            on(`change:repeating_${section}:${field}`, () => {
                getAttrs([input], (value) => {
                    const update={};
                    const number=parseRoll(value[input]);
                    update[input]=number;
                    setAttrs(update,{silent:true},()=>{
                    });
                });
            });
        });
    };
});

arrays['_sanity_loss'].forEach(sanity => {
    on(`change:${sanity}`, () => {
        getAttrs([`${sanity}`], (v) => {
            const value= parseRoll(v[sanity]);
            const update={};
            update[sanity]=value;
            setAttrs(update, {silent:true}, () => {
               console.info(`Sanity points updated`); 
            });
        });    
    });
});