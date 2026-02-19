/* utilities_dsa start */
/*
	Generate Simple Roll Tag from Date.now()

In order to quickly see that a reaction/confirmation roll belongs to the correct original roll, we use roll tags.
(Originally, these should get called 'roll IDs', but this term is already used internally in custom roll parsing.)
These are not the Roll20 ones, but actually Date.now()'s output in a condensed form.

Since we need the actual Date.now() as well, this function just assumes to receive an integer >= 0.

The number is converted to a representation using a custom character set. Unfortunately, at least the upload of HTML files in the Custom Character Sheet does not work if literal emoji are present anywhere in the source. Therefore, all emoji had to be encoded with their hexadecimal code as HTML entities.
The reversal puts the most frequently changing characters at the front, so it's easier for people to find the corresponding rolls.
*/
function generateShortRollTag (integer) {
	const caller = "generateShortRollTag";
	const charset = [
		// grinning face with smiling eyes, face with tears of joy, melting face, winking face, face blowing a kiss
		"&#x1f604;", "&#x1f602;", "&#x1fae0;", "&#x1f609;", "&#x1f618;",
		// upside-down face, smiling face with halo, smiling face with hearts, kissing face, face savoring food
		"&#x1f643;", "&#x1f607;", "&#x1f970;", "&#x1f617;", "&#x1f60b;",
		// money-mouth face, face with hand over mouth, shushing face, thinking face, zipper-mouth face
		"&#x1f911;", "&#x1f92d;", "&#x1f92b;", "&#x1f914;", "&#x1f910;",
		// face with raised eyebrow, expressionless face, face without mouth, smirking face, unamused face
		"&#x1f928;", "&#x1f611;", "&#x1f636;", "&#x1f60f;", "&#x1f612;",
		// face with rolling eyes, grimacing face, sleepy face, drooling face, sleeping face
		"&#x1f644;", "&#x1f62c;", "&#x1f62a;", "&#x1f924;", "&#x1f634;",
		// face with medical mask, face with thermometer, face with head-bandage, nauseated face, face vomiting
		"&#x1f637;", "&#x1f912;", "&#x1f915;", "&#x1f922;", "&#x1f92e;",
		// sneezing face, hot face, cold face, face with crossed-out eyes, exploding head
		"&#x1f927;", "&#x1f975;", "&#x1f976;", "&#x1f635;", "&#x1f92f;",
		// cowboy hat face, partying face, disguised face, smiling face with sunglasses, nerd face
		"&#x1f920;", "&#x1f973;", "&#x1f978;", "&#x1f60e;", "&#x1f913;",
		// face with monocle, confused face, face with open mouth, astonished face, pleading face
		"&#x1f9d0;", "&#x1f615;", "&#x1f62e;", "&#x1f632;", "&#x1f97a;",
		// face holding back tears, fearful face, loudly crying face, face screaming in fear, confounded face
		"&#x1f979;", "&#x1f628;", "&#x1f62d;", "&#x1f631;", "&#x1f616;",
		// yawning face, enraged face, face with symbols on mouth, smiling face with horns, skull
		"&#x1f971;", "&#x1f621;", "&#x1f92c;", "&#x1f608;", "&#x1f480;",
		// hear-no-evil monkey, pile of poo, clown face, ogre, ghost
		"&#x1f649;", "&#x1f4a9;", "&#x1f921;", "&#x1f479;", "&#x1f47b;",
		// alien, alien monster, robot, grinning cat with smiling eyes, see-no-evil monkey
		"&#x1f47d;", "&#x1f47e;", "&#x1f916;", "&#x1f638;", "&#x1f648;",
		// white heart, broken heart, collision, sweat droplets, ZZZ
		"&#x1f90d;", "&#x1f494;", "&#x1f4a5;", "&#x1f4a6;", "&#x1f4a4;",
		// hand with fingers splayed, OK hand, eye, dog face, fox
		"&#x1f91a;", "&#x1f44c;", "&#x1f441;", "&#x1f436;", "&#x1f98a;",
		// raccoon, lion, tiger, horse face, unicorn
		"&#x1f99d;", "&#x1f981;", "&#x1f42f;", "&#x1f434;", "&#x1f984;",
		// zebra, deer, bison, cow face, ox
		"&#x1f993;", "&#x1f98c;", "&#x1f9ac;", "&#x1f42e;", "&#x1f402;",
		// pig face, boar, pig nose, ewe, goat
		"&#x1f437;", "&#x1f417;", "&#x1f43d;", "&#x1f411;", "&#x1f410;",
		// camel, llama, giraffe, elephant, mouse face
		"&#x1f42a;", "&#x1f999;", "&#x1f992;", "&#x1f418;", "&#x1f42d;",
		// rat, hamster, rabbit face, hippopotamus, hedgehog
		"&#x1f400;", "&#x1f439;", "&#x1f430;", "&#x1f99b;", "&#x1f994;",
		// 100 characters
		// bat, bear, koala, panda, sloth
		"&#x1f987;", "&#x1f43b;", "&#x1f428;", "&#x1f43c;", "&#x1f9a5;",
		// otter, skunk, kangaroo, badger, paw prints
		"&#x1f9a6;", "&#x1f9a8;", "&#x1f998;", "&#x1f9a1;", "&#x1f43e;",
		// turkey, chicken, hatching chick, baby chick, bird
		"&#x1f983;", "&#x1f414;", "&#x1f423;", "&#x1f424;", "&#x1f426;",
		// penguin, dove, eagle, duck, swan
		"&#x1f427;", "&#x1f54a;", "&#x1f985;", "&#x1f986;", "&#x1f9a2;",
		// owl, dodo, feather, flamingo, peacock
		"&#x1f989;", "&#x1f9a4;", "&#x1fab6;", "&#x1f9a9;", "&#x1f99a;",
		// parrot, frog, crocodile, turtle, lizard
		"&#x1f99c;", "&#x1f438;", "&#x1f40a;", "&#x1f422;", "&#x1f98e;",
		// snake, dragon face, sauropod, T-Rex, spouting whale
		"&#x1f40d;", "&#x1f432;", "&#x1f995;", "&#x1f996;", "&#x1f433;",
		// dolphin, seal, fish, tropical fish, blowfish
		"&#x1f42c;", "&#x1f9ad;", "&#x1f41f;", "&#x1f420;", "&#x1f421;",
		// shark, octopus, spiral shell, coral, snail
		"&#x1f988;", "&#x1f419;", "&#x1f41a;", "&#x1fab8;", "&#x1f40c;",
		// buttefly, bug, ant, honeybee, beetle
		"&#x1f98b;", "&#x1f41b;", "&#x1f41c;", "&#x1f41d;", "&#x1fab2;",
		// lady beetle, cricket, cockroach, spider, spider web
		"&#x1f41e;", "&#x1f997;", "&#x1fab3;", "&#x1f577;", "&#x1f578;",
		// scorpion, mosquito, fly, worm, microbe
		"&#x1f982;", "&#x1f99f;", "&#x1fab0;", "&#x1fab1;", "&#x1f9a0;",
		// bouquet, cherry blossom, lotus, rosette, rose
		"&#x1f490;", "&#x1f338;", "&#x1fab7;", "&#x1f3f5;", "&#x1f339;",
		// sunflower, seedling, potted plant, evergreen tree, deciduous tree
		"&#x1f33b;", "&#x1f331;", "&#x1fab4;", "&#x1f332;", "&#x1f333;",
		// palm tree, cactus, sheat of rice, herb, four leaf clover
		"&#x1f334;", "&#x1f335;", "&#x1f33e;", "&#x1f33f;", "&#x1f340;",
		// maple leaf, leaf fluttering in wind, nest with eggs, mushroom, grapes
		"&#x1f341;", "&#x1f343;", "&#x1faba;", "&#x1f344;", "&#x1f347;",
		// melon, watermelon, tangerine, lemon, banana
		"&#x1f348;", "&#x1f349;", "&#x1f34a;", "&#x1f34b;", "&#x1f34c;",
		// pineapple, mango, red apple, pear, peach
		"&#x1f34d;", "&#x1f96d;", "&#x1f34e;", "&#x1f350;", "&#x1f351;",
		// cherries, strawberry, blueberries, kiwi fruit, tomato
		"&#x1f352;", "&#x1f353;", "&#x1fad0;", "&#x1f95d;", "&#x1f345;",
		// coconut, avocado, eggplant, potato, carrot
		"&#x1f965;", "&#x1f951;", "&#x1f346;", "&#x1f954;", "&#x1f955;",
		// 200
		// ear of corn, hot pepper, bell pepper, cucumber, leafy green
		"&#x1f33d;", "&#x1f336;", "&#x1fad1;", "&#x1f952;", "&#x1f96c;",
		// broccoli, onion, peanuts, beans, chestnut
		"&#x1f966;", "&#x1f9c5;", "&#x1f95c;", "&#x1fad8;", "&#x1f330;",
		// bread, croissant, baguette bread, flatbread, pretzel
		"&#x1f35e;", "&#x1f950;", "&#x1f956;", "&#x1fad3;", "&#x1f968;",
		// bagel, pancackes, waffle, cheese wedge, meat on bone
		"&#x1f96f;", "&#x1f95e;", "&#x1f9c7;", "&#x1f9c0;", "&#x1f356;",
		// poultry leg, cut of meat, bacon, hamburger, french fries
		"&#x1f357;", "&#x1f969;", "&#x1f953;", "&#x1f354;", "&#x1f35f;",
		// pizza, hot dog, sandwich, taco, burrito
		"&#x1f355;", "&#x1f32d;", "&#x1f96a;", "&#x1f32e;", "&#x1f32f;",
		// stuffed flatbread, falafel, egg, cooking, pot of food
		"&#x1f959;", "&#x1f9c6;", "&#x1f95a;", "&#x1f373;", "&#x1f372;",
		// bowl with spoon, green salad, popcorn, butter, salt
		"&#x1f963;", "&#x1f957;", "&#x1f37f;", "&#x1f9c8;", "&#x1f9c2;",
		// bento box, rice ball, curry rice, steaming bowl, spaghetti
		"&#x1f371;", "&#x1f359;", "&#x1f35b;", "&#x1f35c;", "&#x1f35d;",
		// oden, sushi, fried shrimp, moon cake, dango
		"&#x1f362;", "&#x1f363;", "&#x1f364;", "&#x1f96e;", "&#x1f361;",
		// dumpling, fortune cookie, takeout box, crab, squid
		"&#x1f95f;", "&#x1f960;", "&#x1f961;", "&#x1f980;", "&#x1f991;",
		// oyster
		"&#x1f9aa;"
		// 256
	];
	const base = charset.length;

	// Input sanitation
	if (typeof(integer) !== "number") {
		debugLog(caller, "Input type not number, using default value '0'.");
		integer = 0;
	}

	if (parseInt(integer.toFixed(0)) < 0) {
		debugLog(caller, "Input negative, using default value '0'.");
		integer = 0;
	}

	// Drop decimals
	integer = parseInt(integer.toFixed(0));

	// Conversion to base charset
	function getBaseLog(base, number) {
		return Math.log(number) / Math.log(base);
	}
	// Get digits of new number
	const digits = Math.floor(getBaseLog(base, integer));
	var result = [];
	var rest = integer;

	for (let n = digits; n >= 0; n--) {
		result.push(charset[Math.trunc(rest/Math.pow(base, n))]);
		rest = rest % Math.pow(base, n);
	}
	// Reverse
	result = result.reverse().join('');

	return result;
}

/*
	General Sanity Check Function
*/
function DSAsane (value, type) {
	var func = "DSAsane";
	var sane = true;

	function limitedIntValid(value, minimum, maximum) {
		if (isNaN(value)
		|| isNaN(parseInt(value))
		|| parseInt(value) < minimum
		|| parseInt(value) > maximum) {
			return false;
		} else {
			return true;
		}
	}

	switch(type) {
		case "int":
			// General
			// Must be number of parseInt()-able number
			// integer
			if (!limitedIntValid(value, -Infinity, Infinity)) {
				debugLog(func, "Value '" + value + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		case "non-negative int":
			// General
			// Must be number of parseInt()-able number
			// Non-negative integer
			if (!limitedIntValid(value, 0, Infinity)) {
				debugLog(func, "Value '" + value + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		case "stat":
			// MU, KL, IN, ...
			// Must be number or parseInt()-able number
			// Must be integer in range [0, 99]
			if (!limitedIntValid(value, 0, 99)) {
				debugLog(func, "Value '" + value + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		case "wound-box":
			// Checkbox with wound value (active: 1, inactive: 0)
			// Must be number or parseInt()-able number
			// Must be integer in range [0, 1]
			if (!limitedIntValid(value, 0, 1)) {
				debugLog(func, "Value '" + value + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		case "ini-mod-weapon":
			// INI modifiers of weapons
			// Must be number or parseInt()-able number
			// Must be integer in range [-9, 9]
			if (!limitedIntValid(value, -9, 9)) {
				debugLog(func, "Value '" + value + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		case "encumbrance":
			// Encumbrance from excessive equipment weight or armour
			// Must be number or parseInt()-able number
			// Must be integer in range [0, 99]
			if (!limitedIntValid(value, 0, 99)) {
				debugLog(func, "Value '" + value + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		case "melee-combat-technique":
			// Limited set of combat techniques to choose from
			// Must be within the set
			const meleeCombatTechniques = [
					"anderthalbhander", "bastardstaebe",       "dolche",
					"fechtwaffen",
					"hiebwaffen",       "infanteriewaffen",    "kettenstabe",
					"kettenwaffen",     "lanzenreiten",        "peitsche",
					"raufen",           "ringen",              "sabel",
					"schwerter",        "speere",              "stabe",
					"zweihandflegel",   "zweihand-hiebwaffen", "zweihandschwerter"
			];
			const stringValue = String(value);
			if (meleeCombatTechniques.includes(stringValue.toLowerCase()) === false) {
				debugLog(func, "Value '" + stringValue + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		default:
			debugLog(func, "type '", type, "' not understood.");
	}
	return sane;
}

/*
	Counts occurrences of stats in arrays and returns an object
*/
function countStats (statsArray) {
	var caller = "countStats";
	const validStats = new Set(["MU", "IN", "KL", "CH", "FF", "GE", "KO", "KK"]);
	var statsCount = {
		"MU": 0, "IN": 0, "KL": 0, "CH": 0,
		"FF": 0, "GE": 0, "KO": 0, "KK": 0
	};

	if (Array.isArray(statsArray) === false)
	{
		debugLog(caller, "statsArray not an array.");
	}
	if (statsArray.length === 0)
	{
		debugLog(caller, "Array is empty.");
	}

	for (let stat of statsArray)
	{
		if (validStats.has(stat))
		{
			statsCount[stat] += 1;
		}
	}
	return statsCount;
}

/*
	Extracts two-letter stats from an array of strings returning an array with the two-letter stats only
	Beware: input.length is not necessarily output.length!
*/
function extractStats (statsArray) {
	var caller = "extractStats";
	const statPattern = /(?:MU|IN|KL|CH|GE|FF|KO|KK)/;

	var results = [];

	if (Array.isArray(statsArray) === false)
	{
		debugLog(caller, "statsArray not an array.");
	}
	if (statsArray.length === 0)
	{
		debugLog(caller, "Array is empty.");
	}

	for (let entry of statsArray)
	{
		let result = entry.match(statPattern);
		if (result)
		{
			results.push(result[0]);
		}
	}
	return results;
}

/*
	x.5 values are always rounded up in this system, so let's have a function for this.
*/
function DSAround (num) {
	var caller = "DSAround";
	num = parseFloat(num);

	if (isNaN(num)) {
		debugLog(caller, "NaN encountered.", "num is \"" + num + "\".");
		return NaN;
	}

	num = roundDecimals(num, 1);
	// Round down if fraction is less than 0.5; abs() to handle negative values correctly as well
	if (Math.abs(num) % 1 < 0.5) {
		num = Math.floor(num);
	} else {
		num = Math.ceil(num);
	}

	return num;
}

/*
	When displaying modifiers, make use of plus sign, the real minus sign (U+2212) or ± (U+00B1).
*/
function prettifyMod(uglyModifier) {
	var prettyModifier;
	if(isNaN(parseInt(uglyModifier)))
	{
		return uglyModifier;
	}
	if(uglyModifier < 0)
	{
		prettyModifier = "−" + String(Math.abs(uglyModifier));
	} else if(uglyModifier === 0){
		prettyModifier = "±" + String(uglyModifier);
	} else {
		prettyModifier = "+" + String(uglyModifier);
	}
	return prettyModifier;
}

/*
	When displaying roll results, make use of real minus sign (U+2212), but do not add a plus sign or ± (U+00B1).
*/
function prettifyResult(uglyResult) {
	let prettyResult;
	if(isNaN(parseInt(uglyResult)))
	{
		return uglyResult;
	}
	if(uglyResult < 0)
	{
		prettyResult = "−" + String(Math.abs(uglyResult));
	} else {
		prettyResult = String(uglyResult);
	}
	return prettyResult;
}
/* utilities_dsa end */
