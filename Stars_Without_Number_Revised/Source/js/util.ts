/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/* Utility functions */
const sign = (value: number | string):string => {
    const val = typeof value === "string" ? parseInt(value) || 0 : value
    if (val >= 0) return `+${val}`;
    else return `${val}`;
};
const sum = (list: string[]) => list.reduce((m, c) => m + (parseInt(c) || 0), 0);
const buildLink = (caption: string, ability: string, last?: boolean) => `[${caption}${!last ? "," : ""}](~${ability})`;
const mySetAttrs = (setting: {[key: string]: AttributeContent}, values: {[key: string]: string}, options?: {silent: boolean}, callback?: (values: {[key: string]: string}) => void) => {
    // This is a version of setAttrs that expects an extra values parameter
    // (as received from getAttrs). It will only set values in setting that differ
    // from their current value on the sheet. The intention is to not
    // set values unnecessarily (it's expensive) and to reduce bloat
    // in the Attributes & Abilities tab.
    Object.keys(setting).forEach(k => {
        if (`${values[k]}` === `${setting[k]}`) delete setting[k];
    });
    setAttrs(setting, options, callback)
};
