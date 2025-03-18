action_points.forEach(function (attr) {
    on("change:".concat(attr), function () {
        getAttrs(action_points, function (values) {
            var _a = parseIntegers(values), coordination = _a.coordination, action_points_base = _a.action_points_base;
            var action_points = action_points_base;
            switch (coordination) {
                case -1:
                case -2:
                    action_points = action_points_base - 1 || 0;
                    break;
                case -3:
                    action_points = action_points_base - 2 || 0;
                    break;
                default:
                    // Base Action Points + half of the Coordination attribute
                    action_points = Math.ceil(coordination / 2) + action_points_base;
                    break;
            }
            setAttrs({ action_points: action_points });
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
            // 10+(level)d(X) + level;
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
            var range = critical_range_base;
            if (luck === 12) {
                range = critical_range_base - 2;
            }
            else if (luck >= 6 && luck <= 11) {
                range = critical_range_base - 1;
            }
            var cr = range < 16 ? 16 : range;
            if (cr !== critical_range) {
                setAttrs({ critical_range: cr });
            }
        });
    });
});
on("change:luck", function () {
    getAttrs(["luck"], function (values) {
        var luck = parseInt(values.luck);
        var attrs = {};
        //Reroll 1d20 for every 2 points of Luck
        attrs.rerolls = Math.ceil(luck / 2);
        if (luck < 0) {
            //Luck < 0 never Critically Hit and subtract LUCK from every d20 roll
            attrs.never_crit = true;
            attrs.luck_negative_modifier = luck;
        }
        else {
            attrs.luck_critical_modifier = luck;
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
//Calculate a simple derived attribute
//Calculate all the values of a repeating section. Useful for calculating weights, totals, etc.
// on(`change:repeating_events:weight`, ({ triggerName }) => {
//   const repeatingRow = getRepeatingRowId(triggerName);
//   getSectionIDs("events", (idArray) => {
//     let rows = [];
//     idArray.forEach((id) =>
//       rows.push(`repeating_events_${id}_weight`)
//     );
//     getAttrs(rows, (values) => {
//       const parsedNumbers = parseIntegers(values);
//       const weightValues = Object.values(parsedNumbers);
//       const sum = sumIntegers(weightValues);
//       setAttrs({
//         weight_total: sum,
//         [`${repeatingRow}_total_weight`]: sum,
//       });
//     });
//   });
// });
