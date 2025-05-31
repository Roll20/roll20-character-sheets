on("change:vigor change:destreza sheet:opened", function() {  
    getAttrs(["vigor","destreza","mov"], function(values) {
        let vigor = parseInt(values.vigor)||0;
        let destreza = parseInt(values.destreza)||0;
        let comb = vigor + destreza;
        let rmov = 2;

        if (comb <= 200) rmov = 8;
        if (comb < 191) rmov = 7;
        if (comb < 181) rmov = 6;
        if (comb < 141) rmov = 5;
        if (comb < 101) rmov = 4;
        if (comb < 41) rmov = 3;
        if (comb < 21) rmov = 2;

        setAttrs({ mov: rmov });
    });  
});

on('sheet:opened', function() {
    'use strict';
    console.log('A');
    //Update sheet PV
    getAttrs(["pvtotales", "pv_max"], function(values) {
        let pv_max = parseInt(values.pvmax)||0;
        let pvtotales = parseInt(values.pvtotales)||0;
        console.log(pvtotales);
        console.log(pv_max);
        if ( pv_max == 0 ) { setAttrs({ pv_max: pvtotales }); }
    });
});

/*on('clicked:add_fire_weapon', function() {
    var values = {}

    var rowId = generateRowID()





    var rowPrefix = 'repeating_weapon_'+rowId+'_'
    for(let [key, value] of Object.entries(weaponDefaultProperties)) {
        values[rowPrefix+'weapon_'+key] = value
    }
    for(let [key, value] of Object.entries(properties)) {
        values[rowPrefix+'weapon_'+key] = value
    }
    return rowId


    createWeapon(values, {
        name: getTranslationByKey('weapon-bite'),
        attribute: 'body',
        skill: 'brawl',
        handling: -3,
        damage_type: 'flesh_wounds',
        damage_base: 0,
        damage_force_factor: '0.333'
    })
    createWeapon(values, {
        name: getTranslationByKey('weapon-kick'),
        attribute: 'body',
        skill: 'brawl',
        handling: 1,
        damage_type: 'ego',
        damage_base: 0,
        damage_force_factor: '0.5',
        description: getTranslationByKey('weapon-quality-dazed')
    })
    createWeapon(values, {
        name: getTranslationByKey('weapon-blow'),
        attribute: 'body',
        skill: 'brawl',
        handling: 2,
        damage_type: 'ego',
        damage_base: 0,
        damage_force_factor: '0.333',
        description: getTranslationByKey('weapon-quality-dazed')+
                     ', '+
                     getTranslationByKey('weapon-quality-smooth-running')+' (2T)'
    })
    setAttrs(values)
})*/