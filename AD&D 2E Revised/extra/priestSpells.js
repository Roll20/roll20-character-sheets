/* ---- Priest spells start ---- */
const pri1 = {}
pri1['Animal Friendship'] = {
    'name': 'Animal Friendship',
    'level': 'Level 1 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': '1 animal',
    'components': 'V, S, M',
    'cast-time': '1 hour',
    'saving-throw': 'Negate',
    'materials': 'The caster’s holy symbol and a piece of food liked by the animal.',
    'reference': 'PHB p. 252',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to show any animal of animal intelligence to semi-intelligence (i.e., Intelligence 1–4) that he desires friendship. If the animal does not roll a successful saving throw vs. spell immediately when the spell is begun, it stands quietly while the caster finishes the spell. Thereafter, it follows the caster about. The spell functions only if the caster actually wishes to be the animal’s friend. If the caster has ulterior motives, the animal always senses them (for example, the caster intends to eat the animal, send it ahead to set off traps, etc.). \n&emsp;The caster can teach the befriended animal three specific tricks or tasks for each point of Intelligence it possesses. Typical tasks are those taught to a dog or similar pet (i.e., they cannot be complex). Training for each such trick must be done over a period of one week, and all must be done within three months of acquiring the creature. During the three-month period, the animal will not harm the caster, but if the creature is left alone for more than a week, it will revert to its natural state and act accordingly. \n&emsp;The caster can use this spell to attract up to 2 Hit Dice of animal(s) per experience level he possesses. This is also the maximum total Hit Dice of the animals that can be attracted and trained at one time: no more than twice the caster’s experience level. Current maximum [[2*[[@{level-priest}]] ]] Hit Dice of animals. Only unaligned animals can be attracted, befriended, and trained.'
};

pri1['Bless'] = {
    'name': 'Bless',
    'level': 'Level 1 Priest',
    'school': 'Conjuration/Summoning',
    'sphere': 'All',
    'range': '60 yards',
    'duration': '6 rounds',
    'aoe': '50-feet cube',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Bless requires holy water. Curse requires the sprinkling of unholy water.',
    'reference': 'PHB p. 252',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon uttering the *bless* spell, the caster raises the morale of friendly creatures and any saving throw rolls they make against *fear* effects by +1. Furthermore, it raises their attack dice rolls by +1. A blessing, however, affects only those not already engaged in melee combat. The caster determines at what range (up to 60 yards) he will cast the spell. At the instant the spell is completed, it affects all creatures in a 50-foot cube centered on the point selected by the caster (thus, affected creatures leaving the area are still subject to the spell’s effect; those entering the area after the casting is completed are not). \n&emsp;A second use of this spell is to bless a single item (for example, a crossbow bolt for use against a rakshasa). The weight of the item is limited to one pound per caster level and the effect lasts until the item is used or the spell duration ends. \n&emsp;Multiple *bless* spells are not cumulative. \n&emsp;This spell can be reversed by the priest to a *curse* spell that, when cast upon enemy creatures, lowers their morale and attack rolls by –1.'
};

pri1['Combine'] = {
    'name': 'Combine',
    'level': 'Level 1 Priest',
    'school': 'Evocation',
    'sphere': 'All',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Circle of priests',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 252',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Using this spell, three to five priests combine their abilities so that one of them casts spells and turns undead at an enhanced level. The highest-level priest (or one of them, if two or more are tied for highest) stands alone, while the others join hands in a surrounding circle. The central priest casts the *combine* spell. He temporarily gains one level for each priest in the circle, up to a maximum gain of four levels. The level increase affects turning undead and spell details that vary with the caster’s level. Note that the central priest gains no additional spells and that the group is limited to his currently memorized spells. \n&emsp;The encircling priests must concentrate on maintaining the combine effect. They lose all Armor Class bonuses for shield and Dexterity. If any of them has his concentration broken, the *combine* spell ends immediately. If the *combine* spell is broken while the central priest is in the act of casting a spell, that spell is ruined just as if the caster were disturbed. Spells cast in combination have the full enhanced effect, even if the combine is broken before the duration of the enhanced spell ends. Note that the combination is not broken if only the central caster is disturbed.'
};

pri1['Command'] = {
    'name': 'Command',
    'level': 'Level 1 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Charm',
    'range': '30 yards',
    'duration': '1 round',
    'aoe': '1 creature',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 252',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the priest to command another creature with a single word. The command must be uttered in a language understood by the creature. The subject will obey to the best of his/its ability only as long as the command is absolutely clear and unequivocal; thus, a command of “Suicide!” is ignored. A command to “Die!” causes the creature to fall in a faint or cataleptic state for one round, but thereafter the creature revives and is alive and well. Typical commands are back, halt, flee, run, stop, fall, go, leave, surrender, sleep, rest, etc. No command affects a creature for more than one round; undead are not affected at all. Creatures with Intelligence of 13 (high) or more, or those with 6 or more Hit Dice (or experience levels) are entitled to a saving throw vs. spell, adjusted for Wisdom. (Creatures with 13 or higher Intelligence *and* 6 Hit Dice/levels get only one saving throw!)'
};

pri1['Create Water'] = {
    'name': 'Create Water',
    'level': 'Level 1 Priest',
    'school': 'Alteration',
    'sphere': 'Elemental (Water)',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': 'Up to 27 cubic feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The *create water* spell requires at least a drop of water; the *destroy water* spell, at least a pinch of dust.',
    'reference': 'PHB p. 253',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the priest casts a *create water* spell, up to 4 gallons of water are generated for every experience level of the caster (Currently up to [[4*[[@{level-priest}]] ]] gallons). The water is clean and drinkable (it is just like rain water). The created water can be dispelled within a round of its creation; otherwise, its magic fades, leaving normal water that can be used, spilled, evaporated, etc. The reverse of the spell, *destroy water*, obliterates without trace (no vapor, mist, fog, or steam) a like quantity of water. Water can be created or destroyed in an area as small as will actually contain the liquid, or in an area as large as 27 cubic feet (1 cubic yard). \n&emsp;Note that water can neither be created nor destroyed within a creature. For reference purposes, water weighs about 8½ pounds per gallon, and a cubic foot of water weighs approximately 64 pounds.'
};

pri1['Cure Light Wounds'] = {
    'name': 'Cure Light Wounds',
    'level': 'Level 1 Priest',
    'school': 'Necromancy',
    'sphere': 'Healing',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 253',
    'damage': '',
    'damage-type': '',
    'healing': '[[1d8]]',
    'effect': 'When casting this spell and laying his hand upon a creature, the priest causes 1d8 points of wound or other injury damage to the creature’s body to be healed. This healing cannot affect creatures without corporeal bodies, nor can it cure wounds of creatures not living or of extraplanar origin. \n&emsp;The reverse of the spell, *cause light wounds*, operates in the same manner, inflicting 1d8 points of damage. If a creature is avoiding this touch, an attack roll is needed to determine if the priest’s hand strikes the opponent and causes such a wound. \n&emsp;Curing is permanent only insofar as the creature does not sustain further damage; caused wounds will heal—or can be cured—just as any normal injury.'
};

pri1['Detect Evil'] = {
    'name': 'Detect Evil',
    'level': 'Level 1 Priest',
    'school': 'Divination',
    'sphere': 'All',
    'range': '0',
    'duration': '1 turn + [[5*[[@{level-priest}]] ]] rounds',
    'aoe': '10 feet x 120 yards',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The use of the priest’s holy symbol as its material component, with the priest holding it before him.',
    'reference': 'PHB p. 253',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell discovers emanations of evil, or of good in the case of the reverse spell, from any creature, object, or area. Character alignment, however, is revealed only under unusual circumstances: characters who are strongly aligned, who do not stray from their faith, and who are of at least 9th level might radiate good or evil *if intent upon appropriate actions*. Powerful monsters, such as rakshasas or ki-rin, send forth emanations of evil or good, even if polymorphed. Aligned undead radiate evil, for it is this power and negative force that enable them to continue existing. An evilly cursed object or unholy water radiates evil, but a hidden trap or an unintelligent viper does not. \n&emsp;The degree of evil (dim, faint, moderate, strong, or overwhelming) and possibly its general nature (expectant, malignant, gloating, etc.) can be noted. If the evil is overwhelming, the priest has a 10% chance per level ([[10*[[@{level-priest}]] ]]%) of detecting its general bent (lawful, neutral, or chaotic). The duration of a *detect evil* (or *detect good*) spell is one turn plus five rounds per level of the priest. Thus, a 1st-level priest can cast a spell with a 15-round duration, a 2nd-level priest can cast a spell with a 20-round duration. Current duration [[10+(5*[[@{level-priest}]])]] rounds. The spell has a path of detection 10 feet wide in the direction the priest is facing. The priest must concentrate—stop, have quiet, and intently seek to detect the aura— for at least one round to receive a reading.'
};

pri1['Detect Magic'] = {
    'name': 'Detect Magic',
    'level': 'Level 1 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': '1 turn',
    'aoe': '10 feet x 30 yards',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The use of the priest’s holy symbol.',
    'reference': 'PHB p. 253',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the *detect magic* spell is cast, the priest detects magical radiations in a path 10 feet wide and up to 30 yards long, in the direction he is facing. The intensity of the magic can be detected (dim, faint, moderate, strong, or overwhelming). The caster has a 10% chance per level ([[10*[[@{level-priest}]] ]]%) to determine the sphere of the magic, but unlike the wizard version of the spell, the type of magic (alteration, conjuration, etc.) cannot be divined. The caster can turn, scanning a 60° arc per round. The spell is blocked by solid stone at least 1 foot thick, solid metal at least 1 inch thick, or solid wood at least 1 yard thick.'
};

pri1['Detect Poison'] = {
    'name': 'Detect Poison',
    'level': 'Level 1 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': '1 turn + [[@{level-priest}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A strip of specially blessed vellum, which turns black if poison is present.',
    'reference': 'PHB p. 254',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the priest to determine if an object has been poisoned or is poisonous. One object, or one 5-foot cubic mass, can be checked per round. The priest has a 5% chance per level of determining the exact type of poison. Currently [[5*[[@{level-priest}]] ]]% of detecting the type of poison.'
};

pri1['Detect Snares & Pits'] = {
    'name': 'Detect Snares & Pits',
    'level': 'Level 1 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': '[[4*[[@{level-priest}]] ]] rounds',
    'aoe': '10 x 40 feet',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'The caster must have his holy symbol to complete the spell.',
    'reference': 'PHB p. 254',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, the caster is able to detect snares, pits, deadfalls and similar hazards along a path 10 feet wide and 40 feet long. Such hazards include simple pits, deadfalls, snares of wilderness creatures (for example, trapdoor spiders, giant sundews, ant lions, etc.), and primitive traps constructed of natural materials (mantraps, missile trips, hunting snares, etc.). The spell is directional—the caster must face the desired direction to determine if a pit exists or a trap is laid in that direction. The caster experiences a feeling of danger from the direction of a detected hazard, which increases as the danger is approached. The caster learns the general nature of the danger (pit, snare, or deadfall) but not its exact operation, nor how to disarm it. Close examination, however, enables the caster to sense what intended actions might trigger it. The spell detects certain natural hazards— quicksand (snare), sinkholes (pit), or unsafe walls of natural rock (deadfall). Other hazards, such as a cavern that floods during rain, an unsafe construction, or a naturally poisonous plant, are not revealed. The spell does not detect magical traps (save those that operate by pit, deadfall, or snaring; see the 2ndlevel spell *trip* and the 3rd-level *spell snare*), nor those that are mechanically complex, nor those that have been rendered safe or inactive.'
};

pri1['Endure Cold/Endure Heat'] = {
    'name': 'Endure Cold/Endure Heat',
    'level': 'Level 1 Priest',
    'school': 'Alteration',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[1.5*[[@{level-priest}]] ]] hours',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The create water spell requires at least a drop of water; the destroy water spell, at least a pinch of dust.',
    'reference': 'PHB p. 254',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The creature receiving this spell is protected from normal extremes of cold or heat (depending on which application the priest selects at the time of casting). The creature can stand unprotected in temperatures as low as –30° F. or as high as 130° F. (-34° to 54° C) (depending on application) with no ill effect. Temperatures beyond these limits inflict 1 point of damage per hour of exposure for every degree beyond the limit. The spell is immediately cancelled if the recipient is affected by any non-normal heat or cold, such as magic, breath weapons, and so on. The cancellation occurs regardless of the application and regardless of whether a heat or cold effect hits the character (for example, an *endure cold* spell is cancelled by magical heat or fire as well as by magical cold). The recipient of the spell does not suffer the first 10 points of damage (after any applicable saving throws) from the heat or cold during the round in which the spell is broken. The spell ends instantly if either *resist fire* or *resist cold* is cast upon the recipient.'
};

pri1['Entangle'] = {
    'name': 'Entangle',
    'level': 'Level 1 Priest',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '80 yards',
    'duration': '1 turn',
    'aoe': '40-feet cube',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': '½',
    'materials': 'The caster’s holy symbol.',
    'reference': 'PHB p. 254',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to cause plants in the area of effect to entangle creatures within the area. The grasses, weeds, bushes, and even trees wrap, twist, and entwine about the creatures, holding them fast for the duration of the spell. Any creature entering the area is subject to this effect. A creature that rolls a successful saving throw vs. spell can escape the area, moving at only 10 feet per round until out of the area. Exceptionally large (gargantuan) or strong creatures may suffer little or no distress from this spell, at the DM’s option, based on the strength of the entangling plants.'
};

pri1['Faerie Fire'] = {
    'name': 'Faerie Fire',
    'level': 'Level 1 Priest',
    'school': 'Alteration',
    'sphere': 'Weather',
    'range': '80 yards',
    'duration': '[[4*[[@{level-priest}]] ]] rounds',
    'aoe': '[[10*[[@{level-priest}]] ]] square feet within 40-feet radius',
    'components': 'V, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A small piece of foxfire',
    'reference': 'PHB p. 254',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to outline one or more objects or creatures with a pale glowing light. The number of subjects outlined depends upon the number of square feet the caster can affect. Sufficient footage enables several objects or creatures to be outlined by the *faerie fire* spell, but one must be fully outlined before the next is begun, and all must be within the area of effect. Outlined objects or creatures are visible at 80 yards in the dark and 40 yards if the viewer is near a bright light source. Outlined creatures are easier to strike; thus, opponents gain a +2 bonus to attack rolls in darkness (including moonlit nights) and a +1 bonus in twilight or better. Note that outlining can render otherwise invisible creatures visible. However, it cannot outline noncorporeal, ethereal, or gaseous creatures. Nor does the light come anywhere close to sunlight. Therefore, it has no special effect on undead or dark-dwelling creatures. The faerie fire can be blue, green, or violet according to the word of the caster at the time of casting. The faerie fire does not cause any harm to the object or creature thus outlined.'
};

pri1['Invisibility to Animals'] = {
    'name': 'Invisibility to Animals',
    'level': 'Level 1 Priest',
    'school': 'Alteration',
    'sphere': 'Animal',
    'range': 'Touch',
    'duration': '1 turn + [[@{level-priest}]] rounds',
    'aoe': '[[@{level-priest}]] creatures',
    'components': 'S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'Holly rubbed over the recipient.',
    'reference': 'PHB p. 255',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When an *invisibility to animals* spell is cast, the creature touched becomes totally undetectable by normal animals with Intelligences under 6. Normal animals includes giant-sized varieties, but it excludes any with magical abilities or powers. The enchanted individual is able to walk among such animals or pass through them as if he did not exist. For example, this individual could stand before the hungriest of lions or a tyrannosaurus rex and not be molested or even noticed. However, a nightmare, hell hound, or winter wolf would certainly be aware of the individual. For every level the caster has achieved, one creature can be rendered invisible. Any recipient attacking while this spell is in effect ends the spell immediately (for himself only).'
};

pri1['Invisibility to Undead'] = {
    'name': 'Invisibility to Undead',
    'level': 'Level 1 Priest',
    'school': 'Abjuration',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': '6 rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': 'The priest’s holy symbol',
    'reference': 'PHB p. 255',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes affected undead to lose track of and ignore the warded creature for the duration of the spell. Undead of 4 or fewer Hit Dice are automatically affected, but those with more Hit Dice receive a saving throw vs. spell to avoid the effect. Note that a priest protected by this spell cannot turn affected undead. The spell ends immediately if the recipient makes any attack, although casting spells such as *cure light wounds*, *augury*, or *chant* does not end the ward.'
};

pri1['Light'] = {
    'name': 'Light',
    'level': 'Level 1 Priest',
    'school': 'Alteration',
    'sphere': 'Sun',
    'range': '120 yards',
    'duration': '1 hour + [[@{level-priest}]] turns',
    'aoe': '20-feet-radius globe',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 255',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes a luminous glow within 20 feet of the spell’s center. The area of light thus caused is equal in brightness to torchlight. Objects in darkness beyond this sphere can be seen, at best, as vague and shadowy shapes. The spell is centered on a point selected by the caster, and he must have a line of sight or unobstructed path to that point when the spell is cast. Light can spring from air, rock, metal, wood, or almost any similar substance. The effect is immobile unless it is specifically centered on a movable object or mobile creature. If this spell is cast upon a creature, any applicable magic resistance and saving throws must be rolled. Successful resistance negates the spell, while a successful saving throw indicates that the spell is centered immediately behind the creature, rather than upon the creature itself. A *light* spell centered on the visual organs of a creature blinds it, reducing its attack and saving throw rolls by 4 and worsening its Armor Class by 4. The caster can extinguish the light at any time by uttering a single word. *Light* spells are not cumulative—multiple castings do not provide a brighter light. \n&emsp;The spell is reversible, causing darkness in the same area and under the same conditions as the *light* spell, but with half the duration. Magical darkness is equal to that of an unlit interior room— pitch darkness. Any normal light source or magical light source of lesser intensity than full daylight does not function in magical darkness. A *darkness* spell cast directly against a *light* spell cancels both, and vice versa.'
};

pri1['Locate Animals or Plants'] = {
    'name': 'Locate Animals or Plants',
    'level': 'Level 1 Priest',
    'school': 'Divination',
    'sphere': 'Divination (Animal, Plant)',
    'range': '[[100+(20*[[@{level-priest}]])]] yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '[[20*[[@{level-priest}]] ]] yards x 20 feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol.',
    'reference': 'PHB p. 255',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The caster can find the direction and distance of any one type of animal or plant he desires. The caster, facing in a direction, thinks of the animal or plant, and then knows if any such animal or plant is within range. If so, the exact distance and approximate number present is learned. During each round of the spell’s duration, the caster can face in only one direction (i.e., only a 20-foot-wide path can be known). The spell lasts one round per level of experience of the caster, while the length of the path is 100 yards plus 20 yards per level of experience. (At the DM’s option, some casters may be able to locate only those animals [or plants] associated closely with their own mythos.) While the exact chance of locating a specific type of animal or plant depends on the details and circumstances of the locale, the general frequency of the subject can be used as a guideline: common = 50%, uncommon = 30%, rare = 15%, and very rare = 5%. Most herbs grow in temperate regions, while most spices grow in tropical regions. Most plants sought as spell components or for magical research are rare or very rare. The results of this spell are always determined by the DM.'
};

pri1['Magical Stone'] = {
    'name': 'Magical Stone',
    'level': 'Level 1 Priest',
    'school': 'Enchantment',
    'sphere': 'Combat',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '3 pebbles',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and three small pebbles, unworked by tools or magic of any type.',
    'reference': 'PHB p. 256',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By using this spell, the priest can temporarily enchant up to three small pebbles, no larger than sling bullets. The magical stones can then be hurled or slung at an opponent. If hurled, they can be thrown up to 30 yards, and all three can be thrown in one round. The character using them must roll normally to hit, although the magic of the stones enables any character to be proficient with them. The stones are considered +1 weapons for determining if a creature can be struck (those struck only by magical weapons, for instance), although they do not have an attack or damage bonus. Each stone that hits inflicts 1d4 points of damage (2d4 points against undead). The magic in each stone lasts only for half an hour, or until used.'
};

pri1['Pass Without Trace'] = {
    'name': 'Pass Without Trace',
    'level': 'Level 1 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[@{level-priest}]] creatures',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A sprig of pine or evergreen, which must be burned and the ashes powdered and scattered when the spell is cast.',
    'reference': 'PHB p. 256',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the recipient can move through any type of terrain—mud, snow, dust, etc.—and leave neither footprints nor scent. The area that is passed over radiates magic for [[1d6]] turns after the affected creature passes. Thus, tracking a person or other creature covered by this spell is impossible by normal means. Of course, intelligent tracking techniques, such as using a spiral search pattern, can result in the trackers picking up the trail at a point where the spell has worn off.'
};

pri1['Protection From Evil'] = {
    'name': 'Protection From Evil',
    'level': 'Level 1 Priest',
    'school': 'Abjuration',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[3*[[@{level-priest}]] ]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'Holy water or burning incense / A circle of unholy water or smoldering dung.',
    'reference': 'PHB p. 256',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, it creates a magical barrier around the recipient at a distance of 1 foot. The barrier moves with the recipient and has three major effects: \n&emsp;First, all attacks made by evil or evilly enchanted creatures against the protected creature receive a penalty of –2 to each attack roll, and any saving throws caused by such attacks are made by the protected creature with a +2 bonus. \n&emsp;Second, any attempt to exercise mental control over the protected creature (if, for example, it has been charmed by a vampire) or to invade and take over its mind (as by a ghost’s magic jar attack) is blocked by this spell. Note that the protection does not prevent a vampire’s charm itself, nor end it, but it does prevent the vampire from exercising mental control through the barrier. Likewise, an outside life force is merely kept out, and would not be expelled if in place before the protection was cast. \n&emsp;Third, the spell prevents bodily contact by creatures of an extraplanar or conjured nature (such as aerial servants, elementals, imps, invisible stalkers, salamanders, water weirds, xorn, and others). This causes the natural (body) weapon attacks of such creatures to fail and the creature to recoil if such attacks require touching the protected creature. Animals or monsters summoned or conjured by spells or similar magic are likewise hedged from the character. This protection ends if the protected character makes a melee attack against or tries to force the barrier against the blocked creature. \n&emsp;This spell can be reversed to become *protection from good*, with the second and third benefits remaining unchanged.'
};

pri1['Purify Food & Drink'] = {
    'name': 'Purify Food & Drink',
    'level': 'Level 1 Priest',
    'school': 'Alteration',
    'sphere': 'All',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '[[@{level-priest}]] cube feet in 10 square feet',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A sprig of pine or evergreen, which must be burned and the ashes powdered and scattered when the spell is cast.',
    'reference': 'PHB p. 256',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast, this spell makes spoiled, rotten, poisonous, or otherwise contaminated food and water pure and suitable for eating and drinking. Up to 1 cubic foot of food and drink per level can be thus made suitable for consumption. This spell does not prevent subsequent natural decay or spoilage. Unholy water and similar food and drink of significance is spoiled by *purify food and drink*, but the spell has no effect on creatures of any type nor upon magical potions. \n&emsp;The reverse of the spell is *putrefy food and drink*. This spoils even holy water; however, it likewise has no effect upon creatures or potions.'
};

pri1['Remove Fear'] = {
    'name': 'Remove Fear',
    'level': 'Level 1 Priest',
    'school': 'Abjuration',
    'sphere': 'Charm',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '[[ceil([[@{level-priest}]]/4)]] creatures',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A sprig of pine or evergreen, which must be burned and the ashes powdered and scattered when the spell is cast.',
    'reference': 'PHB p. 256',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The priest casting this spell instills courage in the spell recipient, raising the creature’s saving throw rolls against magical *fear* attacks by +4 for one turn. If the recipient has recently (that day) failed a saving throw against such an attack, the spell immediately grants another saving throw, with a +4 bonus to the die roll. For every four levels of the caster, one creature can be affected by the spell (one creature at levels 1 through 4, two creatures at levels 5 through 8, etc.). \n&emsp;The reverse of the spell, *cause fear*, causes one creature to flee in panic at maximum movement speed away from the caster for 1d4 rounds. A successful saving throw against the reversed effect negates it, and any Wisdom adjustment also applies. Of course, *cause fear* can be automatically countered by *remove fear* and vice versa. \n&emsp;Neither spell has any effect on undead of any sort.'
};

pri1['Sanctuary'] = {
    'name': 'Sanctuary',
    'level': 'Level 1 Priest',
    'school': 'Abjuration',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[2+[[@{level-priest}]] ]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a small silver mirror.',
    'reference': 'PHB p. 257',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the priest casts a *sanctuary* spell, any opponent attempting to strike or otherwise directly attack the protected creature must roll a saving throw vs. spell. If the saving throw is successful, the opponent can attack normally and is unaffected by that casting of the spell. If the saving throw is failed, the opponent loses track of and totally ignores the warded creature for the duration of the spell. Those not attempting to attack the subject remain unaffected. Note that this spell does not prevent the operation of area attacks (fireball, ice storm, etc.). While protected by this spell, the subject cannot take direct offensive action without breaking the spell, but may use nonattack spells or otherwise act in any way that does not violate the prohibition against offensive action. This allows a warded priest to heal wounds, for example, or to bless, perform an augury, chant, cast a light in the area (but not upon an opponent), and so on.'
};

pri1['Shillelagh'] = {
    'name': 'Shillelagh',
    'level': 'Level 1 Priest',
    'school': 'Alteration',
    'sphere': 'Combat, Plant',
    'range': 'Touch',
    'duration': '[[4+[[@{level-priest}]] ]] rounds',
    'aoe': '1 oak club',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A shamrock leaf and the caster’s holy symbol.',
    'reference': 'PHB p. 257',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to change his own oak cudgel or unshod staff into a magical weapon that gains a +1 bonus to its attack roll and inflicts 2d4 points of damage on opponents up to man size, and 1d4+1 points of damage on larger opponents. The spell inflicts no damage to the staff or cudgel. The caster must wield the shillelagh, of course.'
};

const priestSpells = {};
priestSpells['pri1'] = pri1;
/* ---- Priest spells end ---- */