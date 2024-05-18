/* Characteristics */
const characteristicAttrs = ['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'];
characteristicAttrs.forEach(char => {
    on(`change:${char}_base change:${char}`, function(event) {
        if (event.sourceType === "sheetworker") {return;}

        let repeatingIds = {}
        getSectionIDs("repeating_meleeweapon", function(meleeWeaponIds) {
            repeatingIds['meleeWeaponIds'] = meleeWeaponIds;
            getSectionIDs("repeating_rangedweapon", function(rangedWeaponIds) {
                repeatingIds['rangedWeaponIds'] = rangedWeaponIds;
                getSectionIDs("repeating_equipment", function(gearIds) {
                    repeatingIds['gearIds'] = gearIds;
                    getSectionIDs("repeating_currency", function(currencyIds) {
                        repeatingIds['currencyIds'] = currencyIds;
                        getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
                            getSectionIDs("repeating_professionalskill", function(proSkillIds) {
                                getSectionIDs("repeating_foobar", function(skilledAbilityIds) {
                                    let combatStyleGetAttrs = [];
                                    combatStyleIds.forEach(id => {
                                        combatStyleGetAttrs.push(`repeating_combatstyle_${id}_total`,
                                            `repeating_combatstyle_${id}_other`, `repeating_combatstyle_${id}_notes`,
                                            `repeating_combatstyle_${id}_name`, `repeating_combatstyle_${id}_char1`,
                                            `repeating_combatstyle_${id}_char2`);
                                    });

                                    let proSkillGetAttrs = [];
                                    proSkillIds.forEach(id => {
                                        proSkillGetAttrs.push(`repeating_professionalskill_${id}_total`,
                                            `repeating_professionalskill_${id}_other`, `repeating_professionalskill_${id}_notes`,
                                            `repeating_professionalskill_${id}_name`, `repeating_professionalskill_${id}_char1`,
                                            `repeating_professionalskill_${id}_char2`);
                                    });

                                    let skilledAbilityGetAttrs = [];
                                    skilledAbilityIds.forEach(id => {
                                        skilledAbilityGetAttrs.push(`repeating_skilledability_${id}_total`,
                                            `repeating_skilledability_${id}_other`, `repeating_skilledability_${id}_name`,
                                            `repeating_skilledability_${id}_char1`, `repeating_skilledability_${id}_char2`);
                                    });

                                    let stdSkillGetAttrs = [];
                                    stdSkillIds.forEach(id => {
                                        stdSkillGetAttrs.push(`${id}`, `${id}_other`, `${id}_notes`);
                                    });

                                    getAttrs([`${char}_base`, `${char}_temp`, `${char}_pool`, 'social_defense_id'].concat(characteristicAttrs,
                                        encGetAttrs(repeatingIds), actionPointGetAttrs, confidenceGetAttrs, damageModGetAttrs, expModGetAttrs,
                                        healingRateGetAttrs, initGetAttrs, luckPointsGetAttrs, magicPointsGetAttrs, tenacityGetAttrs, hpGetAttrs,
                                        moveRateGetAttrs, spiritIntensityGetAttrs, composureGetAttrs, integrityGetAttrs, resolveGetAttrs,
                                        spiritDamageGetAttrs, socialDamageGetAttrs, stdSkillGetAttrs, combatStyleGetAttrs, proSkillGetAttrs,
                                        skilledAbilityGetAttrs
                                    ), function(v) {
                                        let newAttrs = {};
                                        const baseCharVal = parseInt(v[`${char}_base`]) || 0;
                                        const tempCharVal = parseInt(v[`${char}_temp`]) || 0;
                                        const currCharVal = parseInt(v[`${char}`]) || 0;
                                        const currPoolVal = parseInt(v[`${char}_pool`]) || 0;

                                        if (event.sourceAttribute === `${char}`) {
                                            newAttrs[`${char}_temp`] = currCharVal - baseCharVal;
                                            const diffVal = newAttrs[`${char}_temp`] - tempCharVal;
                                            newAttrs[`${char}_pool`] = currPoolVal + diffVal;
                                        } else if (event.sourceAttribute === `${char}_base`) {
                                            newAttrs[`${char}`] = baseCharVal + tempCharVal;
                                            const diffVal = newAttrs[`${char}`] - currCharVal;
                                            newAttrs[`${char}_pool`] = currPoolVal + diffVal;
                                            v[`${char}`] = baseCharVal + tempCharVal; /* override the old value from getAttr, so we can base other calculations on the new value */
                                        }

                                        stdSkillIds.forEach(skillId => {
                                            newAttrs = {...newAttrs, ...calcStdSkill(skillId, v, event.sourceAttribute)};
                                        });
                                        combatStyleIds.forEach(id => {
                                            newAttrs = {...newAttrs, ...calcProSkill(`repeating_combatstyle_${id}`, v, event.sourceAttribute)};
                                        });
                                        proSkillIds.forEach(id => {
                                            newAttrs = {...newAttrs, ...calcProSkill(`repeating_professionalskill_${id}`, v, event.sourceAttribute)};
                                        });
                                        skilledAbilityIds.forEach(id => {
                                            newAttrs = {...newAttrs, ...calcSkilledAbility(`repeating_skilledability_${id}`, v, event.sourceAttribute)};
                                        });

                                        newAttrs = {...newAttrs, ...calcEncAndArmorPenalty(repeatingIds, v)};
                                        /* Update v with new values need for attribute calculations */
                                        v = {...v, ...newAttrs};
                                        setAttrs({
                                            ...newAttrs,
                                            ...calcActionPoints(v),
                                            ...calcConfidence(v),
                                            ...calcDamageMod(v),
                                            ...calcExpMod(v),
                                            ...calcHealingRate(v),
                                            ...calcInitiativeBonus(v),
                                            ...calcLuckPoints(v),
                                            ...calcMagicPoints(v),
                                            ...calcMoveRate(v),
                                            ...calcSpiritIntensity(v),
                                            ...calcTenacity(v),
                                            ...calcAllHP(v),
                                            ...calcComposure(v),
                                            ...calcIntegrity(v),
                                            ...calcResolve(v)
                                            /* No need for the social and spirit damage here since it would have been done via skills */
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});