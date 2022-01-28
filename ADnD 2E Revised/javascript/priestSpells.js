/* ---- Priest spells start ---- */
//#region Player's Handbook
const pri1 = {};
pri1['Animal Friendship'] = {
    'level': '1',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': '1 animal',
    'components': 'V, S, M',
    'cast-time': '1 hour',
    'saving-throw': 'Negate',
    'materials': 'The caster’s holy symbol and a piece of food liked by the animal.',
    'reference': 'p. 252',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to show any animal of animal intelligence to semi-intelligence (i.e., Intelligence 1–4) that he desires friendship. If the animal does not roll a successful saving throw vs. spell immediately when the spell is begun, it stands quietly while the caster finishes the spell. Thereafter, it follows the caster about. The spell functions only if the caster actually wishes to be the animal’s friend. If the caster has ulterior motives, the animal always senses them (for example, the caster intends to eat the animal, send it ahead to set off traps, etc.).\n&emsp;The caster can teach the befriended animal three specific tricks or tasks for each point of Intelligence it possesses. Typical tasks are those taught to a dog or similar pet (i.e., they cannot be complex). Training for each such trick must be done over a period of one week, and all must be done within three months of acquiring the creature. During the three-month period, the animal will not harm the caster, but if the creature is left alone for more than a week, it will revert to its natural state and act accordingly.\n&emsp;The caster can use this spell to attract up to 2 Hit Dice of animal(s) per experience level he possesses. This is also the maximum total Hit Dice of the animals that can be attracted and trained at one time: no more than twice the caster’s experience level. Current maximum [[2*[[@{level-priest}]] ]] Hit Dice of animals. Only unaligned animals can be attracted, befriended, and trained.'
};

pri1['Bless'] = {
    'level': '1',
    'school': 'Conjuration/Summoning (Reversible)',
    'sphere': 'All',
    'range': '60 yards',
    'duration': '6 rounds',
    'aoe': '50-foot cube',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Bless requires holy water. Curse requires the sprinkling of unholy water.',
    'reference': 'p. 252',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon uttering the *bless* spell, the caster raises the morale of friendly creatures and any saving throw rolls they make against *fear* effects by +1. Furthermore, it raises their attack dice rolls by +1. A blessing, however, affects only those not already engaged in melee combat. The caster determines at what range (up to 60 yards) he will cast the spell. At the instant the spell is completed, it affects all creatures in a 50-foot cube centered on the point selected by the caster (thus, affected creatures leaving the area are still subject to the spell’s effect; those entering the area after the casting is completed are not).\n&emsp;A second use of this spell is to bless a single item (for example, a crossbow bolt for use against a rakshasa). The weight of the item is limited to one pound per caster level and the effect lasts until the item is used or the spell duration ends.\n&emsp;Multiple *bless* spells are not cumulative.\n&emsp;This spell can be reversed by the priest to a *curse* spell that, when cast upon enemy creatures, lowers their morale and attack rolls by –1.'
};

pri1['Combine'] = {
    'level': '1',
    'school': 'Evocation',
    'sphere': 'All',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Circle of priests',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 252',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Using this spell, three to five priests combine their abilities so that one of them casts spells and turns undead at an enhanced level. The highest-level priest (or one of them, if two or more are tied for highest) stands alone, while the others join hands in a surrounding circle. The central priest casts the *combine* spell. He temporarily gains one level for each priest in the circle, up to a maximum gain of four levels. The level increase affects turning undead and spell details that vary with the caster’s level. Note that the central priest gains no additional spells and that the group is limited to his currently memorized spells.\n&emsp;The encircling priests must concentrate on maintaining the combine effect. They lose all Armor Class bonuses for shield and Dexterity. If any of them has his concentration broken, the *combine* spell ends immediately. If the *combine* spell is broken while the central priest is in the act of casting a spell, that spell is ruined just as if the caster were disturbed. Spells cast in combination have the full enhanced effect, even if the combine is broken before the duration of the enhanced spell ends. Note that the combination is not broken if only the central caster is disturbed.'
};

pri1['Command'] = {
    'level': '1',
    'school': 'Enchantment/Charm',
    'sphere': 'Charm',
    'sphere-spells&magic': 'Charm, Combat, Law',
    'range': '30 yards',
    'duration': '1 round',
    'aoe': '1 creature',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 252',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the priest to command another creature with a single word. The command must be uttered in a language understood by the creature. The subject will obey to the best of his/its ability only as long as the command is absolutely clear and unequivocal; thus, a command of “Suicide!” is ignored. A command to “Die!” causes the creature to fall in a faint or cataleptic state for one round, but thereafter the creature revives and is alive and well. Typical commands are back, halt, flee, run, stop, fall, go, leave, surrender, sleep, rest, etc. No command affects a creature for more than one round; undead are not affected at all. Creatures with Intelligence of 13 (high) or more, or those with 6 or more Hit Dice (or experience levels) are entitled to a saving throw vs. spell, adjusted for Wisdom. (Creatures with 13 or higher Intelligence *and* 6 Hit Dice/levels get only one saving throw!)'
};

pri1['Create Water'] = {
    'level': '1',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Water)',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': 'Up to 27 cubic feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The *create water* spell requires at least a drop of water; the *destroy water* spell, at least a pinch of dust.',
    'reference': 'p. 253',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the priest casts a *create water* spell, up to 4 gallons of water are generated for every experience level of the caster (Currently up to [[4*[[@{level-priest}]] ]] gallons). The water is clean and drinkable (it is just like rain water). The created water can be dispelled within a round of its creation; otherwise, its magic fades, leaving normal water that can be used, spilled, evaporated, etc. The reverse of the spell, *destroy water*, obliterates without trace (no vapor, mist, fog, or steam) a like quantity of water. Water can be created or destroyed in an area as small as will actually contain the liquid, or in an area as large as 27 cubic feet (1 cubic yard).\n&emsp;Note that water can neither be created nor destroyed within a creature. For reference purposes, water weighs about 8½ pounds per gallon, and a cubic foot of water weighs approximately 64 pounds.'
};

pri1['Cure Light Wounds'] = {
    'level': '1',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Healing',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 253',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '[[1d8]]',
    'effect': 'When casting this spell and laying his hand upon a creature, the priest causes 1d8 points of wound or other injury damage to the creature’s body to be healed. This healing cannot affect creatures without corporeal bodies, nor can it cure wounds of creatures not living or of extraplanar origin.\n&emsp;The reverse of the spell, *cause light wounds*, operates in the same manner, inflicting 1d8 points of damage. If a creature is avoiding this touch, an attack roll is needed to determine if the priest’s hand strikes the opponent and causes such a wound.\n&emsp;Curing is permanent only insofar as the creature does not sustain further damage; caused wounds will heal—or can be cured—just as any normal injury.'
};

pri1['Detect Evil'] = {
    'level': '1',
    'school': 'Divination (Reversible)',
    'sphere': 'All',
    'sphere-spells&magic': 'Divination',
    'range': '0',
    'duration': '1 turn + [[5*[[@{level-priest}]] ]] rounds',
    'aoe': '10 feet x 120 yards',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The use of the priest’s holy symbol as its material component, with the priest holding it before him.',
    'reference': 'p. 253',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell discovers emanations of evil, or of good in the case of the reverse spell, from any creature, object, or area. Character alignment, however, is revealed only under unusual circumstances: characters who are strongly aligned, who do not stray from their faith, and who are of at least 9th level might radiate good or evil *if intent upon appropriate actions*. Powerful monsters, such as rakshasas or ki-rin, send forth emanations of evil or good, even if polymorphed. Aligned undead radiate evil, for it is this power and negative force that enable them to continue existing. An evilly cursed object or unholy water radiates evil, but a hidden trap or an unintelligent viper does not.\n&emsp;The degree of evil (dim, faint, moderate, strong, or overwhelming) and possibly its general nature (expectant, malignant, gloating, etc.) can be noted. If the evil is overwhelming, the priest has a 10% chance per level ([[10*[[@{level-priest}]] ]]%) of detecting its general bent (lawful, neutral, or chaotic). The duration of a *detect evil* (or *detect good*) spell is one turn plus five rounds per level of the priest. Thus, a 1st-level priest can cast a spell with a 15-round duration, a 2nd-level priest can cast a spell with a 20-round duration. Current duration [[10+(5*[[@{level-priest}]])]] rounds. The spell has a path of detection 10 feet wide in the direction the priest is facing. The priest must concentrate—stop, have quiet, and intently seek to detect the aura— for at least one round to receive a reading.'
};

pri1['Detect Magic'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Divination',
    'sphere-spells&magic': 'All',
    'range': '0',
    'duration': '1 turn',
    'aoe': '10 feet x 30 yards',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The use of the priest’s holy symbol.',
    'reference': 'p. 253',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the *detect magic* spell is cast, the priest detects magical radiations in a path 10 feet wide and up to 30 yards long, in the direction he is facing. The intensity of the magic can be detected (dim, faint, moderate, strong, or overwhelming). The caster has a 10% chance per level ([[10*[[@{level-priest}]] ]]%) to determine the sphere of the magic, but unlike the wizard version of the spell, the type of magic (alteration, conjuration, etc.) cannot be divined. The caster can turn, scanning a 60° arc per round. The spell is blocked by solid stone at least 1 foot thick, solid metal at least 1 inch thick, or solid wood at least 1 yard thick.'
};

pri1['Detect Poison'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': '1 turn + [[@{level-priest}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A strip of specially blessed vellum, which turns black if poison is present.',
    'reference': 'p. 254',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the priest to determine if an object has been poisoned or is poisonous. One object, or one 5-foot cubic mass, can be checked per round. The priest has a 5% chance per level of determining the exact type of poison. Currently [[5*[[@{level-priest}]] ]]% of detecting the type of poison.'
};

pri1['Detect Snares & Pits'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Divination',
    'sphere-spells&magic': 'Plant',
    'range': '0',
    'duration': '[[4*[[@{level-priest}]] ]] rounds',
    'aoe': '10 x 40 feet',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'The caster must have his holy symbol to complete the spell.',
    'reference': 'p. 254',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, the caster is able to detect snares, pits, deadfalls and similar hazards along a path 10 feet wide and 40 feet long. Such hazards include simple pits, deadfalls, snares of wilderness creatures (for example, trapdoor spiders, giant sundews, ant lions, etc.), and primitive traps constructed of natural materials (mantraps, missile trips, hunting snares, etc.). The spell is directional—the caster must face the desired direction to determine if a pit exists or a trap is laid in that direction. The caster experiences a feeling of danger from the direction of a detected hazard, which increases as the danger is approached. The caster learns the general nature of the danger (pit, snare, or deadfall) but not its exact operation, nor how to disarm it. Close examination, however, enables the caster to sense what intended actions might trigger it. The spell detects certain natural hazards— quicksand (snare), sinkholes (pit), or unsafe walls of natural rock (deadfall). Other hazards, such as a cavern that floods during rain, an unsafe construction, or a naturally poisonous plant, are not revealed. The spell does not detect magical traps (save those that operate by pit, deadfall, or snaring; see the 2ndlevel spell *trip* and the 3rd-level *spell snare*), nor those that are mechanically complex, nor those that have been rendered safe or inactive.'
};

pri1['Endure Cold/Endure Heat'] = {
    'level': '1',
    'school': 'Alteration',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[1.5*[[@{level-priest}]] ]] hours',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The create water spell requires at least a drop of water; the destroy water spell, at least a pinch of dust.',
    'reference': 'p. 254',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The creature receiving this spell is protected from normal extremes of cold or heat (depending on which application the priest selects at the time of casting). The creature can stand unprotected in temperatures as low as –30° F. or as high as 130° F. (-34° to 54° C) (depending on application) with no ill effect. Temperatures beyond these limits inflict 1 point of damage per hour of exposure for every degree beyond the limit. The spell is immediately cancelled if the recipient is affected by any non-normal heat or cold, such as magic, breath weapons, and so on. The cancellation occurs regardless of the application and regardless of whether a heat or cold effect hits the character (for example, an *endure cold* spell is cancelled by magical heat or fire as well as by magical cold). The recipient of the spell does not suffer the first 10 points of damage (after any applicable saving throws) from the heat or cold during the round in which the spell is broken. The spell ends instantly if either *resist fire* or *resist cold* is cast upon the recipient.'
};

pri1['Entangle'] = {
    'level': '1',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '80 yards',
    'duration': '1 turn',
    'aoe': '40-foot cube',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': '½',
    'materials': 'The caster’s holy symbol.',
    'reference': 'p. 254',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to cause plants in the area of effect to entangle creatures within the area. The grasses, weeds, bushes, and even trees wrap, twist, and entwine about the creatures, holding them fast for the duration of the spell. Any creature entering the area is subject to this effect. A creature that rolls a successful saving throw vs. spell can escape the area, moving at only 10 feet per round until out of the area. Exceptionally large (gargantuan) or strong creatures may suffer little or no distress from this spell, at the DM’s option, based on the strength of the entangling plants.'
};

pri1['Faerie Fire'] = {
    'level': '1',
    'school': 'Alteration',
    'sphere': 'Weather',
    'range': '80 yards',
    'duration': '[[4*[[@{level-priest}]] ]] rounds',
    'aoe': '[[10*[[@{level-priest}]] ]] square feet within 40-foot radius',
    'components': 'V, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A small piece of foxfire',
    'reference': 'p. 254',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to outline one or more objects or creatures with a pale glowing light. The number of subjects outlined depends upon the number of square feet the caster can affect. Sufficient footage enables several objects or creatures to be outlined by the *faerie fire* spell, but one must be fully outlined before the next is begun, and all must be within the area of effect. Outlined objects or creatures are visible at 80 yards in the dark and 40 yards if the viewer is near a bright light source. Outlined creatures are easier to strike; thus, opponents gain a +2 bonus to attack rolls in darkness (including moonlit nights) and a +1 bonus in twilight or better. Note that outlining can render otherwise invisible creatures visible. However, it cannot outline noncorporeal, ethereal, or gaseous creatures. Nor does the light come anywhere close to sunlight. Therefore, it has no special effect on undead or dark-dwelling creatures. The faerie fire can be blue, green, or violet according to the word of the caster at the time of casting. The faerie fire does not cause any harm to the object or creature thus outlined.'
};

pri1['Invisibility to Animals'] = {
    'level': '1',
    'school': 'Alteration',
    'sphere': 'Animal',
    'range': 'Touch',
    'duration': '1 turn + [[@{level-priest}]] rounds',
    'aoe': '[[@{level-priest}]] creatures',
    'components': 'S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'Holly rubbed over the recipient.',
    'reference': 'p. 255',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When an *invisibility to animals* spell is cast, the creature touched becomes totally undetectable by normal animals with Intelligences under 6. Normal animals includes giant-sized varieties, but it excludes any with magical abilities or powers. The enchanted individual is able to walk among such animals or pass through them as if he did not exist. For example, this individual could stand before the hungriest of lions or a tyrannosaurus rex and not be molested or even noticed. However, a nightmare, hell hound, or winter wolf would certainly be aware of the individual. For every level the caster has achieved, one creature can be rendered invisible. Any recipient attacking while this spell is in effect ends the spell immediately (for himself only).'
};

pri1['Invisibility to Undead'] = {
    'level': '1',
    'school': 'Abjuration',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': '6 rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': 'The priest’s holy symbol',
    'reference': 'p. 255',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes affected undead to lose track of and ignore the warded creature for the duration of the spell. Undead of 4 or fewer Hit Dice are automatically affected, but those with more Hit Dice receive a saving throw vs. spell to avoid the effect. Note that a priest protected by this spell cannot turn affected undead. The spell ends immediately if the recipient makes any attack, although casting spells such as *cure light wounds*, *augury*, or *chant* does not end the ward.'
};

pri1['Light'] = {
    'level': '1',
    'school': 'Alteration (Reversible)',
    'sphere': 'Sun',
    'sphere-spells&magic': 'Creation, Guardian, Sun',
    'range': '120 yards',
    'duration': '1 hour + [[@{level-priest}]] turns',
    'aoe': '20-feet-radius globe',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 255',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes a luminous glow within 20 feet of the spell’s center. The area of light thus caused is equal in brightness to torchlight. Objects in darkness beyond this sphere can be seen, at best, as vague and shadowy shapes. The spell is centered on a point selected by the caster, and he must have a line of sight or unobstructed path to that point when the spell is cast. Light can spring from air, rock, metal, wood, or almost any similar substance. The effect is immobile unless it is specifically centered on a movable object or mobile creature. If this spell is cast upon a creature, any applicable magic resistance and saving throws must be rolled. Successful resistance negates the spell, while a successful saving throw indicates that the spell is centered immediately behind the creature, rather than upon the creature itself. A *light* spell centered on the visual organs of a creature blinds it, reducing its attack and saving throw rolls by 4 and worsening its Armor Class by 4. The caster can extinguish the light at any time by uttering a single word. *Light* spells are not cumulative—multiple castings do not provide a brighter light.\n&emsp;The spell is reversible, causing darkness in the same area and under the same conditions as the *light* spell, but with half the duration. Magical darkness is equal to that of an unlit interior room— pitch darkness. Any normal light source or magical light source of lesser intensity than full daylight does not function in magical darkness. A *darkness* spell cast directly against a *light* spell cancels both, and vice versa.'
};

pri1['Locate Animals or Plants'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Divination (Animal, Plant)',
    'sphere-spells&magic': 'Animal, Plant',
    'range': '[[100+(20*[[@{level-priest}]])]] yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '[[20*[[@{level-priest}]] ]] yards x 20 feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol.',
    'reference': 'p. 255',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The caster can find the direction and distance of any one type of animal or plant he desires. The caster, facing in a direction, thinks of the animal or plant, and then knows if any such animal or plant is within range. If so, the exact distance and approximate number present is learned. During each round of the spell’s duration, the caster can face in only one direction (i.e., only a 20-foot-wide path can be known). The spell lasts one round per level of experience of the caster, while the length of the path is 100 yards plus 20 yards per level of experience. (At the DM’s option, some casters may be able to locate only those animals [or plants] associated closely with their own mythos.) While the exact chance of locating a specific type of animal or plant depends on the details and circumstances of the locale, the general frequency of the subject can be used as a guideline: common = 50%, uncommon = 30%, rare = 15%, and very rare = 5%. Most herbs grow in temperate regions, while most spices grow in tropical regions. Most plants sought as spell components or for magical research are rare or very rare. The results of this spell are always determined by the DM.'
};

pri1['Magical Stone'] = {
    'level': '1',
    'school': 'Enchantment',
    'sphere': 'Combat',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '3 pebbles',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and three small pebbles, unworked by tools or magic of any type.',
    'reference': 'p. 256',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By using this spell, the priest can temporarily enchant up to three small pebbles, no larger than sling bullets. The magical stones can then be hurled or slung at an opponent. If hurled, they can be thrown up to 30 yards, and all three can be thrown in one round. The character using them must roll normally to hit, although the magic of the stones enables any character to be proficient with them. The stones are considered +1 weapons for determining if a creature can be struck (those struck only by magical weapons, for instance), although they do not have an attack or damage bonus. Each stone that hits inflicts 1d4 points of damage (2d4 points against undead). The magic in each stone lasts only for half an hour, or until used.'
};

pri1['Pass Without Trace'] = {
    'level': '1',
    'school': 'Enchantment/Charm',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[@{level-priest}]] creatures',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A sprig of pine or evergreen, which must be burned and the ashes powdered and scattered when the spell is cast.',
    'reference': 'p. 256',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the recipient can move through any type of terrain—mud, snow, dust, etc.—and leave neither footprints nor scent. The area that is passed over radiates magic for [[1d6]] turns after the affected creature passes. Thus, tracking a person or other creature covered by this spell is impossible by normal means. Of course, intelligent tracking techniques, such as using a spiral search pattern, can result in the trackers picking up the trail at a point where the spell has worn off.'
};

pri1['Protection From Evil'] = {
    'level': '1',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[3*[[@{level-priest}]] ]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'Holy water or burning incense / A circle of unholy water or smoldering dung.',
    'reference': 'p. 256',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, it creates a magical barrier around the recipient at a distance of 1 foot. The barrier moves with the recipient and has three major effects:\n&emsp;First, all attacks made by evil or evilly enchanted creatures against the protected creature receive a penalty of –2 to each attack roll, and any saving throws caused by such attacks are made by the protected creature with a +2 bonus.\n&emsp;Second, any attempt to exercise mental control over the protected creature (if, for example, it has been charmed by a vampire) or to invade and take over its mind (as by a ghost’s magic jar attack) is blocked by this spell. Note that the protection does not prevent a vampire’s charm itself, nor end it, but it does prevent the vampire from exercising mental control through the barrier. Likewise, an outside life force is merely kept out, and would not be expelled if in place before the protection was cast.\n&emsp;Third, the spell prevents bodily contact by creatures of an extraplanar or conjured nature (such as aerial servants, elementals, imps, invisible stalkers, salamanders, water weirds, xorn, and others). This causes the natural (body) weapon attacks of such creatures to fail and the creature to recoil if such attacks require touching the protected creature. Animals or monsters summoned or conjured by spells or similar magic are likewise hedged from the character. This protection ends if the protected character makes a melee attack against or tries to force the barrier against the blocked creature.\n&emsp;This spell can be reversed to become *protection from good*, with the second and third benefits remaining unchanged.'
};

pri1['Purify Food & Drink'] = {
    'level': '1',
    'school': 'Alteration (Reversible)',
    'sphere': 'All',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '[[@{level-priest}]] cube feet in 10 square feet',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A sprig of pine or evergreen, which must be burned and the ashes powdered and scattered when the spell is cast.',
    'reference': 'p. 256',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast, this spell makes spoiled, rotten, poisonous, or otherwise contaminated food and water pure and suitable for eating and drinking. Up to 1 cubic foot of food and drink per level can be thus made suitable for consumption. This spell does not prevent subsequent natural decay or spoilage. Unholy water and similar food and drink of significance is spoiled by *purify food and drink*, but the spell has no effect on creatures of any type nor upon magical potions.\n&emsp;The reverse of the spell is *putrefy food and drink*. This spoils even holy water; however, it likewise has no effect upon creatures or potions.'
};

pri1['Remove Fear'] = {
    'level': '1',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Charm',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '[[ceil([[@{level-priest}]]/4)]] creatures',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A sprig of pine or evergreen, which must be burned and the ashes powdered and scattered when the spell is cast.',
    'reference': 'p. 256',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The priest casting this spell instills courage in the spell recipient, raising the creature’s saving throw rolls against magical *fear* attacks by +4 for one turn. If the recipient has recently (that day) failed a saving throw against such an attack, the spell immediately grants another saving throw, with a +4 bonus to the die roll. For every four levels of the caster, one creature can be affected by the spell (one creature at levels 1 through 4, two creatures at levels 5 through 8, etc.).\n&emsp;The reverse of the spell, *cause fear*, causes one creature to flee in panic at maximum movement speed away from the caster for 1d4 rounds. A successful saving throw against the reversed effect negates it, and any Wisdom adjustment also applies. Of course, *cause fear* can be automatically countered by *remove fear* and vice versa.\n&emsp;Neither spell has any effect on undead of any sort.'
};

pri1['Sanctuary'] = {
    'level': '1',
    'school': 'Abjuration',
    'sphere': 'Protection',
    'sphere-spells&magic': 'Charm, Protection',
    'range': 'Touch',
    'duration': '[[2+[[@{level-priest}]] ]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a small silver mirror.',
    'reference': 'p. 257',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the priest casts a *sanctuary* spell, any opponent attempting to strike or otherwise directly attack the protected creature must roll a saving throw vs. spell. If the saving throw is successful, the opponent can attack normally and is unaffected by that casting of the spell. If the saving throw is failed, the opponent loses track of and totally ignores the warded creature for the duration of the spell. Those not attempting to attack the subject remain unaffected. Note that this spell does not prevent the operation of area attacks (fireball, ice storm, etc.). While protected by this spell, the subject cannot take direct offensive action without breaking the spell, but may use nonattack spells or otherwise act in any way that does not violate the prohibition against offensive action. This allows a warded priest to heal wounds, for example, or to bless, perform an augury, chant, cast a light in the area (but not upon an opponent), and so on.'
};

pri1['Shillelagh'] = {
    'level': '1',
    'school': 'Alteration',
    'sphere': 'Combat, Plant',
    'sphere-spells&magic': 'Plant',
    'range': 'Touch',
    'duration': '[[4+[[@{level-priest}]] ]] rounds',
    'aoe': '1 oak club',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A shamrock leaf and the caster’s holy symbol.',
    'reference': 'p. 257',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to change his own oak cudgel or unshod staff into a magical weapon that gains a +1 bonus to its attack roll and inflicts 2d4 points of damage on opponents up to man size, and 1d4+1 points of damage on larger opponents. The spell inflicts no damage to the staff or cudgel. The caster must wield the shillelagh, of course.'
};

let pri2 = {};
pri2['Aid'] = {
    'level': '2',
    'school': 'Necromancy, Conjuration',
    'sphere': 'Necromantic',
    'sphere-spells&magic': 'Combat, Necromantic',
    'range': 'Touch',
    'duration': '[[1+[[@{level-priest}]] ]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A tiny strip of white cloth with a sticky substance (such as tree sap) on the ends, plus the priest’s holy symbol.',
    'reference': 'p. 257',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The recipient of this spell gains the benefit of a *bless* spell (+1 to attack rolls and saving throws) and a special bonus of [[1d8]] additional hit points for the duration of the spell. The *aid* spell enables the recipient to actually have more hit points than his full normal total. The bonus hit points are lost first when the recipient takes damage; they cannot be regained by curative magic.\n&emsp;For example, a 1st-level fighter has 8 hit points, suffers 2 points of damage (8–2 = 6), and then receives an aid spell that gives 5 additional hit points. The fighter now has 11 hit points, 5 of which are temporary. If he is then hit for 7 points of damage, 2 normal hit points and all 5 temporary hit points are lost. He then receives a *cure light wounds* spell that heals 4 points of damage, restoring him to his original 8 hit points.\n&emsp;Note that the operation of the spell is unaffected by permanent hit point losses due to energy drain, Hit Die losses, the loss of a familiar, or the operation of certain artifacts; the temporary hit point gain is figured from the new, lower total.'
};

pri2['Augury'] = {
    'level': '2',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '2 rounds',
    'saving-throw': 'None',
    'materials': 'A set of gem-inlaid sticks, dragon bones, or similar tokens of at least 1,000 gp value (which are not expended in casting).',
    'reference': 'p. 257',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The priest casting an *augury* spell seeks to divine whether an action in the immediate future (within one-half hour) will benefit or harm the party. For example, if a party is considering the destruction of a weird seal that closes a portal, an *augury* spell can be used to find if weal or woe will be the immediate result. If the spell is successful, the DM yields some indication of the probable outcome: “weal,” “woe,” or possibly a cryptic puzzle or rhyme. The base chance for receiving a meaningful reply is 70%, plus 1% for each level of the priest casting the spell ([[70+[[@{level-priest}]] ]]); for example, 71% at 1st level, 72% at 2nd, etc. Your DM determines any adjustments for the particular conditions of each augury. For example, if the question is “Will we do well if we venture to the third level?” and a terrible troll guarding 10,000 sp and a shield +1 lurks near the entrance to the level (which the DM estimates the party could beat after a hard fight), the augury might be: “Great risk brings great reward.” If the troll is too strong for the party, the augury might be: “Woe and destruction await!” Likewise, a party casting several auguries about the same action in quick succession might receive identical answers, regardless of the dice rolls.'
};

pri2['Barkskin'] = {
    'level': '2',
    'school': 'Alteration',
    'sphere': 'Protection, Plant',
    'sphere-spells&magic': 'Plant',
    'range': 'Touch',
    'duration': '[[4+[[@{level-priest}]] ]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A handful of bark from an oak and the priest’s holy symbol.',
    'reference': 'p. 258',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a priest casts the *barkskin* spell upon a creature, its skin becomes as tough as bark, increasing its base Armor Class to AC 6, plus 1 AC for every four levels of the priest ([[6-floor([[@{level-priest}]]/4)]] AC): Armor Class 5 at 4th level, Armor Class 4 at 8th, and so on. This spell does not function in combination with normal armor or any magical protection. In addition, saving throw rolls vs. all attack forms except magic gain a +1 bonus. This spell can be placed on the caster or on any other creature he touches.'
};

pri2['Chant'] = {
    'level': '2',
    'school': 'Conjuring/Summoning',
    'sphere': 'Combat',
    'sphere-spells&magic': 'All',
    'range': '0',
    'duration': 'Time of chanting',
    'aoe': '30-foot radius',
    'components': 'V, S',
    'cast-time': '2 rounds',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 258',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of the *chant* spell, the priest brings special favor upon himself and his party, and causes harm to his enemies. When the *chant* spell is completed, all attack and damage rolls and saving throws made by those in the area of effect who are friendly to the priest gain +1 bonuses, while those of the priest’s enemies suffer –1 penalties. This bonus/penalty continues as long as the caster continues to chant the mystic syllables and is stationary. However, an interruption (such as an attack that succeeds and causes damage, grappling with the chanter, or a *silence* spell) breaks the spell. Multiple chants are not cumulative; however, if the 3rd-level *prayer* spell is spoken while a priest of the same religious persuasion (not merely alignment) is chanting, the effect is increased to +2 and –2.'
};

pri2['Charm Person or Mammal'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'range': '80 yards',
    'duration': 'Special',
    'aoe': '1 person or mammal',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 258',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell affects any single person or mammal it is cast upon. The creature then regards the caster as a trusted friend and ally to be heeded and protected. The term *person* includes any bipedal human, demihuman or humanoid of man size or smaller, including brownies, dryads, dwarves, elves, gnolls, gnomes, goblins, half-elves, halflings, half-orcs, hobgoblins, humans, kobolds, lizard men, nixies, orcs, pixies, sprites, troglodytes, and others. Thus, a 10th-level fighter is included, while an ogre is not.\n&emsp;The spell does not enable the caster to control the charmed creature as if it were an automaton, but any word or action of the caster is viewed in the most favorable way. Thus, a charmed creature would not obey a suicide command, but might believe the caster if assured that the only chance to save the caster’s life is for the creature to hold back an onrushing red dragon for “just a minute or two” and if the charmed creature’s view of the situation suggests that this course of action still allows a reasonable chance of survival.\n&emsp;The subject’s attitudes and priorities are changed with respect to the caster, but basic personality and alignment are not. A request that a victim make itself defenseless, give up a valued item, or even use a charge from a valued item (especially against former associates or allies) might allow an immediate saving throw to see if the charm is thrown off. Likewise, a charmed creature does not necessarily reveal everything it knows or draw maps of entire areas. Any request may be refused, if such refusal is in character and does not directly harm the caster. The victim’s regard for the caster does not necessarily extend to the caster’s friends or allies. The victim does not react well to the charmer’s allies making suggestions such as, “Ask him this question. . .,” nor does the charmed creature put up with verbal or physical abuse from the charmer’s associates, if this is out of character.\n&emsp;Note also that the spell does not empower the caster with linguistic capabilities beyond those he normally has. The duration of the spell is a function of the charmed creature’s Intelligence, and it is tied to the saving throw. A successful saving throw breaks the spell. This saving throw is checked on a periodic basis according to the creature’s Intelligence, even if the caster has not overly strained the relationship.}}{{style=center1 sheet-spell-center2}}{{c1-1=**Intelligence Score**}}{{c2-1=3 or less}}{{c3-1=4–6}}{{c4-1=7–9}}{{c5-1=10–12}}{{c6-1=13–14}}{{c7-1=15–16}}{{c8-1=17}}{{c9-1=18}}{{c10-1=19 or more}}{{c1-2=**Period Between Checks**}}{{c2-2=3 months}}{{c3-2=2 months}}{{c4-2=1 month}}{{c5-2=3 weeks}}{{c6-2=2 weeks}}{{c7-2=1 week}}{{c8-2=3 days}}{{c9-2=2 days}}{{c10-2=1 day}}{{effects2=&emsp;If the caster harms, or attempts to harm, the charmed creature by some overt action, or if a *dispel magic* spell is successfully cast upon the charmed creature, the charm is broken automatically.\n&emsp;If the subject of the *charm person or mammal* spell successfully rolls its saving throw vs. the spell, the effect is negated.\n&emsp;This spell, if used in conjunction with the *animal friendship* spell, can keep the animal near the caster’s home base, if the caster must leave for an extended period.'
};

pri2['Detect Charm'] = {
    'level': '2',
    'school': 'Divination (Reversible)',
    'sphere': 'Divination',
    'range': '30 yards',
    'duration': '1 turn',
    'aoe': '1 creature/round',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 259',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When used by a priest, this spell can detect if a person or monster is under the influence of a *charm* spell, or similar control such as *hypnosis*, *suggestion*, *beguiling*, *possession*, etc. The creature rolls a saving throw vs. spell and, if successful, the caster learns nothing about that particular creature from the casting. A caster who learns that a creature is being influenced has a 5% chance per level ([[5*[[@{level-priest}]] ]]%) to determine the exact type of influence. Up to 10 different creatures can be checked before the spell wanes. If the creature is under more than one such effect, only the information that the charms exist is gained. The type (since there are conflicting emanations) is impossible to determine.\n&emsp;The reverse of the spell, *undetectable charm*, completely masks all charms on a single creature for 24 hours.'
};

pri2['Dust Devil'] = {
    'level': '2',
    'school': 'Conjuration/Summoning',
    'sphere': 'Elemental (Air)',
    'sphere-spells&magic': 'Elemental (Air), Summoning',
    'range': '30 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '5 x 4 foot cone',
    'components': 'V, S',
    'cast-time': '2 rounds',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 259',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables a priest to conjure up a weak air elemental— a dust devil of AC 4, 2 HD, MV 180 feet per round, one attack for 1d4 points of damage—which can be hit by normal weapons. The dust devil appears as a small whirlwind 1 foot in diameter at its base, 5 feet tall, and 3 to 4 feet across at the top. It moves as directed by the priest, but dissipates if it is ever separated from the caster by more than 30 yards. Its winds are sufficient to put out torches, small campfires, exposed lanterns, and other small, open flames of nonmagical origin. The dust devil can hold a gas cloud or a creature in gaseous form at bay or push it away from the caster (though it cannot damage or disperse such a cloud). If skimming along the ground in an area of loose dust, sand, or ash, the dust devil picks up those particles and disperses them in a 10-footdiameter cloud centered on itself. The cloud obscures normal vision, and creatures caught within are blinded while inside and for one round after they emerge. A spellcaster caught in the dust devil or its cloud while casting must make a saving throw vs. spell to keep his concentration, or the spell is ruined. Any creature native to the Elemental Plane of Air—even another dust devil—can disperse a dust devil with a single hit.'
};

pri2['Enthrall'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Charm',
    'sphere-spells&magic': 'Charm, Law',
    'range': '0',
    'duration': 'Special',
    'aoe': '90-foot radius',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 259',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A priest using this spell can enthrall an audience that can fully understand his language. Those in the area of effect must successfully save vs. spell or give the caster their undivided attention, totally ignoring their surroundings. Those of a race or religion unfriendly to the caster’s have a +4 bonus to the roll. Any Wisdom adjustment also applies. Creatures with 4 or more levels or Hit Dice, or with a Wisdom of 16 or better, are unaffected.\n&emsp;To cast the spell, the caster must speak without interruption for a full round. Thereafter, the enchantment lasts as long as the priest speaks, to a maximum of one hour. Those enthralled take no action while the priest speaks, and for 1d3 rounds thereafter while they discuss the matter. Those entering the area of effect must also successfully save vs. spell or become enthralled. Those not enthralled are 50% likely every turn to hoot and jeer in unison. If there is excessive jeering, the rest are allowed a new saving throw. The speech ends (but the 1d3 round delay still applies) if the priest is successfully attacked or performs any action other than speaking.\n&emsp;If the audience is attacked, the spell ends and the audience reacts immediately, rolling a reaction check with respect to the source of the interruption, at a penalty of –10.\n&emsp;Note: When handling a large number of saving throws for similar creatures, the DM can assume an average to save time; for example, a crowd of 20 men with a base saving throw of 16 (25% success chance) will have 15 men enthralled and five not.'
};

pri2['Find Traps'] = {
    'level': '2',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': '3 turns',
    'aoe': '10 feet x 30 yards',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 260',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a priest casts a *find traps* spell, all traps—concealed normally or magically—of magical or mechanical nature become apparent to him. Note that this spell is directional, and the caster must face the desired direction in order to determine if a trap is laid in that particular direction.\n&emsp;A trap is any device or magical ward that meets three criteria: it can inflict a sudden or unexpected result, the spellcaster would view the result as undesirable or harmful, and the harmful or undesirable result was specifically intended as such by the creator. Thus, traps include alarms, glyphs, and similar spells or devices.\n&emsp;The caster learns the general nature of the trap (magical or mechanical) but not its exact effect, nor how to disarm it. Close examination will, however, enable the caster to sense what intended actions might trigger it. Note that the caster’s divination is limited to his knowledge of what might be unexpected and harmful. The spell cannot predict actions of creatures (hence, a concealed murder hole or ambush is not a trap), nor are natural hazards considered traps (a cavern that floods during a rain, a wall weakened by age, a naturally poisonous plant, etc.). If the DM is using specific glyphs or sigils to identify magical wards (see the 3rd-level spell *glyph of warding*), this spell shows the form of the glyph or mark. The spell does not detect traps that have been disarmed or are otherwise inactive.'
};

pri2['Fire Trap'] = {
    'level': '2',
    'school': 'Abjuration, Evocation',
    'sphere': 'Elemental (Fire)',
    'range': 'Touch',
    'duration': 'Permanent until discharged',
    'aoe': 'Object touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': '½',
    'materials': 'Holly berries.',
    'reference': 'p. 260',
    'book': 'PHB',
    'damage': '1d4+[[@{level-priest}]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'Any closeable item (book, box, bottle, chest, coffer, coffin, door, drawer, and so forth) can be warded by a *fire trap* spell. The spell is centered on a point selected by the spellcaster. The item so trapped cannot have a second closure or warding spell placed upon it. A *knock* spell cannot affect a fire trap in any way—as soon as the offending party opens the item, the trap discharges. As with most magical traps, a thief has only half his normal find traps score to detect a fire trap. Failure to remove it successfully detonates it immediately. An unsuccessful *dispel magic* spell will not detonate the spell. When the trap is discharged, there will be an explosion of 5-foot radius from the spell’s center. All creatures within this area must roll saving throws vs. spell. Damage is 1d4 points plus 1 point per level of the caster, and half that total amount for creatures successfully saving. (Under water, this ward inflicts half damage and creates a large cloud of steam.) The item trapped is not harmed by this explosion. [[@{level-priest}]]The caster can use the trapped object without discharging it, as can any individual to whom the spell was specifically attuned when cast (the method usually involves a key word).\n&emsp;To place this spell, the caster must trace the outline of the closure with a stick of charcoal and touch the center of the effect. Attunement to another individual requires a hair or similar object from the individual.'
};

pri2['Flame Blade'] = {
    'level': '2',
    'school': 'Evocation',
    'sphere': 'Elemental (Fire)',
    'range': '0',
    'duration': '[[4+floor([[@{level-priest}]]/2)]]',
    'aoe': '3-foot long blade',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A leaf of sumac and the caster’s holy symbol',
    'reference': 'p. 260',
    'book': 'PHB',
    'damage': '1d4+4 (+/-2)',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'With this spell, the caster causes a blazing ray of red-hot fire to spring forth from his hand. This bladelike ray is wielded as if it were a scimitar. If the caster successfully hits with the flame blade in melee combat, the creature struck suffers 1d4+4 points of damage, with a damage bonus of +2 (i.e., 7–10 points) if the creature is undead or is especially vulnerable to fire. If the creature is protected from fire, the damage inflicted is reduced by 2 (i.e., 1d4+2 points). Fire dwellers and those using fire as an innate attack form suffer no damage from the spell. The flame blade can ignite combustible materials such as parchment, straw, dry sticks, cloth, etc. However, it is not a magical weapon in the normal sense of the term, so creatures (other than undead) struck only by magical weapons are not harmed by it. This spell does not function under water.'
};

pri2['Goodberry'] = {
    'level': '2',
    'school': 'Alteration, Evocation (Reversible)',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': '[[1+[[@{level-priest}]] ]] days',
    'aoe': '[[2d4]] fresh berries',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol passed over the freshly picked, edible berries to be enspelled (blueberries, blackberries, raspberries, currants, gooseberries, etc.).',
    'reference': 'p. 260',
    'book': 'PHB',
    'damage': '1',
    'damage-type': 'Poison',
    'healing': '1',
    'effect': 'Casting a *goodberry* spell upon a handful of freshly picked berries makes 2d4 of them magical. The caster (as well as any other caster of the same faith and 3rd or higher level) can immediately discern which berries are affected. A *detect magic* spell discovers this also. Berries with the magic either enable a hungry creature of approximately man size to eat one and be as well-nourished as if a full normal meal were eaten, or else cure 1 point of physical damage from wounds or other similar causes, subject to a maximum of 8 points of such curing in any 24-hour period.\n&emsp;The reverse of the spell, *badberry*, causes 2d4 rotten berries to appear wholesome, but each actually delivers 1 point of poison damage (no saving throw) if ingested.'
};

pri2['Heat Metal'] = {
    'level': '2',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Fire)',
    'range': '40 yards',
    'duration': '7 rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': 'A holy symbol.',
    'reference': 'p. 261',
    'book': 'PHB',
    'damage': 'See below',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of the *heat metal* spell, the caster is able to make ferrous metal (iron, iron alloys, steel) extremely hot. Elven chain mail is not affected, and magical metal armor receives an item saving throw vs. magical fire to avoid being heated.\n&emsp;On the first round of the spell, the metal merely becomes very warm and uncomfortable to touch (this is also the effect on the last melee round of the spell’s duration). During the second and sixth (next to the last) rounds, heat causes blisters and damage; in the third, fourth, and fifth rounds, the metal becomes searing hot, causing damage to exposed flesh, as shown below:}}{{style=center sheet-spell-bottom2}}{{c1-1=**Metal Temperature**}}{{c2-1=very warm}}{{c3-1=hot}}{{c4-1=searing&ast;}}{{c1-2=**Damage per Round**}}{{c2-2=none}}{{c3-2=1d4 points}}  {{c4-2=2d4 points}}  {{c5-1=&emsp;}}{{cc6-1=justify}}{{cs6-1=2}}{{c6-1=* On the final round of searing, the afflicted creature must roll a successful saving throw vs. spell or suffer one of the following disabilities: hand or foot—becomes unusable for 2d4 days; body—becomes disabled for 1d4 days; head—fall unconscious for 1d4 turns. This effect can be completely removed by the 6th-level priest spell heal spell or by normal rest.}}{{c7-1=&emsp;}}{{cc8-1=justify}}{{cs8-1=2}}{{c8-1=&emsp;Note also that materials such as wood, leather, or flammable cloth smolder and burn if exposed to searing hot metal. Such materials cause searing damage to exposed flesh on the next round. Fire resistance (spell, potion, or ring) or a *protection from fire* spell totally negates the effects of a *heat metal* spell, as does immersion in water or snow, or exposure to a *cold* or *ice storm* spell. This version of the spell does not function under water. For every two experience levels of the caster, the metal of one man-sized creature can be affected (i.e., arms and armor, or a single mass of metal equal to 50 pounds of weight). Thus, a 3rd-level caster would affect one such creature, a 4th- or 5th-level caster two, etc.\n&emsp;The reverse of the spell, *chill metal*, counters a *heat metal* spell or else causes metal to act as follows:}}{{c9-1=&emsp;}}{{c10-1=**Metal Temperature**}}{{c11-1=cold}}{{c12-1=icy}}{{c13-1=freezing&ast;}}{{c10-2=**Damage per Round**}}{{c11-2=none}}{{c12-2=1–2 points}}{{c13-2=1d4 points}}{{effects2=&emsp;&ast; On the final round of freezing, the afflicted creature must roll a successful saving throw vs. spell or suffer from the numbing effects of the cold. This causes the loss of all feeling in a hand (or hands, if the DM rules the saving throw was failed badly) for 1d4 days. During this time, the character’s grip is extremely weak and he cannot use that hand for fighting or any other activity requiring a firm grasp.\n&emsp;The *chill metal* spell is countered by a *resist cold* spell, or by any great heat—proximity to a blazing fire (not a mere torch), a magical *flaming sword*, a *wall of fire* spell, etc. Under water, this version of the spell inflicts no damage, but ice immediately forms around the affected metal, exerting an upward buoyancy.'
};

pri2['Hold Person'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Charm',
    'sphere-spells&magic': 'Charm, Law',
    'range': '120 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '[[1d4]] persons in a 20-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'A small, straight piece of iron as the material component of this spell.',
    'reference': 'p. 261',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell holds 1d4 humans, demihumans, or humanoid creatures rigidly immobile and in place for a minimum of six rounds (the spell lasts 2 rounds per caster level, and the priest must be of at least 3rd level to cast the spell).\n&emsp;The *hold person* spell affects any bipedal human, demihuman, or humanoid of man size or smaller, including brownies, dryads, dwarves, elves, gnolls, gnomes, goblins, half-elves, halflings, half-orcs, hobgoblins, humans, kobolds, lizard men, nixies, orcs, pixies, sprites, troglodytes, and others. Thus, a 10th-level fighter could be held, while an ogre could not.\n&emsp;The effect is centered on a point selected by the caster, and it affects persons selected by the caster within the area of effect. If the spell is cast at three persons, each gets a normal saving throw; if only two persons are being enspelled, each rolls his saving throw with a –1 penalty; if the spell is cast at only one person, the saving throw die roll suffers a –2 penalty. Saving throws are adjusted for Wisdom. Those who succeed on their saving throws are totally unaffected by the spell. Undead creatures cannot be held.\n&emsp;Held creatures cannot move or speak, but they remain aware of events around them and can use abilities not requiring motion or speech. Being held does not prevent the worsening of the subjects’ condition due to wounds, disease, or poison. The priest casting the *hold person* spell can end the spell with a single utterance at any time; otherwise, the duration is six rounds at 3rd level, eight rounds at 4th level, etc.'
};

pri2['Know Alignment'] = {
    'level': '2',
    'school': 'Divination (Reversible)',
    'sphere': 'Divination',
    'range': '10 yards',
    'duration': '1 turn',
    'aoe': '1 creature or object',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 261',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *know alignment* spell enables the priest to exactly read the aura of a creature or an aligned object (unaligned objects reveal nothing). The caster must remain stationary and concentrate on the subject for a full round. If the creature rolls a successful saving throw vs. spell, the caster learns nothing about that particular creature from the casting. Certain magical devices negate the power of the *know alignment* spell.\n&emsp;The reverse, *undetectable alignment*, conceals the alignment of an object or creature for 24 hours.'
};

pri2['Messenger'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'sphere-spells&magic': 'Animal, Summoning',
    'range': '[[20*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] days',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 262',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the priest to call upon a tiny (size T) creature of at least animal intelligence to act as his messenger. The spell does not affect giant animals and it does not work on creatures of low (i.e., 5) Intelligence or higher. If the creature is within range, the priest, using some type of food desirable to the animal as a lure, can call the animal to come. The animal is allowed a saving throw vs. spell. If the saving throw is failed, the animal advances toward the priest and awaits his bidding. The priest can communicate with the animal in a crude fashion, telling it to go to a certain place, but directions must be simple. The spellcaster can attach some small item or note to the animal. If so instructed, the animal will then wait at that location until the duration of the spell expires. (Note that unless the intended recipient of a message is expecting a messenger in the form of a small animal or bird, the carrier may be ignored.) When the spell’s duration expires, the animal or bird returns to its normal activities. The intended recipient of a message gains no communication ability.'
};

pri2['Obscurement'] = {
    'level': '2',
    'school': 'Alteration',
    'sphere': 'Weather',
    'range': '0',
    'duration': '[[4*[[@{level-priest}]] ]] rounds',
    'aoe': '[[10*[[@{level-priest}]] ]]-foot square',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 262',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes a misty vapor to arise around the caster. It persists in this locale for four rounds per caster level and reduces the visibility ranges of all types of vision (including infravision) to [[2d4]] feet. The ground area affected by the spell is a square progression based on the caster’s level: a 10-foot × 10-foot area at 1st level, a 20-foot × 20-foot area at 2nd level, a 30-foot × 30-foot area at 3rd level, and so on. The height of the vapor is restricted to 10 feet, although the cloud will otherwise expand to fill confined spaces. A strong wind (such as from the 3rd-level wizard spell *gust of wind*) can cut the duration of an *obscurement* spell by 75%. This spell does not function under water.'
};

pri2['Produce Flame'] = {
    'level': '2',
    'school': 'Alteration',
    'sphere': 'Elemental (Fire)',
    'range': '0',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 262',
    'book': 'PHB',
    'damage': '1d4+1',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'A bright flame, equal in brightness to a torch, springs forth from the caster’s palm when he casts a *produce flame* spell. The flame does not harm the caster, but it is hot and it causes the combustion of flammable materials (paper, cloth, dry wood, oil, etc.). The caster is capable of hurling the magical flame as a missile, with a range of 40 yards (considered short range). The flame flashes on impact, igniting combustibles within a 3-foot diameter of its center of impact, and then it goes out. A creature struck by the flame suffers 1d4+1 points of damage and, if combustion occurs, must spend a round extinguishing the fire or suffer additional damage assigned by the DM until the fire is extinguished. A miss is resolved as a grenadelike missile. If any duration remains to the spell, another flame immediately appears in the caster’s hand. The caster can hurl a maximum of one flame per level, but no more than one flame per round.\n&emsp;The caster can snuff out magical flame any time he desires, but fire caused by the flame cannot be so extinguished. This spell does not function under water.'
};

pri2['Resist Fire/Resist Cold'] = {
    'level': '2',
    'school': 'Alteration',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A drop of mercury as the material component of this spell.',
    'reference': 'p. 262',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is placed upon a creature by a priest, the creature’s body is toughened to withstand heat or cold, as chosen by the caster. The spell grants the creature complete immunity to mild conditions (standing naked in the snow or reaching into an ordinary fire to pluck out a note). The recipient can somewhat resist intense heat or cold (whether natural or magical in origin), such as red-hot charcoal, a large amount of burning oil, flaming swords, fire storms, fireballs, meteor swarms, red dragon’s breath, frostbrand swords, ice storms, *wands of frost*, or white dragon’s breath. In all of these cases, the temperature affects the creature to some extent. The recipient of the spell gains a bonus of +3 to saving throws against such attack forms and all damage sustained is reduced by 50%; therefore, if the saving throw is failed, the creature sustains one-half damage, and if the saving throw is successful, the creature sustains only one-quarter damage. Resistance to fire lasts for one round for each experience level of the priest placing the spell.'
};

pri2['Silence, 15\' Radius'] = {
    'level': '2',
    'school': 'Alteration',
    'sphere': 'Guardian',
    'range': '120 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '15-foot-radius',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 263',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, complete silence prevails in the affected area. All sound is stopped: Conversation is impossible, spells cannot be cast (or at least not those with verbal components, if the optional component rule is used), and no noise whatsoever issues from or enters the area. The spell can be cast into the air or upon an object, but the effect is stationary unless cast on a mobile object or creature. The spell lasts two rounds for each level of experience of the priest. The spell can be centered upon a creature, and the effect then radiates from the creature and moves as it moves. An unwilling creature receives a saving throw against the spell. If the saving throw is successful, the spell effect is centered about 1 foot behind the position of the subject creature at the instant of casting. This spell provides a defense against sound-based attacks, such as harpy singing, *horn of blasting*, etc.'
};

pri2['Slow Poison'] = {
    'level': '2',
    'school': 'Necromancy',
    'sphere': 'Healing',
    'sphere-necromancers': ', Necromantic',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A bud of garlic that must be crushed and smeared on the wound (or eaten if poison was ingested) and the priest’s holy symbol',
    'reference': 'p. 263',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is placed upon a poisoned individual, it greatly slows the effects of venom, if cast upon the victim before the poison takes full effect. (This period, known as the onset time, is known to the DM.) While this spell does not neutralize the venom, it does prevent it from substantially harming the individual for the duration of its magic in the hope that, during that spell period, the poison can be fully cured.'
};

pri2['Snake Charm'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'sphere-spells&magic': 'Animal, Charm',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': '30-foot cube',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 263',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, a hypnotic pattern is set up that causes one or more snakes to cease all activity except a semierect, swaying movement. If the snakes are charmed while in a torpor, the duration of the spell is 1d4+2 turns; if the snakes are not torpid, but are not aroused and angry, the charm lasts 1d3 turns; if the snakes are angry or attacking, the spell lasts 1d4+4 rounds. The priest casting the spell can charm snakes whose total hit points are less than or equal to those of the priest. On the average, a 1st-level priest could charm snakes with a total of 4 or 5 hit points; a 2nd-level priest could charm 9 hit points, etc. The hit points can be those of a single snake or those of several of the reptiles, but the total hit points cannot exceed those of the priest casting the spell. A 23-hit point caster charming a dozen 2-hit point snakes would charm 11 of them. This spell is also effective against any ophidian or ophidianoid monster, such as naga, couatl, etc., subject to magic resistance, hit points, and so forth.\n&emsp;Variations of this spell may exist, allowing other creatures significant to a particular mythos to be affected. Your DM will inform you if such spells exist.'
};

pri2['Speak With Animals'] = {
    'level': '2',
    'school': 'Alteration',
    'sphere': 'Animal, Divination',
    'sphere-spells&magic': 'Animal',
    'range': '0',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '1 animal within 30 feet',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 263',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell empowers the priest to comprehend and communicate with any warm- or cold-blooded normal or giant animal that is not mindless. The priest is able to ask questions of and receive answers from the creature, although friendliness and cooperation are by no means assured. Furthermore, terseness and evasiveness are likely in basically wary and cunning creatures (the more stupid ones will instead make inane comments). If the animal is friendly or of the same general alignment as the priest, it may do some favor or service for the priest (as determined by the DM). Note that this spell differs from the *speak with monsters* spell, for this spell allows conversation only with normal or giant nonfantastic creatures such as apes, bears, cats, dogs, elephants, and so on.'
};

pri2['Spiritual Hammer'] = {
    'level': '2',
    'school': 'Invocation',
    'sphere': 'Combat',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[3*[[@{level-priest}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A normal war hammer.',
    'reference': 'p. 263',
    'book': 'PHB',
    'damage': 'S/M: 1d4+1+[[{{[[ceil([[@{level-priest}]]/6)]],3}kl1}]] / Large: 1d4+[[{{[[ceil([[@{level-priest}]]/6)]],3}kl1}]]',
    'damage-type': '',
    'healing': '',
    'effect': 'By calling upon his deity, the caster of a *spiritual hammer* spell brings into existence a field of force shaped vaguely like a hammer. As long as the caster concentrates upon the hammer, it strikes at any opponent within its range, as desired. Each round the caster can choose to attack the same target as the previous round or switch to a new target that he can see anywhere within his maximum range. The spiritual hammer’s chance to successfully hit is equal to that of the caster, without any Strength bonuses. In addition, it strikes as a magical weapon with a bonus of +1 for every six experience levels (+[[{{[[ceil([[@{level-priest}]]/6)]],3}kl1}]]) (or fraction) of the spellcaster, up to a total of +3 to the attack roll and +3 to the damage roll for a 13th-level caster. The base damage inflicted when it scores a hit is exactly the same as a normal war hammer (1d4+1 points on opponents of man size or smaller, or 1d4 points on larger opponents, plus the magical bonus). The hammer strikes in the same direction as the caster is facing, so if he is behind the target, all bonuses for rear attack are gained along with the loss of any modifications to the target’s AC for shield and Dexterity.\n&emsp;As soon as the caster ceases concentration, the *spiritual hammer* spell ends. A *dispel magic* spell that includes either the caster or the force in its area of effect has a chance to dispel the spiritual hammer. If an attacked creature has magic resistance, the resistance is checked the first time the spiritual hammer strikes. If the hammer is successfully resisted, the spell is lost. If not, the hammer has its normal full effect for the duration of the spell.\n&emsp;The material component of this spell is a normal war hammer that the priest must hurl toward opponents while uttering a plea to his deity. The hammer disappears when the spell is cast.'
};

pri2['Trip'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '1 object up to 10 feet long',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 264',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This magic must be cast upon a normal object—a length of vine, a stick, a pole, a rope, or a similar object. The spell causes the object to rise slightly off the ground or floor it is resting on to trip most creatures crossing it, if they fail their saving throws vs. spell. Note that only as many creatures can be tripped as are actually stepping across the enchanted object. Thus, a 3-foot-long piece of rope could trip only one man-sized creature. Creatures moving at a very rapid pace (running) when tripped suffer 1 point of damage and are stunned for 1d4+1 rounds if the surface they fall upon is very hard (if it is turf or other soft material, they are merely stunned for the rest of that round). Very large creatures, such as elephants, are not affected at all by a *trip* spell. The object continues to trip all creatures passing over it, including the spellcaster, for as long as the spell duration lasts. A creature aware of the object and its potential adds a +4 bonus to its saving throw roll when crossing the object. The enchanted object is 80% undetectable unless a means that detects magical traps is employed or the operation of the spell is observed. This spell does not function under water.'
};

pri2['Warp Wood'] = {
    'level': '2',
    'school': 'Alteration (Reversible)',
    'sphere': 'Plant',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 264',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the priest causes a volume of wood to bend and warp, permanently destroying its straightness, form, and strength. The range of a *warp wood* spell is 10 yards for each level of experience of the caster. It affects approximately a 15-inch shaft of wood of up to 1-inch diameter per level of the caster. Thus, at 1st level, a caster might be able to warp a hand axe handle or four crossbow bolts; at 5th level, he could warp the shaft of a typical spear. Note that boards or planks can also be affected, causing a door to be sprung or a boat or ship to leak. Warped missile weapons are useless; warped melee weapons suffer a –4 penalty to their attack rolls.\n&emsp;Enchanted wood is affected only if the spellcaster is of higher level than the caster of the prior enchantment. The spellcaster has a 20% cumulative chance of success per level of difference (20% if one level higher, 40% if two levels higher, etc.). Thus, a door magically held or wizard locked by a 5th-level wizard is 40% likely to be affected by a *warp wood* spell cast by a 7th-level priest. Wooden magical items are considered enchanted at 12th level (or better). Extremely powerful items, such as artifacts, are unaffected by this spell.\n&emsp;The reversed spell, *straighten wood*, straightens bent or crooked wood, or reverses the effects of a *warp wood* spell, subject to the same restrictions.'
};

pri2['Withdraw'] = {
    'level': '2',
    'school': 'Ateration',
    'sphere': 'Protection',
    'range': '0',
    'duration': 'Special',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 264',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *withdraw* spell, the priest in effect alters the flow of time with regard to himself. While but one round of time passes for those not affected by the spell, the priest is able to spend two rounds, plus one round per level, in contemplation ([[2+[[@{level-priest}]] ]] rounds). Thus, a 5th-level priest can withdraw for seven rounds to cogitate on some matter while one round passes for all others. (The DM should allow the player one minute of real time per round withdrawn to ponder some problem or question. No discussion with other players is permitted.) Note that while affected by the *withdraw* spell, the caster can use only the following spells: any divination spell or any curing or healing spell, the latter on himself only. The casting of any of these spells in different fashion (for example, a *cure light wounds* spell bestowed upon a companion) negates the *withdraw* spell. Similarly, the withdrawn caster cannot walk or run, become invisible, or engage in actions other than thinking, reading, and the like. He can be affected by the actions of others, losing any Dexterity or shield bonus. Any successful attack upon the caster breaks the spell.'
};

pri2['Wyvern Watch'] = {
    'level': '2',
    'school': 'Evocation',
    'sphere': 'Guardian',
    'range': '30 yards',
    'duration': 'Up to 8 hours',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'The priest’s holy symbol.',
    'reference': 'p. 264',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is known as *wyvern watch* because of the insubstantial haze brought forth by its casting, which vaguely resembles a wyvern. It is typically used to guard some area against intrusion. Any creature approaching within 10 feet of the guarded area may be affected by the “wyvern.” Any creature entering the guarded area must roll a successful saving throw vs. spell or stand paralyzed for one round per level of the caster ([[@{level-priest}]] rounds), until freed by the spellcaster, by a *dispel magic* spell, or by a *remove paralysis* spell. A successful saving throw indicates that the subject creature was missed by the attack of the wyvern-form, and the spell remains in place. As soon as a subject creature is successfully struck by the wyvern-form, the paralysis takes effect and the force of the spell dissipates. The spell force likewise dissipates if no intruder is struck by the wyvern-form for eight hours after the spell is cast. Any creature approaching the space being guarded by the wyvern-form may be able to detect its presence before coming close enough to be attacked; this chance of detection is 90% in bright light, 30% in twilight conditions, and 0% in darkness.'
};

const pri3 = {};
pri3['Animate Dead'] = {
    'level': '3',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A drop of blood, a piece of flesh of the type of creature being animated, and pinch of bone powder or a bone shard',
    'reference': 'p. 265',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates the lowest of the undead monsters, skeletons or zombies, usually from the bones or bodies of dead humans, demihumans, or humanoids. The spell causes these remains to become animated and obey the simple verbal commands of the caster, regardless of how they communicated in life. The skeletons or zombies can follow the caster, remain in an area and attack any creature (or just a specific type of creature) entering the place, etc. The undead remain animated until they are destroyed in combat or are turned; the magic cannot be dispelled.\n&emsp;The priest can animate one skeleton or one zombie for each experience level he has attained. Currently [[@{level-priest}]] skeletons. If creatures with more than 1+ Hit Dice are animated, the number is determined by the monster Hit Dice. Skeletal forms have the Hit Dice of the original creature, while zombie forms have 1 more Hit Die. Thus, a 12th-level priest could animate 12 dwarven skeletons (or six zombies), four zombie gnolls, or a single zombie fire giant. Note that this is based on the standard racial Hit Die norm; thus, a high-level adventurer would be animated as a skeleton or zombie of 1 or 2 Hit Dice, and without special class or racial abilities. The caster can, alternatively, animate two small animal skeletons (1-1 Hit Die or less) for every level of experience he has achieved. Currently [[2*[[@{level-priest}]] ]] animal skeletons.\n&emsp;Casting this spell is not a good act, and only evil priests use it frequently.'
};

pri3['Call Lightning'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Weather',
    'range': '360 yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '10-foot radius',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': '½',
    'materials': '',
    'reference': 'p. 266',
    'book': 'PHB',
    'damage': '[[2d8+[[@{level-priest}]]d8]]',
    'damage-type': 'Electrical',
    'healing': '',
    'effect': 'When a *call lightning* spell is cast, there must be a storm of some sort in the area—a rain shower, clouds and wind, hot and cloudy conditions, or even a tornado (including a whirlwind formed by a djinn or air elemental of 7 Hit Dice or more). The caster is then able to call down bolts of lightning. The caster can call down one bolt per turn. The caster need not call a bolt of lightning immediately—other actions, even spellcasting, can be performed; however, the caster must remain stationary and concentrate for a full round each time a bolt is called. The spell has a duration of one turn per caster level. Each bolt causes 2d8 points of electrical damage, plus an additional 1d8 points for each of the caster’s experience levels. Thus, a 4th-level caster calls down a 6d8 bolt (2d8+4d8).\n&emsp;The bolt of lightning flashes down in a vertical stroke at whatever distance the spellcaster decides, up to 360 yards away. Any creature within a 10-foot radius of the path or the point where the lightning strikes suffers full damage unless a successful saving throw vs. spell is rolled, in which case only one-half damage is taken.\n&emsp;Because it requires a storm overhead, this spell can only be used outdoors. It does not function under ground or under water.'
};

pri3['Continual Light'] = {
    'level': '3',
    'school': 'Alteration (Reversible)',
    'sphere': 'Sun',
    'sphere-spells&magic': 'Creation, Guardian, Sun',
    'range': '120 yards',
    'duration': 'Permanent',
    'aoe': '60-foot radius',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 266',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to a *light* spell, except that it is as bright as full daylight and lasts until negated by magical darkness or by a *dispel magic* spell. Creatures with penalties in bright light suffer them in this spell’s area of effect. As with the *light* spell, this can be cast into the air, onto an object, or at a creature. In the third case, the continual light affects the space about 1 foot behind a creature that successfully rolls its saving throw vs. spell (a failed saving throw means the continual light is centered on the creature and moves as it moves). Note that this spell also blinds a creature if it is successfully cast upon the creature’s visual organs. If the spell is cast on a small object that is then placed in a light-proof covering, the spell effects are blocked until the covering is removed.\n&emsp;Continual light brought into an area of magical darkness (or vice versa) cancels the darkness so that the otherwise prevailing light conditions exist in the overlapping areas of effect. A direct casting of a *continual light* spell against a similar or weaker magical darkness cancels both.\n&emsp;This spell eventually consumes the material it is cast upon, but the process takes far longer than the time in a typical campaign. Extremely hard and expensive materials might last hundreds or even thousands of years.\n&emsp;The reverse spell, *continual darkness*, causes complete absence of light (pitch blackness), similar to the *darkness* spell but of greater duration and area.'
};

pri3['Create Food & Water'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Creation',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '[[@{level-priest}]] cubic feet',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 266',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the priest causes food and water to appear. The food thus created is highly nourishing if rather bland; each cubic foot of the material sustains three human-sized creatures or one horse-sized creature for a full day. The food decays and becomes inedible within 24 hours, although it can be restored for another 24 hours by casting a *purify food and water* spell upon it. The water created by this spell is the same as that created by the 1st-level priest spell create water. For each experience level the priest has attained, 1 cubic foot of food or water is created by the spell. For example, a 2nd-level priest could create 1 cubic foot of food and 1 cubic foot of water.'
};

pri3['Cure Blindness or Deafness'] = {
    'level': '3',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Necromantic',
    'sphere-spells&magic': 'Healing',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 266',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By touching the creature afflicted, the priest employing the spell can permanently cure some forms of blindness or deafness. This spell does not restore or repair visual or auditory organs damaged by injury or disease.\n&emsp;Its reverse, *cause blindness or deafness*, requires a successful touch (successful attack roll) on the victim. If the victim rolls a successful saving throw, the effect is negated. If the saving throw is failed, a nondamaging magical blindness or deafness results.\n&emsp;A deafened creature can react only to what it can see or feel, and suffers a -1 penalty to surprise rolls, a +1 penalty to its initiative rolls, and a 20% chance of spell failure for spells with verbal components. A blinded creature suffers a -4 penalty to its attack rolls, a +4 penalty to its Armor Class, and a +2 penalty to its initiative rolls.'
};

pri3['Cure Disease'] = {
    'level': '3',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Necromantic',
    'sphere-spells&magic': 'Healing',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 267',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to cure most diseases by placing his hand upon the diseased creature. The affliction rapidly disappears thereafter, making the cured creature whole and well in from one turn to 10 days, depending on the type of disease and the state of its advancement when the cure took place. (The DM must adjudicate these conditions.) The spell is also effective against parasitic monsters such as green slime, rot grubs, and others. When cast by a priest of at least 12th level, this spell cures lycanthropy if cast within three days of the infection. Note that the spell does not prevent reoccurrence of a disease if the recipient is again exposed.\n&emsp;The reverse of the *cure disease* spell is *cause disease*. To be  effective, the priest must touch the intended victim, and the victim must fail a saving throw vs. spell. The severity of the disease is decided by the priest (debilitating or fatal). The exact details of the disease are decided by the DM, but the following are typical:\n&emsp;*Debilitating:* The disease takes effect in 1d6 turns, after which the creature loses 1 point of Strength per hour until his Strength is reduced to 2 or less, at which time the recipient is weak and virtually helpless. If a creature has no Strength rating, it loses 10% of its hit points per Strength loss, down to 10% of its original hit points. If the disease also affects hit points, use the more severe penalty. Recovery requires a period of 1d3 weeks.\n&emsp;*Fatal:* This wasting disease is effective immediately. Infected creatures receive no benefit from *cure wound* spells while the disease is in effect; wounds heal at only 10% of the natural rate. The disease proves fatal within 1d6 months and can be cured only by magical means. Each month the disease progresses, the creature loses 2 points of Charisma, permanently.\n&emsp;The inflicted disease can be cured by the *cure disease* spell. Lycanthropy cannot be caused'
};

pri3['Dispel Magic'] = {
    'level': '3',
    'school': 'Abjuration',
    'sphere': 'Protection',
    'sphere-spells&magic': 'All',
    'range': '60 yards',
    'duration': 'Special',
    'aoe': '30-foot cube or 1 item',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 267',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a priest casts this spell, it has a chance to neutralize or negate the magic it comes in contact with as follows:\n&emsp;First, it has a chance to remove spells and spell-like effects (including device effects and innate abilities) from creatures or objects. Second, it may disrupt the casting or use of these in the area of effect at the instant the dispel is cast. Third, it may destroy magical potions (which are treated as 12th level for purposes of this spell).\n&emsp;Each effect or potion in the spell’s area is checked to determine if it is dispelled. The caster can always dispel his own magic; otherwise, the chance depends on the difference in level between the magical effect and the caster. The base chance of successfully dispelling is 11 or higher on 1d20. If the caster is of higher level than the creator of the effect to be dispelled, the difference is *subtracted* from this base number needed. If the caster is of lower level, the difference is *added* to the base. A die roll of 20 always succeeds and a die roll of 1 always fails. Thus, if a caster is 10 levels higher than the magic he is trying to dispel, only a roll of 1 prevents the effect from being dispelled.\n&emsp;You dispel all effects and potions at level [[1d20-11+[[@{level-priest}]] ]] and below!\n&emsp;A *dispel magic* can affect only a specially enchanted item (such as a magical scroll, ring, wand, rod, staff, miscellaneous item, weapon, shield, or armor) if it is cast directly upon the item. This renders the item nonoperational for 1d4 rounds. An item possessed or carried by a creature has the creature’s saving throw against this effect; otherwise, it is automatically rendered nonoperational. An interdimensional interface (such as a *bag of holding*) rendered nonoperational is temporarily closed. Note that an item’s physical properties are unchanged: A nonoperational magical sword is still a sword.  Artifacts and relics are not subject to this spell, but some of their spell-like effects may be, at the DM’s option. Note that this spell, if successful, will release charmed and similarly beguiled creatures. Certain spells or effects cannot be dispelled; these are listed in the spell descriptions.}}{{style=bottom3}}{{cs1-1=3}}{{cc1-1=center}}{{c1-1=**Summary of Dispel Magic Effects**}}{{c2-1=**Source of Effect**}}{{c3-1=Caster}}{{c4-1=Other caster/}}{{c5-1=&emsp;innate ability}}{{c6-1=Wand}}{{c7-1=Staff}}{{c8-1=Potion}}{{c9-1=Other magic}}{{c10-1=Artifact}}{{cc2-2=bottom}}{{c2-2=**Resists As**}}{{c3-2=None}}{{c4-2=Leve/HD of}}{{c5-2=&emsp;other caster}}{{c6-2=6th level}}{{c7-2=8th level}}{{c8-2=12th level}}{{c9-2=12th, unless special}}{{c10-2=DM discretion}}{{c2-3=**Result of Dispel**}}{{c3-3=Dispel automatic}}{{c5-3=Effect negated}}{{c6-3=&#42;}}{{c7-3=&#42}}{{c8-3=Potion destroyed}}{{c9-3=&#42}}{{c10-3=DM discretion}}{{effects2=&#42 Effect negated; if cast directly on item, item becomes nonoperational for 1d4 rounds.',
};

pri3['Feign Death'] = {
    'level': '3',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': '1 turn + [[@{level-priest}]] rounds',
    'aoe': 'Person touched',
    'components': 'V',
    'cast-time': '½',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 267',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster or any other willing person can be put into a cataleptic state that is impossible to distinguish from actual death. Although the person affected can smell, hear, and know what is going on, no feeling or sight of any sort is possible; thus, any wounding or mistreatment of the body is not felt, no reaction occurs, and damage is only one-half normal. In addition, paralysis, poison, or energy level drain does not affect a person under the influence of this spell, but poison injected or otherwise introduced into the body becomes effective when the spell recipient is no longer under the influence of this spell, although a saving throw is permitted. However, the spell offers no protection from causes of certain death—being crushed under a landslide, etc. Only a willing individual can be affected by a *feign death* spell. The priest is able to end the spell effect at any time, but it requires a full round for bodily functions to begin again.\n&emsp;Note that, unlike the wizard version of this spell, only people can be affected, and that those of any level can be affected by the priest casting this spell.'
};

pri3['Flame Walk'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Elemental (Fire)',
    'range': 'Touch',
    'duration': '[[1+[[@{level-priest}]] ]] rounds',
    'aoe': '[[ [[@{level-priest}]]-4]] Creature(s) touched',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and at least 500 gp of powdered ruby per affected creature',
    'reference': 'p. 268',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster empowers one or more creatures to withstand nonmagical fires of temperatures up to 2,000° F. (1093° C) (enabling them to walk upon molten lava). It also confers a +2 bonus to saving throws against magical fire and reduces damage from such fires by one-half, even if the saving throw is failed. For every experience level above the minimum required to cast the spell (5th), the priest can affect an additional creature. This spell is not cumulative with *resist fire* spells or similar protections.'
};

pri3['Glyph of Warding'] = {
    'level': '3',
    'school': 'Abjuration, Evocation',
    'sphere': 'Guardian',
    'range': 'Touch',
    'duration': 'Until discharged',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'Special',
    'materials': 'Incense and, if the area exceeds 50 sq. ft., 2000 gp worth of powdered diamond',
    'reference': 'p. 268',
    'book': 'PHB',
    'damage': '[[ [[@{level-priest}]]d4]]',
    'damage-type': 'varies',
    'healing': '',
    'effect': 'A glyph of warding is a powerful inscription magically drawn to prevent unauthorized or hostile creatures from passing, entering, or opening. It can be used to guard a small bridge, to ward an entry, or as a trap on a chest or box.\n&emsp;The priest must set the conditions of the ward; typically any creature violating the warded area without speaking the name of the glyph is subject to the magic it stores. A successful saving throw vs. spell enables the creature to escape the effects of the glyph. Glyphs can be set according to physical characteristics, such as creature type, size, and weight. Glyphs can also be set with respect to good or evil, or to pass those of the caster’s religion. They cannot be set according to class, Hit Dice, or level. Multiple glyphs cannot be cast on the same area; although if a cabinet had three drawers, each could be separately warded.\n&emsp;When the spell is cast, the priest weaves a tracery of faintly glowing lines around the warding sigil. For every 5 square feet of area to be protected, one round is required to trace the warding lines of the glyph. The caster can affect an area equal to a square the sides of which are the same as his level, in feet. The glyph can be placed to conform to any shape up to the limitations of the caster’s total square footage. Thus, a 6th-level caster could place a glyph on a 6-foot × 6-foot square, a 4-foot × 9-foot rectangle, a 2-foot × 18-foot band, or a 1-foot by 36-foot strip. When the spell is completed, the glyph and tracery become invisible.\n&emsp;The priest traces the glyph with incense, which, if the area exceeds 50 square feet, must be sprinkled with powdered diamond (at least 2,000 gp worth).\n&emsp;Typical glyphs shock for 1d4 points of electrical damage per level of the spellcaster, explode for a like amount of fire damage, paralyze, blind, deafen, and so forth. The DM may allow any harmful priest spell effect to be used as a glyph, provided the caster is of sufficient level to cast the spell. Successful saving throws either reduce effects by one-half or negate them, according to the glyph employed. Glyphs cannot be affected or bypassed by such means as physical or magical probing, though they can be dispelled by magic and foiled by high-level thieves using their find-and-remove-traps skill.\n&emsp;The DM may decide that the exact glyphs available to a priest depend on his religion, and he might make new glyphs available according to the magical research rules.'
};

pri3['Hold Animal'] = {
    'level': '3',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'range': '80 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '1–4 animals in 40-foot cube',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 268',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster holds one to four animals rigid. Animals affected are normal or giant-sized mammals, birds, or rep-tiles, but not monsters such as centaurs, gorgons, harpies, naga, etc. Apes, bears, crocodiles, dogs, eagles, foxes, giant beavers, and similar animals are subject to this spell. The hold lasts for two rounds per caster level. The caster decides how many animals can be affected, but the greater the number, the better chance each has to successfully save against the spell. Each animal gets a saving throw: If only one is the subject of the spell, it has a penalty of –4 on its roll; if two are subject, each receives a penalty of –2 on its roll; if three are subject, each receives a penalty of –1 on its roll; and if four are subject, each gets an unmodified saving throw.\n&emsp;A maximum body weight of 400 pounds (100 pounds for non-mammals) per animal per caster level can be affected. (Currently [[400*[[@{level-priest}]] ]]-pound mammals or [[100*[[@{level-priest}]] ]]-pound nonmammals) —for example, an 8th-level caster can affect up to four 3,200-pound mammals or a like number of 800-pound nonmammals, such as birds or reptiles.'
};

pri3['Locate Object'] = {
    'level': '3',
    'school': 'Divination (Reversible)',
    'sphere': 'Divination',
    'range': '[[60+10*[[@{level-priest}]] ]] yards',
    'duration': '8 hours.',
    'aoe': '1 object',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A piece of lodestone',
    'reference': 'p. 268',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell helps locate a known or familiar object. The priest casts the spell, slowly turns, and will sense when he is facing in the direction of the object to be located, provided the object is within range—for example, 90 yards for 3rd-level priests, 100 yards for 4th, 110 yards for 5th, etc. The spell locates such objects as apparel, jewelry, furniture, tools, weapons, or even a ladder or stairway. Once the caster has fixed in his mind the items sought, the spell locates only that item. Attempting to find a specific item, such as a kingdom’s crown, requires an accurate mental image. If the image is not close enough to the actual item, the spell does not work; in short, desired but unique objects cannot be located by this spell unless they are known by the caster. The spell is blocked by lead.\n&emsp;The reversal, *obscure object*, hides an object from location by spell, *crystal ball*, or similar means for eight hours. The caster must touch the object being concealed.\n&emsp;Neither application of the spell affects living creatures.'
};

pri3['Magical Vestment'] = {
    'level': '3',
    'school': 'Enchantment',
    'sphere': 'Protection',
    'range': '0',
    'duration': '[[5*[[@{level-priest}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The vestment to be enchanted and the priest’s holy symbol, which are not expended',
    'reference': 'p. 269',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enchants the caster’s vestment, providing protection at least the equivalent of chain mail (AC 5). The vestment gains a +1 enchantment for each three levels of the priest beyond 5th level, to a maximum of AC 1 at 17th level. (Currently +[[{[[floor(([[@{level-priest}]]-5)/3)]],4}kl1]] enchantment for a total of [[5-[[{[[floor(([[@{level-priest}]]-5)/3)]],4}kl1]] ]] AC). The magic lasts for five rounds per level of the caster, or until the caster loses consciousness. If the vest-ment is worn with other armors, only the best AC (either the armor or the vestment) is used; this protection is not cumulative with any other AC protection.'
};

pri3['Meld Into Stone'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Elemental (Earth)',
    'range': '0',
    'duration': '[[8+1d8]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 269',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the priest to meld his body and possessions into a single block of stone. The stone must be large enough to accommodate his body in all three dimensions. When the casting is complete, the priest and not more than 100 pounds of nonliving gear merge with the stone. If either condition is violated, the spell fails and is wasted.\n&emsp;While in the stone, the priest remains in contact, however tenuous, with the face of the stone through which he melded. The priest remains aware of the passage of time. Nothing that goes on outside the stone can be seen or heard, however. Minor physical damage to the stone does not harm the priest, but its partial destruction, if enough so that the caster no longer fits, expels the priest with 4d8 points of damage. The stone’s destruction expels the priest and slays him instantly, unless he rolls a successful saving throw vs. spell.\n&emsp;The magic lasts for 1d8+8 rounds, with the variable part of the duration rolled secretly by the DM. At any time before the duration expires, the priest can step out of the stone through the stone surface he entered. If the duration runs out, or the effect is dispelled before the priest exits the stone, he is violently expelled and suffers 4d8 points of damage.\n&emsp;The following spells harm the priest if cast upon the stone that he is occupying: *stone to flesh* expels the priest and inflicts 4d8 points of damage; *stone shape* causes 4d4 points of damage, but does not expel the priest; *transmute rock to mud* expels and slays him instantly unless he rolls a successful saving throw vs. spell; and *passwall* expels the priest without damage.'
};

pri3['Negative Plane Protection'] = {
    'level': '3',
    'school': 'Abjuration',
    'sphere': 'Protection, Necromantic',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 269',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell affords the caster or touched creature partial protection from undead monsters with Negative Energy plane connections (such as shadows, wights, wraiths, spectres, or vampires) and certain weapons and spells that drain energy levels. The *negative plane protection* spell opens a channel to the Positive Energy plane, possibly offsetting the effect of the negative energy attack. A protected creature struck by a negative energy attack is allowed a saving throw vs. death magic. If successful, the energies cancel with a bright flash of light and a thunderclap. The protected creature suffers only normal hit point damage from the attack and does not suffer any drain of experience or Strength, regardless of the number of levels the attack would have drained. An attacking undead creature suffers 2d6 points of damage from the positive energy; a draining wizard or weapon receives no damage.\n&emsp;This protection is proof against only one such attack, dissipating immediately whether or not the saving throw was successful. If the saving throw is failed, the spell recipient suffers double the usual physical damage, in addition to the loss of experience or Strength that normally occurs. The protection lasts for one turn per level of the priest casting the spell, or until the protected creature is struck by a negative energy attack. This spell cannot be cast on the Negative Energy plane.'
};

pri3['Plant Growth'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '160 yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 269',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *plant growth* spell enables the caster to choose either of two  different uses. The first causes normal vegetation to grow, entwine, and entangle to form a thicket or jungle that creatures must hack or force a way through at a movement rate of 10 feet per round (or 20 feet per round for larger-than-man-sized creatures). Note that the area must have brush and trees in it in order for this spell to take effect. Briars, bushes, creepers, lianas, roots, saplings, thistles, thorn, trees, vines, and weeds become so thick and overgrown in the area of effect as to form a barrier. The area of effect is a square 20 feet on a side per level of experience of the caster, in any square or rectangular shape that the caster decides upon at the time of the spellcasting. (Currently [[20*[[@{level-priest}]]-foot square). Thus, an 8th-level caster can affect a maximum area of a 160-foot × 160-foot square, a 320-foot × 80-foot rectangle, a 640-foot × 40-foot rectangle, a 1,280-foot × 20-foot rectangle, etc. The spell’s effects persist in the area until it is cleared by labor, fire, or such magical means as a *dispel magic* spell.\n&emsp;The second use of the spell affects a one-mile square area. The DM secretly makes a saving throw (based on the caster’s level) to see if the spell takes effect. If successful, the spell renders plants more vigorous, fruitful, and hardy, increasing yields by 20% to 50% ([1d4+1] × 10%), given a normal growing season. The spell does not prevent disaster in the form of floods, drought, fire, or insects, although even in these cases the plants survive better than expected. This effect lasts only for the life cycle of one season, the winter “death” marking the end of a life cycle even for the sturdiest of trees. In many farming communities, this spell is normally cast at planting time as part of the spring festivals.'
};

pri3['Prayer'] = {
    'level': '3',
    'school': 'Conjuration/Summoning',
    'sphere': 'Combat',
    'range': '0',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '60-foot. radius',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A silver holy symbol, prayer beads, or a similar device',
    'reference': 'p. 270',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of the *prayer* spell, the priest brings special favor upon himself and his party and causes harm to his enemies. Those in the area at the instant the spell is completed are affected for the duration of the spell. When the spell is completed, all attack and damage rolls and saving throws made by those in the area of effect who are friendly to the priest gain +1 bonuses, while those of the priest’s enemies suffer –1 penalties. Once the *prayer* spell is uttered, the priest can do other things, unlike a *chant*, which he must continue to make the spell effective. If another priest of the same religious persuasion (not merely the same alignment) is chanting when a prayer is cast, the effects combine to +2 and –2, as long as both are in effect at once.'
};

pri3['Protection From Fire'] = {
    'level': '3',
    'school': 'Abjuration',
    'sphere': 'Protection, Elemental (Fire)',
    'sphere-spells&magic': 'Elemental (Fire)',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol',
    'reference': 'p. 270',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The effect of a *protection from fire* spell differs according to  whether the recipient of the magic is the caster or some other creature. In either case, the spell lasts no longer than one turn per caster level. (Currently [[@{level-priest}]] turns).\n&emsp;If the spell is cast upon the caster, it confers complete invulnerability to: normal fires (torches, bonfires, oil fires, and the like); exposure to magical fires such as fiery dragon breath; spells such as *burning hands*, *fireball*, *fire seeds*, *fire storm*, *flame strike*, and *meteor swarm*; hell hound or pyrohydra breath, etc. The invulnerability lasts until the spell has absorbed 12 points of heat or fire damage per level of the caster, (Currently [[12*[[@{level-priest}]] ]] points of heat or fire damage), at which time the spell is negated. If the spell is cast upon another creature, it gives invulnerability to normal fire, gives a bonus of +4 to saving throw die rolls vs. fire attacks, and reduces damage sustained from magical fires by 50%.'
};

pri3['Pyrotechnics'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Elemental (Fire)',
    'range': '160 yards',
    'duration': 'Special',
    'aoe': '10 or 100 x fire',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': 'One fire source within the area of effect which is immediately extinguished',
    'reference': 'p. 270',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *pyrotechnics* spell draws on an existing fire source to produce either of two effects, at the option of the caster.\n&emps;First, it can produce a flashing and fiery burst of glowing, colored  aerial fireworks that lasts one round. Creatures in, under, or within 120 feet of the area that have an unobstructed line of sight to the effect are blinded for [[1d4+1]] rounds unless they roll successful saving throws vs. spell. The fireworks fill a volume 10 times greater than the original fire source.\n&emsp;Second, it can cause a thick, writhing stream of smoke to arise from the source and form a choking cloud that lasts for one round per experience level of the caster. (Currently [[@{level-priest}]] rounds). This covers a roughly hemispherical volume from the ground or floor up (or conforming to the shape of a confined area) that totally obscures vision beyond 2 feet. The smoke fills a volume 100 times that of the fire source.\n&emsp;The spell uses one fire source within the area of effect, which is immediately extinguished. If an extremely large fire is used as the source, it is only partially extinguished by the casting. Magical fires are not extinguished, although a fire-based creature (such as a fire elemental) used as a source suffers [[1d4+[[@{level-priest}]] points of damage. This spell does not function under water.'
};

pri3['Remove Curse'] = {
    'level': '3',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Protection',
    'sphere-spells&magic': 'All',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 270',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, the priest is usually able to remove a curse on an object, on a person, or in the form of some undesired sending or evil presence. Note that the *remove curse* spell does not remove the curse from a cursed shield, weapon, or suit of armor, for example, although the spell typically enables the person afflicted with any such cursed item to get rid of it. Certain special curses may not be countered by this spell, or may be countered only by a caster of a certain level or more. A caster of 12th level or more can cure lycanthropy with this spell by casting it on the animal form. The were-creature receives a saving throw vs. spell and, if successful, the spell fails and the priest must gain a level before attempting the remedy on this creature again.\n&emsp;The reverse of the spell is not permanent; the *bestow curse* spell lasts for one turn for every experience level of the priest using the spell. (Currently [[@{level-priest}]] turns). The curse can have one of the following effects (roll percentile dice): 50% of the time it reduces one ability of the victim to 3 (the DM randomly determines which ability); 25% of the time it lowers the victim’s attack and saving throw rolls by –4; 25% of the time it makes the victim 50% likely to drop whatever he is holding (or do nothing, in the case of creatures not using tools)—roll each round.\n&emsp;It is possible for a priest to devise his own curse, and it should be similar in power to those given here. Consult your DM. The subject of a *bestow curse* spell must be touched. If the victim is touched, a saving throw is still applicable; if it is successful, the effect is negated. The bestowed curse cannot be dispelled.'
};

pri3['Remove Paralysis'] = {
    'level': '3',
    'school': 'Abjuration',
    'sphere': 'Protection',
    'sphere-necromancers': ', Necromantic',
    'sphere-spells&magic': 'Necromantic, Protection',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '[[1d4]] creatures in 20-foot cube',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 271',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By the use of this spell, the priest can free one or more creatures from the effects of any paralyzation or from related magic (such as a ghoul touch, or a *hold* or *slow* spell). If the spell is cast on one creature, the paralyzation is negated. If cast on two creatures, each receives another saving throw vs. the effect that afflicts it, with a +4 bonus. If cast on three or four creatures, each receives another saving throw with a +2 bonus. There must be no physical or magical barrier between the caster and the creatures to be affected, or the spell fails and is wasted.'
};

pri3['Snare'] = {
    'level': '3',
    'school': 'Enchantment/Charm',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': 'Until triggered',
    'aoe': '[[24+2*[[@{level-priest}]] ]]-inch diameter',
    'components': 'V, S, M',
    'cast-time': '3 rounds',
    'saving-throw': 'None',
    'materials': 'A snake skin and a piece of sinew from a strong animal to weave into the cordlike object from which he will make the snare. Also the caster’s holy symbol is needed',
    'reference': 'p. 271',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to make a snare that is 90% undetectable without magical aid. The snare can be made from any supple vine, a thong, or a rope. When the *snare* spell is cast upon it, the cordlike object blends with its surroundings. One end of the snare is tied in a loop that contracts around one or more of the limbs of any creature stepping inside the circle (note that the head of a worm or snake could be thus ensnared).\n&emsp;If a strong and supple tree is nearby, the snare can be fastened to it. The magic of the spell causes the tree to bend and then straighten when the loop is triggered, inflicting 1d6 points of damage to the creature trapped, and lifting it off the ground by the trapped member(s) (or strangling it if the head/neck triggered the snare). If no such sapling or tree is available, the cordlike object tightens upon the member(s), then wraps around the entire creature, causing no damage, but tightly binding it. Under water, the cord coils back upon its anchor point. The snare is magical, so for one hour it is breakable only by cloud giant or greater Strength (23); each hour thereafter, the snare material loses magic so as to become 1 point more breakable per hour—22 after two hours, 21 after three, 20 after four—until six full hours have elapsed. At that time, 18 Strength will break the bonds. After 12 hours have elapsed, the materials of the snare lose all magical properties and the loop opens, freeing anything it held. The snare can be cut with any magical weapon, or with any edged weapon wielded with at least a +2 attack bonus (from Strength, for example).'
};

pri3['Speak With Dead'] = {
    'level': '3',
    'school': 'Necromancy',
    'sphere': 'Divination',
    'sphere-necromancers': ', Necromantic',
    'sphere-spells&magic': 'Divination, Necromantic',
    'range': '1',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'Special',
    'materials': 'A holy symbol and burning incense',
    'reference': 'p. 271',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting a *speak with dead* spell, the priest is able to ask several questions of a dead creature in a set period of time and receive answers according to the knowledge of that creature. Of course, the priest must be able to converse in the language that the dead creature once used. The length of time the creature has been dead is a factor, since only higher level priests can converse with a long-dead creature. The number of questions that can be answered and the length of time in which the questions can be asked depend on the level of experience of the priest. Even if the casting is successful, such creatures are as evasive as possible when questioned. The dead tend to give extremely brief and limited answers, often cryptic, and to take questions literally. Furthermore, their knowledge is often limited to what they knew in life.\n&emsp;A dead creature of different alignment or of higher level or Hit Dice than the caster’s level receives a saving throw vs. spell. A dead creature that successfully saves can refuse to answer questions, ending the spell. At the DM’s option, the casting of this spell on a given creature might be restricted to once per week.\n&emsp;The priest needs a holy symbol and burning incense in order to cast this spell upon the body, remains, or a portion thereof. The remains are not expended. This spell does not function under water.}}{{style=center sheet-spell-bottom}}{{c1-1=**Caster’s Level**\n**of Experience**}}{{c2-1=1–6}}{{c3-1=7–8}}{{c4-1=9–12}}{{c5-1=13–15}}{{c6-1=16–20}}{{c7-1=21+}}{{c1-2=**Max. Length**\n**of Time Dead**}}{{c2-2=1 week}}{{c3-2=1 month}}{{c4-2=1 year}}{{c5-2=10 years}}{{c6-2=100 years}}{{c7-2=1,000 years}}{{c1-3=**Time**\n**Questioned**}}{{c2-3=1 round}}{{c3-3=3 rounds}}{{c4-3=1 turn}}{{c5-3=2 turns}}{{c6-3=3 turns}}{{c7-3=1 hour}}{{c1-4=**No. of**\n**Questions**}}{{c2-4=2}}{{c3-4=3}}{{c4-4=4}}{{c5-4=5}}{{c6-4=6}}{{c7-4=7'
};

pri3['Spike Growth'] = {
    'level': '3',
    'school': 'Alteration, Enchantment',
    'sphere': 'Plant',
    'range': '60 yards',
    'duration': '[[3d4+[[@{level-priest}]] ]] turns',
    'aoe': '[[@{level-priest}]] 10-foot squares ',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and either seven sharp thorns or seven small twigs, each sharpened to a point.',
    'reference': 'p. 271',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Wherever any type of plant growth of moderate size or density is found, this spell can be used. The ground-covering vegetation or roots and rootlets in the area become very hard and sharply pointed. In effect, the ground cover, while appearing to be unchanged, acts as if the area were strewn with caltrops. In areas of bare ground or earthen pits, roots and rootlets act in the same way. For each 10 feet of movement through the area, the victim suffers 2d4 points of damage. He must also roll a saving throw vs. spell. If this saving throw is failed, the victim’s movement rate is reduced by 1⁄3 of its current total (but a creature’s movement rate can never be less than 1). This penalty lasts for 24 hours, after which the character’s normal movement rate is regained.\n&emsp;Without the use of a spell such as *true seeing*, similar magical aids, or some other special means of detection (such as *detect traps* or *detect snares and pits*), an area affected by *spike growth* is absolutely undetectable as such until a victim enters the area and suffers damage. Even then, the creature cannot determine the extent of the perilous area unless some means of magical detection is used.'
};

pri3['Starshine'] = {
    'level': '3',
    'school': 'Evocation, Illusion/Phantasm',
    'sphere': 'Sun',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[@{level-priest}]] 10-foot squares',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'Several stalks from an amaryllis plant (especially Hypoxis) and several holly berries',
    'reference': 'p. 272',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *starshine* spell enables the caster to softly illuminate an area as if it were exposed to a clear night sky filled with stars. Regardless of the height of the open area in which the spell is cast, the area immediately beneath it is lit by starshine. Vision ranges are the same as those for a bright moonlit night—movement noted out to 100 yards; stationary creatures seen up to 50 yards; general identifications made at 30 yards; and recognition at 10 yards. The spell creates shadows and has no effect on infravision. The area of effect actually appears to be a night sky, but disbelief of the illusion merely enables the disbeliever to note that the “stars” are actually evoked lights. This spell does not function under water.'
};

pri3['Stone Shape'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Elemental (Earth)',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '[[9+[[@{level-priest}]] ]] cubic feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Soft clay that must be worked into roughly the desired shape of the stone object, and then touched to the stone when the spell is uttered',
    'reference': 'p. 272',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster can form an existing piece of stone into any shape that suits his purposes. For example, he can make a stone weapon, a special trapdoor, or a crude idol. By the same token, it enables the spellcaster to shape a stone door, perhaps so as to escape imprisonment, providing the volume of stone involved is within the limits of the area of effect. While stone coffers can be thus formed, stone doors made, etc., the fineness of detail is not great. If the shaping has moving parts, there is a 30% chance they do not work.'
};

pri3['Summon Insects'] = {
    'level': '3',
    'school': 'Conjuration/Summoning',
    'sphere': 'Animal',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol, a flower petal, and a bit of mud or wet clay',
    'reference': 'p. 272',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *summon insects* spell attracts a cloud or swarm of normal insects to attack the foes of the caster. Flying insects appear 70% of the time, while crawling insects appear 30% of the time. The exact insects called are bees, biting flies, hornets, or wasps, if flying insects are indicated; biting ants or pinching beetles, if crawling insects are indicated. A cloud of the flying type, or a swarm of the crawling sort, appears after the spell is cast. This gathers at a point chosen by the caster, within the spell’s range, and attacks any single creature the caster points to.\n&emsp;The attacked creature sustains 2 points of damage if it does nothing but attempt to flee or fend off the insects during the time it is attacked; it suffers 4 points of damage per round otherwise. If the insects are ignored, the victim fights with a –2 penalty to his attack roll and a +2 penalty to his Armor Class. If he attempts to cast a spell, an initiative roll should be made for the insects to see if their damage occurs before the spell is cast. If it does, the victim’s concentration is ruined and the spell is lost.\n&emsp;The insects disperse and the spell ends if the victim enters thick smoke or hot flames. Besides being driven off by smoke or hot flames, the swarm might possibly be outrun, or evaded by plunging into a sufficient body of water. If evaded, the summoned insects can be sent against another opponent, but there will be at least a 1 round delay while they leave the former opponent and attack the new victim. Crawling insects can travel only about 10 feet per round (maximum speed over smooth ground) and flying insects travel 60 feet per round. The caster must concentrate to maintain the swarm; it dissipates if he moves or is disturbed.\n&emsp;It is possible, in underground situations, that the caster might summon 1d4 giant ants by means of the spell, but the possibility is only 30% unless giant ants are nearby. This spell does not function under water.'
};

pri3['Tree'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '0',
    'duration': '[[6+[[@{level-priest}]] ]] turns',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a twig from a tree',
    'reference': 'p. 273',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to assume the form of a small living tree or shrub or that of a large dead tree trunk with only a few limbs. Although the closest inspection cannot reveal that this plant is actually a person, and for all normal tests he is, in fact, a tree or shrub, the caster is able to observe all that goes on around him just as if he were in normal form. The Armor Class and hit points of the plant are those of the caster. The caster can remove the spell at any time, instantly changing from plant to his normal form and having full capability for any action normally possible (including spellcasting). Note that all clothing and gear worn or carried change with the caster.'
};

pri3['Water Breathing'] = {
    'level': '3',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Water, Air)',
    'sphere-spells&magic': 'Elemental (Water)',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 273',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The recipient of a *water breathing* spell is able to breathe under water freely for the duration of the spell—i.e., one hour for each experience level of the caster. The priest can divide the base duration between multiple characters. Thus, an 8th-level priest can confer this ability to two characters for four hours, four for two hours, eight for one hour, etc., to a minimum of one half-hour per character.\n&emsp;The reverse, *air breathing*, enables water-breathing creatures to survive comfortably in the atmosphere for an equal duration. Note that neither version prevents the recipient creature from breathing in its natural element.'
};

pri3['Water Walk'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Elemental (Water)',
    'range': '0',
    'duration': '[[1+[[@{level-priest}]] ]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A piece of cork and the priest’s holy symbol',
    'reference': 'p. 273',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to empower one or more creatures to tread upon any liquid as if it were firm ground; this includes mud, quicksand, oil, running water, and snow. The recipient’s feet do not touch the surface of the liquid, but oval depressions of his appropriate foot size and 2 inches deep are left in the mud or snow. The recipient’s rate of movement remains normal. If cast under water, the recipient is borne toward the surface.\n&emsp;For every level of the caster above the minimum required to cast the spell (5th level), he can affect another creature. Currently [[ [[@{level-priest}]]-4]] creatures.'
};

const pri4 = {};
pri4['Abjure'] = {
    'level': '4',
    'school': 'Abjuration',
    'sphere': 'Summoning',
    'sphere-spells&magic': 'Guardian, Summoning',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'The priest’s holy symbol, holy water, and some material inimical to the creature',
    'reference': 'p. 273',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can send an extraplanar creature back to its own plane of existence. The spell fails against entities of demigod status or greater, but their servants or minions can be abjured. If the creature has a specific (proper) name, it must be known and used. Any magic resistance of the subject must be overcome, or the spell fails. The priest has a 50% chance of success (a roll of 11 or better on 1d20). The roll is adjusted by the difference in level or Hit Dice between the caster and the creature being abjured; the number needed is decreased if the priest has more Hit Dice and increased if the creature has more Hit Dice. If the spell is successful, the creature is instantly hurled back to its own plane. The affected creature must survive a system shock check. If the creature does not have a Constitution score, the required roll is 70% + 2%/Hit Die or level. The caster has no control over where in the creature’s plane the abjured creature arrives. If the attempt fails, the priest must gain another level before another attempt can be made on that particular creature.'
};

pri4['Animal Summoning I'] = {
    'level': '4',
    'school': 'Conjuration, Summoning',
    'sphere': 'Animal, Summoning',
    'sphere-spells&magic': 'Animal',
    'range': '1 mile radius',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 274',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster calls up to eight animals that have 4 Hit Dice or less, of whatever sort the caster names when the summoning is made. Only animals within range of the caster at the time the spell is cast will come. The caster can try three times to summon three different types of animals. For example, a caster first tries to summon wild dogs to no avail, then unsuccessfully tries to call hawks, and finally calls wild horses that may or may not be within summoning range. The DM must determine the chance of a summoned animal type being within the range of the spell. The animals summoned aid the caster by whatever means they possess, staying until a fight is over, a specific mission is finished, the caster is safe, he sends them away, etc. Only normal or giant animals can be summoned; fantastic animals or monsters cannot be summoned by this spell (no chimerae, dragons, gorgons, manticores, etc.).'
};

pri4['Call Woodland Beings'] = {
    'level': '4',
    'school': 'Conjuration/Summoning',
    'sphere': 'Summoning',
    'sphere-druids': ', Animal',
    'sphere-spells&magic': 'Animal',
    'range': '[[100*[[@{level-priest}]] ]] yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'Negate',
    'materials': 'A pine cone and eight holly berries',
    'reference': 'p. 274',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to summon certain woodland creatures to his location. Naturally, this spell works only outdoors, but not necessarily only in wooded areas. The caster begins the incantation and continues uninterrupted until some called creature appears or two turns have elapsed. (The verbalization and somatic gesturing are easy, so this is not particularly exhausting to the spellcaster.) Only one type of the following sorts of beings can be summoned by the spell. They come only if they are within the range of the call.\n&emsp;The caster can call three times, for a different type each time. Once a call is successful, no other type can be called without another casting of the spell. (The DM will consult his outdoor map or base the probability of any such creature being within spell range upon the nature of the area the caster is in at the time of spellcasting.)\n&emsp;The creature(s) called by the spell are entitled to a saving throw vs. spell (with a –4 penalty) to avoid the summons. Any woodland beings answering the call are favorably disposed to the spellcaster and give whatever aid they are capable of. However, if the caller or members of the caller’s party are of evil alignment, the creatures are entitled to another saving throw vs. spell (this time with a +4 bonus) when they come within 10 yards of the caster or another evil character with him. These beings immediately seek to escape if their saving throws are successful. In any event, if the caster requests that the summoned creatures engage in combat on his behalf, they are required to roll a loyalty reaction check based on the caster’s Charisma and whatever dealings he has had with them.\n&emsp;This spell works with respect to neutral or good woodland creatures, as determined by the DM. Thus, the DM can freely add to or alter the list as he sees fit.\n&emsp;If the caster personally knows a certain individual woodland being, that being can be summoned at double the normal range. If this is done, no other woodland creatures are affected.\n&emsp;If a percentage chance is given in the accompanying table, druids and other nature-based priests add [[@{level-priest}]]%. These chances can be used if no other campaign information on the area is available.}}{{style=center2 sheet-spell-center3 sheet-spell-center4 sheet-spell-bottom2 sheet-spell-bottom3 sheet-spell-bottom4}}{{rs1-1=2}}{{c1-1=**Creature**\n**Type Called**}}{{c3-1=2d8 brownies}}{{c4-1=1d4 centaurs}}{{c5-1=1d4 dryads}}{{c6-1=1d8 pixies}}{{c7-1=1d4 satyrs}}{{c8-1=1d6 sprites}}{{c9-1=1 treant}}{{c10-1=1 unicorn}}{{cs1-2=3}}{{c1-2=**————Type of Woodlands————**}}{{cc2-2=center sheet-spell-bottom}}{{c2-2=**Light**}}{{c3-2=30%}}{{c4-2=5%}}{{c5-2=1%}}{{c6-2=10%}}{{c7-2=1%}}{{c8-2=0%}}{{c9-2=—}}{{c10-2=—}}{{c2-3=**Moderate/Sylvan**}}{{c3-3=20%}}{{c4-3=30%}}{{c5-3=25%}}{{c6-3=20%}}{{c7-3=30%}}{{c8-3=5%}}{{c9-3=5%}}{{c10-3=15%}}{{c2-4=**Dense/Virgin**}}{{c3-4=10%}}{{c4-4=5%}}{{c5-4=15%}}{{c6-4=10%}}{{c7-4=10%}}{{c8-4=25%}}{{c9-4=25%}}{{c10-4=20%'
};

pri4['Cloak of Bravery'] = {
    'level': '4',
    'school': 'Conjuration/Summoning (Reversible)',
    'sphere': 'Charm',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Negate',
    'materials': '*Cloak of bravery:* The feather of an eagle or hawk\n*Cloak of Fear:* The tail feathers of a vulture or chicken',
    'reference': 'p. 274',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *cloak of bravery* spell can be cast upon any willing creature. The protected individual gains a bonus to his saving throw against any form of fear encountered (but not awe—an ability of some lesser and greater powers). When cast, the spell can affect one to four creatures (caster’s choice). If only one is affected, the saving throw bonus is +4. If two are affected, the bonus is +3, and so forth, until four creatures are protected by a +1 bonus. The magic of the *cloak of bravery* spell works only once and then the spell ends, whether or not the creature’s saving throw is successful. The spell ends after eight hours if no saving throw is required before then.\n&emsp;The reverse of this spell, *cloak of fear,* empowers a single creature touched to radiate a personal aura of fear, at will, out to a 3-foot radius. All other characters and creatures within this aura must roll successful saving throws vs. spell or run away in panic for [[2d8]] rounds. Affected individuals may or may not drop items, at the DM’s option.\n&emsp;The spell has no effect upon undead of any sort. The effect can be used only once, and the spell expires after eight hours if not brought down sooner. Members of the recipient’s party are not immune to the effects of the spell.'
};

pri4['Control Temperature, 10\' Radius'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Weather',
    'range': '0',
    'duration': '[[4+[[@{level-priest}]] ]] turns',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A strip of willow bark (to lower temperatures) or raspberry leaves (to raise temperatures)',
    'reference': 'p. 275',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the temperature surrounding the caster can be altered by up to [[10*[[@{level-priest}]] ]]° F. ([[5.6*[[@{level-priest}]] ]]° C), either upward or downward. Thus, a 10th-level caster could raise or lower the surrounding temperature from 1 to 100 degrees F (1 to 55.6 degrees C). The spell can be used to ensure the comfort of the caster and those with him in extreme weather conditions. The party could stand about in shirt sleeves during the worst blizzard (although it would be raining on them) or make ice for their drinks during a scorching heat wave.\n&emsp;The spell also provides protection from intense normal and magical attacks. If the extreme of temperature is beyond what could be affected by the spell (a searing blast of a fireball or the icy chill of a white dragon), the spell reduces the damage caused by 5 points for every level of the caster. Currently [[5*[[@{level-priest}]] ]] points. Normal saving throws are still allowed, and the reduction is taken after the saving throw is made or failed. Once struck by such an attack, the spell immediately collapses.'
};

pri4['Cure Serious Wounds'] = {
    'level': '4',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Healing',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 275',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '[[2d8+1]]',
    'effect': 'This spell is a more potent version of the *cure light wounds* spell. When laying his hand upon a creature, the priest heals 2d8+1 points of wound or other injury damage to the creature’s body. This healing cannot affect noncorporeal, nonliving, or extraplanar creatures.\n&emsp;*Cause serious wounds,* the reverse of the spell, operates similarly to the *cause light wounds* spell, the victim having to be touched first. If the touch is successful, 2d8+1 points of damage are inflicted.'
};

pri4['Detect Lie'] = {
    'level': '4',
    'school': 'Divination (Reversible)',
    'sphere': 'Divination',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'Negate',
    'materials': '*Detect lie*: One gp worth of gold dust.\n*Undetectable lie*: Brass dust',
    'reference': 'p. 275',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A priest who casts this spell is immediately able to determine if the subject creature deliberately and knowingly speaks a lie. It does not reveal the truth, uncover unintentional inaccuracies, or necessarily reveal evasions. The subject receives a saving throw vs. spell, which is adjusted only by the Wisdom of the *caster* ([[@{wisdef}]])—for example, if the caster has a Wisdom of 18, the subject’s saving throw roll is reduced by 4 (see Table 5: Wisdom). The spell’s reverse, *undetectable lie,* prevents the magical detection of lies spoken by the creature for 24 hours.'
};

pri4['Divination'] = {
    'level': '4',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A sacrificial offering, incense, and the holy symbol of the priest. If an unusually important *divination* is attempted, sacrifice of particularly valuable gems, jewelry, or magical items may be required',
    'reference': 'p. 275',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *divination* spell is used to garner a useful piece of advice concerning a specific goal, event, or activity that will occur within a one-week period. This can be as simple as a short phrase, or it might take the form of a cryptic rhyme or omen. Unlike the *augury* spell, this gives a specific piece of advice.\n&emsp;For example, if the question is “Will we do well if we venture to the third level?” and a terrible troll guarding 10,000 gp and a *shield +1* lurks near the entrance to the level (the DM estimates the party could beat the troll after a hard fight), the divination response might be: “Ready oil and open flame light your way to wealth.” In all cases, the DM controls what information is received and whether additional divinations will supply additional information. Note that if the information is not acted upon, the conditions probably change so that the information is no longer useful (in the example, the troll might move away and take the treasure with it).\n&emsp;The base chance for a correct divination is 60%, plus 1% for each experience level of the priest casting the spell. Currently [[60+[[@{level-priest}]] ]]%. The DM makes adjustments to this base chance considering the actions being divined (if, for example, unusual precautions against the spell have been taken). If the dice roll is failed, the caster knows the spell failed, unless specific magic yielding false information is at work.'
};

pri4['Free Action'] = {
    'level': '4',
    'school': 'Abjuration, Enchantment',
    'sphere': 'Charm',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A leather thong, bound around the arm or similar appendage, which disintegrates when the spell expires',
    'reference': 'p. 275',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the creature touched to move and attack normally for the duration of the spell, even under the influence of magic that impedes movement (such as *web* or *slow* spells) or while under water. It even negates or prevents the effects of paralysis and *hold* spells. Under water, the individual moves at normal (surface) speed and inflicts full damage, even with such cutting weapons as axes and swords and with such smashing weapons as flails, hammers, and maces, provided that the weapon is wielded in the hand rather than hurled. The *free action* spell does not, however, allow *water breathing* without further appropriate magic.'
};

pri4['Giant Insect'] = {
    'level': '4',
    'school': 'Alteration (Reversible)',
    'sphere': 'Animal',
    'range': '20 yards',
    'duration': 'Permanent',
    'aoe': '1 to 6 insects',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol',
    'reference': 'p. 276',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the priest can turn one or more normal-sized insects into larger forms resembling the giant insects described in the *Monstrous Manual.* Only one type of insect can be altered at one time (i.e., a single casting cannot affect both an ant and a fly) and all insects affected must be grown to the same size. The number of insects and the size to which they can be grown depends upon the priest’s level:}}{{style=center}}{{c1-1=**Priest’s**\n**Level**}}{{c2-1=7–9}}{{c3-1=10–12}}{{c4-1=13+}}{{c1-2=**Insect**\n**Hit Dice**}}{{c2-2=3}}{{c3-2=4}}{{c4-2=6}}{{c1-3=**Maximum**\n**Total HD**}}{{c2-3=9}}{{c3-3=12}}{{c4-3=15}}{{effects2=For example, an 8th-level priest can grow three insects to 3 Hit Dice, four insects to 2 Hit Dice, or nine insects to 1 Hit Die. Flying insects of 3 Hit Dice or more can carry a rider of human size (assume that such can carry 80 pounds per Hit Die).\n&emsp;If the casting is interrupted for any reason, or if the insects are currently subject to any other magical effect (including this one), the insects die and the spell is ruined. The DM decides how many normal insects of what type are available; this is often a greater limitation on the spell than the limits above.\n&emsp;If the insect created by this spell matches an existing monster description, use the monster description. Otherwise, unless the DM creates a special description, the giant form has an Armor Class of between 8 and 4, one attack, and inflicts 1d4 points of damage per Hit Die.\n&emsp;For example, a 14th-level priest uses the giant insect spell to enlarge one beetle (all that is available) to 6 HD size. The DM decides the beetle has AC 5 and bites for 6d4 points of damage.\n&emsp;Note that the spell works only on actual insects. Arachnids, crustaceans, and other types of small creatures are not affected. Any giant insects created by this spell do not attempt to harm the priest, but the priest’s control of such creatures is limited to simple commands (“attack,” “defend,” “guard,” and so forth). Orders to attack a certain creature when it appears or guard against a particular occurrence are too complex. Unless commanded to do otherwise, the giant insects attempt to attack whoever or whatever is near them.\n&emsp;The reverse of the spell, *shrink insect,* reduces any giant insect to normal insect size. The number of Hit Dice affected by the priest is subtracted from the number of Hit Dice of the insects, and any insect reduced to 0 Hit Dice has been shrunk. Partial shrinking is ignored; an insect is either shrunk or unaffected. Thus, a 9th-level priest attacked by giant ants could shrink three warrior ants or four worker ants to normal insect size with no saving throw. This spell has no effect on intelligent insectlike creatures.'
};

pri4['Hallucinatory Forest'] = {
    'level': '4',
    'school': 'Illusion/Phantasm (Reversible)',
    'sphere': 'Plant',
    'range': '80 yards',
    'duration': 'Permanent',
    'aoe': '[[40*[[@{level-priest}]] ]]-foot square',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 276',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, a hallucinatory forest comes into existence. The illusionary forest appears to be perfectly natural and is indistinguishable from a real forest. Priests attuned to the woodlands—as well as such creatures as centaurs, dryads, green dragons, nymphs, satyrs, and treants—recognize the forest for what it is. All other creatures believe it is there, and movement and order of march are affected accordingly. Touching the illusory growth neither affects the magic nor reveals its nature. The hallucinatory forest remains until it is magically dispelled by a reverse of the spell or a *dispel magic* spell. The area shape is either roughly rectangular or square, in general, and at least 40 feet deep, in whatever location the caster desires. The forest can be of less than maximum area if the caster wishes. One of its edges can appear up to 80 yards away from the caster.'
};

pri4['Hold Plant'] = {
    'level': '4',
    'school': 'Enchantment/Charm',
    'sphere': 'Plant',
    'range': '80 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '[[1d4]] plants in 40-foot square',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 276',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *hold plant* spell affects vegetable matter as follows: 1) it causes ambulatory vegetation to cease moving; 2) it prevents vegetable matter from entwining, grasping, closing, or growing; 3) it prevents vegetable matter from making any sound or movement that is not caused by wind. The spell effects apply to all forms of vegetation, including parasitic and fungoid types, and those magically animated or otherwise magically empowered. It affects such monsters as green slime, molds of any sort, shambling mounds, shriekers, treants, etc. The duration of a *hold plant* spell is one round per level of experience of the caster. It affects 1d4 plants in a 40-foot × 40-foot area, or a square 4 to 16 yards on a side of small ground growth such as grass or mold. If only one plant (or 4 yards square) is chosen as the target for the spell by the caster, the saving throw of the plant (or area of plant growth) is made with a –4 penalty to the die roll; if two plants (or 8 yards square) are the target, saving throws suffer a –2 penalty; if three plants (or 12 yards square) are the target, saving throws suffer a –1 penalty; and if the maximum of four plants (or 16 yards square) are the target, saving throws are unmodified.'
};

pri4['Imbue With Spell Ability'] = {
    'level': '4',
    'school': 'Enchantment',
    'sphere': 'Charm',
    'range': 'Touch',
    'duration': 'Until used',
    'aoe': 'Person touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol, plus some minor item from the recipient that is symbolic of his profession (a lockpick for a thief, etc.)',
    'reference': 'p. 277',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By the use of this spell, the priest can transfer a limited number and selection of his currently memorized spells, and the ability to cast them, to another person. Only nonspellcasters (including rangers under 8th level and paladins under 9th level) can receive this bestowal; the *imbue with spell ability* enchantment does not function for those belonging to spellcasting classes, for unintelligent monsters, nor for any individual with less than 1 full Hit Die. In addition, the person thus imbued must have a Wisdom score of 9 or higher. Only priest spells of an informational or defensive nature or a *cure light wounds* spell can be transferred. Transferring any other spell type negates the entire attempt, including any allowable spells that were chosen. Higher level persons can receive more than one spell at the priest’s option:}}{{style=center1 sheet-spell-bottom2}}{{c1-1=**Level of Recipient**}}{{c2-1=1}}{{c3-1=3}}{{c4-1=5+}}{{c1-2=**Spells Imbued**}}{{c2-2=One 1st-level spell}}{{c3-2=Two 1st-level spells}}{{c4-2=Two 1st- and one 2nd-level spells}}{{effects2=The transferred spell’s variable characteristics (range, duration, area of effect, etc.) function according to the level of the priest originally imbuing the spell.\n&emsp;A priest who casts *imbue with spell ability* upon another character loses the number of 1st- and 2nd-level spells he has imbued until the recipient uses the transferred spells or is slain. For example, a 7th-level priest with five 1st- and four 2nd-level spells imbues a 10th-level fighter with a *cure light wounds* spell and a *slow poison* spell. The cleric now can have only four 1st-level spells memorized until the cure is cast and only three 2nd-level spells until the *slow poison* is cast, or until the fighter is killed. In the meantime, the priest remains responsible to his ethos for the use to which the spell is put.\n&emsp;This item, and any material component for the imbued spell, is consumed when the *imbue with spell ability* spell is cast.'
};

pri4['Lower Water'] = {
    'level': '4',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Water)',
    'range': '120 yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy (or unholy) symbol and a pinch of dust',
    'reference': 'p. 277',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *lower water* spell causes water or similar fluid in the area of effect to sink away to a minimum depth of 1 inch. The depth can be lowered by up to 2 feet for every experience level of the priest. Currently [[2*[[@{level-priest}]] ]] feet. The water is lowered within a square area whose sides are 10 feet long per caster level. Currently [[10*[[@{level-priest}]] ]]. Thus, an 8th-level priest affects a volume up to 16 feet × 80 feet × 80 feet, a 9th-level caster affects a volume up to 18 feet × 90 feet × 90 feet, and so on. In extremely large and deep bodies of water, such as deep ocean, the spell creates a whirlpool that sweeps ships and similar craft downward, putting them at risk and rendering them unable to leave by normal movement for the duration of the spell. When cast on water elementals and other water-based creatures, this spell acts as a *slow* spell: The creature moves at half speed and makes half its usual number of attacks each round. The spell has no effect on other creatures.\n&emsp;Its reverse, *raise water,* causes water or similar fluids to return to their highest natural level: spring flood, high tide, etc. This can make fords impassable, float grounded ships, and may even sweep away bridges at the DM’s option. It negates *lower water* and vice versa.'
};

pri4['Neutralize Poison'] = {
    'level': '4',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Healing',
    'sphere-necromancers': ', Necromantic',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature or [[floor([[@{level-priest}]]/2)]] cubic feet of substance',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 277',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *neutralize poison* spell, the priest detoxifies any sort of venom in the creature or substance touched. Note that an opponent, such as a poisonous reptile or snake (or even an envenomed weapon of an opponent) unwilling to be so touched requires the priest to roll a successful attack in combat. This spell can prevent death in a poisoned creature if cast before death occurs. The effects of the spell are permanent only with respect to poison existing in the touched creature at the time of the touch; thus, creatures (and objects) that generate new poison are not permanently detoxified.\n&emsp;The reversed spell, *poison,* likewise requires a successful attack roll, and the victim is allowed a saving throw vs. poison. If the latter is unsuccessful, the victim is incapacitated and dies in one turn unless the poison is magically neutralized or slowed.'
};

pri4['Plant Door'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A piece of charcoal and the caster’s holy symbol',
    'reference': 'p. 277',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *plant door* spell opens a magical portal or passageway through trees, undergrowth, thickets, or any similar growth—even growth of a magical nature. The plant door is open to the caster who cast the spell, casters of a higher level, or dryads; others must be shown the location of the door. The door even enables the caster to enter a solid tree trunk and remain hidden there until the spell ends. The spell also enables the passage or hiding of any man-sized or smaller creature; hiding is subject to space considerations. If the tree is cut down or burned, those within must leave before the tree falls or is consumed, or else they are killed also. The duration of the spell is [[@{level-priest}]] turns. If the caster opts to stay within an oak, the spell lasts nine times longer than normal; if within an ash tree, it lasts three times longer. The path created by the spell is up to 4 feet wide, 8 feet high, and 12 feet long per level of experience of the caster. This spell does not function on plant-based monsters (shambling mounds, molds, slimes, treants, etc.).'
};

pri4['Produce Fire'] = {
    'level': '4',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Fire)',
    'range': '40 yards',
    'duration': '1 round',
    'aoe': '12-foot square',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A paste of sulfur and wax, formed into a ball and thrown at the target',
    'reference': 'p. 278',
    'book': 'PHB',
    'damage': '[[1d4+[[@{level-priest}]] ]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'By means of this spell, the caster creates a common fire of up to 12 feet per side in area. Though it lasts only a single round (unless it ignites additional flammable material), the fire produced by the spell inflicts 1d4 points of damage plus 1 point per caster level (1d4 + 1/level) upon creatures within its area. It ignites combustible materials, such as cloth, oil, paper, parchment, wood, and the like, so as to cause continued burning.\n&emsp;The reverse, *quench fire,* extinguishes any normal fire (coals, oil, tallow, wax, wood, etc.) within the area of effect.'
};

pri4['Protection From Evil, 10\' Radius'] = {
    'level': '4',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'Holy (or unholy) water and incense (or smoldering dung)',
    'reference': 'p. 278',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The globe of protection of this spell is identical in all respects to that of a *protection from evil* spell, except that it encompasses a much larger area and its duration is greater. The effect is centered on and moves with the creature touched. Any protected creature within the circle will break the warding against enchanted/summoned monsters if he attacks those monsters. A creature unable to fit completely into the area of effect (for example, a 21-foot-tall titan) remains partially exposed and subject to whatever penalties the DM decides. If such a creature is the recipient of the spell, the spell acts as a normal *protection from evil* spell for that creature only.\n&emsp;The reverse, *protection from good, 10’ radius,* wards against good creatures.\n&emsp;To complete this spell, the priest must trace a circle 20 feet in diameter using holy (or unholy) water and incense (or smoldering dung), according to the *protection from evil* spell.'
};

pri4['Protection From Lightning'] = {
    'level': '4',
    'school': 'Abjuration',
    'sphere': 'Protection, Weather',
    'sphere-spells&magic': 'Weather',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol',
    'reference': 'p. 278',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The effect of a *protection from lightning* spell changes depending on who is the recipient of the magic—the caster or some other creature. In either case, the spell lasts no longer than [[@{level-priest}]] turns.\n&emsp;If the spell is cast upon the caster, it confers complete invulnerability to electrical attack such as dragon breath, or magical lightning such as *lightning bolt, shocking grasp,* storm giant, will ‘o wisp, etc., until the spell has absorbed [[10*[[@{level-priest}]] ]] points of electrical damage, at which time the spell is negated.\n&emsp;If the spell is cast upon another creature, it gives a bonus of +4 to the die roll for saving throws made vs. electrical attacks, and it reduces the damage sustained from such attacks by 50%.'
};

pri4['Reflecting Pool'] = {
    'level': '4',
    'school': 'Divination',
    'sphere': 'Divination',
    'sphere-spells&magic': 'Elemental (Water)',
    'range': '10 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '2 hrs.',
    'saving-throw': 'None',
    'materials': 'The oil extracted from such nuts as the hickory and the walnut, refined, and dropped in three measures upon the surface of the pool. (A measure need be no more than a single ounce of oil.)',
    'reference': 'p. 278',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to cause a pool of normal water found in a natural setting to act as a scrying device. The pool can be of no greater diameter than 2 feet per level of the caster. Currently [[2*[[@{level-priest}]] ]] feet diameter. The effect is to create a scrying device similar to a *crystal ball.* The scrying can extend only to the Ethereal Plane and the Inner Planes (which includes the paraelemental planes, the Demiplane of Shadow, etc.). General notes on scrying, detection by the subject, and penalties for attempting to scry beyond the caster’s own plane are given in the *DMG,* as well as a description of the *crystal ball* item.\n&emsp;The following spells can be cast through a reflecting pool, with a 5% per level chance for operating correctly. Currently [[5*[[@{level-priest}]] ]]% chance: *detect magic, detect snares and pits,* and *detect poison.* Each additional detection attempt requires a round of concentration, regardless of success. Infravision, if available, operates normally through the reflecting pool.\n&emsp; The image is nearly always hazy enough to prevent the reading of script of any type.\n&emsp;At the DM’s option, the casting of this spell may be limited to once per day.'
};

pri4['Repel Insects'] = {
    'level': '4',
    'school': 'Abjuration, Alteration',
    'sphere': 'Animal, Protection',
    'sphere-spells&magic': 'Animal',
    'range': '0',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Any one of the following: several crushed marigold flowers, a whole crushed leek, seven crushed stinging nettle leaves, or a small lump of resin from a camphor tree',
    'reference': 'p. 279',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the priest creates an invisible barrier to all sorts of insects, and normal insects do not approach within 10 feet of the caster while the spell is in effect. Giant insects with Hit Dice less than 1⁄3 of the caster’s experience level are also repelled. Currently [[ceil([[@{level-priest}]]/3)-1]] Hit Dice and below are repelled. (for example, 2 Hit Dice for 7th- to 9th-level casters, 3 Hit Dice at 10th through 12th level, etc.). Insects with more Hit Dice can enter the protected area if the insect is especially aggressive and, in addition, rolls a successful saving throw vs. spell. Those that do sustain 1d6 points of damage from passing through the magical barrier. Note that the spell does not in any way affect arachnids, myriapods, and similar creatures—it affects only true insects.'
};

pri4['Speak With Plants'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '0',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '30-foot radius',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A drop of water, a pinch of dung, and a flame',
    'reference': 'p. 279',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast, a *speak with plants* spell enables the priest to converse, in very rudimentary terms, with all sorts of living vegetables (including fungi, molds, and plantlike monsters, such as shambling mounds) and to exercise limited control over normal plants (i.e., not monsters or plantlike creatures). Thus, the caster can question plants as to whether or not creatures have passed through them, cause thickets to part to enable easy passage, require vines to entangle pursuers, and command similar services. The spell does not enable plants to uproot themselves and move about, but any movements within the plants’ normal capabilities are possible. Creatures entangled by the 1st-level spell of that name can be released. The power of the spell lasts for [[@{level-priest}]] rounds. All vegetation within the area of effect is affected by the spell.'
};

pri4['Spell Immunity'] = {
    'level': '4',
    'school': 'Abjuration',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The same as that for the spell to be protected against',
    'reference': 'p. 279',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the priest renders a creature touched immune to the effects of a specified spell of 4th level or lower. It protects against spells, spell-like effects of magical items, and innate spell-like abilities of creatures. It does not protect against breath weapons or gaze attacks of any type.\n&emsp;The spell has several additional limitations. First, the caster must have directly experienced the effect of the specified spell. For example, if the caster has been attacked by a *fireball* spell at some time, he can use the *spell immunity* spell to provide protection from a fireball. Second, the spell cannot affect a creature already magically protected by a potion, protective spell, ring, or other device. Third, only a particular spell can be protected against, not a certain sphere of spells or a group of spells that are similar in effect; thus, a creature given immunity to the *lightning bolt* spell is still vulnerable to a *shocking grasp* spell.'
};

pri4['Sticks to Snakes'] = {
    'level': '4',
    'school': 'Alteration (Reversible)',
    'sphere': 'Plant',
    'range': '30 yards',
    'duration': '[[2*[[@{level-priest}]] rounds',
    'aoe': '[[1d4+[[@{level-priest}]] ]] sticks in a 10-foot cube',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A small piece of bark and several snake scales',
    'reference': 'p. 280',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster can change 1d4 sticks, plus one stick per experience level, into snakes; thus, a 9th-level priest can change 10–13 sticks into an equal number of snakes. These snakes attack as commanded by the priest. There must, of course, be sticks or similar pieces of wood (such as torches, spears, etc.) to turn into snakes. Such a stick cannot be larger than a staff. Sticks held by creatures are allowed a saving throw equal to that of the possessor (i.e., a spear held by an orc must roll the orc’s saving throw vs. polymorph). Magical items, such as staves and enchanted spears, are not affected by the spell. Only sticks within the area of effect are changed.\n&emsp;The type of snake created varies, but a typical specimen has 2 Hit Dice, Armor Class 6, a movement rate of 9, and either constricts for 1d4+1 points of damage per round or bites for 1 point plus poison (if any). The chance of a snake thus changed being venomous is 5% per caster level, if the spellcaster desires. Currently [[5*[[@{level-priest}]] chance of being venomous. Thus, an 11th-level priest has a maximum 55% chance that any snake created by the spell is poisonous. The spell lasts for two rounds for each experience level of the spellcaster.\n&emsp;The reverse spell changes normal-sized snakes to sticks for the same duration, or it negates the *sticks to snakes* spell according to the level of the priest countering the spell (for example, a 10th-level priest casting the reverse spell can turn 11-14 snakes back into sticks).'
};

pri4['Tongues'] = {
    'level': '4',
    'school': 'Alteration (Reversible)',
    'sphere': 'Divination',
    'sphere-spells&magic': 'All',
    'range': '0',
    'duration': '1 turn',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 280',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to speak and understand additional languages, whether they are racial tongues or regional dialects, but not communications of animals or mindless creatures. When the spell is cast, the spellcaster selects the language or languages to be understood. The spell then empowers the caster with the ability to speak and understand the language desired with perfect fluency and accent. The spell enables the priest to be understood by all speakers of that language within hearing distance, usually 60 feet. This spell does not predispose the subject toward the caster in any way. The priest can speak one additional tongue for every three levels of experience. Currently [[floor([[@{level-priest}]]/3)]] additional tongues.\n&emsp;The reverse of the spell cancels the effect of the *tongues* spell or confuses verbal communication of any sort within the area of effect.'
};

const pri5 = {};
pri5['Air Walk'] = {
    'level': '5',
    'school': 'Alteration',
    'sphere': 'Elemental (Air)',
    'range': 'Touch',
    'duration': '1 hour + [[@{level-priest}]] turns',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a bit of thistledown',
    'reference': 'p. 280',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables a creature, which can be as big as the largest giant, to tread upon air as if it were walking on solid ground. Moving upward is similar to walking up a hill. A maximum upward angle of 45 degrees is possible at one-half the creature’s movement rate, as is a maximum downward angle of 45 degrees at the normal movement rate. An air-walking creature is in control of its movement, except when a strong wind is blowing. In this case, the creature gains or loses 10 feet of movement for every 10 miles per hour of wind velocity. The creature can, at the DM’s option, be subject to additional penalties in exceptionally strong or turbulent winds, such as loss of control of movement or suffering physical damage.\n&emsp;The spell can be placed upon a trained mount, so it can be ridden through the air. Of course, a mount not accustomed to such movement would certainly need careful and lengthy training, the details for which are up to the DM.'
};

pri5['Animal Growth'] = {
    'level': '5',
    'school': 'Alteration (Reversible)',
    'sphere': 'Animal',
    'range': '80 yards',
    'duration': '[[2*[[@{level-priest}}]] ]] rounds',
    'aoe': 'Up to 8 animals',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol and a scrap of food',
    'reference': 'p. 280',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is released, the caster causes up to eight animals within a 20-foot-square area to grow to twice their normal size. The effects of this growth are doubled Hit Dice (with resultant improvement in attack potential), doubled hit points (except hit points added to Hit Dice), and doubled damage in combat. Movement and AC are not affected. The spell lasts for two rounds for each level of the caster. The spell is particularly useful in conjunction with a *charm person or mammal spell*.\n&emsp;The reverse reduces animal size by one-half, and likewise reduces Hit Dice, hit points, attack damage, etc.'
};

pri5['Animal Summoning II'] = {
    'level': '5',
    'school': 'Conjuration/Summoning',
    'sphere': 'Animal, Summoning',
    'sphere-spells&magic': 'Animal',
    'range': '[[60*[[@{level-priest}]] ]] yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 281',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster calls up to six animals of 8 Hit Dice or less, or 12 animals of 4 Hit Dice or less—of whatever sort the caster names. Only animals within range of the caster at the time the spell is cast will come. The caster can try three times to summon three different types of animals. For example, suppose that wild dogs are first summoned to no avail, then hawks are unsuccessfully called, and finally the caster calls for wild horses. The DM determines the chance of a summoned animal type being within range of the spell. The animals summoned aid the caster by whatever means they possess, staying until a fight is over, a specific mission is finished, the caster is safe, he sends them away, etc. Only normal or giant animals can be summoned; fantastic animals or monsters cannot be effected by this spell (no chimerae, dragons, gorgons, manticores, etc.).'
};

pri5['Antiplant Shell'] = {
    'level': '5',
    'school': 'Abjuration',
    'sphere': 'Plant, Protection',
    'range': '0',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '15-foot diameter',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 281',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *anti-plant shell* spell creates an invisible, mobile barrier that keeps all creatures within the shell protected from attacking plants or vegetable creatures such as shambling mounds or treants. Any attempt to force the barrier against such creatures shatters the barrier immediately. The spell lasts for one turn for each experience level of the caster.'
};

pri5['Atonement'] = {
    'level': '5',
    'school': 'Abjuration',
    'sphere': 'All',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 person',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s religious symbol, prayer beads or wheel or book, and burning incense',
    'reference': 'p. 281',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is used by the priest to remove the burden of unwilling or unknown deeds from the person who is the subject of the atonement. The spell removes the effects of magical alignment changes as well. The person seeking the *atonement* spell must either be truly repentant or not have been in command of his own will when the acts to be atoned for were committed. The DM will judge this spell in this regard, noting any past instances of its use upon the person. Deliberate misdeeds and acts of knowing and willful nature cannot be atoned for with this spell (see the *quest* spell). A character who refuses to accept an atonement is automatically considered to have committed a willful misdeed.'
};

pri5['Commune'] = {
    'level': '5',
    'school': 'Divination',
    'sphere': 'Divination',
    'sphere-spells&magic': 'All',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s religious symbol, holy (unholy) water, and incense; and if a particularly potent commune is needed, a sacrifice proportionate with the difficulty of obtaining the information is required',
    'reference': 'p. 281',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By use of a *commune* spell, the priest is able to contact his deity—or agents thereof—and request information in the form of questions that can be answered by a simple “yes” or “no.” The priest is allowed one such question for every experience level he has attained. Currently [[@{level-priest}]] questions. The answers given are correct within the limits of the entity’s knowledge. “I don’t know” is a legitimate answer, as powerful outer planar beings are not necessarily omniscient. Optionally, the DM may give a single short answer of five words or less. The spell will, at best, provide information to aid character decisions. Entities communed with structure their answers to further their own purposes. It is probable that the DM will limit the use of *commune* spells to one per adventure, one per week, or even one per month, for the greater powers dislike frequent interruptions. Likewise, if the caster lags, discusses the answers, or goes off to do anything else, the spell immediately ends.\n&emsp;If a sacrifice is required and the offering is insufficient, no information or only partial information is gained.'
};

pri5['Commune With Nature'] = {
    'level': '5',
    'school': 'Divination',
    'sphere': 'Divination, Elemental',
    'sphere-druids': ', Animal, Plant',
    'sphere-spells&magic': 'Animal, Plant',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 281',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to become one with nature, thus being empowered with knowledge of the surrounding territory. For each level of experience of the caster, he can “know” one fact—ahead, left, or right, about the following subjects: the ground, plants, minerals, bodies of water, people, general animal population, presence of woodland creatures, etc. The presence of powerful unnatural creatures also can be detected, as can the general state of the natural setting. The spell is most effective in outdoor settings, operating in a radius of one-half mile for each level of the caster. Currently [[0.5*[[@{level-priest}]] ]] mile radius. In natural underground settings—caves, cavern, etc.—the range is limited to 10 yards per caster level. Currently [[10*[[@{level-priest}]] ]] yard radius. In constructed settings (dungeons and towns), the spell will not function. The DM may limit the casting of this spell to once per month.'
};

pri5['Control Winds'] = {
    'level': '5',
    'school': 'Alteration',
    'sphere': 'Weather',
    'sphere-spells&magic': 'Elemental (Air), Weather',
    'range': '0',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[40*[[@{level-priest}]] ]]-foot radius',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 282',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *control winds* spell, the caster is able to alter wind force in the area of effect. For every three levels of experience, the caster can increase or decrease wind forces by one level of strength. Currently [[floor([[@{level-priest}]]/3)]] wind levels of strength. Wind strengths are as follows:}}{{style=center2}}{{c1-1=**Wind Force**}}{{c2-1=Light Breeze}}{{c3-1=Moderate Breeze}}{{c4-1=Strong Breeze}}{{c5-1=Gale}}{{c6-1=Storm}}{{c7-1=Hurricane}}{{c1-2=**Miles Per Hour**}}{{c2-2=2–7}}{{c3-2=8–18}}{{c4-2=19–31}}{{c5-2=32–54}}{{c6-2=55–72}}{{c7-2=73–176}}{{effects2=&emsp;Winds in excess of 19 miles per hour drive small flying creatures—those eagle-sized and under—from the skies, severely affect missile accuracy, and make sailing difficult. Winds in excess of 32 miles per hour drive even man-sized flying creatures from the skies and cause minor ship damage. Winds in excess of 55 miles per hour drive all flying creatures from the skies, uproot small trees, knock down wooden structures, tear off roofs, and endanger ships. Winds in excess of 73 miles per hour are of hurricane force.\n&emsp;An “eye” of 40-foot radius, in which the wind is calm, exists around the caster. Note that while the spell can be used underground, if the spell is cast in an area smaller than the area of effect, the eye shrinks 1 foot for every foot of confinement. For example, if the area of effect is a 360-foot area, the eye shrinks by 10 feet to a 30-foot radius; a space under 320 feet in a radius would eliminate the eye and subject the spellcaster to the effects of the wind. Once the spell is cast, the wind force increases or decreases by 3 miles per hour per round until the maximum or minimum speed is attained. The caster, with one round of complete concentration, can stabilize the wind at its current strength, or set it to increase or decrease. However, the rate of the change cannot be altered. The spell remains in force for one turn for each level of experience of the caster. When the spell is exhausted, the force of the wind wanes or waxes at the same rate, until it reaches the level it was at before the spell took effect. Another caster can use a *control winds* spell to counter the effects of a like spell up to the limits of his own ability.'
};

pri5['Cure Critical Wounds'] = {
    'level': '5',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Healing',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 282',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '[[3d8+3]]',
    'effect': 'The *cure critical wounds* spell is a very potent version of the *cure light wounds* spell. The priest lays his hand upon a creature and heals 3d8+3 points of damage from wounds or other damage. The spell does not affect creatures without corporeal bodies, those of extraplanar origin, or those not living.\n&emsp;The reversed spell, *cause critical wounds,* operates in the same fashion as other cause wounds spells, requiring a successful touch to inflict the 3d8+3 points of damage. Caused wounds heal via the same methods as do wounds of other sorts.'
};

pri5['Dispel Evil'] = {
    'level': '5',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Protection, Summoning',
    'sphere-necromancers': ', Necromantic',
    'sphere-spells&magic': 'Guardian, Summoning',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'Negate',
    'materials': 'The priest’s holy symbol and holy (or unholy) water',
    'reference': 'p. 282',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The priest using this spell causes a summoned creature of evil nature, an evil creature from another plane, or a creature summoned by an evil caster, to return to its own plane or place when the caster successfully strikes it in melee combat. Examples of such creatures are aerial servants, djinn, efreet, elementals, and invisible stalkers. An evil enchantment (such as a *charm* spell cast by an evil creature) that is subject to a normal *dispel magic* spell can be automatically dispelled by the *dispel evil* spell. This spell lasts for a maximum of one round for each experience level of the caster, or until expended. While the spell is in effect, all creatures that could be affected by it fight with a -7 penalty to their attack rolls when engaging the spellcaster.\n&emsp;The reverse of the spell, *dispel good,* functions against summoned or enchanted creatures of good alignment or creatures that have been sent to aid the cause of good.'
};

pri5['Flame Strike'] = {
    'level': '5',
    'school': 'Evocation',
    'sphere': 'Combat',
    'range': '60 yards',
    'duration': 'Instantaneous',
    'aoe': '5 foot radius x 30 foot column',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': '½',
    'materials': 'A pinch of sulphur',
    'reference': 'p. 282',
    'book': 'PHB',
    'damage': '[[6d8]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'When the priest evokes a *flame strike* spell, a vertical column of fire roars downward in the location called for by the caster. Any creatures within the area of effect must roll a saving throw vs. spell. Failure means the creature sustains 6d8 points of damage; otherwise, the damage is halved.'
};

pri5['Insect Plague'] = {
    'level': '5',
    'school': 'Conjuration/Summoning',
    'sphere': 'Combat',
    'sphere-druids': ', Animal',
    'sphere-spells&magic': 'Animal',
    'range': '120 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '180 foot × 60 foot cloud',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A few granules of sugar, some kernels of grain, and a smear of fat',
    'reference': 'p. 282',
    'book': 'PHB',
    'damage': '1 point per round',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast by the priest, a horde of creeping, hopping, and flying insects gather and swarm in a thick cloud. In an environment free of normal insects, the spell fails. The insects obscure vision, limiting it to 10 feet. Spellcasting within the cloud is impossible. Creatures in the insect plague, regardless of Armor Class, sustain 1 point of damage for each round they remain within, due to the bites and stings of the insects. Invisibility is no protection. All creatures with 2 or fewer Hit Dice will automatically move at their fastest possible speed in a random direction until they are more than 240 yards away from the insects. Creatures with fewer than 5 Hit Dice must check morale; failure means they run as described above.\n&emsp;Heavy smoke drives off insects within its bounds. Fire also drives insects away. For example, a wall of fire in a ring shape keeps a subsequently cast *insect plague* outside its confines, but a *fireball* spell simply clears insects from its blast area for one round. A single torch is ineffective against this vast horde of insects. Lightning, cold, or ice are likewise ineffective, while a strong wind that covers the entire plague area disperses the insects and ends the spell. The plague lasts two rounds for each level of the caster, and thereafter the insects disperse. The insects swarm in an area that centers around a summoning point determined by the spellcaster. The point can be up to 120 yards away from the priest. The insect plague does not move thereafter for as long as it lasts. Note that the spell can be countered by a *dispel magic* spell.'
};

pri5['Magic Font'] = {
    'level': '5',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 hour',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and the font and its trappings',
    'reference': 'p. 283',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The spell causes a holy water font to serve as a scrying device. The spell does not function unless the priest is in good standing with his deity. The basin of holy water becomes similar to a *crystal ball.* For each vial of capacity of the basin, the priest may scry for one round, up to a maximum of one hour. Thus, the duration of the *magic font* spell is directly related to the size of the holy water receptacle. The DM will know the chances of a character being able to detect scrying.\n&emsp;The priest’s holy symbol and the font and its trappings are not consumed by the spell.'
};

pri5['Moonbeam'] = {
    'level': '5',
    'school': 'Evocation, Alteration',
    'sphere': 'Sun',
    'range': '[[60+(10*[[@{level-priest}]])]] yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '5 foot radius + special',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'Several seeds of any moonseed plant and a piece of opalescent feldspar (moonstone)',
    'reference': 'p. 283',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to cause a beam of soft, pale light to strike down from overhead and illuminate whatever area he is pointing at. The light is exactly the same as moonlight, so that colors other than shades of black, gray, or white are vague. The spellcaster can easily make the moonbeam move to any area that he can see and point to. This makes the spell an effective way to spotlight something, an opponent, for example. While the *moonbeam* spell does not eliminate all shadows, a creature centered in a moonbeam is most certainly visible. The reflected light from this spell enables dim visual perception 10 yards beyond the area of effect, but it does not shed a telltale glow that would negate surprise. The light does not adversely affect infravision. The caster can dim the beam to near darkness if desired. The beam has, in addition, all the properties of true moonlight and can induce a lycanthropic change (of a creature in the beam), unless the DM rules otherwise.'
};

pri5['Pass Plant'] = {
    'level': '5',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'p. 283',
    'book': 'PHB',
    'reference': '',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By using this spell, the caster is able to enter a tree and move from inside it to inside another tree. The second tree must lie in approximately the direction desired by the spell user and must be within the range shown in the following table.}}{{style=center2}}{{c1-1=**Type of Tree**}}{{c2-1=Oak}}{{c3-1=Ash}}{{c4-1=Yew}}{{c5-1=Elm}}{{c6-1=Linden}}{{c7-1=deciduous}}{{c8-1=coniferous}}{{c9-1=other}}{{cc1-2=bottom}}{{c1-2=**Range of Area of Effect**}}{{c2-2=600 yards}}{{c3-2=540 yards}}{{c4-2=480 yards}}{{c5-2=420 yards}}{{c6-2=360 yards}}{{c7-2=300 yards}}{{c8-2=240 yards}}{{c9-2=180 yards}}{{effects2=The tree entered and that receiving the caster must be of the same type, must both be living, and of girth at least equal to that of the caster. Note that if the caster enters a tree, an ash, for example, and wishes to pass north as far as possible (540 yards), but the only appropriate ash in range is to the south, the caster will pass to the ash in the south. The *pass plant* spell functions so that the movement takes only one round. The caster can, at his option, remain within the receiving tree for a maximum of [[@{level-priest}]] rounds. Otherwise, he can step forth immediately. Should no like tree be in range, the caster simply remains within the first tree, does not pass elsewhere, and must step forth in the appropriate number of rounds. If the occupied tree is chopped down or burned, the caster is slain if he does not exit before the process is complete.'
};

pri5['Plane Shift'] = {
    'level': '5',
    'school': 'Alteration',
    'sphere': 'Astral',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature (special)',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'Negate',
    'materials': 'A small, forked metal rod (see below)',
    'reference': 'p. 283',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the *plane shift* spell is cast, the priest moves himself or some other creature to another plane of existence. The recipient of the spell remains in the new plane until sent forth by some like means. If several persons link hands in a circle, up to eight can be affected by the plane shift at the same time.\n&emsp;The material component of this spell is a small, forked metal rod. The size and metal type dictates to which plane of existence, including sub-planes and alternate dimensions, the spell sends the affected creatures. The DM will determine specifics regarding how and what planes are reached.\n&emsp;An unwilling victim must be touched (successful attack roll) to be sent. In addition, the creature is also allowed a saving throw. If the saving throw is successful, the effect of the spell is negated. Note that pinpoint accuracy is rarely achieved; arriving at a random distance from an intended destination is common.\n&emsp;The metal rod is not expended when the spell is cast. Forked rods keyed to certain planes may be difficult to come by, as decided by the DM.'
};

pri5['Quest'] = {
    'level': '5',
    'school': 'Enchantment/Charm',
    'sphere': 'Charm',
    'sphere-spells&magic': 'All',
    'range': '60 yards',
    'duration': 'Until fulfilled',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'Negate',
    'materials': 'The priest’s holy symbol',
    'reference': 'p. 284',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *quest* spell enables the priest to require the affected creature to perform a service and return to the priest with proof that the deed was accomplished. The quest can, for example, require that the creature locate and return some important or valuable object, rescue a notable person, release some creature, capture a stronghold, slay a person, deliver some item, and so forth. If the quest is not properly followed, due to disregard, delay, or perversion, the creature affected by the spell loses 1 from its saving throw rolls for each day of such action. This penalty is not removed until the quest is properly pursued or the priest cancels it. There are certain circumstances that will temporarily suspend a quest, and others that will discharge or cancel it. The DM will give you appropriate information as the need to know arises.\n&emsp;If cast upon an unwilling subject, the victim is allowed a saving throw. However, if the person quested agrees to a task—even if the agreement is gained by force or trickery—no saving throw is allowed. If a quest is just and deserved, a creature of the priest’s religion cannot avoid it, and any creature of the priest’s alignment saves with a -4 penalty to the saving throw. A quest cannot be dispelled, but it can be removed by a priest of the same religion or of higher level than the caster. Some artifacts and relics might negate the spell, as can direct intervention by a deity. Likewise, an unjust or undeserved quest grants bonuses to saving throws, or might even automatically fail.'
};

pri5['Rainbow'] = {
    'level': '5',
    'school': 'Evocation, Alteration',
    'sphere': 'Weather, Sun',
    'range': '120 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a vial of holy water; if no rainbow is in the vicinity, the caster can substitute a diamond of not less than 1,000 gp value, specially prepared with *bless* and *prayer* spells while in sight of a rainbow. The holy water and diamond disappear when the spell is cast',
    'reference': 'p. 284',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'To cast this spell, the priest must be in sight of a rainbow, or have a special component (see below). The *rainbow* spell has two applications, and the priest can choose the desired one at the time of casting. These applications are as follows:\n&emsp;**Bow:** The spell creates a shimmering, multi-layered short composite bow of rainbow hues. It is light and easy to pull, so that any character can use it without penalty for non-proficiency. It is magical: Each of its shimmering missiles is the equivalent of a +2 weapon, including attack and damage bonuses. Magic resistance can negate the effect of any missile fired from the bow. The bow fires seven missiles before disappearing. It can be fired up to four times per round. Each time a missile is fired, one hue leaves the bow, corresponding to the color of arrow that is released. Each color of arrow has the ability to cause double damage to certain creatures, as follows:\n\nRed—fire dwellers/users and fire elementals\nOrange—creatures or constructs of clay, sand, earth, stone or similar materials, and earth elementals\nYellow—vegetable opponents (including fungus creatures, shambling mounds, treants, etc.)\nGreen—aquatic creatures, water elementals\nBlue—aerial creatures, electricity-using creatures, and air elementals\nIndigo—acid-using or poison-using creatures\nViolet—metallic or regenerating creatures\n\n&emsp;When the bow is drawn, an arrow of the appropriate color magically appears, nocked and ready. If no color is requested, or a color that has already been used is asked for, then the next arrow (in the order of the spectrum) appears.\n&emsp;**Bridge:** The caster causes the rainbow to form a seven-hued bridge up to 3 foot wide per level of the caster. Currently [[3*[[@{level-priest}]] ]] foot wide. It must be at least 20 feet long and can be as long as 120 yards, according to the caster’s desire. It lasts as long as the spell’s duration or until ordered out of existence by the caster.'
};

pri5['Raise Dead'] = {
    'level': '5',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Necromantic',
    'range': '120 yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 284',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': 'Restored to 1 hit point',
    'effect': 'When the priest casts a *raise dead* spell, he can restore life to a dwarf, gnome, half-elf, halfling, or human (other creatures may be allowed, at the DM’s option). The length of time that the person has been dead is of importance, as the priest can raise persons dead only up to a limit of one day for each experience level of the priest. Currently [[@{level-priest}]] days dead. (i.e., a 9th-level priest can raise a person who has been dead for up to nine days).\n&emsp;Note that the body of the person must be whole, or otherwise missing parts are still missing when the person is brought back to life. Likewise, other ills, such as poison and disease, are not negated. The raised person must roll a successful resurrection survival check to survive the ordeal (see Table 3: Constitution) and loses 1 point of Constitution. Further, the raised person is weak and helpless, needing a minimum of one full day of rest in bed for each day or fraction he was dead. The person has 1 hit point when raised and must regain the rest by natural healing or curative magic.\n&emsp;A character’s starting Constitution is an absolute limit to the number of times he can be revived by this means.\n&emsp;The somatic component of the spell is a pointed finger.\n&emsp;The reverse of the spell, *slay living,* grants the victim a saving throw vs. death magic. If the saving throw is successful, the victim sustains damage equal to that of a *cause serious wounds* spell—i.e., 2d8+1 points. Failure means the victim dies instantly.'
};

pri5['Spike Stones'] = {
    'level': '5',
    'school': 'Alteration, Enchantment',
    'sphere': 'Elemental (Earth)',
    'range': '30 yards',
    'duration': '[[3d4+[[@{level-priest}]] ]] turns',
    'aoe': '[[10*[[@{level-priest}]] ]] foot square, 1 spike/square foot',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'Four tiny stalactites',
    'reference': 'p. 285',
    'book': 'PHB',
    'damage': '1d4 + modifiers',
    'damage-type': '',
    'healing': '',
    'effect': 'The *spike stones* spell causes rock to shape itself into long, sharp points that tend to blend into the background. It is effective on both natural rock and worked stone. The spike stones serve to impede progress through an area and to inflict damage. If an area is carefully observed, each observer is 25% likely to notice the sharp points of rock. Otherwise, those entering the spell’s area of effect suffer 1d4 points of damage per round. The success of each attack is determined as if the caster of the spell were actually engaging in combat. Those entering the area are subject to attack immediately upon setting foot in the area and for each round spent in the area thereafter. The initial step enables the individual to become aware of some problem only if the initial attack succeeds; otherwise movement continues and the spike stones remain unnoticed until damage occurs. Charging or running victims suffer two attacks per round.\n&emsp;Those falling into pits affected by spike stones suffer six such attacks for every 10 feet fallen, each attack having a +2 bonus to the attack roll. In addition, the damage inflicted by each attack increases by +2 for every 10 feet fallen. Finally, the creatures also suffer normal falling damage.'
};

pri5['Transmute Rock to Mud'] = {
    'level': '5',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Earth, Water)',
    'sphere-spells&magic': 'Elemental (Earth)',
    'range': '160 yards',
    'duration': 'Special',
    'aoe': '[[20*[[@{level-priest}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'Clay and water (or sand, lime, and water for the reverse)',
    'reference': 'p. 285',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell turns natural rock of any sort into an equal volume of mud. If it is cast upon a rock, for example, the rock affected collapses into mud. Magical or enchanted stone is not affected by the spell. The depth of the mud created cannot exceed 10 feet. Creatures unable to levitate, fly, or otherwise free themselves from the mud sink at the rate of 1⁄3 of their height per round and eventually suffocate, save for lightweight creatures that could normally pass across such ground. Brush thrown atop the mud can support creatures able to climb on top of it, with the amount required decided by the DM. Creatures large enough to walk on the bottom can move through the area at a rate of 10 feet per round.\n&emsp;The mud remains until a successful *dispel magic* or *transmute mud to rock* spell restores its substance—but not necessarily its form. Evaporation turns the mud to normal dirt at a rate of 1d6 days per 10 cubic feet. The exact time depends on exposure to the sun, wind, and normal drainage.\n&emsp;The reverse, *transmute mud to rock,* hardens normal mud or quicksand into soft stone (sandstone or similar mineral) permanently unless magically changed. Creatures in the mud are allowed a saving throw to escape before the area is hardened to stone. Dry sand is unaffected.'
};

pri5['True Seeing'] = {
    'level': '5',
    'school': 'Divination',
    'sphere': 'Divination',
    'sphere-spells&magic': 'All',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '*True Seeing*: An ointment for the eyes that is made from very rare mushroom powder, saffron, and fat and costs no less than 300 gp per use. *False Seeing*: An ointment concocted of oil, poppy dust, and pink orchid essence.\n&emsp;For both spells, the ointment must be aged for 1d6 months',    'reference': 'p. 285',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the priest employs this spell, he confers upon the recipient the ability to see all things as they actually are. The spell penetrates normal and magical darkness. Secret doors become plain. The exact location of displaced things is obvious. Invisible things become quite visible. Illusions and apparitions are seen through. Polymorphed, changed, or enchanted things are apparent. Even the aura projected by creatures becomes visible, so that alignment can be discerned. Further, the recipient can focus his vision to see into the Ethereal plane or the bordering areas of adjacent planes. The range of vision conferred is 120 feet. *True seeing,* however, does not penetrate solid objects; it in no way confers X-ray vision or its equivalent. In addition, the spell effects cannot be further enhanced with known magic.\n&emsp;The reverse, *false seeing*, causes the person to see things as they are not: rich is poor, rough is smooth, beautiful is ugly.'
};

pri5['Wall of Fire'] = {
    'level': '5',
    'school': 'Conjuration/Summoning',
    'sphere': 'Elemental (Fire)',
    'range': '80 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'Phosphorus',
    'reference': 'p. 286',
    'book': 'PHB',
    'damage': '2d4 / 1d4 heat damage or 4d4+[[@{level-priest}]]',
    'damage-type': 'fire damage',
    'healing': '',
    'effect': 'The *wall of fire* spell brings forth an immobile, blazing curtain of magical fire of shimmering color—yellow-green or amber (different from the 4th-level wizard version). The spell creates an opaque sheet of flame up to one 20-foot square per level of the spellcaster ([[20*[[@{level-priest}]] ]] foot square), or a ring with a radius of up to 10 feet + 5 feet for every two levels of experience of the spellcaster ([[10+floor([[@{level-priest}]]/2)*5]] foot radius), and 20 feet high.\n&emsp;The wall of fire must be cast so that it is vertical with respect to the caster. One side of the wall, selected by the caster, sends forth waves of heat, inflicting 2d4 points of damage upon creatures within 10 feet and 1d4 points of damage upon those within 20 feet. In addition, the wall inflicts 4d4 points of damage, plus 1 point of damage per level of the spellcaster (4d4+[[@{level-priest}]] damage), to any creature passing through it. Creatures especially subject to fire may take additional damage, and undead always take twice normal damage. Note that attempting to directly catch moving creatures with a newly created wall of fire is difficult. A successful saving throw enables the creature to avoid the wall, while its rate and direction of movement determine which side of the created wall it is on. The wall of fire lasts as long as the priest concentrates on maintaining it, or one round per level of experience of the priest in the event he does not wish to concentrate upon it. Currently [[@{level-priest}]] rounds.'
};

const pri6 = {};
pri6['Aerial Servant'] = {
    'level': '6',
    'school': 'Conjuration/Summoning',
    'sphere': 'Summoning',
    'range': '10 yards',
    'duration': '[[@{level-priest}]] days',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 287',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell summons an invisible aerial servant to find and bring back an object or creature described to it by the priest. Unlike an elemental, an aerial servant cannot be commanded to fight for the caster. When it is summoned, the priest must have cast a *protection from evil* spell, be within a protective circle, or have a special item used to control the aerial servant. Otherwise, it attempts to slay its summoner and return from whence it came.\n&emsp;The object or creature to be brought must be such as to allow the aerial servant to physically bring it to the priest (an aerial servant can carry at least 1,000 pounds). If prevented, for any reason, from completing the assigned duty, the aerial servant returns to its own plane whenever the spell lapses, its duty is fulfilled, it is dispelled, the priest releases it, or the priest is slain. The spell lasts for a maximum of one day for each level of experience of the priest who cast it.\n&emsp;If the creature to be fetched cannot detect invisible objects, the aerial servant attacks, automatically gaining surprise. If the creature involved can detect invisible objects, it still suffers a -2 penalty to all surprise rolls caused by the aerial servant. Each round of combat, the aerial servant must roll to attack. When a hit is scored, the aerial servant has grabbed the item or creature it was sent for.\n&emsp;A creature with a Strength rating is allowed an evasion roll, equal to twice its *bend bars* chance, to escape the hold. If the creature in question does not have a Strength rating, roll 1d8 for each Hit Die the aerial servant and the creature grabbed have. The higher total is the stronger.\n&emsp;Once seized, the creature cannot free itself by Strength or Dexterity and is flown to the priest forthwith.'
};

pri6['Animal Summoning III'] = {
    'level': '6',
    'school': 'Conjuration, Summoning',
    'sphere': 'Animal, Summoning',
    'sphere-spells&magic': 'Animal',
    'range': '[[100*[[@{level-priest}]] ]] yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 287',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is the same in duration and effect as the 4th-level *animal summoning I* spell, except that up to four animals of no more than 16 Hit Dice each can be summoned, or eight of no more than 8 Hit Dice, or 16 creatures of no more than 4 Hit Dice. Only animals within range of the caster at the time the spell is cast will come. The caster can try three times to summon three different types of animals—e.g., suppose that wild dogs are first summoned to no avail, then hawks are unsuccessfully called, and finally the caster calls for wild horses that may or may not be within summoning range. Your DM will determine the chance of a summoned animal type being within range of the spell. The animals summoned will aid the caster by whatever means they possess, staying until a fight is over, a specific mission is finished, the caster is safe, he sends them away, etc. Only normal or giant animals can be summoned; fantastic animals or monsters cannot be summoned by this spell (no chimerae, dragons, gorgons, manticores, etc.).'
};

pri6['Animate Object'] = {
    'level': '6',
    'school': 'Alteration',
    'sphere': 'Creation, Summoning',
    'sphere-spells&magic': 'Summoning',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '[[@{level-prist}]] cubic feet',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 287',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This powerful spell enables the priest casting it to imbue inanimate objects with mobility and a semblance of life. The animated object, or objects, then attacks whomever or whatever the priest first designates. The animated object can be of any nonmagical material whatsoever—wood, metal, stone, fabric, leather, ceramic, glass, etc. Attempting to animate an object in someone’s possession grants that person a saving throw to prevent the spell’s effect. The speed of movement of the object depends on its means of propulsion and its weight. A large wooden table would be rather heavy, but its legs would give it speed. A rug could only slither along. A jar would roll. Thus a large stone pedestal would rock forward at 10 feet per round, a stone statue would move at 40 feet per round, a wooden statue 80 feet per round, an ivory stool of light weight would move at 120 feet per round. Slithering movement is about 10 feet to 20 feet per round; rolling is 30 feet to 60 feet per round. The damage caused by the attack of an animated object depends on its form and composition. Light, supple objects can only obscure vision, obstruct movement, bind, trip, smother, etc. Light, hard objects can fall upon or otherwise strike for 1d2 points of damage or possibly obstruct and trip, as do light, supple objects. Hard, medium-weight objects can crush or strike for 2d4 points of damage, while larger and heavier objects may inflict 3d4, 4d4, or even 5d4 points of damage.\n&emsp;The frequency of attack of animated objects depends on their method of locomotion, appendages, and method of attack. This varies from as seldom as once every five melee rounds to as frequently as once per round. The Armor Class of the object animated is basically a function of material and movement ability. Damage depends on the type of weapon and the object struck. A sharp cutting weapon is effective against fabric, leather, wood, and like substances. Heavy smashing and crushing weapons are useful against wood, stone, and metal objects. Your DM will determine all of these factors, as well as how much damage the animated object can sustain before being destroyed. The priest can animate one cubic foot of material for each experience level he has attained. Thus, a 14th-level priest could animate one or more objects whose solid volume did not exceed 14 cubic feet—a large statue, two rugs, three chairs, or a dozen average crocks.'
};

pri6['Antianimal Shell'] = {
    'level': '6',
    'school': 'Abjuration',
    'sphere': 'Animal, Protection',
    'range': '0',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol and a handful of pepper',
    'reference': 'p. 288',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell, the caster brings into being a hemispherical force field that prevents the entrance of any sort of living creature that is wholly or partially animal (not magical or extraplanar). Thus a sprite, a giant, or a chimera would be kept out, but undead or conjured creatures could pass through the shell of force, as could such monsters as aerial servants, imps, quasits, golems, elementals, etc. The anti-animal shell functions normally against crossbreeds, such as cambions, and lasts for one turn for each level of experience the caster has attained. Forcing the barrier against creatures strains and ultimately collapses the field.'
};

pri6['Blade Barrier'] = {
    'level': '6',
    'school': 'Evocation',
    'sphere': 'Guardian, Creation',
    'range': '30 yards',
    'duration': '[[3*[[@{level-priest}]] ]] rounds',
    'aoe': '5-60 feet square',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 288',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The priest employs this spell to set up a wall of circling, razor-sharp blades. These whirl and flash around a central point, creating an immobile barrier. Any creature attempting to pass through the blade barrier suffers 8d8 points of damage. The plane of rotation of the blades can be horizontal, vertical, or in between. Creatures within the area of the barrier when it is invoked are entitled to a saving throw vs. spell. If this is successful, the blades are avoided and no damage is suffered; the creature escapes the area of the blade barrier by the shortest possible route. The barrier remains for three rounds for every experience level of the priest casting it. The barrier can cover an area from as small as 5 feet square to as large as 60 feet square.'
};

pri6['Conjure Animals'] = {
    'level': '6',
    'school': 'Conjuration/Summoning',
    'sphere': 'Summoning',
    'range': '30 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 288',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The conjure animals spell enables the priest to magically create one or more mammals to attack his opponents. The total Hit Dice of the mammals cannot exceed twice the level of the priest (Currently [[2*[[@{level-priest}]] ]] Hit Dice), if the creature conjured is determined randomly. If a specific animal type is requested, the animal’s Hit Dice cannot exceed his level (Currently [[@{level-priest}]]). The DM selects the type of animal that appears if it is randomly called. Thus, a priest of 12th level could randomly conjure two mammals with 12 Hit Dice each, four with 6 Hit Dice each, six with 4 Hit Dice each, eight with 3 Hit Dice each, 12 with 2 Hit Dice each, or 24 with 1 Hit Die each. Count every +1 hit point added to a creature’s Hit Dice as ¼ of a Hit Die. Thus a creature with 4 + 3 Hit Dice equals a 4¾ Hit Dice creature. The conjured animals remain for two rounds for each level of the conjuring priest, or until slain, and they follow the caster’s verbal commands. Conjured animals unfailingly attack the priest’s opponents, but resist being used for any other purpose—they do not like it, become noticeably more difficult to control, and may refuse any action, break free, or turn on the caster, depending on the nature of the creature and the details of the situation. The conjured animals disappear when slain.'
};

pri6['Conjure Fire Elemental'] = {
    'level': '6',
    'school': 'Conjuration/Summoning (Reversible)',
    'sphere': 'Elemental (Fire)',
    'range': '80 yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '6 rounds',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 288',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting a *conjure fire elemental* spell, the caster opens a special gate to the elemental plane of Fire, and a fire elemental is summoned to the vicinity of the spellcaster. It is 65% likely that a 12 Hit Dice elemental appears, 20% likely that a 16 Hit Dice elemental appears, 9% likely that two to four salamanders appear, 4% likely that an efreeti appears, and 2% likely that a huge fire elemental of 21 to 24 Hit Dice appears. The caster need not fear that the elemental force summoned will turn on him, so concentration upon the activities of the fire elemental (or other creatures summoned) or protection from the creature is not necessary. The elemental summoned helps the caster however possible, including attacking the caster’s opponents. The fire elemental or other creature summoned remains for a maximum of one turn per level of the caster, or until it is slain, sent back by a *dispel magic* spell, the reverse of this spell, *dismiss fire elemental,* or similar magic.'
};

pri6['Find the Path'] = {
    'level': '6',
    'school': 'Divination (Reversible)',
    'sphere': 'Divination',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '3 rounds',
    'saving-throw': 'None',
    'materials': 'A set of divination counters of the sort favored by the priest—bones, ivory counters, sticks, carved runes, or whatever',
    'reference': 'p. 288',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The recipient of this spell can find the shortest, most direct physical route that he is seeking, be it the way into or out of a locale. The locale can be outdoors or under ground, a trap, or even a *maze* spell. Note that the spell works with respect to locales, not objects or creatures within a locale. Thus, the spell could not find the way to “a forest where a green dragon lives” or to the location of “a hoard of platinum pieces.” The location must be in the same plane as the caster.\n&emsp;The spell enables the subject to sense the correct direction that will eventually lead him to his destination, indicating at the appropriate times the exact path to follow or physical actions to take. For example, with concentration the spell enables the subject to sense trip wires or the proper word to bypass a glyph. The spell ends when the destination is reached or when one turn for each caster level has elapsed. The spell frees the subject, and those with him, from a *maze* spell in a single round, and will continue to do so as long as the spell lasts.\n&emsp;Note that this divination is keyed to the caster, not his companions, and that, like the *find traps* spell, it does not predict or allow for the actions of creatures.\n&emsp;The reverse spell, *lose the path,* makes the creature touched totally lost and unable to find its way for the duration of the spell—although it can be led, of course.'
};

pri6['Fire Seeds'] = {
    'level': '6',
    'school': 'Conjuration',
    'sphere': 'Elemental (Fire)',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns or until used',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round/seed',
    'saving-throw': '½',
    'materials': 'Acorns or holly berries',
    'reference': 'p. 288',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *fire seeds* spell creates special missiles or timed incendiaries that burn with great heat. The spell can be cast to create either fire seed missiles or fire seed incendiaries, as chosen when the spell is cast.\n&emsp;**Fire seed missiles:** This casting turns up to four acorns into special grenadelike missiles that can be hurled up to 40 yards. An attack roll is required to strike the intended target, and proficiency penalties are considered. Each acorn bursts upon striking any hard surface, causing 2d8 points of damage and igniting any combustible materials within a 10-foot diameter of the point of impact. If a successful saving throw vs. spell is made, a creature within the burst area receives only one-half damage, but a creature struck directly suffers full damage (i.e., no saving throw).\n&emsp;**Fire seed incendiaries:** This casting turns up to eight holly berries into special incendiaries. The holly berries are most often placed, being too light to make effective missiles. They can be tossed only up to 6 feet away. They burst into flame if the caster is within 40 yards and speaks a word of command. The berries instantly ignite, causing 1d8 points of damage to any creature and igniting any combustible within a 5-foot-diameter burst area. Creatures within the area that successfully save vs. spell suffer half damage.\n&emsp;All fire seeds lose their power after a duration equal to one turn per experience level of the caster—e.g., the seeds of a 13th-level caster remain potent for a maximum of 13 turns after their creation.'
};

pri6['Forbiddance'] = {
    'level': '6',
    'school': 'Abjuration',
    'sphere': 'Protection',
    'sphere-spells&magic': 'Guardian',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '[[@{level-priest}]] 60-foot cube',
    'components': 'V, S, M',
    'cast-time': '6 rounds',
    'saving-throw': 'Special',
    'materials': 'The priest’s holy symbol, holy water, and rare incenses worth at least 1,000 gp per 60-foot cube; if a password lock is desired, this also requires the burning of rare incenses worth at least 5,000 gp per 60-foot cube',
    'reference': 'p. 289',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can be used to secure a consecrated area (see the *Dungeon Master Guide*). The spell seals the area from teleportation, plane shifting, and ethereal penetration. At the option of the caster, the ward can be locked by a password, in which case it can be entered only by those speaking the proper words. Otherwise, the effect on those entering the enchanted area is based on their alignment, relative to the caster’s. The most severe penalty is used.\n&emsp;**Alignment identical:** No effect. If password locked, cannot enter area unless password is known (no saving throw).\n&emsp;**Alignment different with respect to law and chaos:** Save vs. spell to enter the area; if failed, suffer 2d6 points of damage. If password locked, cannot enter unless password is known.\n&emsp;**Alignment different with respect to good and evil:** Save vs. spell to enter this area; if failed, suffer 4d6 points of damage. If word locked, cannot enter unless password is known. The attempt does cause damage if the save is failed.\n&emsp;Once a saving throw is failed, an intruder cannot enter the forbidden area until the spell ceases. The ward cannot be dispelled by a caster of lesser level than the one who established it. Intruders who enter by rolling successful saving throws feel uneasy and tense, despite their success.'
};

pri6['Heal'] = {
    'level': '6',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Healing',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 289',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': 'All hit points and diseases',
    'effect': 'The very potent *heal* spell enables the priest to wipe away disease and injury in the creature who receives the benefits of the spell. It completely cures all diseases or blindness of the recipient and heals all points of damage suffered due to wounds or injury. It dispels a *feeblemind* spell. It cures those mental disorders caused by spells or injury to the brain. Naturally, the effects can be negated by later wounds, injuries, and diseases.\n&emsp;The reverse, *harm,* infects the victim with a disease and causes loss of all but 1d4 hit points, if a successful touch is inflicted. For creatures that are not affected by the *heal* or *harm* spell, see the *cure light wounds* spell.'
};

pri6['Heroes\' Feast'] = {
    'level': '6',
    'school': 'Evocation',
    'sphere': 'Creation',
    'range': '10 yards',
    'duration': '1 hour',
    'aoe': '[[@{level-priest}]] feasters',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and specially fermented honey taken from the cells of bee larvae destined for royal status',
    'reference': 'p. 289',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '[[1d4+4]] hit points and cured of all diseases. Also becomes immune to poison, fear, hopelessness, panic and gain *bless* for 12 hours',
    'effect': 'This spell enables the priest to bring forth a great feast that serve as many creatures as the priest has levels of experience. The spell creates a magnificent table, chairs, service, and all the necessary food and drink. The feast takes one full hour to consume, and the beneficial effects do not set in until after this hour is over. Those partaking of the feast are cured of all diseases, are immune to poison for 12 hours, and are healed of 1d4+4 points of damage after imbibing the nectarlike beverage that is part of the feast. The ambrosialike food that is consumed is equal to a *bless* spell that lasts for 12 hours. Also, during this same period, the people who consumed the feast are immune to fear, hopelessness, and panic. If the feast is interrupted for any reason, the spell is ruined and all effects of the spell are negated.'
};

pri6['Liveoak'] = {
    'level': '6',
    'school': 'Enchantment',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] days',
    'aoe': '1 oak tree',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol',
    'reference': 'p. 290',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to charm a healthy oak tree (or other type if the DM allows) to cause it to serve as a protector. The spell can be cast on a single tree at a time. While a *liveoak* spell cast by a particular caster is in effect, he cannot cast another such spell. The tree upon which the spell is cast must be within 10 feet of the caster’s dwelling place, within a place sacred to the caster, or within 100 yards of something that the caster wishes to guard or protect.\n&emsp;The *liveoak* spell can be cast upon a healthy tree of small, medium, or large size, according to desire and availability. A triggering phrase of up to maximum of one word per level of the spellcaster is then placed upon the targeted oak. For instance, “Attack any persons who come near without first saying *sacred mistletoe*” is an 11-word trigger phrase that could be used by a caster of 11th level or higher casting the spell. The *liveoak* spell triggers the tree into animating as a treant of equivalent size, an Armor Class of 0 and with two attacks per round, but with only a 30-feet-per-round movement rate.}}{{style=bottom sheet-spell-center3 sheet-spell-center4}}{{c1-1=**Tree Size**}}{{c2-1=Small}}{{c3-1=Medium}}{{c4-1=Large}}{{c1-2=**Height**}}{{c2-2=12’–14’}}{{c3-2=16’–19’}}{{c4-2=20’–23’+}}{{c1-3=**Hit Dice**}}{{c2-3=7–8}}{{c3-3=9–10}}{{c4-3=11–12}}{{c1-4=**Damage per Attack**}}{{c2-4=2d8}}{{c3-4=3d6}}{{c4-4=4d6}}{{effects2=&emsp;A tree enchanted by this spell radiates a magical aura (if checked for), and can be returned to normal by a successful casting of a *dispel magic* spell, or upon the desire of the caster who enchanted it. If dispelled, the tree takes root immediately. If released by the caster, it tries to return to its original location before taking root. Damage to the tree can be healed with a *plant growth* spell, which restores 3d4 points of damage. A *plant growth* spell used in this fashion does not increase the size or hit points of the liveoak beyond the original value.'
};

pri6['Part Water'] = {
    'level': '6',
    'school': 'Alteration',
    'sphere': 'Elemental (Water)',
    'range': '[[20*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[3*[[@{level-priest}]] ]] feet × [[20*[[@{level-priest}]] ]] yards x 30 yards',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol',
    'reference': 'p. 290',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By employing a *part water* spell, the priest is able to cause water or similar liquid to move apart, thus forming a trough. The depth and length of the trough created by the spell depends on the level of the priest. A trough 3 feet deep per caster level, by 30 yards wide, by 20 yards long per level is created. Thus at 12th level, the priest would part water 36 feet deep by 30 yards wide by 240 yards long. The trough remains as long as the spell lasts or until the priest who cast it opts to end its effects. Existing currents appear to flow through the parted water, although swimming creatures and physical objects such as boats do not enter the rift without strenuous and deliberate effort. If cast underwater, this spell creates an air cylinder of appropriate length and diameter. If cast directly on a water elemental or other water-based creature, the creature suffers 48 points of damage and must roll a successful saving throw vs. spell or flee in panic for 3d4 rounds.'
};

pri6['Speak With Monsters'] = {
    'level': '6',
    'school': 'Alteration',
    'sphere': 'Divination',
    'sphere-spells&magic': 'All',
    'range': '30 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 290',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast, the *speak with monsters* spell enables the priest to converse with any type of creature that has any form of communicative ability (including empathic, tactile, pheromonic, etc.). That is, the monster understands, in its own language or equivalent, the intent of what is said to it by the priest and vice versa. The creature thus spoken to is checked by the DM to determine a reaction. All creatures of the same type as that chosen by the priest can likewise understand if they are within range. The priest can speak to different types of creatures during the spell duration, but he must speak separately to each type. The spell lasts for two rounds per caster level.'
};

pri6['Stone Tell'] = {
    'level': '6',
    'school': 'Divination',
    'sphere': 'Elemental (Earth), Divination',
    'range': 'Touch',
    'duration': '1 turn',
    'aoe': '1 cubic yard',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A drop of mercury and a bit of clay',
    'reference': 'p. 290',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the priest casts a *stone tell* spell upon an area, the very stones speak and relate to the caster who or what has touched them as well as revealing what is covered, concealed, or simply behind them. The stones relate complete descriptions, if asked. Note that a stone’s perspective, perception, and knowledge may hinder this divination. Such details, if any, are decided by the DM.'
};

pri6['Transmute Water to Dust'] = {
    'level': '6',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Water, Earth)',
    'sphere-spells&magic': 'Elemental (Water)',
    'range': '60 yards',
    'duration': 'Permanent',
    'aoe': '[[@{level-priest}]] cubic yards',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'Special',
    'materials': 'Diamond dust of at least 500 gp value, a bit of sea shell, and the caster’s holy symbol plus a pinch of normal dust for the reverse',
    'reference': 'p. 291',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the subject area instantly undergoes a change from liquid to powdery dust. Note that if the water is already muddy, the area of effect is doubled, while if wet mud is present, the area of effect is quadrupled. If water remains in contact with the transmuted dust, the former quickly permeates the latter, turning the dust into silty mud. If there is not a sufficient quantity of water to cause that effect, it simply soaks or dampens the dust accordingly.\n&emsp;Only the liquid actually in the area of effect at the moment of spellcasting is affected. Potions that contain water as a component part are rendered useless. Living creatures are unaffected, except for those native to the elemental plane of Water. Such creatures must roll a successful saving throws vs. death or be slain. However, only one such creature can be affected by any single casting of this spell, regardless of the creature’s size or the size of the spell’s area of effect.\n&emsp;The reverse of this spell is simply a very high-powered *create water* spell that requires a pinch of normal dust as an additional material component.'
};

pri6['Transport Via Plants'] = {
    'level': '6',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 291',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to enter any plant (human-sized or larger) and pass any distance to a plant of the same species in a single round, regardless of the distance separating the two. The entry plant must be alive. The destination plant need not be familiar to the caster, but it also must be alive. If the caster is uncertain of the destination plant, he need merely determine direction and distance, and the *transport via plants* spell moves him as close as possible to the desired location. There is a 20% chance, reduced by 1% per level of experience of the caster (Currently [[20-[[@{level-priest}]] ]]%), that the transport delivers the caster to a similar species of plant from 1 to 100 miles away from the desired destination plant. If a particular destination plant is desired, but the plant is not living, the spell fails and the caster must come forth from the entrance plant within 24 hours. Note that this spell does not function with plantlike creatures such as shambling mounds, treants, etc. The destruction of an occupied plant slays the caster (see the *plant door* spell).'
};

pri6['Turn Wood'] = {
    'level': '6',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '0',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '[[20*[[@{level-priest}]] ]] ft. × 120 feet',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 291',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, waves of force roll forth from the caster, moving in the direction he faces and causing all wooden objects in the path of the spell to be pushed away from the caster to the limit of the area of effect. Wooden objects above 3 inches in diameter that are fixed firmly are not affected, but loose objects (movable mantles, siege towers, etc.) move back. Objects less than 3 inches in diameter that are fixed splinter and break, and the pieces move with the wave of force. Thus, objects such as wooden shields, spears, wooden weapon shafts and hafts, and arrows and bolts are pushed back, dragging those carrying them with them. If a spear is planted to prevent this forced movement, it splinters. Even magical items with wooden sections are turned, although an anti-magic shell blocks the effects. A successful *dispel magic* spell ends the effect. Otherwise, the *turn wood* spell lasts for one round for each experience level of the caster.\n&emsp;The waves of force continue to sweep down the set path for the spell’s duration, pushing back wooden objects in the area of effect at a rate of 40 feet per melee round. The length of the path is 20 feet per level of the caster. Currently [[20*[[@{level-priest}]] ]] feet. Thus if a 14th-level priest casts a *turn wood* spell, the area of effect is 120 feet wide by 280 feet long, and the spell lasts 14 rounds. After casting the spell, the path is set and the caster can then do other things or go elsewhere without affecting the spell’s power.'
};

pri6['Wall of Thorns'] = {
    'level': '6',
    'school': 'Conjuration/Summoning',
    'sphere': 'Plant, Creation',
    'sphere-spells&magic': 'Plant',
    'range': '80 yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[@{level-priest}]] 10-foot cubes',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 291',
    'book': 'PHB',
    'damage': '8 + creatures AC',
    'damage-type': '',
    'healing': '',
    'effect': 'The *wall of thorns* spell creates a barrier of very tough, pliable, tangled brush bearing needle-sharp thorns as long as a person’s finger. Any creature breaking through (or crashing into) the wall of thorns suffers 8 points of damage, plus an additional amount of damage equal to the creature’s AC. Negative ACs subtract from the base 8 points of damage, but no adjustment is made for Dexterity. Any creature within the area of effect of the spell when it is cast, crashes into the *wall of thorns* and must break through to move. The damage is based on each 10-foot thickness of the barrier.\n&emsp;If the wall of thorns is chopped at, it takes at least four turns to cut a path through a 10-foot thickness. Normal fire cannot harm the barrier, but magical fires burn away the barrier in two turns, creating a wall of fire effect while doing so (see *wall of fire* spell). In this case, the cool side of the wall is that closest to the caster of the thorn wall.\n&emsp;The nearest edge of the wall of thorns appears up to 80 yards distant from the caster, as he desires. The spell’s duration is one turn for each level of experience of the caster, and it covers one 10-foot cube per level of the caster in whatever shape the caster desires. Thus a 14th-level caster could create a wall of thorns up to 70 feet long by 20 feet high (or deep) by 10 feet deep (or high), a 10-foot-high by 10-foot-wide by 140-foot-long wall to block a dungeon passage, or any other sort of shape that suited his needs. The caster can also create a wall of 5-foot thickness, which inflicts half damage but can be doubled in one of the other dimensions. Note that those with the ability to pass through overgrown areas are not hindered by this barrier. The caster can dismiss the barrier on command.'
};

pri6['Weather Summoning'] = {
    'level': '6',
    'school': 'Conjuration/Summoning',
    'sphere': 'Weather',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 292',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By this spell, the caster calls forth weather appropriate to the climate and season of the area he is in. Thus, in spring a tornado, thunderstorm, sleet storm, or hot weather could be summoned. In summer a torrential rain, heat wave, hail storm, etc., can be called for. In autumn, hot or cold weather, fog, sleet, etc., could be summoned. Winter enables great cold, blizzard, or thaw conditions to be summoned. Hurricane-force winds can be summoned near coastal regions in the later winter or early spring. The summoned weather is not under the control of the caster. It might last but a single turn, in the case of a tornado, or for hours or even days in other cases. The area of effect likewise varies from about 1 square mile to 100 square miles. Note that several casters can act in concert to greatly affect weather, controlling winds, and working jointly to summon very extreme weather conditions.\n&emsp;Within four turns after the spell is cast, the trend of the weather to come is apparent—e.g., clearing skies, gusts of warm or hot air, a chill breeze, overcast skies, etc. Summoned weather arrives [[1d12+5]] turns after the spell is cast. Note that the new weather condition cannot be changed by the caster once it has been summoned. Once the weather is fully summoned, it cannot be dispelled. If the summoning is successfully dispelled before it has been completed, the weather slowly reverts to its original condition.'
};

pri6['Word of Recall'] = {
    'level': '6',
    'school': 'Alteration',
    'sphere': 'Summoning',
    'sphere-spells&magic': 'Combat, Summoning',
    'range': '0',
    'duration': 'Special',
    'aoe': 'The caster',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 292',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The word of recall spell takes the priest instantly back to his sanctuary when the word is uttered. The sanctuary must be specifically designated in advance by the priest and must be a well-known place. The actual point of arrival is a designated area no larger than 10’ × 10’. The priest can be transported any distance, from above or below ground. Transportation by the *word of recall* spell is safe within a plane, but for each plane the priest is removed, there is a 10% cumulative chance that the priest is irrevocably lost. The priest is able to transport, in addition to himself, 25 pounds of weight per experience level. Currently [[25*[[@{level-priest}]] ]] pounds of weight. Thus, a 15th-level priest could transport his person and an additional 375 pounds. This extra matter can be equipment, treasure, or even living material, such as another person. Exceeding this limit causes the spell to fail. Note that unusually strong physical fields, such as magnetic or gravitational forces, or even magical applications can, at the DM’s option, make the use of this spell hazardous or impossible.'
};

const pri7 = {};
pri7['Animate Rock'] = {
    'level': '7',
    'school': 'Alteration',
    'sphere': 'Elemental (Earth)',
    'range': '40 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '[[2*[[@{level-priest}]] ]] cubic feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A stone and drop of the caster’s blood',
    'reference': 'p. 292',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By employing an *animate rock* spell, the caster causes a stone object of up to the indicated size to move (see the 6th-level *animate object* spell.). The animated stone object must be separate (not a part of a huge boulder or the like). It follows the desire of the caster—attacking, breaking objects, blocking—while the magic lasts. It has no intelligence or volition of its own, but it follows instructions exactly as spoken. Only one set of instructions for one single action can be given to the animated rock, and the directions must be brief, about a dozen words or so. The rock remains animated for one round per experience level of the caster. The volume of rock that can be animated is also based on the experience level of the caster—2 cubic feet of stone per level, such as 24 cubic feet, a mass of about man-sized, at 12th level.\n&emsp;While the exact details of the animated rock are decided by the DM, its Armor Class is no worse than 5, and it has 1d3 hit points per cubic foot of volume. It uses the attack roll of the caster. The maximum damage it can inflict is 1d2 points per caster level. Thus, a 12th-level caster’s rock might inflict 12 to 24 points of damage. Movement for a man-sized rock is 60 feet per round. A rock generally weighs from 100 to 300 pounds per cubic foot.'
};

pri7['Astral Spell'] = {
    'level': '7',
    'school': 'Alteration',
    'sphere': 'Astral',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '½ hour',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 293',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, a priest is able to project his astral body into the Astral plane, leaving his physical body and material possessions behind on the Prime Material plane. As the Astral plane touches upon the first levels of all the outer planes, the priest can travel astrally to the first level of any of these outer planes as he wills. The priest then leaves the Astral plane, forming a body on the plane of existence he has chosen to enter. It is also possible to travel astrally anywhere in the Prime Material plane by means of the *astral* spell. However, a second body cannot be formed on the Prime Material plane.\n&emsp;As a general rule, a person astrally projected can be seen only by creatures on the Astral plane. The astral body is connected at all times to the material body by a silvery cord. If the cord is broken, the affected person is killed, astrally and materially, but generally only the psychic wind can cause the cord to break. When a second body is formed on a different plane, the silvery cord remains invisibly attached to the new body. If the second body or astral form is slain, the cord simply returns to the caster’s body where the body rests on the Prime Material plane, reviving it from its state of suspended animation. Although astral projections are able to function on the Astral plane, their actions affect only creatures existing on the Astral plane; a physical body must be materialized on other planes.\n&emsp;The spell lasts until the priest desires to end it, or until it is terminated by some outside means, such as *dispel magic* spell or destruction of the priest’s body on the Prime Material plane—which kills the priest. The priest can project the astral forms of up to seven other creatures with himself by means of the *astral* spell, providing the creatures are linked in a circle with the priest. These fellow travelers are dependent upon the priest and can be stranded if something happens to the priest. Travel in the Astral plane can be slow or fast, according to the priest’s desire. The ultimate destination arrived at is subject to the desire of the priest.'
};

pri7['Changestaff'] = {
    'level': '7',
    'school': 'Evocation, Enchantment',
    'sphere': 'Plant, Creation',
    'sphere-spells&magic': 'Plant',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'The caster’s staff',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A specially prepared staff (see below) and either his holy symbol or leaves (ash, oak, or yew) of the same sort as the staff',
    'reference': 'p. 293',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to change a specially prepared staff into a treantlike creature of the largest size, about 24 feet tall. When the priest plants the end of the staff in the ground and speaks a special command and invocation, the staff turns into a treantlike creature with 12 Hit Dice, 40 hit points, and Armor Class 0. It attacks twice per round, inflicting 4d6 points of damage with every successful attack. The staff-treant defends the caster and obeys any spoken commands. However, it is by no means a true treant; it cannot converse with actual treants or control trees. The transformation lasts either for as many turns as the caster has experience levels, currently [[@{level-priest}]] turns, until the caster commands the staff to return to its true form, or until the staff is destroyed, whichever occurs first. If the staff-treant is reduced to 0 hit points or less, it crumbles to a sawdustlike powder and the staff is destroyed. Otherwise, the staff can be used again after 24 hours and the staff-treant is at full strength.\n&emsp;The staff for the *changestaff* spell must be specially prepared. The staff must be a sound limb cut from an ash, oak, or yew tree struck by lightning no more than 24 hours before the limb is cut. The limb must then be cured by sun drying and special smoke for 28 days. Then it must be shaped, carved, and polished for another 28 days. The caster cannot adventure or engage in other strenuous activity during either of these periods. The finished staff, engraved with woodland scenes, is then rubbed with the juice of holly berries, and the end of it is thrust into the earth of the caster’s grove while he casts a *speak with plant* spell, calling upon the staff to assist in time of need. The item is then charged with a magic that will last for many changes from staff to treant and back again.'
};

pri7['Chariot of Sustarre'] = {
    'level': '7',
    'school': 'Evocation',
    'sphere': 'Elemental (Fire), Creation',
    'sphere-spells&magic': 'Elemental (Fire)',
    'range': '10 yards',
    'duration': '12 hours',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A small piece of wood, two holly berries, and a fire source at least equal to a torch',
    'reference': 'p. 294',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, it brings forth a large, flaming chariot pulled by two fiery horses from the elemental plane of Fire. These appear in a clap of thunder amid a cloud of smoke. The vehicle moves at 24 on the ground, 48 flying, and can carry the caster and up to seven other creatures of man-size or less. The passengers must be touched by the caster to protect them from the flames of the chariot. Creatures other than the caster and his designated passengers sustain 2d4 points of fire damage each round if they come within 5 feet of the horses or chariot. Such creatures suffer no damage if they evade the area by rolling successful saving throws vs. petrification, with Dexterity adjustments.\n&emsp;The caster controls the chariot by verbal command, causing the flaming steeds to stop or go, walk, trot, run or fly, and turn left or right as he desires. Note that the chariot of Sustarre is a physical manifestation and can sustain damage. The vehicle and steeds are struck only by magical weapons or by water (one quart of which inflicts 1 point of damage). They are Armor Class 2, and each requires 30 points of damage to dispel. Naturally, fire has no effect upon either the vehicle or its steeds, but magical fires other than those of the chariot can affect the riders. Other spells, such as a successful *dispel magic* or *holy word,* will force the chariot back to its home plane, without its passengers. The chariot can be summoned only once per week.'
};

pri7['Confusion'] = {
    'level': '7',
    'school': 'Enchantment/Charm',
    'sphere': 'Charm',
    'range': '80 yards',
    'duration': '[[@[level-priest}]] rounds',
    'aoe': '[[1d4+floor([[@{level-priest}]]/2)]] creatures in a 40-foot square',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'A set of three nut shells',
    'reference': 'p. 294',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes confusion in one or more creatures within the area, creating indecision and the inability to take effective action. The spell affects 1d4 creatures, plus one creature per two caster levels. Thus, seven to ten creatures can be affected by a 12th- or 13th-level caster, eight to 11 by a 14th- or 15th-level caster, etc. These creatures are allowed saving throws vs. spell with -2 penalties, adjusted for Wisdom. Those successfully saving are unaffected by the spell. Confused creatures react as follows (roll 1d10):}}{{style=center1}}{{c1-1=**d10**}}{{c2-1=1}}{{c3-1=2-6}}{{c4-1=7-9}}{{c5-1=10}}{{c1-2=**Reaction**}}{{c2-2=Wander away (unless prevented) for duration of spell}}{{c3-2=Stand confused one round (then roll again)}}{{c4-2=Attack nearest creature for one round (then roll again)}}{{c5-2=Act normally for one round (then roll again)}}{{effects2=&emsp;The spell lasts one round for each level of the caster. Those who fail their saving throws are checked by the DM for actions each round, for the duration of the spell, or until they “wander away.”\n&emsp;Wandering creatures move as far from the caster as possible in their most typical mode of movement (characters walk, fish swim, bats fly, etc.). This is not panicked flight. Wandering creatures also have a 50% chance of using any special innate movement abilities (plane shift, burrowing, flight, etc.). Saving throws and actions are checked at the beginning of each round. Any confused creature that is attacked perceives the attacker as an enemy and acts according to its basic nature.\n&emsp;Note: If there are many creatures involved, the DM may decide to assume average results. For example, if there are 16 orcs affected and 25% could be expected to successfully roll the saving throw, then four are assumed to have succeeded, one wanders away, four attack the nearest creature, six stand confused and the last acts normally but must check next round. Since the orcs are not near the party, the DM decides that two who are supposed to attack the nearest creature attack each other, one attacks an orc that saved, and one attacks a confused orc, which strikes back. The next round, the base is 11 orcs, since four originally saved and one wandered off. Another one wanders off, five stands confused, four attack, and one acts normally.'
};

pri7['Conjure Earth Elemental'] = {
    'level': '7',
    'school': 'Conjuration/Summoning (Reversible)',
    'sphere': 'Elemental (Earth), Summoning',
    'sphere-spells&magic': 'Elemental (Earth)',
    'range': '40 yards',
    'duration': '[[@[level-priest}]] turns',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 294',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A caster who performs a *conjure earth elemental* spell summons an earth elemental to do his bidding. The elemental is 60% likely to have 12 Hit Dice, 35% likely to have 16 Hit Dice, and 5% likely have 21 to 24 Hit Dice (20 + 1d4). Further, the caster needs but to command it, and it does as desired. The elemental regards the caster as a friend to be obeyed. The elemental remains until destroyed, dispelled, sent away by dismissal, the reverse of this spell, or a *holy word* spell (see the *conjure fire elemental* spell), or the spell duration expires.'
};

pri7['Control Weather'] = {
    'level': '7',
    'school': 'Alteration',
    'sphere': 'Weather',
    'range': '0',
    'duration': '[[4d12]] hours',
    'aoe': '[[4d4]] square miles',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol, incense, and prayer beads or similar prayer object',
    'reference': 'p. 294',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *control weather* spell enables a priest to change the weather in the local area. The spell affects the weather for 4d12 hours in an area of 4d4 square miles. It requires one turn to cast the spell, and an additional [[1d4]] turns for the effects of the spell to be felt. The current weather conditions are decided by the DM, depending on the climate and season. Weather conditions have three components: precipitation, temperature, and wind. The spell can change these conditions according to the following chart.\n&emsp;The upper-case headings represent existing weather conditions. The lower-case headings below are the new conditions to which the caster can change the existing conditions. In addition, the caster can control the direction of the wind. For example, a day that is clear, warm, and with moderate wind can be controlled to become hazy, hot, and calm. Contradictions are not possible—fog and strong wind, for example. Multiple *control weather* spells can be used only in succession.\n&emsp;Obviously, the spell functions only in areas where there are appropriate climatic conditions. If Weather is a major sphere for the priest (as it is for druids), duration and area are doubled, and the caster can change the prevailing weather by two places. For example, he can cause precipitation to go from partly cloudy to heavy sleet, temperature to go from cool to arctic, and wind to go from calm to strong.}}{{c1-1=**Precipitation**}}{{c2-1=&ensp;}}{{c3-1=CLEAR}}{{c4-1=&ensp;very clear}}{{c5-1=&ensp;light clouds or hazy}}{{c6-1=PARTLY CLOUDY}}{{c7-1=&ensp;clear weather}}{{c8-1=&ensp;cloudy}}{{c9-1=&ensp;mist/light rain/hail}}{{c10-1=&ensp;sleet/light snow}}{{c11-1=CLOUDY}}{{c12-1=&ensp;partly cloudy}}{{c13-1=&ensp;deep clouds}}{{c14-1=&ensp;fog}}{{c15-1=&ensp;heavy rain/large hail}}{{c16-1=&ensp;driving sleet/snow}}{{c1-2=**Temperature**}}{{c3-2=HOT}}{{c4-2=&ensp;sweltering heat}}{{c5-2=&ensp;warm}}{{c6-2=WARM}}{{c7-2=&ensp;hot}}{{c8-2=&ensp;cool}}{{c9-2=COOL}}{{c10-2=&ensp;warm}}{{c11-2=&ensp;cold}}{{c12-2=COLD}}{{c13-2=&ensp;cool}}{{c14-2=&ensp;arctic cold}}{{c15-2=&ensp;storm}}{{c16-2=STORM}}{{c1-3=**Wind**}}{{c3-3=CALM}}{{c4-3=&ensp;dead calm}}{{c5-3=&ensp;light wind}}{{c6-3=&ensp;moderate wind}}{{c7-3=MODERATE WIND}}{{c8-3=&ensp;calm}}{{c9-3=&ensp;strong wind}}{{c10-3=STRONG WIND}}{{c11-3=&ensp;moderate wind}}{{c12-3=&ensp;gale}}{{c13-3=GALE}}{{c14-3=&ensp;strong wind}}{{c15-3=&ensp;gale}}{{c16-3=&ensp;hurricane'
};

pri7['Creeping Doom'] = {
    'level': '7',
    'school': 'Conjuration/Summoning',
    'sphere': 'Animal, Summoning',
    'sphere-spells&magic': 'Animal',
    'range': '0',
    'duration': '[[4*[[@{level-priest}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 295',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the caster utters the spell of *creeping doom,* he calls forth a mass of from 500 to 1,000 ([[(1d6+4)*100)]]) venomous, biting and stinging arachnids, insects, and myriapods. This carpetlike mass swarms in an area 20 feet square. Upon command from the caster, the swarm creeps forth at 10 feet per round toward any prey within 80 yards, moving in the direction in which the caster commands. The creeping doom slays any creature subject to normal attacks, as each of the small horrors inflicts 1 point of damage (each then dies after its attack), so that up to 1,000 points of damage can be inflicted on creatures within the path of the creeping doom. If the creeping doom travels more than 80 yards away from the summoner, it loses 50 of its number for each 10 yards beyond 80 yards. For example, at 100 yards, its number has shrunk by 100. There are a number of ways to thwart or destroy the creatures forming the swarm. The solutions are left to the imaginations of players and DMs.'
};

pri7['Earthquake'] = {
    'level': '7',
    'school': 'Alteration',
    'sphere': 'Elemental (Earth)',
    'range': '120 yards',
    'duration': '1 round',
    'aoe': '[[5*[[@{level-priest}]] ]]-foot diameter',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A pinch of dirt, a piece of rock, and a lump of clay',
    'reference': 'p. 295',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast by a priest, a local tremor of fairly high strength rips the ground. The shock is over in one round. The earthquake affects all terrain, vegetation, structures, and creatures in its area of effect. The area of effect of the *earthquake* spell is circular, with a diameter of 5 feet for every experience level of the priest casting it. Thus a 20th-level priest casts an *earthquake* spell with a 100-foot-diameter area of effect.\n&emsp;Solidly built structures with foundations reaching down to bedrock sustain one-half damage; one-quarter damage if they score above 50% on a saving throw. An earth elemental opposed to the caster in the area of effect can negate 10% to 100% (roll 1d10, 0 = 100%) of the effect. Other magical protections and wards allowed by the DM may also reduce or negate this effect. If cast undersea, this spell may, at the discretion of the DM, create a tsunami or tidal wave.\n\n**Earthquake Effects**\n\nTERRAIN\n**Cave or cavern—**Collapses roof\n**Cliffs—**Crumble, causing landslide\n**Ground—**Cracks open, causing the following fractions of creatures to fall in and die:\n&emsp;Size S: 1 in 4\n&emsp;Size M: 1 in 6\n&emsp;Size L: 1 in 8\n**Marsh—**Drains water to form muddy, rough ground.\n**Tunnel—**Caves in\n\nVEGETATION\n**Small growth—**No effect\n**Trees—**1 in 3 are uprooted and fall\n\nSTRUCTURES\n**All structures—**Sustain 5d12 points of structural damage; those suffering full damage are thrown down in rubble\n\nCREATURES (See TERRAIN entry)'
};

pri7['Exaction'] = {
    'level': '7',
    'school': 'Evocation, Alteration',
    'sphere': 'Charm, Summoning',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol, some matter or substance from the plane of the creature from whom an exaction is expected, and knowledge of the creature’s nature or actions that is written out on a parchment that is burned to seal the pledge',
    'reference': 'p. 295',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is employed, the priest confronts some powerful creature from another plane (including devas and other powerful minions, for instance, but not demigods or deities of any sort) and requires of it some duty or quest. A creature of an alignment opposed to the priest (e.g., evil if the priest is good, chaotic if the priest is lawful) cannot be ordered around unless it is willing. Note that an absolute (true) neutral creature is effectively opposed to both good and evil, and both law and chaos.\n&emsp;The spellcaster must know something about the creature to exact service from it, or else he must offer some fair trade in return for the service. That is, if the priest is aware that the creature has received some favor from someone of the priest’s alignment, then the *exaction* spell can name this as cause. If no balancing reason for service is known, then some valuable gift or service must be pledged in return for the exaction. The service exacted must be reasonable with respect to the past or promised favor or reward, and with the being’s effort and risk. The spell then acts, subject to a magic resistance roll, as a quest upon the being that is to perform the required service. Immediately upon completion of the service, the being is transported to the vicinity of the priest, and the priest must then and there return the promised reward, whether it is irrevocable cancellation of a past debt or the giving of some service or other material reward. After this is done, the creature is instantly freed to return to its own plane.\n&emsp;The DM adjudicates when an equitable arrangement has been reached. If the caster requests too much, the creature is free to depart or to attack the priest (as if the agreement were breached) according to its nature. If circumstances leave the situation unbalanced (for example, the creature dies while achieving a result that was not worth dying for), then this might create a debt owed by the caster to the creature’s surviving kith and kin, making the caster vulnerable to a future *exaction* spell from that quarter. Agreeing to a future exaction or release in the event of catastrophic failure or death are common caster pledges in securing an exaction. Failure to fulfill the promise to the letter results in the priest being subject to exaction by the subject creature or by its master, liege, etc., at the very least. At worst, the creature can attack the reneging priest without fear of any of his spells affecting it, for the priest’s failure to live up to the bargain gives the creature immunity from the priest’s spell powers.'
};

pri7['Fire Storm'] = {
    'level': '7',
    'school': 'Evocation (Reversible)',
    'sphere': 'Elemental (Fire)',
    'range': '160 yards',
    'duration': '1 round',
    'aoe': '[[2*[[@{level-priest}]] ]] 10-foot cubes',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': '½',
    'materials': '',
    'reference': 'p. 296',
    'book': 'PHB',
    'damage': '[[2d8+[[@{level-priest}]] ]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'When a *fire storm* spell is cast, the whole area is shot through with sheets of roaring flame that equal a *wall of fire* spell in effect. Creatures within the area of fire and 10 feet or less from the edge of the affected area receive 2d8 points of damage plus additional damage equal to the caster’s level (2d8 +1/level). Creatures that roll successful saving throws vs. spell suffer only one-half damage. The damage is inflicted each round the creature stays in the area of effect. The area of effect is equal to two 10-foot × 10-foot cubes per level of the caster—e.g., a 13th-level caster can cast a fire storm measuring 130 feet × 20 feet × 10 feet. The height of the storm is 10 or 20 feet; the imbalance of its area must be in length and width.\n&emsp;The reverse spell, *fire quench,* smothers twice the area of effect of a *fire storm* spell with respect to normal fires, and the normal area of effect with respect to magical fires. Fire-based creatures, such as elementals, salamanders, etc., of less than demigod status have a 5% chance per experience level of the caster of being extinguished. Currently [[5*[[@{level-priest}]] ]]% chance. If cast only against a *flametongue* sword, the sword must roll a successful saving throw vs. crushing blow or be rendered nonmagical. Such a sword in the possession of a creature first receives the creature’s saving throw, and if this is successful, the second saving throw is automatically successful.'
};

pri7['Gate'] = {
    'level': '7',
    'school': 'Conjuration/Summoning',
    'sphere': 'Summoning',
    'sphere-spells&magic': 'All',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 296',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Casting a *gate* spell has two effects: it causes an interdimensional connection between the plane of existence the priest is in and the plane in which dwells a specific being of great power. The result of this connection is that the sought-after being can step through the gate or portal, from its plane to that of the priest. Uttering the spell attracts the attention of the dweller on the other plane. When casting the spell, the priest must name the entity he desires to make use of the gate and to come to his aid. There is a 100% chance that *something* steps through the gate. The actions of the being that comes through depend on many factors, including the alignment of the priest, the nature of those accompanying him, and who or what opposes or threatens the priest. The DM will decide the exact result of the spell, based on the creature called, the desires of the caster and the needs of the moment. The being gated in either returns immediately or remains to take action. Casting this spell ages the priest five years.'
};

pri7['Holy Word'] = {
    'level': '7',
    'school': 'Conjuration/Summoning (Reversible)',
    'sphere': 'Combat',
    'range': '0',
    'duration': 'Special',
    'aoe': '30-foot radius',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 296',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Uttering a *holy word* spell creates magic of tremendous power. It drives off evil creatures from other planes, forcing them to return to their own planes of existence, provided the speaker is in his home plane. Creatures so banished cannot return for at least a day. The spell further affects creatures of differing alignment as shown on the table below:}}{{style=fixed2 sheet-spell-fixed5 sheet-spell-bottom3 sheet-spell-bottom4 sheet-spell-bottom5 sheet-spell-center3 sheet-spell-center4 sheet-spell-center5}}{{c1-1=**Effects of Holy Word**\n&emsp;}}{{cs1-1=5}}{{cc1-1=center}}{{c2-1=**Creature’s**\n**Hit Dice or Level**}}{{c3-1=Less than 4}}{{c4-1=4 to 7+}}{{c5-1=8 to 11+}}{{c6-1=12 or more}}{{c7-1= }}{{c2-2=**General**}}{{cc2-2=bottom}}{{c3-2=Kills}}{{c4-2=Paralyzes\n1d4 turns}}{{c5-2=Slows\n2d4 rounds}}{{c6-2=Deafens\n1d4 rounds}}{{c7-2= }}{{c2-3=**Attack Move**}}{{c3-3=—}}{{c4-3=—}}{{c5-3=–50%}}{{c6-3=–25%}}{{c7-3= }}{{c2-4=**Dice**}}{{c3-4=—}}{{c4-4=—}}{{c5-4=–4*}}{{c6-4=–2}}{{c7-4= }}{{c2-5=**Spells**}}{{c3-5=—}}{{c4-5=—}}{{c5-5=—}}{{c6-5=50%}}{{c7-5=chance\nof failure}}{{effects2=* Slowed creatures attack only on even-numbered rounds until the effect wears off.\n\n&emsp;Affected creatures are those within the 30-foot-radius area of effect, which is centered on the priest casting the spell. The side effects are negated for deafened or silenced creatures, but such are still driven off if other-planar.\n&emsp;The reverse, *unholy word,* operates exactly the same way but affects creatures of good alignment.'
};

pri7['Regenerate'] = {
    'level': '7',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Necromantic',
    'sphere-spells&magic': 'Healing',
    'range': 'Touch',
    'duration': 'Permnanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '3 rounds',
    'saving-throw': 'None',
    'materials': 'A holy symbol and holy water (or unholy water for the reverse)',
    'reference': 'p. 297',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *regenerate* spell is cast, body members (fingers, toes, hands, feet, arms, legs, tails, or even the heads of multi-headed creatures), bones, and organs grow back. The process of regeneration requires but one round if the severed member(s) is (are) present and touching the creature, [[2d4]] turns otherwise. The creature must be living to receive the benefit of this spell. If the severed member is not present, or if the injury is older than one day per caster level, currently [[@{level-priest}]] days, the recipient must roll a successful system shock check to survive the spell.\n&emsp;The reverse, *wither,* causes the member or organ touched to shrivel and cease functioning in one round, dropping off into dust in [[2d4]] turns. The creature must be touched for the harmful effect to occur.'
};

pri7['Reincarnate'] = {
    'level': '7',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'sphere-druids': ', Animal',
    'sphere-spells&magic': 'Animal',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 person',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 297',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the priest can bring back a dead person in another body, if death occurred no more than one week before the casting of the spell. Reincarnation does not require any saving throw, system shock, or resurrection survival roll. The corpse is touched, and a new incarnation of the person appears in the area in [[1d6]] turns. The person reincarnated recalls the majority of his former life and form, but the character class, if any, of the new incarnation might be very different indeed. The new incarnation is determined on the accompanying table or by DM choice. If a player character race is indicated, the character must be created. At the DM’s option, certain special (expensive) incenses can be used that may increase the chance for a character to return as a specific race or species. A *wish* spell can restore a reincarnated character to its original form and status.\n&emsp;If an unusual creature form is indicated, the DM can (at his option only) use the guidelines for new player character races to allow the character to earn experience and advance in levels, although this may not be in the same class as before. If the reincarnated character returns as a creature eligible to be the same class as he was previously (i.e., a human fighter returns as an elf), the reincarnated character has half his previous levels and hit points. If the character returns as a new character class, his hit points are half his previous total, but he must begin again at 1st level. If the character returns as a creature unable to have a class, he has half the hit points and saving throws of his previous incarnation.}}{{style=center1 sheet-spell-center3}}{{c1-1=**Reincarnated Forms**\n&emsp;}}{{cs1-1=4}}{{c2-1=**D100**\n**Roll**}}{{c3-1=&emsp;}}{{c4-1=01-03}}{{c5-1=04-08}}{{c6-1=09-12}}{{c7-1=13-16}}{{c8-1=17-19}}{{c9-1=20-23}}{{c10-1=24-28}}{{c11-1=29-31}}{{c12-1=32-34}}{{c13-1=35-36}}{{c14-1=37-40}}{{c2-2=**Incarnation**}}{{cc2-2=bottom}}{{c4-2=Badger}}{{c5-2=Bear, black}}{{c6-2=Bear, brown}}{{c7-2=Boar, wild}}{{c8-2=Centaur}}{{c9-2=Dryad}}{{c10-2=Eagle}}{{c11-2=Elf}}{{c12-2=Faun/satyr}}{{c13-2=Fox}}{{c14-2=Gnome}}{{c2-3=**D100**\n**Roll**}}{{c4-3=41-44}}{{c5-3=45-58}}{{c6-3=59-61}}{{c7-3=62-64}}{{c8-3=65-68}}{{c9-3=69-70}}{{c10-3=71-75}}{{c11-3=76-80}}{{c12-3=81-85}}{{c13-3=86-00}}{{c2-4=**Incarnation**}}{{cc2-4=bottom}}{{c4-4=Hawk}}{{c5-4=Human}}{{c6-4=Lynx}}{{c7-4=Owl}}{{c8-4=Pixie}}{{c9-4=Raccoon}}{{c10-4=Stag}}{{c11-4=Wolf}}{{c12-4=Wolverine}}{{c13-4=DM’s choice'
};

pri7['Restoration'] = {
    'level': '7',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '3 rounds',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 298',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the life energy level of the recipient creature is raised by one. This reverses any previous life energy level drain of the creature by a force or monster. Thus, if a 10th-level character had been struck by a wight and drained to 9th level, the *restoration* spell would bring the character up to exactly the number of experience points necessary to restore him to 10th level once again, restoring additional Hit Dice (or hit points) and level functions accordingly. Restoration is effective only if the spell is cast within one day of the recipient’s loss of life energy, per experience level of the priest casting it. Currently [[@{level-priest}]] days. A *restoration* spell restores the intelligence of a creature affected by a *feeblemind* spell. It also negates all forms of insanity. Casting this spell ages both the caster and the recipient by two years.\n&emsp;The reverse, *energy drain,* draws away one life energy level (see such undead as spectre, wight, and vampire, in the MONSTROUS MANUAL). The energy drain requires the victim to be touched. Casting this form of the spell does not age the caster.'
};

pri7['Resurrection'] = {
    'level': '7',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s religious symbol and holy water (unholy water for the reverse spell)',
    'reference': 'p. 298',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': 'Full',
    'effect': 'The priest is able to restore life and complete strength to any living creature, including elves, by bestowing the *resurrection* spell. The creature can have been dead up to 10 years per level of the priest casting the spell. Currently [[10*[[@{level-priest}]] ]] years. Thus, a 19th-level priest can resurrect the bones of a creature dead up to 190 years. The creature, upon surviving a resurrection survival check, is immediately restored to full hit points and can perform strenuous activity. The spell cannot bring back a creature that has reached its allotted life span (i.e., died of natural causes). Casting this spell makes it impossible for the priest to cast further spells or engage in combat until he has had one day of bed rest for each experience level or Hit Die of the creature brought back to life. The caster ages three years upon casting this spell.\n&emsp;The reverse, *destruction,* causes the victim of the spell to be instantly dead and turned to dust. A *wish* spell or equivalent is required for recovery. Destruction requires a touch, either in combat or otherwise, and does not age the caster. In addition, the victim is allowed a saving throw (with a -4 penalty). If the save is successful, the victim receives 8d6 points of damage instead.\n&emsp;The DM may reduce the chances of successful resurrection if little of the creature’s remains are available.\n&emsp;The DM may reduce the chances of successful resurrection if little of the creature’s remains are available.'
};

pri7['Succor'] = {
    'level': '7',
    'school': 'Alteration, Enchantment (Reversible)',
    'sphere': 'Summoning',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 person',
    'components': 'V, S, M',
    'cast-time': '1 day',
    'saving-throw': 'None',
    'materials': 'The object to be prepared, which costs between 2,000 and 5,000 gp to prepare (see below)',
    'reference': 'p. 298',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell, the priest creates a powerful magic aura in some specially prepared object—a string of prayer beads, a small clay tablet, an ivory baton, etc. This object radiates magic, for it contains the power to instantaneously transport its possessor to the sanctuary of the priest who created its magic. Once the item is enchanted, the priest must give it willingly to an individual, at the same time informing him of a command word to be spoken when the item is to be used. To make use of the item, the recipient must speak the command word at the same time that he rends or breaks the item. When this is done, the individual and all that he is wearing and carrying (up to the maximum encumbrance limit for the character) are instantly transported to the sanctuary of the priest, just as if the individual were capable of speaking a *word of recall* spell. No other creatures can be affected.\n&emsp;The reversed application of the spell causes the priest to be transported to the immediate vicinity of the possessor of the item when it is broken and the command word said. The priest has a general idea of the location and situation of the item’s possessor, and can choose not to be affected by this summons. This decision is made at the instant when the transportation is to take place. However, if he chooses not to go, the opportunity is gone forever and the spell is wasted.\n&emsp;The cost of preparing the special item (for either version of the spell) varies from 2,000 to 5,000 gp. The more costly items can transport the subject from one plane of existence to another, if the DM allows. Note that the same factors that can prevent the operation of the *plane shift* and *teleport* spells can also prevent the use of this spell.'
};

pri7['Sunray'] = {
    'level': '7',
    'school': 'Evocation, Alteration',
    'sphere': 'Sun',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[1+1d4]] rounds',
    'aoe': '5-foot radius (special)',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': 'An aster seed and a piece of adventuring feldspar (sunstone)',
    'reference': 'p. 299',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the caster can evoke a dazzling beam of light each round in which no action other than movement is performed. The sunray is like a ray of natural sunlight. All creatures in the 10-foot-diameter area of effect must roll successful saving throws vs. spell or be blinded for 1d3 rounds, those using infravision at the time for 2d4 rounds. Creatures to whom sunlight is harmful or unnatural suffer permanent blindness if the saving throw is failed, and are blinded for 2d6 rounds if the saving throw is successful. Those within its area of effect, as well as creatures within 20 feet of its perimeter, lose any infravision capabilities for 1d4+1 rounds.\n&emsp;Undead caught within the sunray’s area of effect receive 8d6 points of damage, one-half if a saving throw vs. spell is successful. Those undead 20 feet to either side of the sunray’s area of effect receive 3d6 points of damage, no damage if a save is successful. In addition, the ray may result in the total destruction of those undead specifically affected by sunlight, if their saving throws are failed. The ultraviolet light generated by the spell inflicts damage on fungoid creatures and subterranean fungi just as if they were undead, but no saving throw is allowed.'
};

pri7['Symbol'] = {
    'level': '7',
    'school': 'Conjuration/Summoning',
    'sphere': 'Guardian',
    'range': 'Touch',
    'duration': '[[@[level-priest}]] turns',
    'aoe': '60 f00t radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': 'Mercury and phosphorous (see 8th-level wizard spell, *symbol*)',
    'reference': 'p. 299',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The priest casting this spell inscribes a glowing symbol in the air upon any surface, according to his desire. Any creature looking at the completed symbol within 60 feet must roll a successful saving throw vs. spell or suffer the effect. The symbol glows for one turn for each experience level of the caster. The particular symbol used is selected by the caster at the time of casting. The caster will not be affected by his own symbol. One of the following effects is chosen by the caster:\n&emsp;**Hopelessness:** Creatures seeing it must turn back in dejection or surrender to capture or attack unless they roll successful saving throws vs. spell. Its effects last for 3d4 turns.\n&emsp;**Pain:** Creatures affected suffer –4 penalties to their attack rolls and –2 penalties to their Dexterity ability scores due to wracking pains. The effects last for 2d10 turns.\n&emsp;**Persuasion:** Creatures seeing the symbol become of the same alignment as and friendly to the priest who scribed the symbol for 1d20 turns unless a saving throw vs. spell is successful.'
};

pri7['Transmute Metal to Wood'] = {
    'level': '7',
    'school': 'Alteration',
    'sphere': 'Elemental (Earth)',
    'range': '80 yards',
    'duration': 'Permanent',
    'aoe': '1 metal object',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 299',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *transmute metal to wood* spell enables the caster to change an object from metal to wood. The volume of metal cannot exceed a maximum weight of 10 pounds per experience level of the priest. Currently [[10*[[@{level-priest}]] ]] pounds. Magical objects made of metal are 90% resistant to the spell, and those on the person of a creature receive the creature’s saving throw as well. Artifacts and relics cannot be transmuted. Note that only a *wish* spell or similar magic can restore a transmuted object to its metallic state. Otherwise, for example, a metal door changed to wood would be forevermore a wooden door.'
};

pri7['Wind Walk'] = {
    'level': '7',
    'school': 'Alteration',
    'sphere': 'Elemental (Air)',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] hours',
    'aoe': 'Caster + [[floor([[@{level-priest}]]/8)]] persons',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Fire and holy water',
    'reference': 'p. 299',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the priest (and possibly one or two other persons) to alter the substance of his body to a cloudlike vapor. A magical wind then wafts the priest along at a movement rate of 60, or as slow as 6, as the spellcaster wills. The *wind walk* spell lasts as long as the priest desires, up to a maximum duration of six turns (one hour) per experience level of the caster. For every eight levels of experience the priest has attained, up to 24, he is able to touch another person and carry that person, or those persons, along on the wind walk. Persons wind walking are not invisible, but rather appear misty and translucent. If fully clothed in white, they are 80% likely to be mistaken for clouds, fog, vapors, etc. The priest can regain his physical form as desired, each change to and from vaporous form requiring five rounds. While in vaporous form, the priest and companions are hit only by magic or magical weaponry, though they may be subject to high winds at the DM’s discretion. No spellcasting is possible in vaporous form.'
};
//endregion

//#region Tome of Magic
pri1['Analyze Balance'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Numbers, Divination',
    'range': '80 yards',
    'duration': '[[5+[[@{level-priest}]] ]] round(s)',
    'aoe': 'One creature, object, or 10’ square',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Four iron coins which the priest tosses in his hand while concentrating on the spell. The coins are not consumed in the casting.',
    'reference': 'p. 51',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows a priest to sense how far a character, creature, object, or area is from a condition of balance -- in other words, the degree to which its alignment is removed from true Neutral. The spell gives no indication of the “direction” in which the alignment is removed from true Neutral except under certain conditions which follow. The spell does, however, indicate along which axis or axes of alignment the variation lies.\n&emsp;For example, a priest uses this spell to analyze the balance of a Chaotic Neutral creature. The spell indicates that the creature is removed from Neutral by one grade, and the variation is along the Law/Chaos axis; thus, the creature must be either Chaotic Neutral or Lawful Neutral. If the creature were Chaotic Evil, the spell would indicate that it is removed from balance by two grades, one along each axis; thus, the creature must be Chaotic Evil, Chaotic Good, Lawful Evil, or Lawful Good.\n&emsp;A priest has a 5% chance per level ([[5*[[@{level-priest}]] ]]%) of correctly determining the direction of variation along one randomly chosen axis. This means that a 10th-level priest evaluating the balance of a Chaotic Neutral creature would have a 50% chance of learning that the creature is Chaotic (and hence Chaotic Neutral, since it is only one step away from balance).\n&emsp;Similar to spells such as *detect evil*, this spell will not yield a result on a hidden trap. If cast on a creature with an intelligence level of “animal” or “non-,” it will always read true Neutral (i.e., zero steps removed from balance).'
};

pri1['Anti-Vermin Barrier'] = {
    'level': '1',
    'school': 'Abjuration',
    'sphere': 'Wards',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] hour(s)',
    'aoe': '[[10*[[@{level-priest}]] ]]-foot cubes',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol and a rodent’s whisker.',
    'reference': 'p. 51',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the caster creates an invisible force field that repels nonmagical insects, rodents, spiders, snakes, worms, and similar vermin of less than 1 Hit Die. The spell has no effect on giant-sized versions of these creatures unless they are less than 1 Hit Die. The barrier affects summoned creatures, such as those called by a *summon insects* spell.\n&emsp;Any vermin within the area of effect when the spell is cast are not affected; however, when these creatures exit the area, they cannot return.\n&emsp;The spell affects a cubic area whose sides are 10 feet times the caster’s level (for instance, a 2nd-level priest could affect a 20’×20’×20’ cube.'
};

pri1['Call Upon Faith'] = {
    'level': '1',
    'school': 'Invocation',
    'sphere': 'Summoning',
    'range': '0',
    'duration': '1 round',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol.',
    'reference': 'p. 51',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Before attempting a difficult task, the priest may cast *call upon faith* to aid his performance. If the priest has been true to his faith (as determined by the DM), the priest gains a +3 (or +15%) bonus to one die roll (his choice) needed to complete the task. The bonus may be used to affect a saving throw, attack roll, ability check, etc. For example, if a priest were about to cross a narrow log high above a chasm, he could cast this spell and gain a +3 bonus to his Dexterity ability check.'
};

pri1['Courage'] = {
    'level': '1',
    'school': 'Enchantment/Charm',
    'sphere': 'War',
    'range': '240 yards',
    'duration': 'Special',
    'aoe': 'One unit up to 200 individuals',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A cube of cast iron.',
    'reference': 'p. 52',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell imbues the target unit with a temporary burst of *courage*. To cast this spell, the priest must have an uninterrupted line of sight to the target unit.\n&emsp;A *courage* spell enables a unit to automatically pass its first morale check following the casting of this spell. When circumstances arise that would necessitate a morale check, no die roll is made and the unit is assumed to have passed the check. After this occurs, the spell ends and the unit must make all future morale checks normally.\n&emsp;If a unit under the influence of a *courage* spell is not forced to make any morale checks, the spell expires at the first sunset.\n&emsp;When several different events simultaneously trigger morale checks, the BATTLESYSTEM rules apply penalties to a single morale check. If this occurs to a unit under the influence of a *courage* spell, the player commanding the unit selects one such event and its modifier is ignored.\n&emsp;No more than one *courage* spell can affect a unit at one time. Once the spell has expired, a priest can cast the spell again on the same unit.'
};

pri1['Emotion Read'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Thought',
    'range': '[[5*[[@{level-priest}]] ]] yards',
    'duration': 'Instantaneous',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': 'A square of unmarked white wax.',
    'reference': 'p. 52',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the priest to perform an instantaneous reading of a single subject’s emotional state. It can be used on any subject possessing Intelligence of 3 or better. This reading is neither deep nor specific and cannot pick out mixed emotions or intricate details. For example, it might tell the priest that the subject is fearful, but the spell cannot reveal what the subject is afraid of or why he is afraid.\n&emsp;*Emotion read* does not reveal individual thoughts or the subject’s motivation. Thus, the spell might reveal that the subject is coldly unemotional at the moment, but not the fact that the subject is contemplating the cold-blooded murder of the priest.\n&emsp;Note that this reading is instantaneous. It reveals only the emotion that is strongest at the instant the spell is used. While this will usually be related to the subject’s overall emotional state, it is always possible that the subject might be distracted for a moment or remember and respond to past events.\n&emsp;The subject is allowed a normal saving throw vs. spells to resist this spell. If the saving throw is successful, the priest receives no reading at all. If the subject’s roll exceeds the necessary number by six or more, the priest perceives an emotion diametrically opposite to the subject’s true emotion.'
};

pri1['Know Age'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Time',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'One object or creature',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A calendar page.',
    'reference': 'p. 52',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to instantly know the age of any single person, creature, or object on which he concentrates. The age is accurate to the nearest year.'
};

pri1['Know Direction'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Travelers',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A small scrap of a parchment map that is at least 100 years old.',
    'reference': 'p. 52',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Know direction* allows the caster to instantly know the direction of north. The spell is effective in any environment, whether underwater, underground, or in darkness (including magical darkness).'
};

pri1['Know Time'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Time',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 53',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Know time* is particularly useful when the caster has been unconscious. This spell enables the caster to know the precise time of day to the nearest minute, including the current hour, day, month, and year.'
};

pri1['Log of Everburning'] = {
    'level': '1',
    'school': 'Enchantment',
    'sphere': 'Elemental (Fire), Plant',
    'sphere-spells&magic': 'Elemental (Fire)',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] hour(s)',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 53',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell increases the amount of time that a wooden object will burn before being consumed. Wood that is enchanted in this manner burns brightly without being consumed for the duration of the spell. When the spell ends, the wooden object crumbles to ash.\n&emsp;This spell does not cause the wood to catch fire; it must be ignited normally. While it burns, the wood gives off twice the normal amount of heat; thus, a single log can make a cozy fire.\n&emsp;The affected wood radiates magic. The priest may enchant up to 1 cubic foot of wood per level of experience. Currently [[@{level-priest}]] cubic feet of wood. The spell is effective on torches.'
};

pri1['Mistaken Missive'] = {
    'level': '1',
    'school': 'Alteration',
    'sphere': 'Chaos',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '[[@{level-priest}]] page(s)',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'Three drops of ink.',
    'reference': 'p. 53',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell alters the appearance of words written in ink. When the spell is cast upon a written page, the ink imperceptibly begins to move. Over the next few days, the message becomes progressively more illegible. If the page is left undisturbed for six days, an entirely new message forms on the page. The new message is completely legible and is recognizable as the handwriting of the original author, but is contrary in content to the original message.\n&emsp;After the spell is cast, the message will appear different every day. The DM decides the message that the page will carry after the sixth day has passed. Following is a sample of the changes that could take place in a message.\n&emsp;*Day One:* The words of the letter appear faint, as if the author of the letter was running out of ink as he wrote.\n&emsp;*Day Two:* The words have moved slightly from their original positions, as if the person writing the letter were shaking or in a moving carriage when the letter was written.\n&emsp;*Days Three and Four:* The message is gibberish. Although the ink forms groups of letters arranged in lines with punctuation, nearly all the words are meaningless. This may appear to be some sort of code, but it means nothing.\n&emsp;*Day Five:* The ink has formed real words. However, the sentence construction is still meaningless (e.g., Egg west worse green!).\n&emsp;*Day Six (and beyond):* The message is coherent, but the opposite intent of the original message has been created. If the original letter read, “Send troops quickly,” the new letter reads, “All is fine. Keep your men in reserve.”\n\n&emsp;If *mistaken missive* is cast on the pages of a spellbook or a scroll, the ink on the page reforms into a new spell of the same level as the original spell. Thus, a *darkness* spell might become a *maze* spell. However, the spell formula will be wrong. Although it will look like a proper spell, it will not function when cast.\n&emsp;A coded message that is subjected to *mistaken missive* will appear as a coded message on the sixth day but will hold a different meaning than the original message.\n&emsp;A *glass of preserved words* will allow the original message to be read correctly. *Dispel magic* will restore the message to its original form.'
};

pri1['Morale'] = {
    'level': '1',
    'school': 'Enchantment/Charm',
    'sphere': 'War',
    'range': 'Special',
    'duration': 'Special',
    'aoe': 'One unit up to 200 individuals',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': '*Way 1:* A gem of at least 100 gp value which is consumed during the casting. *Way 2:* The priest’s holy symbol',
    'reference': 'p. 53',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can be used in two distinct ways. The first is appropriate for battlefield use. The priest can cast this spell on any unit within 240 yards in an uninterrupted line of sight. The casting time for this use is one turn.\n&emsp;At the conclusion of this use of the spell, the target unit’s *morale* is modified by 1, either positively or negatively, as the caster desires. This modification remains in effect for 1d4+2 turns.\n&emsp;The second and more powerful use of the spell requires lengthy preparations. Casting must take place inside or within 100 yards of a place of worship dedicated to the casting priest’s deity. Both the priest and the unit to be affected must be present. The casting time for this use is 5 turns.\n&emsp;At the conclusion of this use of the spell, the unit’s *morale* is raised by 3 (maximum of 19). This *morale* increase lasts until the next sunset. Only priests of 10th level or higher can cast this version of the spell.'
};

pri1['Personal Reading'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Numbers',
    'range': '0',
    'duration': 'Special',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '2 turns',
    'saving-throw': 'None',
    'materials': 'A small book of numerological formulae and notes (different from the book used in *telethaumaturgy*). The book is not consumed in the casting.',
    'reference': 'p. 54',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the priest to mathematically analyze personal information about one human or demihuman character and learn valuable facts about that character. To cast this spell, the priest must know the subject’s real name (the name the subject was given as a child) or the date and place of the character’s birth. The priest analyzes this information and is able to build a rough picture of the character’s life history and personal specifics.\n&emsp;The “historical” information discovered through this spell is generally vague. For example, the priest might learn that the subject was born in the woods and moved to the city only after hardship made his life untenable. Specific information is up to the DM. The DM might provide some or all of the following information.\n&emsp;• The subject’s character class or career\n&emsp;The subject’s approximate level (stated in terms such as “novice,” “highly skilled,” “moderately competent,” etc.)\n&emsp;• The subject’s standing in the community (“highly respected,” “mistrusted,” “considered an enigma,” etc.)\n&emsp;• The subject’s success or failure in his profession\n&emsp;• The subject’s prevailing character traits or mannerisms\n\n&emsp;If the priest casts the spell based on an alias or incorrect birth information, the reading will be inaccurate. The DM should develop a history and personality at odds with the truth. This might allow the priest to determine whether the name of the subject is correct--a reading giving information that conflicts with what the priest already knows should be a clue that the name is incorrect.\n&emsp;The subject need not be present during the casting. The priest can cast the spell without ever having met the subject.\n&emsp;A DM may rule that this spell can be cast on humanoids or monstrous creatures. The information available will be similar (considering that words like “profession” will mean something different when applied to an ogre). This spell will categorically fail on creatures that have no concept of a personal name.'
};

pri1['Ring of Hands'] = {
    'level': '1',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Protection',
    'range': '0',
    'duration': '[[2d10]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 54',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This is a cooperative magic spell. It requires a minimum of two priests and can accommodate a maximum of ten. Each priest must cast *ring of hands* on the same round. At the end of the casting, the priests involved join hands, thus completing the spell. If any priest breaks the circle, the spell immediately ceases. The priests may not move from their locations but are free to speak. They may not cast spells requiring a somatic or material component while the ring is formed.\n&emsp;The *ring of hands* forms a protective barrier around the priests and everything within their circle. For each priest, assume a five-foot circumference of the circle; thus, three priests would create a circle of 15-foot circumference. For easy calculation, assume that for each priest, the circle can accommodate four persons.\n&emsp;The barrier functions as a *protection from evil* spell. Attacks by evil creatures suffer a -1 penalty for every priest forming the circle. Saving throws made by the priests or anyone in the circle against attacks from such creatures receive a +1 bonus for every priest in the circle.\n&emsp;Attempts at mental control over protected creatures are blocked. Extraplanar and conjured creatures are unable to touch the priests and those within the circle, although melee attacks against such creatures by those within the ring break the barrier.\n&emsp;Because the priests casting the spell cannot move and must hold hands, they do not receive any Dexterity bonuses to Armor Class. Furthermore, opponents gain a +2 bonus on attack rolls against the priests, since there is little they can do to avoid a blow. Creatures within the ring are free to act as they wish. Melee attacks by those within the ring are limited to piercing weapons and suffer a -1 penalty to attack rolls since the priests intervene.\n&emsp;The reverse of this spell, *ring of woe*, functions as detailed above except the effect applies to good creatures as would a *protection from good* spell.'
};

pri1['Sacred Guardian'] = {
    'level': '1',
    'school': 'Enchantment/Charm',
    'sphere': 'Guardian',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] day(s)',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A rose petal that has been kissed by the spell recipient.',
    'reference': 'p. 55',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By use of this spell, a priest becomes instantly aware when the recipient of the spell is in danger, regardless of the distance between the priest and the recipient. The recipient may be on a different plane of existence than the priest.\n&emsp;When this spell is cast by a priest of at least 3rd level, he receives a mental image of the endangered person’s situation. At no time, however, does the priest know the person’s location through the use of this spell.'
};

pri1['Speak With Astral Traveler'] = {
    'level': '1',
    'school': 'Alteration',
    'sphere': 'Astral',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] round(s)',
    'aoe': 'One creature',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 55',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a priest casts the 7th-level *astral spell*, he leaves his physical body in suspended animation while his astral body travels. By touching the comatose body and casting *speak with astral traveler*, a priest can mentally communicate with the projected individual. Although communication is mental, it takes the same amount of time as a normal, verbal dialogue. The spell ends abruptly when its duration expires.'
};

pri1['Thought Capture'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Thought',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': '10 yards',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 55',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'One of the more bizarre contentions held by priests of the School of Thought is generally scoffed at by outsiders. The theory states that once a thought has occurred in someone’s brain, it exists as a “freestanding mental object.” This “thought object” usually remains inside the brain of the creature that created it, but sometimes it escapes (this supposedly explains why people forget things). When this happens, the thought object stays in the geographical area where it was lost. Any receptive brain (usually the brain of the creature that initially created the thought) can pick it up again simply by bumping into the invisible, free-floating thought. According to the theory, this is the reason that people can regain a lost thought by going back to the location where the thought was lost. This supposedly works because the free-floating thought is recaptured, not because the locale reminds them of the thought. Unfortunately for philosophers who disagree with this, *thought capture* seems to be extremely strong evidence for this theory.\n&emsp;This spell makes the priest’s brain something of a magnet that attracts thought objects in close proximity. The priest can sense strong thoughts and emotions and can sometimes even see momentary visions of creatures who died or suffered some powerful emotion in the immediate vicinity. Thought objects are always attracted to the priest in the order of the strongest (those attached to powerful emotions or significant events) to the weakest. Thus, if several thought objects share the same vicinity, the priest will perceive information about the most interesting or significant event. The priest might pick up images of a battle from the point of view of a warrior who died there, or he might gain information about the victor of the battle.\n&emsp;The DM dictates the information provided to the priest, and thus can use this spell to provide players with important background information or can add texture to a campaign world. The information provided might be highly cryptic or symbolic, perhaps in the form of a rhyme or riddle.\n&emsp;The priest gains one thought object per casting of the spell. The spell may be cast a number of times in the same locale, with the priest gaining a different thought object with each casting. A locale contains a finite number of thoughts, however, and once the priest has gained all of them (per the DM), the spell will fail in that locale.'
};

pri1['Weighty Chest'] = {
    'level': '1',
    'school': 'Alteration',
    'sphere': 'Wards',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] day(s)',
    'aoe': '5-foot cube',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A lead ball.',
    'reference': 'p. 56',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to enchant a chest, book, package, or any other nonliving object no larger than a 5’×5’×5’ cube. When the enchanted object is touched by anyone other than the caster, the apparent weight of the object increases, becoming 2-5 ([[1d4+1]]) times the weight of the person or persons touching it. This condition makes the object extremely difficult to move for anyone but the caster. The caster can move the object normally throughout the duration of the spell.'
};

pri2['Aura of Comfort'] = {
    'level': '2',
    'school': 'Evocation',
    'sphere': 'Travelers',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] hours',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 56',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, a faintly shimmering aura surrounds the recipient. The aura insulates the recipient from the effects of nonmagical heat and cold in a range of -20° F. to 140° F. (-29° C to 60° C).  Any time a traveler encounters temperatures in this range, he maintains a comfortable temperature of 70 F. (21° C), regardless of prevailing weather conditions. Additionally, the spell acts as a shield against rain, snow, and hail, which are blocked by the aura.\n&emsp;If a recipient encounters a temperature above or below the stated range, the temperature within the aura is altered by an equal number of degrees. For example, a recipient who encounters a temperature of 150° F. (66° C) will actually experience a temperature of 80°F. (27° C).\n&emsp;All physical objects other than rain, snow, and hail can pass through the aura. The recipient can cast spells normally while the *aura of comfort* is in effect. The spell offers no protection against magically generated weather, such as that caused by *weather summoning* and *ice storm*. It does not protect against fire, nor does it shield against fire- or cold-based attacks.'
};

pri2['Calm Chaos'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Law',
    'range': '20 yards',
    'duration': 'Special',
    'aoe': '[[ [[@{level-priest}]]d6]] creatures',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 56',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell temporarily calms a chaotic situation involving a group of people. The situation may involve any range of emotions from violence (as in a barroom brawl) to joy and merrymaking (as in a festival or carnival).\n&emsp;Unlike the *emotion* spell, *calm chaos* does not cause a change in the emotions of affected creatures--anger, fear, or intense joy remain in each individual. The emotion is simply restrained rather than released. Thus, an angry character intent on attacking someone will still feel the desire to do so, but he will withhold his action as long as the spell remains in effect.\n&emsp;Creatures to be affected are allowed a saving throw vs. spell at a -4 penalty to avoid the effects. If more creatures are present than can be affected, creatures nearest the caster are affected first.\n&emsp;After casting the spell, the priest makes a Charisma check. If successful, all characters affected by the spell are compelled to stop what they are doing. They are filled with the sensation that something important is about to occur. At this time, the priest or a character of his choosing must gain the attention of the affected creatures by giving a speech, performing for the crowd, or casting spells with intriguing visual effects (such as *dancing lights*). The attention of the crowd is then held for as long as the distraction continues. A character could filibuster and maintain control over the affected characters for hours or days.\n&emsp;Two conditions will cause the group to resume its original actions. In the first, the method of entertaining the crowd ceases for one round--the speech ends or the spell expires. If this action is not replaced with another distraction within one round, the crowd is freed of the spell.\n&emsp;In the second condition, if an event occurs that is more immediate than the distraction, the crowd will divert its attention to that event. Thus, if the spell were used to stop a barroom brawl and the building caught fire or was attacked, the crowd’s attention would be diverted and the individuals could act freely.\n&emsp;Creatures whose attention is held by the spell cannot be instructed to attack or perform any action. Such creatures will ignore suggestions of this nature. Depending on the nature of the request, the DM may deem that the suggestion causes a distraction that ends the spell.'
};

pri2['Create Holy Symbol'] = {
    'level': '2',
    'school': 'Conjuration',
    'sphere': 'Creation',
    'range': '0',
    'duration': 'Permanent',
    'aoe': 'The caster',
    'components': 'V',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 57',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the words of this spell are uttered, a holy symbol appropriate to the priest’s deity appears out of thin air. The item appears in the priest’s hands. It may be used as a component for spells or for any other purpose for which the priest would normally use his holy symbol (such as turning undead). He may also opt to give it to a lower level priest of the same deity. The holy symbol is a permanent object.'
};

pri2['Dissension\'s Feast'] = {
    'level': '2',
    'school': 'Enchantment/Charm, Alteration',
    'sphere': 'Chaos',
    'range': 'Touch',
    'duration': '[[5+2*[[@{level-priest}]] ]] turns',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '2 turns',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 57',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell must be cast by a priest during the preparation of food for a meal. The spell is cast on any one quantity of food; thus, the priest could cast the spell on the batter of a wedding cake, or he could cast the spell on a quantity of onions as they are diced for both a salad and a stew. The spell affects 10 pounds of food per level of the caster. Currently [[10*[[@{level-priest}]] ]] pounds. Anyone who eats the affected food (even a character who eats the salad but not the stew) is subject to the effects of the spell.\n&emsp;The effects of the spell begin five rounds after the food has been eaten. At that time, creatures who have eaten the affected food are allowed a saving throw; success indicates that a creature is not affected.\n&emsp;Affected creatures quickly become agitated. Petty events ranging from poor table manners to loud talking bother everyone. After five minutes, tempers flare, characters feel compelled to shout at and insult one another, and threats are hurled. Even normally calm characters will feel compelled to vent their frustrations violently.\n&emsp;Creatures maintain no alliances while under the effect of *dissension’s feast*. A king and his wife who are normally madly in love will find themselves bickering with each other in a matter of minutes. Members of a diplomatic delegation might come to blows with each other within minutes of eating the food.\n&emsp;At the end of the spell duration, characters undergo the sensation of waking up. All are free to behave as they wish. Characters at the meal will still be angry, although they will have no idea why they became angry.'
};

pri2['Draw Upon Holy Might'] = {
    'level': '2',
    'school': 'Invocation',
    'sphere': 'Summoning',
    'range': '0',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a vial of holy water that has been blessed by the high priest of the character’s faith.',
    'reference': 'p. 58',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the priest’s body shudders and glows with a shimmering aura as it becomes a vessel for the power of his god. As a result, the caster may choose to increase one ability score (only Strength, Dexterity, Constitution, and Charisma are eligible) by +1 per three levels of his experience (+1 at 3rd level, +2 at 6th, etc.). Currently +[[floor([[@{level-priest}]]/3)]].\n&emsp;Only one attribute may be increased. The effect lasts for the duration of the spell. Attributes may be increased above the normal restrictions due to race and class, to a maximum of +6. All benefits for exceptional attributes listed in the *Player’s Handbook* apply; however, the divine abilities found in the *Legends & Lore* book cannot be gained by use of this spell.\n&emsp;For example, an 18th-level priest with Strength 15 could increase his Strength to 21 for 18 rounds, granting him a +4 attack bonus, a +9 damage adjustment, etc.\n&emsp;When the spell ends, the energy abruptly leaves the priest’s body, leaving him physically and mentally drained. He is nearly comatose and can do nothing but rest for the next [[4d6]] turns. A successful Constitution check (at the priest’s normal attribute score) reduces this time by 50%.'
};

pri2['Emotion Perception'] = {
    'level': '2',
    'school': 'Divination',
    'sphere': 'War',
    'range': '300 yards',
    'duration': 'Instantaneous',
    'aoe': 'One unit/five levels',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol.',
    'reference': 'p. 58',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the caster to sense the emotional state and the level of determination of one or more military units. The priest must have an uninterrupted line of sight to the entire target unit. When this spell is cast, the priest instantly learns the current morale rating and morale status of the target unit. The DM describes morale using the appropriate term; for example, steady, elite, etc.'
};

pri2['Frisky Chest'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Wards',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '10-foot cube',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A dried frog’s leg, a feather, and a fish scale.',
    'reference': 'p. 58',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the caster can enchant a chest, book, or any other nonliving object no larger than a 10’×10’×10’ cube. When any creature other than the caster comes within three feet of the enchanted object, it instantly sprouts appendages and moves away from the creature as quickly as possible. The enchanted object continues to move until it is at least 10 feet away from the nearest creatures in the area.\n&emsp;After the enchanted object has moved a satisfactory distance from the nearest creature, the appendages disappear. When a creature again comes within three feet of the enchanted object, the enchanted object sprouts appendages and flees. This process continues until the enchantment is negated (through a *dispel magic* or similar spell) or the enchanted object is subdued or destroyed.\n&emsp;The enchanted object can sprout feet (MV 24), wings (Fl 24, maneuverability class B), or fins (Sw 24), whichever is most advantageous. Thus, a book on a shelf might sprout wings and fly away, while a table might gallop around a room. The enchanted object can freely and instantly trade appendages as necessary.\n&emsp;The enchanted object will move only through open spaces. It will not crash through windows, shatter a closed door, or dig through the earth. It cannot attack or take any actions other than movement. If surrounded or cornered, the enchanted object moves in random directions until it is restrained or destroyed.\n&emsp;The enchantment ends if the caster voluntarily negates it, if the enchanted object is destroyed (the object has the same vulnerabilities as it has in its normal state), or if the enchanted object is restrained for 2-5 ([[1d4+1]]) consecutive rounds. Restraint means that the object is prevented from fleeing; if a creature is able to grapple, lift, or sit on the object, it is considered restrained. A creature capable of lifting the object in its normal state is considered strong enough to restrain it (for instance, a person capable of lifting a 50-pound box is also capable of restraining such a box enchanted by *frisky chest*). The object may also be restrained by tossing a net or heavy blanket over it or by surrounding it with several characters.'
};

pri2['Hesitation'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Time',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '20-foot-radius circle',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A fragment of a turtle’s shell.',
    'reference': 'p. 59',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Creatures affected by this spell hesitate before executing their intended actions. This causes them to modify their initiative rolls by +4. The initiative modifier occurs in the round following the round in which *hesitation* is cast.\n&emsp;The spell affects 2-8 Hit Dice or levels of creatures ([[2d4]] HD or levels), although only one creature of 4 or more Hit Dice can be affected regardless of the number rolled. All possible victims are allowed saving throws vs. spells; those failing their saving throws modify their initiative rolls by +4 for a number of rounds equal to the caster’s level.'
};

pri2['Idea'] = {
    'level': '2',
    'school': 'Divination',
    'sphere': 'Thought',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A gold coin.',
    'reference': 'p. 59',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell stimulates the priest’s mind to experience a flash of insight. In game terms, the DM reminds the priest’s player of a fact or event that has been forgotten, overlooked, or discounted. Thus, the DM might remind the player about an important clue that the priest discovered but the player did not consider significant.\n&emsp;If there are no forgotten facts, the DM may, at his discretion, tell the player of new information relevant to the condition at hand.\n&emsp;The DM must be careful in adjudicating use of this spell. The reminder or information should always be relevant and useful but should not be unbalancing to the situation. The reminder can be cryptic, depending on the DM’s campaign.\n&emsp;This spell can be cast only once in any six hour period.'
};

pri2['Lighten Load'] = {
    'level': '2',
    'school': 'Alteration',
    'sphere': 'Travelers',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '10-foot cube',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A feather and a slip of paper moistened by a soap bubble.',
    'reference': 'p. 59',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell reduces the weight of equipment, supplies, and other objects by 50%. Weapons, supplies, and even disabled characters can all be made more portable by use of a *lighten load* spell.\n&emsp;This spell affects one pile of objects whose volume is equivalent to a 10-foot cube; after the spell has been cast, the affected objects can be divided among several characters or mounts. The spell has no effect on magical items.\n&emsp;An object affected by *lighten load* can be used normally; the spell has no effect on an object’s mass, texture, size, strength, or other physical features.'
};

pri2['Mind Read'] = {
    'level': '2',
    'school': 'Divination',
    'sphere': 'Thought',
    'range': '[[5*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 59',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is a sensitive version of the wizard spell *ESP*. In addition to detecting the surface thoughts of any creatures in range, the priest is able to probe deeper into the mind of a single creature. *Mind read* will always reveal the kind of creature being probed, although this identity may be couched in the creature’s own language or in a (possibly distorted) body image. The spell has a 20% chance of revealing the character class of an individual.\n&emsp;The details and the usefulness of the creature’s thoughts will depend on the intelligence of the subject. While a priest could read the thoughts of an animal, he would probably receive only a confused jumble of emotions and instincts. Reading the mind of a highly intelligent wizard, however, would be much more illuminating; the priest might be amazed by the crystal clarity and deep insight of the wizard’s mental processes.\n&emsp;If *mind read* is used as part of an interrogation, an intelligent and wary subject receives a saving throw at a -2 penalty. If successful, the creature resists the spell’s effects and the priest learns no information. If the saving throw is failed, the priest may learn additional information according to the DM’s ruling.'
};

pri2['Moment'] = {
    'level': '2',
    'school': 'Divination',
    'sphere': 'Numbers',
    'range': '0',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '50-foot radius',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A set of three silver dice, which the priest tosses in his hand while concentrating on the spell. The dice are not consumed in the casting.',
    'reference': 'p. 60',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Theoretically, every action has a particular *moment* at which it will have its greatest possible effect. Using the arcane mathematics of this spell, the priest can determine the “ideal *moment*” for any single action in each round that the spell is in effect. This action must be performed by a character other than the priest.\n&emsp;In practice, another character informs the priest of an action he wants to undertake in a round. The priest concentrates on the action, then informs the character when the “correct *moment*” has come. The character then gains a bonus of 20% (+4 on a d20) to the success of his action. The spell can affect only a single action in a given round. When used in combat, the priest can advise the best *moment* to initiate an action (affecting initiative) or what *moment* offers the greatest success in striking (affecting the chance to hit).\n&emsp;If the character seeks advice concerning initiative, he gains a -2 modifier to the initiative roll, but only at the cost of -2 on his chance to hit. Characters who seek the best attack frequently delay their actions. These characters suffer a +1 on their initiative roll but gain a +4 on their chance to hit. The spell cannot affect the amount of damage caused, since the act (striking) has already succeeded at that point.\n&emsp;Characters are not obliged to wait for the *moment* specified by the priest. For example, a fighter might decide that striking first is more important than gaining +4 to hit. The character can act normally, based on his or her unmodified initiative. The character gains no bonus from the *moment* spell, and the priest can affect no other action in that round.\n&emsp;Noncombat actions can also benefit from the *moment* spell. For example, a thief planning to climb a wall may wait to start her climb until the priest informs her that the *moment* is right. If she waits, she gains a bonus of 20% to her Climb Walls roll (in this case, the bonus is *subtracted* from her roll).\n&emsp;While concentrating on this spell, the priest can take no other action. A break in the priest’s concentration--taking damage in combat, for example--terminates the spell instantly.'
};

pri2['Music of the Spheres'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Numbers, Charm',
    'range': '50 yards',
    'duration': '1 turn+[[@{level-priest}]] rounds',
    'aoe': '20-foot-diameter circle',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A set of three small bows made from fine silver, each costing 100 gp. The lengths of the bows must be in the ratio of 1 to 4 to 9. The priest strokes these bows together in an intricate sequence while casting the spell. The bows are not consumed in the casting.',
    'reference': 'p. 60',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the priest creates tones and harmonies of such unearthly beauty and complexity that they entrance the listener, making it difficult for the listener to attack or otherwise harm the priest. The listener receives a normal saving throw against this effect. Failure means that the listener is entranced and is unable to attack the priest for the duration of the spell.\n&emsp;In addition, the music makes the subject gullible and more susceptible to charm magics such as *charm person*, suggestion, and hypnotism. While the music spell is in effect, the subject saves against charm spells with a -3 penalty.\n&emsp;This spell does not protect other characters in company with the priest; listeners who have fallen prey to the music are free to attack anyone else. The spell effect ends instantly if the priest takes any hostile action against a creature under the influence of the spell.\n&emsp;*Music of the spheres* can affect one creature per three levels of the priest (one subject at 3rd level, two at 6th level, etc.). Currently [[floor([[@{level-priest}]]/3)]] creatures. Subjects must be within a 20-foot-diameter circle.\n&emsp;Potential victims must have Intelligence of at least 1 (necessary to understand the concept of music) and must be able to hear the music (i.e., they cannot be deaf and there can be nothing obstructing the victim’s ears). This also means that the level of background noise must be low enough for the music to be audible. The DM should assume that the music is the same volume as an average human’s normal speaking voice. If the potential subject could not hear speech at the appropriate range under prevailing conditions, the spell cannot affect that subject. The spell would be virtually useless in the midst of a full-scale battle or during a hurricane.'
};

pri2['Mystic Transfer'] = {
    'level': '2',
    'school': 'Invocation',
    'sphere': 'Charm',
    'sphere-spells&magic': 'All',
    'range': '0',
    'duration': '9 rounds',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 61',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is one of the few cooperative spells that requires one priest to cast the transfer spell, but another priest to use its effect. On one round, a priest (or priests) casts the *mystic transfer*. The spell is then active for the remaining nine rounds of the turn.\n&emsp;*Mystic transfer* allows a priest to receive spells from another priest of the same ethos. Any priest of the same religion can cast a spell and transfer it to a second priest within that spell’s maximum range. The spell does not take effect; instead, it is channelled through the *mystic transfer* into the receiving priest. This priest must immediately cast the spell or pass it to another priest cloaked in a *mystic transfer* within the spell’s range. Any number of transfers can be made in the same round, provided each new recipient is within spell range of the previous recipient. If the spell is not transferred, the spell takes effect.\n&emsp;For example, a 3rd-level priest casts a *mystic transfer*. On the following round, a 10th-level priest “passes” a *flame strike* to the 3rd-level priest. The two priests could be 60 yards apart (the maximum range of the *flame strike*). The 3rd-level priest could then use the flame strike to attack any target within 60 yards, or could pass the spell on to another priest who has an active *mystic transfer*.\n&emsp;The spell passed by the *mystic transfer* has the range, area of effect, damage, and other effects equal to the level of the original caster. In the example above, the *flame strike* would function as if cast by a 10th-level priest.\n&emsp;The *mystic transfer* does not require concentration. However, on any round in which a priest is receiving and/or transferring a spell, the caster cannot take any other significant action.\n&emsp;A priest can receive spells only from priests who worship the same deity and who specifically target spells to him. Area effect spells may be passed. A priest can never use *mystic transfer* to pluck an opponent’s spells out of the air.'
};

pri2['Nap'] = {
    'level': '2',
    'school': 'Alteration',
    'sphere': 'Time',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': ' [[@{level-priest}]] creatures',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A scrap of pillow ticking, a feather, and a pebble that the caster has kept in his pocket for seven nights.',
    'reference': 'p. 61',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Creatures affected by this spell are put to sleep for one hour. Upon awakening, the creature is as refreshed as if he had slept for eight hours. The affected person recovers lost hit points as if he rested for a full night. Wizards can memorize spells as if real time had passed.\n&emsp;Because the rest is so complete and rejuvenating, a character does not feel fatigued after waking. Attempts to use *nap* more than once in an 18-hour period are ineffective (the character simply is not sleepy). Only willing subjects can be affected by *nap*.'
};

pri2['Rally'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'War',
    'range': '240 yards',
    'duration': 'Instantaneous',
    'aoe': 'One unit of up to 300 individuals',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A miniature duplicate of a pennant or standard that represents the cause for which the unit is fighting (such as a national flag or the blazon of the unit’s liege lord). The pennant is consumed in the casting.',
    'reference': 'p. 62',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the subject unit to make an immediate rally check. It allows the check during the Magic Phase, rather than forcing the unit to wait for the Rally Phase in the BATTLESYSTEM™ rules. If the priest casting the spell is of 12th level or higher, the subject unit receives a +1 bonus to its *rally* check die roll. The priest must have an uninterrupted line of sight to the unit.'
};

pri2['Sanctify'] = {
    'level': '2',
    'school': 'Conjuration/Summoning (Reversible)',
    'sphere': 'All',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '10 yard × 10 yard square/priest',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '*Sanctify:* The priest’s holy symbol and a handful of dirt from the grounds of an existing temple of the same faith. *Defile:* the priest’s holy symbol and a handful of earth from a grave.',
    'reference': 'p. 62',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This cooperative spell allows the priests to create a beneficial atmosphere within a specified area. Companions of similar alignment to the casters will feel fortified and encouraged while in the sanctified area. The spell can be cast by a single priest or a group of priests.\n&emsp;After casting *sanctify*, the affected area is imbued with the deity’s majesty. For followers of that deity, the area radiates a holy aura. These followers gain a +2 bonus to saving throws against all fear- and charm-based powers (a +2 to morale for BATTLESYSTEM™ rules units). Persons of the same alignment as the caster but of different faiths gain a +1 to saving throws (+1 in BATTLESYSTEM rules). The effect applies only as long as the characters remain in the sanctified area.\n&emsp;Creatures intent on harming the priest or his followers suffer a -1 on saving throws vs. fear and charm (-1 to morale for BATTLESYSTEM rules units) when on sanctified ground.\n&emsp;Undead creatures within the area are easier to turn; any priest standing on sanctified ground turns undead as if he were one level higher.\n&emsp;Although this spell can be cast by a single priest, it is most effective when cast by several priests at once. The duration of the spell is equal to one round per level of the caster. Currently [[@{level-priest}]] rounds. When several priests cast the spell, the level of the most powerful priest is used, with two rounds added for every contributing priest. Thus, one 8th-level and three 6th-level priests would give the spell a duration of 14 rounds (8+2+2+2).\n&emsp;*Sanctify* is often used in conjunction with *focus* to protect the grounds of a temple or encourage men defending a castle.\n&emsp;The reverse of this spell, *defile*, functions in an identical manner with respect to saving throws for charm and fear. However, priests standing on defiled ground who attempt to turn undead do so at one level lower than their current level.'
};

pri2['Zone of Truth'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Wards',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '[[5*[[@{level-priest}]] ]]-foot square',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'The priest’s holy symbol and a phony emerald, ruby, or diamond.',
    'reference': 'p. 62',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell prevents creatures within the area of effect (or those who enter it) from speaking any deliberate and knowing lies. Creatures are allowed a saving throw to avoid the effects; those who fail the save are affected fully. Affected characters are aware of this enchantment; therefore, they may avoid answering questions to which they would normally respond with a lie or they may be evasive as long as they remain within the boundaries of the truth. When a character leaves the area, he is free to speak as he chooses.\n&emsp;The spell affects a square whose sides are five feet long per level of the caster; thus, a 4th-level priest could affect a 20 foot by 20 foot square.'
};

pri3['Accelerate Healing'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Time',
    'range': 'Touch',
    'duration': '[[1d4]] days',
    'aoe': 'One creature',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 63',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the affected creature to experience natural healing at twice the normal rate for 1-4 days. In other words, a person affected by *accelerate healing* regains 2 hit points per day of normal rest or 6 hit points per day spent resting in bed. The spell has no effect on *potions of healing* or other magical forms of healing.'
};

pri3['Adaptation'] = {
    'level': '3',
    'school': 'Enchantment/Charm, Alteration',
    'sphere': 'War',
    'range': 'Special',
    'duration': 'Special',
    'aoe': 'One unit of up to 200 individuals',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': '*Way 1:* A pinch of clay dust. *Way 2:* The priest’s holy symbol.',
    'reference': 'p. 62',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can be cast in two different ways. The first, appropriate for battlefield use, has a range of 180 yards, a casting time of one turn, and duration of 1d4+2 turns. During this period, the affected unit can fight in one specific type of terrain (specified by the caster) as if it were the favored terrain (per BATTLESYSTEM™ rules) for that unit. While this spell is in effect, the unit gains no benefit when fighting in their actual favored terrain; the magically-enforced favored terrain takes precedence. The priest can cancel the spell before the duration expires if desired.\n&emsp;The second effect requires preparation in advance. The priest and unit must be within 100 yards of a place of worship dedicated to the casting priest’s deity. The casting time is 5 turns.\n&emsp;At the conclusion of the casting, the unit gains the benefit described above, with two main differences. First, the unit does not lose the benefit of fighting in its own actual favored terrain (the unit effectively has two favored terrains). Second, the spell endures until the next sunset. Only priests of 12th level and higher can cast this variation.'
};

pri3['Astral Window'] = {
    'level': '3',
    'school': 'Divination',
    'sphere': 'Astral',
    'range': '5 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '10’×10’ area',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 63',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, a “window” appears in the air before the priest, through which he (and any others present) can see into the Astral plane. The *astral window* ranges in size from one square foot up to a 10’×10’ square, at the caster’s choosing. The window is not mobile, and if the priest moves more than 5 yards away from it, it immediately vanishes and the spell ends.\n&emsp;By stating a subject’s name, the priest may view a specific creature or object in the window. More than one subject may be viewed during the spell’s duration. Each time a new subject is chosen, the window becomes streaked with grey as the Astral plane flies past. This continues for 1d4 rounds, until the window finally focuses upon the chosen subject. If the person is not in the Astral plane, the window instead chooses a random location.\n&emsp;The window operates from both sides; creatures in the Astral plane can see the priest as easily as he can see them. Verbal communication is not possible, however.\n&emsp;Normally, creatures cannot pass through the window. If an attempt is made, there is a base 5% chance of success. This is modified by +1% per level or Hit Dice of the individual. In order to pass through, the creature or object must be small enough to fit through the window; otherwise, only a portion of the subject may reach through (such as a monster’s arm or searching tongue).\n&emsp;By casting the *astral window* spell, a character who subsequently casts the 7th-level *astral spell* may choose to arrive in the Astral plane at the place shown in the window.\n&emsp;'
};

pri3['Caltrops'] = {
    'level': '3',
    'school': 'Evocation',
    'sphere': 'War',
    'range': '[[20*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A golden caltrop.',
    'reference': 'p. 63',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows a priest to plant a section of ground with magically created caltrops.\n&emsp;The spell can create two kinds of caltrops: infantry and cavalry. The first are of small size and are designed to harm foot soldiers. The latter are larger and cause serious damage to cavalry or units composed of size L or larger creatures. Cavalry caltrops are so large that size M or smaller creatures can easily step around them. This prevents damage to infantry units.\n&emsp;Each time a unit moves into a planted area, the unit suffers an attack of AD=4 (for infantry caltrops) or AD=6 (for cavalry caltrops). Units charging through a planted area suffer double damage. If a unit ends its movement in a caltrop-sown region, it suffers another attack when it moves out of the area.\n&emsp;This spell can create a rectangular field of infantry caltrops up to 160 square yards in area (e.g., 4 yards × 40 yards, 2 yards × 80 yards, etc.), or a field of cavalry caltrops up to 90 square yards in area (e.g., 3 yards × 30 yards, 2 yards × 45 yards, etc.).\n&emsp;Ordinary caltrops make no distinction between friend or foe; all creatures entering a caltrop-sown area suffer the same consequences. The same is true of magical caltrops, with one exception: the casting priest can terminate the spell at any time, causing the caltrops to vanish and leaving the terrain clear.\n&emsp;Unlike normal caltrops, a region sown with magical caltrops cannot be “swept” clear; the magical caltrops remain in place until the spell terminates.'
};

pri3['Choose Future'] = {
    'level': '3',
    'school': 'Divination',
    'sphere': 'Time',
    'range': 'Touch',
    'duration': '1 round',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'Two grains of sand and a rose petal.',
    'reference': 'p. 64',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'In the round immediately following the casting of this spell, the affected creature is allowed two rolls for any normal attack roll, initiative roll, or saving throw. The affected creature can then choose the roll he prefers.\n&emsp;For example, a priest casts *choose future* on a warrior companion. In the next round, the warrior attacks an enemy with his sword. The warrior makes two attack rolls instead of one, then chooses which roll will determine the outcome of his attack.'
};

pri3['Create Campsite'] = {
    'level': '3',
    'school': 'Conjuration/Summoning (Reversible)',
    'sphere': 'Travelers',
    'range': '0',
    'duration': 'Special',
    'aoe': '50-foot radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A piece of string, a bit of wood, and a drop of water.',
    'reference': 'p. 64',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the caster generates a squadron of tiny invisible servants who create a campsite for the caster and his companions. The caster indicates the desired area for the campsite (an area of 50-foot radius or less) and the number of persons the campsite is to accommodate (a number of persons equal to three times the level of the caster, currently [[3*[[@{level-priest}]] ]] persons).\n&emsp;The servants clear the area of debris, set up tents and bedrolls, start a campfire, fetch water, and prepare a bland meal. The campsite is so skillfully prepared that it blends with the surrounding terrain, reducing the chance that the camp could be noticed by 50%. Campfires, loud noises, and other activities can negate this.\n&emsp;The entire process takes 4-16 ([[4d4]]) rounds to complete.\n&emsp;The servants make camp with the gear and equipment provided for them; otherwise, the servants will improvise with materials available in the immediate area (50 yards of the designated campsite). For instance, if the party has no tents or beds, the servants will construct crude but comfortable beds of weeds and grass and temporary shelters of leaves and branches. If no materials are available, such as in the desert or similarly barren terrain, the servants will do their best to make the party as comfortable as possible within the environmental limitations.\n&emsp;The servants cannot fight for the party, deliver messages, or take any other actions other than creating the campsite.\n&emsp;The reverse, break camp, causes the invisible servants to strike a campsite (an area of 50-foot radius or less). The servants extinguish fires, dispose of debris, and pack gear for a number of people equal to three times the level of the caster. The entire process takes 4-16 ([[4d4]]) rounds to complete. When completed, all traces of the campsite are eliminated. The material components are the same as those for *create campsite*.'
};

pri3['Efficacious Monster Ward'] = {
    'level': '3',
    'school': 'Abjuration',
    'sphere': 'Wards',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '[[10*[[@{level-priest}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': 'The priest’s holy symbol and a pinch of salt.',
    'reference': 'p. 65',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell prevents monsters of 2 or fewer Hit Dice from entering the area of effect. Such creatures are allowed a saving throw; success indicates that they avoid the spell’s effects and are able to enter the area of effect.\n&emsp;The spell affects a cubic area whose sides equal the caster’s level times 10 feet (for example, a 9th-level caster could affect an area equal to a 90’ ✕ 90’ ✕ 90’ cube).\n&emsp;Monsters within the area of effect when the spell is cast are not affected; however, when they leave the area of effect, they cannot return. Monsters outside the area of effect can hurl rocks, spears, and other missile weapons at targets inside and can also cast spells into the warded area.'
};

pri3['Emotion Control'] = {
    'level': '3',
    'school': 'Alteration, Enchantment/Charm',
    'sphere': 'Thought, Charm',
    'range': '10 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '[[floor([[@{level-priest}]]/5)]] creature(s) within a 20’ cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': 'Both versions of the spell uses a small bunch of fleece or uncarded wool that is consumed in the casting.',
    'reference': 'p. 65',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can be cast in one of two ways: in a manner that affects the priest, or in a manner that affects a subject other than the priest.\n&emsp;The first method affects only the priest and allows him to shield his true emotions from magical examination. Thus, it can block wizard spells such as *ESP* or priest spells such as *emotion read*. While *emotion control* is in effect, anyone using one of these spells will sense the emotion designated by the priest rather than his true emotions. When the priest casts *emotion control*, he designates the false emotion he wishes to be revealed.\n&emsp;This use of *emotion control* also gives the priest a +2 bonus to saving throws against the following spells: *spook, taunt, irritation, know alignment, scare, emotion, fear,* and *phantasmal killer*. When any of these spells are cast on the priest, he is immediately aware of the attempt, although he does not learn the source of the spell.\n&emsp;If another character casts *emotion read*, *ESP*, or a similar spell on the priest, the priest must make a saving throw vs. spells with a +1 bonus for each 5 levels of the priest. If the priest successfully saves, the other spellcaster reads the false emotion; if the priest fails the saving throw, the spellcaster reads the priest’s true emotion.\n&emsp;The second use of this spell allows the priest to create a single emotional reaction in the subject(s) (similar to the wizard spell *emotion*). Some typical emotions follow, but the DM may allow other similar effects.\n&emsp;*Courage:* The subject becomes berserk, gaining +1 to attack rolls and +3 to damage, and temporarily gaining 4 hit points (damage against the subject is deducted from these temporary points first). The subject need never check morale, and receives a +5 bonus to saving throws against the various forms of fear. Courage counters (and is countered by) *fear*.\n&emsp;*Fear:* The subject flees from the priest for the duration of the spell, even if this takes him out of spell range. Fear counters (and is countered by) courage.\n&emsp;*Friendship:* The subject reacts positively to any encounter; in game terms, any result of a roll on the Encounter Reactions table (Table 59 in the *DMG*) is moved one column to the left. Thus, a threatening PC becomes cautious, an indifferent PC becomes friendly, etc. Friendship counters (and is countered by) hate.\n&emsp;*Happiness:* The subject experiences feelings of warmth, well-being, and confidence, modifying all reaction rolls by +3. The subject is unlikely to attack unless provoked. Happiness counters (and is countered by) sadness.\n&emsp;*Hate:* The subject reacts negatively to any encounter; in game terms, any result of a roll on the Encounter Reactions table is moved one column to the right (i.e., a friendly PC becomes indifferent, a cautious PC becomes threatening, etc.). Hate counters (and is countered by) friendship.\n&emsp;*Hope:* The subject’s morale is improved by +2. His saving throw rolls, attack, and damage rolls are all improved by +1 while this emotion is in effect. Hope counters (and is countered by) hopelessness.\n&emsp;*Hopelessness:* The subject’s morale suffers a -10 penalty. In addition, in the round in which the emotion is initially established, all subjects must immediately make a morale check. Hopelessness counters (and is countered by) hope.\n&emsp;*Sadness:* The subject feels uncontrollably glum and is prone to fits of morose introspection. All attack rolls suffer a -1 penalty and initiative rolls suffer a +1 penalty. The subject’s chance of being surprised is increased by -2. Sadness counters (and is countered by) happiness.\n\n&emsp;All subjects of the second version, even willing targets, must save vs. spell to resist the emotion. In addition to all other modifiers, the saving throw is modified by -1 for every three levels of the priest casting the spell. Currently modified by -[[floor([[@{level-priest}]]/3)]]'
};

pri3['Extradimensional Detection'] = {
    'level': '3',
    'school': 'Divination',
    'sphere': 'Numbers, Divination',
    'range': '0',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'One 10’-wide path, 60 feet long',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 66',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When *extradimensional detection* is cast, the priest detects the existence of any extradimensional spaces or pockets in a path 10 feet wide and 60 feet long in the direction he is facing. The priest may turn, scanning a 60° arc each round, or may move slowly while the spell is in effect to change the sweep of the detection.\n&emsp;Extradimensional spaces include those created by spells such as *rope trick* and those contained within such items as *bags of holding* and *portable holes*. The priest does not automatically know the size of the space or its source.\n&emsp;This spell detects interplanar gates and the “gate” opened by the spell *extradimensional folding*.\n&emsp;The spell can be blocked by a stone wall of one foot thickness or more, a one-inch thickness of solid metal, or one yard or more of solid wood.'
};

pri3['Helping Hand'] = {
    'level': '3',
    'school': 'Evocation',
    'sphere': 'Travelers',
    'range': 'Special',
    'duration': '[[@{level-priest}]] hours',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A black silk glove.',
    'reference': 'p. 66',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a priest is trapped or otherwise endangered, this spell can summon help. The spell creates a hovering, ghostly image of a hand about one foot high. The caster can command it to locate a character or creature of the caster’s choice based on a physical description. The caster can specify race, sex, and appearance, but not ambiguous factors such as level, alignment, or class.\n&emsp;After the hand receives its orders, it begins to search for the indicated creature, flying at a movement rate of 48. The hand can search within a 5-mile radius of the caster.\n&emsp;If the hand is unable to locate the indicated creature, it returns to the caster (provided he is still within the area of effect). The hand displays an outstretched palm, indicating that no such character or creature could be found. The hand then disappears.\n&emsp;If the hand locates the indicated subject, the hand beckons the subject to follow it. If the subject follows, the hand points in the direction of the caster, leading the subject in the most direct, feasible route. The hand hovers 10 feet in front of the subject, moving before him. Once the hand leads the subject to the caster, it disappears.\n&emsp;The subject is not compelled to follow the hand or help the caster. If the subject chooses not to follow the hand, the hand continues to beckon for the duration of the spell, then disappears. If the spell expires while the subject is en route to the caster, the hand disappears; the subject will have to rely on his own devices to locate the caster.\n&emsp;If there is more than one subject within a 5-mile radius that meets the caster’s description, the hand locates the closest creature. If that creature refuses to follow the hand, the hand will not seek out a second subject.\n&emsp;The ghostly hand has no physical form. The hand can be seen only by the caster and potential targets. It cannot engage in combat or execute any other task aside from locating the subject and leading him back to the caster. The hand will not pass through solid objects, but can pass through small cracks and slits.'
};

pri3['Invisibility Purge'] = {
    'level': '3',
    'school': 'Abjuration',
    'sphere': 'Wards',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '10-foot square/priest',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a silver mirror no more than three inches in diameter.',
    'reference': 'p. 67',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'All invisible creatures who enter an area enchanted with *invisibility purge* instantly become visible. *Invisibility*-related spells do not take effect within the boundaries of the enchanted area, and magical devices such as *potions of invisibility* do not function. Creatures with the natural ability to become invisible are unable to use this ability within the area of effect. Invisible objects carried into the warded area also become visible.\n&emsp;Invisible creatures or persons within the area of effect when *invisibility purge* is cast remain invisible; however, if such creatures exit the area of effect and later re-enter, they instantly become visible. Such creatures also lose any natural ability to turn invisible as long as they remain within the area of effect.\n&emsp;A creature who consumes a *potion of invisibility* outside the warded area becomes invisible normally, but becomes visible when he enters the area of effect; if the duration of the *potion of invisibility* has not yet expired when he exits the area of effect, he becomes invisible again outside the area.\n&emsp;Creatures who are invisible in their natural state or have no visible form (such as invisible stalkers) are not affected by this spell.\n&emsp;The *invisibility purge* can be cast as a cooperative magic spell. The potency of this spell can be increased if several priests cast it at the same time. The duration of the spell is then equal to one turn per level of the most powerful priest, plus one turn for every contributing priest. Each priest also increases the area of effect by one 10’ ✕ 10’ square (these areas must be contiguous). Thus, a 9th-level priest and two 5th-level priests could create a 30’ ✕ 10’ *invisibility purge* area having a duration of 11 turns.'
};

pri3['Know Customs'] = {
    'level': '3',
    'school': 'Divination',
    'sphere': 'Travelers',
    'range': 'Special',
    'duration': 'Special',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 67',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows a caster to gain general knowledge of the customs, laws, and social etiquette of a tribe or village. The caster must be within 30 yards of a member of the tribe or village for the spell to have effect. The selected villager must possess the knowledge sought by the caster; for instance, he cannot be an infant, nor can he be mentally unstable or dead (although he can be asleep or unconscious).\n&emsp;The selected villager is allowed a saving throw; if he succeeds, the spell fails.\n&emsp;If the saving throw fails, the caster gains a general knowledge of the villager’s local laws and customs, including those that apply to relevant tribal or clan types (such as customs observed by all giants). Typical information revealed by *know customs* includes common courtesies (outsiders must avert their eyes when addressing local officials), local restrictions (no animals or unaccompanied elves within the city limits), important festivals, and common passwords that are known by the majority of citizens (such as a phrase necessary to pass the guards at the main gate). Additionally, the spell gives the caster a +1 reaction adjustment to encounters with members of the relevant tribe or village.\n&emsp;Knowing the local laws and customs does not guarantee that the caster will conduct himself properly. *Know customs* is to be used as a guide; the DM is free to adjust the quality of information provided by a villager.'
};

pri3['Line of Protection'] = {
    'level': '3',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Protection',
    'range': '0',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '30-yard line',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'The priests’ croziers, staves, or religious standards, held aloft by each caster.',
    'reference': 'p. 67',
    'book': 'Tome of Magic',
    'damage': '*All creatures:* 1d3. *Evil/Undead:* 1d8. *Reverse; Paldin/Good:* 1d8',
    'damage-type': '',
    'healing': '',
    'effect': 'This cooperative spell requires at least two priests to cast the spell simultaneously. During the casting, the priests determine whether the line will be stationary or portable.\n&emsp;If the spell is stationary, each priest must inscribe a magical sigil on parallel facing surfaces, such as facing walls of a gatehouse or two tree trunks. If the spell is portable, the priests must stand at each end of the line, thereby anchoring it.\n&emsp;After the spell is cast, a shimmering field of force appears between the two anchors (the sigils or priests). The field is 10 feet high and sparkles with energy. Objects on the opposite side of the translucent field, while recognizable, are hazy and indistinct.\n&emsp;The field causes 1d3 points of damage to all creatures passing through it; evil creatures and undead suffer 1d8 points of damage from the field. Creatures that roll a successful saving throw suffer no damage. Creatures that can fly over the field, burrow under it, or *teleport* to the other side are immune to damage.\n&emsp;If the spell is cast in its portable form, the priests can move at half their movement rates (limited to the rate of the slower priest). The priests can take no other action, since all their energy is spent in walking and maintaining the field.\n&emsp;Once created, the field cannot be increased or decreased in length and must remain straight. The priests could maneuver by pivoting, but could not walk toward each other or bend the field around a corner. If the line of sight between the two priests is blocked by any object of greater than 5’ diameter, the spell immediately fails. Thus, creatures, low walls, young trees, pillars, and similar objects will not disrupt the spell.\n&emsp;As a cooperative spell, several priests can link together to create a longer field. Each priest (or sigil) forms the end of one field and the beginning of another, much like fenceposts. Each section of the spell must extend in a straight line, but the field can be bent at each junction. Four priests could form a long line, a square, or a Z pattern. The restrictions on moving the fields apply as outlined above. The DM may apply movement penalties depending on the complexity of the pattern.\n&emsp;The reverse of this spell, *line of destruction*, causes 1d3 damage to all creatures passing through it. It causes 1d8 damage to paladins and creatures of good alignment who pass through it. Creatures that roll a successful saving throw suffer no damage.'
};

pri3['Memory Read'] = {
    'level': '3',
    'school': 'Divination',
    'sphere': 'Thought',
    'range': '5 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'A small piece of linen cloth with threads of gold interspersed throughout its weave. This is consumed during the casting.',
    'reference': 'p. 68',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the priest to read the memory of a single subject. The priest experiences the memory with the same intensity as the subject. The time required to view a memory is one-fiftieth of the time that the actual event lasted. Thus, a priest can view the memory of an event that lasted for one hour in a little more than one round. The subject experiences the memory at the same time the caster reads it.\n&emsp;The subject must have an Intelligence score of 5 or more and must remain within range of the priest throughout the time it takes to read the desired memory. Priests can cast this spell on unconscious, sleeping, *held*, or *paralyzed* creatures.\n&emsp;The subject receives a saving throw when the priest casts the spell (this saving throw is allowed even if the subject is asleep or otherwise unaware of the attempt). In addition, if the memory that the priest wants to view concerns something the subject wants to keep secret, or is something that the subject is trying to suppress, the subject receives a +5 bonus to the saving throw. If the memory the priest wishes to view is more than six months old, the subject receives a second saving throw, with bonuses depending on the age of the memory as follows:}}{{style=bottom2 sheet-spell-center2}}{{c1-1=**Age of Memory**}}{{c2-1=6-12 months}}{{c3-1=1 to 4 years}}{{c4-1=5 years or more}}{{c1-2=**Bonus**}}{{c2-2=0}}{{c3-2=+1}}{{c4-2=+3}}{{effects2=&emsp;If the subject succeeds either of these saving throws, the spell fails.\n&emsp;This spell creates a mental drain on the priest, causing him to temporarily lose 1-3 points of Constitution. These can be regained only after eight hours of rest. The spell cannot be cast again until the priest’s constitution is restored.'
};

pri3['Miscast Magic'] = {
    'level': '3',
    'school': 'Invocation/Evocation',
    'sphere': 'Chaos',
    'range': '[[40+10*[[@{level-priest}]] ]] yards',
    'duration': 'Special',
    'aoe': 'One creature',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 69',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Miscast magic* can be cast only on a wizard. It causes the next spell cast by the affected wizard to be chosen randomly from his memorized spells of the same or lower level. Thus, if a wizard affected by *miscast magic* had four 1st-level spells memorized (*armor*, *feather fall*, *jump*, and *sleep*) and he attempted to cast the sleep spell, the DM would determine the resulting spell randomly from the wizard’s four memorized spells. The wizard has only a 25% chance of casting the *sleep* spell.\n&emsp;Only spells currently memorized are eligible to be exchanged with the desired spell. If a wizard had only one spell memorized, the *miscast magic* would have no effect and the wizard’s spell would be cast normally.\n&emsp;The miscast spell operates normally. If a wizard tried to *levitate* a companion but a *web* spell resulted, the companion would be trapped by the webs and subject to all resulting effects. If the target of the spell were in range of the *levitate* spell but not in range of the *web*, the spell would be lost in a fizzle of energy and the *web* spell would be wiped from the caster’s memory.\n&emsp;The wizard who casts the spell performs the proper verbal and somatic components of the spell he wishes to cast; he does not discover the altered results until the wrong spell takes effect. The wizard will also discover that the material component for the resulting spell has vanished (in addition to the material component for the desired spell).\n&emsp;Wizards who are targets of *miscast magic* are allowed a saving throw vs. spell to avoid the effect.'
};

pri3['Moment Reading'] = {
    'level': '3',
    'school': 'Divination',
    'sphere': 'Numbers',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A set of 36 small disks made of polished bone engraved with runes that represent numbers. These disks are not consumed in the casting.',
    'reference': 'p. 69',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the priest to determine the “tenor of the now”--in other words, to learn the “force” that is most dominant at the time. To cast the spell, the priest generates a series of random numbers and then studies the pattern contained in that string of numbers. This pattern contains information about current conditions.\n&emsp;In game terms, when this spell is cast, the DM communicates to the priest’s player a single word or short phrase (no more than five words) describing the “tone” of the situation. Examples of suitable “tones” are “imminent danger” (the DM knows a dragon is approaching the area); “peace and tranquility” (the woods in which the PCS camp may look threatening, but the area is actually free of evil influence); or “betrayal” (one of the PCS’ hirelings is actually a spy of their enemy). The DM can make this comment cryptic, but it should always be accurate and contain some useful information.\n&emsp;This spell has no specified area of effect. The result of *moment reading* will always concern the priest and anyone else in his immediate vicinity, but the definition of “vicinity” will vary depending on the circumstances. For example, the tenor of the moment might be “severe danger” if the priest is entering the territory of a dragon who attacks interlopers on sight.\n&emsp;The tenor of the moment is always personally applicable to the priest. For example, even if the priest is in a nation dangerously close to war with its neighbor, this condition will not appear in the tenor of the moment unless the priest is personally involved (if he’s currently in the direct path of an invading army, for instance).\n&emsp;One casting of this spell tends to “taint” subsequent castings of the same spell unless they are separated by a minimum length of time. If a priest casts this spell twice within 12 hours, the second reading gives the same result as the first, regardless of the actual situation. If a second priest casts the spell within 12 hours of another priest’s use of the spell, he receives an accurate reading.'
};

pri3['Random Causality'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Chaos',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': 'One weapon',
    'components': 'V, S, M',
    'cast-time': '[[3+[[@{level-priest}]] ]] rounds',
    'saving-throw': 'Negate',
    'materials': 'A bronze die.',
    'reference': 'p. 69',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a rift in the nature of cause and effect. The spell is cast upon an opponent’s weapon. When the weapon is used, it hits and causes damage normally, but the damage is not applied to the creature struck by the weapon. Instead, the person wielding the weapon or one of his companions suffers the damage. If the weapon misses its target on any round, no damage is caused in that round.\n&emsp;Using a die roll, the DM randomly determines the victim of the damage. The DM selects a die with a value nearest the number of eligible creatures (the wielder of the weapon and his companions). If the number of creatures does not equate to highest value of a die, the wielder of the enchanted weapon takes the extra chances to be hit. For example, if a goblin wields a sword affected by this spell, he and his six companions are eligible to receive the damage. The DM rolls 1d8. On a roll of 1-6, one of the goblin’s companions suffers the damage; on a roll of 7 or 8, the goblin with the affected weapon suffers the damage.\n&emsp;The weapon is affected for 3 rounds+1 round/level of the spell caster. If the wielder of the weapon changes weapons while the spell is in effect, the discarded weapon remains enchanted.'
};

pri3['Rigid Thinking'] = {
    'level': '3',
    'school': 'Enchantment/Charm',
    'sphere': 'Law',
    'range': '60 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'One creature',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 70',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Rigid thinking* can be cast only upon a creature with Intelligence of 3 or greater. The creature is allowed a saving throw to avoid the effects.\n&emsp;The creature affected by *rigid thinking* is in capable of performing any action other than the activity he is involved in when the spell takes effect. The creature’s mind simply cannot decide on another course of action--it becomes frozen into a single thought and cannot change even if new circumstances would suggest otherwise. Thus, a warrior fighting a kobold will ignore the arrival of a beholder, and a thief picking a lock will pay no heed to the arrival of three guards.\n&emsp;The affected creature does not mechanically repeat the action; he is not an automaton. He will not continue to fire his bow at a dragon if he runs out of arrows, but will choose another means of attacking the dragon to the exclusion of all other activities.\n&emsp;A spellcaster in the process of casting a spell when *rigid thinking* takes effect will not attempt to repeat the spell (unless the spell has been memorized more than once). The spellcaster will, however, devote his attention to the target of that spell until his goal is met (e.g., if the caster were attacking a creature, he would continue to direct attacks at that creature; if the caster were trying to open a door, he would continue to work on the door until it opens).\n&emsp;The spell expires when the creature accomplishes his goal (i.e., the kobold is killed or the lock is opened) or when the duration of the spell has ended.'
};

pri3['Slow Rot'] = {
    'level': '3',
    'school': 'Abjuration',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] weeks',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A pinch of sugar.',
    'reference': 'p. 70',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell increases the amount of time that fruits, vegetables, and grains remain wholesome and ripe. The spell will not take effect upon meat of any kind.\n&emsp;The caster can affect as much as 100 cubic feet of plant material per level. Currently [[100*[[@{level-priest}]] ]] cubic feet. Thus, even a low level priest could effectively keep a farmer’s grain from rotting while in storage or keep the fruit on the trees in his orchard ripe until they are harvested. This spell does not prevent pests (such as rats) from eating the food.'
};

pri3['Squeaking Floors'] = {
    'level': '3',
    'school': 'Evocation',
    'sphere': 'Wards',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '[[10*[[@{level-priest}]] ]]-foot square',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A rusty iron hinge that squeaks when moved.',
    'reference': 'p. 70',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A surface affected by *squeaking floors* squeaks loudly when any creature larger than a normal rat (larger than one-half cubic foot or weighing more than three pounds) steps on it or touches it. The spell affects a square whose sides equal the caster’s level times 10 feet (a 9th-level priest could affect a square whose sides are 90 feet long).\n&emsp;The squeaks can be heard in a 100-foot radius, regardless of interposing barriers such as walls and doors. The squeaks occur regardless of the surface, whether wood, stone, dirt, or any other solid material. Listeners automatically know the direction of the sounds.\n&emsp;Characters who successfully move silently reduce the radius of the noise to 50 feet. Those able to *fly* or otherwise avoid direct contact with the affected surface will not activate the squeaking floor.'
};

pri3['Strength of One'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Law',
    'range': '10 yards',
    'duration': '[[2d6]] rounds',
    'aoe': '[[1+floor([[@{level-priest}]]/2)]] creatures',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 71',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell on a group of lawful creatures, the priest imbues each creature with a Strength bonus equal to that of the strongest creature in the group. To be affected by the spell, all creatures must touch the hand of the priest at the time of casting. Only human, demihuman, and humanoid creatures of man-size or smaller may be affected. The characters can be a mixed group of Lawful Neutral, Lawful Good, or Lawful Evil alignments. The spell will not take effect if any creature of Neutral or Chaotic alignment is included in the group.\n&emsp;Prior to casting, one creature is designated the keystone. There may never be more than one keystone in a group, even if another creature has equal strength.\n&emsp;Upon completion of the spell, all affected characters gain a bonus to damage equal to the keystone’s bonus to damage from Strength. Any magical bonuses belonging to the keystone are not added; only the keystone’s natural strength is conferred on the group.\n&emsp;This bonus supersedes any bonus a character might normally receive. Thus, a warrior with 16 Strength (a +1 bonus to damage) who benefits from this spell with a keystone who has Strength 18/07 (a damage bonus of +3) gains a total bonus of +3 to damage (not +4 to damage). The keystone receives no bonus.\n&emsp;Affected creatures gain no improvements to THAC0, bend bars/lift gates, or other functions of Strength.\n&emsp;The spell ends if the keystone is killed before the duration expires. The bonus and duration are not affected if a member of the group is killed within the duration of the spell.'
};

pri3['Telepathy'] = {
    'level': '3',
    'school': 'Divination, Alteration',
    'sphere': 'Thought',
    'range': '30 yards',
    'duration': '1 turn+[[2*[[@{level-priest}]] ]] rounds',
    'aoe': 'One creature',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 71',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell establishes direct, two-way mental contact between the priest and a single subject. The subject must have Intelligence of at least 5 for the spell to take effect. While the spell is in effect, the two participants can communicate silently and rapidly, regardless of whether they share a common language.\n&emsp;*Telepathy* does not give either participant access to the other’s thoughts, memories, or emotions. Participants can only “hear” the thoughts that the other participant actively “sends.”\n&emsp;Mind-to-mind communication is approximately four times faster than verbal communication. The level of complexity that can be communicated is only that which can be expressed through language. Gestures, expressions, and body language cannot be conveyed.\n&emsp;A priest can establish separate “telepathic channels” to multiple individuals. Each linkage is established through a separate casting of the spell. There is no network between the channels. For example, Balfas the priest establishes *telepathy* with Alra the warrior and Zymor the thief by casting this spell twice. Balfas can communicate a single thought to both Alra and Zymor, but Alra and Zymor cannot communicate with each other. Balfas, however, can “target” a thought so that only one of the two participants receives it.\n&emsp;If the priest casts this spell on an unwilling subject (for example, if the priest wants to silently threaten or taunt the subject), the subject receives a saving throw vs. spell to resist the effect. Willing subjects need not make a saving throw.\n&emsp;Lead sheeting of more than ½” thickness will totally block *telepathy*.'
};

pri3['Telethaumaturgy'] = {
    'level': '3',
    'school': 'Enchantment/Charm',
    'sphere': 'Numbers',
    'range': '0',
    'duration': 'Special',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '2 rounds',
    'saving-throw': 'None',
    'materials': 'A small book of numerological formulae and notes. This book is different from the book used in *personal reading*. The book is not consumed in the casting.',
    'reference': 'p. 72',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell requires the priest to perform a numerological analysis of a subject’s correct name. The result is that the priest may cast another spell that affects the subject individual at a range much greater than normal. In other words, by gaining deep knowledge of the individual, the priest creates a “channel” to that individual that makes a subsequent spell easier to cast on that subject.\n&emsp;Only certain spells can benefit from *telethaumaturgy*:\n\n*bless&ast;*\n*command*\n*charm person or mammal*\n*detect charm*\n*hold person*\n*know alignment*\n*remove curse&ast;*\n*probability control*\n*quest*\n*confusion (one creature only)*\n*exaction*\n\n&emsp;For spells marked with an asterisk (&ast;), *telethaumaturgy* also increases the range of the reversed spell. Unless indicated, *telethaumaturgy* does not increase the range of the reversed spells.\n&emsp;The increase in range depends on the level of the priest casting *telethaumaturgy*:}}{{c1-1=**Level**}}{{c2-1=1-6}}{{c3-1=7-11}}{{c4-1=12-16}}{{c5-1=17+}}{{c1-2=**Range Multiplier**}}{{c2-2=✕2}}{{c3-2=✕3}}{{c4-2=✕4}}{{c5-2=✕5}}{{effects2=&emsp;Thus, a 12th-level priest who has cast *telethaumaturgy* on an individual could subsequently cast *charm person* on that individual at a range of 320 yards, rather than the normal range of 80 yards.\n&emsp;A spell to be enhanced by *telethaumaturgy* must be cast on the round immediately following the completion of *telethaumaturgy*. Spells that normally affect more than one individual (such as *confusion*) will affect only the selected subject when cast following *telethaumaturgy*.\n&emsp;When *telethaumaturgy* is cast by a priest of 11th level or higher, it has an additional effect. If the target is within the normal range of the subsequent spell (e.g., 80 yards for *charm person*), the subject’s saving throw suffers a penalty of -2.\n&emsp;Like the *personal reading* spell, *telethaumaturgy* functions only if the priest knows the correct name of his subject. If the priest casts the spell using an alias, he will not know that *telethaumaturgy* has not taken effect until the subsequent spell fails. The priest does not automatically know why the subsequent spell failed (the subject might simply have made a successful saving throw).'
};

pri3['Thief\'s Lament'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Wards',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '[[5*[[@{level-priest}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': 'The priest’s holy symbol and a silver key.',
    'reference': 'p. 72',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A thief entering an area enchanted with *thief’s lament* suffers a great reduction in his thieving skills. The thief is allowed a saving throw to resist the effects of the spell; failure indicates that he suffers the full effects of the lament. All attempts to pick pockets, open locks, find/remove traps, move silently, detect noise, climb walls, and hide in shadows are reduced by 25% (although a skill cannot be reduced below 5%, presuming the character has at least a score of 5% in any skill).\n&emsp;The spell affects a cube whose sides equal the caster’s level times five feet (a 10th-level caster could affect a cube whose sides equal 50 feet).'
};

pri3['Unearthly Choir'] = {
    'level': '3',
    'school': 'Invocation',
    'sphere': 'Combat',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '5',
    'saving-throw': '½',
    'materials': '',
    'reference': 'p. 73',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This cooperative spell requires at least three priests casting the spell simultaneously. At the time of casting, the priests must be within 10 feet of each other. Upon completion of the spell, the priests sing a single, dissonant chord. The result of the spell depends on the number of voices in the choir.\n**Trio.** In this form, the spell projects a cone of sonic force 120 feet long and 40 feet wide at the base. All creatures within the area of effect must save vs. spells or suffer 2d4 points of damage. Those who successfully save suffer only 1d4 points. Undead suffer a -2 penalty to their saving throws.\n**Quartet.** With four voices, the spell has the same area of effect as described above. However, all those who fail their saving throw suffer 2d4 points of damage and are deafened for one round. Those who successfully save suffer half damage and are not deafened. Undead creatures are not allowed a saving throw.\n**Quintet.** Five singers produce a chord of major power. All within the area of effect suffer 3d4 points of damage (saving throw for half damage). Undead are not allowed a saving throw. All creatures are deafened for one round. Furthermore, pottery, glassware, crystal, and similar breakable goods must save vs. fall or be shattered.\n**Ensemble.** An ensemble of singers consists of six to ten priests. In this case, the area of effect increases to a cone 180 feet long and 60 feet wide at the base. All creatures within this area suffer 1d4 points of damage per priest and are deafened for 1d4 rounds. A successful saving throw vs. spell reduces the damage and duration of deafness by half. Undead creatures of 3 hit dice or less are immediately destroyed. All other undead suffer normal damage, but are not allowed a saving throw. Glass, pottery, crystal, bone, and all wooden items that are the strength of a door or less (chests, tables, chairs, etc.) must save vs. crushing blow or be shattered.\n**Choir.** The most powerful group, a choir, requires eleven or more priests. In this case, the area of effect expands to a cone 300 feet long and 100 feet wide at the base. All within the area of effect suffer 1d6 points of damage per priest to a maximum of 20d6. A saving throw vs. spells reduces the damage to half. Those who fail to save are deafened for 1d10 rounds; those who succeed are deafened only 1d6 rounds. Undead creatures of 5 hit dice or less are immediately destroyed. Undead with more hit dice are not allowed a saving throw. Structures within the area of effect are damaged as if they suffered a direct hit from a catapult (one hit per four priests in the choir). Doors, chests, and other breakable items are instantly shattered.'
};

pri3['Zone of Sweet Air'] = {
    'level': '3',
    'school': 'Abjuration',
    'sphere': 'Wards',
    'sphere-spells&magic': 'Elemental (Air), Wards',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[10*[[@{level-priest}]] ]]-foot cubes',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol, a silk handkerchief, and a strand of spider web.',
    'reference': 'p. 73',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Zone of sweet air* creates an invisible barrier around the area of effect that repels all noxious elements from poisonous vapors, including those created magically (such as a *stinking cloud*). The spell offers no protection against poisonous vapors created by a dragon’s breath weapon (such as the chlorine gas of a green dragon). Noxious gases already within the area of effect when the spell is cast are not affected. Fresh air passes into the area normally.\n&emsp;If a poisonous vapor is expelled within the area of effect (for example, a *stinking cloud* is cast), the spell takes effect normally but dissipates in half the time normally required.\n&emsp;The spell affects a cube whose sides equal the caster’s level times 10 feet (for instance, a 10th-level caster could affect a cube whose sides are 100 feet long).'
};

pri4['Addition'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Numbers, Creation',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A small table of numerological formulae inscribed on an ivory plaque, plus a length of silken cord. During the casting, the priest ties the cord into a complex knot. As the magical energy is discharged, the cord vanishes in a flash of light. The plaque is not consumed in the casting.',
    'reference': 'p. 74',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The philosophy of the Sphere of Numbers holds that the structure of reality--the “equation of the moment”--can be analyzed and modified by someone with sufficient knowledge and power. The *addition* spell allows a priest to add a new mathematical term to the equation of the moment. This effectively allows a new object or even a living creature to be brought into existence temporarily.\n&emsp;The effect of this spell varies depending on the level of the caster. At 10th level or lower, *addition* can create a single, inanimate object weighing up to 10 pounds. The spell gives the priest only rudimentary control over the creation process, so the object cannot be complex. The object must be described in a single word or short phrase (e.g., “a water pitcher” or “a block of stone”). The caster has no control over elements such as shape or color; thus, the water pitcher might be short, squat, and blue, or tall, slender, and red.\n&emsp;Objects created with this spell cannot be of any greater mechanical complexity or technological level than a crossbow. If the priest tries to create an object that breaks this prohibition, the spell fails and nothing is created. Thus, if the priest tried to create “a pistol,” assuming he had heard the word somewhere, the spell would fail.\n&emsp;Objects cannot contain any information in an abstract form such as writing or diagrams. If the priest tries to create an object that breaks this prohibition, there are two possible results: the spell may fail, or the object may be created without the information. Thus, if the priest were to attempt to create “a spellbook,” the result would be either a book similar to a spellbook with blank pages, or nothing at all.\n&emsp;The object appears at whatever location the caster wills, as long as it is within spell range. The object cannot appear in the same space occupied by another object or creature, or within a hollow object (for example, the priest cannot create an object blocking the trachea of an enemy).\n&emsp;The object created by *addition* remains in existence for 1 turn per level of the caster. Currently [[@{level-priest}]] turns. During this time, it obeys all the laws of physics as if it were a “real” object. The object cannot be disbelieved and spells such as *true seeing* cannot distinguish it from a naturally-occurring object.\n&emsp;Priests of 11th to 15th level can create a single inanimate object of up to 20 pounds in mass or two identical objects, each of up to five pounds in mass. The object(s) so created remains in existence for two hours (12 turns) per level of the caster. Currently [[2*[[@{level-priest}]] ]] hours.\n&emsp;Priests of 16th to 19th level can create a single inanimate object of up to 50 pounds in mass or up to 10 identical objects, each of up to five pounds in mass. The object(s) is permanent unless destroyed. Since these objects are not magical constructs, but real *addition*s to the “equation of the moment,” *dispel magic* has no effect on them. Alternatively, the caster can create a single normal (nonmonstrous) living creature of up to 20 pounds in weight. The creature, once created, behaves as a normal member of its species; the caster has no control over its actions. This creature remains in existence for 5 rounds per level of the caster. Currently [[5*[[@{level-priest}]] ]] rounds.\n&emsp;Priests of 20th level and above can create a single inanimate object of up to 100 pounds in mass or up to 10 identical objects, each of up to 10 pounds in mass. The object(s) are permanent. Alternatively, the caster can create a single normal (nonmonstrous) living creature of up to 100 pounds in weight and up to 2 hit dice. The creature, once created, behaves as a normal member of its species; the caster has no control over its actions. This creature remains in existence for 2 turns per level of the caster. Currently [[2*[[@{level-priest}]] ]] turns.'
};

pri4['Age Plant'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Time',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '[[@{level-priest}]] plants, seeds, or trees',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and the petal from an apple blossom.',
    'reference': 'p. 74',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to affect the aging of any plant, seed, or tree. The process can operate either forward or backward, causing flowers to blossom, seeds to sprout and grow, and trees to bear fruit; or fruit to turn to blossoms, trees to become saplings, and new shoots to turn to seeds.\n&emsp;The change in age, either forward or backward, is chosen by the priest at the time of casting. The changes associated with normal or reversed growth occur instantaneously. Plants can be altered in age up to 10 years per level of the caster. Currently up to [[10*[[@{level-priest}]] ]] years. The caster can stop the aging at any point within the limits imposed by his level; he could cause a tree to grow from a sapling until it withers and dies from old age or he could stop the tree’s growth at a stage at which it would shelter his home.\n&emsp;The spell does not alter the appearance or characteristics of a plant except those that result from normal aging (or regression). *Age plant* has no effect on magically-generated plants or plant-type monsters.'
};

pri4['Blessed Warmth'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Sun',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 75',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, a narrow shaft of light shines down upon the priest, making him immune to the effects of natural cold (such as a blizzard) and granting him a +3 bonus to saving throws vs. magical cold (such as a white dragon’s breath weapon).\n&emsp;For each level of the priest above 7th, an additional beam of light may be created to protect another creature, who must be standing within 3’ of the priest. Thus, a 10th-level priest could protect four other creatures in a 3’ radius. Currently [[ [[@{level-priest}]]-6]] additional beams.'
};

pri4['Body Clock'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Time',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] hours',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A kernel of corn, a drop of water, and a stoppered glass bottle.',
    'reference': 'p. 75',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Body clock* affects a subject in the following ways.\n&emsp;• The subject’s need for sleep is reduced. For every hour that a subject sleeps, he is as refreshed as if he slept 10 hours. For every two hours that a subject sleeps during the spell (20 hours of rest), he regains hit points as if he spent a day of complete rest. However, wizards are not able to memorize spells; “real” time must pass for this to occur.\n&emsp;• The subject’s need to breathe is reduced. He breathes only 10% as often as normal for the duration of the spell, enabling him to hold his breath 10 times longer than normal and use less air in enclosed situations.\n&emsp;• The subject can set an internal “alarm clock” to alert him when a specific amount of time has passed. The subject then hears a brief ringing in his ears, audible only to him. The ringing is loud enough to wake the subject. He can set as many internal alarm clocks as he wishes, as long as they all occur within the duration of the spell.\n&emsp;The spell has no effect on movement, spellcasting, or any other normal activities.'
};

pri4['Chaotic Combat'] = {
    'level': '4',
    'school': 'Invocation/Evocation',
    'sphere': 'Chaos',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'One creature',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 75',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When *chaotic combat* is cast on a fighter, he is inspired beyond his years of training and is suddenly struck with numerous insights for variations on the standard moves of attack and defense. The spell affects only warriors.\n&emsp;Unfortunately, these insights are helpful in only two-thirds of the warrior’s attacks. In the remaining attacks, the spell actually impairs the warrior’s standard performance. At the beginning of each round, after the player has declared his character’s actions, 1d6 is rolled for the affected warrior. On a roll of 1, 2, 3, or 4, the warrior gains bonuses of +2 to attack rolls and +2 to armor class. On a roll of 5 or 6, the warrior suffers a -2 penalty to attack rolls and a -2 penalty to armor class. This must be determined at the beginning of the round so that both the warrior and his opponents can apply the necessary changes.\n&emsp;The insight imparted by this spell is lost after the spell expires. The insight is generated by chaos, which is nearly impossible to contain. After the spell expires, the warrior remembers the battle but not the specifics of his actions. He is unable to duplicate the maneuvers.'
};

pri4['Chaotic Sleep'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Chaos',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'Negate',
    'materials': 'A pinch of sand and three coffee beans.',
    'reference': 'p. 76',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'After casting this spell, the priest must successfully touch his victim. The victim is then allowed a saving throw to avoid the spell’s effect. If the saving throw is failed, the spell takes effect at the next sunrise or sunset (whichever comes first).\n&emsp;From the time the spell takes effect until the spell is negated, the sleeping pattern of the victim is randomly disrupted. At sunset and sunrise of every day, a check is made to determine the effects of *chaotic sleep*. In the 12-hour period that follows the check, there is an equal chance that the character will be unable to sleep or unable to remain awake (roll 1d6; on a roll of 1-3, the character is awake, on a roll of 4-6, he sleeps). This condition lasts until the next sunrise (or sunset) when the check is made again.\n&emsp;For example, a fighter fails to save against *chaotic sleep*. For the next few hours, the spell has no effect. At sundown, the first check is made, resulting in a 2. The fighter does not notice anything until he tries to sleep that night, at which time he is wide awake, fidgeting and restless. At sunrise, another die roll is made, resulting in a 6. The fighter is suddenly exhausted and sleeps until sunset.\n&emsp;Characters who sleep as a result of this spell can be roused only by physical stimuli--a slap or a wound, for example. Once awake, the character remains conscious only as long as there are active stimuli around him, such as a fight. Walking through caves or riding a horse will not keep the character awake. Unlike a *sleep* spell, characters affected by *chaotic sleep* doze off as soon as they are left relatively undisturbed. Keeping an affected character awake is difficult at best.\n&emsp;Lack of sleep will eventually take a physical toll on any character under the influence of the spell. For every 12-hour period that a character remains awake beyond the first, he suffers a -1 penalty to THAC0. Such characters do not regain hit points as a result of normal healing. Spellcasters cannot memorize spells until they have had sufficient sleep.\n&emsp;*Chaotic sleep* can be removed with a *remove curse*.'
};

pri4['Circle of Privacy'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Travelers',
    'range': 'Special',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '50-foot-diameter circle',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A hair from a skunk, a whisker from a mouse, and enough salt to make a 50-foot-diameter circle.',
    'reference': 'p. 76',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell helps to discourage predators and trespassers from disturbing a campsite. The caster sprinkles salt in a circle enclosing an area up to 50 feet in diameter. For the duration of the spell, all sounds and scents generated within the circle are muted, making the area less noticeable to those outside the circle. Therefore, the group’s chance of encounter is reduced by 50% for the duration of the spell. The spell provides no protection against infravision or other forms of magical detection.'
};

pri4['Compulsive Order'] = {
    'level': '4',
    'school': 'Enchantment/Charm',
    'sphere': 'Law',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'A perfect cube made of metal.',
    'reference': 'p. 76',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The victim of *compulsive order* is compelled to place everything he encounters into perfect order. If he discovers treasure, he divides it into tidy piles or containers of silver, gold, and copper. He is reluctant to enter a dungeon because it is a messy place, but once inside, he is obsessed with cleaning it. A character under the power of this spell will sweep dirt from dungeon corridors into neat piles, arrange the corpses of a defeated orc band according to size, dash forward to remove a bit of lint on clothing, and insist that the party organize themselves alphabetically, then by size, and then by age. While the spell does not affect a character’s abilities, the overwhelming desire for order impairs the character’s usefulness in most adventures.\n&emsp;When a character afflicted by this spell attempts to undertake a new event (begin a battle, haggle with the merchant, etc.), the player must rationalize the action on the basis of his compulsion for order. Thus, the character cannot simply attack a goblin; he must announce a condition such as attacking the tallest goblin and fighting his way down according to size. Once stated, the character must follow through with this plan.\n&emsp;If the player cannot conceive a rationale for his character’s behavior, the character is forced to delay his actions for 1d6 rounds, with the time spent in preparation for the subsequent action. The character spends time arranging spell components artistically, deciding how to hold his sword, cleaning his weapon, etc.\n&emsp;Anyone affected by *compulsive order* may become violent if he is prevented from being neat. He will do what he must to make the world around him more orderly. If he is allowed to organize his surroundings, he will quickly calm down again. The victim will constantly petition the people around him to be neat and organized.\n&emsp;The victim is allowed a saving throw to avoid the effects of the spell. *Compulsive order* can be removed with a *dispel magic* spell.'
};

pri4['Defensive Harmony'] = {
    'level': '4',
    'school': 'Enchantment/Charm',
    'sphere': 'Law',
    'range': '5 yards',
    'duration': '[[1+2d4]] rounds',
    'aoe': '[[floor([[@{level-priest}]]/2) creatures',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 77',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell must be cast on at least two creatures. The priest may affect one creature per two levels of his experience, and all creatures to be affected must be within three feet of each other at the time of casting. After the spell is completed, affected characters may move about freely.\n&emsp;*Defensive harmony* grants affected creatures a defensive bonus by bestowing an enhanced coordination of their attacks and defenses. The affected creatures must be involved in a single battle so that their efforts harmonize to the benefit of all involved. For example, the affected creatures can attack one dragon or a group of orcs in a single area. They can also attack additional enemy forces that arrive in the same combat. If the enemy forces divide and flee, the affected creatures can follow, continue to attack, and benefit from the spell. If the affected group is split into two smaller groups when attacked, however, it gains no benefit from *defensive harmony*.\n&emsp;While the spell is in effect, each affected creature gains a +1 bonus to armor class for every other creature benefitting from the spell, to a maximum bonus of +5 (although more than five characters may be affected by the spell). Thus, if four creatures are affected by *defensive harmony*, each creature gains a +3 bonus to armor class.\n&emsp;This bonus represents a mystical coordination of effort on the part of all affected creatures. A fighter will naturally wage his attack to distract the troll attacking the thief. The ranger will instinctively block the swing of an orc, thereby protecting the wizard. Creatures affected by the spell are not consciously aware of these efforts, and they are unable to create specific strategies and tactics.'
};

pri4['Dimensional Folding'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Numbers',
    'range': '5 feet',
    'duration': '1 round',
    'aoe': '10-foot circle',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A sheet of platinum “tissue” worth at least 15 gp, which the priest folds intricately during the casting. The tissue is consumed when the gate closes.',
    'reference': 'p. 77',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the caster to selectively warp the fabric of space, folding it into higher dimensions.\n&emsp;This effect can be best explained through an example. If an ant crawling along the west edge of a map decided to travel to the east edge of the map, it would have to crawl the full width of the map. But if the map were folded in two so that the east and west edges were touching, the ant would travel almost no distance at all. The ant’s world (the map) would have been folded through the third dimension. The *dimensional folding* spell does something similar with the three-dimensional world: it folds it through a higher dimension (the fourth), allowing instantaneous travel between two locales on the same plane of existence.\n&emsp;Although this effect may seem similar to the wizard spell *teleport*, in practice, it is much different. The *dimensional folding* spell opens a gate that allows instantaneous, bidirectional access to a distant locale on the same plane. This gate is circular, of any size up to 10’ in diameter, and remains in existence for up to 1 full round. The caster and any other creatures can pass through the gate in either direction while it remains open. Missile weapons and magic spells can also pass through the gate.\n&emsp;The gate appears as a shimmering ring, glowing with a faint light equivalent to starshine. Vision through the gate is clear and unobstructed in both directions, allowing the priest to “look before he leaps.” However, anyone on the other side of the gate is able to see the priest and his point of origin.\n&emsp;The “near side” of the gate always appears within 5 feet of the priest. The location of the “far side” of the gate always opens within 5 feet of the place the priest desires. Thus, there is no chance of arriving at the wrong destination, as with the wizard spell *teleport*.\n&emsp;There is a risk involved in using *dimensional folding*, however. Many philosophers believe that what we know as time is simply another dimension, and the behavior of this spell seems to support this thesis. Unless the priest is extremely familiar with the destination, there is a significant chance that any creature passing through a *dimensional folding* gate will suffer instantaneous aging. Theorists believe that this is the same kind of “slippage” that can cause a *teleporting* wizard to land high or low, except that in this case, the slippage is in the time dimension.\n&emsp;The chance of this instantaneous aging occurring depends on how familiar the priest is with the destination. The table that follows outlines the conditions and effects of aging.}}{{style=bottom2 sheet-spell-center2 sheet-spell-bottom3 sheet-spell-center3}}{{cc1-1=bottom}}{{c1-1=**Destination is:**}}{{c2-1=Very familiar*}}{{c3-1=Studied carefully}}{{c4-1=Seen casually}}{{c5-1=Viewed once}}{{c6-1=Never seen}}{{c1-2=**Chance of**\n**aging**}}{{c2-2=2%}}{{c3-2=5%}}{{c4-2=10%}}{{c5-2=15%}}{{c6-2=25%}}{{c1-3=**Amount of**\n**aging**}}{{c2-3=1 year}}{{c3-3=1d2 years}}{{c4-3=1d3 years}}{{c5-3=1d6 years}}{{c6-3=1d10 years}}{{effects2=&emsp;* Use this row if the desired location is within view of the priest.\n\n&emsp;If the die roll indicates that aging occurs, every creature that passes through the gate in either direction suffers the aging effect. Multiple creatures passing through the gate in the same direction all age by the same amount determined by a single die roll. Although the chance of aging is low and the potential amount of aging is minimal for familiar destinations, the effects can add up and become significant over time.\n&emsp;Although the word “destination” is used to refer to the “far end” of the gate, the priest need not be the one doing the traveling. For example, a priest may open the gate near a distant ally so he may travel instantaneously to join the priest.'
};

pri4['Fire Purge'] = {
    'level': '4',
    'school': 'Abjuration',
    'sphere': 'Wards',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '10-yard square/priest',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a scorched sliver of wood.',
    'reference': 'p. 78',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'An area enchanted with *fire purge* is protected against all types of normal and magical fires. Normal fires (including camp fires, torches, and oil fires) cannot burn in the area of effect. Magical fires (including fiery dragon breath, other creature-generated fires, and spell-related fires such as *burning hands* and *fireball*) cause only 50% of their normal damage. Additionally, creatures within the area of effect receive a +4 bonus to saving throws made vs. fire attacks, regardless of whether the attacks originate inside or outside the warded area.\n&emsp;*Fire purge* has no effect on fires that are within the area of effect when the spell is cast, (i.e., it does not extinguish existing fires).\n&emsp;*Fire purge* can be cast as cooperative magic. If a number of priests cast this spell simultaneously, its effectiveness is significantly increased. The duration of the spell is then equal to 1 turn per level of the most powerful priest plus 1 turn for every other contributing priest. The area of effect is a square whose sides equal the number of priests times 10 yards (thus, six priests could create a 60-yard by 60-yard square of protection).'
};

pri4['Focus'] = {
    'level': '4',
    'school': 'Invocation',
    'sphere': 'All',
    'range': '10 feet',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 day',
    'saving-throw': 'None',
    'materials': 'Many, including special vestments, incense, oils, waters, and other equipment the DM deems appropriate. The cost of these materials is never less than 1,000 gp plus 100 gp per level of spell being amplified. These items are given up as offerings to the deity (perhaps to be distributed to the poor), and new ones must be obtained each time the spell is cast.',
    'reference': 'p. 79',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates the necessary conditions for devotional energy to be used. For faith magic to work, the priest must create a focus to harness the necessary devotional energy. This spell creates that focus. *A focus cannot function without a source of devotional energy*.\n&emsp;The focus gathers devotional energy and reshapes it in order to amplify other spells cast by the priest (or priests). The same energy keeps the focus in existence. If the spell is cast and there is no immediate source of devotional energy within 100 feet, the *focus* immediately fails.\n&emsp;Once created, most foci cannot be moved. This condition and the need for a constant supply of devotional energy tends to limit the use of foci to temples, churches, monasteries, shrines, and seminaries--permanent structures where followers of the religion gather on a regular basis. Sometimes a focus is created for a special gathering such as a holy day, conclave, grand wedding, or yearly festival.\n&emsp;Not all foci are identical. The particular form of the focus depends on the power and nature of the spell being amplified. All foci can be seen by *detect magic*. There are three basic types of foci: site, item, and living.\n&emsp;**Site foci** are connected to a place, whether a room, building, field, or forest. Once cast, the foci cannot be moved. It causes no disturbance in the surroundings; it is invisible and intangible.\n&emsp;**Item foci** are centered on a single object. Customarily, this object is large and immovable, such as an altar, but it is possible for the focus to be as small as is practical. The item can be as elaborate or plain as desired, but should have some significance to the religion.\n&emsp;**Living foci** are the rarest of all types. In this case, the focus is created on a living plant, animal, or person. *Detect charm* reveals the person is somehow enchanted, although not under the influence of a typical charm spell.\n&emsp;The type of focus created (site, item, or living) depends on the religion and nature of the spell amplified. These choices are listed in Table 3: Focused Spell Effects.\n&emsp;Casting the *focus* spell is a long and complicated process, accompanied by many ceremonies and rituals. During the day spent casting the spell, the priest will need the assistance of at least two other priests of the same faith. These aides need not memorize the spell (or even be capable of casting it). Their duty is to provide the extra hands and voices needed at specific points of the casting. A large number of worshipers must also be present since the focus requires their energy. Not surprisingly, the casting of this spell is often incorporated into important holy festivals or special occasions.\n&emsp;The duration of the focus is one year. If the devotional energy falls below a minimum level, the spell ends sooner. A focus requires the devotional energy of at least 100 devout worshipers. Lay monks (those dedicated to the religion but not priests) count as two worshipers, while priests (of any level) count as ten. A focus could be maintained by a congregation of 100, a monastery of fifty, or a seminary of as few as 10 priests (or any combination of the above). The focus must receive this energy for at least 10 hours out of every day. If these conditions are not met, the focus weakens. The area of effect of the amplified spell decreases by 20% each day until it fades away completely.\n&emsp;Once the focus is created, the priest or priests have 1 turn in which to cast the desired spell upon the focus. A focus can amplify only one spell, and each item, creature, or place can receive only one focus. Spells that can be cast upon a focus are listed on Table 3.\n\n**Table 3: FOCUSED SPELL EFFECTS**}}{{style=bottom2 sheet-spell-center2}}{{cc1-1=bottom}}{{c1-1=**Spell**}}{{c2-1=*Anti-animal shell*}}{{c3-1=*Anti-plant shell*}}{{c4-1=*Bless*}}{{c5-1=*Control temperature, 10’ radius*}}{{c6-1=*Control winds*}}{{c7-1=*Cure disease*}}{{c8-1=*Cure blindness or deafness*}}{{c9-1=*Detect poison*}}{{c10-1=*Detect lie*}}{{c11-1=*Detect magic*}}{{c12-1=*Dispel evil*}}{{c13-1=*Endure cold/endure heat*}}{{c14-1=*Know alignment*}}{{c15-1=*Negative plane protection*}}{{c16-1=*Protection from evil*}}{{c17-1=*Protection from lightning*}}{{c18-1=*Protections from fire*}}{{c19-1=*Purify food and drink*}}{{c20-1=*Remove fear*}}{{c21-1=*Remove curse*}}{{c22-1=*Repel insects*}}{{c23-1=*Resist fire/resist cold*}}{{c24-1=*Speak with animals*}}{{c25-1=*Tongues*}}{{c26-1=*True seeing*}}{{c1-2=**Possible**\n**Focus**\n**Type**}}{{c2-2=S/I/L}}{{c3-2=S/I/L}}{{c4-2=S/I}}{{c5-2=S&ast;}}{{c6-2=S/I&ast;}}{{c7-2=I/L}}{{c8-2=I/L}}{{c9-2=S/I}}{{c10-2=I}}{{c11-2=I}}{{c12-2=S/I}}{{c13-2=S&ast;}}{{c14-2=I/L}}{{c15-2=S/I}}{{c16-2=S/I}}{{c17-2=S}}{{c18-2=S}}{{c19-2=I}}{{c20-2=S/I/L}}{{c21-2=I}}{{c22-2=S/I}}{{c23-2=S}}{{c24-2=S/I/L}}{{c25-2=S/I}}{{c26-2=S}}{{effects2=*&ast; The caster must state a desired range (temperature, wind strength, etc.) within the spell’s normal limitations at the time it is cast.*\n\n&emsp;Once the spell is cast, the normal duration and area of effect for that spell are ignored. The focus begins to increase these factors of the spell’s power. After one day, the amplified spell reaches its full area of effect. Thereafter, it remains over that area until the focus fails.\n&emsp;The area affected by the focus (and its amplified spell) depends on the level of the caster. The spell expands in a radius from the focus, 20 feet per level of the caster, although it can deliberately be created smaller. Currently up to [[20*[[@{level-priest}]] ]] foot diameter. Within that area of effect, the amplified spell exerts its normal effect. A 13th-level priest could create a focus up to 260 feet in diameter.'
};

pri4['Fortify'] = {
    'level': '4',
    'school': 'Necromancy',
    'sphere': 'Healing',
    'sphere-necromancers': ', Necromantic',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol.',
    'reference': 'p. 80',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This is a simple cooperative magic spell. Only one priest can cast the spell, but like *mystic transfer*, another priest is required for the spell to have any effect. Through this spell, the priest improves the quality of another priest’s healing spells.\n&emsp;For the *fortify* spell to work, it must be cast simultaneously with a *cure light wounds*, *cure serious wounds*, or *cure critical wounds*. The priest casting *fortify* must lay his hand on the priest attempting the cure. When both spells are cast, additional energy flows through the second priest and into the creature being healed. *Fortify* automatically causes the cure spell to function at maximum effect. Thus, a *cure serious wounds* would automatically heal 17 points of damage and a *cure critical wounds* would heal 27 points of damage.'
};

pri4['Genius'] = {
    'level': '4',
    'school': 'Divination',
    'sphere': 'Thought',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'Caster',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A gem of at least 50 gp value.',
    'reference': 'p. 80',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to *idea*, except that the priest’s player can ask the DM one question about any event occurring at the moment. The question must be somehow related to evaluation of the current situation, such as “What are these monsters?” Speculation about the future, such as “What’s on the other side of the door?” is not permitted.\n&emsp;As with *idea*, the DM must be careful in adjudicating this spell. The answer to the question should always be relevant and correct, although not necessarily complete, and should not be unbalancing to the situation. The answer can also be cryptic, in the form of a riddle or rhyme, depending on the DM’s assessment of the situation. In general, the answer will be a single word or a short phrase of no more than five words.\n&emsp;This spell can be cast only once in any 12-hour period. Subsequent attempts to cast the spell result in no answer.'
};

pri4['Inverted Ethics'] = {
    'level': '4',
    'school': 'Enchantment/Charm',
    'sphere': 'Chaos',
    'range': '120 yards',
    'duration': '1 turn',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': 'A miniature golden balance (i.e., similar to the scales of justice).',
    'reference': 'p. 80',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell reverses the ethics of a person or group of people. While under the influence of this spell, a creature behaves in a manner opposite to the way he normally would behave. Thus, a shopkeeper influenced by *inverted ethics* will think it perfectly normal for someone to pick up an item from his shop and walk out the door without paying for it. If someone tried to pay for an item, he would be insulted. If the spell is cast on a shopper in a store, he would find it natural to steal the item, thinking that he is behaving in a proper way. If the spell is cast on a professed thief, he will no longer steal, choosing to pay for his goods instead.\n&emsp;*Inverted ethics* does not cause a creature to actively commit evil deeds (or good deeds). Thus, an affected creature will not go on a shoplifting rampage; he will steal only as the opportunity presents itself.\n&emsp;The spell affects one character per level of the caster within a 20’ radius. Currently [[@{level-priest}]] characters. Each target of the spell is allowed a saving throw vs. spell to avoid the effect.'
};

pri4['Join With Astral Traveler'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Astral',
    'range': '0',
    'duration': 'Special',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 81',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a priest casts the 7th-level *astral spell*, he leaves his physical body in suspended animation while his astral body travels. By touching the comatose body and casting *join with astral traveler*, a priest can cause his own astral body to leave his physical body in suspended animation. His astral body then travels along the silver cord of the originally projected priest. The caster joins the projected priest as if he were part of the original casting of the *astral spell*; i.e., his own silver cord is connected to the priest’s silver cord, and he is dependent upon the originally projected priest.\n&emsp;A priest who casts the 7th-level *astral spell* can project as many as seven other creatures along with himself. However, priests casting *join with astral traveler* are an exception to this limit. Any number of priests may join another priest in the Astral plane by use of this spell.'
};

pri4['Leadership'] = {
    'level': '4',
    'school': 'Enchantment/Charm, Alteration (Reversible)',
    'sphere': 'War',
    'range': 'Special',
    'duration': 'Special',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': '*Variation 1:* This variation is a pinch of steel dust. *Variation 2:* The priest’s holy symbol.',
    'reference': 'p. 81',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can be cast in one of two variations. The first, appropriate for battlefield use, has a range of 240 yards, duration of 1d4+6 turns, and a casting time of 1 turn. The priest can cast the spell on any single individual (a commander or hero) within his line of sight.\n&emsp;While under the influence of this spell, the subject’s command radius is increased by 50% (round fractions up).\n&emsp;The reverse of this variation, *doubt*, requires the target to make a saving throw vs. spell. If failed, *doubt* halves the command radius (round fractions down) of the targeted individual for 1d3+4 turns.\n&emsp;The second variation must take place in or within 100’ of a place of worship officially dedicated to the casting priest’s deity. Both the priest and the individual to be affected must be present. The casting time is 5 turns and involves an intricate ritual and many prayers. At the conclusion of the spell, the subject’s command radius is doubled. This effect lasts 2d12 hours.\n&emsp;The priest can cast either aspect (but not both at once) on himself. No individual can be the subject of more than one casting of this spell at one time, whether different aspects or cast by different priests. If more than one spell is attempted on the individual, only the most recent casting takes effect.'
};

pri4['Mental Domination'] = {
    'level': '4',
    'school': 'Enchantment/Charm',
    'sphere': 'Thought',
    'range': '50 yards',
    'duration': '[[3*[[@{level-priest}]] ]] rounds',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A mesh of fine threads that the priest loops around the fingertips of one hand and manipulates in the way that a puppeteer controls a puppet.',
    'reference': 'p. 81',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to the wizard spell *domination* in that it establishes a telepathic link between the priest and the subject through which the priest can control the subject’s bodily movements. There are some significant differences between the spells, however.\n&emsp;Elves and half-elves have no innate resistance to this spell. Priest and subject need not share a common language. The priest can force the subject into combat, but the subject’s attack rolls suffer a -2 penalty. The priest cannot force the subject to cast spells or use any innate magical or magiclike abilities. The priest can force the subject to speak, although the priest cannot inject a full range of emotions into the subject’s voice (everything said by the subject is in a monotone).\n&emsp;This spell gives the priest no access to the subject’s thoughts, memory, or sensory apparatus. Thus, the priest cannot see through the subject’s eyes. To control the subject, the priest must be within the range of the spell *and* must be able to see the subject. Breaking either of these conditions causes the spell to terminate immediately.\n&emsp;This spell requires a moderate level of concentration by the priest. While maintaining this spell, he can move or enter combat, but cannot cast another spell. If the priest is wounded, rendered unconscious, or killed, the spell immediately terminates.\n&emsp;If the priest is 10th level or lower, he or she cannot force the subject to perform particularly delicate actions, such as picking a lock. At 11th level or higher, however, this restriction is removed. The priest could thus force a thief to pick a lock. Any such delicate actions suffer a -15% penalty (or -3 on 1d20) to reflect the “remote control” nature of the action.'
};

pri4['Modify Memory'] = {
    'level': '4',
    'school': 'Enchantment/Charm',
    'sphere': 'Time',
    'sphere-spells&magic': 'Thought',
    'range': '30 feet',
    'duration': 'Permanent',
    'aoe': 'One creature',
    'components': 'V, S',
    'cast-time': 'Special',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 83',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to reach into the subject’s mind and modify up to five minutes of his memory in one of the following ways:\n&emsp;•Eliminate all memory of an event the subject actually experienced. This spell cannot negate *charm*, *suggestion*, *geas*, *quest*, or similar spells.\n&emsp;•Allow the subject to recall with perfect clarity an event he actually experienced. For instance, he could recall every word from a five-minute conversation or every detail from a passage in a book.\n&emsp;•Change the details of an event the subject actually experienced.\n&emsp;•Implant a memory of an event the subject never experienced.\n\n&emsp;Casting the spell takes one round. If the subject fails to save vs. spell, the caster proceeds with the spell by spending up to five minutes visualizing the memory he wishes to modify in the subject. If the caster’s concentration is disturbed before the visualization is complete, the spell is lost.\n&emsp;*Modified memory* will not necessarily affect the subject’s actions, particularly if they contradict his natural inclinations. An illogical *modified memory*, such as the subject recalling how much he enjoyed drinking poison, will be dismissed by the subject as a bad dream or a memory muddied by too much wine. More useful applications of *modified memory* include implanting memories of friendly encounters with the caster (inclining the subject to act favorably toward the caster), changing the details of orders given to the subject by a superior, or causing the subject to forget that the caster cheated him in a card game. The DM reserves the right to decide whether a *modified memory* is too nonsensical to significantly affect the subject.'
};

pri4['Probability Control'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Numbers',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A small cube of a thickened sugar-and-milk mixture and a cubic die of matching size. Both are consumed in the casting.',
    'reference': 'p. 83',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the priest to increase or decrease by a small margin the probability of success for one action. This action can be anything that requires a die roll--an attack, a saving throw, an attempt to use thieving skills, an ability check, or even an attempt to successfully *teleport* on target. The action *must* be something performed by a single creature.\n&emsp;The basic modification is 15% (15 on 1d100 or 3 on 1d20), plus an additional 5% per five levels of the caster. Currently +[[5*[[@{level-priest}]] ]]%. This modification can be either positive or negative, as deemed by the spellcaster. Thus, a 10th-level priest can modify a subject’s saving throw or attack roll by +5 or -5, or a thief’s “climb walls” roll by +25% or -25%. The priest may cast this spell on himself.\n&emsp;For a noncombat action such as an attempt to climb a wall, the priest simply casts the spell on the subject immediately before the action is attempted, informing the DM whether the modification is positive or negative. To use this spell in combat, the priest must specify the action to be affected (e.g., the target’s next attack roll) and whether the modification will be positive or negative. The spell remains in effect until the subject attempts the specified action or until a number of rounds equal to the caster’s level passes. Currently [[@{level-priest}]] rounds. If the latter occurs, the spell ends without effect.\n&emsp;Once the spell is cast, the priest does not need to maintain any level of concentration; the spell will function even if the casting priest is killed before the spell takes effect.\n&emsp;The subject of the spell has no way of knowing whether any modification made by this spell is positive or negative (or even whether he was the subject of the spell at all). Thus, a lying priest could claim to raise a thief’s chance of climbing the wall, while actually lowering it. The thief would be none the wiser. However, an unwilling subject of this spell receives a normal saving throw to negate its effect.'
};

pri4['Rapport'] = {
    'level': '4',
    'school': 'Divination, Alteration',
    'sphere': 'Thought',
    'range': '30 yards',
    'duration': '1 turn+[[@{level-priest}]] rounds',
    'aoe': 'One creature',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 84',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is a deeper and more intense version of *telepathy*. It allows the priest to communicate silently and instantly with a single willing subject. Participants may share deeper thoughts than with *telepathy*, including emotions and memories. Each participant sees, hears, and otherwise senses everything experienced by the other, although such vicarious experiences feel diluted and cannot be mistaken for direct sensations.\n&emsp;The participants can quickly share such personal concepts as plans, hopes, and fears, but they *cannot* share skills or spells. Thus, it is impossible to communicate the procedure for casting a particular spell or for picking a lock.\n&emsp;Communication through *rapport* is approximately 15 times faster than verbal communication. As with *telepathy*, the priest can establish separate “channels” to multiple individuals; each such linkage costs one casting of the spell. There is no “crosstalk” between the channels, however.\n&emsp;*Rapport* cannot be used on unwilling subjects.'
};

pri4['Solipsism'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Thought',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': 'Special',
    'aoe': '[[100+100*[[@{level-priest}]] ]] square feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'A lotus blossom that the priest must swallow and a bit of fleece.',
    'reference': 'p. 84',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This unusual spell is similar to *phantasmal force* and other illusion magic, except that the priest who casts the spell is the only creature who automatically believes the results of the spell. The spell creates the illusion of any object, creature, or force, as long as it is within the boundaries of the spell’s area of effect. The illusion is visual and tactile (that is, it can be seen and felt), but no other sensory stimuli are created.\n&emsp;*Solipsism* is the opposite of normal illusions in that anyone other than the caster must make an active effort to *believe* (rather than *dis*believe) the illusion. Characters trying to believe the reality of a solipsistic illusion must make a saving throw vs. breath weapon, modified by the magical defense adjustment for Wisdom. A successful save means that the character believes the illusion and it is part of reality for him. A failed save means that the character cannot convince himself of the illusion’s reality, and the illusion has no effect on him. A character can make a single attempt to believe each round.\n&emsp;Unlike true illusions, the image created by this spell does more than just duplicate reality. The image formed is *real* for those who believe in it. The illusion has all the normal properties that its form and function allow. Thus, a solipsistic bridge spanning a chasm could be crossed by the priest and those who believed. All others would see the priest apparently walking out onto nothingness. Likewise, a solipsistic giant would cause real damage to those who believed it.\n&emsp;The illusion remains in effect for as long as the priest continues to concentrate on it, until the priest is struck in combat, or until he is rendered unconscious. The level of concentration required is not extreme; the priest can move normally and may engage in combat, but is unable to cast any spell while maintaining a *solipsistic* illusion.\n&emsp;*Solipsism* can create only illusions that are external to the priest. Thus, the priest cannot create an illusion that he is the size of a giant, is unwounded, or has sprouted wings.'
};

pri4['Tanglefoot'] = {
    'level': '4',
    'school': 'Alteration, Abjuration (Reversible)',
    'sphere': 'War',
    'range': '240 yards',
    'duration': '[[2*[[@{level-priest}]] ]] turns',
    'aoe': '[[100*[[@{level-priest}]] ]] square yards',
    'components': 'V, S, M',
    'cast-time': '2 turns',
    'saving-throw': 'None',
    'materials': 'A drop of molasses for *tanglefoot*, and a pinch of powdered graphite for *selective passage*.',
    'reference': 'p. 85',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell temporarily doubles the movement cost of one region of ground. Units allied to the priest are unaffected and movement is made at normal cost; only enemy units suffer the penalty.\n&emsp;A variety of effects result from the spell depending on the terrain: grass twists hinderingly around troops’ ankles, swamp becomes more viscous, rocks and gravel shift underfoot, etc.\n&emsp;The spell affects only units--that is, groups of soldiers moving in regular or irregular formation. The spell does not affect individuals or monsters moving and operating alone. (When using the BATTLESYSTEM rules, figures that represent individual heroes are not affected by this spell.)\n&emsp;When casting this spell, the priest must have an uninterrupted line of sight to the terrain to be affected. The priest can choose the shape of the area, up to the maximum area of effect. This spell can create only one continuous area of *tanglefoot*. There is no way of detecting that a particular area is under the influence of this spell simply by looking at the area. *Detect magic* will reveal that the area is magically affected.\n&emsp;The reverse of this spell, *selective passage*, cuts the movement cost of an area in half (round fractions up) for friendly units. Again, individual heroes and creatures are not affected by this spell (which means that advancing troops must be careful not to leave their leader behind!).'
};

pri4['Thought Broadcast'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Thought',
    'range': '30 yards',
    'duration': '1 turn+[[3*[[@{level-priest}]] ]] rounds',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'Small balloon that the priest inflates upon casting. This balloon is consumed in the casting.',
    'reference': 'p. 85',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell turns the subject into a “thought broadcaster.” For the duration of the spell, everyone within 30 yards of the subject senses the subject’s thoughts, making it impossible for him to lie, keep secrets, conceal motives, etc. The subject is not automatically aware that his thoughts are being sensed. Everyone who senses these thoughts, on the other hand, knows their source.\n&emsp;This spell causes the broadcast of only surface thoughts and motivations, not memories. There is no need for a common language between broadcaster and receivers; for this purpose, thoughts are considered to be symbolic, not dependent on language. The detail level of the thoughts is insufficient for others to learn specific skills from the subject. Thus, if the subject casts a spell, everyone within range knows what spell is being cast before it takes effect, but no one learns any knowledge about how the spell is cast.\n&emsp;If the broadcaster is *invisible* or hiding in shadows, the broadcast functions normally, and all receivers are aware that someone is in the vicinity whom they cannot see. While receivers cannot pinpoint the broadcaster’s location, the broadcaster’s thoughts will inevitably reveal his general position (“Oh no, he’s looking right at me,” etc.). A character hiding in shadows will be automatically detected, while attacks against an *invisible* broadcaster suffer a -2 penalty, rather than the normal -4. This spell totally negates the chance of surprise by the broadcaster.\n&emsp;The subject must have an Intelligence score of 1 or more to become a broadcaster, and must have a “normal” mind as understood by PCs. Thoughts that are broadcast can be received only by individuals with Intelligence scores of 3 or better. An unwilling subject receives a normal saving throw vs. spell to avoid the effects. A willing subject can waive this saving throw.'
};

pri4['Tree Steed'] = {
    'level': '4',
    'school': 'Alteration, Enchantment/Charm',
    'sphere': 'Travelers',
    'range': '10 yards',
    'duration': '[[@{level-priest}]] hours',
    'aoe': 'One log or plank',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A log or plank of suitable size and a horseshoe.',
    'reference': 'p. 86',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enchants a log, plank, or similar piece of wood to become a temporary steed. The log or plank must be at least one foot wide, three inches thick, and three to ten feet long. Any type of wood is suitable.\n&emsp;When the spell is cast, the log sprouts four wooden, horselike legs. The *tree steed* may be ridden like a normal horse and may be used to carry equipment. The *tree steed* can carry up to 600 pounds of riders and gear before breaking. If the *tree steed* breaks under the weight of the riders or gear, the enchantment instantly ends and the *tree steed* again becomes a normal (although broken) log or plank.\n&emsp;The *tree steed* obeys all of the caster’s verbal commands to move, slow, speed up, stop, and turn. It has a movement rate of 12 on land. It can move in the water (Sw 6), floating on the surface and paddling with its legs. The *tree steed* must remain within 10 yards of the caster in order to move; if the distance between the *tree steed* and the caster exceeds 10 yards, the *tree steed* stops until the caster is again within range.\n&emsp;The *tree steed* will not fight for the caster and is incapable of any action other than movement. The *tree steed* does not become fatigued and does not eat. It has all the vulnerabilities of normal wood, including fire, and can be damaged by both magical and physical attacks. It has AC 8 and 20 hit points.'
};

pri4['Uplift'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'All',
    'range': '0',
    'duration': '1 turn',
    'aoe': 'One priest',
    'components': 'V, M',
    'cast-time': '12 hours',
    'saving-throw': 'None',
    'materials': 'The priests’ holy symbols and an offering worth at least 500 gp from each priest.',
    'reference': 'p. 86',
    'book': 'Tome of Magic',
    'damage': '[[2d6]] to the uplifted character',
    'damage-type': '',
    'healing': '',
    'effect': '*Uplift* bestows increased spellcasting ability on one priest, including additional spells per level and use of spells beyond the caster’s normal level. This cooperative spell requires two priests who must spend the day casting this spell. During the casting, the priests must decide which additional spells (of all levels) are desired. Upon completion of the casting, the priests touch palms, and the priest of higher level receives a charge of magical energy. This charge temporarily boosts the level of the priest for spellcasting purposes. The amount of increase is one level per five levels of the lower level caster (fractions rounded up). If both priests are of equal level, the casters must decide who benefits from the spell.\n&emsp;The spell grants the priest the spellcasting ability of the new level. It does not improve hit points, attack rolls, or other abilities. If the increase allows more spells per level, the additional spells are instantly placed in the character’s memory. A priest is also enabled to cast spells normally beyond his level. Range, duration, area of effect, and other variables are all based on the character’s temporary level.\n&emsp;The increased effect lasts only 1 turn. At the end of the turn, all additional spells are lost and the character reverts to his normal level.\n&emsp;As an example, consider a party with a fallen comrade. The two priests in the party are 7th and 8th level, both unable to cast *raise dead*. After a night’s rest, each priest adds *uplift* to his memorized spells. After casting the spell, the 8th-level priest suddenly gains the casting abilities of a 10th-level priest, including the ability to cast *raise dead*. At the end of one turn, the priest’s abilities revert to 8th-level.\n&emsp;Casting this spell is an arduous task, causing a severe drain on the priests. When the spell expires, the *uplift*ed character suffers 2d6 points of damage from mental exhaustion. This damage cannot be healed by any means until the character has had at least eight hours of rest.'
};

pri4['Weather Stasis'] = {
    'level': '4',
    'school': 'Abjuration',
    'sphere': 'Wards, Weather',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '[[10*[[@{level-priest}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a drop of rain.',
    'reference': 'p. 87',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Weather stasis* maintains the weather conditions prevalent in the area of effect when the spell is cast. The spell affects a cube whose sides equal the caster’s level times 10 feet (a 10th-level caster could affect a 100’ ✕ 100’ ✕ 100’ cube).\n&emsp;An area protected by *weather stasis* is unaffected by temperature variations in the surrounding environment. The spell also acts as a shield against rain, snow, and hail, which cannot enter the protected area. If conditions of precipitation existed in the area of effect when the spell was cast, the identical weather will continue for the duration of the spell.\n&emsp;For example, *weather stasis* is cast in an area where the temperature is 75° F. (24° C) and no precipitation is falling. Half an hour later, the temperature drops to 60 degrees and rain begins to fall. The protected area remains dry and the temperature stays at 75 degrees. If the spell had been cast while rain was falling in the area of effect, rain would continue to fall for the duration of the spell, even after it stopped raining in the surrounding area.\n&emsp;All physical objects other than rain, snow, and hail can pass into the protected area. All creatures and characters can move freely into and out of the area. The spell does not prevent water-based spells or water-based creatures (such as water elementals) from operating in the area.\n&emsp;The spell protects against both natural and magically generated weather. Night and day pass normally in the protected area, although temperature variations associated with night and day do not occur.'
};

pri5['Age Object'] = {
    'level': '5',
    'school': 'Alteration (Reversible)',
    'sphere': 'Time',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': '[[@{level-priest}]] cubic feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '*Age Object:* A flask of seawater and a piece of coal. *Youthful Object:* A piece of eggshell and a hair from the head of a human or humanoid infant.',
    'reference': 'p. 87',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the caster can cause an amount of nonliving, nonmagical matter to age dramatically. Matter can be aged up to 20 years per level of the caster. Currently up to [[2+*[[@{level-priest}]] ]] years. The following table gives typical results of 100 years of aging for various objects, arranged in order of descending severity:}}{{c1-1=**Object**}}{{c2-1=diamond}}{{c3-1=silver}}{{c4-1=masonry}}{{c5-1=iron}}{{c6-1=parchment}}{{c7-1=wood}}{{c1-2=**Result of Aging**}}{{c2-2=none}}{{c3-2=becomes tarnished}}{{c4-2=cracks and weakens}}{{c5-2=rusts and corrodes}}{{c6-2=cracks, turns brittle}}{{c7-2=rots, crumbles, turns to sawdust}}{{effects2=&emsp;The caster controls the extent of the aging; thus, he could age a book so its pages become yellowed and brittle but stop short of causing the book to crumble to dust. As a guideline, each additional 100 years of aging causes an increasingly severe reaction. Thus, after 200 years, parchment might become little more than powder, while iron might begin to flake away at a touch.\n&emsp;Many items (especially gems) show little reaction to age. The DM must adjudicate all effects.\n&emsp;The reverse of this spell, *youthful object*, returns an object ravaged by the effects of time to its original condition; thus, rusty iron becomes strong and shiny, crumbled masonry becomes firm, and rotten wood becomes solid. The age of matter can be reduced by 20 years per level of the caster.'
};

pri5['Barrier of Retention'] = {
    'level': '5',
    'school': 'Abjuration',
    'sphere': 'Wards',
    'range': 'Special',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[10*[[@{level-priest}]] ]] foot cube',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'Negate',
    'materials': 'A small cage made of silver wire. The caster must walk around the perimeter of the area of effect when casting.',
    'reference': 'p. 88',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a one-way invisible force field around the area of effect. The spell creates one 10’ ✕ 10’ ✕ 10’ cube for every level of the caster. These can be arranged into any rectangular shape the caster desires.\n&emsp;Intruders entering the protected area suffer no ill effects, but the *barrier of retention* prevents them from leaving. The spell affects all creatures who fail a saving throw vs. spell. The caster can pass in and out of the barrier freely.\n&emsp;Intruders trapped by the *barrier of retention* can cast spells out of the barrier and can use spells such as *teleport* to escape the protected area. Objects cannot be hurled out of the barrier but can be carried out by an escaping creature. *Dispel magic* and similar spells negate the *barrier*.'
};

pri5['Blessed Abundance'] = {
    'level': '5',
    'school': 'Conjuration',
    'sphere': 'Creation',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '[[@{level-priest}]] cubic feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol.',
    'reference': 'p. 88',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows a priest to duplicate a specified amount of animal or vegetable matter. Magical items and minerals (including rocks, metals, and gemstones) cannot be duplicated. Although organic materials (such as food or living plants) can be duplicated, living creatures cannot be copied by this spell.\n&emsp;The caster can create 1 cubic foot of material per his experience level. The material to be duplicated must be equal to or less than 1 cubic foot in size or volume. For example, a 9th-level priest can create up to 9 cubic feet of animal or vegetable matter. Using a loaf of bread 1 cubic foot in size, he can produce nine such loaves; using a bucket of apples totaling 1 cubic foot in volume, he can create nine such buckets.'
};

pri5['Champion\'s Strength'] = {
    'level': '5',
    'school': 'Alteration',
    'sphere': 'Law',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A chain of five gold links worth at least 1,000 gp.',
    'reference': 'p. 88',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Champion’s strength* bestows one member of a group with attack and damage bonuses from the rest of the group. The recipient of the spell can then fight as the group’s champion.\n&emsp;The spell draws bonuses from one person for every two levels of the priest. Currently [[floor([[@{level-priest}]]/2)]] persons. All characters involved must be within a 30’-radius of the priest. At the time of casting, the priest designates the recipient of the spell and the contributors. All characters who contribute to the spell must do so willingly.\n&emsp;When the spell is completed, the designated character (the group’s champion) gains any non-magical bonuses to THAC0 and damage possessed by the characters who contributed to the spell. Characters without bonuses or with combat penalties could conceivably be included in the spell; such characters count against the maximum number of creatures that can be affected. Penalties are likewise applied to the champion; contributors to this spell must be chosen carefully.\n&emsp;The bonuses gained through this spell are added to the character’s own bonuses (if any). The champion channels the energy of others through himself, improving his fighting ability.\n&emsp;The champion must be in the line of sight and within 30 feet of the characters aiding him. Characters who contribute their bonuses must concentrate on the champion for the duration of the spell. If this concentration is broken (by moving more than 10 feet per round, fighting, being struck, or losing sight of the champion), that character’s contribution is immediately lost.\n&emsp;The spell expires when the last character contributing power to the champion ceases concentration.\n&emsp;A champion may benefit from only one *champion’s strength* spell at one time. Contributors can aid only one champion at one time.'
};

pri5['Chaotic Commands'] = {
    'level': '5',
    'school': 'Enchantment/Charm',
    'sphere': 'Chaos',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Special',
    'materials': 'A piece of eelskin.',
    'reference': 'p. 89',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Chaotic commands* renders a creature immune to magical commands. *Taunt, forget, suggestion, domination, geas, demand, succor, command, enthrall, quest, exaction*, and other spells that place a direct verbal command upon a single individual automatically fail.\n&emsp;In addition, anyone casting one of these spells on a creature protected by *chaotic commands* must save vs. spell. Failure means that the caster must obey his own magic; the spell’s effect has backfired on the caster.'
};

pri5['Clear Path'] = {
    'level': '5',
    'school': 'Alteration (Reversible)',
    'sphere': 'Travelers',
    'range': '0',
    'duration': '[[@{level-priest}]] hours',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '*Clear Path:* A knife blade and a straw from a broom. *Clutter Path:* A handful of pebbles and a handful of weeds.',
    'reference': 'p. 89',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell clears away weeds, stones, and other debris in a 10-foot-wide path extending 10 feet in front of the caster. The caster can create a continuous path for the duration of the spell, clearing a 10-foot-square ahead of him as long as he continues to move forward. The spell affects jungles, forests, rocky ground, and snow.\n&emsp;The result of the cleared path is that movement costs are reduced by half. This is reflected in a reduction of the penalty against movement in rough terrain. (See Table 74 of the *Dungeon Master’s Guide* for terrain costs for movement.) For example, if *clear path* is used in heavy jungle, the movement cost is reduced from 8 to 4. In no case can *clear path* reduce movement cost below 1.\n&emsp;*Clear path* has no effect on rivers, lakes, or other bodies of water, nor does it affect quicksand, lava, or similar natural obstacles. It also has no effect on magically-created terrain or manmade barricades.\n&emsp;A priest using the *clear path* spell can be tracked easily. Tracking proficiency is not required.\n&emsp;The reverse, *clutter path*, causes weeds, small stones, and similar debris to litter a 10-foot path extending 10 feet behind the caster. This hides a trail, making tracking more difficult. The caster can create a continuous path for the duration of the spell. The chance to successfully track on a cluttered path is reduced by 50%.'
};

pri5['Cloud of Purification'] = {
    'level': '5',
    'school': 'Evocation',
    'sphere': 'Elemental (Air, Water)',
    'sphere-spells&magic': 'Elemental (Air)',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '20-foot cube',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 89',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a billowy cloud of magical vapors that moves in the direction of the prevailing wind at a rate of 20 feet per round. A strong wind (greater than 15 miles per hour) breaks it up in 4 rounds, and a greater wind (25 MPH or more) prevents the use of the spell. Thick vegetation disperses the cloud in 2 rounds.\n&emsp;The *cloud of purification* transmutes organic filth, garbage, and vermin (mice, rats, rot grubs, and so on) into an equal quantity of pure water. For example, a nest of rot grubs caught in the cloud would “melt,” becoming small puddles of clean water. If the spell is cast over a body of water, the cloud merges with a portion of the water equal to its own size, transmuting any filth, microbes, small fish, or other “impurities” into clean water.\n&emsp;The cloud’s vapors are heavier than air, so they sink to the lowest level of the land (even down holes in the ground). Thus, this spell is perfect for cleansing a sewer or well.\n&emsp;This spell in no way affects magical creatures or creatures larger than a normal rat.'
};

pri5['Consequence'] = {
    'level': '5',
    'school': 'Divination',
    'sphere': 'Numbers, Divination',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Three special coins or dice made of platinum (total value of at least 1,000 gp), which the priest tosses in his hand while concentrating on the spell. The coins or dice are not consumed in the casting.',
    'reference': 'p. 89',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the priest to determine how one recent event fits into the “grand scheme.” By casting this spell, the priest can determine whether the sequence or situation that gave rise to the specific event is complete or whether it is ongoing; whether it was a significant or insignificant event in the larger picture; or whether it will continue to have repercussions for the participants.\n&emsp;Using his knowledge of circumstances, the DM communicates these facts to the caster’s player. This “arcane message” is normally straightforward and easy to understand, but in the case of highly complex circumstances, the message might be cryptic. In any case, the message will always be truthful.\n&emsp;As an example, consider a priest and his party who are on a holy quest to retrieve an item of power. On the way to the location of this item, the party is ambushed by evil creatures from the Inner Planes but manages to defeat them. Concerned that these creatures might be outlying guards protecting the item of interest, the priest casts *consequence*, hoping for guidance. The DM knows that these creatures have nothing to do with the quest; the encounter was coincidental. However, the surviving monsters will soon be returning with reinforcements to avenge their dead. Therefore, the DM tells the priest’s player, “To your goals these have no place, but still they can cause more woe.”\n&emsp;Casting this spell “taints” subsequent castings of the same spell within a 24-hour span. A second attempt within this period always results in the same message as the first, regardless of the true situation. If a second priest casts the spell within 24 hours of another casting, he receives an accurate reading.'
};

pri5['Disguise'] = {
    'level': '5',
    'school': 'Illusion/Phantasm',
    'sphere': 'War',
    'range': '200 yards',
    'duration': '[[floor([[@{level-priest}]]/3)]] turns',
    'aoe': 'One unit up to 300 individuals',
    'components': 'V, S, M',
    'cast-time': '2 turns',
    'saving-throw': 'None',
    'materials': 'A fine silk veil and a length of woven platinum wire. The wire is consumed during the casting.',
    'reference': 'p. 90',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell changes the appearance of a single unit so it resembles another unit. The *disguise* can cause the affected creatures to appear to be of another class, nationality, rank, race, alignment, or military affiliation (i.e., a unit from one army may appear wearing the armor and carrying the colors of another army). *Disguise* cannot change the size category of the unit’s members. Thus, a unit of humans may appear to be a unit of elves, but may not appear as a unit of giants or halflings. The spell does not affect the size of the overall unit; a unit of 50 creatures will still appear to be a unit of 50 creatures.\n&emsp;The disguised unit may appear to be carrying any melee or personal missile weapons (e.g., axes, long swords, crossbows, etc.), and may appear to be wearing any type of armor. In combat, however, the unit attacks and defends with its real weapons and armor regardless of the gear they may appear to be carrying.\n&emsp;*Disguise* is most effective at long range. If another unit moves within 20 yards of a *disguise*d unit, it automatically sees through the illusion.\n&emsp;The caster automatically sees through the illusion. Members of the subject unit see no change in their appearance. *True seeing* or similar magic is required for other individuals to see through the *disguise* (unless they move within 20 yards of the unit).'
};

pri5['Easy March'] = {
    'level': '5',
    'school': 'Invocation',
    'sphere': 'Travelers',
    'range': '50 feet',
    'duration': '[[@{level-priest}]] days',
    'aoe': '[[@{level-priest}]] creatures',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A piece of shoe leather.',
    'reference': 'p. 90',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables a number of creatures equal to the caster’s level to force march for a number of days equal to the caster’s level. Creatures affected by *easy march* can travel 2 ½ times their normal movement rate without any risk of fatigue; thus, they are not required to make a Constitution check at the end of the day.\n&emsp;All creatures affected by this spell suffer a -1 penalty to their attack rolls for the duration of the spell; this modifier is not cumulative (that is, a party experiencing its second day of *easy march* suffers only a -1 penalty). The modifier cannot be negated by resting.\n&emsp;*Easy march* has no effect on modifiers to movement due to terrain, fatigue, weather, or other normal factors. (Refer to Chapter 14 of the *Player’s Handbook* for more about force marching.)'
};

pri5['Elemental Forbiddance'] = {
    'level': '5',
    'school': 'Abjuration',
    'sphere': 'Wards, Elemental (Air, Earth, Fire, Water)',
    'sphere-spells&magic': 'Wards',
    'range': 'Special',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[5*[[@{level-priest}]] ]] foot-cube',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and four glass beads, each of a different color (green, blue, red, and yellow). The priest must pace out the perimeter of the warded area at the time of casting.',
    'reference': 'p. 91',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell prevents the entry of all elementals into the area of effect. Further, elementals outside the area of effect cannot make physical attacks against those inside. Spells and missile attacks can be cast into the area by elementals.\n&emsp;The spell affects a cube whose sides equal the caster’s level times 5 feet (a 12th-level priest could affect an area equal to a 60’ ✕ 60’ ✕ 60’ cube).\n&emsp;*Elemental forbiddance* has no effect on elementals that are within the area of effect when the spell is cast. If such elementals leave the area of effect, they cannot reenter.'
};

pri5['Extradimensional Manipulation'] = {
    'level': '5',
    'school': 'Alteration',
    'sphere': 'Numbers',
    'range': '10 yards',
    'duration': '[[2d12+4*[[@{level-priest}]] ]] rounds',
    'aoe': 'One extradimensional space up to 20 feet x 20 feet',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': 'A strip of gold tissue worth at least 5 gp that is twisted into a Moebius strip. The strip is consumed in the casting.',
    'reference': 'p. 91',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the priest to alter the characteristics of certain extradimensional spaces such as those created by *rope trick* and similar spells or those contained in items like bags of holding or *portable holes*.\n&emsp;*Extradimensional manipulation* can increase or reduce the size of a single extradimensional space. The amount of increase or decrease depends on the level of the caster:}}{{style=center1 sheet-spell-center2}}{{c1-1=**Level**}}{{c2-1=Up to 10}}{{c3-1=11 to 16}}{{c4-1=17 or above}}{{c1-2=**Multiplier**}}{{c2-2=✕2}}{{c3-2=✕3}}{{c4-2=✕4}}{{effects2=&emsp;This means that a 10th-level priest can double the capacity of a *bag of holding* or decrease it to half its normal size. A 15th-level priest can triple the capacity or reduce it to one-third capacity.\n&emsp;If the size and capacity of an extradimensional space is decreased, any contents of the space that exceed the current capacity are expelled (determined randomly). These contents are expelled from the space in the same way they originally entered it, if that path is still open. If the path is closed, as it would be if a *bag of holding* were tied shut or a *portable hole* were folded up, the “extra” contents are expelled into the Astral plane. Any items in an enlarged space when the spell duration expires suffer the same fate.\n&emsp;Placing an extradimensional space inside another such space, such as placing a *bag of holding* inside a *portable hole* (see the *DUNGEON MASTER’s Guide*), is a dangerous undertaking. *Extradimensional manipulation* may be cast for the purpose of removing this danger. When used in this manner, the size of the space cannot be affected. However, while this version is in effect, the affected extradimensional space can be placed within another such space (or another extradimensional space may be placed within the affected space) with no adverse consequences. If one space is within the other when the spell expires, the usual consequences ensue immediately.\n&emsp;If the space to be affected is being maintained by a spellcaster, as in the case of a *rope trick*, that spellcaster receives a saving throw to resist the *manipulation*. If the space is created by a magical item, however, no saving throw is allowed.'
};

pri5['Extradimensional Pocket'] = {
    'level': '5',
    'school': 'Alteration',
    'sphere': 'Numbers',
    'range': 'Touch',
    'duration': '[[1d12+2*[[@{level-priest}]] ]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'In addition to the container, are 200 gp worth of powdered diamond and a sheet of platinum worth 500 gp. The platinum sheet must be inscribed with a drawing of a Klein bottle (a paradoxical figure with only one surface--the three-dimensional analogue of the Moebius strip). The diamond dust is consumed during the casting--the platinum sheet is not.',
    'reference': 'p. 91',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the priest to create a single extradimensional space or pocket like the one inside a *bag of holding*. The spell must be cast on a container such as a sack, bag, or backpack. Once under the influence of the spell, the container opens into a nondimensional space and is much larger inside than its outside dimensions. The container always weighs a fixed amount, regardless of what is put inside. This weight and the capacity of the extradimensional space depend on the level of the caster:}}{{style=center}}{{cc1-1=bottom}}{{c1-1=**Level**}}{{c2-1=9-13}}{{c3-1=14-16}}{{c4-1=17-19}}{{c5-1=20+}}{{c1-2=**Apparent**\n**Weight**}}{{c2-2=15 lbs}}{{c3-2=25 lbs}}{{c4-2=35 lbs}}{{c5-2=60 lbs}}{{c1-3=**Weight**\n**Cap.**}}{{c2-3=250 lbs}}{{c3-3=500 lbs}}{{c4-3=750 lbs}}{{c5-3=1,000 lbs}}{{c1-4=**Volume**\n**Cap.**}}{{c2-4=30 cu.ft.}}{{c3-4=70 cu.ft.}}{{c4-4=100 cu.ft.}}{{c5-4=150 cu.ft.}}{{effects2=&emsp;If the container is overloaded or if it is pierced by a sharp object, the bag immediately ruptures and the contents are lost into the Astral plane. Any items within the bag when the spell duration ends are also lost in the Astral plane.'
};

pri5['Grounding'] = {
    'level': '5',
    'school': 'Abjuration',
    'sphere': 'Wards',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '10-yard square/priest',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a coil of silver wire.',
    'reference': 'p. 92',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Grounding* offers protection against normal and magical electrical attacks within the area of effect. The protected area and creatures within it suffer no damage from normal electrical attacks (such as those caused by lightning bolts in a thunderstorm and nonmagical creatures such as electric eels). Magical electrical attacks (including lightning bolt breath weapons) cause only 50% of their normal damage. Additionally, creatures within the area of effect receive a +2 bonus to saving throws made against electrical attacks, regardless of whether the attacks originate inside or outside the warded area.'
};

pri5['Illusory Artillery'] = {
    'level': '5',
    'school': 'Enchantment/Charm',
    'sphere': 'War',
    'range': '300 yards',
    'duration': 'Instantaneous',
    'aoe': '30 yard x 30 yard square',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A small, empty cylinder made of brass.',
    'reference': 'p. 92',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a vivid illusion of incoming artillery fire (ballista bolts, catapult stones, etc.) at a target indicated by the caster. The illusion is complete, comprising both audial and visual elements. It is impossible for victims to determine where the missiles were fired from; creatures under attack notice the missiles only when they are about to strike.\n&emsp;The missiles never actually strike--they vanish inches above the victims’ heads and do no damage. The illusion is so terrifying, however, that victims must immediately make a morale check. The first time a group or unit is the target of this spell, this morale check is made with no modifier. The second and subsequent times that the same unit is attacked with this spell, the unit receives a +1 bonus to its morale score (for checks against this effect only) *unless* the unit has been the target of real artillery fire in the interim. In this case, the bonus does not apply.'
};

pri5['Impeding Permission'] = {
    'level': '5',
    'school': 'Enchantment/Charm',
    'sphere': 'Law',
    'range': '150 yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': 'One creature',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 92',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell may be cast only on creatures with Intelligence of 2 or greater and the ability to communicate with the caster. The spell interferes with the victim’s ability to make decisions. It prevents the victim from performing any action without first gaining the permission of the caster or a character designated by the caster. The victim will heed only the person designated by the caster.\n&emsp;Before the victim undertakes any action, he must gain permission. He will not follow through with an action until he gains permission. If permission is denied, the victim cannot act until he thinks of an alternate action and gains permission for that action.\n&emsp;Every round, the victim must decide his action for that round; at the victim’s initiative, he must ask permission to perform his action. If permission is denied, the victim can take no other action that round.\n&emsp;The only actions exempt from the need for permission are involuntary actions such as breathing.\n&emsp;Asking and gaining permission takes only a short amount of time in most cases. A simple request, such as asking for permission to swing a sword in the middle of combat, can be accomplished quickly. Complicated requests, such as getting permission to act on a complicated plan, will naturally take more time. The DM may consider adding a modifier to the victim’s initiative roll in such cases.'
};

pri5['Meld'] = {
    'level': '5',
    'school': 'Enchantment',
    'sphere': 'Charm',
    'sphere-spells&magic': 'All',
    'range': '10 yards',
    'duration': '12 hours',
    'aoe': 'One priest',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'Special',
    'materials': 'A chalice worth no less than 1,000 gp. This chalice must be given as a gift to the host (who cannot return it to the donor for any reason).',
    'reference': 'p. 93',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This cooperative spell requires only one priest to cast it, but can be cast only on another priest of the same faith. The recipient of the spell must voluntarily surrender himself to the spell. The recipient becomes a host for the caster. While the recipient does not lose his own persona or ability to act, the host can be dominated by the caster at any time. For the most part, this domination is complete.\n&emsp;For the duration of the spell, the caster is essentially detached from his own body. He can neither move nor act on his own. His mind is connected to the host’s. He sees, hears, smells, tastes, and otherwise senses everything the host does. He can telepathically communicate with the host. Once the spell is completed, there is no limit to the range over which it can function. However, both the caster and host must remain on the same plane. Since the spell relies on telepathic communication, thin lead sheeting will effectively block the connection.\n&emsp;When desired, the caster can dominate the host. When this happens, the host’s own mind is pushed to the background and the caster’s personality dominates. The host’s personality, memories, proficiencies, and spells are temporarily replaced by those of the caster. While occupying the host, the caster can cast any spell he himself has memorized, provided that the necessary components are on hand. These spells function exactly as if the priest had cast them from his own body.\n&emsp;The caster can return control to the host at any time, restoring the character’s abilities and personality without harm.\n&emsp;The spell is not without limitations and risks. The domination must be voluntary. If the host resists the casting of the spell, it automatically fails. Once the spell is in effect, the host can attempt to resist the domination. He is then allowed a saving throw. If successful, the spell immediately ends.\n&emsp;Whenever the host suffers damage, the caster must make a saving throw vs. death to maintain the spell. If the save is failed, a wave of pain is transmitted to the priest, causing 1d6 points of damage and canceling the spell. If the host should die, the caster must make a system shock roll with the risk of suffering instant death.'
};

pri5['Memory Wrack'] = {
    'level': '5',
    'school': 'Alteration, Enchantment/Charm',
    'sphere': 'Thought',
    'range': '10 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'A ruby of at least 200 gp value, which is crushed during the casting.',
    'reference': 'p. 93',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This nasty spell “disconnects” the subject’s short-term and long-term memory. While the spell is in effect, the subject is incapable of storing information in long-term memory. Every moment is virtually an independent event for the subject; he or she can remember recent events, thoughts, and sensations for no more than a few seconds (the amount of time they remain in short-term memory).\n&emsp;Memories of events that happened before the onset of the spell are not affected at all; these are safely stored in long-term memory. This means that the subject can cast any spells memorized before the *memory wrack* took effect, but he is likely to have difficulty casting the spell as described below.\n&emsp;The subject of this spell has a limited ability to act. He is restricted to one action at a time and must concentrate mightily to keep the situation and any planned actions in short-term memory. As long as the subject is able to maintain concentration, he may act normally within these limits.\n&emsp;If the subject is distracted (he is struck in combat, affected by a spell, startled, surprised, or a similar event occurs), he forgets everything that occurred from the onset of the spell to the moment of distraction. The subject must re-evaluate the situation as if it had just come to pass.\n&emsp;Consider the following example. The subject of the spell is a soldier assigned to guard the entrance to a building. The priest arrives and casts *memory wrack* on the guard. The guard has no problem remembering his orders, since he received them before the onset of the spell. He also remembers the arrival of the priest. The priest now tries to convince the guard that he is authorized to enter the building. The guard refuses him entry. The priest now picks up a rock and throws it at the guard, striking him and distracting him. The guard forgets everything that happened between the onset of the spell and the moment the rock struck. He forgets that the priest has already tried to con him and that he threw a rock at him. He must reevaluate the situation as though the priest had just arrived. The priest is free to make another attempt at entering the building.\n&emsp;When the spell expires, the subject remembers nothing that happened while the spell was in effect, possibly leading to amusing consequences (“By the gods, how did I get here?”).'
};

pri5['Mindshatter'] = {
    'level': '5',
    'school': 'Enchantment/Charm',
    'sphere': 'Thought',
    'range': '[[3*[[@{level-priest}]] ]] yards',
    'duration': 'Special',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'A small bust of a human head, about 3” in height, made from fine, delicate china. The priest shatters this bust during the casting.',
    'reference': 'p. 94',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the priest to create one specific form of insanity in the subject. Five forms of insanity are possible through this spell.\n&emsp;*Schizophrenia:* This form of insanity is characterized by personality loss. The subject has no personality of his own, so he selects a role model and makes every possible attempt to behave like that character. The chosen role model will be as different from the subject as possible. (Thus, an insane wizard might begin to follow the habits of a warrior.) Obviously, a warrior who believes himself to be a wizard will be unable to cast spells (he might *think* that he’s casting spells, or he might construct a sophisticated series of excuses explaining why he’s “not in the mood for magic” at the moment). A character who emulates a member of another class does not gain any of the skills of that class and makes all attacks and saving throws as appropriate to his true class. Certain consequences might arise if the character’s emulation causes him to break restrictions of his class. For example, a priest emulating a warrior might break his deity’s prohibition against edged weapons, or a paladin might emulate a Neutral Evil thief. Both will suffer the appropriate consequences as if they had been compelled to violate their beliefs while charmed. Such characters will certainly have to atone for their actions once they return to normal.\n&emsp;*Dementia praecox:* The subject is totally uninterested in any undertaking. Nothing seems worthwhile, and the individual is lethargic and filled with tremendous feelings of boredom and dissatisfaction. No matter how important the situation, it is 50% likely that the subject will ignore it as meaningless.\n&emsp;*Delusional insanity:* The subject is convinced that he is a famous figure: a monarch, demi-god, or similar personage. Characters who fail to recognize the subject with the honor he deserves incur great hostility or disbelief. The subject acts appropriately to a station that he does not hold. He directs orders at real and imaginary creatures and draws upon resources that do not exist.\n&emsp;*Paranoia:* The subject is convinced that “they” (whoever *they* are) are spying on him and plotting against him. Everyone around the subject, even friends and allies, is part of the plot. If any other character acts in a way that the subject can interpret as reinforcing this delusion, the subject has a 20% chance of reacting with violence.\n&emsp;*Hallucinatory insanity:* The subject sees, hears, and otherwise senses things that do not exist. The more stressful the situation is to the subject, the more likely he will hallucinate. Although most hallucinations are external to the subject (that is, he perceives creatures, objects, and conditions that do not exist), there is a 10% chance that any hallucination will involve the subject’s self-perception. For example, the subject might suddenly believe and act as if he had sprouted wings, grown to giant size, etc.\n&emsp;When this spell is cast by a priest of 13th level or lower, the DM chooses or randomly selects one of these forms of insanity (and should feel free to invent other interesting symptoms). If the priest is 14th level or higher, he can personally select the form of insanity to afflict the subject.\n&emsp;While under the effect of this spell, the subject can cast spells and use innate powers; the use of these abilities will be in accordance with the symptoms of the insanity, however. Player characters affected by this spell should be encouraged to role-play the appropriate effects to the limit.\n&emsp;The duration of this spell depends on the sum of the subject’s Intelligence and Wisdom scores. A saving throw is allowed on a periodic basis depending on this total. The spell is broken if a successful saving throw is rolled. Refer to the table that follows.}}{{style=center}}{{cc1-1=bottom}}{{c1-1=**Int + Wis**}}{{c2-1=8 or less}}{{c3-1=9 to 18}}{{c4-1=19 to 24}}{{c5-1=25 to 30}}{{c6-1=31 to 35}}{{c7-1=36 or more}}{{c1-2=**Time Between Checks**}}{{c2-2=1 month}}{{c3-2=3 weeks}}{{c4-2=2 weeks}}{{c5-2=1 week}}{{c6-2=3 days}}{{c7-2=1 day}}{{effects2=&emsp;The effects of this spell can be removed by a *limited wish*, *wish* (or equally powerful magic), or by a *heal* spell cast for this specific purpose.'
};

pri5['Repeat Action'] = {
    'level': '5',
    'school': 'Enchantment/Charm',
    'sphere': 'Time',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': 'One creature',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'Two identical glass spheres, each an inch or less in diameter.',
    'reference': 'p. 95',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell compels its victim to repeat the action of the previous round. The result of the repetition is always identical to the original result.\n&emsp;For example, if a character fired an arrow and inflicted 4 points of damage, a *repeat action* spell will cause him to fire a second arrow that will also inflict 4 points of damage. As long as the victim of the first arrow is within range, the subject affected by *repeat action* will adjust his aim and fire the second arrow at him. If the victim of the arrow moves out of range, the subject will fire his second arrow in the direction of the recipient. If the recipient is out of sight, the subject will fire in the direction of the recipient’s original location.\n&emsp;The subject of a *repeat action* spell must be capable of performing the indicated action a second time. If a character has no arrows in his quiver, he cannot fire an arrow. If a wizard were ordered to repeat a spell, he would attempt the spell only if he had the spell memorized and had sufficient material components. If a subject discovered a gem during a given round, *repeat action* will only compel him to hunt again; he will not recover another gem unless a second gem is actually present.\n&emsp;An unwilling subject is allowed a saving throw vs. spell to resist the effects of *repeat action*.'
};

pri5['Shrieking Walls'] = {
    'level': '5',
    'school': 'Enchantment',
    'sphere': 'Wards',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] days',
    'aoe': '20’-cube',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A small golden bell and a bee’s wing.',
    'reference': 'p. 95',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enchants any single room no larger than the area of effect. When any creature larger than a normal rat (larger than one-half cubic foot or weighing more than three pounds) enters the room, shrill shrieks begin to emanate from the walls. The shrieks persist for 2-5 ([[1d4+1]]) rounds. The walls do not undergo any physical change.\n&emsp;The shrieks can be heard only by creatures inside the room. Creatures hearing the shrieks experience no ill effects on the first round, allowing them time to leave the room or cover their ears. *Silence, 15’ radius* protects against the effects.\n&emsp;Creatures who remain in the room during the second or subsequent rounds of the shrieks who have not protected their hearing are penalized as follows:\n&emsp;•Creatures whose levels or Hit Dice are greater than the level of the caster are stunned for 2-8 ([[2d4]]) rounds.\n&emsp;•Creatures whose levels or Hit Dice are less than or equal to the level of the caster become deaf for 1-4 hours, suffering a -1 penalty to surprise; deafened spellcasters have a 20% chance of miscasting any spell with a verbal component.'
};

pri5['Thoughtwave'] = {
    'level': '5',
    'school': 'Divination',
    'sphere': 'Divination',
    'sphere-spells&magic': 'Thought',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 96',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This cooperative spell can be cast by either a single priest or a group of priests. *Thoughtwave* allows the priest to send a short but powerful message to one or more specific individuals, informing them of his situation and general location. The spell instantly generates a powerful mental impulse indicative of the caster’s general mental state--anger, fear, pain, despair, etc.\n&emsp;The caster can designate as many as ten persons to receive this message, provided they can all be specifically named or grouped in a general category. Thus, the caster could designate a group of characters by name or could target “fellow priests,” “superiors,” “adventuring companions,” “knights of Lord Harcourt,” or “villagers of Dopp.” If more than ten individuals are in the group, those closest to the source will receive the impulse.\n&emsp;There is no range limitation to the spell, although it cannot be projected outside the plane occupied by the caster.\n&emsp;Creatures receiving the impulse automatically know who sent it (even if they have never met the priest before) and gain a clear indication of the mood and situation of the caster. Recipients also intuitively know the general source of the spell, although they are unable to pinpoint rooms, dungeon levels, or landmarks. For example, a fighter could suddenly be struck by an image of Father Rastibon, who is injured and in great pain somewhere along the forest road. A priest might suddenly sense that his patriarch is being tortured in the dungeons of Castle Varrack.\n&emsp;The spell can also be cast by more than one priest, allowing them to either contact greater numbers of individuals or increase the intensity of the message. If greater numbers are desired, ten characters are contacted per priest involved in the casting.\n&emsp;Increasing the intensity of the message makes it more compelling. Doubling the intensity (requiring at least three priests) causes the message to act as a *suggestion*. In this case, the effect is limited to a single target. Tripling the intensity (requiring at least five priests) gives the spell the force of a *quest*. This effect is also limited to a single target. In both cases, the target is allowed a saving throw to avoid the effect of the *suggestion* or *quest*.'
};

pri5['Time Pool'] = {
    'level': '5',
    'school': 'Divination',
    'sphere': 'Time',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A suitable reflective surface and a pinch of powdered quartz.',
    'reference': 'p. 96',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the caster to cause a mirror, a pool of water, or any other reflective surface to reveal a specific event from the past. The image provides a perfectly clear picture with normal sounds, as if the caster were present at the scene. The image continues for the duration of the spell.\n&emsp;*Time pool* will not reveal images from other planes of existence.\n&emsp;The spell’s success is not automatic. The caster must know the general nature of the event he wishes to view (i.e., “Show me the murder of King Thamak”). The caster’s base chance of viewing the desired scene is 50%, modified as follows, to a maximum of 90%:\n&emsp;•Add 5% for each point of the caster’s Wisdom above 15.\n&emsp;•Add 20% if the caster has successfully used *time pool* to observe the same event before.\n&emsp;Only one of the following may apply:\n&emsp;•Add 20% if the event is one in which the caster participated.\n&emsp;•Add 10% if the caster is well informed about the event.\n&emsp;•Add 5% if the caster is slightly informed about the event.\n&emsp;The caster cannot communicate or otherwise interact with the image. Spells cannot be cast into the *time pool*.'
};

pri5['Unceasing Vigilance of the Holy Sentinel'] = {
    'level': '5',
    'school': 'Alteration',
    'sphere': 'Guardian',
    'range': '0',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '5-foot-radius sphere',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A special ink containing the powder of a crushed sapphire (at least 1,000 gp value) and a drop of holy water.',
    'reference': 'p. 97',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enhances a priest’s ability to guard a person, place, or object. The spell’s effect must be centered on a specific area, for it creates an invisible spherical boundary up to 10 feet in diameter. The effect is not mobile; it cannot move with a living creature.\n&emsp;While within the area of effect of this spell, the priest (and only the priest) gains several special abilities:\n&emsp;•His sense of sight is magically enhanced. He can see through normal darkness and can see invisible creatures and objects. He cannot see through solid objects, however, and the range of his magical sight is limited to 60 feet.\n&emsp;•The priest has no need for food, water, or rest. He does not feel fatigue and regenerates 1 hit point per hour spent within the circle. However, he does not actually rest and therefore cannot regain spells until he sleeps.\n&emsp;•He is totally immune to the effects of magical and natural fear, as well as *sleep* and *charm* spells.\n&emsp;If the priest leaves the circle, the spell is broken. When the spell ends, the priest must rest for 1 turn per hour (or portion thereof) spent in the circle. If the priest is forced into action (by being attacked, for example), he can move at only half his normal movement rate, has an Armor Class penalty of -2, an attack penalty of -2, and loses all Dexterity combat bonuses.\n&emsp;To cast this spell, the priest must trace a circle of sigils and runes 10 feet in diameter using a special ink containing the powder of a crushed sapphire (at least 1,000 gp value) and a drop of holy water. This procedure takes 1 turn to complete.'
};

pri5['Undead Ward'] = {
    'level': '5',
    'school': 'Abjuration, Necromancy',
    'sphere': 'Wards',
    'sphere-necromancers': ', Necromantic',
    'range': 'Special',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[5*[[@{level-priest}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '2 turns',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol, which must be carried around the perimeter of the area to be warded.',
    'reference': 'p. 97',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell prevents most types of undead creatures from entering the area of effect (a cube whose sides equal the caster’s level times 5 feet--a 15th-level caster could affect a cube whose sides equal 75 feet).\n&emsp;When an undead creature attempts to enter the protected area, the creature is affected by the ward as if it were being turned by a priest two levels lower than the caster. Currently level [[ [[@{level-priest}]]-2]]. The casting priest need not have the ability to turn undead himself. Thus, an *undead ward* created by a 10th-level priest would turn creatures as if by an 8th-level priest.\n&emsp;The results of the turning attempt are calculated normally. If a large number of undead assault the warded area, not all of them are turned by the spell, since the normal limitations apply. Undead who are unaffected by the turning attempt ignore the *undead ward* for its duration. Undead within the area of effect when the spell is cast are not affected. However, when such undead leave the area of effect, they are subject to the effects of the spell if they attempt to reenter.'
};

pri6['Age Creature'] = {
    'level': '6',
    'school': 'Alteration (Reversible)',
    'sphere': 'Time',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '*Age Creature:* A pinch of powdered emerald. *Restore Youth:* A pinch of powdered ruby.',
    'reference': 'p. 98',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell ages the targeted creature one year per level of the caster. Currently [[@{level-priest}]] years. Unwilling subjects may attempt a saving throw to resist the spell. Subjects affected by *age creature* must make a successful system shock roll to survive the change.\n&emsp;Subjects cannot be aged beyond their natural life spans. If the priest’s level indicates that a creature would be aged beyond this level, the creature is aged to one year short of his maximum age. The spell cannot cause a subject to die.\n&emsp;Human and humanoid characters affected by the spell experience changes in appearance associated with increased age, such as gray hair and wrinkles. More significantly, they suffer losses in Strength, Dexterity, and Constitution when they reach certain age levels. These are summarized in Table 12: Aging Effects in the *Player’s Handbook*. The *Player’s Handbook* also provides rules for determining a character’s base age.\n&emsp;Nonmagical monsters can be affected by *age creature*. The DM determines a monster’s current age and natural life span based on its description in the *MONSTROUS COMPENDIUM appendix* or based on his own judgment. To determine the effects of aging on a monster, assume the following: a monster is middle-aged when it reaches half its natural life span; a monster reaches old age at two-thirds of its natural life span; a monster reaches venerable age in the last one-sixth of its years. A monster suffers the penalties which follow when it reaches these age levels. The penalties are *cumulative and permanent* (unless the affected monster becomes younger).}}{{style=center1}}{{c1-1=**Age**}}{{c2-1=Middle Age}}{{c3-1=Old Age}}{{c4-1=Venerable}}{{c1-2=**Penalty**}}{{c2-2=-1 to all saving throws}}{{c3-2=-1 to all saving throws\n-1 to all attack rolls}}{{c4-2=-1 to all saving throws\n-1 to all attack rolls}}{{effects2=&emsp;The reverse of this spell, *restore youth*, permanently restores age that has been lost as a result of magic (such as an *age creature* spell). *Restore youth* reduces the age of the targeted creature by one year per level of the caster. The subject must make a successful system shock roll to survive the change. Subjects who become younger regain the lost ability scores described above. A subject cannot become younger than his actual age as a result of this spell.'
};

pri6['Crushing Walls'] = {
    'level': '6',
    'school': 'Enchantment',
    'sphere': 'Wards',
    'range': 'Touch',
    'duration': 'Permanent until activated',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A 1-inch iron cube and a walnut shell.',
    'reference': 'p. 98',
    'book': 'Tome of Magic',
    'damage': 'Death or 5d10',
    'damage-type': 'Crushing',
    'healing': '',
    'effect': 'This spell enables the caster to enchant a floor, ceiling, or single wall of a room to crush intruders. The enchanted surface can be no larger than a square whose sides equal the caster’s level times 2 feet (a 13th-level priest could affect a 26’ ✕ 26’ surface). Currently [[2*[[@{level-priest}]] ]] square feet.\n&emsp;The spell activates 1d4 rounds after any creature other than the caster enters the room. The intruder must be larger than a normal rat (larger than one-half cubic foot or weighing more than three pounds). When activated, the enchanted surface moves toward the opposite surface at a rate of 3 feet per round. Unless the spell is canceled by the caster, the enchanted surface continues to move until one of the following events occurs:\n&emsp;•A creature with sufficient Strength (minimum score of 19) stops the enchanted surface from moving by succeeding a Strength check. Such a creature suffers no damage from the enchanted surface. If the creature prevents the enchanted surface from moving for three consecutive rounds, the wall returns to its original position and the spell is negated. If multiple creatures attempt to stop the wall, the highest strength score is used as a base score; one point is added to that score for every creature assisting. Thus, a creature with 16 Strength assisted by three creatures could attempt to stop the wall.\n&emsp;•A strong or heavy object made of stone, wood, or metal is placed in the path of the wall. If the item survives a saving throw vs. crushing blow, the object successfully braces the wall. If the object holds for three consecutive rounds, the surface returns to its original position and the spell is negated. The DM must use discretion in determining the types of objects that will brace the wall.\n&emsp;•*Dispel magic* or a similar spell or magical item is used to cancel the *crushing wall*.\n\n&emsp;Creatures can avoid being crushed by using a *potion of diminution*, *potion of gaseous form*, or other devices or spells that reduce size. The *crushing wall* almost never touches the opposite wall, usually being stopped by debris. A gap of two inches or more usually remains between the walls.\n&emsp;If the wall is not stopped, it causes crushing damage to everyone in the room. All creatures must make a saving throw vs. death. Those who fail are crushed to death. Those who save successfully suffer 5d10 points of damage. When the wall can move no farther, it returns to its original position and the spell is negated.'
};

pri6['Disbelief'] = {
    'level': '6',
    'school': 'Enchantment/Charm',
    'sphere': 'Thought',
    'range': '0',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 99',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the caster to temporarily convince himself that certain objects or as many as four creatures within the area of effect do not actually exist. While *disbelief* remains in effect, these objects or creatures cannot harm or hinder the caster. He can pass through them as if they did not exist and takes no damage from their attacks or actions. However, since these objects or creatures temporarily do not exist for the priest, he can take no action against them. If the creatures attack, the caster receives no Dexterity bonus to armor class (since this bonus represents dodging, and the priest is unable to dodge a creature that does not exist for him).\n&emsp;The caster can attempt to disbelieve as many as four creatures within 60 feet of his position at the time of casting. He disbelieves the same four creatures for the duration of the spell. Alternatively, the priest can disbelieve any or all inanimate objects of up to 20-cubic-yard volume (thus, he may disbelieve a 12 foot by 15 foot area of 3-foot-thick wall). This volume must be centered on a point no more than 20 yards from the caster. These two options are mutually exclusive; the priest can disbelieve only creatures *or* objects, not a combination of both.\n&emsp;Disbelieving a creature includes all gear, equipment, or treasure carried or worn by that creature; it does not include other objects that come into contact with that creature, such as walls, doors, chairs, etc.\n&emsp;*Disbelief* is not automatic; it requires an extreme effort. To successfully disbelieve, the priest must make a saving throw vs. paralyzation. A *successful* save means the priest has disbelieved; an *unsuccessful* check means that the spell has failed and the priest has not convinced himself of the creatures’ or objects’ non-existence.\n&emsp;While this spell is in effect, the DM must record any damage suffered by the priest from disbelieved creatures. When the spell ends, the caster makes a saving throw vs. spell. If the saving throw is successful, the priest suffers only one-eighth of any damage inflicted by the creatures (round all fractions down); if the priest fails the saving throw, he suffers one-half of any damage inflicted (round fractions down).'
};

pri6['Dragonbane'] = {
    'level': '6',
    'school': 'Abjuration',
    'sphere': 'Wards',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[1d4+floor([[@{level-priest}]]/2)]] rounds',
    'aoe': '[[5*[[@{level-priest}]] ]] foot-cube',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'The priest’s holy symbol and a dragon scale.',
    'reference': 'p. 99',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell prevents any dragon who fails its saving throw from entering the area of effect. The spell affects a cubic area whose sides equal the caster’s level times 5 feet; thus, a 16th-level caster could affect a cube whose sides each equal 80 feet. The dragon can cast spells, blast breath weapon, or hurl missiles (if possible) into the area of effect.\n&emsp;Dragons within the area of effect when the spell is cast are not affected. If such dragons leave the area of effect, they must succeed a saving throw to reenter the area.\n&emsp;The spell’s effectiveness can be greatly increased with the casting of a *focus* spell.'
};

pri6['Gravity Variation'] = {
    'level': '6',
    'school': 'Alteration',
    'sphere': 'War',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[floor([[@{level-priest}]]/3)]]  turn(s)',
    'aoe': '120-yard x 120-yard square',
    'components': 'V, S, M',
    'cast-time': '2 turns',
    'saving-throw': 'None',
    'materials': 'A tiny plumb bob; the plumb line must be made of platinum wire while the bob itself must be a gem of at least 1,000 gp value. The device is consumed in the casting.',
    'reference': 'p. 100',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell changes the characteristics of a square region of terrain. The area can be no more than 120 yards on a side. The priest can effectively turn a flat plain into a slope of any direction, or may flatten an existing slope. The spell does not allow the priest to alter the pull of gravity, however.\n&emsp;This spell lets the priest create or negate a height differential of as much as 20 feet (a 2” slope in BATTLE SYSTEM rules measurements) within the area of effect. This can have various consequences; the best way to discuss the effects is by example.\n&emsp;**Example 1:** Two units face each other on a flat plain. The priest can alter the slope of the terrain so that one unit is 2” of elevation higher than the other. The unit that is upslope gains the combat benefits for higher ground, and the unit that is downslope must pay the movement cost for moving uphill if it wishes to approach the other unit.\n&emsp;**Example 2:** One unit is on flat terrain; another unit, 6” away, is on a hill of 2” elevation. Using this spell, the priest can effectively eliminate this difference in elevation (raising the low ground or lowering the high ground). All combat and movement involving these two units is then conducted as if there were no elevation difference (i.e., no movement penalty, no combat benefit for higher ground, etc.). Alternatively, the priest could increase the height differential by 2”. Combat and movement would now be conducted as if the total difference in elevation were 4”.\n&emsp;**Example 3:** A unit faces a hill of 3” elevation. The priest casts *gravity variation*, decreasing the effective elevation of the hill to 1”. The unit pays a lower movement point cost to climb the hill. Alternatively, if the unit facing the hill were an enemy unit, the priest could increase the effective elevation to 5”.\n\n&emsp;The priest must specify the degree and direction of change at the moment of casting. These parameters cannot be changed while the spell remains in effect.\n&emsp;*Gravity variation* can have dramatic effects on siege engines and towers. Most siege engines can be moved only on the most gentle of slopes. By raising or lowering the effective elevation of siege engines by 2”, the priest can totally immobilize them by positioning them on a slope too steep to negotiate. In the case of siege towers, there is a 50% chance that the structures will topple over (totally destroying them).'
};

pri6['The Great Circle'] = {
    'level': '6',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Sun',
    'sphere-spells&magic': 'Creation',
    'range': '0',
    'duration': '1 round',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '6 turns',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 100',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*The great circle* is a powerful cooperative spell that can be used only by four or more priests, each casting the spell simultaneously. Because of the nature of this spell and its casting time, it is often used to cleanse grounds in preparation for the construction of a temple or sanctuary.\n&emsp;When casting *the great circle*, the priests stand in a circle of no more than 20-foot diameter. Each faces inward; when the spell is completed, each priest faces outward, directing the energy of the spell.\n&emsp;When the casting is complete, the spell takes the form of a radiant halo of golden light 20 feet above the ground. This halo quickly expands in a shimmering wave. It can pass through objects, with small arcs of the halo disappearing momentarily and reappearing on the far side. As the halo moves, it generates a high-pitched hum that varies in pitch, almost like a chorus. The halo moves slowly at first, but builds speed, reaching its maximum range at the end of one round.\n&emsp;The radius of the golden halo is dependent on the number of priests casting the spell. Each priest adds 60 feet to the radius. Thus, four priests could generate a halo that extends 240 feet in all directions from the circle of priests. Theoretically, there is no limit to the number of priests who may contribute to this spell, but the need for the priests to be within a 20-foot diameter circle sets a practical limit of 20 casters.\n&emsp;The halo is pure energy tapped from the Positive Material plane. It causes harm to undead and evil beings within the area of effect. Undead creatures of 8 or fewer hit dice are instantly destroyed and are not allowed a saving throw to avoid the effect. More powerful undead suffer 1d8 points of damage per caster. A successful saving throw vs. death magic reduces this damage to half. Creatures of evil alignment suffer 1d6 points of damage per caster (a saving throw is allowed for half-damage).\n&emsp;The reverse of this spell, *the black circle*, creates a ring of shimmering black energy. Paladins and priests of good alignment suffer 1d10 points of damage per priest in the circle. All other good creatures suffer 1d4 points of damage per caster. Affected creatures are allowed a saving throw vs. death magic to reduce the damage to one-half.'
};

pri6['Group Mind'] = {
    'level': '6',
    'school': 'Divination, Enchantment/Charm',
    'sphere': 'Thought',
    'range': '0',
    'duration': '1 turn+[[@{level-priest}]] rounds',
    'aoe': '30-yard-diameter circle',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 101',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is a deeper and more extensive version of *rapport*, in that it lets the priest communicate silently and instantly with several willing subjects. The number of subjects (in addition to the priest) depends on the caster’s level:}}{{style=center}}{{cc1-1=bottom}}{{c1-1=**Level**}}{{c2-1=13 and below}}{{c3-1=14-16}}{{c4-1=17}}{{c5-1=18}}{{c6-1=19+}}{{c1-2=**Number of**\n**participants**}}{{c2-2=2}}{{c3-2=4}}{{c4-2=6}}{{c5-2=7}}{{c6-2=8}}{{effects2=&emsp;As with *rapport*, the spell lets the participants share thoughts, emotions, and memories. Each participant sees, hears, and otherwise senses everything experienced by the other, although such “vicarious” experiences feel weak and cannot be mistaken for direct sensations. Participants can shut off these experiences at will if they find them confusing or distracting.\n&emsp;The participants can share such personal concepts as plans, hopes, and fears, although they cannot communicate complex or detailed information. It is impossible to communicate the procedure for casting a spell or picking a lock.\n&emsp;Communication through *group mind* is approximately 30 times faster than verbal communication. The priest can maintain only one *group mind* spell at any time; thus, he cannot communicate with multiple groups.\n&emsp;This spell cannot be used on unwilling subjects.'
};

pri6['Land of Stability'] = {
    'level': '6',
    'school': 'Abjuration',
    'sphere': 'Wards',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] days',
    'aoe': '[[10*[[@{level-priest}]] ]]-foot-cube',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a pinch of volcanic ash.',
    'reference': 'p. 101',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Land of stability* protects the area of effect and all creatures and objects within it from the following natural disasters:\n&emsp;•Earthquakes--vibrations do not affect the warded area and fissures will not open beneath the warded area;\n&emsp;•Floods--the warded area remains dry, even if submerged;\n&emsp;•Windstorms--the warded area suffers no damage from strong winds and objects cannot be blown into the warded area;\n&emsp;•Lava and ash eruptions--lava and ash flow around the warded area; and\n&emsp;•Avalanches--stones and snow will not fall on the warded area.\n\n&emsp;*Land of stability* offers no protection against magically-generated disasters or spells that duplicate natural disasters. Disasters in progress in the area when the spell is cast are not affected.\n&emsp;This spell affects a cubic area whose sides equal the caster’s level times 10 feet; thus, a 15th-level caster could affect a 150’ ✕ 150’ ✕ 150’ cube.'
};

pri6['Legal Thoughts'] = {
    'level': '6',
    'school': 'Enchantment/Charm',
    'sphere': 'Law',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': 'One creature',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 101',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A priest casting this spell forces the victim of the spell to follow one specific law. The priest may choose any law prevalent in the area in which the priest and the victim currently reside. Thus, if a city has no laws about murder, the priest cannot command the person not to kill.\n&emsp;The victim of the spell is forced to obey the letter of the law to the best of his ability. Thus, if a victim were commanded not to commit murder, he would go to any length to avoid murdering someone.\n&emsp;Since the essence of this spell is tied to legal (and not moral) interpretation, characters may find loopholes that will allow them to work around the law in specific cases or to ignore the law in light of extenuating circumstances.\n&emsp;When casting the spell, the priest must speak the law to the recipient in such a way that he can hear it. The victim is allowed a saving throw vs. spell to avoid the effect. If the save is failed, the victim will never willingly violate the stated law as long as the spell is in effect.\n&emsp;*Legal thoughts* can be negated by *dispel magic*. The victim of this spell never perceives anything wrong with adhering to the law, and therefore never seeks to have the spell removed.'
};

pri6['Monster Mount'] = {
    'level': '6',
    'school': 'Enchantment/Charm',
    'sphere': 'Travelers',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '20-foot radius circle',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 102',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell compels one or more living creatures to serve as mounts for the caster and his companions. The spell affects up to 10 Hit Dice or levels of creatures with Intelligence of 4 or lower. Creatures used as mounts must be of suitable size to carry at least one rider; smaller creatures can be used as pack animals.\n&emsp;Each intended mount receives a saving throw vs. spell. Creatures failing their rolls become docile and obedient, allowing riders to mount them, and moving at the speed and direction indicated by the caster.\n&emsp;To maintain the enchantment, the caster must remain within 10 yards of one of the affected creatures, and each affected creature must remain within 10 yards of another. The affected creatures will do nothing for the caster other than carrying riders and gear; they will not fight (although they will fight to defend themselves), nor will they intentionally endanger themselves. Any overtly hostile act by the caster or a rider against any mount breaks the enchantment for all the mounts.\n&emsp;When the enchantment ends or is broken, the creatures take no action for one round, then behave as their natural instincts direct.'
};

pri6['Physical Mirror'] = {
    'level': '6',
    'school': 'Alteration',
    'sphere': 'Numbers',
    'range': '30 yards',
    'duration': '[[1d4+8]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A tiny mirror of polished platinum, worth at least 500 gp.',
    'reference': 'p. 102',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes a localized folding of space. The folded space takes the form of an invisible disk up to 20 feet in diameter. Any missile weapon or spell that intersects this disk is instantaneously reversed in direction. Melee factors such as speed, range, and damage are unaffected; the direction of the object or force is simply rotated through a 180 degree arc. The sender of the spell or missile finds himself the target of his own attack.\n&emsp;The *physical mirror* operates from only one direction; that is, only one side of the mirror reflects attacks. The caster of the mirror may direct spells and missile attacks normally through the space occupied by the mirror.\n&emsp;In the case of physical attacks, the attacker must roll to hit himself (without the armor class benefits of Dexterity or shield). Spells turned back may require the caster to make a saving throw vs. his own spell. In both of these cases, range is important. If the distance between the initiator of the attack and the *physical mirror* is more than twice the range of the attack, the attacker is safe; the attack has insufficient range to travel from the attacker to the mirror and back again.\n&emsp;When the priest casts the spell, he must specify the location and orientation of the *physical mirror* disk. Once it is created, the disk cannot be moved.\n&emsp;If two *physical mirror* disks touch or intersect, they destructively interact and both immediately vanish. The resulting “ripples” in the space-time continuum are exceedingly destructive and inflict 3d10 hit points of damage on any creature within 35 yards (a saving throw is allowed for half-damage). This always includes the casters of the *physical mirror* spells.'
};

pri6['Reverse Time'] = {
    'level': '6',
    'school': 'Alteration',
    'sphere': 'Time',
    'range': '30 yards',
    'duration': '[[1d4]] rounds',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Negate',
    'materials': 'An etched silver arrow bent into a circle. The arrow must be no more than 3 inches long and worth no less than 500 gp. The arrow is destroyed in the casting.',
    'reference': 'p. 103',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to the 9th-level wizard spell *time stop*. When *reverse time* is cast, time stops within a 30-foot diameter of the subject. All creatures and items in the area of effect stand motionless, rivers stop running, and arrows hang suspended in the air. Any creature, person, or object entering the area of effect is likewise frozen in time. The caster is affected if he is within the area of effect, unless he is the subject of the spell.\n&emsp;An unwilling subject is allowed a saving throw vs. spell; if successful, the spell is immediately negated. Otherwise, the victim is forced to relive all the actions taken in the previous 1-4 rounds in reverse. Beginning with the most recent round, the subject moves backward, arrows fired by the subject return to his bow, and so on. All effects of these actions are negated. At the end of the spell’s duration, normal time resumes and all creatures immediately continue their activities, picking up right where they had stopped.\n&emsp;Consider the following example. A party is battling a spellcasting red dragon. In the first round, the dragon breathes fire, roasting the party’s wizard. The rest of the group attacks and injures the dragon. On the second round, the dragon bites and kills the group’s thief. More damage is caused to the beast, but it is still alive in the third round, when it uses magic missile to kill the ranger. At this point, the priest casts *reverse time* on the beast. Fortunately, it fails its saving throw and is forced to reverse the last four rounds. While everyone else freezes, the dragon goes into reverse. The magic missiles zoom back to the dragon (and it regains the ability to cast that spell), it “unbites” the thief (removing that damage from the character), and then inhales its fiery breath (leaving the roasted wizard alive and uncooked). The dragon is then reversed through one more round--the round before it encounterd the party. The spell then ends and actions resume.\n&emsp;The dragon must now roll for surprise since it is encountering the party for the first time. The party is immune to surprise, since it was fighting the beast previously. All damage suffered by the dragon remains, since these actions were caused by the group and not the beast.'
};

pri6['Seclusion'] = {
    'level': '6',
    'school': 'Alteration',
    'sphere': 'Numbers',
    'range': 'Touch',
    'duration': '[[3d12+4*[[@{level-priest}]] ]] rounds',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Negate',
    'materials': 'A tiny crystal box of the finest workmanship (worth at least 1,500 gp) and a gem of at least 250 gp value. The gem is consumed in the casting; the box is not.',
    'reference': 'p. 103',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell encloses one individual in an extradimensional space. Creatures to be affected must be of size M or smaller. The space can contain only one creature, regardless of size. The priest may use the spell on himself or any creature he touches. Unwilling targets are allowed a saving throw vs. spell to avoid the entrapment.\n&emsp;While inside the space, the enclosed character is invisible and totally undetectable by any form of scrying. Powerful magic such as *contact other plane* will indicate that the character is “elsewhere,” but will give no more information.\n&emsp;The creature within the extradimensional space can see and hear everything that occurs around him. However, he cannot cast spells, and no action of his can affect anyone or anything in the “real world.”\n&emsp;While occupied, the extradimensional space is totally immobile. If the caster chooses to occupy the space, he can pass in and out of the space at will. Other creatures can leave or reenter the space only if the caster allows it. To an outside observer, an enclosed character who exits the space simply appears from nowhere.\n&emsp;If the space is occupied when the spell terminates, the occupant is immediately ejected back into the real world and suffers 1d6 hit points of damage in the process.\n&emsp;Any time the extradimensional space is empty, or when the occupant is someone other than the priest, the space follows the priest around. Thus, the priest may *seclude* a comrade in the extradimensional space, walk past some guards into a building, then release the comrade.\n&emsp;If any other form of extradimensional space (such as a *bag of holding*) is taken into the space created by *seclusion*, both spaces are ruptured and all contents are expelled onto the Astral plane. *Extradimensional manipulation* can temporarily prevent this.'
};

pri6['Skip Day'] = {
    'level': '6',
    'school': 'Invocation/Evocation',
    'sphere': 'Time',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': '10-foot radius',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 104',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, all persons and intelligent creatures within 10 feet of the caster are instantly transported 24 hours into the future. Creatures outside the area of effect will believe that the affected characters have disappeared. Unwilling creatures can attempt a saving throw vs. spell to resist the effect of *skip day*.\n&emsp;No time passes for creatures affected by *skip day*; they are in the exact condition that they were in before the spell was cast. They are fatigued, have recovered no hit points, and carry the same spells. Wizards must wait for actual time to pass before they can memorize spells.\n&emsp;The affected creatures remain in the same location as they were before *skip day* was cast. Their immediate environment is likely to have changed; for instance, fires have burned out, enemies who were attacking have departed, and weather has changed for better or worse.\n&emsp;Although *skip day* is a possible substitute for *teleporting* out of a dangerous situation, it is not without risk; characters could reappear in a situation more threatening than the one they left behind (for instance, a forest fire may have started or a pack of hungry wolves may have arrived).'
};

pri6['Sol\'s Searing Orb'] = {
    'level': '6',
    'school': 'Invocation',
    'sphere': 'Sun',
    'range': '30 yards',
    'duration': 'Instantaneous',
    'aoe': 'One gem',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': 'A topaz gemstone worth at least 500 gp.',
    'reference': 'p. 104',
    'book': 'Tome of Magic',
    'damage': '*Normal:* 6d6. *Undead:* 12d6',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'This spell must be cast upon a topaz. When the spell is complete, the stone glows with an inner light. The gem must be immediately thrown at an opponent, for it quickly becomes too hot to hold. (The acts of casting and throwing occur in the same round.) It is not possible for the priest to give the stone to another character to throw.\n&emsp;The stone can be hurled up to 30 yards. The priest must roll normally to hit; he gains a +3 bonus to his attack roll and suffers no penalty for nonweapon proficiency. In addition, the glowing gem is considered a +3 weapon for determining whether a creature can be struck (creatures hit only by magical weapons, for example). There is no damage bonus, however.\n&emsp;When it hits, the gem bursts with a brilliant, searing flash that causes 6d6 points of fire damage to the target and blinds him for 1d6 rounds. The victim is allowed a saving throw vs. spell. If successful, only half damage is sustained and the target is not blinded. Undead creatures suffer 12d6 points of damage and are blinded for 2d6 rounds (if applicable) if their save is failed. They receive 6d6 points of damage and are blinded for 1d6 rounds if the save is successful.\n&emsp;If the gem misses its target, it explodes immediately, causing 3d6 points of damage (or 6d6 against undead) to all creatures within a 3’ radius. It blinds them for 1d3 rounds (1d6 rounds vs. undead). All victims are allowed a saving throw vs. spell, with success indicating half damage and no blindness. The DM should use the rules for grenade-like missiles found in the *DUNGEON MASTER Guide* for determining where the stone hits.'
};

pri6['Spiritual Wrath'] = {
    'level': '6',
    'school': 'Invocation',
    'sphere': 'Combat',
    'range': '300 yards',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': '½',
    'materials': '',
    'reference': 'p. 105',
    'book': 'Tome of Magic',
    'damage': '10d6+1d6/priest up to a max of 22d6',
    'damage-type': '',
    'healing': '',
    'effect': 'This powerful cooperative spell is rarely invoked since it requires the concerted effort of six or more high-level priests. The casting effort severely weakens the priests, discouraging casual use of this spell.\n&emsp;To cast the spell, six or more priests must be within a 15-foot radius. Each priest must cast *spiritual wrath* at the same time. Before beginning the spell, the priests must decide upon the area of effect. The spell causes 10d6+1d6 points of damage per priest casting the spell. (The minimum damage, therefore, is 16d6.) Creatures within the area of effect are allowed a saving throw vs. spell to reduce the damage to half.\n&emsp;The spell strikes as a great wave of force that descends from the sky. Small objects must save vs. crushing blow. Structures suffer damage as if hit by a heavy catapult (2d12). The force of this spell often raises a great cloud of dirt and dust, obscuring the area for 1d4+1 rounds.\n&emsp;The spell’s area of effect is determined by the number of casters. Each priest contributes 10 feet to the radius of the spell. Six casters would create a spell with a radius of 60 feet. No more than twelve casters can cooperate to cast this spell (maximum of 22d6 damage and a 120-foot radius area of effect). This converts to an 8-inch circle in the BATTLESYSTEM rules ground scale.\n&emsp;The spell is difficult to cast, physically taxing the spellcasters so much that each caster suffers 3d10 points of damage from the effort. There is no saving throw allowed to avoid this damage.'
};

pri7['Age Dragon'] = {
    'level': '7',
    'school': 'Alteration',
    'sphere': 'Time',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'One dragon',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'A handful of dirt taken from a dragon’s footprint.',
    'reference': 'p. 105',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the caster to cause any dragon to temporarily gain or lose one age level per five levels of the caster. Currently [[floor([[@{level-priest}]]/5)]] age levels. For instance, a 14th-level caster could cause a dragon to gain or lose two age levels; a mature adult dragon could be temporarily transformed into a young adult dragon or into a very old dragon. A dragon’s age cannot be reduced below hatchling or increased beyond great wyrm.\n&emsp;Unwilling dragons are allowed a saving throw vs. spells with a -4 penalty to avoid the effect.\n&emsp;A dragon affected by *age dragon* temporarily acquires the armor class, hit points, spell abilities, combat modifiers, size, and other attributes of his new age level. The dragon retains his memories and personality. At the end of the spell’s duration, the dragon returns to his normal age level.\n&emsp;If the dragon suffered damage while experiencing his modified age, these hit points remain lost when he resumes his normal age. If the dragon loses more hit points at his modified age than he has at his actual age, he dies when the spell expires. For example, a young adult bronze dragon with 110 hit points is aged to a mature adult with 120 hit points. The dragon suffers 115 hit points in combat. Unless the dragon is healed of 6 points of damage before the spell expires, the dragon dies at the end of the spell since his damage is greater than his actual hit points.\n&emsp;If a dragon is killed while under the effect of *age dragon*, he is dead at the end of the spell’s duration.'
};

pri7['Breath of Life'] = {
    'level': '7',
    'school': 'Necromantic (Reversible)',
    'sphere': 'Necromantic',
    'range': '0',
    'duration': '[[@{level-priest}]] hours',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '*Breath of Life:* The priest’s holy symbol and a cone of incense that has been blessed by the highest priest of the character’s religion. *Breath of Death:* The priest’s holy symbol and a handful of dust taken from a mummy’s corpse.',
    'reference': 'p. 105',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This powerful spell enables the caster to cure many persons (even an entire community) who are afflicted with a nonmagical disease. The priest need not touch or even see the diseased people for the spell to be effective, although recipients must be within the area of effect.\n&emsp;This spell does not cure all diseases in the community at one time; the caster must specifically state which disease is to be eliminated (black plague or yellow fever, for example) with each casting of the spell.\n&emsp;When the spell is cast, the priest exhales a sweet-smelling breath. This forms into a breeze that radiates outward, forming a circle that expands in a 50-yard radius per hour. During this time, the caster must remain at the center of the area of effect. For example, after 12 hours, the *breath of life* would cover a circle 1200 yards in diameter (600-yard radius). The breath is of a magical nature rather than a physical nature; therefore, it is unaffected by prevailing winds.\n&emsp;The breeze blows through the community, instantly eliminating the specified disease from all afflicted citizens. The *breath of life* spell does not destroy parasitic monsters (such as green slime, rot grubs, and others), nor does it cure lycanthropy or other magical afflictions. The spell does not prevent recurrence of a disease if the recipients are again exposed.\n&emsp;The *breath of death*, which produces a foul-smelling wind, is the reverse of this spell. Victims who fail a saving throw vs. death magic are afflicted with a nonmagical, fatal disease. To determine the results of this spell, the DM should roll saving throws for major NPCs in the area of effect. The effect on the rest of the community can be calculated as a percentage, based on the saving throw.\n&emsp;Infected creatures do not heal hit points until the disease is cured. The disease is fatal within 1d6 weeks (the duration varies from person to person).'
};

pri7['Divine Inspiration'] = {
    'level': '7',
    'school': 'Divination',
    'sphere': 'Thought, Divination',
    'sphere-spells&magic': 'Divination',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A gem of at least 500 gp value.',
    'reference': 'p. 106',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is a more powerful version of the *genius* spell. The priest’s player may ask the DM one question about the current situation or about events that will occur within the next five rounds. Questions about the future must relate to external events, such as “Will the guards respond to the sentry’s yell?” Questions cannot refer to the outcome of combat, such as “Will we win the battle?” The priest’s player is allowed to use this spell to ask the DM for advice. In this case, the spell is the equivalent of asking the gods, “Okay, how do we get out of this one?”\n&emsp;Like the *genius* spell, the DM must be careful in adjudicating this spell. The answer to the question is always relevant and correct, although not necessarily complete. The answer can also be cryptic, in the form of a riddle or rhyme, depending on the DM’s assessment of the situation and how potentially unbalancing the answer might be. In general, the answer will be a short phrase of no more than eight to ten words.\n&emsp;This spell can be cast only once in any 24-hour period.'
};

pri7['Hovering Road'] = {
    'level': '7',
    'school': 'Conjuration/Summoning',
    'sphere': 'Travelers',
    'range': '0',
    'duration': '[[@{level-priest}]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A chunk of black marble and a loop of gold wire.',
    'reference': 'p. 106',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to create a magical 10-foot-wide road extending 10 feet in front of him. The caster can create an unbroken road for the duration of the spell, creating a 10-foot area ahead of him as long as he continues to move forward.\n&emsp;The road is approximately one foot thick and hovers in the air. It has the texture and color of black granite. Characters and creatures can move on the *hovering road* at their normal movement rate, ignoring the effects of surrounding terrain.\n&emsp;The *hovering road* must originate from a solid surface. Once anchored, the caster controls the contour of the road, causing it to rise and fall as he wishes. The road can thus be used to traverse rivers (if the road is anchored on the shore), swamps, and similarly hostile terrain. The caster can cause the *hovering road* to rise over a jungle or cross a chasm.\n&emsp;The road has AC 0. It is impervious to non-magical weapons. If the road suffers 100 points of damage (from magical weapons or other magical forces), it dissipates in a black mist; all those on the road fall to the ground below.\n&emsp;Unless the road is destroyed, the entire *hovering road* remains intact from beginning to end for the duration of the spell, even if the caster is killed or incapacitated. At the end of the spell’s duration, the entire road dissipates.'
};

pri7['Illusory Fortification'] = {
    'level': '7',
    'school': 'Illusion/Phantasm',
    'sphere': 'War',
    'range': '240 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '10 turns',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol, a handful of stones, powdered mortar, and a gem worth at least 3,000 gp. All components except the holy symbol are consumed in the casting.',
    'reference': 'p. 107',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The ritual required to cast this spell is time-consuming and extremely complex. As its name implies, *illusory fortification* creates an illusion of a wall of heavy stonework up to 30 feet tall and 160 yards long, topped with crenellations. The illusory wall can be of any color and apparent age, potentially allowing the caster to match the false wall with the real walls of an existing castle. The illusory wall must be continuous (it cannot form two or more shorter walls), but it can follow any corners or bends that the caster desires.\n&emsp;In addition to the wall, the spell creates the illusion of constant movement among the crenellations, as if defending troops were moving atop the wall. The formation of the crenellations makes it impossible for a distant observer to determine exactly how many and what types of defenders are present on the *illusory fortification*.\n&emsp;The illusory wall remains in existence for [[2d12]] hours unless the spell is terminated earlier.\n&emsp;The spell has one very significant limitation: it is strictly two-dimensional and is visible from only one side (the side that the caster deems to be the “outside”). When viewed from the outside, the wall appears real; when viewed from the end, from above, or from the “inside,” the wall is totally invisible except for a faint outline of the shape of the wall. This means that friendly troops, concealed from enemy view by the illusory wall, can see their opponents clearly. The wall is most effective if friendly troops are informed of the wall’s presence and are careful not to walk through the illusion. Such an occurrence does not end the spell, but it will probably advise the enemy of the nature of the wall.\n&emsp;Spells cast at the wall and shots fired at the *illusory fortification* by siege engines appear to strike the wall and inflict normal damage. In reality, the missiles or spells pass through the illusion, possibly striking troops or real fortifications beyond. Such “hits” do not disturb the illusion.\n&emsp;As soon as an enemy unit moves within 10 yards of the *illusory fortification*, the spell terminates and the wall vanishes.\n&emsp;There are two ways in which the spell can be terminated before it expires. First, the priest can terminate the spell at any time. Second, if a friendly unit makes an attack, whether melee or missile combat, through the illusory wall from the “inside” to the “outside,” the spell terminates instantly.\n&emsp;Once the *illusory fortification* has been created, the priest does not need to concentrate on the wall. The spell remains in effect even if the casting priest is killed in the interim.'
};

pri7['Mind Tracker'] = {
    'level': '7',
    'school': 'Divination',
    'sphere': 'Divination',
    'sphere-spells&magic': 'Summoning, Through',
    'range': 'Special',
    'duration': 'Special',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '1 turn/3',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 107',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The mind tracker is a magically-created creature which exists only on the Ethereal plane. It is called into existence when the first portion of this spell is cast.\n&emsp;When seen (which is seldom), the mind tracker has an indistinct body. It seems to be a near-solid coalescence of the vaporous atmosphere of the Ethereal plane itself. It is a roughly elliptical body with three or more limbs protruding at seemingly random locations. The number and size of these appendages shifts slowly, however, as new ones appear from the mist and old ones disappear. The body of the creature averages 2 feet across and 3 feet long, though this, too, tends to vary from minute to minute. The mind tracker has no discernible eyes, ears, nose, or other organs. It cannot be engaged in combat; if attacked, it simply disappears, to reappear after the danger has passed, or somewhere else entirely if its quarry has moved on.\n&emsp;The ceremony which creates the mind tracker takes one turn to perform. Its material components are a whiff of the Ethereal plane’s atmosphere and the brain of a lizard.\n&emsp;Once the tracker is manifested, it must be assigned a quarry within one hour. If no quarry is designated, the tracker dissipates and the spell is wasted.\n&emsp;To assign a quarry to the tracker, the priest must have the quarry within his sight. This includes magical sight such as true seeing, but not remote sighting devices such as crystal balls. With the quarry in sight, the priest mouths the final phrases of the spell. From that point on, the mind tracker is mentally tethered to the victim. It follows its quarry (staying always in the Ethereal plane) wherever it goes. It constantly relays information about the subject to the priest: what it is doing, where it is. The priest does not actually see an image of the quarry, he receives `reports’ from the mind tracker. These reports contain only such information as the tracker can gather by looking. It cannot identify people the quarry is talking to, but can describe them in great detail. Nor can it hear anything the quarry or anyone else says, or read writing, but it recognizes and can report the fact that speaking or reading is happening.\n&emsp;While the tracker is dogging its quarry, its presence can be felt as an eery, creepy sensation of being watched. If the victim makes an initial save vs. paralyzation, each of the following stages lasts three hours instead of two. For the first two hours, the quarry has a general feeling of ill ease. In the third and fourth hours, the victim is distracted and nervous, and suffers a -1 penalty on all saving throws. In the fifth and sixth hours, the victim is convinced someone or something is following him and suffers a -3 penalty on saving throws and a -2 (or -10%) penalty on all other dice rolls. After six hours the victim is near his breaking point. He is unable to concentrate to cast spells or use any of his class’s special abilities. All die rolls have a -5 (or -25%) penalty. After eight hours, he must make a saving throw vs. paralyzation. If he fails, he collapses, fevered and delirious. This state persists until the tracker ceases to exist.\n&emsp;The mind tracker continues to exist for as long as the priest remains conscious of its input. If the priest is knocked out or falls asleep, or simply dismisses his creation, the tracker dissipates.'
};

pri7['Shadow Engines'] = {
    'level': '7',
    'school': 'Illusion/Phantasm',
    'sphere': 'War',
    'range': '240 yards',
    'duration': '8 turns',
    'aoe': '180-yard x 180-yard square',
    'components': 'V, S, M',
    'cast-time': '3 turns',
    'saving-throw': 'None',
    'materials': 'A finely detailed miniature model of a siege engine (of any type), which is consumed during the casting.',
    'reference': 'p. 108',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates the illusion of as many as four siege engines. The casting priest may choose from ballistae, siege towers, catapults, rams, or any combination thereof. Like the creatures created by the spell *shadow monsters*, these illusory engines have at least a tenuous reality and can inflict damage on enemies.\n&emsp;*Shadow engines* are accompanied by illusory crews of the appropriate number and race. The engines can move at a rate of 20 yards per turn and are unaffected by terrain considerations. (The caster can choose to slow them when passing through rough terrain to aid the illusion of reality.)\n&emsp;*Shadow engines* cannot carry real troops. They can be fired at the same rate as real engines of the appropriate type, but a hit causes only one-half the damage normal for that type of engine (round fractions down).\n&emsp;A *shadow engine* remains in existence until the spell duration expires, until an enemy unit approaches within 10 yards, or until it suffers damage from an enemy missile attack. When any of these conditions occur, the engine vanishes. If a single spell has created multiple engines, only the engine struck vanishes; the others remain.\n&emsp;The crew associated with a *shadow engine* must remain with that engine; it cannot move more than 5 yards away from the engine itself.\n&emsp;*Shadow engines* can move independently of other engines created by the spell as long as they remain within the area of effect and remain within 240 yards of the caster. The caster must maintain concentration to control the *shadow engines*. He cannot cast any other spells, and he is limited to a movement rate of 6. If the caster is struck for damage, the *shadow engines* vanish.'
};

pri7['Spacewarp'] = {
    'level': '7',
    'school': 'Alteration',
    'sphere': 'Numbers',
    'range': '50 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '50-foot-diameter sphere',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A lodestone and a sphere of obsidian, both of which are consumed in the casting.',
    'reference': 'p. 109',
    'book': 'Tome of Magic',
    'damage': '1d6 per 10 feet fallen',
    'damage-type': '',
    'healing': '',
    'effect': 'According to one view of the universe, what we perceive as gravity is actually a localized warping of the fabric of space-time. The *spacewarp* spell creates a temporary but very intense warping in a limited area.\n&emsp;When the priest casts this spell, he selects a specific point to be the center of effect. This point may be anywhere within 50 yards of the caster, including in midair.\n&emsp;When the spell is completed, this center of effect gains a gravity field equal to the force felt at the surface of the earth. In other words, gravity is centered at this point; everything within 50 feet of this center that is not attached to something immovable will fall toward the selected point.\n&emsp;This localized gravity affects only loose objects and creatures capable of movement (i.e., not trees, whose roots are buried in the ground). It does not affect the ground itself--soil, plants, desert sand, lake water, etc. are immune to the effect.\n&emsp;An object falling toward the center of gravity gains speed exactly as it would if it were falling toward the ground. When the object reaches the center, it instantly ceases its movement. If objects are already at the center, newly arriving objects will slam into them, causing normal falling damage (1d6 per 10 feet) to the newly arriving objects. Objects previously at the center must save vs. paralyzation or suffer half that amount of damage.\n&emsp;Consider the following example. An orc is 10 feet away from the center of effect when the spell is cast. He falls 10 feet to the center and stops. His companion, a bandit, is 30 feet from the center. It takes him longer to fall to the center, so the orc is already there when he arrives, and the two characters collide forcefully. The bandit suffers 3d6 hit points of damage--the falling damage associated with a 30-foot fall. The orc must save vs. paralyzation or suffer half that amount.\n&emsp;Other things are caught in the effect as well. The bandit’s horse was 50 feet away from the center of effect, so it arrives at the center after the orc and the bandit. It falls 50 feet, suffering 5d6 points of damage, and potentially inflicting half that amount on both the orc and the bandit.\n&emsp;The center of effect can be anywhere within 50 yards of the priest. Possibly one of the most destructive uses of this spell is to cast it directly on an enemy creature. Everyone and everything within 50 feet of that creature falls toward him and strikes him, inflicting damage.\n&emsp;When the spell terminates, gravity returns to normal. If the spell has lifted any characters or objects off the ground, they immediately fall back to the ground, suffering the appropriate amount of falling damage.'
};

pri7['Spirit of Power'] = {
    'level': '7',
    'school': 'Summoning, Invocation',
    'sphere': 'Summoning',
    'range': '0',
    'duration': '1 hour',
    'aoe': 'The casters',
    'components': 'V, S, M',
    'cast-time': '3 turns',
    'saving-throw': 'None',
    'materials': 'An offering appropriate to the deity. The DM determines the exact nature of this offering.',
    'reference': 'p. 109',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This cooperative spell is rarely used or spoken of, since its requirements are strict and the outcome is uncertain. The spell must be cast by six priests of the same faith. All six must touch hands at the time of casting. At the completion of the spell, the priests fall into a trance. The life essences of the priests leave their bodies and merge at a point within 10 feet of the casters. The spirits of the priests meld together to form the avatar of the priests’ deity.\n&emsp;In this manner, the six characters become a single being with all the powers and abilities allowed to that avatar. The only stipulation is that the priests’ deity cannot have created all avatars allowed to it at that moment. If this has happened, the spell fails and the priests are drained as described below.\n&emsp;If the spell succeeds, the priests have completely given their wills over to their deity, essentially forming the vessel into which it funnels power. In becoming the avatar, the priests retain the ability to make most of their own decisions. (The six must work in harmony or allow one of their number to decide all actions.) However, the deity can assume direct control of the avatar at any time it desires--the avatar is, after all, an earthly manifestation of the deity.\n&emsp;Although the spell has a duration of one hour, the deity is not obliged to release the priests at that time. If the priests are not released at the end of the spell’s duration, they instantly die. A deity can choose to sacrifice its priests in order to maintain its avatar on the Prime Material plane. Such a cruel and unjust action is almost never undertaken by good deities or those that have any respect for life, free will, or mercy. For dark and sinister gods, the question is much more uncertain. If a deity chooses to maintain the avatar longer than one hour, control of the avatar instantly and permanently passes to the DM. (Clearly, a DM should seldom if ever exercise this power.)\n&emsp;While the priests are formed into the avatar, their bodies remain in a death like trance. The priests have no idea what might be happening to their real bodies (unless the avatar can observe them). Any damage to a priest’s body requires an instant system shock roll. If successful, the damage is recorded normally, but the damage does not take effect until the spell ends (at which point the priest will almost certainly die). If the system shock roll is failed, the character instantly dies and the spell ends. Characters who die in this manner cannot be raised, resurrected, or reincarnated. They have been taken to the ultimate reward (or punishment) for the service they have rendered. If the bodies are moved from their positions, the spell ends.\n&emsp;Even if the deity releases the priests, they are left severely drained. All spells memorized are lost until the priest can rest and perform his prayers once again. The physical drain leaves each priest with only 1 hit point upon awakening, regardless of the number of hit points the character had when the spell was cast. Since damage suffered during the spell takes effect instantly, any priest who is hurt dies immediately (although quick action by others might save him).\n&emsp;Each priest who survives the spell will be bound by a quest (a duty that must be completed in exchange for calling upon their god).'
};

pri7['Tentacle Walls'] = {
    'level': '7',
    'school': 'Enchantment',
    'sphere': 'Wards',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '50-foot cube',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The dried tentacle of an octopus.',
    'reference': 'p. 110',
    'book': 'Tome of Magic',
    'damage': '1d6',
    'damage-type': '',
    'healing': '',
    'effect': '*Tentacle walls* enables the caster to enchant a single room whose volume is less than or equal to the area of effect. The spell activates 1d4 rounds after any creature other than the caster enters the room. The intruder must be larger than a normal rat; that is, it must be larger than one-half cubic foot or weigh more than three pounds.\n&emsp;When the spell is activated, six black, leathery tentacles sprout inside the room; the tentacles are evenly divided among the room’s surfaces (for instance, if the room is a cube, one tentacle sprouts from the floor, one sprouts from the ceiling, and one sprouts from each of the four walls).\n&emsp;The whip-like tentacles grow to the length of the room and swing wildly. Each round, a tentacle has a 30% chance of striking a random creature in the room, inflicting 1d6 points of damage (save vs. spell for half damage). Each tentacle has AC 0 and 25 hit points. When a tentacle is reduced to 0 hit points, it disappears in a puff of black smoke.\n&emsp;If all creatures are killed or withdraw from the room, the surviving tentacles withdraw, disappearing into the walls. If the spell is activated again, six tentacles reappear; new tentacles are created to replace any destroyed previously. As long as one tentacle survives an encounter, the tentacles will continue to be replaced. Only when all six tentacles are destroyed is the spell permanently negated.'
};

pri7['Timelessness'] = {
    'level': '7',
    'school': 'Alteration',
    'sphere': 'Numbers',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] days',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'Negate',
    'materials': 'A gem worth at least 1,000 gp and a small cylinder of obsidian. Both are crushed during the casting.',
    'reference': 'p. 110',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell totally stops the flow of time for a single individual. All signs of life stop and the subject is incapable of any movement or thought. While the spell is in effect, the subject is totally immovable and cannot be affected by any physical or magical forces. Weapons simply bounce off the subject as they would bounce off the hardest stone. Spells, including *dispel magic*, are totally incapable of affecting the subject in any way. The subject does not age.\n&emsp;Aside from the fact that the subject remains visible, frozen in place like a statue, he is effectively no longer part of the universe. (DMs may rule that the most powerful of magics, such as *wishes*, and creatures of demigod or higher status can affect the subject.)\n&emsp;When the priest casts the spell, he or she states the duration for which the spell will remain in effect (the maximum is one full day per level of the caster). Once the spell is cast, this duration cannot be changed; the priest cannot terminate the spell before the stated time has elapsed.\n&emsp;If the subject is unwilling to be affected by the spell, the priest must touch the victim for the spell to take effect; the subject receives a normal saving throw to resist the effects. A willing subject need not make a saving throw.\n&emsp;The priest may cast this spell on himself if desired. This spell can provide a powerful defensive maneuver; while the spell is in effect, the subject is totally invulnerable. *Timelessness* is also an effective form of long-term imprisonment, as long as the priest is around to cast the spell again at the appropriate time.\n&emsp;This is an exceptionally powerful spell. Casting it puts a significant strain on the priest. Each time he casts *timelessness*, the priest must make a system shock roll. If the priest fails this throw, he or she permanently loses 1 point of Constitution.'
};

pri7['Uncontrolled Weather'] = {
    'level': '7',
    'school': 'Conjuration/Summoning',
    'sphere': 'Chaos',
    'range': '0',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[4d4]] square miles',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 111',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the caster to summon weather that is either appropriate or inappropriate to the climate and season of the region. The summoned effects are always dramatic--cool breezes or light fog will not appear. Instead, torrential floods will assault a desert, a heat wave will rage in polar wastelands, and tornadoes and hurricanes will rip across gentle landscapes. A blizzard might spring up in summer or a tornado might materialize in the winter.\n&emsp;The spellcaster has no influence over the weather pattern that emerges. He cannot control the area of effect or the duration of the weather.\n&emsp;Four turns after the spell is cast, the trend of the weather will become apparent--a sudden chill, gust of wind, overcast sky, etc. The *uncontrolled weather* arrives on the fifth turn. Once the weather has arrived, it cannot be dispelled. If the spell is canceled by the caster before the beginning of the fifth turn, the weather slowly reverts to its original condition.\n&emsp;The effects of the spell are the decision of the DM. The effects should be grand and impressive. Following are suggested effects of the weather.\n&emsp;*Torrential Rain/Blizzard:* Visibility is reduced to 100 yards or less; travel is nearly impossible due to water or heavy snow on the ground.\n&emsp;*Storm/Hurricanes:* All flying creatures are driven from the skies; trees are uprooted; roofs are torn off; ships are endangered.\n&emsp;*Heat Wave:* Intense heat immediately causes ice bridges to melt; avalanches of snow and ice roll down mountains.\n&emsp;The DM determines the area of effect randomly. The maximum duration of the spell is one turn per level of the caster; however, the DM may cancel the effect after a shorter time.'
};

const priq = {};
priq['Abundance'] = {
    'level': 'q',
    'school': 'Alteration',
    'sphere': 'Creation, Plant',
    'range': '0',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': '',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 112',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting an *abundance* spell, the priest quickens the ripening of a harvest or the growth of woodland. Fields of crops in the affected area will grow, ripen, and be ready for harvest in a single day. Seed must be sown any time before the casting of the spell.\n&emsp;An area of woodland will grow as if it had grown for 25 years in one day plus five years per day for another three days. There must be soil capable of supporting the woodland for the growth to remain healthy.\n&emsp;The priest must stand anywhere within the area to be affected. The priest designates the exact size and shape of the area in the casting.\n&emsp;The area of effect is 10 square miles for ripening a harvest and 25 square miles for woodland growth. This spell does not create effects such as entanglement or enlargement of the flora within the area of effect.'
};

priq['Animal Horde'] = {
    'level': 'q',
    'school': 'Conjuration/Summoning',
    'sphere': 'Animal, Summoning',
    'range': '0',
    'duration': '1 day',
    'aoe': '10-mile radius',
    'components': '',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 112',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This potent spell summons a number of animals to the priest. For each level of the priest, a number of animals totaling 10 hit dice appear. Currently [[10*[[@{level-priest}]] ]] hit dice.\n&emsp;The Power who grants the spell enables the priest to know exactly what types and numbers of animals are within the area of effect. The priest may specify the numbers of animals he wants; for instance, a 16th-level priest could summon 60 HD of wolves, 40 HD of bears, and 60 HD of wolverines. The animals will begin arriving in one round and will be assembled at the priest’s location at the end of three turns.\n&emsp;The animals will not fight among each other even if they are natural enemies. Monsters (dragons, gorgons, hell hounds, etc.) cannot be summoned with this spell.\n&emsp;The summoned animals will aid the priest in any means of which they are capable. They will enter battle, protect the priest and his companions, or perform a specified mission until the priest dismisses them or the spell expires. During this time, the priest can automatically communicate with his animals.\n&emsp;At the end of the spell, the animals instinctively return to their lairs. For the first three turns after the spell expires, the animals will not attack the caster, his companions, or other summoned animals. After this time, the animals will behave normally.'
};

priq['Circle of Sunmotes'] = {
    'level': 'q',
    'school': 'Alteration, Invocation/Evocation, Necromancy',
    'sphere': 'Sun',
    'range': '200 yards',
    'duration': '3 turns',
    'aoe': '60-foot-radius hemisphere',
    'components': '',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 112',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '*Sun motes:* 1d4+1. *Miniature sun*: 1d8+2',
    'healing': '*Sun mote: *1d6. *Miniature sun:* 1d8+2',
    'effect': 'By casting *circle of sunmotes*, the priest creates a hemispherical shell filled with sparkling, glowing motes of bright sunlight. A one-foot radius globe of sunlight appears at the height of the caster’s head in the exact center of the circle.\n&emsp;Creatures within the area of effect who are friendly to the cleric experience the glowing motes as warm, invigorating, inspiring, and healing. They are healed for 1d6 hit points, gain the benefit of an aid spell for 1 turn after the *circle of sunmotes* is created, gain +1 bonuses to all attack and damage rolls, and gain a +2 bonus to morale.\n&emsp;Enemies of the priest experience the same sunmotes as blinding, burning, and damaging. They must save versus spell or be blinded for 1 turn after the sunmotes are created. Each enemy is struck by a small fiery mote causing 1d4+1 points of damage (no saving throw is allowed, but creatures with magical fire resistance suffer only half damage), and suffers a -2 penalty to morale.\n&emsp;Companions of the cleric who step within 10 feet of the glowing miniature sun at the center of the effect are healed of 1d8+2 hit points. This affects each creature only once during the spell’s duration.\n&emsp;Enemies of the priest who come within 10 feet of the minisun are burned for 1d8+2 points of fire damage. No saving throw is allowed, but creatures possessing magical resistance against fire suffer only half damage.\n&emsp;Companions of the priest who are outside the area of effect view enemies within the circle as if they are affected by golden *faerie fire*. Creatures affected by the faerie fire suffer a -2 penalty to armor class from attacks by creatures outside the circle.\n&emsp;Enemies of the priest outside the circle view the priest’s allies as if obscured by a blinding light and suffer a -2 penalty to missile attacks against them.'
};

priq['Conformance'] = {
    'level': 'q',
    'school': 'Conjuration/Summoning, Invocation',
    'sphere': 'Law',
    'range': '0',
    'duration': '6 turns',
    'aoe': '80-foot-diameter sphere',
    'components': '',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 113',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *conformance* spell has a simple principle with a profound effect: probable events always manifest.\n&emsp;In game terms, this means that events with a probability of 51% or better always occur. Thus, if a saving throw of 9 is required to avoid an effect, no roll is necessary; the save is automatically successful. If a warrior must roll 10 or better to hit an enemy, he automatically hits.\n&emsp;Conversely, improbable actions (those with less than a 50% chance) always fail. If a warrior must roll 12 or better to hit an enemy, he automatically fails. If a thief’s chance to hide in shadows is 49%, he automatically fails.\n&emsp;There are two conditions that affect this spell. First, a *prayer* spell is continuously operative in the area of effect, shifting the balance of combat probabilities toward the favor of the priest who casts this spell and his companions. Second, probabilities of exactly 50% always shift in favor of the spellcasting priest. For example, if a roll of 11 or better is needed to save against a spell effect, this is a 50% chance for success. In such cases, the priest and his friends always make the save and enemies always fail.\n&emsp;This spell is particularly potent if *bless* and *chant* spells are cast in the area of effect.'
};

priq['Elemental Swarm'] = {
    'level': 'q',
    'school': 'Conjuration/Summoning',
    'sphere': 'Elemental, Summoning',
    'range': '240 yards',
    'duration': '6 turns',
    'aoe': 'Special',
    'components': '',
    'cast-time': '3 turns',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 113',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to open a portal to one elemental plane of his choice (as appropriate for his patron Power). He can then summon elementals from that plane.\n&emsp;After the first turn of casting, 3d3 elementals of 12HD each appear; after the second turn, 2d3 elementals of 16HD each appear; after the third turn, 1d3 elementals of 20HD each appear. Each elemental has at least 5 hit points per hit die. The elementals remain for six turns from the time they first appear.\n&emsp;These elementals will obey the priest explicitly and cannot be turned against the caster. The priest does not need to concentrate to maintain control over the elementals. They cannot be dismissed with spells such as *dismissal*; the elementals remain for the duration of the spell.'
};

priq['Etherwalk'] = {
    'level': 'q',
    'school': 'Alteration',
    'sphere': 'Astral, Travelers',
    'range': 'Special',
    'duration': 'Special',
    'aoe': 'Special',
    'components': '',
    'cast-time': '5 rounds',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 113',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell, the priest transports himself and as many as 50 followers (who must join hands at the time of casting) to the Border Ethereal. Unwilling creatures are allowed a saving throw at a -4 penalty to avoid transportation.\n&emsp;The spell then allows the priest and his party to make as many as three round-trip journeys to and from the Inner Planes. It then allows them to return to the Prime Material plane.\n&emsp;Travel rates in the Ethereal plane are at four times normal speed. Travel times for locating or searching along curtains are all at the minimum time possible. Encounters with monsters occur at one-fifth the normal frequency. The priest and his party are not affected by the ether cyclone.\n&emsp;The spell expires when the priest and his party return to the Border Ethereal from an inner plane for the third time. They are then instantly transported to the Prime Material plane.'
};

priq['Fear Contagion'] = {
    'level': 'q',
    'school': 'Abjuration',
    'sphere': 'Charm, War',
    'range': '240 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': '',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 114',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A priest casting *fear contagion* selects a single creature to be the focus of the spell. The creature is affected by magical fear and receives no saving throw to avoid the effect. All creatures within 10 yards of the target creature must make a saving throw versus spell with a -4 penalty; failure indicates that they are also affected by fear.\n&emsp;If BATTLESYSTEM rules are used, the spell forces the affected unit to make a Morale Check at a -6 penalty. If this roll fails, the unit automatically routs.\n&emsp;Creatures affected by fear will flee in a direction away from the spellcaster for as long as they are able to run (refer to Chapter 14 of the *Player’s Handbook* for rules). Such creatures will then spend one full turn cowering after being forced to rest. During this time, affected creatures suffer -4 penalties to attack rolls, and all dexterity bonuses are negated.\n&emsp;When using BATTLESYSTEM rules, fear-struck creatures are permitted rally tests with a -3 penalty and must engage in rout movement until they rally. However, a rally test is not permitted until two turns of rout movement have been completed.\n&emsp;As creatures run in fear, their fear is contagious. Any creature that comes within 10 yards of a creature affected by this spell must make a saving throw (no penalties) or be forced to flee from the spellcaster. In BATTLESYSTEM rules, creatures make a standard Morale Check with a -3 penalty.\n&emsp;Creatures affected by fear no longer cause fear in others after they have passed one mile from the original center of the spell effect.'
};

priq['Health Blessing'] = {
    'level': 'q',
    'school': 'Necromancy',
    'sphere': 'Healing, Necromantic',
    'range': '100 yards',
    'duration': '[[@{level-priest}]] days',
    'aoe': '50 creatures',
    'components': '',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 114',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Health blessing* provides a number of human, demi-human, or humanoid creatures with protection against ill health; it also enables subjects to heal others.\n&emsp;Recipients of a *health blessing* are immune to nonmagical disease, gain a +4 bonus to saving throws versus poison and death magic, and can cast *cure light wounds* on themselves once per day for the duration of the spell. In addition, a recipient of *health blessing* can heal one other creature per day as a paladin does by laying hands. The healing conferred is 1 hit point per level or hit die of the healer.'
};

priq['Highway'] = {
    'level': 'q',
    'school': 'Alteration, Evocation',
    'sphere': 'Travelers',
    'range': '0',
    'duration': '1 day',
    'aoe': '1,000 square yards',
    'components': '',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 114',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *highway* spell creates a shimmering plane of force that acts as a magical conveyor for the priest. By standing at the forward edge of the 10 x 100 yard plane, the priest and as many followers as can fit onto the square can travel as outlined below.\n&emsp;The *highway* travels 30 miles per hour (MV 88) over all terrains. The priest sets the height of the *highway* in a range from 1 foot to 100 yards above ground level. The *highway* moves as the priest wills; if the priest wishes to fix a destination in his mind, the *highway* will take the shortest route to that destination until the priest changes the course in his mind.\n&emsp;The *highway* cannot be used offensively. It will automatically travel over or around obstacles such as buildings and large creatures. It protects creatures traveling on it from adverse effects of the elements (ice, rain, gales, etc.). The *highway* can hover in place, but hovering can be achieved only at a height of 12 inches above ground level.\n&emsp;When the spell expires or the destination is reached, the *highway* gently lowers the priest and his party to the ground. The priest may order the *highway* to drop off creatures and collect others at intermediate destinations, although the priest who cast the spell must remain on the *highway* or it will disappear.'
};

priq['Imago Interrogation'] = {
    'level': 'q',
    'school': 'Divination, Enchantment/Charm',
    'sphere': 'Astral, Divination, Time',
    'range': '0',
    'duration': 'Special',
    'aoe': 'The caster',
    'components': '',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 116',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The imago is a mental image--a form of mental magical body. After casting this spell (requiring 1 turn), the caster falls asleep. After [[1d6]] turns of sleep, the imago of the priest begins to travel. The imago is not subject to any forms of attack and has no effective attacks.\n&emsp;The imago may travel to as many as four different locations separated by any distance, even across the planes and/or backward in time. At these locations, the imago may interrogate the imagos of as many as 10 other sentient creatures (other than Powers), compelling them to reply truthfully to its questions. A maximum of 40 questions may be asked during the spell duration.\n&emsp;Asking one question and listening to the reply takes 4 rounds of time in the caster’s world. Each planar/time jump lasts 3 turns in that world.\n&emsp;Imago communications are telepathic. The questions must be able to be answered in a sentence of reasonable length, or the interrogated creature becomes confused and cannot answer.\n&emsp;The imagos of interrogated creatures will have no recollection of their interrogations. As a result, history cannot be changed through backward time travel using this spell.'
};

priq['Implosion/Inversion'] = {
    'level': 'q',
    'school': 'Invocation',
    'sphere': 'Numbers, Combat',
    'range': '120 yards',
    'duration': 'Special',
    'aoe': 'One or more creatures',
    'components': '',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 116',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By use of this spectacular spell, the priest rearranges the extradimensional and spatial geometries of the molecules of one or more creatures. The result is that the rearrangement of the target creature causes it to implode (collapse inward upon itself) or invert (its insides become its outsides and vice versa).\n&emsp;The result is usually inversion, unless the target would not be adversely affected by this process (e.g., a slime, ooze, golem, elemental, etc.). In this case, implosion takes place. In either case, the effect kills/destroys the target instantaneously unless it makes a successful saving throw versus death magic at a -4 penalty.\n&emsp;The priest can affect one creature per round with this spell. After each round, the priest must make a Constitution check. If this fails, the priest is overwhelmed with the effort of sustaining the spell, at which time the spell terminates, leaving the priest fatigued (the equivalent of being stunned) for 1d4 rounds. The maximum possible duration of the spell is 3 turns.'
};

priq['Interdiction'] = {
    'level': 'q',
    'school': 'Abjuration',
    'sphere': 'Chaos, Law, Wards',
    'range': '240 yards',
    'duration': '1 day',
    'aoe': '[[200*[[@{level-priest}]] ]]-foot cube',
    'components': '',
    'cast-time': '2 turns',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 116',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This powerful spell affects all enemies of the spellcasting priest who enter the area of effect. The spell inflicts a -2 penalty on saving throws, a -1 penalty to armor class, and a -1 penalty to attack and damage rolls. Creatures friendly to the cleric gain corresponding bonuses--+2 to saving throws, +1 to attack and damage rolls, and a bonus of 1 to AC. Additional effects are possible, depending on the Power granting the spell; effects must correspond (or at least not conflict) with the spheres the priest normally uses. Multiple effects are possible.\n&emsp;The variation for the Sphere of Wards requires that each hostile creature entering the area of effect make a saving throw vs. spells with a -4 penalty or suffer 4d6 points of damage. An affected creature must then flee the area; it is unable to return. The creature must make a second saving throw vs. spell with a -4 penalty as it leaves the area or be blinded until magically cured.\n&emsp;The variation for the sphere of Law requires that a hostile creature make a saving throw every time it wishes to change an action. Thus, if a creature wishes to stop running and draw a weapon, a successful save is needed or the creature continues to run. Actions that cannot be continued (e.g., firing an arrow if the archer has no more arrows) are repeated as empty automatisms. In addition, creatures hostile to the priest automatically fail saving throws against Enchantment/Charm spells cast by the priest.\n&emsp;The variation for the Sphere of Chaos requires that hostile creatures make saving throws vs. spells at -4 or be affected by *confusion* (as per the spell). Affected creatures have a 5% chance per round of suddenly being attacked by a *phantasmal killer*.\n&emsp;All creatures who enter the area of effect are subject to the effects of the spell. All effects except blindness cease 3 rounds after an affected creature leaves the area. Creatures reentering the area of effect must make new saving throws.'
};

priq['Mindnet'] = {
    'level': 'q',
    'school': 'Divination, Enchantment/Charm',
    'sphere': 'Thought',
    'range': '0',
    'duration': '12 turns',
    'aoe': 'Special',
    'components': '',
    'cast-time': 'Special',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 117',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The priest casting a *mindnet* spell establishes a telepathic link with as many as 10 other creatures who may be separated from each other by as much as 10 miles. Thus, a chain of creatures 100 miles long could be established.\n&emsp;The Power granting this spell has the final word on the individuals who may be included in the spell. Most commonly, the spell will be cast to include individuals familiar to the caster. However, depending on the purpose of the spell, the Power may allow a stranger known to the caster only by name to be included in the *mindnet*.\n&emsp;Unwilling creatures must make a saving throw at a -4 penalty to avoid being included in the *mindnet*.\n&emsp;Casting the spell requires one round per two creatures in the *mindnet*. The spell’s duration begins after all affected creatures have been linked. Characters of any class may take part in this linkage, benefiting from several effects.\n&emsp;First, each member of the *mindnet* benefits from Intelligence, Wisdom, and Dexterity bonuses. The bonuses are equal to the bonuses held by the member of the *mindnet* with the highest ability score. For example, if five creatures in a *mindnet* have Wisdom scores of 15, 15, 16, 17, and 18, each creature would make saving throws, ability checks, and the like as if he had a Wisdom score of 18. Bonus spells are not gained due to enhanced Wisdom, however.\n&emsp;Second, spells may be pooled among the spellcasters within the *mindnet*. Any priest may use a spell memorized by another priest with two conditions: the priest who has memorized the spell must allow its use; and a priest “borrowing” a spell may use only spells of levels he could normally cast. Such borrowing still causes the spell to be lost from the mind of the caster who memorized it. A caster may *not* borrow spells outside his normal class restrictions. Priests and wizards within a *mindnet* cannot mix their priestly and wizardly spells, nor can a specialist borrow a spell from an opposition school.\n&emsp;Third, each member of the *mindnet* is in constant mental communication. Each member knows what is happening at the locations of all other members.\n&emsp;Finally, twice per turn, the priest casting this spell can instantly teleport any person linked by the *mindnet* to any other person who is also a part of the spell. This massive effort results in a +4 penalty to any Constitution checks made by the priest.\n&emsp;The priest casting the spell cannot perform any other actions while the *mindnet* exists; if he does, the spell is canceled. The priest must make a Constitution check at the end of each turn in order to sustain the spell. A failed check cancels the *mindnet*. The spell can last a maximum of 12 turns.'
};

priq['Planar Quest'] = {
    'level': 'q',
    'school': 'Alteration',
    'sphere': 'Astral',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Special',
    'components': '',
    'cast-time': '5 rounds',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 117',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By joining hands with as many as 12 companions and casting this spell, the priest transports his party to any other plane of existence. The priest and his party may arrive at a specific location in a plane (if one is known) or at an unknown destination. Travel time to the destination, whether known or unknown, will always be at the minimum possible. In an inner plane, a friendly guide will always be available to the priest. Hostile encounters occur at one-fifth normal frequency.\n&emsp;Unwilling creatures are allowed a saving throw at a -4 penalty to avoid being transported.\n&emsp;In the inner planes, the party is magically protected in any means necessary for survival. The party does not need to eat, drink, or rest if conditions make these activities impossible. Party members are immune to fire in the elemental plane of fire, and similar immunities are granted by the Power in other planes as necessary. The party can move through any terrain (including the elemental plane of Earth) at its normal movement rate.\n&emsp;In the outer planes, similar immunities apply. The priest is also granted a *power compass* (described in *Manual of the Plane*). Hostile encounters in an outer plane occur only half as often as normal.\n&emsp;The duration of this spell is decided by the Power who grants it. Normally, it is sufficient to allow the priest and his party to undertake the quest that the Power has set forth. When the quest has been completed successfully or has failed beyond recovery, the priest and his party are returned to the Prime Material plane.'
};

priq['Preservation'] = {
    'level': 'q',
    'school': 'Abjuration',
    'sphere': 'Wards',
    'range': '480 yards',
    'duration': 'Special',
    'aoe': 'One structure',
    'components': '',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 118',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a powerful set of protective wards that operate on a single fortified building, temple complex, tower, or similar structure. These wards protect the physical integrity of the structure and prevent magical access.\n&emsp;A building protected by *preservation* suffers only 25% of normal structural damage from sources such as siege engines, earthquakes (both natural and magical), and powerful weather-affecting spells. Spells which directly affect the physical integrity of the structure (e.g., *passwall, stone shape, transmute rock to mud*) simply fail when cast on the protected building.\n&emsp;*Preservation* creates a permanent *protection from evil* spell on the affected building. Every surface of the building benefits from the effects of the spell.\n&emsp;Magical spells allowing access to the building fail. Thus, creatures attempting to *teleport* or *fly* into the building are stopped. Birds and creatures with natural flight may enter the building normally.\n&emsp;If the building is a temple (or other consecrated building) dedicated to the Power that granted the spell, all priests inside it gain the benefit of a *sanctuary* spell for the duration of the *preservation*.\n&emsp;The *preservation* spell expires if the building is destroyed or after 60 days have passed.'
};

priq['Revelation'] = {
    'level': 'q',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': 'Special',
    'duration': '1 day',
    'aoe': 'Special',
    'components': '',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 118',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *revelation* spell grants the priest extraordinary divination powers. He gains the following abilities that are effective to a range of 240 yards.\n&emsp;•The priest gains *true seeing* as per the 5th-level priest spell.\n&emsp;•The priest can see and identify all priest spell effects in the area (assume a line of sight in a 60° arc).\n&emsp;•The priest is instantly aware of any creature’s attempt to lie to him.\n&emsp;•The priest can communicate with animals, creatures, and monsters of all types. He\n&emsp;can communicate with any number of creatures, but may converse with only one at a\n&emsp;time.\n&emsp;•The priest can communicate telepathically with humanoids.\n&emsp;•The priest may use a suitable item as a *crystal ball* once per hour, as per the magical item described in the *DMG* (including range). He gains a +20% bonus to all rolls to determine success.'
};

priq['Reversion'] = {
    'level': 'q',
    'school': 'Alteration, Invocation',
    'sphere': 'Time',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': '10-foot-radius sphere',
    'components': '',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 118',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell, the priest reverses certain recent events in the area of effect. The spell affects only creatures friendly to the priest. The magic takes effect immediately after the spell is completed rather than at the end of the round.\n&emsp;All damage suffered by the priest’s allies during the previous turn is undone. This includes energy drains, poison, and all special attack forms *unless* these resulted in instantaneous death. Death from cumulative physical damage is undone, however. Any creature brought back to life by the *reversion* spell is not required to make a resurrection survival roll.\n&emsp;Any spells cast by the priest’s allies during the previous turn are restored and may be used again. This does not apply to magical or spell-like effects from magical items or scrolls. Material components consumed in spellcasting during this time are also restored.\n&emsp;The *reversion* spell affects only creatures and characters. Equipment and magical items are not affected.\n&emsp;Casting this spell ages the priest one year.'
};

priq['Robe of Healing'] = {
    'level': 'q',
    'school': 'Enchantment, Necromancy',
    'sphere': 'Healing',
    'range': 'Touch',
    'duration': '1 hour',
    'aoe': 'One robe',
    'components': '',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 119',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '1d4+4',
    'effect': 'This spell enchants the priest’s robe or cloak, enabling him to walk among wounded creatures and heal them. By touching the robe, a wounded creature is cured of 1d4+4 hit points. As many creatures as can physically touch the robe within the spell duration can be healed. A reasonable maximum is 20 creatures per round, allowing a total of 1,200 creatures to be healed. A creature can be affected only once per week by the *robe of healing*.'
};

priq['Siege Wall'] = {
    'level': 'q',
    'school': 'Alteration, Invocation',
    'sphere': 'Creation, Guardian',
    'range': '480 yards',
    'duration': 'Special',
    'aoe': 'One building',
    'components': '',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 119',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *siege wall* uses magical energy to fortify all external areas of a fortified building, such as walls, battlements, drawbridges, and gates. External surfaces to be protected must be contiguous.\n&emsp;The protective effects of the *siege wall* are compatible with BATTLESYSTEM rules (see Chapter 7). Creatures assaulting the protected building have their movement rates reduced by half when trying to scale the exterior surfaces (scaling ladders, etc.). Attackers suffer a -2 penalty to damage rolls for missile fire.\n&emsp;Damage or AD caused by war machines is reduced by 2 die levels (if normal damage is 1d12, 1d8 is rolled instead; if damage is 1d10, 1d6 is rolled; ballista has AD8). Damage caused by crushing engines is rolled at -2 to the damage roll or ADs. Hits or hit points of crushing engines are reduced by half.\n&emsp;All enemies attacking a building protected by *siege wall* who enter an enclosed wall space are out of command unless they are in the line of sight of their commander, regardless of his control diameter.\n&emsp;All exterior areas of the fortification have their hit points or Hits doubled (see Hits of Building Features in BATTLESYSTEM rules).\n&emsp;The *siege wall* expires if the building is destroyed; it lasts a maximum of 24 hours.'
};

priq['Shooting Stars'] = {
    'level': 'q',
    'school': 'Conjuration, Invocation',
    'sphere': 'Combat, Sun, Weather',
    'range': '120 yards',
    'duration': 'Instantaneous',
    'aoe': '40-yard radius',
    'components': '',
    'cast-time': '1 round',
    'saving-throw': '½',
    'materials': '',
    'reference': 'p. 119',
    'book': 'Tome of Magic',
    'damage': '[[6d10]] Fire and Electrical + 48',
    'damage-type': '',
    'healing': '',
    'effect': 'A priest casting *shooting stars* creates a violent turbulence in the air above the area of effect, from which a number of fiery-orange, electrically-charged miniature fireballs erupt and shower onto the ground. Within the area of effect, all creatures suffer 6d10 points of combined fire and electrical damage. A successful saving throw at a -4 penalty indicates half damage.\n&emsp;In addition, four large *shooting stars* materialize within the area of effect. The priest can individually target these at specific creatures. If creatures are not specified, the targets are randomly selected. Each shooting star causes 48 points of damage on impact (no saving throw is allowed). Any creature within 10 feet of impact suffers 24 points of fire damage (half-damage if a saving throw at -4 is successful).'
};

priq['Sphere of Security'] = {
    'level': 'q',
    'school': 'Abjuration',
    'sphere': 'Protection',
    'range': '0',
    'duration': '6 turns',
    'aoe': '10-foot-radius sphere',
    'components': '',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 119',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Sphere of security* protects the priest who casts the spell and his companions within the area of effect. Enemy creatures within the area are unaffected.\n&emsp;The sphere grants affected creatures a +2 bonus to armor class, a +2 bonus to all saving throws vs. magic, and 50% magic resistance. Casting this portion of the spell requires 1 round.\n&emsp;In addition, the priest can specify as many as four additional specific protection effects from the List of Protection Scrolls in Appendix 3 of the *DMG*. Each additional protection lengthens casting time by 1 round. The priest may create one effect per 5 levels of his experience, to a maximum of four effects. Currently [[{[[floor(@{level-priest}]]/5),4}kl1]] effects'
};

priq['Spiral of Degeneration'] = {
    'level': 'q',
    'school': 'Enchantment/Charm, Invocation',
    'sphere': 'Chaos, Thought',
    'range': '0',
    'duration': '6 turns',
    'aoe': '50-foot-diameter sphere',
    'components': '',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 120',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This potent spell affects all creatures hostile to the priest within the area of effect. The Power granting the spell causes the spell’s effects to manifest in one of two ways: the Chaos variation or the Thought variation.\n&emsp;In the Chaos variation, the fabric of reality is altered to change events. Magical items dysfunction because the fabric of magical reality is changed.\n&emsp;In the Thought variation, the thoughts of the victims of the spell are distorted and altered so that they find themselves unable to function coherently and effectively. Magical items dysfunction because the thoughts of their users are warped to either convince them that the items cannot function or block thought so that proper commands cannot be given.\n&emsp;The effects on the victims of the spell are the same for both variations. Each round, there is a 50% chance that a degeneration effect will occur in the area of effect. When this occurs, two events take place. First, spellcasters lose one spell from each level of spell currently memorized (e.g., a spellcaster who has memorized three spells each from levels 1 through 3 loses one spell from each level for a total of three). Lost spells may be regained normally through rest and memorization.\n&emsp;Second, magical items are affected in the following ways:\n&emsp;•Weapons and armor lose one level of enchantment (a *sword +3* becomes a *sword +2*, etc.).\n&emsp;•Magical items that carry charges (wands, rods, staves, etc.) are drained of 1d10 charges.\n&emsp;•Magical items without pluses or charges must make a saving throw versus spell (using the saving throw of their owner) or become nonmagical.\n&emsp;•Potions lose all magic and scrolls lose one randomly determined spell.\n&emsp;•Permanent magical items (swords, boots, armor, etc.) temporarily lose all effects until the spell expires or until the items leave the area of effect and for 1d10 rounds thereafter.\n&emsp;Single-use and charged items are permanently affected by this spell. A potion destroyed by this spell remains useless even after the spell ends.\n&emsp;Within the area of effect, magical communication is impossible due to thought blocks and chaotic effects. No communication magic (*ESP*, *sending*, etc.) will function; any spellcaster trying to cast such a spell will be stunned for 1 round per level of the spell he attempts to cast. A reverse of the *tongues* spell operates continuously in the area of effect. Telepathic communication (e.g., with a familiar) is also impossible.\n&emsp;In the Chaos variation of the spell, the center of the area of effect moves 10’ per round. The direction is randomly determined using 1d8 roll and compass points (1N, 2NE, 3E, 4SE, 5S, 6SW, 7W, 8NW). The radius of the spell effect will never exclude the priest who cast the spell; re-roll any result that leads to this occurrence.'
};

priq['Stalker'] = {
    'level': 'q',
    'school': 'Conjuration/Summoning',
    'sphere': 'Creation, Guardian, Plant',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': '',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 120',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A priest casting this spell conjures [[1d4+2]] plant creatures which have statistics identical to shambling mounds of 11HD. These creatures will aid the caster in combat or battle, perform a specific mission, or serve as bodyguards. The creatures remain with the priest for seven days unless he dismisses them. If the *stalkers* are summoned only for guard duty, however, the duration of the spell is seven months. In this case, the *stalker*s can only be ordered to guard a specific site or location.\n&emsp;The *stalkers* gain resistance to fire as per shambling mounds *only* if the terrain is suitable (marshy, close to a body of water, etc.)'
};

priq['Storm of Vengeance'] = {
    'level': 'q',
    'school': 'Evocation',
    'sphere': 'Elemental, War, Weather',
    'range': '400 yards',
    'duration': '1 turn',
    'aoe': '120-yard radius circle',
    'components': '',
    'cast-time': '1 turn',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 121',
    'book': 'Tome of Magic',
    'damage': '*Round 2:* 1d4+1 Acid. *Round 3*: 8d8 Lightning. *Round 4* 3d10.',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell requires the priest to concentrate and cast the spell for the full duration of the spell. The casting time and duration are simultaneous; both activities occur in the same turn.\n&emsp;In the first round of casting, the priest summons an enormous black storm cloud over the area of effect. Lightning and crashing claps of thunder appear within the storm; creatures in the area of effect must make a saving throw or be deafened for 1d4 turns.\n&emsp;On the second round, acid rains down in the area, inflicting 1d4+1 points of damage. No saving throw is allowed.\n&emsp;On the third round, the caster calls six lightning bolts down from the cloud. Each is directed at a target by the priest (all may be directed at a single target or they may be directed at six separate targets). Each lightning bolt strike causes 8d8 points of damage (a successful saving throw indicates half damage).\n&emsp;On the fourth round, hailstones rain down in the area, causing 3d10 points of damage (no saving throw).\n&emsp;On the fifth through tenth (and final) rounds, violent rain and wind gusts reduce visibility to five feet. Movement is reduced 75%. Missile fire and spellcasting from within the area of effect are impossible.\n&emsp;The sequence of effects ceases immediately if the priest is disrupted from spellcasting during the 1 turn duration of the spell. The priest may opt to cancel the effects at any time.'
};

priq['Transformation'] = {
    'level': 'q',
    'school': 'Alteration, Enchantment, Illusion',
    'sphere': 'Numbers',
    'range': '0',
    'duration': '3 turns',
    'aoe': '100-yard-radius sphere',
    'components': '',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 121',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *transformation* spell allows the priest to alter extradimensional and relative geometries within the area of effect. This enables the priest and his companions to use extradimensional links to facilitate rapid movement as follows.\n&emsp;All allies of the priest are able to *blink* (as per the 3rd-level wizard spell) once per round, with the ability to select the direction of movement.\n&emsp;As many as 10 creatures (designated by the priest at the time of spellcasting) can use the *teleport without error* spell. They may teleport anywhere within the area of effect of the *transformation* spell once during the duration of the spell.\n&emsp;As many as 10 creatures (specified by the priest at the time of spellcasting) gain abilities as if wearing *boots of striding and springing* for the spell duration.\n&emsp;At any time during the spell, the priest and as many as 10 other creatures can be affected as per a *shadow walk* spell. Creatures to be affected must stand in a circle and touch hands. As soon as the priest who cast the *transformation* spell leaves the area of effect via the shadow walk, all other effects of the *transformation* are canceled.'
};

priq['Undead Plague'] = {
    'level': 'q',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': '1 mile',
    'duration': 'Special',
    'aoe': '[[100*[[@{level-priest}]] ]]-yard square',
    'components': '',
    'cast-time': '2 rounds',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 121',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this potent spell, the priest summons many ranks of skeletons to do his bidding. The skeletons are formed from any and all humanoid bones within the area of effect. The number of skeletons depends on the terrain in the area of effect; a battlesite or graveyard will yield 10 skeletons per 100 square yards; a long-inhabited area will yield three skeletons per 100 square yards; and wilderness will yield one skeleton per 100 square yards.\n&emsp;The spell’s maximum area of effect is 10,000 square yards. Thus, no more than 1,000 skeletons can be summoned by this spell.\n&emsp;The skeletons created by this spell are turned as zombies and remain in existence until destroyed or willed out of existence by the priest who created them.'
};

priq['Warband Quest'] = {
    'level': 'q',
    'school': 'Enchantment/Charm',
    'sphere': 'Charm, War',
    'range': '240 yards',
    'duration': 'Special',
    'aoe': '200 creatures',
    'components': '',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 122',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A priest may cast *warband quest* on any group of 200 creatures who are capable of understanding his commands. The creatures are then affected in a manner similar to the 5th-level priest spell, *quest*. Unwilling creatures are allowed a saving throw with a -4 penalty to avoid the effects.\n&emsp;The specified quest must be related to the reason that the Power granted this spell (perhaps a quest to slay or overcome a specified enemy).\n&emsp;*Warband quest* gives subjects of the spell a bonus of 2 hp per level of the caster (maximum 20 hp). Currently [[{2*[[@{level-priest}]],20}kl1]] bonus hp. Subjects also gain the effects of a *prayer* spell and have Morale of 18 while on the quest. These benefits last for the duration of the spell; the spell ends when the specified task is completed. A creature who abandons the quest is subject to the wrath of his deity.'
};

priq['Ward Matrix'] = {
    'level': 'q',
    'school': 'Invocation/Evocation',
    'sphere': 'Wards',
    'range': 'Special',
    'duration': '60 days',
    'aoe': 'Special',
    'components': '',
    'cast-time': '6 turns',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 122',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *ward matrix* spell links as many as six locations within the Prime Material plane. Only locations that have a functioning Wards spell may be linked. *Ward matrix* conjoins the different Wards spells so that each linked site gains the protection of all other wards in the network.\n&emsp;From the place where the *ward matrix* is cast, magical connections spread to the other designated sites. These can be seen with a *true seeing* or similar spell as tendrils of magical energy running through the air just above ground level. The connections target their destinations and move toward them at a rate of 40 miles per turn. They can evade barriers such as *anti-magic shells* by moving above or around them. When the connections reach their destinations, they multiply and spread to connect all other locations in the network; this secondary linkage is established at a rate of 20 miles per turn.\n&emsp;The conjoining of Wards lasts for 60 days unless a linked area is destroyed or a Wards spell is dispelled. Any location that is destroyed or has its Wards spell dispelled is removed from the matrix; other connections remain intact for the duration.'
};

priq['Wolf Spirits'] = {
    'level': 'q',
    'school': 'Conjuration/Summoning, Invocation',
    'sphere': 'Animal, Guardian, Summoning',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': '',
    'cast-time': '2 turns',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 122',
    'book': 'Tome of Magic',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The priest casting this spell calls upon the “spirits” of wolves (or another animal, if appropriate). The notion of *wolf spirits* is akin to the Wild Hunt of Celtic mythology: a pack of enormous magical wolves led by a human master who range Celtic lands seeking to destroy evil. The *wolf spirits* spell summons [[2d4+2]] such entities to serve the priest as master.\n&emsp;*Wolf spirits’* statistics are as follows: AC -4; MV 36 Fl 36 (B); HD 5+5; #AT 1; Dmg 3d6; AL N; SZ M; ML 20; THAC0 14. They are immune to all forms of mind control, illusions, gases, paralyzation, and spells which affect only corporeal creatures. They cannot be harmed by weapons of less than +2 enchantment.\n&emsp;*Wolf spirits* can be instructed to perform a service in the manner of the *animal summoning* spells. In this variation in the Animal and Summoning spheres, the spell does not expire until the spirits have performed their commanded service, to a maximum duration of 14 days. In the Guardian variation of this spell, the spirits can only be commanded to keep watch over an area or creature. The spell lasts 100 days for this type of service.'
};

//#endregion

//#region The Complete Book of Elves
pri2['Camouflage'] = {
    'level': '2',
    'school': 'Alteration',
    'sphere': '',
    'range': '20’ radius',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[@{level-priest}]] persons',
    'components': 'S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A mistletoe berry.',
    'reference': 'p. 101',
    'book': 'The Complete Book of Elves',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The elves jealously guard this spell. It allows the mage to instantly and completely hide the number of people allowed by the spell, concealing them against even thorough searches. This spell functions only in the wilderness, however, for it changes the appearance of the affected characters into a facsimile of natural surroundings. It is effective even against infravision and is therefore perfect for use by spies and infiltrators. Characters in this form still have all their faculties and abilities, and they can emerge from this cover at any time they desire.\n&emsp;It is even possible for characters to move while within this form. Those affected may move up to 10 feet in a single round, creeping more closely to their targets. If they travel faster than this, the spell dissipates. As long as the movement is surreptitious and stealthy (“Look, Thrag! That bush *moving*!”), they should be safe. As with the *invisibility* spell, if the enspelled characters attack they gain the initiative and a +4 bonus to attack rolls because of total surprise, yet lose the benefits of the spell.\n&emsp;The characters cannot be detected except by magic or by moving stupidly. Until the spell wears off, the characters can enjoy near-total invisibility and gain much-needed information.'
};

pri2['Seeking'] = {
    'level': '2',
    'school': 'Enchantment, Invocation',
    'sphere': '',
    'range': '100 yards',
    'duration': '1 turn',
    'aoe': '[[{floor([[@{level-priest}]]/3),5}kl1]] missile(s)',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 102',
    'book': 'The Complete Book of Elves',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *seeking* spell takes the normal laws of momentum and gravity, and then twists them slightly in a way that is favorable to the caster of the spell.\n&emsp;The caster can ensorcel a number of normal, nonenchanted missiles no larger than a javelin, equal to one-third his level, to a maximum of five missiles. When they have been enchanted, the caster may either use them or distribute them to his or her companions.\n&emsp;When shot or hurled at a target, the missiles unerringly seek the target. They will hit nothing else but that target. The missiles can go around objects of corners if the target was visible when the spell was cast, but the missiles cannot pass through solid obstructions. For example, if the target closes a door, the missiles slam into the door and cannot be removed until the spell wears off.\n&emsp;The normal range can be extended to the distance of the target creature as long as the opponent uses only ordinary methods of escape. If the target *plane shifts*, *teleports*, *blinks*, or uses some other means of instantaneous transport, the missile can no longer home in on its target. It falls to the ground, useless.\n&emsp;This spell is not an automatic guarantee of success. Rather, it ensures that archers and slingers, when firing into melee, will not accidentally hit those who are on their side. This spell is especially useful for battles or shots in narrow corridors. If the person firing the arrow or bullet can see the target, he can fire for normal damage without fear of damaging comrades.'
};
//#endregion

//#region The Complete Rangers Handbook
pri1['Allergy Field'] = {
    'level': '1',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[3+[[@{level-priest}]] ]] rounds',
    'aoe': '[[5*[[@{level-priest}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A pinch of ragweed.',
    'reference': 'p. 87',
    'book': 'The Complete Ranger\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes characters entering the affected area to suffer extreme allergic reactions. It may be cast on any field, meadow, forest, or other outdoor area with an abundance of plant life, causing the plants to produce pollen, antigens, or similar allergens. Characters coming in contact with the affected area who fail their saving throws vs. spell, experience swelling of the eyes, fits of sneezing, and dull headaches for the next 2-5 (1d4+1) turns. During that time, they make all attack rolls and ability checks at a -1 penalty.\n&emsp;The spell affects a cubic volume whose sides are 5 feet long per level of the caster; thus, a 9th-level caster could affect a 45’ ✕ 45’ ✕ 45’ cube. The spell lasts until the end of the indicated duration, or until the first frost, whichever comes first.'
};

pri1['Recover Trail'] = {
    'level': '1',
    'school': 'Divination',
    'sphere': 'Plant',
    'range': 'Special',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '4 + Special',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 87',
    'book': 'The Complete Ranger\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A caster who has lost a quarry’s trail while using the tracking proficiency can use this spell to proceed. The spell only works in terrain containing some type of vegetation (such as trees, grass, or seaweed). The quarry must have left some potential trail on which the spell can act (the spell cannot track a creature that has *teleported* or *plane shifted*, for example).\n&emsp;If successful, within an hour after casting the spell, the vegetation in a particular area will begin to flutter, as if being blown by a gentle breeze. If the wind is already blowing, the vegetation moves up and down, or moves in another unusual way to attract the caster’s attention. When examining this area, the caster will notice a footprint, broken twig, or other sign previously overlooked, indicating to correct trail. The spell has a success chance of 60% + 2% per level of the caster. Currently [[60+2*[[@{level-priest}]] ]]%.\n&emsp;This spell will immediately negate a *pass without trace* spell if cast directly for that purpose, otherwise it will still function normally to allow tracking along the disguised trail.\n&emsp;Any spellcaster with access to both the plant sphere and the tracking proficiency can use this spell.'
};

pri1['Revitalize Animal'] = {
    'level': '1',
    'school': 'Necromancy',
    'sphere': 'Animal',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'One animal',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 88',
    'book': 'The Complete Ranger\'s Handbook',
    'damage': '1d4 or 2d4',
    'damage-type': '',
    'healing': '1d4 or 2d4',
    'effect': 'This spell allows the caster to heal an animal by transferring life force (hit points) from himself to the animal. If the animal is touched with one hand, it regains [[1d4]] hit points, just as if it had received a *cure light wounds* spell. Touching the animal with both hands restores [[2d4]] hit points. In either case, the caster temporarily loses the number of hit points that the animal regains. The caster will recover his lost hit points 1-4 hours later (if he transferred 3 hit points, he recovers 3 hit points in 1-4 hours). The caster’s recovery of these hit points has no effect on the restored animal.\n&emsp;During the 1-4 hours before the caster recovers his transferred hit points, he feels weak and dizzy, making all attack rolls at a -1 penalty during that time. Should the ranger die during that 1-4 hour period, the recovery process stops immediately and *no* hit points are recovered.\n&emsp;The animal cannot recover hit points beyond the normal allotment. For instance, an animal that normally has 10 hit points, but has been reduced to 6 due an injury, can’t receive more than 4 hit points from this spell. Also, the caster will have at least 1 hit point remaining after using this spell; if the caster has 6 hit points, he won’t transfer more than 5 to a damaged animal.\n&emsp;*Revitalize animal* works on animals only; it has no effect on humans, demihumans, humanoids, magical creatures, etc. The spell is not reversible; that is, an injured caster can’t receive hit points from an animal.'
};

pri2['Animal Eyes'] = {
    'level': '2',
    'school': 'Necromancy',
    'sphere': 'Animal',
    'range': '0',
    'duration': '[[3+[[@{level-priest}]] ]] rounds',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A glass lens no larger than one inch in diameter as a focus, which is not consumed in the casting.',
    'reference': 'p. 88',
    'book': 'The Complete Ranger\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By using this spell, the caster can temporarily see through the eyes of any animal. The caster points at any single animal within 100 yards, then closes his eyes and remains stationary. In his mind’s eye, he sees whatever the animal is seeing. If the subject animal is a squirrel studying the party from a tree branch, the caster sees himself and the party from the perspective of the squirrel. If the subject animal is a bird soaring overhead, the caster gets a bird’s eye view of the area below.\n&emsp;The spell has no effect on the subject animal, nor can the caster control the animal’s actions in any way. The animal is unaware of the spell and acts as it normally would. The spell persists until the end of its duration, or the caster moves or takes another action. The caster may voluntarily negate the spell by opening his eyes. The spell also ends if the animal is killed, or moves more than 100 yards away from the caster.\n&emsp;The subject animal must be one normally found in nature. It may not be supernatural, human, demihuman, nor of extraplanar origin.'
};

pri2['Locate Animal Follower'] = {
    'level': '2',
    'school': 'Divination (Reversible)',
    'sphere': 'Animal',
    'range': '[[60+10*[[@{level-priest}]] ]] yards',
    'duration': '8 hours',
    'aoe': '1 animal follower',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A hair, feather, scale or other physical remnant of the lost follower.',
    'reference': 'p. 88',
    'book': 'The Complete Ranger\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Occasionally, a ranger’s animal follower may wander away in search of food or a mate. An animal follower may also be abducted or trapped. The *locate animal follower* spell helps the ranger find such lost creatures.\n&emsp;The spell takes affect once the ranger fixes in his mind the follower being sought. The spell locates only that specific follower.\n&emsp;Once the spell is cast, the ranger slowly turns in a circle. If the follower is within range, the ranger senses when he is facing in the direction of the sought follower. If the follower isn’t within range, the spell doesn’t work. If the follower moves out of the area of effect, the spell is immediately negated. As soon as the ranger sees the lost follower, the spell ends. The spell is blocked by lead.\n&emsp;The spell works only on a natural animal follower (including giant animals); not a supernatural creature, human, demihuman, humanoid, or other. If the follower is dead, the spell still seeks it out, providing other conditions of casting are met.\n&emsp;The reverse of this spell, *obscure follower*, hides an animal follower from detection by spells, crystal balls, and similar means for eight hours.'
};

pri3['Call Follower'] = {
    'level': '3',
    'school': 'Conjuration/Summoning',
    'sphere': 'Animal',
    'range': '0',
    'duration': 'Special',
    'aoe': '[[10*[[@{level-priest}]] ]] mile radius',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 89',
    'book': 'The Complete Ranger\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A ranger who has not yet received his full allotment of followers can use this spell in an attempt to summon one. After the spell is cast, the DM secretly consults the list of followers he’s chosen for the ranger, or rolls an appropriate table. If the DM decides that a potential follower exists within the area of effect, the follower appears within the next 24 hours. If the DM decides that a follower isn’t available within the area of effect, nothing happens (no follower appears). Note that the ranger can’t request a specific type of follower; as always, the type of follower is up to the DM. The spell can be attempted no more than once per month.\n&emsp;*DM Note:* Notes on staging the arrival of the follower are also given in Chapter 3.'
};

pri3['Chatterbark'] = {
    'level': '3',
    'school': 'Divination',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'One tree',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 89',
    'book': 'The Complete Ranger\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A variation of the 4th-level priest spell, *speak with plants*, this spell enables a ranger to ask a simple question to a tree and receive a spoken response. The tree can be any species, so long as its trunk is at least 1 foot in diameter. Before casting the spell, the ranger must spend at least an hour carving a humanoid face in the trunk; if the ranger has a proficiency in wood carving (a variation of artistic ability), he can carve a suitable face in one turn.\n&emsp;After carving the face, the ranger spends 1 turn casting the spell, at which time the face becomes animated, twitching and grimacing as if just awakening from a long sleep. The tree face then looks at the caster expectantly, waiting for a question. The caster may ask the tree any single question that can be answered in a single word or short phrase. Typical questions might include: “Has a dragon passed this way within the last few days?” “Has it rained here recently?” “Are there any fruit trees nearby?” The tree answers the question honestly. If the question is beyond the scope of its knowledge, the tree says, “I don’t know.” After answering, the face disappears.\n&emsp;The DM should keep in mind that a typical tree doesn’t know very much, as it has little experience, never travels, and rarely interacts with other living things in meaningful ways. As a rule of thumb, a tree’s knowledge is limited to things it has observed (passersby, weather conditions) and general information about the immediate area (animal populations, location of landmarks). A tree can’t give dependable advice or make judgements. If the DM is in doubt about what a particular tree knows, the tree answers, “I don’t know.”'
};

pri3['Animal Trick'] = {
    'level': '3',
    'school': 'Enchantment',
    'sphere': 'Animal',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'One animal',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 90',
    'book': 'The Complete Ranger\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell temporarily enables any animal to perform a trick it normally doesn’t know or lacks the intelligence to execute. The animal must be within 30 yards of the caster and must be able to hear his spoken commands. If these conditions are met, the animal will do exactly what the ranger tells it. A lion will batter down the door of a cell, a cat will fetch a key and carry it in its mouth, a parrot will draw a circle in the sand with its claw. A creature with less than 5 hit dice and no prior allegiances receives no saving throw. Any willing creature predisposed to aid the caster (such as an animal follower) will not resist this spell at all.\n&emsp;The animal can’t execute a trick or task that exceeds its physical limitations. A snake can’t pick a lock, and a horse can’t play a trumpet. Note also that the caster must give specific instructions, not general commands. If the caster commands a lion to “Get something to help me put out this fire,” the puzzled lion won’t know what do to. However, if the caster says, “Take this bucket in your mouth, dip it in the stream, and carry the water back to me,” the lion will do as it’s told.\n&emsp;The caster can take other actions while the animal is completing the trick. Once the animal completes its trick, the caster may give it additional tricks to complete until the spell expires. If the spell expires while the animal is in the middle of a trick, or if the spell is broken by some means, the animal immediately stops what it’s doing.'
};

pri3['Polymorph Plant'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'One plant',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'Any seed.',
    'reference': 'p. 91',
    'book': 'The Complete Ranger\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables a ranger to transform any single plant, including a fungus or mold, into any other type of plant of the ranger’s choice. The change is permanent. The changed plant has the physical appearance of its new form, but not all of the associated properties. If edible, the new form tastes as bland as cotton. If normally used as a spell component, the new form has only a 50% chance of actually functioning as a component. If normally used for medical purposes (such as for a healing salve or poison antidote), the new form has only a 50% chance of having any beneficial properties.\n&emsp;Only living plants can be polymorphed; the spell won’t work on a fallen leaf, a nut, or a picked fruit. The size of the plant is not relevant; a blade of grass may be polymorphed into a towering oak tree and vice versa. The new form doesn’t have to be indigenous to the environment; an evergreen tree on a frigid mountain may be polymorphed into a cactus (although it may not thrive for long).\n&emsp;Neither the original vegetation nor its polymorphed form can be an intelligent plant or a plant-like creature. Nor are unnatural plant forms allowed; a mushroom may be transformed into a normal-sized cornstalk, but not a 50-foot-tall cornstalk or a stalk that produces apples instead of corn.'
};
//#endregion

//#region The Complete Druid's Handbook
pri1['Beastmask'] = {
    'level': '1',
    'school': 'Illusion/Phantasm',
    'sphere': 'Animal',
    'range': 'Touch',
    'duration': '12 hours',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A miniature wooden mask carved to look like the animal.',
    'reference': 'p. 91',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Beastmask* may affect any single person or animal, or characters may cast it on themselves. It allows the subject to take on the illusory form of a single animal species--but only that species of animal can perceive the illusion. The subject may not assume an animal form more than twice or less than one-quarter the character’s size.\n&emsp;The almost perfect illusion the spell creates deceives the animal’s sight, hearing, smell, and touch. For instance, once a character casts a “bear” illusion on a subject, bears believe that subject to be a bear, while to humans, other races, and other creatures, the subject remains the same.\n&emsp;Characters normally use *beastmask* to travel among or hunt a particular species. This spell lets a druid assume the guise of a caribou to move among a herd without causing them to panic. A character also could avoid being attacked by a pack of dire wolves by wearing a wolf’s “mask.”\n&emsp;*Beastmask* does not allow communication with the animal species, though it can be used with animal communication spells.'
};

pri1['Puffball'] = {
    'level': '1',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '1 mushroom, etc.',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': 'A pinch of ground puffball, sprinkled over the fungus to be enchanted.',
    'reference': 'p. 87',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A character who casts *puffball* on a normal mushroom, truffle, or toadstool (up to 6 inches in diameter) transforms the fungus into a magical *puffball*, which the character may drop or throw. The DM should decide what type of roll, if any, is required to hit the target (Strength, Dexterity, etc.) See the *DMG*, pgs. 62-63, for rules on grenadelike missiles.\n&emsp;The *puffball* bursts upon landing, releasing a cloud of spores 10 feet in diameter. Those caught in the spore cloud must save vs. poison or suffer an attack of coughing and choking. Victims can make no attacks and lose all Dexterity bonuses to Armor Class and saving throws. The cloud dissipates in [[1d3+1]] rounds; residual effects still afflict characters one round after they escape the cloud or it fades.\n&emsp;The spell’s effects do not affect undead or similar nonbreathing creatures. If no one throws (or drops) the missile by the time its duration expires, the enchantment is lost.'
};

pri1['Whisperward'] = {
    'level': '1',
    'school': 'Alteration',
    'sphere': 'Guardian, Weather',
    'range': 'Touch',
    'duration': 'Permanent until triggered',
    'aoe': '1 item',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol.',
    'reference': 'p. 87',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Whisperward* can be cast on any single item, portal, or closure (such as a book, door, or lid). It may ward up to a 30-foot radius.\n&emsp;The character keys the ward to become activated (like a *magic mouth* spell) under specific conditions--such as when a certain individual enters the area or opens the warded closure. When the ward is triggered, a soft whispering breeze blows across the caster’s face. The caster must stay within 1 mile per experience level of the ward to receive the warning. Currently [[@{level-priest}]] mile(s).'
};

pri2['Animal Spy'] = {
    'level': '2',
    'school': 'Divination',
    'sphere': 'Animal',
    'range': '10 yards',
    'duration': '[[floor([[@{level-priest}]]/2)]] turn(s)',
    'aoe': '1 animal',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 87',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Only a normal (real-world) animal or a giant version of a normal animal species may become an animal spy. This spell enables the caster to share the animal’s senses--see through the animal’s eyes, hear with its ears, smell with its nose, and so on. The animal is completely unaware of the spell’s effect, unless the druid warns the beast before casting. *Animal spy* grants no control over the creature. However, most casters will use it on a trained animal or one befriended via the *animal friendship* spell.\n&emsp;For the duration of the spell, the caster remains in a trance, unable to move or use human senses. This consequence can prove dangerous; for instance, characters attacked while using the spell cannot feel injuries to their bodies. However, at the start of any round, the caster may choose to return the animal’s senses to the creature and resume control of the human body. This decision ends the spell immediately. The spell also ends if the animal travels more than 100 yards away per level of the caster. Currently [[100*[[@{level-priest}]] ]] yards.'
};

pri2['Beastspite'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'range': '10 yards',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '1 person',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 88',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Beastspite* afflicts a single person with a magical aura that induces one species of animal to hate and fear the character. The character becomes loathed by any species of normal (real-world) animal. While this range excludes monsters, it includes giant animals of the same real-world species. (For example, if *beastspite* causes bats to hate the subject, giant bats will react similarly.)\n&emsp;When the character comes within 30 yards of an animal from the target species, the creature will make warning signals (barks, growls, etc.). Its further reaction depends on the animal’s nature.\n&emsp;• Aggressive animals, including all predators and most trained guard animals, attack the spell recipient.\n&emsp;• Nonaggressive beasts shun the character, fleeing or attacking if approached.\n&emsp;• Owners can restrain their domesticated animals, but the beasts show obvious distress and may become very hostile if the character tries to touch them.\n&emsp;• If the subject was riding when the spell took effect, the mount tries to throw off the character. The subject must make a riding proficiency check each round to stay astride and to avoid a fall if thrown off.\n&emsp;• An animal extremely loyal to the subject, such as a pet dog, a creature influenced by an *animal friendship* spell, a wizard’s familiar, or a paladin’s war horse does not become utterly hostile to its owner. Instead it notices something “wrong” about the character and acts unusually nervous.'
};

pri2['Fortifying Stew'] = {
    'level': '2',
    'school': 'Necromancy',
    'sphere': 'Healing',
    'range': 'Touch',
    'duration': 'Stew retains enchantment 1 turn',
    'aoe': '[[@{level-priest}]] bowls of stew, etc.',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A vial of stock made of the first fruit of the harvest.',
    'reference': 'p. 88',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Any bowl of broth, porridge, or stew the priest has concocted can become subject to *fortifying stew*. A character can enchant one bowl of stew (about 8 ounces) per experience level. Someone must consume the enchanted meal within one turn of the casting.\n&emsp;Anyone partaking of an entire bowlful reaps magical benefits. First, the diner gains nourishment for an entire day from the single meal. In addition, for two hours plus one round per the caster’s level, the character receives [[1d4+1]] temporary hit points. Currently 2 hours and [[@{level-priest}]] rounds. Any damage suffered comes off the extra hit points first. The effects of multiple helpings of *fortifying stew* are not cumulative.\n&emsp;For example, Snapdragon, a 7th-level druid, cooks a meaty broth, casts *fortifying stew* on it, and eats the bowlful. A roll of 2 gives her 3 extra hit points. When the spell’s effects wear off just over three hours, she loses these extra points. If she suffers 5 points of damage in the meantime, she actually loses only 2 hp of her own, since 3 hp came off the extra hit points.'
};

pri2['Gift of Speech'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '1 animal',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol.',
    'reference': 'p. 90',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *gift of speech* spell grants a normal animal (or a giant version of a normal animal) the ability to speak any *one* of the languages the caster knows, whichever the caster chooses, along with the ability to understand words and simple concepts expressed in that language. The affected animal’s reactions do not change, nor does its Intelligence increase. The spell has no effect if cast on a creature with an Intelligence score of less than 1.'
};

pri3['Pass Without Trace, 10\' Radius'] = {
    'level': '3',
    'school': 'Enchantment/Charm',
    'sphere': 'Plant',
    'range': '0',
    'duration': '[[@{level-priest}]] turns',
    'aoe': 'Radius 10 feet around caster',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A sprig of pine burned to ash. Upon casting the spell, the character scatters the powder in a circle.',
    'reference': 'p. 90',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Identical in function to *pass without trace*, *pass without trace, 10’ radius* affects everyone within 10 feet of the caster. The effect moves with the caster, so creatures must stay within 10 feet of the caster to continue to avoid leaving tracks. A creature who leaves the area of effect can then be tracked normally. Creatures moving into the area of effect after casting are unaffected.'
};

pri3['Shape Wood'] = {
    'level': '3',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '9 cubic feet+[[@{level-priest}]] cubic foots',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A pinch of fine sawdust, which is blown over the wooden subject of the spell.',
    'reference': 'p. 90',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of *shape wood*, the caster can reform wood. For example, the character can cast it upon any appropriate-sized piece of wood to fashion a wooden weapon, make a rough door, or even create a crude figurine.\n&emsp;The spell also allows the caster to reshape an existing wooden door, perhaps to escape imprisonment. Again, the volume of the wooden object must be appropriate to the desired result and fit in the area of effect.\n&emsp;While a character might form a wooden coffer from a tree stump or a door from a wooden wall, the result does not bear high-quality detail. If a shaping has moving parts, there is a 30% chance they do not work.\n&emsp;The alteration endures permanently, at least until the wood rots or is physically destroyed.'
};

pri4['Detect Animal Attacker'] = {
    'level': '4',
    'school': 'Divination',
    'sphere': 'Animal',
    'range': 'Touch',
    'duration': 'Instantaneous',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol.',
    'reference': 'p. 90',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Depending on how it is cast, *detect animal attacker* gives the druid a visual image either of a creature that injured an animal or of an animal that attacked any victim.\n&emsp;While casting the spell upon any victim of an attack by a natural animal (a victim whose body still bears the marks of claws, fangs, or other natural weapons), the druid touches the victim’s wound. This brief touch gives the caster a fleeting vision of the animal that caused the injuries as it looked at the time of the attack.\n&emsp;Likewise, a druid casting the spell upon an injured real-world animal can touch its wound and receive a vision of the person, monster, or animal that harmed it.\n&emsp;Even if the caster receives a vision of an unfamiliar attacker, the character usually can get an idea of its size, primary attack method, and alignment. (The druid senses good, evil, or neutrality.)\n&emsp;In addition, if the creature still lives and fails a saving throw vs. spell, the caster senses its current position, location, and direction of travel.\n&emsp;*Detect animal attacker* works only within one hour per level of the caster after the victim receives the injury in question. Currently [[@{level-priest}]] hours. The spell is effective regardless of whether the attack proved fatal.'
};

pri4['Earthmaw'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Elemental (Earth)',
    'range': '50 yards',
    'duration': '1 round',
    'aoe': '10-foot diameter circle',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'Negate',
    'materials': 'A tooth from any predatory creature.',
    'reference': 'p. 91',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '[[@{level-priest}]]d4',
    'damage-type': '',
    'healing': '',
    'effect': '*Earthmaw* causes a patch of ground 10 feet in diameter to open and form a gigantic mouth with stalactite teeth. The mouth springs forth on a short serpentine neck, much like a water weird, and attacks once in a direction the caster dictates. Then it retracts into the earth and closes solidly. The site of an *earthmaw* spell appears as if the ground has been tilled recently.\n&emsp;The mouth can attack one large creature, two man-sized creatures, or four small-sized creatures within 10 feet of its outer edge. It can strike multiple creatures only if they remain clustered within a 10-foot diameter circle adjacent to the maw.\n&emsp;The earthmaw attacks as a monster with Hit Dice equal to the caster’s level. Creatures standing on the site of the maw suffer a +3 penalty to Armor Class for purposes of this attack only. Creatures standing next to the maw suffer no AC penalty.\n&emsp;A successful hit inflicts 1d4 points of damage per level of the caster. An *unmodified* roll of 19 or 20 means the maw has swallowed the victim whole, burying the character 2d4 feet below ground. Victims can be dug out manually, with appropriate spells (such as *dig*), or with magical items (such as a *spade of colossal excavation*). A creature trapped underground will suffocate unless freed within a number of rounds equal to one-third its Constitution score.\n&emsp;*Earthmaw* may be cast on any area of loose or packed earth, sand, or vegetation-covered soil. It may be cast indoors on an earthen surface: for example, on the dirt floor of a barn or basement, but not on the marble floor of a home or temple. It may not be cast on an area containing a tree, any portion of a building, or any type of pavement.\n&emsp;An object present on the site of the maw (such as a campfire or a tent, etc.) counts as a creature of that object’s size in attacks.'
};

pri4['Hunger'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Animal, Plant',
    'range': '10 yards',
    'duration': '[[@{level-priest}]] days',
    'aoe': '1 person',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'Negate',
    'materials': 'A pinch of the food that can end the spell.',
    'reference': 'p. 92',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Those affected by *hunger* no longer gain sustenance from food. No matter how much they eat, they still feel hungry. If the spell did not end, victims eventually would starve, visibly wasting away.\n&emsp;After one day under the spell’s effect, victims’ concentration suffers (due to their preoccupation with their constant hungry feeling), causing them to suffer a -2 penalty to all ability and proficiency checks. On the eighth day without food, victims who have been maintaining normal activity levels lose 1 Strength point; on the ninth day, they lose 1 Constitution point. This alternating pattern continues until one of the character’s ability scores falls to 3; at this point, the character becomes comatose. If a score reaches 0 before the *hunger* spell ends, the recipient dies. The victim regains lost points after the spell ends at a rate of 1 Strength and 1 Constitution point per day.\n&emsp;When casting the spell, the character secretly whispers a particular type of food; by eating the specified food, the victim breaks the spell. It must be a single, natural food (such as lamb, honey, or an apple) but can be exotic (dragon meat) as long as the caster has tasted it personally at some point.\n&emsp;*Hunger* cannot be dispelled, but can be broken by the *remove curse* spell. Failing all else, a sufferer must wait to find relief until the spell’s duration elapses.'
};

pri4['Knurl'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '[[5*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '1 person',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'Negate',
    'materials': 'A small twig.',
    'reference': 'p. 93',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Casting a *knurl* spell transforms a creature’s arm into a tree branch of the same thickness, covered with bark and twigs. The new limb possesses neither elbow nor wrist joints not even a hand. The “arm” remains attached to the shoulder. The spell’s recipient can use it as a club but not to manipulate tools, weapons, or spell components.\n&emsp;The caster chooses which of the recipient’s arms to affect. A character could use multiple *knurl* spells to transform both arms of a humanoid. The arm is treated for all purposes as a tree branch: It becomes subject to fire, wood-altering spells, and tree diseases. *Dispel magic* ends the spell’s effects.'
};

pri4['Needlestorm'] = {
    'level': '4',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '60 yards',
    'duration': 'Instantaneous',
    'aoe': '1 tree or plant',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'Save vs. spell for half damage',
    'materials': 'A spine from a needle-bearing tree or plant.',
    'reference': 'p. 93',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '[[floor([[@{level-priest}]]/3)]]d12',
    'damage-type': '',
    'healing': '',
    'effect': 'A favorite of cold-forest and desert druids, *needlestorm* causes the spines on any pine tree or similar needle-bearing plant to spray out in a deadly barrage. The shower of needles has a radius of approximately 1 foot for every 2 feet of the subject plant’s height.\n&emsp;Everyone within this area suffers one attack, which inflicts 1d12 points of damage for every three full levels the caster has achieved. Thus, a spruce tree enchanted by a 7th-level character attacks with a THAC0 of 16 and inflicts 2d12 points of damage.'
};

pri5['Cloudscape'] = {
    'level': '5',
    'school': 'Alteration',
    'sphere': 'Weather',
    'range': '120 yards',
    'duration': '[[3*[[@{level-priest}]] ]] turns',
    'aoe': '[[1000*[[@{level-priest}]] ]] cubic feet',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 93',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A character can cast *cloudscape* on a single cloud or part of a cloud bank, usually from a nearby mountaintop or while flying. It causes 1,000 cubic feet of cloud per level of the caster to become solid enough to support any weight. The solidified clouds remain airborne and feel like a thick carpet.\n&emsp;A creature that falls onto the magically strengthened cloud sustains falling damage per the *PH*, p. 139. An animal or individual that flies into the solidified cloud falls, stunned, for a round and must make a successful Dexterity check to recover. If a creature is flying through a cloud at the moment it becomes solidified, it may make a saving throw vs. petrification. Those who succeed escape the cloud in time. Creatures that fail the save become trapped as the cloud solidifies around them. However, as the cloud is porous, they can continue to breathe until the spell’s duration elapses.\n&emsp;The solidified cloud itself continues to drift with the wind as usual. While the caster cannot use this particular spell to propel the cloud at all, a *control winds* spell can summon a great gust of air to turn the *cloudscape* into a unique flying conveyance easily enough.'
};

pri5['Nature\'s Charm'] = {
    'level': '5',
    'school': 'Enchantment/Charm',
    'sphere': 'Elemental (Earth, Water)',
    'range': 'Touch',
    'duration': '[[2*[[@{level-priest}]] ]] hours',
    'aoe': '[[15*[[@{level-priest}]] ]]-foot radius',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Creatures native to the area of effect are not affected.',
    'materials': 'The druid’s holy symbol.',
    'reference': 'p. 94',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Nature’s charm* causes a particular place to exert a special fascination beyond mere beauty to anyone entering the area except the spellcaster.\n&emsp;This spell must target a site of notable natural splendor that possesses both edible plants and fresh water. The spot may not be larger than the spell’s area of effect. For instance, a 12th-level druid could cast this spell on a forest glade up to 360 feet across, with flowers and fruit-bearing trees centered around a waterfall.\n&emsp;Anyone coming upon the enchanted region must save vs. spell; those who fail invariably make up excuses to remain there long after they should have left. They say they want only to bathe, rest, admire the beauty a bit longer, eat the berries or fruit, paint a picture of the area, or defend the spot jealously from others.\n&emsp;Whatever the reason, those who fall victim to the enchantment forcefully resist all attempts to make them leave until the spell’s duration ends.'
};

pri5['Strengthen Stone'] = {
    'level': '5',
    'school': 'Alteration',
    'sphere': 'Elemental (Earth)',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': '1 building or wall',
    'components': 'V, S, M',
    'cast-time': '1 hour',
    'saving-throw': 'None',
    'materials': 'A diamond chip worth at least 500 gp, must be crushed and sprinkled on the construction.',
    'reference': 'p. 94',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Strengthen stone* can reinforce any stone construction (house, tower, wall segment, aqueduct, etc.), against physical damage. The DM adds +4 to the structure’s saving throw against any kind of damage, from siege engines to natural earthquakes. The stone object gains a saving throw vs. the *earthquake* spell. (See the PH, p. 295.) The spell may be cast only once on any stone object.\n&emsp;If a character casts this spell on a stone golem or other animated stone being (like one created by *animate rock*), the creature receives a -1 bonus to its Armor Class and adds a +1 bonus to its saving throws for the duration of the spell. *Strengthen stone* has no effect on earth elementals or galeb duhr.'
};

pri5['Thornwrack'] = {
    'level': '5',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] thorns',
    'aoe': '1 person',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 94',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '[[1d3]] ✕ [[@{level-priest}]]',
    'damage-type': '',
    'healing': '',
    'effect': '*Thornwrack* causes long, painful thorns to grow out of the spell recipient’s flesh, piercing the skin from the inside. One thorn appears each round, inflicting 1d3 points of damage, until all the thorns have appeared. When the number of thorns exceeds the subject’s experience level or HD, a victim still conscious becomes immobilized by the pain, unable to take any action.\n&emsp;One round after the last thorn erupts from the victim’s flesh, the first one disappears. The thorns continue receding at a rate of one per turn. Immobilized subjects can move again once the number of thorns falls below their HD or experience level. For instance, say the body of a 4th-level character has seven thorns. After four turns had passed, only three thorns would remain, so the victim would no longer be immobile.\n&emsp;*Cure* spells can restore hit points but do not eliminate the thorns. *Dispel magic* will end the spell but prevents existing thorns from receding. A *heal* spell cancels the *thornwrack*, eliminates all existing thorns, and cures all damage. Without the benefit of magical remedies, the spell ends when the last thorn has receded.'
};

pri6['Earthwrack'] = {
    'level': '6',
    'school': 'Alteration',
    'sphere': 'Necromantic, Plant',
    'range': '[[20*[[@{level-priest}]] ]] yards',
    'duration': '[[2d4+10]] years',
    'aoe': '[[30*[[@{level-priest}]] ]]-foot radius',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol.',
    'reference': 'p. 95',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '1d4/round to plant-based creatures',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes an area of soil to become barren and blighted. Healthy plants wither and die within [[1d4]] days of casting. No seed planted there will grow for the duration of the spell. Plant-based creatures entering the despoiled area can see the ruin and feel an intense “wrongness” within the soil. Each round they remain within the area, they suffer 1d4 points of damage.\n&emsp;The blight can be cured using a *limited wish*, a *wish*, or by casting a *remove curse* spell (at the 12th level of experience) and a *plant growth* spell simultaneously.\n&emsp;Most druids consider *earthwrack* an abomination, although some Shadow Circle druids use it as last-ditch “scorched earth” vengeance against an unruly hamlet.'
};

pri6['Ivy Siege'] = {
    'level': '6',
    'school': 'Enchantment',
    'sphere': 'Plant',
    'range': '90 yards',
    'duration': '6 turns',
    'aoe': '1 building or similar structure',
    'components': 'V, S, M',
    'cast-time': '9',
    'saving-throw': 'Special',
    'materials': 'An ivy leaf.',
    'reference': 'p. 95',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *ivy siege* spell must be cast upon a stone or brick building constructed upon the earth; flying castles and the like remain unaffected. Immediately after casting, ivy begins to grow at a fantastic rate, climbing from the ground up the building’s walls. At the end of one turn, the ivy has climbed the walls. At the end of the second turn, green creepers have covered the structure. On the third turn, the ivy has deepened to a black-green and begins to squeeze the building.\n&emsp;Starting on the third turn and every turn thereafter, the building must make a saving throw vs. siege damage, as if attacked by a small catapult (*DMG*, p. 105). Two cubic feet of the building crumbles away for each point by which the saving throw misses each turn. This cycle continues until the spell’s duration expires or the building is destroyed. The ivy rots away instantly at the spell’s end.\n&emsp;A druid can cast only one *ivy siege* per building at a time. After the ivy has rotted away, the druid may cast the spell on the same building again. However, multiple druids can cast several *ivy siege* spells on the same building. In the case of a large, interconnected series of buildings (like a castle), each casting affects only a single tower, keep, or wall segment, to a maximum of 1,000 cubic feet per level of the caster. Currently [[1000*[[@{level-priest}]] ]] cubic feet.\n&emsp;The DM may choose to prohibit arctic and desert druids from using this spell if they are not familiar with ivy.'
};

pri7['Tree Spirit'] = {
    'level': '7',
    'school': 'Necromancy',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 tree',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 96',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Tree spirit* permanently links the soul of the caster with a tree, usually chosen carefully for its health, vigor, and remote environment. Casting this spell joins the life force of the druid with that of the tree; as long as the tree lives, the caster ages at one-tenth the normal rate. (Because the spell causes the tree to devote all its energy to maintaining health rather than growth, it always remains exactly the size it was at the time of casting.) Moreover, the caster’s spirit merges with the tree at the character’s death. No form of reincarnation or resurrection (except a *wish*) on the character’s body will work unless it lies within 10 feet of the tree.\n&emsp;One year after the caster dies, the druid’s spirit animates the tree as a treant. (DMs should roll up treant statistics for the tree at the time the spell is cast, to determine the tree’s Armor Class, Hit Dice, etc.) The chosen tree must be of treant height; the exact size determines the size of the new treant, which possesses the caster’s memories and personality but has no granted powers or spellcasting ability. It must communicate as a treant.\n&emsp;The DM decides whether to consider this treant an NPC or allow the player to control it. (DMs should use the guidelines that apply to PCs who become lycanthropes or undead.)\n&emsp;However, when a druid uses *tree spirit* to link with a tree, the character suffers any physical damage inflicted on the tree. For instance, if someone hacks at the tree with an axe and causes 4 points of damage, the caster also loses 4 hit points; the druid knows the tree has been harmed, but does not know the nature of the injury.\n&emsp;If the tree dies but does not sustain enough damage to kill the caster, the character feels stunned for 1d6 rounds and must make a successful system shock roll to avoid death. Spells that heal the druid do not affect the tree.\n&emsp;Damage to the caster does not affect the tree, as the extra energy the tree expends on strength and health makes any damage the player sustains negligible to the tree. However, it’s usually in the druid’s best interest to have an animal friend or two guard the tree.\n&emsp;In addition, the druid should choose the tree carefully; if the surrounding land is cleared for construction work or lumber before the druid’s prolonged life span finally ends, the character is in trouble.\n&emsp;Casting *tree spirit* first requires a full month’s preparation. The druid lives near the tree during this time of prayer and mediation. Then the character conducts a private bonding ceremony at the height of a solstice. This spell often is cast by ancient druids, who wish to preserve their wisdom or make sure their groves remain defended even after their death.'
};

pri7['Unwilling Wood'] = {
    'level': '7',
    'school': 'Enchantment/Charm',
    'sphere': 'Plant',
    'range': '[[5*[[@{level-priest}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '10-yard radius',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'A bit of tree root and the priest’s holy symbol.',
    'reference': 'p. 97',
    'book': 'The Complete Druid\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A caster can transform one or more living creatures within a 10-yard radius into *unwilling wood*, causing them to sprout roots, branches, and leaves. The victims become trees of a type native to the region and of the characters’ age before the transformation. The spell works only if cast on beings occupying ground that could support a tree; recipients flying or suspended in water at the time of casting remain unaffected.\n&emsp;This spell can mutate a number of creatures equal in total Hit Dice (or levels) to the caster’s level—within the area of effect, of course. Currently [[@{level-priest}]] Hit Dice or levels. If this area holds a group of creatures with Hit Dice (or levels) totaling a number greater than the caster’s experience level, the character may decide the order in which the creatures become affected.\n&emsp;For instance, say a 14th-level druid casts *unwilling wood* into a target area containing a giant with 12 Hit Dice and two 3rd-level warriors. The druid can transform either the giant or two warriors, but not all three. “Leftover” Hit Dice or levels are lost.\n&emsp;Each creature affected may attempt to save vs. polymorph. The spell mutates all those failing their saving throw, along with any items they carry. A new tree has a height of 5 feet per level (or Hit Die) of the victim. The effect is permanent; a person transformed into a tree ages as a tree and dies as a tree. However, affected characters retain awareness, memories, personality, and intelligence. Only damage severe enough to kill the tree can kill an *unwilling wood* victim.\n&emsp;Tree-characters can return to normal if a spellcaster of greater level than the original caster uses *remove curse*. The original caster can release a transformed entity at will.'
};
//#endregion

//#region The Complete Book of Necromancers
pri1['Ebony Hand'] = {
    'level': '1',
    'school': 'Evocation, Necromancy',
    'sphere': 'Necromantic',
    'range': '0',
    'duration': '[[3+[[@{level-priest}]] ]] rounds',
    'aoe': 'Personal',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'Varies from religion to religion, but it is usually a piece of apparel or jewelry which is worn on the caster’s hand to help focus the meditation (often a black glove or a simple silver or onyx ring). Regardless of the actual focus employed, the material component is not consumed by the spell and may be employed in multiple castings.',
    'reference': 'p. 77',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This minor meditation focuses a baneful, necromantic aura in the caster’s chosen hand, enveloping the fingers in a dark, flickering radiance. The aura of the *ebony hand* enhances the delivery of harmful, touch-related spells (such as *cause light wounds* or *cause disease*) by providing a +1 bonus on the priest’s attack roll for every three levels of experience past the first (+2 to hit at 4th level, +3 at 7th level, to a maximum of +4 to hit at 10th level). Currently +[[{1+floor(([[@{level-priest}]]-1)/3),4}kl1]] to hit.\n&emsp;Once the *ebony hand* is cast, the magic of the touch-delivered spell is no longer conducted though physical contact with the caster’s fingertips, but through the flickering aura of the *ebony hand*.\n&emsp;The companion touch-delivered spell(s) may be cast either before or after the creation of the *ebony hand*, which does not expire with a single, successful touch and may be used to deliver multiple attacks if the spell duration permits. Note that the *ebony hand* does not enhance attacks with weapons or other ranged spells.\n&emsp;As the spell description implies, the *ebony hand* may only be granted by malevolent deities to their evil priests.'
};

pri1['Skeletal Servant'] = {
    'level': '1',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': '10 yards',
    'duration': 'One week',
    'aoe': 'One body or skeleton',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A handful of graveyard dirt.',
    'reference': 'p. 78',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell temporarily animates the bones of a dead human, demihuman, or humanoid creature of man-size or less. The resultant skeleton will obey only simple commands until it is destroyed, turned, or dispelled, or the spell duration expires. As with the creations of the more powerful *animate dead* spell, a *skeletal servant* can be commanded to guard an area, follow the caster, carry heavy objects,and so on. The servant is not well suited to complex tasks (such as cooking, for instance) and is generally created to serve as a porter or temporary bodyguard.\n&emsp;A priest may have only one *skeletal servant* per level of experience in service at once. Currently [[@{level-priest}]] *skeletal servants*. As with the more powerful *animate dead* spell, the creation of a *skeletal servant* is not a good act, and only evil priests use it frequently.'
};

pri1['Spectral Senses'] = {
    'level': '1',
    'school': 'Divination/Necromancy',
    'sphere': 'Divination, Necromantic',
    'range': '[[30*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': 'Caster',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'The priest’s unholy symbol and a black, hooded cowl which must be worn over the eyes and ears of the priest to benefit from the *spectral senses*.',
    'reference': 'p. 78',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell establishes a sensual link between the priest and an skeleton or a zombie within the spell’s range. This link allows the caster to see what the undead sees as if the priest were looking through the creature’s eyes. The link also enables the priest to hear any sounds that occur in the vicinity of the undead being. The priest can hear and see exactly as if he or she were standing at the same location as the undead creature. The spell also allows the priest to issue simple commands via this link. The spell ends abruptly if either the caster or the undead creature moves out of range or is somehow moved to another plane.\n&emsp;Alternatively, the spell may be cast upon an (inanimate) corpse. In such a case, the spell transmits visual and auditory senses to the priest, but does not confer any ability to command or animate the body.'
};

pri1['Undead Alacrity'] = {
    'level': '1',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': '1 turn + [[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '[[@{level-wizard}]] undead(s)',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'Three drops of water, sinew of any mammal, and a drop of quicksilver.',
    'reference': 'p. 78',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell only affects skeletons and zombies, which temporarily gain the speed and agility of a living human in a peak, healthy state (a movement rate of 12). The undead also gain the same dexterity, initiative, and saving throws as the caster (providing, of course, that these attributes are better than those of the undead). Because of their alacrity, the armor class of the undead is automatically improved by 1 (and possibly further modified by the defense adjustment of the caster, if any).'
};

pri2['Hear Heartbeat'] = {
    'level': '2',
    'school': 'Divination, Necromancy',
    'sphere': 'Divination, Necromantic',
    'range': '0',
    'duration': '1 turn + [[2*[[@{level-priest}]] ]] rounds',
    'aoe': '[[10*[[@{level-priest}]] ]]’ radius',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Beeswax mixed with a tiny drop of the priest’s own blood (to block the sound of his or her own heartbeat). While casting the spell, the priest places the wax in his ears to blot out normal sound and trigger the magical effect.',
    'reference': 'p. 78',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'For the duration of this spell, a priest becomes completely deaf to all normal sounds and may hear only the noise of other creatures’ beating hearts. The heartbeat of each person, animal, or monster in the area of effect is clearly distinct and may convey information about the being’s proximity, direction, size, emotional distress, general health, and race or species. For instance, the heartbeat of a frail old wizard would be much softer and weaker than that of the *invisible* ogre bodyguard, standing behind him. This spell can provide quite confusing results if cast in the presence of numerous individuals (such as on a crowded city street) and is most effective when cast by a cleric in relative seclusion. A priest never hears his or her own heartbeat with this spell. It is effectively masked out by the power of the *hear heartbeat* spell.\n&emsp;Obviously, this spell is of little use with creatures without functioning hearts (such as plants or undead). The spell’s range is diminished if more than a one-inch thickness of wood, stone, or metal lies between the caster and a subject. Each inch of a barrier’s thickness should be treated as 10’ of open space.\n&emsp;Note that the priest is completely oblivious to normal sounds (such as talking or music) while the spell is in effect.'
};

pri2['Resist Turning'] = {
    'level': '2',
    'school': 'Abjuration',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': '1 turn + [[2*[[@{level-priest}]] ]] rounds',
    'aoe': '3” diameter circle',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 79',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'While this spell is in effect, all undead within a 15-yard radius of the affected object or creature gain a resistance to being turned (or commanded) by the clerics and paladins of an opposing religion (compared to that of the caster). The base resistance of the undead to being turned is 20%, plus 5% for every two levels of experience of the caster (60% at 4th, 65% at 6th, 70% at 8th, up to a maximum of 95% at 18th level). Currently [[{50+floor([[@{level-priest}]]/2)*5,95}kl1]]% (**Note:** Base resistance set to 50% to make math match examples).\n&emsp;This resistance roll is made secretly by the DM before each turning attempt is made. A single priest can continue attempting to turn or command the resistant undead creatures each round until either the resistance is overcome or the turn roll indicates failure. The spell can be centered on a stationary object or upon any moving creature, including the caster.'
};

pri3['Death\'s Door'] = {
    'level': '3',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] hours',
    'aoe': 'One human or demihuman',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'The cleric’s holy/unholy symbol, a bit of white linen, and any form of unguent.',
    'reference': 'p. 78',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a cleric employs this spell, he or she touches a subject who is injured, unconscious and “at *death’s door*” (–1 to –9 hit points). The spell immediately brings the wounded individual back up to 0 hit points, bringing the subject back from *death’s door*. Although the victim remains unconscious, bleeding and deterioration are stopped for the duration of the spell. The subject (now at 0 hit points) can be brought immediately to consciousness by clerical spells or items that restore lost hit points.\n&emsp;The DM should modify this spell if he or she disallows the optional rule for “hovering on *death’s door*” (page 104 of the *DMG*). If the DM considers characters to be immediately dead once they reach 0 hit points, then this spell may bring mortally wounded (0 to –9 hit points) characters back to life, providing it is cast within 1–10 rounds of the victim’s demise. The subject must make a system shock roll to survive the transition, and if successful, he or she permanently loses a point of Constitution.\n&emsp;This modified version restores the victim to 1 hit point, which may now be immediately increased by further magical healing, as outlined above. Once too much time elapses after an individual’s death, the victim can only be brought back to life with a *raise dead* spell or some other, more powerful form of necromancy.'
};

pri3['Life Drain'] = {
    'level': '3',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'One creature',
    'components': 'V',
    'cast-time': '6',
    'saving-throw': '½',
    'materials': '',
    'reference': 'p. 80',
    'book': 'The Complete Book of Necromancers',
    'damage': '[[1d8+[[@{level-priest}]] ]]',
    'damage-type': '',
    'healing': 'Same as damage',
    'effect': 'By casting this spell and touching another individual, a priest may fortify another’s life force at the expense of a victim. This spell enables the priest to drain 1–8 hit points plus 1 hp per level of the caster from a living creature. The priest may immediately bestow the hit points on him- or herself, or transfer them to another individual within 1–4 rounds of the casting. The stolen hit points can increase those of the recipient beyond the normal maximum, and these extra hit points only last for up to one turn per the caster’s level. Currently [[@{level-priest}]] turns. Any damage suffered by the subject is first subtracted from these additional hit points.\n&emsp;Though predominantly employed by evil priests at the expense of innocents, the spell may be used by those of noble intent, but only if all participants act of their own accord. However, if the victim (the donor of the life force) is unwilling, a saving throw indicates that the spell was partially resisted and only half the hit points were drained. Undead can neither benefit nor be harmed by *life draining*. It is possible, however, for an undead priest to drain hit points from a victim and bestow them on a living ally.'
};

pri3['Spirit Bind'] = {
    'level': '3',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Necromantic',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': 'One corpse',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 80',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast near the corpse of a newly dead individual, this spell binds an individual’s life force to its physical remains, preventing a spirit’s departure to the afterlife. The (presumably unwilling) spirit of the deceased is entitled to a saving throw vs. spells to resist the effect (made as if still alive), modified by a –1 penalty for every three levels of experience past the 1st of the priest (–2 penalty at 7th level, –3 at 10th level, to a maximum of –6 at 19th level). Currently [[{ceil(([[@{level-priest}]]-1)/-3),-6}kh1]].\n&emsp;*Spirit bind* must be cast on the body of the deceased within one round of the individuals’ death, for every level of experience of the caster. Currently [[@{level-priest}]] rounds. Thus a 10th-level priest may bind the spirit of an individual who was dead for up to a turn. If successful, the *spirit bound* corpse takes on a pale silvery or mauve radiance. Normal animals and even monsters of low intelligence will involuntarily shun this necromantic aura.\n&emsp;While under the effect of this spell, a cadaver becomes immune to the normal effects of rot and decay. *Spirit bind* may thus be employed to preserve a body for a subsequent *raising* or *resurrection*, for which the spirit bound individual is considered to have been dead for less than a day. Furthermore, because of the strong, necromantic link already forged between the spirit and the body, the victim receives a –10% bonus on his or her system shock roll.\n&emsp;However, this spell is more often put to much darker ends by death priests. Note that, for the deceased, being *spirit bound* is not a pleasant experience. The spirit may not be aware of its current location or the passage of time (or so good-aligned priests who employ this spell may like to think), but it is most certainly aware of being trapped or constrained. Once *bound* to its body, a spirit is much easier to coerce with threats of permanent imprisonment and to interrogate with *speak with dead* spells. Some sages speculate *spirit bind* may be also involved in the loathsome creation of a flesh golem.\n&emsp;While immune to normal decay and dissolution (and the ravaging of animals and dumb monsters), the *spirit bound* corpse is in no way protected from destruction by a sentient creature or individual. Should its body be destroyed, the spirit instead becomes *bound* to the last area resided by the physical remains. Such a restless, quasi-liberated spirit might become a non-corporeal undead (such as an apparition, banshee, haunt, poltergeist, wraith, ghost, or spectre). A spirit imprisoned in this manner may only be released by casting the reverse of this spell (see below) or *dispel evil* (*dispel magic* and *reverse curse* are ineffective). Because of the considerable dangers for the subject and moral quandaries involved, good-aligned priests are naturally reluctant to employ *spirit bind* except in the most dire emergencies.\n&emsp;The reverse of this spell, *spirit release*, severs a spirit’s ties with the material world and is a common practice at formal funerals. Unwilling, non-corporeal undead are entitled to a saving throw to resist the spell’s effects, subject to the same penalties as outlined for *spirit bind*. If failed, the undead spirit departs for the outer planes and is effectively dispersed. Note that neither version of this spell affects corporeal undead (such as ghouls, liches, and vampires), nor do they affect extraplanar creatures.'
};

pri4['Cause Insanity'] = {
    'level': '4',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Necromantic, Thought',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 81',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell drives a victim insane. The DM may consult the madness table in Chapter Three or choose a form of insanity to suit the wicked caster. A death priest, for instance, might inflict a victim with an exaggerated fear of dying (requiring the character to make a saving throw vs. paralyzation to avoid the effects of a *fear* spell whenever he or she encounters a cadaver, human bones, a graveyard, or even an open coffin). Alternatively, the victim might become convinced that all corpses were undead, waiting to rip him or her to shreds. In a combat situation, a death priest will probably choose to quickly neutralize an opponent with an incapacitating form of insanity, such as *confusion* or *feeblemindedness*. The insanity is permanent and cannot be dispelled except by casting *cure insanity* (the reverse), *heal*, *restoration*, or *wish*.\n&emsp;The reverse of this spell immediately cures insanity due to most causes (no saving throw). The spell must be administered while the patient is exhibiting insane symptoms. *Cure insanity* can heal a conscious victim of the effects of hallucinatory spores and repair psychic trauma (resulting from a mindwipe or other psionic assault). The spell also diminishes psychic exhaustion (restoring 5–40 PSPs). It cures madness resulting from spells (such as *confusion*, *chaos*, *contact other plane*, *feeblemind*, *symbol of insanity*, and *prismatic spray*, *wall*, or *sphere*) and also heals the insanity caused by certain magical items (such as an *elixir of madness* or a *scarab of insanity*). However, the spell will not control aberrant behaviors caused by lycanthropy, undeath, or powerful curses (such as a *geas* or *quest*). Finally, at the DM’s discretion, *cure insanity* may temporarily calm the demented behavior of certain extraplanar creatures (such as slaad).'
};

pri4['Heart Blight'] = {
    'level': '4',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': '[[10*[[@{level-priest}]] ]]’',
    'duration': 'Special (up to three rounds)',
    'aoe': 'One living creature',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 82',
    'book': 'The Complete Book of Necromancers',
    'damage': 'Round 1: 1d8, Round 2: 25%, Round 3: Death',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, an evil necromancer priest may exert his or her dark will on the still-beating heart of any living victim, provided the target remains in clear view (line of sight) and within the spell’s range. After casting the spell, the priest must focus his or her entire concentration on the victim’s heart for three rounds, during which time the caster may not cast other spells or engage in melee. The priest may, however, walk, talk, and take ordinary defensive precautions while the spell runs its course through the victim.\n&emsp;During the first round of the spell, the victim must make a saving throw vs. death magic with a –2 penalty. This saving throw is modified according to the victim’s hit point adjustment due to Constitution (+1 bonus for 15 Con, +2 for 16 Con, and so on; see page 21 in the *PHB* for more on this).\n&emsp;If the victim makes this first saving throw, the spell fails to take hold of his or her heart and has no further effect. If the victim fails the save, however, then he or she suffers a massive spasm of pain in the chest (similar to that felt in a heart attack), inflicting 1–8 points of damage on the victim and completely incapacitating the individual for one excruciating round.\n&emsp;During the second round, the victim is entitled to another saving throw, this time with a –1 penalty (plus any bonuses for Con). As before, if the victim makes the save, the spell ends with no further effect. If failed, however, the victim’s chest pain intensifies, as if a searing band of iron were being slowly tightened around the heart. The character experiences severe dizziness, disorientation, and terrible shooting pains in the arms, jaw, and left shoulder.\n&emsp;Meanwhile, the victim loses 25% of any remaining hit points, is paralyzed with pain for 2–5 rounds, and immediately loses 2–5 points of Strength, Constitution, and Dexterity. Providing the victim survives the final stage of the spell (see below), these lost points are regained at a rate of 1 point in each these three ability scores per day.\n&emsp;On the third round of the spell, the target must make a (third, unmodified) saving throw vs. death magic or suffer a massive heart attack, resulting in immediate death (onset time is 1 round, during which time, the victim is completely incapacitated). Alternatively, a kind DM might decide that the final phase of the spell merely plunges the victim into a deep, death-like coma, lasting 1–4 days and resulting in the permanent loss of 1 point of Constitution.\n&emsp;This deadly spell may be thwarted in a number of ways. Successfully casting *dispel magic* on either the victim or the priest will disrupt the *heart blight*, as will casting a simple *protection from evil* spell on the victim or wearing a *scarab of protection* (this drains a charge, however). Furthermore, the victim may be entitled to repeat a saving throw with a +2 bonus if treated by another character with the healing non-weapon proficiency. Finally, the spell is immediately broken if the victim is transported out of range or removed from the priest’s line of sight. Because of its murderous effect, this spell is only granted to wicked priests by the gods of Death, Disease, and Evil.'
};

pri4['Plague Curse'] = {
    'level': '4',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': 'See below',
    'aoe': 'One creature or object',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'The priest’s unholy symbol and a small ball of myrrh.',
    'reference': 'p. 82',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, a necromancer bestows a powerful curse on a person or object which becomes a carrier for plague and contagion. Every person or animal that comes in direct physical contact with the cursed carrier must make a saving throw vs. death magic or contract a fatal disease (as described in the 3rd-level priest spell *cause disease* on pages 267 of the *PHB*), resulting in a victim’s slow, agonizing demise within 2–5 weeks. The living focus of a *plague curse* is completely immune from the effects of the disease he or she carries. In many cases, the carrier will be oblivious to his cursed condition—especially if the carrier is a frequent traveler and does not remain in a single location long enough for the plague symptoms to surface in those he or she contacts.\n&emsp;The carrier of a *plague curse* displays no outward signs of disease and radiates only a very faint aura of necromancy (only a 5% chance of detecting per level). The curse may only be removed from an individual by a priest of higher level than the caster (*dispel magic* has no effect); alternatively, a cursed object may be cleansed by destruction in fire.\n&emsp;Normally, the curse only expires after it has claimed one life for each level of the original caster. As for the deadly affliction caused by a *plague curse*, it may be successfully treated with a paladin’s healing touch or with such spells as *cure disease*, *heal*, or *restoration*.\n&emsp;The secrets of this malignant incantation are known only to the scant few priests who serve the cold gods of Pestilence and Decay. It is rumored that some Plague Priests must willingly accept this curse for their religion. Invoking a *plague curse* ages the caster by one year.'
};

pri5['Undead Spell Focus'] = {
    'level': '5',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'One undead',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 83',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'For the duration of this spell, the recipient undead becomes a magical focus for the caster, who can now funnel any chosen, currently-carried “companion” spell through the undead. Any companion spell is emitted from the undead, but all casting activity (including component use) is performed by the priest. Distance does not matter, so long as priest and undead remain on the same plane.\n&emsp;However, unless other spells (such as *spectral sense*s, *reflecting pool*, or *magic font*) are employed to “see” the undead’s current surroundings (or it is in a known location), companion spells will be hurled blindly. A priest can cast multiple spells, one per round, through the undead, until it is destroyed or a maximum of one spell per level of the priest has been cast or the spell expires (it lasts up to 10 turns per level). Currently up to [[@{level-priest}]] spells or [[10*[[@{level-priest}]] ]] turns.\n&emsp;With this spell, a hidden priest can avoid direct combat, employing an undead as a spell-casting fighting-focus. This spell can be cast on an undead affected by *spectral sense*s, *undead alacrity*, or *resist turning*, and the spells will function simultaneously. Finally, the undead may be controlled by clerical ability, spell, or magical item, without hampering the imbuement.'
};

pri5['Scourge'] = {
    'level': '5',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': '120 yards',
    'duration': 'Permanent',
    'aoe': '[[@{level-priest}]] creatures',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'Negate',
    'materials': 'A specially prepared, black whip or riding crop, which is cracked in the direction of the intended victims during the casting of the spell.',
    'reference': 'p. 83',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This nasty spell causes a major disease and weakness in victims who fail a saving throw vs. spells at a –3 penalty. Afflicted individuals are immediately stricken with a sickening *scourge* that quickly spreads to cover their entire bodies. The blackened boils, magenta blotches, violet lesions, seeping abscesses, and malignant cysts are excruciatingly painful, and highly debilitating.\n&emsp;In the short term, the Strength, Dexterity, and Charisma of each victim are reduced by 3. Attack rolls are similarly decreased by 3. The agonizing symptoms persist until a victim receives a *cure disease*, *heal*, or *restoration* spell bestowed by a more powerful priest than the original caster. *Dispel magic* and *remove curse* are powerless to mediate the symptoms of a *scourge*, but a *wish* will eradicate the infection immediately.\n&emsp;A *scourge* may also lead to a long-term, debilitating illness. Those ignoring the malignant disease resulting from the spell’s effects for more than a few days may be susceptible to much worse afflictions (such as gangrene, plague, or leprosy) that ultimately result in the victim’s untimely death within 1–4 weeks.\n&emsp;Furthermore, if a victim of the spell enters an area of dense population, there is always a chance that the disease may spread (1% per caster level, currently [[@{level-priest}]]%) into an epidemic of massive proportions. These long-term effects of the *scourge* are left to the discretion of the DM.\n&emsp;Because of its horrific affect, *scourge* is typically only granted to high priests of a malignant and evil god who is dedicated to spreading death and disease.'
};

pri5['Undead Regeneration'] = {
    'level': '5',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': 'Instantaneous',
    'aoe': 'One undead',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 84',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '[[2d4+[[@{level-priest}]] ]] to undeads',
    'effect': 'With this spell, the priest can “heal” an undead, restoring to its unlife 2d4 hit points plus one point per level of the caster’s experience. As with most spells that restore hit points, *undead regeneration* cannot raise a creature above its normal maximum. Noncorporeal undead can also be affected by reaching into the space they occupy. During the “healing” process, the spell temporarily shields the priest from dangerous contact with the undead, such as aging or paralysis.\n&emsp;The reverse of this spell, *drain undead*, inflicts a like amount of damage. Note that the damage “drained” from the undead creature is lost. It is not gained as healing or extra hit points for the caster. The same protections against undead powers are conferred on the caster as with *undead regeneration*.\n&emsp;Only one undead can be affected by either version of this spell.'
};

pri6['Asphyxiate'] = {
    'level': '6',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': '120 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '[[floor([[@{level-priest}]]/2)]] individuals',
    'components': 'V, S, M',
    'cast-time': '9',
    'saving-throw': 'Negate',
    'materials': 'An unholy symbol and a (symbolic) silken gag, which the priest loosely wraps around his or her own mouth after casting the spell.',
    'reference': 'p. 84',
    'book': 'The Complete Book of Necromancers',
    'damage': 'Saving throw fail: [[1d6]]. Saving throw success: [[1d3]]',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell asphyxiates individuals (chosen by the priest) who fail a saving throw vs. death magic. If fewer than six individuals are targeted with this spell, each receives a –1 penalty on their save (–2 for three creatures or less, –4 if the entire spell is focused on a single creature). This necromancy induces a victim’s throat to constrict and his or her lungs to swell shut, similar to a severe allergic reaction, for so long as the subject remains within range of the spell.\n&emsp;Each round, a victim must attempt a Constitution check. If failed, the victim suffers 1–6 points of damage. If successful, the subject manages to gasp in enough air to reduce the damage to 1–3 points. During its struggles against *asphyxiation*, the affected creature becomes effectively *slowed* (as per the 3rd-level wizard spell). A victim who fails three consecutive Constitution checks has been smothered and dies automatically on the following round.\n&emsp;The effects of *asphyxiate* continue until either the spell expires, a victim withdraws beyond range of the spell, or a successful *dispel magic* is employed on a victim. Victims remain slowed for 1–3 rounds after the spell ends. This spell normally affects only humans or demihumans, though the DM may extend the dominion of the spell to include man-sized or smaller animals and monsters. Obviously, creatures (such as undead and plant creatures) that never breathe cannot be affected by this spell.\n&emsp;Because of its murderous effect, *asphyxiate* is typically granted only to priests serving evil deities.'
};

pri6['Summon Undead'] = {
    'level': '6',
    'school': 'Necromancy, Summoning',
    'sphere': 'Necromantic, Summoning',
    'range': '60 yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 84',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell summons one or more undead into the general vicinity of the priest. The creatures answer the summons within 7–12 rounds ([[1d6+6]]). Upon their arrival, lesser undead will usually seek to eliminate the priest at once unless he (or she) is suitably fortified behind *protection from evil 10’ radius*. More powerful, intelligent undead may attempt to parley with the priest, but they will invariably end the conversation and attack once their initial curiosity has been satisfied. A priest must be prepared to command, cajole, entice, or destroy whatever creature has been called into his service.\n&emsp;Whenever possible, the DM should choose what kind of undead answers the priest’s summoning, based on the caster’s current surroundings, level of ability, and alignment. Alternatively, the DM may roll a d20 and consult the following table:}}{{cc1-1=bottom}}{{c1-1=**Roll**}}{{c2-1=1–8}}{{c3-1=9–12}}{{c4-1=13–14}}{{c5-1=15}}{{c6-1=16}}{{c7-1=17}}{{c8-1=18–20}}{{c1-2=**Summoned Undead (Number Appearing)**}}{{c2-2=Ghouls (4–16)}}{{c3-2=Ghasts (2–8)}}{{c4-2=Shadows or Wights (2–5)}}{{c5-2=Wraiths or Mummy (1–3)}}{{c6-2=Spectre, Ghost, or Banshee (1)}}{{c7-2=Special (1)}}{{c8-2=No undead in range (0)}}{{effects2=&emsp;Special undead might include sons of Kyuss, apparitions, crypt things, eyes of fear and flame, and any other unusual undead creature the DM may *wish* to introduce. In truly rare circumstances (for instance, if the spell is cast near a creature’s lair), this spell might attract the attention of a more powerful undead, such as a death knight, vampire, or even a lich. These beings will seldom arrive in a predictable fashion and are the most likely to demand some form of nasty retribution or lavish sacrifice to appease.\n&emsp;The summoned undead remain in the vicinity of the priest for at least one turn per level and may be commanded to assist the priest in his or her endeavors (including, possibly, attacking the caster’s opponents). Unless fortified with *resist turning*, the undead summoned by this spell can be turned (or commanded) by priests other than the caster. Because it enlists the service of powerful and malicious undead, *summon undead* is granted only to priests serving evil deities.'
};

pri7['Death Pact'] = {
    'level': '7',
    'school': 'Necromancy, Alteration',
    'sphere': 'Necromantic, Summoning',
    'range': 'Change',
    'duration': 'Special',
    'aoe': 'One individual (usually caster)',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'An (un)holy sanctuary consecrated to the caster’s deity and seven drops each of the caster’s blood, the recipient’s blood, (un)holy water, and dew.',
    'reference': 'p. 85',
    'book': 'The Complete Book of Necromancers',
    'damage': '',
    'damage-type': '',
    'healing': 'All hit points except [[1d4+1]]',
    'effect': 'By completing this ritual, a high priest forges a powerful pact with his or her deity. The covenant ensures that a chosen individual will survive an untimely death. A *death pact* is triggered whenever the protected individual is reduced to fewer than 0 hit points (mortally wounded) due to combat, spell, or accident. In the same round, the subject receives the following benefits:\n&emsp;• The individual (or his or her remains) and all possessions are transported immediately back to a religious sanctuary as if by a *word of recall* (the location of the sanctuary must be specified at the time of forging the *death pact*).\n&emsp;• Upon arrival, the individual receives a *raise dead* spell (if necessary) and automatically makes any required system shock roll.\n&emsp;• Any physical damage sustained by the individual is completely *healed* except for 2–5 (1d4+1) points of damage.\n&emsp;• Any severed or amputated limbs are instantaneously *regenerated*.\n&emsp;• The body is cleared of lingering enchantments with a *dispel magic* (bestowed at caster’s level), whether beneficial or baneful, and cleansed of all poisons, diseases, blindness, curses, and insanity.\n&emsp;A *death pact* will remain in effect indefinitely until the conditions established at the time of its forging have been fulfilled. The *pact* may be established to benefit an individual other than the caster. However, in almost all cases, the chosen one must be in good standing with the caster’s religion and agree to undertake a mission that will directly benefit the deity or dark power responsible for granting the spell. A *dispel magic* cannot end a *death pact* prematurely.\n&emsp;This powerful spell is not without its costs, however. Forging a *death pact* is an exhaustively stressful process, drawing the priest into draining audiences with extraplanar powers. As a result, establishing a *death pact* ages the caster five years and requires at least one week for complete recuperation, during which time the priest cannot cast any spells or engage in any physically demanding activity. Furthermore, when the pact is invoked, the mystical transport and instantaneous healing exacts another toll, this time aging the recipient for five years (if the individual was *raised*, he or she also loses one point of Constitution permanently). Thus, if the priest casts the spell on him- or herself, he or she must be prepared to sacrifice at least ten years of life!\n&emsp;This powerful pact has enabled many “slain” priests to return from the dead and eliminate their enemies. Wicked necromancers in the service of evil deities are rumored to have significantly reduced the terrible personal toll on the caster by some unspeakably foul sacrifice. Note that powerful wizard necromancers might achieve a similar effect with *wish*-fortified *contingency* spells.'
};
//#endregion

const priestSpells = {};
priestSpells['pri1'] = pri1;
priestSpells['pri2'] = pri2;
priestSpells['pri3'] = pri3;
priestSpells['pri4'] = pri4;
priestSpells['pri5'] = pri5;
priestSpells['pri6'] = pri6;
priestSpells['pri7'] = pri7;
priestSpells['priq'] = priq;

const primonster = {};
for (const [_, section] of Object.entries(priestSpells)) {
    for (const [spellName, spell] of Object.entries(section)) {
        primonster[spellName] = spell;
    }
}
priestSpells['primonster'] = primonster;
/* ---- Priest spells end ---- */
module.exports = priestSpells;