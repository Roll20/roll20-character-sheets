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
    'initial-cost': '9',
    'maintenance-cost': '9/round',
    'range': '50 yards',
    'prep': '0',
    'aoe': 'personal',
    'prereqs': 'none',
    'reference': 'p. 28',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist can examine up to four auras per round instead of two.',
    '20': 'The initiator can’t use this power again for 24 hours.',
    'effect': 'An aura is a glowing halo or envelope of colored light which surrounds all living things. It is invisible to the naked eye. A creature’s aura reflects both its alignment and its experience level.\n&emsp;When a psionicist uses this power, he can see auras. Interpreting an aura requires some concentration, however. With each use of this power, the psionicist can learn only one piece of information—either the subject’s alignment or experience level, but not both simultaneously.\n&emsp;A psionicist can examine up to two auras per round (he must be able to see both subjects). Alternately, he can examine the same aura twice, to verify his first impression with a second reading or to pick up remaining information. In any case, the psionicist must make a new power check each time he attempts to interpret an aura.\n&emsp;The psionicist can be reasonably discreet when he uses this power. He doesn’t have to poke at the subject or give him the hairy eyeball. However, he does need to gaze at the subject intently. Since the range of this power is the range of vision, the psionicist can go unnoticed by maintaining his distance. If he tries to sense auras on the people he is conversing with, they certainly will notice that he is staring and probably will be uncomfortable.\n&emsp;The level of the character being analyzed affects the psionicist’s power check. The higher the subject’s experience level, the tougher it is to interpret the subject’s aura. This translates into a -1 penalty for every three levels of the subject, rounded down. For example, a psionicist reading the aura of an 8th level character would suffer a -2 penalty.\n&emsp;If the die roll for the power check is a 1, the psionicist’s reading is incomplete or slightly incorrect. For example, the psionicist may learn only the chaotic portion of a chaotic neutral alignment. Or he may interpret the character’s level with an error of one or two levels.\n&emsp;*Power Score*—The psionicist can examine up to four auras per round instead of two.\n&emsp;*20*—The initiator can’t use this power again for 24 hours.'
};
CLAIRSENTIENT['Science']['Clairaudience'] = {
    'attribute': '@{Wisdom}',
    'modifier': '-3',
    'initial-cost': '6',
    'maintenance-cost': '4/round',
    'range': 'unlimited',
    'prep': '0',
    'aoe': 'special',
    'prereqs': 'none',
    'reference': 'p. 28',
    'book': 'The Complete Psionics Handbook',
    'damage': '',
    'damage-type': '',
    'healing': '',
    'power-score': 'The psionicist automatically gains clairvoyance of the area as well.',
    '20': 'The psionicist is deaf for 1d12 hours.',
    'effect': 'Clairaudience allows the user to hear sounds from a distant area. The psionicist picks a spot anywhere within range. He then can hear everything that he would be able to hear normally if he were standing in that spot. If the psionicist has enhanced senses, the senses apply to clairaudience as well.\n&emsp;The farther the “listening spot” is from the psionicist, the more difficult it is to use this power. The table below gives specifics.}}{{style=center2}}{{cc1-1=bottom}}{{c1-1=**Range**}}{{c2-1=100 yards}}{{c3-1=1,000 yards}}{{c4-1=10 miles}}{{c5-1=100 miles}}{{c6-1=1,000 miles}}{{c7-1=10,000 miles}}{{c8-1=Interplanetary&ast;}}{{c1-2=**Power Score Modifier**}}{{c2-2=0}}{{c3-2=-2}}{{c4-2=-4}}{{c5-2=-6}}{{c6-2=-8}}{{c7-2=-10}}{{c8-2=-12}}{{effect2=\n&emsp;&ast; Players with the SPELLJAMMER boxed set should note that clairaudience works only within a given crystal sphere or plane.\n&emsp;Using clairaudience does not screen out background noise around the psionicist. If something in his own neighborhood is raising a racket, he may have trouble hearing what is happening somewhere else. Clairaudience also does not give the psionicist the ability to understand a foreign or alien language, nor does it help him interpret sounds. For example, if the psionicist hears furniture scraping across the floor, he can only guess whether it’s a chair or something else - just as if he heard it while blindfolded.\n&emsp;*Power Score*—The psionicist automatically gains clairvoyance of the area as well.\n&emsp;*20*—The psionicist is deaf for 1d12 hours.'
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