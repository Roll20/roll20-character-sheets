/* initialization migration common begin */
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
function migrationCheck() {
		safeGetAttrs(["character_sheet_version", "data_version", "sheet_initialized"], function(v) {
				var caller = "migrationCheck";
				debugLog(caller, "Sheet Initialization Status:", v["sheet_initialized"]);
				debugLog(caller, "Checking versions before attempting data migration: Character sheet version is", v["character_sheet_version"], "and data version is", v["data_version"]);

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
						debugLog(caller, "initialized is false.");
						initialized = false;
				} else {
						debugLog(caller, "initialized is true. Skipping initialization.");
						initialized = true;
				}

				let functionsToCall = [];
				let firstFunction;

		if (initialized)
		{
						/*
								we run over the possible migrations and check if they are already applied.
								if not and it is the first migration, than the function name is saved as "firstFunction"
								if it is not the first migration to apply it is added to "functionsToCall" array
						*/
						for (version of versionsWithMigrations) {
								if (dataVersion < version) {
										var functionName = "migrateTo" + version;
										debugLog(caller, "dataVersion " + dataVersion + " is older than version " + version + " which needs a migration. Invoking migration function: " + functionName);
										if (firstFunction) {
												functionsToCall.push(functionName);
										} else {
												firstFunction = functionName;
										}
								};
						}
				} else {
			firstFunction = "initializeSheet";
				}

				// if there is at least one migration to do we add "setCurrentVersion" to the end of the function list which is responsible to set the current dataversion
				// then we call the function with name "firstFunction"
				if (firstFunction) {
						functionsToCall.push("setCurrentVersion");
						window[firstFunction](functionsToCall);
				}
		});
}

function setCurrentVersion() {
	var currentVersion = versionsWithMigrations.slice(-1).pop();
	safeSetAttrs({ "data_version": currentVersion });
}

function callNextMigration(migrationChain) {
		if (migrationChain && migrationChain.length > 0) {
				let nextMigration = migrationChain.shift();
				if (nextMigration) {
						window[nextMigration](migrationChain);
				}
		}
}
/* initialization migration common end */
