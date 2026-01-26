"use strict";

usedModifier = function usedModifier(e, callback) {
  var queryModifier = 0;
  getAttrs(['useKey', 'global_modifier_number'], function (values) {
    var useKey = values['useKey'];
    var globalModifier = parseInt(values['global_modifier_number']) || 0;

    if (useKey === 'global') {
      queryModifier = globalModifier;
    }

    if (e.altKey && useKey === 'alt') {
      queryModifier = _queryModifier;
    }

    if (e.ctrlKey && useKey === 'ctrl') {
      queryModifier = _queryModifier;
    }

    if (e.metaKey && useKey === 'meta') {
      queryModifier = _queryModifier;
    }

    if (e.shiftKey && useKey === 'shift') {
      queryModifier = _queryModifier;
    }

    if (useKey === 'none') {
      queryModifier = _queryModifier;
    }

    console.log("queryModifier: ".concat(queryModifier));
    callback(queryModifier);
  });
};