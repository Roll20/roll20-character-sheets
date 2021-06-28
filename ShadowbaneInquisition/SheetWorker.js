    // repeating sections data array
    const BUFF = {
        active: 'active_r',
        ws: 'WS_mod_r',
        bs: 'BS_mod_r',
        str: 'STR_mod_r',
        tou: 'TOU_mod_r',
        agi: 'AGI_mod_r',
        int: 'INT_mod_r',
        per: 'PER_mod_r',
        wp: 'WP_mod_r',
        fel: 'FEL_mod_r',
        inf: 'INF_mod_r'
    },
    GEAR = {
        carry: 'gear_carry_r',
        name: 'gear_name_r',
        craftsmanship: 'gear_crafts_r',
        quantity: 'gear_quantity_r',
        availability: 'gear_avail_r',
        weight: 'gear_weight_r'
    },
    R_WEAPON = {
        name : 'R_weapon_name',
        class : 'R_weapon_class',
        range : 'R_weapon_range',
        damage : 'R_weapon_dam-roll',
        pen : 'R_weapon_pen',
        type : 'R_weapon_type',
        max : 'R_weapon_max',
        min : 'R_weapon_min',
        vengeful : 'R_weapon_vengeful',
        accurate : 'R_weapon_accurate',
        burst : 'R_weapon_burst',
        auto : 'R_weapon_auto',
        mag : 'R_weapon_mag',
        mag_max : 'R_weapon_mag_max',
        trained : 'R_weapon_trained',
        mod1 : 'R_weapon_mod1',
        reload : 'R_weapon_reload',
        weight : 'R_weapon_weight',
        domain : 'R_weapon_domain'
    }


    // ___________________________________________________________________________
    // __________________________Script for Ammo API______________________________
    // ___________________________________________________________________________
    on("sheet:opened change:repeating_rangedweapons:r_weapon_attack change:repeating_rangedweapons:r_weapon_burst change:repeating_rangedweapons:r_weapon_auto remove:repeating_rangedweapons change:repeating_vehiclerangedweapons:v_r_weapon_attack change:repeating_vehiclerangedweapons:v_r_weapon_burst change:repeating_vehiclerangedweapons:v_r_weapon_auto remove:repeating_vehiclerangedweapons", function() {
        getSectionIDs("rangedweapons", function(idarray) {
            // first get the attribute names for all rows in put in one array
            const fieldnames = [];
            idarray.forEach(id => fieldnames.push(
                `repeating_rangedweapons_${id}_R_weapon_attack`,
                `repeating_rangedweapons_${id}_R_weapon_burst`,
                `repeating_rangedweapons_${id}_R_weapon_auto`
            ));
            getAttrs(fieldnames, values => {
                // create a variable to hold all the attribute values you re going to create.
                const attr = {};
                // now loop through the rows again
                idarray.forEach(id => {
                    let row = 'repeating_rangedweapons_' + id;
                    let attack = +values[`${row}_R_weapon_attack`] || 0,
                        burst = +values[`${row}_R_weapon_burst`] || 0,
                        auto = +values[`${row}_R_weapon_auto`] || 0;

                    let ammo = attack === -10 ? -auto : (attack === 0 ? -burst : -1);

                    attr[`${row}_id`] = id; // id of the repeating element
                    attr[`${row}_ammo`] = ammo; // number of ammo to use
                });
                setAttrs(attr);
            });
        });
 getSectionIDs("vehiclerangedweapons", function(idarray) {
            // first get the attribute names for all rows in put in one array
            const fieldnames = [];
            idarray.forEach(id => fieldnames.push(
                `repeating_vehiclerangedweapons_${id}_V_R_weapon_attack`,
                `repeating_vehiclerangedweapons_${id}_V_R_weapon_burst`,
                `repeating_vehiclerangedweapons_${id}_V_R_weapon_auto`
            ));
            getAttrs(fieldnames, values => {
                // create a variable to hold all the attribute values you re going to create.
                const attr = {};
                // now loop through the rows again
                idarray.forEach(id => {
                    let row = 'repeating_vehiclerangedweapons_' + id;
                    let attack = +values[`${row}_V_R_weapon_attack`] || 0,
                        burst = +values[`${row}_V_R_weapon_burst`] || 0,
                        auto = +values[`${row}_V_R_weapon_auto`] || 0;

                    let ammo = attack === -10 ? -auto : (attack === 0 ? -burst : -1);

                    attr[`${row}_id`] = id; // id of the repeating element
                    attr[`${row}_ammo`] = ammo; // number of ammo to use
                });
                setAttrs(attr);
            });
        });
    });

    // ___________________________________________________________________________
    // __________________Skills unnatural bonus sheet worker______________________
    // ___________________________________________________________________________
    /**
    * skillRoll description
    * @param {string} skill - name of the skill
    * @param {string} focus - short name of the characteristic
    */
    const skillRoll = (skill, focus) => {
        let attr = {};
        attr[`${skill}_focus`] = `@{${focus}Total}`;
        attr[`${skill}_unnat`]=`@{${focus.toUpperCase()}_unnat}`;
        return attr;
    };
    let skills = [
        'acrobatics','athletics','awareness','charm','command','commerce','deceive','dodge','inquiry',
        'interrogation','intimidate','logic','medicae','nav_surface','nav_stellar','nav_warp','op_aero','op_surface','op_void',
        'parry','psyniscience','scrutiny','security','sleight','stealth','survival','tech_use',
        'linguistics','common-lore','scholastic-lore','forbidden-lore','trade'
    ];
    let repeatingSkills = ['skill','linguistics','common-lore','scholastic-lore','forbidden-lore','trade'];
    on('sheet:opened ' + skills.map(skill => `change:${skill}_char change:${skill}_name`).join(' ') + repeatingSkills.map(skill => `change:repeating_${skill}:${skill}_r_char change:repeating_${skill}:${skill}_name`).join(' '), function () {
        console.log('== UPDATING SKILLS ==');
        getAttrs(skills.map( skill => `${skill}_char`), (values) => {
            let attr = {};
            for (var [skill, focus] of Object.entries(values)) {
                attr = {...attr, ...skillRoll(skill.replace('_char', ''), focus)};
            }
            setAttrs(attr);
        });
        repeatingSkills.forEach(field => {
            var repSkills = [];
            getSectionIDs(field, ids => {
                ids.forEach( id => {
                    repSkills.push(`repeating_${field}_${id}_${field}_r_char`);
                });
                getAttrs(repSkills, (values) => {
                    let attr = {};
                    for (var [skill, focus] of Object.entries(values)) {
                        attr = {...attr, ...skillRoll(skill.replace('_char', ''), focus)};
                    }
                    if (attr) setAttrs(attr);
                    console.table(values)
                    console.table(attr)
                });
            });
        });
        console.log('== SKILLS UPDATED ==');
    });


 // ___________________________________________________________________________
 // ____________________Movement and Weight sheet worker_______________________
 // ___________________________and Fatigue Pts_________________________________
    let fieldsMWF = [
        'size', 'fatigue', 'carry', 'weight_total',
        'ws', 'ws_unnat', 'ws_advancement', 'ws_mod',
        'bs', 'bs_unnat', 'bs_advancement', 'bs_mod',
        'str', 'str_unnat', 'str_advancement', 'str_mod',
        'tou', 'tou_unnat', 'tou_advancement', 'tou_mod',
        'int', 'int_unnat', 'int_advancement', 'int_mod',
        'per', 'per_unnat', 'per_advancement', 'per_mod',
        'wp', 'wp_unnat', 'wp_advancement', 'wp_mod',
        'fel', 'fel_unnat', 'fel_advancement', 'fel_mod',
        'inf', 'inf_unnat',
        'agi', 'agi_unnat', 'agi_advancement', 'agi_mod', 'agi_mov_mod', 'armor_agi', 'armor_limit',
        'fatigue_ignore', 'psykana_class'
    ];
    on('sheet:opened ' + fieldsMWF.map(field => 'change:' + field).join(' '), function(e) {
        // console.log(e);
        getAttrs(fieldsMWF, function(values) {
            // SIZE
            var size = parseInt(values['size'], 10) || 0;
            // FATIGUE
            var fatigue = parseInt(values['fatigue'], 10) || 0;
            var fatigueIgnore = parseInt(values['fatigue_ignore'], 10) || 0;
            if (fatigueIgnore) fatigue = 0;
            // CARRY
            var carry = parseInt(values['carry'], 10) || 0;
            var weight_total = parseInt(values['weight_total'], 10) || 0;
            // STATS
            function Stat(stat) {
                this.base = parseInt(values[`${stat}`], 10) || 0
                this.modifier = parseInt(values[`${stat}_mod`], 10) || 0
                this.advancement = parseInt(values[`${stat}_advancement`], 10) || 0
                this.unnat = parseInt(values[`${stat}_unnat`], 10) || 0
                this.total = this.base + this.modifier + this.advancement
                this.bonus = () => Math.floor(this.total / 10 + this.unnat)
            }
            // WS
            var ws = new Stat('ws')
            if (ws.bonus() < fatigue) ws.total = Math.ceil(ws.total / 2)
            // BS
            var bs = new Stat('bs')
            if (bs.bonus() < fatigue) bs.total = Math.ceil(bs.total / 2)
            // STR
            var str = new Stat('str')
            if (str.bonus() < fatigue) str.total = Math.ceil(str.total / 2)
            // TOU
            var tou = new Stat('tou')
            if (tou.bonus() < fatigue) tou.total = Math.ceil(tou.total / 2)
            // AGI
            var agi = new Stat('agi')
                agi_mov_mod = parseInt(values['agi_mov_mod'], 10) || 0,
                armor_agi = parseInt(values['armor_agi'], 10) || 0,
                armor_limit = parseInt(values['armor_limit'], 10) || 0;
            if (weight_total > carry) agi.total -= 10
            if (armor_limit) agi.total = (agi.total > armor_agi ) ? armor_agi : agi.total
            if (agi.bonus() < fatigue) agi.total = Math.ceil(agi.total / 2)
            // INT
            var int = new Stat('int')
            if (int.bonus() < fatigue) int.total = Math.ceil(int.total / 2)
            // PER
            var per = new Stat('per')
            if (per.bonus() < fatigue) per.total = Math.ceil(per.total / 2)
            // WP
            var wp = new Stat('wp')
            if (wp.bonus() < fatigue) wp.total = Math.ceil(wp.total / 2)
            // FEL
            var fel = new Stat('fel')
            // Blank FEL halfing
            var blank = values['psykana_class']
            if (blank === '-1') fel.total = Math.ceil(fel.total / 2);
            if (fel.bonus() < fatigue) fel.total = Math.ceil(fel.total / 2)
            // INF
            var inf = new Stat('inf')
            if (inf.bonus() < fatigue) inf.total = Math.ceil(inf.total / 2)

            var move_mod = agi.bonus() + size + agi_mov_mod;
            var carry_mod = str.bonus() + tou.bonus();
            var carry_calc;

            // 40k system does their carry weight off a sheet-table

            switch (carry_mod) {
                case 1: carry_calc  = 2.25;     break;
                case 2: carry_calc  =  4.5;     break;
                case 3: carry_calc  =    9;     break;
                case 4: carry_calc  =   18;     break;
                case 5: carry_calc  =   27;     break;
                case 6: carry_calc  =   36;     break;
                case 7: carry_calc  =   45;     break;
                case 8: carry_calc  =   56;     break;
                case 9: carry_calc  =   67;     break;
                case 10: carry_calc =   78;     break;
                case 11: carry_calc =   90;     break;
                case 12: carry_calc =  112;     break;
                case 13: carry_calc =  225;     break;
                case 14: carry_calc =  337;     break;
                case 15: carry_calc =  450;     break;
                case 16: carry_calc =  675;     break;
                case 17: carry_calc =  900;     break;
                case 18: carry_calc = 1350;     break;
                case 19: carry_calc = 1800;     break;
                case 20: carry_calc = 2250;     break;
            }

            // normal, no unnatural
            setAttrs({
                half_move:   (move_mod),
                full_move:   (move_mod * 2),
                charge_move: (move_mod * 3),
                run_move:    (move_mod * 6),
                carry:       (carry_calc * 1), //taking out the * 1 seems to cause attr_carry to freeze when carry_mod is set to 1 or 0
                lift:        (carry_calc * 2),
                push:        (carry_calc * 4),
                bsTotal:     (bs.total),
                bsB:         (bs.bonus()),
                wsTotal:     (ws.total),
                wsB:         (ws.bonus()),
                strTotal:    (str.total),
                strB:        (str.bonus()),
                touTotal:    (tou.total),
                touB:        (tou.bonus()),
                agiTotal:    (agi.total),
                agiB:        (agi.bonus()),
                intTotal:    (int.total),
                intB:        (int.bonus()),
                perTotal:    (per.total),
                perB:        (per.bonus()),
                wpTotal:     (wp.total),
                wpB:         (wp.bonus()),
                felTotal:    (fel.total),
                felB:        (fel.bonus()),
                infTotal:    (inf.total),
                infB:        (inf.bonus()),
            });

            // 0 mod movement override
            if (move_mod <= 0) {
                setAttrs({
                    half_move: (0.5),
                    full_move: (1),
                    charge_move: (2),
                    run_move: (3)
                });
            }

            // 0 mod carry override
            if (carry_mod <=0) {
                setAttrs({
                carry: (0.9),
                lift: (2.25),
                push: (4.5)
                });
            }

        });
    });



    // ___________________________________________________________________________
    // ________________________Fatigue and Armor sheet worker_____________________
    // ___________________________________________________________________________
    let fieldsFA = [
        'fatigue_mod',
        'tou', 'tou_unnat', 'tou_advancement', 'tou_mod',
        'wp', 'wp_unnat', 'wp_advancement',
        'armor_head', 'armor_arm_right', 'armor_body', 'armor_arm_left', 'armor_leg_right', 'armor_leg_left'
    ];
    on('sheet:opened ' + fieldsFA.map(field => 'change:' + field).join(' '), function() {
        getAttrs(fieldsFA, function(values) {
            var fatigue_mod           = parseInt(values['fatigue_mod'], 10) || 0;

            var toughness             = parseInt(values['tou'], 10) || 0;
            var toughness_unnat       = parseInt(values['tou_unnat'], 10) || 0;
            var toughness_advancement = parseInt(values['tou_advancement'], 10) || 0;
            var toughness_modifier    = parseInt(values['tou_mod'], 10) || 0;
            var toughness_bonus       = Math.floor((toughness + toughness_advancement + toughness_modifier) / 10 + toughness_unnat);
            var toughness_mod         = Math.floor((toughness + toughness_advancement) / 10 + toughness_unnat);

            var willpower             = parseInt(values['wp'], 10) || 0;
            var willpower_unnat       = parseInt(values['wp_unnat'], 10) || 0;
            var willpower_advancement = parseInt(values['wp_advancement'], 10) || 0;
            var willpower_mod         = Math.floor((willpower + willpower_advancement) / 10 + willpower_unnat);

            var armor_head            = parseInt(values['armor_head'], 10) || 0;
            var armor_arm_right       = parseInt(values['armor_arm_right'], 10) || 0;
            var armor_body            = parseInt(values['armor_body'], 10) || 0;
            var armor_arm_left        = parseInt(values['armor_arm_left'], 10) || 0;
            var armor_leg_right       = parseInt(values['armor_leg_right'], 10) || 0;
            var armor_leg_left        = parseInt(values['armor_leg_left'], 10) || 0;

            // normal, no modifiers ___________________________________________________
            setAttrs({
                soak_head:      (armor_head + toughness_bonus),
                soak_arm_right: (armor_arm_right + toughness_bonus),
                soak_body:      (armor_body + toughness_bonus),
                soak_arm_left:  (armor_arm_left + toughness_bonus),
                soak_leg_right: (armor_leg_right + toughness_bonus),
                soak_leg_left:  (armor_leg_left + toughness_bonus),
                fatigue_max:    (toughness_mod + willpower_mod + fatigue_mod)
            });

        });
    });



    // ___________________________________________________________________________
    // ____________________Tabs sheet worker______________________________________
    // ___________________________________________________________________________
    const buttonlist = ['core','equipment','advancements','journal','vehicle','psykana','settings'];
    buttonlist.forEach(button => {
        on(`clicked:${button}`, function() {
            setAttrs({
                sheetTab: button
            });
        });
    });

    // ___________________________________________________________________________
    // ____________________Inventory Tabs sheet worker____________________________
    // ___________________________________________________________________________
    const buttonListIventory = ['all', 'weapon', 'armour', 'gear', 'tool', 'consumables', 'ammo', 'cyberntic', 'other'];
    buttonListIventory.forEach(button => {
        on(`clicked:inv_${button}`, function() {
            setAttrs({
                equipmentTab: button
            });
        });
    });


    // ___________________________________________________________________________
    // ____________________insanity/corruption sheet worker_______________________
    // ___________________________________________________________________________
    on('sheet:opened change:insanity_pts change:corruption_pts', function() {
        getAttrs(['insanity_pts', 'corruption_pts'], function(values) {
            var insanity_pts = parseInt(values['insanity_pts'], 0) || 0;
            var corruption_pts = parseInt(values['corruption_pts'], 10) || 0;

            function insanity (points) {
                if (points <= 9)  return ('Stable')
                if (points <= 39) return ('Unsettled')
                if (points <= 59) return ('Disturbed')
                if (points <= 79) return ('Unhinged')
                if (points <= 99) return ('Deranged')
                return ('Terminally Insane')
            }

            function corruption (points) {
                if (points <= 9)  return ('Pure')
                if (points <= 39) return ('Tainted')
                if (points <= 59) return ('Soiled')
                if (points <= 79) return ('Debased')
                if (points <= 99) return ('Profane')
                return ('Damned')
            }
            setAttrs({
                insanity_degree: (insanity(insanity_pts)),
                corruption_degree: (corruption(corruption_pts))
            })

        });
    });



    // ___________________________________________________________________________
    // _______________________psychic info sheet worker___________________________
    // ___________________________________________________________________________

    const PSY_RANK = {}
        
    let fieldsPsy = ['psykana_class', 'psykana_limit', 'psy_push', 'psy_rating','psykana_sustain','psykana_sustain_count'];
    on('sheet:opened ' + fieldsPsy.map(field => 'change:' + field).join(' '), function() {
        getAttrs(fieldsPsy, function(values) {
            var psykana_class = parseInt(values['psykana_class'])||0;
            var psykana_limit = parseInt(values['psykana_limit'])||0;
            var psy_push = parseInt(values['psy_push'])||0;
            var psy_rating = parseInt(values['psy_rating'], 10) || 0;
            var psykana_sustain = parseInt(values['psykana_sustain'], 10) || 0;
            var psykana_sustain_count = parseInt(values['psykana_sustain_count'], 10) || 0;
            var psykana_limit_factor = 0;
            var push_addend_epr = 0;
            var sustain_count_addend = 0;
            var unfettered_addend = 0;
            var push_addend_pp = 0;
            var sustain_addend = 0;

            // psy rating calc
            switch (psykana_limit) {
                case 0:
                    psykana_limit_factor = 0.5;
                    setAttrs({
                        psy_roll: ('cf>96')
                    });
                break;
                case 1:
                    psykana_limit_factor = 1;
                    setAttrs({
                        psy_roll: ('cf11cf22cf33cf44cf55cf66cf77cf88cf99cf100')
                    });
                break;
                case 2:
                    psykana_limit_factor = 1;
                    push_addend_epr = psy_push;
                    if (psykana_class == 0) {
                        setAttrs({
                            psy_roll: ('cs1cs11cs22cs33cs44cs55cs66cs77cs88cs99cs100cf>0')
                            //psy_roll: ('cf>0')
                        });
                    } else {
                        setAttrs({
                            psy_roll: ('cf>0')
                        });
                    }
                break;
            }

            if (psykana_sustain == -5) {
                sustain_count_addend = psykana_sustain_count;
            }
            var epr = Math.ceil(psy_rating * psykana_limit_factor) + push_addend_epr;

            // phenomena calc
            if (psykana_class == 2 && psykana_limit == 1) {
                unfettered_addend = 10;
            }
            if (psykana_class == 0 && psykana_limit == 2) {
                push_addend_pp = 10;
            }
            if (psykana_class == 1 && psykana_limit == 2) {
                push_addend_pp = 5 * psy_push;
            }
            if (psykana_class == 2 && psykana_limit == 2) {
                push_addend_pp = 10 * psy_push;
            }
            if (psykana_sustain == -5) {
                sustain_addend = 5 * sustain_count_addend;
            }
            var pp = unfettered_addend + push_addend_pp + sustain_addend;

            //output
            setAttrs({
                effective_psy_rating: epr,
                psykana_phenomena: pp
            });
        });
    });



    // ___________________________________________________________________________
    // ____________________gear cost/weight sheet worker__________________________
    // ___________________________________________________________________________
    on('change:repeating_rangedweapons remove:repeating_rangedweapons change:repeating_meleeweapons remove:repeating_meleeweapons', function() {
            repeatingWeight("R_weapon_weight_t","rangedweapons",[['weight',"R_weapon_weight"],['carry',"R_weapon_carry"]]),
            repeatingWeight("M_weapon_weight_t","meleeweapons",[['weight',"M_weapon_weight"],['carry',"M_weapon_carry"]]);
    });

    on('change:M_weapon_weight_t change:R_weapon_weight_t change:gear_carry change:gear_weight change:gear_quantity change:repeating_gear remove:repeating_gear', () => {
        getSectionIDs(`repeating_gear`, idArray => {
            const fieldset_weight = [];
            const fieldset_quantity = [];
            const fieldset_carry = [];
            idArray.forEach(id => fieldset_weight.push (`repeating_gear_${id}_gear_weight_r`));
            idArray.forEach(id => fieldset_quantity.push (`repeating_gear_${id}_gear_quantity_r`));
            idArray.forEach(id => fieldset_carry.push (`repeating_gear_${id}_gear_carry_r`));
            getAttrs(['M_weapon_weight_t','R_weapon_weight_t','weight_total', 'gear_carry', 'gear_weight', 'gear_quantity', ...fieldset_weight, ...fieldset_quantity, ...fieldset_carry], v => {
                const getValue = (id, field) => parseFloat(v[`repeating_gear_${id}_${field}`]) || 0
                const weight_base = parseFloat(v.gear_weight) * parseFloat(v.gear_quantity) * parseFloat(v.gear_carry)
                const weight_repeating = idArray.reduce((total, id) => total + (getValue(id, 'gear_weight_r') * getValue(id, 'gear_quantity_r') * getValue(id, 'gear_carry_r')), 0)
                const weapon_weight = parseFloat(v.M_weapon_weight_t) + parseFloat(v.R_weapon_weight_t)
                setAttrs({
                    weight_total: weight_base + weight_repeating + weapon_weight,
                });
            });
        });
    });

    // ___________________________________________________________________________
    // ____________________Advancement XP sheet worker_______________________________
    // ___________________________________________________________________________
    on('change:xp_total change:advancement_costL change:advancement_costR change:repeating_advancements remove:repeating_advancements', () => {
        // get section IDs because of operation both inside and outside of fieldset
        getSectionIDs(`repeating_advancements`, idArray => {
            const fieldnames = [];
            idArray.forEach(id => fieldnames.push (
                `repeating_advancements_${id}_advancement_costL_r`,
                `repeating_advancements_${id}_advancement_costR_r`
            ));
            // spread operator to get every array value
            getAttrs(['xp_total', 'advancement_costL', 'advancement_costR', ...fieldnames], v => {
                const getValue = (id, field) => parseFloat(v[`repeating_advancements_${id}_${field}`]) || 0
                const cost = parseFloat(v.gear_cost) || 0
                const left = parseFloat(v.advancement_costL) || 0
                const right = parseFloat(v.advancement_costR) || 0
                const left_r = idArray.reduce((total, id) => total + getValue(id,'advancement_costL_r'),0)
                const right_r = idArray.reduce((total, id) => total + getValue(id,'advancement_costR_r'),0)
                const spent = left + right + left_r + right_r
                const total = parseFloat(v.xp_total) || 0
                setAttrs({
                    xp_spent: spent,
                    xp_current: total - spent
                });
            });
        });
    });



    // ___________________________________________________________________________
    // __________________________General sum sheet worker_________________________
    // ___________________________________________________________________________
    /**
     * [repeatingWeight description]
     * @param {[type]} destination [description]
     * @param {[type]} section [description]
     * @param {[type]} fields [description]
     */
    const repeatingWeight = (destination, section, fields) => {
        getSectionObjects(section, fields, items => {
            const sumTotal = items.filter(item => item.carry !== '0').reduce((total, item) => total + parseFloat(item.weight),0);
            setAttrs({[destination]: sumTotal});
        })
    }

    // ___________________________________________________________________________
    // _________________________ weapon damage primitive _________________________
    // ___________________________________________________________________________
    /**
     * calculate real damage roll
     * @param {string} source row id of the weapon
     */
    const calcDmg = function (sources, fields) {
        var redice = /^(\d+)?(d\d+)(.*)?/;

        getAttrs(fields, v => {
            let attr = {};
            sources.forEach( source => {
                // to avoid retyping long strings because i'm lazy
                var dam = source + 'weapon_dam-roll',
                    ven = source + 'weapon_vengeful', // crit
                    min = source + 'weapon_min', // proven
                    max = source + 'weapon_max', // primitive
                    set = source + 'weapon_setting'; // overcharge/load / maximal

                let dmg = redice.exec(v[dam]);
                    ven = parseInt(v[ven], 10) || 0,
                    min = parseInt(v[min], 10) || 0,
                    max = parseInt(v[max], 10) || 0,
                    set = parseInt(v[set], 10) || 0;

                if (!dmg) {
                    console.log('no damage found');
                    attr[`${source}weapon_real_dmg`] = v[dam];
                } else {
                    let dicenum = parseInt(dmg[1], 10) || 1,
                        dicetype = dmg[2],
                        mod = dmg[3];

                    let damTotal = '{';
                    if (set === 3) dicenum ++;

                    for (var i = 0; i < dicenum; i++) {
                        if (i) damTotal += ', '
                        if (min > 0) damTotal += '{';
                        if (max > 0) damTotal += '{';
                        damTotal += (dicetype == 'd5') ? 'ceil(1d10/2)' : '1d10';
                        if (ven > 0) damTotal += 'cs>' + ven;
                        if (min > 0) damTotal += ', {' + min + '}}kh1';
                        if (max > 0) damTotal += ', {' + max + '}}kl1';
                    }
                    damTotal += '}';
                    if (mod) damTotal += mod;
                    if (set === 2) damTotal += '+1';
                    if (set === 4) {
                        damTotal += '+2';
                        attr[`${source}weapon_pen2`] = 2;
                    } else {
                        attr[`${source}weapon_pen2`] = 0;
                    }
                    attr[`${source}weapon_real_dmg`] = damTotal;
                }
            });
            setAttrs(attr);
        });
    };

    let fieldsDMG = [
        'vehiclerangedweapons:V_R_weapon_dam-roll', 'vehiclerangedweapons:V_R_weapon_vengeful', 'vehiclerangedweapons:V_R_weapon_min', 'vehiclerangedweapons:V_R_weapon_max', 'vehiclerangedweapons:V_R_weapon_setting',
        'rangedweapons:R_weapon_dam-roll', 'rangedweapons:R_weapon_vengeful', 'rangedweapons:R_weapon_min', 'rangedweapons:R_weapon_max', 'rangedweapons:R_weapon_setting',
        'vehiclemeleeweapons:V_M_weapon_dam-roll', 'vehiclemeleeweapons:V_M_weapon_vengeful', 'vehiclemeleeweapons:V_M_weapon_min', 'vehiclemeleeweapons:V_M_weapon_max',
        'meleeweapons:M_weapon_dam-roll', 'meleeweapons:M_weapon_vengeful', 'meleeweapons:M_weapon_min', 'meleeweapons:M_weapon_max',
        ];
    on('sheet:opened ' + fieldsDMG.map(field => 'change:repeating_' + field).join(' '), () => {
        getSectionIDs('rangedweapons', (idArray) => {
            let sources = [];
            let fieldnames = [];
            idArray.forEach( id => {
                sources.push(`repeating_rangedweapons_${id}_R_`);
                fieldnames.push(
                `repeating_rangedweapons_${id}_R_weapon_dam-roll`,
                `repeating_rangedweapons_${id}_R_weapon_vengeful`,
                `repeating_rangedweapons_${id}_R_weapon_min`,
                `repeating_rangedweapons_${id}_R_weapon_max`,
                `repeating_rangedweapons_${id}_R_weapon_setting`
                );
            });
            calcDmg(sources, fieldnames);
        });
        getSectionIDs('meleeweapons', (idArray) => {
            let sources = [];
            let fieldnames = [];
            idArray.forEach( id => {
                sources.push(`repeating_meleeweapons_${id}_M_`);
                fieldnames.push(
                `repeating_meleeweapons_${id}_M_weapon_dam-roll`,
                `repeating_meleeweapons_${id}_M_weapon_vengeful`,
                `repeating_meleeweapons_${id}_M_weapon_min`,
                `repeating_meleeweapons_${id}_M_weapon_max`
                );
            });
            calcDmg(sources, fieldnames);
        });
        getSectionIDs('vehiclerangedweapons', (idArray) => {
            let sources = [];
            let fieldnames = [];
            idArray.forEach( id => {
                sources.push(`repeating_vehiclerangedweapons_${id}_V_R_`);
                fieldnames.push(
                `repeating_vehiclerangedweapons_${id}_V_R_weapon_dam-roll`,
                `repeating_vehiclerangedweapons_${id}_V_R_weapon_vengeful`,
                `repeating_vehiclerangedweapons_${id}_V_R_weapon_min`,
                `repeating_vehiclerangedweapons_${id}_V_R_weapon_max`,
                `repeating_vehiclerangedweapons_${id}_V_R_weapon_setting`
                );
            });
            calcDmg(sources, fieldnames);
        });
        getSectionIDs('vehiclemeleeweapons', (idArray) => {
            let sources = [];
            let fieldnames = [];
            idArray.forEach( id => {
                sources.push(`repeating_vehiclemeleeweapons_${id}_V_M_`);
                fieldnames.push(
                `repeating_vehiclemeleeweapons_${id}_V_M_weapon_dam-roll`,
                `repeating_vehiclemeleeweapons_${id}_V_M_weapon_vengeful`,
                `repeating_vehiclemeleeweapons_${id}_V_M_weapon_min`,
                `repeating_vehiclemeleeweapons_${id}_V_M_weapon_max`
                );
            });
            calcDmg(sources, fieldnames);
        });
        console.log('DAMAGES UPDATED');
    });

    // ___________________________________________________________________________
    // __________________________ get repeating objects __________________________
    // ___________________________________________________________________________
    // TODO: add class suport
    /**
     * get the attributes from a repeating section and pass them in an array of objects
     * @param {String} section - name of the repeating section
     * @param {Array} fields - list of the attributes
     * @param {Function} callback - function to pass the array of objects
     */
    const getSectionObjects = function (section, fields, callback) {
        if (!Array.isArray(fields)) fields = [fields];
        getSectionIDs(`repeating_${section}`, idArray => {
            const attrArray = idArray.reduce( (m,id) => [...m, ...(Object.values(fields).map(field => `repeating_${section}_${id}_${field}`))],[]);
            getAttrs(attrArray, v => {
                const objects = [];
                idArray.forEach(id => {
                    let obj = { _id : id, _source: `repeating_${section}_${id}` };
                    for (var property in fields) {
                        obj[property] = v[`repeating_${section}_${id}_${fields[property]}`]
                    }
                    objects.push(obj)
                });
                callback(objects);
            });
        });
    }

    // ___________________________________________________________________________
    // ________________________________ Importer _________________________________
    // ___________________________________________________________________________
    on('clicked:import_clear', () => {
        setAttrs({
            import_value: ''
        });
    });
    on('clicked:import', () => {
        getAttrs(['import_value'], (v) => {
            try {
                var data = JSON.parse(v.import_value);
            } catch(e) {
                setAttrs({import_value: 'ERROR: verify if you have copied the totality of the Export'}); return console.log(e);
            }
            console.log('Importing Character');
            var attributes = {}
            
            // emptying the repeating sections
            const sectionList = [
                'conditions',
                'skill',
                'linguistics',
                'common-lore',
                'scholastic-lore',
                'forbidden-lore',
                'trade',
                'abilities',
                'traits',
                'rangedweapons',
                'meleeweapons',
                'gear',
                'cybernetics',
                'aptitudes',
                'advancements',
                'disorders',
                'mutations',
                'objectives',
                'notes',
                'vehicles',
                'vehiclerangedweapons',
                'vehiclemeleeweapons',
                'minormanifestation',
                'psynotes',
                'psychicabilities'
            ];
            sectionList.forEach( section => {
                getSectionIDs(`repeating_${section}`, idArray => {
                    idArray.forEach(id => removeRepeatingRow(`repeating_${section}_${id}`))
                })
            })

            // info Block
            attributes = {...attributes, ...mapInfo(data)}

            // STATS
            attributes = {...attributes, ...mapStat('WS', data?.weaponSkill)};
            attributes = {...attributes, ...mapStat('BS', data?.ballisticSkill)};
            attributes = {...attributes, ...mapStat('STR', data?.strenght)};
            attributes = {...attributes, ...mapStat('TOU', data?.toughness)};
            attributes = {...attributes, ...mapStat('AGI', data?.agility)};
            attributes = {...attributes, ...mapStat('INT', data?.intelligence)};
            attributes = {...attributes, ...mapStat('PER', data?.perception)};
            attributes = {...attributes, ...mapStat('WP', data?.willpower)};
            attributes = {...attributes, ...mapStat('FEL', data?.fellowship)};
            attributes = {...attributes, ...mapStat('INF', data?.influence)};

            // WOUNDS, FATE, FATIGUE, FORCEFIELD
            attributes = {...attributes, ...mapWounds(data?.wounds)};
            attributes = {...attributes, ...mapFate(data?.fate)};
            attributes = {...attributes, ...mapFatigue(data?.fatigue)};
            attributes = {...attributes, ...mapForceField(data?.forcefield)};

            // CONDITIONS
            data?.conditions?.forEach((condition) => {
                attributes = {...attributes, ...mapCondition(condition)};
            });

            // SKILLS, REPEATING SKILLS
            data?.skills?.forEach(skill => {
                attributes = {...attributes, ...mapSkill(skill)};
            });
            data?.lores?.common?.forEach(skill => {
                attributes = {...attributes, ...mapRepeatingSkill(skill, 'common-lore')};
            });
            data?.lores?.scholastic?.forEach(skill => {
                attributes = {...attributes, ...mapRepeatingSkill(skill, 'scholastic-lore')};
            });
            data?.lores?.forbidden?.forEach(skill => {
                attributes = {...attributes, ...mapRepeatingSkill(skill, 'forbidden-lore')};
            });
            data?.linguistics?.forEach(skill => {
                attributes = {...attributes, ...mapRepeatingSkill(skill, 'linguistics')};
            });
            data?.trades?.forEach(skill => {
                attributes = {...attributes, ...mapRepeatingSkill(skill, 'trade')};
            });

            // TALENTS, TRAITS
            data?.abilities?.forEach(ability => {
                attributes = {...attributes, ...mapAbility(ability, 'abilities')};
            });
            data?.traits?.forEach(trait => {
                attributes = {...attributes, ...mapTrait(trait)};
            });

            // INVENTORY
            data?.inventory?.weapons?.ranged?.forEach( weapon => {
                attributes = {...attributes, ...mapRangedWeapon(weapon)};
            });
            data?.inventory?.weapons?.melee?.forEach( weapon => {
                attributes = {...attributes, ...mapMeleeWeapon(weapon)};
            });
            data?.inventory?.gears?.forEach( gear => {
                attributes = {...attributes, ...mapGear(gear)};
            });
            // data?.inventory?.tools?.forEach( tool => {
            // attributes = {...attributes, ...mapTool(tool)};
            // });
            // data?.inventory?.consumables?.forEach( drug => {
            // attributes = {...attributes, ...mapDrug(drug)};
            // });
            attributes = {...attributes, ...mapOldArmor(data?.inventory?.armor)};
            // data?.inventory?.armors?.forEach( armor => {
            // attributes = {...attributes, ...mapArmor(armor)};
            // });
            // data?.inventory?.ammos?.forEach( ammo => {
            // attributes = {...attributes, ...mapAmmo(ammo)};
            // });
            data?.inventory?.cybernetics?.forEach( cybernetic => {
                attributes = {...attributes, ...mapCybernetic(cybernetic)};
            });

            // ADVANCEMENTS
            attributes = {...attributes, ...mapAptitudes(data?.advancements?.aptitudes)};
            attributes = {...attributes, ...mapAdvance(data?.advancements?.advances)};
            for (var training in data?.advancements?.training) {
                attributes[`weapons_training_${training}`] = data?.advancements?.training[training];
            }

            // INSANITY, CORRUPTION
            attributes[`insanity_pts`] = data?.insanity?.points;
            data?.insanity?.disorders?.forEach( disorder => {
                attributes = {...attributes, ...mapDisorder(disorder)};
            })
            attributes[`corruption_pts`] = data?.corruption?.points;
            data?.corruption?.mutations?.forEach( mutation => {
                attributes = {...attributes, ...mapMutation(mutation)};
            })

            // OBJECTIVES, NOTES
            data?.objectives?.forEach( objective => {
                attributes = {...attributes, ...mapObjective(objective)};
            });
            data?.notes?.forEach( note => {
                attributes = {...attributes, ...mapNote(note)};
            });

            // VEHICLES
            data?.vehicles?.list?.forEach( vehicle => {
                attributes = {...attributes, ...mapVehicle(vehicle)};
            });
            data?.vehicles?.weapons?.ranged?.forEach( weapon => {
                attributes = {...attributes, ...mapRangedWeapon(weapon, true)};
            });
            data?.vehicles?.weapons?.melee?.forEach( weapon => {
                attributes = {...attributes, ...mapMeleeWeapon(weapon, true)};
            });

            // PSYKANA
            attributes = {...attributes, ...mapPsykana(data?.psykana)};
            data?.psykana?.minor?.forEach( minor => {
                attributes = {...attributes, ...mapPsyMinor(minor)}
            })
            data?.psykana?.notes?.forEach( note => {
                attributes = {...attributes, ...mapPsyNote(note)}
            })
            data?.psykana?.powers?.forEach( power => {
                attributes = {...attributes, ...mapPsyPower(power)}
            })

            console.log('setting attributes');
            attributes.import_value = 'Success: Character Imported Successfully\n\nRemember to add the token manually';
            setAttrs(attributes, true);
        })
    })

    // Update to new version
    let oldVariables = [
        'gear_carry','gear_name','gear_crafts', 'gear_quantity','gear_avail','gear_weight','gear_pg#','gear_desc'
    ]
    on('sheet:opened', () => {
        getAttrs(oldVariables, values => {
            var attributes = {} 
            let gear = {carry: values['gear_carry'], name: values['gear_name'], craft: values['gear_crafts'], quantity: values['gear_quantity'], avail: values['gear_avail'], weight: values['gear_weight'], desc: values['gear_desc']}
            if (!gear.name == '') attributes = {...attributes, ...mapGear(gear)}
            console.table(gear)
            console.log(attributes)
        })
    })

    // functions
    const mapInfo = (data) => {
        let attr = {};
        attr['character_name'] = data.name || '';
        attr['Homeworld'] = data.homeworld || '';
        attr['Background'] = data.background || '';
        attr['Role'] = data.role || '';
        attr['EliteAdvances'] = data.eliteAdvances || '';
        attr['Notes'] = data.note || '';
        attr['Player'] = data.player || '';
        attr['appearance'] = data.appearance || '';
        attr['Quirks'] = data.quirks || '';
        attr['Divination'] = data.divination || '';
        attr['Superstition'] = data.superstition || '';
        attr['size'] = data.size || '';
        attr['xp_total'] = data.xp || '';
        attr['agi_mov_mod'] = data.movementModifier || '';
        return attr;
    };
    const mapStat = (statName, stat) => {
        let attr = {};
        attr[`${statName}`] = stat.base || 0;
        attr[`${statName}_advancement`] = stat.advancement || 0;
        attr[`${statName}_mod`] = stat.modifier || 0;
        attr[`${statName}_unnat`] = stat.unnatural || 0;
        return attr;
    };
    const mapWounds = (wounds) => {
        let attr = {};
        attr['wounds'] = wounds.current || '';
        attr['wounds_max'] = wounds.max || '';
        attr['head'] = wounds.critical?.head || '';
        attr['body'] = wounds.critical?.body || '';
        attr['arm_left'] = wounds.critical?.arm_left || '';
        attr['arm_right'] = wounds.critical?.arm_right || '';
        attr['leg_left'] = wounds.critical?.leg_left || '';
        attr['leg_right'] = wounds.critical?.leg_right || '';
        return attr;
    };
    const mapFate = (fate) => {
        let attr = {};
        attr['fate'] = fate.current || '';
        attr['fate_max'] = fate.max || '';
        attr['settings_fate'] = fate.setting || '';
        return attr;
    };
    const mapFatigue = (fatigue) => {
        let attr = {};
        attr['fatigue'] = fatigue.current || '';
        attr['fatigue_mod'] = fatigue.modifier || '';
        return attr;
    };
    const mapForceField = (forcefield) => {
        let attr = {};
        attr['forcefield_name'] = forcefield.name || '';
        attr['forcefield_protection'] = forcefield.protection || '';
        attr['forcefield_overload'] = forcefield.overload || '';
        return attr;
    };
    const mapCondition = (condition) => {
        if (!condition) return ;
        let attr = {},
            section = 'condition',
            id = generateRowID();
        attr[`repeating_${section}_${id}_condition_r`] = condition.name || '';
        attr[`repeating_${section}_${id}_condition_desc_r`] = condition.description || '';
        return attr;
    };
    const mapSkill = (skill) => {
        if (!skill) return ;
        let attr = {}
        attr[`mod2_${skill.name}`] = skill.modifier || 0;
        attr[`mod3_${skill.name}`] = skill.level || 0;
        return attr;
    };
    const mapRepeatingSkill = (skill, section) => {
        if (!skill) return ;
        let attr = {},
            id = generateRowID();
        attr[`repeating_${section}_${id}_${section}_name`] = skill.name || '';
        attr[`repeating_${section}_${id}_${section}_r_mod2`] = skill.modifier || '';
        attr[`repeating_${section}_${id}_${section}_r_mod3`] = skill.level || '';
        return attr;
    };
    const mapAbility = (ability) => {
        if (!ability) return ;
        let attr = {},
            section = 'abilities',
            id = generateRowID();
        attr[`repeating_${section}_${id}_ability_r`] = ability.name || '';
        attr[`repeating_${section}_${id}_ability_desc_r`] = ability.description || '';
        return attr;
    };
    const mapTrait = (trait) => {
        if (!trait) return ;
        let attr = {},
            section = 'traits',
            id = generateRowID();
        attr[`repeating_${section}_${id}_trait_r`] = trait.name || '';
        attr[`repeating_${section}_${id}_trait_desc_r`] = trait.description || '';
        return attr;
    }
    const mapAptitudes = (aptitudes) => {
        var attr = {};
        var	section = 'aptitudes';
        for (var i = 0; i < aptitudes?.length; i += 3) {
            let id = generateRowID();
            attr[`repeating_${section}_${id}_aptitude_nameL_r`] = aptitudes[i] || '';
            attr[`repeating_${section}_${id}_aptitude_nameM_r`] = aptitudes[i+1] || '';
            attr[`repeating_${section}_${id}_aptitude_nameR_r`] = aptitudes[i+2] || '';
        }
        return attr;
    };
    const mapRangedWeapon = (weapon, vehicle) => {
        if (!weapon) return ;
        let attr = {},
            section = (vehicle) ? 'vehiclerangedweapons' : 'rangedweapons',
            id = generateRowID();
        if (vehicle) id += '_V';
        attr[`repeating_${section}_${id}_R_weapon_name`] = weapon.name || '';
        attr[`repeating_${section}_${id}_R_weapon_class`] = weapon.class || '';
        attr[`repeating_${section}_${id}_R_weapon_range`] = weapon.range || '';
        attr[`repeating_${section}_${id}_R_weapon_dam-roll`] = weapon.damage || '';
        attr[`repeating_${section}_${id}_R_weapon_pen`] = weapon.pen || '';
        attr[`repeating_${section}_${id}_R_weapon_type`] = weapon.type || '';
        attr[`repeating_${section}_${id}_R_weapon_max`] = weapon.max || '';
        attr[`repeating_${section}_${id}_R_weapon_min`] = weapon.min || '';
        attr[`repeating_${section}_${id}_R_weapon_vengeful`] = weapon.vengeful || '';
        attr[`repeating_${section}_${id}_R_weapon_accurate`] = weapon.accurate || '';
        attr[`repeating_${section}_${id}_R_weapon_burst`] = weapon.burst || '';
        attr[`repeating_${section}_${id}_R_weapon_auto`] = weapon.auto || '';
        attr[`repeating_${section}_${id}_R_weapon_mag`] = weapon.mag || '';
        attr[`repeating_${section}_${id}_R_weapon_mag_max`] = weapon.mag_max || '';
        attr[`repeating_${section}_${id}_R_weapon_trained`] = weapon.trained || '';
        attr[`repeating_${section}_${id}_R_weapon_mod1`] = weapon.mod1 || '';
        attr[`repeating_${section}_${id}_R_weapon_reload`] = weapon.reload || '';
        attr[`repeating_${section}_${id}_R_weapon_weight`] = weapon.weight || '';
        attr[`repeating_${section}_${id}_R_weapon_domain`] = weapon.domain || '';
        attr[`repeating_${section}_${id}_R_weapon_mishap_chance`] = weapon.mishap_chance || '';
        attr[`repeating_${section}_${id}_R_weapon_carry`] = weapon.carry || '';
        attr[`repeating_${section}_${id}_R_weapon_ability_r`] = weapon.special || '';
        attr[`repeating_${section}_${id}_R_weapon_ability_desc_r`] = weapon.description || '';
        return attr;
    }
    const mapMeleeWeapon = (weapon, vehicle) => {
        if (!weapon) return ;
        let attr = {},
            section = (vehicle) ? 'vehiclemeleeweapons' : 'meleeweapons',
            id = generateRowID();
        if (vehicle) id += '_V';
        attr[`repeating_${section}_${id}_M_weapon_name`] = weapon.name || '';
        attr[`repeating_${section}_${id}_M_weapon_class`] = weapon.class || '';
        attr[`repeating_${section}_${id}_M_weapon_reach`] = weapon.reach || '';
        attr[`repeating_${section}_${id}_M_weapon_dam-roll`] = weapon.damage || '';
        attr[`repeating_${section}_${id}_M_weapon_pen`] = weapon.pen || '';
        attr[`repeating_${section}_${id}_M_weapon_type`] = weapon.type || '';
        attr[`repeating_${section}_${id}_M_weapon_max`] = weapon.max || '';
        attr[`repeating_${section}_${id}_M_weapon_min`] = weapon.min || '';
        attr[`repeating_${section}_${id}_M_weapon_vengeful`] = weapon.vengeful || '';
        attr[`repeating_${section}_${id}_M_weapon_trained`] = weapon.trained || '';
        attr[`repeating_${section}_${id}_M_weapon_mod1`] = weapon.mod1 || '';
        attr[`repeating_${section}_${id}_M_weapon_weight`] = weapon.weight || '';
        attr[`repeating_${section}_${id}_M_weapon_domain`] = weapon.domain || '';
        attr[`repeating_${section}_${id}_M_weapon_carry`] = weapon.carry || '';
        attr[`repeating_${section}_${id}_M_weapon_ability_r`] = weapon.special || '';
        attr[`repeating_${section}_${id}_M_weapon_ability_desc_r`] = weapon.description || '';
        return attr;
    }
    const mapGear = (gear) => {
        if (!gear) return ;
        let attr = {},
            section = 'gear',
            id = generateRowID();
        attr[`repeating_${section}_${id}_gear_carry`] = gear.carry || '';
        attr[`repeating_${section}_${id}_gear_name_r`] = gear.name || '';
        attr[`repeating_${section}_${id}_gear_crafts_r`] = gear.craftsmanship || '';
        attr[`repeating_${section}_${id}_gear_quantity_r`] = gear.quantity || '';
        attr[`repeating_${section}_${id}_gear_avail_r`] = gear.availability || '';
        attr[`repeating_${section}_${id}_gear_weight_r`] = gear.weight || '';
        attr[`repeating_${section}_${id}_ability_desc_r`] = gear.description || '';
        return attr;
    }
    const mapCybernetic = (cybernetic) => {
        if (!cybernetic) return ;
        let attr = {},
            section = 'cybernetics',
            id = generateRowID();
        attr[`repeating_${section}_${id}_cybernetic_name_r`] = cybernetic.name || '';
        attr[`repeating_${section}_${id}_cybernetic_location_r`] = cybernetic.location || '';
        attr[`repeating_${section}_${id}_cybernetic_desc_r`] = cybernetic.description || '';
        return attr;
    }
    const mapOldArmor = (armor) => {
        let attr = {};
        attr.armor_AGI = armor.maxAgi || '';
        attr.armor_limit = armor.limit || '';
        attr.armor_head = armor.head || '';
        attr.armor_body = armor.body || '';
        attr.armor_arm_right = armor.arm_right || '';
        attr.armor_arm_left = armor.arm_left || '';
        attr.armor_leg_right = armor.leg_right || '';
        attr.armor_leg_left = armor.leg_left || '';
        attr.armor_name = armor.description || '';
        return attr;
    }
    const mapAdvance = (advance) => {
        var attr = {};
        var	section = 'advancements';
        for (var i = 0; i < advance?.length; i += 2) {
            let id = generateRowID();
            attr[`repeating_${section}_${id}_advancement_nameL_r`] = advance[i]?.name || '';
            attr[`repeating_${section}_${id}_advancement_costL_r`] = advance[i]?.cost || '';
            attr[`repeating_${section}_${id}_advancement_nameR_r`] = advance[i+1]?.name || '';
            attr[`repeating_${section}_${id}_advancement_costR_r`] = advance[i+1]?.cost || '';
        }
        return attr;
    };
    const mapDisorder = (disorder) => {
        if (!disorder) return;
        let attr = {},
            section = 'disorders',
            id = generateRowID();
        attr[`repeating_${section}_${id}_disorder_r`] = disorder.name || '';
        attr[`repeating_${section}_${id}_disorder_desc_r`] = disorder.description || '';
        return attr;
    }
    const mapMutation = (mutation) => {
        if (!mutation) return;
        let attr = {},
            section = 'mutations',
            id = generateRowID();
        attr[`repeating_${section}_${id}_mutation_r`] = mutation.name || '';
        attr[`repeating_${section}_${id}_mutation_desc_r`] = mutation.description || '';
        return attr;
    }
    const mapObjective = (objective) => {
        if (!objective) return;
        let attr = {},
            section = 'objectives',
            id = generateRowID();
        attr[`repeating_${section}_${id}_objective_r`] = objective.name || '';
        attr[`repeating_${section}_${id}_objective_completed`] = objective.complete || '';
        return attr;
    }
    const mapNote = (note) => {
        if (!note) return;
        let attr = {},
            section = 'notes',
            id = generateRowID();
        attr[`repeating_${section}_${id}_notes`] = note.name || '';
        return attr;
    }
    const mapVehicle = (vehicle) => {
        if (!vehicle) return;
        let attr = {},
            section = 'vehicles',
            id = generateRowID();
        attr[`repeating_${section}_${id}_vehicle-name`] = vehicle.name || '';
        attr[`repeating_${section}_${id}_vehicle-size`] = vehicle.size || '';
        attr[`repeating_${section}_${id}_vehicle-world`] = vehicle.world || '';
        attr[`repeating_${section}_${id}_vehicle-type`] = vehicle.type || '';
        attr[`repeating_${section}_${id}_vehicle-tactical`] = vehicle.tactical || '';
        attr[`repeating_${section}_${id}_vehicle-cruising`] = vehicle.cruising || '';
        attr[`repeating_${section}_${id}_vehicle-maneuver`] = vehicle.maneuver || '';
        attr[`repeating_${section}_${id}_vehicle-crew`] = vehicle.crew || '';
        attr[`repeating_${section}_${id}_vehicle-compliment`] = vehicle.compliment || '';
        attr[`repeating_${section}_${id}_vehicle-integrity`] = vehicle.integrity || '';
        attr[`repeating_${section}_${id}_vehicle-integrity_max`] = vehicle.integrity_max || '';
        attr[`repeating_${section}_${id}_vehicle-armor-front`] = vehicle['armor-front'] || '';
        attr[`repeating_${section}_${id}_vehicle-armor-side`] = vehicle['armor-side'] || '';
        attr[`repeating_${section}_${id}_vehicle-armor-rear`] = vehicle['armor-rear'] || '';
        attr[`repeating_${section}_${id}_armaments`] = vehicle.armaments || '';
        attr[`repeating_${section}_${id}_armaments_desc`] = vehicle.armaments_desc || '';
        attr[`repeating_${section}_${id}_vehicle_traits`] = vehicle.traits || '';
        attr[`repeating_${section}_${id}_vehicle_traits_desc`] = vehicle.traits_desc || '';
        attr[`repeating_${section}_${id}_modifications`] = vehicle.modifications || '';
        attr[`repeating_${section}_${id}_modifications_desc`] = vehicle.modifications_desc || '';
        return attr;
    }
    const mapPsykana = (psykana) => {
        let attr = {};
        attr[`psykana_class`] = psykana.class || '';
        attr[`psykana_limit`] = psykana.limit || '';
        attr[`psy_rating`] = psykana.rating || '';
        attr[`psy_push`] = psykana.push || '';
        attr[`psykana_sustain`] = psykana.sustain || '';
        attr[`focus_mod`] = psykana.focus_mod || '';
        attr[`psykana_sustain_count`] = psykana.sustain_count || '';
        return attr;
    };
    const mapPsyMinor = (minor) => {
        if (!minor) return
        let attr = {},
            section = 'minormanifestation',
            id = generateRowID();
        attr[`repeating_${section}_${id}_P_minor_r`] = minor.name || '';
        attr[`repeating_${section}_${id}_P_minor_desc_r`] = minor.description || '';
        return attr;
    }
    const mapPsyNote = (note) => {
        if (!note) return
        let attr = {},
            section = 'psynotes',
            id = generateRowID();
        attr[`repeating_${section}_${id}_P_note_r`] = note.name || '';
        attr[`repeating_${section}_${id}_P_note_desc_r`] = note.description || '';
        return attr;
    }
    const mapPsyPower = (power) => {
        if (!power) return;
        let attr = {},
            section = 'psychicabilities',
            id = generateRowID();
        attr[`repeating_${section}_${id}_P_name`] = power.name || '';
        attr[`repeating_${section}_${id}_P_subtype`] = power.subtype || '';
        attr[`repeating_${section}_${id}_P_range`] = power.range || '';
        attr[`repeating_${section}_${id}_P_dam-roll`] = power.damage || '';
        attr[`repeating_${section}_${id}_P_type`] = power.type || '';
        attr[`repeating_${section}_${id}_P_pen`] = power.pen || '';
        attr[`repeating_${section}_${id}_P_focus`] = power.focus || '';
        attr[`repeating_${section}_${id}_P_mod1`] = power.mod || '';
        attr[`repeating_${section}_${id}_P_multi`] = power.multi || '';
        attr[`repeating_${section}_${id}_P_action`] = power.action || '';
        attr[`repeating_${section}_${id}_P_sustained`] = power.sustained || '';
        attr[`repeating_${section}_${id}_P_hitloc`] = power.hitloc || '';
        attr[`repeating_${section}_${id}_P_ability_r`] = power.ability || '';
        attr[`repeating_${section}_${id}_P_desc_r`] = power.desc || '';
        return attr;
    }