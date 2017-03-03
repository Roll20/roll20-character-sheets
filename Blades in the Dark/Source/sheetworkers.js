<script type="text/worker">
/* DEFAULT FILLS FOR PLAYBOOKS AND CREWS */
/* Set some default fields when setting crew type or playbook */
var crewData = {
	assassins: {
		abilities: [
			{
				name: 'Deadly',
				description: 'Each PC may add +1 action rating to Hunt, Prowl, or Skirmish (up to a max rating of 3).'
			},
			{
				name: 'Crow\'s Veil',
				description: 'Due to hard-won experience or occult ritual, your activities are hidden from the notice of the death-seeker crows. You don\'t take extra heat when killing is involved on a score.'
			},
			{
				name: 'Emberdeath',
				description: 'Due to hard-won experience or occult ritual, you know the arcane method to destroy a living victim\'s spirit at the moment you kill them. Take 3 stress to channel electroplasmic energy from the ghost field to disintegrate the spirit and dead body in a shower of sparking embers.'
			},
			{
				name: 'No Traces',
				description: 'When you keep an operation quiet or make it look like an accident, you get half the rep value of the target (round up) instead of zero. When you end downtime with zero heat, take +1 rep.'
			},
			{
				name: 'Patron',
				description: 'When you advance your Tier, it costs half the coin it normally would. Who is your patron? Why do they help you?'
			},
			{
				name: 'Predators',
				description: 'When you use stealth or subterfuge to commit murder, take +1d to the engagement roll.'
			},
			{
				name: 'Vipers',
				description: 'When you acquire or craft poisons, you get +1 result level to your roll. When you employ a poison, you are specially prepared to be immune to its effects.'
			}
		],
		base: {
			claim_1_desc: '+1 scale for your\nSkulks cohorts',
			claim_1_name: 'Training\nRooms',
			claim_2_desc: '(Tier roll) - Heat =\ncoin in downtime',
			claim_2_name: 'Vice Den',
			claim_3_desc: '+2 coin for lower-\nclass targets',
			claim_3_name: 'Fixer',
			claim_4_desc: '+1d gather info\nfor scores',
			claim_4_name: 'Informants',
			claim_5_desc: 'Body disposal,\n+1d to reduce heat\nafter killing',
			claim_5_name: 'Hagfish Farm',
			claim_6_desc: '+1 rep per score',
			claim_6_name: 'Victim\nTrophies',
			claim_7_desc: '',
			claim_7_name: '\nTurf',
			claim_9_desc: '',
			claim_9_name: '\nTurf',
			claim_10_desc: '-2 heat per score',
			claim_10_name: 'Cover\nOperation',
			claim_11_desc: '(Tier roll) - Heat =\ncoin in downtime',
			claim_11_name: 'Protection\nRacket',
			claim_12_desc: '+1d to healing\nrolls',
			claim_12_name: 'Infirmary',
			claim_13_desc: '+2 coin for high-\nclass targets',
			claim_13_name: 'Envoy',
			claim_14_desc: '+1d engagement\nfor deception and\n social plans',
			claim_14_name: 'Cover Identities',
			claim_15_desc: '+1d engagement\nfor stealth plans',
			claim_15_name: 'City Records',
			claim_bridge_2_3: 0,
			claim_bridge_3_4: 0,
			claim_bridge_6_7: 0,
			claim_bridge_9_14: 0,
			claim_bridge_12_13: 0,
			claim_bridge_13_14: 0,
			crew_description: 'Murderers\nfor Hire',
			crew_xp_condition: 'Execute a successful accident, disappearance, murder, or ransom operation.',
			hunting_grounds_type: 'Hunting Grounds:',
			hunting_grounds_description: 'Accident - Disappearance - Murder - Ransom',
			upgrade_1_desc: 'Hardened (+1 trauma box)',
			upgrade_2_desc: 'Assassin rigging (2 free load of weapons or gear)',
			upgrade_2_tall: 'on',
			upgrade_3_desc: 'Ironhook Contacts (+1 Tier in prison)',
			upgrade_3_tall: 'on',
			upgrade_4_desc: 'Elite Skulks',
			upgrade_5_desc: 'Elite Thugs',
			upgrade_20_check: 'on',		/* Insight */
			upgrade_21_check: 'on'		/* Prowess */
		},
		contacts: [
			'Trev, a gang boss',
			'Lydra, a deal broker',
			'Irimina, a vicious noble',
			'Karlos, a bounty hunter',
			'Exeter, a spirit warden',
			'Sevoy, a merchant lord'
		]
	},
	bravos: {
		abilities: [
			{
				name: 'Dangerous',
				description: 'Each PC may add +1 action rating to Hunt, Skirmish, or Wreck (up to a max rating of 3).'
			},
			{
				name: 'Blood Brothers',
				description: 'When you fight alongside your cohorts in combat, they get +1d for teamwork rolls (setup and group actions). All of your cohorts get the thugs type for free (if they\'re already thugs, add another type).'
			},
			{
				name: 'Door Kickers',
				description: 'When you execute an assault plan, take +1d to the engagement roll.'
			},
			{
				name: 'Fiends',
				description: 'Fear is as good as respect. You may count each wanted level as if it was turf.'
			},
			{
				name: 'Forged in the Fire',
				description: 'Each PC has been toughened by cruel experience. You get +1d to resistance rolls.'
			},
			{
				name: 'Patron',
				description: 'When you advance your Tier, it costs half the coin it normally would. Who is your patron? Why do they help you?'
			},
			{
				name: 'War Dogs',
				description: 'When you’re at war (-3 faction status), your crew does not suffer -1 hold and PCs still get two downtime activities, instead of just one.'
			}
		],
		base: {
			claim_1_desc: '+1 scale for your\nSkulks cohorts',
			claim_1_name: 'Barracks',
			claim_2_desc: '',
			claim_2_name: '\nTurf',
			claim_3_desc: '+2 coin for battle\nor extortion',
			claim_3_name: 'Terrorized\nCitizens',
			claim_4_desc: '+1d gather info\nfor scores',
			claim_4_name: 'Informants',
			claim_5_desc: '(Tier roll) - Heat =\ncoin in downtime',
			claim_5_name: 'Protection\nRacket',
			claim_6_desc: '(Tier roll) - Heat =\ncoin in downtime',
			claim_6_name: 'Fighting Pits',
			claim_7_desc: '',
			claim_7_name: '\nTurf',
			claim_9_desc: '',
			claim_9_name: '\nTurf',
			claim_10_desc: '',
			claim_10_name: '\nTurf',
			claim_11_desc: '+1d to healing\nrolls',
			claim_11_name: 'Infirmary',
			claim_12_desc: '-2 heat per score',
			claim_12_name: 'Bluecoat\nIntimidation',
			claim_13_desc: '+2 coin for lower-\nclass targets',
			claim_13_name: 'Street Fence',
			claim_14_desc: 'Stockpiles give you\n+1d to acquire\nassets',
			claim_14_name: 'Warehouses',
			claim_15_desc: '+1d engagement\nfor assault plans',
			claim_15_name: 'Bluecoat\nConfederates',
			claim_bridge_3_4: 0,
			claim_bridge_2_7: 0,
			claim_bridge_12_13: 0,
			cohort1_subtype: 'Thugs',
			crew_description: 'Mercenaries,\nThugs &\nKillers',
			crew_xp_condition: 'Execute a successful battle, extortion, sabotage, or smash & grab operation.',
			hunting_grounds_type: 'Hunting Grounds:',
			hunting_grounds_description: 'Battle - Extortion - Sabotage - Smash & Grab',
			upgrade_1_desc: 'Hardened (+1 trauma box)',
			upgrade_2_desc: 'Bravos rigging (2 free load of weapons or armor)',
			upgrade_2_tall: 'on',
			upgrade_3_desc: 'Ironhook Contacts (+1 Tier in prison)',
			upgrade_3_tall: 'on',
			upgrade_4_desc: 'Elite Rovers',
			upgrade_5_desc: 'Elite Thugs',
			upgrade_21_check: 'on'		/* Prowess */
		},
		contacts: [
			'Meg, a pit-fighter',
			'Conway, a bluecoat',
			'Keller, a blacksmith',
			'Tomas, a physicker',
			'Walker, a ward boss',
			'Lutes, a tavern owner'
		]
	},
	cult: {
		abilities: [
			{
				name: 'Chosen',
				description: 'Each PC may add +1 action rating to Attune, Study, or Sway (up to a max rating of 3).'
			},
			{
				name: 'Anointed',
				description: 'You get +1d to resistance rolls against supernatural threats. You get +1d to healing rolls when you have supernatural harm.'
			},
			{
				name: 'Bound in Darkness',
				description: 'You may use teamwork with any cult member, regardless of the distance separating you. By taking 1 stress, your whispered message is heard by every cultist.'
			},
			{
				name: 'Conviction',
				description: 'Each PC gains an additional Vice: Worship. When you indulge this vice and bring a pleasing sacrifice, you don\'t overindulge if you clear excess stress. In addition, your deity will assist any one action roll you make—from now until you indulge this vice again.'
			},
			{
				name: 'Glory Incarnate',
				description: 'Your deity sometimes manifests in the physical world. This can be a great boon, but the priorities and values of a god are not those of mortals. You have been warned.'
			},
			{
				name: 'Sealed in Blood',
				description: 'Each human sacrifice yields -3 stress cost for any ritual you perform.'
			},
			{
				name: 'Zealotry',
				description: 'Your cohorts have abandoned their reason to devote themselves to the cult. They will undertake any service, no matter how dangerous or strange. They gain +1d to rolls against enemies of the faith.'
			}
		],
		base: {
			claim_1_desc: '+1 scale for your\nAdepts cohorts',
			claim_1_name: 'Cloister',
			claim_2_desc: '(Tier roll) - Heat =\ncoin in downtime',
			claim_2_name: 'Vice Den',
			claim_3_desc: '+2 coin for occult\noperations',
			claim_3_name: 'Offertory',
			claim_4_desc: '-1 stress cost for\nall arcane powers\nand rituals',
			claim_4_name: 'Ancient Obelisk',
			claim_5_desc: '+1d to Consort\nw/ arcane entities\non site',
			claim_5_name: 'Ancient\nTower',
			claim_6_desc: '',
			claim_6_name: '\nTurf',
			claim_7_desc: '',
			claim_7_name: '\nTurf',
			claim_9_desc: '',
			claim_9_name: '\nTurf',
			claim_10_desc: '',
			claim_10_name: '\nTurf',
			claim_11_desc: '+1d to Attune\non site',
			claim_11_name: 'Spirit Well',
			claim_12_desc: 'Safe passage in\nthe Deathlands',
			claim_12_name: 'Ancient Gate',
			claim_13_desc: '+1d to Command\nand Sway on site',
			claim_13_name: 'Sanctuary',
			claim_14_desc: '+1d to healing\nrolls',
			claim_14_name: 'Sacred Nexus',
			claim_15_desc: '+1d engagement\nfor occult plans',
			claim_15_name: 'Ancient Altar',
			claim_bridge_3_4: 0,
			claim_bridge_4_9: 0,
			claim_bridge_6_11: 0,
			claim_bridge_12_13: 0,
			claim_bridge_13_14: 0,
			cohort1_subtype: 'Adepts',
			crew_description: 'Acolytes\nof a Deity',
			crew_xp_condition: 'Advance the agenda of your deity or embody its precepts in action.',
			hunting_grounds_type: 'Sacred Sites:',
			hunting_grounds_description: 'Acquisition - Augury - Consecration - Sacrifice',
			setting_show_deity: 'on',
			upgrade_1_desc: 'Ordained (+1 trauma box)',
			upgrade_2_desc: 'Cult rigging (2 free load of documents or implements)',
			upgrade_2_tall: 'on',
			upgrade_3_desc: 'Ritual sanctum in lair',
			upgrade_4_desc: 'Elite Adepts',
			upgrade_5_desc: 'Elite Thugs',
			upgrade_22_check: 'on'		/* Resolve */
		},
		contacts: [
			'Gagan, an academic',
			'Adikin, an occultist',
			'Hutchins, an antiquarian',
			'Moriya, a spirit trafficker',
			'Mateas Kline, a noble',
			'Bennett, an astronomer'
		]
	},
	hawkers: {
		abilities: [
			{
				name: 'Silver Tongues',
				description: 'Each PC may add +1 action rating to Command, Consort, or Sway (up to a max rating of 3).'
			},
			{
				name: 'Accord',
				description: 'Sometimes friends are as good as territory. You may count up to three +3 faction statuses you hold as if they are turf.'
			},
			{
				name: 'The Good Stuff',
				description: 'Your merchandise is exquisite. The product quality is equal to your Tier+2. When you deal with a crew or faction, the GM will tell you who among them is hooked on your product (one, a few, many, or all).'
			},
			{
				name: 'Ghost Market',
				description: 'Through arcane ritual or hard-won experience, you have discovered how to prepare your product for sale to ghosts and/or demons. They do not pay in coin. What do they pay with?'
			},
			{
				name: 'High Society',
				description: 'It\'s all about who you know. Take -1 heat during downtime and +1d to gather info about the city\'s elite.'
			},
			{
				name: 'Hooked',
				description: 'Your gang members use your product. Add the savage, unreliable, or wild flaw to your gangs to give them +1 quality.'
			},
			{
				name: 'Patron',
				description: 'When you advance your Tier, it costs half the coin it normally would. Who is your patron? Why do they help you?'
			}
		],
		base: {
			claim_1_desc: '',
			claim_1_name: '\nTurf',
			claim_2_desc: '+1d engagement\nroll for social plans',
			claim_2_name: 'Personal\nClothier',
			claim_3_desc: '+2 coin for\nshow of force or\nsocialize',
			claim_3_name: 'Local Graft',
			claim_4_desc: '+1d to Survery or\nHunt on your turf',
			claim_4_name: 'Lookouts',
			claim_5_desc: '+1d gather info\nfor scores',
			claim_5_name: 'Informants',
			claim_6_desc: '',
			claim_6_name: '\nTurf',
			claim_7_desc: '',
			claim_7_name: '\nTurf',
			claim_9_desc: '',
			claim_9_name: '\nTurf',
			claim_10_desc: '+1d to Consort\nand Sway on site',
			claim_10_name: 'Luxury Venue',
			claim_11_desc: '(Tier roll) - Heat =\ncoin in downtime',
			claim_11_name: 'Foreign Market',
			claim_12_desc: '(Tier roll) - Heat =\ncoin in downtime',
			claim_12_name: 'Vice Den',
			claim_13_desc: '+2 coin for product\nsale or supply',
			claim_13_name: 'Surplus Caches',
			claim_14_desc: '-2 heat per score',
			claim_14_name: 'Cover\nOperation',
			claim_15_desc: '+1d engagement\nfor deception and\ntransport plans',
			claim_15_name: 'Cover Identities',
			claim_bridge_2_3: 0,
			claim_bridge_3_4: 0,
			claim_bridge_6_7: 0,
			claim_bridge_10_15: 0,
			claim_bridge_12_13: 0,
			claim_bridge_13_14: 0,
			crew_description: 'Vice\nDealers',
			crew_xp_condition: 'Acquire product supply, execute clandestine/covert sales, or secure new territory.',
			hunting_grounds_type: 'Sales Territory:',
			hunting_grounds_description: 'Sale - Supply - Show of Force - Socialize',
			upgrade_1_desc: 'Composed (+1 stress box)',
			upgrade_2_desc: 'Hawker\'s rigging (1 carried item is concealed and has no load)',
			upgrade_2_tall: 'on',
			upgrade_3_desc: 'Ironhook Contacts (+1 Tier in prison)',
			upgrade_3_tall: 'on',
			upgrade_4_desc: 'Elite Rooks',
			upgrade_5_desc: 'Elite Thugs',
			upgrade_14_check: 'on',	/* Secure */
			upgrade_22_check: 'on'		/* Resolve */
		},
		contacts: [
			'Rolan Wott, a magistrate',
			'Laroze, a bluecoat',
			'Lydra, a deal broker',
			'Hosley, a smuggler',
			'Anya, a dilettante',
			'Marlo, a gang boss'
		]
	},
	shadows: {
		abilities: [
			{
				name: 'Everyone Steals',
				description: 'Each PC may add +1 action rating to Prowl, Finesse, or Tinker (up to a max rating of 3).'
			},
			{
				name: 'Ghost Echoes',
				description: 'From weird experience or occult ritual, all crew members gain the ability to see and interact with the ghostly structures, streets, and objects within the echo of Doskvol that exists in the ghost field.'
			},
			{
				name: 'Pack Rats',
				description: 'Your lair is a jumble of stolen items. When you roll to acquire an asset, take +1d.'
			},
			{
				name: 'Patron',
				description: 'When you advance your Tier, it costs half the coin it normally would. Who is your patron? Why do they help you?'
			},
			{
				name: 'Second Story',
				description: 'When you execute a clandestine infiltration, you get +1d to the engagement roll.'
			},
			{
				name: 'Slippery',
				description: 'When you roll entanglements, roll twice and keep the one you want. When you reduce heat on the crew, take +1d.'
			},
			{
				name: 'Synchronized',
				description: 'When you perform a group action, you may count multiple 6s from different rolls as a critical success.'
			}
		],
		base: {
			claim_1_desc: '+1d to Command\nand Sway on site',
			claim_1_name: 'Interrogation\nChamber',
			claim_2_desc: '',
			claim_2_name: '\nTurf',
			claim_3_desc: '+2 coin for burglary\nor robbery',
			claim_3_name: 'Loyal Fence',
			claim_4_desc: '(Tier roll) - Heat =\ncoin in downtime',
			claim_4_name: 'Gambling Den',
			claim_5_desc: '+1d to Consort\nand Sway on site',
			claim_5_name: 'Tavern',
			claim_6_desc: '(Tier roll) - Heat =\ncoin in downtime',
			claim_6_name: 'Drug Den',
			claim_7_desc: '+1d gather info\nfor scores',
			claim_7_name: 'Informants',
			claim_9_desc: '',
			claim_9_name: '\nTurf',
			claim_10_desc: '+1d to Survey or\nHunt on your turf',
			claim_10_name: 'Lookouts',
			claim_11_desc: 'Body disposal,\n+1d to reduce heat\nafter killing',
			claim_11_name: 'Hagfish Farm',
			claim_12_desc: '+1d to healing\nrolls',
			claim_12_name: 'Infirmary',
			claim_13_desc: '+2 coin for espionage\nor sabotage',
			claim_13_name: 'Covert Drops',
			claim_14_desc: '',
			claim_14_name: '\nTurf',
			claim_15_desc: '+1d engagement\nfor stealth plans',
			claim_15_name: 'Secret\nPathways',
			claim_bridge_3_4: 0,
			claim_bridge_2_7: 0,
			claim_bridge_9_14: 0,
			claim_bridge_12_13: 0,
			crew_description: 'Thieves,\nSpies, and\nSaboteurs',
			crew_xp_condition: 'Execute a successful espionage, sabotage, or theft operation.',
			hunting_grounds_type: 'Hunting Grounds:',
			hunting_grounds_description: 'Burglary - Espionage - Robbery - Sabotage',
			upgrade_1_desc: 'Steady (+1 stress box)',
			upgrade_2_desc: 'Thief Rigging (2 free load of tools or gear)',
			upgrade_2_tall: 'on',
			upgrade_3_desc: 'Underground maps & passkeys',
			upgrade_4_desc: 'Elite Rooks',
			upgrade_5_desc: 'Elite Skulks',
			upgrade_10_check: 'on',		/* Hidden */
			upgrade_21_check: 'on'		/* Prowess */
		},
		contacts: [
			'Dowler, an explorer',
			'Laroze, a bluecoat',
			'Amancio, a deal broker',
			'Fitz, a collector',
			'Adelaide Phroaig, a noble',
			'Rigney, a tavern owner'
		]
	},
	smugglers: {
		abilities: [
			{
				name: 'Like Part of the Family',
				description: 'Create one of your vehicles as a cohort (use the vehicle edges and flaws, below). Its quality is equal to your Tier +1.'
			},
			{
				name: 'All Hands',
				description: 'During downtime, one of your cohorts may perform a downtime activity for the crew to acquire an asset, reduce heat, or work on a long-term project.'
			},
			{
				name: 'Ghost Passage',
				description: 'From harsh experience or occult ritual, all crew members become immune to possession by spirits, but may choose to "carry" a second ghost as a passenger within their body.'
			},
			{
				name: 'Just Passing Through',
				description: 'During downtime, take -1 heat. When your heat is 4 or less, you get +1d to deceive people when you pass yourselves off as ordinary citizens.'
			},
			{
				name: 'Leverage',
				description: 'Your crew supplies contraband for other factions. Your success is good for them. Whenever you gain rep, gain +1 rep.'
			},
			{
				name: 'Reavers',
				description: 'When you go into conflict aboard a vehicle, you gain +1 effect for vehicle damage and speed. Your vehicle gains armor.'
			},
			{
				name: 'Renegades',
				description: 'Each PC may add +1 action rating to Finesse, Prowl, or Skirmish (up to a max rating of 3).'
			}
		],
		base: {
			claim_1_desc: '',
			claim_1_name: '\nTurf',
			claim_2_desc: '(Tier roll) - Heat =\ncoin in downtime',
			claim_2_name: 'Side Business',
			claim_3_desc: '+2 coin for high-\nclass targets',
			claim_3_name: 'Luxury Fence',
			claim_4_desc: '(Tier roll) - Heat =\ncoin in downtime',
			claim_4_name: 'Vice Den',
			claim_5_desc: '+1d to Consort\nand Sway on site',
			claim_5_name: 'Tavern',
			claim_6_desc: 'Safe passage in\nthe Deathlands',
			claim_6_name: 'Ancient Gate',
			claim_7_desc: '',
			claim_7_name: '\nTurf',
			claim_9_desc: '',
			claim_9_name: '\nTurf',
			claim_10_desc: '',
			claim_10_name: '\nTurf',
			claim_11_desc: '+1d engagement\nfor transport plans',
			claim_11_name: 'Secret Routes',
			claim_12_desc: '+1d gather info\nfor scores',
			claim_12_name: 'Informants',
			claim_13_desc: 'Your cohorts have\ntheir own vehicles',
			claim_13_name: 'Fleet',
			claim_14_desc: '-2 heat per score',
			claim_14_name: 'Cover\nOperation',
			claim_15_desc: 'Stockpiles give you\n+1d to acquire\nassets',
			claim_15_name: 'Warehouse',
			claim_bridge_2_3: 0,
			claim_bridge_3_4: 0,
			claim_bridge_6_7: 0,
			claim_bridge_12_13: 0,
			claim_bridge_13_14: 0,
			cohort1_name: 'Vehicle',
			cohort1_subtype: 'Boat - Carriage - Other',
			cohort1_type: 'expert',
			crew_description: 'Suppliers\nof Illicit\nGoods',
			crew_xp_condition: 'Execute a successful smuggling or acquire new clients or contraband sources.',
			hunting_grounds_type: 'Cargo Types:',
			hunting_grounds_description: 'Arcane/Weird - Arms - Contraband - Passengers',
			upgrade_1_desc: 'Steady (+1 stress box)',
			upgrade_2_desc: 'Smuggler\'s rigging (2 items carried are perfectly concealed)',
			upgrade_2_tall: 'on',
			upgrade_3_desc: 'Camouflage (vehicles are perfectly concealed at rest)',
			upgrade_3_tall: 'on',
			upgrade_4_desc: 'Elite Rovers',
			upgrade_5_desc: 'Barge (+mobility for lair)',
			upgrade_6_check: 'on',					/* Vehicle */
			upgrade_6_desc: 'Vehicle',	/* change Carriage to Vehicle */
			upgrade_8_desc: 'Vehicle',	/* change Boat to Vehicle */
			upgrade_21_check: 'on'					/* Prowess */
		},
		contacts: [
			'Elynn, a dock worker',
			'Rolan, a drug dealer',
			'Sera, an arms dealer',
			'Nyelle, a spirit trafficker',
			'Decker, an anarchist',
			'Esme, a tavern owner'
		]
	}
	},
	playbookData = {
	cutter: {
		abilities: [
			{
				name: 'Battleborn',
				description: 'You may expend your special armor to reduce harm from an attack in combat or to push yourself during a fight.'
			},
			{
				name: 'Bodyguard',
				description: 'When you protect a teammate, take +1d to your resistance roll. When you gather info to anticipate possible threats in the current situation, you get +1 effect.'
			},
			{
				name: 'Ghost Fighter',
				description: 'You may imbue your hands, melee weapons, or tools with spirit energy. You gain potency in combat vs. the supernatural. You may grapple with spirits to restrain and capture them.'
			},
			{
				name: 'Leader',
				description: 'When you Command a cohort in combat, they continue to fight when they would otherwise break (they\'re not taken out when they suffer level 3 harm). They gain +1 effect and 1 armor.'
			},
			{
				name: 'Mule',
				description: 'Your load limits are higher. Light: 5. Normal: 7. Heavy: 8.'
			},
			{
				name: 'Not to be Trifled With',
				description: 'You can push yourself to do one of the following: perform a feat of physical force that verges on the superhuman — engage a small gang on equal footing in close combat.'
			},
			{
				name: 'Savage',
				description: 'When you unleash physical violence, it\'s especially frightening. When you Command a frightened target, take +1d.'
			},
			{
				name: 'Vigorous',
				description: 'You recover from harm faster. Permanently fill in one of your healing clock segments. Take +1d to healing treatment rolls.'
			}
		],
		base: {
			command1: '1',
			gatherinfo1: 'How can I hurt them?',
			gatherinfo2: 'Who\'s most afraid of me?',
			gatherinfo3: 'Who\'s most dangerous here?',
			gatherinfo4: 'What do they intend to do?',
			gatherinfo5: 'How can I get them to [X]?',
			gatherinfo6: 'Are they telling the truth?',
			item_1_desc: 'Fine heavy weapon',
			item_2_desc: 'Fine hand weapon',
			item_6_desc: 'Scary weapon or tool',
			item_7_desc: 'Manacles & chain',
			item_8_desc: 'Rage essence vial',
			item_9_desc: 'Spiritbane charm',
			playbook_description: 'A Dangerous &\nIntimidating\nFighter',
			setting_showitem_0: '0',
			setting_showitem_3: '0',
			setting_showitem_4: '0',
			setting_showitem_5: '0',
			setting_traumata_set: 'normal',
			setting_vice_type: 'normal',
			skirmish1: '1',
			skirmish2: '1',
			xp_condition: 'You addressed a challenge with violence or coercion.'
		},
		friends: [
			'Marlane, a pugilist',
			'Chael, a vicious thug',
			'Mercy, a cold killer',
			'Grace, an extortionist',
			'Sawtooth, a physicker'
		]
	},
	ghost: {
		abilities: [
			{
				name: 'Ghost Form',
				description: 'You are now a concentration of electroplasmic vapor which resembles your living body and clothes. You may weakly interact with the physical world and vice versa. You\'re vulnerable to arcane powers and electroplasmic effects. You move about by floating and may fly swiftly without tiring. You may slowly flow through small openings as a vapor. You chill the area around you and are terrifying for the living to behold. You are affected by spiritbane charms (take 2 drain to overcome the repulsion). Whenever you would take stress, take drain instead. When you would take trauma, take gloom instead.'
			},
			{
				name: 'Dissipate',
				description: 'You can disperse the electroplasmic vapor of your ghostly form in order to pass through solid objects for a moment. Take 1 drain when you dissipate, plus 1 drain for each feature: It lasts longer (a minute — an hour — a day) — you also become invisible — anything that passes through your form becomes dangerously electrified or frozen.'
			},
			{
				name: 'Manifest',
				description: 'Take 1 drain to flow through the electroplasmic pathways of the ghost field in order to instantly travel to any place you knew intimately in life, or to answer the summoning call of a compel.'
			},
			{
				name: 'Poltergeist',
				description: 'Take 1 drain to strongly interact with the physical world for a few moments (as if you had a normal body). Extend the reach and magnitude of your interaction to include telekinetic force and electroplasmic discharges by taking more drain (2-6).'
			},
			{
				name: 'Possess',
				description: 'You may attune to the ghost field in order to take control of a living body. When your control is challenged, you must re-attune (risking electroplasmic harm) or leave the body. Your control is challenged when: you consume spirit energy from the host — when arcane powers act against you — when the host\'s will is driven to desperation. You may easily and indefinitely possess a hull or hollow which has been ritually prepared for you (change your playbook to Hull or Vampire, respectively).'
			}
		],
		base: {
			gatherinfo1: 'What do they intend to do?',
			gatherinfo2: 'How can I get them to [X]?',
			gatherinfo3: 'What are they really feeling?',
			gatherinfo4: 'What should I look out for?',
			gatherinfo5: 'Where\'s the weakness here?',
			gatherinfo6: 'How can I find [X]?',
			playbook_description: 'A spirit without a body',
			setting_showitem_0: '0',
			setting_showitem_1: '0',
			setting_showitem_2: '0',
			setting_showitem_3: '0',
			setting_showitem_4: '0',
			setting_showitem_5: '0',
			setting_showitem_6: '0',
			setting_showitem_7: '0',
			setting_showitem_8: '0',
			setting_showitem_9: '0',
			setting_stress_name: 'Drain',
			setting_trauma_name: 'Gloom',
			setting_traumata_set: 'ghost',
			setting_vice_type: 'ghost',
			xp_condition: 'You exacted vengeance upon those whom you deem deserving.',
			xp_condition2: 'You expressed your your outrage or anger, or settled scores from your heritage or background.',
			xp_condition3: 'You struggled with issues from your need or glooms during the session.'
		},
		friends: []
	},
	hound: {
		abilities: [
			{
				name: 'Sharpshooter',
				description: 'You can push yourself to do one of the following: make a ranged attack at extreme distance beyond what’s normal for the weapon — unleash a barrage of rapid fire to suppress the enemy.'
			},
			{
				name: 'Focused',
				description: 'You may expend your special armor to resist a consequence of surprise or mental harm (fear, confusion, losing track of someone) or to push yourself for ranged combat or tracking.'
			},
			{
				name: 'Ghost Hunter',
				description: 'Your hunting pet is imbued with spirit energy. It gains potency when tracking or fighting the supernatural, and gains an arcane ability: ghost-form, mind-link, or arrow-swift. Take this ability again to choose an additional arcane ability for your pet.'
			},
			{
				name: 'Scout',
				description: 'When you gather info to locate a target, you get +1 effect. When you hide in a prepared position or use camou age, you get +1d to rolls to avoid detection.'
			},
			{
				name: 'Survivor',
				description: 'From hard won experience or occult ritual, you are immune to the poisonous miasma of the deathlands and are able to subsist on the strange flora and fauna there. You get +1 stress box.'
			},
			{
				name: 'Tough as Nails',
				description: 'Penalties from harm are one level less severe (though level 4 harm is still fatal).'
			},
			{
				name: 'Vengeful',
				description: 'You gain an additional xp trigger: You got payback against someone who harmed you or someone you care about. If your crew helped you get payback, also mark crew xp.'
			}
		],
		base: {
			gatherinfo1: 'What do they intend to do?',
			gatherinfo2: 'How can I get them to [X]?',
			gatherinfo3: 'What are they really feeling?',
			gatherinfo4: 'Where are they vulnerable?',
			gatherinfo5: 'Where did [X] go?',
			gatherinfo6: 'How can I find [X]?',
			hunt1: '1',
			hunt2: '1',
			item_1_desc: 'Fine long rifle',
			item_2_desc: 'Fine pair of pistols',
			item_5_desc: 'Electroplasmic ammunition',
			item_6_desc: 'Spyglass',
			item_7_desc: 'A trained hunting pet',
			item_8_desc: 'Spiritbane charm',
			playbook_description: 'A Deadly\nSharpshooter\nand Tracker',
			setting_showitem_0: '0',
			setting_showitem_3: '0',
			setting_showitem_4: '0',
			setting_showitem_9: '0',
			setting_traumata_set: 'normal',
			setting_vice_type: 'normal',
			survey1: '1',
			xp_condition: 'You addressed a challenge with tracking or violence.'
		},
		friends: [
			'Steiner, an assassin',
			'Celene, a sentinel',
			'Melvir, a physicker',
			'Veleris, a spy',
			'Casta, a bounty hunter'
		]
	},
	hull: {
		abilities: [
			{
				name: 'Automaton',
				description: 'You are a spirit animating a clockwork body. You have human-like strength and senses, by default. Your hull has natural armor (this doesn\'t count for your load). Your former human feelings, interests, and connections are only dim memories. You now exist to fulfill your functions. Choose three. You may be rebuilt if damaged or destroyed. If your soul vessel is shattered, you are freed from servitude and become a Ghost. Whenever you would take stress, take drain instead.'
			},
			{
				name: 'Overcharge',
				description: 'Take 1 drain to perform a feat of extreme strength or speed (run faster than a horse, rend metal with bare hands, etc.). This factors into effect.'
			},
			{
				name: 'Compartments',
				description: 'Your items are built-in to your frame and may recess beneath panels out of sight. Your frame can now carry +2 load.'
			},
			{
				name: 'Electroplasmic Projectors',
				description: 'You may release some of your plasmic energy as an electrical shock around you or as a directed beam. You may also use this ability to create a lightning barrier to repel or trap a spirit. Take 1 drain for each level of magnitude.'
			},
			{
				name: 'Interface',
				description: 'You may attune to the local electroplasmic power field to control it or something connected to it (including another hull).'
			},
			{
				name: 'Secondary Hull',
				description: 'Choose an additional frame and its starting feature. You may transfer your consciousness between your frames at will.'
			},
			{
				name: 'Frame Upgrade',
				description: 'Choose an additional frame feature. This upgrade may be taken up to four times.'
			}
		],
		base: {
			gatherinfo1: 'What do they intend to do?',
			gatherinfo2: 'How can I get them to [X]?',
			gatherinfo3: 'What are they really feeling?',
			gatherinfo4: 'What should I look out for?',
			gatherinfo5: 'Where\'s the weakness here?',
			gatherinfo6: 'How can I find [X]?',
			playbook_description: 'A spirit animating a clockwork frame',
			setting_load_h: '7',
			setting_show_frame: 'on',
			setting_showitem_0: '0',
			setting_showitem_1: '0',
			setting_showitem_2: '0',
			setting_showitem_3: '0',
			setting_showitem_4: '0',
			setting_showitem_5: '0',
			setting_showitem_6: '0',
			setting_showitem_7: '0',
			setting_showitem_8: '0',
			setting_showitem_9: '0',
			setting_stress_name: 'Drain',
			setting_trauma_name: 'Wear',
			setting_traumata_set: 'hull',
			setting_vice_type: 'hull',
			xp_condition: 'You fulfilled your functions despite difficulty or danger.',
			xp_condition2: 'You suppressed or ignored your former human beliefs, drives, heritage, or background.',
			xp_condition3: 'You struggled with issues from your wear during the session.'
		},
		friends: []
	},
	leech: {
		abilities: [
			{
				name: 'Alchemist',
				description: 'When you invent or craft a creation with alchemical features, take +1 result level to your roll. You begin with one special formula already known.'
			},
			{
				name: 'Analyst',
				description: 'During downtime, you get two ticks to distribute among any long term project clocks that involve investigation or learning a new formula or design plan.'
			},
			{
				name: 'Artificer',
				description: 'When you invent or craft a creation with spark-craft features, take +1 result level to your roll. You begin with one special design already known.'
			},
			{
				name: 'Fortitude',
				description: 'You may expend your special armor to resist a consequence of fatigue, weakness, or chemical effects, or to push yourself when working with technical skill or handling alchemicals.'
			},
			{
				name: 'Ghost Ward',
				description: 'You know how to Wreck an area with arcane substances and methods so it is either anathema or enticing to spirits (your choice).'
			},
			{
				name: 'Physicker',
				description: 'You can Tinker with bones, blood, and bodily humours to treat wounds or stabilize the dying. You may study a malady or corpse. Everyone in your crew gets +1d to their healing treatment rolls.'
			},
			{
				name: 'Saboteur',
				description: 'When you Wreck, the work is much quieter than it should be and the damage is hidden from casual inspection.'
			},
			{
				name: 'Venomous',
				description: 'Choose a drug or poison (from your bandolier stock) to which you have become immune. You can push yourself to secrete it through your skin or saliva or exhale it as a vapor.'
			}
		],
		base: {
			gatherinfo1: 'What do they intend to do?',
			gatherinfo2: 'How can I get them to [X]?',
			gatherinfo3: 'Are they telling the truth?',
			gatherinfo4: 'What can I tinker with here?',
			gatherinfo5: 'What might happen if I [X]?',
			gatherinfo6: 'How can I find [X]?',
			item_0_desc: 'Gadgets',
			item_1_desc: 'Fine wrecker tools',
			item_2_desc: 'Fine tinkering tools',
			item_5_desc: 'Bandolier of alchemicals (3)',
			item_6_desc: 'Bandolier of alchemicals (3)',
			item_7_desc: 'Blowgun & darts, syringes',
			playbook_description: 'A Saboteur and\nTechnician',
			setting_showitem_3: '0',
			setting_showitem_4: '0',
			setting_showitem_8: '0',
			setting_showitem_9: '0',
			setting_traumata_set: 'normal',
			setting_vice_type: 'normal',
			tinker1: '1',
			tinker2: '1',
			wreck1: '1',
			xp_condition: 'You addressed a challenge with technical skill or mayhem.'
		},
		friends: [
			'Stazia, an apothecary',
			'Veldren, a psychonaut',
			'Eckerd, a corpse thief',
			'Jul, a blood dealer',
			'Malista, a priestess'
		]
	},
	lurk: {
		abilities: [
			{
				name: 'Infiltrator',
				description: 'You are not a ected by quality or Tier when you bypass security measures.'
			},
			{
				name: 'Ambush',
				description: 'When you attack from hiding or spring a trap, you get +1d.'
			},
			{
				name: 'Daredevil',
				description: 'When you roll a desperate action, you get +1d to your roll if you also take -1d to any resistance rolls against consequences from your action.'
			},
			{
				name: 'The Devil\'s Footsteps',
				description: 'When you push yourself, choose one of the following additional benefits: perform a feat of athletics that verges on the superhuman — maneuver to confuse your enemies so they mistakenly attack each other.'
			},
			{
				name: 'Expertise',
				description: 'Choose one of your action ratings. When you lead a group action using that action, you can suffer only 1 stress at most regardless of the number of failed rolls.'
			},
			{
				name: 'Ghost Veil',
				description: 'You may shift partially into the ghost field, becoming shadowy and insubstantial for a few moments. Take 2 stress when you shift, plus 1 stress for each extra feature: It lasts for a few minutes rather than moments — you are invisible rather than shadowy — you may float through the air like a ghost'
			},
			{
				name: 'Reflexes',
				description: 'When there\'s a question about who acts first, the answer is you (two characters with Reflexes act simultaneously).'
			},
			{
				name: 'Shadow',
				description: 'You may expend your special armor to resist a consequence from detection or security measures, or to push yourself for a feat of athletics or stealth.'
			}
		],
		base: {
			finesse1: '1',
			gatherinfo1: 'What do they intend to do?',
			gatherinfo2: 'How can I get them to [X]?',
			gatherinfo3: 'What should I look out for?',
			gatherinfo4: 'What\'s the best way in?',
			gatherinfo5: 'Where can I hide here?',
			gatherinfo6: 'How can I find [X]?',
			item_3_desc: 'Fine shadow cloak',
			item_4_desc: 'Fine lockpicks',
			item_5_desc: 'Light climbing gear',
			item_6_desc: 'Dark-sight goggles',
			item_7_desc: 'Silence potion vial',
			item_8_desc: 'Spiritbane charm',
			playbook_description: 'A Stealthy\nInfiltrator\nand Burglar',
			prowl1: '1',
			prowl2: '1',
			setting_showitem_0: '0',
			setting_showitem_1: '0',
			setting_showitem_2: '0',
			setting_showitem_9: '0',
			setting_traumata_set: 'normal',
			setting_vice_type: 'normal',
			xp_condition: 'You addressed a challenge with stealth or evasion.'
		},
		friends: [
			'Telda, a beggar',
			'Darmot, a bluecoat',
			'Frake, a locksmith',
			'Roslyn Kellis, a noble',
			'Petra, a city clerk'
		]
	},
	slide: {
		abilities: [
			{
				name: 'Rook\'s Gambit',
				description: 'Take 2 stress to roll your best action rating while performing a different action. Say how you adapt your skill to this use.'
			},
			{
				name: 'Cloak & Dagger',
				description: 'When you use a disguise or other form of covert misdirection, you get +1d to rolls to confuse or deflect suspicion. When you throw off your disguise, the resulting surprise gives you the initiative in the situation.'
			},
			{
				name: 'Ghost Voice',
				description: 'You know the secret method to interact with a ghost or demon as if it was a normal human, regardless of how wild or feral it appears. You gain potency when communicating with the supernatural.'
			},
			{
				name: 'Like Looking into a Mirror',
				description: 'You can always tell when someone is lying to you.'
			},
			{
				name: 'A Little Something on the Side',
				description: 'At the end of each downtime phase, you earn +2 stash.'
			},
			{
				name: 'Mesmerism',
				description: 'When you Sway someone, you may cause them to forget that it\'s happened until they next interact with you.'
			},
			{
				name: 'Subterfuge',
				description: 'You may expend your special armor to resist a consequence from suspicion or persuasion, or to push yourself for subterfuge.'
			},
			{
				name: 'Trust in Me',
				description: 'You get +1d vs. a target with whom you have an intimate relationship.'
			}
		],
		base: {
			consort1: '1',
			gatherinfo1: 'What do they intend to do?',
			gatherinfo2: 'How can I get them to [X]?',
			gatherinfo3: 'Are they telling the truth?',
			gatherinfo4: 'What are they really feeling?',
			gatherinfo5: 'What do they really care about?',
			gatherinfo6: 'How can I blend in here?',
			item_3_desc: 'Fine disguise kit',
			item_4_desc: 'Fine clothes & jewelry',
			item_6_desc: 'A cane-sword',
			item_7_desc: 'Fine loaded dice, trick cards',
			item_8_desc: 'Trance powder',
			item_9_desc: 'Spiritbane charm',
			playbook_description: 'A Subtle\nManipulator\nand Spy',
			setting_showitem_0: '0',
			setting_showitem_1: '0',
			setting_showitem_2: '0',
			setting_showitem_5: '0',
			setting_traumata_set: 'normal',
			setting_vice_type: 'normal',
			sway1: '1',
			sway2: '1',
			xp_condition: 'You addressed a challenge with deception or in influence.'
		},
		friends: [
			'Bryl, a drug dealer',
			'Bazso Baz, a gang leader',
			'Klyra, a tavern owner',
			'Nyryx, a prostitute',
			'Harker, a jail-bird'
		]
	},
	spider: {
		abilities: [
			{
				name: 'Foresight',
				description: 'Two times per score you can assist a teammate without paying stress. Tell us how you prepared for this.'
			},
			{
				name: 'Calculating',
				description: 'Due to your careful planning, during downtime, you may give yourself or another crew member +1 downtime action.'
			},
			{
				name: 'Connected',
				description: 'During downtime, you get +1 result level when you acquire an asset or reduce heat.'
			},
			{
				name: 'Functioning Vice',
				description: 'When you indulge your vice, you may adjust the dice outcome by 1 or 2 (up or down). An ally who joins in your vice may do the same.'
			},
			{
				name: 'Ghost Contract',
				description: 'When you shake on a deal, you and your partner — human or otherwise — both bear a mark of your oath. If either breaks the contract, they take level 3 harm, "Cursed".'
			},
			{
				name: 'Jail Bird',
				description: 'When incarcerated, your wanted level counts as 1 less, your Tier as 1 more, and you gain +1 faction status with a faction you help on the inside (in addition to your incarceration roll).'
			},
			{
				name: 'Mastermind',
				description: 'You may expend your special armor to protect a teammate, or to push yourself when you gather information or work on a long-term project.'
			},
			{
				name: 'Weaving the Web',
				description: 'You gain +1d to Consort when you gather information on a target for a score. You get +1d to the engagement roll for that operation.'
			}
		],
		base: {
			consort1: '1',
			consort2: '1',
			gatherinfo1: 'What do they want most?',
			gatherinfo2: 'What should I look out for?',
			gatherinfo3: 'Where\'s the leverage here?',
			gatherinfo4: 'How can I discover [X]?',
			gatherinfo5: 'What do they intend to do?',
			gatherinfo6: 'How can I get them to [X]?',
			item_3_desc: 'Fine bottle of whiskey',
			item_4_desc: 'Fine cover identity',
			item_5_desc: 'Blueprints',
			item_7_desc: 'Vial of slumber essence',
			item_8_desc: 'Concealed palm pistol',
			item_9_desc: 'Spiritbane charm',
			playbook_description: 'A Devious\nMastermind',
			setting_showitem_0: '0',
			setting_showitem_1: '0',
			setting_showitem_2: '0',
			setting_showitem_6: '0',
			setting_traumata_set: 'normal',
			setting_vice_type: 'normal',
			study1: '1',
			xp_condition: 'You addressed a challenge with calculation or conspiracy.'
		},
		friends: [
			'Salia, an information broker',
			'Augus, a master architect',
			'Jennah, a servant',
			'Riven, a chemist',
			'Jeren, a bluecoat archivist'
		]
	},
	whisper: {
		abilities: [
			{
				name: 'Compel',
				description: 'You can Attune to the ghost field to force a nearby ghost to appear and obey a command you give it. You are not supernaturally terrified by a ghost you summon or compel (though your allies may be).'
			},
			{
				name: 'Ghost Mind',
				description: 'You’re always aware of supernatural entities in your presence. Take +1d when you gather info about the supernatural.'
			},
			{
				name: 'Iron Will',
				description: ' You\'re immune to the terror that some supernatural entities inflict on sight. Take +1d to resistance rolls with Resolve.'
			},
			{
				name: 'Occultist',
				description: 'You know the secret ways to Consort with ancient powers, forgotten gods or demons. Once you\'ve consorted with one, you get +1d to command cultists who worship it.'
			},
			{
				name: 'Ritual',
				description: 'You can Study an occult ritual (or create a new one) to summon a supernatural effect or being. You know the arcane methods to perform ritual sorcery. You begin with one ritual already learned.'
			},
			{
				name: 'Strange Methods',
				description: 'When you invent or craft a creation with arcane features, take +1 result level to your roll. You begin with one arcane design already known.'
			},
			{
				name: 'Tempest',
				description: 'You can push yourself to do one of the following: unleash a stroke of lightning as a weapon — summon a storm in your immediate vicinity (torrential rain, roaring winds, heavy fog, chilling frost/snow, etc.).'
			},
			{
				name: 'Warded',
				description: 'You may expend your special armor to resist a supernatural consequence, or to push yourself when you deal with arcane forces.'
			}
		],
		base: {
			attune1: '1',
			attune2: '1',
			gatherinfo1: 'What is arcane or weird here?',
			gatherinfo2: 'What echoes in the ghost field?',
			gatherinfo3: 'What is hidden or lost here?',
			gatherinfo4: 'What do they intend to do?',
			gatherinfo5: 'What drives them to do this?',
			gatherinfo6: 'How can I reveal [X]?',
			item_1_desc: 'Fine lightning hook',
			item_2_desc: 'Fine spirit mask',
			item_6_desc: 'Spirit bottles (2)',
			item_7_desc: 'Electroplasm vials',
			item_8_desc: 'Ghost key',
			item_9_desc: 'Demonbane charm',
			playbook_description: 'An Arcane\nAdept and\nChanneler',
			setting_showitem_0: '0',
			setting_showitem_3: '0',
			setting_showitem_4: '0',
			setting_showitem_5: '0',
			setting_traumata_set: 'normal',
			setting_vice_type: 'normal',
			study1: '1',
			xp_condition: 'You addressed a challenge with knowledge or arcane power.'
		},
		friends: [
			'Nyryx, a possessor ghost',
			'Scurlock, a vampire',
			'Setarra, a demon',
			'Quellyn, a witch',
			'Flint, a spirit trafficker'
		]
	},
	vampire: {
		abilities: [
			{
				name: 'Undead',
				description: 'You are a spirit which animates an undead body. Your trauma is maxed out. Choose four trauma conditions which reflect your vampiric nature. Arcane attacks are potent against you. If you suffer fatal harm or trauma, your undead spirit is overwhelmed. You take level 3 harm: "Incapacitated" until you feed enough to recover. If you suffer arcane harm while in this state, you are destroyed utterly. Your XP tracks are longer (you now advance more slowly). You have more stress boxes.'
			},
			{
				name: 'Terrible Power',
				description: 'Take 1 stress to perform a feat of superhuman strength or speed (run faster than a carriage, break stone with bare hands, leap onto the roof of a building, etc.). This factors into effect.'
			},
			{
				name: 'Arcane Sight',
				description: 'Take 1 stress to sense beyond human limits. "Hear" a subject\'s true thoughts or feelings, see in pitch darkness, sense the presence of invisible things, intuit the location of a hidden object, etc.'
			},
			{
				name: 'A Void in the Echo',
				description: 'You are invisible to spirits and may not be harmed by them. Take 2 stress to cause living things to avert their gaze and fail to observe you for a few moments.'
			},
			{
				name: 'Dark Talent',
				description: 'Choose Insight, Prowess, or Resolve.Your max rating for actions under that attribute becomes 5. When you take this ability, add +1 dot to the resistance rating of the attribute you\'ve chosen.'
			},
			{
				name: 'Sinister Guile',
				description: 'During downtime, choose one: Get a free additional downtime activity, or take +1d to all downtime activity rolls.'
			}
		],
		base: {
			gatherinfo1: 'What do they intend to do?',
			gatherinfo2: 'How can I get them to [X]?',
			gatherinfo3: 'What are they really feeling?',
			gatherinfo4: 'What should I look out for?',
			gatherinfo5: 'Where\'s the weakness here?',
			gatherinfo6: 'How can I find [X]?',
			item_3_desc: 'Fine shadow cloak',
			item_4_desc: 'Fine clothes and accoutrements',
			item_5_desc: 'Fine personal weapon',
			item_7_desc: 'Demonbane charm',
			item_8_desc: 'Spiritbane charm',
			playbook_description: 'A spirit animating an undead body',
			setting_extra_stress1: 'on',
			setting_extra_stress2: 'on',
			setting_extra_stress3: 'on',
			setting_vampirexp: 'on',
			setting_showitem_0: '0',
			setting_showitem_1: '0',
			setting_showitem_2: '0',
			setting_showitem_3: 'on',
			setting_showitem_4: 'on',
			setting_showitem_5: 'on',
			setting_showitem_6: '0',
			setting_showitem_7: 'on',
			setting_showitem_8: 'on',
			setting_showitem_9: '0',
			setting_show_strictures: 'on',
			setting_traumata_set: 'normal',
			setting_vice_type: 'vampire',
			trauma: '4',
			xp_condition: 'You displayed your dominance or slayed without mercy.',
			xp_condition2: 'You expressed your beliefs, drives, heritage, or background.',
			xp_condition3: 'You struggled with issues from your vice, traumas, or strictures during the session.'
		},
		friends: [
			'Rutherford, a butler',
			'Lylandra, a consort',
			'Kira, a bodyguard',
			'Otto, a coachman',
			'Edrik, an envoy'
		]
	}
	},
	spiritPlaybooks = ['ghost', 'hull', 'vampire'],
	crewAttributes = _.chain(crewData).map(o => _.keys(o.base)).flatten().uniq().value(),
	playbookAttributes = _.chain(playbookData).map(o => _.keys(o.base)).flatten().uniq().value(),
	watchedAttributes = _.union(crewAttributes, playbookAttributes);
on('change:crew_type change:playbook', function (event) {
	getAttrs(['crew_type', 'playbook', 'changed_attributes'], function (attrValues) {
		let changedAttributes = (attrValues.changed_attributes||'').split(','),
			data, baseData;
		switch(event.sourceAttribute) {
			case 'crew_type':
				if (_.has(crewData, attrValues.crew_type.toLowerCase())) {
					data = crewData[attrValues.crew_type.toLowerCase()].base;
					baseData = crewAttributes;
				};
				break;
			case 'playbook':
				if (_.has(playbookData, attrValues.playbook.toLowerCase())) {
					data = playbookData[attrValues.playbook.toLowerCase()].base;
					baseData = playbookAttributes;
				};
		};
		/* Change unset attributes to default */
		if (data) {
			let finalSettings = {};
			if (event.sourceAttribute === 'crew_type' || !_.contains(spiritPlaybooks, attrValues.playbook.toLowerCase())) {
				finalSettings = _.reduce(baseData, function(settings, name) {
					if (!_.contains(changedAttributes, name)) {
						settings[name] = '';
					};
					return settings;
				}, {});
			};
			_.reduce(data, function(settings, value, name) {
				if (!_.contains(changedAttributes, name)) {
					settings[name] = value;
				};
				return settings;
				}, finalSettings);
			setAttrs(finalSettings);
		};
	});
});
/* Watch for changes in auto-set attributes */
watchedAttributes.forEach(function(name) {
		on(`change:${name}`, function(eventInfo) {
			if (eventInfo.sourceType === 'player') {
				getAttrs(['changed_attributes'], function(v) {
					let changedAttributes = _.union((v.changed_attributes||'').split(','),[name]).join(',');
					setAttrs({
						changed_attributes: changedAttributes
					});
				});
			}
		});
	});

/* VICE CALCULATION */
var actions = {
	insight: [
		'hunt',
		'study',
		'survey',
		'tinker'
	],
	prowess: [
		'finesse',
		'prowl',
		'skirmish',
		'wreck'
	],
	resolve: [
		'attune',
		'command',
		'consort',
		'sway'
	]
},
	actions1 = _.mapObject(actions, array => _.map(array, str => str + '1')),
	actionsFlat = _.chain(actions).map(x => x).flatten().value(),
	actions1Flat = _.map(actionsFlat, str => str + '1'),
	actions1Event = _.map(actions1Flat, str => `change:${str}`).join(' '),
	calculateVice = function() {
		getAttrs(actions1Flat, function(values) {
			let numDice = _.chain(actions1)
				.map(function(array) {
					return _.chain(array)
						.map(str => values[str])
						.reduce((s,v) => s + parseInt(v||0), 0)
						.value()
				})
				.min().value(),
				setting = {};
			setting.vice1 = (numDice > 0) ? 1 : 0;
			setting.vice2 = (numDice > 1) ? 1 : 0;
			setting.vice3 = (numDice > 2) ? 1 : 0;
			setting.vice4 = (numDice > 3) ? 1 : 0;
			setAttrs(setting);
		});
	};
on(actions1Event, calculateVice);

/* FACTIONS AUTOFILL */
var fillRepeatingSectionFromData = function(sectionName, dataList) {
	getSectionIDs(`repeating_${sectionName}`, function(idList) {
		let rowNameAttributes = _.map(idList, id => `repeating_${sectionName}_${id}_name`);
		getAttrs(rowNameAttributes, function (attrs) {
			let existingRows = _.values(attrs);
			let setting = _.chain(dataList)
				.reject(o => _.contains(existingRows, o.name))
				.map(function(o) {
					let rowID = generateRowID();
					return _.reduce(o, function(m,v,k) {
						m[`repeating_${sectionName}_${rowID}_${k}`] = v;
						return m;
					}, {})
				})
				.reduce(function(m,o) {
					return _.extend(m,o);
				},{})
				.value();
			setAttrs(setting);
		});
	});
};
var factionsData = {
		factions1: [
			{
				name: 'The Unseen',
				tier: 'IV',
				hold: 'S'
			},
			{
				name: 'The Hive',
				tier: 'IV',
				hold: 'S'
			},
			{
				name: 'The Circle of Flame',
				tier: 'III',
				hold: 'S'
			},
			{
				name: 'The Silver Nails',
				tier: 'III',
				hold: 'S'
			},
			{
				name: 'Lord Scurlock',
				tier: 'III',
				hold: 'S'
			},
			{
				name: 'The Crows',
				tier: 'II',
				hold: 'W'
			},
			{
				name: 'The Lampblacks',
				tier: 'II',
				hold: 'W'
			},
			{
				name: 'The Red Sashes',
				tier: 'II',
				hold: 'W'
			},
			{
				name: 'The Dimmer Sisters',
				tier: 'II',
				hold: 'S'
			},
			{
				name: 'The Grinders',
				tier: 'II',
				hold: 'W'
			},
			{
				name: 'The Billhooks',
				tier: 'II',
				hold: 'W'
			},
			{
				name: 'The Wraiths',
				tier: 'II',
				hold: 'W'
			},
			{
				name: 'The Gray Cloaks',
				tier: 'II',
				hold: 'S'
			},
			{
				name: 'Ulf Ironborn',
				tier: 'I',
				hold: 'S'
			},
			{
				name: 'The Foghounds',
				tier: 'I',
				hold: 'W'
			},
			{
				name: 'The Lost',
				tier: 'I',
				hold: 'W'
			}
		],
		factions2: [
			{
				name: 'Imperial Military',
				tier: 'VI',
				hold: 'S'
			},
			{
				name: 'City Council',
				tier: 'V',
				hold: 'S'
			},
			{
				name: 'Ministry of Preservation',
				tier: 'V',
				hold: 'S'
			},
			{
				name: 'Leviathan Hunters',
				tier: 'V',
				hold: 'S'
			},
			{
				name: 'Ironhook Prison',
				tier: 'IV',
				hold: 'S'
			},
			{
				name: 'Sparkwrights',
				tier: 'IV',
				hold: 'S'
			},
			{
				name: 'Spirit Wardens',
				tier: 'IV',
				hold: 'S'
			},
			{
				name: 'Bluecoats',
				tier: 'III',
				hold: 'S'
			},
			{
				name: 'Inspectors',
				tier: 'III',
				hold: 'S'
			},
			{
				name: 'Iruvian Consulate',
				tier: 'III',
				hold: 'S'
			},
			{
				name: 'Skovlan Consulate',
				tier: 'III',
				hold: 'W'
			},
			{
				name: 'The Brigade',
				tier: 'II',
				hold: 'S'
			},
			{
				name: 'Severosi Consulate',
				tier: 'I',
				hold: 'S'
			},
			{
				name: 'Dagger Isles Consulate',
				tier: 'I',
				hold: 'S'
			}
		],
		factions3: [
			{
				name: 'The Foundation',
				tier: 'IV',
				hold: 'S'
			},
			{
				name: 'Dockers',
				tier: 'III',
				hold: 'S'
			},
			{
				name: 'Gondoliers',
				tier: 'III',
				hold: 'S'
			},
			{
				name: 'Sailors',
				tier: 'III',
				hold: 'W'
			},
			{
				name: 'Laborers',
				tier: 'III',
				hold: 'W'
			},
			{
				name: 'Cabbies',
				tier: 'II',
				hold: 'W'
			},
			{
				name: 'Cyphers',
				tier: 'II',
				hold: 'S'
			},
			{
				name: 'Ink Rakes',
				tier: 'II',
				hold: 'W'
			},
			{
				name: 'Rail Jacks',
				tier: 'II',
				hold: 'W'
			},
			{
				name: 'Servants',
				tier: 'II',
				hold: 'W'
			}
		],
		factions4: [
			{
				name: 'The Church of Ecstasy',
				tier: 'IV',
				hold: 'S'
			},
			{
				name: 'The Horde',
				tier: 'III',
				hold: 'S'
			},
			{
				name: 'The Path of Echoes',
				tier: 'III',
				hold: 'S'
			},
			{
				name: 'The Forgotten Gods',
				tier: 'III',
				hold: 'W'
			},
			{
				name: 'The Reconciled',
				tier: 'III',
				hold: 'S'
			},
			{
				name: 'Skovlander Refugees',
				tier: 'III',
				hold: 'W'
			},
			{
				name: 'The Weeping Lady',
				tier: 'II',
				hold: 'S'
			},
			{
				name: 'Deathlands Scavengers',
				tier: 'II',
				hold: 'W'
			}
		],
		factions5: [
			{
				name: 'Whitecrown',
				tier: 'V',
				hold: 'S'
			},
			{
				name: 'Brightstone',
				tier: 'IV',
				hold: 'S'
			},
			{
				name: 'Charterhall',
				tier: 'IV',
				hold: 'S'
			},
			{
				name: 'Six Towers',
				tier: 'III',
				hold: 'W'
			},
			{
				name: 'Silkshore',
				tier: 'II',
				hold: 'S'
			},
			{
				name: 'Nightmarket',
				tier: 'II',
				hold: 'S'
			},
			{
				name: 'Crow\'s Foot',
				tier: 'II',
				hold: 'S'
			},
			{
				name: 'The Docks',
				tier: 'II',
				hold: 'S'
			},
			{
				name: 'Barrowcleft',
				tier: 'II',
				hold: 'S'
			},
			{
				name: 'Coalridge',
				tier: 'II',
				hold: 'W'
			},
			{
				name: 'Charhollow',
				tier: 'I',
				hold: 'S'
			},
			{
				name: 'Dunslough',
				tier: 'I',
				hold: 'W'
			}
		]
	};
on('change:generate_factions', function(event) {
	_.each(factionsData, function (dataList, sectionName) {
		fillRepeatingSectionFromData(sectionName, dataList);
	});
});

/* GENERATE ABILITIES */
on('change:generate_abilities', function() {
	getAttrs(['generate_source'], function (v) {
		let prefix, data;
		if (_.has(crewData, v.generate_source)) {
			sectionName = 'crewability';
			dataList = crewData[v.generate_source].abilities;
		}	else if (_.has(playbookData, v.generate_source)) {
			sectionName = 'ability';
			dataList = playbookData[v.generate_source].abilities;
		};
		fillRepeatingSectionFromData(sectionName, dataList);
	});
});
/* GENERATE FRIENDS */
on('change:generate_friends', function() {
	getAttrs(['generate_source'], function (v) {
		let prefix, data;
		if (_.has(crewData, v.generate_source)) {
			sectionName = 'contact';
			dataList = _.map(crewData[v.generate_source].contacts, function (n) {
				return {
					name: n
				};
			});
		}	else if (_.has(playbookData, v.generate_source)) {
			sectionName = 'friend';
			dataList = _.map(playbookData[v.generate_source].friends, function (n) {
				return {
					name: n
				};
			});
		};
		fillRepeatingSectionFromData(sectionName, dataList);
	});
});

/* CALCULATE WANTED */
on('change:wanted', function() {
	getAttrs(['wanted'], function(v) {
		let setting = {
			wanted1: 0,
			wanted2: 0,
			wanted3: 0,
			wanted4: 0
		};
		switch(v.wanted) {
			case '4':
				setting.wanted4 = 1;
			case '3':
				setting.wanted3 = 1;
			case '2':
				setting.wanted2 = 1;
			case '1':
				setting.wanted1 = 1;
		};
		setAttrs(setting);
	});
});

/* CALCULATE COHORT QUALITY */
var calcCohortDots = function(t1, t2, t3, t4, imp, type, prefix) {
	let numDots = parseInt(t1) + parseInt(t2) + parseInt(t3) + parseInt(t4);
	if (imp === 'on') {
		numDots = numDots - 1;
	};
	if (type === 'elite' || type === 'expert') {
		numDots = numDots + 1;
	};
	let setting = {};
	setting[`${prefix}die1`] = 0;
	setting[`${prefix}die2`] = 0;
	setting[`${prefix}die3`] = 0;
	setting[`${prefix}die4`] = 0;
	setting[`${prefix}die5`] = 0;
	switch(numDots) {
		case 5:
			setting[`${prefix}die5`] = 1;
		case 4:
			setting[`${prefix}die4`] = 1;
		case 3:
			setting[`${prefix}die3`] = 1;
		case 2:
			setting[`${prefix}die2`] = 1;
		case 1:
			setting[`${prefix}die1`] = 1;
	};
	return setting;
},
	qualityAttrs = ['crew_tier1', 'crew_tier2', 'crew_tier3', 'crew_tier4', 'cohort1_impaired', 'cohort1_type'],
	qualityEvent = _.map(qualityAttrs, str => `change:${str}`).join(' ');
on(qualityEvent, function() {
	getAttrs(qualityAttrs, function (attrs) {
		setting = calcCohortDots(attrs.crew_tier1, attrs.crew_tier2, attrs.crew_tier3, attrs.crew_tier4, attrs.cohort1_impaired, attrs.cohort1_type, 'cohort1_');
		setAttrs(setting);
	});
});
var repeatingQualityAttrs = ['crew_tier1', 'crew_tier2', 'crew_tier3', 'crew_tier4', 'repeating_cohort:impaired', 'repeating_cohort:type'],
	repeatingQualityEvent = _.map(repeatingQualityAttrs, str => `change:${str}`).join(' ');
on(repeatingQualityEvent + ' change:repeating_cohort:name', function() {
	getSectionIDs('repeating_cohort', function(list) {
		list.forEach(function(id) {
			let attrList = _.map(repeatingQualityAttrs, str => str.replace(':', '_'+id+'_'));
			getAttrs(attrList, function(attrs) {
				let setting = calcCohortDots(attrs.crew_tier1, attrs.crew_tier2, attrs.crew_tier3, attrs.crew_tier4, attrs[attrList[4]], attrs[attrList[5]], `repeating_cohort_${id}_`);
				setAttrs(setting);
			});
		});
	});
});

/* LEFT-FILL CHECKBOXES */
var handleFourBoxesFill = function(name) {
	on(`change:${name}1 change:${name}2 change:${name}3 change:${name}4`, function(event) {
		getAttrs([event.sourceAttribute], function (v) {
			let rName = event.sourceAttribute.slice(0,-1);
			if (v[event.sourceAttribute] === '1') {
				let setting = {};
				switch(event.sourceAttribute.slice(-1)) {
					case '4':
						setting[`${rName}3`] = '1';
					case '3':
						setting[`${rName}2`] = '1';
					case '2':
						setting[`${rName}1`] = '1';
				};
				setAttrs(setting);
			};
			if (v[event.sourceAttribute] === '0') {
				let setting = {};
				switch(event.sourceAttribute.slice(-1)) {
					case '1':
						setting[`${rName}2`] = '0';
					case '2':
						setting[`${rName}3`] = '0';
					case '3':
						setting[`${rName}4`] = '0';
				};
				setAttrs(setting);
			};
		});
	});
};
/* Action ratings */
actionsFlat.forEach(handleFourBoxesFill);
/* Crew Tier */
['crew_tier'].forEach(handleFourBoxesFill);
/* Items/Upgrades */
var itemChecks = [
	'item_1_check',
	'item_14_check',
	'item_16_check',
	'item_18_check',
	'item_22_check',
	'upgrade_1_check',
	'upgrade_24_check',
	'bandolier1_check',
	'bandolier2_check'];
itemChecks.forEach(function(name) {
	on(`change:${name} change:${name}_b change:${name}_c change:${name}_d change:${name}_e`, function(event) {
		getAttrs([event.sourceAttribute], function (v) {
			if (v[event.sourceAttribute] === 'on') {
				let setting = {};
				switch(event.sourceAttribute.slice('-1')) {
					case 'e':
						setting[`${name}_d`] = 'on';
					case 'd':
						setting[`${name}_c`] = 'on';
					case 'c':
						setting[`${name}_b`] = 'on';
					case 'b':
						setting[`${name}`] = 'on';
				};
				setAttrs(setting);
			};
			if (v[event.sourceAttribute] === '0') {
				let setting = {};
				switch(event.sourceAttribute.slice('-1')) {
					case 'k':
						setting[`${name}_b`] = 0;
					case 'b':
						setting[`${name}_c`] = 0;
					case 'c':
						setting[`${name}_d`] = 0;
					case 'd':
						setting[`${name}_e`] = 0;
				};
				setAttrs(setting);
			};
		});
	});
});

/* INITIALISATION AND UPGRADES */
on('sheet:opened', function() {
	/* Make sure sheet_type is never 0 */
	getAttrs(['sheet_type'], function(v) {
		if (v.sheet_type === '0' || v.sheet_type === 0) {
			setAttrs({
				sheet_type: 'character'
			});
		}
	});
	/* Convert legacy status section */
	getAttrs(['version'], function(v) {
		if (v.version && v.version.split('.')[0] === '0' && parseInt(v.version.split('.')[1]) < 7) {
			getSectionIDs('repeating_faction', function(list) {
				let sectionList = _.union(['faction1', 'faction2'],	_.map(list, str => `repeating_faction_${str}`)),
					attrList = _.chain(sectionList)
					.map(str => [`${str}_name`, `${str}_status`, `${str}_description`])
					.flatten().value();
				getAttrs(attrList, function (attrs) {
					let output = _.map(sectionList, function(str) {
						return 'Name: ' + attrs[`${str}_name`] + '\n' +
							'Status: ' + (attrs[`${str}_status`] || '') + '\n' +
							'Notes: ' + (attrs[`${str}_description`] || '') + '\n';
					}).join('\n');
					setAttrs({
						faction_notes: output
					});
					setAttrs({
						faction1_name: '',
						faction1_status: '',
						faction1_description: '',
						faction1_expand: '',
						faction2_name: '',
						faction2_status: '',
						faction2_description: '',
						faction2_expand: ''
					});
					_.each(list, function(id) {
						removeRepeatingRow(`repeating_faction_${id}`);
					});
				});
			});
		}
	});
	/* Set version */
	setAttrs({
		version: '0.8',
		character_sheet: 'Blades in the Dark v0.8'
	});
});
</script>
