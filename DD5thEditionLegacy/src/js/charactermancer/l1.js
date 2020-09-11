
    /*********************************************************************/
    /*********************************************************************/
    /******                                                         ******/
    /******                 CHARACTERMANCER WORKERS                 ******/
    /******                                                         ******/
    /*********************************************************************/
    /*********************************************************************/

    var proficiencyList = ["Weapon", "Armor", "Skill", "Tool", "Language"];
    var abilityList = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
    var changeListeners = "mancerchange:race_ability_choice1 mancerchange:race_ability_choice2 mancerchange:subrace_ability_choice1 mancerchange:subrace_ability_choice2 mancerchange:custom_hit_die mancerchange:feat_ability_choice";
    var proficiencyNum = 4;
    var customListeners = "";
    _.each(abilityList, function(ability){
        changeListeners += " mancerchange:race_custom_" + ability.toLowerCase();
        changeListeners += " mancerchange:subrace_custom_" + ability.toLowerCase();
    });

    /* HELPER FUNCTIONS */
    var recalcData = function(data) {
        //Sets all the text in the top bar, returns ability information
        var update = {"hit_points": "-"};
        var allAbilities = {race: {}, subrace: {}, feat: {}};
        var disableAbilities = {race: [], subrace: [], feat: []};
        var allProficiencies = {};
        var toSet = {};
        var mancerdata = data || getCharmancerData();
        var additionalHP = 0;

        if(mancerdata["l1-class"] && mancerdata["l1-class"].data.class && mancerdata["l1-class"].data.class["Suggested Abilities"]) {
            update["class_suggested_abilities"] = mancerdata["l1-class"].data.class["Suggested Abilities"];
            showChoices(["class_suggested_abilities_container"]);
        } else {
            update["class_suggested_abilities"] = "";
            hideChoices(["class_suggested_abilities_container"]);
        }
        if(mancerdata["l1-class"] && mancerdata["l1-class"].data.class && mancerdata["l1-class"].data.class["Spellcasting Ability"]) {
            update["class_spellcasting_ability"] = mancerdata["l1-class"].data.class["Spellcasting Ability"];
            showChoices(["class_spellcasting_ability_container"]);
        } else {
            update["class_spellcasting_ability"] = "";
            hideChoices(["class_spellcasting_ability_container"]);
        }

        _.each(mancerdata, function(page){
            _.each(page.values, function(value, name) {
                if(name.search("ability") !== -1) {
                    var choiceSection = name.split("_")[0];
                    if(page.data[choiceSection] && page.data[choiceSection]["data-Ability Score Choice"]) {
                        var increase = 1;
                        if(typeof page.data[choiceSection]["data-Ability Score Choice"] == "string") {
                            increase = parseInt( _.last( page.data[choiceSection]["data-Ability Score Choice"].split("+") ) );
                        }
                        allAbilities[choiceSection] = allAbilities[choiceSection] || {};
                        allAbilities[choiceSection][value.toLowerCase()] = increase;
                        disableAbilities[choiceSection] = disableAbilities[choiceSection] || [];
                        disableAbilities[choiceSection].push(value);
                    }
                }
            });
            _.each(page.data, function(pagedata, increaseSection) {
                if(pagedata["data-Ability Score Increase"]) {
                    _.each(pagedata["data-Ability Score Increase"], function(amount, ability) {
                        allAbilities[increaseSection] = allAbilities[increaseSection] || {};
                        allAbilities[increaseSection][ability.toLowerCase()] = amount;
                        disableAbilities[increaseSection] = disableAbilities[increaseSection] || [];
                        disableAbilities[increaseSection].push(ability.toLowerCase());
                    });
                }
                //TODO: Investigate if additional hitpoits at first level could be calculated and interted at this point
                //By Miguel
                if(pagedata["data-HP per level"]) {
                    additionalHP += pagedata["data-HP per level"];
                }
            });
        });
        if(mancerdata["l1-race"] && mancerdata["l1-race"].values.race == "Rules:Races") {
            _.each(abilityList, function(ability){
                var custom = mancerdata["l1-race"].values["race_custom_" + ability.toLowerCase()] || false;
                if(custom) {
                    allAbilities.race[ability.toLowerCase()] = parseInt(custom);
                }
            });
        }
        if(mancerdata["l1-race"] && mancerdata["l1-race"].values.subrace == "Rules:Races") {
            _.each(abilityList, function(ability){
                var custom = mancerdata["l1-race"].values["subrace_custom_" + ability.toLowerCase()] || false;
                if(custom) {
                    allAbilities.subrace[ability.toLowerCase()] = parseInt(custom);
                }
            });
        }
        var abilityTotals = {};
        _.each(allAbilities, function(abilities) {
            _.each(abilities, function(amount, ability) {
                abilityTotals[ability] = abilityTotals[ability] || {bonus: 0};
                abilityTotals[ability].bonus += parseInt(amount);
            });
        });
        _.each(abilityList, function(upperAbility) {
            var ability = upperAbility.toLowerCase();
            abilityTotals[ability] = abilityTotals[ability] || {bonus: 0, mod: 0};
            if(mancerdata["l1-abilities"] && mancerdata["l1-abilities"].values[ability]) {
                abilityTotals[ability].base = parseInt( mancerdata["l1-abilities"].values[ability].split("~")[0] );
            } else {
                abilityTotals[ability].base = 0;
            }
            abilityTotals[ability].total = abilityTotals[ability].bonus + abilityTotals[ability].base;
            abilityTotals[ability].mod = Math.floor((abilityTotals[ability].total - 10)/2);
            update[ability + "_total"] = abilityTotals[ability].total == 0 ? "-" : abilityTotals[ability].total;
        });
        allAbilities.totals = abilityTotals;

        if(mancerdata["l1-class"] && (mancerdata["l1-class"].data.class || mancerdata["l1-class"].values["custom_hit_die"])) {
            var basehp = mancerdata["l1-class"].data.class ? mancerdata["l1-class"].data.class["Hit Die"] : mancerdata["l1-class"].values["custom_hit_die"];
            var conmod = abilityTotals.constitution.base > 0 ? abilityTotals.constitution.mod : 0;
            //Calculating additional hitpoints at first level from things like Draconic Bloodline ad Hill Dwarf
            //By Miguel
            let additionalHitPointsFromClassAndRaceAtFirstLevel = getAdditionalHitPointsFromClassAndRaceAtFirstLevel(getRelevantBlobs(mancerdata, '1', 'l1'));
            allAbilities.hp = parseInt(basehp.replace("d", "")) + additionalHitPointsFromClassAndRaceAtFirstLevel + additionalHP + conmod;
            update["hit_points"] = allAbilities.hp;
        }

        if(!data) {
            _.each(disableAbilities, function(disable, disablesection) {
                disableCharmancerOptions(disablesection + "_ability_choice1", disable);
                disableCharmancerOptions(disablesection + "_ability_choice2", disable);
            });
            setCharmancerText(update);
            setAttrs(toSet);
        }
        return allAbilities;
    };

    var getProficiencies = function(data, currentSlide, blobs) {
        //Disables taken proficiency choices, returns proficiency info
        var auto = {};
        var allProficiencies = {"Weapon": [], "Armor": [], "Skill": [], "Tool": [], "Language": [], "Expertise": []};
        var toSet = {};
        var mancerdata = data || getCharmancerData();
        var thismancer = currentSlide && currentSlide != "finish" ? currentSlide.split("-")[0] : "l1";
        if(!blobs) {
            blobs = thismancer == "l1" ? blobs = getRelevantBlobs(mancerdata, "1", "l1") : blobs = getAllLpBlobs(data, true);
        }
        if(thismancer !== "l1") allProficiencies = data["lp-welcome"].values["previous_proficiencies"] ? JSON.parse(data["lp-welcome"].values["previous_proficiencies"]) : allProficiencies;
        currentSlide = currentSlide == "lp-finish" ? "finish" : currentSlide;
        //For this first part, we're only concerned with choices that have already been made
        //Get all of the "automatic" proficiencies
        _.each(blobs.sorted, function(blobarray, section) {
            _.each(blobarray, function(blob) {
                _.each(proficiencyList, function(prof) {
                    if(blob[prof + " Proficiency"]) {
                        var json = JSON.parse(blob[prof + " Proficiency"]);
                        if(json.Proficiencies) {
                            auto[section] = auto[section] ? auto[section].concat(json.Proficiencies) : json.Proficiencies;
                            allProficiencies[prof] = allProficiencies[prof].concat(json.Proficiencies);
                        }
                    }
                });
                if(blob.Expertise) {
                    var json = JSON.parse(blob.Expertise);
                    if(json.Proficiencies) {
                        allProficiencies.Expertise = allProficiencies.Expertise.concat(json.Proficiencies);
                    }
                }
            });
        });
        //Gather all of the chosen proficiencies
        _.each(mancerdata, function(slide, slidename) {
            if(slidename.split("-")[0] == thismancer) {
                _.each(proficiencyList, function(prof) {
                    _.each(slide.values, function(value, name) {
                        if(name.split("_")[3] == prof.toLowerCase() && name.split("_")[4] == "choice") {
                            if(value != "custom") allProficiencies[prof].push(value.split(":")[1]);
                        }
                    });
                });
                //Get a list of chosen expertise
                _.each(slide.values, function(value, name) {
                    if(name.substr(-16) == "expertise_choice") {
                        allProficiencies.Expertise.push(value.split(":")[1]);
                    }
                });
            }
        });
        //Gather proficiencies from custom choices
        _.each(mancerdata, function(slide, slidename) {
            if(slidename.split("-")[0] == thismancer) {
                _.each(slide.values, function(value, name) {
                    if(name.substr(-18) == "proficiency_choice") {
                        if(value != "custom") allProficiencies[slide.values[name.replace("choice", "type")]].push(value.split(":")[1]);
                    }
                });
            }
        });
        //If the expertise choice is from the "known" list, make sure the choice is still available
        //Reset to "" if not available. Don't do this if we're applying changes
        if(currentSlide != "finish") {
            _.each(mancerdata, function(slide, slidename) {
                if(slidename.split("-")[0] == thismancer) {
                    _.each(slide.values, function(value, name) {
                        if(name.substr(-16) == "expertise_choice" && slide.values[name.replace("choice", "info")]) {
                            if(!(allProficiencies.Skill.includes(value.split(":")[1]) || allProficiencies.Tool.includes(value.split(":")[1]))) {
                                toSet[name] = "";
                            }
                        }
                    });
                }
            });
            setAttrs(toSet);
        }
        if(currentSlide && currentSlide != "finish") {
            //Now we need to know all of the selects, even if a choice hasn't been made
            //Getting a list of all the relevant selects
            var repsecs = {"Weapon": [], "Armor": [], "Skill": [], "Tool": [], "Language": []};
            var repexp = [];
            _.each(mancerdata[currentSlide].repeating, function(id) {
                _.each(proficiencyList, function(prof) {
                    if(_.last(id.split("_")) == prof.toLowerCase()) repsecs[prof].push(id);
                });
                if(_.last(id.split("_")) == "expertise") repexp.push(id);
                if(_.last(id.split("_")) == "proficiency") {
                    if (mancerdata[currentSlide].values[id + "_type"]) repsecs[mancerdata[currentSlide].values[id + "_type"]].push(id);
                }
            })
            //Disable already chosen proficiencies
            _.each(proficiencyList, function(prof) {
                _.each(repsecs[prof], function(id) {
                    disableCharmancerOptions(id + "_choice", allProficiencies[prof], {category: "Proficiencies"});
                });
            });
            //Disable already chosen expertise, rebuild options if choice is from "known" list
            _.each(repexp, function(id) {
                if(mancerdata[currentSlide].values[id + "_info"]) {
                    var choices = allProficiencies.Skill;
                    var options = JSON.parse(mancerdata[currentSlide].values[id + "_info"]);
                    var settings = {category: "Proficiencies", disable: allProficiencies.Expertise, silent: true};
                    options.shift();
                    settings.add = options;
                    setCharmancerOptions(id + "_choice", choices, settings);
                } else {
                    disableCharmancerOptions(id + "_choice", allProficiencies.Expertise, {category: "Proficiencies"});
                }
            });
        };
        _.each(allProficiencies, function(section, name) {
            allProficiencies[name] = _.without(section, "");
        });
        return({auto: auto, all: allProficiencies});
    };

    var handleAbilities = function(data, section) {
        var showList = [];
        if(data["data-Ability Score Increase"]) {
            showList.push(section + "_abilities");
        }
        if(data["data-Ability Score Choice"]) {
            showList.push(section + "_abilities");
            showList.push(section + "_ability_choice1");
            if(data["data-Ability Score Choice"].split("+")[0] == "2") {
                showList.push(section + "_ability_choice2");
            }
        };
        return showList;
    };

    var knownSpells = function(data) {
        var mancerdata = data ? data : getCharmancerData();
        var allSpells = {
            race: false,
            class: false,
            known: [],
            all: [],
            errors: {class: [], race: []}
        };
        var stats = recalcData(data); //since this can get called in the finish step, make sure it doesn't call setAttrs()
        var racename = getName("race", mancerdata, true);
        var subracename = getName("subrace", mancerdata, true);
        var classname = getName("class", mancerdata, true);
        var subclassname = getName("subclass", mancerdata, true);
        var classAbility = mancerdata["l1-class"] && mancerdata["l1-class"].data.class && mancerdata["l1-class"].data.class["Spellcasting Ability"] ? mancerdata["l1-class"].data.class["Spellcasting Ability"] : "";
        var expandedList = {};
        var additionalList = {};
        var blobs = getRelevantBlobs(mancerdata, "1", "l1");

        //First look through all Blobs for any blob.Spells
        _.each(blobs.all, function(blob) {
            if(blob.Spells) {
                var spells = JSON.parse(blob.Spells);
                //Examine each spell to determine if it is "Extended List". "Extended List" adds to the classes spell list.
                //Ravnica Guilds backgrounds such as Dimir Operative are examples of this
                _.each(spells, function(spell) {
                    if(spell["Expanded List"]) {
                        expandedList[spell.Level] = expandedList[spell.Level] ? expandedList[spell.Level].concat(spell["Expanded List"]) : spell["Expanded List"];
                    }
                });
            }
        });
        //Look through blobs.sorted.
        _.each(blobs.sorted, function(sectionblobs, section) {
            //Subclass needs to be changed to class.
            var parentsection = section.replace("sub", "");
            additionalList[parentsection] = additionalList[parentsection] || []
            //Examine eaach blob for "Additional Spell List"
            _.each(sectionblobs, function(blob) {
                if(blob["Additional Spell List"]) {
                    additionalList[parentsection].push(blob["Additional Spell List"]);
                }
            });
        });
        //Process spell data from blobs
        _.each(blobs.sorted, function(sectionblobs, section) {
            var parentsection = section.replace("sub", "");
            _.each(sectionblobs, function(blob) {
                //Looks through the blobs for Spells attribute
                //class.Spells contains the information for how many spells are choosen at each level & Prepared spells to be selected based on ability modifer + 1
                //[subclass, background, race}.Spells will contain KNOWN, CHOSEN, or EXPANDED LIST for extra spells granted by these sections
                if(blob.Spells) {
                    var spells = JSON.parse(blob.Spells);
                    allSpells[parentsection] = allSpells[parentsection] || {known: [], choices: []}
                    _.each(spells, function(spell) {
                        var numSpells = 0;
                        expandedList[spell.Level] = expandedList[spell.Level] || [];
                        //class.Spells will contain Prepared and Choose.
                        //These are used to populate the number of selects needed for each spell lists on the Spells slide
                        if(spell.Prepared) {
                            numSpells = Math.max(stats.totals[spell.Prepared.split("+")[0].toLowerCase()].mod, 0) + parseInt(spell.Prepared.split("+")[1]);
                        }
                        if(spell.Choose) {
                            numSpells = parseInt(spell.Choose);
                        }
                        //If Spells are to be Chosen or Prepared add them to a class list, expand the list, and set the Ability modifier & Level
                        if(numSpells > 0) {
                            _.times(numSpells, function(n) {
                                var thisspell = {Level: parseInt(spell.Level)};
                                thisspell.List = spell.List ? spell.List : classname;
                                thisspell.AddList = additionalList[parentsection];
                                thisspell.Ability = spell.Ability ? spell.Ability : classAbility;
                                if(parentsection == "class") thisspell["Expanded List"] = expandedList[spell.Level];
                                allSpells[parentsection].choices.push(thisspell);
                            });
                        }
                        //Add any spells that are already known from sections such as Forge Domain Cleric starts with identify & searing smite
                        _.each(spell.Known, function(known) {
                            var thisspell = {Name: known, Level: parseInt(spell.Level)};
                            thisspell.Ability = spell.Ability ? spell.Ability : classAbility;
                            thisspell.Source = parentsection;
                            allSpells[parentsection].known.push(thisspell);
                            allSpells.known.push(known);
                            allSpells.all.push(thisspell);
                        });
                    });
                }
            });
        });
        //Collect custom race/subrace spells
        if(mancerdata["l1-race"] && mancerdata["l1-race"].values.custom_race_spell_ability) {
            var raceAbility = mancerdata["l1-race"].values.custom_race_spell_ability;
            var numSpells = mancerdata["l1-race"].values.custom_race_spell_number;
            var spellList = mancerdata["l1-race"].values.custom_race_spell_list;
            if(spellList) {
                allSpells.race = allSpells.race || {known: [], choices: []}
                for(var x=1; x<=numSpells; x++) {
                    var thisSpell = {
                        Ability: raceAbility,
                        Level: 0,
                        List: spellList
                    };
                    allSpells.race.choices.push(thisSpell);
                }
            } else {
                allSpells.errors.race.push("custom_race_spell_list");
            }
        }
        //Collect custom class spells
        if(mancerdata["l1-class"] && mancerdata["l1-class"].values.custom_class_spell_ability) {
            var customAbility = mancerdata["l1-class"].values.custom_class_spell_ability;
            var customList = mancerdata["l1-class"].values.custom_class_spell_list;
            var customSpells = {"0": mancerdata["l1-class"].values.custom_class_cantrip_number, "1": mancerdata["l1-class"].values.custom_class_spell_number};
            if(customList && (customSpells["0"] > 0 || customSpells["1"] > 0)) {
                allSpells.class = allSpells.class || {known: [], choices: []}
                _.each(customSpells, function(number, level) {
                    for(var x=1; x<=number; x++) {
                        var thisSpell = {
                            Ability: customAbility,
                            Level: level,
                            List: customList
                        };
                        allSpells.class.choices.push(thisSpell);
                    }
                });
            } else {
                allSpells.errors.class.push("custom_class_spell_list");
                allSpells.errors.class.push("custom_class_spell_number");
            }
        }
        //Collect custom subclass spells
        if(mancerdata["l1-class"] && mancerdata["l1-class"].values.subclass == "Rules:Classes") {
            var customSpells = {"0": mancerdata["l1-class"].values.custom_subclass_cantrip_number, "1": mancerdata["l1-class"].values.custom_subclass_spell_number};
            if(customSpells["0"] > 0 || customSpells["1"] > 0) {
                allSpells.class = allSpells.class || {known: [], choices: []}
                _.each(customSpells, function(number, level) {
                    var customList = classname.toLowerCase();
                    if(level == "0" && mancerdata["l1-class"].values.custom_subclass_cantrip_list) customList = mancerdata["l1-class"].values.custom_subclass_cantrip_list;
                    if(level == "1" && mancerdata["l1-class"].values.custom_subclass_spell_list) customList = mancerdata["l1-class"].values.custom_subclass_spell_list;
                    for(var x=1; x<=number; x++) {
                        var thisSpell = {
                            Ability: classAbility,
                            Level: level,
                            List: customList
                        };
                        allSpells.class.choices.push(thisSpell);
                    }
                });
            }
        }
        //Collect data from choices
        if(mancerdata["l1-spells"]) {
            _.each(mancerdata["l1-spells"].repeating, function(id) {
                if(mancerdata["l1-spells"].values[id + "_choice"]) {
                    var thisspell = {Name: mancerdata["l1-spells"].values[id + "_choice"].substring(7)};
                    thisspell.Ability = mancerdata["l1-spells"].values[id + "_info"] ? mancerdata["l1-spells"].values[id + "_info"] : classAbility;
                    if(mancerdata["l1-spells"].values[id + "_custom"]) thisspell.Source = mancerdata["l1-spells"].values[id + "_custom"];
                    allSpells.known.push(thisspell.Name);
                    allSpells.all.push(thisspell);
                };
            });
        }
        return allSpells;
    };

    var cleanEquipment = function(equipment) {
        var current_string = "(";
        var hasDouble = false;
        var firstItem = true;
        _.each(equipment, function(item) {
            if (item.search("~DBL") != -1) {
                hasDouble = true;
                item.replace("~DBL","");
            }
            item = item.replace(/"Item Type":(.|)Weapon.*\b/g, "Any Weapon");
            item = item.replace(/Subtype:(.|)Martial.*\b("|)/g, "Any Martial Weapon");
            item = item.replace(/Subtype:(.|)Simple.*\b("|)/g, "Any Simple Weapon");
            item = item.replace(/Subtype:(.|)Artisan's Tools.*\b("|)/g, "A Set of Artisan's Tools");
            item = item.replace(/Subtype:(.|)Gaming Set.*\b("|)/g, "A Gaming Set");
            item = item.replace(/Subtype:(.|)Musical Instrument.*\b("|)/g, "A Musical Instrument");
            if (!firstItem) current_string += " or ";
            current_string += item;
            firstItem = false;
        });
        current_string += ")";
        if (hasDouble) {
            current_string = "two of " + current_string;
        }
        return current_string.replace(/,/g, ", ");
    };

    const removeExpansionInfo = function(text) {
      return text.replace(/\??expansion\=([0-9]+)?/gi, "");
    };

    var removeDuplicatedPageData = function(data) {
       if(!Array.isArray(data)) return data;
       const getPageName = function(item) {
         let category = "";
         if("data" in item && "Category" in item.data) category += item.data["Category"] + ": ";
         return category+item.name;
       }
       let seen = {};
       return data.filter(function(item) {
           let pageName = getPageName(item);
           return seen.hasOwnProperty(pageName) ? false : (seen[pageName] = true);
       })
   };

    var getName = function(request, data, custom) {
        data = data || getCharmancerData();
        var section = request.replace("sub", "");
        var result = "";
        var customString = custom ? "custom" : "";
        if( data["l1-" + section] && data["l1-" + section].values[request] ) {
            result = data["l1-" + section].values[request + "_name"] || data["l1-" + section].values[request];
        }
        result = result.split(":")[0] == "Rules" || result.split(":")[0] == "CategoryIndex" ? customString : result;
        //Removing expansion name from result
        result = removeExpansionInfo(result);
        return _.last(result.split(":"));
    };

    var getGainedSpells = function() {
      let gainedSpells = [];
      const data = getCharmancerData();
      if("lp-spells" in data && "values" in data["lp-spells"]) {
        Object.keys(data["lp-spells"].values).forEach(key => {
          let found = false;
          if(key.indexOf("_checked") === -1) return;
          let spellNameKey = key.replace("_checked", "_name");
          let spellName = data["lp-spells"].values[spellNameKey];
          if(data["lp-welcome"].values.spellinfo) {
            let previousSpells = JSON.parse(data["lp-welcome"].values.spellinfo);
            Object.keys(previousSpells).forEach(spell => {
              if(previousSpells[spell].spellname === spellName) found = true;
            });
          }
          if(!found) gainedSpells.push(spellName);
        });
      }
      return gainedSpells;
    };

    var getGainedFeatures = function() {
      const data = getCharmancerData();
      if(!"lp-levels" in data) return;
      let gainedFeatures = [];
      for(let charclass=1; charclass<=4; charclass++) {
        let levelsGained = data["lp-levels"].values["class"+ charclass +"_addlevel"] || 0;
        if(levelsGained === 0) continue; //No leves gained in this class,  just skip to the next one.

        //Now lets get the features got from each class at LP;
        levelsGained = parseInt(levelsGained);
        let currentLevel = parseInt(data["lp-levels"].values["class"+ charclass +"_currentlevel"]);
        Object.keys(data["lp-levels"].data["class"+charclass].blobs).forEach(feature => {
          let featureLevel = parseInt(data["lp-levels"].data["class"+charclass].blobs[feature]["Level"]);
          if(featureLevel > currentLevel && featureLevel <= (currentLevel+levelsGained)) {
            let sanitizedFeatureName = feature.replace(/\(.+\)/g,"");
            sanitizedFeatureName = sanitizedFeatureName.replace(/ - .+/g,"").trim();
            if("Group" in data["lp-levels"].data["class"+charclass].blobs[feature]) return;
            if("Choice" in data["lp-levels"].data["class"+charclass].blobs[feature]) {
              Object.keys(data["lp-choices"].values).forEach(info => {
                if(data["lp-choices"].values[info] === feature) {
                  let choice = info.replace("_info", "_choice");
                  if(choice in data["lp-choices"].values) {
                    let choiceName = data["lp-choices"].values[choice].replace("Blob:", "");
                    if(gainedFeatures.indexOf(choiceName) === -1) gainedFeatures.push(choiceName);
                  }
                }
              });
            } else {
              if(gainedFeatures.indexOf(sanitizedFeatureName) === -1) gainedFeatures.push(sanitizedFeatureName);
            }
          }
        });
      }
      return gainedFeatures;
    };

    var filterBlobs = function(blobs, filters) {
        var remove = filters.multiclass ? "no" : "yes";
        var results = {};
        delete filters.multiclass;
        delete filters.slide;
        _.each(blobs, function(blob, name) {
            var match = true;
            if(blob.Group && !filters.Group && !filters.name) match = false;
            _.each(filters, function(v, k) {
                if(k == "name") {
                    if(name != v) match = false;
                } else if(v[0] === "<" && !isNaN(parseInt(v.substring(1)))) {
                    let blobval = isNaN(parseInt(blob[k])) ? 0 : parseInt(blob[k]);
                    if(blobval > parseInt(v.substring(1))) match = false;
                } else {
                    if(blob[k] != v) match = false;
                }
            });
            if(match && name.split("(")[0].toLowerCase() != "spell slots") results[name] = blob;
        });
        _.each(results, function(blob, name) {
            if(blob.Multiclass == remove) {
                delete results[name];
            }
        });
        return results;
    };

    var handleBlobs = function(blobs, options) {
        //Old parameters: (blobs, filters, section, element, thisblob)

        //Function to get blob parameter for Spell Pickers like Magical Secrets
        //By Miguel
        const getBlobDescription = function(blob) {
          if("Description" in blob) {
            return blob.Description;
          }
          else if("Traits" in blob) {
            traits = JSON.parse(blob.Traits)[0];
            if("Desc" in traits) return traits.Desc;
          }
          return "";
        }

        const handleProficiencies = function(data, subsection) {
            if(!data) {
                return;
            }
            subsection = subsection ? subsection : element
            _.each(proficiencyList, function(prof) {
                if(data[prof + " Proficiency"]) {
                    addRepeatingSection(subsection, "row", function(rowid) {
                        var json = JSON.parse(data[prof + " Proficiency"]);
                        if(!json.Hidden) {
                            var repupdate = {};
                            repupdate[rowid + " label span"] = json.Title ? json.Title : getTranslationByKey(prof.toLowerCase() + "-proficiencies");
                            if(json.Desc) {
                                repupdate[rowid + " label p"] = json.Desc;
                                if(json.Proficiencies) {
                                    repupdate[rowid + " label p"] += "<br>" + json.Proficiencies.join(", ");
                                }
                            } else if(json.Proficiencies) {
                                repupdate[rowid + " label p"] = json.Proficiencies.join(", ");
                            }
                            setCharmancerText(repupdate);
                        }
                        _.each(json.Choice, function(v) {
                            addRepeatingSection(rowid + " label", "choose", section + "_" + prof.toLowerCase(), function(id) {
                                var choices = "";
                                var settings = {category: "Proficiencies", disable: profdata.all[prof]};
                                if(prof == "Language") {
                                    var customupdate = {};
                                    customupdate[id + " select"] = '<option value="" data-i18n="choose"></option><option class="custom" value="custom" data-i18n="custom"></option>';
                                    setCharmancerText(customupdate);
                                }
                                if(Array.isArray(v)) {
                                    if(v[0].split(":").length > 1) {
                                        choices = "Category:Proficiencies \"Type:" + prof + "\" " + v.shift();
                                        settings.add = v;
                                    } else if (v[0] == "all") {
                                        v.shift();
                                        choices = "Category:Proficiencies \"Type:" + prof + "\"";
                                        settings.add = v;
                                    } else {
                                        choices = v;
                                    }
                                } else {
                                    choices = "Category:Proficiencies \"Type:" + prof + "\"";
                                    if(v != "all" && v != "any") {
                                        console.log("MISSED THE ALL CHECK")
                                        console.log(v);
                                        choices += " " + v;
                                    }
                                }
                                setCharmancerOptions(id + "_choice", choices, settings);
                            });
                        });
                    });
                }
            });
            if(data.Expertise) {
                addRepeatingSection(subsection, "row", function(rowid) {
                    var json = JSON.parse(data.Expertise);
                    if(json.Title) {
                        var repupdate = {};
                        repupdate[rowid + " label span"] = json.Title;
                        setCharmancerText(repupdate);
                    }
                    _.each(json.Choice, function(v) {
                        addRepeatingSection(rowid + " label", "choose", section + "_expertise", function(id) {
                            var choices = "";
                            var settings = {category: "Proficiencies", disable: profdata.all.Expertise};
                            if(v[0].split(":").length > 1) {
                                choices = "Category:Proficiencies \"Type:" + prof + "\" " + v.shift();
                                settings.add = v;
                            } else if (v[0] == "KNOWN") {
                                var info = {};
                                info[id + "_info"] = JSON.stringify(v);
                                setAttrs(info);
                                v.shift();
                                choices = profdata.all.Skill;
                                settings.add = v;
                            } else {
                                choices = v;
                            }
                            setCharmancerOptions(id + "_choice", choices, settings);
                        });
                    });
                });
            }
        };
        const handleTraits = function(blob, subsection, name) {
            var traits = JSON.parse(blob.Traits);
            subsection = subsection ? subsection : element;
            _.each(traits, function(trait) {
                if(trait["Input Spells"]) {
                    addRepeatingSection(subsection, "utilityrow", function(rowid) {
                        let repupdate = {};
                        let set = {};
                        repupdate[`${rowid} label span .sheet-title`] = trait.Name.split("{{")[0];
                        if(!trait.Hide) repupdate[`${rowid} label p`] = trait.Desc;
                        repupdate[`${rowid} button`] = trait["Input Spells"].ButtonText;
                        set[`${rowid}_info`] = JSON.stringify(trait["Input Spells"]);
                        set[`${rowid}_type`] = "trait";
                        set[`${rowid}_blob`] = name;
                        set[`${rowid}_parent`] = options.parent;
                        set[`${rowid}_title`] = trait.Name;
                        set[`${rowid}_desc`] = trait.Desc;
                        setCharmancerText(repupdate);
                        setAttrs(set);
                    });
                } else if(!trait.Hide) {
                    addRepeatingSection(subsection, "row", function(rowid) {
                        let repupdate = {};
                        if(trait.Input) {
                            //Fixing custom data in inputs not being remembered when switching tabs (UC809)
                            //By Miguel
                            const data = getCharmancerData();
                            //The function below looks for valyes through all Mancer data that match a input rowid:
                            const getPreviousInputValue = function(data, rowid) {
                              let parsedId = rowid.match(/-.+_/g)[0];
                              for(let attribute in data) {
                                if(!("values" in data[attribute])) continue;
                                for (let key in data[attribute].values){
                                  if(data[attribute].values.hasOwnProperty(key) && key.indexOf("_input") > -1 && key.indexOf(parsedId) > -1) {
                                    return data[attribute].values[key];
                                  }
                                }
                              }
                              return "";
                            }
                            const previousValue = getPreviousInputValue(data, rowid);
                            repupdate[`${rowid} label span`] = `<input type="text" name="comp_${rowid}_trait_input" value="${previousValue}">`;
                            repupdate[`${rowid} label span`] += `<input type="hidden" name="comp_${rowid}_trait_name" value="${(trait.Name ? trait.Name : "")}">`;
                            repupdate[`${rowid} label span`] += `<input type="hidden" name="comp_${rowid}_trait_desc" value="${(trait.Desc ? trait.Desc : "")}">`;
                            repupdate[`${rowid} label span`] += `<input type="hidden" name="comp_${rowid}_trait_section" value="${section}">`;
                        } else {
                            repupdate[`${rowid} label span`] = trait.Name;
                            repupdate[`${rowid} label p`] = blob.Prerequisite ? "<p class=\"prereq\"><span data-i18n=\"prerequisite:\"></span>" + blob.Prerequisite + "</p>" : "";
                            //Fixing undefined when selecting Ranger Favored Enemy and Land (UC809)
                            //By Miguel
                            repupdate[`${rowid} label p`] += (trait.Desc ? trait.Desc : "");
                        }
                        setCharmancerText(repupdate);
                        handleProficiencies(blob, rowid);
                    });
                };
            });
        };
        const mancerdata = getCharmancerData();
        let filters = options.filters || {};
        let section = options.section || undefined;
        let thisblob = options.thisblob || undefined;
        let element = options.element ? options.element : section + "_holder";
        let sorted = {choices: {}, traits: {}, other: {}, spells: {}};
        let profdata = getProficiencies(mancerdata, options.slide);
        let filtered = {};
        if(thisblob) {
            filtered[thisblob] = blobs[thisblob];
        } else {
            filtered = filterBlobs(blobs, filters);
        }
        _.each(filtered, function(blob, name) {
            if(name.split(" ")[0] == "Proficiencies") {
                sorted.proficiencies = blob;
            } else if (blob["Pick Spells"]) {
                sorted.spells[name] = blob;
            } else if(blob.Choice) {
                sorted.choices[name] = blob;
            } else if(blob.Traits) {
                sorted.traits[name] = blob;
            } else {
                sorted.other[name] = blob;
            }
        });

        handleProficiencies(sorted.proficiencies);
        _.each(sorted.choices, function(blob, name) {
            addRepeatingSection(element, "row", function(rowid) {
                var title = blob.Title ? blob.Title : name;
                var choice = blob.Choice;
                var settings = {};
                let choicenum = blob["Choice Number"] ? parseInt(blob["Choice Number"]) : 1;
                if(blob.Choice.split(":")[0] == "Blob") {
                    choice = Object.keys(filterBlobs(blobs, {Group: blob.Choice.split(":")[1], Level: ("<" + (options.maxlevel || blob.Level))})).sort();
                    settings.category = "Blob";
                }
                var repupdate = {};
                repupdate[rowid + " label span"] = title;
                if(blob.Description) {
                    repupdate[rowid + " label p"] = blob.Description;
                }
                setCharmancerText(repupdate);
                if(section.indexOf("-") === -1) {
                  let match = /[0-9]+$/.exec(section);
                  if(match) {
                    section = [section.slice(0, match.index), "-", section.slice(match.index)].join('');
                    section += "--" + blob.Level;
                  }
                }
                for(let x=1; x<=choicenum; x++) {
                    addRepeatingSection(rowid + " label", "choose", section + "_feature", function(id) {
                        var info = {};
                        info[id + "_info"] = title;
                        setAttrs(info);
                        setCharmancerOptions(id + "_choice", choice, settings, function() {
                            if(mancerdata[options.slide].values[id + "_choice"] && mancerdata[options.slide].values[id + "_choice"].split(":")[0] == "Blob") {
                                handleBlobs(blobs, {
                                    filters: {name: mancerdata[options.slide].values[id + "_choice"].split(":")[1]},
                                    section: section,
                                    element: id + " span",
                                    slide: options.slide,
                                    parent: options.parent
                                });
                            }
                        });
                    });
                }
                handleProficiencies(blob, rowid);
            });
        });
        _.each(sorted.spells, function(blob, name) {
            addRepeatingSection(element, "row", function(rowid) {
                let title = blob.Title ? blob.Title : name;
                let spells = JSON.parse(blob["Pick Spells"]);
                let settings = {};
                let repupdate = {};
                repupdate[rowid + ">label>span"] = title;

                //This used to check for blob.Description which does not exist for Spell Pickers
                //In such case the description is located at blob.Traits.Desc
                //By Miguel
                let description = getBlobDescription(blob);
                if(description.length > 0) {
                    repupdate[rowid + ">label>p"] = description;
                }

                _.each(spells, function(spell) {
                    addRepeatingSection(rowid, "utilityrow", function(rowid) {
                        let repupdate = {};
                        let set = {};
                        repupdate[`${rowid} button`] = spell.ButtonText;
                        set[`${rowid}_info`] = JSON.stringify(spell);
                        set[`${rowid}_type`] = "pick";
                        set[`${rowid}_parent`] = options.parent;
                        set[`${rowid}_blob`] = name;
                        setCharmancerText(repupdate);
                        setAttrs(set);
                    });
                })
                setCharmancerText(repupdate);
                handleProficiencies(blob, rowid);
            });
        });
        _.each(sorted.other, function(blob, name) {
            if(blob.Title || blob.Description) {
                addRepeatingSection(element, "row", function(rowid) {
                    var title = blob.Title ? blob.Title : name;
                    var repupdate = {};
                    repupdate[rowid + " label span"] = "" + title;
                    repupdate[`${rowid} label p`] = blob.Prerequisite ? "<p class=\"prereq\">" + blob.Prerequisite + "</p>" : "";
                    if(blob.Description) repupdate[rowid + " label p"] += blob.Description;
                    setCharmancerText(repupdate);
                    handleProficiencies(blob, rowid);
                });
            } else {
                handleProficiencies(blob);
            }
        });
        _.each(sorted.traits, function(blob, name) {
            var traitsObj = JSON.parse(blob.Traits);
            var title = blob.Title ? blob.Title : name;
            if(blob.Description || traitsObj.length > 1) {
                addRepeatingSection(element, "row", function(rowid) {
                    if(blob.Description || blob.Title) {
                        var repupdate = {};
                        repupdate[rowid + " label span"] = "" + title;
                        if(blob.Description) repupdate[rowid + " label p"] = "" + blob.Description;
                        setCharmancerText(repupdate);
                    }
                    handleTraits(blob, rowid, name);
                    handleProficiencies(blob, rowid);
                });
            } else {
                handleTraits(blob, undefined, name);
            }
        });
    };

    var addCustomSections = function(section) {
        var lower = section.toLowerCase();
        var page = "l1-" + lower.replace("sub", "");
        var mancerdata = getCharmancerData()[page];
        var repids = [];
        var total = 0;
        var current = 0;
        var traits = [];
        var profs = [];
        console.log(mancerdata);
        _.each(mancerdata.repeating, function(repid) {
            if(_.last(repid.split("_")) == "trait") {
                if(mancerdata.values[repid + "_name"] || mancerdata.values[repid + "_desc"]) {
                    var thistrait = {};
                    thistrait.name = mancerdata.values[repid + "_name"] ? mancerdata.values[repid + "_name"] : "";
                    thistrait.desc = mancerdata.values[repid + "_desc"] ? mancerdata.values[repid + "_desc"] : "";
                    traits.push(thistrait);
                    total++;
                }
            }
            if(_.last(repid.split("_")) == "proficiency") {
                if(mancerdata.values[repid + "_type"]) {
                    var thisprof = {};
                    thisprof.type = mancerdata.values[repid + "_type"];
                    thisprof.choice = mancerdata.values[repid + "_choice"] ? mancerdata.values[repid + "_choice"] : "";
                    profs.push(thisprof);
                    total++;
                }
            }
        });
        if(traits.length == 0) {
            traits.push({name: "", desc: ""});
            total++;
        }
        if(profs.length == 0) {
            profs.push({type: "", choice: ""});
            total ++;
        }
        addRepeatingSection(lower + "_holder", "row", "customrow", function(rowid) {
            var toset = {};
            toset[rowid + " label span"] = "Proficiencies";
            repids.push(rowid);
            setCharmancerText(toset);
            _.each(profs, function(prof) {
                addRepeatingSection(rowid, "custom-proficiency", "custom_" + lower + "_proficiency", function(id) {
                    var toset = {};
                    if(prof.type != "") toset[id + "_type"] = prof.type;
                    if(prof.choice != "") toset[id + "_choice"] = prof.choice;
                    setAttrs(toset);
                    current++;
                    repids.push(id);
                    if(current >= total) clearRepeating(repids, page, "customrow");
                });
            });
        });
        addRepeatingSection(lower + "_holder", "row", "customrow", function(rowid) {
            var toset = {};
            toset[rowid + " label span"] = "Custom " + section + " Features";
            repids.push(rowid);
            setCharmancerText(toset);
            _.each(traits, function(trait) {
                addRepeatingSection(rowid, "custom-trait", "custom_" + lower + "_trait", function(id) {
                    var toset = {};
                    if(trait.name != "") toset[id + "_name"] = trait.name;
                    if(trait.desc != "") toset[id + "_desc"] = trait.desc;
                    //update[id + " span"] = trait.name;
                    setAttrs(toset);
                    current++;
                    repids.push(id);
                    if(current >= total) clearRepeating(repids, page, "customrow");
                });
            });
        });
    }

    var clearRepeating = function(repids, page, match) {
        //This function removes all repeating sections that aren't in the repids array (except for the topbar).
        //The optional third argument will only remove certain types of repeating sections
        var mancerdata = getCharmancerData();
        _.each(mancerdata[page].repeating, function(repid) {
            if(_.last(repid.split("_")) != "topbar" && !repids.includes(repid) && (!match || match && repid.includes(match))) clearRepeatingSectionById(repid);
        });
    }

    //This function should be used to read additional hit points gained at first level by things like Draconic Bloodline or Hill Dwarf. Can be possbily be used in the future for Tough feat(?)
    //By Miguel
    var getAdditionalHitPointsFromClassAndRaceAtFirstLevel = function(blobs) {
      let additionalHP = 0;
      blobs.all.map(blob => {
         if("Hit Points Per Level" in blob) {
           additionalHP += parseInt(blob["Hit Points Per Level"]);
         }
      });
      return additionalHP;
    };

    var getRelevantBlobs = function(mancerdata, level, section) {
        var results = [];
        var sorted = {};
        var names = {};
        level = level ? "" + level : "1";
        _.each(mancerdata, function(slide, slidename) {
            if(slidename.split("-")[0] == section) {
                _.each(slide.data, function(data, section) {
                    if(data.blobs) {
                        var levelblobs = _.extend(filterBlobs(data.blobs, {"Level": level}), filterBlobs(data.blobs, {"Level": "every"}));
                        sorted[section] = [];
                        names[section] = [];
                        _.each(levelblobs, function(blob, blobname) {
                            results.push(blob);
                            sorted[section].push(blob);
                            names[section].push(blobname);
                        });
                    };
                });
                _.each(slide.values, function(value, name) {
                    if((value + "").split(":")[0] == "Blob") {
                        var section = name.split("_")[2];
                        var blobs = slide.data[section] && slide.data[section].blobs ? slide.data[section].blobs : [];
                        _.each(filterBlobs(blobs, {"name":value.split(":")[1]}), function(blob, blobname) {
                            results.push(blob);
                            sorted[section] = sorted[section] ? sorted[section] : [];
                            sorted[section].push(blob);
                            names[section] = names[section] ? names[section] : [];
                            names[section].push(blobname);
                        });
                    };
                });
            }
        });
        return {all: results, sorted: sorted, names: names};
    };

    var costOfScore = function(score) {
        if (isNaN(score) || score == 8) {
            return 0;
        }
        var cost = 0;
        if (score > 8) {
            if (score < 14) {
                cost = score - 8;
            } else if (score == 14) {
                cost = 7;
            } else if (score == 15) {
                cost = 9;
            } else {  // Score should never be higher, but let's cover our bases.
                cost = 11;
            }
        }
        return cost;
    };

    var recalcPoints = function() {
        data = getCharmancerData();
        var attribs = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];
        var maxPoints = 27;

        var scores = {};

        _.each(attribs, function(attrib) {
            scores[attrib] = parseInt(data["l1-abilities"].values[attrib]);
            if (isNaN(scores[attrib])) {
                scores[attrib] = 8;
            }
        });

        var pointsAvailable = maxPoints;

        // Decrement points based on selected attribs
        _.each(scores, function(score) {
            if (!isNaN(score)) {
                var cost = costOfScore(score);
                pointsAvailable -= cost;
            }
        });

        // Disable options if points are below a threshold.
        if (pointsAvailable < 9) {
            var choicesToDisable = ["15","14","13","12","11","10","9"];

            _.each(attribs, function(attrib) {
                var toDisableForThisAttrib = []
                _.each(choicesToDisable, function(choice) {
                    if (scores[attrib] <= Number(choice) && (costOfScore(scores[attrib]) + pointsAvailable < costOfScore(Number(choice)))) {
                        toDisableForThisAttrib.push(choice);
                    }
                });
                disableCharmancerOptions(attrib, toDisableForThisAttrib);
            });
        } else {
            _.each(attribs, function(attrib) {
                disableCharmancerOptions(attrib, []);
            });
        }

        _.each(attribs, function(attrib) {
            setCharmancerText({"points_available_display":String(pointsAvailable)});
        });

        return String(pointsAvailable);
    };

    var setRollButton = function(name, data, title, hold) {
        getAttrs(["licensedsheet"], function(v) {
            var set = {};
            var holdstring = hold ? "r" + hold : "";
            title = title || name.split("_")[1];
            title = title[0].toUpperCase() + title.substring(1);
            const licensedsheet      = (v.licensedsheet && v.licensedsheet === "1") ? "licensedsheet" : "";
            if(title == "Personality") title += " Trait";
            var roll = `@{wtype}&{template:mancerroll} {{title=${title}}} {{c1=[[1d${data.length + holdstring}]]}} {{licensedsheet=${licensedsheet}}}`;
            _.each(data, function(trait, x) {
                roll += ' {{option' + (x+1) + '=' + trait + '}}';
            });
            set["roll_" + name + "_roll"] = roll;
            if(!hold) {
                set[name + "_array"] = JSON.stringify({name: title, array: data});
            }
            setAttrs(set);
        });
    };

    /* MAIN CHOICE HANDLING */
    on("mancerchange:race", function(eventinfo) {
        var mancerdata = getCharmancerData();
        getProficiencies(mancerdata, eventinfo.currentStep);
        changeCompendiumPage("sheet-race-info", eventinfo.newValue);
        hideChoices();

        var reset = {};
        if(!(eventinfo.newValue === "" || eventinfo.newValue === undefined)) {
            showChoices(["race_options"]);
        }
        recalcData();

        if(eventinfo.sourceType == "player") {
            reset = {race_ability_choice1: "", race_ability_choice2: "", subrace_ability_choice1: "", subrace_ability_choice2: "", subrace: "", race_name: "", subrace_name: ""};
            _.each(abilityList, function(ability){
                reset["race_custom_" + ability.toLowerCase()] = 0;
                reset["subrace_custom_" + ability.toLowerCase()] = 0;
                reset[ability.toLowerCase() + "_save"] = "";
            });
            reset["custom_race_spell_ability"] = "";
            reset["custom_race_spell_number"] = "1";
            reset["custom_race_spell_list"] = "";
            reset["race_name"] = "";
            reset["subrace_name"] = "";
            reset["has_subrace"] = "";
            clearRepeatingSections("race_holder");
            clearRepeatingSections("subrace_holder");
        }

        if(eventinfo.newValue === "Rules:Races") {
            //Clears saved data for this field
            getCompendiumPage("");
            setAttrs(reset, function() {
                var update = {"race_text": ""};
                var options = eventinfo.sourceType == "player" ? {selected: ""} : {};
                showChoices(["custom_race"]);
                setCharmancerText(update);
                addCustomSections("Race");
                deleteCharmancerData(["l1-feat"]);
            });
        } else {
            getCompendiumPage(eventinfo.newValue, function(p) {
                p = removeDuplicatedPageData(p);
                setAttrs(reset, function() {
                    mancerdata = getCharmancerData();
                    var update = {};
                    var showList = ["race_always", "race_traits"];
                    var possibles = ["race_size", "race_speed", "race_ability_score", "race_traits"];
                    var data = p["data"];

                    _.each(proficiencyList, function(type){
                        possibles.push("race_" + type.toLowerCase() + "s");
                    });
                    _.each(possibles, function(key) {
                        update[key] = "";
                    });

                    if(data["Size"]) {update["race_size"] = data["Size"];};
                    if(data["Speed"]) {update["race_speed"] = data["Speed"];};

                    showList = showList.concat(handleAbilities(data, "race"));
                    if(data["data-Ability Score Increase"]) {
                        var abilityText = [];
                        var json = JSON.parse(data["data-Ability Score Increase"]);
                        _.each(json, function(increase, ability) {
                            abilityText.push(ability + " +" + increase);
                        });
                        update["race_ability_score"] = abilityText.join(", ");
                    }
                    handleBlobs(data.blobs, {filters: {"Level": "1"}, section: "race", slide: "l1-race"});

                    setCharmancerText(update);

                    var race_name = eventinfo.newValue && eventinfo.newValue.split(":").length > 1 && eventinfo.newValue.split(":")[0] === "Races" ? eventinfo.newValue.split(":")[1] : false;
                    race_name = removeExpansionInfo(race_name);
                    if(race_name) {
                        var subOptions = {show_source: true};
                        if(eventinfo.sourceType != "player") {
                            subOptions.silent = true;
                        } else {
                            subOptions.selected = "";
                        }

                        setCharmancerOptions("subrace","Category:Subraces data-Parent:" + race_name, subOptions, function(values) {
                            if (values.length) {
                                setAttrs({"has_subrace": "true"});
                                showChoices(["subrace"]);
                            }
                        });
                    }
                    else {
                        hideChoices(["subrace"]);
                    }

                    showChoices(showList);
                    recalcData();
                });
            });
        }
    });

    on("mancerchange:subrace", function(eventinfo) {
        var mancerdata = getCharmancerData();
        getProficiencies(mancerdata, eventinfo.currentStep);
        changeCompendiumPage("sheet-race-info", eventinfo.newValue);

        var initHide = ["subrace_possible", "custom_trait_2", "custom_trait_3", "custom_trait_4"];
        var reset = {};
        if(eventinfo.newValue === "" || eventinfo.newValue === undefined) {
            initHide.push("subrace_options");
        }
        else {
            showChoices(["subrace_options"]);
        }
        hideChoices(initHide);
        recalcData();
        if(eventinfo.sourceType == "player") {
            reset = {subrace_ability_choice1: "", subrace_ability_choice2: "", subrace_name: ""};
            _.each(abilityList, function(ability){
                reset["race_custom_" + ability.toLowerCase()] = 0;
                reset["subrace_custom_" + ability.toLowerCase()] = 0;
            });
            reset["custom_race_spell_ability"] = "";
            reset["custom_race_spell_number"] = "1";
            reset["custom_race_spell_list"] = "";
            reset["subrace_name"] = "";
            clearRepeatingSections("subrace_holder");
        }

        if(eventinfo.newValue === "Rules:Races") {
            //Clears saved data for this field
            getCompendiumPage("");
            setAttrs(reset, function() {
                var update = {"subrace_text": ""};
                var options = eventinfo.sourceType == "player" ? {selected: ""} : {};
                showChoices(["custom_subrace"]);
                setCharmancerText(update);
                addCustomSections("Subrace");
                deleteCharmancerData(["l1-feat"]);
            });
        } else {
            hideChoices(["custom_subrace"]);
            getCompendiumPage(eventinfo.newValue, function(p) {
                p = removeDuplicatedPageData(p);
                var update = {};
                var showList = ["subrace_choices"];
                var possibles = ["subrace_speed", "subrace_ability_score"];
                var data = p["data"];
                _.each(possibles, function(key) {
                    update[key] = "";
                });

                if(!data["data-Feats"]) deleteCharmancerData(["l1-feat"], function() {recalcData();});

                if(data["Speed"]) {
                    update["subrace_speed"] = data["Speed"];
                    showList.push("subrace_speed_row");
                };

                showList = showList.concat(handleAbilities(data, "subrace"));
                if(data["data-Ability Score Increase"]) {
                    var abilityText = [];
                    var json = JSON.parse(data["data-Ability Score Increase"]);
                    _.each(json, function(increase, ability) {
                        abilityText.push(ability + " +" + increase);
                    });
                    update["subrace_ability_score"] = abilityText.join(", ");
                }
                handleBlobs(data.blobs, {filters: {"Level": "1"}, section: "subrace", slide: "l1-race"});

                setCharmancerText(update);
                showChoices(showList);
                setAttrs(reset);
                recalcData();
            });
        }
    });

    on("mancerchange:class", function(eventinfo) {
        var mancerdata = getCharmancerData();
        getProficiencies(mancerdata, eventinfo.currentStep);
        changeCompendiumPage("sheet-class-info", eventinfo.newValue);
        hideChoices();

        var initHide = ["class_possible", "subclass_choices"];
        var reset = {};
        if(!(eventinfo.newValue === "" || eventinfo.newValue === undefined)) {
            showChoices(["classes_options"]);
        }
        var current = recalcData();

        if(eventinfo.sourceType == "player") {
            reset = {subclass: ""};
            _.each(abilityList, function(ability){
                reset[ability.toLowerCase() + "_save"] = "";
            });
            reset["custom_class_spell_ability"] = "";
            reset["custom_class_cantrip_number"] = "0";
            reset["custom_class_spell_number"] = "0";
            reset["custom_class_spell_list"] = "";
            reset["custom_hit_die"] = "";
            reset["class_name"] = "";
            reset["subclass_name"] = "";
            reset["class_equipment_choice1"] = "";
            reset["class_equipment_choice2"] = "";
            reset["class_equipment_choice3"] = "";
            reset["class_equipment_choice4"] = "";
            clearRepeatingSections("class_holder");
            clearRepeatingSections("subclass_holder");
        }

        if(eventinfo.newValue === "Rules:Classes") {
            //Clears saved data for this field
            getCompendiumPage("");
            setAttrs(reset, function() {
                var update = {"class_text": "", "custom_feature_name": "Class Features"};
                var options = eventinfo.sourceType == "player" ? {selected: ""} : {}
                showChoices(["custom_class"]);
                update["custom_feature_name"] = "Custom Class Features";
                setCharmancerText(update);
                addCustomSections("Class");
            });
        } else {
            getCompendiumPage(eventinfo.newValue, function(p) {
                p = removeDuplicatedPageData(p);
                var update = {};
                var showList = [];
                var data = p["data"];
                var hideList = [];
                handleBlobs(data.blobs, {filters: {"Level": "1"}, section: "class", slide: "l1-class"});

                var class_name = eventinfo.newValue && eventinfo.newValue.split(":").length > 1 && eventinfo.newValue.split(":")[0] === "Classes" ? eventinfo.newValue.split(":")[1] : false;
                class_name = removeExpansionInfo(class_name);
                if(class_name && data["data-Subclass Level"] == 1) {
                    var subOptions = {show_source: true};
                    if(eventinfo.sourceType != "player") {
                        subOptions.silent = true;
                    } else {
                        subOptions.selected = "";
                    }
                    update["subclass_prompt"] = "Choose a " + data["Subclass Name"];
                    setCharmancerOptions("subclass","Category:Subclasses data-Parent:" + class_name, subOptions, function(values) {
                        if (values.length) showChoices(["subclass"]);
                    });
                }
                else {
                    hideList.push("subclass");
                }

                if (data["data-Equipment"]) {
                    showList.push("class_equipment_row");
                    var equipment_string = "";
                    var json = JSON.parse(data["data-Equipment"]);
                    if(json["default"]) {
                        equipment_string += json["default"].join(", ");
                    }
                    for (var i = 1; i < 5; i++) {
                        if(json[i]) {
                            if (!json["default"].length && i == 1) {
                                equipment_string += "";
                            } else {
                                equipment_string += " and ";
                            }

                            equipment_string += cleanEquipment(json[i]);
                        }
                    };
                    update["class_standard_equipment"] = equipment_string;
                }

                setCharmancerText(update);
                showChoices(showList);
                hideChoices(hideList);
                recalcData();
                setAttrs(reset);
            });
        }
    });

    on("mancerchange:subclass", function(eventinfo) {
        var mancerdata = getCharmancerData();
        getProficiencies(mancerdata, eventinfo.currentStep);
        changeCompendiumPage("sheet-class-info", eventinfo.newValue);

        var initHide = ["subclass_possible"];
        var reset = {};
        if(eventinfo.newValue === "" || eventinfo.newValue === undefined) {
            initHide.push("subclass_options");
            initHide.push("custom_subclass");
        }
        else {
            showChoices(["subclass_options"]);
            if(eventinfo.newValue === "Rules:Classes") {
                showChoices(["custom_subclass"]);
            }
            else {
                initHide.push("custom_subclass");
            }
        }
        hideChoices(initHide);
        var current = recalcData();

        if(eventinfo.sourceType == "player") {
            reset["custom_class_spell_ability"] = "";
            reset["custom_class_cantrip_number"] = "0";
            reset["custom_class_spell_number"] = "0";
            reset["custom_class_spell_list"] = "";
            reset["custom_subclass_cantrip_number"] = "0";
            reset["custom_subclass_cantrip_list"] = "";
            reset["custom_subclass_spell_number"] = "0";
            reset["custom_subclass_spell_list"] = "";
            reset["subclass_name"] = "";
            clearRepeatingSections("subclass_holder");
        }

        if(eventinfo.newValue === "Rules:Classes") {
            //Clears saved data for this field
            getCompendiumPage("");
            setAttrs(reset, function() {
                var mancerdata = getCharmancerData();
                var options = eventinfo.sourceType == "player" ? {selected: ""} : {};
                var subclassname = mancerdata["l1-class"].data.class["Subclass Name"];
                showChoices(["custom_subclass"]);
                if(mancerdata["l1-class"].data.class && mancerdata["l1-class"].data.class["Spellcasting Ability"]) {
                    showChoices(["custom_additional_spells"]);
                } else {
                    showChoices(["custom_class_spells"]);
                }
                addCustomSections("Subclass");
            });
        } else {
            hideChoices(["custom_subclass"]);
            getCompendiumPage(eventinfo.newValue, function(p) {
                p = removeDuplicatedPageData(p);
                var data = p["data"];
                handleBlobs(data.blobs, {filters: {"Level": "1"}, section: "subclass", slide: "l1-class"});

                recalcData();
                setAttrs(reset);
            });
        }
    });

    on("mancerchange:background", function(eventinfo) {
        var mancerdata = getCharmancerData();
        getProficiencies(mancerdata, eventinfo.currentStep);
        changeCompendiumPage("sheet-background-info", eventinfo.newValue);

        var initHide = ["background_possible", "custom_background"];
        var reset = {};
        if(eventinfo.newValue === "" || eventinfo.newValue === undefined) {
            initHide.push("backgrounds_options");
        }
        else {
            showChoices(["backgrounds_options"]);
        }
        hideChoices(initHide);
        var current = recalcData();

        if(eventinfo.sourceType == "player") {
            reset = {};
            reset["background_detail_choice"] = "";
            reset["background_personality_choice1"] = "";
            reset["background_personality_choice2"] = "";
            reset["background_ideal_choice"] = "";
            reset["background_bond_choice"] = "";
            reset["background_flaw_choice"] = "";
            reset["custom_background_trait_name"] = "";
            reset["custom_background_trait_desc"] = "";
            clearRepeatingSections("background_holder");
        }

        if(eventinfo.newValue === "Rules:Backgrounds") {
            //Clears saved data for this field
            getCompendiumPage("");
            setAttrs(reset, function() {
                var update = {"background_text": ""};
                var options = eventinfo.sourceType == "player" ? {selected: ""} : {}
                hideChoices(["standardbg"]);
                showChoices(["custom_background"]);
                setCharmancerText(update);
                addCustomSections("Background");
            });
        } else {
            getCompendiumPage(eventinfo.newValue, function(p) {
                p = removeDuplicatedPageData(p);
                var update = {};
                var showList = ["standardbg"];
                var possibles = ["background_feature"];
                var data = p["data"];
                var hideList = [];

                _.each(proficiencyList, function(type){
                    possibles.push("background_" + type.toLowerCase() + "s");
                });
                _.each(possibles, function(key) {
                    update[key] = "";
                });
                handleBlobs(data.blobs, {filters: {"Level": "1"}, section: "background", slide: "l1-background"});

                if (data["data-Background Choices"] && data["data-Background Choices"] != "") {
                    showList.push("background_detail_choice_row");
                    var choices = JSON.parse(data["data-Background Choices"]);
                    showList.push("background_detail_choice");
                    setCharmancerOptions("background_detail_choice", choices, {}, function(opts) {
                        setRollButton("background_detail_choice", opts, data["data-Background Choice Name"]);
                    });
                    update["background_detail_choice_name"] = data["data-Background Choice Name"];
                }
                if(eventinfo.sourceType == "player") {
                    reset["background_detail_choice"] = "";
                }

                if (data["data-Personality Traits"]) {
                    showList.push("background_personality_row");
                    var choices = JSON.parse(data["data-Personality Traits"]);
                    setCharmancerOptions("background_personality_choice1", choices, {}, function(opts) {
                        setRollButton("background_personality_choice1", opts);
                    });
                    setCharmancerOptions("background_personality_choice2", choices, {}, function(opts) {
                        setRollButton("background_personality_choice2", opts);
                    });
                    showList.push("background_personality_choice1");
                    showList.push("background_personality_choice2");
                }
                if (data["data-Ideals"]) {
                    var choices = JSON.parse(data["data-Ideals"]);
                    setCharmancerOptions("background_ideal_choice", choices, {}, function(opts) {
                        setRollButton("background_ideal_choice", opts);
                    });
                    showList.push("background_ideal_choice");
                }
                if (data["data-Bonds"]) {
                    var choices = JSON.parse(data["data-Bonds"]);
                    setCharmancerOptions("background_bond_choice", choices, {}, function(opts) {
                        setRollButton("background_bond_choice", opts);
                    });
                    showList.push("background_bond_choice");
                }
                if (data["data-Flaws"]) {
                    var choices = JSON.parse(data["data-Flaws"]);
                    setCharmancerOptions("background_flaw_choice", choices, {}, function(data) {
                        setRollButton("background_flaw_choice", data);
                    });
                    showList.push("background_flaw_choice");
                }

                if(eventinfo.sourceType == "player") {
                    reset = _.extend(reset, {"background_personality_choice1": "", "background_personality_choice2": "", "background_ideal_choice": "", "background_bond_choice": "", "background_flaw_choice": ""});
                }

                if (data["data-Equipment"]) {
                    showList.push("background_equipment_row");
                    var equipment_string = "";
                    var json = JSON.parse(data["data-Equipment"]);
                    if(json["default"]) {
                        equipment_string += json["default"].join(", ");
                    }
                    for (var i = 1; i < 5; i++) {
                        if(json[i]) {
                            if (!json["default"].length && i == 1) {
                                equipment_string += "";
                            } else {
                                equipment_string += " and ";
                            }

                            equipment_string += cleanEquipment(json[i]);
                        }
                    };
                    update["background_standard_equipment"] = equipment_string;
                }

                var background_name = eventinfo.newValue && eventinfo.newValue.split(":").length > 1 && eventinfo.newValue.split(":")[0] === "Backgrounds" ? eventinfo.newValue.split(":")[1] : false;

                setCharmancerText(update);
                showChoices(showList);
                hideChoices(hideList);
                recalcData();
                setAttrs(reset);
            });
        }
    });

    /* ABILITY SCORE */
    on("page:l1-abilities", function(eventinfo) {
        var data = getCharmancerData();
        getCompendiumPage("Rules:Ability%20Scores", function(p) {
            p = removeDuplicatedPageData(p);
            var pagedata = p["data"];
            var allChoices = [];
            if (pagedata["data-Generation Choices"]) {
                var genChoices = JSON.parse(pagedata["data-Generation Choices"]);
                _.each(genChoices, function(value, choice) {
                    allChoices.push(choice);
                });
            }
            setCharmancerOptions("abilities", allChoices);


            if (data["l1-abilities"] && data["l1-abilities"].values && data["l1-abilities"].values.abilities) {
                setAttrs({"abilities": data["l1-abilities"].values.abilities});
            }
        });
    });

    on("mancerchange:abilities", function(eventinfo) {
        var data = getCharmancerData();
        var initHide = ["abilities_possible"];
        var attribs = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];
        var standardArray = ["8", "10", "12", "13", "14", "15"];
        var pointbuyChoices = ["8", "9", "10", "11", "12", "13", "14", "15"];

        hideChoices(initHide);


        if (data["l1-abilities"].values.abilities == "Standard Array") {
            showChoices(["abilities_stdarray", "abilities_selects"]);
            _.each(attribs, function(attrib) {
                setCharmancerOptions(attrib, standardArray);
            });
        }

        if (data["l1-abilities"].values.abilities == "Roll for Stats") {
            showChoices(["abilities_rollstats"]);
            if (data["l1-abilities"].values.roll_results && data["l1-abilities"].values.roll_results.length) {
                showChoices(["abilities_rollstats_rolled","abilities_selects"]);
                var roll_results = typeof data["l1-abilities"].values.roll_results == "string" ? data["l1-abilities"].values.roll_results.split(",") : data["l1-abilities"].values.roll_results;
                _.each(attribs, function(attrib) {
                    setCharmancerOptions(attrib, roll_results);
                });
            }
        }

        if (data["l1-abilities"].values.abilities == "Point Buy") {
            showChoices(["abilities_pointbuy", "abilities_selects"]);
            setCharmancerText({"points_available_display":data["l1-abilities"].values.pointbuy_points || "27"});
            _.each(attribs, function(attrib) {
                setCharmancerOptions(attrib, pointbuyChoices);
            });
        }

        if (data["l1-abilities"].values.abilities == "custom") {
            showChoices(["abilities_custom"]);
        }

        reset = {};
        if (eventinfo.sourceType == "player") {
            _.each(attribs, function(attrib) {
                reset[attrib] = "";
            });
            reset["pointbuy_points"] = "27"
        }


        recalcData();
        setAttrs(reset);
    });

    on("mancerchange:strength mancerchange:dexterity mancerchange:constitution mancerchange:intelligence mancerchange:wisdom mancerchange:charisma", function(eventinfo) {
        data = getCharmancerData();
        var attribs = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];
        var clearvalue = eventinfo.newValue;
        var clearObject = {
                strength: data["l1-abilities"].values.strength,
                dexterity: data["l1-abilities"].values.dexterity,
                constitution: data["l1-abilities"].values.constitution,
                intelligence: data["l1-abilities"].values.intelligence,
                wisdom: data["l1-abilities"].values.wisdom,
                charisma: data["l1-abilities"].values.charisma};

        if (data["l1-abilities"].values.abilities != "custom" && data["l1-abilities"].values.abilities != "Point Buy") {
            attribs = _.reject(attribs, function(item) { return item == eventinfo.triggerName; });
            _.each(attribs, function(attrib) {
                if (clearvalue == clearObject[attrib]) {
                    clearObject[attrib] = "";
                }
            });
        }

        if (data["l1-abilities"].values.abilities == "Point Buy") {
            clearObject.pointbuy_points = recalcPoints();
        }

        if (eventinfo.sourceType == "player") {
            setAttrs(clearObject);
        }
        recalcData();
    });

    on("mancerroll:rollstats", function(eventinfo) {
        var attribs = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];
        var results = [];
        var i = 1;
        _.each(eventinfo.roll, function(roll) {
            results.push(roll.result + "~" + i);
            i++;
        });
        results.sort(function(a,b) {return Number(a.split("~")[0]) - Number(b.split("~")[0])});
        _.each(attribs, function(attrib) {
            setCharmancerOptions(attrib, results);
        });
        setAttrs({roll_results: results, strength: "", dexterity: "", constitution: "", intelligence: "", wisdom: "", charisma: ""});
        showChoices(["abilities_rollstats_rolled","abilities_selects"]);
    });

    on("clicked:clearstats", function(eventinfo) {
        var data = getCharmancerData();
        var attribs = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];
        reset = {};
        _.each(attribs, function(attrib) {
            reset[attrib] = "";
            disableCharmancerOptions(attrib, []);
        });

        setAttrs(reset);
    });

    /* EQUIPMENT */
    on("page:l1-equipment", function(eventinfo) {
        getAttrs(["licensedsheet"], function(v) {
            var data = getCharmancerData();
            var class_string = getName("class", data, true);
            var background_string = getName("background", data, true);
            var class_equipment = data && data["l1-equipment"] && data["l1-equipment"].values.equipment_class ? data["l1-equipment"].values.equipment_class : undefined;
            var background_equipment = data && data["l1-equipment"] && data["l1-equipment"].values.equipment_background ? data["l1-class"].values.equipment_background : undefined;
            var update = {};
            var update_attr = {};
            var showList = [];
            var hideList = [];
            var allBlobs = getRelevantBlobs(data, "1", "l1");
            var equipmentType = data["l1-equipment"] && data["l1-equipment"].values.equipment_type ? data["l1-equipment"].values.equipment_type : "";
            const licensedsheet      = (v.licensedsheet && v.licensedsheet === "1") ? "licensedsheet" : "";
            var handleChoices = function(type) {
                var equipment = {};
                if(data["l1-" + type] && data["l1-" + type].data[type] && data["l1-" + type].data[type]["data-Equipment"]) {
                    equipment = data["l1-" + type].data[type]["data-Equipment"];
                };
                if(allBlobs.sorted[type]) {
                    _.each(allBlobs.sorted[type], function(blob) {
                        if(blob.Equipment) {
                            var blobstuff = blob.Equipment;
                            try {
                                blobstuff = JSON.parse(blob.Equipment);
                            } catch (e) {}
                            equipment.default = equipment.default ? equipment.default.concat(blobstuff) : blobstuff;
                        }
                    });
                };
                _.each(equipment, function(feature, num) {
                    if(num === "default") {
                        update[type + "_equipment"] = feature.join(", ");
                    } else {

                        var dynamic_items = "Category:None";
                        var static_items = [];
                        var hasDouble = false;
                        var doubleOffset = 4;
                        var equipmentTitle = cleanEquipment(feature).replace(/^\w/, function(char) { return char.toUpperCase(); }).replace(/(^\(|\)$)/g, "");
                        if (equipmentTitle.search("Two of") == 0) {
                            equipmentTitle += ")";
                        }
                        update[type + "_equipment_choice" + num + "_title"] = equipmentTitle;
                        _.each(feature, function(f) {
                            if(f.indexOf("Subtype:") > -1) {
                                dynamic_items = 'Category:Items "Item Rarity":Standard ' + f.split("~")[0];
                            } else if (f.indexOf("*Weapon") > -1) {
                                dynamic_items = 'Category:Items "Item Rarity":Standard ' + f.split("~")[0];
                            } else {
                                static_items.push(f);
                            }
                            if (f.split("~")[1] && f.split("~")[1] == "DBL") {
                                hasDouble = true;
                            }
                        });
                        if (hasDouble) {
                            showList.push(type + "_equipment_choice" + num + "_double");
                            var doubleChoiceNum = parseInt(num) + doubleOffset;
                            setCharmancerOptions(type + "_equipment_choice" + doubleChoiceNum, dynamic_items, {add:static_items, category:"Items"});
                        } else {
                            hideList.push(type + "_equipment_choice" + num + "_double");
                        }
                        setCharmancerOptions(type + "_equipment_choice" + num, dynamic_items, {add: static_items, category:"Items"});
                        showList.push(type + "_equipment_choice" + num);
                    }
                });
            };
            recalcData();

            if(class_string) {
                showList.push("has_class");
                update["class_label"] = class_string;
                update_attr["equipment_class"] = class_string;
                if(class_equipment && class_equipment != class_string) {
                    update["starting_gold_btn_label"] = "";
                    update["class_equipment"] = "";
                    update_attr["starting_gold"] = 0;
                    update_attr["equipment_type"] = "";
                    equipmentType = "";
                    update_attr["class_equipment_choice1"] = "";
                    update_attr["class_equipment_choice2"] = "";
                    update_attr["class_equipment_choice3"] = "";
                    update_attr["class_equipment_choice4"] = "";
                    update_attr["class_equipment_choice5"] = "";
                    update_attr["class_equipment_choice6"] = "";
                    update_attr["class_equipment_choice7"] = "";
                    update_attr["class_equipment_choice8"] = "";
                };

                if(class_string == "custom") {
                    update_attr["equipment_type"] = "gold";
                    hideList.push("equipment_type", "random_gold_option")
                    showList.push("custom_class_gold", "gold_option", "eqp_custom_class");
                } else {
                    handleChoices("class");
                    var startingGold = data["l1-class"].data.class && data["l1-class"].data.class["Starting Gold"] ? data["l1-class"].data.class["Starting Gold"] : false;
                    if(startingGold) {
                        update["starting_gold_btn_label"] = startingGold;
                        update_attr["roll_starting_gold"] = `@{wtype}&{template:mancerroll} {{title=Starting Gold}} {{r1=[[${startingGold.replace("x", "*")}]]}} {{licensedsheet=${licensedsheet}}}`;
                        showList.push("random_gold_option");
                    } else {
                        update_attr["roll_starting_gold"] = `@{wtype}&{template:mancerroll} {{title=Starting Gold}} {{r1=[[0]]}} {{licensedsheet=${licensedsheet}}}`;
                        update_attr["equipment_type"] = "class";
                        equipmentType = "class";
                        hideList.push("equipment_type", "gold_option");
                        showList.push("class_option", "no_gold_option");
                    }
                }
            } else {
                showList.push("no_class");
            };

            if(background_string) {
                update["background_label"] = background_string;
                update_attr["equipment_background"] = background_string;
                if(background_string != "custom") {
                    handleChoices("background");
                }
                if(data["l1-equipment"] && data["l1-equipment"].values.equipment_type || class_string == "custom") {
                    if(data["l1-equipment"] && equipmentType == "class" || class_string == "custom") {
                        showList.push("has_background");
                        if(background_equipment && background_equipment != background_string) {
                            update["background_equipment"] = "";
                            update_attr["background_equipment_choice1"] = "";
                            update_attr["background_equipment_choice2"] = "";
                            update_attr["background_equipment_choice3"] = "";
                            update_attr["background_equipment_choice4"] = "";
                        };
                    }
                    if(data["l1-equipment"] && equipmentType == "gold" && class_string != "custom") {
                        showList.push("background_chose_starting_gold");
                    }
                }
            } else {
                showList.push("no_background");
            }

            if(equipmentType === "" || equipmentType === undefined) {
                hideList.push("gold_option", "class_option");
            } else if(equipmentType === "gold") {
                if(background_string) showList.push("background_gold_option");
                showList.push("gold_option");
                hideList.push("class_option");
            } else if(equipmentType === "class") {
                showList.push("class_option");
                hideList.push("gold_option");
            }

            showChoices(showList);
            hideChoices(hideList);
            setCharmancerText(update);
            setAttrs(update_attr);
        });
    });

    on("mancerchange:equipment_type", function(eventinfo) {
        var showList = [];
        var hideList = [];
        var update = {};
        var reset = {};
        var data = getCharmancerData();
        var class_string = getName("class", data, true);
        var background_string = getName("background", data, true);
        if(eventinfo.sourceType == "player") {
            if(eventinfo.newValue === "" || eventinfo.newValue === undefined) {
                hideList.push("gold_option", "class_option", "background_gold_option");
            } else if(eventinfo.newValue === "gold") {
                if(background_string) showList.push("background_gold_option");
                if(class_string != "custom") showList.push("random_gold_option")
                showList.push("gold_option");
                hideList.push("class_option");
            } else if(eventinfo.newValue === "class") {
                showList.push("class_option");
                hideList.push("gold_option", "background_gold_option");
            }
        }
        showChoices(showList);
        hideChoices(hideList);
    });

    on("mancerroll:starting_gold", function(eventinfo) {
        setAttrs({starting_gold: eventinfo.roll[0].result});
    });

    /* REPEATING SECTION LISTENERS */
    on("mancerchange:repeating_row", function(eventinfo) {
      var mancerdata = getCharmancerData();
      var proficiencies = getProficiencies(mancerdata, eventinfo.currentStep);
      var section = eventinfo.sourceSection.split("_")[2].split("-")[0].replace(/[0-9]+$/gm, "");
      var type = eventinfo.sourceSection.split("_")[3];
      var sourcepage = eventinfo.currentStep;
      if(eventinfo.currentStep.split("-")[0] == "lp") {
          var sectioninfo = eventinfo.sourceSection.split("_")[2].split("--")[0];
          if(sectioninfo.indexOf("-") === -1) {
            let index = sectioninfo.indexOf(section) + section.length;
            sectioninfo = [sectioninfo.slice(0, index), "-", sectioninfo.slice(index)].join('');
          }
          sectioninfo = sectioninfo.split("-");
          if(sectioninfo.length > 1) {
              sourcepage = "lp-levels";
              section = "class" + sectioninfo[1];
              if(sectioninfo[0] == "subclass") section += "_subclass";
          } else {
              sourcepage = "lp-welcome";
              section = "lp-" + sectioninfo[0];
          }
      }
        var pagedata = mancerdata[sourcepage].data[section];
        if(_.last(eventinfo.sourceAttribute.split("_")) == "choice") {
            if(type == "feature") {
                if(eventinfo.previousValue !== eventinfo.newValue){
                    clearRepeatingSections(eventinfo.sourceSection + " span");
                    if(eventinfo.newValue.split(":")[0] == "Blob") {
                        console.log(pagedata.blobs[eventinfo.newValue.split(":")[1]]);
                        if(pagedata.blobs[eventinfo.newValue.split(":")[1]]["Pick Spells"] || pagedata.blobs[eventinfo.newValue.split(":")[1]].Spells) {
                            deleteCharmancerData(["lp-spells"]);
                        }
                        handleBlobs(pagedata.blobs, {
                            filters: {name: eventinfo.newValue.split(":")[1]},
                            section: section,
                            element: eventinfo.sourceSection + " span",
                            slide: eventinfo.currentStep,
                            parent: section
                        });
                    }
                }
            }
            if(eventinfo.newValue == "custom") {

                showChoices(["custom[name=comp_" + eventinfo.sourceSection + "_custom]"]);
            } else {
                var toset = {};
                hideChoices(["custom[name=comp_" + eventinfo.sourceSection + "_custom]"]);
                toset[eventinfo.sourceSection + "_custom"] = "";
                setAttrs(toset);
            }
        }
    });

    on("mancerchange:repeating_row", function(eventinfo) {
      if(eventinfo.currentStep !== "lp-choices") return;
      if(eventinfo.sourceAttribute.indexOf("feature_choice") === -1 && eventinfo.sourceAttribute.indexOf("feature_info") === -1) return;

      const data = getCharmancerData();
      const traits = JSON.parse(data["lp-welcome"].values.previous_repeating).traits || [];
      const singleSelectionTraits = [
        {group: "Maneuvers", single: "Maneuver" }
      ]; //Types of traits that can be taken only once.
      let traitsAlreadyTaken = [];

      //Read the current type of a trait
      const currentTrait = data["lp-choices"].values[eventinfo.sourceAttribute.replace("_choice", "_info")] || "";
      const traitIndex = singleSelectionTraits.map(trait => { return trait.group; }).indexOf(currentTrait);

      //Return if the trait is not among the ones set for single selection.
      if(traitIndex === -1) return;

      //Get single item type
      const traitType = singleSelectionTraits[traitIndex].single + ": ";

      const getRelevantChoices = function(data, choiceType) {
        const choices = data["lp-choices"].values || [];
        let relevantChoices = [];
        for(choice in choices) {
          if(choice.indexOf("_info") === -1) continue;
          if(choices[choice] === choiceType) relevantChoices.push(choice.replace("_info", ""));
        }
        return relevantChoices;
      };

      //Reading traits set in previous Levels
      for(trait in traits) {
        if(traits[trait].name.indexOf(traitType) > -1) {
          const selectedTrait = traits[trait].name.replace(traitType, "");
          traitsAlreadyTaken.push("Blob:" + selectedTrait);
        }
      }

      //Handling traits choosen at current LP
      const choices = getRelevantChoices(data, singleSelectionTraits[traitIndex].group);
      for(choice in choices) {
        if(choices[choice]+"_choice" in data["lp-choices"].values) {
          traitsAlreadyTaken.push(data["lp-choices"].values[choices[choice]+"_choice"]);
        }
      }

      //Disable elements
      for(choice in choices) {
        //Enables all options
        disableCharmancerOptions(choices[choice]+"_choice", "");
        //Disable maneuvers arealdy selected at lv1 or during current LP
        disableCharmancerOptions(choices[choice]+"_choice", traitsAlreadyTaken);
      }
    });

    on("mancerchange:repeating_spellrow", function(eventinfo) {
        if(eventinfo.sourceType == "player") {
            changeCompendiumPage("sheet-spells-info", eventinfo.newValue, "card_only");
        }
        var mancerdata = getCharmancerData();
        var known = knownSpells().known;
        _.each(mancerdata["l1-spells"].repeating, function(id) {
            disableCharmancerOptions(id + "_choice", known, {category: "Spells"});
        });
    });

    //D&D 5e: Charactermancer Lvl+ Druid, Circle of Land feedback improvement (UC811)
    //Land druids used to be able to change multiple lands once they levelup. This goes against the rules. This is a fix for that issue.
    //By Miguel
    on("mancerchange:repeating_row", function(eventinfo) {
      const featureName = "Circle Spells";
      const feedback = "You must choose your Circle Land at 3rd level";

      const data = getCharmancerData();
      //First we detect if this is circle spell, otherwise return.
      if(eventinfo.currentStep !== "lp-choices") return;
      if(eventinfo.sourceAttribute.indexOf("feature_choice") === -1 && eventinfo.sourceAttribute.indexOf("feature_info") === -1) return;
      if(!eventinfo.sourceSection+"_info" in data["lp-choices"].values || !data["lp-choices"].values[eventinfo.sourceSection+"_info"] === featureName) return;

      const previousRepeating = JSON.parse(data["lp-welcome"].values.previous_repeating);
      const previousTraits = previousRepeating.traits;
      const initialCircleTrait = previousTraits.findIndex(item => item.name.indexOf(featureName+": ") > -1);

      //A land was had not been selected yet when Mancer was started (Ex: Levelling from LV 1st to 5th)
      if(!(/repeating_-.+_subclass-.+--[^3]+_feature/g).test(eventinfo.sourceSection)) {
        const choices = data["lp-choices"].values;
        for(choice in choices) {
          if(choices[choice] === featureName) {
            //Set all non 3rd level pickers to the choose value
            if((/repeating_-.+_subclass-.+--[^3]+_feature/g).test(choice) && choice.indexOf("_info") > -1 && choices[choice] === featureName) {
              const pickerClass = choice.replace("_info", "_choice");
              const currentValue = eventinfo.newValue.replace("Blob:", "");
              const initialLand = currentValue.replace(featureName, "").trim();
              const choiceLevel = choice.match(/--./)[0].replace("--", "");
              const choiceValue = initialLand + " " + featureName + "(" + choiceLevel + ")";
              if((eventinfo.newValue === "" || eventinfo.newValue === featureName) && eventinfo.previousValue !== feedback) {
                setCharmancerOptions(pickerClass, [feedback], { selected: feedback }, function() {
                  disableCharmancerOptions(pickerClass, [""]);
                });
              } else {
                setCharmancerOptions(pickerClass, [choiceValue], { category: "Blob", selected: "Blob:"+choiceValue }, function() {
                  disableCharmancerOptions(pickerClass, [""]);
                });
              }
            }
          }
        }
        return;
      }
      //A land was already selected when Mancer was started (Ex: Levelling from LV 3rd to 5th)
      else if(initialCircleTrait > -1) {
        const initialLand = previousTraits[initialCircleTrait].name.replace(featureName+": ", "");
        const choiceLevel = eventinfo.sourceSection.match(/--./)[0].replace("--", "");
        const choiceValue = initialLand + " " + featureName + "(" + choiceLevel + ")";
        const choiceClass = eventinfo.sourceSection+"_choice";
        setCharmancerOptions(choiceClass, [choiceValue], { category: "Blob", selected: "Blob:"+choiceValue }, function() {
          disableCharmancerOptions(choiceClass, [""]);
        });
      }
    });

    on("clicked:repeating_spellrow", function(eventinfo) {
        var spell_name = "";
        var data = getCharmancerData();
        var card = "card_only";
        if(_.last(eventinfo.sourceSection.split("_")) == "spellrow") {
            spell_name = data["l1-spells"].values[eventinfo.sourceAttribute];
        } else {
            spell_name = data["l1-spells"].values[eventinfo.sourceSection + "_choice"] ? data["l1-spells"].values[eventinfo.sourceSection + "_choice"] : "Rules:Spells";
            card = data["l1-spells"].values[eventinfo.sourceSection + "_choice"] ? card : "";
        }
        changeCompendiumPage("sheet-spells-info", spell_name, card);
    });

    on("mancerchange:repeating_customrow", function(eventinfo) {
        var mancerdata = getCharmancerData();
        var profdata = getProficiencies(mancerdata, eventinfo.currentStep);
        if(eventinfo.sourceAttribute.substr(-10) == "trait_name") {
            var update = {};
            update[eventinfo.sourceSection + " span"] = eventinfo.newValue;
            setCharmancerText(update);
        }
        if(_.last(eventinfo.sourceSection.split("_")) == "proficiency") {
            if(_.last(eventinfo.sourceAttribute.split("_")) == "type") {
                var update = {};
                var prof = eventinfo.newValue;
                var choices = prof == "" ? [] : "Category:Proficiencies \"Type:" + prof + "\"";
                var settings = {category: "Proficiencies", disable: profdata.all[prof]};
                update[eventinfo.sourceSection + " span + select"] = '<option value="" data-i18n="choose"></option>';
                if(prof == "Language") update[eventinfo.sourceSection + " span + select"] += '<option class="custom" value="custom" data-i18n="custom"></option>';
                update[eventinfo.sourceSection + " span"] = eventinfo.newValue;
                setCharmancerText(update);
                if(prof == "") {
                    var toset = {};
                    toset[eventinfo.sourceSection + "_choice"] = "";
                    toset[eventinfo.sourceSection + "_custom"] = "";
                    setAttrs(toset);
                    hideChoices(["custom[name=comp_" + eventinfo.sourceSection + "_custom]"]);
                } else {
                    setCharmancerOptions(eventinfo.sourceSection + "_choice", choices, settings);
                }
            } else if(_.last(eventinfo.sourceAttribute.split("_")) == "choice") {
                if(eventinfo.newValue == "custom") {
                    showChoices(["custom[name=comp_" + eventinfo.sourceSection + "_custom]"]);
                } else {
                    var toset = {};
                    hideChoices(["custom[name=comp_" + eventinfo.sourceSection + "_custom]"]);
                    toset[eventinfo.sourceSection + "_custom"] = "";
                    setAttrs(toset);
                }
            }
        }
    });

    on("clicked:repeating_customrow", function(eventinfo) {
        var mancerdata = getCharmancerData();
        getRepeatingSections(function(repeating) {
            var target = "";
            var section = eventinfo.sourceSection.split("_")[3]
            var type = _.last(eventinfo.sourceSection.split("_"));
            _.each(repeating.tree, function(branch, parentid) {
                _.each(branch, function(child, childid) {
                    if(childid == eventinfo.sourceSection) target = parentid;
                });
            });
            addRepeatingSection(target, "custom-" + type, "custom_" + section + "_" + type);
        });
    });

    on(customListeners, function(eventinfo) {
        var mancerdata = getCharmancerData();
        var num = parseInt(eventinfo.triggerName.substr(-1));
        var base = eventinfo.triggerName.slice(0, -1);
        var section = eventinfo.triggerName.split("_")[0].replace("sub", "");
        if(mancerdata["l1-" + section].values[base.split("_")[0]]
            && ["Rules", "CategoryIndex"].indexOf(mancerdata["l1-" + section].values[base.split("_")[0]].split(":")[0]) != -1
            && eventinfo.newValue) {
            showChoices([base + (num+1)]);
        }
    });

    on(changeListeners, function(eventinfo) {
        recalcData();
    });

    on("mancerchange:custom_race_spell_ability mancerchange:custom_class_spell_ability", function(eventinfo) {
        var section = eventinfo.triggerName.split("_")[1];
        if(eventinfo.newValue) {
            showChoices(["custom_spellcasting"]);
        } else {
            var set = {}
            set["custom_" + section + "_spell_number"] = "1";
            set["custom_" + section + "_cantrip_number"] = "1";
            set["custom_" + section + "_spell_list"] = "";
            setAttrs(set);
            hideChoices(["custom_spellcasting"]);
        }
    });

    on("page:l1-welcome page:l1-class page:l1-race page:l1-abilities page:l1-background page:l1-equipment page:l1-spells page:l1-feat page:l1-bio page:l1-summary", function(eventinfo) {
        var mancerdata = getCharmancerData();
        var buttons = "";
        var buttoninfo = {
            welcome: "charmancer-start",
            race: "race-u",
            class: "class-u",
            abilities: "abilities-u",
            background: "background-u",
            equipment: "equipment-u",
            spells: "spells-u",
            feat: "feats-u",
            bio: "bio-u",
            summary: "review-u"
        }
        _.each(buttoninfo, function(translation, page) {
            var here = "l1-" + page == eventinfo.triggerName;
            buttons += "<li><button class=\"step" + (here ? " here" : "") + "\" type=\"" + (here ? "here" : "back") + "\" value=\"l1-" + page + "\" data-i18n=\"" + translation + "\"></button></li>";
        });
        buttons += "<li><button class=\"exit\" type=\"action\" name=\"act_cancel\" data-i18n=\"cancel-u\">CANCEL</button></li>";
        setCharmancerText({steps: buttons});
        if(eventinfo.triggerName != "l1-welcome") {
            addRepeatingSection("topbar-holder", "topbar");
            recalcData();
            getProficiencies(mancerdata, eventinfo.currentStep);
        }
        getAttrs(["licensedsheet"], function(v) {
            if("licensedsheet" in v && v.licensedsheet === "1") {
                setCharmancerText({"sheet-licensedsheet-flag":"true"}); 
            }
        });
    });

    on("mancerchange:class_feature_choice_1 mancerchange:class_feature_choice_2", function(eventinfo) {
        var data = getCharmancerData();
        var featureNum = _.last( eventinfo.triggerName.split("_") );
        var update = {};
        var set = {};
        set["class_feature_choice_" + featureNum + "_desc"] = "";
        if(eventinfo.newValue) {
            getCompendiumPage(data["l1-class"].values.class, function(p) {
                p = removeDuplicatedPageData(p);
                var data = p["data"];
                if(data["data-Feature Choices"]) {
                    var feature = JSON.parse(data["data-Feature Choices"])[featureNum-1];
                    var featureName = feature.Name;
                    var offset = 3;

                    if (eventinfo.newValue.split("~")[1] && eventinfo.newValue.split("~")[1] == "DBL") {
                        showChoices(["class_feature_row_" + featureNum + "_manual"]);
                        // var doubleChoiceNum = featureNum + offset;
                        // setCharmancerOptions("class_feature_choice_" + doubleChoiceNum, [eventinfo.newValue]);
                    } else {
                        hideChoices(["class_feature_row_" + featureNum + "_manual"]);
                    }
                    if(data["data-" + featureName + " Data"]) {
                        var json = JSON.parse(data["data-" + featureName + " Data"]);
                        var selected = _.findWhere(json, {Name: eventinfo.newValue});
                        if(selected) {
                            update["class_feature_description_" + featureNum] = selected.Desc;
                            set["class_feature_choice_" + featureNum + "_desc"] = selected.Desc;
                            setAttrs(set);
                            setCharmancerText(update);
                        }
                    }
                }
            });
        } else {
            update["class_feature_description_" + featureNum] = "";
            setAttrs(set);
            setCharmancerText(update);
        }
    });

    on("mancerchange:custom_subclass_cantrip_number mancerchange:custom_subclass_spell_number", function(eventinfo) {
        var section = eventinfo.triggerName.split("_")[2];
        if(eventinfo.newValue && eventinfo.newValue > 0) {
            showChoices(["custom_" + section + "_list"]);
        } else {
            var reset = {};
            reset["custom_subclass_" + section + "_list"] = "";
            hideChoices(["custom_" + section + "_list"]);
            setAttrs(reset);
        }
    });

    on("mancerchange:background_personality_choice1 mancerchange:background_personality_choice2", function(eventinfo) {
        var mancerdata = getCharmancerData();
        var choices = [];
        if(mancerdata["l1-background"].values["background_personality_choice1"]) choices.push(mancerdata["l1-background"].values["background_personality_choice1"]);
        if(mancerdata["l1-background"].values["background_personality_choice2"]) choices.push(mancerdata["l1-background"].values["background_personality_choice2"]);
        disableCharmancerOptions("background_personality_choice1", choices);
        disableCharmancerOptions("background_personality_choice2", choices);
    });

    on("mancerroll:background_detail_choice_roll mancerroll:background_personality_choice1_roll mancerroll:background_personality_choice2_roll mancerroll:background_ideal_choice_roll mancerroll:background_bond_choice_roll mancerroll:background_flaw_choice_roll", function(eventinfo) {
        var data = getCharmancerData();
        var index = eventinfo.roll[0].dice[0] - 1;
        var baseName = eventinfo.triggerName.split(":")[1].slice(0,-5);
        var choices = JSON.parse(data["l1-background"].values[baseName + "_array"]);
        setCharmancerOptions(baseName, choices.array, {selected: choices.array[index]});
        if(baseName.slice(0, -1) == "background_personality_choice") {
            var num = baseName.substr(-1) == "1" ? "2" : "1";
            setRollButton(baseName.slice(0, -1) + num, choices.array, choices.name, index + 1);
        }
    });

    on("clicked:cancel", function() {
        showChoices(["cancel-prompt"]);
        var data = getCharmancerData();
        console.log(data);
        //console.log(recalcData(data));
        //console.log(getProficiencies(data, "finish"));
        //console.log(getRelevantBlobs(data, "1", "l1"));
    });

    on("clicked:continue", function() {
        hideChoices(["cancel-prompt"]);
    });

    on("page:l1-spells", function(eventinfo) {
        var stats = recalcData();
        var mancerdata = getCharmancerData();
        var spellData = knownSpells();
        var set = {};
        var titles = {};
        var sorted = {};
        var repids = [];
        var totalchoices = 0;
        var racename = getName("race", mancerdata, true);
        var subracename = getName("subrace", mancerdata, true);
        var classname = getName("class", mancerdata, true);
        var subclassname = getName("subclass", mancerdata, true);
        set["race_spells"] = racename + subracename;
        set["class_spells"] = classname + subclassname;
        set["race_number"] = spellData.race ? spellData.race.choices.length : 0;
        set["class_number"] = spellData.class ? spellData.class.choices.length : 0;

        subracename = getName("subrace", mancerdata) == "" ? "" : " - " + getName("subrace", mancerdata);
        subclassname = getName("subclass", mancerdata) == "" ? "" : " - " + getName("subclass", mancerdata);
        setAttrs(set, function() {
            spellData = knownSpells();
            titles["race"] = getName("race", mancerdata) + subracename;
            titles["class"] = getName("class", mancerdata) + subclassname;

            _.each(["race", "class"], function(section) {
                if(spellData[section]) {
                    _.each(spellData[section].known, function(spell) {
                        sorted[spell.Level] = sorted[spell.Level] ? sorted[spell.Level] : {};
                        sorted[spell.Level][section] = sorted[spell.Level][section] ? sorted[spell.Level][section] : {known: [], choices: []};
                        sorted[spell.Level][section].known.push(spell.Name);
                    });
                    _.each(spellData[section].choices, function(spell) {
                        sorted[spell.Level] = sorted[spell.Level] ? sorted[spell.Level] : {};
                        sorted[spell.Level][section] = sorted[spell.Level][section] ? sorted[spell.Level][section] : {known: [], choices: []};
                        sorted[spell.Level][section].choices.push(spell);
                    });
                }
            });
            //This is just to get the total number of repeating sections we need. when we've added enough, erase the rest
            _.each(sorted, function(spellarray, level) {
                _.each(spellarray, function(spells, section) {
                    totalchoices++;
                    _.each(spells.choices, function(spell) {
                        totalchoices++;
                    });
                });
            });
            _.each(sorted, function(spellarray, level) {
                _.each(spellarray, function(spells, section) {
                    addRepeatingSection("spell_holder", "row", "spellrow", function(rowid) {
                        var repupdate = {};
                        var knownspells = [];
                        var toset = {};
                        repupdate[rowid + " label span"] = level == 0 ? titles[section] + " Cantrips" : titles[section] + " Level " + level;
                        _.each(spells.known, function(spell, index) {
                            var thisSpell = spell;
                            thisSpell += "<button type=\"action\" class=\"choice action mancer_info\" name=\"act_" + rowid + "_known" + index + "\">i</button>";
                            thisSpell += "<input type=\"hidden\" name=\"comp_" + rowid + "_known" + index + "\">";
                            toset[rowid + "_known" + index] = "Spells:" + spell;
                            knownspells.push(thisSpell);
                        });
                        repupdate[rowid + " label p"] = knownspells.join(", ");
                        setAttrs(toset);
                        setCharmancerText(repupdate);
                        repids.push(rowid);
                        _.each(spells.choices, function(spell) {
                            addRepeatingSection(rowid, "choose", section + "_spell-l" + spell.Level, function(id) {
                                var toset = {};
                                var lists = [spell.List];
                                if(spell.AddList) lists = lists.concat(spell.AddList);
                                var choices = "Category:Spells Classes:*" + lists.join("|*") + " Level:" + spell.Level;
                                var settings = {category: "Spells", disable: spellData.known, add: spell["Expanded List"]};
                                toset[id + "_info"] = spell.Ability;
                                if(section != "class") toset[id + "_custom"] = section;
                                repids.push(id);
                                setCharmancerOptions(id + "_choice", choices, settings);
                                setAttrs(toset);
                                showChoices(["action[name=act_" + id + "_action]"]);
                                if(repids.length >= totalchoices) {
                                    clearRepeating(repids, "l1-spells");
                                }
                            });
                        });
                    });
                })
            });

            if (!spellData.race && !spellData.class) {
                showChoices(["no_spells"]);
                clearRepeatingSections("spell_holder");
            } else {
                showChoices(["spell-info-container"]);
                hideChoices(["no_spells"]);
            }

            setAttrs(set);
        });
    });

    on("page:l1-feat", function(eventinfo) {
        var stats = recalcData();
        var mancerdata = getCharmancerData();
        var showList = [];
        var hideList = [];

        if(mancerdata["l1-race"] && mancerdata["l1-race"].data.subrace && mancerdata["l1-race"].data.subrace["data-Feats"]) {
            showList = ["yes_feat"];
            hideList = ["no_feat"];
        } else {
            hideList = ["yes_feat"];
            showList = ["no_feat"];
            deleteCharmancerData(["l1-feat"]);
        }

        showChoices(showList);
        hideChoices(hideList);
    });

    on("mancerchange:feat", function(eventinfo) {
        changeCompendiumPage("sheet-feat-info", eventinfo.newValue);

        var reset = {};
        if(!(eventinfo.newValue === "" || eventinfo.newValue === undefined)) {
            showChoices(["feat_options"]);
        }
        hideChoices(["feat_possible"]);

        if(eventinfo.sourceType == "player") {
            reset = {};
            for(var x=1; x<=proficiencyNum; x++) {
                //reset["custom_race_prof_name_choice" + x] = "";
                //reset["custom_race_prof_type_choice" + x] = "";
            }
            reset["feat_ability_choice"] = "";
            setCharmancerText({"feat_text": ""});
        }

        getCompendiumPage(eventinfo.newValue, function(p) {
            p = removeDuplicatedPageData(p);
            setAttrs(reset, function() {
                var mancerdata = getCharmancerData();
                var data = p["data"];
                var showList = [];
                var update = {};

                if(data["data-Ability Score Increase"]) {
                    var abilityText = [];
                    var json = JSON.parse(data["data-Ability Score Increase"]);
                    _.each(json, function(increase, ability) {
                        abilityText.push(ability + " +" + increase);
                    });
                    update["feat_ability_score"] = abilityText.join(", ");
                    showList.push("feat_ability");
                }

                if(data["data-Ability Score Choice"]) {
                    var json = JSON.parse(data["data-Ability Score Choice"]);
                    setCharmancerOptions("feat_ability_choice", json);
                    showList.push("feat_ability", "feat_ability_choice");
                }

                if(data["Prerequisite"]) {
                    showList.push("feat_prereq")
                    update["feat_prerequisite"] = data["Prerequisite"];
                }
                //feat_ability_choice

                setCharmancerText(update);
                showChoices(showList);
                recalcData();
            });
        });
    });

    /* BIO PAGE */
    on("page:l1-bio", function(eventinfo) {
        const attrs = ["age", "character_name", "eyes", "hair", "height", "weight", "skin"];
        const mancerdata = getCharmancerData();
        const biodata = mancerdata["l1-bio"] || undefined;
        const race = getName("race");

        //Check for any data that has already been filled in and populate the Bio slide
        if (biodata === undefined) {
            getAttrs(attrs, function(v) {
                let update = {};

                _.each(attrs, function(value) {
                    if (v[`${value}`] != "" || v[`${value}`] != undefined) {
                        update[`${value}`] = v[`${value}`];
                    };
                });

                setAttrs(update);
            });
        };

        //Set the previous_race so the Summary page can offer a warning if needed
        if (biodata === undefined || biodata.values["previous_race"] === undefined || biodata.values["previous_race"] != race) {

            setAttrs({
                previous_race: race
            });
        };

        if (mancerdata["l1-race"] != undefined) {
             const raceInfo = mancerdata["l1-race"].values.race;
             changeCompendiumPage("sheet-race-info", raceInfo);
        };
    });

    /* SUMMARY PAGE */
    on("page:l1-summary", function() {
        var mancerdata = getCharmancerData();
        var profdata = getProficiencies(mancerdata);
        var set = {};
        var racename = getName("race", mancerdata);
        var subracename = getName("subrace", mancerdata);
        var classname = getName("class", mancerdata);
        var subclassname = getName("subclass", mancerdata);
        var bgname = getName("background", mancerdata);
        var spelldata = knownSpells();
        var raceSpells = spelldata.race ? spelldata.race.choices.length : 0;
        var classSpells = spelldata.class ? spelldata.class.choices.length : 0;
        var ready = true;

        var handleMissing = function(section, sectionName) {
            var page = mancerdata["l1-" + section.replace("sub", "")] || false;
            var missing = {};
            var warnings = "";
            sectionName = sectionName || section;
            if(page && page.data && page.data[section]) {
                if(page.data[section]["data-Ability Score Choice"]) {
                    var choices = 1;
                    if(typeof page.data[section]["data-Ability Score Choice"] == "string") {
                        choices = parseInt( page.data[section]["data-Ability Score Choice"].split("+")[0] );
                    }
                    var total = choices;
                    if(choices >= 2 && page.values[section + "_ability_choice2"]) choices--;
                    if(page.values[section + "_ability_choice"]) choices--;
                    if(page.values[section + "_ability_choice1"]) choices--;
                    if(choices > 0) missing.ability = [total, choices];
                }
                _.each(page.repeating, function(id) {
                    if(id.split("_")[2] == section && id.split("_")[3] == "feature") {
                        var featurename = page.values[id + "_info"];
                        if(page.values[id + "_choice"]) {
                            warnings += '<p>Your ' + featurename + ' is ' + _.last(page.values[id + "_choice"].split(":")) + '.</p>'
                        } else {
                            warnings += '<p class="sheet-warning">Your have not chosen a ' + featurename + '.</p>';
                        };
                    }
                });
                _.each(proficiencyList, function(prof) {
                    var numChoices = 0;
                    var totalChoices = 0;
                    _.each(page.repeating, function(id) {
                        if(id.split("_")[2] == section && id.split("_")[3] == prof.toLowerCase()) {
                            totalChoices++;
                            numChoices++;
                            if(page.values[id + "_choice"]) {
                                numChoices--;
                                var thischoice = _.last(page.values[id + "_choice"].split(":"));
                                if(thischoice == "custom" && !page.values[id + "_choice"]) {
                                    warnings += '<p class="sheet-warning">You\'ve chosen a custom language, but you haven\'t entered a custom language name.</p>';
                                }
                                _.each(profdata.auto, function(profs, source) {
                                    if(profs.includes(thischoice)) {
                                        warnings += '<p class="sheet-warning">You\'ve chosen the ' + prof.toLowerCase() + ' ' + thischoice;
                                        warnings += ', but you already have that ' + prof.toLowerCase() + ' from your ' + source + '.</p>';
                                    };
                                });
                            }
                        }
                    });
                    if(numChoices > 0) missing[prof] = [totalChoices, numChoices];
                });
                var total = 0;
                var choices = 0;
                _.each(page.repeating, function(id) {
                    if(id.split("_")[2] == section && id.split("_")[3] == "expertise") {
                        total++;
                        choices++;
                        if(page.values[id + "_choice"]) choices--;
                        if(choices > 0) missing.expertise = [total, choices];
                    }
                });
            }
            _.each(missing, function(number, type) {
                var singular = type == "ability" ? "an" : "a"
                if(type == "ability") {
                    type = 'ability score increase'
                }
                warnings += '<p class="sheet-warning">Your ' + sectionName;
                if(type == "expertise") {
                    warnings += " gives you expertise in ";
                    warnings += number[0] > 1 ? 'up to ' + number[0] + ' skills' : " a skill";
                } else {
                    warnings += " allows you to choose ";
                    warnings += number[0] > 1 ? "up to " + number[0] + ' ' + type.toLowerCase() + 's' : singular + " " + type.toLowerCase();
                }
                if(number[0] - number[1] > 0) {
                    warnings += ', but you\'ve only chosen ' + number[1] + '!</p>';
                } else {
                    warnings += number[0] > 1 ? ', and you haven\'t chosen any!</p>' : ', and you haven\'t chosen one!</p>';
                }
            });
            return warnings;
        };

        ///Show the bio info we need to put in places
        if(mancerdata["l1-bio"]) {
            let length = Object.keys(mancerdata["l1-bio"].values).length;
            set["bio_info"] = "";

            //Check if race has changed since entering data and add a warning
            if(length < 2) {
                set["bio_info"] += '<p>You have not added new information to the Bio tab.</p>';
            } else {
                if(mancerdata["l1-bio"].values.character_name) {
                    set["bio_info"] += '<p>Your name is ' + mancerdata["l1-bio"].values.character_name + '.</p>';};

                if(mancerdata["l1-bio"].values.age) {
                    set["bio_info"] += '<p>Your age is ' + mancerdata["l1-bio"].values.age + '.</p>';};

                if(mancerdata["l1-bio"].values["height"]) {
                    set["bio_info"] += '<p>Your height is ' + mancerdata["l1-bio"].values["height"] + '.</p>';};

                if(mancerdata["l1-bio"].values.weight) {
                    set["bio_info"] += '<p>Your weight is ' + mancerdata["l1-bio"].values.weight + '.</p>';};

                if(mancerdata["l1-bio"].values.eyes) {
                    set["bio_info"] += '<p>Your eye color is ' + mancerdata["l1-bio"].values.eyes + '.</p>';};

                if(mancerdata["l1-bio"].values.hair) {
                    set["bio_info"] += '<p>Your hair is ' + mancerdata["l1-bio"].values.hair + '.</p>';};

                if(mancerdata["l1-bio"].values.skin) {
                    set["bio_info"] += '<p>Your skin is ' + mancerdata["l1-bio"].values.skin + '.</p>';};

                if (mancerdata["l1-bio"].values.previous_race != racename) {
                    setCharmancerText({
                        race_warning: '<p class="sheet-warning">Each race has unique look and different names. You might want to adjust your choices to reflect your race.</p>'
                    });
                };
            };
        };

        if(mancerdata["l1-race"] && racename) {
            set["race_info"] = '<p>Your race is ' + racename + '</p>';
            if(!mancerdata["l1-race"].values.alignment) set["race_info"] += '<p class="sheet-warning">You haven\'t chosen your alignment.</p>';
            set["race_info"] += handleMissing("race");
            if(mancerdata["l1-race"].values["has_subrace"] == "true") {
                if(subracename) {
                    set["race_info"] += '<p>Your subrace is ' + subracename + '</p>';
                    set["race_info"] += handleMissing("subrace");
                } else {
                    if(mancerdata["l1-race"].values.subrace == "Rules:Races" && !mancerdata["l1-race"].values.subrace_name) {
                        set["race_info"] = '<p class="sheet-warning sheet-needed">You need to pick a name for your custom subrace!</p>';
                    } else {
                        set["race_info"] += '<p class="sheet-warning sheet-needed">You have not selected a subrace!</p>';
                    }
                    ready = false;
                    showChoices(["race_button"]);
                }
            }
            _.each(spelldata.errors.race, function(error) {
                switch(error) {
                    case "custom_race_spell_list":
                        set["race_info"] += '<p class="sheet-warning sheet-needed">You have not selected spell list for your innate spellcasting!</p>';
                        ready = false;
                        break;
                    default:
                        console.log("Unknown race spell error: " + error);
                }
            });
            if(mancerdata["l1-race"].values.race == "Rules:Races") {
                if(!mancerdata["l1-race"].values.size) set["race_info"] += '<p class="sheet-warning">You have not selected a size for your custom race!</p>';
                if(!mancerdata["l1-race"].values.speed) set["race_info"] += '<p class="sheet-warning">You have not selected a walking speed for your custom race!</p>';
            }
        } else {
            if(mancerdata["l1-race"] && mancerdata["l1-race"].values.race == "Rules:Races" && !mancerdata["l1-race"].values.race_name) {
                set["race_info"] = '<p class="sheet-warning sheet-needed">You need to pick a name for your custom race!</p>';
            } else {
                set["race_info"] = '<p class="sheet-warning sheet-needed">You have not selected a race!</p>';
            }
            ready = false;
            showChoices(["race_button"]);
        }

        if(mancerdata["l1-class"] && classname) {
            set["class_info"] = '<p>Your class is ' + classname + '.</p>';
            set["class_info"] += handleMissing("class");
            if(mancerdata["l1-class"].values.race == "Rules:Classes" && !mancerdata["l1-class"].values.custom_hit_die) {
                set["class_info"] = '<p class="sheet-warning">You need to pick a hit die for your custom class!</p>';
            }
            if(mancerdata["l1-class"].data.class && mancerdata["l1-class"].data.class["data-Subclass Level"] == 1) {
                if(subclassname && mancerdata["l1-class"].data.class && mancerdata["l1-class"].data.class["data-Subclass Level"] == 1) {
                    set["class_info"] += '<p>Your ' + mancerdata["l1-class"].data.class["Subclass Name"] + ' is ' + subclassname + '.</p>';
                    set["class_info"] += handleMissing("subclass", mancerdata["l1-class"].data.class["Subclass Name"]);
                } else {
                    if(mancerdata["l1-class"].values.subclass == "Rules:Classes" && !mancerdata["l1-class"].values.subrace_name) {
                        set["class_info"] = '<p class="sheet-warning sheet-needed">You need to pick a name for your custom ' + mancerdata["l1-class"].data.class["Subclass Name"] + '!</p>';
                    } else {
                        set["class_info"] += '<p class="sheet-warning sheet-needed">You have not selected a ' + mancerdata["l1-class"].data.class["Subclass Name"] + '!</p>';
                    }
                    ready = false;
                    showChoices(["class_button"]);
                }
            }
            _.each(spelldata.errors.class, function(error) {
                switch(error) {
                    case "custom_class_spell_list":
                        set["race_info"] += '<p class="sheet-warning sheet-needed">You have selected a spellcasting ability for your custom class, but you have not selected a spell list.</p>';
                        ready = false;
                        showChoices(["class_button"]);
                        break;
                    case "custom_class_spell_number":
                        set["race_info"] += '<p class="sheet-warning sheet-needed">You have selected a spellcasting ability for your custom class, but you have not selected a number of spells.</p>';
                        ready = false;
                        showChoices(["class_button"]);
                        break;
                    default:
                        console.log("Unknown class spell error: " + error);
                }
            });
        } else {
            if(mancerdata["l1-class"] && mancerdata["l1-class"].values.race == "Rules:Classes" && !mancerdata["l1-class"].values.race_name) {
                set["class_info"] = '<p class="sheet-warning sheet-needed">You need to pick a name for your custom class!</p>';
            } else {
                set["class_info"] = '<p class="sheet-warning sheet-needed">You have not selected a class!</p>';
            }
            ready = false;
            showChoices(["class_button"]);
        }

        if(mancerdata["l1-abilities"] && mancerdata["l1-abilities"].values.abilities) {
            switch(mancerdata["l1-abilities"].values.abilities) {
                case "Standard Array":
                    set["ability_info"] = '<p>You generated your stats from the standard array.</p>';
                    break;
                case "Roll for Stats":
                    set["ability_info"] = '<p>You generated your stats by rolling.</p>';
                    break;
                case "Point Buy":
                    set["ability_info"] = '<p>You generated your stats with the point buy method.</p>';
                    break;
                case "custom":
                    set["ability_info"] = '<p>You entered custom values for your stats.</p>';
                    break;
            }
            var x = 0;
            _.each(abilityList, function(ability) {
                if(!mancerdata["l1-abilities"].values[ability.toLowerCase()]) {
                    x++;
                    set["ability_info"] += '<p class="sheet-warning sheet-needed">You have not selected a score for your ' + ability.toLowerCase() + '!</p>';
                    ready = false;
                    showChoices(["abilities_button"]);
                }
            });
            if(x == 6) set["ability_info"] = '<p class="sheet-warning">You have not selected your ability scores!</p>';
        } else {
            set["ability_info"] = '<p class="sheet-warning sheet-needed">You have not generated your ability scores!</p>';
            ready = false;
            showChoices(["abilities_button"]);
        }

        if(mancerdata["l1-background"] && bgname) {
            set["background_info"] = '<p>You come from a ' + bgname + ' background.</p>';
            if(mancerdata["l1-background"].data.background && mancerdata["l1-background"].data.background["data-Background Choice Name"]) {
                if(!mancerdata["l1-background"].values["background_detail_choice"]) {
                    set["background_info"] += '<p class="sheet-warning">You haven\'t chosen your ';
                    set["background_info"] += mancerdata["l1-background"].data.background["data-Background Choice Name"] +'.</p>';
                }
            }
            if(!mancerdata["l1-background"].values["background_personality_choice1"] && !mancerdata["l1-background"].values["background_personality_choice2"]) {
                set["background_info"] += '<p class="sheet-warning">You haven\'t picked your personality traits.</p>';
            } else if(!mancerdata["l1-background"].values["background_personality_choice1"] || !mancerdata["l1-background"].values["background_personality_choice2"]) {
                set["background_info"] += '<p class="sheet-warning">You haven\'t picked one of your personality traits.</p>';
            }
            if(!mancerdata["l1-background"].values["background_ideal_choice"]) {
                set["background_info"] += '<p class="sheet-warning">You haven\'t chosen your ideal.</p>';
            }
            if(!mancerdata["l1-background"].values["background_bond_choice"]) {
                set["background_info"] += '<p class="sheet-warning">You haven\'t chosen your bond.</p>';
            }
            if(!mancerdata["l1-background"].values["background_flaw_choice"]) {
                set["background_info"] += '<p class="sheet-warning">You haven\'t chosen your flaw.</p>';
            }
            set["background_info"] += handleMissing("background");
        } else {
            set["background_info"] = '<p class="sheet-warning sheet-needed">You have not selected a background!</p>';
            ready = false;
            showChoices(["background_button"]);
        }

        if(mancerdata["l1-equipment"] && mancerdata["l1-equipment"].values["equipment_type"]) {
            switch(mancerdata["l1-equipment"].values["equipment_type"]) {
                case "class":
                    set["equipment_info"] = '<p>You got starting equipment based on your class and background.</p>';
                    break;
                case "gold":
                    set["equipment_info"] = '<p>You opted for gold instead of starting equipment.</p>';
                    break;
            }
            if(mancerdata["l1-equipment"].values["equipment_type"] == "class") {
                var choices = {"class": [0,0], "background": [0,0]};
                _.each(choices, function(numbers, section) {
                    var equipment = mancerdata["l1-" + section].data[section] && mancerdata["l1-" + section].data[section]["data-Equipment"] ? mancerdata["l1-" + section].data[section]["data-Equipment"] : {};
                    _.each(equipment, function(choice, choicekey) {
                        if(choicekey != "default") numbers[0]++;
                    });
                    _.each(mancerdata["l1-equipment"].values, function(val, key) {
                        if(key.includes(section + "_equipment_choice")) numbers[1]++;
                    });
                });
                _.each(choices, function(number, type) {
                    if(number[0] - number[1] > 0) {
                        set["equipment_info"] += '<p class="sheet-warning">Your ' + type + ' gives you ';
                        set["equipment_info"] += number[0] > 1 ? number[0] + " equipment choices" : "an equipment choice";
                        if(number[1] > 0) {
                            set["equipment_info"] += ', but you\'ve only chosen ' + number[1] + '!</p>';
                        } else {
                            set["equipment_info"] += number[0] > 1 ? ', and you haven\'t chosen any!</p>' : ', and you haven\'t chosen it!</p>';
                        }
                    }
                });
            }
            if(mancerdata["l1-equipment"].values["equipment_type"] == "gold" && mancerdata["l1-equipment"].values["starting_gold"] == "0") {
                set["equipment_info"] = '<p class="sheet-warning">You selected starting wealth for your equipment, but you don\'t have any gold yet!</p>';
            }
            if(mancerdata["l1-equipment"].values["equipment_class"] != getName("class", mancerdata, true) || (mancerdata["l1-equipment"].values["equipment_background"] != getName("background", mancerdata, true) && mancerdata["l1-equipment"].values["equipment_type"] != "gold")) {
                set["equipment_info"] = '<p class="sheet-warning sheet-needed">Your equipment options have changed, you\'ll need to choose again.</p>';
                ready = false;
                showChoices(["equipment_button"]);
            }
        } else {
            set["equipment_info"] = '<p class="sheet-warning sheet-needed">You have not selected any equipment!</p>';
            ready = false;
            showChoices(["equipment_button"]);
        }

        var spellsready = true;
        var toDelete = [];
        if(mancerdata["l1-spells"]) {
            prevRace = mancerdata["l1-spells"].values.race_spells || "";
            prevClass = mancerdata["l1-spells"].values.class_spells || "";
            currentRace = getName("race", mancerdata, true) + getName("subrace", mancerdata, true);
            currentClass = getName("class", mancerdata, true) + getName("subclass", mancerdata, true);
            set["spell_info"] = "";
            if((raceSpells + classSpells) == 0) {
                set["spell_info"] += '<p>The arcane is a mystery to you.</p>';
                deleteCharmancerData(["l1-spells"]);
                spellsready = false;
            } else if(prevRace != currentRace || prevClass != currentClass || mancerdata["l1-spells"].values.race_number != raceSpells || mancerdata["l1-spells"].values.class_number != classSpells) {
                if(prevRace != currentRace || mancerdata["l1-spells"].values.race_number > raceSpells) {
                    for(var x = 1; x<=9; x++) {
                        toDelete.push("race_level0_choice" + x);
                        toDelete.push("race_level1_choice" + x);
                    }
                    if(raceSpells > 0 && mancerdata["l1-spells"].values.race_number > 0) {
                        set["spell_info"] += '<p class="sheet-warning">Your racial spells were reset because your options have changed.</p>';
                    }
                }
                if(prevClass != currentClass || mancerdata["l1-spells"].values.class_number > classSpells) {
                    for(var x = 1; x<=9; x++) {
                        toDelete.push("class_level0_choice" + x);
                        toDelete.push("class_level1_choice" + x);
                    }
                    if(classSpells > 0 && mancerdata["l1-spells"].values.class_number > 0) {
                        set["spell_info"] += '<p class="sheet-warning">Your class spells were reset because your options have changed.</p>';
                    }
                }
            }
        } else if((raceSpells + classSpells) > 0) {
            set["spell_info"] = '<p class="sheet-warning">You haven\'t selected your spells!</p>';
            spellsready = false;
            showChoices(["spells_button"]);
        } else {
            set["spell_info"] = '<p>The arcane is a mystery to you.</p>';
            spellsready = false
        }

        if(mancerdata["l1-race"] && mancerdata["l1-race"].data.subrace && mancerdata["l1-race"].data.subrace["data-Feats"]) {
            if(mancerdata["l1-feat"] && mancerdata["l1-feat"].values.feat) {
                set["feat_info"] = '<p>You\'ve selected the ' + mancerdata["l1-feat"].values.feat.split(":")[1] + ' feat.</p>';
                set["feat_info"] += handleMissing("feat");
            } else {
                set["feat_info"] = '<p class="sheet-warning">You have access to a feat, but you have not yet selected one!</p>';
            }
        } else {
            set["feat_info"] = '<p>As you exchange your novice notions of the world for experience, a feat may become within reach. Not today, however.</p>';
            deleteCharmancerData(["l1-feat"]);
        }

        if(ready) {
            set.ready_message = "If you're ready to build your " + racename;
            set.ready_message += subracename == "" ? " " : " (" + subracename + ") ";
            set.ready_message += subclassname == "" ? classname : classname + " (" + subclassname + ")";
            set.ready_message += " from a " + bgname + " background, click \"Apply Changes.\"";
            showChoices(["apply_changes", "ready_text"]);
        } else {
            set.ready_message = "Hold on there! You've missed some required fields, which have been marked with a <span class='sheet-needed'></span>.";
        }
        //If you're ready to build your race class from a background background, click "Apply Changes."
        deleteCharmancerData([{"l1-spells":toDelete}], function() {
            spelldata = knownSpells();
            if(spellsready) {
                if (spelldata.known && spelldata.known.length) {
                    set["spell_info"] += '<p>You know these spells: ' + removeExpansionInfo(spelldata.known.join(", ")) + '.</p>';
                }
                var choices = {"cantrip": [0,0], "spell": [0,0]};
                _.each(spelldata, function(section) {
                    _.each(section.choices, function(spell) {
                        if(spell.Level == 0) choices.cantrip[0]++;
                        if(spell.Level == 1) choices.spell[0]++;
                    });
                });
                choices.cantrip[1] = choices.cantrip[0];
                choices.spell[1] = choices.spell[0];
                _.each(mancerdata["l1-spells"].values, function(val, name) {
                    if(name.split("_")[3] == "spell-l0" && _.last(name.split("_")) == "choice") choices.cantrip[1]--;
                    if(name.split("_")[3] == "spell-l1" && _.last(name.split("_")) == "choice") choices.spell[1]--;
                });
                _.each(choices, function(number, type) {
                    if(number[1] > 0) {
                        set["spell_info"] += '<p class="sheet-warning">You can choose ';
                        set["spell_info"] += number[0] > 1 ? "up to " + number[0] + ' ' + type + 's' : "a " + type;
                        if(number[1] < number[0]) {
                            set["spell_info"] += ', but you\'ve only chosen ' + (number[0] - number[1]) + '!</p>';
                        } else {
                            set["spell_info"] += number[0] > 1 ? ', and you haven\'t chosen any!</p>' : ', and you haven\'t chosen one!</p>';
                        }
                    }
                });
            }
            setCharmancerText(set);
        });
    });

    /* Info Button Listeners */
    on("clicked:info_race", function(eventinfo) {
        var data = getCharmancerData();
        var race = data["l1-race"] && data["l1-race"].values.race ? data["l1-race"].values.race : "Rules:Races";
        changeCompendiumPage("sheet-race-info", race);
    });

    on("clicked:info_subrace", function(eventinfo) {
        var data = getCharmancerData();
        var subrace = data["l1-race"] && data["l1-race"].values.subrace ? data["l1-race"].values.subrace : data["l1-race"].values.race;
        changeCompendiumPage("sheet-race-info", subrace);
    });

    on("clicked:info_class", function(eventinfo) {
        var data = getCharmancerData();
        var oclass = data["l1-class"] && data["l1-class"].values.class ? data["l1-class"].values.class : "Rules:Classes";
        changeCompendiumPage("sheet-class-info", oclass);
    });

    on("clicked:info_subclass", function(eventinfo) {
        var data = getCharmancerData();
        var osubclass = data["l1-class"] && data["l1-class"].values.subclass ? data["l1-class"].values.subclass : data["l1-class"].values.class;
        changeCompendiumPage("sheet-class-info", osubclass);
    });

    on("mancerfinish:l1-mancer", function(eventinfo) {
        var doAllDrops = function(dropArray, callback) {
            getAttrs(["character_id"], function(v) {
                _.each(stats.totals, function(scores, name) {
                    v[name + "_base"] = scores.total;
                    v[name + "_mod"] = scores.mod;
                });
                v.base_level = "1";
                v.npc = "0";
                v["class_resource_name"] = "";
                v["other_resource_name"] = "";
                var update = {};
                var callbacks = [];
                var totalDrops = dropArray.length;
                var x = 0;
                callbacks.push(update_class);
                callbacks.push(update_race_display);
                get_repeating_data(function(repeating) {
                    _.each(dropArray, function(page) {
                        page.data.Category = page.data.Category.replace("@@!!@@", "");
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
        var makeItemData = function(items) {
            if (noEquipmentDrop) {
                return [];
            } else {
                var itemArray = [];
                var splitItems = [];
                _.each(items, function(item) {
                    item = item.split(",");
                    _.each(item, function(splitItem) {
                        splitItems.push(splitItem.trim());
                    });
                })
                _.each(splitItems, function(item) {
                    var itemname = item.split("(")[0].trim().replace("Items:", "");
                    itemname = itemname.substring(0,4) == "and " ? itemname.substr(4) : itemname;
                    var itemdata = {name:"Items:" + itemname, data:{}}
                    if(item.includes("(")) {
                        var par = item.split("(")[1].split(")")[0];
                        if( !isNaN(parseInt(par)) ) {
                            itemdata.data["itemcount"] = parseInt(par);
                        }
                    }
                    if(itemname != "") {
                        itemArray.push(itemdata);
                    }
                });
                return itemArray;
            }
        };
        var eraseRepeating = function(sectionArray, callback) {
            var thisSection = sectionArray.shift();
            getSectionIDs(thisSection, function(itemids) {
                _.each(itemids, function(item) {
                    removeRepeatingRow("repeating_" + thisSection + "_" + item);
                });
                if(sectionArray.length > 0) {
                    eraseRepeating(sectionArray, callback);
                } else {
                    callback();
                }

            });
        };
        var noEquipmentDrop = false;
        var startTime = Date.now();
        var allPageData = [];
        if(eventinfo.data["l1-equipment"]) {
            noEquipmentDrop = eventinfo.data["l1-equipment"].values["equipment_type"] == "gold";
        }
        var data = eventinfo.data;
        var stats = recalcData(data);
        var profs = getProficiencies(data, "finish");
        var spells = knownSpells(data);
        var blobs = getRelevantBlobs(data, "1", "l1");
        var customtraits = {race: [], subrace: [], class: [], subclass: [], background: []};
        var equipment = [];
        var silentset = {};
        var silentattrs = ["class_resource_name", "class_resource", "class_resource_max", "other_resource_name", "other_resource", "other_resource_max", "other_resource_itemid", "class", "class_display", "subclass", "hitdietype", "hitdie_final", "race", "subrace", "race_display", "custom_class", "cust_classname"];
        var clearset = {};
        var clearattrs = ["hp", "hp_max", "size", "speed", "gp", "alignment", "global_damage_mod_flag", "spellcasting_ability", "cust_hitdietype", "cust_spellslots", "cust_spellcasting_ability", "ac", "jack_bonus", "jack_attr", "death_save_bonus", "weighttotal", "initiative_bonus", "hit_dice", "hit_dice_max", "pb", "jack", "caster_level", "spell_attack_mod", "spell_attack_bonus", "spell_save_dc", "passive_wisdom", "custom_ac_base", "custom_ac_part1", "custom_ac_part2", "custom_ac_shield", "background", "global_ac_mod_flag", "global_attack_mod_flag", "global_save_mod_flag", "global_skill_mod_flag"];
        var classname = "";
        var set = {gp: 0};
        var allDrops = [];
        var currentDrop = 0;
        var totalDrops = 1;
        var allSkills = ["athletics", "acrobatics", "sleight_of_hand", "stealth", "arcana", "history", "investigation", "nature", "religion", "animal_handling", "insight", "medicine", "perception", "survival","deception", "intimidation", "performance", "persuasion"];
        var allAbilities = abilityList.map(function(x) {return x.toLowerCase()});
        var eraseSections = ["attack", "inventory", "traits", "resource", "proficiencies", "tool", "damagemod", "spell-cantrip", "hpmod", "acmod", "tohitmod", "savemod", "skillmod"];
        console.log(blobs);
        console.log(spells);
        for(var x=1; x<=9; x++) {
            eraseSections.push("spell-" + x);
        }
        //first set is silent to make sure certain things don't trigger workers
        _.each(silentattrs, function(attr) {
            silentset[attr] = "";
        });
        //Set up setAttrs to erase some fields
        _.each(clearattrs, function(attr) {
            clearset[attr] = "";
        });
        clearset["halflingluck_flag"] = "0";
        clearset["tab"] = "core";
        clearset["base_level"] = "1";
        clearset["level"] = "1";
        clearset["armorwarningflag"] = "hide";
        clearset["customacwarningflag"] = "hide";
        clearset["custom_ac_flag"] = "0";
        clearset["custom_attack_flag"] = "0";
        clearset["custom_ac_flag"] = "0";
        clearset["multiclass1_flag"] = "0";
        clearset["multiclass1_lvl"] = "1";
        clearset["multiclass2_flag"] = "0";
        clearset["multiclass2_lvl"] = "1";
        clearset["multiclass3_flag"] = "0";
        clearset["multiclass3_lvl"] = "1";
        clearset["custom_class"] = "0";
        _.each(allSkills, function(skill) {
            clearset[skill + "_prof"] = "";//0
            clearset[skill + "_type"] = "";//1
            clearset[skill + "_bonus"] = "";
        });
        _.each(allAbilities, function(ability) {
            clearset[ability + "_save_prof"] = "";
            clearset[ability + "_save_bonus"] = "";
            clearset[ability + "_bonus"] = "0";
            clearset["cust_" + ability + "_save_prof"] = "";
        });
        clearset["personality_traits"] = "";
        _.each(["ideal", "bond", "flaw"], function(type) {
            clearset[type + "s"] = "";
        });
        //Set up second setAttrs with ability scores
        _.each(stats.totals, function(scores, name) {
            clearset[name + "_base"] = scores.total;
        });
        // Build new blobs for traits with inputs, collect custom traits and languages
        _.each(data, function(slide, pagename) {
            _.each(slide.values, function(value, name) {
                if(name.substr(-11) == "trait_input") {
                    var sectionid = name.substring(0, name.length - 6);
                    var thisblob = {};
                    var thistrait = {};
                    thistrait.Name = slide.values[sectionid + "_name"].replace(/{{Input}}/g, value);
                    thistrait.Desc = slide.values[sectionid + "_desc"] ? slide.values[sectionid + "_desc"].replace(/{{Input}}/g, value) : "";
                    thisblob.Traits = JSON.stringify([thistrait]);
                    blobs.names[slide.values[sectionid + "_section"]].push(sectionid);
                    slide.data[slide.values[sectionid + "_section"]].blobs[sectionid] = thisblob;
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
            })
        });
        //Set up drops. start with class, subclass, race, subrace, background
        if(data["l1-class"].values["class_name"] && !data["l1-class"].data.class) {
            classname = removeExpansionInfo(data["l1-class"].values["class_name"]);
            var customClass = {name: classname, data: {Category: "Classes", blobs:{}}};
            set["custom_class"] = "1";
            set["cust_classname"] = data["l1-class"].values["class_name"];
            set["cust_hitdietype"] = data["l1-class"].values["custom_hit_die"];
            if(data["l1-class"].values["custom_class_spell_ability"]) {
                set["cust_spellslots"] = "full";
                set["cust_spellcasting_ability"] = "@{" + data["l1-class"].values["custom_class_spell_ability"].toLowerCase() + "_mod}+";
            }
            if(customtraits.class.length > 0) {
                customClass.data.theseblobs = ["customblob"];
                customClass.data.blobs.customblob = {Traits: JSON.stringify(customtraits.class)};
            }
            _.each(allAbilities, function(ability) {
                if(data["l1-class"].values[ability.toLowerCase() + "_save"]) {
                    set["cust_" + ability + "_save_prof"] = "(@{pb})";
                }
            });
            allPageData.push(customClass);
        } else {
            //allDrops.push(data["l1-class"].values.class);
            classname = removeExpansionInfo( _.last(data["l1-class"].values.class.split(":")) );
            var thisdata = {name: classname, data: data["l1-class"].data.class};
            thisdata.data.theseblobs = blobs.names.class;
            allPageData.push(thisdata);
        };
        //set up subclass drop
        if(data["l1-class"].values.subclass && data["l1-class"].values["subclass_name"]) {
            var customSubclass  = {name: removeExpansionInfo (data["l1-class"].values["subclass_name"] ), data: {Category: "Subclasses", blobs:{}}};
            if(customtraits.subclass.length > 0) {
                customSubclass.data.theseblobs = ["customblob"];
                customSubclass.data.blobs.customblob = {Traits: JSON.stringify(customtraits.subclass)};
            }
            allPageData.push(customSubclass);
        } else if(data["l1-class"].values.subclass) {
            //allDrops.push(data["l1-class"].values.subclass);
            var thisdata = {name: removeExpansionInfo( _.last(data["l1-class"].values.subclass.split(":")) ), data: data["l1-class"].data.subclass};
            thisdata.data.theseblobs = blobs.names.subclass;
            allPageData.push(thisdata);
        };
        //set up race drop
        if(data["l1-race"].values["race_name"] && !data["l1-race"].data.race) {
            var customRace = {name: removeExpansionInfo(data["l1-race"].values["race_name"]), data: {Category: "Races", blobs:{}}};
            if(data["l1-race"].values.size) {
                customRace.data.Size = data["l1-race"].values.size;
            }
            if(data["l1-race"].values.speed) {
                customRace.data.Speed = data["l1-race"].values.speed;
            }
            if(customtraits.race.length > 0) {
                customRace.data.theseblobs = ["customblob"];
                customRace.data.blobs.customblob = {Traits: JSON.stringify(customtraits.race)};
            }
            allPageData.push(customRace);
        } else {
            //allDrops.push(data["l1-race"].values.race);
            var thisdata = {name: removeExpansionInfo(_.last(data["l1-race"].values.race.split(":"))), data: data["l1-race"].data.race};
            thisdata.data.theseblobs = blobs.names.race;
            allPageData.push(thisdata);
        }
        //set up subrace drop
        if(data["l1-race"].values.subrace && data["l1-race"].values["subrace_name"]) {
            var customSubrace = {name: removeExpansionInfo(data["l1-race"].values["subrace_name"]), data: {Category: "Subraces", blobs:{}}};
            customSubrace.data["data-Parent"] = data["l1-race"].values.race.split(":")[1];
            if(data["l1-race"].values.speed) {
                customSubrace.data.Speed = data["l1-race"].values.speed;
            }
            if(customtraits.subrace.length > 0) {
                customSubrace.data.theseblobs = ["customblob"];
                customSubrace.data.blobs.customblob = {Traits: JSON.stringify(customtraits.subrace)};
            }
            allPageData.push(customSubrace);
        } else if(data["l1-race"].values.subrace) {
            //allDrops.push(data["l1-race"].values.subrace);
            var thisdata = {name: removeExpansionInfo(_.last(data["l1-race"].values.subrace.split(":"))), data: data["l1-race"].data.subrace};
            thisdata.data.theseblobs = blobs.names.subrace;
            allPageData.push(thisdata);
        };
        //set up feat drop
        if(data["l1-feat"] && data["l1-feat"].values.feat) {
            var feat = {name: data["l1-feat"].values.feat, data: {Properties: "1st Level"}};
            allDrops.push(feat);
        }
        //set up background drop
        if(data["l1-background"].values.background) {
            if(data["l1-background"].values.background == "Rules:Backgrounds") {
                var customBg  = {name: removeExpansionInfo(data["l1-background"].values["background_name"]), data: {Category: "Backgrounds", blobs:{}}};
                if(customtraits.background.length > 0) {
                    customBg.data.theseblobs = ["customblob"];
                    customBg.data.blobs.customblob = {Traits: JSON.stringify(customtraits.background)};
                }
                allPageData.push(customBg);
            } else {
                var thisdata = {name: removeExpansionInfo(_.last(data["l1-background"].values.background.split(":"))), data: data["l1-background"].data.background};
                thisdata.data.theseblobs = blobs.names.background;
                allPageData.push(thisdata);
            }
        }

        //Now add proficiency drops
        _.each(["Armor", "Language", "Tool", "Weapon"], function(proftype) {
            _.each(profs.all[proftype], function(prof) {
                var profdata = {name: "Proficiencies:" + prof, data: {Type: proftype}}
                if(profs.all.Expertise.indexOf(prof) != -1) {
                    profdata.data["toolbonus_base"] = "(@{pb}*2)";
                    allDrops.unshift(profdata);
                } else {
                    allDrops.push(profdata);
                }
            });
        });

        //Next, add spell drops
        _.each(spells.all, function(spell) {
            console.log(spell);
            var spelldata = {name: "Spells:" + spell.Name};
            spelldata.data = {"spellcasting_ability": spell.Ability};
            if(spell.Source == "race") {
                spelldata.data.spellclass = "Racial";
            } else {
                spelldata.data.spellclass = classname;
            };
            allDrops.push(spelldata);
        });
        //Add equipment choice drops unless starting gold was chosen
        if (data["l1-equipment"].values["equipment_type"] != "gold") {
            _.each(data["l1-equipment"].values, function(val, name) {
                if(name.includes("background_equipment_choice")) {
                    equipment = equipment.concat(val.split(" and "));
                }
            });
            _.each(blobs.all, function(blob) {
                if(blob.Equipment) {
                    var blobstuff = blob.Equipment;
                    try {
                        blobstuff = JSON.parse(blob.Equipment);
                    } catch (e) {}
                    equipment = equipment.concat(blobstuff);
                }
            })
        }

        //Here there is a window to modify the hitpoints, however additional hitpoints inserted here would not appear on charatermancer header
        //By Miguel

        //Set up the final setAttrs()
        set["alignment"] = data["l1-race"].values.alignment || "";
        set["hp"] = stats.hp;
        set["hp_max"] = stats.hp;
        set["l1mancer_status"] = "completed";
        set["options-class-selection"] = "0";
        if(data["l1-equipment"].values["equipment_type"] == "class") {
            _.each(data["l1-equipment"].values, function(val, name) {
                if(name.includes("class_equipment_choice")) {
                    equipment = equipment.concat(val.split(" and "));
                }
            });
        } else if(data["l1-equipment"].values["equipment_type"] == "gold" && data["l1-equipment"].values["starting_gold"]) {
            set["gp"] = parseInt(data["l1-equipment"].values["starting_gold"]);
        }
        //Add the bio info
        if(data["l1-bio"]) {
            _.each(["character_name", "age", "height", "weight", "eyes", "hair", "skin"], function(type) {
                if(data["l1-bio"].values[type]) {
                    set[type] = data["l1-bio"].values[type] || "";
                }
            });
        }
        //Add skill proficiencies
        _.each(_.uniq(profs.all.Skill.concat(profs.all.Expertise)), function(prof) {
            var profName = prof.toLowerCase().replace(/ /g, "_");
            set[profName + "_prof"] = "(@{pb}*@{" + profName + "_type})";
            if(profs.all.Expertise.indexOf(prof) != -1) {
                set[profName + "_type"] = 2;
            }
        });
        //Add background traits
        if(data["l1-background"].values["background_personality_choice1"] || data["l1-background"].values["background_personality_choice2"]) {
            var choice1 = data["l1-background"].values["background_personality_choice1"] || false;
            var choice2 = data["l1-background"].values["background_personality_choice2"] || false;
            choice1 = choice1 || choice2;
            if(choice1) {
                set["personality_traits"] = choice1;
            }
            if(choice2) {
                set["personality_traits"] += "\n\n" + choice2;
            }
            set["options-flag-personality"] = 0;
        }
        _.each(["ideal", "bond", "flaw"], function(type) {
            if(data["l1-background"].values["background_" + type + "_choice"]) {
                set[type + "s"] = data["l1-background"].values["background_" + type + "_choice"];
                set["options-flag-" + type + "s"] = 0;
            }
        });
        if(data["l1-background"].values["background_detail_choice"]) {
            set["background"] = removeExpansionInfo(_.last(data["l1-background"].values["background"].split(":"))) + " (" + data["l1-background"].values["background_detail_choice"] + ")";
        }
        allDrops = allDrops.concat(makeItemData(equipment));
        totalDrops += allDrops.length;
        _.each(allPageData, function(page) {
            allDrops = allDrops.concat(getOtherDrops(page.data));
        });

        //erase all repeating sections
        eraseRepeating(eraseSections, function() {
            setCharmancerText({"mancer_progress" :'<div style="width: 5%"></div>'});
            //first set is silent to prevent unwanted sheet workers
            setAttrs(silentset, {silent:true}, function() {
                setCharmancerText({"mancer_progress" :'<div style="width: 10%"></div>'});
                //reset remaining attributes, and set ability scores/custom info
                setAttrs(clearset, function() {
                    setCharmancerText({"mancer_progress" :'<div style="width: 15%"></div>'});
                    getAllPages(allDrops, function() {
                        setCharmancerText({"mancer_progress" :'<div style="width: 20%"></div>'});
                        doAllDrops(allPageData, function() {
                            console.log("DOING THE FINAL SET!!");
                            setAttrs(set, function() {
                                setCharmancerText({"mancer_progress" :'<div style="width: 100%"></div>'});
                                update_class();
                                organize_section_proficiencies();
                                update_skills(allSkills);
                                update_attacks("all");
                                var endTime = Date.now();
                                console.log("Elapsed time: ");
                                console.log((endTime-startTime)/1000);
                                finishCharactermancer();
                            });
                        });
                    });
                });
            });
        });
        /* */
    });
   