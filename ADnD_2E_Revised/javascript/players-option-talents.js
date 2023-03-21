const TALENTS = {};
TALENTS['Alertness'] = {
    'slots': 1,
    'points': 6,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Intuition}',
    'modifier': +1,
    'classes': '',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Ambidexterity'] = {
    'slots': 1,
    'points': 4,
    'abilityScore': '@{Dexterity}',
    'subAbilityScore': '@{Aim}',
    'modifier': 0,
    'classes': 'Warrior/Rogue',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Ambush'] = {
    'slots': 1,
    'points': 4,
    'abilityScore': '@{Intelligence}',
    'subAbilityScore': '@{Reason}',
    'modifier': 0,
    'rating': '5',
    'classes': 'Warrior/Rogue',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Camouflage'] = {
    'slots': 1,
    'points': 4,
    'abilityScore': '@{Intelligence}',
    'subAbilityScore': '@{Knowledge}',
    'modifier': 0,
    'rating': '5',
    'classes': 'Warrior/Rogue',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Dirty Fighting'] = {
    'slots': 1,
    'points': 3,
    'abilityScore': '@{Intelligence}',
    'subAbilityScore': '@{Knowledge}',
    'modifier': 0,
    'rating': '5',
    'classes': 'Warrior/Rogue',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Endurance'] = {
    'slots': 2,
    'points': 4,
    'abilityScore': '@{Constitution}',
    'subAbilityScore': '@{Fitness}',
    'modifier': 0,
    'rating': '3',
    'classes': 'Warrior',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Fine Balance'] = {
    'slots': 2,
    'points': 5,
    'abilityScore': '@{Dexterity}',
    'subAbilityScore': '@{Balance}',
    'modifier': 0,
    'rating': '7',
    'classes': 'Warrior/Rogue',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Iron Will'] = {
    'slots': 2,
    'points': 6,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Will}',
    'modifier': -2,
    'rating': '3',
    'classes': 'Warrior/Priest',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Leadership'] = {
    'slots': 1,
    'points': 3,
    'abilityScore': '@{Charisma}',
    'subAbilityScore': '@{Leadership}',
    'modifier': -1,
    'rating': '5',
    'classes': 'Warrior',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Quickness'] = {
    'slots': 2,
    'points': 6,
    'abilityScore': '@{Dexterity}',
    'subAbilityScore': '@{Aim}',
    'modifier': 0,
    'rating': '3',
    'classes': 'Warrior/Rogue',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Steady Hand'] = {
    'slots': 1,
    'points': 5,
    'abilityScore': '@{Dexterity}',
    'subAbilityScore': '@{Aim}',
    'modifier': 0,
    'classes': 'Warrior/Rogue',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Trouble Sense'] = {
    'slots': 1,
    'points': 4,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Intuition}',
    'modifier': 0,
    'rating': '3',
    'classes': '',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Flying Kick'] = {
    'slots': 1,
    'points': 3,
    'abilityScore': '@{Strength}',
    'subAbilityScore': '@{Muscle}',
    'modifier': 0,
    'rating': '5',
    'classes': 'Warrior, Martial Arts Talents',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Backward Kick'] = {
    'slots': 1,
    'points': 3,
    'abilityScore': 'N/A',
    'subAbilityScore': '',
    'modifier': 0,
    'classes': 'Warrior/Priest/Rogue, Martial Arts Talents',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Spring'] = {
    'slots': 1,
    'points': 3,
    'abilityScore': '@{Dexterity}',
    'subAbilityScore': '@{Balance}',
    'modifier': 0,
    'rating': '5',
    'classes': 'Warrior/Rogue, Martial Arts Talents',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Crushing Blow'] = {
    'slots': 1,
    'points': 3,
    'abilityScore': 'N/A',
    'subAbilityScore': '',
    'modifier': 0,
    'classes': 'Warrior/Priest/Rogue, Martial Arts Talents',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Instant Stand'] = {
    'slots': 1,
    'points': 3,
    'abilityScore': '@{Dexterity}',
    'subAbilityScore': '@{Balance}',
    'modifier': 0,
    'rating': '7',
    'classes': 'Warrior/Priest/Rogue, Martial Arts Talents',
    'book': 'Player\'s Option: Combat & Tactics'
};
TALENTS['Missile Deflection'] = {
    'slots': 1,
    'points': 3,
    'abilityScore': 'N/A',
    'subAbilityScore': '',
    'modifier': 0,
    'classes': 'Warrior/Priest/Rogue, Martial Arts Talents',
    'book': 'Player\'s Option: Combat & Tactics'
};
module.exports = TALENTS;