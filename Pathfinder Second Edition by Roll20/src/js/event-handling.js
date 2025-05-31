/* === EVENTS HANDLING BEGINS === */

// == Generalities
// Sheet opening
on("sheet:opened", (eventinfo) => {
    modPf2.sheetOpen(eventinfo);
});

//Changes sheet type
['npc', 'character'].forEach(attr => {
    on(`clicked:toggle_${attr}`, (eventinfo) => {
        setAttrs({
            sheet_type : attr
        });
    });
});
// === SETTINGS TOGGLE
modPf2.getAttrNames(['setting_toggles', 'skills']).forEach(attr => {
    on(`clicked:toggle_${attr}`, (eventinfo) => {
        toggleStringBuilder(attr);
    });
});

modPf2.getAttrNames(['spell_types', 'color_scheme']).forEach(attr => {
    on(`change:toggle_${attr}`, (eventinfo) => {
        toggleStringBuilder(attr);
    });
});

const toggleStringBuilder = (toggle, callback) => {
    getAttrs(["toggles"], (values) => {
        let toggles_array = [];
        // Remove duplicates from current toggles, and empty strings, undefined, nulls and other "false" elements
        toggles_array = [...new Set((values[`toggles`] || "").split(","))].filter(element => {return element != null && String(element).trim().length;});
        // For each toggle passed as parameter, add it if absent, or remove it if present
        (toggle || "").split(",").forEach(toggle_uniq => {
            if(toggles_array.includes(toggle_uniq)) {
                // Alreay present: remove
                toggles_array.splice(toggles_array.indexOf(toggle_uniq), 1);
            } else {
                // Absent: add it
                toggles_array.push(toggle_uniq);
            }
        });
        setAttrs({"toggles" : toggles_array.join()},{silent: true}, () => {
            if(callback) {
                callback();
            }
        });
    });
};

on(`change:color_scheme`, (eventinfo) => {
    const newColor = `color:${(eventinfo.newValue || "neutral")},`;
    getAttrs(["toggles"], (values) => {
        let update = {};
        let toggles = (values["toggles"] || "");
        let oldColor = `color:${(eventinfo.previousValue || "default")},`;
        if(newColor === oldColor) {
            if(newColor.includes("neutral")) {
                oldColor = "color:default,";
            } else {
                oldColor = "color:neutral,";
            }
        }
        if(toggles.includes("color:")) {
            toggles = toggles.replace(oldColor, newColor);
        } else {
            toggles += newColor;
        }
        update["toggles"] = toggles;
        setAttrs(update,{silent: true});
    });
});

// === REPEATING SETTINGS TOGGLES
modPf2.getAttrNames(['repeating_toggles']).forEach(attr => {
    on(`clicked:${attr}:settings clicked:${attr}:collapse`, (eventinfo) => {
        const trigger = eventinfo.triggerName.split("clicked:")[1];
        const id      = trigger.split("_")[2];
        const keyword = trigger.split("_")[3];
        getAttrs([`${attr}_${id}_toggles`], (values) => {
            let string = values[`${attr}_${id}_toggles`];
            (string.includes(`${keyword}`)) ? string = string.replace(`${keyword},`, "") : string += `${keyword},`;
            setAttrs({
                [`${attr}_${id}_toggles`] : string
            });
        });
    });
});

// === Options - settings
on("clicked:whisper", (eventinfo) => {
    getAttrs(["whispertype"], function (values) {
        setAttrs({
            "whispertype": ((values["whispertype"] || "").includes("gm")) ?  " " : "/w gm "
        });
    });
});
on("change:roll_option_critical_damage", () => {
    modPf2.totalUpdate();
});

// === LEVEL
on("change:level", (eventinfo) => {
    // console.table(eventinfo);
    modPf2.totalUpdate();
});

// === ABILITIES
//Modifier calculators
modPf2.getAttrNames(['abilities']).forEach(attr => {
    on(`change:${attr}_score change:${attr}_score_temporary change:${attr}_modifier_temporary`, (eventinfo) => {
        // console.table(eventinfo);
        modPf2.updateAbility(attr);
    });
});
//Update ability inputs with the appropriate selectable modifier
modPf2.getAttrNames(['select_attributes']).forEach(attr => {
    on(`change:${attr}_ability_select`, (eventinfo) => {
        // console.table(eventinfo);
        if((eventinfo.newValue || "").includes("modifier")) {
            const ability = eventinfo.newValue.slice(2,-1);
            getAttrs([ability], (values) => {
                let update = {};
                update[`${eventinfo.sourceAttribute.replace(/_select$/,"")}`] = values[ability];
                setAttrs(update);
            });
        }
    });
});
//Update ability selects to custom if the user inputs their own modifer
modPf2.getAttrNames(['select_attributes']).forEach(attr => {
    on(`change:${attr}_ability`, (eventinfo) => {
        // console.table(eventinfo);
        if (eventinfo.sourceType === "player") {
            getAttrs([`${eventinfo.sourceAttribute}_select`], (values) => {
                if (values[`${eventinfo.sourceAttribute}_select`].includes("modifier")) {
                    setAttrs({
                        [`${eventinfo.sourceAttribute}_select`] : "custom"
                    },{silent: true});
                } else {
                    console.log(`%c Ability value was ${values[`${eventinfo.sourceAttribute}_select`]}`, "color:orange;");
                };
            });
        };
    });
});

// === SKILLS
// Fixed skills
modPf2.getAttrNames(["skills"]).forEach(attr => {
    on(modPf2.getAttrNames(["skills_fields"]).map(field => `change:${attr}_${field}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        if(!eventinfo.sourceAttribute.includes("ability_select")) {
            modPf2.updateSkill(attr,eventinfo.sourceAttribute);
        }
    });
});
// Repeating skills
modPf2.getAttrNames(['repeating_skills']).forEach(attr => {
    on(modPf2.getAttrNames(["skills_fields"]).map(field => `change:repeating_${attr}:${attr}_${field}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        if(!eventinfo.sourceAttribute.includes("ability_select")) {
            modPf2.updateSkill(`repeating_${attr}_${eventinfo.sourceAttribute.split(`${attr}_`)[1]}${attr}`,eventinfo.sourceAttribute);
        }
    });
});

// === SAVES
modPf2.getAttrNames(["saves"]).forEach(attr => {
    on(modPf2.getAttrNames(["saves_fields"]).map(field => `change:${attr}_${field}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        if(!eventinfo.sourceAttribute.includes("ability_select")) {
            modPf2.updateSave(attr,eventinfo.sourceAttribute);
        }
    });
});

// === ARMOR CLASS (AC)
modPf2.getAttrNames(["ac"]).forEach(attr => {
    on(modPf2.getAttrNames(["ac_fields"]).map(field => `change:${attr}_${field}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        if(!eventinfo.sourceAttribute.includes("ability_select")) {
            modPf2.updateArmorClass(attr,eventinfo.sourceAttribute);
        }
    });
});

// === HIT POINTS
on(modPf2.getAttrNames(["hit_points"]).map(attr => `change:${attr}`).join(' '), (eventinfo) => {
    // console.table(eventinfo);
    modPf2.updateHitPoints(eventinfo.sourceAttribute);
});

// === ATTACKS
modPf2.getAttrNames(["repeating_attacks"]).forEach(attr => {
    on(modPf2.getAttrNames(["attacks_fields"]).map(field => `change:repeating_${attr}:${field}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        if(!eventinfo.sourceAttribute.includes("ability_select")) {
            modPf2.updateAttack(`repeating_${attr}_${eventinfo.sourceAttribute.split('_')[2]}`,eventinfo.sourceAttribute);
        }
    });
});
on("change:query_roll_damage_dice", (eventinfo) => {
    modPf2.totalUpdate();
});

// === PERCEPTION
on(modPf2.getAttrNames(["perception"]).map(attr => `change:${attr}`).join(' '), (eventinfo) => {
    // console.table(eventinfo);
    if(!eventinfo.sourceAttribute.includes("ability_select")) {
        modPf2.updatePerception(eventinfo.sourceAttribute);
    }
});

// === INITIATIVE
on("change:initiative_skill", (eventinfo) => {
    setAttrs({"initiative": `@{${eventinfo.newValue}}[${getTranslationByKey(eventinfo.newValue).toUpperCase()}]`},{silent:true});
});

// === CLASS DC
on(modPf2.getAttrNames(["class_dc"]).map(attr => `change:${attr}`).join(' '), (eventinfo) => {
    // console.table(eventinfo);
    if(!eventinfo.sourceAttribute.includes("ability_select")) {
        modPf2.updateClassDc(eventinfo.sourceAttribute);
    }
});

// === SPELL ATTACK
on(modPf2.getAttrNames(["spell_attack"]).map(attr => `change:${attr}`).join(' '), (eventinfo) => {
    // console.table(eventinfo);
    if(!eventinfo.sourceAttribute.includes("ability_select")) {
        modPf2.updateSpellAttack(eventinfo.sourceAttribute,() => {modPf2.totalUpdate()});
    }
});
on("change:spell_attack", (eventinfo) => { // NPC only
    getAttrs(["sheet_type"], (values) => {
        if( (values["sheet_type"] || "").toLowerCase() === "npc"  ) {
            modPf2.totalUpdate();
        }
    });
});

// === SPELL DC
on(modPf2.getAttrNames(["spell_dc"]).map(attr => `change:${attr}`).join(' '), (eventinfo) => {
    // console.table(eventinfo);
    if(!eventinfo.sourceAttribute.includes("ability_select")) {
        modPf2.updateSpellDc(eventinfo.sourceAttribute,() => {modPf2.totalUpdate()});
    }
});
on("change:spell_dc", (eventinfo) => { // NPC only
    getAttrs(["sheet_type"], (values) => {
        if( (values["sheet_type"] || "").toLowerCase() === "npc"  ) {
            modPf2.totalUpdate();
        }
    });
});

// === SPELLS: MAGIC TRADITIONS
modPf2.getAttrNames(["magic_tradition"]).forEach(tradition => {
    on(modPf2.getAttrNames(["magic_tradition_fields"]).map(field => `change:magic_tradition_${tradition}_${field}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        modPf2.updateMagicTradition(eventinfo.sourceAttribute,tradition,() => {modPf2.totalUpdate()});
    });
});

// === SPELLS: SPELLS
modPf2.getAttrNames(["repeating_spells"]).forEach(attr => {
    on(modPf2.getAttrNames(["spells_fields_triggering"]).map(field => `change:repeating_${attr}:${field}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        modPf2.updateSpell(`repeating_${attr}_${eventinfo.sourceAttribute.split('_')[2]}_`,eventinfo.sourceAttribute);
    });
});
// -- Sorting spells
modPf2.getAttrNames(["repeating_spells"]).forEach(section => {
    on(`change:sort_${section}`, (eventinfo) => {
        // console.table(eventinfo);
        modPf2.sortSpells(section, (eventinfo["newValue"] || ""));
    });
});
modPf2.getAttrNames(["repeating_spells"]).forEach(section => {
    on(`change:_reporder:${section}`, (eventinfo) => {
        // console.table(eventinfo);
        let update = {};
        update[`sort_${section}`] = ""; // resetting select to "Sort By:"
        setAttrs(update,{silent:true});
     });
});
// -- Drop spells
modPf2.getAttrNames(["repeating_spells"]).forEach(section => {
    on(`change:${section}_spelldrop_data`, (eventinfo) => {
        if(eventinfo && eventinfo.newValue && ((!eventinfo.triggerType) || (eventinfo.triggerType && eventinfo.triggerType == "compendium"))) {
            modPf2.updateSpellDrop(section,eventinfo.newValue);
        }
    });
});

// === ENCUMBRANCE & BULK
on("change:encumbered_modifier change:maximum_modifier", (eventinfo) => {
    modPf2.updateEncumbrance(eventinfo.sourceAttribute);
});
modPf2.getAttrNames(["repeating_bulks"]).forEach(attr => {
    on(modPf2.getAttrNames(["bulks_fields"]).map(field => `change:repeating_items-${attr}:${attr}_${field}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        modPf2.updateBulk(eventinfo.sourceAttribute);
    });
    on(`remove:repeating_items-${attr}`, (eventinfo) => {
        // console.table(eventinfo);
        modPf2.updateBulk(eventinfo.sourceAttribute);
    });
});
on("change:cp change:sp change:gp change:pp", (eventinfo) => {
        // console.table(eventinfo);
        modPf2.updateBulk(eventinfo.sourceAttribute);
});

// === ACTIONS
// -- NPC Compendium drops
on("change:npcdrop_data", (eventinfo) => {
    if(eventinfo && eventinfo.newValue && ((!eventinfo.triggerType) || (eventinfo.triggerType && eventinfo.triggerType == "compendium"))) {
        modPf2.updateNpcDrop(eventinfo.newValue);
    }
});
// -- Actions (PC)
on("change:repeating_actions:action change:repeating_actions:name", (eventinfo) => {
    let row = eventinfo.sourceAttribute.substr(0,39);
    getAttrs([`${row}action`], (values) => {
        let update = {};
        update[`${row}action_type`] = modPf2.toTitleCase(getTranslationByKey((values[`${row}action`] || "other")));
        setAttrs(update,{silent: true});
    });
});

// === Automatic and Reactive abilities (NPC)
on("change:repeating_free-actions-reactions:free_action change:repeating_free-actions-reactions:reaction", (eventinfo) => {
    let row = eventinfo.sourceAttribute.substr(0,54);
    getAttrs([`${row}free_action`,`${row}reaction`], (values) => {
        let update = {};
        update[`${row}action_type`] = (`${(values[`${row}free_action`] || "0") == "0" ? "" : modPf2.toTitleCase(getTranslationByKey("free_action"))} `
                              + `${(values[`${row}reaction`] || "0") == "0" ? "" : modPf2.toTitleCase(getTranslationByKey("reaction"))} `).trim();
        setAttrs(update,{silent: true});
    })
});

/* === EVENTS HANDLING ENDS === */
//# sourceURL=Pathfinder2ByRoll20.js
