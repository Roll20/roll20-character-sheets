const versioning = (version) => {
    console.log(`%c Versioning, ${version}`, 'color: green; font-weight:bold');
    if (version < 1.05) {
       version_0_105();
    } 
    if (version <1.5) {
        version_105_150();
    }
    if (version<1.7) {
        version_150_170();
    }
    if (version<2.0) {
        version_170_200();
    }
    if (version<2.01) {
        version_200_201();
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
    
    getSectionIDs("weapons",function(idarray){
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
           console.info(update);
            idarray.forEach(id=>{
                console.log(`%c ${id}`, 'color: green; font-weight:bold');
                if (v[`repeating_weapons_${id}_damage`]===""){
                    update["repeating_weapons_"+id+"_hasdamage"]="0";
           console.info(update);
                } else{
                    update["repeating_weapons_"+id+"_hasdamage"]="1";
           console.info(update);
                }
                    
                if (v[`repeating_weapons_${id}_lethality_percent`]>0){
                    update["repeating_weapons_"+id+"_haslethality"]="1";
           console.info(update);
                } else {
                    update["repeating_weapons_"+id+"_haslethality"]="0";
           console.info(update);
                }
                if (v['sheet_type']==='npc'){
                    update["repeating_weapons_"+id+"_weapons"]=v[`repeating_weapons_${id}_attack`];
                }
            });
            
           console.log(`%c update`, 'color: green; font-weight:bold');
           console.info(update);
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
    console.info(update);
    setAttrs(update, //Update attributes
            {silent:true},  // will not trigger sheet workers
            versioning(codeversion)); // call versioning again
};

// UPDATE TO VERSION 2.0
const version_170_200 = () => {
    let codeversion=2.0;
    let update={};
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
        console.info('versioning',update);
        setAttrs(update, //Update attributes
                {silent:true},  // will not trigger sheet workers
                versioning(codeversion)); // call versioning again
    });

};
// UPDATE TO VERSION 2.0
const version_200_201 = () => {
    let codeversion=2.01;
    let update1={};
    update1['version']=codeversion;
    
        // UPDATE NAMES FOR SPECIAL TRAINING AND WEAPONS AND TRIGGER TEST
    const sectionDetails = [
        {section:'repeating_special', fields: ['name','special_training','skill_or_stat_used','skill_span']},
        {section:'repeating_weapons', fields: ['name','weapons','skill_percent','skill_span','ammo','hasammo','ammo_max']}];
    
    getSectionIDs(sectionDetails, (v)=>{
            const repspecial= v.filter(el => el.startsWith(`repeating_special`));
            const repweapons= v.filter(el => el.startsWith(`repeating_weapons`));
            console.log('in getSectionIDs section',section);
           // const fullarray=[].concat(repspecial,repweapons);
            //console.info('fullarray',fullarray);
            getAttrs(v,(values) => {
                console.info('fullarray',values);
                            
                const repweapons_oldname=repweapons.filter(el => el.endsWith('_weapons'));
                const repspecial_oldname=repspecial.filter(el => el.endsWith('_special_training'));
                const repweapons_name=repweapons.filter(el => el.endsWith('_name'));
                const repspecial_name=repspecial.filter(el => el.endsWith('_name'));
                const repspecial_span=repweapons.filter(el => el.endsWith('_skill_span'));
                const repspecial_skill=repspecial.filter(el => el.endsWith('_skill_or_stat_used'));
                const repweapons_span=repweapons.filter(el => el.endsWith('_skill_span'));
                const repweapons_skill=repspecial.filter(el => el.endsWith('_skill_percent'));
                const repweapons_ammo=repweapons.filter(el => el.endsWith('_ammo'));
                const repweapons_hasammo=repweapons.filter(el => el.endsWith('_hasammo'));
                const repweapons_ammo_max=repweapons.filter(el => el.endsWith('_ammo_max'));

                console.log(`%c repweapons_oldname`, 'color: green; font-weight:bold');
                console.info(repweapons_oldname);
                console.log(`%c repspecial_oldname`, 'color: green; font-weight:bold');
                console.info(repspecial_oldname);
                console.log(`%c repweapons_name`, 'color: green; font-weight:bold');
                console.info(repweapons_name);
                console.log(`%c repspecial_name`, 'color: green; font-weight:bold');
                console.info(repspecial_name);
                console.log(`%c repspecial_span`, 'color: green; font-weight:bold');
                console.info(repspecial_span);
                console.log(`%c repspecial_skill`, 'color: green; font-weight:bold');
                console.info(repspecial_skill);
                console.log(`%c repweapons_span`, 'color: green; font-weight:bold');
                console.info(repweapons_span);
                console.log(`%c repweapons_skill`, 'color: green; font-weight:bold');
                console.info(repweapons_skill);
                console.log(`%c repweapons_ammo`, 'color: green; font-weight:bold');
                console.info(repweapons_ammo);
                console.log(`%c repweapons_hasammo`, 'color: green; font-weight:bold');
                console.info(repweapons_hasammo);
                console.log(`%c repweapons_ammo_max`, 'color: green; font-weight:bold');
                console.info(repweapons_ammo_max);


                for (i=0; i<repweapons_name ;i++){
                    if (values[repweapons_oldname[i]]!='') {
                        update1[repweapons_name[i]]=values[repweapons_oldname[i]];
                        values[repweapons_oldname[i]]='';
                        update1[repweapons_span[i]]=values[repweapons_skill[i]];
                    }
                    
                }
                
                for (i=0; i<repspecial_name ;i++){
                    if (values[repspecial_oldname[i]]!='') {
                        update1[repspecial_name[i]]=values[repspecial_oldname[i]];
                        update1[repspecial_oldname[i]]='';
                        update1[repspecial_span[i]]=values[repspecial_skill[i]];
                    }
                }

                for (i=0; i<repweapons_ammo ;i++){
                    if (values[repweapons_ammo[i]]!='') {
                        update1[repweapons_ammo_max[i]]=values[repweapons_ammo[i]];
                        update1[repweapons_hasammo[i]]=values[repweapons_ammo[i]]>0 ? '1' : '0';
                    }
                }

                console.log(`%c update`, 'color: green; font-weight:bold');
                console.info('versioning',update1);
                setAttrs(update1, //Update attributes
                        {silent:true},  // will not trigger sheet workers
                        versioning(codeversion)); // call versioning again
            });

    

    });
};
