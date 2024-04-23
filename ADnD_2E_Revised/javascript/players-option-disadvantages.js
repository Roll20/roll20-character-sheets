const DISADVANTAGES = {};
DISADVANTAGES['Allergies'] = {
    'points': 3,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Allergies'] = {
    'points': 8,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Bad Tempered'] = {
    'points': 6,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Bruise Easily'] = {
    'points': 8,
    'abilityScore': 'N/A',
    'subAbilityScore': '',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Clumsy'] = {
    'points': 4,
    'abilityScore': '@{Dexterity}',
    'subAbilityScore': '',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Clumsy'] = {
    'points': 8,
    'abilityScore': 'ceil(@{Dexterity}/2)',
    'subAbilityScore': '',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Colorblind'] = {
    'points': 3,
    'abilityScore': 'N/A',
    'subAbilityScore': '',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Compulsive Honesty'] = {
    'points': 8,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Cowardice'] = {
    'points': 7,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Cowardice'] = {
    'points': 15,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Deep Sleeper'] = {
    'points': 7,
    'abilityScore': 'N/A',
    'subAbilityScore': '',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Fanaticism'] = {
    'points': 8,
    'abilityScore': 'N/A',
    'subAbilityScore': '',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Greed'] = {
    'points': 7,
    'abilityScore': 'N/A',
    'subAbilityScore': '',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Irritating Personality'] = {
    'points': 6,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Lazy'] = {
    'points': 7,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'modifier': -4,
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Powerful Enemy'] = {
    'points': 10,
    'abilityScore': 'N/A',
    'subAbilityScore': '',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Phobia: Crowds'] = {
    'points': 4,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Phobia: Crowds'] = {
    'points': 10,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Phobia: Darkness'] = {
    'points': 5,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Phobia: Darkness'] = {
    'points': 11,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Phobia: Enclosed Spaces'] = {
    'points': 5,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Phobia: Enclosed Spaces'] = {
    'points': 11,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Phobia: Heights'] = {
    'points': 5,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Phobia: Heights'] = {
    'points': 10,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Phobia: Magic'] = {
    'points': 8,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Phobia: Magic'] = {
    'points': 14,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Phobia: Monster (specific)'] = {
    'points': 4,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Phobia: Monster (specific)'] = {
    'points': 9,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Phobia: Snakes'] = {
    'points': 5,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Phobia: Snakes'] = {
    'points': 10,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Phobia: Spiders'] = {
    'points': 5,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Phobia: Spiders'] = {
    'points': 10,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Phobia: Undead'] = {
    'points': 8,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Phobia: Undead'] = {
    'points': 14,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Phobia: Water'] = {
    'points': 6,
    'abilityScore': '@{Wisdom}',
    'subAbilityScore': '@{Willpower}',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Severe Phobia: Water'] = {
    'points': 12,
    'abilityScore': 'ceil(@{Wisdom}/2)',
    'subAbilityScore': 'ceil(@{Willpower}/2)',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Tongue-Tied'] = {
    'points': 6,
    'abilityScore': 'N/A',
    'subAbilityScore': '',
    'book': 'Player\'s Option: Skills & Powers'
};
DISADVANTAGES['Unlucky'] = {
    'points': 8,
    'abilityScore': 'N/A',
    'subAbilityScore': '',
    'book': 'Player\'s Option: Skills & Powers'
};
module.exports = DISADVANTAGES;