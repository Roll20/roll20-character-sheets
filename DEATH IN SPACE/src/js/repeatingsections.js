/**
  Checks if a repcontain (e.g. repeating_weapons) is empty.
  This is calculated by looking at the length of IDs in fieldset.
  @param {string} section: name of a repeating fieldset (repcontainer)
**/
const isFieldsetEmpty = (section) => {
  getSectionIDs(section, (id) => {
    const update = {};
    update[`is_${section}_empty`] = id.length;
    setAttrs(update);
  });
};

/**
  Gets all attributes, both repeating and non-repeating.
  Default sectionDetails to a shallow clone of the global G_DEFAULT_REPEATING;
  We're cloning because we'll be manipulating the array.
  @param sectionDetails:  an object containing the idArrays for each
    repeating section, sorted based on their current order.
    Example:
      const G_DEFAULT_REPEATING = [
        { section: "repeating_inventory", fields: ["weight", "name", "quantity"] },
        { section: "repeating_attack", fields: ["bonus", "damage", "name"] },
      ];
  @param getArray: an object containing all the attribute values
  @returns
    @param attributes: similar to getAttrs; object containing field names as key and values.
    @param sections: similar to getSectionIDs; object containing fieldset name
      as key and array of IDs as value.
**/
const getAllAttrs = function (callback, sectionDetails = [], getArray = []) {
  getSections(getArray, sectionDetails, (getArr, sections) => {
    getAttrs(getArr, (attributes) => {
      // order the sections
      // orderSections(attributes, sections);

      // call the callback function to finally do what we wanted to do.
      callback(attributes, sections);
    });
  });
};

/**
  Gets the rowIDs for all the sections passed to it,
  and assembles an array of repeating attributes to get
  Does this via a work queue or burndown set up
  Arguments are the same as for getAllAttrs with the addition of sections
  @param sections: accumulates the idArrays for each section
**/
const getSections = function (getArray = [], sectionDetails = [], callback, sections = {}) {
  // grab the first section to work;
  let section = sectionDetails.shift();
  getSectionIDs(section.section, (idArray) => {
    // store the idArray for use later on if needed.
    sections[section.section] = [...idArray];

    // add the sections reporder to the getArray so that we can order the idArray later.
    // getArray.push(`_reporder_${section.section}`);

    // iterate through the ids
    idArray.forEach((id) => {
      // Iterate through each of the fields for the repeating section
      section.fields.forEach((field) => {
        // add the repeating attribute for this id to the getArray
        getArray.push(`${section.section}_${id}_${field}`);
      });
    });
    if (sectionDetails[0]) {
      // If there's another section to work through, go through the burndown again
      getSections(getArray, sectionDetails, callback, sections);
    } else {
      // If no sections are left, call the callback
      callback(getArray, sections);
    }
  });
};

// The next three functions are only used for the ID ordering.
// orders the section id arrays to match the repOrder attribute
const orderSections = function (attributes, sections) {
  Object.keys(sections).forEach((section) => {
    attributes[`_reporder_${section}`] = commaArray(attributes[`_reporder_${section}`]);
    orderSection(attributes[`_reporder_${section}`], sections[section]);
  });
};

// splits a comma delimited string into an array
const commaArray = function (string = '') {
  return string.toLowerCase().split(/\s*,\s*/);
};

// orders a single ID array
const orderSection = function (repOrder, IDs = []) {
  IDs.sort((a, b) => {
    return repOrder.indexOf(a.toLowerCase()) - repOrder.indexOf(b.toLowerCase());
  });
};

/* Example: Sum inventory weight*quantity and available carrying capacity:
  on("change:repeating_inventory:weight change:repeating_inventory:quantity", (event) => {
    getAllAttrs((attributes, sections) => {
      const setObj = {};
      setObj.total_weight = sections.repeating_inventory.reduce((memo, id) => {
        memo += value(attributes[`repeating_inventory_${id}_weight`])*value(attributes[`repeating_inventory_${id}_quantity`]);
      }, 0);
      setObj.available_weight = value(attributes.strength_mod)*value(attributes.size)*10 - setObj.total_weight;
      setAttrs(setObj, {silent:true});
    }, [], ["strength_mod", "size"]); // calling with default section details
  });
*/
