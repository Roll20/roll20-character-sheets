
/*********************************************************************/
/******                 LEVEL UP MANCER WORKERS                 ******/
/*********************************************************************/

 //Helper function to update the text in the top bar
    var recalcLpData = function(blobs) {
        var mancerdata = getCharmancerData();
        var abilities = getAbilityTotals(mancerdata, blobs);
        var update = {};
        _.each(abilityList, function(ability) {
            var selector = "attr-container .sheet-" + ability.toLowerCase() + "_total";
            update[selector] = abilities[ability.toLowerCase()] + " | " + abilities[ability.toLowerCase() + "_mod"];
        });
        update["hit_points"] = getHpTotal(mancerdata, blobs, abilities);
        setCharmancerText(update);
    };
    //Helper function to get ability totals, including asi
    var getAbilityTotals = function(mancerdata, blobs) {
        mancerdata = mancerdata || getCharmancerData();
        blobs = blobs || getAllLpBlobs(mancerdata, true);
        var abilities = mancerdata["lp-welcome"].values["previous_abilities"] ? JSON.parse(mancerdata["lp-welcome"].values["previous_abilities"]) : {};
        var lcAbilities = abilityList.map(function(x) {return x.toLowerCase()});
        //Set previous scores first
        _.each(lcAbilities, function(ability) {
            abilities[ability + "_previous"] = abilities[ability];
            abilities[ability + "_previous_mod"] = abilities[ability + "_mod"];
            abilities[ability + "_maximum"] = abilities[ability + "_maximum"] ? parseInt(abilities[ability + "_maximum"]) : 20;
        });
        _.each(blobs.all, function(blob) {
            if(blob["Ability Score Increase"]) {
                var asi = JSON.parse(blob["Ability Score Increase"]);
                _.each(asi, function(increase, ability) {
                    abilities[ability.toLowerCase()] += parseInt(increase);
                });
            }
            if(blob["Ability Score Max"]) {
                var max = JSON.parse(blob["Ability Score Max"]);
                _.each(max, function(increase, ability) {
                    abilities[ability.toLowerCase() + "_maximum"] = parseInt(increase);
                });
            }
        })
        //Now add asi if it exists
        if(mancerdata["lp-asi"]) {
            _.each(mancerdata["lp-asi"].repeating, function(repid) {
                if(repid.substr(31) == "asi-row" && mancerdata["lp-asi"].values[repid + "_switch"] != "feat") {
                    _.each(lcAbilities, function(ability) {
                        abilities[ability] += mancerdata["lp-asi"].values[repid + "_" + ability] ? parseInt(mancerdata["lp-asi"].values[repid + "_" + ability]) : 0;
                        abilities[ability + "_mod"] = Math.floor((abilities[ability] - 10)/2);
                    });
                }
            });
        }
        return abilities;
    };
    //Helper function to get hp total
    var getHpTotal = function(mancerdata, blobs, abilities) {
        mancerdata = mancerdata || getCharmancerData();
        var leveldata = getLevelingData(mancerdata);
        var abilities = abilities || getAbilityTotals(mancerdata, blobs);
        var previous = mancerdata["lp-welcome"].values["previous_attributes"] ? JSON.parse(mancerdata["lp-welcome"].values["previous_attributes"]) : {};
        var prev_repeat = JSON.parse(mancerdata["lp-welcome"].values["previous_repeating"]), hpmod = prev_repeat["hpmod"];
        var newhp = 0;
        var additionalhp = 0;
        var totalpreviouslevel = parseInt(previous["base_level"]);
        for(var x=1; x<=3; x++) {
            if(previous["multiclass" + x + "_flag"] != "0") totalpreviouslevel += parseInt(previous["multiclass" + x + "_lvl"]);
        };

        //Calculate HP Mods things like Hill Dwarf
        let levelbonus = 0;
        _.each(hpmod, (mod) => {
            const bonus  = mod["mod"];
            if (mod["levels"] === "total") {
                levelbonus += parseInt(bonus);
            };
        });

        //Add up the hp per level
        _.each(leveldata, function(level) {
            newhp += level.addhp > 0 ? level.addhp + (level.addlevel * abilities["constitution_mod"]) + (level.addlevel * levelbonus) : 0;
        });

        additionalhp = totalpreviouslevel * (abilities["constitution_mod"] - abilities["constitution_previous_mod"])
        return parseInt(previous["hp_max"]) + newhp + additionalhp;
    };

    var recalcButtons = function(mancerdata, thispage) {
        mancerdata = mancerdata || getCharmancerData();
        var buttons = "";
        var buttoninfo = {
            welcome: "charmancer-start",
            levels: "levels-u",
            choices: "features-u",
            asi: "asi-u",
            spells: "spells-u",
            summary: "review-u"
        };
        _.each(buttoninfo, function(translation, page) {
            let here = "lp-" + page == thispage;
            let disabled = false;
            if(thispage === "lp-spellchoice") disabled = true;
            if(!here && page !== "levels" && thispage === "lp-welcome") disabled = true;
            if(mancerdata["lp-levels"]) {
                if (!here && page === "asi" && mancerdata["lp-levels"].values.asi !== "true") disabled = true;
                if (!here && page === "spells" && mancerdata["lp-levels"].values.spells !== "true") disabled = true;
            } else {
                if (!here && (page === "asi" || page === "spells")) disabled = true;
            }
            buttons += "<li><button class=\"step" + (here ? " here" : "");
            if(disabled) buttons += " disabled";
            buttons += "\" type=\"" + (here ? "here" : "back") + "\" value=\"lp-" + page + "\" data-i18n=\"" + translation + "\"></button></li>";
        });
        buttons += "<li><button class=\"exit\" type=\"action\" name=\"act_cancel\" data-i18n=\"cancel-u\">CANCEL</button></li>";
        setCharmancerText({steps: buttons});
    }
    //Worker for every page to add topbar/buttons
    on("page:lp-welcome page:lp-levels page:lp-choices page:lp-asi page:lp-spells page:lp-summary page:lp-spellchoice", function(eventinfo) {
        var mancerdata = getCharmancerData();
        recalcButtons(mancerdata, eventinfo.triggerName);
        if(eventinfo.triggerName != "lp-welcome" && eventinfo.triggerName != "lp-summary") {
            addRepeatingSection("topbar-holder", "leveler-topbar");
            if(eventinfo.triggerName != "lp-choices" && eventinfo.triggerName != "lp-spells") recalcLpData();
            getProficiencies(mancerdata, eventinfo.currentStep);
        }
        getAttrs(["licensedsheet"], function(v) {
            if("licensedsheet" in v && v.licensedsheet === "1") {
                setCharmancerText({"sheet-licensedsheet-flag":"true"}); 
            }
        });
    });

    on("page:lp-welcome", function(eventinfo) {
        var getInfo = (sections, callback, results) => {
            results =  results || {};
            if(sections.length > 0) {
                var section = sections.pop();
                getSectionIDs(section, function(ids) {
                    results[section] = ids;
                    getInfo(sections, callback, results);
                });
            } else {
                callback(results);
            }
        };
        var capitalize = function(string) {
            return string.split(" ").map((x) => {
                x = x.toLowerCase();
                return x[0].toUpperCase() + x.substr(1, x.length);
            }).join(" ");
        };
        var spellSections = ["spell-cantrip"];
        var allSkills = ["athletics", "acrobatics", "sleight_of_hand", "stealth", "arcana", "history", "investigation", "nature", "religion", "animal_handling", "insight", "medicine", "perception", "survival","deception", "intimidation", "performance", "persuasion"];
        var skillget = [];
        for(var x=1; x<=9; x++) {
            spellSections.push("spell-" + x);
        }

        getInfo(spellSections, function(results) {
            var getList = [];
            _.each(results, function(sectionids, sectionname) {
                _.each(sectionids, function(spellid) {
                    getList.push("repeating_" + sectionname + "_" + spellid + "_spellname");
                    getList.push("repeating_" + sectionname + "_" + spellid + "_spellclass");
                    getList.push("repeating_" + sectionname + "_" + spellid + "_spelllevel");
                    getList.push("repeating_" + sectionname + "_" + spellid + "_spellsource");
                });
            });
            getAttrs(getList, function(attrs) {
                var spellInfo = {};
                _.each(attrs, function(data, name) {
                    var namearray = name.split("_");
                    var thisattr = namearray.pop();
                    var thisname = namearray.join("_");
                    spellInfo[thisname] = spellInfo[thisname] || {};
                    spellInfo[thisname][thisattr] = data;
                });
                setAttrs({spellinfo: JSON.stringify(spellInfo)});
            });
        });
        getAttrs(["strength", "strength_mod", "dexterity", "dexterity_mod", "constitution", "constitution_mod", "intelligence", "intelligence_mod", "wisdom", "wisdom_mod", "charisma", "charisma_mod", "strength_maximum", "dexterity_maximum", "constitution_maximum", "intelligence_maximum", "wisdom_maximum", "charisma_maximum"], function(attrs) {
            _.each(attrs, function(x, y) {
                attrs[y] = parseInt(x);
            });
            setAttrs({previous_abilities: JSON.stringify(attrs)});
        });
        getAttrs(["class", "subclass", "base_level", "multiclass1_flag", "multiclass2_flag", "multiclass3_flag", "multiclass1", "multiclass1_lvl", "multiclass1_subclass", "multiclass2", "multiclass2_lvl", "multiclass2_subclass", "multiclass3", "multiclass3_lvl", "multiclass3_subclass", "hp_max", "class_resource_name", "other_resource_name", "speed", "race", "subrace", "background", "custom_class", "cust_classname", "cust_hitdietype"], function(v) {
            let set = {};
            set["previous_attributes"] = JSON.stringify(v);
            set["lp-race"] = "Races:" + v.race;
            set["lp-subrace"] = "Subraces:" + v.subrace;
            set["lp-background"] = "Backgrounds:" + v.background.split("(")[0].trim();
            setAttrs(set);
        });
        _.each(allSkills, function(skill) {
            skillget.push(skill + "_prof");
            skillget.push(skill + "_type");
        });
        getAttrs(skillget, function(v) {
            var proficiencies = {"Weapon": [], "Armor": [], "Skill": [], "Tool": [], "Language": [], "Expertise": []};
            _.each(allSkills, function(skill) {
                if(v[skill + "_prof"] !== "0") {
                    proficiencies.Skill.push(capitalize(skill.replace(/_/g, " ")));
                }
                if(v[skill + "_type"] !== "1" && v[skill + "_prof"] !== "0") {
                    proficiencies.Expertise.push(capitalize(skill.replace(/_/g, " ")));
                }
            });
            getSectionIDs("tool", function(ids) {
                var getList = [];
                _.each(ids, function(id) {
                    getList.push("repeating_tool_" + id + "_toolname");
                    getList.push("repeating_tool_" + id + "_toolbonus_base");
                });
                getAttrs(getList, function(v) {
                    _.each(ids, function(id) {
                        proficiencies.Tool.push(v["repeating_tool_" + id + "_toolname"]);
                        if(v["repeating_tool_" + id + "_toolbonus_base"] == "(@{pb}*2)") {
                            proficiencies.Expertise.push(v["repeating_tool_" + id + "_toolname"]);
                        };
                    });
                    getSectionIDs("proficiencies", function(ids) {
                        var getList = [];
                        _.each(ids, function(id) {
                            getList.push("repeating_proficiencies_" + id + "_name");
                            getList.push("repeating_proficiencies_" + id + "_prof_type");
                        });
                        getAttrs(getList, function(v) {
                            _.each(ids, function(id) {
                                proficiencies[capitalize(v["repeating_proficiencies_" + id + "_prof_type"])].push(v["repeating_proficiencies_" + id + "_name"]);
                            });
                            setAttrs({previous_proficiencies: JSON.stringify(proficiencies)});
                        });
                    });
                });
            });
        });
        get_repeating_data(function(repeating) {
            console.log("REPEATING");
            console.log(repeating);
            setAttrs({previous_repeating: JSON.stringify(repeating)});
        });
    });

    on("mancerchange:lp-race mancerchange:lp-subrace mancerchange:lp-background", function(eventinfo) {
        getCompendiumPage(eventinfo.newValue, function(results) {});
    });

    on("page:lp-levels", function(eventinfo) {
        const mancerdata = getCharmancerData();
        const previous   = mancerdata["lp-welcome"].values["previous_attributes"] ? JSON.parse(mancerdata["lp-welcome"].values["previous_attributes"]) : {};
        let levelclass   = ["class1"];
        let set          = {};
        let update       = {};
        let baseclass    = previous["class"];
        let classcompend = ["Classes:"] + previous["class"];
        let custom_lock  = 0;

        if(previous["custom_class"] && previous["custom_class"] == 1) {
            baseclass = previous["cust_classname"];
            classcompend = "Rules:Classes";
            custom_lock = 1;
            set["class1_addlevel"] = 0;
        };

        set["lockcustomclass"] = custom_lock;
        set["class1"] = 'Classes:' + baseclass;
        set["class1_currentlevel"] = previous["base_level"];
        update["class1_selector"] = '<span class="sheet-compendium-class-name">' + baseclass + '</span>';
        if (previous["subclass"] && previous["custom_class"] === "0") {
            update[`subclass1_selector`] = `<div>` + previous["subclass"] + `</div>`;
            if((mancerdata["lp-levels"] && mancerdata["lp-levels"].values["class1_subclass"] !== "Subclasses" + previous["subclass"])
                || !mancerdata["lp-levels"]) set["class1_subclass"] = "Subclasses:" + previous["subclass"];
        };
        const multiclass = parseInt(previous["multiclass1_flag"]) + parseInt(previous["multiclass2_flag"]) + parseInt(previous["multiclass3_flag"]);
        set["multiclass"] = mancerdata["lp-levels"] && mancerdata["lp-levels"].values["multiclass"] ? mancerdata["lp-levels"].values["multiclass"] : multiclass;
        set["multiclass_initial"] = multiclass;

        for (x = 1; x <= 3; x++) {
            const x1 = x + 1;
            if(previous[`multiclass${x}_flag`] === "1") {
                set[`class${x1}`] = "Classes:" + previous[`multiclass${x}`];
                set[`class${x1}_currentlevel`] = previous[`multiclass${x}_lvl`];
                update[`class${x1}_selector`] = `<span class="sheet-compendium-class-name">${previous[`multiclass${x}`]}</span>`;
                if (previous[`multiclass${x}_subclass`]) {
                    set[`class${x1}_subclass`] = "Subclasses:" + previous[`multiclass${x}_subclass`];
                    update[`subclass${x1}_selector`] = `<div>` + previous[`multiclass${x}_subclass`] + `</div>`;
                };
                levelclass.push(`class${x1}`);
            } else {
                set[`class${x1}_currentlevel`] = 0;
            };

            //This is handling classes that have been multiclassed into while in the leveler
            if (mancerdata["lp-levels"] && mancerdata["lp-levels"].values[`class${x1}`] && parseInt(mancerdata["lp-levels"].values[`class${x1}_addlevel`]) > 0 && !levelclass.includes(`class${x1}`)) {
                levelclass.push(`class${x1}`);
            };
        };

        setAttrs(set, () => { update_hp(true, levelclass) });
        setCharmancerText(update);

        changeCompendiumPage("sheet-levels-info", classcompend);
    });

    on("mancerchange:class1 mancerchange:class2 mancerchange:class3 mancerchange:class4", function(eventinfo) {
        if(eventinfo.sourceType !== "worker") deleteCharmancerData(["lp-choices", "lp-asi", "lp-spells", "lp-summary"]);
        const mancerdata= getCharmancerData();
        const leveldata = mancerdata["lp-levels"];
        const levelclass= eventinfo.sourceAttribute;
        const previous = mancerdata["lp-welcome"].values["previous_attributes"] ? JSON.parse(mancerdata["lp-welcome"].values["previous_attributes"]) : {};

        getCompendiumPage(eventinfo.newValue, function(p) {
            p = removeDuplicatedPageData(p);
            const data          = p.data;
            const class_name    = eventinfo.newValue && eventinfo.newValue.split(":").length > 1 && eventinfo.newValue.split(":")[0] === "Classes" ? eventinfo.newValue.split(":")[1] : false;
            const subclass_name = data["Subclass Name"];
            let set             = {};
            let update          = {};

            if (levelclass === "class1" && (!previous["custom_class"] || previous["custom_class"] == 0)) {
                set[`${levelclass}_addlevel`] = leveldata.values[`${levelclass}_addlevel`] ? leveldata.values[`${levelclass}_addlevel`] : 1;
            } else {
                set[`${levelclass}_addlevel`] = leveldata.values[`${levelclass}_addlevel`] ? leveldata.values[`${levelclass}_addlevel`] : 0;
            };

            set[`${levelclass}_hitdie`] = data["Hit Die"];
            update[`sub${levelclass}_name`] = `<h4>${subclass_name}</h4>`;

            //Need to add a check here if a previous subclass value exists, skip this part if so.
            if(class_name) {
                var subOptions = {show_source: true};
                let reset = {};
                reset[levelclass + "_subclass"] = "<option value=\"\" data-i18n=\"choose\">Choose</option>";
                //setCharmancerText(reset)

                (eventinfo.sourceType != "player") ? subOptions.silent = true : subOptions.selected = "";

                setCharmancerOptions(levelclass + "_subclass","Category:Subclasses data-Parent:" + class_name, subOptions, function(values) {
                });
            };

            const presets = [leveldata.values.class1, leveldata.values.class2, leveldata.values.class3, leveldata.values.class4];
            for (x = 2; x <= 4; x++) {
                disableCharmancerOptions(`class${x}`, presets);
            };

            setCharmancerText(update);
            setAttrs(set, function() {
                let set = {};
                set[eventinfo.sourceAttribute] = eventinfo.newValue;
                setAttrs(set, {silent: true});
            });
        });
    });

     //Trigger a change event when subclass changes
    ["class1", "class2", "class3", "class4"].forEach(levelclass => {
        on(`mancerchange:${levelclass}_subclass`, (eventinfo) => {
            const mancerdata    = getCharmancerData();
            const leveldata     = mancerdata["lp-levels"].values;
            const repeating     = mancerdata["lp-levels"].repeating || [];
            let set             = {};

            if(eventinfo.sourceType !== "worker") deleteCharmancerData(["lp-choices", "lp-asi", "lp-spells", "lp-summary"]);
            getCompendiumPage(eventinfo.newValue, function(data) {
                data = removeDuplicatedPageData(data);
                updateClassLevel(undefined, eventinfo.sourceAttribute.slice(0, 6));
            });

            //This will update the results inputs with new hp values if the subclass is Draconic
            if (eventinfo.sourceType !== "worker") {
                const newValue      = (eventinfo.newValue) ? eventinfo.newValue : " ";
                const previousValue = (eventinfo.previousValue) ? eventinfo.previousValue : " ";
                let repids          = [], updateArray = [];
                _.each(repeating, (repid) => {
                    if (repid.includes(`_${levelclass}-`)) { updateArray.push(repid); };
                });
                _.each(updateArray, (repid) => {
                    if (newValue.includes("Draconic Bloodline") || previousValue.includes("Draconic Bloodline")) { repids.push(repid); };
                });

                if (repids.length > 0) {
                    updateButtons(levelclass, repids);
                    updateResults(levelclass, repids, eventinfo);
                };
            };

            setAttrs(set);
        });
    });

    on("mancerchange:class1_addlevel mancerchange:class2_addlevel mancerchange:class3_addlevel mancerchange:class4_addlevel", function(eventinfo) {
        if(eventinfo.sourceType !== "worker") deleteCharmancerData(["lp-choices", "lp-asi", "lp-spells", "lp-summary"]);
        const mancerdata    = getCharmancerData();
        const leveldata     = mancerdata["lp-levels"];
        const levelclass = eventinfo.sourceAttribute.slice(0, 6);
        const classlevel    = (parseInt(eventinfo.newValue) || 0) + (parseInt(leveldata.values[`${levelclass}_currentlevel`]) || 0);
        const subclasslevel = (leveldata.data[`${levelclass}`] && leveldata.data[`${levelclass}`]["data-Subclass Level"]) ? parseInt(leveldata.data[`${levelclass}`]["data-Subclass Level"]) : 3;
        let set             = {};
        let update          = {};
        if(eventinfo.currentStep === "lp-levels") updateClassLevel(mancerdata, levelclass);

        set[`${levelclass}_classlevel`] = classlevel;
        if (classlevel >= subclasslevel)  {
            update[`sub${levelclass}_warning`] = ``;
            showChoices([`sub${levelclass}`]);
        } else {
            update[`sub${levelclass}_warning`] = `<p>Subclass chosen at level ${subclasslevel}. Your total level is ${classlevel}.</p>`;
            hideChoices([`sub${levelclass}`]);
        };

        const level = (leveldata.values[`${levelclass}_currentlevel`] === undefined) ? 0 : leveldata.values[`${levelclass}_currentlevel`];
        update[`${levelclass}_update`] = `level ${level} + `;
        update[`${levelclass}_tot`]    = `= level ${classlevel}`;

        setCharmancerText(update);
        setAttrs(set);
    });

    const updateClassLevel = function(mancerdata, levelclass) {
        mancerdata     = mancerdata || getCharmancerData();
        const leveling = getLevelingData(mancerdata);
        const blobs    = getAllLpBlobs(mancerdata, true);
        const spells   = getNewSpells(mancerdata, leveling, blobs);
        let set        = {};
        let update     = {};
        let asi        = false;

        for(let x = 0; x <= 4; x++) {
            update["class" + x + "_features"] = "";
            update["subclass" + x + "_features"] = "";
        }

        _.each(leveling, function(thislevel) {
            _.each(["", "sub"], function(prefix) {
                let thiskey = "class" + thislevel.classnumber;
                let final = [];
                if(prefix === "sub") thiskey += "_subclass";
                _.each(blobs.names[thiskey], function(blobname) {
                    if(blobname.substr(0,30) == "Ability Score Increase - Level") {
                        asi = true;
                        final.push("Ability Score Increase");
                    } else if ((thislevel[prefix + "class"].blobs[blobname].Title || thislevel[prefix + "class"].blobs[blobname].Description || thislevel[prefix + "class"].blobs[blobname].Traits) && !thislevel[prefix + "class"].blobs[blobname].Group) {
                        final.push(thislevel[prefix + "class"].blobs[blobname].Title || blobname);
                    }
                });
                update[prefix + "class" + thislevel.classnumber + "_features"] = _.uniq(final).join(", ");
            });
        });

        set.asi = asi.toString();
        set.spells = spells.toString();

        setCharmancerText(update);
        setAttrs(set, () => {
            update_hp(false, [`${levelclass}`]);
            recalcButtons(undefined, "lp-levels");
        });
    };

    //Build a function to update the level & class each time they change
    on("mancerchange:class1_classlevel mancerchange:class2_classlevel mancerchange:class3_classlevel mancerchange:class4_classlevel", function(eventinfo) {
        const mancerdata     = getCharmancerData();
        const leveldata      = mancerdata["lp-levels"];
        const class1levels   = parseInt(leveldata.values["class1_classlevel"]) || 0, class2levels = parseInt(leveldata.values["class2_classlevel"]) || 0, class3levels = parseInt(leveldata.values["class3_classlevel"]) || 0, class4levels = parseInt(leveldata.values["class4_classlevel"]) || 0;
        const characterlevel = class1levels + class2levels + class3levels + class4levels;
        let update = {};
        let set    = {};
        let end    = [];

        for (x = 1; x <= 4; x++) {
            let name    = (leveldata.values[`class${x}`]) ? leveldata.values[`class${x}`].slice(8) : "";
            let lvl     = parseInt(leveldata.values[`class${x}_classlevel`]) || 0;
            (lvl > 0 && x === 1) ? end.push(`${name} ${lvl}`) : (lvl > 0 && x > 1) ? end.push(` ${name} ${lvl}`) : false;
        };

        update["levels_message"] = `<p>Character will be level ${characterlevel} (${end})</p>`;
        set[`characterlevel`]    = characterlevel;

        setAttrs(set);
        setCharmancerText(update);
    });

    const recalcHpByLevel = (section) => {
        const mancerdata = getCharmancerData();
        const leveldata = mancerdata["lp-levels"].values;
        const repeating = mancerdata["lp-levels"].repeating || [];
        let set = {};
        const sections = section ? [section] : ["class1", "class2", "class3", "class4"];

        _.each(sections, (levelclass) => {
            let thishp = 0;
            let first = true;
            let rollflag = "";
            _.each(repeating, function(repid) {
                if(repid.split("_")[2].split("-")[0] == levelclass && leveldata[`${repid}_result`]) {
                    let thisflag = leveldata[`${repid}_rollflag`] || "average";
                    thishp += parseInt(leveldata[`${repid}_result`]);
                    if(first) {
                        rollflag = thisflag;
                        first = false;
                    }
                    if(rollflag !== thisflag) rollflag = "none";
                }
            });
            set[`${levelclass}_hp_flag`] = rollflag;
            set[`${levelclass}_addhp`] = thishp;
        });
        setAttrs(set, () => {recalcLpData()});
    };

    const update_hp = (firstTime, levelclass) => {
        const mancerdata = getCharmancerData();
        const leveldata  = mancerdata["lp-levels"].values;
        const repeating  = mancerdata["lp-levels"].repeating || [];

        const updateByLevel = (firstTime, levelclass) => {
            _.each(levelclass, (levelclass) => {
                const current = leveldata[`${levelclass}_currentlevel`] ? parseInt(leveldata[`${levelclass}_currentlevel`]) : 0,
                      addlevel = leveldata[`${levelclass}_addlevel`] ? parseInt(leveldata[`${levelclass}_addlevel`]) : 0;
                let levelarray = [], addarray = [], removearray = [], existing = [];

                for(let x = current+1; x<=current+addlevel; x++) {
                    levelarray.push(`${levelclass}-${x}`);
                }
                addarray = levelarray;
                if(!firstTime) {
                    _.each(repeating, function(id) {
                        addarray = _.without(addarray, id.split("_")[2]);
                    });
                }
                _.each(repeating, function(id) {
                    if(id.split("_")[2].split("-")[0] == levelclass && !levelarray.includes(id.split("_")[2]) && !existing.includes(id.split("_")[2])) {
                        removearray.push(id);
                        existing.push(id.split("_")[2]);
                    };
                });

                if(addarray.length > 0) {
                    const last = addarray[addarray.length - 2];
                    let set = {}, update = {}, rowid = "", repids = [];
                    _.each(repeating, (repid) => {
                        if(repid.split("_")[2] == `${levelclass}hprow`) rowid = repid;
                    });
                    _.each(addarray, (repname) => {
                        addRepeatingSection(rowid, "hpbylevel", repname, function(repid) {
                            repids.push(repid);
                            if (repid.includes(last) || addarray.length == 1) {
                                updateResults(levelclass, repids);
                                updateButtons(levelclass, repids);
                            };
                            update[`${repid} label`] = `Level ${_.last(repname.split("-"))}`;
                            if(repname == _.last(addarray)) {
                                setCharmancerText(update);
                                setAttrs(set, () => {
                                    clearRepeatingSectionById(removearray, () => {
                                        recalcHpByLevel(levelclass);
                                    });
                                });
                            }
                        });
                    });
                } else {
                    clearRepeatingSectionById(removearray, () => {
                        recalcHpByLevel(levelclass);
                    });
                };
            });
        };

        if(firstTime) {
            addRepeatingSection("class1_by-levels", "row", "class1hprow", function() {
                addRepeatingSection("class2_by-levels", "row", "class2hprow", function() {
                    addRepeatingSection("class3_by-levels", "row", "class3hprow", function() {
                        addRepeatingSection("class4_by-levels", "row", "class4hprow", function() {
                            updateByLevel(true, levelclass);
                        });
                    });
                });
            });
        } else {
            updateByLevel(false, levelclass);
        };
    };

    const updateButtons = (levelclass, repids) => {
        getAttrs(["licensedsheet"], function(v) {
            const mancerdata    = getCharmancerData();
            const leveldata     = mancerdata["lp-levels"].values;
            const addlevel      = leveldata[`${levelclass}_addlevel`] ? parseInt(leveldata[`${levelclass}_addlevel`]) : 0;
            const hitdie        = leveldata[`${levelclass}_hitdie`];
            let average         = getDieAvg(hitdie), set = {}, bonus = hpBonus(levelclass), hpbonus = bonus[0], bonusSource = bonus[1];
            const templateBonus = (hpbonus > 0) ? `+${hpbonus}[${bonusSource}]` : "";
            const licensedsheet      = (v.licensedsheet && v.licensedsheet === "1") ? "licensedsheet" : "";

                _.each(repids, (repid) => {
                set[`roll_${repid}_rollhp`]    = `@{wtype}&{template:mancerhproll} {{title=Roll for HP Level ${_.last(repid.split(`${levelclass}-`))}}} {{r1=[[1${hitdie}${templateBonus}]]}}  {{licensedsheet=${licensedsheet}}}`;
                set[`roll_${repid}_averagehp`] = `@{wtype}&{template:mancerhproll} {{title=Average for HP Level ${_.last(repid.split(`${levelclass}-`))}}} {{a1=[[${average}${templateBonus}]]}}  {{licensedsheet=${licensedsheet}}}`;

                if (addlevel && hitdie) {
                    let dice = [];
                    //Set the roll buttons
                    for (x = 1; x <= addlevel; x++) { dice.push(`{{r${x}=[[1${hitdie}${templateBonus}]]}}`); };
                    set[`roll_${levelclass}_rollhp`] = `@{wtype}&{template:mancerhproll} {{title=Roll for HP}} ` + dice.join()

                    //Set the average hp button
                    set[`roll_${levelclass}_averagehp`] = `@{wtype}&{template:mancerhproll} {{title=Average for HP}}{{a1=[[${average}${templateBonus}]]}} {{licensedsheet=${licensedsheet}}}`
                };
            });

            setAttrs(set);
        });
    };

    const hpBonus = (levelclass) => {
        const mancerdata = getCharmancerData();
        const leveldata  = mancerdata["lp-levels"].values;

        //HP Bonus from subclass hp mods like Draconic Bloodline for Sorcerers
        const prev_repeat = JSON.parse(mancerdata["lp-welcome"].values["previous_repeating"]), hpmod = prev_repeat["hpmod"], subclass = leveldata[`${levelclass}_subclass`];;
        let hpbonus = 0, bonusSource = [];
        _.each(hpmod, (mod) => {
            if (mod["levels"] === "base" && subclass && subclass.includes(mod["source"])) {
                bonusSource.push(mod["source"]);
                hpbonus += parseInt(mod["mod"]);
            };
        });

        //Multiclassing into Sorcerer Draconic needs to update buttons
        if (subclass && subclass.includes("Draconic Bloodline") && !bonusSource.includes("Draconic Bloodline")) {
            bonusSource.push("Draconic Bloodline");
            hpbonus += parseInt(1);
        };

        return [hpbonus, bonusSource];
    };

    const updateResults = (levelclass, repids, eventinfo) => {
        const mancerdata = getCharmancerData();
        const leveldata  = mancerdata["lp-levels"].values;
        const hitdie     = leveldata[`${levelclass}_hitdie`];
        let average      = getDieAvg(hitdie), bonus = hpBonus(levelclass), hpbonus = bonus[0], set = {};

        _.each(repids, (repid) => {
            console.log(repid);
           if (!leveldata[`${repid}_result`]) {
                set[`${repid}_result`] = parseInt(average) + parseInt(hpbonus);
            } else if (eventinfo && (eventinfo.newValue).includes("Draconic Bloodline")) {
                set[`${repid}_result`] = parseInt(leveldata[`${repid}_result`]) + parseInt(hpbonus);
            } else if (eventinfo && (eventinfo.previousValue).includes("Draconic Bloodline")) {
                set[`${repid}_result`] = parseInt(leveldata[`${repid}_result`]) - 1;
            } else {
                false
            };
        });

        setAttrs(set);
    };

    const getDieAvg = (hitdie) => {
        if(!hitdie) return 0;
        const size = hitdie.slice(1);
        let num = [], sum = 0;

        //Push an array of numbers
        for(x = 1; x <= size; x++) { num.push(x); };

        //Add up the nummbers above
        for(i = 0; i < num.length; i++) { sum += num[i]; };

        return Math.ceil(sum / num.length);
    };

    //Roll & Average buttons inside the repeating hp section for each level
    ["class1", "class2", "class3", "class4"].forEach(levelclass => {
        on(`mancerroll:repeating_${levelclass}hprow`, (eventinfo) => {
            const source = eventinfo.sourceAttribute, flag = source.includes("rollhp") ? "roll" : "average";
            let set = {};

            set[`${eventinfo.sourceSection}_result`]   = eventinfo.roll[0].result;
            set[`${eventinfo.sourceSection}_rollflag`] = flag;
            setAttrs(set, () => {recalcHpByLevel()})
        });
    });

    //Roll & Average top level buttons for each class
    ["class1", "class2", "class3", "class4"].forEach(levelclass => {
        on(`mancerroll:${levelclass}_rollhp mancerroll:${levelclass}_averagehp`, (eventinfo) => {
            const mancerdata = getCharmancerData();
            const leveldata = mancerdata["lp-levels"].values;
            const repeating = mancerdata["lp-levels"].repeating || [];
            const source = eventinfo.sourceAttribute, flag = source.includes("rollhp") ? "roll" : "average";
            let set = {}, sum = 0, rows = "", num = 0;

            repeating.forEach(row => {
                if (row.includes(`${levelclass}-`) && source.includes("rollhp")) {
                    set[row + "_result"] = eventinfo.roll[`${num}`].result;
                    set[row + "_rollflag"] = flag;
                    num += 1;
                } else if (row.includes(`${levelclass}-`) && source.includes("average")) {
                    set[row + "_result"] = eventinfo.roll[0].result;
                    set[row + "_rollflag"] = flag;
                } else {
                    false
                };
            });

            //Add up the results for rollhp or multiply the average option by added levels
            if (source.includes("rollhp")) {
                _.each(eventinfo.roll, function(roll) {
                    sum += parseInt(roll.result);
                 });
            } else {
                sum = parseInt(eventinfo.roll[0].result) * leveldata[`${levelclass}_addlevel`];
            };

            // Set addhp to the total
            set[`${levelclass}_addhp`] = sum;

            //Set hp_flag to be roll or average so the CSS will highlight the appropriate button
            set[`${levelclass}_hp_flag`] = flag;

            setAttrs(set, function() { recalcLpData(); });
        });
    });

    on("clicked:multiclass_add clicked:multiclass_remove", function(eventinfo) {
        const mancerdata = getCharmancerData();
        const leveldata  = mancerdata["lp-levels"];
        const levelclass = "class" + (parseInt(leveldata.values["multiclass"]) + 1);
        const repeating = mancerdata["lp-levels"].repeating || [];
        let set          = {};
        let update       = {};

        if (eventinfo.sourceAttribute === "multiclass_add") {
            (leveldata.values["multiclass"] < 3) ? set["multiclass"] = parseInt(leveldata.values["multiclass"]) + 1 : false;
            update["add_multiclass"] = `<button type="action" name="act_multiclass_add" disabled>+</button>`;
            //set[`${levelclass}_addlevel`] = 1;
        } else {
            if (leveldata.values["multiclass"] > leveldata.values["multiclass_initial"]) {
                const multiclass = parseInt(leveldata.values["multiclass"]);
                let rows = "";

                set["multiclass"] = multiclass - 1;
                update["add_multiclass"] = `<button type="action" name="act_multiclass_add">+</button>`;

                repeating.forEach(row => {
                    if (row.includes(`${levelclass}-`)) {
                       set[row + "_result"] = "";
                    };
                });

                set[`${levelclass}_addhp`] = 0;
                set[`${levelclass}_hp_flag`] = "";
            } else {
                false
            };
        };

        setAttrs(set, function() { recalcLpData(); });
        setCharmancerText(update);
    });

    on("mancerchange:class1_addhp mancerchange:class2_addhp mancerchange:class3_addhp mancerchange:class4_addhp", function(eventinfo) {
        if (eventinfo.sourceType === "player") {
            const mancerdata = getCharmancerData(), levelclass = eventinfo.sourceAttribute.slice(0, 6);
            const repeating = mancerdata["lp-levels"].repeating || [];
            let set          = {};

            repeating.forEach(row => {
                if (row.includes(`${levelclass}-`)) {
                   set[row + "_result"] = "";
                };
            });

            set[`${levelclass}_hp_flag`] = "";

            setAttrs(set);
        };
    });

    on("mancerchange:multiclass", function () {
        const mancerdata = getCharmancerData();
        const leveldata = mancerdata["lp-levels"];
        const tot  = isNaN(parseInt(leveldata.values["multiclass"])) ? 1 : parseInt(leveldata.values["multiclass"]) + 1;
        let update = {};
        let presets = [];

        for(var x=1; x<=tot-1; x++) {
            if(leveldata.values["class" + x]) presets.push(_.last(leveldata.values["class" + x].split(":")))
        }
        setCharmancerOptions("class" + tot, "Category:Classes", {disable: presets, category: "Classes"});
        update["multiclass_message"] = `<h3>Multiclass (${tot}/4)</h3>`;
        setCharmancerText(update);
    });

    on("clicked:class1 clicked:class2 clicked:class3 clicked:class4 clicked:class1_subclass clicked:class2_subclass clicked:class3_subclass clicked:class4_subclass", function(eventinfo) {
        const mancerdata = getCharmancerData();
        const source     = eventinfo.sourceAttribute;
        const page       = mancerdata["lp-levels"].values[`${source}`];

        changeCompendiumPage("sheet-levels-info", page);
        getCompendiumPage(page, function(p) {
        });
    });

    var getLevelingData = function(mancerdata) {
        mancerdata = mancerdata || getCharmancerData();
        var leveling = [];
        if(!mancerdata["lp-levels"]) return leveling;
        var multiclass = mancerdata["lp-levels"].values.multiclass ? parseInt(mancerdata["lp-levels"].values.multiclass) : 0;
        for(var x=1; x<=multiclass + 1; x++) {
            if(mancerdata["lp-levels"].data["class" + x] && mancerdata["lp-levels"].values["class" + x + "_addlevel"] && mancerdata["lp-levels"].values["class" + x + "_addlevel"] != "0") {
                var thisclass = {};
                var maxspell = 0;
                thisclass.class = mancerdata["lp-levels"].data["class" + x];
                thisclass.subclass = mancerdata["lp-levels"].data["class" + x + "_subclass"] || {};
                thisclass.classname = _.last(mancerdata["lp-levels"].values["class" + x].split(":"));
                thisclass.subclassname = mancerdata["lp-levels"].values["class" + x + "_subclass"] ? _.last(mancerdata["lp-levels"].values["class" + x + "_subclass"].split(":")) : "";
                thisclass.currentlevel = mancerdata["lp-levels"].values["class" + x + "_currentlevel"] ? parseInt(mancerdata["lp-levels"].values["class" + x + "_currentlevel"]) : 0;
                thisclass.addlevel = parseInt(mancerdata["lp-levels"].values["class" + x + "_addlevel"]);
                thisclass.addhp = mancerdata["lp-levels"].values["class" + x + "_addhp"] ? parseInt(mancerdata["lp-levels"].values["class" + x + "_addhp"]) : 0;
                thisclass.classnumber = x;
                if(thisclass.subclass["Spellcasting Ability"]) {
                    thisclass.spellcasting = thisclass.subclass["Spellcasting Ability"];
                } else if(thisclass.class["Spellcasting Ability"]) {
                    thisclass.spellcasting = thisclass.class["Spellcasting Ability"];
                }
                _.each(thisclass.class.blobs, function(blob) {
                    if(blob["Spell Slots"] && parseInt(blob.Level) <= (thisclass.currentlevel + thisclass.addlevel)) {
                        _.each(JSON.parse(blob["Spell Slots"]), function(slots, name) {
                            if(parseInt(_.last(name.split(" "))) > maxspell) maxspell = parseInt(_.last(name.split(" ")));
                        });
                    }
                });
                thisclass.maxspell = maxspell;
                leveling.push(thisclass);
            }
        }
        return leveling;
    };

    var getLpRaceData = function(mancerdata, leveldata) {
        mancerdata = mancerdata || getCharmancerData();
        leveldata = leveldata || getLevelingData(mancerdata);
        let results = {};
        let currentlevel = 0;
        let addlevel = 0;
        _.each(leveldata, function(level) {
            addlevel += level.addlevel;
            currentlevel += level.currentlevel;
        });
        currentlevel = currentlevel === 0 ? 1 : currentlevel;
        _.each(["race", "background"], function(section) {
            results[section] = {addlevel: addlevel, currentlevel: currentlevel};
            results[section][section] = mancerdata["lp-welcome"].data["lp-" + section] || {};
            results[section]["sub" + section] = mancerdata["lp-welcome"].data["lp-sub" + section] || {};
            results[section].type = section;
            results[section].name = _.last(mancerdata["lp-welcome"].values["lp-" + section].split(":")) || "";
            results[section].name += mancerdata["lp-welcome"].values["lp-sub" + section] ? " - " + _.last(mancerdata["lp-welcome"].values["lp-sub" + section].split(":")) : "";
        });
        return results;
    };

    var getLpBlobs = function(data, include_asi, verbose) {
        const type = data.type || "class";
        var asi = type == "class" ? data[type]["data-Ability Score Levels"] : [];
        var allblobs = {};
        allblobs[type] = {};
        allblobs["sub" + type] = {};
        _.times(data.addlevel, function(x) {
            var thislevel = data.currentlevel + x + 1;
            allblobs[type] = _.extend(allblobs[type], filterBlobs(data[type].blobs, {"Level": "" + thislevel, multiclass: true}));
            allblobs["sub" + type] = _.extend(allblobs["sub" + type], filterBlobs(data["sub" + type].blobs, {"Level": "" + thislevel, multiclass: true}));
            if(asi.includes("" + thislevel) && include_asi) {
                allblobs[type]["Ability Score Increase - Level " + thislevel] = {Level: thislevel, parentSection: type};
                data[type].blobs["Ability Score Increase - Level " + thislevel] = {
                    Level: thislevel,
                    Title: ("Ability Score Increase - Level " + thislevel)
                };
            }
        });
        allblobs[type] = _.extend(allblobs[type], filterBlobs(data[type].blobs, {"Level": "every", multiclass: true}));
        allblobs["sub" + type] = _.extend(allblobs["sub" + type], filterBlobs(data["sub" + type].blobs, {"Level": "every", multiclass: true}));
        var remove = {};
        remove[type] = [];
        remove["sub" + type] = [];
        //Figure out which blobs are just the same feature at a different level, add them to a list to remove (unless we're useing the verbose option)
        if(!verbose) {
            _.each(allblobs, function(blobs, section) {
                _.each(blobs, function(blob, name) {
                    var basename = name.split("(")[0];
                    blob.Level = parseInt(blob.Level);
                    if(basename.trim().toLowerCase() == "spell slots") {
                        remove[section].push(name);
                    } else if(basename.trim().toLowerCase() != "proficiencies") {
                        _.each(allblobs, function(otherblobs, othersection) {
                            _.each(otherblobs, function(otherblob, othername) {
                                if(name != othername && basename == othername.split("(")[0]) {
                                    if(blob.Level > parseInt(otherblob.Level)) {
                                        remove[section].push(othername);
                                    } else {
                                        remove[section].push(name);
                                    }
                                }
                            })
                        });
                    }
                });
            });
        }
        //remove any blobs that are the same feature
        _.each(remove, function(removeArray, section) {
            _.each(_.uniq(removeArray), function(thisblob) {
                delete allblobs[section][thisblob];
            });
        });
        //here we build the final list of blobs that will be added
        var filteredblobs = {};
        filteredblobs[type] = [];
        filteredblobs["sub" + type] = [];
        _.each(allblobs, function(blobs, section) {
            _.each(blobs, function(blob, name) {
                var thisblob = {
                    Level: blob.Level,
                    name: name
                };
                filteredblobs[section].push(thisblob);
            });
        });
        _.each(filteredblobs, function(bloblist) {
            bloblist = _.sortBy(bloblist, "Level");
        })
        filteredblobs.allblobs = _.extend(data[type].blobs, data["sub" + type].blobs);
        return filteredblobs;
    };

    var getAllLpBlobs = function(mancerdata, include_asi) {
        const pickBlobs = function(theseblobs, allblobs, key, section) {
            blobs.names[key] = _.pluck(theseblobs, "name") || [];
            if(mancerdata["lp-choices"]) {
                _.each(mancerdata["lp-choices"].values, function(value, id) {
                    if((value + "").split(":")[0] == "Blob" && id.split("_")[2].split("--")[0] == section) {
                        blobs.names[key].push(value.split(":")[1]);
                    };
                });
            };
            _.each(blobs.names[key], function(blobname){
                _.each(filterBlobs(allblobs, {"name": blobname, multiclass: true}), function(blob, blobname) {
                    blobs.all.push(blob);
                    blobs.sorted[key] = blobs.sorted[key] ? blobs.sorted[key] : [];
                    blobs.sorted[key].push(blob);
                });
            });
        };
        mancerdata = mancerdata || getCharmancerData();
        const leveldata = getLevelingData(mancerdata);
        const racedata = getLpRaceData(mancerdata, leveldata);
        var blobs = {all: [], sorted: {}, names: {}};
        _.each(leveldata, function(level) {
            var name = "class" + level.classnumber;
            var theseblobs = getLpBlobs(level, include_asi, true);
            pickBlobs(theseblobs.class, level.class.blobs, name, "class-" + level.classnumber);
            if(level.subclass) {
                pickBlobs(theseblobs.subclass, level.subclass.blobs, name + "_subclass", "subclass-" + level.classnumber);
            };
        });
        _.each(racedata, function(level) {
            var name = level.type;
            var theseblobs = getLpBlobs(level, include_asi, true);
            pickBlobs(theseblobs[name], level[name].blobs, name, name);
            if(level["sub" + name]) {
                pickBlobs(theseblobs["sub" + name], level["sub" + name].blobs, "sub" + name, "sub" + name);
            };
        });
        return blobs;
    };

    on("page:lp-choices", function(eventinfo) {
        const resortBlobs = function(blobs, section) {
            _.each(blobs[section], function(x) { x.parentSection = section });
            _.each(blobs["sub" + section], function(x) { x.parentSection = "sub" + section});
            let filteredblobs = _.sortBy(blobs[section].concat(blobs["sub" + section]), "Level");
            let resorted = [];
            _.each(filteredblobs, function(blob) {
                if(blob.name.split(" ")[0] == "Proficiencies") {
                    resorted.unshift(blob);
                } else {
                    resorted.push(blob);
                }
            });
            return resorted;
        }
        const mancerdata = getCharmancerData();
        const leveling = getLevelingData(mancerdata);
        const racedata = getLpRaceData(mancerdata, leveling);
        _.each(racedata, function(data, section) {
            const blobs = getLpBlobs(data, true);
            const relevant = resortBlobs(blobs, section);
            if(relevant.length > 0) {
                addRepeatingSection("choices", "row", function(thisrow) {
                    let update = {};
                    update[thisrow] = "<h2>" + removeExpansionInfo(data.name) + "<span>";
                    update[thisrow] += data.addlevel > 1 ? " Levels " + (data.currentlevel + 1) + " - " + (data.currentlevel + data.addlevel) : " Level " + (data.currentlevel + 1);
                    update[thisrow] += "</span></h2>";
                    setCharmancerText(update);
                    _.each(relevant, function(blob, y) {
                        handleBlobs(blobs.allblobs, {
                            filters: {multiclass: true},
                            slide: "lp-choices",
                            section: blob.parentSection + "--" + blob.Level,
                            element: thisrow,
                            thisblob: blob.name,
                            maxlevel: data.currentlevel + data.addlevel,
                            parent: section
                        });
                        if(y === (relevant.length -1)) {
                            recalcLpData();
                        }
                    });
                });
            };
        });
        _.each(leveling, function(data) {
            var x = data.classnumber;
            var blobs = getLpBlobs(data, true);
            addRepeatingSection("choices", "row", function(classrow) {
                var classname = data.subclassname ? removeExpansionInfo(data.subclassname) + " " + removeExpansionInfo(data.classname) : removeExpansionInfo(data.classname);
                var update = {};
                update[classrow] = "<h2>" + classname + "<span>";
                update[classrow] += data.addlevel > 1 ? " Levels " + (data.currentlevel + 1) + " - " + (data.currentlevel + data.addlevel) : " Level " + (data.currentlevel + 1);
                update[classrow] += "</span></h2>";
                setCharmancerText(update);
                resorted = resortBlobs(blobs, "class");
                _.each(resorted, function(blob, y) {
                    handleBlobs(blobs.allblobs, {
                        filters: {multiclass: true},
                        slide: "lp-choices",
                        section: blob.parentSection + "-" + x + "--" + blob.Level,
                        element: classrow,
                        thisblob: blob.name,
                        maxlevel: data.currentlevel + data.addlevel,
                        parent: "class" + data.classnumber + (blob.parentSection === "class" ? "" : "_subclass")
                    });
                    if(y === (resorted.length -1)) {
                        recalcLpData();
                    }
                });
            });
        });
        if(leveling[0] && leveling[0].classname) {
            changeCompendiumPage("sheet-class-info", "Classes:" + leveling[0].classname);
        }
    });

    on("page:lp-asi", function(eventinfo) {
        var mancerdata = getCharmancerData();
        var leveling = getLevelingData(mancerdata);
        var asis = [];
        var update = {};
        var multiclass = mancerdata["lp-levels"].values.multiclass ? parseInt(mancerdata["lp-levels"].values.multiclass) : 0;
        for(var x=1; x<=multiclass + 1; x++) {
            if(mancerdata["lp-levels"].data["class" + x]) {
                var thisclass = {};
                thisclass.class = mancerdata["lp-levels"].data["class" + x];
                thisclass.classname = _.last(mancerdata["lp-levels"].values["class" + x].split(":"));
                thisclass.currentlevel = parseInt(mancerdata["lp-levels"].values["class" + x + "_currentlevel"]);
                thisclass.addlevel = parseInt(mancerdata["lp-levels"].values["class" + x + "_addlevel"]);
                leveling["class" + x] = thisclass;
            }
        }
        _.each(leveling, function(data) {
            var asi = data.class["data-Ability Score Levels"];
            _.times(data.addlevel, function(x) {
                var thislevel = data.currentlevel + x + 1;
                if(asi.includes("" + thislevel)) {
                    asis.push(data.classname + " Level " + thislevel);
                }
            });
        });
        _.each(asis, function(asi) {
            addRepeatingSection("choices", "asi-row", function(rowid) {
                update[rowid + " .sheet-title"] = "Ability Score Increase: " + removeExpansionInfo(asi);
                setCharmancerOptions(rowid + "_feat", "Category:Feats");
                updateAbilityLock(rowid);
                if(asi == _.last(asis)) {
                    setCharmancerText(update);
                }
            })
        })
    });

    var getKnownLpSpells = function(mancerdata) {
        mancerdata = mancerdata || getCharmancerData();
        var leveldata = getLevelingData(mancerdata);
        var previousspells = mancerdata["lp-welcome"].values["spellinfo"] ? JSON.parse(mancerdata["lp-welcome"].values["spellinfo"]) : {};
        var spelldata = {};
        var totallevel = 0;
        var prevtotallevel = 0;
        _.each(previousspells, function(spell) {
            spelldata[spell.spellname] = {level: spell.spelllevel};
            if(spell.spellclass) spelldata[spell.spellname].spellclass = spell.spellclass;
            if(spell.spellclass && spell.spellclass.toLowerCase() == "racial") spelldata[spell.spellname].known = "Racial";
            if(spell.spellsource) spelldata[spell.spellname].known = spell.spellsource;
        });
        _.each(leveldata, function(level) {
            totallevel += level.currentlevel + level.addlevel;
            prevtotallevel += level.currentlevel;
        });
        //Gather known spells
        _.each(mancerdata, function(page, pagename) {
            if(pagename.split("-")[0] == "lp") {
                let choices = [];
                let choicepage = ["lp-welcome", "lp-levels"].includes(pagename) ? (mancerdata["lp-choices"] ? mancerdata["lp-choices"].values : []) : page.values;
                _.each(choicepage, function(val) {
                    if((val + "").split(":")[0] === "Blob") choices.push(val.split(":")[1]);
                });
                _.each(page.data, function(data, dataname) {
                    var thislevel = 0;
                    var prevlevel = 0;
                    var thisclass = {};
                    if(dataname.substring(0,5) == "class") {
                        thisclass = _.findWhere(leveldata, {classnumber: parseInt(dataname[5])});
                        thislevel = thisclass ? thisclass.currentlevel + thisclass.addlevel : 0;
                        prevlevel = 0;
                    } else {
                        thislevel = totallevel;
                        prevlevel = prevtotallevel;
                    }
                    _.each(data.blobs, function(blob, blobname) {
                        if(blob.Multiclass != "no" && ((parseInt(blob.Level) <= thislevel || blob.Level == "all") && !blob.Group) || choices.includes(blobname)) {
                            if(blob.Spells) {
                                var blobspells = JSON.parse(blob.Spells);
                                _.each(blobspells, function(blobspell) {
                                    if(blobspell.Known) {
                                        _.each(blobspell.Known, function(spell) {
                                            spelldata[spell] = spelldata[spell] || {level: blobspell.Level};
                                            spelldata[spell].known = blobspell.Source || data.Category.substring(0, data.Category.length - 2);
                                            spelldata[spell].spellclass = thisclass.classname;
                                            if(dataname.substring(0,5) != "class") {
                                                spelldata[spell].known = data.Category.substring(0, data.Category.length - 1);
                                                spelldata[spell].spellclass = data.Category == "Races" ? "Racial" : data.Category.substring(0, data.Category.length - 1);
                                            }
                                            if(blobspell.Ability) {
                                                spelldata[spell].ability = blobspell.Ability;
                                            } else if(thisclass.class && thisclass.class["Spellcasting Ability"]) {
                                                spelldata[spell].ability = thisclass.class["Spellcasting Ability"];
                                            } else if (thisclass.subclass && thisclass.subclass["Spellcasting Ability"]) {
                                                spelldata[spell].ability = thisclass.subclass["Spellcasting Ability"];
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                });
                //Gater spells from class features
                _.each(page.values, function(value, name) {
                    if(name.substr(-18) === "_utilityrow_spells") {
                        console.log("UTILITYROW SPELLS!");
                        console.log(JSON.parse(value));
                        spelldata = _.extend(spelldata, JSON.parse(value));
                    }
                });
            }
        });
        /**/
        return spelldata;
    };

    var getNewSpells = function(mancerdata, leveldata, blobs) {
        mancerdata = mancerdata || getCharmancerData();
        leveldata = leveldata || getCharmancerData();
        blobs = blobs || getAllLpBlobs(mancerdata, false);
        var result = false;
        _.each(leveldata, function(level) {
            var prevlevel = level.currentlevel;
            var thislevel = level.addlevel + prevlevel;
            var thisclass = {class: level.classname, number: level.classnumber, newlevel: thislevel, additional: []};
            var prevknown = 0;
            var currentknown = 0;
            var prevcantrips = 0;
            var currentcantrips = 0;
            var spelladd = 0;
            thisclass.newspells = 0;
            _.each(["class", "subclass"], function(section) {
                if(level[section]) {
                    _.each(level[section].blobs, function(blob) {
                        if(blob.Level == thislevel) {
                            if(blob["Spells Known"]) {
                                currentknown = parseInt(blob["Spells Known"]);
                                if(level.class["data-Spell Replace"]) result = true;
                            }
                            if(blob.Cantrips) {
                                thisclass.cantrips = true;
                                currentcantrips = parseInt(blob.Cantrips);
                            }
                            if(blob["Spells Prepared"]) {
                                result = true;
                            }
                        }
                        if(blob.Level == prevlevel || (prevlevel === 0 && blob.Level == 1)) {
                            if(blob["Spells Known"]) {
                                prevknown = prevlevel === 0 ? 0 : parseInt(blob["Spells Known"]);
                                if(prevlevel === 0) thisclass.newspells = parseInt(blob["Spells Known"]);
                            }
                            if(blob.Cantrips) {
                                thisclass.cantrips = true;
                                prevcantrips = prevlevel === 0 ? 0 : parseInt(blob.Cantrips);
                            }
                        }
                        if(level[section]["data-Spell Add"]) {
                            spelladd = parseInt(level[section]["data-Spell Add"]);
                        }
                    });
                }
            });
            if(spelladd) {
                thisclass.newspells += prevlevel === 0 ? spelladd * (thislevel - prevlevel -1) : spelladd * (thislevel - prevlevel);
            } else {
                thisclass.newspells = currentknown - prevknown;
            }
            thisclass.newcantrips = currentcantrips - prevcantrips;
            _.each(["", "_subclass"], function(section) {
                if(blobs.sorted[`class${level.classnumber}${section}`]) {
                    _.each(blobs.sorted[`class${level.classnumber}${section}`], function(blob) {
                        if(blob.Spells) {
                            let spells = JSON.parse(blob.Spells);
                            _.each(spells, function(spell) {
                                if(spell.Choose) {
                                    result = true;
                                }
                            });
                        }
                    });
                }
            });
            if(thisclass.newcantrips || thisclass.newspells) result = true;
        });
        return result;
    };

    on("page:lp-spells", function(eventinfo) {
        var mancerdata = getCharmancerData();
        var queries = [];
        var blobs = getAllLpBlobs(mancerdata, false);
        var leveldata = getLevelingData(mancerdata);
        var classes = [];
        var knowncantrips = 0;
        var knownspells = 0;
        var newcantrips = 0;
        var newspells = 0;
        var replace = 0;
        var totallevel = 0;
        var spellmaxlevel = 0;
        var prepared = true;
        var prevspells = mancerdata["lp-welcome"].values["spellinfo"] ? JSON.parse(mancerdata["lp-welcome"].values["spellinfo"]) : {};
        var spelldata = getKnownLpSpells(mancerdata);
        var abilities = getAbilityTotals(mancerdata, blobs);
        _.each(spelldata, function(spell, spellname) {
            if(spell.level == "cantrip") {
                knowncantrips++;
            } else {
                knownspells++;
            }
        });
        recalcLpData(blobs);
        //Gather spell data about each class
        _.each(leveldata, function(level) {
            var prevlevel = level.currentlevel;
            var thislevel = level.addlevel + prevlevel;
            var thisclass = {class: level.classname, number: level.classnumber, newlevel: thislevel, additional: []};
            var toSwap = level.class["data-Spell Replace"] ? parseInt(level.class["data-Spell Replace"]) : 0;
            var prevknown = 0;
            var currentknown = 0;
            var prevcantrips = 0;
            var currentcantrips = 0;
            var spelladd = 0;
            thisclass.list = [thisclass.class];
            totallevel += thislevel;
            thisclass.newspells = 0;
            _.each(["class", "subclass"], function(section) {
                if(level[section]) {
                    if(level[section]["data-Spell List"]) thisclass.list = [level[section]["data-Spell List"]];
                    if(level[section]["Spellcasting Ability"]) thisclass.ability = level[section]["Spellcasting Ability"];
                    _.each(level[section].blobs, function(blob) {
                        if(blob.Level == thislevel) {
                            if(blob["Spell Slots"]) {
                                var slots = JSON.parse(blob["Spell Slots"]);
                                thisclass.maxlevel = JSON.parse(_.last(_.last(_.keys(slots).sort()).split(" ")));
                                spellmaxlevel = Math.max(thisclass.maxlevel, spellmaxlevel);
                            }
                            if(blob["Spells Known"]) {
                                currentknown = parseInt(blob["Spells Known"]);
                            }
                            if(blob.Cantrips) {
                                thisclass.cantrips = true;
                                currentcantrips = parseInt(blob.Cantrips);
                            }
                            if(blob["Spells Prepared"]) {
                                var splitted = blob["Spells Prepared"].split("+").map((x) => {return x.trim()});
                                thisclass.prepared = 0;
                                _.each(splitted, function(term, x) {
                                    if(isNaN(parseInt(term))) {
                                        thisclass.prepared += abilities[term.toLowerCase() + "_mod"] ? abilities[term.toLowerCase() + "_mod"] : 0;
                                    } else {
                                        thisclass.prepared += parseInt(term);
                                    }
                                });
                                thisclass.prepared = Math.max(thisclass.prepared, 1);
                            }
                        }
                        if(blob.Level == prevlevel || (prevlevel === 0 && blob.Level == 1)) {
                            if(blob["Spells Known"]) {
                                prevknown = prevlevel === 0 ? 0 : parseInt(blob["Spells Known"]);
                                if(prevlevel === 0) thisclass.newspells = parseInt(blob["Spells Known"]);
                            }
                            if(blob.Cantrips) {
                                thisclass.cantrips = true;
                                prevcantrips = prevlevel === 0 ? 0 : parseInt(blob.Cantrips);
                                if(knowncantrips < prevcantrips) prevcantrips = knowncantrips;
                            }
                        }
                        if(blob.Level == "every" || blob.Level == thislevel) {
                            if(blob["Additional Spell List"]) thisclass.list.push(blob["Additional Spell List"]);
                        }
                        if(level[section]["data-Spell Add"]) {
                            spelladd = parseInt(level[section]["data-Spell Add"]);
                        }
                    });
                }
            });
            if(spelladd) {
                thisclass.newspells += prevlevel === 0 ? spelladd * (thislevel - prevlevel -1) : spelladd * (thislevel - prevlevel);
            } else {
                thisclass.newspells = currentknown - prevknown;
            }
            if(thisclass.prepared) thisclass.newspells = thisclass.prepared;
            thisclass.newcantrips = currentcantrips - prevcantrips;
            thisclass.replace = toSwap * (thislevel - prevlevel);
            _.each(["", "_subclass"], function(section) {
                if(blobs.sorted[`class${level.classnumber}${section}`]) {
                    _.each(blobs.sorted[`class${level.classnumber}${section}`], function(blob) {
                        if(blob.Spells) {
                            let spells = JSON.parse(blob.Spells);
                            _.each(spells, function(spell) {
                                if(spell.Choose && spell.Level === "0") {
                                    thisclass.newcantrips += parseInt(spell.Choose);
                                }
                            });
                        }
                    });
                }
            });
            if(thisclass.newcantrips || thisclass.newspells) classes.push(thisclass);
        });
        if(classes.length > 0) {
            var existinglist = _.pluck(prevspells, "spellname");
            var knownlist = _.keys(spelldata);
            //Look through all the data to see if there's any expanded lists
            _.each(mancerdata, function(page, pagename) {
                if(pagename.split("-")[0] == "lp") {
                    _.each(page.data, function(data, dataname) {
                        var thislevel = 0;
                        if(dataname.substring(0,5) == "class") {
                            var thisclass = _.findWhere(leveldata, {classnumber: parseInt(dataname[5])});
                            thislevel = thisclass ? thisclass.currentlevel + thisclass.addlevel : 0;
                        } else {
                            thislevel = totallevel;
                        }
                        _.each(data.blobs, function(blob, blobname) {
                            if((parseInt(blob.Level) <= thislevel || blob.Level == "every") && blob.Multiclass != "no") {
                                if(blob.Spells) {
                                    var blobspells = JSON.parse(blob.Spells);
                                    _.each(blobspells, function(thisspell) {
                                        if(parseInt(thisspell.Level) <= spellmaxlevel) {
                                            if(thisspell["Expanded List"]) {
                                                knownlist = knownlist.concat(thisspell["Expanded List"]);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    })
                }
            });
            if(knownlist) {
                queries.push("Category:Spells Name:" + knownlist.join("|"));
            }
            _.each(classes, function(thisclass) {
                if(thisclass.maxlevel || thisclass.newcantrips) {
                    newcantrips += thisclass.newcantrips || 0;
                    newspells += thisclass.newspells;
                    replace += thisclass.replace;
                    if(!thisclass.prepared) prepared = false;
                    thisquery = "Category:Spells Classes:*" + _.uniq(thisclass.list).join("|*") + " Level:";
                    if(thisclass.cantrips) thisquery += "0|"
                    for(var x = 1; x <= thisclass.maxlevel; x++) {
                        thisquery += x;
                        if(x != thisclass.maxlevel) thisquery += "|";
                    }
                    _.each(thisclass.additional, function(lvl) {
                        thisquery += "|" + lvl;
                    });
                    queries.push(thisquery);
                }
            });
            var toSet = {};
            toSet.knowncantrips = knowncantrips;
            toSet.knownspells = knownspells;
            toSet.newcantrips = newcantrips;
            toSet.newspells = newspells;
            toSet.replace = replace;
            setAttrs(toSet);
            var update = {};
            update["spells-summary"] = "";
            if(newcantrips != 0 || knowncantrips != 0) update["spells-summary"] = "<div class=\"level_0\"><div class=\"title\">Cantrips: </div><div class=\"list\"></div></div>";
            _.times(spellmaxlevel, function(x) {
                update["spells-summary"] += "<div class=\"level_" + (x + 1) + "\"><div class=\"title\">Level " + (x + 1) + ": </div><div class=\"list\"></div></div>";
            });
            if(classes.length > 1) {
                update["cantripinfo"] = "";
                _.each(classes, function(thisclass) {
                    if(thisclass.newspells) {
                        update["cantripinfo"] += "<p>You can add " + thisclass.newcantrips + " " + thisclass.class + " cantrips.</p>";
                    }
                });
            }
            setCharmancerText(update);
            getCompendiumQuery(queries, (data) => {
                data = removeDuplicatedPageData(data);
                let byLevel = {};
                _.each(data, (spell) => {
                    let classes = [];
                    if (spell.data.Classes) {
                        classes = spell.data.Classes;
                    //Ravinca introduced Spells without Classes
                    } else {
                      ["class1", "class2", "class3", "class4"].forEach(levelclass => {
                            //Get the class name out of values & confirm its a spellcaster using data Spellcasting Ability
                            const name = (mancerdata["lp-levels"].values[`${levelclass}`]) ? mancerdata["lp-levels"].values[`${levelclass}`].split("Classes:")[1] : false;
                            const ability =
                                //Check if the class has a Spellcasting Ability attribute
                                (mancerdata["lp-levels"].data[`${levelclass}`] && mancerdata["lp-levels"].data[`${levelclass}`]["Spellcasting Ability"]) ? true :
                                //Check if the subclass has a Spellcasting Ability attribute
                                (mancerdata["lp-levels"].data[`${levelclass}_subclass`] && mancerdata["lp-levels"].data[`${levelclass}_subclass`]["Spellcasting Ability"]) ? true :
                                //Set to false if the class is not a spellcaster
                                false;
                            if (name && ability) {
                                //Spell casters have thier class name pushed to the array above
                                classes.push(name);
                            };
                        });

                       if (classes.length > 0) {
                            classes = classes.join(', ');
                       };
                    };

                    /* This will set the information for populating the spell list */
                    if (classes.length > 0) {
                        byLevel[spell.data.Level] = byLevel[spell.data.Level] || [];
                        byLevel[spell.data.Level].push({
                            name: spell.name,
                            classes: classes.split(",").map(x => x.trim()),
                            level: parseInt(spell.data.Level)
                        });
                    };
                });
                addSpellSections(byLevel, {
                    newspells: newspells,
                    newcantrips: newcantrips,
                    replace: replace,
                    prepared: prepared,
                    classes: classes,
                    spelldata: spelldata,
                    existinglist: existinglist
                });
            });
        }
    });

    const addSpellSections = function(byLevel, settings) {
        settings = settings || {};
        let newspells = settings.newspells || 0;
        let newcantrips = settings.newcantrips || 0;
        let replace = settings.replace || 0;
        let prepared = settings.prepared || false;
        let classes = settings.classes || [];
        let spelldata = settings.spelldata || [];
        let existinglist = settings.existinglist || [];
        let spellnumber = 0;
        //D&D 5e Lvl+ Mancer: Spells tab "Level undefined" (UC605)
        //When invoking Lvl+ from an incomplete manually levelled character, an undefined lv is generated due to missing information.
        //This code prevents an incomplete list from being displayed.
        //By Miguel
        if('undefined' in byLevel) {
         delete byLevel.undefined;
        }
        _.each(byLevel, function(level) {
            spellnumber += level.length;
        });
        byLevel["0"] = byLevel["0"] || [];
        addRepeatingSection("choices", "row", "spellsrow", function(spellsrow) {
            let toSet = {};
            let update = {};
            _.each(byLevel, function(spells, x) {
                addRepeatingSection(spellsrow, "spell-holder", "spell-holder-" + x, function(levelrow) {
                    if(x == "0") {
                        if(newspells > 0) {
                            if(classes.length > 1) {
                                update[levelrow + " .sheet-spellstext .sheet-summary"] = "";
                                _.each(classes, function(thisclass) {
                                    if(thisclass.newspells) {
                                        update[levelrow + " .sheet-spellstext .sheet-summary"] += "<p>You can add " + thisclass.newspells + " " + thisclass.class + " spells.</p>";
                                    }
                                });
                            } else {
                                update[levelrow + " .sheet-spellstext .sheet-summary"] = "<p>You can add " + newspells + " new spells.</p>";
                            }
                        }
                        if(replace > 0) {
                            if(classes.length > 1) {
                                update[levelrow + " .sheet-replacetext .sheet-summary"] = "";
                                _.each(classes, function(thisclass) {
                                    if(thisclass.replace) {
                                        update[levelrow + " .sheet-replacetext .sheet-summary"] += "<p>You can replace " + thisclass.replace + " " + thisclass.class + " spells.</p>";
                                    }
                                });
                            } else {
                                update[levelrow + " .sheet-replacetext .sheet-summary"] = "<p>You can replace " + replace + " spells.</p>";
                            }
                            showChoices([levelrow + " .sheet-replace-info"]);
                        }
                    } else {
                        update[levelrow + " .sheet-spellinfo"] = "";
                    }
                    update[levelrow + " label .sheet-title"] = x == "0" ? "Cantrips" : "Level " + x;
                    update[levelrow + " label .sheet-title"] += "<span class=\"choice\">r</span>"
                    if(x == "0" && newcantrips == 0) {
                        toSet[levelrow + "_show"] = "1";
                        update[levelrow + " .sheet-controller"] = "1";
                    }
                    if(spells.length === 0) hideChoices([levelrow + " label"]);
                    spells = _.sortBy(spells, "name");
                    setCharmancerText(update);
                    _.each(spells, function(spell) {
                        addRepeatingSection(levelrow + " .sheet-container", "spell-item", function(spellid) {
                            var update = {};
                            toSet[spellid + "_name"] = spell.name;
                            toSet[spellid + "_level"] = x;
                            update[spellid + " .sheet-name"] = spell.name;
                            update[spellid + " .sheet-classes"] = "";
                            if(x == "0" && newcantrips == 0) update[spellid + " .sheet-hardlock"] = "locked";
                            var spellclasses = [];
                            _.each(classes, function(thisclass, y) {
                                if(spell.classes.includes(thisclass.list) && spell.level <= thisclass.maxlevel) {
                                    spellclasses.push({class: thisclass.class, ability: thisclass.ability});
                                    if(classes.length > 1) {
                                        update[spellid + " .sheet-classes"] += "<span class=\"class" + y + "\">" + thisclass.class + "</span>";
                                    }
                                }
                            });
                            if(spellclasses.length == 1 || classes.length == 1) {
                                toSet[spellid + "_class"] = spellclasses[0] ? spellclasses[0].class : classes[0].class;
                                toSet[spellid + "_ability"] = spellclasses[0] ? spellclasses[0].ability : classes[0].ability;
                            }
                            _.each(spelldata, function(thisspell, spellname) {
                                if(spellname == spell.name) {
                                    toSet[spellid + "_checked"] = "1";
                                    if(!prepared || x == "0") {
                                        toSet[spellid + "_existing"] = "1";
                                        if(x == "0" || replace == 0) update[spellid + " .sheet-hardlock"] = "locked";
                                    }
                                    if(thisspell.known) {
                                        toSet[spellid + "_checked"] = "1";
                                        toSet[spellid + "_existing"] = "1";
                                        toSet[spellid + "_source"] = thisspell.known;
                                        update[spellid + " .sheet-classes"] = "<span class=\"known\">" + thisspell.known + " Spell</span>";
                                        update[spellid + " .sheet-hardlock"] = "locked";
                                    }
                                    if(thisspell.spellclass) toSet[spellid + "_class"] = thisspell.spellclass;
                                    if(thisspell.ability) toSet[spellid + "_ability"] = thisspell.ability;
                                }
                            });
                            if(settings.selected && settings.selected.includes(spell.name)) {
                                toSet[spellid + "_checked"] = "1";
                            }
                            if(settings.locked && settings.locked.includes(spell.name)) {
                                toSet[spellid + "_checked"] = "1";
                                toSet[spellid + "_existing"] = "1";
                                update[spellid + " .sheet-hardlock"] = "locked";
                            }
                            spellnumber--;
                            setCharmancerText(update);
                            if(spellnumber <= 0) {
                                setAttrs(toSet, {silent: true}, function() {
                                    updateSpellSummary("all", undefined, settings.page);
                                });
                            }
                        });
                    });
                });
            });
        });
    };

    const updateSpellSummary = function(sourcelevel, data, thispage) {
        var mancerdata = data || getCharmancerData();
        var spellpage = thispage ? mancerdata[thispage] : mancerdata["lp-spells"];
        var replist = spellpage.repeating || [];
        var cantripsection = replist.find((x) => {return x.includes("_spell-holder-0")});
        var update = {};
        var sections = [];
        var perlevel = {};
        var allowed = 0;
        var allowedreplace = 0;
        //first, list spells you already know
        _.each(replist, function(repid) {
            if(spellpage.values[repid + "_existing"]) {
                var selector = "spells-summary .sheet-level_" + spellpage.values[repid + "_level"] + " .sheet-list";
                update[selector] = update[selector] || "";
                update[selector] += spellpage.values[repid + "_checked"] ? "<span>" : "<span class=\"removed\">";
                update[selector] += spellpage.values[repid + "_name"] + "</span>";
            }
        });
        //then, list new spells you've checked
        _.each(replist, function(repid) {
            if(spellpage.values[repid + "_checked"] && !spellpage.values[repid + "_existing"]) {
                var selector = "spells-summary .sheet-level_" + spellpage.values[repid + "_level"] + " .sheet-list";
                update[selector] = update[selector] || "";
                update[selector] += "<span class=\"new\">" + spellpage.values[repid + "_name"] + "</span>";
            }
        });
        if(sourcelevel == "0") {
            sections.push(cantripsection);
            allowed = spellpage.values.newcantrips || 0;
        } else {
            update[cantripsection + " .sheet-spellstext .sheet-levels"] = "";
            for(var x=1; x <= 9; x++) {
                var thissection = replist.find((y) => {return y.includes("_spell-holder-" + x)});
                allowed = spellpage.values.newspells;
                allowedreplace = spellpage.values.replace;
                if(thissection) {
                    perlevel[x + ""] = {number: 0, section: thissection, replaced: false};
                    sections.push(thissection);
                }
            }
        }
        getRepeatingSections(replist.find((x) => {return x.includes("spellsrow")}), function(repeating) {
            var toSet = {};
            var spellids = [];
            var newspells = 0;
            var replaced = 0;
            _.each(repeating.tree, function(spells, levelrow) {
                if(sections.includes(levelrow)) {
                    spellids = spellids.concat(_.keys(spells));
                }
            });
            _.each(spellids, function(id) {
                if(spellpage.values[id + "_checked"] && !spellpage.values[id + "_existing"]) {
                    newspells++;
                    if(perlevel[spellpage.values[id + "_level"]]) perlevel[spellpage.values[id + "_level"]].number++;
                }
                if(!spellpage.values[id + "_checked"] && spellpage.values[id + "_existing"]) {
                    replaced++;
                    if(perlevel[spellpage.values[id + "_level"]]) perlevel[spellpage.values[id + "_level"]].replaced = true;
                }
            });
            //now lock/unlock spells depending on if we've selected as many as we're allowed
            _.each(spellids, function(id) {
                if(!spellpage.values[id + "_checked"]) {
                    update[id + " .sheet-lock"] = newspells >= (allowed + replaced) ? "locked" : "";
                } else if(spellpage.values[id + "_checked"] && spellpage.values[id + "_existing"]) {
                    update[id + " .sheet-lock"] = allowedreplace <= replaced ? "locked" : "";
                }
            });
            if(sourcelevel == "0") {
                var known = (thispage != "lp-spellchoice" && spellpage.values.knowncantrips) ? spellpage.values.knowncantrips : 0;
                update[cantripsection + " label .sheet-number"] = (known + newspells) + " / " + (known + allowed);
            } else {
                if(thispage != "lp-spellchoice") {
                    update[cantripsection + " .sheet-spellstext .sheet-total"] = newspells + " / " + (allowed + replaced) + " spells chosen.";
                    if(replaced > 0) {
                        update[cantripsection + " .sheet-spellstext .sheet-total"] += "<br>(" + allowed + " new, " + replaced + " replaced)";
                    }
                    if(allowedreplace > 0) {
                        update[cantripsection + " .sheet-replacetext .sheet-total"] = replaced + " / " + allowedreplace + " spells replaced.";
                    }
                }
                _.each(perlevel, function(info, level) {
                    if(thispage != "lp-spellchoice") update[cantripsection + " .sheet-spellstext .sheet-levels"] += "<p>" + info.number + " Level " + level + " spells added.</p>";
                    update[info.section + " label .sheet-number"] = "";
                    if(info.number > 0) update[info.section + " label .sheet-number"] = "+" + info.number;
                    if(info.replaced) {
                        showChoices([info.section + " .sheet-spellheader .sheet-title span"]);
                    } else {
                        hideChoices([info.section + " .sheet-spellheader .sheet-title span"]);
                    }
                });
            }
            setCharmancerText(update);
            if(sourcelevel == "all") updateSpellSummary("0", mancerdata, thispage);
            setCharmancerText({pagelock: "unlock"})
        });
    };

    on("clicked:repeating_spell-item", function(eventinfo) {
        if(eventinfo.sourceAttribute.indexOf("spell-item_info") === -1) return;
        var mancerdata = getCharmancerData();
        changeCompendiumPage("sheet-spells-info", "Spells:" + mancerdata[eventinfo.currentStep].values[eventinfo.sourceSection + "_name"], "card_only");
    });

    on("mancerchange:repeating_spellsrow", function(eventinfo) {
        var mancerdata = getCharmancerData();
        if(eventinfo.sourceAttribute && _.last(eventinfo.sourceAttribute.split("_")) == "show") {
            var update = {};
            update[eventinfo.sourceSection + " .sheet-controller"] = eventinfo.newValue || "";
            setCharmancerText(update);
        } else {
            updateSpellSummary(mancerdata[eventinfo.currentStep].values[eventinfo.sourceSection + "_level"], mancerdata, eventinfo.currentStep);
        }
    });

    on("mancerchange:repeating_asi-row", function(eventinfo) {
        var trigger = eventinfo.sourceAttribute.substr(39);
        if(trigger == "switch") {
            var update = {};
            update[eventinfo.sourceSection + " .sheet-switch"] = eventinfo.newValue == "feat" ? "feat" : "";
            setCharmancerText(update);
        } else if(trigger == "feat") {

        } else {
            updateAbilityLock(eventinfo.sourceSection);
            //This will lock other ASI when leveling up multiple levels at once
            //By Miguel
            var repeatingData = getCharmancerData()['lp-asi'].repeating || [];
            for(data in repeatingData) {
              if(repeatingData[data].indexOf('_asi-row') > -1) {
                updateAbilityLock(repeatingData[data]);
              }
            }
        }
        recalcLpData();
    });

    on("clicked:repeating_asi-row", function(eventinfo) {
        var mancerdata = getCharmancerData();
        var thischange = eventinfo.sourceAttribute.substr(0, eventinfo.sourceAttribute.length - 2);
        var currentvalue = mancerdata["lp-asi"].values[thischange] ? parseInt(mancerdata["lp-asi"].values[thischange]) : 0;
        var totalincrease = 0;
        var update = {};
        var lockinfo = {};
        _.each(abilityList, function(ability) {
            var thisincrease = mancerdata["lp-asi"].values[eventinfo.sourceSection + "_" + ability.toLowerCase()] || 0;
            totalincrease += parseInt(thisincrease);
        });
        if(_.last(eventinfo.sourceAttribute) == "u" && totalincrease < 2 && currentvalue < 2) {
            update[thischange] = currentvalue + 1;
            mancerdata["lp-asi"].values[thischange] = currentvalue + 1;
        } else if(_.last(eventinfo.sourceAttribute) == "d" && currentvalue > 0) {
            update[thischange] = currentvalue - 1;
            mancerdata["lp-asi"].values[thischange] = currentvalue - 1;
        }
        setAttrs(update, function() {
            recalcLpData();
        });
    });

    var updateAbilityLock = function(sourceSection, mancerdata) {
        mancerdata = mancerdata || getCharmancerData();
        var abilities = getAbilityTotals(mancerdata);
        var totalincrease = 0;
        var update = {};
        //First, get the total increase for this section
        _.each(abilityList, function(ability) {
            var thisincrease = mancerdata["lp-asi"].values[sourceSection + "_" + ability.toLowerCase()] || 0;
            totalincrease += parseInt(thisincrease);
        });
        //Then, figure out what to lock (based on increase)
        _.each(abilityList, function(ability) {
            var thisincrease = mancerdata["lp-asi"].values[sourceSection + "_" + ability.toLowerCase()] || 0;
            update[sourceSection + " .sheet-" + ability.toLowerCase() + "_lock-down"] = thisincrease > 0 ? "" : "lock";
            update[sourceSection + " .sheet-" + ability.toLowerCase() + "_lock-up"] = thisincrease < 2 && totalincrease < 2 ? "" : "lock";
        });
        //Now, figure out if any stats are maxed out
        _.each(abilityList, function(ability) {
            if(abilities[ability.toLowerCase()] >= abilities[ability.toLowerCase() + "_maximum"]) {
                update[sourceSection + " .sheet-" + ability.toLowerCase() + "_lock-up"] = "lock";
            };
        });
        setCharmancerText(update);
    };

    on("page:lp-summary", function() {
        var mancerdata = getCharmancerData();
        var abilities = getAbilityTotals(mancerdata);
        var previous = mancerdata["lp-welcome"].values["previous_attributes"] ? JSON.parse(mancerdata["lp-welcome"].values["previous_attributes"]) : {};
        var spelldata = mancerdata["lp-welcome"].values["spellinfo"] ? JSON.parse(mancerdata["lp-welcome"].values["spellinfo"]) : {};
        var lcAbilities = abilityList.map(function(x) {return x.toLowerCase()});
        var update = {};
        update["before div"] = "<div class=\"row\"><p>Class: <span>";
        if(previous.subclass) update["before div"] += previous.subclass + " ";
        update["before div"] += previous.class + " " + previous.base_level;
        for(var x=1; x<=3; x++) {
            if(previous["multiclass" + x + "_flag"] != "0") {
                update["before div"] += ", " + previous["multiclass" + x] + " " + previous["multiclass" + x + "_lvl"];
            }
        };
        update["before div"] += "</span></p>";
        update["before div"] += "<p>Hit Points: <span>" + previous.hp_max + "</span></p></div>";
        update["before div"] += "<div class=\"row\"><div class=\"ability-row\">";
        _.each(lcAbilities, function(ability) {
            update["before div"] += "<div><h5 data-i18n=\"" + ability.substr(0,3) + "-u\"></h5>";
            update["before div"] += "<span class=\"score\">" + abilities[ability + "_previous"] + "</span> ";
            update["before div"] += "(<span class=\"mod\">";
            update["before div"] += abilities[ability + "_previous_mod"] >= 0 ? "+" + abilities[ability + "_previous_mod"] : abilities[ability + "_previous_mod"];
            update["before div"] += "</span>)</div>";
        });
        update["before div"] += "</div></div><div class=\"row\"></div>";
        update["after div"] = "<div class=\"row\"><p class=\"highlight\">Class: <span>";
        for(var x=1; x<=4; x++) {
            if(mancerdata["lp-levels"].values["class" + x]) {
                if(x !== 1) update["after div"] += ", "
                if(mancerdata["lp-levels"].values["class" + x + "_subclass"]) {
                    if((x == 1 && !previous.subclass) || (x != 1 && previous["multiclass" + x + "_flag"] != "0" && !previous["multiclass" + x + "_subclass"])) {
                        update["after div"] += "<span class=\"highlight\">";
                    } else {
                        update["after div"] += "<span>";
                    }
                    update["after div"] += removeExpansionInfo(mancerdata["lp-levels"].values["class" + x + "_subclass"].split(":")[1]) + " </span>";
                }
                if(x != 1 && previous["multiclass" + x + "_flag"] != "0" && !previous["multiclass" + x + "_subclass"]) {
                    update["after div"] += "<span class=\"highlight\">";
                } else {
                    update["after div"] += "<span>";
                }
                update["after div"] +=  removeExpansionInfo(mancerdata["lp-levels"].values["class" + x].split(":")[1]) + " </span>";
                if(mancerdata["lp-levels"].values["class" + x + "_addlevel"]) {
                    update["after div"] += "<span class=\"highlight\">";
                } else {
                    update["after div"] += "<span>";
                }
                var prevlevel = 0;
                if(x == 1) {
                    prevlevel = parseInt(previous["base_level"]);
                } else {
                    prevlevel = previous["multiclass" + x + "_flag"] == "0" ? 0 : parseInt(previous["multiclass" + x + "_lvl"])
                }
                update["after div"] += (prevlevel + parseInt(mancerdata["lp-levels"].values["class" + x + "_addlevel"])) + " </span>";
            }
        };
        update["after div"] += "</span></p>";
        update["after div"] += "<p class=\"highlight\">Hit Points: <span class=\"highlight\">" + getHpTotal(mancerdata) + "</span></p></div>";
        update["after div"] += "<div class=\"row\"><div class=\"ability-row\">";
        _.each(lcAbilities, function(ability) {
            update["after div"] += abilities[ability] == abilities[ability + "_previous"] ? "<div>" : "<div class=\"highlight\">"
            update["after div"] += "<h5 data-i18n=\"" + ability.substr(0,3) + "-u\"></h5><span>";
            update["after div"] += abilities[ability] == abilities[ability + "_previous"] ? "<span class=\"score\">" : "<span class=\"score highlight\">";
            update["after div"] += abilities[ability] + "</span> (";
            update["after div"] += abilities[ability + "_mod"] == abilities[ability + "_previous_mod"] ? "<span class=\"mod\">" : "<span class=\"mod highlight\">";
            update["after div"] += abilities[ability + "_mod"] >= 0 ? "+" + abilities[ability + "_mod"] : abilities[ability + "_mod"];
            update["after div"] += "</span>)</span></div>";
        });
        update["after div"] += "</div></div><div class=\"row\"></div>";

        //Spells
        let selectedSpells = getGainedSpells();
        update["spell_info"] = "<p>You haven't gained any spells</p>";
        if(selectedSpells.length > 0) update["spell_info"] = '<p>You have learnt these spells: '+ selectedSpells.sort().join(", ") +'</p>';

        let gainedFeatures = getGainedFeatures();
        update["feature_info"] = (gainedFeatures.length > 0) ? '<p>You have gained these class features: '+ gainedFeatures.sort().join(", ") +'</p>' :
        "You haven't gained any class features.";

        setCharmancerText(update);
        showChoices(["apply_changes"]);
        console.log(mancerdata["lp-levels"].values);
        console.log(abilities);
        console.log(previous);
    });

    on("clicked:lp-choices_next", function(eventinfo) {
        const mancerdata = getCharmancerData();
        if(mancerdata["lp-levels"].values.asi === "true") {
            changeCharmancerPage("lp-asi");
        } else if(mancerdata["lp-levels"].values.spells === "true") {
            changeCharmancerPage("lp-spells");
        } else {
            changeCharmancerPage("lp-summary");
        }
    });
    on("clicked:lp-asi_next", function(eventinfo) {
        const mancerdata = getCharmancerData();
        if(mancerdata["lp-levels"].values.spells === "true") {
            changeCharmancerPage("lp-spells");
        } else {
            changeCharmancerPage("lp-summary");
        }
    });
    on("clicked:lp-spells_back", function(eventinfo) {
        const mancerdata = getCharmancerData();
        if(mancerdata["lp-levels"].values.asi === "true") {
            changeCharmancerPage("lp-asi");
        } else {
            changeCharmancerPage("lp-choices");
        }
    });
    on("clicked:lp-summary_back", function(eventinfo) {
        const mancerdata = getCharmancerData();
        if(mancerdata["lp-levels"].values.spells === "true") {
            changeCharmancerPage("lp-spells");
        } else if(mancerdata["lp-levels"].values.asi === "true") {
            changeCharmancerPage("lp-asi");
        } else {
            changeCharmancerPage("lp-choices");
        }
    });

    //Fixing Bard's Magical Secrets (UC-10)
    //By Miguel
    //The ways this was being handled before, binded to clicked:repeating_utilityrow_launch, was not being triggered due to the way the DOM is built.
    on("clicked:repeating_utilityrow", function(eventinfo) {
        if(eventinfo.triggerName.indexOf('utilityrow_launch') === -1) return;
        const mancerdata = getCharmancerData();
        var querysettings = {};
        var spelldata = getKnownLpSpells(mancerdata);
        var leveldata = _.findWhere(getLevelingData(mancerdata), {classnumber: parseInt(mancerdata["lp-choices"].values[`${eventinfo.sourceSection}_parent`][5])});
        var query = "";
        let newspells = 0;
        let newcantrips = 0;
        var spellnames = [];
        var current = [];
        var locked = [];
        var update = {};
        update[`${eventinfo.sourceSection} .sheet-warning`] = "";
        try {
            querysettings = JSON.parse(mancerdata["lp-choices"].values[`${eventinfo.sourceSection}_info`]);
        } catch(e) {
            querysettings = mancerdata["lp-choices"].values[`${eventinfo.sourceSection}_info`];
        };
        if(mancerdata["lp-choices"].values[`${eventinfo.sourceSection}_result`]) current = mancerdata["lp-choices"].values[`${eventinfo.sourceSection}_result`].split(", ");
        if(mancerdata["lp-spells"] && mancerdata["lp-spells"].repeating) {
            _.each(mancerdata["lp-spells"].repeating, function(repid) {
                if(mancerdata["lp-spells"].values[`${repid}_checked`]) {
                    spelldata[mancerdata["lp-spells"].values[`${repid}_name`]] = {
                        level: mancerdata["lp-spells"].values[`${repid}_level`],
                        spellclass: mancerdata["lp-spells"].values[`${repid}_class`]
                    }
                }
            });
        }
        _.each(current, function(currentspell) {
            delete spelldata[currentspell];
        })
        if(querysettings.Known) {
            if(querysettings.Level + "" === "0") {
                newcantrips = 1;
            } else {
                newspells = 1;
            }
            _.each(spelldata, function(spell, spellname) {
                if(!querysettings.Level || (querysettings.Level && querysettings.Level == spell.level)) spellnames.push(spellname);
            });
            if(spellnames.length > 0) {
                query = "Category:Spells Name:" + spellnames.join("|");
            } else {
                update[`${eventinfo.sourceSection} .sheet-warning`] = `You do not currently know any level ${querysettings.Level} spells.`;
                setCharmancerText(update);
            }
        } else {
            query = "Category:Spells";
            if(querysettings.Level) {
                let levels = [querysettings.Level];
                if(querysettings.Level == "max") {
                    levels = [];
                    for(let x=1; x<=leveldata.maxspell; x++) {
                        levels.push(x);
                    }
                }
                query += " Level:" + levels.join("|");
            };
            if(querysettings.List && querysettings.List.toLowerCase() !== "any") {
                query += " Classes:*" + querysettings.List;
            };
            if(querysettings.Level + "" === "0") {
                newcantrips = querysettings.Number ? parseInt(querysettings.Number) : 1;
            } else {
                newspells = querysettings.Number ? parseInt(querysettings.Number) : 1;
            }
            locked = _.keys(spelldata);
        }
        if(query) {
            setCharmancerText(update);
            changeCharmancerPage("lp-spellchoice", function() {
                getCompendiumQuery([query], function(data) {
                    data = removeDuplicatedPageData(data);
                    let byLevel = {};
                    let filters = {};
                    let filtered = [];
                    let toSet = {};
                    let update = {};
                    update["instructions"] = querysettings.HelpText;
                    console.log(data);
                    _.each(querysettings, function(setting, key) {
                        if(!["Level","List","Number","Type","ButtonText","HelpText", "Known", "Class"].includes(key)) {
                            filters[key] = setting;
                        }
                    });
                    console.log(filters);
                    if(querysettings.Known) {
                        delete querysettings.Level;
                    }
                    delete querysettings.Known;
                    _.each(data, function(spell) {
                        let match = true;
                        _.each(filters, function(value, name) {
                            if(spell.data[name] !== value) match = false;
                        })
                        if(match) filtered.push(spell);
                    });
                    console.log(filtered);
                    _.each(filtered, function(spell) {
                        if(spell.data.Classes) {
                            byLevel[spell.data.Level] = byLevel[spell.data.Level] || [];
                            byLevel[spell.data.Level].push({
                                name: spell.name,
                                classes: spell.data.Classes.split(",").map(x => x.trim()),
                                level: parseInt(spell.data.Level)
                            });
                        }
                    });
                    toSet.newspells = newspells;
                    toSet.newcantrips = newcantrips;
                    toSet.valid = "now";
                    toSet.source = eventinfo.sourceSection;
                    setCharmancerText(update);
                    setAttrs(toSet, function() {
                        addSpellSections(byLevel, {
                            newcantrips: newcantrips,
                            newspells: newspells,
                            page: "lp-spellchoice",
                            selected: current,
                            locked: locked
                        });
                    });
                });
            });/**/
        }
    });

    //TODO: Investigate if the duplicated event below listener can be removed
    //By Miguel
    on("clicked:repeating_utilityrow_launch", function(eventinfo) {
        const mancerdata = getCharmancerData();
        var querysettings = {};
        var spelldata = getKnownLpSpells(mancerdata);
        var leveldata = _.findWhere(getLevelingData(mancerdata), {classnumber: parseInt(mancerdata["lp-choices"].values[`${eventinfo.sourceSection}_parent`][5])});
        var query = "";
        let newspells = 0;
        let newcantrips = 0;
        var spellnames = [];
        var current = [];
        var locked = [];
        var update = {};
        update[`${eventinfo.sourceSection} .sheet-warning`] = "";
        try {
            querysettings = JSON.parse(mancerdata["lp-choices"].values[`${eventinfo.sourceSection}_info`]);
        } catch(e) {
            querysettings = mancerdata["lp-choices"].values[`${eventinfo.sourceSection}_info`];
        };
        if(mancerdata["lp-choices"].values[`${eventinfo.sourceSection}_result`]) current = mancerdata["lp-choices"].values[`${eventinfo.sourceSection}_result`].split(", ");
        if(mancerdata["lp-spells"] && mancerdata["lp-spells"].repeating) {
            _.each(mancerdata["lp-spells"].repeating, function(repid) {
                if(mancerdata["lp-spells"].values[`${repid}_checked`]) {
                    spelldata[mancerdata["lp-spells"].values[`${repid}_name`]] = {
                        level: mancerdata["lp-spells"].values[`${repid}_level`],
                        spellclass: mancerdata["lp-spells"].values[`${repid}_class`]
                    }
                }
            });
        }
        _.each(current, function(currentspell) {
            delete spelldata[currentspell];
        })
        if(querysettings.Known) {
            if(querysettings.Level + "" === "0") {
                newcantrips = 1;
            } else {
                newspells = 1;
            }
            _.each(spelldata, function(spell, spellname) {
                if(!querysettings.Level || (querysettings.Level && querysettings.Level == spell.level)) spellnames.push(spellname);
            });
            if(spellnames.length > 0) {
                query = "Category:Spells Name:" + spellnames.join("|");
            } else {
                update[`${eventinfo.sourceSection} .sheet-warning`] = `You do not currently know any level ${querysettings.Level} spells.`;
                setCharmancerText(update);
            }
        } else {
            query = "Category:Spells";
            if(querysettings.Level) {
                let levels = [querysettings.Level];
                if(querysettings.Level == "max") {
                    levels = [];
                    for(let x=1; x<=leveldata.maxspell; x++) {
                        levels.push(x);
                    }
                }
                query += " Level:" + levels.join("|");
            };
            if(querysettings.List && querysettings.List.toLowerCase() !== "any") {
                query += " Classes:*" + querysettings.List;
            };
            if(querysettings.Level + "" === "0") {
                newcantrips = querysettings.Number ? parseInt(querysettings.Number) : 1;
            } else {
                newspells = querysettings.Number ? parseInt(querysettings.Number) : 1;
            }
            locked = _.keys(spelldata);
        }
        if(query) {
            setCharmancerText(update);
            changeCharmancerPage("lp-spellchoice", function() {
                getCompendiumQuery([query], function(data) {
                    data = removeDuplicatedPageData(data);
                    let byLevel = {};
                    let filters = {};
                    let filtered = [];
                    let toSet = {};
                    let update = {};
                    update["instructions"] = querysettings.HelpText;
                    console.log(data);
                    _.each(querysettings, function(setting, key) {
                        if(!["Level","List","Number","Type","ButtonText","HelpText", "Known", "Class"].includes(key)) {
                            filters[key] = setting;
                        }
                    });
                    console.log(filters);
                    if(querysettings.Known) {
                        delete querysettings.Level;
                    }
                    delete querysettings.Known;
                    _.each(data, function(spell) {
                        let match = true;
                        _.each(filters, function(value, name) {
                            if(spell.data[name] !== value) match = false;
                        })
                        if(match) filtered.push(spell);
                    });
                    console.log(filtered);
                    _.each(filtered, function(spell) {
                        if(spell.data.Classes) {
                            byLevel[spell.data.Level] = byLevel[spell.data.Level] || [];
                            byLevel[spell.data.Level].push({
                                name: spell.name,
                                classes: spell.data.Classes.split(",").map(x => x.trim()),
                                level: parseInt(spell.data.Level)
                            });
                        }
                    });
                    toSet.newspells = newspells;
                    toSet.newcantrips = newcantrips;
                    toSet.valid = "now";
                    toSet.source = eventinfo.sourceSection;
                    setCharmancerText(update);
                    setAttrs(toSet, function() {
                        addSpellSections(byLevel, {
                            newcantrips: newcantrips,
                            newspells: newspells,
                            page: "lp-spellchoice",
                            selected: current,
                            locked: locked
                        });
                    });
                });
            });/**/
        }
    });

    on("page:lp-spellchoice", function() {
        const mancerdata = getCharmancerData();
        if(mancerdata["lp-spellchoice"] && mancerdata["lp-spellchoice"].values.valid === "now") {
            changeCharmancerPage("lp-choices", function() {
                deleteCharmancerData(["lp-spellchoice"]);
            });
        }
    });

    on("mancerchange:repeating_utilityrow_result", function(eventinfo) {
        if(eventinfo.sourceSection) {
            const mancerdata = getCharmancerData();
            let update = {};
            console.log(`${eventinfo.sourceSection}_title`);
            update[`${eventinfo.sourceSection} label span .sheet-result`] = eventinfo.newValue;
            console.log(update);
            setCharmancerText(update);
        }
    });

    on("clicked:lp-spellchoice_back", function(eventinfo) {
        const mancerdata = getCharmancerData();
        const leveldata = getLevelingData(mancerdata);
        let result = [];
        let source = mancerdata["lp-spellchoice"].values.source;
        let newspells = false;
        let spellsettings = {};
        if(mancerdata["lp-choices"].values[`${source}_info`]) {
            spellsettings = JSON.parse(mancerdata["lp-choices"].values[`${source}_info`]);
        }
        _.each(mancerdata["lp-spellchoice"].repeating, function(repid) {
            if(mancerdata["lp-spellchoice"].values[`${repid}_checked`] && !mancerdata["lp-spellchoice"].values[`${repid}_existing`]) result.push(mancerdata["lp-spellchoice"].values[`${repid}_name`]);
        });
        if(mancerdata["lp-choices"].values[`${source}_type`] !== "trait") {
            const thisclass = _.findWhere(leveldata, {classnumber: parseInt(mancerdata["lp-choices"].values[`${source}_parent`][5])});
            newspells = {}
            _.each(mancerdata["lp-spellchoice"].repeating, function(repid) {
                if(mancerdata["lp-spellchoice"].values[`${repid}_checked`] && !mancerdata["lp-spellchoice"].values[`${repid}_existing`]) {
                    let thisspell = {
                        ability: thisclass.spellcasting,
                        spellclass: thisclass.classname,
                        level: mancerdata["lp-spellchoice"].values[`${repid}_level`] === "0" ? "cantrip" : mancerdata["lp-spellchoice"].values[`${repid}_level`]
                    }
                    if(spellsettings.Type) thisspell.known = spellsettings.Type;
                    newspells[mancerdata["lp-spellchoice"].values[`${repid}_name`]] = thisspell;
                }
            });
        }
        changeCharmancerPage("lp-choices", function() {
            deleteCharmancerData(["lp-spellchoice"]);
            let set = {};
            set[`${source}_result`] = result.join(", ");
            if(newspells) set[`${source}_spells`] = JSON.stringify(newspells);
            setAttrs(set);
        });
    });

    on("mancerfinish:lp-mancer", function(eventinfo) {
        console.log("****************************************");
        console.log("******  STARTING FINISH FUNCTION  ******");
        console.log("****************************************");
        var doAllDrops = function(dropArray, callback) {
            getAttrs(["character_id"], function(v) {
                _.each(allAbilities, function(ability) {
                    v[ability + "_base"] = abilities[ability];
                    v[ability + "_mod"] = abilities[ability];
                });
                v.base_level = set["base_level"];
                v["multiclass1_lvl"] = initial["multiclass1_lvl"];
                v["multiclass2_lvl"] = initial["multiclass2_lvl"];
                v["multiclass3_lvl"] = initial["multiclass3_lvl"];
                v.npc = "0";
                v["class_resource_name"] = previous["class_resource_name"];
                v["other_resource_name"] = previous["other_resource_name"];
                v.speed = previous.speed;
                var update = {};
                var callbacks = [];
                var totalDrops = dropArray.length;
                var x = 0;
                callbacks.push(set_level);
                callbacks.push(update_race_display);
                _.each(dropArray, function(page) {
                    page.data.Category = page.data.Category ? page.data.Category.replace("@@!!@@", "") : "";
                    var dropUpdate = processDrop(page, v, repeating, true);
                    callbacks = callbacks.concat(dropUpdate.callbacks);
                    repeating.prof_names = _.uniq(repeating.prof_names.concat(dropUpdate.prof_names));
                    update = _.extend(update, dropUpdate.update);
                    x++;
                    setCharmancerText({"mancer_progress" :'<div style="width: ' + (parseInt(x/totalDrops*70) + 20) + '%"></div>'});
                });

                callbacks.push( function() {update_ac();} );
                callbacks.push( function() {update_weight();} );
                callbacks.push(callback);
                console.log(update);
                setAttrs(update, {silent: true}, function() {
                    setCharmancerText({"mancer_progress" :'<div style="width: 95%"></div>'});
                    _.each(callbacks, function(callback) {
                        callback();
                    });
                });/**/
            });
        };
        var getOtherDrops = function(pagedata) {
            var results = [];
            if(pagedata["data-Equipment"]) {
                console.log("ADDING ADDITIONAL ITEMS:");
                var json = {};
                try {
                    json = JSON.parse(pagedata["data-Equipment"]);
                } catch(e) {
                    json = pagedata["data-Equipment"];
                }
                var newItems = makeItemData(json.default);
                results = results.concat(newItems);
            }
            if(pagedata["data-Bundle"]) {
                console.log("ADDING ADDITIONAL ITEMS (FROM BUNDLE):");
                var json = {};
                try {
                    json = JSON.parse(pagedata["data-Bundle"]);
                } catch(e) {
                    json = pagedata["data-Bundle"];
                }
                var newItems = makeItemData(json);
                results = results.concat(newItems);
            }
            return results;
        };
        var getAllPages = function(pageArray, callback) {
            if(pageArray.length < 1) {
                callback();
                return;
            }
            var getNames = [];
            _.each(pageArray, function(page){
                if(page.name) {
                    getNames.push(page.name);
                } else {
                    getNames.push(page);
                }
            });
            getCompendiumPage(getNames, function(data) {
                data = removeDuplicatedPageData(data);
                var nextGet = [];
                if (getNames.length === 1) { data = {0:data} }; //Fix single spell selections failing.
                _.each(data, function(page, index) {
                    var pagedata = false;
                    _.each(pageArray, function(arrayData) {
                        if(arrayData.name.toLowerCase() == (page.data.Category + ":" + page.name).toLowerCase()) {
                            pagedata = arrayData;
                        }
                    });
                    if(pagedata && pagedata.data) {
                        page.data = _.extend(page.data, pagedata.data);
                    }
                    if(!page.id) page.data.Source = "Charactermancer";
                    page.name = page.name.replace(/@@!!@@/g,""); // Hacky bugfix to prevent custom names from matching unavailable content
                    nextGet = nextGet.concat(getOtherDrops(page.data));
                    if(page.data["data-Starting Gold"] && !noEquipmentDrop) {
                        set["gp"] += parseInt(page.data["data-Starting Gold"]);
                    }
                    allPageData.push(page);
                });

                if(nextGet.length > 0) {
                    console.log("DOING ANOTHER GET!!");
                    getAllPages(nextGet, callback);
                } else {
                    callback();
                }

            });
        };
        var startTime = Date.now();
        var allPageData = [];
        var data = eventinfo.data;
        var blobs = getAllLpBlobs(data, true);
        var leveldata = getLevelingData(data);
        var racedata = getLpRaceData(data, leveldata);
        var abilities = getAbilityTotals(data, blobs);
        var previous = data["lp-welcome"].values["previous_attributes"] ? JSON.parse(data["lp-welcome"].values["previous_attributes"]) : {};
        var repeating = data["lp-welcome"].values["previous_repeating"] ? JSON.parse(data["lp-welcome"].values["previous_repeating"]) : {};
        var spelldata = data["lp-welcome"].values["spellinfo"] ? JSON.parse(data["lp-welcome"].values["spellinfo"]) : {};
        var customtraits = {race: [], subrace: [], class: [], subclass: [], background: []};
        var profs = getProficiencies(data, "lp-finish", blobs);
        var removesections = [];
        var loudset = {};
        var set = {};
        var initial = {};
        var allDrops = [];
        var currentDrop = 0;
        var totalDrops = 1;
        var allSkills = ["athletics", "acrobatics", "sleight_of_hand", "stealth", "arcana", "history", "investigation", "nature", "religion", "animal_handling", "insight", "medicine", "perception", "survival","deception", "intimidation", "performance", "persuasion"];
        var allAbilities = abilityList.map(function(x) {return x.toLowerCase()});
        set["lp-mancer_status"] = "";
        console.log(blobs);
        // Build new blobs for traits with inputs, collect custom traits and languages
        _.each(["lp-choices", "lp-asi"], function(pagename) {
            var slide = data[pagename];
            if(slide) {
                console.log(slide);
                _.each(slide.values, function(value, name) {
                    if(name.substr(-11) == "trait_input") {
                        let sectionid = name.substring(0, name.length - 6);
                        let thisblob = {};
                        let thistrait = {};
                        let classnumber = _.last(slide.values[sectionid + "_section"].split("--")[0].split("-"));
                        let sectionname = "class" + classnumber;
                        if(slide.values[sectionid + "_section"].includes("subclass")) sectionname += "_subclass";
                        let thissection = _.findWhere(leveldata, {classnumber: parseInt(classnumber)});
                        thistrait.Name = slide.values[sectionid + "_name"].replace(/{{Input}}/g, value);
                        thistrait.Desc = slide.values[sectionid + "_desc"] ? slide.values[sectionid + "_desc"].replace(/{{Input}}/g, value) : "";
                        thisblob.Traits = JSON.stringify([thistrait]);
                        blobs.names[sectionname].push(sectionid);
                        thissection[slide.values[sectionid + "_section"].includes("subclass") ? "subclass" : "class"].blobs[sectionid] = thisblob;
                    }
                    if(name.split("_")[2] == "custom" && name.substr(-10) == "trait_name") {
                        var sectionid = name.substring(0, name.length - 5);
                        var thistrait = {};
                        thistrait.Name = slide.values[sectionid + "_name"];
                        thistrait.Desc = slide.values[sectionid + "_desc"] ? slide.values[sectionid + "_desc"] : "";
                        customtraits[name.split("_")[3]].push(thistrait);
                    }
                    if(value == "custom" && name.substr(-18) == "proficiency_choice") {
                        var sectionid = name.substring(0, name.length - 7);
                        if(slide.values[sectionid + "_custom"] && slide.values[sectionid + "_type"]) {
                            profs.all[slide.values[sectionid + "_type"]].push(slide.values[sectionid + "_custom"])
                        }
                    }
                    if(name.substr(-17) === "utilityrow_result") {
                        let sectionid = name.substring(0, name.length - 7);
                        let thissection = _.findWhere(leveldata, {classnumber: parseInt(slide.values[sectionid + "_parent"][5])});
                        let section = slide.values[sectionid + "_parent"].includes("subclass") ? "subclass" : "class";
                        if(thissection[section].blobs[slide.values[sectionid + "_blob"]].Traits) thissection[section].blobs[slide.values[sectionid + "_blob"]].Traits = thissection[section].blobs[slide.values[sectionid + "_blob"]].Traits.replace(/{{Input}}/g, value);
                    }
                });
            }
        });
        _.each(leveldata, function(level) {
            var name = "class" + level.classnumber;
            var mc = "multiclass" + (level.classnumber - 1);
            var thisclass = {name: removeExpansionInfo(level.classname), data: level.class};
            //if this is an mc class, add mc data
            if(name != "class1") thisclass.data.multiclass = mc;
            thisclass.data.theseblobs = blobs.names[name];
            allPageData.push(thisclass);
            if(level.subclass) {
                var thissubclass = {name: removeExpansionInfo(level.subclassname), data: level.subclass};
                //if this is an mc subclass, add mc data
                if(name != "class1") thissubclass.data.multiclass = mc;
                thissubclass.data.theseblobs = blobs.names[name + "_subclass"];
                allPageData.push(thissubclass);
            }
            //set up the setAttrs for this class
            if(name === "class1") {
                set["base_level"] = parseInt(previous["base_level"]) + level.addlevel;
            } else {
                initial[mc + "_lvl"] = previous[mc + "_flag"] === "0" ? level.addlevel : parseInt(previous[mc + "_lvl"]) + level.addlevel;
            }
        });
        _.each(racedata, function(level, label) {
            _.each(["", "sub"], function(prefix) {
                let section = prefix + label;
                if(previous[section] && blobs.names[section] && blobs.names[section].length > 0) {
                    let thisDrop = {name: previous[section], data: {Category: section[0].toUpperCase() + section.substring(1, section.length) + "s"}};
                    thisDrop.data.blobs = data["lp-welcome"].data["lp-" + section].blobs;
                    thisDrop.data.theseblobs = blobs.names[section];
                    allPageData.push(thisDrop);
                }
            });
        });
        //Set up proficiency drops
        _.each(["Armor", "Language", "Tool", "Weapon"], function(proftype) {
            _.each(profs.all[proftype], function(prof) {
                if(prof) {
                    var profdata = {name: "Proficiencies:" + prof, data: {Type: proftype}}
                    if(profs.all.Expertise.includes(prof)) {
                        profdata.data["toolbonus_base"] = "(@{pb}*2)";
                        allDrops.unshift(profdata);
                    } else {
                        allDrops.push(profdata);
                    }
                };
            });
        });
        console.log(profs.all);
        //Set up expertise drops
        _.each(_.uniq(profs.all.Skill.concat(profs.all.Expertise)), function(prof) {
            var profName = prof.toLowerCase().replace(/ /g, "_");
            initial[profName + "_prof"] = "(@{pb}*@{" + profName + "_type})";
            if(profs.all.Expertise.indexOf(prof) != -1) {
                set[profName + "_type"] = 2;
            }
        });
        //Set up Ability scores
        initial["hp"] = getHpTotal(data, blobs);
        initial["hp_max"] = initial["hp"];
        _.each(allAbilities, function(ability) {
            loudset[ability + "_base"] = abilities[ability];
            loudset[ability + "_maximum"] = abilities[ability + "_maximum"];
        });
        //Set up spell drops
        if(data["lp-spells"] && data["lp-spells"].repeating) {
            _.each(data["lp-spells"].repeating, function(repid) {
                if(data["lp-spells"].values[repid + "_checked"]) {
                    var spelldata = {name: "Spells:" + data["lp-spells"].values[repid + "_name"], data: {}};
                    if(data["lp-spells"].values[repid + "_ability"]) spelldata.data["spellcasting_ability"] = data["lp-spells"].values[repid + "_ability"];
                    if(data["lp-spells"].values[repid + "_class"]) spelldata.data["spellclass"] = data["lp-spells"].values[repid + "_class"];
                    if(data["lp-spells"].values[repid + "_source"]) spelldata.data["spellsource"] = data["lp-spells"].values[repid + "_source"];
                    allDrops.push(spelldata);
                }
                if(data["lp-spells"].values[repid + "_existing"] && !data["lp-spells"].values[repid + "_checked"]) {
                    var lvl = data["lp-spells"].values[repid + "_level"];
                    var id = "";
                    _.each(repeating["spell-" + lvl], function(spell, spellid) {
                        if(spell.spellname.toLowerCase() == data["lp-spells"].values[repid + "_name"].toLowerCase()) {
                            id = spellid;
                            if(spell.spellattackid) removesections.push("repeating_attack_" + spell.spellattackid);
                        };
                    });
                    removesections.push("repeating_spell-" + lvl + "_" + id);
                }
            });
        } else {
            //If there was no spell page, need to drop any new "known" spells
            _.each(blobs.sorted, function(section, name) {
                _.each(section, function(blob) {
                    if(blob.Spells) {
                        spells = JSON.parse(blob.Spells);
                        _.each(spells, function(spell) {
                            if(spell.Known) {
                                _.each(spell.Known, function(spellname) {
                                    var thisspell = {name: "Spells:" + spellname, data: {}};
                                    var thisclass = name.substring(0,5) === "class" ? _.last(data["lp-levels"].values[name.split("_")[0]].split(":")) : "Racial";
                                    if(spell.Ability) thisspell.data["spellcasting_ability"] = spell.Ability;
                                    if(spell.Source) thisspell.data["spellsource"] = spell.Source;
                                    thisspell.data["spellclass"] = thisclass;
                                    allDrops.push(thisspell);
                                });
                            };
                        });
                    };
                });
            });
        };
        //Gater spells from class features
        _.each(data, function(page, pagename) {
            if(pagename.split("-")[0] == "lp") {
                _.each(page.values, function(value, name) {
                    if(name.substr(-18) === "_utilityrow_spells") {
                        let featurespells = JSON.parse(value);
                        _.each(featurespells, function(spell, spellname) {
                            var thisspell = {name: "Spells:" + spellname, data: {}};
                            if(spell.ability) thisspell.data["spellcasting_ability"] = spell.ability;
                            if(spell.known) thisspell.data["spellsource"] = spell.known;
                            if(spell.spellclass) thisspell.data["spellclass"] = spell.spellclass;
                            allDrops.push(thisspell);
                        })
                    }
                });
            }
        });
        //unset charmancer step
        set["lpmancer_status"] = "";
        set["charactermancer_step"] = "lp-welcome";
        console.log(allDrops);
        console.log(allPageData);
        _.each(removesections, function(rowid) {
            removeRepeatingRow(rowid);
        });
        setCharmancerText({"mancer_progress" :'<div style="width: 5%"></div>'});
        //first set is silent to prevent unwanted sheet workers
        setAttrs(initial, {silent:true}, function() {
            setCharmancerText({"mancer_progress" :'<div style="width: 10%"></div>'});
            //reset remaining attributes, and set ability scores/custom info
            setAttrs(loudset, function() {
                setCharmancerText({"mancer_progress" :'<div style="width: 15%"></div>'});
                getAllPages(allDrops, function() {
                    setCharmancerText({"mancer_progress" :'<div style="width: 20%"></div>'});
                    doAllDrops(allPageData, function() {
                        console.log("DOING THE FINAL SET!!");
                        setAttrs(set, function() {
                            setCharmancerText({"mancer_progress" :'<div style="width: 100%"></div>'});
                            organize_section_proficiencies();
                            update_skills(allSkills);
                            update_attacks("all");
                            deleteCharmancerData(["lp-welcome", "lp-levels", "lp-choices", "lp-asi", "lp-spells","lp-summary"]);
                            var endTime = Date.now();
                            console.log("Elapsed time: ");
                            console.log((endTime-startTime)/1000);
                            finishCharactermancer();
                        });
                    });
                });
            });
        });
        /* */
    });
 //# sourceURL=dnd5e.js