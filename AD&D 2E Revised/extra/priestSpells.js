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