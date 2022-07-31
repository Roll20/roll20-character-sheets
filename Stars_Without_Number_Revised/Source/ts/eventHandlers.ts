///<reference path="migrations.ts"/>
///<reference path="validations.ts"/>
///<reference path="translations.ts"/>
///<reference path="menuBuilders.ts"/>
///<reference path="ship.ts"/>
///<reference path="npc.ts"/>
/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/**
 * Register Event handlers
 */

on("sheet:opened", handleUpgrade);

on("sheet:opened change:npc", validateTab);
on("sheet:opened", setTranslatedQueries);
on("sheet:opened change:setting_skill_query", handleAttributeQueries);
on("sheet:opened change:setting_modifier_query", handleModifierQuery);
on("change:homebrew_skill_list", setTranslatedDefaults);

/* API use ammo boilerplate */
["weapons", "ship-weapons"].forEach(sName => {
    on(`change:repeating_${sName}:weapon_use_ammo`, () => handleAmmoAPI(sName));
});
on("change:setting_use_ammo", () => {
    handleAmmoAPI("weapons");
    handleAmmoAPI("ship-weapons");
});

/* Character sheet */
on("change:class", fillClassStats);
attributes.forEach(attr => on(`change:${attr}_base change:${attr}_boosts`, () => calculateAttr(attr)));
attributes.forEach(attr => on(`change:${attr} change:${attr}_bonus`, () => calculateMod(attr)));

on("change:repeating_shells remove:repeating_shells", function(eventInfo) {
    if (eventInfo.sourceType === "player") {
        validateShells(eventInfo);
    }
});

on("change:setting_transhuman_enable change:setting_ai_enable", calculateShellAttrs)

on(weaponDisplayEvent, generateWeaponDisplay);

on("change:repeating_weapons:weapon_name", () => validateWeaponSkills());
on("change:homebrew_skill_list", () => getSectionIDs("repeating_weapons", validateWeaponSkills));

on("change:strain_extra change:strain_permanent", calculateStrain);
on("change:constitution", calculateMaxStrain);
on("change:repeating_cyberware remove:repeating_cyberware", calculateCyberwareStrain);
on("change:strain_permanent_extra change:cyberware_strain_total", calculatePermanentStrain);

on("change:level", calculateSaves);

on([...effortAttributes, "repeating_psychic-skills:skill"].map(x => `change:${x}`).join(" "), calculateEffort);

on("change:magic_committed_effort_current change:magic_committed_effort_scene change:magic_committed_effort_day change:magic_total_effort", calculateMagicEffort);

on("change:ai_committed_processing_current change:ai_committed_processing_scene change:ai_committed_processing_day change:ai_extra_processing change:repeating_processing-nodes remove:repeating:processing_nodes", calculateProcessing);

on("change:repeating_armor change:innate_ac remove:repeating_armor", calculateAC);

on("change:strength change:repeating_gear remove:repeating_gear change:repeating_weapons " +
    "remove:repeating_weapons change:repeating_armor remove:repeating_armor", calculateGearReadiedStowed);

on("change:level change:setting_xp_scheme", calculateNextLevelXP);

on("change:setting_super_type", validateSuperTab);

/* Character chat macros */
on("change:homebrew_luck_save", buildSaveMenu);

on([
    ...skills.revised.map(x => `change:skill_${x}`),
    ...skills.first.map(x => `change:skill_${x}`),
    "change:homebrew_skill_list",
    "change:repeating_skills",
    "change:setting_show_untrained_skills",
    "remove:repeating_skills",
].join(" "), buildSkillMenu);

on([
    ...skills.psionic.map(x => `change:skill_${x}`),
    "change:setting_super_type change:repeating_techniques remove:repeating_techniques",
    "change:repeating_psychic-skills remove:repeating_psychic-skills"
].join(" "), buildPsionicsMenu);

on("change:setting_super_type change:repeating_spells remove:repeating_spells " +
    "change:repeating_magic-skills remove:repeating_magic-skills " +
    "change:skill_know_magic change:skill_use_magic change:skill_fight change:skill_sunblade change:skill_magic2_name change:skill_magic2", buildMagicMenu);

/* Repeating autofill */
autofillSections.forEach((sName: AutofillSectionsKey) => {
    on(`change:generate_${sName}_source`, () => generateAutofillInfo(sName));
    on(`change:generate_${sName}_button`, () => generateAutofillRow(sName));
});


/* Ship sheet */
on("change:ship_hulltype", fillShipStats);
on("change:ship_calculate_price", calculateShipStats)
on("change:ship_class", () => {
    setShipClass();
    ["ship-fittings", "ship-defenses"].forEach((sName: 'ship-fittings' | 'ship-defenses') => generateAutofillInfo(sName));
});
on(shipStatEvent, calculateShipStats);
on("change:repeating_ship-weapons:weapon_name change:repeating_ship-weapons:weapon_attack_bonus " +
    "remove:repeating_ship-weapons", buildShipWeaponsMenu);

/* Drones */
[1,2,3,4,5].forEach(num => {
    on(`change:repeating_drones:drone_fitting_${num}_name`, () => fillDroneFitting(num));
});
on("change:repeating_drones:drone_model", fillDroneStats);
on("change:attack_bonus change:intelligence_mod change:skill_pilot change:skill_program change:npc",
    () => getSectionIDs("repeating_drones", idArray => {
        calculateDroneAttack(idArray.map(id => `repeating_drones_${id}`));
    }));
on([
    ...[1, 2, 3].map(n => `change:repeating_drones:drone_weapon${n}_ab`),
    ...[1, 2, 3].map(n => `change:repeating_drones:drone_weapon${n}_active`)
].join(" "), () => calculateDroneAttack(["repeating_drones"]));

/* NPC sheet */
on("change:npc_stat_block", fillNPC);
on("change:npc_rolls_hidden", handleNPCRollHide);
on("change:repeating_npc-attacks:attack_name", addNPCAttackBonus);
on("change:npc_roll_full_attack change:repeating_npc-attacks:attack_number", setNPCMultiAttacks);

on("change:repeating_npc-abilities:ability_name remove:repeating_npc-abilities", buildAbilitiesMenu);
on("change:repeating_npc-attacks:attack_name change:repeating_npc-attacks:attack_ab " +
    "change:repeating_npc-attacks:attack_number remove:repeating_npc-attacks", buildAttacksMenu);
on("change:npc change:npc_armor_type change:macro_npc_attacks change:macro_npc_abilities", buildStatblock);