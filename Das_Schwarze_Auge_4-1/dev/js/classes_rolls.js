/* classes_rolls start */
/*
Roll buttons require roll macros. Generally, roll macros are just plain strings. But roll macros use an uncommon syntax that is difficult to translate elegantly to standard JavaScript data types. At the core of roll macros is what is simply called a "property". Since this term is already used within JavaScript the class for representing the term used here is "roll property".

While roll macros have no fixed layout in the cases used in this sheet each roll macro follows a certain pattern. This pattern is enforced using the corresponding class.
*/

/*
RollProperty

A roll property is basically a pair of a key and a value in double curly braces. This class carries both, the key ("property") and its value ("macro") and outputs the string with the toString() method.
*/
class RollProperty
{
	// Properties (in the JS sense)
	/// property: the key of the roll property
	/// macro: the value of the roll property
	property;
	macro;

	// constructor
	constructor(property, macro)
	{
		if (RollProperty.isPropertySane(property))
		{
			this.property = property;
		}
		if (RollProperty.isMacroSane(macro))
		{
			this.macro = macro;
		}
	}

	// Getters and setters
	get class()
	{
		return this.constructor.name;
	}

	// Sanity checks
	/// true/false: sane/not sane
	/// property
	static isPropertySane(property)
	{
		// Boilerplate
		const caller = "isPropertySane() of class RollProperty";
		const type = "string";
		const lengthMinimum = 1;
		/// legalCharacters is stricter than what Roll20 allows, but sane
		const patternLegalCharacters = /^[a-zA-Z][0-9a-zA-Z]*$/g;
		let legalCharacters = "";
		/// recommendedCharacters is stricter than legalCharacters to prevent weird Roll20 bugs
		const patternRecommendedCharacters = /^[a-z][0-9a-z]*$/g;
		let recommendedCharacters = "";

		// Checks
		/// Data type
		if (typeof(property) !== type)
		{
			debugLog(caller, `Error: property is not of type ${type}. Failing gracefully ...`);
			return false;
		}

		/// Characters
		if (property.length < lengthMinimum)
		{
			debugLog(caller, `Error: property is not long enough (at least ${lengthMinimum} characters). Failing gracefully ...`);
			return false;
		}

		legalCharacters = property.match(patternLegalCharacters);
		if (!legalCharacters)
		{
			debugLog(caller, `Error: property does not contain any legal characters. Failing gracefully ...`);
			return false;
		}
		if (legalCharacters[0].length !== property.length)
		{
			debugLog(caller, `Error: property contains non-legal characters. Failing gracefully ...`);
			return false;
		}

		recommendedCharacters = property.match(patternRecommendedCharacters);
		if (
			(recommendedCharacters) &&
			(recommendedCharacters[0].length !== property.length))
		{
			debugLog(caller, `Warning: property contains non-recommended characters. Continuing ...`);
		}
		return true;
	}
	/// macro
	static isMacroSane(macro)
	{
		// Boilerplate
		const caller = "isMacroSane() of class RollProperty";
		const type = "string";
		const lengthMinimum = 1;
		/// legalCharacters is stricter than what Roll20 allows, but sane (for German)
		//// TODO: Expand list to cover more supported languages.
		const patternLegalCharacters = /[-−+*/_.,:;!?#"'|&@%:<>(){}[\] 0-9a-zäöüßA-ZÄÖÜ]+/g;
		let legalCharacters = "";
		/// recommendedCharacters is stricter than legalCharacters to prevent weird Roll20 bugs
		const patternRecommendedCharacters = /[-−+*/_.,:;!?#"'|&@%:<>(){}[\] 0-9a-z]+/g;
		let recommendedCharacters = "";

		// Checks
		/// Data type
		if (typeof(macro) !== type)
		{
			debugLog(caller, `Error: macro is not of type ${type}. Failing gracefully ...`);
			return false;
		}

		/// Characters
		if (macro.length < lengthMinimum)
		{
			debugLog(caller, `Warning: macro appears to be empty. Continuing ...`);
		} else {
			legalCharacters = macro.match(patternLegalCharacters);
			if (!legalCharacters)
			{
				debugLog(caller, `Error: macro does not contain any legal characters. Failing gracefully ...`);
				return false;
			}
			if (legalCharacters[0].length !== macro.length)
			{
				debugLog(caller, `Error: macro contains non-legal characters. Failing gracefully ...`);
				return false;
			}

			recommendedCharacters = macro.match(patternRecommendedCharacters);
			if (
				(recommendedCharacters) &&
				(recommendedCharacters[0].length !== macro.length))
			{
				debugLog(caller, `Warning: macro contains non-recommended characters. Continuing ...`);
			}
		}
		return true;
	}

	// toString
	toString()
	{
		const result = `{{${this.property}=${this.macro}}}`;
		return result;
	}
}

/*
RollPropertyArray

When used in rolls, especially ones behind roll buttons, roll macros are built from several roll properties. Roll properties might contain roll queries, allowing the user to choose a value from a drop-down menu or entering a custom value. The individual queries are shown to the user in the order of appearance in the roll macro and, most importantly, identical roll queries, e. g. the strings are equal, are only presented once to the user. This holds true even across the boundaries of single roll properties.

Therefore, the order of roll properties within a roll is important to present the user with options in a logical or intuitive way. This class carries a special array with roll properties only to make working with (the body of a) roll macro easier.
*/
class RollPropertyArray
{
	// Properties (in the JS sense)
	/// array: array of items of class RollProperty
	array = [];

	// constructor
	constructor(...array)
	{
		if (RollPropertyArray.isArraySane(array))
		{
			this.array = array;
		}
	}

	// Getters and setters
	get class()
	{
		return this.constructor.name;
	}

	// Sanity checks
	/// true/false: sane/not sane
	/// array
	static isArraySane(array)
	{
		// Boilerplate
		const caller = "isArraySane() of class RollPropertyArray";
		const lengthMinimum = 1;
		const itemClass = "RollProperty";

		// Checks
		/// Data type (outer)
		if (!Array.isArray(array))
		{
			debugLog(caller, `Error: Parameter "array" is not an array. Failing gracefully ...`);
			return false;
		}

		for (const item of array)
		{
			if (item.class !== itemClass)
			{
				debugLog(caller, `Error: array contains items not of class ${itemClass}. Failing gracefully ...`);
				return false;
			}
		}
		return true;
	}

	// toString
	toString()
	{
		const result = this.array.join(" ");
		return result;
	}
}

/*
RollMacro

While a roll macro is just a string there are some rules to building a working roll macro. Roll properties are separated by a space from each other, should use a roll template and may have an additional prefix and/or suffix.

These four parts are covered by this class and the toString() method yields the resulting roll macro.
*/
class RollMacro
{
	// Properties (in the JS sense)
	/// prefix: Any string that should come before all other parts
	/// template: The roll template name without the fancy markup, so just "talent" instead of the full "&{template:talent}"
	/// body: Object of class "RollPropertyArray"
	/// suffix: Any string that should come after all other parts (e. g. turn tracker)
	prefix = "";
	template = "";
	body = [];
	suffix = "";

	// constructor
	constructor(prefix, template, body, suffix)
	{
		if (RollMacro.isPrefixSane(prefix))
		{
			this.prefix = prefix;
		}
		if (RollMacro.isTemplateSane(template))
		{
			this.template = template;
		}
		if (RollMacro.isBodySane(body))
		{
			this.body = body;
		}
		if (RollMacro.isSuffixSane(suffix))
		{
			this.suffix = suffix;
		}
	}

	// Sanity checks
	/// true/false: sane/not sane
	/// prefix
	static isPrefixSane(prefix)
	{
		// Boilerplate
		const caller = "isPrefixSane() of class RollMacro";
		const type = "string";

		// Checks
		/// Data type
		if (typeof(prefix) !== type)
		{
			debugLog(caller, `Error: prefix is not of type ${type}. Failing gracefully ...`);
			return false;
		}

		return true;
	}

	/// template
	static isTemplateSane(template)
	{
		// Boilerplate
		const caller = "isTemplateSane() of class RollMacro";
		const type = "string";
		const lengthMinimum = 1;
		/// legalCharacters is probably stricter than what Roll20 allows, but I have not found documentation on the allowed characters
		/// Intentionally missing (based on my understanding of how Roll20/HTML/JS works): Space, ", '
		/// Intentionally missing (for some like above, but all tested): Comma, :, &, {, }, *, /, =, ;, !, ?, |, @, %, <, (, ), [, ]
		//// "[" does not give an error, but still breaks the template
		const patternLegalCharacters = /[-+_.#>0-9a-zäöüßA-ZÄÖÜ]+/g;
		let legalCharacters = "";
		/// recommendedCharacters is stricter than legalCharacters to prevent future weird Roll20 bugs
		const patternRecommendedCharacters = /[-_0-9a-zA-Z]+/g;
		let recommendedCharacters = "";

		// Checks
		/// Data type
		if (typeof(template) !== type)
		{
			debugLog(caller, `Error: template is not of type ${type}. Failing gracefully ...`);
			return false;
		}
		if (template.length < lengthMinimum)
		{
			debugLog(caller, `Warning: template appears to be empty. Continuing ...`);
		} else {
			legalCharacters = template.match(patternLegalCharacters);
			if (!legalCharacters)
			{
				debugLog(caller, `Error: template does not contain any legal characters. Failing gracefully ...`);
				return false;
			}
			if (legalCharacters[0].length !== template.length)
			{
				debugLog(caller, `Error: template contains non-legal characters. Failing gracefully ...`);
				return false;
			}

			recommendedCharacters = template.match(patternRecommendedCharacters);
			if (
				(recommendedCharacters) &&
				(recommendedCharacters[0].length !== template.length))
			{
				debugLog(caller, `Warning: template contains non-recommended characters. Continuing ...`);
			}
		}
		return true;
	}

	/// body
	static isBodySane(body)
	{
		// Boilerplate
		const caller = "isBodySane() of class RollMacro";
		const bodyClass = "RollPropertyArray";

		// Checks
		/// Data type
		if (body.class !== bodyClass)
		{
			debugLog(caller, `Error: body is not an instance of ${bodyClass}. Failing gracefully ...`);
			return false;
		}
		return true;
	}

	/// suffix
	static isSuffixSane(suffix)
	{
		// Boilerplate
		const caller = "isSuffixSane() of class RollMacro";
		const type = "string";

		// Checks
		/// Data type
		if (typeof(suffix) !== type)
		{
			debugLog(caller, `Error: suffix is not of type ${type}. Failing gracefully ...`);
			return false;
		}

		return true;
	}

	// toString
	toString()
	{
		const result = `${this.prefix} &{template:${this.template}} ${this.body} ${this.suffix}`;
		return result;
	}
}

/* classes_rolls end */
