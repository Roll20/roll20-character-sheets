// VARIABLE & FUNCTION DECLARATIONS
var AddAttribute = AddAttribute || {};
var AddSkill = AddSkill || {};
var AddPower = AddPower || {};

on("chat:message", function (msg) {
    // Exit if not an api command
    if (msg.type != "api") return;

    // Get the API Chat Command
	msg.who = msg.who.replace(" (GM)", "");
	msg.content = msg.content.replace("(GM) ", "");
	var command = msg.content.split(" ", 1);
    if (command == "!build-character") {
        
    	if (!msg.selected) return;
		var n = msg.content.split(" ", 2);
		var Token = getObj("graphic", n[1])
		if (Token.get("subtype") != "token") return;
		if (Token.get("gmnotes").indexOf("xml") == -1) return;
        
        // USER CONFIGURATION
        var USE_POWER_CARDS = false; // Uses power cards instead of text only macros
        var SHOW_DEFENSES = false;   // Adds monster defenses as token actions
        
        // REPLACE SPECIAL CHARACTERS StatBlock = StatBlock.replace(//g, "");
    	var StatBlock = Token.get("gmnotes");
		    StatBlock = StatBlock.replace(/%20/g, " "); // Replace %20 with a space
		    StatBlock = StatBlock.replace(/%22/g, "'"); // Replace %22 (quotation) with '
		    StatBlock = StatBlock.replace(/%26lt/g, "<"); // Replace %26lt with <
		    StatBlock = StatBlock.replace(/%26gt/g, ">"); // Replace %26gt with >
            StatBlock = StatBlock.replace(/%26amp/g, "&"); // Replace ampersand
		    StatBlock = StatBlock.replace(/%27/g, "'"); // Replace %27 with '
		    StatBlock = StatBlock.replace(/%28/g, "("); // Replace %28 with (
		    StatBlock = StatBlock.replace(/%29/g, ")"); // Replace %29 with )
		    StatBlock = StatBlock.replace(/%2C/g, ","); // Replace %2C with ,
		    StatBlock = StatBlock.replace(/%3A/g, ":"); // Replace %3A with :
		    StatBlock = StatBlock.replace(/%3B/g, ""); // Remove %3B (semi-colon)
		    StatBlock = StatBlock.replace(/%3Cbr/g, ""); // Remove carriage returns
		    StatBlock = StatBlock.replace(/%3D/g, "="); // Replace %3D with =
		    StatBlock = StatBlock.replace(/%3E/g, ""); // Remove %3E (???)
		    StatBlock = StatBlock.replace(/%3F/g, "?"); // Replace %3F with ?
		    StatBlock = StatBlock.replace(/\s{2,}/g, " "); // Replace multiple spaces with one space
		    StatBlock = StatBlock.replace(/%u2019/g, "'"); // Replace %u2019 with '
		// END SPECIAL CHARACTER REPLACEMENT or REMOVAL
        var CharacterName = StatBlock.match(/<character.*name=\'(.*)\' play.*/)[1];
        // CHECK FOR DUPLICATE CHARACTERS
        var CheckSheet = findObjs({
			_type: "character",
			name: CharacterName
		});
        
		// DO NOT CREATE IF SHEET EXISTS
		if (CheckSheet.length > 0) {
			sendChat("ERROR", "This character already exists.");
			return;
		}
        
		// CREATE CHARACTER SHEET & LINK TOKEN TO SHEET
		var Character = createObj("character", {
			avatar: Token.get("imgsrc"),
			name: CharacterName,
			gmnotes: Token.get("gmnotes"),
			archived: false
		});
        
        // GET LEVEL, ROLE, & XP
        var CharLevel = parseInt(StatBlock.match(/<class name=\'.*\' level=\'(\d*)\'\/>/)[1]);
    	var CharClass = StatBlock.match(/<class name=\'(.*)\' level=\'\d*\'\/>/)[1];
		var CharXP = parseInt(StatBlock.match(/<xp total=\'(\d*)\' next=\'\d*\'\/>/)[1]);
      var CharXPnext = parseInt(StatBlock.match(/<xp total=\'\d*\' next=\'(\d*)\'\/>/)[1]);
		AddAttribute("CharacterName", CharacterName, Character.id);
		AddAttribute("Class", CharClass, Character.id);
		AddAttribute("Experience", CharXP, Character.id);
      AddAttribute("NextLevel", CharXPnext, Character.id);
    }
});

function AddAttribute(attr, value, charid) {
    if (attr === "Hit Points") {
		createObj("attribute", {
			name: attr,
			current: value,
			max: value,
			characterid: charid
		});
	} else {
		createObj("attribute", {
			name: attr,
			current: value,
			characterid: charid
		});
	}
	return;
}