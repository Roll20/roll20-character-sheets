

// Update span on change
const updateSkillSpanOnChange=(skill,value,update,isWhat) =>{

	const sectionDetails = [{section:'repeating_special', fields:['skill_or_stat_used']},
		{section:'repeating_weapons',fields:['skill_percent']},
		{section:'repeating_rituals',fields:['skill_percent']}];

	getSections(sectionDetails,(attr)=>{

		const allskills1=attr.filter(el => el.startsWith(sectionDetails[0][`section`]) && el.endsWith(sectionDetails[0][`fields`][0]));
		const allskills2=attr.filter(el => el.startsWith(sectionDetails[1][`section`]) && el.endsWith(sectionDetails[1][`fields`][0]));
		const allskills3=attr.filter(el => el.startsWith(sectionDetails[2][`section`]) && el.endsWith(sectionDetails[2][`fields`][0]));

		const allids1= allskills1.map(el => el.replace(`_${sectionDetails[0][`fields`][0]}`,''));
		const allids2= allskills2.map(el => el.replace(`_${sectionDetails[1][`fields`][0]}`,''));
		const allids3= allskills3.map(el => el.replace(`_${sectionDetails[2][`fields`][0]}`,''));
		const len1=allids1.length;
		const len2=allids2.length;
		const len3=allids3.length;
		getAttrs(allskills1.concat(allskills2).concat(allskills3),(v)=>{

			for (i=0;i<len1; i++){
				if (cleanedSkill(v[allskills1[i]])===skill){
					update[`${allids1[i]}_skill_span`]=value;
				}

			}

			for (i=0;i<len2; i++){
			if (cleanedSkill(v[allskills2[i]])===skill){
					update[`${allids2[i]}_skill_span`]=value;
				}
			}

			for (i=0;i<len3; i++){
				if (cleanedSkill(v[allskills3[i]])===skill){
						update[`${allids3[i]}_skill_span`]=value;
					}
				}
			setAttrs(update,{silent:true},()=>{
				console.log(`Skill span updated for ${skill}`);
				console.info(update);

			});
		});

	});

}
const saneffects=(snew,sold,smax,bnew,bmax,bold,pow,trackbp) => {
    const san = value_current(snew,sold,smax);            
    const diffsan=san-sold;

    const flag_2san = (diffsan>=2) ? 1 : 0;
    const flag_temp = (diffsan>=5) ? 1 : 0;
    const flag_bp   = (san<=bnew && trackbp==1)  ? 1 : 0;    
    return {san2:flag_2san,temp:flag_temp,bp:flag_bp};
};

const definesanroll=(san,sold,bnew,bold,sanflags,character_name,San2_disorder={},Temp_disorder={}) => {
    const diffsan=san-sold;
    const flag_2san=(sanflags.san2 && !(isEmpty(San2_disorder)));
    const flag_temp=sanflags.temp;
    const flag_bp=sanflags.bp;

    var rollString=`&{template:fancy-rolls} {{name=${character_name}}} {{header=^{sanity_loss}}} `;
    rollString= `${rollString} {{sanity_loss=[[${diffsan}]]}} {{sanity_new=[[${san}]]}}`;
    rollString= `${rollString} {{sanity_old=[[${sold}]]}} {{bp_old=[[${bold}]]}} {{bp_new=[[${bnew}]]}}`;

    if (flag_bp == 1){
        rollString= `${rollString} {{flag_bp=1}} `;
    }
    if (flag_temp==1){
        rollString=`${rollString} {{flag_temp=1}}`;
        if (!(isEmpty(Temp_disorder))){
            Object.entries(Temp_disorder).forEach(([key,val],index)=>{
                rollString= `${rollString} {{tdis_name${index}=${key}}} {{tdis_desc${index}=${val}}} `;
            });
        }
    }    

    if (flag_2san==1){
        rollString=`${rollString} {{flag_2san=1}}`;
        if (!(isEmpty(Temp_disorder))){
            Object.entries(Temp_disorder).forEach(([key,val],index)=>{
                rollString= `${rollString} {{tdis_name${index}=${key}}} {{tdis_desc${index}=${val}}} `;
            });
        }
    }   

    var update={};    
    update['sanity_points']=san;
    update['sanity_points_old']=sold;
    if (flag_bp==='on'){
        update['breaking_point']=Math.max(0,san-pow);
        update['breaking_point_max']=bold;
        update['breaking_point_old']==Math.max(0,san-pow);
    }

    setAttrs(update, {silent:true},()=>{
               console.info('update',update)
    });

    startRoll(`${rollValue} {{isSkill=[[${_isSkill}]]}}`, (results)=> {
        const sanity_old=results.results.sanity_old.result;
        const sanity_new=results.results.sanity_new.result;
        const sanity_loss=results.results.sanity_loss.result;
        const bp_old=results.results.bp_old.result;
        const bp_new=results.results.bp_new.result;
		finishRoll(results.rollId,{});

    });

}

const value_current = (current,old,max) => {

    if (current>=max) {
        return (current<=old) ? current : old;
    }
    return Math.max(current,0);
}

const setBondsLocalVariables = () => {
	getAttrs(["willpower_points","sanity_points"],function(value){
		let update={};
		getSectionIDs(`bonds`,function(idarray){
			idarray.forEach(id=>{
				update["repeating_bonds_"+id+"_wp_points"]=value["willpower_points"];
				update["repeating_bonds_"+id+"_sanity_points"]=value["sanity_points"];
			});
			console.log('inside repeating section');

			setAttrs(update,{silent:true},()=>{
               console.info('update',update);
			   console.log('Bonds updated on open');
			});	
		});
	});
};
// === debug note: need to change repeating_special_training and repeating_weapons for visulization purposes
// === Update stats on change

const skill_in_bounds = (skill) => {
	const skill_value = parseInt(skill) || 0;
	return Math.min(99, Math.max(0, skill_value));
};

const updateadvancedweapons = () => {
	getAttrs(['advanced_weapons'],(v)=>{
		const advanced_weapons=v['advanced_weapons'];
		getSectionIDs(`weapons`,(ids)=>{

			const update={};

			const prefix='repeating_weapons_';
			ids.forEach((id)=>{
				update[prefix+id+'_hasAdvancedWeapons']=advanced_weapons;
				arrays['_advanced_weapons_featurs'].forEach((feat)=>{
					update[prefix+id+'_'+feat]=0;
				});
			});
			setAttrs(update,{silent:true});
		});
	});
};