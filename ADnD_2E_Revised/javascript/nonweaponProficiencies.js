const NONWEAPON_PROFICIENCIES_TABLE = {};
//#region Player's Handbook
NONWEAPON_PROFICIENCIES_TABLE['Agriculture'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Agriculture'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Animal Handling'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Animal Handling'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Animal Training'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Animal Training'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Artistic Ability'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Artistic Ability'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Blacksmithing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Blacksmithing'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Brewing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Brewing'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Carpentry'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Carpentry'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Cobbling'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Cobbling'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Cooking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Cooking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Dancing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Dancing'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Direction Sense'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Direction Sense'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +1,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Etiquette'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Etiquette'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Fire-building'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Fire-building'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Fishing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Fishing'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Heraldry'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Heraldry'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Languages, Modern'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Languages, Modern'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Leatherworking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Leatherworking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Mining'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Mining'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': -3,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Pottery'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Pottery'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Riding, Airborne'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Riding, Airborne'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Riding, Land-based'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Riding, Land-based'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +3,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Rope Use'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Rope Use'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Seamanship'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Seamanship'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +1,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Seamstress/Tailor'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Seamstress/Tailor'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Singing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Singing'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Stonemasonry'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Stonemasonry'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': -2,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Swimming'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Swimming'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Weather Sense'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Weather Sense'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});

NONWEAPON_PROFICIENCIES_TABLE['Weaving'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Weaving'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Ancient History'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Ancient History'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Priest/Rogue/Wizard',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Animal Lore'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Animal Lore'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Appraising'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Appraising'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Armorer'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Armorer'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Astrology'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Astrology'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Blind-fighting'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Blind-fighting'].push({
    'slots': 2,
    'abilityScore': '@{NA}',
    'modifier': 'NA',
    'classes': 'Rogue/Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Bowyer/Fletcher'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Bowyer/Fletcher'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Charioteering'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Charioteering'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +2,
    'classes': 'Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Disguise'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Disguise'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -1,
    'classes': 'Rogue',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Endurance'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Endurance'].push({
    'slots': 2,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Engineering'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Engineering'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -3,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Forgery'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Forgery'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Rogue',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Gaming'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Gaming'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Rogue/Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Gem-Cutting'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Gem-Cutting'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': 'Rogue/Wizard',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Healing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Healing'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': 'Priest',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Herbalism'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Herbalism'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Hunting'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Hunting'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Juggling'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Juggling'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Rogue',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Jumping'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Jumping'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Languages, Ancient'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Languages, Ancient'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Local History'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Local History'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Priest/Rogue',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Mountaineering'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Mountaineering'].push({
    'slots': 1,
    'abilityScore': 'NA',
    'modifier': 'NA',
    'classes': 'Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Musical Instrument'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Musical Instrument'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Priest/Rogue',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Navigation'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Navigation'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Priest/Warrior/Wizard',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Reading Lips'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Reading Lips'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Rogue',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Reading/Writing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Reading/Writing'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +1,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Religion'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Religion'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Running'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Running'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': -6,
    'classes': 'Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Set Snares'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Set Snares'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Rogue/Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Spellcraft'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Spellcraft'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Survival'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Survival'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Tightrope Walking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Tightrope Walking'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Tracking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Tracking'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Tumbling'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Tumbling'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Ventriloquism'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Ventriloquism'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Rogue',
    'book': ['PHB']
});
NONWEAPON_PROFICIENCIES_TABLE['Weaponsmithing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Weaponsmithing'].push({
    'slots': 3,
    'abilityScore': '@{Intelligence}',
    'modifier': -3,
    'classes': 'Warrior',
    'book': ['PHB']
});
//#endregion

//#region The Complete Thief's Handbook
NONWEAPON_PROFICIENCIES_TABLE['Alertness'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Alertness'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +1,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids','The Complete Ranger\'s Handbook','The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Animal Noise'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Animal Noise'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Begging'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Begging'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': '?{Current Locale?|Uninhabited/Wilderness,-99|Countryside,-7|Hamlet/Village,-5|Town,-0,City,0}',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Boating'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Boating'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +1,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Ranger\'s Handbook','The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Fast-Talking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Fast-Talking'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': '',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Fortune Telling'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Fortune Telling'].push({
    'slots': 2,
    'abilityScore': '@{Charisma}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Information Gathering'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Information Gathering'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': '',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids','The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Intimidation'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Intimidation'].push({
    'slots': 1,
    'abilityScore': '?{Intimidation with?|@{Strength}|@{Charisma}}',
    'modifier': '',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Dwarves','The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Locksmithing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Locksmithing'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Looting'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Looting'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Observation'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Observation'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids','The Complete Ninja\'s Handbook','Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Trailing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Trailing'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': '',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Voice Mimicry'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Voice Mimicry'].push({
    'slots': 2,
    'abilityScore': '@{Charisma}',
    'modifier': '',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids','The Complete Ninja\'s Handbook']
});
//#endregion

//#region The Complete Book of Dwarves
NONWEAPON_PROFICIENCIES_TABLE['Appraising (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Appraising (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +3,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Dwarf Runes'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Dwarf Runes'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Dwarf Runes (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Dwarf Runes (Dwarf)'].push({
    'slots': 0,
    'abilityScore': '@{Intelligence}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Endurance (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Endurance (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Fungi Recognition'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Fungi Recognition'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +3,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Local Dwarf History'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Local Dwarf History'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Navigation, Underground'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Navigation, Underground'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Riding, Land-Based (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Riding, Land-Based (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Sign Language'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Sign Language'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Signalling'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Signalling'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Singing (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Singing (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Slow Respiration'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Slow Respiration'].push({
    'slots': 1,
    'abilityScore': '@{NA}',
    'modifier': 'NA',
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Sound Analysis'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Sound Analysis'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Survival, Underground'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Survival, Underground'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Armorer (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Armorer (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Blacksmithing (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Blacksmithing (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': +1,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Bowyer/Fletcher (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Bowyer/Fletcher (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Brewing (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Brewing (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +1,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Engineering (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Engineering (Dwarf)'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Gem Cutting (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Gem Cutting (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Herbalism (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Herbalism (Dwarf)'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Locksmithing (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Locksmithing (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +1,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Mining (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Mining (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Pottery (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Pottery (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -3,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Seamstress/Tailor (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Seamstress/Tailor (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Smelting'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Smelting'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Stonemasonry (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Stonemasonry (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Weaponsmithing (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Weaponsmithing (Dwarf)'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Weaving (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Weaving (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Ancient History (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Ancient History (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Blind-fighting (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Blind-fighting (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{NA}',
    'modifier': 'NA',
    'classes': 'Warrior/Thief',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Disguise (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Disguise (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -2,
    'classes': 'Thief',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Forgery (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Forgery (Dwarf)'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Thief',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Hunting (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Hunting (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': '-2',
    'classes': 'Warrior',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Juggling (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Juggling (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': 'Thief',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Lip Reading (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Lip Reading (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Thief',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Musical Instrument (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Musical Instrument (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': 'Thief/Priest',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Pest Control'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Pest Control'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Thief',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Survival (Hill, Mountain)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Survival (Hill, Mountain)'].push({
    'slots': 1,
    'abilityScore': '@{NA}',
    'modifier': 'NA',
    'classes': 'Warrior',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Boating (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Boating (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Special Background',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Boatwright'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Boatwright'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Special Background',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Navigation (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Navigation (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -3,
    'classes': 'Special Background',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Swimming (Dwarf)'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Swimming (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': -1,
    'classes': 'Special Background',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Grade or Slope in Passage'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Grade or Slope in Passage'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +4,
    'classes': '(Optional) Dwarven Detection',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['New Tunnel/Passage Construction'] = [];
NONWEAPON_PROFICIENCIES_TABLE['New Tunnel/Passage Construction'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +4,
    'classes': '(Optional) Dwarven Detection',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Sliding/Shifting Walls or Rooms'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Sliding/Shifting Walls or Rooms'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +2,
    'classes': '(Optional) Dwarven Detection',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Stonework Traps, Pits, and Deadfalls'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Stonework Traps, Pits, and Deadfalls'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '(Optional) Dwarven Detection',
    'book': ['The Complete Book of Dwarves']
});
NONWEAPON_PROFICIENCIES_TABLE['Approximate Depth Underground'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Approximate Depth Underground'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '(Optional) Dwarven Detection',
    'book': ['The Complete Book of Dwarves']
});
//#endregion

//#region The Complete Bard's Handbook
NONWEAPON_PROFICIENCIES_TABLE['Acting'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Acting'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -1,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook','The Complete Book of Humanoids','The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Chanting'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Chanting'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook','The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Craft Instrument'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Craft Instrument'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook','The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Crowd Working'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Crowd Working'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Poetry'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Poetry'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook','The Complete Book of Humanoids','The Complete Paladin\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Whistling/Humming'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Whistling/Humming'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook','The Complete Book of Humanoids']
});
//#endregion

//#region The Complete Book of Humanoids
NONWEAPON_PROFICIENCIES_TABLE['Cheesemaking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Cheesemaking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Danger Sense'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Danger Sense'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': +1,
    'classes': '',
    'book': ['The Complete Book of Humanoids','The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Drinking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Drinking'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Eating'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Eating'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Hiding'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Hiding'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': '',
    'book': ['The Complete Book of Humanoids','The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Winemaking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Winemaking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Close-quarter Fighting'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Close-quarter Fighting'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Warrior/Rogue',
    'book': ['The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Natural Fighting'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Natural Fighting'].push({
    'slots': 2,
    'abilityScore': '@{Strength}',
    'modifier': +1,
    'classes': 'Warrior',
    'book': ['The Complete Book of Humanoids']
});
NONWEAPON_PROFICIENCIES_TABLE['Wild Fighting'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Wild Fighting'].push({
    'slots': 2,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['The Complete Book of Humanoids','The Complete Barbarian\'s Handbook']
});
//#endregion

//#region The Complete Ranger's Handbook
NONWEAPON_PROFICIENCIES_TABLE['Cartography'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Cartography'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Distance Sense'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Distance Sense'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Falconry'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Falconry'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Persuasion'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Persuasion'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Riding, Sea-based'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Riding, Sea-based'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Signaling'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Signaling'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook','The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Camouflage'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Camouflage'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Fighter/Rogue',
    'book': ['The Complete Ranger\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Foraging'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Foraging'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Warrior/Rogue',
    'book': ['The Complete Ranger\'s Handbook','The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Spelunking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Spelunking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Warrior',
    'book': ['The Complete Ranger\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Trail Marking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Trail Marking'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['The Complete Ranger\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Trail Signs'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Trail Signs'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Warrior/Rogue',
    'book': ['The Complete Ranger\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Veterinary Healing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Veterinary Healing'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -3,
    'classes': 'Priest',
    'book': ['The Complete Ranger\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Weaponsmithing, Crude'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Weaponsmithing, Crude'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -3,
    'classes': 'Warrior',
    'book': ['The Complete Ranger\'s Handbook','The Complete Barbarian\'s Handbook']
});
//#endregion

//#region The Complete Paladin's Handbook
NONWEAPON_PROFICIENCIES_TABLE['Bureaucracy'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Bureaucracy'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest/Rogue',
    'book': ['The Complete Paladin\'s Handbook','Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Diagnostics'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Diagnostics'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': 'Priest',
    'book': ['The Complete Paladin\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Jousting'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Jousting'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +2,
    'classes': 'Warrior',
    'book': ['The Complete Paladin\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Law'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Law'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Warrior/Priest',
    'book': ['The Complete Paladin\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Oratory'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Oratory'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Warrior/Priest',
    'book': ['The Complete Paladin\'s Handbook']
});
//#endregion

//#region The Complete Barbarian's Handbook
NONWEAPON_PROFICIENCIES_TABLE['Clothesmaking, Crude'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Clothesmaking, Crude'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': '',
    'book': ['The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Animal Rending'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Animal Rending'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +2,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Armorer, Crude'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Armorer, Crude'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Bartering'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Bartering'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Rogue',
    'book': ['The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Bowyer/Fletcher, Crude'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Bowyer/Fletcher, Crude'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Horde Summoning'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Horde Summoning'].push({
    'slots': 2,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Leadership'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Leadership'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Light Sleeping'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Light Sleeping'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Sign Language'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Set Snares'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Fighter',
    'book': ['The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Soothsaying'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Soothsaying'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest',
    'book': ['The Complete Barbarian\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Weapon Improvisation'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Weapon Improvisation'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
//#endregion

//#region The Complete Book of Necromancers
NONWEAPON_PROFICIENCIES_TABLE['Anatomy'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Anatomy'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Necromancers']
});
NONWEAPON_PROFICIENCIES_TABLE['Necrology'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Necrology'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Necromancers']
});
NONWEAPON_PROFICIENCIES_TABLE['Netherworld Knowledge'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Netherworld Knowledge'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -3,
    'classes': '',
    'book': ['The Complete Book of Necromancers']
});
NONWEAPON_PROFICIENCIES_TABLE['Spirit Lore'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Spirit Lore'].push({
    'slots': 2,
    'abilityScore': '@{Charisma}',
    'modifier': -4,
    'classes': '',
    'book': ['The Complete Book of Necromancers']
});
NONWEAPON_PROFICIENCIES_TABLE['Venom Handling'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Venom Handling'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Book of Necromancers']
});
//#endregion

//#region The Complete Ninja's Handbook
NONWEAPON_PROFICIENCIES_TABLE['City Familiarity'] = [];
NONWEAPON_PROFICIENCIES_TABLE['City Familiarity'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Style Analysis'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Style Analysis'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Assimilation'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Assimilation'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Detect Signing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Detect Signing'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +1,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Enamor'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Enamor'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -2,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Escape'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Escape'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Feign/Detect Sleep'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Feign/Detect Sleep'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Giant Kite Flying'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Giant Kite Flying'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -3,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Hold Breath'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Hold Breath'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Night Vision'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Night Vision'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Toxicology'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Toxicology'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Quick Study'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Quick Study'].push({
    'slots': 2,
    'abilityScore': '',
    'modifier': -3,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Underclass'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Underclass'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
NONWEAPON_PROFICIENCIES_TABLE['Water Walking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Water Walking'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
//#endregion

//#region Player's Option: Spells & Magic
NONWEAPON_PROFICIENCIES_TABLE['Alchemy'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Alchemy'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -3,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Anatomy'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Arcanology'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Arcanology'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -3,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Bookbinding'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Bookbinding'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest/Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Concentration'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Concentration'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Dowsing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Dowsing'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -3,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Glassblowing'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Glassblowing'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Hypnotism'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Hypnotism'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -2,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Mental Resistance'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Mental Resistance'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Omen Reading'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Omen Reading'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': 'Priest/Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Papermaking'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Papermaking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest/Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Prestidigitation'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Prestidigitation'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Research'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Research'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Sage Knowledge'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Sage Knowledge'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Priest/Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Scribe'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Scribe'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +1,
    'classes': 'Priest/Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Tactics of Magic'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Tactics of Magic'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Thaumaturgy'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Thaumaturgy'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Administration'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Administration'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +1,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Alms'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Alms'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Ceremony'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Ceremony'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Diplomacy'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Diplomacy'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -1,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Investigation'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Investigation'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Law'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Oratory'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -1,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Persuasion'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -2,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
NONWEAPON_PROFICIENCIES_TABLE['Undead Lore'] = [];
NONWEAPON_PROFICIENCIES_TABLE['Undead Lore'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
//#endregion
module.exports = NONWEAPON_PROFICIENCIES_TABLE;