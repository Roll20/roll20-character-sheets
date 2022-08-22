//Ability score requirements: 15 wis, 12 int, 11, con

//total discipline: level-1 / 4 round up  +1
//total science: level / 2  round up
//total devotions: level*2+1 + level-4 (only positive numbers, kh1)
// def modes: level/2 round up

// minimum double devotions compared to sciences
// same ability can be relearned instead of a new ability (maybe track "slots" put into single ability)

// base PSP: 20 + (wiz-15*2) + (int-15) + (con-15) (only positive numbers, kh1)
// PSP Advancement: level-1 * (10 +  (wiz-15)kl1)

// defense modes does not require Telepathic disciplines, learned at 1,3,5,7,9. 1 + (level-1/2) round down
// defense modes do not count towards the max number of powers
// defense modes are counted towards the number of disciplines in Telepathic... maybe?

// Thac0 as rogues
// saving throws unique, +2 vs enchantment/charm spells

// Psionic power options: Reduce power score based on armor

// weapon Proficiencies: 2 (5, 10, 15, ...) -4 penalty
// nonweapon prof: 3 (3,6,9, ...)

// defense modes are available, does not require telepathic to all and is learned at
// attack modes are learned like any other power
// attack vs defense mode table

// if power score is 20 or above -> reduce to 19, and 20 is normal failure
// enhanced powers have a range for power scores, and remove the minimum effect of 1


// Telepathic defense modes have no prerequisites: intellect fortress, mental barrier, mind blank, thought shield, tower of iron will
//
// Ego Whip has contact as a prerequisite
//
// p. 75 The heading for the "Fate Link" power is missing
//
// Mindlink
//
// Mindlink is not a prerequisite for the following telepathic devotions: empathy, ESP, identity penetration, incarnation awareness, psychic impersonation, send thoughts.
//
//     Mindlink has never been a prerequisite for: ejection, conceal thoughts, contact, life detection, mind bar, psionic blast, and psychic messenger
//
// Mindlink is a prerequisite for all other telepathic powers.
//
//     All references to the "telepathy" power should be to the "mindlink" power.
//
//     Mind thrust has contact as a prerequisite.
//
//     Psionic blast is a science.
//
//     Psychic crush is a devotion.
//
//     Psychokinesis: The following PK devotions do not require telekinesis as a prerequisite: animate shadow, control light, control sound, molecular agitation, soften, telekinesis.

const CLAIRSENTIENT = {Devotion: {}, Science: {}};
CLAIRSENTIENT['Science']['Aura Sight'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-5',
    'context-modifier': '',
    'initial-cost': '9',
    'maintenance-cost': '9/round',
    'range': '50 yards',
    'prep': '0',
    'aoe': 'personal',
    'prerequisites': 'none',
    'reference': 'p. 28',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist can examine up to four auras per round instead of two.',
    '20': 'The initiator can’t use this power again for 24 hours.',
    '1': 'Reading is incomplete or slightly incorrect. For example, the psionicist may learn only the chaotic portion of a chaotic neutral alignment. Or he may interpret the character’s level with an error of one or two levels.',
    'effect': 'An aura is a glowing halo or envelope of colored light which surrounds all living things. It is invisible to the naked eye. A creature’s aura reflects both its alignment and its experience level.\n&emsp;When a psionicist uses this power, he can see auras. Interpreting an aura requires some concentration, however. With each use of this power, the psionicist can learn only one piece of information—either the subject’s alignment or experience level, but not both simultaneously.\n&emsp;A psionicist can examine up to two auras per round (he must be able to see both subjects). Alternately, he can examine the same aura twice, to verify his first impression with a second reading or to pick up remaining information. In any case, the psionicist must make a new power check each time he attempts to interpret an aura.\n&emsp;The psionicist can be reasonably discreet when he uses this power. He doesn’t have to poke at the subject or give him the hairy eyeball. However, he does need to gaze at the subject intently. Since the range of this power is the range of vision, the psionicist can go unnoticed by maintaining his distance. If he tries to sense auras on the people he is conversing with, they certainly will notice that he is staring and probably will be uncomfortable.\n&emsp;The level of the character being analyzed affects the psionicist’s power check. The higher the subject’s experience level, the tougher it is to interpret the subject’s aura. This translates into a -1 penalty for every three levels of the subject, rounded down. For example, a psionicist reading the aura of an 8th level character would suffer a -2 penalty.\n&emsp;If the die roll for the power check is a 1, the psionicist’s reading is incomplete or slightly incorrect. For example, the psionicist may learn only the chaotic portion of a chaotic neutral alignment. Or he may interpret the character’s level with an error of one or two levels.\n&emsp;*Power Score*—The psionicist can examine up to four auras per round instead of two.\n&emsp;*20*—The initiator can’t use this power again for 24 hours.'
};
CLAIRSENTIENT['Science']['Clairaudience'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'context-modifier': '?{How far await is the listening spot?|100 yards (0),0|1000 yards (-2),-2|10 miles (-4),-4|100 miles (-6),-6|1000 miles (-8),-8|10000 miles (-10),-10|Interplanetary (-12),-12}',
    'initial-cost': '6',
    'maintenance-cost': '4/round',
    'range': 'unlimited',
    'prep': '0',
    'aoe': 'special',
    'prerequisites': 'none',
    'reference': 'p. 30',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist automatically gains clairvoyance of the area as well.',
    '20': 'The psionicist is deaf for [[1d12]] hours.',
    '1': '',
    'effect': 'Clairaudience allows the user to hear sounds from a distant area. The psionicist picks a spot anywhere within range. He then can hear everything that he would be able to hear normally if he were standing in that spot. If the psionicist has enhanced senses, the senses apply to clairaudience as well.\n&emsp;The farther the “listening spot” is from the psionicist, the more difficult it is to use this power. The table below gives specifics.}}{{style=center2}}{{cc1-1=bottom}}{{c1-1=**Range**}}{{c2-1=100 yards}}{{c3-1=1,000 yards}}{{c4-1=10 miles}}{{c5-1=100 miles}}{{c6-1=1,000 miles}}{{c7-1=10,000 miles}}{{c8-1=Interplanetary&ast;}}{{c1-2=**Power Score Modifier**}}{{c2-2=0}}{{c3-2=-2}}{{c4-2=-4}}{{c5-2=-6}}{{c6-2=-8}}{{c7-2=-10}}{{c8-2=-12}}{{effects2=&emsp;&ast; Players with the SPELLJAMMER boxed set should note that clairaudience works only within a given crystal sphere or plane.\n\n&emsp;Using clairaudience does not screen out background noise around the psionicist. If something in his own neighborhood is raising a racket, he may have trouble hearing what is happening somewhere else. Clairaudience also does not give the psionicist the ability to understand a foreign or alien language, nor does it help him interpret sounds. For example, if the psionicist hears furniture scraping across the floor, he can only guess whether it’s a chair or something else - just as if he heard it while blindfolded.\n&emsp;*Power Score*—The psionicist automatically gains clairvoyance of the area as well.\n&emsp;*20*—The psionicist is deaf for 1d12 hours.'
};
CLAIRSENTIENT['Science']['Clairvoyance'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-4',
    'context-modifier': '?{How far await is the viewing spot?|100 yards (0),0|1000 yards (-2),-2|10 miles (-4),-4|100 miles (-6),-6|1000 miles (-8),-8|10000 miles (-10),-10|interplanetary (-12),-12}',
    'initial-cost': '7',
    'maintenance-cost': '4/round',
    'range': 'unlimited',
    'prep': '0',
    'aoe': 'special',
    'prerequisites': 'none',
    'reference': 'p. 30',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist automatically gains clairaudience, too, for the duration of the clairvoyant vision.',
    '20': 'The psionicist is blind for [[1d4]] hours.',
    '1': '',
    'effect': 'Clairvoyance allows the user to see images from a distant area. The psionicist picks a viewing spot anywhere within range. He can then see anything that he could normally see if he were standing in that spot. His field of vision is no wider than usual, but he can scan the area by turning his head.\n&emsp;Clairvoyance does not replace the character’s normal eyesight. The psionicist can still “see” what is actually before him, but the distant scene is superimposed. For this reason, most clairvoyants close their eyes to avoid the confusion of images.\n&emsp;The more distant the viewed area is, the more difficult it is to use clairvoyance. The table below shows how the range to a viewed area can diminish the psionicist’s power score.}}{{style=center2}}{{cc1-1=bottom}}{{c1-1=**Range**}}{{c2-1=100 yards}}{{c3-1=1,000 yards}}{{c4-1=10 miles}}{{c5-1=100 miles}}{{c6-1=1,000 miles}}{{c7-1=10,000 miles}}{{c8-1=interplanetary&ast;}}{{c1-2=**Power Score Modifier**}}{{c2-2=0}}{{c3-2=-2}}{{c4-2=-4}} {{c5-2=-6}}{{c6-2=-8}} {{c7-2=-10}} {{c8-2=-12}}{{effects2=&emsp;&ast; Players with the SPELLJAMMER boxed set should note that clairvoyance works only within a given crystal sphere or plane.\n\n&emsp;Clairvoyance does nothing to enhance the character’s vision. Unless some other power or magic is at work, he still cannot see objects that are invisible, hidden in shadow, or behind other objects. This power also provides no sound, so the character actually sees a kind of silent movie (without subtitles, of course).\n&emsp;Once the viewing spot is chosen, it is fixed in space. To enjoy the view\n&emsp;from another location, the psionicist must use this power another time, and make a new power check.\n&emsp;The psionicist’s clairvoyant presence is undetectable by normal means. It cannot be dispelled, repelled, or kept away by any form of magic.\n&emsp;*Power Score*—The psionicist automatically gains clairaudience, too, for the duration of the clairvoyant vision.\n&emsp;*20*—The psionicist is blind for 1d4 hours.'
};
CLAIRSENTIENT['Science']['Object Reading'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-5',
    'context-modifier': '',
    'initial-cost': '16',
    'maintenance-cost': 'na',
    'range': '0',
    'prep': '1',
    'aoe': 'touch',
    'prerequisites': 'none',
    'reference': 'p. 31',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist automatically learns all information on the table above.',
    '20': 'The psionicist becomes obsessed with the object; he strives to keep it until he can attempt to read it again.',
    '1': '',
    'effect': 'Object reading is the ability to detect psychic impressions left on an object by its previous owner, including his race, sex, age, and alignment. The power can also reveal how the owner came to possess the item, as well as how he lost it. The amount of information gained depends on the result of the power check. If the psionicist’s power check is successful, he learns the information listed beside that result in the table below, plus all the information listed above it.}}{{style=center1 sheet-spell-bottom2}}{{c1-1=**Power Check Result**}}{{c2-1=1—2}}{{c3-1=3}}{{c4-1=4}}{{c5-1=5}}{{c6-1=6—7}}{{c7-1=8+}}{{c1-2=**Information Gained**}}{{c2-2=Last owner’s race}}{{c3-2=Last owner’s sex}}{{c4-2=Last owner’s age}}{{c5-2=Last owner’s alignment}}{{c6-2=How last owner gained and lost item}}{{c7-2=All this information about all owners}}{{effects2=&emsp;An object can be read only once per experience level of the psionicist; additional readings at that level reveal no additional information. When the clairvoyant gains a new experience level, he can try reading the same object again, even if his object reading score has not changed.\n&emsp;*Power Score*—The psionicist automatically learns all information on the table above.\n&emsp;*20*—The psionicist becomes obsessed with the object; he strives to keep it until he can attempt to read it again.'
};
CLAIRSENTIENT['Science']['Precognition'] = {
    'roll-override': 'Secret by DM',
    'attribute': '@{Wisdom}',
    'modifier': '-5',
    'context-modifier': '',
    'initial-cost': '24',
    'maintenance-cost': 'na',
    'range': '0',
    'prep': '5',
    'aoe': 'na',
    'prerequisites': 'none',
    'reference': 'p. 31',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist’s player may reroll three die rolls to maintain the precognition’s validity.',
    '20': 'See above. (Not an optional result.)',
    '1': '',
    'effect': 'Precognition enables the psionicist to foresee the probable outcome of a course of action. This foresight is limited to the near future—no more than several hours from the time he uses the power. Furthermore, the character must describe the intended course of action in some detail in order to establish the course of events.\n&emsp;The DM makes the power check secretly. If the check fails, the character gains no information. If the roll is 20 exactly, the character sees himself meeting his own death in a particularly nasty and grisly way and must make a saving throw vs. petrification. If the character fails the save, he is so completely shaken up by the vision that all his psionic power scores are reduced by three for 1d6 hours.\n&emsp;If the power check succeeds, the character sees the most likely outcome of the actions described. The DM has some liberty in describing the scene and should use the d20 roll as a guide to how much detail to include. High rolls get more detail.\n&emsp;Even when it’s successful, precognition offers no guarantees. The psionicist sees only one possible (albeit likely) outcome to a specific course of action. If the characters involved deviate from the actions the psionicist describes, then they are changing the conditions and the lines of time, thereby making other outcomes more likely. Die rolls (particularly for surprise, initiative, and normal combat) also play a large part in a precognition’s inaccuracy. The DM cannot be expected to engineer die rolls to the players’ advantage, and even events with 95% certainty fail to occur 5% of the time. Anyone who relies on precognition to the exclusion of caution and common sense is asking for trouble.\n&emsp;Precognition is tiring. Regardless of the outcome, a psionicist who has used this power must rest for at least one turn before he can use any other clairsentient powers (the use of other disciplines is not affected).\n&emsp;*Power Score*—The psionicist’s player may reroll three die rolls to maintain the precognition’s validity.\n&emsp;*20*—See above. (Not an optional result.)'
};
CLAIRSENTIENT['Science']['Sensitivity to Psychic Impressions'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-4',
    'context-modifier': '',
    'initial-cost': '12',
    'maintenance-cost': '2/round',
    'range': '0',
    'prep': '2',
    'aoe': '20-yard radius',
    'prerequisites': 'none',
    'reference': 'p. 32',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The character gains an unusually clear understanding of each event.',
    '20': 'An angry ghost comes forward and attempts to use magic jar against the psionicist.',
    '1': '',
    'effect': 'With this power, a psionicist gains a sense of history. He perceives the residue of powerful emotions which were experienced in a given area. These impressions offer him a picture of the location’s past.\n&emsp;Battles and betrayals, marriages and murders, childbirth and great pain - only events which elicited strong emotional or psychic energy leave their impression on an area. Everyday occurrences leave no residue for the psionicist to detect.\n&emsp;To determine how far into the past a psionicist can delve, divide the result of his power check by two and round up. This is the number of strong events which he can sense. Only one event can be noted per round, however, beginning with the most recent and proceeding backward through time.\n&emsp;The character’s understanding of these events is vague and shadowy, as if he were viewing a dream. The dominant emotion involved—anger, hate, fear, love, etc.— comes through very clearly.\n&emsp;*Power Score*—The character gains an unusually clear understanding of each event.\n&emsp;*20*—An angry ghost comes forward and attempts to use magic jar against the psionicist.'
};
CLAIRSENTIENT['Devotion']['All-Round Vision'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '6',
    'maintenance-cost': '4/round',
    'range': '0',
    'prep': '0',
    'aoe': 'personal',
    'prerequisites': 'none',
    'reference': 'p. 33',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'Infravision is also gained.',
    '20': 'The psionicist is blind for [[1d4]] hours.',
    '1': '',
    'effect': 'This power gives the psionicist “eyes in the back of his head”—and in the sides and top, as well. (Of course, this is figurative; he does not literally\n&emsp;sprout eyeballs.) In effect, the character can see in all directions simultaneously. Besides its obvious application when combined with the clairvoyance power, all—round vision prevents anyone from sneaking up on the character without some sort of concealment. On the down side, the psionicist suffers a —4 penalty against all gaze attacks while using this power.\n&emsp;*Power Score*—Infravision is also gained.\n&emsp;*20*—The psionicist is blind for 1d4 hours.'
};
CLAIRSENTIENT['Devotion']['Combat Mind'] = {
    'attribute': '@{Intelligence}',
    'modifier': '-4',
    'context-modifier': '',
    'initial-cost': '5',
    'maintenance-cost': '4/round',
    'range': '0',
    'prep': '0',
    'aoe': 'personal',
    'prerequisites': 'none',
    'reference': 'p. 33',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist (but not his companions) also gains a +1 AC bonus.',
    '20': 'The psionicist and his companions suffer a +1 initiative penalty.',
    '1': '',
    'effect': 'A character using thispower has an unusually keen understanding of his enemies and their fighting tactics. As a result, the psionicist’s side in combat gains a -1 bonus when making initiative die rolls. This is cumulative with any other modifiers which may apply.\n&emsp;*Power Score*—The psionicist (but not his companions) also gains a +1 AC bonus.\n&emsp;*20*—The psionicist and his companions suffer a +1 initiative penalty.'
};
CLAIRSENTIENT['Devotion']['Danger Sense'] = {
    'roll-override': 'Secret by DM',
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '4',
    'maintenance-cost': '3/turn',
    'range': 'special',
    'prep': '0',
    'aoe': '10 yards',
    'prerequisites': 'none',
    'reference': 'p. 33',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist learns how far away the danger is.',
    '20': 'The psionicist cannot sense danger successfully for [[1d6]] hours.',
    '1': '',
    'effect': 'When using danger sense, a psionicist will experience a slight tingling\n&emsp;sensation at the back of his neck when a hazard or threat is near. The DM must make a successful power check on the psionicist’s behalf before the character detects the danger. This power does not give the psionicist any specific information about the type of danger. He does not learn how or when it will strike. However, he does learn the general direction of the threat (i.e., to the right, left, ahead, or behind).\n&emsp;The character’s power check results determine how much warning he gets. If the roll is 12 or more, he knows whether danger is lurking anywhere in the immediate area. If the roll is—8 or more, he enjoys a full round of warning before that danger strikes. If the roll is 7 or less, however, the psionicist isn’t alerted until moments before danger strikes. If the roll is 1 exactly, he still has several moments’ warning but the direction is off; e.g., if the attack, is coming from the left, he thinks it is coming from ahead, behind, or the right (DM’s option).\n&emsp;If the psionicist and his companions have enough warning, they can do something to prepare—getting into defensive positions, preparing spells, or running away, for example. If they have less than one round of warning, the DM must decide how much preparation is possible. In any case, they always gain a +2 bonus on their own surprise rolls.\n&emsp;*Power Score*—The psionicist learns how far away the danger is.\n&emsp;*20*—The psionicist cannot sense danger successfully for 1d6 hours.'
};
CLAIRSENTIENT['Devotion']['Feel Light'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '7',
    'maintenance-cost': '5/round',
    'range': '0',
    'prep': '0',
    'aoe': 'special',
    'prerequisites': 'none',
    'reference': 'p. 34',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The character can feel light in all directions.',
    '20': 'The psionicist becomes overly sensitive to light for [[1d10]] rounds. Exposure to light causes 1 point of damage per round, and the character cannot see.',
    '1': '',
    'effect': 'This extrasensory power allows the psionicist to experience light through tactile sensations (by touch). His entire body becomes a receiver for light waves. In effect, his body replaces his eyes; he can see what his eyes would normally reveal. (His field of vision does not change.) This power does not allow him to see in the dark, since there must be light for him to feel. Nor does it counter magical darkness, which actually destroys or blocks light waves. The character gains a +4 bonus when saving against gaze attacks.\n&emsp;*Power Score*—The character can feel light in all directions.\n&emsp;*20*—The psionicist becomes overly sensitive to light for 1d10 rounds. Exposure to light causes 1 point of damage per round, and the character cannot see.'
};
CLAIRSENTIENT['Devotion']['Feel Sound'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '5',
    'maintenance-cost': '3/round',
    'range': '0',
    'prep': '0',
    'aoe': 'special',
    'prerequisites': 'none',
    'reference': 'p. 34',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist can detect noise like a thief of the same experience level.',
    '20': 'For [[1d4]] rounds, any sound causes 1 point of damage per round and is garbled.',
    '1': '',
    'effect': 'This power is almost identical to feeling light, but it makes the psionicist’s body sensitive to sound. It allows him to continue hearing when his ears are disabled. This power does not detect sound where there is none, however, nor is it effective inside magical silence. The psionicist gains a +2 bonus against sonic attacks or effects, including a siren’s song.\n&emsp;*Power Score*—The psionicist can detect noise like a thief of the same experience level.\n&emsp;*20*—For 1d4 rounds, any sound causes 1 point of damage per round and is garbled.'
};
CLAIRSENTIENT['Devotion']['Hear Light'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '6',
    'maintenance-cost': '3/round',
    'range': '0',
    'prep': '0',
    'aoe': 'special',
    'prerequisites': 'none',
    'reference': 'p. 34',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist can “hear” in the dark, as if he had infravision.',
    '20': 'Bright light causes deafness, and all other light is just a buzz.',
    '1': '',
    'effect': 'This extrasensory power resembles “feel light,” but it relies on the character’s hearing rather than his sense of touch. A character who has been blinded, either artificially, naturally, or by an injury, can “see” with his ears. Any light waves which reach him are converted to sound, and he “hears” the image. The image his mind perceives is just like an image offered by normal sight, and the character suffers no penalties for anything requiring vision.\n&emsp;*Power Score*—The psionicist can “hear” in the dark, as if he had infravision.\n&emsp;*20*—Bright light causes deafness, and all other light is just a buzz.'
};
CLAIRSENTIENT['Devotion']['Know Direction'] = {
    'attribute': '@{Intelligence}',
    'modifier': '0',
    'context-modifier': '',
    'initial-cost': '1',
    'maintenance-cost': 'na',
    'range': '0',
    'prep': '0',
    'aoe': 'personal',
    'prerequisites': 'none',
    'reference': 'p. 36',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The power is automatically maintained for one day.',
    '20': 'The psionicist is disoriented; he cannot use this power again for [[1d6]]',
    '1': '',
    'effect': 'The psionicist becomes his own compass. By paying 1 PSP and making a\n&emsp;successful power check, he knows which way is north.\n&emsp;hours.\n&emsp;*Power Score*—The power is automatically maintained for one day.\n&emsp;*20*—The psionicist is disoriented; he cannot use this power again for 1d6'
};
CLAIRSENTIENT['Devotion']['Know Location'] = {
    'attribute': '@{Intelligence}',
    'modifier': '0',
    'context-modifier': '',
    'initial-cost': '10',
    'maintenance-cost': 'na',
    'range': '0',
    'prep': '5',
    'aoe': 'personal',
    'prerequisites': 'none',
    'reference': 'p. 35',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist learns the exact location he’s trying to determine.',
    '20': 'Nothing within 100 miles can be located with this power for 24 hours.',
    '1': '',
    'effect': 'This power is useful to characters who frequently travel by using teleportation, gates, or via other planes of existence. When it works, the power reveals general information about the character’s location. The information is usually no more detailed than the response of a simple farmer when asked, “Where am I?” Typical answers include “a few miles southwest of Waterdeep... as the crow flies,” “in the house of Kilgore the taxidermist,” or “adrift on the Blood Sea.”\n&emsp;The higher the result of the power check, the more precise the location will be. If the die roll is 8 or more, the location is specified within a mile or less. If the roll is 7 or less, the location is specified within 10 miles.\n&emsp;The character can get additional information that is *less* specific than the initial answer if his player asks for it (the psionicist does not make another power check). For example, if the DMS first response is “you’re in the house of Kilgore the Taxidermist,” the player might then ask where the house is. The DM might answer by saying Kilgore’s house is in Chendl, in the Kingdom of Furyondy.\n&emsp;*Power Score*—The psionicist learns the exact location he’s trying to determine.\n&emsp;*20*—Nothing within 100 miles can be located with this power for 24 hours.'
};
CLAIRSENTIENT['Devotion']['Poison Sense'] = {
    'attribute': '@{Wisdom}',
    'modifier': '0',
    'context-modifier': '',
    'initial-cost': '1',
    'maintenance-cost': 'na',
    'range': '0',
    'prep': '0',
    'aoe': '1-yard radius',
    'prerequisites': 'none',
    'reference': 'p. 36',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist determines the exact type of poison.',
    '20': 'If poison exists, the sense of it mentally overwhelms the psionicist. The effects match those of actual exposure to the poison.',
    '1': '',
    'effect': 'This power enables a psionicist to detect the presence of poison and identify its location within 1 yard of his body (or his presence, if he is using clairvoyance or traveling astrally). The type of poison is not revealed, only its presence. Any poison, including animal venom, can be detected.\n&emsp;*Power Score*—The psionicist determines the exact type of poison.\n&emsp;*20*—If poison exists, the sense of it mentally overwhelms the psionicist. The effects match those of actual exposure to the poison.'
};
CLAIRSENTIENT['Devotion']['Radial Navigation'] = {
    'attribute': '@{Intelligence}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '4',
    'maintenance-cost': '7/hour',
    'range': '0',
    'prep': '0',
    'aoe': 'personal',
    'prerequisites': 'none',
    'reference': 'p. 36',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist can automatically retrace his steps to the starting point.',
    '20': 'The psionicist forgets where he is for [[1d4]] rounds.',
    '1': '',
    'effect': 'As long as this power is in use, the psionicist knows where he is in relation to a fixed starting point. In other words, no matter how or where he moves, he still knows the exact direction and distance to his starting point.\n&emsp;He cannot necessarily tell someone how to get back to that starting point, however. If he is in a maze or dungeon, for example, he may know the starting point is 500 yards north, but he cannot retrace his steps through the maze automatically. Radial navigation does enhance his ability to do so, however. Every time the character comes to a decision point—e.g., “should I turn right or left?”—the DM makes a power check for him. If the check succeeds, the character knows which way he came. If the roll fails, he isn’t sure. (He can still maintain the power normally, however.)\n&emsp;Radial navigation can be helpful in several ways that are not obvious. For example, teleportation and other extraordinary means of travel become simpler. Let’s say a character cannot see a particular location because he’s blindfolded. He leaves that location, but uses radial navigation to get a fix on it. That means he can still teleport back there. Furthermore, if the character has a fix on a place, he can reach it through the astral plane in just seven hours, the minimum possible (assuming of course that he can travel through the astral plane). And he can reach the same location by dimension walking (see the psychoportation discipline) with no chance of getting lost. Radial navigation can aid in telepathy, too. If the psionicist wants to make telepathic contact, and he has a fix on the target’s location, he doesn’t suffer the usual penalties for range.\n&emsp;If the character stops maintaining this power, he loses his fix on the location. He can get it back by resuming this power and making a successful power check within six hours. After six hours, the location is lost. Only one location can be fixed at a time unless the character pays the maintenance cost individually for each.\n&emsp;*Power Score*—The psionicist can automatically retrace his steps to the starting point.\n&emsp;*20*—The psionicist forgets where he is for 1d4 rounds.'
};
CLAIRSENTIENT['Devotion']['See Sound'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '6',
    'maintenance-cost': '3/round',
    'range': 'special',
    'prep': '0',
    'aoe': 'personal',
    'prerequisites': 'none',
    'reference': 'p. 37',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist can maintain this power for 1 PSP per round.',
    '20': 'Loud sounds cause “blindness”, and all other sounds are as disturbing as bright lights.',
    '1': '',
    'effect': 'This power enables a character to perceive sound waves visually—with his eyes—by converting the sound waves to light impulses (it works in much the same way as feel light). Only a character who can see normally can use this power. The psionicist can see sound even in darkness, because sound waves do not require light. The character can still be “blinded” by silence, however.\n&emsp;*Power Score*—The psionicist can maintain this power for 1 PSP per round.\n&emsp;*20*—Loud sounds cause “blindness”, and all other sounds are as disturbing as bright lights.'
};
CLAIRSENTIENT['Devotion']['Spirit Sense'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': 'na',
    'maintenance-cost': '0',
    'range': '0',
    'prep': '15-yard radius',
    'aoe': 'none',
    'prerequisites': '',
    'reference': 'p. 37',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist knows the exact location of the spirits he senses.',
    '20': 'The psionicist has aggravated the spirits (DM determines exact result).',
    '1': '',
    'effect': 'Using this power allows the psionicist to sense the presence of “spirits” within 15 yards—meaning ghosts, banshees, wraiths, haunts, heucuvas, and revenants. If a spirit frequently haunts the location at hand, the psionicist will know it. He will also know when a spirit is within 15 yards, but he won’t be able to pinpoint its location.\n&emsp;*Power Score*—The psionicist knows the exact location of the spirits he senses.\n&emsp;*20*—The psionicist has aggravated the spirits (DM determines exact result).'
};

const TELEPATHIC = {Devotion: {}, Science: {}};
const PSYCHOKINETIC = {Devotion: {}, Science: {}};
const PSYCHOPORTIVE = {Devotion: {}, Science: {}};
const PSYCHOMETABOLIC = {Devotion: {}, Science: {}};
const METAPSIONIC = {Devotion: {}, Science: {}};
const ATTACK = {Devotion: {}, Science: {}};
const DEFENSE = {Devotion: {}, Science: {}};

const PSIONIC_POWERS = {};
PSIONIC_POWERS['Clairsentient'] = CLAIRSENTIENT;
PSIONIC_POWERS['Telepathic'] = TELEPATHIC;
PSIONIC_POWERS['Psychokinetic'] = PSYCHOKINETIC;
PSIONIC_POWERS['Psychoportive'] = PSYCHOPORTIVE;
PSIONIC_POWERS['Psychometabolic'] = PSYCHOMETABOLIC;
PSIONIC_POWERS['Metapsionic'] = METAPSIONIC;
PSIONIC_POWERS['Attack'] = ATTACK;
PSIONIC_POWERS['Defense'] = DEFENSE;
module.exports = PSIONIC_POWERS;