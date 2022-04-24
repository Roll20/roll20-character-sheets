// ##### Utility Functions #####
var getSectionIDsOrdered = function (sectionName, callback) {
    'use strict';
    getAttrs([`_reporder_${sectionName}`], function (v) {
        getSectionIDs(sectionName, function (idArray) {
            let reporderArray = v[`_reporder_${sectionName}`] ? v[`_reporder_${sectionName}`].toLowerCase().split(',') : [],
                ids = [...new Set(reporderArray.filter(x => idArray.includes(x)).concat(idArray))];
            callback(ids);
        });
    });
};