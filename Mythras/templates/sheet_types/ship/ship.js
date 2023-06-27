const shipConditionTable = {
    "ship_shape": {
        "speed": "-",
        "skills": "1",
        "repair": "-",
        "range": 1
    },
    "seaworthy": {
        "speed": "-",
        "skills": "1",
        "repair": "x1",
        "range": .75
    },
    "battered": {
        "speed": "-25%",
        "skills": "2",
        "repair": "x2",
        "range": .5
    },
    "swamped": {
        "speed": "-50%",
        "skills": "3",
        "repair": "x3",
        "range": .25
    },
    "sinking": {
        "speed": "-100%",
        "skills": "4",
        "repair": "x4",
        "range": 0
    }
}

on('change:ship_seaworthiness', function(event) {
    if (event.sourceType === "sheetworker") {return;}

    getAttrs(['ship_condition', 'ship_seaworthiness'], function (v) {
        const seaworthiness = parseInt(v['ship_seaworthiness']) || 0;
        let range = Math.ceil((seaworthiness/10) * shipConditionTable[v['ship_condition']]['range']);
        range = range < 0 ? 0 : range;

        setAttrs({
            "ship_range": range
        });
    });
});

on('change:ship_condition', function(event) {
    if (event.sourceType === "sheetworker") {return;}

    getAttrs(['ship_condition', 'ship_seaworthiness'], function (v) {
        const seaworthiness = parseInt(v['ship_seaworthiness']) || 0;
        let range = Math.ceil((seaworthiness / 10) * shipConditionTable[v['ship_condition']]['range']);
        range = range < 0 ? 0 : range;

        setAttrs({
            "ship_speed": shipConditionTable[v['ship_condition']]['speed'],
            "ship_condition_skills": shipConditionTable[v['ship_condition']]['skills'],
            "ship_repair_mod": shipConditionTable[v['ship_condition']]['repair'],
            "ship_range": range
        });
    });
});

function upgradeShip3Dot0() {
    getSectionIDs("repeating_shiparmament", function(shiparmamentIds) {
        let shiparmamentGetAttrs = [];
        shiparmamentIds.forEach(id => {
            shiparmamentGetAttrs.push(`repeating_shiparmament_${id}_name`, `repeating_shiparmament_${id}_range`, `repeating_shiparmament_${id}_damage`, `repeating_shiparmament_${id}_load`, `repeating_shiparmament_${id}_notes`, `repeating_shiparmament_${id}_ap`, `repeating_shiparmament_${id}_hp`);
        });
        getAttrs(shiparmamentGetAttrs.concat(['ship_notes', "ship_seaworthiness_penalty", "ship_seaworthiness", "ship_condition"]), function (v) {
            let newAttrs = {
                'version': '3.0',
                'sheet_type': 'ship',
                'hit_location_roll': '@{none_hit_location_roll}',
                'hit_location_low_roll': '@{none_hit_location_roll}',
                'hit_location_high_roll': '@{none_hit_location_roll}'
            };

            const seaworthiness = parseInt(v['ship_seaworthiness']) || 0;
            const seaworthiness_penalty = parseInt(v['ship_seaworthiness_penalty']) || 0;
            newAttrs["ship_seaworthiness"] = seaworthiness - seaworthiness_penalty;

            let range = Math.ceil((newAttrs["ship_seaworthiness"]/10) * shipConditionTable[v['ship_condition']]['range']);
            newAttrs["ship_range"] = range < 0 ? 0 : range;

            shiparmamentIds.forEach(id => {
                const weaponId = 'repeating_rangedweapon_' + generateRowID();
                newAttrs[`${weaponId}_name`] = v[`repeating_shiparmament_${id}_name`] ? v[`repeating_shiparmament_${id}_name`] : "?";
                newAttrs[`${weaponId}_damage`] = v[`repeating_shiparmament_${id}_damage`] ? v[`repeating_shiparmament_${id}_damage`] : "";
                newAttrs[`${weaponId}_range`] = v[`repeating_shiparmament_${id}_range`] ? v[`repeating_shiparmament_${id}_range`] : "";
                newAttrs[`${weaponId}_load`] = v[`repeating_shiparmament_${id}_load`] ? v[`repeating_shiparmament_${id}_load`] : "";
                newAttrs[`${weaponId}_notes`] = v[`repeating_shiparmament_${id}_notes`] ? v[`repeating_shiparmament_${id}_notes`] : "";
                newAttrs[`${weaponId}_ap`] = v[`repeating_shiparmament_${id}_ap`] ? v[`repeating_shiparmament_${id}_ap`] : "0";
                newAttrs[`${weaponId}_hp`] = v[`repeating_shiparmament_${id}_hp`] ? v[`repeating_shiparmament_${id}_hp`] : "0";
                newAttrs[`${weaponId}_hp_max`] = v[`repeating_shiparmament_${id}_hp`] ? v[`repeating_shiparmament_${id}_hp`] : "0";
            });

            /* Convert Notes */
            if (v['ship_notes']) {
                newAttrs['sheet_notes'] = v['ship_notes'];
            }

            setAttrs(newAttrs);
        });
    });
}