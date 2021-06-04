var genefunk2090 = genefunk2090 || (function() {
	const version = 1.20;
	const displayControllers = ['sheet_view','advantage_state','character_type','whisper_state'],
	importControls = ['import','import_cancel'],
	abilityScores = {str:'strength',dex:'dexterity',con:'constitution',int:'intelligence',wis:'wisdom',cha:'charisma'},
	skillNames = ['athletics','acrobatics','drive','sleight_of_hand','stealth','bureaucracy','computers','investigation','life_science','mechanics','physical_science','social_science','streetwise','insight','perception','survival','deception','intimidation','performance','persuasion'],
	skillList = {athletics:'strength',acrobatics:'dexterity',drive:'dexterity',sleight_of_hand:'dexterity',stealth:'dexterity',bureaucracy:'intelligence',computers:'intelligence',investigation:'intelligence',life_science:'intelligence',mechanics:'intelligence',physical_science:'intelligence',social_science:'intelligence',streetwise:'intelligence',insight:'wisdom',perception:'wisdom',survival:'wisdom',deception:'charisma',intimidation:'charisma',performance:'charisma',persuasion:'charisma'},
	hackLevels = ['1st','2nd','3rd','4th','5th'],
	repeating_section_details = [
		{
			section:'repeating_equipment',
			fields:['name','quantity','weight','cost','mods','description','id']
		},
		{
			section:'repeating_hack',
			fields:['name','level','launch_time','duration','hack_type','source','action_proficiency','attack_enable_item','save_enable_item','damage_1_enable_item','damage_2_enable_item','attack_ability','attack_bonus','save_ability','save_type','dc_bonus','damage_1','critical_damage_1','damage_ability_1','damage_type_1','damage_2','critical_damage_2','damage_ability_2','damage_type_2','range','properties','description','id']
		},
		{
			section:'repeating_action',
			fields:['name','action_proficiency','attack_enable_item','save_enable_item','damage_1_enable_item','damage_2_enable_item','attack_ability','attack_bonus','save_ability','save_type','dc_bonus','damage_1','critical_damage_1','damage_ability_1','damage_type_1','damage_2','critical_damage_2','damage_ability_2','damage_type_2','range','properties','description','id']
		},
		{
			section:'repeating_trait',
			fields:['name','source','mods','description','id']
		}
	],
	cascades = {
		pc:{
			class_level:{
				name:'class_level',
				defaultValue:'',
				type:'text',
				affects:['level']
			},
			level:{
				name:'level',
				defaultValue:'',
				type:'number',
				calculation:'custom',
				affects:['proficiency']
			},
			proficiency:{
				name:'proficiency',
				defaultValue:'',
				type:'number',
				calculation:'2+floor((@{level}-1)/4)',
				affects:['variable']
			},
			ac_formula:{
				name:'ac_formula',
				defaultValue:'10+@{dexterity_mod}',
				type:'text',
				calculation:'custom',
				affects:['ac']
			},
			ac:{
				name:'ac',
				defaultValue:'10',
				type:'number',
				calculation:'@{ac_formula}',
				affects:[]
			},
			base_strength:{
				name:'base_strength',
				defaultValue:10,
				type:'number',
				affects:['strength']
			},
			base_dexterity:{
				name:'base_dexterity',
				defaultValue:10,
				type:'number',
				affects:['dexterity']
			},
			base_constitution:{
				name:'base_constitution',
				defaultValue:10,
				type:'number',
				affects:['constitution']
			},
			base_intelligence:{
				name:'base_intelligence',
				defaultValue:10,
				type:'number',
				affects:['intelligence']
			},
			base_wisdom:{
				name:'base_wisdom',
				defaultValue:10,
				type:'number',
				affects:['wisdom']
			},
			base_charisma:{
				name:'base_charisma',
				defaultValue:10,
				type:'number',
				affects:['charisma']
			},
			strength:{
				name:'strength',
				defaultValue:10,
				type:'number',
				calculation:'@{base_strength} @{strength_modded}',
				affects:['strength_mod']
			},
			dexterity:{
				name:'dexterity',
				defaultValue:10,
				type:'number',
				calculation:'@{base_dexterity} @{dexterity_modded}',
				affects:['dexterity_mod']
			},
			constitution:{
				name:'constitution',
				defaultValue:10,
				type:'number',
				calculation:'@{base_constitution} @{constitution_modded}',
				affects:['constitution_mod']
			},
			intelligence:{
				name:'intelligence',
				defaultValue:10,
				type:'number',
				calculation:'@{base_intelligence} @{intelligence_modded}',
				affects:['intelligence_mod']
			},
			wisdom:{
				name:'wisdom',
				defaultValue:10,
				type:'number',
				calculation:'@{base_wisdom} @{wisdom_modded}',
				affects:['wisdom_mod']
			},
			charisma:{
				name:'charisma',
				defaultValue:10,
				type:'number',
				calculation:'@{base_charisma} @{charisma_modded}',
				affects:['charisma_mod']
			},
			strength_mod:{
				name:'strength_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{strength}-10)/2)',
				affects:['athletics','strength_save','variable']
			},
			strength_save_proficiency:{
				name:'strength_save_proficiency',
				defaultValue:0,
				type:'text',
				affects:['strength_save']
			},
			strength_save:{
				name:'strength_save',
				defaultValue:0,
				type:'number',
				calculation:'@{strength_mod} + @{strength_save_proficiency}@{strength_save_modded}',
				affects:[]
			},
			dexterity_mod:{
				name:'dexterity_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{dexterity}-10)/2)',
				affects:['acrobatics','drive','sleight_of_hand','stealth','dexterity_save','initiative','variable']
			},
			dexterity_save_proficiency:{
				name:'dexterity_save_proficiency',
				defaultValue:0,
				type:'text',
				affects:['dexterity_save']
			},
			dexterity_save:{
				name:'dexterity_save',
				defaultValue:0,
				type:'number',
				calculation:'@{dexterity_mod} + @{dexterity_save_proficiency}@{dexterity_save_modded}',
				affects:[]
			},
			constitution_mod:{
				name:'constitution_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{constitution}-10)/2)',
				affects:['constitution_save','variable']
			},
			constitution_save_proficiency:{
				name:'constitution_save_proficiency',
				defaultValue:0,
				type:'text',
				affects:['constitution_save']
			},
			constitution_save:{
				name:'constitution_save',
				defaultValue:0,
				type:'number',
				calculation:'@{constitution_mod} + @{constitution_save_proficiency}@{constitution_save_modded}',
				affects:[]
			},
			intelligence_mod:{
				name:'intelligence_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{intelligence}-10)/2)',
				affects:['bureaucracy','computers','investigation','life_science','mechanics','physical_science','social_science','streetwise','intelligence_save','variable']
			},
			intelligence_save_proficiency:{
				name:'intelligence_save_proficiency',
				defaultValue:0,
				type:'text',
				affects:['intelligence_save']
			},
			intelligence_save:{
				name:'intelligence_save',
				defaultValue:0,
				type:'number',
				calculation:'@{intelligence_mod} + @{intelligence_save_proficiency}@{intelligence_save_modded}',
				affects:[]
			},
			wisdom_mod:{
				name:'wisdom_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{wisdom}-10)/2)',
				affects:['insight','perception','survival','wisdom_save','variable']
			},
			wisdom_save_proficiency:{
				name:'wisdom_save_proficiency',
				defaultValue:0,
				type:'text',
				affects:['wisdom_save']
			},
			wisdom_save:{
				name:'wisdom_save',
				defaultValue:0,
				type:'number',
				calculation:'@{wisdom_mod} + @{wisdom_save_proficiency}@{wisdom_save_modded}',
				affects:[]
			},
			charisma_mod:{
				name:'charisma_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{charisma}-10)/2)',
				affects:['deception','intimidation','performance','persuasion','charisma_save','variable']
			},
			charisma_save_proficiency:{
				name:'charisma_save_proficiency',
				defaultValue:0,
				type:'text',
				affects:['charisma_save']
			},
			charisma_save:{
				name:'charisma_save',
				defaultValue:0,
				type:'number',
				calculation:'@{charisma_mod} + @{charisma_save_proficiency}@{charisma_save_modded}',
				affects:[]
			},
			initiative:{
				name:'initiative',
				defaultValue:0,
				type:'number',
				calculation:'@{dexterity_mod}@{initiative_modded}',
				affects:[]
			},
			initiative_modded:{
				name:'initiative_modded',
				defaultValue:'',
				type:'text',
				affects:['initiative']
			},
			athletics_proficiency:{
				name:'athletics_proficiency',
				defaultValue:0,
				type:'text',
				affects:['athletics']
			},
			athletics:{
				name:'athletics',
				defaultValue:0,
				type:'number',
				calculation:'@{strength_mod} + @{athletics_proficiency}@{athletics_modded}',
				affects:[]
			},
			acrobatics_proficiency:{
				name:'acrobatics_proficiency',
				defaultValue:0,
				type:'text',
				affects:['acrobatics']
			},
			acrobatics:{
				name:'acrobatics',
				defaultValue:0,
				type:'number',
				calculation:'@{dexterity_mod} + @{acrobatics_proficiency}@{acrobatics_modded}',
				affects:[]
			},
			drive_proficiency:{
				name:'drive_proficiency',
				defaultValue:0,
				type:'text',
				affects:['drive']
			},
			drive:{
				name:'drive',
				defaultValue:0,
				type:'number',
				calculation:'@{dexterity_mod} + @{drive_proficiency}@{drive_modded}',
				affects:[]
			},
			sleight_of_hand_proficiency:{
				name:'sleight_of_hand_proficiency',
				defaultValue:0,
				type:'text',
				affects:['sleight_of_hand']
			},
			sleight_of_hand:{
				name:'sleight_of_hand',
				defaultValue:0,
				type:'number',
				calculation:'@{dexterity_mod} + @{sleight_of_hand_proficiency}@{sleight_of_hand_modded}',
				affects:[]
			},
			stealth_proficiency:{
				name:'stealth_proficiency',
				defaultValue:0,
				type:'text',
				affects:['stealth']
			},
			stealth:{
				name:'stealth',
				defaultValue:0,
				type:'number',
				calculation:'@{dexterity_mod} + @{stealth_proficiency}@{stealth_modded}',
				affects:[]
			},
			bureaucracy_proficiency:{
				name:'bureaucracy_proficiency',
				defaultValue:0,
				type:'text',
				affects:['bureaucracy']
			},
			bureaucracy:{
				name:'bureaucracy',
				defaultValue:0,
				type:'number',
				calculation:'@{intelligence_mod} + @{bureaucracy_proficiency}@{bureaucracy_modded}',
				affects:[]
			},
			computers_proficiency:{
				name:'computers_proficiency',
				defaultValue:0,
				type:'text',
				affects:['computers']
			},
			computers:{
				name:'computers',
				defaultValue:0,
				type:'number',
				calculation:'@{intelligence_mod} + @{computers_proficiency}@{computers_modded}',
				affects:[]
			},
			investigation_proficiency:{
				name:'investigation_proficiency',
				defaultValue:0,
				type:'text',
				affects:['investigation']
			},
			investigation:{
				name:'investigation',
				defaultValue:0,
				type:'number',
				calculation:'@{intelligence_mod} + @{investigation_proficiency}@{investigation_modded}',
				affects:[]
			},
			life_science_proficiency:{
				name:'life_science_proficiency',
				defaultValue:0,
				type:'text',
				affects:['life_science']
			},
			life_science:{
				name:'life_science',
				defaultValue:0,
				type:'number',
				calculation:'@{intelligence_mod} + @{life_science_proficiency}@{life_science_modded}',
				affects:[]
			},
			mechanics_proficiency:{
				name:'mechanics_proficiency',
				defaultValue:0,
				type:'text',
				affects:['mechanics']
			},
			mechanics:{
				name:'mechanics',
				defaultValue:0,
				type:'number',
				calculation:'@{intelligence_mod} + @{mechanics_proficiency}@{mechanics_modded}',
				affects:[]
			},
			physical_science_proficiency:{
				name:'physical_science_proficiency',
				defaultValue:0,
				type:'text',
				affects:['physical_science']
			},
			physical_science:{
				name:'physical_science',
				defaultValue:0,
				type:'number',
				calculation:'@{intelligence_mod} + @{physical_science_proficiency}@{physical_science_modded}',
				affects:[]
			},
			social_science_proficiency:{
				name:'social_science_proficiency',
				defaultValue:0,
				type:'text',
				affects:['social_science']
			},
			social_science:{
				name:'social_science',
				defaultValue:0,
				type:'number',
				calculation:'@{intelligence_mod} + @{social_science_proficiency}@{social_science_modded}',
				affects:[]
			},
			streetwise_proficiency:{
				name:'streetwise_proficiency',
				defaultValue:0,
				type:'text',
				affects:['streetwise']
			},
			streetwise:{
				name:'streetwise',
				defaultValue:0,
				type:'number',
				calculation:'@{intelligence_mod} + @{streetwise_proficiency}@{streetwise_modded}',
				affects:[]
			},
			insight_proficiency:{
				name:'insight_proficiency',
				defaultValue:0,
				type:'text',
				affects:['insight']
			},
			insight:{
				name:'insight',
				defaultValue:0,
				type:'number',
				calculation:'@{wisdom_mod} + @{insight_proficiency}@{insight_modded}',
				affects:['passive_insight']
			},
			passive_insight:{
				name:'passive_insight',
				defaultValue:10,
				type:'number',
				calculation:'10 +@{insight}@{passive_insight_modded}',
				affects:[]
			},
			passive_insight_modded:{
				name:'passive_insight_modded',
				defaultValue:'',
				type:'text',
				affects:['passive_insight']
			},
			perception_proficiency:{
				name:'perception_proficiency',
				defaultValue:0,
				type:'text',
				affects:['perception']
			},
			perception:{
				name:'perception',
				defaultValue:0,
				type:'number',
				calculation:'@{wisdom_mod} + @{perception_proficiency}@{perception_modded}',
				affects:['passive_perception']
			},
			passive_perception:{
				name:'passive_perception',
				defaultValue:10,
				type:'number',
				calculation:'10 + @{perception}@{passive_perception_modded}',
				affects:[]
			},
			passive_perception_modded:{
				name:'passive_perception_modded',
				defaultValue:'',
				type:'text',
				affects:['passive_perception']
			},
			survival_proficiency:{
				name:'survival_proficiency',
				defaultValue:0,
				type:'text',
				affects:['survival']
			},
			survival:{
				name:'survival',
				defaultValue:0,
				type:'number',
				calculation:'@{wisdom_mod} + @{survival_proficiency}@{survival_modded}',
				affects:[]
			},
			deception_proficiency:{
				name:'deception_proficiency',
				defaultValue:0,
				type:'text',
				affects:['deception']
			},
			deception:{
				name:'deception',
				defaultValue:0,
				type:'number',
				calculation:'@{charisma_mod} + @{deception_proficiency}@{deception_modded}',
				affects:[]
			},
			intimidation_proficiency:{
				name:'intimidation_proficiency',
				defaultValue:0,
				type:'text',
				affects:['intimidation']
			},
			intimidation:{
				name:'intimidation',
				defaultValue:0,
				type:'number',
				calculation:'@{charisma_mod} + @{intimidation_proficiency}@{intimidation_modded}',
				affects:[]
			},
			performance_proficiency:{
				name:'performance_proficiency',
				defaultValue:0,
				type:'text',
				affects:['performance']
			},
			performance:{
				name:'performance',
				defaultValue:0,
				type:'number',
				calculation:'@{charisma_mod} + @{performance_proficiency}@{performance_modded}',
				affects:[]
			},
			persuasion_proficiency:{
				name:'persuasion_proficiency',
				defaultValue:0,
				type:'text',
				affects:['persuasion']
			},
			persuasion:{
				name:'persuasion',
				defaultValue:0,
				type:'number',
				calculation:'@{charisma_mod} + @{persuasion_proficiency}@{persuasion_modded}',
				affects:[]
			},
			repeating_action_$X_bonus:{
				name:'repeating_action_$X_bonus',
				defaultValue:0,
				type:'number',
				calculation:'@{repeating_action_$X_attack_ability} + @{repeating_action_$X_attack_bonus} + @{repeating_action_$X_action_proficiency}@{repeating_action_$X_attack_modded}',
				affects:[]
			},
			repeating_action_$X_action_proficiency:{
				name:'repeating_action_$X_action_proficiency',
				defaultValue:'0',
				type:'text',
				affects:['repeating_action_$X_bonus']
			},
			repeating_action_$X_attack_ability:{
				name:'repeating_action_$X_attack_ability',
				defaultValue:'0',
				type:'text',
				affects:['repeating_action_$X_bonus']
			},
			repeating_action_$X_attack_bonus:{
				name:'repeating_action_$X_attack_bonus',
				defaultValue:'',
				type:'text',
				affects:['repeating_action_$X_bonus']
			}
		},
		npc:{
			/*character_name:{
				name:'character_name',
				defaultValue:'',
				affects:[]
			},*/
			size:{
				name:'size',
				defaultValue:'',
				affects:[]
			},
			genome:{
				name:'genome',
				defaultValue:'',
				affects:[]
			},
			modification:{
				name:'modification',
				defaultValue:'',
				affects:[]
			},
			ac:{
				name:'ac'	,
				defaultValue:'',
				affects:[]
			},
			damage_reduction:{
				name:'damage_reduction',
				defaultValue:'',
				affects:[]
			},
			hp:{
				name:'hp',
				defaultValue:'',
				affects:[]
			},
			hp_max:{
				name:'hp_max',
				defaultValue:'',
				affects:[]
			},
			hit_dice:{
				name:'hit_dice',
				defaultValue:'',
				affects:[]
			},
			speed:{
				name:'speed',
				defaultValue:'',
				affects:[]
			},
			strength:{
				name:'strength',
				type:'text',
				defaultValue:10,
				affects:['strength_mod']
			},
			strength_save_base:{
				name:'strength_save_base',
				type:'number',
				defaultValue:'',
				affects:['strength_save']
			},
			dexterity:{
				name:'dexterity',
				type:'text',
				defaultValue:10,
				affects:['dexterity_mod']
			},
			dexterity_save_base:{
				name:'dexterity_save_base',
				type:'number',
				defaultValue:'',
				affects:['dexterity_save']
			},
			constitution:{
				name:'constitution',
				type:'text',
				defaultValue:10,
				affects:['constitution_mod']
			},
			constitution_save_base:{
				name:'constitution_save_base',
				type:'number',
				defaultValue:'',
				affects:['constitution_save']
			},
			intelligence:{
				name:'intelligence',
				type:'text',
				defaultValue:10,
				affects:['intelligence_mod']
			},
			intelligence_save_base:{
				name:'intelligence_save_base',
				type:'number',
				defaultValue:'',
				affects:['intelligence_save']
			},
			wisdom:{
				name:'wisdom',
				type:'text',
				defaultValue:10,
				affects:['wisdom_mod']
			},
			wisdom_save_base:{
				name:'wisdom_save_base',
				type:'number',
				defaultValue:'',
				affects:['wisdom_save']
			},
			charisma:{
				name:'charisma',
				type:'text',
				defaultValue:10,
				affects:['charisma_mod']
			},
			charisma_save_base:{
				name:'charisma_save_base',
				type:'number',
				defaultValue:'',
				affects:['charisma_save']
			},
			strength_mod:{
				name:'strength_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{strength}-10)/2)',
				affects:['strength_save']
			},
			dexterity_mod:{
				name:'dexterity_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{dexterity}-10)/2)',
				affects:['dexterity_save']
			},
			constitution_mod:{
				name:'constitution_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{constitution}-10)/2)',
				affects:['constitution_save']
			},
			intelligence_mod:{
				name:'intelligence_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{intelligence}-10)/2)',
				affects:['intelligence_save']
			},
			wisdom_mod:{
				name:'wisdom_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{wisdom}-10)/2)',
				affects:['wisdom_save']
			},
			charisma_mod:{
				name:'charisma_mod',
				defaultValue:0,
				type:'number',
				calculation:'floor((@{charisma}-10)/2)',
				affects:['charisma_save']
			},
			strength_save:{
				name:'strength_save',
				defaultValue:0,
				type:'number',
				calculation:'custom',
				affects:[]
			},
			dexterity_save:{
				name:'dexterity_save',
				defaultValue:0,
				type:'number',
				calculation:'custom',
				affects:[]
			},
			constitution_save:{
				name:'constitution_save',
				defaultValue:0,
				type:'number',
				calculation:'custom',
				affects:[]
			},
			intelligence_save:{
				name:'intelligence_save',
				defaultValue:0,
				type:'number',
				calculation:'custom',
				affects:[]
			},
			wisdom_save:{
				name:'wisdom_save',
				defaultValue:0,
				type:'number',
				calculation:'custom',
				affects:[]
			},
			charisma_save:{
				name:'charisma_save',
				defaultValue:0,
				type:'number',
				calculation:'custom',
				affects:[]
			},
			condition_immunities:{
				name:'condition_immunities',
				defaultValue:'',
				affects:[]
			},
			damage_immunities:{
				name:'damage_immunities',
				defaultValue:'',
				affects:[]
			},
			damage_resistances:{
				name:'damage_resistances',
				defaultValue:'',
				affects:[]
			},
			damage_vulnerability:{
				name:'damage_vulnerability',
				defaultValue:'',
				affects:[]
			},
			athletics:{
				name:'athletics',
				defaultValue:'',
				affects:[]
			},
			acrobatics:{
				name:'acrobatics',
				defaultValue:'',
				affects:[]
			},
			drive:{
				name:'drive',
				defaultValue:'',
				affects:[]
			},
			sleight_of_hand:{
				name:'sleight_of_hand',
				defaultValue:'',
				affects:[]
			},
			stealth:{
				name:'stealth',
				defaultValue:'',
				affects:[]
			},
			bureaucracy:{
				name:'bureaucracy',
				defaultValue:'',
				affects:[]
			},
			computers:{
				name:'computers',
				defaultValue:'',
				affects:[]
			},
			investigation:{
				name:'investigation',
				defaultValue:'',
				affects:[]
			},
			life_science:{
				name:'life_science',
				defaultValue:'',
				affects:[]
			},
			mechanics:{
				name:'mechanics',
				defaultValue:'',
				affects:[]
			},
			physical_science:{
				name:'physical_science',
				defaultValue:'',
				affects:[]
			},
			social_science:{
				name:'social_science',
				defaultValue:'',
				affects:[]
			},
			streetwise:{
				name:'streetwise',
				defaultValue:'',
				affects:[]
			},
			insight:{
				name:'insight',
				defaultValue:'',
				affects:[]
			},
			perception:{
				name:'perception',
				defaultValue:'',
				affects:[]
			},
			survival:{
				name:'survival',
				defaultValue:'',
				affects:[]
			},
			deception:{
				name:'deception',
				defaultValue:'',
				affects:[]
			},
			intimidation:{
				name:'intimidation',
				defaultValue:'',
				affects:[]
			},
			performance:{
				name:'performance',
				defaultValue:'',
				affects:[]
			},
			persuasion:{
				name:'persuasion',
				defaultValue:'',
				affects:[]
			},
			skill_notes:{
				name:'skill_notes',
				defaultValue:'',
				affects:[]
			},
			senses:{
				name:'senses',
				defaultValue:'',
				affects:[]
			},
			passive_perception:{
				name:'passive_perception',
				defaultValue:'',
				affects:[]
			},
			languages:{
				name:'languages',
				defaultValue:'',
				affects:[]
			},
			challenge:{
				name:'challenge',
				defaultValue:'',
				affects:[]
			},
			experience_points:{
				name:'experience_points',
				defaultValue:'',
				affects:[]
			},
			hacker_level:{
				name:'hacker_level',
				defaultValue:'',
				affects:[]
			},
			hacking_ability:{
				name:'hacking_ability',
				defaultValue:'',
				affects:[]
			},
			hack_dc:{
				name:'hack_dc',
				defaultValue:'',
				affects:[]
			},
			hack_attack:{
				name:'hack_attack',
				defaultValue:'',
				affects:[]
			},
			'1st_level_slots':{
				name:'1st_level_slots',
				defaultValue:'',
				affects:[]
			},
			'1st_level_slots':{
				name:'1st_level_slots',
				defaultValue:'',
				affects:[]
			},
			'2nd_level_slots':{
				name:'2nd_level_slots',
				defaultValue:'',
				affects:[]
			},
			'3rd_level_slots':{
				name:'3rd_level_slots',
				defaultValue:'',
				affects:[]
			},
			'4th_level_slots':{
				name:'4th_level_slots',
				defaultValue:'',
				affects:[]
			},
			'5th_level_slots':{
				name:'5th_level_slots',
				defaultValue:'',
				affects:[]
			},
		}
	},
	dropDowns = ['repeating_action_$X_attack_ability'],
	hitDice = ['d8_hd','d10_hd','d12_hd'],
	toMonitor = ['strength','dexterity','constitution','intelligence','wisdom','charisma','base_strength','base_dexterity','base_constitution','base_intelligence','base_wisdom','base_charisma','strength_save_proficiency','dexterity_save_proficiency','constitution_save_proficiency','intelligence_save_proficiency','wisdom_save_proficiency','charisma_save_proficiency','class_level','level','athletics_proficiency','acrobatics_proficiency','drive_proficiency','sleight_of_hand_proficiency','stealth_proficiency','bureaucracy_proficiency','computers_proficiency','investigation_proficiency','life_science_proficiency','mechanics_proficiency','physical_science_proficiency','social_science_proficiency','streetwise_proficiency','insight_proficiency','perception_proficiency','survival_proficiency','deception_proficiency','intimidation_proficiency','performance_proficiency','persuasion_proficiency','athletics_proficiency','acrobatics_proficiency','drive_proficiency','sleight_of_hand_proficiency','stealth_proficiency','bureaucracy_proficiency','computers_proficiency','investigation_proficiency','life_science_proficiency','mechanics_proficiency','physical_science_proficiency','social_science_proficiency','streetwise_proficiency','insight_proficiency','perception_proficiency','survival_proficiency','deception_proficiency','intimidation_proficiency','performance_proficiency','persuasion_proficiency','strength_save_base','dexterity_save_base','constitution_save_base','intelligence_save_base','wisdom_save_base','charisma_save_base'],
	repeatingSections = ['repeating_action','repeating_hack','repeating_trait','repeating_equipment'],
	baseGet = [...toMonitor,'proficiency','character_type','strength_mod','dexterity_mod','constitution_mod','intelligence_mod','wisdom_mod','charisma_mod','strength_save','dexterity_save','constitution_save','intelligence_save','wisdom_save','charisma_save','athletics','acrobatics','drive','sleight_of_hand','stealth','bureaucracy','computers','investigation','life_science','mechanics','physical_science','social_science','streetwise','insight','perception','survival','deception','intimidation','performance','persuasion'],
	challengeToXP = {
		'0':10,'1/8':25,'1/4':50,'1/2':100,'1':200,'2':450,'3':700,'4':1100,'5':1800,'6':2300,'7':2900,'8':3900,'9':5000,
		'10':5900,'11':7200,'12':8400,'13':10000,'14':11500,'15':13000,'16':15000,'17':18000,'18':20000,'19':22000,'20':25000,
		'21':33000,'22':41000,'23':50000,'24':62000,'25':75000,'26':90000,'27':105000,'28':120000,'29':135000,'30':155000
	};

	var registerEventHandlers = function(){
		on('sheet:opened',openSheet);
		['repeating_action:attack_enable_item','repeating_hack:attack_enable_item','repeating_action:damage_1_enable_item','repeating_hack:damage_1_enable_item','repeating_action:damage_2_enable_item','repeating_hack:damage_2_enable_item'].forEach((name)=>{
			on(`change:${name}`,updateActionMacro);
		});
		displayControllers.forEach((attr)=>{
			on(`change:${attr}`,importReact);
		});
		importControls.forEach((attr)=>{
			on(`change:${attr}`,importReact);
		});
		hackLevels.forEach((attr)=>{
			on(`clicked:add_${attr}_hack`,createHack);
		});
		on('change:character_type',changeCharacter);
		on('change:challenge',convertChallenge);
		on('change:hit_dice',averageHP);
		hitDice.forEach((attr)=>{
			on(`change:${attr}`,updateHDmacro);
		});
		[...toMonitor,...repeatingSections].forEach((attr)=>{
			on(`change:${attr}${/repeating/.test(attr) ? ` remove:${attr}` :''}`,(event)=>{
				let triggers = [event.sourceAttribute];
				if(/_mods$/.test(event.sourceAttribute)){
					triggers = extractModTrigger(`${event.newValue},${event.previousValue}`,triggers);
				}else if(event.removedInfo && _.contains(_.keys(event.removedInfo),`${triggers[0]}_mods`)){
					triggers = extractModTrigger(event.removedInfo[`${event.sourceAttribute}_mods`],[]);
				}else if(event.removedInfo){
					return;
				}
				getSections(accessSheet,baseGet,triggers);
			});
		});
	},

	extractModTrigger = function(string,triggers){
		string.replace(/([+\-=].+?)\s+([^\s,]+)(?:,|$)/ig,(match,value,target)=>{
			target = target.toLowerCase();
			if(/=/.test(value) && target ==='ac'){
				target = 'ac_formula';
			}
			if(!_.contains(triggers,target)){
				triggers.push(target);
			}
		});
		return triggers;
	},

	accessSheet = function(getArray,sections,triggers){
		const setObj = {};
		getAttrs(getArray,(attributes)=>{
			const buffs = parseBuffs(attributes,sections,triggers);
			if(attributes.character_type === 'pc' && !buffs.ac_formula){
				buffs.ac_formula = [{value:cascades.pc.ac_formula.defaultValue,label:'AC'}];
			}
			triggers = parseTrigger(triggers,attributes.character_type,attributes,buffs,sections);
			triggers = sortTrigger(triggers);
			reactToTrigger(triggers,attributes,setObj,buffs);
		});
	},

	parseBuffs = function(attributes,sections,triggers){ //parses all of the buffs contained in the repeating_trait, and repeating_equipment items
		//  creates an object indexed by attribute to be buffed containing objects that have all of the buffs for that attribute
		//  indexed by buff type
		const modRegex = /([+\-=].+?)\s+([^\s,]+)(?:,|$)/ig;//mod expression +X target,+X target,...
		//mod expression can use attribute calls, queries, roll expressions, etc.
		return _.chain(_.keys(attributes))
			.filter((attr_name)=>{
				return /_mods$/.test(attr_name);
			})
			.reject((attr_name)=>{
				return attributes[attr_name] === '' || !attributes[attr_name];
			})
			.reduce((memo,attr_name)=>{
				attributes[attr_name].toLowerCase().replace(modRegex,(match,value,target)=>{
					if(/=/.test(value) && target === 'ac'){
						target = 'ac_formula';
						triggers.push('ac_formula');
					}
					if(/repeating_[^_]+_\$/i.test(target)){
						target.replace(/(repeating_[^_]+_)[^_]+(.+)/,(match,section,field)=>{
							_.each(sections[section],(id)=>{
								memo[`${section}${id}${field}`] = memo[`${section}${id}${field}`] || [];
								let targObj = {
									value:value,
									label:attributes[attr_name.replace('mods','name')]
								};
								memo[`${section}${id}${field}`].push(targObj);
							});
						});
					}else{
						memo[target] = memo[target] || [];
						let targObj = {
							value:value,
							label:attributes[attr_name.replace('mods','name')]
						};
						memo[target].push(targObj);
					}
				});
				return memo;
			},{})
			.tap(log)
			.value();
	},

	expandRepeating = function(cascade,sections){
		let tempCasc = trueCopy(cascade);
		tempCasc = _.keys(tempCasc).reduce((memo,key)=>{
			if(/^repeating/.test(key)){
				key.replace(/(repeating_[^_]+)_[^_]+_(.+)/,(match,section,field)=>{
					_.each(sections[section].id,(id)=>{
						memo[`${section}_${id}_${field}`]=trueCopy(tempCasc[key]);
						memo[`${section}_${id}_${field}`].affects = memo[`${section}_${id}_${field}`].affects.map((affected)=>{
							return affected.replace(/(repeating_[^_]+_)[^_]+(.+)/,`$1${id}$2`);
						});
					});
				});
			}else{
				memo[key] = trueCopy(tempCasc[key]);
			}
			return memo;
		},{});
		return tempCasc;
	},

	updateActionMacro = function(event){
		if(event.sourceAttribute === 'attack_enable_item'){
			return;
		}
		getAttrs(['character_type'],(attributes)=>{
			const setObj = {};
			adjustActionMacro(event,attributes,setObj);
			set(setObj);
		});
	},

	adjustActionMacro = function(event,attributes,setObj = {}){
		let macroAttr = event.sourceAttribute.replace(/enable_item/,'macro');
		if(event.newValue*1){
			setObj[macroAttr] = `{{d20=[[@{advantage_state} ${attributes.character_type === 'pc' ? '+ @{attack_ability} + @{action_proficiency}' : ''} + 0@{attack_bonus}]]}}`;
		}else if(/{{damage_type_\d=@{damage_type_\d}}} @{damage_\d_macro}/.test(event.newValue)){
			event.sourceAttribute.replace(/_(\d)_/,(match,num)=>{
				setObj[macroAttr] = `{{damage_${num}=[[0@{damage_${num}}${attributes.character_type === 'pc' ? `+ @{damage_ability_${num}}` : ''}]]}} {{regular_critical_${num}=[[0@{damage_${num}}]]}} {{is_custom_crit_${num}=@{critical_damage_${num}}}} {{custom_critical_${num}=[[0@{critical_damage_${num}}]]}}`;
			});
		}else{
			setObj[macroAttr] = ' ';
		}
		set(setObj);
	},

	trueCopy = function(obj){
		return JSON.parse(JSON.stringify(obj));
	},

	applyBuffsToCascades = function(cascade,buffs,sections){
		let tempCasc = expandRepeating(cascade,sections);
		_.keys(buffs).forEach((key)=>{
			buffs[key].forEach((buff)=>{
				buff.value.replace(/@{(.+?)}/g,(match,attr)=>{
					if(/repeating_[^_]+_\$[X\d]+/i.test(attr)){
						attr.replace(/(repeating_[^_]+)_[^_]+_(.+)/,(match,section,field)=>{
							sections[section].id.forEach((id)=>{
								if(!_.contains(tempCasc[`${section}_${id}_${field}`].affects)){
									tempCasc[`${section}_${id}_${field}`].affects.push(key);
								}
							});
						});
					}else{
						if(!_.contains(tempCasc[attr].affects)){
							tempCasc[attr].affects.push(key);
						}
					}
				});
			});
		});
		return tempCasc;
	},

	parseTrigger = function(triggers,character_type,attributes,buffs,sections){
		let cascadeCopy = character_type==='pc' ? applyBuffsToCascades(cascades[character_type],buffs,sections) : expandRepeating(cascades[character_type],sections),
			trigQueue,
			trigWorker = (queue,arr) =>{
				arr = arr || [];
				let item = queue.shift(),
					rowID,
					itemLookup = item.replace(/(repeating_[^_]+_)([^_]+)/,(match,section,id)=>{
						rowID = /\$/.test(id) ? undefined : id;
						return `${section}$X`;
					});
				if(cascadeCopy[itemLookup]){
					let parsedItem = {};
					_.keys(cascadeCopy[itemLookup]).forEach((key)=>{
						if(key === 'affects'){
							parsedItem[key] = [];
							let affectArray = cascadeCopy[itemLookup][key];
							_.keys(buffs).forEach((key)=>{
								if(new RegExp(`@{${itemLookup}}`).test(buffs[key].value)){
									affectArray.push(key);
								}
							});
							affectArray = _.unique(affectArray);
							_.each(affectArray,(affected)=>{
								if(/^repeating_/.test(affected)){
									affected.replace(/(repeating_[^_]+_)[^_]+(.+)/,(match,section,field)=>{
										if(rowID){
											parsedItem[key].push(`${section}${rowID}${field}`);
											if(_.every(arr,(item)=>{
												return item.name !== `${section}${rowID}${field}`;
											}) && !_.contains(queue,`${section}${rowID}${field}`)){
												queue.push(`${section}${rowID}${field}`);
											}
										}else{
											_.each(sections[section],(id)=>{
												parsedItem[key].push(`${section}${id}${field}`);
												if(_.every(arr,(item)=>{
													return item.name !== `${section}${id}${field}`;
												}) && !_.contains(queue,`${section}${id}${field}`)){
													queue.push(`${section}${id}${field}`);
												}
											});
										}
									});
								}else if(/^variable$/.test(affected)){
									dropDowns.forEach((dropDown)=>{
										dropDown.replace(/(?:(repeating_[^_]+)_[^_]+_)?(.+)/,(match,section,field)=>{
											sections[section].forEach((id)=>{
												if(attributes[`${section}_${id}_${field}`]===`@{${key}}`){
													parsedItem[key].push(`${section}_${id}_${field}`);
													queue.push(`${section}_${id}_${field}`);
												}
											});
										});
									});
								}else{
									parsedItem[key].push(affected);
									if(_.every(arr,(item)=>{
										return item.name !== affected;
									}) && !_.contains(queue,affected)){
										queue.push(affected);
									}
								}
							});
						}else{
							parsedItem[key] = `${cascadeCopy[itemLookup][key]}`.replace(/(repeating_[^_]+_)[^_]+/,`$1${rowID||''}`);
						}
					});
					if((cascadeCopy[itemLookup].calculation || itemLookup === 'ac_formula') && _.every(arr,(item)=>{
						return item.name !== parsedItem.name;
					})){
						arr.push(parsedItem);
					}
				}
				if(_.isEmpty(queue)){
					return arr;
				}else{
					return trigWorker(queue,arr);
				}
			};
		return trigWorker(triggers);
	},

	sortTrigger = function(triggers){
		_.each(triggers,(trigger)=>{
			trigger.order = triggers.reduce((memo,trig,index)=>{
				if(_.contains(trig.affects,trigger.name)){
					memo = trig.order + 1 || index;
				}
				return memo;
			},0);
		});
		return _.sortBy(triggers,(obj)=>{return obj.order});
	},

	reactToTrigger = function(triggers,attributes,setObj,buffs){
		_.each(triggers,(obj)=>{
			let calc;
			if(obj.calculation === 'custom'){
				calc = customCalcs[obj.name](attributes,triggers,setObj,buffs,obj);
			}else{
				calc = sheetCalc(obj.name,obj.calculation,attributes,setObj,buffs);
			}
			if(!calc && calc !== 0){
				calc = obj.defaultValue;
			}
			attributes[obj.name] = calc;
			setObj[obj.name] = calc;
		});
		set(setObj);
	},

	calcLevel = function(attributes){
		let level = 0;
		attributes.class_level.replace(/\d+/g,(classLevel)=>{
			level += classLevel*1;
		});
		return level;
	},

	calcAC = function(attributes,triggers,setObj,buffs){
		return buffs.ac_formula.reduce((memo,buffObj)=>{
			let calc = sheetCalc('ac_formula',buffObj.value,attributes,setObj,buffs);
			if(calc >= memo.value){
				memo = {value:calc,formula:buffObj.value};
			}
			return memo;
		},{value:0}).formula || triggers.ac_formula.defaultValue;
	},

	npcSaveCalc = function(attributes,triggers,setObj,buffs,trigger){
		let attr = trigger.name.replace(/_save.*/,'');
		return (attributes[`${attr}_save_base`]*1||attributes[`${attr}_save_base`]!=='') ? attributes[`${attr}_save_base`] : attributes[`${attr}_mod`];
	},

	customCalcs = {
		level:calcLevel,
		ac_formula:calcAC,
		strength_save:npcSaveCalc,
		dexterity_save:npcSaveCalc,
		constitution_save:npcSaveCalc,
		intelligence_save:npcSaveCalc,
		wisdom_save:npcSaveCalc,
		charisma_save:npcSaveCalc
	},

	sheetCalc = function(name,calculation,attributes,setObj,buffs){
		let parsedCalc = calculation;
		while(/@{([^}]+)}/.test(parsedCalc)){
			parsedCalc.replace(/@{(([^}]+)_modded)}/,(match,store,target)=>{
				attributes[store] = (buffs[target]||[]).map((buffObj)=>{
					return `+ [[${buffObj.value}]][${buffObj.label}]`;
				}).join(' ');
				setObj[store]=attributes[store];
			});
			parsedCalc = attributeParse(parsedCalc,attributes);
		}
		parsedCalc = parsedCalc.replace(/floor|ceil|round|abs/g,'Math.$&').replace(/\[\[|\]\]|\[.*?\]|=/g,'');
		let finalCalc;
		try{
			finalCalc = eval(parsedCalc);
		}catch(err){
			finalCalc = undefined;
		}
		return finalCalc;
	},

	attributeParse = function(string,attributes){
		return string.replace(/@{([^}]+)}/g,(match,name)=>{
			return attributes[name.toLowerCase()];
		});
	},

	updateHDmacro = function(event){
		const setObj = {};
		getAttrs(hitDice,(attributes)=>{
			let hdAccumulator = [];
			hitDice.forEach((hd)=>{
				if(attributes[hd] && (attributes[hd]*1!==0 && attributes[hd]!=='')){
					hdAccumulator.push(hd.replace(/_hd/,''));
				}
			});
			hdAccumulator = hdAccumulator.join('|');
			if(/\|/.test(hdAccumulator)){
				hdAccumulator = `?{Die Size|${hdAccumulator}}`;
			}
			setObj.hit_dice_macro = `{{d20=[[?{Number of dice|1}${hdAccumulator} + [[?{Number of dice}*@{constitution_mod}]]]]}}`;
			set(setObj);
		});
	},

	convertChallenge = function(event){
		set({experience_points:challengeToXP[event.newValue]||10});
	},

	averageHP = function(event){
		const setObj = {};
		let numDie,die,bonus;
		event.newValue.replace(/(\d+)\s*d\s*(\d+)(?:\s*([+\-]\s*\d+))?/,(match,n,d,b)=>{
			numDie = n*1||1;
			die = d*1||6;
			bonus = (b+'').replace(/\s*\+\s*/,'')*1||0;
		});
		setObj.hp = bonus + Math.floor(numDie*(die/2+0.5));
		setObj.hp_max = setObj.hp;
		set(setObj);
	},

	changeDisplay = function(){
		getAttrs([...displayControllers,...importControls],(attributes)=>{
			const setObj = processDisplayChange(attributes);
			set(setObj);
		});
	},

	processDisplayChange = function(attributes){
		const setObj = {};
		setObj.master_display_controller = displayControllers.map((attr)=>{
			return `${attr}:${attributes[attr]}`
		}).join(' | ');
		setObj.master_display_controller = `${setObj.master_display_controller} | import:${attributes.import}`;
		return setObj;
	},

	importReact = function(event){
		const attrToGet = [...displayControllers,...importControls],
			setObj = {};
		let processImport = false;
		if(event.newValue === '0' && event.sourceAttribute === 'import'){
			attrToGet.push('importer');
			processImport = true;
		}else if(event.sourceAttribute === 'import_cancel'){
			setObj.import = '0';
			setObj.import_cancel = '0';
		}
		if(!processImport){
			displayImportChange(attrToGet,setObj);
		}else{
			getSections(beginImport,[...baseGet,...attrToGet]);
		}
	},

	displayImportChange = function(toGet,setObj){
		getAttrs(toGet,(attributes)=>{
			_.extend(attributes,setObj);
			_.extend(setObj,processDisplayChange(attributes));
			set(setObj);
		});
	},

	beginImport = function(toGet,sections){
		let setObj = {};
		wipeSheet(sections,setObj);
		getAttrs(toGet,(attributes)=>{
			if(attributes.importer.trim() === ''){
				setObj.import = 'import';
			}else{
				setObj = {...setObj,...parseStatblock(attributes.importer)};
				setObj.sheet_view = 'in-play';
				attributes = {...attributes,...setObj};
				setObj = {...setObj,...processDisplayChange(attributes)};
			}
			set(setObj);
		});
	},

	wipeSheet = function(sections){
		const setObj = {};
		Object.keys(cascades.npc).forEach((k)=>setObj[k]=cascades.npc[k].defaultValue);
		setObj.import = 'import-process';
		_.each(sections,(idArray,section)=>{
			resetRepeatingSection(section,idArray);
		});
	},

	resetRepeatingSection = function(section,idArray){
		idArray.forEach((id)=>{
			removeRepeatingRow(`${section}_${id}`);
		});
	},

	parseStatblock = function(statblock){
		if(statblock.trim() === ''){
			return {};
		}
		let parser = headerParser,
			section = 'header',
			lines = statblock.replace(/\s+\n/g,'\n').replace(/[\-–—―−]/g,'-').split(/\n+/),
			setObj = {};
		const Parsers = {//regex as strings for matching against each line to determine if we continue with the current recursive parse, or move onto a new section
			'^\\s*str\\s+dex\\s+con\\s+int\\s+wis\\s+cha':abilityScoreParser,
			'^\\s*(?:saves|skills|senses|languages|challenge|damage resistance)\\s+':detailParser,
			'^\\s*hacking\\.\\s+':hackParser,
			'^\\s*traits$':traitParser,
			'^\\s*actions\\s*$':actionParser
		},
		setParser = (lines) => {//Tests the line and changes the parser if necessary
			return !!Object.keys(Parsers).find( (regexp) => {
				if(new RegExp(regexp,"i").test(lines[0])){
				    section = regexp;
				    parser = Parsers[regexp];
				    if(/actions|^\s*str\s+dex\s+con\s+int\s+wis\s+cha/i.test(lines[0])){//if the section is one of these, then jump to the next line (shift it out of the array)
				        lines.shift();
				    }
				    return true;
				}
				return false;
			});
		};
		setObj.character_name = lines.shift();
		while(lines.length){//while there are lines
			setParser(lines);//check the line and see if the parser needs to be changed
			[setObj,lines] = parser(setObj,lines);//call the parser in question, and modify setObj and lines to be what the parser returns
		};
		return setObj;
	},

	processRegex = function(setObj,currLine,regexs){
		_.keys(regexs).find((r)=>{
			if(new RegExp(r,'i').test(currLine)){
				let objMatch = currLine.match(new RegExp(r,'i'));
				_.each(_.range(regexs[r].length),(l)=>{
					_.each(regexs[r][l],(o)=>{
						setObj[o]=objMatch[l + 1]||'';
					});
				});
				return true;
			}
			return false;
		});
	},

	headerParser = function(setObj,lines){
		const regexs = {//regexs as strings for matching against lines. the properties are arrays of what attributes (in a sub array) receive the value from each matching group
			'^\\s*(medium|tiny|large|huge)\\s+(.+?)(?:\\s+\\(\\s*(.+?)\\s*\\)|$)':[['size'],['genome'],['modification']],//size and type,
			'^\\s*armor\\s+class\\s+(\\d+)':[['ac']],
			'^\\s*damage\\s+reduction\\s+(\\d+)':[['damage_reduction']],
			'^\\s*hit\\s+points\\s+(\\d+)\\s*\\((.+?)\\)':[['hp','hp_max'],['hit_dice']],
			'^\\s*speed\\s+(.+)':[['speed']]
		};
		processRegex(setObj,lines.shift(),regexs);
		return [setObj,lines];
	},

	abilityScoreParser = function(setObj,lines){
		const regexs = {//regexs as strings for matching against lines. the properties are arrays of what attributes (in a sub array) receive the value from each matching group
			'^\\s*(\\d+)\\s*\\(\\+?(\\-?\\d+)\\)\\s*(\\d+)\\s*\\(\\+?(\\-?\\d+)\\)\\s*(\\d+)\\s*\\(\\+?(\\-?\\d+)\\)\\s*(\\d+)\\s*\\(\\+?(\\-?\\d+)\\)\\s*(\\d+)\\s*\\(\\+?(\\-?\\d+)\\)\\s*(\\d+)\\s*\\(\\+?(\\-?\\d+)\\)':[['strength'],['strength_mod'],['dexterity'],['dexterity_mod'],['constitution'],['constitution_mod'],['intelligence'],['intelligence_mod'],['wisdom'],['wisdom_mod'],['charisma'],['charisma_mod']]
		};
		processRegex(setObj,lines.shift(),regexs);
		return [setObj,lines];
	},

	detailParser = function(setObj,lines){
		const regexs = {//regexs as strings for matching against lines. the properties are arrays of what attributes (in a sub array) receive the value from each matching group
			'^\\s*senses\\s+passive perception (\\d+)(?:,\\s*(.+?))?$':[['passive_perception'],['senses']],
			'^\\s*damage\\s+resistance\s+(.+)':[['damage_resistance']],
			'^\\s*languages\\s+(.+)':[['languages']],
			'^\\s*challenge\\s+([\\d\\/]+)\\s*\\(([\\d,]+)\\s*xp\\)':[['challenge'],['experience_points']]
		};
		let line = assembleDetailLine(lines);
		if(/^\s*skills\s+/i.test(line)){
			parseSkills(setObj,line);
		}else if(/^\s*senses\s+/i.test(line)){
			parseSenses(setObj,line);
		}else{
			processRegex(setObj,line,regexs);
		}
		if(/^\s*challenge/i.test(line) && !/^\s*(hacking\.|actions)/i.test(lines[0])){
			lines.unshift('trait');
		}
		return [setObj,lines];
	},

	assembleDetailLine = function(lines,line){
		line = line ? `${line} ${lines.shift()}` : lines.shift();
		return /^\s*(?:saves|skills|senses|languages|challenge|damage resistance|hacking|actions)/i.test(lines[0]) ? line : assembleDetailLine(lines,line);
	},

	parseSkills = function(setObj,line){
		line.replace(/(?:,\s*|skills\s+)(.+?)\s+\+?(\-?\d+)/ig,(match,skill,bonus)=>{
			setObj[skill.replace(/\s+/,'_').toLowerCase()]=bonus;
		});
	},

	parseSenses = function(setObj,line){
		line.replace(/senses\s*(?:(.+?),\s*)?passive \s*perception\s*(\d+)(?:,\s*(.+?))?$/i,(match,senses,pp='',senses2)=>{
			setObj.passive_perception = pp;
			setObj.senses = [senses,senses2].filter(a=>a).join(', ');
		});
	},

	hackParser = function(setObj,lines){
		let line = assembleHackerDetails(lines);
		line.replace(/.+?(\d+)(?:st|th|rd).+?ability is (strength|dexterity|constitution|intelligence|wisdom|charisma).+?DC\s*(\d+).+?(\-?\d+) to hit/,(match,level,ability,dc,attack)=>{
			setObj.hacker_level = level;
			setObj.hacking_ability = ability;
			setObj.hack_dc = dc;
			setObj.hack_attack = attack;
		});
		processHacks(setObj,lines);
		if(/.+\./.test(lines[0])){
			lines.unshift('traits')
		}
		return [setObj,lines];
	},

	assembleHackerDetails = function(lines){
		let line = lines.shift();
		while(!/:/.test(line) && lines.length){
			line = `${line} ${lines.shift()}`;
		}
		return line.toLowerCase();
	},

	processHacks = function(setObj,lines){
		while(lines.length && !/.+\.|actions/i.test(lines[0])){
			let line = assembleHackLevel(lines);
			line.replace(/(\d+)(st|rd|th)\s+level\s*\((\d+)\s+slots\):(.+)/,(match,level,ordinal,slots,hacks)=>{
				setObj[`${level}${ordinal}_level_slots`] = slots;
				hacks = hacks.trim().split(/\s*,\s*/);
				hacks.forEach((hack)=>{
					importHack(setObj,hack,level);
				});
			});
		}
	},

	assembleHackLevel = function(lines){
		let line = lines.shift();
		while(lines.length && !/.+(?:\.|:)|actions/i.test(lines[0])){
			line = `${line} ${lines.shift()}`;
		}
		return line;
	},

	importHack = function(setObj,hack,level){
		const rowID = generateRowID();
		setObj[`repeating_hack_${rowID}_level`] = level;
		setObj[`repeating_hack_${rowID}_hack_type`] = 'injection';
		setObj[`repeating_hack_${rowID}_id`] = rowID;
		setObj[`repeating_hack_${rowID}_name`] = hack;
	},

	traitParser = function(setObj,lines){
		if(/^\s*traits$/.test(lines[0])){
			lines.shift();
		}
		let regex = /(?:.+\.|actions)\s*$/i;
		do{
			let line = assembleTraitDetails(lines);
			importTrait(setObj,line);
		}while(lines.length && !regex.test(lines[0]))
		return [setObj,lines];
	},

	importTrait = function(setObj,line){
		const rowID = generateRowID();
		line.replace(/^(.+?)\.\s*(.+)/,(match,name,description)=>{
			setObj[`repeating_trait_${rowID}_description`] = description;
			setObj[`repeating_trait_${rowID}_id`] = rowID;
			setObj[`repeating_trait_${rowID}_name`] = name;
			setObj[`repeating_trait_${rowID}_expand_item`] = 0;
		});
	},

	//collects lines to create the entire paragraph of a trait. If action is truthy, then it will parse for an action's details
	assembleTraitDetails = function(lines,action){
		let line = lines.shift();
		while(lines.length && !/\.\s*$/.test(line)){
			line = `${line} ${lines.shift()}`;
		}
		return line;
	},

	actionParser = function(setObj,lines){
		do{
			let line = assembleTraitDetails(lines,true);
			importAction(setObj,line);
		}while(lines.length && /^(?:.+\.).+/.test(lines[0]))
		return [setObj,lines];
	},

	importAction = function(setObj,line){
		const rowID = generateRowID();
		line.replace(/^(.+?)\.\s+((?:ranged|melee)\s+weapon\s+attack:.+?(\-?\d+).+?(?:range|reach)\s+(.+?),\s*(.+?)\..+?\((.+?)\)\s*(.*?)\.\s*(.+)?|.+)/i,(match,name,details,attack,range,target,damageRoll,damageType,description)=>{
			setObj[`repeating_action_${rowID}_id`] = rowID;
			setObj[`repeating_action_${rowID}_name`] = name;
			if(attack){
				setObj[`repeating_action_${rowID}_attack_bonus`] = attack;
				setObj[`repeating_action_${rowID}_bonus`] = attack;
				setObj[`repeating_action_${rowID}_attack_enable_item`] = 1;
				setObj[`repeating_action_${rowID}_attack_macro`] = '{{d20=[[@{advantage_state} + 0@{attack_bonus}]]}}';
			}
			if(damageRoll){
				setObj[`repeating_action_${rowID}_damage_1`] = damageRoll;
				setObj[`repeating_action_${rowID}_damage_type_1`] = damageType||'';
				setObj[`repeating_action_${rowID}_damage_1_enable_item`] = '{{damage_type_1=@{damage_type_1}}} @{damage_1_macro}';

			}
			if(description){
				setObj[`repeating_action_${rowID}_description`] = description||'';
			}else if(!attack&&!range&&!target&&!damageRoll&&!damageType){
				setObj[`repeating_action_${rowID}_description`] = details;
			}
			setObj[`repeating_action_${rowID}_range`] = range||'';
			setObj[`repeating_action_${rowID}_expand_item`] = 0;
		});
	},

	createHack = function(event){
		const setObj = {},
			rowID = generateRowID(),
			[hackLevel] = event.triggerName.match(/\d+/);
		setObj[`repeating_hack_${rowID}_level`] = hackLevel;
		setObj[`repeating_hack_${rowID}_hack_type`] = 'injection';
		setObj[`repeating_hack_${rowID}_id`] = rowID;
		set(setObj);
	},

	changeCharacter = function(event){
		const switcher = {
			npc:NPC,
			pc:PC
		};
		getSections(switcher[event.newValue]);
	},

	PC = function(getArray,sections){
		const setObj = {
			whisper_state:''
		};
		_.keys(skillList).forEach((skill)=>{
			setObj[`${skill}_macro`]=`{{d20=[[@{advantage_state} + @{${skill}_proficiency}[Proficiency] + @{${skillList[skill]}_mod}[${skillList[skill].toUpperCase()}] @{${skill}_bonus}]]}}`
		});
		_.keys(abilityScores).forEach((abbreviation)=>{
			setObj[`${abilityScores[abbreviation]}_check_macro`]=`{{d20=[[@{advantage_state} + @{${abilityScores[abbreviation]}_mod}[${abbreviation.toUpperCase()}] @{${abilityScores[abbreviation]}_bonus}]]}}`;
			setObj[`${abilityScores[abbreviation]}_save_macro`]=`{{d20=[[@{advantage_state} + @{${abilityScores[abbreviation]}_mod}[${abbreviation.toUpperCase()}] + @{${abilityScores[abbreviation]}_save_proficiency}[Proficiency] @{${abilityScores[abbreviation]}_save_bonus}]]}}`;
		});
		sections.repeating_trait.forEach((id)=>{
			setObj[`repeating_trait_${id}_macro`]='{{source=@{source}}}';
		});
		['repeating_hack','repeating_action'].forEach((section)=>{
			sections[section].forEach((id)=>{
				setObj[`repeating_hack_${id}_attack_macro`]='{{d20=[[@{advantage_state} + @{attack_ability} + @{action_proficiency} + 0@{attack_bonus}]]}}';
				setObj[`repeating_hack_${id}_save_macro`]='{{dc=[[8 + @{save_ability} + @{action_proficiency} + 0@{dc_bonus}]]}}';
				[1,2].forEach((num)=>{
					setObj[`${section}_${id}_damage_${num}_macro`]=`{{damage_${num}=[[0@{damage_${num}} + @{damage_ability_${num}}]]}} {{regular_critical_${num}=[[0@{damage_${num}}]]}} {{is_custom_crit_${num}=@{critical_damage_${num}}}} {{custom_critical_${num}=[[0@{critical_damage_${num}}]]}}`;
				});
			});
		});
		set(setObj,changeDisplay);
	},

	NPC = function(getArray,sections){
		const setObj = {
			whisper_state:'/w gm'
		};
		_.keys(skillList).forEach((skill)=>{
			setObj[`${skill}_macro`]=`{{d20=[[@{advantage_state} + @{${skill}} @{${skill}_bonus}]]}}`
		});
		_.keys(abilityScores).forEach((abbreviation)=>{
			setObj[`${abilityScores[abbreviation]}_check_macro`]=`{{d20=[[@{advantage_state} + @{${abilityScores[abbreviation]}_mod}[${abbreviation.toUpperCase()}] @{${abilityScores[abbreviation]}_bonus}]]}}`;
			setObj[`${abilityScores[abbreviation]}_save_macro`]=`{{d20=[[@{advantage_state} + @{${abilityScores[abbreviation]}_save}[${abbreviation.toUpperCase()}] @{${abilityScores[abbreviation]}_save_bonus}]]}}`;
		});
		sections.repeating_trait.forEach((id)=>{
			setObj[`repeating_trait_${id}_macro`]='';
		});
		['repeating_hack','repeating_action'].forEach((section)=>{
			sections[section].forEach((id)=>{
				setObj[`${section}_${id}_attack_macro`]='{{d20=[[@{advantage_state} + 0@{attack_bonus}]]}}';
				setObj[`${section}_${id}_save_macro`]='{{dc=[[0@{dc_bonus}]]}}';
				[1,2].forEach((num)=>{
					setObj[`${section}_${id}_damage_${num}_macro`]=`{{damage_${num}=[[0@{damage_${num}}]]}} {{regular_critical_${num}=[[0@{damage_${num}}]]}} {{is_custom_crit_${num}=@{critical_damage_${num}}}} {{custom_critical_${num}=[[0@{critical_damage_${num}}]]}}`;
				});
			});
		});
		
		set(setObj,changeDisplay);
	},

	getSections = function(callback,getArray,trigger,sections,queue){
		queue = queue || JSON.parse(JSON.stringify(repeating_section_details));
		getArray = getArray || [];
		sections = sections || {};
		let section = queue.shift();
		getSectionIDs(section.section,(idArray)=>{
			sections[section.section]=[];
			idArray.forEach((id)=>{
				sections[section.section].push(id);
				section.fields.forEach((field)=>{
					getArray.push(`${section.section}_${id}_${field}`);
				});
			});
			if(_.isEmpty(queue)){
				callback(getArray,sections,trigger);
			}else{
				getSections(callback,getArray,trigger,sections,queue);
			}
		});
	},

	log = function(msg){
        const sheetName = 'Genefunk2090';
        if(typeof msg === 'string'){
            console.log(`%c${sheetName} log| ${msg}`,"background-color:#159ccf");
        }else if(typeof msg === 'object'){
        	Object.keys(msg).forEach((m)=>{
        		if(typeof msg[m] === 'string'){
        			console.log(`%c${sheetName} log| ${m}: ${msg[m]}`,"background-color:#159ccf");
        		}else{
		            console.log(`%c${sheetName} log| ${typeof msg[m]} ${m}`,"background-color:#159ccf");
		            console.table(msg[m]);
        		}
        	});
        }
    },

    openSheet = function(){
    	getSections(updateSheet,baseGet);
    },

    updateSheet = function(getArray,sections){
    	const setObj = {};
    	getAttrs([...getArray,'sheet_version'],(attr)=>{
    		if(!attr.sheet_version){
    			attr.sheet_version = 0;
    		}
    		if(attr.sheet_version*1 < 1.1) updateTo1_1(attr,setObj);//First update applied
    		if(attr.sheet_version*1 < 1.12) updateTo1_12(attr,setObj);//update 1.12; npc hp attribute change
    		if(attr.sheet_version*1 < 1.20) updateTo1_20(attr,setObj);
    		set(setObj);
    	});
    },

    updateTo1_20 = function(attr,setObj){
    	const damageEnablers = Object.keys(attr).filter(k => /(?:attack|damage_\d)_enable_item/.test(k));
    	damageEnablers.forEach(d => adjustActionMacro({sourceAttribute:d,triggerName:d,newValue:attr[d]},attr,setObj));
    	if(attr.character_type === 'npc'){
    		setObj.hit_points = attr.hp
    		setObj.hit_points_max = attr.hp_max;
    	}
    	attr = {...attr,...setObj};
    	setObj.sheet_version = 1.20;
    },

    updateTo1_12 = function(attr,setObj){
    	if(attr.character_type === 'npc'){
    		setObj.hp = attr.hit_points;
    		setObj.hp_max = attr.hit_points_max;
    	}
    	attr = {...attr,...setObj};
    	setObj.sheet_version = 1.12;
    },

    updateTo1_1 = function(attr,setObj){
    	let enableItems = Object.keys(attr).filter((a)=>/attack_enable_item/.test(a));
    	enableItems.forEach((check)=>{
			let macroName = check.replace(/attack_enable_item/,'attack_macro');
    		if(/@/.test(attr[check])){
    			setObj[check] = 1;
    			setObj[macroName] = `{{d20=[[@{advantage_state} ${attr.character_type === 'pc' ? '+ @{attack_ability} + @{action_proficiency}' : ''} + 0@{attack_bonus}]]}}`;
    		}else if(!attr[check]*1){
    			setObj[macroName] = ' ';
    			setObj[check] = 0;
    		}
    	});
    	setObj.sheet_version = 1.1;
    	attr = {...attr,...setObj};
    },

	bootUp = function(){
		log(`Sheet Starting up`);
	},

	set = function(obj,callback){
		setAttrs(obj,{silent:true},callback)
	};
	return {
	    BootUp: bootUp,
	    RegisterEventHandlers: registerEventHandlers
	};
}());
genefunk2090.BootUp();
genefunk2090.RegisterEventHandlers();