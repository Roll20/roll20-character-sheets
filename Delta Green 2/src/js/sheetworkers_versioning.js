const versioning = (version) => {
    console.log(`%c Versioning, ${version}`, 'color: green; font-weight:bold');
    if (version < 1.05) {
       version_0_105();
    } 
    else if (version <1.5) {
        version_105_150();
    }
    else if (version<1.7) {
        version_150_170();
    }
    else if (version<2.0) {
        version_170_200();
    }
    else if (version<2.01) {
        version_200_201();
    }
    else if (version<2.02) {
        version_201_202();
    }
    else if (version<2.03) {
        version_202_203();
    }
    else if (version<2.04) {
        version_203_204();
    }
    else if (version<2.05) {
        version_204_205();
    }
    else if (version<2.06) {
        version_205_206();
    }
};

// UPDATE TO VERSION 1.05
const version_0_105= () => {
    getAttrs(['version'], function(v) {
        let codeversion=1.05;
        let update={version: codeversion,
                     initial_san: 0,
                     initial_hp:  0,
                     initial_str: 0,
                     initial_con: 0
        };
        setAttrs(update, //Update attributes
            {silent:true},  // will not trigger sheet workers
            versioning(codeversion)); // call versioning again
    });
};
// UPDATE TO VERSION 1.5
const version_105_150 = () => {

    let codeversion=1.5;
    let update={};

    getSectionIDs(`weapons`,function(idarray){
   console.log(`%c idarray`, 'color: green; font-weight:bold');
   console.info(idarray);
        let fieldnames=['sheet_type','version'];
        console.log(`%c did I found weapons?`, 'color: green; font-weight:bold');
        idarray.forEach(id => {
                console.log(`%c ${id}`, 'color: green; font-weight:bold');
                fieldnames.push(`repeating_weapons_${id}_damage`,`repeating_weapons_${id}_lethality_percent`,`repeating_weapons_${id}_attack`);
        });
           getAttrs(fieldnames,function(v) {
           console.log(`%c v`, 'color: green; font-weight:bold');
           console.info(v);
           update['version']=codeversion;

            idarray.forEach(id=>{
                console.log(`%c ${id}`, 'color: green; font-weight:bold');
                if (v[`repeating_weapons_${id}_damage`]===""){
                    update["repeating_weapons_"+id+"_hasDamage"]="0";

                } else{
                    update["repeating_weapons_"+id+"_hasDamage"]="1";

                }

                if (v[`repeating_weapons_${id}_lethality_percent`]>0){
                    update["repeating_weapons_"+id+"_hasLethality"]="1";

                } else {
                    update["repeating_weapons_"+id+"_hasLethality"]="0";

                }
                if (v['sheet_type']==='npc'){
                    update["repeating_weapons_"+id+"_weapons"]=v[`repeating_weapons_${id}_attack`];
                }
            });

           console.log(`%c update`, 'color: green; font-weight:bold');

            setAttrs(update, //Update attributes
                    {silent:true},  // will not trigger sheet workers
                    versioning(codeversion)); // call versioning again

        });
    });
};

// UPDATE TO VERSION 1.7
const version_150_170 = () => {
    let codeversion=1.7;
    let update={};
    update['version']=codeversion;
    update['luck']=50;
    update['luck_max']=50;
    console.log(`%c update`, 'color: green; font-weight:bold');

    setAttrs(update, //Update attributes
            {silent:true},  // will not trigger sheet workers
            versioning(codeversion)); // call versioning again
};

// UPDATE TO VERSION 2.0
const version_170_200 = () => {
    let codeversion=2.0;
    const update={};
    update['version']=codeversion;
    getAttrs(["motivations","character_name","name","sanity_points","violence_3","helplessness_3","violence_2","helplessness_2",
    "sanity_points_old","sanity_points","breaking_point_old","breaking_point_old"],function(v){
        let motivations=v["motivations"];
        if (v["name"]!==""){
            _name=v["name"];
        }else{
            _name=v["character_name"];
        }	
        update["character_name"]=_name;
        update["old_motivations"]=motivations.replace(/<br>/g,"\n");
        const _violence_adapted     = v["violence_2"]==='on';
        const _helplessness_adapted = v["helplessness_2"]==='on';
        if (v["violence_2"]==='on'){
            update["violence_1"]='on';
        }
        if (v["helplessness_2"]==='on'){
            update["helplessness_1"]='on';
        }

        if (_violence_adapted){
            update["violence_adapted"]=1;
            update["violence_2"]='on';
            update["violence_1"]='on';
        }
        if (_helplessness_adapted){
            update["helplessness_adapted"]=1;
            update["helplessness_2"]='on';
            update["helplessness_1"]='on';
        }

        update['sanity_points_old']=v['sanity_points'];
        update['breaking_point_old']=v['breaking_point'];

        console.log(`%c update`, 'color: green; font-weight:bold');

        setAttrs(update, //Update attributes
                {silent:true},  // will not trigger sheet workers
                versioning(codeversion)); // call versioning again
    });

};
// UPDATE TO VERSION 2.0
const version_200_201 = () => {
    let codeversion=2.01;
    const update={};
    console.log('version:',codeversion);
    update['version']=codeversion;

        // UPDATE NAMES FOR SPECIAL TRAINING AND WEAPONS AND TRIGGER TEST
    const _sectionDetails = [
        {section:'special', fields: ['name','special_training','skill_or_stat_used','skill_span',]},
        {section:'weapons', fields: ['name','weapons','rank','skill_percent','skill_span','ammo','hasammo','ammo_total','lethality_percent']},
        {section:'bonds', fields: ['flag','setScore','score','score_old']}];
    _sectionDetails.forEach(_group => {
        const section = _group.section;
        const fields = _group.fields;
        getSectionIDs(section, (ids)=>{
            console.log('in getSectionIDs section',section);
            console.log('in getSectionIDs ids',ids);
            const repfields=[];    
            ids.forEach(id => {
                fields.forEach(field => {
                    repfields.push(`repeating_${section}_${id}_${field}`);
                });
            });
            getAttrs(repfields,(values) => {
                    console.info('fullarray',values);
          
                    ids.forEach(id => {
                        const repsecid= `repeating_${section}_${id}_`;

                        /// bond update
                        if (section==='bonds'){
                            if (values.hasOwnProperty(`${repsecid}flag`)){
                                update[`${repsecid}setScore`]=1;
                                update[`${repsecid}flag`]='';
                            }
                            update[`${repsecid}score_old`]=values[`${repsecid}score`];
                            update[`${repsecid}test`]='editable';
                        }

                        if (section === 'weapons'){
                            if (values[`${repsecid}lethality_percent`]!==''){
                                const number=setMinMax(values[`${repsecid}lethality_percent`]);
                                update[`${repsecid}lethality_percent`]=number;
                                
                                console.log(`%c update name ${repsecid}lethality_percent to empty`, 'color: green; font-weight:bold');
                            }
                        }

                        if (section === 'special'){
                            if (values.hasOwnProperty(`${repsecid}special_training`)){
                                update[`${repsecid}name`]=values[`${repsecid}special_training`];
                                update[`${repsecid}special_training`]='';
                                console.log(`%c update name ${repsecid}special_training to ${repsecid}name`, 'color: green; font-weight:bold');
                            }
                        };

                        if (section === 'weapons'){
                            if (values.hasOwnProperty(`${repsecid}weapons`)){
                                update[`${repsecid}name`]=values[`${repsecid}weapons`];
                                update[`${repsecid}weapons`]='';
                                update[`${repsecid}test`]='editable';
                            }
                            const number=setMinMax(values[`${repsecid}skill_percent`]);
                            update[`${repsecid}skill_span`]=number;
                            update[`${repsecid}skill_percent`]=number;
                            const value_ammo = Math.max(parseInt(values[`${repsecid}ammo`],10) || 0,0)  ;
                            if (value_ammo>0){
                                update[`${repsecid}ammo_total`]=value_ammo;
                                update[`${repsecid}hasammo`]='active';
                                update[`${repsecid}ammo`]=value_ammo;
                            } else {
                                update[`${repsecid}hasammo`]=0;
                                update[`${repsecid}ammo_total`]='';
                                update[`${repsecid}ammo`]='';
                            }
                             
                            console.log(`%c update name ${repsecid}weapons to ${repsecid}name`, 'color: green; font-weight:bold');
                            
                        };

                        if (section ==='special'){
                            const value_stat=setMinMax(values[`${repsecid}skill_or_stat_used`]) ;
                            update[`${repsecid}skill_span`]=value_stat;
                            update[`${repsecid}skill_or_stat_used`]=value_stat;
                            console.log(`%c update skill_span for ${repsecid}`, 'color: green; font-weight:bold');
                        };

                        if (values.hasOwnProperty(`${repsecid}skill_percent`)){
                            const value_skill = setMinMax(values[`${repsecid}skill_percent`]);
                            update[`${repsecid}skill_span`]=value_skill;
                            update[`${repsecid}skill_percent`]=value_skill;
                            console.log(`%c update skill_span for ${repsecid}`, 'color: green; font-weight:bold');
                        };
                    }); 


                    console.log(`%c update`, 'color: green; font-weight:bold');
                    console.info('versioning',update);
                    setAttrs(update, //Update attributes
                            {silent:true},  // will not trigger sheet workers
                            versioning(codeversion)); // call versioning again

                        });

        });
    });
};

const version_201_202 = () => {
    let codeversion=2.02;
    const update={};
    console.log('verion:',codeversion);
    update['version']=codeversion;
    getAttrs(["sheet_type"], values => {
        var names=[];
        var rank=[];
                
        if (values.sheet_type==='npc'){
            update['sheet_type']='npc';
            getSectionIDs(`skills`, ids => {
                ids.forEach(id => {
                    names.push(`repeating_skills_${id}_name`);
                    rank.push(`repeating_skills_${id}_rank`);
                });
            });
        };        
            // make it into an object with keys = names and values = ran
               
            
        getAttrs(names.concat(rank), values => {
            var ids_to_remove=[]; // for the ids that I copy in the named skills
            names.forEach((name,idx) => {
                const skillname=values[name].toLowerCase().replace(/ /g, "_");
                const rankvalue=values[rank[idx]];
                const id_value=name.split('_')[2];
                if (arrays['_skills'].includes(skillname)){
                    update[`${skillname}`]=rankvalue;
                    update[`${skillname}_visible`]='visible';
                    ids_to_remove.push(id_value);
                }
            });
            console.info('update npc skills',update);
            
            setAttrs(update, {silent:true}, () => {
                console.log('updated skills');
                ids_to_remove.forEach(id => {
                    removeRepeatingRow(`repeating_skills_${id}`);
                });
                console.log('removed repeating skills');
                versioning(codeversion);
            });
            });
    });
};

const version_202_203 = () => {
    const codeversion = 2.03
    const update ={}
    console.log('verion:',codeversion);
    update['version'] = codeversion;
    const old_named_skills=['art','craft','pilot','military_science','science'];
    const old_adaptation = ['violence_1','violence_2','violence_3','helplessness_1','helplessness_2','helplessness_3'];
    const old_named_skills_names=old_named_skills.map(x=> `${x}_name`)
    getAttrs(old_adaptation.concat(old_named_skills_names).concat(old_named_skills).concat(['willpower_points_max','charisma_score']),(values) =>{
        if (values.hasOwnProperty('art_name')){
            const art_value=setMinMax(values[`art`]);
            const art_name = values[`art_name`];
            update[`art_1`]=art_value;
            update[`art_1_name`]=art_name;
        }
        if (values.hasOwnProperty('craft_name')){
            const craft_value = setMinMax(values[`craft`]);
            const craft_name  = values[`craft_name`];
            update[`craft_1`]=craft_value;
            update[`craft_1_name`]=craft_name;
        }
        // complete for pilot, military_science, science
        if (values.hasOwnProperty('pilot')) {
            const pilot_value= setMinMax(values[`pilot`]);
            const pilot_name = values[`pilot_name`];
            update[`pilot_1`] = pilot_value;
            update[`pilot_1_name`] = pilot_name;
        }

                
        if (values.hasOwnProperty('military_science')) {
            const military_science_value = setMinMax(values[`military_science`]);
            const military_science_name = values[`military_science_name`];
            update[`military_science_1`] = military_science_value;
            update[`military_science_1_name`] = military_science_name;
        }

        if (values.hasOwnProperty('science')) {
            const science_value = setMinMax(values[`science`]);
            const science_name = values[`science_name`];
            update[`science_1`] = science_value;
            update[`science_1_name`] = science_name;
        }

        if (values.hasOwnProperty('violence_1')) {
            const violence_1 = values[`violence_1`];
            const violence_2 = values[`violence_2`];
            const violence_3 = values[`violence_3`];
            var violence = -1;
            if (violence_1 ==1) {violence =0}
            if (violence_2 ==2) {violence =1}
            if (violence_3 ==3) {violence =2}
            update[`violence`] = violence;
            if (violence ==2) {update[`violence_adapted`]==1}
        }
        if (values.hasOwnProperty('helplessness_1')) {
            const helplessness_1 = values[`helplessness_1`];
            const helplessness_2 = values[`helplessness_2`];
            const helplessness_3 = values[`helplessness_3`];
            var helplessness = -1;
            if (helplessness_1 ==1) {helplessness =0}
            if (helplessness_2 ==2) {helplessness =1}
            if (helplessness_3 ==3) {helplessness =2}
            update[`helplessness`] = helplessness;
            if (helplessness ==2) {update[`helplessness_adapted`]==1}
        }
        
        setAttrs(update, {silent:true}, () => {
            console.log('updated named skills and adaptations');
            console.info(update);
            versioning(codeversion);
        });
    });
};

const version_203_204= () => {
    const codeversion = 2.04;
    const update ={};
    console.log('verion:',codeversion);
    update['version'] = codeversion;
  
    getAttrs(['willpower_points_max','charisma_score'],values => {
        getSectionIDs('bonds',ids => {
            const repfields=[];
            ids.forEach(id => {
                repfields.push(`repeating_bonds_${id}_score`);
            });
            getAttrs(repfields,bond_values => {
                const willpower_points_max=values['willpower_points_max'];
                const charisma_score = values['charisma_score'];

                repfields.forEach(field => {
                    if ((parseInt(bond_values[field])||0)>=willpower_points_max){
                        update[field]=charisma_score;
                        update[`${field}_old`]=charisma_score;
                    }
                });

                setAttrs(update, {silent:true}, () => {
                    console.log('updated named skills and adaptations');
                    console.info(update);
                    versioning(codeversion);
                });
                
            });
        });
    });
};

const version_204_205 = () => {
    const codeversion = 2.05;
    const update ={};
    console.log('verion:',codeversion);
    update['version'] = codeversion;
    getAttrs(['sheet_type','breaking_point','breaking_point_max'], values => {
        if (values[`sheet_type`] !== 'handler'){
            current_bp=parseInt(values[`breaking_point`])||0;
            max_bp=parseInt(values[`breaking_point_max`])||0;
            update[`reached_breaking_point`]=current_bp<max_bp ? 1 : 0;
            
        }
        setAttrs(update, {silent:true}, () => {
            console.log('updated reached breaking point');
            console.info(update);
            versioning(codeversion);
        });
    });
};


const version_205_206 = () => {
    const codeversion = 2.06;
    const update ={};
    console.log('verion:',codeversion);
    update['version'] = codeversion;
    
    setAttrs(update, {silent:true}, () => {
        console.log('now repeating section will update when you level up failed skills');
        console.info(update);
        versioning(codeversion);
    });
};