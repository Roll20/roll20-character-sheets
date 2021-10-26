/* globals require */

// HELPERS
const copyToCB = (str) => {
	require('child_process').spawn('clip').stdin.end(str);
}
const emproper = (input) => {
	return input.split(/[_\s]+/g).map(w=>`${w[0].toUpperCase()}${w.slice(1)}`).join(' ');
}

const warlockData = {
	careers: [
		// CORE - BASIC
		{
			name: "agitator",
			type: "basic",
			skills: {
				small_blade: 10,
				intimidate: 10,
				persuasion: 12,
				streetwise: 12,
			},
		},
		{
			name: "beggar",
			type: "basic",
			skills: {
				appraise: 10,
				blunt: 10,
				spot: 12,
				streetwise: 12,
			},
		},
		{
			name: "boatman",
			type: "basic",
			skills: {
				navigation: 10,
				repair: 10,
				endurance: 12,
				swimming: 12,
			},
		},
		{
			name: "bodyguard",
			type: "basic",
			skills: {
				medicine: 10,
				thrown: 10,
				intimidate: 12,
				large_blade: 12,
			},
		},
		{
			name: "bounty_hunter",
			type: "basic",
			skills: {
				bargain: 10,
				crossbow: 10,
				spot: 12,
				streetwise: 12,
			},
		},
		{
			name: "entertainer",
			type: "basic",
			skills: {
				diplomacy: 10,
				history: 10,
				disguise: 12,
				persuasion: 12,
			},
		},
		{
			name: "footpad",
			type: "basic",
			skills: {
				stealth: 10,
				thrown: 10,
				intimidate: 12,
				streetwise: 12,
			},
		},
		{
			name: "gambler",
			type: "basic",
			skills: {
				bargain: 10,
				spot: 10,
				persuasion: 12,
				"sleight-of-hand": 12,
			},
		},
		{
			name: "grave_robber",
			type: "basic",
			skills: {
				intimidate: 10,
				ostler: 10,
				small_blade: 12,
				spot: 12,
			},
		},
		{
			name: "hunter",
			type: "basic",
			skills: {
				stealth: 10,
				swimming: 10,
				spot: 12,
				survival: 12,
			},
		},
		{
			name: "initiate",
			type: "basic",
			skills: {
				command: 10,
				ostler: 10,
				medicine: 12,
				persuasion: 12,
			},
		},
		{
			name: "mercenary",
			type: "basic",
			skills: {
				endurance: 10,
				streetwise: 10,
				dodge: 12,
				large_blade: 12,
			},
		},
		{
			name: "militiaman",
			type: "basic",
			skills: {
				command: 10,
				ostler: 10,
				"pole-arm": 12,
				thrown: 12,
			},
		},
		{
			name: "miner",
			type: "basic",
			skills: {
				survival: 10,
				swimming: 10,
				endurance: 12,
				navigation: 12,
			},
		},
		{
			name: "noble",
			type: "basic",
			skills: {
				language: 10,
				medicine: 10,
				diplomacy: 12,
				history: 12,
			},
		},
		{
			name: "outlaw",
			type: "basic",
			skills: {
				medicine: 10,
				"sleigh-of-hand": 10,
				large_blade: 12,
				thrown: 12,
			},
		},
		{
			name: "pedlar",
			type: "basic",
			skills: {
				ostler: 10,
				streetwise: 10,
				bargain: 12,
				repair: 12,
			},
		},
		{
			name: "raconteur",
			type: "basic",
			skills: {
				dodge: 10,
				history: 10,
				lie: 12,
				streetwise: 12,
			},
		},
		{
			name: "rat_catcher",
			type: "basic",
			skills: {
				athletics: 10,
				medicine: 10,
				stealth: 12,
				survival: 12,
			},
		},
		{
			name: "road_warden",
			type: "basic",
			skills: {
				crossbow: 10,
				dodge: 10,
				"pole-arm": 12,
				ostler: 12,
			},
		},
		{
			name: "soldier",
			type: "basic",
			skills: {
				command: 10,
				bow: 10,
				large_blade: 12,
				"pole-arm": 12,
			},
		},
		{
			name: "thief",
			type: "basic",
			skills: {
				lie: 10,
				streetwise: 10,
				small_blade: 12,
				spot: 12,
			},
		},
		{
			name: "tomb_robber",
			type: "basic",
			skills: {
				athletics: 10,
				intimidate: 10,
				blunt: 12,
				endurance: 12,
			},
		},
		{
			name: "wizard's_apprentice",
			type: "basic",
			skills: {
				command: 10,
				persuasion: 10,
				language: 12,
				incantation: 12,
			},
		},
		// CORE - ADVANCED 
		{
			name: "assassin",
			type: "advanced",
			skills: {
				blunt: 14,
				dodge: 14,
				streetwise: 14,
				small_blade: 16,
				stealth: 16,
			},
		},
		{
			name: "bravo",
			type: "advanced",
			skills: {
				blunt: 14,
				bow: 14,
				command: 14,
				large_blade: 16,
				streetwise: 16,
			},
		},
		{
			name: "watch_captain",
			type: "advanced",
			skills: {
				crossbow: 14,
				endurance: 14,
				ostler: 14,
				pole_arm: 16,
				streetwise: 16,
			},
		},
		{
			name: "charlatan",
			type: "advanced",
			skills: {
				appraise: 14,
				ostler: 14,
				spot: 14,
				persuasion: 16,
				streetwise: 16,
			},
		},
		{
			name: "explorer",
			type: "advanced",
			skills: {
				athletics: 14,
				small_blade: 14,
				swimming: 14,
				navigation: 16,
				spot: 16,
			},
		},
		{
			name: "freelance",
			type: "advanced",
			skills: {
				diplomacy: 14,
				medicine: 14,
				thrown: 14,
				ostler: 16,
				pole_arm: 16,
			},
		},
		{
			name: "highwayman",
			type: "advanced",
			skills: {
				dodge: 14,
				intimidate: 14,
				large_blade: 14,
				disguise: 16,
				ostler: 16,
			},
		},
		{
			name: "mercenary_captain",
			type: "advanced",
			skills: {
				bargain: 14,
				medicine: 14,
				survival: 14,
				crossbow: 16,
				large_blade: 16,
			},
		},
		{
			name: "merchant",
			type: "advanced",
			skills: {
				lie: 14,
				persuasion: 14,
				sleight_of_hand: 14,
				appraise: 16,
				bargain: 16,
				ostler: 16,
			},
		},
		{
			name: "minstrel",
			type: "advanced",
			skills: {
				history: 14,
				lie: 14,
				repair: 14,
				persuasion: 16,
				sleight_of_hand: 16,
			},
		},
		{
			name: "outlaw_chief",
			type: "advanced",
			skills: {
				endurance: 14,
				ostler: 14,
				swimming: 14,
				intimidate: 16,
				large_blade: 16,
			},
		},
		{
			name: "priest",
			type: "advanced",
			skills: {
				diplomacy: 14,
				ostler: 14,
				thrown: 14,
				incantation: 16,
				language: 16,
			},
		},
		{
			name: "scholar",
			type: "advanced",
			skills: {
				appraise: 14,
				brawling: 14,
				repair: 14,
				language: 16,
				medicine: 16,
			},
		},
		{
			name: "scout",
			type: "advanced",
			skills: {
				athletics: 14,
				ostler: 14,
				survival: 14,
				spot: 16,
				stealth: 16,
			},
		},
		{
			name: "spy",
			type: "advanced",
			skills: {
				athletics: 14,
				dodge: 14,
				small_blade: 14,
				persuasion: 16,
				sleight_of_hand: 16,
			},
		},
		{
			name: "veteran_soldier",
			type: "advanced",
			skills: {
				dodge: 14,
				pole_arm: 14,
				survival: 14,
				endurance: 16,
				large_blade: 16,
			},
		},
		{
			name: "wizard",
			type: "advanced",
			skills: {
				brawling: 14,
				command: 14,
				medicine: 14,
				history: 16,
				incantation: 16,
			},
		},
		// COMPENDIUM BASIC
		{
			name: "dwarf_inventor",
			type: "basic, dwarf",
			skills: {
				brawling: 10,
				diplomacy: 10,
				repair: 12,
				sleight_of_hand: 12,
			},
		},
		{
			name: "dwarf_tunnel_fighter",
			type: "basic, dwarf",
			skills: {
				endurance: 10,
				intimidate: 10,
				stealth: 12,
				survival: 12,
			},
		},
		{
			name: "elf_astrologer",
			type: "basic, elf",
			skills: {
				appraise: 10,
				diplomacy: 10,
				navigation: 12,
				spot: 12,
			},
		},
		{
			name: "elf_kin_guard",
			type: "basic, elf",
			skills: {
				endurance: 10,
				large_blade: 10,
				navigation: 12,
				survival: 12,
			},
		},
		{
			name: "halfling_gong_farmer",
			type: "basic, halfling",
			skills: {
				bargain: 10,
				medicine: 10,
				small_blade: 12,
				streetwise: 12,
			},
		},
		{
			name: "halfling_pie_master",
			type: "basic, halfling",
			skills: {
				bargain: 10,
				small_blade: 10,
				persuasion: 12,
				streetwise: 12,
			},
		},
		// COMPENDIUM ADVANCED
		{
			name: "dwarf_battlesmith",
			type: "advanced, dwarf",
			skills: {
				appraise: 14,
				endurance: 14,
				history: 14,
				intimidate: 16,
				repair: 16,
			},
		},
		{
			name: "dwarf_slayer",
			type: "advanced, dwarf",
			skills: {
				athletics: 14,
				brawling: 14,
				medicine: 14,
				intimidate: 16,
				large_blade: 16,
			},
		},
		{
			name: "elf_agent",
			type: "advanced, elf",
			skills: {
				diplomacy: 16,
				language: 16,
				persuasion: 16,
				sleight_of_hand: 14,
				streetwise: 14,
			},
		},
		{
			name: "elf_champion",
			type: "advanced, elf",
			skills: {
				spot: 14,
				survival: 14,
				thrown: 14,
				intimidate: 16,
				large_blade: 16,
			},
		},
		{
			name: "halfling_burglar",
			type: "advanced, halfling",
			skills: {
				appraise: 14,
				athletics: 14,
				dodge: 14,
				spot: 16,
				stealth: 16,
			},
		},
		{
			name: "halfling_gaffer",
			type: "advanced, halfling",
			skills: {
				brawling: 14,
				lie: 14,
				intimidate: 14,
				command: 16,
				streetwise: 16,
			},
		},
		// COMPENDIUM ADVANCED SPELLCASTERS
		{
			name: "dwarf_runeforger",
			type: "advanced, dwarf",
			skills: {
				appraise: 14,
				command: 14,
				diplomacy: 14,
				incantation: 16,
				language: 16,
			},
		},
		{
			name: "halfling_conjurer",
			type: "advanced, halfling",
			skills: {
				disguise: 14,
				lie: 14,
				streetwise: 14,
				persuasion: 16,
				sleight_of_hand: 16,
			},
		},
		{
			name: "elf_druid",
			type: "advanced, elf",
			skills: {
				medicine: 14,
				small_blades: 14,
				spot: 14,
				navigation: 16,
				survival: 16,
			},
		},
		// KINGDOM BASIC
		{
			name: "docker",
			type: "basic",
			skills: {
				appraise: 10,
				brawling: 10,
				intimidate: 10,
				streetwise: 12,
				swimming: 12,
			},
		},
		{
			name: "fish_warden",
			type: "basic",
			skills: {
				blunt: 10,
				repair: 10,
				thrown: 10,
				navigation: 12,
				swimming: 12,
			},
		},
		{
			name: "mudlark",
			type: "basic",
			skills: {
				spot: 10,
				survival: 10,
				thrown: 10,
				endurance: 12,
				swimming: 12,
			},
		},
		{
			name: "night_watchman",
			type: "basic",
			skills: {
				blunt: 10,
				lie: 10,
				navigation: 10,
				stealth: 12,
				streetwise: 12,
			},
		},
		{
			name: "publican",
			type: "basic",
			skills: {
				bargain: 10,
				history: 10,
				spot: 10,
				blunt: 12,
				persuasion: 12,
			},
		},
		{
			name: "servant",
			type: "basic",
			skills: {
				bargain: 10,
				endurance: 10,
				history: 10,
				spot: 12,
				stealth: 12,
			},
		},
		// GOBLINS BASIC
		{
			name: "hedge_wizard",
			type: "basic, goblin",
			skills: {
				blunt: 10,
				navigation: 10,
				medicine: 12,
				survival: 12,
			},
		},
		{
			name: "goblin_pedlar",
			type: "basic, goblin",
			skills: {
				diplomacy: 10,
				sleight_of_hand: 10,
				blunt: 12,
				bargain: 12,
			},
		},
		{
			name: "guttersnipe",
			type: "basic, goblin",
			skills: {
				athletics: 10,
				blunt: 10,
				stealth: 12,
				sleight_of_hand: 12,
			},
		},
		{
			name: "mushroom_farmer",
			type: "basic, goblin",
			skills: {
				blunt: 10,
				brawling: 10,
				medicine: 12,
				navigation: 12,
				spot: 12,
			},
		},
		{
			name: "spider_rider",
			type: "basic, goblin",
			skills: {
				appraise: 10,
				bow: 10,
				small_blade: 12,
				ostler: 12,
				survival: 12,
			},
		},
		{
			name: "tinkerer",
			type: "basic, goblin",
			skills: {
				small_blades: 10,
				sleight_of_hand: 10,
				repair: 12,
				spot: 12,
			},
		},
		// GOBLINS ADVANCED
		{
			name: "emissary",
			type: "advanced, goblin",
			skills: {
				history: 14,
				languages: 14,
				appraise: 14,
				persuasion: 16,
				diplomacy: 16,
			},
		},
		{
			name: "spelunker",
			type: "advanced. goblin",
			skills: {
				spot: 14,
				swimming: 14,
				stealth: 14,
				navigation: 16,
				athletics: 16,
			},
		},
		{
			name: "sporceror",
			type: "advanced, goblin",
			skills: {
				stealth: 14,
				navigation: 14,
				medicine: 14,
				spot: 16,
				incantation: 16,
			},
		},
	],
}


// CAREER PARSER
const careerStr = `SPORCEROR
Stealth 14, Navigation 14, Medicine 14
Survival 16, Spot 16, Incantation 16`;

const processCareer = (inp) => {
	let skillObj = {};
	const rxCareerName = /^[^A-Za-z]*([a-zA-Z'\s]+)\n/;
	let cName = inp.match(rxCareerName)?.[1]?.toLowerCase().trim().replace(/\s+/g, '_');
	if (!cName) return console.error('No name found');
	let skills = inp.replace(rxCareerName, '').split(/,/g).filter(v=>v);
	skills.map(sk => {
		let parts = sk.match(/([^\d]+)(\d+)/);
		if (!parts[2]) return console.error(`Bad skill format`);
		let skName = parts[1].toLowerCase().trim().replace(/(\s+|-)/g, '_');
		skillObj[skName] = parseInt(parts[2]);
	});
	let skillMax = Object.values(skillObj).reduce((a,v) => a = Math.max(a,v));
	let racial = (cName.match(/(^|\s)(elf|dwarf|halfling|goblin)[\s_]+/i)||[])[2];
	//console.log(racial);
	let tags = (skillMax > 12) ? 'advanced' : 'basic';
	tags += (racial) ? `, ${racial}` : ``;
	return {
		name: cName,
		type: tags,
		skills: skillObj
	};
}
//let aOutput = (processCareer(careerStr));
//console.log(aOutput);

const skills = ['appraise', 'athletics', 'bargain', 'blunt', 'bow', 'brawling', 'command', 'crossbow', 'diplomacy', 'disguise', 'dodge', 'endurance', 'history', 'incantation', 'intimidate', 'language', 'large_blade', 'lie', 'medicine', 'navigation', 'ostler', 'persuasion', 'pole_arm', 'repair', 'sleight_of_hand', 'small_blade', 'spot', 'stealth', 'streetwise', 'survival', 'swimming', 'thrown'];
const skillsMax = skills.map(sk => sk += '_max');
const rxRaces = /(\b|_)(elf|dwarf|halfling|goblin)(\b|_)/i;

// ADVENTURING SKILLS HTML
const generateSkillListHTML = (side='left', linebreaks) => {
	let reqSkills = /^l/.test(side) ? skills.slice(0, 16) : skills.slice(16);
	let output = '';
	reqSkills.map(sk => {
		output +=	`<div class="skill-item">
		<input type="hidden" name="attr_unlocked"/>
		<input type="checkbox" name="attr_${sk}_custom_prof" value="2"/>
		<input type="hidden" name="attr_${sk}_prof"/>
		<button type="action" name="act_${sk}" tabindex="-1">${emproper(sk)}</button>
		<span class="pictos skill-flag" title="This is a current Career Skill">^</span>
		<input type="hidden" name="attr_${sk}_overmax" value="0">
		<input type="hidden" name="attr_${sk}_boosted" value="0"/>
		<input type="hidden" name="attr_${sk}_max" value="6"/>
		<input type="hidden" name="attr_${sk}_bonus" value="0"/>
		<input type="number" name="attr_${sk}" min="0" value="4"/>
		<div class="skill-bonus" title="Item bonus">(<span name="attr_${sk}_bonus_display" value="0"></span>)</div>
		<input type="number" name="attr_${sk}_max" class="skill-limit no-spinner" value="6"/>
		<span name="attr_${sk}_max" class="skill-limit" value="6"></span>
		<span class="pictos skill-cmax-flag" title="This skill was raised by a Past Career">{</span>
	</div>`
	});	
	return linebreaks ? output : output.replace(/\n/g, '').replace(/>\s+?</g, '><').replace(/^\s+/, '');
}
copyToCB(generateSkillListHTML('r'));

// CAREER SELECT
const generateCareerSelectHTML = (race, advanced=false, linebreaks=false) => {
	let rxTier = new RegExp(advanced ? 'advanced' : 'basic', 'i');
	let rxRace = (race && rxRaces.test(race)) ? new RegExp(`${race}`, 'i') : null;
	let genericCareers = warlockData.careers.filter(c=>(rxTier.test(c.type) && !rxRaces.test(c.type))).map(c=>c.name);
	console.log(genericCareers);
	let racialCareers = (race) ? warlockData.careers.filter(c=>(rxTier.test(c.type) && rxRace.test(c.type))).map(c=>c.name) : null;
	console.log(racialCareers);
	let advancedAttrname = (advanced) ? `advanced_` : ``;
	let racialHTML = ``;
	if (racialCareers) {
		racialHTML += `<optgroup label="Racial">`;
		racialCareers.forEach(rc => racialHTML += `<option value="${rc}">${emproper(rc)}</option>`);
		racialHTML += `</optgroup><optgroup label="Generic">`;
	}
	let outputHTML = `<select name="attr_${advancedAttrname}career" class="career ${race ? `${race}` : `human`}">
						<option value="none">-</option>
						${racialHTML}`;
	genericCareers.forEach(c => outputHTML += `<option value="${c}">${emproper(c)}</option>`);
	outputHTML += (racialCareers) ? `</optgroup></select>` : `</select>`;
	return linebreaks ? outputHTML : outputHTML.replace(/\n/g, '').replace(/>\s+?</g, '><').replace(/^\s+/, '');
}
const careerCollection = (advanced = false) => {
	let selectCollection = [];
	['', 'dwarf', 'elf', 'halfling', 'goblin'].forEach(race => {
		selectCollection.push(generateCareerSelectHTML(race, advanced));
	});
	return selectCollection.join('\n');
};
//copyToCB(careerCollection(true));

// beast abilities
const abils = `Brittle - this creature is susceptible to impact
damage. If maces, clubs or hammers attack them
successfully, the damage is rolled twice and the
higher value is applied.;
Dissolve - this being is able to dissolve matter.
Any time it is successfully struck the attacker
must test their luck. On a fail, their weapon is
destroyed.;
Ethereal - this creature does not exist in the material plane. It can only be harmed by magic and
magical weapons, and can pass through solid barriers such as doors and walls with ease.
Flame - the being has a flame attack that they can
use once a round that ignores armour.;
Flying - using wings or similar, this creature can
fly. Treat this as normal movement, but ignoring
barriers that can be flown over at the game master's discretion. This creature cannot be engaged
in melee combat whilst flying unless it chooses to
attack, in which case it can be targeted.;
Formless - The body of this creature has no real
form, so it may slide under doors, squeeze through
narrow spaces etc. as if it were a thick, viscous
liquid.;

Intelligent - this being is intelligent, can speak
(but perhaps not in a tongue the characters know)
and use tools and weapons. It is also able to create strategies and plans.;
Poisonous - this creature carries a poison or can
inject a venom. If it successfully hits a target,
the victim must test their luck. If they fail,
the victim is poisoned, and loses 1d6 stamina at
the start of the next 1d3 rounds. Poison or venom
effects from the same source are not cumulative,
although of course the creature can still inflict
its normal damage when it hits.;
Puppet - the creature has no will of its own and
must be directed by another mind. In consequence,
it never surrenders or flees and will fight until
destroyed.;
Regenerating - the being is able to recover damage.
Every round the being regains 1d6 stamina, up to a
maximum of its starting value.;
Spell caster - the being is able to cast spells.
The games master should feel free to assign the
creature spells that reflect its power. It uses
stamina to cast spells and requires an incantation
skill check.;
Tracking - the creature is excellent at tracking
other creatures by scent or another sense. Treat
its adventuring skill at three times the normal
level for tests involving tracking.`;

const beastAbilitiesObj = (input) => {
	let output = {};
	let parts = input.split(/[\s\n]*;[\s\n]*/g).filter(v=>v);
	console.log(parts);
	parts.forEach(ab => {
		let abParts = ab.split(/\s*-\s*/);
		output[abParts[0]] = abParts[1].replace(/^[a-z]/, (match) => match.toUpperCase()).replace(/\n/g, ' ');
	});
	return output;
};
//let beast = beastAbilitiesObj(abils);

const beastOutput = {
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
};
//console.log(Object.keys(beastOutput).map(abil => `<option value="${abil}">${emproper(abil)}</option>`).join(''));

// WEAPON CRIT TABLES
const weaponTypes = {
	unarmed: {
		damage: '1d6 - 2',
		type: 'crushing',
		threat: 'casual',
		skill: 'brawling'
	},
	club: {
		damage: '1d6 - 1',
		type: 'crushing',
		threat: 'casual',
		skill: 'blunt'
	},
	knife: {
		damage: '1d6 + 1',
		type: 'slashing',
		threat: 'casual',
		skill: 'small_blade'
	},
	dagger: {
		damage: '1d6 + 2',
		type: 'piercing',
		threat: 'casual',
		skill: 'small_blade'
	},
	short_sword: {
		damage: '1d6 + 3',
		type: 'slashing',
		threat: 'casual',
		skill: 'large_blade'
	},
	arming_sword: {
		damage: '2d6',
		type: 'slashing',
		threat: 'casual',
		skill: 'large_blade'
	},
	hammer: {
		damage: '2d6',
		type: 'crushing',
		threat: 'martial',
		skill: 'blunt',
	},
	axe: {
		damage: '2d6 + 1',
		type: 'crushing',
		threat: 'martial',
		skill: 'pole_arm'
	},
	mace: {
		damage: '2d6 + 2',
		type: 'crushing',
		threat: 'martial',
		skill: 'blunt'
	},
	spear: {
		damage: '2d6 + 1',
		type: 'piercing',
		threat: 'martial',
		skill: 'pole_arm'
	},
	pole_arm: {
		damage: '2d6 + 2',
		type: 'slashing',
		threat: 'martial',
		skill: 'pole_arm'
	},
	['2h_sword']: {
		damage: '2d6 + 3',
		type: 'slashing',
		threat: 'martial',
		skill: 'large_blade'
	},
	staff: {
		damage: '1d6',
		type: 'crushing',
		threat: 'casual',
		skill: 'blunt'
	},
	bow: {
		damage: '2d6 + 1',
		type: 'piercing',
		threat: 'casual',
		skill: 'bow',
		ranged: 1
	},
	crossbow: {
		damage: '2d6 + 2',
		type: 'piercing',
		threat: 'martial',
		skill: 'crossbow',
		ranged: 1
	},
};
let nums = new Array(20).fill().map((x,i) => i+1); //`{{#rollTotal() optionroll 1}}<div class="sheet-wart-row sheet-rolltable">{{option1}}</div>{{/rollTotal() optionroll 1}}`;
let rollTableHTML = nums.map(n => `{{#rollTotal() optionroll ${n}}}<div class="sheet-wart-row sheet-rolltable">{{option${n}}}</div>{{/rollTotal() optionroll ${n}}}`);
let rollTableHTML2 = nums.map(n => `option${n}`);
//copyToCB(rollTableHTML2.join(' '));
//copyToCB(Object.keys(weaponTypes).map(w=>`<option value="${w}">${emproper(w)}</option>`).join(''));
let critStr = ``
let arr = critStr.split(/\n\d+[+]?\s+/).filter(v=>v);
let output = {};
for (let i=0; i<20; i++) {
	output[i+1] = `${arr[i]}`.replace(/\n/g, ' ');
}
//console.log(output);
//console.log(skills.length)
//copyToCB(generateSkillListHTML('right'))

console.log('brk');