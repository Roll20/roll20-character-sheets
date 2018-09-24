<script type="text/worker">
on("change:repeating_clocks", function(eventInfo) {
    getSectionIDs("clocks", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            getAttrs(["repeating_clocks_4progress", "repeating_clocks_6progress", "repeating_clocks_8progress"], function(values) {
                var fourclock = {};
                fourclock["repeating_clocks_4progress1"] = values["repeating_clocks_4progress"];
                fourclock["repeating_clocks_4progress2"] = values["repeating_clocks_4progress"];
                fourclock["repeating_clocks_4progress3"] = values["repeating_clocks_4progress"];
                setAttrs(fourclock);
                var sixclock = {};
                sixclock["repeating_clocks_6progress1"] = values["repeating_clocks_6progress"];
                sixclock["repeating_clocks_6progress2"] = values["repeating_clocks_6progress"];
                sixclock["repeating_clocks_6progress3"] = values["repeating_clocks_6progress"];
                setAttrs(sixclock);
                var eightclock = {};
                eightclock["repeating_clocks_8progress1"] = values["repeating_clocks_8progress"];
                eightclock["repeating_clocks_8progress2"] = values["repeating_clocks_8progress"];
                eightclock["repeating_clocks_8progress3"] = values["repeating_clocks_8progress"];
                setAttrs(eightclock);
            });
        }
    });
});

on("change:create-neighborhood", function() {
    getAttrs(["create-neighborhood", "create-show", "hide-create-neighborhood", "gmpage", "show-page"], function(values) {
        if ((values["create-neighborhood"] == "on") && (values["create-show"] == "on")) {
            var turnOff = {};
            turnOff["hide-create-neighborhood"] = "on";
            setAttrs(turnOff);
            var otherPage = {};
            otherPage["hide-create-show"] = "on";
            setAttrs(otherPage);
        }
    });
});

on("change:create-show", function() {
    getAttrs(["create-show", "create-neighborhood", "hide-create-show", "gmpage", "show-page"], function(values) {
        if ((values["create-show"] == "on") && (values["create-neighborhood"] == "on")) {
            var turnOff = {};
            turnOff["hide-create-show"] = "on";
            setAttrs(turnOff);
            var otherPage = {};
            otherPage["hide-create-neighborhood"] = "on";
            setAttrs(otherPage);
        }
    });
});


on("change:show-start-intro", function() {
    getAttrs(["show-start-intro", "show-page", "gmpage"], function(values) {
        if ((values["show-start-intro"] == "on")) {
            var changePage = {};
            changePage["gmpage"] = "show";
            setAttrs(changePage);
            var turnOff = {};
            turnOff["show-page"] = "intro";
            setAttrs(turnOff);
        }
    });
});

on("change:neighborhood-start-intro", function() {
    getAttrs(["neighborhood-start-intro", "show-page", "gmpage"], function(values) {
        if ((values["neighborhood-start-intro"] == "on")) {
            var changePage = {};
            changePage["gmpage"] = "show";
            setAttrs(changePage);
            var turnOff = {};
            turnOff["show-page"] = "intro";
            setAttrs(turnOff);
        }
    });
});


on("change:create-neighborhood", function() {
    getAttrs(["create-neighborhood", "gmpage"], function(values) {
        if ((values["create-neighborhood"] == "on")) {
            var turnOff = {};
            turnOff["gmpage"] = "neighborhood";
            turnOff["create-neighborhood"] = false;
            setAttrs(turnOff);
        }
    });
});
on("change:create-show", function() {
    getAttrs(["create-show", "gmpage"], function(values) {
        if ((values["create-show"] == "on")) {
            var turnOff = {};
            turnOff["gmpage"] = "show";
            turnOff["create-show"] = false;
            setAttrs(turnOff);
        }
    });
});
//STAR SHEET FLOW
on("change:start-intro", function() {
    getAttrs(["start-intro", "star-page"], function(values) {
        if ((values["start-intro"] == "on")) {
            var turnOff = {};
            turnOff["star-page"] = "intro";
            turnOff["start-intro"] = false;
            setAttrs(turnOff);
        }
    });
});
on("change:start-episode", function() {
    getAttrs(["start-episode", "star-page"], function(values) {
        if ((values["start-episode"] == "on")) {
            var turnOff = {};
            turnOff["star-page"] = "episode";
            turnOff["star-start-episode"] = false;
            setAttrs(turnOff);
        }
    });
});
on("change:star-start-outro", function() {
    getAttrs(["star-start-outro", "star-page"], function(values) {
        if ((values["star-start-outro"] == "on")) {
            var turnOff = {};
            turnOff["star-page"] = "outro";
            turnOff["star-start-outro"] = false;
            setAttrs(turnOff);
        }
    });
});
on("change:start-downtime", function() {
    getAttrs(["start-downtime", "star-page"], function(values) {
        if ((values["start-downtime"] == "on")) {
            var turnOff = {};
            turnOff["star-page"] = "downtime";
            turnOff["start-downtime"] = false;
            setAttrs(turnOff);
        }
    });
});
//GM SHEET FLOW
on("change:show-start-episode", function() {
    getAttrs(["show-start-episode", "show-page"], function(values) {
        if ((values["show-start-episode"] == "on")) {
            var turnOff = {};
            turnOff["show-page"] = "episode";
            setAttrs(turnOff);
        }
    });
});
on("change:show-start-outro", function() {
    getAttrs(["show-start-outro", "show-page"], function(values) {
        if ((values["show-start-outro"] == "on")) {
            var turnOff = {};
            turnOff["show-page"] = "outro";
            setAttrs(turnOff);
        }
    });
});
on("change:show-start-downtime", function() {
    getAttrs(["show-start-downtime", "neighborhood-page", "gmpage"], function(values) {
        if ((values["show-start-downtime"] == "on")) {
            var changePage = {};
            changePage["gmpage"] = "neighborhood";
            setAttrs(changePage);
            var turnOff = {};
            turnOff["neighborhood-page"] = "downtime";
            setAttrs(turnOff);
        }
    });
});

/*const uncheckAdvances = */
on("change:gaze", function() {
    getAttrs(["hidden-gaze", "gaze", "hidden-gaze1", "gaze1", "hidden-gaze2", "gaze2"], function(values) {
        var setHidden = {};
        setHidden["gaze2"] = values.gaze;
        setHidden["gaze1"] = values.gaze;
        setHidden["hidden-gaze"] = values.gaze;
        setAttrs(setHidden);
    });
});
on("change:gaze1", function() {
    getAttrs(["hidden-gaze", "gaze", "hidden-gaze1", "gaze1", "hidden-gaze2", "gaze2"], function(values) {
        var setHidden = {};
        setHidden["gaze2"] = values.gaze1;
        setHidden["gaze"] = values.gaze1;
        setHidden["hidden-gaze1"] = values.gaze1;
        setAttrs(setHidden);
    });
});
on("change:gaze2", function() {
    getAttrs(["hidden-gaze", "gaze", "hidden-gaze1", "gaze1", "hidden-gaze2", "gaze2"], function(values) {
        var setHidden = {};
        setHidden["gaze1"] = values.gaze2;
        setHidden["gaze"] = values.gaze2;
        setHidden["hidden-gaze2"] = values.gaze2;
        setAttrs(setHidden);
    });
});
on("change:ichor2", function() {
    getAttrs(["hidden-ichor2", "ichor2"], function(values) {
        var setHidden = {};
        setHidden["hidden-ichor2"] = values.ichor2;
        setAttrs(setHidden);
    });
});
on("change:remaining-ichor", function() {
    getAttrs(["remaining-ichor"], function(values) {
        var setHidden = {};
        setHidden["gaze1"] = 8 - values["remaining-ichor"];
        setAttrs(setHidden);
    });
});
on("change:progress", function() {
    getAttrs(["progress"], function(values) {
        var setHidden = {};
        setHidden["progress1"] = values.progress;
        setHidden["progress2"] = values.progress;
        setHidden["progress3"] = values.progress;
        setAttrs(setHidden);
    });
});

on("change:group-activity change:nh-group-activity", function() {
    getAttrs(["group-activity", "nh-group-activity"], function(values) {
        var setHidden = {};
        setHidden["group-activity1"] = values["group-activity"];
        setHidden["group-activity2"] = values["group-activity"];
        setHidden["group-activity3"] = values["group-activity"];
        setAttrs(setHidden);
        var setHidde = {};
        setHidde["nh-group-activity1"] = values["nh-group-activity"];
        setHidde["nh-group-activity2"] = values["nh-group-activity"];
        setHidde["nh-group-activity3"] = values["nh-group-activity"];
        setAttrs(setHidde);
    });
});

on("change:episode-type", function () {
    getAttrs(["episode-type"], function(values) {
        var setHidden = {};
        setHidden["episode-trigger"] = values["episode-type"];
        setAttrs(setHidden);
    })
})

/*
on("sheet:opened", function() {
    getAttrs(["hidden-stress", "stress"], function(values) {
        var setHidden = {};
        setHidden["hidden-stress"] = values.stress;
        setAttrs(setHidden);
    });
});*/
on("change:stress", function() {
    getAttrs(["hidden-stress", "stress", "hidden-stress1", "stress1", "hidden-stress2", "stress2"], function(values) {
        var setHidden = {};
        setHidden["stress2"] = values.stress;
        setHidden["stress1"] = values.stress;
        setHidden["hidden-stress"] = values.stress;
        setAttrs(setHidden);
    });
});
on("change:stress1", function() {
    getAttrs(["hidden-stress1", "stress1", "hidden-stress2", "stress2"], function(values) {
        var setHidden = {};
        setHidden["stress2"] = values.stress1;
        setHidden["stress"] = values.stress1;
        setHidden["hidden-stress1"] = values.stress1;
        setAttrs(setHidden);
    });
});
on("change:stress2", function() {
    getAttrs(["hidden-stress1", "stress1", "hidden-stress2", "stress2"], function(values) {
        var setHidden = {};
        setHidden["stress1"] = values.stress2;
        setHidden["stress"] = values.stress2;
        setHidden["hidden-stress2"] = values.stress2;
        setAttrs(setHidden);
    });
});


on("change:showxp1", function() {
    getAttrs(["hidden-showxp1", "showxp1", "hidden-showxp2", "showxp2"], function(values) {
        var setHidden = {};
        setHidden["showxp2"] = values.showxp1;
        setHidden["hidden-showxp1"] = values.showxp1;
        setAttrs(setHidden);
    });
});
on("change:showxp2", function() {
    getAttrs(["hidden-showxp1", "showxp1", "hidden-showxp2", "showxp2"], function(values) {
        var setHidden = {};
        setHidden["showxp1"] = values.showxp2;
        setHidden["hidden-showxp2"] = values.showxp2;
        setAttrs(setHidden);
    });
});

on("sheet:opened", function() {
    getAttrs(["hidden-tropexp", "tropexp"], function(values) {
        var setHidden = {};
        setHidden["hidden-tropexp"] = values.tropexp;
        setAttrs(setHidden);
    });
});
on("change:tropexp", function() {
    getAttrs(["hidden-tropexp", "tropexp"], function(values) {
        var setHidden = {};
        setHidden["hidden-tropexp"] = values.tropexp;
        setAttrs(setHidden);
    });
});

on("sheet:opened", function() {
    getAttrs(["hidden-humanityxp", "humanityxp"], function(values) {
        var setHidden = {};
        setHidden["hidden-humanityxp"] = values.humanityxp;
        setAttrs(setHidden);
    });
});
on("change:humanityxp", function() {
    getAttrs(["hidden-humanityxp", "humanityxp"], function(values) {
        var setHidden = {};
        setHidden["hidden-humanityxp"] = values.humanityxp;
        setAttrs(setHidden);
    });
});
//Unchecking Advances
on("change:repeating_starability", function() {
    getSectionIDs("repeating_starability", idarray => {
        for(var i=0; i < idarray.length; i++) {
            var resetXP = {};
            resetXP["tropexp"] = 0;
            setAttrs(resetXP);
        }
    });
});
//Unchecking Show Advance
on("change:repeating_show-ability", function() {
    getSectionIDs("repeating_show-ability", idarray => {
        for(var i=0; i < idarray.length; i++) {
            var resetXP = {};
            resetXP["showxp"] = 0;
            setAttrs(resetXP);
        }
    });
});
on("change:repeating_upgrade", function() {
    getSectionIDs("repeating_upgrade", idarray => {
        for(var i=0; i < idarray.length; i++) {
            var resetXP = {};
            resetXP["showxp"] = 0;
            setAttrs(resetXP);
        }
    });
});
on("change:repeating_facet", function() {
    getSectionIDs("repeating_facet", idarray => {
        for(var i=0; i < idarray.length; i++) {
            var resetXP = {};
            resetXP["humanityxp"] = 0;
            setAttrs(resetXP);
        }
    });
});


//Tutorial
on("change:concept", function() {
    getAttrs(["show", "Flashy-description", "Dark-description", "Corrupted-description", "concept"], function(values) {
        if ((values.concept != "") && (values.show != "")) {
            var turnOff = {};
            turnOff["show-glow"] = false;
            setAttrs(turnOff);
        }
    });
});
on("change:show", function() {
    getAttrs(["concept", "Flashy-description", "Dark-description", "Corrupted-description", "show"], function(values) {
        if ((values.concept != "") && (values.show != "")) {
            var turnOff = {};
            turnOff["show-glow"] = false;
            setAttrs(turnOff);
        }
    });
});
//Neighborhood Creation Tutorial
on("change:neighborhood", function() {
    getAttrs(["neighborhood", "neighborhood_trait1_name", "neighborhood_trait2_name", "neighborhood_trait3_name", "neighborhood_trait4_name"], function(values) {
        if ((values.neighborhood != "") && (values.neighborhood_trait1_name != "") && (values.neighborhood_trait2_name != "") && (values.neighborhood_trait3_name != "") && (values.neighborhood_trait4_name != "")) {
            var turnOff = {};
            turnOff["neighborhood-glow"] = false;
            setAttrs(turnOff);
        }
    });
});
on("change:neighborhood_trait1_name", function() {
    getAttrs(["neighborhood", "neighborhood_trait1_name", "neighborhood_trait2_name", "neighborhood_trait3_name", "neighborhood_trait4_name"], function(values) {
        if ((values.neighborhood != "") && (values.neighborhood_trait1_name != "") && (values.neighborhood_trait2_name != "") && (values.neighborhood_trait3_name != "") && (values.neighborhood_trait4_name != "")) {
            var turnOff = {};
            turnOff["neighborhood-glow"] = false;
            setAttrs(turnOff);
        }
    });
});
on("change:neighborhood_trait2_name", function() {
    getAttrs(["neighborhood", "neighborhood_trait1_name", "neighborhood_trait2_name", "neighborhood_trait3_name", "neighborhood_trait4_name"], function(values) {
        if ((values.neighborhood != "") && (values.neighborhood_trait1_name != "") && (values.neighborhood_trait2_name != "") && (values.neighborhood_trait3_name != "") && (values.neighborhood_trait4_name != "")) {
            var turnOff = {};
            turnOff["neighborhood-glow"] = false;
            setAttrs(turnOff);
        }
    });
});
on("change:neighborhood_trait3_name", function() {
    getAttrs(["neighborhood", "neighborhood_trait1_name", "neighborhood_trait2_name", "neighborhood_trait3_name", "neighborhood_trait4_name"], function(values) {
        if ((values.neighborhood != "") && (values.neighborhood_trait1_name != "") && (values.neighborhood_trait2_name != "") && (values.neighborhood_trait3_name != "") && (values.neighborhood_trait4_name != "")) {
            var turnOff = {};
            turnOff["neighborhood-glow"] = false;
            setAttrs(turnOff);
        }
    });
});
on("change:neighborhood_trait4_name", function() {
    getAttrs(["neighborhood", "neighborhood_trait1_name", "neighborhood_trait2_name", "neighborhood_trait3_name", "neighborhood_trait4_name"], function(values) {
        if ((values.neighborhood != "") && (values.neighborhood_trait1_name != "") && (values.neighborhood_trait2_name != "") && (values.neighborhood_trait3_name != "") && (values.neighborhood_trait4_name != "")) {
            var turnOff = {};
            turnOff["neighborhood-glow"] = false;
            setAttrs(turnOff);
        }
    });
});
on("change:specialfxpopulate", function() {
    getSectionIDs("repeating_show-ability", function(idarray) {
                for(var i=0; i < idarray.length; i++) {
                removeRepeatingRow("repeating_show-ability_" + idarray[i]);
                }
            });
    getAttrs(["specialfxpopulate"], function(values) {
        if (values["specialfxpopulate"] == "on") {
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Tesselation FX";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "Create and control an array of colorful, glassy geometric shapes.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Timestretch FX";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "Slow or speed up the flow of time.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Levitation FX";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "Levitate people and objects.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "CGI FX";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "The Editing in this Scene becomes a physical phenomenon";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Sound FX";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "The Sound in this Scene becomes a physical phenomenon";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Fractal FX";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "Every shot of Footage in this Scene contains the rest of the Footage in its details.";
            setAttrs(newrowattrs);
        }
    });
});
//Star Creation Tutorial
/*on("change:trope", function() {
    getAttrs(["look3", "hometown", "dayjob", "look1", "look2"], function(values) {
        if ((values.trope != "socks") && (values.hometown != "socks") && (values.dayjob != "socks") && (values.look1 != "socks") && (values.look2 != "socks") && (values.look3 != "socks")) {
            var turnOff = {};
            turnOff["creation-glow"] = false;
            setAttrs(turnOff);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Hometown";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your hometown).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Day";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your day job).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Look";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your look).";
            setAttrs(newrowattrs);
        }
    });
});

on("change:dayjob", function() {
    getAttrs(["trope", "hometown", "look3", "look1", "look2"], function(values) {
        if ((values.trope != "socks") && (values.hometown != "socks") && (values.dayjob != "socks") && (values.look1 != "socks") && (values.look2 != "socks") && (values.look3 != "socks")) {
            var turnOff = {};
            turnOff["creation-glow"] = false;
            setAttrs(turnOff);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Hometown";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your hometown).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Day";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your day job).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Vice";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your vice).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Look";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your look).";
            setAttrs(newrowattrs);
        }
    });
});
on("change:vice", function() {
    getAttrs(["trope", "hometown", "dayjob", "look3", "look1", "look2"], function(values) {
        if ((values.trope != "socks") && (values.hometown != "socks") && (values.dayjob != "socks") && (values.look1 != "socks") && (values.look2 != "socks") && (values.look3 != "socks")) {
            var turnOff = {};
            turnOff["creation-glow"] = false;
            setAttrs(turnOff);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Hometown";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your hometown).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Day";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your day job).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Look";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your look).";
            setAttrs(newrowattrs);
        }
    });
});
on("change:look1", function() {
    getAttrs(["trope", "hometown", "dayjob", "look3", "look2"], function(values) {
        if ((values.trope != "socks") && (values.hometown != "socks") && (values.dayjob != "socks") && (values.look1 != "socks") && (values.look2 != "socks") && (values.look3 != "socks")) {
            var turnOff = {};
            turnOff["creation-glow"] = false;
            setAttrs(turnOff);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Hometown";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your hometown).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Day";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your day job).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Look";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your look).";
            setAttrs(newrowattrs);
        }
    });
});
on("change:look2", function() {
    getAttrs(["trope", "hometown", "dayjob", "look1", "look3"], function(values) {
        if ((values.trope != "socks") && (values.hometown != "socks") && (values.dayjob != "socks") && (values.look1 != "socks") && (values.look2 != "socks") && (values.look3 != "socks")) {
            var turnOff = {};
            turnOff["creation-glow"] = false;
            setAttrs(turnOff);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Hometown";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your hometown).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Day";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your day job).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Look";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your look).";
            setAttrs(newrowattrs);
        }
    });
});
on("change:look3", function() {
    getAttrs(["trope", "hometown", "dayjob", "look1", "look2"], function(values) {
        if ((values.trope != "socks") && (values.hometown != "socks") && (values.dayjob != "socks") && (values.look1 != "socks") && (values.look2 != "socks") && (values.look3 != "socks")) {
            var turnOff = {};
            turnOff["creation-glow"] = false;
            setAttrs(turnOff);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Hometown";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your hometown).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Day";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your day job).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Look";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "(Write in an Reason based on your look).";
            setAttrs(newrowattrs);
        }
    });
});*/

on("change:humanityxp", function() {
    getAttrs(["humanityxp"], function(values) {
        if (values.humanityxp == "8") {
            var turnOn = {};
            turnOn["facet-glow"] = "on";
            setAttrs(turnOn);
        } else {
            var turnOff = {};
            turnOff["facet-glow"] = false;
            setAttrs(turnOff);
        }
    });
});
/*on("change:chaosMode", function() {
    getAttrs(["chaosMode"], function(values) {
        switch (values.chaosMode) {
            case "Swarm":
                var chaosPower = {};
                chaosPower["chaosPower"] = "You can transform into a swarm of owl moths.";
                setAttrs(chaosPower);
                var chaosKey = {};
                chaosKey["chaosKey"] = "When you make someone's home or place of work into an unpassable labyrinth, mark XP.";
                setAttrs(chaosKey);
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
                newrowattrs["repeating_facet_" + newrowid + "_description"] = "Symmetry is dead to me. Everything must be ever-so-slightly out of balance.";
                setAttrs(newrowattrs);
            break;
            case "Beast":
                var chaosPower = {};
                chaosPower["chaosPower"] = "You can lengthen your nails to razor-sharp points.";
                setAttrs(chaosPower);
                var chaosKey = {};
                chaosKey["chaosKey"] = "When you floss dried blood out of your teeth, or pick it out of your fingernails, mark XP.";
                setAttrs(chaosKey);
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
                newrowattrs["repeating_facet_" + newrowid + "_description"] = "Blood belongs upon the skin. Not hidden away under it.";
                setAttrs(newrowattrs);
            break;
            case "Spider":
                var chaosPower = {};
                chaosPower["chaosPower"] = "You can walk up walls and ceilings.";
                setAttrs(chaosPower);
                var chaosKey = {};
                chaosKey["chaosKey"] = "When you watch someone experience shock and horror, mark XP.";
                setAttrs(chaosKey);
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
                newrowattrs["repeating_facet_" + newrowid + "_description"] = "I am quiet. Invisible.";
                setAttrs(newrowattrs);
            break;
            case "Everyman":
                var chaosPower = {};
                chaosPower["chaosPower"] = "You can eerily reflect someone's appearance.";
                setAttrs(chaosPower);
                var chaosKey = {};
                chaosKey["chaosKey"] = "When you hide from your own faceless image and reflective identity, mark XP.";
                setAttrs(chaosKey);
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
                newrowattrs["repeating_facet_" + newrowid + "_description"] = "(This facet freely transforms into a facet of someone else's personality).";
                setAttrs(newrowattrs);
            break;
            case "Dress":
                var chaosPower = {};
                chaosPower["chaosPower"] = "#TheDress sometimes appears upon your body to unravel objective reality.";
                setAttrs(chaosPower);
                var chaosKey = {};
                chaosKey["chaosKey"] = "When you say yes to one of #TheDress's edicts, mark XP.";
                setAttrs(chaosKey);
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_facet_" + newrowid + "_locked"] = "";
                newrowattrs["repeating_facet_" + newrowid + "_description"] = "No mortal is fit to know my true colors.";
                setAttrs(newrowattrs);
            break;
        }
    });
});*/
//TROPE AUTOFILLS
on("change:trope", function() {
            getSectionIDs("repeating_starability", function(idarray) {
                for(var i=0; i < idarray.length; i++) {
                removeRepeatingRow("repeating_starability_" + idarray[i]);
                }
            });
    getAttrs(["trope"], function(values) {
        //Types of Abilities. Tied to the factors of the Cinematic Style. 1 Special FX. 1 tied to gaze or spending it. 1 tied to new downtime stuff. 1 tied to Reasons
        switch (values.trope) {
        case "Indie" :
        //The Indie is all about independence, being a diva, and creativity. Bad at cooperation and direct action.
            var newrowid = generateRowID();
            var newrowattrs = {};
            //newrowattrs["repeating_starability_" + newrowid + "_tooltip"] = "Artist";
            newrowattrs["repeating_starability_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Artist";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "Specialty: A flashback scene to a moment of artistic inspiration costs 0 stress.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_tooltip"] = "Got Ideas";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Got Ideas";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When you put a complex obstacle on your to-do list, always fill in the first tick.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            //newrowattrs["repeating_starability_" + newrowid + "_tooltip"] = "Transformation";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Transformation";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When you change into Apparel of higher quality than your lifestyle, refresh your specialty.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_tooltip"] = "Trendsetter";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Trendsetter";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When you gather information about trends in fashion or style, take +1 effect level.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            //newrowattrs["repeating_starability_" + newrowid + "_tooltip"] = "Narcissist";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Always a Critic";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When you critique someone's work or perfromance, you clear +1 gaze.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_tooltip"] = "My Idea";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "My Idea";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When the detail is your idea, take an extra die the transition roll";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Skilled Shopper";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When you Acquire Apparel or Entertainment Assets in Flashbacks, take an extra die.";
            setAttrs(newrowattrs);
            /*var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_tooltip"] = "Stealing Spotlight";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Stealing Spotlight";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When any star makes an action roll, and you dominate the shot.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Trope";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "What I see in my imagination is more perfect than any human could be.";
            setAttrs(newrowattrs);*/
            var tropeTypecast = {};
            tropeTypecast["break"] = "0";
            tropeTypecast["drive"] = "0";
            tropeTypecast["rush"] = "0";
            tropeTypecast["bouge"] = "1";
            tropeTypecast["fake"] = "0";
            tropeTypecast["hack"] = "0";
            tropeTypecast["Creep"] = "0";
            tropeTypecast["snap"] = "1";
            tropeTypecast["tempt"] = "0";
            setAttrs(tropeTypecast);
            var playbookKey = {};
            playbookKey["playbook-key"] = "When you create trouble for the sake of your creative vision.";
            setAttrs(playbookKey);

    
            break;
        case "Guest" :
        //The Horrors watch you because you're despicable. Your power niche is XP, and creating more Stars to Trust and Hate. Wait can we merge the Freak into this playbook?
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Disposable";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "Specialty: Spend 6 stress. Create a new guest. If you finagle a way to keep this Guest in the episode, you can play multiple Guests at once.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Client";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When the other Stars finish a transformation, performance, or competition episode to your liking, add +2 Cash to the payoff.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Blurring Together";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "You may donate your Passion XP to the Show's XP or to another Guest.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Celebrity";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When you show up places, the GM will tell you who among them knows your face, name, or recent press (one, a few, many, or all).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "UnReasonable Demands";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "The show gains an additional xp trigger: the guests created trouble for the stars with their unReasonable demands.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Scapegoat";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When you're thrown under the bus, the show clears 1 gaze.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Love to Hate";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When another star starts drama with you, clear +1 gaze";
            setAttrs(newrowattrs);
            /*var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Trope";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "I am entitled to the service of the other stars.";
            setAttrs(newrowattrs);*/
            var tropeTypecast = {};
            tropeTypecast["break"] = "1";
            tropeTypecast["drive"] = "1";
            tropeTypecast["rush"] = "0";
            tropeTypecast["bouge"] = "0";
            tropeTypecast["fake"] = "0";
            tropeTypecast["hack"] = "0";
            tropeTypecast["Creep"] = "0";
            tropeTypecast["snap"] = "0";
            tropeTypecast["tempt"] = "0";
            setAttrs(tropeTypecast);
            var playbookKey = {};
            playbookKey["playbook-key"] = "If this is your debut episode.";
            setAttrs(playbookKey);


            break;
        case "Hustler" :
            //The Hustler is good with money
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "The Hustle";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "Whether you swindled it or worked hard for it, you, almost without fail, have a spare thousand dollars laying around. Expend your specialty to produce 1 cash.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Skimmer";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "In the Intro, when you take out a loan, take +2 stash.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Double Exposure";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "You may push yourself to appear to multiply across the screen. While you do, your scale is 1 higher.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Headhunter";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When the stars create a new cohort, you get to pick an additional show upgrade.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Cheat";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "Refresh your specialty when you successfully con someone.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Deal Closer";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "During downtime, you get two ticks to distribute among any long-term project clocks that involve closing deals.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Stocked";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "Take an extra die when you acquire supplies or apparel for your businesses";
            setAttrs(newrowattrs);
            /*var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Trope";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "Everyone's money can work best for them only if placed in the most capable hands: mine.";
            setAttrs(newrowattrs);*/
            var tropeTypecast = {};
            tropeTypecast["break"] = "0";
            tropeTypecast["drive"] = "0";
            tropeTypecast["rush"] = "1";
            tropeTypecast["bouge"] = "0";
            tropeTypecast["fake"] = "1";
            tropeTypecast["hack"] = "0";
            tropeTypecast["Creep"] = "0";
            tropeTypecast["snap"] = "0";
            tropeTypecast["tempt"] = "0";
            setAttrs(tropeTypecast);
            var playbookKey = {};
            playbookKey["playbook-key"] = "When you exploit or con people.";
            setAttrs(playbookKey);

            
            break;

        case "Voice" : 
            //The Voice is nearly an extension of the show. They control the sound.
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Mysterious Studio";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "You broadcast from a mysterious studio. You do not get a turn to frame scenes, but instead, your voice is the narration of all scenes.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "The Weather";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "Specialty: You may resist a consequence instead of one of the stars by cutting to a segment of your show.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Narrator";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When you narrate the recap in the voice of your character, take an extra die on the transition roll.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "A Story About Them";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "You may frame scenes, but only flashback scenes of someone who listens to your broadcast.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Behind the Cables";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "Refresh your specialty when you uncover a dark secret about your studio.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Audio Technician";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "Take an extra die when you acquire audio tech (gear) or break music (supplies).";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "BRINY DEPTHS";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "You may spend 1 gaze to gain full control over your voice's harmonics, to perfect your voice for a moment or to add undertones which sound like instruments. Ask the Horrors: What dark message is also riding your signal?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Interview";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "You can make other stars confess to your questions. They appear in your Studio for a moment.";
            setAttrs(newrowattrs);
            /*var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Trope";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "I have a beautiful voice.";
            setAttrs(newrowattrs);*/
            var tropeTypecast = {};
            tropeTypecast["break"] = "0";
            tropeTypecast["drive"] = "0";
            tropeTypecast["rush"] = "0";
            tropeTypecast["bouge"] = "0";
            tropeTypecast["fake"] = "0";
            tropeTypecast["hack"] = "1";
            tropeTypecast["Creep"] = "0";
            tropeTypecast["snap"] = "0";
            tropeTypecast["tempt"] = "1";
            setAttrs(tropeTypecast);
            var playbookKey = {};
            playbookKey["playbook-key"] = "When you run a successful broadcast.";
            setAttrs(playbookKey);
            /*var studio = {};
            studio["neighborhood-name"] = "A Dark AND HORRIBLE STUDIO";
            setAttrs(studio);
            var studioNotes = {};
            studioNotes["neighborhood-notes"] = "When you try to leave this place, you end up back in front of a microphone. You cannot escape.";
            setAttrs(studioNotes);*/
            break;
        case "Woo" :
            //The Woo deals with changing paradigms.
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Vague Notions";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "Specialty: For one scene, you may ask questions and psychically receive Limited information without rolling.";
            setAttrs(newrowattrs);

            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Clairvoyance";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "You can watch every scene of the show, with its footage, graphics and sounds.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Energy Healing";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When you push yourself, you may remove a harm from someone who trusts you.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Starseed";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "You are a child of alien consciousness, imbued with psychic talents unfamiliar to mortals. When you succumb to the whispers from Horrors in The Perilous Heavens, people who look at you become paralyzed in your presence.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Scary Intuition";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "Vague Notions gathers Standard information instead.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Fraud";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "When you convince someone that you are a fraud, refresh your specialty.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_starability_" + newrowid + "_name"] = "Law of Attraction";
            newrowattrs["repeating_starability_" + newrowid + "_description"] = "On action rolls, you only invoke Reasons that cause you to visualize or expect success, rather than ones that motivate your goal.";
            setAttrs(newrowattrs);
            /*var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_facet_" + newrowid + "_facetSource"] = "Trope";
            newrowattrs["repeating_facet_" + newrowid + "_description"] = "I view things from a new paradigm.";
            setAttrs(newrowattrs);*/
            var tropeTypecast = {};
            tropeTypecast["break"] = "0";
            tropeTypecast["drive"] = "0";
            tropeTypecast["rush"] = "0";
            tropeTypecast["bouge"] = "0";
            tropeTypecast["fake"] = "0";
            tropeTypecast["hack"] = "0";
            tropeTypecast["Creep"] = "1";
            tropeTypecast["snap"] = "0";
            tropeTypecast["tempt"] = "1";
            setAttrs(tropeTypecast);
            var playbookKey = {};
            playbookKey["playbook-key"] = "When you convert skeptics.";
            setAttrs(playbookKey);
            break;
        }
        });
});
//NEIGHBORHOOD AUTOFILLS
on("change:neighborhood", function() {
            getSectionIDs("repeating_locations", function(idarray) {
                for(var i=0; i < idarray.length; i++) {
                removeRepeatingRow("repeating_locations_" + idarray[i]);
                }
            });
        getAttrs(["neighborhood"], function(values) {
            switch (values.neighborhood) {
                case "Rut":
                    var newrowattrs = {};
                    newrowattrs["scenic-qualities"] = "Trains, Canals, Historic, Religion, Nostalgic, Small Business, A Creeping Past, Seasonal";
                    setAttrs(newrowattrs);
                    /*var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Train Tracks";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Winding, Piny, Foggy, Overhanging, Intersects Major Roads, Noisy] When you eat in restaurants and bars beside the Train Tracks, make a new friend.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "New Age Store";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Crystals, Bookshelves, Herbs, Voice Geometry, Droning Music, Conspiracies] 1 extra die on acquire asset rolls to acquire new age paraphrenalia.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Suburbs";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Winding, Similar Houses, Bright Paint, Stone Work, Unfinished, Playground] If you grew up in these suburbs, you may confess to the Horror's questions about your life here without spending gaze.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Historic Downtown";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Blinded by Parked Car Windows, Bicycle Racks, Basement-entry Apartments, Odd Street Plan, Geometric, Multistory] When you do an episode in Historic Downtown, create a new tendril based upon this place's buried history.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Masonic Temple";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Locked, Well-placed, Geometric, Inconspicuous, Creepy, Humanitarian] You may clear stress by spending a downtime action in the Masonic Congregation, if you clear more stress than you have, the Scion of Tendrils may rewrite one of your Reasons to reflect your membership.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "A Pawn Shop";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Inside Another Store, Dry Air, Freezing, Well-lit, Quiet, Outdated] Take +1 effect level when you acquire forbidden technology disguised as novelty toys.";
                    setAttrs(newrowattrs);
                    //tendrils
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Fanatic";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Visionary";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[an astronomical name, a name about time, the name of a stone or metal]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "A Real-World Witch. Pick 3: [Bougie, Caring, Demanding, Edgy, Gullible, Insightful]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Gatekeeper";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Hierophant-of-Chaos";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[a clever-sounding name, a first name that sounds like a last name, the name of a fruit]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "An Auctioneer. Pick 3: []";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Jam";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Anglerfish";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "The Homesickness";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Heartache, Nightmares, Phone Calls, Daydreams, Charm, Unresolved Pasts]  Your home is the Rut, now.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Dead-Pixel";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Screen";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "The Green Shroud";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Fearful, Green Screen Veils, Undocumented, Hissing, Occult, Dark Web-savvy]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Cutthroat-Gemini";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Gang";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "Town Council";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Feuding, Shrieking, Scoffing, Bitter, Canned Arguments, Gibbering] Town Council is a mess.";
                    setAttrs(newrowattrs);*/
                    break;
                case "Simulation":

                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Junkyard of Broken Televisions";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Hissing, Blinking, Blue-lit, Cassettes, VHS, Generation Loss] When you come here, the stars can ask and confess to each other's questions, seeing their answers in dim flickers in the Broken TV screens. What tendril prowls this junkyard.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Movie Theater/Arcade";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Disorienting, Soda Fountains, Bowling Lanes, Fontshifting, Cold, Dark Halls] The Arcade wants to know your forbidden longing. If you confess to the Arcade's games, or shout your confessional in its movie theaters, you may take an extra die on all Distorted Rolls until the end of the episode. But everyone can hear you.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Derelict Amusement Park";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Blaring, Towers, Sprawling, Electrified, Haunted, Half-Demolished] Some of the rides still function, but not perfectly. You may take a downtime action to clear stress, but if you clear more stress than you have, take Level 1 Harm: Banged Up.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "A Production Set";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Puppeted, Crowded, Sprawling, Modular, Outside, Webbed With Cables]. When you do an episode in the Production Set, create a new tendril: the props.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "A Reality Nexus";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = " Pick 3: [Wondrous, Distorted, Colorful, Touristy, Escherian, Nocturnal] You may use this location to exit or enter the Simulation. When you want to move, you may succumb to a Corruption whisper instead of doing a long-term project to complete the move.";
                    setAttrs(newrowattrs);
                                        //tendrils
                    /*var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Chain-beast";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "The Death From Above";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Airborne, Feral, Alluring, Roaring, Selfish, Sad]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Nostalgia";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Hierophant-of-Chaos";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "The Glitching";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Pixelated, Twitchy, Deja Vu, Fleeting Visions, Fleeting Voices, Rapturous]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Eclipse";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Anglerfish";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[name of a high-tech product]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Hazardous, LED, Deceptive, Flattering, Shapeshifting, Massive]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Edifice";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Cult";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[an escapist name]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Virtual, Numinous, Intoxicating, Psychedelic, Nefarious, Maternal]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Dragon";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Phisher";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[a hacker group name]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Numerous, Proxies, Persistent, Brutal, Mischievous, Charismatic]";
                    setAttrs(newrowattrs);*/
                    break;
                case "Ghost":
                    var newrowattrs = {};
                    newrowattrs["scenic-qualities"] = "Cracked Concrete, Rust Streaks, Weird Elevators, Foggy, Glassy Skyscrapers, Dim Interiors, Brutalism, Highways";
                    setAttrs(newrowattrs);
                    /*var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Abandoned Parkade";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Inhabited, Cracked Concrete, Overgrown, Dealings, Rust, Shadows] If you make your home in the abandoned Parkade, you may splurge 1 for free.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Museums";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Weird Elevators, Pitch Black, Labyrinthine, Holographic, Tiled, Dinosaurs] When you find the secret basement, you may gather information about the surreptitious solar system(s).";
                    setAttrs(newrowattrs);
                    
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Skyscrapers";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Cloudy, Traffic, Glass, Brutalist, Dovetailing, Highways] If you work a day job here, you can take home +1 Stash.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "An Urban Ruin";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Toppled, Collapsed, Crumbling, Cracked, Dusty, Infested] When you play Reckless Activities here, you may ask the question \rI help you down into a space under the rubble. May I?\n.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "An Institute";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Stately, Cold, Creaky, Bureaucratic, Forgotten, Soft] Anyone who once escaped the locked ichor pods in the basement only to find the staff imprisoned may spend a Humanity Advance to take this special ability. Bathed in Ichor: You may spend (0-6) stress to exploit a quirk or mutation gained from their exposure to the Ichor Pods.";
                    setAttrs(newrowattrs);
                                        //tendrils
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Fanatic";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Phisher";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[a bug name]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Insectile, Overwhelming, Shimmering, Glowing, Invasive, Recurring]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Dragon";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Gang";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[the name of a malevolent vapor]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Green, Creeping, Thick, Feline, Ghostly, Damp]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Chain-Beast";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Gang";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[name of a high-tech product]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Loyal, Motorcycles, Violent, Feared, Admired, Savvy]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Dead-Pixel";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Visionary";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[the name of a CEO]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Rings, Backstabbing, Familial, Charming, Old, Raconteur]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Fanatic";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[the name of a bar]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Techno, Laser Lights, Hospitality, Familiarity, Protection, Heart-rattling]";
                    setAttrs(newrowattrs);*/
                    
                    break;
                case "Frontier":
                    var newrowattrs = {};
                    newrowattrs["scenic-qualities"] = "Icy, Still, Forested, Wild, Rugged, Quaint, Uncharted, Night Sky";
                    setAttrs(newrowattrs);
                    /*var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Pristine Lake";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Glassy, Piny, Driftwood, Islands, Reflections, Mist] When you camp out here, you may use this location to gather information about your state of mind.";
                    setAttrs(newrowattrs);

                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Empty Roads";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Tracks, Ice, Dirt, Bridges, Forests, Expanse] If you have to cross these empty roads to do a transformation, performance, or competition episode. It pays 2 cash better.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Small Downtown";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Waterside, Lighthouses, Rivers, Planes, Half-Timbered, Roaming Animals] When you acquire assets related to any type of modern living, you have to come here.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Treacherous Woods";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Snow, Pines, Bears, Auroras, Rangers, Stars] When you do episodes out here, subtract a die from your transition roll.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Mountains";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Ski Slopes, Black-flickering skies, Lodges, Avalanches, Hiking Trails, Ridges] If you look up at the sky, any astronomical Corruptions you take also offer +1 effect level.";
                    setAttrs(newrowattrs);
                    //tendrils
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Jam";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Cult";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[a name of a facility]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Guarded, Satellite Dishes, Equipment, Out-of-place, Vanilla, Secretive]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Gatekeeper";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Phisher";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[a plain name]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Untrustworthy, Generous, Knowledgeable, Experienced, Artistic, Eager]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Eclipse";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[the names of beasts]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Vicious, Chained, Odd, Hunting, Marginalized, Hungry]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Gatekeeper";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Gang";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[rangers]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Bureaucratic, Fraternal, Organized, Sympathetic, Honorable, Traditional]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Nostalgia";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Visionary";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[the name of some yuppy enterprise]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Viral, Progressive, Educated, Unfocused, Hopeful, Woo-Woo]";
                    setAttrs(newrowattrs);*/
                    break;
                                        
                case "Paradise":
                    var newrowattrs = {};
                    newrowattrs["scenic-qualities"] = "Waterside, Shimmering, Cavernous, Bougie, Sunny, Landscaped, Remote, Party Atmosphere";
                    setAttrs(newrowattrs);
                    /*var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Caves";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Motes of Light, Crystal, Stalagtites, Whistling, Mercury Pools, Altars] You can wander and mine in the caves as a day job action. You also find a personal keepsake not worth selling.";
                    setAttrs(newrowattrs);

                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Hotels and Party Houses";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Statues, Fountains, Flowers, Tidal Steps, Bead Curtains, Lounge Chairs] When you do a Party Episode here, take an extra die on the transition roll";
                    setAttrs(newrowattrs);

                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "Promontories";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Divable, Tall, Looped, Spires, Sloped, Oddly Shaped] The Cinematic Style is always Flashy here.";
                    setAttrs(newrowattrs);

                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "The Pier";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Bustling, Food Smells, Drinks, Ferris Wheel, Dogs, Party Boats] When the shot cuts away to the pier, the music automatically becomes light rock.";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_locations_" + newrowid + "_name"] = "A Wondrous Forest";
                    newrowattrs["repeating_locations_" + newrowid + "_description"] = "Pick 3: [Motes of Light, Rivers, Geodes, Lodges, Log Bridges, Steep Drop-offs] When you play Reckless Activities here, reduce 2 harm levels.";
                    setAttrs(newrowattrs);
                                        //tendrils
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Jam";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Anglerfish";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "The Water";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Infested, Clear, Strong Current, Hypnotic, Soothing, Fickle]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Fanatic";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Phisher";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "The New Age";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Crystals, Geometries, Seals, Support Groups, Mesmerism, Pseudoscience]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Cutthroat-Gemini";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Hierophant-of-Chaos";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "Friendly Competition";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Snippy, Cutthroat, Sabotaging, Judged, Regulated, Too Often]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Nostalgia";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Screen";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[the name of an attraction]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Fire, Dancing, Music, Food, Drinks, Contests]";
                    setAttrs(newrowattrs);
                    var newrowid = generateRowID();
                    var newrowattrs = {};
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilend"] = "Eclipse";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilmeans"] = "Cult";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrilname"] = "[the name of the paradise's effect on people]";
                    newrowattrs["repeating_tendrils_" + newrowid + "_tendrildesc"] = "Pick 3: [Beating, Passionate, Romantic, Fiery, Tempestuous, Hateful]";
                    setAttrs(newrowattrs);*/
                    break;
            }
        });
});
//SHOW AUTOFILLS
on("change:show", function() {
            getSectionIDs("repeating_show-ability", function(idarray) {
                for(var i=0; i < idarray.length; i++) {
                removeRepeatingRow("repeating_show-ability_" + idarray[i]);
                }
            });
    getAttrs(["show"], function(values) {
        //Show abilities ask you to make sacrifices for the horrors.
        switch (values.show) {
        case "Band": 
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "Specialty: If you're doing your band's main gig, you may take a downtime action for free.";
            setAttrs(newrowattrs);
            /*var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Long Weekends";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "Each downtime, every star gets a free downtime action which must be spent on indulging their vice.";
            setAttrs(newrowattrs);*/
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Brain Fish";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "When you take inspiration for your music from the Horrors, clear 1 gaze.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Solid Foundation";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "You have a broad theoretical understanding of music. Choose an additional instrument to specialize in.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Soundtrack";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "When the music for the show is one of your music group's original songs, named and all, the show clears 1 gaze.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Tempo Sync";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "When the shot, music, and graphics are all synced to the beat of your music, take +1 effect level.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Until Your Fingers Bleed";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "You may invoke harm as though it were an Reason, when performing music";
            setAttrs(newrowattrs);
            var showKey = {};
            showKey["show-key"] = "When you play a successful gig, mark Show XP.";
            setAttrs(showKey);
            /*Starting Upgrades*/
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Quality Instruments";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Timestretch FX";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to slow or speed up the flow of time. Ask the Horrors: What are the unintended consequences of messing with time?";
            setAttrs(newrowattrs);
            /*Exclusive Upgrades
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "A Music Video";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);*/
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Concert Paraphernalia";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Giant Beach Balls, Lazers, Balloons, etc.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Elite Performers";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Elite Nerds";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Fine Merch";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            /*Generic Upgrades*/
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "A Cohort (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Add 1 type: Artists, Gossips, Muscles, Nerds, Performers; or invent one if your cohort is an expert. Pick one or two edges: Charming, Independent, Loyal, Tenacious. Pick the same number of flaws: Chatty, Principled, Unreliable, Wild.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Weather FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to alter the weather. Ask the Horrors: What are the unintended consequences of altering the weather?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Pyrotechnics FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to set dramatic explosions or fires. Ask the Horrors: What precious thing burns?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Levitation FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to defy gravity. Ask the Horrors: What gets left suspended in midair?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Lighting FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to bend and recolor light. Ask the Horrors: What happens to the light source?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Illusory FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to conjure horrible imagery. Ask the Horrors: What appears in the illusions that was not meant to be there?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Quality Upgrade";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Improve the quality of one asset category: Apparel, Gear, Supplies, Vehicles, Entertainment";
            setAttrs(newrowattrs);
            var setResource = {};
            setResource["which-resource"] = "Band";
            setAttrs(setResource);
            break;
        case "Foodies": 
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Master Chefs";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "Specialty: If you're preparing your delicacy, you may take a downtime action for free.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "All the Tricks";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "Push yourself to perform a ridiculous culinary maneuver, or to have the ingenuity to combine incompatible flavors seamlessly.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Knife Skills";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "You have an extra die when you have a knife in your hand.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Hell's Kitchen";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "When you start drama over the quality of each other's food, clear +1 gaze, or take +1 Void XP.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Allez Cuisine!";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "When you demonstrate unwavering poise in the heat of competition, refresh your specialty.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Cooked In the Fire";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "You're no stranger to burnt fingertips. Take an extra die on all resistance rolls.";
            setAttrs(newrowattrs);
            var showKey = {};
            showKey["show-key"] = "When you throw a successful promotional event, cater, or compete, mark Show XP.";
            setAttrs(showKey);
            /*Starting Upgrades*/
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Quality Supplies";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "A Kitchen";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Basically a workshop but for food and drinks.";
            setAttrs(newrowattrs);
            /*Foodie Upgrades*/
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Dining Space (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Your establishment begins unfurnished. This upgrade gives you seating, decor, and adds flow to your joint.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Injected FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "When you spend 1 gaze, you may spike your food with graphics and glitching. Ask the Horrors: What dark energies does the food become contaminated with?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Elite Artists";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Elite Gossips";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Locally Sourced";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Take an extra die when you acquire ingredients grown in this neighborhood";
            setAttrs(newrowattrs);
            /*Generic Upgrades*/
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "A Cohort (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Add 1 type: Artists, Gossips, Muscles, Nerds, Performers; or invent one if your cohort is an expert. Pick one or two edges: Charming, Independent, Loyal, Tenacious. Pick the same number of flaws: Chatty, Principled, Unreliable, Wild.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Weather FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to alter the weather. Ask the Horrors: What are the unintended consequences of altering the weather?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Timestretch FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to slow or speed up the flow of time. Ask the Horrors: What are the unintended consequences of messing with time?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Pyrotechnics FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to set dramatic explosions or fires. Ask the Horrors: What precious thing burns?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Levitation FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to defy gravity. Ask the Horrors: What gets left suspended in midair?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Lighting FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to bend and recolor light. Ask the Horrors: What happens to the light source?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Illusory FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to conjure horrible imagery. Ask the Horrors: What appears in the illusions that was not meant to be there?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Quality Upgrade";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Improve the quality of one asset category: Apparel, Gear, Supplies, Vehicles, Entertainment";
            setAttrs(newrowattrs);
            var setResource = {};
            setResource["which-resource"] = "Foodies";
            setAttrs(setResource);
            break;
        case "Flippers" :
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Renovators";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "Specialty: If you're working on your favored project, you may take a downtime action for free.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Energy Flows";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "You can perceive energy flows and are steeped in the pseudoscientific interior design principles which govern these energy flows.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Experienced";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "Each star also has some blue-collar experience, and may write an additional Reason to reflect it.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Tough as Nails";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "After you take harm, reduce it by one level.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Just Some Minor Property Theft";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "People leave all sorts of expensive things at construction sites, and give you the key. You get an extra die to acquire an asset if you're okay with property theft.";
            setAttrs(newrowattrs);
            /*var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "All or Nothing";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "When you acquire a loan to afford a house to flip, you've made a commitment. Starting Drama with someone .";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Masonic";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "You are versed in Masonry: a practice that reveres geometry the Creaking Christ, who ";
            setAttrs(newrowattrs);*/
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Forbidden Technician";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "When any of you invent or craft a creation that incorporates forbidden technology, you get +1 result level. You begin with one special design already known.";
            setAttrs(newrowattrs);
            /*Starting Upgrades*/
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Cohort: Muscles";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_check"] = "on";
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "A Vehicle";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            /*Flipper Upgrade
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "The Floor Plan";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);*/
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Renovation FX";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "You may spend a bargain die to conjure a mind palace of graphics with flying furniture, sliding walls, and instant constructions. Ask the Horrors: What is the mind palace made of?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Elite Muscle";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Elite Artists";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "A Junkyard";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_show-ability_" + newrowid + "_name"] = "Paid Programming";
            newrowattrs["repeating_show-ability_" + newrowid + "_description"] = "You gain access to the Paid Programming game.";
            setAttrs(newrowattrs);
            /*Generic Upgrades*/
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "A Cohort (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Add 1 type: Artists, Gossips, Muscles, Nerds, Performers; or invent one if your cohort is an expert. Pick one or two edges: Charming, Independent, Loyal, Tenacious. Pick the same number of flaws: Chatty, Principled, Unreliable, Wild.";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Weather FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to alter the weather. Ask the Horrors: What are the unintended consequences of altering the weather?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Timestretch FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to slow or speed up the flow of time. Ask the Horrors: What are the unintended consequences of messing with time?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Pyrotechnics FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to set dramatic explosions or fires. Ask the Horrors: What precious thing burns?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Levitation FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to defy gravity. Ask the Horrors: What gets left suspended in midair?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Lighting FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to bend and recolor light. Ask the Horrors: What happens to the light source?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Illusory FX (2 Upgrades)";
            newrowattrs["repeating_upgrade_" + newrowid + "_secondbox"] = "on"
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Any star may spend 1 gaze to conjure horrible imagery. Ask the Horrors: What appears in the illusions that was not meant to be there?";
            setAttrs(newrowattrs);
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_upgrade_" + newrowid + "_name"] = "Quality Upgrade";
            newrowattrs["repeating_upgrade_" + newrowid + "_description"] = "Improve the quality of one asset category: Apparel, Gear, Supplies, Vehicles, Entertainment";
            setAttrs(newrowattrs);

            var showKey = {};
            showKey["show-key"] = "When you successfully flip a house, mark Show XP.";
            setAttrs(showKey);
            var setResource = {};
            setResource["which-resource"] = "Flippers";
            setAttrs(setResource);
            break;
        
        }
        });
});

</script>