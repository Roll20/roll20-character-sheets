/* ---- Priest spells start ---- */
const pri1 = {}
pri1['Animal Friendship'] = {
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
    'effect': 'This spell affects any single person or mammal it is cast upon. The creature then regards the caster as a trusted friend and ally to be heeded and protected. The term *person* includes any bipedal human, demihuman or humanoid of man size or smaller, including brownies, dryads, dwarves, elves, gnolls, gnomes, goblins, half-elves, halflings, half-orcs, hobgoblins, humans, kobolds, lizard men, nixies, orcs, pixies, sprites, troglodytes, and others. Thus, a 10th-level fighter is included, while an ogre is not. \n&emsp;The spell does not enable the caster to control the charmed creature as if it were an automaton, but any word or action of the caster is viewed in the most favorable way. Thus, a charmed creature would not obey a suicide command, but might believe the caster if assured that the only chance to save the caster’s life is for the creature to hold back an onrushing red dragon for “just a minute or two” and if the charmed creature’s view of the situation suggests that this course of action still allows a reasonable chance of survival. \n&emsp;The subject’s attitudes and priorities are changed with respect to the caster, but basic personality and alignment are not. A request that a victim make itself defenseless, give up a valued item, or even use a charge from a valued item (especially against former associates or allies) might allow an immediate saving throw to see if the charm is thrown off. Likewise, a charmed creature does not necessarily reveal everything it knows or draw maps of entire areas. Any request may be refused, if such refusal is in character and does not directly harm the caster. The victim’s regard for the caster does not necessarily extend to the caster’s friends or allies. The victim does not react well to the charmer’s allies making suggestions such as, “Ask him this question. . .,” nor does the charmed creature put up with verbal or physical abuse from the charmer’s associates, if this is out of character. \n&emsp;Note also that the spell does not empower the caster with linguistic capabilities beyond those he normally has. The duration of the spell is a function of the charmed creature’s Intelligence, and it is tied to the saving throw. A successful saving throw breaks the spell. This saving throw is checked on a periodic basis according to the creature’s Intelligence, even if the caster has not overly strained the relationship.}}{{style=center1 sheet-spell-center2}}{{c1-1=**Intelligence Score**}}{{c2-1=3 or less}}{{c3-1=4–6}}{{c4-1=7–9}}{{c5-1=10–12}}{{c6-1=13–14}}{{c7-1=15–16}}{{c8-1=17}}{{c9-1=18}}{{c10-1=19 or more}}{{c1-2=**Period Between Checks**}}{{c2-2=3 months}}{{c3-2=2 months}}{{c4-2=1 month}}{{c5-2=3 weeks}}{{c6-2=2 weeks}}{{c7-2=1 week}}{{c8-2=3 days}}{{c9-2=2 days}}{{c10-2=1 day}}{{effects2=&emsp;If the caster harms, or attempts to harm, the charmed creature by some overt action, or if a *dispel magic* spell is successfully cast upon the charmed creature, the charm is broken automatically.\n&emsp;If the subject of the *charm person or mammal* spell successfully rolls its saving throw vs. the spell, the effect is negated.\n&emsp;This spell, if used in conjunction with the *animal friendship* spell, can keep the animal near the caster’s home base, if the caster must leave for an extended period.'
};

pri2['Detect Charm'] = {
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
    'effect': 'When a priest casts this spell, it has a chance to neutralize or negate the magic it comes in contact with as follows:\n&emsp;First, it has a chance to remove spells and spell-like effects (including device effects and innate abilities) from creatures or objects. Second, it may disrupt the casting or use of these in the area of effect at the instant the dispel is cast. Third, it may destroy magical potions (which are treated as 12th level for purposes of this spell).\n&emsp;Each effect or potion in the spell’s area is checked to determine if it is dispelled. The caster can always dispel his own magic; otherwise, the chance depends on the difference in level between the magical effect and the caster. The base chance of successfully dispelling is 11 or higher on 1d20. If the caster is of higher level than the creator of the effect to be dispelled, the difference is *subtracted* from this base number needed. If the caster is of lower level, the difference is *added* to the base. A die roll of 20 always succeeds and a die roll of 1 always fails. Thus, if a caster is 10 levels higher than the magic he is trying to dispel, only a roll of 1 prevents the effect from being dispelled.\n&emsp;A *dispel magic* can affect only a specially enchanted item (such as a magical scroll, ring, wand, rod, staff, miscellaneous item, weapon, shield, or armor) if it is cast directly upon the item. This renders the item nonoperational for 1d4 rounds. An item possessed or carried by a creature has the creature’s saving throw against this effect; otherwise, it is automatically rendered nonoperational. An interdimensional interface (such as a *bag of holding*) rendered nonoperational is temporarily closed. Note that an item’s physical properties are unchanged: A nonoperational magical sword is still a sword.  Artifacts and relics are not subject to this spell, but some of their spell-like effects may be, at the DM’s option. Note that this spell, if successful, will release charmed and similarly beguiled creatures. Certain spells or effects cannot be dispelled; these are listed in the spell descriptions.}}{{style=bottom3}}{{cs1-1=3}}{{cc1-1=center}}{{c1-1=**Summary of Dispel Magic Effects**}}{{c2-1=**Source of Effect**}}{{c3-1=Caster}}{{c4-1=Other caster/}}{{c5-1=&emsp;innate ability}}{{c6-1=Wand}}{{c7-1=Staff}}{{c8-1=Potion}}{{c9-1=Other magic}}{{c10-1=Artifact}}{{cc2-2=bottom}}{{c2-2=**Resists As**}}{{c3-2=None}}{{c4-2=Leve/HD of}}{{c5-2=&emsp;other caster}}{{c6-2=6th level}}{{c7-2=8th level}}{{c8-2=12th level}}{{c9-2=12th, unless special}}{{c10-2=DM discretion}}{{c2-3=**Result of Dispel**}}{{c3-3=Dispel automatic}}{{c5-3=Effect negated}}{{c6-3=&#42;}}{{c7-3=&#42}}{{c8-3=Potion destroyed}}{{c9-3=&#42}}{{c10-3=DM discretion}}{{effects2=&#42 Effect negated; if cast directly on item, item becomes nonoperational for 1d4 rounds.',
};

pri3['Feign Death'] = {
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
    'level': 'Level 3 Priest',
    'school': 'Enchantment',
    'sphere': 'Protection',
    'range': '0',
    'duration': '[[5*[[@{level-priest}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The vestment to be enchanted and the priest’s holy symbol, which are not expended',
    'reference': 'PHB p. 269',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enchants the caster’s vestment, providing protection at least the equivalent of chain mail (AC 5). The vestment gains a +1 enchantment for each three levels of the priest beyond 5th level, to a maximum of AC 1 at 17th level. (Currently +[[{[[floor(([[@{level-priest}]]-5)/3)]],4}kl1]] enchantment for a total of [[5-[[{[[floor(([[@{level-priest}]]-5)/3)]],4}kl1]] ]] AC). The magic lasts for five rounds per level of the caster, or until the caster loses consciousness. If the vest-ment is worn with other armors, only the best AC (either the armor or the vestment) is used; this protection is not cumulative with any other AC protection.'
};

pri3['Meld Into Stone'] = {
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
    'effect': 'Upon casting a *speak with dead* spell, the priest is able to ask several questions of a dead creature in a set period of time and receive answers according to the knowledge of that creature. Of course, the priest must be able to converse in the language that the dead creature once used. The length of time the creature has been dead is a factor, since only higher level priests can converse with a long-dead creature. The number of questions that can be answered and the length of time in which the questions can be asked depend on the level of experience of the priest. Even if the casting is successful, such creatures are as evasive as possible when questioned. The dead tend to give extremely brief and limited answers, often cryptic, and to take questions literally. Furthermore, their knowledge is often limited to what they knew in life.\n&emsp;A dead creature of different alignment or of higher level or Hit Dice than the caster’s level receives a saving throw vs. spell. A dead creature that successfully saves can refuse to answer questions, ending the spell. At the DM’s option, the casting of this spell on a given creature might be restricted to once per week.\n&emsp;The priest needs a holy symbol and burning incense in order to cast this spell upon the body, remains, or a portion thereof. The remains are not expended. This spell does not function under water.}}{{style=center sheet-spell-bottom}}{{c1-1=**Caster’s Level**\n**of Experience**}}{{c2-1=1–6}}{{c3-1=7–8}}{{c4-1=9–12}}{{c5-1=13–15}}{{c6-1=16–20}}{{c7-1=21+}}{{c1-2=**Max. Length**\n**of Time Dead**}}{{c2-2=1 week}}{{c3-2=1 month}}{{c4-2=1 year}}{{c5-2=10 years}}{{c6-2=100 years}}{{c7-2=1,000 years}}{{c1-3=**Time**\n**Questioned**}}{{c2-3=1 round}}{{c3-3=3 rounds}}{{c4-3=1 turn}}{{c5-3=2 turns}}{{c6-3=3 turns}}{{c7-3=1 hour}}{{c1-4=**No. of**\n**Questions**}}{{c2-4=2}}{{c3-4=3}}{{c4-4=4}}{{c5-4=5}}{{c6-4=6}}{{c7-4=7'
};

pri3['Spike Growth'] = {
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
    'level': 'Level 3 Priest',
    'school': 'Conjuration/Summoning',
    'sphere': 'Animal',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol, a flower petal, and a bit of mud or wet clay',
    'reference': 'PHB p. 272',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *summon insects* spell attracts a cloud or swarm of normal insects to attack the foes of the caster. Flying insects appear 70% of the time, while crawling insects appear 30% of the time. The exact insects called are bees, biting flies, hornets, or wasps, if flying insects are indicated; biting ants or pinching beetles, if crawling insects are indicated. A cloud of the flying type, or a swarm of the crawling sort, appears after the spell is cast. This gathers at a point chosen by the caster, within the spell’s range, and attacks any single creature the caster points to.\n&emsp;The attacked creature sustains 2 points of damage if it does nothing but attempt to flee or fend off the insects during the time it is attacked; it suffers 4 points of damage per round otherwise. If the insects are ignored, the victim fights with a –2 penalty to his attack roll and a +2 penalty to his Armor Class. If he attempts to cast a spell, an initiative roll should be made for the insects to see if their damage occurs before the spell is cast. If it does, the victim’s concentration is ruined and the spell is lost.\n&emsp;The insects disperse and the spell ends if the victim enters thick smoke or hot flames. Besides being driven off by smoke or hot flames, the swarm might possibly be outrun, or evaded by plunging into a sufficient body of water. If evaded, the summoned insects can be sent against another opponent, but there will be at least a 1 round delay while they leave the former opponent and attack the new victim. Crawling insects can travel only about 10 feet per round (maximum speed over smooth ground) and flying insects travel 60 feet per round. The caster must concentrate to maintain the swarm; it dissipates if he moves or is disturbed.\n&emsp;It is possible, in underground situations, that the caster might summon 1d4 giant ants by means of the spell, but the possibility is only 30% unless giant ants are nearby. This spell does not function under water.'
};

pri3['Tree'] = {
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

const pri4 = {};
pri4['Abjure'] = {
    'level': 'Level 4 Priest',
    'school': 'Abjuration',
    'sphere': 'Summoning',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'The priest’s holy symbol, holy water, and some material inimical to the creature',
    'reference': 'PHB p. 273',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can send an extraplanar creature back to its own plane of existence. The spell fails against entities of demigod status or greater, but their servants or minions can be abjured. If the creature has a specific (proper) name, it must be known and used. Any magic resistance of the subject must be overcome, or the spell fails. The priest has a 50% chance of success (a roll of 11 or better on 1d20). The roll is adjusted by the difference in level or Hit Dice between the caster and the creature being abjured; the number needed is decreased if the priest has more Hit Dice and increased if the creature has more Hit Dice. If the spell is successful, the creature is instantly hurled back to its own plane. The affected creature must survive a system shock check. If the creature does not have a Constitution score, the required roll is 70% + 2%/Hit Die or level. The caster has no control over where in the creature’s plane the abjured creature arrives. If the attempt fails, the priest must gain another level before another attempt can be made on that particular creature.'
};

pri4['Animal Summoning I'] = {
    'level': 'Level 4 Priest',
    'school': 'Conjuration, Summoning',
    'sphere': 'Animal, Summoning',
    'range': '1 mile radius',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 274',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster calls up to eight animals that have 4 Hit Dice or less, of whatever sort the caster names when the summoning is made. Only animals within range of the caster at the time the spell is cast will come. The caster can try three times to summon three different types of animals. For example, a caster first tries to summon wild dogs to no avail, then unsuccessfully tries to call hawks, and finally calls wild horses that may or may not be within summoning range. The DM must determine the chance of a summoned animal type being within the range of the spell. The animals summoned aid the caster by whatever means they possess, staying until a fight is over, a specific mission is finished, the caster is safe, he sends them away, etc. Only normal or giant animals can be summoned; fantastic animals or monsters cannot be summoned by this spell (no chimerae, dragons, gorgons, manticores, etc.).'
};

pri4['Call Woodland Beings'] = {
    'level': 'Level 4 Priest',
    'school': 'Conjuration/Summoning',
    'sphere': 'Summoning',
    'range': '[[100*[[@{level-priest}]] ]] yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'Negate',
    'materials': 'A pine cone and eight holly berries',
    'reference': 'PHB p. 274',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to summon certain woodland creatures to his location. Naturally, this spell works only outdoors, but not necessarily only in wooded areas. The caster begins the incantation and continues uninterrupted until some called creature appears or two turns have elapsed. (The verbalization and somatic gesturing are easy, so this is not particularly exhausting to the spellcaster.) Only one type of the following sorts of beings can be summoned by the spell. They come only if they are within the range of the call.\n&emsp;The caster can call three times, for a different type each time. Once a call is successful, no other type can be called without another casting of the spell. (The DM will consult his outdoor map or base the probability of any such creature being within spell range upon the nature of the area the caster is in at the time of spellcasting.)\n&emsp;The creature(s) called by the spell are entitled to a saving throw vs. spell (with a –4 penalty) to avoid the summons. Any woodland beings answering the call are favorably disposed to the spellcaster and give whatever aid they are capable of. However, if the caller or members of the caller’s party are of evil alignment, the creatures are entitled to another saving throw vs. spell (this time with a +4 bonus) when they come within 10 yards of the caster or another evil character with him. These beings immediately seek to escape if their saving throws are successful. In any event, if the caster requests that the summoned creatures engage in combat on his behalf, they are required to roll a loyalty reaction check based on the caster’s Charisma and whatever dealings he has had with them.\n&emsp;This spell works with respect to neutral or good woodland creatures, as determined by the DM. Thus, the DM can freely add to or alter the list as he sees fit.\n&emsp;If the caster personally knows a certain individual woodland being, that being can be summoned at double the normal range. If this is done, no other woodland creatures are affected.\n&emsp;If a percentage chance is given in the accompanying table, druids and other nature-based priests add [[@{level-priest}]]%. These chances can be used if no other campaign information on the area is available.}}{{style=center2 sheet-spell-center3 sheet-spell-center4 sheet-spell-bottom2 sheet-spell-bottom3 sheet-spell-bottom4}}{{rs1-1=2}}{{c1-1=**Creature**\n**Type Called**}}{{c3-1=2d8 brownies}}{{c4-1=1d4 centaurs}}{{c5-1=1d4 dryads}}{{c6-1=1d8 pixies}}{{c7-1=1d4 satyrs}}{{c8-1=1d6 sprites}}{{c9-1=1 treant}}{{c10-1=1 unicorn}}{{cs1-2=3}}{{c1-2=**————Type of Woodlands————**}}{{cc2-2=center sheet-spell-bottom}}{{c2-2=**Light**}}{{c3-2=30%}}{{c4-2=5%}}{{c5-2=1%}}{{c6-2=10%}}{{c7-2=1%}}{{c8-2=0%}}{{c9-2=—}}{{c10-2=—}}{{c2-3=**Moderate/Sylvan**}}{{c3-3=20%}}{{c4-3=30%}}{{c5-3=25%}}{{c6-3=20%}}{{c7-3=30%}}{{c8-3=5%}}{{c9-3=5%}}{{c10-3=15%}}{{c2-4=**Dense/Virgin**}}{{c3-4=10%}}{{c4-4=5%}}{{c5-4=15%}}{{c6-4=10%}}{{c7-4=10%}}{{c8-4=25%}}{{c9-4=25%}}{{c10-4=20%'
};

pri4['Cloak of Bravery'] = {
    'level': 'Level 4 Priest',
    'school': 'Conjuration/Summoning (Reversible)',
    'sphere': 'Charm',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Negate',
    'materials': '*Cloak of bravery:* The feather of an eagle or hawk\n*Cloak of Fear:* The tail feathers of a vulture or chicken',
    'reference': 'PHB p. 274',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *cloak of bravery* spell can be cast upon any willing creature. The protected individual gains a bonus to his saving throw against any form of fear encountered (but not awe—an ability of some lesser and greater powers). When cast, the spell can affect one to four creatures (caster’s choice). If only one is affected, the saving throw bonus is +4. If two are affected, the bonus is +3, and so forth, until four creatures are protected by a +1 bonus. The magic of the *cloak of bravery* spell works only once and then the spell ends, whether or not the creature’s saving throw is successful. The spell ends after eight hours if no saving throw is required before then.\n&emsp;The reverse of this spell, *cloak of fear,* empowers a single creature touched to radiate a personal aura of fear, at will, out to a 3-foot radius. All other characters and creatures within this aura must roll successful saving throws vs. spell or run away in panic for [[2d8]] rounds. Affected individuals may or may not drop items, at the DM’s option.\n&emsp;The spell has no effect upon undead of any sort. The effect can be used only once, and the spell expires after eight hours if not brought down sooner. Members of the recipient’s party are not immune to the effects of the spell.'
};

pri4['Control Temperature, 10\' Radius'] = {
    'level': 'Level 4 Priest',
    'school': 'Alteration',
    'sphere': 'Weather',
    'range': '0',
    'duration': '[[4+[[@{level-priest}]] ]] turns',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A strip of willow bark (to lower temperatures) or raspberry leaves (to raise temperatures)',
    'reference': 'PHB p. 275',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the temperature surrounding the caster can be altered by up to [[10*[[@{level-priest}]] ]]° F. ([[5.6*[[@{level-priest}]] ]]° C), either upward or downward. Thus, a 10th-level caster could raise or lower the surrounding temperature from 1 to 100 degrees F (1 to 55.6 degrees C). The spell can be used to ensure the comfort of the caster and those with him in extreme weather conditions. The party could stand about in shirt sleeves during the worst blizzard (although it would be raining on them) or make ice for their drinks during a scorching heat wave.\n&emsp;The spell also provides protection from intense normal and magical attacks. If the extreme of temperature is beyond what could be affected by the spell (a searing blast of a fireball or the icy chill of a white dragon), the spell reduces the damage caused by 5 points for every level of the caster. Currently [[5*[[@{level-priest}]] ]] points. Normal saving throws are still allowed, and the reduction is taken after the saving throw is made or failed. Once struck by such an attack, the spell immediately collapses.'
};

pri4['Cure Serious Wounds'] = {
    'level': 'Level 4 Priest',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Healing',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 275',
    'damage': '',
    'damage-type': '',
    'healing': '[[2d8+1]]',
    'effect': 'This spell is a more potent version of the *cure light wounds* spell. When laying his hand upon a creature, the priest heals 2d8+1 points of wound or other injury damage to the creature’s body. This healing cannot affect noncorporeal, nonliving, or extraplanar creatures.\n&emsp;*Cause serious wounds,* the reverse of the spell, operates similarly to the *cause light wounds* spell, the victim having to be touched first. If the touch is successful, 2d8+1 points of damage are inflicted.'
};

pri4['Detect Lie'] = {
    'level': 'Level 4 Priest',
    'school': 'Divination (Reversible)',
    'sphere': 'Divination',
    'range': '30 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'Negate',
    'materials': '*Detect lie*: One gp worth of gold dust.\n*Undetectable lie*: Brass dust',
    'reference': 'PHB p. 275',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A priest who casts this spell is immediately able to determine if the subject creature deliberately and knowingly speaks a lie. It does not reveal the truth, uncover unintentional inaccuracies, or necessarily reveal evasions. The subject receives a saving throw vs. spell, which is adjusted only by the Wisdom of the *caster* ([[@{wisdef}]])—for example, if the caster has a Wisdom of 18, the subject’s saving throw roll is reduced by 4 (see Table 5: Wisdom). The spell’s reverse, *undetectable lie,* prevents the magical detection of lies spoken by the creature for 24 hours.'
};

pri4['Divination'] = {
    'level': 'Level 4 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A sacrificial offering, incense, and the holy symbol of the priest. If an unusually important *divination* is attempted, sacrifice of particularly valuable gems, jewelry, or magical items may be required',
    'reference': 'PHB p. 275',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *divination* spell is used to garner a useful piece of advice concerning a specific goal, event, or activity that will occur within a one-week period. This can be as simple as a short phrase, or it might take the form of a cryptic rhyme or omen. Unlike the *augury* spell, this gives a specific piece of advice.\n&emsp;For example, if the question is “Will we do well if we venture to the third level?” and a terrible troll guarding 10,000 gp and a *shield +1* lurks near the entrance to the level (the DM estimates the party could beat the troll after a hard fight), the divination response might be: “Ready oil and open flame light your way to wealth.” In all cases, the DM controls what information is received and whether additional divinations will supply additional information. Note that if the information is not acted upon, the conditions probably change so that the information is no longer useful (in the example, the troll might move away and take the treasure with it).\n&emsp;The base chance for a correct divination is 60%, plus 1% for each experience level of the priest casting the spell. Currently [[60+[[@{level-priest}]] ]]%. The DM makes adjustments to this base chance considering the actions being divined (if, for example, unusual precautions against the spell have been taken). If the dice roll is failed, the caster knows the spell failed, unless specific magic yielding false information is at work.'
};

pri4['Free Action'] = {
    'level': 'Level 4 Priest',
    'school': 'Abjuration, Enchantment',
    'sphere': 'Charm',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A leather thong, bound around the arm or similar appendage, which disintegrates when the spell expires',
    'reference': 'PHB p. 275',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the creature touched to move and attack normally for the duration of the spell, even under the influence of magic that impedes movement (such as *web* or *slow* spells) or while under water. It even negates or prevents the effects of paralysis and *hold* spells. Under water, the individual moves at normal (surface) speed and inflicts full damage, even with such cutting weapons as axes and swords and with such smashing weapons as flails, hammers, and maces, provided that the weapon is wielded in the hand rather than hurled. The *free action* spell does not, however, allow *water breathing* without further appropriate magic.'
};

pri4['Giant Insect'] = {
    'level': 'Level 4 Priest',
    'school': 'Alteration (Reversible)',
    'sphere': 'Animal',
    'range': '20 yards',
    'duration': 'Permanent',
    'aoe': '1 to 6 insects',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol',
    'reference': 'PHB p. 276',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the priest can turn one or more normal-sized insects into larger forms resembling the giant insects described in the *Monstrous Manual.* Only one type of insect can be altered at one time (i.e., a single casting cannot affect both an ant and a fly) and all insects affected must be grown to the same size. The number of insects and the size to which they can be grown depends upon the priest’s level:}}{{style=center}}{{c1-1=**Priest’s**\n**Level**}}{{c2-1=7–9}}{{c3-1=10–12}}{{c4-1=13+}}{{c1-2=**Insect**\n**Hit Dice**}}{{c2-2=3}}{{c3-2=4}}{{c4-2=6}}{{c1-3=**Maximum**\n**Total HD**}}{{c2-3=9}}{{c3-3=12}}{{c4-3=15}}{{effects2=For example, an 8th-level priest can grow three insects to 3 Hit Dice, four insects to 2 Hit Dice, or nine insects to 1 Hit Die. Flying insects of 3 Hit Dice or more can carry a rider of human size (assume that such can carry 80 pounds per Hit Die).\n&emsp;If the casting is interrupted for any reason, or if the insects are currently subject to any other magical effect (including this one), the insects die and the spell is ruined. The DM decides how many normal insects of what type are available; this is often a greater limitation on the spell than the limits above.\n&emsp;If the insect created by this spell matches an existing monster description, use the monster description. Otherwise, unless the DM creates a special description, the giant form has an Armor Class of between 8 and 4, one attack, and inflicts 1d4 points of damage per Hit Die.\n&emsp;For example, a 14th-level priest uses the giant insect spell to enlarge one beetle (all that is available) to 6 HD size. The DM decides the beetle has AC 5 and bites for 6d4 points of damage.\n&emsp;Note that the spell works only on actual insects. Arachnids, crustaceans, and other types of small creatures are not affected. Any giant insects created by this spell do not attempt to harm the priest, but the priest’s control of such creatures is limited to simple commands (“attack,” “defend,” “guard,” and so forth). Orders to attack a certain creature when it appears or guard against a particular occurrence are too complex. Unless commanded to do otherwise, the giant insects attempt to attack whoever or whatever is near them.\n&emsp;The reverse of the spell, *shrink insect,* reduces any giant insect to normal insect size. The number of Hit Dice affected by the priest is subtracted from the number of Hit Dice of the insects, and any insect reduced to 0 Hit Dice has been shrunk. Partial shrinking is ignored; an insect is either shrunk or unaffected. Thus, a 9th-level priest attacked by giant ants could shrink three warrior ants or four worker ants to normal insect size with no saving throw. This spell has no effect on intelligent insectlike creatures.'
};

pri4['Hallucinatory Forest'] = {
    'level': 'Level 4 Priest',
    'school': 'Illusion/Phantasm (Reversible)',
    'sphere': 'Plant',
    'range': '80 yards',
    'duration': 'Permanent',
    'aoe': '[[40*[[@{level-priest}]] ]]-foot square',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 276',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, a hallucinatory forest comes into existence. The illusionary forest appears to be perfectly natural and is indistinguishable from a real forest. Priests attuned to the woodlands—as well as such creatures as centaurs, dryads, green dragons, nymphs, satyrs, and treants—recognize the forest for what it is. All other creatures believe it is there, and movement and order of march are affected accordingly. Touching the illusory growth neither affects the magic nor reveals its nature. The hallucinatory forest remains until it is magically dispelled by a reverse of the spell or a *dispel magic* spell. The area shape is either roughly rectangular or square, in general, and at least 40 feet deep, in whatever location the caster desires. The forest can be of less than maximum area if the caster wishes. One of its edges can appear up to 80 yards away from the caster.'
};

pri4['Hold Plant'] = {
    'level': 'Level 4 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Plant',
    'range': '80 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '[[1d4]] plants in 40-foot square',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 276',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *hold plant* spell affects vegetable matter as follows: 1) it causes ambulatory vegetation to cease moving; 2) it prevents vegetable matter from entwining, grasping, closing, or growing; 3) it prevents vegetable matter from making any sound or movement that is not caused by wind. The spell effects apply to all forms of vegetation, including parasitic and fungoid types, and those magically animated or otherwise magically empowered. It affects such monsters as green slime, molds of any sort, shambling mounds, shriekers, treants, etc. The duration of a *hold plant* spell is one round per level of experience of the caster. It affects 1d4 plants in a 40-foot × 40-foot area, or a square 4 to 16 yards on a side of small ground growth such as grass or mold. If only one plant (or 4 yards square) is chosen as the target for the spell by the caster, the saving throw of the plant (or area of plant growth) is made with a –4 penalty to the die roll; if two plants (or 8 yards square) are the target, saving throws suffer a –2 penalty; if three plants (or 12 yards square) are the target, saving throws suffer a –1 penalty; and if the maximum of four plants (or 16 yards square) are the target, saving throws are unmodified.'
};

pri4['Imbue With Spell Ability'] = {
    'level': 'Level 4 Priest',
    'school': 'Enchantment',
    'sphere': 'Charm',
    'range': 'Touch',
    'duration': 'Until used',
    'aoe': 'Person touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol, plus some minor item from the recipient that is symbolic of his profession (a lockpick for a thief, etc.)',
    'reference': 'PHB p. 277',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By the use of this spell, the priest can transfer a limited number and selection of his currently memorized spells, and the ability to cast them, to another person. Only nonspellcasters (including rangers under 8th level and paladins under 9th level) can receive this bestowal; the *imbue with spell ability* enchantment does not function for those belonging to spellcasting classes, for unintelligent monsters, nor for any individual with less than 1 full Hit Die. In addition, the person thus imbued must have a Wisdom score of 9 or higher. Only priest spells of an informational or defensive nature or a *cure light wounds* spell can be transferred. Transferring any other spell type negates the entire attempt, including any allowable spells that were chosen. Higher level persons can receive more than one spell at the priest’s option:}}{{style=center1 sheet-spell-bottom2}}{{c1-1=**Level of Recipient**}}{{c2-1=1}}{{c3-1=3}}{{c4-1=5+}}{{c1-2=**Spells Imbued**}}{{c2-2=One 1st-level spell}}{{c3-2=Two 1st-level spells}}{{c4-2=Two 1st- and one 2nd-level spells}}{{effects2=The transferred spell’s variable characteristics (range, duration, area of effect, etc.) function according to the level of the priest originally imbuing the spell.\n&emsp;A priest who casts *imbue with spell ability* upon another character loses the number of 1st- and 2nd-level spells he has imbued until the recipient uses the transferred spells or is slain. For example, a 7th-level priest with five 1st- and four 2nd-level spells imbues a 10th-level fighter with a *cure light wounds* spell and a *slow poison* spell. The cleric now can have only four 1st-level spells memorized until the cure is cast and only three 2nd-level spells until the *slow poison* is cast, or until the fighter is killed. In the meantime, the priest remains responsible to his ethos for the use to which the spell is put.\n&emsp;This item, and any material component for the imbued spell, is consumed when the *imbue with spell ability* spell is cast.'
};

pri4['Lower Water'] = {
    'level': 'Level 4 Priest',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Water)',
    'range': '120 yards',
    'duration': '[[@{level-priest}]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s holy (or unholy) symbol and a pinch of dust',
    'reference': 'PHB p. 277',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *lower water* spell causes water or similar fluid in the area of effect to sink away to a minimum depth of 1 inch. The depth can be lowered by up to 2 feet for every experience level of the priest. Currently [[2*[[@{level-priest}]] ]] feet. The water is lowered within a square area whose sides are 10 feet long per caster level. Currently [[10*[[@{level-priest}]] ]]. Thus, an 8th-level priest affects a volume up to 16 feet × 80 feet × 80 feet, a 9th-level caster affects a volume up to 18 feet × 90 feet × 90 feet, and so on. In extremely large and deep bodies of water, such as deep ocean, the spell creates a whirlpool that sweeps ships and similar craft downward, putting them at risk and rendering them unable to leave by normal movement for the duration of the spell. When cast on water elementals and other water-based creatures, this spell acts as a *slow* spell: The creature moves at half speed and makes half its usual number of attacks each round. The spell has no effect on other creatures.\n&emsp;Its reverse, *raise water,* causes water or similar fluids to return to their highest natural level: spring flood, high tide, etc. This can make fords impassable, float grounded ships, and may even sweep away bridges at the DM’s option. It negates *lower water* and vice versa.'
};

pri4['Neutralize Poison'] = {
    'level': 'Level 4 Priest',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Healing',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature or [[floor([[@{level-priest}]]/2)]] cubic feet of substance',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 277',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *neutralize poison* spell, the priest detoxifies any sort of venom in the creature or substance touched. Note that an opponent, such as a poisonous reptile or snake (or even an envenomed weapon of an opponent) unwilling to be so touched requires the priest to roll a successful attack in combat. This spell can prevent death in a poisoned creature if cast before death occurs. The effects of the spell are permanent only with respect to poison existing in the touched creature at the time of the touch; thus, creatures (and objects) that generate new poison are not permanently detoxified.\n&emsp;The reversed spell, *poison,* likewise requires a successful attack roll, and the victim is allowed a saving throw vs. poison. If the latter is unsuccessful, the victim is incapacitated and dies in one turn unless the poison is magically neutralized or slowed.'
};

pri4['Plant Door'] = {
    'level': 'Level 4 Priest',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A piece of charcoal and the caster’s holy symbol',
    'reference': 'PHB p. 277',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *plant door* spell opens a magical portal or passageway through trees, undergrowth, thickets, or any similar growth—even growth of a magical nature. The plant door is open to the caster who cast the spell, casters of a higher level, or dryads; others must be shown the location of the door. The door even enables the caster to enter a solid tree trunk and remain hidden there until the spell ends. The spell also enables the passage or hiding of any man-sized or smaller creature; hiding is subject to space considerations. If the tree is cut down or burned, those within must leave before the tree falls or is consumed, or else they are killed also. The duration of the spell is [[@{level-priest}]] turns. If the caster opts to stay within an oak, the spell lasts nine times longer than normal; if within an ash tree, it lasts three times longer. The path created by the spell is up to 4 feet wide, 8 feet high, and 12 feet long per level of experience of the caster. This spell does not function on plant-based monsters (shambling mounds, molds, slimes, treants, etc.).'
};

pri4['Produce Fire'] = {
    'level': 'Level 4 Priest',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Fire)',
    'range': '40 yards',
    'duration': '1 round',
    'aoe': '12-foot square',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A paste of sulfur and wax, formed into a ball and thrown at the target',
    'reference': 'PHB p. 278',
    'damage': '[[1d4+[[@{level-priest}]] ]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'By means of this spell, the caster creates a common fire of up to 12 feet per side in area. Though it lasts only a single round (unless it ignites additional flammable material), the fire produced by the spell inflicts 1d4 points of damage plus 1 point per caster level (1d4 + 1/level) upon creatures within its area. It ignites combustible materials, such as cloth, oil, paper, parchment, wood, and the like, so as to cause continued burning.\n&emsp;The reverse, *quench fire,* extinguishes any normal fire (coals, oil, tallow, wax, wood, etc.) within the area of effect.'
};

pri4['Protection From Evil, 10\' Radius'] = {
    'level': 'Level 4 Priest',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'Holy (or unholy) water and incense (or smoldering dung)',
    'reference': 'PHB p. 278',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The globe of protection of this spell is identical in all respects to that of a *protection from evil* spell, except that it encompasses a much larger area and its duration is greater. The effect is centered on and moves with the creature touched. Any protected creature within the circle will break the warding against enchanted/summoned monsters if he attacks those monsters. A creature unable to fit completely into the area of effect (for example, a 21-foot-tall titan) remains partially exposed and subject to whatever penalties the DM decides. If such a creature is the recipient of the spell, the spell acts as a normal *protection from evil* spell for that creature only.\n&emsp;The reverse, *protection from good, 10’ radius,* wards against good creatures.\n&emsp;To complete this spell, the priest must trace a circle 20 feet in diameter using holy (or unholy) water and incense (or smoldering dung), according to the *protection from evil* spell.'
};

pri4['Protection From Lightning'] = {
    'level': 'Level 4 Priest',
    'school': 'Abjuration',
    'sphere': 'Protection, Weather',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol',
    'reference': 'PHB p. 278',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The effect of a *protection from lightning* spell changes depending on who is the recipient of the magic—the caster or some other creature. In either case, the spell lasts no longer than [[@{level-priest}]] turns.\n&emsp;If the spell is cast upon the caster, it confers complete invulnerability to electrical attack such as dragon breath, or magical lightning such as *lightning bolt, shocking grasp,* storm giant, will ‘o wisp, etc., until the spell has absorbed [[10*[[@{level-priest}]] ]] points of electrical damage, at which time the spell is negated.\n&emsp;If the spell is cast upon another creature, it gives a bonus of +4 to the die roll for saving throws made vs. electrical attacks, and it reduces the damage sustained from such attacks by 50%.'
};

pri4['Reflecting Pool'] = {
    'level': 'Level 4 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '10 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '2 hrs.',
    'saving-throw': 'None',
    'materials': 'The oil extracted from such nuts as the hickory and the walnut, refined, and dropped in three measures upon the surface of the pool. (A measure need be no more than a single ounce of oil.)',
    'reference': 'PHB p. 278',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to cause a pool of normal water found in a natural setting to act as a scrying device. The pool can be of no greater diameter than 2 feet per level of the caster. Currently [[2*[[@{level-priest}]] ]] feet diameter. The effect is to create a scrying device similar to a *crystal ball.* The scrying can extend only to the Ethereal Plane and the Inner Planes (which includes the paraelemental planes, the Demiplane of Shadow, etc.). General notes on scrying, detection by the subject, and penalties for attempting to scry beyond the caster’s own plane are given in the *DMG,* as well as a description of the *crystal ball* item.\n&emsp;The following spells can be cast through a reflecting pool, with a 5% per level chance for operating correctly. Currently [[5*[[@{level-priest}]] ]]% chance: *detect magic, detect snares and pits,* and *detect poison.* Each additional detection attempt requires a round of concentration, regardless of success. Infravision, if available, operates normally through the reflecting pool.\n&emsp; The image is nearly always hazy enough to prevent the reading of script of any type.\n&emsp;At the DM’s option, the casting of this spell may be limited to once per day.'
};

pri4['Repel Insects'] = {
    'level': 'Level 4 Priest',
    'school': 'Abjuration, Alteration',
    'sphere': 'Animal, Protection',
    'range': '0',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Any one of the following: several crushed marigold flowers, a whole crushed leek, seven crushed stinging nettle leaves, or a small lump of resin from a camphor tree',
    'reference': 'PHB p. 279',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the priest creates an invisible barrier to all sorts of insects, and normal insects do not approach within 10 feet of the caster while the spell is in effect. Giant insects with Hit Dice less than 1⁄3 of the caster’s experience level are also repelled. Currently [[ceil([[@{level-priest}]]/3)-1]] Hit Dice and below are repelled. (for example, 2 Hit Dice for 7th- to 9th-level casters, 3 Hit Dice at 10th through 12th level, etc.). Insects with more Hit Dice can enter the protected area if the insect is especially aggressive and, in addition, rolls a successful saving throw vs. spell. Those that do sustain 1d6 points of damage from passing through the magical barrier. Note that the spell does not in any way affect arachnids, myriapods, and similar creatures—it affects only true insects.'
};

pri4['Speak With Plants'] = {
    'level': 'Level 4 Priest',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': '0',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '30-foot radius',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A drop of water, a pinch of dung, and a flame',
    'reference': 'PHB p. 279',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast, a *speak with plants* spell enables the priest to converse, in very rudimentary terms, with all sorts of living vegetables (including fungi, molds, and plantlike monsters, such as shambling mounds) and to exercise limited control over normal plants (i.e., not monsters or plantlike creatures). Thus, the caster can question plants as to whether or not creatures have passed through them, cause thickets to part to enable easy passage, require vines to entangle pursuers, and command similar services. The spell does not enable plants to uproot themselves and move about, but any movements within the plants’ normal capabilities are possible. Creatures entangled by the 1st-level spell of that name can be released. The power of the spell lasts for [[@{level-priest}]] rounds. All vegetation within the area of effect is affected by the spell.'
};

pri4['Spell Immunity'] = {
    'level': 'Level 4 Priest',
    'school': 'Abjuration',
    'sphere': 'Protection',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The same as that for the spell to be protected against',
    'reference': 'PHB p. 279',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the priest renders a creature touched immune to the effects of a specified spell of 4th level or lower. It protects against spells, spell-like effects of magical items, and innate spell-like abilities of creatures. It does not protect against breath weapons or gaze attacks of any type.\n&emsp;The spell has several additional limitations. First, the caster must have directly experienced the effect of the specified spell. For example, if the caster has been attacked by a *fireball* spell at some time, he can use the *spell immunity* spell to provide protection from a fireball. Second, the spell cannot affect a creature already magically protected by a potion, protective spell, ring, or other device. Third, only a particular spell can be protected against, not a certain sphere of spells or a group of spells that are similar in effect; thus, a creature given immunity to the *lightning bolt* spell is still vulnerable to a *shocking grasp* spell.'
};

pri4['Sticks to Snakes'] = {
    'level': 'Level 4 Priest',
    'school': 'Alteration (Reversible)',
    'sphere': 'Plant',
    'range': '30 yards',
    'duration': '[[2*[[@{level-priest}]] rounds',
    'aoe': '[[1d4+[[@{level-priest}]] ]] sticks in a 10-foot cube',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A small piece of bark and several snake scales',
    'reference': 'PHB p. 280',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster can change 1d4 sticks, plus one stick per experience level, into snakes; thus, a 9th-level priest can change 10–13 sticks into an equal number of snakes. These snakes attack as commanded by the priest. There must, of course, be sticks or similar pieces of wood (such as torches, spears, etc.) to turn into snakes. Such a stick cannot be larger than a staff. Sticks held by creatures are allowed a saving throw equal to that of the possessor (i.e., a spear held by an orc must roll the orc’s saving throw vs. polymorph). Magical items, such as staves and enchanted spears, are not affected by the spell. Only sticks within the area of effect are changed.\n&emsp;The type of snake created varies, but a typical specimen has 2 Hit Dice, Armor Class 6, a movement rate of 9, and either constricts for 1d4+1 points of damage per round or bites for 1 point plus poison (if any). The chance of a snake thus changed being venomous is 5% per caster level, if the spellcaster desires. Currently [[5*[[@{level-priest}]] chance of being venomous. Thus, an 11th-level priest has a maximum 55% chance that any snake created by the spell is poisonous. The spell lasts for two rounds for each experience level of the spellcaster.\n&emsp;The reverse spell changes normal-sized snakes to sticks for the same duration, or it negates the *sticks to snakes* spell according to the level of the priest countering the spell (for example, a 10th-level priest casting the reverse spell can turn 11-14 snakes back into sticks).'
};

pri4['Tongues'] = {
    'level': 'Level 4 Priest',
    'school': 'Alteration (Reversible)',
    'sphere': 'Divination',
    'range': '0',
    'duration': '1 turn',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 280',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to speak and understand additional languages, whether they are racial tongues or regional dialects, but not communications of animals or mindless creatures. When the spell is cast, the spellcaster selects the language or languages to be understood. The spell then empowers the caster with the ability to speak and understand the language desired with perfect fluency and accent. The spell enables the priest to be understood by all speakers of that language within hearing distance, usually 60 feet. This spell does not predispose the subject toward the caster in any way. The priest can speak one additional tongue for every three levels of experience. Currently [[floor([[@{level-priest}]]/3)]] additional tongues.\n&emsp;The reverse of the spell cancels the effect of the *tongues* spell or confuses verbal communication of any sort within the area of effect.'
};

const pri5 = {};
pri5['Air Walk'] = {
    'level': 'Level 5 Priest',
    'school': 'Alteration',
    'sphere': 'Elemental (Air)',
    'range': 'Touch',
    'duration': '1 hour + [[@{level-priest}]] turns',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a bit of thistledown',
    'reference': 'PHB p. 280',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables a creature, which can be as big as the largest giant, to tread upon air as if it were walking on solid ground. Moving upward is similar to walking up a hill. A maximum upward angle of 45 degrees is possible at one-half the creature’s movement rate, as is a maximum downward angle of 45 degrees at the normal movement rate. An air-walking creature is in control of its movement, except when a strong wind is blowing. In this case, the creature gains or loses 10 feet of movement for every 10 miles per hour of wind velocity. The creature can, at the DM’s option, be subject to additional penalties in exceptionally strong or turbulent winds, such as loss of control of movement or suffering physical damage.\n&emsp;The spell can be placed upon a trained mount, so it can be ridden through the air. Of course, a mount not accustomed to such movement would certainly need careful and lengthy training, the details for which are up to the DM.'
};

pri5['Animal Growth'] = {
    'level': 'Level 5 Priest',
    'school': 'Alteration (Reversible)',
    'sphere': 'Animal',
    'range': '80 yards',
    'duration': '[[2*[[@{level-priest}}]] ]] rounds',
    'aoe': 'Up to 8 animals',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'The caster’s holy symbol and a scrap of food',
    'reference': 'PHB p. 280',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is released, the caster causes up to eight animals within a 20-foot-square area to grow to twice their normal size. The effects of this growth are doubled Hit Dice (with resultant improvement in attack potential), doubled hit points (except hit points added to Hit Dice), and doubled damage in combat. Movement and AC are not affected. The spell lasts for two rounds for each level of the caster. The spell is particularly useful in conjunction with a *charm person or mammal spell*.\n&emsp;The reverse reduces animal size by one-half, and likewise reduces Hit Dice, hit points, attack damage, etc.'
};

pri5['Animal Summoning II'] = {
    'level': 'Level 5 Priest',
    'school': 'Conjuration/Summoning',
    'sphere': 'Animal, Summoning',
    'range': '[[60*[[@{level-priest}]] ]] yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 281',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster calls up to six animals of 8 Hit Dice or less, or 12 animals of 4 Hit Dice or less—of whatever sort the caster names. Only animals within range of the caster at the time the spell is cast will come. The caster can try three times to summon three different types of animals. For example, suppose that wild dogs are first summoned to no avail, then hawks are unsuccessfully called, and finally the caster calls for wild horses. The DM determines the chance of a summoned animal type being within range of the spell. The animals summoned aid the caster by whatever means they possess, staying until a fight is over, a specific mission is finished, the caster is safe, he sends them away, etc. Only normal or giant animals can be summoned; fantastic animals or monsters cannot be effected by this spell (no chimerae, dragons, gorgons, manticores, etc.).'
};

pri5['Antiplant Shell'] = {
    'level': 'Level 5 Priest',
    'school': 'Abjuration',
    'sphere': 'Plant, Protection',
    'range': '0',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '15-foot diameter',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 281',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *anti-plant shell* spell creates an invisible, mobile barrier that keeps all creatures within the shell protected from attacking plants or vegetable creatures such as shambling mounds or treants. Any attempt to force the barrier against such creatures shatters the barrier immediately. The spell lasts for one turn for each experience level of the caster.'
};

pri5['Atonement'] = {
    'level': 'Level 5 Priest',
    'school': 'Abjuration',
    'sphere': 'All',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 person',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s religious symbol, prayer beads or wheel or book, and burning incense',
    'reference': 'PHB p. 281',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is used by the priest to remove the burden of unwilling or unknown deeds from the person who is the subject of the atonement. The spell removes the effects of magical alignment changes as well. The person seeking the *atonement* spell must either be truly repentant or not have been in command of his own will when the acts to be atoned for were committed. The DM will judge this spell in this regard, noting any past instances of its use upon the person. Deliberate misdeeds and acts of knowing and willful nature cannot be atoned for with this spell (see the *quest* spell). A character who refuses to accept an atonement is automatically considered to have committed a willful misdeed.'
};

pri5['Commune'] = {
    'level': 'Level 5 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The priest’s religious symbol, holy (unholy) water, and incense; and if a particularly potent commune is needed, a sacrifice proportionate with the difficulty of obtaining the information is required',
    'reference': 'PHB p. 281',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By use of a *commune* spell, the priest is able to contact his deity—or agents thereof—and request information in the form of questions that can be answered by a simple “yes” or “no.” The priest is allowed one such question for every experience level he has attained. Currently [[@{priest-level}]] questions. The answers given are correct within the limits of the entity’s knowledge. “I don’t know” is a legitimate answer, as powerful outer planar beings are not necessarily omniscient. Optionally, the DM may give a single short answer of five words or less. The spell will, at best, provide information to aid character decisions. Entities communed with structure their answers to further their own purposes. It is probable that the DM will limit the use of *commune* spells to one per adventure, one per week, or even one per month, for the greater powers dislike frequent interruptions. Likewise, if the caster lags, discusses the answers, or goes off to do anything else, the spell immediately ends.\n&emsp;If a sacrifice is required and the offering is insufficient, no information or only partial information is gained.'
};

pri5['Commune With Nature'] = {
    'level': 'Level 5 Priest',
    'school': 'Divination',
    'sphere': 'Divination, Elemental',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 281',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to become one with nature, thus being empowered with knowledge of the surrounding territory. For each level of experience of the caster, he can “know” one fact—ahead, left, or right, about the following subjects: the ground, plants, minerals, bodies of water, people, general animal population, presence of woodland creatures, etc. The presence of powerful unnatural creatures also can be detected, as can the general state of the natural setting. The spell is most effective in outdoor settings, operating in a radius of one-half mile for each level of the caster. Currently [[0.5*[[@{level-priest}]] ]] mile radius. In natural underground settings—caves, cavern, etc.—the range is limited to 10 yards per caster level. Currently [[10*[[@{level-priest}]] ]] yard radius. In constructed settings (dungeons and towns), the spell will not function. The DM may limit the casting of this spell to once per month.'
};

pri5['Control Winds'] = {
    'level': 'Level 5 Priest',
    'school': 'Alteration',
    'sphere': 'Weather',
    'range': '0',
    'duration': '[[@{level-priest}]] turns',
    'aoe': '[[40*[[@{level-priest}]] ]]-foot radius',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 282',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *control winds* spell, the caster is able to alter wind force in the area of effect. For every three levels of experience, the caster can increase or decrease wind forces by one level of strength. Currently [[floor([[@{level-priest}]]/3)]] wind levels of strength. Wind strengths are as follows:}}{{style=center2}}{{c1-1=**Wind Force**}}{{c2-1=Light Breeze}}{{c3-1=Moderate Breeze}}{{c4-1=Strong Breeze}}{{c5-1=Gale}}{{c6-1=Storm}}{{c7-1=Hurricane}}{{c1-2=**Miles Per Hour**}}{{c2-2=2–7}}{{c3-2=8–18}}{{c4-2=19–31}}{{c5-2=32–54}}{{c6-2=55–72}}{{c7-2=73–176}}{{effects2=&emsp;Winds in excess of 19 miles per hour drive small flying creatures—those eagle-sized and under—from the skies, severely affect missile accuracy, and make sailing difficult. Winds in excess of 32 miles per hour drive even man-sized flying creatures from the skies and cause minor ship damage. Winds in excess of 55 miles per hour drive all flying creatures from the skies, uproot small trees, knock down wooden structures, tear off roofs, and endanger ships. Winds in excess of 73 miles per hour are of hurricane force.\n&emsp;An “eye” of 40-foot radius, in which the wind is calm, exists around the caster. Note that while the spell can be used underground, if the spell is cast in an area smaller than the area of effect, the eye shrinks 1 foot for every foot of confinement. For example, if the area of effect is a 360-foot area, the eye shrinks by 10 feet to a 30-foot radius; a space under 320 feet in a radius would eliminate the eye and subject the spellcaster to the effects of the wind. Once the spell is cast, the wind force increases or decreases by 3 miles per hour per round until the maximum or minimum speed is attained. The caster, with one round of complete concentration, can stabilize the wind at its current strength, or set it to increase or decrease. However, the rate of the change cannot be altered. The spell remains in force for one turn for each level of experience of the caster. When the spell is exhausted, the force of the wind wanes or waxes at the same rate, until it reaches the level it was at before the spell took effect. Another caster can use a *control winds* spell to counter the effects of a like spell up to the limits of his own ability.'
};

pri5['Cure Critical Wounds'] = {
    'level': 'Level 5 Priest',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Healing',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 282',
    'damage': '',
    'damage-type': '',
    'healing': '[[3d8+3]]',
    'effect': 'The *cure critical wounds* spell is a very potent version of the *cure light wounds* spell. The priest lays his hand upon a creature and heals 3d8+3 points of damage from wounds or other damage. The spell does not affect creatures without corporeal bodies, those of extraplanar origin, or those not living.\n&emsp;The reversed spell, *cause critical wounds,* operates in the same fashion as other cause wounds spells, requiring a successful touch to inflict the 3d8+3 points of damage. Caused wounds heal via the same methods as do wounds of other sorts.'
};

pri5['Dispel Evil'] = {
    'level': 'Level 5 Priest',
    'school': 'Abjuration (Reversible)',
    'sphere': 'Protection, Summoning',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'Negate',
    'materials': 'The priest’s holy symbol and holy (or unholy) water',
    'reference': 'PHB p. 282',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The priest using this spell causes a summoned creature of evil nature, an evil creature from another plane, or a creature summoned by an evil caster, to return to its own plane or place when the caster successfully strikes it in melee combat. Examples of such creatures are aerial servants, djinn, efreet, elementals, and invisible stalkers. An evil enchantment (such as a *charm* spell cast by an evil creature) that is subject to a normal *dispel magic* spell can be automatically dispelled by the *dispel evil* spell. This spell lasts for a maximum of one round for each experience level of the caster, or until expended. While the spell is in effect, all creatures that could be affected by it fight with a -7 penalty to their attack rolls when engaging the spellcaster.\n&emsp;The reverse of the spell, *dispel good,* functions against summoned or enchanted creatures of good alignment or creatures that have been sent to aid the cause of good.'
};

pri5['Flame Strike'] = {
    'level': 'Level 5 Priest',
    'school': 'Evocation',
    'sphere': 'Combat',
    'range': '60 yards',
    'duration': 'Instantaneous',
    'aoe': '5 foot radius x 30 foot column',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': '½',
    'materials': 'A pinch of sulphur',
    'reference': 'PHB p. 282',
    'damage': '[[6d8]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'When the priest evokes a *flame strike* spell, a vertical column of fire roars downward in the location called for by the caster. Any creatures within the area of effect must roll a saving throw vs. spell. Failure means the creature sustains 6d8 points of damage; otherwise, the damage is halved.'
};

pri5['Insect Plague'] = {
    'level': 'Level 5 Priest',
    'school': 'Conjuration/Summoning',
    'sphere': 'Combat',
    'range': '120 yards',
    'duration': '[[2*[[@{level-priest}]] ]] rounds',
    'aoe': '180 foot × 60 foot cloud',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A few granules of sugar, some kernels of grain, and a smear of fat',
    'reference': 'PHB p. 282',
    'damage': '1 point per round',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast by the priest, a horde of creeping, hopping, and flying insects gather and swarm in a thick cloud. In an environment free of normal insects, the spell fails. The insects obscure vision, limiting it to 10 feet. Spellcasting within the cloud is impossible. Creatures in the insect plague, regardless of Armor Class, sustain 1 point of damage for each round they remain within, due to the bites and stings of the insects. Invisibility is no protection. All creatures with 2 or fewer Hit Dice will automatically move at their fastest possible speed in a random direction until they are more than 240 yards away from the insects. Creatures with fewer than 5 Hit Dice must check morale; failure means they run as described above.\n&emsp;Heavy smoke drives off insects within its bounds. Fire also drives insects away. For example, a wall of fire in a ring shape keeps a subsequently cast *insect plague* outside its confines, but a *fireball* spell simply clears insects from its blast area for one round. A single torch is ineffective against this vast horde of insects. Lightning, cold, or ice are likewise ineffective, while a strong wind that covers the entire plague area disperses the insects and ends the spell. The plague lasts two rounds for each level of the caster, and thereafter the insects disperse. The insects swarm in an area that centers around a summoning point determined by the spellcaster. The point can be up to 120 yards away from the priest. The insect plague does not move thereafter for as long as it lasts. Note that the spell can be countered by a *dispel magic* spell.'
};

pri5['Magic Font'] = {
    'level': 'Level 5 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 hour',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and the font and its trappings',
    'reference': 'PHB p. 283',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The spell causes a holy water font to serve as a scrying device. The spell does not function unless the priest is in good standing with his deity. The basin of holy water becomes similar to a *crystal ball.* For each vial of capacity of the basin, the priest may scry for one round, up to a maximum of one hour. Thus, the duration of the *magic font* spell is directly related to the size of the holy water receptacle. The DM will know the chances of a character being able to detect scrying.\n&emsp;The priest’s holy symbol and the font and its trappings are not consumed by the spell.'
};

pri5['Moonbeam'] = {
    'level': 'Level 5 Priest',
    'school': 'Evocation, Alteration',
    'sphere': 'Sun',
    'range': '[[60+(10*[[@{level-priest}]])]] yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '5 foot radius + special',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'Several seeds of any moonseed plant and a piece of opalescent feldspar (moonstone)',
    'reference': 'PHB p. 283',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster is able to cause a beam of soft, pale light to strike down from overhead and illuminate whatever area he is pointing at. The light is exactly the same as moonlight, so that colors other than shades of black, gray, or white are vague. The spellcaster can easily make the moonbeam move to any area that he can see and point to. This makes the spell an effective way to spotlight something, an opponent, for example. While the *moonbeam* spell does not eliminate all shadows, a creature centered in a moonbeam is most certainly visible. The reflected light from this spell enables dim visual perception 10 yards beyond the area of effect, but it does not shed a telltale glow that would negate surprise. The light does not adversely affect infravision. The caster can dim the beam to near darkness if desired. The beam has, in addition, all the properties of true moonlight and can induce a lycanthropic change (of a creature in the beam), unless the DM rules otherwise.'
};

pri5['Pass Plant'] = {
    'level': 'Level 5 Priest',
    'school': 'Alteration',
    'sphere': 'Plant',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'PHB p. 283',
    'reference': '',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By using this spell, the caster is able to enter a tree and move from inside it to inside another tree. The second tree must lie in approximately the direction desired by the spell user and must be within the range shown in the following table.}}{{style=center2}}{{c1-1=**Type of Tree**}}{{c2-1=Oak}}{{c3-1=Ash}}{{c4-1=Yew}}{{c5-1=Elm}}{{c6-1=Linden}}{{c7-1=deciduous}}{{c8-1=coniferous}}{{c9-1=other}}{{cc1-2=bottom}}{{c1-2=**Range of Area of Effect**}}{{c2-2=600 yards}}{{c3-2=540 yards}}{{c4-2=480 yards}}{{c5-2=420 yards}}{{c6-2=360 yards}}{{c7-2=300 yards}}{{c8-2=240 yards}}{{c9-2=180 yards}}{{effects2=The tree entered and that receiving the caster must be of the same type, must both be living, and of girth at least equal to that of the caster. Note that if the caster enters a tree, an ash, for example, and wishes to pass north as far as possible (540 yards), but the only appropriate ash in range is to the south, the caster will pass to the ash in the south. The *pass plant* spell functions so that the movement takes only one round. The caster can, at his option, remain within the receiving tree for a maximum of [[@{level-priest}]] rounds. Otherwise, he can step forth immediately. Should no like tree be in range, the caster simply remains within the first tree, does not pass elsewhere, and must step forth in the appropriate number of rounds. If the occupied tree is chopped down or burned, the caster is slain if he does not exit before the process is complete.'
};

pri5['Plane Shift'] = {
    'level': 'Level 5 Priest',
    'school': 'Alteration',
    'sphere': 'Astral',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature (special)',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'Negate',
    'materials': 'A small, forked metal rod (see below)',
    'reference': 'PHB p. 283',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the *plane shift* spell is cast, the priest moves himself or some other creature to another plane of existence. The recipient of the spell remains in the new plane until sent forth by some like means. If several persons link hands in a circle, up to eight can be affected by the plane shift at the same time.\n&emsp;The material component of this spell is a small, forked metal rod. The size and metal type dictates to which plane of existence, including sub-planes and alternate dimensions, the spell sends the affected creatures. The DM will determine specifics regarding how and what planes are reached.\n&emsp;An unwilling victim must be touched (successful attack roll) to be sent. In addition, the creature is also allowed a saving throw. If the saving throw is successful, the effect of the spell is negated. Note that pinpoint accuracy is rarely achieved; arriving at a random distance from an intended destination is common.\n&emsp;The metal rod is not expended when the spell is cast. Forked rods keyed to certain planes may be difficult to come by, as decided by the DM.'
};

pri5['Quest'] = {
    'level': 'Level 5 Priest',
    'school': 'Enchantment/Charm',
    'sphere': 'Charm',
    'range': '60 yards',
    'duration': 'Until fulfilled',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'Negate',
    'materials': 'The priest’s holy symbol',
    'reference': 'PHB p. 284',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *quest* spell enables the priest to require the affected creature to perform a service and return to the priest with proof that the deed was accomplished. The quest can, for example, require that the creature locate and return some important or valuable object, rescue a notable person, release some creature, capture a stronghold, slay a person, deliver some item, and so forth. If the quest is not properly followed, due to disregard, delay, or perversion, the creature affected by the spell loses 1 from its saving throw rolls for each day of such action. This penalty is not removed until the quest is properly pursued or the priest cancels it. There are certain circumstances that will temporarily suspend a quest, and others that will discharge or cancel it. The DM will give you appropriate information as the need to know arises.\n&emsp;If cast upon an unwilling subject, the victim is allowed a saving throw. However, if the person quested agrees to a task—even if the agreement is gained by force or trickery—no saving throw is allowed. If a quest is just and deserved, a creature of the priest’s religion cannot avoid it, and any creature of the priest’s alignment saves with a -4 penalty to the saving throw. A quest cannot be dispelled, but it can be removed by a priest of the same religion or of higher level than the caster. Some artifacts and relics might negate the spell, as can direct intervention by a deity. Likewise, an unjust or undeserved quest grants bonuses to saving throws, or might even automatically fail.'
};

pri5['Rainbow'] = {
    'level': 'Level 5 Priest',
    'school': 'Evocation, Alteration',
    'sphere': 'Weather, Sun',
    'range': '120 yards',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'The priest’s holy symbol and a vial of holy water; if no rainbow is in the vicinity, the caster can substitute a diamond of not less than 1,000 gp value, specially prepared with *bless* and *prayer* spells while in sight of a rainbow. The holy water and diamond disappear when the spell is cast',
    'reference': 'PHB p. 284',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'To cast this spell, the priest must be in sight of a rainbow, or have a special component (see below). The *rainbow* spell has two applications, and the priest can choose the desired one at the time of casting. These applications are as follows:\n&emsp;**Bow:** The spell creates a shimmering, multi-layered short composite bow of rainbow hues. It is light and easy to pull, so that any character can use it without penalty for non-proficiency. It is magical: Each of its shimmering missiles is the equivalent of a +2 weapon, including attack and damage bonuses. Magic resistance can negate the effect of any missile fired from the bow. The bow fires seven missiles before disappearing. It can be fired up to four times per round. Each time a missile is fired, one hue leaves the bow, corresponding to the color of arrow that is released. Each color of arrow has the ability to cause double damage to certain creatures, as follows:\n\nRed—fire dwellers/users and fire elementals\nOrange—creatures or constructs of clay, sand, earth, stone or similar materials, and earth elementals\nYellow—vegetable opponents (including fungus creatures, shambling mounds, treants, etc.)\nGreen—aquatic creatures, water elementals\nBlue—aerial creatures, electricity-using creatures, and air elementals\nIndigo—acid-using or poison-using creatures\nViolet—metallic or regenerating creatures\n\n&emsp;When the bow is drawn, an arrow of the appropriate color magically appears, nocked and ready. If no color is requested, or a color that has already been used is asked for, then the next arrow (in the order of the spectrum) appears.\n&emsp;**Bridge:** The caster causes the rainbow to form a seven-hued bridge up to 3 foot wide per level of the caster. Currently [[3*[[@{level-priest}]] ]] foot wide. It must be at least 20 feet long and can be as long as 120 yards, according to the caster’s desire. It lasts as long as the spell’s duration or until ordered out of existence by the caster.'
};

pri5['Raise Dead'] = {
    'level': 'Level 5 Priest',
    'school': 'Necromancy (Reversible)',
    'sphere': 'Necromantic',
    'range': '120 yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 284',
    'damage': '',
    'damage-type': '',
    'healing': 'Restored to 1 hit point',
    'effect': 'When the priest casts a *raise dead* spell, he can restore life to a dwarf, gnome, half-elf, halfling, or human (other creatures may be allowed, at the DM’s option). The length of time that the person has been dead is of importance, as the priest can raise persons dead only up to a limit of one day for each experience level of the priest. Currently [[@{level-priest}]] days dead. (i.e., a 9th-level priest can raise a person who has been dead for up to nine days).\n&emsp;Note that the body of the person must be whole, or otherwise missing parts are still missing when the person is brought back to life. Likewise, other ills, such as poison and disease, are not negated. The raised person must roll a successful resurrection survival check to survive the ordeal (see Table 3: Constitution) and loses 1 point of Constitution. Further, the raised person is weak and helpless, needing a minimum of one full day of rest in bed for each day or fraction he was dead. The person has 1 hit point when raised and must regain the rest by natural healing or curative magic.\n&emsp;A character’s starting Constitution is an absolute limit to the number of times he can be revived by this means.\n&emsp;The somatic component of the spell is a pointed finger.\n&emsp;The reverse of the spell, *slay living,* grants the victim a saving throw vs. death magic. If the saving throw is successful, the victim sustains damage equal to that of a *cause serious wounds* spell—i.e., 2d8+1 points. Failure means the victim dies instantly.'
};

pri5['Spike Stones'] = {
    'level': 'Level 5 Priest',
    'school': 'Alteration, Enchantment',
    'sphere': 'Elemental (Earth)',
    'range': '30 yards',
    'duration': '[[3d4+[[@{level-priest}]] ]] turns',
    'aoe': '[[10*[[@{level-priest}]] ]] foot square, 1 spike/square foot',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'Four tiny stalactites',
    'reference': 'PHB p. 285',
    'damage': '1d4 + modifiers',
    'damage-type': '',
    'healing': '',
    'effect': 'The *spike stones* spell causes rock to shape itself into long, sharp points that tend to blend into the background. It is effective on both natural rock and worked stone. The spike stones serve to impede progress through an area and to inflict damage. If an area is carefully observed, each observer is 25% likely to notice the sharp points of rock. Otherwise, those entering the spell’s area of effect suffer 1d4 points of damage per round. The success of each attack is determined as if the caster of the spell were actually engaging in combat. Those entering the area are subject to attack immediately upon setting foot in the area and for each round spent in the area thereafter. The initial step enables the individual to become aware of some problem only if the initial attack succeeds; otherwise movement continues and the spike stones remain unnoticed until damage occurs. Charging or running victims suffer two attacks per round.\n&emsp;Those falling into pits affected by spike stones suffer six such attacks for every 10 feet fallen, each attack having a +2 bonus to the attack roll. In addition, the damage inflicted by each attack increases by +2 for every 10 feet fallen. Finally, the creatures also suffer normal falling damage.'
};

pri5['Transmute Rock to Mud'] = {
    'level': 'Level 5 Priest',
    'school': 'Alteration (Reversible)',
    'sphere': 'Elemental (Earth, Water)',
    'range': '160 yards',
    'duration': 'Special',
    'aoe': '[[20*[[@{level-priest}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'Clay and water (or sand, lime, and water for the reverse)',
    'reference': 'PHB p. 285',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell turns natural rock of any sort into an equal volume of mud. If it is cast upon a rock, for example, the rock affected collapses into mud. Magical or enchanted stone is not affected by the spell. The depth of the mud created cannot exceed 10 feet. Creatures unable to levitate, fly, or otherwise free themselves from the mud sink at the rate of 1⁄3 of their height per round and eventually suffocate, save for lightweight creatures that could normally pass across such ground. Brush thrown atop the mud can support creatures able to climb on top of it, with the amount required decided by the DM. Creatures large enough to walk on the bottom can move through the area at a rate of 10 feet per round.\n&emsp;The mud remains until a successful *dispel magic* or *transmute mud to rock* spell restores its substance—but not necessarily its form. Evaporation turns the mud to normal dirt at a rate of 1d6 days per 10 cubic feet. The exact time depends on exposure to the sun, wind, and normal drainage.\n&emsp;The reverse, *transmute mud to rock,* hardens normal mud or quicksand into soft stone (sandstone or similar mineral) permanently unless magically changed. Creatures in the mud are allowed a saving throw to escape before the area is hardened to stone. Dry sand is unaffected.'
};

pri5['True Seeing'] = {
    'level': 'Level 5 Priest',
    'school': 'Divination',
    'sphere': 'Divination',
    'range': 'Touch',
    'duration': '[[@{level-priest}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': '*True Seeing*: An ointment for the eyes that is made from very rare mushroom powder, saffron, and fat and costs no less than 300 gp per use. *False Seeing*: An ointment concocted of oil, poppy dust, and pink orchid essence.\n&emsp;For both spells, the ointment must be aged for 1d6 months',    'reference': 'PHB p. 285',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the priest employs this spell, he confers upon the recipient the ability to see all things as they actually are. The spell penetrates normal and magical darkness. Secret doors become plain. The exact location of displaced things is obvious. Invisible things become quite visible. Illusions and apparitions are seen through. Polymorphed, changed, or enchanted things are apparent. Even the aura projected by creatures becomes visible, so that alignment can be discerned. Further, the recipient can focus his vision to see into the Ethereal plane or the bordering areas of adjacent planes. The range of vision conferred is 120 feet. *True seeing,* however, does not penetrate solid objects; it in no way confers X-ray vision or its equivalent. In addition, the spell effects cannot be further enhanced with known magic.\n&emsp;The reverse, *false seeing*, causes the person to see things as they are not: rich is poor, rough is smooth, beautiful is ugly.'
};

pri5['Wall of Fire'] = {
    'level': 'Level 5 Priest',
    'school': 'Conjuration/Summoning',
    'sphere': 'Elemental (Fire)',
    'range': '80 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'Phosphorus',
    'reference': 'PHB p. 286',
    'damage': '2d4 / 1d4 heat damage or 4d4+[[@{level-priest}]]',
    'damage-type': 'fire damage',
    'healing': '',
    'effect': 'The *wall of fire* spell brings forth an immobile, blazing curtain of magical fire of shimmering color—yellow-green or amber (different from the 4th-level wizard version). The spell creates an opaque sheet of flame up to one 20-foot square per level of the spellcaster ([[20*[[@{level-priest}]] ]] foot square), or a ring with a radius of up to 10 feet + 5 feet for every two levels of experience of the spellcaster ([[10+floor([[@{level-priest}]]/2)*5]] foot radius), and 20 feet high.\n&emsp;The wall of fire must be cast so that it is vertical with respect to the caster. One side of the wall, selected by the caster, sends forth waves of heat, inflicting 2d4 points of damage upon creatures within 10 feet and 1d4 points of damage upon those within 20 feet. In addition, the wall inflicts 4d4 points of damage, plus 1 point of damage per level of the spellcaster (4d4+[[@{level-priest}]] damage), to any creature passing through it. Creatures especially subject to fire may take additional damage, and undead always take twice normal damage. Note that attempting to directly catch moving creatures with a newly created wall of fire is difficult. A successful saving throw enables the creature to avoid the wall, while its rate and direction of movement determine which side of the created wall it is on. The wall of fire lasts as long as the priest concentrates on maintaining it, or one round per level of experience of the priest in the event he does not wish to concentrate upon it. Currently [[@{level-priest}]] rounds.'
};

const priestSpells = {};
priestSpells['pri1'] = pri1;
priestSpells['pri2'] = pri2;
priestSpells['pri3'] = pri3;
priestSpells['pri4'] = pri4;
priestSpells['pri5'] = pri5;
/* ---- Priest spells end ---- */