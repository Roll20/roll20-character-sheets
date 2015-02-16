// VERSION INFO
var PowerCards_Author = "HoneyBadger";
var PowerCards_Version = "2.3.5 (from Production Server with work by Timothy S for WFRP 2e)";
var PowerCards_LastUpdated = "February 14, 2015";

// FUNCTION DECLARATIONS
var PowerCard = PowerCard || {};
var getPowerCardFormats = getPowerCardFormats || {};
var doInlineFormatting = doInlineFormatting || {};
var doTargetInfo = doTargetInfo || {};
var getBrightness = getBrightness || {};
var hexDec = hexDec || {};

// API COMMAND HANDLER
on("chat:message", function (msg) {
    if (msg.type !== "api") {
        return;
    }
    if (msg.content.split(" ", 1)[0] === "!power") {
        var player_obj = getObj("player", msg.playerid);
        PowerCard.Process(msg, player_obj);
    }
    if (msg.content.split(" ", 1)[0] === "!power_version") {
        sendChat("HoneyBadger", "/w " + msg.who + " You are using version " + PowerCards_Version + " of PowerCards, authored by " + PowerCards_Author + ", which was last updated on: " + PowerCards_LastUpdated + ".");
    }
});

// LOAD POWERCARD FORMATS
on("ready", function () {
    getPowerCardFormats();
});

on("change:handout", function () {
    getPowerCardFormats();
});

// POWERCARD FUNCTION
PowerCard.Process = function (msg, player_obj) {
    // USER CONFIGURATION
    var ALLOW_URLS = true;
    var ALLOW_HIDDEN_URLS = true;
    var CUSTOM_EMOTES = true;
    var SHOW_AVATAR = true; // Set to false to hide character sheet avatar in custom emotes
    var SUPPRESS_INLINE_CHARMS = false; // Set to false to show numerical attributes inline
    var USE_DEFAULT_FORMAT = false; // Set to true if you want powercards to default formatting
    var USE_PLAYER_COLOR = false; // Set to true to override all color formatting

    // DEFINE VARIABLES
    var n = msg.content.split(" --");
    var PowerCard = {};
    var Character = "";
    var Token = "";
    var Avatar = "";
    var Tag = "";
    var Content = "";
    var Display = "";
    var MultiTag = 0;
    var Count = 0;

    // DEFAULT FORMATTING
    var PlayerBGColor = player_obj.get("color");
    var PlayerTXColor = (getBrightness(PlayerBGColor) < (255 / 2)) ? "#FFF" : "#000";
    PowerCard.titlefont = "Georgia";
    PowerCard.subtitlefont = "Tahoma";
    PowerCard.bodyfont = "Helvetica";
    PowerCard.titlefontsize = "16px";
    PowerCard.subtitlefontsize = "11px";
    PowerCard.bodyfontsize = "14px";
    PowerCard.txcolor = PlayerTXColor;
    PowerCard.bgcolor = PlayerBGColor;
    PowerCard.erowtx = "#000";
    PowerCard.erowbg = "#B6AB91"; // #B6AB91 - Default darker brown
    PowerCard.orowtx = "#000";
    PowerCard.orowbg = "#CEC7B6"; // #CEC7B6 - Default light brown
    PowerCard.corners = 3; // Set to 0 to remove rounded corners
    PowerCard.border = "1px solid #000"; // Size Style Color

    // RESERVED & IGNORED TAGS
    var IgnoredTags = ["charid", "tokenid", "emote", "leftsub", "rightsub", "name", "txcolor", "bgcolor", "erowbg", "erowtx", "orowbg", "orowtx", "whisper", "format", "title", "target_list", "titlefont", "subtitlefont", "bodyfont", "corners", "titlefontsize", "subtitlefontsize", "bodyfontsize", "border"];

    // CREATE POWERCARD ARRAY
    n.shift();
    n.forEach(function (token) {
        Tag = token.substring(0, token.indexOf("|"));
        Content = token.substring(token.indexOf("|") + 1);
        if (Tag.indexOf("#") != -1) {
            MultiTag = parseInt(Tag.substring(Tag.indexOf("#") + 1));
            Count = 1;
            Tag = Tag.substring(0, Tag.indexOf("#"));
            while (Count <= MultiTag) {
                PowerCard[Tag + " #" + Count] = Content;
                Count += 1;
            }
        } else {
            PowerCard[Tag] = Content;
        }
    });

    // GET CUSTOM STYLES & ADD THEM TO POWERCARD
    if (USE_DEFAULT_FORMAT && state.PowerCard_Formats["default"] !== undefined && PowerCard.format === undefined) {
        PowerCard.format = "default";
    }
    if (PowerCard.format !== undefined) {
        var PowerCard_Formats = (state.PowerCard_Formats && state.PowerCard_Formats[PowerCard.format] !== undefined) ? state.PowerCard_Formats[PowerCard.format].split("--") : ["txcolor|#FFF", "bgcolor|#040", "titlefont|Georgia", "subtitlefont|Tahoma"];
        PowerCard_Formats.forEach(function (f) {
            Tag = f.substring(0, f.indexOf("|")).trim();
            Content = f.substring(f.indexOf("|") + 1).trim();
            if (Tag !== "" && Content !== "") {
                PowerCard[Tag] = Content;
            }
        });
    }

    // Emote - Prevent empty emote error in Roll20 chat...
    if (PowerCard.emote === "") {
        PowerCard.emote = '" "';
    }

    // Replace an undefined title tag with msg.who...
    if (PowerCard.title === undefined) {
        PowerCard.title = msg.who;
    }

    // CSS styled emote...
    if (CUSTOM_EMOTES && PowerCard.emote !== undefined && PowerCard.charid !== undefined || PowerCard.tokenid !== undefined) {
        if (PowerCard.charid !== undefined) {
            Character = getObj("character", PowerCard.charid);
            Avatar = (Character !== undefined && Character.get("avatar") !== "") ? '<div style="display: table-cell; width: 50px;"><img src=' + Character.get("avatar") + ' style="height: 50px; width: 50px;"></img></div>' : "";
        }
        if (PowerCard.tokenid !== undefined) {
            Token = getObj("graphic", PowerCard.tokenid);
            Avatar = (Token !== undefined && Token.get("imgsrc") !== "") ? '<div style="display: table-cell; width: 50px;"><img src=' + Token.get("imgsrc") + ' style="height: 50px; width: 50px;"></img></div>' : "";
        }
        if (PowerCard.emote.charAt(0) === "!") {
            PowerCard.emote = PowerCard.emote.substring(1);
            SHOW_AVATAR = false;
        }
        if (SHOW_AVATAR) {
            PowerCard.emote = Avatar + '<div style="display: table-cell; width: calc(100%-50px); vertical-align: middle; font-size: 12px; font-style: italic; text-align: center; padding-left: 0.5em;">' + doInlineFormatting(PowerCard.emote) + '</div>';
        } else {
            PowerCard.emote = '<div style="display: block; width: 100%; vertical-align: middle; font-size: 12px; font-style: italic; text-align: center;">' + PowerCard.emote + '</div>';
        }
    }

    // POWERCARD TITLE BASE CSS
    var TitleStyle = ' font-family: ' + PowerCard.titlefont + '; font-size: ' + PowerCard.titlefontsize + '; font-weight: normal; letter-space: 0.25px; text-align: center; vertical-align: middle; padding: 2px 0px; margin: 0px 0px 0px -10px; border: ' + PowerCard.border + '; border-radius: ' + PowerCard.corners + 'px ' + PowerCard.corners + 'px 0px 0px;';

    // BACKGROUND & TEXT COLORS
    if (USE_PLAYER_COLOR === true || PowerCard.format === "player") {
        TitleStyle += " color: " + PlayerTXColor + ";";
        TitleStyle += " background-color: " + PlayerBGColor + ";";
    } else {
        TitleStyle += " color: " + PowerCard.txcolor + ";";
        TitleStyle += " background-color: " + PowerCard.bgcolor + ";";
    }
    // if (PowerCard.title === undefined) var PowerCard.title = "";
    var Title = "<div style='" + TitleStyle + "' title='" + PowerCard.title + "'>" + PowerCard.name;

    // CREATE THE SUBTITLES
    var Diamond = " &" + "#x2666; ";
    var Subtitle = "<br><span style='font-family: " + PowerCard.subtitlefont + "; font-size: " + PowerCard.subtitlefontsize + "; font-weight: normal;'>";
    Subtitle += (PowerCard.leftsub !== undefined) ? PowerCard.leftsub : "";
    Subtitle += (PowerCard.leftsub !== undefined && PowerCard.rightsub !== undefined) ? Diamond : "";
    Subtitle += (PowerCard.rightsub !== undefined) ? PowerCard.rightsub : "";
    Display += doInlineFormatting(Title + Subtitle + "</span></div>", ALLOW_URLS, ALLOW_HIDDEN_URLS);

    // CREATE ROW STYLES & ROW INFO
    var MarginFix = "-10px";
    var RowStyle = " line-height: 1.1em; font-size: " + PowerCard.bodyfontsize + "; font-family: " + PowerCard.bodyfont + "; margin: 0px 0px 0px " + MarginFix + "; padding: 2px 5px; border-left: " + PowerCard.border + "; border-right: " + PowerCard.border + "; border-radius: 0px;";
    var LastRowStyle = " line-height: 1.1em; font-size: " + PowerCard.bodyfontsize + "; font-family: " + PowerCard.bodyfont + "; margin: 0px 0px 0px " + MarginFix + "; padding: 2px 5px; border-left: " + PowerCard.border + "; border-right: " + PowerCard.border + "; border-bottom: " + PowerCard.border + "; border-radius: 0px 0px " + PowerCard.corners + "px " + PowerCard.corners + "px;";
    var OddRow = " color: " + PowerCard.orowtx + "; background-color: " + PowerCard.orowbg + ";";
    var EvenRow = " color: " + PowerCard.erowtx + "; background-color: " + PowerCard.erowbg + ";";
    var RowBackground = OddRow;
    var RowNumber = 1;
    var Indent = "";

    // LOOP THROUGH IGNORED TAGS AND REMOVE THEM FROM KEYS
    var Keys = Object.keys(PowerCard);
    IgnoredTags.forEach(function (IgnoredTag) {
        if (Keys.indexOf(IgnoredTag) !== -1) {
            Keys.splice(Keys.indexOf(IgnoredTag), 1);
        }
    });

    // CREATE ARRAY OF TARGETS
    if (PowerCard.target_list !== undefined) {
        PowerCard.target_list = PowerCard.target_list.split(" | ");
    }

    // LOOPS THROUGH KEYS AND CREATES THE ROW DIV
    var KeyCount = 0;
    Keys.forEach(function (Tag) {
        KeyCount++;
        Content = doInlineFormatting(PowerCard[Tag], ALLOW_URLS, ALLOW_HIDDEN_URLS);
        if (PowerCard.target_list !== undefined && Content.indexOf("%%") !== -1) {
            Content = doTargetInfo(Content, PowerCard.target_list, SUPPRESS_INLINE_CHARMS);
            PowerCard.target_list.shift();
        }
        RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
        RowBackground += (KeyCount === Keys.length) ? LastRowStyle : RowStyle;
        RowNumber += 1;
        Tag = Tag.replace(/( #[0-9]+)/g, ""); // Hides multitag numbers...
        Tag = Tag.replace(/( \*[0-9]+)/g, ""); // Hides same name tag numbers...
        // SHOW/HIDE THE TAG
        if (Tag.charAt(0) !== "!") {
            if (Tag.charAt(0) === "^") {
                Indent = (parseInt(Tag.charAt(1)) > 0) ? " padding-left: " + (Tag.charAt(1) * 1.5) + "em;" : "";
                Tag = (parseInt(Tag.charAt(1)) >= 0) ? Tag.substring(2) : Tag.substring(1);
                Display += "<div style='" + RowBackground + Indent + "'><b>" + Tag + "</b> " + Content + "</div>";
            } else {
                Display += "<div style='" + RowBackground + "'><b>" + Tag + "</b> " + Content + "</div>";
            }
        } else {
            if (Tag.charAt(1) === "^") {
                Indent = (parseInt(Tag.charAt(2)) > 0) ? " padding-left: " + (Tag.charAt(2) * 1.5) + "em;" : "";
                Display += "<div style='" + RowBackground + Indent + "'>" + Content + "</div>";
            } else {
                Display += "<div style='" + RowBackground + "'>" + Content + "</div>";
            }
        }
    });

    // SEND TO CHAT
    if (PowerCard.whisper === "") {
        PowerCard.whisper = "GM";
    } // error catch for empty whisper tag
    if (msg.inlinerolls !== undefined) {
        // PROCESS INLINE ROLLS
        var RollExpression = "";
        var RollValue = 0;
        for (var i = 0; i < msg.inlinerolls.length; i++) {
            RollExpression = msg.inlinerolls[i].expression;
            RollValue = buildInline(msg.inlinerolls[i]);
            Display = Display.replace("$[[" + i + "]]", RollValue);
        }

        // PROCESS MULTIROLLS
        var inlineMultiRolls = (Display.match(/\$\[\[[0-9]+\]\]/g) || []);
        var inlineMultiExps = "API: ";
        var g = 0;
        while (g < inlineMultiRolls.length) {
            inlineMultiExps += "[[" + msg.inlinerolls[inlineMultiRolls[g].match(/[0-9]+/)].expression + "]] ";
            g++;
        }

        // SEND MODIFIED CARD TO CHAT
        sendChat("", inlineMultiExps, function (m) {
            for (var p = 1; p <= inlineMultiRolls.length; p++) {
                var inlineRollValue = buildInline(m[0].inlinerolls[p.toString()]);
                Display = Display.replace(/\$\[\[[0-9]+\]\]/, inlineRollValue);
            }
            sendChat("", Display, function (x) {
                for (var p = 1; p <= _.keys(x[0].inlinerolls).length; p++) {
                    var inlineRollValue = (SUPPRESS_INLINE_CHARMS) ? x[0].inlinerolls[p.toString()].results.total : buildInline(x[0].inlinerolls[p.toString()]);
                    x[0].content = x[0].content.replace(/\$\[\[[0-9]+\]\]/, inlineRollValue);
                }
                Display = x[0].content;
                if (PowerCard.whisper !== undefined) {
                    if (PowerCard.emote !== undefined) {
                        if (PowerCard.charid !== undefined || PowerCard.tokenid !== undefined) {
                            sendChat("", "/desc ");
                            sendChat("", "/direct " + PowerCard.emote);
                        } else {
                            sendChat("", "/emas " + PowerCard.emote);
                        }
                    }
                    sendChat(msg.who, "/w " + PowerCard.whisper + " " + Display);
                } else {
                    if (PowerCard.emote !== undefined) {
                        if (PowerCard.charid !== undefined || PowerCard.tokenid !== undefined) {
                            sendChat("", "/desc ");
                            sendChat("", "/direct " + PowerCard.emote + Display);
                        } else {
                            sendChat("", "/emas " + PowerCard.emote);
                            sendChat("", "/direct " + Display);
                        }
                    } else {
                        sendChat("", "/desc ");
                        sendChat("", "/direct " + Display);
                    }
                }
            });
        });
    } else {
        sendChat("", Display, function (x) {
            for (var p = 1; p <= _.keys(x[0].inlinerolls).length; p++) {
                var inlineRollValue = (SUPPRESS_INLINE_CHARMS) ? x[0].inlinerolls[p.toString()].results.total : buildInline(x[0].inlinerolls[p.toString()]);
                x[0].content = x[0].content.replace(/\$\[\[[0-9]+\]\]/, inlineRollValue);
            }
            Display = x[0].content;
            if (PowerCard.whisper !== undefined) {
                if (PowerCard.emote !== undefined) {
                    if (PowerCard.charid !== undefined || PowerCard.tokenid !== undefined) {
                        sendChat("", "/desc ");
                        sendChat("", "/direct " + PowerCard.emote);
                    } else {
                        sendChat("", "/emas " + PowerCard.emote);
                    }
                }
                sendChat(msg.who, "/w " + PowerCard.whisper + " " + Display);
            } else {
                if (PowerCard.emote !== undefined) {
                    if (PowerCard.charid !== undefined || PowerCard.tokenid !== undefined) {
                        sendChat("", "/desc ");
                        sendChat("", "/direct " + PowerCard.emote + Display);
                    } else {
                        sendChat("", "/emas " + PowerCard.emote);
                        sendChat("", "/direct " + Display);
                    }
                } else {
                    sendChat("", "/desc ");
                    sendChat("", "/direct " + Display);
                }
            }
        });
    }
};

// FUNCTIONS
function getPowerCardFormats() {
    var PowerCard_FormatHandout = findObjs({
        _type: "handout",
        name: "PowerCard Formats"
    })[0];
    if (PowerCard_FormatHandout !== undefined) {
        var PowerCard_Formats = {};
        var FormatName = "";
        var FormatContent = "";
        PowerCard_FormatHandout.get("notes", function (notes) {
            notes = notes.split("<br>");
            notes.forEach(function (notes) {
                FormatName = notes.substring(0, notes.indexOf(":"));
                FormatContent = notes.substring(notes.indexOf(":") + 1).trim();
                if (FormatName !== "" || FormatContent !== "") {
                    PowerCard_Formats[FormatName] = " " + FormatContent;
                }
            });
            state.PowerCard_Formats = PowerCard_Formats;
        });
    }
}

function doInlineFormatting(content, ALLOW_URLS, ALLOW_HIDDEN_URLS) {
    // PARSE FOR INLINE FORMATTING
    var f;
    // LINE BREAK
    if (content.indexOf("^^") !== -1) {
        content = content.replace(/\^\^/g, "<br>");
    }
    // INDENT FIRST LINE
    if (content.indexOf("^*") !== -1) {
        content = content.replace(/\^\*/g, "<span style='margin-left: 1em;'></span>");
    }
    // BOLD
    f = 1;
    while (content.indexOf("**") !== -1) {
        content = (f % 2 == 1) ? content.replace("**", "<b>") : content.replace("**", "</b>");
        f++;
    }
    // ITALICS
    f = 1;
    while (content.indexOf("//") !== -1) {
        content = (f % 2 == 1) ? content.replace("//", "<i>") : content.replace("//", "</i>");
        f++;
    }
    // UNDERLINE
    f = 1;
    while (content.indexOf("__") !== -1) {
        content = (f % 2 == 1) ? content.replace("__", "<u>") : content.replace("__", "</u>");
        f++;
    }
    // URL
    if (ALLOW_URLS && content.indexOf("@@") !== -1) {
        if (ALLOW_HIDDEN_URLS) {
            f = 1;
            while (content.indexOf("@@") !== -1) {
                if (f % 2 == 1) {
                    content = content.replace("@@", "<a href='http:// ");
                    content = content.replace("||", "'>");
                } else {
                    content = content.replace("@@", "</a>");
                }
                f++;
            }
        } else {
            f = 1;
            while (content.indexOf("@@") !== -1) {
                content = (f % 2 == 1) ? content.replace("@@", "<a>") : content.replace("@@", "</a>");
                f++;
            }
        }
    }
    // COLORS
    f = 1;
    while (content.indexOf("$$") !== -1) {
        var color = "";
        if (f % 2 == 1) {
            color = content.match(/\$\$#[a-fA-F0-9]+\|/);
            if (color !== null) {
                color = color.shift().replace("$$", "").replace("|", "");
            }
            content = content.replace(/\$\$#[a-fA-F0-9]+\|/, "<span style='color: " + color + ";'>");
        } else {
            content = content.replace("$$", "</span>");
        }
        f++;
    }
    return content;
}

function doTargetInfo(content, TargetList) {
    // PARSE FOR TARGET INFO REPLACEMENT CHARMS
    var Token = getObj("graphic", TargetList[0]);
    if (Token === undefined) {
        return content;
    }
    var Character = getObj("character", Token.get("represents"));
    var Attribute = "";
    var i = 0;

    // TOKEN CHARMS
    if (content.indexOf("%%token_name%%") !== -1) {
        content = content.replace("%%token_name%%", Token.get("name"));
    }
    if (content.indexOf("%%bar1%%") !== -1) {
        content = content.replace("%%bar1%%", Token.get("bar1_value"));
    }
    if (content.indexOf("%%bar1_max%%") !== -1) {
        content = content.replace("%%bar1_max%%", Token.get("bar1_max"));
    }
    if (content.indexOf("%%bar2%%") !== -1) {
        content = content.replace("%%bar2%%", Token.get("bar2_value"));
    }
    if (content.indexOf("%%bar2_max%%") !== -1) {
        content = content.replace("%%bar2_max%%", Token.get("bar2_max"));
    }
    if (content.indexOf("%%bar3%%") !== -1) {
        content = content.replace("%%bar3%%", Token.get("bar3_value"));
    }
    if (content.indexOf("%%bar3_max%%") !== -1) {
        content = content.replace("%%bar3_max%%", Token.get("bar3_max"));
    }

    // ATTRIBUTES
    while (content.indexOf("%%") != -1 && Character !== undefined) {
        i = content.indexOf("%%");
        Attribute = content.substring(i + 2, content.indexOf("%%", i + 2));
        if (getAttrByName(Character.id, Attribute) !== undefined) {
            content = content.replace("%%" + Attribute + "%%", "[[" + getAttrByName(Character.id, Attribute) + "]]");
        } else {
            content = content.replace("%%" + Attribute + "%%", "ERROR");
        }
    }
    return content;
}

function getBrightness(hex) {
    hex = hex.replace('#', '');
    var c_r = hexDec(hex.substr(0, 2));
    var c_g = hexDec(hex.substr(2, 2));
    var c_b = hexDec(hex.substr(4, 2));
    return ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
}

function hexDec(hex_string) {
    hex_string = (hex_string + '').replace(/[^a-f0-9]/gi, '');
    return parseInt(hex_string, 16);
}

function buildInline(inlineroll) {
    var InlineColorOverride = "";
    var values = [];
    var critRoll = false;
    var failRoll = false;
    var critCheck = false;
    var failCheck = false;
    var highRoll = false;
    var lowRoll = false;
    var noHighlight = false;

    inlineroll.results.rolls.forEach(function (roll) {
        var result = processRoll(roll, critRoll, failRoll, highRoll, lowRoll, noHighlight);
        if (result.value.toString().indexOf("critsuccess") != -1) {
            critCheck = true;
        }
        if (result.value.toString().indexOf("critfail") != -1) {
            failCheck = true;
        }
        values.push(result.value.replace(/ \[.*/, ""));
        critRoll = result.critRoll;
        failRoll = result.failRoll;
        highRoll = result.highRoll;
        lowRoll = result.lowRoll;
        noHighlight = result.noHighlight;
    });

    // Overrides the default coloring of the inline rolls...
    if (critCheck && failCheck) {
        InlineColorOverride = " background-color: #8FA4D4; border-color: #061539; color: #061539;";
    } else if (critCheck && !failCheck) {
        InlineColorOverride = " background-color: #88CC88; border-color: #004400; color: #004400;";
    } else if (!critCheck && failCheck) {
        InlineColorOverride = " background-color: #FFAAAA; border-color: #660000; color: #660000;";
    } else {
        InlineColorOverride = " background-color: #FFFEA2; border-color: #87850A; color: #000000;";
    }

    // PARSE TABLE RESULTS
    inlineroll.results.tableentries = _.chain(inlineroll.results.rolls)
            .filter(function (r) {
                return _.has(r, 'table');
            })
            .reduce(function (memo, r) {
                _.each(r.results, function (i) {
                    i = i.tableItem;
                    if (!/^[+\-]?(0|[1-9][0-9]*)([.]+[0-9]*)?([eE][+\-]?[0-9]+)?$/.test(i.name)) {
                        memo.push({
                            name: i.name,
                            weight: i.weight,
                            table: r.table
                        });
                    }
                });
                return memo;
            }, [])
            .value();

    var InlineRollStyle = "text-align: center; font-weight: bold; vertical-align: text-middle; display: inline-block; min-width: 1.75em; border-radius: 3px; padding: 1px 0px 1px 1px; border: 1px solid;" + InlineColorOverride;
    var rollOut = '<span style="' + InlineRollStyle + '" title="Roll: ' + inlineroll.expression + '<br>Results: ' + values.join("") + ' = ' + inlineroll.results.total;
    rollOut += '" class="a inlinerollresult showtip tipsy-n';
    rollOut += (critCheck && failCheck ? ' importantroll' : (critCheck ? ' fullcrit' : (failCheck ? ' fullfail' : ''))) + '">' + inlineroll.results.total + '</span>';
    rollOut = (inlineroll.results.total === 0 && inlineroll.results.tableentries.length) ? '' : rollOut;
    rollOut += _.map(inlineroll.results.tableentries, function (l) {
        return '<span style="' + InlineRollStyle + '" title="Table: ' + l.table + ' ' + 'Weight: ' + l.weight + '" class="a inlinerollresult showtip tipsy-n">' + l.name + '</span>';
    }).join('');
    return rollOut;
}

function processRoll(roll, critRoll, failRoll, highRoll, lowRoll, noHighlight) {
    if (roll.type === "C") {
        return {
            value: " " + roll.text + " "
        };
    } else if (roll.type === "L") {
        if (roll.text.match(/HR\d+/i) !== null) {
            highRoll = parseInt(roll.text.substring(2));
        } else {
            highRoll = false;
        }
        if (roll.text.match(/LR\d+/i) !== null) {
            lowRoll = parseInt(roll.text.substring(2));
        } else {
            lowRoll = false;
        }
        if (roll.text.match(/CR(\d+\|\d+)/i) !== null) {
            lowRoll = parseInt(roll.text.substring(2, roll.text.indexOf("|")));
            highRoll = parseInt(roll.text.substring(roll.text.indexOf("|") + 1));
        }
        if (roll.text.match(/NH/i) !== null) {
            noHighlight = true;
        }
        roll.text = roll.text.replace(/HR(\d+)/i, "");
        roll.text = roll.text.replace(/LR(\d+)/i, "");
        roll.text = roll.text.replace(/CR(\d+\|\d+)/i, "");
        roll.text = roll.text.replace(/NH/i, "");
        if (roll.text !== "") {
            roll.text = " [" + roll.text + "] ";
        }
        return {
            value: roll.text,
            highRoll: highRoll,
            lowRoll: lowRoll,
            noHighlight: noHighlight
        };
    } else if (roll.type === "M") {
        roll.expr = roll.expr.toString().replace(/\+/g, " + ");
        return {
            value: roll.expr
        };
    } else if (roll.type === "R") {
        var rollValues = [];
        _.each(roll.results, function (result) {
            if (result.tableItem !== undefined) {
                rollValues.push(result.tableItem.name);
            } else {
                critRoll = false;
                failRoll = false;
                if (noHighlight) {
                    critRoll = false;
                    failRoll = false;
                } else {
                    if (highRoll !== false && result.v >= highRoll || result.v === roll.sides) {
                        critRoll = true;
                    } else if (lowRoll !== false && result.v <= lowRoll || result.v === 1) {
                        failRoll = true;
                    }
                }
                result.v = "<span class='basicdiceroll" + (critRoll ? ' critsuccess' : (failRoll ? ' critfail' : '')) + "'>" + result.v + "</span>";
                rollValues.push(result.v);
            }
        });
        return {
            value: "(" + rollValues.join(" + ") + ")",
            critRoll: critRoll,
            failRoll: failRoll,
            highRoll: highRoll,
            lowRoll: lowRoll,
            noHighlight: noHighlight
        };
    } else if (roll.type === "G") {
        var grollVal = [];
        _.each(roll.rolls, function (groll) {
            _.each(groll, function (groll2) {
                var result = processRoll(groll2, highRoll, lowRoll, noHighlight);
                grollVal.push(result.value);
                critRoll = critRoll || result.critRoll;
                failRoll = failRoll || result.failRoll;
                highRoll = highRoll || result.highRoll;
                lowRoll = lowRoll || result.lowRoll;
                noHighlight = noHighlight || result.noHighlight;
            });
        });
        return {
            value: "{" + grollVal.join(" ") + "}",
            critRoll: critRoll,
            failRoll: failRoll,
            highRoll: highRoll,
            lowRoll: lowRoll,
            noHighlight: noHighlight
        };
    }
}