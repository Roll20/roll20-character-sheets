/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
/**
 * Alias for [setSectionOrder()](https://wiki.roll20.net/Sheet_Worker_Scripts#setSectionOrder.28.3CRepeating_Section_Name.3E.2C_.3CSection_Array.3E.2C_.3CCallback.3E.29) that allows you to use the section name in either `repeating_section` or `section` formats.
 * @name setSectionOrder
 * @param {string} section
 * @param {string[]} order
 * @returns {void}
 */
docs.js['k.setSectionOrder'] = {
  type:'function',
  description:'Alias for [setSectionOrder()](https://wiki.roll20.net/Sheet_Worker_Scripts#setSectionOrder.28.3CRepeating_Section_Name.3E.2C_.3CSection_Array.3E.2C_.3CCallback.3E.29) that allows you to use the section name in either `repeating_section` or `section` formats. Note that the Roll20 sheetworker [setSectionOrder](https://wiki.roll20.net/Sheet_Worker_Scripts#setSectionOrder.28.3CRepeating_Section_Name.3E.2C_.3CSection_Array.3E.2C_.3CCallback.3E.29) currently causes some display issues on sheets.',
  arguments:[
    {type:'string',name:'section',description:'The name of the section to change the order in. Accepts the section name with or without the `repeating_` prefix.'},
    {type:'[\'string\']',name:'order',description:'Array of the row ids in the order that the rows need to be placed.'}
  ]
};
const _setSectionOrder = function(section,order){
  let trueSection = section.replace(/repeating_/,'');
  setSectionOrder(trueSection,order);
};
kFuncs.setSectionOrder = _setSectionOrder;

/**
 * Alias for [removeRepeatingRow](https://wiki.roll20.net/Sheet_Worker_Scripts#removeRepeatingRow.28_RowID_.29) that also removes the row from the current object of attribute values and array of section IDs to ensure that erroneous updates are not issued.
 * @name removeRepeatingRow
 * @param {string} row - The row id to be removed
 * @param {attributesProxy} attributes - The attribute values currently in memory
 * @param {object} sections - Object that contains arrays of all the IDs in sections on the sheet indexed by repeating name.
 * @returns {void}
 */
docs.js['k.removeRepeatingRow'] = {
  type:'function',
  description:'Alias for [removeRepeatingRow](https://wiki.roll20.net/Sheet_Worker_Scripts#removeRepeatingRow.28_RowID_.29) that also removes the row from the current object of attribute values and array of section IDs to ensure that erroneous updates are not issued.',
  arguments:[
    {type:'string',name:'row',description:'The row id including the section name, e.g. `repeating_equipment_-oiuLKJ987ulkj`.'},
    {type:'object',name:'attributes',description:'The attributes object passed to the callback in [k.getAllAttrs()](#getAllAttrs), [k.getAttrs()](#getAttrs), or [getAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29)'},
    {type:'object',name:'sections',description:'Object that contains arrays of all the IDs in sections on the sheet indexed by repeating name.'}
  ]
};
const _removeRepeatingRow = function(row,attributes,sections){
  debug(`removing ${row}`);
  Object.keys(attributes.attributes).forEach((key)=>{
    if(key.startsWith(row)){
      delete attributes[key];
    }
  });
  let [,section,rowID] = row.match(/(repeating_[^_]+)_(.+)/,'');
  sections[section] = sections[section].filter((id)=>id!==rowID);
  removeRepeatingRow(row);
};
kFuncs.removeRepeatingRow = _removeRepeatingRow;

/**
 * Alias for [getAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29) that converts the default object of attribute values into an {@link attributesProxy} and passes that back to the callback function.
 * @name getAttrs
 * @param {Object} args
 * @param {string[]} [args.props=baseGet] - Array of attribute names to get the value of. Defaults to {@link baseGet} if not passed.
 * @param {function(attributesProxy)} args.callback - The function to call after the attribute values have been gotten. An {@link attributesProxy} is passed to the callback.
 */
docs.js['k.getAttrs'] = {
  type:'function',
  invocation:`k.getAttrs({props,callback})`,
  description:'Alias for [getAttrs](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28_RowID_.29) that converts the default object of attribute values into a K-scaffold attributes object and passes that back to the callback function.',
  arguments:[
    {type:'array',name:'props',description:'Array of attribute names to get the values of as per the [getAttrs() sheetworker](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29). If not passed, gets all the attributes contained in the cascades object.'},
    {type:'function',name:'callback',description:'The function to call after the attribute values have been gotten. Works the same as the callback for the [getAttrs() sheetworker](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29).'}
  ]
};
const _getAttrs = function({props=baseGet,callback}){
  getAttrs(props,(values)=>{
    const attributes = createAttrProxy(values);
    callback(attributes);
  });
};
kFuncs.getAttrs = _getAttrs;

/**
 * Alias for [getAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29) and [getSectionIDs](https://wiki.roll20.net/Sheet_Worker_Scripts#getSectionIDs.28section_name.2Ccallback.29) that combines the actions of both sheetworker functions and converts the default object of attribute values into an {@link attributesProxy}. Also gets the details on how to handle all attributes from the master {@link cascades} object and.
 * @param {Object} args
 * @param {string[]} [args.props=baseGet] - Array of attribute names to get the value of. Defaults to {@link baseGet} if not passed.
 * @param {repeatingSectionDetails} sectionDetails - Array of details about a section to get the IDs for and attributes that need to be gotten. 
 * @param {function(attributesProxy,sectionObj,expandedCascade):void} args.callback - The function to call after the attribute values have been gotten. An {@link attributesProxy} is passed to the callback along with a {@link sectionObj} and {@link expandedCascade}.
 */
docs.js['k.getAllAttrs'] = {
  type:'function',
  invocation:`k.getAllAttrs({props,sectionDetails,callback})`,
  description:'Alias for [getAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29) and [getSectionIDs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getSectionIDs.28section_name.2Ccallback.29) that combines the actions of both sheetworker functions and converts the default object of attribute values into a K-scaffold attributes object. ',
  arguments:[
    {type:'array',name:'props',description:'Array of attribute names to get the values of as per the [getAttrs() sheetworker](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29).'},
    {type:'array',name:'sectionDetails',description:'An array of objects that contain the details on how to handle a given repeating section. See [k.getSections](#getSections) for more details.'},
    {type:'function',name:'callback(attributes,sections,casc)',description:'The function to call after the attribute values have been gotten. Three arguments are passed to the callback; `attributes`, `sections`, and `casc`. `sections` is an object that holds arrays of row ids, indexed by repeating section name. `casc` is the expanded version of the cascades object with repeating attributes including their row IDs.'}
  ]
};
const getAllAttrs = function({props=baseGet,sectionDetails=repeatingSectionDetails,callback}){
  getSections(sectionDetails,(repeats,sections)=>{
    getAttrs([...props,...repeats],(values)=>{
      const attributes = createAttrProxy(values);
      orderSections(attributes,sections);
      const casc = expandCascade(cascades,sections,attributes);
      callback(attributes,sections,casc);
    })
  });
};
kFuncs.getAllAttrs = getAllAttrs;

/**
 * Alias for [getSectionIDs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getSectionIDs.28section_name.2Ccallback.29) that allows you to iterate through several functions at once. Also assembles an array of repeating attributes to get.
 * @param {object[]} sectionDetails - Array of details about a section to get the IDs for and attributes that need to be gotten.
 * @param {string} sectionDetails.section - The full name of the repeating section including the `repeating_` prefix.
 * @param {string[]} sectionDetails.fields - Array of field names that need to be gotten from the repeating section
 * @param {function(string[],sectionObj)} callback - The function to call once all IDs have been gotten and the array of repating attributes to get has been assembled. The callback is passed the array of repating attributes to get and a {@link sectionObj}.
 * @returns {void}
 */
docs.js['k.getSections'] = {
  type:'function',
  invocation:`k.getSections(sectionDetails,callback)`,
  description:'Alias for [getSectionIDs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getSectionIDs.28section_name.2Ccallback.29) that allows you to iterate through several sections at once. Also assembles an array of repeating attributes to get.',
  arguments:[
    {type:'array',name:'props',description:'Array of attribute names to get the values of as per the [getAttrs() sheetworker](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29).'},
    {type:'array',name:'sectionDetails',description:'An array of objects that contain the details on how to handle a given repeating section. See [k.repeatingSectionDetails](#krepeatingsectiondetails) for more details.'},
    {type:'function',name:'callback(repeatAttrs,sections)',description:'The function to call after the attribute values have been gotten. Two arguments are passed to the callback; `repeatAttrs` and `sections`. `repeatAttrs` is an array of repeating attributes ready to be used in a [getAttrs](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29), or [k.getAttrs](#kgetattrs) call. `sections` is an object that holds arrays of row ids, indexed by repeating section name.'}
  ]
};
const getSections = function(sectionDetails,callback){
  let queueClone = _.clone(sectionDetails);
  const worker = (queue,repeatAttrs=[],sections={})=>{
    let detail = queue.shift();
    getSectionIDs(detail.section,(IDs)=>{
      sections[detail.section] = IDs;
      IDs.forEach((id)=>{
        detail.fields.forEach((f)=>{
          repeatAttrs.push(`${detail.section}_${id}_${f}`);
        });
      });
      repeatAttrs.push(`_reporder_${detail.section}`);
      if(queue.length){
        worker(queue,repeatAttrs,sections);
      }else{
        callback(repeatAttrs,sections);
      }
    });
  };
  if(!queueClone[0]){
    callback([],{});
  }else{
    worker(queueClone);
  }
};
kFuncs.getSections = getSections;

// Sets the attributes while always calling with {silent:true}
// Can be awaited to get the values returned from _setAttrs
/**
 * Alias for [setAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#setAttrs.28values.2Coptions.2Ccallback.29) that sets silently by default.
 * @name setAttrs
 * @param {object} obj - The object containting attributes to set
 * @param {boolean} [vocal=false] - Whether to set silently (default value) or not.
 * @param {function()} [callback] - The callback function to invoke after the setting has been completed. No arguments are passed to the callback function.
 * @returns {void}
 */
docs.js['k.setAttrs'] = {
  type:'function',
  invocation:`k.setAttrs(setObj,vocal,callback)`,
  description:'Alias for [setAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#setAttrs.28values.2Coptions.2Ccallback.29) that sets silently by default.',
  arguments:[
    {type:'object',name:'setObj',description:'Object with key/value pairs of attributes to set on the sheet. See [the wiki page](https://wiki.roll20.net/Sheet_Worker_Scripts#setAttrs.28values.2Coptions.2Ccallback.29) for more information.'},
    {type:'boolean',name:'vocal',description:'Whether to set silently (default value) or not.'},
    {type:'function',name:'callback()',description:'The callback function to invoke after the setting has been completed. No arguments are passed to the callback function.'}
  ]
};
const set = function(obj,vocal=false,callback){
  setAttrs(obj,{silent:!vocal},callback);
};
kFuncs.setAttrs = set;

const generateCustomID = function(string){
  if(!string.startsWith('-')){
    string = `-${string}`;
  }
  rowID = generateRowID();
  let re = new RegExp(`^.{${string.length}}`);
  return `${string}${rowID.replace(re,'')}`;
};


/**
 * Alias for generateRowID that adds the new id to the {@link sectionObj}. Also allows for creation of custom IDs that conform to the section ID requirements.
 * @name generateRowID
 * @param {string} section - The section name to create an ID for. The `repeating_` prefix is optional so both `repeating_equipment` and `equipment` are valid.
 * @param {sectionObj} sections
 * @param {string} [customText] - Custom text to start the ID with. This text should not be longer than the standard repeating section ID format.
 * @returns {any}
 */
docs.js['k.generateRowID'] = {
  type:'function',
  invocation:`k.generateRowID(section,sections,customText)`,
  description:'Alias for generateRowID that adds the new id to the sections object. Also allows for creation of custom IDs that conform to the section ID requirements.',
  arguments:[
    {type:'string',name:'setObj',description:'The section name to create an ID for. The `repeating_` prefix is optional so both `repeating_equipment` and `equipment` are valid.'},
    {type:'object',name:'vocal',description:'Object containing the IDs for the repeating sections, indexed by repeating section name.'},
    {type:'string',name:'customText',description:'Custom text to start the ID with. This text should not be longer than the standard repeating section ID format.'}
  ]
};
const _generateRowID = function(section,sections,customText){
  let rowID = customText ?
    generateCustomID(customText) :
    generateRowID();
  section = section.match(/^repeating_[^_]+$/) ?
    section :
    `repeating_${section}`;
  sections[section] = sections[section] || [];
  sections[section].push(rowID);
  return `${section}_${rowID}`;
};
kFuncs.generateRowID = _generateRowID;