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
    'effect': 'Object reading is the ability to detect psychic impressions left on an object by its previous owner, including his race, sex, age, and alignment. The power can also reveal how the owner came to possess the item, as well as how he lost it. The amount of information gained depends on the result of the power check. If the psionicist’s power check is successful, he learns the information listed beside that result in the table below, plus all the information listed above it.}}{{style=center1 sheet-spell-bottom2}}{{c1-1=**Power Check**\n**Result**}}{{c2-1=1—2}}{{c3-1=3}}{{c4-1=4}}{{c5-1=5}}{{c6-1=6—7}}{{c7-1=8+}}{{c1-2=**Information Gained**}}{{c2-2=Last owner’s race}}{{c3-2=Last owner’s sex}}{{c4-2=Last owner’s age}}{{c5-2=Last owner’s alignment}}{{c6-2=How last owner gained and lost item}}{{c7-2=All this information about all owners}}{{effects2=&emsp;An object can be read only once per experience level of the psionicist; additional readings at that level reveal no additional information. When the clairvoyant gains a new experience level, he can try reading the same object again, even if his object reading score has not changed.\n&emsp;*Power Score*—The psionicist automatically learns all information on the table above.\n&emsp;*20*—The psionicist becomes obsessed with the object; he strives to keep it until he can attempt to read it again.'
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

const PSYCHOKINETIC = {Devotion: {}, Science: {}};
PSYCHOKINETIC['Science']['Create Object'] = {
    'attribute': '@{Intelligence}',
    'modifier': '-4',
    'context-modifier': '',
    'initial-cost': '16',
    'maintenance-cost': '3/round',
    'range': '20 yards',
    'prep': '0',
    'aoe': 'special',
    'prerequisites': 'telekinesis',
    'reference': 'p. 38',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The object is permanent. No cost is expended to maintain it.',
    '20': 'The power backfires, and a personal belonging (chosen randomly) disintegrates.',
    '1': 'The item contains a flaw—e.g., a sword breaks when struck, a diamond contains impurities obvious to a jeweler, and so on.',
    'effect': 'A psionicist with this power can assemble matter from air and the surrounding area to create a solid object. This object remains in existence as long as the psionicist pays the power’s maintenance cost. When he stops maintaining it, the object breaks into its constituent parts.\n&emsp;An object created this way can have any shape, color, and texture the psionicist desires, provided it fulfills at least one of the following conditions:\n&emsp;Fits entirely within a sphere no more than 4 feet in diameter.}}{{style=min1}}{{c1-1=•}}{{c2-1=•}}{{c3-1=•}}{{c1-2=Fits entirely within a cylinder no more than 20 feet long and 1 foot in diameter.}}{{c2-2=Fits entirely within a cylinder no more than 2 feet high and 6 feet in diameter.}}{{c3-2=Weighs no more than 10 pounds.}}{{effects2=&emsp;Only available materials within 20 yards of the psionicist can be used in the construction. However, these materials can be rearranged or restructured if the psionicist also has the power of molecular rearrangement. By combining these two powers, he could manufacture diamonds from coal dust or a sword from rocks containing iron ore.\n&emsp;If the power check result is a 1, the item contains a flaw—e.g., a sword breaks when struck, a diamond contains impurities obvious to a jeweler, and so on.\n&emsp;*Power Score*—The object is permanent. No cost is expended to maintain it.\n&emsp;*20*—The power backfires, and a personal belonging (chosen randomly) disintegrates.'
};
PSYCHOKINETIC['Science']['Detonate'] = {
    'attribute': '@{Constitution}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '18',
    'maintenance-cost': 'na',
    'range': '60 yards',
    'prep': '0',
    'aoe': 'one item, 8 cubic feet',
    'prerequisites': 'telekinesis, molecular agitation',
    'reference': 'p. 38',
    'book': 'The Complete Psionics Handbook',
    'damage': '1d10',
    'damage-type': '',
    'healing': '',
    'power-score': 'Damage and range double, to 2d10 points and 20 feet, respectively.',
    '20': 'The air surrounding the initiator detonates; everyone within 10 feet of him is attacked.',
    '1': '',
    'effect': 'Some psionicists can make a bush self—destruct, or cause a zombie to\n&emsp;explode. With the detonate power, latent energy inside plants or inanimate objects can be harnessed, focused, and released explosively. The power even works against animated undead (skeletons and zombies). It does not affect noncorporeal undead, such as ghosts, because they aren’t material. Furthermore, the science has no effect on animals of any sort, including intelligent creatures such as humans, or undead with free will.\n&emsp;The detonation inflicts 1d10 points of damage upon all vulnerable objects which the psionicist chooses to attack, within 10 feet. A saving throw vs.\n&emsp;breath weapon reduces damage to half. To determine what percentage of the object was destroyed, multiply the result of the psionicist’s power check by 10. If the product is 100 or more—i.e., 100% or more—the target has been completely destroyed. Anything less means a few significant chunks remain.\n&emsp;No more than 8 cubic feet of material can be destroyed with this power. A portion of a wall can be blown out, for example, but if the wall is 10 inches thick, an opening about 3 feet square will appear.\n&emsp;*Power Score*—Damage and range double, to 2d10 points and 20 feet, respectively.\n&emsp;*20*—The air surrounding the initiator detonates; everyone within 10 feet of him is attacked.'
};
PSYCHOKINETIC['Science']['Disintegrate'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-4',
    'context-modifier': '',
    'initial-cost': '40',
    'maintenance-cost': 'na',
    'range': '50 yards',
    'prep': '0',
    'aoe': 'one item, 8 cubic feet',
    'prerequisites': 'telekinesis, soften',
    'reference': 'p. 40',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The power affects 16 cubic feet and saves are made with a -5 penalty.',
    '20': 'The power backfires and it affects the initiator (save with +5 bonus).',
    '1': '',
    'effect': 'The disintegrate science reduces an item or creature to microscopic pieces\n&emsp;and scatters them. Anything is vulnerable unless it is protected by magical shielding such as a minor or regular *globe of invulnerability* or by an inertial barrier. The psionicist chooses his target, but he can disintegrate no more than 8 cubic feet of material with one use of this power.\n&emsp;If the target is an inanimate object, it must save vs. disintegration; success means it is unaffected. If the target is a living creature, character, or an undead creature with free will, it must make a saving throw vs. death magic. If it succeeds, the creature feels only a slight tingle, but is otherwise unaffected. If the save fails, the creature is disintegrated (or 8 cubic feet right out of its center, which should be enough to kill most anything).\n&emsp;*Power Score*—The power affects 16 cubic feet and saves are made with a -5 penalty.\n&emsp;*20*—The power backfires and it affects the initiator (save with +5 bonus).'
};
PSYCHOKINETIC['Science']['Molecular Rearrangement'] = {
    'attribute': '@{Intelligence}',
    'modifier': '-5',
    'context-modifier': '',
    'initial-cost': '20',
    'maintenance-cost': '10 per hour',
    'range': '2 yards',
    'prep': '2 hours',
    'aoe': 'one item',
    'prerequisites': 'telekinesis, molecular manipulation',
    'reference': 'p. 40',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The new material is extraordinary (DM’s arbitration).',
    '20': 'The item is seriously flawed and utterly useless.',
    '1': 'The item seems perfect but contains a hidden flaw which will cause it to break, or fail, or simply look wrong when it is put to use (the ruby goblet might leak, for example, or the sword might contain a soft portion which causes it to bend).',
    'effect': 'Molecular rearrangement is the psionic equivalent of alchemy. By toying with an object’s molecular structure, the psionicist can change its fundamental nature or properties. This power cannot create matter or mass from nothing, however. Nor can it change a material’s state from liquid to solid, gas to liquid, and so on. It is best suited to converting one sort of element into another, but it can also be used for more complex operations—neutralizing a poison, for example.\n&emsp;Converting one element to another is usually a simple operation, in which one ounce of material can be changed each hour. Typical conversions of this type include steel to lead, or any metal to gold. More complex rearrangement, like changing a metal to glass or changing a wooden goblet to a ruby goblet, takes four times longer.\n&emsp;The creation of gold coins from other metals is possible, but it’s no way to get rich quick. At the rate of one ounce per hour, it would take 16 hours—about two work days—to change 10 copper pieces into 10 gold pieces, for a net profit of 9 gold pieces.\n&emsp;Molecular rearrangement is often used to create superior weapons. A psionically tempered weapon may receive a +1 on damage rolls (see “Weapon Quality” in Chapter 6 of the *DMG*). The process is time-consuming, however. For example, a typical short sword takes at least 40 hours to temper psionically. (The average short sword weighs 3 pounds, or 48 ounces, most of which is the blade.) A psionically tempered weapon does *not* automatically offer a +1 attack-roll bonus. In order to receive that bonus, the psionicist must 1) have the weaponsmithing proficiency and 2) make a successful proficiency check when he fashions the weapon.\n&emsp;The psionicist makes his power check when the process is complete. If it fails, he did not waste all his effort. The difference between the character’s die roll and his power score, multiplied by 10, equals the percentage of work which must be redone.\n&emsp;If the roll is 1, the item seems perfect but contains a hidden flaw which will cause it to break, or fail, or simply look wrong when it is put to use (the ruby goblet might leak, for example, or the sword might contain a soft portion which causes it to bend).\n&emsp;This power has no effect against living creatures weighing more than one ounce. Creatures weighing one ounce or less are killed if their molecules are rearranged.\n&emsp;*Power Score*—The new material is extraordinary (DM’s arbitration).\n&emsp;*20*—The item is seriously flawed and utterly useless.'
};
PSYCHOKINETIC['Science']['Project Force'] = {
    'attribute': '@{Constitution}',
    'modifier': '-2',
    'context-modifier': '',
    'initial-cost': '10',
    'maintenance-cost': 'na',
    'range': '200 yards',
    'prep': '0',
    'aoe': 'na',
    'prerequisites': 'telekinesis',
    'reference': 'p. 41',
    'book': 'The Complete Psionics Handbook',
    'damage': '1d6 + targets armor class',
    'damage-type': '',
    'healing': '',
    'power-score': 'The blow also knocks down the target if it is roughly man- sized or smaller.',
    '20': 'The blow strikes the initiator.',
    '1': '',
    'effect': 'Some psionicists can push, shove, and otherwise bully an opponent from afar.\n&emsp;Project force allows the psionicist to focus a psychokinetic “punch” against a target up to 200 yards away.\n&emsp;If used offensively, this punch causes damage equal to 1d6 points plus the target’s armor class (negative armor classes reduce the damage). For example, a target with armor class 5 would suffer 6 to 11 points of damage (1 to 6 points, plus 5). A successful save vs. breath weapon reduces the damage by half.\n&emsp;This rather unsubtle blow can also be used to trigger traps, throw levers, open doors (if they aren’t locked or latched), break windows, and the like.\n&emsp;*Power Score*—The blow also knocks down the target if it is roughly man-sized or smaller.\n&emsp;*20*—The blow strikes the initiator.'
};

PSYCHOKINETIC['Science']['Telekinesis'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'context-modifier': '-1*floor(?{Object’s weight in pounds|0}/3)',
    'initial-cost': '[[{3,?{Object’s weight in pounds|0}}kh1]]',
    'maintenance-cost': '[[{1,floor(?{Object’s weight in pounds|0}/2)}kh1]]/round',
    'range': '30 yards',
    'prep': '0',
    'aoe': 'single item',
    'prerequisites': 'none',
    'reference': 'p. 41',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The character can lift a second item of equal or lesser weight simultaneously for the same cost.',
    '20': 'The psionicist “fumbles” the item, knocking it over, etc.',
    '1': '',
    'effect': 'Telekinesis, or “TK” for short, is the ability to move objects through space without touching them. All telekinetic efforts tend to be physically taxing, because they involve real work. Moving small, light objects is relatively easy. As the objects become more massive, the task becomes significantly more difficult.\n&emsp;The costs above (3 PSPs initially and 1 per round of maintenance) assume that the object being moved weighs 3 pounds or less. For heavier objects, these rules apply:}}{{style=min1}}{{c1-1=•}}{{c2-1=•}}{{c3-1=•}}{{c1-2=The initial cost equals the object’s weight in pounds.}}{{c2-2=The maintenance cost is half the initial cost, rounded down.}}{{c3-2=The character’s power score is decreased by one—third of the object’s weight in pounds, rounded down.}}{{effects2=&emsp;For example, to telekinetically snatch a 15-pound battle axe from a rack, a psionicist must pay 15 PSPs and make a power check with a -5 modifier to his score.\n&emsp;A psionicist using TK can move an object up to 60 feet per round. The object can serve as a weapon. In this case, the character attacks using his own THACO score, with a penalty equaling the objects weight modifier (one—third its weight, rounded down).\n&emsp;*Power Score*—The character can lift a second item of equal or lesser weight simultaneously for the same cost.\n&emsp;*20*—The psionicist “fumbles” the item, knocking it over, etc.'
};
PSYCHOKINETIC['Devotion']['Animate Object'] = {
    'attribute': '@{Intelligence}',
    'modifier': '-3',
    'context-modifier': '?{Material animated?|Cloth / paper (0),0|Live wood / dead animal (-1),-1|Dead wood (-2),-2|Water (-3),-3|Thin metal (-4),-4|Thick metal (-5),-5|Stone (-6),-6}',
    'initial-cost': '8',
    'maintenance-cost': '3/round',
    'range': '50 yards',
    'prep': '0',
    'aoe': '1 object, 100 lbs.',
    'prerequisites': 'telekinesis',
    'reference': 'p. 42',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'Animation is smooth and lifelike.',
    '20': 'No additional effect.',
    '1': '',
    'effect': 'Inanimate objects can be “brought to life” with this devotion. The objects\n&emsp;are not actually alive, but they move under the psionicist’s control as if they were. For example, chairs may walk, trees may dance, and stones may waddle around.\n&emsp;The object being animated must weigh 100 pounds or less. The material being animated affects the difficulty of the task; stronger or more brittle materials are harder to animate than weak or floppy materials. Once animated, however, all materials become flexible to some extent.}}{{style=center2 sheet-spell-bottom2}}{{cc1-1=bottom}}{{c1-1=**Material**}}{{c2-1=Cloth, paper}}{{c3-1=Live wood, dead animal}} {{c4-1=Dead wood}}{{c5-1=Water}}{{c6-1=Thin metal}}{{c7-1=Thick metal}}{{c8-1=Stone}}{{c1-2=**Ability Score**\n**Modifier**}}{{c2-2=0}}{{c3-2=-1}}{{c4-2=-2}}{{c5-2=-3}}{{c6-2=-4}}{{c7-2=-5}}{{c8-2=-6}}{{effects2=&emsp;Fluid motion is not common. The animated item moves more like a puppet. Its movements are jerky and clumsy, and if the item was rigid to begin with, it makes a loud creaking, groaning, or grating sound. It can move 60 feet per round (movement rate 6), in any direction chosen by the psionicist. It can attack as a club with a THAC0 of 20.\n&emsp;*Power Score*—Animation is smooth and lifelike.\n&emsp;*20*—No additional effect.'
};
PSYCHOKINETIC['Devotion']['Animate Shadow'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '7',
    'maintenance-cost': '3/round',
    'range': '40 yards',
    'prep': '0',
    'aoe': '100 square feet',
    'prerequisites': 'none',
    'reference': 'p. 42',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The range increases to 100 yards.',
    '20': 'The shadow disappears completely for one round.',
    '1': '',
    'effect': 'With this devotion the psionicist can animate the shadow cast by anyone or anything and make it seem to have life of its own. The shadow can even move away from the person or thing that cast it. It must, however, remain flatly cast along a surf ace. It can never be more than two-dimensional.\n&emsp;An animated shadow can’t really do anything other than startle or amuse someone. It cannot attack or disrupt a mage’s concentration. In this regard, it is similar to a *cantrip’s* effect. It can serve as a diversion by entertaining someone or attracting a guard’s attention.\n&emsp;*Power Score*—The range increases to 100 yards.\n&emsp;*20*—The shadow disappears completely for one round.'
};
PSYCHOKINETIC['Devotion']['Ballistic Attack'] = {
    'attribute': '@{Constitution}',
    'modifier': '-2',
    'context-modifier': '',
    'initial-cost': '5',
    'maintenance-cost': 'na',
    'range': '30 yards',
    'prep': '0',
    'aoe': '1 item, 1 lb',
    'prerequisites': 'telekinesis',
    'reference': 'p. 42',
    'book': 'The Complete Psionics Handbook',
    'damage': '1d6',
    'damage-type': '',
    'healing': '',
    'power-score': 'Damage increases to 1d12.',
    '20': 'Ballistic boomerang. The psionicist becomes the object’s target.',
    '1': '',
    'effect': 'This power can make any psionicist a “David” when he’s facing “Goliath.”\n&emsp;It’s a special variation of the telekinesis science. Instead of moving any object relatively slowly, ballistic attack allows the character to hurl a small object at a target. The object, no more than 1 pound in weight, can achieve deadly speeds. It must be within sight of the psionicist and cannot be anchored or attached to anything else. A rock is the most common weapon.\n&emsp;The psionicist uses his regular THACO to determine whether he hits the target. If he succeeds, the missile inflicts 1d6 points of damage (assuming, of course, that the character made a successful power check in the first place).\n&emsp;*Power Score*—Damage increases to 1d12.\n&emsp;*20*—Ballistic boomerang. The psionicist becomes the object’s target.'
};
PSYCHOKINETIC['Devotion']['Control Body'] = {
    'attribute': '@{Constitution}',
    'modifier': '-2',
    'context-modifier': '',
    'initial-cost': '8',
    'maintenance-cost': '8/round',
    'range': '80 yards',
    'prep': '0',
    'aoe': 'individual',
    'prerequisites': 'telekinesis',
    'reference': 'p. 43',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist automatically wins the initial psychic contest.',
    '20': 'The psionicist suffers partial paralysis (an arm or leg) for [[1d10]] turns.',
    '1': '',
    'effect': 'This power allows psychokinetic control of another person’s body. In effect, the victim becomes a marionette. He knows that someone else is pulling his strings, though, and he’s probably mad as all get-out.\n&emsp;Before this power actually works, the psionicist must engage in a psychic contest, pitting his power score directly against the victims Strength. If the victim wins the contest, he breaks free (the psionicist still pays the power cost). In a tie, the contest continues into the next round, provided the psionicist maintains the power. The victim can’t do anything else during this contest; all his effort is focused on retaining control of his own body.\n&emsp;If the power works, the psionicist has rudimentary control over the victim’s limbs. He can make the victim stand up, sit down, walk, turn around, etc. The body can be forced to attack physically, but with a -6 penalty on attack rolls (using the victim’s own THACO). The victim can’t be forced to speak. In fact, he keeps control over his own voice and can say whatever he likes.\n&emsp;The victim must stay within the 80—yard range or the psionicist’s control is broken automatically. If the body is forced to do something obviously suicidal, like walking off a cliff or poking at a red dragon, the victim can fight another contest with the psionicist to regain control (the adrenaline rush of imminent danger gives him renewed strength).\n&emsp;*Power Score*—The psionicist automatically wins the initial psychic contest.\n&emsp;*20*—The psionicist suffers partial paralysis (an arm or leg) for 1d10 turns.'
};
PSYCHOKINETIC['Devotion']['Control Flames'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-1',
    'context-modifier': '',
    'initial-cost': '6',
    'maintenance-cost': '3/round',
    'range': '40 yards',
    'prep': '0',
    'aoe': '10 square feet',
    'prerequisites': 'telekinesis',
    'reference': 'p. 43',
    'book': 'The Complete Psionics Handbook',
    'damage': '1d6',
    'damage-type': 'Fire',
    'healing': '',
    'power-score': 'Size can increase up to 200% or decrease to 0% (the fire is extinguished).',
    '20': 'The psionicist burns himself, suffering [[1d4]] points of damage.',
    '1': '',
    'effect': 'By controlling flames, a psionicist can make a normal fire bigger, smaller,\n&emsp;hotter, or colder. He can even make it move around as if it were a living creature.\n&emsp;A fire’s size can be increased by 100% or decreased by 50%. If the fire’s heat is increased, it causes double damage. If its heat is reduced, the damage is halved. This applies to flaming torches, burning oil, and other normal fires, but not to magical fires such as *fireballs* or *burning hands*.\n&emsp;An animated fire can move up to 90 feet per round (MR 9). It can be shaped like a person or an animal, as long as it covers no more than 10 square feet of ground. If the fire moves away from its fuel, it can survive for only one more round, then dies out.\n&emsp;An animated fire can also attack by engulfing an opponent. The psionicist must make an attack roll using his regular THACO. If successful, the attack causes 1d6 points of damage.\n&emsp;*Power Score*—Size can increase up to 200% or decrease to 0% (the fire is extinguished).\n&emsp;*20*—The psionicist burns himself, suffering 1d4 points of damage.'
};
PSYCHOKINETIC['Devotion']['Control Light'] = {
    'attribute': '@{Intelligence}',
    'modifier': '0',
    'context-modifier': '',
    'initial-cost': '12',
    'maintenance-cost': '4/round',
    'range': '25 yards',
    'prep': '0',
    'aoe': '400 square feet',
    'prerequisites': 'none',
    'reference': 'p. 44',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The maintenance cost is reduced to 1 PSP per round.',
    '20': 'The effect is the opposite of what is desired, and maintenance fails.',
    '1': '',
    'effect': 'The psionicist can manipulate existing light with this devotion. He cannot create light from darkness, but he can create darkness from light. This power can accomplish the following, and anything else the DM allows:}}{{style=min1}}{{c1-1=•}}{{c2-1=•}}{{c3-1=•}}{{c4-1=•}}{{c5-1=•}}{{c6-1=•}}{{c1-2=Deepen existing shadows, making them inky black. A thief hiding in this shadow gets a 20% bonus on his ability roll.}}{{c2-2=Lighten existing shadows, reducing a thief’s hiding ability by 20%.}}{{c3-2=Brighten a light source until it hurts to look at it. This gives everyone exposed to the light a -2 penalty on attack rolls.}}{{c4-2=Dim a light source so it resembles twilight. This does not affect anyone’s attack rolls.}}{{c5-2=Extend shadows into areas that are otherwise well lit. Only an existing shadow can be extended, but its size can be increased by 200% (i.e., its size can be tripled).}}{{c6-2=Extend light into areas that are otherwise in shadow. Shadows can be reduced in size by 50%.}}{{effects2=&emsp;*Power Score*—The maintenance cost is reduced to 1 PSP per round.\n&emsp;*20*—The effect is the opposite of what is desired, and maintenance fails.'
};
PSYCHOKINETIC['Devotion']['Control Sound'] = {
    'attribute': '@{Intelligence}',
    'modifier': '-5',
    'context-modifier': '',
    'initial-cost': '5',
    'maintenance-cost': '2/round',
    'range': '100 yards',
    'prep': '0',
    'aoe': 'na',
    'prerequisites': 'none',
    'reference': 'p. 44',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The maintenance cost is reduced to 1 PSP per round.',
    '20': 'A loud boom erupts from the psionicist’s location.',
    '1': 'Something about the sound he’s altered isn’t quite right, so it arouses suspicion. If he is trying to exactly duplicate another voice, this fault occurs on a roll of 1 or 2.',
    'effect': 'This power allows the psionicist to shape and alter existing sounds. As a woman speaks, for example, the psionicist could change her words into a lion’s roar, or even into different words. Or he could disguise the sound of 20 men marching past a guard as falling rain. Sounds can also be layered—so that one singing person sounds like an entire choir, for example.\n&emsp;If the character’s power check is a 1, something about the sound he’s altered isn’t quite right, so it arouses suspicion. If he is trying to exactly duplicate another voice, this fault occurs on a roll of 1 or 2.\n&emsp;This power can also dampen a sound. The player must specify which sound the character intends to eliminate; the power has no area of effect. For example, the psionicist might quiet the sound of a hammer, muffle the words from someone’s mouth, or eliminate the creaking of a door. He could not do all three simultaneously, however.\n&emsp;*Power Score*—The maintenance cost is reduced to 1 PSP per round.\n&emsp;*20*—A loud boom erupts from the psionicist’s location.'
};
PSYCHOKINETIC['Devotion']['Control Wind'] = {
    'attribute': '@{Constitution}',
    'modifier': '-4',
    'context-modifier': '',
    'initial-cost': '16',
    'maintenance-cost': '10/round',
    'range': '500 yards',
    'prep': '2',
    'aoe': '1,000 yards',
    'prerequisites': 'telekinesis',
    'reference': 'p. 44',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist gains total direction control and can change speeds by up to 25 mph or 50%, whichever is greater.',
    '20': 'No additional effect.',
    '1': '',
    'effect': 'The psionicist can gain limited control over wind speed and direction with this devotion. The speed of any existing wind can be increased or decreased by 10 miles per hour or 25%, whichever is greater. The direction of the wind can also be changed by up to 90 degrees.\n&emsp;These changes are temporary, lasting only as long as the psionicist pays the maintenance cost. The changes occur within moments after he wills them, and die out in less than a minute when he stops maintaining them.\n&emsp;Winds above 19 miles per hour prevent anything smaller than a man or a condor from flying and impose a -4 modifier on missile fire. They also whip up waves on the sea and make sailing difficult. Winds gusting at over 32 miles per hour cause minor damage to ships and buildings. These gusts also kick up clouds of dust, and prevent all but the largest creatures from flying. Winds over 55 miles per hour prevent all flight, knock down trees and wooden buildings, and threaten to swamp ships. Winds over 73 miles per hour are hurricane gales.\n&emsp;*Power Score*—The psionicist gains total direction control and can change speeds by up to 25 mph or 50%, whichever is greater.\n&emsp;*20*—No additional effect.'
};
PSYCHOKINETIC['Devotion']['Create Sound'] = {
    'attribute': '@{Intelligence}',
    'modifier': '-7',
    'context-modifier': '',
    'initial-cost': '8',
    'maintenance-cost': '3/round',
    'range': '100 yards',
    'prep': '0',
    'aoe': 'na',
    'prerequisites': 'telekinesis, control sound',
    'reference': 'p. 46',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'Sound volume can be up to that of a dragon’s roar.',
    '20': 'A loud boom erupts near the initiator.',
    '1': 'The sound is not quite true and may arouse suspicion in listeners. If a specific human voice is being mimicked, this happens on a roll of 1 or 2.',
    'effect': 'Unlike the control sound devotion, this power allows a psionicist to create sound from silence. That means the psionicist can choose the source or location of the sound. For example, he can make rocks sing, weapons cast insults, and trees sound as if a battle is occurring inside. The sound can be as soft as a whisper or as loud as several people shouting in unison. Once the sound is created, the psionicist can control it without expending additional PSPs (other than normal maintenance).\n&emsp;If the die roll for the character’s power check is a 1, the sound is not quite true and may arouse suspicion in listeners. If a specific human voice is being mimicked, this happens on a roll of 1 or 2.\n&emsp;Created sounds cannot have any magical effect. The psionicist might duplicate a banshee’s wail, for example, but it cannot harm anyone.\n&emsp;*Power Score*—Sound volume can be up to that of a dragon’s roar.\n&emsp;*20*—A loud boom erupts near the initiator.'
};
PSYCHOKINETIC['Devotion']['Inertial Barrier'] = {
    'attribute': '@{Constitution}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '7',
    'maintenance-cost': '5/round',
    'range': '0',
    'prep': '0',
    'aoe': '3-yard diam',
    'prerequisites': 'telekinesis',
    'reference': 'p. 46',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The barrier blocks an additional point per die.',
    '20': 'The psionicist creates a bizarre wind pocket that knocks him to the ground.',
    '1': '',
    'effect': 'The inertial barrier is a defense. The psionicist creates a barrier of “elastic” air around himself and anyone else within 3 yards. Like an unpoppable, semipermeable bubble, this barrier helps soften missile blows and can shield those inside from many forms of damage.\n&emsp;Specifically, the barrier helps protect against the following, by absorbing some (or with luck all) of the potential damage:}}{{style=min1}}{{c1-1=•}}{{c2-1=•}}{{c3-1=•}}{{c4-1=•}}{{c5-1=•}}{{c6-1=•}}{{c7-1=•}}{{c8-1=•}}{{cs9-1=2}}{{cc9-1=justify}}{{c9-1=&emsp;The inertial barrier has no effect against the following:}}{{c10-1=•}}{{c11-1=•}}{{c12-1=•}}{{c13-1=•}}{{c1-2=Any nonmagical missile weapon.}}{{c2-2=Any physical missile which was created with magic.}}{{c3-2=Any missile with magical pluses.}}{{c4-2=Flames.}}{{c5-2=Some breath weapon attacks, depending on the nature of the breath.}}{{c6-2=Acid. The barrier stops or slows the attack. This doesn’t matter much if the acid comes from above, because it just drips on the characters.}}{{c7-2=Gas. The barrier turns it aside, at least partially (depending on the defender’s die roll), but after a turn it will eventually work its way inside and take full effect.}}{{c8-2=Falling. A psionicist with an inertial barrier in place suffers only one- half damage from a fall; the barrier absorbs a lot of the impact, but the character still gets banged around inside.}}{{c10-2=Missiles conjured from pure magic.}}{{c11-2=Raw heat or cold.}}{{c12-2=Pure energy or light}}{{c13-2=Gaze weapons.}}{{effects2=&emsp;Furthermore, the barrier cannot keep enemies out, but it does slow them a\n&emsp;bit. Anyone trying to cross the barrier must stop moving when he hits it. He can then cross inside (or outside) in the next round.\n&emsp;**Handling Missile Attacks:** The inertial barrier saps energy from missile weapons by tightening around them as they pass through. If a missile strikes its target inside the barrier, the attacker rolls damage normally. The defender then rolls the same type of die (as the attacker just did) to see how much damage the barrier absorbed. The defender does *not* include any magical pluses the weapon may have.\n&emsp;The defender then subtracts the result of his die roll from the attacker’s damage. If anything is left over, the defender loses that many hit points. If the defender’s roll equals or exceeds the total damage, the weapon falls harmlessly to the ground. If the missile is explosive, the barrier does prevent damage, but not the explosion.\n&emsp;The barrier does not differentiate the direction of travel. If a weapon is fired from the inside, the penalties above still apply.\n&emsp;*Power Score*—The barrier blocks an additional point per die.\n&emsp;*20*—The psionicist creates a bizarre wind pocket that knocks him to the ground.'
};
PSYCHOKINETIC['Devotion']['Levitation'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'context-modifier': 'ceil(?{Additional weight (equipment / passengers) in pounds?|0}/-25)',
    'initial-cost': '12',
    'maintenance-cost': '2/round',
    'range': '0',
    'prep': '0',
    'aoe': 'individual',
    'prerequisites': 'telekinesis',
    'reference': 'p. 47',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The rate of levitation is doubled (to 120 feet/round).',
    '20': 'The psionicist doubles his weight for one round. If he falls, he suffers an extra d6 points of damage.',
    '1': '',
    'effect': 'Levitation allows the user to float. It is the use of telekinesis on oneself.\n&emsp;A character can lift himself at the rate of 1 foot per second, or 60 feet per round. The character can descend as quickly as he wants by simply letting himself fall, then slowing down as he nears the ground.\n&emsp;Levitation is not flying; it doesn’t provide any horizontal movement. The character can hover motionless, and will drift with the wind, however. He can also push himself off a wall or other fixed object and drift up to 60 feet per round in a straight line, but he can’t stop until he meets another solid object or lowers himself to the ground.\n&emsp;Two other powers—control wind and project force—can help the levitating psionicist propel himself forward. Control wind allows him to determine the direction in which he drifts. Project force allows him to create a “wall” wherever it’s wanted; movement is up to 60 feet per round, in any direction. Each change of direction or speed is a distinct use of the power, however, and costs PSPs.\n&emsp;A psionicist can always levitate his own weight. Additional weight, however, such as equipment or passengers, is a hindrance. Every 25 pounds of added weight reduces the character’s power score by one point.\n&emsp;*Power Score*—The rate of levitation is doubled (to 120 feet/round).\n&emsp;*20*—The psionicist doubles his weight for one round. If he falls, he suffers an extra d6 points of damage.'
};
PSYCHOKINETIC['Devotion']['Molecular Agitation'] = {
    'attribute': '@{Wisdom}',
    'modifier': '0',
    'context-modifier': '',
    'initial-cost': '7',
    'maintenance-cost': '6/round',
    'range': '40 yards',
    'prep': '0',
    'aoe': '1 item, 20 lbs.',
    'prerequisites': 'none',
    'reference': 'p. 48',
    'book': 'The Complete Psionics Handbook',
    'damage': '2 rounds: 1 damage.\n3+ rounds: Metal scorches (1d4). Skin burns away (1d6)',
    'damage-type': '',
    'healing': '',
    'power-score': 'After round one, the rate of agitation doubles (3 rounds of damage occurs in just 2, 5 rounds of damage occurs in 3).',
    '20': 'An item belonging to the psionicist (chosen at random) is affected for one round.',
    '1': '',
    'effect': 'Molecular agitation enables the user to excite the molecules of a substance: paper ignites, wood smolders, skin blisters, water boils, etc. The list below shows what’s possible, depending on how many rounds the substance is agitated.}}{{style=min1}}{{c1-1=1}}{{c2-1=2}}{{c3-1=3}}{{c4-1=4}}{{c5-1=5}}{{c1-2=round: readily flammable materials (e.g., paper, dry grass) ignite, skin becomes red and tender (1 point of damage), wood becomes dark.}}{{c2-2=rounds: wood smolders and smokes, metal becomes hot to the touch, skin blisters (ld4 points of damage), hair smolders, paint shrivels.}}{{c3-2=rounds: wood ignites, metal scorches (ld4 points of damage), skin burns away (ld6 points of damage), water boils, lead melts (damage does not increase after this round, but does continue).}}{{c4-2=rounds: steel grows soft.}}{{c5-2=rounds: steel melts.}}{{effects2=&emsp;Where items are concerned, allow saving throws against destruction, but add a +10 penalty to the saving throw number (this heat is quite destructive, coming from inside the material rather than outside).\n&emsp;*Power Score*—After round one, the rate of agitation doubles (3 rounds of damage occurs in just 2, 5 rounds of damage occurs in 3).\n&emsp;*20*—An item belonging to the psionicist (chosen at random) is affected for one round.'
};
PSYCHOKINETIC['Devotion']['Molecular Manipulation'] = {
    'attribute': '@{Intelligence}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '6',
    'maintenance-cost': '5/round',
    'range': '15 yards',
    'prep': '1',
    'aoe': '2 square inches',
    'prerequisites': 'telekinesis',
    'reference': 'p. 48',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'Weakening occurs at twice the rate above.',
    '20': 'The item is strengthened. Now it requires twice the normal effort to weaken.',
    '1': '',
    'effect': 'This power allows the user to weaken the molecular bonds within an object or structure. When someone stresses the object or strikes a blow it, it snaps.\n&emsp;The psionicist can create a “breaking point” of approximately two square inches per round. Deterioration occurs across a plane (in two dimensions, not three). One round’s work is enough to fatally weaken most small objects—e.g., swords, ropes, saddle straps, belts, and bows. Larger objects require more time, and DM discretion.\n&emsp;DMs must decide how vulnerable this power makes larger, oddly shaped items like shields or doors. They should keep in mind that an object need not be in two pieces before it’s virtually useless. For example, a little boat with a cracked hull is unsafe at sea. And a shield that is split halfway across offers little or no protection; if successive blows don’t shatter it, they certainly will rattle the holders arm unmercifully.\n&emsp;*Power Score*—Weakening occurs at twice the rate above.\n&emsp;*20*—The item is strengthened. Now it requires twice the normal effort to weaken.'
};
PSYCHOKINETIC['Devotion']['Soften'] = {
    'attribute': '@{Intelligence}',
    'modifier': '0',
    'context-modifier': '',
    'initial-cost': '4',
    'maintenance-cost': '3/round',
    'range': '30 yards',
    'prep': '0',
    'aoe': '1 object, 10 lbs.',
    'prerequisites': 'none',
    'reference': 'p. 49',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'All effects are doubled.',
    '20': 'The item is strengthened, and can’t be affected again until the psionicist gains one level.',
    '1': '',
    'effect': 'This power resembles molecular manipulation, except that it weakens the entire object instead of small area across a single plane. The object softens overall, losing its rigidity and strength. Specific effects vary, depending on the material.\n&emsp;*Metal:* For each round of softening, weapons incur a -1 penalty to attack rolls and cause one less point of damage, cumulatively. The armor class of metal armor increases one point per round of softening. After 10 rounds, any metal becomes soft and rubbery, but retains its shape.\n&emsp;*Wood:* Like metal, weapons with wooden shafts or handles suffer a -1 penalty to attack rolls and damage per round of softening. After six rounds, wood becomes stringy and rubbery but retains its shape. After 10 rounds, the grain can be split easily and a punch can break through even the hardest and thickest doors or chests.\n&emsp;*Stone:* After two rounds, stone becomes noticeably soft to the touch. After five rounds, it can be worked like stiff clay, but this is as soft as it gets.\n&emsp;*Magical Items:* Save vs. crushing blow to escape the effect entirely.\n&emsp;*Living Tissue:* No effect.\n\n&emsp;DMs can use their own judgement and the examples above to handle other materials.\n&emsp;*Power Score*—All effects are doubled.\n&emsp;*20*—The item is strengthened, and can’t be affected again until the psionicist gains one level.'
};

const PSYCHOMETABOLIC = {Devotion: {}, Science: {}};
PSYCHOMETABOLIC['Science']['Animal Affinity'] = {
    'attribute': '@{Constitution}',
    'modifier': '-4',
    'context-modifier': '',
    'initial-cost': '15',
    'maintenance-cost': '4/round',
    'range': '0',
    'prep': '0',
    'aoe': 'personal',
    'prerequisites': 'none',
    'reference': 'p. 50',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The character gains two abilities instead of one.',
    '20': 'The character’s skin takes on the appearance of the animal’s skin until the power is used again successfully (no change in AC).',
    '1': '',
    'effect': 'When the psionicist first learns this power, he develops an affinity for a particular type of animal. He cannot choose the animal; the affinity is dictated by his aura. To determine the nature of the affinity, the psionicist’s player rolls 1d20 and consults the table below. From that point on, when the character invokes this power, he can claim one of the animal’s attributes as his own—temporarily. He can gain the animal’s armor class, movement rate and mode, attacks and damage, THAC0, hit points, or any other special ability. Only one of these can be used at a time, however.\n&emsp;The effect lasts as long as the psionicist maintains the power. Switching to a different ability means paying the initial cost of the power again, and making a new power check.\n&emsp;The character does undergo a physical change when this power is invoked. The extent of the change depends on the animal and the ability. For example, adopting a hawk’s movement obviously requires wings, while attacking like a tiger calls for fangs and claws.}}{{style=gray-pair3}}{{c1-1=1}}{{c2-1=2}}{{c3-1=3}}{{c4-1=4}}{{c5-1=5}}{{c6-1=6}}{{c7-1=7}}{{c8-1=8}}{{c9-1=9}}{{c10-1=10}}{{c11-1=11}}{{c12-1=12}}{{c13-1=13}}{{c14-1=14}}{{c15-1=15}}{{c16-1=16}}{{c17-1=17}}{{c18-1=18}}{{c19-1=19}}{{c20-1=20}}{{c1-2=Ape}}{{c2-2=Barracuda}}{{c3-2=Boar}}{{c4-2=Bull}}{{c5-2=Crocodile}}{{c6-2=Eagle, giant}}{{c7-2=Elephant}}{{c8-2=Falcon}}{{c9-2=Griffon}}{{c10-2=Grizzly bear}}{{c11-2=Lion}}{{c12-2=Panther (black leopard)}}{{c13-2=Percheron (draft horse)}}{{c14-2=Peregrine falcon (hawk)}}{{c15-2=Rattlesnake}}{{c16-2=Scorpion, giant}}{{c17-2=Shark}}{{c18-2=Stag}}{{c19-2=Tiger}}{{c20-2=Wolf}}{{effects2=&emsp;*Power Score*—The character gains two abilities instead of one.\n&emsp;*20*—The character’s skin takes on the appearance of the animal’s skin until the power is used again successfully (no change in AC).'
};
PSYCHOMETABOLIC['Science']['Complete Healing'] = {
    'attribute': '@{Constitution}',
    'modifier': '0',
    'context-modifier': '',
    'initial-cost': '30',
    'maintenance-cost': 'na',
    'range': '0',
    'prep': '24 hours',
    'aoe': 'personal',
    'prerequisites': 'none',
    'reference': 'p. 50',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': 'All ailments, wounds, and normal diseases',
    'power-score': 'The healing occurs in just one hour.',
    '20': 'The psionicist awakes after the full 24 hours to discover that the attempt failed. He has expended 5 PSPs.',
    '1': '',
    'effect': 'The psionicist who has mastered this power can heal himself completely of all ailments, wounds, and normal diseases. He places himself in a trance for 24 hours to accomplish the healing. The trance is deep, and cannot be broken unless the character loses 5 or more hit points. As he uses this power, the psionicist’s body is repairing itself at an incredible rate. At the end of the 24—hour period, the character awakes, restored to complete health in every regard except for the 30 PSPs he expended to use complete healing.\n&emsp;If the character’s power check fails, he breaks his trance after only one hour, having realized that the power was not working. Only 5 PSPs have been expended.\n&emsp;*Power Score*—The healing occurs in just one hour.\n&emsp;*20*—The psionicist awakes after the full 24 hours to discover that the attempt failed. He has expended 5 PSPs.'
};
PSYCHOMETABOLIC['Science']['Death Field'] = {
    'attribute': '@{Constitution}',
    'modifier': '-8',
    'context-modifier': '',
    'initial-cost': '40',
    'maintenance-cost': 'na',
    'range': '0',
    'prep': '3',
    'aoe': '20 yard radius',
    'prerequisites': 'none',
    'reference': 'p. 52',
    'book': 'The Complete Psionics Handbook',
    'damage': '?{How many hit points sacrificed?|0} damage to self.\n?{How many hit points sacrificed?|0} damage to all who fail a save vs death',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist loses only half the number of hit points he specifies ([[?{How many hit points sacrificed?|0}/2]] hp); victims who fail their saving throws lose the full amount (?{How many hit points sacrificed?|0} hp).',
    '20': 'The power fails, but the psionicist loses the hit points anyway.',
    '1': '',
    'effect': 'A death field is a life-sapping region of negative energy. Only psionicists of evil alignment can learn this power without suffering side effects. If any other psionicist tries to learn the death field, his alignment will gradually be twisted toward evil as he explores this very dark portion of his psyche.\n&emsp;A successful death field takes it toll on everyone inside it, including the psionicist. Before he initiates this power, he must decide how many hit points he will sacrifice. If the power works, the loss is inevitable; he gets no saving throw. Every other living thing within the death field must make a saving throw vs. death. Those who succeed escape damage.\n&emsp;Those who fail lose the same number of hit points as the psionicist. For the weak, that can mean death.\n&emsp;*Power Score*—The psionicist loses only half the number of hit points he specifies; victims who fail their saving throws lose the full amount.\n&emsp;*20*—The power fails, but the psionicist loses the hit points anyway.'
};
PSYCHOMETABOLIC['Science']['Energy Containment'] = {
    'attribute': '@{Constitution}',
    'modifier': '-2',
    'context-modifier': '',
    'initial-cost': '10',
    'maintenance-cost': 'na',
    'range': '0',
    'prep': '0',
    'aoe': 'personal',
    'prerequisites': 'none',
    'reference': 'p. 52',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'All saves against energy attacks automatically succeed during the round in which the power is in effect.',
    '20': 'The psionicist becomes an energy attractor for 1 turn. All saves vs. energy attacks fail, causing full standard damage.',
    '1': '',
    'effect': 'A psionicist with this power has trained himself to safely absorb and assimilate energy from electricity, fire, cold, heat, and sound energy that would fry, freeze, or otherwise harm a normal character. Any physical assault based on these energy types can be drawn into the psionicist’s body. The character transforms the energy, and safely releases it as visible radiance (light).\n&emsp;In effect, this protects the psionicist against energy attacks. If the psionicist makes a successful power check, he can double the result of his die roll when saving against an energy attack. If the character makes a successful saving throw, he suffers no damage from the attack. If he fails, he suffers only half damage, regardless of what the spell description (if applicable) states.\n&emsp;When the character absorbs energy, he radiates visible light for a number of rounds equal to the points of damage he absorbed. If he suffered half damage, he radiates for that many rounds. If he suffered no damage, roll for damage anyway to see how long he glows.\n&emsp;This glow is definitely noticeable, but it is soft, and illuminates no more than an area with a 2—yard radius.\n&emsp;*Power Score*—All saves against energy attacks automatically succeed during the round in which the power is in effect.\n&emsp;*20*—The psionicist becomes an energy attractor for 1 turn. All saves vs. energy attacks fail, causing full standard damage.'
};
PSYCHOMETABOLIC['Science']['Life Draining'] = {
    'attribute': '@{Constitution}',
    'modifier': '-3',
    'context-modifier': '',
    'initial-cost': '11',
    'maintenance-cost': '5/round',
    'range': 'touch',
    'prep': '0',
    'aoe': 'individual',
    'prerequisites': 'none',
    'reference': 'p. 52',
    'book': 'The Complete Psionics Handbook',
    'damage': '1d6',
    'damage-type': '',
    'healing': 'Same as damage',
    'power-score': 'Rate of drain increases to 1d20 points per round.',
    '20': 'Backfire! Half of the psionicist’s remaining hit points ([[@{HP}/2]]) are absorbed by the target, reversing the power’s effects.',
    '1': '',
    'effect': 'With this devotion, a psionicist can drain hit points from another character and use them to recover his own. This transfer occurs at the rate of 1d6 points per round.\n&emsp;The character can absorb up to 10 more hit points than his healthy total, but these bonus points last only one hour. After that, if the psionicist still has more hit points than he should, the excess points vanish.\n&emsp;*Power Score*—Rate of drain increases to 1d20 points per round.\n&emsp;*20*—Backfire! Half of the psionicist’s remaining hit points are absorbed by the target, reversing the power’s effects.'
};

const PSYCHOPORTIVE = {Devotion: {}, Science: {}};
const TELEPATHIC = {Devotion: {}, Science: {}};
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