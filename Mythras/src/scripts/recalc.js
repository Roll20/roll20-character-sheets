// ##### Recalc #####
var recalc_sheet = function() {
    console.log("Recalculating all sheet values!");

    // Recalc Characteristics
    calc_str();
    calc_con();
    calc_siz();
    calc_dex();
    calc_int();
    calc_pow();
    calc_cha();

    // Recalc Known Skills
    getAttrs(["arcane_casting_learned"], function(v) {
        calc_skill("arcane_casting", "@{int}", "@{pow}", v.arcane_casting_learned);
        calc_arcane_casting_derived();
    });
    getAttrs(["arcane_knowledge_learned"], function(v) {
        calc_skill("arcane_knowledge", "@{int}", "@{int}", v.arcane_knowledge_learned);
        calc_arcane_knowledge_derived();
    });
    getAttrs(["artifice_learned"], function(v) {
        calc_skill("artifice", "@{int}", "@{dex}", v.artifice_learned);
    });
    calc_skill("athletics", "@{str}", "@{dex}", 1);
    getAttrs(["binding_learned"], function(v) {
        calc_skill("binding", "@{cha}", "@{pow}", v.binding_learned);
    });
    calc_skill("boating", "@{str}", "@{con}", 1);
    calc_skill("brawn", "@{str}", "@{siz}", 1);
    getAttrs(["channel_learned"], function(v) {
        calc_skill("channel", "@{cha}", "@{int}", v.channel_learned);
        calc_channel_derived();
    });
    calc_skill("conceal", "@{dex}", "@{pow}", 1);
    getAttrs(["craft_alchemy_learned"], function(v) {
        calc_skill("craft_alchemy", "@{dex}", "@{int}", v.craft_alchemy_learned);
    });
    getAttrs(["cursing_learned"], function(v) {
        calc_skill("cursing", "@{pow}", "@{cha}", v.cursing_learned);
    });
    calc_skill("customs", "@{int}", "@{int}", 1);
    calc_skill("dance", "@{cha}", "@{dex}", 1);
    calc_skill("deceit", "@{int}", "@{cha}", 1);
    getAttrs(["divination_learned"], function(v) {
        calc_skill("divination", "@{pow}", "@{int}", v.divination_learned);
    });
    calc_skill("drive", "@{dex}", "@{pow}", 1);
    calc_skill("endurance", "@{con}", "@{con}", 1);
    calc_skill("evade", "@{dex}", "@{dex}", 1);
    getAttrs(["exhort_learned"], function(v) {
        calc_skill("exhort", "@{cha}", "@{int}", v.exhort_learned);
    });
    getAttrs(["fata_learned"], function(v) {
        calc_skill("fata", "@{cha}", "@{pow}", v.fata_learned);
        calc_fata_derived();
    });
    calc_skill("first_aid", "@{int}", "@{dex}", 1);
    getAttrs(["folk_magic_learned"], function(v) {
        calc_skill("folk_magic", "@{cha}", "@{pow}", v.folk_magic_learned);
    });
    getAttrs(["gnosis_learned"], function(v) {
        calc_skill("gnosis", "@{int}", "@{pow}", v.gnosis_learned);
    });
    calc_skill("home_parallel", "@{int}", "@{int}", 1);
    calc_skill("influence", "@{cha}", "@{cha}", 1);
    calc_skill("insight", "@{int}", "@{pow}", 1);
    getAttrs(["linguistics_learned"], function(v) {
        calc_skill("linguistics", "@{cha}", "@{int}", v.linguistics_learned);
    });
    calc_skill("locale", "@{int}", "@{int}", 1);
    getAttrs(["meditation_learned"], function(v) {
        calc_skill("meditation", "@{con}", "@{int}", v.meditation_learned);
    });
    calc_skill("native_tongue", "@{int}", "@{cha}", 1);
    getAttrs(["necromancy_learned"], function(v) {
        calc_skill("necromancy", "@{cha}", "@{int}", v.necromancy_learned);
    });
    getAttrs(["pharmacy_learned"], function(v) {
        calc_skill("pharmacy", "@{int}", "@{int}", v.pharmacy_learned);
    });
    getAttrs(["piety_learned"], function(v) {
        calc_skill("piety", "@{cha}", "@{pow}", v.piety_learned);
    });
    calc_skill("perception", "@{int}", "@{pow}", 1);
    calc_skill("ride", "@{dex}", "@{pow}", 1);
    getAttrs(["shape_shifting_learned"], function(v) {
        calc_skill("shape_shifting", "@{con}", "@{pow}", v.shape_shifting_learned);
    });
    getAttrs(["shaping_learned"], function(v) {
        calc_skill("shaping", "@{int}", "@{pow}", v.shaping_learned);
    });
    calc_skill("sing", "@{cha}", "@{pow}", 1);
    calc_skill("status", "0", "0", 1);
    calc_skill("stealth", "@{int}", "@{dex}", 1);
    calc_skill("strangeness", "0", "0", 1);
    calc_skill("superstition", "@{int}", "@{pow}", 1);
    calc_skill("swim", "@{str}", "@{con}", 1);
    calc_skill("the_soot", "0", "0", 1);
    getAttrs(["theology_learned"], function(v) {
        calc_skill("theology", "@{pow}", "@{pow}", v.theology_learned);
    });
    getAttrs(["trance_learned"], function(v) {
        calc_skill("trance", "@{con}", "@{pow}", v.trance_learned);
    });
    calc_skill("unarmed", "@{str}", "@{dex}", 1);
    calc_skill("willpower", "@{pow}", "@{pow}", 1);

    // Recalc Unknown Skills
    getSectionIDs("repeating_affiliation", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_skill("repeating_affiliation_" + currentID, "0", "0", 1);
            });
        }
    });
    getSectionIDs("repeating_language", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_skill("repeating_language_" + currentID, "@{int}", "@{cha}", 1);
            });
        }
    });
    getSectionIDs("repeating_psionicpower", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_skill("repeating_psionicpower_" + currentID, "@{pow}", "@{pow}", 1);
            });
        }
    });
    getSectionIDs("repeating_magicspell", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_skill("repeating_magicspell_" + currentID, "@{pow}", "@{pow}", 1);
            });
        }
    });
    getSectionIDs("repeating_path", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_skill("repeating_path_" + currentID, "@{pow}", "@{con}", 1);
            });
        }
    });
    getSectionIDs("repeating_alchemicaltradition", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_skill("repeating_alchemicaltradition_" + currentID, "@{int}", "@{int}", 1);
            });
        }
    });
    getSectionIDs("repeating_discipline", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_skill("repeating_discipline_" + currentID, "@{pow}", "@{pow}", 1);
            });
        }
    });
    getSectionIDs("repeating_devotion", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_skill("repeating_devotion_" + currentID, "@{pow}", "@{cha}", 1);
            });
        }
    });
    getSectionIDs("repeating_combatstyle", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                var char1 = "repeating_combatstyle_" + currentID + "_char1";
                var char2 = "repeating_combatstyle_" + currentID + "_char2";
                getAttrs([char1, char2], function(v) {
                    calc_skill("repeating_combatstyle_" + currentID, v[char1], v[char2], 1);
                });
            });
        }
    });
    getSectionIDs("repeating_standardskill", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                var char1 = "repeating_standardskill_" + currentID + "_char1";
                var char2 = "repeating_standardskill_" + currentID + "_char2";
                getAttrs([char1, char2], function(v) {
                    calc_skill("repeating_standardskill_" + currentID, v[char1], v[char2], 1);
                });
            });
        }
    });
    getSectionIDs("repeating_professionalskill", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                var char1 = "repeating_professionalskill_" + currentID + "_char1";
                var char2 = "repeating_professionalskill_" + currentID + "_char2";
                getAttrs([char1, char2], function(v) {
                    calc_skill("repeating_professionalskill_" + currentID, v[char1], v[char2], 1);
                });
            });
        }
    });
    getSectionIDs("repeating_invocation", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                var char1 = "repeating_invocation_" + currentID + "_char1";
                var char2 = "repeating_invocation_" + currentID + "_char2";
                getAttrs([char1, char2], function(v) {
                    calc_skill("repeating_invocation_" + currentID, v[char1], v[char2], 1);
                });
            });
        }
    });

    // Recalc Passions and Dependencies
    getSectionIDs("repeating_passion", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_passion("repeating_passion_" + currentID);
            });
        }
    });
    getSectionIDs("repeating_dependency", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_passion("repeating_dependency_" + currentID);
            });
        }
    });
    getSectionIDs("repeating_peculiarity", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_passion("repeating_peculiarity_" + currentID);
            });
        }
    });

    // Recalc Hit Points
    calc_hp_max_base();
    calc_simplified_hp();
    calc_location_hp("location1");
    calc_location_hp("location2");
    calc_location_hp("location3");
    calc_location_hp("location4");
    calc_location_hp("location5");
    calc_location_hp("location6");
    calc_location_hp("location7");
    calc_location_hp("location8");
    calc_location_hp("location9");
    calc_location_hp("location10");
    calc_location_hp("location11");
    calc_location_hp("location12");

    // Recalc Attributes
    calc_action_points();
    calc_spirit_damage();
    calc_damage_mod();
    calc_experience_mod();
    calc_healing_rate();
    calc_initiative();
    calc_spirit_intensity();
    calc_luck_points();
    calc_magic_points();
    calc_power_points();
    calc_prana_points();
    calc_tenacity();

    // Recalc Encumbrance
    calc_melee_enc();
    calc_ranged_enc();
    calc_armor_enc();
    calc_equipment_enc();
    calc_currency_enc();
    calc_enc();

    // Recalc Other
    calc_max_spirits();
    calc_movement();
    calc_fatigue();
};
on("clicked:recalc", function() { recalc_sheet(); });