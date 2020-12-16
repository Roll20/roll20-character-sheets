/* global setAttrs, getAttrs, getSectionIDs, on, getTranslationByKey */
"use strict";
// Utility
const setAttr = (attr, value) => {
  setAttrs({
    [attr]: value,
  });
};
const translate = (x) => `${getTranslationByKey(x)}`;
const register = (events, callback) => {
  on(events.map(x => {
    if (x !== "sheet:opened" && x.indexOf("remove:") !== 0) {
      return `change:${x}`;
    } else return x;
  }).join(" "), callback);
};

// Spell filters
const removeSpellFilters = (event) => {
  if (event.newValue === "0") {
    getSectionIDs("repeating_traditions", tradIDs => {
      const attrs = tradIDs.reduce((m, id) => {
        m[`repeating_traditions_${id}_tradition_filter`] = "0";
        return m;
      }, {});
      setAttrs(attrs);
    });
  }
};
const calcSpellFilters = () => {
  getSectionIDs("repeating_traditions", tradIDs => {
    getSectionIDs("repeating_spells", spellIDs => {
      const sourceAttrs = [
        ...tradIDs.map(id => `repeating_traditions_${id}_tradition_name`),
        ...tradIDs.map(id => `repeating_traditions_${id}_tradition_filter`),
        ...spellIDs.map(id => `repeating_spells_${id}_spell_tradition`)
      ];
      getAttrs(sourceAttrs, v => {
        const activeTraditions = tradIDs
          .filter(id => (v[`repeating_traditions_${id}_tradition_filter`] === "1"))
          .map(id => v[`repeating_traditions_${id}_tradition_name`].toLowerCase());
        const attrs = spellIDs.reduce((m, id) => {
          if (!activeTraditions.length || activeTraditions.includes(v[`repeating_spells_${id}_spell_tradition`].toLowerCase())) {
            m[`repeating_spells_${id}_spell_hide`] = "0";
          } else {
            m[`repeating_spells_${id}_spell_hide`] = "1";
          }
          return m;
        }, {});
        if (activeTraditions.length) attrs.remove_spell_filters = "1";
        else attrs.remove_spell_filters = "0";
        setAttrs(attrs);
      });
    });
  });
};

// Calculate defense
const defenseAttrs = [
  "affliction_defenseless",
  "affliction_unconscious",
  "agility",
  "npc",
  "auto_defense",
  "defense_input",
  "setting_npc_afflictions",
];
const calcDefense = () => {
  getSectionIDs("repeating_defense", idArray => {
    const sourceAttrs = [
      ...defenseAttrs,
      ...idArray.map(id => `repeating_defense_${id}_defense_check`),
      ...idArray.map(id => `repeating_defense_${id}_defense_base`),
      ...idArray.map(id => `repeating_defense_${id}_defense_bonus`),
    ];
    getAttrs(sourceAttrs, v => {
      const autoDefense = (v.auto_defense === "1") && (v.npc === "0");
      const attrs = idArray.reduce((m, id) => {
        const base = (v[`repeating_defense_${id}_defense_base`] === "AGILITY") ? (parseInt(v.agility) || 0) : 0;
        const bonus = parseInt(v[`repeating_defense_${id}_defense_bonus`]) || 0;
        m[`repeating_defense_${id}_defense_total`] = base + bonus;
        return m;
      }, {});
      if ((v.affliction_defenseless === "1" || v.affliction_unconscious === "1") && (v.npc === "0" || v.setting_npc_afflictions === "1")) {
        attrs.defense = "5";
      } else if (autoDefense && idArray.filter(id => (v[`repeating_defense_${id}_defense_check`] === "1")).length === 0) {
        attrs.defense = v.agility;
      } else if (autoDefense) {
        const totalDefense = Math.min(idArray.reduce((m, id) => {
          if (v[`repeating_defense_${id}_defense_check`] === "1") m += attrs[`repeating_defense_${id}_defense_total`];
          return m;
        }, 0), 25);
        attrs.defense = String(totalDefense);
      } else {
        attrs.defense = v.defense_input;
      }
      setAttrs(attrs);
    });
  });
};
const handleBasicEquipment = () => {
  getAttrs(["setting_basic_equipment", "auto_defense"], v => {
    if (v.setting_basic_equipment === "1" && v.auto_defense === "1") {
      setAttr("auto_defense", "0");
    }
  });
};

// Calculate equipment totals, summary
const calcEquipment = () => {
  getSectionIDs("repeating_items", idArray => {
    const sectionAttrs = [
      ...idArray.map(id => `repeating_items_${id}_item_check`),
      ...idArray.map(id => `repeating_items_${id}_item_amount`),
      ...idArray.map(id => `repeating_items_${id}_item_name`),
    ];
    getAttrs(sectionAttrs, v => {
      const total = idArray.filter(id => (v[`repeating_items_${id}_item_check`] === "1"))
        .map(id => `repeating_items_${id}_item_amount`)
        .reduce((m, n) => (m + (parseInt(v[n]) || 0)), 0);
      const summary = idArray.map(id => {
        const prefix = `repeating_items_${id}_item`,
          number = (v[`${prefix}_amount`] === "1") ? "" : v[`${prefix}_amount`] + " ";
        return number + v[`${prefix}_name`];
      }).join(", ");
      setAttrs({
        items_total: total,
        equipment_summary: summary,
      });
    });
  });
};

// Calculate stat mods
const stats = ["strength", "agility", "intellect", "perception", "will"];
const statMods = [...stats, "finesse"].map(x => `${x}_mod`);
const calcStatBonus = (stat) => {
  getAttrs([stat], v => setAttr(`${stat}_mod`, (parseInt(v[stat]) - 10) || 0));
};
const calcFinesseBonus = () => {
  getAttrs(["strength", "agility"], v => {
    setAttr("finesse_mod", (Math.max(parseInt(v.strength), parseInt(v.agility)) - 10) || 0);
  });
};
// Set max damage and healing rate
const handleHealthChange = () => {
  getAttrs(["health", "setting_healing_rate_divisor"], v => {
    setAttrs({
      damage_max: v.health,
      healing_rate: (Math.floor((parseInt(v.health)) / v.setting_healing_rate_divisor)) || 0,
    });
  });
};

// Handle display attributes for weapons
const calcWeaponMod = (prefixes) => {
  getAttrs([...statMods, ...prefixes.map(prefix => `${prefix}_attribute`)], v => {
    const setting = prefixes.reduce((m, prefix) => {
      m[`${prefix}_mod`] = v[v[`${prefix}_attribute`] + "_mod"];
      return m;
    }, {});
    setAttrs(setting);
  });
};
const calcWeaponDamage = (prefixes) => {
  getAttrs([...prefixes.map(prefix => `${prefix}_damage`), "setting_roll_weapon_damage", "global_damage_bonus", "setting_show_damage_button"], v => {
    const setting = prefixes.reduce((m, prefix) => {
      if (v[`${prefix}_damage`] == "" || (v.setting_roll_weapon_damage === "0" && v.setting_show_damage_button === "0")) {
        m[`${prefix}_damage_formula`] = "";
      } else if (v.setting_roll_weapon_damage == "0") {
        m[`${prefix}_damage_formula`] = "{{damage=1}} {{damageroll=[@{weapon_damage}](~repeating_weapons_damage)}}";
      } else {
        m[`${prefix}_damage_formula`] = "{{damage=1}} {{damageroll=[[@{weapon_damage} + @{global_damage_bonus}[global bonus]]]}}";
      }
      return m;
    }, {});
    setAttrs(setting);
  });
};

// Handle spell attack rolls
const updateSpellAttack = (prefix) => {
  const spellBoonFormula = "[[@{boons_banes_query} + @{spell_boons} + @{global_attack_boons} + @{global_spell_attack_boons} - @{banes_from_afflictions}]]";
  const spellAttackFormula = "@{die_attack} + @{spell_attack_mod} + @{spell_boons_formula}@{die_boon}k1[boons/banes]";
  getAttrs([`${prefix}_attack_mod`], v => {
    setAttrs({
      [`${prefix}_attack_formula`]: v[`${prefix}_attack_mod`] ? spellAttackFormula : "0",
      [`${prefix}_boons_formula`]: v[`${prefix}_attack_mod`] ? spellBoonFormula : "",
    });
  });
};
// Handle talent attack rolls
const updateTalentAttack = (prefix) => {
  const talentBoonFormula = "[[@{boons_banes_query} + @{talent_boons} + @{global_attack_boons} - @{banes_from_afflictions}]]";
  const talentAttackFormula = "@{die_attack} + @{talent_attack_mod} + @{talent_boons_formula}@{die_boon}k1[boons/banes]";
  getAttrs([`${prefix}_attack_mod`], v => {
    setAttrs({
      [`${prefix}_attack_formula`]: v[`${prefix}_attack_mod`] ? talentAttackFormula : "0",
      [`${prefix}_boons_formula`]: v[`${prefix}_attack_mod`] ? talentBoonFormula : "",
    });
  });
};

// Handle NPC attack rolls
const updateNpcAttack = (prefix) => {
  const npcBoonFormula = "[[@{boons_banes_query} + @{attack_boons} + @{global_attack_boons} - @{banes_from_afflictions}]]";
  const npcAttackFormula = "@{die_attack} + @{attack_mod} + @{attack_boons_formula}@{die_boon}k1[boons/banes]";
  getAttrs([`${prefix}_range`], v => {
    setAttrs({
      [`${prefix}_formula`]: v[`${prefix}_range`] ? npcAttackFormula : "0",
      [`${prefix}_boons_formula`]: v[`${prefix}_range`] ? npcBoonFormula : "",
    });
  });
};

// Boon display
const calcBoonsDisplay = (prefix) => {
  getAttrs([`${prefix}_boons`], v => {
    let boonsDisplay;
    if (v[`${prefix}_boons`] === "1") {
      boonsDisplay = `1 ${translate("BOON").toLowerCase()}`;
    } else if (v[`${prefix}_boons`] === "-1") {
      boonsDisplay = `1 ${translate("BANE").toLowerCase()}`;
    } else if (parseInt(v[`${prefix}_boons`]) <= -2) {
      boonsDisplay = `${-parseInt(v[`${prefix}_boons`])} ${translate("BANES").toLowerCase()}`;
    } else {
      boonsDisplay = `${v[`${prefix}_boons`]} ${translate("BOONS").toLowerCase()}`;
    }
    setAttr(`${prefix}_boons_display`, boonsDisplay);
  });
};

// Calculate spell max castings
const getSpellCastings = (rk, pwr, exp) => {
  const rank = parseInt(rk) || 0,
    power = parseInt(pwr) || 0,
    expertise = parseInt(exp) || 0;

  if (power < rank) {
    return "0";
  } else if (rank >= 6) {
    return "1";
  } else if (rank === 5) {
    if (power >= 8) return "2";
    else return "1";
  } else if (rank >= 2) {
    if ((power - rank) >= 6) return "3";
    else if ((power - rank) >= 2) return "2";
    else return "1";
  } else if (rank === 1) {
    if (power >= 5) return `${3 + expertise}`;
    else if (power >= 2) return `${2 + expertise}`;
    else return `${1 + expertise}`;
  } else if (rank === 0) {
    return `${power + expertise + 1}`;
  }
};
const calcSpellCastings = (prefixes) => {
  getAttrs([...prefixes.map(prefix =>`${prefix}_rank`), "power", "setting_auto_spell_castings", "setting_spell_expertise"], v => {
    if (v.setting_auto_spell_castings === "1") {
      const setting = prefixes.reduce((m, prefix) => {
        m[`${prefix}_castings_max`] = getSpellCastings(v[`${prefix}_rank`], v.power, v.setting_spell_expertise);
        return m;
      }, {});
      setAttrs(setting);
    }
  });
};

// Handle reset and rest
const resetSpellCastings = () => {
  getSectionIDs("repeating_spells", idArray => {
    getAttrs(idArray.map(id => `repeating_spells_${id}_spell_castings_max`), v => {
      const attrs = idArray.reduce((m, id) => {
        m[`repeating_spells_${id}_spell_castings`] = v[`repeating_spells_${id}_spell_castings_max`] || "1";
        return m;
      }, {});
      setAttrs(attrs);
    });
  });
};
const resetTalentUses = () => {
  getSectionIDs("repeating_talents", idArray => {
    getAttrs(idArray.map(id => `repeating_talents_${id}_talent_uses_max`), v => {
      const attrs = idArray.reduce((m, id) => {
        if (v[`repeating_talents_${id}_talent_uses_max`] && v[`repeating_talents_${id}_talent_uses_max`] !== "0") {
          m[`repeating_talents_${id}_talent_uses`] = v[`repeating_talents_${id}_talent_uses_max`] || "0";
        }
        return m;
      }, {});
      setAttrs(attrs);
    });
  });
};
const rest = () => {
  getAttrs(["rest", "damage", "healing_rate"], v => {
    if (v.rest == "1") {
      resetTalentUses();
      resetSpellCastings();

      const damage = Math.max(0, v.damage - v.healing_rate) || 0;
      setAttrs({ damage });

      for (let i = 0; i < 1e9; i++) {
        /* 
           We count to a billion.
           Delaying would be better, but breaks sheet workers.
        */
      }
      setAttrs({
        rest: "0"
      }, { silent: true });
    }
  });
};

// Handle banes from afflictions
const baneAfflictions = ["diseased", "fatigued", "frightened", "impaired", "poisoned"].map(x => `affliction_${x}`);
const calcBaneAfflictions = () => {
  getAttrs([...baneAfflictions, "npc", "setting_npc_afflictions"], v => {
    const banes_from_afflictions = (v.npc === "0" || v.setting_npc_afflictions === "1") ?
      baneAfflictions.reduce((m, k) => (m + (parseInt(v[k]) || 0)), 0) : "0";
    setAttrs({banes_from_afflictions});
  });
};
const handleAsleepChange = (event) => {
  if (event.newValue === "1") {
    setAttrs({
      affliction_prone: "1",
      affliction_unconscious: "1"
    });
  }
};
// Blinded, slowed, immobilized: modify speed
const speedAttrs = ["speed", "affliction_blinded", "affliction_immobilized", "affliction_slowed", "npc", "setting_npc_afflictions"];
const calcDisplaySpeed = () => {
  getAttrs(speedAttrs, v => {
    const attrs = {};
    const active = v.npc === "0" || v.setting_npc_afflictions === "1";
    if (active && (v.affliction_blinded === "1" || v.affliction_immobilized === "1" || v.affliction_slowed === "1")) {
      attrs.auto_speed = "1";
    } else attrs.auto_speed = "0";

    if (active && v.affliction_immobilized === "1") {
      attrs.speed_display = "0";
    } else if (active && (v.affliction_blinded === "1" && v.affliction_slowed === "1")) {
      attrs.speed_display = (v.speed === "0" || v.speed === "1") ? "0" : "1";
    } else if (active && v.affliction_blinded === "1") {
      attrs.speed_display = String(Math.min(2, parseInt(v.speed) || 0));
    } else if (active && v.affliction_slowed === "1") {
      attrs.speed_display = String(Math.floor((parseInt(v.speed) || 0) / 2));
    } else attrs.speed_display = v.speed;
    setAttrs(attrs);
  });
};

// Weapon/attack against display
const updateAgainst = (prefix) => {
  getAttrs([`${prefix}_against`], v => {
    let versus;
    if (v[`${prefix}_against`].toLowerCase().indexOf("strength") >= 0) {
      versus = `${translate("VS")} ${translate("STRENGTH")}`;
    } else if (v[`${prefix}_against`].toLowerCase().indexOf("agility") >= 0) {
      versus = `${translate("VS")} ${translate("AGILITY")}`;
    } else if (v[`${prefix}_against`].toLowerCase().indexOf("intellect") >= 0) {
      versus = `${translate("VS")} ${translate("INTELLECT")}`;
    } else if (v[`${prefix}_against`].toLowerCase().indexOf("will") >= 0) {
      versus = `${translate("VS")} ${translate("WILL")}`;
    } else if (v[`${prefix}_against`].toLowerCase().indexOf("perception") >= 0) {
      versus = `${translate("VS")} ${translate("PERCEPTION")}`;
    } else {
      versus = "";
    }
    setAttr(`${prefix}_against_display`, versus);
  });
};

// Spellbook
const buildSpellBook = () => {
  getSectionIDs("repeating_spells", idArray => {
    const spellAttrs = [
      ...idArray.map(id => `repeating_spells_${id}_spell_name`),
      ...idArray.map(id => `repeating_spells_${id}_spell_tradition`),
      ...idArray.map(id => `repeating_spells_${id}_spell_rank`),
      ...idArray.map(id => `repeating_spells_${id}_spell_type`),
      ...idArray.map(id => `repeating_spells_${id}_spell_castings`),
      ...idArray.map(id => `repeating_spells_${id}_spell_castings_max`),
      "character_id",
    ];
    getAttrs(spellAttrs, v => {
      const outputString = [...new Set(idArray
        .map(id => v[`repeating_spells_${id}_spell_tradition`] || "")
        .map(x => `${x.slice(0, 1).toUpperCase()}${x.slice(1).toLowerCase()}`)
      )].sort()
        .map(tradition => {
          const spellIDs = idArray.filter(id => {
            return (v[`repeating_spells_${id}_spell_tradition`] || "").toLowerCase() === tradition.toLowerCase();
          });
          return `**${tradition}**\n` +
            spellIDs.sort((idA, idB) => {
              const nameA = (v[`repeating_spells_${idA}_spell_name`] || "").toLowerCase(),
                nameB = (v[`repeating_spells_${idB}_spell_name`] || "").toLowerCase();
              if (nameA < nameB) return -1;
              else if (nameA > nameB) return 1;
              else return 0;
            })
              .map(id => {
                const prefix = `repeating_spells_${id}`;
                return `[${v[`${prefix}_spell_name`]} (${
                  translate(v[`${prefix}_spell_type`])} ${v[`${prefix}_spell_rank`] || 0}, ${
                  v[`${prefix}_spell_castings`] || 0}/${v[`${prefix}_spell_castings_max`] || 0
                })](~${v.character_id}|${prefix}_cast)`;
              }).join(", ");
        }).filter(x => !!x).join("\n");
      setAttr("spells_macro_var", outputString);
    });
  });
};

// Queries
const calcSacrificeQuery = () => {
  getAttrs(["repeating_spells_spell_sacrifice"], v => {
    const query = v.repeating_spells_spell_sacrifice ? `{{?{${translate("SACRIFICE_SPELL")}|${translate("NO")},` +
      `sacrifice=|${translate("YES")},sacrifice=@{spell_sacrifice}}}}` : "";
    setAttr("repeating_spells_spell_sacrifice_query", query);
  });
};
const setBoonsBanesQuery = () => {
  getAttrs(["boons_banes_query"], v => {
    const newValue = `?{#(${translate("BOONS_BANES")})|0}`;
    if (newValue !== v.boons_banes_query) setAttr("boons_banes_query", newValue);
  });
};
const setWhisperQuery = () => {
  getAttrs(["whisper_query"], v => {
    const newValue = `?{${translate("OUTPUT")}|${translate("PUBLIC")}, |${translate("WHISPERED_TO_GM")},/w GM}`;
    if (newValue !== v.whisper_query) setAttr("whisper_query", newValue);
  });
};

// NPC sections
const setNPCSectionPresence = (sName) => {
  getSectionIDs(`repeating_${sName}`, idArray => {
    setAttr(`has_${sName}`, idArray.length ? "1" : "0");
  });
};

const sanitizeTab = () => getAttrs(["npc", "tab"], v => {
  if (v.npc === "1" && !["npc", "spells"].includes(v.tab)) {
    setAttr("tab", "npc");
  } else if (v.npc === "0" && !["main", "equipment_talents", "spells", "background"].includes(v.tab)) {
    setAttr("tab", "main");
  }
});

const updateSheet = version => {
  if (version < 6) {
    getSectionIDs("repeating_weapons", idArray => {
      calcWeaponDamage(idArray.map(id => `repeating_weapons_${id}_weapon`));
    });
  }
  if (version < 7) {
    getSectionIDs("repeating_attacks", idArray => {
      idArray.forEach(id => updateNpcAttack(`repeating_attacks_${id}_attack`));
    });
  }
};

// Register events
on("sheet:opened", () => {
  getAttrs(["version"], v => {
    const version = parseInt(v.version);
    if (version && version < 7) {
      updateSheet(version);
    }
    setAttrs({
      version: "7",
      character_sheet: "Shadow of the Demon Lord v7",
    });
  });
  setBoonsBanesQuery();
  setWhisperQuery();
});

register(["repeating_traditions", "remove:repeating_traditions", "repeating_spells:spell_tradition"], calcSpellFilters);
register(["remove_spell_filters"], removeSpellFilters);
register([...defenseAttrs, "repeating_defense", "remove:repeating_defense"], calcDefense);
register(["repeating_items", "remove:repeating_items"], calcEquipment);

// Stat mods etc
stats.forEach(stat => register([stat], () => calcStatBonus(stat)));
register(["strength", "agility"], calcFinesseBonus);
register(["health", "healing_rate_divisor"], handleHealthChange);

// Repeating talents, weapons, attacks
register(["repeating_talents:talent_attack_mod"], () => updateTalentAttack("repeating_talents_talent"));
register(["repeating_weapons:weapon_attribute"], () => calcWeaponMod(["repeating_weapons_weapon"]));
register(statMods, () => {
  getSectionIDs("repeating_weapons", idArray => {
    calcWeaponMod(idArray.map(id => `repeating_weapons_${id}_weapon`));
  });
});
register(["setting_roll_weapon_damage", "global_damage_bonus", "setting_show_damage_button"], () => {
  getSectionIDs("repeating_weapons", idArray => {
    calcWeaponDamage(idArray.map(id => `repeating_weapons_${id}_weapon`));
  });
});
register(["repeating_weapons"], () => calcWeaponDamage(["repeating_weapons_weapon"]));
register(["repeating_attacks:attack_range"], () => updateNpcAttack("repeating_attacks_attack"));
["weapon", "attack"].forEach(sName => {
  register([`repeating_${sName}s:${sName}_boons`], () => {
    calcBoonsDisplay(`repeating_${sName}s_${sName}`);
  });
  register([`repeating_${sName}s:${sName}_against`], () => {
    updateAgainst(`repeating_${sName}s_${sName}`);
  });
});

// Repeating spells
register(["repeating_spells:spell_sacrifice"], calcSacrificeQuery);
register(["repeating_spells:spell_attack_mod"], () => updateSpellAttack("repeating_spells_spell"));
register(["power", "setting_auto_spell_castings", "setting_spell_expertise"], () => {
  getSectionIDs("repeating_spells", idArray => {
    calcSpellCastings(idArray.map(id => `repeating_spells_${id}_spell`));
  });
});
register(["repeating_spells:spell_rank"], () => calcSpellCastings(["repeating_spells_spell"]));
register(["repeating_spells", "remove:repeating_spells"], buildSpellBook);

// Reset and resting
register(["reset_spell_castings"], resetSpellCastings);
register(["reset_talent_uses"], resetTalentUses);
register(["rest"], rest);

// Afflictions
register([...baneAfflictions, "setting_npc_afflictions", "npc"], calcBaneAfflictions);
register(["affliction_asleep"], handleAsleepChange);
register(speedAttrs, calcDisplaySpeed);

// Make sure tab is valid
register(["npc", "sheet:opened"], sanitizeTab);
// Register presence of special sections
["specialactions", "specialattacks", "npcmagic", "endofround"].forEach(sName => {
  register([`repeating_${sName}`, `remove:repeating_${sName}`], () => setNPCSectionPresence(sName));
});

// Basic equipment: turn off auto-defense
register(["setting_basic_equipment"], handleBasicEquipment);
