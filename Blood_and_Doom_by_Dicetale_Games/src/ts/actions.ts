on('clicked:rest', () => {
    setAttrs({
        bruises_x1: 0,
        bruises_x2: 0,
        madness_x1: 0,
        resilience: 0,
    });
});

on('clicked:recover', () => {
    setAttrs({
        bruises_x1: 0,
        bruises_x2: 0,
        wounds_x3: 0,
        wounds_x6: 0,
        madness_x1: 0,
        resilience: 0,
    });
});

on('clicked:damage_dice_1', () => {
    setAttrs({ damage_dice: 1 });
});
on('clicked:damage_dice_2', () => {
    setAttrs({ damage_dice: 2 });
});
on('clicked:damage_dice_3', () => {
    setAttrs({ damage_dice: 3 });
});

on('clicked:close_options', () => {
    setAttrs({ options_toggle: 0 });
});
