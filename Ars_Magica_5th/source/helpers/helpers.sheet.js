const helpers = {
};

/**
 * The function to create a new alert in an `+alert` mixin. Retruns the RowID (including the repeating secgion namt) of the created alert.
 * @memberof Sheetworkers
 * @param {string} name - The name of the alert. It will be prepended by `repeating_alerts--`. Note that contrary to the PUG mixin, this doesn't sanitize the name, so you'll need to spell out the sanitized version.
 * @param {string} title - The text to put in the title of the alert, after the level icon.
 * @param {string} text - The text to write as the content of the alert. Can contain newlines, as it is written to a textarea.
 * @param {Object} attributes - The `attributes` object given by k-Scaffold that contains the attributes of the sheet
 * @param {Object} sections - The `sections` object given by k-Scaffold that contains the sections of the sheet
 * @param {level} string - The level of the alert. One of "info", "warning", "error", "success". Changes the default styling of the alert.
 */
const kCreateAlert = function ({ name, title, text, attributes, sections, level = "info" }) {
    if (["info", "warning", "error", "success"].indexOf(level) === -1) {
        throw new Error(`Invalid alert level "${level}"`);
    }
    // Warning: the name isn't sanitized like it is in the PUG, might create discrepancies
    const section = `repeating_alerts--${name}`;
    // Contrary to doc, k.generateRowID also includes the section name in the returned value
    const rowID = k.generateRowID(section, sections);
    attributes[`${rowID}_level`] = level;
    attributes[`${rowID}_title`] = title;
    attributes[`${rowID}_text`] = text;
    return rowID;
};

/**
 * The default trigger called when one clicks the close button on an alert. Deletes the triggering alert from the repeating section.
 * @memberof Sheetworkers
 * @param {string} trigger - The trigger object passed by kScaffold
 * @param {Object} attributes - The `attributes` object given by k-Scaffold that contains the attributes of the sheet
 * @param {Object} sections - The `sections` object given by k-Scaffold that contains the sections of the sheet
 */
const kDeleteAlert = function ({ trigger, attributes, sections }) {
    const [section, rowID, _] = k.parseTriggerName(trigger.name);
    k.removeRepeatingRow(`${section}_${rowID}`, attributes, sections);
};

k.registerFuncs({ "kDeleteAlert": kDeleteAlert });