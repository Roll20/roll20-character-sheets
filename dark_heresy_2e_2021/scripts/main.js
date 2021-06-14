const savedRolls = {};

const Characteristics = ['weapon_skill','ballistic_skill','strength','toughness','agility','intelligence','perception','willpower','fellowship','influence'];

function sanitizeToNumber(input) {
    let num = 0;
    if (typeof input !== 'number' && typeof input !== 'string') {
        return num;
    }
    if (typeof input === 'string') {
        num = parseInt(input, 10);
    } else {
        num = input;
    }
    if (num === NaN) {
        return 0;
    }
    return num;
}

function sanitizeToFloat(input) {
    let num = 0;
    if (typeof input !== 'number' && typeof input !== 'string') {
        return num;
    }
    if (typeof input === 'string') {
        num = parseFloat(input);
    } else {
        num = input;
    }
    if (num === NaN) {
        return 0;
    }
    return num;
}

function processInlinerolls(msg) {
    let content = msg.content;
    if (msg.inlinerolls && content) {
        const regex = /(\$\[\[[0-9]+\]\])/ig;
        const groups = content.match(regex);
        for (let a = 0; a < groups.length; a++) {
            const value = msg.inlinerolls[a].results.total;
            content = content.replace(groups[a], value);
        }
        return content;
    } else {
        return content;
    }
};

function getWeaponSpecials(wData) {
    const specials = [];
    for (let a = 1; a < 4; a++) {
        specials.push({
            'val': getAttrByName(wData.charId, `${wData.prefix}_${wData.weaponId}_${wData.weaponType}_special${a}`),
            'x': sanitizeToNumber(getAttrByName(wData.charId, `${wData.prefix}_${wData.weaponId}_${wData.weaponType}_special${a}_x`))
        });
    }
    wData.specials = specials;
}

function getWeaponMods(wData) {
    const mods = [];
    for (let a = 1; a < 5; a++) {
        mods.push({
            'val': getAttrByName(wData.charId, `${wData.prefix}_${wData.weaponId}_${wData.weaponType}_mod${a}`)
        });
    }
    wData.mods = mods;
}

function addWeaponSpecialsToHitResult(wData, result) {
    for (let a = 0; a < wData.specials.length; a++) {
        switch(wData.specials[a].val) {
            case 'accurate':
                if (wData.aimMod > 0) {
                    result.push('Accurate');
                    result.push(10);
                }
            break;
            case 'defensive':
                result.push('Defensive');
                result.push(-10);
            break;
            case 'inaccurate':
                result[4] = 0;
            break;
            case 'scatter':
                if (wData.rangeMod === 30 || wData.rangeMod === 10) {
                    result.push('Scatter');
                    result.push(10);
                }
            break;
            case 'unreliable':
                wData.jam.status = 'unreliable';
                if (wData.roll >= 91) {
                    wData.jam.jammed = true;
                }
            break;
            case 'reliable':
                wData.jam.status = 'reliable';
                if (wData.roll >= 100) {
                    wData.jam.jammed = true;
                }
            break;
        }
    }
}

function addWeaponModsToHitResult(wData, result) {
    for (let a = 0; a < wData.mods.length; a++) {
        if (result.includes(wData.mods[a].val)) {
            continue;
        }
        switch(wData.mods[a].val) {
            case 'custom_grip':
                result.push('Custom grip');
                result.push(5);
            break;
            case 'fluid_action':
                if (wData.rofMod === 0) {
                    result.push('Fluid action');
                    result.push(10);
                }
            break;
            case 'modified_stock':
                if (wData.aimMod === 10) {
                    result.push('Modified stock');
                    result.push(2);
                }
                if (wData.aimMod === 20) {
                    result.push('Modified stock');
                    result.push(4);
                }
            break;
            case 'motion_predictor':
                if (wData.rofMod === 0 || wData.rofMod === -10) {
                    result.push('Motion predictor');
                    result.push(10);
                }
            break;
            case 'red_dot_laser_sight':
                if (wData.rofMod === 10) {
                    result.push('Red dot');
                    result.push(10);
                }
            break;
            case 'omni_scope':
                if (wData.rofMod === 10) {
                    result.push('Omni scope');
                    result.push(10);
                }
                if (wData.aimMod === 20) {
                    result[6] = 0;
                }
            break;
            case 'telescopic_sight':
                if (wData.aimMod === 20) {
                    result[6] = 0;
                }
            break;
        }
    }
}

function calculateAmmoUsage(wData, fate) {
    let bulletsUsed = 0;
    let ammoBefore = 0;
    if (wData.weaponType.indexOf('ranged_weapon') !== -1) {
        const semiAuto = sanitizeToNumber(getAttrByName(wData.charId, `${wData.prefix}_${wData.weaponId}_${wData.weaponType}_semi`));
        const fullAuto = sanitizeToNumber(getAttrByName(wData.charId, `${wData.prefix}_${wData.weaponId}_${wData.weaponType}_full`));
        const currentAmmo = findObjs({
            type: 'attribute',
            characterid: wData.charId,
            name: `${wData.prefix}_${wData.weaponId}_${wData.weaponType}_clip`
        }, {caseInsensitive: true})[0];
        let ammo = sanitizeToNumber(currentAmmo.get('current'));
        if (fate && savedRolls[wData.weaponId] && savedRolls[wData.weaponId].ammoBefore) {
            ammo = savedRolls[wData.weaponId].ammoBefore
        }
        ammoBefore = ammo;
        if (wData.rofMod === 10 || (wData.rofMod === -20 && wData.supressingFireMode === 'none')) {
            if (wData.jam.status === '' && wData.roll >= 96) {
                wData.jam.jammed = true;
            }
            bulletsUsed = 1 * wData.firingModeMod;
        } else if (wData.rofMod === 0) {
            if (wData.jam.status === '' && wData.roll >= 94) {
                wData.jam.jammed = true;
            }
            bulletsUsed = semiAuto * wData.firingModeMod;
        } else if (wData.rofMod === -10) {
            if (wData.jam.status === '' && wData.roll >= 94) {
                wData.jam.jammed = true;
            }
            bulletsUsed = fullAuto * wData.firingModeMod;
        } else if (wData.supressingFireMode === 'semi') {
            if (wData.jam.status === '' && wData.roll >= 94) {
                wData.jam.jammed = true;
            }
            bulletsUsed = semiAuto * wData.firingModeMod;
        } else if (wData.supressingFireMode === 'auto') {
            if (wData.jam.status === '' && wData.roll >= 94) {
                wData.jam.jammed = true;
            }
            bulletsUsed = fullAuto * wData.firingModeMod;
        } else {
            if (wData.jam.status === '' && wData.roll >= 96) {
                wData.jam.jammed = true;
            }
            bulletsUsed = 1 * wData.firingModeMod;
        }
        if (wData.jam.jammed) {
            bulletsUsed = ammo;
            ammo = 0;
        }
        ammo -= bulletsUsed;
        if (ammo < 0) {
            ammo = 0;
        }
        currentAmmo.set('current', ammo);
    }
    return {bulletsUsed, ammoBefore};
}

function getwhData(paramArray) {
    const whData = {};
    whData.npc = paramArray[10];
    whData.charId = paramArray[0];
    whData.prefix = paramArray[1];
    whData.weaponType = 'melee_weapon';
    if (whData.prefix.indexOf('rangedweapons') !== -1) {
        whData.weaponType = 'ranged_weapon';
    }
    if (whData.npc) {
        whData.prefix = `repeating_npc`;
        whData.weaponType = `npc_${whData.weaponType}`;
    }
    whData.weaponId = paramArray[2];
    whData.skill = sanitizeToNumber(paramArray[3]);
    whData.aimMod = sanitizeToNumber(paramArray[4]);
    whData.rangeMod = sanitizeToNumber(paramArray[5]);
    whData.meleeAttackType = sanitizeToNumber(paramArray[5]);
    whData.rofMod = sanitizeToNumber(paramArray[6]);
    whData.supressingFireMode = 'none';
    if (whData.rofMod === -21) {
        whData.supressingFireMode = 'semi';
        whData.rofMod = -20;
    } else if (whData.rofMod === -22) {
        whData.supressingFireMode = 'auto';
        whData.rofMod = -20;
    }
    whData.firingModeMod = sanitizeToNumber(paramArray[7]);
    whData.modifier = sanitizeToNumber(paramArray[8]);
    whData.roll = sanitizeToNumber(paramArray[9]);
    whData.jam = {
        jammed: false,
        status: ''
    };
    return whData;
}

function postHitLocationInfo(who, roll) {
    let hitLocation = 1;
    if (roll < 100) {
        const tenth = Math.floor(roll / 10);
        const single = roll - tenth * 10;
        hitLocation = single * 10 + tenth;
    }
    let hitPart = '';
    if (hitLocation <= 10) {
        hitPart = 'Head';
    } else if (hitLocation <= 20) {
        hitPart = 'Right Arm';
    } else if (hitLocation <= 30) {
        hitPart = 'Left Arm';
    } else if (hitLocation <= 70) {
        hitPart = 'Body';
    } else if (hitLocation <= 85) {
        hitPart = 'Right Arm';
    } else {
        hitPart = 'Left Arm';
    }
    sendChat(who, `Location ${hitLocation} hits ${hitPart}`);
}

function calcWeaponHit(who, playerId, paramArray, msg, fate) {
    const whData = getwhData(paramArray);
    const result = [];
    result.push(getAttrByName(whData.charId, `${whData.prefix}_${whData.weaponId}_${whData.weaponType}_name`));
    if (whData.weaponType.indexOf('ranged_weapon') !== -1) {
        result.push('Ballistic skill');
    } else {
        result.push('Weapon skill');
    }
    result.push(whData.skill);
    result.push('Aim');
    result.push(whData.aimMod);
    whData.advancments = {};
    if (!whData.npc) {
        whData.advancments = getAdvancments(whData.charId, ['Marksman', 'Precision Killer (ballistic skill)', 'Precision Killer (weapon skill)']);
    }
    if (whData.weaponType.indexOf('ranged_weapon') !== -1) {
        result.push('Range');
        result.push(whData.rangeMod);
        result.push('RoF');
        result.push(whData.rofMod);
        if (whData.rangeMod < 0 && whData.advancments['Marksman']) {
            result.push('Marksman');
            result.push(-whData.rangeMod);
        }
        if (whData.rofMod === -20 && whData.supressingFireMode === 'none' && whData.advancments['Precision Killer (ballistic skill)']) {
            result.push('Precision Killer');
            result.push(20);
        }
    }
    if (whData.weaponType.indexOf('melee_weapon') !== -1) {
        result.push('Attack type');
        result.push(whData.meleeAttackType);
        if (whData.meleeAttackType === -20 && whData.advancments['Precision Killer (weapon skill)']) {
            result.push('Precision Killer');
            result.push(20);
        }
    }
    if (whData.modifier !== 0) {
        result.push('Modifier');
        result.push(whData.modifier);
    }
    result.push('Roll');
    result.push(whData.roll);

    getWeaponSpecials(whData);
    getWeaponMods(whData);
    addWeaponSpecialsToHitResult(whData, result);
    addWeaponModsToHitResult(whData, result);
    const {bulletsUsed, ammoBefore} = calculateAmmoUsage(whData, fate);
    whData.bulletsUsed = bulletsUsed;
    whData.ammoBefore = ammoBefore;
    saveRollInfo(whData.weaponId, 'ammoBefore', whData.ammoBefore);
    saveRollInfo(whData.weaponId, 'aim', whData.aimMod);
    saveRollInfo(whData.weaponId, 'range', whData.rangeMod);
    saveRollInfo(whData.weaponId, 'rof', whData.rofMod);

    postAmmoAndJamInfo(who, playerId, whData);
    postRollTemplateResult(who, playerId, result, whData.weaponId);
    postHitLocationInfo(who, whData.roll);
}

function postAmmoAndJamInfo(who, playerId, whData) {
    const weaponName = getAttrByName(whData.charId, `${whData.prefix}_${whData.weaponId}_${whData.weaponType}_name`);
    const playerName = getAttrByName(whData.charId, `player_name`);
    if (playerIsGM(playerId) && playerName.indexOf('npc') === -1) {
        return;
    }
    if (whData.weaponType.indexOf('ranged_weapon') !== -1) {
        const remainingAmmo = whData.ammoBefore - whData.bulletsUsed;
        sendChat(who, `<br/><div style="padding:5px;font-style:italic;text-align: center;font-weight: bold;background-color:#F5E4D3;color:#653E10">${who} whispers "Emperor Guide my Bullet"<div>`);
        sendChat(who, `${weaponName} expends ${whData.bulletsUsed} ammo, ${remainingAmmo} left.`);
        if (remainingAmmo < 0) {
            sendChat(who, `<div style="color:red;">${weaponName} used more ammo then it had.</div>`);
        }
        if (whData.jam.jammed) {
            sendChat(who, `<div style="color:red;">${weaponName} has jammed.</div>`);
        }
    } else {
        sendChat(who, `<br/><div style="padding:5px;font-style:italic;text-align: center;font-weight: bold;background-color:#F5E4D3;color:#653E10">${who} exclaims "Be cut apart by the Emperors wrath"<div>`);
    }
}

function postRollTemplateResult(who, playerId, result, weaponId) {
    const paramMap = {};
    let roll = -1;
    const name = result[0];
    for (let a = 1; a < result.length; a += 2) {
        if (result[a] === 'Roll') {
            roll = sanitizeToNumber(result[a + 1]);
        } else {
            paramMap[result[a]] = sanitizeToNumber(result[a + 1]);
        }
    }
    const keys = Object.keys(paramMap);
    let target = 0;
    let output = `&{template:dh2e2021roll} {{Name=${name}}}`;
    for (let a = 0; a < keys.length; a++) {
        output += ` {{${keys[a]}=${paramMap[keys[a]]}}}`;
        target += paramMap[keys[a]];
    }
    output += ` {{Target=${target}}}`;
    output += ` {{Roll=${roll}}}`;
    let degOfSuc = 0;
    if (roll <= target) {
        degOfSuc = (Math.floor(target / 10) - Math.floor(roll / 10)) + 1;
        output += ` {{Degreesp=+${degOfSuc}}}`;
    } else {
        degOfSuc = (Math.floor(roll / 10) - Math.floor(target / 10)) + 1;
        output += ` {{Degreesm=-${degOfSuc}}}`;
        degOfSuc = -degOfSuc;
    }
    if (typeof weaponId === 'string') {
        saveRollInfo(weaponId, 'degOfSuc', degOfSuc);
    }
    sendChat(who, output);
}

function saveRollInfo(id, key, value) {
    if (id === undefined || typeof id !== 'string') {
        return
    }
    if (savedRolls[id] === undefined) {
        savedRolls[id] = {};
    }
    savedRolls[id][key] = value;
}

function useFatePoint(charId, who) {
    const fatePoints = findObjs({
        type: 'attribute',
        characterid: charId,
        name: `fate`
    }, {caseInsensitive: true})[0];
    let currentFatePoints = fatePoints.get('current');
    if (currentFatePoints <= 0) {
        return false;
    } else {
        currentFatePoints--;
        fatePoints.set('current', currentFatePoints);
        sendChat(who, `<br/><div style="padding:5px;font-style:italic;text-align: center;font-weight: bold;background-color:#F5E4D3;color:#653E10">The emperor protects<div>`);
        sendChat(who, `<div">${who} uses a fate point, he has ${currentFatePoints} fate points left.</div>`);
    }
    return true;
}

/*
type R
    roll
type M
    + or - value like "+4", "+4+22", "-2-22+22"
    will always be "+4+58-58" without space
    can also be direct number 10
type C
    can be ignored
*/
function checkMinMax(msg, tearingDmg) {
    let min = false;
    let max = false;
    for (let a = 0; a < msg.inlinerolls.length; a++) {
        const inlineroll = msg.inlinerolls[a];
        let previousRolls = 0;
        let newRolls = 0;
        for (let b = 0; b < inlineroll.results.rolls.length; b++) {
            const roll = inlineroll.results.rolls[b];
            if (roll.type === 'R') {
                for (let c = 0; c < roll.results.length; c++) {
                    if (roll.results[c].v === roll.sides) {
                        max = true;
                    }
                    if (roll.results[c].v === 1) {
                        min = true;
                    }
                }
            }
        }
    }
    if (min && tearingDmg > 1) {
        min = false;
    }
    //TODO: fix min max calc if dice is one and tearing is higher
    if (tearingDmg === 10) {
        max = true;
    }
    return {min, max};
}

function rerollMsg(msg) {
    let totalRoll = 0;
    for (let a = 0; a < msg.inlinerolls.length; a++) {
        const inlineroll = msg.inlinerolls[a];
        let previousRolls = 0;
        let newRolls = 0;
        for (let b = 0; b < inlineroll.results.rolls.length; b++) {
            const roll = inlineroll.results.rolls[b];
            if (roll.type === 'R') {
                for (let c = 0; c < roll.results.length; c++) {
                    previousRolls += roll.results[c].v;
                    roll.results[c].v = Math.floor(Math.random() * roll.sides) + 1;
                    newRolls += roll.results[c].v;
                }
            }
        }
        inlineroll.results.total = inlineroll.results.total - previousRolls + newRolls;
        totalRoll += inlineroll.results.total;
    }
    return totalRoll;
}

function getDmgTemplateString(msg, tearingDmg) {
    let dmgTemplateString = '';
    let rCounter = 1;
    let mCounter = 1;
    let rollValues = [];
    let totalRoll = 0;
    let addedDamageValues = [];
    for (let a = 0; a < msg.inlinerolls.length; a++) {
        const inlineroll = msg.inlinerolls[a];
        let previousRolls = 0;
        let newRolls = 0;
        for (let b = 0; b < inlineroll.results.rolls.length; b++) {
            const roll = inlineroll.results.rolls[b];
            if (roll.type === 'R') {
                for (let c = 0; c < roll.results.length; c++) {
                    rollValues.push({val: roll.results[c].v, sides: roll.sides});
                }
            }
            if (roll.type === 'M') {
                addedDamageValues.push(roll.expr);
            }
        }
        totalRoll += inlineroll.results.total;
    }
    rollValues.sort((a, b) => b.val - a.val);
    for (let a = 0; a < rollValues.length - 1; a++) {
        dmgTemplateString += ` {{Dice ${rCounter} 1d${rollValues[a].sides}=+${rollValues[a].val}}}`;
        rCounter++;
    }
    const lowestDice = rollValues[rollValues.length - 1];
    if (tearingDmg > 0) {
        if (lowestDice.val >= tearingDmg) {
            dmgTemplateString += ` {{Dice ${rCounter} 1d${lowestDice.sides}=+${lowestDice.val}}}`;
            dmgTemplateString += ` {{Tearing=(+${tearingDmg})}}`;
        } else {
            dmgTemplateString += ` {{Dice ${rCounter} 1d${lowestDice.sides}=(+${lowestDice.val})}}`;
            dmgTemplateString += ` {{Tearing=+${tearingDmg}}}`;
            totalRoll = totalRoll - lowestDice.val + tearingDmg;
        }
    } else {
        dmgTemplateString += ` {{Dice ${rCounter} 1d${lowestDice.sides}=+${lowestDice.val}}}`;
    }
    for (let a = 0; a < addedDamageValues.length; a++) {
        dmgTemplateString += ` {{Added Damage ${mCounter}=${addedDamageValues[a]}}}`;
        mCounter++;
    }
    return {dmgTemplateString, totalRoll};
}

function getWdData(paramArray) {
    const wdData = {};
    wdData.npc = paramArray[9];
    wdData.charId = paramArray[0];
    wdData.prefix = paramArray[1];
    wdData.weaponType = 'melee_weapon';
    if (wdData.prefix.indexOf('rangedweapons') !== -1) {
        wdData.weaponType = 'ranged_weapon';
    } else if (wdData.prefix.indexOf('repeating_psypowers') !== -1) {
        wdData.weaponType = 'psy_power';
    }
    if (wdData.npc) {
        wdData.prefix = `repeating_npc`;
        wdData.weaponType = `npc_${wdData.weaponType}`;
    }
    wdData.weaponId = paramArray[2];
    wdData.damage = 0;
    wdData.penetration = sanitizeToNumber(paramArray[4]);
    wdData.type = paramArray[5];
    wdData.name = paramArray[6];
    wdData.psyRating = sanitizeToNumber(paramArray[7]);
    wdData.strength = sanitizeToNumber(paramArray[7]);
    wdData.uStrength = sanitizeToNumber(paramArray[8]);
    wdData.tearingDmg = 0;
    wdData.specials = [];
    wdData.aimMod = 0;
    wdData.degOfSuc = 0;
    wdData.rangeMod = 0;
    wdData.rofMod = 0;
    return wdData;
}

function calcDamage(who, playerId, paramArray, msg) {
    const wdData = getWdData(paramArray)
    let damageRolls = '';
    if (wdData.weaponId && savedRolls[wdData.weaponId]) {
        wdData.aimMod = savedRolls[wdData.weaponId].aim;
        wdData.degOfSuc = savedRolls[wdData.weaponId].degOfSuc;
        wdData.rangeMod = savedRolls[wdData.weaponId].range;
        wdData.rofMod = savedRolls[wdData.weaponId].rof;
    }
    if (wdData.weaponType.indexOf('melee_weapon') !== -1 || wdData.weaponType.indexOf('ranged_weapon') !== -1  ) {
        getWeaponSpecials(wdData);
        wdData.tearing = false;
        wdData.accurate = false;
        wdData.scatter = false;
        for (let a = 0; a < wdData.specials.length; a++) {
            if (wdData.specials[a].val === 'tearing') {
                wdData.tearing = true;
            }
            if (wdData.specials[a].val === 'accurate') {
                wdData.accurate = true;
            }
            if (wdData.specials[a].val === 'scatter') {
                wdData.scatter = true;
            }
        }
        if (wdData.tearing) {
            wdData.tearingDmg = Math.floor(Math.random() * 10) + 1;
        }
        if (wdData.accurate && wdData.aimMod > 0 && wdData.rofMod === 10) {
            let num = Math.floor((wdData.degOfSuc - 1) / 2);
            if (num > 2) {
                num = 2;
            }
            if (num === 1) {
                const accRoll1 = Math.floor(Math.random() * 10) + 1;
                damageRolls += ` {{Accurate 1=+${accRoll1}}}`;
                wdData.damage += accRoll1;
            } else if (num === 2) {
                const accRoll1 = Math.floor(Math.random() * 10) + 1;
                const accRoll2 = Math.floor(Math.random() * 10) + 1;
                damageRolls += ` {{Accurate 1=+${accRoll1}}}`;
                damageRolls += ` {{Accurate 2=+${accRoll2}}}`;
                wdData.damage += accRoll1;
                wdData.damage += accRoll2;
            }
        }
        if (wdData.scatter && wdData.rangeMod < 10) {
            damageRolls += ` {{Scatter=-3}}`;
            wdData.damage += -3;
        }
        if (wdData.scatter && wdData.rangeMod === 30) {
            damageRolls += ` {{Scatter=+3}}`;
            wdData.damage += 3;
        }
    }
    if (wdData.weaponType.indexOf('ranged_weapon') !== -1 && !wdData.npc) {
        const advancments = getAdvancments(wdData.charId, ['Mighty Shot']);
        if (advancments['Mighty Shot']) {
            let mightyShot = sanitizeToNumber(getAttrByName(wdData.charId, `ballistic_skill`));
            mightyShot = (Math.floor(mightyShot / 10)) / 2;
            mightyShot = Math.ceil(mightyShot);
            wdData.damage += mightyShot;
            damageRolls += `{{Mighty Shot=+${mightyShot}}}`;
        }
    }
    if (wdData.weaponType.indexOf('melee_weapon') !== -1 && !wdData.npc) {
        const advancments = getAdvancments(wdData.charId, ['Crushing Blow']);
        if (advancments['Crushing Blow']) {
            let crushingBlow = sanitizeToNumber(getAttrByName(wdData.charId, `weapon_skill`));
            crushingBlow = (Math.floor(crushingBlow / 10)) / 2;
            crushingBlow = Math.ceil(crushingBlow);
            wdData.damage += crushingBlow;
            damageRolls += `{{Crushing Blow=+${crushingBlow}}}`;
        }
    }
    if (wdData.weaponType.indexOf('melee_weapon') !== -1) {
        damageRolls += `{{Strength=+${Math.floor(wdData.strength / 10)}}}`;
        wdData.damage += Math.floor(wdData.strength / 10);
        if (wdData.uStrength > 0) {
            damageRolls += `{{U. Strength=+${wdData.uStrength}}}`;
            wdData.damage += wdData.uStrength;
        }
    }
    if (wdData.weaponType.indexOf('psy_power') !== -1) {
        damageRolls += `{{Psy rating=+${wdData.psyRating}}}`;
        wdData.damage += wdData.psyRating;
    }
    let border = '';
    const {min, max} = checkMinMax(msg, wdData.tearingDmg);
    if (min) {
        border = 'rolltemplate-container-damage-value-min';
    }
    if (max) {
        border = 'rolltemplate-container-damage-value-max';
    }
    const {dmgTemplateString, totalRoll} = getDmgTemplateString(msg, wdData.tearingDmg);
    wdData.damage += totalRoll;
    damageRolls = dmgTemplateString + ' ' + damageRolls;
    let output = `&{template:dh2e2021damage} {{Name=${wdData.name}}}`;
    output += ` {{Who=${who}}}`;
    output += ` {{Damage=${wdData.damage}}}`;
    output += ` {{Penetration=${wdData.penetration}}}`;
    output += ` {{Type=${(wdData.type[0].toUpperCase() + wdData.type.substr(1))}}}`;
    output += ` {{Border=${border}}}`;
    output += damageRolls;
    sendChat(who, output);
}

function calcFocusPower(who, playerId, paramArray) {
    const charId = paramArray[0];
    const focusName = paramArray[1];
    const characteristic = sanitizeToNumber(paramArray[2]);
    const psyRating = sanitizeToNumber(paramArray[3]);
    const psyUse = sanitizeToNumber(paramArray[4]);
    const psyniscienceSkill = sanitizeToNumber(paramArray[5]) - 20;
    const modifier = sanitizeToNumber(paramArray[6]);
    const roll = sanitizeToNumber(paramArray[7]);
    const result = [];
    result.push('F.P. ' + focusName);
    result.push(focusName);
    result.push(characteristic);
    result.push('Psy rating');
    result.push(psyRating * 10);
    result.push('Psy use');
    result.push(-psyUse * 10);
    if (focusName === 'Psyniscience') {
        result.push('psynicience Skill');
        result.push(psyniscienceSkill);
    }
    if (modifier !== 0) {
        result.push('Modifier');
        result.push(modifier);
    }
    result.push('Roll');
    result.push(roll);
    postRollTemplateResult(who, playerId, result);
}

function calcPsyHit(who, playerId, paramArray) {
    const charId = paramArray[0];
    const prefix = paramArray[1];
    const psyPowerId = paramArray[2];
    const psyName = paramArray[3];
    const psyPowerFocus = paramArray[4];
    const willpower = sanitizeToNumber(paramArray[5]);
    const perception = sanitizeToNumber(paramArray[6]);
    const psyniscience = sanitizeToNumber(paramArray[7]);
    const psyRating = sanitizeToNumber(paramArray[8]);
    const psyUse = sanitizeToNumber(paramArray[9]);
    const modifier = sanitizeToNumber(paramArray[10]);
    const psynicienceSkill = sanitizeToNumber(paramArray[11]) - 20;
    const powerModifier = sanitizeToNumber(paramArray[12]);
    const roll = sanitizeToNumber(paramArray[13]);

    const result = [];
    result.push(psyName);
    if (psyPowerFocus === 'willpower') {
        result.push('Willpower');
        result.push(willpower);
    } else if (psyPowerFocus === 'perception') {
        result.push('Perception');
        result.push(perception);
    } else if (psyPowerFocus === 'psyniscience') {
        result.push('Psyniscience');
        result.push(psyniscience);
        result.push('Psynicience Skill');
        result.push(psynicienceSkill);
    }
    result.push('Psy rating');
    result.push(psyRating * 10);
    result.push('Psy use');
    result.push(-psyUse * 10);
    result.push('Power modifier');
    result.push(powerModifier);
    if (modifier !== 0) {
        result.push('Modifier');
        result.push(modifier);
    }
    result.push('Roll');
    result.push(roll);
    postRollTemplateResult(who, playerId, result);
    postHitLocationInfo(who, roll);
    if (roll % 11 === 0 || roll === 100) {
        sendChat(who, `Something stirs in the warp... <br/>Roll for Psychic Phenomena`);
    }
}

let getAdvancmentsEnabled = true;
function getAdvancments(charId, advNames) {
    const values = {};
    if (!getAdvancmentsEnabled) {
        return values;
    }
    const advNamesMap = {};
    for (let a = 0; a < advNames.length; a++) {
        advNamesMap[advNames[a]] = true;
    }
    let allAttributes = findObjs({
        type: 'attribute',
        characterid: charId,
    });
    for (let a = 0; a < allAttributes.length; a++) {
        const name = allAttributes[a].get('name');
        const current = allAttributes[a].get('current');
        if (name && name.indexOf(`_auto_advancement`) > -1 && advNamesMap[current]) {
            values[current] = true;
        }
    }
    return values;
}

function toggleGetAdvancments(who, playerId, paramArray) {
    const toggle = paramArray[0];
    if (toggle == 'on' || toggle == '1') {
        getAdvancmentsEnabled = true;
    } else {
        getAdvancmentsEnabled = false;
    }
}

function disableGetAdvancments() {
    getAdvancmentsEnabled = false;
}

on('chat:message', function (msg) {
    if (msg.type !== 'api') {
        return;
    }
    const playerId = msg.playerid;
    const rollCmd = '!dh2e2021roll ';
    const weaponHitCmd = '!dh2e2021weaponhit ';
    const weaponDamageCmd = '!dh2e2021damage ';
    const fateCmd = '!dh2e2021fate ';
    const focusPowerCmd = '!dh2e2021focuspower ';
    const psyHitCmd = '!dh2e2021psyhit ';
    const toggleCmd = '!dh2e2021toggle ';
    const disableToggleCmd = '!dh2e2021toggle';
    const notSavedRolls = [toggleCmd, disableToggleCmd];
    let fate = false;
    //log(JSON.stringify(msg, undefined, 2));
    const commands = [
        {cmd: rollCmd, fn: postRollTemplateResult},
        {cmd: weaponHitCmd, fn: calcWeaponHit},
        {cmd: weaponDamageCmd, fn: calcDamage},
        {cmd: focusPowerCmd, fn: calcFocusPower},
        {cmd: psyHitCmd, fn: calcPsyHit},
        {cmd: toggleCmd, fn: toggleGetAdvancments},
        {cmd: disableToggleCmd, fn: disableGetAdvancments}
    ];
    if (msg.content.indexOf(fateCmd) !== -1 && savedRolls[playerId] && savedRolls[playerId].msg) {
        const content = processInlinerolls(msg);
        const paramArray = content.slice(fateCmd.length).split(',');
        if (!useFatePoint(paramArray[0], msg.who)) {
            return;
        }
        msg = savedRolls[playerId].msg
        rerollMsg(msg);
        fate = true;
    }
    for (let a = 0; a < commands.length; a++) {
        if (msg.content.indexOf(commands[a].cmd) !== -1) {
            if (!notSavedRolls.includes(commands[a].cmd)) {
                saveRollInfo(playerId, 'msg', msg);
            }
            const content = processInlinerolls(msg);
            const paramArray = content.slice(commands[a].cmd.length).split(',');
            commands[a].fn(msg.who, playerId, paramArray, msg, fate);
            break;
        }
    }
});