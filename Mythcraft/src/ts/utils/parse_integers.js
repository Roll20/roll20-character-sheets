var parseInteger = function (string) { return parseFloat(string) || 0; };
var parseIntegers = function (values) {
    var parsedNumbers = {};
    for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (typeof value === "string") {
            parsedNumbers[key] = parseInteger(value);
        }
        else if (typeof value === "number") {
            parsedNumbers[key] = value;
        }
    }
    return parsedNumbers;
};
