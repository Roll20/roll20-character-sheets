/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/* Utility functions */
const sign = (value) => {
    const val = parseInt(value) || 0;
    if (val >= 0) return `+${val}`;
    else return `${val}`;
};
const sum = (list) => list.reduce((m, c) => m + (parseInt(c) || 0), 0);
const buildLink = (caption, ability, last) => `[${caption}${!last ? "," : ""}](~${ability})`;
const mySetAttrs = (setting, values, ...rest) => {
    // This is a version of setAttrs that expects an extra values parameter
    // (as received from getAttrs). It will only set values in setting that differ
    // from their current value on the sheet. The intention is to not
    // set values unnecessarily (it's expensive) and to reduce bloat
    // in the Attributes & Abilities tab.
    Object.keys(setting).forEach(k => {
        if (`${values[k]}` === `${setting[k]}`) delete setting[k];
    });
    setAttrs(setting, ...rest);
};
const fillRepeatingSectionFromData = (sName, data, callback) => {
    // Populates the repeating section repeating_${SName} with new
    // rows from the data array. Every entry of the array is expected
    // to be an object, and its key/value pairs will be written into
    // the repeating section as a new row. If data is not an array
    // but a single object, it will be treated like an array with
    // a single element.
    callback = callback || (() => {});
    const createdIDs = [],
        getRowID = () => {
            while (true) {
                let newID = generateRowID();
                if (!createdIDs.includes(newID)) {
                    createdIDs.push(newID);
                    return newID;
                }
            }
        };
    const setting = (Array.isArray(data) ? data : [data]).map(o => {
        const newID = getRowID();
        return Object.entries(o).reduce((m, [key, value]) => {
            m[`repeating_${sName}_${newID}_${key}`] = `${value}`;
            return m;
        }, {});
    }).reduce((m, o) => Object.assign(m, o), {});
    setAttrs(setting, {}, callback);
};