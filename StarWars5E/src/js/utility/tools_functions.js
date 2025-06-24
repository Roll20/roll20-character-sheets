
var update_tool = function(tool_id) {
    if(tool_id.substring(0,1) === "-" && tool_id.length === 20) {
        do_update_tool([tool_id]);
    }
    else if(tool_id === "all") {
        getSectionIDs("repeating_tool", function(idarray) {
            do_update_tool(idarray);
        });
    }
    else {
        getSectionIDs("repeating_tool", function(idarray) {
            var tool_attribs = [];
            _.each(idarray, function(id) {
                tool_attribs.push("repeating_tool_" + id + "_toolattr_base");
            });
            getAttrs(tool_attribs, function(v) {
                var attr_tool_ids = [];
                _.each(idarray, function(id) {
                    if(v["repeating_tool_" + id + "_toolattr_base"] && v["repeating_tool_" + id + "_toolattr_base"].indexOf(tool_id) > -1) {
                        attr_tool_ids.push(id);
                    }
                });
                if(attr_tool_ids.length > 0) {
                    do_update_tool(attr_tool_ids);
                }
            });
        });
    };
};

var do_update_tool = function(tool_array) {
    var tool_attribs = ["pb","pb_type","jack","strength_mod","dexterity_mod","constitution_mod","intelligence_mod","wisdom_mod","charisma_mod"];
    var update = {};
    _.each(tool_array, function(tool_id) {
        tool_attribs.push("repeating_tool_" + tool_id + "_toolbonus_base");
        tool_attribs.push("repeating_tool_" + tool_id + "_tool_mod");
        tool_attribs.push("repeating_tool_" + tool_id + "_toolattr_base");
    });

    getAttrs(tool_attribs, function(v) {
        _.each(tool_array, function(tool_id) {
            console.log("UPDATING TOOL: " + tool_id);
            var query = false;
            if(v["repeating_tool_" + tool_id + "_toolattr_base"] && v["repeating_tool_" + tool_id + "_toolattr_base"].substring(0,2) === "?{") {
                update["repeating_tool_" + tool_id + "_toolattr"] = "QUERY";
                var mod = "?{Attribute?|Strength,@{strength_mod}|Dexterity,@{dexterity_mod}|Constitution,@{constitution_mod}|Intelligence,@{intelligence_mod}|Wisdom,@{wisdom_mod}|Charisma,@{charisma_mod}}";
                if(v["repeating_tool_" + tool_id + "_tool_mod"]) {
                    mod = mod + "+" + v["repeating_tool_" + tool_id + "_tool_mod"];
                }
                query = true;
            }
            else {
                var attr = v["repeating_tool_" + tool_id + "_toolattr_base"].substring(0, v["repeating_tool_" + tool_id + "_toolattr_base"].length - 5).substr(2);
                var attr_mod = v[attr + "_mod"] ? parseInt(v[attr + "_mod"], 10) : 0;
                var tool_mod = v["repeating_tool_" + tool_id + "_tool_mod"] && !isNaN(parseInt(v["repeating_tool_" + tool_id + "_tool_mod"], 10)) ? parseInt(v["repeating_tool_" + tool_id + "_tool_mod"], 10) : 0;
                var mod = attr_mod + tool_mod;
                update["repeating_tool_" + tool_id + "_toolattr"] = attr.toUpperCase();
                if(v["repeating_tool_" + tool_id + "_tool_mod"] && v["repeating_tool_" + tool_id + "_tool_mod"].indexOf("@{") > -1) {
                    update["repeating_tool_" + tool_id + "_toolbonus"] = update["repeating_tool_" + tool_id + "_toolbonus"] + "+" + v["repeating_tool_" + tool_id + "_tool_mod"];
                }
                if(!v["repeating_tool_" + tool_id + "_tool_mod"]) {
                    update["repeating_tool_" + tool_id + "_tool_mod"] = 0;
                }
            };

            if(v["pb_type"] && v["pb_type"] === "die" ) {
                if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb})") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+" + v.pb}
                else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb}*2)") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+2" + v.pb}
                else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(floor(@{pb}/2))") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+" + v.jack};
            }
            else if(v["repeating_tool_" + tool_id + "_toolattr_base"] && v["repeating_tool_" + tool_id + "_toolattr_base"].substring(0,2) === "?{") {
                if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb})") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+" + parseInt(v.pb, 10)}
                else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb}*2)") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+" + (parseInt(v.pb, 10)*2)}
                else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(floor(@{pb}/2))") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+" + parseInt(v.jack, 10)};
            }
            else {
                if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb})") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + parseInt(v.pb, 10)}
                else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb}*2)") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + (parseInt(v.pb, 10)*2)}
                else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(floor(@{pb}/2))") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + parseInt(v.jack, 10)};
            };

            if(query) {
                update["repeating_tool_" + tool_id + "_toolbonus_display"] = "?";
            }
            else {
                update["repeating_tool_" + tool_id + "_toolbonus_display"] = update["repeating_tool_" + tool_id + "_toolbonus"];
            };

        });

        setAttrs(update, {silent: true});
    });
};
