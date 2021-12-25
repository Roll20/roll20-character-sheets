/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033,-*/
//Sheet Variables
const sheetName = 'SCP';
const version = 1;
let debugMode = false;
const abilityScores = ['strength','health','perception','dexterity','fate','charisma','intelligence','willpower'];
const dieSizes = [8,10,12];
const baseRollText = `{{character_name=@{character_name}}} {{character_id=@{character_id}}} {{security_level=@{security_level}}}`;
const rollPlaceholders = (insert='',computeVal='computed value') => `@{template_start} ${insert} {{high_sides_1=[[0[${computeVal}]]]}} {{high_sides_2=[[0[${computeVal}]]]}} {{high_1=[[0[${computeVal}]]]}} {{high_2=[[0[${computeVal}]]]}} {{ones=[[0[${computeVal}]]]}} {{total=[[0[${computeVal}]]]}} {{finished=[[0[${computeVal}]]]}} {{display_results=true}} ${baseRollText}`;
const expCosts = {
  d8:100,
  d10:200,
  d12:500
};
//Object that defines how the attributes affect each other
const repeatingSectionDetails = [
  {section:'repeating_attack',fields:['weapon','stance','skill','x_damage','recoil','recoil_base']}
];
const cascades = {
  /*template
  attribute_name:{
    name:'attribute_name',
    defaultValue:'string or number',
    type:'number or text',
    affects:['array','of','attributes','affected'],
    calculation:funcCall//Calculation for this attribute; optional property
  }
  */
  //available dice
  available_d8:{
  name:'available_d8',defaultValue:20,type:'number',affects:[],calculation:availableDice},
  available_d10:{
  name:'available_d10',defaultValue:4,type:'number',affects:[],calculation:availableDice},
  available_d12:{
  name:'available_d12',defaultValue:0,type:'number',affects:[],calculation:availableDice},
  //purchased dice
  purchased_d8:{
  name:'purchased_d8',defaultValue:20,type:'number',affects:['available_d8'],calculation:purchasedDice},
  purchased_d10:{
  name:'purchased_d10',defaultValue:4,type:'number',affects:['available_d10'],calculation:purchasedDice},
  purchased_d12:{
  name:'purchased_d12',defaultValue:0,type:'number',affects:['available_d12'],calculation:purchasedDice},
  //total dice
  total_d8:{
  name:'total_d8',defaultValue:20,type:'number',affects:['available_d8']},
  total_d10:{
  name:'total_d10',defaultValue:4,type:'number',affects:['available_d10']},
  total_d12:{
  name:'total_d12',defaultValue:0,type:'number',affects:['available_d12']},
  
  //ability score dice
  strength_d8:{name:'strength_d8',defaultValue:0,type:'number',affects:['purchased_d8'],triggeredFuncs:[verifyDiePurchase]},
  strength_d10:{name:'strength_d10',defaultValue:0,type:'number',affects:['purchased_d10','melee_multiplier'],triggeredFuncs:[verifyDiePurchase]},
  strength_d12:{name:'strength_d12',defaultValue:0,type:'number',affects:['purchased_d12','melee_multiplier','repeating_attack_$X_recoil'],triggeredFuncs:[verifyDiePurchase]},
  health_d8:{name:'health_d8',defaultValue:0,type:'number',affects:['purchased_d8','hp_max'],triggeredFuncs:[verifyDiePurchase]},
  health_d10:{name:'health_d10',defaultValue:0,type:'number',affects:['purchased_d10','hp_max'],triggeredFuncs:[verifyDiePurchase]},
  health_d12:{name:'health_d12',defaultValue:0,type:'number',affects:['purchased_d12','hp_max'],triggeredFuncs:[verifyDiePurchase]},
  perception_d8:{name:'perception_d8',defaultValue:0,type:'number',affects:['purchased_d8'],triggeredFuncs:[verifyDiePurchase]},
  perception_d10:{name:'perception_d10',defaultValue:0,type:'number',affects:['purchased_d10','reaction_defense','ranged_multiplier'],triggeredFuncs:[verifyDiePurchase]},
  perception_d12:{name:'perception_d12',defaultValue:0,type:'number',affects:['purchased_d12','ranged_multiplier'],triggeredFuncs:[verifyDiePurchase]},
  dexterity_d8:{name:'dexterity_d8',defaultValue:0,type:'number',affects:['purchased_d8'],triggeredFuncs:[verifyDiePurchase]},
  dexterity_d10:{name:'dexterity_d10',defaultValue:0,type:'number',affects:['purchased_d10'],triggeredFuncs:[verifyDiePurchase]},
  dexterity_d12:{name:'dexterity_d12',defaultValue:0,type:'number',affects:['purchased_d12','reaction_defense','move_speed'],triggeredFuncs:[verifyDiePurchase]},
  fate_d8:{name:'fate_d8',defaultValue:0,type:'number',affects:['purchased_d8'],triggeredFuncs:[verifyDiePurchase,startingReverence]},
  fate_d10:{name:'fate_d10',defaultValue:0,type:'number',affects:['purchased_d10'],triggeredFuncs:[verifyDiePurchase,startingReverence]},
  fate_d12:{name:'fate_d12',defaultValue:0,type:'number',affects:['purchased_d12'],triggeredFuncs:[verifyDiePurchase]},
  charisma_d8:{name:'charisma_d8',defaultValue:0,type:'number',affects:['purchased_d8'],triggeredFuncs:[verifyDiePurchase]},
  charisma_d10:{name:'charisma_d10',defaultValue:0,type:'number',affects:['purchased_d10'],triggeredFuncs:[verifyDiePurchase]},
  charisma_d12:{name:'charisma_d12',defaultValue:0,type:'number',affects:['purchased_d12'],triggeredFuncs:[verifyDiePurchase]},
  intelligence_d8:{name:'intelligence_d8',defaultValue:0,type:'number',affects:['purchased_d8'],triggeredFuncs:[verifyDiePurchase]},
  intelligence_d10:{name:'intelligence_d10',defaultValue:0,type:'number',affects:['purchased_d10','reaction_defense'],triggeredFuncs:[verifyDiePurchase]},
  intelligence_d12:{name:'intelligence_d12',defaultValue:0,type:'number',affects:['purchased_d12'],triggeredFuncs:[verifyDiePurchase]},
  willpower_d8:{name:'willpower_d8',defaultValue:0,type:'number',affects:['purchased_d8'],triggeredFuncs:[verifyDiePurchase]},
  willpower_d10:{name:'willpower_d10',defaultValue:0,type:'number',affects:['purchased_d10','exertion_max'],triggeredFuncs:[verifyDiePurchase]},
  willpower_d12:{name:'willpower_d12',defaultValue:0,type:'number',affects:['purchased_d12'],triggeredFuncs:[verifyDiePurchase]},

  //Exertion & Reverence
  exertion:{name:'exertion',defaultValue:0,type:'number',affects:[],triggeredFuncs:[verifyExertion]},
  exertion_max:{name:'exertion_max',defaultValue:0,type:'number',affects:['cognitive_resistance'],calculation:exertionCalc,triggeredFuncs:[verifyExertion]},
  reverence:{name:'reverence',defaultValue:0,type:'number',affects:[],triggeredFuncs:[]},

  //Appearance, Body type, and Reasoning
  appearance:{name:'appearance',defaultValue:'average',type:'text',affects:['negotiation/persuade_mod','fashion/etiquette_mod','leadership_mod','disguise/blend_in_mod','intimidate/taunt_mod','showmanship_mod','resist_distress_mod']},
  body_type:{name:'body_type',defaultValue:'average',type:'text',affects:['hp_max','reaction_defense']},
  reasoning:{name:'reasoning',defaultValue:'scientific',type:'text',affects:['cognitive_resistance','resist_distress_mod','initiative_mod','intuition_mod','occult/scp_lore_mod']},

  //hp
  hp:{name:'hp',defaultValue:0,type:'number',affects:[]},
  hp_max:{name:'hp_max',defaultValue:0,type:'number',affects:[],calculation:hpCalc},

  //defenses
  reaction_defense:{name:'reaction_defense',defaultValue:0,type:'number',affects:[],calculation:rdCalc},
  cognitive_resistance:{name:'cognitive_resistance',defaultValue:0,type:'number',affects:[],calculation:cognitiveCalc},
  move_speed:{name:'move_speed',defaultValue:0,type:'number',affects:[],calculation:moveCalc},

  //damage multipliers
  melee_multiplier:{name:'melee_multiplier',defaultValue:0,type:'number',affects:[],calculation:damageMultiplierCalc},
  ranged_multiplier:{name:'ranged_multiplier',defaultValue:0,type:'number',affects:[],calculation:damageMultiplierCalc},

  //Actions
  //Attack skills
  'melee_base_mod':{name:'melee_base_mod',defaultvalue:0,type:'number',affects:['melee_mod']},
  'melee_mod':{name:'melee_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'melee_proficiency':{name:'melee_proficiency',defaultvalue:0,type:'number',affects:[]},
  'assault_rifle_base_mod':{name:'assault_rifle_base_mod',defaultvalue:0,type:'number',affects:['assault_rifle_mod']},
  'assault_rifle_mod':{name:'assault_rifle_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'assault_rifle_proficiency':{name:'assault_rifle_proficiency',defaultvalue:0,type:'number',affects:[]},
  'handgun_base_mod':{name:'handgun_base_mod',defaultvalue:0,type:'number',affects:['handgun_mod']},
  'handgun_mod':{name:'handgun_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'handgun_proficiency':{name:'handgun_proficiency',defaultvalue:0,type:'number',affects:[]},
  'heavy_artillery_base_mod':{name:'heavy_artillery_base_mod',defaultvalue:0,type:'number',affects:['heavy_artillery_mod']},
  'heavy_artillery_mod':{name:'heavy_artillery_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'heavy_artillery_proficiency':{name:'heavy_artillery_proficiency',defaultvalue:0,type:'number',affects:[]},
  'hunting/sniper_rifle_base_mod':{name:'hunting/sniper_rifle_base_mod',defaultvalue:0,type:'number',affects:['hunting/sniper_rifle_mod']},
  'hunting/sniper_rifle_mod':{name:'hunting/sniper_rifle_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'hunting/sniper_rifle_proficiency':{name:'hunting/sniper_rifle_proficiency',defaultvalue:0,type:'number',affects:[]},
  'shotgun_base_mod':{name:'shotgun_base_mod',defaultvalue:0,type:'number',affects:['shotgun_mod']},
  'shotgun_mod':{name:'shotgun_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'shotgun_proficiency':{name:'shotgun_proficiency',defaultvalue:0,type:'number',affects:[]},
  'submachine_gun_base_mod':{name:'submachine_gun_base_mod',defaultvalue:0,type:'number',affects:['submachine_gun_mod']},
  'submachine_gun_mod':{name:'submachine_gun_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'submachine_gun_proficiency':{name:'submachine_gun_proficiency',defaultvalue:0,type:'number',affects:[]},
  //non attack skills
  'acting/lie_base_mod':{name:'acting/lie_base_mod',defaultvalue:0,type:'number',affects:['acting/lie_mod']},
  'acting/lie_mod':{name:'acting/lie_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'acting/lie_proficiency':{name:'acting/lie_proficiency',defaultvalue:0,type:'number',affects:[]},
  'art/music_base_mod':{name:'art/music_base_mod',defaultvalue:0,type:'number',affects:['art/music_mod']},
  'art/music_mod':{name:'art/music_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'art/music_proficiency':{name:'art/music_proficiency',defaultvalue:0,type:'number',affects:[]},
  'break_free/escape_base_mod':{name:'break_free/escape_base_mod',defaultvalue:0,type:'number',affects:['break_free/escape_mod']},
  'break_free/escape_mod':{name:'break_free/escape_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'break_free/escape_proficiency':{name:'break_free/escape_proficiency',defaultvalue:0,type:'number',affects:[]},
  'catch/throw_base_mod':{name:'catch/throw_base_mod',defaultvalue:0,type:'number',affects:['catch/throw_mod']},
  'catch/throw_mod':{name:'catch/throw_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'catch/throw_proficiency':{name:'catch/throw_proficiency',defaultvalue:0,type:'number',affects:[]},
  'climb_base_mod':{name:'climb_base_mod',defaultvalue:0,type:'number',affects:['climb_mod']},
  'climb_mod':{name:'climb_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'climb_proficiency':{name:'climb_proficiency',defaultvalue:0,type:'number',affects:[]},
  'disguise/blend_in_base_mod':{name:'disguise/blend_in_base_mod',defaultvalue:0,type:'number',affects:['disguise/blend_in_mod']},
  'disguise/blend_in_mod':{name:'disguise/blend_in_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'disguise/blend_in_proficiency':{name:'disguise/blend_in_proficiency',defaultvalue:0,type:'number',affects:[]},
  'drive_base_mod':{name:'drive_base_mod',defaultvalue:0,type:'number',affects:['drive_mod']},
  'drive_mod':{name:'drive_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'drive_proficiency':{name:'drive_proficiency',defaultvalue:0,type:'number',affects:[]},
  'lock-picking_base_mod':{name:'lock-picking_base_mod',defaultvalue:0,type:'number',affects:['lock-picking_mod']},
  'lock-picking_mod':{name:'lock-picking_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'lock-picking_proficiency':{name:'lock-picking_proficiency',defaultvalue:0,type:'number',affects:[]},
  'pickpocket_base_mod':{name:'pickpocket_base_mod',defaultvalue:0,type:'number',affects:['pickpocket_mod']},
  'pickpocket_mod':{name:'pickpocket_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'pickpocket_proficiency':{name:'pickpocket_proficiency',defaultvalue:0,type:'number',affects:[]},
  'pilot_base_mod':{name:'pilot_base_mod',defaultvalue:0,type:'number',affects:['pilot_mod']},
  'pilot_mod':{name:'pilot_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'pilot_proficiency':{name:'pilot_proficiency',defaultvalue:0,type:'number',affects:[]},
  'stealth/hide_base_mod':{name:'stealth/hide_base_mod',defaultvalue:0,type:'number',affects:['stealth/hide_mod']},
  'stealth/hide_mod':{name:'stealth/hide_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'stealth/hide_proficiency':{name:'stealth/hide_proficiency',defaultvalue:0,type:'number',affects:[]},
  'showmanship_base_mod':{name:'showmanship_base_mod',defaultvalue:0,type:'number',affects:['showmanship_mod']},
  'showmanship_mod':{name:'showmanship_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'showmanship_proficiency':{name:'showmanship_proficiency',defaultvalue:0,type:'number',affects:[]},
  'swim_base_mod':{name:'swim_base_mod',defaultvalue:0,type:'number',affects:['swim_mod']},
  'swim_mod':{name:'swim_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'swim_proficiency':{name:'swim_proficiency',defaultvalue:0,type:'number',affects:[]},
  'teaching_base_mod':{name:'teaching_base_mod',defaultvalue:0,type:'number',affects:['teaching_mod']},
  'teaching_mod':{name:'teaching_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'teaching_proficiency':{name:'teaching_proficiency',defaultvalue:0,type:'number',affects:[]},
  'wrestle/disarm_base_mod':{name:'wrestle/disarm_base_mod',defaultvalue:0,type:'number',affects:['wrestle/disarm_mod']},
  'wrestle/disarm_mod':{name:'wrestle/disarm_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'wrestle/disarm_proficiency':{name:'wrestle/disarm_proficiency',defaultvalue:0,type:'number',affects:[]},
  'writing_base_mod':{name:'writing_base_mod',defaultvalue:0,type:'number',affects:['writing_mod']},
  'writing_mod':{name:'writing_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'writing_proficiency':{name:'writing_proficiency',defaultvalue:0,type:'number',affects:[]},
  //knowledges
  'anatomy/first_aid_base_mod':{name:'anatomy/first_aid_base_mod',defaultvalue:0,type:'number',affects:['anatomy/first_aid_mod']},
  'anatomy/first_aid_mod':{name:'anatomy/first_aid_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'anatomy/first_aid_proficiency':{name:'anatomy/first_aid_proficiency',defaultvalue:0,type:'number',affects:[]},
  'ancient_languages_base_mod':{name:'ancient_languages_base_mod',defaultvalue:0,type:'number',affects:['ancient_languages_mod']},
  'ancient_languages_mod':{name:'ancient_languages_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'ancient_languages_proficiency':{name:'ancient_languages_proficiency',defaultvalue:0,type:'number',affects:[]},
  'architecture_base_mod':{name:'architecture_base_mod',defaultvalue:0,type:'number',affects:['architecture_mod']},
  'architecture_mod':{name:'architecture_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'architecture_proficiency':{name:'architecture_proficiency',defaultvalue:0,type:'number',affects:[]},
  'astronomy_base_mod':{name:'astronomy_base_mod',defaultvalue:0,type:'number',affects:['astronomy_mod']},
  'astronomy_mod':{name:'astronomy_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'astronomy_proficiency':{name:'astronomy_proficiency',defaultvalue:0,type:'number',affects:[]},
  'caretaking/nurture_base_mod':{name:'caretaking/nurture_base_mod',defaultvalue:0,type:'number',affects:['caretaking/nurture_mod']},
  'caretaking/nurture_mod':{name:'caretaking/nurture_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'caretaking/nurture_proficiency':{name:'caretaking/nurture_proficiency',defaultvalue:0,type:'number',affects:[]},
  'computer/hacking_base_mod':{name:'computer/hacking_base_mod',defaultvalue:0,type:'number',affects:['computer/hacking_mod']},
  'computer/hacking_mod':{name:'computer/hacking_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'computer/hacking_proficiency':{name:'computer/hacking_proficiency',defaultvalue:0,type:'number',affects:[]},
  'cooking_base_mod':{name:'cooking_base_mod',defaultvalue:0,type:'number',affects:['cooking_mod']},
  'cooking_mod':{name:'cooking_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'cooking_proficiency':{name:'cooking_proficiency',defaultvalue:0,type:'number',affects:[]},
  'demolitions_base_mod':{name:'demolitions_base_mod',defaultvalue:0,type:'number',affects:['demolitions_mod']},
  'demolitions_mod':{name:'demolitions_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'demolitions_proficiency':{name:'demolitions_proficiency',defaultvalue:0,type:'number',affects:[]},
  'fashion/etiquette_base_mod':{name:'fashion/etiquette_base_mod',defaultvalue:0,type:'number',affects:['fashion/etiquette_mod']},
  'fashion/etiquette_mod':{name:'fashion/etiquette_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'fashion/etiquette_proficiency':{name:'fashion/etiquette_proficiency',defaultvalue:0,type:'number',affects:[]},
  'gambling/gaming_base_mod':{name:'gambling/gaming_base_mod',defaultvalue:0,type:'number',affects:['gambling/gaming_mod']},
  'gambling/gaming_mod':{name:'gambling/gaming_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'gambling/gaming_proficiency':{name:'gambling/gaming_proficiency',defaultvalue:0,type:'number',affects:[]},
  'general_knowledge_base_mod':{name:'general_knowledge_base_mod',defaultvalue:0,type:'number',affects:['general_knowledge_mod']},
  'general_knowledge_mod':{name:'general_knowledge_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'general_knowledge_proficiency':{name:'general_knowledge_proficiency',defaultvalue:0,type:'number',affects:[]},
  'history/lore_base_mod':{name:'history/lore_base_mod',defaultvalue:0,type:'number',affects:['history/lore_mod']},
  'history/lore_mod':{name:'history/lore_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'history/lore_proficiency':{name:'history/lore_proficiency',defaultvalue:0,type:'number',affects:[]},
  'identify_taste/smell_base_mod':{name:'identify_taste/smell_base_mod',defaultvalue:0,type:'number',affects:['identify_taste/smell_mod']},
  'identify_taste/smell_mod':{name:'identify_taste/smell_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'identify_taste/smell_proficiency':{name:'identify_taste/smell_proficiency',defaultvalue:0,type:'number',affects:[]},
  'investigate_base_mod':{name:'investigate_base_mod',defaultvalue:0,type:'number',affects:['investigate_mod']},
  'investigate_mod':{name:'investigate_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'investigate_proficiency':{name:'investigate_proficiency',defaultvalue:0,type:'number',affects:[]},
  'law/politics_base_mod':{name:'law/politics_base_mod',defaultvalue:0,type:'number',affects:['law/politics_mod']},
  'law/politics_mod':{name:'law/politics_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'law/politics_proficiency':{name:'law/politics_proficiency',defaultvalue:0,type:'number',affects:[]},
  'mathematics_base_mod':{name:'mathematics_base_mod',defaultvalue:0,type:'number',affects:['mathematics_mod']},
  'mathematics_mod':{name:'mathematics_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'mathematics_proficiency':{name:'mathematics_proficiency',defaultvalue:0,type:'number',affects:[]},
  'mechanics_base_mod':{name:'mechanics_base_mod',defaultvalue:0,type:'number',affects:['mechanics_mod']},
  'mechanics_mod':{name:'mechanics_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'mechanics_proficiency':{name:'mechanics_proficiency',defaultvalue:0,type:'number',affects:[]},
  'navigate_base_mod':{name:'navigate_base_mod',defaultvalue:0,type:'number',affects:['navigate_mod']},
  'navigate_mod':{name:'navigate_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'navigate_proficiency':{name:'navigate_proficiency',defaultvalue:0,type:'number',affects:[]},
  'occult/scp_lore_base_mod':{name:'occult/scp_lore_base_mod',defaultvalue:0,type:'number',affects:['occult/scp_lore_mod']},
  'occult/scp_lore_mod':{name:'occult/scp_lore_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'occult/scp_lore_proficiency':{name:'occult/scp_lore_proficiency',defaultvalue:0,type:'number',affects:[]},
  'psychology_base_mod':{name:'psychology_base_mod',defaultvalue:0,type:'number',affects:['psychology_mod']},
  'psychology_mod':{name:'psychology_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'psychology_proficiency':{name:'psychology_proficiency',defaultvalue:0,type:'number',affects:[]},
  'religion_base_mod':{name:'religion_base_mod',defaultvalue:0,type:'number',affects:['religion_mod']},
  'religion_mod':{name:'religion_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'religion_proficiency':{name:'religion_proficiency',defaultvalue:0,type:'number',affects:[]},
  'research/internet_base_mod':{name:'research/internet_base_mod',defaultvalue:0,type:'number',affects:['research/internet_mod']},
  'research/internet_mod':{name:'research/internet_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'research/internet_proficiency':{name:'research/internet_proficiency',defaultvalue:0,type:'number',affects:[]},
  'science/physics_base_mod':{name:'science/physics_base_mod',defaultvalue:0,type:'number',affects:['science/physics_mod']},
  'science/physics_mod':{name:'science/physics_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'science/physics_proficiency':{name:'science/physics_proficiency',defaultvalue:0,type:'number',affects:[]},
  'survival/tracking_base_mod':{name:'survival/tracking_base_mod',defaultvalue:0,type:'number',affects:['survival/tracking_mod']},
  'survival/tracking_mod':{name:'survival/tracking_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'survival/tracking_proficiency':{name:'survival/tracking_proficiency',defaultvalue:0,type:'number',affects:[]},
  'technology_base_mod':{name:'technology_base_mod',defaultvalue:0,type:'number',affects:['technology_mod']},
  'technology_mod':{name:'technology_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'technology_proficiency':{name:'technology_proficiency',defaultvalue:0,type:'number',affects:[]},
  'visual_signals/sign_lang._base_mod':{name:'visual_signals/sign_lang._base_mod',defaultvalue:0,type:'number',affects:['visual_signals/sign_lang._mod']},
  'visual_signals/sign_lang._mod':{name:'visual_signals/sign_lang._mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'visual_signals/sign_lang._proficiency':{name:'visual_signals/sign_lang._proficiency',defaultvalue:0,type:'number',affects:[]},
  //abilities
  'awareness/reaction_proficiency':{name:'awareness/reaction_proficiency',defaultvalue:0,type:'number',affects:['reaction_defense']},
  'dodge/block_base_mod':{name:'dodge/block_base_mod',defaultvalue:0,type:'number',affects:['dodge/block_mod']},
  'dodge/block_mod':{name:'dodge/block_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'dodge/block_proficiency':{name:'dodge/block_proficiency',defaultvalue:0,type:'number',affects:[]},
  'animal_ken/tame_base_mod':{name:'animal_ken/tame_base_mod',defaultvalue:0,type:'number',affects:['animal_ken/tame_mod']},
  'animal_ken/tame_mod':{name:'animal_ken/tame_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'animal_ken/tame_proficiency':{name:'animal_ken/tame_proficiency',defaultvalue:0,type:'number',affects:[]},
  'athletics_base_mod':{name:'athletics_base_mod',defaultvalue:0,type:'number',affects:['athletics_mod']},
  'athletics_mod':{name:'athletics_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'athletics_proficiency':{name:'athletics_proficiency',defaultvalue:0,type:'number',affects:[]},
  'empathy_base_mod':{name:'empathy_base_mod',defaultvalue:0,type:'number',affects:['empathy_mod']},
  'empathy_mod':{name:'empathy_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'empathy_proficiency':{name:'empathy_proficiency',defaultvalue:0,type:'number',affects:[]},
  'endurance_base_mod':{name:'endurance_base_mod',defaultvalue:0,type:'number',affects:['endurance_mod']},
  'endurance_mod':{name:'endurance_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'endurance_proficiency':{name:'endurance_proficiency',defaultvalue:0,type:'number',affects:[]},
  'initiative_base_mod':{name:'initiative_base_mod',defaultvalue:0,type:'number',affects:['initiative_mod']},
  'initiative_mod':{name:'initiative_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'initiative_proficiency':{name:'initiative_proficiency',defaultvalue:0,type:'number',affects:[]},
  'intimidate/taunt_base_mod':{name:'intimidate/taunt_base_mod',defaultvalue:0,type:'number',affects:['intimidate/taunt_mod']},
  'intimidate/taunt_mod':{name:'intimidate/taunt_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'intimidate/taunt_proficiency':{name:'intimidate/taunt_proficiency',defaultvalue:0,type:'number',affects:[]},
  'intuition_base_mod':{name:'intuition_base_mod',defaultvalue:0,type:'number',affects:['intuition_mod']},
  'intuition_mod':{name:'intuition_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'intuition_proficiency':{name:'intuition_proficiency',defaultvalue:0,type:'number',affects:[]},
  'jump_base_mod':{name:'jump_base_mod',defaultvalue:0,type:'number',affects:['jump_mod']},
  'jump_mod':{name:'jump_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'jump_proficiency':{name:'jump_proficiency',defaultvalue:0,type:'number',affects:[]},
  'leadership_base_mod':{name:'leadership_base_mod',defaultvalue:0,type:'number',affects:['leadership_mod']},
  'leadership_mod':{name:'leadership_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'leadership_proficiency':{name:'leadership_proficiency',defaultvalue:0,type:'number',affects:[]},
  'lift/push_base_mod':{name:'lift/push_base_mod',defaultvalue:0,type:'number',affects:['lift/push_mod']},
  'lift/push_mod':{name:'lift/push_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'lift/push_proficiency':{name:'lift/push_proficiency',defaultvalue:0,type:'number',affects:[]},
  'negotiation/persuade_base_mod':{name:'negotiation/persuade_base_mod',defaultvalue:0,type:'number',affects:['negotiation/persuade_mod']},
  'negotiation/persuade_mod':{name:'negotiation/persuade_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'negotiation/persuade_proficiency':{name:'negotiation/persuade_proficiency',defaultvalue:0,type:'number',affects:[]},
  'resist_ko/death_base_mod':{name:'resist_ko/death_base_mod',defaultvalue:0,type:'number',affects:['resist_ko/death_mod']},
  'resist_ko/death_mod':{name:'resist_ko/death_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'resist_ko/death_proficiency':{name:'resist_ko/death_proficiency',defaultvalue:0,type:'number',affects:[]},
  'resist_distress_base_mod':{name:'resist_distress_base_mod',defaultvalue:0,type:'number',affects:['resist_distress_mod']},
  'resist_distress_mod':{name:'resist_distress_mod',defaultvalue:0,type:'number',affects:[],calculation:actionModCalc},
  'resist_distress_proficiency':{name:'resist_distress_proficiency',defaultvalue:0,type:'number',affects:[]},
  'self-control_base_mod':{name:'self-control_base_mod',defaultvalue:0,type:'number',affects:['self-control_mod']},
  'self-control_mod':{name:'self-control_mod',defaultvalue:0,type:'number',affects:['cognitive_resistance'],calculation:actionModCalc},
  'self-control_proficiency':{name:'self-control_proficiency',defaultvalue:0,type:'number',affects:['cognitive_resistance']},


  //Attack Attributes
  repeating_attack_$X_recoil_base:{name:'repeating_attack_$X_recoil_base',defaultValue:0,type:'number',affects:['repeating_attack_$X_recoil']},
  repeating_attack_$X_recoil:{name:'repeating_attack_$X_recoil',defaultValue:0,type:'number',affects:[],calculation:recoilCalc},

  //Misc
  security_level:{name:'security_level',defaultValue:1,type:'number',affects:[],triggeredFuncs:[styleSecurity]},
  section:{name:'section',defaultValue:'all',type:'text',affects:[],triggeredFuncs:[sectionDisplay]}
};
const attributeChecks = abilityScores.reduce((m,attr)=>{
  m[attr]=attr;
  return m;
},{'melee':'dexterity','assault_rifle':'dexterity','handgun':'dexterity','*heavy_artillery':'dexterity','hunting/sniper_rifle':'dexterity','shotgun':'dexterity','submachine_gun':'dexterity','acting/lie':'charisma','art/music':'intelligence','break_free/escape':'strength','catch/throw':'dexterity','climb':'dexterity','disguise/blend_in':'charisma','drive':'dexterity','lock-picking':'dexterity','pickpocket':'charisma','*pilot':'intelligence','stealth/hide':'dexterity','showmanship':'charisma','swim':'dexterity','teaching':'intelligence','wrestle/disarm':'dexterity','writing':'intelligence','anatomy/first_aid':'intelligence','ancient_languages':'intelligence','architecture':'intelligence','astronomy':'intelligence','caretaking/nurture':'charisma','computer/hacking':'intelligence','cooking':'intelligence','demolitions':'intelligence','fashion/etiquette':'charisma','gambling/gaming':'fate','general_knowledge':'intelligence','history/lore':'intelligence','identify_taste/smell':'perception','investigate':'intelligence','law/politics':'intelligence','mathematics':'intelligence','mechanics':'intelligence','navigate':'intelligence','occult/scp_lore':'intelligence','psychology':'charisma','religion':'intelligence','research/internet':'intelligence','science/physics':'intelligence','survival/tracking':'perception','technology':'intelligence','visual_signals/sign_lang.':'intelligence','awareness/reaction':'perception','dodge/block':'dexterity','animal_ken/tame':'charisma','athletics':'dexterity','empathy':'charisma','endurance':'hth','initiative':'intelligence','intimidate/taunt':'charisma','intuition':'intelligence','jump':'dexterity','leadership':'charisma','lift/push':'strength','negotiation/persuade':'charisma','resist_ko/death':'fate','resist_distress':'willpower','self-control':'willpower','repeating_attack:roll':null,'reroll':null});
const repeatMonitor = [];
let toMonitor = Object.keys(cascades).reduce((m,k)=>{
  if(!/repeating/.test(k)){
    m.push(k);
  }else{
    k.replace(/(repeating_[^_]+?)_[^_]+?_(.+)/,(match,section,field)=>{
      repeatMonitor.push(`${section}:${field}`);
    });
  }
  return m;
},[]);
const baseGet = ['character_name',...toMonitor];
toMonitor = [...toMonitor,...repeatMonitor];
registerEventHandlers();
log(`Sheet Loaded`);