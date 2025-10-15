on('change:unit_strength', function(event) {
    getAttrs(['unit_strength', 'unit_frontage'], function (v) {
        const strength = parseInt(v['unit_strength']) || 0;
        const frontage = parseInt(v['unit_frontage']) || 0;
        setAttrs({
            "unit_depth": Math.floor(strength / frontage)
        });
    });
});

on('change:unit_frontage change:unit_type_multiplier', function(event) {
    getAttrs(['unit_strength', 'unit_frontage', 'unit_type_multiplier'], function (v) {
        const strength = parseInt(v['unit_strength']) || 0;
        const frontage = parseInt(v['unit_frontage']) || 0;
        const newDamageStep = Math.ceil((frontage) / 15);
        setAttrs({
            "unit_depth": Math.floor(strength / frontage),
            "unit_damage": damageModTable(newDamageStep)
        });
    });
});

function upgradeBattleUnit3Dot0() {
    getAttrs(['unit_notes', 'unit_strength', 'unit_frontage', 'unit_type_multiplier', "unit_command_penalty", "unit_command", "unit_morale_penalty", "unit_morale", "unit_competency", "unit_competency_penalty"], function (v) {
        let newAttrs = {
            'version': '3.0',
            'sheet_type': 'battle_unit',
            'hit_location_roll': '@{none_hit_location_roll}',
            'hit_location_low_roll': '@{none_hit_location_roll}',
            'hit_location_high_roll': '@{none_hit_location_roll}'
        };

        const strength = parseInt(v['unit_strength']) || 0;
        const frontage = parseInt(v['unit_frontage']) || 0;
        const newDamageStep = Math.ceil((frontage) / 15);
        newAttrs["unit_depth"] = Math.floor(strength / frontage);
        newAttrs["unit_damage"] = damageModTable(newDamageStep);
        
        const command = parseInt(v['unit_command']) || 0;
        const command_penalty = parseInt(v['unit_command_penalty']) || 0;
        newAttrs["unit_command"] = command - command_penalty;
        const competency = parseInt(v['unit_competency']) || 0;
        const competency_penalty = parseInt(v['unit_competency_penalty']) || 0;
        newAttrs["unit_competency"] = competency - competency_penalty;
        const morale = parseInt(v['unit_morale']) || 0;
        const morale_penalty = parseInt(v['unit_morale_penalty']) || 0;
        newAttrs["unit_morale"] = morale - morale_penalty;

        /* Convert Notes */
        if (v['unit_notes']) {
            newAttrs['sheet_notes'] = v['unit_notes'];
        }

        setAttrs(newAttrs);
    });
}