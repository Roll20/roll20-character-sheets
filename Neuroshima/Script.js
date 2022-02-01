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

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

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
    let zr_b = clamp((parseInt(values.zrecznosc_base)||0), 1, 40);
    let pc_b = clamp((parseInt(values.percepcja_base)||0), 1, 40);
    let ch_b = clamp((parseInt(values.charakter_base)||0), 1, 40);
    let sp_b = clamp((parseInt(values.spryt_base)||0), 1, 40);
    let bd_b = clamp((parseInt(values.budowa_base)||0), 1, 40);

    let zr =  zr_b + (parseInt(values.mod_zrecznosc)||0);
    let pc =  pc_b + (parseInt(values.mod_percepcja)||0);
	let ch =  ch_b + (parseInt(values.mod_charakter)||0);
    let sp =  sp_b + (parseInt(values.mod_spryt)||0);
	let bd =  bd_b + (parseInt(values.mod_budowa)||0);
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
	  
      "zrecznosc_base": zr_b,
      "percepcja_base": pc_b,
      "charakter_base": ch_b,
      "spryt_base": sp_b,
      "budowa_base": bd_b,

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
const wsplist = [
    "zrecznosc",
    "percepcja",
    "charakter",
    "spryt",
    "budowa"
];

const W_ZR = "zrecznosc";
const W_PC = "percepcja";
const W_CH = "charakter";
const W_SP = "spryt";
const W_BD = "budowa";

const wsp2accusative = {
    "zrecznosc":"zręczność",
    "percepcja":"percepcję",
    "charakter":"charakter",
    "spryt":"spryt",
    "budowa":"budowę"
};

const wsp2genitive = {
    "zrecznosc":"zręczności",
    "percepcja":"percepcji",
    "charakter":"charakteru",
    "spryt":"sprytu",
    "budowa":"budowy"
}

const statslist = [
    "bijatyka",                         "bron_reczna",                  "rzucanie", 
    "pistolety",                        "karabiny",                     "bron_maszynowa",
    "luk",                              "kusza",                        "proca",
    "samochod",                         "ciezarowka",                   "motocykl",
    "kradziez_kieszonkowa",             "zwinne_dlonie",                "otwieranie_zamkow",
    
    "wyczucie_kierunku",                "tropienie",                    "przygotowanie_pulapki",
    "nasluchiwanie",                    "wypatrywanie",                 "czujnosc",
    "skradanie_sie",                    "ukrywanie_sie",                "maskowanie",
    "lowiectwo",                        "zdobywanie_wody",              "znajomosc_terenu",
    
    "perswazja",                        "zastraszanie",                 "zdolnosci_przywodcze",     
    "postrzeganie_emocji",              "blef",                         "opieka_nad_zwierzetami",
    "odpornosc_na_bol",                 "niezlomnosc",                  "morale",
    
    "leczenie_ran",                     "leczenie_chorob",              "pierwsza_pomoc",
    "mechanika",                        "elektronika",                  "komputery",
    "maszyny_ciezkie",                  "wozy_bojowe",                  "kutry",
    "rusznikarstwo",                    "wyrzutnie",                    "materialy_wybuchowe",
    
    "plywanie",                         "wspinaczka",                   "kondycja",
    "jazda_konna",                      "powozenie",                    "ujezdzanie"
];

const stats2wsp = {
    "bijatyka" : W_ZR,                  "bron_reczna":W_ZR,             "rzucanie":W_ZR,
    "pistolety":W_ZR,                   "karabiny": "zrecznosc",        "bron_maszynowa":W_ZR,
    "luk":W_ZR,                         "kusza":W_ZR,                   "proca":W_ZR,
    "samochod":W_ZR,                    "ciezarowka":W_ZR,              "motocykl":W_ZR,
    "kradziez_kieszonkowa":W_ZR,        "zwinne_dlonie":W_ZR,           "otwieranie_zamkow":W_ZR,
    
    "wyczucie_kierunku":W_PC,           "tropienie":W_PC,               "przygotowanie_pulapki":W_PC,
    "nasluchiwanie":W_PC,               "wypatrywanie":W_PC,            "czujnosc":W_PC,
    "skradanie_sie":W_PC,               "ukrywanie_sie":W_PC,           "maskowanie":W_PC,
    "lowiectwo":W_PC,                   "zdobywanie_wody":W_PC,         "znajomosc_terenu":W_PC,
    
    "perswazja":W_CH,                   "zastraszanie":W_CH,            "zdolnosci_przywodcze":W_CH,     
    "postrzeganie_emocji":W_CH,         "blef":W_CH,                    "opieka_nad_zwierzetami":W_CH,
    "odpornosc_na_bol":W_CH,            "niezlomnosc":W_CH,             "morale":W_CH,
    
    "leczenie_ran":W_SP,                "leczenie_chorob":W_SP,         "pierwsza_pomoc":W_SP,
    "mechanika":W_SP,                   "elektronika":W_SP,             "komputery":W_SP,
    "maszyny_ciezkie":W_SP,             "wozy_bojowe":W_SP,             "kutry":W_SP,
    "rusznikarstwo":W_SP,               "wyrzutnie":W_SP,               "materialy_wybuchowe":W_SP,
    
    "plywanie":W_BD,                    "wspinaczka":W_BD,              "kondycja":W_BD,
    "jazda_konna":W_BD,                 "powozenie":W_BD,               "ujezdzanie":W_BD
};

const stats2genitive = {
    "bijatyka":"bijatyki",                              "bron_reczna":"walki bronią białą",                 "rzucanie":"rzucania",
    "pistolety":"strzelania z broni krótkiej",          "karabiny":"strzelania z broni długiej",            "bron_maszynowa":"strzelania z broni maszynowej",
    "luk":"łucznictwa",                                 "kusza":"kusznictwa",                               "proca":"procarstwa",
    "samochod":"prowadzenia samochodu",                 "ciezarowka":"prowadzenia samochodu ciężarowego",   "motocykl":"prowadzenia motocyklu",
    "kradziez_kieszonkowa":"kradzieży kieszonkowej",    "zwinne_dlonie":"zwinnych dłoni",                   "otwieranie_zamkow":"otwierania zamków",

    "wyczucie_kierunku":"wyczucia kierunku",            "tropienie":"tropienia",                            "przygotowanie_pulapki":"przygotowania pułapki",
    "nasluchiwanie":"nasłuchiwania",                    "wypatrywanie":"wypatrywania",                      "czujnosc":"czujności",
    "skradanie_sie":"skradania się",                    "ukrywanie_sie":"ukrywania się",                    "maskowanie":"maskowania",
    "lowiectwo":"łowiectwa",                            "zdobywanie_wody":"zdobywania wody",                "znajomosc_terenu":"znajomości terenu",

    "perswazja":"persfazji",                            "zastraszanie":"zastraszania",                      "zdolnosci_przywodcze":"zdolności przywódczych",
    "postrzeganie_emocji":"postrzegania emocji",        "blef":"blefu",                                     "opieka_nad_zwierzetami":"opieki nad zwierzętami",
    "odpornosc_na_bol":"odporności na ból",             "niezlomnosc":"niezłomności",                       "morale":"morale",

    "leczenie_ran":"leczenia ran",                      "leczenie_chorob":"leczenia chorób",                "pierwsza_pomoc":"pierwszej pomocy",
    "mechanika":"mechaniki",                            "elektronika":"elektroniki",                        "komputery":"komputerów",
    "maszyny_ciezkie":"znajomości maszyn ciężkich",     "wozy_bojowe":"prowadzenia wozów bojowych",         "kutry":"sterowania kutrem",
    "rusznikarstwo":"rusznikarstwa",                    "wyrzutnie":"obsługi wyrzutni",                     "materialy_wybuchowe":"znajomości materiałów wybuchowych",

    "plywanie":"pływania",                              "wspinaczka":"wspinaczki",                          "kondycja":"kondycji",
    "jazda_konna":"jeździectwa",                        "powozenie":"powożenia",                            "ujezdzanie":"ujeżdżania",
}

statslist.forEach((attribute) => {
    on(`change:${attribute}`, () => {
        getAttrs([attribute], (values) => {
            let statval = (parseInt(values[attribute])||0);
            statval = clamp(statval, 0, 20);
            let dictionary = {};
            dictionary[attribute] = statval;
            setAttrs(dictionary);
        });
    });

    on(`clicked:test_${attribute}`, (info) => {
        let genitive = stats2genitive[attribute];
        let skill_wsp_name = stats2wsp[attribute];
        let wsp_name = wsp2accusative[skill_wsp_name]
        startRoll(`&{template:test} {{base_wsp_name=${wsp_name}}} {{successes=[[0[computed value]]]}} {{finaldifficulty=[[0[computed value]]]}} {{skill-name=${genitive}}} {{roll1=[[1d20]]}} {{roll2=[[1d20]]}} {{roll3=[[1d20]]}}`, (results) => {
            let base_wsp = stats2wsp[attribute];
            
            getAttrs(["final_test_level", "modi_battle", "modi_open", base_wsp, attribute], function(values) {
                let skill = (parseInt(values[attribute])||0);
                let statbase = parseInt(values[base_wsp]);
                let modi_battle = (parseInt(values.modi_battle)||0);
                let modi_open = (parseInt(values.modi_open)||0);
                
                let skill_remaining = skill;
                let final_test_level = (parseInt(values.final_test_level)||0);

                const vals = [results.results.roll1.result, results.results.roll2.result, results.results.roll3.result];
                let x = 0;
                
                if( !modi_battle ){
                    // Slider - no skill means test is harder by 1 level. Git gud.
                    let advantage = skill ? parseInt(skill/4) : -1; 
                    final_test_level -= advantage;
                }
                
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
                
                let dice_style = [3,3,3];
                let vals_s = vals.concat().sort(function(a, b){return a-b});;
                const difficulties = [-2,0,2,5,8,11,15];
                let statreq = statbase - difficulties[final_test_level];
                let succ = 0;
                let bumped = 0;
                if (modi_open) {
                    let vals_sc = vals_s.concat();
                    while ( skill_remaining > 0 ) {
                        if (vals_sc[0] == vals_sc[1]) {
                            vals_sc[0] -= 1;
                            bumped = 1;
                        } else {
                            vals_sc[1] -= 1;
                            if (bumped) {
                                dice_style[0] = 1;
                            }
                        }
                        skill_remaining -= 1;
                    }
                    dice_style[1] = 0;
                    vals_sc[1] = vals_sc[1] < 1 ? 1 : vals_sc[1];
                    succ = statreq - vals_sc[1];
                } else {
                    for (x=0; x<3; ++x) {
                        if(vals_s[x] <= statreq) {
                            succ += 1;
                            dice_style[x] = 0;
                        } else {
                            if ( vals_s[x] - skill_remaining <= statreq && statreq > 0 ) {
                                skill_remaining -= (vals_s[x] - statreq);
                                succ += 1;
                                dice_style[x] = 1;
                            } else {
                                dice_style[x] = 2;
                            }
                        }
                    }    
                }

                let dice_unsort = [3,3,3];
                    for(x=0; x<3; ++x) {
                        for(let y=0; y<3; ++y) {
                            if(vals[x]==vals_s[y]) {
                                dice_unsort[x] = dice_style[y];
                                vals_s[y] = -1;
                                vals[x] = 0;
                                break;
                            }
                        }
                    }
                

                finishRoll(
                    results.rollId,
                    {
                        roll1: dice_unsort[0] ,
                        roll2: dice_unsort[1] ,
                        roll3: dice_unsort[2] ,
                        finaldifficulty: final_test_level,
                        successes : succ,
                    }
                );
            });
        });
    });
});



wsplist.forEach((wspolczyn) => {
    on(`clicked:test_${wspolczyn}`, (info) => {
        let genitive = wsp2genitive[wspolczyn];
        startRoll(`&{template:test-wsp} {{successes=[[0[computed value]]]}} {{finaldifficulty=[[0[computed value]]]}} {{wsp-name=${genitive}}} {{roll1=[[1d20]]}} {{roll2=[[1d20]]}} {{roll3=[[1d20]]}}`, (results) => {
            getAttrs(["final_test_level", "modi_battle", "modi_open", wspolczyn], function(values) {
                let statbase = parseInt(values[wspolczyn]);
                let modi_battle = (parseInt(values.modi_battle)||0);
                let modi_open = (parseInt(values.modi_open)||0);
                
                let final_test_level = (parseInt(values.final_test_level)||0);

                const vals = [results.results.roll1.result, results.results.roll2.result, results.results.roll3.result];
                let x = 0;
                
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
                
                let dice_style = [3,3,3];
                let vals_s = vals.concat().sort(function(a, b){return a-b});;
                const difficulties = [-2,0,2,5,8,11,15];
                let statreq = statbase - difficulties[final_test_level];
                let succ = 0;
                if (modi_open) {
                    succ = statreq - vals_s[1];
                    dice_style[1] = 0;
                } else {
                    for (x=0; x<3; ++x) {
                        if(vals_s[x] <= statreq) {
                            succ += 1;
                            dice_style[x] = 0;
                        } else {
                            dice_style[x] = 2;
                        }
                    }    
                }

                let dice_unsort = [3,3,3];
                    for(x=0; x<3; ++x) {
                        for(let y=0; y<3; ++y) {
                            if(vals[x]==vals_s[y]) {
                                dice_unsort[x] = dice_style[y];
                                vals_s[y] = -1;
                                vals[x] = 0;
                                break;
                            }
                        }
                    }
                

                finishRoll(
                    results.rollId,
                    {
                        roll1: dice_unsort[0] ,
                        roll2: dice_unsort[1] ,
                        roll3: dice_unsort[2] ,
                        finaldifficulty: final_test_level,
                        successes : succ,
                    }
                );
            });
        });
    });
});

/*************************** ROLL HANDLERS ************************/
/******************************************************************/