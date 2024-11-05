"use strict";

on('clicked:reset_all', () =>{
    const update = {};
    resetStats(update,false);
    resetBonds(update);
    resetAdaptations(update);
    resetEquipment(update);
    resetSkills(update);
    resetHistory(update);
    // write all the reset functions here


    setAttrs(update, {silent: true}, () => {
        console.log('reset all');
        console.info(update);
        
    });
});
on('clicked:reset_stats', () =>{
    const update = {};
    resetStats(update);

    setAttrs(update, {silent: true}, () => {
        console.log('reset stats');
        console.info(update);
        
    });
});
on('clicked:reset_skills', () =>{
    const update = {};
    resetSkills(update);

    setAttrs(update, {silent: true}, () => {
        console.log('reset skills');
        console.info(update);
        
    });
});
on('clicked:reset_equipment', () =>{
    const update = {};
    resetEquipment(update);

    setAttrs(update, {silent: true}, () => {
        console.log('reset equipment');
        console.info(update);
        
    });
});
on('clicked:reset_breaking_point', () =>{
    const update = {};
    resetBreakingPoints(update);
    console.info(update);

});



const resetBreakingPoints = (update) => {
  getAttrs(['breaking_point_max', 'breaking_point', 'breaking_point_reset'], function (values) {
    console.log('breaking_point_reset:',values);
    var breaking_point_reset = parseInt(values.breaking_point_reset,10) || 0;

    update['breaking_point_max']= breaking_point_reset;
    update['breaking_point']= breaking_point_reset;
    update['breaking_point_reset']= breaking_point_reset;
    
    setAttrs(update, {silent: true}, () => {
        console.log('reset breaking points');
        console.info(update);
        
    });
  });
};


const resetStats = (update,reset_bonds=true) => {
    var array_to_reset = arrays['_stats'];
    const stat_score=arrays['_stats'].map(stat => stat+'_score');
    array_to_reset=array_to_reset.concat(stat_score);
    array_to_reset=array_to_reset.concat(arrays['_derived_stats'])
    array_to_reset=array_to_reset.concat(arrays['_derived_stats_max'])

    
    array_to_reset = array_to_reset;
    array_to_reset.forEach(stat => {
        update[stat] = '';
    });

    const old_values = [
        'sanity_points_old',
        'breaking_point_old',
    ];

    old_values.forEach(stat => {
        update[stat] = '';
    });


    const initial_flags=[
        'initial_san',
        'initial_con',
        'initial_str',
        'initial_hp',
    ];
    
    initial_flags.forEach(flag => {
        update[flag] = '1';
    });
    if (reset_bonds){
        getSectionIDs(`bonds`,(ids) => {
            
            ids.forEach(id => {
                update[`repeating_bonds_${id}_test`] = 'editable';
                update[`repeating_bonds_${id}_score`] = '';
            });
        });
    }
};

const resetSkills = (update) => {
    Object.entries(_initial_skills).forEach(([skill, value]) => {
        update[skill] = value;
        update[`${skill}_fail`] = value;
    });
    arrays['_editable_skills'].forEach(skill => {
        update[`${skill}_name`] = '';
        update[`${skill}_test`] = 0;
    });
    resetAllRepeatingSkills(update);
    resetAllSpecialAbilities(update);

};


const resetBonds= (update) => {
    getSectionIDs(`bonds`,(ids) => {
        ids.forEach(id => {
            removeRepeatingRow('repeating_bonds_'+id);
            console.log('removing repeating_bonds_'+id);
        });
    });
};

const resetAdaptations= (update) => {
    update['motivations'] = '';
    console.log(arrays['_adaptation']);
    arrays['_adaptation'].forEach(adaptation => {
        update[adaptation] = -1;
        update[`${adaptation}_adapted`] = 0;
    });
};

const resetAllWeapons= (update) => {
    getSectionIDs(`weapons`,(ids) => {
        ids.forEach(id => {
            removeRepeatingRow('repeating_weapons_'+id);
            console.log('removing repeating_weapons_'+id);

        });
    });
}

const resetAllRituals= (update) => {
    getSectionIDs(`rituals`,(ids) => {
        ids.forEach(id => {
            removeRepeatingRow('repeating_rituals_'+id);
            console.log('removing repeating_rituals_'+id);
        });
    });
}


const resetEquipment= (update) => {
    resetAllWeapons(update);
    resetAllRituals(update);
    update['armor_and_gear'] = '';
};


const resetAllRepeatingSkills= (update) => {
    getSectionIDs(`skills`,(ids) => {
        ids.forEach(id => {
            removeRepeatingRow('repeating_skills_'+id);
            console.log('removing repeating_skills_'+id);
        });
    });
}

const resetAllSpecialAbilities= (update) => {  
    getSectionIDs(`special`,(ids) => {
        console.log('special:'+ids);
        ids.forEach(id => {
            removeRepeatingRow('repeating_special_'+id);
            console.log('removing repeating_special_'+id);
        });
    });
}
const resetHistory = (update) => {
    console.log(arrays['_personal_data']);
    arrays['_personal_data'].forEach(data => {
        update[data] = '';
    });
    resetInjuries(update);
}

const resetInjuries = (update) => {
    update['injuries'] = '';
    update['injuries_first_aid'] = 0;
}
