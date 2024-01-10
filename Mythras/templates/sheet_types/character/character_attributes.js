/* Action Points */
const actionPointGetAttrs = ['dex', 'int', 'pow', 'action_points_other', 'action_points_temp', 'action_points_calc', 'action_points', 'action_points_max', 'fatigue', 'attribute_mode']
function calcActionPoints(v) {
    let newAttrs = {};
    const int = parseInt(v['int']) || 0;
    const action_points_other = parseInt(v['action_points_other']) || 0;
    const action_points_temp = parseInt(v['action_points_temp']) || 0;
    const action_points_max = parseInt(v['action_points_max']) || 0;
    const action_points = parseInt(v['action_points']) || 0;
    const fatigueMod = parseInt(fatigueTable[v['fatigue']]['action_points']) || 0;

    let action_points_base;
    if (v['action_points_calc'] === "set_2") {
        newAttrs['action_points_max'] = 2 + action_points_other + action_points_temp;
    } else if (v['action_points_calc'] === "set_3") {
        newAttrs['action_points_max'] = 3 + action_points_other + action_points_temp;
    } else {
        if (v['attribute_mode'] === 'physical') {
            const dex = parseInt(v['dex']) || 0;
            newAttrs['action_points_max'] = Math.ceil((int + dex) / 12) + action_points_other  + action_points_temp + fatigueMod;
        } else if (v['attribute_mode'] === 'spiritual') {
            const pow = parseInt(v['pow']) || 0;
            newAttrs['action_points_max'] = Math.ceil((int + pow) / 12) + action_points_other + action_points_temp; /* I assume fatigue doesn't affect spirit */
        } else {
            newAttrs['action_points_max'] = 3 + action_points_temp + fatigueMod;
        }
    }

    const diffVal = newAttrs['action_points_max'] - action_points_max;
    newAttrs['action_points'] = action_points + diffVal;
    return newAttrs;
}
on('change:action_points_other change:action_points_temp', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(actionPointGetAttrs, function(v) {
        setAttrs(calcActionPoints(v));
    });
});
on('change:action_points_calc', function(event) {
    /* Don't exit on sheetworker cause humans will modify the option not the setting itself */
    getAttrs(actionPointGetAttrs, function(v) {
        setAttrs({
            ...calcActionPoints(v)
        });
    });
});

/* Confidence */
const confidenceGetAttrs = ['confidence_other', 'confidence_temp', 'willpower']
function calcConfidence(v) {
    let newAttrs = {};
    const confidenceOther = parseInt(v['confidence_other']) || 0;
    const confidenceTemp = parseInt(v['confidence_temp']) || 0;
    const willpower = parseInt(v['willpower']) || 0;
    const confidenceBase = Math.floor(willpower/20) + confidenceOther;
    newAttrs['confidence'] = confidenceBase + confidenceTemp;

    return newAttrs;
}
on('change:confidence_other change:confidence_temp', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(confidenceGetAttrs, function(v) {
        setAttrs(calcConfidence(v));
    });
});

/* Social Damage */
const socialDamageGetAttrs = ['social_offense_id', 'social_offense_total', 'social_damage_other', 'social_damage_temp'];
/**
 * Calculate the social damage value
 * @param v attrs needed for calc; socialDamageGetAttrs
 * @returns {}
 */
function calcSocialDamage(v) {
    let newAttrs = {};
    let socialOffenseSkill = parseInt(v['social_offense_total']) || 0;
    const socialDamageOther = parseInt(v['social_damage_other']) || 0;
    const socialDamageTemp = parseInt(v['social_damage_temp']) || 0;
    const newSocialDamageStep = Math.ceil(socialOffenseSkill/20) + socialDamageOther + socialDamageTemp;
    newAttrs['social_damage'] = damageTable(newSocialDamageStep);

    return newAttrs;
}
on('change:social_damage_other change:social_damage_temp', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(socialDamageGetAttrs, function(v) {
        setAttrs(calcSocialDamage(v));
    });
});

/* Spirit Damage */
const spiritDamageGetAttrs = ['spirit_combat_skill_id', 'spirit_combat_skill_total', 'spirit_damage_other', 'spirit_damage_temp'];
/**
 * Calculate the spirt damage value
 * @param v attrs needed for calc; spiritDamageGetAttrs
 * @returns {}
 */
function calcSpiritDamage(v) {
    let newAttrs = {};
    let spiritCombatSkill = parseInt(v['spirit_combat_skill_total']) || 0;
    if (v['spirit_combat_skill_id'] === 'willpower') {
        spiritCombatSkill = Math.ceil(spiritCombatSkill/2);
    }
    const spiritDamageOther = parseInt(v['spirit_damage_other']) || 0;
    const spiritDamageTemp = parseInt(v['spirit_damage_temp']) || 0;
    const newSpiritDamageStep = Math.ceil(spiritCombatSkill/20) + spiritDamageOther + spiritDamageTemp;
    newAttrs['spirit_damage'] = damageTable(newSpiritDamageStep);

    return newAttrs;
}
on('change:spirit_damage_other change:spirit_damage_temp', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(spiritDamageGetAttrs, function(v) {
        setAttrs(calcSpiritDamage(v));
    });
});

/* Damage Modifier */
const damageModGetAttrs = ['str', 'siz', 'con', 'pow', 'damage_mod_calc', 'damage_mod_temp', 'damage_mod_other'];
/**
 * Calculate the damage modifier
 * @param v attrs needed for calc; damageModGetAttrs
 * @returns {}
 */
function calcDamageMod(v) {
    let damage_mod_table_value;
    let str = parseInt(v['str']) || 0;
    const siz = parseInt(v['siz']) || 0;
    /* Special condition for elemental that have no SIZ, if 0 use str * 2 */
    if (siz === 0) {
        str = str * 2;
    }
    const damageModOther = parseInt(v['damage_mod_other']) || 0;
    const damageModTemp = parseInt(v['damage_mod_temp']) || 0;
    if (v['damage_mod_calc'] === '1') {
        const pow = parseInt(v['pow']) || 0;
        damage_mod_table_value = str + siz + pow;
    } else if (v['damage_mod_calc'] === '2') {
        const con = parseInt(v['con']) || 0;
        damage_mod_table_value = str + siz + con;
    } else {
        damage_mod_table_value = str + siz;
    }

    const damage_mod_step = Math.ceil(damage_mod_table_value / 5) - 5 + damageModOther + damageModTemp;

    return {
        damage_mod: damageModTable(damage_mod_step)
    };
}
on('change:damage_mod_other change:damage_mod_temp change:damage_mod_calc', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(damageModGetAttrs, function(v) {
        setAttrs(calcDamageMod(v));
    });
});

/* Experience Modifier */
const expModGetAttrs = ['cha', 'int', 'experience_mod_calc', 'experience_mod_other', 'experience_mod_temp'];
/**
 * Calculate Experience Modifier
 * @param v attributes needed for calc, expModGetAttrs
 * @returns {}
 */
function calcExpMod(v) {
    let newAttrs = {};
    const expModOther = parseInt(v['experience_mod_other']) || 0;
    const expModTemp = parseInt(v['experience_mod_temp']) || 0;
    if(v['experience_mod_calc'] === '1') {
        const int = parseInt(v['int']) || 0;
        newAttrs['experience_mod'] = Math.ceil(int/6)-2 + expModOther + expModTemp;
    } else {
        const cha = parseInt(v['cha']) || 0;
        newAttrs['experience_mod'] = Math.ceil(cha/6)-2 + expModOther + expModTemp;
    }

    return newAttrs;
}
on('change:experience_mod_other change:experience_mod_temp change:experience_mod_calc', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(expModGetAttrs, function(v) {
        setAttrs(calcExpMod(v));
    });
});

/* Healing Rate */
const healingRateGetAttrs = ['con', 'pow', 'healing_rate_calc', 'healing_rate_other', 'healing_rate_temp', 'healing_rate_double'];
/**
 * Calculate Healing Rate
 * @param v attributes needed for calc, healingRateGetAttrs
 * @returns {}
 */
function calcHealingRate(v) {
    let base_multiplier;
    let newAttrs = {};
    const con = parseInt(v['con']) || 0;
    const healingRateOther = parseInt(v['healing_rate_other']) || 0;
    const healingRateTemp = parseInt(v['healing_rate_temp']) || 0;
    if (v['healing_rate_double'] === '1') {
        base_multiplier = 2;
    } else {
        base_multiplier = 1;
    }

    if (v['healing_rate_calc'] === '1') {
        const pow = parseInt(v['pow']) || 0;
        newAttrs['healing_rate'] = (Math.ceil(Math.ceil(con+(pow/2))/6) * base_multiplier) + healingRateOther + healingRateTemp;
    } else {
        newAttrs['healing_rate'] = (Math.ceil(con/6) * base_multiplier) + healingRateOther + healingRateTemp;
    }

    return newAttrs;
}
on('change:healing_rate_other change:healing_rate_temp change:healing_rate_calc change:healing_rate_double', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(healingRateGetAttrs, function(v) {
        setAttrs(calcHealingRate(v));
    });
});

/* Initiative */
const initGetAttrs=['int', 'dex', 'cha', 'initiative_bonus_other', 'initiative_bonus_temp',
    'armor_penalty', 'fatigue', 'athletics', 'initiative_add_one_tenth_athletics', 'attribute_mode']
/**
 * Calculate Initiative Bonus
 * @param v attrs needed for calculation, initGetAttrs
 * @returns {}
 */
function calcInitiativeBonus(v) {
    let newAttrs = {};
    const int = parseInt(v['int']) || 0;
    const initOther = parseInt(v['initiative_bonus_other']) || 0;
    const initTemp = parseInt(v['initiative_bonus_temp']) || 0;
    const fatiguePenalty = parseInt(fatigueTable[v['fatigue']]['initiative']) || 0;
    if (v['attribute_mode'] === 'physical') {
        const dex = parseInt(v['dex']) || 0;
        const armor_penalty = parseInt(v['armor_penalty']) || 0;
        let athletics_bonus = 0;
        if (v['initiative_add_one_tenth_athletics'] === '1') {
            const athletics = parseInt(v['athletics']) || 0;
            athletics_bonus = Math.ceil(athletics/10);
        }
        newAttrs['initiative_bonus'] = Math.ceil((int + dex) / 2) + initOther + initTemp + athletics_bonus + fatiguePenalty + armor_penalty;
    } else { /* Social and spirit initiative are the same */
        const cha = parseInt(v['cha']) || 0;
        newAttrs['initiative_bonus'] = Math.ceil((int + cha) / 2) + initOther + initTemp;
    }

    return newAttrs;
}
on('change:initiative_bonus_other change:initiative_bonus_temp change:initiative_add_one_tenth_athletics', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(initGetAttrs, function(v) {
        setAttrs(calcInitiativeBonus(v));
    });
});

/* Luck Points */
const luckPointsGetAttrs=['pow', 'cha', 'luck_points_calc', 'luck_points_other', 'luck_points_temp', 'luck_points_rank', 'rank', 'luck_points', 'luck_points_max']
/**
 * Calculate Luck Points
 * @param v attrs needed for calculation, luckPointsGetAttrs
 * @param sourceAttribute the attr the triggered the change
 * @returns {}
 */
function calcLuckPoints(v) {
    let newAttrs = {};
    const pow = parseInt(v['pow']) || 0;
    const rank = parseInt(v['rank']) || 0;
    const luckPointsRank = parseInt(v['luck_points_rank']) || 0;
    const luckPointsOther = parseInt(v['luck_points_other']) || 0;
    const luckPointsTemp = parseInt(v['luck_points_temp']) || 0;
    const luckPointsMax = parseInt(v['luck_points_max']) || 0;
    const luckPointsCurr = parseInt(v['luck_points']) || 0;
    if (v['luck_points_calc'] === '1') {
        const cha = parseInt(v['cha']) || 0;
        newAttrs['luck_points_max'] = Math.ceil(Math.ceil(cha+(pow/2))/6) + luckPointsOther + luckPointsTemp + (luckPointsRank * rank);
    } else {
        newAttrs['luck_points_max'] = Math.ceil(pow/6) + luckPointsOther + luckPointsTemp + (luckPointsRank * rank);
    }

    const diffVal = newAttrs['luck_points_max'] - luckPointsMax;
    newAttrs['luck_points'] = luckPointsCurr + diffVal;
    return newAttrs;
}
on('change:luck_points_other change:luck_points_temp change:luck_points_calc change:rank', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(luckPointsGetAttrs, function(v) {
        setAttrs(calcLuckPoints(v));
    });
});
on('change:luck_points_rank', function(event) {
    /* Don't exit on sheetworker cause humans will modify the option not the setting itself */
    getAttrs(luckPointsGetAttrs, function(v) {
        setAttrs(calcLuckPoints(v));
    });
});

/* Magic Points */
const magicPointsGetAttrs = ['pow', 'magic_points_other', 'magic_points_temp', 'magic_points', 'magic_points_max'];
/**
 * Calculate Magic points
 * @param v attrs needed for calculation, magicPointsGetAttrs
 * @param sourceAttribute the attr the triggered the change
 * @returns {}
 */
function calcMagicPoints(v) {
    let newAttrs = {};
    const pow = parseInt(v['pow']) || 0;
    const magicPointsOther = parseInt(v['magic_points_other']) || 0;
    const magicPointsTemp = parseInt(v['magic_points_temp']) || 0;
    const magicPointsCurr = parseInt(v['magic_points']) || 0;
    const magicPointsMax = parseInt(v['magic_points_max']) || 0;
    newAttrs['magic_points_max'] = pow + magicPointsOther + magicPointsTemp;

    const diffVal = newAttrs['magic_points_max'] - magicPointsMax;
    newAttrs['magic_points'] = magicPointsCurr + diffVal;
    return newAttrs;
}
on('change:magic_points_other change:magic_points_temp change:magic_points_max', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(magicPointsGetAttrs, function(v) {
        setAttrs(calcMagicPoints(v));
    });
});

/* Movement Rate */
const moveRateGetAttrs = ['movement_rate_species', 'movement_rate_other', 'movement_rate_temp', 'fatigue', 'encumbrance_load', 'athletics'];
/**
 *
 * @param value
 * @param modifier
 * @returns {number|*}
 */
function applyMovementMod(value, modifier) {
    if (modifier === '-1') {
        return value - 1;
    } else if (modifier === '-2') {
        return value - 2;
    } else if (modifier === '*.5') {
        return Math.ceil(value / 2);
    } else if (modifier === '*0') {
        return 0;
    } else {
        return value;
    }
}
/**
 * Calculate movement rate and other movement derived values
 * @param v attrs needed for calculation, moveRateGetAttrs
 * @returns {}
 */
function calcMoveRate(v) {
    let newAttrs = {};
    const moveRateSpecies = parseInt(v['movement_rate_species']) || 0;
    const moveRateOther = parseInt(v['movement_rate_other']) || 0;
    const moveRateTemp = parseInt(v['movement_rate_temp']) || 0;
    const core_value = moveRateSpecies + moveRateOther + moveRateTemp;
    const moveAfterFatigue = applyMovementMod(core_value, fatigueTable[v['fatigue']]['movement']);
    newAttrs['movement_rate'] = applyMovementMod(moveAfterFatigue, loadTable[v['encumbrance_load']]['movement']);

    return newAttrs;
}
on('change:movement_rate_species change:movement_rate_other change:movement_rate_temp', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(moveRateGetAttrs, function(v) {
        setAttrs(calcMoveRate(v));
    });
});

/* Spirit Intensity */
const spiritIntensityGetAttrs = ['pow']
function calcSpiritIntensity(v) {
    const pow = parseInt(v['pow']) || 0;
    return {'spirit_intensity': Math.floor(pow/6)};
}

/* Tenacity Points */
const tenacityGetAttrs = ['pow', 'tenacity_other', 'tenacity_temp', 'tenacity', 'tenacity_max', 'tenacity_dependencies', 'apply_dependencies_penalty'];
/**
 * Calculate Tenacity points
 * @param v attrs needed for calculation, tenacityPointsGetAttrs
 * @param sourceAttribute the attr the triggered the change
 * @returns {}
 */
function calcTenacity(v) {
    let newAttrs = {};
    const pow = parseInt(v['pow']) || 0;
    const tenacityOther = parseInt(v['tenacity_other']) || 0;
    const tenacityTemp = parseInt(v['tenacity_temp']) || 0;
    const tenacityCurr = parseInt(v['tenacity']) || 0;
    const tenacityMax = parseInt(v['tenacity_max']) || 0;
    let tenacityDeps = 0;
    if (v['apply_dependencies_penalty'] === '1') {
        tenacityDeps = parseInt(v['tenacity_dependencies']) || 0;
    }
    newAttrs['tenacity_max'] = pow + tenacityOther + tenacityTemp + tenacityDeps;

    const diffVal = newAttrs['tenacity_max'] - tenacityMax;
    newAttrs['tenacity'] = tenacityCurr + diffVal;
    return newAttrs;
}
on('change:tenacity_other change:tenacity_temp change:apply_dependencies_penalty', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(tenacityGetAttrs, function(v) {
        setAttrs(calcTenacity(v));
    });
});

/* Hit Locations */
const hitLocationTable = {
    custom1: {
        location2to7_display: 0, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    custom7: {
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    custom8: {
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    custom9: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0
    },
    custom10: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0
    },
    custom11: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0
    },
    custom: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1
    },
    rabble: {
        location1_table_start: 1, location1_table_end: 20, location1_name: getTranslationByKey('hit_points'), location1_hp_max_base_mod: 0,
        location2_table_start: 0, location2_table_end: 0, location2_name: " ", location2_hp_max_base_mod: '-',
        location3_table_start: 0, location3_table_end: 0, location3_name: " ", location3_hp_max_base_mod: '-',
        location4_table_start: 0, location4_table_end: 0, location4_name: " ", location4_hp_max_base_mod: '-',
        location5_table_start: 0, location5_table_end: 0, location5_name: " ", location5_hp_max_base_mod: '-',
        location6_table_start: 0, location6_table_end: 0, location6_name: " ", location6_hp_max_base_mod: '-',
        location7_table_start: 0, location7_table_end: 0, location7_name: " ", location7_hp_max_base_mod: '-',
        location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: '-',
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 0, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    simplified: {
        location1_table_start: 1, location1_table_end: 20, location1_name: getTranslationByKey('hit_points'), location1_hp_max_base_mod: 0,
        location2_table_start: 0, location2_table_end: 0, location2_name: " ", location2_hp_max_base_mod: '-',
        location3_table_start: 0, location3_table_end: 0, location3_name: " ", location3_hp_max_base_mod: '-',
        location4_table_start: 0, location4_table_end: 0, location4_name: " ", location4_hp_max_base_mod: '-',
        location5_table_start: 0, location5_table_end: 0, location5_name: " ", location5_hp_max_base_mod: '-',
        location6_table_start: 0, location6_table_end: 0, location6_name: " ", location6_hp_max_base_mod: '-',
        location7_table_start: 0, location7_table_end: 0, location7_name: " ", location7_hp_max_base_mod: '-',
        location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: '-',
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 0, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    arachnid: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: -1,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: -1,
        location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('mid_right_leg'), location3_hp_max_base_mod: -1,
        location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('mid_left_leg'), location4_hp_max_base_mod: -1,
        location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('fore_right_leg'), location5_hp_max_base_mod: -1,
        location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('fore_left_leg'), location6_hp_max_base_mod: -1,
        location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('abdomen'), location7_hp_max_base_mod: 2,
        location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('front_right_leg'), location8_hp_max_base_mod: -1,
        location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('front_left_leg'), location9_hp_max_base_mod: -1,
        location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('cephalothorax'), location10_hp_max_base_mod: 1,
        location11_table_start: 0, location11_table_end: 0, location11_name: "", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: "", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0
    },
    humanoid: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 7, location3_table_end: 9, location3_name: getTranslationByKey('abdomen'), location3_hp_max_base_mod: 1,
        location4_table_start: 10, location4_table_end: 12, location4_name: getTranslationByKey('chest'), location4_hp_max_base_mod: 2,
        location5_table_start: 13, location5_table_end: 15, location5_name: getTranslationByKey('right_arm'), location5_hp_max_base_mod: -1,
        location6_table_start: 16, location6_table_end: 18, location6_name: getTranslationByKey('left_arm'), location6_hp_max_base_mod: -1,
        location7_table_start: 19, location7_table_end: 20, location7_name: getTranslationByKey('head'), location7_hp_max_base_mod: 0,
        location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: '-',
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    centaurid: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 7, location3_table_end: 8, location3_name: getTranslationByKey('hindquarters'), location3_hp_max_base_mod: 1,
        location4_table_start: 9, location4_table_end: 10, location4_name: getTranslationByKey('forequarters'), location4_hp_max_base_mod: 2,
        location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('front_right_leg'), location5_hp_max_base_mod: 0,
        location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('front_left_leg'), location6_hp_max_base_mod: 0,
        location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('chest'), location7_hp_max_base_mod: -1,
        location8_table_start: 17, location8_table_end: 17, location8_name: getTranslationByKey('right_arm'), location8_hp_max_base_mod: -4,
        location9_table_start: 18, location9_table_end: 18, location9_name: getTranslationByKey('left_arm'), location9_hp_max_base_mod: -4,
        location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head'), location10_hp_max_base_mod: -3,
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0
    },
    decapoda: {
        location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: -1,
        location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: -1,
        location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('mid_right_leg'), location3_hp_max_base_mod: -1,
        location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('mid_left_leg'), location4_hp_max_base_mod: -1,
        location5_table_start: 5, location5_table_end: 5, location5_name: getTranslationByKey('fore_right_leg'), location5_hp_max_base_mod: -1,
        location6_table_start: 6, location6_table_end: 6, location6_name: getTranslationByKey('fore_left_leg'), location6_hp_max_base_mod: -1,
        location7_table_start: 7, location7_table_end: 7, location7_name: getTranslationByKey('front_right_leg'), location7_hp_max_base_mod: -1,
        location8_table_start: 8, location8_table_end: 8, location8_name: getTranslationByKey('front_left_leg'), location8_hp_max_base_mod: -1,
        location9_table_start: 9, location9_table_end: 10, location9_name: getTranslationByKey('abdomen'), location9_hp_max_base_mod: 1,
        location10_table_start: 11, location10_table_end: 16, location10_name: getTranslationByKey('cephalothorax'), location10_hp_max_base_mod: 2,
        location11_table_start: 17, location11_table_end: 18, location11_name: getTranslationByKey('right_pincer'), location11_hp_max_base_mod: 2,
        location12_table_start: 19, location12_table_end: 20, location12_name: getTranslationByKey('left_pincer'), location12_hp_max_base_mod: 0,
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1
    },
    decapodiform: {
        location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('tentacle_1'), location1_hp_max_base_mod: -1,
        location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('tentacle_2'), location2_hp_max_base_mod: -1,
        location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('tentacle_3'), location3_hp_max_base_mod: -1,
        location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('tentacle_4'), location4_hp_max_base_mod: -1,
        location5_table_start: 5, location5_table_end: 5, location5_name: getTranslationByKey('tentacle_5'), location5_hp_max_base_mod: -1,
        location6_table_start: 6, location6_table_end: 6, location6_name: getTranslationByKey('tentacle_6'), location6_hp_max_base_mod: -1,
        location7_table_start: 7, location7_table_end: 7, location7_name: getTranslationByKey('tentacle_7'), location7_hp_max_base_mod: -1,
        location8_table_start: 8, location8_table_end: 8, location8_name: getTranslationByKey('tentacle_8'), location8_hp_max_base_mod: -1,
        location9_table_start: 9, location9_table_end: 11, location9_name: getTranslationByKey('long_tentacle_1'), location9_hp_max_base_mod: 0,
        location10_table_start: 12, location10_table_end: 14, location10_name: getTranslationByKey('long_tentacle_2'), location10_hp_max_base_mod: 0,
        location11_table_start: 15, location11_table_end: 17, location11_name: getTranslationByKey('body'), location11_hp_max_base_mod: 2,
        location12_table_start: 18, location12_table_end: 20, location12_name: getTranslationByKey('head'), location12_hp_max_base_mod: 1,
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1
    },
    dorsal_finned_aquatic: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('dorsal_fin'), location2_hp_max_base_mod: -1,
        location3_table_start: 7, location3_table_end: 10, location3_name: getTranslationByKey('hindquarters'), location3_hp_max_base_mod: 1,
        location4_table_start: 11, location4_table_end: 14, location4_name: getTranslationByKey('forequarters'), location4_hp_max_base_mod: 2,
        location5_table_start: 15, location5_table_end: 16, location5_name: getTranslationByKey('right_fin'), location5_hp_max_base_mod: -1,
        location6_table_start: 17, location6_table_end: 18, location6_name: getTranslationByKey('left_fin'), location6_hp_max_base_mod: -1,
        location7_table_start: 19, location7_table_end: 20, location7_name: getTranslationByKey('head'), location7_hp_max_base_mod: 0,
        location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: '-',
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    draconic: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tail'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear_right_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('rear_left_leg'), location3_hp_max_base_mod: 0,
        location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('hindquarters'), location4_hp_max_base_mod: 1,
        location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('right_wing'), location5_hp_max_base_mod: -1,
        location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('left_wing'), location6_hp_max_base_mod: -1,
        location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('forequarters'), location7_hp_max_base_mod: 2,
        location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('front_right_leg'), location8_hp_max_base_mod: 0,
        location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('front_left_leg'), location9_hp_max_base_mod: 0,
        location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head'), location10_hp_max_base_mod: 0,
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0
    },
    insect: {
        location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('right_rear_leg'), location1_hp_max_base_mod: -1,
        location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('left_rear_leg'), location2_hp_max_base_mod: -1,
        location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('mid_right_leg'), location3_hp_max_base_mod: -1,
        location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('mid_left_leg'), location4_hp_max_base_mod: -1,
        location5_table_start: 5, location5_table_end: 9, location5_name: getTranslationByKey('abdomen'), location5_hp_max_base_mod: 1,
        location6_table_start: 10, location6_table_end: 13, location6_name: getTranslationByKey('thorax'), location6_hp_max_base_mod: 2,
        location7_table_start: 14, location7_table_end: 14, location7_name: getTranslationByKey('front_right_leg'), location7_hp_max_base_mod: -1,
        location8_table_start: 15, location8_table_end: 15, location8_name: getTranslationByKey('front_left_leg'), location8_hp_max_base_mod: -1,
        location9_table_start: 16, location9_table_end: 20, location9_name: getTranslationByKey('head'), location9_hp_max_base_mod: 0,
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0
    },
    octopodiform: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tentacle_1'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('tentacle_2'), location2_hp_max_base_mod: 0,
        location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('tentacle_3'), location3_hp_max_base_mod: 0,
        location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('tentacle_4'), location4_hp_max_base_mod: 0,
        location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('tentacle_5'), location5_hp_max_base_mod: 0,
        location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('tentacle_6'), location6_hp_max_base_mod: 0,
        location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('tentacle_7'), location7_hp_max_base_mod: 0,
        location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('tentacle_8'), location8_hp_max_base_mod: 0,
        location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('body'), location9_hp_max_base_mod: 1,
        location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head'), location10_hp_max_base_mod: 2,
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0
    },
    pachyderm: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 5, location3_table_end: 8, location3_name: getTranslationByKey('hindquarters'), location3_hp_max_base_mod: 1,
        location4_table_start: 9, location4_table_end: 12, location4_name: getTranslationByKey('forequarters'), location4_hp_max_base_mod: 2,
        location5_table_start: 13, location5_table_end: 14, location5_name: getTranslationByKey('front_right_leg'), location5_hp_max_base_mod: 0,
        location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('front_left_leg'), location6_hp_max_base_mod: 0,
        location7_table_start: 17, location7_table_end: 17, location7_name: getTranslationByKey('trunk'), location7_hp_max_base_mod: -1,
        location8_table_start: 18, location8_table_end: 20, location8_name: getTranslationByKey('head'), location8_hp_max_base_mod: 0,
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    quadruped: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 5, location3_table_end: 7, location3_name: getTranslationByKey('hindquarters'), location3_hp_max_base_mod: 1,
        location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('forequarters'), location4_hp_max_base_mod: 2,
        location5_table_start: 11, location5_table_end: 13, location5_name: getTranslationByKey('front_right_leg'), location5_hp_max_base_mod: 0,
        location6_table_start: 14, location6_table_end: 16, location6_name: getTranslationByKey('front_left_leg'), location6_hp_max_base_mod: 0,
        location7_table_start: 17, location7_table_end: 20, location7_name: getTranslationByKey('head'), location7_hp_max_base_mod: 0,
        location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: '-',
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    serpentine: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail_tip'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('mid_end-length'), location2_hp_max_base_mod: 0,
        location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('fore_end-length'), location3_hp_max_base_mod: 0,
        location4_table_start: 8, location4_table_end: 9, location4_name: getTranslationByKey('rear_mid-length'), location4_hp_max_base_mod: 1,
        location5_table_start: 10, location5_table_end: 12, location5_name: getTranslationByKey('mid_mid-length'), location5_hp_max_base_mod: 1,
        location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('fore_mid-length'), location6_hp_max_base_mod: 1,
        location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('rear_fore-length'), location7_hp_max_base_mod: 0,
        location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('mid_fore-length'), location8_hp_max_base_mod: 0,
        location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head'), location9_hp_max_base_mod: 0,
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0
    },
    tailed_arachnid: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tail'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 3, location2_name: getTranslationByKey('rear_right_leg'), location2_hp_max_base_mod: -1,
        location3_table_start: 4, location3_table_end: 4, location3_name: getTranslationByKey('rear_left_leg'), location3_hp_max_base_mod: -1,
        location4_table_start: 5, location4_table_end: 5, location4_name: getTranslationByKey('mid_right_leg'), location4_hp_max_base_mod: -1,
        location5_table_start: 6, location5_table_end: 6, location5_name: getTranslationByKey('mid_left_leg'), location5_hp_max_base_mod: -1,
        location6_table_start: 7, location6_table_end: 7, location6_name: getTranslationByKey('fore_right_leg'), location6_hp_max_base_mod: -1,
        location7_table_start: 8, location7_table_end: 8, location7_name: getTranslationByKey('fore_left_leg'), location7_hp_max_base_mod: -1,
        location8_table_start: 9, location8_table_end: 12, location8_name: getTranslationByKey('thorax'), location8_hp_max_base_mod: 1,
        location9_table_start: 13, location9_table_end: 15, location9_name: getTranslationByKey('right_pincer'), location9_hp_max_base_mod: 0,
        location10_table_start: 16, location10_table_end: 18, location10_name: getTranslationByKey('left_pincer'), location10_hp_max_base_mod: 0,
        location11_table_start: 19, location11_table_end: 20, location11_name: getTranslationByKey('cephalothorax'), location11_hp_max_base_mod: 2,
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0
    },
    tailed_biped: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('right_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('left_leg'), location3_hp_max_base_mod: 0,
        location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('abdomen'), location4_hp_max_base_mod: 1,
        location5_table_start: 11, location5_table_end: 14, location5_name: getTranslationByKey('chest'), location5_hp_max_base_mod: 2,
        location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('right_arm'), location6_hp_max_base_mod: -1,
        location7_table_start: 17, location7_table_end: 18, location7_name: getTranslationByKey('left_arm'), location7_hp_max_base_mod: -1,
        location8_table_start: 19, location8_table_end: 20, location8_name: getTranslationByKey('head'), location8_hp_max_base_mod: 0,
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    tailed_quadruped: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('rear_right_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('rear_left_leg'), location3_hp_max_base_mod: 0,
        location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('hindquarters'), location4_hp_max_base_mod: 1,
        location5_table_start: 11, location5_table_end: 14, location5_name: getTranslationByKey('forequarters'), location5_hp_max_base_mod: 2,
        location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('front_right_leg'), location6_hp_max_base_mod: -1,
        location7_table_start: 17, location7_table_end: 18, location7_name: getTranslationByKey('front_left_leg'), location7_hp_max_base_mod: -1,
        location8_table_start: 19, location8_table_end: 20, location8_name: getTranslationByKey('head'), location8_hp_max_base_mod: 0,
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    winged_biped: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 7, location3_table_end: 9, location3_name: getTranslationByKey('abdomen'), location3_hp_max_base_mod: 1,
        location4_table_start: 10, location4_table_end: 10, location4_name: getTranslationByKey('chest'), location4_hp_max_base_mod: 2,
        location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('right_wing'), location5_hp_max_base_mod: 0,
        location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('left_wing'), location6_hp_max_base_mod: 0,
        location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('right_arm'), location7_hp_max_base_mod: -1,
        location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('left_arm'), location8_hp_max_base_mod: -1,
        location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head'), location9_hp_max_base_mod: 0,
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0
    },
    winged_insect: {
        location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: -1,
        location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: -1,
        location3_table_start: 3, location3_table_end: 4, location3_name: getTranslationByKey('metathorax'), location3_hp_max_base_mod: 1,
        location4_table_start: 5, location4_table_end: 5, location4_name: getTranslationByKey('mid_right_leg'), location4_hp_max_base_mod: -1,
        location5_table_start: 6, location5_table_end: 6, location5_name: getTranslationByKey('mid_left_leg'), location5_hp_max_base_mod: -1,
        location6_table_start: 7, location6_table_end: 10, location6_name: getTranslationByKey('prothorax'), location6_hp_max_base_mod: 2,
        location7_table_start: 11, location7_table_end: 12, location7_name: getTranslationByKey('right_wing'), location7_hp_max_base_mod: -1,
        location8_table_start: 13, location8_table_end: 14, location8_name: getTranslationByKey('left_wing'), location8_hp_max_base_mod: -1,
        location9_table_start: 15, location9_table_end: 16, location9_name: getTranslationByKey('front_right_leg'), location9_hp_max_base_mod: -1,
        location10_table_start: 17, location10_table_end: 18, location10_name: getTranslationByKey('front_left_leg'), location10_hp_max_base_mod: -1,
        location11_table_start: 19, location11_table_end: 20, location11_name: getTranslationByKey('head'), location11_hp_max_base_mod: 0,
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location1to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0
    },
    winged_quadruped: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 5, location3_table_end: 7, location3_name: getTranslationByKey('hindquarters'), location3_hp_max_base_mod: 1,
        location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('forequarters'), location4_hp_max_base_mod: 2,
        location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('right_wing'), location5_hp_max_base_mod: -1,
        location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('left_wing'), location6_hp_max_base_mod: -1,
        location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('front_right_leg'), location7_hp_max_base_mod: 0,
        location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('front_left_leg'), location8_hp_max_base_mod: 0,
        location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head'), location9_hp_max_base_mod: 0,
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0
    }
}
const hpGetAttrs = ['siz', 'con', 'str', 'pow', 'hp_calc', 'simplified_combat_enabled',
    `location1_hp_max_base_mod`, `location1_hp_max_other`, `location1_hp`, `location1_hp_max`,
    `location2_hp_max_base_mod`, `location2_hp_max_other`, `location2_hp`, `location2_hp_max`,
    `location3_hp_max_base_mod`, `location3_hp_max_other`, `location3_hp`, `location3_hp_max`,
    `location4_hp_max_base_mod`, `location4_hp_max_other`, `location4_hp`, `location4_hp_max`,
    `location5_hp_max_base_mod`, `location5_hp_max_other`, `location5_hp`, `location5_hp_max`,
    `location6_hp_max_base_mod`, `location6_hp_max_other`, `location6_hp`, `location6_hp_max`,
    `location7_hp_max_base_mod`, `location7_hp_max_other`, `location7_hp`, `location7_hp_max`,
    `location8_hp_max_base_mod`, `location8_hp_max_other`, `location8_hp`, `location8_hp_max`,
    `location9_hp_max_base_mod`, `location9_hp_max_other`, `location9_hp`, `location9_hp_max`,
    `location10_hp_max_base_mod`, `location10_hp_max_other`, `location10_hp`, `location10_hp_max`,
    `location11_hp_max_base_mod`, `location11_hp_max_other`, `location11_hp`, `location11_hp_max`,
    `location12_hp_max_base_mod`, `location12_hp_max_other`, `location12_hp`, `location12_hp_max`
]
/**
 * Find and return the root HP value which will need further modification per location
 * @param v attrs needed, ['siz', 'con', 'pow', 'str', 'simplified_combat_enabled', 'hp_calc']
 * @returns {number}
 */
function calcRootHP(v) {
    let denominator = 5;
    const siz = parseInt(v['siz']) || 0;
    const con = parseInt(v['con']) || 0;
    if (v['simplified_combat_enabled'] === '1') {
        denominator = 2;
    }

    if (v['hp_calc'] === '1') {
        const pow = parseInt(v['pow']) || 0;
        return Math.ceil((con + siz + pow)/denominator);
    } else if (v['hp_calc'] === '2') {
        const str = parseInt(v['str']) || 0;
        return Math.ceil((con + siz + str)/denominator);
    } else {
        return Math.ceil((con + siz)/denominator);
    }
}
/**
 *
 * @param num the location to calculate
 * @param v attrs needed, ['siz', 'con', 'str', 'pow', `location${num}_hp_max_base_mod`, `location${num}_hp_max_other`, `location${num}_hp`, `location${num}_hp_max`, 'hp_calc', 'simplified_combat_enabled']
 */
function calcLocationHP(num, v) {
    const rootHP = calcRootHP(v);
    const hpBaseMod = parseInt(v[`location${num}_hp_max_base_mod`]) || 0;
    const hpOther = parseInt(v[`location${num}_hp_max_other`]) || 0;
    const hpCurr = parseInt(v[`location${num}_hp`]) || 0;
    const hpMaxCurr = parseInt(v[`location${num}_hp_max`]) || 0;
    const newMax = rootHP + hpBaseMod + hpOther;
    const diff = hpCurr - hpMaxCurr;
    return {[`location${num}_hp`]: newMax + diff, [`location${num}_hp_max`]: newMax};
}
/**
 * Calc HP for all locations
 * @param v attrs neede, hpGetAttrs
 */
function calcAllHP(v) {
    return {
        ...calcLocationHP('1', v),
        ...calcLocationHP('2', v),
        ...calcLocationHP('3', v),
        ...calcLocationHP('4', v),
        ...calcLocationHP('5', v),
        ...calcLocationHP('6', v),
        ...calcLocationHP('7', v),
        ...calcLocationHP('8', v),
        ...calcLocationHP('9', v),
        ...calcLocationHP('10', v),
        ...calcLocationHP('11', v),
        ...calcLocationHP('12', v)
    }
}
/* Locational Hit Points */
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach(num => {
    on(`change:location${num}_hp_max_base_mod change:location${num}_hp_max_other`, function(event) {
        if (event.sourceType === "sheetworker") {return;}
        getAttrs(['siz', 'con', 'str', 'pow', `location${num}_hp_max_base_mod`, `location${num}_hp_max_other`,
            `location${num}_hp`, `location${num}_hp_max`, 'hp_calc', 'simplified_combat_enabled'], function(v) {
            if (debug) {console.log(`Setting attrs for location ${num} hp trigger`);}
            setAttrs( calcLocationHP(num, v) );
        });
    });
});
on(`change:hit_locations change:simplified_combat_enabled`, function(event) {
    /* don't prevent sheet workers cause they will set simplified_combat_enabled */
    getAttrs(['hit_locations'].concat(hpGetAttrs), function(v) {
        let newAttrs = hitLocationTable[v['hit_locations']];
        /* When simplified combat enabled we set hit locations to the special hidden simplified value */
        if (v['simplified_combat_enabled'] === '1') {
            newAttrs = hitLocationTable['simplified'];
        }
        /* merge the newAttrs with the ones we acquired to calculation all HP again */
        v = {...v, ...newAttrs}
        setAttrs({
            ...newAttrs,
            ...calcAllHP(v)
        });
    });
});
on('change:hp_calc', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(hpGetAttrs, function(v) {
        setAttrs({...calcAllHP(v)});
    });
});

/* Composure */
const composureGetAttrs = ['composure', 'composure_other', 'composure_max', 'pow']
function calcComposure(v) {
    const pow = parseInt(v['pow']) || 0;
    const composureOther = parseInt(v['composure_other']) || 0;
    const composureMax = parseInt(v['composure_max']) || 0;
    const composureCurr = parseInt(v['composure']) || 0;
    const newMax = Math.ceil(pow/3) + composureOther;
    const diff = composureCurr - composureMax;
    return {['composure']: newMax + diff, composure_max: newMax};
}
on('change:composure_other', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(composureGetAttrs, function(v) {
        setAttrs(calcComposure(v));
    });
});

/* Integrity */
const integrityGetAttrs = ['integrity', 'integrity_other', 'integrity_max', 'cha']
function calcIntegrity(v) {
    let newAttrs = {};
    const cha = parseInt(v['cha']) || 0;
    const integrityOther = parseInt(v['integrity_other']) || 0;
    const integrityMax = parseInt(v['integrity_max']) || 0;
    const integrityCurr = parseInt(v['integrity']) || 0;
    newAttrs['integrity_max'] = Math.ceil(cha/3) + integrityOther;
    const diffVal = newAttrs['integrity_max'] - integrityMax;
    newAttrs['integrity'] = integrityCurr + diffVal;
    return newAttrs;
}
on('change:integrity_other', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(integrityGetAttrs, function(v) {
        setAttrs(calcIntegrity(v));
    });
});

/* Resolve */
const resolveGetAttrs = ['resolve', 'resolve_other', 'resolve_max', 'int']
function calcResolve(v) {
    let newAttrs = {};
    const int = parseInt(v['int']) || 0;
    const resolveOther = parseInt(v['resolve_other']) || 0;
    const resolveMax = parseInt(v['resolve_max']) || 0;
    const resolveCurr = parseInt(v['resolve']) || 0;
    newAttrs['resolve_max'] = Math.ceil(int/3) + resolveOther;
    const diffVal = newAttrs['resolve_max'] - resolveMax;
    newAttrs['resolve'] = resolveCurr + diffVal;
    return newAttrs;
}
on('change:resolve_other', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(resolveGetAttrs, function(v) {
        setAttrs(calcResolve(v));
    });
});

/* Attribute Mode */
on('change:attribute_mode', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(actionPointGetAttrs.concat(initGetAttrs), function(v) {
        setAttrs({
            ...calcActionPoints(v),
            ...calcInitiativeBonus(v),
        });
    });
});

/* Fatigue */
const fatigueTable = {
    /* fresh */ '9': { "skills": '0', "action_points": '0', "initiative": '0', "movement": "+0", "recovery": "-"},
    /* winded */ '8': { "skills": '1', "action_points": '0', "initiative": '0', "movement": '-1', "recovery": .25},
    /* tired */ '7': { "skills": '1', "action_points": '0', "initiative": '0', "movement": '-1', "recovery": 3},
    /* wearied */ '6': { "skills": '2', "action_points": '0', "initiative": '-2', "movement": '-2', "recovery": 6},
    /* exhausted */ '5': { "skills": '2', "action_points": '-1', "initiative": '-4', "movement": '*.5', "recovery": 12},
    /* debilitated */ '4': { "skills": '3', "action_points": '-2', "initiative": '-6', "movement": '*.5', "recovery": 18},
    /* incapacitated */ '3': { "skills": '3', "action_points": '-3', "initiative": '-8', "movement": '*0', "recovery": 24},
    /* semi-conscious */ '2': { "skills": '4', "action_points": '-99', "initiative": '-99', "movement": '*0', "recovery": 36},
    /* comatose */ '1': { "skills": '5', "action_points": '-99', "initiative": '-99', "movement": '*0', "recovery": 48},
    /* dead */ '0': { "skills": '5', "action_points": '-99', "initiative": '-99', "movement": '*0', "recovery": '-'}
};
/**
 * Calculated the fatigue recovery time
 * @param v attributes needed for calc, ['fatigue', 'healing_rate']
 * @returns {} with fatigue_recovery
 */
function calcFatigueRecovery(v) {
    let recoveryString = '';
    const healing_rate = parseInt(v['healing_rate']) || 2;
    if (fatigueTable[v['fatigue']]['recovery'] !== '-') {
        let recovery = parseFloat((fatigueTable[v['fatigue']]['recovery'] / healing_rate));

        /* Get the minutes portion */
        let recoveryFraction = recovery % 1;
        let recoveryMinutes = Math.round(recoveryFraction * 60);
        /* Get the hours portion */
        let recoveryHours = Math.floor(recovery);

        if (recoveryHours !== 0) {
            let hourUnit = getTranslationByKey('hours-l');
            if (recoveryHours === 1) {
                hourUnit = getTranslationByKey('hour-l');
            }
            recoveryString = recoveryHours + ' ' + hourUnit;
        }

        if (recoveryMinutes !== 0) {
            let minUnit = getTranslationByKey('minutes-l');
            if (recoveryMinutes === 1) {
                minUnit = getTranslationByKey('minute-l');
            }

            if (recoveryString === '') {
                recoveryString = recoveryMinutes + ' ' + minUnit;
            } else {
                recoveryString = recoveryString + " " + recoveryMinutes + ' ' + minUnit;
            }
        }
        return {fatigue_recovery: recoveryString};
    } else {
        return {fatigue_recovery: fatigueTable[v['fatigue']]['recovery']};
    }
}
/**
 * Sets the fatigue modifier values and recovery rate
 * @param v character attributes needed for calculation, ['fatigue', 'healing_rate']
 * @returns {*&{initiative_bonus_fatigue: *, movement_rate_fatigue: *, fatigue_skills: *, action_points_fatigue: *}}
 */
function calcFatigue(v) {
    return {
        fatigue_skills: fatigueTable[v['fatigue']]['skills'],
        action_points_fatigue: fatigueTable[v['fatigue']]['action_points'],
        initiative_bonus_fatigue: fatigueTable[v['fatigue']]['initiative'],
        movement_rate_fatigue: fatigueTable[v['fatigue']]['movement'],
        ...calcFatigueRecovery(v)
    };
}
on('change:fatigue', function(event) {
    if (event.sourceType === "sheetworker") {return;}

    getAttrs(['fatigue', 'healing_rate'].concat(actionPointGetAttrs, initGetAttrs, moveRateGetAttrs), function(v) {
        setAttrs({
            ...calcFatigue(v),
            ...calcActionPoints(v),
            ...calcInitiativeBonus(v),
            ...calcMoveRate(v)
        });
    });
});