/**
 * @typedef {object} attributesProxy
 * @property {string|number} [name_of_attribute] - Your attribute values are stored in the attribute proxy under their attribute names. You can reference the current value of the attribute by calling it directly from the proxy (e.g. `attributes.my_attribute`). This will return either the original value if no changes have been made, or the updated value if changes have previously been applied. Storing an updated value is done by simple assignment (e.g. `attributes.my_attributes = 5`).
 * @property {function} set - Applies any updates to the sheet. Also applies any repeating section reorders. This uses ES6 destructuring function argument assignment so all arguments should be passed in as properties of a single object with the indicated keys (e.g. `attributes.set({vocal:true,callback:() => log('attributes were set')})`)
 * @property {boolean=} set.vocal - set will not be silent. Inverts the standard behavior of setAttrs options object
 * @property {function=} set.callback - A callback to be invoked once the setAttrs is completed
 * @property {attributesProxy=} set.attributes - The instance of the attributeProxy to use for further set operations
 * @property {object} set.sections - An object containing the idArrays for each repeating section
 * @property {object} set.casc - as [the casc property]{@link attributesProxy#casc}
 * @property {object} attributes - The original attribute values from the getAttrs call
 * @property {object} updates - Any changes that are made by the script are stored here
 * @property {object} repOrders - any changes to repeating section orders stored here
 * @property {string[]} queue - queue of attributes affected to iterate through. Only used if the whole proxy is passed to attributes.set()
 * @property {object} casc - The details of how to handle all attributes as created from the {@link k.cascades} object by [k.getAllAttrs()]{@link k.getAllAttrs}.
 * @property {function} processChange - function to iterate through attribute changes for default handling
 * @property {function} triggerFunctions - Calls functions that are triggered whenever an attribute is changed or affected
 * @property {function} initialFunction - Calls functions that are only triggered when an attribute is the triggering event
 * @property {function} getCascObj - Gets the appropriate cascade object for a given attribute or action button
 */

/**
 * The attributes object that is generated via [createAttrProxy()]{@link createAttrProxy}, and used in [k.getAttrs()]{@link k.getAttrs} & [k.getAllAttrs()]{@link k.getAllAttrs}. This is a proxy for the basic attributes object passed to the callback in the sheetworker [getAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29).
 * @const {object}
 * @property {string|number} [name_of_attribute] - Your attribute values are stored in the attribute proxy under their attribute names. You can reference the current value of the attribute by calling it directly from the proxy (e.g. `attributes.my_attribute`). This will return either the original value if no changes have been made, or the updated value if changes have previously been applied. Storing an updated value is done by simple assignment (e.g. `attributes.my_attributes = 5`).
 * @property {function} set - Applies any updates to the sheet. Also applies any repeating section reorders. This uses ES6 destructuring function argument assignment so all arguments should be passed in as properties of a single object with the indicated keys (e.g. `attributes.set({vocal:true,callback:() => log('attributes were set')})`)
 * @property {boolean=} set.vocal - set will not be silent. Inverts the standard behavior of setAttrs options object
 * @property {function=} set.callback - A callback to be invoked once the setAttrs is completed
 * @property {attributesProxy=} set.attributes - The instance of the attributeProxy to use for further set operations
 * @property {object} set.sections - An object containing the idArrays for each repeating section
 * @property {object} set.casc - as [the casc property]{@link attributesProxy#casc}
 * @property {object} attributes - The original attribute values from the getAttrs call
 * @property {object} updates - Any changes that are made by the script are stored here
 * @property {object} repOrders - any changes to repeating section orders stored here
 * @property {string[]} queue - queue of attributes affected to iterate through. Only used if the whole proxy is passed to attributes.set()
 * @property {object} casc - The details of how to handle all attributes
 * @property {function} processChange - function to iterate through attribute changes for default handling
 * @property {function} triggerFunctions - Calls functions that are triggered whenever an attribute is changed or affected
 * @property {function} initialFunction - Calls functions that are only triggered when an attribute is the triggering event
 * @property {function} getCascObj - Gets the appropriate cascade object for a given attribute or action button
 */
const attributesProxy = {};