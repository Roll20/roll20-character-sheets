# Roll Macro Generator for Roll20


## Features
* Attribute calls (`@{Testo|STR}`), ability calls (`%{Testo|attack}`) and macro calls (`#macroCall`) are not escaped, no matter the nesting level.
* Output can either be a string or an array of objects with a name property and a corresponding value property such as `{ 'name': 'bonus', 'value': '[[2d10]]' }`

## Specifications
### Macro Collection for a Roll
* Array of macro objects.
* Every macro object must define a `name`, i. e. the variable name used to refer to rolls in e. g. roll templates. The `name` is a property and must contain a string.
* Macro objects can either define their innards themselves or reference the name of a reusable macro (called "a reuse") that is defined in the reuse object. If you want to reference a reuse the macro object must contain the `reuse` property with a string of the reuse name. If you want to define your own macro the macro object must contain the `macro` property with an object representing the macro.

### Self-Defined Macros
* A macro object contains two properties: `q` and `a`.
* The `q` property must contain a string representing the question or hint in the prompt.
* The `a` property must be an array of answer objects.

#### Answer
* An answer object contains two properties: `desc` and `val`. Both properties must contain an array.
* The `desc` property contains the answer description given in the drop-down. The array must contain a single element of type string.
* The `val` property contains the value behind the textual description. It can contain an arbitrary number of elements of the types string or object. All elements of the array will be concatenated without delimiters.
* Objects in the val property must either contain the `reuse` property and reference the name of a reuse or a (now nested) self-defined macro in a `macro` property.

Note: It is up to the creator of the macros to make sure that the result of the (nested) rolls is sensible and can be interpreted by Roll20 and, most likely, Custom Roll Parsing. Be aware that only roll results can be accessed, so putting `[[0d1]]` rolls will likely be necessary. Using inline labels and accessing the roll expression within Custom Roll Parsing can allow for simple accessing of parts of complex nested rolls.

### Reuse Collection
* Object of reuse macros.
* Each property is the name of the reuse that can be used to reference it within macros.
* The rules for self-defined macros apply to reuse macros as well. This also means that reuse macros can reference other reuse macros.
* There is code in place to check for (infinite) loops, but there are no guarantees it covers more than general cases or obscure JavaScript shenanigans.

## Examples
All examples are based on the German system "Das Schwarze Auge 4.1" (The Dark Eye 4.1).

### Reuse Object with Nesting
In melee combat, you can modify your attack roll to include certain manoeuvres and, to make things extra complicated for character sheet developers, some can even be combined. Here, we produce a roll macro for the "feint" manoeuvre up to a +4 mod (`feint4`). Then, we reuse this roll for a combination of the "forceful blow" manoeuvre up to a +4 mod (`fb4`) with feint4 (`fb4fe4`).

```JavaScript
var reuse = {
	"feint4": {
		"q": "Feint?",
		"a": [
			{ "desc": [ "Yes, +1." ], "val": [ "1d1[fe]" ] },
			{ "desc": [ "Yes, +2." ], "val": [ "2d1[fe]" ] },
			{ "desc": [ "Yes, +3." ], "val": [ "3d1[fe]" ] },
			{ "desc": [ "Yes, +4." ], "val": [ "4d1[fe]" ] },
			{ "desc": [ "No." ], "val": [ "0d1[fe]" ] }
		]
	},
	"fb4fe4": {
		"q": "Forceful blow?",
		"a": [
			{ "desc": [ "Yes, +1." ], "val": [ "1d1[fb]", { "reuse": "feint4" } ] },
			{ "desc": [ "Yes, +2." ], "val": [ "2d1[fb]", { "reuse": "feint4" } ] },
			{ "desc": [ "Yes, +3." ], "val": [ "3d1[fb]", { "reuse": "feint4" } ] },
			{ "desc": [ "Yes, +4." ], "val": [ "4d1[fb]", { "reuse": "feint4" } ] },
			{ "desc": [ "No." ], "val": [ "0d1[fb]", { "reuse": "feint4" } ] }
		]
	}
};
```

Then, we are using these reuses in a macro collection to create the roll button macro code to for the combined `fb4fe4` macro.

```JavaScript
var macros = [
	{
		"name": "fb4fe4",
		"reuse": "fb4fe4"
	}
];
```

After running this through the Roll Macro Generator (`buildMacros(macros, reuse)`), the result is the following string:

`{{fb4fe4=[[?{Forceful blow?|Yes&comma; +1.,1d1[fb]?&lcub;Feint?&vert;Yes&amp;comma; +1.&comma;1d1[fe]&vert;Yes&amp;comma; +2.&comma;2d1[fe]&vert;Yes&amp;comma; +3.&comma;3d1[fe]&vert;Yes&amp;comma; +4.&comma;4d1[fe]&vert;No.&comma;0d1[fe]&rcub;|Yes&comma; +2.,2d1[fb]?&lcub;Feint?&vert;Yes&amp;comma; +1.&comma;1d1[fe]&vert;Yes&amp;comma; +2.&comma;2d1[fe]&vert;Yes&amp;comma; +3.&comma;3d1[fe]&vert;Yes&amp;comma; +4.&comma;4d1[fe]&vert;No.&comma;0d1[fe]&rcub;|Yes&comma; +3.,3d1[fb]?&lcub;Feint?&vert;Yes&amp;comma; +1.&comma;1d1[fe]&vert;Yes&amp;comma; +2.&comma;2d1[fe]&vert;Yes&amp;comma; +3.&comma;3d1[fe]&vert;Yes&amp;comma; +4.&comma;4d1[fe]&vert;No.&comma;0d1[fe]&rcub;|Yes&comma; +4.,4d1[fb]?&lcub;Feint?&vert;Yes&amp;comma; +1.&comma;1d1[fe]&vert;Yes&amp;comma; +2.&comma;2d1[fe]&vert;Yes&amp;comma; +3.&comma;3d1[fe]&vert;Yes&amp;comma; +4.&comma;4d1[fe]&vert;No.&comma;0d1[fe]&rcub;|No.,0d1[fb]?&lcub;Feint?&vert;Yes&amp;comma; +1.&comma;1d1[fe]&vert;Yes&amp;comma; +2.&comma;2d1[fe]&vert;Yes&amp;comma; +3.&comma;3d1[fe]&vert;Yes&amp;comma; +4.&comma;4d1[fe]&vert;No.&comma;0d1[fe]&rcub;}]]}}`

Using just the roll (right side of the equation sign) in the chat will ask two consecutive questions and roll a roll such as: `4d1[fb]2d1[fe]`.

Be aware that even without nesting, certain characters within the description are properly escaped. This code, when used in a roll button roll, will ask the user in a cascaded fashion first about the forceful blow modifier, then about the feint modifier. With some more JavaScript character attributes can be used to create the reuse object dynamically, e.g. limiting a certain user to a maximum total modifier for the sum of forceful blow and feint. No matter the nesting level, the escaping should be applied correctly. So, if you think that that looks already convoluted, do not think about writing these by hand if the nesting goes beyong two levels.

