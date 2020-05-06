"use strict";
const characterData = {
	"lady blackbird": {
		desc: 'An Imperial noble, in disguise, escaping an arranged marriage so she can be with her lover',
		keysecret: [
			{
				name: 'Key of the Paragon',
				desc: 'As a noble, you’re a cut above the common man. Hit your key when you demonstrate your superiority or when your noble traits overcome a problem. Buyoff: Disown your noble heritage.',
			},
			{
				name: 'Key of the Mission',
				desc: 'You must escape the Empire and rendezvous with your once secret lover, the Pirate King Uriah Flint, whom you haven’t seen in six years. Hit your key when you take action to complete the mission. Buyoff: Give up on your mission.',
			},
			{
				name: 'Key of the Impostor',
				desc: 'You are in disguise, passing yourself off as commoner. Hit your key when you perform well enough to fool someone with your disguise. Buyoff: Reveal your true identity to someone you fooled.',
			},
			{
				name: 'Secret of Stormblood',
				desc: 'As long as you can speak, you can channel magical power and do Sorcery. You have the Master Sorcerer trait and the Stormblood tag.',
			},
			{
				name: 'Secret of Inner Focus',
				desc: 'Once per session, you can re-roll a failure when doing Sorcery.',
			},
		],
		trait: [
			{
				name: 'Imperial Noble',
				tags: 'Etiquette, Dance, Educated, History, Science, Wealth, Connections, House Blackbird',
			},
			{
				name: 'Master Sorcerer',
				tags: 'Spellcaster, Channeling, Stormblood, Wind, Lightning, [Fly], [Blast], [Sense]',
			},
			{
				name: 'Athletic',
				tags: 'Run, Fencing, Rapier, Duels, Shooting, [Pistol], [Acrobatics]',
			},
			{
				name: 'Charm',
				tags: 'Charisma, Presence, Command, Nobles, Servants, [Soldiers]',
			},
			{
				name: 'Cunning',
				tags: 'Deception, Misdirection, Disguise, Codes, [Sneak], [Hide]',
			},
		],
	},
	"naomi bishop": {
		desc: 'Former pit-fighter and bodyguard to Lady Blackbird',
		keysecret: [
			{
				name: 'Key of the Guardian',
				desc: 'You are Lady Blackbird’s loyal defender. Hit your key when you make a decision influenced by Lady Blackbird or protect her from harm. Buyoff: Sever your relationship with the Lady.',
			},
			{
				name: 'Key of Vengeance',
				desc: 'The Empire enslaved you and made you kill for sport. You will have your revenge on them and watch their cities burn. Hit your key when you strike a blow against the Empire (especially by killing an Imperial). Buyoff: Forgive them for what they did to you.',
			},
			{
				name: 'Key of the Warrior',
				desc: 'You crave the crash and roar of battle, the tougher the better. Hit your key when you do battle with worthy or superior foes. Buyoff: Pass up an opportunity for a good fight.',
			},
			{
				name: 'Secret of Destruction',
				desc: 'You can break things with your bare hands as if you were swinging a sledgehammer. It’s scary.',
			},
			{
				name: 'Secret of the Bodyguard',
				desc: 'Once per session, you can re-roll a failure when protecting someone.',
			},
		],
		trait: [
			{
				name: 'Pit-Fighter',
				tags: 'Combat Tested, Brutal, Living Weapon, Fast, Hard, [Strong], [Bone-breaking], [Scary Look]',
			},
			{
				name: 'Bodyguard',
				tags: 'Awareness, Threats, Defend, Disarm, Restrain, Carry, Delay, [Security], [First Aid]',
			},
			{
				name: 'Ex-Slave',
				tags: 'Sneak, Hide, Run, Tough, Endure, Scrounge, Nobles, [Hatred], [Iron Will]',
			},
			{
				name: 'Keen',
				tags: 'Insightful, Aware, Coiled, Liars, Traps, [Danger], [Sense Motives]',
			},
		],
	},
	"cyrus vance": {
		desc: 'An ex-Imperial soldier turned smuggler and soldier-of-fortune, Captain of The Owl',
		keysecret: [
			{
				name: 'Key of the Commander',
				desc: 'You are accustomed to giving orders and having them obeyed. Hit your key when you come up with a plan and give orders to make it happen. Buyoff: Acknowledge someone else as the leader.',
			},
			{
				name: 'Key of Hidden Longing',
				desc: 'You are completely enthralled by Lady Blackbird, but you don’t want her to know it. Hit your key when you make a decision based on this secret affection or when you somehow show it indirectly. Buyoff: Give up on your secret desire or make it public.',
			},
			{
				name: 'Key of the Outcast',
				desc: 'You got exiled from the Empire. Hit your key when your outcast status causes you trouble or is important in a scene. Buyoff: Regain your former standing or join a new group.',
			},
			{
				name: 'Secret of Leadership',
				desc: 'Once per session, you can give someone else a chance to re-roll a failed roll, by giving them orders, advice, or setting a good example.',
			},
			{
				name: 'Secret of Warpblood',
				desc: 'Once per session, you can teleport yourself or someone you’re touching.',
			},
		],
		trait: [
			{
				name: 'Ex-Imperial Soldier',
				tags: 'Tactics, Command, Soldiers, Rank, Connections, Maps, Imperial War Ships',
			},
			{
				name: 'Smuggler',
				tags: 'Haggle, Deception, Sneak, Hide, Camouflage, Forgery, Pilot, Navigation, [Repair], [Gunnery]',
			},
			{
				name: 'Survivor',
				tags: 'Tough, Run, Scrounge, Endure, Creepy Stare, Intimidate, [Medic]',
			},
			{
				name: 'Warrior',
				tags: 'Battle-Hardened, Shooting, Two-Gun Style, Pistol, Fencing, Sword, [Brawl], [Hail of Lead]',
			},
		],
	},
	"kale arkam": {
		desc: 'A burglar and petty sorcerer, first mate and mechanic of The Owl',
		keysecret: [
			{
				name: 'Key of Greed',
				desc: 'You like the shiny things. Hit your key when you steal something cool or score a big payoff. Buyoff: Swear off stealing forever.',
			},
			{
				name: 'Key of the Mission',
				desc: 'You must safely deliver Lady Blackbird to the Pirate King Uriah Flint, so she can marry him. Hit your key when you take action to complete the mission. Buyoff: Give up the mission.',
			},
			{
				name: 'Key of Fraternity',
				desc: 'You are sworn to Captain Vance in a bond of brotherhood. Hit your key when your character is influenced by Vance or when you show how deep your bond is. Buyoff: Sever the relationship.',
			},
			{
				name: 'Secret of Concealment',
				desc: 'No matter how thoroughly you’re searched, you always have a few key items with you. You can produce any common, simple item at a moment’s notice.',
			},
			{
				name: 'Secret of Reflexes',
				desc: 'Once per session, you can re-roll a failure when doing anything involving grace, dexterity, or quick reflexes.',
			},
		],
		trait: [
			{
				name: 'Burglar',
				tags: 'Quiet, Sneak, Hide, Dextrous, Locks, Perceptive, Traps, Darkness, [Alarms], [Distractions]',
			},
			{
				name: 'Tricky',
				tags: 'Quick, Dirty Fighting, Tumbler, Escape, Contortionist, [Sleight of Hand], [Acrobatics], [Dagger]',
			},
			{
				name: 'Petty Magic (use one spell tag at a time)',
				tags: 'Light spell, Dark spell, Jump spell, Shatter Spell, [Channeling], [Spellcaster]',
			},
			{
				name: 'Mechanic',
				tags: 'Repair, Engines, Efficiency, Spare Parts, Sabotage, [Enhancements], [Ship Weapons]',
			},
		],
	},
	"snargle": {
		desc: 'A goblin sky-sailor and pilot of The Owl',
		keysecret: [
			{
				name: 'Key of the Daredevil',
				desc: 'You thrive in dangerous situations. Hit your key when you do something cool that is risky or reckless (especially piloting stunts). Buyoff: Be very very careful.',
			},
			{
				name: 'Key of Conscience',
				desc: 'You don’t like to see anyone suffer, even enemies. Hit your key when you help someone who is in trouble or when you change someone’s life for the better Buyoff: Ignore a request for help.',
			},
			{
				name: 'Key of Banter',
				desc: 'You have a knack for snappy comments. Hit your key when Snargle says something that makes the other players laugh or when you explain something using your pilot techno jargon. Buyoff: Everyone groans at one of your comments.',
			},
			{
				name: 'Secret of Shape Warping',
				desc: 'As a goblin, you can change your shape, growing shorter, taller, fatter, thinner, or changing your skin color, at will.',
			},
			{
				name: 'Secret of the Lucky Break',
				desc: 'Once per session, you can keep your pool dice when you succeed (so go ahead and use ‘em all).',
			},
		],
		trait: [
			{
				name: 'Pilot',
				tags: 'Daring, Steady, Maneuvering, Evasion, Tricky flying, Navigation, Maps, Atmospherics. [The Owl], [Battle], [Ramming]',
			},
			{
				name: 'Sky Sailor',
				tags: 'Gunnery, Aim, Maintenance, Observation, Signals, Empire, Pirates, Free Worlds, Haven, [Repair], [Connections]',
			},
			{
				name: 'Goblin',
				tags: 'Warp shape, Glide, Nightvision, Agile, Quick, Tumbler, Teeth & Claws, [Mimic Shape], [Reckless], [Connections]',
			},
			{
				name: 'Sly',
				tags: 'Crafty, Sneaky, Distractions, Bluff, Languages, Trade Speak, [Sharp], [Disguise]',
			},
		],
	},
};
const autoExpandFields =  [
	'repeating_trait:tags',
	'repeating_keysecret:desc',
];
const fillRepeatingSectionFromData = (sectionName, dataList) => {
	getSectionIDs(`repeating_${sectionName}`, idList => {
		const existingRowAttributes = idList.map(id => `repeating_${sectionName}_${id}_name`);
		getAttrs(existingRowAttributes, v => {
			const existingRowNames = existingRowAttributes.map(name => v[name]),
				createdIDs = [],
				setting = dataList.filter(o => !existingRowNames.includes(o.name))
				.map(o => {
					let rowID;
					while (!rowID) {
						let newID = generateRowID();
						if (!createdIDs.includes(newID)) {
							rowID = newID;
							createdIDs.push(rowID);
						}
					}
					return Object.keys(o).reduce((m, key) => {
						m[`repeating_${sectionName}_${rowID}_${key}`] = o[key];
						return m;
					}, {});
				})
				.reduce((m, o) => Object.assign(m, o), {});
			setAttrs(setting);
		});
	});
};
autoExpandFields.forEach(name => {
	on(`change:${name}`, event => {
		const attrName = name.replace(':', '_');
		getAttrs([attrName], v => {
			if (v[attrName].trim() !== v[attrName] && event.sourceType === 'player') {
				setAttrs({
					[attrName]: v[attrName].trim()
				});
			}
		});
	});
});
on('change:char_name', () => {
	getAttrs(['char_name'], v => {
		if (v.char_name.toLowerCase() in characterData) {
			setAttrs({char_desc: characterData[v.char_name.toLowerCase()].desc});
			fillRepeatingSectionFromData('trait', characterData[v.char_name.toLowerCase()].trait);
			fillRepeatingSectionFromData('keysecret', characterData[v.char_name.toLowerCase()].keysecret);
		}
	});
});
