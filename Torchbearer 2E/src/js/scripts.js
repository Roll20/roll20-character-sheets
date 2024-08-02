const tablist = ["anatomy", "kit", "magic", "relationships", "levels", "options"];
tablist.forEach(button => {
  on(`clicked:${button}`, function () {
    setAttrs({
      tab: button
    });
  });
});

const modeList = ["editing", "playing"];
modeList.forEach(button => {
  on(`clicked:${button}`, function () {
    setAttrs({
      edit: button
    });
  });
});

// Old code
// --------

on("sheet:opened", function (eventinfo) {
  initialize();
});

const scrubAdvancement = attribute_base => {
  const update = {};
  update[attribute_base + "_pass"] = 0;
  update[attribute_base + "_fail"] = 0;
  update[attribute_base + "_bl"] = 0;
  update[attribute_base + "_show_advancement"] = 0;
  setAttrs(update, { silent: true });
};

const checkAdvancement = attribute_base => {
  const attributes_to_fetch = [attribute_base, attribute_base + "_pass", attribute_base + "_fail", attribute_base + "_show_advancement"];
  getAttrs(attributes_to_fetch, attributes => {
    const update = {};
    const base = parseInt(attributes[attribute_base], 10);
    const pass = parseInt(attributes[attribute_base + "_pass"], 10);
    const fail = parseInt(attributes[attribute_base + "_fail"], 10);
    const show = parseInt(attributes[attribute_base + "_show_advancement"], 10);
    if (pass === base && fail === base - 1) {
      update[attribute_base + "_show_advancement"] = 1;
    } else if (["resources", "circles"].includes(attribute_base) && base === 0 && pass === 1) {
      update[attribute_base + "_show_advancement"] = 1;
    } else if (show === 1) {
      update[attribute_base + "_show_advancement"] = 0;
    };
    setAttrs(update, { silent: true });
  });
};

const doAdvancement = attribute_base => {
  const attributes_to_fetch = [attribute_base];
  getAttrs(attributes_to_fetch, attributes => {
    const update = {};
    const base = parseInt(attributes[attribute_base], 10);
    update[attribute_base] = base === 0 && !["resources", "circles"].includes(attribute_base) ? 2 : base + 1;
    update[attribute_base + "_advancement"] = 0;
    setAttrs(update, { silent: true });
    scrubAdvancement(attribute_base);
  });
};

const checkBeginnersLuck = attribute_base => {
  const attributes_to_fetch = [attribute_base + "_bl", attribute_base + "_show_advancement", "nature"];
  getAttrs(attributes_to_fetch, attributes => {
    const update = {};
    const nature = attributes["nature"];
    const bl = attributes[attribute_base + "_bl"];
    const show = parseInt(attributes[attribute_base + "_show_advancement"], 10);
    if (nature === bl) {
      update[attribute_base + "_show_advancement"] = 1;
    } else if (show === 1) {
      update[attribute_base + "_show_advancement"] = 0;
    };
    setAttrs(update, { silent: true });
  });
};

const updateConditions = trigger_attribute => {
  const attributes_to_fetch = ["fresh", "hungry_and_thirsty", "angry", "afraid", "exhausted", "injured", "sick", "dead", "bl_suffix"];
  getAttrs(attributes_to_fetch, attributes => {
    const update = {};
    const conditions = [];
    const { fresh, hungry_and_thirsty, angry, afraid, exhausted, injured, sick, dead, bl_suffix } = attributes;
    const bl = bl_suffix && bl_suffix !== "" ? true : false;
    let town_conditions_modifier = ""; let conditions_modifier = ""; let conflict_conditions_modifier = "";

    if (trigger_attribute === "fresh" && fresh && fresh !== "0") {
      update["hungry_and_thirsty"] = 0; update["angry"] = 0; update["afraid"] = 0; update["exhausted"] = 0; update["injured"] = 0; update["sick"] = 0; update["dead"] = 0;
      conditions_modifier = bl ? "+2[Fresh]" : "+1[Fresh]";
      town_conditions_modifier = bl ? "+2[Fresh]" : "+1[Fresh]";
      conflict_conditions_modifier = bl ? "+2[Fresh]" : "+1[Fresh]";
      conditions.push("Fresh");
    } else {
      update["fresh"] = 0;
      if (hungry_and_thirsty && hungry_and_thirsty !== "0") {
        // conflict_conditions_modifier = conflict_conditions_modifier + "-1[Hungry and Thirsty]";
        conditions.push("Hungry and Thirsty");
      };
      if (angry && angry !== "0") {
        conditions.push("Angry");
      };
      if (afraid && afraid !== "0") {
        conditions.push("Afraid");
      };
      if (exhausted && exhausted !== "0") {
        // conflict_conditions_modifier = conflict_conditions_modifier + "-1[Exhausted]";
        conditions.push("Exhausted");
      };
      if (injured && injured !== "0") {
        conditions_modifier = conditions_modifier + "-1[Injured]";
        conflict_conditions_modifier = conflict_conditions_modifier + "-1[Injured]";
        conditions.push("Injured");
      };
      if (sick && sick !== "0") {
        conditions_modifier = conditions_modifier + "-1[Sick]";
        conflict_conditions_modifier = conflict_conditions_modifier + "-1[Sick]";
        conditions.push("Sick");
      };
      if (dead && dead !== "0") {
        conditions.push("Dead");
      };
    };
    let display_conditions = ""
    if (conditions.length) {
      display_conditions = "{{conditions=" + conditions.join(", ") + "}}";
      if (dead && dead !== "0") {
        display_conditions = display_conditions + " {{dead=true}}";
      }
    }

    update["roll_template_conditions"] = display_conditions;
    update["town_conditions_modifier"] = town_conditions_modifier;
    update["conflict_conditions_modifier"] = conflict_conditions_modifier;
    update["conditions_modifier"] = conditions_modifier;
    setAttrs(update, { silent: true });
  });
};

const updateModifiers = trigger_attribute => {
  const attributes_to_fetch = ["trait_mod", "trait_mod_type", "complex_trigger", "persona_mod", "persona_mod_number", "nature_mod", "taxed_nature", "help_mod", "help_mod_number", "gear_mod", "gear_mod_number", "party_hungry_and_thirsty_mod", "home_town_mod", "enchanted_item_mod", "invocation_mod", "spell_mod", "level_benefit_mod", "dim_light_mod", "evil_gm_factor_mod", "other_mod", "other_mod_number", "other_successes", "backpack_mod", "bl_suffix", "fresh"];
  getAttrs(attributes_to_fetch, attributes => {
    const update = {};
    const modifiers = [];
    let complex_mods = ""; let roll_template_complex_mods = "";
    const { trait_mod, trait_mod_type, complex_trigger, persona_mod, persona_mod_number, nature_mod, taxed_nature, help_mod, help_mod_number, gear_mod, gear_mod_number, party_hungry_and_thirsty_mod, home_town_mod, enchanted_item_mod, invocation_mod, spell_mod, level_benefit_mod, dim_light_mod, evil_gm_factor_mod, other_mod, other_mod_number, other_successes, backpack_mod, bl_suffix, fresh } = attributes;
    const bl = bl_suffix && bl_suffix !== "" ? true : false;
    if (trait_mod && trait_mod !== "0") {
      complex_mods = complex_mods + "+" + trait_mod_type + "[Trait]";
      modifiers.push("Trait " + trait_mod_type);
    };
    if (persona_mod && persona_mod !== "0") {
      complex_mods = complex_mods + "+" + (bl ? persona_mod_number * 2 : persona_mod_number) + "[Persona]";
      modifiers.push("Persona +" + persona_mod_number);
    };
    if (nature_mod && nature_mod !== "0") {
      complex_mods = complex_mods + "+" + (bl ? taxed_nature * 2 : taxed_nature) + "[Nature]";
      modifiers.push("Nature +" + taxed_nature);
    };
    if (help_mod && help_mod !== "0") {
      complex_mods = complex_mods + "+" + help_mod_number + "[Help]";
      modifiers.push("Help +" + help_mod_number);
    };
    if (gear_mod && gear_mod !== "0") {
      complex_mods = complex_mods + "+" + gear_mod_number + "[Gear]";
      modifiers.push("Gear +" + gear_mod_number);
    };
    if (party_hungry_and_thirsty_mod && party_hungry_and_thirsty_mod !== "0") {
      // complex_mods = complex_mods + "-1[Party Hungry and Thirsty]";
      modifiers.push("Party Hungry or Thirsty");
    };
    if (home_town_mod && home_town_mod !== "0") {
      complex_mods = complex_mods + "+1[Home Town Advantage]";
      modifiers.push("Home Town Advantage");
    };
    if (enchanted_item_mod && enchanted_item_mod !== "0") {
      complex_mods = complex_mods + "+" + (bl ? 2 : 1) + "[Enchanted Item]";
      modifiers.push("Enchanted Item");
    };
    if (invocation_mod && invocation_mod !== "0") {
      complex_mods = complex_mods + "+" + (bl ? 2 : 1) + "[Invocation]";
      modifiers.push("Invocation Effect");
    };
    if (spell_mod && spell_mod !== "0") {
      complex_mods = complex_mods + "+" + (bl ? 2 : 1) + "[Spell Effect]";
      modifiers.push("Spell Effect");
    };
    if (level_benefit_mod && level_benefit_mod !== "0") {
      complex_mods = complex_mods + "+1[Level Benefit]";
      modifiers.push("Level Benefit");
    };
    if (dim_light_mod && dim_light_mod !== "0") {
      // complex_mods = complex_mods + "-1[Dim Light]";
      modifiers.push("Dim Light");
    };
    if (evil_gm_factor_mod && evil_gm_factor_mod !== "0") {
      // complex_mods = complex_mods + "-1[Evil GM Factor]";
      modifiers.push("Evil GM Factor");
    };
    if (backpack_mod && backpack_mod !== "0") {
      // complex_mods = complex_mods + "-1[Wearing Backpack]";
      modifiers.push("Wearing a Backpack -1S");
    };
    if (other_mod && other_mod !== "0" && ((other_mod_number && other_mod_number !== "0") || (other_successes && other_successes !== "0"))) {
      complex_mods = complex_mods + "+" + other_mod_number + "[Other]";
      const dice_mod_operator = other_mod_number < 0 ? "" : "+";
      update["other_mod_operator"] = dice_mod_operator;
      const success_mod_operator = other_successes < 0 ? "" : "+";
      update["other_successes_operator"] = success_mod_operator;
      modifiers.push("Other Modifiers " + dice_mod_operator + other_mod_number + "D/" + success_mod_operator + other_successes + "S");
    };

    update["complex_mods"] = complex_mods;
    update["roll_template_complex_mods"] = modifiers.length ? "{{modifiers=" + modifiers.join(", ") + "}}" : "";
    setAttrs(update, { silent: true });
  });
};

const activateComplexRollModal = (roll_trigger, initialize_request) => {
  const update = { show_roll_modal: 1 };
  update[roll_trigger] = 0;
  const trigger = roll_trigger.replace(/_trigger/g, '');
  update["complex_trigger"] = trigger;
  update["complex_trigger_display"] = trigger.charAt(0).toUpperCase() + trigger.slice(1);
  update["trigger_is_not_town"] = ["circles", "resources", "recovery_angry", "recovery_afraid", "recovery_exhausted", "recovery_injured", "recovery_sick"].includes(trigger) ? "0" : "1";
  update["bl_prefix"] = "";
  update["bl_suffix"] = "";
  const attributes_to_fetch = [trigger, "health", "will", "skill1_bl_d", "skill2_bl_d", "skill3_bl_d", "skill4_bl_d", "skill5_bl_d", "fresh", "persona_mod", "nature_mod", "spell_effect_mod", "invocation_effect_mod", "enchanted_item_mod"];
  if (trigger.includes("skill")) {
    attributes_to_fetch.push(trigger + "_name");
  }
  getAttrs(attributes_to_fetch, attributes => {
    const { health, will, fresh, persona_mod, nature_mod, spell_effect_mod, invocation_effect_mod, enchanted_item_mod } = attributes;
    if (trigger.includes("skill")) {
      update["complex_trigger_display"] = attributes[trigger + "_name"];
    }
    if (trigger === "loremaster") {
      update["complex_trigger_display"] = "Lore Master";
    }
    if (trigger.substr(0, 9) === "recovery_") {
      const recovery_name_array = trigger.split("_");
      recovery_name_array[0] = recovery_name_array[0].charAt(0).toUpperCase() + recovery_name_array[0].slice(1);
      recovery_name_array[1] = recovery_name_array[1].charAt(0).toUpperCase() + recovery_name_array[1].slice(1);
      update["complex_trigger_display"] = recovery_name_array.join(" from ");
      update["ob_type"] = "independent";
      if (trigger === "recovery_angry") {
        update["ob"] = 2;
      } else if (trigger === "recovery_injured") {
        update["ob"] = 4;
      } else {
        update["ob"] = 3;
      }
    }
    let base_mod = parseInt(attributes[trigger], 10);
    if (["recovery_exhausted", "recovery_injured"].includes(trigger)) {
      base_mod = parseInt(health, 10);
    }
    if (["recovery_angry", "recovery_afraid", "recovery_sick"].includes(trigger)) {
      base_mod = parseInt(will, 10);
    }
    if (base_mod === 0 && trigger != "resources") {
      let bl_type = "will";
      if (trigger.includes("skill")) {
        bl_type = attributes[trigger + "_bl_d"] === 'w' ? "will" : "health";
      } else {
        bl_type = bl_map[trigger];
      }
      base_mod = parseInt(attributes[bl_type], 10);
      update["bl_prefix"] = "ceil((";
      update["bl_suffix"] = ")/2)";
    }
    update["complex_trigger_mod"] = base_mod;
    setAttrs(update, { silent: true }, () => {
      updateObType();
      updateBackpackMod();
      if (initialize_request) {
        closeComplexRollModal();
      }
      if (update["bl_suffix"] && update["bl_suffix"] === ")/2)") {
        updateModifiers();
      }
    });
  });
};

const closeComplexRollModal = () => {
  const update = {
    show_roll_modal: 0,
    trait_mod: 0,
    trait_mod_type: 1,
    persona_mod: 0,
    persona_mod_number: 1,
    nature_mod: 0,
    nature_in_or_out: "inside",
    help_mod: 0,
    help_mod_number: 1,
    gear_mod: 0,
    gear_mod_number: 1,
    party_hungry_and_thirsty_mod: 0,
    home_town_mod: 0,
    enchanted_item_mod: 0,
    invocation_mod: 0,
    spell_mod: 0,
    level_benefit_mod: 0,
    dim_light_mod: 0,
    evil_gm_factor_mod: 0,
    other_mod: 0,
    other_mod_number: 1,
    complex_mods: "",
  };
  setAttrs(update, { silent: true });
};

const bl_map = {
  "alchemist": "will",
  "arcanist": "will",
  "armorer": "health",
  "cartographer": "will",
  "commander": "will",
  "cook": "will",
  "criminal": "health",
  "dungeoneer": "health",
  "fighter": "health",
  "haggler": "will",
  "healer": "will",
  "hunter": "health",
  "laborer": "health",
  "loremaster": "will",
  "manipulator": "will",
  "mentor": "will",
  "orator": "will",
  "pathfinder": "health",
  "peasant": "health",
  "persuader": "will",
  "rider": "health",
  "ritualist": "will",
  "sapper": "health",
  "scavenger": "health",
  "scholar": "will",
  "scout": "will",
  "survivalist": "health",
  "theologian": "will",
}

const updateSuccessMod = trigger_attribute => {
  const attributes_to_fetch = ["hungry_and_thirsty", "exhausted", "party_hungry_and_thirsty_mod", "dim_light_mod", "evil_gm_factor_mod", "other_mod", "other_successes", "backpack_mod"];
  getAttrs(attributes_to_fetch, attributes => {
    const update = {};
    const modifiers = [];
    const { hungry_and_thirsty, exhausted, party_hungry_and_thirsty_mod, dim_light_mod, evil_gm_factor_mod, other_mod, other_successes, backpack_mod } = attributes;
    if (party_hungry_and_thirsty_mod && party_hungry_and_thirsty_mod !== "0") {
      modifiers.push("-1[Party Hungry or Thirsty]");
    };
    if (dim_light_mod && dim_light_mod !== "0") {
      modifiers.push("-1[Dim Light]");
    };
    if (evil_gm_factor_mod && evil_gm_factor_mod !== "0") {
      modifiers.push("-1[Evil GM Factor]");
    };
    if (hungry_and_thirsty && hungry_and_thirsty !== "0") {
      modifiers.push("-1[Hungry and Thirsty]");
    };
    if (exhausted && exhausted !== "0") {
      modifiers.push("-1[Exhausted]");
    };
    if (backpack_mod && backpack_mod !== "0") {
      modifiers.push("-1[Backpack]");
    };
    if (other_mod && other_mod !== "0" && other_successes && other_successes !== "0") {
      const val = parseInt(other_successes, 10) > -1 ? "+" + other_successes : other_successes;
      modifiers.push(val + "[Other Modifiers]");
    };
    update["success_mod"] = modifiers.length ? "[[" + modifiers.join(" ") + "]]" : "0";
    update["success_mod_rolltemplate"] = "{{disposition=[[@{success_mod_base}]]}}";
    setAttrs(update, { silent: true });
  });
}

const updateObType = () => {
  const attributes_to_fetch = ["complex_trigger", "ob_type"];
  getAttrs(attributes_to_fetch, attributes => {
    const trigger = attributes.complex_trigger;
    const ob_type = attributes.ob_type;
    const update = {};

    if (["circles", "resources", "recovery_angry", "recovery_afraid", "recovery_exhausted", "recovery_injured", "recovery_sick"].includes(trigger)) {
      update["complex_conditions_modifier"] = "@{town_conditions_modifier}";
    } else if (ob_type === "conflict") {
      update["complex_conditions_modifier"] = "@{conflict_conditions_modifier}";
    } else {
      update["complex_conditions_modifier"] = "@{conditions_modifier}";
    };

    update["complex_ob_formula"] = "";
    if (ob_type === "versus") {
      update["complex_ob_formula"] = "d6>4";
    }
    if (ob_type === "conflict") {
      update["complex_ob_formula"] = "*0";
      update["conflict_sub_type"] = "{{might=@{might}}} ";
    } else {
      update["conflict_sub_type"] = " ";
    }

    if (ob_type === "simple") {
      update["ob_type_template"] = "{{simple=true}}";
    } else if (ob_type === "independent") {
      update["ob_type_template"] = "{{independent=true}}";
    } else if (ob_type === "versus") {
      update["ob_type_template"] = "{{versus=true}}";
    } else if (ob_type === "conflict") {
      update["ob_type_template"] = "{{conflict=true}}";
    };

    setAttrs(update, { silent: true });
  });
}

const updateBackpackMod = () => {
  const attributes_to_fetch = ["complex_trigger", "backpack_type"];
  getAttrs(attributes_to_fetch, attributes => {
    const update = {};
    const { complex_trigger, backpack_type } = attributes;
    update["backpack_mod"] = "0";
    if (backpack_type === "backpack" && (complex_trigger === "fighter" || complex_trigger === "dungeoneer")) {
      update["backpack_mod"] = "-1[Backpack]";
    }
    setAttrs(update, { silent: true });
  });
}

const checkStigmata = () => {
  const attributes_to_fetch = ["urdr", "burden"];
  getAttrs(attributes_to_fetch, attributes => {
    const update = {};
    const { urdr, burden } = attributes;
    update["stigmata_flag"] = "0";
    if (urdr < burden) {
      update["stigmata_flag"] = "1";
    }
    setAttrs(update, { silent: true });
  });
}

const initialize = () => {
  const attributes_to_fetch = ["initialized"];
  getAttrs(attributes_to_fetch, attributes => {
    const { initialized } = attributes;
    if (initialized) {
      return;
    }
    updateConditions("fresh");
    activateComplexRollModal("resources", true);
    setAttrs({ initialized: "true" });
  });
}

on("change:will change:health change:nature change:resources change:circles change:alchemist change:arcanist change:armorer change:cartographer change:commander change:cook change:criminal change:dungeoneer change:fighter change:haggler change:healer change:hunter change:loremaster change:manipulator change:mentor change:orator change:pathfinder change:persuader change:rider change:ritualist change:scavenger change:scholar change:survivalist change:theologian change:skill1 change:skill2 change:skill3 change:skill4 change:skill5 change:scout change:laborer change:peasant change:sapper", function (eventinfo) {
  const attribute_base = eventinfo.sourceAttribute;
  scrubAdvancement(attribute_base);
});

on("change:will_pass change:will_fail change:health_pass change:health_fail change:nature_pass change:nature_fail change:resources_pass change:resources_fail change:circles_pass change:circles_fail change:alchemist_pass change:arcanist_pass change:armorer_pass change:cartographer_pass change:commander_pass change:cook_pass change:criminal_pass change:dungeoneer_pass change:fighter_pass change:haggler_pass change:healer_pass change:hunter_pass change:loremaster_pass change:manipulator_pass change:mentor_pass change:orator_pass change:pathfinder_pass change:persuader_pass change:rider_pass change:ritualist_pass change:scavenger_pass change:scholar_pass change:survivalist_pass change:theologian_pass change:skill1_pass change:skill2_pass change:skill3_pass change:skill4_pass change:skill5_pass change:alchemist_fail change:arcanist_fail change:armorer_fail change:cartographer_fail change:commander_fail change:cook_fail change:criminal_fail change:dungeoneer_fail change:fighter_fail change:haggler_fail change:healer_fail change:hunter_fail change:loremaster_fail change:manipulator_fail change:mentor_fail change:orator_fail change:pathfinder_fail change:persuader_fail change:rider_fail change:ritualist_fail change:scavenger_fail change:scholar_fail change:survivalist_fail change:theologian_fail change:skill1_fail change:skill2_fail change:skill3_fail change:skill4_fail change:skill5_fail change:scout_pass change:scout_fail change:laborer_pass change:laborer_fail change:peasant_pass change:peasant_fail change:sapper_pass change:sapper_fail", function (eventinfo) {
  const attribute_base = eventinfo.sourceAttribute.replace(/_pass|_fail/g, '');
  checkAdvancement(attribute_base);
});

on("change:will_advancement change:health_advancement change:nature_advancement change:resources_advancement change:circles_advancement change:alchemist_advancement change:arcanist_advancement change:armorer_advancement change:cartographer_advancement change:commander_advancement change:cook_advancement change:criminal_advancement change:dungeoneer_advancement change:fighter_advancement change:haggler_advancement change:healer_advancement change:hunter_advancement change:loremaster_advancement change:manipulator_advancement change:mentor_advancement change:orator_advancement change:pathfinder_advancement change:persuader_advancement change:rider_advancement change:ritualist_advancement change:scavenger_advancement change:scholar_advancement change:survivalist_advancement change:theologian_advancement change:skill1_advancement change:skill2_advancement change:skill3_advancement change:skill4_advancement change:skill5_advancement change:scout_advancement change:laborer_advancement change:peasant_advancement change:sapper_advancement", function (eventinfo) {
  const attribute_base = eventinfo.sourceAttribute.replace(/_advancement/g, '');
  doAdvancement(attribute_base);
});

on("change:alchemist_bl change:arcanist_bl change:armorer_bl change:cartographer_bl change:commander_bl change:cook_bl change:criminal_bl change:dungeoneer_bl change:fighter_bl change:haggler_bl change:healer_bl change:hunter_bl change:loremaster_bl change:manipulator_bl change:mentor_bl change:orator_bl change:pathfinder_bl change:persuader_bl change:rider_bl change:ritualist_bl change:scavenger_bl change:scholar_bl change:survivalist_bl change:theologian_bl change:skill1_bl change:skill2_bl change:skill3_bl change:skill4_bl change:skill5_bl change:scout_bl change:laborer_bl change:peasant_bl change:sapper_bl", function (eventinfo) {
  const attribute_base = eventinfo.sourceAttribute.replace(/_bl/g, '');;
  checkBeginnersLuck(attribute_base);
});

on("change:fresh change:hungry_and_thirsty change:angry change:afraid change:exhausted change:injured change:sick change:dead", function (eventinfo) {
  updateConditions(eventinfo.sourceAttribute);
});

on("change:will_trigger change:health_trigger change:nature_trigger change:resources_trigger change:circles_trigger change:alchemist_trigger change:arcanist_trigger change:armorer_trigger change:cartographer_trigger change:commander_trigger change:cook_trigger change:criminal_trigger change:dungeoneer_trigger change:fighter_trigger change:haggler_trigger change:healer_trigger change:hunter_trigger change:loremaster_trigger change:manipulator_trigger change:mentor_trigger change:orator_trigger change:pathfinder_trigger change:persuader_trigger change:rider_trigger change:ritualist_trigger change:sapper_trigger change:scavenger_trigger change:scholar_trigger change:scout_trigger change:survivalist_trigger change:theologian_trigger change:skill1_trigger change:skill2_trigger change:skill3_trigger change:skill4_trigger change:skill5_trigger change:laborer_trigger change:peasant_trigger change:recovery_angry_trigger change:recovery_afraid_trigger change:recovery_exhausted_trigger change:recovery_injured_trigger change:recovery_sick_trigger ", function (eventinfo) {
  activateComplexRollModal(eventinfo.sourceAttribute)
});

on("change:close_complex_modal", eventinfo => {
  closeComplexRollModal();
})

on("change:skill1_bl change:skill2_bl change:skill3_bl change:skill4_bl change:skill5_bl", eventinfo => {
  const update = {};
  if (eventinfo.newValue === "[[round(@{will}/2)]][Will]") {
    update[eventinfo.sourceAttribute + "_d"] = "w";
  } else if (eventinfo.newValue === "[[round(@{health}/2)]][Health]") {
    update[eventinfo.sourceAttribute + "_d"] = "h";
  }
  setAttrs(update, { silent: true });
});

on("change:trait_mod change:trait_mod_type change:persona_mod change:persona_mod_number change:nature_mod change:help_mod change:help_mod_number change:gear_mod change:gear_mod_number change:party_hungry_and_thirsty_mod change:home_town_mod change:enchanted_item_mod change:invocation_mod change:spell_mod change:level_benefit_mod change:dim_light_mod change:evil_gm_factor_mod change:other_mod change:other_mod_number change:backpack_type", eventinfo => {
  updateModifiers(eventinfo.sourceAttribute);
});

on("change:exhausted change:hungry_and_thirsty change:party_hungry_and_thirsty_mod change:dim_light_mod change:evil_gm_factor_mod change:other_mod change:other_successes", eventinfo => {
  updateSuccessMod(eventinfo.sourceAttribute);
  updateModifiers(eventinfo.sourceAttribute);
});

on("change:ob_type", eventinfo => {
  updateObType();
});

on("change:backpack_type", eventinfo => {
  updateBackpackMod();
});

on("change:urdr change:burden", eventinfo => {
  checkStigmata();
})
