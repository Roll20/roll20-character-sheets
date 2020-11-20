// NEW SCRIPT ERROR PROOFING
;

// VERSION INFO
var PowerCards_Author = "HoneyBadger";
var PowerCards_Version = "3.2.17a";
var PowerCards_LastUpdated = "February 20th, 2016 ~ 10:00 am eastern";

// FUNCTION DECLARATIONS
var PowerCard = PowerCard || {};
var buildInline = buildInline || {};
var processRoll = processRoll || {};
var doInlineFormatting = doInlineFormatting || {};
var getCurrentTime = getCurrentTime || {};
var getBrightness = getBrightness || {};
var getHex2Dec = getHex2Dec || {};
var getPowerCardFormats = getPowerCardFormats || {};
var getPowerCardStatusList = getPowerCardStatusList || {};
var getTargetInfo = getTargetInfo || {};
var statusSymbol = statusSymbol || {};

// INLINE ROLL COLORS
var INLINE_ROLL_DEFAULT = " background-color: #FFFEA2; border-color: #87850A; color: #000000;";
var INLINE_ROLL_CRIT_LOW = " background-color: #FFAAAA; border-color: #660000; color: #660000;";
var INLINE_ROLL_CRIT_HIGH = " background-color: #88CC88; border-color: #004400; color: #004400;";
var INLINE_ROLL_CRIT_BOTH = " background-color: #8FA4D4; border-color: #061539; color: #061539;";
var INLINE_ROLL_STYLE = "text-align: center; font-size: 100%; font-weight: bold; display: inline-block; min-width: 1.75em; height: 1em; margin-top: -1px; margin-bottom: 1px; padding: 0px 2px; border: 1px solid; border-radius: 3px;";

// API COMMAND HANDLER
on("chat:message", function(msg) {
    if (msg.type !== "api") return;
    if (msg.content.split(" ", 1)[0] === "!power") {
        var player_obj = getObj("player", msg.playerid);
        msg.who = msg.who.replace(" (GM)", "");
        msg.content = msg.content.replace(/<br\/>\n/g, ' ').replace(/({{(.*?)}})/g, " $2 ");
        PowerCard.Process(msg, player_obj);
    }
    if (msg.content.split(" ", 1)[0] === "!power_version") {
        sendChat("HoneyBadger", "/w " + msg.who + " You are using version " + PowerCards_Version + " of PowerCards, authored by " + PowerCards_Author + ", which was last updated on: " + PowerCards_LastUpdated + ".");
    }
});

// LOAD POWERCARD FORMATS
on("ready", function() {
    getPowerCardFormats();
    log("(" + getCurrentTime() + ") PowerCards version " + PowerCards_Version + " loaded. Last updated: " + PowerCards_LastUpdated);
});

on("change:handout", function() {
    getPowerCardFormats();
    getPowerCardStatusList();
});

// POWERCARD
PowerCard.Process = function(msg, player_obj) {
    // USER CONFIGURATION
    var ALLOW_URLS = false; // Allows players to include full urls in powercards
    var ALLOW_HIDDEN_URLS = false; // Allows players to hide urls as a link instead
    var CUSTOM_EMOTES = true; // Set to true to use custom emotes instead of Roll20 emotes
    var SHOW_AVATAR = true; // Set to false to hide character sheet avatar in custom emotes
    var USE_DEFAULT_FORMAT = false; // Set to true if you want powercards to default formatting
    var USE_PLAYER_COLOR = false; // Set to true to override all color formatting
    var USE_TIMESTAMPS = true; // Set to false to turn off time stamps in chat

    // REPLACE INLINE ROLLS WITH EXPRESSIONS
    if (msg.inlinerolls !== undefined) {
        var Count = 0;
        while (Count < msg.inlinerolls.length) {
            msg.content = msg.content.replace("$[[" + Count + "]]", ("[[" + msg.inlinerolls[Count].expression + " ]]").replace(/\[\[\[/g, "[[ ["));
            Count++;
        }
    }

    // DEFINE VARIABLES
    var n = (player_obj) ? msg.content.replace("%%who%%", player_obj.get("displayname")).split("--") : msg.content.split("--");
    var PowerCard = {};
    var Tag = "";
    var Content = "";
    var TagCount = 0;
    var TagRepeat = 0;

    // PLACEHOLDER VARIABLES
    var Avatar = "";
    var Character = "";
    var Token = "";

    // DEFAULT FORMATTING
    var Display = "";
    var PlayerBGColor = (player_obj) ? player_obj.get("color") : "#FFFFFF";
    var PlayerTXColor = (getBrightness(PlayerBGColor) < (255 / 2)) ? "#FFFFFF" : "#000000";
    PowerCard.titlefont = "Contrail One";
    PowerCard.titlefontvariant = "normal";
    PowerCard.subtitlefont = "Tahoma";
    PowerCard.subtitlefontvariant = "normal";
    PowerCard.bodyfont = "Helvetica";
    PowerCard.titlefontsize = "18px";
    PowerCard.subtitlefontsize = "11px";
    PowerCard.bodyfontsize = "14px";
    PowerCard.txcolor = PlayerTXColor;
    PowerCard.bgcolor = PlayerBGColor;
    PowerCard.erowtx = "#000000";
    PowerCard.erowbg = "#B6AB91"; // #B6AB91 - Default darker brown
    PowerCard.orowtx = "#000000";
    PowerCard.orowbg = "#CEC7B6"; // #CEC7B6 - Default light brown
    PowerCard.corners = 3; // Set to 0 to remove rounded corners from PowerCards
    PowerCard.border = "1px solid #000000"; // size style #color
    PowerCard.boxshadow = ""; // h-distance v-distance blur spread #color

    // CREATE POWERCARD OBJECT
    n.shift();
    _.each(n, function(a) {
        Tag = a.substring(0, a.indexOf("|")).trim();
        Content = a.substring(a.indexOf("|") + 1).trim();
        if (Tag === "target_list") Content = Content.split(" | ");
        if (Tag.charAt(0) !== "$") {
            if (Tag.indexOf("#") !== -1) {
                TagRepeat = parseInt(Tag.substring(Tag.indexOf("#") + 1));
                TagCount = 1;
                Tag = Tag.substring(0, Tag.indexOf("#"));
                while (TagCount <= TagRepeat) {
                    var NewTag = Tag;
                    var NewContent = Content;
                    if (PowerCard.target_list !== undefined) {
                        if (Tag.indexOf("%%") !== -1 || Content.indexOf("%%") !== -1) {
                            NewTag = getTargetInfo(Tag, PowerCard.target_list);
                            NewContent = getTargetInfo(Content, PowerCard.target_list);
                            PowerCard.target_list.shift();
                        }
                    }
                    PowerCard[NewTag + " #" + TagCount] = NewContent;
                    TagCount += 1;
                }
            } else {
                if (PowerCard.target_list !== undefined) {
                    if (Tag.indexOf("%%") !== -1 || Content.indexOf("%%") !== -1) {
                        Tag = getTargetInfo(Tag, PowerCard.target_list);
                        Content = getTargetInfo(Content, PowerCard.target_list);
                        PowerCard.target_list.shift();
                    }
                }
                PowerCard[Tag] = Content;
            }
        }
    });
    
    // 5eSkills Tag -- ONLY WORKS WITH THE COMMUNITY SHEET -- NOT THE OGL & NOT THE SHAPED
    if (PowerCard.Skills5e && PowerCard.charid) {
        var CharacterName = getAttrByName(PowerCard.charid, "character_name");
        var SkillList = "";
        var Proficiency = 1 + Math.ceil((0 
            + parseInt(getAttrByName(PowerCard.charid, "barbarian_level"))
            + parseInt(getAttrByName(PowerCard.charid, "bard_level")) 
            + parseInt(getAttrByName(PowerCard.charid, "cleric_level"))
            + parseInt(getAttrByName(PowerCard.charid, "druid_level"))
            + parseInt(getAttrByName(PowerCard.charid, "fighter_level"))
            + parseInt(getAttrByName(PowerCard.charid, "monk_level"))
            + parseInt(getAttrByName(PowerCard.charid, "paladin_level"))
            + parseInt(getAttrByName(PowerCard.charid, "ranger_level"))
            + parseInt(getAttrByName(PowerCard.charid, "rogue_level"))
            + parseInt(getAttrByName(PowerCard.charid, "sorcerer_level"))
            + parseInt(getAttrByName(PowerCard.charid, "warlock_level"))
            + parseInt(getAttrByName(PowerCard.charid, "wizard_level")))/4);
        var Expertise = Proficiency * 2;
        if (PowerCard.Skills5e === "Strength") {
            // ATHLETICS
            var Athletics = parseInt(getAttrByName(PowerCard.charid, "athletics_bonus"));
            if (getAttrByName(PowerCard.charid, "athletics_prof_exp") === "@{PB}") Athletics += Proficiency;
            if (getAttrByName(PowerCard.charid, "athletics_prof_exp") === "(2*@{PB})") Athletics += Expertise;
            if (Athletics >= 0) Athletics = "+" + Athletics;
            
            SkillList += "Athletics (" + Athletics + ")";
        }
        if (PowerCard.Skills5e === "Dexterity") {
            // ACROBATICS
            var Acrobatics = parseInt(getAttrByName(PowerCard.charid, "acrobatics_bonus"));
            if (getAttrByName(PowerCard.charid, "acrobatics_prof_exp") === "@{PB}") Acrobatics += Proficiency;
            if (getAttrByName(PowerCard.charid, "acrobatics_prof_exp") === "(2*@{PB})") Acrobatics += Expertise;
            if (Acrobatics >= 0) Acrobatics = "+" + Acrobatics;
            
            // ACROBATICS
            var SleightOfHand = parseInt(getAttrByName(PowerCard.charid, "sleightofhand_bonus"));
            if (getAttrByName(PowerCard.charid, "sleightofhand_prof_exp") === "@{PB}") SleightOfHand += Proficiency;
            if (getAttrByName(PowerCard.charid, "sleightofhand_prof_exp") === "(2*@{PB})") SleightOfHand += Expertise;
            if (SleightOfHand >= 0) SleightOfHand = "+" + SleightOfHand;
            
            // ACROBATICS
            var Stealth = parseInt(getAttrByName(PowerCard.charid, "stealth_bonus"));
            if (getAttrByName(PowerCard.charid, "stealth_prof_exp") === "@{PB}") Stealth += Proficiency;
            if (getAttrByName(PowerCard.charid, "stealth_prof_exp") === "(2*@{PB})") Stealth += Expertise;
            if (Stealth >= 0) Stealth = "+" + Stealth;
            
            SkillList += "Acrobatics (" + Acrobatics + "), Sleight of Hand (" + SleightOfHand + "), Stealth (" + Stealth + ")";
        }
        if (PowerCard.Skills5e === "Intelligence") {
            // ARCANA
            var Arcana = parseInt(getAttrByName(PowerCard.charid, "arcana_bonus"));
            if (getAttrByName(PowerCard.charid, "arcana_prof_exp") === "@{PB}") Arcana += Proficiency;
            if (getAttrByName(PowerCard.charid, "arcana_prof_exp") === "(2*@{PB})") Arcana += Expertise;
            if (Arcana >= 0) Arcana = "+" + Arcana;
            
            // HISTORY
            var History = parseInt(getAttrByName(PowerCard.charid, "history_bonus"));
            if (getAttrByName(PowerCard.charid, "history_prof_exp") === "@{PB}") History += Proficiency;
            if (getAttrByName(PowerCard.charid, "history_prof_exp") === "(2*@{PB})") History += Expertise;
            if (History >= 0) History = "+" + History;
            
            // INVESTIGATION
            var Investigation = parseInt(getAttrByName(PowerCard.charid, "investigation_bonus"));
            if (getAttrByName(PowerCard.charid, "investigation_prof_exp") === "@{PB}") Investigation += Proficiency;
            if (getAttrByName(PowerCard.charid, "investigation_prof_exp") === "(2*@{PB})") Investigation += Expertise;
            if (Investigation >= 0) Investigation = "+" + Investigation;
            
            // NATURE
            var Nature = parseInt(getAttrByName(PowerCard.charid, "nature_bonus"));
            if (getAttrByName(PowerCard.charid, "nature_prof_exp") === "@{PB}") Nature += Proficiency;
            if (getAttrByName(PowerCard.charid, "nature_prof_exp") === "(2*@{PB})") Nature += Expertise;
            if (Nature >= 0) Nature = "+" + Nature;
            
            // RELIGION
            var Religion = parseInt(getAttrByName(PowerCard.charid, "religion_bonus"));
            if (getAttrByName(PowerCard.charid, "religion_prof_exp") === "@{PB}") Religion += Proficiency;
            if (getAttrByName(PowerCard.charid, "religion_prof_exp") === "(2*@{PB})") Religion += Expertise;
            if (Religion >= 0) Religion = "+" + Religion;
            
            SkillList += "Arcana (" + Arcana + "), History (" + History + "), Investigation (" + Investigation + "), Nature (" + Nature + "), Religion (" + Religion + ")";
        }
        if (PowerCard.Skills5e === "Wisdom") {
            // ANIMAL HANDLING
            var AnimalHandling = parseInt(getAttrByName(PowerCard.charid, "animalhandling_bonus"));
            if (getAttrByName(PowerCard.charid, "animalhandling_prof_exp") === "@{PB}") AnimalHandling += Proficiency;
            if (getAttrByName(PowerCard.charid, "animalhandling_prof_exp") === "(2*@{PB})") AnimalHandling += Expertise;
            if (AnimalHandling >= 0) AnimalHandling = "+" + AnimalHandling;
            
            // INSIGHT
            var Insight = parseInt(getAttrByName(PowerCard.charid, "insight_bonus"));
            if (getAttrByName(PowerCard.charid, "insight_prof_exp") === "@{PB}") Insight += Proficiency;
            if (getAttrByName(PowerCard.charid, "insight_prof_exp") === "(2*@{PB})") Insight += Expertise;
            if (Insight >= 0) Insight = "+" + Insight;
            
            // MEDICINE
            var Medicine = parseInt(getAttrByName(PowerCard.charid, "medicine_bonus"));
            if (getAttrByName(PowerCard.charid, "medicine_prof_exp") === "@{PB}") Medicine += Proficiency;
            if (getAttrByName(PowerCard.charid, "medicine_prof_exp") === "(2*@{PB})") Medicine += Expertise;
            if (Medicine >= 0) Medicine = "+" + Medicine;
            
            // PERCEPTION
            var Perception = parseInt(getAttrByName(PowerCard.charid, "perception_bonus"));
            if (getAttrByName(PowerCard.charid, "perception_prof_exp") === "@{PB}") Perception += Proficiency;
            if (getAttrByName(PowerCard.charid, "perception_prof_exp") === "(2*@{PB})") Perception += Expertise;
            if (Perception >= 0) Perception = "+" + Perception;
            
            // SURVIVAL
            var Survival = parseInt(getAttrByName(PowerCard.charid, "survival_bonus"));
            if (getAttrByName(PowerCard.charid, "survival_prof_exp") === "@{PB}") Survival += Proficiency;
            if (getAttrByName(PowerCard.charid, "survival_prof_exp") === "(2*@{PB})") Survival += Expertise;
            if (Survival >= 0) Survival = "+" + Survival;
            
            SkillList += "Animal Handling (" + AnimalHandling + "), Insight (" + Insight + "), Medicine (" + Medicine + "), Perception (" + Perception + "), Survival (" + Survival + ")";
        }
        if (PowerCard.Skills5e === "Charisma") {
            // DECEPTION
            var Deception = parseInt(getAttrByName(PowerCard.charid, "deception_bonus"));
            if (getAttrByName(PowerCard.charid, "deception_prof_exp") === "@{PB}") Deception += Proficiency;
            if (getAttrByName(PowerCard.charid, "deception_prof_exp") === "(2*@{PB})") Deception += Expertise;
            if (Deception >= 0) Deception = "+" + Deception;
            
            // INTIMIDATION
            var Intimidation = parseInt(getAttrByName(PowerCard.charid, "intimidation_bonus"));
            if (getAttrByName(PowerCard.charid, "intimidation_prof_exp") === "@{PB}") Intimidation += Proficiency;
            if (getAttrByName(PowerCard.charid, "intimidation_prof_exp") === "(2*@{PB})") Intimidation += Expertise;
            if (Intimidation >= 0) Intimidation = "+" + Intimidation;
            
            // PERFORMANCE
            var Performance = parseInt(getAttrByName(PowerCard.charid, "performance_bonus"));
            if (getAttrByName(PowerCard.charid, "performance_prof_exp") === "@{PB}") Performance += Proficiency;
            if (getAttrByName(PowerCard.charid, "performance_prof_exp") === "(2*@{PB})") Performance += Expertise;
            if (Performance >= 0) Performance = "+" + Performance;
            
            // PERSUASION
            var Persuasion = parseInt(getAttrByName(PowerCard.charid, "persuasion_bonus"));
            if (getAttrByName(PowerCard.charid, "persuasion_prof_exp") === "@{PB}") Persuasion += Proficiency;
            if (getAttrByName(PowerCard.charid, "persuasion_prof_exp") === "(2*@{PB})") Persuasion += Expertise;
            if (Persuasion >= 0) Persuasion = "+" + Persuasion;
            
            SkillList += "Deception (" + Deception + "), Intimidation (" + Intimidation + "), Performance (" + Performance + "), Persuasion (" + Persuasion +")";
        }
        if (_.isEmpty(SkillList) === false) PowerCard["Skills:"] = SkillList;
    }

    // PROCESS INLINE ROLLS...
    sendChat("", JSON.stringify(PowerCard), function(x) {
        var PowerCard = JSON.parse(x[0].content);
        
        // GET CUSTOM STYLES AND ADD THEM TO POWERCARD...
        if (USE_DEFAULT_FORMAT && state.PowerCard_Formats["default"] !== undefined && PowerCard.format === undefined) PowerCard.format = "default";
        if (PowerCard.format !== undefined) {
            var PowerCard_Formats = (state.PowerCard_Formats && state.PowerCard_Formats[PowerCard.format] !== undefined) ? state.PowerCard_Formats[PowerCard.format].split("--") : ["txcolor|#FFF", "bgcolor|#040", "titlefont|Georgia", "subtitlefont|Tahoma"];
            PowerCard_Formats.forEach(function(a) {
                Tag = a.substring(0, a.indexOf("|")).trim();
                Content = a.substring(a.indexOf("|") + 1).trim();
                if (Tag !== "" && Content !== "") PowerCard[Tag] = Content;
            });
        }
        
        // GET LIST OF ROLL ID'S FOR CONDITIONAL STATEMENTS...
        var RollText = "";
        var RollID = "";
        var RollResults = "";
        var RollBase = 0;
        var RollOnes = 0;
        var RollTotal = 0;
        var RollSuccesses = 0;
        var Rolls = {};
        Object.keys(x[0].inlinerolls).forEach(function(Roll) {
            var RollCount = 0;
            while (x[0].inlinerolls[Roll].results.rolls[RollCount] !== undefined) {
                if (x[0].inlinerolls[Roll].results.rolls[RollCount].type === "L" && x[0].inlinerolls[Roll].results.rolls[RollCount].text.indexOf("$") !== -1) {
                    RollText = x[0].inlinerolls[Roll].results.rolls[RollCount].text.split("|");
                    var t = 0;
                    while (RollText[t] !== undefined) {
                        if (RollText[t].charAt(0) === "$") RollID = RollText[t];
                        t++;
                    }
                    // Roll Base
                    RollResults = x[0].inlinerolls[Roll].results.rolls[RollCount + 1].results;
                    if (RollResults === undefined) {
                        RollBase = x[0].inlinerolls[Roll].results.total;
                    } else {
                        t = 0;
                        RollBase = 0;
                        RollOnes = 0;
                        while (RollResults[t] !== undefined) {
                            if ("table" in x[0].inlinerolls[Roll].results.rolls[RollCount + 1]) {
                                if (RollResults[t].tableidx) RollBase = RollBase + RollResults[t].tableidx;
                            } else {
                                if (!RollResults[t].d) RollBase = RollBase + RollResults[t].v;
                            }
                            RollOnes = (RollResults[t].v === 1) ? RollOnes += 1 : RollOnes;
                            t++;
                        }
                    }
                    
                    // Roll Total
                    RollTotal = x[0].inlinerolls[Roll].results.total;
                    
                    // Roll Successes
                    if ("mods" in x[0].inlinerolls[Roll].results.rolls[RollCount + 1]) {
                        if ("success" in x[0].inlinerolls[Roll].results.rolls[RollCount + 1].mods) {
                            var rCount = 0;
                            RollSuccesses = 0;
                            while (rCount <= x[0].inlinerolls[Roll].results.rolls[RollCount + 1].results.length-1) {
                                if (x[0].inlinerolls[Roll].results.rolls[RollCount + 1].mods.success.comp == ">=") {
                                    if (x[0].inlinerolls[Roll].results.rolls[RollCount + 1].results[rCount].v >= x[0].inlinerolls[Roll].results.rolls[RollCount + 1].mods.success.point) RollSuccesses += 1;
                                }
                                if (x[0].inlinerolls[Roll].results.rolls[RollCount + 1].mods.success.comp == "==") {
                                    if (x[0].inlinerolls[Roll].results.rolls[RollCount + 1].results[rCount].v == x[0].inlinerolls[Roll].results.rolls[RollCount + 1].mods.success.point) RollSuccesses += 1;
                                }
                                if (x[0].inlinerolls[Roll].results.rolls[RollCount + 1].mods.success.comp == "<=") {
                                    if (x[0].inlinerolls[Roll].results.rolls[RollCount + 1].results[rCount].v <= x[0].inlinerolls[Roll].results.rolls[RollCount + 1].mods.success.point) RollSuccesses += 1;
                                }
                                rCount++;
                            }
                        }
                    }
                    
                    // Create RollID in Rolls with the following values...
                    Rolls[RollID] = {
                        "base": RollBase,
                        "total": RollTotal,
                        "successes": RollSuccesses,
                        "ones": RollOnes
                    };
                }
                RollCount++;
            }
        });
        
        // PREVENT EMPTY EMOTE ERROR IN ROLL20 CHAT...
        if (PowerCard.emote === "") PowerCard.emote = undefined;
        
        // REPLACE UNDEFINED TITLE TAG WITH MSG.WHO...
        if (PowerCard.title === undefined) PowerCard.title = "PowerCard sent by:<br>" + msg.who;
        
        // ERROR CATCH FOR EMPTY WHISPER TAG...
        if (PowerCard.whisper === "") PowerCard.whisper = "GM";
        if (PowerCard.whisper === "self") PowerCard.whisper = msg.who;
        
        // CREATE CSS EMOTE...
        if (CUSTOM_EMOTES && PowerCard.emote !== undefined && (PowerCard.charid !== undefined || PowerCard.tokenid !== undefined)) {
            // GET AVATAR FROM CHARACTER SHEET
            if (PowerCard.charid !== undefined) {
                Character = getObj("character", PowerCard.charid);
                Avatar = (Character !== undefined && Character.get("avatar") !== "") ? "<img src=" + Character.get('avatar') + " style='height: 50px; width: 50px; margin-left: -10px; padding: 0px 2px 4px 0px; vertical-align: middle; float: left;'></img>" : "";
            }
            // GET AVATAR FROM TOKEN IMAGE
            if (PowerCard.tokenid !== undefined) {
                Token = getObj("graphic", PowerCard.tokenid);
                Avatar = (Token !== undefined && Token.get("imgsrc") !== "") ? "<img src=" + Token.get('imgsrc') + " style='height: 50px; width: 50px; margin-left: -10px; padding: 0px 2px 4px 0px; vertical-align: middle; float: left;'></img>" : "";
            }
            // HIDE AVATAR
            if (PowerCard.emote.charAt(0) === "!") {
                PowerCard.emote = PowerCard.emote.substring(1);
                SHOW_AVATAR = false;
            }
            // GET TEXT ALIGNMENT FOR EMOTES
            var EmoteTextAlign = "center";
            if (PowerCard.emote.indexOf("~L") !== -1) {
                PowerCard.emote = PowerCard.emote.replace(/\~L/g, "");
                EmoteTextAlign = "left";
            }
            if (PowerCard.emote.indexOf("~R") !== -1) {
                PowerCard.emote = PowerCard.emote.replace(/\~R/g, "");
                EmoteTextAlign = "right";
            }
            if (PowerCard.emote.indexOf("~J") !== -1) {
                PowerCard.emote = PowerCard.emote.replace(/\~J/g, "");
                EmoteTextAlign = "justify";
            }
            // CREATE EMOTE DIV
            if (SHOW_AVATAR) PowerCard.emote = "<div style='display: block; min-height: 50px; width: 100%; font-size: 13px; vertical-align: middle; text-align: " + EmoteTextAlign + ";'>" + Avatar + doInlineFormatting(PowerCard.emote) + "</div>";
            else PowerCard.emote = "<div style='display: block; min-height: 50px; width: 100%; font-size: 13px; vertical-align: middle; text-align: " + EmoteTextAlign + ";'>" + doInlineFormatting(PowerCard.emote) + "</div>";
        }
        
        // CREATE SHADOWBOX STYLE...
        var ShadowBoxStyle = "" + "clear: both; " + "margin-left: -10px; " + "box-shadow: " + PowerCard.boxshadow + "; " + "border-radius: " + PowerCard.corners + "px; ";
        
        // CREATE TITLE STYLE...
        var TitleStyle = "" + "font-family: " + PowerCard.titlefont + "; " + "font-size: " + PowerCard.titlefontsize + "; " + "font-weight: normal; " + "font-variant: " + PowerCard.titlefontvariant + "; " + "letter-spacing: 2px; " + "text-align: center; " + "vertical-align: middle; " + "margin: 0px; " + "padding: 3px 0px 0px 0px; " + "border: " + PowerCard.border + "; " + "border-radius: " + PowerCard.corners + "px " + PowerCard.corners + "px 0px 0px; ";
        
        // CREATE SUBTITLE STYLE...
        var SubTitleStyle = "" + "font-family: " + PowerCard.subtitlefont + "; " + "font-size: " + PowerCard.subtitlefontsize + "; " + "font-weight: normal; " + "font-variant: " + PowerCard.subtitlefontvariant + "; " + "letter-spacing: 1px;";
        
        // ADD BACKGROUND & TEXT COLORS...
        if (USE_PLAYER_COLOR === true && PowerCard.format === undefined) {
            TitleStyle += " color: " + PlayerTXColor + ";";
            TitleStyle += " background-color: " + PlayerBGColor + ";";
        } else {
            TitleStyle += " color: " + PowerCard.txcolor + ";";
            TitleStyle += " background-color: " + PowerCard.bgcolor + ";";
        }
        
        // CREATE TITLEBOX...
        var Title = "" + "<div style='" + ShadowBoxStyle + "'>" + "<div style='" + TitleStyle + "' class='showtip tipsy' title='" + PowerCard.title + "'>" + PowerCard.name;
        
        // ADD SUBTITLES...
        var Diamond = " &" + "#x2666; ";
        var Subtitle = "<br><span style='" + SubTitleStyle + "'>";
        Subtitle += (PowerCard.leftsub !== undefined) ? PowerCard.leftsub : "";
        Subtitle += (PowerCard.leftsub !== undefined && PowerCard.rightsub !== undefined) ? Diamond : "";
        Subtitle += (PowerCard.rightsub !== undefined) ? PowerCard.rightsub : "";
        
        // ADD TITLE AND SUBTITLE TO DISPLAY OBJECT...
        Display += doInlineFormatting(Title + Subtitle + "</span></div>", ALLOW_URLS, ALLOW_HIDDEN_URLS);
        
        // CREATE ROW STYLES & OTHER INFO...
        var OddRow = "color: " + PowerCard.orowtx + "; background-color: " + PowerCard.orowbg + "; ";
        var EvenRow = "color: " + PowerCard.erowtx + "; background-color: " + PowerCard.erowbg + "; ";
        var RowBackground = OddRow;
        var RowNumber = 1;
        var Indent = 0;
        
        // ROW STYLE...
        var RowStyle = "" + "line-height: 1.1em; " + "vertical-align: middle; " + "font-family: " + PowerCard.bodyfont + "; " + "font-size: " + PowerCard.bodyfontsize + "; " + "font-weight: normal; " + "margin 0px; " + "padding: 4px 5px 2px 5px; " + "border-left: " + PowerCard.border + "; " + "border-right: " + PowerCard.border + "; " + "border-radius: 0px;";
        
        // LAST ROW STYLE...
        var LastRowStyle = RowStyle + " border-bottom: " + PowerCard.border + ";" + " border-radius: 0px 0px " + PowerCard.corners + "px " + PowerCard.corners + "px;";
        
        // KEY INFO...
        var KeyCount = 0;
        var Keys = Object.keys(PowerCard);
        
        // CONDITIONAL STATEMENTS TO REMOVE TAGS FROM KEYS...
        KeyCount = 0;
        Keys.forEach(function(Tag) {
            var Result = "";
            var Conditional = "";
            var LeftVal = "";
            var OP = "";
            var RightVal = "";
            var Operand = "";
            var Success = false;
            var OriginalTag = Tag;
            while (Tag.charAt(0) === "?" && Tag.charAt(1) === "?") {
                Conditional = Tag.match(/\?\?(.*?)\?\?/g)[0].replace(/\?\?/g, "").trim().split(" ");
                while (Operand !== undefined) {
                    LeftVal = Conditional.shift();
                    OP = Conditional.shift();
                    RightVal = Conditional.shift();
                    // GET LEFT SIDE VALUES...
                    if (LeftVal !== undefined && LeftVal.match(/\$\[\[/)) {
                        LeftVal = parseInt(x[0].inlinerolls[LeftVal.match(/[0-9]+/)].results.total);
                    } else if (LeftVal !== undefined && LeftVal.charAt(0) === "$") {
                        LeftVal = LeftVal.split("."); 
                        if (LeftVal[1]) {
                            if (LeftVal[1] == "ss") LeftVal[1] = "successes";
                        } else LeftVal[1] = "total";
                        if (Rolls[LeftVal[0]]) LeftVal = parseInt(Rolls[LeftVal[0]][LeftVal[1]]);
                    } else {
                        if (isFinite(LeftVal) && !isNaN(LeftVal)) {
                            LeftVal = (parseFloat(LeftVal) || 0);
                        } else {
                            // Not a number, left empty for possible future use...
                        }
                    }
                    // GET RIGHT SIDE VALUES...
                    if (RightVal !== undefined && RightVal.match(/\$\[\[/)) {
                        RightVal = parseInt(x[0].inlinerolls[RightVal.match(/[0-9]+/)].results.total);
                    } else if (RightVal !== undefined && RightVal.charAt(0) === "$") {
                        RightVal = RightVal.split(".");
                        if (RightVal[1]) {
                            if (RightVal[1] == "ss") RightVal[1] = "successes";
                        } else RightVal[1] = "total";
                        if (Rolls[RightVal[0]]) RightVal = parseInt(Rolls[RightVal[0]][RightVal[1]]);
                    } else {
                        if (isFinite(RightVal) && !isNaN(RightVal)) {
                            RightVal = (parseFloat(RightVal) || 0);
                        } else {
                            // Not a number, left empty for possible future use...
                        }
                    }
                    switch (OP) {
                        case ">":
                            Success = (LeftVal > RightVal);
                            break;
                        case ">=":
                            Success = (LeftVal >= RightVal);
                            break;
                        case "==":
                            Success = (LeftVal == RightVal);
                            break;
                        case "<=":
                            Success = (LeftVal <= RightVal);
                            break;
                        case "<":
                            Success = (LeftVal < RightVal);
                            break;
                        case "<>":
                            Success = (LeftVal != RightVal);
                            break;
                        case "%":
                            Success = ((LeftVal % RightVal) == 0);
                            break;
                        case "~%":
                            Success = ((LeftVal % RightVal) != 0);
                            break;
                        default:
                            Success = false;
                    }
                    Operand = Conditional.shift();
                    if (Operand !== undefined) {
                        if (Operand.toLowerCase() === "and" && Success === false) break;
                        if (Operand.toLowerCase() === "or" && Success === true) break;
                    }
                }
                if (Success) Tag = Tag.replace(/\?\?(.*?)\?\?/, "").trim();
                else Tag = Tag.replace(/\?\?(.*?)\?\?/, "$").trim();
            }
            PowerCard[Tag] = PowerCard[OriginalTag];
            Keys[KeyCount] = Tag;
            KeyCount++;
        });
        
        // REMOVE IGNORED TAGS...
        var IgnoredTags = ["charid", "tokenid", "emote", "leftsub", "rightsub", "name", "txcolor", "bgcolor", "erowbg", "erowtx", "orowbg", "orowtx", "whisper", "format", "title", "target_list", "titlefont", "subtitlefont", "bodyfont", "corners", "titlefontsize", "subtitlefontsize", "bodyfontsize", "border", "boxshadow", "titlefontvariant", "subtitlefontvariant", "Skills5e"];
        IgnoredTags.forEach(function(Tag) {
            if (Keys.indexOf(Tag) !== -1) Keys.splice(Keys.indexOf(Tag), 1);
        });
        
        // REMOVE HIDDEN TAGS...
        var NewKeys = [];
        Keys.forEach(function(Tag) {
            if (Tag.charAt(0) !== "$" && Tag !== "hroll" && Tag !== "hrolls") NewKeys.push(Tag);
        });
        Keys = NewKeys;
        
        // LOOP THROUGH REMAINING KEYS TO CREATE ROW DIVS FROM POWERCARD OBJECT...
        KeyCount = 0;
        Keys.forEach(function(Tag) {
            KeyCount++;
            Content = doInlineFormatting(PowerCard[Tag], ALLOW_URLS, ALLOW_HIDDEN_URLS, Rolls);
            RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
            RowBackground += (KeyCount === Keys.length) ? LastRowStyle : RowStyle;
            if (Content.indexOf("$[[") === -1) RowBackground = RowBackground.replace("padding: 4px 5px 2px 5px", "padding: 4px 5px 3px 5px");
            RowNumber += 1;
            Tag = Tag.replace(/( #[0-9]+)/g, ""); // Hides multitag numbers...
            Tag = Tag.replace(/( \*[0-9]+)/g, ""); // Hides same name tag numbers...
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
        
        // CLOSE SHADOWBOX DIV...
        Display += "</div>";
        
        // REPLACE INLINE ROLLS WITH VALUES
        if (x[0].inlinerolls !== undefined) {
            // SAVE TOKEN OR CHARACTER ID FOR USE WITH TRKR ROLL OPTION...
            var TrackerID = "-1";
            TrackerID = (PowerCard.charid !== undefined) ? "C|" + PowerCard.charid : TrackerID;
            TrackerID = (PowerCard.tokenid !== undefined) ? "T|" + PowerCard.tokenid : TrackerID;
            var RollExpression = "";
            var RollValue = 0;
            var i = 1;
            Object.keys(x[0].inlinerolls).forEach(function(i) {
                RollValue = x[0].inlinerolls[i];
                if (PowerCard.emote && PowerCard.emote.indexOf("$[[" + i + "]]") !== -1) PowerCard.emote = PowerCard.emote.replace("$[[" + i + "]]", buildInline(RollValue, TrackerID, msg.who));
                if (Display.indexOf("$[[" + i + "]]") !== -1) Display = Display.replace("$[[" + i + "]]", buildInline(RollValue, TrackerID, msg.who));
            });
        }
        
        // SEND TO CHAT...
        var TimeStamp = "";
        var Spacer = "/desc ";
        if (USE_TIMESTAMPS) {
            TimeStamp = "(" + getCurrentTime() + ") " + msg.who;
            Spacer = " ";
        }
        
        // WHISPER
        if (PowerCard.whisper !== undefined) {
            if (PowerCard.emote !== undefined) {
                if (PowerCard.charid !== undefined || PowerCard.tokenid !== undefined) {
                    sendChat(TimeStamp, Spacer);
                    sendChat(TimeStamp, "/direct " + PowerCard.emote)
                } else {
                    sendChat(TimeStamp, '/emas " " ' + PowerCard.emote);
                }
            }
            _.each(PowerCard.whisper.split(","), function(y) {
                var WhisperTarget = ('self' === y.trim() ? msg.who : y.trim());
                sendChat(msg.who, "/w " + WhisperTarget + " " + Display);
            });
        } else {
            if (PowerCard.emote !== undefined) {
                if (PowerCard.charid !== undefined || PowerCard.tokenid !== undefined) {
                    sendChat(TimeStamp, Spacer);
                    sendChat(TimeStamp, "/direct " + PowerCard.emote + Display);
                } else {
                    sendChat(TimeStamp, '/emas " " ' + PowerCard.emote);
                    sendChat(TimeStamp, "/direct " + Display);
                }
            } else {
                sendChat(TimeStamp, Spacer);
                sendChat(TimeStamp, "/direct " + Display);
            }
        }
    });
};

// FUNCTIONS ///////////////////////////////////////////////////////////////////
function buildInline(inlineroll, TrackerID, who) {
    var InlineColorOverride = "";
    var values = [];
    var critRoll = false;
    var failRoll = false;
    var critCheck = false;
    var failCheck = false;
    var expandedCheck = false;
    var highRoll = false;
    var lowRoll = false;
    var noHighlight = false;
    var expandedRoll = false;
    var notInline = false;
    var addToTracker = false;

    inlineroll.results.rolls.forEach(function(roll) {
        var result = processRoll(roll, noHighlight, expandedRoll, critCheck, failCheck, notInline);
        if (result["critCheck"]) critCheck = true;
        if (result["failCheck"]) failCheck = true;
        if (result["noHighlight"]) noHighlight = true;
        if (result["expandedRoll"]) expandedRoll = true;
        if (result["notInline"]) notInline = true;
        if (result["addToTracker"]) {
            // ADD TOKEN OR CHARACTER OR DISPLAY NAME TO TURN ORDER TRACKER...
            var TrackerName = "";
            if (TrackerID.charAt(0) === "C") {
                var Char = getObj("character", TrackerID.substring(2));
                var Tok = findObjs({
                    type: 'graphic',
                    pageid: Campaign().get("playerpageid"),
                    represents: TrackerID.substring(2)
                });
                if (_.isEmpty(Tok) && Char !== undefined) TrackerName = Char.get("name");
                else TrackerID = Tok[0].id;
            } else if (TrackerID.charAt(0) === "T") TrackerID = TrackerID.substring(2);
            else TrackerName = who;
            
            // CHECK TURN ORDER FOR EXISTING ID... REPLACE PR VALUE IF FOUND...
            var turn_order = ("" === Campaign().get("turnorder")) ? [] : JSON.parse(Campaign().get("turnorder"));
            var pos = turn_order.map(function(z) {
                return z.id;
            }).indexOf(TrackerID);
            if (pos === -1) turn_order.push({
                id: TrackerID,
                pr: inlineroll.results.total,
                custom: TrackerName
            });
            else turn_order[pos]["pr"] = inlineroll.results.total;
            
            // OPEN THE INITIATIVE WINDOW IF IT'S CLOSED...
            if (!Campaign().get("initiativepage")) Campaign().set("initiativepage", true);
            
            // SEND TURN ORDER BACK TO THE CAMPAIGN() OBJECT...
            Campaign().set("turnorder", JSON.stringify(turn_order));
        }
        if (result.value !== "") values.push(result.value);
    });

    // OVERRIDE THE ROLL20 INLINE ROLL COLORS...
    if (critCheck && failCheck) InlineColorOverride = INLINE_ROLL_CRIT_BOTH;
    else if (critCheck && !failCheck) InlineColorOverride = INLINE_ROLL_CRIT_HIGH;
    else if (!critCheck && failCheck) InlineColorOverride = INLINE_ROLL_CRIT_LOW;
    else InlineColorOverride = INLINE_ROLL_DEFAULT;

    // PARSE TABLE RESULTS
    inlineroll.results.tableentries = _.chain(inlineroll.results.rolls)
        .filter(function(r) {
            var tbl = _.has(r, 'table');
            return _.has(r, 'table');
        })
        .reduce(function(memo, r) {
            _.each(r.results, function(i) {
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

    // REMOVE ROLL OPTIONS LIKE NH, XPND, EMPTY BRACKETS, & ADD SPACING...
    inlineroll.expression = inlineroll.expression
        .replace(/\|nh|nh/, "")
        .replace(/\|xpnd|xpnd/i, "")
        .replace(/\|trkr|trkr/i, "")
        .replace(/\[\]/, "")
        .replace("<", "&" + "amp;" + "lt;")
        .replace(/\+/g, " + ")
        .replace(/\-/g, " - ")
        .replace(/\*/g, " * ")
        .replace(/\//g, " / ");
    // END ROLL OPTIONS

    // FINAL STEP...
    var rollOut = "";
    if (expandedRoll) {
        if (notInline) {
            rollOut = values.join("") + " = " + inlineroll.results.total;
        } else {
            rollOut = '<span style="' + INLINE_ROLL_STYLE + InlineColorOverride + '" title="Roll: ' + inlineroll.expression + '<br>Results: ' + values.join("") + ' = ' + inlineroll.results.total;
            rollOut += '" class="inlinerollresult showtip tipsy">' + values.join("") + ' = ' + inlineroll.results.total + '</span>';
        }
    } else {
        if (notInline) {
            rollOut = inlineroll.results.total;
        } else {
            rollOut = '<span style="' + INLINE_ROLL_STYLE + InlineColorOverride + '" title="Roll: ' + inlineroll.expression + '<br>Results: ' + values.join("") + ' = ' + inlineroll.results.total;
            rollOut += '" class="inlinerollresult showtip tipsy">' + inlineroll.results.total + '</span>';
        }
    }
    // rollOut = (inlineroll.results.total === 0 && inlineroll.results.tableentries.length) ? '' : rollOut;
    rollOut = (inlineroll.results.tableentries.length) ? '' : rollOut;
    rollOut += _.map(inlineroll.results.tableentries, function(l) {
        return (notInline) ? l.name : '<span style="' + INLINE_ROLL_STYLE + InlineColorOverride + '" title="Table: ' + l.table + ' ' + 'Weight: ' + l.weight + '" class="inlinerollresult showtip tipsy">' + l.name + '</span>';
    }).join('');
    return rollOut;
};

function processRoll(roll, noHighlight, expandedRoll, critCheck, failCheck, notInline, addToTracker) {
    if (roll.type === "C") {
        return {
            value: " " + roll.text + " "
        };
    } else if (roll.type === "L") {
        if (roll.text.match(/nh/i) !== null) noHighlight = true;
        if (roll.text.match(/xpnd/i) !== null) expandedRoll = true;
        if (roll.text.match(/txt/i) !== null) notInline = true;
        if (roll.text.match(/trkr/i) !== null) addToTracker = true;
        return {
            noHighlight: noHighlight,
            expandedRoll: expandedRoll,
            notInline: notInline,
            addToTracker: addToTracker
        };
    } else if (roll.type === "M") {
        if (roll.expr.toString().match(/\+|\-|\*|\\/g)) roll.expr = roll.expr.toString().replace(/\+/g, " + ").replace(/\-/g, " - ").replace(/\*/g, " * ").replace(/\//g, " / ");
        return {
            value: roll.expr
        };
    } else if (roll.type === "R") {
        var rollValues = [];
        _.each(roll.results, function(result) {
            if (result.tableItem !== undefined) {
                rollValues.push(result.tableItem.name);
            } else {
                critRoll = false;
                failRoll = false;
                if (noHighlight) {
                    critRoll = false;
                    failRoll = false;
                } else {
                    var Sides = roll.sides;
                    // CRITROLL CHECKS...
                    if (roll.mods && roll.mods["customCrit"]) {
                        var p = 0;
                        _.each(roll.mods["customCrit"], function() {
                            if (roll.mods["customCrit"][p]["comp"] === "<=" && result.v <= roll.mods["customCrit"][p]["point"]) critRoll = true;
                            if (roll.mods["customCrit"][p]["comp"] === "==" && result.v == roll.mods["customCrit"][p]["point"]) critRoll = true;
                            if (roll.mods["customCrit"][p]["comp"] === ">=" && result.v >= roll.mods["customCrit"][p]["point"]) critRoll = true;
                            p++;
                        });
                    } else {
                        if (result.v === Sides) critRoll = true;
                    }
                    // FAILROLL CHECKS...
                    if (roll.mods && roll.mods["customFumble"]) {
                        var p = 0;
                        _.each(roll.mods["customFumble"], function() {
                            if (roll.mods["customFumble"][p]["comp"] === "<=" && result.v <= roll.mods["customFumble"][p]["point"]) failRoll = true;
                            if (roll.mods["customFumble"][p]["comp"] === "==" && result.v == roll.mods["customFumble"][p]["point"]) failRoll = true;
                            if (roll.mods["customFumble"][p]["comp"] === ">=" && result.v >= roll.mods["customFumble"][p]["point"]) failRoll = true;
                            p++;
                        });
                    } else {
                        if (result.v === 1) failRoll = true;
                    }
                }
                if (expandedRoll) result.v = "<span style='" + (critRoll ? 'color: #040;' : (failRoll ? 'color: #600;' : '')) + "'>" + result.v + "</span>";
                else result.v = "<span style='" + (critRoll ? 'color: #0F0; font-size: 1.25em;' : (failRoll ? 'color: #F00; font-size: 1.25em;' : '')) + "'>" + result.v + "</span>";
                rollValues.push(result.v);
                if (critRoll) critCheck = true;
                if (failRoll) failCheck = true;
            }
        });
        return {
            value: "(" + rollValues.join(" + ") + ")",
            noHighlight: noHighlight,
            expandedRoll: expandedRoll,
            critCheck: critCheck,
            failCheck: failCheck,
            notInline: notInline,
            addToTracker: addToTracker
        };
    } else if (roll.type === "G") {
        var grollVal = [];
        _.each(roll.rolls, function(groll) {
            _.each(groll, function(groll2) {
                var result = processRoll(groll2, noHighlight, expandedRoll, critCheck, failCheck, notInline);
                grollVal.push(result.value);
                critCheck = critCheck || result.critCheck;
                failCheck = failCheck || result.failCheck;
                noHighlight = noHighlight || result.noHighlight;
                expandedRoll = expandedRoll || result.expandedRoll;
                notInline = notInline || result.notInline;
                addToTracker = addToTracker || result.addToTracker;
            });
        });
        return {
            value: "{" + grollVal.join(" ") + "}",
            noHighlight: noHighlight,
            expandedRoll: expandedRoll,
            critCheck: critCheck,
            failCheck: failCheck,
            notInline: notInline,
            addToTracker: addToTracker
        };
    }
};

function statusSymbol(symbol, altForReplace) {
    var icon;
    var info;
    var statuses = [
            'red', 'blue', 'green', 'brown', 'purple', 'pink', 'yellow', // 0-6
            'skull', 'sleepy', 'half-heart', 'half-haze', 'interdiction',
            'snail', 'lightning-helix', 'spanner', 'chained-heart',
            'chemical-bolt', 'death-zone', 'drink-me', 'edge-crack',
            'ninja-mask', 'stopwatch', 'fishing-net', 'overdrive', 'strong',
            'fist', 'padlock', 'three-leaves', 'fluffy-wing', 'pummeled',
            'tread', 'arrowed', 'aura', 'back-pain', 'black-flag',
            'bleeding-eye', 'bolt-shield', 'broken-heart', 'cobweb',
            'broken-shield', 'flying-flag', 'radioactive', 'trophy',
            'broken-skull', 'frozen-orb', 'rolling-bomb', 'white-tower',
            'grab', 'screaming', 'grenade', 'sentry-gun', 'all-for-one',
            'angel-outfit', 'archery-target'
        ],
        statusColormap = ['#C91010', '#1076c9', '#2fc910', '#c97310', '#9510c9', '#eb75e1', '#e5eb75'],
        i;
    symbol = altForReplace || symbol;
    
    if (!_.contains(statuses, symbol)) {
        icon = state.PowerCard_StatusList[symbol].icon;
        info = state.PowerCard_StatusList[symbol].info;
    }
    if (_.contains(statuses, icon)){
        i=_.indexOf(statuses, icon);
        if (i < 7) {
            return '<div style="width: 1em; height: 1em; border-radius: 100%; display: inline-block; margin: 0px 3px; border: 0; vertical-align: text-top; background-color: ' + statusColormap[i] + '"></div>' + info;
        } 
        return '<div style="float: left; width: 24px; height: 24px; display: inline-block; margin: 0; border: 0; cursor: pointer; padding: 0px 3px; background: url(\'https://app.roll20.net/images/statussheet.png\'); background-repeat: no-repeat; background-position: '+((-34)*(i-7))+'px 0px;"></div>' + info;
    }
	return "";
};

function doInlineFormatting(content, ALLOW_URLS, ALLOW_HIDDEN_URLS, Rolls) {
    // REPLACE [^ID] with value...
    var RollID;
    while (content.indexOf("[^") !== -1) {
        RollID = content.match(/\[\^(.*?)\]/);
        if (Rolls["$" + RollID[1].split(".")[0]]) {
            switch (RollID[1].split(".")[1]) {
                case "total":
                    content = content.replace(RollID[0], Rolls["$" + RollID[1].split(".")[0]].total);
                case "base":
                    content = content.replace(RollID[0], Rolls["$" + RollID[1].split(".")[0]].base);
                case "ss":
                    content = content.replace(RollID[0], Rolls["$" + RollID[1].split(".")[0]].successes);
                case "ones":
                    content = content.replace(RollID[0], Rolls["$" + RollID[1].split(".")[0]].ones);
                default:
                content = content.replace(RollID[0], Rolls["$" + RollID[1].split(".")[0]].base);
            }
        } else {
            content = content.replace(RollID[0], "Roll ID Not Found");
        }
    }
        
    // PARSE FOR INLINE FORMATTING
    var urls = [],
        str,
        formatter = function(s) {
            return s
                .replace(/__(.*?)__/g, "<u>$1</u>")
                .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                .replace(/\/\/(.*?)\/\//g, "<i>$1</i>")
                .replace(/\^\^/g, "<br>")
                .replace(/\^\*/g, "<span style='margin-left: 1em;'></span>")
                .replace(/\$\$(#([a-fA-F0-9]{3}|[a-fA-F0-9]{6}))\|(.*?)\$\$/g, "<span style='color: $1;'>$3</span>")
                .replace(/\~\~\~/g, "<hr style='border: 0; height: 0; border-top: 1px solid rgba(0, 0, 0, 0.3); border-bottom: 1px solid rgba(255, 255, 255, 0.3); margin-bottom: 3px; margin-top: 3px;'/>")
                .replace(/\~\J(.*?)\~\J/g, "<div style='text-align: justify; display: block;'>$1</div>")
                .replace(/\~\L(.*?)\~\L/g, "<span style='text-align: left;'>$1</span>")
                .replace(/\~\C(.*?)\~\C/g, "<div style='text-align: center; display: block;'>$1</div>")
                .replace(/\~\R(.*?)\~\R/g, "<div style='text-align: right; float: right;'>$1</div><div style='clear: both;'></div>")
                .replace(/\[\!(.*?)\!\]/g, "<span style='text-align: center; font-size: 100%; font-weight: bold; display: inline-block; min-width: 1.75em; height: 1em; border-radius: 3px; border: 1px solid; background-color: #FFFEA2; border-color: #87850A; color: #000000;' title='Created by PowerCards' class='showtip tipsy'>$1</span>")
                .replace(/\[\+(.*?)\]/g, statusSymbol)
            ;
        };
    str = _.reduce(
        content.match(/@@.*?@@/g),
        function(m, s, i) {
            var parts = s.replace(/@@(.*)@@/, '$1').split(/\|\|/),
                url = parts.shift().replace(/^\s*(http(s)?:\/\/|\/\/()|())/, 'http$2://'),
                text = formatter(parts.join('||'));
            if (ALLOW_URLS) {
                if (ALLOW_HIDDEN_URLS) {
                    urls[i] = '<a href="' + url + '">' + (text || url) + '</a>';
                } else {
                    urls[i] = '<a href="' + url + '">' + text + ' [' + url + ']</a>';
                }
            } else {
                urls[i] = s;
            }
            return m.replace(s, '@@' + i + '@@');
        },
        content
    );
    str = formatter(str);
    return _.reduce(
        urls,
        function(m, s, i) {
            return m.replace('@@' + i + '@@', s);
        },
        str
    );
};

function getBrightness(hex) {
    hex = hex.replace('#', '');
    var c_r = getHex2Dec(hex.substr(0, 2));
    var c_g = getHex2Dec(hex.substr(2, 2));
    var c_b = getHex2Dec(hex.substr(4, 2));
    return ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
};

function getCurrentTime() {
    var d = new Date();
    var h = ((d.getHours() + 1) < 10 ? "0" : "") + (d.getHours() + 1);
    var m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    var currentTime = h + ":" + m;
    return currentTime;
};

function getHex2Dec(hex_string) {
    hex_string = (hex_string + '').replace(/[^a-f0-9]/gi, '');
    return parseInt(hex_string, 16);
};

function getPowerCardFormats() {
    var PowerCard_FormatHandout = findObjs({
        _type: "handout",
        name: "PowerCard Formats"
    })[0];
    if (PowerCard_FormatHandout !== undefined) {
        var PowerCard_Formats = {};
        var FormatName = "";
        var FormatContent = "";
        PowerCard_FormatHandout.get("notes", function(notes) {
            notes = notes.split("<br>");
            notes.forEach(function(notes) {
                FormatName = notes.substring(0, notes.indexOf(":")).trim();
                FormatContent = notes.substring(notes.indexOf(":") + 1).trim();
                if (FormatName !== "" && FormatContent !== "") PowerCard_Formats[FormatName] = " " + FormatContent;
            });
            state.PowerCard_Formats = PowerCard_Formats;
        });
    }
};

function getPowerCardStatusList() {
    var PowerCard_FormatStatusList = findObjs({
        _type: "handout",
        name: "PowerCard Status List"
    })[0];
    if (PowerCard_FormatStatusList !== undefined) {
        var PowerCard_StatusList = {};
        var Status;
        var StatusName = "";
        var StatusIcon = "";
        var StatusInfo = "";
        PowerCard_FormatStatusList.get("notes", function(notes) {
            notes = notes.split("<br>");
            notes.forEach(function(notes) {
                Status = notes.split("|");
                if (!_.isEmpty(Status)) {
                    StatusName = Status[0];
                    StatusIcon = Status[1];
                    StatusInfo = Status[2];
                    if (StatusName !== "" && StatusName !== undefined) {
                        PowerCard_StatusList[StatusName] = {
                            "icon": StatusIcon || "",
                            "info": StatusInfo || ""
                        }
                    }
                }
            });
            state.PowerCard_StatusList = PowerCard_StatusList;
        });
    }
};

function getTargetInfo(content, TargetList) {
    // PARSE FOR TARGET INFO REPLACEMENT CHARMS
    var Token = getObj("graphic", TargetList[0]);
    if (Token === undefined) return content;
    var Character = getObj("character", Token.get("represents"));

    // TOKEN CHARMS
    return content.replace(/%%(.*?)%%/g, function(m, charm) {
        var attr;
        switch (charm) {
            case 'token_name':
                return Token.get('name');
            case 'bar1':
            case 'bar2':
            case 'bar3':
                return Token.get(charm + '_value');
            case 'bar1_max':
            case 'bar2_max':
            case 'bar3_max':
                return Token.get(charm);
            default:
                attr = getAttrByName(Character.id, charm);
            return (Character && attr) || 'ERROR';
        }
    });
};
// END FUNCTIONS ///////////////////////////////////////////////////////////////