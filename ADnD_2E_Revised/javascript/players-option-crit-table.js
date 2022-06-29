const LOCATION_TABLE = {};
LOCATION_TABLE['Humanoid'] = {};
LOCATION_TABLE['Humanoid'][1] = LOCATION_TABLE['Humanoid'][2] = {'general': 'Legs', 'specific': 'Right leg'};
LOCATION_TABLE['Humanoid'][3] = LOCATION_TABLE['Humanoid'][4] = {'general': 'Legs', 'specific': 'Left leg'};
LOCATION_TABLE['Humanoid'][5] = {'general': 'Abdomen', 'specific': 'Abdomen'};
LOCATION_TABLE['Humanoid'][6] = LOCATION_TABLE['Humanoid'][7] = {'general': 'Torso', 'specific': 'Torso'};
LOCATION_TABLE['Humanoid'][8] = {'general': 'Arms', 'specific': 'Right arm'};
LOCATION_TABLE['Humanoid'][9] = {'general': 'Arms', 'specific': 'Left arm'};
LOCATION_TABLE['Humanoid'][10] = {'general': 'Head', 'specific': 'Head'};

LOCATION_TABLE['Animal'] = {};
LOCATION_TABLE['Animal'][1] = {'general': 'Legs', 'specific': 'Right foreleg/wing'};
LOCATION_TABLE['Animal'][2] = {'general': 'Legs', 'specific': 'Left foreleg/wing'};
LOCATION_TABLE['Animal'][3] = {'general': 'Legs', 'specific': 'Right hind leg'};
LOCATION_TABLE['Animal'][4] = {'general': 'Legs', 'specific': 'Left hind leg'};
LOCATION_TABLE['Animal'][5] = {'general': 'Tail', 'specific': 'Tail', 'note': ' (for snakes or fish, 1-5 is tail hit)'};
LOCATION_TABLE['Animal'][6] = LOCATION_TABLE['Animal'][7] = {'general': 'Abdomen', 'specific': 'Abdomen'};
LOCATION_TABLE['Animal'][8] = LOCATION_TABLE['Animal'][9] = {'general': 'Torso', 'specific': 'Torso/chest'};
LOCATION_TABLE['Animal'][10] = {'general': 'Head', 'specific': 'Head'};

LOCATION_TABLE['Monster'] = {};
LOCATION_TABLE['Monster'][1] = {'general': 'Legs', 'specific': 'Right foreleg/claw/wing'};
LOCATION_TABLE['Monster'][2] = {'general': 'Legs', 'specific': 'Left foreleg/claw/wing'};
LOCATION_TABLE['Monster'][3] = {'general': 'Legs', 'specific': 'Right hind leg'};
LOCATION_TABLE['Monster'][4] = {'general': 'Legs', 'specific': 'Left hind leg'};
LOCATION_TABLE['Monster'][5] = {
    'general': 'Tail',
    'specific': 'Tail',
    'note': ' (for snake-like or fish-like monsters, 1-5 is tail hit)',
};
LOCATION_TABLE['Monster'][6] = LOCATION_TABLE['Monster'][7] = {'general': 'Abdomen', 'specific': 'Abdomen'};
LOCATION_TABLE['Monster'][8] = LOCATION_TABLE['Monster'][9] = {'general': 'Torso', 'specific': 'Torso/chest'};
LOCATION_TABLE['Monster'][10] = {'general': 'Head', 'specific': 'Head'};

const SPELL_CRIT_13_EFFECT_TABLE = {};
SPELL_CRIT_13_EFFECT_TABLE['Humanoid'] = {};
SPELL_CRIT_13_EFFECT_TABLE['Animal'] = {};
SPELL_CRIT_13_EFFECT_TABLE['Monster'] = {};

SPELL_CRIT_13_EFFECT_TABLE['Humanoid']['Legs'] =
    SPELL_CRIT_13_EFFECT_TABLE['Animal']['Legs'] =
        SPELL_CRIT_13_EFFECT_TABLE['Monster']['Legs'] = {
            'description': '.\nAnd additional abdomen hit',
            'locations': [
                {
                    'general': 'Abdomen',
                    'specific': 'Abdomen',
                    'chance': 100
                }
            ]
        };

SPELL_CRIT_13_EFFECT_TABLE['Humanoid']['Abdomen'] = {
    'description': '.\nAnd additional torso or leg hit (50% chance of either)',
    'locations': [
        {
            'general': 'Torso',
            'specific': 'Torso',
            'chance': 50
        },
        {
            'general': 'Legs',
            'specific': 'Left leg',
            'chance': 75
        },
        {
            'general': 'Legs',
            'specific': 'Right leg',
            'chance': 100
        },
    ]
};

SPELL_CRIT_13_EFFECT_TABLE['Animal']['Abdomen'] =
    SPELL_CRIT_13_EFFECT_TABLE['Monster']['Abdomen'] = {
        'description': '.\nAnd additional torso/chest or hind leg hit (50% chance of either)',
        'locations': [
            {
                'general': 'Torso',
                'specific': 'Torso/chest',
                'chance': 50
            },
            {
                'general': 'Legs',
                'specific': 'Left hind leg',
                'chance': 75
            },
            {
                'general': 'Legs',
                'specific': 'Right hind leg',
                'chance': 100
            }
        ]
    };

SPELL_CRIT_13_EFFECT_TABLE['Humanoid']['Torso'] = {
    'description': '.\nAnd additional abdomen, arm or head hit (40% abdomen, 20% left arm, 20% right arm, 20% head)',
    'locations': [
        {
            'general': 'Abdomen',
            'specific': 'Abdomen',
            'chance': 40
        },
        {
            'general': 'Arms',
            'specific': 'Left arm',
            'chance': 60
        },
        {
            'general': 'Arms',
            'specific': 'Right arm',
            'chance': 80
        },
        {
            'general': 'Head',
            'specific': 'Head',
            'chance': 100
        }
    ]
};

SPELL_CRIT_13_EFFECT_TABLE['Animal']['Torso'] = {
    'description': '.\nAnd additional abdomen, foreleg/wing or head hit (40% abdomen, 20% left foreleg/wing, 20% right foreleg/wing, 20% head)',
    'locations': [
        {
            'general': 'Abdomen',
            'specific': 'Abdomen',
            'chance': 40
        },
        {
            'general': 'Legs',
            'specific': 'Left foreleg/wing',
            'chance': 60
        },
        {
            'general': 'Legs',
            'specific': 'Right foreleg/wing',
            'chance': 80
        },
        {
            'general': 'Head',
            'specific': 'Head',
            'chance': 100
        }
    ]
};


SPELL_CRIT_13_EFFECT_TABLE['Monster']['Torso'] = {
    'description': '.\nAnd additional abdomen, foreleg/claw/wing or head hit (40% abdomen, 20% left foreleg/claw/wing, 20% right foreleg/claw/wing, 20% head)',
    'locations': [
        {
            'general': 'Abdomen',
            'specific': 'Abdomen',
            'chance': 40
        },
        {
            'general': 'Legs',
            'specific': 'Left foreleg/claw/wing',
            'chance': 60
        },
        {
            'general': 'Legs',
            'specific': 'Right foreleg/claw/wing',
            'chance': 80
        },
        {
            'general': 'Head',
            'specific': 'Head',
            'chance': 100
        }
    ]
};

SPELL_CRIT_13_EFFECT_TABLE['Humanoid']['Arms'] = SPELL_CRIT_13_EFFECT_TABLE['Humanoid']['Head'] = {
    'description': '.\nAnd additional torso hit',
    'locations': [
        {
            'general': 'Torso',
            'specific': 'Torso',
            'chance': 100
        },
    ]
};

SPELL_CRIT_13_EFFECT_TABLE['Animal']['Head'] = SPELL_CRIT_13_EFFECT_TABLE['Monster']['Head'] = {
    'description': '.\nAnd additional torso/chest hit',
    'locations': [
        {
            'general': 'Torso',
            'specific': 'Torso/chest',
            'chance': 100
        },
    ]
};

SPELL_CRIT_13_EFFECT_TABLE['Animal']['Tail'] = SPELL_CRIT_13_EFFECT_TABLE['Monster']['Tail'] = {
    'description': '.\nAnd additional abdomen or torso/chest hit (50% chance of either)',
    'locations': [
        {
            'general': 'Abdomen',
            'specific': 'Abdomen',
            'chance': 50
        },
        {
            'general': 'Torso',
            'specific': 'Torso/chest',
            'chance': 100
        },
    ],
    'note': ' (for snake or fish, Leg hit is tail hit)'
};

SPELL_CRIT_13_EFFECT_TABLE['Monster']['Tail'] = {
    'description': '.\nAnd additional abdomen or torso/chest hit (50% chance of either)',
    'locations': [
        {
            'general': 'Abdomen',
            'specific': 'Abdomen',
            'chance': 50
        },
        {
            'general': 'Torso',
            'specific': 'Torso/chest',
            'chance': 100
        },
    ],
    'note': ' (for snake-like or fish-like monsters, Leg hit is tail hit)'
};

const SPELL_SIZE_MAP = {
    2: 'Medium (1 hit)',
    3: 'Large (1d3 hits)',
    4: 'Huge (1d4 hits)',
    5: 'Gargantuan (1d6+1 hits)'
};

//#region Weapon Crits
const WEAPON_CRIT_EFFECT_TABLE = {};
WEAPON_CRIT_EFFECT_TABLE['Bludgeoning'] = {};
WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid'] = {};
WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Animal'] = {};
WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Monster'] = {};

WEAPON_CRIT_EFFECT_TABLE['Piercing'] = {};
WEAPON_CRIT_EFFECT_TABLE['Piercing']['Humanoid'] = {};
WEAPON_CRIT_EFFECT_TABLE['Piercing']['Animal'] = {};
WEAPON_CRIT_EFFECT_TABLE['Piercing']['Monster'] = {};

WEAPON_CRIT_EFFECT_TABLE['Slashing'] = {};
WEAPON_CRIT_EFFECT_TABLE['Slashing']['Humanoid'] = {};
WEAPON_CRIT_EFFECT_TABLE['Slashing']['Animal'] = {};
WEAPON_CRIT_EFFECT_TABLE['Slashing']['Monster'] = {};

//#region Bludgeoning
WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid']['Legs'] = {
    4: 'Victim knocked down',
    5: 'Knee struck, knockdown, 1/2 move',
    6: 'Foot broken, 1/2 move',
    7: 'Armor damaged, leg injured if target has no armor to cover legs, 1/4 move',
    8: 'Hip broken, minor bleeding, no move',
    9: 'Armor damaged, leg broken if target has no armor to cover legs, no move',
    10: 'Knee shattered, no move, -2 penalty to attacks',
    11: 'Hip shattered, minor bleeding, no move or attack',
    12: 'Leg shattered, no move or attack, major bleeding from compound fractures',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid']['Abdomen'] = {
    4: 'Victim stunned [[1d6]] rounds',
    5: 'Abdomen struck, victim stunned 1 round and reduced to 1/2 move',
    6: 'Armor damaged, victim stunned [[1d6]] rounds, triple damage if no armor',
    7: 'Abdomen injured, 1/2 move, -2 penalty to attacks',
    8: 'Abdomen injured, minor internal bleeding, 1/2 move and -2 penalty to attacks',
    9: 'Armor damage, abdomen injured, minor bleeding, 1/2 move and -2 penalty to attacks',
    10: 'Abdomen injured, no move or attack, minor internal bleeding',
    11: 'Abdomen crushed, no move or attack, major internal bleeding',
    12: 'Abdomen crushed, victim reduced to 0 hit points with severe internal bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid']['Torso'] = {
    4: 'Knockdown, stunned [[1d4]] rounds',
    5: 'Torso struck, victim stunned 1 round and reduced to 1/2 move',
    6: 'Shield damage, torso struck, 1/2 move',
    7: 'Armor damage, torso struck, 1/2 move, -2 penalty to attacks',
    8: 'Torso injured, minor internal bleeding, no move or attack',
    9: 'Ribs broken, minor internal bleeding, 1/2 move, -2 penalty to attacks',
    10: 'Ribs broken, major internal bleeding, no move or attack',
    11: 'Torso crushed, victim reduced to 0 hit points with severe internal bleeding',
    12: 'Torso crushed, victim killed',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid']['Arms'] = {
    4: 'Hand struck, weapon/shield dropped',
    5: 'Arm struck, shield damage/weapon dropped',
    6: 'Hand broken, -2 penalty to attacks/shield dropped',
    7: 'Armor damage, arm broken if victim has no armor to cover limb',
    8: 'Shield damage, arm broken, stunned 1 round',
    9: 'Weapon dropped, arm broken, stunned [[1d4]] rounds',
    10: 'Shoulder injured, no attacks, minor bleeding',
    11: 'Arm shattered, 1/2 move, no attacks, minor bleeding',
    12: 'Shoulder shattered, no move or attacks, major bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid']['Head'] = {
    4: 'Victim stunned [[1d6]] rounds',
    5: 'Head struck, helm removed, victim stunned 1 round; -2 penalty to attack rolls if victim had no helm',
    6: 'Head struck, -2 penalty to attacks',
    7: 'Helm damaged, face injured, stunned [[1d6]] rounds, 1/2 move, -4 penalty to attacks',
    8: 'Skull broken, helm damaged, victim reduced to 0 hit points and unconscious [[1d4]] hours',
    9: 'Face crushed, minor bleeding, no move or attack, Charisma drops by 2 points permanently',
    10: 'Head injured, unconscious [[1d6]] days, lose 1 point each of Intelligence/Wisdom/Charisma permanently',
    11: 'Skull crushed, reduced to 0 hit points, major bleeding, Intelligence, Wisdom, Charisma all drop by 1/2 permanently',
    12: 'Skull crushed, immediate death',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Animal']['Legs'] = {
    4: 'Victim knocked down',
    5: 'Knee struck, victim reduced to 2/3 move',
    6: 'Foot/wrist broken, 2/3 move',
    7: 'Leg injured, 2/3 move, -2 penalty to attacks',
    8: 'Hip broken, minor bleeding, no movement, -2 penalty to attacks; wing hit forces crash landing',
    9: 'Leg broken, 2/3 move, minor bleeding; wing hit forces immediate landing',
    10: 'Knee shattered, 1/3 move, -2 penalty to attacks',
    11: 'Hip/shoulder shattered, minor bleeding, no move or attack; wing hit forces crash landing',
    12: 'Leg/wing shattered, no move or attack, major bleeding from compound fractures',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Animal']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail struck; if prehensile, any items carried are dropped, -2 penalty to tail attacks due to pain',
    7: 'Tail injured, normal animals must save vs. death or retreat in pain; lose any tail attacks',
    8: 'Tail injured, normal animals must save vs. death or retreat in pain; lose any tail attacks',
    9: 'Tail broken, lose any tail attacks, 1/2 move if animal uses tail for movement',
    10: 'Tail broken, lose any tail attacks, 1/2 move if animal uses tail for movement',
    11: 'Tail crushed, victim stunned [[1d3]] rounds, lose any tail attacks, no movement or attacks if animal uses tail for movement',
    12: 'Tail crushed, pain reduces creature to 1/2 move and -2 penalty on any attack, minor bleeding; no move or attack if animal uses tail for movement',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Animal']['Abdomen'] = {
    4: 'Victim stunned [[1d6]] rounds',
    5: 'Abdomen struck, victim stunned 1 round and reduced to 1/2 move',
    6: 'Abdomen struck, victim stunned [[1d6]] rounds, reduced to 1/2 move',
    7: 'Abdomen injured, 1/2 move, -2 penalty to attacks',
    8: 'Spine broken, no move, -4 penalty to attacks',
    9: 'Abdomen injured, minor bleeding, 1/2 move and -2 penalty to attacks',
    10: 'Abdomen injured, no move or attack, minor internal bleeding',
    11: 'Spine crushed, no move or attack, major internal bleeding',
    12: 'Abdomen crushed, victim reduced to 0 hit points with severe internal bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Animal']['Torso'] = {
    4: 'Knockdown, stunned [[1d4]] rounds',
    5: 'Torso struck, victim stunned 1 round and reduced to 1/2 move',
    6: 'Torso struck, stunned [[1d6]] rounds, 1/2 move',
    7: 'Spine struck, 1/2 move, -2 penalty to attacks',
    8: 'Torso injured, minor internal bleeding, no move or attack',
    9: 'Ribs broken, minor internal bleeding, 1/2 move, -2 penalty to attacks',
    10: 'Ribs broken, major internal bleeding, no move or attack',
    11: 'Spine crushed, victim reduced to 0 hit points with severe internal bleeding',
    12: 'Torso crushed, victim killed',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Animal']['Head'] = {
    4: 'Victim stunned [[1d6]] rounds',
    5: 'Snout struck, animal must save vs. death or retreat in pain for [[1d10]] rounds',
    6: 'Head struck, –2 penalty to attacks',
    7: 'Jaw injured, stunned [[1d6]] rounds, 2/3 move, –4 penalty to all attacks',
    8: 'Skull broken, animal reduced to 0 hit points and unconscious [[1d4]] hours',
    9: 'Snout/face crushed, minor bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks',
    10: 'Head injured, unconscious [[2d4]] hours, reduced to 1/2 move and –4 penalty to all attacks for [[1d3]] months',
    11: 'Skull crushed, reduced to 0 hit points, major bleeding, Intelligence, Wisdom, Charisma all drop by 1/2 permanently',
    12: 'Skull crushed, immediate death',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Monster']['Legs'] = {
    4: 'Victim knocked down',
    5: 'Knee struck, victim reduced to 2/3 move, –2 penalty to attacks with tha appendage',
    6: 'Foot/wrist broken, 2/3 move, –4 penalty to attacks with that appendage',
    7: 'Limb injured, 2/3 move, –2 penalty to all attacks',
    8: 'Hip broken, minor bleeding, 1/3 move, no attacks with limb; wing hit forces crash landing',
    9: 'Limb broken, 2/3 move, minor bleeding; wing hit forces immediate landing',
    10: 'Knee shattered, 1/3 move, –2 penalty to all attacks',
    11: 'Hip/shoulder shattered, minor bleeding, 1/3 move, –4 penalty to all attacks; wing hit forces crash',
    12: 'Leg/wing shattered, no move, –4 penalty to all attacks, major bleeding from compound fractures',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Monster']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail struck; if prehensile, any items carried are dropped, –2 penalty to tail attacks due to pain',
    7: 'Tail injured, lose any tail attacks',
    8: 'Tail injured, lose any tail attacks',
    9: 'Tail broken, lose any tail attacks, if creature uses tail for movement reduced to 1/2 move',
    10: 'Tail broken, lose any tail attacks, if creature uses tail for movement reduced to 1/2 move',
    11: 'Tail crushed, victim stunned [[1d3]] rounds, lose any tail attacks, no movement if monster uses tail for movement and –4 penalty to all attacks',
    12: 'Tail crushed, pain reduces creature to 1/2 move and –2 penalty on any attack, minor bleeding; if animal uses tail for movement, no move or attack',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Monster']['Abdomen'] = {
    4: 'Victim stunned [[1d4]] rounds',
    5: 'Abdomen struck, victim stunned 1 round and reduced to 2/3 move',
    6: 'Abdomen struck, victim stunned [[1d6]] rounds, reduced to 2/3 move',
    7: 'Abdomen injured, 1/2 move, –2 penalty to attacks',
    8: 'Spine injured, 1/3 move, –4 penalty to attacks',
    9: 'Abdomen injured, victim stunned [[1d3]] rounds, minor bleeding, 1/3 move and –2 penalty to attacks',
    10: 'Abdomen injured, no move or attack, minor internal bleeding',
    11: 'Spine crushed, no move or attack, major internal bleeding',
    12: 'Abdomen crushed, victim reduced to 0 hit points with severe internal bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Monster']['Torso'] = {
    4: 'Knockdown, stunned [[1d4]] rounds',
    5: 'Torso struck, victim stunned 1 round and reduced to 2/3 move',
    6: 'Torso struck, stunned [[1d6]] rounds, 2/3 move',
    7: 'Spine struck, 1/2 move, –2 penalty to attacks',
    8: 'Torso injured, minor internal bleeding, 1/3 move, –4 penalty to all attacks',
    9: 'Ribs broken, minor internal bleeding, 1/2 move, –2 penalty to attacks',
    10: 'Ribs broken, major internal bleeding, no move or attack',
    11: 'Spine crushed, victim reduced to 0 hit points with severe internal bleeding',
    12: 'Torso crushed, victim killed',
};

WEAPON_CRIT_EFFECT_TABLE['Bludgeoning']['Monster']['Head'] = {
    4: 'Victim stunned [[1d4]] rounds',
    5: 'Jaw struck, –2 penalty to any bite attacks',
    6: 'Head struck, stunned 1 round, –2 penalty to attacks',
    7: 'Jaw injured, stunned [[1d4]] rounds, 2/3 move, no bite attacks',
    8: 'Skull broken, monster reduced to 1/4 normal hit points and unconscious [[2d10]] turns',
    9: 'Snout/face crushed, minor bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks',
    10: 'Head injured, unconscious [[1d10]] turns, reduced to 1/2 move and –4 penalty to all attacks for [[3d6]] days',
    11: 'Skull crushed, reduced to 0 hit points, major bleeding, Int, Wis, Cha all drop by 1/2 permanently',
    12: 'Skull crushed, immediate death',
};
//#endregion

//#region Piercing
WEAPON_CRIT_EFFECT_TABLE['Piercing']['Humanoid']['Legs'] = {
    4: 'Leg grazed, victim knocked down',
    5: 'Leg struck, minor bleeding',
    6: 'Leg injured, minor bleeding, 2/3 move',
    7: 'Armor damaged; leg injured if target has no leg armor, 1/2 move, major bleeding',
    8: 'Knee broken, minor bleeding, 1/3 move, –4 penalty to any attacks',
    9: 'Armor damaged, leg struck, minor bleeding, 2/3 move; if target has no leg armor, leg broken, major bleeding, 1/3 move, –4 penalty to attacks',
    10: 'Hip broken, no move or attack, major bleeding',
    11: 'Leg broken, severe bleeding, no move or attack',
    12: 'Leg destroyed, no move or attack, severe bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Humanoid']['Abdomen'] = {
    4: 'Abdomen grazed, minor bleeding',
    5: 'Abdomen struck, victim stunned 1 round and reduced to 2/3 move with minor bleeding',
    6: 'Armor damaged; victim stunned [[1d4]] rounds, minor bleeding, 2/3 move if no armor',
    7: 'Abdomen injured, major bleeding, 1/2 move, –2 penalty to attacks',
    8: 'Abdomen injured, severe bleeding, 1/2 move, –4 penalty to attacks',
    9: 'Armor damage, abdomen injured, minor bleeding, 1/2 move and –2 penalty to attacks; if no armor, victim at 0 hit points, major bleeding',
    10: 'Abdomen injured, 1/3 move, no attack, severe bleeding',
    11: 'Abdomen injured, victim at 0 hp, severe bleeding',
    12: 'Abdomen destroyed, victim killed',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Humanoid']['Torso'] = {
    4: 'Torso grazed, minor bleeding',
    5: 'Torso struck, 2/3 move with minor bleeding',
    6: 'Shield damage, torso struck, 2/3 move & minor bleeding',
    7: 'Armor damage, torso struck, 2/3 move, –2 penalty to attacks; if no armor, torso injured, no move or attack, severe bleeding',
    8: 'Torso injured, major bleeding, 1/2 move, –4 penalty to attacks',
    9: 'Shield damage; torso struck, –2 penalty to attacks; if no shield, ribs broken, severe bleeding, no move or attack',
    10: 'Ribs broken, severe bleeding, no move or attack',
    11: 'Torso destroyed, victim reduced to 0 hit points with severe bleeding',
    12: 'Torso destroyed, victim killed',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Humanoid']['Arms'] = {
    4: 'Hand struck, weapon dropped, minor bleeding; no effect on shield arm',
    5: 'Arm struck, shield damage/weapon dropped, minor bleeding',
    6: 'Hand injured, –2 penalty to attacks/shield dropped',
    7: 'Armor damage, arm struck, minor bleeding; if no armor, arm injured, minor bleeding',
    8: 'Arm broken, victim stunned 1 round, minor bleeding, shield or weapon dropped',
    9: 'Armor damage, arm injured, –2 penalty to attacks or shield dropped; if no armor, arm broken, stunned [[1d6]] rounds, major bleeding',
    10: 'Shoulder injured, no attacks, major bleeding',
    11: 'Arm destroyed, major bleeding, 2/3 move',
    12: 'Arm destroyed, no move/attack, major bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Humanoid']['Head'] = {
    4: 'Head grazed, stunned [[1d3]] rounds, minor bleeding',
    5: 'Head struck, helm removed, victim stunned 1 round; –2 penalty to attack rolls, minor bleeding if victim had no helm',
    6: 'Eye injured, –4 penalty to all attacks; if helmed, victim is only stunned 1 round instead',
    7: 'Helm damaged, face injured, stunned [[1d6]] rounds, minor bleeding, 2/3 move, –4 penalty to attacks',
    8: 'Skull broken, helm damaged, victim reduced to 0 hit points, major bleeding',
    9: 'Throat injured, severe bleeding',
    10: 'Skull broken, victim reduced to 0 hp, major bleeding, Int, Wis, Cha all drop by 1/2 permanently',
    11: 'Throat destroyed, victim killed',
    12: 'Head destroyed, immediate death',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Animal']['Legs'] = {
    4: 'Leg struck, minor bleeding',
    5: 'Knee struck, 2/3 move, minor bleeding',
    6: 'Leg injured, minor bleeding, 2/3 move',
    7: 'Foot/claw injured, minor bleeding, –2 penalty to attacks with that limb',
    8: 'Hip injured, minor bleeding, 2/3 movement, –2 penalty to all attacks; wing hit forces crash landing',
    9: 'Leg/wing broken, 1/3 move, minor bleeding; wing hit forces crash landing',
    10: 'Knee broken, minor bleeding, 1/3 move, –2 penalty to all attacks',
    11: 'Hip/shoulder destroyed, major bleeding, no move or attack; wing hit forces crash landing',
    12: 'Leg/wing destroyed, no move or attack, major bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Animal']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks',
    7: 'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks',
    8: 'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks',
    9: 'Tail injured, minor bleeding, lose tail attacks; if creature uses tail for movement, 1/3 move',
    10: 'Tail injured, minor bleeding, lose tail attacks; if creature uses tail for movement, 1/3 move',
    11: 'Tail destroyed, victim stunned [[1d3]] rounds, lose tail attacks, major bleeding, no movement or attacks if animal uses tail for movement',
    12: 'Tail destroyed, stunned [[1d2]] rounds, major bleeding, 1/2 move and –2 penalty on attacks; if animal uses tail for movement, no move or attack',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Animal']['Abdomen'] = {
    4: 'Abdomen grazed, minor bleeding',
    5: 'Abdomen struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding',
    6: 'Abdomen struck, victim stunned [[1d4]] rounds, reduced to 2/3 move, minor bleeding',
    7: 'Abdomen injured, 2/3 move, major bleeding, –2 penalty to all attacks',
    8: 'Spine injured, 1/3 move, minor bleeding, –4 penalty to all attacks',
    9: 'Abdomen injured, major bleeding, 1/3 move and –2 penalty to all attacks',
    10: 'Abdomen injured, no move or attack, major bleeding',
    11: 'Spine broken, no move or attack, major bleeding, victim paralyzed',
    12: 'Abdomen destroyed, victim reduced to 0 hit points with severe bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Animal']['Torso'] = {
    4: 'Torso grazed, minor bleeding',
    5: 'Torso struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding',
    6: 'Torso struck, stunned [[1d4]] rounds, minor bleeding',
    7: 'Spine struck, minor bleeding, 2/3 move, –2 penalty to attacks',
    8: 'Torso injured, stunned 1 round, major bleeding',
    9: 'Ribs broken, minor bleeding, 1/3 move, –4 penalty to attacks',
    10: 'Ribs broken, major bleeding, no move or attack',
    11: 'Spine destroyed, victim reduced to 0 hit points with major bleeding',
    12: 'Torso destroyed, victim killed',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Animal']['Head'] = {
    4: 'Head grazed, stunned 1 round, minor bleeding',
    5: 'Snout struck, minor bleeding, animal must save vs. death or retreat for [[1d10]] rounds',
    6: 'Eye injured, stunned [[1d3]] rounds, –2 penalty to attacks',
    7: 'Throat injured, major bleeding, 2/3 move, –4 penalty to all attacks',
    8: 'Skull broken, animal reduced to 0 hit points, major bleeding',
    9: 'Snout/face destroyed, minor bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks',
    10: 'Head injured, reduced to 0 hp, major bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] months',
    11: 'Throat destroyed, severe bleeding',
    12: 'Head severed, immediate death',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Monster']['Legs'] = {
    4: 'Leg grazed, minor bleeding',
    5: 'Knee struck, 2/3 move',
    6: 'Leg struck, minor bleeding, 2/3 move',
    7: 'Foot/claw injured, minor bleeding, –2 penalty to attacks with that limb',
    8: 'Hip injured, minor bleeding, 1/3 movement; wing hit forces crash landing',
    9: 'Leg/wing broken, 1/3 move, minor bleeding; wing hit forces crash landing',
    10: 'Knee destroyed, major bleeding, 1/3 move, –2 penalty to attacks with affected limb',
    11: 'Hip/shoulder destroyed, major bleeding, no move, –4 penalty to attacks; wing hit forces crash landing',
    12: 'Leg/wing destroyed, no move or attack, major bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Monster']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks',
    7: 'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks',
    8: 'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks',
    9: 'Tail broken, minor bleeding, no tail attacks; if creature uses tail for movement, 1/3 move',
    10: 'Tail broken, minor bleeding, no tail attacks; if creature uses tail for movement, 1/3 move',
    11: 'Tail destroyed, victim stunned 1 round, lose tail attacks, major bleeding; 1/3 movement, –4 penalty to attacks if monster uses tail for movement',
    12: 'Tail destroyed, stunned [[1d3]] rounds, major bleeding, 1/2 move and –2 penalty on any attack; if monster uses tail for movement, no move/attack',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Monster']['Abdomen'] = {
    4: 'Abdomen grazed, minor bleeding',
    5: 'Abdomen struck, victim stunned 1 round, minor bleeding',
    6: 'Abdomen struck, victim stunned [[1d3]] rounds, minor bleeding',
    7: 'Abdomen injured, 2/3 move, minor bleeding, –2 penalty to all attacks',
    8: 'Spine injured, 1/2 move, minor bleeding, –4 penalty to all attacks',
    9: 'Abdomen injured, major bleeding, 1/3 move and –2 penalty to attacks',
    10: 'Abdomen injured, 1/3 move, –4 penalty to attacks, major bleeding',
    11: 'Spine injured, no move or attack, major bleeding, victim stunned [[1d6]] rounds',
    12: 'Abdomen destroyed, victim reduced to 0 hit points with major bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Monster']['Torso'] = {
    4: 'Torso grazed, minor bleeding',
    5: 'Torso struck, victim stunned 1 round, minor bleeding',
    6: 'Torso struck, stunned [[1d3]] rounds, minor bleeding',
    7: 'Spine struck, minor bleeding, 2/3 move, –2 penalty to attacks',
    8: 'Torso injured, minor bleeding, 1/3 move, –4 penalty to attacks',
    9: 'Ribs injured, major bleeding, 1/3 move, –4 penalty to attacks',
    10: 'Ribs broken, major bleeding, 1/3 move, no attack',
    11: 'Spine broken, major bleeding, no move or attack',
    12: 'Torso destroyed, victim killed',
};

WEAPON_CRIT_EFFECT_TABLE['Piercing']['Monster']['Head'] = {
    4: 'Head grazed, minor bleeding',
    5: 'Snout struck, minor bleeding, monster must save vs. death or retreat for 1 round',
    6: 'Eye injured, stunned 1 round, –2 penalty to attacks',
    7: 'Throat injured, major bleeding, 2/3 move, –2 penalty to all attacks',
    8: 'Skull injured, monster reduced to 2/3 move, major bleeding, –2 penalty to all attacks',
    9: 'Snout/face injured, major bleeding, 1/3 move, no bite attacks, –2 penalty to all other attacks',
    10: 'Head injured, reduced to 0 hp, major bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] weeks',
    11: 'Throat destroyed, severe bleeding',
    12: 'Head destroyed, immediate death',
};
//#endregion

//#region Slashing
WEAPON_CRIT_EFFECT_TABLE['Slashing']['Humanoid']['Legs'] = {
    4: 'Leg struck, minor bleeding',
    5: 'Leg struck, minor bleeding; 1/2 move',
    6: 'Leg injured, major bleeding, 1/2 move',
    7: 'Armor damaged; leg injured if target has no leg armor, 1/2 move, major bleeding',
    8: 'Knee shattered, major bleeding, no move, –4 penalty to any attacks',
    9: 'Armor damaged, leg struck, minor bleeding, 1/2 move; if target has no leg armor, leg severed at knee, severe bleeding, no move or attack',
    10: 'Hip shattered, no move or attack, severe bleeding',
    11: 'Leg severed, severe bleeding, no move or attack',
    12: 'Leg severed at thigh, no move or attack, victim reduced to 0 hit points with severe bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Humanoid']['Abdomen'] = {
    4: 'Abdomen grazed, minor bleeding',
    5: 'Abdomen struck, victim stunned 1 round and reduced to 1/2 move with minor bleeding',
    6: 'Armor damaged; victim stunned [[1d6]] rounds, major bleeding, 1/2 move if no armor',
    7: 'Abdomen injured, major bleeding, 1/2 move, –2 penalty to attacks',
    8: 'Abdomen injured, severe bleeding, 1/2 move, –4 penalty to attacks',
    9: 'Armor damage, abdomen injured, minor bleeding, 1/2 move and –2 penalty to attacks; if no armor, victim at 0 hit points, major bleeding',
    10: 'Abdomen injured, no move or attack, severe bleeding',
    11: 'Abdomen injured, victim at 0 hp, severe bleeding',
    12: 'Abdomen destroyed, victim killed',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Humanoid']['Torso'] = {
    4: 'Torso grazed, minor bleeding',
    5: 'Torso struck, victim stunned 1 round, reduced to 1/2 move with minor bleeding',
    6: 'Shield damage, torso struck, 1/2 move & minor bleeding',
    7: 'Armor damage, torso struck, 1/2 move, –2 penalty to attacks; if no armor, torso injured, no move or attack, severe bleeding',
    8: 'Torso injured, major bleeding, 1/2 move, –4 penalty to attacks',
    9: 'Shield damage; torso struck, –2 penalty to attacks; if no shield, torso injured, severe bleeding, no move or attack',
    10: 'Torso injured, severe bleeding, no move or attack',
    11: 'Torso destroyed, victim reduced to 0 hit points with severe bleeding',
    12: 'Torso destroyed, victim killed',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Humanoid']['Arms'] = {
    4: 'Hand struck, weapon dropped, minor bleeding; no effect on shield arm',
    5: 'Arm struck, shield damage/weapon dropped, minor bleeding',
    6: 'Hand injured, –2 penalty to attacks/shield dropped',
    7: 'Armor damage, arm struck, minor bleeding; if no armor, arm injured, major bleeding',
    8: 'Hand severed, stunned 1 round, major bleeding, shield or weapon dropped',
    9: 'Armor damage, arm broken; if no armor, arm severed, stunned [[1d6]] rounds, major bleeding',
    10: 'Shoulder injured, no attacks, major bleeding',
    11: 'Arm severed, severe bleeding, 1/2 move',
    12: 'Arm severed, no move or attacks, severe bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Humanoid']['Head'] = {
    4: 'Head grazed, stunned [[1d3]] rounds, minor bleeding',
    5: 'Head struck, helm removed, victim stunned 1 round; –2 penalty to attack rolls, minor bleeding if victim had no helm',
    6: 'Head struck, minor bleeding, victim blinded for [[2d4]] rounds by blood in eyes',
    7: 'Helm damaged, face injured, stunned [[1d6]] rounds, minor bleeding, 1/2 move, –4 penalty to attacks',
    8: 'Skull broken, helm damaged, victim reduced to 0 hit points, major bleeding',
    9: 'Throat injured, severe bleeding',
    10: 'Skull destroyed, victim reduced to 0 hp, severe bleeding, Int, Wis, Cha all drop by 1/2 permanently',
    11: 'Throat destroyed, victim killed',
    12: 'Head severed, immediate death',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Animal']['Legs'] = {
    4: 'Leg struck, minor bleeding',
    5: 'Knee struck, 2/3 move, minor bleeding',
    6: 'Leg injured, major bleeding, 2/3 move',
    7: 'Foot/claw injured, 2/3 move, minor bleeding, –2 penalty to attacks with that limb',
    8: 'Hip injured, major bleeding, 1/3 movement, –2 penalty to attacks; wing hit forces crash landing',
    9: 'Leg/wing severed at midpoint, 1/3 move, major bleeding; wing hit forces uncontrolled fall',
    10: 'Knee destroyed, major bleeding, 1/3 move, –2 penalty to all attacks',
    11: 'Hip/shoulder destroyed, severe bleeding, no move or attack; wing hit forces crash landing',
    12: 'Leg/wing severed at mid-thigh, no move or attack, severe bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Animal']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks',
    7: 'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks',
    8: 'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks',
    9: 'Tail severed near end, major bleeding, lose tail attacks, move reduced by 1/3 if creature uses tail for movement',
    10: 'Tail severed near end, major bleeding, lose tail attacks, move reduced by 1/3 if creature uses tail for movement',
    11: 'Tail severed, victim stunned 1–3 rounds, lose tail attacks, major bleeding, no movement or attacks if animal uses tail for movement',
    12: 'Tail severed, stunned 1–3 rounds, major bleeding, 1/2 move and –2 penalty on any attack; if animal uses tail for movement, no move or attack',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Animal']['Abdomen'] = {
    4: 'Abdomen grazed, minor bleeding',
    5: 'Abdomen struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding',
    6: 'Abdomen struck, victim stunned [[1d6]] rounds, reduced to 2/3 move, minor bleeding',
    7: 'Abdomen injured, 1/3 move, minor bleeding, –2 penalty to all attacks',
    8: 'Spine injured, no move, minor bleeding, –4 penalty to attacks',
    9: 'Abdomen injured, major bleeding, 1/3 move and –2 penalty to attacks',
    10: 'Abdomen injured, no move or attack, major bleeding',
    11: 'Spine destroyed, no move or attack, major bleeding, victim paralyzed',
    12: 'Abdomen destroyed, victim reduced to 0 hit points with severe bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Animal']['Torso'] = {
    4: 'Torso grazed, minor bleeding',
    5: 'Torso struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding',
    6: 'Torso struck, stunned [[1d6]] rounds, minor bleeding',
    7: 'Spine struck, major bleeding, 2/3 move, –2 penalty to attacks',
    8: 'Torso injured, severe bleeding, no move or attack',
    9: 'Ribs broken, major bleeding, 1/3 move, –4 penalty to attacks',
    10: 'Ribs broken, severe bleeding, no move or attack',
    11: 'Spine destroyed, victim reduced to 0 hit points with severe bleeding',
    12: 'Torso destroyed, victim killed',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Animal']['Head'] = {
    4: 'Head grazed, stunned 1 round, minor bleeding',
    5: 'Snout struck, minor bleeding, animal must save vs. death or retreat for [[1d10]] rounds',
    6: 'Head struck, minor bleeding, –2 penalty to attacks',
    7: 'Throat injured, major bleeding, 2/3 move, –4 penalty to all attacks',
    8: 'Skull broken, animal reduced to 0 hit points, major bleeding',
    9: 'Snout/face destroyed, major bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks',
    10: 'Head injured, reduced to 0 hp, severe bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] months',
    11: 'Throat destroyed, severe bleeding',
    12: 'Head severed, immediate death',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Monster']['Legs'] = {
    4: 'Leg grazed, minor bleeding',
    5: 'Knee struck, 2/3 move, minor bleeding',
    6: 'Leg struck, minor bleeding, 2/3 move',
    7: 'Foot/claw injured, 2/3 move, minor bleeding, –2 penalty to attacks with that limb',
    8: 'Hip injured, major bleeding, 1/3 movement; wing hit forces crash landing',
    9: 'Leg/wing severed at midpoint, 1/3 move, major bleeding; wing hit forces uncontrolled fall',
    10: 'Knee destroyed, major bleeding, 1/3 move, –2 penalty to attacks with affected limb',
    11: 'Hip/shoulder destroyed, major bleeding, no move, –4 penalty to attacks; wing hit forces crash landing',
    12: 'Leg/wing severed at mid-thigh, no move or attack, severe bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Monster']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks',
    7: 'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks',
    8: 'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks',
    9: 'Tail severed, major bleeding, no tail attacks; if creature uses tail for movement, 1/3 move',
    10: 'Tail severed, major bleeding, no tail attacks; if creature uses tail for movement, 1/3 move',
    11: 'Tail severed, victim stunned 1 round, lose tail attacks, major bleeding; 1/3 movement, –4 penalty to attacks if monster uses tail for movement',
    12: 'Tail severed, stunned 1 round, major bleeding, 1/2 move and –2 penalty on any attack; if animal uses tail for movement, no move or attack',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Monster']['Abdomen'] = {
    4: 'Abdomen grazed, minor bleeding',
    5: 'Abdomen struck, victim stunned 1 round, minor bleeding',
    6: 'Abdomen struck, victim stunned [[1d3]] rounds, reduced to 2/3 move, minor bleeding',
    7: 'Abdomen injured, 1/2 move, minor bleeding, –2 penalty to all attacks',
    8: 'Spine injured, 1/3 move, minor bleeding, –4 penalty to all attacks',
    9: 'Abdomen injured, major bleeding, 1/3 move and –2 penalty to attacks',
    10: 'Abdomen injured, 1/3 move, –4 penalty to attacks, major bleeding',
    11: 'Spine injured, no move or attack, major bleeding, victim stunned [[1d6]] rounds',
    12: 'Abdomen destroyed, victim reduced to 0 hit points with severe bleeding',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Monster']['Torso'] = {
    4: 'Torso grazed, minor bleeding',
    5: 'Torso struck, victim stunned 1 round, minor bleeding',
    6: 'Torso struck, stunned [[1d3]] rounds, minor bleeding',
    7: 'Spine struck, minor bleeding, 2/3 move, –2 penalty to attacks',
    8: 'Torso injured, major bleeding, 1/3 move, –4 penalty to attacks',
    9: 'Ribs injured, major bleeding, 1/3 move, –4 penalty to attacks',
    10: 'Ribs broken, severe bleeding, 1/3 move, no attack',
    11: 'Spine broken, major bleeding, no move or attack',
    12: 'Torso destroyed, victim killed',
};

WEAPON_CRIT_EFFECT_TABLE['Slashing']['Monster']['Head'] = {
    4: 'Head grazed, minor bleeding',
    5: 'Snout struck, minor bleeding, monster must save vs. death or retreat for 1 round',
    6: 'Head struck, minor bleeding, –2 penalty to attacks',
    7: 'Throat injured, major bleeding, 2/3 move, –2 penalty to all attacks',
    8: 'Skull injured, monster reduced to 2/3 move, major bleeding, –2 penalty to all attacks',
    9: 'Snout/face injured, major bleeding, 1/3 move, no bite attacks, –2 penalty to all other attacks',
    10: 'Head injured, reduced to 0 hp, major bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] weeks',
    11: 'Throat destroyed, severe bleeding',
    12: 'Head severed, immediate death',
};
//#endregion
//#endregion

//#region Spell Crits
SPELL_CRIT_EFFECT_TABLE = {};
SPELL_CRIT_EFFECT_TABLE['Acid'] = {};
SPELL_CRIT_EFFECT_TABLE['Cold'] = {};
SPELL_CRIT_EFFECT_TABLE['Constriction'] = {};
SPELL_CRIT_EFFECT_TABLE['Crushing'] = {};
SPELL_CRIT_EFFECT_TABLE['Electricity'] = {};
SPELL_CRIT_EFFECT_TABLE['Fire'] = {};
SPELL_CRIT_EFFECT_TABLE['Impact'] = {};
SPELL_CRIT_EFFECT_TABLE['Slashing'] = {};
SPELL_CRIT_EFFECT_TABLE['Vibration'] = {};
SPELL_CRIT_EFFECT_TABLE['Wounding'] = {};

//#region Acid
SPELL_CRIT_EFFECT_TABLE['Acid']['Legs'] = {
    4: 'Acid splash grazes victim; pain distracts character for [[1d4]] rounds causing a -2 penalty to attack rolls',
    5: 'Leg struck, 1/2 move; pain distracts character for [[1d6]] rounds causing a -2 penalty to attack rolls and causes knockdown',
    6: 'Foot burned, 1/2 move, pain distracts character for [[1d6]] rounds',
    7: 'Armor destroyed, acid splash grazes victim; pain distracts character for [[1d4]] rounds causing a -2 penalty to attack rolls; if target has no leg armor, leg burned, 1/4 move, victim knocked down and stunned [[1d6]] rounds',
    8: 'Hip/thigh burned, minor bleeding, stunned [[1d6]] rounds, 1/4 move',
    9: 'Armor destroyed, leg struck, 1/2 move; pain distracts character for [[1d6]] rounds causing a -2 penalty to attack rolls and causes knockdown; if target has no leg armor, acid burns to bone causing major bleeding, no move or attack',
    10: 'Foot dissolved; minor bleeding, victim stunned [[1d6]] rounds, then no movement and –2 penalty to attacks',
    11: 'Leg dissolved at knee, major bleeding, no move or attack',
    12: 'Leg dissolved at hip, no move or attack, major bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Acid']['Abdomen'] = {
    4: 'Acid splash grazes victim, –2 to attack rolls for [[1d6]] rounds',
    5: 'Abdomen struck, –2 to attack rolls, victim reduced to 1/2 move',
    6: 'Armor destroyed, acid splash grazes victim, –2 to attack rolls for [[1d6]] rounds; if target has no armor, abdomen burned, 1/2 move, minor bleeding, –2 to attack rolls',
    7: 'Abdomen burned, minor bleeding, 1/2 move, –2 to attack rolls, victim stunned [[1d6]] rounds by pain',
    8: 'Abdomen burned, minor bleeding, 1/4 move, –4 to attack rolls',
    9: 'Armor damage, abdomen struck, minor bleeding, 1/2 move and –2 to attacks; if no armor, victim stunned [[1d6]] rounds, 1/4 move, –4 to attack rolls, major bleeding',
    10: 'Abdomen burned, no move or attack, major bleeding',
    11: 'Abdominal wall dissolved, no move or attack, severe bleeding',
    12: 'Abdomen dissolved, victim reduced to 0 hp, severe bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Acid']['Torso'] = {
    4: 'Acid splash grazes victim, –2 to attack rolls for [[1d6]] rounds',
    5: 'Torso struck; 1/2 move, –2 to attack rolls, victim stunned 1 round',
    6: 'Shield destroyed, acid splash grazes victim, –2 to attack rolls for [[1d6]] rounds; if target has no armor, torso burned, 1/2 move, minor bleeding, –2 to attack rolls',
    7: 'Armor destroyed, torso struck, 1/2 move, –2 to attacks; if target has no armor, torso burned, victim stunned [[1d6]] rounds, 1/2 move, –2 to attacks',
    8: 'Torso burned, minor bleeding, 1/4 move, –4 to attack rolls',
    9: 'Torso burned, minor bleeding, no move or attack',
    10: 'Torso burned deeply, major bleeding, no move or attack',
    11: 'Torso partially dissolved, victim reduced to 0 hit points with severe bleeding',
    12: 'Torso dissolved, victim killed instantly',
};

SPELL_CRIT_EFFECT_TABLE['Acid']['Arms'] = {
    4: 'Hand grazed by acid splash, weapon or shield dropped',
    5: 'Arm struck, victim distracted by pain (–2 penalty to attack rolls) for [[1d4]] rounds, shield or weapon damaged by acid',
    6: 'Hand burned, –2 to attacks with that hand (or no shield use if shield arm is burned), victim stunned [[1d3]] rounds by pain',
    7: 'Armor destroyed, arm grazed by acid splash, weapon or shield dropped; if victim has no armor, arm burned by acid, –2 penalty to all attacks, victim stunned [[1d4]] rounds by the pain',
    8: 'Arm burned, victim stunned [[1d4]] rounds, –4 to attacks with affected arm and –2 to all other attacks',
    9: 'Deep acid burn renders arm useless, victim stunned [[1d6]] rounds',
    10: 'Hand dissolved, stunned [[1d6]] rounds, –2 to all attacks, minor bleeding',
    11: 'Arm dissolved at elbow, stunned [[1d6]] rounds, no attack, major bleeding',
    12: 'Arm dissolved at shoulder, stunned [[1d6]] rounds, 1/2 move, no attacks, major bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Acid']['Head'] = {
    4: 'Acid splash distracts victim for [[2d4]] rounds, –2 penalty to all attacks',
    5: 'Head struck, helm damaged, victim stunned [[1d3]] rounds; –2 to all attack rolls if victim had no helm',
    6: 'Head struck, –2 to attacks, stunned [[1d4]] rounds by pain',
    7: 'Helm destroyed, face burned, stunned [[1d6]] rounds, –2 to attacks; if victim wears no helm, –4 to all attacks and 1/2 move',
    8: 'Face burned, victim blinded, stunned [[2d8]] rounds, Charisma reduced by [[2d6]] points, minor bleeding',
    9: 'Scalp and one ear dissolved, victim stunned [[2d8]] rounds, major bleeding, 1/2 move and no attacks, Charisma reduced by [[2d4]] points',
    10: 'Face dissolved, victim blinded, no move or attack, major bleeding, Charisma/Appearance reduced to 3',
    11: 'Throat dissolved, no move or attack, severe bleeding; if bleeding doesn’t kill the victim, he asphyxiates in [[1d4+1]] rounds',
    12: 'Skull dissolved, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Acid']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail burned; if prehensile, any items carried are dropped, –2 penalty to all tail attacks due to pain',
    7: 'Tail burned, lose any tail attacks; normal animals must roll saving throw vs. death magic or retreat in pain',
    8: 'Tail burned, lose any tail attacks; normal animals must roll saving throw vs. death magic or retreat in pain',
    9: 'Tail burned, lose any tail attacks, 1/2 move if animal uses tail for movement',
    10: 'Tail burned, lose any tail attacks, 1/2 move if animal uses tail for movement',
    11: 'Tail dissolved at mid-length, victim stunned [[1d3]] rounds, major bleeding, lose any tail attacks, no movement or attacks if creature uses tail for movement',
    12: 'Tail dissolved, victim stunned [[1d6]] rounds, pain reduces creature to 1/2 move and –2 penalty on any attack rolls, major bleeding; no move or attack and severe bleeding if creature uses tail for movement',
};
//#endregion

//#region Cold
SPELL_CRIT_EFFECT_TABLE['Cold']['Legs'] = {
    4: 'Victim chilled; 1/2 move and –2 penalty to attacks for [[1d6]] hours',
    5: 'Leg struck, 1/2 move; victim knocked down and chilled, –2 penalty to attacks for [[1d6]] hours',
    6: 'Foot frostbitten, 1/2 move',
    7: 'Armor shattered, victim chilled, 1/2 move and –2 penalty to attacks for [[1d6]] hours; if target has no leg armor, leg frostbitten, 1/4 move, victim knocked down',
    8: 'Hip/thigh frostbitten, stunned [[1d3]] rounds, 1/4 move',
    9: 'Armor shattered, leg struck, 1/2 move; victim knocked down and chilled, –2 penalty to attacks for [[1d6]] hours; if target has no leg armor, bone broken by cold, no move, –2 to attack rolls',
    10: 'Foot frozen; victim knocked down, 1/4 movement, –2 penalty to attacks',
    11: 'Leg frozen from knee down, no move, –4 penalty to attacks',
    12: 'Leg frozen at hip, no movement or attacks possible',
};

SPELL_CRIT_EFFECT_TABLE['Cold']['Abdomen'] = {
    4: 'Victim chilled, –2 to attack rolls for [[1d6]] hours',
    5: 'Abdomen struck, victim reduced to 1/2 move, chilled [[1d6]] hours',
    6: 'Armor shattered, victim chilled, –2 to attack rolls for [[1d6]] hours; if target has no armor, abdomen frostbitten, 1/4 move, –2 to attack rolls',
    7: 'Abdomen frostbitten, 1/4 move, –2 to attack rolls; victim *slowed* for [[2d6]] rounds due to intense cold',
    8: 'Abdomen frostbitten, 1/4 move, –4 to attack rolls; victim *slowed* for [[1d6]] hours by intense cold',
    9: 'Armor shattered, abdomen struck, 1/4 move and –2 to attacks; if no armor, victim *slowed* [[1d6]] hours, 1/4 move, –4 to attack rolls',
    10: 'Abdomen partially frozen, no move or attack; victim succumbs in [[1d4]] days without magical healing',
    11: 'Abdomen frozen, no move or attack, victim reduced to 0 hp; victim succumbs in [[1d6]] hours without magical healing',
    12: 'Abdomen frozen, victim reduced to 0 hp and succumbs in [[1d6]] rounds without magical healing',
};

SPELL_CRIT_EFFECT_TABLE['Cold']['Torso'] = {
    4: 'Victim chilled, –2 to attack rolls for [[1d6]] rounds',
    5: 'Torso struck; 1/2 move, –2 to attack rolls, victim chilled [[1d6]] hours',
    6: 'Shield shattered, victim chilled, –2 to attack rolls for [[1d6]] rounds; if target has no shield, torso frostbitten, *slowed* [[1d6]] rounds, 1/4 move, –2 to attack rolls',
    7: 'Armor, torso frostbitten, victim *slowed* [[1d6]] hours, 1/4 move, –2 attacks',
    8: 'Torso frostbitten, 1/4 move, –4 to attack rolls, victim *slowed* [[1d6]] hours by intense cold',
    9: 'Torso frostbitten, no movement or attacks possible',
    10: 'Torso partially frozen, no move or attack, victim perishes in [[1d4]] hours without magical help',
    11: 'Torso frozen, victim reduced to 0 hp, dies in [[1d6]] rounds',
    12: 'Torso frozen, victim dies immediately',
};

SPELL_CRIT_EFFECT_TABLE['Cold']['Arms'] = {
    4: 'Hand chilled, weapon or shield dropped',
    5: 'Arm struck, shield or weapon dropped, –2 penalty to attacks with that hand until victim recovers',
    6: 'Hand frostbitten, –4 to attacks with that hand (or no shield use if shield arm is struck)',
    7: 'Armor shattered, arm chilled, weapon or shield dropped; if victim has no armor, arm frostbitten, –2 penalty to all attacks, victim *slowed* [[1d4]] rounds',
    8: 'Arm frostbitten, victim *slowed* [[1d4]] rounds, –4 to attacks with affected arm and –2 to all other attacks',
    9: 'Deep frostbite renders arm useless, victim *slowed* [[1d6]] hours',
    10: 'Hand frozen and useless, stunned [[1d6]] rounds, –2 to all attacks',
    11: 'Arm frozen from elbow down and useless, stunned [[1d6]] rounds, –4 to all attacks, *slowed* [[1d6]] hours',
    12: 'Arm frozen from shoulder down, stunned [[1d6]] rounds, 1/4 move, no attacks, *slowed* [[1d6]] hours',
};

SPELL_CRIT_EFFECT_TABLE['Cold']['Head'] = {
    4: 'Frost disorients victim for [[2d4]] rounds, –2 penalty to all attacks',
    5: 'Head struck, helm damaged, victim *slowed* [[1d6]] rounds; –2 to all attack rolls if victim had no helm',
    6: 'Head struck, –2 to attacks, *slowed* [[1d6]] hours',
    7: 'Helm shattered, face frostbitten, *slowed* [[1d6]] hours, –2 to attacks; if victim wears no helm, –4 to all attacks and 1/4 move',
    8: 'Face frostbitten, victim blinded [[1d6]] hours and *slowed* [[1d6]] hours',
    9: 'Scalp and side of head frozen, victim *slowed* [[1d6]] hours, 1/4 move and no attacks',
    10: 'Face frozen, victim blinded, no move or attack',
    11: 'Throat/nose frozen, no move or attack, asphyxiation in [[1d4+1]] rounds',
    12: 'Skull frozen through, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Cold']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail frostbitten; if prehensile, any items carried are dropped, –2 penalty to all tail attacks',
    7: 'Tail frostbitten, lose any tail attacks; victim chilled [[1d6]] hours, suffers a –2 penalty to attacks while chilled',
    8: 'Tail frostbitten, lose any tail attacks; victim chilled [[1d6]] hours, suffers a –2 penalty to attacks while chilled',
    9: 'Tail badly frostbitten, lose any tail attacks, 1/4 move if animal uses tail for movement',
    10: 'Tail badly frostbitten, lose any tail attacks, 1/4 move if animal uses tail for movement',
    11: 'Tail frozen at mid-length, victim stunned [[1d6]] rounds, lose any tail attacks, no movement or attacks if creature uses tail for movement',
    12: 'Tail frozen, victim stunned [[1d6]] rounds, pain reduces creature to 1/4 move and –2 penalty on any attack rolls; no move or attack if creature uses tail for movement',
};
//#endregion

//#region Constriction
SPELL_CRIT_EFFECT_TABLE['Constriction']['Legs'] = {
    4: 'Victim knocked down',
    5: 'Knee twisted (struck), knockdown, 1/2 move',
    6: 'Foot dislocated (broken), knockdown, 1/2 move',
    7: 'Armor damaged, leg twisted, 1/2 move; leg injured if target has no plate armor to cover legs, 1/4 move',
    8: 'Knee dislocated (broken), no move, –2 to all attacks',
    9: 'Armor damaged, leg injured, 1/2 move, –2 to all attacks; leg broken if target has no plate armor to cover legs, no move, –4 to attacks',
    10: 'Knee crushed, no move, –4 to attacks, minor bleeding',
    11: 'Hip broken and dislocated, minor bleeding, no move or attack',
    12: 'Leg crushed, no move or attack, major bleeding from compound fractures',
};

SPELL_CRIT_EFFECT_TABLE['Constriction']['Abdomen'] = {
    4: 'Victim stunned [[1d4]] rounds',
    5: 'Abdomen struck, victim stunned 1 round and reduced to 1/2 move',
    6: 'Armor damaged, victim stunned [[1d6]] rounds; if victim has no plate armor, abdomen injured, stunned [[1d6]] rounds, 1/2 move, –2 penalty to all attacks',
    7: 'Abdomen injured, 1/2 move, –2 to all attacks',
    8: 'Abdomen injured, minor internal bleeding, 1/2 move and –2 to attacks',
    9: 'Armor damaged, abdomen injured, minor bleeding, 1/2 move and –2 to attacks; if victim does not have plate armor, 1/4 move, –4 to attacks',
    10: 'Abdomen injured, no move or attack, minor internal bleeding',
    11: 'Abdomen crushed, no move or attack, major internal bleeding',
    12: 'Abdomen crushed, victim reduced to 0 hit points with severe internal bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Constriction']['Torso'] = {
    4: 'Knockdown, stunned [[1d4]] rounds',
    5: 'Torso struck, victim stunned 1 round and reduced to 1/2 move',
    6: 'Shield damaged, torso struck, 1/2 move',
    7: 'Armor damaged, torso struck, 1/2 move, –2 to attacks; if no plate armor, torso injured, 1/4 move, –4 penalty to all attacks',
    8: 'Torso injured, minor internal bleeding, 1/4 move, –4 to attacks',
    9: 'Ribs broken, minor internal bleeding, 1/2 move, –2 to attacks',
    10: 'Ribs broken, major internal bleeding, no move or attack',
    11: 'Torso crushed, victim reduced to 0 hit points with severe internal bleeding',
    12: 'Torso crushed, victim killed',
};

SPELL_CRIT_EFFECT_TABLE['Constriction']['Arms'] = {
    4: 'Hand twisted, weapon/shield dropped',
    5: 'Arm twisted, weapon/shield dropped, –2 to attacks',
    6: 'Hand broken, –2 to attacks/shield dropped',
    7: 'Armor damaged, arm injured, –2 to attacks with that arm; arm broken if victim has no plate armor, arm useless',
    8: 'Shield damaged, arm broken and useless, stunned 1 round',
    9: 'Arm broken and useless, stunned [[1d4]] rounds',
    10: 'Shoulder dislocated (broken), no attacks, minor bleeding',
    11: 'Arm crushed, 1/2 move, no attacks, minor bleeding',
    12: 'Shoulder crushed, no move or attacks, major bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Constriction']['Head'] = {
    4: 'Victim stunned [[1d6]] rounds',
    5: 'Head twisted (struck), helm removed, victim stunned 1 round; –2 to attack rolls due to pinched nerves in neck',
    6: 'Head struck, 1/2 move, –2 to attacks',
    7: 'Helm damaged, face injured, stunned [[1d6]] rounds, 1/2 move, –4 to attacks',
    8: 'Skull broken, helm damaged, victim reduced to 0 hit points and conscious [[1d4]] hours; if victim has no helmet, unconscious for [[4d6]] days, lose [[1d3]] points of Intelligence permanently',
    9: 'Jaw dislocated (broken), minor bleeding, no move or attack',
    10: 'Neck broken, reduced to 0 hp, unconscious [[1d6]] days; victim must roll saving throw vs. death magic or suffer 50–100% paralysis (1d6+4) x 10%. Paralysis caused by this injury can only be cured by *heal*, *regenerate*, or healing magic of similar power',
    11: 'Throat crushed, reduced to 0 hit points, major bleeding',
    12: 'Skull crushed, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Constriction']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail struck; if prehensile, any items carried are dropped, –2 penalty to all tail attacks due to pain',
    7: 'Tail injured, lose any tail attacks; normal animals must roll saving throw vs. death magic or retreat in pain',
    8: 'Tail injured, lose any tail attacks; normal animals must roll saving throw vs. death magic or retreat in pain',
    9: 'Tail broken, lose any tail attacks, 1/2 move if animal uses tail for movement',
    10: 'Tail broken, lose any tail attacks, 1/2 move if animal uses tail for movement',
    11: 'Tail crushed, victim stunned [[1d3]] rounds, lose any tail attacks, no movement or attacks if creature uses tail for movement',
    12: 'Tail crushed, pain reduces creature to 1/2 move and –2 penalty on any attack rolls, minor bleeding; no move or attack if creature uses tail for movement',
};
//#endregion

//#region Crushing
SPELL_CRIT_EFFECT_TABLE['Crushing']['Legs'] = {
    4: 'Victim knocked down',
    5: 'Leg struck, knockdown, 1/2 move',
    6: 'Foot broken, 1/2 move',
    7: 'Armor damaged, leg struck, 1/2 move; if target has no armor to cover legs, leg injured, 1/4 move, –2 to all attacks',
    8: 'Hip broken, minor bleeding, no move, –2 to all attacks',
    9: 'Armor destroyed, leg injured, 1/2 move; leg broken if target has no armor to cover legs, no move, –4 to attacks',
    10: 'Knee crushed, no move, –4 to attacks, minor bleeding',
    11: 'Hip shattered, minor bleeding, no move or attack',
    12: 'Leg crushed, no move or attack, major bleeding from compound fractures',
};

SPELL_CRIT_EFFECT_TABLE['Crushing']['Abdomen'] = {
    4: 'Victim stunned [[1d6]] rounds',
    5: 'Abdomen struck, victim stunned 1 round and reduced to 1/2 move',
    6: 'Armor damaged, victim stunned [[1d6]] rounds; if target has no armor, abdomen injured, stunned [[1d6]] rounds, 1/2 move, –2 penalty to attacks',
    7: 'Abdomen injured, stunned [[2d6]] rounds, 1/2 move, –2 to hit',
    8: 'Abdomen injured, minor internal bleeding, 1/4 move and –4 to attacks',
    9: 'Armor damaged, abdomen injured, minor bleeding, 1/2 move and –2 to attacks; if victim has no armor, stunned [[2d6]] rounds, major internal bleeding, 1/4 move, –4 to attacks',
    10: 'Abdomen partially crushed, 1/4 move, –4 to attacks, major internal bleeding, stunned [[2d6]] rounds',
    11: 'Abdomen crushed, no move or attack, major internal bleeding',
    12: 'Abdomen crushed, victim reduced to 0 hit points with severe internal bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Crushing']['Torso'] = {
    4: 'Knockdown, stunned [[1d4]] rounds',
    5: 'Torso struck, victim stunned 1 round and reduced to 1/2 move',
    6: 'Shield destroyed, torso struck, 1/4 move, stunned [[1d6]] rounds',
    7: 'Armor destroyed, torso injured, stunned [[1d6]] rounds, 1/4 move, –2 to attacks',
    8: 'Ribs broken, stunned [[1d6]] rounds, 1/4 move, –4 to all attacks',
    9: 'Ribs broken, stunned [[2d6]] rounds, minor bleeding, 1/4 move, –4 to attacks',
    10: 'Ribs crushed, major internal bleeding, no move or attack',
    11: 'Torso crushed, victim reduced to 0 hit points with severe internal bleeding',
    12: 'Torso crushed, victim killed',
};

SPELL_CRIT_EFFECT_TABLE['Crushing']['Arms'] = {
    4: 'Hand struck, weapon/shield dropped',
    5: 'Arm struck, –2 to attacks with that arm',
    6: 'Hand broken, –2 to all attacks, weapon or shield dropped',
    7: 'Armor destroyed, arm injured, –2 to attacks with that arm; if victim has no armor, arm broken, stunned 1 round',
    8: 'Shield destroyed, arm broken, stunned [[1d3]] rounds',
    9: 'Hand crushed, stunned [[1d4]] rounds, minor bleeding',
    10: 'Shoulder dislocated (broken), no attacks, minor bleeding',
    11: 'Arm crushed to elbow, 1/4 move, no attacks, major bleeding',
    12: 'Arm crushed to shoulder, no move or attacks, major bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Crushing']['Head'] = {
    4: 'Victim stunned [[1d6]] rounds',
    5: 'Head struck, helm removed, victim stunned [[1d6]] rounds; head injured, –2 to attack rolls if victim had no helm',
    6: 'Head injured, stunned [[2d6]] rounds, 1/4 move, –2 to all attacks',
    7: 'Helm destroyed, face injured, stunned [[2d6]] rounds, 1/4 move, –4 to all attacks; victim must roll saving throw vs. death magic or be blinded as well',
    8: 'Skull broken, helm destroyed, victim reduced to 0 hit points and unconscious [[2d6]] hours',
    9: 'Face crushed, minor bleeding, no move or attack, –2 Charisma permanently',
    10: 'Skull broken, unconscious [[1d6]] days, –2 to all attacks, lose 1 point each of Intelligence/Wisdom/Charisma permanently',
    11: 'Skull crushed, reduced to 0 hit points, major bleeding; victim loses [[1d6]] points of Intelligence, Wisdom, and Charisma (a *heal* or *regenerate* spell can restore lost ability points)',
    12: 'Skull crushed, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Crushing']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail struck; if prehensile, any items carried are dropped, –2 penalty to all tail attacks due to pain',
    7: 'Tail injured, lose any tail attacks; normal animals must roll saving throw vs. Death magic or retreat in pain',
    8: 'Tail injured, lose any tail attacks; normal animals must roll saving throw vs. Death magic or retreat in pain',
    9: 'Tail broken, lose any tail attacks, 1/4 move if animal uses tail for movement',
    10: 'Tail broken, lose any tail attacks, 1/4 move if animal uses tail for movement',
    11: 'Tail crushed, victim stunned [[1d6]] rounds, lose any tail attacks, no movement or attacks if creature uses tail for movement',
    12: 'Tail crushed, pain reduces creature to 1/4 move and –2 penalty on any attack rolls, minor bleeding; no move or attack and major bleeding if creature uses tail for movement',
};
//#endregion

//#region Electricity
SPELL_CRIT_EFFECT_TABLE['Electricity']['Legs'] = {
    4: 'Victim shocked and knocked down; spasms distract character for [[1d4]] rounds causing a –2 penalty to attack rolls',
    5: 'Leg struck, 1/2 move; victim knocked down and shocked for [[1d6]] rounds',
    6: 'Foot burned, 1/2 move, victim knocked down, spasms last [[1d6]] rounds',
    7: 'Armor destroyed, leg burned, 1/2 move, victim knocked down and stunned [[1d6]] rounds',
    8: 'Hip/thigh burned, knocked down, stunned [[1d6]] rounds, 1/4 move',
    9: 'Armor destroyed, leg broken, stunned [[1d6]] rounds, 1/4 move and –4 penalty to all attacks',
    10: 'Foot incinerated; minor bleeding, victim stunned [[1d6]] rounds, then no movement and –4 penalty to all attacks',
    11: 'Leg incinerated at knee, major bleeding, no move or attack',
    12: 'Leg incinerated at hip, no move or attack, major bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Electricity']['Abdomen'] = {
    4: 'Victim shocked and knocked down, –2 to attack rolls for [[1d6]] rounds',
    5: 'Abdomen struck, –2 to attack rolls, 1/2 move, victim knocked down',
    6: 'Armor destroyed, abdomen burned, 1/2 move, –2 to attack rolls, victim stunned [[1d6]] rounds',
    7: 'Abdomen burned, 1/2 move, –2 to attack rolls, victim stunned [[2d8]] rounds',
    8: 'Abdomen burned, 1/4 move, –4 to attack rolls, stunned [[2d8]] rounds',
    9: 'Armor destroyed, abdomen burned, victim stunned [[2d8]] rounds, 1/4 move, –4 to attack rolls',
    10: 'Severe internal burns, no move or attack',
    11: 'Abdomen partially incinerated, no move or attack, death follows in [[1d4]] hours if victim is not treated with a *cure critical wounds* or more powerful healing magic',
    12: 'Abdomen incinerated, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Electricity']['Torso'] = {
    4: 'Victim shocked and knocked down, –2 to attack rolls for [[1d6]] rounds',
    5: 'Torso struck; 1/2 move, –2 to attack rolls, victim knocked down',
    6: 'Shield destroyed, torso burned, victim knocked down, 1/2 move, –2 to attack rolls',
    7: 'Armor destroyed, torso burned, victim stunned [[1d6]] rounds, 1/2 move, –2 to attacks',
    8: 'Torso burned, victim stunned [[2d8]] rounds, 1/4 move, –4 to attack rolls',
    9: 'Torso burned, no move or attack',
    10: 'Torso burned deeply, no move or attack, possible stopped heart; roll a saving throw vs. death magic or die in [[1d3]] rounds',
    11: 'Torso partially incinerated, victim reduced to 0 hit points and dies in [[1d3]] magic',
    12: 'Torso incinerated, victim killed instantly',
};

SPELL_CRIT_EFFECT_TABLE['Electricity']['Arms'] = {
    4: 'Hand shocked, weapon or shield dropped',
    5: 'Arm struck, victim knocked down, –2 to attacks for [[1d6]] rounds due to muscle spasms',
    6: 'Hand burned, –2 to attacks with that hand (or no shield use if shield arm is burned)',
    7: 'Armor destroyed, arm burned, –2 penalty to all attacks, victim stunned [[1d6]] rounds',
    8: 'Arm burned, victim stunned [[2d8]] rounds, –4 to attacks with affected arm and –2 to all other attacks, current crosses body and may stop heart; roll saving throw vs. death magic or die in [[1d3]] rounds',
    9: 'Arm broken and useless, victim stunned [[2d8]] rounds',
    10: 'Hand incinerated, stunned [[1d6]] rounds, –2 to all attacks',
    11: 'Arm incinerated at elbow, stunned [[1d6]] rounds, no attacks',
    12: 'Arm incinerated at shoulder, stunned [[2d8]] rounds, 1/2 move, no attacks',
};

SPELL_CRIT_EFFECT_TABLE['Electricity']['Head'] = {
    4: 'Victim shocked, knocked down, –2 penalty to attacks for [[1d6]] rounds',
    5: 'Head struck, helm destroyed, victim stunned [[1d6]] rounds, –2 to all attack rolls',
    6: 'Head struck, –2 to attacks, stunned [[2d8]] rounds, victim deafened',
    7: 'Helm destroyed, face burned, stunned [[2d8]] rounds, –4 to all attacks and 1/2 move',
    8: 'Face burned, victim blinded, stunned [[2d8]] rounds',
    9: 'Scalp burned, victim stunned [[2d8]] rounds, 1/2 move and –4 penalty to attacks; roll saving throw vs. death magic or heart stops, killing character in [[1d3]] rounds',
    10: 'Face burned, victim blinded, no move or attack, unconscious [[4d6]] days',
    11: 'Head burned, victim blinded, deafened, and paralyzed, and remains so until he receives a *regenerate* spell or similar healing magic',
    12: 'Skull incinerated, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Electricity']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail shocked; if prehensile, any items carried are dropped, –2 penalty to all tail attacks',
    7: 'Tail burned, lose any tail attacks; normal animals must roll saving throw vs. Death magic or retreat',
    8: 'Tail burned, lose any tail attacks; normal animals must roll saving throw vs. Death magic or retreat',
    9: 'Tail burned, lose any tail attacks, 1/2 move if animal uses tail for movement',
    10: 'Tail burned, lose any tail attacks, 1/2 move if animal uses tail for movement',
    11: 'Tail incinerated at mid-length, victim stunned [[1d3]] rounds, minor bleeding, movement',
    12: 'Tail incinerated, victim stunned [[1d6]] rounds, pain reduces creature to 1/2 attack and major bleeding if creature uses tail for movement',
};
//#endregion

//#region Fire
SPELL_CRIT_EFFECT_TABLE['Fire']['Legs'] = {
    4: 'Victim singed, –1 penalty to attack rolls',
    5: 'Leg scorched, 1/2 move, –1 penalty to attack rolls',
    6: 'Foot burned, 1/2 move, –1 penalty to attack rolls',
    7: 'Leg burned, 1/2 move, –2 penalty to attack rolls; if victim is wearing metal armor, hot steel scorches him for an additional 2d4 damage in the following round, and 1d4 damage in the round after that.',
    8: 'Hip/thigh burned, 1/4 move, –2 to all attacks, victim must roll saving throw vs. death magic or be on fire (see page 122)',
    9: 'Leg burned, 1/4 move and –4 penalty to all attacks; if victim wears metal armor, armor is destroyed and hot steel scorches him for an additional 2d4 damage in the following round, and 1d4 damage in the round after that.',
    10: 'Foot incinerated; minor bleeding, victim stunned [[1d6]] rounds, then no movement and –4 penalty to all attacks',
    11: 'Leg incinerated at knee, major bleeding, no move or attack',
    12: 'Leg incinerated at hip, no move or attack, major bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Fire']['Abdomen'] = {
    4: 'Victim singed, –1 to attack rolls',
    5: 'Abdomen scorched, –1 to attack rolls, 1/2 move',
    6: 'Abdomen burned, 1/2 move, –2 to attack rolls; if victim wears metal armor, he is seared as hot steel scorches him for an additional 2d4 damage in the following round, and 1d4 damage in the round after that.',
    7: 'Abdomen burned, 1/2 move, –2 to attack rolls, victim must roll saving throw vs. death magic or catch fire (see page 122)',
    8: 'Abdomen burned, 1/4 move, –4 to attack rolls, stunned [[1d6]] rounds',
    9: 'Abdomen burned, stunned [[1d6]] rounds, 1/4 move, –4 to attacks; if victim wears metal armor, armor destroyed, victim seared as hot steel scorches him for an additional 2d4 damage in the following round, and 1d4 damage in the round after that.',
    10: 'Abdomen burned severely, no move or attack',
    11: 'Abdomen partially incinerated, no move or attack, death in [[1d4]] hours unless victim receives *cure critical wounds* or more powerful magic',
    12: 'Abdomen incinerated, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Fire']['Torso'] = {
    4: 'Victim singed, –1 to attack rolls, stunned 1 round',
    5: 'Torso scorched; 1/2 move, –2 to attack rolls',
    6: 'Torso burned, 1/2 move, –2 to attack rolls; if victim carries shield, shield destroyed, causing searing damage as hot steel scorches him for an additional 2d4 damage in the following round, and 1d4 damage in the round after that.',
    7: 'Torso burned, victim stunned [[1d6]] rounds, 1/2 move, –2 to attacks; if victim wears metal armor, he is seared as hot steel scorches him for an additional 2d4 damage in the following round, and 1d4 damage in the round after that.',
    8: 'Torso burned, victim stunned [[1d6]] rounds, 1/4 move, –4 to attack rolls; victim must roll saving throw vs. death magicor catch fire (see page 122)',
    9: 'Torso burned, no move or attack',
    10: 'Torso burned deeply, no move or attack, victim on fire (see page 122)',
    11: 'Torso partially incinerated, victim reduced to 0 hit points, dies in [[1d3]] turns unless treated by *cure critical wounds* or more powerful magic',
    12: 'Torso incinerated, victim killed instantly',
};

SPELL_CRIT_EFFECT_TABLE['Fire']['Arms'] = {
    4: 'Hand singed, weapon or shield dropped',
    5: 'Arm scorched, –2 to attacks',
    6: 'Hand burned, –2 to attacks with that hand (or no shield use if shield arm is burned)',
    7: 'Arm burned, –2 penalty to all attacks; if victim wears metal armor, seared for [[2d4]] damage in next round, [[1d4]] in round after that',
    8: 'Arm burned, victim stunned [[1d6]] rounds, –4 to attacks with affected arm and –2 to all other attacks; roll saving throw vs. death magic or catch fire',
    9: 'Arm burned and useless, victim stunned [[1d6]] rounds and on fire',
    10: 'Hand incinerated, stunned [[1d6]] rounds, –2 to all attacks',
    11: 'Arm incinerated at elbow, stunned [[1d6]] rounds, no attacks',
    12: 'Arm incinerated at shoulder, stunned [[1d6]] rounds, 1/2 move, no attacks',
};

SPELL_CRIT_EFFECT_TABLE['Fire']['Head'] = {
    4: 'Victim singed, –1 penalty to attacks',
    5: 'Head scorched, –2 to all attack rolls, if victim wears metal helm, hot metal sears him for [[2d4]] damage next round, [[1d4]] more the round after',
    6: 'Head scorched, –2 to attacks, victim must roll saving throw vs. death magic or catch fire (see page 122)',
    7: 'Face burned, stunned [[1d6]] rounds, –4 to all attacks and 1/2 move; if victim wears metal helm, hot metal sears him for [[2d4]] damage next round, [[1d4]] more the round after',
    8: 'Face burned, victim blinded, stunned [[1d6]] rounds',
    9: 'Face burned, victim blinded, stunned [[1d6]] rounds',
    10: 'Face burned, victim blinded, no move or attack',
    11: 'Head burned, victim blinded and deafened, and remains so until he receives a *regenerate* spell or similar healing magic',
    12: 'Skull incinerated, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Fire']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail singed; if prehensile, any items carried are dropped, –2 penalty to all tail attacks',
    7: 'Tail burned, lose any tail attacks; normal animals immediately retreat',
    8: 'Tail burned, lose any tail attacks; normal animals immediately retreat',
    9: 'Tail burned, lose any tail attacks, 1/2 move if animal uses tail for movement; roll saving throw vs. death magic or catch fire (see page 122)',
    10: 'Tail burned, lose any tail attacks, 1/2 move if animal uses tail for movement; roll saving throw vs. death magic or catch fire (see page 122)',
    11: 'Tail incinerated at mid-length, victim stunned [[1d3]] rounds, minor bleeding, movement',
    12: 'Tail incinerated, victim stunned [[1d6]] rounds, pain reduces creature to 1/2 and major bleeding if creature uses tail for movement',
};
//#endregion

//#region Impact
SPELL_CRIT_EFFECT_TABLE['Impact']['Legs'] = {
    4: 'Victim knocked down',
    5: 'Knee struck, victim knocked down, 1/2 move',
    6: 'Foot broken, 1/2 move, minor bleeding',
    7: 'Leg injured, 1/2 move; if target has no armor to cover legs, 1/4 move, –2 to all attacks, and minor bleeding',
    8: 'Hip broken, stunned [[1d6]] rounds, minor bleeding, no move, –4 penalty to all attacks',
    9: 'Leg injured, stunned [[1d6]] rounds, 1/2 move, –2 to all attacks; if victim has no armor, leg broken, no move, –4 to all attacks, major bleeding',
    10: 'Knee shattered, minor bleeding, stunned [[1d6]] rounds, no move, –4 penalty to all attacks',
    11: 'Hip shattered, major bleeding, stunned [[1d6]] rounds, no move or attack',
    12: 'Leg shattered, stunned [[2d6]] rounds, no move or attack, major bleeding from compound fractures',
};

SPELL_CRIT_EFFECT_TABLE['Impact']['Abdomen'] = {
    4: 'Victim stunned [[1d6]] rounds',
    5: 'Abdomen struck, victim stunned 1 round, reduced to 1/2 move',
    6: 'Abdomen struck, 1/2 move, –2 to all attacks; if victim wears no armor, bleeding',
    7: 'Abdomen injured, stunned [[1d6]] rounds, 1/2 move, –2 to attacks, major bleeding',
    8: 'Abdomen injured, major bleeding, stunned [[1d6]] rounds, 1/4 move, –4 to all attacks',
    9: 'Abdomen injured, stunned [[1d6]] rounds, major bleeding, 1/4 move, –4 to all attack, major bleeding',
    10: 'Abdomen injured, no move or attack, major bleeding',
    11: 'Abdomen destroyed, no move or attack, major bleeding',
    12: 'Abdomen destroyed, victim reduced to 0 hp, severe bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Impact']['Torso'] = {
    4: 'Knockdown, stunned [[1d4]] rounds',
    5: 'Torso struck, victim stunned 1 round, 1/2 move',
    6: 'Torso struck, 1/2 move, shield damaged; if victim has no shield, stunned [[1d6]] rounds, 1/2 move, –2 to attacks, minor bleeding',
    7: 'Armor damaged, torso injured, 1/2 move, –2 to attacks; if victim wears no penalty to attacks',
    8: 'Torso injured, stunned [[1d6]] rds, major bleeding, 1/4 move, –4 to attacks',
    9: 'Ribs broken, major bleeding, stunned [[1d6]] rounds, 1/4 move, –4 attacks',
    10: 'Ribs broken, major bleeding, no move or attack',
    11: 'Torso destroyed, victim reduced to 0 hp, severe bleeding',
    12: 'Torso destroyed, victim killed',
};

SPELL_CRIT_EFFECT_TABLE['Impact']['Arms'] = {
    4: 'Hand struck, weapon/shield dropped',
    5: 'Arm struck, –2 to attacks with that arm',
    6: 'Hand broken, minor bleeding, –2 to all attacks',
    7: 'Armor damaged, arm injured, –2 to all attacks; if victim has no armor, arm broken, –4 to attacks with that arm, minor bleeding',
    8: 'Shield damaged, arm broken, stunned 1 round, minor bleeding',
    9: 'Weapon dropped, arm broken, stunned [[1d6]] rounds, minor bleeding',
    10: 'Shoulder injured, no attacks, stunned [[1d6]] rounds, minor bleeding',
    11: 'Arm shattered, 1/2 move, no attacks, stunned [[1d6]] rounds, minor bleeding',
    12: 'Shoulder shattered, stunned [[2d6]] rounds, no move or attacks, major bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Impact']['Head'] = {
    4: 'Victim stunned [[1d6]] rounds',
    5: 'Head struck, helm removed, victim stunned 1 round, –2 to attack rolls; if victim has no helm, stunned [[1d6]] rounds, –2 to attacks',
    6: 'Head injured, victim stunned [[1d6]] rounds, –2 to attacks, minor bleeding',
    7: 'Helm damaged, face injured, stunned [[1d6]] rounds, 1/2 move, –4 to attack rolls; if victim has no helm, unconscious [[2d4]] hours, minor bleeding, 1/4 move, no attacks',
    8: 'Skull broken, helm destroyed, victim reduced to 0 hit points, unconscious [[1d4]] hours, minor bleeding; no movement or attacks',
    9: 'Jaw/face broken, major bleeding, no movement or attack; victim loses [[1d3]] points of Charisma/Appearance permanently',
    10: 'Head injured, major bleeding, unconscious [[1d6]] days; victim must roll saving throw vs. death magic or lose [[1d3]] points of Intelligence, Wisdom, and Charisma permanently',
    11: 'Throat destroyed, no move or attack, stunned [[2d6]] rounds, severe bleeding',
    12: 'Skull destroyed, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Impact']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail struck; if prehensile, any items carried are dropped, –2 penalty to all tail attacks due to pain',
    7: 'Tail injured, minor bleeding, lose any tail attacks; normal animals must roll saving throw vs. death magic or retreat in pain',
    8: 'Tail injured, minor bleeding, lose any tail attacks; normal animals must roll saving throw vs. death magic or retreat in pain',
    9: 'Tail broken, minor bleeding, lose any tail attacks, 1/2 move if animal uses tail for movement',
    10: 'Tail broken, minor bleeding, lose any tail attacks, 1/2 move if animal uses tail for movement',
    11: 'Tail injured, victim stunned [[1d3]] rounds, lose any tail attacks, no movement or attacks if creature uses tail for movement',
    12: 'Tail destroyed, pain reduces creature to 1/2 move and –2 penalty on any movement',
};
//#endregion

//#region Slashing
SPELL_CRIT_EFFECT_TABLE['Slashing']['Legs'] = {
    4: 'Leg struck, minor bleeding, victim knocked down',
    5: 'Knee struck, knockdown, minor bleeding, 1/2 move',
    6: 'Leg injured, 1/2 move, minor bleeding',
    7: 'Leg injured, knockdown, 1/2 move, minor bleeding; if victim has no armor, stunned [[1d4]] rounds, 1/2 move, major bleeding',
    8: 'Knee injured, stunned [[1d4]] rounds, minor bleeding, 1/4 move, –2 attacks',
    9: 'Leg injured, minor bleeding, 1/4 move, –2 to attacks; if victim has no armor, leg broken, major bleeding, no move, –4 to all attacks',
    10: 'Hip broken, stunned [[1d6]] rounds, no move or attack, major bleeding',
    11: 'Leg severed at knee, stunned [[2d6]] rounds, major bleeding, no move or attack',
    12: 'Leg severed at thigh, stunned [[2d6]] rounds, no move or attack, severe bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Slashing']['Abdomen'] = {
    4: 'Abdomen grazed, minor bleeding',
    5: 'Abdomen struck, victim stunned 1 round, 1/2 move, minor bleeding',
    6: 'Abdomen struck, armor damaged, stunned [[1d3]] rounds, 1/2 move, minor bleeding; if victim wears no armor, abdomen injured, stunned [[1d6]] rounds, 1/2 move, –2 penalty to all attacks, minor bleeding',
    7: 'Abdomen injured, 1/2 move, –2 to all attacks, major bleeding',
    8: 'Abdomen injured, major bleeding, 1/4 move, –4 to all attacks',
    9: 'Abdomen injured, armor destroyed, 1/4 move, –4 to all attacks; if victim has no armor, unconscious [[1d6]] hours, major bleeding',
    10: 'Abdomen injured, no move or attack, major internal bleeding',
    11: 'Abdominal wall destroyed, stunned [[2d6]] rounds, no move or attack, severe bleeding',
    12: 'Abdomen destroyed, victim killed',
};

SPELL_CRIT_EFFECT_TABLE['Slashing']['Torso'] = {
    4: 'Torso grazed, minor bleeding',
    5: 'Torso struck, stunned 1 round, 1/2 move, minor bleeding',
    6: 'Shield damaged, torso struck, 1/2 move, minor bleeding',
    7: 'Armor damaged, torso injured, 1/2 move, –2 to all attacks; if victim wears no attacks',
    8: 'Torso injured, major bleeding, stunned [[1d6]] rounds, 1/4 move, –2 attacks',
    9: 'Ribs broken, major bleeding, stunned [[1d6]] rounds, 1/4 move, –4 attacks',
    10: 'Ribs broken, major bleeding, stunned [[1d6]] rounds, no move or attack',
    11: 'Torso destroyed, severe bleeding, unconscious [[2d6]] days, no move or attack',
    12: 'Torso destroyed, victim killed',
};

SPELL_CRIT_EFFECT_TABLE['Slashing']['Arms'] = {
    4: 'Hand struck, weapon or shield dropped',
    5: 'Arm struck, minor bleeding, shield damage or weapon dropped',
    6: 'Hand injured, minor bleeding, –2 to attacks or no shield use',
    7: 'Armor damaged, arm injured, minor bleeding, –2 to all attacks; if victim has no armor, arm broken, stunned [[1d6]] rounds, major bleeding, –2 to all attacks',
    8: 'Hand severed, stunned [[1d6]] rounds, major bleeding',
    9: 'Arm broken, and useless, stunned [[1d6]] rounds, major bleeding, 1/2 move, –2 to all other attacks',
    10: 'Shoulder injured, stunned [[1d6]] rounds, no attacks, major bleeding',
    11: 'Arm severed at elbow, stunned [[2d6]] rounds, no attacks, major bleeding',
    12: 'Arm severed at shoulder, no move or attacks, severe bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Slashing']['Head'] = {
    4: 'Head grazed, minor bleeding, victim stunned [[1d6]] rounds',
    5: 'Head struck, helm removed, victim stunned 1 round, –2 to attack rolls; if to all attack rolls',
    6: 'Eye destroyed, stunned [[2d6]] rounds, –2 to all attacks',
    7: 'Helm damaged, face injured, stunned [[1d6]] rounds, 1/2 move, –4 to all attacks, minor bleeding',
    8: 'Skull broken, helm damaged, major bleeding, unconscious [[1d6]] hours',
    9: 'Face injured, victim blinded, major bleeding, no move or attack',
    10: 'Skull broken, unconscious [[1d6]] days, major bleeding, 1/4 move, –4 penalty to all attacks',
    11: 'Throat destroyed, severe bleeding',
    12: 'Skull destroyed, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Slashing']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail struck; if prehensile, any items carried are dropped, –2 penalty to tail attacks, minor bleeding',
    7: 'Tail injured, lose any tail attacks; minor bleeding, normal animals must roll saving throw vs. death magic or retreat in pain',
    8: 'Tail injured, lose any tail attacks; minor bleeding, normal animals must roll saving throw vs. death magic or retreat in pain',
    9: 'Tail broken, lose any tail attacks, 1/2 move if animal uses tail for movement, minor bleeding',
    10: 'Tail broken, lose any tail attacks, 1/2 move if animal uses tail for movement, minor bleeding',
    11: 'Tail destroyed, stunned [[1d3]] rounds, major bleeding, lose any tail attacks, no move or attack if creature uses tail for movement',
    12: 'Tail severed, stunned [[1d6]] rounds, 1/2 move, –2 penalty on all attacks, major bleeding; no move or attack if creature uses tail for movement',
    13: '.\nAnd doubled damage dice'
};
//#endregion

//#region Vibration
SPELL_CRIT_EFFECT_TABLE['Vibration']['Legs'] = {
    4: 'Victim grazed and knocked down',
    5: 'Leg struck, 1/2 move; victim knocked down, stunned [[1d4]] rounds',
    6: 'Foot injured, 1/2 move, victim knocked down, stunned [[1d4]] rounds',
    7: 'Armor destroyed, leg injured, 1/2 move, victim stunned [[1d4]] rounds',
    8: 'Hip/thigh injured, knocked down, stunned [[2d4]] rounds, 1/4 move',
    9: 'Armor destroyed, leg broken, stunned [[2d4]] rounds, 1/4 move and –4 penalty to all attacks',
    10: 'Foot disintegrated; minor bleeding, victim stunned [[2d4]] rounds, then no movement and –4 penalty to all attacks',
    11: 'Leg disintegrated at knee, major bleeding, no move or attack',
    12: 'Leg disintegrated at hip, no move or attack, major bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Vibration']['Abdomen'] = {
    4: 'Victim grazed and stunned 1 round',
    5: 'Abdomen struck, –2 to attack rolls, 1/2 move, stunned [[1d4]] rounds',
    6: 'Armor destroyed, abdomen injured, 1/2 move, –2 to attack rolls, victim stunned [[1d4]] rounds',
    7: 'Abdomen injured, 1/2 move, –2 to attack rolls, victim stunned [[2d4]] rounds',
    8: 'Abdomen injured, 1/4 move, –4 to attack rolls, stunned [[2d4]] rounds',
    9: 'Armor destroyed, abdomen injured, victim stunned [[2d4]] rounds, 1/4 move, –4 to attack rolls, minor bleeding',
    10: 'Abdomen injured internally, no move or attack, major bleeding',
    11: 'Abdomen partially disintegrated, no move or attack, death follows in [[1d4]] hours if victim is not treated with a *cure critical wounds* or more powerful healing magic',
    12: 'Abdomen disintegrated, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Vibration']['Torso'] = {
    4: 'Victim grazed, stunned 1 round',
    5: 'Torso struck; 1/2 move, –2 to attack rolls, stunned [[1d4]] rounds',
    6: 'Shield destroyed, torso injured, stunned [[1d4]] rounds, 1/2 move, –2 to attack rolls',
    7: 'Armor destroyed, torso injured, stunned [[2d4]] rounds, 1/2 move, –2 penalty to attacks',
    8: 'Torso injured, victim stunned [[2d4]] rounds, 1/4 move, –4 to attack rolls',
    9: 'Torso injured, no move or attack, minor bleeding',
    10: 'Ribs broken, no move or attack, major bleeding',
    11: 'Torso partially disintegrated, victim reduced to 0 hit points and dies in [[1d3]] turns unless treated by *cure critical wounds* or more powerful healing magic',
    12: 'Torso disintegrated, victim killed instantly',
};

SPELL_CRIT_EFFECT_TABLE['Vibration']['Arms'] = {
    4: 'Hand grazed, weapon or shield dropped',
    5: 'Arm struck, stunned [[1d4]] rounds, –2 to attacks with that hand',
    6: 'Hand injured, –2 to attacks with that hand (or no shield use if shield arm is burned), minor bleeding',
    7: 'Armor destroyed, arm injured, –2 penalty to all attacks, victim stunned [[1d4]] rounds',
    8: 'Arm injured, victim stunned [[2d4]] rounds, –4 to attacks with affected arm and –2 to all other attacks, minor bleeding',
    9: 'Arm broken and useless, victim stunned [[2d4]] rounds',
    10: 'Hand disintegrated, stunned [[1d4]] rounds, –2 to all attacks, minor bleeding',
    11: 'Arm disintegrated at elbow, stunned [[2d4]] rounds, no attacks, major bleeding',
    12: 'Arm disintegrated at shoulder, stunned [[2d4]] rounds, 1/2 move, no attacks, major bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Vibration']['Head'] = {
    4: 'Victim stunned 1 round',
    5: 'Head struck, helm destroyed, victim stunned [[1d4]] rounds, –2 to all attack rolls',
    6: 'Head struck, –2 to attacks, stunned [[2d4]] rounds, victim deafened',
    7: 'Helm destroyed, face injured, stunned [[2d4]] rounds, –4 penalty to all attacks, ½ move, victim deafened',
    8: 'Face injured, victim blinded and deafened, stunned [[2d4]] rounds',
    9: 'Skull broken, stunned [[2d4]] rounds, 1/2 move and –4 penalty to attacks; roll saving throw vs. death magic or lose [[1d3]] points of Intelligence',
    10: 'Jaw/face broken, no move or attack, unconscious [[4d6]] days, major bleeding, victim deafened',
    11: 'Throat destroyed, stunned [[2d4]] rounds, severe bleeding',
    12: 'Skull disintegrated, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Vibration']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail grazed; if prehensile, any items carried are dropped, –2 penalty to all tail attacks',
    7: 'Tail injured, lose any tail attacks; normal animals must roll saving throw vs. Death magic or retreat',
    8: 'Tail injured, lose any tail attacks; normal animals must roll saving throw vs. Death magic or retreat',
    9: 'Tail injured, lose any tail attacks, 1/2 move if animal uses tail for movement',
    10: 'Tail injured, lose any tail attacks, 1/2 move if animal uses tail for movement',
    11: 'Tail disintegrated at mid-length, victim stunned [[1d4]] rounds, minor bleeding, movement',
    12: 'Tail disintegrated, victim stunned [[2d4]] rounds, 1/2 move and –2 penalty on creature uses tail for movement',
};
//#endregion

//#region Wounding
SPELL_CRIT_EFFECT_TABLE['Wounding']['Legs'] = {
    4: 'Victim grazed, –1 penalty to attack rolls',
    5: 'Leg struck, 1/2 move, –1 penalty to attack rolls',
    6: 'Foot injured, 1/2 move, –1 penalty to attack rolls',
    7: 'Leg injured, 1/2 move, –2 penalty to attack rolls, minor bleeding',
    8: 'Hip/thigh injured, 1/4 move, –2 to all attacks, major bleeding',
    9: 'Leg injured, 1/4 move and –4 penalty to all attacks, major bleeding',
    10: 'Leg injured, 1/4 move and –4 penalty to all attacks, major bleeding',
    11: 'Leg withered at knee, minor bleeding, no move or attack',
    12: 'Leg withered at hip, no move or attack, minor bleeding',
};

SPELL_CRIT_EFFECT_TABLE['Wounding']['Abdomen'] = {
    4: 'Victim grazed, –1 to attack rolls',
    5: 'Abdomen struck, –1 to attack rolls, 1/2 move',
    6: 'Abdomen injured, 1/2 move, –2 to attack rolls, minor bleeding',
    7: 'Abdomen injured, 1/2 move, –2 to attack rolls, major bleeding',
    8: 'Abdomen injured, 1/4 move, –4 to attack rolls, stunned [[1d6]] rounds',
    9: 'Abdomen injured, stunned [[1d6]] rounds, 1/4 move, –4 to attacks, major bleeding',
    10: 'Abdomen withered, minor bleeding no move or attack',
    11: 'Abdomen withered, no move or attack, death in [[1d4]] hours unless victim receives *cure critical wounds* or more powerful magic',
    12: 'Abdomen destroyed, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Wounding']['Torso'] = {
    4: 'Victim grazed, –1 to attack rolls, stunned 1 round',
    5: 'Torso struck; 1/2 move, –2 to attack rolls',
    6: 'Torso injured, 1/2 move, –2 to attack rolls',
    7: 'Torso injured, victim stunned [[1d6]] rounds, 1/2 move, –2 to attacks, minor bleeding',
    8: 'Torso injured, victim stunned [[1d6]] rounds, 1/4 move, –4 to attack rolls, minor bleeding',
    9: 'Torso injured, no move or attack, major bleeding',
    10: 'Torso withered, no move or attack, major bleeding',
    11: 'Torso withered, victim reduced to 0 hit points, dies in [[1d3]] turns unless treated by *cure critical wounds* or more powerful magic',
    12: 'Torso destroyed, victim killed instantly',
};

SPELL_CRIT_EFFECT_TABLE['Wounding']['Arms'] = {
    4: 'Hand grazed, weapon or shield dropped',
    5: 'Arm struck, –2 to attacks with that hand',
    6: 'Hand injured, –2 to attacks with that hand (or no shield use if shield hand is injured)',
    7: 'Arm injured, –2 penalty to all attacks, minor bleeding',
    8: 'Arm injured, stunned [[1d6]] rounds, –4 to attacks with affected arm, –2 penalty to all other attacks, minor bleeding',
    9: 'Arm injured and useless, victim stunned [[1d6]] rounds, minor bleeding',
    10: 'Hand withered, stunned [[1d6]] rounds, –2 to all attacks',
    11: 'Arm withered at elbow, stunned [[1d6]] rounds, no attacks',
    12: 'Arm withered at shoulder, stunned [[1d6]] rounds, 1/2 move, no attacks',
};

SPELL_CRIT_EFFECT_TABLE['Wounding']['Head'] = {
    4: 'Victim grazed, –1 penalty to attacks',
    5: 'Head struck, –2 to all attack rolls',
    6: 'Head injured, –2 to attacks, stunned [[1d6]] rounds',
    7: 'Face injured, stunned [[1d6]] rounds, –4 to all attacks and 1/2 move',
    8: 'Face injured, victim blinded, stunned [[1d6]] rounds',
    9: 'Head partially withered, stunned [[1d6]] rounds, 1/2 move and –4 penalty to attacks, minor bleeding',
    10: 'Face destroyed, victim blinded, no move or attack, major bleeding',
    11: 'Throat destroyed, stunned [[1d6]] rounds, severe bleeding',
    12: 'Skull destroyed, immediate death',
};

SPELL_CRIT_EFFECT_TABLE['Wounding']['Tail'] = {
    4: 'No unusual effect',
    5: 'No unusual effect',
    6: 'Tip of tail struck; if prehensile, any items carried are dropped, –2 penalty to all tail attacks',
    7: 'Tail injured, lose any tail attacks; normal animals must roll saving throw vs. Spell or immediately retreat',
    8: 'Tail injured, lose any tail attacks; normal animals must roll saving throw vs. Spell or immediately retreat',
    9: 'Tail injured, lose any tail attacks, 1/2 move if animal uses tail for movement, minor bleeding',
    10: 'Tail injured, lose any tail attacks, 1/2 move if animal uses tail for movement, minor bleeding',
    11: 'Tail withered, stunned [[1d3]] rounds, minor bleeding, lose tail attacks; no movement or attacks if creature uses tail for movement',
    12: 'Tail destroyed, victim stunned [[1d6]] rounds, 1/2 move and –2 penalty on any creature uses tail for movement',
};
//#endregion


//#endregion