/* ---- Wizard spells start ---- */
const wiz1 = {};
wiz1['Affect Normal Fires'] = {
    'name': 'Affect Normal Fires',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '10-feet radius',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'Open fire or flame',
    'reference': 'PHB p. 170',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to cause nonmagical fires—from as small as a torch or lantern to as large as the area of effect—to reduce in size and brightness to become mere coals or increase in light to become as bright as full daylight and increase the illumination to double the normal radius. Note that this does not affect either fuel consumption or damage caused by the fire. The caster can affect any or all fires in the spell’s area. He can alter their intensities with a single gesture as long as the spell is in effect. The spell lasts until the caster cancels it, all fuel is burned, or the duration expires. The caster can also extinguish all flames in the area, which expends the spell immediately. The spell does not affect fire elementals or similar creatures.'
};

wiz1['Alarm'] = {
    'name': 'Alarm',
    'level': 'Level 1 Wizard',
    'school': 'Abjuration, Evocation',
    'range': '10 yards',
    'duration': '[[4+(0.5*[[@{level-wizard}]])]] hours',
    'aoe': 'Up tp 20-feet cube',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A tiny bell and a piece of very fine silver wire.',
    'reference': 'PHB p. 170',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When an *alarm* spell is cast, the wizard causes a selected area to react to the presence of any creature larger than a normal rat—anything larger than about 1 ⁄ 2 cubic foot in volume or more than about three pounds in weight. The area of effect can be a portal, a section of floor, stairs, etc. As soon as any creature enters the warded area, touches it, or otherwise contacts it without speaking a password established by the caster, the *alarm* spell lets out a loud ringing that can be heard clearly within a 60-foot radius. (Reduce the radius by 10 feet for each interposing door and by 20 feet for each substantial interposing wall.) The sound lasts for one round and then ceases. Ethereal or astrally projected creatures do not trigger an alarm, but flying or levitating creatures, invisible creatures, or incorporeal or gaseous creatures do. The caster can dismiss the alarm with a single word.'
};

wiz1['Armor'] = {
    'name': 'Armor',
    'level': 'Level 1 Wizard',
    'school': 'Conjuration',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A piece of finely cured leather that has been blessed by a priest.',
    'reference': 'PHB p. 170',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard creates a magical field of force that serves as if it were scale mail armor (AC 6). The spell has no effect on a person already armored or a creature with Armor Class 6 or better. It is not cumulative with the *shield* spell, but it is cumulative with Dexterity and, in case of fighter/mages, with the shield bonus. The *armor* spell does not hinder movement or prevent spellcasting, and adds no weight or encumbrance. It lasts until successfully dispelled or until the wearer sustains cumulative damage totaling greater than 8 points + 1 per level of the caster ([[8+[[@{level-wizard}]] ]] points). (It is important to note that the armor does *not* absorb this damage. The armor merely grants an AC of 6; the wearer still suffers full damage from any successful attacks.) Thus, the wearer might suffer 8 points from an attack, then several minutes later sustain an additional 1 point of damage. Unless the spell were cast by a wizard of 2nd level or higher, it would be dispelled at this time. Until it is dispelled, the *armor* spell grants the wearer full benefits of the Armor Class gained.'
};

wiz1['Audible Glamer'] = {
    'name': 'Audible Glamer',
    'level': 'Level 1 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '[[60+(10*[[@{level-wizard}]])]] yards',
    'duration': '[[3*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Hearing range',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A bit of wool or a small lump of wax',
    'reference': 'PHB p. 170',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the *audible glamer* spell is cast, the wizard causes a volume of sound to arise, at whatever distance he desires (within range), and seem to recede, approach, or remain at a fixed place as desired. The volume of sound created, however, is directly related to the level of the spellcaster. The noise of the *audible glamer* is that of 4 men per level of the caster. Current noise is [[4*[[@{level-wizard}]] ]] men. Thus, talking, singing, shouting, walking, marching, or running sounds can be created. The auditory illusion created by an *audible glamer* spell can be virtually any type of sound, but the relative volume must be commensurate with the level of the wizard casting the spell. A horde of rats running and squeaking is about the same volume as eight men running and shouting. A roaring lion is equal to the noise volume of 16 men, while a roaring dragon is equal to the noise volume of no fewer than 24 men. \n&emsp;A character stating that he does not believe the sound receives a saving throw, and if it succeeds, the character then hears a faint and obviously false sound, emanating from the caster’s direction. Note that this spell can enhance the effectiveness of the *phantasmal force* spell.'
};
wiz1['Burning Hands'] = {
    'name': 'Burning Hands',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': '½',
    'materials': '',
    'reference': 'PHB p. 170',
    'damage': '[[1d3+([[{2*[[@{level-wizard}]], 20}kl1]])]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'When the wizard casts this spell, a jet of searing flame shoots from his fingertips. His hands must be held so as to send forth a fanlike sheet of flames: The wizard’s thumbs must touch each other and the fingers must be spread. The burning hands send out flame jets 5 feet long in a horizontal arc of about 120 degrees in front of the wizard. Any creature in the area of the flames suffers 1d3 points of damage, plus 2 points for each level of experience of the spellcaster, to a maximum of 1d3+20 points of fire damage. Those successfully saving vs. spell receive half damage. Flammable materials touched by the fire burn (for example, cloth, paper, parchment, thin wood, etc.). Such materials can be extinguished in the next round if no other action is taken.'
};
wiz1['Cantrip'] = {
    'name': 'Cantrip',
    'level': 'Level 1 Wizard',
    'school': 'All Schools',
    'range': '10 feet',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 171',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Cantrips are minor spells studied by wizards during their apprenticeship, regardless of school. The *cantrip* spell is a practice method for the apprentice, teaching him how to tap minute amounts of magical energy. Once cast, the *cantrip* spell enables the caster to create minor magical effects for the duration of the spell. However, these effects are so minor that they have severe limitations. They are completely unable to cause a loss of hit points, cannot affect the concentration of spellcasters, and can only create small, obviously magical materials. Furthermore, materials created by a cantrip are extremely fragile and cannot be used as tools of any sort. Lastly, a cantrip lacks the power to duplicate any other spell effects. \n&emsp;Whatever manifestation the cantrip takes, it remains in effect only as long as the wizard concentrates. Wizards typically use cantrips to impress common folk, amuse children, and brighten dreary lives. Common tricks with cantrips include tinklings of ethereal music, brightening faded flowers, glowing balls that float over the caster’s hand, puffs of wind to flicker candles, spicing up aromas and flavors of bland food, and little whirlwinds to sweep dust under rugs. Combined with the *unseen servant* spell, it’s a tool to make housekeeping and entertaining simpler for the wizard.'
};
wiz1['Change Self'] = {
    'name': 'Change Self',
    'level': 'Level 1 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '0',
    'duration': '[[2d6+2*[[@{level-wizard}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 171',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to alter the appearance of his form—including clothing and equipment—to appear 1 foot shorter or taller; thin, fat, or in between; human, humanoid, or any other generally man-shaped bipedal creature. The caster cannot duplicate a specific individual. The spell does not provide the abilities or mannerisms of the chosen form. The duration of the spell is 2d6 rounds plus two additional rounds per level of experience of the spellcaster. The DM may allow a saving throw for disbelief under certain circumstances: for example, if the caster acts in a manner obviously inconsistent with his chosen role. The spell does not alter the perceived tactile (i.e., touch) properties of the caster or his equipment, and the ruse can be discovered in this way.'
};

wiz1['Charm Person'] = {
    'name': 'Charm Person',
    'level': 'Level 1 Wizard',
    'school': 'Enchantment/Charm',
    'range': '120 yards',
    'duration': 'Special',
    'aoe': '1 person',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 171',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell affects any single *person* it is cast upon. The term person includes any bipedal human, demihuman or humanoid of man-size or smaller, such as brownies, dryads, dwarves, elves, gnolls, gnomes, goblins, half-elves, halflings, half-orcs, hobgoblins, humans, kobolds, lizard men, nixies, orcs, pixies, sprites, troglodytes, and others. Thus, a 10th-level fighter could be charmed, but an ogre could not. \n&emsp;The person receives a saving throw vs. spell to avoid the effect, with any adjustment due to Wisdom (see Table 5). If the person receives damage from the caster’s group in the same round the *charm* is cast, an additional bonus of +1 per hit point of damage received is added to the victim’s saving throw. \n&emsp;If the spell recipient fails his saving throw, he regards the caster as a trusted friend and ally to be heeded and protected. The spell does not enable the caster to control the charmed creature as if it were an automaton, but any word or action of the caster is viewed in the most favorable way. Thus, a charmed person would not obey a suicide command, but he might believe the caster if assured that the only chance to save the caster’s life is for the person to hold back an onrushing red dragon for “just a minute or two.” Note also that the spell does not endow the caster with linguistic capabilities beyond those he normally possesses (i.e., he must speak the victim’s language to communicate his commands). \n&emsp;The duration of the spell is a function of the charmed person’s Intelligence and is tied to the saving throw. The spell may be broken if a successful saving throw is rolled, and this saving throw is checked on a periodic basis, according to the creature’s Intelligence (see the following table). If the caster harms, or attempts to harm, the charmed person by some overt action, or if a *dispel magic* spell is successfully cast upon the charmed person, the *charm* spell is broken. \n&emsp;If two or more *charm* effects simultaneously affect a creature, the result is decided by the DM. This could range from one effect being clearly dominant, to the subject being torn by conflicting desires, to new saving throws that could negate both spells. \n&emsp;Note that the subject has full memory of the events that took place while he was charmed.'
};

wiz1['Chill Touch'] = {
    'name': 'Chill Touch',
    'level': 'Level 1 Wizard',
    'school': 'Necromancy',
    'range': '0',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 172',
    'damage': '[[1d4]]',
    'damage-type': '',
    'healing': '',
    'effect': 'When the caster completes this spell, a blue glow encompasses his hand. This energy attacks the life force of any living creature upon which the wizard makes a successful melee attack. The touched creature must roll a successful saving throw vs. spell or suffer 1d4 points of damage and lose 1 point of Strength. If the save is successful, the creature remains unharmed. Creatures not rated for Strength suffer a –1 penalty to their attack rolls for every other successful touch. Lost Strength returns at the rate of 1 point per hour. Damage must be cured magically or healed naturally. \n&emsp;This spell has a special effect on undead creatures. Undead touched by the caster suffer no damage or Strength loss, but they must successfully save vs. spell or flee for 1d4 rounds + 1 round per level of the caster.'
};

wiz1['Color Spray'] = {
    'name': 'Color Spray',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': '5 x 20 x 20 feet wedge',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A pinch each of powder or sand that is colored red, yellow, and blue.',
    'reference': 'PHB p. 172',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, the wizard causes a vivid, fan-shaped spray of clashing colors to spring forth from his hand. From one to six creatures ([[1d6]]) within the area are affected in order of increasing distance from the wizard. All creatures above the level of the spellcaster and all those of 6th level or 6 Hit Dice or more are entitled to a saving throw vs. spell. Blind or unseeing creatures are not affected by the spell. \n&emsp;Creatures not allowed or failing saving throws, and whose Hit Dice or levels are less than or equal to the spellcaster’s level, are struck unconscious for 2d4 rounds; those with Hit Dice or levels 1 or 2 greater than the wizard’s level are blinded for 1d4 rounds; those with Hit Dice or levels 3 or more greater than that of the spellcaster are stunned (reeling and unable to think or act coherently) for one round.'
};

wiz1['Comprehend Languages'] = {
    'name': 'Comprehend Languages',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': '1 speaking creature or written text',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A pinch of soot and a few grains of salt.',
    'reference': 'PHB p. 172',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard is able to understand the spoken words of a creature or read an otherwise incomprehensible written message (such as writing in another language). In either case, the wizard must touch the creature or the writing. Note that the ability to read does not necessarily impart understanding of the material, nor does the spell enable the caster to speak or write an unknown language. Written material can be read at the rate of one page or equivalent per round. Magical writing cannot be read, other than to know it is magical, but the spell is often useful when deciphering treasure maps. This spell can be foiled by certain warding magic (the 3rd-level secret page and *illusionary script* spells), and it does not reveal messages concealed in otherwise normal text. \n&emsp;The reverse of this spell, *confuse languages*, cancels a *comprehend languages* spell or renders a writing or a creature’s speech incomprehensible, for the same duration as above.'
};

wiz1['Dancing Lights'] = {
    'name': 'Dancing Lights',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '[[40+(10*[[@{level-wizard}]])]]',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'either a bit of phosphorus or wychwood, or a glowworm.',
    'reference': 'PHB p. 172',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *dancing lights* spell is cast, the wizard creates, at his option, from one to four lights that resemble either torches or lanterns (and cast that amount of light), glowing spheres of light (such as evidenced by will-o-wisps), or one faintly glowing, vaguely manlike shape, somewhat similar to that of a creature from the Elemental Plane of Fire. The dancing lights move as the spellcaster desires, forward or back, straight or turning corners, without concentration upon such movement by the wizard. The spell cannot be used to cause blindness (see the 1st-level *light* spell), and it winks out if the range or duration is exceeded.'
};

wiz1['Detect Magic'] = {
    'name': 'Detect Magic',
    'level': 'Level 1 Wizard',
    'school': 'Divination',
    'range': '0',
    'duration': '[[2*[[@{level-wizard}]] ]]',
    'aoe': '10 x 60 feet',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 172',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the *detect magic* spell is cast, the wizard detects magical radiations in a path 10 feet wide and up to 60 feet long, in the direction he is facing. The intensity of the magic can be determined (dim, faint, moderate, strong, overwhelming), and the wizard has a 10% chance per level ([[10*[[@{level-wizard}]] ]]%) to recognize if a certain type of magic (alteration, conjuration, etc.) is present. The caster can turn, scanning a 60-degree arc per round. A stone wall of 1 foot or more thickness, solid metal of 1 inch thickness, or a yard or more of solid wood blocks the spell. Magical areas, multiple types of magic, or strong local magical emanations may confuse or conceal weaker radiations. Note that this spell does not reveal the presence of good or evil, or reveal alignment. Otherplanar creatures are not necessarily magical.'
};

wiz1['Detect Undead'] = {
    'name': 'Detect Undead',
    'level': 'Level 1 Wizard',
    'school': 'Divination, Necromancy',
    'range': '0',
    'duration': '3 turns',
    'aoe': '[[60+(10*[[@{level-wizard}]])]] feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A bit of earth from a grave.',
    'reference': 'PHB p. 173',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to detect all undead creatures out to the limit of the spell. The area of effect extends in a path 10 feet wide and 60 feet long (plus 10 feet longer per level of the wizard), in the direction the caster is facing. Scanning a direction requires one round, and the caster must be motionless. While the spell indicates direction, it does not give specific location or distance. It detects undead through walls and obstacles but is blocked by 1 foot of solid stone, 1 yard of wood or loose earth, or a thin coating of metal. The spell does not indicate the type of undead detected, only that undead are present.'
};

wiz1['Enlarge'] = {
    'name': 'Enlarge',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[5*LEVEL#]] rounds',
    'aoe': '1 creature or object',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': 'A pinch of powdered iron.',
    'reference': 'PHB p. 173',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes instant growth of a creature or object, increasing both size and weight. It can be cast only upon a single creature (or a symbiotic or community entity) or upon a single object that does not exceed 10 cubic feet in volume per caster level. The object or creature must be seen to be affected. It grows by up to 10% per level of experience of the wizard ([[10*[[@{level-wizard}]] ]]%), increasing this amount in height, width, and weight. \n&emsp;All equipment worn or carried by a creature is enlarged by the spell. Unwilling victims are entitled to a saving throw vs. spell. A successful saving throw means the spell fails. If insufficient room is available for the desired growth, the creature or object attains the maximum possible size, bursting weak enclosures in the process, but it is constrained without harm by stronger materials—the spell cannot be used to crush a creature by growth. \n&emsp;Magical properties are not increased by this spell—a huge *sword +1* is still only +1, a staff-sized wand is still only capable of its normal functions, a giant-sized potion merely requires a greater fluid intake to make its magical effects operate, etc. Weight, mass, and strength are affected, though. Thus, a table blocking a door would be heavier and more effective, a hurled stone would have more mass (and cause more damage), chains would be more massive, doors thicker, a thin line turned to a sizeable, longer rope, and so on. A creature’s hit points, Armor Class, and attack rolls do not change, but damage rolls increase proportionately with size.For example, a fighter at 160% normal size hits with his long sword and rolls a 6 for damage. The adjusted damage roll is 10 (that is, 6 × 1.6 = 9.6, rounded up). Bonuses due to Strength, class, and magic are not altered. \n&emsp;The reverse spell, *reduce*, negates the *enlarge* spell or makes creatures or objects smaller. The creature or object loses 10% of its original size for every level of the caster, to a minimum of 10% of the original size. Thereafter, the size shrinks by 1-foot increments to less than 1 foot, by 1-inch increments to 1 inch, and by 1⁄10-inch increments to a minimum of 1⁄10 of an inch—the recipient cannot dwindle away to nothingness. \n&emsp;For example, a 16-foot-tall giant reduced by a 15th-level wizard (15 steps) would be reduced to 1.6 feet (in nine steps), then to 6⁄10 of a foot or 7.2 inches (in one step), and finally to 2.2 inches (in the last five steps). A shrinking object may damage weaker materials affixed to it, but an object will shrink only as long as the object itself is not damaged. Unwilling creatures are allowed a saving throw vs. spell.'
};

wiz1['Erase'] = {
    'name': 'Erase',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '1 scroll or 2 pages',
    'components': 'v, S',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 173',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *erase* spell removes writings of either magical or mundane nature from a scroll or from one to two pages of paper, parchment, or similar surfaces. It removes *explosive runes*, *glyphs of warding*, *sepia snake sigils*, and *wizard marks*, but it does not remove *illusory script* or *symbols* (see those spells). Nonmagical writings are automatically erased if the caster is touching them; otherwise, the chance for success is 90%. Magical writings must be touched, and are only 30% likely to be erased, plus 5% per caster level, to a maximum of 90% (current chance: [[30+(5*[[@{level-wizard}]])]]%).'
};

wiz1['Feather Fall'] = {
    'name': 'Feather Fall',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 173',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the creature(s) or object(s) affected immediately assumes the mass of a piece of down. The rate of falling is instantly changed to a mere 2 feet per second (120 feet per round), and no damage is incurred upon landing while the spell is in effect. However, when the spell duration ceases, a normal rate of fall occurs. The spell can be cast upon the wizard or some other creature or object up to the maximum range and lasts for one round for each level of the wizard. The *feather fall* affects one or more objects or creatures in a 10-foot cube, as long as the maximum weight of the creatures or objects does not exceed a combined total of 200 pounds plus 200 pounds per level of the spellcaster. Current weight limit: [[200+(200*[[@{level-wizard}]])]] pounds. \n&emsp;For example, a 2nd-level wizard has a range of 20 yards, a duration of two rounds, and a weight limit of 600 pounds when casting this spell. The spell works only upon free-falling, flying, or propelled objects (such as missiles). It does not affect a sword blow or a charging creature. Note that the spell can be effectively combined with *gust of wind* and similar spells.'
};

wiz1['Find Familiar'] = {
    'name': 'Find Familiar',
    'level': 'Level 1 Wizard',
    'school': 'Conjuration/Summoning',
    'range': '[[@{level-wizard}]] miles',
    'duration': 'Special',
    'aoe': '1 familiar',
    'components': 'V, S, M',
    'cast-time': '2d12 hours',
    'saving-throw': 'Special',
    'materials': '1000 gp worth of incense and herbs',
    'reference': 'PHB p. 174',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to attempt to summon a familiar to act as his aide and companion. Familiars are typically small creatures, such as cats, frogs, ferrets, crows, hawks, snakes, owls, ravens, toads, weasels, or even mice. A creature acting as a familiar can benefit a wizard, conveying its sensory powers to its master, conversing with him, and serving as a guard/scout/spy as well. A wizard can have only one familiar at a time, however, and he has no control over what sort of creature answers the summoning, if any at all come. \n&emsp;The creature is always more intelligent than others of its type (typically by 2 or 3 Intelligence points), and its bond with the wizard confers upon it an exceptionally long life. The wizard receives the heightened senses of his familiar, which grants the wizard a +1 bonus to all surprise die rolls. Normal familiars have 2–4 hit points plus 1 hit point per caster level, and an Armor Class of 7 (due to size, speed, etc.). \n&emsp;The wizard has an empathic link with the familiar and can issue it mental commands at a distance of up to 1 mile. Note that empathic responses from the familiar are generally fairly basic—while able to communicate simple thoughts, these are often overwhelmed by instinctual responses. Thus, a ferret familiar spying on a band of orcs in the woods might lose its train of thought upon sighting a mouse. Certainly its communications to its master would be tinged with fear of the “big ones” it was spying on! The caster cannot see through the familiar’s eyes. \n&emsp;If separated from the caster, the familiar loses 1 hit point each day, and dies if reduced to 0 hit points. When the familiar is in physical contact with its wizard, it gains the wizard’s saving throws against special attacks. If a special attack would normally cause damage, the familiar suffers no damage if the saving throw is successful and half damage if the saving throw is failed. If the familiar dies, the wizard must successfully roll an immediate system shock check or die. Even if he survives this check, the wizard loses 1 point from his Constitution when the familiar dies. \n&emsp;The power of the conjuration is such that it can be attempted but once per year. When the wizard decides to find a familiar, he must load a brass brazier with charcoal. When this is burning well, he adds 1,000 gp worth of incense and herbs. The spell incantation is then begun and must be continued until the familiar comes or the casting time is finished. The DM secretly determines all results. Note that most familiars are not inherently magical, nor does a *dispel magic* spell send them away. \n&emsp;Deliberate mistreatment, failure to feed and care for the familiar, or continuous unreasonable demands have adverse effects on the familiar’s relationship with its master. Purposely arranging the death of one’s own familiar incurs great disfavor from certain powerful entities, with dire results.'
};

wiz1['Friends'] = {
    'name': 'Friends',
    'level': 'Level 1 Wizard',
    'school': 'Enchantment/Charm',
    'range': '0',
    'duration': '[[1d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '60-feet radius',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'Chalk (or white flour), lampblack (or soot), and vermilion applied to the face before casting the spell.',
    'reference': 'PHB p. 174',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *friends* spell causes the wizard to temporarily gain [[2d4]] points of Charisma. Intelligent creatures within the area of effect at the time the spell is cast must make immediate reaction checks based on the character’s new Charisma. Those with favorable reactions tend to be very impressed with the spellcaster and make an effort to be his friends and help him, as appropriate to the situation. Officious bureaucrats might decide to become helpful; surly gate guards might wax informative; attacking orcs might spare the caster’s life, taking him captive instead. When the spell wears off, the creatures realize that they have been influenced, and their reactions are determined by the DM.'
};

wiz1['Gaze Reflection'] = {
    'name': 'Gaze Reflection',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[2+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 174',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *gaze reflection* spell creates a shimmering, mirrorlike area of air before the wizard that moves with the caster. Any gaze attack, such as that of a basilisk, *eyes of charming*, a vampire’s gaze, the 6th-level *eyebite* spell, and so on, is reflected back upon the gazer if the gazer tries to make eye contact with the spellcaster (the spellcaster suffers no effects from the gaze attack). Such creatures receive a saving throw vs. their own gaze effect. The spell does not affect vision or lighting and is not effective against creatures whose effect comes from being gazed upon (such as a medusa). Only active gaze attacks are blocked by this spell.'
};

wiz1['Grease'] = {
    'name': 'Grease',
    'level': 'Level 1 Wizard',
    'school': 'Conjuration',
    'range': '10 yards',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': '10 x 10 feet',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A bit of pork rind or butter.',
    'reference': 'PHB p. 175',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *grease* spell covers a material surface with a slippery layer of a fatty, greasy nature. Any creature entering the area or caught in it when the spell is cast must save vs. spell or slip, skid, and fall. Those who successfully save can reach the nearest non*greased* surface by the end of the round. Those who remain in the area are allowed a saving throw each round until they escape the area. The DM should adjust saving throws by circumstance; for example, a creature charging down an incline that is suddenly greased has little chance to avoid the effect, but its ability to exit the affected area is almost assured! The spell can also be used to create a greasy coating on an item—a rope, ladder rungs, weapon handle, etc. Material objects not in use are always affected by this spell, while creatures wielding or employing items receive a saving throw vs. spell to avoid the effect. If the initial saving throw is failed, the creature immediately drops the item. A saving throw must be made each round the creature attempts to use the greased item. The caster can end the effect with a single utterance; otherwise, it lasts for three rounds plus one round per level.'
};

wiz1['Hold Portal'] = {
    'name': 'Hold Portal',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '[[20*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[20*[[@{level-wizard}]] ]] square feet',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 175',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell magically bars a door, gate, or valve of wood, metal, or stone. The magical closure holds the portal fast, just as if it were securely closed and locked. Any extraplanar creature (djinn, elemental, etc.) with 4 or more Hit Dice can shatter the spell and burst open the portal. A wizard of 4 or more experience levels higher than the spellcaster can open the held portal at will. A *knock* spell or a successful *dispel magic* spell can negate the *hold portal*. Held portals can be broken or physically battered down.'
};

wiz1['Hypnotism'] = {
    'name': 'Hypnotism',
    'level': 'Level 1 Wizard',
    'school': 'Enchantment/Charm',
    'range': '5 yards',
    'duration': '[[1+[[@{level-wizard}]] ]] rounds',
    'aoe': '30 feet cube',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 175',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The gestures of the wizard, along with his droning incantation, cause [[1d6]] creatures within the area to become susceptible to a suggestion—a brief and reasonable-sounding request (see the 3rd-level wizard *suggestion* spell). The request must be given after the *hypnotism* spell is cast. Until that time, the success of the spell is unknown. Note that the subsequent suggestion is not a spell, but simply a vocalized urging (the caster must speak a language the creature understands for this spell to work). Creatures that successfully roll their saving throws are not under hypnotic influence. Those who are exceptionally wary or hostile save with +1 to +3 bonuses. If the spell is cast at an individual creature that meets the caster’s gaze, the saving throw is made with a penalty of –2. A creature that fails its saving throw does not remember that the caster enspelled it.'
};

wiz1['Identify'] = {
    'name': 'Identify',
    'level': 'Level 1 Wizard',
    'school': 'Divination',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[@{level-wizard}]] items',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': 'A pearl (of at least 100 gp value) and an owl feather steeped in wine;',
    'reference': 'PHB p. 175',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When an *identify* spell is cast, magical items subsequently touched by the wizard can be identified. The eight hours immediately preceding the casting of the spell must be spent purifying the items and removing influences that would corrupt and blur their magical auras. If this period is interrupted, it must be begun again. When the spell is cast, each item must be handled in turn by the wizard. Any consequences of this handling fall fully upon the wizard and may end the spell, although the wizard is allowed any applicable saving throw. \n&emsp;The chance of learning a piece of information about an item is equal to 10% per level of the caster, to a maximum of 90%, rolled by the DM. Current chance is [[{{(10*[[@{level-wizard}]]),90}kl1}]]%. Any roll of 96–00 indicates a false reading (91–95 reveals nothing). Only one function of a multifunction item is discovered per handling (i.e., a 5th-level wizard could attempt to determine the nature of five different items, five different functions of a single item, or any combination of the two). If any attempt at reading fails, the caster cannot learn any more about that item until he advances a level. Note that some items, such as special magical tomes, cannot be identified with this spell. \n&emsp;The item never reveals its exact attack or damage bonuses, although the fact that it has few or many bonuses can be determined. If it has charges, only a general indication of the number of charges remaining is learned: powerful (81% – 100% of the total possible charges), strong (61% – 80%), moderate (41% – 60%), weak (6% – 40%), or faint (five charges or less). The faint result takes precedence, so a fully charged *ring of three wishes* always appears to be only faintly charged. \n&emsp;After casting the spell and determining what can be learned from it, the wizard loses 8 points of Constitution. He must rest for one hour to recover each point of Constitution. If the 8-point loss drops the spellcaster below a Constitution of 1, he falls unconscious. Consciousness is not regained until full Constitution is restored, which takes 24 hours (one point per three hours for an unconscious character). \n&emsp;The material components infusion must be drunk prior to spellcasting. If a *luckstone* is powdered and added to the infusion, the divination becomes much more potent: Exact bonuses or charges can be determined, and the functions of a multifunctional item can be learned from a single reading. At the DM’s option, certain properties of an artifact or relic might also be learned.'
};

wiz1['Jump'] = {
    'name': 'Jump',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[1d3+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A grasshopper’s hind leg, to be broken by the caster when the spell is cast.',
    'reference': 'PHB p. 176',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The individual touched when this spell is cast is empowered to leap once per round for the duration of the spell. Leaps can be up to 30 feet forward or straight upward or 10 feet backward. Horizontal leaps forward or backward have only a slight arc—about 2 feet per 10 feet of distance traveled. The *jump* spell does not ensure safety in landing or grasping at the end of the leap.'
};

wiz1['Light'] = {
    'name': 'Light',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '60 yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '20-feet radius',
    'components': 'V, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A firefly or a piece of phosphorescent moss.',
    'reference': 'PHB p. 176',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a luminous glow, equal to torchlight, within a fixed radius of the spell’s center. Objects in darkness beyond this sphere can be seen, at best, as vague and shadowy shapes. The spell is centered on a point selected by the caster, and he must have a line of sight and unobstructed path for the spell when it is cast. Light can spring from air, rock, metal, wood, or almost any similar substance. \n&emsp;The effect is immobile unless it is specifically centered on a moveable object or mobile creature. If this spell is cast upon a creature, the applicable magic resistance and saving throw rolls must be made. Successful resistance negates the spell, while a successful saving throw indicates that the spell is centered immediately behind the creature, rather than upon the creature itself. Light taken into an area of magical darkness does not function, but if cast directly against magical darkness negates it (but only for the duration of the *light* spell, if the darkness effect is continual). \n&emsp;Light centered on the visual organs of a creature blinds it, reducing its attack rolls and saving throws by 4 and worsening its Armor Class by 4. The caster can end the spell at any time by uttering a single word.'
};

wiz1['Magic Missile'] = {
    'name': 'Magic Missile',
    'level': 'Level 1 Wizard',
    'school': 'Evocation',
    'range': '[[60+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Instantaneous',
    'aoe': '1-5 targets',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 176',
    'damage': '?{Number of missiles?|1 missile, [[1d4+1]]|2 missiles, M1:[[1d4+1]] M2:[[1d4+1]]|3 missiles, M1:[[1d4+1]] M2:[[1d4+1]] M3:[[1d4+1]]|4 missiles, M1:[[1d4+1]] M2:[[1d4+1]] M3:[[1d4+1]] M4:[[1d4+1]]|5 missiles, M1:[[1d4+1]] M2:[[1d4+1]] M3:[[1d4+1]] M4:[[1d4+1]] M5:[[1d4+1]]}',
    'damage-type': '',
    'healing': '',
    'effect': 'Use of the *magic missile* spell creates up to five missiles of magical energy that dart forth from the wizard’s fingertip and unerringly strike their target. This includes enemy creatures in a melee. The target creature must be seen or otherwise detected to be hit, however, so near-total concealment, such as that offered by arrow slits, can render the spell ineffective. Likewise, the caster must be able to identify the target. He cannot direct a magic missile to “Strike the commander of the legion,” unless he can single out the commander from the rest of the soldiers. Specific parts of a creature cannot be singled out. Inanimate objects (locks, etc.) cannot be damaged by the spell, and any attempt to do so wastes the missiles to no effect. Against creatures, each missile inflicts 1d4+1 points of damage. \n&emsp;For every two extra levels of experience, the wizard gains an additional missile—he has two at 3rd level, three at 5th level, four at 7th level, etc., up to a total of five missiles at 9th level. Current number of missiles [[1+([[{{floor(([[@{level-wizard}]]-1)/2),4}kl1}]])]]. If the wizard has multiple missile capability, he can have them strike a single target creature or several creatures, as desired.'
};

wiz1['Mending'] = {
    'name': 'Mending',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '1 object',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'Two small magnets of any type (lodestone in all likelihood) or two burrs.',
    'reference': 'PHB p. 176',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell repairs small breaks or tears in objects. It will weld a broken ring, chain link, medallion, or slender dagger, providing but one break exists. Ceramic or wooden objects with multiple breaks can be invisibly rejoined to be as strong as new. A hole in a leather sack or wineskin is completely healed over by a *mending* spell. This spell does not, by itself, repair magical items of any type. One turn after the spell is cast, the magic of the joining fades, and the effect cannot be magically dispelled. The maximum volume of material the caster can mend is 1 cubic foot per level. Current maximum volume is [[@{level-wizard}]] cubic feet.'
};

wiz1['Message'] = {
    'name': 'Message',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A short piece of copper wire.',
    'reference': 'PHB p. 176',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard can whisper messages and receive replies with little chance of being overheard. When the spell is cast, the wizard secretly or openly points his finger at each creature to be included in the spell effect. Up to one creature per level can be included. Currently [[@{level-wizard}]] creatures. When the wizard whispers, the whispered message travels in a straight line and is audible to all of the involved creatures within 30 feet, plus 10 feet per level of the caster. Current range is [[30+(10*[[@{level-wizard}]])]] feet. The creatures who receive the message can whisper a reply that is heard by the spellcaster. Note that there must be an unobstructed path between the spellcaster and the recipients of the spell. The message must be in a language the caster speaks; this spell does not by itself confer understanding upon the recipients. This spell is most often used to conduct quick and private conferences when the caster does not wish to be overheard.'
};

wiz1['Mount'] = {
    'name': 'Mount',
    'level': 'Level 1 Wizard',
    'school': 'Conjuration/Summoning',
    'range': '10 yards',
    'duration': '[[2+[[@{level-wizard}]] ]] hours',
    'aoe': '1 mount',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A bit of hair from the type of animal to be conjured.',
    'reference': 'PHB p. 177',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster conjures a normal animal to serve him as a mount. The animal serves willingly and well, but at the expiration of the spell duration it disappears, returning to its own place. The type of mount gained by this spell depends on the level of the caster; of course, a caster can choose a lesser mount if desired. Available mounts include the following: (See PHB). \n&emsp;The mount does not come with any riding gear, unless it is of a class lower than the caster would normally be entitled to; thus, a 4th-level wizard can gain a war horse without saddle and harness, or a light horse with saddle and harness. The statistics of the animal gained are typical of all creatures of the same class. The mount disappears when slain.'
};

wiz1['Nystu\'s Magical Aura'] = {
    'name': 'Nystul\'s Magical Aura',
    'level': 'Level 1 Wizard',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] days',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'A small square of silk, which must be passed over the object that receives the aura.',
    'reference': 'PHB p. 177',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, any one item of no more than five pounds weight per level of the spellcaster ([[ [[@{level-wizard}]]*5]] pounds) can be given an aura that is noticed by someone using magic detection. Furthermore, the caster can specify the type of magical aura that is detected (alteration, conjuration, etc.) and this effectively masks the item’s actual aura, if any, unless the item’s own aura is exceptionally powerful (if it is an artifact, for instance). If the object bearing Nystul’s magical aura has an *identify* spell cast on it or is similarly examined, the examiner has a 50% chance of recognizing that the aura has been placed to mislead the unwary. Otherwise, the aura is believed and no amount of testing reveals what the true magic is.'
};

wiz1['Phantasmal Force'] = {
    'name': 'Phantasmal Force',
    'level': 'Level 1 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '[[60+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Special',
    'aoe': '[[400+(100*[[@{level-wizard}]])]] square feet',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A bit of fleece.',
    'reference': 'PHB p. 177',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates the illusion of any object, creature, or force, as long as it is within the boundaries of the spell’s area of effect. The illusion is visual and affects all believing creatures (undead are immune) that view it. It does not create sound, smell, or temperature. Effects that depend on these senses usually fail. The illusion lasts until struck by an opponent—unless the spellcaster causes the illusion to react appropriately—or until the wizard ceases concentration upon the spell (due to desire, moving, or a successful attack that causes damage). Saving throws for illusions are explained under “Illusions” in Chapter 7: Magic and under “Adjudicating Illusions” at the beginning of Appendix 2. Creatures that disbelieve the illusion see it for what it is and add +4 to associates’ saving throws if this knowledge can be communicated effectively. Creatures believing the illusion are subject to its effects (again, as explained in Chapter 7). \n&emsp;The illusionary effect can be moved by the caster within the limits of the area of effect. The DM has to rule on the effectiveness of this spell; detailed guidelines are outlined in Chapter 7: Magic and under “Adjudicating Illusions” at the beginning of Appendix 2.'
};

wiz1['Protection From Evil'] = {
    'name': 'Protection From Evil',
    'level': 'Level 1 Wizard',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The wizard must trace a 3-foot-diameter circle on the floor (or ground) with powdered silver.',
    'reference': 'PHB p. 177',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, it creates a magical barrier around the recipient at a distance of 1 foot. The barrier moves with the recipient and has three major effects: \n&emsp;First, all attacks made by evil (or evilly enchanted) creatures against the protected creature suffer –2 penalties to attack rolls; any saving throws caused by such attacks are made with +2 bonuses. Second, any attempt to possess (as by a *magic jar* attack) or to exercise mental control over (as by a vampire’s *charm* ability) the protected creature is blocked by this spell. Note that the protection does not prevent a vampire’s *charm* itself, but it does prevent the exercise of mental control through the barrier. Likewise, a possessing life force is merely kept out. It would not be expelled if in place before the protection is cast. \n&emsp;Third, the spell prevents bodily contact by creatures of an extraplanar or conjured nature (such as aerial servants, elementals, imps, invisible stalkers, salamanders, water weirds, xorn, and others). This causes the natural (body) weapon attacks of such creatures to fail and the creatures to recoil, if such attacks require touching the protected being. Animals or monsters summoned or conjured by spells or similar magic are likewise hedged from the character. \n&emsp;This protection ends if the protected character makes a melee attack against or tries to force the barrier against the blocked creature. \n&emsp;This spell can be reversed to become *protection from good*; the second and third benefits remain unchanged. The material component for the reverse is a circle of powdered iron.'
};

wiz1['Read Magic'] = {
    'name': 'Read Magic',
    'level': 'Level 1 Wizard',
    'school': 'Divination',
    'range': '0',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A clear crystal or mineral prism, which is not expended, to cast the spell.',
    'reference': 'PHB p. 178',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *read magic* spell, the wizard is able to read magical inscriptions on objects—books, scrolls, weapons, and the like—that would otherwise be totally unintelligible. (The personal books of the wizard, and works already magically read, are intelligible.) This deciphering does not normally invoke the magic contained in the writing, although it may do so in the case of a cursed scroll. Furthermore, once the spell is cast and the wizard has read the magical inscription, he is thereafter able to read that particular writing without recourse to the use of the *read magic* spell. The duration of the spell is two rounds per level of experience of the spellcaster; the wizard can read one page or its equivalent per round.'
};

wiz1['Shield'] = {
    'name': 'Shield',
    'level': 'Level 1 Wizard',
    'school': 'Evocation',
    'range': '0',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 178',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, an invisible barrier comes into being in front of the wizard. This shield totally negates magic missile attacks. It provides the equivalent protection of AC 2 against hand-hurled missiles (axes, darts, javelins, spears, etc.), AC 3 against small devicepropelled missiles (arrows, bolts, bullets, manticore spikes, sling stones, etc.), and AC 4 against all other forms of attack. The shield also adds a +1 bonus to the wizard’s saving throws against attacks that are basically frontal. Note that these benefits apply only if the attacks originate from in front of the wizard, where the shield can move to interpose itself.'
};

wiz1['Shocking Grasp'] = {
    'name': 'Shocking Grasp',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 178',
    'damage': '[[1d8+[[@{level-wizard}]] ]]',
    'damage-type': 'Lightning',
    'healing': '',
    'effect': 'When the wizard casts this spell, he develops a powerful electrical charge that gives a jolt to the creature touched. The spell remains in effect for one round per level of the caster ([[@{level-wizard}]] rounds) or until it is discharged by the caster touching another creature. The shocking grasp delivers 1d8 points of damage, plus 1 point per level of the wizard (for example, a 2nd-level wizard would discharge a shock causing 1d8+2 points of damage). While the wizard must come close enough to his opponent to lay a hand on the opponent’s body or upon an electrical conductor that touches the opponent’s body, a like touch from the opponent does not discharge the spell.'
};

wiz1['Sleep'] = {
    'name': 'Sleep',
    'level': 'Level 1 Wizard',
    'school': 'Enchantment/Charm',
    'range': '30 yards',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A pinch of fine sand, rose petals, or a live cricket.',
    'reference': 'PHB p. 178',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a wizard casts a *sleep* spell, he causes a comatose slumber to come upon one or more creatures (other than undead and certain other creatures specifically excluded from the spell’s effects). All creatures to be affected by the *sleep* spell must be within 30 feet of each other. The number of creatures that can be affected is a function of Hit Dice or levels. The spell affects [[2d4]] Hit Dice of monsters. Monsters with 4+3 Hit Dice (4 Hit Dice plus 3 hit points) or more are unaffected. The center of the area of effect is determined by the spellcaster. The creatures with the least Hit Dice are affected first, and partial effects are ignored. \n&emsp;For example, a wizard casts *sleep* at three kobolds, two gnolls, and an ogre. The roll (2d4) result is 4. All the kobolds and one gnoll are affected (1⁄2 + 1⁄2 + 1⁄2 + 2 = 3 1⁄2 Hit Dice). Note that the remainder is not enough to affect the last gnoll or the ogre. \n&emsp;Slapping or wounding awakens affected creatures but normal noise does not. Awakening requires one entire round. Magically sleeping opponents can be attacked with substantial bonuses (see “Modifiers to the Attack Roll” in Chapter 9: Combat).'
};

wiz1['Spider Climb'] = {
    'name': 'Spider Climb',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': 'A drop of bitumen and a live spider, both of which must be eaten by the spell recipient.',
    'reference': 'PHB p. 179',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *spider climb* spell enables the recipient to climb and travel upon vertical surfaces as well as a giant spider, or even hang upside down from ceilings. Unwilling victims must be touched and are then allowed a saving throw vs. spell to negate the effect. The affected creature must have bare hands and feet in order to climb in this manner, at a movement rate of 6 (3 if at all encumbered). During the course of the spell, the recipient cannot handle objects that weigh less than a dagger (one pound), for such objects stick to his hands and feet. Thus, a wizard will find it virtually impossible to cast spells if under a *spider climb* spell. Sufficient force can pull the recipient free; the DM can assign a saving throw based on circumstances, the strength of the force, and so on. For example, a creature with a Strength of 12 might pull the subject free if the subject fails a saving throw vs. paralyzation (a moderately difficult saving throw). The caster can end the spell effect with a word.'
};

wiz1['Spook'] = {
    'name': 'Spook',
    'level': 'Level 1 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '30 feet',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 179',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *spook* spell enables the wizard to play upon natural fears to cause the target creature to perceive the spellcaster as someone or something inimical. Without actually knowing what this is, the wizard merely advances threateningly upon the creature. If the creature does not make a successful saving throw vs. spell, it turns and flees at maximum speed as far from the wizard as possible, though items carried are not dropped. The creature has a saving throw penalty of –1 for every two experience levels of the caster, to a maximum of –6 at 12th level. Current penalty [[{{[[floor(-[[@{level-wizard}]]/2)]],-6}kh1}]]. Note that a natural (unmodified) roll of 20 automatically succeeds, regardless of saving throw penalties. Although the caster does not actually pursue the fleeing creature, a phantasm from its own mind does. Each round after the initial casting, the creature receives another saving throw, without penalty, until it successfully saves and the spell is broken. In any event, the spell functions only against creatures with Intelligences of 2 or more, and undead are not affected at all.'
};

wiz1['Taunt'] = {
    'name': 'Taunt',
    'level': 'Level 1 Wizard',
    'school': 'Enchantment',
    'range': '60 yards',
    'duration': '1 round',
    'aoe': '30 feet radius',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': 'A slug, which is hurled at the creatures to be taunted.',
    'reference': 'PHB p. 179',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *taunt* spell enables the caster to jape and jeer effectively at a single type of creature with an Intelligence of 2 or greater. The caster need not speak the language of the creatures. His words and sounds have real meaning for the subject creature or creatures, challenging, insulting, and generally irritating and angering the listeners. Those failing to save vs. spell rush forth in fury to do battle with the spellcaster. All affected creatures attack the spellcaster in melee if physically capable of doing so, seeking to use body or hand-held weapons rather than missile weapons or spells. \n&emsp;Separation of the caster from the victim by an impenetrable or uncrossable boundary (a wall of fire, a deep chasm, a formation of set pikemen) causes the spell to break. If the caster taunts a mixed group, he must choose the type of creature to be affected. Creatures commanded by a strong leader (i.e., with a Charisma bonus, with higher Hit Dice, etc.) might gain a saving throw bonus of +1 to +4, at the DM’s discretion. If used in conjunction with a *ventriloquism* spell, the creatures may attack the apparent source, depending upon their Intelligence, a leader’s presence, and so on.'
};

wiz1['Tenser\'s Floating Disc'] = {
    'name': 'Tenser\'s Floating Disc',
    'level': 'Level 1 Wizard',
    'school': 'Evocation',
    'range': '20 yards',
    'duration': '[[3+[[@{level-wizard}]] ]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A drop of mercury.',
    'reference': 'PHB p. 179',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the caster creates the slightly concave, circular plane of force known as Tenser’s floating disc (after the famed wizard whose greed and ability to locate treasure are well known). The disc is 3 feet in diameter and holds 100 pounds of weight per level of the wizard casting the spell. Current weight limit [[100*[[@{level-wizard}]] ]] pounds. The disc floats approximately 3 feet above the ground at all times and remains level. It floats along horizontally within its range of 20 yards at the command of the caster, and will accompany him at a movement rate of no more than 6. If unguided, it maintains a constant interval of 6 feet between itself and the wizard. If the spellcaster moves beyond range (by moving faster, by such means as a *teleport* spell, or by trying to take the disc more than 3 feet from the surface beneath it), or if the spell duration expires, the floating disc winks out of existence, and whatever it was supporting crashes to the surface beneath it.'
};

wiz1['Unseen Servant'] = {
    'name': 'Unseen Servant',
    'level': 'Level 1 Wizard',
    'school': 'Conjuration/Summoning',
    'range': '0',
    'duration': '1 hours + [[@{level-wizard}]] turns',
    'aoe': '30-feet radius',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A piece of string and a bit of wood.',
    'reference': 'PHB p. 180',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The unseen servant is an invisible, mindless, and shapeless force, used to step and fetch, open unstuck doors, and hold chairs, as well as to clean and mend. It is not strong, but unfailingly obeys the command of the wizard. It can perform only one activity at a time and can move only lightweight items, carrying a maximum of 20 pounds or pushing/pulling 40 pounds across a smooth surface. It can open only normal doors, drawers, lids, etc. The unseen servant cannot fight, nor can it be killed, as it is a force rather than a creature. It can be magically dispelled, or eliminated after receiving 6 points of damage from areaeffect spells, breath weapons, or similar attacks. If the caster attempts to send it beyond the allowed radius, the spell ends immediately.'
};

wiz1['Ventriloquism'] = {
    'name': 'Ventriloquism',
    'level': 'Level 1 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '[[{{[[10*#LEVLE#]],90}kl1}]] yards',
    'duration': '[[4+[[@{level-wizard}]] ]] rounds',
    'aoe': '1 creature or object',
    'components': 'V, M',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': 'A parchment rolled up into a small cone.',
    'reference': 'PHB p. 180',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to make his voice—or someone else’s voice—or a similar sound seem to issue from someplace else, such as from another creature, a statue, from behind a door, down a passage, etc. The spellcaster can speak in any language that he knows, or make any sound that he can normally make. With respect to such voices and sounds, anyone rolling a successful saving throw vs. spell with a –2 penalty detects the ruse. If cast in conjunction with other illusions, the DM may rule greater penalties or disallow an independent saving throw against this spell in consideration of its contribution to the total effect of the combined illusion.'
};

wiz1['Wall of Fog'] = {
    'name': 'Wall of Fog',
    'level': 'Level 1 Wizard',
    'school': 'Evocation',
    'range': '30 yards',
    'duration': '[[2d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '[[20+(10*[[@{level-wizard}]])]] feet cube',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A pinch of split dried peas.',
    'reference': 'PHB p. 180',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell, the wizard creates a billowing wall of misty vapors in any area within the spell range. The wall of fog obscures all sight, normal and infravision, beyond 2 feet. The caster may create less vapor if he wishes. The wall must be a roughly cubic or rectangular mass, at least 10 feet across in its smallest dimension. The misty vapors persist for three or more rounds. Their duration can be halved by a moderate wind, and they can be blown away by a strong wind.'
};

wiz1['Wizard Mark'] = {
    'name': 'Wizard Mark',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Up to 1 square foot',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A pinch of diamond dust (about 100 gp worth) and a pigment or pigments for the coloration of the mark. If the mark is to be invisible, the pigments are still used, but the caster uses a stylus of some sort rather than his finger.',
    'reference': 'PHB p. 179',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard is able to inscribe, visibly or invisibly, his personal rune or mark, as well as up to six additional characters of smaller size. A *wizard mark* spell enables the caster to etch the rune upon stone, metal, or any softer substance without harm to the material upon which the mark is placed. If an invisible mark is made, a *detect magic* spell will cause it to glow and be visible (though not necessarily understandable). *Detect invisibility*, *true seeing*, a *gem of seeing*, or a *robe of eyes* will likewise expose an invisible wizard mark. A *read magic* spell will reveal the maker’s words, if any. The mark cannot be dispelled, but it can be removed by the caster or by an *erase* spell. If cast on a living being, normal wear gradually causes the mark to fade.'
};

const wizardSpells = {};
wizardSpells['wiz1'] = wiz1;
/* ---- Wizard spells end ---- */