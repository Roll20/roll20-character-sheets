var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var mentalAttributes = ["awareness", "intellect", "charisma"];
var metaphysicAttributes = ["luck", "coordination"];
var physicalAttributes = ["strength", "dexterity", "endurance"];
var attributes = __spreadArray(__spreadArray(__spreadArray([], mentalAttributes, true), metaphysicAttributes, true), physicalAttributes, true);
var action_points = ["coordination", "action_points_base"];
var hit_points = ["endurance", "hit_points_base", "level"];
var critical_range = ["critical_range", "luck", "critical_range_base"];
var armor_rating = ["armor_rating_base"];
var anticipation = ["anticipation_base", "awareness"];
var fortitude = ["fortitude_base", "endurance"];
var logic = ["logic_base", "intellect"];
var reflexes = ["reflexes_base", "dexterity"];
var willpower = ["willpower_base", "charisma"];
var dropWarning = function (v) {
    console.log("%c Compendium Drop Error: ".concat(v), "color: orange; font-weight:bold");
};
var dropAttrs = ["drop_name", "drop_data", "drop_content"];
var handle_drop = function () {
    getAttrs(dropAttrs, function (v) {
        var _a;
        if (!v.drop_name || !v.drop_data) {
            return;
        }
        var page = {
            name: v.drop_name,
            data: (_a = parseJSON(v.drop_data)) !== null && _a !== void 0 ? _a : v.drop_data,
            content: v.drop_content
        };
        var Category = page.data.Category;
        switch (Category) {
            case "Creatures":
            case "Conditions":
                handle_conditions(page);
            case "Backgrounds":
            case "Professions":
                handle_bop(page);
                break;
            case "Equipment":
                handle_equipment(page);
                break;
            case "Features":
                handle_feature(page);
                break;
            case "Lineages":
                handle_lineage(page);
            case "Skills":
                handle_skills(page);
                break;
            case "Talents":
                handle_talent(page);
                break;
            default:
                dropWarning("Unknown category: ".concat(Category));
        }
        setDropAttrs({
            drop_name: "",
            drop_data: "",
            drop_content: "",
            drop_category: ""
        });
    });
};
["data"].forEach(function (attr) {
    on("change:drop_".concat(attr), function () {
        handle_drop();
    });
});
action_points.forEach(function (attr) {
    on("change:".concat(attr), function () {
        getAttrs(action_points, function (values) {
            var _a = parseIntegers(values), coordination = _a.coordination, action_points_base = _a.action_points_base;
            var action_points_per_round = action_points_base;
            switch (coordination) {
                case -1:
                case -2:
                    action_points_per_round = action_points_base - 1 || 0;
                    break;
                case -3:
                    action_points_per_round = action_points_base - 2 || 0;
                    break;
                default:
                    action_points_per_round =
                        Math.ceil(coordination / 2) + action_points_base;
                    break;
            }
            console.table({
                coordination: coordination,
                action_points_per_round: action_points_per_round,
                action_points_base: action_points_base
            });
            setAttrs({ action_points_per_round: action_points_per_round });
        });
    });
});
hit_points.forEach(function (attr) {
    on("change:".concat(attr), function () {
        getAttrs(hit_points, function (values) {
            var _a = parseIntegers(values), endurance = _a.endurance, hit_points_base = _a.hit_points_base, level = _a.level;
            var die_pips = 0;
            var set_hit_points = 0;
            if (endurance >= -2 && endurance <= 12) {
                if (endurance === -3) {
                    die_pips = 0;
                    set_hit_points = 0;
                }
                else if (endurance >= -2 && endurance <= -1) {
                    die_pips = 2;
                    set_hit_points = 1;
                }
                else if (endurance >= 0 && endurance <= 2) {
                    die_pips = 4;
                    set_hit_points = 2;
                }
                else if (endurance >= 3 && endurance <= 5) {
                    die_pips = 6;
                    set_hit_points = 3;
                }
                else if (endurance >= 6 && endurance <= 8) {
                    die_pips = 8;
                    set_hit_points = 4;
                }
                else if (endurance >= 9 && endurance <= 11) {
                    die_pips = 10;
                    set_hit_points = 5;
                }
                else if (endurance >= 12) {
                    die_pips = 12;
                    set_hit_points = 6;
                }
            }
            var hit_point_die = die_pips ? "".concat(level, "d").concat(die_pips) : 0;
            var hit_die_formula = "".concat(hit_points_base, "+").concat(hit_point_die, "+").concat(level);
            setAttrs({ hit_point_die: hit_point_die, hit_die_formula: hit_die_formula, set_hit_points: set_hit_points });
        });
    });
});
critical_range.forEach(function (attr) {
    on("change:".concat(attr), function () {
        getAttrs(critical_range, function (values) {
            var _a = parseIntegers(values), luck = _a.luck, critical_range_base = _a.critical_range_base, critical_range = _a.critical_range;
            if (luck < 0) {
                setAttrs({
                    critical_range: 0
                });
                return;
            }
            var range = critical_range_base;
            if (luck === 12) {
                range = critical_range_base - 2;
            }
            else if (luck >= 6 && luck <= 11) {
                range = critical_range_base - 1;
            }
            var cr = range < 16 ? 16 : range;
            if (cr !== critical_range) {
                setAttrs({
                    critical_range: cr
                });
            }
        });
    });
});
on("change:luck", function () {
    getAttrs(["luck"], function (values) {
        var luck = parseInt(values.luck);
        var attrs = {};
        attrs.rerolls = Math.ceil(luck / 2) || 0;
        if (luck < 0) {
            attrs.luck_negative_modifier = luck;
        }
        else {
            attrs.luck_negative_modifier = 0;
        }
        setAttrs(attrs);
    });
});
[anticipation, fortitude, logic, reflexes, willpower].forEach(function (scoreAttributes) {
    scoreAttributes.forEach(function (attr) {
        on("change:".concat(attr), function () {
            getAttrs(scoreAttributes, function (values) {
                var _a;
                var sum = sumIntegers(Object.values(parseIntegers(values)));
                var name = scoreAttributes
                    .find(function (e) { return e.includes("base"); })
                    .replace("_base", "");
                setAttrs((_a = {}, _a[name] = sum, _a));
            });
        });
    });
});
on("change:repeating_skills:attribute", function (event) {
    var _a;
    var sourceAttribute = event.sourceAttribute, newValue = event.newValue;
    var repeatingRow = getFieldsetRow(sourceAttribute);
    var attribute = newValue.substring(2, newValue.length - 1);
    var abbreviation = getAttributeAbbreviation(attribute);
    setAttrs((_a = {}, _a["".concat(repeatingRow, "_attribute_abbreviation")] = abbreviation, _a));
});
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
            case version < 1.01:
                updateMessage(1.01);
                versioning(1.01);
                break;
            default:
                console.log("%c Sheet is update to date.", "color: green; font-weight:bold");
                setAttrs((_a = { version: version }, _a["".concat(versioningAttr)] = version, _a));
        }
        return [2];
    });
}); };
var getRow = function (section) { return "repeating_".concat(section, "_").concat(generateRowID()); };
var getUpdate = function (attrs, page, repeatingRow) {
    var update = {};
    attrs.forEach(function (attr) {
        var _a, _b;
        var sheetAttr = repeatingRow ? "".concat(repeatingRow, "_").concat(attr) : attr;
        if ((_a = page[attr]) !== null && _a !== void 0 ? _a : page.data[attr]) {
            update[sheetAttr] = (_b = page[attr]) !== null && _b !== void 0 ? _b : roll20Attribute(attr, page.data[attr]);
        }
    });
    if (repeatingRow) {
        update["".concat(repeatingRow, "_toggle_edit")] = false;
    }
    return update;
};
var parseJSON = function (jsonString) {
    try {
        if (typeof jsonString === "object") {
            return jsonString;
        }
        return JSON.parse(jsonString);
    }
    catch (e) {
        console.log("Error parsing JSON: ".concat(jsonString));
        return undefined;
    }
};
var processDataArrays = function (array, callback) {
    if (array === undefined) {
        return;
    }
    var parsed = typeof array === "string" ? parseJSON(array) : array;
    var map = parsed.map(function (e) { return callback(e); });
    return map === null || map === void 0 ? void 0 : map.reduce(function (acc, val) { return (__assign(__assign({}, acc), val)); });
};
var resetRepeatingRows = function (sections) {
    sections.forEach(function (section) {
        getSectionIDs("repeating_".concat(section), function (ids) {
            ids.forEach(function (id) {
                removeRepeatingRow("repeating_".concat(section, "_").concat(id));
            });
        });
    });
};
var resetSkillList = function (npcSkills) {
    console.log(npcSkills);
};
var roll20Attribute = function (attr, value) {
    if (attr === "attribute" && typeof value === "string") {
        return "@{".concat(createAttributeName(value), "}");
    }
    return value;
};
var setDropAttrs = function (update, silent) {
    if (silent === void 0) { silent = { silent: true }; }
    try {
        setAttrs(update, silent);
    }
    catch (e) {
        dropWarning("Error setting attributes: ".concat(e));
    }
};
var handle_bop = function (page) {
    var attrs = ["name", "occupation", "description"];
    var row = getRow("additional-info");
    var update = getUpdate(attrs, page, row);
    update["".concat(row, "_category")] = page.data.Category;
    if (page.data.Category === "Backgrounds") {
        update["background"] = page.name;
        update["occupation_tag"] = page.data.occupation;
    }
    setDropAttrs(update);
};
var handle_conditions = function (page) {
    var attrs = ["name", "description"];
    var row = getRow("conditions");
    var update = getUpdate(attrs, page, row);
    setDropAttrs(update);
};
var handle_equipment = function (page) {
    console.log(page.data);
    var attrs = ["name", "description", "cost", "tags"];
    var row = getRow("inventory");
    var update = getUpdate(attrs, page, row);
    update["".concat(row, "_qty")] = page.data.quantity ? page.data.quantity : 1;
    if (page.data.subcategory === "weapon") {
        handle_weapon(page);
    }
    setDropAttrs(update);
};
var handle_feature = function (page) {
    var attrs = ["name", "description"];
    var row = getRow("abilities");
    var update = getUpdate(attrs, page, row);
    ["lineage", "profession"].forEach(function (attr) {
        if (page.data[attr]) {
            update["".concat(row, "_source")] = page.data[attr];
        }
    });
    setDropAttrs(update);
};
var handle_lineage = function (page) {
    var attrs = ["height", "weight", "speed", "size"];
    var update = getUpdate(attrs, page);
    update["lineage"] = page.name;
    try {
        setAttrs(update, { silent: true });
    }
    catch (e) {
        dropWarning("Error setting attributes: ".concat(e));
    }
};
var handle_skills = function (page) {
    var attrs = ["name", "category", "description", "attribute"];
    var row = getRow("skills");
    var update = getUpdate(attrs, page, row);
    update["".concat(row, "_bonus")] = 1;
    if (typeof page.data.attribute === "string") {
        update["".concat(row, "_attribute_abbreviation")] = page.data.attribute.substring(0, 3);
    }
    setDropAttrs(update);
};
var handle_talent = function (page) {
    var attrs = [
        "name",
        "description",
        "level",
        "prerequisites",
        "stack",
        "track",
    ];
    var row = getRow("talents");
    var update = getUpdate(attrs, page, row);
    setDropAttrs(update);
};
var handle_weapon = function (page) {
    var attrs = [
        "apc",
        "cost",
        "damage_type",
        "damage",
        "name",
        "range",
        "reload",
        "size",
        "subcategory",
        "tags",
        "type",
        "weight",
    ];
    var row = getRow("attacks");
    var update = getUpdate(attrs, page, row);
    update["".concat(row, "_category")] = page.data.Category;
    if (typeof page.data.attribute === "string") {
        update["".concat(row, "_attribute")] = "@{".concat(page.data.attribute, "}");
        update["".concat(row, "_attribute_abbreviation")] = getAttributeAbbreviation(page.data.attribute);
    }
    else {
        console.warn("Attribute is not a string: ".concat(page.data.attribute, ", ").concat(page.data.name));
    }
    setDropAttrs(update);
};
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
var getAttributeAbbreviation = function (attribute) {
    if (attribute === "luck") {
        return attribute;
    }
    var abbreviation = attribute.substring(0, 3);
    if (attribute === "awareness") {
        var key = getTranslationByKey(abbreviation);
        if (key) {
            return key;
        }
        else {
            console.warn("Key not found for awareness abbreviation: ".concat(abbreviation));
        }
    }
    return abbreviation;
};
var getFieldsetAttr = function (key) {
    var reprowid = getFieldsetRow(key);
    return key.split("".concat(reprowid, "_"))[1];
};
var getFieldsetGroupName = function (trigger) { return trigger.split("_")[1]; };
var getFieldsetRow = function (trigger) {
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
var sliceAttribute = function (attribute) { return attribute.slice(2, -1); };
var sumIntegers = function (numbers) { return numbers.reduce(function (a, b) { return a + b; }, 0); };
