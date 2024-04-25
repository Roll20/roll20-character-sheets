/*
const _disorder_related=arrays[`disorder_related`];
const _disorder_related_max=arrays[`disorder_related`].map(element=>`${element}_max`);
const _disorder_related_old=arrays[`disorder_related`].map(element=>`${element}_old`);
const _disorder_total= _disorder_related.concat(_disorder_related_max,_disorder_related_old,[`power_score`,`trackbp`]);

arrays[`disorder_related`].array.forEach(element => {
    const element_max = `${element}_max`;
    
    on(`change:${element}`, function() {   
        getAttrs(_disorder_total,function(v){
                const sold = parseInt(v[`sanity_points_max`],0);
                const smax = parseInt(v[`sanity_points_old`],0);
                const bmax = parseInt(v[`breaking_point_max`],0);
                const bold = parseInt(v[`breaking_point_old`],0);
                const bnew = parseInt(v[`breaking_point`],0);
                const trackbp = v[`trackbp`]==='active' ? 1 : 0;
                const pow = parseInt(v[`power_score`],0);
                const snew=parseInt(v[element],0);
                    
                const sanflags=saneffects(snew,sold,smax,bnew,bmax,bold,pow,trackbp);
                  
        });
    });
});
*/

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
            console.info(update);
            setAttrs(update, {silent:false}, ()=>{
                console.log('Vitality color updated');	
            });
        });
    });
 });
 

on(`change:repeating_weapons:skill_percent change:repeating_special:skill_or_stat_used`,(eventInfo)=>{
    console.log(eventInfo);
    
    const newValue=eventInfo.newValue;
    const field=eventInfo.triggerName;
    const id= field.split('_')[2];
    const skillspan=`repeating_${field.split('_')[1]}_${id}_skill_span`;
    const isMinority=isMinorityReport(eventInfo);
    const isValid=(isStringInForm(newValue) && isValidSkill(newValue)) && !isMinority;
    const isNumber=isSkillNumber(newValue);
    console.info('field:',field);
    console.info('newValue:',newValue);
    console.info('id:',id);
    console.info('isMinorityReport?',isMinority);
    console.info('isNumber?',isNumber);
    console.info('isStringForm?',isStringInForm(newValue));
    console.info('isValidSkill?', isValidSkill(newValue));
    
    var update={};
    if (isNumber){
        const number=parseInt(newValue) || 0;
        update[field]=number;
        update[skillspan]=number;
        setAttrs(update,{silent:true},()=>{
            console.info('update number:', number);
        });
    } else if (isValid) {
        const skill=cleanedSkill(newValue);
        console.info('skill:',skill);
        getAttrs([`${skill}`], (v) =>{
            update[skillspan]=v[`${skill}`];
            setAttrs(update,{silent:true},()=>{
                console.info('updated skill:',skill);
            });
        })
    } else if (isMinority) {
        console.log("Right now the Precogs can't see a thing." );
    } else {
        update[field]=0;
        update[skillspan]=0;
        setAttrs(update,{silent:true},()=>{
            console.info('unrecognized value:', newValue);
        })
    }
});

