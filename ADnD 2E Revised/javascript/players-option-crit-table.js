const LOCATION_TABLE = {};
LOCATION_TABLE['Humanoid'] = {};
LOCATION_TABLE['Humanoid']['1'] = LOCATION_TABLE['Humanoid']['2'] = { 'hitLocation': 'Right leg', 'location': 'Legs'};
LOCATION_TABLE['Humanoid']['3'] = LOCATION_TABLE['Humanoid']['4'] = { 'hitLocation': 'Left leg', 'location': 'Legs'};
LOCATION_TABLE['Humanoid']['5'] = { 'hitLocation': 'Abdomen', 'location': 'Abdomen'};
LOCATION_TABLE['Humanoid']['6'] = LOCATION_TABLE['Humanoid']['7'] = { 'hitLocation': 'Torso', 'location': 'Torso'};
LOCATION_TABLE['Humanoid']['8'] = { 'hitLocation': 'Right arm', 'location': 'Arms'};
LOCATION_TABLE['Humanoid']['9'] = { 'hitLocation': 'Left arm', 'location': 'Arms'};
LOCATION_TABLE['Humanoid']['10'] = { 'hitLocation': 'Head', 'location': 'Head'};

LOCATION_TABLE['Animal'] = {};
LOCATION_TABLE['Animal']['1'] = { 'hitLocation': 'Right foreleg/wing', 'location': 'Legs/Wings'};
LOCATION_TABLE['Animal']['2'] = { 'hitLocation': 'Lef t foreleg/wing', 'location': 'Legs/Wings'};
LOCATION_TABLE['Animal']['3'] = { 'hitLocation': 'Right hind leg', 'location': 'Legs/Wings'};
LOCATION_TABLE['Animal']['4'] = { 'hitLocation': 'Left hind leg', 'location': 'Legs/Wings'};
LOCATION_TABLE['Animal']['5'] = { 'hitLocation': 'Tail (for snakes or fish, 1-5 is tail hit)', 'location': 'Tail'};
LOCATION_TABLE['Animal']['6'] = LOCATION_TABLE['Animal']['7'] = { 'hitLocation': 'Abdomen', 'location': 'Abdomen'};
LOCATION_TABLE['Animal']['8'] = LOCATION_TABLE['Animal']['9'] = { 'hitLocation': 'Torso/chest', 'location': 'Torso'};
LOCATION_TABLE['Animal']['10'] = { 'hitLocation': 'Head', 'location': 'Head'};

LOCATION_TABLE['Monster'] = {};
LOCATION_TABLE['Monster']['1'] = { 'hitLocation': 'Right foreleg/claw/wing', 'location': 'Legs/Wings'};
LOCATION_TABLE['Monster']['2'] = { 'hitLocation': 'Left foreleg/claw/wing', 'location': 'Legs/Wings'};
LOCATION_TABLE['Monster']['3'] = { 'hitLocation': 'Right hind leg', 'location': 'Legs/Wings'};
LOCATION_TABLE['Monster']['4'] = { 'hitLocation': 'Left hind leg', 'location': 'Legs/Wings'};
LOCATION_TABLE['Monster']['5'] = { 'hitLocation': 'Tail (for snakelike or fishlike monsters, 1-5 is tail hit)', 'location': 'Tail'};
LOCATION_TABLE['Monster']['6'] = LOCATION_TABLE['Monster']['7'] = { 'hitLocation': 'Abdomen', 'location': 'Abdomen'};
LOCATION_TABLE['Monster']['8'] = LOCATION_TABLE['Monster']['9'] = { 'hitLocation': 'Torso/chest', 'location': 'Torso'};
LOCATION_TABLE['Monster']['10'] = { 'hitLocation': 'Head', 'location': 'Head'};

const CRIT_EFFECT_TABLE = {};
CRIT_EFFECT_TABLE['Bludgeoning'] = {};
CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid'] = {};
CRIT_EFFECT_TABLE['Bludgeoning']['Animal'] = {};
CRIT_EFFECT_TABLE['Bludgeoning']['Monster'] = {};

CRIT_EFFECT_TABLE['Piercing'] = {};
CRIT_EFFECT_TABLE['Piercing']['Humanoid'] = {};
CRIT_EFFECT_TABLE['Piercing']['Animal'] = {};
CRIT_EFFECT_TABLE['Piercing']['Monster'] = {};

CRIT_EFFECT_TABLE['Slashing'] = {};
CRIT_EFFECT_TABLE['Slashing']['Humanoid'] = {};
CRIT_EFFECT_TABLE['Slashing']['Animal'] = {};
CRIT_EFFECT_TABLE['Slashing']['Monster'] = {};

//#region Bludgeoning
CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid']['Legs'] = {
    '4': 'Victim knocked down',
    '5': 'Knee struck, knockdown, 1/2 move',
    '6': 'Foot broken, 1/2 move',
    '7': 'Armor damaged, leg injured if target has no armor to cover legs, 1/4 move',
    '8': 'Hip broken, minor bleeding, no move',
    '9': 'Armor damaged, leg broken if target has no armor to cover legs, no move',
    '10': 'Knee shattered, no move, -2 penalty to attacks',
    '11': 'Hip shattered, minor bleeding, no move or attack',
    '12': 'Leg shattered, no move or attack, major bleeding from compound fractures',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid']['Abdomen'] = {
    '4': 'Victim stunned [[1d6]] rounds',
    '5': 'Abdomen struck, victim stunned 1 round and reduced to 1/2 move',
    '6': 'Armor damaged, victim stunned [[1d6]] rounds, triple damage if no armor',
    '7': 'Abdomen injured, 1/2 move, -2 penalty to attacks',
    '8': 'Abdomen injured, minor internal bleeding, 1/2 move and -2 penalty to attacks',
    '9': 'Armor damage, abdomen injured, minor bleeding, 1/2 move and -2 penalty to attacks',
    '10': 'Abdomen injured, no move or attack, minor internal bleeding',
    '11': 'Abdomen crushed, no move or attack, major internal bleeding',
    '12': 'Abdomen crushed, victim reduced to 0 hit points with severe internal bleeding',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid']['Torso'] = {
    '4': 'Knockdown, stunned [[1d4]] rounds',
    '5': 'Torso struck, victim stunned 1 round and reduced to 1/2 move',
    '6': 'Shield damage, torso struck, 1/2 move',
    '7': 'Armor damage, torso struck, 1/2 move, -2 penalty to attacks',
    '8': 'Torso injured, minor internal bleeding, no move or attack',
    '9': 'Ribs broken, minor internal bleeding, 1/2 move, -2 penalty to attacks',
    '10': 'Ribs broken, major internal bleeding, no move or attack',
    '11': 'Torso crushed, victim reduced to 0 hit points with severe internal bleeding',
    '12': 'Torso crushed, victim killed',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid']['Arms'] = {
    '4':  'Hand struck, weapon/shield dropped',
    '5':  'Arm struck, shield damage/weapon dropped',
    '6':  'Hand broken, -2 penalty to attacks/shield dropped',
    '7':  'Armor damage, arm broken if victim has no armor to cover limb',
    '8':  'Shield damage, arm broken, stunned 1 round',
    '9':  'Weapon dropped, arm broken, stunned [[1d4]] rounds',
    '10': 'Shoulder injured, no attacks, minor bleeding',
    '11': 'Arm shattered, 1/2 move, no attacks, minor bleeding',
    '12': 'Shoulder shattered, no move or attacks, major bleeding',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Humanoid']['Head'] = {
    '4':  'Victim stunned [[1d6]] rounds',
    '5':  'Head struck, helm removed, victim stunned 1 round; -2 penalty to attack rolls if victim had no helm',
    '6':  'Head struck, -2 penalty to attacks',
    '7':  'Helm damaged, face injured, stunned [[1d6]] rounds, 1/2 move, -4 penalty to attacks',
    '8':  'Skull broken, helm damaged, victim reduced to 0 hit points and unconscious [[1d4]] hours',
    '9':  'Face crushed, minor bleeding, no move or attack, Charisma drops by 2 points permanently',
    '10': 'Head injured, unconscious [[1d6]] days, lose 1 point each of Intelligence/Wisdom/Charisma permanently',
    '11': 'Skull crushed, reduced to 0 hit points, major bleeding, Intelligence, Wisdom, Charisma all drop by 1/2 permanently',
    '12': 'Skull crushed, immediate death',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Animal']['Legs/Wings'] = {
    '4':  'Victim knocked down',
    '5':  'Knee struck, victim reduced to 2/3 move',
    '6':  'Foot/wrist broken, 2/3 move',
    '7':  'Leg injured, 2/3 move, -2 penalty to attacks',
    '8':  'Hip broken, minor bleeding, no movement, -2 penalty to attacks; wing hit forces crash landing',
    '9':  'Leg broken, 2/3 move, minor bleeding; wing hit forces immediate landing',
    '10': 'Knee shattered, 1/3 move, -2 penalty to attacks',
    '11': 'Hip/shoulder shattered, minor bleeding, no move or attack; wing hit forces crash landing',
    '12': 'Leg/wing shattered, no move or attack, major bleeding from compound fractures',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Animal']['Tail'] = {
    '4':  'No unusual effect',
    '5':  'No unusual effect',
    '6':  'Tip of tail struck; if prehensile, any items car- ried are dropped, -2 penalty to tail attacks due to pain',
    '7':  'Tail injured, normal animals must save vs. death or retreat in pain; lose any tail attacks',
    '8':  'Tail injured, normal animals must save vs. death or retreat in pain; lose any tail attacks',
    '9':  'Tail broken, lose any tail attacks, 1/2 move if animal uses tail for movement',
    '10': 'Tail broken, lose any tail attacks, 1/2 move if animal uses tail for movement',
    '11': 'Tail crushed, victim stunned [[1d3]] rounds, lose any tail attacks, no movement or attacks if animal uses tail for movement',
    '12': 'Tail crushed, pain reduces creature to 1/2 move and -2 penalty on any attack, minor bleeding; no move or attack if animal uses tail for movement',
};


CRIT_EFFECT_TABLE['Bludgeoning']['Animal']['Abdomen'] = {
    '4':  'Victim stunned [[1d6]] rounds',
    '5':  'Abdomen struck, victim stunned 1 round and reduced to 1/2 move',
    '6':  'Abdomen struck, victim stunned [[1d6]] rounds, reduced to 1/2 move',
    '7':  'Abdomen injured, 1/2 move, -2 penalty to attacks',
    '8':  'Spine broken, no move, -4 penalty to attacks',
    '9':  'Abdomen injured, minor bleeding, 1/2 move and -2 penalty to attacks',
    '10': 'Abdomen injured, no move or attack, minor internal bleeding',
    '11': 'Spine crushed, no move or attack, major internal bleeding',
    '12': 'Abdomen crushed, victim reduced to 0 hit points with severe internal bleeding',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Animal']['Torso'] = {
    '4':  'Knockdown, stunned [[1d4]] rounds',
    '5':  'Torso struck, victim stunned 1 round and reduced to 1/2 move',
    '6':  'Torso struck, stunned [[1d6]] rounds, 1/2 move',
    '7':  'Spine struck, 1/2 move, -2 penalty to attacks',
    '8':  'Torso injured, minor internal bleeding, no move or attack',
    '9':  'Ribs broken, minor internal bleeding, 1/2 move, -2 penalty to attacks',
    '10': 'Ribs broken, major internal bleeding, no move or attack',
    '11': 'Spine crushed, victim reduced to 0 hit points with severe internal bleeding',
    '12': 'Torso crushed, victim killed',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Animal']['Head'] = {
    '4':  'Victim stunned [[1d6]] rounds',
    '5':  'Snout struck, animal must save vs. death or retreat in pain for [[1d10]] rounds',
    '6':  'Head struck, –2 penalty to attacks',
    '7':  'Jaw injured, stunned [[1d6]] rounds, 2/3 move, –4 penalty to all attacks',
    '8':  'Skull broken, animal reduced to 0 hit points and unconscious [[1d4]] hours',
    '9':  'Snout/face crushed, minor bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks',
    '10': 'Head injured, unconscious [[2d4]] hours, reduced to 1/2 move and –4 penalty to all attacks for [[1d3]] months',
    '11': 'Skull crushed, reduced to 0 hit points, major bleeding, Intelligence, Wisdom, Charisma all drop by 1/2 permanently',
    '12': 'Skull crushed, immediate death',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Monster']['Legs/Wings'] = {
    '4':  'Victim knocked down',
    '5':  'Knee struck, victim reduced to 2/3 move, –2 penalty to attacks with tha appendage',
    '6':  'Foot/wrist broken, 2/3 move, –4 penalty to attacks with that appendage',
    '7':  'Limb injured, 2/3 move, –2 penalty to all attacks',
    '8':  'Hip broken, minor bleeding, 1/3 move, no attacks with limb; wing hit forces crash landing',
    '9':  'Limb broken, 2/3 move, minor bleeding; wing hit forces immediate landing',
    '10': 'Knee shattered, 1/3 move, –2 penalty to all attacks',
    '11': 'Hip/shoulder shattered, minor bleeding, 1/3 move, –4 penalty to all attacks; wing hit forces crash',
    '12': 'Leg/wing shattered, no move, –4 penalty to all attacks, major bleeding from compound fractures',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Monster']['Tail'] = {
    '4':  'No unusual effect',
    '5':  'No unusual effect',
    '6':  'Tip of tail struck; if prehensile, any items carried are dropped, –2 penalty to tail attacks due to pain',
    '7':  'Tail injured, lose any tail attacks',
    '8':  'Tail injured, lose any tail attacks',
    '9':  'Tail broken, lose any tail attacks, if creature uses tail for movement reduced to 1/2 move',
    '10': 'Tail broken, lose any tail attacks, if creature uses tail for movement reduced to 1/2 move',
    '11': 'Tail crushed, victim stunned [[1d3]] rounds, lose any tail attacks, no movement if monster uses tail for movement and –4 penalty to all attacks',
    '12': 'Tail crushed, pain reduces creature to 1/2 move and –2 penalty on any attack, minor bleeding; if animal uses tail for movement, no move or attack',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Monster']['Abdomen'] = {
    '4':  'Victim stunned [[1d4]] rounds',
    '5':  'Abdomen struck, victim stunned 1 round and reduced to 2/3 move',
    '6':  'Abdomen struck, victim stunned [[1d6]] rounds, reduced to 2/3 move',
    '7':  'Abdomen injured, 1/2 move, –2 penalty to attacks',
    '8':  'Spine injured, 1/3 move, –4 penalty to attacks',
    '9':  'Abdomen injured, victim stunned [[1d3]] rounds, minor bleeding, 1/3 move and –2 penalty to attacks',
    '10': 'Abdomen injured, no move or attack, minor internal bleeding',
    '11': 'Spine crushed, no move or attack, major internal bleeding',
    '12': 'Abdomen crushed, victim reduced to 0 hit points with severe internal bleeding',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Monster']['Torso'] = {
    '4':  'Knockdown, stunned [[1d4]] rounds',
    '5':  'Torso struck, victim stunned 1 round and reduced to 2/3 move',
    '6':  'Torso struck, stunned [[1d6]] rounds, 2/3 move',
    '7':  'Spine struck, 1/2 move, –2 penalty to attacks',
    '8':  'Torso injured, minor internal bleeding, 1/3 move, –4 penalty to all attacks',
    '9':  'Ribs broken, minor internal bleeding, 1/2 move, –2 penalty to attacks',
    '10': 'Ribs broken, major internal bleeding, no move or attack',
    '11': 'Spine crushed, victim reduced to 0 hit points with severe internal bleeding',
    '12': 'Torso crushed, victim killed',
};

CRIT_EFFECT_TABLE['Bludgeoning']['Monster']['Head'] = {
    '4':  'Victim stunned [[1d4]] rounds',
    '5':  'Jaw struck, –2 penalty to any bite attacks',
    '6':  'Head struck, stunned 1 round, –2 penalty to attacks',
    '7':  'Jaw injured, stunned [[1d4]] rounds, 2/3 move, no bite attacks',
    '8':  'Skull broken, monster reduced to 1/4 normal hit points and unconscious [[2d10]] turns',
    '9':  'Snout/face crushed, minor bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks',
    '10': 'Head injured, unconscious [[1d10]] turns, reduced to 1/2 move and –4 penalty to all attacks for [[3d6]] days',
    '11': 'Skull crushed, reduced to 0 hit points, major bleeding, Int, Wis, Cha all drop by 1/2 permanently',
    '12': 'Skull crushed, immediate death',
};
//#endregion

//#region Piercing
CRIT_EFFECT_TABLE['Piercing']['Humanoid']['Legs'] = {
    '4':  'Leg grazed, victim knocked down',
    '5':  'Leg struck, minor bleeding',
    '6':  'Leg injured, minor bleeding, 2/3 move',
    '7':  'Armor damaged; leg injured if target has no leg armor, 1/2 move, major bleeding',
    '8':  'Knee broken, minor bleeding, 1/3 move, –4 penalty to any attacks',
    '9':  'Armor damaged, leg struck, minor bleeding, 2/3 move; if target has no leg armor, leg broken, major bleeding, 1/3 move, –4 penalty to attacks',
    '10': 'Hip broken, no move or attack, major bleeding',
    '11': 'Leg broken, severe bleeding, no move or attack',
    '12': 'Leg destroyed, no move or attack, severe bleeding',
};

CRIT_EFFECT_TABLE['Piercing']['Humanoid']['Abdomen'] = {
    '4':  'Abdomen grazed, minor bleeding',
    '5':  'Abdomen struck, victim stunned 1 round and reduced to 2/3 move with minor bleeding',
    '6':  'Armor damaged; victim stunned [[1d4]] rounds, minor bleeding, 2/3 move if no armor',
    '7':  'Abdomen injured, major bleeding, 1/2 move, –2 penalty to attacks',
    '8':  'Abdomen injured, severe bleeding, 1/2 move, –4 penalty to attacks',
    '9':  'Armor damage, abdomen injured, minor bleeding, 1/2 move and –2 penalty to attacks; if no armor, victim at 0 hit points, major bleeding',
    '10': 'Abdomen injured, 1/3 move, no attack, severe bleeding',
    '11': 'Abdomen injured, victim at 0 hp, severe bleeding',
    '12': 'Abdomen destroyed, victim killed',
};

CRIT_EFFECT_TABLE['Piercing']['Humanoid']['Torso'] = {
    '4':  'Torso grazed, minor bleeding',
    '5':  'Torso struck, 2/3 move with minor bleeding',
    '6':  'Shield damage, torso struck, 2/3 move & minor bleeding',
    '7':  'Armor damage, torso struck, 2/3 move, –2 penalty to attacks; if no armor, torso injured, no move or attack, severe bleeding',
    '8':  'Torso injured, major bleeding, 1/2 move, –4 penalty to attacks',
    '9':  'Shield damage; torso struck, –2 penalty to attacks; if no shield, ribs broken, severe bleeding, no move or attack',
    '10': 'Ribs broken, severe bleeding, no move or attack',
    '11': 'Torso destroyed, victim reduced to 0 hit points with severe bleeding',
    '12': 'Torso destroyed, victim killed',
};

CRIT_EFFECT_TABLE['Piercing']['Humanoid']['Arms'] = {
    '4':  'Hand struck, weapon dropped, minor bleeding; no effect on shield arm',
    '5':  'Arm struck, shield damage/weapon dropped, minor bleeding',
    '6':  'Hand injured, –2 penalty to attacks/shield dropped',
    '7':  'Armor damage, arm struck, minor bleeding; if no armor, arm injured, minor bleeding',
    '8':  'Arm broken, victim stunned 1 round, minor bleeding, shield or weapon dropped',
    '9':  'Armor damage, arm injured, –2 penalty to attacks or shield dropped; if no armor, arm broken, stunned [[1d6]] rounds, major bleeding',
    '10': 'Shoulder injured, no attacks, major bleeding',
    '11': 'Arm destroyed, major bleeding, 2/3 move',
    '12': 'Arm destroyed, no move/attack, major bleeding',
};

CRIT_EFFECT_TABLE['Piercing']['Humanoid']['Head'] = {
    '4':  'Head grazed, stunned [[1d3]] rounds, minor bleeding',
    '5':  'Head struck, helm removed, victim stunned 1 round; –2 penalty to attack rolls, minor bleeding if victim had no helm',
    '6':  'Eye injured, –4 penalty to all attacks; if helmed, victim is only stunned 1 round instead',
    '7':  'Helm damaged, face injured, stunned [[1d6]] rounds, minor bleeding, 2/3 move, –4 penalty to attacks',
    '8':  'Skull broken, helm damaged, victim reduced to 0 hit points, major bleeding',
    '9':  'Throat injured, severe bleeding',
    '10': 'Skull broken, victim reduced to 0 hp, major bleeding, Int, Wis, Cha all drop by 1/2 permanently',
    '11': 'Throat destroyed, victim killed',
    '12': 'Head destroyed, immediate death',
};

CRIT_EFFECT_TABLE['Piercing']['Animal']['Legs/Wings'] = {
    '4':  'Leg struck, minor bleeding',
    '5':  'Knee struck, 2/3 move, minor bleeding',
    '6':  'Leg injured, minor bleeding, 2/3 move',
    '7':  'Foot/claw injured, minor bleeding, –2 penalty to attacks with that limb',
    '8':  'Hip injured, minor bleeding, 2/3 movement, –2 penalty to all attacks; wing hit forces crash landing',
    '9':  'Leg/wing broken, 1/3 move, minor bleeding; wing hit forces crash landing',
    '10': 'Knee broken, minor bleeding, 1/3 move, –2 penalty to all attacks',
    '11': 'Hip/shoulder destroyed, major bleeding, no move or attack; wing hit forces crash landing',
    '12': 'Leg/wing destroyed, no move or attack, major bleeding',
};

CRIT_EFFECT_TABLE['Piercing']['Animal']['Tail'] = {
    '4':  'No unusual effect',
    '5':  'No unusual effect',
    '6':  'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks',
    '7':  'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks',
    '8':  'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks',
    '9':  'Tail injured, minor bleeding, lose tail attacks; if creature uses tail for movement, 1/3 move',
    '10': 'Tail injured, minor bleeding, lose tail attacks; if creature uses tail for movement, 1/3 move',
    '11': 'Tail destroyed, victim stunned [[1d3]] rounds, lose tail attacks, major bleeding, no movement or attacks if animal uses tail for movement',
    '12': 'Tail destroyed, stunned [[1d2]] rounds, major bleeding, 1/2 move and –2 penalty on attacks; if animal uses tail for movement, no move or attack',
};

CRIT_EFFECT_TABLE['Piercing']['Animal']['Abdomen'] = {
    '4':  'Abdomen grazed, minor bleeding',
    '5':  'Abdomen struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding',
    '6':  'Abdomen struck, victim stunned [[1d4]] rounds, reduced to 2/3 move, minor bleeding',
    '7':  'Abdomen injured, 2/3 move, major bleeding, –2 penalty to all attacks',
    '8':  'Spine injured, 1/3 move, minor bleeding, –4 penalty to all attacks',
    '9':  'Abdomen injured, major bleeding, 1/3 move and –2 penalty to all attacks',
    '10': 'Abdomen injured, no move or attack, major bleeding',
    '11': 'Spine broken, no move or attack, major bleeding, victim paralyzed',
    '12': 'Abdomen destroyed, victim reduced to 0 hit points with severe bleeding',
};

CRIT_EFFECT_TABLE['Piercing']['Animal']['Torso'] = {
    '4':  'Torso grazed, minor bleeding',
    '5':  'Torso struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding',
    '6':  'Torso struck, stunned [[1d4]] rounds, minor bleeding',
    '7':  'Spine struck, minor bleeding, 2/3 move, –2 penalty to attacks',
    '8':  'Torso injured, stunned 1 round, major bleeding',
    '9':  'Ribs broken, minor bleeding, 1/3 move, –4 penalty to attacks',
    '10': 'Ribs broken, major bleeding, no move or attack',
    '11': 'Spine destroyed, victim reduced to 0 hit points with major bleeding',
    '12': 'Torso destroyed, victim killed',
};

CRIT_EFFECT_TABLE['Piercing']['Animal']['Head'] = {
    '4':  'Head grazed, stunned 1 round, minor bleeding',
    '5':  'Snout struck, minor bleeding, animal must save vs. death or retreat for [[1d10]] rounds',
    '6':  'Eye injured, stunned [[1d3]] rounds, –2 penalty to attacks',
    '7':  'Throat injured, major bleeding, 2/3 move, –4 penalty to all attacks',
    '8':  'Skull broken, animal reduced to 0 hit points, major bleeding',
    '9':  'Snout/face destroyed, minor bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks',
    '10': 'Head injured, reduced to 0 hp, major bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] months',
    '11': 'Throat destroyed, severe bleeding',
    '12': 'Head severed, immediate death',
};

CRIT_EFFECT_TABLE['Piercing']['Monster']['Legs/Wings'] = {
    '4':  'Leg grazed, minor bleeding',
    '5':  'Knee struck, 2/3 move',
    '6':  'Leg struck, minor bleeding, 2/3 move',
    '7':  'Foot/claw injured, minor bleeding, –2 penalty to attacks with that limb',
    '8':  'Hip injured, minor bleeding, 1/3 movement; wing hit forces crash landing',
    '9':  'Leg/wing broken, 1/3 move, minor bleeding; wing hit forces crash landing',
    '10': 'Knee destroyed, major bleeding, 1/3 move, –2 penalty to attacks with affected limb',
    '11': 'Hip/shoulder destroyed, major bleeding, no move, –4 penalty to attacks; wing hit forces crash landing',
    '12': 'Leg/wing destroyed, no move or attack, major bleeding',
};

CRIT_EFFECT_TABLE['Piercing']['Monster']['Tail'] = {
    '4':  'No unusual effect',
    '5':  'No unusual effect',
    '6':  'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks',
    '7':  'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks',
    '8':  'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks',
    '9':  'Tail broken, minor bleeding, no tail attacks; if creature uses tail for movement, 1/3 move',
    '10': 'Tail broken, minor bleeding, no tail attacks; if creature uses tail for movement, 1/3 move',
    '11': 'Tail destroyed, victim stunned 1 round, lose tail attacks, major bleeding; 1/3 movement, –4 penalty to attacks if monster uses tail for movement',
    '12': 'Tail destroyed, stunned [[1d3]] rounds, major bleeding, 1/2 move and –2 penalty on any attack; if monster uses tail for movement, no move/attack',
};

CRIT_EFFECT_TABLE['Piercing']['Monster']['Abdomen'] = {
    '4':  'Abdomen grazed, minor bleeding',
    '5':  'Abdomen struck, victim stunned 1 round, minor bleeding',
    '6':  'Abdomen struck, victim stunned [[1d3]] rounds, minor bleeding',
    '7':  'Abdomen injured, 2/3 move, minor bleeding, –2 penalty to all attacks',
    '8':  'Spine injured, 1/2 move, minor bleeding, –4 penalty to all attacks',
    '9':  'Abdomen injured, major bleeding, 1/3 move and –2 penalty to attacks',
    '10': 'Abdomen injured, 1/3 move, –4 penalty to attacks, major bleeding',
    '11': 'Spine injured, no move or attack, major bleeding, victim stunned [[1d6]] rounds',
    '12': 'Abdomen destroyed, victim reduced to 0 hit points with major bleeding',
};

CRIT_EFFECT_TABLE['Piercing']['Monster']['Torso'] = {
    '4':  'Torso grazed, minor bleeding',
    '5':  'Torso struck, victim stunned 1 round, minor bleeding',
    '6':  'Torso struck, stunned [[1d3]] rounds, minor bleeding',
    '7':  'Spine struck, minor bleeding, 2/3 move, –2 penalty to attacks',
    '8':  'Torso injured, minor bleeding, 1/3 move, –4 penalty to attacks',
    '9':  'Ribs injured, major bleeding, 1/3 move, –4 penalty to attacks',
    '10': 'Ribs broken, major bleeding, 1/3 move, no attack',
    '11': 'Spine broken, major bleeding, no move or attack',
    '12': 'Torso destroyed, victim killed',
};

CRIT_EFFECT_TABLE['Piercing']['Monster']['Head'] = {
    '4':  'Head grazed, minor bleeding',
    '5':  'Snout struck, minor bleeding, monster must save vs. death or retreat for 1 round',
    '6':  'Eye injured, stunned 1 round, –2 penalty to attacks',
    '7':  'Throat injured, major bleeding, 2/3 move, –2 penalty to all attacks',
    '8':  'Skull injured, monster reduced to 2/3 move, major bleeding, –2 penalty to all attacks',
    '9':  'Snout/face injured, major bleeding, 1/3 move, no bite attacks, –2 penalty to all other attacks',
    '10': 'Head injured, reduced to 0 hp, major bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] weeks',
    '11': 'Throat destroyed, severe bleeding',
    '12': 'Head destroyed, immediate death',
};
//#endregion

//#region Slashing
CRIT_EFFECT_TABLE['Slashing']['Humanoid']['Legs'] = {
    '4':  'Leg struck, minor bleeding',
    '5':  'Leg struck, minor bleeding; 1/2 move',
    '6':  'Leg injured, major bleeding, 1/2 move',
    '7':  'Armor damaged; leg injured if target has no leg armor, 1/2 move, major bleeding',
    '8':  'Knee shattered, major bleeding, no move, –4 penalty to any attacks',
    '9':  'Armor damaged, leg struck, minor bleeding, 1/2 move; if target has no leg armor, leg severed at knee, severe bleeding, no move or attack',
    '10': 'Hip shattered, no move or attack, severe bleeding',
    '11': 'Leg severed, severe bleeding, no move or attack',
    '12': 'Leg severed at thigh, no move or attack, victim reduced to 0 hit points with severe bleeding',
};

CRIT_EFFECT_TABLE['Slashing']['Humanoid']['Abdomen'] = {
    '4':  'Abdomen grazed, minor bleeding',
    '5':  'Abdomen struck, victim stunned 1 round and reduced to 1/2 move with minor bleeding',
    '6':  'Armor damaged; victim stunned [[1d6]] rounds, major bleeding, 1/2 move if no armor',
    '7':  'Abdomen injured, major bleeding, 1/2 move, –2 penalty to attacks',
    '8':  'Abdomen injured, severe bleeding, 1/2 move, –4 penalty to attacks',
    '9':  'Armor damage, abdomen injured, minor bleeding, 1/2 move and –2 penalty to attacks; if no armor, victim at 0 hit points, major bleeding',
    '10': 'Abdomen injured, no move or attack, severe bleeding',
    '11': 'Abdomen injured, victim at 0 hp, severe bleeding',
    '12': 'Abdomen destroyed, victim killed',
};

CRIT_EFFECT_TABLE['Slashing']['Humanoid']['Torso'] = {
    '4':  'Torso grazed, minor bleeding',
    '5':  'Torso struck, victim stunned 1 round, reduced to 1/2 move with minor bleeding',
    '6':  'Shield damage, torso struck, 1/2 move & minor bleeding',
    '7':  'Armor damage, torso struck, 1/2 move, –2 penalty to attacks; if no armor, torso injured, no move or attack, severe bleeding',
    '8':  'Torso injured, major bleeding, 1/2 move, –4 penalty to attacks',
    '9':  'Shield damage; torso struck, –2 penalty to attacks; if no shield, torso injured, severe bleeding, no move or attack',
    '10': 'Torso injured, severe bleeding, no move or attack',
    '11': 'Torso destroyed, victim reduced to 0 hit points with severe bleeding',
    '12': 'Torso destroyed, victim killed',
};

CRIT_EFFECT_TABLE['Slashing']['Humanoid']['Arms'] = {
    '4':  'Hand struck, weapon dropped, minor bleeding; no effect on shield arm',
    '5':  'Arm struck, shield damage/weapon dropped, minor bleeding',
    '6':  'Hand injured, –2 penalty to attacks/shield dropped',
    '7':  'Armor damage, arm struck, minor bleeding; if no armor, arm injured, major bleeding',
    '8':  'Hand severed, stunned 1 round, major bleeding, shield or weapon dropped',
    '9':  'Armor damage, arm broken; if no armor, arm severed, stunned [[1d6]] rounds, major bleeding',
    '10': 'Shoulder injured, no attacks, major bleeding',
    '11': 'Arm severed, severe bleeding, 1/2 move',
    '12': 'Arm severed, no move or attacks, severe bleeding',
};

CRIT_EFFECT_TABLE['Slashing']['Humanoid']['Head'] = {
    '4':  'Head grazed, stunned [[1d3]] rounds, minor bleeding',
    '5':  'Head struck, helm removed, victim stunned 1 round; –2 penalty to attack rolls, minor bleeding if victim had no helm',
    '6':  'Head struck, minor bleeding, victim blinded for [[2d4]] rounds by blood in eyes',
    '7':  'Helm damaged, face injured, stunned [[1d6]] rounds, minor bleeding, 1/2 move, –4 penalty to attacks',
    '8':  'Skull broken, helm damaged, victim reduced to 0 hit points, major bleeding',
    '9':  'Throat injured, severe bleeding',
    '10': 'Skull destroyed, victim reduced to 0 hp, severe bleeding, Int, Wis, Cha all drop by 1/2 permanently',
    '11': 'Throat destroyed, victim killed',
    '12': 'Head severed, immediate death',
};

CRIT_EFFECT_TABLE['Slashing']['Animal']['Legs/Wings'] = {
    '4':  'Leg struck, minor bleeding',
    '5':  'Knee struck, 2/3 move, minor bleeding',
    '6':  'Leg injured, major bleeding, 2/3 move',
    '7':  'Foot/claw injured, 2/3 move, minor bleeding, –2 penalty to attacks with that limb',
    '8':  'Hip injured, major bleeding, 1/3 movement, –2 penalty to attacks; wing hit forces crash landing',
    '9':  'Leg/wing severed at midpoint, 1/3 move, major bleeding; wing hit forces uncontrolled fall',
    '10': 'Knee destroyed, major bleeding, 1/3 move, –2 penalty to all attacks',
    '11': 'Hip/shoulder destroyed, severe bleeding, no move or attack; wing hit forces crash landing',
    '12': 'Leg/wing severed at mid-thigh, no move or attack, severe bleeding',
};

CRIT_EFFECT_TABLE['Slashing']['Animal']['Tail'] = {
    '4':  'No unusual effect',
    '5':  'No unusual effect',
    '6':  'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks',
    '7':  'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks',
    '8':  'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks',
    '9':  'Tail severed near end, major bleeding, lose tail attacks, move reduced by 1/3 if creature uses tail for movement',
    '10': 'Tail severed near end, major bleeding, lose tail attacks, move reduced by 1/3 if creature uses tail for movement',
    '11': 'Tail severed, victim stunned 1–3 rounds, lose tail attacks, major bleeding, no movement or attacks if animal uses tail for movement',
    '12': 'Tail severed, stunned 1–3 rounds, major bleeding, 1/2 move and –2 penalty on any attack; if animal uses tail for movement, no move or attack',
};

CRIT_EFFECT_TABLE['Slashing']['Animal']['Abdomen'] = {
    '4':  'Abdomen grazed, minor bleeding',
    '5':  'Abdomen struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding',
    '6':  'Abdomen struck, victim stunned [[1d6]] rounds, reduced to 2/3 move, minor bleeding',
    '7':  'Abdomen injured, 1/3 move, minor bleeding, –2 penalty to all attacks',
    '8':  'Spine injured, no move, minor bleeding, –4 penalty to attacks',
    '9':  'Abdomen injured, major bleeding, 1/3 move and –2 penalty to attacks',
    '10': 'Abdomen injured, no move or attack, major bleeding',
    '11': 'Spine destroyed, no move or attack, major bleeding, victim paralyzed',
    '12': 'Abdomen destroyed, victim reduced to 0 hit points with severe bleeding',
};

CRIT_EFFECT_TABLE['Slashing']['Animal']['Torso'] = {
    '4':  'Torso grazed, minor bleeding',
    '5':  'Torso struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding',
    '6':  'Torso struck, stunned [[1d6]] rounds, minor bleeding',
    '7':  'Spine struck, major bleeding, 2/3 move, –2 penalty to attacks',
    '8':  'Torso injured, severe bleeding, no move or attack',
    '9':  'Ribs broken, major bleeding, 1/3 move, –4 penalty to attacks',
    '10': 'Ribs broken, severe bleeding, no move or attack',
    '11': 'Spine destroyed, victim reduced to 0 hit points with severe bleeding',
    '12': 'Torso destroyed, victim killed',
};

CRIT_EFFECT_TABLE['Slashing']['Animal']['Head'] = {
    '4':  'Head grazed, stunned 1 round, minor bleeding',
    '5':  'Snout struck, minor bleeding, animal must save vs. death or retreat for [[1d10]] rounds',
    '6':  'Head struck, minor bleeding, –2 penalty to attacks',
    '7':  'Throat injured, major bleeding, 2/3 move, –4 penalty to all attacks',
    '8':  'Skull broken, animal reduced to 0 hit points, major bleeding',
    '9':  'Snout/face destroyed, major bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks',
    '10': 'Head injured, reduced to 0 hp, severe bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] months',
    '11': 'Throat destroyed, severe bleeding',
    '12': 'Head severed, immediate death',
};

CRIT_EFFECT_TABLE['Slashing']['Monster']['Legs/Wings'] = {
    '4':  'Leg grazed, minor bleeding',
    '5':  'Knee struck, 2/3 move, minor bleeding',
    '6':  'Leg struck, minor bleeding, 2/3 move',
    '7':  'Foot/claw injured, 2/3 move, minor bleeding, –2 penalty to attacks with that limb',
    '8':  'Hip injured, major bleeding, 1/3 movement; wing hit forces crash landing',
    '9':  'Leg/wing severed at midpoint, 1/3 move, major bleeding; wing hit forces uncontrolled fall',
    '10': 'Knee destroyed, major bleeding, 1/3 move, –2 penalty to attacks with affected limb',
    '11': 'Hip/shoulder destroyed, major bleeding, no move, –4 penalty to attacks; wing hit forces crash landing',
    '12': 'Leg/wing severed at mid-thigh, no move or attack, severe bleeding',
};

CRIT_EFFECT_TABLE['Slashing']['Monster']['Tail'] = {
    '4':  'No unusual effect',
    '5':  'No unusual effect',
    '6':  'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks',
    '7':  'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks',
    '8':  'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks',
    '9':  'Tail severed, major bleeding, no tail attacks; if creature uses tail for movement, 1/3 move',
    '10': 'Tail severed, major bleeding, no tail attacks; if creature uses tail for movement, 1/3 move',
    '11': 'Tail severed, victim stunned 1 round, lose tail attacks, major bleeding; 1/3 movement, –4 penalty to attacks if monster uses tail for movement',
    '12': 'Tail severed, stunned 1 round, major bleeding, 1/2 move and –2 penalty on any attack; if animal uses tail for movement, no move or attack',
};

CRIT_EFFECT_TABLE['Slashing']['Monster']['Abdomen'] = {
    '4':  'Abdomen grazed, minor bleeding',
    '5':  'Abdomen struck, victim stunned 1 round, minor bleeding',
    '6':  'Abdomen struck, victim stunned [[1d3]] rounds, reduced to 2/3 move, minor bleeding',
    '7':  'Abdomen injured, 1/2 move, minor bleeding, –2 penalty to all attacks',
    '8':  'Spine injured, 1/3 move, minor bleeding, –4 penalty to all attacks',
    '9':  'Abdomen injured, major bleeding, 1/3 move and –2 penalty to attacks',
    '10': 'Abdomen injured, 1/3 move, –4 penalty to attacks, major bleeding',
    '11': 'Spine injured, no move or attack, major bleeding, victim stunned [[1d6]] rounds',
    '12': 'Abdomen destroyed, victim reduced to 0 hit points with severe bleeding',
};

CRIT_EFFECT_TABLE['Slashing']['Monster']['Torso'] = {
    '4':  'Torso grazed, minor bleeding',
    '5':  'Torso struck, victim stunned 1 round, minor bleeding',
    '6':  'Torso struck, stunned [[1d3]] rounds, minor bleeding',
    '7':  'Spine struck, minor bleeding, 2/3 move, –2 penalty to attacks',
    '8':  'Torso injured, major bleeding, 1/3 move, –4 penalty to attacks',
    '9':  'Ribs injured, major bleeding, 1/3 move, –4 penalty to attacks',
    '10': 'Ribs broken, severe bleeding, 1/3 move, no attack',
    '11': 'Spine broken, major bleeding, no move or attack',
    '12': 'Torso destroyed, victim killed',
};

CRIT_EFFECT_TABLE['Slashing']['Monster']['Head'] = {
    '4':  'Head grazed, minor bleeding',
    '5':  'Snout struck, minor bleeding, monster must save vs. death or retreat for 1 round',
    '6':  'Head struck, minor bleeding, –2 penalty to attacks',
    '7':  'Throat injured, major bleeding, 2/3 move, –2 penalty to all attacks',
    '8':  'Skull injured, monster reduced to 2/3 move, major bleeding, –2 penalty to all attacks',
    '9':  'Snout/face injured, major bleeding, 1/3 move, no bite attacks, –2 penalty to all other attacks',
    '10': 'Head injured, reduced to 0 hp, major bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] weeks',
    '11': 'Throat destroyed, severe bleeding',
    '12': 'Head severed, immediate death',
};
//#endregion
