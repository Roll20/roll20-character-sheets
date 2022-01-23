/* ===== PARAMETERS ==========
destinations = the name of the attribute that stores the total quantity
section = name of repeating fieldset, without the repeating_
fields = the name of the attribute field to be summed
      can be a single attribute: 'weight'
      or an array of attributes: ['weight','number','equipped']
extras: everything after the fields parameter is optional and can be in any order:
    'ceil'
    'round'
    'floor'
    'ceil: 3'
    'round: -2'
    'round: equipment_weight, equipment_cost|2
        you want to round the final total. 
        If you supply a field name, it will round just that total. You can supply multiple fields, separated by commas.
        If you supply a number, it will round to that many digits. 
        round:1 rounds to tenths; floor:-3 rounds down to thousands, so 3567 would be shown as 3000.
        If you dont supply a number, it assumes 0, and returns an integer (whole numbers).
        IMPORTANT: if you list ANY field, then ALL fields to be rounded must be specifically stated.
        Don't do this: floor:equipment_weight|2, round,
    
    'multiplier: 2'
    'multiplier:equipment_weight|2'
    'multiplier: equipment_weight|2, equipment_cost|3'
        Multiplier will apply a multiple to the final total. You can multiple all fields, or specific fields.
        It doesnt apply to attributes being added from outside the repeating section.
        Multiplier can be negative, representing a subtraction.

    'an_attribute'
    'an_attribute:-1'
    'an_attribute:0.5'
    'an_attribute:equipment_cost'
    'an_attribute:equipment_cost|-1'
    'an_attribute:equipment_cost|-1,equipment_weight|2'
        You can also list attributes from outside the repeating section. Don't try to add attributes from other repeating sections.
        by default, the listed attribute will be added to all fields.
        You can list one or more fields, and it will only be added to those fields.
        You can list a number: the attribute will be multiplied by that amount. So -1 subtracts the attribute.
*/
const repeatingSum = (destinations, section, fields) => {
    if (!Array.isArray(destinations)) destinations = [destinations.replace(/\s/g, '').split(',')];
    if (!Array.isArray(fields)) fields = [fields.replace(/\s/g, '').split(',')];
    getSectionIDs(`repeating_${section}`, idArray => {
        const attrArray = idArray.reduce((m, id) => [...m, ...(fields.map(field => `repeating_${section}_${id}_${field}`))], []);
        getAttrs([...attrArray], v => {
            const getValue = (section, id, field) => v[`repeating_${section}_${id}_${field}`] === 'on' ? 1 : parseFloat(v[`repeating_${section}_${id}_${field}`]) || 0;
            const commonMultipliers = (fields.length <= destinations.length) ? [] : fields.splice(destinations.length, fields.length - destinations.length);
            const output = {};
            destinations.forEach((destination, index) => {
                output[destination] = idArray.reduce((total, id) => total + getValue(section, id, fields[index]) * commonMultipliers.reduce((subtotal, mult) => subtotal * getValue(section, id, mult), 1), 0);
            });
            setAttrs(output);
        }); 
    }); 
};

/******************************************************************/
/****************************** TABS ******************************/
const buttonlist = ["wspolczynniki","umiejetnosci","inwentarz"];
    buttonlist.forEach(button => {
        on(`clicked:${button}`, function() {
            setAttrs({
                sheetTab: button
            });
        });
    });
/****************************** TABS ******************************/
/******************************************************************/
/******************************************************************/
/**************************** FIELDSETS ***************************/
on('change:repeating_injuries-general:injury_general_penalty remove:repeating_injuries-general', function() {
		repeatingSum("total_wounds_general","injuries-general","injury_general_penalty");
});
on('change:repeating_injuries-head:injury_head_penalty remove:repeating_injuries-head', function() {
		repeatingSum("total_wounds_head","injuries-head","injury_head_penalty");
});
on('change:repeating_injuries-torso:injury_torso_penalty remove:repeating_injuries-torso', function() {
		repeatingSum("total_wounds_torso","injuries-torso","injury_torso_penalty");
});
on('change:repeating_injuries-left-hand:injury_left_hand_penalty remove:repeating_injuries-left-hand', function() {
		repeatingSum("total_wounds_left_hand","injuries-left-hand","injury_left_hand_penalty");
});
on('change:repeating_injuries-left-foot:injury_left_foot_penalty remove:repeating_injuries-left-foot', function() {
		repeatingSum("total_wounds_left_foot","injuries-left-foot","injury_left_foot_penalty");
});
on('change:repeating_injuries-right-hand:injury_right_hand_penalty remove:repeating_injuries-right-hand', function() {
		repeatingSum("total_wounds_right_hand","injuries-right-hand","injury_right_hand_penalty");
});
on('change:repeating_injuries-right-foot:injury_right_foot_penalty remove:repeating_injuries-right-foot', function() {
		repeatingSum("total_wounds_right_foot","injuries-right-foot","injury_right_foot_penalty");
});

on('change:total_wounds_general change:total_wounds_head change:total_wounds_torso change:total_wounds_left_hand change:total_wounds_left_foot change:total_wounds_right_hand change:total_wounds_right_foot', function () {
	getAttrs(["total_wounds_general", "total_wounds_head", "total_wounds_torso", "total_wounds_left_hand", 
		"total_wounds_left_foot", "total_wounds_right_hand", "total_wounds_right_foot"], function(values) {
			let wounds =	parseInt(values.total_wounds_general||0) + 
							parseInt(values.total_wounds_head||0) + 
							parseInt(values.total_wounds_torso||0) + 
							parseInt(values.total_wounds_left_hand||0) +
							parseInt(values.total_wounds_left_foot||0) +
							parseInt(values.total_wounds_right_hand||0) +
							parseInt(values.total_wounds_right_foot||0);
			setAttrs({"total_wounds":wounds});
		});
});


on('change:repeating_injuries-general:injury_general_type remove:repeating_injuries-general', function() {
		repeatingSum("total_damage_general","injuries-general","injury_general_type");
});
on('change:repeating_injuries-head:injury_head_type remove:repeating_injuries-head', function() {
		repeatingSum("total_damage_head","injuries-head","injury_head_type");
});
on('change:repeating_injuries-torso:injury_torso_type remove:repeating_injuries-torso', function() {
		repeatingSum("total_damage_torso","injuries-torso","injury_torso_type");
});
on('change:repeating_injuries-left-hand:injury_left_hand_type remove:repeating_injuries-left-hand', function() {
		repeatingSum("total_damage_left_hand","injuries-left-hand","injury_left_hand_type");
});
on('change:repeating_injuries-left-foot:injury_left_foot_type remove:repeating_injuries-left-foot', function() {
		repeatingSum("total_damage_left_foot","injuries-left-foot","injury_left_foot_type");
});
on('change:repeating_injuries-right-hand:injury_right_hand_type remove:repeating_injuries-right-hand', function() {
		repeatingSum("total_damage_right_hand","injuries-right-hand","injury_right_hand_type");
});
on('change:repeating_injuries-right-foot:injury_right_foot_type remove:repeating_injuries-right-foot', function() {
		repeatingSum("total_damage_right_foot","injuries-right-foot","injury_right_foot_type");
});
on('change:total_damage_general change:total_damage_head change:total_damage_torso change:total_damage_left_hand change:total_damage_left_foot change:total_damage_right_hand change:total_damage_right_foot', function () {
	getAttrs(["total_damage_general", "total_damage_head", "total_damage_torso", "total_damage_left_hand",
		"total_damage_left_foot", "total_damage_right_hand", "total_damage_right_foot"], function(values) {
			let damage = 	parseInt(values.total_damage_general||0) + 
							parseInt(values.total_damage_head||0) + 
							parseInt(values.total_damage_torso||0) + 
							parseInt(values.total_damage_left_hand||0) +
							parseInt(values.total_damage_left_foot||0) +
							parseInt(values.total_damage_right_hand||0) +
							parseInt(values.total_damage_right_foot||0);
			setAttrs({"total_damage":damage});
		});
});

/**************************** FIELDSETS ***************************/
/******************************************************************/

/******************************************************************/
/******************* BASE STATS / WSPÓŁCZYNNIKI *******************/
on("change:zrecznosc_base change:mod_zrecznosc change:percepcja_base change:mod_percepcja change:charakter_base change:mod_charakter change:spryt_base change:mod_spryt change:budowa_base change:mod_budowa sheet:opened", function() {  
  getAttrs([	"zrecznosc_base","mod_zrecznosc", 
				"percepcja_base","mod_percepcja",
				"charakter_base","mod_charakter",
				"spryt_base","mod_spryt",
				"budowa_base", "mod_budowa"], function(values) {
    let zr = (parseInt(values.zrecznosc_base)||0) + (parseInt(values.mod_zrecznosc)||0);
    let pc = (parseInt(values.percepcja_base)||0) + (parseInt(values.mod_percepcja)||0);
	let ch = (parseInt(values.charakter_base)||0) + (parseInt(values.mod_charakter)||0);
    let sp = (parseInt(values.spryt_base)||0) + (parseInt(values.mod_spryt)||0);
	let bd = (parseInt(values.budowa_base)||0) + (parseInt(values.mod_budowa)||0);
    setAttrs({                            
      "zr_df_0": zr+2,
	  "pc_df_0": pc+2,
	  "ch_df_0": ch+2,
	  "sp_df_0": sp+2,
	  "bd_df_0": bd+2,
	  
	  "zr_df_1": zr,
	  "pc_df_1": pc,
	  "ch_df_1": ch,
	  "sp_df_1": sp,
	  "bd_df_1": bd,
	  
	  "zrecznosc": zr,
	  "percepcja": pc,
	  "charakter": ch,
	  "spryt": sp,
	  "budowa": bd,
	  
	  "zr_df_2": zr-2,
	  "pc_df_2": pc-2,
	  "ch_df_2": ch-2,
	  "sp_df_2": sp-2,
	  "bd_df_2": bd-2,
	  
	  "zr_df_3": zr-5,
	  "pc_df_3": pc-5,
	  "ch_df_3": ch-5,
	  "sp_df_3": sp-5,
	  "bd_df_3": bd-5,
	  
	  "zr_df_4": zr-8,
	  "pc_df_4": pc-8,
	  "ch_df_4": ch-8,
	  "sp_df_4": sp-8,
	  "bd_df_4": bd-8,
	  
	  "zr_df_5": zr-11,
	  "pc_df_5": pc-11,
	  "ch_df_5": ch-11,
	  "sp_df_5": sp-11,
	  "bd_df_5": bd-11,
	  
	  "zr_df_6": zr-15,
	  "pc_df_6": pc-15,
	  "ch_df_6": ch-15,
	  "sp_df_6": sp-15,
	  "bd_df_6": bd-15,
    });
  });
});
/******************* BASE STATS / WSPÓŁCZYNNIKI *******************/
/******************************************************************/
/******************************************************************/
/************************** ROLL PARAMETERS ***********************/
const startingPercent = [-20, 0, 11, 31, 61, 91, 121]
const lastPassingPercent = [-1,10,30,60,90,120,0xFFFFFF];
const levelRadioValues = ["0","1","2","3","4","5","6"];
const levelLabels = ["Łatwy", "Przeciętny", "Problematyczny", "Trudny", "Bardzo Trudny", "Cholernie Trudny", "Fart"];
  levelRadioValues.forEach(function(value) {
    on(`clicked:level_${value}`, function() {
      setAttrs({
        ["level"]: value
      });
    });
});

on("change:level change:modi_battle change:modi_open change:modi_penalties change:total_wounds change:modi_armor_penalties change:total_armor_penalties change:custom_penalty change:modi_custom_penalty", function() {  
    getAttrs([	"level", "modi_battle","modi_open", "modi_penalties","total_wounds", 
    "modi_armor_penalties","total_armor_penalties", "custom_penalty", "modi_custom_penalty"], function(values) {
        let level = ((parseInt(values.level))||0);
        let modi_battle = (parseInt(values.modi_battle)||0);
        let modi_open = (parseInt(values.modi_open)||0);
        let modi_penalties = (parseInt(values.modi_penalties)||0);
        let total_wounds = (parseInt(values.total_wounds)||0);
        let modi_armor_penalties = (parseInt(values.modi_armor_penalties)||0);
        let total_armor_penalties = (parseInt(values.total_armor_penalties)||0);
        let custom_penalty = (parseInt(values.custom_penalty)||0);
        let modi_custom_penalty = (parseInt(values.modi_custom_penalty)||0);

        let final_test_penalty =(   startingPercent[level] + 
                                    ( modi_penalties ? total_wounds : 0 ) +
                                    ( modi_armor_penalties ? total_armor_penalties: 0 ) +
                                    ( modi_custom_penalty ? custom_penalty : 0 )
                                );
        let final_test_level = 0;
        while( final_test_penalty > lastPassingPercent[final_test_level] ) {
            final_test_level++;
            if(final_test_level >= lastPassingPercent.length ) {
                final_test_level = (lastPassingPercent.length - 1);
                break;
            }
        }
        let final_test_level_label = levelLabels[final_test_level];
        setAttrs({                            
            "final_test_level": final_test_level,
            "final_test_penalty": final_test_penalty,
            "final_test_level_display": final_test_level_label
        });
    });
});
/************************** ROLL PARAMETERS ***********************/
/******************************************************************/
/******************************************************************/
/*************************** ROLL HANDLERS ************************/
const stats2wsp = {
    "bijatyka" : "zrecznosc",
    "bron_reczna" : "zrecznosc",
    "rzucanie" : "zrecznosc",
    "pistolety" : "zrecznosc",
    "pistolety" : "zrecznosc",
    "karabiny": "zrecznosc",
    "bron_maszynowa" : "zrecznosc",
    "luk" : "zrecznosc",
    "kusza" : "zrecznosc",
    "proca" : "zrecznosc",
    "samochod" : "zrecznosc",
    "ciezarowka" : "zrecznosc",
    "motocykl" : "zrecznosc",
    "kradziez_kieszonkowa" : "zrecznosc",
    "zwinne_dlonie" : "zrecznosc",
    "otwieranie_zamkow" : "zrecznosc"
};
 on('clicked:test', (info) => {
        startRoll("&{template:test} {{base_wsp_name=[[0[computed value]]]}} {{successes=[[0[computed value]]]}} {{finaldifficulty=[[0[computed value]]]}} {{skill-name=bijatyki}} {{roll1=[[1d20]]}} {{roll2=[[1d20]]}} {{roll3=[[1d20]]}}", (results) => {
            getAttrs(["final_test_level", "bijatyka"], function(values) {
                let skill_name = "bijatyka"   
                let skill = (parseInt(values.bijatyka)||0);

                let skill_remaining = skill;
                let final_test_level = (parseInt(values.final_test_level)||0);
                let skill_wsp_name = stats2wsp[skill_name];

                const total = results.results.roll1.result + results.results.roll2.result + results.results.roll3.result;
                const vals = [results.results.roll1.result, results.results.roll2.result, results.results.roll3.result];
                const computed = total + 10;
                let x = 0;
                
                // Slider - no skill means test is harder by 1 level. Git gud.
                let advantage = skill ? parseInt(skill/4) : -1; 
                final_test_level -= advantage;
                
                // Critical rolls ( 1 / 20 )
                for (x=0; x<3; ++x) {
                    if(vals[x]==1)
                    {
                        final_test_level -= 1;
                    }
                    if(vals[x]==20)
                    {
                        final_test_level += 1;
                    }
                }
                
                // Constrain
                final_test_level = final_test_level < 0 ? 0 : (final_test_level > 6 ? 6 : final_test_level);

                // Successes and failures
                let statbase = 10;
                let dice_style = [0,1,2,3];
                const difficulties = [-2,0,2,5,8,11,15];
                
                let statreq = statbase - difficulties[final_test_level];
                let succ = 0;
                for (x=0; x<3; ++x) {
                    if(vals[x] <= statreq) {
                        succ += 1;
                    } else {
                        if ( vals[x] + skill_remaining <= statreq ) {
                            skill_remaining -= (statreq - vals[x]);
                            succ += 1;
                            dice_style[x] = 1;
                        } else if ( skill_remaining ){
                            skill_remaining = 0;
                            dice_style[x] = 2;
                        } else {
                            dice_style[x] = 3;
                        }
                    }
                }
                

                finishRoll(
                    results.rollId,
                    {
                        roll1: dice_style[0],
                        roll2: dice_style[1],
                        roll3: dice_style[2],
                        finaldifficulty: final_test_level,
                        successes : succ,
                        base_wsp_name : skill_wsp_name

                    }
                );
            });
        });
});

on('clicked:test2', (info) => {
    startRoll("&{template:test2} {{name=Test2}} {{roll1=[[3d20]]}}", (results) => {
        const total = results.results.roll1.result;
        const computed = total % 4;

        finishRoll(
            results.rollId,
            {
                roll1: computed,
            }
        );
    });
});

/*************************** ROLL HANDLERS ************************/
/******************************************************************/