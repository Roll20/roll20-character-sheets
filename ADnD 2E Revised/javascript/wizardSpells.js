/* ---- Wizard spells start ---- */

//#region Player's Handbook
const wiz1 = {};
wiz1['Affect Normal Fires'] = {
    'level': '1',
    'school': 'Alteration',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'Open fire or flame',
    'reference': 'p. 170',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to cause nonmagical fires—from as small as a torch or lantern to as large as the area of effect—to reduce in size and brightness to become mere coals or increase in light to become as bright as full daylight and increase the illumination to double the normal radius. Note that this does not affect either fuel consumption or damage caused by the fire. The caster can affect any or all fires in the spell’s area. He can alter their intensities with a single gesture as long as the spell is in effect. The spell lasts until the caster cancels it, all fuel is burned, or the duration expires. The caster can also extinguish all flames in the area, which expends the spell immediately. The spell does not affect fire elementals or similar creatures.'
};

wiz1['Alarm'] = {
    'level': '1',
    'school': 'Abjuration, Evocation',
    'range': '10 yards',
    'duration': '[[4+(0.5*[[@{level-wizard}]])]] hours',
    'aoe': 'Up tp 20-foot cube',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A tiny bell and a piece of very fine silver wire.',
    'reference': 'p. 170',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When an *alarm* spell is cast, the wizard causes a selected area to react to the presence of any creature larger than a normal rat—anything larger than about 1 ⁄ 2 cubic foot in volume or more than about three pounds in weight. The area of effect can be a portal, a section of floor, stairs, etc. As soon as any creature enters the warded area, touches it, or otherwise contacts it without speaking a password established by the caster, the *alarm* spell lets out a loud ringing that can be heard clearly within a 60-foot radius. (Reduce the radius by 10 feet for each interposing door and by 20 feet for each substantial interposing wall.) The sound lasts for one round and then ceases. Ethereal or astrally projected creatures do not trigger an alarm, but flying or levitating creatures, invisible creatures, or incorporeal or gaseous creatures do. The caster can dismiss the alarm with a single word.'
};

wiz1['Armor'] = {
    'level': '1',
    'school': 'Conjuration',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A piece of finely cured leather that has been blessed by a priest.',
    'reference': 'p. 170',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard creates a magical field of force that serves as if it were scale mail armor (AC 6). The spell has no effect on a person already armored or a creature with Armor Class 6 or better. It is not cumulative with the *shield* spell, but it is cumulative with Dexterity and, in case of fighter/mages, with the shield bonus. The *armor* spell does not hinder movement or prevent spellcasting, and adds no weight or encumbrance. It lasts until successfully dispelled or until the wearer sustains cumulative damage totaling greater than 8 points + 1 per level of the caster ([[8+[[@{level-wizard}]] ]] points). (It is important to note that the armor does *not* absorb this damage. The armor merely grants an AC of 6; the wearer still suffers full damage from any successful attacks.) Thus, the wearer might suffer 8 points from an attack, then several minutes later sustain an additional 1 point of damage. Unless the spell were cast by a wizard of 2nd level or higher, it would be dispelled at this time. Until it is dispelled, the *armor* spell grants the wearer full benefits of the Armor Class gained.'
};

wiz1['Audible Glamer'] = {
    'level': '1',
    'school': 'Illusion/Phantasm',
    'range': '[[60+(10*[[@{level-wizard}]])]] yards',
    'duration': '[[3*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Hearing range',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A bit of wool or a small lump of wax',
    'reference': 'p. 170',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the *audible glamer* spell is cast, the wizard causes a volume of sound to arise, at whatever distance he desires (within range), and seem to recede, approach, or remain at a fixed place as desired. The volume of sound created, however, is directly related to the level of the spellcaster. The noise of the *audible glamer* is that of 4 men per level of the caster. Current noise is [[4*[[@{level-wizard}]] ]] men. Thus, talking, singing, shouting, walking, marching, or running sounds can be created. The auditory illusion created by an *audible glamer* spell can be virtually any type of sound, but the relative volume must be commensurate with the level of the wizard casting the spell. A horde of rats running and squeaking is about the same volume as eight men running and shouting. A roaring lion is equal to the noise volume of 16 men, while a roaring dragon is equal to the noise volume of no fewer than 24 men.\n&emsp;A character stating that he does not believe the sound receives a saving throw, and if it succeeds, the character then hears a faint and obviously false sound, emanating from the caster’s direction. Note that this spell can enhance the effectiveness of the *phantasmal force* spell.'
};
wiz1['Burning Hands'] = {
    'level': '1',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': '½',
    'materials': '',
    'reference': 'p. 170',
    'book': 'PHB',
    'damage': '[[1d3+([[{2*[[@{level-wizard}]], 20}kl1]])]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'When the wizard casts this spell, a jet of searing flame shoots from his fingertips. His hands must be held so as to send forth a fanlike sheet of flames: The wizard’s thumbs must touch each other and the fingers must be spread. The burning hands send out flame jets 5 feet long in a horizontal arc of about 120 degrees in front of the wizard. Any creature in the area of the flames suffers 1d3 points of damage, plus 2 points for each level of experience of the spellcaster, to a maximum of 1d3+20 points of fire damage. Those successfully saving vs. spell receive half damage. Flammable materials touched by the fire burn (for example, cloth, paper, parchment, thin wood, etc.). Such materials can be extinguished in the next round if no other action is taken.'
};
wiz1['Cantrip'] = {
    'level': '1',
    'school': 'All Schools',
    'range': '10 feet',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 171',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Cantrips are minor spells studied by wizards during their apprenticeship, regardless of school. The *cantrip* spell is a practice method for the apprentice, teaching him how to tap minute amounts of magical energy. Once cast, the *cantrip* spell enables the caster to create minor magical effects for the duration of the spell. However, these effects are so minor that they have severe limitations. They are completely unable to cause a loss of hit points, cannot affect the concentration of spellcasters, and can only create small, obviously magical materials. Furthermore, materials created by a cantrip are extremely fragile and cannot be used as tools of any sort. Lastly, a cantrip lacks the power to duplicate any other spell effects.\n&emsp;Whatever manifestation the cantrip takes, it remains in effect only as long as the wizard concentrates. Wizards typically use cantrips to impress common folk, amuse children, and brighten dreary lives. Common tricks with cantrips include tinklings of ethereal music, brightening faded flowers, glowing balls that float over the caster’s hand, puffs of wind to flicker candles, spicing up aromas and flavors of bland food, and little whirlwinds to sweep dust under rugs. Combined with the *unseen servant* spell, it’s a tool to make housekeeping and entertaining simpler for the wizard.'
};
wiz1['Change Self'] = {
    'level': '1',
    'school': 'Illusion/Phantasm',
    'range': '0',
    'duration': '[[2d6+2*[[@{level-wizard}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 171',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to alter the appearance of his form—including clothing and equipment—to appear 1 foot shorter or taller; thin, fat, or in between; human, humanoid, or any other generally man-shaped bipedal creature. The caster cannot duplicate a specific individual. The spell does not provide the abilities or mannerisms of the chosen form. The duration of the spell is 2d6 rounds plus two additional rounds per level of experience of the spellcaster. The DM may allow a saving throw for disbelief under certain circumstances: for example, if the caster acts in a manner obviously inconsistent with his chosen role. The spell does not alter the perceived tactile (i.e., touch) properties of the caster or his equipment, and the ruse can be discovered in this way.'
};

wiz1['Charm Person'] = {
    'level': '1',
    'school': 'Enchantment/Charm',
    'range': '120 yards',
    'duration': 'Special',
    'aoe': '1 person',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 171',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell affects any single *person* it is cast upon. The term person includes any bipedal human, demihuman or humanoid of man-size or smaller, such as brownies, dryads, dwarves, elves, gnolls, gnomes, goblins, half-elves, halflings, half-orcs, hobgoblins, humans, kobolds, lizard men, nixies, orcs, pixies, sprites, troglodytes, and others. Thus, a 10th-level fighter could be charmed, but an ogre could not.\n&emsp;The person receives a saving throw vs. spell to avoid the effect, with any adjustment due to Wisdom (see Table 5). If the person receives damage from the caster’s group in the same round the *charm* is cast, an additional bonus of +1 per hit point of damage received is added to the victim’s saving throw.\n&emsp;If the spell recipient fails his saving throw, he regards the caster as a trusted friend and ally to be heeded and protected. The spell does not enable the caster to control the charmed creature as if it were an automaton, but any word or action of the caster is viewed in the most favorable way. Thus, a charmed person would not obey a suicide command, but he might believe the caster if assured that the only chance to save the caster’s life is for the person to hold back an onrushing red dragon for “just a minute or two.” Note also that the spell does not endow the caster with linguistic capabilities beyond those he normally possesses (i.e., he must speak the victim’s language to communicate his commands).\n&emsp;The duration of the spell is a function of the charmed person’s Intelligence and is tied to the saving throw. The spell may be broken if a successful saving throw is rolled, and this saving throw is checked on a periodic basis, according to the creature’s Intelligence (see the following table). If the caster harms, or attempts to harm, the charmed person by some overt action, or if a *dispel magic* spell is successfully cast upon the charmed person, the *charm* spell is broken.\n&emsp;If two or more *charm* effects simultaneously affect a creature, the result is decided by the DM. This could range from one effect being clearly dominant, to the subject being torn by conflicting desires, to new saving throws that could negate both spells.\n&emsp;Note that the subject has full memory of the events that took place while he was charmed.}}{{style=center1 sheet-spell-center2}}{{c1-1=**Intelligence Score**}}{{c2-1=3 or less}}{{c3-1=4–6}}{{c4-1=7–9}}{{c5-1=10–12}}{{c6-1=13–14}}{{c7-1=15–16}}{{c8-1=17}}{{c9-1=18}}{{c10-1=19 or more}}{{c1-2=**Time Between Checks**}}{{c2-2=3 months}}{{c3-2=2 months}}{{c4-2=1 month}}{{c5-2=3 weeks}}{{c6-2=2 weeks}}{{c7-2=1 week}}{{c8-2=3 days}}{{c9-2=2 days}}{{c10-2=1 day}}{{effects2=&emsp;**Note:** The period between checks is the time period during which the check occurs. When to roll the check during this time is determined (randomly or by selection) by the DM. The roll is made secretly.',
};

wiz1['Chill Touch'] = {
    'level': '1',
    'school': 'Necromancy',
    'range': '0',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 172',
    'book': 'PHB',
    'damage': '[[1d4]]',
    'damage-type': '',
    'healing': '',
    'effect': 'When the caster completes this spell, a blue glow encompasses his hand. This energy attacks the life force of any living creature upon which the wizard makes a successful melee attack. The touched creature must roll a successful saving throw vs. spell or suffer 1d4 points of damage and lose 1 point of Strength. If the save is successful, the creature remains unharmed. Creatures not rated for Strength suffer a –1 penalty to their attack rolls for every other successful touch. Lost Strength returns at the rate of 1 point per hour. Damage must be cured magically or healed naturally.\n&emsp;This spell has a special effect on undead creatures. Undead touched by the caster suffer no damage or Strength loss, but they must successfully save vs. spell or flee for 1d4 rounds + 1 round per level of the caster.'
};

wiz1['Color Spray'] = {
    'level': '1',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': '5 x 20 x 20 feet wedge',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A pinch each of powder or sand that is colored red, yellow, and blue.',
    'reference': 'p. 172',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, the wizard causes a vivid, fan-shaped spray of clashing colors to spring forth from his hand. From one to six creatures ([[1d6]]) within the area are affected in order of increasing distance from the wizard. All creatures above the level of the spellcaster and all those of 6th level or 6 Hit Dice or more are entitled to a saving throw vs. spell. Blind or unseeing creatures are not affected by the spell.\n&emsp;Creatures not allowed or failing saving throws, and whose Hit Dice or levels are less than or equal to the spellcaster’s level, are struck unconscious for 2d4 rounds; those with Hit Dice or levels 1 or 2 greater than the wizard’s level are blinded for 1d4 rounds; those with Hit Dice or levels 3 or more greater than that of the spellcaster are stunned (reeling and unable to think or act coherently) for one round.'
};

wiz1['Comprehend Languages'] = {
    'level': '1',
    'school': 'Alteration (Reversible)',
    'range': 'Touch',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': '1 speaking creature or written text',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A pinch of soot and a few grains of salt.',
    'reference': 'p. 172',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard is able to understand the spoken words of a creature or read an otherwise incomprehensible written message (such as writing in another language). In either case, the wizard must touch the creature or the writing. Note that the ability to read does not necessarily impart understanding of the material, nor does the spell enable the caster to speak or write an unknown language. Written material can be read at the rate of one page or equivalent per round. Magical writing cannot be read, other than to know it is magical, but the spell is often useful when deciphering treasure maps. This spell can be foiled by certain warding magic (the 3rd-level secret page and *illusionary script* spells), and it does not reveal messages concealed in otherwise normal text.\n&emsp;The reverse of this spell, *confuse languages*, cancels a *comprehend languages* spell or renders a writing or a creature’s speech incomprehensible, for the same duration as above.'
};

wiz1['Dancing Lights'] = {
    'level': '1',
    'school': 'Alteration',
    'range': '[[40+(10*[[@{level-wizard}]])]]',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'Either a bit of phosphorus or wychwood, or a glowworm.',
    'reference': 'p. 172',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *dancing lights* spell is cast, the wizard creates, at his option, from one to four lights that resemble either torches or lanterns (and cast that amount of light), glowing spheres of light (such as evidenced by will-o-wisps), or one faintly glowing, vaguely manlike shape, somewhat similar to that of a creature from the Elemental Plane of Fire. The dancing lights move as the spellcaster desires, forward or back, straight or turning corners, without concentration upon such movement by the wizard. The spell cannot be used to cause blindness (see the 1st-level *light* spell), and it winks out if the range or duration is exceeded.'
};

wiz1['Detect Magic'] = {
    'level': '1',
    'school': 'Divination',
    'range': '0',
    'duration': '[[2*[[@{level-wizard}]] ]]',
    'aoe': '10 x 60 feet',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 172',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the *detect magic* spell is cast, the wizard detects magical radiations in a path 10 feet wide and up to 60 feet long, in the direction he is facing. The intensity of the magic can be determined (dim, faint, moderate, strong, overwhelming), and the wizard has a 10% chance per level ([[10*[[@{level-wizard}]] ]]%) to recognize if a certain type of magic (alteration, conjuration, etc.) is present. The caster can turn, scanning a 60-degree arc per round. A stone wall of 1 foot or more thickness, solid metal of 1 inch thickness, or a yard or more of solid wood blocks the spell. Magical areas, multiple types of magic, or strong local magical emanations may confuse or conceal weaker radiations. Note that this spell does not reveal the presence of good or evil, or reveal alignment. Otherplanar creatures are not necessarily magical.'
};

wiz1['Detect Undead'] = {
    'level': '1',
    'school': 'Divination, Necromancy',
    'range': '0',
    'duration': '3 turns',
    'aoe': '[[60+(10*[[@{level-wizard}]])]] feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A bit of earth from a grave.',
    'reference': 'p. 173',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to detect all undead creatures out to the limit of the spell. The area of effect extends in a path 10 feet wide and 60 feet long (plus 10 feet longer per level of the wizard), in the direction the caster is facing. Scanning a direction requires one round, and the caster must be motionless. While the spell indicates direction, it does not give specific location or distance. It detects undead through walls and obstacles but is blocked by 1 foot of solid stone, 1 yard of wood or loose earth, or a thin coating of metal. The spell does not indicate the type of undead detected, only that undead are present.'
};

wiz1['Enlarge'] = {
    'level': '1',
    'school': 'Alteration (Reversible)',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': '1 creature or object',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': 'A pinch of powdered iron.',
    'reference': 'p. 173',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes instant growth of a creature or object, increasing both size and weight. It can be cast only upon a single creature (or a symbiotic or community entity) or upon a single object that does not exceed 10 cubic feet in volume per caster level. The object or creature must be seen to be affected. It grows by up to 10% per level of experience of the wizard ([[10*[[@{level-wizard}]] ]]%), increasing this amount in height, width, and weight.\n&emsp;All equipment worn or carried by a creature is enlarged by the spell. Unwilling victims are entitled to a saving throw vs. spell. A successful saving throw means the spell fails. If insufficient room is available for the desired growth, the creature or object attains the maximum possible size, bursting weak enclosures in the process, but it is constrained without harm by stronger materials—the spell cannot be used to crush a creature by growth.\n&emsp;Magical properties are not increased by this spell—a huge *sword +1* is still only +1, a staff-sized wand is still only capable of its normal functions, a giant-sized potion merely requires a greater fluid intake to make its magical effects operate, etc. Weight, mass, and strength are affected, though. Thus, a table blocking a door would be heavier and more effective, a hurled stone would have more mass (and cause more damage), chains would be more massive, doors thicker, a thin line turned to a sizeable, longer rope, and so on. A creature’s hit points, Armor Class, and attack rolls do not change, but damage rolls increase proportionately with size.For example, a fighter at 160% normal size hits with his long sword and rolls a 6 for damage. The adjusted damage roll is 10 (that is, 6 × 1.6 = 9.6, rounded up). Bonuses due to Strength, class, and magic are not altered.\n&emsp;The reverse spell, *reduce*, negates the *enlarge* spell or makes creatures or objects smaller. The creature or object loses 10% of its original size for every level of the caster, to a minimum of 10% of the original size. Thereafter, the size shrinks by 1-foot increments to less than 1 foot, by 1-inch increments to 1 inch, and by 1⁄10-inch increments to a minimum of 1⁄10 of an inch—the recipient cannot dwindle away to nothingness.\n&emsp;For example, a 16-foot-tall giant reduced by a 15th-level wizard (15 steps) would be reduced to 1.6 feet (in nine steps), then to 6⁄10 of a foot or 7.2 inches (in one step), and finally to 2.2 inches (in the last five steps). A shrinking object may damage weaker materials affixed to it, but an object will shrink only as long as the object itself is not damaged. Unwilling creatures are allowed a saving throw vs. spell.'
};

wiz1['Erase'] = {
    'level': '1',
    'school': 'Alteration',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '1 scroll or 2 pages',
    'components': 'v, S',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 173',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *erase* spell removes writings of either magical or mundane nature from a scroll or from one to two pages of paper, parchment, or similar surfaces. It removes *explosive runes*, *glyphs of warding*, *sepia snake sigils*, and *wizard marks*, but it does not remove *illusory script* or *symbols* (see those spells). Nonmagical writings are automatically erased if the caster is touching them; otherwise, the chance for success is 90%. Magical writings must be touched, and are only 30% likely to be erased, plus 5% per caster level, to a maximum of 90% (current chance: [[30+(5*[[@{level-wizard}]])]]%).'
};

wiz1['Feather Fall'] = {
    'level': '1',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 173',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the creature(s) or object(s) affected immediately assumes the mass of a piece of down. The rate of falling is instantly changed to a mere 2 feet per second (120 feet per round), and no damage is incurred upon landing while the spell is in effect. However, when the spell duration ceases, a normal rate of fall occurs. The spell can be cast upon the wizard or some other creature or object up to the maximum range and lasts for one round for each level of the wizard. The *feather fall* affects one or more objects or creatures in a 10-foot cube, as long as the maximum weight of the creatures or objects does not exceed a combined total of 200 pounds plus 200 pounds per level of the spellcaster. Current weight limit: [[200+(200*[[@{level-wizard}]])]] pounds.\n&emsp;For example, a 2nd-level wizard has a range of 20 yards, a duration of two rounds, and a weight limit of 600 pounds when casting this spell. The spell works only upon free-falling, flying, or propelled objects (such as missiles). It does not affect a sword blow or a charging creature. Note that the spell can be effectively combined with *gust of wind* and similar spells.'
};

wiz1['Find Familiar'] = {
    'level': '1',
    'school': 'Conjuration/Summoning',
    'range': '[[@{level-wizard}]] miles',
    'duration': 'Special',
    'aoe': '1 familiar',
    'components': 'V, S, M',
    'cast-time': '2d12 hours',
    'saving-throw': 'Special',
    'materials': '1000 gp worth of incense and herbs',
    'reference': 'p. 174',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to attempt to summon a familiar to act as his aide and companion. Familiars are typically small creatures, such as cats, frogs, ferrets, crows, hawks, snakes, owls, ravens, toads, weasels, or even mice. A creature acting as a familiar can benefit a wizard, conveying its sensory powers to its master, conversing with him, and serving as a guard/scout/spy as well. A wizard can have only one familiar at a time, however, and he has no control over what sort of creature answers the summoning, if any at all come.\n&emsp;The creature is always more intelligent than others of its type (typically by 2 or 3 Intelligence points), and its bond with the wizard confers upon it an exceptionally long life. The wizard receives the heightened senses of his familiar, which grants the wizard a +1 bonus to all surprise die rolls. Normal familiars have 2–4 hit points plus 1 hit point per caster level, and an Armor Class of 7 (due to size, speed, etc.).\n&emsp;The wizard has an empathic link with the familiar and can issue it mental commands at a distance of up to 1 mile. Note that empathic responses from the familiar are generally fairly basic—while able to communicate simple thoughts, these are often overwhelmed by instinctual responses. Thus, a ferret familiar spying on a band of orcs in the woods might lose its train of thought upon sighting a mouse. Certainly its communications to its master would be tinged with fear of the “big ones” it was spying on! The caster cannot see through the familiar’s eyes.\n&emsp;If separated from the caster, the familiar loses 1 hit point each day, and dies if reduced to 0 hit points. When the familiar is in physical contact with its wizard, it gains the wizard’s saving throws against special attacks. If a special attack would normally cause damage, the familiar suffers no damage if the saving throw is successful and half damage if the saving throw is failed. If the familiar dies, the wizard must successfully roll an immediate system shock check or die. Even if he survives this check, the wizard loses 1 point from his Constitution when the familiar dies.\n&emsp;The power of the conjuration is such that it can be attempted but once per year. When the wizard decides to find a familiar, he must load a brass brazier with charcoal. When this is burning well, he adds 1,000 gp worth of incense and herbs. The spell incantation is then begun and must be continued until the familiar comes or the casting time is finished. The DM secretly determines all results. Note that most familiars are not inherently magical, nor does a *dispel magic* spell send them away.\n&emsp;Deliberate mistreatment, failure to feed and care for the familiar, or continuous unreasonable demands have adverse effects on the familiar’s relationship with its master. Purposely arranging the death of one’s own familiar incurs great disfavor from certain powerful entities, with dire results.}}{{style=center1 sheet-spell-fixed3 sheet-spell-min3}}{{cc1-1=bottom}}{{c1-1=**D20 Roll**}}{{c2-1=1–5}}{{c3-1=6–7}}{{c4-1=8–9}}{{c5-1=10–11}}{{c6-1=12–13}}{{c7-1=14–15}}{{c8-1=16–20}}{{cc1-2=bottom}}{{c1-2=**Familiar* **}}{{c2-2=Cat, black}}{{c3-2=Crow}}{{c4-2=Hawk}}{{c5-2=Owl}}{{c6-2=Toad}}{{c7-2=Weasel}}{{c8-2=No familiar available within spell range}}{{cs8-2=2}}{{cc1-3=bottom}}{{c1-3=**Sensory Powers**}}{{c2-3=Excellent night vision\n& superior hearing}}{{c3-3=Excellent vision}}{{c4-3=Very superior distance vision}}{{c5-3=Night vision equals human daylight\nvision, superior hearing}}{{c6-3=Wide-angle vision}}{{c7-3=Superior hearing & very\nsuperior olfactory power}}{{effects2=* The DM can substitute other small animals suitable to the area.'
};

wiz1['Friends'] = {
    'level': '1',
    'school': 'Enchantment/Charm',
    'range': '0',
    'duration': '[[1d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '60-foot radius',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'Chalk (or white flour), lampblack (or soot), and vermilion applied to the face before casting the spell.',
    'reference': 'p. 174',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *friends* spell causes the wizard to temporarily gain [[2d4]] points of Charisma. Intelligent creatures within the area of effect at the time the spell is cast must make immediate reaction checks based on the character’s new Charisma. Those with favorable reactions tend to be very impressed with the spellcaster and make an effort to be his friends and help him, as appropriate to the situation. Officious bureaucrats might decide to become helpful; surly gate guards might wax informative; attacking orcs might spare the caster’s life, taking him captive instead. When the spell wears off, the creatures realize that they have been influenced, and their reactions are determined by the DM.'
};

wiz1['Gaze Reflection'] = {
    'level': '1',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[2+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 174',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *gaze reflection* spell creates a shimmering, mirrorlike area of air before the wizard that moves with the caster. Any gaze attack, such as that of a basilisk, *eyes of charming*, a vampire’s gaze, the 6th-level *eyebite* spell, and so on, is reflected back upon the gazer if the gazer tries to make eye contact with the spellcaster (the spellcaster suffers no effects from the gaze attack). Such creatures receive a saving throw vs. their own gaze effect. The spell does not affect vision or lighting and is not effective against creatures whose effect comes from being gazed upon (such as a medusa). Only active gaze attacks are blocked by this spell.'
};

wiz1['Grease'] = {
    'level': '1',
    'school': 'Conjuration',
    'range': '10 yards',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': '10 x 10 feet',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A bit of pork rind or butter.',
    'reference': 'p. 175',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *grease* spell covers a material surface with a slippery layer of a fatty, greasy nature. Any creature entering the area or caught in it when the spell is cast must save vs. spell or slip, skid, and fall. Those who successfully save can reach the nearest non*greased* surface by the end of the round. Those who remain in the area are allowed a saving throw each round until they escape the area. The DM should adjust saving throws by circumstance; for example, a creature charging down an incline that is suddenly greased has little chance to avoid the effect, but its ability to exit the affected area is almost assured! The spell can also be used to create a greasy coating on an item—a rope, ladder rungs, weapon handle, etc. Material objects not in use are always affected by this spell, while creatures wielding or employing items receive a saving throw vs. spell to avoid the effect. If the initial saving throw is failed, the creature immediately drops the item. A saving throw must be made each round the creature attempts to use the greased item. The caster can end the effect with a single utterance; otherwise, it lasts for three rounds plus one round per level.'
};

wiz1['Hold Portal'] = {
    'level': '1',
    'school': 'Alteration',
    'range': '[[20*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[20*[[@{level-wizard}]] ]] square feet',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 175',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell magically bars a door, gate, or valve of wood, metal, or stone. The magical closure holds the portal fast, just as if it were securely closed and locked. Any extraplanar creature (djinn, elemental, etc.) with 4 or more Hit Dice can shatter the spell and burst open the portal. A wizard of 4 or more experience levels higher than the spellcaster can open the held portal at will. A *knock* spell or a successful *dispel magic* spell can negate the *hold portal*. Held portals can be broken or physically battered down.'
};

wiz1['Hypnotism'] = {
    'level': '1',
    'school': 'Enchantment/Charm',
    'range': '5 yards',
    'duration': '[[1+[[@{level-wizard}]] ]] rounds',
    'aoe': '30 foot cube',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 175',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The gestures of the wizard, along with his droning incantation, cause [[1d6]] creatures within the area to become susceptible to a suggestion—a brief and reasonable-sounding request (see the 3rd-level wizard *suggestion* spell). The request must be given after the *hypnotism* spell is cast. Until that time, the success of the spell is unknown. Note that the subsequent suggestion is not a spell, but simply a vocalized urging (the caster must speak a language the creature understands for this spell to work). Creatures that successfully roll their saving throws are not under hypnotic influence. Those who are exceptionally wary or hostile save with +1 to +3 bonuses. If the spell is cast at an individual creature that meets the caster’s gaze, the saving throw is made with a penalty of –2. A creature that fails its saving throw does not remember that the caster enspelled it.'
};

wiz1['Identify'] = {
    'level': '1',
    'school': 'Divination',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[@{level-wizard}]] items',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': 'A pearl (of at least 100 gp value) and an owl feather steeped in wine;',
    'reference': 'p. 175',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When an *identify* spell is cast, magical items subsequently touched by the wizard can be identified. The eight hours immediately preceding the casting of the spell must be spent purifying the items and removing influences that would corrupt and blur their magical auras. If this period is interrupted, it must be begun again. When the spell is cast, each item must be handled in turn by the wizard. Any consequences of this handling fall fully upon the wizard and may end the spell, although the wizard is allowed any applicable saving throw.\n&emsp;The chance of learning a piece of information about an item is equal to 10% per level of the caster, to a maximum of 90%, rolled by the DM. Current chance is [[{{(10*[[@{level-wizard}]]),90}kl1}]]%. Any roll of 96–00 indicates a false reading (91–95 reveals nothing). Only one function of a multifunction item is discovered per handling (i.e., a 5th-level wizard could attempt to determine the nature of five different items, five different functions of a single item, or any combination of the two). If any attempt at reading fails, the caster cannot learn any more about that item until he advances a level. Note that some items, such as special magical tomes, cannot be identified with this spell.\n&emsp;The item never reveals its exact attack or damage bonuses, although the fact that it has few or many bonuses can be determined. If it has charges, only a general indication of the number of charges remaining is learned: powerful (81% – 100% of the total possible charges), strong (61% – 80%), moderate (41% – 60%), weak (6% – 40%), or faint (five charges or less). The faint result takes precedence, so a fully charged *ring of three wishes* always appears to be only faintly charged.\n&emsp;After casting the spell and determining what can be learned from it, the wizard loses 8 points of Constitution. He must rest for one hour to recover each point of Constitution. If the 8-point loss drops the spellcaster below a Constitution of 1, he falls unconscious. Consciousness is not regained until full Constitution is restored, which takes 24 hours (one point per three hours for an unconscious character).\n&emsp;The material components infusion must be drunk prior to spellcasting. If a *luckstone* is powdered and added to the infusion, the divination becomes much more potent: Exact bonuses or charges can be determined, and the functions of a multifunctional item can be learned from a single reading. At the DM’s option, certain properties of an artifact or relic might also be learned.'
};

wiz1['Jump'] = {
    'level': '1',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[1d3+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A grasshopper’s hind leg, to be broken by the caster when the spell is cast.',
    'reference': 'p. 176',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The individual touched when this spell is cast is empowered to leap once per round for the duration of the spell. Leaps can be up to 30 feet forward or straight upward or 10 feet backward. Horizontal leaps forward or backward have only a slight arc—about 2 feet per 10 feet of distance traveled. The *jump* spell does not ensure safety in landing or grasping at the end of the leap.'
};

wiz1['Light'] = {
    'level': '1',
    'school': 'Alteration',
    'range': '60 yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '20-foot radius',
    'components': 'V, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A firefly or a piece of phosphorescent moss.',
    'reference': 'p. 176',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a luminous glow, equal to torchlight, within a fixed radius of the spell’s center. Objects in darkness beyond this sphere can be seen, at best, as vague and shadowy shapes. The spell is centered on a point selected by the caster, and he must have a line of sight and unobstructed path for the spell when it is cast. Light can spring from air, rock, metal, wood, or almost any similar substance.\n&emsp;The effect is immobile unless it is specifically centered on a moveable object or mobile creature. If this spell is cast upon a creature, the applicable magic resistance and saving throw rolls must be made. Successful resistance negates the spell, while a successful saving throw indicates that the spell is centered immediately behind the creature, rather than upon the creature itself. Light taken into an area of magical darkness does not function, but if cast directly against magical darkness negates it (but only for the duration of the *light* spell, if the darkness effect is continual).\n&emsp;Light centered on the visual organs of a creature blinds it, reducing its attack rolls and saving throws by 4 and worsening its Armor Class by 4. The caster can end the spell at any time by uttering a single word.'
};

wiz1['Magic Missile'] = {
    'level': '1',
    'school': 'Evocation',
    'range': '[[60+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Instantaneous',
    'aoe': '1-5 targets',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 176',
    'book': 'PHB',
    'damage': 'M1: [[1d4+1]]}}{{d2t=[[ [[@{level-wizard}]]-2]]}}{{d2=, M2: [[1d4+1]]}}{{d3t=[[ [[@{level-wizard}]]-4]]}}{{d3=, M3: [[1d4+1]]}}{{d4t=[[ [[@{level-wizard}]]-6]]}}{{d4=, M4: [[1d4+1]]}}{{d5t=[[ [[@{level-wizard}]]-8]]}}{{d5=, M5: [[1d4+1]]',
    'damage-type': '',
    'healing': '',
    'effect': 'Use of the *magic missile* spell creates up to five missiles of magical energy that dart forth from the wizard’s fingertip and unerringly strike their target. This includes enemy creatures in a melee. The target creature must be seen or otherwise detected to be hit, however, so near-total concealment, such as that offered by arrow slits, can render the spell ineffective. Likewise, the caster must be able to identify the target. He cannot direct a magic missile to “Strike the commander of the legion,” unless he can single out the commander from the rest of the soldiers. Specific parts of a creature cannot be singled out. Inanimate objects (locks, etc.) cannot be damaged by the spell, and any attempt to do so wastes the missiles to no effect. Against creatures, each missile inflicts 1d4+1 points of damage.\n&emsp;For every two extra levels of experience, the wizard gains an additional missile—he has two at 3rd level, three at 5th level, four at 7th level, etc., up to a total of five missiles at 9th level. Currently [[1+([[{{floor(([[@{level-wizard}]]-1)/2),4}kl1}]])]] missiles. If the wizard has multiple missile capability, he can have them strike a single target creature or several creatures, as desired.'
};

wiz1['Mending'] = {
    'level': '1',
    'school': 'Alteration',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '1 object',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'Two small magnets of any type (lodestone in all likelihood) or two burrs.',
    'reference': 'p. 176',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell repairs small breaks or tears in objects. It will weld a broken ring, chain link, medallion, or slender dagger, providing but one break exists. Ceramic or wooden objects with multiple breaks can be invisibly rejoined to be as strong as new. A hole in a leather sack or wineskin is completely healed over by a *mending* spell. This spell does not, by itself, repair magical items of any type. One turn after the spell is cast, the magic of the joining fades, and the effect cannot be magically dispelled. The maximum volume of material the caster can mend is 1 cubic foot per level. Current maximum volume is [[@{level-wizard}]] cubic feet.'
};

wiz1['Message'] = {
    'level': '1',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A short piece of copper wire.',
    'reference': 'p. 176',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard can whisper messages and receive replies with little chance of being overheard. When the spell is cast, the wizard secretly or openly points his finger at each creature to be included in the spell effect. Up to one creature per level can be included. Currently [[@{level-wizard}]] creatures. When the wizard whispers, the whispered message travels in a straight line and is audible to all of the involved creatures within 30 feet, plus 10 feet per level of the caster. Current range is [[30+(10*[[@{level-wizard}]])]] feet. The creatures who receive the message can whisper a reply that is heard by the spellcaster. Note that there must be an unobstructed path between the spellcaster and the recipients of the spell. The message must be in a language the caster speaks; this spell does not by itself confer understanding upon the recipients. This spell is most often used to conduct quick and private conferences when the caster does not wish to be overheard.'
};

wiz1['Mount'] = {
    'level': '1',
    'school': 'Conjuration/Summoning',
    'range': '10 yards',
    'duration': '[[2+[[@{level-wizard}]] ]] hours',
    'aoe': '1 mount',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A bit of hair from the type of animal to be conjured.',
    'reference': 'p. 177',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster conjures a normal animal to serve him as a mount. The animal serves willingly and well, but at the expiration of the spell duration it disappears, returning to its own place. The type of mount gained by this spell depends on the level of the caster; of course, a caster can choose a lesser mount if desired. Available mounts include the following:}}{{style=center1}}{{c1-1=**Caster Level**}}{{c2-1=1–3}}{{c3-1=4–7}}{{c4-1=8–12}}{{c5-1=13–14}}{{c6-1=15+}}{{c1-2=**Mount**}}{{c2-2=Mule or light horse}}{{c3-2=Draft horse or war horse}}{{c4-2=Camel}}{{c5-2=Elephant}}{{c6-2=Griffon}}{{effects2=&emsp;The mount does not come with any riding gear, unless it is of a class lower than the caster would normally be entitled to; thus, a 4th-level wizard can gain a war horse without saddle and harness, or a light horse with saddle and harness. Elephants comes with howdah at 18th level. Griffon comes with saddle at 18th level. The statistics of the animal gained are typical of all creatures of the same class. The mount disappears when slain.',
};

wiz1['Nystu\'s Magical Aura'] = {
    'level': '1',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] days',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'A small square of silk, which must be passed over the object that receives the aura.',
    'reference': 'p. 177',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, any one item of no more than five pounds weight per level of the spellcaster ([[ [[@{level-wizard}]]*5]] pounds) can be given an aura that is noticed by someone using magic detection. Furthermore, the caster can specify the type of magical aura that is detected (alteration, conjuration, etc.) and this effectively masks the item’s actual aura, if any, unless the item’s own aura is exceptionally powerful (if it is an artifact, for instance). If the object bearing Nystul’s magical aura has an *identify* spell cast on it or is similarly examined, the examiner has a 50% chance of recognizing that the aura has been placed to mislead the unwary. Otherwise, the aura is believed and no amount of testing reveals what the true magic is.'
};

wiz1['Phantasmal Force'] = {
    'level': '1',
    'school': 'Illusion/Phantasm',
    'range': '[[60+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Special',
    'aoe': '[[400+(100*[[@{level-wizard}]])]] square feet',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A bit of fleece.',
    'reference': 'p. 177',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates the illusion of any object, creature, or force, as long as it is within the boundaries of the spell’s area of effect. The illusion is visual and affects all believing creatures (undead are immune) that view it. It does not create sound, smell, or temperature. Effects that depend on these senses usually fail. The illusion lasts until struck by an opponent—unless the spellcaster causes the illusion to react appropriately—or until the wizard ceases concentration upon the spell (due to desire, moving, or a successful attack that causes damage). Saving throws for illusions are explained under “Illusions” in Chapter 7: Magic and under “Adjudicating Illusions” at the beginning of Appendix 2. Creatures that disbelieve the illusion see it for what it is and add +4 to associates’ saving throws if this knowledge can be communicated effectively. Creatures believing the illusion are subject to its effects (again, as explained in Chapter 7).\n&emsp;The illusionary effect can be moved by the caster within the limits of the area of effect. The DM has to rule on the effectiveness of this spell; detailed guidelines are outlined in Chapter 7: Magic and under “Adjudicating Illusions” at the beginning of Appendix 2.'
};

wiz1['Protection From Evil'] = {
    'level': '1',
    'school': 'Abjuration (Reversible)',
    'range': 'Touch',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'The wizard must trace a 3-foot-diameter circle on the floor (or ground) with powdered silver.',
    'reference': 'p. 177',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, it creates a magical barrier around the recipient at a distance of 1 foot. The barrier moves with the recipient and has three major effects:\n&emsp;First, all attacks made by evil (or evilly enchanted) creatures against the protected creature suffer –2 penalties to attack rolls; any saving throws caused by such attacks are made with +2 bonuses. Second, any attempt to possess (as by a *magic jar* attack) or to exercise mental control over (as by a vampire’s *charm* ability) the protected creature is blocked by this spell. Note that the protection does not prevent a vampire’s *charm* itself, but it does prevent the exercise of mental control through the barrier. Likewise, a possessing life force is merely kept out. It would not be expelled if in place before the protection is cast.\n&emsp;Third, the spell prevents bodily contact by creatures of an extraplanar or conjured nature (such as aerial servants, elementals, imps, invisible stalkers, salamanders, water weirds, xorn, and others). This causes the natural (body) weapon attacks of such creatures to fail and the creatures to recoil, if such attacks require touching the protected being. Animals or monsters summoned or conjured by spells or similar magic are likewise hedged from the character.\n&emsp;This protection ends if the protected character makes a melee attack against or tries to force the barrier against the blocked creature.\n&emsp;This spell can be reversed to become *protection from good*; the second and third benefits remain unchanged. The material component for the reverse is a circle of powdered iron.'
};

wiz1['Read Magic'] = {
    'level': '1',
    'school': 'Divination',
    'range': '0',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A clear crystal or mineral prism, which is not expended, to cast the spell.',
    'reference': 'p. 178',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *read magic* spell, the wizard is able to read magical inscriptions on objects—books, scrolls, weapons, and the like—that would otherwise be totally unintelligible. (The personal books of the wizard, and works already magically read, are intelligible.) This deciphering does not normally invoke the magic contained in the writing, although it may do so in the case of a cursed scroll. Furthermore, once the spell is cast and the wizard has read the magical inscription, he is thereafter able to read that particular writing without recourse to the use of the *read magic* spell. The duration of the spell is two rounds per level of experience of the spellcaster; the wizard can read one page or its equivalent per round.'
};

wiz1['Shield'] = {
    'level': '1',
    'school': 'Evocation',
    'range': '0',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 178',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, an invisible barrier comes into being in front of the wizard. This shield totally negates magic missile attacks. It provides the equivalent protection of AC 2 against hand-hurled missiles (axes, darts, javelins, spears, etc.), AC 3 against small devicepropelled missiles (arrows, bolts, bullets, manticore spikes, sling stones, etc.), and AC 4 against all other forms of attack. The shield also adds a +1 bonus to the wizard’s saving throws against attacks that are basically frontal. Note that these benefits apply only if the attacks originate from in front of the wizard, where the shield can move to interpose itself.'
};

wiz1['Shocking Grasp'] = {
    'level': '1',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 178',
    'book': 'PHB',
    'damage': '[[1d8+[[@{level-wizard}]] ]]',
    'damage-type': 'Electrical',
    'healing': '',
    'effect': 'When the wizard casts this spell, he develops a powerful electrical charge that gives a jolt to the creature touched. The spell remains in effect for one round per level of the caster ([[@{level-wizard}]] rounds) or until it is discharged by the caster touching another creature. The shocking grasp delivers 1d8 points of damage, plus 1 point per level of the wizard (for example, a 2nd-level wizard would discharge a shock causing 1d8+2 points of damage). While the wizard must come close enough to his opponent to lay a hand on the opponent’s body or upon an electrical conductor that touches the opponent’s body, a like touch from the opponent does not discharge the spell.'
};

wiz1['Sleep'] = {
    'level': '1',
    'school': 'Enchantment/Charm',
    'range': '30 yards',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A pinch of fine sand, rose petals, or a live cricket.',
    'reference': 'p. 178',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a wizard casts a *sleep* spell, he causes a comatose slumber to come upon one or more creatures (other than undead and certain other creatures specifically excluded from the spell’s effects). All creatures to be affected by the *sleep* spell must be within 30 feet of each other. The number of creatures that can be affected is a function of Hit Dice or levels. The spell affects [[2d4]] Hit Dice of monsters. Monsters with 4+3 Hit Dice (4 Hit Dice plus 3 hit points) or more are unaffected. The center of the area of effect is determined by the spellcaster. The creatures with the least Hit Dice are affected first, and partial effects are ignored.\n&emsp;For example, a wizard casts *sleep* at three kobolds, two gnolls, and an ogre. The roll (2d4) result is 4. All the kobolds and one gnoll are affected (1⁄2 + 1⁄2 + 1⁄2 + 2 = 3 1⁄2 Hit Dice). Note that the remainder is not enough to affect the last gnoll or the ogre.\n&emsp;Slapping or wounding awakens affected creatures but normal noise does not. Awakening requires one entire round. Magically sleeping opponents can be attacked with substantial bonuses (see “Modifiers to the Attack Roll” in Chapter 9: Combat).'
};

wiz1['Spider Climb'] = {
    'level': '1',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': 'A drop of bitumen and a live spider, both of which must be eaten by the spell recipient.',
    'reference': 'p. 179',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *spider climb* spell enables the recipient to climb and travel upon vertical surfaces as well as a giant spider, or even hang upside down from ceilings. Unwilling victims must be touched and are then allowed a saving throw vs. spell to negate the effect. The affected creature must have bare hands and feet in order to climb in this manner, at a movement rate of 6 (3 if at all encumbered). During the course of the spell, the recipient cannot handle objects that weigh less than a dagger (one pound), for such objects stick to his hands and feet. Thus, a wizard will find it virtually impossible to cast spells if under a *spider climb* spell. Sufficient force can pull the recipient free; the DM can assign a saving throw based on circumstances, the strength of the force, and so on. For example, a creature with a Strength of 12 might pull the subject free if the subject fails a saving throw vs. paralyzation (a moderately difficult saving throw). The caster can end the spell effect with a word.'
};

wiz1['Spook'] = {
    'level': '1',
    'school': 'Illusion/Phantasm',
    'range': '30 feet',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 179',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *spook* spell enables the wizard to play upon natural fears to cause the target creature to perceive the spellcaster as someone or something inimical. Without actually knowing what this is, the wizard merely advances threateningly upon the creature. If the creature does not make a successful saving throw vs. spell, it turns and flees at maximum speed as far from the wizard as possible, though items carried are not dropped. The creature has a saving throw penalty of –1 for every two experience levels of the caster, to a maximum of –6 at 12th level. Current penalty [[{{[[floor(-[[@{level-wizard}]]/2)]],-6}kh1}]]. Note that a natural (unmodified) roll of 20 automatically succeeds, regardless of saving throw penalties. Although the caster does not actually pursue the fleeing creature, a phantasm from its own mind does. Each round after the initial casting, the creature receives another saving throw, without penalty, until it successfully saves and the spell is broken. In any event, the spell functions only against creatures with Intelligences of 2 or more, and undead are not affected at all.'
};

wiz1['Taunt'] = {
    'level': '1',
    'school': 'Enchantment',
    'range': '60 yards',
    'duration': '1 round',
    'aoe': '30 foot radius',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': 'A slug, which is hurled at the creatures to be taunted.',
    'reference': 'p. 179',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *taunt* spell enables the caster to jape and jeer effectively at a single type of creature with an Intelligence of 2 or greater. The caster need not speak the language of the creatures. His words and sounds have real meaning for the subject creature or creatures, challenging, insulting, and generally irritating and angering the listeners. Those failing to save vs. spell rush forth in fury to do battle with the spellcaster. All affected creatures attack the spellcaster in melee if physically capable of doing so, seeking to use body or hand-held weapons rather than missile weapons or spells.\n&emsp;Separation of the caster from the victim by an impenetrable or uncrossable boundary (a wall of fire, a deep chasm, a formation of set pikemen) causes the spell to break. If the caster taunts a mixed group, he must choose the type of creature to be affected. Creatures commanded by a strong leader (i.e., with a Charisma bonus, with higher Hit Dice, etc.) might gain a saving throw bonus of +1 to +4, at the DM’s discretion. If used in conjunction with a *ventriloquism* spell, the creatures may attack the apparent source, depending upon their Intelligence, a leader’s presence, and so on.'
};

wiz1['Tenser\'s Floating Disc'] = {
    'level': '1',
    'school': 'Evocation',
    'range': '20 yards',
    'duration': '[[3+[[@{level-wizard}]] ]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A drop of mercury.',
    'reference': 'p. 179',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the caster creates the slightly concave, circular plane of force known as Tenser’s floating disc (after the famed wizard whose greed and ability to locate treasure are well known). The disc is 3 feet in diameter and holds 100 pounds of weight per level of the wizard casting the spell. Current weight limit [[100*[[@{level-wizard}]] ]] pounds. The disc floats approximately 3 feet above the ground at all times and remains level. It floats along horizontally within its range of 20 yards at the command of the caster, and will accompany him at a movement rate of no more than 6. If unguided, it maintains a constant interval of 6 feet between itself and the wizard. If the spellcaster moves beyond range (by moving faster, by such means as a *teleport* spell, or by trying to take the disc more than 3 feet from the surface beneath it), or if the spell duration expires, the floating disc winks out of existence, and whatever it was supporting crashes to the surface beneath it.'
};

wiz1['Unseen Servant'] = {
    'level': '1',
    'school': 'Conjuration/Summoning',
    'range': '0',
    'duration': '1 hours + [[@{level-wizard}]] turns',
    'aoe': '30-foot radius',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A piece of string and a bit of wood.',
    'reference': 'p. 180',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The unseen servant is an invisible, mindless, and shapeless force, used to step and fetch, open unstuck doors, and hold chairs, as well as to clean and mend. It is not strong, but unfailingly obeys the command of the wizard. It can perform only one activity at a time and can move only lightweight items, carrying a maximum of 20 pounds or pushing/pulling 40 pounds across a smooth surface. It can open only normal doors, drawers, lids, etc. The unseen servant cannot fight, nor can it be killed, as it is a force rather than a creature. It can be magically dispelled, or eliminated after receiving 6 points of damage from areaeffect spells, breath weapons, or similar attacks. If the caster attempts to send it beyond the allowed radius, the spell ends immediately.'
};

wiz1['Ventriloquism'] = {
    'level': '1',
    'school': 'Illusion/Phantasm',
    'range': '[[{{[[10*#LEVLE#]],90}kl1}]] yards',
    'duration': '[[4+[[@{level-wizard}]] ]] rounds',
    'aoe': '1 creature or object',
    'components': 'V, M',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': 'A parchment rolled up into a small cone.',
    'reference': 'p. 180',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to make his voice—or someone else’s voice—or a similar sound seem to issue from someplace else, such as from another creature, a statue, from behind a door, down a passage, etc. The spellcaster can speak in any language that he knows, or make any sound that he can normally make. With respect to such voices and sounds, anyone rolling a successful saving throw vs. spell with a –2 penalty detects the ruse. If cast in conjunction with other illusions, the DM may rule greater penalties or disallow an independent saving throw against this spell in consideration of its contribution to the total effect of the combined illusion.'
};

wiz1['Wall of Fog'] = {
    'level': '1',
    'school': 'Evocation',
    'range': '30 yards',
    'duration': '[[2d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '[[20+(10*[[@{level-wizard}]])]] foot cube',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A pinch of split dried peas.',
    'reference': 'p. 180',
 'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell, the wizard creates a billowing wall of misty vapors in any area within the spell range. The wall of fog obscures all sight, normal and infravision, beyond 2 feet. The caster may create less vapor if he wishes. The wall must be a roughly cubic or rectangular mass, at least 10 feet across in its smallest dimension. The misty vapors persist for three or more rounds. Their duration can be halved by a moderate wind, and they can be blown away by a strong wind.'
};

wiz1['Wizard Mark'] = {
    'level': '1',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Up to 1 square foot',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A pinch of diamond dust (about 100 gp worth) and a pigment or pigments for the coloration of the mark. If the mark is to be invisible, the pigments are still used, but the caster uses a stylus of some sort rather than his finger.',
    'reference': 'p. 179',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard is able to inscribe, visibly or invisibly, his personal rune or mark, as well as up to six additional characters of smaller size. A *wizard mark* spell enables the caster to etch the rune upon stone, metal, or any softer substance without harm to the material upon which the mark is placed. If an invisible mark is made, a *detect magic* spell will cause it to glow and be visible (though not necessarily understandable). *Detect invisibility*, *true seeing*, a *gem of seeing*, or a *robe of eyes* will likewise expose an invisible wizard mark. A *read magic* spell will reveal the maker’s words, if any. The mark cannot be dispelled, but it can be removed by the caster or by an *erase* spell. If cast on a living being, normal wear gradually causes the mark to fade.'
};

let wiz2 = {};
wiz2['Alter Self'] = {
    'level': '2',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[3d4+(2*[[@{level-wizard}]])]]',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 180',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard can alter his appearance and form—including clothing and equipment—to appear taller or shorter; thin, fat, or in between; human, humanoid, or any other generally man-shaped bipedal creature. The caster’s body can undergo a limited physical alteration and his size can be changed up to 50%. If the form selected has wings, the wizard can actually fly, but at only onethird the speed of a true creature of that type, and with a loss of two maneuverability classes (to a minimum of E). If the form has gills, the caster can breathe under water as long as the spell lasts. However, the caster does not gain any multiple attack routines or additional damage allowed to an assumed form.\n&emsp;The caster’s attack rolls, Armor Class, and saving throws do not change. The spell does not confer special abilities, attack forms, or defenses. Once the new form is chosen, it remains for the duration of the spell. The caster can change back into his own form at will; this ends the spell immediately. A caster who is slain automatically returns to his normal form.'
};

wiz2['Bind'] = {
    'level': '2',
    'school': 'Enchantment',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[50+(5*[[@{level-wizard}]])]] feet',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 181',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is employed, the wizard can command any nonliving ropelike object, including string, yarn, cord, line, rope, or even a cable. The spell affects 50 feet of normal rope (with a 1 inch diameter), plus 5 feet per caster level. This length is reduced by 50% for every additional inch of thickness and increased by 50% for each half-inch less. The possible commands are Coil (form a neat, coiled stack), Coil & Knot, Loop, Loop & Knot, Tie & Knot, and the reverses of all of the above (Uncoil, etc.). One command can be given each round.\n&emsp;The rope can only enwrap a creature or an object within 1 foot of it—it does not snake outward—so it must be thrown or hurled near the intended target. Note that the rope itself, and any knots tied in it, are not magical. A typical rope might be AC 6 and take 4 points of slashing damage before breaking. The rope does not inflict damage of any type, but it can be used as a trip line or to entangle a single opponent who fails a saving throw vs. spell.'
};

wiz2['Blindness'] = {
    'level': '2',
    'school': 'Illusion/Phantasm',
    'range': '[[30+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 181',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *blindness* spell causes the victim to become blind, able to see only a grayness before its eyes. Various *cure* spells will not remove this effect, and only a *dispel magic* or the spellcaster can do away with the blindness if the creature fails its initial saving throw vs. spell. A blinded creature suffers a –4 penalty to its attack rolls, and its opponents gain a +4 bonus to their attack rolls.'
};

wiz2['Blur'] = {
    'level': '2',
    'school': 'Illusion/Phantasm',
    'range': '0',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 181',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *blur* spell is cast, the wizard causes the outline of his form to become blurred, shifting and wavering. This distortion causes all missile and melee combat attacks against the caster to be made with –4 penalties on the first attempt and –2 penalties on all successive attacks. It also grants the wizard a +1 bonus to his saving throw for any direct magical attack. A *detect invisibility* spell will not counter this effect, but the 5th-level priest spell *true seeing* and similar magic will.'
};

wiz2['Continual Light'] = {
    'level': '2',
    'school': 'Alteration (Reversible)',
    'range': '60 yards',
    'duration': 'Permanent',
    'aoe': '60-foot radius',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 181',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to a *light* spell, except that it is as bright as full daylight and lasts until negated by magical darkness or by a *dispel magic* spell. Creatures who suffer penalties in bright light suffer them in this spell’s area of effect. As with the *light* spell, it can be cast into the air, onto an object, or at a creature. When cast at a creature, the target gets a saving throw vs. spell; success indicates that the spell affects the space about 1 foot behind the creature instead. Note that this spell can also blind a creature if it is successfully cast upon the creature’s visual organs, reducing its attack rolls, saving throws, and Armor Class by 4. If the spell is cast on a small object that is then placed in a light-proof covering, the spell’s effects are blocked until the covering is removed.\n&emsp;A continual light brought into an area of magical darkness (or vice versa) is temporarily negated so that the otherwise prevailing light conditions exist in the overlapping areas of effect. A direct casting of *continual light* against a similar or weaker magical darkness cancels both.\n&emsp;This spell eventually consumes the material it is cast upon, but the process takes far longer than the time in the typical campaign. Extremely hard and expensive materials can last hundreds or even thousands of years.'
};

wiz2['Darkness, 15\' Radius'] = {
    'level': '2',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '1 turn + [[@{level-wizard}]] rounds',
    'aoe': '15-foot radius',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A bit of bat fur and either a drop of pitch or a piece of coal.',
    'reference': 'p. 181',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes total, impenetrable darkness in the area of effect. Infravision is useless. Neither normal nor magical light works unless a *light* or *continual light* spell is used. In the former event, the *darkness* spell is negated by the *light* spell, and vice versa.'
};

wiz2['Deafness'] = {
    'level': '2',
    'school': 'Illusion/Phantasm',
    'range': '60 yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'Beeswax',
    'reference': 'p. 181',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *deafness* spell causes the recipient to become totally deaf and unable to hear any sounds. The victim is allowed a saving throw vs. spell. An affected creature has a –1 penalty to its surprise rolls unless its other senses are unusually keen. Deafened spellcasters have a 20% chance to miscast any spell with a verbal component. This *deafness* can be done away with only by means of a *dispel magic* spell or by the spellcaster.'
};

wiz2['Deeppockets'] = {
    'level': '2',
    'school': 'Alteration, Enchantment',
    'range': 'Touch',
    'duration': '[[12+[[@{level-wizard}]] ]] hours',
    'aoe': '1 garment',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'In addition to the garment, which is reusable, the material components of this spell are a tiny golden needle and a strip of fine cloth given a half-twist and fastened at the ends.',
    'reference': 'p. 182',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to specially prepare a garment so as to hold far more than it normally could. A finely sewn gown or robe of high-quality material (at least 50 gp value) is fashioned so as to contain numerous hand-sized pockets. One dozen is the minimum number. The *deeppockets* spell then enables these pockets to hold a total of 100 pounds (5 cubic feet in volume) as if it were only 10 pounds of weight. Furthermore, there are no discernible bulges where the special pockets are. At the time of casting, the caster can instead choose to have 10 pockets each holding 10 pounds (1⁄2 cubic foot volume each). If the robe or like garment is sewn with 100 or more pockets (200 gp minimum cost), 100 pockets can be created to contain one pound of weight and 1⁄6 cubic foot volume each. Each special pocket is actually an extradimensional holding space.\n&emsp;If the spell duration expires while there is material within the enchanted pockets, or if a successful *dispel magic* is cast upon the enchanted garment, all the material suddenly appears around the wearer and immediately falls to the ground. The caster can also cause all the pockets to empty with a single command.'
};

wiz2['Detect Evil'] = {
    'level': '2',
    'school': 'Divination (Reversible)',
    'range': '0',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': '10 x 180 feet',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 182',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell discovers emanations of evil (or of good in the case of the reverse spell) from any creature, object, or area. Character alignment is *not* revealed under most circumstances: Characters who are strongly aligned, do not stray from their faith, and who are at least 9th level might radiate good or evil if they are intent upon appropriate actions. Powerful monsters, such as ki-rin, send forth emanations of evil or good, even if polymorphed. Aligned undead radiate evil, for it is this power and negative force that enables them to continue existing. An evilly cursed object or unholy water radiates evil, but a hidden trap or an unintelligent viper does not. The degree of evil (faint, moderate, strong, overwhelming) can be noted. Note that priests have a more powerful version of this spell. The spell has a path of detection 10 feet wide and 60 yards long in the direction in which the wizard is facing. The wizard must concentrate— stop, have quiet, and intently seek to detect the aura—for at least one round to receive a reading.'
};

wiz2['Detect Invisibility'] = {
    'level': '2',
    'school': 'Divination',
    'range': '0',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': '[[10*[[@{level-wizard}]] ]] yards',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A pinch of talc and a small sprinkling of powdered silver.',
    'reference': 'p. 182',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the wizard casts a *detect invisibility* spell, he is able to see clearly any objects or beings that are invisible, as well as any that are astral, ethereal, or out of phase. In addition, it enables the wizard to detect hidden or concealed creatures (for example, thieves in shadows, halflings in underbrush, and so on). It does not reveal the method of concealment or invisibility, except in the case of astral travelers (where the silver cord can be seen). It does not reveal illusions or enable the caster to see through physical objects. Detection is a path 10 ft. wide along the wizard’s line of sight to the range limit.'
};

wiz2['ESP'] = {
    'level': '2',
    'school': 'Divination',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[{{5*[[@{level-wizard}]],90}kl1}]] yards. (90 yards maximum)',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A copper piece.',
    'reference': 'p. 182',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When an *ESP* spell is used, the caster is able to detect the surface thoughts of any creatures in range—except for those of undead and creatures without minds (as we know them). The ESP is stopped by 2 feet of rock, 2 inches of any metal other than lead, or a thin sheet of lead foil.\n&emsp;The wizard employing the spell is able to probe the surface thoughts of one creature per round, getting simple instinctual thoughts from lower order creatures. Probes can continue on the same creature from round to round or can move on to other creatures. The caster can use the spell to help determine if a creature lurks behind a door, for example, but the ESP does not always reveal what sort of creature it is. If used as part of a program of interrogation, an intelligent and wary subject receives an initial saving throw. If successful, the creature successfully resists and the spell reveals no additional information. If the saving throw is failed, the caster may learn additional information, according to the DM’s ruling. The creature’s Wisdom adjustment applies, as may additional bonuses up to +4, based on the sensitivity of the information sought.'
};

wiz2['Flaming Sphere'] = {
    'level': '2',
    'school': 'Evocation',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '3-foot radius',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A bit of tallow, a pinch of sulphur, and a dusting of powdered iron.',
    'reference': 'p. 182',
    'book': 'PHB',
    'damage': 'Direct contact: 2d4 Fire. 5 feet proximity: 1d4',
    'damage-type': 'Heat',
    'healing': '',
    'effect': 'A *flaming sphere* spell creates a burning globe of fire within 10 yards of the caster. This sphere rolls in whichever direction the wizard points, at a rate of 30 feet per round. It rolls over barriers less than 4 feet tall, such as furniture, low walls, etc. Flammable substances are set afire by contact with the sphere. Creatures in contact with the globe must successfully save vs. spell or suffer 2d4 points of fire damage. Those within 5 feet of the sphere’s surface must also save or suffer 1d4 points of heat damage. A successful saving throw means no damage is suffered. The DM may adjust the saving throws if there is little or no room to dodge the sphere.\n&emsp;The sphere moves as long as the spellcaster actively directs it; otherwise, it merely stays at rest and burns. It can be extinguished by the same means as any normal fire of its size. The surface of the sphere has a spongy, yielding consistency and so does not cause damage except by its flame. It cannot push unwilling creatures aside or batter down large obstacles.'
};

wiz2['Fog Cloud'] = {
    'level': '2',
    'school': 'Alteration',
    'range': '10 yards',
    'duration': '[[4+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 183',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *fog cloud* spell can be cast in one of two ways, at the caster’s option: as a large, stationary bank of normal fog, or as a harmless fog that resembles the 5th-level wizard spell *cloudkill*.\n&emsp;As a fog bank, this spell creates a fog of any size and shape up to a maximum 20-foot cube per caster level. The fog obscures all sight, normal and infravision, beyond 2 feet.\n&emsp;As a cloudkill-like fog, this is a billowing mass of ghastly, yellowishgreen vapors, measuring 40 feet × 20 feet × 20 feet. This moves away from the caster at 10 feet per round. The vapors are heavier than air and sink to the lowest level, even pouring down sinkholes and den openings. Very thick vegetation breaks up the fog after it has moved 20 feet into the vegetation.\n&emsp;The only effect of either version is to obscure vision. A strong breeze will disperse either effect in one round, while a moderate breeze will reduce the spell duration by 50%. The spell cannot be cast under water.'
};

wiz2['Fools\' Gold'] = {
    'level': '2',
    'school': 'Alteration',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[10*[[@{level-wizard}]] ]] cubic inches',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'Copper coins or brass items.',
    'reference': 'p. 183',
 'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Copper coins can temporarily be changed to gold pieces, or brass items turned to solid gold, for the spell duration by means of this magic. The area of effect is 10 cubic inches per level—i.e., a 1-inch × 1-inch × 10-inch volume or equivalent, equal to about 150 gold coins. (Current max is about [[150*[[@{level-wizard}]] ]]). Any creature viewing the “gold” is entitled to a saving throw vs. spell, which can be modified by the creature’s Wisdom; for every level of the wizard, the creature must subtract 1 from his dice roll. Thus, it is unlikely that fools’ gold will be detected if created by a high-level caster. If the “gold” is struck hard by an object of cold-wrought iron, there is a slight chance it will revert to its natural state, depending on the material component used to create the “gold.” If a 25-gp citrine is powdered and sprinkled over the metal as this spell is cast, the chance that cold iron will return it to its true nature is 30%; if a 50-gp amber stone is powdered and used, the chance drops to 25%; if a 250-gp topaz is powdered and used, the chance drops to 10%; and if a 500-gp oriental (corundum) topaz is powdered and used, there is only a 1% chance that the cold iron will reveal that it is fools’ gold.'
};

wiz2['Forget'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '1-4 creatures in a 20-foot cube',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 183',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the spellcaster causes creatures within the area of effect to forget the events of the previous minute (the one minute of time previous to the utterance of the spell). For every three levels of experience of the spellcaster, another minute of past time is forgotten ([[1+floor([[@{level-wizard}]]/3)]] minutes). This does not negate *charm*, *suggestion*, *geas*, *quest*, or similar spells, but it is possible that the being who placed such magic upon the recipient could be forgotten. From one to four creatures can be affected, at the discretion of the caster. If only one is to be affected, the recipient saves vs. spell with a –2 penalty; if two, they save with –1 penalties; if three or four are to be affected, they save normally. All saving throws are adjusted by Wisdom. A priest’s *heal* or *restoration* spell, if specially cast for this purpose, will restore the lost memories, as will a *limited wish* or *wish*, but no other means will do so.'
};

wiz2['Glitterdust'] = {
    'level': '2',
    'school': 'Conjuration/Summoning',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '20 foot cube',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': 'Ground mica',
    'reference': 'p. 183',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a cloud of glittering golden particles within the area of effect. Those in the area must roll a successful saving throw vs. spell or be blinded (–4 penalties to attack rolls, saving throws, and Armor Class) for [[1d4+1]] rounds. In addition, all within the area are covered by the dust, which cannot be removed and continues to sparkle until it fades. Note that this reveals invisible creatures. The dust fades in 1d4 rounds plus one round per caster level. Thus, glitterdust cast by a 3rd-level wizard lasts for four to seven rounds. Dust fades in [[1d4+[[@{level-wizard}]] ]] rounds.'
};

wiz2['Hypnotic Pattern'] = {
    'level': '2',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': '30-foot cube',
    'components': 'S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A glowing stick of incense or a crystal rod filled with phosphorescent material.',
    'reference': 'p. 183',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard creates a weaving, twisting pattern of subtle colors in the air. This pattern causes any creature looking at it to become fascinated and stand gazing at it as long as the spellcaster maintains the display, plus two rounds thereafter. The spell can captivate a maximum of 24 levels, or Hit Dice, of creatures (for example, 24 creatures with 1 Hit Die each, 12 with 2 Hit Dice, etc.). All creatures affected must be within the area of effect, and each is entitled to a saving throw vs. spell. A damage-inflicting attack on an affected creature frees it from the spell immediately.\n&emsp;The wizard need not utter a sound, but he must gesture appropriately while holding a glowing stick of incense or a crystal rod filled with phosphorescent material.'
};

wiz2['Improved Phantasmal Force'] = {
    'level': '2',
    'school': 'Illusion/Phantasm',
    'range': '[[60+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Special',
    'aoe': '[[200+(50*[[@{level-wizard}]])]] square feet',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': 'A bit of fleece.',
    'reference': 'p. 184',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Like the 1st-level *phantasmal force* spell, this spell creates the illusion of any object, creature, or force, as long as it is within the spell’s area of effect. The spellcaster can maintain the illusion with minimal concentration; thus, he can move at half normal speed (but not cast other spells). Some minor sounds are included in the effects of the spell, but not understandable speech. Also, the improved phantasm continues for two rounds after the wizard ceases to concentrate upon it.'
};

wiz2['Invisibility'] = {
    'level': '2',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'An eyelash and a bit of gum arabic, the former encased in the latter.',
    'reference': 'p. 184',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes the creature touched to vanish from sight and be undetectable by normal vision or even infravision. Of course, the invisible creature is not magically silenced, and certain other conditions can render the creature detectable. Even allies cannot see the invisible creature or his gear, unless these allies can normally see invisible things or employ magic to do so. Items dropped or put down by the invisible creature become visible; items picked up disappear if tucked into the clothing or pouches worn by the creature. Note, however, that light never becomes invisible, although a source of light can become so (thus, the effect is that of a light with no visible source).\n&emsp;The spell remains in effect until it is magically broken or dispelled, until the wizard or recipient cancels it, until the recipient attacks any creature, or until 24 hours have passed. Thus, the invisible being can open doors, talk, eat, climb stairs, etc., but if he attacks, he immediately becomes visible, although the invisibility enables him to attack first. Note that the priest spells *bless*, *chant*, and *prayer* are not attacks for this purpose. All highly Intelligent (Intelligence 13 or more) creatures with 10 or more Hit Dice or levels of experience have a chance to detect invisible objects (they roll saving throws vs. spell; success means they noticed the invisible object).'
};

wiz2['Irritation'] = {
    'level': '2',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '1-4 creatures in a 15-foot radius',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A leaf from poison ivy, oak, or sumac.',
    'reference': 'p. 184',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'An *irritation* spell affects the epidermis of the subject creatures. Creatures with very thick or insensitive skins (such as buffalo, elephants, scaled creatures, etc.) are basically unaffected. There are two versions of the spell, either of which can be cast from the standard preparation:\n&emsp;*Itching*. When cast, this causes each subject to feel an instant itching sensation on some portion of its body. If one round is not immediately spent scratching the irritated area, the creature is so affected that the next three rounds are spent squirming and twisting, effectively worsening its Armor Class by 4 and its attack rolls by 2 during this time. Spell preparations are ruined in the first round this spell is in effect, but not in the following three rounds. Doing nothing but scratching the itch for a full round prevents the rest of the effect. If cast at one creature, the saving throw has a –3 penalty; if cast at two creatures, the saving throw has a –1 penalty; and if cast at three or four creatures, the saving throw is normal.\n&emsp;*Rash*. When a rash is cast, the subject notices nothing for 1d4 rounds, but thereafter its entire skin breaks out in red welts that itch. The rash persists until either a *cure disease* or *dispel magic* spell is cast upon it. It lowers Charisma by 1 point per day for each of four days (i.e., maximum Charisma loss is 4 points). After one week, Dexterity is lowered by 1 point also. Symptoms vanish immediately upon the removal of the rash, and all statistics return to normal. This can be cast at one creature only, with a saving throw penalty of –2.'
};

wiz2['Knock'] = {
    'level': '2',
    'school': 'Alteration (Reversible)',
    'range': '60 yards',
    'duration': 'Special',
    'aoe': '[[10*[[@{level-wizard}]] ]] feet',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 184',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *knock* spell opens stuck, barred, locked, held, or wizardlocked doors. It opens secret doors, as well as locked or trick-opening boxes or chests. It also loosens welds, shackles, or chains. If used to open a wizard-locked door, the spell does not remove the former spell, but simply suspends its functioning for one turn. In all other cases, it permanently opens locks or welds—although the former could be closed and locked again later. It does not raise barred gates or similar impediments (such as a portcullis), nor does it affect ropes, vines, and the like. Note that the effect is limited by the area; a 3rd-level wizard can cast a knock spell on a door of 30 square feet or less (for example, a standard 4-ft. × 7-ft. door). Each spell can undo up to two means of preventing egress through a portal. Thus if a door is locked, barred, and held, or triple locked, opening it requires two *knock* spells. In all cases, the location of the door or item must be known—the spell cannot be used against a wall in hopes of discovering a secret door.\n&emsp;The reverse spell, *lock*, closes and locks a door or similar closure, provided there is a physical mechanism. It does not create a weld, but it locks physically operated locking mechanisms, set bars, and so on, up to two functions. It cannot affect a portcullis.'
};

wiz2['Know Alignment'] = {
    'level': '2',
    'school': 'Divination (Reversible)',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '1 creature or object per 2 rounds',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 185',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *know alignment* spell enables the wizard to read the aura of a creature or an aligned object (unaligned objects reveal nothing). The caster must remain stationary and concentrate on the subject for two full rounds. A creature is allowed a saving throw vs. spell and, if successful, the caster learns nothing about that particular creature from the casting. If the caster concentrates on a creature or object for only one round, he can learn only its alignment with respect to law and chaos. Certain magical devices negate the *know alignment* spell.\n&emsp;The reverse, *undetectable alignment*, conceals the alignment of an object or creature for 24 hours—even from a know alignment spell.'
};

wiz2['Leomund\'s Trap'] = {
    'level': '2',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Object touched',
    'components': 'V, S, M',
    'cast-time': '3 rounds',
    'saving-throw': 'None',
    'materials': 'A piece of iron pyrite.',
    'reference': 'p. 185',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This false trap is designed to fool a thief or other character attempting to pilfer the spellcaster’s goods. The wizard places the spell upon any small mechanism or device, such as a lock, hinge, hasp, screw-on cap, ratchet, etc. Any character able to detect traps, or who uses any spell or device enabling trap detection, is 100% certain a real trap exists. Of course, the spell is illusory and nothing happens if the trap is sprung; its primary purpose is to frighten away thieves or make them waste precious time.\n&emsp;The material component of the spell is a piece of iron pyrite touched to the object to be trapped while the object is sprinkled with a special dust requiring 200 gp to prepare. If another *Leomund’s trap* is within 50 feet when the spell is cast, the casting fails.'
};

wiz2['Levitate'] = {
    'level': '2',
    'school': 'Alteration',
    'range': '[[20*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '1 creature or object',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'Either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end.',
    'reference': 'p. 185',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *levitate* spell is cast, the wizard can place it upon his person, an object, or a single creature, subject to a maximum weight limit of 100 pounds per level of experience (for example, a 3rd-level wizard can levitate a maximum of 300 pounds. Current max: [[100*[[@{level-wizard}]] ]] pounds). If the spell is cast upon the wizard, he can move vertically up or down at a movement rate of 2 per round. If cast upon an object or another creature, the wizard can levitate it at the same speed, according to his command. This spell does not empower horizontal movement, but the recipient could push along the face of a cliff, for example, to move laterally. The spellcaster can cancel the spell as desired. If the subject of the spell is unwilling, or the object is in the possession of a creature, a saving throw vs. spell is allowed to determine if the *levitate* spell affects it.\n&emsp;Once cast, the spell requires no concentration, except when changing height. A levitating creature attempting to use a missile weapon finds himself increasingly unstable; the first attack has an attack roll penalty of –1, the second –2, the third –3, etc., up to a maximum of –5. A full round spent stabilizing allows the creature to begin again at –1. Lack of leverage makes it impossible to cock a medium or heavy crossbow.'
};

wiz2['Locate Object'] = {
    'level': '2',
    'school': 'Divination (Reversible)',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[20*[[@{level-wizard}]] ]] yards',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '*Locate object*:A forked twig. / *Obscure object*: A chameleon skin.',
    'reference': 'p. 185',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell aids in locating a known or familiar object. The wizard casts the spell, slowly turns, and senses when he is facing in the direction of the object to be located, provided the object is within range (i.e., 60 yards for 3rd-level wizards, 80 yards for 4th, 100 yards for 5th, etc.). The spell can locate such objects as apparel, jewelry, furniture, tools, weapons, or even a ladder or stairway. Note that attempting to find a specific item, such as jewelry or a crown, requires an accurate mental image; if the image is not close enough to the actual, the spell does not work. Desired but unique objects cannot be located by this spell unless they are known by the caster. The spell is blocked by lead. Creatures cannot be found by this spell.\n&emsp;The reversal, obscure object, hides an object from location by spell, crystal ball, or similar means for eight hours. Creatures cannot be affected by this spell.'
};

wiz2['Magic Mouth'] = {
    'level': '2',
    'school': 'Alteration',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '1 object',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A small bit of honeycomb.',
    'reference': 'p. 185',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard imbues the chosen object with an enchanted mouth that suddenly appears and speaks its message when a specified event occurs. The message, which must be of 25 words or less, can be in any language known by the spellcaster, and can be delivered over a period of one turn. The mouth cannot speak magical spells or use command words. It does, however, move to the words articulated—if it is placed upon a statue, the mouth of the statue would actually move and appear to speak. Of course, the magic mouth can be placed upon a tree, rock, door, or any other object, excluding intelligent members of the animal or vegetable kingdoms.\n&emsp;The spell functions when specific conditions are fulfilled, according to the command of the spellcaster. Some examples are to speak “to the first creature that touches you,” or “to the first creature that passes within 30 feet.” Commands can be as general or as detailed as desired, although only visual and audible triggers can be used, such as the following: “Speak only when a venerable female human carrying a sack of groat clusters sits crosslegged within 1 foot.” Such visual triggers can react to a character using the *disguise* ability. Command range is 5 yards per level of the wizard ([[5*[[@{level-wizard}]] ]] yards), so a 6th-level wizard can command the magic mouth to speak at a maximum encounter range of 30 yards (“Speak when a winged creature comes within 30 yards.”). The spell lasts until the speak command can be fulfilled; thus, the spell duration is variable. A magic mouth cannot distinguish invisible creatures, alignments, level, Hit Dice, or class, except by external garb. If desired, the effect can be keyed to a specific noise or spoken word.'
};

wiz2['Melf\'s Acid Arrow'] = {
    'level': '2',
    'school': 'Conjuration',
    'range': '180 yards',
    'duration': 'Special',
    'aoe': '1 target',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': 'A dart, powdered rhubarb leaf, and an adder’s stomach.',
    'reference': 'p. 186',
    'book': 'PHB',
    'damage': '[[2d4]] + 2d4 for [[floor([[@{level-wizard}]]/3)]] additional rounds of',
    'damage-type': 'Acid',
    'healing': '',
    'effect': 'By means of this spell, the wizard creates a magical arrow that speeds to its target as if fired from the bow of a fighter of the same level as the wizard. No modifiers for range, nonproficiency, or specialization are used. The arrow has no attack or damage bonus, but it inflicts 2d4 points of acid damage (with saving throws for items on the target); there is no splash damage. For every three levels that the caster has achieved, the acid, unless somehow neutralized, lasts for another round, inflicting another 2d4 points of damage each round. So at 3rd–5th level, the acid lasts two rounds; at 6th–8th level, the acid lasts for three rounds, etc. Currently [[1+floor([[@{level-wizard}]]/3)]] total rounds.'
};

wiz2['Mirror Image'] = {
    'level': '2',
    'school': 'Illusion/Phantasm',
    'range': '0',
    'duration': '[[3*[[@{level-wizard}]] ]] rounds',
    'aoe': '6-foot radius',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 186',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *mirror image* spell is invoked, the spellcaster causes from two to eight exact duplicates of himself to come into being around him. These images do exactly what the wizard does. Since the spell causes a blurring and slight distortion when it is cast, it is impossible for opponents to be certain which are the illusions and which is the actual wizard. When an image is struck by a melee or missile attack, magical or otherwise, it disappears, but any other existing images remain intact until struck. The images seem to shift from round to round, so that if the actual wizard is struck during one round, he cannot be picked out from among his images the next. To determine the number of images that appear, roll 1d4 and add 1 for every three levels of experience the wizard has achieved, to a maximum of eight images ([[{{[[1d4+floor([[@{level-wizard}]]/3)]],8}kl1}]] images). At the end of the spell duration, all surviving images wink out.'
};

wiz2['Misdirection'] = {
    'level': '2',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': '8 hours',
    'aoe': '1 creature or object',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 186',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard misdirects the information from a detection spell (*detect charm, detect evil, detect invisibility, detect lie, detect magic, detect snares and pits*, etc.). While the detection spell functions, it indicates the wrong area, creature, or the opposite of the truth with respect to *detect evil* or *detect lie*. The wizard directs the spell effect upon the object of the detection spell. If the caster of the detection spell fails his saving throw vs. spell, the misdirection takes place. Note that this spell does not affect other types of divination (*know alignment, augury, ESP, clairvoyance*, etc.).'
};

wiz2['Protection From Cantrips'] = {
    'level': '2',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '[[5+[[@{level-wizard}]] ]] hours',
    'aoe': 'Creature or object touched',
    'components': 'V, S',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 186',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell, the wizard receives immunity to the effects of cantrips cast by other wizards, apprentices, or creatures that use the *cantrip* spell. The spell protects the caster, or one item or person that he touches (such as a spell book or a drawer containing spell components). Any cantrip cast against the protected person or item dissipates with an audible popping sound. This spell is often used by a wizard who has mischievous apprentices, or one who wishes apprentices to clean or shine an area using elbow grease rather than magic. Any unwilling target of this spell must be touched (via an attack roll) and is allowed a saving throw vs. spell to escape the effect.'
};

wiz2['Pyrotechnics'] = {
    'level': '2',
    'school': 'Alteration',
    'range': '120 yards',
    'duration': 'Special',
    'aoe': '1 fire source',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'One fire source within a 20-foot cube',
    'reference': 'p. 186',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *pyrotechnics* spell draws on an existing fire source to produce one of two effects, at the option of the caster. First, it can produce a flashing and fiery burst of glowing, colored aerial fireworks that lasts one round. This effect temporarily blinds those creatures in, under, or within 120 feet of the area and that have an unobstructed line of sight to the burst. Creatures viewing this are blinded for 1d4+1 rounds unless they successfully save vs. spell. The fireworks fill a volume 10 times greater than that of the original fire source.\n&emsp;This spell can also cause a thick, writhing stream of smoke to arise from the source and form a choking cloud that lasts for one round per experience level of the caster. This covers a roughly spherical volume from the ground or floor up (or conforming to the shape of a confined area) that totally obscures vision beyond 2 feet. The smoke fills a volume 100 times that of the fire source. All within the cloud must roll successful saving throws vs. spell or suffer –2 penalties to all combat rolls and Armor Class.\n&emsp;The spell uses one fire source within a 20-foot cube, which is immediately extinguished. An extremely large fire used as a source might be only partially extinguished. Magical fires are not extinguished, although a fire-based creature (such as a fire elemental) used as a source suffers 1 point of damage per caster level.'
};

wiz2['Ray of Enfeeblement'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'range': '[[10+(5*[[@{level-wizard}]])]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 187',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *ray of enfeeblement*, a wizard weakens an opponent, reducing its Strength and thereby the attacks that rely upon it. Humans, demihumans, and humanoids of man-size or less are reduced to an effective Strength of 5, losing all Strength bonuses and suffering an attack roll penalty of –2 and a –1 penalty to damage. Other creatures suffer a penalty of –2 on attack rolls. Furthermore, they have a –1 penalty for each die of damage they inflict. (But no damage roll can inflict less than 1 point per die of damage.) Your DM will determine any other effects appropriate to the affected creature. If the target creature makes its saving throw, the spell has no effect. This spell does not affect combat bonuses due to magical items, and those conferring increased Strength function normally.'
};

wiz2['Rope Tricks'] = {
    'level': '2',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[2*[[@{level-wizard}]] ]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'Powdered corn extract and a twisted loop of parchment.',
    'reference': 'p. 187',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast upon a piece of rope from 5 to 30 feet long, one end of the rope rises into the air until the whole rope hangs perpendicular, as if affixed at the upper end. The upper end is, in fact, fastened to an extradimensional space. The spellcaster and up to seven others can climb up the rope and disappear into this place of safety where no creature can find them. The rope can be taken into the extradimensional space if fewer than eight persons have climbed it; otherwise, it simply stays hanging in the air (extremely strong creatures might be able to remove it, at the DM’s option). Spells cannot be cast across the interdimensional interface, nor can area effects cross it. Those in the extradimensional space can see out of it as if there were a 3-foot × 5-foot window centered on the rope. The persons in the extradimensional space must climb down prior to the end of the spell, or they are dropped from the height at which they entered the extradimensional space. The rope can be climbed by only one person at a time. Note that the *rope trick* spell enables climbers to reach a normal place if they do not climb all the way to the extradimensional space. Also note that creating or taking extradimensional spaces into an existing extradimensional space is hazardous.'
};

wiz2['Scare'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'range': '[[30+(10*[[@{level-wizard}]])]] yards',
    'duration': '[[1d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '15-foot radius',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': 'A bit of bone from an undead skeleton, zombie, ghoul, ghast, or mummy.',
    'reference': 'p. 187',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes creatures with fewer than 6 Hit Dice or levels of experience to fall into fits of trembling and shaking. The frightened creatures have a –2 reaction adjustment and may drop items held if encumbered. If cornered, they fight, but with –1 penalties to attack rolls, damage rolls, and saving throws.\n&emsp;Only elves, half-elves, and priests are allowed saving throws against this spell. Note that this spell has no effect on the undead (skeletons, zombies, ghouls, and so on), or on upper or lower planar creatures of any sort.'
};

wiz2['Shatter'] = {
    'level': '2',
    'school': 'Alteration',
    'range': '[[30+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Instantaneous',
    'aoe': '3-foot radius',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A chip of mica.',
    'reference': 'p. 188',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *shatter* spell is a sound-based attack that affects nonmagical objects of crystal, glass, ceramic, or porcelain, such as vials, bottles, flasks, jugs, windows, mirrors, etc. All such objects within a 3-foot radius of the center of the spell effect are smashed into dozens of pieces by the spell. Objects weighing more than one pound per level of the caster ([[@{level-wizard}]] pounds) are not affected, but all other objects of the appropriate composition must save vs. crushing blow or be shattered. Alternatively, the spell can be focused against a single item of up to 10 pounds per caster level. Crystalline creatures usually suffer 1d6 points of damage per caster level to a maximum of 6d6, with a saving throw vs. spell for half damage.'
};

wiz2['Spectral Hand'] = {
    'level': '2',
    'school': 'Necromancy',
    'range': '[[30+(5*[[@{level-wizard}]])]] yards',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '1 opponent',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A chip of mica.',
    'reference': 'p. 188',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes a ghostly, glowing hand, shaped from the caster’s life force, to materialize within the spell range and move as the caster desires. Any touch attack spell of 4th level or less that is subsequently cast by the wizard can be delivered by the spectral hand. The spell gives the caster a +2 bonus to his attack roll. The caster cannot perform any other actions when attacking with the hand; the hand returns to the caster and hovers if the caster takes other actions. The hand lasts the full spell duration unless dismissed by the caster, and it is possible to use more than one touch attack with it. The hand receives flank and rear attack bonuses if the caster is in a position to do so. The hand is vulnerable to magical attack but has an Armor Class of –2. Any damage to the hand ends the spell and inflicts 1d4 points of damage to the caster.'
};

wiz2['Stinking Cloud'] = {
    'level': '2',
    'school': 'Evocation',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '20-foot cube',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': 'A rotten egg or several skunk cabbage leaves.',
    'reference': 'p. 188',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *stinking cloud* is cast, the wizard creates a billowing mass of nauseous vapors up to 30 yards away from his position. Any creature caught within the cloud must roll a successful saving throw vs. poison or be reeling and unable to attack because of nausea for 1d4+1 rounds after leaving the cloud. Those who make successful saving throws can leave the cloud without suffering any ill effects, although those remaining in the cloud must continue to save each round. These poisonous effects can be slowed or neutralized by appropriate magic. The cloud duration is halved in a moderate breeze (8–18 m.p.h.) and is dispersed in one round by a stronger breeze.'
};

wiz2['Strength'] = {
    'level': '2',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': 'Person touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A few hairs, or a pinch of dung, from a particularly strong animal—ape, bear, ox, etc.',
    'reference': 'p. 188',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Application of this spell increases the Strength of the character by  a number of points—or tenths of points after 18 Strength is attained  (only if the character is a warrior). Benefits of the strength spell last  for the duration of the magic. The amount of added Strength  depends upon the spell recipient’s group and is subject to all restrictions on Strength due to race and class. Multiclass characters use the best die.}}{{c1-1=&emsp;**Class**}}{{c2-1=&emsp;Priest}}{{c3-1=&emsp;Rogue}}{{c4-1=&emsp;Warrior}}{{c5-1=&emsp;Wizard}}{{c1-2=**Strength Gain**}}{{c2-2=1d6 points}}{{c3-2=1d6 points}}{{c4-2=1d8 points}}{{c5-2=1d4 points}}{{effects2=&emsp;If a warrior has an 18 Strength already, from 10% to 80% is  added to his extraordinary Strength roll. The spell cannot confer a Strength of 19 or more, nor is it cumulative with other magic that adds to Strength. Beings without Strength scores (kobolds, lizard  men, etc.) receive a +1 to attack and damage rolls.'
};

wiz2['Summon Swarm'] = {
    'level': '2',
    'school': 'Conjuration/Summoning',
    'range': '60 yards',
    'duration': 'Special',
    'aoe': '10-foot cube',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A square of red cloth.',
    'reference': 'p. 188',
    'book': 'PHB',
    'damage': '1 damage per round defending else 1d4+[[@{level-wizard}]] ',
    'damage-type': '',
    'healing': '',
    'effect': 'The swarm of small animals (roll on following table to determine type, or the DM can assign an appropriate creature) drawn by the *summon swarm* spell will viciously attack all creatures in the area chosen by the caster. Creatures actively defending against the swarm to the exclusion of other activities suffer 1 point of damage for each round spent in the swarm. Those taking other actions, including leaving the swarm, receive damage equal to 1d4 points + 1 point per three levels of the caster each round. Note that spellcasting within the swarm is impossible.}}{{style=center1}}{{c1-1=**Dice Roll**}}{{c2-1=01–40}}{{c3-1=41–70}}{{c4-1=71–80}}{{c5-1=81–90}}{{c6-1=91–100}}{{c1-2=**Swarm Type**}}{{c2-2=Rats}}{{c3-2=Bats}}{{c4-2=Spiders}}{{c5-2=Centipedes/beetles}}{{c6-2=Flying insects}}{{effects2=&emsp;The swarm cannot be fought effectively with weapons, but fire and area effects can force it to disperse by inflicting damage. The swarm disperses when it has taken a total of 2 hit points per caster level from these attacks. A *protection from evil* spell keeps the swarm at bay, and certain area-effect spells, such as *gust of wind* and *stinking cloud*, disperse a swarm immediately, if appropriate to the swarm summoned (for example, only flyers are affected by a *gust of wind*). The caster must remain stationary and undisturbed to control the swarm; if his concentration lapses or is broken, the swarm disperses in two rounds. The swarm is stationary once conjured.'
};

wiz2['Tasha\'s Uncontrollable Hideous Laughter'] = {
    'level': '2',
    'school': 'Enchantment/Charm',
    'range': '60 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '1 or more creatures in a 30-foot cube',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate',
    'materials': 'A small feather and minute tarts.',
    'reference': 'p. 189',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The victim of this spell perceives everything as hilariously funny. The effect is not immediate, and the creature feels only a slight tingling on the round the spell is cast. On the round immediately following, the victim begins smiling, then giggling, chuckling, tittering, snickering, guffawing, and finally collapsing into gales of uncontrollable, hideous laughter. Although this magical mirth lasts only a single round, the affected creature must spend the next round regaining its feet, and it loses 2 points from its Strength (or –2 to attack and damage rolls) for all remaining rounds of the spell.\n&emsp;The saving throw vs. spell is modified by the Intelligence of the creature. Creatures with Intelligences of 4 or less (semi-intelligent) are totally unaffected. Those with Intelligences of 5–7 (low) save with –6 penalties. Those with Intelligences of 8–12 (average to very) save with –4 penalties. Those with Intelligences of 13–14 (high) save with –2 penalties. Those with Intelligences of 15 or greater (exceptional) have unmodified saving throws.\n&emsp;The caster can affect one creature for every three levels attained ([[floor([[@{level-wizard}]]/3)]] creatures)— for example, one at 3rd level, two at 6th level, three at 9th level, etc. All affected beings must be within 30 feet of each other.\n&emsp;The material components are a small feather and minute tarts. The tarts are hurled at the subjects, while the feather is waved in one hand.'
};

wiz2['Web'] = {
    'level': '2',
    'school': 'Evocation',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[2*[[@{level-wizard}]] ]] turns',
    'aoe': '8000 cubic feet',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Negate or ½',
    'materials': 'A bit of spider web.',
    'reference': 'p. 189',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *web* spell creates a many-layered mass of strong, sticky strands similar to spider webs but far larger and tougher. These masses must be anchored to two or more solid and diametrically opposed points— floor and ceiling, opposite walls, etc.—or the web collapses upon itself and disappears.\n&emsp;The *web* spell covers a maximum area of eight 10-foot × 10-foot × 10-foot cubes and the webs must be at least 10 feet thick, so a mass 40 feet high, 20 feet wide, and 10 feet deep may be cast. Creatures caught within webs, or simply touching them, become stuck among the gluey fibers.\n&emsp;Anyone in the area when the spell is cast must roll a saving throw vs. spell with a –2 penalty. If the saving throw is successful, two things may have occurred. If the creature has room to escape the area, then it is assumed to have jumped free. If there is no room to escape, then the webs are only half strength. Creatures with less than 13 Strength (7 if the webs are half strength) are stuck until freed by another or until the spell wears off. Missile fire is generally ineffective against creatures trapped in webs.\n&emsp;Creatures with Strengths between 13 and 17 can break through 1 foot of webs per round. Creatures with 18 or greater Strength can break through 2 feet of webs per round. If the webs are at half strength, these rates are doubled. (Great mass equates to great strength in this case, and creatures of large mass hardly notice webs.) Strong and huge creatures can break through 10 feet of webs per round.\n&emsp;Furthermore, the strands of a *web* spell are flammable. A magical *flaming sword* can slash them away as easily as a hand brushes away cobwebs. Any fire—torch, flaming oil, flaming sword, etc.—can set them alight and burn them away in a single round. All creatures within flaming webs suffer 2d4 points of damage from the flames, but those free of the strands are not harmed.'
};

wiz2['Whispering Wind'] = {
    'level': '2',
    'school': 'Alteration, Phantasm',
    'range': '[[@{level-wizard}]] miles',
    'duration': 'Special',
    'aoe': '2-foot radius',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 189',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to either send a message or cause some desired sound effect. The whispering wind can travel as many miles above ground as the spellcaster has levels of experience, to a specific location within range that is familiar to the wizard. The whispering wind is as gentle and unnoticed as a zephyr until it reaches the location. It then delivers its whisper-quiet message or other sound. Note that the message is delivered regardless of whether anyone is present to hear it. The wind then dissipates. The wizard can prepare the spell to bear a message of up to 25 words, cause the spell to deliver other sounds for one round, or merely have the whispering wind seem to be a faint stirring of the air that has a susurrant sound. He can likewise cause the whispering wind to move as slowly as a mile per hour or as quickly as a mile per turn. When the spell reaches its objective, it swirls and remains until the message is delivered. As with the *magic mouth* spell, no spells may be cast via the *whispering wind*.'
};

wiz2['Wizard Lock'] = {
    'level': '2',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '[[30*[[@{level-wizard}]] ]] square feet',
    'components': 'V, S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 189',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *wizard lock* spell cast upon a door, chest, or portal magically locks it. The caster can freely pass his own lock without affecting it; otherwise, the wizard-locked door or object can be opened only by breaking in, by a successful *dispel magic* or *knock* spell, or by a wizard four or more levels higher than the one casting the spell. Note that the last two methods do not remove the wizard lock; they only negate it for a brief duration— about one turn. Creatures from other planes cannot burst a wizard lock as they can a held portal (see the *hold portal* spell).'
};

let wiz3 = {};
wiz3['Blink'] = {
    'level': '3',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 190',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard causes his material form to “blink” directly from one point to another at a random time and in a random direction. This means that melee attacks against the wizard automatically miss if initiative indicates they fall after he has blinked.\n&emsp;Each round the spell is in effect, the wizard rolls 2d8 to determine the timing of the blink—the result of the dice roll is used as the wizard’s initiative for that round. The wizard disappears and instantaneously reappears 10 feet distant from his previous position. (Direction is determined by a roll of 1d8: 1 = right ahead, 2 = right, 3 = right behind, 4 = behind, 5 = left behind, 6 = left, 7 = left ahead, 8 = ahead.) The caster cannot blink into a solid object; if such is indicated, reroll the direction. Movable objects of size and mass comparable to the caster are shoved aside when the caster blinks in. If blinking is impossible except into a  fixed, solid object, the caster is then trapped on the Ethereal Plane.\n&emsp;During each round that he blinks, the spellcaster can be attacked only by opponents who win initiative or by those who are able to strike both locations at once (for example, with a breath weapon, fireball, or similar wide-area attack forms). Opponents with multiple attacks, or those operating under haste or similar effects, can often strike early enough to have at least one attack against the caster.\n&emsp;If the spellcaster holds off his attack (if any) until after the blink, the 2d8 delay until the blink is added to his normal 1d10 initiative roll (thus, he probably attacks last in the round). The spellcaster can also try  to get his attack in before he blinks (he must announce his intent before rolling the 2d8 for blink timing and the 1d10 for initiative). In this case, the caster compares the two dice rolls, hoping that his initiative roll is lower than his blink roll (the two rolls are *not* added if he is trying to attack before he blinks). If so, he attacks according to his initiative roll, then blinks according to the blink roll. If his blink roll is lower than his  initiative roll, however, he blinks first and then attacks in whatever direction he’s facing (he must go through with his attack, even if he is facing in the wrong direction to affect anyone).'
};

wiz3['Clairaudience'] = {
    'level': '3',
    'school': 'Divination',
    'range': 'Unlimited',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '60-foot radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A small horn of at least 100 gp value',
    'reference': 'p. 190',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *clairaudience* spell enables the wizard to concentrate upon some locale and hear in his mind any noise within a 60-foot radius of that point. Distance is not a factor, but the locale must be known—a place familiar to the spellcaster or an obvious one (such as behind a door, around a corner, in a copse of trees, etc.). Only sounds that are normally detectable by the wizard can be heard by use of this spell. Lead sheeting or magical protections prevent the operation of the spell, and the wizard has some indication that the spell is so blocked. The spell creates an invisible sensor, similar to that created by a *crystal ball* spell, that can be dispelled. The spell functions only on the wizard’s current plane of existence.'
};

wiz3['Clairvoyance'] = {
    'level': '3',
    'school': 'Divination',
    'range': 'Unlimited',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Line of sight',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A pinch of powdered pineal gland',
    'reference': 'p. 190',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Similar to the *clairaudience* spell, the *clairvoyance* spell empowers the wizard to see in his mind whatever is within sight range from the spell locale chosen. Distance from the wizard is not a factor, but the locale must be known—familiar or obvious. Furthermore, light is a factor, as the spell does not enable the use of infravision or magical enhancements. If the area is magically dark, only darkness is seen; if naturally pitch dark, only a 10-foot radius from the center of the spell’s area of effect can be seen. Otherwise, the seeing extends to the normal vision range according to the prevailing light. Lead sheeting or magical protection foils a *clairvoyance* spell, and the wizard has some indication that it is so blocked. The spell creates an invisible sensor, similar to that created by a *crystal ball* spell, that can be dispelled. The spell functions only on the wizard’s current plane of existence.'
};

wiz3['Delude'] = {
    'level': '3',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '30-foot radius',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 190',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *delude* spell, the wizard conceals his own alignment with that of any creature within a 30-foot radius at the time the spell is cast. The creature must be of higher than animal intelligence for the spell to work; its own alignment remains unchanged. The creature receives a saving throw vs. spell and, if successful, the delude spell fails. If the spell is successful, any *know alignment* spell used against the caster discovers only the assumed alignment. Note that a *detect good* or *detect evil* also detects the assumed aura, if the aura is strong enough. The creature whose aura has been assumed radiates magic, but the wizard radiates magic only to the creature whose alignment has been assumed. If a *delude* spell is used in conjunction with a *change self* or *alter self* spell, the class of the wizard can be totally hidden, if he is clever enough to carry off the disguise.'
};

wiz3['Dispel Magic'] = {
    'level': '3',
    'school': 'Abjuration',
    'range': '120 yards',
    'duration': 'Instantaneous',
    'aoe': '30-foot cube',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 191',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a wizard casts this spell, it has a chance to neutralize or negate magic it comes in contact with, as follows:\n&emsp;First, it removes spells and spell-like effects (including device effects and innate abilities) from creatures or objects. Second, it disrupts the casting or use of these in the area of effect at the instant the dispel is cast. Third, it destroys magical potions (which are treated as 12th level for purposes of this spell).\n&emsp;Each effect or potion in the spell’s area is checked to determine if it is dispelled. The caster can always dispel his own magic; otherwise, the chance to dispel depends on the difference in level between the magical effect and the caster. The base chance is 50% (11 or higher on 1d20 to dispel). If the caster is of higher level than the creator of the effect to be dispelled, the difference is subtracted from the number needed on 1d20 to dispel (making it more likely that the dispel succeeds); if the caster is of lower level, the difference is *added* to the number needed on 1d20 to dispel (making it *less* likely that the dispel succeeds). A roll of 20 always succeeds and a roll of 1 always fails. Thus, if a caster is 10 levels higher, only a roll of 1 prevents the effect from being dispelled.\n&emsp;A *dispel magic* spell does not affect a specially enchanted item, such as a magical scroll, ring, wand, rod, staff, miscellaneous item, weapon, shield, or armor, unless it is cast directly upon the item. This renders the item nonoperational for 1d4 rounds. An item possessed and carried by a creature gains the creature’s saving throw against this effect; otherwise, it is automatically rendered nonoperational. An interdimensional interface (such as a *bag of holding*) rendered nonoperational would be temporarily closed. Note that an item’s physical properties are unchanged: A nonoperational magical sword is still a sword.\n&emsp;Artifacts and relics are not subject to this spell; however, some of their spell-like effects may be, at the DM’s option.\n&emsp;Note that this spell can be very effective when used upon charmed and similarly beguiled creatures. Certain spells or effects cannot be dispelled; these are listed in the spell descriptions.\n\n**Summary of Dispel Magic Effects**}}{{style=bottom3}}{{cc1-1=bottom}}{{c1-1=**Source of Effect**}}{{c2-1=Caster}}{{c3-1=Other caster/}}{{c4-1=&emsp;innate ability}}{{c5-1=Wand}}{{c6-1=Staff}}{{c7-1=Potion}}{{c8-1=Other magic}}{{c9-1=Artifact}}{{cc1-2=bottom}}{{c1-2=**Resists As**}}{{c2-2=None}}{{c3-2=Leve/HD of}}{{c4-2=&emsp;other caster}}{{c5-2=6th level}}{{c6-2=8th level}}{{c7-2=12th level}}{{c8-2=12th, unless special}}{{c9-2=DM discretion}}{{c1-3=**Result of Dispel**}}{{c2-3=Dispel automatic}}{{c4-3=Effect negated}}{{c5-3=&#42;}}{{c6-3=&#42}}{{c7-3=Potion destroyed}}{{c8-3=&#42}}{{c9-3=DM discretion}}{{effects2=&#42 Effect negated; if cast directly on item, item becomes nonoperational for 1d4 rounds.',
};

wiz3['Explosive Runes'] = {
    'level': '3',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '10-foot radius',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None or ½',
    'materials': '',
    'reference': 'p. 191',
    'book': 'PHB',
    'damage': '[[6d4+6]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'By tracing these mystic runes upon a book, map, scroll, or similar object bearing written information, the wizard prevents unauthorized persons from reading his material. The explosive runes are difficult to detect—5% chance per level of magic use experience of the reader; thieves have only a 5% chance. But trap detection by spell or magical device always finds these runes.\n&emsp;When read, the explosive runes detonate, delivering 6d4+6 points of damage to the reader, who gets no saving throw. A like amount, or half that if saving throws are made, is suffered by each creature within the blast radius. The wizard who cast the spell, as well as any he instructs, can read the protected writing without triggering the runes. Likewise, the wizard can remove the runes whenever desired. Others can remove them only with a successful *dispel magic* or *erase* spell. Explosive runes otherwise last until the spell is triggered. The item upon which the runes are placed is destroyed when the explosion takes place, unless it is not normally subject to destruction by magical fire (see the item saving throws in Chapter 6 of the *DUNGEON MASTER Guide*).'
};

wiz3['Feign Death'] = {
    'level': '3',
    'school': 'Necromancy',
    'range': 'Touch',
    'duration': '1 hour + [[@{level-wizard}]] turns',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 191',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster (or any other creature whose levels of experience or Hit Dice do not exceed the wizard’s own level) can be put into a cataleptic state that is impossible to distinguish from death. Although the person or creature affected by the *feign death* spell can smell, hear, and know what is going on, no feeling or sight of any sort is possible. Thus, any wounding or mistreatment of the body is not felt and no reaction occurs; damage is only half normal. In addition, paralysis, poison, and energy-level drain cannot affect an individual under the influence of this spell. Poison injected or otherwise introduced into the body takes effect when the spell recipient is no longer under the influence of this spell, although a saving throw is permitted.\n&emsp;Note that only a willing individual can be affected by a *feign death* spell. The spellcaster can end the spell effects at any time desired, as will a successful dispel, but a full round is required for bodily functions to begin again.'
};

wiz3['Fireball'] = {
    'level': '3',
    'school': 'Evocation',
    'range': '[[10+10*[[@{level-wizard}]] ]] yards',
    'duration': 'Instantaneous',
    'aoe': '20-foot radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': '½',
    'materials': 'A tiny ball of bat guano and sulphur',
    'reference': 'p. 191',
    'book': 'PHB',
    'damage': '[[ [[{[[@{level-wizard}]],10}kl1]]d6]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'A fireball is an explosive burst of flame, which detonates with a low roar and delivers damage proportional to the level of the wizard who cast it—1d6 points of damage for each level of experience of the spellcaster (up to a maximum of 10d6). The burst of the fireball creates little pressure and generally conforms to the shape of the area in which it occurs. The fireball fills an area equal to its normal spherical volume (roughly 33,000 cubic feet—thirty-three 10-foot x 10-foot x 10-foot cubes). Besides causing damage to creatures, the fireball ignites all combustible materials within its burst radius, and the heat of the fireball melts soft metals such as gold, copper, silver, etc. Exposed items require saving throws vs. magical fire to determine if they are affected, but items in the possession of a creature that rolls a successful saving throw are unaffected by the fireball.\n&emsp;The wizard points his finger and speaks the range (distance and height) at which the fireball is to burst. A streak flashes from the pointing digit and, unless it impacts upon a material body or solid barrier prior to attaining the prescribed range, blossoms into the fireball (an early impact results in an early detonation). Creatures failing their saving throws each suffer full damage from the blast. Those who roll successful saving throws manage to dodge, fall flat, or roll aside, each receiving half damage (the DM rolls the damage and each affected creature suffers either full damage or half damage [round fractions down], depending on whether the creature saved or not).'
};

wiz3['Flame Arrow'] = {
    'level': '3',
    'school': 'Conjuration/Summoning',
    'range': '[[30+10*[[@{level-wizard}]] ]] yards',
    'duration': '1 round',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': ' A drop of oil and a small piece of flint',
    'reference': 'p. 192',
    'book': 'PHB',
    'damage': '1 Fire damage or 1d6 Piercing + 4d6 Fire damage per bolt',
    'damage-type': 'piercing and fire',
    'healing': '',
    'effect': 'This spell has two effects. First, the wizard can cause normal arrows or crossbow bolts to become magical flaming missiles for one round. The missiles must be nocked and drawn (or cocked) at the completion of the spell. If they are not loosed within one round, they are consumed by the magic. For every five levels the caster has achieved, up to 10 arrows or bolts can be affected. (Currently [[floor([[@{level-wizard}]]/5)*10]] arrows or bolts). The arrows inflict normal damage, plus 1 point of fire damage to any target struck. They may also cause incendiary damage. This version of the spell is used most often in large battles.\n&emsp;The second version of this spell enables the caster to hurl fiery bolts at opponents within range. Each bolt inflicts 1d6 points of piercing damage, plus 4d6 points of fire damage. Only half the fire damage is inflicted if the creature struck successfully saves vs. spell. The caster receives one bolt for every five experience levels (two bolts at 10th level, three at 15th level, etc.)(Currently [[floor([[@{level-wizard}]]/5)]] bolts). Bolts must be used on creatures within 20 yards of each other and in front of the wizard.'
};

wiz3['Fly'] = {
    'level': '3',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] + 1d6 turns rolled by the DM',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A wing feather from any bird',
    'reference': 'p. 192',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to bestow the power of magical flight. The creature affected is able to move vertically and horizontally at a rate of 18 (half that if ascending, twice that if descending in a dive). The maneuverability class of the creature is B. Using the fly spell requires as much concentration as walking, so most spells can be cast while hovering or moving slowly (movement of 3). Possible combat penalties while flying are known to the DM (found in the “Aerial Combat” section of Chapter 9 of the DMG). The exact duration of the spell is always unknown to the spellcaster, as the variable addition is determined secretly by the DM.'
};

wiz3['Gust of Wind'] = {
    'level': '3',
    'school': 'Alteration',
    'range': '0',
    'duration': '1 round',
    'aoe': '10 feet x [[10*[[@{level-wizard}]] ]] yards',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A legume seed',
    'reference': 'p. 192',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, a strong puff of air originates from the wizard and moves in the direction he is facing. The force of this gust of wind (about 30 m.p.h.) is sufficient to extinguish candles, torches, and similar unprotected flames. It causes protected flames—such as those of lanterns—to dance wildly and has a 5% chance per level of experience of the spellcaster to extinguish even such lights. Currently [[5*[[@{level-wizard}]] ]]%. It also fans large fires outward 1d6 feet in the direction of the wind’s movement. It forces back small flying creatures 1d6 x 10 yards and causes man-sized beings to be held motionless if attempting to move against its force. It slows larger-than-man-sized flying creatures by 50% for one round. It blows over light objects, disperses most vapors, and forces away gaseous or unsecured levitating creatures. Its path is a constant 10 feet wide, by 10 yards long per level of experience of the caster (for example, an 8th-level wizard causes a gust of wind that travels 80 yards).'
};

wiz3['Haste'] = {
    'level': '3',
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
    'level': '3',
    'school': 'Enchantment/Charm',
    'range': '120 yards',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '1—4 persons, 20-foot cube',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': 'A small, straight piece of iron',
    'reference': 'p. 193',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell holds 1d4 humans, demihumans, or humanoid creatures rigidly immobile for five or more rounds.\n&emsp;The *hold person* spell affects any bipedal human, demihuman or humanoid of man size or smaller, including brownies, dryads, dwarves, elves, gnolls, gnomes, goblins, half-elves, halflings, half-orcs, hobgoblins, humans, kobolds, lizard men, nixies, orcs, pixies, sprites, troglodytes, and others.\n&emsp;The spell is centered on a point selected by the caster; it affects persons selected by the caster within the area of effect. If the spell is cast at three or four people, each gets an unmodified saving throw. If only two people are being enspelled, each makes his saving throw with a -1 penalty. If the spell is cast at only one person, the saving throw suffers a -3 penalty. Saving throws are adjusted for Wisdom. Those succeeding on their saving throws are unaffected by the spell. Undead creatures cannot be held.\n&emsp;Held beings cannot move or speak, but they remain aware of events around them and can use abilities not requiring motion or speech. Being held does not prevent the worsening of the subjects’ condition due to wounds, disease, or poison. The caster can end the spell with a single utterance at any time; otherwise, the duration is 10 rounds at 5th level, 12 rounds at 6th level, 14 rounds at 7th  level, etc.'
};

wiz3['Hold Undead'] = {
    'level': '3',
    'school': 'Necromancy',
    'range': '60 feet',
    'duration': '[[1d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '[[1d3]] undead',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'A pinch of sulphur and powdered garlic',
    'reference': 'p. 193',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast, this spell renders immobile 1d3 undead creatures whose total Hit Dice are equal to or less than the caster’s level. No more than three undead can be affected by a single spell. To cast, the wizard aims the spell at a point within range and the three undead closest to this are considered to be in the area of effect, provided all are within the field of vision and spell range of the caster. Undead of a mindless nature (skeletons, zombies, or ghouls) are automatically affected. Other forms of undead are allowed a saving throw to negate the effect. If the spell is successful, it renders the undead immobile for the duration of the spell.'
};

wiz3['Illusionary Script'] = {
    'level': '3',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] day',
    'aoe': 'Script reader',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'Special',
    'materials': 'A lead-based ink that requires special manufacture by an alchemist, at a cost of not less than 300 gp per usage',
    'reference': 'p. 193',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to write instructions or other information on parchment, paper, etc. The illusionary script appears to be some form of foreign or magical writing. Only the person (or people) who the wizard desires to read the writing can do so. An illusionist recognizes it for illusionary script.\n&emsp;Unauthorized creatures glancing at the script must roll saving throws vs. spell. A successful save means the creature can look away with only a mild sense of disorientation. Failure means the creature is subject to a suggestion implanted in the script by the caster at the time the *illusionary script* spell was cast. The suggestion cannot require more than three turns to carry out. The suggestion could be to close the book and leave, or to forget the existence of the book, for example. A successful dispel magic spell will remove the illusionary script, but an unsuccessful attempt erases all of the writing. The hidden writings can be read by a combination of the *true seeing* spell and either the *read magic* or *comprehend languages* spell, as applicable.'
};

wiz3['Infravision'] = {
    'level': '3',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[2+[[@{level-wizard}]] ]] hours',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Either a pinch of dried carrot or an agate',
    'reference': 'p. 193',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard enables the recipient to see in normal darkness up to 60 feet without light. Note that strong sources of light (fire, lanterns, torches, etc. tend to blind this vision, so infravision does not function efficiently in the presence of such light sources. Invisible creatures are not detectable by infravision.'
};

wiz3['Invisibility, 10\' Radius'] = {
    'level': '3',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'An eyelash and a bit of gum arabic, the former encased in the latter',
    'reference': 'p. 193',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell confers invisibility upon all creatures within 10 feet of the recipient. Gear carried and light sources are included, but any light emitted is still visible. The center of the effect is mobile with the recipient. Those affected by this spell cannot see each other. Any affected creature moving out of the area becomes visible, but creatures moving into the area after the spell is cast do not become invisible. Affected creatures (other than the recipient) that attack negate the invisibility only for themselves. If the spell recipient attacks, the *invisibility, 10’ radius* spell is broken for all.'
};

wiz3['Item'] = {
    'level': '3',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[ [[@{level-wizard}]]*4]] hours',
    'aoe': '[[ [[@{level-wizard}]]*2]] cubic feet',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 194',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to shrink one nonmagical item (if it is within the size limit) to 1/12 of its normal size. Optionally, the caster can also change its now-shrunken composition to a clothlike one. An object in the possession of another creature is allowed a saving throw vs. spell. Objects changed by an item spell can be returned to normal composition and size merely by tossing them onto any solid surface or by a word of command from the original spellcaster. Even a burning fire and its fuel can be shrunk by this spell.'
};

wiz3['Leomund\'s Tiny Hut'] = {
    'level': '3',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[4+[[@{level-wizard}]] ]] hours',
    'aoe': '15-foot-diameter sphere',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A small crystal bead that shatters when the spell duration expires or the hut is dispelled',
    'reference': 'p. 194',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard creates an unmoving, opaque sphere of force of any desired color around his person. Half of the sphere projects above the ground, and the lower hemisphere passes through the ground. Up to seven other man-sized creatures can fit into the field with its creator; they can freely pass into and out of the hut without harming it. However, if the spellcaster removes himself from the hut, the spell dissipates.\n&emsp;The temperature inside the hut is 70° F. (21° C), if the exterior temperature is between 0° and 100° F. (-17° to 38° C). An exterior temperature below 0° or above 100° lowers or raises, respectively, the interior temperature on a 1°-for-1° basis. The tiny hut also provides protection against the elements, such as rain, dust, sandstorms, and the like. The hut can withstand any wind of less than hurricane force without being harmed, but wind force greater than that destroys it.\n&emsp;The interior of the hut is a hemisphere; the spellcaster can illuminate it dimly upon command, or extinguish the light as desired. Note that although the force field is opaque from the outside, it is transparent from within. Missiles, weapons, and most spell effects can pass through the hut without affecting it, although the occupants cannot be seen from outside the hut. The hut can be dispelled.'
};

wiz3['Lightning Bolt'] = {
    'level': '3',
    'school': 'Evocation',
    'range': '[[40+10*[[@{level-wizard}]] ]] yards',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': '½',
    'materials': 'A bit of fur and an amber, crystal, or glass rod',
    'reference': 'p. 194',
    'book': 'PHB',
    'damage': '[[ [[{[[@{level-wizard}]],10}kl1]]d6]]',
    'damage-type': 'Electrical',
    'healing': '',
    'effect': 'Upon casting this spell, the wizard releases a powerful stroke of electrical energy that inflicts 1d6 points of damage per level of the spellcaster (maximum of 10d6) to each creature within its area of effect. A successful saving throw vs. spell reduces this damage to half (round fractions down). The bolt begins at a range and height decided by the caster and streaks outward in a direct line from the casting wizard (for example, if a 40-foot bolt was started at 180 feet from the wizard, the far end of the bolt would reach 220 feet (180 + 40). The lightning bolt may set fire to combustibles, sunder wooden doors, splinter up to a half-foot thickness of stone, and melt metals with a low melting point (lead, gold, copper, silver, bronze). Saving throws must be rolled for objects that withstand the full force of a stroke (see the *fireball* spell). If the damage caused to an interposing barrier shatters or breaks through it (i.e., the saving throw fails), the bolt continues. A bolt can breach 1 inch of wood or half an inch of stone per caster level, up to a maximum of 1 foot of wood or half a foot of stone.\n&emsp;The lightning bolt’s area of effect is chosen by the spellcaster: either a forked bolt 10 feet wide and 40 feet long or a single bolt 5 feet wide and 80 feet long. If a bolt cannot reach its full length, because of an unyielding barrier (such as a stone wall), the lightning bolt rebounds from the barrier toward its caster, ending only when it reaches its full length.\n&emsp;For example: An 80-foot-long stroke is begun at a range of 40 feet, but it hits a stone wall at 50 feet. The bolt travels 10 feet, hits the wall, and rebounds for 70 feet back toward its creator (who is only 50 feet from the wall, and so is caught in his own lightning bolt!).\n&emsp;The DM might allow reflecting bolts. When this type of lightning bolt strikes a solid surface, the bolt reflects from the surface at an angle equal to the angle of incidence (like light off a mirror). A creature crossed more than once by the bolt must roll a saving throw for every time it is crossed, but it still suffers either full damage (if one saving throw is missed) or half damage (if all saving throws are made).'
};

wiz3['Melf\'s Minute Meteors'] = {
    'level': '3',
    'school': 'Evocation, Alteration',
    'range': '[[70+10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '1 target/meteor',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'Nitre and sulphur formed into a bead by the addition of pine tar. The caster must also have a small hollow tube of minute proportion, fashioned from gold. The tube costs no less than 1,000 gp to construct, so fine is its workmahship and magical engraving, and it can be reused.',
    'reference': 'p. 194',
    'book': 'PHB',
    'damage': '1d4 per meteor + 1 splash within 3 feet',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'This spell enables the wizard to cast small globes of fire (one for each experience level he has attained. Currently [[@{level-wizard}]] meteors), each of which bursts into a 1-foot-diameter sphere upon impact, inflicting 1d4 points of damage to the creature struck. It can also ignite combustible materials (even solid planks). The meteors are treated as missiles hurled by the wizard with a +2 bonus to the attack rolls and with no penalty for range. Misses are treated as grenadelike missiles that inflict 1 point of damage to creatures within 3 feet.\n&emsp;The spell can be cast in either of two ways:\n&emsp;A) The wizard discharges five meteors every round (see the “Multiple Attacks and Initiative” section in Chapter 9: Combat). Note that this carries over into at least the following round.\n&emsp;B) The wizard discharges only one meteor per round. In addition to releasing the missile, the caster can perform other actions in the round, including spellcasting, melee, or device use. Spells requiring concentration force the wizard to forgo the rest of the missiles to maintain concentration. Also, if the wizard fails to maintain an exact mental count of the number of missiles he has remaining, he has involuntarily lost the remaining portion of the spell.\n&emsp;The spell ends when the caster has fired off as many meteors as he has experience levels, when he forgoes casting any still remaining, or when a successful *dispel magic* spell is thrown upon the caster.'
};

wiz3['Monster Summoning I'] = {
    'level': '3',
    'school': 'Conjuration/Summoning',
    'range': 'Special',
    'duration': '[[2+[[@{level-wizard}]] ]] rounds',
    'aoe': '30-yard radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A tiny bag and a small (not necessarily lit) candle',
    'reference': 'p. 195',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Within one round of casting this spell, the wizard magically conjures [[2d4]] 1st-level monsters (selected by the DM, from his 1st-level encounter tables). The monsters appear anywhere within the spell’s area of effect, as desired by the wizard. They attack the spell user’s opponents to the best of their ability until either he commands that the attacks cease, the spell duration expires, or the monsters are slain. These creatures do not check morale, but they vanish when slain. Note that if no opponent exists to fight, summoned monsters can, if the wizard can communicate with them and if they are physically able, perform other services for the summoning wizard.\n&emsp;In rare cases, adventurers have been known to disappear, summoned by powerful spellcasters using this spell. Those summoned recall all the details of their trip.'
};

wiz3['Nondetection'] = {
    'level': '3',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '1 creature or item',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A pinch of diamond dust worth 300 gp',
    'reference': 'p. 195',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell, the wizard makes the creature or object touched undetectable by divination spells such as *clairaudience*, *clairvoyance*, *locate object*, *ESP*, and detect spells. It also prevents location by such magical items as *crystal balls* and *ESP medallions*. It does not affect the *know alignment* spell or the ability of intelligent or high-level beings to detect invisible creatures. If a divination is attempted, the *nondetection* caster must roll a saving throw vs. spell. If this is successful, the divination fails.'
};

wiz3['Phantom Steed'] = {
    'level': '3',
    'school': 'Conjuration, Phantasm',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 195',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard creates a quasi-real, horselike creature. The steed can be ridden only by the wizard who created it, or by any person for whom the wizard specifically creates such a mount. A phantom steed has a black head and body, gray mane and tail, and smoke-colored, insubstantial hooves that make no sound. Its eyes are milky-colored. It does not fight, but all normal animals shun it and only monstrous ones will attack. The mount has an Armor Class of 2 and [[ [[@{level-wizard}]]+7]] hit points. If it loses all of its hit points, the phantom steed disappears. A phantom steed moves at a movement rate of [[ [[@{level-wizard}]]*4]], to a maximum movement rate of 48. It has what seems to be a saddle and a bit and bridle. It can bear its rider’s weight, plus up to [[ [[@{level-wizard}]]*10]] pounds.\n&emsp;These mounts gain certain powers according to the level of the wizard who created them:\n&emsp;8th Level: The ability to pass over sandy, muddy, or even swampy ground without difficulty.\n&emsp;10th Level: The ability to pass over water as if it were firm, dry ground.\n&emsp;12th Level: The ability to travel in the air as if it were firm land, so chasms and the like can be crossed without benefit of a bridge. Note, however, that the mount cannot casually take off and fly; the movement must be between points of similar altitude.\n&emsp;14th Level: The ability to perform as if it were a pegasus; it flies at a rate of 48 per round upon command.\n&emsp;Note that a mount’s abilities include those of lower levels; thus, a 12th-level mount has the 8th-, 10th-, and 12th-level abilities.'
};

wiz3['Protection from Evil, 10\' Radius'] = {
    'level': '3',
    'school': 'Abjuration (Reversible)',
    'range': 'Touch',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '10-foot radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'Powdered silver or iron',
    'reference': 'p. 195',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The globe of protection of this spell is identical in all respects to a *protection from evil* spell, except that it encompasses a much larger area and its duration is greater. The effect is centered on and moves with the creature touched. Any protected creature within the circle can break the warding against enchanted or summoned monsters by meleeing them. If a creature too large to fit into the area of effect is the recipient of the spell, the spell acts as a normal *protection from evil* spell for that creature only.\n&emsp;To complete this spell, the caster must trace a circle 20 feet in diameter using powdered silver. The material component for the reverse is powdered iron.'
};

wiz3['Protection From Normal Missiles'] = {
    'level': '3',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A piece of tortoise or turtle shell',
    'reference': 'p. 196',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard bestows total invulnerability to hurled and projected missiles such as arrows, axes, bolts, javelins, small stones, and spears. Furthermore, it causes a reduction of 1 from each die of damage (but no die inflicts less than 1 point of damage inflicted by large or magical missiles, such as ballista missiles, catapult stones, hurled boulders, and magical arrows, bolts, javelins, etc. Note, however, that this spell does not convey any protection from such magical attacks as fireballs, lightning bolts, or magic missiles.'
};

wiz3['Secret Page'] = {
    'level': '3',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Until dispelled',
    'aoe': '1 page, up to 2 foot square',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'Powdered herring scales and either will o’ wisp or boggart essense',
    'reference': 'p. 196',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast, a *secret page* spell alters the actual contents of a page so that they appear to be something entirely different. Thus, a map can be changed to become a treatise on burnishing ebony walking sticks. The text of a spell can be altered to show a ledger page or even another form of spell. *Confuse languages* and *explosive runes* spells may be cast upon the secret page, but a *comprehend languages* spell cannot reveal the secret page’s contents. The caster is able to reveal the original contents by speaking a command word, perusing the actual page, and then returning it to its secret page form. The caster can also remove the spell by double repetition of the command word. Others noting the dim magic of a page within this spell cloaking its true contents can attempt to dispel magic, but if it fails, the page is destroyed. A *true seeing* spell does not reveal the contents unless cast in combination with a *comprehend languages* spell. An *erase* spell can destroy the writing.'
};

wiz3['Sepia Snake Sigil'] = {
    'level': '3',
    'school': 'Conjuration/Summoning',
    'range': '5 yards',
    'duration': 'Special',
    'aoe': '1 sigil',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '100 gp worth of powdered amber, a scale from any snake, and a pinch of mushroom spores',
    'reference': 'p. 196',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, a small written symbol appears in the text of any written work. When read, the so-called sepia snake springs into being and strikes at the nearest living creature (but does not attack the wizard who cast the spell). Its attack is made as if it were a monster with Hit Dice equal to the level of the wizard who cast the spell. If it strikes successfully, the victim is engulfed in a shimmering amber field of force, frozen and immobilized until released, either at the caster’s command, by a successful *dispel magic* spell, or until a time equal to 1d4 days + 1 day per caster level has elapsed. Until then, nothing can get at the victim, move the shimmering force surrounding him, or otherwise affect him. The victim does not age, grow hungry, sleep, or regain spells while in this state. He is not aware of his surroundings. If the sepia snake misses its target, it dissipates in a flash of brown light, with a loud noise and a puff of dun-colored smoke that is 10 feet in diameter and lasts for one round.\n&emps;The spell cannot be detected by normal observation, and *detect magic* reveals only that the entire text is magical. A *dispel magic* can remove it; an *erase* spell destroys the entire page of text. It can be cast in combination with other spells that hide or garble text.'
};

wiz3['Slow'] = {
    'level': '3',
    'school': 'Alteration',
    'range': '[[90+10*[[@{level-wizard}]] ]] yards',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': '40-foot cube, [[@{level-wizard}]] creatures',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': 'A drop of molasses',
    'reference': 'p. 196',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *slow* spell causes affected creatures to move and attack at half their normal rates. It negates a *haste* spell or equivalent, but does not otherwise affect magically speeded or slowed creatures. Slowed creatures have an Armor Class penalty of +4 AC, an attack penalty of -4, and all Dexterity combat bonuses are negated. The magic affects a number of creatures equal to the spellcaster’s level, if they are within the area of effect chosen by the wizard (i.e., a 40-foot cubic volume centered as called for by the caster). The creatures are affected from the center of the spell outward. Saving throws against the spell suffer a -4 penalty.'
};

wiz3['Spectral Force'] = {
    'level': '3',
    'school': 'Illusion/Phantasm',
    'range': '[[60+[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '[[40+10*[[@{level-wizard}]]-foot cube',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 197',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *spectral force* spell creates an illusion in which sound, smell, and thermal illusions are included. It is otherwise similar to the *improved phantasmal force* spell. The spell lasts for three rounds after concentration ceases.'
};

wiz3['Suggestion'] = {
    'level': '3',
    'school': 'Enchantment/Charm',
    'range': '30 yards',
    'duration': '[[1+[[@{level-wizard}]] ]] hours',
    'aoe': '1 creature',
    'components': 'V, M',
    'cast-time': '3',
    'saving-throw': 'Negate',
    'materials': 'A snake’s tongue and either a bit of honeycomb or a drop of sweet oil',
    'reference': 'p. 197',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast by the wizard, he influences the actions of the chosen recipient by the utterance of a few words—phrases or a sentence or two—suggesting a course of action desirable to the spellcaster. The creature to be influenced must, of course, be able to understand the wizard’s suggestion—it must be spoken in a language that the spell recipient understands.\n&emsp;The suggestion must be worded in such a manner as to make the action sound reasonable; asking the creature to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act automatically negates the effect of the spell. However, a suggestion that a pool of acid was actually pure water and that a quick dip would be refreshing is another matter. Urging a red dragon to stop attacking the wizard’s party so that the dragon and party could jointly loot a rich treasure elsewhere is likewise a reasonable use of the spell’s power.\n&emsp;The course of action of a suggestion can continue in effect for a considerable duration, such as in the case of the red dragon mentioned above. Conditions that will trigger a special action can also be specified; if the condition is not met before the spell expires, the action will not be performed. If the target successfully rolls its saving throw, the spell has no effect. Note that a very reasonable suggestion causes the saving throw to be made with a penalty (such as -1, -2, etc.) at the discretion of the DM. Undead are not subject to suggestion.'
};

wiz3['Tongues'] = {
    'level': '3',
    'school': 'Alteration (Reversible)',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '30-foot radius',
    'components': 'V, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A small clay model of a ziggurat, which shatters when the spell is pronounced',
    'reference': 'p. 197',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to speak and understand additional languages, whether they are racial tongues or regional dialects. This does not enable the caster to speak with animals. The spell enables the caster to be understood by all creatures of that type within hearing distance, usually 60 feet. This spell does not predispose the subject toward the caster in any way.\n&emsp;The wizard can speak one additional tongue for every three levels of experience. Currently speak [[floor([[@{level-wizard}]]/3)]] additional tongues. The reverse of the spell cancels the effect of the *tongues* spell or confuses verbal communication of any sort within the area of effect.'
};

wiz3['Vampiric Touch'] = {
    'level': '3',
    'school': 'Necromancy',
    'range': '0',
    'duration': 'One touch',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 197',
    'book': 'PHB',
    'damage': '[[ [[{floor([[@{level-wizard}]]/2),6}kl1]]d6]]',
    'damage-type': '',
    'healing': 'Equal to damage',
    'effect': 'When the caster touches an opponent in melee with a successful attack roll, the opponent loses 1d6 hit points for every two caster levels, to a maximum drain of 6d6 points for a 12th-level caster. The spell is expended when a successful touch is made or one turn passes. The hit points are added to the caster’s total, with any hit points over the caster’s normal total treated as temporary additional hit points. Any damage to the caster is subtracted from the temporary hit points first. After one hour, any extra hit points above the caster’s normal total are lost. The creature originally losing hit points through this spell can regain them by magical or normal healing. Undead creatures are unaffected by this spell.'
};

wiz3['Water Breathing'] = {
    'level': '3',
    'school': 'Alteration (Reversible)',
    'range': 'Touch',
    'duration': '[[ [[@level-wizard}]]+1d4]] hours',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A short reed or piece of straw',
    'reference': 'p. 197',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The recipient of a *water breathing* spell is able to breathe water freely for the duration of the spell. The caster can touch more than one creature with a single casting; in this case the duration is divided by the number of creatures touched. The reverse, *air breathing* enables water-breathing creatures to comfortably survive in the atmosphere for an equal duration.'
};


wiz3['Wind Wall'] = {
    'level': '3',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@level-wizard}]] rounds',
    'aoe': 'wall, [[10*[[@{level-wizard}]] ]] x [[5*[[@{level-wizard}]] ]] feet x 2 feet wide',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Special',
    'materials': 'A tiny fan and a feather of exotic origin',
    'reference': 'p. 198',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell brings forth an invisible vertical curtain of wind 2 feet thick and of considerable strength—a strong breeze sufficient to blow away any bird smaller than an eagle or tear papers and like materials from unsuspecting hands. (If in doubt, a saving throw vs. spell determines whether the subject maintains its grasp.) Normal insects cannot pass such a barrier. Loose materials, even cloth garments, fly upward when caught in a wind wall. Arrows and bolts are deflected upward and miss, while sling stones and other missiles under two pounds in weight receive a –4 penalty to a first shot and –2 penalties thereafter. Gases, most breath weapons, and creatures in gaseous form cannot pass this wall, although it is no barrier to noncorporeal creatures.'
};

wiz3['Wraithform'] = {
    'level': '3',
    'school': 'Alteration, Illusion',
    'range': '0',
    'duration': '[[2*[[@level-wizard}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A bit of gauze and a wisp of smoke',
    'reference': 'p. 198',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard and all of his gear become insubstantial. The caster is subject only to magical or special attacks, including those by weapons of +1 or better, or by creatures otherwise able to affect those struck only by magical weapons. Undead of most sorts will ignore an individual in wraithform, believing him to be a wraith or spectre, though a lich or special undead may save vs. spell with a –4 penalty to recognize the spell.\n&emsp;The wizard can pass through small holes or narrow openings, even mere cracks, with all he wears or holds in his hands, as long as the spell persists. Note, however, that the caster cannot fly without additional magic. No form of attack is possible when in wraithform, except against creatures that exist on the Ethereal Plane, where all attacks (both ways) are normal. A successful *dispel magic* spell forces the wizard in wraithform back to normal form. The spellcaster can end the spell with a single word.'
};

const wiz4 = {};
wiz4['Charm Monster'] = {
    'level': '4',
    'school': 'Enchantment/Charm',
    'range': '60 yards',
    'duration': 'Special',
    'aoe': '1 or more creatures in 20-foot radius',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 198',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to a *charm person* spell, but it can affect any living creature—or several low-level creatures. The spell affects [[2d4]] Hit Dice or levels of creatures, although it only affects one creature of 4 or more Hit Dice or levels, regardless of the number rolled.\n&emsp;All possible subjects receive saving throws vs. spell, adjusted for Wisdom. Any damage inflicted by the caster or his allies in the round of casting grants the wounded creature another saving throw at a bonus of +1 per point of damage received. Any affected creature regards the spellcaster as friendly, an ally or companion to be treated well or guarded from harm. If communication is possible, the charmed creature follows reasonable requests, instructions, or orders most faithfully (see the *suggestion* spell). If communication is not possible, the creature does not harm the caster, but others in the vicinity may be subject to its intentions, hostile or otherwise. Any overtly hostile act by the caster breaks the spell, or at the very least allows a new saving throw against the charm. Affected creatures eventually come out from under the influence of the spell. This is a function of the creature’s level (i.e., its Hit Dice).}}{{style=center2 sheet-spell-bottom2}}{{c1-1=**Monster Level**\n**or Hit Dice**}}{{c2-1=1st or up to 2}}{{c3-1=2nd or up to 3+2}}{{c4-1=3rd or up to 4+4}}{{c5-1=4th or up to 6}}{{c6-1=5th or up to 7+2}}{{c7-1=6th or up to 8+4}}{{c8-1=7th or up to 10}}{{c9-1=8th or up to 12}}{{c10-1=9th or over 12}}{{c1-2=**% Chance Per Week**\n**of Breaking Spell**}}{{c2-2=5%}}{{c3-2=10%}}{{c4-2=15%}}{{c5-2=25%}}{{c6-2=35%}}{{c7-2=45%}}{{c8-2=60%}}{{c9-2=75%}}{{c10-2=90%}}{{effects2=&emsp;The exact day of the week and time of day is secretly determined by the DM.',
};


wiz4['Confusion'] = {
    'level': '4',
    'school': 'Enchantment/Charm',
    'range': '120 yards',
    'duration': '[[2+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Up to 60-foot cube',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': 'A set of three nut shells',
    'reference': 'p. 198',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes confusion in one or more creatures within the area, creating indecision and the inability to take effective action. The spell affects [[1d4+[[@{level-wizard}]] ]] creatures. These creatures are allowed saving throws vs. spell with -2 penalties, adjusted for Wisdom. Those successfully saving are unaffected by the spell. Confused creatures react as described in the table below.\n&emsp;The spell lasts for two rounds plus one round for each level of the caster. Those who fail are checked by the DM for actions each round for the duration of the spell, or until the “wander away for the duration of the spell” result occurs.\n&emsp;Wandering creatures move as far from the caster as possible, according to their most typical mode of movement (characters walk, fish swim, bats fly, etc.). Saving throws and actions are checked at the beginning of each round. Any confused creature that is attacked perceives the attacker as an enemy and acts according to its basic nature.\n&emsp;If there are many creatures involved, the DM may decide to assume average results. For example, if there are 16 orcs affected and 25% could be expected to make the saving throw, then four are assumed to have succeeded. Out of the other 12, one wanders away, four attack the nearest creature, six stand confused, and the last acts normally but must check next round. Since the orcs are not near the party, the DM decides that two attacking the nearest creature attack each other, one attacks an orc that saved, and one attacks a confused orc, which strikes back. The next round, the base is 11 orcs, since four originally saved and one wandered off. Another one wanders off, five stand confused, four attack, and one acts normally.}}{{style=center1}}{{c1-1=**D10 Roll**}}{{c2-1=1}}{{c3-1=2-6}}{{c4-1=7-9}}{{c5-1=10}}{{cc1-2=bottom}}{{c1-2=**Action**}}{{c2-2=Wander away (unless prevented) for duration of spell}}{{c3-2=Stand confused for one round (then roll again)}}{{c4-2=Attack nearest creature for one round (then roll again)}}{{c5-2=Act normally for one round (then roll again)',
};

wiz4['Contagion'] = {
    'level': '4',
    'school': 'Necromancy',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 199',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes a major disease and weakness in a creature. The afflicted individual is immediately stricken with painful and distracting symptoms: boils, blotches, lesions, seeping abscesses, and so on. Strength, Dexterity, and Charisma are reduced by 2. Attack rolls are decreased by 2. The effect persists until the character receives a *cure disease* spell or spends [[1d3]] weeks taking a complete rest to recover. Characters ignoring the contagion for more than a day or so may be susceptible to worse diseases at the discretion of the DM.'
};

wiz4['Detect Scrying'] = {
    'level': '4',
    'school': 'Divination',
    'range': '0',
    'duration': '[[1d6+[[@{level-wizard}]] ]] turns',
    'aoe': '120-foot radius',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'Special',
    'materials': 'A small piece of mirror and a miniature brass hearing trumpet.',
    'reference': 'p. 199',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard immediately becomes aware of any attempt to observe him by means of clairvoyance, clairaudience, or magic mirror. This also reveals the use of crystal balls or other magical scrying devices, provided the attempt is within the area of effect of the spell. Since the spell is centered on the spellcaster, it moves with him, enabling him to ”sweep” areas for the duration of the spell.\n&emsp;When a scrying attempt is detected, the scryer must immediately roll a saving throw. If this is failed, the identity and general location of the scryer immediately become known to the wizard who cast this spell. The general location is a direction and significant landmark close to the scryer. Thus, the caster might learn, “The wizard Sniggel spies on us from east, under the stairs,” or, “You are watched by Asquil in the city of Samarquol.”',
};

wiz4['Dig'] = {
    'level': '4',
    'school': 'Evocation',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[5*[[@{level-wizard}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': 'A miniature shovel and tiny bucket and must continue to hold them while each pit is excavated. These items disappear at the conclusion of the spell.',
    'reference': 'p. 199',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *dig* spell enables the caster to excavate 125 cubic feet of earth, sand, or mud per round (i.e., a cubic hole 5 feet on a side). In later rounds the caster can expand an existing hole or start a new one. The material thrown from the excavation scatters evenly around the pit. If the wizard continues downward past 20 feet in earth, there is a 15% chance that the pit collapses. This check is made for every 5 feet dug beyond 20 feet. Sand tends to collapse after 10 feet, mud fills in and collapses after 5 feet, and quicksand fills in as rapidly as it is dug.\n&emsp;Any creature at the edge (within 1 foot) of a pit must roll a successful Dexterity check or fall into the hole. Creatures moving rapidly toward a pit dug immediately before them must roll a saving throw vs. spell to avoid falling in. Any creature in a pit being excavated can climb out at a rate decided by the DM. A creature caught in a collapsing pit must roll a saving throw vs. death to avoid being buried; it escapes the pit if successful. Tunneling is possible with this spell as long as there is space available for the material removed. Chances for collapse are doubled and the safe tunneling distance is half of the safe excavation depth, unless such construction is most carefully braced and supported.\n&emsp;The spell is also effective against creatures of earth and rock, particularly clay golems and those from the Elemental Plane of Earth. When cast upon such a creature, it suffers 4d6 points of damage. A successful saving throw vs. spell reduces this damage to half.'
};

wiz4['Dimension Door'] = {
    'level': '4',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'The caster',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 199',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of a *dimension door* spell, the wizard instantly transfers himself up to 30 yards distance per level of experience. Currently [[30*[[@{level-wizard}]] ]] yards. This special form of teleportation allows for no error, and the wizard always arrives at exactly the spot desired—whether by simply visualizing the area (within spell transfer distance, of course) or by stating direction such as, “300 yards straight downward,” or, “upward to the north-west, 45 degree angle, 420 yards.” If the wizard arrives in a place that is already occupied by a solid body, he remains trapped in the Astral Plane. If distances are stated and the spellcaster arrives with no support below his feet (i.e., in mid-air), falling and damage result unless further magical means are employed. All that the wizard wears or carries, subject to a maximum weight equal to 500 pounds of nonliving matter, or half that amount of living matter, is transferred with the spellcaster. Recovery from use of a *dimension door* spell requires one round.'
};

wiz4['Emotion'] = {
    'level': '4',
    'school': 'Enchantment/Charm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '20-foot cube',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 200',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard can create a single emotional reaction in the subject creatures. The following are typical:\n&emsp;1. *Courage:* This emotion causes the creatures affected to become berserk, fighting with a +1 bonus to the attack dice, causing +3 points of damage, and temporarily gaining 5 hit points. The recipients fight without shield and regardless of life, never checking morale. This spell counters (and is countered by) *fear.*\n&emsp;2. *Fear:* The affected creatures flee in panic for [[2d4]] rounds. It counters (and is countered by) *courage.*\n&emsp;3. *Friendship:* The affected creatures react more positively (for example, tolerance becomes goodwill). It counters (and is countered by) *hate.*\n&emsp;4. *Happiness:* This effect creates joy and a feeling of complacent well-being, adding +4 to all reaction rolls and making attack unlikely unless the creatures are subject to extreme provocation. It counters (and is countered by) *sadness.*\n&emsp;5. *Hate:* The affected creatures react more negatively (for example, tolerance becomes negative neutrality). It counters (and is countered by) *friendship.*\n&emsp;6. *Hope:* The effect of hope is to raise morale, saving throw rolls, attack rolls, and damage caused by +2. It counters (and is countered by) *hopelessness.*\n&emsp;7. *Hopelessness:* The affected creatures submit to the demands of any opponent: surrender, get out, etc. Otherwise, the creatures are 25% likely to do nothing in a round, and 25% likely to turn back or retreat. It counters (and is countered by) *hope.*\n&emsp;8. *Sadness:* This creates unhappiness and a tendency toward maudlin introspection. This emotion penalizes surprise rolls by –1 and adds +1 to initiative rolls. It counters (and is countered by) *happiness.*\n&emsp;All creatures in the area at the instant the spell is cast are affected unless successful saving throws vs. spell are made, adjusted for Wisdom. The spell lasts as long as the wizard continues to concentrate on projecting the chosen emotion. Those who fail the saving throw against fear must roll a new saving throw if they return to the affected area.'
};

wiz4['Enchanted Weapon'] = {
    'level': '4',
    'school': 'Enchantment',
    'range': 'Touch',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Weapon(s) touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'Powdered lime and carbon',
    'reference': 'p. 200',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell turns an ordinary weapon into a magical one. The weapon is the equivalent of a +1 weapon, with +1 to attack and damage rolls. Thus, arrows, axes, bolts, bows, daggers, hammers, maces,  spears,  swords,  etc.,  can  be  made  into  temporarily enchanted weapons. Two small weapons (arrows, bolts, daggers, etc.) or one large weapon (axe, bow, hammer, mace, etc.) weapon can be affected by the spell. The spell functions on existing magical weapons as long as the total combined bonus is +3 or less.\n&emsp;Missile weapons enchanted in this way lose their enchantment when they successfully hit a target, but otherwise the spell lasts its full duration. This spell is often used in combination with the *enchant an item* and *permanency* spells to create magical weapons, with this spell being cast once per desired plus of the bonus.'
};

wiz4['Enervation'] = {
    'level': '4',
    'school': 'Necromancy',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[1d4+[[@{level-wizard}}]] ]] hours',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 200',
    'book': 'PHB',
    'damage': '[[floor([[@{level-wizard}]]/4)]]',
    'damage-type': 'energy levels drained',
    'healing': '',
    'effect': 'This spell temporarily suppresses the subject’s life force. The necromancer points his finger and utters the incantation, releasing a black bolt of crackling energy. The subject must roll a saving throw vs. spell, adjusted for Dexterity, to avoid the bolt. Success means the spell has no effect. Failure means the subject is treated exactly as if he had been drained of energy levels by a wight, one level for every four levels of the caster. Hit Dice, spells, and other character details dependent on level are lost or reduced. Those drained to 0th level must make a system shock check to survive and are helpless until the spell expires. The spell effect eventually wears off, either after 1d4 hours plus one hour per caster level, or after six hours of complete and undisturbed rest. Level abilities are regained, but lost spells must be rememorized. Undead are immune to this spell.'
};

wiz4['Evard\'s Black Tentacles'] = {
    'level': '4',
    'school': 'Conjuration/Summoning',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[30*[[@{level-wizard}]] ]] square feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A piece of tentacle from a giant octopus or giant squid',
    'reference': 'p. 200',
    'book': 'PHB',
    'damage': '1d4 / 2d4 / 3d4',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates many rubbery, black tentacles in the area of effect. These waving members seem to spring forth from the earth, floor, or whatever surface is underfoot—including water. Each tentacle is 10 feet long, AC 4, and requires [[@{level-wizard}]] points of damage to destroy. There are [[1d4+[[@{level-wizard}]] ]] such tentacles.\n&emsp;Any creature within range of the writhing tentacles is subject to attack as determined by the DM. The target of a tentacle attack must roll a saving throw vs. spell. If this succeeds, the subject suffers 1d4 points of damage from contact with the tentacle; the tentacle is then destroyed. Failure to save indicates that the damage inflicted is 2d4 points, the ebon member is wrapped around its subject, and damage will be 3d4 points on the second and all succeeding rounds. Since these tentacles have no intelligence to guide them, there is the possibility that they entwine any object—a tree, post, pillar, even the wizard himself—or continue to squeeze a dead opponent. A grasping hold established by a tentacle remains until the tentacle is destroyed by some form of attack or until it disappears at the end of the spell’s duration.'
};

wiz4['Extension I'] = {
    'level': '4',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 201',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By use of an *extension I* spell, the wizard prolongs the duration of a previously cast 1st-, 2nd-, or 3rd-level spell by 50%. Thus, a *levitation* spell can be made to function 15 minutes/level, a *hold person* spell made to work for three rounds/level, etc. Naturally, the spell affects only spells that have durations. This spell must be cast immediately after the spell to be extended, either by the original caster or another wizard. If a complete round or more elapses, the extension fails and is wasted.'
};

wiz4['Fear'] = {
    'level': '4',
    'school': 'Illusion/Phantasm',
    'range': '0',
    'duration': 'Special',
    'aoe': '60-foot cone, 30-foot diameter at end, 5-foot at base',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'Either the heart of a hen or a white feather',
    'reference': 'p. 201',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *fear* spell is cast, the wizard sends forth an invisible cone of terror that causes creatures within its area of effect to turn away from the caster and flee in panic. Affected creatures are likely to drop whatever they are holding when struck by the spell; the base chance of this is 60% at 1st level (or at 1 Hit Die), and each level (or Hit Die) above this reduces the probability by 5%. Thus, at 10th level there is only a 15% chance, and at 13th level no chance, of dropping items. Creatures affected by fear flee at their fastest rate for [[@{level-wizard}}]] melee rounds. Undead and creatures that successfully roll their saving throws vs. spell are not affected.'
};

wiz4['Fire Charm'] = {
    'level': '4',
    'school': 'Enchantment/Charm',
    'range': '10 yards',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': '15-foot radius',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A small piece of multicolored silk of exceptional thinness that the spellcaster must throw into the fire source.',
    'reference': 'p. 201',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell the wizard causes a normal fire source, such as a brazier, flambeau, or bonfire, to serve as a magical agent, for from this source he causes a gossamer veil of multihued flame to encircle the fire at a distance of 5 feet. Any creatures observing the fire or the dancing circle of flame around it must successfully roll a saving throw vs. spell or be charmed into remaining motionless and gazing, transfixed, at the flames. While so charmed, creatures are subject to suggestions of 12 or fewer words, saving vs. spell with a –3 penalty, adjusted for Wisdom. The caster can give one such suggestion to each creature, and the suggestions need not be the same. The maximum duration for such a suggestion is one hour, regardless of the caster’s level.\n&emsp;The fire charm is broken if the charmed creature is physically attacked, if a solid object comes between the creature and the veil of flames so as to obstruct vision, or when the duration of the spell expires. Those exposed to the fire charm again may be affected at the DM’s option, although bonuses may also be allowed to the saving throws. Note that the veil of flame is not a magical fire, and passing through it incurs the same damage as would be sustained from passing through its original fire source.'
};

// start her
wiz4['Fire Shield'] = {
    'level': '4',
    'school': 'Evocation, Alteration',
    'range': '0',
    'duration': '[[2+[[@{level-wizard]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '*Warm shield:* A bit of phosphorous\n*Chill shield:*A live firefly or glow worm or the tail portions of four dead ones',
    'reference': 'p. 201',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can be cast in one of two forms: a warm shield that protects against cold-based attacks, or a chill shield that protects against fire-based attacks. Both return damage to creatures making physical attacks against the wizard. The wizard must choose which variation he memorizes when the spell is selected.\n&emsp;When casting this spell, the wizard appears to immolate himself, but the flames are thin and wispy, shedding no heat, and giving light equal to only half the illumination of a normal torch. The color of the flames is determined randomly (50% chance of either color)—blue or green if the chill shield is cast, violet or blue if the warm shield is employed. The special powers of each shield are as follows:\n&emsp;A) *Warm shield.* The flames are warm to the touch. Any cold-based attacks are saved against with a +2 bonus; either half normal damage or no damage is sustained. There is no bonus against fire-based attacks, but if the wizard fails to make the required saving throw (if any) against them, he sustains double normal damage.\n&emsp;B) *Chill shield.* The flames are cool to the touch. Any fire-based attacks are saved against with a +2 bonus; either half normal damage or no damage is sustained. There is no bonus against cold-based attacks, but if the wizard fails to make the required saving throw (if any) against them, he sustains double normal damage.\n&emsp;Any creature striking the spellcaster with its body or hand-held weapons inflicts normal damage upon the wizard, but the attacker suffers the same amount of damage. An attacker’s magical resistance, if any, is tested when the creature actually strikes the wizard. Successful resistance shatters the spell. Failure means the creature’s magic resistance does not affect that casting of the spell.'
};

wiz4['Fire Trap'] = {
    'level': '4',
    'school': 'Abjuration, Evocation',
    'range': 'Touch',
    'duration': 'Until discharged',
    'aoe': 'Object touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': '½',
    'materials': 'To place this spell, the caster must trace the outline of the closure with a bit of sulphur or saltpeter and touch the center of the effect. Attunement to another individual requires a hair or similar object from that person.',
    'reference': 'p. 201',
    'book': 'PHB',
    'damage': '1d4+[[@{level-wizard}]]',
    'damage-type': 'fire',
    'healing': '',
    'effect': 'Any closeable item (book, box, bottle, chest, coffer, coffin, door, drawer, and so forth) can be warded by a *fire trap* spell. The spell is centered on a point selected by the spellcaster. The item so trapped cannot have a second closure or warding spell placed upon it (if such is attempted, the chance is 25% that the first spell fails, 25% that the second spell fails, or 50% that both spells fail). A *knock* spell does not affect a fire trap in any way—as soon as the offending party enters or touches the item, the trap discharges. Thieves and others have only half their normal chance to detect a fire trap (by noticing the characteristic markings required to cast the spell). They have only half their normal chance to remove the trap (failure detonates the trap immediately). An unsuccessful dispel does not detonate the spell. The caster can use the trapped object without discharging it, as can any individual to whom the spell was specifically attuned when cast (the exact method usually involves a keyword). When the trap is discharged, there is an explosion of 5-foot radius from the spell’s center; all creatures within this area must roll saving throws vs. spell. Damage is 1d4 points plus 1 point per level of the caster, or half (round up) for creatures successfully saving. (Under water, this ward inflicts half damage and creates a large cloud of steam.) The item trapped is not harmed by this explosion.'
};

wiz4['Fumble'] = {
    'level': '4',
    'school': 'Enchantment/Charm',
    'range': '[[10*[[@{level-wizard}]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '30-foot cube',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': 'A dab of solidified milk fat',
    'reference': 'p. 202',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *fumble* spell is cast, the wizard creates an area in which all creatures suddenly become clumsy and awkward. Running creatures trip and fall, those reaching for an item drop it, those employing weapons likewise awkwardly drop them, etc. Recovery from a fall or picking up a fumbled object typically requires a successful saving throw and takes one round. Note that breakable items might suffer damage when dropped. A subject succeeding with his saving throw can act freely that round, but if he is in the area at the beginning of the next round, another saving throw is required. Alternatively, the spell can be cast at an individual creature. Failure to save means the creature is affected for the spell’s entire duration; success means the creature is slowed (see the 3rd-level spell).'
};

wiz4['Hallucinatory Terrain'] = {
    'level': '4',
    'school': 'Illusion/Phantasm',
    'range': '[[20*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[10*[[@{level-wizard}]] ]] yards cube',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A stone, a twig, and a bit of green plant—a leaf or grass blade',
    'reference': 'p. 202',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard causes an illusion that hides the actual terrain within the area of effect. Thus, open fields or a road can be made to look like a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to look like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road. The hallucinatory terrain persists until a *dispel magic* spell is cast upon the area or until the duration expires. Individual creatures may see through the illusion, but the illusion persists, affecting others who observe the scene.\n&emsp;If the illusion involves only a subtle change, such as causing an open wood to appear thick and dark, or increasing the slope of a hill, the effect may be unnoticed even by those in the midst of it. If the change is extreme (for example, a grassy plain covering a seething field of volcanic mudpots), the illusion will no doubt be noticed the instant one person falls prey to it. Each level of experience expands the dimensions of the cubic area affected by 10 yards; for example, a 12th-level caster affects an area 120 yds. × 120 yds. × 120 yds.'
};

wiz4['Ice Storm'] = {
    'level': '4',
    'school': 'Evocation',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '20 or 40 foot radius',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A pinch of dust and a few drops of water',
    'reference': 'p. 202',
    'book': 'PHB',
    'damage': '[[3d10]] or none',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can have one of two effects, at the caster’s option: Either great hail stones pound down for one round in a 40-foot-diameter area and inflict 3d10 points of damage to any creatures within the area of effect, or driving sleet falls in an 80-foot-diameter area for [[@{level-wizard}]] rounds. The sleet blinds creatures within its area for the duration of the spell and causes the ground in the area to be icy, slowing movement by 50% and making it 50% probable that a creature trying to move in the area slips and falls. The sleet also extinguishes torches and small fires.\n&emsp;Note that this spell will negate a *heat metal* spell.'
};

wiz4['Illusionary Wall'] = {
    'level': '4',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '1 × 10 × 10 feet',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A rare dust that costs at least 400 gp and requires four days to prepare',
    'reference': 'p. 202',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates the illusion of a wall, floor, ceiling, or similar surface, which is permanent until dispelled. It appears absolutely real when viewed (even magically, as with the priest spell *true seeing* or its equivalent), but physical objects can pass through it without difficulty. When the spell is used to hide pits, traps, or normal doors, normal demihuman and magical detection abilities work normally, and touch or probing searches reveal the true nature of the surface, though they do not cause the illusion to disappear.'
};

wiz4['Improved Invisibility'] = {
    'level': '4',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': '[[4+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Creature touched',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 203',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to the *invisibility* spell, but the recipient is able to attack, either by missile discharge, melee combat, or spellcasting, and remain unseen. Note, however, that telltale traces (such as a shimmering effect) sometimes allow an observant opponent to attack the invisible spell recipient. These traces are only noticeable when specifically looked for (after the invisible character has made his presence known). Attacks against the invisible character suffer –4 penalties to the attack rolls, and the invisible character’s saving throws are made with a +4 bonus. Beings with high Hit Dice that might normally notice invisible opponents will notice a creature under this spell as if they had 2 fewer Hit Dice (they roll saving throws vs. spell; success indicates they spot the character).'
};

wiz4['Leomund\'s Secure Shelter'] = {
    'level': '4',
    'school': 'Alteration, Enchantment',
    'range': '20 yards',
    'duration': '[[1d4+1+[[@{level-wizard}]] ]] hours',
    'aoe': '[[30*[[@{level-wizard}]] ]] square feet',
    'components': 'V, S, M',
    'cast-time': '4 turns',
    'saving-throw': 'None',
    'materials': 'A square chip of stone, crushed lime, a few grains of sand, a sprinkling of water, and several splinters of wood, augmented by the components of the *alarm* and *unseen servant* spells if these benefits are to be included (string and silver wire and a small bell)',
    'reference': 'p. 203',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to magically call into being a sturdy cottage or lodge, made of material that is common in the area where the spell is cast—stone, timber, or (at worst) sod. The floor area of the lodging is [[30*[[@{level-wizard}]] ]] square feet, and the surface is level, clean, and dry. In all respects the lodging resembles a normal cottage, with a sturdy door, two or more shuttered windows, and a small fireplace.\n&emsp;While the lodging is secure against winds of up to 70 miles per hour, it has no heating or cooling source (other than natural insulation qualities). Therefore, it must be heated as a normal dwelling, and extreme heat adversely affects it and its occupants. The dwelling does, however, provide considerable security otherwise, as it is as strong as a normal stone building, regardless of its material composition. The dwelling resists flames and fire as if it were stone, and is impervious to normal missiles (but not the sort cast by siege machinery or giants).\n&emsp;The door, shutters, and even chimney are secure against intrusion, the former two being wizard locked and the latter being secured by a top grate of iron and a narrow flue. In addition, these three areas are protected by an *alarm* spell. Lastly, an unseen servant is conjured to provide service to the spellcaster.\n&emsp;The inside of the shelter contains rude furnishings as desired by the spellcaster—up to eight bunks, a trestle table and benches, as many as four chairs or eight stools, and a writing desk.'
};

wiz4['Magic Mirror'] = {
    'level': '4',
    'school': 'Enchantment, Divination',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 hr.',
    'saving-throw': 'None',
    'materials': 'A mirror of finely wrought and highly polished silver costing not less than 1,000 gp, the eye of a hawk, an eagle, or even a roc, and nitric acid, copper, and zinc',
    'reference': 'p. 203',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard changes a normal mirror into a scrying device similar to a crystal ball. The details of the use of such a scrying device are found in the *DMG* (in Appendix 3: Magical Item Descriptions, under the description for the *crystal ball*).\n&emsp;The mirror used is not harmed by casting the spell, but the other material components are used up.\n&emsp;The following spells can be cast through a magic mirror: *comprehend languages, read magic, tongues,* and *infravision.* The following spells have a [[5*[[@{level-wizard}]] ]]% chance of operating correctly: *detect magic, detect good or evil,* and *message.* The base chances for the subject to detect any *crystal ball*-like spell are listed in the *DMG* (again, in Appendix 3: Magical Item Descriptions, under the description for the *crystal ball*).'
};

wiz4['Massmorph'] = {
    'level': '4',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '[[10*[[@{level-wizard}]] ]] foot cube',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A handful of bark chips from the type of tree the creatures are to become',
    'reference': 'p. 203',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast upon willing creatures of man-size or smaller, up to [[10*[[@{level-wizard}]] ]] such creatures can be magically altered to appear as trees of any sort. Thus, a company of creatures can be made to appear as a copse, grove, or orchard. Furthermore, these massmorphed creatures can be passed through and even touched by other creatures without revealing their true nature. Note, however, that blows to the creature-trees cause damage, and blood can be seen.\n&emsp;Creatures to be massmorphed must be within the spell’s area of effect; unwilling creatures are not affected. Affected creatures remain unmoving but aware, subject to normal sleep requirements, and able to see, hear, and feel for as long as the spell is in effect. The spell persists until the caster commands it to cease or until a *dispel magic* spell is cast upon the creatures. Creatures left in this state for extended periods are subject to insects, weather, disease, fire, and other natural hazards.'
};

wiz4['Minor Creation'] = {
    'level': '4',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[@{level-wizard}]] cubic feet',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A tiny piece of matter of the same type of item he plans to create by means of the *minor creation* spell—a bit of twisted hemp to create rope, a splinter of wood to create a door, and so forth',
    'reference': 'p. 203',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to create an item of nonliving, vegetable nature—soft goods, rope, wood, etc. The caster actually pulls wisps of material of the plane of Shadow from the air and weaves them into the desired item. The volume of the item created cannot exceed [[@{level-wizard}]] cubic feet. The item remains in existence for only as long as the spell’s duration.'
};

wiz4['Minor Globe of Invulnerability'] = {
    'level': '4',
    'school': 'Abjuration',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '5-foot radius',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A glass or crystal bead that shatters at the expiration of the spell',
    'reference': 'p. 204',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates an immobile, faintly shimmering magical sphere around the caster that prevents any 1st-, 2nd-, or 3rd-level spell effects from penetrating (i.e., the area of effect of any such spells does not include the area of the minor globe of invulnerability). This includes innate abilities and effects from devices. However, any type of spell can be cast out of the magical globe, and these pass from the caster of the globe to their subject without affecting the globe. Fourth and higher level spells are not affected by the globe. The globe can be brought down by a successful *dispel magic* spell. The caster can leave and return to the globe without penalty. Note that spell effects are not actually disrupted by the globe unless cast directly through or into it: The caster would still see a mirror image created by a wizard outside the globe. If that wizard then entered the globe, the images would wink out, to reappear when the wizard exited the globe. Likewise, a wizard standing in the area of a *light* spell would still receive sufficient light for vision, even though that part of the *light* spell volume in the globe would not be luminous.'
};

wiz4['Monster Summoning II'] = {
    'level': '4',
    'school': 'Conjuration/Summoning',
    'range': 'Special',
    'duration': '[[3+[[@{[level-wizard}]] ]] rounds',
    'aoe': '40 yard radius',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A tiny bag and a small (not necessarily lit) candle',
    'reference': 'p. 204',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is much like the 3rd-level spell *monster summoning I,* except that this spell summons [[1d6]] 2nd-level monsters. These appear anywhere within the spell’s area of effect and attack the caster’s opponents, until he commands them to cease, the spell duration expires, or the monsters are slain. These creatures do not check morale; they vanish when slain. If no opponent exists to fight and the wizard can communicate with them, the summoned monsters can perform other services for the summoning wizard.'
};

wiz4['Otiluke\'s Resilient Sphere'] = {
    'level': '4',
    'school': 'Alteration, Evocation',
    'range': '20 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[@{level-wizard}]]-foot diameter',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A hemispherical piece of diamond (or similar hard, clear gem material) and a matching hemispherical piece of gum arabic',
    'reference': 'p. 204',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the result is a globe of shimmering force that encloses the subject creature—if it is small enough to fit within the diameter of the sphere and it fails to successfully save vs. spell. The resilient sphere contains its subject for the spell’s duration, and it is not subject to damage of any sort except from a *rod of cancellation,* a *wand of negation,* or a *disintegrate* or *dispel magic* spell. These cause it to be destroyed without harm to the subject. Nothing can pass through the sphere, inside or out, though the subject can breathe normally. The subject may struggle, but all that occurs is a movement of the sphere. The globe can be physically moved either by people outside the globe or by the struggles of those within.'
};

wiz4['Phantasmal Killer'] = {
    'level': '4',
    'school': 'Illusion/Phantasm',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 205',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard creates the illusion of the most fearsome thing imaginable to the victim, simply by forming the fears of the victim’s subconscious mind into something that its conscious mind can visualize—the most horrible beast. Only the spell recipient can see the phantasmal killer (the caster sees only a shadowy shape), but if it succeeds in scoring a hit, the subject dies from fright. The beast attacks as a 4 Hit Dice monster. It is invulnerable to all attacks and can pass through any barriers, Once cast, it inexorably pursues the subject, for it exists only in the subject’s mind.\n&emsp;The only defenses against a phantasmal killer are an attempt to disbelieve (which can be tried but once), slaying or rendering unconscious the wizard who cast the spell, or rendering unconscious the target of the spell for its duration. To disbelieve the killer, the subject must specifically state the attempt and then roll an Intelligence check. This roll has a –1 penalty for every four levels of the caster. Currently [[-1*floor([[@{level-wizard}]]/4)]] penalty.\n&emsp;Special modifiers apply to this attack:}}{{style=center2 sheet-spell-bottom2}}{{c1-1=**Condition**}}{{c2-1=Surprise}}{{c3-1=Subject previously attacked by this spell}}{{c4-1=Subject is an illusionist}}{{c5-1=Subject is wearing a *helm of telepathy*}}{{c1-2=**Modifier**}}{{c2-2=-2}}{{c3-2=+1}}{{c4-2=+2}}{{c5-2=+3}}{{effects2=&emsp;Magic resistance, bonuses against fear, and Wisdom adjustments also apply. The subject’s magic resistance is checked first; if the spell overcomes the resistance, the subject’s fear/Wisdom bonuses (if any) then apply as negative modifiers to his Intelligence check.\n&emsp;If the subject of a phantasmal killer attack succeeds in disbelieving, and he is wearing a *helm of telepathy*, the beast can be turned upon the wizard, who must then disbelieve it or be subject to its attack and possible effects.\n&emsp;If the subject ignores the killer to perform other actions, such as attacking the caster, the killer may, at the DM’s option, gain bonuses to hit (for flank or rear attacks, etc.). Spells such as *remove fear* and *cloak of bravery,* cast after the killer has attacked, grant another check to disbelieve the effect.'
};

wiz4['Plant Growth'] = {
    'level': '4',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '[[100*[[@{level-wizard}]]*[[@{level-wizard}]] ]] square feet',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 205',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *plant growth* spell is cast, the wizard causes normal vegetation to grow, entwine, and entangle to form a thicket or jungle that creatures must hack or force a way through at a movement rate of 1 per round (or 2 if the creatures are larger than man size). The area must contain brush and trees for this spell to work. Briars, bushes, creepers, lianas, roots, saplings, thistles, thorn, trees, vines, and weeds become thick and overgrown so as to form a barrier. The area of effect is the caster’s level, squared, times 100 square feet. This area can be arranged in any square or rectangular shape that the caster desires. Thus, an 8th-level wizard can affect (8 × 8 =) 64 × 100 square feet, or 6,400 square feet. This could be an 80-foot × 80-foot square, a 160-foot × 40-foot rectangle, a 640-foot × 10-foot rectangle, etc. Individual plant girth and height is generally affected less than thickness of brush, branch, and undergrowth. The spell’s effects persist in the area until it is cleared by labor, fire, or such magical means as a *dispel magic* spell.'
};

wiz4['Polymorph Other'] = {
    'level': '4',
    'school': 'Alteration',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A caterpillar cocoon',
    'reference': 'p. 206',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *polymorph other* spell is a powerful magic that completely alters the form and ability, and possibly the personality and mentality, of the recipient. Of course, while a creature with a lower Intelligence can be polymorphed in form into something with a higher Intelligence, it will not gain that creature’s mental ability. The reverse—polymorphing a higher Intelligence creature into one of significantly lower Intelligence—results in a creature much more intelligent than appearances would lead one to believe. The polymorphed creature must succeed on a system shock (see Table 3) roll to see if it survives the change. After this, it must make a special Intelligence check to see if it retains its personality (see following).\n&emsp;The polymorphed creature acquires the form and physical abilities of the creature it has been polymorphed into, while retaining its own mind. Form includes natural Armor Class (that due to skin toughness, but not due to quickness, magical nature, etc.), physical movement abilities (walking, swimming, and flight with wings, but not plane shifting, blinking, teleporting, etc.), and attack routines (claw/claw/bite, swoop, rake, and constriction, but not petrification, breath weapons, energy drain, etc.). Hit points and saving throws do not change from the original form. Noncorporeal forms cannot be assumed. Natural shapeshifters (lycanthropes, dopplegangers, higher level druids, etc.) are affected for but one round, and can then resume their normal form.\n&emsp;If slain, the polymorphed creature reverts to its original form, though it remains dead. (Note that most creatures generally prefer their own form and will not willingly stand the risk of being subjected to this spell!) As class and level are not attributes of form, abilities derived from either cannot be gained by this spell, nor can exact ability scores be specified.\n&emsp;When the polymorph occurs, the creature’s equipment, if any, melds into the new form (in particularly challenging campaigns, the DM may allow protective devices, such as a *ring of protection,* to continue operating effectively). The creature retains its mental abilities, including spell use, assuming the new form allows completion of the proper verbal and somatic components and the material components are available. Creatures not used to a new form might be penalized at the DM’s option (for example, –2 to attack rolls) until they practice sufficiently to master it.\n&emsp;When the physical change occurs, there is a base 100% chance that the subject’s personality and mentality change into that of the new form (i.e., a roll of 20 or less on 1d20). For each 1 point of Intelligence of the subject, subtract 1 from the base chance on 1d20. Additionally, for every Hit Die of difference between the original form and the form it is assuming, add or subtract 1 (depending on whether the polymorphed form has more Hit Dice [or levels] or fewer Hit Dice [or levels] than original, respectively). The chance for assumption of the personality and mentality of the new form is checked daily until the change takes place.\n&emsp;A subject acquiring the mentality of the new form has effectively become the creature whose form was assumed and comes under the control of the DM until recovered by a *wish* spell or similar magic. Once this final change takes place, the creature acquires the new form’s full range of magical and special abilities.\n&emsp;For example: If a 1 Hit Die orc of 8 Intelligence is polymorphed into a white dragon with 6 Hit Dice, it is 85% (20 – 8 Intelligence + 5 level difference [6–1] = 17 out of 20 = 85%) likely to actually become one in all respects, but in any case it has the dragon’s physical and mental capabilities. If it does not assume the personality and mentality of a white dragon, it knows what it formerly knew as well.\n&emsp;The wizard can use a *dispel magic* spell to change the polymorphed creature back to its original form, and this requires a system shock roll. Those who have lost their individuality and are then converted back maintain the belief that they are actually the polymorphed creature and attempt to return to that form. Thus, the orc who comes to believe he is a white dragon, when converted back to his orc form, steadfastly maintains he is really a white dragon polymorphed into the shape of an orc. His companions will most likely consider him mad.'
};

wiz4['Polymorph Self'] = {
    'level': '4',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[2*[[@{level-wizard}]] ]] turns',
    'aoe': 'The caster',
    'components': 'V',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 206',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '1d12 hit points when spell ends',
    'effect': 'When this spell is cast, the wizard is able to assume the form of any creature, save those that are noncorporeal, from as small as a wren to as large as a hippopotamus. Furthermore, the wizard gains its physical mode of locomotion and breathing as well. No system shock roll is required. The spell does not give the new form’s other abilities (attack, magic, special movement, etc.), nor does it run the risk of the wizard changing personality and mentality.\n&emsp;When the polymorph occurs, the caster’s equipment, if any, melds into the new form (in particularly challenging campaigns, the DM may allow protective devices, such as a *ring of protection,* to continue operating effectively). The caster retains all mental abilities, including spell use, assuming the new form allows completion of the proper verbal and somatic components and the material components are available. A caster not used to a new form might be penalized at the DM’s option (for example, –2 penalty to attack rolls) until he practices sufficiently to master it.\n&emsp;Thus, a wizard changed into an owl could fly, but his vision would be human; a change to a black pudding would enable movement under doors or along halls and ceilings, but not the pudding’s offensive (acid) or defensive capabilities. Naturally, the strength of the new form is sufficient to enable normal movement. The spellcaster can change his form as often as desired for the duration of the spell, each change requiring a round. The wizard retains his own hit points, attack rolls, and saving throws. The wizard can end the spell at any time; when voluntarily returning to his own form and ending the spell, he regains 1d12 hit points. The wizard also will return to his own form when slain or when the effect is dispelled, but no hit points are restored in these cases.'
};

wiz4['Rainbow Pattern'] = {
    'level': '4',
    'school': 'Alteration, Illusion/Phantasm',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '30-foot cube',
    'components': 'S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A crystal prism and a piece of phosphor',
    'reference': 'p. 206',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard creates a glowing, rainbow-hued band of interweaving patterns. Any creature caught in it may become fascinated and gaze at it as long as the effect lasts. The spell can captivate a maximum of 24 levels, or Hit Dice, of creatures—24 creatures with 1 Hit Die each, 12 with 2 Hit Dice, etc. All creatures affected must be within the area of effect, and each is entitled to a saving throw vs. spell. An attack on an affected creature that causes damage frees it from the spell immediately. Creatures that are restrained and removed from the area still try to follow the pattern.\n&emsp;Once the rainbow pattern is cast, the wizard need only gesture in the direction he desires, and the pattern of colors moves slowly off in that direction, at the rate of 30 feet per round. It persists without further attention from the spellcaster for [[1d3]] rounds. All affected creatures follow the moving rainbow of light. If the pattern leads its subjects into a dangerous area (through flame, off a cliff, etc.), allow a second saving throw. If the view of the lights is completely blocked (by an *obscurement* spell, for instance), the spell is negated.\n&emsp;The wizard need not utter a sound, but he must gesture appropriately while holding a crystal prism and the material component.'
};

wiz4['Rary\'s Mnemonic Enhancer'] = {
    'level': '4',
    'school': 'Alteration',
    'range': '0',
    'duration': '1 day',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A piece of string, an ivory plaque of at least 100 gp value, and ink consisting of squid secretion with either black dragon’s blood or giant slug digestive juice',
    'reference': 'p. 206',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to memorize, or retain the memory of, three additional spell levels (three 1st-level spells, or one 1st and one 2nd, or one 3rd-level spell). The wizard has two options:\n&emsp;A) Memorize additional spells. This option is taken at the time the spell is cast. The additional spells must be memorized normally and any material components must be acquired.\n&emsp;B) Retain memory of any spell (within the level limits) cast the round prior to starting to cast this spell. The round after a spell is cast, the enhancer must be successfully cast. This restores the previously cast spell to memory. However, the caster still must acquire any needed material components.\n&emsp;The material components disappear when the spell is cast.'
};

wiz4['Remove Curse'] = {
    'level': '4',
    'school': 'Abjuration (Reversible)',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 207',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, the wizard is usually able to remove a curse—whether it is on an object, on a person, or in the form of some undesired sending or evil presence. Note that the *remove curse* spell cannot affect a cursed shield, weapon, or suit of armor, for example, although it usually enables a person afflicted with a cursed item to be rid of it. Certain special curses may not be countered by this spell, or may be countered only by a caster of a certain level or higher. A caster of 12th level or higher can cure lycanthropy with this spell by casting it on the animal form. The were-creature receives a saving throw vs. spell and, if successful, the spell fails and the wizard must gain a level before attempting the remedy again.\n&emsp;The reverse of the spell is not permanent; the *bestow curse* lasts [[@{level-wizard}]] turns. It causes one of the following effects (roll percentile dice):}}{{style=center1 sheet-spell-bottom2}}{{c1-1=**D100 Roll**}}{{c2-1=1–50}}{{c3-1=51–75}}{{c4-1=76–00}}{{c1-2=**Result**}}{{c2-2=Lowers one ability of the subject to 3 (the DM determines which by random selection)}}{{c3-2=Worsens the subject’s attack rolls and saving throws by –4}}{{c4-2=Makes the subject 50% likely per turn to drop whatever it is holding (or simply do nothing, in the case of creatures not using tools)}}{{effects2=&emsp;It is possible for a wizard to devise his own curse, and it should be similar in power to those given (the DM has final say). The subject of a *bestow curse* spell must be touched. If the subject is touched, a saving throw is still applicable; if it is successful, the effect is negated. The bestowed curse cannot be dispelled.'
};

wiz4['Shadow Monsters'] = {
    'level': '4',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '20-foot cube',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 207',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A wizard casting the *shadow monsters* spell uses material from the Demiplane of Shadow to shape semireal illusions of one or more monsters. The total Hit Dice of the shadow monster or monsters thus created cannot exceed [[@{level-wizard}]]; thus, a 10th-level wizard can create one creature that has 10 Hit Dice, two that have 5 Hit Dice, etc. All shadow monsters created by one spell must be of the same sort. The actual hit point total for each monster is 20% of the hit point total it would normally have. (To determine this, roll the appropriate Hit Dice and multiply the hit points by 0.2. Any remainder less than 0.4 is dropped—in the case of monsters with 1 or fewer Hit Dice, this indicates the monster was not successfully created—and scores between 0.4 and 1 are rounded up to 1 hit point.)\n&emsp;Those viewing the shadow monsters are allowed to disbelieve as per normal illusions, although there is a –2 penalty to the attempt. The shadow monsters perform as the real monsters with respect to Armor Class and attack forms. Those who believe in the shadow monster suffer real damage from their attacks. Special attack forms such as petrification or level drain do not actually occur, but a subject who believes they are real will react appropriately.\n&emsp;Those who roll successful saving throws see the shadow monsters as transparent images superimposed on vague shadowy forms. These are Armor Class 10 and inflict only 20% of normal melee damage (biting, clawing, weapon, etc.), dropping fractional damage less than 0.4 as done with hit points.\n&emsp;For example: A shadow monster griffon attacks a person who knows it is only quasi-real. The monster strikes with two claw attacks and one bite, hitting as a 7-Hit Die monster. All three attacks hit; the normal damage dice are rolled, multiplied by 0.2 separately, rounded up or down, and added together to get the total damage. Thus, if the attacks score 4, 2 and 11 points, a total of 4 points of damage is inflicted (4 × 0.2 = 0.8 [rounded to 1], 2 × 0.2 = 0.4 [rounded to 1], 11 × 0.2 = 2.2 [rounded to 2]. The sum is 1 + 1 + 2 = 4).'
};

wiz4['Shout'] = {
    'level': '4',
    'school': 'Evocation',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': '10 × 30 foot cone',
    'components': 'V, M',
    'cast-time': '1',
    'saving-throw': 'Special',
    'materials': 'A drop of honey, a drop of citric acid, and a small cone made from a bull or ram horn',
    'reference': 'p. 207',
    'book': 'PHB',
    'damage': '[[2d6]]',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *shout* spell is cast, the wizard gives himself tremendous vocal powers. The caster can emit an ear-splitting noise that has a principal effect in a cone shape radiating from his mouth to a point 30 feet away. Any creature within this area is deafened for [[2d6]] rounds and suffers 2d6 points of damage. A successful saving throw vs. spell negates the deafness and reduces the damage by half. Any exposed brittle or crystal substance subject to sonic vibrations is shattered by a shout, while those brittle objects in the possession of a creature receive the creature’s saving throw. Deafened creatures suffer a –1 penalty to surprise rolls, and those that cast spells with verbal components are 20% likely to miscast them.\n&emsp;The *shout* spell cannot penetrate the 2nd-level priest spell, *silence, 10’ radius.* This spell can be employed only once per day; otherwise, the caster might permanently deafen himself.'
};

wiz4['Solid Fog'] = {
    'level': '4',
    'school': 'Alteration',
    'range': '30 yards',
    'duration': '[[2d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '[[20*10*10*[[@{level-wizard}]] ]] foot volume',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A pinch of dried, powdered peas combined with powdered animal hoof',
    'reference': 'p. 207',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard creates a billowing mass of misty vapors similar to a *wall of fog* spell. The caster can create less vapor if desired, as long as a rectangular or cubic mass at least 10 feet on a side is formed. The fog obscures all sight, normal and infravision, beyond 2 feet. However, unlike normal fog, only a very strong wind can move these vapors, and any creature attempting to move through the solid fog progresses at a movement rate of 1 foot per round. A *gust of wind* spell cannot affect it. A fireball, flame strike, or wall of fire can burn it away in a single round.'
};

wiz4['Stoneskin'] = {
    'level': '4',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'Granite and diamond dust sprinkled on the recipient’s skin',
    'reference': 'p. 208',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the affected creature gains a virtual immunity to any attack by cut, blow, projectile, or the like. Even a *sword of sharpness* cannot affect a creature protected by *stoneskin*, nor can a rock hurled by a giant, a snake’s strike, etc. However, magical attacks from such spells as *fireball, magic missile, lightning bolt,* and so forth have their normal effects. The spell’s effects are not cumulative with multiple castings.\n&emsp;The spell blocks [[1d4+floor([[@{level-wizard}]]/2)]] attacks. This limit applies regardless of attack rolls and regardless of whether the attack was physical or magical. For example, a *stoneskin* spell cast by a 9th-level wizard would protect against from five to eight attacks. An attacking griffon would reduce the protection by three each round; four magic missiles would count as four attacks in addition to inflicting their normal damage.'
};

wiz4['Vacancy'] = {
    'level': '4',
    'school': 'Alteration, Illusion/Phantasm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[10*[[@{level-wizard}]] ]]-foot radius',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A square of the finest black silk worth at least 100 gp',
    'reference': 'p. 208',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *vacancy* spell is cast, the wizard causes an area to appear to be vacant, neglected, and unused. Those who behold the area see dust on the floor, cobwebs, dirt, and other conditions typical of a long-abandoned place. If they pass through the area of effect, they seem to leave tracks, tear away cobwebs, and so on. Unless they actually contact some object cloaked by the spell, the place appears empty. Merely brushing an invisible object does not cause the *vacancy* spell to be disturbed: Only forceful contact grants a chance to note that all is not as it seems.\n&emsp;If forceful contact with a cloaked object occurs, those creatures subject to the spell can penetrate the spell only if they discover several items that they cannot see; each being is then entitled to a sav-ing throw vs. spell. Failure means they believe that the objects are invisible. A *dispel magic* spell cancels this spell so that the true area is seen. A *true seeing* spell, a *gem of seeing*, and similar effects can penetrate the deception, but a *detect invisibility* spell cannot. This spell is a very powerful combination of invisibility and illusion, but it can cloak only nonliving things. Living things are not made invisible, but their presence does not otherwise disturb the spell. The material component is used up during spellcasting.'
};

wiz4['Wall of Fire'] = {
    'level': '4',
    'school': 'Evocation',
    'range': '60 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'Phosphorus',
    'reference': 'p. 208',
    'book': 'PHB',
    'damage': '2d4 / 1d4 heat damage or 2d6+[[@{level-wizard}]]',
    'damage-type': 'fire damage',
    'healing': '',
    'effect': 'The *wall of fire* spell brings forth an immobile, blazing curtain of magical fire of shimmering color—violet or reddish blue. The spell creates either an opaque sheet of flame up to one 20-foot square per level of the spellcaster ([[20*[[@{level-wizard}]] ]]-foot square), or a ring with a radius of up to 10 feet + 5 feet per two levels of experience of the wizard ([[10+5*floor([[@{level-wizard}]]/2)]] feet). In either form, the wall of fire is 20 feet high.\n&emsp;The wall of fire must be cast so that it is vertical with respect to the caster. One side of the wall, selected by the caster, sends forth waves of heat, inflicting [[2d4]] points of damage upon creatures within 10 feet and [[1d4]] points of damage upon those within 20 feet. In addition, the wall inflicts [[2d6+[[@{level-wizard}]] ]] points of damage upon any creature passing through it. Creatures especially subject to fire may take additional damage, and undead always take twice normal damage. Note that attempting to catch a moving creature with a newly-created wall of fire is difficult; a successful saving throw enables the creature to avoid the wall, while its rate and direction of movement determine which side of the created wall it is on. The wall of fire lasts as long as the wizard concentrates on maintaining it, or [[@{level-wizard}]] rounds, in the event he does not wish to concentrate upon it.'
};

wiz4['Wall of Ice'] = {
    'level': '4',
    'school': 'Evocation',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'A small piece of quartz or similar rock crystal',
    'reference': 'p. 208',
    'book': 'PHB',
    'damage': 'See below',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can be cast in one of three ways: as an anchored plane of ice, as a hemisphere, or as a horizontal sheet to fall upon creatures with the effect of an ice storm.\n&emsp;A) *Ice plane.* When this spell is cast, a sheet of strong, hard ice is created. The wall is primarily defensive, stopping pursuers and the like. The wall is [[@{level-wizard}]] inches thick. It covers a [[10*[[@{level-wizard}]] ]]-foot-square area (a 10th-level wizard can create a wall of ice 100 feet long and 10 feet high, a wall 50 feet long and 20 feet high, etc.). Any creature breaking through the ice suffers [[2*[[@{level-wizard}]] ]] points of damage. Fire-using creatures suffer [[3*[[@{level-wizard}]] ]] points of damage, while cold-using creatures suffer only [[@{level-wizard}]] points of damage when breaking through. The plane can be oriented in any fashion as long as it is anchored along one or more sides.\n&emsp;B) *Hemisphere.* This casting of the spell creates a hemisphere whose maximum radius is equal to [[3+[[@{level-wizard}]] ]] feet. Thus, a 7th-level caster can create a hemisphere 10 feet in radius. The hemisphere lasts until it is broken, dispelled, or melted. Note that it is possible, but difficult, to trap mobile opponents under the hemisphere.\n&sbsp;C) *Ice sheet.* This casting of the spell causes a horizontal sheet to fall upon opponents. The sheet covers a [[10*[[@{level-wizard}]] ]]-foot-square area. The sheet has the same effect as an ice storm’s hail stones—3d10 points of damage inflicted to creatures beneath it.\n&emsp;A wall of ice cannot form in an area occupied by physical objects or creatures; its surface must be smooth and unbroken when created. Magical fires such as fireballs and fiery dragon breath melt a wall of ice in one round, though this creates a great cloud of steamy fog that lasts one turn. Normal fires or lesser magical ones do not hasten the melting of a wall of ice.'
};

wiz4['Wizard Eye'] = {
    'level': '4',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A bit of bat fur',
    'reference': 'p. 209',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is employed, the wizard creates an invisible sensory organ that sends him visual information. The wizard eye travels at 30 feet per round if viewing an area ahead as a human would (i.e., primarily looking at the floor), or 10 feet per round if examining the ceiling and walls as well as the floor ahead. The wizard eye can see with infravision up to 10 feet, and with normal vision up to 60 feet away in brightly lit areas. The wizard eye can travel in any direction as long as the spell lasts. It has substance and a form that can be detected (by a *detect invisibility* spell, for instance). Solid barriers prevent the passage of a wizard eye, although it can pass through a space no smaller than a small mouse hole (1 inch in diameter).\n&emsp;Using the eye requires the wizard to concentrate. However, if his concentration is broken, the spell does not end—the eye merely becomes inert until the wizard again concentrates, subject to the duration of the spell. The powers of the eye cannot be enhanced by other spells or items. The caster is subject to any gaze attack met by the eye. A successful dispel cast on the wizard or eye ends the spell. With respect to blindness, magical darkness, and so on, the wizard eye is considered an independent sensory organ of the caster.'
};

const wiz5 = {};
wiz5['Advanced Illusion'] = {
    'level': '5',
    'school': 'Illusion/Phantasm',
    'range': '[[60+(10*[[@{level-wizard}]])]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '[[40+(10*[[@{level-wizard}]])]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'A bit of fleece and several grains of sand',
    'reference': 'p. 209',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is essentially a *spectral forces* spell that operates through a program (similar to a *programmed illusion* spell) determined by the caster. It is thus unnecessary for the wizard to concentrate on the spell for longer than the round of casting it, as the program has then started and will continue without supervision. The illusion has visual, audio, olfactory, and thermal components. If any viewer actively attempts to disbelieve the spell, he gains a saving throw vs. spell. If any viewer successfully disbelieves and communicates this fact to other viewers, each such viewer gains a saving throw vs. spell with a +4 bonus.'
};

wiz5['Airy Water'] = {
    'level': '5',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '10-foot radius sphere or 15-foot radius hemisphere',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A small handful of alkaline or bromine salts',
    'reference': 'p.209',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *airy water* spell turns normal liquid, such as water or water-based solutions, into a less dense, breathable substance. Thus, if the wizard wanted to enter an underwater place, he would step into the water, cast the spell, and sink downward in a globe of bubbling water. He and any companions in the spell’s area of effect can move freely and breathe just as if the bubbling water were air. The globe is centered on and moves with the caster. Water-breathing creatures avoid a sphere (or hemisphere) of airy water, although intelligent ones can enter it if they are able to move by means other than swimming. No water-breathers can breathe in an area affected by this spell. There is only one word that needs to be spoken to actuate the magic; thus, it can be cast under water. The spell does not filter or remove solid particles of matter.'
};

wiz5['Animal Growth'] = {
    'level': '5',
    'school': 'Alteration (Reversible)',
    'range': '60 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Up to 8 animals in a 20-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A pinch of powdered bone',
    'reference': 'p. 209',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard causes all designated animals, up to a maximum of eight, within a 20-foot-square area to grow to twice their normal size. The effects of this growth are doubled Hit Dice (with improvement in attack rolls) and doubled damage in combat. The spell lasts for one round for each level of experience of the wizard casting the spell. Currently [[@{level-wizard}]] rounds. Only natural animals, including giant forms, can be affected by this spell.\n&emsp;The reverse, *shrink animal,* reduces animal size by half and likewise reduces Hit Dice, attack damage, etc.'
};

wiz5['Animate Dead'] = {
    'level': '5',
    'school': 'Necromancy',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5 rounds',
    'saving-throw': 'None',
    'materials': 'A drop of blood and a pinch of bone powder or a bone shard',
    'reference': 'p. 210',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates the lowest of the undead monsters—skeletons or zombies—usually from the bones or bodies of dead humans, demihumans, or humanoids. The spell causes existing remains to become animated and obey the simple verbal commands of the caster. The skeletons or zombies can follow the caster, remain in an area and attack any creature (or just a specific type of creature) entering the place, etc. The undead remain animated until they are destroyed in combat or are turned; the magic cannot be dispelled. The following types of dead creatures can be animated:\n&emsp;A) *Humans, demihumans, and humanoids with 1 Hit Die.* The wizard can animate one skeleton for each experience level he has attained, or one zombie for every two levels. Currently [[@{level-wizard}]] skeletons, or [[floor([[@{level-wizard}]]/2)]] zombies. The experience levels, if any, of the slain are ignored; the body of a newly dead 9th-level fighter is animated as a zombie with 2 Hit Dice, without special class or racial abilities.\n&emsp;B) *Creatures with more than 1 Hit Die.* The number of undead animated is determined by the monster Hit Dice (the total Hit Dice cannot exceed the wizards level. Currently [[@{level-wizard}]]). Skeletal forms have the Hit Dice of the original creature, while zombie forms have one more Hit Die. Thus, a 12th-level wizard could animate four zombie gnolls (4 × [2+1 Hit Dice] = 12), or a single fire giant skeleton. Such undead have none of the special abilities they had in life.\n&emsp;C) *Creatures with less than 1 Hit Die.* The caster can animate two skeletons per level or one zombie per level. Currently [[2*[[@{level-wizard}]] ]] skeletons or [[@{level-wizard}]] zombies. The creatures have their normal Hit Dice as skeletons and an additional Hit Die as zombies. Clerics receive a +1 bonus when trying to turn these.\n&emsp;This spell assumes that the bodies or bones are available and are reasonably intact (those of skeletons or zombies destroyed in combat won’t be!).\n&emsp;The casting of this spell is not a good act, and only evil wizards use it frequently.'
};

wiz5['Avoidance'] = {
    'level': '5',
    'school': 'Abjuration, Alteration (Reversible)',
    'range': '10 yards',
    'duration': 'Permanent until dispelled',
    'aoe': 'Up to 3-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': 'A magnetized needle',
    'reference': 'p. 210',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster sets up a natural repulsion between the affected object and all other living things except himself. Thus, any living creature attempting to touch the affected object is repulsed (unable to come closer than 1 foot), or repulses the affected object, depending on the relative mass of the two (a halfling attempting to touch an iron chest with an *avoidance* spell upon it will be thrown back, while the chest will skitter away from a giant-sized creature as the creature approaches).\n&emsp;The spell cannot be cast upon living things; any attempt to cast avoidance upon the apparel or possessions of a living creature entitles the subject creature to a saving throw vs. spell.\n&emsp;The reverse of this spell, *attraction,* uses the same material components and sets up a natural attraction between the affected object and all living things. A creature is drawn to the object if the creature is smaller, or the object slides toward the creature if the creature is larger. It takes a successful bend bars/lift gates roll to remove the enchanted object once it has adhered to an object or creature.'
};

wiz5['Bigby\'s Interposing Hand'] = {
    'level': '5',
    'school': 'Evocation',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A soft glove',
    'reference': 'p. 210',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *Bigby’s interposing hand* spell creates a man-sized to gargantuan-sized magical hand that appears between the spellcaster and his chosen opponent. This disembodied hand then moves to remain between the two, regardless of what the spellcaster does or how the opponent tries to get around it. Neither invisibility nor polymorph fools the hand once a creature has been chosen. The hand does not pursue an opponent.\n&emsp;The size of the hand is determined by the wizard, and it can be from human size (5 feet) all the way up to titan size (25 feet). It provides cover for the caster against the selected opponent, with all the attendant combat adjustments. It has as many hit points as the caster in full health ([[@{HP|max}]] hit points) and has an Armor Class of 0.\n&emsp;Any creature weighing less than 2,000 pounds trying to push past the hand is slowed to half its normal movement. If the original opponent is slain, the caster can designate a new opponent for the hand. The caster can command the hand out of existence at any time.'
};

wiz5['Chaos'] = {
    'level': '5',
    'school': 'Enchantment/Charm',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Up to 40-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': 'A small disc of bronze and a small rod of iron',
    'reference': 'p. 210',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to the 4th-level *confusion* spell, but only the following beings receive a saving throw: fighters, wizards specialized in enchantments, monsters that use no magic and have an Intelligence of 4 or less, creatures of 21 Intelligence or higher, and creatures with more levels or Hit Dice than the caster’s level. Currently [[@{level-wizard}]] levels or Hit Dice.\n&emps;The spell causes disorientation and severe perceptual distortion, creating indecision and the inability to take effective action. The spell affects 1d4 creatures, plus one creature per caster level. Currently [[1d4+[[@{level-wizard}]] ]] creatures. Those allowed saving throws roll them vs. spell with –2 penalties, adjusted for Wisdom. Those who successfully save are unaffected by the spell. Affected creatures react as follows:}}{{style=center1 sheet-spell-bottom2}}{{c1-1=**D10 Roll**}}{{c2-1=1}}{{c3-1=2–6}}{{c4-1=7–9}}{{c5-1=10}}{{c1-2=**Action**}}{{c2-2=Wander away (unless prevented) for duration of spell}}{{c3-2=Stand confused for one round (then roll again)}}{{c4-2=Attack nearest creature for one round (then roll again)}}{{c5-2=Act normally for one round (then roll again)}}{{effects2=&emsp;The spell lasts one round for each level of the caster. Those affected are checked by the DM for actions each round for the duration of the spell, or until the “wander away for the duration of the spell” result occurs.\n&emsp;Wandering creatures move as far from the caster as possible using their most typical mode of movement (characters walk, fish swim, bats fly, etc.). Saving throws and actions are checked at the beginning of each round. Any confused creature that is attacked perceives the attacker as an enemy and acts according to its basic nature.'
};

wiz5['Cloudkill'] = {
    'level': '5',
    'school': 'Evocation',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '40 × 20 × 20 foot cloud',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 212',
    'book': 'PHB',
    'damage': 'Death or 1d10',
    'damage-type': 'Poison',
    'healing': '',
    'effect': 'This spell generates a billowing cloud of ghastly yellowish green vapors that is so toxic as to slay any creature with fewer than 4+1 Hit Dice, cause creatures with 4+1 to 5+1 Hit Dice to roll saving throws vs. poison with –4 penalties or be slain, and creatures with up to 6 Hit Dice (inclusive) to roll unmodified saving throws vs. poison or be slain. Holding one’s breath has no effect on the lethality of the spell. Those above 6th level (or 6 Hit Dice) must leave the cloud immediately or suffer 1d10 points of poison damage each round while in the area of effect.\n&emsp;The cloudkill moves away from the spellcaster at 10 feet per round, rolling along the surface of the ground. A moderate breeze causes it to alter course (roll for direction), but it does not move back toward its caster. A strong wind breaks it up in four rounds, and a greater wind force prevents the use of the spell. Very thick vegetation will disperse the cloud in two rounds. As the vapors are heavier than air, they sink to the lowest level of the land, even pouring down den or sinkhole openings; thus, the spell is ideal for slaying nests of giant ants, for example. It cannot penetrate liquids, nor can it be cast under water.'
};

wiz5['Cone of Cold'] = {
    'level': '5',
    'school': 'Evocation',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': '½',
    'materials': 'A crystal or glass cone of very small size',
    'reference': 'p. 212',
    'book': 'PHB',
    'damage': '[[ [[@{level-wizard}]]d4+[[@{level-wizard}]] ]]',
    'damage-type': 'Cold',
    'healing': '',
    'effect': 'When this spell is cast, it causes a cone-shaped area of extreme cold, originating at the wizard’s hand and extending outward in a cone 5 feet long and 1 foot in diameter per level of the caster. Currently [[5*[[@{level-wizard}]] ]] feet long and [[@{level-wizard}]] feet in diameter. It drains heat and causes 1d4+1 points of damage per level of experience of the wizard. For example, a 10th-level wizard would cast a cone of cold 10 feet in diameter and 50 feet long, causing 10d4+10 points of damage.'
};

wiz5['Conjure Elemental'] = {
    'level': '5',
    'school': 'Conjuration/Summoning',
    'range': '60 yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A considerable quantity of the element at hand and a small amount of one of the following:\nAir Elemental—burning incense\nEarth Elemental—soft clay\nFire Elemental—sulphur and phosphorus\nWater Elemental—water and sand',
    'reference': 'p. 212',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'There are actually four spells in the *conjure elemental* spell. The wizard is able to conjure an air, earth, fire, or water elemental with this spell—assuming he has the material component for the particular elemental. (A considerable fire source must be in range to conjure a fire elemental; a large amount of water must be available to conjure a water elemental.) Conjured elementals have 8 Hit Dice.\n&emsp;It is possible to conjure successive elementals of different types if the spellcaster has memorized two or more of these spells. The type of elemental to be conjured must be decided upon before memorizing the spell. Each type of elemental can be conjured only once per day.\n&emsp;The conjured elemental must be controlled by the wizard—the spellcaster must concentrate on the elemental doing his commands—or it turns on the wizard and attacks. The elemental will not break off a combat to do so, but it will avoid creatures while seeking its conjurer. If the wizard is wounded or grappled, his concentration is broken. There is always a 5% chance that the elemental turns on its conjurer regardless of concentration. This check is made at the end of the second and each succeeding round. An elemental that breaks free of its control can be dispelled by the caster, but the chance of success is only 50%. The elemental can be controlled up to 30 yards away per level of the caster. Currently [[30*[[@{level-wizard}]] ]] yards. The elemental remains until its form on this plane is destroyed due to damage or until the spell’s duration expires. Note that water elementals are destroyed if they are ever more than 60 yards from a large body of water.\n&emsp;Special protection from uncontrolled elementals is available by  means of a *protection from evil* spell.'
};

wiz5['Contact Other Plane'] = {
    'level': '5',
    'school': 'Divination',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 212',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard sends his mind to another plane of existence in order to receive advice and information from powers there. As these powers resent such contact, only brief answers are given. (The DM answers all questions with “yes,” “no,” “maybe,” “never,” “irrelevant,” etc.) Any questions asked are answered by the power during the spell’s duration. The character can contact an elemental plane or some plane farther removed. For every two levels of experience of the wizard, one questions may be asked. Currently [[floor([[@{level-wizard}]]/2)]] questions. Contact with minds far removed from the plane of the wizard increases the probability of the spellcaster going insane or dying, but the chance of the power knowing the answer, as well as the probability of the being telling the correct answer, are likewise increased by moving to distant planes. Once the Outer Planes are reached, the Intelligence of the power contacted determines the effects.\n&emsp;The accompanying random table is subject to DM changes, development of extraplanar NPC beings, and so on.\n&emsp;If insanity occurs, it strikes as soon as the first question is asked. This condition lasts for one week for each removal of the plane contacted (see the *DMG* or the *PLANESCAPE™ Campaign Setting* boxed set), to a maximum of 10 weeks. There is a 1% chance per plane that the wizard dies before recovering, unless a remove curse spell is cast upon him. A surviving wizard can recall the answer to the question.\n&emsp;On rare occasions, this divination may be blocked by the action of certain lesser or greater powers.}}{{style=center2 sheet-spell-center3 sheet-spell-center4 sheet-spell-bottom2 sheet-spell-bottom3 sheet-spell-bottom4}}{{cc1-1=bottom}}{{c1-1=**Plane**}}{{c2-1=Elemental Plane}}{{c3-1=Inner Plane}}{{c4-1=Astral Plane}}{{c5-1=Outer Plane, Int 19}}{{c6-1=Outer Plane, Int 20}}{{c7-1=Outer Plane, Int 21}}{{c8-1=Outer Plane, Int 22}}{{c9-1=Outer Plane, Int 23}}{{c10-1=Outer Plane, Int 24}}{{c11-1=Outer Plane, Int 25}}{{cc1-2=fixed}}{{c1-2=**Chance of**\n**Insanity &ast;**}}{{c2-2=20%}}{{c3-2=25%}}{{c4-2=30%}}{{c5-2=35%}}{{c6-2=40%}}{{c7-2=45%}}{{c8-2=50%}}{{c9-2=55%}}{{c10-2=60%}}{{c11-2=65%}}{{cc1-3=fixed}}{{c1-3=**Chance of**\n**Knowledge**}}{{c2-3=55% (90%)}}{{c3-3=60%}}{{c4-3=65%}}{{c5-3=70%}}{{c6-3=75%}}{{c7-3=80%}}{{c8-3=85%}}{{c9-3=90%}}{{c10-3=95%}}{{c11-3=98%}}{{cc1-4=fixed}}{{c1-4=**Chance of**\n**Veracity &ast;&ast;**}}{{c2-4=62% (75%)}}{{c3-4=65%}}{{c4-4=67%}}{{c5-4=70%}}{{c6-4=73%}}{{c7-4=75%}}{{c8-4=78%}}{{c9-4=81%}}{{c10-4=85%}}{{c11-4=90%}}{{effects2=&emsp;&ast; For every point of Intelligence over 15, the wizard reduces the chance of insanity by 5%.\n&emsp;&ast;&ast; If the being does not know an answer, and the chance of veracity is not made, the being will emphatically give an incorrect answer. If the chance of veracity is made, the being will answer “unknown.”\n&emsp;Percentages in parentheses are for questions that pertain to the appropriate elemental plane.\n\n**Optional Rule**\n&emsp;The DM may allow a specific Outer Plane to be contacted (see  the *PLANESCAPE Campaign Setting* boxed set). In this case, the difference in alignment between the caster and the plane contacted alters the maximum Intelligence that can be contacted—each difference in moral or ethical alignment lowers the maximum Intelligence that can be contacted by 1. For example, an 18th-level lawful good caster could contact Mount Celestia (a lawful good plane) on the “Intelligence 20” line, or Elysium (a neutral good plane) on the “Intelligence 19” line.'
};

wiz5['Demishadow Monsters'] = {
    'level': '5',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '20-foot cube',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 213',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to the 4th-level spell *shadow monsters,* except that the monsters created are effectively 40% of normal hit points. If the saving throw is made, their damage potential is only 40% of normal and their Armor Class is 8. The monsters have none of the special abilities of the real creatures, although victims may be deluded into believing this to be so.'
};

wiz5['Dismissal'] = {
    'level': '5',
    'school': 'Abjuration',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'Any item that is distasteful to the subject creature',
    'reference': 'p. 213',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, a wizard on the Prime Material Plane seeks to force or enable a creature from another plane of existence to return to its proper plane. Magic resistance, if any, is checked if this spell is used to force a being home. If the resistance fails, the caster’s level is compared to the creature’s level or Hit Dice. If the wizard’s level is higher, the difference is subtracted from the creature’s die roll for its saving throw vs. spell. If the creature’s level or Hit Dice is higher, the difference is added to the saving throw roll.\n&emsp;If the creature desires to be returned to its home plane, no saving throw is necessary (it chooses to fail the roll).\n&emsp;If the spell is successful, the creature is instantly whisked away, but the spell has a 20% chance of actually sending the subject to a plane other than its own.'
};

wiz5['Distance Distortion'] = {
    'level': '5',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[2*[[@{level-wizard}]] ]] turns',
    'aoe': '[[10*[[@{level-wizard}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A small lump of soft clay',
    'reference': 'p. 213',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell can be cast only in an area completely surrounded or enclosed by earth, rock, sand, or similar materials. The wizard must also cast a *conjure elemental* spell to summon an earth elemental. The elemental serves without attempting to break free when the spellcaster announces that his intent is to cast a *distance distortion* spell. The spell places the earth elemental in the area of effect, and the elemental then causes the area’s dimensions to be either doubled or halved for those traveling over it (spellcaster’s choice). Thus, a 10-foot × 100-foot corridor could seem to be either 5 feet wide and 50 feet long or 20 feet wide and 200 feet long. When the spell duration has elapsed, the elemental returns to its own plane.\n&emsp;The true nature of an area affected by distance distortion is undetectable to any creature traveling along it, but the area dimly radiates magic, and a true seeing spell can reveal that an earth elemental is spread within the area.'
};

wiz5['Domination'] = {
    'level': '5',
    'school': 'Enchantment/Charm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '1 person',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 214',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *domination* spell enables the caster to control the actions of any person until the spell is ended by the subject’s Intelligence (see the *charm person* spell). Elves and half-elves resist this enchantment as they do all charm-type spells. When the spell is cast, the subject must roll a saving throw vs. spell at a penalty of –2, but Wisdom adjustments apply. Failure means the wizard has established a telepathic link with the subject’s mind. If a common language is shared, the wizard can generally force the subject to perform as the wizard desires, within the limits of the subject’s body structure and Strength. Note that the caster does not receive direct sensory input from the subject.\n&emsp;Subjects resist this control, and those forced to take actions against their natures receive a new saving throw with a bonus of +1 to +4, depending on the type of action required. Obviously self-destructive orders are not carried out. Once control is established, there is no limit to the range at which it can be exercised, as long as the caster and subject are on the same plane.\n&emsp;A protection from evil spell can prevent the caster from exercising control or using the telepathic link while the subject is so warded, but it cannot prevent the establishment of domination.'
};

wiz5['Dream'] = {
    'level': '5',
    'school': 'Invocation, Illusion/Phantasm (Reversible)',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 214',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *dream* spell enables the caster, or a messenger touched by the caster, to send messages to others in the form of dreams. At the beginning of the spell, the caster must name the recipient or identify him by some title that leaves no doubt as to his identity.\n&emsp;As the caster completes the spell, the person sending the spell falls into a deep trancelike sleep, and instantaneously projects his mind to the recipient. The sender then enters the recipient’s dream and delivers the message unless the recipient is magically protected. If the recipient is awake, the message sender can choose to remain in the trancelike sleep. If the sender is disturbed during this time, the spell is immediately cancelled and the sender comes out of the trance. The whereabouts and current activities of the recipient cannot be learned through this spell.\n&emsp;The sender is unaware of his own surroundings or the activities around him while he is in his trance. He is totally defenseless, both physically and mentally (i.e., he always fails any saving throw) while in the trance.\n&emsp;Once the recipient’s dreams are entered, the sender can deliver a message of any length, which the recipient remembers perfectly upon waking. The communication is one-way; the recipient cannot ask questions or offer information, nor can the sender gain any information by observing the dreams of the recipient. Once the message is delivered, the sender’s mind returns instantly to his body. The duration of the spell is the time required for the sender to enter the recipient’s dream and deliver the message.\n&emsp;The reverse of this spell, *nightmare,* enables the caster to send a hideous and unsettling vision to the recipient, who is allowed a saving throw vs. spell to avoid the effect. The nightmare prevents restful sleep and causes 1d10 points of damage. The nightmare leaves the recipient fatigued and unable to regain spells for the next day. A *dispel evil* spell cast upon the recipient stuns the caster of the nightmare for one turn per level of the cleric countering this evil sending.'
};

wiz5['Extension II'] = {
    'level': '5',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 214',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is the same as the 4th-level *extension I* spell, except it extends the duration of 1st-through 4th-level spells by 50%.'
};

wiz5['Fabricate'] = {
    'level': '5',
    'school': 'Enchantment, Alteration',
    'range': '[[5*[[@{level-wizard}]] yards',
    'duration': 'Permanent',
    'aoe': '[[@{level-wizard}]] cube yards (or cube feet for minerals)',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': 'The material to be affected by the spell',
    'reference': 'p. 214',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to convert material of one sort into a product that is of the same material. Thus, the spellcaster can fabricate a wooden bridge from a clump of trees, a rope from a patch of hemp, clothes from flax or wool, and so forth. Magical or living things cannot be created or altered by a *fabricate* spell. The quality of items made by this spell is commensurate with the quality of material used as the basis for the new fabrication. If the caster works with a mineral, the area of effect is reduced by a factor of 27 (1 cubic foot per level instead of 1 cubic yard).\n&emsp;Articles requiring a high degree of craftsmanship (jewelry, swords, glass, crystal, etc.) cannot be fabricated unless the wizard otherwise has great skill in the appropriate craft. Casting requires one full round per cubic yard (or foot) or material to be affected by the spell.'
};

wiz5['False Vision'] = {
    'level': '5',
    'school': 'Divination',
    'range': '0',
    'duration': '[[1d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '30-foot radius',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'The ground dust of an emerald worth at least 500 gp, which is sprinkled into the air when the spell is cast',
    'reference': 'p. 214',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard is able to confound any attempt to scry (by means of either a spell or a magical device) any point within the area of effect of the spell. To use the spell, he must be aware of the scrying attempt, although knowledge of the scryer or the scryer’s location is not necessary. Upon casting the spell, the caster and all he desires within the radius of the spell become undetectable to the scrying. Furthermore, the caster is able to send whatever message he desires, including vision and sound, according to the medium of the scrying method. To do this, the caster must concentrate on the message he is sending. Once concentration is broken, no further images can be sent, although the caster remains undetectable for the duration of the spell.'
};

wiz5['Feeblemind'] = {
    'level': '5',
    'school': 'Enchantment/Charm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'A handful of clay, crystal, glass, or mineral spheres, which disappears when the spell is cast',
    'reference': 'p. 215',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is used solely against people or creatures who use magic spells. The *feeblemind* causes the subject’s intellect to degenerate to that of a moronic child. The subject remains in this state until a *heal* or *wish* spell is used to cancel the effects. Magic-using beings are very vulnerable to this spell; thus, their saving throws are made with the following adjustments:}}{{style=center2 sheet-spell-bottom2}}{{cc1-1=bottom}}{{c1-1=**Spell Use of Target**}}{{c2-1=Priest}}{{c3-1=Wizard (human)}}{{c4-1=Combination or nonhuman}}{{c1-2=**Saving Throw Adjustment**}}{{c2-2=+1}}{{c3-2=–4}}{{c4-2=–2}}{{effects2=&emsp;Wisdom adjustments apply to the saving throw.'
};

wiz5['Hold Monster'] = {
    'level': '5',
    'school': 'Enchantment/Charm',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '1–4 creatures in a 40-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': 'One hard metal bar or rod for each monster to be held; the bar or rod can be as small as a three-penny nail',
    'reference': 'p. 215',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell immobilizes from one to four creatures of any type within spell range and in sight of the spellcaster. He can opt to hold one, two, three, or four creatures. If three or four are attacked, each saving throw is normal; if two are attacked, each saving throw suffers a –1 penalty; if only one is attacked, the saving throw suffers a –3 penalty.'
};

wiz5['Leomund\'s Lamentable Belaborment'] = {
    'level': '5',
    'school': 'Enchantment, Evocation',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '1 or more creatures in a 10-foot radius',
    'components': 'V',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 215',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This devious spell distracts the subject creatures by drawing them into an absorbing discussion on topics of interest to them. A chain of responses occurs during the next 11 rounds, with additional saving throws as described later. These responses are conversation (rounds 1–3), possible confusion (rounds 4–6), and then either rage or lamentation (rounds 7–11). All saving throws are affected by the creatures’ Intelligences, as noted later. The subject creatures must be able to understand the language in which the spellcaster speaks.\n&emsp;Upon casting the spell, the wizard begins discussion of some topic germane to the creature or creatures to be affected. Those making a successful saving throw vs. spell are unaffected. Affected creatures immediately begin to converse with the spellcaster, agreeing or disagreeing, all most politely. As long as the spellcaster chooses, he can maintain the spell by conversing with the subject(s). If the caster is attacked or otherwise distracted, the subject creatures do not notice.}}{{style=center1 sheet-spell-center2}}{{cc1-1=bottom}}{{c1-1=**Intelligence**}}{{c2-1=2 or less}}{{c3-1=3–7}}{{c4-1=8–10}}{{c5-1=11–14}}{{c6-1=15+}}{{c1-2=**Saving Throw Modifier**}}{{c2-2=Spell has no effect}}{{c3-2=–1}}{{c4-2=0}}{{c5-2=+1}}{{c6-2=+2}}{{effects2=&emsp;The wizard can leave at any time after the casting and the subject(s) continue on as if the caster were still present. As long as they are not attacked, the creatures ignore all else going on around them, spending their time talking and arguing to the exclusion of other activities. However, when the caster leaves, each subject completes only the stage of the spell that it is currently in, and then the spell is broken.\n&emsp;If the caster maintains the spell for more than three rounds, each affected creature can roll another saving throw vs. spell. Those failing to save wander off in confusion for 1d10+2 rounds, staying away from the spellcaster. Those who make this saving throw continue to talk and roll saving throws for each round that the caster continues the spell, up through the sixth round, to avoid the confusion effect.\n&emsp;If the spell is maintained for more than six rounds, each subject must roll a successful saving throw vs. spell to avoid going into a rage, attacking all other subjects of the spell with intent to kill. This rage lasts for 1d4+1 rounds. Those who successfully save against the rage effect realize that they have been deceived and collapse to the ground, lamenting their foolishness, for 1d4 rounds unless attacked or otherwise disturbed.'
};

wiz5['Leomund\'s Secret Chest'] = {
    'level': '5',
    'school': 'Alteration, Conjuration/Summoning',
    'range': 'Special',
    'duration': '60 days',
    'aoe': 'One chest, about 2 x 2 x 3 feet',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 215',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables a specially constructed chest to be hidden deep within the Ethereal Plane, to be summoned using a small model of the chest. The large chest must be exceptionally well-crafted and expensive, constructed for the caster by master craftsmen. If made principally of wood, it must be ebony, rosewood, sandalwood, teak, or the like, and all of its corner fittings, nails, and hardware must be platinum. If constructed of ivory, the metal fittings of the chest must be gold. If the chest is fashioned from bronze, copper, or silver, its fittings must be electrum or silver. The cost of such a chest is never less than 5,000 gp. Once it is constructed, the wizard must have a tiny replica (of the same materials and perfect in every detail) made, so that the miniature of the chest appears to be a perfect copy. One wizard can have but one pair of these chests at any given time—even *wish* spells do not allow exceptions! The chests themselves are nonmagical, and can be fitted with locks, wards, and so on, just as any normal chest.\n&emsp;While touching the chest and holding the tiny replica, the caster chants the spell. This causes the large chest to vanish into the Ethereal Plane. The chest can contain one cubic feet of material per level of the wizard no matter what its apparent size. Currently [[@{level-wizard}]] cubic feet of material. Living matter makes it 75% likely that the spell fails, so the chest is typically used for securing valuable spell books, magical items, gems, etc. As long as the spellcaster has the small duplicate of the magical chest, he can recall the large one from the Ethereal Plane whenever the chest is desired. If the miniature of the chest is lost or destroyed, there is no way, not even with a *wish* spell, that the large chest can return, although an expedition might be mounted to find it.\n&emsp;While the chest is in the Ethereal Plane, there is a cumulative 1% chance per week that some being finds it. This chance is reset to 1% whenever the chest is recalled and the spell recast to return it to the Ethereal Plane. If the chest is found, the DM must work out the encounter and decide how the being reacts to the chest (for example, it might ignore the chest, fully or partially empty it, or even exchange or add to the items present!).\n&emsp;Whenever the secret chest is brought back to the Prime Material Plane, an ethereal window is opened for a variable amount of time (usually about one turn); the window slowly diminishes in size. When this hole opens between the planes, check for an ethereal encounter to see if a monster is drawn through.\n&emsp;If the large chest is not retrieved before the spell duration lapses, there is a cumulative chance of 5% per day that the chest is lost.'
};

wiz5['Magic Jar'] = {
    'level': '5',
    'school': 'Necromancy',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'A gem or large crystal',
    'reference': 'p. 216',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *magic jar* spell enables the caster to shift his life force into a special receptacle (a gem or large crystal). From there the caster can force an exchange of life forces between the receptacle and another creature, thus enabling the wizard to take over and control the body of another creature, while the life force of the host is confined in the receptacle. The special life force receptacle must be within spell range of the wizard’s body at the time of spellcasting. The wizard’s life force shifts into the receptacle in the round in which the casting is completed, allowing no other actions.\n&emsp;While in the magic jar, the caster can sense and attack any life force within a [[10*[[@{level-wizard}]] ]]-foot radius (on the same plane); however, the exact creature types and relative physical positions cannot be determined. In a group of life forces, the caster can sense a difference of four or more levels/Hit Dice and can determine whether a life force is positive or negative energy.\n&emsp;For example, if two 10th-level fighters are attacking a hill giant and four ogres, the caster could determine that there are three stronger and four weaker life forces within range, all with positive life energy. The caster could try to take over either a stronger or a weaker creature, but he has no control over exactly which creature is attacked.\n&emsp;An attempt to take over a host body requires a full round. It is blocked by a *protection from evil* spell or similar ward. It is successful only if the subject fails a saving throw vs. spell with a special modifier (see following). The saving throw is modified by subtracting the combined Intelligence and Wisdom scores of the target from those of the wizard (Intelligence and Hit Dice in nonhuman or nonhumanoid creatures). This modifier is added to (or subtracted from) the die roll.}}{{style=center1 sheet-spell-center2}}{{c1-1=**Difference**}}{{c2-1=–9 or less}}{{c3-1=–8 to –6}}{{c4-1=–5 to –3}}{{c5-1=–2 to 0}}{{c6-1=+1 to +4}}{{c7-1=+5 to +8}}{{c8-1=+9 to +12}}{{c9-1=+13 or more}}{{c1-2=**Die Adjustment**}}{{c2-2=+4}}{{c3-2=+3}}{{c4-2=+2}}{{c5-2=+1}}{{c6-2=0}}{{c7-2=–1}}{{c8-2=–2}}{{c9-2=–3}}{{effects2=&emsp;A negative score indicates that the wizard has a lower total than the target; thus, the host has a saving throw bonus. Failure to take over the host leaves the wizard’s life force in the magic jar.\n&emsp;If successful, the caster’s life force occupies the host body and the host’s life force is confined in the magic jar receptacle. The caster can call upon rudimentary or instinctive knowledge of the subject creature, but not upon its real or acquired knowledge (i.e., the wizard does not automatically know the language or spells of the creature). The caster retains his own attack rolls, class knowledge and training, and any adjustments due to his Intelligence or Wisdom. If the host body is human or humanoid, and the necessary spell components are available, the wizard can even use his memorized spells. The host body retains its own hit points and physical abilities and properties. The DM decides if any additional modifications are necessary; for example, perhaps clumsiness or inefficiency occurs if the caster must become used to the new form. The alignment of the host or receptacle is that of the occupying life force.\n&emsp;The caster can shift freely from the host to the receptacle if within the [[10*[[@{level-wizard}]] ]]-foot range. Each attempt to shift requires one round. The spell ends when the wizard shifts from the jar to his own body.\n&emsp;A successful *dispel magic* spell cast on the host can drive the caster of the *magic jar* spell back into the receptacle and prevent him from making any attacks for 1d4 rounds plus 1 round per level of the caster of the dispel. The base success chance is 50%, plus or minus 5% per level difference between the casters. A successful *dispel magic* cast against the receptacle forces the occupant back into his own body. If the wizard who cast the *magic jar* is forced back into his own body, the spell ends.\n&emsp;If the host body is slain, the caster returns to the receptacle, if within range, and the life force of the host departs (i.e., it is dead). If the host body is slain beyond the range of the spell, both the host and the caster die.\n&emsp;Any life force with nowhere to go is treated as slain unless recalled by a *raise dead, resurrection,* or similar spell.\n&emsp;If the body of the caster is slain, his life force survives if it is in either the receptacle or the host. If the receptacle is destroyed while the caster’s life force occupies it, the caster is irrevocably slain.'
};

wiz5['Major Creation'] = {
    'level': '5',
    'school': 'Illusion/Phantasm',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'At least a tiny piece of matter of the same type as the item he plans to create—a bit of twisted hemp to create rope, a chip of stone to create a boulder, and so on',
    'reference': 'p. 217',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Like the *minor creation* spell, the *major creation* spell enables the wizard to pull wisps of material from the Demiplane of Shadow to create an item of nonliving, vegetable nature—soft goods, rope, wood, etc. The wizard can also create mineral objects—stone, crystal, metal, etc. The item created cannot exceed 1 cubic foot per level of the spellcaster in volume. Currently [[@{level-wizard}]] cubic feet. The duration of the created item varies with its relative hardness and rarity:}}{{style=center2}}{{c1-1=Vegetable matter}}{{c2-1=Stone or crystal}}{{c3-1=Precious metals}}{{c4-1=Gems}}{{c5-1=Mithral&ast;}}{{c6-1=Adamantite}}{{c1-2=[[2*[[@{level-wizard}]] ]] hours}}{{c2-2=[[@{level-wizard}]] hours}}{{c3-2=[[2*[[@{level-wizard}]] ]] turns}}{{c4-2=[[@{level-wizard}]] turns}}{{c5-2=[[2*[[@{level-wizard}]] ]] rounds}}{{c6-2=[[@{level-wizard}]] rounds}}{{effects2=&ast; Includes similar rare metals.\n\n&emsp;Attempting to use any of these as material components in a spell will cause the spell to fail.'
};

wiz5['Monster Summoning III'] = {
    'level': '5',
    'school': 'Conjuration/Summoning',
    'range': 'Special',
    'duration': '[[4+[[@{level-wizard}]] ]] rounds',
    'aoe': '50-yard radius',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': 'A tiny bag and a small candle',
    'reference': 'p. 217',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is much like the 3rd-level spell *monster summoning I,*  except that this spell summons [[1d4]] 3rd-level monsters. These appear within the spell’s area of effect and attack the caster’s opponents, until either he commands them to cease, the spell duration expires, or the monsters are slain. These creatures do not check morale and vanish when slain. If no opponent exists to fight, and the wizard can communicate with them, the summoned monsters can perform other services for the wizard.'
};

wiz5['Mordenkainen\'s Faithful Hound'] = {
    'level': '5',
    'school': 'Conjuration/Summoning',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A tiny silver whistle, a  piece of bone, and a thread',
    'reference': 'p. 217',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard summons up a phantom watchdog that only he can see. He may then command it to perform as guardian of a passage, room, door, or similar space or portal. The phantom watchdog immediately commences a loud barking if any creature larger than a cat approaches the place it guards. As the faithful hound is able to detect invisible creatures and ward against the approach of ethereal creatures, it is an excellent guardian. It does not react to illusions that are not at least quasi-real.\n&emsp;If the intruding creature exposes its back to the watchdog, the dog delivers a vicious attack as if it were a 10-Hit Dice monster, striking for 3d6 points of damage. It is able to hit opponents of all types, even those normally subject only to magical weapons of +3 or greater. Creatures without backs (for example, ochre jellies) are not attacked. The faithful hound cannot be attacked, but it can be dispelled. The spell lasts for a maximum of 1 hour plus half an hour per caster level ([[1+(0.5*[[@{level-wizard}]])]] hours), but once it is activated by an intruder, it lasts only one round per caster level ([[@{level-wizard}]] rounds). If the spellcaster is ever more than 30 yards distant from the area that the watchdog guards, the spell ends.'
};

wiz5['Passwall'] = {
    'level': '5',
    'school': 'Alteration',
    'range': '30 yards',
    'duration': '[[6+[[@{level-wizard}]] ]] turns',
    'aoe': '5 × 8 × 10 feet',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A pinch of sesame seeds',
    'reference': 'p. 217',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *passwall* spell enables the spellcaster to open a passage through wooden, plaster, or stone walls, but not other materials. The spellcaster and any associates can simply walk through. The spell causes a 5-foot wide × 8-foot high × 10-foot deep opening. Several of these spells can form a continuing passage so that very thick walls can be pierced. If dispelled, the passwall closes away from the dispelling caster, ejecting those in the passage.'
};

wiz5['Seeming'] = {
    'level': '5',
    'school': 'Illusion/Phantasm',
    'range': '10-foot radius',
    'duration': '12 hours',
    'aoe': '[[floor([[@level-wizard}]]/2)]] persons',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 217',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to alter the appearance of one person for every two levels of experience he has attained. The change includes clothing and equipment. The caster can make the recipients appear as any generally man-shaped bipedal creature, each up to 1 foot shorter or taller than his normal height, and thin or fat or in between. All those affected must resemble the same general type of creature: human, orc, ogre, etc. Each remains a recognizable individual. The effect fails for an individual if the illusion chosen by the caster cannot be accomplished within the spell parameters (for example, a halfling could not be made to look like a centaur, but he might be made to look like a short, young ogre). Unwilling persons receive saving throws vs. spell to avoid the effect. Affected persons resume their normal appearances if slain. The spell is not precise enough to duplicate the appearance of a specific individual.'
};

wiz5['Sending'] = {
    'level': '5',
    'school': 'Evocation',
    'range': 'Unlimited',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'Two tiny cylinders, each with one open end, connected by a short piece of fine copper wire',
    'reference': 'p. 218',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster can contact a single creature with whom he is familiar and whose name and appearance are known. If the creature in question is not on the same plane of existence as the spellcaster, there is a base 5% chance that the sending does not arrive. Local conditions on other planes may worsen this chance considerably, at the option of the DM. The sending, if successful, can be understood even by a creature with an Intelligence as low as 1 (animal intelligence).\n&emsp;The wizard can send a short message of 25 words or less to the  recipient; the recipient can answer in like manner immediately. Even if the sending is received, the subject creature is not obligated to act upon it in any manner.'
};

wiz5['Shadow Door'] = {
    'level': '5',
    'school': 'Illusion/Phantasm',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'S',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 218',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard creates the illusion of a door. The illusion also permits the wizard to appear to step through this “door” and disappear. In reality, he has darted aside and can flee, totally invisible, for the spell duration. Creatures viewing this are deluded into seeing or entering an empty 10-foot × 10-foot room if they open the “door.” A *true seeing* spell, a **gem of seeing,* or similar magical means can discover the wizard. Certain high Hit Dice monsters might also notice the wizard (see the *invisibility* spell), but only if making an active attempt to do so.'
};

wiz5['Shadow Magic'] = {
    'level': '5',
    'school': 'Illusion/Phantasm',
    'range': '[[50+(10*[[@{level-wizard}]])]] yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 218',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *shadow magic* spell enables the wizard to tap energy from the Demiplane of Shadow to cast a quasi-real wizard evocation spell of 3rd level or less. For example, this spell can be *magic missile, fireball, lightning bolt,* or so on, and has normal effects upon creatures in the area of effect if they fail their saving throws vs. spell. Thus, a creature failing to save against a *shadow magic* fireball must roll another saving throw. If the latter roll is successful, the creature suffers half the normal fireball damage; if the roll is not successful, the creature suffers full normal fireball damage. If the first saving throw was successful, the shadow magic nature is detected and only 20% of the rolled damage is received (rounding down below fractions below 0.4 and rounding up fractions of 0.4 and above).'
};

wiz5['Stone Shape'] = {
    'level': '5',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '[[@{level-wizard}]] cube feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Soft clay that must be worked into roughly the desired shape of the stone object and then touched to the stone when the spell is uttered',
    'reference': 'p. 218',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard can form an existing piece of stone into a shape that suits his purposes. For example, the wizard can make a stone weapon, a special trapdoor, an idol, etc. This spell can also enable the spellcaster to reshape a stone door so as to escape imprisonment, providing the volume of stone involved is within the limits of the area of effect. While the caster can thus create stone doors and coffers, the fineness of detail is not great. If the construction involves small moving parts, there is a 30% chance they do not function.'
};

wiz5['Summon Shadow'] = {
    'level': '5',
    'school': 'Conjuration/Summoning, Necromancy',
    'range': '10 yards',
    'duration': '[[1+[[@{level-wizard]] ]] rounds',
    'aoe': '10-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A bit of smoky quartz',
    'reference': 'p. 218',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard conjures up one shadow (see the *MONSTROUS MANUAL*) for every three levels of experience he has attained. Currently [[floor([[@level-wizard}]]/3)]] shadows. These monsters are under the control of the spellcaster and attack his enemies on command. The shadows remain until slain, turned, or the spell duration expires.'
};

wiz5['Telekinesis'] = {
    'level': '5',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '[[10*[[@{level-wizard}]] ]] yards',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 218',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to move objects by concentrating on moving them mentally. The spell can provide either a gentle, sustained force or a single short, violent thrust.\n&emsp;A sustained force enables the wizard to move a weight of up to 25 pounds a distance up to 20 feet per round. The spell lasts two rounds, plus one round per caster level. Currently  [[2+[[@{level-wizard}]] ]] rounds. The weight can be moved vertically, horizontally, or both. An object moved beyond the caster’s range falls or stops. If the caster ceases concentration for any reason, the object falls or stops. The object can be telekinetically manipulated as if with one hand. For example, a lever or rope can be pulled, a key can be turned, an object rotated and so on, if the force required is within the weight limitation. The caster might even be able to untie simple knots, at the discretion of the DM.\n&emsp;Alternatively, the spell energy can be expended in a single round. The caster can hurl one or more objects within range, and within a 10-foot cube, directly away from himself at high speed, to a distance of up to 10 feet per caster level. Currently [[10*[[@{level-wizard}]] ]] feet. This is subject to a maximum weight of 25 pounds per caster level. Currently [[25*[[@{level-wizard}]] ]] pounds. Damage caused by hurled objects is decided by the DM, but cannot exceed 1 point of damage per caster level. Currently [[@{level-wizard}]] points of damage. Opponents who fall within the weight capacity of the spell can be hurled, but they are allowed a saving throw vs. spell to avoid the effect. Furthermore, those able to employ as simple a counter-measure as an *enlarge* spell, for example (thus making the body weight go over the maximum spell limit), can easily counter the spell. The various *Bigby’s hand* spells also counter this spell.'
};

wiz5['Teleport'] = {
    'level': '5',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 219',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is used, the wizard instantly transports himself, along with a certain amount of additional weight that is on or being touched by the spellcaster, to a well-known destination. Distance is not a factor, but interplanar travel is not possible by means of a *teleport* spell. The spellcaster is able to teleport a maximum weight of 250 pounds, plus 150 pounds for each level of experience above the 10th (current maximum weight is [[250+150*({[[@{level-wizard}]]-10,0}kh1)]] pounds) (a 13th-level wizard can teleport up to 700 pounds). If the destination area is very familiar to the wizard (he has a clear mental picture due to previous proximity to and study of the area), it is unlikely that there is any error in arriving, although the caster has no control over his facing upon arrival. Lesser known areas (those seen only magically or from a distance) increase the probability of error. Unfamiliar areas present considerable peril (see table).}}{{style=center2 sheet-spell-center3 sheet-spell-center4 sheet-spell-bottom2 sheet-spell-bottom3 sheet-spell-bottom4}}{{c1-1= }}{{c2-1=**Destination Is:**}}{{c3-1=Very familiar}}{{c4-1=Studied carefully}}{{c5-1=Seen casually}}{{c6-1=Viewed once}}{{c7-1=Never seen}}{{cs1-2=3}}{{c1-2=**Probability of Teleporting:**}}{{c2-2=**High**}}{{c3-2=01–02}}{{c4-2=01–04}}{{c5-2=01–08}}{{c6-2=01–16}}{{c7-2=01–32}}{{c2-3=**On Target**}}{{c3-3=03–99}}{{c4-3=05–98}}{{c5-3=09–96}}{{c6-3=17–92}}{{c7-3=33–84}}{{c2-4=**Low**}}{{c3-4=00}}{{c4-4=99–00}}{{c5-4=97–00}}{{c6-4=93–00}}{{c7-4=85–00}}{{effects2=&emsp;Teleporting high means the wizard arrives 10 feet above the ground for every 1% he is below the lowest “On Target” probability; this could be as high as 320 feet if the destination area was never seen. Any low result means the instant death of the wizard if the area into which he teleports is solid. A wizard cannot teleport to an area of empty space—a substantial surface must be there, whether a wooden floor, a stone floor, natural ground, etc. Areas of strong physical or magical energies may make teleportation more hazardous or even impossible.'
};

wiz5['Transmute Rock to Mud'] = {
    'level': '5',
    'school': 'Alteration (Reversible)',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '[[20*[[@{level-wizard}]] ]]-foot cube',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'Clay and water (or sand, lime, and water for the reverse)',
    'reference': 'p. 219',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell turns natural rock of any sort into an equal volume of mud. The depth of the mud can never exceed half its length or breadth. If it is cast upon a rock, for example, the rock affected collapses into mud. Creatures unable to levitate, fly, or otherwise free themselves from the mud sink at the rate of 10 feet per round and suffocate, except for lightweight creatures that could normally pass across such ground. Brush thrown atop the mud can support creatures able to climb on top of it, with the amount of brush required subject to the DM’s discretion. The mud remains until a *dispel magic* spell or a reverse of this spell, *mud to rock,* restores its substance—but not necessarily its form. Evaporation turns the mud to normal dirt, at the rate of 1d6 days per 10 cubic feet. The *mud to rock* reverse can harden normal mud into soft stone (sandstone or similar mineral) permanently unless magically changed.'
};

wiz5['Wall of Force'] = {
    'level': '5',
    'school': 'Evocation',
    'range': '30 yards',
    'duration': '1 turn + [[@{level-wizard}]] rounds',
    'aoe': '[[10*[[@{level-wizard}]] ]]-foot square',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A pinch of powdered diamond worth 5,000 gp',
    'reference': 'p. 219',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *wall of force* spell creates an invisible barrier in the locale desired by the caster, up to the spell’s range. The wall of force cannot move and is totally unaffected by most spells, including *dispel magic*. However, a *disintegrate* spell will immediately destroy it, as will a *rod of cancellation* or a *sphere of annihilation.* Likewise, the wall of force is not affected by blows, missiles, cold, heat, electricity, etc. Spells and breath weapons cannot pass through it in either direction, although *dimension door, teleport,* and similar effects can bypass the barrier.\n&emsp;The wizard can, if desired, form the wall into a spherical shape with a radius of up to [[@{level-wizard}]] feet or an open hemispherical shape with a radius of [[1.5*[[@{level-wizard}]] ]] feet. The wall of force must be continuous and unbroken when formed; if its surface is broken by any object or creature, the spell fails. The caster can end the spell on command.'
};

wiz5['Wall of Iron'] = {
    'level': '5',
    'school': 'Evocation',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '[[15*[[@{level-wizard}]] ]] square feet or special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A small piece of sheet iron',
    'reference': 'p. 220',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard causes a vertical iron wall to spring into being. This wall can be used to seal off a passage or close a breach, for the wall inserts itself into any surrounding nonliving material if its area is sufficient to do so. The wall of iron is 1/2-inch thick per level of experience of the spellcaster. Currently [[0.5*[[@{level-wizard}]] ]] inches thick. The wizard is able to create an iron wall of up to 15 square feet per experience level, currently [[15*[[@{level-wizard}]] ]] square feet; thus, a 12th-level wizard can create a wall of iron with an area of 180 square feet. The wizard can double the wall’s area by halving its thickness.\n&emsp;If the caster desires, the wall can be created vertically resting on a flat surface, so that it can be tipped over to fall on and crush any creature beneath it. The wall is 50% likely to tip in either direction. This chance can be modified by a force of not less than 30 Strength and 400 pounds mass—each pound over 400 or Strength point over 30 alters the chance by 1% in favor of the stronger side. Creatures with room to flee the falling wall may do so by making successful saving throws vs. death. Those who fail are killed. Huge and gargantuan creatures cannot be crushed by the wall.\n&emsp;The wall is permanent, unless successfully dispelled, but it is subject to all forces a normal iron wall is subject to—rust, perforation, etc.'
};

wiz5['Wall of Stone'] = {
    'level': '5',
    'school': 'Evocation',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A small block of granite',
    'reference': 'p. 220',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a wall of granite rock that merges into adjoining rock surfaces. It is typically employed to close passages, portals, and breaches against opponents. The wall of stone is 0.25 inch thick and up to 20 square feet per level of experience of the wizard casting the spell. Currently [[0.25*[[@{level-wizard}]] ]] inches thick and up to [[20*[[@{level-wizard}]] ]] square feet. Thus, a 12th-level wizard can create a wall of stone 3 inches thick and up to 240 square feet in surface area (a 12-foot-wide and 20-foot-high wall, for example, to completely close a 10-foot × 16-foot passage). The wall created need not be vertical, nor rest upon any firm foundation (see the *wall of iron* spell); however, it must merge with and be solidly supported by existing stone. It can be used to bridge a chasm, for instance, or as a ramp. For this use, if the span is more than 20 feet, the wall must be arched and buttressed. This requirement reduces the area of effect by half. Thus, a 20th-level caster can create a span with a surface area of 200 square feet. The wall can be crudely shaped to allow crenelations, battlements, and so forth by likewise reducing the area. The stone is permanent unless destroyed by a *dispel magic* or *disintegrate* spell, or by normal means such as breaking or chipping.'
};

const wiz6 = {};
wiz6['Antimagic Shell'] = {
    'level': '6',
    'school': 'Abjuration',
    'range': '0',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '[[@{level-wizard}]] foot diameter',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 220',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard surrounds himself with an invisible barrier that moves with him. The space within this barrier is totally impervious to all magic and magical spell effects, thus preventing the passage of spells or their effects. Likewise, it prevents the functioning of any magical items or spells within its confines. The area is also impervious to breath weapons, gaze or voice attacks, and similar special attack forms.\n&emsp;The antimagic shell also hedges out charmed, summoned, or conjured creatures. It cannot, however, be forced against any creature that it would keep at bay; any attempt to do so creates a discernible pressure against the barrier, and continued pressure will break the spell. Normal creatures (a normally encountered troll rather than a conjured one, for instance) can enter the area, as can normal missiles. Furthermore, while a magical sword does not function magically within the area, it is still a sword. Note that creatures on their home plane are normal creatures there. Thus, on the Elemental Plane of Fire, a randomly encountered fire elemental cannot be kept at bay by this spell. Artifacts, relics, and creatures of demigod or higher status are unaffected by mortal magic such as this.\n&emsp;Should the caster be larger than the area enclosed by the barrier, parts of his person may be considered exposed, at the DM’s option. A *dispel magic* spell does not remove the spell; the caster can end it upon command.'
};

wiz6['Bigby\'s Forceful Hand'] = {
    'level': '6',
    'school': 'Evocation',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A glove',
    'reference': 'p. 221',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Bigby’s forceful hand* is a more powerful version of *Bigby’s interposing hand.* It creates a man-sized (5 feet) to gargantuan-sized (21 feet) hand that places itself between the spellcaster and a chosen opponent. This disembodied hand then moves to remain between the two, regardless of what the spellcaster does or how the opponent tries to get around it. However, the forceful hand also pushes on the opponent. This force can push away a creature weighing 500 pounds or less, slow movement to 10 feet per round if the creature weighs between 500 and 2,000 pounds, or slow movement by 50% if the creature weighs more than 2,000 pounds.\n&emsp;A creature pushed away is pushed to the range limit, or until pressed against an unyielding surface. The hand itself inflicts no damage. The forceful hand has an Armor Class of 0, has as many hit points as the caster in full health, currently [[@{HP|max}]] hit points, and vanishes when destroyed. The caster can cause it to retreat (to release a trapped opponent, for example) or dismiss it on command.'
};

wiz6['Chain Lightning'] = {
    'level': '6',
    'school': 'Evocation',
    'range': '[[40+5*[[@{level-wizard}]] ]] yards',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': '½',
    'materials': 'A bit of fur, a piece of amber, glass, or crystal rod, and one silver pin for each experience level of the caster. Currently [[@{level-wizard}]] silver pins',
    'reference': 'p. 221',
    'book': 'PHB',
    'damage': 'Strikes #1 for [[ [[{[[@{level-wizard}]],12}kl1]]d6]]}}{{d2t=[[ [[@{level-wizard}]]-1]]}}{{d2=, strikes #2 for [[ [[{[[@{level-wizard}]]-1,11}kl1]]d6]]}}{{d3t=[[ [[@{level-wizard}]]-2]]}}{{d3=, strikes #3 for [[ [[{[[@{level-wizard}]]-2,10}kl1]]d6]]}}{{d4t=[[ [[@{level-wizard}]]-3]]}}{{d4=, strikes #4 for [[ [[{[[@{level-wizard}]]-3,9}kl1]]d6]]}}{{d5t=[[ [[@{level-wizard}]]-4]]}}{{d5=, strikes #5 for [[ [[{[[@{level-wizard}]]-4,8}kl1]]d6]]}}{{d6t=[[ [[@{level-wizard}]]-5]]}}{{d6=, strikes #6 for [[ [[{[[@{level-wizard}]]-5,7}kl1]]d6]]}}{{d7t=[[ [[@{level-wizard}]]-6]]}}{{d7=, strikes #7 for [[ [[{[[@{level-wizard}]]-6,6}kl1]]d6]]}}{{d8t=[[ [[@{level-wizard}]]-7]]}}{{d8=, strikes #8 for [[ [[{[[@{level-wizard}]]-7,5}kl1]]d6]]}}{{d9t=[[ [[@{level-wizard}]]-8]]}}{{d9=, strikes #9 for [[ [[{[[@{level-wizard}]]-8,4}kl1]]d6]]}}{{d10t=[[ [[@{level-wizard}]]-9]]}}{{d10=, strikes #10 for [[ [[{[[@{level-wizard}]]-9,3}kl1]]d6]]}}{{d11t=[[ [[@{level-wizard}]]-10]]}}{{d11=, strikes #11 for [[ [[{[[@{level-wizard}]]-10,2}kl1]]d6]]}}{{d12t=[[ [[@{level-wizard}]]-11]]}}{{d12=, strikes #12 for [[ [[{[[@{level-wizard}]]-11,1}kl1]]d6]]',
    'damage-type': 'Electric',
    'healing': '',
    'effect': 'This spell creates an electrical discharge that begins as a single stroke of lightning, 2½ feet wide, commencing from the fingertips of the caster. Unlike a *lightning bolt* spell, chain lightning strikes one object or creature initially, then arcs to a series of other objects or creatures within range, losing energy with each jump.\n&emsp;The bolt initially inflicts 1d6 points of damage per level of the caster, to a maximum of 12d6 (half damage if the object or creature rolls a successful saving throw vs. spell). After the first strike, the lightning arcs to the next nearest object or creature. Each jump reduces the strength of the lightning by 1d6. Each creature or magical object hit receives a saving throw vs. spell. Success on this save indicates the creature suffers only half damage from the bolt.\n&emsp;The chain can strike as many times (including the first object or creature) as the spellcaster has levels, although each creature or object can be struck only once. Thus, a bolt cast by a 12th-level wizard can strike up to 12 times, causing less damage with each strike. The bolt continues to arc until it has struck the appropriate number of objects or creatures, until it strikes an object that grounds it (interconnecting iron bars of a large cell or cage, a large pool of liquid, etc.), or until there are no more objects or creatures to strike.\n&emsp;Direction is not a consideration when plotting chain lightning arcs. Distance is a factor—an arc cannot exceed the spell’s range. If the only possible arc is greater than the spell’s range, the stroke fades into nothingness. Creatures immune to electrical attack can be struck, even though no damage is taken. Note that it is possible for the chain to arc back to the caster!'
};

wiz6['Conjure Animals'] = {
    'level': '6',
    'school': 'Conjuration/Summoning',
    'range': 'Special',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '30 yard radius',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 221',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *conjure animals* spell enables the wizard to magically create one or more mammals to attack his opponents. The total Hit Dice of the mammals cannot exceed twice his level (currently [[ [[@{level-wizard}]]*2]] Hit Dice), if determined randomly, or his level (currently [[@{level-wizard}]] Hit Dice) if a specific animal type is requested (see the *DUNGEON MASTER Guide*). Thus, a wizard of 12th level could randomly conjure two mammals with 12 Hit Dice, four with 6 Hit Dice each, six with 4 Hit Dice each, eight with 3 Hit Dice each, twelve with 2 Hit Dice each, or 24 with 1 Hit Die each. Count every +1 hit point bonus of a creature as 1⁄4 of a Hit Die; thus, a creature with 4+3 Hit Dice equals a 43⁄4 Hit Dice creature. The conjured animal(s) remain for one round for each level of the conjuring wizard, or until slain. They follow the caster’s verbal commands. Conjured animals unfailingly attack the wizard’s opponents, but they resist being used for any other purpose.'
};

wiz6['Contingency'] = {
    'level': '6',
    'school': 'Evocation',
    'range': '0',
    'duration': '[[@{level-wizard}]] days',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'In addition to those of the companion spell, 100 gp worth of quicksilver and an eyelash of an ogre mage, ki-rin, or similar spell-using creature; in addition, the spell requires a statuette of the wizard carved from elephant ivory (which is not destroyed, though it is subject to wear and tear), which must be carried on the person of the spellcaster for the contingency spell to perform its function when called upon',
    'reference': 'p. 221',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to place another spell upon his person so that the latter spell will come into effect under the conditions dictated during the casting of the *contingency* spell. The *contingency* spell and the spell it is to bring into effect are cast at the same time (the one-turn casting time indicated is the total for both castings).\n&emsp;The spell to be brought into effect by the prescribed contingency must be one that affects the wizard’s person (*feather fall, levitation, fly, feign death,* etc.) and be of a spell level no higher than 1⁄3 of the caster’s experience level (rounded down), but not higher than the 6th spell level. Currently up to [[{floor([[@{level-wizard}]]/3),6}kl1]] level spells.}}{{style=center sheet-spell-bottom}}{{c1-1=**Caster Level**}}{{c2-1=12–14}}{{c3-1=15–17}}{{c4-1=18+}}{{c1-2=**Contingency Spell Level**}}{{c2-2=4th}}{{c3-2=5th}}{{c4-2=6th}}{{effects2=&emsp;Only one *contingency* spell can be placed on the spellcaster at any one time; if a second is cast, the first one (if still active) is cancelled. The conditions needed to bring the spell into effect must be clear, although they can be rather general. For example, a *contingency* spell cast with an *airy water* spell might prescribe that any time the wizard is plunged into or otherwise engulfed in water or similar liquid, the *airy water* spell will instantly come into effect. Or a contingency could bring a *feather fall* spell into effect any time the wizard falls more than 2 feet. In all cases, the contingency immediately brings into effect the second spell, the latter being “cast” instantaneously when the prescribed circumstances occur. Note that if complicated or convoluted conditions are prescribed, the whole spell complex (the *contingency* spell and the companion magic) may fail when called upon.'
};

wiz6['Control Weather'] = {
    'level': '6',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[4d6]] hours',
    'aoe': '[[4d4]] square miles',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'Burning incense and bits of earth and wood mixed in water',
    'reference': 'p. 222',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *control weather* spell enables a wizard to change the weather in the local area. The spell affects the weather for 4d6 hours in an area of 4d4 square miles. It requires one turn to cast the spell, and an additional [[1d4]] turns for the weather conditions to occur. The current weather conditions are decided by the DM, depending on the climate and season. Weather conditions have three components: precipitation, temperature, and wind. The spell can change these conditions according to the following chart.}}{{c1-1=**Precipitation**}}{{c2-1=CLEAR WEATHER}}{{c3-1=Very clear}}{{c4-1=Light clouds or hazy}}{{c5-1=PARTLY CLOUDY}}{{c6-1=Clear weather}}{{c7-1=Cloudy}}{{c8-1=Mist/light rain/small hail}}{{c9-1=Sleet/light snow}}{{c10-1=CLOUDY}}{{c11-1=Partly cloudy}}{{c12-1=Deep clouds}}{{c13-1=Fog}}{{c14-1=Heavy rain/large hail}}{{c15-1=Driving sleet/heavy snow}}{{c16-1=Gale}}{{c1-2=**Temperature**}}{{c2-2=HOT}}{{c3-2=Sweltering heat}}{{c4-2=Warm}}{{c5-2=WARM}}{{c6-2=Hot}}{{c7-2=Cool}}{{c8-2=COOL}}{{c9-2=Warm}}{{c10-2=Cold}}{{c11-2=COLD}}{{c12-2=Cool}}{{c13-2=Arctic cold}}{{c14-2=Storm}}{{c15-2=STORM}}{{c16-2=Hurricane–typhoon}}{{c1-3=**Wind**}}{{c2-3=CALM}}{{c3-3=Dead calm}}{{c4-3=Light wind}}{{c5-3=Moderate wind}}{{c6-3=MODERATE WIND}}{{c7-3=Calm}}{{c8-3=Strong wind}}{{c9-3=STRONG WIND}}{{c10-3=Moderate wind}}{{c11-3=Gale}}{{c12-3=GALE}}{{c13-3=Strong wind}}{{effects2=&emsp;The upper-cased headings represent the existing weather conditions. The small headings beneath each large heading are the new conditions to which the caster can change the existing conditions. Furthermore, the caster can control the direction of the wind. For example, a day that is clear and warm with moderate wind can be controlled to become hazy, hot, and calm. Contradictions are not possible—fog and strong wind, for example. Multiple *control weather* spells can be used only in succession.\n&emsp;Obviously, this spell functions only in areas where there are appropriate climatic conditions.'
};

wiz6['Death Fog'] = {
    'level': '6',
    'school': 'Alteration, Evocation',
    'range': '30 yards',
    'duration': '[[1d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '[[2*[[@{level-wizard}]] ]] 10-foot cubes',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A pinch of dried and powdered peas, powdered animal hoof, and strong acid of any sort (including highly distilled vinegar or acid crystals), which must be obtained from an alchemist',
    'reference': 'p. 222',
    'book': 'PHB',
    'damage': 'Special',
    'damage-type': 'acid',
    'healing': '',
    'effect': 'The casting of a *death fog* spell creates an area of solid fog that has the additional property of being highly acidic. The vapors are deadly to living things, so that vegetation exposed to them will die—grass and similar small plants in two rounds, bushes and shrubs in four, small trees in eight, and large trees in 16 rounds. Animal life not immune to acid suffers damage according to the length of time it is exposed to the vapors of a death fog, as follows:\n\n&emsp;1st round: 1 point\n&emsp;2nd round: 2 points\n&emsp;3rd round: 4 points\n&emsp;4th and each succeeding round: 8 points\n\n&emsp;The death fog otherwise resembles the 2nd-level *fog cloud* spell: rolling, billowing vapors that can be moved only by a very strong wind. Any creature attempting to move through the death fog progresses at a rate of 1 foot per unit of normal movement rate per round. A *gust of wind* spell cannot affect it, but a fireball, flame strike, or wall of fire can burn it away in a single round.'
};

wiz6['Death Spell'] = {
    'level': '6',
    'school': 'Necromancy',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Instantaneous',
    'aoe': '[[30*[[@{level-wizard}]] ]-foot cube',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'C crushed black pearl with a minimum value of 1,000 gp',
    'reference': 'p. 222',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *death spell* is cast, it snuffs out the life forces of creatures in the area of effect instantly and irrevocably. Such creatures cannot be raised or resurrected, but an individual slain in this manner might be brought back via a *wish.* The number of creatures that can be slain is a function of their Hit Dice.}}{{style=center sheet-spell-bottom}}{{c1-1=**Maximum # of**\n**Creatures’ Hit Dice**}}{{c2-1=Under 2}}{{c3-1=2 to 4}}{{c4-1=4+1 to 6+3}}{{c5-1=6+4 to 8+3}}{{c1-2=**Creatures Affected**}}{{c2-2=4d20}}{{c3-2=2d20}}{{c4-2=2d4}}{{c5-2=1d4}}{{c7-1=**Creatures’ Hit Dice**}}{{cs6-1=2}}{{cc6-1=justify}}{{c6-1=\n&emsp;If creatures of differing Hit Dice are attacked with a death spell, roll the dice (4d20) to determine how many creatures of under 2 Hit Dice are affected. If the number rolled is greater than the actual number of sub-2 Hit Dice creatures, apply the remainder of the roll to the higher Hit Dice creatures by consulting the following table.\n\n}}{{c8-1=Under 2}}{{c9-1=2 to 4}}{{c10-1=4+1 to 6+3}}{{c11-1=6+4 to 8+3}}{{c7-2=**Conversion Factor (CF)**}}{{c8-2=1}}{{c9-2=2}}{{c10-2=10}}{{c11-2=20}}{{effects2=&emsp;In other words, from the 4d20 roll subtract the number of creatures of less than 2 Hit Dice (these creatures die). If there are any remaining points from the 4d20 roll, subtract 2 for each creature of 2 to 4 Hit Dice (these creatures also die). If this still doesn’t use up all the 4d20 roll, subtract 10 for each creature of 4+1 to 6+3 Hit Dice, and so on. Stop when all the creatures are dead, all the 4d20 roll is used up, or the remainder is less than half the CF of any remaining creatures. (If the remainder is one-half or more of the CF of a creature, that creature dies.)\n&emsp;For example, a mixed group of 20 goblins, eight gnolls, and four ogres, led by a hill giant, are caught in the area of a *death spell*. The 4d20 roll gives a total of 53 points; 20 of this eliminates the goblins (20 × 1 CF), 16 kills the gnolls (8 × 2 CF), and the remaining 17 kills two ogres (10 points to kill one ogre, and the remaining 7 points are enough to kill one more ogre). The other two ogres and the hill giant are unharmed.\n&emsp;A *death spell* does not affect lycanthropes, undead creatures, or creatures from planes other than the Prime Material.'
};

wiz6['Demishadow Magic'] = {
    'level': '6',
    'school': 'Illusion/Phantasm',
    'range': '[[60+[[@{level-wizard}]]*10]] yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 223',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to the 5th-level *shadow magic* spell, but this spell enables the casting of partially real 4th- and 5th level evocations (*cone of cold, wall of fire, wall of ice, cloudkill,* etc.). If recognized as demishadow magic (if a saving throw vs. spell is successful), damaging spells inflict only 40% of normal damage, with a minimum of 2 points per die of damage. A demishadow magic cloudkill slays creatures with fewer than 2 Hit Dice and inflicts 1d2 points of damage per round.'
};

wiz6['Disintegrate'] = {
    'level': '6',
    'school': 'Alteration',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Instantaneous',
    'aoe': '1 creature or 10 x 10 x 10 foot cube',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Negate',
    'materials': 'A lodestone and a pinch of dust',
    'reference': 'p. 223',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes matter to vanish. It affects even matter (or energy) of a magical nature, such as Bigby’s forceful hand, but not a globe of invulnerability or an antimagic shell. Disintegration is instantaneous, and its effects are permanent. Any single creature can be affected, even undead. Nonliving matter, up to a 10-foot × 10-foot × 10-foot cube, can be obliterated by the spell. The spell creates a thin, green ray that causes physical material touched to glow and vanish, leaving traces of fine dust. Creatures that successfully save vs. spell have avoided the ray (material items have resisted the magic) and are not affected. Only the first creature or object struck can be affected.'
};

wiz6['Enchant an Item'] = {
    'level': '6',
    'school': 'Enchantment, Invocation',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 item',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'Negate',
    'materials': 'Special',
    'reference': 'p. 223',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This is a spell that must be used by a wizard planning to create a magical item. The *enchant an item* spell prepares the object to accept the magic. The item must meet the following tests: 1) it must be in sound and undamaged condition; 2) the item must be the finest possible, considering its nature, i.e., crafted of the highest quality material and with the finest workmanship; and 3) its cost or value must reflect the second test, and in most cases the item must have a raw-materials cost in excess of 100 gp. With respect to requirement 3, it is not possible to apply this test to items such as ropes, leather goods, cloth, and pottery not normally embroidered, bejeweled, tooled, carved, or engraved. If such work or materials can be added to an item without weakening or harming its normal functions, however, these are required for the item to be enchanted.\n&emsp;The wizard must have access to a workshop or laboratory, properly equipped and from which contaminating magic can be screened. Any magical item not related to the fabrication process (such as most protective devices) and within 30 feet of the materials is a source of contaminating magic and will spoil the process.\n&emsp;The item to be prepared must be touched by the spellcaster. This touching must be constant and continual during the casting time, which is a base 16 hours plus an additional 8d8 hours (current work time [[16+8d8]] hours) (as the wizard may never work more than eight hours per day, and haste or any other spells will not alter the time required in any way, this effectively means that casting time for this spell is two days + 1d8 days). All work must be uninterrupted, and during rest periods the item being enchanted must never be more than 1 foot distant from the spellcaster; if it is, the whole spell is spoiled and must be begun again. (Note that during rest periods absolutely no other form of magic can be performed, and the wizard must remain quiet and in isolation or the enchantment is ruined.)\n&emsp;At the end of the spell, the caster will know that the item is ready for the final test. He will then pronounce the final magical syllable, and if the item makes a saving throw (which is exactly the same as that of the wizard) vs. spell, the spell is completed. The spellcaster’s saving throw bonuses also apply to the item, up to +3. A result of 1 on the 1d20 roll always results in failure, regardless of modifications. Once the spell is finished, the wizard can begin to place the desired spell upon the item. The spell he plans to place must be cast within 24 hours or the preparatory spell fades, and the item must be enchanted again.\n&emsp;Each spell subsequently cast upon an object bearing an *enchant an item* spell requires 2d4 hours per spell level of the magic being cast. Again, during casting the item must be touched by the wizard, and during the rest periods it must always be within 1 foot of his person. This procedure holds true for any additional spells placed upon the item, and each successive spell must be begun within 24 hours of the last, even if the prior spell failed.\n&emsp;No magic placed on an item is permanent unless a *permanency* spell is used as a finishing touch. This always runs a 5% risk of draining 1 point of Constitution from the wizard casting the spell. Also, while it is possible to tell when the basic spell (*enchant an item*) succeeds, it is not possible to tell if successive castings actually work, for each must make the same sort of saving throw as the item itself made. Naturally, an item that is charged—a rod, staff, wand, *javelin of lightning, ring of wishes,* etc.—can never be made permanent. Magical devices cannot be used to enchant an item or cast magic upon an object so prepared, but scrolls can be used for this purpose.\n&emsp;The materials needed for this spell vary according to both the nature of the item being enchanted and the magic to be cast upon it. For example, a *cloak of displacement* might require the hides of one or more displacer beasts, a sword meant to slay dragons could require the blood and some other part of the type(s) of dragon(s) it will be effective against, and a *ring of shooting stars* might require pieces of meteorites and the horn of ki-rin. These specifics, as well as other information pertaining to this spell, are decided by the DM and must be discovered or researched in play.'
};

wiz6['Ensnarement'] = {
    'level': '6',
    'school': 'Conjuration/Summoning',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'Negate',
    'materials': 'Special',
    'reference': 'p. 224',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Casting this spell attempts a dangerous act: to lure a powerful creature from another plane to a specifically prepared trap, where it will be held until it agrees to perform one service in return for freedom from the *ensnarement* spell. The type of creature to be ensnared must be known and stated, and if it has a specific, proper, or given name, this must be used in casting the *ensnarement* spell. The spell causes an awareness of a gatelike opening on the plane of the creature to be ensnared. A special saving throw is then made to determine if the creature detects the nature of the planar opening as a trap or believes it to be a gate. To save, the creature must roll equal to or less than its Intelligence score on 1d20. The score is modified by the difference between the creature’s Intelligence and that of the spellcaster. If the creature has a higher score, the difference is subtracted from its dice roll to save. If the spellcaster has a higher score, the difference is added to the dice roll.\n&emsp;If the saving throw succeeds, the creature ignores the spell-created opening, and the spell fails. If the saving throw fails, the creature steps into the opening and is ensnared.\n&emsp;When so trapped, the otherplanar creature can freely attack the ensnaring wizard, unless the caster has created a warding circle. Such circles may be temporary (drawn by hand) or permanent (inlaid or carved). Even with such protection, the entrapped creature may break free and wreak its vengeance upon the spellcaster.\n&emsp;A hand-drawn circle has a base failure chance of 20%, while one inlaid or carved has a base of 10% (and that is for the first time it is used, to determine whether or not the job was done properly). The base chance is modified by the difference between the wizard’s combined Intelligence and experience level ([[@{level-wizard}+@{Intelligence}]]) and the Intelligence and the experience level or Hit Dice of the creature ensnared. If the spellcaster has a higher total, that difference in percentage points is subtracted from the chance for the creature to break free. If the creature has a higher total, that difference is added to its chance to break free.\n&emsp;The chance can be further reduced by careful preparation of the circle. If the hand-made circle is drawn over a longer period of time, using specially prepared pigments (1,000 gp value per turn spent drawing), the chance of breaking free is reduced by 1% for every turn spent in preparation. This can bring the base chance to 0%. Similarly, an inlaid or carved design can be brought to a 0% chance of the creature breaking free by inlaying with various metals, minerals, etc. This cost will require a minimum of one full month of time and add not less than 50,000 gp to the basic cost of having the circle inlaid or carved into stone. Any break in the circle spoils the efficacy of the spell and enables the creature to break free automatically. Even a straw dropped across the line of a magic circle destroys its power. Fortunately, the creature within cannot so much as place a straw upon any portion of the inscribed ward, for the magic of the barrier absolutely prevents it.\n&emsp;Once safely ensnared, the creature can be kept for as long as the spellcaster dares. (Remember the danger of something breaking the ward!) The creature cannot leave the circle, nor can any of its attacks or powers penetrate the barrier. The caster can offer bribes, use promises, or make threats in order to exact one service from the captive creature.\n&emsp;The DM will then assign a value to what the wizard has said to the ensnared creature, rating it from 0 to 6 (with 6 being the most persuasive). This rating is then subtracted from the Intelligence score of the creature. If the creature rolls a successful Intelligence check against its adjusted Intelligence, it refuses service. New offers, bribes, etc., can be made, or the old ones re-offered 24 hours later, when the creature’s Intelligence has dropped by 1 point due to confinement. This can be repeated until the creature promises to serve, until it breaks free, or until the caster decides to get rid of it by means of some riddance spell. Impossible demands or unreasonable commands are never agreed to.\n&emsp;Once the single service is completed, the creature need only so inform the spellcaster to be instantly sent from whence it came. The creature might later seek revenge.'
};

wiz6['Extension III'] = {
    'level': '6',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 225',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is the same as the 4th-level *extension I* spell, except  that it will extend 1st- through 3rd-level spells to double duration and will extend the duration of 4th- or 5th-level spells by 50%.'
};

wiz6['Eyebite'] = {
    'level': '6',
    'school': 'Enchantment/Charm, Illusion/Phantasm',
    'range': '20 yards',
    'duration': '[[floor([[@{level-wizard}]]/3)]] rounds',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 225',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'An *eyebite* spell enables the caster to merely meet the gaze of a creature and speak a single word to cause an effect. This gaze attack is in addition to any other attacks allowed to the wizard. The wizard selects one of four possible gaze attacks at the time the spell is cast, and this attack cannot be changed. For example, a 12th-level caster who chose *fear* would have four opportunities to make gaze attacks causing fear, one for each round of the spell’s duration. Any gaze attack is negated by a successful saving throw vs. spell, with Wisdom adjustments. The four effects of the spell are as follows:\n&emsp;*Charm:* The wizard can charm a single person or monster by gaze and by uttering a single word. The effect is to make the charmed subject absolutely loyal and docile to the caster, even to the point of personal danger. It is otherwise the same as a *charm monster* spell. All creatures other than humans, demihumans, and humanoids save with +2 bonuses.\n&emsp;*Fear:* The wizard can cause fear by gaze and by speaking a single  word. The subject flees in blind terror for 1d4 rounds. After this, the creature refuses to face the caster and cowers or bolts for the nearest cover if subsequently confronted by the caster (50% chance of either). The latter effect lasts one turn per caster level. This attack can be negated by spells that counter fear.\n&emsp;*Sicken:* This power enables the caster to merely gaze, speak a word, and cause sudden pain and fever to sweep over the subject’s body. Creatures with ability scores function at half effectiveness; others inflict only one-half damage with physical attacks. Movement is at one-half normal rate. The subject remains stricken for one turn per level of the caster, (Currently [[@{level-wizard}]] turns), after which all abilities return at the rate of one point per turn of complete rest or one point per hour of moderate activity. The effects cannot be negated by a *cure disease* or *heal* spell, but a *remove curse* or successful *dispel magic* spell is effective. Creatures other than humans, demihumans, and humanoids save with +2 bonuses versus this attack.\n&emsp;*Sleep:* The wizard can cause any individual to fall into a comatose slumber by means of a gaze and a single word, unless the subject successfully rolls its saving throw vs. spell. Creatures normally subject to a 1st-level *sleep* spell save with –2 penalties. An affected creature must be shaken or otherwise shocked back to consciousness.\n&emsp;In all cases, the gaze attack has a speed factor of 1. This spell does not affect undead of any type, or extend beyond the plane occupied by the caster. Note that the caster is subject to the effects of his reflected gaze and is allowed any applicable saving throw. In the case of a reflected *charm* gaze, the caster is paralyzed until it wears off or is countered.'
};

wiz6['Geas'] = {
    'level': '6',
    'school': 'Enchantment/Charm',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 225',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *geas* spell places a magical command upon a creature (usually human or humanoid) to carry out some service, or to refrain from some action or course of activity, as desired by the spellcaster. The creature must be intelligent, conscious, under its own volition, and able to understand the caster. While a geas cannot compel a creature to kill itself or perform acts that are likely to result in certain death, it can cause almost any other course of action. The geased creature must follow the given instructions until the geas is completed. Failure to do so will cause the creature to grow sick and die within 1d4 weeks. Deviation from or twisting of the instructions causes a corresponding loss of Strength points until the deviation ceases. A geas can be done away with by a *wish* spell, but a *dispel magic* or *remove curse* spell will not negate it. Your DM will decide any additional details of a geas, for its casting and fulfillment are tricky, and an improperly cast geas is ignored.'
};

wiz6['Glassee'] = {
    'level': '6',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A small piece of crystal or glass',
    'reference': 'p. 225',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to make a section of metal, stone, or wood as transparent as glass to his gaze, or even make it into transparent material as explained hereafter. Normally, the *glassee* spell can make up to 4 inches of metal, 6 inches of stone, and 20 inches of wood transparent. The spell will not work on lead, gold, or platinum. The wizard can opt to make the glassee work only for himself for the duration of the spell, or he can actually make a transparent area, a one-way window, in the material affected. Either case gives a viewing area 3 feet wide by 2 feet high. If a window is created, it has the strength of the original material.'
};

wiz6['Globe of Invulnerability'] = {
    'level': '6',
    'school': 'Abjuration',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '5-foot radius',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A glass or crystal bead that shatters at the expiration of the spell',
    'reference': 'p. 225',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates an immobile, faintly shimmering, magical sphere around the caster that prevents any 1st-, 2nd-, 3rd-, or 4th-level spell effects from penetrating. Thus, the area of effect of any such spell does not include the area of the globe of invulnerability. This includes innate spell-like abilities and effects from devices. However, any type of spell can be cast out of the magical sphere; spells pass from the caster of the globe to the subject without effect on the globe. Fifth and higher level spells are not affected by the globe. The globe can be brought down by a successful *dispel magic* spell.'
};

wiz6['Guards and Wards'] = {
    'level': '6',
    'school': 'Evocation, Alteration, Enchantment/Charm',
    'range': '0',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '3 turns',
    'saving-throw': 'None',
    'materials': 'Burning incense, a small measure of sulphur and oil, a knotted string, a small amount of umber hulk blood, and a small silver rod',
    'reference': 'p. 226',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This special and powerful spell is primarily used to defend the wizard’s stronghold. The ward protects a one-story stronghold, with a base dimension of 400 feet × 400 feet. The wizard can ward a multistory area by reducing the base area proportionately. The following take place in the warded area upon casting the spell:}}{{style=min1 sheet-spell-justify2 sheet-spell-min2}}{{c1-1=1.}}{{cs1-2=2}}{{c1-2=All corridors become misty; visibility is reduced to 10 feet.}}{{c2-1=2.}}{{cs2-2=2}}{{c2-2=All doors are wizard locked.}}{{c3-1=3.}}{{cs3-2=2}}{{c3-2=Stairs are filled with webs from top to bottom. These act as the 2nd-level *web* spell, except that they regrow within one turn if destroyed.}}{{c4-1=4.}}{{cs4-2=2}}{{c4-2=Where there are choices in direction—such as a cross or side passage—a minor confusion-type spell functions so as to make it 50% probable that intruders believe they are going in the exact opposite direction.}}{{c5-1=5.}}{{cs5-2=2}}{{c5-2=The whole area radiates magic. The normal use of the *detect magic* spell becomes impossible for those of less than the caster’s level and difficult for others.}}{{c6-1=6.}}{{cs6-2=2}}{{c6-2=One door per level of experience of the wizard are covered by an illusion to appear as if it were a plain wall. Currently [[@{level-wizard}]] doors.}}{{c7-1=7.}}{{cs7-2=2}}{{c7-2=The wizard can place one of the following additional magical effects:}}{{c8-1= }}{{c8-2=A.}}{{cc8-2=min}}{{c8-3=*Dancing lights* in four corridors.}}{{c9-1= }}{{c9-2=B.}}{{cc9-2=min}}{{c9-3=A *magic mouth* in two places.}}{{c10-1= }}{{c10-2=C.}}{{cc10-2=min}}{{c10-3=A *stinking cloud* in two places.}}{{c11-1= }}{{c11-2=D.}}{{cc11-2=min}}{{c11-3=A *gust of wind* in one corridor or room.}}{{c12-1= }}{{c12-2=E.}}{{cc12-2=min}}{{c12-3=A *suggestion* in one place.}}{{effects2=&emsp;Note that items 6 and 7 function only when the wizard is totally familiar with the area of the spell’s effect. *Dispel magic* can remove one effect, at random, per casting. A *remove curse* spell will not work.'
};

wiz6['Invisible Stalker'] = {
    'level': '6',
    'school': 'Conjuration/Summoning',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Burning incense and a piece of horn carved into a crescent shape',
    'reference': 'p. 226',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell summons an invisible stalker from the Elemental Plane of Air. This 8-Hit Dice monster obeys and serves the spellcaster in performing whatever tasks are set before it. It is a faultless tracker within one day of the quarry’s passing. The invisible stalker follows instructions even if they send it hundreds or thousands of miles away and, once given an order, follows through unceasingly until the task is accomplished. However, the creature is bound to serve; it does not do so from loyalty or desire. Therefore, it resents prolonged missions or complex tasks, and it attempts to pervert instructions accordingly. Invisible stalkers understand common speech but speak no language save their own.'
};

wiz6['Legend Lore'] = {
    'level': '6',
    'school': 'Divination',
    'range': '0',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': 'Incense and strips of ivory  formed into a rectangle, but some item of value to the caster must be sacrificed in addition—a potion, magical scroll, magical item, etc.',
    'reference': 'p. 226',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *legend lore* spell is used to determine legendary information  regarding a known person, place, or thing. If the person or thing is at hand, or if the wizard is in the place in question, the likelihood of the spell producing results is far greater and the casting time is only [[1d4]] turns. If only detailed information on the person, place, or thing is known, casting time is [[1d10]] days. If only rumors are known, casting time is [[2d6]] weeks.\n&emsp;During the casting, the wizard cannot engage in activities other than the routine: eating, sleeping, etc. When completed, the divination reveals if legendary material is available. It often reveals where this material is—by place name, rhyme, or riddle. It sometimes gives certain information regarding the person, place, or thing (when the object of the *legend lore* is at hand), but this data is always in some cryptic form (rhyme, riddle, anagram, cipher, sign, etc.). Naturally, a *legend lore* spell reveals information only if the person, place, or thing is noteworthy or legendary.\n&emsp;For example, suppose Delsenora came across an extremely well-made sword. It radiates magic, but when she used an *identify* spell, she could not learn any information. Even giving it to a trusted fighter didn’t work, as the sword did not reveal any special powers. Finally, she casts a *legend lore* spell, hoping to gain more information. Since the sword is at hand, she completes the spell in three turns. In her mind comes the message, “Once this was the sword of he who waits till Albion’s time of greatest peril, when unto his hand it shall fly again. Fair was the hand that gave me and fair was the hand that reclaimed me.” Clearly, Delsenora realizes, this must be a very powerful item, since her spell gave only a cryptic answer. But who is he who waits? And where is Albion? For more information, Delsenora is going to have to cast more spells. But now the process will take much longer, since she has only the vaguest of clues to follow.'
};

wiz6['Lower Water'] = {
    'level': '6',
    'school': 'Alteration (Reversible)',
    'range': '80 yards',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': '[[10*[[@{level-wizard}]] ]]-foot square',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A small vial of dust or a small vial of water for the reverse',
    'reference': 'p. 227',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The wizard casting a *lower water* spell causes water or similar  fluid in the area of effect to sink away. The water can be lowered up to 2 feet for every experience level of the wizard, currently [[2*[[@{level-wizard}]] ]] feet, to a minimum depth of 1 inch. The water is lowered within a square area whose sides are 10 feet long per caster level. Currently [[10*[[@{level-wizard}]] ]] feet. Thus, a 12th-level wizard affects a volume of 24 feet × 120 feet × 120 feet, a 13th-level caster a volume of 26 feet × 130 feet × 130 feet, and so on. In extremely large and deep bodies of water, such as deep ocean, the spell creates a whirlpool that sweeps ships and similar craft down-ward, putting them at risk and rendering them unable to leave by normal movement for the duration of the spell. When cast on water elementals and other water-based creatures, this spell acts as a *slow* spell: The creature moves at half speed and makes half the number of attacks each round. It has no effect on other creatures.\n&emsp;Its reverse, *raise water,* causes water or similar fluids to return to their highest natural level: spring flood, high tide, etc. This can make fords impassable, float grounded ships, and may even sweep away bridges, at the DM’s option. It negates *lower water* and vice versa.'
};

wiz6['Mass Suggestion'] = {
    'level': '6',
    'school': 'Enchantment/Charm',
    'range': '30 yards',
    'duration': '[[4+4*[[@{level-wizard}]] ]] turns',
    'aoe': '[[@{level-wizard}]] creatures',
    'components': 'V, M',
    'cast-time': '6',
    'saving-throw': 'Negate',
    'materials': 'A snake’s tongue and either a bit of honeycomb or a drop of sweet oil',
    'reference': 'p. 227',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *mass suggestion* spell enables the wizard to influence the actions of one or more chosen creatures in the same way as the *suggestion* spell. Up to one creature per experience level of the caster can be influenced, provided that all subject creatures are within the 30-yard range. Undead are not subject to this spell. The suggestion must be reasonably worded and understood by the creatures, and must be the same for all hearing it. Creatures successfully saving vs. spell are unaffected. Saving throws against the spell suffer a penalty of –1, and if a single creature is to be affected, its saving throw suffers a –4 penalty. Note that a very reasonable mass suggestion can cause the saving throw to be made with an additional penalty (such as –1, –2, etc.), at the discretion of your DM. A mass suggestion can continue in effect for a considerable duration, at the DM’s discretion. Conditions that will trigger a special action can also be specified; if the condition is not met before the spell expires, the action will not be performed.'
};

wiz6['Mirage Arcana'] = {
    'level': '6',
    'school': 'Illusion/Phantasm, Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '[[10*[[@{level-wizard}]] ]] foot radius',
    'components': 'V, S (M optional)',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 227',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The magic of this spell is similar to that of the *vacancy* spell, only more powerful and elaborate. The spell enables the caster to make an area appear to be something other than it is—a setting he has personally seen. The spell remains as long as the caster maintains a minimal concentration upon it. Even after this, the spell persists for a total of one hour plus one additional turn for each experience level of the caster. Currently [[6+[[@{level-wizard}]] ]] turns. (Note: Minimal concentration can be maintained during normal conversation but not while spellcasting, in melee, or if harmed by an attack.) If the caster actually uses a small bit of anything connected with the place to create this spell, it takes on a quasi reality.\n&emsp;In its basic form, forceful contact is necessary to have any hope of discovering the magic, short of a detection device or spell. In its more complex form, where a material component is used, detection is possible only by some magical means, whether device, item, or spell. Either form of mirage arcana is subject to the *dispel magic* spell.\n&emsp;As with all powerful illusions, the mind of the believer urges appropriate effects upon the viewer’s body. Under the influence of the spell, the viewer could possibly walk across a bed of hot coals thinking it was a shallow stream of water that was cooling his feet (and thus suffer no damage), dine upon imaginary food and actually be satisfied, or rest comfortably upon a bed of sharp stones, thinking it a featherbed. Gravity is not affected by the spell, however, so an envisioned bridge spanning a deep chasm does not support the believer. Those who witness the event see it as a sudden disappearance of the individual. They do not connect it with an illusion unless they are otherwise aware of some magic at work.'
};

wiz6['Mislead'] = {
    'level': '6',
    'school': 'Illusion/Phantasm',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 227',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *mislead* spell is cast by the wizard, he actually creates an illusory double at the same time that he is cloaked by *improved invisibility* magic (see the 4th-level spell). The wizard is then free to go elsewhere while his double seemingly moves away. The spell enables the illusion of the wizard to speak and gesture as if it were real, and there are full olfactory and touch components as well. A *true seeing* spell or a *gem of seeing* will reveal the illusion for what it is. A *detect invisibility* or *true seeing* spell or items such as a *gem of seeing* or *robe of eyes* can detect the invisible wizard (see the 5th-level wizard spell *shadow door*).'
};

wiz6['Monster Summoning IV'] = {
    'level': '6',
    'school': 'Conjuration/Summoning',
    'range': 'Special',
    'duration': '[[5+[[@{level-wizard}]] ]] rounds',
    'aoe': '60-yard radius',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A tiny bag and a small (not necessarily lit) candle',
    'reference': 'p. 228',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is much like the 3rd-level spell *monster summoning I,* except that this spell summons [[1d3]] 4th-level monsters. These appear within the spell’s area of effect and attack the caster’s opponents, until he commands them to cease, the spell duration expires, or the monsters are slain. These creatures do not check morale; they vanish when slain. If no opponent exists to fight, summoned monsters can, if the wizard can communicate with them, and if they are physically capable, perform other services for the summoning wizard.'
};

wiz6['Mordenkainen\'s Lucubration'] = {
    'level': '6',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'The caster',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 228',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By use of this spell, the wizard is able to instantly recall any 1st- through 5th-level spell he has used during the past 24 hours. The spell must have been memorized and actually used during that time period. *Mordenkainen’s lucubration* allows the recovery of only one spell. If the recalled spell requires material components, these must be provided by the caster; the recovered spell is not usable until the material components are available.'
};

wiz6['Move Earth'] = {
    'level': '6',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': 'A mixture of soils (clay, loam, sand) in a small bag and an iron blade',
    'reference': 'p. 228',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast, the *move earth* spell moves dirt (clay, loam, sand) and its other components. Thus, embankments can be collapsed, hillocks moved, dunes shifted, etc. However, in no event can rock prominences be collapsed or moved. The area to be affected dictates the casting time; for every 40 yard × 40 yard surface area and 10 feet of depth, one turn of casting time is required. The maximum area that can be affected is 240 yards × 240 yards, which takes four hours.\n&emsp;If terrain features are to be moved—as compared to simply caving in banks or walls of earth—it is necessary that an earth elemental be subsequently summoned to assist. All spell casting or summoning must be completed before any effects occur. As any summoned earth elemental will perform most of its work underground, it is unlikely that it will be intercepted or interrupted. Should this occur, however, the movement of the earth requiring its services must be stopped until the elemental is once again available. Should the elemental be slain or dismissed, the move earth spell is limited to collapsing banks or walls of earth.\n&emsp;The spell cannot be used for tunneling and is generally too slow to trap or bury creatures; its primary use is for digging or filling moats or for adjusting terrain contours before a battle.\n&emsp;Note: This spell does not violently break the surface of the ground. Instead, it creates wavelike crests and troughs, with the earth reacting with glacierlike fluidity until the desired result is achieved. Trees, structures, rock formations, etc. are relatively unaffected, save for changes in elevation and relative topography.'
};

wiz6['Otiluke\'s Freezing Sphere'] = {
    'level': '6',
    'school': 'Alteration, Evocation',
    'range': 'Special',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': 'A) *Frigid globe:* A thin sheet of crystal about an inch square. B) *Cold ray:* A white sapphire of not less than 1,000 gp value. C) *Globe of cold:* a 1,000-gp diamond',
    'reference': 'p. 228',
    'book': 'PHB',
    'damage': '*Cold ray:* [[2*[[@{level-wizard}]]+[[@{level-wizard}]]d4]] Cold. *Globe of cold:* [[6d6]]',
    'damage-type': 'Cold',
    'healing': '',
    'effect': '*Otiluke’s Freezing Sphere* is a multipurpose spell of considerable power. If the caster opts, he may create any of the following:\n&emsp;A) *Frigid globe.* A small globe of matter at absolute zero temperature that spreads upon contact with water, or a liquid that is principally water, freezing it to a depth of 6 inches over an area equal to 100 square feet per level of the spellcaster. Currently [[100*[[@{level-wizard}]] ]] square feet. This ice lasts for one round per level of the caster. Currently [[@{level-wizard}]] rounds.\n&emsp;B) *Cold ray.* The spell can be used as a thin ray of cold that springs from the caster’s hand to a distance of 10 yards per level of the wizard; currently [[10*[[@{level-wizard}]] ]] yards; this ray inflicts 1d4+2 points of damage per level of the caster upon the first creature struck. A saving throw vs. spell is applicable; all damage is negated if it is successful (as the ray is so narrow a save indicates it missed). If the first creature is missed, the path of the ray is plotted to its full distance, and anything else in its path must save (if applicable) or suffer appropriate damage.\n&emsp;C) *Globe of cold.* This creates a small globe about the size of a sling stone, cool to the touch, but not harmful. This globe can be hurled, either by hand to a distance of 40 yards (considered short range), or as a sling bullet. The globe shatters upon impact, inflicting 6d6 points of cold damage upon all creatures within a 10-foot radius (one-half damage if a saving throw vs. spell is successful). Use the Grenadelike Missile Table in the *Dungeon Master Guide* to find where misses strike. Note that if the globe is not thrown or slung within one round per level of the spellcaster, currently [[@{level-wizard}]] rounds, it shatters and causes cold damage as stated above. This timed effect can be employed against pursuers, although it can prove hazardous to the spellcaster and his associates as well.'
};

wiz6['Part Water'] = {
    'level': '6',
    'school': 'Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[5*[[@{level-wizard}]] ]] rounds',
    'aoe': '20 feet × [[3*[[@{level-wizard}]] ]] feet x [[30*[[@{level-wizard}]] ]] feet',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'Two small sheets of crystal or glass',
    'reference': 'p. 229',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By employing a *part water* spell, the wizard is able to cause water or similar liquid to move apart, thus forming a 20-foot-wide trough. The depth and length of the trough are dependent upon the level of the wizard, and a trough 3 feet deep by 10 yards long is created per level. For example, at 12th level the wizard would part water 36 feet deep by 20 feet wide by 120 yards long. The trough remains as long as the spell lasts or until the wizard who cast it opts to end its effects. If cast under water, this spell creates an air cylinder of appropriate length and diameter. If cast directly on a water elemental or other water-based creature, the creature receives 4d8 damage and must roll a successful saving throw vs. spell or flee in panic for 3d4 rounds.'
};

wiz6['Permanent Illusion'] = {
    'level': '6',
    'school': 'Illusion/Phantasm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '20-foot cube + [[@{level-wizard}]] 10-foot cubes',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': 'A bit of fleece',
    'reference': 'p. 229',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard creates an illusion with visual, auditory, olfactory, and thermal elements. The spell can create the illusion of any object, creature, or force, as long as it is within the boundaries of the spell’s area of effect. It affects all creatures that view the illusion, even to the extent of them suffering damage from falling into an illusory pit full of sharp spikes.\n&emsp;Creatures that attempt to disbelieve the illusion gain a saving throw vs. spell and, if successful, they see it for what it is and add +4 bonuses to associates’ saving throws, if this knowledge can be communicated effectively. Creatures not sensing the spell effect are immune until they become aware of it. The permanent illusion is subject to a *dispel magic* spell, of course.'
};

wiz6['Programmed Illusion'] = {
    'level': '6',
    'school': 'Illusion/Phantasm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '20-foot cube + [[@{level-wizard}]] 10-foot cubes',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': 'A bit of fleece',
    'reference': 'p. 229',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a *spectral force* spell that activates upon command or when a specific condition occurs. The illusion has visual, auditory, olfactory, and thermal elements. It can be of any object, creature, or force, as long as it remains within the boundaries of the spell’s area of effect.\n&emsp;The occurrence that begins the illusion can be as general or as specific and detailed as desired, such as the following: “Begin only when a venerable female human carrying a sack of groat clusters sits cross-legged within one foot of this spot.” Such visual triggers can react to a character using the *disguise* ability. Command range is 5 yards per level of the wizard, currently [[5*[[@{level-wizard}]] ]] yards, so a 12th-level wizard can command the programmed illusion to occur at a maximum encounter range of 60 yards. A programmed illusion cannot distinguish invisible creatures, nor alignment, level, Hit Dice, or class, except by external garb. If desired, the effect can be keyed to a specific noise or spoken word. The spell lasts until the illusion occurs; thus, the spell duration is variable. The illusion will last for a maximum of one round per level of the spellcaster. Currently [[@{level-wizard}]] rounds.\n&emsp;Creatures that attempt to disbelieve the illusion gain a saving throw vs. spell and, if successful, see it for what it is and add +4 bonuses to associates’ saving throws, if this knowledge can be communicated effectively. Creatures not sensing the spell effect are immune until they become aware of it. The illusion is subject to a *dispel magic* spell.'
};

wiz6['Project Image'] = {
    'level': '6',
    'school': 'Alteration, Illusion/Phantasm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A small replica (doll) of the wizard',
    'reference': 'p. 229',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard creates a nonmaterial duplicate of himself, projecting it to any spot within spell range. This image performs actions decided by the wizard—walking, speaking, spell-casting—conforming to the actual actions of the wizard unless he concentrates on making it act differently (in which case the wizard is limited to half movement and no attacks).\n&emsp;The image can be dispelled only by means of a successful *dispel magic* spell (or upon command from the spellcaster); attacks pass harmlessly through it. The image must be within view of the wizard projecting it at all times, and if his sight is obstructed, the spell is broken. Note that if the wizard is invisible at the time the spell is cast, the image is also invisible until the caster’s invisibility ends, though the wizard must still be able to see the image (by means of a *detect invisibility* spell or other method) to maintain the spell. If the wizard uses *dimension door, teleport, plane shift,* or a similar spell that breaks his line of vision, the *project image* spell ends.'
};

wiz6['Reincarnation'] = {
    'level': '6',
    'school': 'Necromancy',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Person touched',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A small drum and a drop of blood',
    'reference': 'p. 230',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the wizard can bring back to life a person who died no more than one day per level of experience of the wizard before the casting of the spell. Currently [[@{level-wizard}]] days. The essence of the dead person is transferred to another body, possibly one very different from his former body. Reincarnation does not require any saving throw, system shock, or resurrection survival roll. The corpse is touched, and a new incarnation of the person will appear in the area in [[1d6]] turns. The person reincarnated recalls the majority of his former life and form, but the character class, if any, of the new incarnation might be different indeed. The new incarnation is determined on the following table. If a player character race is indicated, the character must be created.}}{{style=center1}}{{c1-1=**D100 Roll**}}{{c2-1=01–05}}{{c3-1=06–11}}{{c4-1=12–18}}{{c5-1=19–23}}{{c6-1=24–28}}{{c7-1=29–33}}{{c8-1=34–40}}{{c9-1=41–47}}{{c10-1=48–54}}{{c11-1=55–59}}{{c12-1=60–73}}{{c13-1=74–79}}{{c14-1=80–85}}{{c15-1=86–90}}{{c16-1=91–95}}{{c17-1=96–00}}{{c1-2=**Incarnation**}}{{c2-2=Bugbear}}{{c3-2=Dwarf}}{{c4-2=Elf}}{{c5-2=Gnoll}}{{c6-2=Gnome}}{{c7-2=Goblin}}{{c8-2=Half-elf}}{{c9-2=Halfling}}{{c10-2=Half-orc}}{{c11-2=Hobgoblin}}{{c12-2=Human}}{{c13-2=Kobold}}{{c14-2=Orc}}{{c15-2=Ogre}}{{c16-2=Ogre mage}}{{c17-2=Troll}}{{effects2=&emsp;Note: Very good or very evil persons will not be reincarnated as creatures whose general alignment is the opposite.'
};

wiz6['Repulsion'] = {
    'level': '6',
    'school': 'Abjuration',
    'range': '0',
    'duration': '[[floor([[@{level-wizard}]]/2)]] rounds',
    'aoe': '[[10*[[@{level-wizard}]] ]] feet × 10 feet',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A pair of small magnetized iron bars attached to two small canine statuettes, one ivory and one ebony',
    'reference': 'p. 230',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard is able to cause all creatures in the path of the area of effect to move directly away from his person. Repulsion occurs at the speed of the creature attempting to move toward the spellcaster. The repelled creature continues to move away for a complete round even if this takes it beyond spell range. The caster can designate a new direction each round, but use of this power counts as the caster’s principal action in the round. The caster can, of course, choose to do something else instead of using the repulsion attack.'
};

wiz6['Shades'] = {
    'level': '6',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '20-foot cube',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 230',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is related to the *shadow monsters* and *demishadow  monsters* spells. The *shades* spell uses material from the Demiplane of Shadow to form semireal illusions of one or more monsters, up to 1 Hit Dice per caster level. Currently [[@{level-wizard}]] Hit Dice. All shades created by one spell must be of the same sort, and they have 60% of the hit point total the real creatures would have. Those who view the shades and fail their saving throws vs. spell believe the illusion.\n&emsp;The shades perform as the real monsters with respect to Armor Class and attack forms. Special attack forms such as petrification or level drain do not actually occur, but a subject who believes the shades are real will react appropriately, until the illusion is countered by a *dispel magic* spell or the condition is countered by a *heal* spell. Those who roll successful saving throws see the shades as transparent images superimposed on vague shadowy forms. These are Armor Class 6 and cause only 60% of the true monsters’ normal melee damage.'
};

wiz6['Stone to Flesh'] = {
    'level': '6',
    'school': 'Alteration (Reversible)',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'Special',
    'materials': 'A pinch of earth and a drop of blood; or lime, water, and earth for the reverse',
    'reference': 'p. 230',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *stone to flesh* spell turns any sort of stone into flesh. If the recipient stone object was formerly living, this spell restores life (and goods), although the survival of the creature is subject to the usual system shock survival roll. Any formerly living creature, regardless of size, can be thus returned to flesh. Ordinary stone can be turned to flesh in a volume of 9 cubic feet per level of experience of the spellcaster. Currently [[9*[[@{level-wizard}]] ]] cubic feet. Such flesh is inert, lacking a vital life force, unless a life force or magical energy is available (for example, this spell would turn a stone golem into a flesh golem, but an ordinary statue would become a body). If cast upon stone, the wizard can create a cylinder of fleshy material from 1 to 3 feet in diameter and up to 10 feet long, allowing a passage to be made.\n&emsp;The reverse, *flesh to stone,* turns flesh of any sort to stone. All possessions on the person of the creature likewise turn to stone. The intended subject of the spell receives a saving throw vs. spell to avoid the effect. If a statue created by this spell is subjected to breakage or weathering, the being (if ever returned to his original, fleshy state) will have similar damage, deformities, etc. The DM may allow such damage to be repaired by various high-level clerical spells, such as *regenerate.*'
};

wiz6['Tenser\'s Transformation'] = {
    'level': '6',
    'school': 'Alteration, Evocation',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A *potion of heroism* (or *superheroism*) that the wizard must consume during the course of uttering the spell',
    'reference': 'p. 231',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Tenser’s transformation is a sight guaranteed to astound any creature not aware of its power, for when the wizard casts the spell, he undergoes a startling transformation. The size and strength of the wizard increase to heroic proportions, so he becomes a formidable fighting machine; the spell causes the caster to become a berserk fighter! The wizard’s hit points double, and all damage he sustains comes first from the magical points gained; once these points are eliminated, all subsequent damage (to his true hit points) is doubled. The Armor Class of the wizard is 4 better than that possessed prior to casting the spell (AC 10 goes to 6, AC 9 to 5, AC 8 to 4, etc.), to a maximum Armor Class of –10.\n&emsp;All attacks are as a fighter of the same level as the wizard (i.e., the wizard uses the combat values normally reserved for fighters). The wizard can use either a dagger or a staff when attacking. A dagger can be used twice per round, and each successful attack inflicts an additional 2 points of damage. A staff can be used only once per round, but with a +2 bonus to attack and damage rolls. The wizard fights in melee in preference to all other forms of attack, and continues attacking until all opponents are slain, he is killed, the magic is dispelled, or the spell duration expires.'
};

wiz6['Transmute Water to Dust'] = {
    'level': '6',
    'school': 'Alteration (Reversible)',
    'range': '60 yards',
    'duration': 'Permanent',
    'aoe': '[[@{level-wizard}]] 10-foot cubes',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None (special)',
    'materials': 'Diamond dust of at least 500 gp value and a bit of seashell; plus a pinch of normal dust for the reverse',
    'reference': 'p. 231',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the subject area instantly undergoes a change from liquid to powdery dust. Note that if the water is already muddy, the area of effect is doubled, while if wet mud is being transmuted, the area of effect is quadrupled. If water remains in contact with the transmuted dust, the former quickly soaks the latter, turning the dust into silty mud (if a sufficient quantity of water exists to do so), otherwise soaking or dampening the dust accordingly.\n&emsp;Only liquid actually in the area of effect at the moment of spellcasting is affected. Liquids that are only partially water are affected only insofar as the actual water content is concerned; however, potions containing water are rendered useless. Living creatures are unaffected, except for those native to the Elemental Plane of Water. Such creatures receive saving throws vs. spell. Failure inflicts 1d6 points of damage per caster level upon the subject, while success means the creature receives half damage. Only one such creature can be affected by any single casting of this spell, regardless of the creature’s size or the size of the spell’s area of effect.\n&emsp;The reverse of the spell is simply a very high-powered create water spell that requires a pinch of normal dust as an additional material component.'
};

wiz6['True Seeing'] = {
    'level': '6',
    'school': 'Divination',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Line of sight, max 60 feet',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'An ointment for the eyes that is made from a very rare mushroom powder, saffron, and fat which costs no less than 300 gp per use and must be aged for 1d6 months',
    'reference': 'p. 231',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the wizard employs this spell, he confers upon the recipient the ability to see all things as they actually are. The spell penetrates normal and magical darkness. Secret doors become plain. The exact location of displaced things is obvious. Invisible things become visible. Illusions and apparitions are seen through. Polymorphed, changed, or enchanted objects are apparent. (The real form appears translucently superimposed on the apparent form: A gold dragon polymorphed to human form would appear human with a ghostly dragon looming over the human form.) Unlike the clerical version of this spell, the recipient cannot determine alignment. The recipient can focus his vision to see into the Ethereal Plane or the bordering areas of adjacent planes. The range of vision conferred is 60 feet. True seeing does not penetrate solid objects; it in no way confers X-ray vision or its equivalent. Furthermore, the spell effects cannot be enhanced with magic.'
};

wiz6['Veil'] = {
    'level': '6',
    'school': 'Illusion/Phantasm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '[[@{level-wizard}]] 20-foot cubes',
    'components': 'V, S',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 231',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *veil* spell enables the wizard to instantly change the appearance of his surroundings and party or create hallucinatory terrain so as to fool even the most clever creatures (unless they have the *true seeing* spell, a *gem of seeing,* or a similar magical aid). The veil can make a sumptuous room seem like a filthy den; even tactile impressions conform to the visual illusion. Likewise, a party might be made to resemble a mixed band of brownies, pixies, and faeries led by a treant. If hallucinatory terrain is created, touch does not cause it to vanish.'
};

const wiz7 = {};
wiz7['Banishment'] = {
    'level': '7',
    'school': 'Abjuration',
    'range': '20 yards',
    'duration': 'Instantaneous',
    'aoe': '60-foot radius',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'Special',
    'materials': 'Substances harmful, hateful, or opposed to the nature of the subject(s) of the spell (see additional considerations below)',
    'reference': 'p. 232',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *banishment* spell enables the caster to force some extraplanar creature out of the caster’s home plane. The effect is instantaneous, and the subject cannot come back without some special summoning or means of egress from its own plane to the one from which it was banished. Up to 2 Hit Dice or levels of creature per caster level can be banished. Currently [[2*[[@{level-wizard}]] ]] Hit Dice or levels.\n&emsp;The caster must both name the type of creature(s) to be sent away and give its name and title as well, if any. In any event, the creature’s magic resistance must be overcome for the spell to be effective.\n&emsp;The material components of the spell are substances harmful, hateful, or opposed to the nature of the subject(s) of the spell. For every such substance included in the casting, the subject creature(s) loses 5% from its magic resistance and suffers a –2 penalty to its saving throw vs. spell. For example, if iron, holy water, sunstone, and a sprig of rosemary were used in casting a banishment upon a being that hates those things, its saving throw versus the spell would be made with a –8 penalty (four substances times the factor of –2). Special items, such as hair from the tail of a ki-rin or couatl feathers, could also be added to change the factor to –3 or –4 per item. In contrast, a titan’s hair or mistletoe blessed by a druid might lower the factor to –1 with respect to the same creature. If the subject creature successfully rolls its saving throw vs. spell, the caster is stung by a backlash of energy, suffers 2d6 points of damage, and is stunned for one round.'
};

wiz7['Bigby\'s Grasping Hand'] = {
    'level': '7',
    'school': 'Evocation',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A leather glove',
    'reference': 'p. 232',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Bigby’s grasping hand* is a superior version of the 6th-level spell *Bigby’s forceful hand.* It creates a man-sized (5 feet) to gargantuan-sized (21 feet) hand that appears and grasps a creature designated by the caster, regardless of what the spellcaster does or how the opponent tries to escape it. The grasping hand can hold motionless a creature or object of up to 1,000 pounds weight, slow movement to 10 feet per round if the creature weighs between 1,000 and 4,000 pounds, or slow movement by 50% if the creature weighs upto 16,000 pounds. The hand itself inflicts no damage. The grasping hand has an Armor Class of 0, has as many hit points as its caster in full health, and vanishes when destroyed. The caster can order it to release a trapped opponent or can dismiss it on command.'
};

wiz7['Charm Plants'] = {
    'level': '7',
    'school': 'Enchantment/Charm',
    'range': '30 yards',
    'duration': 'Permanent',
    'aoe': '10 × 30 feet',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'Negate',
    'materials': 'A pinch of humus, a drop of water, and a twig or leaf',
    'reference': 'p. 232',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *charm plants* spell enables the spellcaster to bring under command vegetable life forms and communicate with them. These plants obey instructions to the best of their ability. The spell will charm plants in a 30-foot × 10-foot area. While the spell does not endow the vegetation with new abilities, it does enable the wizard to command the plants to use whatever they have in order to fulfill his instructions. If the plants in the area of effect do have special or unusual abilities, these are used as commanded by the wizard.\n&emsp;For example, this spell can generally duplicate the effects of the 1st-level priest spell *entangle,* if the caster desires. The saving throw applies only to intelligent plants, and it is made with a –4 penalty to the die roll.'
};

wiz7['Control Undead'] = {
    'level': '7',
    'school': 'Necromancy',
    'range': '60 feet',
    'duration': '[[3d4+[[@{level-wizard}]] ]] rounds',
    'aoe': '[[1d6]] undead',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'A small piece each of bone and raw meat',
    'reference': 'p. 232',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to command 1d6 undead creatures for a short period of time. Upon casting the spell, the wizard selects one point within range of the spell. Those undead nearest to this point are affected, until either undead equal in Hit Dice to the caster’s level ([[@{level-wizard}]]) or six undead are affected. Undead with 3 Hit Dice or less are automatically controlled. Those of greater Hit Dice are allowed a saving throw vs. spell, which, if successful, negates the attempt to control that creature. Regardless of the success or failure of the saving throw, each creature required to make a check counts toward the Hit Dice limit of the spell.\n&emsp;Those creatures under the control of the wizard can be commanded by the caster if they are within hearing range. There is no telepathic communication or language requirement between the caster and the controlled undead. Even if communication is impossible, the controlled undead do not attack the spellcaster. At the end of the spell, the controlled undead revert to their normal behaviors. Those not mindless will remember the control exerted by the wizard.'
};

wiz7['Delayed Blast Fireball'] = {
    'level': '7',
    'school': 'Evocation',
    'range': '[[100+10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '20-foot radius',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': '½',
    'materials': 'A tiny ball of bat guano and sulphur',
    'reference': 'p. 233',
    'book': 'PHB',
    'damage': '[[ [[{[[@{level-wizard}]],10}kl1]]d6+[[{[[@{level-wizard}]],10}kl1]]]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'This spell creates a fireball, with a +1 bonus to each of its dice of damage, which releases its blast anytime from instantly to five rounds later, according to the command given by the wizard. In other respects, the spell is the same as the 3rd-level spell *fireball.*'
};

wiz7['Drawmij\'s Instant Summons'] = {
    'level': '7',
    'school': 'Conjuration/Summoning',
    'range': 'Infinite + special',
    'duration': 'Instantaneous',
    'aoe': '1 small object',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A gem of not less than 5,000 gp value and the desired item',
    'reference': 'p. 233',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard teleports some desired item from virtually any location directly to his hand. The single object can be no longer in any dimension than a sword, can have no more weight than a shield (about eight pounds), and must be nonliving.\n&emsp;To prepare this spell, the wizard must hold a gem of not less than 5,000 gp value in his hand and utter all but the final word of the conjuration. At some point in the future, he must crush the gem and utter the final word. The desired item is then transported instantly into the spellcaster’s right or left hand, as he desires.\n&emsp;The item must have been previously touched during the initial incantation and specifically named; only that particular item is summoned by the spell. During the initial incantation, the gem becomes magically inscribed with the name of the item to be summoned. The inscription is invisible and unreadable, except by means of a *read magic* spell, to all but the wizard who cast the summons.\n&emsp;If the item is in the possession of another creature, the spell does not work, and the caster knows who the possessor is and roughly where he, she, or it is located when the summons is cast. Items can be summoned from other planes of existence, but only if such items are not in the possession (not necessarily the physical grasp) of another creature. For each level of experience above the 14th, the wizard is able to summon a desired item from one plane farther removed from the plane he is in at the time the spell is cast (one plane away at 14th level, two planes away at 15th, etc.). Thus, a wizard of 16th level could cast the spell even if the desired item was on the second layer of one of the Outer Planes, but at 14th level the wizard would be able to summon the item only if it were no farther than one of the Inner Planes, the Ethereal Plane, or the Astral Plane (see the *PLANESCAPE Campaign Setting* boxed set). Note that special wards or barriers, or factors that block the *teleport* or *plane shift* spells, may also block the operation of this spell. Objects in Leomund’s secret chest cannot be recovered by using this spell. Note: If the item is wizard marked, it can be summoned from anywhere on the same plane unless special local conditions apply. Furthermore, the details of the location of the item are more specific, and the item is more easily traceable with other types of scrying magic.'
};

wiz7['Duo-Dimension'] = {
    'level': '7',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[3+[[@{level-wizard}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A flat ivory likeness of the spellcaster (which must be of finest workmanship, gold filigreed, and enameled and gem-studded at an average cost of 500 to 1,000 gp) and a strip of parchment',
    'reference': 'p. 233',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *duo-dimension* spell causes the caster to have only two dimensions, height and width, with no depth. He is thus invisible when turned sideways. This invisibility can be detected only by means of a *true seeing* spell or similar methods. In addition, the duo-dimensional wizard can pass through the thinnest of spaces as long as these have the proper height—going through the space between a door and its frame is a simple matter. The wizard can perform all actions normally. He can turn and become invisible, move in this state, and appear again next round and cast a spell, disappearing on the following round.\n&emsp;Note that when turned, the wizard cannot be affected by any form of attack, but when visible, he is subject to double the amount of damage normal for an attack form; for example, a dagger thrust would inflict 2d4 points of damage if it struck a duo-dimensional wizard. Furthermore, the wizard has a portion of his existence in the Astral Plane when the spell is in effect, and he is subject to possible notice by creatures there. If noticed, it is 25% probable that the wizard is pulled entirely into the Astral Plane by any attack from an astral creature. Such an attack (and any subsequent attack received on the Astral Plane) inflicts normal damage.\n&emsp;As the spell is uttered, the parchment is given half a twist and joined at the ends. The figurine is then passed through the parchment loop, and both disappear forever.'
};

wiz7['Finger of Death'] = {
    'level': '7',
    'school': 'Necromancy',
    'range': '60 yards',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '5',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 233',
    'book': 'PHB',
    'damage': 'Death or [[2d8+1]]',
    'damage-type': 'Negative energy',
    'healing': '',
    'effect': 'The *finger of death* spell snuffs out the victim’s life force. If successful, the victim can be neither raised nor resurrected. In addition, in human subjects the spell initiates changes to the body such that after three days the caster can, by means of a special ceremony costing not less than 1,000 gp plus 500 gp per body, animate the corpse as a juju zombie under the control of the caster. The changes can be reversed before animation by a *limited wish* or similar spell cast directly upon the body, and a full *wish* restores the subject to life.\n&emsp;The caster utters the *finger of death* spell incantation, points his index finger at the creature to be slain, and unless the victim succeeds in a saving throw vs. spell, death occurs. A creature successfully saving still receives 2d8+1 points of damage. If the subject dies of damage, no internal changes occur and the victim can then be revived normally.'
};

wiz7['Forcecage'] = {
    'level': '7',
    'school': 'Evocation',
    'range': '[[10*floor([[@{level-wizard}}]]/2)]] yards',
    'duration': '[[6+[[@{level-wizard}]] ]] turns',
    'aoe': '20-foot cube',
    'components': 'V, S, special',
    'cast-time': '3–4',
    'saving-throw': 'None',
    'materials': 'Powder of a diamond of at least 1,000 gp value, consumed during memorization',
    'reference': 'p. 234',
 'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This powerful spell enables the caster to bring into being a cube of force, but it is unlike the magical item of that name in one important respect: The forcecage does not have solid walls of force; it has alternating bands of force with 1⁄2-inch gaps between. Thus, it is truly a cage, rather than an enclosed space with solid walls. Creatures within the area of effect of the spell are caught and contained unless they are able to pass through the openings—and, of course, all spells and breath weapons can pass through the gaps in the bars of force of the forcecage.\n&emsp;A creature with magic resistance has a single attempt to pass through the walls of the cage. If the resistance check is successful, the creature escapes. If it fails, the creature is caged. Note that a successful check does not destroy the cage, nor does it enable other creatures (save familiars) to flee with the escaping creature. The forcecage is also unlike the solid-walled protective device, cube of force, in that it can be gotten rid of only by means of a *dispel magic* spell or by the expiration of the spell.\n&emsp;By means of special preparation at the time of memorization, a *forcecage* spell can be altered to a *forcecube* spell. The cube created is 10 feet on a side, and the spell then resembles that of a cube of force in all respects save that of the differences between a cast spell and the magic of a device, including the methods of defeating its power.\n&emsp;Although the actual casting of either application of the spell requires no material component, the study required to commit it to memory does demand that the wizard powder a diamond of at least 1,000 gp value, using the diamond dust to trace the outlines of the cage or cube he desires to create via spellcasting at some later time. Thus, in memorization, the diamond dust is employed and expended, for upon completion of study, the wizard must then toss the dust into the air and it will disappear.'
};

wiz7['Limited Wish'] = {
    'level': '7',
    'school': 'Conjuration/Summoning, Invocation/Evocation',
    'range': 'Unlimited',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': 'Special',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 234',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *limited wish* is a very potent but difficult spell. It will fulfill literally, but only partially or for a limited duration, the utterance of the spellcaster. Thus, the actuality of the past, present, or future might be altered (but possibly only for the wizard unless the wording of the spell is most carefully stated) in some limited manner. The use of a limited wish will not substantially change major realities, nor will it bring wealth or experience merely by asking. The spell can, for example, restore some hit points (or all hit points for a limited duration) lost by the wizard. It can reduce opponent hit probabilities or damage, increase duration of some magical effect, cause a creature to be favorably disposed to the spellcaster, mimic a spell of 7th level or less, and so on (see the 9th-level *wish* spell). Greedy desires usually end in disaster for the wisher. Casting time is based on the time spent preparing the wording for the spell (clever players decide what they want to say before using the spell). Normally, the casting time is one round (most of it being taken up by deciding what to say). Casting this spell ages the caster one year per 100 years of regular life span.'
};

wiz7['Mass Invisibility'] = {
    'level': '7',
    'school': 'Illusion/Phantasm',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '60 × 60 yards',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'An eyelash and a bit of gum arabic, the former encased in the latter',
    'reference': 'p. 234',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This is a more extensive adaptation of the *invisibility* spell for  battlefield use. It can hide creatures in a 60-yard × 60-yard area: up to 400 man-sized creatures, 30 to 40 giants, or six to eight large dragons. The effect is mobile with the unit and is broken when the unit attacks. Individuals leaving the unit become visible. The wizard can end this spell upon command.'
};

wiz7['Monster Summoning V'] = {
    'level': '7',
    'school': 'Conjuration/Summoning',
    'range': 'Special',
    'duration': '[[6+[[@{level-wizard}]] ]] rounds',
    'aoe': '70-yard radius',
    'components': 'V, S, M',
    'cast-time': '6',
    'saving-throw': 'None',
    'materials': 'A tiny bag and a small (not necessarily lit) candle',
    'reference': 'p. 234',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is much like the 3rd-level *monster summoning I* spell, except that this spell summons [[1d3]] 5th-level monsters. These appear within the spell’s area of effect and attack the caster’s opponents until either he commands them to cease, the spell duration expires, or the monsters are slain. These creatures do not check morale, and they vanish when slain. If no opponent exists to fight, summoned monsters can, if the wizard can communicate with them, and if they are physically capable, perform other services for the summoning wizard.'
};

wiz7['Mordenkainen\'s Magnificent Mansion'] = {
    'level': '7',
    'school': 'Alteration, Conjuration',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[300*[[@{level-wizard}]] ]] square feet',
    'components': 'V, S, M',
    'cast-time': '7 rounds',
    'saving-throw': 'None',
    'materials': 'A miniature portal carved from ivory, a small piece of polished marble, and a tiny silver spoon. These are utterly destroyed when the spell is cast.',
    'reference': 'p. 234',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard conjures up an extradimensional dwelling, entrance to which can be gained only at a single point of space on the plane from which the spell was cast. From the entry point, those creatures observing the area see only a faint shimmering in the air, in an area 4 feet wide and 8 feet high. The caster of the spell controls entry to the mansion, and the portal is shut and made invisible behind him when he enters. He may open it again from his own side at will. Once observers have passed beyond the entrance, they behold a magnificent foyer and numerous chambers beyond. The place is furnished and contains sufficient foodstuffs to serve a nine-course banquet to as many dozens of people as the spellcaster has levels of experience. Currently [[@{level-wizard}]] dozen ([[12*[[@{level-wizard}]] ]]) people. There is a staff of near-transparent servants, liveried and obedient, to wait upon all who enter. The atmosphere is clean, fresh, and warm.\n&emsp;Since the place can be entered only through its special portal, outside conditions do not affect the mansion, nor do conditions inside it pass to the plane beyond. Rest and relaxation within the place is normal, but the food is not. It seems excellent and quite filling as long as one is within the place. Once outside, however, its effects disappear immediately, and if those resting have not eaten real food within a reasonable time span, ravenous hunger strikes. Failure to eat normal food immediately results in the onset of fatigue or starvation penalties as decided by the DM.\n&emsp;(It is worth mentioning that this spell has been used in conjunction with a normal portal, as well as with illusion magic. There is evidence that the design and interior of the space created can be altered to suit the caster’s wishes.)'
};

wiz7['Mordenkainen\'s Sword'] = {
    'level': '7',
    'school': 'Evocation',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A miniature platinum sword with a grip and pommel of copper and zinc, which costs 500 gp to construct, and which disappears after the spell’s completion',
    'reference': 'p. 235',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, the wizard brings into being a shimmering, swordlike plane of force. The spellcaster is able to mentally wield this weapon (to the exclusion of all activities other than movement), causing it to move and strike as if it were being used by a fighter. The basic chance for Mordenkainen’s sword to hit is the same as the chance for a sword wielded by a fighter of half the level of the spellcaster. Currently a [[floor([[@{level-wizard}]]/2)]] level fighter. For example, if cast by a 14th-level wizard, the weapon has the same hit probability as a sword wielded by a 7th-level fighter.\n&emsp;The sword has no magical attack bonuses, but it can hit nearly any sort of opponent, even those normally struck only by +3 weapons or those who are astral, ethereal, or out of phase. It hits any Armor Class on a roll of 19 or 20. It inflicts 5d4 points of damage to opponents of man size or smaller, and 5d6 points of damage to opponents larger than man size. It lasts until the spell duration expires, a *dispel magic* is used successfully upon it, or its caster no longer desires it.'
};

wiz7['Phase Door'] = {
    'level': '7',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[floor([[@{level-wizard}]]/2)]] usages',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 235',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard attunes his body, and a section of wall is affected as if by a *passwall* spell. The phase door is invisible to all creatures save the spellcaster, and only he can use the space or passage the spell creates, disappearing when the phase door is entered, and appearing when it is exited. If the caster desires, one other creature of man size or less can be taken through the door; this counts as two uses of the door. The door does not pass light, sound, or spell effects, nor can the caster see through it without using it. Thus, the spell can provide an escape route, though certain creatures, such as phase spiders, can follow with ease. A *gem of true seeing* and similar magic will reveal the presence of a phase door but will not allow its use.\n&emsp;The phase door lasts for one usage for every two levels of experience of the spellcaster. It can be dispelled only by a casting of *dispel magic* from a higher-level wizard, or from several lower-level wizards, casting in concert, whose combined levels of experience are more than double that of the wizard who cast the spell (this is the only instance in which dispel effects can be combined).\n&emsp;Rumor has it that this spell has been adapted by a certain powerful wizard (or wizards) to create renewable (or permanent) portals, which may (or may not) be keyed to specific individuals (henchmen) or items (such as rings).'
};

wiz7['Power Word, Stun'] = {
    'level': '7',
    'school': 'Conjuration/Summoning',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 235',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *power word, stun* spell is uttered, any creature of the wizard’s choice is stunned—reeling and unable to think coherently or act—for a duration dependent on its current hit points. Of course, the wizard must be facing the creature, and the creature must be within the range of 5 yards per experience level of the caster. Creatures with 1 to 30 hit points are stunned for 4d4 rounds, those with 31 to 60 hit points are stunned for 2d4 rounds, those with 61 to 90 hit points are stunned for 1d4 rounds, and creatures with over 90 hit points are not affected. Note that if a creature is weakened so that its hit points are below its usual maximum, the current number of hit points is used.'
};

wiz7['Prismatic Spray'] = {
    'level': '7',
    'school': 'Conjuration/Summoning',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': '70 × 15 foot spray',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 235',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, the wizard causes seven shimmering, multicolored rays of light to flash from his hand in a triangular spray. This spray is 70 feet long and spreads to 15 feet wide at the end. It includes all colors of the visible spectrum; each ray has a different power and purpose. Any creature with fewer than 8 Hit Dice struck by a ray is blinded for 2d4 rounds, regardless of any other effect.\n&emsp;Any creature in the area of effect will be touched by one or more of the rays. To determine which ray strikes a creature, roll 1d8 and consult the following table:}}{{cs1-1=3}}{{c1-1=&emsp;**Prismatic Spray Results**\n&emsp;}}{{cs2-1=2}}{{c2-1=1 = red}}{{cs3-1=2}}{{c3-1=2 = orange}}{{cs4-1=2}}{{c4-1=3 = yellow}}{{cs5-1=2}}{{c5-1=4 = green}}{{c2-2=5 = blue}}{{c3-2=6 = indigo}}{{c4-2=7 = violet}}{{c5-2=8 = struck by two rays, roll again twice\n&emsp;(ignoring any 8s)\n&emsp;}}{{c6-1=**Color**\n**of Ray**}}{{c7-1=Red}}{{c8-1=Orange}}{{c9-1=Yellow}}{{c10-1=Green}}{{c11-1=Blue}}{{c12-1=Indigo}}{{c13-1=Violet}}{{cc6-2=center sheet-spell-fixed}}{{c6-2=**Order**\n**of Ray**}}{{cc7-2=center}}{{c7-2=1st}}{{cc8-2=center}}{{c8-2=2nd}}{{cc9-2=center}}{{c9-2=3rd}}{{cc10-2=center}}{{c10-2=4th}}{{cc11-2=center}}{{c11-2=5th}}{{cc12-2=center}}{{c12-2=6th}}{{cc13-2=center}}{{c13-2=7th}}{{cc6-3=bottom}}{{c6-3=**Effect of Ray**}}{{c7-3=Inflicts 20 points of damage,\nsave vs. spell for half.}}{{c8-3=Inflicts 40 points of damage,\nsave vs. spell for half.}}{{c9-3=Inflicts 80 points of damage,\nsave vs. spell for half.}}{{c10-3=Save vs. poison or die; survivors\nsuffer 20 points of poison damage.}}{{c11-3=Save vs. petrification or\nbe turned to stone.}}{{c12-3=Save vs. wand or go insane.}}{{c13-3=Save vs. spell or\nbe sent to another plane.'
};

wiz7['Reverse Gravity'] = {
    'level': '7',
    'school': 'Alteration',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '30 feet × 30 feet',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'Lodestone and iron filings',
    'reference': 'p. 236',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell reverses gravity in the area of effect, causing all unattached objects and creatures within it to “fall” upward. The reverse gravity lasts as long as the caster desires or until the spell expires. If some solid object is encountered in this “fall,” the object strikes it in the same manner as it would during a normal downward fall. At the end of the spell duration, the affected objects and creatures fall downward. As the spell affects an area, objects tens, hundreds, or even thousands of feet in the air above the area can be affected.'
};

wiz7['Sequester'] = {
    'level': '7',
    'school': 'Illusion/Phantasm, Abjuration',
    'range': 'Touch',
    'duration': '[[7+[[@{level-wizard}]] ]] days',
    'aoe': '[[@{level-wizard}]] 2-foot cubes',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'Special',
    'materials': 'A basilisk eyelash, gum arabic, and a dram of whitewash',
    'reference': 'p. 236',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When cast, this spell not only prevents detection and location spells from working to detect or locate the objects affected by the *sequester* spell, it also renders the affected object(s) invisible to any form of sight or seeing. Thus, a *sequester* spell can mask a secret door, a treasure vault, etc. Of course, the spell does not prevent the subject from being discovered through tactile means or through the use of devices (such as a *robe of eyes* or a *gem of seeing*). If cast upon a creature who is unwilling to be affected, the creature receives a normal saving throw. Living creatures (and even undead types) affected by a *sequester* spell become comatose and are effectively in a state of suspended animation until the spell wears off or is dispelled.'
};

wiz7['Shadow Walk'] = {
    'level': '7',
    'school': 'Illusion, Enchantment',
    'range': 'Touch',
    'duration': '[[6*[[@{level-wizard}]] ]] turns',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 236',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'In order to use the *shadow walk* spell, the wizard must be in an area of heavy shadows. The caster and any creature he touches are then transported to the edge of the Prime Material Plane where it borders the Demiplane of Shadow. In this region, the wizard can move at a rate of up to 7 miles per turn, moving normally on the borders of the Demiplane of Shadow but much more rapidly relative to the Prime Material Plane. Thus, a wizard can use this spell to travel rapidly by stepping onto the Demiplane of Shadow, moving the desired distance, and then stepping back onto the Prime Material Plane. The wizard knows where he will come out on the Prime Material Plane.\n&emsp;The *shadow walk* spell can also be used to travel to other planes that border on the Demiplane of Shadow, but this requires the potentially perilous transit of the Demiplane of Shadow to arrive at a border with another plane of reality.\n&emsp;Any creatures touched by the wizard when *shadow walk* is cast also make the transition to the borders of the Demiplane of Shadow. They may opt to follow the wizard, wander off through the plane, or stumble back into the Prime Material Plane (50% chance for either result if they are lost or abandoned by the wizard). Creatures unwilling to accompany the wizard into the Demiplane of Shadow receive a saving throw, negating the effect if successful.'
};

wiz7['Simulacrum'] = {
    'level': '7',
    'school': 'Illusion/Phantasm',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'None',
    'materials': 'Ice or snow to form the body, some piece of the creature to be duplicated, and powdered ruby',
    'reference': 'p. 236',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the wizard is able to create a duplicate of any creature. The duplicate appears to be exactly the same as the original, but there are differences: The simulacrum has only 51% to 60% (50% + 1d10% = [[50+1d10]]%) of the hit points of the real creature, there are personality differences, there are areas of knowledge that the duplicate does not have, and a *detect magic* spell will instantly reveal it as a simulacrum, as will a *true seeing* spell. At all times the simulacrum remains under the absolute command of the wizard who created it. No special telepathic link exists, so command must be exercised in some other manner. The spell creates the form of the creature, but it is only a zombielike creation. A *reincarnation* spell must be used to give the duplicate a vital force, and a *limited wish* spell must be used to empower the duplicate with 40% to 65% (35% + 5 to 30%) of the knowledge and personality of the original. The level of the simulacrum, if any, is from 20% to 50% of that of the original creature.\n&emsp;The duplicate creature is formed from ice or snow. The spell is cast over the rough form and some piece of the creature to be duplicated must be placed inside the snow or ice. Additionally, the spell requires powdered ruby.\n&emsp;The simulacrum has no ability to become more powerful; it cannot increase its level or abilities. If destroyed, it reverts to snow and melts into nothingness. Damage to the simulacrum can be repaired by a complex process requiring at least one day, 100 gp per hit point, and a fully equipped laboratory.'
};

wiz7['Spell Turning'] = {
    'level': '7',
    'school': 'Abjuration',
    'range': '0',
    'duration': 'Up to [[3*[[@{level-wizard}]] ]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'A small silver mirror',
    'reference': 'p. 237',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This powerful abjuration causes spells cast against the wizard to rebound on the original caster. This includes spells cast from scrolls and innate spell-like abilities, but specifically excludes the following: area effects that are not centered directly upon the protected wizard, spell effects delivered by touch, and spell effects from devices such as wands, staves, etc. Thus, a *light* spell cast to blind the protected wizard could be turned back upon and possibly blind the caster, while the same spell would be unaffected if cast to light an area within which the protected wizard is standing.\n&emsp;From seven to ten spell levels are affected by the turning. The exact number is secretly rolled by the DM; the player never knows for certain how effective the spell is.\n&emsp;A spell may be only partially turned—divide the number of remaining levels that can be turned by the spell level of the incoming spell to see what fraction of the effect is turned, with the remainder affecting the caster. For example, an incoming fireball is centered on a wizard with one level of spell turning left. This means that ⅔ of the fireball affects the protected wizard, ⅓ affects the caster, and each is the center of a fireball effect. If the rolled damage is 40 points, the protected wizard receives 27 points of damage and the caster suffers 13. Both (and any creatures in the respective areas) can roll saving throws vs. spell for half damage. A partially turned *hold* or *paralysis* spell will act as a *slow* spell on those who are 50% or more affected.\n&emsp;If the protected wizard and a spellcasting attacker both have spell turning effects operating, a resonating field is created that has the following effects:}}{{style=center1}}{{c1-1=**D100 Roll**}}{{c2-1=01–70}}{{c3-1=71–80}}{{c4-1=81–97}}{{c5-1=98–00}}{{c1-2=**Effect**}}{{cc1-2=bottom}}{{c2-2=Spell drains away without effect}}{{c3-2=Spell affects both equally at full damage}}{{c4-2=Both turning effects are rendered nonfunctional for 1d4 turns}}{{c5-2=Both casters go through a rift into the Positive Energy plane'
};

wiz7['Statue'] = {
    'level': '7',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'Special',
    'materials': 'Lime, sand, and a drop of water stirred by an iron bar, such as a nail or spike',
    'reference': 'p. 237',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *statue* spell is cast, the wizard or other creature is apparently turned to solid stone, along with any garments and equipment worn or carried. The initial transformation from flesh to stone requires one full round after the spell is cast.\n&emsp;During the transformation, there’s an 18% chance that the targeted creature suffers a system shock failure and dies. The creature must roll percentile dice and add its Constitution score to the roll. If the total is 18 or less, the creature dies. If the total is 19 or more, the creature survives the transformation; the creature can withstand any inspection and appear to be a stone statue, although faint magic is detected from the stone if someone checks for it. Note that a creature with a Constitution of 18 or more will always survive the transformation.\n&emsp;Despite being in this condition, the petrified individual can see, hear, and smell normally. Feeling is limited to those sensations that can affect the granite-hard substance of the individual’s body—i.e., chipping is equal to a slight wound, but breaking off one of the statue’s arms is serious damage.\n&emsp;The individual under the magic of a *statue* spell can return to his normal state instantly, act, and then return to the statue state, if he so desires, as long as the spell duration is in effect.'
};

wiz7['Teleport Without Error'] = {
    'level': '7',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 238',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is similar to the *teleport* spell. The caster is able to transport himself, along with the material weight noted for a *teleport* spell, to any known location in his home plane with no chance for error. The spell also enables the caster to travel to other planes of existence, but any such plane is, at best, “studied carefully.” This assumes that the caster has, in fact, actually been to the plane and carefully perused an area for an eventual *teleportation without error* spell. The table for the *teleport* spell is used, with the caster’s knowledge of the area to which transportation is desired used to determine the chance of error. (For an exception, see the 9th-level wizard spell *succor*.) The caster can do nothing else in the round that he appears from a teleport.'
};

wiz7['Vanish'] = {
    'level': '7',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 object',
    'components': 'V',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 238',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the wizard employs this spell, he causes an object to vanish (i.e., to be teleported as if by a *teleport* spell) if it weighs no more than 50 pounds per caster level. Currently [[50*[[@{level-wizard}]] ]] pounds. Thus, a 14th-level caster can vanish, and cause to reappear at a desired location, an object up to 700 pounds in weight. The maximum volume of material that can be affected is 3 cubic feet per level of experience. Currently [[3*[[@{level-wizard}]] ]] cubic feet. Thus, both weight and volume limit the spell. An object that exceeds either limitation is unaffected and the spell fails.\n&emsp;If desired, a vanished object can be placed deep within the Ethereal Plane. In this case, the point from which the object vanished remains faintly magical until the item is retrieved. A successful *dispel magic* spell cast on the point will bring the vanished item back from the Ethereal Plane. Note that creatures and magical forces cannot be made to vanish.\n&emsp;There is a 1% chance that a vanished item will be disintegrated instead. There is also a 1% chance that a creature from the Ethereal Plane is able to gain access to the Prime Material Plane through the vanished item’s connection.'
};

wiz7['Vision'] = {
    'level': '7',
    'school': 'Divination',
    'range': '0',
    'duration': 'Special',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '7',
    'saving-throw': 'None',
    'materials': 'The sacrifice of something valued by the spellcaster or by the power supplicated (see below)',
    'reference': 'p. 238',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a wizard wishes to gain supernatural guidance, he casts a *vision* spell, calling upon whatever power he desires aid from and asking a question that will be answered with a vision. Two six-sided dice are rolled. If they total 2 to 6, the power is annoyed and refuses to answer the question; instead, the power causes the wizard to perform some service (by an ultrapowerful geas or quest). If the dice total 7 to 9, the power is indifferent and gives some minor vision, though it may be unrelated to the question. If the dice total 10 or better, the power grants the vision.\n&emsp;The material component of the spell is the sacrifice of something valued by the spellcaster or by the power supplicated. The more precious the sacrifice, the better the chance of spell success. A very precious item grants a bonus of +1 to the dice roll, an extremely precious item adds +2, and a priceless item adds +3.'
};

const wiz8 = {};
wiz8['Antipathy-Sympathy'] = {
    'level': '8',
    'school': 'Enchantment/Charm',
    'range': '30 yards',
    'duration': '[[2*[[@{level-wizard}]] ]] hours',
    'aoe': '[[@{level-wizard}]] 10-foot cubes or one item',
    'components': 'V, S, M',
    'cast-time': '1 hour',
    'saving-throw': 'Special',
    'materials': '*Antipathy:* A lump of alum soaked in vinegar. *Sympathy:* 1,000 gp worth of crushed pearls and a drop of honey.',
    'reference': 'p. 238',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the wizard to set certain vibrations to emanate from an object or location that tend to either repel or attract a specific type of intelligent creature or characters of a particular alignment. The wizard must decide which effect is desired with regard to what creature type or alignment before beginning the spellcasting, for the components of each application differ. The spell cannot be cast upon living creatures.\n&emsp;*Antipathy:* This spell causes the affected creature or alignment type to feel an overpowering urge to leave the area or to not touch the affected item. If a saving throw vs. spell is successful, the creature can stay in the area or touch the item, but the creature will feel very uncomfortable, and a persistent itching will cause it to suffer the loss of 1 point of Dexterity per round (for the spell’s duration), subject to a maximum loss of 4 points and a minimum Dexterity of 3. Failure to save vs. spell forces the being to abandon the area or item, shunning it permanently and never willingly returning to it until the spell is removed or expires.\n&emsp;*Sympathy:* By casting the sympathy application of the spell, the wizard can cause a particular type of creature or alignment of character to feel elated and pleased to be in an area or touching or possessing an object or item. The desire to stay in the area or touch the object is overpowering. Unless a saving throw vs. spell is successfully rolled, the creature or character will stay or refuse to release the object. If the saving throw is successful, the creature or character is released from the enchantment, but a subsequent saving throw must be made 1d6 turns later. If this saving throw fails, the affected creature will return to the area or object.\n&emsp;Note that the particular type of creature to be affected must be named specifically—for example, red dragons, hill giants, wererats, lammasu, catoblepas, vampires, etc. Likewise, the specific alignment must be named—for example, chaotic evil, chaotic good, lawful neutral, true neutral, etc.\n&emsp;If this spell is cast upon an area, a 10-foot cube can be enchanted for each experience level of the caster. If an object or item is enchanted, only that single thing can be enchanted; affected creatures or characters save vs. spell with a –2 penalty.'
};

wiz8['Bigby\'s Clenched Fist'] = {
    'level': '8',
    'school': 'Evocation',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'A leather glove and a small device (similar to brass knuckles) consisting of four rings joined so as to form a slightly curved line, with an “I” upon which the bottoms of the rings rest. The device must be fashioned of an alloy of copper and zinc.',
    'reference': 'p. 239',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *Bigby’s clenched fist* spell brings forth a huge, disembodied hand that is balled into a fist. This magical member is under the mental control of the spellcaster, who can cause it to strike one opponent each round. No concentration is required once the spell is cast. The clenched fist never misses, but it can only strike as directed by the caster. Thus, it can be fooled by invisibility or other methods of concealment and misdirection. The effectiveness of its blows varies from round to round.}}{{style=center1 sheet-spell-bottom2}}{{c1-1=**D20 Roll**}}{{c2-1=1–12}}{{c3-1=13–16}}{{c4-1=17–19}}{{c5-1=20}}{{c1-2=**Result**}}{{c2-2=Glancing blow—1d6 hp}}{{c3-2=Solid punch—2d6 hp}}{{c4-2=Hard punch—3d6 hp; opponent is stunned for next round}}{{c5-2=Crushing blow*—4d6 hp; opponent is stunned for next three rounds}}{{effects2=* The wizard adds +4 to the die rolls of subsequent attacks if the opponent is stunned, as the opponent is not capable of dodging or defending against the attack effectively.\n\n&emsp;The fist has an Armor Class of 0, and is destroyed by damage equal to the hit points of its caster at full health.'
};

wiz8['Binding'] = {
    'level': '8',
    'school': 'Enchantment, Evocation',
    'range': '10 yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': 'Special',
    'saving-throw': 'Special',
    'materials': 'A miniature chains of special metal (silver for lycanthropes, etc.), soporific herbs of the rarest sort, a corundum or diamond gem of great size (1,000 gp value per Hit Die of the subject creature), and a vellum depiction or carved statuette of the subject to be captured.',
    'reference': 'p. 239',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *binding* spell creates a magical restraint to hold a creature, usually from another plane of existence. Extraplanar creatures must be confined by a circular diagram; other creatures can be physically confined. The duration of the spell depends upon the form of the binding and the level of the caster(s), as well as the length of time the spell is actually uttered. The components vary according to the form of the spell, but they include a continuous chanting utterance read from the scroll or book page giving the spell; gestures appropriate to the form of binding;\n&emsp;Magic resistance applies unless the subject’s true name is used. A saving throw is not applicable as long as the experience level of the caster is at least twice as great as the Hit Dice of the subject. The caster’s level can be augmented by one-third of the levels of each assisting wizard of 9th level or higher, and by one level for each assistant of 4th through 8th level. No more than six other wizards can assist with this spell. If the caster’s level is less than twice the Hit Dice of the subject, the subject gains a saving throw vs. spell, modified by the form of binding being attempted. The various forms of binding are:\n&emsp;*Chaining:* The subject is confined by restraints that generate an *antipathy* spell affecting all creatures who approach the subject, except the caster. Duration is as long as one year per level of the caster(s). The subject of this form of binding (as well as in the slumber and bound slumber versions) remains within the restraining barrier.\n&emsp;*Slumber:* Brings a comatose sleep upon the subject for a duration of up to one year per level of the caster(s).\n&emsp;*Bound Slumber:* A combination of chaining and slumber that lasts for up to one month per level of the caster(s).\n&emsp;*Hedged Prison:* The subject is transported to or otherwise brought within a confined area from which it cannot wander by any means until freed. The spell remains until the magical hedge is somehow broken.\n&emsp;*Metamorphosis:* Causes the subject to change to some noncorporeal form, save for its head or face. The binding is permanent until some prescribed act frees the subject.\n&emsp;*Minimus Containment:* The subject is shrunken to a height of 1 inch or even less and held within the hedged prison of some gem or similar object. The subject of a minimus containment, metamorphosis, or hedged prison radiates a very faint aura of magic.\n&emsp;The subject of the chaining form of the spell receives a saving throw with no modifications. However, slumber allows the subject a +1 bonus, bound slumber a +2 bonus, hedged prison a +3 bonus, metamorphosis a +4 bonus, and minimus containment a +5 bonus to the saving throw. If the subject is magically weakened, the DM can assign a –1, –2, or even –4 penalty to the saving throw. A successful saving throw enables the subject to burst its bonds and do as it pleases.\n&emsp;A *binding* spell can be renewed in the case of the first three forms of the spell, for the subject does not have the opportunity to break the bonds. (If anything has caused a weakening of a chaining or slumber version, such as attempts to contact the subject or magically touch it, a normal saving throw applies to the renewal of the spell.) Otherwise, after one year, and each year thereafter, the subject gains a normal saving throw vs. the spell. Whenever it is successful, the *binding* spell is broken and the creature is free.'
};

wiz8['Clone'] = {
    'level': '8',
    'school': 'Necromancy',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 clone',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A small piece of the flesh from the person to be duplicated.',
    'reference': 'p. 240',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a duplicate of a human, demihuman, or humanoid creature. This clone is in most respects the duplicate of the individual, complete to the level of experience, memories, etc. However, the duplicate really *is* the person, so if the original and a duplicate exist at the same time, each knows of the other’s existence; the original person and the clone will each desire to do away with the other, for such an alter-ego is unbearable to both. If one cannot destroy the other, one will go insane and destroy itself (90% likely to be the clone), or possibly both will become mad and destroy themselves (2% chance). These events nearly always occur within one week of the dual existence.\n&emsp;Note that the clone is the person as he existed at the time at which the flesh was taken for the spell component, and all subsequent knowledge, experience, etc., is totally unknown to the clone. The clone is a physical duplicate, and possessions of the original are another matter entirely. A clone takes [[2d4]] months to grow, and only after that time is dual existence established. Furthermore, the clone has one less Constitution point than the body it was cloned from; the cloning fails if the clone would have a Constitution of 0.\n&emsp;The DM may, in addition, add other stipulations to the success of a cloning effort, requiring that some trace of life must remain in the flesh sample, that some means of storing and preserving the sample must be devised and maintained, etc.'
};

wiz8['Demand'] = {
    'level': '8',
    'school': 'Evocation, Enchantment/Charm',
    'range': 'Unlimited',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'Special',
    'materials': 'A pair of cylinders, each open at one end, connected by a thin piece of copper wire and some small part of the subject creature—a hair, a bit of nail, etc.',
    'reference': 'p. 240',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is very much like the 5th-level wizard spell *sending*, allowing a brief contact with a far distant creature. However, with this spell the message can also contain a suggestion (see the 3rd-level wizard spell *suggestion*), which the subject will do its best to carry out if it fails its saving throw vs. spell, made with a –2 penalty. Of course, if the message is impossible or meaningless according to the circumstances that exist for the subject at the time the demand comes, the message is understood but no saving throw is necessary and the suggestion is ineffective.\n&emsp;The caster must be familiar with the creature contacted and must know its name and appearance well. If the creature in question is not in the same plane of existence as the spellcaster, there is a base 5% chance that the demand does not arrive. Local conditions on other planes may worsen this chance considerably at the option of the DM. The demand, if received, will be understood even if the creature has an Intelligence ability score as low as 1 (animal Intelligence). Creatures of demigod status or higher can choose to come or not, as they please.\n&emsp;The demand message to the creature must be 25 words or less, including the suggestion. The creature can also give a short reply immediately.'
};

wiz8['Glassteel'] = {
    'level': '8',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Object touched',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'A small piece of glass and a small piece of steel.',
    'reference': 'p. 240',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *glassteel* spell turns normal, nonmagical crystal or glass into a transparent substance that has the tensile strength and unbreakability of actual steel. Only a relatively small volume of material can be affected (a maximum weight of 10 pounds per level of experience of the spellcaster, currently [[10*[[@{level-wizard}]] ]] pounds), and it must form one whole object. The Armor Class of the substance is 1.'
};

wiz8['Incendiary Cloud'] = {
    'level': '8',
    'school': 'Alteration, Evocation',
    'range': '30 yards',
    'duration': '[[4+1d6]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': '½',
    'materials': 'An available fire source (just as with a *pyrotechnics* spell), scrapings from beneath a dung pile, and a pinch of dust.',
    'reference': 'p. 240',
    'book': 'PHB',
    'damage': '[[@{level-wizard}]]d2 + [[@{level-wizard}]]d4 + [[@{level-wizard}]]d2 (see below for details)',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'An *incendiary cloud* spell exactly resembles the smoke effects of a *pyrotechnics* spell, except that its minimum dimensions are a cloud 10 feet tall, 20 feet wide, and 20 feet long. This dense vapor cloud billows forth, and on the third round of its existence begins to flame, causing 1–2 points of damage per level of the spellcaster. On the fourth round it inflicts 1d4 points of damage per level of the caster, and on the fifth round this drops back to 1–2 points of damage per level as its flames burn out. In any successive rounds of existence, the cloud is simply harmless smoke that obscures vision within its confines. Creatures within the cloud need to make only one saving throw if it is successful, but if they fail the first saving throw, they roll again on the fourth and fifth rounds (if necessary) to attempt to reduce the damage sustained by one-half.'
};

wiz8['Mass Charm'] = {
    'level': '8',
    'school': 'Enchantment/Charm',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '30-foot cube',
    'components': 'V',
    'cast-time': '8',
    'saving-throw': 'Negate',
    'materials': '',
    'reference': 'p. 241',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *mass charm* spell affects either persons or monsters just as a *charm person* or *charm monster* spell. The *mass charm* spell, however, affects a number of creatures whose combined levels of experience or Hit Dice does not exceed twice the level of experience of the spellcaster. Currently [[2*[[@{level-wizard}]]]] levels or Hit Dice. All affected creatures must be within the spell range and within a 30-foot cube. Note that the creatures’ saving throws are unaffected by the number of recipients (see the *charm person* and *charm monster* spells), but all target creatures are subject to a penalty of –2 on their saving throws because of the efficiency and power of this spell. The Wisdom bonus against charm spells does apply.'
};

wiz8['Maze'] = {
    'level': '8',
    'school': 'Conjuration/Summoning',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 241',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'An extradimensional space is brought into being upon the utterance of a *maze* spell. The subject vanishes into the shifting labyrinth of force planes for a period of time that is dependent upon its Intelligence. (Note: Minotaurs are not affected by this spell.)}}{{style=center1 sheet-spell-center2}}{{c1-1=**Intelligence of**\n**Mazed Creature**}}{{c2-1=under 3}}{{c3-1=3–5}}{{c4-1=6–8}}{{c5-1=9–11}}{{c6-1=12–14}}{{c7-1=15–17}}{{c8-1=18+}}{{c1-2=**Time Trapped**\n**in Maze**}}{{c2-2=2d4 turns}}{{c3-2=1d4 turns}}{{c4-2=5d4 rounds}}{{c5-2=4d4 rounds}}{{c6-2=3d4 rounds}}{{c7-2=2d4 rounds}}{{c8-2=1d4 rounds}}{{effects2=\n&emsp;Note that teleport and *dimension door* spells will not help a character escape a *maze* spell, although a *plane shifting* spell will.'
};

wiz8['Mind Blank'] = {
    'level': '8',
    'school': 'Abjuration',
    'range': '30 yards',
    'duration': '1 day',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 241',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When the very powerful *mind blank* spell is cast, the creature is totally protected from all devices and spells that detect, influence, or read emotions or thoughts. This protects against *augury, charm, command, confusion, divination, empathy* (all forms), *ESP, fear, feeblemind, mass suggestion, phantasmal killer, possession, rulership, soul trapping, suggestion,* and *telepathy*. Cloaking protection also extends to the prevention of discovery or information gathering by *crystal balls* or other scrying devices, *clairaudience, clairvoyance, communing, contacting other planes*, or wish-related methods (*wish* or *limited wish*). Of course, exceedingly powerful deities can penetrate the spell’s barrier.'
};

wiz8['Monster Summoning VI'] = {
    'level': '8',
    'school': 'Conjuration/Summoning',
    'range': 'Special',
    'duration': '[[7+[[@{level-wizard}]] ]] rounds',
    'aoe': '80-yard radius',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'None',
    'materials': 'A tiny bag and a small (not necessarily lit) candle.',
    'reference': 'p. 241',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is much like the 3rd-level spell *monster summoning I*, except that it summons [[1d3]] 6th-level monsters. These monsters appear in [[1d3]] rounds within the spell’s area of effect and attack the caster’s opponents, until either he commands them to cease, the spell duration expires, or the monsters are slain. These creatures do not check morale, and they vanish when slain. If no opponent exists to fight, summoned monsters can, if the wizard can communicate with them, and if they are physically capable, perform other services for the summoning wizard.'
};

wiz8['Otiluke\'s Telekinetic Sphere'] = {
    'level': '8',
    'school': 'Evocation, Alteration',
    'range': '20 yards',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': 'sphere with diameter of [[@{level-wizard}]] feet',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Negate',
    'materials': 'A hemispherical piece of diamond and a matching piece of gum arabic, as well as a pair of small bar magnets',
    'reference': 'p. 241',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is exactly the same as the 4th-level wizard spell *Otiluke’s resilient sphere,* with the addition that the creatures or objects inside the globe are nearly weightless—anything contained within it weighs only 1⁄16 its normal weight. Any subject weighing up to 5,000 pounds can be telekinetically lifted in the sphere by the caster. Range of control extends to a maximum distance of 10 yards per level after the sphere has actually succeeded in encapsulating a subject or subjects. Currently [[10*[[@{level-wizard}]] ]] yards. Note that even if more than 5,000 pounds of weight is englobed, the perceived weight is only 1⁄16 of the actual weight, so the orb can be rolled without exceptional effort. Because of the reduced weight, rapid motion or falling within the field of the sphere is relatively harmless to the object therein, although it can be disastrous should the globe disappear when the subject inside is high above a hard surface. The caster can dismiss the effect with a word.'
};

wiz8['Otto\'s Irresistible Dance'] = {
    'level': '8',
    'school': 'Enchantment/Charm',
    'range': 'Touch',
    'duration': '[[1d4+1]] rounds',
    'aoe': 'Creature touched',
    'components': 'V',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 241',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When an *Otto’s irresistible dance* spell is placed upon a creature, the spell causes the recipient to begin dancing, complete with feet shuffling and tapping. This dance makes it impossible for the victim to do anything other than caper and prance; this cavorting worsens the Armor Class of the creature by –4, makes saving throws impossible except on a roll of 20, and negates any consideration of a shield. Note that the creature must be touched, as if melee combat were taking place and the spellcaster were striking to do damage.'
};

wiz8['Permanency'] = {
    'level': '8',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '2 rounds',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 242',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell affects the duration of certain other spells, making the duration permanent. The personal spells upon which a *permanency* is known to be effective are as follows:}}{{c1-1=*comprehend languages*}}{{c2-1=*detect evil*}}{{c3-1=*detect invisibility*}}{{c4-1=*detect magic*}}{{c5-1=*infravision*}}{{c6-1=*protection from cantrips*}}{{c1-2=*protection from evil*}}{{c2-2=*protection from normal missiles*}}{{c3-2=*read magic*}}{{c4-2=*tongues*}}{{c5-2=*unseen servant*}}{{cs7-1=2}}{{cc7-1=justify}}{{c7-1=&emsp;\n&emsp;The wizard casts the desired spell and then follows it with the *permanency* spell. Each *permanency* spell lowers the wizard’s Constitution by 1 point. The wizard cannot cast these spells upon other creatures. This application of permanency can be dispelled only by a wizard of greater level than the spellcaster was when he cast the spell.\n&emsp;In addition to personal use, the *permanency* spell can be used to make the following object/creature or area-effect spells permanent:\n&emsp;}}{{c8-1=*enlarge*}}{{c9-1=*fear*}}{{c10-1=*gust of wind*}}{{c11-1=*invisibility*}}{{c12-1=*magic mouth*}}{{c8-2=*prismatic sphere*}}{{c9-2=*stinking cloud*}}{{c10-2=*wall of fire*}}{{c11-2=*wall of force*}}{{c12-2=*web*}}{{cs13-1=2}}{{cc13-1=justify}}{{c13-1=&emsp;\n&emsp;Additionally, the following spells can be cast upon objects or areas only and rendered permanent:\n&emsp;}}{{c14-1=*alarm*}}{{c15-1=*audible glamer*}}{{c16-1=*dancing lights*}}{{c17-1=*solid fog*}}{{c14-2=*wall of fire*}}{{c15-2=*distance distortion*}}{{c16-2=*teleport*}}{{effects2=&emsp;These applications to other spells allow it to be cast simultaneously with any of the latter when no living creature is the target, but the entire spell complex then can be dispelled normally, and thus negated.\n&emsp;The *permanency* spell is also used in the fabrication of magical items (see the 6th-level spell *enchant an item*). At the DM’s option, permanency might become unstable or fail after a long period of at least 1,000 years. Unstable effects might operate intermittently or fail altogether.\n&emsp;The DM may allow other selected spells to be made permanent. Researching this possible application of a spell costs as much time and money as independently researching the selected spell. If the DM has already determined that the application is not possible, the research automatically fails. Note that the wizard never learns what is possible except by the success or failure of his research.'
};

wiz8['Polymorph Any Object'] = {
    'level': '8',
    'school': 'Alteration',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Variable',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'Mercury, gum arabic, and smoke',
    'reference': 'p. 242',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell changes one object or creature into another. When used as a *polymorph other* or *stone to flesh* spell, simply treat the spell as a more powerful version, with saving throws made with –4 penalties to the die roll. When it is cast in order to change other objects, the duration of the spell depends on how radical a change is made from the original state to its enchanted state, as well as how different it is in size. The DM determines the changes by using the following guidelines:}}{{c1-1=*Kingdom*}}{{c2-1=*Class*}}{{c3-1=*Relationship*}}{{c4-1=*Size*}}{{c5-1=*Shape*}}{{c6-1=*Intelligence*}}{{c1-2=Animal, vegetable, mineral}}{{c2-2=Mammals, bipeds, fungi, metals, etc.}}{{c3-2=Twig is to tree, sand is to beach, etc.}}{{c4-2=Smaller, equal, larger}}{{c5-2=Comparative resemblance of the original to the polymorphed state}}{{c6-2=Particularly with regard to a change in which the end product is more intelligent}}{{effects2=&emsp;A change in *kingdom* makes the spell work for hours (if removed by one kingdom) or turns (if removed by two). Other changes like-wise affect spell duration. Thus, changing a lion to an androsphinx would be permanent, but turning a turnip to a purple worm would be a change with a duration measured in hours. Turning a tusk into an elephant would be permanent, but turning a twig into a sword would be a change with a duration of several turns.\n&emsp;All polymorphed objects radiate a strong magic, and if a *dispel magic* spell is successfully cast upon them, they return to their natural form. Note that a *stone to flesh* spell or its reverse will affect objects under this spell. As with other polymorph spells, damage sustained in the new form can result in the injury or death of the polymorphed creature.\n&emsp;For example, it is possible to polymorph a creature into rock and grind it to dust, causing damage, perhaps even death. If the creature was changed to dust to start with, more creative methods to damage it would be needed; perhaps the wizard could use a *gust of wind* spell to scatter the dust far and wide. In general, damage occurs when the new form is altered through physical force, although the DM will have to adjudicate many of these situations.\n&emsp;The system shock roll must be applied to living creatures, as must the restrictions noted regarding the *polymorph other* and *stone to flesh* spells. Also note that a polymorph effect often detracts from an item’s or creature’s powers, but does not add new powers, except possibly movement capabilities not present in the old form. Thus, a *vorpal sword* polymorphed into a dagger would not retain vorpal capability. Likewise, valueless items cannot be made into permanent valuable items.'
};

wiz8['Power Word, Blind'] = {
    'level': '8',
    'school': 'Conjuration/Summoning',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '15-foot radius',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 243',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *power word, blind* spell is cast, one or more creatures within the area of effect become sightless. The spellcaster selects one creature as the target center, and the effect spreads outward from the center, affecting creatures with the lowest hit point totals first; the spell can also be focused to affect only an individual creature. The spell affects up to 100 hit points of creatures; creatures who currently have 100 or more hit points are not affected and do not count against the number of creatures affected. The duration of the spell depends upon how many hit points are affected. If 25 or fewer hit points are affected, the blindness is permanent until cured. If 26 to 50 hit points are affected, the blindness lasts for [[1d4+1]] turns. If 51 to 100 hit points are affected, the spell lasts for [[1d4+1]] rounds. An individual creature cannot be partially affected. If all of its current hit points are affected, it is blinded; otherwise, it is not. Blindness can be removed by a *cure blindness* or *dispel magic* spell.'
};

wiz8['Prismatic Wall'] = {
    'level': '8',
    'school': 'Conjuration/Summoning',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '[[4*[[@{level-wizard}]] ]] feet wide x [[2*[[@{level-wizard}]] ]] feet high',
    'components': 'V, S',
    'cast-time': '7',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 243',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to conjure a vertical, opaque wall—a shimmering, multicolored plane of light that protects him from all forms of attack. The wall flashes with all colors of the visible spectrum, seven of which have a distinct power and purpose. The wall is immobile, and the spellcaster can pass through the wall without harm. However, any creature with fewer than 8 Hit Dice that is within 20 feet of the wall and does not shield its vision is blinded for 2d4 rounds by the colors.\n&emsp;Each color in the wall has a special effect. Each color can also be negated by a specific magical effect, but the colors must be negated in the precise order of the spectrum. The accompanying table shows the seven colors of the wall, the order in which they appear, their effects on creatures trying to attack the spellcaster, and the magic needed to negate each color.\n&emsp;The wall’s maximum proportions are 4 feet wide per level of experience of the caster and 2 feet high per level of experience. A *prismatic wall* spell cast to materialize in a space occupied by a creature is disrupted and the spell is wasted.}}{{style=center2 sheet-spell-bottom4}}{{cs1-1=4}}{{cc1-1=center}}{{c1-1=**Prismatic Wall Effects**}}{{c2-1=**Color**}}{{cc2-1=bottom}}{{c3-1=Red}}{{c4-1=Orange}}{{c5-1=Yellow}}{{c6-1=Green}}{{c7-1=Blue}}{{c8-1=Indigo}}{{c9-1=Violet}}{{c2-2=**Order**}}{{cc2-2=bottom}}{{c3-2=1st}}{{c4-2=2nd}}{{c5-2=3rd}}{{c6-2=4th}}{{c7-2=5th}}{{c8-2=6th}}{{c9-2=7th}}{{c2-3=**Effect of Color**}}{{cc2-3=bottom}}{{c3-3=Stops nonmagical missiles—inflicts 20 points of damage, save for half}}{{c4-3=Stops magical missiles—inflicts 40 points of damage, save for half}}{{c5-3=Stops poisons, gases, and petrification—inflicts 80 points of damage, save for half}}{{c6-3=Stops breath weapons—save vs. poison or die; survivors suffer 20 points of damage}}{{c7-3=Stops location/detection and mental attacks—save vs. petrification or turn to stone}}{{c8-3=Stops magical spells—save vs. wand or go insane}}{{c9-3=Force field protection—save vs. spell or be sent to another plane}}{{c2-4=**Spell Negated By**}}{{c3-4=*cone of cold*}}{{c4-4=*gust of wind*}}{{c5-4=*disintegrate*}}{{c6-4=*passwall*}}{{c7-4=*magic missile*}}{{c8-4=*continual light*}}{{c9-4=*dispel magic*'
};

wiz8['Screen'] = {
    'level': '8',
    'school': 'Divination/Illusion',
    'range': '0',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': '[[@{level-wizard}]] 30-foot cubes',
    'components': 'V, S',
    'cast-time': '1 turn',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 243',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell combines several elements to create a powerful protection from scrying and direct observation. When the spell is cast, the wizard dictates what will and will not be observed in the area of effect. The illusion created must be stated in general terms. Thus, the caster could specify the illusion of him and another playing chess for the duration of the spell, but he could not have the illusionary chess players take a break, make dinner, and then resume their game. He could have a crossroads appear quiet and empty even while an army is actually passing through the area. He could specify that no one be seen (including passing strangers), that his troops be undetected, or even that every fifth man or unit should be visible. Once the conditions are set, they cannot be changed.\n&emsp;Attempts to scry the area automatically detect the image stated by the caster with no saving throw allowed. Sight and sound are appropriate to the illusion created. A band of men standing in a meadow could be concealed as an empty meadow with birds chirping, etc. Direct observation may allow a saving throw (as per a normal illusion), if there is cause to disbelieve what is seen. Certainly onlookers in the area would become suspicious if the column of a marching army disappeared at one point to reappear at another! Even entering the area does not cancel the illusion or necessarily allow a saving throw, assuming the hidden beings take care to stay out of the way of those affected by the illusion.'
};

wiz8['Serten\'s Spell Immunity'] = {
    'level': '8',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'Creature(s) touched',
    'components': 'V, S, M',
    'cast-time': '1 round/recipient',
    'saving-throw': 'None',
    'materials': 'A diamond of at least 500 gp value, which must be crushed and sprinkled over the spell recipients; each such creature must also have in its possession a diamond of at least one carat size, intact and carried on its person',
    'reference': 'p. 244',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By use of this spell, the wizard is able to confer virtual immunity to certain spells and magical attack forms upon those he touches. For every four levels of experience of the wizard, one creature can be protected by the *Serten’s spell immunity* spell; currently [[floor([[@{level-wizard}]]/4)]] creatures; however, if more than one is protected, the duration of the protection is divided among the protected creatures.\n&emsp;For example, a 16th-level wizard can cast the spell upon one creature and it will last 16 turns, or place it upon two creatures for eight turns, or four creatures for four turns.) The protection gives a bonus to saving throws, according to spell type and level, as shown in the following table.}}{{style=center}}{{c1-1=**Spell Level**}}{{c2-1=1st–3rd}}{{c3-1=4th–6th}}{{c4-1=7th–8th}}{{c1-2=**Wizard Spell**}}{{c2-2=+9&ast;}}{{c3-2=+7}}{{c4-2=+5}}{{c1-3=**Priest Spell**}}{{c2-3=+7}}{{c3-3=+5}}{{c4-3=+3}}{{effects2=&emsp;&ast; Includes *beguiling* effects.'
};

wiz8['Sink'] = {
    'level': '8',
    'school': 'Enchantment, Alteration',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Special',
    'aoe': '1 creature or object, max [[@{level-wizard}]] cubic feet',
    'components': 'V, S',
    'cast-time': '8',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 244',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, a wizard can force a creature or object into the very earth or floor upon which it stands. When casting the spell, the wizard must chant the spell for the remainder of the round without interruption. At that juncture, the subject creature or object becomes rooted to the spot unless a saving throw vs. spell (for a creature) or disintegration (for an object with magical properties) is successful. (Note: “magical properties” include those of magical items as listed in the *Dungeon Master Guide*, those of items enchanted or otherwise of magical origin, and those of items with protection-type spells or with permanent magical properties or similar spells upon them.) Items of a nonmagical nature are not entitled to a saving throw. If a subject fails its saving throw, it becomes of slightly greater density than the surface upon which it stands.\n&emsp;The spellcaster now has the option of ceasing his spell and leaving the subject as it is, in which case the spell expires in four turns, and the subject returns to normal. If the caster proceeds with the spell (into the next round), the subject begins to sink slowly into the ground. Before any actions are taken in the new round, the subject sinks one-quarter of its height; after the first group acts, another quarter; after the second group acts, another; and at the end of the round, the victim is totally sunken into the ground.\n&emsp;This entombment places a creature or object in a state of suspended animation. The cessation of time means that the subject does not grow older. Bodily and other functions virtually cease, but the subject is otherwise unharmed. The subject exists in undamaged form in the surface into which it was sunk, its upper point as far beneath the surface as the subject has height—a 6-foot-tall victim will be 6 feet beneath the surface, while a 60-foot-tall subject will have its uppermost point 60 feet below ground level. If the ground around the subject is somehow removed, the spell is broken and the subject returns to normal, but it does not rise up. Spells such as *dig, transmute rock to mud,* and *freedom* (the reverse of the 9th-level spell *imprisonment*) will not harm the sunken creature or object and will often be helpful in recovering it. If a *detect magic* spell is cast over an area upon which a *sink* spell was used, it reveals a faint magical aura of undefinable nature, even if the subject is beyond detection range. If the subject is within range of the detection, the spell’s schools can be discovered (alteration and enchantment).'
};

wiz8['Symbol'] = {
    'level': '8',
    'school': 'Conjuration/Summoning',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '8',
    'saving-throw': 'Special',
    'materials': 'Powdered black opal and diamond dust, worth not less than 5,000 gp each',
    'reference': 'p. 244',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A *symbol* spell creates magical runes affecting creatures that pass over, touch, or read the runes, or pass through a portal upon which the symbol is inscribed. Upon casting the spell, the wizard inscribes the symbol upon whatever surface he desires. Likewise, the spellcaster is able to place the symbol of his choice, using any one of the following:}}{{style=justify2}}{{c1-1=*Death*}}{{c1-1=&emsp;}}{{c3-1=*Discord*}}{{c1-1=&emsp;}}{{c5-1=*Fear*}}{{c1-1=&emsp;}}{{c7-1=*Hopelessness*}}{{c1-1=&emsp;}}{{c9-1=*Insanity*}}{{c1-1=&emsp;}}{{c11-1=*Pain*}}{{c1-1=&emsp;}}{{c13-1=*Sleep*}}{{c1-1=&emsp;}}{{c15-1=*Stunning*}}{{c1-2=One or more creatures, whose total hit points do not exceed 80, are slain.}}{{c3-2=All creatures are affected and immediately fall to loud bickering and arguing; there is a 50% probability that creatures of different alignments attack each other. The bickering lasts for 5d4 rounds, the fighting for 2d4 rounds.}}{{c5-2=This symbol creates an extra-strong *fear* spell, causing all creatures to save vs. spell with –4 penalties to the die roll, or panic and flee as if attacked by a *fear* spell.}}{{c7-2=All creatures are affected and must turn back in dejection unless they save vs. spell. Affected creatures submit to the demands of any opponent—for example, surrender, get out, etc. The hopelessness lasts for 3d4 turns; during this period it is 25% probable that affected creatures take no action during any round, and 25% likely that those taking action turn back or retire from battle, as applicable.}}{{c9-2=One or more creatures whose total hit points do not exceed 120 become insane and remain so, acting as if a *confusion* spell had been placed upon them, until a *heal, restoration,* or *wish* spell is used to remove the madness.}}{{c11-2=All creatures are afflicted with wracking pains shooting through their bodies, causing a –2 penalty to Dexterity and a –4 penalty to attack rolls for 2d10 turns.}}{{c13-2=All creatures under 8+1 Hit Dice immediately fall into a catatonic slumber and cannot be awakened for 1d12+4 turns.}}{{c15-2=One or more creatures whose total hit points do not exceed 160 are stunned and reeling for 3d4 rounds, dropping anything they are holding.}}{{c1-1=*Death*}}{{c2-1=&emsp;}}{{c3-1=*Discord*}}{{c4-1=&emsp;}}{{c5-1=*Fear*}}{{c6-1=&emsp;}}{{c7-1=*Hopelessness*}}{{c8-1=&emsp;}}{{c9-1=*Insanity*}}{{c10-1=&emsp;}}{{c11-1=*Pain*}}{{c12-1=&emsp;}}{{c13-1=*Sleep*}}{{c14-1=&emsp;}}{{c15-1=*Stunning*}}{{c1-2=One or more creatures, whose total hit points do not exceed 80, are slain.}}{{c3-2=All creatures are affected and immediately fall to loud bickering and arguing; there is a 50% probability that creatures of different alignments attack each other. The bickering lasts for 5d4 rounds, the fighting for 2d4 rounds.}}{{c5-2=This symbol creates an extra-strong *fear* spell, causing all creatures to save vs. spell with –4 penalties to the die roll, or panic and flee as if attacked by a *fear* spell.}}{{c7-2=All creatures are affected and must turn back in dejection unless they save vs. spell. Affected creatures submit to the demands of any opponent—for example, surrender, get out, etc. The hopelessness lasts for 3d4 turns; during this period it is 25% probable that affected creatures take no action during any round, and 25% likely that those taking action turn back or retire from battle, as applicable.}}{{c9-2=One or more creatures whose total hit points do not exceed 120 become insane and remain so, acting as if a *confusion* spell had been placed upon them, until a *heal, restoration,* or *wish* spell is used to remove the madness.}}{{c11-2=All creatures are afflicted with wracking pains shooting through their bodies, causing a –2 penalty to Dexterity and a –4 penalty to attack rolls for 2d10 turns.}}{{c13-2=All creatures under 8+1 Hit Dice immediately fall into a catatonic slumber and cannot be awakened for 1d12+4 turns.}}{{c15-2=One or more creatures whose total hit points do not exceed 160 are stunned and reeling for 3d4 rounds, dropping anything they are holding.}}{{effects2=&emsp;The type of symbol cannot be recognized without being read and thus activating its effects.'
};

wiz8['Trap the Soul'] = {
    'level': '8',
    'school': 'Conjuration/Summoning',
    'range': '10 yards',
    'duration': 'Permanent until broken',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': 'Special + 1',
    'saving-throw': 'Special',
    'materials': 'A gem of at least 1,000 gp value for every Hit Die or level of experience possessed by the creature to be trapped, onto which is cast a *enchant an item* and a *maze* spell (see below)',
    'reference': 'p. 245',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell forces the creature’s life force (and its material body) into a special prison gem enchanted by the spellcaster. The creature must be seen by the caster when the final word is uttered.\n&emsp;The spell can be triggered in one of two ways. First, the final word of the spell can be spoken when the creature is within spell range. This allows magic resistance (if any) and a saving throw vs. spell to avoid the effect. If the creature’s real name is spoken as well, any magic resistance is ignored and the saving throw vs. spell suffers a penalty of –2. If the saving throw is successful, the prison gem shatters.\n&emsp;The second method is far more insidious, for it tricks the victim into accepting a trigger object inscribed with the final spell word, automatically placing the creature’s soul in the trap. To use this method, both the creature’s true name and the trigger word must be inscribed on the trigger item when the gem is enchanted. A *sympathy* spell can also be placed on the trigger item. As soon as the subject creature picks up or accepts the trigger item, its life force is automatically transferred to the gem, without the benefit of magic resistance or saving throw.\n&emsp;The gem prison will hold the trapped entity indefinitely, or until the gem is broken and the life force is released, allowing the material body to reform. If the trapped creature is a powerful creature from another plane (which could mean a character trapped by an inhabitant of another plane when the character is not on the Prime Material Plane), it can be required to perform a service immediately upon being freed. Otherwise, the creature can go free once the gem imprisoning it is broken.\n&emsp;Before the actual casting of the *trap the soul* spell, the wizard must prepare the prison, a gem of at least 1,000 gp value for every Hit Die or level of experience possessed by the creature to be trapped (for example, it requires a gem of 10,000 gp value to trap a 10 Hit Die or 10th-level creature). If the gem is not valuable enough, it shatters when the entrapment is attempted. (Note that while characters have no concept of level as such, the value of the gem needed to trap an individual can be researched. Remember that this value can change over time as characters advance.) Creating the prison gem requires an *enchant an item* spell and the placement of a *maze* spell into the gem, thereby forming the prison to contain the life force.'
};

const wiz9 = {};
wiz9['Astral Spell'] = {
    'level': '9',
    'school': 'Evocation',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 245',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of the *astral spell,* a wizard can project his astral body into the Astral Plane, leaving his physical body and material possessions behind in the Prime Material Plane. Only magical items can be brought into the Astral Plane (although nonmagical items could be rendered temporarily magical through the use of some spells, if the DM allows). As the Astral Plane touches upon the first levels of all of the Outer Planes, the wizard can travel astrally to any of the Outer Planes at will. The caster then leaves the Astral Plane, forming a body in the plane of existence he has chosen to enter. It is also possible to travel astrally anywhere in the Prime Material Plane by means of the *astral spell,* but a second body cannot be formed in the Prime Material Plane. As a general rule, a person astrally projected can be seen only by creatures in the Astral Plane.\n&emsp;At all times, the astral body is connected to the material body by a silvery cord. If the cord is broken, the affected person is killed, astrally and materially; however, normally only a psychic wind can cause the cord to break. When a second body is formed in a different plane, the silvery cord remains invisibly attached to the new body. If the astral form is slain, the cord simply returns to the original body where it rests in the Prime Material Plane, reviving it from its state of suspended animation.\n&emsp;Although astrally projected persons are able to function in the Astral Plane, their actions do not affect creatures not existing in the Astral Plane. The spell lasts until the wizard desires to end it, or until it is terminated by some outside means (such as a *dispel magic* spell or the destruction of the wizard’s body in the Prime Material Plane).\n&emsp;The wizard can project the astral forms of up to seven other creatures with him by means of the *astral spell,* providing the creatures are linked in a circle with the wizard. These fellow travelers are dependent upon the wizard and can be stranded. Travel in the Astral Plane can be slow or fast, according to the wizard’s desire. The ultimate destination arrived at is subject to the conceptualization of the wizard. (See the *Planescape Campaign Setting* boxed set for further information on the Astral Plane.)\n&emsp;Any magical items can go into the Astral Plane, but most become temporarily nonmagical therein, or in any planes removed from the Prime Material Plane. Armor and weapons of +3 or better might function in other planes, at the DM’s option. Artifacts and relics function anywhere. Items drawing their power from a given plane are more powerful in that plane (for example, a *ring of fire resistance* in the Elemental Plane of Fire or a *sword of life stealing* in the Negative Energy plane).'
};

wiz9['Bigby\'s Crushing Hand'] = {
    'level': '9',
    'school': 'Evocation',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': 'A glove of snake skin and the shell of an egg',
    'reference': 'p. 247',
    'book': 'PHB',
    'damage': '1st round [[1d10]] points. 2nd round 2d10 points. 3rd round 2d10 points. 4th round 4d10 points. 4d10 damage per additional round',
    'damage-type': 'Constriction',
    'healing': '',
    'effect': 'The *Bigby’s crushing hand* spell creates a huge, disembodied hand similar to those of the other *Bigby’s hand* spells. The crushing hand is under the mental control of the caster, and he can cause it to grasp and squeeze an opponent. No attack roll is necessary; the hand automatically grasps and inflicts constriction damage in any round in which the wizard concentrates. The damage inflicted depends on the number of rounds it acts upon the victim:}}{{c1-1=1st round}}{{c2-1=2nd & 3rd rounds}}{{c3-1=4th & beyond}}{{c1-2=1d10 points}}{{c2-2=2d10 points}}{{c3-2=4d10 points}}{{effects2=&emsp;The crushing hand has an Armor class of 0, has as many hit points as its caster at full strength, currently [[@{HP|max}]] hit points, and vanishes when destroyed. The hand is susceptible to normal combat attacks and damaging spells, but if it is struck by an area-effect spell, the person held suffers the same fate as the hand (i.e., if the hand fails its saving throw, the victim automatically fails his). The hand is not effective against noncorporeal or gaseous forms, but it does prevent creatures that are able to slip through small cracks from escaping. If the hand grasps an item or construction, the appropriate saving throw must be made as if squeezed by a Strength of 25.'
};

wiz9['Crystalbrittle'] = {
    'level': '9',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '[[2*[[@{level-wizard}]] ]] cubic feet',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 247',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The magic of this spell causes metal, whether as soft as gold or  as hard as adamantite, to turn to a crystalline substance as brittle and fragile as crystal. Thus, a sword, metal shield, metal armor, or even an iron golem can be changed to a delicate, glasslike material easily shattered by any forceful blow. Furthermore, this change is unalterable by any means short of a *wish* spell; a *dispel magic* will not reverse the spell.\n&emsp;The caster must physically touch the item; if it is an opponent or something an opponent is using or wearing, the wizard must get into melee and make a successful attack roll. Any single metal item can be affected by the spell. Thus, a suit of armor worn by a creature can be changed to crystal, but the creature’s shield would not be affected, and vice versa. All items gain a saving throw equal to their magical bonus value or protection (the DM has this information). A +1/+3 sword would get a 10% (average of the two pluses) chance to save; +5 magical armor has a 25% chance to be unaffected; an iron golem has a 15% chance to save (for it is hit only by magical weapons of +3 or better quality). Artifacts and relics constructed of metal may be affected at the discretion of the DM, though it is highly unlikely. Affected items not immediately protected are shattered and permanently destroyed if struck by a normal blow from a metal tool or any weighty weapon, including a staff.'
};

wiz9['Energy Drain'] = {
    'level': '9',
    'school': 'Evocation, Necromancy',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'Essence of spectre or vampire dust',
    'reference': 'p . 247',
    'book': 'PHB',
    'damage': '',
    'damage-type': 'Negative energy',
    'healing': '',
    'effect': 'By casting this spell, the wizard opens a channel between the plane he is in and the Negative Energy plane, becoming the conductor between the two planes. As soon as he touches (equal to a hit if melee is involved) any living creature, the victim loses two levels (as if struck by a spectre). A monster loses 2 Hit Dice permanently, both for hit points and attack ability. A character loses levels, Hit Dice, hit points, and abilities permanently (until regained through adventuring, if applicable).\n&emsp;The material component of this spell is essence of spectre or vampire dust. Preparation requires mere moments; the material component is then cast forth, and, upon touching the victim, the wizard speaks the triggering word, causing the spell to take effect instantly.\n&emsp;The spell remains effective for only a single round. Humans or humanoids brought below zero energy levels by this spell can be animated as juju zombies under the control of the caster.\n&emsp;The caster always has a 5% (1 in 20) chance to be affected by the dust, losing one point of Constitution at the same time as the victim is drained. When the number of Constitution points lost equals the caster’s original Constitution ability score, the caster dies and becomes a shade.'
};

wiz9['Foresight'] = {
    'level': '9',
    'school': 'Divination',
    'range': '0',
    'duration': '[[2d4+[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A hummingbird’s feather',
    'reference': 'p. 247',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell grants the caster a powerful sixth sense in relation to  himself or another. Although cast upon himself, the wizard can specify that he or another is the beneficiary of the spell. Once the spell is cast, the wizard receives instantaneous warnings of impending danger or harm to the object of the spell. Thus, if he were the object of the spell, the wizard would be warned in advance if a thief were about to attempt to backstab him, or if a creature were about to leap out from an unexpected direction, or if an attacker were specifically targeting him with a spell or missile weapon. When the warnings are about him personally, the wizard cannot be surprised and always knows the direction from which any attack on him is made. In addition, the spell gives the wizard a general idea of what action he might take to best protect himself—duck, jump right, close his eyes, etc.—and gives him a defensive bonus of 2 to his Armor Class.\n&emsp;When another person is the object of the spell, the wizard receives warnings about that person. He must still communicate this to the other person to negate any surprise. Shouting a warning, yanking the person back, and even telepathically communicating through a *crystal ball* can all be accomplished before the trap is sprung, if the wizard does not hesitate. However, the object of the spell does not gain the defensive bonus to his Armor Class.'
};

wiz9['Gate'] = {
    'level': '9',
    'school': 'Conjuration/Summoning',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 248',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The casting of a *gate* spell has two effects. First, it causes an interdimensional connection between the plane of existence the wizard is on and the plane on which dwells a specific being of great power; thus, the being is able to merely step through the gate or portal from its plane to that of the caster. Second, the utterance of the spell attracts the attention of the sought-after dweller on the other plane. When casting the spell, the wizard must name the entity he desires to use the gate and come to the wizard’s aid. There is a 100% certainty that something steps through the gate. Unless the DM has some facts prepared regarding the minions serving the being called forth by the *gate* spell, the being itself comes.\n&emsp;If the matter is trifling, the being might leave, inflict an appropriate penalty on the wizard, or attack the wizard. If the matter is of middling importance, the being can take some positive action to set matters right, then demand appropriate repayment. If the matter is urgent, the being can act accordingly and ask whatever is its wont thereafter, if appropriate. The actions of the being that comes through depend on many factors, including the alignments of the wizard and the being, the nature of his companions, and who or what opposes or threatens the wizard. Such beings generally avoid direct conflict with their equals or betters. The being gated in will either return immediately (very unlikely) or remain to take action. Casting this spell ages the wizard five years.'
};

wiz9['Imprisonment'] = {
    'level': '9',
    'school': 'Abjuration (Reversible)',
    'range': 'Touch',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 248',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When an *imprisonment* spell is cast and the victim is touched, the recipient is entombed in a state of suspended animation (see the 9th-level wizard spell *temporal stasis*) in a small sphere far beneath the surface of the earth. The victim remains there unless a reverse of the spell, with the creature’s name and background, is cast. Magical search by a *crystal ball,* a *locate object* spell, or similar means will not reveal the fact that a creature is imprisoned. The *imprisonment* spell functions only if the subject creature’s name and background are known.\n&emsp;The reverse spell, *freedom,* cast upon the spot at which a creature was entombed and sunk into the earth, causes it to reappear at that spot. If the caster does not perfectly intone the name and background of the creature to be freed, there is a 10% chance that 1 to 100 creatures will be freed from imprisonment at the same time.\n&emsp;Note: The exact details of any creatures freed are up to the DM. A random method of determining this is to roll percentile dice twice (once for imprisoned creature density and once for a base number of creatures at maximum density). The rolls are multiplied and rounded to the nearest whole number. Each released creature has a 10% chance to be in the area of the spellcaster. If monsters are being generated randomly, roll 1d20 for level, with rolls of 9+ considered 9, and the exact monsters determined by the random encounter tables.\n&emsp;For example, if the initial rolls were 22 and 60, the number of monsters released is 0.22 × 0.60 = 0.1320 = 13 monsters. Since only 10% of these will be in the immediate vicinity of the caster, the wizard may encounter only one or two of them.'
};

wiz9['Meteor Swarm'] = {
    'level': '9',
    'school': 'Evocation',
    'range': '[[40+[[@{level-wizard}]]*10]] yards',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': '½',
    'materials': '',
    'reference': 'p. 248',
    'book': 'PHB',
    'damage': '*Large spheres:* [[10d4]], [[10d4]], [[10d4]], [[10d4]]. *Small spheres:* [[5d4]], [[5d4]], [[5d4]], [[5d4]], [[5d4]], [[5d4]], [[5d4]], [[5d4]]',
    'damage-type': 'Fire',
    'healing': '',
    'effect': 'A *meteor swarm* is a very powerful and spectacular spell which is similar to the *fireball* spell in many aspects. When it is cast, either four spheres of 2-foot diameter or eight spheres of 1-foot diameter spring from the outstretched hand of the wizard and streak in a straight line to the distance demanded by the spellcaster, up to the maximum range. Any creature in the straight-line path of these missiles receives the full effect, without benefit of a saving throw. The meteor missiles leave a fiery trail of sparks, and each bursts as a fireball.\n&emsp;The large spheres (2-foot diameter) inflict 10d4 points of damage, bursting in a diamond or box pattern. Each has a 30-foot diameter area of effect, and each sphere is 20 feet apart along the sides of the pattern, creating overlapping areas of effect and exposing the center to all four blasts.\n&emsp;The smaller spheres (1-foot diameter) each have a 15-foot diameter area of effect, and each inflicts 5d4 points of damage. They burst in a pattern of a box within a diamond or vice versa, with each of the outer sides 20 feet long. Note that the center has four areas of overlapping effect, and there are numerous peripheral areas that have two overlapping areas of effect. A saving throw for each area of effect will indicate whether full damage or half damage is sustained by creatures within each area, except as already stated with regard to the missiles impacting.'
};

wiz9['Monster Summoning VII'] = {
    'level': '9',
    'school': 'Conjuration/Summoning',
    'range': 'Special',
    'duration': '[[8+[[@{level-wizard}]] ]] rounds',
    'aoe': '90-yard radius',
    'components': 'V, S, M',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': 'A tiny bag and a small (not necessarily lit) candle',
    'reference': 'p. 249',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell is much like the 3rd-level spell *monster summoning I,* except that this spell summons one or two 7th-level monsters that appear one round after the spell is cast, or one 8th-level monster that appears two rounds after the spell is cast.'
};

wiz9['Mordenkainen\'s Disjunction'] = {
    'level': '9',
    'school': 'Alteration, Enchantment',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': '30-foot radius',
    'components': 'V',
    'cast-time': '9',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 249',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is cast, all magic and magical items within the radius of the spell, except those on the person of or being touched by the spellcaster, are disjoined. That is, spells being cast are separated into their individual components (usually spoiling the effect as a *dispel magic* spell does), and permanent and enchanted magical items must successfully save (vs. spell if actually cast on a creature, or vs. a *dispel magic* spell otherwise) or be turned into normal items. Even artifacts and relics are subject to Mordenkainen’s disjunction, though there is only a 1% chance per caster experience level of actually affecting such powerful items. Currently [[@{level-wizard}]]% chance. Thus, all potions, scrolls, rings, rods, miscellaneous magical items, artifacts and relics, arms and armor, swords, and miscellaneous weapons within 30 feet of the spellcaster can possibly lose all their magical properties when the *Mordenkainen’s disjunction* spell is cast. The caster also has a 1% chance per level of destroying an antimagic shell. Currently [[@{level-wizard}]]% chance. If the shell survives the disjunction, no items within it are disjoined.\n&emsp;Note: Destroying artifacts is a dangerous business, and 95% likely to attract the attention of some powerful being who has an interest or connection with the device. Additionally, if an artifact is destroyed, the casting wizard must roll a successful saving throw vs. spell with a –4 penalty or permanently lose all spellcasting abilities.'
};

wiz9['Power Word, Kill'] = {
    'level': '9',
    'school': 'Conjuration/Summoning',
    'range': '[[5*[[floor([[@{level-wizard}]]/2)]] yards',
    'duration': 'Permanent',
    'aoe': '10-foot radius',
    'components': 'V',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 249',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When a *power word, kill* spell is uttered, one or more creatures of any type within the spell range and area of effect are slain. The power word kills either one creature with up to 60 hit points, or multiple creatures with 10 or fewer hit points each, to a maximum of 120 hit points total. The option to attack a single creature or multiple creatures must be stated along with the spell range and center of the area of effect. The current hit points of the creatures are used.'
};

wiz9['Prismatic Sphere'] = {
    'level': '9',
    'school': 'Abjuration, Conjuration/Summoning',
    'range': '0',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '10-foot radius',
    'components': 'V',
    'cast-time': '7',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 249',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the wizard to conjure up an immobile, opaque  globe of shimmering, multicolored light to surround him, giving protection from all forms of attack. The sphere flashes in all colors of the visible spectrum, seven of which have distinct powers and purposes. Any creature with fewer than 8 Hit Dice is blinded for 2d4 turns by the colors of the sphere. Only the spellcaster can pass in and out of the prismatic sphere without harm, though he can cast it over others to protect them. The sphere can be destroyed, color by color, in consecutive order, by various magical effects; however, the first must be brought down before the second can be affected, and so on. Any creature passing through the barrier receives the effect of every color still remaining. The following table shows the colors and effects of the prismatic sphere, as well as what will negate each globe.\n&emsp;Note that typically the upper hemisphere of the globe is visible, as the spellcaster is at the center of the sphere, so the lower half is usually hidden by the floor surface he is standing on.\n&emsp;Furthermore, a *rod of cancellation* or a *Mordenkainen’s disjunction* spell will destroy a prismatic sphere (but an antimagic shell will fail to penetrate it). Otherwise, anything short of an artifact or relic entering the sphere is destroyed, and any creature is subject to the effects of every color still active—i.e., 70–140 points of damage plus death, petrification, insanity, and instantaneous transportation to another plane.}}{{style=center2}}{{cs1-1=4}}{{cc1-1=center}}{{c1-1=**Prismatic Sphere Effects**}}{{c2-1=**Color**}}{{cc2-1=bottom}}{{c3-1=Red}}{{c4-1=Orange}}{{c5-1=Yellow}}{{c6-1=Green}}{{c7-1=Blue}}{{c8-1=Indigo}}{{c9-1=Violet}}{{c2-2=**Order**}}{{cc2-2=bottom}}{{c3-2=1st}}{{c4-2=2nd}}{{c5-2=3rd}}{{c6-2=4th}}{{c7-2=5th}}{{c8-2=6th}}{{c9-2=7th}}{{c2-3=**Effect of Color**}}{{cc2-3=bottom}}{{c3-3=Stops nonmagical missiles—inflicts 20 points of damage, save for half}}{{c4-3=Stops magical missiles—inflicts 40 points of damage, save for half}}{{c5-3=Stops poisons, gases, and petrification—inflicts 80 points of damage, save for half}}{{c6-3=Stops breath weapons—save vs. poison or die; survivors suffer 20 points of damage}}{{c7-3=Stops location/detection and mental attacks—save vs. petrification or turn to stone}}{{c8-3=Stops magical spells—save vs. wand or go insane}}{{c9-3=Force field protection—save vs. spell or be sent to another plane}}{{c2-4=**Spell Negated By**}}{{c3-4=*cone of cold*}}{{c4-4=*gust of wind*}}{{c5-4=*disintegrate*}}{{c6-4=*passwall*}}{{c7-4=*magic missile*}}{{c8-4=*continual light*}}{{c9-4=*dispel magic*'
};

wiz9['Shape Change'] = {
    'level': '9',
    'school': 'Alteration',
    'range': '0',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': 'A jade circlet worth no less than 5,000 gp',
    'reference': 'p. 250',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, a wizard is able to assume the form of any living thing or creature below demigod status (greater or lesser deity, singular dragon type, or the like). The spellcaster becomes the creature he wishes, and has all of its abilities save those dependent upon Intelligence, innate magical abilities, and magic resistance, for the mind of the creature is that of the spellcaster. Thus, he can change into a griffon and fly away, then to an efreet and fly through a roaring flame, then to a titan to lift up a wagon, etc. These creatures have whatever hit points the wizard had at the time of the shape change. Each alteration in form requires only a second, and no system shock is incurred.\n&emsp;For example, a wizard is in combat and assumes the form of a will o’ wisp. When this form is no longer useful, the wizard changes into a stone golem and walks away. When pursued, the golem-shape is changed to that of a flea, which hides on a horse until it can hop off and become a bush. If detected as the latter, the wizard can become a dragon, an ant, or just about anything he is familiar with.\n&emsp;A wizard adopting another form also adopts its vulnerabilities. For example, a wizard who becomes a spectre is powerless in daylight, and is subject to being turned, controlled, or destroyed by opposing clerics. Unlike similar spells, a wizard who is killed in another form does not revert to his original shape, which may disallow certain types of revivification.\n&emsp;The material component is a jade circlet worth no less than 5,000 gp, which shatters at the end of the spell’s duration. In the meantime, the circlet is left in the wake of the shape change, and premature shattering ends the spell immediately.'
};

wiz9['Succor'] = {
    'level': '9',
    'school': 'Alteration, Enchantment',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': '1 individual',
    'components': 'V, S, M',
    'cast-time': '1 to 4 days',
    'saving-throw': 'None',
    'materials': 'Gemstones totaling not  less than 5,000 gp value (whether they are faceted gems or not is immaterial)',
    'reference': 'p. 250',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By casting this spell, the wizard creates a powerful magic in some specially prepared object—a statuette, a jeweled rod, a gem, etc. This object radiates magic, for it contains the power to instantaneously transport its possessor to the abode of the wizard who created it. Once the item is enchanted, the wizard must give it willingly to an individual, at the same time informing him of a command word to be spoken when the item is to be used. To make use of the item, the recipient must speak the command word at the same time that he rends or breaks the item. When this is done, the individual and all that he is wearing and carrying are instantly transported to the abode of the wizard. No other creatures can be affected.\n&emsp;The reversed application of the spell transports the wizard to the immediate vicinity of the possessor of the enchanted item, when it is broken and the command word spoken. The wizard will have a general idea of the location and situation of the item possessor, but has no choice whether or not to go (making this a rare casting indeed!).\n&emsp;The material components used include gemstones totaling not less than 5,000 gp value (whether they are faceted gems or not is immaterial). The components can be enchanted only once per month (usually on a night of a clear, full moon). At that time, the object is set for the type of succor and its final destination (either the location of the spellcasting or an area well known to the wizard).'
};

wiz9['Temporal Stasis'] = {
    'level': '9',
    'school': 'Alteration (Reversible)',
    'range': '10 yards',
    'duration': 'Permanent',
    'aoe': '1 creature',
    'components': 'V, S, M',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '*Temporal stasis:* A powder composed of diamond, emerald, ruby, and sapphire dust, with each crushed stone worth at least 100 gp. *Temporal reinstatement:* None',
    'reference': 'p. 251',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting this spell, the wizard places the recipient creature into a state of suspended animation. This cessation of time means that the creature does not grow older. Its body functions virtually cease. This state persists until the magic is removed by a *dispel magic* spell or the reverse of the spell (*temporal reinstatement*) is uttered. Note that the reverse requires only a single word and no somatic or material components.'
};

wiz9['Time Stop'] = {
    'level': '9',
    'school': 'Alteration',
    'range': '0',
    'duration': 'Special',
    'aoe': '15-foot radius',
    'components': 'V',
    'cast-time': '9',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 251',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'Upon casting a *time stop* spell, the wizard causes the flow of time to stop for one round in the area of effect. Outside this area the sphere simply seems to shimmer for an instant. Inside the sphere, the caster is free to act for [[1d3]] rounds of apparent time. The wizard can move and act freely within the area where time is stopped, but all other creatures, except for those of demigod and greater status or unique creatures, are frozen in their actions, for they are literally between ticks of the time clock. (The spell duration is subjective to the caster.) Nothing can enter the area of effect without being stopped in time also. If the wizard leaves the area, the spell is immediately negated. When the spell duration ceases, the wizard is again operating in normal time.\n&emsp;Note: It is recommended that the DM use a stopwatch or silently count to time this spell. If the caster is unable to complete the intended action before the spell duration expires, he will probably be caught in an embarrassing situation. The use of a *teleport* spell before the expiration of the *time stop* spell is permissible.'
};

wiz9['Weird'] = {
    'level': '9',
    'school': 'Illusion/Phantasm',
    'range': '30 yards',
    'duration': 'Concentration',
    'aoe': '20-foot radius',
    'components': 'V, S',
    'cast-time': '9',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 251',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell confronts those affected by it with phantasmal images of their most feared enemies, forcing an imaginary combat that seems real, but actually occurs in the blink of an eye. When this spell is cast, the wizard must be able to converse with the victims to bring the spell into being. During the casting, the wizard must call out to the creatures to be affected, informing one or all that their final fate, indeed their doom, is now upon them.\n&emsp;The force of the magic is such that even if the creatures make their saving throws vs. spell, fear will paralyze them for a full round, and they will lose 1d4 Strength points from this fear (the lost Strength will return in one turn). Failure to save vs. spell causes the creature or creatures to face their nemeses, the opponents most feared and inimical to them. Actual combat must then take place, for no magical means of escape is possible. The foe fought is real for all intents and purposes; affected creatures that lose will die. If a creature’s phantasmal nemesis from the *weird* spell is slain, the creature emerges with no damage, no loss of items seemingly used in the combat, and no loss of spells likewise seemingly expended. The creature also gains any experience for defeating the weird, if applicable.\n&emsp;Although each round of combat seems normal, it takes only one-tenth of a round. During the course of the spell, the caster must concentrate fully upon maintaining it. If the combat goes beyond 10 rounds, those who saved against the spell can take action. If the caster is disturbed, the *weird* spell ends immediately. Creatures attacked while paralyzed with fear are free of the paralysis immediately.'
};

wiz9['Wish'] = {
    'level': '9',
    'school': 'Conjuration/Summoning',
    'range': 'Unlimited',
    'duration': 'Special',
    'aoe': 'Special',
    'components': 'V',
    'cast-time': 'Special',
    'saving-throw': 'Special',
    'materials': '',
    'reference': 'p. 251',
    'book': 'PHB',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The *wish* spell is a more potent version of a *limited wish.* If it is used to alter reality with respect to damage sustained by a party, to bring a dead creature to life, or to escape from a difficult situation by lifting the spellcaster (and his party) from one place to another, it will not cause the wizard any disability. Other forms of wishes, however, cause the spellcaster to weaken (–3 on Strength) and require 2d4 days of bed rest due to the stresses the *wish* places upon time, space, and his body. Regardless of what is wished for, the exact terminology of the *wish* spell is likely to be carried out. Casting a *wish* spell ages the caster five years.\n&emsp;Discretionary power of the DM is necessary in order to maintain game balance. For example, wishing another creature dead is grossly unfair; the DM might well advance the spellcaster to a future period in which the creature is no longer alive, effectively putting the wishing character out of the campaign.'
};
//#endregion

//region The Complete Wizard's Handbook

wiz1['Copy'] = {
    'level': '1',
    'school': 'Evocation',
    'range': 'Special',
    'duration': 'Instantaneous',
    'aoe': 'One object',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'A piece of blank parchment (or a book with blank pages, as described above), and a drop of black ink',
    'reference': 'p. 95',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Copy* enables the caster to make a perfect copy of a map, letter, or any other written or drawn document. The caster must have a blank parchment or a book with blank pages of sufficient size to hold the *copy*. The caster holds the blank object over the object to be copied, then casts the spell; the *copy* immediately appears on the formerly blank object. The *copy* is permanent and is a perfect duplicate of the original.\n&emsp;*Copy* can also be used to copy spells from a new spell book into the caster’s spell book, assuming the caster’s spell book is of sufficient size to contain the new spells. The caster must first roll to see if he can learn the new spells; if so, he can cast *copy* to instantly copy them into his spell book.'
}

wiz1['Chromatic Orb'] = {
    'level': '1',
    'school': 'Alteration, Evocation',
    'range': '0',
    'duration': 'Special',
    'aoe': 'One object',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'Negate',
    'materials': 'A gem of the appropriate hue or any diamond. The gem must have a value of at least 50 gp',
    'reference': 'p. 95',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes a 4-inch-diameter sphere to appear in the caster’s hand. Within the limits described below, the sphere can appear in a variety of colors; each color indicates a different special power. The caster can hurl the sphere at an opponent up to 30 yards away, providing there are no barriers between the caster and the target. If the target is no more than 10 yards away, the caster’s to hit roll is made with a +3 bonus. If the target is 10-20 yards away, the caster’s roll is made with a +2 bonus. If the target is 20-30 yards away, the caster’s roll is made with a +1 bonus.\n&emsp;If the *chromatic orb* misses its target, it dissipates without effect. If the target creature makes a successful saving throw, the *chromatic orb* is also ineffective. Otherwise, the color of the *orb* determines the amount of damage inflicted and its special power, as summarized on Table 16; details about the special powers are listed below. The caster can create a single *orb* of any color listed for his level or lower; for instance, a 3rd-level wizard can create an orange, red, or white *orb*.\n\n&emsp;*Light* from the *orb* causes the victim to become surrounded by light to a radius of 20 feet, as if affected by a *light* spell. The effect lasts for 1 round, during which time the victim makes his attack rolls and saving throws at a -4 penalty, and his AC is penalized by 4.\n&emsp;*Heat* from the *orb* is intense enough to melt 1 cubic yard of ice. The victim suffers a loss of 1 point of Strength and 1 point of Dexterity (or for victims without these attributes, -1 to hit and a penalty of 1 to AC) for 1 round.\n&emsp;*Fire* from the *orb* ignites all combustible materials within 3 feet of the victim.\n&emsp;*Blindness* from the *orb* causes the victim to become *blind* as per the spell. The effect lasts for 1 round/level of the caster ([[@{level-wizard}]] rounds).\n&emsp;*Stinking cloud* from the *orb* surrounds the victim in a 5-foot-radius noxious cloud. The victim must save vs. poison or will be reeling and unable to attack until he leaves the area of the vapors.\n&emsp;*Magnetism* from the *orb* has an effect only if the victim is wearing armor made from iron. The iron armor becomes magically magnetized for 3-12 (3d4) rounds. Other iron objects within 3 feet of the caster will stick tight to the magnetized armor; only *dispel magic* or a similar spell can release the stuck items. At the end of the spell\'s duration, the stuck items are released.\n&emsp;*Paralysis* from the *orb* causes the victim to become paralyzed for 6-20 (2d8 + 4) rounds; a successful saving throw vs. paralyzation halves the number of rounds.\n&emsp;*Petrification* from the *orb* turns the victim to stone. If the victim successfully saves vs. petrification, he avoids turning to stone and instead is *slowed* (as per the spell) for 2-8 (2d4) rounds.\n&emsp;*Death* from the *orb* causes the victim to die. If the victim successfully saves. vs death magic, he avoids death and instead is paralyzed for 2-5 (1d4 +1) rounds.}}{{c1-1=**Table 16: Chromatic Orb Effects**\n\n}}{{cs1-1=4}}{{cc2-1=bottom}}{{c2-1=**Level of**\n**Caster**}}{{c3-1=1st}}{{c4-1=2nd}}{{c5-1=3rd}}{{c6-1=4th}}{{c7-1=5th}}{{c8-1=6th}}{{c9-1=7th}}{{c10-1=10th}}{{c11-1=12th}}{{cc2-2=bottom}}{{c2-2=**Color of Orb**\n**Generated**}}{{c3-2=White}}{{c4-2=Red}}{{c5-2=Orange}}{{c6-2=Yellow}}{{c7-2=Green}}{{c8-2=Turquoise}}{{c9-2=Blue}}{{c10-2=Violet}}{{c11-2=Black}}{{c2-3=**Hit Points**\n**of Damage**}}{{c3-3=1-4}}{{c4-3=1-6}}{{c5-3=1-8}}{{c6-3=1-10}}{{c7-3=1-12}}{{c8-3=2-8}}{{c9-3=2-16}}{{c10-3=*slow*}}{{c11-3=*paralysis*}}{{cc2-4=bottom}}{{c2-4=**Special**\n**Power**}}{{c3-4=Light}}{{c4-4=Heat}}{{c5-4=Fire}}{{c6-4=Blindness}}{{c7-4=Magnetism}}{{c8-4=Paralysis}}{{c9-4=Stinking Cloud}}{{c10-4=Petrification}}{{c11-4=Death'
}

wiz1['Corpse Visage'] = {
    'level': '1',
    'school': 'Illusion, Necromancy',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Creature touched',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'A rag or piece of cloth taken from a corpse. The cloth must be prepared by dotting it with paints of assorted colors.',
    'reference': 'p. 96',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell transforms the caster’s face or the face of any creature touched by the caster into the horrifying visage of a rotting corpse. The effect of this illusion is so startling that when it is viewed by opponents, the wizard\'s party adds a modifier of +2 to their surprise roll. Creatures with low Intelligence or higher (Intelligence of 5 or greater) and with 1 Hit Die or less (or who are 1st level or lower) must make a successful saving throw when first viewing *corpse visage* or flee in terror for 1-4 rounds.\n&emsp;*Corpse visage* does not distinguish between friend and foe, and all who view it are subject to its effects. If the spell is cast upon an unwilling victim, the victim is allowed a saving throw to avoid the effect.'
}

wiz1['Detect Disease'] = {
    'level': '1',
    'school': 'Divination)',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '1 creature or object',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A twig or small branch from any tree.',
    'reference': 'p. 97',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Detect disease* reveals to the wizard whether a subject creature or object carries a disease, whether normal or magical. Additionally, there is a 10 percent chance per level of the caster that he is able to identify the exact type of disease. Currently [[10*[[@{level-wizard}]] ]]% chance to identify type of disease'
}

wiz1['Divining Rod'] = {
    'level': '1',
    'school': 'Divination, Enchantment',
    'range': '60 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The branch from a ginkgo tree or a fruit tree, such as peach, apple, or lemon. The branch must be shaped like the letter Y, so that the caster can grasp a fork of the branch in each hand.',
    'reference': 'p. 97',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to enchant the branch of a ginkgo or fruit tree to locate a common item that is hidden from view. Unlike *locate object*, the caster does not need to have a specific mental image of a particular item; rather, he only needs to state the name of the general type of item he wishes to locate, such as buried treasure, edible plants, or fresh water. However, *divining rod* will not locate invisible or magical items, nor will it locate items protected by *obscure item* or a similar spell.\n&emsp;Once the branch is enchanted, the caster holds the branch with both hands. If the desired item is within the range of the spell, the enchanted branch points in the direction of the item and gently pulls the caster along. The spell is not blocked by lead or any other substance. However, if an impenetrable obstacle is reached, such as the ground or a wall, the branch presses against it and stops. If there is no item matching the description within the spell range, the branch does not react, although the caster can move about and continue to search.'
}

wiz1['Protection from Hunger and Thirst'] = {
    'level': '1',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] day(s)',
    'aoe': 'One creature',
    'components': 'S, M',
    'cast-time': '1',
    'saving-throw': 'None',
    'materials': 'A small piece of dried meat and a cup of water.',
    'reference': 'p. 97',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When *protection from hunger and thirst* is cast, the recipient requires no food, water, or nourishment of any kind for the duration of the spell. The recipient can be the caster or anyone he touches. Each day the caster (or the subject of the caster’s choice) is under the effect of the spell, he is fully nourished as if he had eaten and drunk normally. At the end of the spell\'s duration, the subject is no more hungry or thirsty than he was when the spell was originally cast.'
}

wiz2['Choke'] = {
    'level': '2',
    'school': 'Necromancy, Conjuration/Summoning',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': '½',
    'materials': 'A handkerchief or similarly-sized piece of cloth that has been tied in a knot',
    'reference': 'p. 97',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '[[1d4]]',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of *choke*, the caster causes a pair of ghostly hands to appear around the throat of a single victim. The victim must be a human, demihuman, or humanoid, and must be within 30 yards of the caster. The hands will choke and strangle the affected victim for the duration of the spell; each round, the victim suffers 1-4 hit points of damage from the choking hands. If the victim makes a successful saving throw, he suffers half- damage each round.\n&emsp;*Choke* can be negated by *dispel magic* or a similar spell; the victim makes all attack rolls at a -2 penalty while affected by *choke*.'
}

wiz2['Death Recall'] = {
    'level': '2',
    'school': 'Necromancy, Divination',
    'range': 'Touch',
    'duration': 'Special',
    'aoe': 'One corpse',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A fragment from a shattered mirror',
    'reference': 'p. 97',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables the caster to visualize the final minutes of the life of any creature or person that died within the previous 24 hours. When the caster touches the subject’s corpse, the caster goes into a trance. The caster then has a vision of the final 10 minutes of the subject’s life as seen by the subject himself. The vision ends with the last scene the subject saw before he died, at which time the caster awakens from his trance and the spell is over.'
}

wiz2['Detect Life'] = {
    'level': '2',
    'school': 'Divination',
    'range': '10 feet/level',
    'duration': '5 rounds',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': '',
    'reference': 'p. 98',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By use of this spell, the caster can determine if a creature is alive, including creatures in a coma or trance, or under the influence of *feign death*. Any form of mental protection prevents the effectiveness of this spell, as does any thickness of metal. An inch of stone or wood is treated as 10 feet of open space for the purpose of determining whether the spell functions.'
}

wiz2['Filter'] = {
    'level': '2',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '10-foot radius sphere around creature touched',
    'components': 'V, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A strand of spider web and a scrap of cotton cloth approximately one inch square',
    'reference': 'p. 98',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates an invisible globe of protection that filters out all noxious elements from poisonous vapors; therefore, a creature protected by *filter* takes no damage and suffers no penalties from poison gas of any kind, including those created magically (such as *stinking cloud*). The exceptions are poisonous vapors created by a dragon’s breath weapon (such as the chlorine gas of a green dragon); in these cases, the creature protected by *filter* suffers half-damage.'
}

wiz2['Ghoul Touch'] = {
    'level': '2',
    'school': 'Necromancy',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'One person',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'Special',
    'materials': 'A small scrap of cloth taken from the clothing of a ghoul or a pinch of earth from a ghoul’s lair.',
    'reference': 'p. 98',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'When this spell is in effect, the caster’s touch causes any single human, dwarf, gnome, half-elf, or halfling to become rigid for 3-8 (1d6 +2) rounds unless the victim makes a successful saving throw vs. paralyzation. Additionally, the paralyzed victim exudes a carrion stench in a 10-foot radius that causes retching and nausea. Those within this area who fail to save vs. poison will make their attacks with a -2 penalty until the spell reaches the end of its duration.'
}

wiz2['Ice Knife'] = {
    'level': '2',
    'school': 'Evocation',
    'range': 'Special',
    'duration': 'Instantaneous',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'A drop of water from melted snow and a tiny silver dagger.',
    'reference': 'p. 98',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '*Hit*: 2d4 damage. *Shatter*: 1d4 cold damage and numb for 1d3 rounds',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell fires a dagger of ice at the target. The caster makes a normal attack roll as if attacking with a missile weapon, factoring in the range from the attacker to the target (the *ice knife* has a long range of 30 yards, a medium range of 20 yards, and a short range of 10 yards). A successful hit causes 2-8 (2d4) hit points of damage. If the *ice knife* misses its target, consult the rules for grenade-like missiles on pages 62-63 of the *Dungeon Master’s Guide* to determine where it lands.\n&emsp;When an *ice knife* strikes a solid object or a creature, the knife shatters, releasing a wave of numbing cold. All creatures within a 5-foot radius must make a successful saving throw vs. paralyzation or suffer 1-4 hit points of cold damage and become numb for 1-3 rounds. Numbed creatures have their movement rates reduced by half and their chance to hit reduced by 2. Proximity to major sources of heat, such as a roaring bonfire, improves a creature’s saving throw by +2.\n&emsp;An *ice knife* that misses or is lost cannot be picked up by the caster (or anyone else) and thrown again. If the *ice knife* is touched, it instantly shatters, releasing a wave of cold as described above. If a lost *ice knife* is not touched, it melts away in a pool of water 1 round after it was originally created; this melting occurs regardless of the environmental temperature.'
}

wiz2['Vocalize'] = {
    'level': '2',
    'school': 'Alteration',
    'range': 'Touch',
    'duration': '5 rounds',
    'aoe': 'One spell-casting creature',
    'components': 'S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A small golden bell without a clapper',
    'reference': 'p. 99',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the recipient to cast spells that normally require a verbal component without the caster needing to make a sound. Such spells must be cast within the duration of the *vocalize* spell. This spell is also useful in situations where quiet is desired, or when the recipient is under the influence of a *silence* spell.\n&emsp;*Vocalize* does not negate a *silence* spell, but merely offsets it for the purpose of spell casting; if a spell caster under the effect of *vocalize* casts a spell that has some audible effect, that sound will be masked for as long as *silence* remains in force. *Vocalize* does not affect normal vocal communication.'
}

wiz3['Bone Club'] = {
    'level': '3',
    'school': 'Enchantment, Necromancy',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'One bone',
    'components': 'V, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'An appropriately-sized bone and a pinch of dirt from a grave',
    'reference': 'p. 99',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A wizard can use this spell to enchant a bone, causing it to become a magical club. This magical weapon acts as a *club +4* against undead, inflicting 5-10 (1d6 +4) hit points of damage, and a *club +1* against all other opponents, inflicting 2-7 (1d6 + 1) hit points of damage. The bone can be from any animal, providing the bone normally could be wielded as a club; for instance, a human femur could be enchanted by this spell, but a skull could not. At the end of the spell’s duration, the *bone club* reverts to a normal bone.\n&emsp;If the proficiency rules are being used, characters with a weapon proficiency with a club also have a profiency with a *bone club*. Those wielding a *bone club* without the club profiency suffer the penalties described on page 52 of the *Player’s Handbook*.'
}

wiz3['Delay Death'] = {
    'level': '3',
    'school': 'Enchantment, Necromancy',
    'range': '30 yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A chip from a tombstone or a sliver of wood from a coffin',
    'reference': 'p. 99',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell enables one person or creature to postpone death. If *delay death* is cast before the indicated creature or person reaches 0 hit points, he is able to fight, cast spells, communicate, and take all other normal actions until he reaches -10 hit points. However, from the time he reaches 0 hit points until he is reduced to -10 hit points, the affected person or creature makes all attack rolls and saving throws at a -2 penalty, and his movement rate is reduced by half.\n&emsp;When the subject reaches -10 hit points, he is dead and *Delay death* is no longer in effect. Note that the spell has a limited duration; if the spell expires after the affected subject has reached 0 hit points but before he has been reduced to -10 hit points, the subject dies instantly. A deceased subject previously under the effect of *delay Death* can be raised normally by raise dead and similar spells.'
}

wiz3['Hovering Skull'] = {
    'level': '3',
    'school': 'Necromancy',
    'range': 'Special',
    'duration': '[[2*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Special',
    'components': 'V, S',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'The tooth from a human skull.',
    'reference': 'p. 99',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '1d6',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a glowing human skull with sharp fangs. The skull hovers about a foot above the caster’s shoulder; as the caster moves, the skull hovers along with him. If the caster stops moving and concentrates, he can mentally command the *hovering skull* to move in any direction within a 30- foot radius.\n&emsp;The caster can see through the skull’s eyes as if they were his own; for instance, the *hovering skull* could be ordered to investigate a dark cave or peek over a high wall. Additionally, the caster can order the *hovering skull* to attack victims with its razor-sharp teeth. If the caster’s concentration is interrupted while controlling the skull, the skull immediately drops to the ground (but it takes no damage). If the caster resumes concentration, he can continue to command the skull.\n&emsp;The *hovering skull* has the same statistics as the caster, except the skull has 3 hit points and inflicts 1-6 hit points of damage with its bite. Attacks directed at the skull do not harm the caster, nor does damage directed at the caster affect the skull.'
}

wiz3['Invisible Mail'] = {
    'level': '3',
    'school': 'Evocation, Abjuration',
    'range': '0',
    'duration': 'Special',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A small fragment of plate mail.',
    'reference': 'p. 100',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'A variation of the *armor* spell, this spell enables the caster to cover his body with an invisible suit of plate mail to temporarily raise his AC to 3. Its effects are not cumulative with other armor or magical protection (a character cannot improve his AC better than 3 through use of this spell), but Dexterity bonuses still apply.\n&emsp;For each level of the caster, the *invisible mail* absorbs 1 hit point of damage that would normally hit AC 3 ([[@{level-wizard}]] points of damage); however, the *invisible mail* offers no protection against magical weapons or attacks. When the *invisible mail* has absorbed as many hit points of damage as the wizard has levels of experience, the *invisible mail* disappears. The *invisible mail* does not hinder movement, nor does it add weight or encumbrance. It does not interfere with spell casting.\n&emsp;Example: A wizard with a normal AC of 10 has shielded himself with *invisible mail*. The first opponent attacks with a normal dagger; the attack is made against the AC 3 of the *invisible mail*. The attack is successful, causing 2 hit points of damage, but this damage is absorbed by the *invisible mail* and the wizard is unharmed. A second attack is made with a sword +1. The invisible armor offers no protection against this magical weapon, so the attack is made against the wizard’s normal AC of 10.'
}

wiz3['Iron Mind'] = {
    'level': '3',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '1 hour',
    'aoe': 'One creature',
    'components': 'S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A small chunk of iron ore or any small item made of solid iron, such as a nail.',
    'reference': 'p. 100',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'The person or creature affected by *iron mind* is immune to all *charm* and *hold* spells for a full hour. Additionally, he automatically disbelieves all illusions cast by 3rd-level wizards (or their equivalent) or lower.'
}

wiz3['Pain Touch'] = {
    'level': '3',
    'school': 'Divination',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'One creature',
    'components': 'V, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A needle and the finger from a scorched glove.',
    'reference': 'p. 100',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Pain touch* enables the caster to touch an opponent in such a way as to induce extreme pain. The spell works if the caster touches any exposed part of an opponent’s body. The caster must be within arm’s length of the opponent for the spell to work. The spell requires a normal attack roll.\n&emsp;The pain causes no damage, but for the next 1-4 rounds, the victim will be -2 on his chance to hit and his AC is worsened by 2. The caster can cast the spell and touch the victim in the same round. *Pain touch* is only effective on human, demihuman, and humanoid opponents.'
}

wiz3['Snapping Teeth'] = {
    'level': '3',
    'school': 'Conjuration, Alteration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '1 creature or object',
    'components': 'V, S, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A tooth from any carnivorous animal, such as a wolf, shark, or serpent.',
    'reference': 'p. 100',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '1d4',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster causes a set of teeth to appear on a person or object; the teeth appear in the exact location touched by the caster. The *snapping teeth* are contained in a mouth-like orifice about 6 inches in diameter and are capable of snapping at victims within 1 foot. A person or creature with the *snapping teeth* can cause them to snap at will, effectively giving him an extra attack per round. A normal attack roll is made, and a successful hit inflicts 1-4 hit points of damage. Note that the victim must be within range of the teeth and that normal facing considerations must be accounted for (for instance, *snapping teeth* in the back of a person’s head can only attack victims that are behind the person).\n&emsp;*Snapping teeth* can also be placed on a non-living object, such as a tree or a door. In such cases, the *snapping teeth* are invisible until they make an attack. The *snapping teeth* will attack any victim that comes within 1 foot; they attack as a 4 HD monster, and each successful hit causes 1-4 hit points of damage. These attacks are automatic and are not controlled by the caster. Attacks cannot be directed against the *snapping teeth*, but *dispel magic* causes them to vanish.'
}

wiz4['Duplicate'] = {
    'level': '4',
    'school': 'Conjuration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': 'One object',
    'components': 'S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A pinch of coal dust.',
    'reference': 'p. 101',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates an exact copy of any single item the caster touches. The item to be copied must fit inside a 20-foot cube. The spell has no effect on living creatures, including undead, nor will it copy magical items. The *duplicated* item is identical to the original in every way--for instance, a *duplicated* sword can be wielded to inflict damage as a normal sword--but *detect magic* can reveal its true nature and *dispel magic* can cause it to disappear. The *duplicated* object exists for 1 hour/level of the caster, at which time it vanishes; permanency does not affect *duplicated* items.'
}

wiz4['Fire Aura'] = {
    'level': '4',
    'school': 'Abjuration',
    'range': '0',
    'duration': ' [[2*[[@{level-wizard}]] ]] rounds',
    'aoe': 'Caster',
    'components': 'V, S, M',
    'cast-time': '4',
    'saving-throw': 'Special',
    'materials': 'A scrap of singed paper and a piece of flint',
    'reference': 'p. 101',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '2d4 fire damage. If set afire then 1d6 fire damage per round',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster surrounds his body with an aura of magical green fire. The *fire aura* extends 1 foot from the caster’s body and provides illumination in a 10-foot radius. The *fire aura* provides complete immunity to all forms of fire, both natural and magical; the flames can be extinguished only by *dispel magic* or a similar spell. Those touching the *fire aura* suffer 2-8 (2d4) hit points of damage; additionally, if the touched victim fails to make his saving throw, his body is set afire with green flames.\n&emsp;The flames persist for 2-8 (2d4) rounds and can be extinguished only by *dispel magic* or a similar spell. Each round the victim is engulfed in these flames, he suffers an additional 1-6 hit points of damage; the victim’s attack rolls are made with a -2 penalty during this time.'
}

wiz4['Halo of Eyes'] = {
    'level': '4',
    'school': 'Abjuration, Conjuration',
    'range': '0',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'Special',
    'components': 'V, M',
    'cast-time': '4',
    'saving-throw': 'None',
    'materials': 'The feather of an eagle and an eyelash from the corpse of any creature.',
    'reference': 'p. 101',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Halo of eyes* creates a halo of functional eyeballs that sits atop the caster’s head, enabling the caster to see in all directions at the same time. Additionally, these magical eyes all have infravison to a distance of 60 yards. The caster can see opponents on all sides of him, providing they are not *invisible*, and therefore can never by struck from behind or suffer a penalty for a back attack. Under normal conditions, the caster cannot be surprised. Attacks cannot be directed against the magical eyeballs, but their vision is obscured by *blindness* and other magical and natural effects that would hinder the wizard’s normal sight.'
}

wiz4['Otiluke\'s Dispelling Screen'] = {
    'level': '4',
    'school': 'Evocation, Abjuration',
    'range': '[[5*[[@{level-wizard}]] ]] yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '20-foot square',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'None',
    'materials': 'A sheet of fine lead crystal and a chysolite gemstone worth 1,000 gp (both vanish after the spell is cast).',
    'reference': 'p. 101',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a shimmering screen of violet energy in any shape the caster desires. Any creature passing through the screen is affected by *dispel magic* with the same level of effectiveness as that spell cast by the wizard.'
}

wiz4['Wind Breath'] = {
    'level': '4',
    'school': 'Evocation',
    'range': '0',
    'duration': 'Instantaneous',
    'aoe': 'Cone 60 yards long and 30 yards wide at the base',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': '½',
    'materials': 'A handmade silk fan with a value of at least 1 gp.',
    'reference': 'p. 101',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '[[5*[[@{level-wizard}]] ]] MHP:}}{{d2t=[[{{[[5*[[@{level-wizard}]] ]],30}<29}]]}}{{d2=[[0]]}}{{d3t=[[{{[[5*[[@{level-wizard}]] ]],0}>30}*{{[[5*[[@{level-wizard}]] ]],50}<49}]]}}{{d3=[[1]]}}{{d4t=[[{{[[5*[[@{level-wizard}]] ]],0}>50}*{{[[5*[[@{level-wizard}]] ]],70}<69}]]}}{{d4=[[1d4]]}}{{d5t=[[{{[[5*[[@{level-wizard}]] ]],0}>70}]]}}{{d5=[[1d8]]',
    'damage-type': '',
    'healing': '',
    'effect': 'A variation of *gust of wind*, this spell allows the caster to fill his lungs with air and expel a powerful wind. The strength of this wind is about 5 miles per hour for every level of the caster ([[5*[[@{level-wizard}]] ]] miles per hour). Those outside the area of effect do not notice the tremendous winds, though objects may be blown out of the spell’s area into their path. The DM should determine the precise effects of the *wind breath* using the following parameters as guidelines.\n&emsp;If the *wind breath* is 30-50 miles per hour, there is a 10 percent chance that small boats capsize, a 1 percent chance that ships capsize, and a 10 percent chance that a man is knocked down. There is a 20 percent chance that branches snap, light articles are blown away, and tents and sails tear. Creatures caught in the cone of the *wind breath* suffer 1 hit points of damage from blown sand and grit.\n&emsp;If the *wind breath* is 50-70 miles per hour, there is a 70 percent chance that small boats capsize, a 20 percent chance that ships capsize, and a 50 percent chance that a man is knocked down. Trees bend and there is a 70 percent chance that branches snap, and a 20 percent chance that a trunk snaps. Medium-sized articles are blown away, and there is a 50 percent chance that tents and sails are torn, and a 40 percent chance that shacks are blown down. Creatures caught in the cone of the *wind breath* suffer 1-4 hit points of damage from sand and grit. Flying creatures are blown back 10-40 (10d4) feet.)\n&emsp;If the *wind breath* is 70 miles per hour or more, there is a 100 percent chance that small boats capsize, a 70 percent chance that ships capsize, and a 70 percent chance that a man is knocked down and blown 10-40 (10d4) feet to suffer 1-6 hit points of damage per 10 feet blown. There is a 70 percent chance that tree trunks snap, and a 100 percent chance that branches are ripped from trees. Heavy articles are blown away, medium articles are ripped from fastenings, and tents and sails have a 70 percent chance of being destroyed. There is a 20 percent chance that common buildings are blown down and a 60 percent chance that shacks are flattened. Creatures caught in the cone of the *wind breath* suffer 1-8 hit points of damage from blown objects. Flying creatures are blown back 50-100 (40+10d6) feet.'
}

wiz5['Force Shapechange'] = {
    'level': '5',
    'school': 'Necromancy',
    'range': '[[10*[[@{level-wizard}]] ]] yards',
    'duration': 'Instantaneous',
    'aoe': '[[@{level-wizard}]] creatures',
    'components': 'V, S, M',
    'cast-time': '1',
    'saving-throw': '½',
    'materials': 'A hair from the hide of any lycanthrope and a live butterfly, released when the verbal component is uttered.',
    'reference': 'p. 102',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '*Saving throw failed*: 3d10. *Saving throw successful*: 2d10/2',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the caster can force any shapechanger or magic-wielder using any form of a *shapechanging* spell to instantly revert to his true form (or his most common form). To use the spell, the caster points at creatures he knows or believes to be shapechangers. If the creatures are indeed shapechangers, they must make a successful saving throw or immediately revert to their true form and suffer 3-30 (3d10) hit points of damage from the wracking pain caused by the forced change. The change takes a full round, during which time a victim can take no other actions. If the saving throw was successful, the victim does not change form, but still suffers half damage (2d10/2).'
}

wiz5['Invulnerability to Normal Weapons'] = {
    'level': '5',
    'school': 'Abjuration',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '5-foot radius',
    'components': 'V, M',
    'cast-time': '2',
    'saving-throw': 'None',
    'materials': 'A piece of a broken non-magical weapon and a scale from a dragon',
    'reference': 'p. 103',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates an immobile, faintly shimmering magical sphere around the caster that cannot be penetrated by non-magical blunt weapons, edged weapons, or missile weapons. The caster can use these weapons from inside the sphere to attack opponents normally. Spells can also be cast through the sphere. The sphere can be negated by *dispel magic*.'
}

wiz5['Know Value'] = {
    'level': '5',
    'school': 'Divination',
    'range': '10 yards',
    'duration': 'Instantaneous',
    'aoe': '10-foot cube',
    'components': 'V, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A copper piece and a phony gem',
    'reference': 'p. 103',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Know value* enables the caster to know the total value of all coins, gems, and jewelry within the area of effect, within the limits that follow.\n&emsp;The items must be clearly visible. They cannot be concealed on people, hidden in a chest, or buried in the ground. The items must also be contained within an area no larger than a 10-foot cube, and this area can be no farther than 10 yards from the caster.\n&emsp;Further, *know value* will only reveal the value of 75% of the total number of objects in a treasure pile, up to a maximum of 10 pieces; the DM determines which pieces the spell affects, and the caster does not know which particular pieces have been appraised. The spell does not detect the presence or value of magical items, and it ignores the value of personal property, such as clothing, weapons, and other equipment. *Know value* does not reveal the number or nature of any type of hidden objects.'
}

wiz5['Mordenkainen\'s Private Sanctum'] = {
    'level': '5',
    'school': 'Alteration, Abjuration',
    'range': '0',
    'duration': '[[@{level-wizard}]] hours',
    'aoe': 'One room',
    'components': 'V, S, M',
    'cast-time': '2 turns',
    'saving-throw': 'None',
    'materials': 'A thin sheet of lead, a piece of opaque glass, a wad of cotton or cloth, and a pinch of powdered chrysolite.',
    'reference': 'p. 103',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, privacy is ensured in a room of up to 1600 square feet (40 feet x 40 feet, or the equivalent). From the outside, the windows of the room appear to be dark and cloudy, preventing those with normal vision, infravision, or any other type of vision from seeing inside. Those inside the room can see out the windows as they normally would. No sounds of any kind can escape from the room. Scrying attempts, such as *ESP*, *clairaudience*, *clairvoyance*, and *crystal balls* cannot penetrate the room, and a *wizard eye* cannot enter. The caster can leave the room without affecting the spell.'
}

wiz5['Mummy Rot'] = {
    'level': '5',
    'school': 'Necromancy',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'One victim',
    'components': 'V, S, M',
    'cast-time': '5',
    'saving-throw': 'Special',
    'materials': 'A piece of rotten fruit and a piece of a mummy’s cloth wrapping.',
    'reference': 'p. 103',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '2d6',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell allows the caster to attack with a rotting touch similar to that of a mummy. If the caster touches a human, demihuman, or humanoid victim, the victim immediately loses 2-12 (2d6) hit points and is infected with a rotting disease which is fatal in 1-6 months. For each month the rot progresses, the victim permanently loses 2 points of Charisma. While infected, the victim recovers lost hit points at 10 percent of his normal rate.\n&emsp;The rotting disease can be cured only with a *cure disease* spell; *cure wounds* has no effect. A *regenerate* spell will restore damage but will not otherwise affect the course of the disease. If a victim makes a successful saving throw, he is not infected, but he still suffers 2-12 hit points of damage.'
}

wiz5['Rary\'s Telepathic Bond'] = {
    'level': '5',
    'school': 'Divination, Alteration',
    'range': '20 yards',
    'duration': '[[2*[[@{level-wizard}]] ]] turns',
    'aoe': 'Two or more creatures',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'Two pieces of eggshell; the pieces must be from the eggs of two different species of egg-laying creature.',
    'reference': 'p. 104',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'With this spell, the caster forms a telepathic bond between two or more creatures with Intelligence of 6 or higher. The bond can be established only between willing creatures who are within 20 yards of each other. The creatures need not speak the same language to communicate via the bond. The bond can be placed upon one creature for every three levels of the caster ([[floor([[@{level-wizard}]]/3)]] creatures); therefore, a 9th-level caster can forge a bond among three creatures. The bonded creatures can remain in mental contact as long as they remain on the same plane of existence. If either creature enters a different plane, the spell is terminated.\n&emsp;*Rary’s telepathic bond* can be cast only once to affect a single pair of subjects. However, if the caster is able to cast the spell twice, the same subjects can be affected again. Example: A wizard can cast *telepathic bond* twice. The first casting links Subject A to Subject B. The second casting can affect Subject A again, linking him with Subject C.'
}

wiz5['Throbbing Bones'] = {
    'level': '5',
    'school': 'Necromancy',
    'range': '10 yards',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'One creature',
    'components': 'V, M',
    'cast-time': '3',
    'saving-throw': '½',
    'materials': 'Both pieces of a small bone that has been snapped in half',
    'reference': 'p. 104',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '[[1d4]]',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes the bones of the affected creature to throb and pulsate inside his body. The spell can be cast upon any single living creature or person within the caster’s range, providing the creature has a physical form and has bones inside its body; for instance, *throbbing bones* will not affect insects, ghosts, or worms.\n&emsp;For the duration of the spell, the affected creature’s AC is worsened by 2, its movement rate is halved, and all its attacks are made with a -2 penalty. Additionally, it suffers 1-4 hit points of damage per round; this damage is halved if the creature makes a successful saving throw. However, a successful saving throw has no affect on the movement, attack, and AC penalties.'
}

wiz5['Wall of Bones'] = {
    'level': '5',
    'school': 'Conjuration, Necromancy',
    'range': '60 yards',
    'duration': '1 turn',
    'aoe': '[[10*[[@{level-wizard}]] ]]-foot square; [[6*[[@{level-wizard}]] ]]-inch thickness',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The branch of a withered tree taken from a cemetery',
    'reference': 'p. 104',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '*Wiggle through*: 1d8 per 10 feet thickness. *On cast*: 2d8',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes a wall of bones to erupt from the earth in whatever shape the caster desires within the limits of the area of effect. The wall is a random construction of bones from many types of creatures. The wall need not be vertical, but it must rest upon a firm foundation or it will collapse. Since the wall has many small openings and gaps, it provides only 50 percent cover. Missiles can easily be fired from behind the wall, and creatures of small size (less than 4 feet tall) can wriggle through openings in the wall at the rate of 10 feet per round. However, the wall has many sharp edges and creatures wriggling through it suffer 1-8 hit points of damage per 10 feet traveled.\n&emsp;If the spell is cast in an area occupied by creatures, the *wall of bones* appears everywhere except where the creatures stand. Creatures in the affected area suffer an immediate 2-16 (2d8) hit points of damage when the wall appears. The wall can be smashed by creatures wielding blunt weapons with a Strength of 18 or greater. Every 10 hit points of damage causes a 5 foot x 5 foot x 6 inch section of the wall to collapse. The *wall of bones* is unaffected by *animate dead*.'
}

wiz6['Blackmantle'] = {
    'level': '6',
    'school': 'Necromancy, Enchantment',
    'range': '60 yards',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '15-foot radius',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'Negate',
    'materials': 'A small mummified animal, such as a mouse or a toad',
    'reference': 'p. 104',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Blackmantle* creates a shimmering aura around all creatures within the affected area that negates all healing and regeneration, both natural and magical. For instance, a *potion of healing* has no effect on a creature under the influence of *blackmantle*, a troll cannot regenerate lost hit points, and *cure light wounds* is useless.\n&emsp;*Blackmantle* is negated for any target creatures who make successful saving throws. Otherwise, it persists for 1 turn per level of the caster. If the creatures are still alive at the end of the spell’s duration, any active curative forces will operate normally; for instance, a *ring of regeneration* will resume its function. However, consuming a *potion of healing* or applying a *staff of curing* while *blackmantle* is in effect will have no affect when *blackmantle* wears off, since these types of magic work instantly. In such cases, the dose of *potion of healing* and the charge from a *staff of curing* are not only wasted, but the aura generated by *blackmantle* actually negates the *potion of healing* or the *staff of curing*, rendering it useless. If a *potion of healing* or *staff of healing* is applied after the spell wears off, the healing magic works normally.'
}

wiz6['Dead Man\'s Eyes'] = {
    'level': '6',
    'school': 'Necromancy',
    'range': 'Special',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'Special',
    'components': 'S, M',
    'cast-time': '1 round',
    'saving-throw': 'Special',
    'materials': 'Two eyeball-sized glass marbles. The marbles must be the same color as the caster’s eyes',
    'reference': 'p. 105',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '2d6',
    'damage-type': '',
    'healing': '',
    'effect': '*Dead Man’s Eyes* causes the whites of the caster’s eyes to turn black and his pupils to reshape themselves into small white skulls. The caster can affect one victim per round, providing the victim is within 3 feet of the caster and meets his gaze. Victims are affected as follows:\n&emsp;• Victims with 2 Hit Dice or fewer (or victims of level 2 or lower) instantly die. No saving throw is allowed.\n&emsp;• Victims with 2+ to 5 Hit Dice (or victims of level 3-5) instantly die unless they save vs. death magic at a -2 penalty. Those who succeed in their saving throws suffer 2-12 (2d6) hit points.\n&emsp;• Victims with 5+ Hit Dice or more (or victims of level 6 or greater) suffer 2-12 (2d6) hit points of damage unless they save vs. death magic.\n&emsp;If the caster’s gaze is reflected back on him (by a mirror, calm water, etc.), he must make a saving throw vs. spells or suffer the same effects as a 5+ Hit Dice victim. At the end of the spell’s duration, there is a 5 percent chance that the caster will become blind for the next 5-10 (1d6 + 4) hours.'
}

wiz6['Dragon Scales'] = {
    'level': '6',
    'school': 'Abjuration',
    'range': 'Touch',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'One creature',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A scale from any dragon.',
    'reference': 'p. 105',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell causes the body of the caster (or any single person or creature touched by the caster) to become completely covered with dragon scales, effectively raising the subject’s Armor Class by 2 for the duration of the spell; this modification is in addition to the subject’s normal AC (for instance, if the subject’s AC is 6, *dragon scales* raises it to 4).\n&emsp;The color of the *dragon scales* is the same as that of the scale used as the spell’s material component; however, the color has no bearing on the effect of the spell. *Dragon scales* also temporarily reduces the subject’s Charisma by 2 points.'
}

wiz6['Invulnerability to Magical Weapons'] = {
    'level': '6',
    'school': 'Abjuration',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': '5-foot radius',
    'components': 'V, M',
    'cast-time': '3',
    'saving-throw': 'None',
    'materials': 'A piece of a broken magical weapon.',
    'reference': 'p. 105',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates an immobile, faintly shimmering magical sphere around the caster that cannot be penetrated by magical blunt, edged, or missile weapons; all such weapons are harmlessly deflected (missile weapons strike the sphere, then immediately fall to the ground). However, the sphere offers no protection against magically-created creatures (such as golems) or from creatures whose attacks are magically based (such as the gaze of a medusa). The sphere offers no protection against spells such as *magic missile*, or spells that simulate the effects of weapons.\n&emsp;The caster can use magical weapons from inside the sphere to attack opponents normally. Spells can also be cast through the sphere. The sphere can be negated by *dispel magic*.'
}

wiz6['Tentacles'] = {
    'level': '6',
    'school': 'Conjuration, Alteration',
    'range': '0',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'The caster',
    'components': 'V, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'A dried tentacle from a small octopus',
    'reference': 'p. 105',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '*Strike*: 1d6. *Grab*: 2d4',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster causes two 10-foot-long greenish tentacles to grow from his body. One tentacle grows on each side of the caster’s body, centered between his armpit and his thigh. The caster can use the tentacles as normal appendages to grasp tools, use weapons, or help with climbing.\n&emsp;Each tentacle can make an attack, effectively giving the caster two extra attacks per round; a tentacle can strike to inflict 1-6 hit points of damage, or it can wield a sword, dagger, or other weapon (at the same ability of the caster). The flexible tentacles can easily reach victims on any side of the caster’s body.\n&emsp;If an unarmed tentacle makes a successful strike against a victim who is man-sized or smaller (less than 7 feet tall), it also grabs and holds the victim to inflict an automatic 2-8 (2d4) hit points of damage in every subsequent round. To free himself, the victim must sever the tentacle; there is no way to loosen the grip other than severing the member, killing the caster, or negating the spell with *dispel magic*. A tentacle is severed if it takes 10 hit points of damage; damage directed at the tentacle has no adverse effects on the caster.\n&emsp;A caster with two intact tentacles adds a 40 percent bonus modifier to his climbing success rate (see page 161 of the Player’s Handbook,) and adds a 20 percent modifier if he has only one intact tentacle.'
}

wiz7['Zombie Double'] = {
    'level': '7',
    'school': 'Necromancy',
    'range': '0',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': 'Special',
    'components': 'V, S, M',
    'cast-time': '1 turn',
    'saving-throw': 'None',
    'materials': 'A bit of wax from a black candle and a lock of hair from the caster',
    'reference': 'p. 106',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'This spell creates a ju-ju zombie duplicate of the caster. The *zombie double* has the same memories, consciousness, and alignment as the caster; essentially, the caster now exists in two bodies simultaneously. In all other respects, the *zombie double* is the same as a normal ju-ju zombie (AC 6; MV 9; HD 3+12; #AT 1; Dmg 3-12; SA strike as a 6 HD monster; SD immune to all mind-affecting spells, including illusions; immune to *sleep*, *charm*, *hold*, *death magic*, *magic missiles*, electricity, poisons, and cold-based spells; edged and cleaving weapons inflict normal damage while blunt and piercing weapons inflict half- damage; magical and normal fire inflicts half-damage); THAC0 16.\n&emsp;The *zombie double* cannot cast spells, but it can use any weapons that the caster can use. It is also able to climb walls as a thief (92 percent). The *zombie double* can be turned as a spectre. If it strays more than 30 yards from the caster, the *zombie double* becomes inactive and collapses to the ground; it becomes active again the instant the caster moves within 30 yards.'
}

wiz8['Defoliate'] = {
    'level': '8',
    'school': 'Necromancy',
    'range': '30 yards',
    'duration': 'Special',
    'aoe': '[[50*[[@{level-wizard}]] ]]-foot square',
    'components': 'S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The petal from a withered flower and a sliver of charred wood.',
    'reference': 'p. 106',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster causes all vegetation within the affected area to wither and die, crumbling into black ashes. All vegetation is affected, from the tallest tree to the tiniest blade of grass. Intelligent plant life, such as treants, are also destroyed. The power of a *wish* or its equivalent is required to restore the destroyed vegetation; otherwise, nothing can grow in the *defoliated* area for a full year. Note that since *defoliate* causes plants to crumble to ash, there is no danger of a creature being struck by a toppling tree; however, creatures hiding in trees will find themselves plummeting to the ground when this spell is cast.'
}

wiz8['Fear Ward'] = {
    'level': '8',
    'school': 'Abjuration',
    'range': '0',
    'duration': '[[@{level-wizard}]] turns',
    'aoe': '5 foot radius',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The fangs of a spider and a hair from the head of a ghoul.',
    'reference': 'p. 106',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': '*Fear ward* creates an aura around the caster that makes him immune to all forms of *fear*, including that caused by dragons. Additionally, *fear ward* protects the caster from attacks by all forms of undead; the spell is equally effective against physical and magical attacks. *Dispel magic* has no effect on *fear ward*, but a *wish* will negate it.'
}

wiz8['Shadow Form'] = {
    'level': '8',
    'school': 'Necromancy',
    'range': '0',
    'duration': '[[@{level-wizard}]] rounds',
    'aoe': 'The caster',
    'components': 'V, S, M',
    'cast-time': '1 round',
    'saving-throw': 'None',
    'materials': 'The shroud from a corpse at least 100 years old and a black glass marble.',
    'reference': 'p. 106',
    'book': 'The Complete Wizard\'s Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'effect': 'By means of this spell, the caster temporarily changes himself into a shadow. The caster gains the movement rate, Armor Class, hit dice, and all abilities of a shadow. His chilling touch (requiring a normal attack roll) inflicts 2-5 (1d4+1) hit points of damage on his victims as well as draining one point of Strength. Lost Strength returns in 2-8 (2d4) turns after being touched. If a human or demihuman victim is reduced to 0 hit points or 0 Strength by the caster in *shadow form*, the victim has lost all of his life force and is immediately drawn into the Negative Material Plane where he will forever after exist as a shadow.\n&emsp;All of the caster’s weapons and equipment stay with him, but he is unable to use them while in *shadow form*. He is also unable to cast spells while in *shadow form*, but he is immune to *sleep*, *charm*, and *hold* spells, and is unaffected by cold-based attacks. He is 90 percent undetectable in all but the brightest of surroundings. Unlike normal shadows, a wizard in *shadow form* cannot be turned by priests.\n&emsp;At the end of the spell’s duration, there is a 5% chance that the caster will permanently remain as a shadow. Nothing short of a *wish* can return the caster to his normal form.'
}

//#endregion

const wizardSpells = {};
wizardSpells['wiz1'] = wiz1;
wizardSpells['wiz2'] = wiz2;
wizardSpells['wiz3'] = wiz3;
wizardSpells['wiz4'] = wiz4;
wizardSpells['wiz5'] = wiz5;
wizardSpells['wiz6'] = wiz6;
wizardSpells['wiz7'] = wiz7;
wizardSpells['wiz8'] = wiz8;
wizardSpells['wiz9'] = wiz9;

const wizmonster = {};
for (const [_, section] of Object.entries(wizardSpells)) {
    for (const [spellName, spell] of Object.entries(section)) {
        wizmonster[spellName] = spell;
    }
}
wizardSpells['wizmonster'] = wizmonster;
/* ---- Wizard spells end ---- */
module.exports = wizardSpells;