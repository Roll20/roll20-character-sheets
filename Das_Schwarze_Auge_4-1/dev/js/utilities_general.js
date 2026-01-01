/* utilities_general start */
// wird verwendet um aus dem Attributsnamen einer repeating section die Row-ID zu ermitteln
function extractRowId(attributeId) {
		return attributeId.match("repeating_[a-zA-Z]*_([-a-zA-Z0-9]*)_.*")[1];
}

/*
	Debug Log

Instead of spamming the console unnecessarily all the time, only show messages in debug mode.
*/
function debugLog(caller, ...args) {
	// Caller not optional, because of complicated handling of different amounts of parameters with console.log()
	if (arguments.length <= 1)
	{
		console.log("debugLog() call with insufficient arguments detected. Nothing done.");
		return;
	}

	safeGetAttrs(
		['debug-mode'],
		function(debugMode) {
			if (debugMode['debug-mode'] === "on") {
				console.log(caller + ":", ...args);
			}
		}
	);
	return;
}

/*
	Encode/Decode Unicode Strings to Base64

Base64 is compatible with Roll20's strings. In order to push data from one roll to the next, conversion to and from Base64 is used.
*/
function base64EncodeUTF8(str) {
	return btoa(encodeURIComponent(str));
}

function base64DecodeUTF8(str) {
	return decodeURIComponent(atob(str));
}

/*
	Pack/Unpack Objects (JSON)

In order to comfortably push data from one roll to the next, use JSON.
*/
function packObject(cargo) {
	var caller = "packObject()";
	var result = {};
	if (typeof(cargo) !== "object") {
		debugLog(caller, "Function input is not of type 'object'. Aborting ...");
		result = { "error": caller + ": Function input is not of type 'object'. Type was '" + typeof(cargo) + "'." };
		result = base64EncodeUTF8(JSON.stringify(result))
		return result;
	}

	result = base64EncodeUTF8(JSON.stringify(cargo));
	return result;
}

function unpackObject(cargo) {
	var caller = "unpackObject()";
	var result = {};
	if (typeof(cargo) !== "string") {
		debugLog(caller, "Function input is not of type 'string'. Aborting ...");
		result = { "error": caller + ": Function input is not of type 'string'. Type was '" + typeof(cargo) + "'." };
		return result;
	}

	result = JSON.parse(base64DecodeUTF8(cargo));
	return result;
}

/*
	getDefaultValue()

This function is used as an interface to the defaultValues object. This became necessary when repeating sections had to be handled as well.

'attr' has to be a string. The return value is the default value to use for the requested attribute.
*/
function getDefaultValue(attr) {
	const caller = "getDefaultValue";
	const repeatingRegex = /^repeating_/;
	const repeatingPartsRegex = /^repeating_(?<section>[^_]+)_(?<rowID>[^_]+)_(?<attr>.*)$/;

	var defaultValue = 0;

	let attrType = "normal";
	if (attr.match(repeatingRegex))
	{
		attrType = "repeating";
	}

	switch(attrType)
	{
		case "normal":
			defaultValue = defaultValues[attr] ?? 0;
			break;
		case "repeating":
			// Extract the individual parts of the string
			const repeatingInfo = attr.match(repeatingPartsRegex).groups;

			// Check for perfect match
			const matchResults = checkRequiredProperties(["section", "rowID", "attr"], repeatingInfo);
			if (matchResults["errors"] > 0)
			{
				debugLog(caller, "Repeating section attribute gotten, but errors encountered when matching the individual parts of the attribute. Falling back to default value 0. The following parts could not be matched:", matchResults["missing"]);
				defaultValue = 0;
				break;
			}

			// Get the default value
			const repeatingSection = "repeating_" + repeatingInfo["section"];
			if (Object.hasOwn(defaultValues, repeatingSection))
			{
				if (Object.hasOwn(defaultValues[repeatingSection], repeatingInfo["attr"]))
				{
					defaultValue = defaultValues[repeatingSection][repeatingInfo["attr"]];
				} else {
					debugLog(caller, `Repeating section found in defaultValues, but not attribute "${repeatingInfo["attr"]}". Falling back to default value 0.`);
					defaultValue = 0;
				}
			} else {
				debugLog(caller, "Repeating section not found in defaultValues. Falling back to default value 0.");
				defaultValue = 0;
				break;
			}
			break;
		default:
			break;
	}
	return defaultValue;
}

/*
	Safe getAttrs()

This function calls getAttrs(), but checks whether all attributes returned are actually there and are not NaN or undefined. Non-existing attributes are filled with the stored default value or 0.
*/
function safeGetAttrs( attrsToGet, callback ) {
	var caller = "safeGetAttrs";
	getAttrs(
		attrsToGet, function(attrs) {
			var missing = [];
			var badDef = [];
			var errors = [0, 0];

			for (let req of attrsToGet) {
			// Check for missing attributes and try setting a default value
				if (!Object.hasOwn(attrs, req)) {
					errors[0] += 1;
					missing.push(req);
					attrs[req] = getDefaultValue(req) || 0;
				}
			// Check existing attributes for undefined or NaN
				if (
					typeof attrs[req] === 'undefined' ||
					Number.isNaN(attrs[req])
				) {
					errors[1] += 1;
					badDef.push(req);
					attrs[req] = getDefaultValue(req) || 0;
				}
			}
			if ( errors[0] > 0 ) {
				debugLog(caller, "Non-existing attributes gotten and set to default value:", missing.join(", "));
			}
			if ( errors[1] > 0 ) {
				debugLog(caller, "Attributes with values 'NaN' or 'undefined' gotten and set to default value:", badDef.join(", "));
			}
			callback(attrs, missing, badDef);
		}
	);
}

/*
	Safe setAttrs()

This function ultimately calls setAttrs(), but beforehand checks whether all attributes are are not NaN or undefined. Bad attributes are filled with the stored default value or 0.
*/
function safeSetAttrs( attrsToSet, options = "", callback = function() {}) {
	var caller = "safeSetAttrs";
	var badDef = [];
	var errors = 0;

	for (let req in attrsToSet) {
	// Check existing attributes for undefined or NaN
		if (
			typeof attrsToSet[req] === 'undefined' ||
			Number.isNaN(attrsToSet[req])
		) {
			errors += 1;
			badDef.push(req);
			attrsToSet[req] = getDefaultValue(req) || 0;
		}
	}
	if ( errors > 0 ) {
		debugLog(caller, "Attributes with values 'NaN' or 'undefined' gotten and set to default value:", badDef.join(", "));
	}

	setAttrs( attrsToSet, options, callback );
}

/*
	Array Comparison (Simple)
	Compares simple/unnested arrays for non-weird values (no checks for undefined or NaN, so beware!).
	Adapted from https://www.freecodecamp.org/news/how-to-compare-arrays-in-javascript/
*/
function arraysEqual(arrayA, arrayB) {
	return arrayA.length === arrayB.length && arrayA.every((element, index) => element === arrayB[index]);
}

/*
	Property Checker
	Checks whether properties (given in an array of strings) are available in an object.
	Does not check whether the array contains strings only.
	Returns an object with the error count (missing properties) and a string array of missing properties.
*/
function checkRequiredProperties(properties, values) {
	var errors = 0;
	var missing = [];

	for (let req of properties) {
		if (!Object.hasOwn(values, req)) {
			errors += 1;
			missing.push(req);
		}
	}
	return { "errors": errors, "missing": missing };
}

/*
	JavaScript's Math.round() only rounds to 0 decimal places.
	Using the toFixed() + parseFloat() method is cumbersome, so here we are with a new function.
*/
function roundDecimals (num, digits) {
	var caller = "roundDecimals";
	num = parseFloat(num);
	digits = parseInt(digits);

	if (isNaN(num) || isNaN(digits)) {
		debugLog(caller, "NaN encountered.", "num is \"" + num + "\" and digits is \"" + digits + "\".");
		return NaN;
	}

	num = parseFloat(num.toFixed(digits));
	return num;
}
/* utilities_general end */
