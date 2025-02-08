var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var versioningAttr = "latest_versioning_upgrade";
on("sheet:opened", function () {
    getAttrs([versioningAttr], function (v) {
        versioning(parseFloat(v[versioningAttr]) || 1);
    });
});
var versionOneOne = function () {
};
var versioning = function (version) { return __awaiter(_this, void 0, void 0, function () {
    var updateMessage;
    var _a;
    return __generator(this, function (_b) {
        updateMessage = function (v) {
            return console.log("%c Sheet is updating to ".concat(v), "color: orange; font-weight:bold");
        };
        switch (true) {
            case version < 1:
                versioning(1);
                updateMessage(1);
                break;
            case version < 1.1:
                updateMessage(1.1);
                versionOneOne();
                versioning(1.1);
                break;
            default:
                console.log("%c Sheet is update to date.", "color: green; font-weight:bold");
                setAttrs((_a = { version: version }, _a["".concat(versioningAttr)] = version, _a));
        }
        return [2];
    });
}); };
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
var createAttributeName = function (name) {
    return name === null || name === void 0 ? void 0 : name.replace(/ /g, "_").toLowerCase();
};
var findRepeatingFieldName = function (trigger) { return trigger.split("_")[1]; };
var getReprowAttributeName = function (key) {
    var reprowid = getReprowid(key);
    return key.split("".concat(reprowid, "_"))[1];
};
var getReprowid = function (trigger) {
    var split = trigger.split("_");
    return "".concat(split[0], "_").concat(split[1], "_").concat(split[2]);
};
var getTranslations = function (translationKeys) {
    var translations = {};
    translationKeys.forEach(function (obj) {
        Object.keys(obj).forEach(function (key) {
            var translation = getTranslationByKey(key);
            if (typeof translation === "string") {
                translations["".concat(key)] = translation;
            }
        });
    });
    return translations;
};
var parseInteger = function (string) { return parseFloat(string) || 0; };
var parseIntegers = function (numbers) {
    var parsedNumbers = {};
    for (var _i = 0, _a = Object.entries(numbers); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        parsedNumbers[key] = parseInteger(value);
    }
    return parsedNumbers;
};
var sliceAttribute = function (attribute) { return attribute.slice(2, -1); };
var sumIntegers = function (numbers) { return numbers.reduce(function (a, b) { return a + b; }, 0); };
