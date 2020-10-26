/* ---- Wizard spells start ---- */
const wiz1 = {};
wiz1['Affect Normal Fires'] = {
    'name': 'Affect Normal Fires',
    'level': 'Level 1 Wizard',
    'school': 'Alteration',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '10-foot radius',
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
    'aoe': 'Up tp 20-foot cube',
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
    'aoe': '60-foot radius',
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
    'aoe': '30 foot cube',
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
    'aoe': '20-foot radius',
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
    'effect': 'By means of this spell, the caster conjures a normal animal to serve him as a mount. The animal serves willingly and well, but at the expiration of the spell duration it disappears, returning to its own place. The type of mount gained by this spell depends on the level of the caster; of course, a caster can choose a lesser mount if desired. Available mounts include the following: \n&emsp;**Level**&emsp;**Mount** \n&emsp;1–3&emsp;&emsp;Mule or light horse \n&emsp;4–7&emsp;&emsp;Draft horse or war horse \n&emsp;8–12&emsp;&ensp;Camel \n&emsp;13–14&emsp;Elephant \n&emsp;15+&emsp;&emsp;Griffon  \n&emsp;The mount does not come with any riding gear, unless it is of a class lower than the caster would normally be entitled to; thus, a 4th-level wizard can gain a war horse without saddle and harness, or a light horse with saddle and harness. Elephants comes with howdah at 18th level. Griffon comes with saddle at 18th level. The statistics of the animal gained are typical of all creatures of the same class. The mount disappears when slain.'
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
    'aoe': '30 foot radius',
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
    'aoe': '30-foot radius',
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
    'aoe': '[[20+(10*[[@{level-wizard}]])]] foot cube',
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

let wiz2 = {};
wiz2['Alter Self'] = {
    'name': 'Alter Self',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[3d4+(2*[[@{level-wizard}]])]]',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 180',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard can alter his appearance and form—including clothing and equipment—to appear taller or shorter; thin, fat, or in between; human, humanoid, or any other generally man-shaped bipedal creature. The caster’s body can undergo a limited physical alteration and his size can be changed up to 50%. If the form selected has wings, the wizard can actually fly, but at only onethird the speed of a true creature of that type, and with a loss of two maneuverability classes (to a minimum of E). If the form has gills, the caster can breathe under water as long as the spell lasts. However, the caster does not gain any multiple attack routines or additional damage allowed to an assumed form. \n&emsp;The caster’s attack rolls, Armor Class, and saving throws do not change. The spell does not confer special abilities, attack forms, or defenses. Once the new form is chosen, it remains for the duration of the spell. The caster can change back into his own form at will; this ends the spell immediately. A caster who is slain automatically returns to his normal form.'
};

wiz2['Bind'] = {
    'name': 'Bind',
    'level': 'Level 2 Wizard',
    'school': 'Enchantment',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[50+(5*[[@{level-wizard}]])]] feet',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 181',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is employed, the wizard can command any nonliving ropelike object, including string, yarn, cord, line, rope, or even a cable. The spell affects 50 feet of normal rope (with a 1 inch diameter), plus 5 feet per caster level. This length is reduced by 50% for every additional inch of thickness and increased by 50% for each half-inch less. The possible commands are Coil (form a neat, coiled stack), Coil & Knot, Loop, Loop & Knot, Tie & Knot, and the reverses of all of the above (Uncoil, etc.). One command can be given each round. \n&emsp;The rope can only enwrap a creature or an object within 1 foot of it—it does not snake outward—so it must be thrown or hurled near the intended target. Note that the rope itself, and any knots tied in it, are not magical. A typical rope might be AC 6 and take 4 points of slashing damage before breaking. The rope does not inflict damage of any type, but it can be used as a trip line or to entangle a single opponent who fails a saving throw vs. spell.'
};

wiz2['Blindness'] = {
    'name': 'Blindness',
    'level': 'Level 2 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '[[30+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 181',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *blindness* spell causes the victim to become blind, able to see only a grayness before its eyes. Various *cure* spells will not remove this effect, and only a *dispel magic* or the spellcaster can do away with the blindness if the creature fails its initial saving throw vs. spell. A blinded creature suffers a –4 penalty to its attack rolls, and its opponents gain a +4 bonus to their attack rolls.'
};

wiz2['Blur'] = {
    'name': 'Blur',
    'level': 'Level 2 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '0',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 181',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *blur* spell is cast, the wizard causes the outline of his form to become blurred, shifting and wavering. This distortion causes all missile and melee combat attacks against the caster to be made with –4 penalties on the first attempt and –2 penalties on all successive attacks. It also grants the wizard a +1 bonus to his saving throw for any direct magical attack. A *detect invisibility* spell will not counter this effect, but the 5th-level priest spell *true seeing* and similar magic will.'
};

wiz2['Continual Light'] = {
    'name': 'Continual Light',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': '60 yards',
    'duration': 'Permanent',
    'aoe': '60-foot radius',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 181',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to a *light* spell, except that it is as bright as full daylight and lasts until negated by magical darkness or by a *dispel magic* spell. Creatures who suffer penalties in bright light suffer them in this spell’s area of effect. As with the *light* spell, it can be cast into the air, onto an object, or at a creature. When cast at a creature, the target gets a saving throw vs. spell; success indicates that the spell affects the space about 1 foot behind the creature instead. Note that this spell can also blind a creature if it is successfully cast upon the creature’s visual organs, reducing its attack rolls, saving throws, and Armor Class by 4. If the spell is cast on a small object that is then placed in a light-proof covering, the spell’s effects are blocked until the covering is removed. \n&emsp;A continual light brought into an area of magical darkness (or vice versa) is temporarily negated so that the otherwise prevailing light conditions exist in the overlapping areas of effect. A direct casting of *continual light* against a similar or weaker magical darkness cancels both. \n&emsp;This spell eventually consumes the material it is cast upon, but the process takes far longer than the time in the typical campaign. Extremely hard and expensive materials can last hundreds or even thousands of years.'
};

wiz2['Darkness, 15\' Radius'] = {
    'name': 'Darkness, 15\' Radius',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '1 turn + [[@{level-wizard}]] rounds',
    'aoe': '15-foot radius',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A bit of bat fur and either a drop of pitch or a piece of coal.',
    'reference': 'PHB p. 181',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes total, impenetrable darkness in the area of effect. Infravision is useless. Neither normal nor magical light works unless a *light* or *continual light* spell is used. In the former event, the *darkness* spell is negated by the *light* spell, and vice versa.'
};

wiz2['Deafness'] = {
    'name': 'Deafness',
    'level': 'Level 2 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '60 yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'Beeswax',
    'reference': 'PHB p. 181',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *deafness* spell causes the recipient to become totally deaf and unable to hear any sounds. The victim is allowed a saving throw vs. spell. An affected creature has a –1 penalty to its surprise rolls unless its other senses are unusually keen. Deafened spellcasters have a 20% chance to miscast any spell with a verbal component. This *deafness* can be done away with only by means of a *dispel magic* spell or by the spellcaster.'
};

wiz2['Deeppockets'] = {
    'name': 'Deeppockets',
    'level': 'Level 2 Wizard',
    'school': 'Ateration, Enchantment',
    'range': 'Touch',
    'duration': '[[12+[[@{level-wizard}]] ]] hours',
    'aoe': '1 garment',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'In addition to the garment, which is reusable, the material components of this spell are a tiny golden needle and a strip of fine cloth given a half-twist and fastened at the ends.',
    'reference': 'PHB p. 182',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to specially prepare a garment so as to hold far more than it normally could. A finely sewn gown or robe of high-quality material (at least 50 gp value) is fashioned so as to contain numerous hand-sized pockets. One dozen is the minimum number. The *deeppockets* spell then enables these pockets to hold a total of 100 pounds (5 cubic feet in volume) as if it were only 10 pounds of weight. Furthermore, there are no discernible bulges where the special pockets are. At the time of casting, the caster can instead choose to have 10 pockets each holding 10 pounds (1⁄2 cubic foot volume each). If the robe or like garment is sewn with 100 or more pockets (200 gp minimum cost), 100 pockets can be created to contain one pound of weight and 1⁄6 cubic foot volume each. Each special pocket is actually an extradimensional holding space. \n&emsp;If the spell duration expires while there is material within the enchanted pockets, or if a successful *dispel magic* is cast upon the enchanted garment, all the material suddenly appears around the wearer and immediately falls to the ground. The caster can also cause all the pockets to empty with a single command.'
};

wiz2['Detect Evil'] = {
    'name': 'Detect Evil',
    'level': 'Level 2 Wizard',
    'school': 'Divination',
    'range': '0',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': '10 x 180 feet',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 182',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell discovers emanations of evil (or of good in the case of the reverse spell) from any creature, object, or area. Character alignment is *not* revealed under most circumstances: Characters who are strongly aligned, do not stray from their faith, and who are at least 9th level might radiate good or evil if they are intent upon appropriate actions. Powerful monsters, such as ki-rin, send forth emanations of evil or good, even if polymorphed. Aligned undead radiate evil, for it is this power and negative force that enables them to continue existing. An evilly cursed object or unholy water radiates evil, but a hidden trap or an unintelligent viper does not. The degree of evil (faint, moderate, strong, overwhelming) can be noted. Note that priests have a more powerful version of this spell. The spell has a path of detection 10 feet wide and 60 yards long in the direction in which the wizard is facing. The wizard must concentrate— stop, have quiet, and intently seek to detect the aura—for at least one round to receive a reading.'
};

wiz2['Detect Invisibility'] = {
    'name': 'Detect Invisibility',
    'level': 'Level 2 Wizard',
    'school': 'Divination',
    'range': '0',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': '[[10*[[@{level-wizard}]] ]] yards',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A pinch of talc and a small sprinkling of powdered silver.',
    'reference': 'PHB p. 182',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the wizard casts a *detect invisibility* spell, he is able to see clearly any objects or beings that are invisible, as well as any that are astral, ethereal, or out of phase. In addition, it enables the wizard to detect hidden or concealed creatures (for example, thieves in shadows, halflings in underbrush, and so on). It does not reveal the method of concealment or invisibility, except in the case of astral travelers (where the silver cord can be seen). It does not reveal illusions or enable the caster to see through physical objects. Detection is a path 10 ft. wide along the wizard’s line of sight to the range limit.'
};

wiz2['ESP'] = {
    'name': 'ESP',
    'level': 'Level 2 Wizard',
    'school': 'Divination',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[{{5*[[@{level-wizard}]],90}kl1}]] yards. (90 yards maximum)',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A copper piece.',
    'reference': 'PHB p. 182',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When an *ESP* spell is used, the caster is able to detect the surface thoughts of any creatures in range—except for those of undead and creatures without minds (as we know them). The ESP is stopped by 2 feet of rock, 2 inches of any metal other than lead, or a thin sheet of lead foil. \n&emsp;The wizard employing the spell is able to probe the surface thoughts of one creature per round, getting simple instinctual thoughts from lower order creatures. Probes can continue on the same creature from round to round or can move on to other creatures. The caster can use the spell to help determine if a creature lurks behind a door, for example, but the ESP does not always reveal what sort of creature it is. If used as part of a program of interrogation, an intelligent and wary subject receives an initial saving throw. If successful, the creature successfully resists and the spell reveals no additional information. If the saving throw is failed, the caster may learn additional information, according to the DM’s ruling. The creature’s Wisdom adjustment applies, as may additional bonuses up to +4, based on the sensitivity of the information sought.'
};

wiz2['Flaming Sphere'] = {
    'name': 'Flaming Sphere',
    'level': 'Level 2 Wizard',
    'school': 'Evocation',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '3-foot radius',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A bit of tallow, a pinch of sulphur, and a dusting of powdered iron.',
    'reference': 'PHB p. 182',
    'damage': 'Direct contact: 2d4 Fire. 5 feet proximity: 1d4',
    'damage-type': 'Heat',
    'healing': '',
    'effect': 'A *flaming sphere* spell creates a burning globe of fire within 10 yards of the caster. This sphere rolls in whichever direction the wizard points, at a rate of 30 feet per round. It rolls over barriers less than 4 feet tall, such as furniture, low walls, etc. Flammable substances are set afire by contact with the sphere. Creatures in contact with the globe must successfully save vs. spell or suffer 2d4 points of fire damage. Those within 5 feet of the sphere’s surface must also save or suffer 1d4 points of heat damage. A successful saving throw means no damage is suffered. The DM may adjust the saving throws if there is little or no room to dodge the sphere. \n&emsp;The sphere moves as long as the spellcaster actively directs it; otherwise, it merely stays at rest and burns. It can be extinguished by the same means as any normal fire of its size. The surface of the sphere has a spongy, yielding consistency and so does not cause damage except by its flame. It cannot push unwilling creatures aside or batter down large obstacles.'
};

wiz2['Fog Cloud'] = {
    'name': 'Fog Cloud',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': '10 yards',
    'duration': '[[4+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 183',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *fog cloud* spell can be cast in one of two ways, at the caster’s option: as a large, stationary bank of normal fog, or as a harmless fog that resembles the 5th-level wizard spell *cloudkill*. \n&emsp;As a fog bank, this spell creates a fog of any size and shape up to a maximum 20-foot cube per caster level. The fog obscures all sight, normal and infravision, beyond 2 feet. \n&emsp;As a cloudkill-like fog, this is a billowing mass of ghastly, yellowishgreen vapors, measuring 40 feet × 20 feet × 20 feet. This moves away from the caster at 10 feet per round. The vapors are heavier than air and sink to the lowest level, even pouring down sinkholes and den openings. Very thick vegetation breaks up the fog after it has moved 20 feet into the vegetation. \n&emsp;The only effect of either version is to obscure vision. A strong breeze will disperse either effect in one round, while a moderate breeze will reduce the spell duration by 50%. The spell cannot be cast under water.'
};

wiz2['Fools\' Gold'] = {
    'name': 'Fools\' Gold',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[10*[[@{level-wizard}]] ]] cubic inches',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'Copper coins or brass items.',
    'reference': 'PHB p. 183',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Copper coins can temporarily be changed to gold pieces, or brass items turned to solid gold, for the spell duration by means of this magic. The area of effect is 10 cubic inches per level—i.e., a 1-inch × 1-inch × 10-inch volume or equivalent, equal to about 150 gold coins. (Current max is about [[150*[[@{level-wizard}]] ]]). Any creature viewing the “gold” is entitled to a saving throw vs. spell, which can be modified by the creature’s Wisdom; for every level of the wizard, the creature must subtract 1 from his dice roll. Thus, it is unlikely that fools’ gold will be detected if created by a high-level caster. If the “gold” is struck hard by an object of cold-wrought iron, there is a slight chance it will revert to its natural state, depending on the material component used to create the “gold.” If a 25-gp citrine is powdered and sprinkled over the metal as this spell is cast, the chance that cold iron will return it to its true nature is 30%; if a 50-gp amber stone is powdered and used, the chance drops to 25%; if a 250-gp topaz is powdered and used, the chance drops to 10%; and if a 500-gp oriental (corundum) topaz is powdered and used, there is only a 1% chance that the cold iron will reveal that it is fools’ gold.'
};

wiz2['Forget'] = {
    'name': 'Forget',
    'level': 'Level 2 Wizard',
    'school': 'Enchantment/Charm',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '1-4 creatures in a 20-foot cube',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 183',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the spellcaster causes creatures within the area of effect to forget the events of the previous minute (the one minute of time previous to the utterance of the spell). For every three levels of experience of the spellcaster, another minute of past time is forgotten ([[1+floor([[@{level-wizard}]]/3)]] minutes). This does not negate *charm*, *suggestion*, *geas*, *quest*, or similar spells, but it is possible that the being who placed such magic upon the recipient could be forgotten. From one to four creatures can be affected, at the discretion of the caster. If only one is to be affected, the recipient saves vs. spell with a –2 penalty; if two, they save with –1 penalties; if three or four are to be affected, they save normally. All saving throws are adjusted by Wisdom. A priest’s *heal* or *restoration* spell, if specially cast for this purpose, will restore the lost memories, as will a *limited wish* or *wish*, but no other means will do so.'
};

wiz2['Glitterdust'] = {
    'name': 'Glitterdust',
    'level': 'Level 2 Wizard',
    'school': 'Conjuration/Summoning',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '20 foot cube',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': 'Ground mica',
    'reference': 'PHB p. 183',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a cloud of glittering golden particles within the area of effect. Those in the area must roll a successful saving throw vs. spell or be blinded (–4 penalties to attack rolls, saving throws, and Armor Class) for [[1d4+1]] rounds. In addition, all within the area are covered by the dust, which cannot be removed and continues to sparkle until it fades. Note that this reveals invisible creatures. The dust fades in 1d4 rounds plus one round per caster level. Thus, glitterdust cast by a 3rd-level wizard lasts for four to seven rounds. Dust fades in [[1d4+[[@{level-wizard}]] ]] rounds.'
};

wiz2['Hypnotic Pattern'] = {
    'name': 'Hypnotic Pattern',
    'level': 'Level 2 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': '30-foot cube',
    'components': 'S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A glowing stick of incense or a crystal rod filled with phosphorescent material.',
    'reference': 'PHB p. 183',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard creates a weaving, twisting pattern of subtle colors in the air. This pattern causes any creature looking at it to become fascinated and stand gazing at it as long as the spellcaster maintains the display, plus two rounds thereafter. The spell can captivate a maximum of 24 levels, or Hit Dice, of creatures (for example, 24 creatures with 1 Hit Die each, 12 with 2 Hit Dice, etc.). All creatures affected must be within the area of effect, and each is entitled to a saving throw vs. spell. A damage-inflicting attack on an affected creature frees it from the spell immediately. \n&emsp;The wizard need not utter a sound, but he must gesture appropriately while holding a glowing stick of incense or a crystal rod filled with phosphorescent material.'
};

wiz2['Improved Phantasmal Force'] = {
    'name': 'Improved Phantasmal Force',
    'level': 'Level 2 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '[[60+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Special',
    'aoe': '[[200+(50*[[@{level-wizard}]])]] square feet',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': 'A bit of fleece.',
    'reference': 'PHB p. 184',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Like the 1st-level *phantasmal force* spell, this spell creates the illusion of any object, creature, or force, as long as it is within the spell’s area of effect. The spellcaster can maintain the illusion with minimal concentration; thus, he can move at half normal speed (but not cast other spells). Some minor sounds are included in the effects of the spell, but not understandable speech. Also, the improved phantasm continues for two rounds after the wizard ceases to concentrate upon it.'
};

wiz2['Invisibility'] = {
    'name': 'Invisibility',
    'level': 'Level 2 Wizard',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'An eyelash and a bit of gum arabic, the former encased in the latter.',
    'reference': 'PHB p. 184',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes the creature touched to vanish from sight and be undetectable by normal vision or even infravision. Of course, the invisible creature is not magically silenced, and certain other conditions can render the creature detectable. Even allies cannot see the invisible creature or his gear, unless these allies can normally see invisible things or employ magic to do so. Items dropped or put down by the invisible creature become visible; items picked up disappear if tucked into the clothing or pouches worn by the creature. Note, however, that light never becomes invisible, although a source of light can become so (thus, the effect is that of a light with no visible source). \n&emsp;The spell remains in effect until it is magically broken or dispelled, until the wizard or recipient cancels it, until the recipient attacks any creature, or until 24 hours have passed. Thus, the invisible being can open doors, talk, eat, climb stairs, etc., but if he attacks, he immediately becomes visible, although the invisibility enables him to attack first. Note that the priest spells *bless*, *chant*, and *prayer* are not attacks for this purpose. All highly Intelligent (Intelligence 13 or more) creatures with 10 or more Hit Dice or levels of experience have a chance to detect invisible objects (they roll saving throws vs. spell; success means they noticed the invisible object).'
};

wiz2['Irritation'] = {
    'name': 'Irritation',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '1-4 creatures in a 15-foot radius',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A leaf from poison ivy, oak, or sumac.',
    'reference': 'PHB p. 184',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'An *irritation* spell affects the epidermis of the subject creatures. Creatures with very thick or insensitive skins (such as buffalo, elephants, scaled creatures, etc.) are basically unaffected. There are two versions of the spell, either of which can be cast from the standard preparation: \n&emsp;*Itching*. When cast, this causes each subject to feel an instant itching sensation on some portion of its body. If one round is not immediately spent scratching the irritated area, the creature is so affected that the next three rounds are spent squirming and twisting, effectively worsening its Armor Class by 4 and its attack rolls by 2 during this time. Spell preparations are ruined in the first round this spell is in effect, but not in the following three rounds. Doing nothing but scratching the itch for a full round prevents the rest of the effect. If cast at one creature, the saving throw has a –3 penalty; if cast at two creatures, the saving throw has a –1 penalty; and if cast at three or four creatures, the saving throw is normal. \n&emsp;*Rash*. When a rash is cast, the subject notices nothing for 1d4 rounds, but thereafter its entire skin breaks out in red welts that itch. The rash persists until either a *cure disease* or *dispel magic* spell is cast upon it. It lowers Charisma by 1 point per day for each of four days (i.e., maximum Charisma loss is 4 points). After one week, Dexterity is lowered by 1 point also. Symptoms vanish immediately upon the removal of the rash, and all statistics return to normal. This can be cast at one creature only, with a saving throw penalty of –2.'
};

wiz2['Knock'] = {
    'name': 'Knock',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': '60yards',
    'duration': 'Special',
    'aoe': '[[10*[[@{level-wizard}]] ]] feet',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 184',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *knock* spell opens stuck, barred, locked, held, or wizardlocked doors. It opens secret doors, as well as locked or trick-opening boxes or chests. It also loosens welds, shackles, or chains. If used to open a wizard-locked door, the spell does not remove the former spell, but simply suspends its functioning for one turn. In all other cases, it permanently opens locks or welds—although the former could be closed and locked again later. It does not raise barred gates or similar impediments (such as a portcullis), nor does it affect ropes, vines, and the like. Note that the effect is limited by the area; a 3rd-level wizard can cast a knock spell on a door of 30 square feet or less (for example, a standard 4-ft. × 7-ft. door). Each spell can undo up to two means of preventing egress through a portal. Thus if a door is locked, barred, and held, or triple locked, opening it requires two *knock* spells. In all cases, the location of the door or item must be known—the spell cannot be used against a wall in hopes of discovering a secret door. \n&emsp;The reverse spell, *lock*, closes and locks a door or similar closure, provided there is a physical mechanism. It does not create a weld, but it locks physically operated locking mechanisms, set bars, and so on, up to two functions. It cannot affect a portcullis.'
};

wiz2['Know Alignment'] = {
    'name': 'Know Alignment',
    'level': 'Level 2 Wizard',
    'school': 'Divination',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '1 creature or object per 2 rounds',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 185',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *know alignment* spell enables the wizard to read the aura of a creature or an aligned object (unaligned objects reveal nothing). The caster must remain stationary and concentrate on the subject for two full rounds. A creature is allowed a saving throw vs. spell and, if successful, the caster learns nothing about that particular creature from the casting. If the caster concentrates on a creature or object for only one round, he can learn only its alignment with respect to law and chaos. Certain magical devices negate the *know alignment* spell. \n&emsp;The reverse, *undetectable alignment*, conceals the alignment of an object or creature for 24 hours—even from a know alignment spell.'
};

wiz2['Leomund\'s Trap'] = {
    'name': 'Leomund\'s Trap',
    'level': 'Level 2 Wizard',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Object touched',
    'components': 'V, S, M',
    'cast-time': '3 rounds',
    'saving-throw': 'None',
    'materials': 'A piece of iron pyrite.',
    'reference': 'PHB p. 185',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This false trap is designed to fool a thief or other character attempting to pilfer the spellcaster’s goods. The wizard places the spell upon any small mechanism or device, such as a lock, hinge, hasp, screw-on cap, ratchet, etc. Any character able to detect traps, or who uses any spell or device enabling trap detection, is 100% certain a real trap exists. Of course, the spell is illusory and nothing happens if the trap is sprung; its primary purpose is to frighten away thieves or make them waste precious time. \n&emsp;The material component of the spell is a piece of iron pyrite touched to the object to be trapped while the object is sprinkled with a special dust requiring 200 gp to prepare. If another *Leomund’s trap* is within 50 feet when the spell is cast, the casting fails.'
};

wiz2['Levitate'] = {
    'name': 'Levitate',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': '[[20*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '1 creature or object',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'Either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end.',
    'reference': 'PHB p. 185',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *levitate* spell is cast, the wizard can place it upon his person, an object, or a single creature, subject to a maximum weight limit of 100 pounds per level of experience (for example, a 3rd-level wizard can levitate a maximum of 300 pounds. Current max: [[100*[[@{level-wizard}]] ]] pounds). If the spell is cast upon the wizard, he can move vertically up or down at a movement rate of 2 per round. If cast upon an object or another creature, the wizard can levitate it at the same speed, according to his command. This spell does not empower horizontal movement, but the recipient could push along the face of a cliff, for example, to move laterally. The spellcaster can cancel the spell as desired. If the subject of the spell is unwilling, or the object is in the possession of a creature, a saving throw vs. spell is allowed to determine if the *levitate* spell affects it. \n&emsp;Once cast, the spell requires no concentration, except when changing height. A levitating creature attempting to use a missile weapon finds himself increasingly unstable; the first attack has an attack roll penalty of –1, the second –2, the third –3, etc., up to a maximum of –5. A full round spent stabilizing allows the creature to begin again at –1. Lack of leverage makes it impossible to cock a medium or heavy crossbow.'
};

wiz2['Locate Object'] = {
    'name': 'Locate Object',
    'level': 'Level 2 Wizard',
    'school': 'Divination',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[20*[[@{level-wizard}]] ]] yards',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '*Locate object*:A forked twig. / *Obscure object*: A chameleon skin.',
    'reference': 'PHB p. 185',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell aids in locating a known or familiar object. The wizard casts the spell, slowly turns, and senses when he is facing in the direction of the object to be located, provided the object is within range (i.e., 60 yards for 3rd-level wizards, 80 yards for 4th, 100 yards for 5th, etc.). The spell can locate such objects as apparel, jewelry, furniture, tools, weapons, or even a ladder or stairway. Note that attempting to find a specific item, such as jewelry or a crown, requires an accurate mental image; if the image is not close enough to the actual, the spell does not work. Desired but unique objects cannot be located by this spell unless they are known by the caster. The spell is blocked by lead. Creatures cannot be found by this spell. \n&emsp;The reversal, obscure object, hides an object from location by spell, crystal ball, or similar means for eight hours. Creatures cannot be affected by this spell.'
};

wiz2['Magic Mouth'] = {
    'name': 'Magic Mouth',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '1 object',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A small bit of honeycomb.',
    'reference': 'PHB p. 185',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard imbues the chosen object with an enchanted mouth that suddenly appears and speaks its message when a specified event occurs. The message, which must be of 25 words or less, can be in any language known by the spellcaster, and can be delivered over a period of one turn. The mouth cannot speak magical spells or use command words. It does, however, move to the words articulated—if it is placed upon a statue, the mouth of the statue would actually move and appear to speak. Of course, the magic mouth can be placed upon a tree, rock, door, or any other object, excluding intelligent members of the animal or vegetable kingdoms. \n&emsp;The spell functions when specific conditions are fulfilled, according to the command of the spellcaster. Some examples are to speak “to the first creature that touches you,” or “to the first creature that passes within 30 feet.” Commands can be as general or as detailed as desired, although only visual and audible triggers can be used, such as the following: “Speak only when a venerable female human carrying a sack of groat clusters sits crosslegged within 1 foot.” Such visual triggers can react to a character using the *disguise* ability. Command range is 5 yards per level of the wizard ([[5*[[@{level-wizard}]] ]] yards), so a 6th-level wizard can command the magic mouth to speak at a maximum encounter range of 30 yards (“Speak when a winged creature comes within 30 yards.”). The spell lasts until the speak command can be fulfilled; thus, the spell duration is variable. A magic mouth cannot distinguish invisible creatures, alignments, level, Hit Dice, or class, except by external garb. If desired, the effect can be keyed to a specific noise or spoken word.'
};

wiz2['Melf\'s Acid Arrow'] = {
    'name': 'Melf\'s Acid Arrow',
    'level': 'Level 2 Wizard',
    'school': 'Conjuration',
    'range': '180 yards',
    'duration': 'Special',
    'aoe': '1 target',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': 'A dart, powdered rhubarb leaf, and an adder’s stomach.',
    'reference': 'PHB p. 186',
    'damage': 'Per round: 2d4',
    'damage-type': 'Acid',
    'healing': '',
    'effect': 'By means of this spell, the wizard creates a magical arrow that speeds to its target as if fired from the bow of a fighter of the same level as the wizard. No modifiers for range, nonproficiency, or specialization are used. The arrow has no attack or damage bonus, but it inflicts 2d4 points of acid damage (with saving throws for items on the target); there is no splash damage. For every three levels that the caster has achieved, the acid, unless somehow neutralized, lasts for another round, inflicting another 2d4 points of damage each round. So at 3rd–5th level, the acid lasts two rounds; at 6th–8th level, the acid lasts for three rounds, etc. Currently [[1+floor([[@{level-wizard}]]/3)]] rounds.'
};

wiz2['Mirror Image'] = {
    'name': 'Mirror Image',
    'level': 'Level 2 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '0',
    'duration': '[[3*[[@{level-wizard}]] ]] rounds',
    'aoe': '6-foot radius',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 186',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *mirror image* spell is invoked, the spellcaster causes from two to eight exact duplicates of himself to come into being around him. These images do exactly what the wizard does. Since the spell causes a blurring and slight distortion when it is cast, it is impossible for opponents to be certain which are the illusions and which is the actual wizard. When an image is struck by a melee or missile attack, magical or otherwise, it disappears, but any other existing images remain intact until struck. The images seem to shift from round to round, so that if the actual wizard is struck during one round, he cannot be picked out from among his images the next. To determine the number of images that appear, roll 1d4 and add 1 for every three levels of experience the wizard has achieved, to a maximum of eight images ([[{{[[1d4+floor([[@{level-wizard}]]/3)]],8}kl1}]] images). At the end of the spell duration, all surviving images wink out.'
};

wiz2['Misdirection'] = {
    'name': 'Misdirection',
    'level': 'Level 2 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': '8 hours',
    'aoe': '1 creature or object',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 186',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard misdirects the information from a detection spell (*detect charm, detect evil, detect invisibility, detect lie, detect magic, detect snares and pits*, etc.). While the detection spell functions, it indicates the wrong area, creature, or the opposite of the truth with respect to *detect evil* or *detect lie*. The wizard directs the spell effect upon the object of the detection spell. If the caster of the detection spell fails his saving throw vs. spell, the misdirection takes place. Note that this spell does not affect other types of divination (*know alignment, augury, ESP, clairvoyance*, etc.).'
};

wiz2['Protection From Cantrips'] = {
    'name': 'Protection From Cantrips',
    'level': 'Level 2 Wizard',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '[[5+[[@{level-wizard}]] ]] hours',
    'aoe': 'Creature or object touched',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 186',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell, the wizard receives immunity to the effects of cantrips cast by other wizards, apprentices, or creatures that use the *cantrip* spell. The spell protects the caster, or one item or person that he touches (such as a spell book or a drawer containing spell components). Any cantrip cast against the protected person or item dissipates with an audible popping sound. This spell is often used by a wizard who has mischievous apprentices, or one who wishes apprentices to clean or shine an area using elbow grease rather than magic. Any unwilling target of this spell must be touched (via an attack roll) and is allowed a saving throw vs. spell to escape the effect.'
};

wiz2['Pyrotechnics'] = {
    'name': 'Pyrotechnics',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': '120 yards',
    'duration': 'Special',
    'aoe': '1 fire source',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'One fire source within a 20-foot cube',
    'reference': 'PHB p. 186',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *pyrotechnics* spell draws on an existing fire source to produce one of two effects, at the option of the caster. First, it can produce a flashing and fiery burst of glowing, colored aerial fireworks that lasts one round. This effect temporarily blinds those creatures in, under, or within 120 feet of the area and that have an unobstructed line of sight to the burst. Creatures viewing this are blinded for 1d4+1 rounds unless they successfully save vs. spell. The fireworks fill a volume 10 times greater than that of the original fire source. \n&emsp;This spell can also cause a thick, writhing stream of smoke to arise from the source and form a choking cloud that lasts for one round per experience level of the caster. This covers a roughly spherical volume from the ground or floor up (or conforming to the shape of a confined area) that totally obscures vision beyond 2 feet. The smoke fills a volume 100 times that of the fire source. All within the cloud must roll successful saving throws vs. spell or suffer –2 penalties to all combat rolls and Armor Class. \n&emsp;The spell uses one fire source within a 20-foot cube, which is immediately extinguished. An extremely large fire used as a source might be only partially extinguished. Magical fires are not extinguished, although a fire-based creature (such as a fire elemental) used as a source suffers 1 point of damage per caster level.'
};

wiz2['Ray of Enfeeblement'] = {
    'name': 'Ray of Enfeeblement',
    'level': 'Level 2 Wizard',
    'school': 'Enchantment/Charm',
    'range': '[[10+(5*[[@{level-wizard}]])]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 187',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *ray of enfeeblement*, a wizard weakens an opponent, reducing its Strength and thereby the attacks that rely upon it. Humans, demihumans, and humanoids of man-size or less are reduced to an effective Strength of 5, losing all Strength bonuses and suffering an attack roll penalty of –2 and a –1 penalty to damage. Other creatures suffer a penalty of –2 on attack rolls. Furthermore, they have a –1 penalty for each die of damage they inflict. (But no damage roll can inflict less than 1 point per die of damage.) Your DM will determine any other effects appropriate to the affected creature. If the target creature makes its saving throw, the spell has no effect. This spell does not affect combat bonuses due to magical items, and those conferring increased Strength function normally.'
};

wiz2['Rope Tricks'] = {
    'name': 'Rope Tricks',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[2*[[@{level-wizard}]] ]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'Powdered corn extract and a twisted loop of parchment.',
    'reference': 'PHB p. 187',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast upon a piece of rope from 5 to 30 feet long, one end of the rope rises into the air until the whole rope hangs perpendicular, as if affixed at the upper end. The upper end is, in fact, fastened to an extradimensional space. The spellcaster and up to seven others can climb up the rope and disappear into this place of safety where no creature can find them. The rope can be taken into the extradimensional space if fewer than eight persons have climbed it; otherwise, it simply stays hanging in the air (extremely strong creatures might be able to remove it, at the DM’s option). Spells cannot be cast across the interdimensional interface, nor can area effects cross it. Those in the extradimensional space can see out of it as if there were a 3-foot × 5-foot window centered on the rope. The persons in the extradimensional space must climb down prior to the end of the spell, or they are dropped from the height at which they entered the extradimensional space. The rope can be climbed by only one person at a time. Note that the *rope trick* spell enables climbers to reach a normal place if they do not climb all the way to the extradimensional space. Also note that creating or taking extradimensional spaces into an existing extradimensional space is hazardous.'
};

wiz2['Scare'] = {
    'name': 'Scare',
    'level': 'Level 2 Wizard',
    'school': 'Enchantment/Charm',
    'range': '[[30+(10*[[@{level-wizard}]])]] yards',
    'duration': '[[1d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '15-foot radius',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': 'A bit of bone from an undead skeleton, zombie, ghoul, ghast, or mummy.',
    'reference': 'PHB p. 187',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes creatures with fewer than 6 Hit Dice or levels of experience to fall into fits of trembling and shaking. The frightened creatures have a –2 reaction adjustment and may drop items held if encumbered. If cornered, they fight, but with –1 penalties to attack rolls, damage rolls, and saving throws. \n&emsp;Only elves, half-elves, and priests are allowed saving throws against this spell. Note that this spell has no effect on the undead (skeletons, zombies, ghouls, and so on), or on upper or lower planar creatures of any sort.'
};

wiz2['Shatter'] = {
    'name': 'Shatter',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': '[[30+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Instantaneous',
    'aoe': '3-foot radius',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A chip of mica.',
    'reference': 'PHB p. 188',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *shatter* spell is a sound-based attack that affects nonmagical objects of crystal, glass, ceramic, or porcelain, such as vials, bottles, flasks, jugs, windows, mirrors, etc. All such objects within a 3-foot radius of the center of the spell effect are smashed into dozens of pieces by the spell. Objects weighing more than one pound per level of the caster ([[@{level-wizard}]] pounds) are not affected, but all other objects of the appropriate composition must save vs. crushing blow or be shattered. Alternatively, the spell can be focused against a single item of up to 10 pounds per caster level. Crystalline creatures usually suffer 1d6 points of damage per caster level to a maximum of 6d6, with a saving throw vs. spell for half damage.'
};

wiz2['Spectral Hand'] = {
    'name': 'Spectral Hand',
    'level': 'Level 2 Wizard',
    'school': 'Necromancy',
    'range': '[[30+(5*[[@{level-wizard}]])]] yards',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '1 opponent',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A chip of mica.',
    'reference': 'PHB p. 188',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes a ghostly, glowing hand, shaped from the caster’s life force, to materialize within the spell range and move as the caster desires. Any touch attack spell of 4th level or less that is subsequently cast by the wizard can be delivered by the spectral hand. The spell gives the caster a +2 bonus to his attack roll. The caster cannot perform any other actions when attacking with the hand; the hand returns to the caster and hovers if the caster takes other actions. The hand lasts the full spell duration unless dismissed by the caster, and it is possible to use more than one touch attack with it. The hand receives flank and rear attack bonuses if the caster is in a position to do so. The hand is vulnerable to magical attack but has an Armor Class of –2. Any damage to the hand ends the spell and inflicts 1d4 points of damage to the caster.'
};

wiz2['Stinking Cloud'] = {
    'name': 'Stinking Cloud',
    'level': 'Level 2 Wizard',
    'school': 'Evocation',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '20-foot cube',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': 'A rotten egg or several skunk cabbage leaves.',
    'reference': 'PHB p. 188',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *stinking cloud* is cast, the wizard creates a billowing mass of nauseous vapors up to 30 yards away from his position. Any creature caught within the cloud must roll a successful saving throw vs. poison or be reeling and unable to attack because of nausea for 1d4+1 rounds after leaving the cloud. Those who make successful saving throws can leave the cloud without suffering any ill effects, although those remaining in the cloud must continue to save each round. These poisonous effects can be slowed or neutralized by appropriate magic. The cloud duration is halved in a moderate breeze (8–18 m.p.h.) and is dispersed in one round by a stronger breeze.'
};

wiz2['Strength'] = {
    'name': 'Strength',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': 'Person touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A few hairs, or a pinch of dung, from a particularly strong animal—ape, bear, ox, etc.',
    'reference': 'PHB p. 188',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Application of this spell increases the Strength of the character by  a number of points—or tenths of points after 18 Strength is attained  (only if the character is a warrior). Benefits of the strength spell last  for the duration of the magic. The amount of added Strength  depends upon the spell recipient’s group and is subject to all restrictions  on Strength due to race and class. Multiclass characters use the  best die. \n&emsp;&emsp;**Class**&emsp;&emsp;**Strength Gain** \n&emsp;&emsp;Priest&emsp;&emsp;1d6 points \n&emsp;&emsp;Rogue&emsp;&ensp;&thinsp;1d6 points \n&emsp;&emsp;Warrior&emsp;&thinsp;1d8 points \n&emsp;&emsp;Wizard&emsp;&ensp;1d4 points \n&emsp;If a warrior has an 18 Strength already, from 10% to 80% is  added to his extraordinary Strength roll. The spell cannot confer a  Strength of 19 or more, nor is it cumulative with other magic that  adds to Strength. Beings without Strength scores (kobolds, lizard  men, etc.) receive a +1 to attack and damage rolls.'
};

wiz2['Summon Swarm'] = {
    'name': 'Summon Swarm',
    'level': 'Level 2 Wizard',
    'school': 'Conjuration/Summoning',
    'range': '60 yards',
    'duration': 'Special',
    'aoe': '10-foot cube',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A square of red cloth.',
    'reference': 'PHB p. 188',
    'damage': '1 damage per round defending else 1d4+[[@{level-wizard}]] ',
    'damage-type': '',
    'healing': '',
    'effect': 'The swarm of small animals (roll on following table to determine type, or the DM can assign an appropriate creature) drawn by the *summon swarm* spell will viciously attack all creatures in the area chosen by the caster. Creatures actively defending against the swarm to the exclusion of other activities suffer 1 point of damage for each round spent in the swarm. Those taking other actions, including leaving the swarm, receive damage equal to 1d4 points + 1 point per three levels of the caster each round. Note that spellcasting within the swarm is impossible. \n&emsp;&emsp;**Dice Roll**&emsp;**Swarm Type** \n&emsp;&emsp;01–40&emsp;&emsp;&emsp;Rats \n&emsp;&emsp;41–70&emsp;&emsp;&emsp;Bats \n&emsp;&emsp;71–80&emsp;&emsp;&emsp;Spiders \n&emsp;&emsp;81–90&emsp;&emsp;&emsp;Centipedes/beetles \n&emsp;&emsp;91–100&emsp;&emsp;&ensp;Flying insects \n&emsp;The swarm cannot be fought effectively with weapons, but fire and area effects can force it to disperse by inflicting damage. The swarm disperses when it has taken a total of 2 hit points per caster level from these attacks. A *protection from evil* spell keeps the swarm at bay, and certain area-effect spells, such as *gust of wind* and *stinking cloud*, disperse a swarm immediately, if appropriate to the swarm summoned (for example, only flyers are affected by a *gust of wind*). The caster must remain stationary and undisturbed to control the swarm; if his concentration lapses or is broken, the swarm disperses in two rounds. The swarm is stationary once conjured.'
};

wiz2['Tasha\'s Uncontrollable Hideous Laughter'] = {
    'name': 'Tasha\'s Uncontrollable Hideous Laughter',
    'level': 'Level 2 Wizard',
    'school': 'Enchantment/Charm',
    'range': '60 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '1 or more creatures in a 30-foot cube',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A small feather and minute tarts.',
    'reference': 'PHB p. 189',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The victim of this spell perceives everything as hilariously funny. The effect is not immediate, and the creature feels only a slight tingling on the round the spell is cast. On the round immediately following, the victim begins smiling, then giggling, chuckling, tittering, snickering, guffawing, and finally collapsing into gales of uncontrollable, hideous laughter. Although this magical mirth lasts only a single round, the affected creature must spend the next round regaining its feet, and it loses 2 points from its Strength (or –2 to attack and damage rolls) for all remaining rounds of the spell. \n&emsp;The saving throw vs. spell is modified by the Intelligence of the creature. Creatures with Intelligences of 4 or less (semi-intelligent) are totally unaffected. Those with Intelligences of 5–7 (low) save with –6 penalties. Those with Intelligences of 8–12 (average to very) save with –4 penalties. Those with Intelligences of 13–14 (high) save with –2 penalties. Those with Intelligences of 15 or greater (exceptional) have unmodified saving throws. \n&emsp;The caster can affect one creature for every three levels attained ([[floor([[@{level-wizard}]]/3)]] creatures)— for example, one at 3rd level, two at 6th level, three at 9th level, etc. All affected beings must be within 30 feet of each other. \n&emsp;The material components are a small feather and minute tarts. The tarts are hurled at the subjects, while the feather is waved in one hand.'
};

wiz2['Web'] = {
    'name': 'Web',
    'level': 'Level 2 Wizard',
    'school': 'Evocation',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[2*[[@{level-wizard}]] ]] turns',
    'aoe': '8000 cubic feet',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate or ½',
    'materials': 'A bit of spider web.',
    'reference': 'PHB p. 189',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *web* spell creates a many-layered mass of strong, sticky strands similar to spider webs but far larger and tougher. These masses must be anchored to two or more solid and diametrically opposed points— floor and ceiling, opposite walls, etc.—or the web collapses upon itself and disappears. \n&emsp;The *web* spell covers a maximum area of eight 10-foot × 10-foot × 10-foot cubes and the webs must be at least 10 feet thick, so a mass 40 feet high, 20 feet wide, and 10 feet deep may be cast. Creatures caught within webs, or simply touching them, become stuck among the gluey fibers. \n&emsp;Anyone in the area when the spell is cast must roll a saving throw vs. spell with a –2 penalty. If the saving throw is successful, two things may have occurred. If the creature has room to escape the area, then it is assumed to have jumped free. If there is no room to escape, then the webs are only half strength. Creatures with less than 13 Strength (7 if the webs are half strength) are stuck until freed by another or until the spell wears off. Missile fire is generally ineffective against creatures trapped in webs. \n&emsp;Creatures with Strengths between 13 and 17 can break through 1 foot of webs per round. Creatures with 18 or greater Strength can break through 2 feet of webs per round. If the webs are at half strength, these rates are doubled. (Great mass equates to great strength in this case, and creatures of large mass hardly notice webs.) Strong and huge creatures can break through 10 feet of webs per round. \n&emsp;Furthermore, the strands of a *web* spell are flammable. A magical *flaming sword* can slash them away as easily as a hand brushes away cobwebs. Any fire—torch, flaming oil, flaming sword, etc.—can set them alight and burn them away in a single round. All creatures within flaming webs suffer 2d4 points of damage from the flames, but those free of the strands are not harmed.'
};

wiz2['Whispering Wind'] = {
    'name': 'Whispering Wind',
    'level': 'Level 2 Wizard',
    'school': 'Alteration, Phantasm',
    'range': '[[@{level-wizard}]] miles',
    'duration': 'Special',
    'aoe': '2-foot radius',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 189',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to either send a message or cause some desired sound effect. The whispering wind can travel as many miles above ground as the spellcaster has levels of experience, to a specific location within range that is familiar to the wizard. The whispering wind is as gentle and unnoticed as a zephyr until it reaches the location. It then delivers its whisper-quiet message or other sound. Note that the message is delivered regardless of whether anyone is present to hear it. The wind then dissipates. The wizard can prepare the spell to bear a message of up to 25 words, cause the spell to deliver other sounds for one round, or merely have the whispering wind seem to be a faint stirring of the air that has a susurrant sound. He can likewise cause the whispering wind to move as slowly as a mile per hour or as quickly as a mile per turn. When the spell reaches its objective, it swirls and remains until the message is delivered. As with the *magic mouth* spell, no spells may be cast via the *whispering wind*.'
};

wiz2['Wizard Lock'] = {
    'name': 'Wizard Lock',
    'level': 'Level 2 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '[[30*[[@{level-wizard}]] ]] square feet',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 189',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *wizard lock* spell cast upon a door, chest, or portal magically locks it. The caster can freely pass his own lock without affecting it; otherwise, the wizard-locked door or object can be opened only by breaking in, by a successful *dispel magic* or *knock* spell, or by a wizard four or more levels higher than the one casting the spell. Note that the last two methods do not remove the wizard lock; they only negate it for a brief duration— about one turn. Creatures from other planes cannot burst a wizard lock as they can a held portal (see the *hold portal* spell).'
};

const wizardSpells = {};
wizardSpells['wiz1'] = wiz1;
wizardSpells['wiz2'] = wiz2;
/* ---- Wizard spells end ---- */