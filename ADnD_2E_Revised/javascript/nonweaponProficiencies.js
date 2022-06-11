const nonweaponProficiencies = {};
//#region Player's Handbook
nonweaponProficiencies['Agriculture'] = [];
nonweaponProficiencies['Agriculture'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Animal Handling'] = [];
nonweaponProficiencies['Animal Handling'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Animal Training'] = [];
nonweaponProficiencies['Animal Training'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Artistic Ability'] = [];
nonweaponProficiencies['Artistic Ability'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Blacksmithing'] = [];
nonweaponProficiencies['Blacksmithing'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Brewing'] = [];
nonweaponProficiencies['Brewing'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Carpentry'] = [];
nonweaponProficiencies['Carpentry'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Cobbling'] = [];
nonweaponProficiencies['Cobbling'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Cooking'] = [];
nonweaponProficiencies['Cooking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Dancing'] = [];
nonweaponProficiencies['Dancing'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Direction Sense'] = [];
nonweaponProficiencies['Direction Sense'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +1,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Etiquette'] = [];
nonweaponProficiencies['Etiquette'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Fire-building'] = [];
nonweaponProficiencies['Fire-building'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Fishing'] = [];
nonweaponProficiencies['Fishing'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Heraldry'] = [];
nonweaponProficiencies['Heraldry'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Languages, Modern'] = [];
nonweaponProficiencies['Languages, Modern'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Leatherworking'] = [];
nonweaponProficiencies['Leatherworking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Mining'] = [];
nonweaponProficiencies['Mining'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': -3,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Pottery'] = [];
nonweaponProficiencies['Pottery'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Riding, Airborne'] = [];
nonweaponProficiencies['Riding, Airborne'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Riding, Land-based'] = [];
nonweaponProficiencies['Riding, Land-based'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +3,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Rope Use'] = [];
nonweaponProficiencies['Rope Use'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Seamanship'] = [];
nonweaponProficiencies['Seamanship'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +1,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Seamstress/Tailor'] = [];
nonweaponProficiencies['Seamstress/Tailor'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Singing'] = [];
nonweaponProficiencies['Singing'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Stonemasonry'] = [];
nonweaponProficiencies['Stonemasonry'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': -2,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Swimming'] = [];
nonweaponProficiencies['Swimming'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': 0,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Weather Sense'] = [];
nonweaponProficiencies['Weather Sense'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});

nonweaponProficiencies['Weaving'] = [];
nonweaponProficiencies['Weaving'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': '',
    'book': ['PHB']
});
nonweaponProficiencies['Ancient History'] = [];
nonweaponProficiencies['Ancient History'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Priest/Rogue/Wizard',
    'book': ['PHB']
});
nonweaponProficiencies['Animal Lore'] = [];
nonweaponProficiencies['Animal Lore'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Appraising'] = [];
nonweaponProficiencies['Appraising'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['PHB']
});
nonweaponProficiencies['Armorer'] = [];
nonweaponProficiencies['Armorer'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Astrology'] = [];
nonweaponProficiencies['Astrology'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
nonweaponProficiencies['Blind-fighting'] = [];
nonweaponProficiencies['Blind-fighting'].push({
    'slots': 2,
    'abilityScore': '@{NA}',
    'modifier': 'NA',
    'classes': 'Rogue/Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Bowyer/Fletcher'] = [];
nonweaponProficiencies['Bowyer/Fletcher'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Charioteering'] = [];
nonweaponProficiencies['Charioteering'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +2,
    'classes': 'Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Disguise'] = [];
nonweaponProficiencies['Disguise'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -1,
    'classes': 'Rogue',
    'book': ['PHB']
});
nonweaponProficiencies['Endurance'] = [];
nonweaponProficiencies['Endurance'].push({
    'slots': 2,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Engineering'] = [];
nonweaponProficiencies['Engineering'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -3,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
nonweaponProficiencies['Forgery'] = [];
nonweaponProficiencies['Forgery'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Rogue',
    'book': ['PHB']
});
nonweaponProficiencies['Gaming'] = [];
nonweaponProficiencies['Gaming'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Rogue/Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Gem-Cutting'] = [];
nonweaponProficiencies['Gem-Cutting'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': 'Rogue/Wizard',
    'book': ['PHB']
});
nonweaponProficiencies['Healing'] = [];
nonweaponProficiencies['Healing'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': 'Priest',
    'book': ['PHB']
});
nonweaponProficiencies['Herbalism'] = [];
nonweaponProficiencies['Herbalism'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
nonweaponProficiencies['Hunting'] = [];
nonweaponProficiencies['Hunting'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Juggling'] = [];
nonweaponProficiencies['Juggling'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Rogue',
    'book': ['PHB']
});
nonweaponProficiencies['Jumping'] = [];
nonweaponProficiencies['Jumping'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['PHB']
});
nonweaponProficiencies['Languages, Ancient'] = [];
nonweaponProficiencies['Languages, Ancient'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
nonweaponProficiencies['Local History'] = [];
nonweaponProficiencies['Local History'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Priest/Rogue',
    'book': ['PHB']
});
nonweaponProficiencies['Mountaineering'] = [];
nonweaponProficiencies['Mountaineering'].push({
    'slots': 1,
    'abilityScore': 'NA',
    'modifier': 'NA',
    'classes': 'Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Musical Instrument'] = [];
nonweaponProficiencies['Musical Instrument'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Priest/Rogue',
    'book': ['PHB']
});
nonweaponProficiencies['Navigation'] = [];
nonweaponProficiencies['Navigation'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Priest/Warrior/Wizard',
    'book': ['PHB']
});
nonweaponProficiencies['Reading Lips'] = [];
nonweaponProficiencies['Reading Lips'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Rogue',
    'book': ['PHB']
});
nonweaponProficiencies['Reading/Writing'] = [];
nonweaponProficiencies['Reading/Writing'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +1,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
nonweaponProficiencies['Religion'] = [];
nonweaponProficiencies['Religion'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
nonweaponProficiencies['Running'] = [];
nonweaponProficiencies['Running'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': -6,
    'classes': 'Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Set Snares'] = [];
nonweaponProficiencies['Set Snares'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Rogue/Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Spellcraft'] = [];
nonweaponProficiencies['Spellcraft'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Priest/Wizard',
    'book': ['PHB']
});
nonweaponProficiencies['Survival'] = [];
nonweaponProficiencies['Survival'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Tightrope Walking'] = [];
nonweaponProficiencies['Tightrope Walking'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['PHB']
});
nonweaponProficiencies['Tracking'] = [];
nonweaponProficiencies['Tracking'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['PHB']
});
nonweaponProficiencies['Tumbling'] = [];
nonweaponProficiencies['Tumbling'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['PHB']
});
nonweaponProficiencies['Ventriloquism'] = [];
nonweaponProficiencies['Ventriloquism'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Rogue',
    'book': ['PHB']
});
nonweaponProficiencies['Weaponsmithing'] = [];
nonweaponProficiencies['Weaponsmithing'].push({
    'slots': 3,
    'abilityScore': '@{Intelligence}',
    'modifier': -3,
    'classes': 'Warrior',
    'book': ['PHB']
});
//#endregion

//#region The Complete Thief's Handbook
nonweaponProficiencies['Alertness'] = [];
nonweaponProficiencies['Alertness'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +1,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids','The Complete Ranger\'s Handbook','The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Animal Noise'] = [];
nonweaponProficiencies['Animal Noise'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids']
});
nonweaponProficiencies['Begging'] = [];
nonweaponProficiencies['Begging'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': '?{Current Locale?|Uninhabited/Wilderness,-99|Countryside,-7|Hamlet/Village,-5|Town,-0,City,0}',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids']
});
nonweaponProficiencies['Boating'] = [];
nonweaponProficiencies['Boating'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +1,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Ranger\'s Handbook','The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Fast-Talking'] = [];
nonweaponProficiencies['Fast-Talking'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': '',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids']
});
nonweaponProficiencies['Fortune Telling'] = [];
nonweaponProficiencies['Fortune Telling'].push({
    'slots': 2,
    'abilityScore': '@{Charisma}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids']
});
nonweaponProficiencies['Information Gathering'] = [];
nonweaponProficiencies['Information Gathering'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': '',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids','The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Intimidation'] = [];
nonweaponProficiencies['Intimidation'].push({
    'slots': 1,
    'abilityScore': '?{Intimidation with?|@{Strength}|@{Charisma}}',
    'modifier': '',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Dwarves','The Complete Book of Humanoids']
});
nonweaponProficiencies['Locksmithing'] = [];
nonweaponProficiencies['Locksmithing'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook']
});
nonweaponProficiencies['Looting'] = [];
nonweaponProficiencies['Looting'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids']
});
nonweaponProficiencies['Observation'] = [];
nonweaponProficiencies['Observation'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids','The Complete Ninja\'s Handbook','Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Trailing'] = [];
nonweaponProficiencies['Trailing'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': '',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook']
});
nonweaponProficiencies['Voice Mimicry'] = [];
nonweaponProficiencies['Voice Mimicry'].push({
    'slots': 2,
    'abilityScore': '@{Charisma}',
    'modifier': '',
    'classes': '',
    'book': ['The Complete Thief\'s Handbook','The Complete Book of Humanoids','The Complete Ninja\'s Handbook']
});
//#endregion

//#region The Complete Book of Dwarves
nonweaponProficiencies['Appraising (Dwarf)'] = [];
nonweaponProficiencies['Appraising (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +3,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Dwarf Runes'] = [];
nonweaponProficiencies['Dwarf Runes'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Dwarf Runes (Dwarf)'] = [];
nonweaponProficiencies['Dwarf Runes (Dwarf)'].push({
    'slots': 0,
    'abilityScore': '@{Intelligence}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Endurance (Dwarf)'] = [];
nonweaponProficiencies['Endurance (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Fungi Recognition'] = [];
nonweaponProficiencies['Fungi Recognition'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +3,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Local Dwarf History'] = [];
nonweaponProficiencies['Local Dwarf History'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Navigation, Underground'] = [];
nonweaponProficiencies['Navigation, Underground'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Riding, Land-Based (Dwarf)'] = [];
nonweaponProficiencies['Riding, Land-Based (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Sign Language'] = [];
nonweaponProficiencies['Sign Language'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Signalling'] = [];
nonweaponProficiencies['Signalling'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Singing (Dwarf)'] = [];
nonweaponProficiencies['Singing (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Slow Respiration'] = [];
nonweaponProficiencies['Slow Respiration'].push({
    'slots': 1,
    'abilityScore': '@{NA}',
    'modifier': 'NA',
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Sound Analysis'] = [];
nonweaponProficiencies['Sound Analysis'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Survival, Underground'] = [];
nonweaponProficiencies['Survival, Underground'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Armorer (Dwarf)'] = [];
nonweaponProficiencies['Armorer (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Blacksmithing (Dwarf)'] = [];
nonweaponProficiencies['Blacksmithing (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': +1,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Bowyer/Fletcher (Dwarf)'] = [];
nonweaponProficiencies['Bowyer/Fletcher (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Brewing (Dwarf)'] = [];
nonweaponProficiencies['Brewing (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +1,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Engineering (Dwarf)'] = [];
nonweaponProficiencies['Engineering (Dwarf)'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Gem Cutting (Dwarf)'] = [];
nonweaponProficiencies['Gem Cutting (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Herbalism (Dwarf)'] = [];
nonweaponProficiencies['Herbalism (Dwarf)'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Locksmithing (Dwarf)'] = [];
nonweaponProficiencies['Locksmithing (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +1,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Mining (Dwarf)'] = [];
nonweaponProficiencies['Mining (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Pottery (Dwarf)'] = [];
nonweaponProficiencies['Pottery (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -3,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Seamstress/Tailor (Dwarf)'] = [];
nonweaponProficiencies['Seamstress/Tailor (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Smelting'] = [];
nonweaponProficiencies['Smelting'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Stonemasonry (Dwarf)'] = [];
nonweaponProficiencies['Stonemasonry (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': 0,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Weaponsmithing (Dwarf)'] = [];
nonweaponProficiencies['Weaponsmithing (Dwarf)'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Weaving (Dwarf)'] = [];
nonweaponProficiencies['Weaving (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Crafts',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Ancient History (Dwarf)'] = [];
nonweaponProficiencies['Ancient History (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Blind-fighting (Dwarf)'] = [];
nonweaponProficiencies['Blind-fighting (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{NA}',
    'modifier': 'NA',
    'classes': 'Warrior/Thief',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Disguise (Dwarf)'] = [];
nonweaponProficiencies['Disguise (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -2,
    'classes': 'Thief',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Forgery (Dwarf)'] = [];
nonweaponProficiencies['Forgery (Dwarf)'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Thief',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Hunting (Dwarf)'] = [];
nonweaponProficiencies['Hunting (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': '-2',
    'classes': 'Warrior',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Juggling (Dwarf)'] = [];
nonweaponProficiencies['Juggling (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': 'Thief',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Lip Reading (Dwarf)'] = [];
nonweaponProficiencies['Lip Reading (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Thief',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Musical Instrument (Dwarf)'] = [];
nonweaponProficiencies['Musical Instrument (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': 'Thief/Priest',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Pest Control'] = [];
nonweaponProficiencies['Pest Control'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Thief',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Survival (Hill, Mountain)'] = [];
nonweaponProficiencies['Survival (Hill, Mountain)'].push({
    'slots': 1,
    'abilityScore': '@{NA}',
    'modifier': 'NA',
    'classes': 'Warrior',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Boating (Dwarf)'] = [];
nonweaponProficiencies['Boating (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Special Background',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Boatwright'] = [];
nonweaponProficiencies['Boatwright'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Special Background',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Navigation (Dwarf)'] = [];
nonweaponProficiencies['Navigation (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -3,
    'classes': 'Special Background',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Swimming (Dwarf)'] = [];
nonweaponProficiencies['Swimming (Dwarf)'].push({
    'slots': 1,
    'abilityScore': '@{Strength}',
    'modifier': -1,
    'classes': 'Special Background',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Grade or Slope in Passage'] = [];
nonweaponProficiencies['Grade or Slope in Passage'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +4,
    'classes': '(Optional) Dwarven Detection',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['New Tunnel/Passage Construction'] = [];
nonweaponProficiencies['New Tunnel/Passage Construction'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +4,
    'classes': '(Optional) Dwarven Detection',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Sliding/Shifting Walls or Rooms'] = [];
nonweaponProficiencies['Sliding/Shifting Walls or Rooms'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': +2,
    'classes': '(Optional) Dwarven Detection',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Stonework Traps, Pits, and Deadfalls'] = [];
nonweaponProficiencies['Stonework Traps, Pits, and Deadfalls'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '(Optional) Dwarven Detection',
    'book': ['The Complete Book of Dwarves']
});
nonweaponProficiencies['Approximate Depth Underground'] = [];
nonweaponProficiencies['Approximate Depth Underground'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '(Optional) Dwarven Detection',
    'book': ['The Complete Book of Dwarves']
});
//#endregion

//#region The Complete Bard's Handbook
nonweaponProficiencies['Acting'] = [];
nonweaponProficiencies['Acting'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -1,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook','The Complete Book of Humanoids','The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Chanting'] = [];
nonweaponProficiencies['Chanting'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook','The Complete Book of Humanoids']
});
nonweaponProficiencies['Craft Instrument'] = [];
nonweaponProficiencies['Craft Instrument'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook','The Complete Book of Humanoids']
});
nonweaponProficiencies['Crowd Working'] = [];
nonweaponProficiencies['Crowd Working'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook']
});
nonweaponProficiencies['Poetry'] = [];
nonweaponProficiencies['Poetry'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook','The Complete Book of Humanoids','The Complete Paladin\'s Handbook']
});
nonweaponProficiencies['Whistling/Humming'] = [];
nonweaponProficiencies['Whistling/Humming'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +2,
    'classes': '',
    'book': ['The Complete Bard\'s Handbook','The Complete Book of Humanoids']
});
//#endregion

//#region The Complete Book of Humanoids
nonweaponProficiencies['Cheesemaking'] = [];
nonweaponProficiencies['Cheesemaking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Humanoids']
});
nonweaponProficiencies['Danger Sense'] = [];
nonweaponProficiencies['Danger Sense'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': +1,
    'classes': '',
    'book': ['The Complete Book of Humanoids','The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Drinking'] = [];
nonweaponProficiencies['Drinking'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Humanoids']
});
nonweaponProficiencies['Eating'] = [];
nonweaponProficiencies['Eating'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Humanoids']
});
nonweaponProficiencies['Hiding'] = [];
nonweaponProficiencies['Hiding'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': '',
    'book': ['The Complete Book of Humanoids','The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Winemaking'] = [];
nonweaponProficiencies['Winemaking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Humanoids']
});
nonweaponProficiencies['Close-quarter Fighting'] = [];
nonweaponProficiencies['Close-quarter Fighting'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Warrior/Rogue',
    'book': ['The Complete Book of Humanoids']
});
nonweaponProficiencies['Natural Fighting'] = [];
nonweaponProficiencies['Natural Fighting'].push({
    'slots': 2,
    'abilityScore': '@{Strength}',
    'modifier': +1,
    'classes': 'Warrior',
    'book': ['The Complete Book of Humanoids']
});
nonweaponProficiencies['Wild Fighting'] = [];
nonweaponProficiencies['Wild Fighting'].push({
    'slots': 2,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['The Complete Book of Humanoids','The Complete Barbarian\'s Handbook']
});
//#endregion

//#region The Complete Ranger's Handbook
nonweaponProficiencies['Cartography'] = [];
nonweaponProficiencies['Cartography'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook']
});
nonweaponProficiencies['Distance Sense'] = [];
nonweaponProficiencies['Distance Sense'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook']
});
nonweaponProficiencies['Falconry'] = [];
nonweaponProficiencies['Falconry'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook']
});
nonweaponProficiencies['Persuasion'] = [];
nonweaponProficiencies['Persuasion'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook']
});
nonweaponProficiencies['Riding, Sea-based'] = [];
nonweaponProficiencies['Riding, Sea-based'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook']
});
nonweaponProficiencies['Signaling'] = [];
nonweaponProficiencies['Signaling'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Ranger\'s Handbook','The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Camouflage'] = [];
nonweaponProficiencies['Camouflage'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Fighter/Rogue',
    'book': ['The Complete Ranger\'s Handbook']
});
nonweaponProficiencies['Foraging'] = [];
nonweaponProficiencies['Foraging'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Warrior/Rogue',
    'book': ['The Complete Ranger\'s Handbook','The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Spelunking'] = [];
nonweaponProficiencies['Spelunking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Warrior',
    'book': ['The Complete Ranger\'s Handbook']
});
nonweaponProficiencies['Trail Marking'] = [];
nonweaponProficiencies['Trail Marking'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['The Complete Ranger\'s Handbook']
});
nonweaponProficiencies['Trail Signs'] = [];
nonweaponProficiencies['Trail Signs'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Warrior/Rogue',
    'book': ['The Complete Ranger\'s Handbook']
});
nonweaponProficiencies['Veterinary Healing'] = [];
nonweaponProficiencies['Veterinary Healing'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -3,
    'classes': 'Priest',
    'book': ['The Complete Ranger\'s Handbook']
});
nonweaponProficiencies['Weaponsmithing, Crude'] = [];
nonweaponProficiencies['Weaponsmithing, Crude'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -3,
    'classes': 'Warrior',
    'book': ['The Complete Ranger\'s Handbook','The Complete Barbarian\'s Handbook']
});
//#endregion

//#region The Complete Paladin's Handbook
nonweaponProficiencies['Bureaucracy'] = [];
nonweaponProficiencies['Bureaucracy'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest/Rogue',
    'book': ['The Complete Paladin\'s Handbook','Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Diagnostics'] = [];
nonweaponProficiencies['Diagnostics'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': 'Priest',
    'book': ['The Complete Paladin\'s Handbook']
});
nonweaponProficiencies['Jousting'] = [];
nonweaponProficiencies['Jousting'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +2,
    'classes': 'Warrior',
    'book': ['The Complete Paladin\'s Handbook']
});
nonweaponProficiencies['Law'] = [];
nonweaponProficiencies['Law'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Warrior/Priest',
    'book': ['The Complete Paladin\'s Handbook']
});
nonweaponProficiencies['Oratory'] = [];
nonweaponProficiencies['Oratory'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Warrior/Priest',
    'book': ['The Complete Paladin\'s Handbook']
});
//#endregion

//#region The Complete Barbarian's Handbook
nonweaponProficiencies['Clothesmaking, Crude'] = [];
nonweaponProficiencies['Clothesmaking, Crude'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': '',
    'book': ['The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Animal Rending'] = [];
nonweaponProficiencies['Animal Rending'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +2,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Armorer, Crude'] = [];
nonweaponProficiencies['Armorer, Crude'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Bartering'] = [];
nonweaponProficiencies['Bartering'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Rogue',
    'book': ['The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Bowyer/Fletcher, Crude'] = [];
nonweaponProficiencies['Bowyer/Fletcher, Crude'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Horde Summoning'] = [];
nonweaponProficiencies['Horde Summoning'].push({
    'slots': 2,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Leadership'] = [];
nonweaponProficiencies['Leadership'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Light Sleeping'] = [];
nonweaponProficiencies['Light Sleeping'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Sign Language'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Set Snares'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Fighter',
    'book': ['The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Soothsaying'] = [];
nonweaponProficiencies['Soothsaying'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest',
    'book': ['The Complete Barbarian\'s Handbook']
});
nonweaponProficiencies['Weapon Improvisation'] = [];
nonweaponProficiencies['Weapon Improvisation'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['The Complete Barbarian\'s Handbook']
});
//#endregion

//#region The Complete Book of Necromancers
nonweaponProficiencies['Anatomy'] = [];
nonweaponProficiencies['Anatomy'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Necromancers']
});
nonweaponProficiencies['Necrology'] = [];
nonweaponProficiencies['Necrology'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Book of Necromancers']
});
nonweaponProficiencies['Netherworld Knowledge'] = [];
nonweaponProficiencies['Netherworld Knowledge'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -3,
    'classes': '',
    'book': ['The Complete Book of Necromancers']
});
nonweaponProficiencies['Spirit Lore'] = [];
nonweaponProficiencies['Spirit Lore'].push({
    'slots': 2,
    'abilityScore': '@{Charisma}',
    'modifier': -4,
    'classes': '',
    'book': ['The Complete Book of Necromancers']
});
nonweaponProficiencies['Venom Handling'] = [];
nonweaponProficiencies['Venom Handling'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': '',
    'book': ['The Complete Book of Necromancers']
});
//#endregion

//#region The Complete Ninja's Handbook
nonweaponProficiencies['City Familiarity'] = [];
nonweaponProficiencies['City Familiarity'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': '',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Style Analysis'] = [];
nonweaponProficiencies['Style Analysis'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Warrior',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Assimilation'] = [];
nonweaponProficiencies['Assimilation'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Detect Signing'] = [];
nonweaponProficiencies['Detect Signing'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +1,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Enamor'] = [];
nonweaponProficiencies['Enamor'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -2,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Escape'] = [];
nonweaponProficiencies['Escape'].push({
    'slots': 2,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Feign/Detect Sleep'] = [];
nonweaponProficiencies['Feign/Detect Sleep'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Giant Kite Flying'] = [];
nonweaponProficiencies['Giant Kite Flying'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -3,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Hold Breath'] = [];
nonweaponProficiencies['Hold Breath'].push({
    'slots': 1,
    'abilityScore': '@{Constitution}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Night Vision'] = [];
nonweaponProficiencies['Night Vision'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Toxicology'] = [];
nonweaponProficiencies['Toxicology'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Quick Study'] = [];
nonweaponProficiencies['Quick Study'].push({
    'slots': 2,
    'abilityScore': '',
    'modifier': -3,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Underclass'] = [];
nonweaponProficiencies['Underclass'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
nonweaponProficiencies['Water Walking'] = [];
nonweaponProficiencies['Water Walking'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Rogue',
    'book': ['The Complete Ninja\'s Handbook']
});
//#endregion

//#region Player's Option: Spells & Magic
nonweaponProficiencies['Alchemy'] = [];
nonweaponProficiencies['Alchemy'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -3,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Anatomy'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Arcanology'] = [];
nonweaponProficiencies['Arcanology'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -3,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Bookbinding'] = [];
nonweaponProficiencies['Bookbinding'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest/Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Concentration'] = [];
nonweaponProficiencies['Concentration'].push({
    'slots': 2,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Dowsing'] = [];
nonweaponProficiencies['Dowsing'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -3,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Glassblowing'] = [];
nonweaponProficiencies['Glassblowing'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': 0,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Hypnotism'] = [];
nonweaponProficiencies['Hypnotism'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -2,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Mental Resistance'] = [];
nonweaponProficiencies['Mental Resistance'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -1,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Omen Reading'] = [];
nonweaponProficiencies['Omen Reading'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': -2,
    'classes': 'Priest/Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Papermaking'] = [];
nonweaponProficiencies['Papermaking'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest/Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Prestidigitation'] = [];
nonweaponProficiencies['Prestidigitation'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': -1,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Research'] = [];
nonweaponProficiencies['Research'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Sage Knowledge'] = [];
nonweaponProficiencies['Sage Knowledge'].push({
    'slots': 2,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Priest/Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Scribe'] = [];
nonweaponProficiencies['Scribe'].push({
    'slots': 1,
    'abilityScore': '@{Dexterity}',
    'modifier': +1,
    'classes': 'Priest/Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Tactics of Magic'] = [];
nonweaponProficiencies['Tactics of Magic'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Thaumaturgy'] = [];
nonweaponProficiencies['Thaumaturgy'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Wizard',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Administration'] = [];
nonweaponProficiencies['Administration'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': +1,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Alms'] = [];
nonweaponProficiencies['Alms'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': 0,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Ceremony'] = [];
nonweaponProficiencies['Ceremony'].push({
    'slots': 1,
    'abilityScore': '@{Wisdom}',
    'modifier': 0,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Diplomacy'] = [];
nonweaponProficiencies['Diplomacy'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -1,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Investigation'] = [];
nonweaponProficiencies['Investigation'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -2,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Law'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': 0,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Oratory'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -1,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Persuasion'].push({
    'slots': 1,
    'abilityScore': '@{Charisma}',
    'modifier': -2,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
nonweaponProficiencies['Undead Lore'] = [];
nonweaponProficiencies['Undead Lore'].push({
    'slots': 1,
    'abilityScore': '@{Intelligence}',
    'modifier': -1,
    'classes': 'Priest',
    'book': ['Player\'s Option: Spells & Magic']
});
//#endregion
module.exports = nonweaponProficiencies;