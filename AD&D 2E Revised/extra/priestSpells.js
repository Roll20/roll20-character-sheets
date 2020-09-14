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
    'effect': 'By means of this spell, the caster is able to show any animal of animal intelligence to semi-intelligence (i.e., Intelligence 1–4) that he desires friendship. If the animal does not roll a successful saving throw vs. spell immediately when the spell is begun, it stands quietly while the caster finishes the spell. Thereafter, it follows the caster about. The spell functions only if the caster actually wishes to be the animal’s friend. If the caster has ulterior motives, the animal always senses them (for example, the caster intends to eat the animal, send it ahead to set off traps, etc.). \\n&emsp;The caster can teach the befriended animal three specific tricks or tasks for each point of Intelligence it possesses. Typical tasks are those taught to a dog or similar pet (i.e., they cannot be complex). Training for each such trick must be done over a period of one week, and all must be done within three months of acquiring the creature. During the three-month period, the animal will not harm the caster, but if the creature is left alone for more than a week, it will revert to its natural state and act accordingly. \\n&emsp;The caster can use this spell to attract up to 2 Hit Dice of animal(s) per experience level he possesses. This is also the maximum total Hit Dice of the animals that can be attracted and trained at one time: no more than twice the caster’s experience level. Current maximum [[2*#LEVEL#]] Hit Dice of animals. Only unaligned animals can be attracted, befriended, and trained.'
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
    'materials': 'holy water / unholy water.',
    'reference': 'PHB p. 252',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon uttering the bless spell, the caster raises the morale of friendly creatures and any saving throw rolls they make against fear effects by +1. Furthermore, it raises their attack dice rolls by +1. A blessing, however, affects only those not already engaged in melee combat. The caster determines at what range (up to 60 yards) he will cast the spell. At the instant the spell is completed, it affects all creatures in a 50-foot cube centered on the point selected by the caster (thus, affected creatures leaving the area are still subject to the spell’s effect; those entering the area after the casting is completed are not). \\n&emsp;A second use of this spell is to bless a single item (for example, a crossbow bolt for use against a rakshasa). The weight of the item is limited to one pound per caster level and the effect lasts until the item is used or the spell duration ends. \\n&emsp;Multiple bless spells are not cumulative. In addition to the verbal and somatic gesture components, the bless spell requires holy water. \\n&emsp;This spell can be reversed by the priest to a curse spell that, when cast upon enemy creatures, lowers their morale and attack rolls by –1. The curse requires the sprinkling of unholy water.'
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
    'effect': 'Using this spell, three to five priests combine their abilities so that one of them casts spells and turns undead at an enhanced level. The highest-level priest (or one of them, if two or more are tied for highest) stands alone, while the others join hands in a surrounding circle. The central priest casts the combine spell. He temporarily gains one level for each priest in the circle, up to a maximum gain of four levels. The level increase affects turning undead and spell details that vary with the caster’s level. Note that the central priest gains no additional spells and that the group is limited to his currently memorized spells. \\n&emsp;The encircling priests must concentrate on maintaining the combine effect. They lose all Armor Class bonuses for shield and Dexterity. If any of them has his concentration broken, the combine spell ends immediately. If the combine spell is broken while the central priest is in the act of casting a spell, that spell is ruined just as if the caster were disturbed. Spells cast in combination have the full enhanced effect, even if the combine is broken before the duration of the enhanced spell ends. Note that the combination is not broken if only the central caster is disturbed.'
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
    'effect': 'This spell enables the priest to command another creature with a single word. The command must be uttered in a language understood by the creature. The subject will obey to the best of his/its ability only as long as the command is absolutely clear and unequivocal; thus, a command of “Suicide!” is ignored. A command to “Die!” causes the creature to fall in a faint or cataleptic state for one round, but thereafter the creature revives and is alive and well. Typical commands are back, halt, flee, run, stop, fall, go, leave, surrender, sleep, rest, etc. No command affects a creature for more than one round; undead are not affected at all. Creatures with Intelligence of 13 (high) or more, or those with 6 or more Hit Dice (or experience levels) are entitled to a saving throw vs. spell, adjusted for Wisdom. (Creatures with 13 or higher Intelligence and 6 Hit Dice/levels get only one saving throw!)'
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
    'materials': 'The create water spell requires at least a drop of water; the destroy water spell, at least a pinch of dust.',
    'reference': 'PHB p. 253',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the priest casts a create water spell, up to 4 gallons of water are generated for every experience level of the caster (Currently up to [[4*#LEVEL#]] gallons). The water is clean and drinkable (it is just like rain water). The created water can be dispelled within a round of its creation; otherwise, its magic fades, leaving normal water that can be used, spilled, evaporated, etc. The reverse of the spell, destroy water, obliterates without trace (no vapor, mist, fog, or steam) a like quantity of water. Water can be created or destroyed in an area as small as will actually contain the liquid, or in an area as large as 27 cubic feet (1 cubic yard). \\n&emsp;Note that water can neither be created nor destroyed within a creature. For reference purposes, water weighs about 8½ pounds per gallon, and a cubic foot of water weighs approximately 64 pounds.'
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
    'effect': 'When casting this spell and laying his hand upon a creature, the priest causes 1d8 points of wound or other injury damage to the creature’s body to be healed. This healing cannot affect creatures without corporeal bodies, nor can it cure wounds of creatures not living or of extraplanar origin. \\n&emsp;The reverse of the spell, cause light wounds, operates in the same manner, inflicting 1d8 points of damage. If a creature is avoiding this touch, an attack roll is needed to determine if the priest’s hand strikes the opponent and causes such a wound. \\n&emsp;Curing is permanent only insofar as the creature does not sustain further damage; caused wounds will heal—or can be cured—just as any normal injury.'
};

pri1['Detect Evil'] = {
    'name': 'Detect Evil',
    'level': 'Level 1 Priest',
    'school': 'Divination',
    'sphere': 'All',
    'range': '0',
    'duration': '1 turn + [[5*#LEVEL#]] rounds',
    'aoe': '10 feet x 120 yards',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The use of the priest’s holy symbol as its material component, with the priest holding it before him.',
    'reference': 'PHB p. 253',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell discovers emanations of evil, or of good in the case of the reverse spell, from any creature, object, or area. Character alignment, however, is revealed only under unusual circumstances: characters who are strongly aligned, who do not stray from their faith, and who are of at least 9th level might radiate good or evil if intent upon appropriate actions. Powerful monsters, such as rakshasas or ki-rin, send forth emanations of evil or good, even if polymorphed. Aligned undead radiate evil, for it is this power and negative force that enable them to continue existing. An evilly cursed object or unholy water radiates evil, but a hidden trap or an unintelligent viper does not. \\n&emsp;The degree of evil (dim, faint, moderate, strong, or overwhelming) and possibly its general nature (expectant, malignant, gloating, etc.) can be noted. If the evil is overwhelming, the priest has a 10% chance per level ([[10*#LEVEL#]]%) of detecting its general bent (lawful, neutral, or chaotic). The duration of a detect evil (or detect good) spell is one turn plus five rounds per level of the priest. Thus, a 1st-level priest can cast a spell with a 15-round duration, a 2nd-level priest can cast a spell with a 20-round duration. Current duration [[10+(5*#LEVEL#)]] rounds. The spell has a path of detection 10 feet wide in the direction the priest is facing. The priest must concentrate—stop, have quiet, and intently seek to detect the aura— for at least one round to receive a reading.'
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
    'effect': 'When the detect magic spell is cast, the priest detects magical radiations in a path 10 feet wide and up to 30 yards long, in the direction he is facing. The intensity of the magic can be detected (dim, faint, moderate, strong, or overwhelming). The caster has a 10% chance per level ([[10*#LEVEL#]]%) to determine the sphere of the magic, but unlike the wizard version of the spell, the type of magic (alteration, conjuration, etc.) cannot be divined. The caster can turn, scanning a 60° arc per round. The spell is blocked by solid stone at least 1 foot thick, solid metal at least 1 inch thick, or solid wood at least 1 yard thick.'
};

pri1['Detect Poison'] = {
    'name': 'Detect Poison',
    'level': 'Level 1 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': '1 turn + [[#LEVEL#]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A strip of specially blessed vellum, which turns black if poison is present.',
    'reference': 'PHB p. 254',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the priest to determine if an object has been poisoned or is poisonous. One object, or one 5-foot cubic mass, can be checked per round. The priest has a 5% chance per level of determining the exact type of poison. Currently [[5*#LEVEL#]]% of detecting the type of poison.'
};

pri1['Detect Snares & Pits'] = {
    'name': 'Detect Snares & Pits',
    'level': 'Level 1 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': '[[4*#LEVEL#]] rounds',
    'aoe': '10 x 40 feet',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'The caster must have his holy symbol to complete the spell.',
    'reference': 'PHB p. 254',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, the caster is able to detect snares, pits, deadfalls and similar hazards along a path 10 feet wide and 40 feet long. Such hazards include simple pits, deadfalls, snares of wilderness creatures (for example, trapdoor spiders, giant sundews, ant lions, etc.), and primitive traps constructed of natural materials (mantraps, missile trips, hunting snares, etc.). The spell is directional—the caster must face the desired direction to determine if a pit exists or a trap is laid in that direction. The caster experiences a feeling of danger from the direction of a detected hazard, which increases as the danger is approached. The caster learns the general nature of the danger (pit, snare, or deadfall) but not its exact operation, nor how to disarm it. Close examination, however, enables the caster to sense what intended actions might trigger it. The spell detects certain natural hazards— quicksand (snare), sinkholes (pit), or unsafe walls of natural rock (deadfall). Other hazards, such as a cavern that floods during rain, an unsafe construction, or a naturally poisonous plant, are not revealed. The spell does not detect magical traps (save those that operate by pit, deadfall, or snaring; see the 2ndlevel spell trip and the 3rd-level spell snare), nor those that are mechanically complex, nor those that have been rendered safe or inactive.'
};

pri1['Endure Cold/Endure Heat'] = {
    'name': 'Endure Cold/Endure Heat',
    'level': 'Level 1 Priest',
    'school': 'Alteration',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[1.5*#LEVEL#]] hours',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The create water spell requires at least a drop of water; the destroy water spell, at least a pinch of dust.',
    'reference': 'PHB p. 254',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The creature receiving this spell is protected from normal extremes of cold or heat (depending on which application the priest selects at the time of casting). The creature can stand unprotected in temperatures as low as –30° F. or as high as 130° F. (-34° to 54° C) (depending on application) with no ill effect. Temperatures beyond these limits inflict 1 point of damage per hour of exposure for every degree beyond the limit. The spell is immediately cancelled if the recipient is affected by any non-normal heat or cold, such as magic, breath weapons, and so on. The cancellation occurs regardless of the application and regardless of whether a heat or cold effect hits the character (for example, an endure cold spell is cancelled by magical heat or fire as well as by magical cold). The recipient of the spell does not suffer the first 10 points of damage (after any applicable saving throws) from the heat or cold during the round in which the spell is broken. The spell ends instantly if either resist fire or resist cold is cast upon the recipient.'
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
    'duration': '[[4*#LEVEL#]] rounds',
    'aoe': '[[10*#LEVEL#]] square feet within 40-feet radius',
    'components': 'V, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A small piece of foxfire',
    'reference': 'PHB p. 254',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to outline one or more objects or creatures with a pale glowing light. The number of subjects outlined depends upon the number of square feet the caster can affect. Sufficient footage enables several objects or creatures to be outlined by the faerie fire spell, but one must be fully outlined before the next is begun, and all must be within the area of effect. Outlined objects or creatures are visible at 80 yards in the dark and 40 yards if the viewer is near a bright light source. Outlined creatures are easier to strike; thus, opponents gain a +2 bonus to attack rolls in darkness (including moonlit nights) and a +1 bonus in twilight or better. Note that outlining can render otherwise invisible creatures visible. However, it cannot outline noncorporeal, ethereal, or gaseous creatures. Nor does the light come anywhere close to sunlight. Therefore, it has no special effect on undead or dark-dwelling creatures. The faerie fire can be blue, green, or violet according to the word of the caster at the time of casting. The faerie fire does not cause any harm to the object or creature thus outlined.'
};