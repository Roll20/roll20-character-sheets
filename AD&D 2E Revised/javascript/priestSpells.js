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
    'school': 'Conjuration/Summoning (Reversible)',
    'sphere': 'All',
    'range': '60 yards',
    'duration': '6 rounds',
    'aoe': '50-foot cube',
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
    'school': 'Alteration (Reversible)',
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
    'school': 'Necromancy (Reversible)',
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
    'school': 'Divination (Reversible)',
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
    'aoe': '40-foot cube',
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
    'aoe': '[[10*[[@{level-priest}]] ]] square feet within 40-foot radius',
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
    'school': 'Alteration (Reversible)',
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
    'school': 'Abjuration (Reversible)',
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
    'school': 'Alteration (Reversible)',
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
    'school': 'Abjuration (Reversible)',
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

let pri2 = {};
pri2['Aid'] = {
    'name': 'Aid',
    'level': 'Level 2 Priest',
    'school': 'Necromancy, Conjuration',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': '[[1+[[@{level-priest}]] ]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A tiny strip of white cloth with a sticky substance (such as tree sap) on the ends, plus the priest’s holy symbol.',
    'reference': 'PHB p. 257',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The recipient of this spell gains the benefit of a *bless* spell (+1 to attack rolls and saving throws) and a special bonus of [[1d8]] additional hit points for the duration of the spell. The *aid* spell enables the recipient to actually have more hit points than his full normal total. The bonus hit points are lost first when the recipient takes damage; they cannot be regained by curative magic. \n&emsp;For example, a 1st-level fighter has 8 hit points, suffers 2 points of damage (8–2 = 6), and then receives an aid spell that gives 5 additional hit points. The fighter now has 11 hit points, 5 of which are temporary. If he is then hit for 7 points of damage, 2 normal hit points and all 5 temporary hit points are lost. He then receives a *cure light wounds* spell that heals 4 points of damage, restoring him to his original 8 hit points. \n&emsp;Note that the operation of the spell is unaffected by permanent hit point losses due to energy drain, Hit Die losses, the loss of a familiar, or the operation of certain artifacts; the temporary hit point gain is figured from the new, lower total.'
};

pri2['Augury'] = {
    'name': 'Augury',
    'level': 'Level 2 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '2 rounds',
    'saving-throw': 'None',
    'materials': 'A set of gem-inlaid sticks, dragon bones, or similar tokens of at least 1,000 gp value (which are not expended in casting).',
    'reference': 'PHB p. 257',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The priest casting an *augury* spell seeks to divine whether an action in the immediate future (within one-half hour) will benefit or harm the party. For example, if a party is considering the destruction of a weird seal that closes a portal, an *augury* spell can be used to find if weal or woe will be the immediate result. If the spell is successful, the DM yields some indication of the probable outcome: “weal,” “woe,” or possibly a cryptic puzzle or rhyme. The base chance for receiving a meaningful reply is 70%, plus 1% for each level of the priest casting the spell ([[70+[[@{level-priest}]]]]); for example, 71% at 1st level, 72% at 2nd, etc. Your DM determines any adjustments for the particular conditions of each augury. For example, if the question is “Will we do well if we venture to the third level?” and a terrible troll guarding 10,000 sp and a shield +1 lurks near the entrance to the level (which the DM estimates the party could beat after a hard fight), the augury might be: “Great risk brings great reward.” If the troll is too strong for the party, the augury might be: “Woe and destruction await!” Likewise, a party casting several auguries about the same action in quick succession might receive identical answers, regardless of the dice rolls.'
};

pri2['Barkskin'] = {
    'name': 'Barkskin',
    'level': 'Level 2 Priest',
    'school': 'Alteration',
    'sphere': 'Protection, Plant',
    'range': 'Touch',
    'duration': '[[4+[[@{level-priest}]] ]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A handful of bark from an oak and the priest’s holy symbol.',
    'reference': 'PHB p. 258',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a priest casts the *barkskin* spell upon a creature, its skin becomes as tough as bark, increasing its base Armor Class to AC 6, plus 1 AC for every four levels of the priest ([[6-floor([[@{level-priest}]]/4)]] AC): Armor Class 5 at 4th level, Armor Class 4 at 8th, and so on. This spell does not function in combination with normal armor or any magical protection. In addition, saving throw rolls vs. all attack forms except magic gain a +1 bonus. This spell can be placed on the caster or on any other creature he touches.'
};

pri2['Chant'] = {
    'name': 'Chant',
    'level': 'Level 2 Priest',
    'school': 'Conjuring/Summoning',
    'sphere': 'Combat',
    'range': '0',
    'duration': 'Time of chanting',
    'aoe': '30-foot radius',
    'components': 'V, S',
    'cast-time': '2 rounds',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 258',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of the *chant* spell, the priest brings special favor upon himself and his party, and causes harm to his enemies. When the *chant* spell is completed, all attack and damage rolls and saving throws made by those in the area of effect who are friendly to the priest gain +1 bonuses, while those of the priest’s enemies suffer –1 penalties. This bonus/penalty continues as long as the caster continues to chant the mystic syllables and is stationary. However, an interruption (such as an attack that succeeds and causes damage, grappling with the chanter, or a *silence* spell) breaks the spell. Multiple chants are not cumulative; however, if the 3rd-level *prayer* spell is spoken while a priest of the same religious persuasion (not merely alignment) is chanting, the effect is increased to +2 and –2.'
};

pri2['Charm Person or Mammal'] = {
    'name': 'Charm Person or Mammal',
    'level': 'Level 2 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'range': '80 yards',
    'duration': 'Special',
    'aoe': '1 person or mammal',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 258',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell affects any single person or mammal it is cast upon. The creature then regards the caster as a trusted friend and ally to be heeded and protected. The term *person* includes any bipedal human, demihuman or humanoid of man size or smaller, including brownies, dryads, dwarves, elves, gnolls, gnomes, goblins, half-elves, halflings, half-orcs, hobgoblins, humans, kobolds, lizard men, nixies, orcs, pixies, sprites, troglodytes, and others. Thus, a 10th-level fighter is included, while an ogre is not. \n&emsp;The spell does not enable the caster to control the charmed creature as if it were an automaton, but any word or action of the caster is viewed in the most favorable way. Thus, a charmed creature would not obey a suicide command, but might believe the caster if assured that the only chance to save the caster’s life is for the creature to hold back an onrushing red dragon for “just a minute or two” and if the charmed creature’s view of the situation suggests that this course of action still allows a reasonable chance of survival. \n&emsp;The subject’s attitudes and priorities are changed with respect to the caster, but basic personality and alignment are not. A request that a victim make itself defenseless, give up a valued item, or even use a charge from a valued item (especially against former associates or allies) might allow an immediate saving throw to see if the charm is thrown off. Likewise, a charmed creature does not necessarily reveal everything it knows or draw maps of entire areas. Any request may be refused, if such refusal is in character and does not directly harm the caster. The victim’s regard for the caster does not necessarily extend to the caster’s friends or allies. The victim does not react well to the charmer’s allies making suggestions such as, “Ask him this question. . .,” nor does the charmed creature put up with verbal or physical abuse from the charmer’s associates, if this is out of character. \n&emsp;Note also that the spell does not empower the caster with linguistic capabilities beyond those he normally has. The duration of the spell is a function of the charmed creature’s Intelligence, and it is tied to the saving throw. A successful saving throw breaks the spell. This saving throw is checked on a periodic basis according to the creature’s Intelligence, even if the caster has not overly strained the relationship. \n**Intelligence**&emsp;&emsp;**Period Between** \n**Score**&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;**Checks** \n3 or less&emsp;&emsp;&emsp;&emsp;&ensp;3 months \n4–6&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;2 months \n7–9&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1 month \n10–12&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&thinsp;3 weeks \n13–14&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&thinsp;2 weeks \n15–16&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&thinsp;1 week \n17&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;3 days \n18&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;2 days \n19&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;or more 1 day \n&emsp;If the caster harms, or attempts to harm, the charmed creature by some overt action, or if a *dispel magic* spell is successfully cast upon the charmed creature, the charm is broken automatically. \n&emsp;If the subject of the *charm person or mammal* spell successfully rolls its saving throw vs. the spell, the effect is negated. \n&emsp;This spell, if used in conjunction with the *animal friendship* spell, can keep the animal near the caster’s home base, if the caster must leave for an extended period.'
};

pri2['Detect Charm'] = {
    'name': 'Detect Charm',
    'level': 'Level 2 Priest',
    'school': 'Divination (Reversible)',
    'sphere': 'Divination',
    'range': '30 yards',
    'duration': '1 turn',
    'aoe': '1 creature/round',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 259',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When used by a priest, this spell can detect if a person or monster is under the influence of a *charm* spell, or similar control such as *hypnosis*, *suggestion*, *beguiling*, *possession*, etc. The creature rolls a saving throw vs. spell and, if successful, the caster learns nothing about that particular creature from the casting. A caster who learns that a creature is being influenced has a 5% chance per level ([[5*[[@{level-priest}]] ]]%) to determine the exact type of influence. Up to 10 different creatures can be checked before the spell wanes. If the creature is under more than one such effect, only the information that the charms exist is gained. The type (since there are conflicting emanations) is impossible to determine. \n&emsp;The reverse of the spell, *undetectable charm*, completely masks all charms on a single creature for 24 hours.'
};

pri2['Dust Devil'] = {
    'name': 'Dust Devil',
    'level': 'Level 2 Priest',
    'school': 'Conjuration/Summoning',
    'sphere': 'Elemental (Air)',
    'range': '30 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '5 x 4 foot cone',
    'components': 'V, S',
    'cast-time': '2 rounds',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 259',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables a priest to conjure up a weak air elemental— a dust devil of AC 4, 2 HD, MV 180 feet per round, one attack for 1d4 points of damage—which can be hit by normal weapons. The dust devil appears as a small whirlwind 1 foot in diameter at its base, 5 feet tall, and 3 to 4 feet across at the top. It moves as directed by the priest, but dissipates if it is ever separated from the caster by more than 30 yards. Its winds are sufficient to put out torches, small campfires, exposed lanterns, and other small, open flames of nonmagical origin. The dust devil can hold a gas cloud or a creature in gaseous form at bay or push it away from the caster (though it cannot damage or disperse such a cloud). If skimming along the ground in an area of loose dust, sand, or ash, the dust devil picks up those particles and disperses them in a 10-footdiameter cloud centered on itself. The cloud obscures normal vision, and creatures caught within are blinded while inside and for one round after they emerge. A spellcaster caught in the dust devil or its cloud while casting must make a saving throw vs. spell to keep his concentration, or the spell is ruined. Any creature native to the Elemental Plane of Air—even another dust devil—can disperse a dust devil with a single hit.'
};

pri2['Enthrall'] = {
    'name': 'Enthrall',
    'level': 'Level 2 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Charm',
    'range': '0',
    'duration': 'Special',
    'aoe': '90-foot radius',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 259',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A priest using this spell can enthrall an audience that can fully understand his language. Those in the area of effect must successfully save vs. spell or give the caster their undivided attention, totally ignoring their surroundings. Those of a race or religion unfriendly to the caster’s have a +4 bonus to the roll. Any Wisdom adjustment also applies. Creatures with 4 or more levels or Hit Dice, or with a Wisdom of 16 or better, are unaffected. \n&emsp;To cast the spell, the caster must speak without interruption for a full round. Thereafter, the enchantment lasts as long as the priest speaks, to a maximum of one hour. Those enthralled take no action while the priest speaks, and for 1d3 rounds thereafter while they discuss the matter. Those entering the area of effect must also successfully save vs. spell or become enthralled. Those not enthralled are 50% likely every turn to hoot and jeer in unison. If there is excessive jeering, the rest are allowed a new saving throw. The speech ends (but the 1d3 round delay still applies) if the priest is successfully attacked or performs any action other than speaking. \n&emsp;If the audience is attacked, the spell ends and the audience reacts immediately, rolling a reaction check with respect to the source of the interruption, at a penalty of –10. \n&emsp;Note: When handling a large number of saving throws for similar creatures, the DM can assume an average to save time; for example, a crowd of 20 men with a base saving throw of 16 (25% success chance) will have 15 men enthralled and five not.'
};

pri2['Find Traps'] = {
    'name': 'Find Traps',
    'level': 'Level 2 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': '3 turns',
    'aoe': '10 feet x 30 yards',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 260',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a priest casts a *find traps* spell, all traps—concealed normally or magically—of magical or mechanical nature become apparent to him. Note that this spell is directional, and the caster must face the desired direction in order to determine if a trap is laid in that particular direction. \n&emsp;A trap is any device or magical ward that meets three criteria: it can inflict a sudden or unexpected result, the spellcaster would view the result as undesirable or harmful, and the harmful or undesirable result was specifically intended as such by the creator. Thus, traps include alarms, glyphs, and similar spells or devices. \n&emsp;The caster learns the general nature of the trap (magical or mechanical) but not its exact effect, nor how to disarm it. Close examination will, however, enable the caster to sense what intended actions might trigger it. Note that the caster’s divination is limited to his knowledge of what might be unexpected and harmful. The spell cannot predict actions of creatures (hence, a concealed murder hole or ambush is not a trap), nor are natural hazards considered traps (a cavern that floods during a rain, a wall weakened by age, a naturally poisonous plant, etc.). If the DM is using specific glyphs or sigils to identify magical wards (see the 3rd-level spell *glyph of warding*), this spell shows the form of the glyph or mark. The spell does not detect traps that have been disarmed or are otherwise inactive.'
};

pri2['Fire Trap'] = {
    'name': 'Fire Trap',
    'level': 'Level 2 Priest',
    'school': 'Abjuration, Evocation',
    'sphere': 'Elemental (Fire)',
    'range': 'Touch',
    'duration': 'Permanent until discharged',
    'aoe': 'Object touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': '½',
    'materials': 'Holly berries.',
    'reference': 'PHB p. 260',
    'damage': '1d4+[[@{level-priest}]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'Any closeable item (book, box, bottle, chest, coffer, coffin, door, drawer, and so forth) can be warded by a *fire trap* spell. The spell is centered on a point selected by the spellcaster. The item so trapped cannot have a second closure or warding spell placed upon it. A *knock* spell cannot affect a fire trap in any way—as soon as the offending party opens the item, the trap discharges. As with most magical traps, a thief has only half his normal find traps score to detect a fire trap. Failure to remove it successfully detonates it immediately. An unsuccessful *dispel magic* spell will not detonate the spell. When the trap is discharged, there will be an explosion of 5-foot radius from the spell’s center. All creatures within this area must roll saving throws vs. spell. Damage is 1d4 points plus 1 point per level of the caster, and half that total amount for creatures successfully saving. (Under water, this ward inflicts half damage and creates a large cloud of steam.) The item trapped is not harmed by this explosion. [[@{level-priest}]]The caster can use the trapped object without discharging it, as can any individual to whom the spell was specifically attuned when cast (the method usually involves a key word). \n&emsp;To place this spell, the caster must trace the outline of the closure with a stick of charcoal and touch the center of the effect. Attunement to another individual requires a hair or similar object from the individual.'
};

pri2['Flame Blade'] = {
    'name': 'Flame Blade',
    'level': 'Level 2 Priest',
    'school': 'Evocation',
    'sphere': 'Elemental (Fire)',
    'range': '0',
    'duration': '[[4+floor([[@{level-priest}]]/2)]]',
    'aoe': '3-foot long blade',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A leaf of sumac and the caster’s holy symbol',
    'reference': 'PHB p. 260',
    'damage': '1d4+4 (+/-2)',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'With this spell, the caster causes a blazing ray of red-hot fire to spring forth from his hand. This bladelike ray is wielded as if it were a scimitar. If the caster successfully hits with the flame blade in melee combat, the creature struck suffers 1d4+4 points of damage, with a damage bonus of +2 (i.e., 7–10 points) if the creature is undead or is especially vulnerable to fire. If the creature is protected from fire, the damage inflicted is reduced by 2 (i.e., 1d4+2 points). Fire dwellers and those using fire as an innate attack form suffer no damage from the spell. The flame blade can ignite combustible materials such as parchment, straw, dry sticks, cloth, etc. However, it is not a magical weapon in the normal sense of the term, so creatures (other than undead) struck only by magical weapons are not harmed by it. This spell does not function under water.'
};

pri2['Goodberry'] = {
    'name': 'Goodberry',
    'level': 'Level 2 Priest',
    'school': 'Alteration, Evocation (Reversible)',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': '[[1+[[@{level-priest}]] ]] days',
    'aoe': '[[2d4]] fresh berries',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol passed over the freshly picked, edible berries to be enspelled (blueberries, blackberries, raspberries, currants, gooseberries, etc.).',
    'reference': 'PHB p. 260',
    'damage': '1',
    'damage-type': 'Poison',
    'healing': '1',
    'effect': 'Casting a *goodberry* spell upon a handful of freshly picked berries makes 2d4 of them magical. The caster (as well as any other caster of the same faith and 3rd or higher level) can immediately discern which berries are affected. A *detect magic* spell discovers this also. Berries with the magic either enable a hungry creature of approximately man size to eat one and be as well-nourished as if a full normal meal were eaten, or else cure 1 point of physical damage from wounds or other similar causes, subject to a maximum of 8 points of such curing in any 24-hour period. \n&emsp;The reverse of the spell, *badberry*, causes 2d4 rotten berries to appear wholesome, but each actually delivers 1 point of poison damage (no saving throw) if ingested.'
};

pri2['Heat Metal'] = {
    'name': 'Heat Metal',
    'level': 'Level 2 Priest',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Fire)',
    'range': '40 yards',
    'duration': '7 rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': 'A holy symbol.',
    'reference': 'PHB p. 261',
    'damage': 'See below',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of the *heat metal* spell, the caster is able to make ferrous metal (iron, iron alloys, steel) extremely hot. Elven chain mail is not affected, and magical metal armor receives an item saving throw vs. magical fire to avoid being heated. \n&emsp;On the first round of the spell, the metal merely becomes very warm and uncomfortable to touch (this is also the effect on the last melee round of the spell’s duration). During the second and sixth (next to the last) rounds, heat causes blisters and damage; in the third, fourth, and fifth rounds, the metal becomes searing hot, causing damage to exposed flesh, as shown below: \n**Metal**&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;**Damage** \n**Temperature**&emsp;&emsp;**per Round** \nvery warm&emsp;&emsp;&emsp;&emsp;none \nhot&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&thinsp;1d4 points \nsearing*&emsp;&emsp;&emsp;&emsp;&emsp;2d4 points \n* On the final round of searing, the afflicted creature must roll a successful saving throw vs. spell or suffer one of the following disabilities: hand or foot—becomes unusable for 2d4 days; body—becomes disabled for 1d4 days; head—fall unconscious for 1d4 turns. This effect can be completely removed by the 6th-level priest spell heal spell or by normal rest. \n&emsp;Note also that materials such as wood, leather, or flammable cloth smolder and burn if exposed to searing hot metal. Such materials cause searing damage to exposed flesh on the next round. Fire resistance (spell, potion, or ring) or a *protection from fire* spell totally negates the effects of a *heat metal* spell, as does immersion in water or snow, or exposure to a *cold* or *ice storm* spell. This version of the spell does not function under water. For every two experience levels of the caster, the metal of one man-sized creature can be affected (i.e., arms and armor, or a single mass of metal equal to 50 pounds of weight). Thus, a 3rd-level caster would affect one such creature, a 4th- or 5th-level caster two, etc. \n&emsp;The reverse of the spell, *chill metal*, counters a *heat metal* spell or else causes metal to act as follows: \n**Metal**&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;**Damage** \n**Temperature**&emsp;&emsp;**per Round** \ncold&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&thinsp;none \nicy&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&thinsp;1–2 points \nfreezing*&emsp;&emsp;&emsp;&emsp;&ensp;1d4 points \n* On the final round of freezing, the afflicted creature must roll a successful saving throw vs. spell or suffer from the numbing effects of the cold. This causes the loss of all feeling in a hand (or hands, if the DM rules the saving throw was failed badly) for 1d4 days. During this time, the character’s grip is extremely weak and he cannot use that hand for fighting or any other activity requiring a firm grasp. \n&emsp;The *chill metal* spell is countered by a *resist cold* spell, or by any great heat—proximity to a blazing fire (not a mere torch), a magical *flaming sword*, a *wall of fire* spell, etc. Under water, this version of the spell inflicts no damage, but ice immediately forms around the affected metal, exerting an upward buoyancy.'
};

pri2['Hold Person'] = {
    'name': 'Hold Person',
    'level': 'Level 2 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Charm',
    'range': '120 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '[[1d4]] persons in a 20-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'A small, straight piece of iron as the material component of this spell.',
    'reference': 'PHB p. 261',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell holds 1d4 humans, demihumans, or humanoid creatures rigidly immobile and in place for a minimum of six rounds (the spell lasts 2 rounds per caster level, and the priest must be of at least 3rd level to cast the spell). \n&emsp;The *hold person* spell affects any bipedal human, demihuman, or humanoid of man size or smaller, including brownies, dryads, dwarves, elves, gnolls, gnomes, goblins, half-elves, halflings, half-orcs, hobgoblins, humans, kobolds, lizard men, nixies, orcs, pixies, sprites, troglodytes, and others. Thus, a 10th-level fighter could be held, while an ogre could not. \n&emsp;The effect is centered on a point selected by the caster, and it affects persons selected by the caster within the area of effect. If the spell is cast at three persons, each gets a normal saving throw; if only two persons are being enspelled, each rolls his saving throw with a –1 penalty; if the spell is cast at only one person, the saving throw die roll suffers a –2 penalty. Saving throws are adjusted for Wisdom. Those who succeed on their saving throws are totally unaffected by the spell. Undead creatures cannot be held. \n&emsp;Held creatures cannot move or speak, but they remain aware of events around them and can use abilities not requiring motion or speech. Being held does not prevent the worsening of the subjects’ condition due to wounds, disease, or poison. The priest casting the *hold person* spell can end the spell with a single utterance at any time; otherwise, the duration is six rounds at 3rd level, eight rounds at 4th level, etc.'
};

pri2['Know Alignment'] = {
    'name': 'Know Alignment',
    'level': 'Level 2 Priest',
    'school': 'Divination (Reversible)',
    'sphere': 'Divination',
    'range': '10 yards',
    'duration': '1 turn',
    'aoe': '1 creature or object',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 261',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *know alignment* spell enables the priest to exactly read the aura of a creature or an aligned object (unaligned objects reveal nothing). The caster must remain stationary and concentrate on the subject for a full round. If the creature rolls a successful saving throw vs. spell, the caster learns nothing about that particular creature from the casting. Certain magical devices negate the power of the *know alignment* spell. \n&emsp;The reverse, *undetectable alignment*, conceals the alignment of an object or creature for 24 hours.'
};

pri2['Messenger'] = {
    'name': 'Messenger',
    'level': 'Level 2 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'range': '[[20*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] days',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 262',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the priest to call upon a tiny (size T) creature of at least animal intelligence to act as his messenger. The spell does not affect giant animals and it does not work on creatures of low (i.e., 5) Intelligence or higher. If the creature is within range, the priest, using some type of food desirable to the animal as a lure, can call the animal to come. The animal is allowed a saving throw vs. spell. If the saving throw is failed, the animal advances toward the priest and awaits his bidding. The priest can communicate with the animal in a crude fashion, telling it to go to a certain place, but directions must be simple. The spellcaster can attach some small item or note to the animal. If so instructed, the animal will then wait at that location until the duration of the spell expires. (Note that unless the intended recipient of a message is expecting a messenger in the form of a small animal or bird, the carrier may be ignored.) When the spell’s duration expires, the animal or bird returns to its normal activities. The intended recipient of a message gains no communication ability.'
};

pri2['Obscurement'] = {
    'name': 'Obscurement',
    'level': 'Level 2 Priest',
    'school': 'Alteration',
    'sphere': 'Weather',
    'range': '0',
    'duration': '[[4*[[@{level-priest}]] ]] rounds',
    'aoe': '[[10*[[@{level-priest}]] ]]-foot square',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 262',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes a misty vapor to arise around the caster. It persists in this locale for four rounds per caster level and reduces the visibility ranges of all types of vision (including infravision) to [[2d4]] feet. The ground area affected by the spell is a square progression based on the caster’s level: a 10-foot × 10-foot area at 1st level, a 20-foot × 20-foot area at 2nd level, a 30-foot × 30-foot area at 3rd level, and so on. The height of the vapor is restricted to 10 feet, although the cloud will otherwise expand to fill confined spaces. A strong wind (such as from the 3rd-level wizard spell *gust of wind*) can cut the duration of an *obscurement* spell by 75%. This spell does not function under water.'
};

pri2['Produce Flame'] = {
    'name': 'Produce Flame',
    'level': 'Level 2 Priest',
    'school': 'Alteration',
    'sphere': 'Elemental (Fire)',
    'range': '0',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 262',
    'damage': '1d4+1',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'A bright flame, equal in brightness to a torch, springs forth from the caster’s palm when he casts a *produce flame* spell. The flame does not harm the caster, but it is hot and it causes the combustion of flammable materials (paper, cloth, dry wood, oil, etc.). The caster is capable of hurling the magical flame as a missile, with a range of 40 yards (considered short range). The flame flashes on impact, igniting combustibles within a 3-foot diameter of its center of impact, and then it goes out. A creature struck by the flame suffers 1d4+1 points of damage and, if combustion occurs, must spend a round extinguishing the fire or suffer additional damage assigned by the DM until the fire is extinguished. A miss is resolved as a grenadelike missile. If any duration remains to the spell, another flame immediately appears in the caster’s hand. The caster can hurl a maximum of one flame per level, but no more than one flame per round. \n&emsp;The caster can snuff out magical flame any time he desires, but fire caused by the flame cannot be so extinguished. This spell does not function under water.'
};

pri2['Resist Fire/Resist Cold'] = {
    'name': 'Resist Fire/Resist Cold',
    'level': 'Level 2 Priest',
    'school': 'Alteration',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A drop of mercury as the material component of this spell.',
    'reference': 'PHB p. 262',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is placed upon a creature by a priest, the creature’s body is toughened to withstand heat or cold, as chosen by the caster. The spell grants the creature complete immunity to mild conditions (standing naked in the snow or reaching into an ordinary fire to pluck out a note). The recipient can somewhat resist intense heat or cold (whether natural or magical in origin), such as red-hot charcoal, a large amount of burning oil, flaming swords, fire storms, fireballs, meteor swarms, red dragon’s breath, frostbrand swords, ice storms, *wands of frost*, or white dragon’s breath. In all of these cases, the temperature affects the creature to some extent. The recipient of the spell gains a bonus of +3 to saving throws against such attack forms and all damage sustained is reduced by 50%; therefore, if the saving throw is failed, the creature sustains one-half damage, and if the saving throw is successful, the creature sustains only one-quarter damage. Resistance to fire lasts for one round for each experience level of the priest placing the spell.'
};

pri2['Silence, 15\' Radius'] = {
    'name': 'Silence, 15\' Radius',
    'level': 'Level 2 Priest',
    'school': 'Alteration',
    'sphere': 'Guardian',
    'range': '120 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '15-foot-radius',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 263',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, complete silence prevails in the affected area. All sound is stopped: Conversation is impossible, spells cannot be cast (or at least not those with verbal components, if the optional component rule is used), and no noise whatsoever issues from or enters the area. The spell can be cast into the air or upon an object, but the effect is stationary unless cast on a mobile object or creature. The spell lasts two rounds for each level of experience of the priest. The spell can be centered upon a creature, and the effect then radiates from the creature and moves as it moves. An unwilling creature receives a saving throw against the spell. If the saving throw is successful, the spell effect is centered about 1 foot behind the position of the subject creature at the instant of casting. This spell provides a defense against sound-based attacks, such as harpy singing, *horn of blasting*, etc.'
};

pri2['Slow Poison'] = {
    'name': 'Slow Poison',
    'level': 'Level 2 Priest',
    'school': 'Necromancy',
    'sphere': 'Healing',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A bud of garlic that must be crushed and smeared on the wound (or eaten if poison was ingested) and the priest’s holy symbol',
    'reference': 'PHB p. 263',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is placed upon a poisoned individual, it greatly slows the effects of venom, if cast upon the victim before the poison takes full effect. (This period, known as the onset time, is known to the DM.) While this spell does not neutralize the venom, it does prevent it from substantially harming the individual for the duration of its magic in the hope that, during that spell period, the poison can be fully cured.'
};

pri2['Snake Charm'] = {
    'name': 'Snake Charm',
    'level': 'Level 2 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': '30-foot cube',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 263',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, a hypnotic pattern is set up that causes one or more snakes to cease all activity except a semierect, swaying movement. If the snakes are charmed while in a torpor, the duration of the spell is 1d4+2 turns; if the snakes are not torpid, but are not aroused and angry, the charm lasts 1d3 turns; if the snakes are angry or attacking, the spell lasts 1d4+4 rounds. The priest casting the spell can charm snakes whose total hit points are less than or equal to those of the priest. On the average, a 1st-level priest could charm snakes with a total of 4 or 5 hit points; a 2nd-level priest could charm 9 hit points, etc. The hit points can be those of a single snake or those of several of the reptiles, but the total hit points cannot exceed those of the priest casting the spell. A 23-hit point caster charming a dozen 2-hit point snakes would charm 11 of them. This spell is also effective against any ophidian or ophidianoid monster, such as naga, couatl, etc., subject to magic resistance, hit points, and so forth. \n&emsp;Variations of this spell may exist, allowing other creatures significant to a particular mythos to be affected. Your DM will inform you if such spells exist.'
};

pri2['Spiritual Hammer'] = {
    'name': 'Spiritual Hammer',
    'level': 'Level 2 Priest',
    'school': 'Invocation',
    'sphere': 'Combat',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[3*[[@{level-priest}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A normal war hammer.',
    'reference': 'PHB p. 263',
    'damage': 'S/M: 1d4+1+[[{{[[ceil([[@{level-priest}]]/6)]],3}kl1}]] / Large: 1d4+[[{{[[ceil([[@{level-priest}]]/6)]],3}kl1}]]',
    'damage-type': '',
    'healing': '',
    'effect': 'By calling upon his deity, the caster of a *spiritual hammer* spell brings into existence a field of force shaped vaguely like a hammer. As long as the caster concentrates upon the hammer, it strikes at any opponent within its range, as desired. Each round the caster can choose to attack the same target as the previous round or switch to a new target that he can see anywhere within his maximum range. The spiritual hammer’s chance to successfully hit is equal to that of the caster, without any Strength bonuses. In addition, it strikes as a magical weapon with a bonus of +1 for every six experience levels (+[[{{[[ceil([[@{level-priest}]]/6)]],3}kl1}]]) (or fraction) of the spellcaster, up to a total of +3 to the attack roll and +3 to the damage roll for a 13th-level caster. The base damage inflicted when it scores a hit is exactly the same as a normal war hammer (1d4+1 points on opponents of man size or smaller, or 1d4 points on larger opponents, plus the magical bonus). The hammer strikes in the same direction as the caster is facing, so if he is behind the target, all bonuses for rear attack are gained along with the loss of any modifications to the target’s AC for shield and Dexterity. \n&emsp;As soon as the caster ceases concentration, the *spiritual hammer* spell ends. A *dispel magic* spell that includes either the caster or the force in its area of effect has a chance to dispel the spiritual hammer. If an attacked creature has magic resistance, the resistance is checked the first time the spiritual hammer strikes. If the hammer is successfully resisted, the spell is lost. If not, the hammer has its normal full effect for the duration of the spell. \n&emsp;The material component of this spell is a normal war hammer that the priest must hurl toward opponents while uttering a plea to his deity. The hammer disappears when the spell is cast.'
};

pri2['Trip'] = {
    'name': 'Trip',
    'level': 'Level 2 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '1 object up to 10 feet long',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 264',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This magic must be cast upon a normal object—a length of vine, a stick, a pole, a rope, or a similar object. The spell causes the object to rise slightly off the ground or floor it is resting on to trip most creatures crossing it, if they fail their saving throws vs. spell. Note that only as many creatures can be tripped as are actually stepping across the enchanted object. Thus, a 3-foot-long piece of rope could trip only one man-sized creature. Creatures moving at a very rapid pace (running) when tripped suffer 1 point of damage and are stunned for 1d4+1 rounds if the surface they fall upon is very hard (if it is turf or other soft material, they are merely stunned for the rest of that round). Very large creatures, such as elephants, are not affected at all by a *trip* spell. The object continues to trip all creatures passing over it, including the spellcaster, for as long as the spell duration lasts. A creature aware of the object and its potential adds a +4 bonus to its saving throw roll when crossing the object. The enchanted object is 80% undetectable unless a means that detects magical traps is employed or the operation of the spell is observed. This spell does not function under water.'
};

pri2['Warp Wood'] = {
    'name': 'Warp Wood',
    'level': 'Level 2 Priest',
    'school': 'Alteration (Reversible)',
    'sphere': 'Plant',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 264',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the priest causes a volume of wood to bend and warp, permanently destroying its straightness, form, and strength. The range of a *warp wood* spell is 10 yards for each level of experience of the caster. It affects approximately a 15-inch shaft of wood of up to 1-inch diameter per level of the caster. Thus, at 1st level, a caster might be able to warp a hand axe handle or four crossbow bolts; at 5th level, he could warp the shaft of a typical spear. Note that boards or planks can also be affected, causing a door to be sprung or a boat or ship to leak. Warped missile weapons are useless; warped melee weapons suffer a –4 penalty to their attack rolls. \n&emsp;Enchanted wood is affected only if the spellcaster is of higher level than the caster of the prior enchantment. The spellcaster has a 20% cumulative chance of success per level of difference (20% if one level higher, 40% if two levels higher, etc.). Thus, a door magically held or wizard locked by a 5th-level wizard is 40% likely to be affected by a *warp wood* spell cast by a 7th-level priest. Wooden magical items are considered enchanted at 12th level (or better). Extremely powerful items, such as artifacts, are unaffected by this spell. \n&emsp;The reversed spell, *straighten wood*, straightens bent or crooked wood, or reverses the effects of a *warp wood* spell, subject to the same restrictions.'
};

pri2['Withdraw'] = {
    'name': 'Withdraw',
    'level': 'Level 2 Priest',
    'school': 'Ateration',
    'sphere': 'Protection',
    'range': '0',
    'duration': 'Special',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 264',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *withdraw* spell, the priest in effect alters the flow of time with regard to himself. While but one round of time passes for those not affected by the spell, the priest is able to spend two rounds, plus one round per level, in contemplation ([[2+[[@{level-priest}]] ]] rounds). Thus, a 5th-level priest can withdraw for seven rounds to cogitate on some matter while one round passes for all others. (The DM should allow the player one minute of real time per round withdrawn to ponder some problem or question. No discussion with other players is permitted.) Note that while affected by the *withdraw* spell, the caster can use only the following spells: any divination spell or any curing or healing spell, the latter on himself only. The casting of any of these spells in different fashion (for example, a *cure light wounds* spell bestowed upon a companion) negates the *withdraw* spell. Similarly, the withdrawn caster cannot walk or run, become invisible, or engage in actions other than thinking, reading, and the like. He can be affected by the actions of others, losing any Dexterity or shield bonus. Any successful attack upon the caster breaks the spell.'
};

pri2['Wyvern Watch'] = {
    'name': 'Wyvern Watch',
    'level': 'Level 2 Priest',
    'school': 'Evocation',
    'sphere': 'Guardian',
    'range': '30 yards',
    'duration': 'Up to 8 hours',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'The priest’s holy symbol.',
    'reference': 'PHB p. 264',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is known as *wyvern watch* because of the insubstantial haze brought forth by its casting, which vaguely resembles a wyvern. It is typically used to guard some area against intrusion. Any creature approaching within 10 feet of the guarded area may be affected by the “wyvern.” Any creature entering the guarded area must roll a successful saving throw vs. spell or stand paralyzed for one round per level of the caster ([[@{level-priest}]] rounds), until freed by the spellcaster, by a *dispel magic* spell, or by a *remove paralysis* spell. A successful saving throw indicates that the subject creature was missed by the attack of the wyvern-form, and the spell remains in place. As soon as a subject creature is successfully struck by the wyvern-form, the paralysis takes effect and the force of the spell dissipates. The spell force likewise dissipates if no intruder is struck by the wyvern-form for eight hours after the spell is cast. Any creature approaching the space being guarded by the wyvern-form may be able to detect its presence before coming close enough to be attacked; this chance of detection is 90% in bright light, 30% in twilight conditions, and 0% in darkness.'
};

const pri3 = {};
pri3['Animate Dead'] = {
    'name': 'Animate Dead',
    'level': 'Level 3 Priest',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A drop of blood, a piece of flesh of the type of creature being animated, and pinch of bone powder or a bone shard',
    'reference': 'PHB p. 265',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates the lowest of the undead monsters, skeletons or zombies, usually from the bones or bodies of dead humans, demihumans, or humanoids. The spell causes these remains to become animated and obey the simple verbal commands of the caster, regardless of how they communicated in life. The skeletons or zombies can follow the caster, remain in an area and attack any creature (or just a specific type of creature) entering the place, etc. The undead remain animated until they are destroyed in combat or are turned; the magic cannot be dispelled. \n&emsp;The priest can animate one skeleton or one zombie for each experience level he has attained. Currently [[@{priest-level}]] skeletons. If creatures with more than 1+ Hit Dice are animated, the number is determined by the monster Hit Dice. Skeletal forms have the Hit Dice of the original creature, while zombie forms have 1 more Hit Die. Thus, a 12th-level priest could animate 12 dwarven skeletons (or six zombies), four zombie gnolls, or a single zombie fire giant. Note that this is based on the standard racial Hit Die norm; thus, a high-level adventurer would be animated as a skeleton or zombie of 1 or 2 Hit Dice, and without special class or racial abilities. The caster can, alternatively, animate two small animal skeletons (1-1 Hit Die or less) for every level of experience he has achieved. Currently [[2*[[@{priest-level}]] ]] animal skeletons. \n&emsp;Casting this spell is not a good act, and only evil priests use it frequently.'
};

pri3['Call Lightning'] = {
    'name': 'Call Lightning',
    'level': 'Level 3 Priest',
    'school': 'Alteration',
    'sphere': 'Weather',
    'range': '360 yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '10-foot radius',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': '½',
    'materials': '',
    'reference': 'PHB p. 266',
    'damage': '[[2d8+[[@{level-priest}]]d8]]',
    'damage-type': 'Electrical',
    'healing': '',
    'effect': 'When a *call lightning* spell is cast, there must be a storm of some sort in the area—a rain shower, clouds and wind, hot and cloudy conditions, or even a tornado (including a whirlwind formed by a djinn or air elemental of 7 Hit Dice or more). The caster is then able to call down bolts of lightning. The caster can call down one bolt per turn. The caster need not call a bolt of lightning immediately—other actions, even spellcasting, can be performed; however, the caster must remain stationary and concentrate for a full round each time a bolt is called. The spell has a duration of one turn per caster level. Each bolt causes 2d8 points of electrical damage, plus an additional 1d8 points for each of the caster’s experience levels. Thus, a 4th-level caster calls down a 6d8 bolt (2d8+4d8). \n&emsp;The bolt of lightning flashes down in a vertical stroke at whatever distance the spellcaster decides, up to 360 yards away. Any creature within a 10-foot radius of the path or the point where the lightning strikes suffers full damage unless a successful saving throw vs. spell is rolled, in which case only one-half damage is taken. \n&emsp;Because it requires a storm overhead, this spell can only be used outdoors. It does not function under ground or under water.'
};

pri3['Continual Light'] = {
    'name': 'Continual Light',
    'level': 'Level 3 Priest',
    'school': 'Alteration (Reversible)',
    'sphere': 'Sun',
    'range': '120 yards',
    'duration': 'Permanent',
    'aoe': '60-foot radius',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 266',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to a *light* spell, except that it is as bright as full daylight and lasts until negated by magical darkness or by a *dispel magic* spell. Creatures with penalties in bright light suffer them in this spell’s area of effect. As with the *light* spell, this can be cast into the air, onto an object, or at a creature. In the third case, the continual light affects the space about 1 foot behind a creature that successfully rolls its saving throw vs. spell (a failed saving throw means the continual light is centered on the creature and moves as it moves). Note that this spell also blinds a creature if it is successfully cast upon the creature’s visual organs. If the spell is cast on a small object that is then placed in a light-proof covering, the spell effects are blocked until the covering is removed. \n&emsp;Continual light brought into an area of magical darkness (or vice versa) cancels the darkness so that the otherwise prevailing light conditions exist in the overlapping areas of effect. A direct casting of a *continual light* spell against a similar or weaker magical darkness cancels both. \n&emsp;This spell eventually consumes the material it is cast upon, but the process takes far longer than the time in a typical campaign. Extremely hard and expensive materials might last hundreds or even thousands of years. \n&emsp;The reverse spell, *continual darkness*, causes complete absence of light (pitch blackness), similar to the *darkness* spell but of greater duration and area.'
};

pri3['Create Food & Water'] = {
    'name': 'Create Food & Water',
    'level': 'Level 3 Priest',
    'school': 'Alteration',
    'sphere': 'Creation',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '[[@{level-priest}]] cubic feet',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 266',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the priest causes food and water to appear. The food thus created is highly nourishing if rather bland; each cubic foot of the material sustains three human-sized creatures or one horse-sized creature for a full day. The food decays and becomes inedible within 24 hours, although it can be restored for another 24 hours by casting a *purify food and water* spell upon it. The water created by this spell is the same as that created by the 1st-level priest spell create water. For each experience level the priest has attained, 1 cubic foot of food or water is created by the spell. For example, a 2nd-level priest could create 1 cubic foot of food and 1 cubic foot of water.'
};

pri3['Cure Blindness or Deafness'] = {
    'name': 'Cure Blindness or Deafness',
    'level': 'Level 3 Priest',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 266',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By touching the creature afflicted, the priest employing the spell can permanently cure some forms of blindness or deafness. This spell does not restore or repair visual or auditory organs damaged by injury or disease. \n&emsp;Its reverse, *cause blindness or deafness*, requires a successful touch (successful attack roll) on the victim. If the victim rolls a successful saving throw, the effect is negated. If the saving throw is failed, a nondamaging magical blindness or deafness results. \n&emsp;A deafened creature can react only to what it can see or feel, and suffers a -1 penalty to surprise rolls, a +1 penalty to its initiative rolls, and a 20% chance of spell failure for spells with verbal components. A blinded creature suffers a -4 penalty to its attack rolls, a +4 penalty to its Armor Class, and a +2 penalty to its initiative rolls.'
};

pri3['Cure Disease'] = {
    'name': 'Cure Disease',
    'level': 'Level 3 Priest',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 267',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to cure most diseases by placing his hand upon the diseased creature. The affliction rapidly disappears thereafter, making the cured creature whole and well in from one turn to 10 days, depending on the type of disease and the state of its advancement when the cure took place. (The DM must adjudicate these conditions.) The spell is also effective against parasitic monsters such as green slime, rot grubs, and others. When cast by a priest of at least 12th level, this spell cures lycanthropy if cast within three days of the infection. Note that the spell does not prevent reoccurrence of a disease if the recipient is again exposed. \n&emsp;The reverse of the *cure disease* spell is *cause disease*. To be  effective, the priest must touch the intended victim, and the victim must fail a saving throw vs. spell. The severity of the disease is decided by the priest (debilitating or fatal). The exact details of the disease are decided by the DM, but the following are typical: \n&emsp;*Debilitating:* The disease takes effect in 1d6 turns, after which the creature loses 1 point of Strength per hour until his Strength is reduced to 2 or less, at which time the recipient is weak and virtually helpless. If a creature has no Strength rating, it loses 10% of its hit points per Strength loss, down to 10% of its original hit points. If the disease also affects hit points, use the more severe penalty. Recovery requires a period of 1d3 weeks.\n&emsp;*Fatal:* This wasting disease is effective immediately. Infected creatures receive no benefit from *cure wound* spells while the disease is in effect; wounds heal at only 10% of the natural rate. The disease proves fatal within 1d6 months and can be cured only by magical means. Each month the disease progresses, the creature loses 2 points of Charisma, permanently. \n&emsp;The inflicted disease can be cured by the *cure disease* spell. Lycanthropy cannot be caused'
};

pri3['Dispel Magic'] = {
    'name': 'Dispel Magic',
    'level': 'Level 3 Priest',
    'school': 'Abjuration',
    'sphere': 'Protection',
    'range': '60 yards',
    'duration': 'Special',
    'aoe': '30-foot cube or 1 item',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 267',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a priest casts this spell, it has a chance to neutralize or negate the magic it comes in contact with as follows:\n&emsp;First, it has a chance to remove spells and spell-like effects (including device effects and innate abilities) from creatures or objects. Second, it may disrupt the casting or use of these in the area of effect at the instant the dispel is cast. Third, it may destroy magical potions (which are treated as 12th level for purposes of this spell).\n&emsp;Each effect or potion in the spell’s area is checked to determine if it is dispelled. The caster can always dispel his own magic; otherwise, the chance depends on the difference in level between the magical effect and the caster. The base chance of successfully dispelling is 11 or higher on 1d20. If the caster is of higher level than the creator of the effect to be dispelled, the difference is *subtracted* from this base number needed. If the caster is of lower level, the difference is *added* to the base. A die roll of 20 always succeeds and a die roll of 1 always fails. Thus, if a caster is 10 levels higher than the magic he is trying to dispel, only a roll of 1 prevents the effect from being dispelled.\n&emsp;A *dispel magic* can affect only a specially enchanted item (such as a magical scroll, ring, wand, rod, staff, miscellaneous item, weapon, shield, or armor) if it is cast directly upon the item. This renders the item nonoperational for 1d4 rounds. An item possessed or carried by a creature has the creature’s saving throw against this effect; otherwise, it is automatically rendered nonoperational. An interdimensional interface (such as a *bag of holding*) rendered nonoperational is temporarily closed. Note that an item’s physical properties are unchanged: A nonoperational magical sword is still a sword.  Artifacts and relics are not subject to this spell, but some of their spell-like effects may be, at the DM’s option.  Note that this spell, if successful, will release charmed and similarly beguiled creatures. Certain spells or effects cannot be dispelled; these are listed in the spell descriptions.\n\n**Summary of Dispel Magic Effects**\n\n**Source of Effect&emsp;&emsp;Resists As&emsp;&emsp;Result of Dispel**\nCaster&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&thinsp;None&emsp;&emsp;&emsp;&emsp;&emsp;&thinsp;Dispel automatic\nOther caster/&emsp;&emsp;&emsp;&emsp;&thinsp;Leve/HD of\n&emsp;innate ability&emsp;&emsp;&emsp;&emsp;other caster&emsp;&thinsp;Effect negated\nWand&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;6th level&emsp;&emsp;&emsp;&emsp;&#42;\nStaff&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;8th level&emsp;&emsp;&emsp;&ensp;&thinsp;&thinsp;&#42\nPotion&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&thinsp;12th level&emsp;&emsp;&emsp;&thinsp;Potion destroyed\nOther magic&emsp;&emsp;&emsp;&emsp;&ensp;12th,\n&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;unless special&emsp;&#42\nArtifact&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;DM discretion&emsp;&ensp;DM discretion\n\n&#42 Effect negated; if cast directly on item, item becomes nonoperational for 1d4 rounds.'
};

pri3['Feign Death'] = {
    'name': 'Feign Death',
    'level': 'Level 3 Priest',
    'school': 'Necromancy',
    'sphere': 'Necromantic',
    'range': 'Touch',
    'duration': '1 turn + [[@{level-priest}]] rounds',
    'aoe': 'Person touched',
    'components': 'V',
    'cast-time': '½',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 267',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster or any other willing person can be put into a cataleptic state that is impossible to distinguish from actual death. Although the person affected can smell, hear, and know what is going on, no feeling or sight of any sort is possible; thus, any wounding or mistreatment of the body is not felt, no reaction occurs, and damage is only one-half normal. In addition, paralysis, poison, or energy level drain does not affect a person under the influence of this spell, but poison injected or otherwise introduced into the body becomes effective when the spell recipient is no longer under the influence of this spell, although a saving throw is permitted. However, the spell offers no protection from causes of certain death—being crushed under a landslide, etc. Only a willing individual can be affected by a *feign death* spell. The priest is able to end the spell effect at any time, but it requires a full round for bodily functions to begin again.\n&emsp;Note that, unlike the wizard version of this spell, only people can be affected, and that those of any level can be affected by the priest casting this spell.'
};

pri3['Flame Walk'] = {
    'name': 'Flame Walk',
    'level': 'Level 3 Priest',
    'school': 'Alteration',
    'sphere': 'Elemental (Fire)',
    'range': 'Touch',
    'duration': '[[1+[[@{level-priest}]] ]] rounds',
    'aoe': '[[ [[@{priest-level}]]-4]] Creature(s) touched',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and at least 500 gp of powdered ruby per affected creature',
    'reference': 'PHB p. 268',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster empowers one or more creatures to withstand nonmagical fires of temperatures up to 2,000° F. (1093° C) (enabling them to walk upon molten lava). It also confers a +2 bonus to saving throws against magical fire and reduces damage from such fires by one-half, even if the saving throw is failed. For every experience level above the minimum required to cast the spell (5th), the priest can affect an additional creature. This spell is not cumulative with *resist fire* spells or similar protections.'
};

pri3['Glyph of Warding'] = {
    'name': 'Glyph of Warding',
    'level': 'Level 3 Priest',
    'school': 'Abjuration, Evocation',
    'sphere': 'Guardian',
    'range': 'Touch',
    'duration': 'Until discharged',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'Special',
    'materials': 'Incense and, if the area exceeds 50 sq. ft., 2000 gp worth of powdered diamond',
    'reference': 'PHB p. 268',
    'damage': '[[ [[@{level-priest}]]d4]]',
    'damage-type': 'varies',
    'healing': '',
    'effect': 'A glyph of warding is a powerful inscription magically drawn to prevent unauthorized or hostile creatures from passing, entering, or opening. It can be used to guard a small bridge, to ward an entry, or as a trap on a chest or box. \n&emsp;The priest must set the conditions of the ward; typically any creature violating the warded area without speaking the name of the glyph is subject to the magic it stores. A successful saving throw vs. spell enables the creature to escape the effects of the glyph. Glyphs can be set according to physical characteristics, such as creature type, size, and weight. Glyphs can also be set with respect to good or evil, or to pass those of the caster’s religion. They cannot be set according to class, Hit Dice, or level. Multiple glyphs cannot be cast on the same area; although if a cabinet had three drawers, each could be separately warded. \n&emsp;When the spell is cast, the priest weaves a tracery of faintly glowing lines around the warding sigil. For every 5 square feet of area to be protected, one round is required to trace the warding lines of the glyph. The caster can affect an area equal to a square the sides of which are the same as his level, in feet. The glyph can be placed to conform to any shape up to the limitations of the caster’s total square footage. Thus, a 6th-level caster could place a glyph on a 6-foot × 6-foot square, a 4-foot × 9-foot rectangle, a 2-foot × 18-foot band, or a 1-foot by 36-foot strip. When the spell is completed, the glyph and tracery become invisible. \n&emsp;The priest traces the glyph with incense, which, if the area exceeds 50 square feet, must be sprinkled with powdered diamond (at least 2,000 gp worth). \n&emsp;Typical glyphs shock for 1d4 points of electrical damage per level of the spellcaster, explode for a like amount of fire damage, paralyze, blind, deafen, and so forth. The DM may allow any harmful priest spell effect to be used as a glyph, provided the caster is of sufficient level to cast the spell. Successful saving throws either reduce effects by one-half or negate them, according to the glyph employed. Glyphs cannot be affected or bypassed by such means as physical or magical probing, though they can be dispelled by magic and foiled by high-level thieves using their find-and-remove-traps skill. \n&emsp;The DM may decide that the exact glyphs available to a priest depend on his religion, and he might make new glyphs available according to the magical research rules.'
};

pri3['Hold Animal'] = {
    'name': 'Hold Animal',
    'level': 'Level 3 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Animal',
    'range': '80 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '1–4 animals in 40-foot cube',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 268',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster holds one to four animals rigid. Animals affected are normal or giant-sized mammals, birds, or rep-tiles, but not monsters such as centaurs, gorgons, harpies, naga, etc. Apes, bears, crocodiles, dogs, eagles, foxes, giant beavers, and similar animals are subject to this spell. The hold lasts for two rounds per caster level. The caster decides how many animals can be affected, but the greater the number, the better chance each has to successfully save against the spell. Each animal gets a saving throw: If only one is the subject of the spell, it has a penalty of –4 on its roll; if two are subject, each receives a penalty of –2 on its roll; if three are subject, each receives a penalty of –1 on its roll; and if four are subject, each gets an unmodified saving throw. \n&emsp;A maximum body weight of 400 pounds (100 pounds for non-mammals) per animal per caster level can be affected. (Currently [[400*[[@{priest-level}]] ]]-pound mammals or [[100*[[@{priest-level}]] ]]-pound nonmammals) —for example, an 8th-level caster can affect up to four 3,200-pound mammals or a like number of 800-pound nonmammals, such as birds or reptiles.'
};

pri3['Locate Object'] = {
    'name': 'Locate Object',
    'level': 'Level 3 Priest',
    'school': 'Divination (Reversible)',
    'sphere': 'Divination',
    'range': '[[60+10*[[@{level-priest}]]]] yards',
    'duration': '8 hours.',
    'aoe': '1 object',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A piece of lodestone',
    'reference': 'PHB p. 268',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell helps locate a known or familiar object. The priest casts the spell, slowly turns, and will sense when he is facing in the direction of the object to be located, provided the object is within range—for example, 90 yards for 3rd-level priests, 100 yards for 4th, 110 yards for 5th, etc. The spell locates such objects as apparel, jewelry, furniture, tools, weapons, or even a ladder or stairway. Once the caster has fixed in his mind the items sought, the spell locates only that item. Attempting to find a specific item, such as a kingdom’s crown, requires an accurate mental image. If the image is not close enough to the actual item, the spell does not work; in short, desired but unique objects cannot be located by this spell unless they are known by the caster. The spell is blocked by lead.\n&emsp;The reversal, *obscure object*, hides an object from location by spell, *crystal ball*, or similar means for eight hours. The caster must touch the object being concealed. \n&emsp;Neither application of the spell affects living creatures.'
};

pri3['Magical Vestment'] = {
    'name': 'Magical Vestment',
    'level': 'Level 3 Priest',
    'school': 'Enchantment',
    'sphere': 'Protection',
    'range': '0',
    'duration': '[[5*[[@{level-priest}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '1 rd.',
    'saving-throw': 'None',
    'materials': 'The vestment to be enchanted and the priest’s holy symbol, which are not expended',
    'reference': 'PHB p. 269',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enchants the caster’s vestment, providing protection at least the equivalent of chain mail (AC 5). The vestment gains a +1 enchantment for each three levels of the priest beyond 5th level, to a maximum of AC 1 at 17th level. (Currently +[[{[[floor(([[@{level-priest}]]-5)/3)]],4}kl1]] enchantment for a total of [[5-[[{[[floor(([[@{level-priest}]]-5)/3)]],4}kl1]] ]] AC). The magic lasts for five rounds per level of the caster, or until the caster loses consciousness. If the vest-ment is worn with other armors, only the best AC (either the armor or the vestment) is used; this protection is not cumulative with any other AC protection.'
};

pri3['Meld Into Stone'] = {
    'name': 'Meld Into Stone',
    'level': 'Level 3 Priest',
    'school': 'Alteration',
    'sphere': 'Elemental (Earth)',
    'range': '0',
    'duration': '[[8+1d8]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 269',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the priest to meld his body and possessions into a single block of stone. The stone must be large enough to accommodate his body in all three dimensions. When the casting is complete, the priest and not more than 100 pounds of nonliving gear merge with the stone. If either condition is violated, the spell fails and is wasted. \n&emsp;While in the stone, the priest remains in contact, however tenuous, with the face of the stone through which he melded. The priest remains aware of the passage of time. Nothing that goes on outside the stone can be seen or heard, however. Minor physical damage to the stone does not harm the priest, but its partial destruction, if enough so that the caster no longer fits, expels the priest with 4d8 points of damage. The stone’s destruction expels the priest and slays him instantly, unless he rolls a successful saving throw vs. spell. \n&emsp;The magic lasts for 1d8+8 rounds, with the variable part of the duration rolled secretly by the DM. At any time before the duration expires, the priest can step out of the stone through the stone surface he entered. If the duration runs out, or the effect is dispelled before the priest exits the stone, he is violently expelled and suffers 4d8 points of damage.\n&emsp;The following spells harm the priest if cast upon the stone that he is occupying: *stone to flesh* expels the priest and inflicts 4d8 points of damage; *stone shape* causes 4d4 points of damage, but does not expel the priest; *transmute rock to mud* expels and slays him instantly unless he rolls a successful saving throw vs. spell; and *passwall* expels the priest without damage.'
};

pri3['Negative Plane Protection'] = {
    'name': 'Negative Plane Protection',
    'level': 'Level 3 Priest',
    'school': 'Abjuration',
    'sphere': 'Protection, Necromantic',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 269',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell affords the caster or touched creature partial protection from undead monsters with Negative Energy plane connections (such as shadows, wights, wraiths, spectres, or vampires) and certain weapons and spells that drain energy levels. The *negative plane protection* spell opens a channel to the Positive Energy plane, possibly offsetting the effect of the negative energy attack. A protected creature struck by a negative energy attack is allowed a saving throw vs. death magic. If successful, the energies cancel with a bright flash of light and a thunderclap. The protected creature suffers only normal hit point damage from the attack and does not suffer any drain of experience or Strength, regardless of the number of levels the attack would have drained. An attacking undead creature suffers 2d6 points of damage from the positive energy; a draining wizard or weapon receives no damage.\n&emsp;This protection is proof against only one such attack, dissipating immediately whether or not the saving throw was successful. If the saving throw is failed, the spell recipient suffers double the usual physical damage, in addition to the loss of experience or Strength that normally occurs. The protection lasts for one turn per level of the priest casting the spell, or until the protected creature is struck by a negative energy attack. This spell cannot be cast on the Negative Energy plane.'
};

pri3['Plant Growth'] = {
    'name': 'Plant Growth',
    'level': 'Level 3 Priest',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '160 yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 269',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *plant growth* spell enables the caster to choose either of two  different uses. The first causes normal vegetation to grow, entwine, and entangle to form a thicket or jungle that creatures must hack or force a way through at a movement rate of 10 feet per round (or 20 feet per round for larger-than-man-sized creatures). Note that the area must have brush and trees in it in order for this spell to take effect. Briars, bushes, creepers, lianas, roots, saplings, thistles, thorn, trees, vines, and weeds become so thick and overgrown in the area of effect as to form a barrier. The area of effect is a square 20 feet on a side per level of experience of the caster, in any square or rectangular shape that the caster decides upon at the time of the spellcasting. (Currently [[20*[[@{level-priest}]]-foot square). Thus, an 8th-level caster can affect a maximum area of a 160-foot × 160-foot square, a 320-foot × 80-foot rectangle, a 640-foot × 40-foot rectangle, a 1,280-foot × 20-foot rectangle, etc. The spell’s effects persist in the area until it is cleared by labor, fire, or such magical means as a *dispel magic* spell.\n&emsp;The second use of the spell affects a one-mile square area. The DM secretly makes a saving throw (based on the caster’s level) to see if the spell takes effect. If successful, the spell renders plants more vigorous, fruitful, and hardy, increasing yields by 20% to 50% ([1d4+1] × 10%), given a normal growing season. The spell does not prevent disaster in the form of floods, drought, fire, or insects, although even in these cases the plants survive better than expected. This effect lasts only for the life cycle of one season, the winter “death” marking the end of a life cycle even for the sturdiest of trees. In many farming communities, this spell is normally cast at planting time as part of the spring festivals.'
};

pri3['Prayer'] = {
    'name': 'Prayer',
    'level': 'Level 3 Priest',
    'school': 'Conjuration/Summoning',
    'sphere': 'Combat',
    'range': '0',
    'duration': '[[@{priest-level}]] rounds',
    'aoe': '60-foot. radius',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A silver holy symbol, prayer beads, or a similar device',
    'reference': 'PHB p. 270',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of the *prayer* spell, the priest brings special favor upon himself and his party and causes harm to his enemies. Those in the area at the instant the spell is completed are affected for the duration of the spell. When the spell is completed, all attack and damage rolls and saving throws made by those in the area of effect who are friendly to the priest gain +1 bonuses, while those of the priest’s enemies suffer –1 penalties. Once the *prayer* spell is uttered, the priest can do other things, unlike a *chant*, which he must continue to make the spell effective. If another priest of the same religious persuasion (not merely the same alignment) is chanting when a prayer is cast, the effects combine to +2 and –2, as long as both are in effect at once.'
};

pri3['Protection From Fire'] = {
    'name': 'Protection From Fire',
    'level': 'Level 3 Priest',
    'school': 'Abjuration',
    'sphere': 'Protection, Elemental (Fire)',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol',
    'reference': 'PHB p. 270',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The effect of a *protection from fire* spell differs according to  whether the recipient of the magic is the caster or some other creature. In either case, the spell lasts no longer than one turn per caster level. (Currently [[@{level-priest}]] turns).\n&emsp;If the spell is cast upon the caster, it confers complete invulnerability to: normal fires (torches, bonfires, oil fires, and the like); exposure to magical fires such as fiery dragon breath; spells such as *burning hands*, *fireball*, *fire seeds*, *fire storm*, *flame strike*, and *meteor swarm*; hell hound or pyrohydra breath, etc. The invulnerability lasts until the spell has absorbed 12 points of heat or fire damage per level of the caster, (Currently [[12*[[@{level-priest}]] ]] points of heat or fire damage), at which time the spell is negated. If the spell is cast upon another creature, it gives invulnerability to normal fire, gives a bonus of +4 to saving throw die rolls vs. fire attacks, and reduces damage sustained from magical fires by 50%.'
};

pri3['Pyrotechnics'] = {
    'name': 'Pyrotechnics',
    'level': 'Level 3 Priest',
    'school': 'Alteration',
    'sphere': 'Elemental (Fire)',
    'range': '160 yards',
    'duration': 'Special',
    'aoe': '10 or 100 x fire',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': 'One fire source within the area of effect which is immediately extinguished',
    'reference': 'PHB p. 270',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *pyrotechnics* spell draws on an existing fire source to produce either of two effects, at the option of the caster.\n&emps;First, it can produce a flashing and fiery burst of glowing, colored  aerial fireworks that lasts one round. Creatures in, under, or within 120 feet of the area that have an unobstructed line of sight to the effect are blinded for [[1d4+1]] rounds unless they roll successful saving throws vs. spell. The fireworks fill a volume 10 times greater than the original fire source.\n&emsp;Second, it can cause a thick, writhing stream of smoke to arise from the source and form a choking cloud that lasts for one round per experience level of the caster. (Currently [[@{level-priest}]] rounds). This covers a roughly hemispherical volume from the ground or floor up (or conforming to the shape of a confined area) that totally obscures vision beyond 2 feet. The smoke fills a volume 100 times that of the fire source.\n&emsp;The spell uses one fire source within the area of effect, which is immediately extinguished. If an extremely large fire is used as the source, it is only partially extinguished by the casting. Magical fires are not extinguished, although a fire-based creature (such as a fire elemental) used as a source suffers [[1d4+[[@{level-priest}]] points of damage. This spell does not function under water.'
};

pri3['Remove Curse'] = {
    'name': 'Remove Curse',
    'level': 'Level 3 Priest',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 270',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, the priest is usually able to remove a curse on an object, on a person, or in the form of some undesired sending or evil presence. Note that the *remove curse* spell does not remove the curse from a cursed shield, weapon, or suit of armor, for example, although the spell typically enables the person afflicted with any such cursed item to get rid of it. Certain special curses may not be countered by this spell, or may be countered only by a caster of a certain level or more. A caster of 12th level or more can cure lycanthropy with this spell by casting it on the animal form. The were-creature receives a saving throw vs. spell and, if successful, the spell fails and the priest must gain a level before attempting the remedy on this creature again.\n&emsp;The reverse of the spell is not permanent; the *bestow curse* spell lasts for one turn for every experience level of the priest using the spell. (Currently [[@{level-priest}]] turns). The curse can have one of the following effects (roll percentile dice): 50% of the time it reduces one ability of the victim to 3 (the DM randomly determines which ability); 25% of the time it lowers the victim’s attack and saving throw rolls by –4; 25% of the time it makes the victim 50% likely to drop whatever he is holding (or do nothing, in the case of creatures not using tools)—roll each round.\n&emsp;It is possible for a priest to devise his own curse, and it should be similar in power to those given here. Consult your DM. The subject of a *bestow curse* spell must be touched. If the victim is touched, a saving throw is still applicable; if it is successful, the effect is negated. The bestowed curse cannot be dispelled.'
};

pri3['Remove Paralysis'] = {
    'name': 'Remove Paralysis',
    'level': 'Level 3 Priest',
    'school': 'Abjuration',
    'sphere': 'Protection',
    'range': '[[10*[[@{level-priest}]] yards',
    'duration': 'Permanent',
    'aoe': '[[1d4]] creatures in 20-foot cube',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 271',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By the use of this spell, the priest can free one or more creatures from the effects of any paralyzation or from related magic (such as a ghoul touch, or a *hold* or *slow* spell). If the spell is cast on one creature, the paralyzation is negated. If cast on two creatures, each receives another saving throw vs. the effect that afflicts it, with a +4 bonus. If cast on three or four creatures, each receives another saving throw with a +2 bonus. There must be no physical or magical barrier between the caster and the creatures to be affected, or the spell fails and is wasted.'
};

pri3['Snare'] = {
    'name': 'Snare',
    'level': 'Level 3 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': 'Until triggered',
    'aoe': '[[24+2*[[@{level-priest}]] ]]-inch diameter',
    'components': 'V, S, M',
    'cast-time': '3 rounds',
    'saving-throw': 'None',
    'materials': 'A snake skin and a piece of sinew from a strong animal to weave into the cordlike object from which he will make the snare. Also the caster’s holy symbol is needed',
    'reference': 'PHB p. 271',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to make a snare that is 90% undetectable without magical aid. The snare can be made from any supple vine, a thong, or a rope. When the *snare* spell is cast upon it, the cordlike object blends with its surroundings. One end of the snare is tied in a loop that contracts around one or more of the limbs of any creature stepping inside the circle (note that the head of a worm or snake could be thus ensnared).\n&emsp;If a strong and supple tree is nearby, the snare can be fastened to it. The magic of the spell causes the tree to bend and then straighten when the loop is triggered, inflicting 1d6 points of damage to the creature trapped, and lifting it off the ground by the trapped member(s) (or strangling it if the head/neck triggered the snare). If no such sapling or tree is available, the cordlike object tightens upon the member(s), then wraps around the entire creature, causing no damage, but tightly binding it. Under water, the cord coils back upon its anchor point. The snare is magical, so for one hour it is breakable only by cloud giant or greater Strength (23); each hour thereafter, the snare material loses magic so as to become 1 point more breakable per hour—22 after two hours, 21 after three, 20 after four—until six full hours have elapsed. At that time, 18 Strength will break the bonds. After 12 hours have elapsed, the materials of the snare lose all magical properties and the loop opens, freeing anything it held. The snare can be cut with any magical weapon, or with any edged weapon wielded with at least a +2 attack bonus (from Strength, for example).'
};

pri3['Speak With Dead'] = {
    'name': 'Speak With Dead',
    'level': 'Level 3 Priest',
    'school': 'Necromancy',
    'sphere': 'Divination',
    'range': '1',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'Special',
    'materials': 'A holy symbol and burning incense',
    'reference': 'PHB p. 271',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting a *speak with dead* spell, the priest is able to ask several questions of a dead creature in a set period of time and receive answers according to the knowledge of that creature. Of course, the priest must be able to converse in the language that the dead creature once used. The length of time the creature has been dead is a factor, since only higher level priests can converse with a long-dead creature. The number of questions that can be answered and the length of time in which the questions can be asked depend on the level of experience of the priest. Even if the casting is successful, such creatures are as evasive as possible when questioned. The dead tend to give extremely brief and limited answers, often cryptic, and to take questions literally. Furthermore, their knowledge is often limited to what they knew in life.\n&emsp;A dead creature of different alignment or of higher level or Hit Dice than the caster’s level receives a saving throw vs. spell. A dead creature that successfully saves can refuse to answer questions, ending the spell. At the DM’s option, the casting of this spell on a given creature might be restricted to once per week.\n&emsp;The priest needs a holy symbol and burning incense in order to cast this spell upon the body, remains, or a portion thereof. The remains are not expended. This spell does not function under water.\n\n**Caster’s Level**&emsp;&thinsp;**Max. Length**&emsp;&emsp;&emsp;**Time**&emsp;&emsp;&emsp;&emsp;**No. of**\n**of Experience**&emsp;&thinsp;**of Time Dead**&emsp;**Questioned**&emsp;**Questions**\n1–6&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1 week&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1 round&emsp;&emsp;&emsp;&emsp;2\n7–8&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1 month&emsp;&emsp;&emsp;&emsp;&emsp;&thinsp;3 rounds&emsp;&emsp;&emsp;&ensp;&thinsp;3\n9–12&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&thinsp;&thinsp;1 year&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&thinsp;1 turn&emsp;&emsp;&emsp;&emsp;&emsp;4\n13–15&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&thinsp;10 years&emsp;&emsp;&emsp;&emsp;&emsp;2 turns&emsp;&emsp;&emsp;&emsp;&ensp;5\n16–20&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&thinsp;100 years&emsp;&emsp;&emsp;&emsp;&ensp;3 turns&emsp;&emsp;&emsp;&emsp;&ensp;6\n21+&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&thinsp;1,000 years&emsp;&emsp;&emsp;&ensp;1 hour&emsp;&emsp;&emsp;&emsp;&ensp;&thinsp;&thinsp;7'
};

pri3['Spike Growth'] = {
    'name': 'Spike Growth',
    'level': 'Level 3 Priest',
    'school': 'Alteration, Enchantment',
    'sphere': 'Plant',
    'range': '60 yards',
    'duration': '[[3d4+[[@{level-priest}]] ]] turns',
    'aoe': '[[@{level-priest}]] 10-foot squares ',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and either seven sharp thorns or seven small twigs, each sharpened to a point.',
    'reference': 'PHB p. 271',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Wherever any type of plant growth of moderate size or density is found, this spell can be used. The ground-covering vegetation or roots and rootlets in the area become very hard and sharply pointed. In effect, the ground cover, while appearing to be unchanged, acts as if the area were strewn with caltrops. In areas of bare ground or earthen pits, roots and rootlets act in the same way. For each 10 feet of movement through the area, the victim suffers 2d4 points of damage. He must also roll a saving throw vs. spell. If this saving throw is failed, the victim’s movement rate is reduced by 1⁄3 of its current total (but a creature’s movement rate can never be less than 1). This penalty lasts for 24 hours, after which the character’s normal movement rate is regained.\n&emsp;Without the use of a spell such as *true seeing*, similar magical aids, or some other special means of detection (such as *detect traps* or *detect snares and pits*), an area affected by *spike growth* is absolutely undetectable as such until a victim enters the area and suffers damage. Even then, the creature cannot determine the extent of the perilous area unless some means of magical detection is used.'
};

pri3['Starshine'] = {
    'name': 'Starshine',
    'level': 'Level 3 Priest',
    'school': 'Evocation, Illusion/Phantasm',
    'sphere': 'Sun',
    'range': '[[10*[[@{level-priest}]] ]] yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[@{level-priest}]] 10-foot squares',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'Several stalks from an amaryllis plant (especially Hypoxis) and several holly berries',
    'reference': 'PHB p. 272',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *starshine* spell enables the caster to softly illuminate an area as if it were exposed to a clear night sky filled with stars. Regardless of the height of the open area in which the spell is cast, the area immediately beneath it is lit by starshine. Vision ranges are the same as those for a bright moonlit night—movement noted out to 100 yards; stationary creatures seen up to 50 yards; general identifications made at 30 yards; and recognition at 10 yards. The spell creates shadows and has no effect on infravision. The area of effect actually appears to be a night sky, but disbelief of the illusion merely enables the disbeliever to note that the “stars” are actually evoked lights. This spell does not function under water.'
};

pri3['Stone Shape'] = {
    'name': 'Stone Shape',
    'level': 'Level 3 Priest',
    'school': 'Alteration',
    'sphere': 'Elemental (Earth)',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '[[9+[[@{level-priest}]] ]] cubic feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Soft clay that must be worked into roughly the desired shape of the stone object, and then touched to the stone when the spell is uttered',
    'reference': 'PHB p. 272',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster can form an existing piece of stone into any shape that suits his purposes. For example, he can make a stone weapon, a special trapdoor, or a crude idol. By the same token, it enables the spellcaster to shape a stone door, perhaps so as to escape imprisonment, providing the volume of stone involved is within the limits of the area of effect. While stone coffers can be thus formed, stone doors made, etc., the fineness of detail is not great. If the shaping has moving parts, there is a 30% chance they do not work.'
};

pri3['Summon Insects'] = {
    'name': 'Summon Insects',
    'level': 'Level 3 Priest',
    'school': 'Conjuration/Summoning',
    'sphere': 'Animal',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 rd.',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol, a flower petal, and a bit of mud or wet clay',
    'reference': 'PHB p. 272',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *summon insects* spell attracts a cloud or swarm of normal insects to attack the foes of the caster. Flying insects appear 70% of the time, while crawling insects appear 30% of the time. The exact insects called are bees, biting flies, hornets, or wasps, if flying insects are indicated; biting ants or pinching beetles, if crawling insects are indicated. A cloud of the flying type, or a swarm of the crawling sort, appears after the spell is cast. This gathers at a point chosen by the caster, within the spell’s range, and attacks any single creature the caster points to.\n&emsp;The attacked creature sustains 2 points of damage if it does nothing but attempt to flee or fend off the insects during the time it is attacked; it suffers 4 points of damage per round otherwise. If the insects are ignored, the victim fights with a –2 penalty to his attack roll and a +2 penalty to his Armor Class. If he attempts to cast a spell, an initiative roll should be made for the insects to see if their damage occurs before the spell is cast. If it does, the victim’s concentration is ruined and the spell is lost.\n&emsp;The insects disperse and the spell ends if the victim enters thick smoke or hot flames. Besides being driven off by smoke or hot flames, the swarm might possibly be outrun, or evaded by plunging into a sufficient body of water. If evaded, the summoned insects can be sent against another opponent, but there will be at least a 1 round delay while they leave the former opponent and attack the new victim. Crawling insects can travel only about 10 feet per round (maximum speed over smooth ground) and flying insects travel 60 feet per round. The caster must concentrate to maintain the swarm; it dissipates if he moves or is disturbed.\n&emsp;It is possible, in underground situations, that the caster might summon 1d4 giant ants by means of the spell, but the possibility is only 30% unless giant ants are nearby. This spell does not function under water.'
};

pri3['Tree'] = {
    'name': 'Tree',
    'level': 'Level 3 Priest',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '0',
    'duration': '[[6+[[@{level-priest}]] ]] turns',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a twig from a tree',
    'reference': 'PHB p. 273',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to assume the form of a small living tree or shrub or that of a large dead tree trunk with only a few limbs. Although the closest inspection cannot reveal that this plant is actually a person, and for all normal tests he is, in fact, a tree or shrub, the caster is able to observe all that goes on around him just as if he were in normal form. The Armor Class and hit points of the plant are those of the caster. The caster can remove the spell at any time, instantly changing from plant to his normal form and having full capability for any action normally possible (including spellcasting). Note that all clothing and gear worn or carried change with the caster.'
};

pri3['Water Breathing'] = {
    'name': 'Water Breathing',
    'level': 'Level 3 Priest',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Water, Air)',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] hours',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 273',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The recipient of a *water breathing* spell is able to breathe under water freely for the duration of the spell—i.e., one hour for each experience level of the caster. The priest can divide the base duration between multiple characters. Thus, an 8th-level priest can confer this ability to two characters for four hours, four for two hours, eight for one hour, etc., to a minimum of one half-hour per character.\n&emsp;The reverse, *air breathing*, enables water-breathing creatures to survive comfortably in the atmosphere for an equal duration. Note that neither version prevents the recipient creature from breathing in its natural element.'
};

pri3['Water Walk'] = {
    'name': 'Water Walk',
    'level': 'Level 3 Priest',
    'school': 'Alteration',
    'sphere': 'Elemental (Water)',
    'range': '0',
    'duration': '[[1+[[@{level-priest}]] ]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A piece of cork and the priest’s holy symbol',
    'reference': 'PHB p. 273',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to empower one or more creatures to tread upon any liquid as if it were firm ground; this includes mud, quicksand, oil, running water, and snow. The recipient’s feet do not touch the surface of the liquid, but oval depressions of his appropriate foot size and 2 inches deep are left in the mud or snow. The recipient’s rate of movement remains normal. If cast under water, the recipient is borne toward the surface.\n&emsp;For every level of the caster above the minimum required to cast the spell (5th level), he can affect another creature. Currently [[ [[@{level-priest}]]-4]] creatures.'
};

const priestSpells = {};
priestSpells['pri1'] = pri1;
priestSpells['pri2'] = pri2;
priestSpells['pri3'] = pri3;
/* ---- Priest spells end ---- */