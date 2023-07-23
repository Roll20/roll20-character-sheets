

// Clear the scheduled updates on a kScaffold `attributes` object
const clearAttributesUpdates = function (attributes) {
    const updates = attributes.updates;
    // From https://stackoverflow.com/questions/684575/how-to-quickly-clear-a-javascript-object
    // NOTE: we don't really now what the `updates` object is, so use the safer deletion code
    for (const prop of Object.getOwnPropertyNames(updates)) {
        delete updates[prop];
    }
};

// Function to help building update function that are properly hooked up in our system
// It wraps a function such that:
//  - If the wrapped function fails and raises an exception:
//    - All pending update on the `attributes` object are cleared
//    - An error alert is created with the error details to notify the player
//    - The `update_error_rowid` hidden attribute is set to the RowID of the created alert
//    - Forces an update of the sheet's attribute, to effectively create said alert and store the RowID
//    - Forwards the caugh error to the caller to interrupt kScaffold update mecanism
//  - If the `update_error_rowid` hidden attribute is set at the start of the function, it immediatly
//    error outs, preventing kScaffold update from running to completion. This is because there is still
//    an error on the sheet that prevents the update from working, so we cannot continue.
const wrapUpdateFunction = function (func) {
    const wrapper = function ({ trigger, attributes, sections, casc }) {
        // If the update system is currently on hold due to an error, exit early
        if (attributes["update_error_rowid"]) {
            k.debug(`The update system is locked by alert row ${attributes["update_error_rowid"]}, exiting update stack...`);
            throw new Error(`Interrupted updates: previous error at row ${attributes["update_error_rowid"]} is locking updates`);
        }
        // Try to execute the wrapped function
        try {
            func({ trigger, attributes, sections, casc });
        } catch (error) {
            // Update function failed, notify the user and exit
            // First, cancel pending updates: update function may have scheduled partial updates
            clearAttributesUpdates(attributes);
            // Then, generate a new alert for the user
            const text = `An update of the sheet failed. Please contact the sheet developpers for help (see the Help menu). Please provide the full stacktrace below when reporting errors.

The update system has been locked so that you can fix the problem. Closing this alert will unlock the update system and trigger a new update attempt the next time the sheet is opened.

Stacktrace for function '${func.name || '<anonymous>'}'
──────────
${error.stack}
${error}
`;
            const row_name = kCreateAlert({
                name: "global-alerts",
                title: "!! Update error !! Your sheet is likely broken, please read on",
                text,
                level: "error",
                attributes,
                sections,
            });
            // Register the error to lock the update system
            const [section, rowID, attrName] = k.parseRepeatName(row_name);
            attributes["update_error_rowid"] = rowID;
            // Forcefully update the attributes of the sheet, because we'll throw an Error so kScaffold won't do it
            attributes.set({ attributes });
            k.debug(`Locked update execution on alert row ${rowID}`);
            // Finally, forward our error to the caller
            throw error;
        }

    };
    return wrapper;
};

const onAlertRemoved = function ({ trigger, attributes, sections, casc }) {
    if (attributes["update_error_rowid"]) {
        const [section, rowID, attrName] = k.parseTriggerName(trigger.name);
        // Roll20 event contain a lowercase rowID. There *is* a risk of clash, but we can't do better
        // We also lowercase the event in case this changes in the future, so that the sheet doesn't break
        if (rowID.toLowerCase() === attributes["update_error_rowid"].toLowerCase()) {
            k.debug(`Cleared attribute 'update_error_rowid' because row ${rowID} was deleted`);
            attributes["update_error_rowid"] = "";
            // TODO: trigger an update by calling a k.updateSheet when this is possible
        }
    }
    kDeleteAlert({ trigger, attributes, sections, casc });
};
k.registerFuncs({ onAlertRemoved });


const updateSpellArts = wrapUpdateFunction(
    function updateSpellArts({ attributes, sections }) {
        // Only update if the update was not previously applied
        // In the old sheet system, we had an explicit attribute to hide/display
        // each alert, and updating spells was conditionned on this alert being shown
        // We re-use that legacy attribute to detect if the alert is needed. It
        // Is forcefully registered into k-scaffold in _updates.pug, so k-Scaffold
        // loads it if available
        if (attributes["alert-161-spell-update"] === 0) {
            const techRename = {
                0: "unselected",
                1: "Creo",
                2: "Intellego",
                3: "Muto",
                4: "Perdo",
                5: "Rego"
            };
            const formRename = {
                0: "unselected",
                1: "Animal",
                2: "Aquam",
                3: "Auram",
                4: "Corpus",
                5: "Herbam",
                6: "Ignem",
                7: "Imaginem",
                8: "Mentem",
                9: "Terram",
                10: "Vim"
            };
            const ids = sections.repeating_weapons || [];
            const details = [];
            for (const rowID of ids) {
                const row = `repeating_spell_${rowID}`;
                attributes[`${row}_spell_tech_name`] = techRename[attributes[`${row}_Technique_select`]] || "unselected";
                attributes[`${row}_spell_form_name`] = formRename[attributes[`${row}_Form_select`]] || "unselected";
                details.push(attributes[`${row}_spell_name`]);
            }
            if (details.length) {
                message = [
                    "Spells technique & form selection have been converted to the new format",
                    ""
                ];
                details.forEach(name => message.push(`  - Updated spell '${name}'`));
                helpers.alerts.add({
                    title: "Update v1.6.1 - Spell update",
                    text: message.join("\n"),
                    level: "success",
                    attributes: attributes,
                    sections: sections,
                });
            }
        }
    }
);


const renameWeaponAttributes = wrapUpdateFunction(
    function renameWeaponAttributes({ attributes, sections }) {
        const fixes = {
            "_Wounds_Load": "_Weapon_Load",
            "_Wounds_Range": "_Weapon_Range",
        };
        const ids = sections.repeating_weapons || [];
        const details = [];
        for (const id of ids) {
            // Sometimes the array of ids contains an empty string
            if (id) {
                for (const [old, updated] of Object.entries(fixes)) {
                    const old_name = `repeating_weapons_${id}${old}`;
                    const new_name = `repeating_weapons_${id}${updated}`;
                    if (attributes[old_name]) {
                        attributes[new_name] = attributes[old_name];
                        attributes[old_name] = "";
                        details.push(attributes[`repeating_weapons_${id}_Weapon_name`]);
                    }
                }
            }
        }
        if (details.length) {
            message = [
                "Weapons internal attributes have been corrected.",
                ""
            ];
            details.forEach(name => message.push(`  - Updated weapon '${name}'`));
            helpers.alerts.add({
                title: "Update v1.7 - Magic & Armory",
                text: message.join("\n"),
                level: "success",
                attributes: attributes,
                sections: sections,
            });
        }
    }
);

// NOTE: not wrapped by wrapUpdateFunction because sub-functions already are
const updateToKScaffold = function updateToKScaffold({ trigger, attributes, sections, casc }) {
    // This attribute is only defined on old sheets
    if (typeof attributes["notNew"] !== "undefined") {
        updateSpellArts({ trigger, attributes, sections, casc });
        renameWeaponAttributes({ trigger, attributes, sections, casc });
    }
};
k.registerFuncs({ updateToKScaffold }, { type: ["new"] });

// const _testAlerts = function ({ trigger, attributes, sections }) {
//     ["info", "warning", "error", "success"].forEach(level => {
//         kCreateAlert({
//             name: "global-alerts",
//             title: "test alert",
//             text: "test alert\nnewline",
//             level,
//             attributes,
//             sections

//         });
//     });
// }
// k.registerFuncs({ _testAlerts }, { type: ["opener"] });

// const displayKScaffoldArgs = function ({ trigger, attributes, sections, casc }) {
//     console.log("Displaying kScaffold arguments");
//     console.log(trigger);
//     console.log(attributes);
//     console.log(sections);
//     console.log(casc);
// };

// k.registerFuncs({ displayKScaffoldArgs }, { type: ["opener"] });
