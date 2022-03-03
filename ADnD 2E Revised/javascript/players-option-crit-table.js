const locationHumanoid = {};
locationHumanoid['1'] = locationHumanoid['2'] = { 'hitLocation': 'Right leg', 'location': 'Legs'};
locationHumanoid['3'] = locationHumanoid['4'] = { 'hitLocation': 'Left leg', 'location': 'Legs'};
locationHumanoid['5'] = { 'hitLocation': 'Abdomen', 'location': 'Abdomen'};
locationHumanoid['6'] = locationHumanoid['7'] = { 'hitLocation': 'Torso', 'location': 'Torso'};
locationHumanoid['8'] = { 'hitLocation': 'Right arm', 'location': 'Arms'};
locationHumanoid['9'] = { 'hitLocation': 'Left arm', 'location': 'Arms'};
locationHumanoid['10'] = { 'hitLocation': 'Head', 'location': 'Head'};

const locationAnimal = {};
locationAnimal['1'] = { 'hitLocation': 'Right foreleg/wing', 'location': 'Legs/Wings'};
locationAnimal['2'] = { 'hitLocation': 'Lef t foreleg/wing', 'location': 'Legs/Wings'};
locationAnimal['3'] = { 'hitLocation': 'Right hind leg', 'location': 'Legs/Wings'};
locationAnimal['4'] = { 'hitLocation': 'Left hind leg', 'location': 'Legs/Wings'};
locationAnimal['5'] = { 'hitLocation': 'Tail (for snakes or fish, 1-5 is tail hit)', 'location': 'Tail'};
locationAnimal['6'] = locationAnimal['7'] = { 'hitLocation': 'Abdomen', 'location': 'Abdomen'};
locationAnimal['8'] = locationAnimal['9'] = { 'hitLocation': 'Torso/chest', 'location': 'Torso'};
locationAnimal['10'] = { 'hitLocation': 'Head', 'location': 'Head'};

const locationMonster = {};
locationMonster['1'] = { 'hitLocation': 'Right foreleg/claw/wing', 'location': 'Legs/Wings'};
locationMonster['2'] = { 'hitLocation': 'Left foreleg/claw/wing', 'location': 'Legs/Wings'};
locationMonster['3'] = { 'hitLocation': 'Right hind leg', 'location': 'Legs/Wings'};
locationMonster['4'] = { 'hitLocation': 'Left hind leg', 'location': 'Legs/Wings'};
locationMonster['5'] = { 'hitLocation': 'Tail (for snakelike or fishlike monsters, 1-5 is tail hit)', 'location': 'Tail'};
locationMonster['6'] = locationMonster['7'] = { 'hitLocation': 'Abdomen', 'location': 'Abdomen'};
locationMonster['6'] = locationMonster['7'] = { 'hitLocation': 'Torso/chest', 'location': 'Torso'};
locationMonster['10'] = { 'hitLocation': 'Head', 'location': 'Head'};

const LOCATION_TABLE = {};
LOCATION_TABLE['Humanoid'] = locationHumanoid;
LOCATION_TABLE['Animal'] = locationAnimal;
LOCATION_TABLE['Monster'] = locationMonster;

//#region Bludgeoning
const bludgeoningHumanoid = {};
bludgeoningHumanoid['Legs']['4']  = 'Victim knocked down';
bludgeoningHumanoid['Legs']['5']  = 'Knee struck, knockdown, 1/2 move';
bludgeoningHumanoid['Legs']['6']  = 'Foot broken, 1/2 move';
bludgeoningHumanoid['Legs']['7']  = 'Armor damaged, leg injured if target has no armor to cover legs, 1/4 move';
bludgeoningHumanoid['Legs']['8']  = 'Hip broken, minor bleeding, no move';
bludgeoningHumanoid['Legs']['9']  = 'Armor damaged, leg broken if target has no armor to cover legs, no move';
bludgeoningHumanoid['Legs']['10'] = 'Knee shattered, no move, -2 penalty to attacks';
bludgeoningHumanoid['Legs']['11'] = 'Hip shattered, minor bleeding, no move or attack';
bludgeoningHumanoid['Legs']['12'] = 'Leg shattered, no move or attack, major bleeding from compound fractures';

bludgeoningHumanoid['Abdomen']['4']  = 'Victim stunned [[1d6]] rounds';
bludgeoningHumanoid['Abdomen']['5']  = 'Abdomen struck, victim stunned 1 round and reduced to 1/2 move';
bludgeoningHumanoid['Abdomen']['6']  = 'Armor damaged, victim stunned [[1d6]] rounds, triple damage if no armor';
bludgeoningHumanoid['Abdomen']['7']  = 'Abdomen injured, 1/2 move, -2 penalty to attacks';
bludgeoningHumanoid['Abdomen']['8']  = 'Abdomen injured, minor internal bleeding, 1/2 move and -2 penalty to attacks';
bludgeoningHumanoid['Abdomen']['9']  = 'Armor damage, abdomen injured, minor bleeding, 1/2 move and -2 penalty to attacks';
bludgeoningHumanoid['Abdomen']['10'] = 'Abdomen injured, no move or attack, minor internal bleeding';
bludgeoningHumanoid['Abdomen']['11'] = 'Abdomen crushed, no move or attack, major internal bleeding';
bludgeoningHumanoid['Abdomen']['12'] = 'Abdomen crushed, victim reduced to 0 hit points with severe internal bleeding';

bludgeoningHumanoid['Torso']['4']  = 'Knockdown, stunned [[1d4]] rounds';
bludgeoningHumanoid['Torso']['5']  = 'Torso struck, victim stunned 1 round and reduced to 1/2 move';
bludgeoningHumanoid['Torso']['6']  = 'Shield damage, torso struck, 1/2 move';
bludgeoningHumanoid['Torso']['7']  = 'Armor damage, torso struck, 1/2 move, -2 penalty to attacks';
bludgeoningHumanoid['Torso']['8']  = 'Torso injured, minor internal bleeding, no move or attack';
bludgeoningHumanoid['Torso']['9']  = 'Ribs broken, minor internal bleeding, 1/2 move, -2 penalty to attacks';
bludgeoningHumanoid['Torso']['10'] = 'Ribs broken, major internal bleeding, no move or attack';
bludgeoningHumanoid['Torso']['11'] = 'Torso crushed, victim reduced to 0 hit points with severe internal bleeding';
bludgeoningHumanoid['Torso']['12'] = 'Torso crushed, victim killed';

bludgeoningHumanoid['Arms']['4']  = 'Hand struck, weapon/shield dropped';
bludgeoningHumanoid['Arms']['5']  = 'Arm struck, shield damage/weapon dropped';
bludgeoningHumanoid['Arms']['6']  = 'Hand broken, -2 penalty to attacks/shield dropped';
bludgeoningHumanoid['Arms']['7']  = 'Armor damage, arm broken if victim has no armor to cover limb';
bludgeoningHumanoid['Arms']['8']  = 'Shield damage, arm broken, stunned 1 round';
bludgeoningHumanoid['Arms']['9']  = 'Weapon dropped, arm broken, stunned [[1d4]] rounds';
bludgeoningHumanoid['Arms']['10'] = 'Shoulder injured, no attacks, minor bleeding';
bludgeoningHumanoid['Arms']['11'] = 'Arm shattered, 1/2 move, no attacks, minor bleeding';
bludgeoningHumanoid['Arms']['12'] = 'Shoulder shattered, no move or attacks, major bleeding';

bludgeoningHumanoid['Head']['4']  = 'Victim stunned [[1d6]] rounds';
bludgeoningHumanoid['Head']['5']  = 'Head struck, helm removed, victim stunned 1 round; -2 penalty to attack rolls if victim had no helm';
bludgeoningHumanoid['Head']['6']  = 'Head struck, -2 penalty to attacks';
bludgeoningHumanoid['Head']['7']  = 'Helm damaged, face injured, stunned [[1d6]] rounds, 1/2 move, -4 penalty to attacks';
bludgeoningHumanoid['Head']['8']  = 'Skull broken, helm damaged, victim reduced to 0 hit points and unconscious [[1d4]] hours';
bludgeoningHumanoid['Head']['9']  = 'Face crushed, minor bleeding, no move or attack, Charisma drops by 2 points permanently';
bludgeoningHumanoid['Head']['10'] = 'Head injured, unconscious [[1d6]] days, lose 1 point each of Intelligence/Wisdom/Charisma permanently';
bludgeoningHumanoid['Head']['11'] = 'Skull crushed, reduced to 0 hit points, major bleeding, Intelligence, Wisdom, Charisma all drop by 1/2 permanently';
bludgeoningHumanoid['Head']['12'] = 'Skull crushed, immediate death';

const bludgeoningAnimal = {};
bludgeoningAnimal['Legs/Wings']['4']  = 'Victim knocked down';
bludgeoningAnimal['Legs/Wings']['5']  = 'Knee struck, victim reduced to 2/3 move';
bludgeoningAnimal['Legs/Wings']['6']  = 'Foot/wrist broken, 2/3 move';
bludgeoningAnimal['Legs/Wings']['7']  = 'Leg injured, 2/3 move, -2 penalty to attacks';
bludgeoningAnimal['Legs/Wings']['8']  = 'Hip broken, minor bleeding, no movement, -2 penalty to attacks; wing hit forces crash landing';
bludgeoningAnimal['Legs/Wings']['9']  = 'Leg broken, 2/3 move, minor bleeding; wing hit forces immediate landing';
bludgeoningAnimal['Legs/Wings']['10'] = 'Knee shattered, 1/3 move, -2 penalty to attacks';
bludgeoningAnimal['Legs/Wings']['11'] = 'Hip/shoulder shattered, minor bleeding, no move or attack; wing hit forces crash landing';
bludgeoningAnimal['Legs/Wings']['12'] = 'Leg/wing shattered, no move or attack, major bleeding from compound fractures';

bludgeoningAnimal['Tail']['4']  = 'No unusual effect';
bludgeoningAnimal['Tail']['5']  = 'No unusual effect';
bludgeoningAnimal['Tail']['6']  = 'Tip of tail struck; if prehensile, any items car- ried are dropped, -2 penalty to tail attacks due to pain';
bludgeoningAnimal['Tail']['7']  = 'Tail injured, normal animals must save vs. death or retreat in pain; lose any tail attacks';
bludgeoningAnimal['Tail']['8']  = 'Tail injured, normal animals must save vs. death or retreat in pain; lose any tail attacks';
bludgeoningAnimal['Tail']['9']  = 'Tail broken, lose any tail attacks, 1/2 move if animal uses tail for movement';
bludgeoningAnimal['Tail']['10'] = 'Tail broken, lose any tail attacks, 1/2 move if animal uses tail for movement';
bludgeoningAnimal['Tail']['11'] = 'Tail crushed, victim stunned [[1d3]] rounds, lose any tail attacks, no movement or attacks if animal uses tail for movement';
bludgeoningAnimal['Tail']['12'] = 'Tail crushed, pain reduces creature to 1/2 move and -2 penalty on any attack, minor bleeding; no move or attack if animal uses tail for movement';

bludgeoningAnimal['Abdomen']['4']  = 'Victim stunned [[1d6]] rounds';
bludgeoningAnimal['Abdomen']['5']  = 'Abdomen struck, victim stunned 1 round and reduced to 1/2 move';
bludgeoningAnimal['Abdomen']['6']  = 'Abdomen struck, victim stunned [[1d6]] rounds, reduced to 1/2 move';
bludgeoningAnimal['Abdomen']['7']  = 'Abdomen injured, 1/2 move, -2 penalty to attacks';
bludgeoningAnimal['Abdomen']['8']  = 'Spine broken, no move, -4 penalty to attacks';
bludgeoningAnimal['Abdomen']['9']  = 'Abdomen injured, minor bleeding, 1/2 move and -2 penalty to attacks';
bludgeoningAnimal['Abdomen']['10'] = 'Abdomen injured, no move or attack, minor internal bleeding';
bludgeoningAnimal['Abdomen']['11'] = 'Spine crushed, no move or attack, major internal bleeding';
bludgeoningAnimal['Abdomen']['12'] = 'Abdomen crushed, victim reduced to 0 hit points with severe internal bleeding';

bludgeoningAnimal['Torso']['4']  = 'Knockdown, stunned [[1d4]] rounds';
bludgeoningAnimal['Torso']['5']  = 'Torso struck, victim stunned 1 round and reduced to 1/2 move';
bludgeoningAnimal['Torso']['6']  = 'Torso struck, stunned [[1d6]] rounds, 1/2 move';
bludgeoningAnimal['Torso']['7']  = 'Spine struck, 1/2 move, -2 penalty to attacks';
bludgeoningAnimal['Torso']['8']  = 'Torso injured, minor internal bleeding, no move or attack';
bludgeoningAnimal['Torso']['9']  = 'Ribs broken, minor internal bleeding, 1/2 move, -2 penalty to attacks';
bludgeoningAnimal['Torso']['10'] = 'Ribs broken, major internal bleeding, no move or attack';
bludgeoningAnimal['Torso']['11'] = 'Spine crushed, victim reduced to 0 hit points with severe internal bleeding';
bludgeoningAnimal['Torso']['12'] = 'Torso crushed, victim killed';

bludgeoningAnimal['Head']['4']  = 'Victim stunned [[1d6]] rounds';
bludgeoningAnimal['Head']['5']  = 'Snout struck, animal must save vs. death or retreat in pain for [[1d10]] rounds';
bludgeoningAnimal['Head']['6']  = 'Head struck, –2 penalty to attacks';
bludgeoningAnimal['Head']['7']  = 'Jaw injured, stunned [[1d6]] rounds, 2/3 move, –4 penalty to all attacks';
bludgeoningAnimal['Head']['8']  = 'Skull broken, animal reduced to 0 hit points and unconscious [[1d4]] hours';
bludgeoningAnimal['Head']['9']  = 'Snout/face crushed, minor bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks';
bludgeoningAnimal['Head']['10'] = 'Head injured, unconscious [[2d4]] hours, reduced to 1/2 move and –4 penalty to all attacks for [[1d3]] months';
bludgeoningAnimal['Head']['11'] = 'Skull crushed, reduced to 0 hit points, major bleeding, Intelligence, Wisdom, Charisma all drop by 1/2 permanently';
bludgeoningAnimal['Head']['12'] = 'Skull crushed, immediate death';

const bludgeoningMonster = {};
bludgeoningMonster['Legs/Wings']['4']  = 'Victim knocked down';
bludgeoningMonster['Legs/Wings']['5']  = 'Knee struck, victim reduced to 2/3 move, –2 penalty to attacks with tha appendage';
bludgeoningMonster['Legs/Wings']['6']  = 'Foot/wrist broken, 2/3 move, –4 penalty to attacks with that appendage';
bludgeoningMonster['Legs/Wings']['7']  = 'Limb injured, 2/3 move, –2 penalty to all attacks';
bludgeoningMonster['Legs/Wings']['8']  = 'Hip broken, minor bleeding, 1/3 move, no attacks with limb; wing hit forces crash landing';
bludgeoningMonster['Legs/Wings']['9']  = 'Limb broken, 2/3 move, minor bleeding; wing hit forces immediate landing';
bludgeoningMonster['Legs/Wings']['10'] = 'Knee shattered, 1/3 move, –2 penalty to all attacks';
bludgeoningMonster['Legs/Wings']['11'] = 'Hip/shoulder shattered, minor bleeding, 1/3 move, –4 penalty to all attacks; wing hit forces crash';
bludgeoningMonster['Legs/Wings']['12'] = 'Leg/wing shattered, no move, –4 penalty to all attacks, major bleeding from compound fractures';

bludgeoningMonster['Tail']['4']  = 'No unusual effect';
bludgeoningMonster['Tail']['5']  = 'No unusual effect';
bludgeoningMonster['Tail']['6']  = 'Tip of tail struck; if prehensile, any items carried are dropped, –2 penalty to tail attacks due to pain';
bludgeoningMonster['Tail']['7']  = 'Tail injured, lose any tail attacks';
bludgeoningMonster['Tail']['8']  = 'Tail injured, lose any tail attacks';
bludgeoningMonster['Tail']['9']  = 'Tail broken, lose any tail attacks, if creature uses tail for movement reduced to 1/2 move';
bludgeoningMonster['Tail']['10'] = 'Tail broken, lose any tail attacks, if creature uses tail for movement reduced to 1/2 move';
bludgeoningMonster['Tail']['11'] = 'Tail crushed, victim stunned [[1d3]] rounds, lose any tail attacks, no movement if monster uses tail for movement and –4 penalty to all attacks';
bludgeoningMonster['Tail']['12'] = 'Tail crushed, pain reduces creature to 1/2 move and –2 penalty on any attack, minor bleeding; if animal uses tail for movement, no move or attack';

bludgeoningMonster['Abdomen']['4']  = 'Victim stunned [[1d4]] rounds';
bludgeoningMonster['Abdomen']['5']  = 'Abdomen struck, victim stunned 1 round and reduced to 2/3 move';
bludgeoningMonster['Abdomen']['6']  = 'Abdomen struck, victim stunned [[1d6]] rounds, reduced to 2/3 move';
bludgeoningMonster['Abdomen']['7']  = 'Abdomen injured, 1/2 move, –2 penalty to attacks';
bludgeoningMonster['Abdomen']['8']  = 'Spine injured, 1/3 move, –4 penalty to attacks';
bludgeoningMonster['Abdomen']['9']  = 'Abdomen injured, victim stunned [[1d3]] rounds, minor bleeding, 1/3 move and –2 penalty to attacks';
bludgeoningMonster['Abdomen']['10'] = 'Abdomen injured, no move or attack, minor internal bleeding';
bludgeoningMonster['Abdomen']['11'] = 'Spine crushed, no move or attack, major internal bleeding';
bludgeoningMonster['Abdomen']['12'] = 'Abdomen crushed, victim reduced to 0 hit points with severe internal bleeding';

bludgeoningMonster['Torso']['4']  = 'Knockdown, stunned [[1d4]] rounds';
bludgeoningMonster['Torso']['5']  = 'Torso struck, victim stunned 1 round and reduced to 2/3 move';
bludgeoningMonster['Torso']['6']  = 'Torso struck, stunned [[1d6]] rounds, 2/3 move';
bludgeoningMonster['Torso']['7']  = 'Spine struck, 1/2 move, –2 penalty to attacks';
bludgeoningMonster['Torso']['8']  = 'Torso injured, minor internal bleeding, 1/3 move, –4 penalty to all attacks';
bludgeoningMonster['Torso']['9']  = 'Ribs broken, minor internal bleeding, 1/2 move, –2 penalty to attacks';
bludgeoningMonster['Torso']['10'] = 'Ribs broken, major internal bleeding, no move or attack';
bludgeoningMonster['Torso']['11'] = 'Spine crushed, victim reduced to 0 hit points with severe internal bleeding';
bludgeoningMonster['Torso']['12'] = 'Torso crushed, victim killed';

bludgeoningMonster['Head']['4']  = 'Victim stunned [[1d4]] rounds';
bludgeoningMonster['Head']['5']  = 'Jaw struck, –2 penalty to any bite attacks';
bludgeoningMonster['Head']['6']  = 'Head struck, stunned 1 round, –2 penalty to attacks';
bludgeoningMonster['Head']['7']  = 'Jaw injured, stunned [[1d4]] rounds, 2/3 move, no bite attacks';
bludgeoningMonster['Head']['8']  = 'Skull broken, monster reduced to 1/4 normal hit points and unconscious [[2d10]] turns';
bludgeoningMonster['Head']['9']  = 'Snout/face crushed, minor bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks';
bludgeoningMonster['Head']['10'] = 'Head injured, unconscious [[1d10]] turns, reduced to 1/2 move and –4 penalty to all attacks for [[3d6]] days';
bludgeoningMonster['Head']['11'] = 'Skull crushed, reduced to 0 hit points, major bleeding, Int, Wis, Cha all drop by 1/2 permanently';
bludgeoningMonster['Head']['12'] = 'Skull crushed, immediate death';

const bludgeoningCrit = {};
bludgeoningCrit['Humanoid'] = bludgeoningHumanoid;
bludgeoningCrit['Animal'] = bludgeoningAnimal;
bludgeoningCrit['Monster'] = bludgeoningMonster;
//#endregion

//#region Piercing
const piercingHumanoid = {};
piercingHumanoid['Legs']['4']  = 'Leg grazed, victim knocked down';
piercingHumanoid['Legs']['5']  = 'Leg struck, minor bleeding';
piercingHumanoid['Legs']['6']  = 'Leg injured, minor bleeding, 2/3 move';
piercingHumanoid['Legs']['7']  = 'Armor damaged; leg injured if target has no leg armor, 1/2 move, major bleeding';
piercingHumanoid['Legs']['8']  = 'Knee broken, minor bleeding, 1/3 move, –4 penalty to any attacks';
piercingHumanoid['Legs']['9']  = 'Armor damaged, leg struck, minor bleeding, 2/3 move; if target has no leg armor, leg broken, major bleeding, 1/3 move, –4 penalty to attacks';
piercingHumanoid['Legs']['10'] = 'Hip broken, no move or attack, major bleeding';
piercingHumanoid['Legs']['11'] = 'Leg broken, severe bleeding, no move or attack';
piercingHumanoid['Legs']['12'] = 'Leg destroyed, no move or attack, severe bleeding';

piercingHumanoid['Abdomen']['4']  = 'Abdomen grazed, minor bleeding';
piercingHumanoid['Abdomen']['5']  = 'Abdomen struck, victim stunned 1 round and reduced to 2/3 move with minor bleeding';
piercingHumanoid['Abdomen']['6']  = 'Armor damaged; victim stunned [[1d4]] rounds, minor bleeding, 2/3 move if no armor';
piercingHumanoid['Abdomen']['7']  = 'Abdomen injured, major bleeding, 1/2 move, –2 penalty to attacks';
piercingHumanoid['Abdomen']['8']  = 'Abdomen injured, severe bleeding, 1/2 move, –4 penalty to attacks';
piercingHumanoid['Abdomen']['9']  = 'Armor damage, abdomen injured, minor bleeding, 1/2 move and –2 penalty to attacks; if no armor, victim at 0 hit points, major bleeding';
piercingHumanoid['Abdomen']['10'] = 'Abdomen injured, 1/3 move, no attack, severe bleeding';
piercingHumanoid['Abdomen']['11'] = 'Abdomen injured, victim at 0 hp, severe bleeding';
piercingHumanoid['Abdomen']['12'] = 'Abdomen destroyed, victim killed';

piercingHumanoid['Torso']['4']  = 'Torso grazed, minor bleeding';
piercingHumanoid['Torso']['5']  = 'Torso struck, 2/3 move with minor bleeding';
piercingHumanoid['Torso']['6']  = 'Shield damage, torso struck, 2/3 move & minor bleeding';
piercingHumanoid['Torso']['7']  = 'Armor damage, torso struck, 2/3 move, –2 penalty to attacks; if no armor, torso injured, no move or attack, severe bleeding';
piercingHumanoid['Torso']['8']  = 'Torso injured, major bleeding, 1/2 move, –4 penalty to attacks';
piercingHumanoid['Torso']['9']  = 'Shield damage; torso struck, –2 penalty to attacks; if no shield, ribs broken, severe bleeding, no move or attack';
piercingHumanoid['Torso']['10'] = 'Ribs broken, severe bleeding, no move or attack';
piercingHumanoid['Torso']['11'] = 'Torso destroyed, victim reduced to 0 hit points with severe bleeding';
piercingHumanoid['Torso']['12'] = 'Torso destroyed, victim killed';

piercingHumanoid['Arms']['4']  = 'Hand struck, weapon dropped, minor bleeding; no effect on shield arm';
piercingHumanoid['Arms']['5']  = 'Arm struck, shield damage/weapon dropped, minor bleeding';
piercingHumanoid['Arms']['6']  = 'Hand injured, –2 penalty to attacks/shield dropped';
piercingHumanoid['Arms']['7']  = 'Armor damage, arm struck, minor bleeding; if no armor, arm injured, minor bleeding';
piercingHumanoid['Arms']['8']  = 'Arm broken, victim stunned 1 round, minor bleeding, shield or weapon dropped';
piercingHumanoid['Arms']['9']  = 'Armor damage, arm injured, –2 penalty to attacks or shield dropped; if no armor, arm broken, stunned [[1d6]] rounds, major bleeding';
piercingHumanoid['Arms']['10'] = 'Shoulder injured, no attacks, major bleeding';
piercingHumanoid['Arms']['11'] = 'Arm destroyed, major bleeding, 2/3 move';
piercingHumanoid['Arms']['12'] = 'Arm destroyed, no move/attack, major bleeding';

piercingHumanoid['Head']['4']  = 'Head grazed, stunned [[1d3]] rounds, minor bleeding';
piercingHumanoid['Head']['5']  = 'Head struck, helm removed, victim stunned 1 round; –2 penalty to attack rolls, minor bleeding if victim had no helm';
piercingHumanoid['Head']['6']  = 'Eye injured, –4 penalty to all attacks; if helmed, victim is only stunned 1 round instead';
piercingHumanoid['Head']['7']  = 'Helm damaged, face injured, stunned [[1d6]] rounds, minor bleeding, 2/3 move, –4 penalty to attacks';
piercingHumanoid['Head']['8']  = 'Skull broken, helm damaged, victim reduced to 0 hit points, major bleeding';
piercingHumanoid['Head']['9']  = 'Throat injured, severe bleeding';
piercingHumanoid['Head']['10'] = 'Skull broken, victim reduced to 0 hp, major bleeding, Int, Wis, Cha all drop by 1/2 permanently';
piercingHumanoid['Head']['11'] = 'Throat destroyed, victim killed';
piercingHumanoid['Head']['12'] = 'Head destroyed, immediate death';

const piercingAnimal = {};
piercingAnimal['Legs/Wings']['4']  = 'Leg struck, minor bleeding';
piercingAnimal['Legs/Wings']['5']  = 'Knee struck, 2/3 move, minor bleeding';
piercingAnimal['Legs/Wings']['6']  = 'Leg injured, minor bleeding, 2/3 move';
piercingAnimal['Legs/Wings']['7']  = 'Foot/claw injured, minor bleeding, –2 penalty to attacks with that limb';
piercingAnimal['Legs/Wings']['8']  = 'Hip injured, minor bleeding, 2/3 movement, –2 penalty to all attacks; wing hit forces crash landing';
piercingAnimal['Legs/Wings']['9']  = 'Leg/wing broken, 1/3 move, minor bleeding; wing hit forces crash landing';
piercingAnimal['Legs/Wings']['10'] = 'Knee broken, minor bleeding, 1/3 move, –2 penalty to all attacks';
piercingAnimal['Legs/Wings']['11'] = 'Hip/shoulder destroyed, major bleeding, no move or attack; wing hit forces crash landing';
piercingAnimal['Legs/Wings']['12'] = 'Leg/wing destroyed, no move or attack, major bleeding';

piercingAnimal['Tail']['4']  = 'No unusual effect';
piercingAnimal['Tail']['5']  = 'No unusual effect';
piercingAnimal['Tail']['6']  = 'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks';
piercingAnimal['Tail']['7']  = 'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks';
piercingAnimal['Tail']['8']  = 'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks';
piercingAnimal['Tail']['9']  = 'Tail injured, minor bleeding, lose tail attacks; if creature uses tail for movement, 1/3 move';
piercingAnimal['Tail']['10'] = 'Tail injured, minor bleeding, lose tail attacks; if creature uses tail for movement, 1/3 move';
piercingAnimal['Tail']['11'] = 'Tail destroyed, victim stunned [[1d3]] rounds, lose tail attacks, major bleeding, no movement or attacks if animal uses tail for movement';
piercingAnimal['Tail']['12'] = 'Tail destroyed, stunned [[1d2]] rounds, major bleeding, 1/2 move and –2 penalty on attacks; if animal uses tail for movement, no move or attack';

piercingAnimal['Abdomen']['4']  = 'Abdomen grazed, minor bleeding';
piercingAnimal['Abdomen']['5']  = 'Abdomen struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding';
piercingAnimal['Abdomen']['6']  = 'Abdomen struck, victim stunned [[1d4]] rounds, reduced to 2/3 move, minor bleeding';
piercingAnimal['Abdomen']['7']  = 'Abdomen injured, 2/3 move, major bleeding, –2 penalty to all attacks';
piercingAnimal['Abdomen']['8']  = 'Spine injured, 1/3 move, minor bleeding, –4 penalty to all attacks';
piercingAnimal['Abdomen']['9']  = 'Abdomen injured, major bleeding, 1/3 move and –2 penalty to all attacks';
piercingAnimal['Abdomen']['10'] = 'Abdomen injured, no move or attack, major bleeding';
piercingAnimal['Abdomen']['11'] = 'Spine broken, no move or attack, major bleeding, victim paralyzed';
piercingAnimal['Abdomen']['12'] = 'Abdomen destroyed, victim reduced to 0 hit points with severe bleeding';

piercingAnimal['Torso']['4']  = 'Torso grazed, minor bleeding';
piercingAnimal['Torso']['5']  = 'Torso struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding';
piercingAnimal['Torso']['6']  = 'Torso struck, stunned [[1d4]] rounds, minor bleeding';
piercingAnimal['Torso']['7']  = 'Spine struck, minor bleeding, 2/3 move, –2 penalty to attacks';
piercingAnimal['Torso']['8']  = 'Torso injured, stunned 1 round, major bleeding';
piercingAnimal['Torso']['9']  = 'Ribs broken, minor bleeding, 1/3 move, –4 penalty to attacks';
piercingAnimal['Torso']['10'] = 'Ribs broken, major bleeding, no move or attack';
piercingAnimal['Torso']['11'] = 'Spine destroyed, victim reduced to 0 hit points with major bleeding';
piercingAnimal['Torso']['12'] = 'Torso destroyed, victim killed';

piercingAnimal['Head']['4']  = 'Head grazed, stunned 1 round, minor bleeding';
piercingAnimal['Head']['5']  = 'Snout struck, minor bleeding, animal must save vs. death or retreat for [[1d10]] rounds';
piercingAnimal['Head']['6']  = 'Eye injured, stunned [[1d3]] rounds, –2 penalty to attacks';
piercingAnimal['Head']['7']  = 'Throat injured, major bleeding, 2/3 move, –4 penalty to all attacks';
piercingAnimal['Head']['8']  = 'Skull broken, animal reduced to 0 hit points, major bleeding';
piercingAnimal['Head']['9']  = 'Snout/face destroyed, minor bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks';
piercingAnimal['Head']['10'] = 'Head injured, reduced to 0 hp, major bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] months';
piercingAnimal['Head']['11'] = 'Throat destroyed, severe bleeding';
piercingAnimal['Head']['12'] = 'Head severed, immediate death';

const piercingMonster = {};
piercingMonster['Legs/Wings']['4']  = 'Leg grazed, minor bleeding';
piercingMonster['Legs/Wings']['5']  = 'Knee struck, 2/3 move';
piercingMonster['Legs/Wings']['6']  = 'Leg struck, minor bleeding, 2/3 move';
piercingMonster['Legs/Wings']['7']  = 'Foot/claw injured, minor bleeding, –2 penalty to attacks with that limb';
piercingMonster['Legs/Wings']['8']  = 'Hip injured, minor bleeding, 1/3 movement; wing hit forces crash landing';
piercingMonster['Legs/Wings']['9']  = 'Leg/wing broken, 1/3 move, minor bleeding; wing hit forces crash landing';
piercingMonster['Legs/Wings']['10'] = 'Knee destroyed, major bleeding, 1/3 move, –2 penalty to attacks with affected limb';
piercingMonster['Legs/Wings']['11'] = 'Hip/shoulder destroyed, major bleeding, no move, –4 penalty to attacks; wing hit forces crash landing';
piercingMonster['Legs/Wings']['12'] = 'Leg/wing destroyed, no move or attack, major bleeding';

piercingMonster['Tail']['4']  = 'No unusual effect';
piercingMonster['Tail']['5']  = 'No unusual effect';
piercingMonster['Tail']['6']  = 'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks';
piercingMonster['Tail']['7']  = 'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks';
piercingMonster['Tail']['8']  = 'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks';
piercingMonster['Tail']['9']  = 'Tail broken, minor bleeding, no tail attacks; if creature uses tail for movement, 1/3 move';
piercingMonster['Tail']['10'] = 'Tail broken, minor bleeding, no tail attacks; if creature uses tail for movement, 1/3 move';
piercingMonster['Tail']['11'] = 'Tail destroyed, victim stunned 1 round, lose tail attacks, major bleeding; 1/3 movement, –4 penalty to attacks if monster uses tail for movement';
piercingMonster['Tail']['12'] = 'Tail destroyed, stunned [[1d3]] rounds, major bleeding, 1/2 move and –2 penalty on any attack; if monster uses tail for movement, no move/attack';

piercingMonster['Abdomen']['4']  = 'Abdomen grazed, minor bleeding';
piercingMonster['Abdomen']['5']  = 'Abdomen struck, victim stunned 1 round, minor bleeding';
piercingMonster['Abdomen']['6']  = 'Abdomen struck, victim stunned [[1d3]] rounds, minor bleeding';
piercingMonster['Abdomen']['7']  = 'Abdomen injured, 2/3 move, minor bleeding, –2 penalty to all attacks';
piercingMonster['Abdomen']['8']  = 'Spine injured, 1/2 move, minor bleeding, –4 penalty to all attacks';
piercingMonster['Abdomen']['9']  = 'Abdomen injured, major bleeding, 1/3 move and –2 penalty to attacks';
piercingMonster['Abdomen']['10'] = 'Abdomen injured, 1/3 move, –4 penalty to attacks, major bleeding';
piercingMonster['Abdomen']['11'] = 'Spine injured, no move or attack, major bleeding, victim stunned [[1d6]] rounds';
piercingMonster['Abdomen']['12'] = 'Abdomen destroyed, victim reduced to 0 hit points with major bleeding';

piercingMonster['Torso']['4']  = 'Torso grazed, minor bleeding';
piercingMonster['Torso']['5']  = 'Torso struck, victim stunned 1 round, minor bleeding';
piercingMonster['Torso']['6']  = 'Torso struck, stunned [[1d3]] rounds, minor bleeding';
piercingMonster['Torso']['7']  = 'Spine struck, minor bleeding, 2/3 move, –2 penalty to attacks';
piercingMonster['Torso']['8']  = 'Torso injured, minor bleeding, 1/3 move, –4 penalty to attacks';
piercingMonster['Torso']['9']  = 'Ribs injured, major bleeding, 1/3 move, –4 penalty to attacks';
piercingMonster['Torso']['10'] = 'Ribs broken, major bleeding, 1/3 move, no attack';
piercingMonster['Torso']['11'] = 'Spine broken, major bleeding, no move or attack';
piercingMonster['Torso']['12'] = 'Torso destroyed, victim killed';

piercingMonster['Head']['4']  = 'Head grazed, minor bleeding';
piercingMonster['Head']['5']  = 'Snout struck, minor bleeding, monster must save vs. death or retreat for 1 round';
piercingMonster['Head']['6']  = 'Eye injured, stunned 1 round, –2 penalty to attacks';
piercingMonster['Head']['7']  = 'Throat injured, major bleeding, 2/3 move, –2 penalty to all attacks';
piercingMonster['Head']['8']  = 'Skull injured, monster reduced to 2/3 move, major bleeding, –2 penalty to all attacks';
piercingMonster['Head']['9']  = 'Snout/face injured, major bleeding, 1/3 move, no bite attacks, –2 penalty to all other attacks';
piercingMonster['Head']['10'] = 'Head injured, reduced to 0 hp, major bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] weeks';
piercingMonster['Head']['11'] = 'Throat destroyed, severe bleeding';
piercingMonster['Head']['12'] = 'Head destroyed, immediate death';

const piercingCrit = {};
piercingCrit['Humanoid'] = piercingHumanoid;
piercingCrit['Animal'] = piercingAnimal;
piercingCrit['Monster'] = piercingMonster;
//#endregion

//#region Slashing
const slashingHumanoid = {};
slashingHumanoid['Legs']['4']  = 'Leg struck, minor bleeding';
slashingHumanoid['Legs']['5']  = 'Leg struck, minor bleeding; 1/2 move';
slashingHumanoid['Legs']['6']  = 'Leg injured, major bleeding, 1/2 move';
slashingHumanoid['Legs']['7']  = 'Armor damaged; leg injured if target has no leg armor, 1/2 move, major bleeding';
slashingHumanoid['Legs']['8']  = 'Knee shattered, major bleeding, no move, –4 penalty to any attacks';
slashingHumanoid['Legs']['9']  = 'Armor damaged, leg struck, minor bleeding, 1/2 move; if target has no leg armor, leg severed at knee, severe bleeding, no move or attack';
slashingHumanoid['Legs']['10'] = 'Hip shattered, no move or attack, severe bleeding';
slashingHumanoid['Legs']['11'] = 'Leg severed, severe bleeding, no move or attack';
slashingHumanoid['Legs']['12'] = 'Leg severed at thigh, no move or attack, victim reduced to 0 hit points with severe bleeding';

slashingHumanoid['Abdomen']['4']  = 'Abdomen grazed, minor bleeding';
slashingHumanoid['Abdomen']['5']  = 'Abdomen struck, victim stunned 1 round and reduced to 1/2 move with minor bleeding';
slashingHumanoid['Abdomen']['6']  = 'Armor damaged; victim stunned [[1d6]] rounds, major bleeding, 1/2 move if no armor';
slashingHumanoid['Abdomen']['7']  = 'Abdomen injured, major bleeding, 1/2 move, –2 penalty to attacks';
slashingHumanoid['Abdomen']['8']  = 'Abdomen injured, severe bleeding, 1/2 move, –4 penalty to attacks';
slashingHumanoid['Abdomen']['9']  = 'Armor damage, abdomen injured, minor bleeding, 1/2 move and –2 penalty to attacks; if no armor, victim at 0 hit points, major bleeding';
slashingHumanoid['Abdomen']['10'] = 'Abdomen injured, no move or attack, severe bleeding';
slashingHumanoid['Abdomen']['11'] = 'Abdomen injured, victim at 0 hp, severe bleeding';
slashingHumanoid['Abdomen']['12'] = 'Abdomen destroyed, victim killed';

slashingHumanoid['Torso']['4']  = 'Torso grazed, minor bleeding';
slashingHumanoid['Torso']['5']  = 'Torso struck, victim stunned 1 round, reduced to 1/2 move with minor bleeding';
slashingHumanoid['Torso']['6']  = 'Shield damage, torso struck, 1/2 move & minor bleeding';
slashingHumanoid['Torso']['7']  = 'Armor damage, torso struck, 1/2 move, –2 penalty to attacks; if no armor, torso injured, no move or attack, severe bleeding';
slashingHumanoid['Torso']['8']  = 'Torso injured, major bleeding, 1/2 move, –4 penalty to attacks';
slashingHumanoid['Torso']['9']  = 'Shield damage; torso struck, –2 penalty to attacks; if no shield, torso injured, severe bleeding, no move or attack';
slashingHumanoid['Torso']['10'] = 'Torso injured, severe bleeding, no move or attack';
slashingHumanoid['Torso']['11'] = 'Torso destroyed, victim reduced to 0 hit points with severe bleeding';
slashingHumanoid['Torso']['12'] = 'Torso destroyed, victim killed';

slashingHumanoid['Arms']['4']  = 'Hand struck, weapon dropped, minor bleeding; no effect on shield arm';
slashingHumanoid['Arms']['5']  = 'Arm struck, shield damage/weapon dropped, minor bleeding';
slashingHumanoid['Arms']['6']  = 'Hand injured, –2 penalty to attacks/shield dropped';
slashingHumanoid['Arms']['7']  = 'Armor damage, arm struck, minor bleeding; if no armor, arm injured, major bleeding';
slashingHumanoid['Arms']['8']  = 'Hand severed, stunned 1 round, major bleeding, shield or weapon dropped';
slashingHumanoid['Arms']['9']  = 'Armor damage, arm broken; if no armor, arm severed, stunned [[1d6]] rounds, major bleeding';
slashingHumanoid['Arms']['10'] = 'Shoulder injured, no attacks, major bleeding';
slashingHumanoid['Arms']['11'] = 'Arm severed, severe bleeding, 1/2 move';
slashingHumanoid['Arms']['12'] = 'Arm severed, no move or attacks, severe bleeding';

slashingHumanoid['Head']['4']  = 'Head grazed, stunned [[1d3]] rounds, minor bleeding';
slashingHumanoid['Head']['5']  = 'Head struck, helm removed, victim stunned 1 round; –2 penalty to attack rolls, minor bleeding if victim had no helm';
slashingHumanoid['Head']['6']  = 'Head struck, minor bleeding, victim blinded for [[2d4]] rounds by blood in eyes';
slashingHumanoid['Head']['7']  = 'Helm damaged, face injured, stunned [[1d6]] rounds, minor bleeding, 1/2 move, –4 penalty to attacks';
slashingHumanoid['Head']['8']  = 'Skull broken, helm damaged, victim reduced to 0 hit points, major bleeding';
slashingHumanoid['Head']['9']  = 'Throat injured, severe bleeding';
slashingHumanoid['Head']['10'] = 'Skull destroyed, victim reduced to 0 hp, severe bleeding, Int, Wis, Cha all drop by 1/2 permanently';
slashingHumanoid['Head']['11'] = 'Throat destroyed, victim killed';
slashingHumanoid['Head']['12'] = 'Head severed, immediate death';

const slashingAnimal = {};
slashingAnimal['Legs/Wings']['4']  = 'Leg struck, minor bleeding';
slashingAnimal['Legs/Wings']['5']  = 'Knee struck, 2/3 move, minor bleeding';
slashingAnimal['Legs/Wings']['6']  = 'Leg injured, major bleeding, 2/3 move';
slashingAnimal['Legs/Wings']['7']  = 'Foot/claw injured, 2/3 move, minor bleeding, –2 penalty to attacks with that limb';
slashingAnimal['Legs/Wings']['8']  = 'Hip injured, major bleeding, 1/3 movement, –2 penalty to attacks; wing hit forces crash landing';
slashingAnimal['Legs/Wings']['9']  = 'Leg/wing severed at midpoint, 1/3 move, major bleeding; wing hit forces uncontrolled fall';
slashingAnimal['Legs/Wings']['10'] = 'Knee destroyed, major bleeding, 1/3 move, –2 penalty to all attacks';
slashingAnimal['Legs/Wings']['11'] = 'Hip/shoulder destroyed, severe bleeding, no move or attack; wing hit forces crash landing';
slashingAnimal['Legs/Wings']['12'] = 'Leg/wing severed at mid-thigh, no move or attack, severe bleeding';

slashingAnimal['Tail']['4']  = 'No unusual effect';
slashingAnimal['Tail']['5']  = 'No unusual effect';
slashingAnimal['Tail']['6']  = 'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks';
slashingAnimal['Tail']['7']  = 'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks';
slashingAnimal['Tail']['8']  = 'Tail injured, minor bleeding, normal animals must save vs. death or retreat; no tail attacks';
slashingAnimal['Tail']['9']  = 'Tail severed near end, major bleeding, lose tail attacks, move reduced by 1/3 if creature uses tail for movement';
slashingAnimal['Tail']['10'] = 'Tail severed near end, major bleeding, lose tail attacks, move reduced by 1/3 if creature uses tail for movement';
slashingAnimal['Tail']['11'] = 'Tail severed, victim stunned 1–3 rounds, lose tail attacks, major bleeding, no movement or attacks if animal uses tail for movement';
slashingAnimal['Tail']['12'] = 'Tail severed, stunned 1–3 rounds, major bleeding, 1/2 move and –2 penalty on any attack; if animal uses tail for movement, no move or attack';

slashingAnimal['Abdomen']['4']  = 'Abdomen grazed, minor bleeding';
slashingAnimal['Abdomen']['5']  = 'Abdomen struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding';
slashingAnimal['Abdomen']['6']  = 'Abdomen struck, victim stunned [[1d6]] rounds, reduced to 2/3 move, minor bleeding';
slashingAnimal['Abdomen']['7']  = 'Abdomen injured, 1/3 move, minor bleeding, –2 penalty to all attacks';
slashingAnimal['Abdomen']['8']  = 'Spine injured, no move, minor bleeding, –4 penalty to attacks';
slashingAnimal['Abdomen']['9']  = 'Abdomen injured, major bleeding, 1/3 move and –2 penalty to attacks';
slashingAnimal['Abdomen']['10'] = 'Abdomen injured, no move or attack, major bleeding';
slashingAnimal['Abdomen']['11'] = 'Spine destroyed, no move or attack, major bleeding, victim paralyzed';
slashingAnimal['Abdomen']['12'] = 'Abdomen destroyed, victim reduced to 0 hit points with severe bleeding';

slashingAnimal['Torso']['4']  = 'Torso grazed, minor bleeding';
slashingAnimal['Torso']['5']  = 'Torso struck, victim stunned 1 round and reduced to 2/3 move, minor bleeding';
slashingAnimal['Torso']['6']  = 'Torso struck, stunned [[1d6]] rounds, minor bleeding';
slashingAnimal['Torso']['7']  = 'Spine struck, major bleeding, 2/3 move, –2 penalty to attacks';
slashingAnimal['Torso']['8']  = 'Torso injured, severe bleeding, no move or attack';
slashingAnimal['Torso']['9']  = 'Ribs broken, major bleeding, 1/3 move, –4 penalty to attacks';
slashingAnimal['Torso']['10'] = 'Ribs broken, severe bleeding, no move or attack';
slashingAnimal['Torso']['11'] = 'Spine destroyed, victim reduced to 0 hit points with severe bleeding';
slashingAnimal['Torso']['12'] = 'Torso destroyed, victim killed';

slashingAnimal['Head']['4']  = 'Head grazed, stunned 1 round, minor bleeding';
slashingAnimal['Head']['5']  = 'Snout struck, minor bleeding, animal must save vs. death or retreat for [[1d10]] rounds';
slashingAnimal['Head']['6']  = 'Head struck, minor bleeding, –2 penalty to attacks';
slashingAnimal['Head']['7']  = 'Throat injured, major bleeding, 2/3 move, –4 penalty to all attacks';
slashingAnimal['Head']['8']  = 'Skull broken, animal reduced to 0 hit points, major bleeding';
slashingAnimal['Head']['9']  = 'Snout/face destroyed, major bleeding, 1/3 move, no bite attacks, –4 penalty to all other attacks';
slashingAnimal['Head']['10'] = 'Head injured, reduced to 0 hp, severe bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] months';
slashingAnimal['Head']['11'] = 'Throat destroyed, severe bleeding';
slashingAnimal['Head']['12'] = 'Head severed, immediate death';

const slashingMonster = {};
slashingMonster['Legs/Wings']['4']  = 'Leg grazed, minor bleeding';
slashingMonster['Legs/Wings']['5']  = 'Knee struck, 2/3 move, minor bleeding';
slashingMonster['Legs/Wings']['6']  = 'Leg struck, minor bleeding, 2/3 move';
slashingMonster['Legs/Wings']['7']  = 'Foot/claw injured, 2/3 move, minor bleeding, –2 penalty to attacks with that limb';
slashingMonster['Legs/Wings']['8']  = 'Hip injured, major bleeding, 1/3 movement; wing hit forces crash landing';
slashingMonster['Legs/Wings']['9']  = 'Leg/wing severed at midpoint, 1/3 move, major bleeding; wing hit forces uncontrolled fall';
slashingMonster['Legs/Wings']['10'] = 'Knee destroyed, major bleeding, 1/3 move, –2 penalty to attacks with affected limb';
slashingMonster['Legs/Wings']['11'] = 'Hip/shoulder destroyed, major bleeding, no move, –4 penalty to attacks; wing hit forces crash landing';
slashingMonster['Legs/Wings']['12'] = 'Leg/wing severed at mid-thigh, no move or attack, severe bleeding';

slashingMonster['Tail']['4']  = 'No unusual effect';
slashingMonster['Tail']['5']  = 'No unusual effect';
slashingMonster['Tail']['6']  = 'Tip of tail struck; if prehensile, any items carried are dropped, minor bleeding, –2 penalty to tail attacks';
slashingMonster['Tail']['7']  = 'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks';
slashingMonster['Tail']['8']  = 'Tail injured, minor bleeding, monster suffers –2 penalty to all attacks due to pain; no tail attacks';
slashingMonster['Tail']['9']  = 'Tail severed, major bleeding, no tail attacks; if creature uses tail for movement, 1/3 move';
slashingMonster['Tail']['10'] = 'Tail severed, major bleeding, no tail attacks; if creature uses tail for movement, 1/3 move';
slashingMonster['Tail']['11'] = 'Tail severed, victim stunned 1 round, lose tail attacks, major bleeding; 1/3 movement, –4 penalty to attacks if monster uses tail for movement';
slashingMonster['Tail']['12'] = 'Tail severed, stunned 1 round, major bleeding, 1/2 move and –2 penalty on any attack; if animal uses tail for movement, no move or attack';

slashingMonster['Abdomen']['4']  = 'Abdomen grazed, minor bleeding';
slashingMonster['Abdomen']['5']  = 'Abdomen struck, victim stunned 1 round, minor bleeding';
slashingMonster['Abdomen']['6']  = 'Abdomen struck, victim stunned [[1d3]] rounds, reduced to 2/3 move, minor bleeding';
slashingMonster['Abdomen']['7']  = 'Abdomen injured, 1/2 move, minor bleeding, –2 penalty to all attacks';
slashingMonster['Abdomen']['8']  = 'Spine injured, 1/3 move, minor bleeding, –4 penalty to all attacks';
slashingMonster['Abdomen']['9']  = 'Abdomen injured, major bleeding, 1/3 move and –2 penalty to attacks';
slashingMonster['Abdomen']['10'] = 'Abdomen injured, 1/3 move, –4 penalty to attacks, major bleeding';
slashingMonster['Abdomen']['11'] = 'Spine injured, no move or attack, major bleeding, victim stunned [[1d6]] rounds';
slashingMonster['Abdomen']['12'] = 'Abdomen destroyed, victim reduced to 0 hit points with severe bleeding';

slashingMonster['Torso']['4']  = 'Torso grazed, minor bleeding';
slashingMonster['Torso']['5']  = 'Torso struck, victim stunned 1 round, minor bleeding';
slashingMonster['Torso']['6']  = 'Torso struck, stunned [[1d3]] rounds, minor bleeding';
slashingMonster['Torso']['7']  = 'Spine struck, minor bleeding, 2/3 move, –2 penalty to attacks';
slashingMonster['Torso']['8']  = 'Torso injured, major bleeding, 1/3 move, –4 penalty to attacks';
slashingMonster['Torso']['9']  = 'Ribs injured, major bleeding, 1/3 move, –4 penalty to attacks';
slashingMonster['Torso']['10'] = 'Ribs broken, severe bleeding, 1/3 move, no attack';
slashingMonster['Torso']['11'] = 'Spine broken, major bleeding, no move or attack';
slashingMonster['Torso']['12'] = 'Torso destroyed, victim killed';

slashingMonster['Head']['4']  = 'Head grazed, minor bleeding';
slashingMonster['Head']['5']  = 'Snout struck, minor bleeding, monster must save vs. death or retreat for 1 round';
slashingMonster['Head']['6']  = 'Head struck, minor bleeding, –2 penalty to attacks';
slashingMonster['Head']['7']  = 'Throat injured, major bleeding, 2/3 move, –2 penalty to all attacks';
slashingMonster['Head']['8']  = 'Skull injured, monster reduced to 2/3 move, major bleeding, –2 penalty to all attacks';
slashingMonster['Head']['9']  = 'Snout/face injured, major bleeding, 1/3 move, no bite attacks, –2 penalty to all other attacks';
slashingMonster['Head']['10'] = 'Head injured, reduced to 0 hp, major bleeding; 1/3 move and –4 penalty to all attacks for [[1d3]] weeks';
slashingMonster['Head']['11'] = 'Throat destroyed, severe bleeding';
slashingMonster['Head']['12'] = 'Head severed, immediate death';

const slashingCrit = {};
slashingCrit['Humanoid'] = slashingHumanoid;
slashingCrit['Animal'] = slashingAnimal;
slashingCrit['Monster'] = slashingMonster;
//#endregion

const CRIT_EFFECT_TABLE = {};
CRIT_EFFECT_TABLE['Bludgeoning'] = bludgeoningCrit;
CRIT_EFFECT_TABLE['Piecring'] = piercingCrit;
CRIT_EFFECT_TABLE['Slashing'] = slashingCrit;