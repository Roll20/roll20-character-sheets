/* ---- Wizard spells start ---- */
const wiz1 = {};
wiz1['Affect Normal Fires'] = {
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
    'effect': 'This spell affects any single *person* it is cast upon. The term person includes any bipedal human, demihuman or humanoid of man-size or smaller, such as brownies, dryads, dwarves, elves, gnolls, gnomes, goblins, half-elves, halflings, half-orcs, hobgoblins, humans, kobolds, lizard men, nixies, orcs, pixies, sprites, troglodytes, and others. Thus, a 10th-level fighter could be charmed, but an ogre could not. \n&emsp;The person receives a saving throw vs. spell to avoid the effect, with any adjustment due to Wisdom (see Table 5). If the person receives damage from the caster’s group in the same round the *charm* is cast, an additional bonus of +1 per hit point of damage received is added to the victim’s saving throw. \n&emsp;If the spell recipient fails his saving throw, he regards the caster as a trusted friend and ally to be heeded and protected. The spell does not enable the caster to control the charmed creature as if it were an automaton, but any word or action of the caster is viewed in the most favorable way. Thus, a charmed person would not obey a suicide command, but he might believe the caster if assured that the only chance to save the caster’s life is for the person to hold back an onrushing red dragon for “just a minute or two.” Note also that the spell does not endow the caster with linguistic capabilities beyond those he normally possesses (i.e., he must speak the victim’s language to communicate his commands). \n&emsp;The duration of the spell is a function of the charmed person’s Intelligence and is tied to the saving throw. The spell may be broken if a successful saving throw is rolled, and this saving throw is checked on a periodic basis, according to the creature’s Intelligence (see the following table). If the caster harms, or attempts to harm, the charmed person by some overt action, or if a *dispel magic* spell is successfully cast upon the charmed person, the *charm* spell is broken. \n&emsp;If two or more *charm* effects simultaneously affect a creature, the result is decided by the DM. This could range from one effect being clearly dominant, to the subject being torn by conflicting desires, to new saving throws that could negate both spells.\n&emsp;Note that the subject has full memory of the events that took place while he was charmed.}}{{style=center1 sheet-spell-center2}}{{c1-1=**Intelligence Score**}}{{c2-1=3 or less}}{{c3-1=4–6}}{{c4-1=7–9}}{{c5-1=10–12}}{{c6-1=13–14}}{{c7-1=15–16}}{{c8-1=17}}{{c9-1=18}}{{c10-1=19 or more}}{{c1-2=**Time Between Checks**}}{{c2-2=3 months}}{{c3-2=2 months}}{{c4-2=1 month}}{{c5-2=3 weeks}}{{c6-2=2 weeks}}{{c7-2=1 week}}{{c8-2=3 days}}{{c9-2=2 days}}{{c10-2=1 day}}{{effects2=&emsp;**Note:** The period between checks is the time period during which the check occurs. When to roll the check during this time is determined (randomly or by selection) by the DM. The roll is made secretly.',
};

wiz1['Chill Touch'] = {
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
    'level': 'Level 1 Wizard',
    'school': 'Alteration (Reversible)',
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
    'level': 'Level 1 Wizard',
    'school': 'Alteration (Reversible)',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
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
    'effect': 'This spell enables the caster to attempt to summon a familiar to act as his aide and companion. Familiars are typically small creatures, such as cats, frogs, ferrets, crows, hawks, snakes, owls, ravens, toads, weasels, or even mice. A creature acting as a familiar can benefit a wizard, conveying its sensory powers to its master, conversing with him, and serving as a guard/scout/spy as well. A wizard can have only one familiar at a time, however, and he has no control over what sort of creature answers the summoning, if any at all come. \n&emsp;The creature is always more intelligent than others of its type (typically by 2 or 3 Intelligence points), and its bond with the wizard confers upon it an exceptionally long life. The wizard receives the heightened senses of his familiar, which grants the wizard a +1 bonus to all surprise die rolls. Normal familiars have 2–4 hit points plus 1 hit point per caster level, and an Armor Class of 7 (due to size, speed, etc.). \n&emsp;The wizard has an empathic link with the familiar and can issue it mental commands at a distance of up to 1 mile. Note that empathic responses from the familiar are generally fairly basic—while able to communicate simple thoughts, these are often overwhelmed by instinctual responses. Thus, a ferret familiar spying on a band of orcs in the woods might lose its train of thought upon sighting a mouse. Certainly its communications to its master would be tinged with fear of the “big ones” it was spying on! The caster cannot see through the familiar’s eyes. \n&emsp;If separated from the caster, the familiar loses 1 hit point each day, and dies if reduced to 0 hit points. When the familiar is in physical contact with its wizard, it gains the wizard’s saving throws against special attacks. If a special attack would normally cause damage, the familiar suffers no damage if the saving throw is successful and half damage if the saving throw is failed. If the familiar dies, the wizard must successfully roll an immediate system shock check or die. Even if he survives this check, the wizard loses 1 point from his Constitution when the familiar dies. \n&emsp;The power of the conjuration is such that it can be attempted but once per year. When the wizard decides to find a familiar, he must load a brass brazier with charcoal. When this is burning well, he adds 1,000 gp worth of incense and herbs. The spell incantation is then begun and must be continued until the familiar comes or the casting time is finished. The DM secretly determines all results. Note that most familiars are not inherently magical, nor does a *dispel magic* spell send them away. \n&emsp;Deliberate mistreatment, failure to feed and care for the familiar, or continuous unreasonable demands have adverse effects on the familiar’s relationship with its master. Purposely arranging the death of one’s own familiar incurs great disfavor from certain powerful entities, with dire results.}}{{style=center1 sheet-spell-fixed3 sheet-spell-min3}}{{cc1-1=bottom}}{{c1-1=**D20 Roll**}}{{c2-1=1–5}}{{c3-1=6–7}}{{c4-1=8–9}}{{c5-1=10–11}}{{c6-1=12–13}}{{c7-1=14–15}}{{c8-1=16–20}}{{cc1-2=bottom}}{{c1-2=**Familiar* **}}{{c2-2=Cat, black}}{{c3-2=Crow}}{{c4-2=Hawk}}{{c5-2=Owl}}{{c6-2=Toad}}{{c7-2=Weasel}}{{c8-2=No familiar available within spell range}}{{cs8-2=2}}{{cc1-3=bottom}}{{c1-3=**Sensory Powers**}}{{c2-3=Excellent night vision\n& superior hearing}}{{c3-3=Excellent vision}}{{c4-3=Very superior distance vision}}{{c5-3=Night vision equals human daylight\nvision, superior hearing}}{{c6-3=Wide-angle vision}}{{c7-3=Superior hearing & very\nsuperior olfactory power}}{{effects2=* The DM can substitute other small animals suitable to the area.'
};

wiz1['Friends'] = {
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
    'effect': 'By means of this spell, the caster conjures a normal animal to serve him as a mount. The animal serves willingly and well, but at the expiration of the spell duration it disappears, returning to its own place. The type of mount gained by this spell depends on the level of the caster; of course, a caster can choose a lesser mount if desired. Available mounts include the following:}}{{style=center1}}{{c1-1=**Caster Level**}}{{c2-1=1–3}}{{c3-1=4–7}}{{c4-1=8–12}}{{c5-1=13–14}}{{c6-1=15+}}{{c1-2=**Mount**}}{{c2-2=Mule or light horse}}{{c3-2=Draft horse or war horse}}{{c4-2=Camel}}{{c5-2=Elephant}}{{c6-2=Griffon}}{{effects2=&emsp;The mount does not come with any riding gear, unless it is of a class lower than the caster would normally be entitled to; thus, a 4th-level wizard can gain a war horse without saddle and harness, or a light horse with saddle and harness. Elephants comes with howdah at 18th level. Griffon comes with saddle at 18th level. The statistics of the animal gained are typical of all creatures of the same class. The mount disappears when slain.',
};

wiz1['Nystu\'s Magical Aura'] = {
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
    'level': 'Level 1 Wizard',
    'school': 'Abjuration (Reversible)',
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
    'damage-type': 'Electrical',
    'healing': '',
    'effect': 'When the wizard casts this spell, he develops a powerful electrical charge that gives a jolt to the creature touched. The spell remains in effect for one round per level of the caster ([[@{level-wizard}]] rounds) or until it is discharged by the caster touching another creature. The shocking grasp delivers 1d8 points of damage, plus 1 point per level of the wizard (for example, a 2nd-level wizard would discharge a shock causing 1d8+2 points of damage). While the wizard must come close enough to his opponent to lay a hand on the opponent’s body or upon an electrical conductor that touches the opponent’s body, a like touch from the opponent does not discharge the spell.'
};

wiz1['Sleep'] = {
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

//Find another place for this
wiz2['Choke'] = {
    'level': 'Level 2 Wizard',
    'school': 'Necromancy, Conjuration/Summoning',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': '½',
    'materials': 'A handkerchief or similarly-sized piece of cloth that has been tied in a knot',
    'reference': 'The Complete Wizard\'s Handbook p. 97',
    'damage': '[[1d4]]',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of *choke*, the caster causes a pair of ghostly hands to appear around the throat of a single victim. The victim must be a human, demihuman, or humanoid, and must be within 30 yards of the caster. The hands will choke and strangle the affected victim for the duration of the spell; each round, the victim suffers 1-4 hit points of damage from the choking hands. If the victim makes a successful saving throw, he suffers half- damage each round.\n&emsp;*Choke* can be negated by *dispel magic* or a similar spell; the victim makes all attack rolls at a -2 penalty while affected by *choke*.'
}
// End

wiz2['Continual Light'] = {
    'level': 'Level 2 Wizard',
    'school': 'Alteration (Reversible)',
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
    'level': 'Level 2 Wizard',
    'school': 'Alteration, Enchantment',
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
    'level': 'Level 2 Wizard',
    'school': 'Divination (Reversible)',
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
    'level': 'Level 2 Wizard',
    'school': 'Alteration (Reversible)',
    'range': '60 yards',
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
    'level': 'Level 2 Wizard',
    'school': 'Divination (Reversible)',
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
    'level': 'Level 2 Wizard',
    'school': 'Divination (Reversible)',
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
    'effect': 'Application of this spell increases the Strength of the character by  a number of points—or tenths of points after 18 Strength is attained  (only if the character is a warrior). Benefits of the strength spell last  for the duration of the magic. The amount of added Strength  depends upon the spell recipient’s group and is subject to all restrictions on Strength due to race and class. Multiclass characters use the best die.}}{{c1-1=&emsp;**Class**}}{{c2-1=&emsp;Priest}}{{c3-1=&emsp;Rogue}}{{c4-1=&emsp;Warrior}}{{c5-1=&emsp;Wizard}}{{c1-2=**Strength Gain**}}{{c2-2=1d6 points}}{{c3-2=1d6 points}}{{c4-2=1d8 points}}{{c5-2=1d4 points}}{{effects2=&emsp;If a warrior has an 18 Strength already, from 10% to 80% is  added to his extraordinary Strength roll. The spell cannot confer a Strength of 19 or more, nor is it cumulative with other magic that adds to Strength. Beings without Strength scores (kobolds, lizard  men, etc.) receive a +1 to attack and damage rolls.'
};

wiz2['Summon Swarm'] = {
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
    'effect': 'The swarm of small animals (roll on following table to determine type, or the DM can assign an appropriate creature) drawn by the *summon swarm* spell will viciously attack all creatures in the area chosen by the caster. Creatures actively defending against the swarm to the exclusion of other activities suffer 1 point of damage for each round spent in the swarm. Those taking other actions, including leaving the swarm, receive damage equal to 1d4 points + 1 point per three levels of the caster each round. Note that spellcasting within the swarm is impossible.}}{{style=center1}}{{c1-1=**Dice Roll**}}{{c2-1=01–40}}{{c3-1=41–70}}{{c4-1=71–80}}{{c5-1=81–90}}{{c6-1=91–100}}{{c1-2=**Swarm Type**}}{{c2-2=Rats}}{{c3-2=Bats}}{{c4-2=Spiders}}{{c5-2=Centipedes/beetles}}{{c6-2=Flying insects}}{{effects2=&emsp;The swarm cannot be fought effectively with weapons, but fire and area effects can force it to disperse by inflicting damage. The swarm disperses when it has taken a total of 2 hit points per caster level from these attacks. A *protection from evil* spell keeps the swarm at bay, and certain area-effect spells, such as *gust of wind* and *stinking cloud*, disperse a swarm immediately, if appropriate to the swarm summoned (for example, only flyers are affected by a *gust of wind*). The caster must remain stationary and undisturbed to control the swarm; if his concentration lapses or is broken, the swarm disperses in two rounds. The swarm is stationary once conjured.'
};

wiz2['Tasha\'s Uncontrollable Hideous Laughter'] = {
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

let wiz3 = {};
wiz3['Blink'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 190',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard causes his material form to “blink” directly from one point to another at a random time and in a random direction. This means that melee attacks against the wizard automatically miss if initiative indicates they fall after he has blinked. \n&emsp;Each round the spell is in effect, the wizard rolls 2d8 to determine the timing of the blink—the result of the dice roll is used as the wizard’s initiative for that round. The wizard disappears and instantaneously reappears 10 feet distant from his previous position. (Direction is determined by a roll of 1d8: 1 = right ahead, 2 = right, 3 = right behind, 4 = behind, 5 = left behind, 6 = left, 7 = left ahead, 8 = ahead.) The caster cannot blink into a solid object; if such is indicated, reroll the direction. Movable objects of size and mass comparable to the caster are shoved aside when the caster blinks in. If blinking is impossible except into a  fixed, solid object, the caster is then trapped on the Ethereal Plane. \n&emsp;During each round that he blinks, the spellcaster can be attacked only by opponents who win initiative or by those who are able to strike both locations at once (for example, with a breath weapon, fireball, or similar wide-area attack forms). Opponents with multiple attacks, or those operating under haste or similar effects, can often strike early enough to have at least one attack against the caster. \n&emsp;If the spellcaster holds off his attack (if any) until after the blink, the 2d8 delay until the blink is added to his normal 1d10 initiative roll (thus, he probably attacks last in the round). The spellcaster can also try  to get his attack in before he blinks (he must announce his intent before rolling the 2d8 for blink timing and the 1d10 for initiative). In this case, the caster compares the two dice rolls, hoping that his initiative roll is lower than his blink roll (the two rolls are *not* added if he is trying to attack before he blinks). If so, he attacks according to his initiative roll, then blinks according to the blink roll. If his blink roll is lower than his  initiative roll, however, he blinks first and then attacks in whatever direction he’s facing (he must go through with his attack, even if he is facing in the wrong direction to affect anyone).'
};

wiz3['Clairaudience'] = {
    'level': 'Level 3 Wizard',
    'school': 'Divination',
    'range': 'Unlimited',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '60-foot radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A small horn of at least 100 gp value',
    'reference': 'PHB p. 190',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *clairaudience* spell enables the wizard to concentrate upon some locale and hear in his mind any noise within a 60-foot radius of that point. Distance is not a factor, but the locale must be known—a place familiar to the spellcaster or an obvious one (such as behind a door, around a corner, in a copse of trees, etc.). Only sounds that are normally detectable by the wizard can be heard by use of this spell. Lead sheeting or magical protections prevent the operation of the spell, and the wizard has some indication that the spell is so blocked. The spell creates an invisible sensor, similar to that created by a *crystal ball* spell, that can be dispelled. The spell functions only on the wizard’s current plane of existence.'
};

wiz3['Clairvoyance'] = {
    'level': 'Level 3 Wizard',
    'school': 'Divination',
    'range': 'Unlimited',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Line of sight',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A pinch of powdered pineal gland',
    'reference': 'PHB p. 190',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Similar to the *clairaudience* spell, the *clairvoyance* spell empowers the wizard to see in his mind whatever is within sight range from the spell locale chosen. Distance from the wizard is not a factor, but the locale must be known—familiar or obvious. Furthermore, light is a factor, as the spell does not enable the use of infravision or magical enhancements. If the area is magically dark, only darkness is seen; if naturally pitch dark, only a 10-foot radius from the center of the spell’s area of effect can be seen. Otherwise, the seeing extends to the normal vision range according to the prevailing light. Lead sheeting or magical protection foils a *clairvoyance* spell, and the wizard has some indication that it is so blocked. The spell creates an invisible sensor, similar to that created by a *crystal ball* spell, that can be dispelled. The spell functions only on the wizard’s current plane of existence.'
};

wiz3['Delude'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '30-foot radius',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 190',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *delude* spell, the wizard conceals his own alignment with that of any creature within a 30-foot radius at the time the spell is cast. The creature must be of higher than animal intelligence for the spell to work; its own alignment remains unchanged. The creature receives a saving throw vs. spell and, if successful, the delude spell fails. If the spell is successful, any *know alignment* spell used against the caster discovers only the assumed alignment. Note that a *detect good* or *detect evil* also detects the assumed aura, if the aura is strong enough. The creature whose aura has been assumed radiates magic, but the wizard radiates magic only to the creature whose alignment has been assumed. If a *delude* spell is used in conjunction with a *change self* or *alter self* spell, the class of the wizard can be totally hidden, if he is clever enough to carry off the disguise.'
};

wiz3['Dispel Magic'] = {
    'level': 'Level 3 Wizard',
    'school': 'Abjuration',
    'range': '120 yards',
    'duration': 'Instantaneous',
    'aoe': '30-foot cube',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 191',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a wizard casts this spell, it has a chance to neutralize or negate magic it comes in contact with, as follows:\n&emsp;First, it removes spells and spell-like effects (including device effects and innate abilities) from creatures or objects. Second, it disrupts the casting or use of these in the area of effect at the instant the dispel is cast. Third, it destroys magical potions (which are treated as 12th level for purposes of this spell). \n&emsp;Each effect or potion in the spell’s area is checked to determine if it is dispelled. The caster can always dispel his own magic; otherwise, the chance to dispel depends on the difference in level between the magical effect and the caster. The base chance is 50% (11 or higher on 1d20 to dispel). If the caster is of higher level than the creator of the effect to be dispelled, the difference is subtracted from the number needed on 1d20 to dispel (making it more likely that the dispel succeeds); if the caster is of lower level, the difference is *added* to the number needed on 1d20 to dispel (making it *less* likely that the dispel succeeds). A roll of 20 always succeeds and a roll of 1 always fails. Thus, if a caster is 10 levels higher, only a roll of 1 prevents the effect from being dispelled. \n&emsp;A *dispel magic* spell does not affect a specially enchanted item, such as a magical scroll, ring, wand, rod, staff, miscellaneous item, weapon, shield, or armor, unless it is cast directly upon the item. This renders the item nonoperational for 1d4 rounds. An item possessed and carried by a creature gains the creature’s saving throw against this effect; otherwise, it is automatically rendered nonoperational. An interdimensional interface (such as a *bag of holding*) rendered nonoperational would be temporarily closed. Note that an item’s physical properties are unchanged: A nonoperational magical sword is still a sword. \n&emsp;Artifacts and relics are not subject to this spell; however, some of their spell-like effects may be, at the DM’s option. \n&emsp;Note that this spell can be very effective when used upon charmed and similarly beguiled creatures. Certain spells or effects cannot be dispelled; these are listed in the spell descriptions.\n\n**Summary of Dispel Magic Effects**}}{{style=bottom3}}{{cc1-1=bottom}}{{c1-1=**Source of Effect**}}{{c2-1=Caster}}{{c3-1=Other caster/}}{{c4-1=&emsp;innate ability}}{{c5-1=Wand}}{{c6-1=Staff}}{{c7-1=Potion}}{{c8-1=Other magic}}{{c9-1=Artifact}}{{cc1-2=bottom}}{{c1-2=**Resists As**}}{{c2-2=None}}{{c3-2=Leve/HD of}}{{c4-2=&emsp;other caster}}{{c5-2=6th level}}{{c6-2=8th level}}{{c7-2=12th level}}{{c8-2=12th, unless special}}{{c9-2=DM discretion}}{{c1-3=**Result of Dispel**}}{{c2-3=Dispel automatic}}{{c4-3=Effect negated}}{{c5-3=&#42;}}{{c6-3=&#42}}{{c7-3=Potion destroyed}}{{c8-3=&#42}}{{c9-3=DM discretion}}{{effects2=&#42 Effect negated; if cast directly on item, item becomes nonoperational for 1d4 rounds.',
};

wiz3['Explosive Runes'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '10-foot radius',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None or ½',
    'materials': '',
    'reference': 'PHB p. 191',
    'damage': '[[6d4+6]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'By tracing these mystic runes upon a book, map, scroll, or similar object bearing written information, the wizard prevents unauthorized persons from reading his material. The explosive runes are difficult to detect—5% chance per level of magic use experience of the reader; thieves have only a 5% chance. But trap detection by spell or magical device always finds these runes. \n&emsp;When read, the explosive runes detonate, delivering 6d4+6 points of damage to the reader, who gets no saving throw. A like amount, or half that if saving throws are made, is suffered by each creature within the blast radius. The wizard who cast the spell, as well as any he instructs, can read the protected writing without triggering the runes. Likewise, the wizard can remove the runes whenever desired. Others can remove them only with a successful *dispel magic* or *erase* spell. Explosive runes otherwise last until the spell is triggered. The item upon which the runes are placed is destroyed when the explosion takes place, unless it is not normally subject to destruction by magical fire (see the item saving throws in Chapter 6 of the *DUNGEON MASTER Guide*).'
};

wiz3['Feign Death'] = {
    'level': 'Level 3 Wizard',
    'school': 'Necromancy',
    'range': 'Touch',
    'duration': '1 hour + [[@{level-wizard}]] turns',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 191',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster (or any other creature whose levels of experience or Hit Dice do not exceed the wizard’s own level) can be put into a cataleptic state that is impossible to distinguish from death. Although the person or creature affected by the *feign death* spell can smell, hear, and know what is going on, no feeling or sight of any sort is possible. Thus, any wounding or mistreatment of the body is not felt and no reaction occurs; damage is only half normal. In addition, paralysis, poison, and energy-level drain cannot affect an individual under the influence of this spell. Poison injected or otherwise introduced into the body takes effect when the spell recipient is no longer under the influence of this spell, although a saving throw is permitted. \n&emsp;Note that only a willing individual can be affected by a *feign death* spell. The spellcaster can end the spell effects at any time desired, as will a successful dispel, but a full round is required for bodily functions to begin again.'
};

wiz3['Fireball'] = {
    'level': 'Level 3 Wizard',
    'school': 'Evocation',
    'range': '[[10+10*[[@{level-wizard}]] ]] yards',
    'duration': 'Instantaneous',
    'aoe': '20-foot radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': '½',
    'materials': 'A tiny ball of bat guano and sulphur',
    'reference': 'PHB p. 191',
    'damage': '[[ [[{[[@{level-wizard}]],10}kl1]]d6]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'A fireball is an explosive burst of flame, which detonates with a low roar and delivers damage proportional to the level of the wizard who cast it—1d6 points of damage for each level of experience of the spellcaster (up to a maximum of 10d6). The burst of the fireball creates little pressure and generally conforms to the shape of the area in which it occurs. The fireball fills an area equal to its normal spherical volume (roughly 33,000 cubic feet—thirty-three 10-foot x 10-foot x 10-foot cubes). Besides causing damage to creatures, the fireball ignites all combustible materials within its burst radius, and the heat of the fireball melts soft metals such as gold, copper, silver, etc. Exposed items require saving throws vs. magical fire to determine if they are affected, but items in the possession of a creature that rolls a successful saving throw are unaffected by the fireball. \n&emsp;The wizard points his finger and speaks the range (distance and height) at which the fireball is to burst. A streak flashes from the pointing digit and, unless it impacts upon a material body or solid barrier prior to attaining the prescribed range, blossoms into the fireball (an early impact results in an early detonation). Creatures failing their saving throws each suffer full damage from the blast. Those who roll successful saving throws manage to dodge, fall flat, or roll aside, each receiving half damage (the DM rolls the damage and each affected creature suffers either full damage or half damage [round fractions down], depending on whether the creature saved or not).'
};

wiz3['Flame Arrow'] = {
    'level': 'Level 3 Wizard',
    'school': 'Conjuration/Summoning',
    'range': '[[30+10*[[@{level-wizard}]] ]] yards',
    'duration': '1 round',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': ' A drop of oil and a small piece of flint',
    'reference': 'PHB p. 192',
    'damage': '1 Fire damage or 1d6 Piercing + 4d6 Fire damage per bolt',
    'damage-type': 'piercing and fire',
    'healing': '',
    'effect': 'This spell has two effects. First, the wizard can cause normal arrows or crossbow bolts to become magical flaming missiles for one round. The missiles must be nocked and drawn (or cocked) at the completion of the spell. If they are not loosed within one round, they are consumed by the magic. For every five levels the caster has achieved, up to 10 arrows or bolts can be affected. (Currently [[floor([[@{wizard-level}]]/5)*10]] arrows or bolts). The arrows inflict normal damage, plus 1 point of fire damage to any target struck. They may also cause incendiary damage. This version of the spell is used most often in large battles. \n&emsp;The second version of this spell enables the caster to hurl fiery bolts at opponents within range. Each bolt inflicts 1d6 points of piercing damage, plus 4d6 points of fire damage. Only half the fire damage is inflicted if the creature struck successfully saves vs. spell. The caster receives one bolt for every five experience levels (two bolts at 10th level, three at 15th level, etc.)(Currently [[floor([[@{wizard-level}]]/5)]] bolts). Bolts must be used on creatures within 20 yards of each other and in front of the wizard.'
};

wiz3['Fly'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] + 1d6 turns rolled by the DM',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A wing feather from any bird',
    'reference': 'PHB p. 192',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to bestow the power of magical flight. The creature affected is able to move vertically and horizontally at a rate of 18 (half that if ascending, twice that if descending in a dive). The maneuverability class of the creature is B. Using the fly spell requires as much concentration as walking, so most spells can be cast while hovering or moving slowly (movement of 3). Possible combat penalties while flying are known to the DM (found in the “Aerial Combat” section of Chapter 9 of the DMG). The exact duration of the spell is always unknown to the spellcaster, as the variable addition is determined secretly by the DM.'
};

wiz3['Gust of Wind'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': '1 round',
    'aoe': '10 feet x [[10*[[@{level-wizard}]] ]] yards',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A legume seed',
    'reference': 'PHB p. 192',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, a strong puff of air originates from the wizard and moves in the direction he is facing. The force of this gust of wind (about 30 m.p.h.) is sufficient to extinguish candles, torches, and similar unprotected flames. It causes protected flames—such as those of lanterns—to dance wildly and has a 5% chance per level of experience of the spellcaster to extinguish even such lights. Currently [[5*[[@{wizard-level}]] ]]%. It also fans large fires outward 1d6 feet in the direction of the wind’s movement. It forces back small flying creatures 1d6 x 10 yards and causes man-sized beings to be held motionless if attempting to move against its force. It slows larger-than-man-sized flying creatures by 50% for one round. It blows over light objects, disperses most vapors, and forces away gaseous or unsecured levitating creatures. Its path is a constant 10 feet wide, by 10 yards long per level of experience of the caster (for example, an 8th-level wizard causes a gust of wind that travels 80 yards).'
};

wiz3['Haste'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': '60 yards.',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': '40-foot cube, [[@{level-wizard}]] creatures',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A shaving of licorice root',
    'reference': '',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, each affected creature functions at double its normal movement and attack rates. A hasted creature gains a -2 initiative bonus. Thus, a creature moving at 6 and attacking once per round would move at 12 and attack twice per round. Spellcasting and spell effects are *not* sped up. The number  of creatures that can be affected is equal to the caster’s experience level; those creatures closest to the center of effect are affected first. All affected by haste must be in the designated area of effect. Note that this spell negates the effects of a *slow* spell. Additionally, this spell ages the recipient by one year, because of sped-up metabolic processes. This spell is not cumulative with itself or with other similar magic.'
};

wiz3['Hold Person'] = {
    'level': 'Level 3 Wizard',
    'school': 'Enchantment/Charm',
    'range': '120 yards',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '1—4 persons, 20-foot cube',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': 'A small, straight piece of iron',
    'reference': 'PHB p. 193',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell holds 1d4 humans, demihumans, or humanoid creatures rigidly immobile for five or more rounds. \n&emsp;The *hold person* spell affects any bipedal human, demihuman or humanoid of man size or smaller, including brownies, dryads, dwarves, elves, gnolls, gnomes, goblins, half-elves, halflings, half-orcs, hobgoblins, humans, kobolds, lizard men, nixies, orcs, pixies, sprites, troglodytes, and others. \n&emsp;The spell is centered on a point selected by the caster; it affects persons selected by the caster within the area of effect. If the spell is cast at three or four people, each gets an unmodified saving throw. If only two people are being enspelled, each makes his saving throw with a -1 penalty. If the spell is cast at only one person, the saving throw suffers a -3 penalty. Saving throws are adjusted for Wisdom. Those succeeding on their saving throws are unaffected by the spell. Undead creatures cannot be held. \n&emsp;Held beings cannot move or speak, but they remain aware of events around them and can use abilities not requiring motion or speech. Being held does not prevent the worsening of the subjects’ condition due to wounds, disease, or poison. The caster can end the spell with a single utterance at any time; otherwise, the duration is 10 rounds at 5th level, 12 rounds at 6th level, 14 rounds at 7th  level, etc.'
};

wiz3['Hold Undead'] = {
    'level': 'Level 3 Wizard',
    'school': 'Necromancy',
    'range': '60 feet',
    'duration': '[[1d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '[[1d3]] undead',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'A pinch of sulphur and powdered garlic',
    'reference': 'PHB p. 193',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast, this spell renders immobile 1d3 undead creatures whose total Hit Dice are equal to or less than the caster’s level. No more than three undead can be affected by a single spell. To cast, the wizard aims the spell at a point within range and the three undead closest to this are considered to be in the area of effect, provided all are within the field of vision and spell range of the caster. Undead of a mindless nature (skeletons, zombies, or ghouls) are automatically affected. Other forms of undead are allowed a saving throw to negate the effect. If the spell is successful, it renders the undead immobile for the duration of the spell.'
};

wiz3['Illusionary Script'] = {
    'level': 'Level 3 Wizard',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': '[[@{wizard-level}]] day',
    'aoe': 'Script reader',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'Special',
    'materials': 'A lead-based ink that requires special manufacture by an alchemist, at a cost of not less than 300 gp per usage',
    'reference': 'PHB p. 193',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to write instructions or other information on parchment, paper, etc. The illusionary script appears to be some form of foreign or magical writing. Only the person (or people) who the wizard desires to read the writing can do so. An illusionist recognizes it for illusionary script. \n&emsp;Unauthorized creatures glancing at the script must roll saving throws vs. spell. A successful save means the creature can look away with only a mild sense of disorientation. Failure means the creature is subject to a suggestion implanted in the script by the caster at the time the *illusionary script* spell was cast. The suggestion cannot require more than three turns to carry out. The suggestion could be to close the book and leave, or to forget the existence of the book, for example. A successful dispel magic spell will remove the illusionary script, but an unsuccessful attempt erases all of the writing. The hidden writings can be read by a combination of the *true seeing* spell and either the *read magic* or *comprehend languages* spell, as applicable.'
};

wiz3['Infravision'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[2+[[@{level-wizard}]] ]] hours',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Either a pinch of dried carrot or an agate',
    'reference': 'PHB p. 193',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard enables the recipient to see in normal darkness up to 60 feet without light. Note that strong sources of light (fire, lanterns, torches, etc. tend to blind this vision, so infravision does not function efficiently in the presence of such light sources. Invisible creatures are not detectable by infravision.'
};

wiz3['Invisibility, 10\' Radius'] = {
    'level': 'Level 3 Wizard',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'An eyelash and a bit of gum arabic, the former encased in the latter',
    'reference': 'PHB p. 193',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell confers invisibility upon all creatures within 10 feet of the recipient. Gear carried and light sources are included, but any light emitted is still visible. The center of the effect is mobile with the recipient. Those affected by this spell cannot see each other. Any affected creature moving out of the area becomes visible, but creatures moving into the area after the spell is cast do not become invisible. Affected creatures (other than the recipient) that attack negate the invisibility only for themselves. If the spell recipient attacks, the *invisibility, 10’ radius* spell is broken for all.'
};

wiz3['Item'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[ [[@{level-wizard}]]*4]] hours',
    'aoe': '[[ [[@{level-wizard}]]*2]] cu. ft.',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 194',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to shrink one nonmagical item (if it is within the size limit) to 1/12 of its normal size. Optionally, the caster can also change its now-shrunken composition to a clothlike one. An object in the possession of another creature is allowed a saving throw vs. spell. Objects changed by an item spell can be returned to normal composition and size merely by tossing them onto any solid surface or by a word of command from the original spellcaster. Even a burning fire and its fuel can be shrunk by this spell.'
};

wiz3['Leomund\'s Tiny Hut'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[4+[[@{level-wizard}]] ]] hours',
    'aoe': '15-foot-diameter sphere',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A small crystal bead that shatters when the spell duration expires or the hut is dispelled',
    'reference': 'PHB p. 194',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard creates an unmoving, opaque sphere of force of any desired color around his person. Half of the sphere projects above the ground, and the lower hemisphere passes through the ground. Up to seven other man-sized creatures can fit into the field with its creator; they can freely pass into and out of the hut without harming it. However, if the spellcaster removes himself from the hut, the spell dissipates.\n&emsp;The temperature inside the hut is 70° F. (21° C), if the exterior temperature is between 0° and 100° F. (-17° to 38° C). An exterior temperature below 0° or above 100° lowers or raises, respectively, the interior temperature on a 1°-for-1° basis. The tiny hut also provides protection against the elements, such as rain, dust, sandstorms, and the like. The hut can withstand any wind of less than hurricane force without being harmed, but wind force greater than that destroys it. \n&emsp;The interior of the hut is a hemisphere; the spellcaster can illuminate it dimly upon command, or extinguish the light as desired. Note that although the force field is opaque from the outside, it is transparent from within. Missiles, weapons, and most spell effects can pass through the hut without affecting it, although the occupants cannot be seen from outside the hut. The hut can be dispelled.'
};

wiz3['Lightning Bolt'] = {
    'level': 'Level 3 Wizard',
    'school': 'Evocation',
    'range': '[[40+10*[[@{level-wizard}]] ]] yards',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': '½',
    'materials': 'A bit of fur and an amber, crystal, or glass rod',
    'reference': 'PHB p. 194',
    'damage': '[[ [[{[[@{level-wizard}]],10}kl1]]d6]]',
    'damage-type': 'Electrical',
    'healing': '',
    'effect': 'Upon casting this spell, the wizard releases a powerful stroke of electrical energy that inflicts 1d6 points of damage per level of the spellcaster (maximum of 10d6) to each creature within its area of effect. A successful saving throw vs. spell reduces this damage to half (round fractions down). The bolt begins at a range and height decided by the caster and streaks outward in a direct line from the casting wizard (for example, if a 40-foot bolt was started at 180 feet from the wizard, the far end of the bolt would reach 220 feet (180 + 40). The lightning bolt may set fire to combustibles, sunder wooden doors, splinter up to a half-foot thickness of stone, and melt metals with a low melting point (lead, gold, copper, silver, bronze). Saving throws must be rolled for objects that withstand the full force of a stroke (see the *fireball* spell). If the damage caused to an interposing barrier shatters or breaks through it (i.e., the saving throw fails), the bolt continues. A bolt can breach 1 inch of wood or half an inch of stone per caster level, up to a maximum of 1 foot of wood or half a foot of stone. \n&emsp;The lightning bolt’s area of effect is chosen by the spellcaster: either a forked bolt 10 feet wide and 40 feet long or a single bolt 5 feet wide and 80 feet long. If a bolt cannot reach its full length, because of an unyielding barrier (such as a stone wall), the lightning bolt rebounds from the barrier toward its caster, ending only when it reaches its full length. \n&emsp;For example: An 80-foot-long stroke is begun at a range of 40 feet, but it hits a stone wall at 50 feet. The bolt travels 10 feet, hits the wall, and rebounds for 70 feet back toward its creator (who is only 50 feet from the wall, and so is caught in his own lightning bolt!). \n&emsp;The DM might allow reflecting bolts. When this type of lightning bolt strikes a solid surface, the bolt reflects from the surface at an angle equal to the angle of incidence (like light off a mirror). A creature crossed more than once by the bolt must roll a saving throw for every time it is crossed, but it still suffers either full damage (if one saving throw is missed) or half damage (if all saving throws are made).'
};

wiz3['Melf\'s Minute Meteors'] = {
    'level': 'Level 3 Wizard',
    'school': 'Evocation, Alteration',
    'range': '[[70+10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '1 target/meteor',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'Nitre and sulphur formed into a bead by the addition of pine tar. The caster must also have a small hollow tube of minute proportion, fashioned from gold. The tube costs no less than 1,000 gp to construct, so fine is its workmahship and magical engraving, and it can be reused.',
    'reference': 'PHB p. 194',
    'damage': '1d4 per meteor + 1 splash within 3 feet',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'This spell enables the wizard to cast small globes of fire (one for each experience level he has attained. Currently [[@{wizard-level}]] meteors), each of which bursts into a 1-foot-diameter sphere upon impact, inflicting 1d4 points of damage to the creature struck. It can also ignite combustible materials (even solid planks). The meteors are treated as missiles hurled by the wizard with a +2 bonus to the attack rolls and with no penalty for range. Misses are treated as grenadelike missiles that inflict 1 point of damage to creatures within 3 feet. \n&emsp;The spell can be cast in either of two ways: \n&emsp;A) The wizard discharges five meteors every round (see the “Multiple Attacks and Initiative” section in Chapter 9: Combat). Note that this carries over into at least the following round. \n&emsp;B) The wizard discharges only one meteor per round. In addition to releasing the missile, the caster can perform other actions in the round, including spellcasting, melee, or device use. Spells requiring concentration force the wizard to forgo the rest of the missiles to maintain concentration. Also, if the wizard fails to maintain an exact mental count of the number of missiles he has remaining, he has involuntarily lost the remaining portion of the spell. \n&emsp;The spell ends when the caster has fired off as many meteors as he has experience levels, when he forgoes casting any still remaining, or when a successful *dispel magic* spell is thrown upon the caster.'
};

wiz3['Monster Summoning I'] = {
    'level': 'Level 3 Wizard',
    'school': 'Conjuration/Summoning',
    'range': 'Special',
    'duration': '[[2+[[@{level-wizard}]] ]] rounds',
    'aoe': '30-yard radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A tiny bag and a small (not necessarily lit) candle',
    'reference': 'PHB p. 195',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Within one round of casting this spell, the wizard magically conjures [[2d4]] 1st-level monsters (selected by the DM, from his 1st-level encounter tables). The monsters appear anywhere within the spell’s area of effect, as desired by the wizard. They attack the spell user’s opponents to the best of their ability until either he commands that the attacks cease, the spell duration expires, or the monsters are slain. These creatures do not check morale, but they vanish when slain. Note that if no opponent exists to fight, summoned monsters can, if the wizard can communicate with them and if they are physically able, perform other services for the summoning wizard. \n&emsp;In rare cases, adventurers have been known to disappear, summoned by powerful spellcasters using this spell. Those summoned recall all the details of their trip.'
};

wiz3['Nondetection'] = {
    'level': 'Level 3 Wizard',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '1 creature or item',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A pinch of diamond dust worth 300 gp',
    'reference': 'PHB p. 195',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell, the wizard makes the creature or object touched undetectable by divination spells such as *clairaudience*, *clairvoyance*, *locate object*, *ESP*, and detect spells. It also prevents location by such magical items as *crystal balls* and *ESP medallions*. It does not affect the *know alignment* spell or the ability of intelligent or high-level beings to detect invisible creatures. If a divination is attempted, the *nondetection* caster must roll a saving throw vs. spell. If this is successful, the divination fails.'
};

wiz3['Phantom Steed'] = {
    'level': 'Level 3 Wizard',
    'school': 'Conjuration, Phantasm',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 195',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard creates a quasi-real, horselike creature. The steed can be ridden only by the wizard who created it, or by any person for whom the wizard specifically creates such a mount. A phantom steed has a black head and body, gray mane and tail, and smoke-colored, insubstantial hooves that make no sound. Its eyes are milky-colored. It does not fight, but all normal animals shun it and only monstrous ones will attack. The mount has an Armor Class of 2 and [[ [[@{level-wizard}]]+7]] hit points. If it loses all of its hit points, the phantom steed disappears. A phantom steed moves at a movement rate of [[ [[@{level-wizard}]]*4]], to a maximum movement rate of 48. It has what seems to be a saddle and a bit and bridle. It can bear its rider’s weight, plus up to [[ [[@{level-wizard}]]*10]] pounds. \n&emsp;These mounts gain certain powers according to the level of the wizard who created them: \n&emsp;8th Level: The ability to pass over sandy, muddy, or even swampy ground without difficulty. \n&emsp;10th Level: The ability to pass over water as if it were firm, dry ground. \n&emsp;12th Level: The ability to travel in the air as if it were firm land, so chasms and the like can be crossed without benefit of a bridge. Note, however, that the mount cannot casually take off and fly; the movement must be between points of similar altitude. \n&emsp;14th Level: The ability to perform as if it were a pegasus; it flies at a rate of 48 per round upon command. \n&emsp;Note that a mount’s abilities include those of lower levels; thus, a 12th-level mount has the 8th-, 10th-, and 12th-level abilities.'
};

wiz3['Protection from Evil, 10\' Radius'] = {
    'level': 'Level 3 Wizard',
    'school': 'Abjuration (Reversible)',
    'range': 'Touch',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'Powdered silver or iron',
    'reference': 'PHB p. 195',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The globe of protection of this spell is identical in all respects to a *protection from evil* spell, except that it encompasses a much larger area and its duration is greater. The effect is centered on and moves with the creature touched. Any protected creature within the circle can break the warding against enchanted or summoned monsters by meleeing them. If a creature too large to fit into the area of effect is the recipient of the spell, the spell acts as a normal *protection from evil* spell for that creature only. \n&emsp;To complete this spell, the caster must trace a circle 20 feet in diameter using powdered silver. The material component for the reverse is powdered iron.'
};

wiz3['Protection From Normal Missiles'] = {
    'level': 'Level 3 Wizard',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A piece of tortoise or turtle shell',
    'reference': 'PHB p. 196',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard bestows total invulnerability to hurled and projected missiles such as arrows, axes, bolts, javelins, small stones, and spears. Furthermore, it causes a reduction of 1 from each die of damage (but no die inflicts less than 1 point of damage inflicted by large or magical missiles, such as ballista missiles, catapult stones, hurled boulders, and magical arrows, bolts, javelins, etc. Note, however, that this spell does not convey any protection from such magical attacks as fireballs, lightning bolts, or magic missiles.'
};

wiz3['Secret Page'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Until dispelled',
    'aoe': '1 page, up to 2 foot square',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'Powdered herring scales and either will o’ wisp or boggart essense',
    'reference': 'PHB p. 196',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast, a *secret page* spell alters the actual contents of a page so that they appear to be something entirely different. Thus, a map can be changed to become a treatise on burnishing ebony walking sticks. The text of a spell can be altered to show a ledger page or even another form of spell. *Confuse languages* and *explosive runes* spells may be cast upon the secret page, but a *comprehend languages* spell cannot reveal the secret page’s contents. The caster is able to reveal the original contents by speaking a command word, perusing the actual page, and then returning it to its secret page form. The caster can also remove the spell by double repetition of the command word. Others noting the dim magic of a page within this spell cloaking its true contents can attempt to dispel magic, but if it fails, the page is destroyed. A *true seeing* spell does not reveal the contents unless cast in combination with a *comprehend languages* spell. An *erase* spell can destroy the writing.'
};

wiz3['Sepia Snake Sigil'] = {
    'level': 'Level 3 Wizard',
    'school': 'Conjuration/Summoning',
    'range': '5 yards',
    'duration': 'Special',
    'aoe': '1 sigil',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '100 gp worth of powdered amber, a scale from any snake, and a pinch of mushroom spores',
    'reference': 'PHB p. 196',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, a small written symbol appears in the text of any written work. When read, the so-called sepia snake springs into being and strikes at the nearest living creature (but does not attack the wizard who cast the spell). Its attack is made as if it were a monster with Hit Dice equal to the level of the wizard who cast the spell. If it strikes successfully, the victim is engulfed in a shimmering amber field of force, frozen and immobilized until released, either at the caster’s command, by a successful *dispel magic* spell, or until a time equal to 1d4 days + 1 day per caster level has elapsed. Until then, nothing can get at the victim, move the shimmering force surrounding him, or otherwise affect him. The victim does not age, grow hungry, sleep, or regain spells while in this state. He is not aware of his surroundings. If the sepia snake misses its target, it dissipates in a flash of brown light, with a loud noise and a puff of dun-colored smoke that is 10 feet in diameter and lasts for one round. \n&emps;The spell cannot be detected by normal observation, and *detect magic* reveals only that the entire text is magical. A *dispel magic* can remove it; an *erase* spell destroys the entire page of text. It can be cast in combination with other spells that hide or garble text.'
};

wiz3['Slow'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': '[[90+10*[[@{level-wizard}]] ]] yards',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': '40-foot cube, [[@{level-wizard}]] creatures',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': 'A drop of molasses',
    'reference': 'PHB p. 196',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *slow* spell causes affected creatures to move and attack at half their normal rates. It negates a *haste* spell or equivalent, but does not otherwise affect magically speeded or slowed creatures. Slowed creatures have an Armor Class penalty of +4 AC, an attack penalty of -4, and all Dexterity combat bonuses are negated. The magic affects a number of creatures equal to the spellcaster’s level, if they are within the area of effect chosen by the wizard (i.e., a 40-foot cubic volume centered as called for by the caster). The creatures are affected from the center of the spell outward. Saving throws against the spell suffer a -4 penalty.'
};

wiz3['Spectral Force'] = {
    'level': 'Level 3 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '[[60+[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '[[40+10*[[@{level-wizard}]]-foot cube',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 197',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *spectral force* spell creates an illusion in which sound, smell, and thermal illusions are included. It is otherwise similar to the *improved phantasmal force* spell. The spell lasts for three rounds after concentration ceases.'
};

wiz3['Suggestion'] = {
    'level': 'Level 3 Wizard',
    'school': 'Enchantment/Charm',
    'range': '30 yards',
    'duration': '[[1+[[@{level-wizard}]] ]] hours',
    'aoe': '1 creature',
    'components': 'V, M',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': 'A snake’s tongue and either a bit of honeycomb or a drop of sweet oil',
    'reference': 'PHB p. 197',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast by the wizard, he influences the actions of the chosen recipient by the utterance of a few words—phrases or a sentence or two—suggesting a course of action desirable to the spellcaster. The creature to be influenced must, of course, be able to understand the wizard’s suggestion—it must be spoken in a language that the spell recipient understands. \n&emsp;The suggestion must be worded in such a manner as to make the action sound reasonable; asking the creature to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act automatically negates the effect of the spell. However, a suggestion that a pool of acid was actually pure water and that a quick dip would be refreshing is another matter. Urging a red dragon to stop attacking the wizard’s party so that the dragon and party could jointly loot a rich treasure elsewhere is likewise a reasonable use of the spell’s power. \n&emsp;The course of action of a suggestion can continue in effect for a considerable duration, such as in the case of the red dragon mentioned above. Conditions that will trigger a special action can also be specified; if the condition is not met before the spell expires, the action will not be performed. If the target successfully rolls its saving throw, the spell has no effect. Note that a very reasonable suggestion causes the saving throw to be made with a penalty (such as -1, -2, etc.) at the discretion of the DM. Undead are not subject to suggestion.'
};

wiz3['Tongues'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration (Reversible)',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '30-foot radius',
    'components': 'V, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A small clay model of a ziggurat, which shatters when the spell is pronounced',
    'reference': 'PHB p. 197',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to speak and understand additional languages, whether they are racial tongues or regional dialects. This does not enable the caster to speak with animals. The spell enables the caster to be understood by all creatures of that type within hearing distance, usually 60 feet. This spell does not predispose the subject toward the caster in any way. \n&emsp;The wizard can speak one additional tongue for every three levels of experience. Currently speak [[floor([[@{wizard-level}]]/3)]] additional tongues. The reverse of the spell cancels the effect of the *tongues* spell or confuses verbal communication of any sort within the area of effect.'
};

wiz3['Vampiric Touch'] = {
    'level': 'Level 3 Wizard',
    'school': 'Necromancy',
    'range': '0',
    'duration': 'One touch',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 197',
    'damage': '[[ [[{floor([[@{level-wizard}]]/2),6}kl1]]d6]]',
    'damage-type': '',
    'healing': 'Equal to damage',
    'effect': 'When the caster touches an opponent in melee with a successful attack roll, the opponent loses 1d6 hit points for every two caster levels, to a maximum drain of 6d6 points for a 12th-level caster. The spell is expended when a successful touch is made or one turn passes. The hit points are added to the caster’s total, with any hit points over the caster’s normal total treated as temporary additional hit points. Any damage to the caster is subtracted from the temporary hit points first. After one hour, any extra hit points above the caster’s normal total are lost. The creature originally losing hit points through this spell can regain them by magical or normal healing. Undead creatures are unaffected by this spell.'
};

wiz3['Water Breathing'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration (Reversible)',
    'range': 'Touch',
    'duration': '[[ [[@level-wizard}]]+1d4]] hours',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A short reed or piece of straw',
    'reference': 'PHB p. 197',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The recipient of a *water breathing* spell is able to breathe water freely for the duration of the spell. The caster can touch more than one creature with a single casting; in this case the duration is divided by the number of creatures touched. The reverse, *air breathing* enables water-breathing creatures to comfortably survive in the atmosphere for an equal duration.'
};


wiz3['Wind Wall'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@level-wizard}]] rounds',
    'aoe': 'wall, [[10*[[@{level-wizard}]] ]] x [[5*[[@{level-wizard}]] ]] feet x 2 feet wide',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Special',
    'materials': 'A tiny fan and a feather of exotic origin',
    'reference': 'PHB p. 198',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell brings forth an invisible vertical curtain of wind 2 feet thick and of considerable strength—a strong breeze sufficient to blow away any bird smaller than an eagle or tear papers and like materials from unsuspecting hands. (If in doubt, a saving throw vs. spell determines whether the subject maintains its grasp.) Normal insects cannot pass such a barrier. Loose materials, even cloth garments, fly upward when caught in a wind wall. Arrows and bolts are deflected upward and miss, while sling stones and other missiles under two pounds in weight receive a –4 penalty to a first shot and –2 penalties thereafter. Gases, most breath weapons, and creatures in gaseous form cannot pass this wall, although it is no barrier to noncorporeal creatures.'
};

wiz3['Wraithform'] = {
    'level': 'Level 3 Wizard',
    'school': 'Alteration, Illusion',
    'range': '0',
    'duration': '[[2*[[@level-wizard}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A bit of gauze and a wisp of smoke',
    'reference': 'PHB p. 198',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard and all of his gear become insubstantial. The caster is subject only to magical or special attacks, including those by weapons of +1 or better, or by creatures otherwise able to affect those struck only by magical weapons. Undead of most sorts will ignore an individual in wraithform, believing him to be a wraith or spectre, though a lich or special undead may save vs. spell with a –4 penalty to recognize the spell. \n&emsp;The wizard can pass through small holes or narrow openings, even mere cracks, with all he wears or holds in his hands, as long as the spell persists. Note, however, that the caster cannot fly without additional magic. No form of attack is possible when in wraithform, except against creatures that exist on the Ethereal Plane, where all attacks (both ways) are normal. A successful *dispel magic* spell forces the wizard in wraithform back to normal form. The spellcaster can end the spell with a single word.'
};

const wiz4 = {};
wiz4['Charm Monster'] = {
    'level': 'Level 4 Wizard',
    'school': 'Enchantment/Charm',
    'range': '60 yards',
    'duration': 'Special',
    'aoe': '1 or more creatures in 20-foot radius',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 198',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to a *charm person* spell, but it can affect any living creature—or several low-level creatures. The spell affects [[2d4]] Hit Dice or levels of creatures, although it only affects one creature of 4 or more Hit Dice or levels, regardless of the number rolled. \n&emsp;All possible subjects receive saving throws vs. spell, adjusted for Wisdom. Any damage inflicted by the caster or his allies in the round of casting grants the wounded creature another saving throw at a bonus of +1 per point of damage received. Any affected creature regards the spellcaster as friendly, an ally or companion to be treated well or guarded from harm. If communication is possible, the charmed creature follows reasonable requests, instructions, or orders most faithfully (see the *suggestion* spell). If communication is not possible, the creature does not harm the caster, but others in the vicinity may be subject to its intentions, hostile or otherwise. Any overtly hostile act by the caster breaks the spell, or at the very least allows a new saving throw against the charm. Affected creatures eventually come out from under the influence of the spell. This is a function of the creature’s level (i.e., its Hit Dice).}}{{style=center2 sheet-spell-bottom2}}{{c1-1=**Monster Level**\n**or Hit Dice**}}{{c2-1=1st or up to 2}}{{c3-1=2nd or up to 3+2}}{{c4-1=3rd or up to 4+4}}{{c5-1=4th or up to 6}}{{c6-1=5th or up to 7+2}}{{c7-1=6th or up to 8+4}}{{c8-1=7th or up to 10}}{{c9-1=8th or up to 12}}{{c10-1=9th or over 12}}{{c1-2=**% Chance Per Week**\n**of Breaking Spell**}}{{c2-2=5%}}{{c3-2=10%}}{{c4-2=15%}}{{c5-2=25%}}{{c6-2=35%}}{{c7-2=45%}}{{c8-2=60%}}{{c9-2=75%}}{{c10-2=90%}}{{effects2=&emsp;The exact day of the week and time of day is secretly determined by the DM.',
};


wiz4['Confusion'] = {
    'level': 'Level 4 Wizard',
    'school': 'Enchantment/Charm',
    'range': '120 yards',
    'duration': '[[2+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Up to 60-foot cube',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': 'A set of three nut shells',
    'reference': 'PHB p. 198',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes confusion in one or more creatures within the area, creating indecision and the inability to take effective action. The spell affects [[1d4+[[@{level-wizard}]] ]] creatures. These creatures are allowed saving throws vs. spell with -2 penalties, adjusted for Wisdom. Those successfully saving are unaffected by the spell. Confused creatures react as described in the table below.\n&emsp;The spell lasts for two rounds plus one round for each level of the caster. Those who fail are checked by the DM for actions each round for the duration of the spell, or until the “wander away for the duration of the spell” result occurs.\n&emsp;Wandering creatures move as far from the caster as possible, according to their most typical mode of movement (characters walk, fish swim, bats fly, etc.). Saving throws and actions are checked at the beginning of each round. Any confused creature that is attacked perceives the attacker as an enemy and acts according to its basic nature.\n&emsp;If there are many creatures involved, the DM may decide to assume average results. For example, if there are 16 orcs affected and 25% could be expected to make the saving throw, then four are assumed to have succeeded. Out of the other 12, one wanders away, four attack the nearest creature, six stand confused, and the last acts normally but must check next round. Since the orcs are not near the party, the DM decides that two attacking the nearest creature attack each other, one attacks an orc that saved, and one attacks a confused orc, which strikes back. The next round, the base is 11 orcs, since four originally saved and one wandered off. Another one wanders off, five stand confused, four attack, and one acts normally.}}{{style=center1}}{{c1-1=**D10 Roll**}}{{c2-1=1}}{{c3-1=2-6}}{{c4-1=7-9}}{{c5-1=10}}{{cc1-2=bottom}}{{c1-2=**Action**}}{{c2-2=Wander away (unless prevented) for duration of spell}}{{c3-2=Stand confused for one round (then roll again)}}{{c4-2=Attack nearest creature for one round (then roll again)}}{{c5-2=Act normally for one round (then roll again)',
};

wiz4['Contagion'] = {
    'level': 'Level 4 Wizard',
    'school': 'Necromancy',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 199',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes a major disease and weakness in a creature. The afflicted individual is immediately stricken with painful and distracting symptoms: boils, blotches, lesions, seeping abscesses, and so on. Strength, Dexterity, and Charisma are reduced by 2. Attack rolls are decreased by 2. The effect persists until the character receives a *cure disease* spell or spends [[1d3]] weeks taking a complete rest to recover. Characters ignoring the contagion for more than a day or so may be susceptible to worse diseases at the discretion of the DM.'
};

wiz4['Detect Scrying'] = {
    'level': 'Level 4 Wizard',
    'school': 'Divination',
    'range': '0',
    'duration': '[[1d6+[[@{level-wizard}]] ]] turns',
    'aoe': '120-foot radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Special',
    'materials': 'A small piece of mirror and a miniature brass hearing trumpet.',
    'reference': 'PHB p. 199',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard immediately becomes aware of any attempt to observe him by means of clairvoyance, clairaudience, or magic mirror. This also reveals the use of crystal balls or other magical scrying devices, provided the attempt is within the area of effect of the spell. Since the spell is centered on the spellcaster, it moves with him, enabling him to ”sweep” areas for the duration of the spell.\n&emsp;When a scrying attempt is detected, the scryer must immediately roll a saving throw. If this is failed, the identity and general location of the scryer immediately become known to the wizard who cast this spell. The general location is a direction and significant landmark close to the scryer. Thus, the caster might learn, “The wizard Sniggel spies on us from east, under the stairs,” or, “You are watched by Asquil in the city of Samarquol.”',
};

wiz4['Dig'] = {
    'level': 'Level 4 Wizard',
    'school': 'Evocation',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[5*[[@{level-wizard}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': 'A miniature shovel and tiny bucket and must continue to hold them while each pit is excavated. These items disappear at the conclusion of the spell.',
    'reference': 'PHB p. 199',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *dig* spell enables the caster to excavate 125 cubic feet of earth, sand, or mud per round (i.e., a cubic hole 5 feet on a side). In later rounds the caster can expand an existing hole or start a new one. The material thrown from the excavation scatters evenly around the pit. If the wizard continues downward past 20 feet in earth, there is a 15% chance that the pit collapses. This check is made for every 5 feet dug beyond 20 feet. Sand tends to collapse after 10 feet, mud fills in and collapses after 5 feet, and quicksand fills in as rapidly as it is dug.\n&emsp;Any creature at the edge (within 1 foot) of a pit must roll a successful Dexterity check or fall into the hole. Creatures moving rapidly toward a pit dug immediately before them must roll a saving throw vs. spell to avoid falling in. Any creature in a pit being excavated can climb out at a rate decided by the DM. A creature caught in a collapsing pit must roll a saving throw vs. death to avoid being buried; it escapes the pit if successful. Tunneling is possible with this spell as long as there is space available for the material removed. Chances for collapse are doubled and the safe tunneling distance is half of the safe excavation depth, unless such construction is most carefully braced and supported.\n&emsp;The spell is also effective against creatures of earth and rock, particularly clay golems and those from the Elemental Plane of Earth. When cast upon such a creature, it suffers 4d6 points of damage. A successful saving throw vs. spell reduces this damage to half.'
};

wiz4['Dimension Door'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'The caster',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 199',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *dimension door* spell, the wizard instantly transfers himself up to 30 yards distance per level of experience. Currently [[30*[[@{level-wizard}]] ]] yards. This special form of teleportation allows for no error, and the wizard always arrives at exactly the spot desired—whether by simply visualizing the area (within spell transfer distance, of course) or by stating direction such as, “300 yards straight downward,” or, “upward to the north-west, 45 degree angle, 420 yards.” If the wizard arrives in a place that is already occupied by a solid body, he remains trapped in the Astral Plane. If distances are stated and the spellcaster arrives with no support below his feet (i.e., in mid-air), falling and damage result unless further magical means are employed. All that the wizard wears or carries, subject to a maximum weight equal to 500 pounds of nonliving matter, or half that amount of living matter, is transferred with the spellcaster. Recovery from use of a *dimension door* spell requires one round.'
};

wiz4['Emotion'] = {
    'level': 'Level 4 Wizard',
    'school': 'Enchantment/Charm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '20-foot cube',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 200',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard can create a single emotional reaction in the subject creatures. The following are typical:\n&emsp;1. *Courage:* This emotion causes the creatures affected to become berserk, fighting with a +1 bonus to the attack dice, causing +3 points of damage, and temporarily gaining 5 hit points. The recipients fight without shield and regardless of life, never checking morale. This spell counters (and is countered by) *fear.*\n&emsp;2. *Fear:* The affected creatures flee in panic for [[2d4]] rounds. It counters (and is countered by) *courage.*\n&emsp;3. *Friendship:* The affected creatures react more positively (for example, tolerance becomes goodwill). It counters (and is countered by) *hate.*\n&emsp;4. *Happiness:* This effect creates joy and a feeling of complacent well-being, adding +4 to all reaction rolls and making attack unlikely unless the creatures are subject to extreme provocation. It counters (and is countered by) *sadness.*\n&emsp;5. *Hate:* The affected creatures react more negatively (for example, tolerance becomes negative neutrality). It counters (and is countered by) *friendship.*\n&emsp;6. *Hope:* The effect of hope is to raise morale, saving throw rolls, attack rolls, and damage caused by +2. It counters (and is countered by) *hopelessness.*\n&emsp;7. *Hopelessness:* The affected creatures submit to the demands of any opponent: surrender, get out, etc. Otherwise, the creatures are 25% likely to do nothing in a round, and 25% likely to turn back or retreat. It counters (and is countered by) *hope.*\n&emsp;8. *Sadness:* This creates unhappiness and a tendency toward maudlin introspection. This emotion penalizes surprise rolls by –1 and adds +1 to initiative rolls. It counters (and is countered by) *happiness.*\n&emsp;All creatures in the area at the instant the spell is cast are affected unless successful saving throws vs. spell are made, adjusted for Wisdom. The spell lasts as long as the wizard continues to concentrate on projecting the chosen emotion. Those who fail the saving throw against fear must roll a new saving throw if they return to the affected area.'
};

wiz4['Enchanted Weapon'] = {
    'level': 'Level 4 Wizard',
    'school': 'Enchantment',
    'range': 'Touch',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Weapon(s) touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'Powdered lime and carbon',
    'reference': 'PHB p. 200',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell turns an ordinary weapon into a magical one. The weapon is the equivalent of a +1 weapon, with +1 to attack and damage rolls. Thus, arrows, axes, bolts, bows, daggers, hammers, maces,  spears,  swords,  etc.,  can  be  made  into  temporarily enchanted weapons. Two small weapons (arrows, bolts, daggers, etc.) or one large weapon (axe, bow, hammer, mace, etc.) weapon can be affected by the spell. The spell functions on existing magical weapons as long as the total combined bonus is +3 or less.\n&emsp;Missile weapons enchanted in this way lose their enchantment when they successfully hit a target, but otherwise the spell lasts its full duration. This spell is often used in combination with the *enchant an item* and *permanency* spells to create magical weapons, with this spell being cast once per desired plus of the bonus.'
};

wiz4['Enervation'] = {
    'level': 'Level 4 Wizard',
    'school': 'Necromancy',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[1d4+[[@{level-wizard}}]] ]] hours',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 200',
    'damage': '[[floor([[@{level-wizard}]]/4)]]',
    'damage-type': 'energy levels drained',
    'healing': '',
    'effect': 'This spell temporarily suppresses the subject’s life force. The necromancer points his finger and utters the incantation, releasing a black bolt of crackling energy. The subject must roll a saving throw vs. spell, adjusted for Dexterity, to avoid the bolt. Success means the spell has no effect. Failure means the subject is treated exactly as if he had been drained of energy levels by a wight, one level for every four levels of the caster. Hit Dice, spells, and other character details dependent on level are lost or reduced. Those drained to 0th level must make a system shock check to survive and are helpless until the spell expires. The spell effect eventually wears off, either after 1d4 hours plus one hour per caster level, or after six hours of complete and undisturbed rest. Level abilities are regained, but lost spells must be rememorized. Undead are immune to this spell.'
};

wiz4['Evard\'s Black Tentacles'] = {
    'level': 'Level 4 Wizard',
    'school': 'Conjuration/Summoning',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[30*[[@{level-wizard}]] ]] square feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A piece of tentacle from a giant octopus or giant squid',
    'reference': 'PHB p. 200',
    'damage': '1d4 / 2d4 / 3d4',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates many rubbery, black tentacles in the area of effect. These waving members seem to spring forth from the earth, floor, or whatever surface is underfoot—including water. Each tentacle is 10 feet long, AC 4, and requires [[@{level-wizard}]] points of damage to destroy. There are [[1d4+[[@{level-wizard}]] ]] such tentacles.\n&emsp;Any creature within range of the writhing tentacles is subject to attack as determined by the DM. The target of a tentacle attack must roll a saving throw vs. spell. If this succeeds, the subject suffers 1d4 points of damage from contact with the tentacle; the tentacle is then destroyed. Failure to save indicates that the damage inflicted is 2d4 points, the ebon member is wrapped around its subject, and damage will be 3d4 points on the second and all succeeding rounds. Since these tentacles have no intelligence to guide them, there is the possibility that they entwine any object—a tree, post, pillar, even the wizard himself—or continue to squeeze a dead opponent. A grasping hold established by a tentacle remains until the tentacle is destroyed by some form of attack or until it disappears at the end of the spell’s duration.'
};

wiz4['Extension I'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 201',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By use of an *extension I* spell, the wizard prolongs the duration of a previously cast 1st-, 2nd-, or 3rd-level spell by 50%. Thus, a *levitation* spell can be made to function 15 minutes/level, a *hold person* spell made to work for three rounds/level, etc. Naturally, the spell affects only spells that have durations. This spell must be cast immediately after the spell to be extended, either by the original caster or another wizard. If a complete round or more elapses, the extension fails and is wasted.'
};

wiz4['Fear'] = {
    'level': 'Level 4 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '0',
    'duration': 'Special',
    'aoe': '60-foot cone, 30-foot diameter at end, 5-foot at base',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'Either the heart of a hen or a white feather',
    'reference': 'PHB p. 201',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *fear* spell is cast, the wizard sends forth an invisible cone of terror that causes creatures within its area of effect to turn away from the caster and flee in panic. Affected creatures are likely to drop whatever they are holding when struck by the spell; the base chance of this is 60% at 1st level (or at 1 Hit Die), and each level (or Hit Die) above this reduces the probability by 5%. Thus, at 10th level there is only a 15% chance, and at 13th level no chance, of dropping items. Creatures affected by fear flee at their fastest rate for [[@{level-wizard}}]] melee rounds. Undead and creatures that successfully roll their saving throws vs. spell are not affected.'
};

wiz4['Fire Charm'] = {
    'level': 'Level 4 Wizard',
    'school': 'Enchantment/Charm',
    'range': '10 yards',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '15-foot radius',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A small piece of multicolored silk of exceptional thinness that the spellcaster must throw into the fire source.',
    'reference': 'PHB p. 201',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell the wizard causes a normal fire source, such as a brazier, flambeau, or bonfire, to serve as a magical agent, for from this source he causes a gossamer veil of multihued flame to encircle the fire at a distance of 5 feet. Any creatures observing the fire or the dancing circle of flame around it must successfully roll a saving throw vs. spell or be charmed into remaining motionless and gazing, transfixed, at the flames. While so charmed, creatures are subject to suggestions of 12 or fewer words, saving vs. spell with a –3 penalty, adjusted for Wisdom. The caster can give one such suggestion to each creature, and the suggestions need not be the same. The maximum duration for such a suggestion is one hour, regardless of the caster’s level.\n&emsp;The fire charm is broken if the charmed creature is physically attacked, if a solid object comes between the creature and the veil of flames so as to obstruct vision, or when the duration of the spell expires. Those exposed to the fire charm again may be affected at the DM’s option, although bonuses may also be allowed to the saving throws. Note that the veil of flame is not a magical fire, and passing through it incurs the same damage as would be sustained from passing through its original fire source.'
};

// start her
wiz4['Fire Shield'] = {
    'level': 'Level 4 Wizard',
    'school': 'Evocation, Alteration',
    'range': '0',
    'duration': '[[2+[[@{level-wizard]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '*Warm shield:* A bit of phosphorous\n*Chill shield:*A live firefly or glow worm or the tail portions of four dead ones',
    'reference': 'PHB p. 201',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can be cast in one of two forms: a warm shield that protects against cold-based attacks, or a chill shield that protects against fire-based attacks. Both return damage to creatures making physical attacks against the wizard. The wizard must choose which variation he memorizes when the spell is selected.\n&emsp;When casting this spell, the wizard appears to immolate himself, but the flames are thin and wispy, shedding no heat, and giving light equal to only half the illumination of a normal torch. The color of the flames is determined randomly (50% chance of either color)—blue or green if the chill shield is cast, violet or blue if the warm shield is employed. The special powers of each shield are as follows:\n&emsp;A) *Warm shield.* The flames are warm to the touch. Any cold-based attacks are saved against with a +2 bonus; either half normal damage or no damage is sustained. There is no bonus against fire-based attacks, but if the wizard fails to make the required saving throw (if any) against them, he sustains double normal damage.\n&emsp;B) *Chill shield.* The flames are cool to the touch. Any fire-based attacks are saved against with a +2 bonus; either half normal damage or no damage is sustained. There is no bonus against cold-based attacks, but if the wizard fails to make the required saving throw (if any) against them, he sustains double normal damage.\n&emsp;Any creature striking the spellcaster with its body or hand-held weapons inflicts normal damage upon the wizard, but the attacker suffers the same amount of damage. An attacker’s magical resistance, if any, is tested when the creature actually strikes the wizard. Successful resistance shatters the spell. Failure means the creature’s magic resistance does not affect that casting of the spell.'
};

wiz4['Fire Trap'] = {
    'level': 'Level 4 Wizard',
    'school': 'Abjuration, Evocation',
    'range': 'Touch',
    'duration': 'Until discharged',
    'aoe': 'Object touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': '½',
    'materials': 'To place this spell, the caster must trace the outline of the closure with a bit of sulphur or saltpeter and touch the center of the effect. Attunement to another individual requires a hair or similar object from that person.',
    'reference': 'PHB p. 201',
    'damage': '1d4+[[@{level-wizard}]]',
    'damage-type': 'fire',
    'healing': '',
    'effect': 'Any closeable item (book, box, bottle, chest, coffer, coffin, door, drawer, and so forth) can be warded by a *fire trap* spell. The spell is centered on a point selected by the spellcaster. The item so trapped cannot have a second closure or warding spell placed upon it (if such is attempted, the chance is 25% that the first spell fails, 25% that the second spell fails, or 50% that both spells fail). A *knock* spell does not affect a fire trap in any way—as soon as the offending party enters or touches the item, the trap discharges. Thieves and others have only half their normal chance to detect a fire trap (by noticing the characteristic markings required to cast the spell). They have only half their normal chance to remove the trap (failure detonates the trap immediately). An unsuccessful dispel does not detonate the spell. The caster can use the trapped object without discharging it, as can any individual to whom the spell was specifically attuned when cast (the exact method usually involves a keyword). When the trap is discharged, there is an explosion of 5-foot radius from the spell’s center; all creatures within this area must roll saving throws vs. spell. Damage is 1d4 points plus 1 point per level of the caster, or half (round up) for creatures successfully saving. (Under water, this ward inflicts half damage and creates a large cloud of steam.) The item trapped is not harmed by this explosion.'
};

wiz4['Fumble'] = {
    'level': 'Level 4 Wizard',
    'school': 'Enchantment/Charm',
    'range': '[[10*[[@{level-wizard}]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '30-foot cube',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': 'A dab of solidified milk fat',
    'reference': 'PHB p. 202',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *fumble* spell is cast, the wizard creates an area in which all creatures suddenly become clumsy and awkward. Running creatures trip and fall, those reaching for an item drop it, those employing weapons likewise awkwardly drop them, etc. Recovery from a fall or picking up a fumbled object typically requires a successful saving throw and takes one round. Note that breakable items might suffer damage when dropped. A subject succeeding with his saving throw can act freely that round, but if he is in the area at the beginning of the next round, another saving throw is required. Alternatively, the spell can be cast at an individual creature. Failure to save means the creature is affected for the spell’s entire duration; success means the creature is slowed (see the 3rd-level spell).'
};

wiz4['Hallucinatory Terrain'] = {
    'level': 'Level 4 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '[[20*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[10*[[@{level-wizard}]] ]] yards cube',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A stone, a twig, and a bit of green plant—a leaf or grass blade',
    'reference': 'PHB p. 202',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard causes an illusion that hides the actual terrain within the area of effect. Thus, open fields or a road can be made to look like a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to look like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road. The hallucinatory terrain persists until a *dispel magic* spell is cast upon the area or until the duration expires. Individual creatures may see through the illusion, but the illusion persists, affecting others who observe the scene.\n&emsp;If the illusion involves only a subtle change, such as causing an open wood to appear thick and dark, or increasing the slope of a hill, the effect may be unnoticed even by those in the midst of it. If the change is extreme (for example, a grassy plain covering a seething field of volcanic mudpots), the illusion will no doubt be noticed the instant one person falls prey to it. Each level of experience expands the dimensions of the cubic area affected by 10 yards; for example, a 12th-level caster affects an area 120 yds. × 120 yds. × 120 yds.'
};

wiz4['Ice Storm'] = {
    'level': 'Level 4 Wizard',
    'school': 'Evocation',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '20 or 40 foot radius',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A pinch of dust and a few drops of water',
    'reference': 'PHB p. 202',
    'damage': '[[3d10]] or none',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can have one of two effects, at the caster’s option: Either great hail stones pound down for one round in a 40-foot-diameter area and inflict 3d10 points of damage to any creatures within the area of effect, or driving sleet falls in an 80-foot-diameter area for [[@{level-wizard}]] rounds. The sleet blinds creatures within its area for the duration of the spell and causes the ground in the area to be icy, slowing movement by 50% and making it 50% probable that a creature trying to move in the area slips and falls. The sleet also extinguishes torches and small fires.\n&emsp;Note that this spell will negate a *heat metal* spell.'
};

wiz4['Illusionary Wall'] = {
    'level': 'Level 4 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '1 × 10 × 10 feet',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A rare dust that costs at least 400 gp and requires four days to prepare',
    'reference': 'PHB p. 202',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates the illusion of a wall, floor, ceiling, or similar surface, which is permanent until dispelled. It appears absolutely real when viewed (even magically, as with the priest spell *true seeing* or its equivalent), but physical objects can pass through it without difficulty. When the spell is used to hide pits, traps, or normal doors, normal demihuman and magical detection abilities work normally, and touch or probing searches reveal the true nature of the surface, though they do not cause the illusion to disappear.'
};

wiz4['Improved Invisibility'] = {
    'level': 'Level 4 Wizard',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': '[[4+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 203',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to the *invisibility* spell, but the recipient is able to attack, either by missile discharge, melee combat, or spellcasting, and remain unseen. Note, however, that telltale traces (such as a shimmering effect) sometimes allow an observant opponent to attack the invisible spell recipient. These traces are only noticeable when specifically looked for (after the invisible character has made his presence known). Attacks against the invisible character suffer –4 penalties to the attack rolls, and the invisible character’s saving throws are made with a +4 bonus. Beings with high Hit Dice that might normally notice invisible opponents will notice a creature under this spell as if they had 2 fewer Hit Dice (they roll saving throws vs. spell; success indicates they spot the character).'
};

wiz4['Leomund\'s Secure Shelter'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration, Enchantment',
    'range': '20 yards',
    'duration': '[[1d4+1+[[@{level-wizard}]] ]] hours',
    'aoe': '[[30*[[@{level-wizard}]] ]] square feet',
    'components': 'V, S, M',
    'cast-time': '4 turns',
    'saving-throw': 'None',
    'materials': 'A square chip of stone, crushed lime, a few grains of sand, a sprinkling of water, and several splinters of wood, augmented by the components of the *alarm* and *unseen servant* spells if these benefits are to be included (string and silver wire and a small bell)',
    'reference': 'PHB p. 203',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to magically call into being a sturdy cottage or lodge, made of material that is common in the area where the spell is cast—stone, timber, or (at worst) sod. The floor area of the lodging is [[30*[[@{level-wizard}]] ]] square feet, and the surface is level, clean, and dry. In all respects the lodging resembles a normal cottage, with a sturdy door, two or more shuttered windows, and a small fireplace.\n&emsp;While the lodging is secure against winds of up to 70 miles per hour, it has no heating or cooling source (other than natural insulation qualities). Therefore, it must be heated as a normal dwelling, and extreme heat adversely affects it and its occupants. The dwelling does, however, provide considerable security otherwise, as it is as strong as a normal stone building, regardless of its material composition. The dwelling resists flames and fire as if it were stone, and is impervious to normal missiles (but not the sort cast by siege machinery or giants).\n&emsp;The door, shutters, and even chimney are secure against intrusion, the former two being wizard locked and the latter being secured by a top grate of iron and a narrow flue. In addition, these three areas are protected by an *alarm* spell. Lastly, an unseen servant is conjured to provide service to the spellcaster.\n&emsp;The inside of the shelter contains rude furnishings as desired by the spellcaster—up to eight bunks, a trestle table and benches, as many as four chairs or eight stools, and a writing desk.'
};

wiz4['Magic Mirror'] = {
    'level': 'Level 4 Wizard',
    'school': 'Enchantment, Divination',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 hr.',
    'saving-throw': 'None',
    'materials': 'A mirror of finely wrought and highly polished silver costing not less than 1,000 gp, the eye of a hawk, an eagle, or even a roc, and nitric acid, copper, and zinc',
    'reference': 'PHB p. 203',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard changes a normal mirror into a scrying device similar to a crystal ball. The details of the use of such a scrying device are found in the *DMG* (in Appendix 3: Magical Item Descriptions, under the description for the *crystal ball*).\n&emsp;The mirror used is not harmed by casting the spell, but the other material components are used up.\n&emsp;The following spells can be cast through a magic mirror: *comprehend languages, read magic, tongues,* and *infravision.* The following spells have a [[5*[[@{level-wizard}]] ]]% chance of operating correctly: *detect magic, detect good or evil,* and *message.* The base chances for the subject to detect any *crystal ball*-like spell are listed in the *DMG* (again, in Appendix 3: Magical Item Descriptions, under the description for the *crystal ball*).'
};

wiz4['Massmorph'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '[[10*[[@{level-wizard}]] ]] foot cube',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A handful of bark chips from the type of tree the creatures are to become',
    'reference': 'PHB p. 203',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast upon willing creatures of man-size or smaller, up to [[10*[[@{level-wizard}]] ]] such creatures can be magically altered to appear as trees of any sort. Thus, a company of creatures can be made to appear as a copse, grove, or orchard. Furthermore, these massmorphed creatures can be passed through and even touched by other creatures without revealing their true nature. Note, however, that blows to the creature-trees cause damage, and blood can be seen.\n&emsp;Creatures to be massmorphed must be within the spell’s area of effect; unwilling creatures are not affected. Affected creatures remain unmoving but aware, subject to normal sleep requirements, and able to see, hear, and feel for as long as the spell is in effect. The spell persists until the caster commands it to cease or until a *dispel magic* spell is cast upon the creatures. Creatures left in this state for extended periods are subject to insects, weather, disease, fire, and other natural hazards.'
};

wiz4['Minor Creation'] = {
    'level': 'Level 4 Wizard',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[@{level-wizard}]] cubic feet',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A tiny piece of matter of the same type of item he plans to create by means of the *minor creation* spell—a bit of twisted hemp to create rope, a splinter of wood to create a door, and so forth',
    'reference': 'PHB p. 203',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to create an item of nonliving, vegetable nature—soft goods, rope, wood, etc. The caster actually pulls wisps of material of the plane of Shadow from the air and weaves them into the desired item. The volume of the item created cannot exceed [[@{level-wizard}]] cubic feet. The item remains in existence for only as long as the spell’s duration.'
};

wiz4['Minor Globe of Invulnerability'] = {
    'level': 'Level 4 Wizard',
    'school': 'Abjuration',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '5-foot radius',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A glass or crystal bead that shatters at the expiration of the spell',
    'reference': 'PHB p. 204',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates an immobile, faintly shimmering magical sphere around the caster that prevents any 1st-, 2nd-, or 3rd-level spell effects from penetrating (i.e., the area of effect of any such spells does not include the area of the minor globe of invulnerability). This includes innate abilities and effects from devices. However, any type of spell can be cast out of the magical globe, and these pass from the caster of the globe to their subject without affecting the globe. Fourth and higher level spells are not affected by the globe. The globe can be brought down by a successful *dispel magic* spell. The caster can leave and return to the globe without penalty. Note that spell effects are not actually disrupted by the globe unless cast directly through or into it: The caster would still see a mirror image created by a wizard outside the globe. If that wizard then entered the globe, the images would wink out, to reappear when the wizard exited the globe. Likewise, a wizard standing in the area of a *light* spell would still receive sufficient light for vision, even though that part of the *light* spell volume in the globe would not be luminous.'
};

wiz4['Monster Summoning II'] = {
    'level': 'Level 4 Wizard',
    'school': 'Conjuration/Summoning',
    'range': 'Special',
    'duration': '[[3+[[@{[level-wizard}]] ]] rounds',
    'aoe': '40 yard radius',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A tiny bag and a small (not necessarily lit) candle',
    'reference': 'PHB p. 204',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is much like the 3rd-level spell *monster summoning I,* except that this spell summons [[1d6]] 2nd-level monsters. These appear anywhere within the spell’s area of effect and attack the caster’s opponents, until he commands them to cease, the spell duration expires, or the monsters are slain. These creatures do not check morale; they vanish when slain. If no opponent exists to fight and the wizard can communicate with them, the summoned monsters can perform other services for the summoning wizard.'
};

wiz4['Otiluke\'s Resilient Sphere'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration, Evocation',
    'range': '20 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[@{level-wizard}]]-foot diameter',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A hemispherical piece of diamond (or similar hard, clear gem material) and a matching hemispherical piece of gum arabic',
    'reference': 'PHB p. 204',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the result is a globe of shimmering force that encloses the subject creature—if it is small enough to fit within the diameter of the sphere and it fails to successfully save vs. spell. The resilient sphere contains its subject for the spell’s duration, and it is not subject to damage of any sort except from a *rod of cancellation,* a *wand of negation,* or a *disintegrate* or *dispel magic* spell. These cause it to be destroyed without harm to the subject. Nothing can pass through the sphere, inside or out, though the subject can breathe normally. The subject may struggle, but all that occurs is a movement of the sphere. The globe can be physically moved either by people outside the globe or by the struggles of those within.'
};

wiz4['Phantasmal Killer'] = {
    'level': 'Level 4 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 205',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard creates the illusion of the most fearsome thing imaginable to the victim, simply by forming the fears of the victim’s subconscious mind into something that its conscious mind can visualize—the most horrible beast. Only the spell recipient can see the phantasmal killer (the caster sees only a shadowy shape), but if it succeeds in scoring a hit, the subject dies from fright. The beast attacks as a 4 Hit Dice monster. It is invulnerable to all attacks and can pass through any barriers, Once cast, it inexorably pursues the subject, for it exists only in the subject’s mind.\n&emsp;The only defenses against a phantasmal killer are an attempt to disbelieve (which can be tried but once), slaying or rendering unconscious the wizard who cast the spell, or rendering unconscious the target of the spell for its duration. To disbelieve the killer, the subject must specifically state the attempt and then roll an Intelligence check. This roll has a –1 penalty for every four levels of the caster. Currently [[-1*floor([[@{level-wizard}]]/4)]] penalty.\n&emsp;Special modifiers apply to this attack:}}{{style=center2 sheet-spell-bottom2}}{{c1-1=**Condition**}}{{c2-1=Surprise}}{{c3-1=Subject previously attacked by this spell}}{{c4-1=Subject is an illusionist}}{{c5-1=Subject is wearing a *helm of telepathy*}}{{c1-2=**Modifier**}}{{c2-2=-2}}{{c3-2=+1}}{{c4-2=+2}}{{c5-2=+3}}{{effects2=&emsp;Magic resistance, bonuses against fear, and Wisdom adjustments also apply. The subject’s magic resistance is checked first; if the spell overcomes the resistance, the subject’s fear/Wisdom bonuses (if any) then apply as negative modifiers to his Intelligence check.\n&emsp;If the subject of a phantasmal killer attack succeeds in disbelieving, and he is wearing a *helm of telepathy*, the beast can be turned upon the wizard, who must then disbelieve it or be subject to its attack and possible effects.\n&emsp;If the subject ignores the killer to perform other actions, such as attacking the caster, the killer may, at the DM’s option, gain bonuses to hit (for flank or rear attacks, etc.). Spells such as *remove fear* and *cloak of bravery,* cast after the killer has attacked, grant another check to disbelieve the effect.'
};

wiz4['Plant Growth'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '[[100*[[@{level-wizard}]]*[[@{level-wizard}]] ]] square feet',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 205',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *plant growth* spell is cast, the wizard causes normal vegetation to grow, entwine, and entangle to form a thicket or jungle that creatures must hack or force a way through at a movement rate of 1 per round (or 2 if the creatures are larger than man size). The area must contain brush and trees for this spell to work. Briars, bushes, creepers, lianas, roots, saplings, thistles, thorn, trees, vines, and weeds become thick and overgrown so as to form a barrier. The area of effect is the caster’s level, squared, times 100 square feet. This area can be arranged in any square or rectangular shape that the caster desires. Thus, an 8th-level wizard can affect (8 × 8 =) 64 × 100 square feet, or 6,400 square feet. This could be an 80-foot × 80-foot square, a 160-foot × 40-foot rectangle, a 640-foot × 10-foot rectangle, etc. Individual plant girth and height is generally affected less than thickness of brush, branch, and undergrowth. The spell’s effects persist in the area until it is cleared by labor, fire, or such magical means as a *dispel magic* spell.'
};

wiz4['Polymorph Other'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A caterpillar cocoon',
    'reference': 'PHB p. 206',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *polymorph other* spell is a powerful magic that completely alters the form and ability, and possibly the personality and mentality, of the recipient. Of course, while a creature with a lower Intelligence can be polymorphed in form into something with a higher Intelligence, it will not gain that creature’s mental ability. The reverse—polymorphing a higher Intelligence creature into one of significantly lower Intelligence—results in a creature much more intelligent than appearances would lead one to believe. The polymorphed creature must succeed on a system shock (see Table 3) roll to see if it survives the change. After this, it must make a special Intelligence check to see if it retains its personality (see following).\n&emsp;The polymorphed creature acquires the form and physical abilities of the creature it has been polymorphed into, while retaining its own mind. Form includes natural Armor Class (that due to skin toughness, but not due to quickness, magical nature, etc.), physical movement abilities (walking, swimming, and flight with wings, but not plane shifting, blinking, teleporting, etc.), and attack routines (claw/claw/bite, swoop, rake, and constriction, but not petrification, breath weapons, energy drain, etc.). Hit points and saving throws do not change from the original form. Noncorporeal forms cannot be assumed. Natural shapeshifters (lycanthropes, dopplegangers, higher level druids, etc.) are affected for but one round, and can then resume their normal form.\n&emsp;If slain, the polymorphed creature reverts to its original form, though it remains dead. (Note that most creatures generally prefer their own form and will not willingly stand the risk of being subjected to this spell!) As class and level are not attributes of form, abilities derived from either cannot be gained by this spell, nor can exact ability scores be specified.\n&emsp;When the polymorph occurs, the creature’s equipment, if any, melds into the new form (in particularly challenging campaigns, the DM may allow protective devices, such as a *ring of protection,* to continue operating effectively). The creature retains its mental abilities, including spell use, assuming the new form allows completion of the proper verbal and somatic components and the material components are available. Creatures not used to a new form might be penalized at the DM’s option (for example, –2 to attack rolls) until they practice sufficiently to master it.\n&emsp;When the physical change occurs, there is a base 100% chance that the subject’s personality and mentality change into that of the new form (i.e., a roll of 20 or less on 1d20). For each 1 point of Intelligence of the subject, subtract 1 from the base chance on 1d20. Additionally, for every Hit Die of difference between the original form and the form it is assuming, add or subtract 1 (depending on whether the polymorphed form has more Hit Dice [or levels] or fewer Hit Dice [or levels] than original, respectively). The chance for assumption of the personality and mentality of the new form is checked daily until the change takes place.\n&emsp;A subject acquiring the mentality of the new form has effectively become the creature whose form was assumed and comes under the control of the DM until recovered by a *wish* spell or similar magic. Once this final change takes place, the creature acquires the new form’s full range of magical and special abilities.\n&emsp;For example: If a 1 Hit Die orc of 8 Intelligence is polymorphed into a white dragon with 6 Hit Dice, it is 85% (20 – 8 Intelligence + 5 level difference [6–1] = 17 out of 20 = 85%) likely to actually become one in all respects, but in any case it has the dragon’s physical and mental capabilities. If it does not assume the personality and mentality of a white dragon, it knows what it formerly knew as well.\n&emsp;The wizard can use a *dispel magic* spell to change the polymorphed creature back to its original form, and this requires a system shock roll. Those who have lost their individuality and are then converted back maintain the belief that they are actually the polymorphed creature and attempt to return to that form. Thus, the orc who comes to believe he is a white dragon, when converted back to his orc form, steadfastly maintains he is really a white dragon polymorphed into the shape of an orc. His companions will most likely consider him mad.'
};

wiz4['Polymorph Self'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[2*[[@{level-wizard}]] ]] turns',
    'aoe': 'The caster',
    'components': 'V',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 206',
    'damage': '',
    'damage-type': '',
    'healing': '1d12 hit points when spell ends',
    'effect': 'When this spell is cast, the wizard is able to assume the form of any creature, save those that are noncorporeal, from as small as a wren to as large as a hippopotamus. Furthermore, the wizard gains its physical mode of locomotion and breathing as well. No system shock roll is required. The spell does not give the new form’s other abilities (attack, magic, special movement, etc.), nor does it run the risk of the wizard changing personality and mentality.\n&emsp;When the polymorph occurs, the caster’s equipment, if any, melds into the new form (in particularly challenging campaigns, the DM may allow protective devices, such as a *ring of protection,* to continue operating effectively). The caster retains all mental abilities, including spell use, assuming the new form allows completion of the proper verbal and somatic components and the material components are available. A caster not used to a new form might be penalized at the DM’s option (for example, –2 penalty to attack rolls) until he practices sufficiently to master it.\n&emsp;Thus, a wizard changed into an owl could fly, but his vision would be human; a change to a black pudding would enable movement under doors or along halls and ceilings, but not the pudding’s offensive (acid) or defensive capabilities. Naturally, the strength of the new form is sufficient to enable normal movement. The spellcaster can change his form as often as desired for the duration of the spell, each change requiring a round. The wizard retains his own hit points, attack rolls, and saving throws. The wizard can end the spell at any time; when voluntarily returning to his own form and ending the spell, he regains 1d12 hit points. The wizard also will return to his own form when slain or when the effect is dispelled, but no hit points are restored in these cases.'
};

wiz4['Rainbow Pattern'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration, Illusion/Phantasm',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '30-foot cube',
    'components': 'S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A crystal prism and a piece of phosphor',
    'reference': 'PHB p. 206',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard creates a glowing, rainbow-hued band of interweaving patterns. Any creature caught in it may become fascinated and gaze at it as long as the effect lasts. The spell can captivate a maximum of 24 levels, or Hit Dice, of creatures—24 creatures with 1 Hit Die each, 12 with 2 Hit Dice, etc. All creatures affected must be within the area of effect, and each is entitled to a saving throw vs. spell. An attack on an affected creature that causes damage frees it from the spell immediately. Creatures that are restrained and removed from the area still try to follow the pattern.\n&emsp;Once the rainbow pattern is cast, the wizard need only gesture in the direction he desires, and the pattern of colors moves slowly off in that direction, at the rate of 30 feet per round. It persists without further attention from the spellcaster for [[1d3]] rounds. All affected creatures follow the moving rainbow of light. If the pattern leads its subjects into a dangerous area (through flame, off a cliff, etc.), allow a second saving throw. If the view of the lights is completely blocked (by an *obscurement* spell, for instance), the spell is negated.\n&emsp;The wizard need not utter a sound, but he must gesture appropriately while holding a crystal prism and the material component.'
};

wiz4['Rary\'s Mnemonic Enhancer'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': '1 day',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A piece of string, an ivory plaque of at least 100 gp value, and ink consisting of squid secretion with either black dragon’s blood or giant slug digestive juice',
    'reference': 'PHB p. 206',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to memorize, or retain the memory of, three additional spell levels (three 1st-level spells, or one 1st and one 2nd, or one 3rd-level spell). The wizard has two options:\n&emsp;A) Memorize additional spells. This option is taken at the time the spell is cast. The additional spells must be memorized normally and any material components must be acquired.\n&emsp;B) Retain memory of any spell (within the level limits) cast the round prior to starting to cast this spell. The round after a spell is cast, the enhancer must be successfully cast. This restores the previously cast spell to memory. However, the caster still must acquire any needed material components.\n&emsp;The material components disappear when the spell is cast.'
};

wiz4['Remove Curse'] = {
    'level': 'Level 4 Wizard',
    'school': 'Abjuration (Reversible)',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 207',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, the wizard is usually able to remove a curse—whether it is on an object, on a person, or in the form of some undesired sending or evil presence. Note that the *remove curse* spell cannot affect a cursed shield, weapon, or suit of armor, for example, although it usually enables a person afflicted with a cursed item to be rid of it. Certain special curses may not be countered by this spell, or may be countered only by a caster of a certain level or higher. A caster of 12th level or higher can cure lycanthropy with this spell by casting it on the animal form. The were-creature receives a saving throw vs. spell and, if successful, the spell fails and the wizard must gain a level before attempting the remedy again.\n&emsp;The reverse of the spell is not permanent; the *bestow curse* lasts [[@{level-wizard}]] turns. It causes one of the following effects (roll percentile dice):}}{{style=center1 sheet-spell-bottom2}}{{c1-1=**D100 Roll**}}{{c2-1=1–50}}{{c3-1=51–75}}{{c4-1=76–00}}{{c1-2=**Result**}}{{c2-2=Lowers one ability of the subject to 3 (the DM determines which by random selection)}}{{c3-2=Worsens the subject’s attack rolls and saving throws by –4}}{{c4-2=Makes the subject 50% likely per turn to drop whatever it is holding (or simply do nothing, in the case of creatures not using tools)}}{{effects2=&emsp;It is possible for a wizard to devise his own curse, and it should be similar in power to those given (the DM has final say). The subject of a *bestow curse* spell must be touched. If the subject is touched, a saving throw is still applicable; if it is successful, the effect is negated. The bestowed curse cannot be dispelled.'
};

wiz4['Shadow Monsters'] = {
    'level': 'Level 4 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '20-foot cube',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 207',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A wizard casting the *shadow monsters* spell uses material from the Demiplane of Shadow to shape semireal illusions of one or more monsters. The total Hit Dice of the shadow monster or monsters thus created cannot exceed [[@{level-wizard}]]; thus, a 10th-level wizard can create one creature that has 10 Hit Dice, two that have 5 Hit Dice, etc. All shadow monsters created by one spell must be of the same sort. The actual hit point total for each monster is 20% of the hit point total it would normally have. (To determine this, roll the appropriate Hit Dice and multiply the hit points by 0.2. Any remainder less than 0.4 is dropped—in the case of monsters with 1 or fewer Hit Dice, this indicates the monster was not successfully created—and scores between 0.4 and 1 are rounded up to 1 hit point.)\n&emsp;Those viewing the shadow monsters are allowed to disbelieve as per normal illusions, although there is a –2 penalty to the attempt. The shadow monsters perform as the real monsters with respect to Armor Class and attack forms. Those who believe in the shadow monster suffer real damage from their attacks. Special attack forms such as petrification or level drain do not actually occur, but a subject who believes they are real will react appropriately.\n&emsp;Those who roll successful saving throws see the shadow monsters as transparent images superimposed on vague shadowy forms. These are Armor Class 10 and inflict only 20% of normal melee damage (biting, clawing, weapon, etc.), dropping fractional damage less than 0.4 as done with hit points.\n&emsp;For example: A shadow monster griffon attacks a person who knows it is only quasi-real. The monster strikes with two claw attacks and one bite, hitting as a 7-Hit Die monster. All three attacks hit; the normal damage dice are rolled, multiplied by 0.2 separately, rounded up or down, and added together to get the total damage. Thus, if the attacks score 4, 2 and 11 points, a total of 4 points of damage is inflicted (4 × 0.2 = 0.8 [rounded to 1], 2 × 0.2 = 0.4 [rounded to 1], 11 × 0.2 = 2.2 [rounded to 2]. The sum is 1 + 1 + 2 = 4).'
};

wiz4['Shout'] = {
    'level': 'Level 4 Wizard',
    'school': 'Evocation',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': '10 × 30 foot cone',
    'components': 'V, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A drop of honey, a drop of citric acid, and a small cone made from a bull or ram horn',
    'reference': 'PHB p. 207',
    'damage': '[[2d6]]',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *shout* spell is cast, the wizard gives himself tremendous vocal powers. The caster can emit an ear-splitting noise that has a principal effect in a cone shape radiating from his mouth to a point 30 feet away. Any creature within this area is deafened for [[2d6]] rounds and suffers 2d6 points of damage. A successful saving throw vs. spell negates the deafness and reduces the damage by half. Any exposed brittle or crystal substance subject to sonic vibrations is shattered by a shout, while those brittle objects in the possession of a creature receive the creature’s saving throw. Deafened creatures suffer a –1 penalty to surprise rolls, and those that cast spells with verbal components are 20% likely to miscast them.\n&emsp;The *shout* spell cannot penetrate the 2nd-level priest spell, *silence, 10’ radius.* This spell can be employed only once per day; otherwise, the caster might permanently deafen himself.'
};

wiz4['Solid Fog'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration',
    'range': '30 yards',
    'duration': '[[2d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '[[20*10*10*[[@{level-wizard}]] ]] foot volume',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A pinch of dried, powdered peas combined with powdered animal hoof',
    'reference': 'PHB p. 207',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard creates a billowing mass of misty vapors similar to a *wall of fog* spell. The caster can create less vapor if desired, as long as a rectangular or cubic mass at least 10 feet on a side is formed. The fog obscures all sight, normal and infravision, beyond 2 feet. However, unlike normal fog, only a very strong wind can move these vapors, and any creature attempting to move through the solid fog progresses at a movement rate of 1 foot per round. A *gust of wind* spell cannot affect it. A fireball, flame strike, or wall of fire can burn it away in a single round.'
};

wiz4['Stoneskin'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'Granite and diamond dust sprinkled on the recipient’s skin',
    'reference': 'PHB p. 208',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the affected creature gains a virtual immunity to any attack by cut, blow, projectile, or the like. Even a *sword of sharpness* cannot affect a creature protected by *stoneskin*, nor can a rock hurled by a giant, a snake’s strike, etc. However, magical attacks from such spells as *fireball, magic missile, lightning bolt,* and so forth have their normal effects. The spell’s effects are not cumulative with multiple castings.\n&emsp;The spell blocks [[1d4+floor([[@{level-wizard}]]/2)]] attacks. This limit applies regardless of attack rolls and regardless of whether the attack was physical or magical. For example, a *stoneskin* spell cast by a 9th-level wizard would protect against from five to eight attacks. An attacking griffon would reduce the protection by three each round; four magic missiles would count as four attacks in addition to inflicting their normal damage.'
};

wiz4['Vacancy'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration, Illusion/Phantasm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[10*[[@{level-wizard}]] ]]-foot radius',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A square of the finest black silk worth at least 100 gp',
    'reference': 'PHB p. 208',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *vacancy* spell is cast, the wizard causes an area to appear to be vacant, neglected, and unused. Those who behold the area see dust on the floor, cobwebs, dirt, and other conditions typical of a long-abandoned place. If they pass through the area of effect, they seem to leave tracks, tear away cobwebs, and so on. Unless they actually contact some object cloaked by the spell, the place appears empty. Merely brushing an invisible object does not cause the *vacancy* spell to be disturbed: Only forceful contact grants a chance to note that all is not as it seems.\n&emsp;If forceful contact with a cloaked object occurs, those creatures subject to the spell can penetrate the spell only if they discover several items that they cannot see; each being is then entitled to a sav-ing throw vs. spell. Failure means they believe that the objects are invisible. A *dispel magic* spell cancels this spell so that the true area is seen. A *true seeing* spell, a *gem of seeing*, and similar effects can penetrate the deception, but a *detect invisibility* spell cannot. This spell is a very powerful combination of invisibility and illusion, but it can cloak only nonliving things. Living things are not made invisible, but their presence does not otherwise disturb the spell. The material component is used up during spellcasting.'
};

wiz4['Wall of Fire'] = {
    'level': 'Level 4 Wizard',
    'school': 'Evocation',
    'range': '60 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'Phosphorus',
    'reference': 'PHB p. 208',
    'damage': '2d4 / 1d4 heat damage or 2d6+[[@{level-wizard}]]',
    'damage-type': 'fire damage',
    'healing': '',
    'effect': 'The *wall of fire* spell brings forth an immobile, blazing curtain of magical fire of shimmering color—violet or reddish blue. The spell creates either an opaque sheet of flame up to one 20-foot square per level of the spellcaster ([[20*[[@{level-wizard}]] ]]-foot square), or a ring with a radius of up to 10 feet + 5 feet per two levels of experience of the wizard ([[10+5*floor([[@{level-wizard}]]/2)]] feet). In either form, the wall of fire is 20 feet high.\n&emsp;The wall of fire must be cast so that it is vertical with respect to the caster. One side of the wall, selected by the caster, sends forth waves of heat, inflicting [[2d4]] points of damage upon creatures within 10 feet and [[1d4]] points of damage upon those within 20 feet. In addition, the wall inflicts [[2d6+[[@{level-wizard}]] ]] points of damage upon any creature passing through it. Creatures especially subject to fire may take additional damage, and undead always take twice normal damage. Note that attempting to catch a moving creature with a newly-created wall of fire is difficult; a successful saving throw enables the creature to avoid the wall, while its rate and direction of movement determine which side of the created wall it is on. The wall of fire lasts as long as the wizard concentrates on maintaining it, or [[@{level-wizard}]] rounds, in the event he does not wish to concentrate upon it.'
};

wiz4['Wall of Ice'] = {
    'level': 'Level 4 Wizard',
    'school': 'Evocation',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A small piece of quartz or similar rock crystal',
    'reference': 'PHB p. 208',
    'damage': 'See below',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can be cast in one of three ways: as an anchored plane of ice, as a hemisphere, or as a horizontal sheet to fall upon creatures with the effect of an ice storm.\n&emsp;A) *Ice plane.* When this spell is cast, a sheet of strong, hard ice is created. The wall is primarily defensive, stopping pursuers and the like. The wall is [[@{level-wizard}]] inches thick. It covers a [[10*[[@{level-wizard}]] ]]-foot-square area (a 10th-level wizard can create a wall of ice 100 feet long and 10 feet high, a wall 50 feet long and 20 feet high, etc.). Any creature breaking through the ice suffers [[2*[[@{level-wizard}]] ]] points of damage. Fire-using creatures suffer [[3*[[@{level-wizard}]] ]] points of damage, while cold-using creatures suffer only [[@{level-wizard}]] points of damage when breaking through. The plane can be oriented in any fashion as long as it is anchored along one or more sides.\n&emsp;B) *Hemisphere.* This casting of the spell creates a hemisphere whose maximum radius is equal to [[3+[[@{level-wizard}]] ]] feet. Thus, a 7th-level caster can create a hemisphere 10 feet in radius. The hemisphere lasts until it is broken, dispelled, or melted. Note that it is possible, but difficult, to trap mobile opponents under the hemisphere.\n&sbsp;C) *Ice sheet.* This casting of the spell causes a horizontal sheet to fall upon opponents. The sheet covers a [[10*[[@{level-wizard}]] ]]-foot-square area. The sheet has the same effect as an ice storm’s hail stones—3d10 points of damage inflicted to creatures beneath it.\n&emsp;A wall of ice cannot form in an area occupied by physical objects or creatures; its surface must be smooth and unbroken when created. Magical fires such as fireballs and fiery dragon breath melt a wall of ice in one round, though this creates a great cloud of steamy fog that lasts one turn. Normal fires or lesser magical ones do not hasten the melting of a wall of ice.'
};

wiz4['Wizard Eye'] = {
    'level': 'Level 4 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A bit of bat fur',
    'reference': 'PHB p. 209',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is employed, the wizard creates an invisible sensory organ that sends him visual information. The wizard eye travels at 30 feet per round if viewing an area ahead as a human would (i.e., primarily looking at the floor), or 10 feet per round if examining the ceiling and walls as well as the floor ahead. The wizard eye can see with infravision up to 10 feet, and with normal vision up to 60 feet away in brightly lit areas. The wizard eye can travel in any direction as long as the spell lasts. It has substance and a form that can be detected (by a *detect invisibility* spell, for instance). Solid barriers prevent the passage of a wizard eye, although it can pass through a space no smaller than a small mouse hole (1 inch in diameter).\n&emsp;Using the eye requires the wizard to concentrate. However, if his concentration is broken, the spell does not end—the eye merely becomes inert until the wizard again concentrates, subject to the duration of the spell. The powers of the eye cannot be enhanced by other spells or items. The caster is subject to any gaze attack met by the eye. A successful dispel cast on the wizard or eye ends the spell. With respect to blindness, magical darkness, and so on, the wizard eye is considered an independent sensory organ of the caster.'
};

const wiz5 = {};
wiz5['Advanced Illusion'] = {
    'level': 'Level 5 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '[[60+(10*[[@{level-wizard}]])]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[40+(10*[[@{level-wizard}]])]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'A bit of fleece and several grains of sand',
    'reference': 'PHB p. 209',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is essentially a *spectral forces* spell that operates through a program (similar to a *programmed illusion* spell) determined by the caster. It is thus unnecessary for the wizard to concentrate on the spell for longer than the round of casting it, as the program has then started and will continue without supervision. The illusion has visual, audio, olfactory, and thermal components. If any viewer actively attempts to disbelieve the spell, he gains a saving throw vs. spell. If any viewer successfully disbelieves and communicates this fact to other viewers, each such viewer gains a saving throw vs. spell with a +4 bonus.'
};

wiz5['Airy Water'] = {
    'level': 'Level 5 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '10-foot radius sphere or 15-foot radius hemisphere',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A small handful of alkaline or bromine salts',
    'reference': 'PHB p.209',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *airy water* spell turns normal liquid, such as water or water-based solutions, into a less dense, breathable substance. Thus, if the wizard wanted to enter an underwater place, he would step into the water, cast the spell, and sink downward in a globe of bubbling water. He and any companions in the spell’s area of effect can move freely and breathe just as if the bubbling water were air. The globe is centered on and moves with the caster. Water-breathing creatures avoid a sphere (or hemisphere) of airy water, although intelligent ones can enter it if they are able to move by means other than swimming. No water-breathers can breathe in an area affected by this spell. There is only one word that needs to be spoken to actuate the magic; thus, it can be cast under water. The spell does not filter or remove solid particles of matter.'
};

wiz5['Animal Growth'] = {
    'level': 'Level 5 Wizard',
    'school': 'Alteration (Reversible)',
    'range': '60 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Up to 8 animals in a 20-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A pinch of powdered bone',
    'reference': 'PHB p. 209',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard causes all designated animals, up to a maximum of eight, within a 20-foot-square area to grow to twice their normal size. The effects of this growth are doubled Hit Dice (with improvement in attack rolls) and doubled damage in combat. The spell lasts for one round for each level of experience of the wizard casting the spell. Currently [[@{level-wizard}]] rounds. Only natural animals, including giant forms, can be affected by this spell.\n&emsp;The reverse, *shrink animal,* reduces animal size by half and likewise reduces Hit Dice, attack damage, etc.'
};

wiz5['Animate Dead'] = {
    'level': 'Level 5 Wizard',
    'school': 'Necromancy',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5 rounds',
    'saving-throw': 'None',
    'materials': 'A drop of blood and a pinch of bone powder or a bone shard',
    'reference': 'PHB p. 210',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates the lowest of the undead monsters—skeletons or zombies—usually from the bones or bodies of dead humans, demihumans, or humanoids. The spell causes existing remains to become animated and obey the simple verbal commands of the caster. The skeletons or zombies can follow the caster, remain in an area and attack any creature (or just a specific type of creature) entering the place, etc. The undead remain animated until they are destroyed in combat or are turned; the magic cannot be dispelled. The following types of dead creatures can be animated:\n&emsp;A) *Humans, demihumans, and humanoids with 1 Hit Die.* The wizard can animate one skeleton for each experience level he has attained, or one zombie for every two levels. Currently [[@{level-wizard}]] skeletons, or [[floor([[@{level-wizard}]]/2)]] zombies. The experience levels, if any, of the slain are ignored; the body of a newly dead 9th-level fighter is animated as a zombie with 2 Hit Dice, without special class or racial abilities.\n&emsp;B) *Creatures with more than 1 Hit Die.* The number of undead animated is determined by the monster Hit Dice (the total Hit Dice cannot exceed the wizards level. Currently [[@{level-wizard}]]). Skeletal forms have the Hit Dice of the original creature, while zombie forms have one more Hit Die. Thus, a 12th-level wizard could animate four zombie gnolls (4 × [2+1 Hit Dice] = 12), or a single fire giant skeleton. Such undead have none of the special abilities they had in life.\n&emsp;C) *Creatures with less than 1 Hit Die.* The caster can animate two skeletons per level or one zombie per level. Currently [[2*[[@{level-wizard}]] ]] skeletons or [[@{level-wizard}]] zombies. The creatures have their normal Hit Dice as skeletons and an additional Hit Die as zombies. Clerics receive a +1 bonus when trying to turn these.\n&emsp;This spell assumes that the bodies or bones are available and are reasonably intact (those of skeletons or zombies destroyed in combat won’t be!).\n&emsp;The casting of this spell is not a good act, and only evil wizards use it frequently.'
};

wiz5['Avoidance'] = {
    'level': 'Level 5 Wizard',
    'school': 'Abjuration, Alteration (Reversible)',
    'range': '10 yards',
    'duration': 'Permanent until dispelled',
    'aoe': 'Up to 3-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': 'A magnetized needle',
    'reference': 'PHB p. 210',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster sets up a natural repulsion between the affected object and all other living things except himself. Thus, any living creature attempting to touch the affected object is repulsed (unable to come closer than 1 foot), or repulses the affected object, depending on the relative mass of the two (a halfling attempting to touch an iron chest with an *avoidance* spell upon it will be thrown back, while the chest will skitter away from a giant-sized creature as the creature approaches).\n&emsp;The spell cannot be cast upon living things; any attempt to cast avoidance upon the apparel or possessions of a living creature entitles the subject creature to a saving throw vs. spell.\n&emsp;The reverse of this spell, *attraction,* uses the same material components and sets up a natural attraction between the affected object and all living things. A creature is drawn to the object if the creature is smaller, or the object slides toward the creature if the creature is larger. It takes a successful bend bars/lift gates roll to remove the enchanted object once it has adhered to an object or creature.'
};

wiz5['Bigby\'s Interposing Hand'] = {
    'level': 'Level 5 Wizard',
    'school': 'Evocation',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A soft glove',
    'reference': 'PHB p. 210',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *Bigby’s interposing hand* spell creates a man-sized to gargantuan-sized magical hand that appears between the spellcaster and his chosen opponent. This disembodied hand then moves to remain between the two, regardless of what the spellcaster does or how the opponent tries to get around it. Neither invisibility nor polymorph fools the hand once a creature has been chosen. The hand does not pursue an opponent.\n&emsp;The size of the hand is determined by the wizard, and it can be from human size (5 feet) all the way up to titan size (25 feet). It provides cover for the caster against the selected opponent, with all the attendant combat adjustments. It has as many hit points as the caster in full health ([[@{HP|max}]] hit points) and has an Armor Class of 0.\n&emsp;Any creature weighing less than 2,000 pounds trying to push past the hand is slowed to half its normal movement. If the original opponent is slain, the caster can designate a new opponent for the hand. The caster can command the hand out of existence at any time.'
};

wiz5['Chaos'] = {
    'level': 'Level 5 Wizard',
    'school': 'Enchantment/Charm',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Up to 40-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': 'A small disc of bronze and a small rod of iron',
    'reference': 'PHB p. 210',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to the 4th-level *confusion* spell, but only the following beings receive a saving throw: fighters, wizards specialized in enchantments, monsters that use no magic and have an Intelligence of 4 or less, creatures of 21 Intelligence or higher, and creatures with more levels or Hit Dice than the caster’s level. Currently [[@{level-wizard}]] levels or Hit Dice.\n&emps;The spell causes disorientation and severe perceptual distortion, creating indecision and the inability to take effective action. The spell affects 1d4 creatures, plus one creature per caster level. Currently [[1d4+[[@{level-wizard}]] ]] creatures. Those allowed saving throws roll them vs. spell with –2 penalties, adjusted for Wisdom. Those who successfully save are unaffected by the spell. Affected creatures react as follows:}}{{style=center1 sheet-spell-bottom2}}{{c1-1=**D10 Roll**}}{{c2-1=1}}{{c3-1=2–6}}{{c4-1=7–9}}{{c5-1=10}}{{c1-2=**Action**}}{{c2-2=Wander away (unless prevented) for duration of spell}}{{c3-2=Stand confused for one round (then roll again)}}{{c4-2=Attack nearest creature for one round (then roll again)}}{{c5-2=Act normally for one round (then roll again)}}{{effects2=&emsp;The spell lasts one round for each level of the caster. Those affected are checked by the DM for actions each round for the duration of the spell, or until the “wander away for the duration of the spell” result occurs.\n&emsp;Wandering creatures move as far from the caster as possible using their most typical mode of movement (characters walk, fish swim, bats fly, etc.). Saving throws and actions are checked at the beginning of each round. Any confused creature that is attacked perceives the attacker as an enemy and acts according to its basic nature.'
};

wiz5['Cloudkill'] = {
    'level': 'Level 5 Wizard',
    'school': 'Evocation',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '40 × 20 × 20 foot cloud',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 212',
    'damage': 'Death or 1d10',
    'damage-type': 'Poison',
    'healing': '',
    'effect': 'This spell generates a billowing cloud of ghastly yellowish green vapors that is so toxic as to slay any creature with fewer than 4+1 Hit Dice, cause creatures with 4+1 to 5+1 Hit Dice to roll saving throws vs. poison with –4 penalties or be slain, and creatures with up to 6 Hit Dice (inclusive) to roll unmodified saving throws vs. poison or be slain. Holding one’s breath has no effect on the lethality of the spell. Those above 6th level (or 6 Hit Dice) must leave the cloud immediately or suffer 1d10 points of poison damage each round while in the area of effect.\n&emsp;The cloudkill moves away from the spellcaster at 10 feet per round, rolling along the surface of the ground. A moderate breeze causes it to alter course (roll for direction), but it does not move back toward its caster. A strong wind breaks it up in four rounds, and a greater wind force prevents the use of the spell. Very thick vegetation will disperse the cloud in two rounds. As the vapors are heavier than air, they sink to the lowest level of the land, even pouring down den or sinkhole openings; thus, the spell is ideal for slaying nests of giant ants, for example. It cannot penetrate liquids, nor can it be cast under water.'
};

wiz5['Cone of Cold'] = {
    'level': 'Level 5 Wizard',
    'school': 'Evocation',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': '½',
    'materials': 'A crystal or glass cone of very small size',
    'reference': 'PHB p. 212',
    'damage': '[[ [[@{level-wizard}]]d4+[[@{level-wizard}]] ]]',
    'damage-type': 'Cold',
    'healing': '',
    'effect': 'When this spell is cast, it causes a cone-shaped area of extreme cold, originating at the wizard’s hand and extending outward in a cone 5 feet long and 1 foot in diameter per level of the caster. Currently [[5*[[@{level-wizard}]] ]] feet long and [[@{level-wizard}]] feet in diameter. It drains heat and causes 1d4+1 points of damage per level of experience of the wizard. For example, a 10th-level wizard would cast a cone of cold 10 feet in diameter and 50 feet long, causing 10d4+10 points of damage.'
};

wiz5['Conjure Elemental'] = {
    'level': 'Level 5 Wizard',
    'school': 'Conjuration/Summoning',
    'range': '60 yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A considerable quantity of the element at hand and a small amount of one of the following:\nAir Elemental—burning incense\nEarth Elemental—soft clay\nFire Elemental—sulphur and phosphorus\nWater Elemental—water and sand',
    'reference': 'PHB p. 212',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'There are actually four spells in the *conjure elemental* spell. The wizard is able to conjure an air, earth, fire, or water elemental with this spell—assuming he has the material component for the particular elemental. (A considerable fire source must be in range to conjure a fire elemental; a large amount of water must be available to conjure a water elemental.) Conjured elementals have 8 Hit Dice.\n&emsp;It is possible to conjure successive elementals of different types if the spellcaster has memorized two or more of these spells. The type of elemental to be conjured must be decided upon before memorizing the spell. Each type of elemental can be conjured only once per day.\n&emsp;The conjured elemental must be controlled by the wizard—the spellcaster must concentrate on the elemental doing his commands—or it turns on the wizard and attacks. The elemental will not break off a combat to do so, but it will avoid creatures while seeking its conjurer. If the wizard is wounded or grappled, his concentration is broken. There is always a 5% chance that the elemental turns on its conjurer regardless of concentration. This check is made at the end of the second and each succeeding round. An elemental that breaks free of its control can be dispelled by the caster, but the chance of success is only 50%. The elemental can be controlled up to 30 yards away per level of the caster. Currently [[30*[[@{level-wizard}]] ]] yards. The elemental remains until its form on this plane is destroyed due to damage or until the spell’s duration expires. Note that water elementals are destroyed if they are ever more than 60 yards from a large body of water.\n&emsp;Special protection from uncontrolled elementals is available by  means of a *protection from evil* spell.'
};

wiz5['Contact Other Plane'] = {
    'level': 'Level 5 Wizard',
    'school': 'Divination',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 212',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard sends his mind to another plane of existence in order to receive advice and information from powers there. As these powers resent such contact, only brief answers are given. (The DM answers all questions with “yes,” “no,” “maybe,” “never,” “irrelevant,” etc.) Any questions asked are answered by the power during the spell’s duration. The character can contact an elemental plane or some plane farther removed. For every two levels of experience of the wizard, one questions may be asked. Currently [[floor([[@{level-wizard}]]/2)]] questions. Contact with minds far removed from the plane of the wizard increases the probability of the spellcaster going insane or dying, but the chance of the power knowing the answer, as well as the probability of the being telling the correct answer, are likewise increased by moving to distant planes. Once the Outer Planes are reached, the Intelligence of the power contacted determines the effects.\n&emsp;The accompanying random table is subject to DM changes, development of extraplanar NPC beings, and so on.\n&emsp;If insanity occurs, it strikes as soon as the first question is asked. This condition lasts for one week for each removal of the plane contacted (see the *DMG* or the *PLANESCAPE™ Campaign Setting* boxed set), to a maximum of 10 weeks. There is a 1% chance per plane that the wizard dies before recovering, unless a remove curse spell is cast upon him. A surviving wizard can recall the answer to the question.\n&emsp;On rare occasions, this divination may be blocked by the action of certain lesser or greater powers.}}{{style=center2 sheet-spell-center3 sheet-spell-center4 sheet-spell-bottom2 sheet-spell-bottom3 sheet-spell-bottom4}}{{cc1-1=bottom}}{{c1-1=**Plane**}}{{c2-1=Elemental Plane}}{{c3-1=Inner Plane}}{{c4-1=Astral Plane}}{{c5-1=Outer Plane, Int 19}}{{c6-1=Outer Plane, Int 20}}{{c7-1=Outer Plane, Int 21}}{{c8-1=Outer Plane, Int 22}}{{c9-1=Outer Plane, Int 23}}{{c10-1=Outer Plane, Int 24}}{{c11-1=Outer Plane, Int 25}}{{cc1-2=fixed}}{{c1-2=**Chance of**\n**Insanity &ast;**}}{{c2-2=20%}}{{c3-2=25%}}{{c4-2=30%}}{{c5-2=35%}}{{c6-2=40%}}{{c7-2=45%}}{{c8-2=50%}}{{c9-2=55%}}{{c10-2=60%}}{{c11-2=65%}}{{cc1-3=fixed}}{{c1-3=**Chance of**\n**Knowledge**}}{{c2-3=55% (90%)}}{{c3-3=60%}}{{c4-3=65%}}{{c5-3=70%}}{{c6-3=75%}}{{c7-3=80%}}{{c8-3=85%}}{{c9-3=90%}}{{c10-3=95%}}{{c11-3=98%}}{{cc1-4=fixed}}{{c1-4=**Chance of**\n**Veracity &ast;&ast;**}}{{c2-4=62% (75%)}}{{c3-4=65%}}{{c4-4=67%}}{{c5-4=70%}}{{c6-4=73%}}{{c7-4=75%}}{{c8-4=78%}}{{c9-4=81%}}{{c10-4=85%}}{{c11-4=90%}}{{effects2=&emsp;&ast; For every point of Intelligence over 15, the wizard reduces the chance of insanity by 5%.\n&emsp;&ast;&ast; If the being does not know an answer, and the chance of veracity is not made, the being will emphatically give an incorrect answer. If the chance of veracity is made, the being will answer “unknown.”\n&emsp;Percentages in parentheses are for questions that pertain to the appropriate elemental plane.\n\n**Optional Rule**\n&emsp;The DM may allow a specific Outer Plane to be contacted (see  the *PLANESCAPE Campaign Setting* boxed set). In this case, the difference in alignment between the caster and the plane contacted alters the maximum Intelligence that can be contacted—each difference in moral or ethical alignment lowers the maximum Intelligence that can be contacted by 1. For example, an 18th-level lawful good caster could contact Mount Celestia (a lawful good plane) on the “Intelligence 20” line, or Elysium (a neutral good plane) on the “Intelligence 19” line.'
};

wiz5['Demishadow Monsters'] = {
    'level': 'Level 5 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '20-foot cube',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 213',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to the 4th-level spell *shadow monsters,* except that the monsters created are effectively 40% of normal hit points. If the saving throw is made, their damage potential is only 40% of normal and their Armor Class is 8. The monsters have none of the special abilities of the real creatures, although victims may be deluded into believing this to be so.'
};

wiz5['Dismissal'] = {
    'level': 'Level 5 Wizard',
    'school': 'Abjuration',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'Any item that is distasteful to the subject creature',
    'reference': 'PHB p. 213',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, a wizard on the Prime Material Plane seeks to force or enable a creature from another plane of existence to return to its proper plane. Magic resistance, if any, is checked if this spell is used to force a being home. If the resistance fails, the caster’s level is compared to the creature’s level or Hit Dice. If the wizard’s level is higher, the difference is subtracted from the creature’s die roll for its saving throw vs. spell. If the creature’s level or Hit Dice is higher, the difference is added to the saving throw roll.\n&emsp;If the creature desires to be returned to its home plane, no saving throw is necessary (it chooses to fail the roll).\n&emsp;If the spell is successful, the creature is instantly whisked away, but the spell has a 20% chance of actually sending the subject to a plane other than its own.'
};

wiz5['Distance Distortion'] = {
    'level': 'Level 5 Wizard',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[2*[[@{level-wizard}]] ]] turns',
    'aoe': '[[10*[[@{level-wizard}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A small lump of soft clay',
    'reference': 'PHB p. 213',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can be cast only in an area completely surrounded or enclosed by earth, rock, sand, or similar materials. The wizard must also cast a *conjure elemental* spell to summon an earth elemental. The elemental serves without attempting to break free when the spellcaster announces that his intent is to cast a *distance distortion* spell. The spell places the earth elemental in the area of effect, and the elemental then causes the area’s dimensions to be either doubled or halved for those traveling over it (spellcaster’s choice). Thus, a 10-foot × 100-foot corridor could seem to be either 5 feet wide and 50 feet long or 20 feet wide and 200 feet long. When the spell duration has elapsed, the elemental returns to its own plane.\n&emsp;The true nature of an area affected by distance distortion is undetectable to any creature traveling along it, but the area dimly radiates magic, and a true seeing spell can reveal that an earth elemental is spread within the area.'
};

wiz5['Domination'] = {
    'level': 'Level 5 Wizard',
    'school': 'Enchantment/Charm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '1 person',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 214',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *domination* spell enables the caster to control the actions of any person until the spell is ended by the subject’s Intelligence (see the *charm person* spell). Elves and half-elves resist this enchantment as they do all charm-type spells. When the spell is cast, the subject must roll a saving throw vs. spell at a penalty of –2, but Wisdom adjustments apply. Failure means the wizard has established a telepathic link with the subject’s mind. If a common language is shared, the wizard can generally force the subject to perform as the wizard desires, within the limits of the subject’s body structure and Strength. Note that the caster does not receive direct sensory input from the subject.\n&emsp;Subjects resist this control, and those forced to take actions against their natures receive a new saving throw with a bonus of +1 to +4, depending on the type of action required. Obviously self-destructive orders are not carried out. Once control is established, there is no limit to the range at which it can be exercised, as long as the caster and subject are on the same plane.\n&emsp;A protection from evil spell can prevent the caster from exercising control or using the telepathic link while the subject is so warded, but it cannot prevent the establishment of domination.'
};

wiz5['Dream'] = {
    'level': 'Level 5 Wizard',
    'school': 'Invocation, Illusion/Phantasm (Reversible)',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 214',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *dream* spell enables the caster, or a messenger touched by the caster, to send messages to others in the form of dreams. At the beginning of the spell, the caster must name the recipient or identify him by some title that leaves no doubt as to his identity.\n&emsp;As the caster completes the spell, the person sending the spell falls into a deep trancelike sleep, and instantaneously projects his mind to the recipient. The sender then enters the recipient’s dream and delivers the message unless the recipient is magically protected. If the recipient is awake, the message sender can choose to remain in the trancelike sleep. If the sender is disturbed during this time, the spell is immediately cancelled and the sender comes out of the trance. The whereabouts and current activities of the recipient cannot be learned through this spell.\n&emsp;The sender is unaware of his own surroundings or the activities around him while he is in his trance. He is totally defenseless, both physically and mentally (i.e., he always fails any saving throw) while in the trance.\n&emsp;Once the recipient’s dreams are entered, the sender can deliver a message of any length, which the recipient remembers perfectly upon waking. The communication is one-way; the recipient cannot ask questions or offer information, nor can the sender gain any information by observing the dreams of the recipient. Once the message is delivered, the sender’s mind returns instantly to his body. The duration of the spell is the time required for the sender to enter the recipient’s dream and deliver the message.\n&emsp;The reverse of this spell, *nightmare,* enables the caster to send a hideous and unsettling vision to the recipient, who is allowed a saving throw vs. spell to avoid the effect. The nightmare prevents restful sleep and causes 1d10 points of damage. The nightmare leaves the recipient fatigued and unable to regain spells for the next day. A *dispel evil* spell cast upon the recipient stuns the caster of the nightmare for one turn per level of the cleric countering this evil sending.'
};

wiz5['Extension II'] = {
    'level': 'Level 5 Wizard',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 214',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is the same as the 4th-level *extension I* spell, except it extends the duration of 1st-through 4th-level spells by 50%.'
};

wiz5['Fabricate'] = {
    'level': 'Level 5 Wizard',
    'school': 'Enchantment, Alteration',
    'range': '[[5*[[@{level-wizard}]] yards',
    'duration': 'Permanent',
    'aoe': '[[@{level-wizard}]] cube yards (or cube feet for minerals)',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': 'The material to be affected by the spell',
    'reference': 'PHB p. 214',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to convert material of one sort into a product that is of the same material. Thus, the spellcaster can fabricate a wooden bridge from a clump of trees, a rope from a patch of hemp, clothes from flax or wool, and so forth. Magical or living things cannot be created or altered by a *fabricate* spell. The quality of items made by this spell is commensurate with the quality of material used as the basis for the new fabrication. If the caster works with a mineral, the area of effect is reduced by a factor of 27 (1 cubic foot per level instead of 1 cubic yard).\n&emsp;Articles requiring a high degree of craftsmanship (jewelry, swords, glass, crystal, etc.) cannot be fabricated unless the wizard otherwise has great skill in the appropriate craft. Casting requires one full round per cubic yard (or foot) or material to be affected by the spell.'
};

wiz5['False Vision'] = {
    'level': 'Level 5 Wizard',
    'school': 'Divination',
    'range': '0',
    'duration': '[[1d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '30-foot radius',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'The ground dust of an emerald worth at least 500 gp, which is sprinkled into the air when the spell is cast',
    'reference': 'PHB p. 214',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard is able to confound any attempt to scry (by means of either a spell or a magical device) any point within the area of effect of the spell. To use the spell, he must be aware of the scrying attempt, although knowledge of the scryer or the scryer’s location is not necessary. Upon casting the spell, the caster and all he desires within the radius of the spell become undetectable to the scrying. Furthermore, the caster is able to send whatever message he desires, including vision and sound, according to the medium of the scrying method. To do this, the caster must concentrate on the message he is sending. Once concentration is broken, no further images can be sent, although the caster remains undetectable for the duration of the spell.'
};

wiz5['Feeblemind'] = {
    'level': 'Level 5 Wizard',
    'school': 'Enchantment/Charm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'A handful of clay, crystal, glass, or mineral spheres, which disappears when the spell is cast',
    'reference': 'PHB p. 215',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is used solely against people or creatures who use magic spells. The *feeblemind* causes the subject’s intellect to degenerate to that of a moronic child. The subject remains in this state until a *heal* or *wish* spell is used to cancel the effects. Magic-using beings are very vulnerable to this spell; thus, their saving throws are made with the following adjustments:}}{{style=center2 sheet-spell-bottom2}}{{cc1-1=bottom}}{{c1-1=**Spell Use of Target**}}{{c2-1=Priest}}{{c3-1=Wizard (human)}}{{c4-1=Combination or nonhuman}}{{c1-2=**Saving Throw Adjustment**}}{{c2-2=+1}}{{c3-2=–4}}{{c4-2=–2}}{{effects2=&emsp;Wisdom adjustments apply to the saving throw.'
};

wiz5['Hold Monster'] = {
    'level': 'Level 5 Wizard',
    'school': 'Enchantment/Charm',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '1–4 creatures in a 40-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'One hard metal bar or rod for each monster to be held; the bar or rod can be as small as a three-penny nail',
    'reference': 'PHB p. 215',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell immobilizes from one to four creatures of any type within spell range and in sight of the spellcaster. He can opt to hold one, two, three, or four creatures. If three or four are attacked, each saving throw is normal; if two are attacked, each saving throw suffers a –1 penalty; if only one is attacked, the saving throw suffers a –3 penalty.'
};

wiz5['Leomund\'s Lamentable Belaborment'] = {
    'level': 'Level 5 Wizard',
    'school': 'Enchantment, Evocation',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '1 or more creatures in a 10-foot radius',
    'components': 'V',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 215',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This devious spell distracts the subject creatures by drawing them into an absorbing discussion on topics of interest to them. A chain of responses occurs during the next 11 rounds, with additional saving throws as described later. These responses are conversation (rounds 1–3), possible confusion (rounds 4–6), and then either rage or lamentation (rounds 7–11). All saving throws are affected by the creatures’ Intelligences, as noted later. The subject creatures must be able to understand the language in which the spellcaster speaks.\n&emsp;Upon casting the spell, the wizard begins discussion of some topic germane to the creature or creatures to be affected. Those making a successful saving throw vs. spell are unaffected. Affected creatures immediately begin to converse with the spellcaster, agreeing or disagreeing, all most politely. As long as the spellcaster chooses, he can maintain the spell by conversing with the subject(s). If the caster is attacked or otherwise distracted, the subject creatures do not notice.}}{{style=center1 sheet-spell-center2}}{{cc1-1=bottom}}{{c1-1=**Intelligence**}}{{c2-1=2 or less}}{{c3-1=3–7}}{{c4-1=8–10}}{{c5-1=11–14}}{{c6-1=15+}}{{c1-2=**Saving Throw Modifier**}}{{c2-2=Spell has no effect}}{{c3-2=–1}}{{c4-2=0}}{{c5-2=+1}}{{c6-2=+2}}{{effects2=&emsp;The wizard can leave at any time after the casting and the subject(s) continue on as if the caster were still present. As long as they are not attacked, the creatures ignore all else going on around them, spending their time talking and arguing to the exclusion of other activities. However, when the caster leaves, each subject completes only the stage of the spell that it is currently in, and then the spell is broken.\n&emsp;If the caster maintains the spell for more than three rounds, each affected creature can roll another saving throw vs. spell. Those failing to save wander off in confusion for 1d10+2 rounds, staying away from the spellcaster. Those who make this saving throw continue to talk and roll saving throws for each round that the caster continues the spell, up through the sixth round, to avoid the confusion effect.\n&emsp;If the spell is maintained for more than six rounds, each subject must roll a successful saving throw vs. spell to avoid going into a rage, attacking all other subjects of the spell with intent to kill. This rage lasts for 1d4+1 rounds. Those who successfully save against the rage effect realize that they have been deceived and collapse to the ground, lamenting their foolishness, for 1d4 rounds unless attacked or otherwise disturbed.'
};

wiz5['Leomund\'s Secret Chest'] = {
    'level': 'Level 5 Wizard',
    'school': 'Alteration, Conjuration/Summoning',
    'range': 'Special',
    'duration': '60 days',
    'aoe': 'One chest, about 2 x 2 x 3 feet',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 215',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables a specially constructed chest to be hidden deep within the Ethereal Plane, to be summoned using a small model of the chest. The large chest must be exceptionally well-crafted and expensive, constructed for the caster by master craftsmen. If made principally of wood, it must be ebony, rosewood, sandalwood, teak, or the like, and all of its corner fittings, nails, and hardware must be platinum. If constructed of ivory, the metal fittings of the chest must be gold. If the chest is fashioned from bronze, copper, or silver, its fittings must be electrum or silver. The cost of such a chest is never less than 5,000 gp. Once it is constructed, the wizard must have a tiny replica (of the same materials and perfect in every detail) made, so that the miniature of the chest appears to be a perfect copy. One wizard can have but one pair of these chests at any given time—even *wish* spells do not allow exceptions! The chests themselves are nonmagical, and can be fitted with locks, wards, and so on, just as any normal chest.\n&emsp;While touching the chest and holding the tiny replica, the caster chants the spell. This causes the large chest to vanish into the Ethereal Plane. The chest can contain one cubic feet of material per level of the wizard no matter what its apparent size. Currently [[@{level-wizard}]] cubic feet of material. Living matter makes it 75% likely that the spell fails, so the chest is typically used for securing valuable spell books, magical items, gems, etc. As long as the spellcaster has the small duplicate of the magical chest, he can recall the large one from the Ethereal Plane whenever the chest is desired. If the miniature of the chest is lost or destroyed, there is no way, not even with a *wish* spell, that the large chest can return, although an expedition might be mounted to find it.\n&emsp;While the chest is in the Ethereal Plane, there is a cumulative 1% chance per week that some being finds it. This chance is reset to 1% whenever the chest is recalled and the spell recast to return it to the Ethereal Plane. If the chest is found, the DM must work out the encounter and decide how the being reacts to the chest (for example, it might ignore the chest, fully or partially empty it, or even exchange or add to the items present!).\n&emsp;Whenever the secret chest is brought back to the Prime Material Plane, an ethereal window is opened for a variable amount of time (usually about one turn); the window slowly diminishes in size. When this hole opens between the planes, check for an ethereal encounter to see if a monster is drawn through.\n&emsp;If the large chest is not retrieved before the spell duration lapses, there is a cumulative chance of 5% per day that the chest is lost.'
};

wiz5['Magic Jar'] = {
    'level': 'Level 5 Wizard',
    'school': 'Necromancy',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'A gem or large crystal',
    'reference': 'PHB p. 216',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *magic jar* spell enables the caster to shift his life force into a special receptacle (a gem or large crystal). From there the caster can force an exchange of life forces between the receptacle and another creature, thus enabling the wizard to take over and control the body of another creature, while the life force of the host is confined in the receptacle. The special life force receptacle must be within spell range of the wizard’s body at the time of spellcasting. The wizard’s life force shifts into the receptacle in the round in which the casting is completed, allowing no other actions.\n&emsp;While in the magic jar, the caster can sense and attack any life force within a [[10*[[@{level-wizard}]] ]]-foot radius (on the same plane); however, the exact creature types and relative physical positions cannot be determined. In a group of life forces, the caster can sense a difference of four or more levels/Hit Dice and can determine whether a life force is positive or negative energy.\n&emsp;For example, if two 10th-level fighters are attacking a hill giant and four ogres, the caster could determine that there are three stronger and four weaker life forces within range, all with positive life energy. The caster could try to take over either a stronger or a weaker creature, but he has no control over exactly which creature is attacked.\n&emsp;An attempt to take over a host body requires a full round. It is blocked by a *protection from evil* spell or similar ward. It is successful only if the subject fails a saving throw vs. spell with a special modifier (see following). The saving throw is modified by subtracting the combined Intelligence and Wisdom scores of the target from those of the wizard (Intelligence and Hit Dice in nonhuman or nonhumanoid creatures). This modifier is added to (or subtracted from) the die roll.}}{{style=center1 sheet-spell-center2}}{{c1-1=**Difference**}}{{c2-1=–9 or less}}{{c3-1=–8 to –6}}{{c4-1=–5 to –3}}{{c5-1=–2 to 0}}{{c6-1=+1 to +4}}{{c7-1=+5 to +8}}{{c8-1=+9 to +12}}{{c9-1=+13 or more}}{{c1-2=**Die Adjustment**}}{{c2-2=+4}}{{c3-2=+3}}{{c4-2=+2}}{{c5-2=+1}}{{c6-2=0}}{{c7-2=–1}}{{c8-2=–2}}{{c9-2=–3}}{{effects2=&emsp;A negative score indicates that the wizard has a lower total than the target; thus, the host has a saving throw bonus. Failure to take over the host leaves the wizard’s life force in the magic jar.\n&emsp;If successful, the caster’s life force occupies the host body and the host’s life force is confined in the magic jar receptacle. The caster can call upon rudimentary or instinctive knowledge of the subject creature, but not upon its real or acquired knowledge (i.e., the wizard does not automatically know the language or spells of the creature). The caster retains his own attack rolls, class knowledge and training, and any adjustments due to his Intelligence or Wisdom. If the host body is human or humanoid, and the necessary spell components are available, the wizard can even use his memorized spells. The host body retains its own hit points and physical abilities and properties. The DM decides if any additional modifications are necessary; for example, perhaps clumsiness or inefficiency occurs if the caster must become used to the new form. The alignment of the host or receptacle is that of the occupying life force.\n&emsp;The caster can shift freely from the host to the receptacle if within the [[10*[[@{level-wizard}]] ]]-foot range. Each attempt to shift requires one round. The spell ends when the wizard shifts from the jar to his own body.\n&emsp;A successful *dispel magic* spell cast on the host can drive the caster of the *magic jar* spell back into the receptacle and prevent him from making any attacks for 1d4 rounds plus 1 round per level of the caster of the dispel. The base success chance is 50%, plus or minus 5% per level difference between the casters. A successful *dispel magic* cast against the receptacle forces the occupant back into his own body. If the wizard who cast the *magic jar* is forced back into his own body, the spell ends.\n&emsp;If the host body is slain, the caster returns to the receptacle, if within range, and the life force of the host departs (i.e., it is dead). If the host body is slain beyond the range of the spell, both the host and the caster die.\n&emsp;Any life force with nowhere to go is treated as slain unless recalled by a *raise dead, resurrection,* or similar spell.\n&emsp;If the body of the caster is slain, his life force survives if it is in either the receptacle or the host. If the receptacle is destroyed while the caster’s life force occupies it, the caster is irrevocably slain.'
};

wiz5['Major Creation'] = {
    'level': 'Level 5 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'At least a tiny piece of matter of the same type as the item he plans to create—a bit of twisted hemp to create rope, a chip of stone to create a boulder, and so on',
    'reference': 'PHB p. 217',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Like the *minor creation* spell, the *major creation* spell enables the wizard to pull wisps of material from the Demiplane of Shadow to create an item of nonliving, vegetable nature—soft goods, rope, wood, etc. The wizard can also create mineral objects—stone, crystal, metal, etc. The item created cannot exceed 1 cubic foot per level of the spellcaster in volume. Currently [[@{level-wizard}]] cubic feet. The duration of the created item varies with its relative hardness and rarity:}}{{style=center2}}{{c1-1=Vegetable matter}}{{c2-1=Stone or crystal}}{{c3-1=Precious metals}}{{c4-1=Gems}}{{c5-1=Mithral&ast;}}{{c6-1=Adamantite}}{{c1-2=[[2*[[@{level-wizard}]] ]] hours}}{{c2-2=[[@{level-wizard}]] hours}}{{c3-2=[[2*[[@{level-wizard}]] ]] turns}}{{c4-2=[[@{level-wizard}]] turns}}{{c5-2=[[2*[[@{level-wizard}]] ]] rounds}}{{c6-2=[[@{level-wizard}]] rounds}}{{effects2=&ast; Includes similar rare metals.\n\n&emsp;Attempting to use any of these as material components in a spell will cause the spell to fail.'
};

wiz5['Monster Summoning III'] = {
    'level': 'Level 5 Wizard',
    'school': 'Conjuration/Summoning',
    'range': 'Special',
    'duration': '[[4+[[@{level-wizard}]] ]] rounds',
    'aoe': '50-yard radius',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': 'A tiny bag and a small candle',
    'reference': 'PHB p. 217',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is much like the 3rd-level spell *monster summoning I,*  except that this spell summons [[1d4]] 3rd-level monsters. These appear within the spell’s area of effect and attack the caster’s opponents, until either he commands them to cease, the spell duration expires, or the monsters are slain. These creatures do not check morale and vanish when slain. If no opponent exists to fight, and the wizard can communicate with them, the summoned monsters can perform other services for the wizard.'
};

wiz5['Mordenkainen\'s Faithful Hound'] = {
    'level': 'Level 5 Wizard',
    'school': 'Conjuration/Summoning',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A tiny silver whistle, a  piece of bone, and a thread',
    'reference': 'PHB p. 217',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard summons up a phantom watchdog that only he can see. He may then command it to perform as guardian of a passage, room, door, or similar space or portal. The phantom watchdog immediately commences a loud barking if any creature larger than a cat approaches the place it guards. As the faithful hound is able to detect invisible creatures and ward against the approach of ethereal creatures, it is an excellent guardian. It does not react to illusions that are not at least quasi-real.\n&emsp;If the intruding creature exposes its back to the watchdog, the dog delivers a vicious attack as if it were a 10-Hit Dice monster, striking for 3d6 points of damage. It is able to hit opponents of all types, even those normally subject only to magical weapons of +3 or greater. Creatures without backs (for example, ochre jellies) are not attacked. The faithful hound cannot be attacked, but it can be dispelled. The spell lasts for a maximum of 1 hour plus half an hour per caster level ([[1+(0.5*[[@{level-wizard}]])]] hours), but once it is activated by an intruder, it lasts only one round per caster level ([[@{level-wizard}]] rounds). If the spellcaster is ever more than 30 yards distant from the area that the watchdog guards, the spell ends.'
};

wiz5['Passwall'] = {
    'level': 'Level 5 Wizard',
    'school': 'Alteration',
    'range': '30 yards',
    'duration': '[[6+[[@{level-wizard}]] ]] turns',
    'aoe': '5 × 8 × 10 feet',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A pinch of sesame seeds',
    'reference': 'PHB p. 217',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *passwall* spell enables the spellcaster to open a passage through wooden, plaster, or stone walls, but not other materials. The spellcaster and any associates can simply walk through. The spell causes a 5-foot wide × 8-foot high × 10-foot deep opening. Several of these spells can form a continuing passage so that very thick walls can be pierced. If dispelled, the passwall closes away from the dispelling caster, ejecting those in the passage.'
};

wiz5['Seeming'] = {
    'level': 'Level 5 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '10-foot radius',
    'duration': '12 hours',
    'aoe': '[[floor([[@level-wizard}]]/2)]] persons',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 217',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to alter the appearance of one person for every two levels of experience he has attained. The change includes clothing and equipment. The caster can make the recipients appear as any generally man-shaped bipedal creature, each up to 1 foot shorter or taller than his normal height, and thin or fat or in between. All those affected must resemble the same general type of creature: human, orc, ogre, etc. Each remains a recognizable individual. The effect fails for an individual if the illusion chosen by the caster cannot be accomplished within the spell parameters (for example, a halfling could not be made to look like a centaur, but he might be made to look like a short, young ogre). Unwilling persons receive saving throws vs. spell to avoid the effect. Affected persons resume their normal appearances if slain. The spell is not precise enough to duplicate the appearance of a specific individual.'
};

wiz5['Sending'] = {
    'level': 'Level 5 Wizard',
    'school': 'Evocation',
    'range': 'Unlimited',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'Two tiny cylinders, each with one open end, connected by a short piece of fine copper wire',
    'reference': 'PHB p. 218',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster can contact a single creature with whom he is familiar and whose name and appearance are known. If the creature in question is not on the same plane of existence as the spellcaster, there is a base 5% chance that the sending does not arrive. Local conditions on other planes may worsen this chance considerably, at the option of the DM. The sending, if successful, can be understood even by a creature with an Intelligence as low as 1 (animal intelligence).\n&emsp;The wizard can send a short message of 25 words or less to the  recipient; the recipient can answer in like manner immediately. Even if the sending is received, the subject creature is not obligated to act upon it in any manner.'
};

wiz5['Shadow Door'] = {
    'level': 'Level 5 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 218',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard creates the illusion of a door. The illusion also permits the wizard to appear to step through this “door” and disappear. In reality, he has darted aside and can flee, totally invisible, for the spell duration. Creatures viewing this are deluded into seeing or entering an empty 10-foot × 10-foot room if they open the “door.” A *true seeing* spell, a **gem of seeing,* or similar magical means can discover the wizard. Certain high Hit Dice monsters might also notice the wizard (see the *invisibility* spell), but only if making an active attempt to do so.'
};

wiz5['Shadow Magic'] = {
    'level': 'Level 5 Wizard',
    'school': 'Illusion/Phantasm',
    'range': '[[50+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'PHB p. 218',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *shadow magic* spell enables the wizard to tap energy from the Demiplane of Shadow to cast a quasi-real wizard evocation spell of 3rd level or less. For example, this spell can be *magic missile, fireball, lightning bolt,* or so on, and has normal effects upon creatures in the area of effect if they fail their saving throws vs. spell. Thus, a creature failing to save against a *shadow magic* fireball must roll another saving throw. If the latter roll is successful, the creature suffers half the normal fireball damage; if the roll is not successful, the creature suffers full normal fireball damage. If the first saving throw was successful, the shadow magic nature is detected and only 20% of the rolled damage is received (rounding down below fractions below 0.4 and rounding up fractions of 0.4 and above).'
};

wiz5['Stone Shape'] = {
    'level': 'Level 5 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '[[@{level-wizard}]] cube feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Soft clay that must be worked into roughly the desired shape of the stone object and then touched to the stone when the spell is uttered',
    'reference': 'PHB p. 218',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard can form an existing piece of stone into a shape that suits his purposes. For example, the wizard can make a stone weapon, a special trapdoor, an idol, etc. This spell can also enable the spellcaster to reshape a stone door so as to escape imprisonment, providing the volume of stone involved is within the limits of the area of effect. While the caster can thus create stone doors and coffers, the fineness of detail is not great. If the construction involves small moving parts, there is a 30% chance they do not function.'
};

wiz5['Summon Shadow'] = {
    'level': 'Level 5 Wizard',
    'school': 'Conjuration/Summoning, Necromancy',
    'range': '10 yards',
    'duration': '[[1+[[@{level-wizard]] ]] rounds',
    'aoe': '10-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A bit of smoky quartz',
    'reference': 'PHB p. 218',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard conjures up one shadow (see the *MONSTROUS MANUAL*) for every three levels of experience he has attained. Currently [[floor([[@level-wizard}]]/3)]] shadows. These monsters are under the control of the spellcaster and attack his enemies on command. The shadows remain until slain, turned, or the spell duration expires.'
};

wiz5['Telekinesis'] = {
    'level': 'Level 5 Wizard',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '[[10*[[@{level-wizard}]] ]] yards',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'PHB p. 218',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to move objects by concentrating on moving them mentally. The spell can provide either a gentle, sustained force or a single short, violent thrust.\n&emsp;A sustained force enables the wizard to move a weight of up to 25 pounds a distance up to 20 feet per round. The spell lasts two rounds, plus one round per caster level. Currently  [[2+[[@{level-wizard}]] ]] rounds. The weight can be moved vertically, horizontally, or both. An object moved beyond the caster’s range falls or stops. If the caster ceases concentration for any reason, the object falls or stops. The object can be telekinetically manipulated as if with one hand. For example, a lever or rope can be pulled, a key can be turned, an object rotated and so on, if the force required is within the weight limitation. The caster might even be able to untie simple knots, at the discretion of the DM.\n&emsp;Alternatively, the spell energy can be expended in a single round. The caster can hurl one or more objects within range, and within a 10-foot cube, directly away from himself at high speed, to a distance of up to 10 feet per caster level. Currently [[10*[[@{level-wizard}]] ]] feet. This is subject to a maximum weight of 25 pounds per caster level. Currently [[25*[[@{level-wizard}]] ]] pounds. Damage caused by hurled objects is decided by the DM, but cannot exceed 1 point of damage per caster level. Currently [[@{level-wizard}]] points of damage. Opponents who fall within the weight capacity of the spell can be hurled, but they are allowed a saving throw vs. spell to avoid the effect. Furthermore, those able to employ as simple a counter-measure as an *enlarge* spell, for example (thus making the body weight go over the maximum spell limit), can easily counter the spell. The various *Bigby’s hand* spells also counter this spell.'
};

wiz5['Teleport'] = {
    'level': 'Level 5 Wizard',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'PHB p. 219',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is used, the wizard instantly transports himself, along with a certain amount of additional weight that is on or being touched by the spellcaster, to a well-known destination. Distance is not a factor, but interplanar travel is not possible by means of a *teleport* spell. The spellcaster is able to teleport a maximum weight of 250 pounds, plus 150 pounds for each level of experience above the 10th (current maximum weight is [[250+150*({[[@{level-wizard}]]-10,0}kh1)]] pounds) (a 13th-level wizard can teleport up to 700 pounds). If the destination area is very familiar to the wizard (he has a clear mental picture due to previous proximity to and study of the area), it is unlikely that there is any error in arriving, although the caster has no control over his facing upon arrival. Lesser known areas (those seen only magically or from a distance) increase the probability of error. Unfamiliar areas present considerable peril (see table).}}{{style=center2 sheet-spell-center3 sheet-spell-center4}}{{c1-1= }}{{c2-1=**Destination Is:**}}{{c3-1=Very familiar}}{{c4-1=Studied carefully}}{{c5-1=Seen casually}}{{c6-1=Viewed once}}{{c7-1=Never seen}}{{cs1-2=3}}{{c1-2=**Probability of Teleporting:**}}{{c2-2=**High**}}{{c3-2=01–02}}{{c4-2=01–04}}{{c5-2=01–08}}{{c6-2=01–16}}{{c7-2=01–32}}{{c2-3=**On Target**}}{{c3-3=03–99}}{{c4-3=05–98}}{{c5-3=09–96}}{{c6-3=17–92}}{{c7-3=33–84}}{{c2-4=**Low**}}{{c3-4=00}}{{c4-4=99–00}}{{c5-4=97–00}}{{c6-4=93–00}}{{c7-4=85–00}}{{effects2=&emsp;Teleporting high means the wizard arrives 10 feet above the ground for every 1% he is below the lowest “On Target” probability; this could be as high as 320 feet if the destination area was never seen. Any low result means the instant death of the wizard if the area into which he teleports is solid. A wizard cannot teleport to an area of empty space—a substantial surface must be there, whether a wooden floor, a stone floor, natural ground, etc. Areas of strong physical or magical energies may make teleportation more hazardous or even impossible.'
};

wiz5['Transmute Rock to Mud'] = {
    'level': 'Level 5 Wizard',
    'school': 'Alteration (Reversible)',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '[[20*[[@{level-wizard}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'Clay and water (or sand, lime, and water for the reverse)',
    'reference': 'PHB p. 219',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell turns natural rock of any sort into an equal volume of mud. The depth of the mud can never exceed half its length or breadth. If it is cast upon a rock, for example, the rock affected collapses into mud. Creatures unable to levitate, fly, or otherwise free themselves from the mud sink at the rate of 10 feet per round and suffocate, except for lightweight creatures that could normally pass across such ground. Brush thrown atop the mud can support creatures able to climb on top of it, with the amount of brush required subject to the DM’s discretion. The mud remains until a *dispel magic* spell or a reverse of this spell, *mud to rock,* restores its substance—but not necessarily its form. Evaporation turns the mud to normal dirt, at the rate of 1d6 days per 10 cubic feet. The *mud to rock* reverse can harden normal mud into soft stone (sandstone or similar mineral) permanently unless magically changed.'
};

wiz5['Wall of Force'] = {
    'level': 'Level 5 Wizard',
    'school': 'Evocation',
    'range': '30 yards',
    'duration': '1 turn + [[@{level-wizard}]] rounds',
    'aoe': '[[10*[[@{level-wizard}]] ]]-foot square',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A pinch of powdered diamond worth 5,000 gp',
    'reference': 'PHB p. 219',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *wall of force* spell creates an invisible barrier in the locale desired by the caster, up to the spell’s range. The wall of force cannot move and is totally unaffected by most spells, including *dispel magic*. However, a *disintegrate* spell will immediately destroy it, as will a *rod of cancellation* or a *sphere of annihilation.* Likewise, the wall of force is not affected by blows, missiles, cold, heat, electricity, etc. Spells and breath weapons cannot pass through it in either direction, although *dimension door, teleport,* and similar effects can bypass the barrier.\n&emsp;The wizard can, if desired, form the wall into a spherical shape with a radius of up to [[@{level-wizard}]] feet or an open hemispherical shape with a radius of [[1.5*[[@{level-wizard}]] ]] feet. The wall of force must be continuous and unbroken when formed; if its surface is broken by any object or creature, the spell fails. The caster can end the spell on command.'
};

wiz5['Wall of Iron'] = {
    'level': 'Level 5 Wizard',
    'school': 'Evocation',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '[[15*[[@{level-wizard}]] ]] square feet or special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A small piece of sheet iron',
    'reference': 'PHB p. 220',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard causes a vertical iron wall to spring into being. This wall can be used to seal off a passage or close a breach, for the wall inserts itself into any surrounding nonliving material if its area is sufficient to do so. The wall of iron is 1/2-inch thick per level of experience of the spellcaster. Currently [[0.5*[[@{level-wizard}]] ]] inches thick. The wizard is able to create an iron wall of up to 15 square feet per experience level, currently [[15*[[@{level-wizard}]] ]] square feet; thus, a 12th-level wizard can create a wall of iron with an area of 180 square feet. The wizard can double the wall’s area by halving its thickness.\n&emsp;If the caster desires, the wall can be created vertically resting on a flat surface, so that it can be tipped over to fall on and crush any creature beneath it. The wall is 50% likely to tip in either direction. This chance can be modified by a force of not less than 30 Strength and 400 pounds mass—each pound over 400 or Strength point over 30 alters the chance by 1% in favor of the stronger side. Creatures with room to flee the falling wall may do so by making successful saving throws vs. death. Those who fail are killed. Huge and gargantuan creatures cannot be crushed by the wall.\n&emsp;The wall is permanent, unless successfully dispelled, but it is subject to all forces a normal iron wall is subject to—rust, perforation, etc.'
};

wiz5['Wall of Stone'] = {
    'level': 'Level 5 Wizard',
    'school': 'Evocation',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A small block of granite',
    'reference': 'PHB p. 220',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a wall of granite rock that merges into adjoining rock surfaces. It is typically employed to close passages, portals, and breaches against opponents. The wall of stone is 0.25 inch thick and up to 20 square feet per level of experience of the wizard casting the spell. Currently [[0.25*[[@{level-wizard}]] ]] inches thick and up to [[20*[[@{level-wizard}]] ]] square feet. Thus, a 12th-level wizard can create a wall of stone 3 inches thick and up to 240 square feet in surface area (a 12-foot-wide and 20-foot-high wall, for example, to completely close a 10-foot × 16-foot passage). The wall created need not be vertical, nor rest upon any firm foundation (see the *wall of iron* spell); however, it must merge with and be solidly supported by existing stone. It can be used to bridge a chasm, for instance, or as a ramp. For this use, if the span is more than 20 feet, the wall must be arched and buttressed. This requirement reduces the area of effect by half. Thus, a 20th-level caster can create a span with a surface area of 200 square feet. The wall can be crudely shaped to allow crenelations, battlements, and so forth by likewise reducing the area. The stone is permanent unless destroyed by a *dispel magic* or *disintegrate* spell, or by normal means such as breaking or chipping.'
};

const wizardSpells = {};
wizardSpells['wiz1'] = wiz1;
wizardSpells['wiz2'] = wiz2;
wizardSpells['wiz3'] = wiz3;
wizardSpells['wiz4'] = wiz4;
wizardSpells['wiz5'] = wiz5;
/* ---- Wizard spells end ---- */