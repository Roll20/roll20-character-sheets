"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var BondButtonColor = function BondButtonColor(bondvalue) {
  var score = parseInt(bondvalue) || 0;
  var color = score > 0 ? 'on' : 'off';
  return color;
};

var changeBondButtonColorOnOpen = function changeBondButtonColorOnOpen() {
  getSectionIDs("bonds", function (idarray) {
    var allbonds = idarray.map(function (id) {
      return "repeating_bonds_".concat(id, "_score");
    });
    getAttrs(allbonds, function (value) {
      var update = {};
      Object.entries(value).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        var id = key.split('_')[2];
        var score = parseInt(value) || 0;
        update['repeating_bonds_' + id + '_color'] = BondButtonColor(score);
      });
      setAttrs(update, {
        silent: true
      }, function () {
        console.info('update', update);
        console.log('Bond color updated');
      });
    });
  });
};