var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var attackFieldsetAttributes = [
    "name",
    "damage",
    "damage_type",
    "range",
    "tags",
    "apc",
    "description",
];
var addSpellAttack = function (row, page) {
    var attackRow = getRow("attacks");
    var update = getUpdate(attackFieldsetAttributes, page, attackRow);
    update["".concat(attackRow, "_link")] = row;
    getAttrs(["spellcasting_ability", "primary_source"], function (_a) {
        var spellcasting_ability = _a.spellcasting_ability, primary_source = _a.primary_source;
        update["".concat(attackRow, "_attribute")] = spellcasting_ability;
        update["".concat(attackRow, "_attribute_abbreviation")] =
            getAttributeAbbreviation(spellcasting_ability);
        var rollFormula = getRollFormula(primary_source === page.data.source.toString().toLowerCase());
        update["".concat(attackRow, "_roll_formula")] = rollFormula;
        update["".concat(row, "_roll_formula")] = rollFormula;
        update["".concat(row, "_link")] = attackRow;
        setDropAttrs(update);
    });
    return attackRow;
};
var mentalAttributes = ["awareness", "intellect", "charisma"];
var metaphysicAttributes = ["luck", "coordination"];
var physicalAttributes = ["strength", "dexterity", "endurance"];
var attributes = __spreadArray(__spreadArray(__spreadArray([], mentalAttributes, true), metaphysicAttributes, true), physicalAttributes, true);
var action_points = ["coordination", "action_points_base"];
var hit_points = ["endurance", "hit_points_base", "level"];
var critical_attributes = ["critical_range", "luck", "critical_range_base"];
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
                break;
            case "Backgrounds":
                handle_bop(page);
                break;
            case "Professions":
                handle_profession(page);
                break;
            case "Equipment":
                handle_equipment(page);
                break;
            case "Features":
                handle_feature(page);
                break;
            case "Lineages":
                handle_lineage(page);
                break;
            case "Skills":
                handle_skills(page);
                break;
            case "Spells":
                handle_spell(page);
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
["attacks", "spells", "reactive-actions"].forEach(function (fieldset) {
    on("change:repeating_".concat(fieldset), function (event) {
        updateLinkedAttribute(event);
    });
    on("remove:repeating_".concat(fieldset), function (_a) {
        var _b;
        var sourceAttribute = _a.sourceAttribute, removedInfo = _a.removedInfo;
        var link = removedInfo["".concat(sourceAttribute, "_link")];
        if (link) {
            var update = (_b = {}, _b["".concat(link, "_link")] = "", _b);
            setAttrs(update, { silent: true });
        }
    });
});
["attacks", "skills"].forEach(function (fieldset) {
    on("change:repeating_".concat(fieldset, ":attribute"), function (event) {
        var _a;
        var sourceAttribute = event.sourceAttribute, newValue = event.newValue;
        var repeatingRow = getFieldsetRow(sourceAttribute);
        var abbreviation = getAttributeAbbreviation(newValue);
        setAttrs((_a = {}, _a["".concat(repeatingRow, "_attribute_abbreviation")] = abbreviation, _a));
    });
});
["attacks", "inventory"].forEach(function (fieldset) {
    on("change:repeating_".concat(fieldset, ":name"), function (event) {
        updateLinkedAttribute(event);
    });
});
["abilities", "favorites", "talents"].forEach(function (fieldset) {
    ["name", "tags", "description", "ap"].forEach(function (attr) {
        on("change:repeating_".concat(fieldset, ":").concat(attr), function (event) {
            updateLinkedAttribute(event);
        });
    });
    on("change:repeating_".concat(fieldset, ":toggle_favorite"), function (event) {
        var sourceAttribute = event.sourceAttribute, newValue = event.newValue;
        var abilitiesRow = getFieldsetRow(sourceAttribute);
        var isFavorite = newValue === "true";
        if (isFavorite) {
            getAttrs([
                "".concat(abilitiesRow, "_description"),
                "".concat(abilitiesRow, "_link"),
                "".concat(abilitiesRow, "_name"),
                "".concat(abilitiesRow, "_tags"),
            ], function (values) {
                var _a;
                var favoriteRow = getRow("favorites");
                var update = (_a = {},
                    _a["".concat(favoriteRow, "_description")] = values["".concat(abilitiesRow, "_description")],
                    _a["".concat(favoriteRow, "_link")] = abilitiesRow,
                    _a["".concat(favoriteRow, "_name")] = values["".concat(abilitiesRow, "_name")],
                    _a["".concat(favoriteRow, "_tags")] = values["".concat(abilitiesRow, "_tags")],
                    _a["".concat(favoriteRow, "_toggle_edit")] = false,
                    _a["".concat(abilitiesRow, "_link")] = favoriteRow,
                    _a);
                setAttrs(update, { silent: true });
            });
        }
        else {
            getAttrs(["".concat(abilitiesRow, "_link")], function (values) {
                var favoriteRow = values["".concat(abilitiesRow, "_link")];
                removeRepeatingRow(favoriteRow);
            });
        }
    });
});
action_points.forEach(function (attr) {
    on("change:".concat(attr), function () {
        updateActionPointsPerRound(action_points);
    });
});
critical_attributes.forEach(function (attr) {
    on("change:".concat(attr), function () {
        updateCriticalRange(critical_attributes);
    });
});
on("change:luck", function () {
    updateLuck(["luck"]);
});
hit_points.forEach(function (attr) {
    on("change:".concat(attr), function () {
        updateHitPoints(hit_points);
    });
});
on("change:primary_source", function (event) {
    var newValue = event.newValue, previousValue = event.previousValue;
    var section = "repeating_spells";
    getSectionIDs(section, function (ids) {
        var sourceMap = ids.map(function (id) { return "".concat(section, "_").concat(id, "_source"); });
        var linksMap = ids.map(function (id) { return "".concat(section, "_").concat(id, "_link"); });
        var formulasMap = ids.map(function (id) { return "".concat(section, "_").concat(id, "_roll_formula"); });
        getAttrs(__spreadArray(__spreadArray(__spreadArray([], sourceMap, true), linksMap, true), formulasMap, true), function (v) {
            var update = {};
            formulasMap.forEach(function (e) {
                if (v[e] === "{{description=@{description}}}") {
                    return;
                }
                var rowId = getFieldsetRow(e);
                var link = v["".concat(rowId, "_link")];
                var source = v["".concat(rowId, "_source")];
                var isPrimarySource = source === newValue;
                var wasPrimarySource = source === previousValue;
                if (wasPrimarySource || isPrimarySource) {
                    var formula = getRollFormula(isPrimarySource);
                    update["".concat(rowId, "_roll_formula")] = formula;
                    if (link) {
                        update["".concat(link, "_roll_formula")] = formula;
                    }
                    setAttrs(update, { silent: true });
                }
            });
        });
    });
});
on("change:repeating_spells:source", function (event) {
    var sourceAttribute = event.sourceAttribute, newValue = event.newValue;
    var repeatingRow = getFieldsetRow(sourceAttribute);
    getAttrs(["primary_source"], function (values) {
        var _a;
        var isPrimarySource = values.primary_source === newValue;
        setAttrs((_a = {},
            _a["".concat(repeatingRow, "_roll_formula")] = getRollFormula(isPrimarySource),
            _a));
    });
});
on("change:repeating_spells:toggle_spell_attack", function (event) {
    updateSpellRollFormula(event);
});
[
    "attacks",
    "spells",
    "abilities",
    "favorites",
    "talents",
    "reactive-actions",
].forEach(function (fieldset) {
    on("remove:repeating_".concat(fieldset), function (_a) {
        var _b;
        var sourceAttribute = _a.sourceAttribute, removedInfo = _a.removedInfo;
        var link = removedInfo["".concat(sourceAttribute, "_link")];
        if (link) {
            var update = (_b = {}, _b["".concat(link, "_link")] = "", _b);
            setAttrs(update, { silent: true });
        }
    });
});
on("change:repeating_actions:toggle_action_attack", function (event) {
    updateCreatureAttackRollFormula(event);
});
["skills", "features", "actions", "reactions", "spells"].forEach(function (section) {
    on("change:section_".concat(section), function (event) {
        var newValue = event.newValue;
        getAttrs(["creature_sections"], function (values) {
            var sections = values.creature_sections
                ? values.creature_sections.split(",")
                : [];
            if (newValue === "on" && !sections.includes(section)) {
                sections.push(section);
            }
            else if (newValue !== "on" && sections.includes(section)) {
                var index = sections.indexOf(section);
                if (index > -1) {
                    sections.splice(index, 1);
                }
            }
            console.log(sections);
            setAttrs({ creature_sections: sections.join(",") });
        });
    });
});
var getRollFormula = function (isPrimarySource, isSpellCard) {
    if (isSpellCard) {
        return "{{description=@{description}}}";
    }
    var abilityModifier = "@{spellcasting_ability}";
    if (!isPrimarySource) {
        abilityModifier = "ceil(".concat(abilityModifier, "/2)");
    }
    return "{{dice=[[1d20+".concat(abilityModifier, "[ability]+(@{bonus}[bonus])+(?{TA/TD|0})[tactical bonus]+(@{luck_negative_modifier}[negative luck modifier])cs>@{critical_range}]]}} {{damage=[Damage](~repeating_spells-roll_damage)}} {{description=@{description}}}");
};
var updateActionPointsPerRound = function (attributes) {
    getAttrs(attributes, function (values) {
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
        setAttrs({ action_points_per_round: action_points_per_round });
    });
};
var updateCreatureAttackRollFormula = function (event) {
    var _a, _b;
    var sourceAttribute = event.sourceAttribute, newValue = event.newValue, sourceType = event.sourceType;
    if (sourceType !== "player") {
        return;
    }
    var row = getFieldsetRow(sourceAttribute);
    var isAttack = newValue === "on";
    if (isAttack) {
        var update = (_a = {},
            _a["".concat(row, "_roll_formula")] = "{{dice=[[1d20+(@{bonus})+(?{TA/TD|0}[tactical bonus])]]}} {{action=@{range} @{type}. @{bonus} vs @{defense} }} {{damage=[Damage](~repeating_actions-roll_damage)}}",
            _a);
        setAttrs(update);
        return;
    }
    setAttrs((_b = {},
        _b["".concat(row, "_roll_formula")] = "{{description=@{description}}}",
        _b));
};
var updateCriticalRange = function (attributes) {
    getAttrs(attributes, function (values) {
        var _a = parseIntegers(values), luck = _a.luck, critical_range_base = _a.critical_range_base, critical_range = _a.critical_range;
        if (luck < 0) {
            setAttrs({
                critical_range: 0
            });
            return;
        }
        var range = critical_range_base;
        if (luck >= 12) {
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
};
var updateHitPoints = function (attributes) {
    getAttrs(attributes, function (values) {
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
};
var updateLinkedAttribute = function (event) {
    var sourceAttribute = event.sourceAttribute, newValue = event.newValue;
    if (sourceAttribute.includes("link")) {
        return;
    }
    var attr = getFieldsetAttr(sourceAttribute);
    var fieldset = getFieldsetGroupName(sourceAttribute);
    getAttrs(["repeating_".concat(fieldset, "_link")], function (values) {
        var _a;
        var linkedRow = values["repeating_".concat(fieldset, "_link")];
        if (linkedRow) {
            var update = (_a = {},
                _a["".concat(linkedRow, "_").concat(attr)] = newValue,
                _a);
            setAttrs(update, { silent: true });
        }
    });
};
var updateLuck = function (attributes) {
    getAttrs(attributes, function (values) {
        var luck = parseInt(values.luck);
        var attrs = {};
        attrs.rerolls_max = Math.ceil(luck / 2) || 0;
        if (luck < 0) {
            attrs.luck_negative_modifier = luck;
        }
        else {
            attrs.luck_negative_modifier = 0;
        }
        setAttrs(attrs);
    });
};
var updateSpellRollFormula = function (event) {
    var _a;
    var sourceAttribute = event.sourceAttribute, newValue = event.newValue, sourceType = event.sourceType;
    var row = getFieldsetRow(sourceAttribute);
    var isSpellCard = newValue === "0";
    if (sourceType !== "player") {
        return;
    }
    if (isSpellCard) {
        var formula = getRollFormula(undefined, isSpellCard);
        setAttrs((_a = {},
            _a["".concat(row, "_roll_formula")] = formula,
            _a));
        return;
    }
    if (!isSpellCard) {
        getAttrs(["primary_source", "".concat(row, "_source")], function (_a) {
            var _b;
            var primary_source = _a.primary_source, values = __rest(_a, ["primary_source"]);
            var isPrimarySource = primary_source === values["".concat(row, "_source")];
            setAttrs((_b = {},
                _b["".concat(row, "_roll_formula")] = getRollFormula(isPrimarySource, isSpellCard),
                _b));
        });
        var attributes_1 = __spreadArray(__spreadArray([], attackFieldsetAttributes, true), ["source", "link"], false).map(function (attr) { return "".concat(row, "_").concat(attr); });
        getAttrs(attributes_1, function (values) {
            var data = {};
            __spreadArray(__spreadArray([], attackFieldsetAttributes, true), ["source"], false).forEach(function (attr) {
                data[attr] = values["".concat(row, "_").concat(attr)];
            });
            var link = values["".concat(row, "_link")];
            if (!link) {
                var data_1 = {};
                __spreadArray(__spreadArray([], attackFieldsetAttributes, true), ["source"], false).forEach(function (attr) {
                    data_1[attr] = values["".concat(row, "_").concat(attr)];
                });
                addSpellAttack(row, {
                    name: values["".concat(row, "_name")],
                    data: data_1
                });
            }
        });
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
    if (page.data.Category === "Professions") {
        update["profession"] = page.name;
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
    var attrs = ["name", "description", "cost", "tags"];
    var row = getRow("inventory");
    var update = getUpdate(attrs, page, row);
    update["".concat(row, "_qty")] = page.data.quantity ? page.data.quantity : 1;
    if (page.data.subcategory === "weapon") {
        var attackRow = getRow("attacks");
        update["".concat(row, "_link")] = attackRow;
        handle_weapon(page, attackRow, row);
    }
    setDropAttrs(update);
};
var handle_feature = function (page) {
    var attrs = ["name", "description"];
    var row = getRow("abilities");
    var update = getUpdate(attrs, page, row);
    ["lineage", "profession"].forEach(function (attr) {
        if (page.data[attr]) {
            update["".concat(row, "_tags")] = page.data[attr];
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
var handle_profession = function (page) {
    if (page.data.occupation) {
        handle_bop(page);
        return;
    }
    console.log(page);
    var attrs = ["name", "description"];
    var row = getRow("abilities");
    var update = getUpdate(attrs, page, row);
    if (page.data.profession) {
        update["".concat(row, "_tags")] = page.data.profession;
    }
    console.log(update);
    setDropAttrs(update);
};
var handle_skills = function (page) {
    var attrs = ["name", "category", "description", "attribute"];
    var row = getRow("skills");
    var update = getUpdate(attrs, page, row);
    update["".concat(row, "_bonus")] = 1;
    if (typeof page.data.attribute === "string") {
        update["".concat(row, "_attribute_abbreviation")] = getAttributeAbbreviation(page.data.attribute);
    }
    setDropAttrs(update);
};
var handle_spell = function (page) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var attrs = [
        "apc",
        "description",
        "focus",
        "name",
        "spc",
        "type",
        "damage",
        "damage_type",
        "upcharge",
        "range",
        "duration",
        "cast_time",
        "prerequisites",
        "recharge",
    ];
    var row = getRow("spells");
    var update = getUpdate(attrs, page, row);
    if (page.data.damage) {
        update["".concat(row, "_toggle_spell_attack")] = "on";
        addSpellAttack(row, page);
    }
    if ((_a = page.data) === null || _a === void 0 ? void 0 : _a.function_note) {
        update["".concat(row, "_function")] = "".concat(page.data["function"], " (").concat(page.data.function_note, ")");
    }
    if ((_b = page.data) === null || _b === void 0 ? void 0 : _b.liturgy_apc) {
        update["".concat(row, "_apc")] = "".concat(page.data.liturgy_apc, " (liturgy apc)");
    }
    if ((_c = page.data) === null || _c === void 0 ? void 0 : _c.liturgy_spc) {
        update["".concat(row, "_spc")] = "".concat(page.data.liturgy_spc, " (liturgy spc)");
    }
    if (((_d = page.data) === null || _d === void 0 ? void 0 : _d.requires) && ((_e = page.data) === null || _e === void 0 ? void 0 : _e.materials)) {
        update["".concat(row, "_requires")] = "".concat((_f = page.data) === null || _f === void 0 ? void 0 : _f.requires, " (").concat(page.data.materials, ")");
    }
    else if ((_g = page.data) === null || _g === void 0 ? void 0 : _g.requires) {
        update["".concat(row, "_requires")] = "".concat((_h = page.data) === null || _h === void 0 ? void 0 : _h.requires);
    }
    else if ((_j = page.data) === null || _j === void 0 ? void 0 : _j.materials) {
        update["".concat(row, "_requires")] = "".concat((_k = page.data) === null || _k === void 0 ? void 0 : _k.materials);
    }
    var tags = "".concat(page.data.source, " ").concat(page.data.type, ", ").concat(page.data["function"]);
    if ((_l = page.data) === null || _l === void 0 ? void 0 : _l.function_note) {
        tags += ", ".concat(page.data.function_note);
    }
    if (page.data.source) {
        update["".concat(row, "_source")] = page.data.source.toString().toLowerCase();
    }
    update["".concat(row, "_tags")] = tags;
    setDropAttrs(update);
};
var handle_talent = function (page) {
    var attrs = ["name", "description", "level", "prerequisites"];
    var row = getRow("talents");
    var update = getUpdate(attrs, page, row);
    var tag = page.data.stack;
    if (page.data.track) {
        tag += ", ".concat(page.data.track);
    }
    update["".concat(row, "_tags")] = tag;
    if (page.data.reactive) {
        var reactiveRow = getRow("reactive-actions");
        var reactiveAttrs = ["name", "description", "ap"];
        var reactiveUpdate = getUpdate(reactiveAttrs, page, reactiveRow);
        Object.assign(update, reactiveUpdate);
        update["".concat(reactiveRow, "_toggle_edit")] = false;
        update["".concat(reactiveRow, "_link")] = row;
        update["".concat(row, "_link")] = reactiveRow;
    }
    setDropAttrs(update);
};
var handle_weapon = function (page, attackRow, inventoryRow) {
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
    var row = attackRow ? attackRow : getRow("attacks");
    var update = getUpdate(attrs, page, row);
    update["".concat(row, "_category")] = page.data.Category;
    update["".concat(row, "_bonus")] = 0;
    update["".concat(row, "_link")] = inventoryRow;
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
    if (attribute.charAt(0) === "@") {
        attribute = attribute.substring(2, attribute.length - 1);
    }
    var abbreviation = attribute.substring(0, 3);
    if (attribute === "awareness" || attribute === "coordination") {
        var key = getTranslationByKey(abbreviation);
        if (key) {
            return key;
        }
        else {
            console.warn("Key not found for ".concat(attribute, " abbreviation: ").concat(abbreviation));
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
