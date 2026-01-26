/* initialization_migration_common start */
/*
# Old Data Conversion
Always try to migrate as much data as possible

Relevant character sheet versions
* 20171014: last version before sheet worker scripts conversion
* 20200809: new repeating sections for meta-talents and gifts
*           shields and parry weapons. AT- and PA value calculation using sheet workers
*           migrates BE calculation to sheetworkers
*           weapon BE calculation: attack and parry values for weapons and shields are affected by the eBE
* 20210413: shield attack
*           INI mod from main weapon
*           wound mods
* 20210718: Reorganisation of encumbrance
* 20211010: Clearer attribute names for life energy, astral energy etc.
* 20220116: New roll buttons
* 20220604: Visibili Vanitar spelling fixes
* 20220821: Sheet Initialization
* 20230618: Confirmation/Reaction Buttons
* 20240414: Regeneration (Sleep)
*/
function migrationCheck()
{
	function gatherMigrationFunctions(dataVersion)
	{
		const caller = "gatherMigrationFunctions:";

		let functionList = [];
		for (let version of versionsWithMigrations) {
			if (dataVersion < version) {
				const functionName = "migrateTo" + version;
				console.log(caller, `dataVersion ${dataVersion} is older than version ${version} which needs a migration. Adding migration function: ${functionName}.`);
				functionList.push(functionName);
			}
		}
		return functionList;
	}
	safeGetAttrs(["character_sheet_version", "data_version", "sheet_initialized"], function(v) {
		const caller = "migrationCheck:";
		console.log(caller, "Sheet Initialization Status:", v["sheet_initialized"]);
		console.log(caller, "Checking versions before attempting data migration: Character sheet version is", v["character_sheet_version"], "and data version is", v["data_version"]);

		let initialized = v["sheet_initialized"];
		let dataVersion = parseInt(v["data_version"]);
		let sheetVersion = parseInt(v["character_sheet_version"]);

		/*
			If the character is new, data_version (the attribute) is just an empty string and dataVersion (the variable declared in this function) is NaN.
			New characters do not need any migration, but sheet initialization to set up the sheet including setting data_version to the current sheet version.

			Why this is necessary
			* Sheet-defined attributes such as data_version will change automatically if they are different in a new sheet version.
			* Once a sheet-defined attribute is changed e. g. via setAttrs(), the value will not change with new sheet version.
			* If a character was not opened for a long time (before data_version was set via script), the character's data version will update when the value is changed in a new sheet
			* This would lead to no migrations being performed.
			* On the other hand data_version could be left at its initial value, but that would mean that every new character would get all migrations unnecessarily!
		*/

		// Initialization First Safeguard Check (function not called based on one attribute)
		if (
			initialized === 0
			||
			initialized === "0"
			||
			initialized === "false"
			||
			initialized === false
		) {
			console.log(caller, "initialized is false.");
			initialized = false;
		} else {
			console.log(caller, "initialized is true. Skipping initialization.");
			initialized = true;
		}

		let functionsToCall = [];

		if (initialized)
		{
			functionsToCall = gatherMigrationFunctions(dataVersion);
		} else {
			functionsToCall.push("initializeSheet");
			functionsToCall = [ ...functionsToCall, ...gatherMigrationFunctions(dataVersion)];
		}

			// if there is at least one migration to do we add "setCurrentVersion" to the end of the function list which is responsible to set the current dataversion
			// then we call the function with name "firstFunction"
			if (functionsToCall.length > 0) {
				functionsToCall.push("setCurrentVersion");
				console.log(caller, "functionsToCall", functionsToCall);
				// shift() removes the first item of the array in place and returns it
				const firstFunction = functionsToCall.shift();
				window[firstFunction](functionsToCall);
			}
	});
}

function setCurrentVersion()
{
	const caller = "setCurrentVersion:";
	const currentVersion = versionsWithMigrations.at(-1);
	console.log(caller, "currentVersion:", currentVersion);
	safeSetAttrs({ "data_version": currentVersion });
}

function callNextMigration(migrationChain)
{
	const caller = "callNextMigration:";
	if (migrationChain && migrationChain.length > 0)
	{
		const nextMigration = migrationChain.shift();
		if (nextMigration) {
			console.log(caller, "nextMigration:", nextMigration);
			window[nextMigration](migrationChain);
		}
	}
}
/* initialization_migration_common end */
