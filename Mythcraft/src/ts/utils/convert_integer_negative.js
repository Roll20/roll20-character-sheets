var convertIntegerNegative = function (number) {
    return number > 0 ? -Math.abs(number) : number;
};
var convertIntegersNegatives = function (numbers) {
    var negativeNumbers = {};
    for (var _i = 0, _a = Object.entries(numbers); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        negativeNumbers[key] = convertIntegerNegative(value);
    }
    return negativeNumbers;
};
