/**
 * Checks if a repcontain (e.g. repeating_weapons) is empty.
 * This is calculated by looking at the length of IDs in fieldset.
 * @param {string} section name of a repeating fieldset (repcontainer)
 * @param {string} suffix attribute name as section_suffix (e.g. weapons_count)
 **/
const isFieldsetEmpty = (section, suffix = 'empty') => {
  getSectionIDs(section, (id) => {
    setAttrs({ [`${section}_${suffix}`]: id.length });
  });
};

/**
 * Combines [getAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29)
 * and [getSectionIDs](https://wiki.roll20.net/Sheet_Worker_Scripts#getSectionIDs.28section_name.2Ccallback.29)
 * @param {Object} sectionDetails repeating section request
 *  @example
 *    // example of sectionDetails object
 *    const G_DEFAULT_REPEATING = [
 *      { section: "repeating_inventory", fields: ["weight", "name", "quantity"] },
 *      { section: "repeating_attack", fields: ["bonus", "damage", "name"] },
 *    ];
 * @param {string[]} getArray optional global attribute request
 * @param {callback} callback
 * @returns {(Object|Object)}
 */
const getAllAttrs = (sectionDetails, getArray, callback) => {
  const sectionClone = structuredClone(sectionDetails);

  if (typeof callback !== 'function') return;

  getSections(getArray, sectionClone, (getArr, sections) => {
    getAttrs(getArr, (attributes) => {
      // call the callback function to finally do what we wanted to do.
      callback(attributes, sections);
    });
  });
};

/**
 * Gets the rowIDs for all the sections passed to it,
 * and assembles an array of repeating attributes to get.
 * Does this via a work queue or burndown set up.
 * Arguments are the same as for getAllAttrs with the addition of sections.
 * @param {*} getArray
 * @param {*} sectionDetails
 * @param {callback} callback
 * @param {*} sections accumulates the idArrays for each section
 */
const getSections = (getArray, sectionDetails, callback, sections = {}) => {
  // grab the first section to work;
  const section = sectionDetails.shift();
  getSectionIDs(section.section, (idArray) => {
    // store the idArray for use later on if needed.
    sections[section.section] = [...idArray];

    // add the sections reporder to the getArray so that we can order the idArray later.
    getArray.push(`_reporder_${section.section}`);
    // iterate through the ids

    for (const id of idArray) {
      // Iterate through each of the fields for the repeating section
      for (const field of section.fields) {
        // add the repeating attribute for this id to the getArray
        getArray.push(`${section.section}_${id}_${field}`);
      }
    }

    if (sectionDetails[0]) {
      // If there's another section to work through, go through the burndown again
      getSections(getArray, sectionDetails, callback, sections);
    } else {
      // If no sections are left, call the callback
      callback(getArray, sections);
    }
  });
};

/**
 * Splits a comma delimited string into an array
 * @param {string} string
 * @returns {Array}
 */
const commaArray = (string = '') => {
  return string.toLowerCase().split(/\s*,\s*/);
};
