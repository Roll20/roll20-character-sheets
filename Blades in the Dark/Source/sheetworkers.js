<script type="text/worker">
/* DEFAULT FILLS FOR PLAYBOOKS AND CREWS
/* Set some default fields when setting crew type or playbook */
var crewData = {
	assassins: {
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
		cohort1_name: 'Cohort',
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
	bravos: {
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
		cohort1_name: 'Thugs',
		cohort1_type: 'gang',
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
	cult: {
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
		cohort1_name: 'Adepts',
		cohort1_type: 'gang',
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
	hawkers: {
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
		cohort1_name: 'Cohort',
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
	shadows: {
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
		cohort1_name: 'Cohort',
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
	smugglers: {
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
		cohort1_description: 'Type: Boat - Carriage - Other',
		cohort1_name: 'Vehicle',
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
	}
	},
	playbookData = {
	cutter: {
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
	ghost: {
		attune1: '1',
		gatherinfo1: 'What do they intend to do?',
		gatherinfo2: 'How can I get them to [X]?',
		gatherinfo3: 'What are they really feeling?',
		gatherinfo4: 'What should I look out for?',
		gatherinfo5: 'Where\'s the weakness here?',
		gatherinfo6: 'How can I find [X]?',
		hunt1: '1',
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
	hound: {
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
	hull: {
		attune1: '1',
		gatherinfo1: 'What do they intend to do?',
		gatherinfo2: 'How can I get them to [X]?',
		gatherinfo3: 'What are they really feeling?',
		gatherinfo4: 'What should I look out for?',
		gatherinfo5: 'Where\'s the weakness here?',
		gatherinfo6: 'How can I find [X]?',
		playbook_description: 'A spirit animating a clockwork frame',
		setting_load_h: '7',
// 		setting_show_frame: 'on',
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
		skirmish1: '1',
		xp_condition: 'You fulfilled your functions despite difficulty or danger.',
		xp_condition2: 'You suppressed or ignored your former human beliefs, drives, heritage, or background.',
		xp_condition3: 'You struggled with issues from your wear during the session.'
	},
	leech: {
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
	lurk: {
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
	slide: {
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
	spider: {
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
	whisper: {
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
	vampire: {
		attune1: '1',
		command1: '1',
		gatherinfo1: 'What do they intend to do?',
		gatherinfo2: 'How can I get them to [X]?',
		gatherinfo3: 'What are they really feeling?',
		gatherinfo4: 'What should I look out for?',
		gatherinfo5: 'Where\'s the weakness here?',
		gatherinfo6: 'How can I find [X]?',
		hunt1: '1',
		item_3_desc: 'Fine shadow cloak',
		item_4_desc: 'Fine clothes and accoutrements',
		item_5_desc: 'Fine personal weapon',
		item_7_desc: 'Demonbane charm',
		item_8_desc: 'Spiritbane charm',
		playbook_description: 'A spirit animating an undead body',
		prowl1: '1',
		setting_extra_stress1: 'on',
		setting_extra_stress2: 'on',
		setting_extra_stress3: 'on',
 		setting_vampirexp: 'on',
		setting_showitem_0: '0',
		setting_showitem_1: '0',
		setting_showitem_2: '0',
		setting_showitem_6: '0',
		setting_showitem_9: '0',
 		setting_show_strictures: 'on',
 		setting_traumata_set: 'normal',
		setting_vice_type: 'vampire',
		skirmish1: '1',
		sway1: '1',
		trauma: '4',
		xp_condition: 'You displayed your dominance or slayed without mercy.',
		xp_condition2: 'You expressed your beliefs, drives, heritage, or background.',
		xp_condition3: 'You struggled with issues from your vice, traumas, or strictures during the session.'
	}
	},
	crewAttributes = _.chain(crewData).map(o => _.keys(o)).flatten().uniq().value(),
	playbookAttributes = _.chain(playbookData).map(o => _.keys(o)).flatten().uniq().value(),
	watchedAttributes = _.union(crewAttributes, playbookAttributes);
on('change:crew_type change:playbook', function (event) {
	getAttrs(['crew_type', 'playbook', 'changed_attributes'], function (attrValues) {
		let changedAttributes = (attrValues.changed_attributes||'').split(','),
			data, baseData;
		switch(event.sourceAttribute) {
			case 'crew_type':
				data = crewData[attrValues.crew_type.toLowerCase()];
				baseData = crewAttributes;
				break;
			case 'playbook':
				data = playbookData[attrValues.playbook.toLowerCase()];
				baseData = playbookAttributes;
		}
		/* Change unset attributes to default */
		if (data) {
			let finalSettings = _.reduce(baseData, function(settings, name) {
				if (!_.contains(changedAttributes, name)) {
					settings[name] = '';
				}
				return settings;
			}, {});
			_.reduce(data, function(settings, value, name) {
				if (!_.contains(changedAttributes, name)) {
					settings[name] = value;
				}
				return settings;
				}, finalSettings);
			setAttrs(finalSettings);
		}
	});
});
/* Watch for changes in auto-set attributes and don't touch them */
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
	actionsFlat = _.chain(actions).map(x => x).flatten().value()
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
		}
		setAttrs(setting);
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
				}
				setAttrs(setting);
			}
			if (v[event.sourceAttribute] === '0') {
				let setting = {};
				switch(event.sourceAttribute.slice(-1)) {
					case '1':
						setting[`${rName}2`] = '0';
					case '2':
						setting[`${rName}3`] = '0';
					case '3':
						setting[`${rName}4`] = '0';
				}
				setAttrs(setting);
			}
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
				}
				setAttrs(setting);
			}
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
				}
				setAttrs(setting);
			}
		});
	});
});

on('sheet:opened', function() {
	setAttrs({
		version: '0.4'
	});
});
</script>
