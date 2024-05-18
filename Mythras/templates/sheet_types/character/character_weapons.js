/* Weapons */
/* When a favored weapon is selected it is added to the weapons_buttons attr which is how we add it to combat rolls */
on("change:repeating_meleeweapon change:repeating_rangedweapon change:_reporder:meleeweapon change:_reporder:rangedweapon remove:repeating_meleeweapon remove:repeating_rangedweapon", function(event) {
    if (event.sourceType === "sheetworker") {return;}
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];

    getSectionIDs("repeating_meleeweapon", function(meleeIds) {
        getSectionIDs("repeating_rangedweapon", function(rangedIds) {
            let meleeGetAttrs = [];
            meleeIds.forEach(id => {
                meleeGetAttrs.push(`repeating_meleeweapon_${id}_name`, `repeating_meleeweapon_${id}_favored`);
            });

            let rangedGetAttrs = [];
            rangedIds.forEach(id => {
                rangedGetAttrs.push(`repeating_rangedweapon_${id}_name`, `repeating_rangedweapon_${id}_favored`);
            });

            getAttrs(['character_id'].concat(rangedGetAttrs, meleeGetAttrs), function(v) {
                let weaponButtons = ""
                meleeIds.forEach(id => {
                    if (v[`repeating_meleeweapon_${id}_favored`] === '1') {
                        const name = v[`repeating_meleeweapon_${id}_name`];
                        weaponButtons = weaponButtons + ` [${name}](~${v['character_id']}|repeating_meleeweapon_${id}_roll)`;
                    }
                });
                rangedIds.forEach(id => {
                    if (v[`repeating_rangedweapon_${id}_favored`] === '1') {
                        const name = v[`repeating_rangedweapon_${id}_name`];
                        weaponButtons = weaponButtons + ` [${name}](~${v['character_id']}|repeating_rangedweapon_${id}_roll)`;
                    }
                });
                let newAttrs = {weapon_buttons: weaponButtons};
                if (id.startsWith("-")) {
                    newAttrs[`repeating_${type}_${id}_id`] = `repeating_${type}_${id}`;
                    newAttrs[`repeating_${type}_${id}_rollval`] = `%{${v['character_id']}|repeating_${type}_${id}_roll}`;
                }
                setAttrs(newAttrs);
            });
        });
    });
});

on('clicked:repeating_meleeweapon:roll clicked:repeating_rangedweapon:roll', (event) => {
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];

    getAttrs([`repeating_${type}_${id}_name`, `repeating_${type}_${id}_damage`, `repeating_${type}_${id}_damage_mod_toggle`,
        `repeating_${type}_${id}_size`, `repeating_${type}_${id}_reach`, `repeating_${type}_${id}_notes`,
        `repeating_${type}_${id}_force`, `repeating_${type}_${id}_range`, `repeating_${type}_${id}_impale_size`,
        'damage_mod', 'roll_display', 'character_name'], function(v) {

        const roll_display = (v['roll_display'] === '/w gm') ? "/w gm ":"";
        const roll_name = v[`repeating_${type}_${id}_name`] || "";
        const character_name = v[`character_name`] || "";
        const damage = v[`repeating_${type}_${id}_damage`];
        let damage_mod = 0;
        if (v[`repeating_${type}_${id}_damage_mod_toggle`] === '@{damage_mod}') {
            damage_mod = v['damage_mod'];
        }
        const size = v[`repeating_${type}_${id}_size`] || "";
        const reach = v[`repeating_${type}_${id}_reach`] || "";
        const force = v[`repeating_${type}_${id}_force`] || "";
        const range = v[`repeating_${type}_${id}_range`] || "";
        const impale_size = v[`repeating_${type}_${id}_impale_size`] || "";
        const notes = v[`repeating_${type}_${id}_notes`] || "";

        let roll_string = `${roll_display}&{template:weapon} \{\{name=${roll_name}\}\} \{\{character=${character_name}\}\} \{\{damage=[[${damage}+${damage_mod}]]\}\} \{\{notes=${notes}\}\}`;
        if (type === 'meleeweapon') {
            roll_string = roll_string + ` \{\{size=${size}\}\} \{\{reach=${reach}\}\}`;
        } else if (type === 'rangedweapon') {
            roll_string = roll_string + ` \{\{force=${force}\}\} \{\{range=${range}\}\} \{\{impale_size=${impale_size}\}\}`;
        }

        startRoll(roll_string, (results) => {
            finishRoll(
                results.rollId,
                {}
            );
        });
    });
});