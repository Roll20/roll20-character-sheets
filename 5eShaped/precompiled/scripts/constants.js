const SKILLS = {
  ACROBATICS: 'dexterity',
  ANIMALHANDLING: 'wisdom',
  ARCANA: 'intelligence',
  ATHLETICS: 'strength',
  DECEPTION: 'charisma',
  HISTORY: 'intelligence',
  INSIGHT: 'wisdom',
  INTIMIDATION: 'charisma',
  INVESTIGATION: 'intelligence',
  MEDICINE: 'wisdom',
  NATURE: 'intelligence',
  PERCEPTION: 'wisdom',
  PERFORMANCE: 'charisma',
  PERSUASION: 'charisma',
  RELIGION: 'intelligence',
  SLEIGHTOFHAND: 'dexterity',
  STEALTH: 'dexterity',
  SURVIVAL: 'wisdom',
};
const CLASSES = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];
const ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
const TOGGLE_VARS = {
  roll: '{{vs_ac=1}} @{roll_info} {{roll1=[[@{shaped_d20}cs>@{crit_range} + @{attack_formula}]]}} @{roll_setting}cs>@{crit_range} + @{attack_formula}]]}} {{targetAC=@{attacks_vs_target_ac}}} {{targetName=@{attacks_vs_target_name}}}',
  saving_throw: '{{saving_throw_condition=@{saving_throw_condition}}} {{saving_throw_dc=@{saving_throw_dc}}} {{saving_throw_vs_ability=@{saving_throw_vs_ability}}} {{saving_throw_failure=@{saving_throw_failure}}} {{saving_throw_success=@{saving_throw_success}}} {{targetName=@{attacks_vs_target_name}}}',
  damage: '{{damage=[[@{damage_formula}]]}} {{damage_type=@{damage_type}}} {{crit_damage=[[0d0 + @{damage_crit}[crit damage] @{damage_crit_formula}]]}}',
  second_damage: '{{second_damage=[[@{second_damage_formula}]]}} {{second_damage_type=@{second_damage_type}}} {{second_crit_damage=[[0d0 + @{second_damage_crit}[crit damage] @{second_damage_crit_formula}]]}}',
  heal: '{{heal=[[@{heal_formula}]]}}',
  heal_query: '?{Heal Bonus Amount|}',
  extras: '{{emote=@{emote}}} {{freetext=@{freetext}}} @{freeform}',
  higher_level: '{{cast_as_level=@{higher_level_query}}}',
};

export { SKILLS, CLASSES, ABILITIES, TOGGLE_VARS };
