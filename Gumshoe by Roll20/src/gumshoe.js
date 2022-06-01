    //changes: occult -> occult-studies; Assess Honesty -> Bullshit Detector; Outdoorsman -> Outdoor Survival; Explosives -> Explosive Devices;
    // Mechanical Repair -> Mechanics; 
    var currentAbilities = {},
        reverseAbilities = {},
        allAbilities = ["accounting", "anthropology", "archaeology", "architecture", "art", "art-history", "art-hsitory", "assess-honesty", "astronomy", "athletics", "bargain", "biology", "bullshit-detector", "bureaucracy", "chemistry", "conceal", "cop-talk", "cover", "craft", "credit-rating", "criminology", "cryptography", "cthulhu-mythos", "data-recovery", "diagnosis", "digital-intrusion", "disguise", "driving", "electrical-repair", "electronic-surveillance", "evidence-collection", "explosive-devices", "explosives", "filch", "firearms", "first-aid", "flattery", "fleeing", "flirting", "forensic-pathology", "forensics", "forgery", "gambling", "geology", "hand-to-hand", "health", "high-society", "history", "human-terrain", "hypnosis", "infiltration", "interrogation", "intimidation", "languages", "law", "library-use", "locksmith", "mechanical-repair", "mechanics", "medic", "medicine", "military-science", "negotiation", "network", "notice", "occult", "occult-studies", "oral-history", "outdoorsman", "outdoor-survival", "pharmacy", "photography", "physics", "piloting", "preparedness", "psychoanalysis", "reassurance", "research", "riding", "sanity", "scuffling", "sense-trouble", "shadowing", "shooting", "shrink", "stability", "stealth", "streetwise", "surveillance", "theology", "tradecraft", "traffic-analysis", "urban-survival", "vampirology"],
        system = 'toc',
        npc = false,
        sections = ['academic', 'interpersonal', 'technical', 'general'],
        pointChange = ['inc', 'dec', 'max-inc', 'max-dec', '', 'max'],
        maxChange = ['occupation', 'max', 'free'],
    
        changeString = function(elementList, endings = [""], repeating = false) {
            let string = '';
            if(repeating) {
                _.each(elementList, function(element) {
                    _.each(endings, function(ending) {
                        string += ' change:repeating_' + element + ':r-' + element;
                        string += (ending == '') ? '' : '_' + ending;
                    });
                });
            } else {
                _.each(elementList, function(element) {
                    _.each(endings, function(ending) {
                        string += ' change:' + element;
                        string += (ending == '') ? '' : '_' + ending;
                    });
                });
            }
            return string;
        },
    
        getAbility = function(trigger) {
            return trigger ? trigger.split("_") : false;
        },
    
        abilityList = function(elementList, endings, repeating = false) {
            let returnList = [],
                prefix = repeating ? repeating : '';
            _.each(elementList, function(element) {
                _.each(endings, function(ending) {
                    let underscore = ending == '' ? '' : '_';
                    returnList.push(prefix + element + underscore + ending);
                });
            });
            return returnList;
        },
    
        returnInt = function(x) {
            return isNaN(x) ? "" : parseInt(x);
        },
    
        makeRepeatingArray = function(section, repIds) {
            let result = [];
    
            _.each(repIds, function(repId) {
                result.push('repeating_' + section + '_' + repId + '_r-' + section);
            });
            return result;
        },
    
        getRepeating = function(secArray, callback, resultArray = [], returnSecs = []) {
            let tempArray = [].concat(secArray);
    
            if(tempArray.length > 0) {
                let x = tempArray.pop();
                getSectionIDs(x, function(repIds) {
                    resultArray = resultArray.concat(makeRepeatingArray(x, repIds));
                    returnSecs.push(x);
                    getRepeating(tempArray, callback, resultArray, returnSecs);
                });
            } else {
                callback(resultArray, returnSecs);
            }
        },
    
        getSectionTotal = function(secs = {}, eventInfo = {category: false}, repeating = false) {
            // console.log("getSectionTotal::secs",secs);
            // console.log("getSectionTotal::eventInfo",eventInfo);
            // console.log("getSectionTotal::repeating",repeating);
            let aList = [],
                pointList = abilityList(sections, ['points']);
            pointList = pointList.concat(abilityList(sections, ['points'], 'r-'));
    
            if(eventInfo.category) {
                aList = aList.concat(abilityList(secs, maxChange.concat([""])));
            } else {
                _.each(sections, function(sec) {
                    aList = aList.concat(abilityList(currentAbilities[sec], maxChange));
                });
            }
    
            getAttrs(aList.concat(pointList), function(values) {
                // console.log("getSectionTotal::getAttrs::values",values);
                let result = {},
    
                    current = repeating ? 'r-' + eventInfo.category + '_points' : eventInfo.category + '_points',
    
                    computePoints = function(abilities) {
                        //console.log("computePoints::abilities",abilities);
                        let result = 0;
                        _.each(abilities, function(ability) {
                            let max = parseInt(values[ability + "_max"]),
                                occupation = values[ability + "_occupation"];
                            //console.log("====== ABILITY ======: ",ability);
                            //console.log(`initial values: {max: ${max}, occupation: ${occupation}}`);
                            if(ability == 'fleeing') {
                                let ath = values['athletics_max'] ? parseInt(values['athletics_max']) : 0;
                                if(ath == 0 || occupation == 0.5) {
                                    max = Math.max(max - values[ability + "_free"], 0);
                                    occupation = 0.5;
                                }
                                else if(2*ath < max){
                                    max = ath + 0.5*max; //Fleeing points cost half when having more than (2*athletics points) amount of fleeing   (ToC p.26) 
                                }else{
                                    max = Math.max(max - values[ability + "_free"], 0);
                                }
                            } else {
                                //console.log(`max calculation: max(${max} - ${values[ability+"_free"]})`);
                                max = Math.max(max - values[ability + "_free"], 0);
                                //console.log(`= ${max}`);
                            }
                            occupation = system == 'toc' ? occupation : 0;
                            //console.log("computePoints::each::max",max);
                            //console.log("computePoints::each::occupation",occupation);
                            result += max ? Math.ceil(max * (1 - occupation)) : 0;
                        });
                        //console.log("computePoints::result",result);
    
                        return result;
                    },
    
                    setResult = function(result) {
                        //console.log("setResult::result", result);
                        result['inv_points'] = 0;
                        result['gen_points'] = 0;
                        _.each(['academic', 'interpersonal', 'technical'], function(sec) {
                            result['inv_points'] += parseInt(result[sec + '_points']) + parseInt(result['r-' + sec + '_points']);
                        });
                        result['gen_points'] += parseInt(result['general_points']) + parseInt(result['r-general_points']);
                        setAttrs(result);
                    };
    
                if(eventInfo.category) {
                    _.each(pointList, function(sec) {
                        result[sec] = parseInt(values[sec]);
                    });
                    result[current] = 0;
    
                    result[current] = computePoints(secs);
    
                    if(eventInfo.sourceAttribute.substr(-4) == 'free') {
                        let oldVal = 0, diff = 0,
                            trigger = eventInfo.sourceAttribute.slice(0,-5),
                            newVal = parseInt(values[trigger + '_free']);
    
                        if(eventInfo.previousValue) {
                            oldVal = parseInt(eventInfo.previousValue);
                            if(oldVal == newVal) {
                                oldVal = 0;
                            }
                        }
    
                        diff = newVal - oldVal;
    
                        console.log("trigger:",trigger);
                        result[trigger + '_max'] = Math.max(parseInt(values[trigger + '_max']) + diff, 0);
                        result[trigger] = Math.max(parseInt(values[trigger]) + diff, 0);
                    }
                    setResult(result);
    
                } else {
                    let idResult = [];
    
                    result = secs;
    
                    _.each(pointList, function(sec) {
                        result[sec] = 0;
                    });
    
                    _.each(sections, function(sec) {
                        result[sec + '_points'] += computePoints(currentAbilities[sec]);
                    });
                    console.log("result after computing points:",result);
    
                    console.log("repeating sections:",sections);
                    getRepeating(sections, function(resultArray) {
                        console.log(`resultArray: ${resultArray}, maxChange:${maxChange}`);
                        getAttrs(abilityList(resultArray, maxChange), function(vals) {
                            _.each(resultArray, function(rAbility) {
                                let max = vals[rAbility + "_max"],
                                    occupation = vals[rAbility + "_occupation"];
                                console.log(`repeating section abilityList(${resultArray}, ${maxChange}) array iteration: {max:${max},occupation:${occupation}}`)
                                occupation = system == 'toc' ? occupation : 0;
                                result[rAbility.split('_')[3] + '_points'] += max ? Math.ceil(max * (1 - occupation)) : 0;
                            });
                            setResult(result);
                        });
                    });
    
                }
            });
        },
    
        abilityChange = function(trigger, repeating = false) {
            if (trigger == false) {
                return;
            }
    
            let ability = trigger[0],
                source = trigger[1],
                max = ability + "_max",
                constraint = ability + "_constraint",
                free = ability + "_free",
                noCherry = ["health", "stability", "cover", "network"];
    
            console.log(`ability: ${ability}, max: ${max}, free: ${free}`)
            getAttrs([ability, max, free, "cherry-branch-height"], function(values) {
                let change = {},
                    maxMin = npc ? 0 : parseInt(values[free]),
                    min = ["health", "stability"].indexOf(ability) == -1 ? 0 : -12;
    
                change[ability] = returnInt(values[ability]);
                change[max] = returnInt(values[max]);
                change[constraint] = " ";
    
                if(source == "inc") {
                    change[ability] = change[ability] ? change[ability] + 1 : 1;
                }
                if(source == "dec") {
                    change[ability] -= 1;
                }
    
                if(source == "max-inc") {
                    change[max] = change[max] ? change[max] : 0;
                    change[ability] = change[ability] ? change[ability] : 0;
                    if(change[ability] == change[max]) {
                        change[ability] = change[max] + 1;
                    }
                    change[max] += 1;
                }
                if(source == "max-dec") {
                    if(change[ability] == change[max]) {
                        change[ability] = change[max] - 1;
                    }
                    change[max] -= 1;
                }
    
                if(change[max] <= maxMin) {
                    change[constraint] += "d";
                    change[max] = maxMin ? maxMin : "";
                }
                if(change[ability] >= change[max]) {
                    change[constraint] += "a";
                }
                if(change[ability] <= min) {
                    change[constraint] += "b";
                    change[ability] = change[max] ? min : "";
                }
    
                if(values[ability] == "" && values[max] == 0) {
                    change[ability] = change[max];
                }
    
                if(ability == 'athletics' && !npc) {
                    change['hit-rating'] = change[max] >= 8 ? 4 : 3;
                }
    
                if(change[ability] <= -10) {
                    change[constraint] += 's';
                }
    
                if(parseInt(change[ability]) > 0) {
                    change[ability + "_dice"] = "@{point_query}";
                } else {
                    change[ability + "_dice"] = "@{basic_roll}";
                }
    
                if(npc) {
                    change[ability] = change[ability] == "" ? 0 : change[ability];
                }
    
                if(change[ability] >= values["cherry-branch-height"] && noCherry.indexOf(ability) == -1) {
                    change[constraint] += "x";
                }
    
                console.log("change:",change);
                setAttrs(change); //this is causing a Firebase error when changing Abilities
            });
        };
    
    on("sheet:opened change:sheetswitch", function(eventInfo) {
        let systemAbilities = {
                tocAcademic: ['accounting', 'anthropology', 'archaeology', 'architecture', 'art-history', 'biology', 'cthulhu-mythos', 'cryptography', 'geology', 'history', 'languages', 'law', 'library-use', 'medicine', 'occult', 'physics', 'theology'],
                tocInterpersonal: ['assess-honesty', 'bargain', 'bureaucracy', 'cop-talk', 'credit-rating', 'flattery', 'interrogation', 'intimidation', 'oral-history', 'reassurance', 'streetwise'],
                tocTechnical: ['art', 'astronomy', 'chemistry', 'craft', 'evidence-collection', 'forensics', 'locksmith', 'outdoorsman', 'pharmacy', 'photography'],
                tocGeneral: ['athletics', 'conceal', 'disguise', 'driving', 'electrical-repair', 'explosives', 'filch', 'firearms', 'first-aid', 'fleeing', 'health', 'hypnosis', 'mechanical-repair', 'piloting', 'preparedness', 'psychoanalysis', 'riding', 'sanity', 'scuffling', 'sense-trouble', 'shadowing', 'stability', 'stealth', 'weapons'],
                nbaAcademic: ['accounting', 'archaeology', 'architecture', 'art-history', 'criminology', 'diagnosis', 'history', 'human-terrain', 'languages', 'law', 'military-science', 'occult-studies', 'research', 'vampirology'],
                nbaInterpersonal: ['bullshit-detector', 'bureaucracy', 'cop-talk', 'flattery', 'flirting', 'high-society', 'interrogation', 'intimidation', 'negotiation', 'reassurance', 'streetwise', 'tradecraft'],
                nbaTechnical: ['astronomy', 'chemistry', 'cryptography', 'data-recovery', 'electronic-surveillance', 'forensic-pathology', 'forgery', 'notice', 'outdoor-survival', 'pharmacy', 'photography', 'traffic-analysis', 'urban-survival'],
                nbaGeneral: ['athletics', 'conceal', 'cover', 'digital-intrusion', 'disguise', 'driving', 'explosive-devices', 'filch', 'gambling', 'hand-to-hand', 'health', 'infiltration', 'mechanics', 'medic', 'network', 'piloting', 'preparedness', 'sense-trouble', 'shooting', 'shrink', 'stability', 'surveillance', 'weapons']};
    
        getAttrs(["health_default", "stability_default", "sanity_default", "cover_default", "network_default", "sheetswitch", "firstopen", "gen_points_default", "inv_points_default"], function(values) {
            let updates = {version: 0.5};
    
            system = values.sheetswitch;
            _.each(sections, function(section) {
                tempArray = systemAbilities[system + section[0].toUpperCase() + section.substr(1)];
                currentAbilities[section] = tempArray;
                _.each(tempArray, function(ability) {
                    reverseAbilities[ability] = section;
                });
            });
    
            if(!values.firstopen) {
                _.each(["health", "stability", "sanity", "cover", "network"], function(ability) {
                    updates[ability + '_free'] = values[ability + "_default"];
                    if(!npc) {
                        updates[ability + '_max'] = updates[ability + "_free"];
                        updates[ability] = updates[ability + "_free"];
                    }
                });
    
                ["gen_points", "inv_points"].forEach((ability) => {
                    updates[ability] = 0;
                    updates[`${ability}_max`] = values[`${ability}_default`];
                });
                console.log(updates);
    
                updates.sanity_marker = updates.sanity_free;
                updates.firstopen = 1;
            }
    
            if(system == "toc") {
                updates.vampswitch = 0;
            }
    
            updates.sheetswitch = values.sheetswitch;
            setAttrs(updates, {}, function() {
                getSectionTotal();
            });
        });
    });
    
    on(changeString(["health", "stability", "sanity", "cover", "network"], ["default"]), function(eventInfo) {
        let trigger = eventInfo.sourceAttribute.split('_')[0],
            updates = {};
    
        updates[trigger + '_free'] = eventInfo.newValue;
        setAttrs(updates);
    });
    
    on("change:npcswitch", function(eventInfo) {
        let abilities = ["aberrance", "athletics", "conceal", "driving", "firearms", "hand-to-hand", "health", "medic", "scuffling", "shooting", "weapons"],
            abilityVal = 0,
            updates = {};
    
        if(parseInt(eventInfo.newValue) == 1) {
            updates["edit-abilities"] = 0;
            npc = true;
        } else {
            updates["edit-abilities"] = 1;
            abilityVal = "";
            npc = false;
        }
    
        _.each(abilities, function(x) {
            updates[x] = abilityVal;
        });
    
        if(npc) {
            setAttrs(updates);
        } else {
            getAttrs(abilityList(abilities, ["free"]), function(values) {
                _.each(abilities, function(ability) {
                    if(values[ability + '_free']) {
                        updates[ability + '_max'] = values[ability + '_free'];
                        updates[ability] = values[ability + '_free'];
                    }
                });
                setAttrs(updates);
            });
        }
    });
    
    on(changeString(allAbilities) + " change:spinner", function(eventInfo) {
        let trigger = eventInfo.sourceAttribute,
            resetAbilities = function(sectionArray) {
                getRepeating(sectionArray, function(resultArray, returnedSecs) {
                    let secAbilities = [],
                        fullList = []; //resultArray.concat(allAbilities);
    
                    _.each(returnedSecs, function(sec) {
                        secAbilities = secAbilities.concat(currentAbilities[sec]);
                    });
    
                    fullList = resultArray.concat(secAbilities);
    
                    getAttrs(abilityList(fullList, ['max', '']), function(vals) {
                        let results = {},
                            noReset = ["sanity", "health", "stability", "cover", "network"];
    
                        _.each(fullList, function(ability) {
                            if(vals[ability] != vals[ability + '_max'] && vals[ability + '_max'] != "0") {
                                if(noReset.indexOf(ability) == -1) {
                                    results[ability] = vals[ability + '_max'];
                                }
                            }
                        });
    
                        setAttrs(results);
                    });
                });
            };
    
        if(trigger) {
            if(trigger == "spinner") {
                getAttrs(["spinner"], function(values) {
                    setAttrs({spinner: ""}, {silent: true});
                    if(values.spinner == "reset-inv") {
                        resetAbilities(["academic", "interpersonal", "technical"]);
                    } else if(values.spinner == "reset-gen") {
                        resetAbilities(["general"]);
                    }
                    else {
                        abilityChange(getAbility(values.spinner));
                    }
                });
            } else {
                abilityChange(getAbility(trigger));
            }
        }
    });
    
    on(changeString(sections, pointChange, true), function(eventInfo) {
        let triggerArray = eventInfo.sourceAttribute.split('_'),
            trigger = triggerArray.pop();
        triggerArray.splice(2, 1);
        abilityChange([triggerArray.join('_'), trigger], true);
    });
    
    on(changeString(allAbilities, maxChange), function(eventInfo) {
        eventInfo.category = reverseAbilities[eventInfo.sourceAttribute.split('_')[0]];
        if(!npc) {
            getSectionTotal(currentAbilities[eventInfo.category], eventInfo);
        }
    });
    
    on(changeString(sections, maxChange, true), function(eventInfo) {
        eventInfo.category = eventInfo.sourceAttribute.split('_')[1];
        if(!npc) {
            getSectionIDs(eventInfo.category, function(repIds) {
                let nameArray = makeRepeatingArray(eventInfo.category, repIds);
                getSectionTotal(nameArray, eventInfo, true);
            });
        }
    });
    
    on("change:repeating_weapons", function(eventInfo) {
        if(eventInfo.sourceAttribute.split('_').length > 3) {
            getAttrs(
                abilityList(["melee", "point-blank", "close", "near", "long"], ["adjust"], "repeating_weapons_").concat(
                abilityList(["weapon-type", "capacity", "category", "ranged_weight", "melee_weight", "automatic", "double-barreled", "weapon-type-flag"], [""], "repeating_weapons_")),
            function(values) {
                let prefix = "repeating_weapons_",
                    results = {},
                    rWeight = parseInt(values[prefix + "ranged_weight"]),
                    pbWeight = rWeight,
                    nlWeight = rWeight,
                    cMod = 0,
                    nMod = 0,
                    lMod = 0,
                    pbMod = 2,
                    query = "",
                    changeRoll = function(roll, weight, extra = "", base = "") {
                        let fullQuery = extra == "" ? "" : "@{" + extra + "_query} ",
                            addMod = function(mod) {
                                if(mod == "") {
                                    return "";
                                } else {
                                    let intMod = parseInt(mod);
                                    if(intMod != 0) {
                                        return intMod > 0 ? "+" + intMod : intMod;
                                    } else {
                                        return "";
                                    }
                                }
                            };
                            results[prefix + roll +"_roll"] = extra ? fullQuery : "{{roll=[[1d6"
                            results[prefix + roll +"_roll"] += addMod(base) + addMod(weight) + addMod(values[prefix + roll +"_adjust"]) + "]]}}";
                        };
                results[prefix + "weapon-type-flag"] = values[prefix + "category"] == 'melee' ? 'm' : values[prefix + "weapon-type"][0];
                if(values[prefix + "category"] == "melee") {
                    results[prefix + "melee_mod"] = parseInt(values[prefix + "melee_weight"]) + parseInt(values[prefix + "melee_adjust"]);
                    changeRoll('melee', values[prefix + "melee_weight"]);
                } else {
                    if(values[prefix + "weapon-type"] == "shotgun") {
                        pbWeight = rWeight < 2 ? 1 : rWeight;
                        nlWeight = 0;
                        cMod = system == 'nba' ? 1 : 0;
                        if(values[prefix + "double-barreled"] == "1") {
                            query = "barrels";
                        }
                    }
    
                    if(values[prefix + "weapon-type"] == "automatic") {
                        results[prefix + "double-barreled"] = "";
                        query = "automatic";
                        if(parseInt(results[prefix + "capacity"]) >= 50) {
                            query = "automatic-heavy";
                        }
                    }
    
                    if(values[prefix + "weapon-type"] == "thrown") {
                        rWeight -= 1;
                        pbWeight -= 1;
                        nlWeight -= 1;
                        nMod = -1;
                        lMod = -1;
                        pbMod = 0;
                    }
    
                    results[prefix + "point-blank_mod"] = pbMod + pbWeight + parseInt(values[prefix + "point-blank_adjust"]);
                    changeRoll('point-blank', pbWeight, query, pbMod);
                    results[prefix + "close_mod"] = rWeight + cMod + parseInt(values[prefix + "close_adjust"]);
                    changeRoll('close', rWeight, query, cMod);
                    results[prefix + "near_mod"] = nlWeight + nMod + parseInt(values[prefix + "near_adjust"]);
                    changeRoll('near', nlWeight, query, nMod);
                    results[prefix + "long_mod"] = nlWeight +lMod + parseInt(values[prefix + "long_adjust"]);
                    changeRoll('long', nlWeight, query, lMod);
                }
                for(let key in results) {
                    if(key.substr(-4) == '_mod') {
                        results[key.slice(0, -4)] = results[key];
                        results[key] = results[key] >= 0 ? "+" + results[key] : results[key];
                    }
                }
                setAttrs(results, {silent: true});
            });
        }
    });
    
    on("change:unarmed_adjust", function() {
        getAttrs(["unarmed_adjust"], function(values) {
            let results = {};
    
            results.unarmed_mod = parseInt(values.unarmed_adjust) - 2;
            setAttrs(results);
        }) ;
    });
    
    on(changeString(["digital-intrusion", "medic", "shrink", "surveillance"], ["max"]), function(eventInfo) {
        if(system == "nba") {
            let updates = {}, trigger = eventInfo.sourceAttribute.split("_")[0],
                cherries = {medic: "diagnosis", shrink: "bullshit-detector", surveillance: "electronic-surveillance"};
            cherries["digital-intrusion"] = "cryptography";
    
            getAttrs([trigger + "_max", trigger + "_cherry", "cherry-branch-height",
                    cherries[trigger], cherries[trigger] + "_max", cherries[trigger] + "_free"], function(values) {
                let addPoint = function(ability, inc = 1) {
                    let points = values[ability] ? parseInt(values[ability]) : 0;
    
                    //updates[ability] = Math.max(points + inc, 0);
                    //updates[ability + "_max"] = Math.max(parseInt(values[ability + "_max"]) + inc, 0);
                    updates[ability + "_free"] = Math.max(parseInt(values[ability + "_free"]) + inc, 0);
                };
    
                if(values[trigger + "_max"] >= values["cherry-branch-height"]) {
                    if(!values[trigger + "_cherry"]) {
                        addPoint(cherries[trigger]);
                        updates[trigger + "_cherry"] = 1;
                    }
                } else {
                    if(values[trigger + "_cherry"]) {
                        addPoint(cherries[trigger], -1);
                        updates[trigger + "_cherry"] = "";
                    }
                }
    
                setAttrs(updates);
            });
        }
    });
    
    on("change:armor-type", function(eventInfo) {
        let updates = {};
    
        updates["bullet-reduction"] = 0;
        updates["melee-reduction"] = 0;
        updates["explosive-reduction"] = 0;
    
        switch(eventInfo.newValue) {
            case "balistic-cloth":
                updates["bullet-reduction"] = 1;
                break;
            case "police-vest":
                updates["bullet-reduction"] = 2;
                updates["melee-reduction"] = 1;
                break;
            case "military-armor":
                updates["bullet-reduction"] = 3;
                updates["explosive-reduction"] = 3;
        }
    
        setAttrs(updates);
    });
    
    on(changeString(["sanity", "cthulhu-mythos"], ["max"]), function() {
        getAttrs(["sanity", "sanity_max", "cthulhu-mythos_max"], function(values) {
            let result = {};
            if(!values["cthulhu-mythos_max"]) {
                values["cthulhu-mythos_max"] = 0;
            }
            result["sanity_marker"] = parseInt(values["sanity_max"]);
            if(parseInt(values["cthulhu-mythos_max"]) > 0) {
                result["sanity_marker"] = Math.min(parseInt(values["sanity_max"]), 10 - parseInt(values["cthulhu-mythos_max"]));
            }
            result["sanity_marker"] = Math.max(result["sanity_marker"], 0);
            result["sanity_marker"] = Math.min(result["sanity_marker"], 15);
            setAttrs(result);
        });
    });
    
    on("change:repeating_general:r-mos", function(eventInfo) {
        if(eventInfo.newValue == "1") {
            let updates = {mos: "blank"};
    
            getSectionIDs("repeating_general", function(idArray) {
                console.log(idArray);
                _.each(idArray, function(abilityID){
                    if(eventInfo.sourceAttribute != "repeating_general_" + abilityID + "_r-mos") {
                        updates["repeating_general_" + abilityID + "_r-mos"] = 0;
                    }
                });
                setAttrs(updates, {silent: true});
            });
        }
    });
    
    on("change:mos", function(eventInfo) {
        let updates = {};
    
        getSectionIDs("repeating_general", function(idArray) {
            _.each(idArray, function(abilityID){
                updates["repeating_general_" + abilityID + "_r-mos"] = 0;
            });
            console.log(updates);
            setAttrs(updates, {silent: true});
        });
    });