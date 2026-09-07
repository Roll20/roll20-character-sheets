
// === Opening, version and translation

on("sheet:opened", () => {
    versioning();
});

// Version handling
const versioning = function() {
    let version = 2.2;
    getAttrs(["version","character_name"], (version_value) => {
        const vrs = parseFloat(version_value.version || "0.0");
        if (vrs == version) {
            console.log(`%c Cypher Systems by Roll20 v${vrs} - Opening character "${version_value.character_name}"`, "color:purple;font-size:14px;");
            update_chartype();
        } else if (vrs == 0.0) {
            // Conversion from older sheets needed?
            check_for_conversion(() => {
                getAttrs(["converted_from","gnlsettings_sheet_style","gnlsettings_sheet_rolls","gnlsettings_sheetuseasset","gnlsettings_sheetusebonus","gnlsettings_sheetusecost","gnlsettings_sheetuseapi"], (values) => {
                    let update = {};
                    update.version = "2.0";
                    update.sheetuseapi = (values.gnlsettings_sheetuseapi || "0");
                    if((values.converted_from || "none") == "none") {
                        update.sheet_style = (values.gnlsettings_sheet_style || "2");
                        update.sheet_style_0 = 0;
                        update.sheet_style_1 = 0;
                        update.sheet_style_2 = 0;
                        update.sheet_style_99 = 0;
                        update[`sheet_style_${(values.gnlsettings_sheet_style || "2")}`] = 1;
                    }
                    if(["Numenéra","The Strange by Roll20","none"].includes((values.converted_from || "none"))) {
                        update.sheet_rolls = (values.gnlsettings_sheet_rolls || "1");
                        update.sheetuseasset = (values.gnlsettings_sheetuseasset || "0");
                        update.showuseasset = (values.gnlsettings_sheetuseasset || "0");
                        update.sheetusebonus = (values.gnlsettings_sheetusebonus || "0");
                        update.showusebonus = (values.gnlsettings_sheetusebonus || "0");
                        update.sheetusecost = (values.gnlsettings_sheetusecost || "0");
                        update.showusecost = (values.gnlsettings_sheetusecost || "0");
                    }
                    setAttrs(update, {silent: true}, () => {
                        versioning();
                    });
                });
            });
        } else {
            setAttrs({"version": version}, {silent: true}, () => {
                versioning();
            });
        }
    });
};
const check_for_conversion = function(doneupdating) {
    console.log("%c Cypher Systems by Roll20: Checking for conversion", "color:purple;font-size:14px;");
    getAttrs(["mightpool","cyphers","cyper","mightedge","speededge","intellectedge","npcbasediff"], (values) =>  {
        if((typeof values.mightpool !== "undefined") && (typeof values.cyphers !== "undefined")) {
            // Convert from Numenéra
            convert_from_numenera(doneupdating);
        } else if((typeof values.mightpool !== "undefined") && (typeof values.cyper !== "undefined")) {
            // Convert from The Strange
            convert_from_thestrange(doneupdating);
        } else if(
            (typeof values.mightedge !== "undefined")
            || (typeof values.speededge !== "undefined")
            || (typeof values.intellectedge !== "undefined")
            || (typeof values.npcbasediff !== "undefined")
        ) {
            // convert from Community Cypher System Sheet
            convert_from_cypher(doneupdating);
        } else { // Can't find the right sheet... or just a blank new sheet
            doneupdating();
        }
    });
};
const convert_from_cypher = function(doneupdating) {
    // convert from Community Cypher System Sheet
    console.log("%c Cypher Systems by Roll20: converting from community Cypher System sheet...", "color:purple;font-size:14px;");
    let fields = ["sheetstyle","level","sheetRolls","initvarskill"];
    statids = {};
    // Get all repeating sections skills
    getSectionIDs("repeating_abilities", (abids) => {
        getSectionIDs("repeating_attacks", (weapids) => {
            getSectionIDs("repeating_attackmight", (mightatkids) => {
                statids["mightatkids"] = mightatkids;
                getSectionIDs("repeating_attackspeed", (speedatkids) => {
                    statids["speedatkids"] = speedatkids;
                    getSectionIDs("repeating_attackintel", (intelatkids) => {
                        statids["intelatkids"] = intelatkids;
                        getSectionIDs("repeating_skillmight", (mightskillids) => {
                            statids["mightskillids"] = mightskillids;
                            getSectionIDs("repeating_skillspeed", (speedskillids) => {
                                statids["speedskillids"] = speedskillids;
                                getSectionIDs("repeating_skillintel", (intelskillids) => {
                                    statids["intelskillids"] = intelskillids;
                                    getSectionIDs("repeating_cypher-list", (cyphids) => {
                                        getSectionIDs("repeating_artifact-list", (artids) => {
                                            // Gathering attributes
                                            // Abilities
                                            fields.push(...abids.map((id) => `repeating_abilities_${id}_abilityuse`));
                                            // Weapons
                                            fields.push(...weapids.map((id) => `repeating_attacks_${id}_atkmod`));
                                            fields.push(...weapids.map((id) => `repeating_attacks_${id}_atkdmg`));
                                            _.each(["might","speed","intel"], (stat) => {
                                                // attacks
                                                if(statids[`${stat}atkids`].length) {
                                                    statids[`${stat}atkids`].map((id) => {
                                                        fields.push(
                                                            `repeating_attack${stat}_${id}_atk${stat}name`
                                                            ,`repeating_attack${stat}_${id}_atk${stat}cost`
                                                            ,`repeating_attack${stat}_${id}_atk${stat}dmg`
                                                            ,`repeating_attack${stat}_${id}_atk${stat}lvl`
                                                            ,`repeating_attack${stat}_${id}_atk${stat}mod`
                                                        );
                                                    });
                                                }
                                                // skills
                                                if(statids[`${stat}skillids`].length) {
                                                    statids[`${stat}skillids`].map((id) => {
                                                        fields.push(
                                                            `repeating_skill${stat}_${id}_skill${stat}name`
                                                            ,`repeating_skill${stat}_${id}_skill${stat}lvl`
                                                        );
                                                    });
                                                }
                                            });
                                            getAttrs(fields, (values) =>  {
                                                let update = {};
                                                // Sheet style
                                                update.sheet_style = (values.sheetstyle || "0");
                                                update.sheet_style_0 = 0;
                                                update.sheet_style_1 = 0;
                                                update.sheet_style_2 = 0;
                                                update.sheet_style_99 = 0;
                                                update[`sheet_style_${(values.sheetstyle || "0")}`] = 1;
                                                if(update.sheet_style == "99") { // NPC
                                                    update.npcbasetn = (parseInt(values.level) || 0)*3;
                                                    update.settings_show = 0;
                                                } else { // PC
                                                    update.sheet_rolls = (typeof values.sheetrolls === "undefined") ? "1" : "0";
                                                    _.each(["speed","might","intel"], (stat) => {
                                                        let fstat;
                                                        fstat = (stat == "intel") ? "intellect" : stat;
                                                        // Initiative
                                                        update.initlvl = (values.initlvl || 0);
                                                        // Skills
                                                        _.each(statids[`${stat}skillids`], (id) => {
                                                            let newid = generateRowID();
                                                            update[`repeating_skills_${newid}_skillname`] = (v[`repeating_skill${stat}_${id}_skill${stat}name`] || "");
                                                            update[`repeating_skills_${newid}_skilllvl`] = (v[`repeating_skill${stat}_${id}_skill${stat}lvl`] || "0");
                                                            update[`repeating_skills_${newid}_skillstat`] = fstat;
                                                            update[`repeating_skills_${newid}_skillchkdesc`] = 0;
                                                            update[`repeating_skills_${newid}_skilledge`] = `@{${fstat}_edge}`;
                                                            update[`repeating_skills_${newid}_skilltype`] = `${(getTranslationByKey(fstat + "-abbreviation") || "-").toUpperCase()} • `;
                                                            if(update[`repeating_skills_${newid}_skilllvl`] == "2") { // Specialized
                                                                update[`repeating_skills_${newid}_skilltype`] += (getTranslationByKey("specialized-abbreviation") || "-").toUpperCase();
                                                            } else if(update[`repeating_skills_${newid}_skilllvl`] == "1") { // Trained
                                                                update[`repeating_skills_${newid}_skilltype`] += (getTranslationByKey("trained-abbreviation") || "-").toUpperCase();
                                                            } else { // Untrained
                                                                update[`repeating_skills_${newid}_skilltype`] += (getTranslationByKey("untrained-abbreviation") || "-").toUpperCase();
                                                            }
                                                        });
                                                        // Attacks
                                                        _.each(statids[`${stat}atkids`], (id) => {
                                                            let newid = generateRowID();
                                                            update[`repeating_atks_${newid}_atkname`] = (v[`repeating_attack${stat}_${id}_atk${stat}name`] || "");
                                                            update[`repeating_atks_${newid}_atklvl`] = (v[`repeating_attack${stat}_${id}_atk${stat}lvl`] || "0");
                                                            update[`repeating_atks_${newid}_atkcost`] = (v[`repeating_attack${stat}_${id}_atk${stat}cost`] || "0");
                                                            update[`repeating_atks_${newid}_atkdmg`] = (v[`repeating_attack${stat}_${id}_atk${stat}dmg`] || "0");
                                                            update[`repeating_atks_${newid}_atkmod`] = (v[`repeating_attack${stat}_${id}_atk${stat}mod`] || "0");
                                                            update[`repeating_atks_${newid}_atkarmorcost`] = (stat == "speed") ? "@{armorspeedcost}" : "0";
                                                            update[`repeating_atks_${newid}_atkstat`] = fstat;
                                                            update[`repeating_atks_${newid}_atkchkdesc`] = 0;
                                                            update[`repeating_atks_${newid}_atkedge`] = `@{${fstat}_edge}`;
                                                            update[`repeating_atks_${newid}_atktype`] = `${(getTranslationByKey(fstat + "-abbreviation") || "-").toUpperCase()} • `;
                                                            if(update[`repeating_atks_${newid}_atklvl`] == "2") { // Specialized
                                                                update[`repeating_atks_${newid}_atktype`] += (getTranslationByKey("specialized-abbreviation") || "-").toUpperCase();
                                                            } else if(update[`repeating_atks_${newid}_atklvl`] == "1") { // Trained
                                                                update[`repeating_atks_${newid}_atktype`] += (getTranslationByKey("trained-abbreviation") || "-").toUpperCase();
                                                            } else { // Untrained
                                                                update[`repeating_atks_${newid}_atktype`] += (getTranslationByKey("untrained-abbreviation") || "-").toUpperCase();
                                                            }
                                                        });
                                                    });
                                                    // Weapons
                                                    _.each(weapids, (id) => {
                                                        update[`repeating_attacks_${id}_weapontype`] = (v[`repeating_attacks_${id}_atkmod`] || "0")  + " • " + (v[`repeating_attacks_${id}_atkdmg`] || "0");
                                                        update[`repeating_attacks_${id}_weapchkdesc`] = 0;
                                                    });
                                                    // Special abilities
                                                    _.each(abids, (id) => {
                                                        update[`repeating_abilities_${id}_abtype`] = (getTranslationByKey(v[`repeating_abilities_${id}_abilityuse`] + "-abbreviation") || "-").toUpperCase();
                                                        update[`repeating_abilities_${id}_abilitychkdesc`] = 0;
                                                    });
                                                    // Cyphers
                                                    _.each(cyphids, (id) => {
                                                        update[`repeating_cypher-list_${id}_cypher-chkdesc`] = 0;
                                                    });
                                                    // Artifacts
                                                    _.each(artids, (id) => {
                                                        update[`repeating_artifact-list_${id}_artifactchkdesc`] = 0;
                                                    });
                                                }
                                                update.converted_from = "Community Cypher System";
                                                setAttrs(update, {silent: true}, () => {
                                                    doneupdating();
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
    });
};
const convert_from_numenera = function(doneupdating) {
    // convert from Numenera
    console.log("%c Cypher Systems by Roll20: converting from Numenéra sheet...", "color:purple;font-size:14px;");
    let fields = ["10hours","10minutes","1action","1hour","cyphers","disabled","impaired","intellectpool","intellectpoolmax","mightpool","mightpoolmax","speedpool","speedpoolmax","artifactsandoddities"];
    // Get all repeating sections skills
    getSectionIDs("repeating_abilities", (abids) => {
        getSectionIDs("repeating_attacks", (atkids) => {
            getSectionIDs("repeating_skills", (skillids) => {
                fields.push(...abids.map((id) => `repeating_abilities_${id}_abilityuse`));
                fields.push(...atkids.map((id) => `repeating_attacks_${id}_attack-rep`));
                fields.push(...atkids.map((id) => `repeating_attacks_${id}_attack-mod-rep`));
                fields.push(...atkids.map((id) => `repeating_attacks_${id}_damage-mod-rep`));
                fields.push(...skillids.map((id) => `repeating_skills_${id}_skill-name`));
                fields.push(...skillids.map((id) => `repeating_skills_${id}_specialized-skill`));
                getAttrs(fields, (values) =>  {
                    let update = {};
                    // Stats
                    update.might = parseInt((values.mightpool || "").replace(/[^\d]/,'','gi') || 0);
                    update.might_max = parseInt((values.mightpoolmax || "").replace(/[^\d]/,'','gi') || 0);
                    update.speed = parseInt((values.speedpool || "").replace(/[^\d]/,'','gi') || 0);
                    update.speed_max = parseInt((values.speedpoolmax || "").replace(/[^\d]/,'','gi') || 0);
                    update.intellect = parseInt((values.intellectpool || "").replace(/[^\d]/,'','gi') || 0);
                    update.intellect_max = parseInt((values.intellectpoolmax || "").replace(/[^\d]/,'','gi') || 0);
                    // Abilities
                    _.each(abids, (id) => {
                        if( (v[`repeating_abilities_${id}_abilityuse`] || "").length) {
                            if(v[`repeating_abilities_${id}_abilityuse`].toLowerCase().trim().includes('action')) {
                                update[`repeating_abilities_${id}_abilityuse`] = 'Action';
                            } else if(v[`repeating_abilities_${id}_abilityuse`].toLowerCase().trim().includes('enabler')) {
                                update[`repeating_abilities_${id}_abilityuse`] = 'Enabler';
                            } else {
                                update[`repeating_abilities_${id}_abilityuse`] = 'Other';
                            }
                        } else {
                            update[`repeating_abilities_${id}_abilityuse`] = 'Other';
                        }
                        update[`repeating_abilities_${id}_abtype`] = (getTranslationByKey(update[`repeating_abilities_${id}_abilityuse`] + "-abbreviation") || "-").toUpperCase();
                        update[`repeating_abilities_${id}_abilitychkdesc`] = 0;
                    });
                    // skills
                    _.each(skillids, (id) => {
                        update[`repeating_skills_${id}_skillname`] = (v[`repeating_skills_${id}_skill-name`] || "");
                        update[`repeating_skills_${id}_skilltype`] = `${(getTranslationByKey("intellect-abbreviation") || "-").toUpperCase()} • `;
                        if((v[`repeating_skills_${id}_specialized-skill`] || "0") == "on") { // Specialized
                            update[`repeating_skills_${id}_skilllvl`] = 2;
                            update[`repeating_skills_${id}_skilltype`] += (getTranslationByKey("specialized-abbreviation") || "-").toUpperCase();
                        } else if((v[`repeating_skills_${id}_trained-skill`] || "0") == "on") { // Trained
                            update[`repeating_skills_${id}_skilllvl`] = 1;
                            update[`repeating_skills_${id}_skilltype`] += (getTranslationByKey("trained-abbreviation") || "-").toUpperCase();
                        } else { // Untrained
                            update[`repeating_skills_${id}_skilllvl`] = 0;
                            update[`repeating_skills_${id}_skilltype`] += (getTranslationByKey("untrained-abbreviation") || "-").toUpperCase();
                        }
                        update[`repeating_skills_${id}_skillchkdesc`] = 0;
                    });
                    // Attacks / Weapons
                    _.each(atkids, (id) => {
                        update[`repeating_attacks_${id}_atkname`] = (v[`repeating_attacks_${id}_attack-rep`] || "");
                        update[`repeating_attacks_${id}_atkmod`] = (v[`repeating_attacks_${id}_attack-mod-rep`] || "0");
                        update[`repeating_attacks_${id}_atkdmg`] = (v[`repeating_attacks_${id}_damage-mod-rep`] || "0");
                        update[`repeating_attacks_${id}_weapontype`] = `${update[`repeating_attacks_${id}_atkmod`]} • ${update[`repeating_attacks_${id}_atkdmg`]}`;
                        update[`repeating_attacks_${id}_weapchkdesc`] = 0;
                        let idbis = generateRowID();
                        update[`repeating_atks_${idbis}_atkname`] = (v[`repeating_attacks_${id}_attack-rep`] || "");
                        update[`repeating_atks_${idbis}_atkmod`] = (v[`repeating_attacks_${id}_attack-mod-rep`] || "0");
                        update[`repeating_atks_${idbis}_atkdmg`] = (v[`repeating_attacks_${id}_damage-mod-rep`] || "0");
                        update[`repeating_atks_${idbis}_atkchkdesc`] = 0;
                        update[`repeating_atks_${idbis}_atktype`] = `${(getTranslationByKey("might-abbreviation") || "-").toUpperCase()} • ${update[`repeating_atks_${idbis}_atkdmg`]}`;
                    });
                    // Damage Track
                    if( (values.disabled || "0") == "on") {
                        update["damage-track"] = 2;
                    } else if((values.impaired || "0") == "on") {
                        update["damage-track"] = 1;
                    }
                    // Recovery
                    if((values["10hours"] || "0") == "on") {
                        update["recovery-rolls"] = 3;
                    } else if((values["1hour"] || "0") == "on") {
                        update["recovery-rolls"] = 2;
                    } else if((values["10minutes"] || "0") == "on") {
                        update["recovery-rolls"] = 1;
                    } else if((values["1action"] || "0") == "on") {
                        update["recovery-rolls"] = 0;
                    }
                    // Misc
                    update.cyphers_misc = (values.cyphers || "");
                    update.armorspeedcost = (values.armor-speed-reduction || "0").replace(/[^\d]*/,'','gi');
                    update.artifacts_misc = (values.artifactsandoddities || "");
                    // End
                    update.sheet_style_0 = "0";
                    update.sheet_style_1 = "1";
                    update.sheet_style_2 = "0";
                    update.sheet_style_99 = "0";
                    update.sheet_style = "1";
                    update.converted_from = "Numenéra";
                    setAttrs(update, {silent: true}, () => {
                        doneupdating();
                    });
                });
            });
        });
    });
};
const convert_from_thestrange = function(doneupdating) {
    // convert from The Strange
    console.log("%c Cypher Systems by Roll20: converting from The Strange by Roll20 sheet...", "color:purple;font-size:14px;");
    let fields = ["attack1","attack2","attack3","attack4","attack5","attack6","attack7","attack8","attack9","attackdmg1","attackdmg2","attackdmg3","attackdmg4","attackdmg5","attackdmg6","attackdmg7","attackdmg8","attackdmg9","checkboxs1","checkboxs10","checkboxs11","checkboxs12","checkboxs13","checkboxs14","checkboxs15","checkboxs16","checkboxs17","checkboxs18","checkboxs19","checkboxs2","checkboxs20","checkboxs21","checkboxs3","checkboxs4","checkboxs5","checkboxs6","checkboxs7","checkboxs8","checkboxs9","checkboxt1","checkboxt10","checkboxt11","checkboxt12","checkboxt13","checkboxt14","checkboxt15","checkboxt16","checkboxt17","checkboxt18","checkboxt19","checkboxt2","checkboxt20","checkboxt21","checkboxt3","checkboxt4","checkboxt5","checkboxt6","checkboxt7","checkboxt8","checkboxt9","cyper","debilitated","equipment","extra_effort","impared","increase_capabilities","intellectpool","intellectpoolmax","mightpool","mightpoolmax","move_twoards_perfection","other","recovery_10hr","recovery_10min","recovery_1action","recovery_1hr","skill_training","skill1","skill10","skill11","skill12","skill13","skill14","skill15","skill16","skill17","skill18","skill19","skill2","skill20","skill21","skill3","skill4","skill5","skill6","skill7","skill8","skill9","special_abilities","speedpool","speedpoolmax"];
    getAttrs(fields, (values) =>  {
        let update = {}, id, i=0;
        // WIP
        // Stats
        update.might = parseInt((values.mightpool || "").replace(/[^\d]/,'','gi') || 0);
        update.might_max = parseInt((values.mightpoolmax || "").replace(/[^\d]/,'','gi') || 0);
        update.speed = parseInt((values.speedpool || "").replace(/[^\d]/,'','gi') || 0);
        update.speed_max = parseInt((values.speedpoolmax || "").replace(/[^\d]/,'','gi') || 0);
        update.intellect = parseInt((values.intellectpool || "").replace(/[^\d]/,'','gi') || 0);
        update.intellect_max = parseInt((values.intellectpoolmax || "").replace(/[^\d]/,'','gi') || 0);
        // Skills
        for(i=1; i < 10; i++) {
            if( (v[`skill${i}`] || "").length ) {
                if(v[`skill${i}`].toLowerCase().trim() == "initiative" ) {
                    if([1,4,7,10,13,16,19].includes(i)) {
                        update.initstat = "might";
                    } else if([2,5,8,11,14,17,20].includes(i)) {
                        update.initstat = "speed";
                    } else {
                        update.initstat = "intellect";
                    }
                    update.inittype = `${(getTranslationByKey(update.initstat + "-abbreviation") || "-").toUpperCase()} • `;
                    if((v[`checkboxs${i}`] || "0") == "on") { // Specialized
                        update.initlvl = 2;
                        update.inittype += (getTranslationByKey("specialized-abbreviation") || "-").toUpperCase();
                    } else if((v[`checkboxt${i}`] || "0") == "on") { // Trained
                        update.initlvl = 1;
                        update.inittype += (getTranslationByKey("trained-abbreviation") || "-").toUpperCase();
                    } else { // Untrained
                        update.initlvl = 0;
                        update.inittype += (getTranslationByKey("untrained-abbreviation") || "-").toUpperCase();
                    }
                    update.initchkdesc = 0;
                } else {
                    id = generateRowID();
                    update[`repeating_skills_${id}_skillname`] = v[`skill${i}`];
                    if([1,4,7,10,13,16,19].includes(i)) {
                        update[`repeating_skills_${id}_skillstat`] = "might";
                    } else if([2,5,8,11,14,17,20].includes(i)) {
                        update[`repeating_skills_${id}_skillstat`] = "speed";
                    } else {
                        update[`repeating_skills_${id}_skillstat`] = "intellect";
                    }
                    update[`repeating_skills_${id}_skilledge`] = update[`repeating_skills_${id}_skillstat`] + "_edge";
                    update[`repeating_skills_${id}_skilltype`] = `${(getTranslationByKey(update[`repeating_skills_${id}_skillstat`]  + "-abbreviation") || "-").toUpperCase()} • `;
                    if((v[`checkboxs${i}`] || "0") == "on") { // Specialized
                        update[`repeating_skills_${id}_skilllvl`] = 2;
                        update[`repeating_skills_${id}_skilltype`] += (getTranslationByKey("specialized-abbreviation") || "-").toUpperCase();
                    } else if((v[`checkboxt${i}`] || "0") == "on") { // Trained
                        update[`repeating_skills_${id}_skilllvl`] = 1;
                        update[`repeating_skills_${id}_skilltype`] += (getTranslationByKey("trained-abbreviation") || "-").toUpperCase();
                    } else { // Untrained
                        update[`repeating_skills_${id}_skilllvl`] = 0;
                        update[`repeating_skills_${id}_skilltype`] += (getTranslationByKey("untrained-abbreviation") || "-").toUpperCase();
                    }
                    update[`repeating_skills_${id}_skillchkdesc`] = 0;
                }
            }
        }
        // Attacks / Weapons
        for(i=1; i < 10; i++) {
            if( (v[`attack${i}`] || "").length ) {
                id = generateRowID();
                update[`repeating_attacks_${id}_atkname`] = v[`attack${i}`];
                update[`repeating_attacks_${id}_atkdmg`] = (parseInt(v[`attackdmg${i}`]) || 0);
                update[`repeating_attacks_${id}_weapchkdesc`] = 0;
                update[`repeating_attacks_${id}_weapontype`] = `0 • ${update[`repeating_attacks_${id}_atkdmg`]}`;
                id = generateRowID();
                update[`repeating_atks_${id}_atkname`] = v[`attack${i}`];
                update[`repeating_atks_${id}_atkdmg`] = (parseInt(v[`attackdmg${i}`]) || 0);
                update[`repeating_atks_${id}_atkchkdesc`] = 0;
                update[`repeating_atks_${id}_atktype`] = `${(getTranslationByKey("might-abbreviation") || "-").toUpperCase()} • ${update[`repeating_atks_${id}_atkdmg`]}`;
            }
        }
        // Damage Track
        if( (values.debilitated || "0") == "on") {
            update["damage-track"] = 2;
        } else if((values.impared || "0") == "on") {
            update["damage-track"] = 1;
        }
        // Recovery
        if((values.recovery_10hr || "0") == "on") {
            update["recovery-rolls"] = 3;
        } else if((values.recovery_1hr || "0") == "on") {
            update["recovery-rolls"] = 2;
        } else if((values.recovery_10min || "0") == "on") {
            update["recovery-rolls"] = 1;
        } else if((values.recovery_1action || "0") == "on") {
            update["recovery-rolls"] = 0;
        }
        // Misc
        update.possessions = (values.equipment || "");
        update.cyphers_misc = (values.cyper || "");
        update.abilities_misc = (values.special_abilities || "");
        // End
        update.sheet_style_0 = 0;
        update.sheet_style_1 = 0;
        update.sheet_style_2 = 1;
        update.sheet_style_99 = 0;
        update.sheet_style = 2;
        update.converted_from = "The Strange by Roll20";
        setAttrs(update, {silent: true}, () => {
            doneupdating();
        });
    });
};

// === Settings
const update_chartype = function() {
    getAttrs(["sheet_style","initname","level","npcbasetn","character_name"], (values) =>  {
        console.log(`%c Cypher Systems by Roll20 - Updating CharType for "${values.character_name}"`, "color:purple;font-size:14px;");
        if((parseInt(values.sheet_style) || 2) == 99) { // NPC
            if( ((parseInt(values.level) || 1)*3) != (parseInt(values.npcbasetn) || 0) ) {
                setAttrs({"npcbasetn":((parseInt(values.level) || 1)*3)}, {silent: true});
            }
        } else { // PC
            if(values.initname != getTranslationByKey("initiative")) {
                setAttrs({"initname":getTranslationByKey("initiative")}, {silent: false}, () => {
                    update_rolls();
                });
            } else {
                update_rolls();
            }
        }
    });
};
on("change:sheet_style", (e) => {
    if('newValue' in e) {
        let update = {};
        update.sheet_style_0 = 0;
        update.sheet_style_1 = 0;
        update.sheet_style_2 = 0;
        update.sheet_style_99 = 0;
        update[`sheet_style_${e.newValue}`] = 1;
        setAttrs(update, {silent: true}, () => {
            update_chartype();
        });
    }
});
on("change:sheet_rolls change:sheetuseasset change:sheetusebonus change:sheetusecost", () => {
    update_rolls();
});
const update_rolls = function() {
    // Way of rolling: with action section or questions, with assets, bonus and costs or not
    getAttrs(["sheet_rolls","sheetuseasset","sheetusebonus","sheetusecost","character_name"], (values) => {
        console.log(`%c Cypher Systems by Roll20 - Updating Rolls for "${values.character_name}"`, "color:purple;font-size:14px;");
        let update = {};
        update.rollqstasset = 0;
        update.rollqstbonus = 0;
        update.rollqstcost = 0;
        if((values.sheet_rolls || "0") == "1") { // Use roll queries
            update.rollqstdiff = `?{${getTranslationByKey("difficulty")}|0 - ${getTranslationByKey("none-unknown")},0|1 - ${getTranslationByKey("simple")},1|2 - ${getTranslationByKey("standard")},2|3 - ${getTranslationByKey("demanding")},3|4 - ${getTranslationByKey("difficult")},4|5 - ${getTranslationByKey("challenging")},5|6 - ${getTranslationByKey("intimidating")},6|7 - ${getTranslationByKey("formidable")},7|8 - ${getTranslationByKey("heroic")},8|9 - ${getTranslationByKey("immortal")},9|10 - ${getTranslationByKey("impossible")},10}[${getTranslationByKey("difficulty")}]`;
            update.rollqstrolleff = `?{${getTranslationByKey("effort-to-roll")}|0|1|2|3|4|5|6}[${getTranslationByKey("roll-effort")}]`;
            update.rollqstrolldmg = `?{${getTranslationByKey("effort-to-damage")}|0|1|2|3|4|5|6}[${getTranslationByKey("dmg-effort")}]`;
            if((values.sheetuseasset || "0") == "1") { // Use assets
                update.rollqstasset = `?{${getTranslationByKey('asset')}|0|1|2}[${getTranslationByKey("asset")}]`;
            }
            if((values.sheetusebonus || "0") == "1") { // Use bonus
                update.rollqstbonus = `?{${getTranslationByKey('bonus')}|0|1|2|-1|-2}[${getTranslationByKey("bonus")}]`;
            }
            if((values.sheetusecost || "0") == "1") { // Use cost
                update.rollqstcost = `?{${getTranslationByKey('cost')}|0}[${getTranslationByKey("cost")}]`;
            }
        } else { // Use action section
            update.rollqstdiff = `@{rollvardiff}[${getTranslationByKey("difficulty")}]`;
            update.rollqstrolleff = `@{rollvarrolleff}[${getTranslationByKey("roll-effort")}]`;
            update.rollqstrolldmg = `@{rollvarrolldmg}[${getTranslationByKey("dmg-effort")}]`;
            update.rollqstasset = `@{rollvarasset}[${getTranslationByKey("asset")}]`;
            update.rollqstbonus = `@{rollvarbonus}[${getTranslationByKey("bonus")}]`;
            update.rollqstcost = `@{rollvarcost}[${getTranslationByKey("cost")}]`;
            // Show assets
            update.showuseasset = (values.sheetuseasset || "0");
            // Show bonus
            update.showusebonus = (values.sheetusebonus || "0");
            // Show cost
            update.showusecost = (values.sheetusecost || "0");
        }
        setAttrs(update, {silent: true});
    });
};

// Sections
on("change:expand_all", (e) => {
    let update = {}, val = (e["newValue"] || "0");
    update.expand_actiondamage = val;
    update.expand_attacks = val;
    update.expand_weapons = val;
    update.expand_advancement = val;
    update.expand_cyphers = val;
    update.expand_equipment = val;
    update.expand_artifacts = val;
    update.expand_skills = val;
    update.expand_abilities = val;
    update.expand_background = val;
    setAttrs(update, {silent: true});
});

// Damage track
on("change:might change:speed change:intellect change:specialdamage", (e) => {
    getAttrs(["might","speed","intellect","specialdamage", "character_name"], (values) =>  {
        console.log(`%c Cypher Systems by Roll20 - Updating Damage Track for "${values.character_name}"`, "color:purple;font-size:14px;");
        setAttrs({"damage-track": Math.min(3,
                                    (
                                        (((parseInt(values.might) || 0) <= 0) ? 1 : 0)
                                        + (((parseInt(values.speed) || 0) <= 0) ? 1 : 0)
                                        + (((parseInt(values.intellect) || 0) <= 0) ? 1 : 0)
                                        + (parseInt(values.specialdamage) || 0)
                                    )
                                )
                    },{silent: true}
                );
    });
});

// Actions
on("clicked:rest", () => {
    getAttrs(["might_max","speed_max","intellect_max","character_name"], (values) =>  {
        console.log(`%c Cypher Systems by Roll20 - "${values.character_name}" is resting`, "color:purple;font-size:14px;");
        let update = {};
        update["damage-track"] = 0;
        update.specialdamage = 0;
        update["recovery-rolls"] = 0;
        update.might = values.might_max;
        update.speed = values.speed_max;
        update.intellect = values.intellect_max;
        setAttrs(update, {silent: true});
    });
});
on("clicked:reset_action", () => {
    let update = {};
    update.rollvardiff = 0;
    update.rollvarrolleff = 0;
    update.rollvarrolldmg = 0;
    update.rollvarasset = 0;
    update.rollvarbonus = 0;
    update.rollvarcost = 0;
    setAttrs(update, {silent: true});
});

// Skills
on("change:repeating_skills:skillname change:repeating_skills:skillstat change:repeating_skills:skilllvl", (e) => {
    getAttrs(["repeating_skills_skillstat", "repeating_skills_skilllvl", "repeating_skills_skillname", "character_name"], (values) =>  {
        console.log(`%c Cypher Systems by Roll20 - "${values.character_name}" updates Skill "${values.repeating_skills_skillname}"`, "color:purple;font-size:14px;");
        let update = {};
        update.repeating_skills_skilledge = `@{${values.repeating_skills_skillstat}_edge}`;
        if(values.repeating_skills_skillstat == "speed") {
            update.repeating_skills_skillarmorcost = "@{armorspeedcost}";
        } else {
            update.repeating_skills_skillarmorcost = 0;
        }
        update.repeating_skills_skilltype = `${(getTranslationByKey(values.repeating_skills_skillstat + "-abbreviation") || "-").toUpperCase()} • `;
        switch ((values.repeating_skills_skilllvl || "")) {
            case '-1':
                update.repeating_skills_skilltype += (getTranslationByKey("inability-abbreviation") || "-").toUpperCase();
                break;
            case '0':
                update.repeating_skills_skilltype += (getTranslationByKey("untrained-abbreviation") || "-").toUpperCase();
                break;
            case '1':
                update.repeating_skills_skilltype += (getTranslationByKey("trained-abbreviation") || "-").toUpperCase();
                break;
            case '2':
                update.repeating_skills_skilltype += (getTranslationByKey("specialized-abbreviation") || "-").toUpperCase();
                break;
            default:
                update.repeating_skills_skilltype += (getTranslationByKey("trained-abbreviation") || "-").toUpperCase();
        }
        setAttrs(update, {silent: true});
    });
});
// Initiative
on("change:initname change:initstat change:initlvl change:sheet_roll_initiative", (e) => {
    getAttrs(["initstat", "initlvl", "character_name", "sheet_roll_initiative"], (values) =>  {
        console.log(`%c Cypher Systems by Roll20 - "${values.character_name}" updates Initiative`, "color:purple;font-size:14px;");
        let update = {};
        update.initedge = `@{${values.initstat}_edge}`;
        update.inittype = `${(getTranslationByKey(values.initstat + "-abbreviation") || "-").toUpperCase()} • `;
        if(values.initstat == "speed") {
            update.initarmorcost = "@{armorspeedcost}";
        } else {
            update.initarmorcost = 0;
        }
        switch ((values.initlvl || "")) {
            case '-1':
                update.inittype += (getTranslationByKey("inability-abbreviation") || "-").toUpperCase();
                break;
            case '0':
                update.inittype += (getTranslationByKey("untrained-abbreviation") || "-").toUpperCase();
                break;
            case '1':
                update.inittype += (getTranslationByKey("trained-abbreviation") || "-").toUpperCase();
                break;
            case '2':
                update.inittype += (getTranslationByKey("specialized-abbreviation") || "-").toUpperCase();
                break;
            default:
                update.inittype += (getTranslationByKey("untrained-abbreviation") || "-").toUpperCase();
        }
        // Roll initiative options
        if(values.sheet_roll_initiative == "1") {
            // D20 + training (to tracker)
            update.roll_initiative = "&{template:cyphsys} {{sheetstyle=@{sheet_style}}} {{fontstyle=@{sheet_font_easy}}} {{charname=@{character_name}}} {{charid=@{character_id}}} {{dmgtrack=[[@{damage-track}]]}} {{useapi=[[@{sheetuseapi}]]}} {{stat=@{initstat}}} {{statname=^{@{initstat}}}} {{d20roll=[[1d20cs>17cf1 + @{rollqstbonus}[bonus] + ((@{initlvl}[Training] + @{rollqstrolleff} + @{rollqstasset})*3) &{tracker}]]}} {{name=@{initname}}} {{type=^{skill}}} {{attredge=[[@{initedge}[Edge]]]}} {{effortroll=[[@{rollqstrolleff}]]}} {{assets=[[@{rollqstasset}]]}} {{bonustoroll=[[@{rollqstbonus}]]}} {{statexpense=[[@{rollqstcost}]]}} {{effortdmg=[[0]]}} {{totalcost=[[(ceil(@{rollqstrolleff}/6)+@{rollqstrolleff}*(2+@{initarmorcost}[Armor Cost]+ceil(@{damage-track}[Damage Track]/4)))+@{rollqstcost}-@{initedge}[Edge][Total Cost]]]}} {{effortcost=[[ceil(@{rollqstrolleff}/6)+@{rollqstrolleff}*(2+@{initarmorcost}[Armor Cost]+ceil(@{damage-track}[Damage Track]/4))[Effort Cost]]]}} {{bonusdmg=[[0]]}}";
        } else {
            // Beats Difficulty (no tracker)
            update.roll_initiative = "&{template:cyphsys} {{sheetstyle=@{sheet_style}}} {{fontstyle=@{sheet_font_easy}}} {{charname=@{character_name}}} {{charid=@{character_id}}} {{dmgtrack=[[@{damage-track}]]}} {{useapi=[[@{sheetuseapi}]]}} {{stat=@{initstat}}} {{statname=^{@{initstat}}}} {{d20roll=[[1d20cs>17cf1 + @{rollqstbonus} &{tracker}]]}} {{name=@{initname}}} {{type=^{skill}}} {{attredge=[[@{initedge}[Edge]]]}} {{difficulty=[[@{rollqstdiff}]]}} {{effortroll=[[@{rollqstrolleff}]]}} {{assets=[[@{rollqstasset}]]}} {{bonustoroll=[[@{rollqstbonus}]]}} {{statexpense=[[@{rollqstcost}]]}} {{effortdmg=[[0]]}} {{targnum=[[@{rollqstdiff}*3[Target]]]}} {{finaldiff=[[@{rollqstdiff}-(1*@{rollqstasset})-(1*@{rollqstrolleff})-(1*@{initlvl})[Final Difficulty]]]}} {{targnumroll=[[(3*@{rollqstdiff})-(3*@{rollqstasset})-(3*@{rollqstrolleff})-(3*@{initlvl})[Final Target]]]}} {{totalcost=[[(ceil(@{rollqstrolleff}/6)+@{rollqstrolleff}*(2+@{initarmorcost}[Armor Cost]+ceil(@{damage-track}[Damage Track]/4)))+@{rollqstcost}-@{initedge}[Edge][Total Cost]]]}} {{effortcost=[[ceil(@{rollqstrolleff}/6)+@{rollqstrolleff}*(2+@{initarmorcost}[Armor Cost]+ceil(@{damage-track}[Damage Track]/4))[Effort Cost]]]}} {{bonusdmg=[[0]]}} {{skilled=[[@{initlvl}]]}}";
        }
        setAttrs(update, {silent: true});
    });
});


// Special abilities
on("change:repeating_abilities:abilityname change:repeating_abilities:abilityuse", (e) => {
    getAttrs(["repeating_abilities_abilityuse", "repeating_abilities_abilityname", "character_name"], (values) =>  {
        console.log(`%c Cypher Systems by Roll20 - "${values.character_name}" updates Special Ability "${values.repeating_abilities_abilityname}"`, "color:purple;font-size:14px;");
        let update = {};
        update.repeating_abilities_abtype = (getTranslationByKey(values.repeating_abilities_abilityuse + "-abbreviation") || "-").toUpperCase();
        setAttrs(update, {silent: true});
    });
});

// Attacks
on("change:repeating_atks:atkname change:repeating_atks:atkstat change:repeating_atks:atklvl change:repeating_atks:atkmod change:repeating_atks:atkdmg", (e) => {
    getAttrs(["repeating_atks_atkstat", "repeating_atks_atkmod", "repeating_atks_atkdmg", "repeating_atks_atklvl", "repeating_atks_atkname", "sheet_rolls", "character_name"], (values) =>  {
        console.log(`%c Cypher Systems by Roll20 - "${values.character_name}" updates Attack "${values.repeating_atks_atkname}"`, "color:purple;font-size:14px;");
        let update = {};
        update.repeating_atks_atkedge = `@{${values.repeating_atks_atkstat}_edge}`;
        if(values.repeating_atks_atkstat == "speed") {
            update.repeating_atks_atkarmorcost = "@{armorspeedcost}";
        } else {
            update.repeating_atks_atkarmorcost = 0;
        }
        update.repeating_atks_atktype = `${(getTranslationByKey(values.repeating_atks_atkstat + "-abbreviation") || "-").toUpperCase()} • `;
        update.repeating_atks_atktype += (values.repeating_atks_atkdmg || "0");
        setAttrs(update, {silent: true});
    });
});

// Weapons
on("change:repeating_attacks:atkname change:repeating_attacks:atkmod change:repeating_attacks:atkdmg", (e) => {
    getAttrs(["repeating_attacks_atkmod", "repeating_attacks_atkdmg", "repeating_attacks_atkname", "character_name"], (values) =>  {
        console.log(`%c Cypher Systems by Roll20 - "${values.character_name}" updates Weapon "${values.repeating_attacks_atkname}"`, "color:purple;font-size:14px;");
        setAttrs({"repeating_attacks_weapontype": values.repeating_attacks_atkmod + " • " + values.repeating_attacks_atkdmg}, {silent: true});
    });
});

// NPC
on("change:level", (e) => {
    if('newValue' in e) {
        setAttrs({"npcbasetn":((parseInt(e.newValue) || 1)*3)}, {silent: true});
    }
});
//# sourceURL=CypherSystemByRoll20.js
