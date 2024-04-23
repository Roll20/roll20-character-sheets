function upgradeStarSystem3Dot0() {
    getAttrs(['system_notes'], function (v) {
        let newAttrs = {
            'version': '3.0',
            'sheet_type': 'star_system',
            'hit_location_roll': '@{none_hit_location_roll}',
            'hit_location_low_roll': '@{none_hit_location_roll}',
            'hit_location_high_roll': '@{none_hit_location_roll}'
        };

        /* Convert Notes */
        if (v['system_notes']) {
            newAttrs['sheet_notes'] = v['system_notes'];
        }

        setAttrs(newAttrs);
    });
}