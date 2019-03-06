/*
	Current Version: 3.0
	Last updated: 09.10.2015
	Character Sheet and Script Maintained by: Steve Day & Andrew Holder
	Current Verion: https://github.com/Roll20/roll20-api-scripts/tree/master/EotE%20Dice%20Roller-New
	
	Credits:
	Original creator: Konrad J.
	Helped with Dice specs: Alicia G. and Blake the Lake
	Dice graphics hosted by Alicia G. at galacticcampaigns.com
	Dice graphics borrowed from the awesome google+ hangouts EotE Dice App
	Character Sheet and Advanced Dice Roller: Steve Day
	Debugger: Arron
	Initiative Roller: Andrew H.
	Opposed Roller: Tom F.
	Skill Description by: Gribble - https://dl.dropboxusercontent.com/u/9077657/SW-EotE-Reference-Sheets.pdf
	Critical Descriptions by: Gribble - https://dl.dropboxusercontent.com/u/9077657/SW-EotE-Reference-Sheets.pdf
	Weapon Damage and Critical Hit: Akashan
	Translation System: Akashan

	API Chat Commands

	Settings:
		Log
		 * default: 'on' and 'single'
		 * Description: Sets the visual output in the chat window for the dice rolls
		 * Command: !eed log on|off|multi|single

		Graphics
		 * default: 'on' and 'm'
		 * Description: Sets chat window dice output as graphic, small, medium, or large if "on" or as text if "off"
		 * Command: !eed graphics on|off|s|m|l

		Test
		 * Description: Output every side of every die to the chat window
		 * !eed test

		Debug
		 * default: 'off'
		 * DescriptionL Sets the logging level of the script in the API console.  If you are having issues with the
		 * script rolling incorect dice, turn on debug logging and post the result in the forums. No need to restart the
		 * script with this command.
		 * Command: !eed debug on|off

	Roll:
		Label
		 * default: null
		 * Description: set the skill name of the roll
		 * Command: !eed label(Name of Skill)

		Initiative
		 * default: false
		 * Description: Set NPC/PC initiative true
		 * Command: !eed npcinit or pcinit and #b #g #y #blk #p #r #w

		Skill
		 * default:
		 * Description: create the ability and proficiency dice for a skill check
		 * Command: !eed skill(char_value|skill_value)

		Opposed
		 * default:
		 * Description: create the difficulty and challenge dice for an opposed skill check
		 * Command: !eed opposed(char_value|skill_value)

		Dice
		 * default:
		 * Description: Loop thru the dice and adds or subtracts them from the dice object
		 * Command: !eed #g #y #b #blk #r #p #w #s #a

		Upgrade
		 * default:
		 * Description: upgrades ability and difficulty dice
		 * Command: !eed upgrade(ability|#) or upgrade(difficulty|#)

		Downgrade
		 * default:
		 * Description: downgrades proficiency and challenge dice
		 * Command: !eed downgrade(proficiency|#) or downgrade(challenge|#)

		destiny
		 * default:
		 * Description: Rolls 1w die and adds the result to the destiny pool
		 * Command: !eed #w destiny doRoll

	Other:
		Weapon Damage and Critical
		 * default:
		 * Description: Add the weapon damage and critical to calculate the final damages and if there is a critical hit.
		 * Command: !eed weaponDamCrit(damage|critical)
 */

var eote = {}

eote.init = function () {
	eote.setCharacterDefaults();
	eote.createGMDicePool();
	eote.events();
}

eote.defaults = {
	globalVars : {
		diceLogChat : true,
		diceGraphicsChat : true,
		diceGraphicsChatSize : 30, //medium size
		diceTextResult : "",
		diceTextResultLog : "",
		diceGraphicResult : "",
		diceGraphicResultLog : "",
		diceTestEnabled : false,
		diceLogRolledOnOneLine : true,
		scriptDebug : false,
	},
	'-DicePoolID' : '',
	character : {
		attributes : [
			/* Don't need to update characterID
			 *
			 *{
			name : "characterID",
			current : "UPDATES TO CURRENT ID",
			max : "",
			update : false
			}*/
		],
		ablities : [],
	},
	graphics : {
		SIZE : {
			SMALL : 20,
			MEDIUM : 30,
			LARGE : 40
		},
		ABILITY : {
			BLANK : "http://galacticcampaigns.com/images/EotE/Ability/abilityBlank.png",
			A : "http://galacticcampaigns.com/images/EotE/Ability/abilityA.png",
			AA : "http://galacticcampaigns.com/images/EotE/Ability/abilityAA.png",
			S : "http://galacticcampaigns.com/images/EotE/Ability/abilityS.png",
			SA : "http://galacticcampaigns.com/images/EotE/Ability/abilitySA.png",
			SS : "http://galacticcampaigns.com/images/EotE/Ability/abilitySS.png"
		},
		BOOST : {
			BLANK : "http://galacticcampaigns.com/images/EotE/Boost/boostBlank.png",
			A : "http://galacticcampaigns.com/images/EotE/Boost/boostA.png",
			AA : "http://galacticcampaigns.com/images/EotE/Boost/boostAA.png",
			S : "http://galacticcampaigns.com/images/EotE/Boost/boostS.png",
			SA : "http://galacticcampaigns.com/images/EotE/Boost/boostSA.png"
		},
		CHALLENGE : {
			BLANK : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeBlank.png",
			F : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeF.png",
			FF : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeFF.png",
			FT : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeFT.png",
			T : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeT.png",
			TT : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeTT.png",
			DESPAIR : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeDespair.png"
		},
		DIFFICULTY : {
			BLANK : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyBlank.png",
			F : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyF.png",
			FF : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyFF.png",
			FT : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyFT.png",
			T : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyT.png",
			TT : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyTT.png"
		},
		FORCE : {
			D : "http://galacticcampaigns.com/images/EotE/Force/ForceD.png",
			DD : "http://galacticcampaigns.com/images/EotE/Force/ForceDD.png",
			L : "http://galacticcampaigns.com/images/EotE/Force/ForceL.png",
			LL : "http://galacticcampaigns.com/images/EotE/Force/ForceLL.png"
		},
		PROFICIENCY : {
			BLANK : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyBlank.png",
			A : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyA.png",
			S : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyS.png",
			SA : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencySA.png",
			SS : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencySS.png",
			AA : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyAA.png",
			TRIUMPH : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyTriumph.png"
		},
		SETBACK : {
			BLANK : "http://galacticcampaigns.com/images/EotE/Setback/SetBackBlank.png",
			F : "http://galacticcampaigns.com/images/EotE/Setback/SetBackF.png",
			T : "http://galacticcampaigns.com/images/EotE/Setback/SetBackT.png"
		},
		SYMBOLS : {
			A : "http://galacticcampaigns.com/images/EotE/Symbols/A.png",
			S : "http://galacticcampaigns.com/images/EotE/Symbols/S.png",
			T : "http://galacticcampaigns.com/images/EotE/Symbols/T.png",
			F : "http://galacticcampaigns.com/images/EotE/Symbols/F.png",
			TRIUMPH : "http://galacticcampaigns.com/images/EotE/Symbols/Triumph.png",
			DESPAIR : "http://galacticcampaigns.com/images/EotE/Symbols/Despair.png",
			L : "http://galacticcampaigns.com/images/EotE/Symbols/L.png",
			D : "http://galacticcampaigns.com/images/EotE/Symbols/D.png"
		}
	},
	regex : {
		cmd : /!eed/,
		log : /log (on|multi|single|off)/,
		debug : /debug (on|off)/,
		graphics : /graphics (on|off|s|m|l)/,
		test : /test/,
		resetdice : /(resetgmdice|resetdice)/,
		initiative : /\bnpcinit|\bpcinit/,
		characterID : /characterID\((.*?)\)/,
		weaponDamCrit : /weaponDamCrit\((.*?)\)/,
		rollPlayer : /rollPlayer(\(.*?\))/,
		label : /label\((.*?)\)/,
		skill : /skill\((.*?)\)/g,
		opposed : /opposed\((.*?)\)/g,
		upgrade : /upgrade\((.*?)\)/g,
		downgrade : /downgrade\((.*?)\)/g,
		gmdice : /\(gmdice\)/,
		encum : /encum\((.*?)\)/g,
		dice : /(-?\d{1,2}blk)\b|(-?\d{1,2}b)\b|(-?\d{1,2}g)\b|(-?\d{1,2}y)\b|(-?\d{1,2}p)\b|(-?\d{1,2}r)\b|(-?\d{1,2}w)\b|(-?\d{1,2}a)\b|(-?\d{1,2}s)|(-?\d{1,2}t)\b|(-?\d{1,2}f)/g,
		crit : /crit\((.*?)\)/,
		critShip : /critship\((.*?)\)/,
		unusable : /unusableWeapon/,
		destiny : /destiny (useDark|useLight|registerPlayer|sendUpdate|doRoll|clearPool)/,
	},
	destinyListeners : []
}

/*
	Translation :
		To add another laguage, add a column at the end of each line ([X,"English","French", "xxxx", "Your language"])
		Change the value of "lang" to apply your language
*/
eote.translation = {
	lang : 2, // 1=>English, 2=>French, ...
	text : [
		[0, "GM Dice Pool", "Réserve de dés du MJ"],
		[1, "Weapon is too damaged to be used. Try repairing it.", "L'arme est trop endommagée pour être utilisée. Essayez de la réparer."],
		[2, "Dice Sytem", "Système de dés"],
		[3, 'Output rolled dice to chat window "On"', 'Affichage des dés lancés dans le tchat "On"'],
		[4, 'Output rolled dice to chat window "Off"', 'Affichage des dés lancés dans le tchat "Off"'],
		[5, 'Mulitple line output "Off"', 'Affichage sur plusieurs ligne "Off"'],
		[6, 'Mulitple line output "On"', 'Affichage sur plusieurs ligne "On"'],
		[7, 'Debug Script "On"', 'Debug du script "On"'],
		[8, 'Debug Script "Off"', 'Debug du script "Off"'],
		[9, 'Chat graphics "On"', 'Résultats graphique "On"'],
		[10, 'Chat graphics "Off"', 'Résultats graphique "Off"'],
		[11, 'Chat graphics size "Small"', 'Taille des résultats graphique "Petit"'],
		[12, 'Chat graphics size "Medium"', 'Taille des résultats graphique "Moyen"'],
		[13, 'Chat graphics size "Large"', 'Taille des résultats graphique "Large"'],
		[14, "Alert", "Alerte"],
		[15, "Can't find character. Please update character name field to match sheet character name and try again.", "Personnage non trouvé. Mettez à jour le nom du personnage correspondant à sa fiche et réessayer, svp"],
		[16, "Please update character name field.", "Mettez à jour le nom du personnage, svp."],

		//Destiny points
		[17, "We can't find the DicePool player!<br/>SEND HELP!", "Nous ne trouvons pas la réserve de dés du joueur!<br/>Envoyez de l'aide!"],
		[18, "No Destiny Points Defined.<br/>GM needs to add points then update players.", "Pas de points de destin définis.<br/>Le Mj doit ajouter des points puis le dire aux joueurs."],
		[19, "The GM", "Le MJ"],
		[20, "Uses a dark side point!", "Utilisation d'un point obscure !"],
		[21, "No dark side points to use!", "Plus de point obscure à utiliser !"],
		[22, "Uses a light side point!", "Utilisation d'un point lumineux !"],
		[23, "No light side points to use!", "Plus de point lumineux à utiliser !"],
		[24, "Rolling Destiny Point", "Lancer de point de destin !"],
		[25, "Regestering with Destiny Pool", "Enregistrement via la réserve de dés !"],
		[26, "Updating Players Destiny Pools", "Mise à jour de la réserve des joueurs"],
		[27, "Clearing The Destiny Pool", "Reset de la réserve de dés"],

		//Characters Criticals Injuries
		[28, "1 to 5", "1 à 5"],
		[29, "Minor Nick", "Petite entaille"],
		[30, "Suffer 1 strain.", "La cible subit un point de stress"],
		[31, "", ""],

		[32, "6 to 10", "6 à 10"],
		[33, "Slowed Down", "Ralentissement"],
		[34, "May only act during last allied Initiative slot on next turn.", "La cible ne pourra agir à son prochain tour que durant le dernier créneau d'initiative allié."],
		[35, "", ""],

		[36, "11 to 15", "11 à 15"],
		[37, "Sudden Jolt", "Choc"],
		[38, "May only act during last hero Initiative slot on next turn.", "La cible lâche ce qu'elle tient."],
		[39, "", ""],

		[40, "16 to 20", "16 à 20"],
		[41, "Distracted", "Distraction"],
		[42, "Cannot perform free maneuver on next turn.", "La cible ne peut exécuter de manoeuvre gratuite à son prochain tour."],
		[43, "", ""],

		[44, "21 to 25", "21 à 25"],
		[45, "Off-Balance", "Déséquilibre"],
		[46, "Add 1 Setback die to next skill check.", 'Ajouter un dé d\'infortune (<span class="sheet-icon-BLK"></span>) lors du prochain test de compétence.'],
		[47, "", ""],

		[48, "26 to 30", "26 à 30"],
		[49, "Discouraging Wound", "Blessure Accablante"],
		[50, "Flip one light destiny to dark.", "Vous perdez un point de destin (rendu à l'autre camp)."],
		[51, "", ""],

		[52, "31 to 35", "31 à 35"],
		[53, "Stunned", "Etourdissement"],
		[54, "Staggered, cannot perform action on next turn.", "La cible est étourdie jusqu'à la fin de son prochain tour."],
		[55, "", ""],

		[56, "36 to 40", "36 à 40"],
		[57, "Stinger", "Piqûre"],
		[58, "Increase difficulty of next check by 1 Difficulty die.", "La cible ajoute un dé de difficulté à son prochain test."],
		[59, "", ""],

		[60, "41 to 45", "41 à 45"],
		[61, "Bowled Over", "Renversement"],
		[62, "Knocked prone and suffer 1 strain.", "La cible se retrouve au sol et subit un point de stress."],
		[63, "", ""],

		[64, "46 to 50", "46 à 50"],
		[65, "Head Ringer", "Mal de crâne"],
		[66, "Increase difficulty of all Intellect and Cunning checks by 1 Difficulty die until end of encounter.", "La cible ajoute un dé de difficulté à tous ses tests d'Intelligence et de Ruse jusqu'à la fin de la rencontre."],
		[67, "", ""],

		[68, "51 to 55", "51 à 55"],
		[69, "Fearsome Wound", "Blessure Effroyable"],
		[70, "Increase difficulty of all Presence and Willpower checks by 1 Difficulty die until end of encounter.", "La cible ajoute un dé de difficulté à tous ses tests de Présence et de Volonté jusqu'à la fin de la rencontre."],
		[71, "", ""],

		[72, "56 to 60", "56 à 60"],
		[73, "Agonizing Wound", "Blessure Lancinante"],
		[74, "Increase difficulty of all Brawn and Agility checks by 1 Difficulty die until end of encounter.", "La cible ajoute un dé de difficulté à tous ses tests de Vigueur et d'Agilité jusqu'à la fin de la rencontre."],
		[75, "", ""],

		[76, "61 to 65", "61 à 65"],
		[77, "Slightly Dazed", "Hébêtement"],
		[78, "Add 1 Setback die to all skill checks until end of encounter.", "La cible est désorientée jusqu'à la fin de la rencontre."],
		[79, "", ""],

		[80, "66 to 70", "66 à 70"],
		[81, "Scattered Senses", "Confusion"],
		[82, "Remove all Boost dice from all skill checks until end of encounter.", 'La cible retire tous les dé de fortune (<span class="sheet-icon-R"></span>) jusqu\'à la fin de la rencontre.'],
		[83, "", ""],

		[84, "71 to 75", "71 à 75"],
		[85, "Hamstrung", "Paralysé"],
		[86, "Lose free maneuver until end of encounter.", "La cible pert sa manoeuvre gratuite jusqu'à la fin de la rencontre."],
		[87, "", ""],

		[88, "76 to 80", "76 à 80"],
		[89, "Staggered", "Aux Abois"],
		[90, "Attacker may immediately attempt another free attack against you using same dice pool as original attack.", "La cible ouvre sa garde, offrant aussitôt à l'attaquant une attaque gratuite contre elle avec la même réserve de dés que l'attaque responsable."],
		[91, "", ""],

		[92, "81 to 85", "81 à 85"],
		[93, "Winded", "Hors d'Haleine"],
		[94, "Cannot voluntarily suffer strain to activate abilities or gain additional maneuvers until end of encounter.", "Jusqu'à la fin de la rencontre, la cible ne peut s'infliger volontairement du stress pour activer une capacité ou bénéficier de manoeuvres supplémentaires."],
		[95, "", ""],

		[96, "86 to 90", "86 à 90"],
		[97, "Compromised", "A Mal"],
		[98, "Increase difficulty of all skill checks by 1 Difficulty die until end of encounter.", "La cible ajoute un dé de difficulté à tous ses tests de compétence jusqu'à la fin de la rencontre."],
		[99, "", ""],

		[100, "91 to 95", "91 à 95"],
		[101, "At the Brink", "Exténuation"],
		[102, "Suffer 1 strain each time you perform an action.", "La cible subit un point de stress chaque fois qu'elle exécute une action."],
		[103, "", ""],

		[104, "96 to 100", "96 à 100"],
		[105, "Crippled", "Infirmité"],
		[106, "Limb crippled until healed or replaced. Increase difficulty of all checks that use that limb by 1 Difficulty die.", "L'un des membres de la cible (choisi par le MJ) est infirme jusqu'à ce qu'on le soigne ou le remplace. La cible ajouté un dé de difficulté à tous les tests faisant intervenir ce membre."],
		[107, "", ""],

		[108, "101 to 105", "101 à 105"],
		[109, "Maimed", "Mutilation"],
		[110, "Limb permanently lost. Unless you have a cybernetic replacement, cannot perform actions that use that limb. Add 1 Setback to all other actions.", 'La cible perd définitivement l\'un de ses membres (choisi par le MJ). A moins qu\'elle ne dispose d\'une prothèse cybernétique, elle ne pourra plus exécuter d\'action faisant intervenir ce membre. Toutes ses autres actions reçoivent <span class="sheet-icon-BLK"></span>.'],
		[111, "", ""],

		[112, "106 to 110", "106 à 110"],
		[113, "Horrific Injury", "Blessure Epouvantable"],
		[114, "Roll 1d10 to determine one wounded characteristic -- roll results(1-3 = Brawn, 4-6 = Agility, 7 = Intellect, 8 = Cunning, 9 = Presence, 10 = Willpower. Until Healed, treat characteristic as one point lower.", "Lancé 1d10 pour désigner l'une des caractéristiques de la cible (1-3=Vigueur, 4-6=Agilité, 7=Intelligence, 8=Ruse, 9=Présence, 10=Volonté). Tant que cette blessure critique n'a pas été soignée, la caractéristique en question est réduite d'un point."],
		[115, "", ""],

		[116, "111 to 115", "111 à 115"],
		[117, "Temporarily Lame", "Invalidité"],
		[118, "Until healed, may not perform more than one maneuver each turn.", "Tant que cette blessure n'est pas soignée, la cible ne peut effectuer plus d'une manoeuvre à son tour."],
		[119, "", ""],

		[120, "116 to 120", "116 à 120"],
		[121, "Blinded", "Aveuglé"],
		[122, "Can no longer see. Upgrade the difficulty of Perception and Vigilance checks three times, and all other checks twice.", "La cible est privée de la vue. Améliorez 2 dés de difficulté sur tous ses tests (3 dés pour les tests de Perception et Vigilance)."],
		[123, "", ""],

		[124, "121 to 125", "121 à 125"],
		[125, "Knocked Senseless", "Perte de connaissance"],
		[126, "You can no longer upgrade dice for checks.", "La cible est étourdi jusqu'à la fin de la rencontre."],
		[127, "", ""],

		[128, "126 to 130", "126 à 130"],
		[129, "Gruesome Injury", "Blessure de Cauchemar"],
		[130, "Roll 1d10 to determine one wounded characteristic -- roll results(1-3 = Brawn, 4-6 = Agility, 7 = Intellect, 8 = Cunning, 9 = Presence, 10 = Willpower. Characteristic is permanently one point lower.", "Lancé 1d10 pour désigner l'une des caractéristiques de la cible (1-3=Vigueur, 4-6=Agilité, 7=Intelligence, 8=Ruse, 9=Présence, 10=Volonté). Réduisez d'un point la caractéristique en question, de façon permanente (conservez un minimum de 1)."],
		[131, "", ""],

		[132, "131 to 140", "131 à 140"],
		[133, "Bleeding Out", "Hémorragie"],
		[134, "Suffer 1 wound and 1 strain every round at the beginning of turn. For every 5 wounds suffered beyond wound threshold, suffer one additional Critical Injury (ignore the details for any result below this result).", "A chaque round, la cible subit 1 blessure et 1 stress au début de son tour. Elle subit une blessure critique par tranche de cinq blessures reçues au-délà de son seuil de blessure."],
		[135, "", ""],

		[136, "141 to 150", "141 à 150"],
		[137, "The End is Nigh", "La Fin est Proche"],
		[138, "Die after the last Initiative slot during the next round.", "La cible va mourir après le dernier créneau d'initiative du prochain round."],
		[139, "", ""],

		[140, "151", "151"],
		[141, "Dead", "Mort"],
		[142, "Complete, absolute death.", "Décès irréversible."],
		[143, "", ""],

		[144, "Why are you not dead!", "Pourquoi vous n'êtes pas mort !"],

		[145, " to ", " à "],

		[146, "Rolls Critical Injury", "Blessures Critiques"],
		[147, "Current Criticals:", "Blessures actuelles :"],
		[148, "Dice Roll Offset:", "Compensation :"],
		[149, "Dice Roll:", "Résultat des dés :"],
		[150, "Total:", "Total :"],

		//Ship or vehicule Criticals Injuries,
		[151, "1 to 9", "1 à 9"],
		[152, "Mechanical Stress", "Stress mécanique"],
		[153, "Ship or vehicle suffers 1 system strain.", "Le vaisseau ou le véhicule encaisse un point de stress mécanique."],
		[154, "", ""],

		[155, "10 to 18", "10 à 18"],
		[156, "Jostled", "Bousculé"],
		[157, "All crew members suffer 1 strain.", "Une petite collision ou explosion ébranle le véhicule/vaisseau. Tous les membres d'équipage sont désorientés pendant un round et encaissent un point de stress."],
		[158, "", ""],

		[159, "19 to 27", "19 à 27"],
		[160, "Losing Power to Shields", "Perte d'alimentation des boucliers"],
		[161, "Decrease defense in affected defense zone by 1 until repaired. If ship or vehicle has no defense, suffer 1 system strain.", "La valeur de défense de la zone affectée est réduite de 1 jusqu'à ce que le dégât critique soit réparé. Si le véhicule/vaisseau ne dispose pas de défense, il subit un point de stress mécanique à la place."],
		[162, "", ""],

		[163, "28 to 36", "28 à 36"],
		[164, "Knocked Off Course", "Dévié"],
		[165, "On next turn, pilot cannot execute any maneuvers. Instead, must make a Piloting check to regain bearings and resume course. Difficulty depends on current speed.", "Une explosion particulièrement violente ou un impact fait changer le véhicule/vaisseau de cap. Son pilote ne peut pas faire de manoeuvre lors de son prochain tour et doit réussir un test de Pilotage pour reprendre le contrôle. Le niveau de difficulté du test est déterminé par la vitesse actuelle de l'appareil."],
		[166, "", ""],

		[167, "37 to 45", "37 à 45"],
		[168, "Tailspin", "Culbuté"],
		[169, "All firing from ship or vehicle suffers 2 setback dice until end of pilot's next turn.", 'Les attaques du véhicule/vaisseau subissent deux dés d\'infortune <span class="sheet-icon-BLK"></span><span class="sheet-icon-BLK"></span>'],
		[170, "", ""],

		[171, "46 to 54", "46 à 54"],
		[172, "Component Hit", "Composant touché"],
		[173, "One component of the attacker's choice is knocked offline, and is rendered inoperable until the end of the following round. See page 245 CRB for Small/Large Vehicle and Ship Component tables.", "Un composant, choisi par l'attaquant, est désactivé et inutilisable jusqu'à la fin du prochain round."],
		[174, "", ""],

		[175, "55 to 63", "55 à 63"],
		[176, "Shields Failing", "Défaillance des Boucliers"],
		[177, "Decrease defense in all defense zones by 1 until repaired. If ship or vehicle has no defense, suffer 2 system strain.", "La caractéristique de défense de toutes les zones est réduite de 1 jusqu'à ce que le véhicule/vaisseau soit réparé. Si l'appareil ne dispose pas de défense, il subit deux points de stress mécanique à la place."],
		[178, "", ""],

		[179, "64 to 72", "64 à 72"],
		[180, "Hyperdrive or Navicomputer Failure", "Défaillance du Naviordinateur"],
		[181, "Cannot make any jump to hyperspace until repaired. If ship or vehicle has no hyperdrive, navigation systems fail leaving it unable to tell where it is or is going.", "Le naviordinateur de l'appareil (ou le droïde R2 dans le cas échéant) cesse de fonctionner, ce qui rend impossible tout saut dans l'hyperespace tant qu'il n'est pas réparé. Si le véhicule/vaisseau ne dispose pas d'un hyperdrive, ce sont les systèmes de navigation qui défaillent, et il doit donc voler ou rouler à l'aveugle."],
		[182, "", ""],

		[183, "73 to 81", "73 à 81"],
		[184, "Power Fluctuations", "Fluctuations énergétiques"],
		[185, "Pilot cannot voluntarily inflict system strain on the ship until repaired.", "Le véhicule/vaisseau est victime d'accès soudains de surtension ou perd son alimentation de façon intermittente. Le pilote ne peut plus choisir d'infliger un point de stress mécanique à son vaisseau pour obtenir une manoeuvre supplémentaire tant que ce dégât critique n'est pas réparé."],
		[186, "", ""],

		[187, "82 to 90", "82 à 90"],
		[188, "Shields Down", "Boucliers Désactivés"],
		[189, "Decrease defense in affected defense zone to 0 and all other defense zones by 1 point until repaired. If ship or vehicle has no defense, suffer 4 system strain.", "La défense de la zone touchée tombe à 0 et celle des autres est réduite de 1 jusqu'à ce que le véhicule/vaisseau soit réparé. Les points de défense de la zone sont complètement perdu mais il est possible de protéger celle-ci en dérivant des points de défense affectés à d'autres parties de l'appareil, comme d'habitude. Si le véhicule/vaisseau ne dispose pas de défenses, il subit 4 points de stress mécanique à la place."],
		[190, "", ""],

		[191, "91 to 99", "91 à 99"],
		[192, "Engine Damaged", "Moteur endommagé"],
		[193, "Ship or vehicle's maximum speed reduced by 1, to a minimum of 1, until repaired.", "La vitesse maximale du véhicule/vaisseau est réduite de 1 jusqu'à ce que celui-ci soit réparé."],
		[194, "", ""],

		[195, "100 to 108", "100 à 108"],
		[196, "Shield Overload", "Surcharge des boucliers"],
		[197, "Decrease defense in all defense zones to 0 until repaired. In addition, suffer 2 system strain. Cannot be repaired until end of encounter. If ship or vehicle has no defense, reduce armor by 1 until repaired.", "Les boucliers de l'appareil défaillent complètement. La défense de toutes les zones tombe à 0. Ce dégâts critique ne peut pas être réparé avant la fin de la rencontre et l'appareil encaisse deux points de stress mécanique. Si le véhicule/vaisseau ne dispose pas de défense, son blindage est réduit de 1 à la place."],
		[198, "", ""],

		[199, "109 to 117", "109 à 117"],
		[200, "Engines Down", "Arrêt du moteur"],
		[201, "Ship or vehicle's maximum speed reduced to 0. In addition, ship or vehicle cannot execute maneuvers until repaired. Ship continues on course at current speed and cannot be stopped or course changed until repaired.", "La vitesse maximale du véhicule/vaisseau est réduite de 0 jusqu'à ce que celui-ci soit réparé. L'appareil poursuit sa trajectoire en raison de l'inertie. De plus, le véhicule/vaisseau ne peut plus effectuer la moindre manoeuvre."],
		[202, "", ""],

		[203, "118 to 126", "118 à 126"],
		[204, "Major System Failure", "Défaillance d'un système majeur"],
		[205, "One component of the attacker's choice is heavily damages, and is inoperable until the critical hit is repaired. See page 245 CRB for Small/Large Vehicle and Ship Component tables.", "Un composant choisi par l'attaquant subit des dommages importants. Il ne fonctionne plus jusqu'à ce que le véhicule/vaisseau soit réparé."],
		[206, "", ""],

		[207, "127 to 133", "127 à 133"],
		[208, "Major Hull Breach", "Brèche majeure dans la coque"],
		[209, "Ships and vehicles of silhouette 4 and smaller depressurize in a number of rounds equal to silhouette. Ships of silhouette 5 and larger don't completely depressurize, but parts do (specifics at GM discretion). Ships and vehicles operating in atmosphere instead suffer a Destabilized Critical.", "Une plaie béante s'ouvre dans la coque, entraînant une dépressurisation. Dans le cas des engins de gabarit 4 ou moins, c'est tout l'intérieur qui est dépressurisé. Les navires de gabarit supérieur sont en revanche pourvus de compartiments complètement étanches et de nombreuses mesures de protection contre ces accidents qui leur permettent de se dépressuriser par section plutôt que dans leur ensemble. Le MJ doit déterminer quelles zones sont affectées, et celles-ci se vident de leur air sur un nombre de rounds égal à la caractéristique de gabarit du vaisseau. Les véhicule/vaisseau opérant dans l'atmosphère souffrent moins de ce résultat, mais la taille de la brèche entraîne néanmoins de grosse difficultés pour l'appareil, qui subit à la place les effets du dégâts critique 'Déstabilisé'."],
		[210, "", ""],

		[211, "134 to 138", "134 à 138"],
		[212, "Destabilised", "Déstabilisé"],
		[213, "Reduce ship or vehicle\'s hull integrity threshold and system strain threshold to half original values until repaired.", "L'intégrité structurelle du véhicule/vaisseau est sérieusement ménacée. Le Seuil de dégâts de coque de l'appareil est réduit de 2 jusqu'à ce que celui-ci soit réparé."],
		[214, "", ""],

		[215, "139 to 144", "139 à 144"],
		[216, "Fire!", "Au feu !"],
		[217, "Fire rages through ship or vehicle and it immediately takes 2 system strain. Fire can be extinguished with appropriate skill, Vigilance or Cool checks at GM\'s discretion. Takes one round per two silhouette to put out.", "Un incendie ravage le véhicule/vaisseau. L'appareil encaisse immédiatement 2 point de stress mécaniqueet quiconque se fait brûler subit des dégâts de feu, comme l'explique la page 214. Il est possible d'étouffer l'incendie en agissant rapidement et en utilisant les compétences appropriées comme des tests de Vigilance et/ou de Calme (choix du MJ). Il faut ensuite 1 round par tranche de 2 points de gabarit du véhicule/vaisseau pour éteindre le feu."],
		[218, "", ""],

		[219, "145 to 153", "145 à 153"],
		[220, "Breaking Up", "Dislocation"],
		[221, "At the end of next round, ship is completely destroyed. Anyone aboard has one round to reach escape pod or bail out before they are lost.", "Le véhicule/vaisseau a subit tant de dégâts qu'il commence à se disloquer et à partir en morceaux alors que l'équipage est encore à son bord. Il sera complètement détruit à la fin du prochain round, laissant une trainée de débris. Quiconque se trouve à bord de l'appareil dispose d'un round pour atteindre une capsule de survie, pour s'éjecter ou pour fuir par le sas le plus proche."],
		[222, "", ""],

		[223, "154+", "154+"],
		[224, "Vaporized", "Désintégré"],
		[225, "The ship or Vehicle is completely destroyed.", "Le véhicule/vaisseau disparait dans une explosion aussi puissante que spectaculaire. Il est complètement détruit et tous ces membres d'équipage sont tués sur le coup."],
		[226, "", ""],

		[227, "Rolls Vehicle Critical", "Dégâts critiques"],
		[228, "Current Criticals:", "Dégâts actuels :"],

		[229, "Success", "Succès"],
		[230, "Fail", "Echec"],
		[231, "Advant", "Avantage"],
		[232, "Threat", "Menace"],
		[233, "Triumph", "Triomphe"],
		[234, "Despair", "Désastre"],
		[235, "Light", "Lumineux"],
		[236, "Dark", "Obscure"],

		[237, "Boost", "Maitrise"],
		[238, "Ability", "Aptitude"],
		[239, "Proficiency", "Fortune"],
		[240, "SetBack", "Infortune"],
		[241, "Difficulty", "Difficulté"],
		[242, "Challenge", "Défi"],
		[243, "Force", "Force"],
		[244, "Success", "Succès"],
		[245, "Advantage", "Avantage"],
		[246, "Failure", "Echec"],
		[247, "Threat", "Menace"],

		[248, "Skill", "Compétence"],

		[249, "Roll", "Lancé"],

		[250, "Blank", "Vide"],
		[251, "Advantage", "Avantage"],
		[252, "Advantage x2", "Avantage"],
		[253, "Success + Advantage", "Succès + Avantage"],
		[254, "Success x2", "Succès x2"],
		[255, "Triumph(+Success)", "Triompe(+Succès)"],
		[256, "Failure", "Echec"],
		[257, "Threat", "Menace"],
		[258, "Failure x2", "Echec x2"],
		[259, "Failure + Threat", "Echec + Menace"],
		[260, "Threat x2", "Menace x2"],
		[261, "Despair", "Desastre"],
		[262, "Light x2", "Lumineux x2"],
		[263, "Dark x2", "Obscure x2"],

		[264, "Damages", "Dégâts Réels"],
		[265, "Critical", "Critique ?"],
		[266, "Results", "Résultats"],
		[267, "CRITICAL HIT !", "COUP CRITIQUE !"]
	],
}

eote.createGMDicePool = function () {

	var charObj_DicePool = findObjs({
			_type : "character",
			name : "-DicePool"
		})[0];

	var attrObj_DicePool = [{
			name : 'pcgm',
			current : 3,
			max : '',
			update : true
		}, {
			name : 'gmdicepool',
			current : 2,
			max : '',
			update : true
		}
	];

	//create character -DicePool
	if (!charObj_DicePool) {

		charObj_DicePool = createObj("character", {
				name : "-DicePool",
				bio : eote.translation.text[0][eote.translation.lang]
				//bio: "GM Dice Pool"
			});

	}

	eote.defaults['-DicePoolID'] = charObj_DicePool.id;

	eote.updateAddAttribute(charObj_DicePool, attrObj_DicePool);

}

eote.createObj = function () { //Create Object Fix - Firebase.set failed
	var obj = createObj.apply(this, arguments);
	var id = obj.id;
	var characterID = obj.get('characterid');
	var type = obj.get('type');
	if (obj && !obj.fbpath && obj.changed) {
		obj.fbpath = obj.changed._fbpath.replace(/([^\/]*\/){4}/, "/");
	} else if (obj && !obj.changed && type == 'attribute') { //fix for dynamic attribute after in character created in game
		obj.fbpath = '/char-attribs/char/' + characterID + '/' + id;
		// /char-attribs/char/characterID/attributeID
	}

	return obj;
}

eote.setCharacterDefaults = function (characterObj) {

	var charObj = [characterObj];

	if (!characterObj) {
		charObj = findObjs({
				_type : "character"
			});
	}

	//add/update characterID field
	_.each(charObj, function (charObj) {

		//updates default attr:CharacterID to current character id
		//_.findWhere(eote.defaults.character.attributes, {'name':'characterID'}).current = charObj.id;

		//Attributes
		eote.updateAddAttribute(charObj, eote.defaults.character.attributes); //Update Add Attribute defaults

		//Abilities

	});
}

eote.updateListeners = function (attributes) {

	_.each(eote.defaults.destinyListeners, function (charID) {

		var charObj = findObjs({
				_type : "character",
				_id : charID
			});

		//add/update characterID feild
		_.each(charObj, function (charObj) {

			//Attributes
			eote.updateAddAttribute(charObj, attributes); //Update Add Attribute defaults

		});
	});

	//Update GM
	var GMObj = findObjs({
			_type : "character",
			_id : eote.defaults['-DicePoolID']
		});
	eote.updateAddAttribute(GMObj, attributes);
}

eote.updateAddAttribute = function (charactersObj, updateAddAttributesObj) { // charactersObj = object or array objects, updateAddAttributesObj = object or array objects

	//check if object or array
	if (!_.isArray(charactersObj)) {
		charactersObj = [charactersObj];
	}

	if (!_.isArray(updateAddAttributesObj)) {
		updateAddAttributesObj = [updateAddAttributesObj];
	}

	_.each(charactersObj, function (characterObj) { //loop characters

		var characterName = '';

		if (characterObj.name) {
			characterName = characterObj.name;
		} else {
			characterName = characterObj.get('name');
		}

		//find attribute via character ID
		var characterAttributesObj = findObjs({
				_type : "attribute",
				characterid : characterObj.id
			});

		if (updateAddAttributesObj.length != 0) {

			//log('UPDATE/ADD ATTRIBUTES FOR:----------------------->'+ characterName);


			_.each(updateAddAttributesObj, function (updateAddAttrObj) { //loop attributes to update / add

				attr = _.find(characterAttributesObj, function (a) {
						return (a.get('name') === updateAddAttrObj.name);
					});

				if (attr) {
					if (updateAddAttrObj.update) {
						//log('Update Attr: '+ updateAddAttrObj.name);
						attr.set({
							current : updateAddAttrObj.current
						});
						attr.set({
							max : updateAddAttrObj.max ? updateAddAttrObj.max : ''
						});
					}
				} else {
					//log('Add Attr: '+ updateAddAttrObj.name);
					eote.createObj('attribute', {
						characterid : characterObj.id,
						name : updateAddAttrObj.name,
						current : updateAddAttrObj.current,
						max : updateAddAttrObj.max ? updateAddAttrObj.max : ''
					});
				}
			});
		}
	});

}

/* DICE PROCESS
 *
 * Matches the different regex commands and runs that dice processing step
 * The order of step should not be change or dice could be incorrectly rolled.
 * example: All dice needs to be 'upgraded" before it can be 'downgraded'
 * ---------------------------------------------------------------- */

eote.defaults.dice = function () {
	this.vars = {
		characterName : '',
		characterID : '',
		playerName : '',
		playerID : '',
		label : '',
		weaponDamage : '',
		weaponCritical : ''
	}
	this.totals = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0
	}
	this.graphicsLog = {
		Boost : '',
		Ability : '',
		Proficiency : '',
		SetBack : '',
		Difficulty : '',
		Challenge : '',
		Force : '',
		Success : '',
		Advantage : '',
		Threat : '',
		Failure : ''
	}
	this.textLog = {
		Boost : '',
		Ability : '',
		Proficiency : '',
		SetBack : '',
		Difficulty : '',
		Challenge : '',
		Force : '',
		Success : '',
		Advantage : '',
		Threat : '',
		Failure : ''
	}
	this.count = {
		boost : 0,
		ability : 0,
		proficiency : 0,
		setback : 0,
		difficulty : 0,
		challenge : 0,
		force : 0,
		success : 0,
		advantage : 0,
		threat : 0,
		failure : 0
	}
}

eote.process = {}

eote.process.logger = function (functionName, cmd) {
	if (eote.defaults.globalVars.debugScript) {
		log(functionName + ' : ' + cmd);
	}
}

eote.process.setup = function (cmd, playerName, playerID) {

	if (!cmd.match(eote.defaults.regex.cmd)) { //check for api cmd !eed
		return false;
	}

	var debugMatch = cmd.match(eote.defaults.regex.debug);
	if (debugMatch) {
		eote.process.debug(debugMatch);
		return false;
	}

	eote.process.logger("eote.process.setup", "NEW ROLL");

	eote.process.logger("eote.process.setup", "Original Command: " + cmd);

	/* reset dice - test, might not need this
	 * ------------------------------------------------------------- */

	var diceObj = new eote.defaults.dice();
	diceObj.vars.playerName = playerName;
	diceObj.vars.playerID = playerID;

	/* Dice config
	 * Description: Change dice roller default config
	 * --------------------------------------------------------------*/
	var logMatch = cmd.match(eote.defaults.regex.log);

	if (logMatch) {
		eote.process.log(logMatch);
		return false; //Stop current roll and run test
	}

	var graphicsMatch = cmd.match(eote.defaults.regex.graphics);

	if (graphicsMatch) {
		eote.process.graphics(graphicsMatch);
		return false; //Stop current roll and run test
	}

	var testMatch = cmd.match(eote.defaults.regex.test);

	if (testMatch) {
		eote.process.test(testMatch);
		return false; //Stop current roll and run test
	}

	/* Roll information
	 * Description: Set default dice roll information Character Name and Skill Label
	 * --------------------------------------------------------------*/

	var rollPlayerMatch = cmd.match(eote.defaults.regex.rollPlayer);

	if (rollPlayerMatch) {
		diceObj = eote.process.rollPlayer(rollPlayerMatch, diceObj);

		if (!diceObj) {
			return false;
		}
	}

	var characterIDMatch = cmd.match(eote.defaults.regex.characterID);

	if (characterIDMatch) {
		diceObj = eote.process.characterID(characterIDMatch, diceObj);
		//Once Character ID is parsed, remove it from the cmd.
		//it is possible that the character ID could contain dice values
		//for ex. characterID(-JMBFmYX1i0L259bjb-X)  will add 59 blue dice to the pool
		cmd = cmd.replace(characterIDMatch[0], '');
		eote.process.logger("eote.process.setup.characterIDMatch", "New command: " + cmd);
	}

	var weaponDamCritMatch = cmd.match(eote.defaults.regex.weaponDamCrit);

	if (weaponDamCritMatch) {
		diceObj = eote.process.weaponDamCrit(weaponDamCritMatch, diceObj);

		cmd = cmd.replace(weaponDamCritMatch[0], '');

		eote.process.logger("eote.process.setup.weaponDamCritMatch", "New command: " + cmd);

	}

	var unusableMatch = cmd.match(eote.defaults.regex.unusable);

	if (unusableMatch) {
		eote.process.logger("eote.process.setup.unusableMatch", "Roll ended because of unusable weapon");
		//sendChat(diceObj.vars.characterName, 'Weapon is too damaged to be used. Try repairing it.');
		sendChat(diceObj.vars.characterName, "&{template:base} {{title=" + diceObj.vars.characterName + "}} {{wide=" + eote.translation.text[1][eote.translation.lang] + "}}");
		return false;
	}

	var labelMatch = cmd.match(eote.defaults.regex.label);

	if (labelMatch) {
		diceObj = eote.process.label(labelMatch, diceObj);
	}

	/* Dice rolls
	 * Description: Create dice pool before running any custom roll
	 * script commands that may need dice evaluated.
	 * --------------------------------------------------------------*/
	var gmdiceMatch = cmd.match(eote.defaults.regex.gmdice);

	if (gmdiceMatch) {
		cmd = eote.process.gmdice(cmd); // update the cmd string to contain the gmdice
		eote.process.logger("eote.process.setup.gmDice", "New command: " + cmd);
	}

	var encumMatch = cmd.match(eote.defaults.regex.encum);

	if (encumMatch) {
		diceObj = eote.process.encum(encumMatch, diceObj);
		//eote.process.logger("eote.process.setup.encumMatch","New dice:" + diceObj);
	}

	var skillMatch = cmd.match(eote.defaults.regex.skill);

	if (skillMatch) {
		diceObj = eote.process.skill(skillMatch, diceObj);
	}

	var opposedMatch = cmd.match(eote.defaults.regex.opposed);

	if (opposedMatch) {
		diceObj = eote.process.opposed(opposedMatch, diceObj);
	}

	var diceMatch = cmd.match(eote.defaults.regex.dice);

	if (diceMatch) {
		diceObj = eote.process.setDice(diceMatch, diceObj);
	}

	var upgradeMatch = cmd.match(eote.defaults.regex.upgrade);

	if (upgradeMatch) {
		diceObj = eote.process.upgrade(upgradeMatch, diceObj);
	}

	var downgradeMatch = cmd.match(eote.defaults.regex.downgrade);

	if (downgradeMatch) {
		diceObj = eote.process.downgrade(downgradeMatch, diceObj);
	}

	/* Roll dice and update success / fail
	 * ------------------------------------------------------------- */
	diceObj = eote.process.rollDice(diceObj);

	/* Custom rolls
	 * Description: Custom dice components have thier own message, results and
	 * often will return false to not allow proceeding scripts to fire
	 * --------------------------------------------------------------*/
	var resetdiceMatch = cmd.match(eote.defaults.regex.resetdice);

	if (resetdiceMatch) {
		eote.process.resetdice(resetdiceMatch, diceObj);
		return false;
	}

	var initiativeMatch = cmd.match(eote.defaults.regex.initiative);

	if (initiativeMatch) {
		eote.process.initiative(initiativeMatch, diceObj);
		//return false;
	}

	var destinyMatch = cmd.match(eote.defaults.regex.destiny);

	if (destinyMatch) {
		eote.process.logger("etoe.process.setup.destiny", "Destiny Point Command");
		var doRoll = eote.process.destiny(destinyMatch, diceObj);
		if (!doRoll) {
			return false;
		}
	}

	var critMatch = cmd.match(eote.defaults.regex.crit);

	if (critMatch) {
		eote.process.crit(critMatch, diceObj);
		return false;
	}

	var critShipMatch = cmd.match(eote.defaults.regex.critShip);

	if (critShipMatch) {
		eote.process.critShip(critShipMatch, diceObj);
		return false;
	}

	/* Display dice output in chat window
	 * ------------------------------------------------------------- */
	eote.process.diceOutput(diceObj, playerName, playerID);

}

/* DICE PROCESS FUNCTION
 *
 * ---------------------------------------------------------------- */

eote.process.log = function (cmd) {

	/* Log
	 * default: 'on' and 'single'
	 * Description: Sets the visual output in the chat window for the dice rolls
	 * Command: !eed log on|off|multi|single
	 * ---------------------------------------------------------------- */

	//log(cmd[1]);

	switch (cmd[1]) {
	case "on": //if 'on' outputs dice to chat window
		eote.defaults.globalVars.diceLogChat = true;
		//sendChat("Dice Sytem", 'Output rolled dice to chat window "On"');
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[3][eote.translation.lang]);
		break;
	case "off": //if 'off' outputs only results to chat window
		eote.defaults.globalVars.diceLogChat = false;
		//sendChat("Dice Sytem", Output rolled dice to chat window "Off");
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[4][eote.translation.lang]);
		break;
	case "multi": //if 'multi' multiple sets dice per line
		eote.defaults.globalVars.diceLogRolledOnOneLine = false;
		//sendChat("Dice Sytem", 'Mulitple line output "Off"');
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[5][eote.translation.lang]);
		break;
	case "single": //if 'single' single set of dice per line
		eote.defaults.globalVars.diceLogRolledOnOneLine = true;
		//sendChat("Dice Sytem", 'Mulitple line output "On"');
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[6][eote.translation.lang]);
		break;
	}
}

eote.process.debug = function (cmd) {
	switch (cmd[1]) {
	case "on":
		eote.defaults.globalVars.debugScript = true;
		//sendChat("Dice Sytem", 'Debug Script "On"');
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[7][eote.translation.lang]);
		break;
	case "off":
		eote.defaults.globalVars.debugScript = false;
		//sendChat("Dice Sytem", 'Debug Script "Off"');
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[8][eote.translation.lang]);
		break;
	}
}

eote.process.graphics = function (cmd) {

	/* Graphics
	 * default: 'on' and 'm'
	 * Description: Sets chat window dice output as graphic, small, medium, or large if "on" or as text if "off"
	 * Command: !eed graphics on|off|s|m|l
	 * ---------------------------------------------------------------- */

	//log(cmd[1]);

	switch (cmd[1]) {
	case "on":
		eote.defaults.globalVars.diceGraphicsChat = true;
		//sendChat("Dice Sytem", 'Chat graphics "On"');
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[9][eote.translation.lang]);
		break;
	case "off":
		eote.defaults.globalVars.diceGraphicsChat = false;
		//sendChat("Dice Sytem", 'Chat graphics "Off"');
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[10][eote.translation.lang]);
		break;
	case "s":
		eote.defaults.globalVars.diceGraphicsChatSize = eote.defaults.graphics.SIZE.SMALL;
		//sendChat("Dice Sytem", 'Chat graphics size "Small"');
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[11][eote.translation.lang]);
		break;
	case "m":
		eote.defaults.globalVars.diceGraphicsChatSize = eote.defaults.graphics.SIZE.MEDIUM;
		//sendChat("Dice Sytem", 'Chat graphics size "Medium"');
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[12][eote.translation.lang]);
		break;
	case "l":
		eote.defaults.globalVars.diceGraphicsChatSize = eote.defaults.graphics.SIZE.LARGE;
		//sendChat("Dice Sytem", 'Chat graphics size "Large"');
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[13][eote.translation.lang]);
		break;
	}

}

eote.process.test = function (cmd) {

	eote.process.logger("eote.process.test", cmd);

	//Set test vars to true
	eote.defaults.globalVars.diceTestEnabled = true;
	tmpLogChat = eote.defaults.globalVars.diceLogChat;
	tmpGraphicsChat = eote.defaults.globalVars.diceGraphicsChat;
	eote.defaults.globalVars.diceLogChat = true;
	eote.defaults.globalVars.diceGraphicsChat = true;

	//Roll dice
	eote.process.setup('!eed 1b 1g 1y 1blk 1p 1r 1w', 'GM', 'Dice Test');

	//After test reset vars back
	eote.defaults.globalVars.diceTestEnabled = false;
	eote.defaults.globalVars.diceLogChat = tmpLogChat;
	eote.defaults.globalVars.diceGraphicsChat = tmpGraphicsChat;

}

eote.process.rollPlayer = function (cmd, diceObj) {
	//Build cmd string
	//get characterID
	//get skills
	//get encum
	//remove rollPlayer(xxxx) from string
	var match = {
		skill : /skill:(.*?)[\|\)]/,
		encum : /encum/,
		character : /character:(.*?)[\|\)]/,
	}

	var charcterMatch = cmd[1].match(match.character);

	if (charcterMatch) {

		var charObj = findObjs({
				_type : "character",
				name : charcterMatch[1]
			});

		if (charObj.length > 0) {

			diceObj.vars.characterName = charObj[0].get('name');
			diceObj.vars.characterID = charObj[0].id;

		} else {
			//sendChat("Alert", "Can't find character. Please update character name field to match sheet character name and try again.");
			sendChat(eote.translation.text[14][eote.translation.lang], eote.translation.text[15][eote.translation.lang]);
			return false;
		}
	} else {
		//sendChat("Alert", "Please update character name field.");
		sendChat(eote.translation.text[14][eote.translation.lang], eote.translation.text[16][eote.translation.lang]);
		return false;
	}

	var encumMatch = cmd[1].match(match.encum);

	if (encumMatch) {
		//encumbrance
		var attr_1 = getAttrByName(diceObj.vars.characterID, 'encumbrance', 'max');
		var attr_2 = getAttrByName(diceObj.vars.characterID, 'encumbrance');
		var cmdEncum = ['encum(' + attr_1 + '|' + attr_2 + ')']; //["encum(3|5)"]

		diceObj = eote.process.encum(cmdEncum, diceObj);

	}

	var skillMatch = cmd[1].match(match.skill);

	if (skillMatch) {

		var attrArray = skillMatch[1].split(',')
			var attr_1 = getAttrByName(diceObj.vars.characterID, attrArray[0]);
		var attr_2 = getAttrByName(diceObj.vars.characterID, attrArray[1]);
		var cmdSkill = ['skill(' + attr_1 + '|' + attr_2 + ')']; //['skill(0|2)']

		diceObj = eote.process.skill(cmdSkill, diceObj);
	}

	return diceObj;

}

eote.process.destiny = function (cmd, diceObj) {

	var charObj_DicePool = findObjs({
			_type : "character",
			name : "-DicePool"
		})[0];

	var doRoll = false;

	if (!charObj_DicePool) {
		//sendChat("Dice System","We can't find the DicePool player! SEND HELP!");
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[17][eote.translation.lang]);
		return doRoll;
	}

	//GM's Destiny Point Pool
	var currentLightSidePoints = findObjs({
			_characterid : charObj_DicePool.get("_id"),
			_type : "attribute",
			_name : "lightSidePoints"
		});
	var currentDarkSidePoints = findObjs({
			_characterid : charObj_DicePool.get("_id"),
			_type : "attribute",
			_name : "darkSidePoints"
		});

	if (!currentDarkSidePoints[0] || !currentLightSidePoints[0]) {
		//sendChat("Dice System","No Destiny Points Defined.<br/>GM needs to add points then update players.");
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[18][eote.translation.lang]);
		return doRoll;
	}

	var darkSide = parseInt(currentDarkSidePoints[0].get("current"));
	var lightSide = parseInt(currentLightSidePoints[0].get("current"));

	switch (cmd[1]) {
	case "useDark":
		if (darkSide > 0) {
			//sendChat("The GM","Uses a dark side point!");
			sendChat(eote.translation.text[19][eote.translation.lang], eote.translation.text[20][eote.translation.lang]);
			darkSide = darkSide - 1;
			lightSide = lightSide + 1;
		} else {
			//sendChat("Dice System","No dark side points to use!");
			sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[21][eote.translation.lang]);
			return doRoll;
		}
		break;
	case "useLight":
		if (lightSide > 0) {
			//sendChat(diceObj.vars.characterName,"Uses a light side point!");
			sendChat(diceObj.vars.characterName, eote.translation.text[22][eote.translation.lang]);
			lightSide = lightSide - 1;
			darkSide = darkSide + 1;
		} else {
			//sendChat("Dice System","No light side points to use!");
			sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[23][eote.translation.lang]);
			return doRoll;
		}
		break;
	case "doRoll":
		//sendChat(diceObj.vars.characterName,"Rolling Destiny Point");
		sendChat(diceObj.vars.characterName, eote.translation.text[24][eote.translation.lang]);
		doRoll = true;
	case "registerPlayer":
		if (!doRoll) {
			//sendChat(diceObj.vars.characterName,"Regestering with Destiny Pool");
			sendChat(diceObj.vars.characterName, eote.translation.text[25][eote.translation.lang]);
		}
		darkSide = darkSide + diceObj.totals.dark;
		lightSide = lightSide + diceObj.totals.light;

		//Register
		if (eote.defaults.destinyListeners.indexOf(diceObj.vars.characterID) == -1) {
			eote.defaults.destinyListeners.push(diceObj.vars.characterID);
		}

		break;
	case "sendUpdate":
		//sendChat("Dice System","Updating Players Destiny Pools");
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[26][eote.translation.lang]);
		break;
	case "clearPool":
		//sendChat("Dice System","Clearing The Destiny Pool");
		sendChat(eote.translation.text[2][eote.translation.lang], eote.translation.text[27][eote.translation.lang]);
		lightSide = 0;
		darkSide = 0;
		break;
	}

	var newDestPool = [{
			name : 'lightSidePoints',
			current : lightSide,
			max : '',
			update : true
		}, {
			name : 'darkSidePoints',
			current : darkSide,
			max : '',
			update : true
		}
	];

	eote.updateListeners(newDestPool);

	return doRoll;
}

eote.process.characterID = function (cmd, diceObj) {

	/* CharacterId
	 * default: null
	 * Description: looks up the characters name based on character ID
	 * Command: !eed characterID(##########)
	 * ---------------------------------------------------------------- */

	eote.process.logger("eote.process.characterID", cmd);

	var characterID = cmd[1];

	if (characterID) {

		diceObj.vars.characterName = getObj("character", characterID).get('name');
		diceObj.vars.characterID = characterID;

	}

	return diceObj;

}

eote.process.weaponDamCrit = function (cmd, diceObj) {
	/* weaponDamCrit
	 * default: null
	 * Description: looks up the weapon damage and critical values
	 * Command: !eed weaponDamCrit(damage|critical)
	 * ---------------------------------------------------------------- */

	if (cmd) {

		var values = cmd[1];

		if (values) {
			var weaponDamCritArray = cmd[1].split('|');

			var weaponDamage = weaponDamCritArray[0];

			if (weaponDamage) {
				diceObj.vars.weaponDamage = weaponDamage;
			}

			var weaponCritical = weaponDamCritArray[1];

			if (weaponCritical) {
				diceObj.vars.weaponCritical = weaponCritical;
			}
		}
	}
	return diceObj;
}

eote.process.label = function (cmd, diceObj) {

	/* Label
	 * default: null
	 * Description: set the skill name of the roll
	 * Command: !eed label(Name of Skill)
	 * ---------------------------------------------------------------- */
	//log(cmd);

	var label = cmd[1];

	if (label) {

		var labelStr = '';
		var labelArray = label.split('|');

		_.each(labelArray, function (labelVal) {
			var labelArray = labelVal.split(':');
			var label = labelArray[0];
			var message = labelArray[1];

			if (label == "Arme") {
				labelStr = labelStr + message + '}}';
			}
			if (label == "Weapon") {
				labelStr = labelStr + message + '}}';
			} else if (label == "Comp.") {
				labelStr = labelStr + message + '}}';
			} else if (label == "skill") {
				labelStr = labelStr + message + '}}';
			} else if (label == "Lancé") {
				labelStr = labelStr + message + '}}';
			} else if (label == "Roll") {
				labelStr = labelStr + message + '}}';
			} else if (label == "Role") {
				labelStr = labelStr + message + '}}';
			} else {
				labelStr = labelStr + '{{' + label + '=' + message + '}}';
			}
		});
		diceObj.vars.label = labelStr;
	}

	return diceObj;

}

eote.process.resetdice = function (cmd, diceObj) {

	var characterObj = [{
			name : diceObj.vars.characterName,
			id : diceObj.vars.characterID
		}
	];

	eote.process.logger("eote.process.resetdice", cmd);

	if (cmd[1] == 'resetdice') {
		var resetdice = [{
				name : "b",
				current : 0,
				max : "",
				update : true
			}, {
				name : "g",
				current : 0,
				max : "",
				update : true
			}, {
				name : "y",
				current : 0,
				max : "",
				update : true
			}, {
				name : "blk",
				current : 0,
				max : "",
				update : true
			}, {
				name : "r",
				current : 0,
				max : "",
				update : true
			}, {
				name : "p",
				current : 0,
				max : "",
				update : true
			}, {
				name : "w",
				current : 0,
				max : "",
				update : true
			}, {
				name : "upgradeAbility",
				current : 0,
				max : "",
				update : true
			}, {
				name : "downgradeProficiency",
				current : 0,
				max : "",
				update : true
			}, {
				name : "upgradeDifficulty",
				current : 0,
				max : "",
				update : true
			}, {
				name : "downgradeChallenge",
				current : 0,
				max : "",
				update : true
			}
		]
	}

	if (cmd[1] == 'resetgmdice') {
		var resetdice = [{
				name : "bgm",
				current : 0,
				max : "",
				update : true
			}, {
				name : "ggm",
				current : 0,
				max : "",
				update : true
			}, {
				name : "ygm",
				current : 0,
				max : "",
				update : true
			}, {
				name : "blkgm",
				current : 0,
				max : "",
				update : true
			}, {
				name : "rgm",
				current : 0,
				max : "",
				update : true
			}, {
				name : "pgm",
				current : 0,
				max : "",
				update : true
			}, {
				name : "wgm",
				current : 0,
				max : "",
				update : true
			}, {
				name : "upgradeAbilitygm",
				current : 0,
				max : "",
				update : true
			}, {
				name : "downgradeProficiencygm",
				current : 0,
				max : "",
				update : true
			}, {
				name : "upgradeDifficultygm",
				current : 0,
				max : "",
				update : true
			}, {
				name : "downgradeChallengegm",
				current : 0,
				max : "",
				update : true
			}
		]
	}

	eote.updateAddAttribute(characterObj, resetdice);

}

eote.process.initiative = function (cmd, diceObj) {

	/* initiative
	 * default: false
	 * Description: Set NPC/PC initiative true
	 * Command: !eed npcinit or pcinit
	 * ---------------------------------------------------------------- */

	var type = '';
	var NumSuccess = diceObj.totals.success;
	var NumAdvantage = diceObj.totals.advantage;
	var turnorder;

	eote.process.logger("eote.process.initiative.diceObj", diceObj);
	eote.process.logger("eote.process.initiative.NumSuccess", NumSuccess);
	eote.process.logger("eote.process.initiativeNumAdvantage", NumAdvantage);

	if (Campaign().get("turnorder") == "")
		turnorder = []; //NOTE: We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
	else
		turnorder = JSON.parse(Campaign().get("turnorder"));

	if (cmd[0] == 'pcinit') {
		type = 'PC';
	}

	if (cmd[0] == 'npcinit') {
		type = 'NPC';
	}

	//Add a new custom entry to the end of the turn order.
	turnorder.push({
		id : "-1",
		pr : NumSuccess + ":" + NumAdvantage,
		custom : type
	});

	turnorder.sort(function (x, y) {
		var a = x.pr.split(":");
		var b = y.pr.split(":");

		if (b[0] - a[0] != 0) { //First rank on successes
			return b[0] - a[0];
		} else if (b[1] - a[1] != 0) { //Then rank on Advantage
			return b[1] - a[1];
		} else { //If they are still tied, PC goes first

			if (x.custom == y.custom) {
				return 0;
			} else if (x.custom == "NPC") {
				return 1;
			} else {
				return -1;
			}
		}
	});

	Campaign().set("turnorder", JSON.stringify(turnorder));

	//sendChat(diceObj.vars.characterName, 'Rolls initiative');

}

eote.process.crit = function (cmd, diceObj) {

	/* Crit
	 * default:
	 * Description: Rolls critical injury table
	 * Command: !eed crit(roll) crit(roll|#) crit(heal|#)
	 * ---------------------------------------------------------------- */

	eote.process.logger("eote.process.crit", "");

	var characterObj = [{
			name : diceObj.vars.characterName,
			id : diceObj.vars.characterID
		}
	];
	var critTable = [{
			percent : eote.translation.text[28][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[29][eote.translation.lang],
			Result : eote.translation.text[30][eote.translation.lang],
			effect : eote.translation.text[31][eote.translation.lang],
		}, {
			percent : eote.translation.text[32][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[33][eote.translation.lang],
			Result : eote.translation.text[34][eote.translation.lang],
			effect : eote.translation.text[35][eote.translation.lang],
		}, {
			percent : eote.translation.text[36][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[37][eote.translation.lang],
			Result : eote.translation.text[38][eote.translation.lang],
			effect : eote.translation.text[39][eote.translation.lang],
		}, {
			percent : eote.translation.text[40][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[41][eote.translation.lang],
			Result : eote.translation.text[42][eote.translation.lang],
			effect : eote.translation.text[43][eote.translation.lang],
		}, {
			percent : eote.translation.text[44][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[45][eote.translation.lang],
			Result : eote.translation.text[46][eote.translation.lang],
			effect : eote.translation.text[47][eote.translation.lang],
		}, {
			percent : eote.translation.text[48][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[49][eote.translation.lang],
			Result : eote.translation.text[50][eote.translation.lang],
			effect : eote.translation.text[51][eote.translation.lang],
		}, {
			percent : eote.translation.text[52][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[53][eote.translation.lang],
			Result : eote.translation.text[54][eote.translation.lang],
			effect : eote.translation.text[55][eote.translation.lang],
		}, {
			percent : eote.translation.text[56][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[57][eote.translation.lang],
			Result : eote.translation.text[58][eote.translation.lang],
			effect : eote.translation.text[59][eote.translation.lang],
		},
		//----------------------------- Severity 2
		{
			percent : eote.translation.text[60][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[61][eote.translation.lang],
			Result : eote.translation.text[62][eote.translation.lang],
			effect : eote.translation.text[63][eote.translation.lang],
		}, {
			percent : eote.translation.text[64][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[65][eote.translation.lang],
			Result : eote.translation.text[66][eote.translation.lang],
			effect : eote.translation.text[67][eote.translation.lang],
		}, {
			percent : eote.translation.text[68][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[69][eote.translation.lang],
			Result : eote.translation.text[70][eote.translation.lang],
			effect : eote.translation.text[71][eote.translation.lang],
		}, {
			percent : eote.translation.text[72][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[73][eote.translation.lang],
			Result : eote.translation.text[74][eote.translation.lang],
			effect : eote.translation.text[75][eote.translation.lang],
		}, {
			percent : eote.translation.text[76][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[77][eote.translation.lang],
			Result : eote.translation.text[78][eote.translation.lang],
			effect : eote.translation.text[79][eote.translation.lang],
		}, {
			percent : eote.translation.text[80][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[81][eote.translation.lang],
			Result : eote.translation.text[82][eote.translation.lang],
			effect : eote.translation.text[83][eote.translation.lang],
		}, {
			percent : eote.translation.text[84][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[85][eote.translation.lang],
			Result : eote.translation.text[86][eote.translation.lang],
			effect : eote.translation.text[87][eote.translation.lang],
		}, {
			percent : eote.translation.text[88][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[89][eote.translation.lang],
			Result : eote.translation.text[90][eote.translation.lang],
			effect : eote.translation.text[91][eote.translation.lang],
		}, {
			percent : eote.translation.text[92][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[93][eote.translation.lang],
			Result : eote.translation.text[94][eote.translation.lang],
			effect : eote.translation.text[95][eote.translation.lang],
		}, {
			percent : eote.translation.text[96][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[97][eote.translation.lang],
			Result : eote.translation.text[98][eote.translation.lang],
			effect : eote.translation.text[99][eote.translation.lang],
		},
		//---------------------------------------- Severity 3
		{
			percent : eote.translation.text[100][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[101][eote.translation.lang],
			Result : eote.translation.text[102][eote.translation.lang],
			effect : eote.translation.text[103][eote.translation.lang],
		}, {
			percent : eote.translation.text[104][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[105][eote.translation.lang],
			Result : eote.translation.text[106][eote.translation.lang],
			effect : eote.translation.text[107][eote.translation.lang],
		}, {
			percent : eote.translation.text[108][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[109][eote.translation.lang],
			Result : eote.translation.text[110][eote.translation.lang],
			effect : eote.translation.text[111][eote.translation.lang],
		}, {
			percent : eote.translation.text[112][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[113][eote.translation.lang],
			Result : eote.translation.text[114][eote.translation.lang],
			effect : eote.translation.text[115][eote.translation.lang],
		}, {
			percent : eote.translation.text[116][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[117][eote.translation.lang],
			Result : eote.translation.text[118][eote.translation.lang],
			effect : eote.translation.text[119][eote.translation.lang],
		}, {
			percent : eote.translation.text[120][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[121][eote.translation.lang],
			Result : eote.translation.text[122][eote.translation.lang],
			effect : eote.translation.text[123][eote.translation.lang],
		}, {
			percent : eote.translation.text[124][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[125][eote.translation.lang],
			Result : eote.translation.text[126][eote.translation.lang],
			effect : eote.translation.text[127][eote.translation.lang],
		},
		//---------------------------------------- Severity 4
		{
			percent : eote.translation.text[128][eote.translation.lang],
			severity : 4,
			name : eote.translation.text[129][eote.translation.lang],
			Result : eote.translation.text[130][eote.translation.lang],
			effect : eote.translation.text[131][eote.translation.lang],
		}, {
			percent : eote.translation.text[132][eote.translation.lang],
			severity : 4,
			name : eote.translation.text[133][eote.translation.lang],
			Result : eote.translation.text[134][eote.translation.lang],
			effect : eote.translation.text[135][eote.translation.lang],
		}, {
			percent : eote.translation.text[136][eote.translation.lang],
			severity : 4,
			name : eote.translation.text[137][eote.translation.lang],
			Result : eote.translation.text[138][eote.translation.lang],
			effect : eote.translation.text[139][eote.translation.lang],
		}, {
			percent : eote.translation.text[140][eote.translation.lang],
			severity : 4,
			name : eote.translation.text[141][eote.translation.lang],
			Result : eote.translation.text[142][eote.translation.lang],
			effect : eote.translation.text[143][eote.translation.lang],
		}
	];

	var critRoll = function (addCritNum) {

		var openSlot = false;
		var diceRoll = '';
		var critMod = '';
		var rollTotal = '';
		var rollOffset = parseInt(getAttrByName(diceObj.vars.characterID, 'critAddOffset'));
		rollOffset = rollOffset ? rollOffset : 0;
		eote.process.logger("critRoll", "rollOffset: " + rollOffset)
		var totalcrits = 0;

		//check open critical spot
		for (i = 15; i >= 1; i--) {

			var slot = getAttrByName(diceObj.vars.characterID, 'critOn' + i);

			if (slot == '0' || slot == '') {
				openSlot = i;
			} else {
				totalcrits = totalcrits + 1;
			}
		}

		if (!openSlot) {
			//sendChat("Alert", "Why are you not dead!");
			sendChat(eote.translation.text[14][eote.translation.lang], "&{template:base} {{title=Alert}} {{wide=" + eote.translation.text[144][eote.translation.lang] + "}}");
			return false;
		}

		//roll random
		if (!addCritNum) {
			diceRoll = randomInteger(100);
			critMod = (totalcrits * 10);
			rollTotal = diceRoll + critMod + rollOffset;
			eote.process.logger("critRoll", "diceRoll: " + diceRoll);
			eote.process.logger("critRoll", "critMod: " + critMod);
			eote.process.logger("critRoll", "rollTotal " + rollTotal);
		} else {
			rollTotal = parseInt(addCritNum);
		}

		//find crit in crital table
		for (var key in critTable) {

			var percent = critTable[key].percent.split(eote.translation.text[145][eote.translation.lang]);
			var low = parseInt(percent[0]);
			var high = percent[1] ? parseInt(percent[1]) : 1000;

			if ((rollTotal >= low) && (rollTotal <= high)) {

				critAttrs = [{
						name : 'critName' + openSlot,
						current : critTable[key].name,
						max : '',
						update : true
					}, {
						name : 'critSeverity' + openSlot,
						current : critTable[key].severity,
						max : '',
						update : true
					}, {
						name : 'critRange' + openSlot,
						current : critTable[key].percent,
						max : '',
						update : true
					}, {
						name : 'critSummary' + openSlot,
						current : critTable[key].Result,
						max : '',
						update : true
					}, {
						name : 'critOn' + openSlot,
						current : openSlot,
						max : '',
						update : true
					}
				];

				eote.updateAddAttribute(characterObj, critAttrs);

				var chat = '/direct &{template:base} {{title=' + diceObj.vars.characterName + '}}'
					chat = chat + '{{subtitle=' + eote.translation.text[146][eote.translation.lang] + '}}';
				chat = chat + '{{flavor=<img style="margin-left:auto; margin-right:auto;" src="http://i.imgur.com/z51hRwd.png" />}}'
					chat = chat + '{{' + eote.translation.text[147][eote.translation.lang] + '=' + totalcrits + ' x 10}}';
				if (rollOffset) {
					chat = chat + '{{' + eote.translation.text[148][eote.translation.lang] + '=' + rollOffset + '}}';
				}
				chat = chat + '{{' + eote.translation.text[149][eote.translation.lang] + '=' + diceRoll + '}}';
				chat = chat + '{{' + eote.translation.text[150][eote.translation.lang] + '=' + rollTotal + '}}';
				chat = chat + '{{wide=<b>' + critTable[key].name + '</b><br>';
				chat = chat + critTable[key].Result + '<br>}}';

				sendChat(diceObj.vars.characterName, chat);

			}
		}
	}

	var critHeal = function (critID) {

		critAttrs = [{
				name : 'critName' + critID,
				current : '',
				max : '',
				update : true
			}, {
				name : 'critSeverity' + critID,
				current : '',
				max : '',
				update : true
			}, {
				name : 'critRange' + critID,
				current : '',
				max : '',
				update : true
			}, {
				name : 'critSummary' + critID,
				current : '',
				max : '',
				update : true
			}, {
				name : 'critOn' + critID,
				current : 0,
				max : '',
				update : true
			}
		];

		eote.updateAddAttribute(characterObj, critAttrs);

	}

	var critArray = cmd[1].split('|');
	var prop1 = critArray[0];
	var prop2 = critArray[1] ? critArray[1] : null;

	if (prop1 == 'heal') {
		critHeal(prop2);
	} else if (prop1 == 'add') {
		critRoll(prop2);
	} else { // crit(roll)
		critRoll();
	}

}

eote.process.critShip = function (cmd, diceObj) {

	/* CritShip
	 * default:
	 * Description: Rolls vehicle critical table, Both crit() and critShip() function the same
	 * Command: !eed critShip(roll) critShip(roll|#) critShip(heal|#)
	 * ---------------------------------------------------------------- */

	var characterObj = [{
			name : diceObj.vars.characterName,
			id : diceObj.vars.characterID
		}
	];

	var critTable = [{
			percent : eote.translation.text[151][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[152][eote.translation.lang],
			Result : eote.translation.text[153][eote.translation.lang],
			effect : eote.translation.text[154][eote.translation.lang],
		}, {
			percent : eote.translation.text[155][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[156][eote.translation.lang],
			Result : eote.translation.text[157][eote.translation.lang],
			effect : eote.translation.text[158][eote.translation.lang],
		}, {
			percent : eote.translation.text[159][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[160][eote.translation.lang],
			Result : eote.translation.text[161][eote.translation.lang],
			effect : eote.translation.text[162][eote.translation.lang],
		}, {
			percent : eote.translation.text[163][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[164][eote.translation.lang],
			Result : eote.translation.text[165][eote.translation.lang],
			effect : eote.translation.text[166][eote.translation.lang],
		}, {
			percent : eote.translation.text[167][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[168][eote.translation.lang],
			Result : eote.translation.text[169][eote.translation.lang],
			effect : eote.translation.text[170][eote.translation.lang],
		}, {
			percent : eote.translation.text[171][eote.translation.lang],
			severity : 1,
			name : eote.translation.text[172][eote.translation.lang],
			Result : eote.translation.text[173][eote.translation.lang],
			effect : eote.translation.text[174][eote.translation.lang],
		},
		// --------------- severity : 2
		{
			percent : eote.translation.text[175][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[176][eote.translation.lang],
			Result : eote.translation.text[177][eote.translation.lang],
			effect : eote.translation.text[178][eote.translation.lang],
		}, {
			percent : eote.translation.text[179][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[180][eote.translation.lang],
			Result : eote.translation.text[181][eote.translation.lang],
			effect : eote.translation.text[182][eote.translation.lang],
		}, {
			percent : eote.translation.text[183][eote.translation.lang],
			severity : 2,
			name : eote.translation.text[184][eote.translation.lang],
			Result : eote.translation.text[185][eote.translation.lang],
			effect : eote.translation.text[186][eote.translation.lang],
		},
		// --------------- severity : 3
		{
			percent : eote.translation.text[187][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[188][eote.translation.lang],
			Result : eote.translation.text[189][eote.translation.lang],
			effect : eote.translation.text[190][eote.translation.lang],
		}, {
			percent : eote.translation.text[191][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[192][eote.translation.lang],
			Result : eote.translation.text[193][eote.translation.lang],
			effect : eote.translation.text[194][eote.translation.lang],
		}, {
			percent : eote.translation.text[195][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[196][eote.translation.lang],
			Result : eote.translation.text[197][eote.translation.lang],
			effect : eote.translation.text[198][eote.translation.lang],
		}, {
			percent : eote.translation.text[199][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[200][eote.translation.lang],
			Result : eote.translation.text[201][eote.translation.lang],
			effect : eote.translation.text[202][eote.translation.lang],
		}, {
			percent : eote.translation.text[203][eote.translation.lang],
			severity : 3,
			name : eote.translation.text[204][eote.translation.lang],
			Result : eote.translation.text[205][eote.translation.lang],
			effect : eote.translation.text[206][eote.translation.lang],
		},
		// --------------- severity : 4
		{
			percent : eote.translation.text[207][eote.translation.lang],
			severity : 4,
			name : eote.translation.text[208][eote.translation.lang],
			Result : eote.translation.text[209][eote.translation.lang],
			effect : eote.translation.text[210][eote.translation.lang],
		}, {
			percent : eote.translation.text[211][eote.translation.lang],
			severity : 4,
			name : eote.translation.text[212][eote.translation.lang],
			Result : eote.translation.text[213][eote.translation.lang],
			effect : eote.translation.text[214][eote.translation.lang],
		}, {
			percent : eote.translation.text[215][eote.translation.lang],
			severity : 4,
			name : eote.translation.text[216][eote.translation.lang],
			Result : eote.translation.text[217][eote.translation.lang],
			effect : eote.translation.text[218][eote.translation.lang],
		}, {
			percent : eote.translation.text[219][eote.translation.lang],
			severity : 4,
			name : eote.translation.text[220][eote.translation.lang],
			Result : eote.translation.text[221][eote.translation.lang],
			effect : eote.translation.text[222][eote.translation.lang],
		}, {
			percent : eote.translation.text[223][eote.translation.lang],
			severity : 4,
			name : eote.translation.text[224][eote.translation.lang],
			Result : eote.translation.text[225][eote.translation.lang],
			effect : eote.translation.text[226][eote.translation.lang],
		}
	];

	var critRoll = function (addCritNum) {

		var openSlot = false;
		var diceRoll = '';
		var critMod = '';
		var rollTotal = '';
		var rollOffset = parseInt(getAttrByName(diceObj.vars.characterID, 'critShipAddOffset'));
		rollOffset = rollOffset ? rollOffset : 0;
		var totalcrits = 0;

		//check open critical spot
		for (i = 15; i >= 1; i--) {

			var slot = getAttrByName(diceObj.vars.characterID, 'critShipOn' + i);

			if (slot == '0' || slot == '') {
				openSlot = i;
			} else {
				totalcrits = totalcrits + 1;
			}
		}

		if (!openSlot) {
			//sendChat("Alert", "Why are you not dead!");
			sendChat(eote.translation.text[14][eote.translation.lang], "&{template:base} {{title=Alert}} {{wide=" + eote.translation.text[144][eote.translation.lang] + "}}");
			return false;
		}

		//roll random
		if (!addCritNum) {
			diceRoll = randomInteger(100);
			critMod = (totalcrits * 10);
			rollTotal = diceRoll + critMod + rollOffset;
		} else {
			rollTotal = parseInt(addCritNum);
		}

		//find crit in crital table
		for (var key in critTable) {

			var percent = critTable[key].percent.split(eote.translation.text[145][eote.translation.lang]);
			var low = parseInt(percent[0]);
			var high = percent[1] ? parseInt(percent[1]) : 1000;

			if ((rollTotal >= low) && (rollTotal <= high)) {

				critAttrs = [{
						name : 'critShipName' + openSlot,
						current : critTable[key].name,
						max : '',
						update : true
					}, {
						name : 'critShipSeverity' + openSlot,
						current : critTable[key].severity,
						max : '',
						update : true
					}, {
						name : 'critShipRange' + openSlot,
						current : critTable[key].percent,
						max : '',
						update : true
					}, {
						name : 'critShipSummary' + openSlot,
						current : critTable[key].Result,
						max : '',
						update : true
					}, {
						name : 'critShipOn' + openSlot,
						current : openSlot,
						max : '',
						update : true
					}
				];

				eote.updateAddAttribute(characterObj, critAttrs);

				var chat = '/direct &{template:base} {{title=' + diceObj.vars.characterName + '}} '
					chat = chat + '{{subtitle=' + eote.translation.text[227][eote.translation.lang] + '}}';
				chat = chat + '{{flavor=<img style="margin-left:auto;" src="http://i.imgur.com/JO3pOr8.png" />}}'; //need new graphic
				chat = chat + '{{' + eote.translation.text[228][eote.translation.lang] + '=' + totalcrits + ' x 10}}';
				if (rollOffset) {
					chat = chat + '{{' + eote.translation.text[148][eote.translation.lang] + '=' + rollOffset + '}}';
				}
				chat = chat + '{{' + eote.translation.text[149][eote.translation.lang] + '=' + diceRoll + '}}';
				chat = chat + '{{' + eote.translation.text[150][eote.translation.lang] + '=' + rollTotal + '}}';
				chat = chat + '{{wide=<b>' + critTable[key].name + '</b><br>';
				chat = chat + critTable[key].Result + '}}';

				sendChat(diceObj.vars.characterName, chat);

			}
		}

	}

	var critHeal = function (critID) {

		critAttrs = [{
				name : 'critShipName' + critID,
				current : '',
				max : '',
				update : true
			}, {
				name : 'critShipSeverity' + critID,
				current : '',
				max : '',
				update : true
			}, {
				name : 'critShipRange' + critID,
				current : '',
				max : '',
				update : true
			}, {
				name : 'critShipSummary' + critID,
				current : '',
				max : '',
				update : true
			}, {
				name : 'critShipOn' + critID,
				current : 0,
				max : '',
				update : true
			}
		];

		eote.updateAddAttribute(characterObj, critAttrs);

	}

	var critArray = cmd[1].split('|');
	var prop1 = critArray[0];
	var prop2 = critArray[1] ? critArray[1] : null;

	if (prop1 == 'heal') {
		critHeal(prop2);
	} else if (prop1 == 'add') {
		critRoll(prop2);
	} else { // crit(roll)
		critRoll();
	}

}

eote.process.gmdice = function (cmd) {

	/* gmdice
	 * default:
	 * Description: Update CMD string to include -DicePool dice
	 * Command: (gmdice)
	 * ---------------------------------------------------------------- */

	//var charObj = findObjs({ _type: "character", name: "-DicePool" });
	var charID = eote.defaults['-DicePoolID']; //charObj[0].id;

	var g = getAttrByName(charID, 'ggm');
	var y = getAttrByName(charID, 'ygm');
	var p = getAttrByName(charID, 'pgm');
	var r = getAttrByName(charID, 'rgm');
	var b = getAttrByName(charID, 'bgm');
	var blk = getAttrByName(charID, 'blkgm');
	var w = getAttrByName(charID, 'wgm');
	var upAbility = getAttrByName(charID, 'upgradeAbilitygm');
	var upDifficulty = getAttrByName(charID, 'upgradeDifficultygm');
	var downProficiency = getAttrByName(charID, 'downgradeProficiencygm');
	var downChallenge = getAttrByName(charID, 'downgradeChallengegm');

	var gmdiceCMD = g + 'g ' + y + 'y ' + p + 'p ' + r + 'r ' + b + 'b ' + blk + 'blk ' + w + 'w upgrade(ability|' + upAbility + ') downgrade(proficiency|' + downProficiency + ') upgrade(difficulty|' + upDifficulty + ') downgrade(challenge|' + downChallenge + ')';

	eote.process.logger("eote.process.gmDice.charID", charID);

	cmd = cmd.replace('(gmdice)', gmdiceCMD);

	//log(cmd);

	return cmd;
}

eote.process.encum = function (cmd, diceObj) {

	/* Encumberment
	 * default:
	 * Description: If the current encum is great than threshold add 1 setback per unit over current encum
	 * Command: !eed encum(encum_current|encum_threshold)
	 * ---------------------------------------------------------------- */

	eote.process.logger("eote.process.encum", cmd);

	_.each(cmd, function (encum) {

		var diceArray = encum.match(/\((.*?)\|(.*?)\)/);

		if (diceArray && diceArray[1] && diceArray[2]) {

			var num1 = eote.process.math(diceArray[1]);
			var num2 = eote.process.math(diceArray[2]);
			var setbackDice = diceObj.count.setback;

			if (num2 > num1) {
				diceObj.count.setback = setbackDice + (num2 - num1);
				eote.process.logger("eote.process.encum.NewSetbackTotal", diceObj.count.setback + "blk");
			} else {
				eote.process.logger("eote.process.encum", "No New Setback");
			}
		}
	});

	return diceObj;

}

eote.process.skill = function (cmd, diceObj) {

	/* Skill
	 * default:
	 * Description: create the ability and proficiency dice for a skill check
	 * Command: !eed skill(char_value|skill_value)
	 * ---------------------------------------------------------------- */

	eote.process.logger("eote.process.skill", cmd);

	_.each(cmd, function (skill) {

		var diceArray = skill.match(/\((.*?)\|(.*?)\)/);

		if (diceArray && diceArray[1] && diceArray[2]) {

			var num1 = eote.process.math(diceArray[1]);
			var num2 = eote.process.math(diceArray[2]);
			var totalAbil = Math.abs(num1 - num2);
			var totalProf = (num1 < num2 ? num1 : num2);
			var abilityDice = diceObj.count.ability;
			var proficiencyDice = diceObj.count.proficiency;

			diceObj.count.ability = abilityDice + totalAbil;
			diceObj.count.proficiency = proficiencyDice + totalProf;

			eote.process.logger("eote.process.skill.abilityTotal", diceObj.count.ability + "g");
			eote.process.logger("eote.process.skill.proficiencyTotal", diceObj.count.proficiency + "y");
		}
	});

	return diceObj;

}

eote.process.opposed = function (cmd, diceObj) {
	/*Opposed
	 * default:
	 * Description: create the difficulty and challenge dice for an opposed skill check
	 * Command: !eed opposed(char_value|skill_value)
	 * ---------------------------------------------------------------- */

	eote.process.logger("eote.process.opposed", cmd);

	_.each(cmd, function (opposed) {

		var diceArray = opposed.match(/\((.*?)\|(.*?)\)/);

		if (diceArray && diceArray[1] && diceArray[2]) {
			var num1 = eote.process.math(diceArray[1]);
			var num2 = eote.process.math(diceArray[2]);
			var totalOppDiff = Math.abs(num1 - num2);
			var totalOppChal = (num1 < num2 ? num1 : num2);
			var opposeddifficultyDice = diceObj.count.difficulty;
			var opposedchallengeDice = diceObj.count.challenge;
			diceObj.count.difficulty = opposeddifficultyDice + totalOppDiff;
			diceObj.count.challenge = opposedchallengeDice + totalOppChal;
		}
	});

	return diceObj;
}

eote.process.setDice = function (cmd, diceObj) {

	/* setDice
	 * default:
	 * Description: Loop thru the dice and adds or subtracts them from the dice object
	 * Command: !eed g# y# b# blk# r# p# w# or g#+# or g#-#
	 * ---------------------------------------------------------------- */

	eote.process.logger("eote.process.setDice", cmd);

	_.each(cmd, function (dice) {

		var diceArray = dice.match(/(-?\d{1,2})(\w{1,3})/);

		if (diceArray && diceArray[1] && diceArray[2]) {

			var diceQty = eote.process.math(diceArray[1]);
			diceQty = (isNaN(diceQty) ? 0 : diceQty);

			var abilityDice = diceObj.count.ability;
			var proficiencyDice = diceObj.count.proficiency;
			var difficultyDice = diceObj.count.difficulty;
			var challengeDice = diceObj.count.challenge;
			var boostDice = diceObj.count.boost;
			var setbackDice = diceObj.count.setback;
			var forceDice = diceObj.count.force;
			var success = diceObj.count.success;
			var advantage = diceObj.count.advantage;
			var threat = diceObj.count.threat;
			var failure = diceObj.count.failure;

			switch (diceArray[2]) {
			case 'b':
				diceObj.count.boost = boostDice + diceQty;
				break;
			case 'g':
				diceObj.count.ability = abilityDice + diceQty;
				break;
			case 'y':
				diceObj.count.proficiency = proficiencyDice + diceQty;
				break;
			case 'blk':
				diceObj.count.setback = setbackDice + diceQty;
				break;
			case 'p':
				diceObj.count.difficulty = difficultyDice + diceQty;
				break;
			case 'r':
				diceObj.count.challenge = challengeDice + diceQty;
				break;
			case 'w':
				diceObj.count.force = forceDice + diceQty;
				break;
			case 's':
				diceObj.count.success = success + diceQty;
				break;
			case 'a':
				diceObj.count.advantage = advantage + diceQty;
				break;
			case 't':
				diceObj.count.threat = threat + diceQty;
				break;
			case 'f':
				diceObj.count.failure = failure + diceQty;
				break;
			}
		}
	});

	diceObj = eote.process.checkNegative(diceObj);

	eote.process.logger("eote.process.setDice.DiceToRoll", diceObj.count.boost + "b," + diceObj.count.ability + "g," + diceObj.count.proficiency + "y," + diceObj.count.setback + "blk," + diceObj.count.difficulty + "p," + diceObj.count.challenge + "r," + diceObj.count.force + "w," + diceObj.count.advantage + "a," + diceObj.count.threat + "t," + diceObj.count.failure + "f");

	return diceObj;
}

eote.process.checkNegative = function (diceObj) {
	if (diceObj.count.boost < 0) {
		eote.process.logger("eote.process.checkNegative.boost", "Setting count to 0 for being negative.")
		diceObj.count.boost = 0;
	}

	if (diceObj.count.ability < 0) {
		eote.process.logger("eote.process.checkNegative.ability", "Setting count to 0 for being negative.")
		diceObj.count.ability = 0;
	}

	if (diceObj.count.proficiency < 0) {
		eote.process.logger("eote.process.checkNegative.proficiency", "Setting count to 0 for being negative.")
		diceObj.count.proficiency = 0;
	}

	if (diceObj.count.setback < 0) {
		eote.process.logger("eote.process.checkNegative.setback", "Setting count to 0 for being negative.")
		diceObj.count.setback = 0;
	}

	if (diceObj.count.difficulty < 0) {
		eote.process.logger("eote.process.checkNegative.difficulty", "Setting count to 0 for being negative.")
		diceObj.count.difficulty = 0;
	}

	if (diceObj.count.challenge < 0) {
		eote.process.logger("eote.process.checkNegative.challenge", "Setting count to 0 for being negative.")
		diceObj.count.challenge = 0;
	}

	if (diceObj.count.force < 0) {
		eote.process.logger("eote.process.checkNegative.force", "Setting count to 0 for being negative.")
		diceObj.count.force = 0;
	}

	if (diceObj.count.success < 0) {
		eote.process.logger("eote.process.checkNegative.success", "Setting count to 0 for being negative.")
		diceObj.count.success = 0;
	}

	if (diceObj.count.advantage < 0) {
		eote.process.logger("eote.process.checkNegative.advantage", "Setting count to 0 for being negative.")
		diceObj.count.advantage = 0;
	}

	if (diceObj.count.threat < 0) {
		eote.process.logger("eote.process.checkNegative.threat", "Setting count to 0 for being negative.")
		diceObj.count.threat = 0;
	}

	if (diceObj.count.failure < 0) {
		eote.process.logger("eote.process.checkNegative.failure", "Setting count to 0 for being negative.")
		diceObj.count.failure = 0;
	}

	return diceObj;
}

eote.process.upgrade = function (cmd, diceObj) {

	/* Upgrade
	 * default:
	 * Description: upgrades ability and difficulty dice
	 * Command: !eed upgrade(ability|#) or upgrade(difficulty|#)
	 * ---------------------------------------------------------------- */

	eote.process.logger("eote.process.upgrade", cmd);

	_.each(cmd, function (dice) {

		var diceArray = dice.match(/\((.*?)\|(.*?)\)/);

		if (diceArray && diceArray[1] && diceArray[2]) {

			var type = diceArray[1];
			var upgradeVal = eote.process.math(diceArray[2]);
			var abilityDice = diceObj.count.ability;
			var proficiencyDice = diceObj.count.proficiency;
			var difficultyDice = diceObj.count.difficulty;
			var challengeDice = diceObj.count.challenge;

			switch (type) {
			case 'ability':

				var totalProf = (upgradeVal < abilityDice ? upgradeVal : abilityDice);
				var totalAbil = Math.abs(upgradeVal - abilityDice);

				if (upgradeVal > abilityDice) {
					totalProf = totalProf + Math.floor(totalAbil / 2);
					totalAbil = totalAbil % 2;
				}

				diceObj.count.ability = totalAbil;
				diceObj.count.proficiency = proficiencyDice + totalProf;

				eote.process.logger("eote.process.upgrade.abilityTotal", diceObj.count.ability + "g");
				eote.process.logger("eote.process.upgrade.proficiencyTotal", diceObj.count.proficiency + "y");

				break;
			case 'difficulty':

				var totalChall = (upgradeVal < difficultyDice ? upgradeVal : difficultyDice);
				var totalDiff = Math.abs(upgradeVal - difficultyDice);

				if (upgradeVal > difficultyDice) {
					totalChall = totalChall + Math.floor(totalDiff / 2);
					totalDiff = totalDiff % 2;
				}

				diceObj.count.difficulty = totalDiff;
				diceObj.count.challenge = challengeDice + totalChall;

				eote.process.logger("eote.process.upgrade.difficultyTotal", diceObj.count.difficulty + "p");
				eote.process.logger("eote.process.upgrade.challengeTotal", diceObj.count.challenge + "r");

				break;
			}
		}

	});

	return diceObj;
}

eote.process.downgrade = function (cmd, diceObj) {

	/* Downgrade
	 * default:
	 * Description: downgrades proficiency and challenge dice
	 * Command: !eed downgrade(proficiency|#) or downgrade(challenge|#)
	 * ---------------------------------------------------------------- */

	eote.process.logger("eote.process.downgrade", cmd);

	_.each(cmd, function (dice) {

		var diceArray = dice.match(/\((.*?)\|(.*?)\)/);

		if (diceArray && diceArray[1] && diceArray[2]) {

			var type = diceArray[1];
			var downgradeVal = eote.process.math(diceArray[2]);
			var abilityDice = diceObj.count.ability;
			var proficiencyDice = diceObj.count.proficiency;
			var difficultyDice = diceObj.count.difficulty;
			var challengeDice = diceObj.count.challenge;

			switch (type) {
			case 'proficiency':

				var profConvertedToAbil = proficiencyDice * 2;

				if (downgradeVal > (abilityDice + profConvertedToAbil)) {
					diceObj.count.ability = 0;
					diceObj.count.proficiency = 0;
				} else if (downgradeVal > profConvertedToAbil) {
					downgradeVal = Math.abs(downgradeVal - profConvertedToAbil);
					diceObj.count.ability = Math.abs(downgradeVal - abilityDice);
					diceObj.count.proficiency = 0;
				} else {
					diceObj.count.ability = abilityDice + (profConvertedToAbil - downgradeVal) % 2;
					diceObj.count.proficiency = Math.floor((profConvertedToAbil - downgradeVal) / 2);
				}

				break;
			case 'challenge':

				var challConvertedToDiff = challengeDice * 2;

				if (downgradeVal > (difficultyDice + challConvertedToDiff)) {
					diceObj.count.difficulty = 0;
					diceObj.count.challenge = 0;
				} else if (downgradeVal > challConvertedToDiff) {
					downgradeVal = Math.abs(downgradeVal - challConvertedToDiff);
					diceObj.count.difficulty = Math.abs(downgradeVal - difficultyDice);
					diceObj.count.challenge = 0;
				} else {
					diceObj.count.difficulty = difficultyDice + (challConvertedToDiff - downgradeVal) % 2;
					diceObj.count.challenge = Math.floor((challConvertedToDiff - downgradeVal) / 2);
				}

				break;
			}
		}
	});

	return diceObj;
}

eote.process.math = function (expr) {

	/* Math
	 * Returns: Number
	 * Description: Evaluates a mathematical expression (as a string) and return the result
	 * ---------------------------------------------------------------- */

	var chars = expr.split("");
	var n = [],
	op = [],
	index = 0,
	oplast = true;

	n[index] = "";

	// Parse the expression
	for (var c = 0; c < chars.length; c++) {

		if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
			op[index] = chars[c];
			index++;
			n[index] = "";
			oplast = true;
		} else {
			n[index] += chars[c];
			oplast = false;
		}
	}

	// Calculate the expression
	expr = parseFloat(n[0]);
	for (var o = 0; o < op.length; o++) {
		var num = parseFloat(n[o + 1]);
		switch (op[o]) {
		case "+":
			expr = expr + num;
			break;
		case "-":
			expr = expr - num;
			break;
		case "*":
			expr = expr * num;
			break;
		case "/":
			expr = expr / num;
			break;
		}
	}

	return expr;
}

eote.process.addDiceValues = function (diceTotalObj, diceResult) {

	diceTotalObj.success = diceTotalObj.success + diceResult.success;
	diceTotalObj.failure = diceTotalObj.failure + diceResult.failure;
	diceTotalObj.advantage = diceTotalObj.advantage + diceResult.advantage;
	diceTotalObj.threat = diceTotalObj.threat + diceResult.threat;
	diceTotalObj.triumph = diceTotalObj.triumph + diceResult.triumph;
	diceTotalObj.despair = diceTotalObj.despair + diceResult.despair;
	diceTotalObj.light = diceTotalObj.light + diceResult.light;
	diceTotalObj.dark = diceTotalObj.dark + diceResult.dark;

	return diceTotalObj;
}

eote.process.totalDiceValues = function (diceTotalObj) {

	var diceTS = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};

	var i = 0;

	i = diceTotalObj.success - diceTotalObj.failure;

	if (i >= 0) {
		diceTS.success = i;
	} else {
		diceTS.failure = Math.abs(i);
	}

	i = diceTotalObj.advantage - diceTotalObj.threat;

	if (i >= 0) {
		diceTS.advantage = i;
	} else {
		diceTS.threat = Math.abs(i);
	}

	diceTS.triumph = diceTotalObj.triumph;
	diceTS.despair = diceTotalObj.despair;
	diceTS.light = diceTotalObj.light;
	diceTS.dark = diceTotalObj.dark;

	return diceTS;
}

eote.process.rollDice = function (diceObj) {

	results = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0,
		diceGraphicsLog : '',
		diceTextLog : ''
	}

	eote.process.logger("eote.process.rollDice.FinalDiceToRoll", diceObj.count.boost + "b," + diceObj.count.ability + "g," + diceObj.count.proficiency + "y," + diceObj.count.setback + "blk," + diceObj.count.difficulty + "p," + diceObj.count.challenge + "r," + diceObj.count.force + "w," + diceObj.count.advantage + "a," + diceObj.count.threat + "t," + diceObj.count.failure + "f");

	//Blue "Boost" die (d6)
	if (diceObj.count.boost > 0) {
		results = eote.roll.boost(diceObj.count.boost);
		diceObj.graphicsLog.Boost = results.diceGraphicsLog;
		diceObj.textLog.Boost = results.diceTextLog;
		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
	}

	//Green "Ability" die (d8)
	if (diceObj.count.ability > 0) {
		results = eote.roll.ability(diceObj.count.ability);
		diceObj.graphicsLog.Ability = results.diceGraphicsLog;
		diceObj.textLog.Ability = results.diceTextLog;
		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
	}

	//Yellow "Proficiency" die (d12)
	if (diceObj.count.proficiency > 0) {
		results = eote.roll.proficiency(diceObj.count.proficiency);
		diceObj.graphicsLog.Proficiency = results.diceGraphicsLog;
		diceObj.textLog.Proficiency = results.diceTextLog;
		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
	}

	//Black "SetBack" die (d6)
	if (diceObj.count.setback > 0) {
		results = eote.roll.setback(diceObj.count.setback);
		diceObj.graphicsLog.SetBack = results.diceGraphicsLog;
		diceObj.textLog.SetBack = results.diceTextLog;
		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
	}

	//Purple "Difficulty" die (d8)
	if (diceObj.count.difficulty > 0) {
		results = eote.roll.difficulty(diceObj.count.difficulty);
		diceObj.graphicsLog.Difficulty = results.diceGraphicsLog;
		diceObj.textLog.Difficulty = results.diceTextLog;
		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
	}

	//Red "Challenge" die (d12)
	if (diceObj.count.challenge > 0) {
		results = eote.roll.challenge(diceObj.count.challenge);
		diceObj.graphicsLog.Challenge = results.diceGraphicsLog;
		diceObj.textLog.Challenge = results.diceTextLog;
		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
	}

	//White "Force" die (d12)
	if (diceObj.count.force > 0) {
		results = eote.roll.force(diceObj.count.force);
		diceObj.graphicsLog.Force = results.diceGraphicsLog;
		diceObj.textLog.Force = results.diceTextLog;
		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
	}

	// Free Successes (from skills)
	if (diceObj.count.success > 0) {
		results = eote.roll.success(diceObj.count.success);
		diceObj.graphicsLog.Success = results.diceGraphicsLog;
		diceObj.textLog.Success = results.diceTextLog;
		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
	}
	// Free Advantage (from skills)
	if (diceObj.count.advantage > 0) {
		results = eote.roll.advantage(diceObj.count.advantage);
		diceObj.graphicsLog.Advantage = results.diceGraphicsLog;
		diceObj.textLog.Advantage = results.diceTextLog;
		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
	}
	//Free Threat (from skills)
	if (diceObj.count.threat > 0) {
		results = eote.roll.threat(diceObj.count.threat);
		diceObj.graphicsLog.Threat = results.diceGraphicsLog;
		diceObj.textLog.Threat = results.diceTextLog;
		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
	}
	// Free Failure (from skills)
	if (diceObj.count.failure > 0) {
		results = eote.roll.failure(diceObj.count.failure);
		diceObj.graphicsLog.Failure = results.diceGraphicsLog;
		diceObj.textLog.Failure = results.diceTextLog;
		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
	}

	//finds the sum of each dice attribute
	diceObj.totals = eote.process.totalDiceValues(diceObj.totals);

	return diceObj;
}

eote.process.diceOutput = function (diceObj, playerName, playerID) {

	//log(diceObj);
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
	var chatGlobal = '';
	var diceGraphicsResults = "";
	var diceGraphicsRolled = "";
	var diceTextRolled = "";
	var diceTextResults = "";

	diceTextResults = "["

		if (diceObj.totals.success > 0) {
			diceTextResults = diceTextResults + " " + eote.translation.text[229][eote.translation.lang] + ":" + diceObj.totals.success;
			for (i = 1; i <= diceObj.totals.success; i++) {
				diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.S + s2 + "Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
			}
		}
		if (diceObj.totals.failure > 0) {
			diceTextResults = diceTextResults + " " + eote.translation.text[230][eote.translation.lang] + ":" + diceObj.totals.failure;
			for (i = 1; i <= diceObj.totals.failure; i++) {
				diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.F + s2 + "Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
			}
		}
		if (diceObj.totals.advantage > 0) {
			diceTextResults = diceTextResults + " " + eote.translation.text[231][eote.translation.lang] + ":" + diceObj.totals.advantage;
			for (i = 1; i <= diceObj.totals.advantage; i++) {
				diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.A + s2 + "Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
			}
		}
		if (diceObj.totals.threat > 0) {
			diceTextResults = diceTextResults + " " + eote.translation.text[232][eote.translation.lang] + ":" + diceObj.totals.threat;
			for (i = 1; i <= diceObj.totals.threat; i++) {
				diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.T + s2 + "Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
			}
		}
		if (diceObj.totals.triumph > 0) {
			diceTextResults = diceTextResults + " " + eote.translation.text[233][eote.translation.lang] + ":" + diceObj.totals.triumph;
			for (i = 1; i <= diceObj.totals.triumph; i++) {
				diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.TRIUMPH + s2 + "Triumph" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
			}
		}
		if (diceObj.totals.despair > 0) {
			diceTextResults = diceTextResults + " " + eote.translation.text[234][eote.translation.lang] + ":" + diceObj.totals.despair;
			for (i = 1; i <= diceObj.totals.despair; i++) {
				diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.DESPAIR + s2 + "Despair" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
			}
		}
		if (diceObj.totals.light > 0) {
			diceTextResults = diceTextResults + " " + eote.translation.text[235][eote.translation.lang] + ":" + diceObj.totals.light;

			for (i = 1; i <= diceObj.totals.light; i++) {
				diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.L + s2 + "Light" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
			}
		}
		if (diceObj.totals.dark > 0) {
			diceTextResults = diceTextResults + " " + eote.translation.text[236][eote.translation.lang] + ":" + diceObj.totals.dark;
			for (i = 1; i <= diceObj.totals.dark; i++) {
				diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.D + s2 + "Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
			}
		}

		diceTextResults = diceTextResults + "]";

	//------------------------------------>

	if (eote.defaults.globalVars.diceTestEnabled === true) {
		characterPlayer = 'TEST';
	} else if (diceObj.vars.characterName) {
		characterPlayer = diceObj.vars.characterName;
	} else {
		characterPlayer = playerName;
	}

	if (eote.defaults.globalVars.diceTestEnabled === true) {
		chatGlobal = "/direct <br>6b 8g 12y 6blk 8p 12r 12w <br>";
	} else if (diceObj.vars.label) {
		chatGlobal = "/direct &{template:base} {{title=" + diceObj.vars.label + "}} {{subtitle=" + characterPlayer + "}}";
	} else {
		chatGlobal = "/direct &{template:base} {{title=" + characterPlayer + "}}";
	}

	//------------------------------------>

	if (eote.defaults.globalVars.diceLogChat === true) {
		if (eote.defaults.globalVars.diceLogRolledOnOneLine === true) {

			diceGraphicsRolled = diceObj.graphicsLog.Boost + diceObj.graphicsLog.Ability + diceObj.graphicsLog.Proficiency + diceObj.graphicsLog.SetBack + diceObj.graphicsLog.Difficulty + diceObj.graphicsLog.Challenge + diceObj.graphicsLog.Force + diceObj.graphicsLog.Success + diceObj.graphicsLog.Advantage + diceObj.graphicsLog.Failure + diceObj.graphicsLog.Threat;

			if (diceObj.textLog.Boost != "")
				diceTextRolled = diceTextRolled + eote.translation.text[237][eote.translation.lang] + ":" + diceObj.textLog.Boost;
			if (diceObj.textLog.Ability != "")
				diceTextRolled = diceTextRolled + eote.translation.text[238][eote.translation.lang] + ":" + diceObj.textLog.Ability;
			if (diceObj.textLog.Proficiency != "")
				diceTextRolled = diceTextRolled + eote.translation.text[239][eote.translation.lang] + ":" + diceObj.textLog.Proficiency;
			if (diceObj.textLog.SetBack != "")
				diceTextRolled = diceTextRolled + eote.translation.text[240][eote.translation.lang] + ":" + diceObj.textLog.SetBack;
			if (diceObj.textLog.Difficulty != "")
				diceTextRolled = diceTextRolled + eote.translation.text[241][eote.translation.lang] + ":" + diceObj.textLog.Difficulty;
			if (diceObj.textLog.Challenge != "")
				diceTextRolled = diceTextRolled + eote.translation.text[242][eote.translation.lang] + ":" + diceObj.textLog.Challenge;
			if (diceObj.textLog.Force != "")
				diceTextRolled = diceTextRolled + eote.translation.text[243][eote.translation.lang] + ":" + diceObj.textLog.Force;
			if (diceObj.textLog.Success != "")
				diceTextRolled = diceTextRolled + eote.translation.text[244][eote.translation.lang] + ":" + diceObj.textLog.Success;
			if (diceObj.textLog.Advantage != "")
				diceTextRolled = diceTextRolled + eote.translation.text[245][eote.translation.lang] + ":" + diceObj.textLog.Advantage;
			if (diceObj.textLog.Failure != "")
				diceTextRolled = diceGraphicsRolled + eote.translation.text[246][eote.translation.lang] + ":" + diceObj.textLog.Failure;
			if (diceObj.textLog.Threat != "")
				diceTextRolled = diceGraphicsRolled + eote.translation.text[247][eote.translation.lang] + ":" + diceObj.textLog.Threat;

			if (eote.defaults.globalVars.diceGraphicsChat === true) {
				chatGlobal = chatGlobal + '{{' + eote.translation.text[249][eote.translation.lang] + '=' + diceGraphicsRolled + '}}';
			} else {
				sendChat("", diceTextRolled);
			}

		} else {

			if (eote.defaults.globalVars.diceGraphicsChat === true) {

				if (diceObj.vars.label) {
					//sendChat(characterPlayer, "/direct <br/><b>" + eote.translation.text[248][eote.translation.lang] + ":</b> " + diceObj.vars.label + '<br/>');
					sendChat(characterPlayer, "/direct " + diceObj.vars.label + '<br>');
				}

				if (diceObj.graphicsLog.Boost != "")
					sendChat("", "/direct " + diceObj.graphicsLog.Boost);
				if (diceObj.graphicsLog.Ability != "")
					sendChat("", "/direct " + diceObj.graphicsLog.Ability);
				if (diceObj.graphicsLog.Proficiency != "")
					sendChat("", "/direct " + diceObj.graphicsLog.Proficiency);
				if (diceObj.graphicsLog.SetBack != "")
					sendChat("", "/direct " + diceObj.graphicsLog.SetBack);
				if (diceObj.graphicsLog.Difficulty != "")
					sendChat("", "/direct " + diceObj.graphicsLog.Difficulty);
				if (diceObj.graphicsLog.Challenge != "")
					sendChat("", "/direct " + diceObj.graphicsLog.Challenge);
				if (diceObj.graphicsLog.Force != "")
					sendChat("", "/direct " + diceObj.graphicsLog.Force);
				if (diceObj.graphicsLog.Success != "")
					sendChat("", "/direct " + diceObj.graphicsLog.Success);
				if (diceObj.graphicsLog.Advantage != "")
					sendChat("", "/direct " + diceObj.graphicsLog.Advantage);
				if (diceObj.graphicsLog.Failure != "")
					sendChat("", "/direct " + diceObj.graphicsLog.Failure);
				if (diceObj.graphicsLog.Threat != "")
					sendChat("", "/direct " + diceObj.graphicsLog.Threat);
			} else {

				if (diceObj.vars.label) {
					//sendChat(characterPlayer, "/direct <br/><b>" + eote.translation.text[248][eote.translation.lang] + ":</b> " + diceObj.vars.label + '<br/>');
					sendChat(characterPlayer, "/direct " + diceObj.vars.label + '<br>');
				}

				if (diceObj.textLog.Boost != "")
					sendChat("", eote.translation.text[237][eote.translation.lang] + ":" + diceObj.textLog.Boost);
				if (diceObj.textLog.Ability != "")
					sendChat("", eote.translation.text[238][eote.translation.lang] + ":" + diceObj.textLog.Ability);
				if (diceObj.textLog.Proficiency != "")
					sendChat("", eote.translation.text[239][eote.translation.lang] + ":" + diceObj.textLog.Proficiency);
				if (diceObj.textLog.SetBack != "")
					sendChat("", eote.translation.text[240][eote.translation.lang] + ":" + diceObj.textLog.SetBack);
				if (diceObj.textLog.Difficulty != "")
					sendChat("", eote.translation.text[241][eote.translation.lang] + ":" + diceObj.textLog.Difficulty);
				if (diceObj.textLog.Challenge != "")
					sendChat("", eote.translation.text[242][eote.translation.lang] + ":" + diceObj.textLog.Challenge);
				if (diceObj.textLog.Force != "")
					sendChat("", eote.translation.text[243][eote.translation.lang] + ":" + diceObj.textLog.Force);
				if (diceObj.textLog.Success != "")
					sendChat("", eote.translation.text[244][eote.translation.lang] + ":" + diceObj.textLog.Success);
				if (diceObj.textLog.Advantage != "")
					sendChat("", eote.translation.text[245][eote.translation.lang] + ":" + diceObj.textLog.Advantage);
				if (diceObj.textLog.Failure != "")
					sendChat("", eote.translation.text[246][eote.translation.lang] + ":" + diceObj.textLog.Failure);
				if (diceObj.textLog.Threat != "")
					sendChat("", eote.translation.text[247][eote.translation.lang] + ":" + diceObj.textLog.Threat);

			}
		}
	}

	if (eote.defaults.globalVars.diceGraphicsChat === true) {

		chatGlobal = chatGlobal + '{{' + eote.translation.text[266][eote.translation.lang] + '=' + diceGraphicsResults + '}}';

		//chatGlobal = chatGlobal + '<br/>' + eote.translation.text[249][eote.translation.lang] + ':' + diceGraphicsResults;

		if (diceObj.totals.success > 0 && diceObj.vars.weaponDamage && diceObj.vars.weaponCritical) {

			var damage = parseInt(diceObj.totals.success) + parseInt(diceObj.totals.triumph) + parseInt(diceObj.vars.weaponDamage);

			//chatGlobal = chatGlobal + '<br/><b>' + eote.translation.text[264][eote.translation.lang] + '</b>'+ damage;
			chatGlobal = chatGlobal + '{{' + eote.translation.text[264][eote.translation.lang] + '=' + damage + '}}';

			if (diceObj.totals.advantage >= diceObj.vars.weaponCritical) {
				//chatGlobal = chatGlobal + '<br/><b>' + eote.translation.text[265][eote.translation.lang] + '</b>';
				chatGlobal = chatGlobal + '{{' + eote.translation.text[265][eote.translation.lang] + '=<span style="text-align:center; font-weight:bold; color:darkred;">' + eote.translation.text[267][eote.translation.lang] + '</span>}}';
			}
		}

		sendChat(characterPlayer, chatGlobal);

	} else {
		sendChat(eote.translation.text[249][eote.translation.lang], diceTextResults);
	}

	eote.process.logger("eote.process.rollResult", diceTextResults);
	//All DONE!!!
}

//---------------------->

eote.roll = {

	boost : function (diceQty) {
		//Blue "Boost" die (d6)
		//1 Blank
		//2 Blank
		//3 Success
		//4 Advantage
		//5 Advantage + Advantage
		//6 Success + Advantage
		var roll = 0;
		var diceResult = {
			success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : "",
			diceTextLog : ""
		};
		var i = 0;
		var s1 = '<img src="';
		var s2 = '" title="';
		var s3 = '" height="';
		var s4 = '" width="';
		var s5 = '"/>';

		if (eote.defaults.globalVars.diceTestEnabled === true) {
			diceQty = 6;
		}

		for (i = 1; i <= diceQty; i++) {
			if (eote.defaults.globalVars.diceTestEnabled === true) {
				roll = roll + 1;
			} else {
				roll = randomInteger(6);
			}

			switch (roll) {
			case 1:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[250][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.BLANK + s2 + "Boost Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				break;
			case 2:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[250][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.BLANK + s2 + "Boost Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				break;
			case 3:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[229][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.S + s2 + "Boost Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				break;
			case 4:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[251][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.A + s2 + "Boost Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.advantage = diceResult.advantage + 1;
				break;
			case 5:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[252][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.AA + s2 + "Boost Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.advantage = diceResult.advantage + 2;
				break;
			case 6:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[253][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.SA + s2 + "Boost Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				diceResult.advantage = diceResult.advantage + 1;
				break;
			}
		}

		return diceResult;
	},

	ability : function (diceQty) {
		//Green "Ability" die (d8)
		//1 Blank
		//2 Success
		//3 Success
		//4 Advantage
		//5 Advantage
		//6 Success + Advantage
		//7 Advantage + Advantage
		//8 Success + Success
		var roll = 0;
		var diceTextLog = "";
		var diceGraphicsLog = "";
		var diceResult = {
			success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : "",
			diceTextLog : ""
		};
		var i = 0;
		var s1 = '<img src="';
		var s2 = '" title="';
		var s3 = '" height="';
		var s4 = '" width="';
		var s5 = '"/>';

		if (eote.defaults.globalVars.diceTestEnabled === true) {
			diceQty = 8;
		}

		for (i = 1; i <= diceQty; i++) {
			if (eote.defaults.globalVars.diceTestEnabled === true) {
				roll = roll + 1;
			} else {
				roll = randomInteger(8);
			}

			switch (roll) {
			case 1:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[250][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.BLANK + s2 + "Ability Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				break;
			case 2:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[229][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.S + s2 + "Ability Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				break;
			case 3:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[229][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.S + s2 + "Ability Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				break;
			case 4:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[251][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.A + s2 + "Ability Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.advantage = diceResult.advantage + 1;
				break;
			case 5:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[251][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.A + s2 + "Ability Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.advantage = diceResult.advantage + 1;
				break;
			case 6:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[253][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.SA + s2 + "Ability Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				diceResult.advantage = diceResult.advantage + 1;
				break;
			case 7:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[253][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.AA + s2 + "Ability Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.advantage = diceResult.advantage + 2;
				break;
			case 8:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[254][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.SS + s2 + "Ability Success x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 2;
				break;
			}
		}
		return diceResult;
	},

	proficiency : function (diceQty) {
		//Yellow "Proficiency" die (d12)
		//1 Blank
		//2 Triumph
		//3 Success
		//4 Success
		//5 Advantage
		//6 Success + Advantage
		//7 Success + Advantage
		//8 Success + Advantage
		//9 Success + Success
		//10 Success + Success
		//11 Advantage + Advantage
		//12 Advantage + Advantage
		var roll = 0;
		var diceTextLog = "";
		var diceGraphicsLog = "";
		var diceResult = {
			success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : "",
			diceTextLog : ""
		};
		var i = 0;
		var s1 = '<img src="';
		var s2 = '" title="';
		var s3 = '" height="';
		var s4 = '" width="';
		var s5 = '"/>';

		if (eote.defaults.globalVars.diceTestEnabled === true) {
			diceQty = 12;
		}

		for (i = 1; i <= diceQty; i++) {
			if (eote.defaults.globalVars.diceTestEnabled === true) {
				roll = roll + 1;
			} else {
				roll = randomInteger(12);
			}

			switch (roll) {
			case 1:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[250][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.BLANK + s2 + "Proficiency Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				break;
			case 2:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[255][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.TRIUMPH + s2 + "Proficiency Triumph(+Success)" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.triumph = diceResult.triumph + 1;
				diceResult.success = diceResult.success + 1;
				break;
			case 3:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[229][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.S + s2 + "Proficiency Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				break;
			case 4:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[229][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.S + s2 + "Proficiency Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				break;
			case 5:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[251][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.A + s2 + "Proficiency Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.advantage = diceResult.advantage + 1;
				break;
			case 6:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[253][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				diceResult.advantage = diceResult.advantage + 1;
				break;
			case 7:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[253][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				diceResult.advantage = diceResult.advantage + 1;
				break;
			case 8:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[253][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				diceResult.advantage = diceResult.advantage + 1;
				break;
			case 9:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[254][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SS + s2 + "Proficiency Success x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 2;
				break;
			case 10:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[254][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SS + s2 + "Proficiency Success x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 2;
				break;
			case 11:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[252][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.AA + s2 + "Proficiency Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.advantage = diceResult.advantage + 2;
				break;
			case 12:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[252][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.AA + s2 + "Proficiency Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.advantage = diceResult.advantage + 2;
				break;
			}
		}
		return diceResult;
	},

	setback : function (diceQty) {
		//Black "Setback" die (d6)
		//1 Blank
		//2 Blank
		//3 Failure
		//4 Failure
		//5 Threat
		//6 Threat
		var roll = 0;
		var diceTextLog = "";
		var diceGraphicsLog = "";
		var diceResult = {
			success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : "",
			diceTextLog : ""
		};
		var i = 0;
		var s1 = '<img src="';
		var s2 = '" title="';
		var s3 = '" height="';
		var s4 = '" width="';
		var s5 = '"/>';

		if (eote.defaults.globalVars.diceTestEnabled === true) {
			diceQty = 6;
		}

		for (i = 1; i <= diceQty; i++) {
			if (eote.defaults.globalVars.diceTestEnabled === true) {
				roll = roll + 1;
			} else {
				roll = randomInteger(6);
			}

			switch (roll) {
			case 1:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[250][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.BLANK + s2 + "Setback Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				break;
			case 2:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[250][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.BLANK + s2 + "Setback Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				break;
			case 3:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[256][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.F + s2 + "Setback Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.failure = diceResult.failure + 1;
				break;
			case 4:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[256][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.F + s2 + "Setback Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.failure = diceResult.failure + 1;
				break;
			case 5:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[257][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.T + s2 + "Setback Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.threat = diceResult.threat + 1;
				break;
			case 6:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[257][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.T + s2 + "Setback Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.threat = diceResult.threat + 1;
				break;
			}
		}
		return diceResult;
	},

	difficulty : function (diceQty) {
		//Purple "Difficulty" die (d8)
		//1 Blank
		//2 Failure
		//3 Threat
		//4 Threat
		//5 Threat
		//6 Failure + Failure
		//7 Failure + Threat
		//8 Threat + Threat
		var roll = 0;
		var diceTextLog = "";
		var diceGraphicsLog = "";
		var diceResult = {
			success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : "",
			diceTextLog : ""
		};
		var i = 0;
		var s1 = '<img src="';
		var s2 = '" title="';
		var s3 = '" height="';
		var s4 = '" width="';
		var s5 = '"/>';

		if (eote.defaults.globalVars.diceTestEnabled === true) {
			diceQty = 8;
		}

		for (i = 1; i <= diceQty; i++) {
			if (eote.defaults.globalVars.diceTestEnabled === true) {
				roll = roll + 1;
			} else {
				roll = randomInteger(8);
			}

			switch (roll) {
			case 1:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[250][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.BLANK + s2 + "Difficulty Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				break;
			case 2:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[256][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.F + s2 + "Difficulty Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.failure = diceResult.failure + 1;
				break;
			case 3:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[257][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.threat = diceResult.threat + 1;
				break;
			case 4:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[257][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.threat = diceResult.threat + 1;
				break;
			case 5:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[257][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.threat = diceResult.threat + 1;
				break;
			case 6:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[258][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.FF + s2 + "Difficulty Failure x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.failure = diceResult.failure + 2;
				break;
			case 7:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[259][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.FT + s2 + "Difficulty Failure + Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.failure = diceResult.failure + 1;
				diceResult.threat = diceResult.threat + 1;
				break;
			case 8:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[260][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.TT + s2 + "Difficulty Threat x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.threat = diceResult.threat + 2;
				break;
			}
		}
		return diceResult;
	},

	challenge : function (diceQty) {
		//Red "Challenge" die (d12)
		//1 Blank
		//2 Despair
		//3 Failure
		//4 Failure
		//5 Threat
		//6 Threat
		//7 Failure + Failure
		//8 Failure + Failure
		//9 Threat + Threat
		//10 Threat + Threat
		//11 Failure + Threat
		//12 Failure + Threat
		var roll = 0;
		var diceTextLog = "";
		var diceGraphicsLog = "";
		var diceResult = {
			success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : "",
			diceTextLog : ""
		};
		var i = 0;
		var s1 = '<img src="';
		var s2 = '" title="';
		var s3 = '" height="';
		var s4 = '" width="';
		var s5 = '"/>';

		if (eote.defaults.globalVars.diceTestEnabled === true) {
			diceQty = 12;
		}

		for (i = 1; i <= diceQty; i++) {
			if (eote.defaults.globalVars.diceTestEnabled === true) {
				roll = roll + 1;
			} else {
				roll = randomInteger(12);
			}

			switch (roll) {
			case 1:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[250][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.BLANK + s2 + "Challenge Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				break;
			case 2:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[261][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.DESPAIR + s2 + "Challenge Despair" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.despair = diceResult.despair + 1;
				diceResult.failure = diceResult.failure + 1;
				break;
			case 3:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[256][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.F + s2 + "Challenge Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.failure = diceResult.failure + 1;
				break;
			case 4:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[256][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.F + s2 + "Challenge Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.failure = diceResult.failure + 1;
				break;
			case 5:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[257][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.T + s2 + "Challenge Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.threat = diceResult.threat + 1;
				break;
			case 6:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[257][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.T + s2 + "Challenge Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.threat = diceResult.threat + 1;
				break;
			case 7:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[258][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FF + s2 + "Challenge Failure x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.failure = diceResult.failure + 2;
				break;
			case 8:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[258][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FF + s2 + "Challenge Failure x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.failure = diceResult.failure + 2;
				break;
			case 9:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[260][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.TT + s2 + "Challenge Threat x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.threat = diceResult.threat + 2;
				break;
			case 10:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[260][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.TT + s2 + "Challenge Threat x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.threat = diceResult.threat + 2;
				break;
			case 11:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[259][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FT + s2 + "Challenge Failure + Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.failure = diceResult.failure + 1;
				diceResult.threat = diceResult.threat + 1;
				break;
			case 12:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[259][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FT + s2 + "Challenge Failure + Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.failure = diceResult.failure + 1;
				diceResult.threat = diceResult.threat + 1;
				break;
			}
		}
		return diceResult;
	},

	force : function (diceQty) {
		//White "Force" die (d12)
		//1 Light
		//2 Light
		//3 Light + Light
		//4 Light + Light
		//5 Light + Light
		//6 Dark
		//7 Dark
		//8 Dark
		//9 Dark
		//10 Dark
		//11 Dark
		//12 Dark + Dark
		var roll = 0;
		var diceTextLog = "";
		var diceGraphicsLog = "";
		var diceResult = {
			success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : "",
			diceTextLog : ""
		};
		var i = 0;
		var s1 = '<img src="';
		var s2 = '" title="';
		var s3 = '" height="';
		var s4 = '" width="';
		var s5 = '"/>';

		if (eote.defaults.globalVars.diceTestEnabled === true) {
			diceQty = 12;
		}

		for (i = 1; i <= diceQty; i++) {
			if (eote.defaults.globalVars.diceTestEnabled === true) {
				roll = roll + 1;
			} else {
				roll = randomInteger(12);
			}

			switch (roll) {
			case 1:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[235][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.L + s2 + "Force Light" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.light = diceResult.light + 1;
				break;
			case 2:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[235][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.L + s2 + "Force Light" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.light = diceResult.light + 1;
				break;
			case 3:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[262][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.LL + s2 + "Force Light x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.light = diceResult.light + 2;
				break;
			case 4:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[262][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.LL + s2 + "Force Light x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.light = diceResult.light + 2;
				break;
			case 5:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[262][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.LL + s2 + "Force Light x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.light = diceResult.light + 2;
				break;
			case 6:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[236][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.dark = diceResult.dark + 1;
				break;
			case 7:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[236][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.dark = diceResult.dark + 1;
				break;
			case 8:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[236][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.dark = diceResult.dark + 1;
				break;
			case 9:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[236][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.dark = diceResult.dark + 1;
				break;
			case 10:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[236][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.dark = diceResult.dark + 1;
				break;
			case 11:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[236][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.dark = diceResult.dark + 1;
				break;
			case 12:
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + eote.translation.text[263][eote.translation.lang] + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.DD + s2 + "Force Dark x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
				diceResult.dark = diceResult.dark + 2;
				break;
			}
		}
		return diceResult;
	},

	success : function (diceQty) {
		//Free Success
		var i = 0;
		var s1 = '<img src="';
		var s2 = '" title="';
		var s3 = '" height="';
		var s4 = '" width="';
		var s5 = '"/>';

		var roll = 0;
		var diceTextLog = "";
		var diceGraphicsLog = "";

		var diceResult = {
			success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : "",
			diceTextLog : ""
		};

		diceResult.diceTextLog = diceTextLog + "(" + eote.translation.text[229][eote.translation.lang] + " x" + diceQty + ")";
		diceResult.success = diceResult.success + diceQty;
		for (i = 0; i < diceQty; i++) {
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.S + s2 + eote.translation.text[229][eote.translation.lang] + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
		}

		return diceResult;
	},

	advantage : function (diceQty) {
		//Free Advantage
		var i = 0;
		var s1 = '<img src="';
		var s2 = '" title="';
		var s3 = '" height="';
		var s4 = '" width="';
		var s5 = '"/>';

		var roll = 0;
		var diceTextLog = "";
		var diceGraphicsLog = "";

		var diceResult = {
			success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : "",
			diceTextLog : ""
		};

		diceResult.diceTextLog = diceTextLog + "(" + eote.translation.text[251][eote.translation.lang] + " x" + diceQty + ")";
		diceResult.advantage = diceResult.advantage + diceQty;
		for (i = 0; i < diceQty; i++) {
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.A + s2 + eote.translation.text[251][eote.translation.lang] + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
		}

		return diceResult;
	},

	threat : function (diceQty) {
		//Free threat
		var i = 0;
		var s1 = '<img src="';
		var s2 = '" title="';
		var s3 = '" height="';
		var s4 = '" width="';
		var s5 = '"/>';

		var roll = 0;
		var diceTextLog = "";
		var diceGraphicsLog = "";

		var diceResult = {
			success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : "",
			diceTextLog : ""
		};

		diceResult.diceTextLog = diceTextLog + "(" + eote.translation.text[257][eote.translation.lang] + " x" + diceQty + ")";
		diceResult.threat = diceResult.threat + diceQty;
		for (i = 0; i < diceQty; i++) {
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.T + s2 + eote.translation.text[257][eote.translation.lang] + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
		}

		return diceResult;
	},

	failure : function (diceQty) {
		//Free Faliure
		var i = 0;
		var s1 = '<img src="';
		var s2 = '" title="';
		var s3 = '" height="';
		var s4 = '" width="';
		var s5 = '"/>';

		var roll = 0;
		var diceTextLog = "";
		var diceGraphicsLog = "";

		var diceResult = {
			success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : "",
			diceTextLog : ""
		};

		diceResult.diceTextLog = diceTextLog + "(" + eote.translation.text[256][eote.translation.lang] + " x" + diceQty + ")";
		diceResult.failure = diceResult.failure + diceQty;
		for (i = 0; i < diceQty; i++) {
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.F + s2 + eote.translation.text[256][eote.translation.lang] + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
		}

		return diceResult;
	}
}

eote.events = function () {

	//event listner Add character defaults to new characters
	on("add:character", function (characterObj) {
		eote.setCharacterDefaults(characterObj);
	});

	on("chat:message", function (msg) {

		if (msg.type != 'api') {
			return;
		}

		eote.process.setup(msg.content, msg.who, msg.playerid);
	});

}

on('ready', function () {
	eote.init();
	//eote.process.setup('!eed characterID(-JTu_xSU9-LVHyjcs7qx) crit(roll)', 'Steve', 'playerID');
});