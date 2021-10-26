/* globals getAttrs, setAttrs, generateRowID, startRoll, finishRoll, getSectionIDs, removeRepeatingRow, getActiveCharacterId */
/**
 * ================
 * CONTENTS:
 *
 * 1. GAME SYSTEM DATA - game system data for character creation & rolls
 * 2. CONSTANTS & VERSION CONTROL - common constants for character sheet
 * 3. ASYNC CORE - promisified sheetworkers for delicious async goodness
 * 4. HELPER FUNCTIONS - does what it says on the tin
 * 5. MAIN SHEET FUNCTIONS - non-repeating section functions
 * 6. REPEATING SECTION FUNCTIONS - go on, have a guess
 * 7. DICE ROLL FUNCTIONS - includes experimental Reactive Rolls
 * 8. EVENT LISTENERS - oooh, another mysterious title
 *
 * ================
 */

/**
 * 1. GAME SYSTEM DATA
 * Career Data for character creation
 **/
const version = {
	M: 0,
	m: 4,
	p: 2,
	current() {return `${this.M}.${this.m}.${this.p}`},
	integer() {return parseInt(`${this.M}${this.m}${this.p}`)}
};

const warlockData = {	
	getCareers(tier='', race='') { return this.careers.filter(c=>(new RegExp(`${tier}`, `i`)).test(c.type)).filter(c=>(new RegExp(`${race}`, `i`)).test(c.type)) },
	getCareerNames(tier='', race='') { return this.getCareers(tier, race).map(c=>c.name) },
	getSkills(career) { return (this.getCareerNames().includes(career)) ? this.careers.find(c=>(new RegExp(`^\\s*${career}\\s*$`, 'i')).test(c.name)).skills : null },
	getDamageTypes() {return Object.keys(this.critTables)},
	armourTypes: {light: '1d3', modest: '1d6', heavy: '2d6'},
	shieldTypes: {small: '3', large: '5'},
	weaponTypes: {
		custom: {damage: '@{damage_custom}'},
		unarmed: {damage: '1d6 - 2',type: 'crushing',threat: 'casual',skill: 'brawling'},
		club: {damage: '1d6 - 1',type: 'crushing',threat: 'casual',skill: 'blunt'},
		knife: {damage: '1d6 + 1',type: 'slashing',threat: 'casual',skill: 'small_blade'},
		dagger: {damage: '1d6 + 2',type: 'piercing',threat: 'casual',skill: 'small_blade'},
		short_sword: {damage: '1d6 + 3',type: 'slashing',threat: 'casual',skill: 'large_blade'},
		arming_sword: {damage: '2d6',type: 'slashing',threat: 'casual',skill: 'large_blade'},
		hammer: {damage: '2d6',type: 'crushing',threat: 'martial',skill: 'blunt',},
		axe: {damage: '2d6 + 1',type: 'crushing',threat: 'martial',skill: 'pole_arm'},
		mace: {damage: '2d6 + 2',type: 'crushing',threat: 'martial',skill: 'blunt'},
		spear: {damage: '2d6 + 1',type: 'piercing',threat: 'martial',skill: 'pole_arm'},
		pole_arm: {damage: '2d6 + 2',type: 'slashing',threat: 'martial',skill: 'pole_arm'},
		['2h_sword']: {damage: '2d6 + 3',type: 'slashing',threat: 'martial',skill: 'large_blade'},
		staff: {damage: '1d6',type: 'crushing',threat: 'casual',skill: 'blunt'},
		bow: {damage: '2d6 + 1',type: 'piercing',threat: 'casual',skill: 'bow',ranged: 1},
		crossbow: {damage: '2d6 + 2',type: 'piercing',threat: 'martial',skill: 'crossbow',ranged: 1},
	},
	critTables: {
		slashing: {
			2: "Flat of the blade across the skull, dazed for [[1d6]] rounds, all actions at a penalty of 2. Double vision for [[1d6]] days.",
			3: "Slashed on the hip, falls over and can only crawl in the dirt for [[1d6]] rounds, all tests at a penalty of 3.",
			4: "Cut on thigh, can only hobble for [[1d3]] days, Endurance test not to end up with a limp.",
			5: "That was my foot! Can only hobble for [[1d6]] days. Toes loose in the boot.",
			6: "Slash on the back, opening muscles, can't carry a pack for [[1d6]] days.",
			7: "Whoops, [[1d3]] fingers sliced off, randomly determine hand, drop what you're carrying.",
			8: "An ear is slashed! Permanent penalty of 2 to tests involving hearing.",
			9: "Hacked in the shoulder! Determine which arm, tests involving that arm are at a penalty of 5 for [[1d6]] days.",
			10: "Cut through an artery, dead.",
		},
		piercing: {
			2: "A jab in the forearm, pass a sleight-of-hand test to keep hold of your weapon.",
			3: "A skewered rump! Very painful, all tests at a penalty of 3 for the next [[1d6]] rounds.",
			4: "A prod in the guts, forces dinner up and over everyone. Spend [[1d6]] rounds retching, all actions are at a penalty of 3.",
			5: "Poked in the neck, can do nothing but gasp for breath and defend at a penalty of 2 for [[1d6]] rounds.",
			6: "Run through the shoulder, arm immobilised for [[1d6]] days.",
			7: "Poked in the mouth, teeth everywhere. Hard to talk through the blood, even uglier than before.",
			8: "My eye! Permanent penalty of 2 to tests involving sight, ugly to boot.",
			9: "Through my hand! Drops weapon in pain. Hand a useless claw for [[1d6]] days.",
			10: "Stabbed through the heart or brain, dead.",
		},
		crushing: {
			2: "A rap on the skull sends teeth chattering, dazed for [[1d6]] rounds.",
			3: "Foot crushed, hops around in agony for [[1d6]] rounds.",
			4: "Dead leg, all tests involving movement at a penalty of 3 for [[1d3]] days.",
			5: "A whack in the guts, winded and wheezing, can only defend at a penalty of 3 for [[1d6]] rounds.",
			6: "Hand crushed, determine which one (dominant/non-dominant). Drop what you were carrying and can't use hand for [[1d6]] days.",
			7: "Thumped on the temples and seeing stars! Passes out for [[1d6]] rounds.",
			8: "Right in the kidney! Peeing blood, all tests at a penalty of 5 for the next [[1d6]] days. Better hope there is not too much internal bleeding!",
			9: "Smack on the chin. Jaw fractured, slurred and garbled speech for [[1d6]] days. Broken and unsymmetrical face now.",
			10: "Smashed on the skull and brained, dead.",
		},
		blast: {
			2: "Weapon too hot to touch! Drop it and draw something else, quick!",
			3: "Clothing on fire! Spend [[1d6]] rounds doing nothing except putting it out.",
			4: "You gear catches fire! Either put it out for [[1d6]] rounds, or let all that you own burn!",
			5: "Breathe in the fumes, coughing and spluttering for [[1d6]] rounds, all tests at a penalty of 3.",
			6: "Blinded by the blast, permanent penalty of 2 to tests involving sight.",
			7: "Knocked off your feet and flung against the wall. Stunned and prone for [[1d6]] rounds, all tests at a penalty of 3.",
			8: "Hair singed off, scalp red and raw. No hats or helmets for [[1d6]] days, all tests at penalty of 3 during this time.",
			9: "Full in the face, the blast destroys your sense of smell. All tests involving smell at a penalty of 3, now your companions are more bearable.",
			10: "Skin and bone seared, dead",
		}
	},
	miscastTable: {
		1: "The caster's hands catch fire causing them [[1d6]] damage.",
		2: "Two small horns grow from the casters head.",
		3: "One of the caster's eyes turns milky white.",
		4: "The spell discharges incorrectly, hitting the nearest creature for [[2d6]] damage.",
		5: "The caster's fingers elongate on one hand",
		6: "Blood runs from the caster's eyes for [[1d6]] days.",
		7: "The spell backfires, blasting the caster across the room for [[2d6]] damage.",
		8: "An otherworldly being spies the caster, and appears in [[1d3]] rounds.",
		9: "The caster loses the sense of taste, all food is like ash.",
		10: "The caster's skin is bleached white.",
		11: "All of the caster's hair falls out.",
		12: "The caster's skin becomes translucent for [[2d6]] days.",
		13: "The caster's arms are altered, growing small bone spurs.",
		14: "The caster freezes like a statue for the next [[1d3]] days.",
		15: "A miasma of magical mist fills a nearby space, causing [[1d6]] damage to all.",
		16: "The caster's eyes turn jet black for [[1d6]] weeks.",
		17: "The caster is possessed by an otherworldly being for [[1d6]] turns.",
		18: "The caster loses the ability to cast spells for [[1d6]] days, every attempt miscasts.",
		19: "The caster's face is frozen in a grimace of pain for [[1d6]] days.",
		20: "The caster's arms become covered in small scales.",
	},
	creatureAbilities: {
		brittle: "This creature is susceptible to impact damage. If maces, clubs or hammers attack them successfully, the damage is rolled twice and the higher value is applied.",
		dissolve: "This being is able to dissolve matter. Any time it is successfully struck the attacker must test their luck. On a fail, their weapon is destroyed.",
		ethereal: "This creature does not exist in the material plane. It can only be harmed by magic and magical weapons, and can pass through solid barriers such as doors and walls with ease. Flame",
		flying: "Using wings or similar, this creature can fly. Treat this as normal movement, but ignoring barriers that can be flown over at the game master's discretion. This creature cannot be engaged in melee combat whilst flying unless it chooses to attack, in which case it can be targeted.",
		formless: "The body of this creature has no real form, so it may slide under doors, squeeze through narrow spaces etc. as if it were a thick, viscous liquid.",
		intelligent: "This being is intelligent, can speak (but perhaps not in a tongue the characters know) and use tools and weapons. It is also able to create strategies and plans.",
		poisonous: "This creature carries a poison or can inject a venom. If it successfully hits a target, the victim must test their luck. If they fail, the victim is poisoned, and loses 1d6 stamina at the start of the next 1d3 rounds. Poison or venom effects from the same source are not cumulative, although of course the creature can still inflict its normal damage when it hits.",
		puppet: "The creature has no will of its own and must be directed by another mind. In consequence, it never surrenders or flees and will fight until destroyed.",
		regenerating: "The being is able to recover damage. Every round the being regains 1d6 stamina, up to a maximum of its starting value.",
		spell_caster: "The being is able to cast spells. The games master should feel free to assign the creature spells that reflect its power. It uses stamina to cast spells and requires an incantation skill check.",
		tracking: "The creature is excellent at tracking other creatures by scent or another sense. Treat its adventuring skill at three times the normal level for tests involving tracking.",
	},//,\s*,*\s*\}\s*,\s*\}\s*,\s*
	careers: [
		// CORE - BASIC
		{name: "agitator",type: "basic",skills: {small_blade: 10,intimidate: 10,persuasion: 12,streetwise: 12}},
		{name: "beggar",type: "basic",skills: {appraise: 10,blunt: 10,spot: 12,streetwise: 12}},
		{name: "boatman",type: "basic",skills: {navigation: 10,repair: 10,endurance: 12,swimming: 12}},
		{name: "bodyguard",type: "basic",skills: {medicine: 10,thrown: 10,intimidate: 12,large_blade: 12}},
		{name: "bounty_hunter",type: "basic",skills: {bargain: 10,crossbow: 10,spot: 12,streetwise: 12}},
		{name: "entertainer",type: "basic",skills: {diplomacy: 10,history: 10,disguise: 12,persuasion: 12}},
		{name: "footpad",type: "basic",skills: {stealth: 10,thrown: 10,intimidate: 12,streetwise: 12}},
		{name: "gambler",type: "basic",skills: {bargain: 10,spot: 10,persuasion: 12,"sleight-of-hand": 12}},
		{name: "grave_robber",type: "basic",skills: {intimidate: 10,ostler: 10,small_blade: 12,spot: 12}},
		{name: "hunter",type: "basic",skills: {stealth: 10,swimming: 10,spot: 12,survival: 12}},
		{name: "initiate",type: "basic",skills: {command: 10,ostler: 10,medicine: 12,persuasion: 12}},
		{name: "mercenary",type: "basic",skills: {endurance: 10,streetwise: 10,dodge: 12,large_blade: 12}},
		{name: "militiaman",type: "basic",skills: {command: 10,ostler: 10,"pole-arm": 12,thrown: 12}},
		{name: "miner",type: "basic",skills: {survival: 10,swimming: 10,endurance: 12,navigation: 12}},
		{name: "noble",type: "basic",skills: {language: 10,medicine: 10,diplomacy: 12,history: 12}},
		{name: "outlaw",type: "basic",skills: {medicine: 10,"sleigh-of-hand": 10,large_blade: 12,thrown: 12}},
		{name: "pedlar",type: "basic",skills: {ostler: 10,streetwise: 10,bargain: 12,repair: 12}},
		{name: "raconteur",type: "basic",skills: {dodge: 10,history: 10,lie: 12,streetwise: 12}},
		{name: "rat_catcher",type: "basic",skills: {athletics: 10,medicine: 10,stealth: 12,survival: 12}},
		{name: "road_warden",type: "basic",skills: {crossbow: 10,dodge: 10,"pole-arm": 12,ostler: 12}},
		{name: "soldier",type: "basic",skills: {command: 10,bow: 10,large_blade: 12,"pole-arm": 12}},
		{name: "thief",type: "basic",skills: {lie: 10,streetwise: 10,small_blade: 12,spot: 12}},
		{name: "tomb_robber",type: "basic",skills: {athletics: 10,intimidate: 10,blunt: 12,endurance: 12}},
		{name: "wizard's_apprentice",type: "basic",skills: {command: 10,persuasion: 10,language: 12,incantation: 12}},
		// CORE - ADVANCED
		{name: "assassin",type: "advanced",skills: {blunt: 14,dodge: 14,streetwise: 14,small_blade: 16,stealth: 16}},
		{name: "bravo",type: "advanced",skills: {blunt: 14,bow: 14,command: 14,large_blade: 16,streetwise: 16}},
		{name: "watch_captain",type: "advanced",skills: {crossbow: 14,endurance: 14,ostler: 14,pole_arm: 16,streetwise: 16}},
		{name: "charlatan",type: "advanced",skills: {appraise: 14,ostler: 14,spot: 14,persuasion: 16,streetwise: 16}},
		{name: "explorer",type: "advanced",skills: {athletics: 14,small_blade: 14,swimming: 14,navigation: 16,spot: 16}},
		{name: "freelance",type: "advanced",skills: {diplomacy: 14,medicine: 14,thrown: 14,ostler: 16,pole_arm: 16}},
		{name: "highwayman",type: "advanced",skills: {dodge: 14,intimidate: 14,large_blade: 14,disguise: 16,ostler: 16}},
		{name: "mercenary_captain",type: "advanced",skills: {bargain: 14,medicine: 14,survival: 14,crossbow: 16,large_blade: 16}},
		{name: "merchant",type: "advanced",skills: {lie: 14,persuasion: 14,sleight_of_hand: 14,appraise: 16,bargain: 16,ostler: 16}},
		{name: "minstrel",type: "advanced",skills: {history: 14,lie: 14,repair: 14,persuasion: 16,sleight_of_hand: 16}},
		{name: "outlaw_chief",type: "advanced",skills: {endurance: 14,ostler: 14,swimming: 14,intimidate: 16,large_blade: 16}},
		{name: "priest",type: "advanced",skills: {diplomacy: 14,ostler: 14,thrown: 14,incantation: 16,language: 16}},
		{name: "scholar",type: "advanced",skills: {appraise: 14,brawling: 14,repair: 14,language: 16,medicine: 16}},
		{name: "scout",type: "advanced",skills: {athletics: 14,ostler: 14,survival: 14,spot: 16,stealth: 16}},
		{name: "spy",type: "advanced",skills: {athletics: 14,dodge: 14,small_blade: 14,persuasion: 16,sleight_of_hand: 16}},
		{name: "veteran_soldier",type: "advanced",skills: {dodge: 14,pole_arm: 14,survival: 14,endurance: 16,large_blade: 16}},
		{name: "wizard",type: "advanced",skills: {brawling: 14,command: 14,medicine: 14,history: 16,incantation: 16}},
		// COMPENDIUM BASIC
		{name: "dwarf_inventor",type: "basic, dwarf",skills: {brawling: 10,diplomacy: 10,repair: 12,sleight_of_hand: 12}},
		{name: "dwarf_tunnel_fighter",type: "basic, dwarf",skills: {endurance: 10,intimidate: 10,stealth: 12,survival: 12}},
		{name: "elf_astrologer",type: "basic, elf",skills: {appraise: 10,diplomacy: 10,navigation: 12,spot: 12}},
		{name: "elf_kin_guard",type: "basic, elf",skills: {endurance: 10,large_blade: 10,navigation: 12,survival: 12}},
		{name: "halfling_gong_farmer",type: "basic, halfling",skills: {bargain: 10,medicine: 10,small_blade: 12,streetwise: 12}},
		{name: "halfling_pie_master",type: "basic, halfling",skills: {bargain: 10,small_blade: 10,persuasion: 12,streetwise: 12}},
		// COMPENDIUM ADVANCED
		{name: "dwarf_battlesmith",type: "advanced, dwarf",skills: {appraise: 14,endurance: 14,history: 14,intimidate: 16,repair: 16}},
		{name: "dwarf_slayer",type: "advanced, dwarf",skills: {athletics: 14,brawling: 14,medicine: 14,intimidate: 16,large_blade: 16}},
		{name: "elf_agent",type: "advanced, elf",skills: {diplomacy: 16,language: 16,persuasion: 16,sleight_of_hand: 14,streetwise: 14}},
		{name: "elf_champion",type: "advanced, elf",skills: {spot: 14,survival: 14,thrown: 14,intimidate: 16,large_blade: 16}},
		{name: "halfling_burglar",type: "advanced, halfling",skills: {appraise: 14,athletics: 14,dodge: 14,spot: 16,stealth: 16}},
		{name: "halfling_gaffer",type: "advanced, halfling",skills: {brawling: 14,lie: 14,intimidate: 14,command: 16,streetwise: 16}},
		// COMPENDIUM ADVANCED SPELLCASTERS
		{name: "dwarf_runeforger",type: "advanced, dwarf",skills: {appraise: 14,command: 14,diplomacy: 14,incantation: 16,language: 16}},
		{name: "halfling_conjurer",type: "advanced, halfling",skills: {disguise: 14,lie: 14,streetwise: 14,persuasion: 16,sleight_of_hand: 16}},
		{name: "elf_druid",type: "advanced, elf",skills: {medicine: 14,small_blades: 14,spot: 14,navigation: 16,survival: 16}},
		// KINGDOM BASIC
		{name: "docker",type: "basic",skills: {appraise: 10,brawling: 10,intimidate: 10,streetwise: 12,swimming: 12}},
		{name: "fish_warden",type: "basic",skills: {blunt: 10,repair: 10,thrown: 10,navigation: 12,swimming: 12}},
		{name: "mudlark",type: "basic",skills: {spot: 10,survival: 10,thrown: 10,endurance: 12,swimming: 12}},
		{name: "night_watchman",type: "basic",skills: {blunt: 10,lie: 10,navigation: 10,stealth: 12,streetwise: 12}},
		{name: "publican",type: "basic",skills: {bargain: 10,history: 10,spot: 10,blunt: 12,persuasion: 12}},
		{name: "servant",type: "basic",skills: {bargain: 10,endurance: 10,history: 10,spot: 12,stealth: 12}},
		// GOBLINS BASIC
		{name: "hedge_wizard",type: "basic, goblin",skills: {blunt: 10,navigation: 10,medicine: 12,survival: 12}},
		{name: "goblin_pedlar",type: "basic, goblin",skills: {diplomacy: 10,sleight_of_hand: 10,blunt: 12,bargain: 12}},
		{name: "guttersnipe",type: "basic, goblin",skills: {athletics: 10,blunt: 10,stealth: 12,sleight_of_hand: 12}},
		{name: "mushroom_farmer",type: "basic, goblin",skills: {blunt: 10,brawling: 10,medicine: 12,navigation: 12,spot: 12}},
		{name: "spider_rider",type: "basic, goblin",skills: {appraise: 10,bow: 10,small_blade: 12,ostler: 12,survival: 12}},
		{name: "tinkerer",type: "basic, goblin",skills: {small_blades: 10,sleight_of_hand: 10,repair: 12,spot: 12}},
		// GOBLINS ADVANCED
		{name: "emissary",type: "advanced, goblin",skills: {history: 14,languages: 14,appraise: 14,persuasion: 16,diplomacy: 16}},
		{name: "spelunker",type: "advanced. goblin",skills: {spot: 14,swimming: 14,stealth: 14,navigation: 16,athletics: 16}},
		{name: "sporceror",type: "advanced, goblin",skills: {stealth: 14,navigation: 14,medicine: 14,spot: 16,incantation: 16}},
	],
}

/**
 * 2. CONSTANTS & VERSION CONTROL
 */
const rx = {
	id: /-[A-Za-z0-9_-]{19}/, idOnly: /^-[A-Za-z0-9_-]{19}$/, rowId: /-[A-Za-z0-9-]{19}/, attrMod: /([-+]?\s*\d+|d\d+)/i, getRowId: /_(-[A-Za-z0-9-]{19})_/,
	grabAttr: /^0\[(.*)?\]\s*$/,
};
const skills = ['appraise', 'athletics', 'bargain', 'blunt', 'bow', 'brawling', 'command', 'crossbow', 'diplomacy', 'disguise', 'dodge', 'endurance', 'history', 'incantation', 'intimidate', 'language', 'large_blade', 'lie', 'medicine', 'navigation', 'ostler', 'persuasion', 'pole_arm', 'repair', 'sleight_of_hand', 'small_blade', 'spot', 'stealth', 'streetwise', 'survival', 'swimming', 'thrown'];
const skillsMax = skills.map(sk => `${sk}_max`);
const skillsBoosted = skills.map(sk => `${sk}_boosted`);
const skillsBonus = skills.map(sk => `${sk}_bonus`);
const initialSkillpoints = 10;
const weaponAttributes = ['possession_link', 'name', 'damage', 'attack_skill', 'attack_mod', 'damage_type', 'ranged', 'description'];
const spellAttributes = ['type', 'cost', 'name', 'damage', 'damage_type', 'description', 'attack_skill', 'attack_mod', 'ranged', 'mods', 'duration', 'duration_type'];

const itemModTypes = ['weapon', 'armor', 'armour', 'shield', 'stats', 'stat'];
const rxModTypes = new RegExp(`(${itemModTypes.join('|')})\\s*:`, 'i');

const versionControl = async (gotVersion) => {
	let latestVersion = version.current();
	if (latestVersion === gotVersion) return h.log(`Sheet is up to date`, 'info', `versionControl`);
	let currentVersion = /\d+\.\d+\.\d+/.test(gotVersion) ? parseInt(gotVersion.replace(/\D/g, '')) : 0;

	if (currentVersion < 42) {
		//NO ATTR CHANGES
	}

	await as.setAttrs({version: latestVersion});
};

/**
 * 3. ASYNC CORE FUNCTIONS
 * async sheetworker functions Modified from Scott C's version of Onyxring's code
 **/
const as = (() => {
    const setActiveCharacterId = function(charId){
        let oldAcid=getActiveCharacterId();
        let ev = new CustomEvent("message");
        ev.data={"id":"0", "type":"setActiveCharacter", "data":charId};
        self.dispatchEvent(ev);
        return oldAcid;
    };
    const promisifyWorker = (worker, parameters) => {
        let acid=getActiveCharacterId(); 
        let prevAcid=null;               
        return new Promise((res,rej)=>{
            prevAcid=setActiveCharacterId(acid);  
            try {if (worker===0) getAttrs(parameters[0]||[],(v)=>res(v));
                else if (worker===1) setAttrs(parameters[0]||{}, parameters[1]||{},(v)=>res(v));
                else if (worker===2) getSectionIDs(parameters[0]||'',(v)=>res(v));
            } catch(err) {rej(console.error(err))}
        }).finally(()=>setActiveCharacterId(prevAcid));
    }
    return {
        getAttrs(attrArray) {return promisifyWorker(0, [attrArray])},
        setAttrs(attrObj, options) {return promisifyWorker(1, [attrObj, options])},
        getSectionIDs(section) {return promisifyWorker(2, [section])},
		setActiveCharacterId,
    }
})();


/**
 * 4. HELPER FUNCTIONS
 */
const h = (() => {
    const consoleStyle = {
        scriptName: 'warlock!sheet',
        log: `border: solid 1px cyan; line-height: 16px; text-align: center; padding: 1px 8px 2px 8px; border-radius: 8px; background-color: #333`,
        info: `border: solid 2px orange; line-height: 16px; text-align: middle; padding: 1px 8px 2px 8px; border-radius: 8px; background-color: #444`,
        warn: `border: solid 2px red; line-height: 16px; text-align: middle; padding: 1px 8px 2px 8px; border-radius: 8px; background-color: #444`,
        error: `border: solid 2px red; line-height: 16px; color: red; font-weight: bold; text-align: middle; padding: 1px 8px 2px 8px; border-radius: 8px; background-color: #fff`
    }
	const log = (msgs, style='log', title) => {
        msgs = (msgs.length === 1 && Array.isArray(msgs[0])) ? [msgs] : toArray(msgs)||[];
        style = Object.keys(consoleStyle).includes(style) ? style : 'log';
        console.log(`%c${consoleStyle.scriptName}.${style}${title ? ` -= ${title} =-` : ''}`, consoleStyle[style], ...msgs);
        if (style === 'error') console.trace();
    }

	const checkId = (input, strict) => typeof(input) === 'string' ? strict ? rx.idOnly.test(input) : rx.id.test(input) : undefined;

	const checkRowId = (input) => typeof(input) === 'string' ? rx.rowId.test(input) : undefined;

	const getRowId = (input) => typeof(input) === 'string' ? (input.match(rx.getRowId)||[])[1] : undefined;

	const emproper = (input) => `${input}`.split(/[_\s]+/g).map(w=>`${w[0].toUpperCase()}${w.slice(1)}`).join(' ');

	const toArray = (inp) => (inp == null) ? null : Array.isArray(inp) ? inp : [inp];

	const cloneObj = (inp) => {
		if (typeof(inp) !== 'object') return;
		let output;
		try {output = JSON.parse(JSON.stringify(inp))}
		catch(err) {h.log(err, 'error', 'cloneObj')}
		return output;
	}

	const isEmptyObj = (inp) => {
		if (!inp || typeof(inp) !== 'object') {h.log(inp, 'warn', `isEmptyObj: input is not an object!`); return undefined;}
		return (Object.keys(inp).length) ? false : true;
	}

	const mergeObj = (parentObj, newObj) => {
		if (typeof(parentObj) !== 'object' || typeof(newObj) !== 'object' || !Object.keys(newObj).length) return null;
		try {Object.assign(parentObj, newObj)} catch(err) {h.log(err, 'error', `mergeObj spat the dummy`); return false}
		return true;
	}

	// Use option {returnId: true} to return an Object with the rowId as the key, output as the value
	// Use option {existingId: <id>} to use an existing rowId
	const createRepRow = (section, suffixes, values, options={}) => {
		values = toArray(values);
		let rowId = checkRowId(options.existingId) ? options.existingId : generateRowID();
		let output = {};
		toArray(suffixes).map((suf, i) => {if (values[i] != null) output[`repeating_${section}_${rowId}_${suf}`] = values[i]||''});
		return options.returnId ? {[rowId]: output} : output;
	}

	const toggleAttr = async (attr, log=false) => {
		await as.getAttrs(h.toArray(attr)).then(async (a) => {
			let outVal = (!a[attr] || a[attr] == '0') ? 1 : 0;
			await as.setAttrs({[attr]: outVal});
			if (log) h.log(`Toggle Helper: ${attr} switched to "${outVal}"`, 'log', 'toggleAttr');
		});
	}

	const cleanRoll = (input) => {
		let output = input
			.replace(/[^\d+-d\s]/g, '')
			.replace(/d[^\d+]/g, '')
			.replace(/[\s]{2,}/g, ' ');
		return output;
	};

	// Provide alternative roll labels with {base: 'myLabel'}, provide extras as {'Rollname': '4d6'}
	const combineRollParts = (base, bonus, global, options={}, extras={}) => {
		let labels = [options.base||'Base', options.bonus||'Bonus',  options.global||'Global'].concat(Object.keys(extras));
		let parts = [base, bonus, global].concat(Object.values(extras)).map((rp, i) => {
			if (!rp || !/\d/.test(rp) || parseInt(rp) === 0) return null;
			rp = `${rp}`.replace(/^\s*\+/, '').replace(/[^0-9d+*/-]/g, '');
			rp = (/\d\s*[+*/-]\s*\d/.test(rp)) ? `(${rp})` : rp;
			return `${rp}[${labels[i]}]`;
		});
		return parts.filter(v=>v).join(' + ');
	};

	const escapeRegex = (string) => {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    }

	const timeout = async (ms) => {
		return new Promise(res => {
			setTimeout(() => res(), ms)
		});
	};

	// example input 3d6 + 15 - 1d4
	// +5
	// - 1d4 - 2d20 + 5
	// Expects an array of integers or XdY roll expressions. Returns a flat integer representing the average outcome
	const getAverageOfMods = (inputArray) => {
		let errorMarker = ``;
		let result = inputArray.reduce((a,v) => {
			v = v.replace(/^\s*(\d)/, (match, p1) => {
				return `+${p1}`;
			});
			v = v.replace(/(\D)d/gi, (match, p1) => {
				return `${p1}1d`;
			});
			let rxChunk = /\s*([+-][^+-]+)/g;
			let expParts;
			let subExpTotal = 0;
			while ((expParts = rxChunk.exec(v)) !== null) {
				let partValue = 0,
					diceRoll = expParts[1].match(/([+-])\s*(\d+d\d+)/i);
				if (diceRoll) {
					let rollParts = diceRoll[2].match(/(\d+)d(\d+)/i);
					let average = parseInt(rollParts[1]) * (parseInt(rollParts[2])+1)/2;
					partValue = (/-/.test(diceRoll[1])) ? - average : average;
				} else {
					partValue = parseInt(expParts[1].replace(/[^\d+-]/g, ''));
				}
				if (isNaN(partValue)) {
					errorMarker = `*`;
				} else subExpTotal += partValue;
			}
			return a += subExpTotal;
		}, 0);
		return (result < 0) ? `${result}${errorMarker}` : `+${result}${errorMarker}`;
	}

	return {
		log,
		checkId,
		checkRowId,
		getRowId,
		emproper,
		toArray,
		cloneObj,
		mergeObj,
		isEmptyObj,
		createRepRow,
		toggleAttr,
		cleanRoll,
		combineRollParts,
		escapeRegex,
		timeout,
		getAverageOfMods,
	}
})();

/**
 * 5. MAIN SHEET FUNCTIONS
 */
const warSheet = (() => {
	// Respond to changes in Adventuring Skills
	const handleSkillChange = async (ev) => {
		let output = {};
		let attrs = await as.getAttrs(skills.concat(skillsMax).concat(['unlocked', 'career', 'advanced_career', 'career_toggle', 'initial_skillpoints', 'tutorial_flag', 'initial_fives', 'initial_sixes']));
		let targetCareer = (attrs.career_toggle == '1') ? attrs.advanced_career : attrs.career;
		let careerSkills = warlockData.getSkills(targetCareer);
		// Check if modified Skill effects Career Skill calculation
		if (careerSkills && Object.keys(careerSkills).includes(ev.triggerName)) {
			let cSkillValues = Object.keys(careerSkills).map(sk => parseInt(attrs[sk],10)||4);
			let cSkill = await warSheet.calculateCareerSkill(targetCareer, cSkillValues, (attrs.unlocked == 1 ? false : true));
			h.mergeObj(output, cSkill);
		}
		// Check if Skill limit has been breached
		let triggerSkill = parseInt(ev.newValue);
		let triggerMax = parseInt(attrs[`${ev.sourceAttribute}_max`])||99;
		output[`${ev.sourceAttribute}_overmax`] = (triggerSkill > triggerMax) ? 1 : 0;
		// Pass off to tutorial if required
		if (attrs.tutorial_flag == '1') handleTutorial(1, attrs);
		else if (attrs.tutorial_flag == '3') handleTutorial(3, attrs);
		// Back to main function
		h.log(output, 'info', `Skill change completed`);
		as.setAttrs(output);
	}
	// Pass through CC Tutorial phases if running
	const handleTutorial = async (phase, attrs) => {
		let output = {};
		if (phase === 1) {
			let fives = 0, sixes = 0;
			skills.forEach(sk => {
				if (parseInt(attrs[sk]) > 5) sixes ++;
				else if (parseInt(attrs[sk]) === 5) fives ++;
			});
			output.initial_fives = 10 - fives;
			output.initial_sixes = 10 - sixes;
			// If all skillpoints have been used, proceed to the next tutorial phase in on(change:career)
			if (fives === 10 && sixes === 10) {
				output.tutorial_flag = 2;
				output.disable_career_flag = 0;
			}
		} else if (phase === 3) {
			let totalPoints = skills.reduce((a,v) => a += parseInt(attrs[v])||4, 0);
			let spent = totalPoints - (skills.length*4 + 30);
			output.initial_skillpoints = initialSkillpoints - spent;
			// If all skillpoints have been used, disable the tip
			if (spent > 9) output.tutorial_flag = 0;
		}
		
		if (!h.isEmptyObj(output)) await as.setAttrs(output).then(() => h.log(output, 'log', `handleTutorial`));
	}

	// Handle Adventuring Skills list when Career is changed
	const getNewCareerSkills = async (newCareer) => {
		// Grab Career Skills
		let careerSkills = warlockData.getSkills(newCareer)||null;
		h.log(careerSkills, 'log', `Skills:`);
		let careerSkillNames = Object.keys(careerSkills);
		let attrs = await as.getAttrs(skills.concat(skillsBoosted).concat(skillsMax).concat(['unlocked', 'tutorial_flag']));
		let output = {};
		// Calculate the Career Skill
		let careerSkillValues = careerSkillNames.map(sk => attrs[sk]||4);
		let cSkill = await warSheet.calculateCareerSkill(newCareer, careerSkillValues, (attrs.unlocked == 1 ? false : true));
		Object.assign(output, cSkill);
		// Progress the Tutorial if running
		if (attrs.tutorial_flag == 2) output.tutorial_flag = 3;
		// Change the Adventuring Skill maxima where required
		skills.map(sk => {
			h.log(`${sk}: ${attrs[sk]}, parse ${parseInt(attrs[sk])}`)
			let nonBoostedMax = Math.min(parseInt(attrs[sk])??0, 6),
				careerMax = parseInt(careerSkills[sk])||0,
				current = parseInt(attrs[sk]),
				currentMax = parseInt(attrs[`${sk}_max`])||0,
				isProf = (careerSkillNames.includes(sk)) ? true : false;
			output[`${sk}_max`] = isProf ? careerMax : (attrs[`${sk}_boosted`] == 1) ? Math.min(currentMax, current) : nonBoostedMax;
			output[`${sk}_prof`] = (isProf) ? 1 : 0;
			if (output[`${sk}_max`] < current) output[`${sk}_overmax`] = 1;
			h.log(`${sk} max set to: ${output[`${sk}_max`]}, nbm: ${nonBoostedMax}`);
		});
		h.log(output, 'info', `Career switch completed`);
		as.setAttrs(output, {silent: true});
	}

	// Caculate Career Skill value, parameters are career=@{career}, careerSkills = Array of current career skill values
	const calculateCareerSkill = async (career, careerSkills, calculateStaminaIncrease = false) => {
		let output = {};
		let sValues = Object.values(careerSkills);
		if (!sValues || !sValues.length) {h.log(`No skill values found`, 'error', `calculateCareerSkill`); return null}
		let average = Math.ceil(sValues.reduce((a, v) => a += parseInt(v)||4, 0)/sValues.length);
		h.mergeObj(output, {career_skill_name: h.emproper(career), career_skill_level: average});
		//h.log(average, 'info', `Calculated skill average`);
		// Calculate Stamina Increase from career skills
		if (calculateStaminaIncrease) {
			let reqIDs = await as.getSectionIDs('careerskill'),
				reqAttrs = reqIDs.map(row=>`repeating_careerskill_${row}_level`);
			let attrs = await as.getAttrs(reqAttrs);
			let stamIncrease = Object.values(attrs).reduce((a,v) => a = (parseInt(v) > 4) ? a + (v - 4) : a, 0) + (Math.max((average - 4), 0));
			h.log(stamIncrease, 'info', `Stamina increase from Career Levels`);
			h.mergeObj(output, {stamina_increase: stamIncrease});
		}
		//h.log(output, 'info', `calcCareerSkill return`);
		return output;
	}

	// Set new maxima for Career Skills when a Career is retired
	const setCareerMaxima = async (currentCareer, isCustomCareer=false) => {
		// Grab either the custom_prof flag, or the _prof flag depending on if the sheet is unlocked
		let profSuffix = (isCustomCareer) ? `custom_prof` : `prof`,
			reqAttrs = skills.concat(skillsMax).concat(skills.map(sk=>`${sk}_${profSuffix}`));
		let attrs = await as.getAttrs(reqAttrs);
		let output = {},
			currentCareerProfSkills = {};
		skills.forEach(sk => {
			if (parseInt(attrs[`${sk}_${profSuffix}`]) > 0) currentCareerProfSkills[sk] = attrs[`${sk}_max`]
		});
		for (let sk in currentCareerProfSkills) {
			//let careerMax = currentCareerProfSkills[sk]; OLD VALUE - can probably delete, pulls value from warlockData instead of sheet
			let careerMax = currentCareerProfSkills[sk];
			let careerCurrentValue = parseInt(attrs[sk])||4;
			let newMax = Math.min(careerCurrentValue, careerMax);
			if (newMax > 6) {
				output[`${sk}_max`] = newMax;
				output[`${sk}_boosted`] = 1;
			}
		}	
		h.log(output, 'info', `New Maxima:`);
		as.setAttrs(output, {silent: true});
	}

	// Set up Custom Career profs for unlocked sheet

	
	// Retire current Career, add current Career Skill to Past Career Skill rep sec
	const retireCareer = async () => {
		let output = {};
		let attrs = await as.getAttrs(['career', 'advanced_career', 'career_toggle', 'past_careers', 'career_skill_name', 'career_skill_level', 'unlocked', 'custom_career', 'custom_career_skill_level']);
		// Push Career to Past Careers
		let customCareer = (attrs.unlocked) == 1 ? true : false;
		let targetCareer = (customCareer) ? attrs.custom_career : (attrs.career_toggle == '1') ? attrs.advanced_career : attrs.career;
		if (!targetCareer || targetCareer === 'none') {h.log(attrs.career_toggle, 'error', `Invalid career toggle value`); return;}
		let pastArray = (attrs.past_careers) ? attrs.past_careers.split(/\s*,\s*/g).filter(v=>!/^\s+$/.test(v)) : [];
		pastArray.push(h.emproper(targetCareer));
		pastArray = pastArray.length ? pastArray : [''];
		h.log(pastArray, 'log', `Past Careers array: `);
		if (pastArray.length) setCareerMaxima(targetCareer, customCareer);
		output.past_careers = pastArray.join(', ');
		// Assign current Career Skill to Past Career Skills rep sec
		let careerSkillValues = (customCareer) ? [attrs.custom_career||'Unknown Career', attrs.custom_career_skill_level||0] : [attrs.career_skill_name||'Unknown Career', attrs.career_skill_level||0];
		Object.assign(output, h.createRepRow('careerskill', ['name', 'level'], careerSkillValues));
		await as.setAttrs(output);
		h.log(output, 'info', `Retire completed:`);
	}
	// Undo a Career Retire (for misclicks/mistakes, not intended for future character editing)
	const undoRetire = async () => {
		let ids = await as.getSectionIDs('careerskill');
		let reqAttrs = ids.map(row => `repeating_careerskill_${row}_name`).concat(['past_careers']);
		h.log(reqAttrs, 'info', `undoRetire getAttrs list`);
		let attrs = await as.getAttrs(reqAttrs)
		if (attrs.past_careers) {
			let pastArray = attrs.past_careers.split(/\s*,\s*/g).filter(v=>v);
			let remove = pastArray.pop();
			if (!pastArray.length) pastArray.push(' ');
			// Remove Career Skill if found
			let completed = false;
			let rxCar = new RegExp(`${remove}`, 'i');
			ids.map(row => {
				if (!completed && attrs[`repeating_careerskill_${row}_name`] && rxCar.test(attrs[`repeating_careerskill_${row}_name`])) {
					removeRepeatingRow(`repeating_careerskill_${row}`);
					completed = true;
				}
			});
			// Unsure if need to rectify any setCareerMaxima stuff here
			await as.setAttrs({past_careers: pastArray.join(', ')});
			h.log(pastArray, 'info', `Removed ${remove} from: `);
		}
	}

	const convertCurrency = async (coin) => {
		let reqAttrs = ['pennies', 'silver', 'gold'],
			coins = await as.getAttrs(reqAttrs),
			smallCoin = (/pen/i.test(coin)) ? 'pennies' : 'silver',
			largeCoin = (smallCoin === 'pennies') ? 'silver' : 'gold',
			origSmall = parseInt(coins[smallCoin])||null,
			origLarge = parseInt(coins[largeCoin])||null,
			newLarge = Math.floor(origSmall/10),
			remainderSmall = origSmall%10,
			totalLarge = newLarge + origLarge;
		if (origSmall == null || origLarge == null) return h.log(coins, 'info', `Converter`);
		let output = {[smallCoin]: remainderSmall, [largeCoin]: totalLarge};
		let currencyBase = `&{template:wart-description} {{title=Currency Conversion}} {{charname=@{character_name}}} {{subtitle=${h.emproper(smallCoin)} to ${h.emproper(largeCoin)}}} {{description=@{character_name} converted [[${origSmall}]] ${smallCoin} into [[${newLarge}]] ${largeCoin} and [[${remainderSmall}]] ${smallCoin}.}}`;
		let currencyRoll = await startRoll(currencyBase);
		as.setAttrs(output);
		finishRoll(currencyRoll.rollId);
	};

	// Post monster ability to chat
	const linkEffect = async (rowId) => {
		let linkType = (h.checkRowId(rowId)) ? 'r' : (/global/i.test(rowId)) ? 'g' : 'ab'; 
		let reqAttrs = (linkType === 'r') ? ['name', 'mods', 'source', 'duration', 'duration_type'].map(a=>`repeating_effect_${rowId}_${a}`) : linkType === 'ab' ? [`${rowId}_items`] : linkType === 'g' ? ['global_attack_bonus', 'global_defence_bonus'] : null;
		if (!reqAttrs) return h.log(rowId, 'error', `linkEffect: Illegal passthrough`);
		let attrs = await as.getAttrs(reqAttrs);
		let rep = `repeating_effect_${rowId}`
		let sub = (linkType === 'r') ? `***${attrs[`${rep}_name`]} (${attrs[`${rep}_source`]})***\nDuration: ${attrs[`${rep}_duration`]||''} ${attrs[`${rep}_duration_type`]||''}` : (linkType === 'ab') ? `${h.emproper(rowId)} Items` : `Global Modifiers`;
		let desc = (linkType === 'r') ? `${attrs[`${rep}_mods`]||''}` : (linkType === 'ab') ? `${attrs[`${rowId}_items`]||'&nbsp;'}` : `Attack: ${attrs.global_attack_bonus||0}\nDamage: ${attrs.global_damage_value||0}`;
		let linkBase = `&{template:wart-description}{{title=Current Effect}}{{color=#363905}}{{charname=@{character_name}}} {{subtitle=${sub}}} {{description=${desc}}}`;
		let linkRoll = await startRoll(linkBase);
		finishRoll(linkRoll.rollId);
	};

	// Quick create monster ability from dropdown
	const createAbility = async () => {
		let ability = await as.getAttrs(['ability_wizard_option']).then(v=>v['ability_wizard_option']);
		h.log(ability, 'info', `Creating monster ability`);
		let details = warlockData.creatureAbilities[ability];
		if (!details) return h.log(ability, 'error', `Monster ability not found`);
		let output = h.createRepRow('monster-ability', ['name', 'details', 'options-flag'], [h.emproper(ability), details, '0']);
		as.setAttrs(output, {silent:true});
	}

	return {
		handleSkillChange,
		calculateCareerSkill,
		setCareerMaxima,
		getNewCareerSkills,
		retireCareer,
		undoRetire,
		convertCurrency,
		linkEffect,
		createAbility,
	}

})();

/**
 *  6. REPEATING SECTION FUNCTIONS
 **/
const warRepeating = (() => {
// Possessions Section

	const weaponFlagMap = {
		martial: '',
		casual: '',
		slashing: 'S',
		crushing: 'C',
		piercing: 'P',
		blast: 'B',
		ranged: 'R'
	}
	const possessionAttributes = ['name', 'quantity', 'equipped', 'itemmods', 'weapon_link'];
	const effectAttributes = ['name', 'duration', 'duration_type', 'mods', 'flags', 'active', 'details', 'alert'];
	const itemFlagsMap = {
		weapon: 'W',
		armour: 'A',
		stats: 'S',
		shield: 'B',
	}

	const getAllModAttrs = async () => {
		let	allEffectIds = await as.getSectionIDs('effect'),
			allPossessionIds = await as.getSectionIDs('possession'),
			reqAttrs = ['npc', 'npc_armour'];
		allEffectIds.forEach(row=>effectAttributes.forEach(a=>reqAttrs.push(`repeating_effect_${row}_${a}`)));
		allPossessionIds.forEach(row => possessionAttributes.forEach(a => reqAttrs.push(`repeating_possession_${row}_${a}`)));
		return await as.getAttrs(reqAttrs);
	}

	const handlePossessionChange = async (rowId, trigger, eventValues) => {
		let output = {};
		let attrs = await getAllModAttrs();
		if (trigger === 'removed') { // Deal with a deleted row
			if (h.checkId(eventValues[`repeating_possession_${rowId}_weapon_link`])) removeRepeatingRow(`repeating_weapon_${eventValues[`repeating_possession_${rowId}_weapon_link`]}`);
			if (rxModTypes.test(eventValues[`repeating_possession_${rowId}_itemmods`])) h.mergeObj(output, await calculateEffectMods(attrs, rowId, {deleted: true}));
		} else if ( // If itemmods changed, or something with itemmods was (un)equipped
			(/equipped/i.test(trigger) && attrs[`repeating_possession_${rowId}_itemmods`])
			|| /itemmods/i.test(trigger)) {
				h.mergeObj(output, await calculateEffectMods(attrs, rowId));
		} else if (/name$/i.test(trigger) && h.checkId(attrs[`repeating_possession_${rowId}_weapon_link`])) { // Name change linked weapon
			output[`repeating_weapon_${attrs[`repeating_possession_${rowId}_weapon_link`]}_name`] = eventValues.newValue;
		}
		h.log(output, 'warn', 'handlePossessionChange finished, setting attrs');
		if (!h.isEmptyObj(output)) as.setAttrs(output, {silent:true});
	};

	const handleEffectChange = async (rowId, trigger, eventValues) => {
		let output = {};
		let attrs = await getAllModAttrs();
		if (trigger === 'removed' && rxModTypes.test(eventValues[`repeating_effect_${rowId}_mods`])) h.mergeObj(output, await calculateEffectMods(attrs, rowId, {deleted:true}));
		else if (/active/i.test(trigger) && rxModTypes.test(attrs[`repeating_effect_${rowId}_mods`])
				|| /mods/i.test(trigger)) h.mergeObj(output, await calculateEffectMods(attrs, rowId));
		h.log(output, 'warn', 'handleEffectChange completed');
		if (!h.isEmptyObj(output)) as.setAttrs(output, {silent:true});
	}

	const calculateEffectMods = async (attrs, triggerRow, options={}) => {
		let output = {}; 
		let validStats = skills.concat(['stamina', 'luck', 'luckroll', 'global_attack', 'global_damage']);
		// Initialise output object with empty values for global fields options
		validStats.map(st => output[`${st}_bonus`] = 0); 
		['armour_items', 'armour_values', 'shield_items', 'shield_values'].map(a=>output[a] = '');
		//sectionIds.map(row=>output[`repeating_possession_${row}_flags`] = []);
		let modRows = Object.entries(attrs).filter(e => /mods/i.test(e[0]) && rxModTypes.test(e[1]));
		h.log(modRows, 'info', `handleItemMods function, trigger: "${triggerRow}"`);
		let statBonus = {}, armourBonus = {}, blockBonus = {}, itemFlags = {possession: {}, effect: {}};
		if (attrs.npc == 1 && attrs.npc_armour) armourBonus[`Base`] = h.cleanRoll(attrs.npc_armour);
		await Promise.all(modRows.map(async (row) => {
			h.log(row[0]);
			let currentSection = (row[0].match(/repeating_([^_]*?)_/)||[])[1];
			let currentRow = (row[0].match(rx.rowId)||[])[0];
			let currentName = attrs[`repeating_${currentSection}_${currentRow}_name`];
			h.log(row, 'log', `Processing ${currentName} - ${currentRow}...`);
			if (!h.checkRowId(currentRow)) {h.log([row], 'error', `calculateEffectMods: bad row ID`); return null}
			if ((/possess/i.test(currentSection) && attrs[`repeating_possession_${currentRow}_equipped`] != 1) ||
				(/effect/i.test(currentSection) && attrs[`repeating_effect_${currentRow}_active`] != 1)) {
					h.log(`${currentName} is not equipped/active, skipping`);
					return;
				}
			let modTypes = row[1].split(/[\n\s]*[;]+[\n\s]*/g).filter(v=>rxModTypes.test(v));
			modTypes.map(mt => {
				let type = ((mt.match(rxModTypes)||[])[1]) || '';
				let mods = mt.replace(rxModTypes, '').split(/\s*,\s*/);
				h.log([type, mods], 'info', `Processing mod parts....`);
				// Calcs to run only on the triggering rep row
				if (/possess/i.test(currentSection) && triggerRow.toLowerCase() === currentRow.toLowerCase() && !options.deleted) {
					let weaponLink = attrs[`repeating_possession_${currentRow}_weapon_link`] || null;
					if (/weapon/i.test(type)) updateWeapon({type: 'possession', rowId: triggerRow}, mods, {possessionRowId: currentRow, possessionName: currentName, weaponRowId: weaponLink});
				}
				// Global calcs to always run
				if (/weapon/i.test(type)) itemFlags[currentSection][currentRow] ? itemFlags[currentSection][currentRow].push(itemFlagsMap.weapon) : itemFlags[currentSection][currentRow] = [itemFlagsMap.weapon];
				if (/(armor|armour)/i.test(type)) {	// Process armour/DR items
					itemFlags[currentSection][currentRow] ? itemFlags[currentSection][currentRow].push(itemFlagsMap.armour) : itemFlags[currentSection][currentRow] = [itemFlagsMap.armour];
					mods.map(mod => {
						let reductionExp = /heavy/i.test(mod) ? warlockData.armourTypes.heavy
							: /(medium|modest)/i.test(mod) ? warlockData.armourTypes.modest
							: /(light)/i.test(mod) ? warlockData.armourTypes.light
							: rx.attrMod.test(mod) ? h.cleanRoll(mod) : null;
						if (reductionExp) armourBonus[currentName] = reductionExp;
					});
				} else if (/shield/i.test(type)) { // Process shield/block items
					itemFlags[currentSection][currentRow] ? itemFlags[currentSection][currentRow].push(itemFlagsMap.shield) : itemFlags[currentSection][currentRow] = [itemFlagsMap.shield];
					h.log(`Processing ${type}...`);
					mods.map(mod => {
						let blockVal = /small/i.test(mod) ? warlockData.shieldTypes.small
							: /large/i.test(mod) ? warlockData.shieldTypes.large
							: rx.attrMod.test(mod) ? h.cleanRoll(mod) : null;
						if (blockBonus) blockBonus[currentName] = blockVal;
					});
				} else if (/stat/i.test(type)) { // Process all stat bonuses
					itemFlags[currentSection][currentRow] ? itemFlags[currentSection][currentRow].push(itemFlagsMap.stats) : itemFlags[currentSection][currentRow] = [itemFlagsMap.stats];
					h.log(`Processing ${type}...`);
					mods.map(mod => {
						h.log(`Processing ${mod}...`);
						let parts = mod.match(/^\s*([A-Za-z\s]+)([\dDd\s+-]+)/) || [];
						let modValue = parts[2];
						if (parts.length > 1) {
							// Convert attack & damage to globals
							parts[1] = (/^\s*(attack|damage)/i.test(parts[1])) ? `global_${parts[1]}` : parts[1];
							let rxName = new RegExp(`${parts[1].trim().replace(/\s+/g, '_')}`, 'i');
							h.log(rxName, 'log', `Finding name`);
							let attrName = validStats.find(st => rxName.test(st));
							if (attrName) {
								attrName += `_bonus`;
								statBonus[attrName] ? statBonus[attrName].push(modValue) : statBonus[attrName] = [modValue];
							}
						}
					});
				}				
			});
		}));
		h.log([statBonus, armourBonus, blockBonus, itemFlags], 'info', `Output from calculateEffectMods()`);
		// Now process the results into sheet attributes to be set
		await Promise.all([statBonus, armourBonus, blockBonus, itemFlags].map(async (o, i) => {
			h.log(``, 'info', `Collating item mods data`);
			//if (!h.isEmptyObj(o)) {
				if (i === 0) {
					h.log(`Processing stat bonuses`);
					for (let stat in o) {
						//output[stat] = o[stat].reduce((a, v) => a += v);
						output[stat] = o[stat].join(' + ').replace(/^\s*\+\s*/, '').replace(/\+\s*\+\s*/g, '+ ');
						output[`${stat}_display`] = h.getAverageOfMods(o[stat])||'???';
					}
				} else if (i === 1 || i === 2) {
					let target = (i === 1) ? 'armour' : 'block';
					h.log(`Processing ${target} bonuses`);
					let items = [], value = [];
					for (let item in o) {
						items.push(`${h.emproper(item)}: ${o[item]}`);
						value.push(o[item]);
					}
					output[`${target}_items`] = items.join(', ');
					output[`${target}_value`] = value.join(' + ').replace(/^\s*\+\s*/, '').replace(/\+\s*\+\s*/g, '+ ');
				} else if (i === 3) {
					for (let section in o) {
						for (let row in o[section]) {
							output[`repeating_${section}_${row}_flags`] = o[section][row].join('');
						}
					}
				}
			//}
		}));
		h.log(output, 'warn', 'Final output of itemmods()');
		return output;
	}
	
	// weapon: base 2h sword, damage custom 4d6, skill 
	// Update weapon from Possession link or damage_base change
	// 
	const updateWeapon = async (trigger, itemMods, linkData={possessionRowId: null, possessionName: null, weaponRowId: null}) => {
		const validWeaponMods = /(base|skill|damage|dmg|ranged|threat|dtype|damagetype)/i;
		let row = trigger.rowId;
		if (!h.checkRowId(row)) return h.log([trigger, itemMods], 'error', `updateWeapon: Invalid row ID`);
		let output = {};
		let flags = [];
		h.log([trigger, itemMods, linkData], 'log', 'updating weapon link');
		let weaponRowIds = await as.getSectionIDs('weapon');
		// Process the item mods/value changes
		let weaponData = {};
		if (/possess/i.test(trigger.type)) {
			weaponData = {damage: warlockData.weaponTypes.club.damage, attack_skill: 'blunt', damage_type: 'crushing', ranged: '0', attack_mod: '0'};
			if (linkData) h.mergeObj(weaponData, {name: linkData.possessionName, possession_link: linkData.possessionRowId});
			// If mod list contains a base weapon type, put it first so it can be overwritten
			itemMods.sort((a,b) => {
				if (/base/i.test(a)) return -1;
				else if (/base/i.test(b)) return 1;
			});
			h.log([itemMods], 'log', `Processing sorted mods`);
			await Promise.all(itemMods.map(async (mod) => {
				let modSubtype = (mod.match(validWeaponMods)||[])[1];
				if (!modSubtype) return h.log(mod, 'warn', `Weapon Mod cannot be processed!`);
				// Scrub dice rolls & command words from the mod
				let cleanMod = mod.replace(validWeaponMods, '').replace(/([\d+-]*d\d+|\b[+-]*\d+\b)/g, '').replace(/[+-]*/g, '').trim().replace(/\s+/g, '_'),
					rxMod = new RegExp(`${h.escapeRegex(cleanMod)}`, 'i');
				let weaponBase = (/base/i.test(modSubtype)) ? Object.keys(warlockData.weaponTypes).find(w => rxMod.test(w)) : null,
					damageBase = (/(dmg|damage)/i.test(modSubtype)) ? Object.keys(warlockData.weaponTypes).find(w => rxMod.test(w)) : null,
					skillBase = (/skill/i.test(modSubtype)) ? (/custom/i.test(rxMod)) ? 'custom' : skills.find(sk => rxMod.test(sk))||null : null,
					threatBase = (/threat/i.test(modSubtype)) && mod.match(/(casual|martial)/i) ? mod.match(/(casual|martial)/i)[1] : null,
					rangedBase = (/range/i.test(modSubtype)) ? (/(0|false)/i.test(mod)) ? '0' : '1' : null,
					dTypeBase = ((/(dtype|damagetype)/i.test(modSubtype)) && mod.match(/(piercing|slashing|crushing|blast)/i)) ? mod.match(/(piercing|slashing|crushing|blast)/i)[1] : null,
					rollExpression = mod.replace(/\s+/g, '_').replace(validWeaponMods, '').replace(rxMod, '').replace(/[^0-9d+-\s]/g, '')||``;
				if (weaponBase) {
					h.mergeObj(weaponData, {
						damage: weaponBase === 'custom' ? null : warlockData.weaponTypes[weaponBase].damage||null,
						damage_base: weaponBase,
						damage_type: weaponBase === 'custom' ? null : warlockData.weaponTypes[weaponBase].type||null,
						attack_skill: weaponBase === 'custom' ? null : warlockData.weaponTypes[weaponBase].skill||null,
						ranged: weaponBase === 'custom' ? null : warlockData.weaponTypes[weaponBase].ranged||'0',
						threat: weaponBase === 'custom' ? null : warlockData.weaponTypes[weaponBase].threat||'casual'
					});
				} else if (damageBase) {
					h.mergeObj(weaponData, {
						damage: damageBase === 'custom' ? rollExpression||null : warlockData.weaponTypes[weaponBase].damage,
						damage_custom: damageBase === 'custom' ? rollExpression||null : null,
						damage_base: damageBase,
					});		
				} else if (skillBase) {
					h.mergeObj(weaponData, {
						attack_skill: skillBase,
						attack_mod: rollExpression||null,
					});
				}
				else if (threatBase) h.mergeObj(weaponData, {threat: threatBase});
				else if (rangedBase) h.mergeObj(weaponData, {ranged: rangedBase});
				else if (dTypeBase) h.mergeObj(weaponData, {damage_type: dTypeBase});
			}));
		}
		if (/damage/i.test(trigger.type)) {
			if (/^cdam/.test(trigger.type) || itemMods[0] === 'custom') {
				let customDamage = await as.getAttrs([`repeating_weapon_${row}_damage_custom`]).then(v=>(Object.values(v)||[])[0]||null);
				h.mergeObj(weaponData, {
					damage: customDamage
				});
			} else if (/^dam/i.test(trigger.type)) {
				let damageBase = itemMods[0];
				if (!warlockData.weaponTypes[damageBase]) return h.log(damageBase, 'warn', 'weaponUpdate: illegal value received');
				h.mergeObj(weaponData, {
					damage: warlockData.weaponTypes[damageBase].damage||null,
					damage_type: warlockData.weaponTypes[damageBase].type||null,
					attack_skill: warlockData.weaponTypes[damageBase].skill||null,
					ranged: warlockData.weaponTypes[damageBase].ranged||'0',
					threat: warlockData.weaponTypes[damageBase].threat||'casual'
				});
			}
		}
		if (/(flags|cdam)/i.test(trigger.type)) {
			let reqAttrs = ['damage_type', 'ranged', 'threat'];
			let attrs = await as.getAttrs(reqAttrs.map(a => `repeating_weapon_${row}_${a}`));
			reqAttrs.map(a => weaponData[a] = attrs[`repeating_weapon_${row}_${a}`]);
		}
		// Finish Item flags
		flags.push(weaponData.threat === 'martial' ? weaponFlagMap.martial : weaponFlagMap.casual);
		if (Object.keys(weaponFlagMap).includes(weaponData.damage_type)) flags.push(weaponFlagMap[weaponData.damage_type]);
		if (weaponData.ranged == 1) flags.push(weaponFlagMap.ranged);
		weaponData.flags = flags.join('');
		// Process flag-only update
		if (/^flag/i.test(trigger.type)) output[`repeating_weapon_${row}_flags`] = weaponData.flags;
		// Process damage_base or possession weapon update
		else {
			let existingWeapon = (/damage/i.test(trigger.type)) ? row : (linkData.weaponRowId && weaponRowIds.includes(`${linkData.weaponRowId}`.toLowerCase())) ? linkData.weaponRowId : null;// || Object.entries(attrs).find(a => a[1].toLowerCase() === linkData.possessionRowId && /_link/i.test(a[0]));
			if (!existingWeapon) {
				let newAttrs = h.createRepRow('weapon', Object.keys(weaponData), Object.values(weaponData), {returnId: true});
				h.mergeObj(output, Object.values(newAttrs)[0]);
				let newRowId = Object.keys(newAttrs)[0];
				output[`repeating_possession_${linkData.possessionRowId}_weapon_link`] = newRowId;
			} else {
				h.log(existingWeapon, 'log', 'Found existing weapon');
				//let rowId = h.getRowId(existingWeapon[0]);
				let newAttrs = h.createRepRow('weapon', Object.keys(weaponData), Object.values(weaponData), {existingId: existingWeapon});
				h.mergeObj(output, newAttrs);
			}
		}
		// Output object should be ready for setting
		h.log(output, 'warn', `updateWeapon: final output`);
		as.setAttrs(output, {silent:true});
	};

	const handleReadiedWeapon = async (readiedAttrs, trigger) => {
		let output = {};
		delete readiedAttrs.react;
		for (let r in readiedAttrs) output[r] = 0;
		output[trigger[0]] = trigger[1];
		output.readied_weapon = (trigger[1] == 1) ? h.getRowId(trigger[0])||0 : 0;
		h.log(output, 'warn', `handleReadiedWeapon output`);
		as.setAttrs(output, {silent:true});
	};

	const applyEffect = async (effectData) => {
		let attrs = ['name', 'mods', 'source', 'duration', 'duration_type', 'options-flag'];
		let durationExpression = (effectData.duration.match(/(\d*d\d+)/)||[])[1];
		let durationValue;
		if (durationExpression) {
			let durationBase = `&{template:wart-description}{{title=Duration Roll}}{{charname=@{character_name}}} {{subtitle=${effectData.name}}} {{description=${effectData.source} takes effect for [[${durationExpression}]] ${effectData.durationType}.}}`;
			let durationRoll = await startRoll(durationBase);
			durationValue = (isNaN(durationRoll.results.description.result)) ? 0 : durationRoll.results.description.result;
			finishRoll(durationRoll.rollId);
		} else {
			durationValue = (effectData.duration.match(/\d+/)||[])[0] || 0;
		}
		let values = [effectData.name||'New Effect', effectData.effect||'', effectData.source||'Spell', durationValue, effectData.durationType||'rounds', '0'];
		let output = h.createRepRow('effect', attrs, values);
		as.setAttrs(output);
	};

	const linkAbility = async (rowId) => {
		let abRow = `repeating_monster-ability_${rowId}`,
			reqAttrs = ['name', 'details'];
		let attrs = await as.getAttrs(reqAttrs.map(a=>`${abRow}_${a}`));
		let abilityBase = `&{template:wart-description}{{title=Monster Ability}}{{color=#915e00}}{{charname=@{character_name}}} {{subtitle=${attrs[`${abRow}_name`]||'Ability'}}} {{description=${attrs[`${abRow}_details`]||'-'}}}`;
		let abilityRoll = await startRoll(abilityBase);
		finishRoll(abilityRoll.rollId);
	};

	return {
		getAllModAttrs,
		calculateEffectMods,
		handlePossessionChange,
		handleEffectChange,
		updateWeapon,
		handleReadiedWeapon,
		applyEffect,
		linkAbility,
	}
})();

/**
 * 7. DICE ROLL FUNCTIONS
 * Normal & Reactive roll functions
 */
const roll = (() => {
	// Template-related constants
	const t = {
		roll: `&{template:wart-roll}`,
		damage: `&{template:wart-damage}`,
		desc: `&{template:wart-description}`
	}
	const color = {
		skill: `{{color=#004f00}}`,
		attack: `{{color=#a20000}}`,
		defend: `{{color=#600404}}`,
		spell: `{{color=#570257}}`,
		damage: `{{color=#07043f}}`,
		description: ``,
	}
	const prop = {
		coreDie: `1d20`,
		skillTarget: 20,
		name: `{{charname=@{character_name}}}`,
		reactInit: `{{react=1}}`,
		skillAbbr(skill) {return skill.slice(0, 4).toUpperCase()},
		async getWeaponAttrs(rowId, nonRepAttrs=[]) {
			nonRepAttrs.push('npc', 'global_attack_bonus', 'global_damage_bonus');
			let defWeapRow = `repeating_weapon_${rowId}`;
			let rowAttrs = (h.checkRowId(rowId)) ? weaponAttributes.map(a=>`${defWeapRow}_${a}`) : [];
			let wAttrs = await as.getAttrs(h.toArray(nonRepAttrs).concat(rowAttrs).concat(skillsBonus).concat(skills));
			let output = {
				name: wAttrs[`${defWeapRow}_name`],
				ranged: (wAttrs[`${defWeapRow}_ranged`] == 1) ? 1 : 0,
				skillName: (wAttrs.npc == 1) ? wAttrs[`${defWeapRow}_name`] : wAttrs[`${defWeapRow}_attack_skill`],
				skill: (wAttrs.npc == 1 || /custom/i.test(wAttrs[`${defWeapRow}_attack_skill`])) ? parseInt(wAttrs[`${defWeapRow}_attack_mod`])
					: wAttrs[wAttrs[`${defWeapRow}_attack_skill`]]||null,
				skillMod: (wAttrs.npc ==1) ? null : parseInt(wAttrs[`${defWeapRow}_attack_mod`]) > 0 ? wAttrs[`${defWeapRow}_attack_mod`] : null,
				skillBonus: (wAttrs.npc ==1) ? null : wAttrs[`${wAttrs[`${defWeapRow}_attack_skill`]}_bonus`]||null,
				damage: wAttrs[`${defWeapRow}_damage`],
				damageType: wAttrs[`${defWeapRow}_damage_type`],
				react: (wAttrs.react == 1) ? prop.reactInit : null,
				npc: wAttrs.npc == 1 ? true : false,
				globalAttack: wAttrs.global_attack_bonus||null,
				globalDamage: wAttrs.global_damage_bonus||null,
				weaponId: rowId,
				attrs: wAttrs,
			}
			h.log(output, 'info', `getWeaponAttrs output:`);
			return output;
		},
		async getSpellAttrs(rowId, nonRepAttrs=[]) {
			let defSpRow = `repeating_spell_${rowId}`;
			let spAttrs = await as.getAttrs(nonRepAttrs.concat(spellAttributes.map(a=>`${defSpRow}_${a}`)));
			let output = {
				name: spAttrs[`${defSpRow}_name`]||'Spell',
				type: (spAttrs[`${defSpRow}_type`]||'').toLowerCase()||'spellcard',
				desc: spAttrs[`${defSpRow}_description`]||'',
				effect: spAttrs[`${defSpRow}_mods`]||'',
				cost: spAttrs[`${defSpRow}_cost`]||0,
				skillName: spAttrs[`${defSpRow}_attack_skill`],
				skill: /custom/i.test(spAttrs[`${defSpRow}_attack_skill`]) ? spAttrs[`${defSpRow}_attack_mod`]
					: spAttrs[`${defSpRow}_attack_skill`]||null,
				damage: spAttrs[`${defSpRow}_damage`]||null,
				damageType: spAttrs[`${defSpRow}_damage_type`]||null,
				ranged: (spAttrs[`${defSpRow}_ranged`] == 1) ? 1 : 0,
				react: (spAttrs.react == 1) ? prop.reactInit : null,
				duration: spAttrs[`${defSpRow}_duration`]||0,
				durationType: spAttrs[`${defSpRow}_duration_type`]||'rounds',
				npc: spAttrs.npc == 1 ? true : false,
				globalAttack: spAttrs.global_attack_bonus||null,
				globalDamage: spAttrs.global_damage_bonus||null,
				weaponId: rowId,
				attrs: spAttrs,
			}
			return output;
		},
	}

	const rollEscape = {
		chars: {
			'"': '%quot;',
			',': '%comma;',
			':': '%colon;',
			'}': '%rcub;',
			'{': '%lcub;',
		},
		escape(str) {
			str = (typeof(str) === 'object') ? JSON.stringify(str) : (typeof(str) === 'string') ? str : null;
			return (str) ? `${str}`.replace(new RegExp(`[${Object.keys(this.chars)}]`, 'g'), (r) => this.chars[r]) : null;
		},
		unescape(str) {
			str = `${str}`.replace(new RegExp(`(${Object.values(this.chars).join('|')})`, 'g'), (r) => Object.entries(this.chars).find(e=>e[1]===r)[0]);
			//h.log(str);
			return JSON.parse(str);
		}
	}
	// ROLL HELPERS
	// Outputs an array with [0] as the selected char ID, each other index will match input extra Attrs requested
	const getSelected = async (extraAttributes) => {
		extraAttributes = h.toArray(extraAttributes);
		let attrsText = (extraAttributes) ? extraAttributes.map((a,i) => `{{extra${i}=[[0[@{selected|${a}}]]]}} `) : [];
		let idGrab = await startRoll(`! {{charid=[[0[@{selected|character_id}]]]}} ${attrsText.join('')}`);
		let selectId = (idGrab.results.charid.expression.match(rx.id)||[])[0];
		let attrs = (extraAttributes) ? extraAttributes.map((a,i)=>((idGrab.results[`extra${i}`].expression.match(rx.grabAttr)||[])[1])||null) : [];
		finishRoll(idGrab.rollId);
		let output = [selectId].concat(attrs);
		h.log(output, 'info', `getSelected results:`);
		return output;
	};

	// Check the player has permission on the action button clicked. Workaround for Roll20 bug.
	const checkSheetPermission = async (charname, attr='npc') => {
		if (charname == null) {
			h.log(charname, 'warn', `Sheet permission check skipped due to bad charName received:`);
			return;
		}
		let res = await startRoll(`! &{noerror} {{grabVal=[[0[@{${charname}|${attr}}] ]] }}`);
		let val = (res.results.grabVal.expression.match(rx.grabAttr)||[])[1];
		let rxFail = new RegExp(`^${h.escapeRegex(charname)}|${attr}$`, 'i');
		let result = true;
		if (rxFail.test(val) || val == null) result = false;
		h.log(result, 'log', 'checkSheetPermission result:');
		finishRoll(res.rollId);
		return result;
	}

	// ROLL FUNCTIONS
	// Roll & Apply initial values for base stats
	const stamLuck = async (targetStat, result) => {
		let acId = getActiveCharacterId();
		if (!result) { // Send roll to chat for approval
			let formula = /stam/i.test(targetStat) ? `2d6+12` : `1d6+7`;
			let rollBase = `${t.roll}${prop.name} {{title=New Character}} {{subheader=${targetStat}}}  {{roll1name=${formula}}} {{roll1=[[${formula}]]}} {{calcbutton=[Accept](~${acId}|apply_${targetStat}}} {{calclink=[[0]]}} {{notes=Click "Accept" to apply roll to character sheet}}`;
			let roll = await startRoll(rollBase);
			let stat = roll.results.roll1.result;
			await finishRoll(roll.rollId, {calclink: `${stat}`});
		} else { // Apply roll once approved
			as.setAttrs({[`${targetStat}_base`]: result, [targetStat]: result});
		}
	}

	// Roll Skill Check
	const skillCheck = async (skillName, attrName) => {
		attrName = attrName||skillName;
		let attrs = await as.getAttrs([attrName, `${attrName}_bonus`]),
			skillExpression = h.combineRollParts(attrs[attrName]||0, attrs[`${attrName}_bonus`]);
		let rollBase = `${t.roll}${prop.name}${color.skill} {{title=Skill Check}} {{subheader=${h.emproper(skillName)}}} {{roll1name=+${skillExpression}}} {{roll1=[[${prop.coreDie} + ${skillExpression}]]}}`;
		let skillRoll = await startRoll(rollBase);
		let rollData = {};
		finishRoll(skillRoll.rollId, rollData);
	}

	const luckRoll = async () => {
		let attrs = await as.getAttrs(['luck', 'luckroll_bonus']),
			luckVal = parseInt(attrs.luck),
			hasLuck = (luckVal > 0) ? true : false,
			luckBonus = parseInt(attrs.luckroll_bonus) > 0 ? ` +${attrs.luckroll_bonus}[Bonus]` : ``;
		let rollBase = hasLuck ? `${t.roll}${prop.name} {{title=Luck Check}} {{subheader=Luck}} {{roll1name=+@{luck}[Luck]${luckBonus}}} {{roll1=[[${prop.coreDie} + @{luck}}[Luck]${luckBonus}]]}} {{notes=1 Luck point subtracted, ${luckVal - 1} remaining}}` : `/w "@{character_name}" No luck points to spend!`
		let luckRoll = await startRoll(rollBase);
		// add success/failure in here?
		await finishRoll(luckRoll.rollId);
		if (hasLuck) setAttrs({luck: luckVal-1});
	}

	const rest = async () => {
		let attrs = await as.getAttrs(['stamina', 'stamina_max']);
		let hiddenQuery = `! {{rest=[[0[?{Short or Full Rest?|Short|Full}]]]}}`;
		let query = await startRoll(hiddenQuery);
		let restType = (query.results.rest.expression.match(/^0\[(.*)\]\s*$/)||[])[1];
		if (!restType) return;
		let restMultiplier = /short/i.test(restType) ? 0.5 : 1,
			maxRestored = restMultiplier * parseInt(attrs.stamina_max),
			missing = parseInt(attrs.stamina_max) - parseInt(attrs.stamina),
			newStamina = Math.ceil(Math.min(maxRestored, missing)) + parseInt(attrs.stamina);
		await finishRoll(query.rollId);
		let restBase = `${t.damage}${prop.name} {{title=${restType} Rest}} {{subheader=Recover Stamina}} {{damageroll1name=Maximum: +${maxRestored}}} {{damageroll1=Restored [[${Math.ceil(Math.min(missing, maxRestored))}]] Stamina.}} {{notes=@{character_name} restored to ${newStamina}/${attrs.stamina_max} Stamina}}`;
		let restRoll = await startRoll(restBase);
		finishRoll(restRoll.rollId);
		setAttrs({stamina: newStamina});
	}

	// Standard Defence roll
	const defendRoll = async (rowId) => {
		let wp = await prop.getWeaponAttrs(rowId),
			rollExpression = h.combineRollParts(wp.skill, wp.skillBonus, null, {base: h.emproper(wp.skillName)||'Skill'});
		let rollBase = `${t.roll}${prop.name}${color.defend}{{title=Defend Roll}}{{subheader=${h.emproper(wp.name)}}} {{roll1name=+${rollExpression}}} {{roll1=[[${prop.coreDie} + ${rollExpression}]]}}`;
		let defendRoll = await startRoll(rollBase);
		finishRoll(defendRoll.rollId);
	}

	const damageRoll = async (rowId) => {
		let wp = await prop.getWeaponAttrs(rowId),
			rollExpression = h.combineRollParts(wp.damage, null, wp.globalDamage);
		let damageBase = `${t.damage}${prop.name}${color.damage}{{title=Damage Roll}}{{subheader=${wp.name}}} {{damageroll1name=${rollExpression}}} {{damageroll1=[[${rollExpression}]]}} {{damagetype= ${h.emproper(wp.damageType)}}} {{link=[Roll Crit](~repeating_weapon_${rowId}_rollcrit)}}`;
		let damageRoll = await startRoll(damageBase);
		finishRoll(damageRoll.rollId);
	}

	const critRoll = async (rowId) => {
		let wp = await prop.getWeaponAttrs(rowId);
		let damageType = wp.damageType.toLowerCase();
		let critMod = await startRoll(`! {{mod=[[0[?{Bonus to crit roll?|0|1|2|3|4|5|6|7|8+,8}]]]}}`).then(async (r) =>{
			let mod = (r.results.mod.expression.match(rx.grabAttr)||[])[1]||0;
			finishRoll(r.rollId);
			return mod;
		});
		if (!isNaN(critMod) && warlockData.getDamageTypes().includes(damageType)) {
			let critTop = `${t.desc}{{title=Critical Strike!}} {{subtitle=${h.emproper(damageType)} - [[2d6 + ${critMod}]]}} {{description=@{character_name} rolls for a crit.}} {{classdesc=crit}}`;
			let critRollTop = await startRoll(critTop);
			let critResult = Math.min(10, Math.max(critRollTop.results.subtitle.result, 2));
			let critString = warlockData.critTables[damageType][critResult];
			let critBottom = `${t.desc}${prop.name}{{class=bottom}}{{description=${critString}}}`;
			let critRollBottom = await startRoll(critBottom);
			await finishRoll(critRollTop.rollId);
			finishRoll(critRollBottom.rollId);
		}
	}

	// Hybrid reactive/non-reactive roll
	const spellRoll = async (rowId) => {
		let sp = await prop.getSpellAttrs(rowId, ['incantation', 'incantation_bonus', 'stamina', 'react', 'character_name']),
			stamina = parseInt(sp.attrs.stamina) > 0 ? parseInt(sp.attrs.stamina) : null;
		h.log(sp, 'info', `spellRoll getAttrs`);
		if (!stamina || stamina < sp.cost) {
			let abort = startRoll(`${t.desc}{{description=@{character_name} doesn't have the ${sp.cost} Stamina to cast ${sp.name}}}`);
			finishRoll(abort.rollId);
		} else {
			let acId = getActiveCharacterId(),
				spellExpression = h.combineRollParts(sp.attrs.incantation||0, sp.attrs.incantation_bonus||0, null);
			let spellBase = `${t.roll}${color.spell}${prop.name}${sp.react} {{title=${sp.name} Casting Check}} {{success=[[0]]}} {{reactdata=[[0]]}} {{reactbutton1name=[[1]]}} {{reactbutton2name=[[2]]}} {{outcome=[[0]]}} {{reactsubheader=Incantation}} {{reactroll1name=+${spellExpression}}} {{reactroll1=[[${sp.react ? `${prop.coreDie} + ${spellExpression}` : `0`}]]}} {{subheader=Incantation}} {{roll1name=+${spellExpression}}} {{roll1=[[${sp.react ? `0` : `${prop.coreDie}`} +${spellExpression}]]}} {{reactbutton3name=[[3]]}} {{linksuccess=[Cast](~repeating_spell_${rowId}_rollcast)}} {{linkfailure=On a [[1cf1cs0]] - [Miscast](~rollmiscast)}}  ${sp.cost ? `{{notes=@{character_name}'s Stamina reduced by ${sp.cost}}}` : ``} {{reactbutton1label=[0](~${acId}|react-cast}} {{reactbutton2label=[0](~${acId}|react-miscast}}`;
			let spellRoll = await startRoll(spellBase);
			let rollResult = (sp.react) ? spellRoll.results.reactroll1.result : spellRoll.results.roll1.result;
			let castSuccess = (rollResult - prop.skillTarget > -1);
			let critFail = (sp.react && spellRoll.results.reactroll1.dice[0] < 2) ? true : null;
			h.mergeObj(sp, {
				roll: rollResult,
				cast: castSuccess,
				row: rowId,
				id: acId,
				charname: sp.attrs.character_name,
			});
			let rollData = {
				success: rollResult - prop.skillTarget,
				outcome: castSuccess ? `Spell cast successfully` : `Spell miscast!`,
				reactdata: rollEscape.escape(sp),
			};
			if (castSuccess) rollData.reactbutton1name = `Cast Spell`;
			else if (critFail) rollData.reactbutton2name = `Wrath of the Otherworld Roll`;
			else rollData.reactbutton3name = `None, spellcast failed.`
			as.setAttrs({stamina: stamina - sp.cost});
			finishRoll(spellRoll.rollId, rollData);
		}
	};

	// Wrath of the Otherworld check
	const spellMiscast = async (rollData) => {
		let spellname = (rollData) ? `${h.emproper(rollData.name)}` : 'Spell';
		let attrs = await as.getAttrs(['incantation', 'incantation_bonus']),
			rollExpression = h.combineRollParts(attrs.incantation, attrs.incantation_bonus, null),
			miscastBase = `${t.roll}${color.spell}${prop.name} {{title=${spellname} Miscast Check}} {{subheader=Incantation}} {{roll1name=+${rollExpression }}} {{roll1=[[${prop.coreDie} + ${rollExpression}]]}} `;
		let miscastRoll = await startRoll(miscastBase);
		let mcResult = miscastRoll.results.roll1.result;
		finishRoll(miscastRoll.rollId);
		if (mcResult < prop.skillTarget) {
			let wrathTop = `${t.desc}${color.spell} {{title=Wrath of the Otherworld}} {{subtitle=${prop.coreDie} - [[1d20]]}} {{description=***@{character_name}*** has attracted the Wrath of the Otherworld!}} {{classdesc=crit}}`;
			let wrathTopRoll = await startRoll(wrathTop),
				result = Math.min(Math.max(wrathTopRoll.results.subtitle.result, 1), 20),
				wrathString = warlockData.miscastTable[result];
			let wrathBottom = `${t.desc}${prop.name}${color.spell} {{description=${wrathString}}}`;
			let wrathBottomRoll = await startRoll(wrathBottom);
			await finishRoll(wrathTopRoll.rollId);
			finishRoll(wrathBottomRoll.rollId);
		}
	};

	// Reactive version
	on('clicked:react-miscast', async (ev) => {
		let spellData = rollEscape.unescape(ev.originalRollId);
		if (!await checkSheetPermission(spellData.charname)) return h.log(`Failed action button permission check`, 'error', `react-apply-damage`); 
		h.log(spellData, 'info', 'Spell passthrough');
		spellMiscast(spellData);
	})

	// Successful Cast
	const spellCast = async (rowId) => {
		let sp = await prop.getSpellAttrs(rowId);
		if (sp.type === 'attack') {
			attackRoll(rowId, true);
		} else {
			let castBase = `${t.desc}${prop.name}${color.spell}{{title=${sp.name}}} {{subtitle=Successfully cast for ${sp.cost} Stamina}} {{description=${sp.desc}}}`;
			let castRoll = await startRoll(castBase);
			finishRoll(castRoll.rollId);
		}
	}

	// Reactive cast
	on('clicked:react-cast', async (ev) => {
		let spellData = rollEscape.unescape(ev.originalRollId);
		if (!await checkSheetPermission(spellData.charname)) return h.log(`Failed action button permission check`, 'error', `react-apply-damage`); 
		h.log(spellData, 'info', 'Spell passthrough');
		if (spellData.type === 'attack') {
			attackRoll(spellData.row, true);
		} else {
			let fx = rxModTypes.test(spellData.effect) ? `\n***Effects:*** ${spellData.effect}` : ``;
			let castBase = `${t.desc}${prop.name}${color.spell}{{reactdescription=[[0]]}} {{reactdata=[[0]]}} {{reactbutton1name=[[1]]}} {{title=${spellData.name}}} {{subtitle=Successfully cast for ${spellData.cost} Stamina}} {{description=${spellData.desc}${fx}}} {{reactbutton1label=[3](~selected|apply-effect}}`;
			let castRoll = await startRoll(castBase);
			let rollPassThrough = {
				effect: spellData.effect,
				source: 'Spell',
				name: spellData.name||'New Effect',
				duration: spellData.duration||0,
				durationType: spellData.durationType||'rounds',
				sourceCharacter: spellData.charId
			};
			let rollData = {
				reactdata: rollEscape.escape(rollPassThrough),
			};
			if (fx) rollData.reactbutton1name = `Apply spell Effect to selected`;
			finishRoll(castRoll.rollId, rollData);
		}
	})

	const spellLink = async (rowId) => {
		let sp = await prop.getSpellAttrs(rowId),
			type = /attack/i.test(sp.type) ? `Attack Spell` : `Spell`,
			desc = sp.desc||'No description.',
			attackString = /attack/i.test(sp.type) ? `Skill: ${h.emproper(sp.skillName)||'Custom'}${sp.ranged ? `\nRanged Attack` : ``}\nDamage: ${sp.damage||`Unknown`} ${sp.damageType}\n-=-\n` : ``;
		let linkBase = `${t.desc} {{color=grey}} {{charname=Spell not cast}} {{title=${sp.name}\nSpell Information}} {{subtitle=${type}}} {{description=${attackString}${desc}}};`;
		let linkRoll = await startRoll(linkBase);
		finishRoll(linkRoll.rollId);
	}

	// Hybrid function, does normal roll and initiates Attack Reaction chain if {{react=1}}
	const attackRoll = async (rowId, spellAttack=false) => {
		let acId = getActiveCharacterId();
		let att = (!spellAttack) ? await prop.getWeaponAttrs(rowId, ['react', 'character_name']) : await prop.getSpellAttrs(rowId, ['react', 'character_name']),
			rollExpression = h.combineRollParts(att.skill, att.skillBonus, att.globalAttack, {base: h.emproper(att.skillName)}, {Mod: att.skillMod, Attacker: `5`});
		let attackRollBase = `${t.roll} ${prop.name} ${spellAttack ? color.spell : color.attack} ${att.react ? att.react : ''} {{link=[Roll Damage](~repeating_weapon_${rowId}_rolldamage)}} {{title=Attack Roll}} {{subheader=${h.emproper(att.name)}}} {{reactsubheader=${h.emproper(att.name)}}} {{roll1name=+ ${rollExpression}}} {{roll1=[[${att.react ? '0' : `${prop.coreDie} + ${rollExpression}`}]]}} {{ranged=[[${att.ranged}]]}} {{reactroll1name=+ ${rollExpression}}} {{reactroll1=[[${att.react ? `${prop.coreDie} + ${rollExpression}` : '0'}]]}} {{reactbutton1label=[0](~selected|react-defend}} {{reactbutton1name=[[0]]}} {{reactdata=[[1]]}}`;
		//h.log(att, 'info', `attackRoll getAttrs data`);
		let attackRoll = await startRoll(attackRollBase);
		h.mergeObj(att, {
			charname: att.attrs.character_name,
			id: acId,
			result: attackRoll.results.reactroll1.result,
			spellAttack: spellAttack,
		});
		let rollString = rollEscape.escape(att);
		await finishRoll(attackRoll.rollId, {
			reactdata: rollString,
			reactbutton1name: `Defend Selected Token`,
			reactroll1: attackRoll.results.reactroll1.result,
		});
	};

	/**
	 * REACTION ROLLS BELOW - EXPERIMENTAL!
	 */

	
	// This is a big roll function - it needs to pick up data from whoever clicks the "defend selected token button", then find all their defend data, then do the roll, then work out which buttons to show depending on the outcome
	on('clicked:react-defend', async (ev) => {
		// Grab attack info from passthrough
		//h.log(ev, 'log', 'react-defend passthrough');
		let att = rollEscape.unescape(ev.originalRollId);
		// Get defender info
		let selectedAttrs = await getSelected('readied_weapon');
		if (!selectedAttrs || !selectedAttrs.length) return h.log(selectedAttrs, 'error', `getSelected failed!`);
		as.setActiveCharacterId(selectedAttrs[0]);
		let def = await prop.getWeaponAttrs(selectedAttrs[1], ['character_name', 'block_value', 'block_items']);
		def.id = selectedAttrs[0];
		def.charname = def.attrs.character_name;
		// If no weapon is readied, or if the attack was ranged, use DODGE
		if (!def.skill || att.ranged) h.mergeObj(def, {
			name: 'dodge',
			skillName: 'dodge',
			skill: def.attrs.dodge||0,
			skillBonus: def.attrs.dodge_bonus||0,
			globalAttack: null,
		});
		// Construct roll expressions & roll template
		let defendExpression = h.combineRollParts(def.skill, def.skillBonus, null, {base: h.emproper(def.skillName)}),
			blockExpression = /\d/.test(def.attrs.block_value) ? ` + (${def.attrs.block_value})[Block]` : ``,
			blockString = blockExpression.length ? `\n${`${def.attrs.block_items}`.replace(/\s*,\s*/g, '\\n')}` : '';
		h.log([att,def], 'log', `Attacker/Defender info`);

		let defendRollBase = `${t.roll}${color.defend}${prop.reactInit} {{title=Defend Roll}} {{charname=@{selected|character_name}}} {{reactsubheader=${def.name}}} {{reactdata=[[0]]}} {{reactbutton1name=[[1]]}} {{reactbutton2name=[[2]]}} {{reactbutton3name=[[3]]}} {{reactbutton4name=[[4]]}} {{reactbutton5name=[[5]]}} {{reactbutton6name=[[6]]}} {{reactroll1name=+ ${defendExpression}${blockString}}} {{reactroll1=[[${prop.coreDie} + ${defendExpression}${blockExpression}]]}} {{reactbutton1label=[0](~${att.id}|react-damage}} {{reactbutton2label=[0](~${def.id}|react-damage}} {{reactbutton4label=[0](~${att.id}|react-luck}} {{reactbutton5label=[0](~${def.id}|react-luck}} {{reactvs=vs ${att.charname}'s attack roll: ${att.result}}} {{reactoutcome=[[8]]}}`;
		// Start the roll
		let defendRoll = await startRoll(defendRollBase);
		//h.log(defendRoll, 'info');
		// Find winner of contest, details & margin
		def.result = defendRoll.results.reactroll1.result;
		let winnerAD = (def.result === att.result) ? null : (def.result > att.result) ? 'defender' : 'attacker';
		let mightyBlow = (Math.max(def.result, att.result) / Math.min(def.result, att.result) >= 3) ? true : false;
		let dodgeOnly = (winnerAD === 'defender' && def.skillName === 'dodge') ? true : false;
		// Assemble pass-through data
		delete def.attrs;
		let rollPassThrough = {
			attacker: att,
			defender: def,
			result: {
				winner: winnerAD,
				loser: (winnerAD) ? (winnerAD === 'defender') ? 'attacker' : 'defender' : null,
				mighty: mightyBlow,
				dodge: dodgeOnly,
			}
		}
		// Assemble the roll data for finishRoll()
		let rollData = {
			reactoutcome: (!winnerAD) ? `The contest was drawn! ${att.charname} or ${def.charname} can try their luck to break the stalemate.` : (dodgeOnly) ? `${def.charname} dodged the attack!` : `${rollPassThrough[winnerAD].charname} won the contest!`,
			reactdata: rollEscape.escape(rollPassThrough),
		};
		// Enable the appropriate reactive roll buttons, depending on the outcome
		if (winnerAD === 'attacker') {
			h.mergeObj(rollData, {
				reactbutton1name: `${att.charname} rolls damage:`
			});
		} else if (winnerAD === 'defender' && !dodgeOnly) {
			h.mergeObj(rollData, {
				reactbutton2name: `${def.charname} rolls damage:`
			});
		} else if (dodgeOnly) {
			h.mergeObj(rollData, {
				reactbutton3name: `None - ${def.charname} dodged the attack.`
			});
		} else if (!winnerAD) {
			h.mergeObj(rollData, {
				reactbutton4name: `${att.charname} tries their luck:`,
				reactbutton5name: `${def.charname} tries their luck:`,
				reactbutton6name: `Otherwise, the contest was a draw.`
			});
		}
		//h.log(rollData, 'warn', `Finalising react-defend roll`);
		await finishRoll(defendRoll.rollId, rollData);
	});

	on('clicked:react-luck', async (ev) => {
		let drawData = rollEscape.unescape(ev.originalRollId),
			att = drawData.attacker,
			def = drawData.defender,
			res = drawData.result;
		h.log(drawData, 'info', 'REACT-LUCK: passthrough');
		let attrs = await as.getAttrs(['luck', 'luckroll_bonus', 'character_id', 'character_name']);
		if (!await checkSheetPermission(attrs.character_name)) return h.log(`Player lacks permission on button`, 'error', 'react-luck');
		let	luckVal = parseInt(attrs.luck)||null,
			roller = (attrs.character_id === att.id) ? 'attacker' : (attrs.character_id === def.id) ? 'defender' : null,
			bonus = parseInt(attrs.luckroll_bonus) > 0 ? ` + ${attrs.luckroll_bonus}[Bonus]` : ``;
		if (!luckVal > 0 || !roller) {
			let abortBase = (!roller) ? `Error: couldn't identify luck roller as defender or attacker` : `/w "@{character_name}" No luck points left to spend!`;
			let abortRoll = await startRoll(abortBase);
			finishRoll(abortRoll.rollId);
		} else {
			let luckBase = `${t.roll}${prop.name}${prop.reactInit} {{title=Luck Check}} {{reactsubheader=Luck}} {{reactdata=[[0]]}} {{reactbutton1name=[[1]]}} {{reactbutton2name=[[2]]}} {{reactbutton3name=[[3]]}} {{reactbutton1label=[0](~${att.id}|react-damage}} {{reactbutton2label=[0](~${def.id}|react-damage}} {{reactroll1name=+@{luck}[Luck]${bonus}}} {{reactroll1=[[${prop.coreDie} + @{luck}[Luck]${bonus}]]}} {{reactoutcome=[[0]]}} {{notes=1 Luck point subtracted, ${luckVal - 1} remaining}}`;
			let luckRoll = await startRoll(luckBase);
			let success = luckRoll.results.reactroll1.result >= prop.skillTarget ? 1 : 0,
				winnerAD = (success) ? roller : (roller === 'attacker') ? 'defender' : 'attacker',
				dodgeOnly = (winnerAD === 'defender' && def.skill === 'dodge') ? true : false;
			let rollPassThrough = {
				attacker: att,
				defender: def,
				result: {
					winner: winnerAD,
					loser: (winnerAD) ? (winnerAD === 'defender') ? 'attacker' : 'defender' : null,
					mighty: res.mightyBlow,
					dodge: dodgeOnly,
				}
			}
			let rollData = {
				reactoutcome: (success) ? `${attrs.character_name} succeeded on their luck check and won the exchange!` : `${attrs.character_name} failed their luck check and lost the exchange!`,
				reactdata: rollEscape.escape(rollPassThrough),
			}
			if (winnerAD === 'attacker') {
				h.mergeObj(rollData, {
					reactbutton1name: `${att.charname} rolls damage:`
				});
			} else if (winnerAD === 'defender' && !dodgeOnly) {
				h.mergeObj(rollData, {
					reactbutton2name: `${def.charname} rolls damage:`
				});
			} else if (dodgeOnly) {
				h.mergeObj(rollData, {
					reactbutton3name: `None - ${def.charname} dodged the attack.`
				});
			}
			finishRoll(luckRoll.rollId, rollData);
		}
	});

	on('clicked:react-damage', async (ev) => {
		//h.log(ev, 'info', `Click event`);
		let attackResult = rollEscape.unescape(ev.originalRollId);
		h.log(attackResult, 'info', `REACT-DAMAGE: rollData passthrough`);
		let winner = attackResult[attackResult.result.winner],
			loser = attackResult[attackResult.result.loser];
		if (!winner || !loser) return h.log(attackResult, 'error', `react-damage: Couldn't determine winner from attack`);
		if (!await checkSheetPermission(winner.charname)) return h.log(`Failed action button permission check`, 'error', `react-apply-damage`);
		let mightyBlow = attackResult.result.mighty ? `{{mighty=1}}` : '';
		as.setActiveCharacterId(winner.id);
		as.setActiveCharacterId(loser.id);
		let def = await as.getAttrs(['armour_value', 'armour_items', 'stamina']);
		//h.log(d, 'info', `loser defence`);
		let hasArmour = (!/\w+/.test(def.armour_items)) ? false : true;
		let damageBase = `${t.damage}${color.damage}${prop.reactInit}{{charname=${winner.charname}}} {{title=Damage Roll}}{{subheader=${winner.name}}} {{damagetype= ${h.emproper(winner.damageType)}}}  {{damageroll1name=${winner.damage}}} {{reactdata=[[0]]}} {{reactbutton1name=[[1]]}} {{reactbutton2name=[[2]]}} {{damageroll1=[[${winner.damage}]]}} {{defencename=${loser.charname}'s defence-\n ${hasArmour ? `${def.armour_items}`.replace(/\s*,\s*/g, '\\n') : 'none'}}} {{defenceroll=[[${def.armour_value||0}]] DR}} {{outcome=${loser.charname} takes [[4]] damage.}} {{reactbutton1label=[3](~${loser.id}|react-apply-damage}} {{reactbutton2label=[0](~${winner.id}|react-roll-crit}} ${mightyBlow}`;
		h.log(damageBase, 'info', `Debug`);
		let damageRoll = await startRoll(damageBase);
		let damageTotal = parseInt(damageRoll.results.damageroll1.result)||0,
			damageReduction = parseInt(damageRoll.results.defenceroll.result)||0,
			damageNet = damageTotal - damageReduction,
			damageFinal = attackResult.result.mighty ? Math.max(damageNet*2, 1) : Math.max(damageNet, 1),
			loserStamina = parseInt(def.stamina) - damageFinal;
		let rollData = {
			outcome: damageFinal,
			reactbutton1name: `${loser.charname} takes ${damageFinal} damage.`,
			reactdata: rollEscape.escape({
				damage: {
					id: loser.id,
					charname: loser.charname,
					damageValue: damageFinal,
					newStaminaValue: loserStamina,
				},
				crit: {
					id: winner.id,
					charname: winner.charname,
					critMod: Math.abs(loserStamina),
					critTable: winner.damageType,
				}
			}),
		};
		if (loserStamina < 1) rollData.reactbutton2name = `${winner.charname} rolls critical effect!`;
		finishRoll(damageRoll.rollId, rollData);
	});

	on('clicked:react-apply-damage', async (ev) => {
		let damageData = rollEscape.unescape(ev.originalRollId);
		if (!await checkSheetPermission(damageData.damage.charname)) return h.log(`Failed action button permission check`, 'error', `react-apply-damage`);
		//as.setActiveCharacterId(damageData.damage.id);
		h.log(damageData, 'info', `Damage passed through`);
		//let damageReport = `${t.desc}${color.damage}${prop.name}{{title=Stamina Reduced}}{{description=***${damageData.damage.charname}*** dropped to [[${damageData.damage.newStaminaValue}]] Stamina.}}`
		let damageReport = `/w "${damageData.damage.charname}" ${damageData.damage.damageValue} damage applied, ${damageData.damage.newStaminaValue} Stamina remaining.`;
		if (!isNaN(damageData.damage.newStaminaValue)) {
			as.setAttrs({stamina: damageData.damage.newStaminaValue});
			let reportRoll = await startRoll(damageReport);
			finishRoll(reportRoll.rollId);
		} else {
			let abort = await startRoll(`/w "${damageData.damage.charname}" Error: bad Stamina value received, Stamina not automatically reduced.`);
			finishRoll(abort.rollId);
		}
	});

	on('clicked:react-roll-crit', async (ev) => {
		let critData = rollEscape.unescape(ev.originalRollId);
		if (!await checkSheetPermission(critData.crit.charname)) return h.log(`Failed sheet permission check`, 'error', `react-roll-crit`);
		h.log(critData, 'warn', `Crit data passed through`);
		as.setActiveCharacterId(critData.crit.id);
		let damageType = critData.crit.critTable.toLowerCase();
		if (!isNaN(critData.crit.critMod) && warlockData.getDamageTypes().includes(damageType)) {
			let critTop = `${t.desc}{{title=Critical Strike!}} {{subtitle=${h.emproper(damageType)} - [[2d6 + ${critData.crit.critMod}]]}} {{description=***${critData.damage.charname}*** *recieves* a critical wound!}} {{classdesc=crit}}`;
			let critRollTop = await startRoll(critTop);
			let critResult = Math.min(10, Math.max(critRollTop.results.subtitle.result, 2));
			let critString = warlockData.critTables[damageType][critResult];
			let critBottom = `${t.desc}${prop.name}{{description=${critString}}}`;
			let critRollBottom = await startRoll(critBottom);
			await finishRoll(critRollTop.rollId);
			finishRoll(critRollBottom.rollId);
		} else {
			let critAbort = await startRoll(`ReactRoll Error: bad data received for Crit`);
			finishRoll(critAbort.rollId);
		}
	});

	// Apply Effect button
	on('clicked:apply-effect', (ev) => {
		let effectData = rollEscape.unescape(ev.originalRollId);
		warRepeating.applyEffect(effectData);
	})

	return {
		stamLuck,
		skillCheck,
		luckRoll,
		rest,
		attackRoll,
		defendRoll,
		damageRoll,
		critRoll,
		spellRoll,
		spellMiscast,
		spellCast,
		spellLink,
	}
})();

/**
 * 8. EVENT LISTENERS
*/
{
	on('sheet:opened', async () => {
		const initZeroAttributes = ['npc', 'unlocked'];
		const initTutorialAttributes = ['initial_fives', 'initial_sixes', 'initial_skillpoints'];
		let attrs = await as.getAttrs(['version'].concat(initZeroAttributes).concat(initTutorialAttributes));
		let output = {};
		initTutorialAttributes.forEach(a => {if (!attrs[a] || isNaN(parseInt(attrs[a]))) output[a] = 10});
		initZeroAttributes.forEach(a => {if (attrs[a] != 1) output[a] = '0'});
		if (!attrs.version) output.version = version.current();
		else await versionControl(attrs.version);
		h.log(output, 'info', `sheetOpened init Output`);
		if (Object.keys(output).length) await as.setAttrs(output);		
	});

	// Active tab
	on('clicked:tab_character clicked:tab_settings clicked:tab_help', async (ev) => {
		let newTab = (ev.triggerName.match(/tab_(.*)/)||[])[1];
		as.setAttrs({activetab: newTab});
	});

	// Disable Character Creation tutorial
	on('clicked:disable-tutorial', () => as.setAttrs({disable_tutorial: 1}));

	// NPC shortcut
	on('clicked:npc', () => {
		as.setAttrs({disable_tutorial: 1, npc: 1});
	});
	
	// Roll for Stamina/Luck on character creation
	on('clicked:roll_stamina clicked:roll_luck', async (ev) => {
		let targetStat = h.emproper(ev.triggerName.match(/roll_([^\s]*)/)[1]);
		roll.stamLuck(targetStat);
	});

	// Apply the Stamina/Luck roll
	on('clicked:apply_stamina clicked:apply_luck', (ev) => {
		h.log(ev, 'warn');
		let result = parseInt(ev.originalRollId)||0;
		if (!result) return;
		let targetStat = ev.triggerName.match(/apply_([^\s]*)/)[1];
		roll.stamLuck(targetStat, result);
	});

	// Respond to Stamina & Luck changes
	on('change:stamina_base change:stamina_bonus change:stamina_increase change:luck_base change:luck_bonus', async (ev) => {
		let targetStat = (ev.triggerName.match(/(stamina|luck)/i)||[])[1];
		let attrs = await as.getAttrs([`${targetStat}_base`, `${targetStat}_bonus`, `stamina_increase`]);
		let newVal = (parseInt(attrs[`${targetStat}_base`])||0) + (parseInt(attrs[`${targetStat}_bonus`])||0);
		newVal += (/stamina/i.test(targetStat)) ? parseInt(attrs.stamina_increase)||0 : 0;
		as.setAttrs({[`${targetStat}_max`]: newVal});
	})

	// Luck Roll
	on('clicked:luckroll', () => roll.luckRoll());

	// Rest button
	on('clicked:rest', () => roll.rest());

	// Setup Career skills on selection
	on('change:career change:advanced_career', (ev) => {
		if (!warlockData.getCareerNames().includes(ev.newValue)) return;
		warSheet.getNewCareerSkills(ev.newValue);
	});

	// Respond to Skill Level changes, includes Character Creation Tutorial
	// && Skill Roll listener
	skills.map(sk => {
		on(`change:${sk}`, (ev) => {
			h.log(ev, 'info', `Skillchange in "${ev.sourceAttribute}" detected:`);
			if (ev.sourceType === 'sheetworker') return;
			warSheet.handleSkillChange(ev);
		});
		on(`clicked:${sk}`, (ev) => {
			let skill = ev.triggerName.replace(/^[^:]*?:/, '');
			roll.skillCheck(skill);
		});
	});
	// Add Career Skills sections to Skill Roll
	on('clicked:repeating_careerskill:past-skill clicked:career-skill clicked:custom-career-skill', async (ev) => {
		h.log(ev, 'info', `Career skill click`);
		let rowid = (ev.sourceAttribute) ? (ev.sourceAttribute.match(/_(-[A-Za-z0-9-]{19})_/)||[])[1] : null;
		let attrNames = (rowid) ? [`repeating_careerskill_${rowid}_name`, `repeating_careerskill_${rowid}_level`] : /custom/i.test(ev.triggerName) ? ['custom_career', 'custom_career_skill_level'] : ['career_skill_name', 'career_skill_level'];
		await as.getAttrs(attrNames).then(v => roll.skillCheck(v[attrNames[0]], attrNames[1]));
	});
	// Add NPC Skill Check to Skill Roll
	on('clicked:npc_skill', async (ev) => {
		h.log(ev, 'info', `NPC Skill Check`);
		// skillVal = await as.getAttrs(['npc_adventure_skill']).then(v=>v['npc_adventure_skill']||0);
		roll.skillCheck('NPC Skill', 'npc_adventure_skill')
	});

	// Switch to Advanced Careers
	on('clicked:career-toggle', () => {
		h.toggleAttr('career_toggle');
	});

	// Retire a Career
	on('clicked:retire', () => {
		h.log(`Clicked Retire`);
		warSheet.retireCareer();
	});

	// Undo a Career retire (for misclicks)
	on('clicked:undo-retire', () => warSheet.undoRetire());

	// Option gear-icon buttons - folding sections
	on('clicked:repeating_monster-ability:options-btn clicked:repeating_weapon:options-btn clicked:repeating_possession:options-btn clicked:repeating_spell:options-btn clicked:stats_options-btn clicked:main_weapon_options-btn clicked:repeating_effect:options-btn', async (ev) => {
		let trigger = ev.sourceAttribute || ev.triggerName;
		let target = trigger.replace(/clicked:/, '').replace(/:/, '_').replace(/btn/, 'flag');
		h.toggleAttr(target, true);
	});

	// Currency Converters
	on('clicked:convert-pennies-silver clicked:convert-silver-gold', (ev) => {
		h.log(ev, 'info', `Currency converter triggered`);
		let baseCoin = /pennies/i.test(ev.triggerName) ? 'pennies' : 'silver';
		warSheet.convertCurrency(baseCoin);
	});

	// Repeating Possessions & Effects - process Item Mods
	on('change:repeating_possession remove:repeating_possession change:repeating_effect remove:repeating_effect', (ev) => {
		//if (ev.sourceType === `sheetworker`) return;x
		h.log(ev);
		let parts = ev.sourceAttribute.match(/repeating_([^_]+?)_(-[A-Za-z0-9-]{19})[_]*(.*)/) || [];
		if (ev.sourceType === 'sheetworker' && parts[3] === 'name') parts[3] = 'mods';
		let supportingValues = ev.removedInfo || {newValue: ev.newValue||null, previousValue: ev.previousValue||null};
		if (/options/.test(parts[3])) return;
		if (/poss/i.test(parts[1])) {
			if (ev.removedInfo) warRepeating.handlePossessionChange(parts[2], 'removed', supportingValues);
			else warRepeating.handlePossessionChange(parts[2], parts[3], supportingValues);
		} else if (/effect/i.test(parts[1])) warRepeating.handleEffectChange(parts[2], parts[3], supportingValues);
		h.log(supportingValues, 'info', `${parts[1]} section - change row ${parts[2]}, attr "${parts[3]||'REMOVED ROW'}"`);
	});

	// NPC Armour Value change
	on('change:npc_armour', async () => {
		let attrs = await warRepeating.getAllModAttrs();
		let output = await warRepeating.calculateEffectMods(attrs, `npcTrigger`);
		as.setAttrs(output);
	});

	// Repeating Weapons
	on('change:repeating_weapon:readied', async (ev) => {
		let rows = await as.getSectionIDs('weapon');
		let attrs = await as.getAttrs(rows.map(row=>`repeating_weapon_${row}_readied`).concat(['react']));
		if (attrs.react) warRepeating.handleReadiedWeapon(attrs, [ev.sourceAttribute, ev.newValue??0]);
	});
	on('change:react', async (ev) => {
		let output = {}
		await as.getSectionIDs('weapon').then(v => v.map(row=>output[`repeating_weapon_${row}_show_readied`] = ev.newValue));
		as.setAttrs(output);
	});

	// Repeating Weapons/Attacks
	on('clicked:repeating_weapon:rollattack clicked:repeating_weapon:rolldefend clicked:repeating_weapon:rolldamage clicked:repeating_weapon:rollcrit', (ev) => {
		h.log(ev, 'log', `Att/def rolled...`);
		let rowId = h.getRowId(ev.sourceAttribute);
		if (!rowId) return h.log(ev, 'error', `Couldn't find rowId!`);
		let rType = ((ev.sourceAttribute.match(/(attack|defend|damage|crit)$/)||[])[1]);
		if (rType === 'attack') roll.attackRoll(rowId);
		else if (rType === 'defend') roll.defendRoll(rowId);
		else if (rType === 'damage') roll.damageRoll(rowId);
		else if (rType === 'crit') roll.critRoll(rowId);
	});
	on('change:repeating_weapon', (ev) => {
		let tType = (/(_base)/i.test(ev.sourceAttribute)) ? 'damage' : (/(_custom)/i.test(ev.sourceAttribute)) ? 'cdamage' : (/(ranged|_type|threat)/i.test(ev.sourceAttribute)) ? 'flags' : null;
		let tRow = h.getRowId(ev.sourceAttribute);
		let itemMods = [ev.newValue];
		if (tType) warRepeating.updateWeapon({type: tType, rowId: tRow}, itemMods);
	});

	// Repeating Spells
	on('clicked:repeating_spell:rollspell clicked:rollmiscast clicked:repeating_spell:rollcast clicked:repeating_spell:link', (ev) => {
		let rowId = h.getRowId(ev.sourceAttribute);
		let rType = ((ev.triggerName.match(/(miscast|spell|rollcast|link)$/)||[])[1]);
		if (rType === 'miscast') {
			roll.spellMiscast();
		} else if (rType === 'spell') {
			roll.spellRoll(rowId);
		} else if (rType === 'rollcast') {
			roll.spellCast(rowId);
		} else if (rType === 'link') {
			roll.spellLink(rowId);
		}
	});

	// Effects reporting
	on('clicked:repeating_effect:link-effects clicked:link_armour clicked:link_block clicked:link_globals', (ev) => {
		let rowId = h.getRowId(ev.sourceAttribute);
		rowId = (rowId) ? rowId : (ev.triggerName.match(/link_(.*)/i)||[])[1];
		h.log(rowId, 'log', 'Linking Effect');
		warSheet.linkEffect(rowId);
	});

	// Monster Ability reporting
	on('clicked:repeating_monster-ability:link-ability', (ev) => {
		let rowId = h.getRowId(ev.sourceAttribute);
		h.log(rowId, 'log', 'Linking Ability');
		warRepeating.linkAbility(rowId);
	});

	// Monster Ability wizard
	on('clicked:create_monster_ability', () => warSheet.createAbility());

}
