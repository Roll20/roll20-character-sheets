/* roll_macro_generator start */
/*
	Roll Macro Nester

Roll20 technically allows to nest roll macro, but requires every inner macro to replace the special characters '&', '|', '}' and ',' with HTML entities. This function takes a nesting level and an input string and returns an accordingly prepared string.

This only works with roll macros without attribute, ability or macro calls which can contain '|' and '}'.
*/
function nestRollMacro(rollMacro, level) {
	var caller = "nestRollMacro()";
	var result = '';

	// Sanity Checking
	if (typeof(rollMacro) !== "string") {
		debugLog(caller, "Function input is not of type 'string'. Aborting ...");
		result = { "error": caller + ": Function input is not of type 'string'. Type was '" + typeof(rollMacro) + "'." };
		return result;
	}

	if (typeof(level) !== "number") {
		debugLog(caller, "Function input is not of type 'number'. Aborting ...");
		result = { "error": caller + ": Function input is not of type 'number'. Type was '" + typeof(level) + "'." };
		return result;
	}

	level = parseInt(level);

	if (level < 0) {
		debugLog(caller, "Nesting level is negative. Aborting ...");
		result = { "error": caller + ": Nesting level is negative. Nesting level was '" + level + "'." };
		return result;
	}

	if (level < 1) {
		debugLog(caller, "No nesting requested. Aborting ...");
		result = { "error": caller + ": Nesting level is 0. Nesting level was '" + level + "'." };
		return rollMacro;
	}

	// Use an internal function
	function replacer (rollMacro, level) {
		rollMacro = rollMacro.replaceAll(/\&/g, '&amp;').replaceAll(/\|/g, '&#124;').replaceAll(/\}/g, '&#125;').replaceAll(/,/g, '&#44;');
		level -= 1;
		if (level > 0) {
			rollMacro = replacer(rollMacro, level);
				}
		return rollMacro;
		 }

		 result = replacer(rollMacro, level);
		 return result;
}

/*
Roll Macro Generator

Writing roll macros for roll buttons by hand has many drawbacks: different nesting levels require different escaping even for the same macro, everything must be on the same line, no reuse of macros. Maintaining even slightly more complex rolls is no easy task.

The roll macro generator aims to alleviate most of these issues. You start with a JavaScript object representing the roll(s). Nested rolls are just nested JavaScript objects again. It is a bit more complex than that, but the result is at least readable by humans. While one object contains the rolls for your roll button, the other object contains reusable macros. The format is specified elsewhere.

The function 'buildMacros()' takes the macro(s) object and the reuse object. It calls the 'buildMacro()' function for each individual roll. Answers are produced by 'buildAnswers()' and escaping is done by 'escapeMacro()'. Escaping tries to not escape attribute, ability and macro calls, but the recognition might not be perfect.

By default, a string with all macros is returned. By setting 'resultType' to 'structured' an array of objects is returned. Each object contains two properties for each roll variable with its name and value as the content. {{test=[[?{Damage|much,2d6|little,1d3}]]}} becomes { 'name' : 'test', 'value': '[[?{Damage|much,2d6|little,1d3}]]' }.
*/

function buildMacros(macros, reuse, resultType) {
	/*
	isReuseValid

	This function takes a reuse object, an object of unnested or nested macro objects. Top-level properties define the reuse name, the value of the property follows the structure of ordinary macros. Reuse macros can be reused when defining roll macros, but can also reuse other reuse macros.

	Therefore, an uncareful user may create loops in the reuse object and this function checks for this.

	The algorithm works like this:
	* Build a list of called macros, an object containing properties for every (top-level) macro object in the reuse object. For every reuse property found within the macro at any level, the reuse name is added to the initially empty array. The nesting level is irrelevant, only the complete listing of all reuse macros referenced. This allows to search for loops.
	* Gather all reuse names referenced. This allows to check for correct references.
	* Check that all referenced reuse names are defined. Referencing undefined reuse macros makes the reuse object invalid. Nonetheless, undefined reuse macros are dropped and the next step starts.
	* Create a list of directed edges from the calling macro to the called macro.
	* Use the top-level properties of the list of called macros object as starting points of macro call graphs. Use the list of directed edges to build the path. After every step, check whether a given macro (vertex) has already been called (visited).
	*/
	function isReuseValid(reuse) {
		function questionIsValid(q) {
			var result = false;
			if (typeof(q) !== "string") {
				result = false;
			} else {
				result = true;
			}
			return result;
		}

		// Checks only "first" level (up to including desc/val and their value types)
		function answersIsValid(a) {
			function answerIsValid(answer) {
				var result = false;
				var descResult = false;
				var valResult = false;

				// Type checking
				if (typeof(answer) !== "object") {
					result = false;
					return result;
				}

				// Property existence checking
				if (
					(Object.hasOwn(answer, "desc") === false)
					||
					(Object.hasOwn(answer, "val") === false)
				) {
					result = false;
					return result;
				}

				// Checking the answer's description and value types
				if (Array.isArray(answer["desc"]) === false) {
					result = false;
					return result;
				}
				if (Array.isArray(answer["val"]) === false) {
					result = false;
					return result;
				}

				// Checking the answer's description and value (somewhat superficially)
				if (answer["desc"].length !== 1) {
					descResult = false;
				} else {
					if (typeof(answer["desc"][0]) === "string") {
						descResult = true;
					}
				}
				if (answer["val"].length < 1) {
					valResult = false;
				} else {
					for (let item of answer["val"]) {
						if ( ["string", "object"].includes(typeof(item)) ) {
							valResult = true;
						} else {
							valResult = false;
						}
					}
				}

				// Reporting final result
				result = descResult && valResult;
				return result;
			}

			var result = false;

			// Type checking
			if (Array.isArray(a) === false) {
				result = false;
				return result;
			}

			// Array checking
			if (a.length === 0) {
				result = true;
			} else if (a.length > 0) {
				var numValidObjs = 0;
				for (let answer of a) {
					if (answerIsValid(answer) === true) {
						numValidObjs += 1;
					}
				}
				if (a.length !== numValidObjs) {
					result = false;
				} else {
					result = true
				};
			}
			return result;
		}
		// macro: calling macro
		function analyseObject(obj, macro) {
			console.log("analyseObject Start", obj, "called by:", macro);
			macroCalls = [];
			if (Object.hasOwn(obj, "reuse")) {
				console.log(macro, "reuses", obj["reuse"]);
				macroCalls.push(obj["reuse"]);
			} else if (
				(Object.hasOwn(obj, "macro"))
				&&
				(typeof(obj["macro"]) === "object")
			) {
				if (answersIsValid(obj["macro"]["a"])) {
					// Arrays need to be iterated and each item checked (could be an object)
					for (let answer of obj["macro"]["a"]) {
						for (let item of answer["val"]) {
							if (typeof(item) === "object") {
								console.log("nestedEntry:", item);
								macroCalls = [...macroCalls, ...analyseObject(item, macro)];
							}
						}
					}
				} else {
					console.log("Invalid answers encountered for macro ", macro);
				}
			}
			console.log("analyseObject Stop");
			return macroCalls;
		}
		function buildCalledMacrosList(macros) {
			var calledMacrosList = {};
			for (let macro in macros) {
				// Add empty entry for new reuse macro
				calledMacrosList[macro] = [];

				// Macros must have two properties: "q" and "a"
				// Care only about "a", no nesting in "q" allowed
				// TODO: Allow "q"-only (Roll20's default value for "a" is 0) objects
				// TODO: Allow "q" with default value for "a" objects
				console.log("macro:", macros[macro]);

				// Analyse answers
				// Referencing reuse macros is only possible within objects (property "reuse")
				// Objects are only allowed within the answers array
				if (answersIsValid(macros[macro]["a"])) {
					// Arrays need to be iterated and each item checked (could be an object)
					for (let answer of macros[macro]["a"]) {
						for (let item of answer["val"]) {
							if (typeof(item) === "object") {
								// Expand the calledMacrosList using a recursive function.
								// If analyseObject() does not return anything, that means that the current top-level reuse macro does not reference any other reuse macros.
								calledMacrosList[macro] = [...calledMacrosList[macro], ...analyseObject(item, macro)];
							}
						}
					}
				}
				// Remove duplicates
				calledMacrosList[macro] = [... new Set(calledMacrosList[macro])];
			}
			return calledMacrosList;
		}
		function buildReuseNamesList(macros) {
			var reuseNamesList = [];
			for (let macro in macros) {
				// Add reuse name to the list of known reuse names
				reuseNamesList.push(macro);
			}
			return reuseNamesList;
		}
		function isMacroCallTreeValid(edges, reuseNamesList) {
			var caller = "isMacroTreeValid()";
			var result = false;
			var loops = 0;

			var paths = [];
			// Create starting points from the reuse names list
			for (let name of reuseNamesList) {
				for (let edge of edges) {
					if (name === edge[0]) {
						paths.push([ name, edge[1] ]);
					}
				}
			}
			// Iterate over all paths, including new ones added on the way
			for (let path of paths) {
				// Next macro to call is the last macro of the path
				var nextRef = path.slice(-1)[0];

				// Iterate over all edges to find matching macros
				for (let edge of edges) {
					if (nextRef === edge[0]) {
						// Matches lead to new paths
						// Optimizing this to create new paths only if there is more than one matching edge will give headaches for keeping the outer loop running; it's not worth the hassle
						var newPath = [ ...path, edge[1] ];
						paths.push(newPath);
						if (path.includes(edge[1])) {
							console.log("Loop detected:", newPath.join(" -> ") + ".", "Removing most recently added path (loop).");
							// Loops get removed, so they cannot be followed any further
							loops += 1;
							paths.pop();
							break;
						}
					}
				}
			}
			console.log(caller, "paths:", paths);
			if (loops === 0) {
				result = true;
			} else {
				result = false;
			}
			return result;
		}
		var results = { "reuseNotFound": [], "noLoopedEdges": false, "macroCallTreeValid": false, "result": false };
		var caller = "isReuseValid()";
		var calledMacrosValid = false;
		var calledMacrosList = {};
		var reuseNamesList = [];

		// Build called macros list
		calledMacrosList = buildCalledMacrosList(reuse);
		// Build reuse names list
		reuseNamesList  = buildReuseNamesList(reuse);

		// Report on reuse names and macro calls
		console.log("reuseNamesList:", reuseNamesList, "calledMacrosList:", calledMacrosList);

		// Remove references to undefined reuse names
		for (let macro in calledMacrosList) {
			var toBeRemoved = [];
			if (calledMacrosList[macro].length > 0) {
				for (let entry in calledMacrosList[macro]) {
					if (reuseNamesList.includes(calledMacrosList[macro][entry]) === false) {
						console.log("Reuse not found:", calledMacrosList[macro][entry]);
						toBeRemoved.push(entry);
						results["reuseNotFound"].push(calledMacrosList[macro][entry]);
					}
				}
			}
			console.log("calledMacrosList[macro]:", calledMacrosList[macro], "toBeRemoved:", toBeRemoved);
			if (toBeRemoved.length > 0) {
				for (let entry in toBeRemoved.reverse()) {
					calledMacrosList[macro].splice(toBeRemoved[entry], 1);
				}
			}
			console.log("calledMacrosList[macro]:", calledMacrosList[macro]);
		}

		// Build tree
		// Start: Create edges
		var edges = [];
		for (let macro in calledMacrosList) {
			if (calledMacrosList[macro].length > 0) {
				for (let entry in calledMacrosList[macro]) {
					edges.push([ macro, calledMacrosList[macro][entry] ]);
				}
			}
		}
		console.log("edges:", edges);

		// Check edges to self
		{
		var toBeRemoved = [];
		for (let edge in edges) {
			if (edges[edge][0] === edges[edge][1]) {
				console.log("Loop detected:", edges[edge].join(' -> '));
				results["noLoopedEdges"] = false;
				toBeRemoved.push(edge);
			}
		}
		for (let entry in toBeRemoved.reverse()) {
			edges.splice(toBeRemoved[entry], 1);
		}
		if (toBeRemoved.length === 0) {
			results["noLoopedEdges"] = true;
		}

		}
		console.log("edges:", edges);

		// Check macro call tree
		results["macroCallTreeValid"] = isMacroCallTreeValid(edges, reuseNamesList);

		// Generate result
		results["result"] = (results["reuseNotFound"].length === 0) && results["noLoopedEdges"] && results["macroCallTreeValid"];
		console.log(results);

		return results["result"];
	}

	/*
	Ignore name property in nested objects.
	*/
	function buildMacro(macroObj, depth, reuse) {
		const prefix = "{{";
		const middle = "=[[";
		const suffix = "]]}}";
		const rmStart = "?{";
		const rmEnd = "}";
		const optSep = "|";

		var result = "";

		// Input validation
		if (typeof(macroObj) !== "object") {
			console.log("buildMacro: macroObj must be an object, but is of type ", typeof(macroObj));
			return "";
		}
		if (typeof(depth) !== "number") {
			console.log("buildMacro: depth must be a number, but is of type ", typeof(depth));
			return "";
		}
		if (depth < 0) {
			console.log("buildMacro: depth must be non-negative, but is", depth);
			return "";
		}
		if (isReuseValid(reuse) === false) {
			console.log("buildMacro: reuse not valid.")
			return "";
		}

		// Input type determination (macro or reuse)
		var type = "";
		if (
			(Object.hasOwn(macroObj, "macro") === false)
			&&
			(Object.hasOwn(macroObj, "reuse") === false)
		) {
			console.log("buildMacro: macroObj must contain one and only one of these two properties: macro, reuse. It does not contain any of them. No macro found.");
			return "";
		}
		if (
			(Object.hasOwn(macroObj, "macro") === true)
			&&
			(Object.hasOwn(macroObj, "reuse") === true)
		) {
			console.log("buildMacro: macroObj must contain one and only one of these two properties: macro, reuse. It contains both of them. No macro found.");
			return "";
		}
		if (
			(Object.hasOwn(macroObj, "macro") === false)
			&&
			(Object.hasOwn(macroObj, "reuse") === true)
		) {
			type = "reuse";
		}
		if (
			(Object.hasOwn(macroObj, "macro") === true)
			&&
			(Object.hasOwn(macroObj, "reuse") === false)
		) {
			type = "macro";
		}

		// Check validity of reuse name
		if (type === "reuse") {
			if (typeof(macroObj["reuse"]) !== "string") {
				console.log("buildMacro: macroObj's reuse property must be a string.");
				type = "";
				return "";
			} else {
				if (Object.hasOwn(reuse, macroObj["reuse"]) === false) {
					console.log("buildMacro: reuse macro not found in reuse data.");
					type = "";
					return "";
				}
			}
		}

		// Distinguish between top-level (depth = 0) and nested macros (depth > 0)
		if (depth === 0) {
			// Top-level macros must have a name and must be macro or reuse
			if (
				(Object.hasOwn(macroObj, "name") === false)
				||
				(type !== "macro" && type !== "reuse")
			) {
				console.log("buildMacro: At top level (depth = 0), macroObj must contain both of these properties: name and either macro or reuse. At least one of them is missing.");
				return "";
			}

			// Build top-level of type "macro"
			if (type === "macro") {
				result +=
					prefix +
					macroObj["name"] +
					middle + rmStart +
					macroObj["macro"]["q"] +
					optSep +
					buildAnswers(macroObj["macro"]["a"], depth, reuse) +
					rmEnd + suffix;
			// Build top-level of type reuse
			} else if (type === "reuse") {
				result +=
					prefix +
					macroObj["name"] +
					middle + rmStart +
					reuse[macroObj["reuse"]]["q"] +
					optSep +
					buildAnswers(reuse[macroObj["reuse"]]["a"], depth, reuse) +
					rmEnd + suffix;
			}
		} else {
			// Nested macros can have a name, but it will not be used; nested macros are getting escaped
			if (type === "macro") {
				result +=
					escapeMacro(
						rmStart +
						macroObj["macro"]["q"] +
						optSep +
						buildAnswers(macroObj["macro"]["a"], depth, reuse) +
						rmEnd);
			} else if (type === "reuse") {
				result +=
					escapeMacro(
						rmStart +
						reuse[macroObj["reuse"]]["q"] +
						optSep +
						buildAnswers(reuse[macroObj["reuse"]]["a"], depth, reuse) +
						rmEnd);
			}
		}

		return result;
	}
	/*
	buildAnswers
	This function takes an answers array and transforms it into a string.

	In the simple case, each answer is made up of an array on its own containing only string items.
	If an answer array contains one and only one item, this item is used as value.
	If an answer array contains more than one item, all but the last items are concatenated to form the description, the value separator is added and the last value is added as value.

	In the more complicated case, one or more items are objects. These objects must fulfil certain conditions, but are interpreted by calling the buildMacro() function ultimately yielding a string again. The same rule concerning the answer array length as above applies. In general, this means that you want objects to be the last item of an answer array.

	This function is aware of the call depth and will stop at a nesting depth of 100 which will already exceed the maximum nesting depth supported by Roll20.

	TODO: empty answers "" given
	TODO: empty val "" given
	TODO: empty desc "" given
	*/

	function buildAnswers(answers, depth, reuse) {
		const optSep = "|";
		const varSep = ",";

		// Input validation
		if (Array.isArray(answers) === false) {
			console.log("buildAnswers: Input must be an array. Input is of type ", typeof(answers));
			return;
		}
		if (typeof(depth) !== "number") {
			console.log("buildAnswers: depth must be a number, but is of type ", typeof(depth));
			return "";
		}
		if (depth < 0) {
			console.log("buildAnswers: depth must be non-negative, but is", depth);
			return "";
		}
		// Build answers
		var result = "";
		var lastAnswerIndex = answers.length - 1;
		console.log("answers:", answers);
		for (let answer in answers) {
			console.log("answer:", answer, "currentAnswer:", answers[answer]);
			answer = parseInt(answer);
			var currentAnswer = answers[answer];
			var desc = "";
			var val = "";

			// Input validation
			if (typeof(currentAnswer) !== "object") {
				console.log("buildAnswers: Answer must be an object, but is of type " + typeof(currentAnswer) + ".");
				return "";
			}
			if (
				(Object.hasOwn(currentAnswer, "desc") === false)
				||
				(Object.hasOwn(currentAnswer, "val") === false)
			) {
				console.log("buildAnswers: Answer object must have the properties 'desc' and 'val'.");
				return "";
			}

			// Description: Array, only string elements are considered
			if (Array.isArray(currentAnswer["desc"]) === true) {
				for (let part of currentAnswer["desc"]) {
					if (typeof(part) === "string") {
						desc += part;
					} else {
						console.log("Description part not a string. Ignoring.");
					}
				}
				// Protect against commas and pipes in the description
				desc = escapeMacro(desc);
			} else {
				console.log("Description not an array. Ignoring.");
			}

			// Value: Array, strings or objects; objects are not checked for validity
			if (Array.isArray(currentAnswer["val"]) === true) {
				for (let part of currentAnswer["val"]) {
					if (typeof(part) === "string") {
						val += part;
					} else if (typeof(part) === "object") {
						console.log("val:", val, "answer:", answer, "lastAnswerIndex:",  lastAnswerIndex);
						var protectAnswerVal = answer;
						val += buildMacro(part, depth + 1, reuse);
						answer = protectAnswerVal;
						console.log("val:", val, "answer:", answer, "lastAnswerIndex:",  lastAnswerIndex);
					} else {
						console.log("Value part neither string nor object. Ignoring.");
					}
				}
				// Contrary to the description, the value will not receive an extra round of escaping as it should only contain text directly consumable by Roll20's roll interpreter
			} else {
				console.log("Value not an array. Ignoring.");
			}

			// Piecing every together
			result += desc + varSep + val;

			// optSep not after the final answer
			if (answer < lastAnswerIndex) {
				result += optSep;
			}
		}
		return result;
	}

	function escapeMacro(macro) {
		console.log("escapeMacro() läuft mit", macro);
		var macroComplete = "";

		// The actual escaping function
		function escaper(macro) {
			return macro
				.replaceAll(/\&/g, '&amp;')
				.replaceAll(/\|/g, '&vert;')
				.replaceAll(/\{/g, '&lcub;')
				.replaceAll(/\}/g, '&rcub;')
				.replaceAll(/,/g, '&comma;');
		}

		/*
		Some parts must not be escaped. The pattern uses a non-capturing group (?:), because otherwise matches from the groups would also be included in the protected parts data. This was an unexpected JavaScript default.
		*/
		const protectPattern = /(?:#[^#@%|, \t]+|[@%]\{[^@%#}]+\})/g;
		var protectParts = [];

		// Create an array of all parts that need protection from escaping
		protectParts = macro.match(protectPattern);

		// Distinguish between the simple (no protected parts) and the complicated (protected parts) case
		if (protectParts === null) {
			macroComplete += escaper(macro);
		} else {
			// The algorithm:
			//  Split the macro at every protected part (empty string gets added at beginning/end of macro if match is there)
			//  Escape all the unprotected parts into macroEscaped
			//  Mix escaped and protected parts in an alternating fashion
			//  Add last escaped part at the end
			var protectCount = 0;
			var protectSplit = [];
			protectSplit = macro.split(protectPattern);
			protectCount = protectParts.length;
			console.log(protectCount, protectParts, protectSplit);

			var macroEscaped = [];
			for (let part of protectSplit) {
				macroEscaped.push(escaper(part));
			}

			for (let part in protectParts) {
				macroComplete += macroEscaped[part] + protectParts[part];
			}
			macroComplete += macroEscaped[macroEscaped.length -1];
		}

		return macroComplete;
	}

	// Build the macros
	var result = [];
	for (let macro of macros) {
		result.push(buildMacro(macro, 0, reuse));
	}
	var structuredResult = [];

	for (let macro of result) {
		// Get the name of the roll variable
		var rollVarName = macro.slice(2, macro.search('='));

		// Get the definition of the roll variable
		var rollVarValue = macro.slice(macro.search('=') + 1, macro.length - 2);

		// Create a new object with properties for the rollVarName and the rollVarValue
		structuredResult.push( { 'name': rollVarName, 'value': rollVarValue } );
	}
	if (resultType !== 'structured') {
		return result.join(" ");
	} else {
		return structuredResult;
	}
}
/* roll_macro_generator end */
