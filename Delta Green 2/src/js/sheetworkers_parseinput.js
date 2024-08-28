
arrays['_colored_derivative'].forEach(vitality => {
    on(`change:${vitality}_points`, (eventInfo) => {
        console.log('changed '+vitality+'_points');
        console.log(eventInfo);
        console.log(eventInfo.newValue);
 
        var value = parseInt(eventInfo.newValue) || 0;
        value = (value < 0) ? 0 : value;
        const maxval=`${vitality}_points_max`;
        getAttrs([maxval], function(v) {
            console.log('maxval:'+v[maxval]);
            const max_val = parseInt(v[maxval]) || 0;	
            const low_val=2;
            var update={};
 
            console.log('maxval:'+v[maxval]+' value:'+value+' low_val:'+low_val);
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
            console.log('maxval:'+v[maxval]+' value:'+value+' low_val:'+low_val);
            
            setAttrs(update, {silent:false}, ()=>{
                console.log('Vitality color updated');	
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







on(`change:repeating_weapons:skill_percent change:repeating_special:skill_or_stat_used change:repeating_rituals:skill_percent`,(eventInfo)=>{
    console.log(eventInfo);
    
    const newValue=eventInfo.newValue;
    const field=eventInfo.triggerName;
    const id= field.split('_')[2];
    const skillspan=`repeating_${field.split('_')[1]}_${id}_skill_span`;
    const isMinority=isMinorityReport(eventInfo);
    const isValid=(isStringInForm(newValue) && isValidSkill(newValue)) && !isMinority;
    const isNumber=isSkillNumber(newValue);
    
    
    
    
    
    
    
    
    var update={};
    if (isNumber){
        const number=parseInt(newValue) || 0;
        update[field]=number;
        update[skillspan]=number;
        setAttrs(update,{silent:true},()=>{
            
        });
    } else if (isValid) {
        const skill=cleanedSkill(newValue);
        
        getAttrs([`${skill}`], (v) =>{
            update[skillspan]=v[`${skill}`];
            setAttrs(update,{silent:true},()=>{
                
            });
        })
    } else if (isMinority) {
        console.log("Right now the Precogs can't see a thing." );
    } else {
        update[field]=0;
        update[skillspan]=0;
        setAttrs(update,{silent:true},()=>{
            
        })
    }
});

