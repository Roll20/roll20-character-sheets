// Thanks to HoneyBadger for creating the original import script.
// His script was written for importing DDI 4e .monster files
// This script is for using Custom XML Output from Hero Lab
// The Hero Lab plugin for Castles & Crusades was written by BoomerET
// This script was adapted from HoneyBadger's script by BoomerET

// VARIABLE & FUNCTION DECLARATIONS
var AddAttribute = AddAttribute || {};

on("chat:message", function (msg) {
   // Exit if not an api command
   if (msg.type != "api") return;

   // Get the API Chat Command
   msg.who = msg.who.replace(" (GM)", "");
   msg.content = msg.content.replace("(GM) ", "");
   var command = msg.content.split(" ", 1);
   if (command == "!createPC") {
      if (!msg.selected) return;
      var n = msg.content.split(" ", 2);
      var Token = getObj("graphic", n[1])
      if (Token.get("subtype") != "token") return;
      if (Token.get("gmnotes").indexOf("xml") == -1) return;
        
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
      var CharLevel = parseInt(StatBlock.match(/<class name=\'.*\' level=\'(\d+)\'\/>/)[1]);
      var CharClass = StatBlock.match(/<class name=\'(.*)\' level=\'\d*\'\/>/)[1];
      var CharXP = parseInt(StatBlock.match(/<xp total=\'(\d*)\' next=\'\d*\'\/>/)[1]);
      var CharXPnext = parseInt(StatBlock.match(/<xp total=\'\d*\' next=\'(\d*)\'\/>/)[1]);
      var CharRace = StatBlock.match(/<race name=\'(.*)\'\/><class/)[1];
      var CharAlignment = StatBlock.match(/<alignment text=\'(.*)\'\/><size/)[1];
      var CharMovement = parseInt(StatBlock.match(/<charmove.*value=\'(\d*)\'\/><\/pers/)[1]);
      var CharHPwounds = parseInt(StatBlock.match(/<hitpoints total=\'\d+' wounds=\'(\d+)\'/)[1]);
      var CharHP = parseInt(StatBlock.match(/<hitpoints total=\'(\d+)\'/)[1]);
      var CharBtH = parseInt(StatBlock.match(/<bth value=\'(-?\d+?)\'/)[1]);
      var CharHPcurrent = CharHP - CharHPwounds;
      
      AddAttribute("CharacterName", CharacterName, Character.id);
      AddAttribute("Class", CharClass, Character.id);
      AddAttribute("Experience", CharXP, Character.id);
      AddAttribute("NextLevel", CharXPnext, Character.id);
      AddAttribute("Race", CharRace, Character.id);
      AddAttribute("Alignment", CharAlignment, Character.id);
      AddAttribute("Movement", CharMovement, Character.id);
      AddAttribute("HPmax", CharHP, Character.id);
      AddAttribute("HP", CharHPcurrent, Character.id);
      AddAttribute("Level", CharLevel, Character.id);

      var myRegex = /<language name='(.*?)'\/>/g;
      var matchLanguages = getMatches(StatBlock, myRegex, 1);
      var CharLanguages = matchLanguages.join();
      AddAttribute("Languages", CharLanguages, Character.id);
      
      myRegex = /<attribute name='(.*?)' value='(\d+?)' bonus='(-?\d+?)' primary='(\d+?)'/g;
      var matchAttributes = getMatches(StatBlock, myRegex, 1);
      var matchAttrValue = getMatches(StatBlock, myRegex, 2);
      var matchAttrMod = getMatches(StatBlock, myRegex, 3);
      var matchPrimary = getMatches(StatBlock, myRegex, 4);
      for (var i = 0; i < matchAttributes.length; i++) {
         AddAttribute(matchAttributes[i], matchAttrValue[i], Character.id);
         AddAttribute(matchAttributes[i] + "Pri", matchPrimary[i], Character.id);
         AddAttribute(matchAttributes[i] + "Mod", matchAttrMod[i], Character.id);
         if (matchAttributes[i] == "Wisdom") {
            if ((CharClass == "Cleric") || (CharClass == "Paladin")) {
               AddAttribute("TurnUndeadTurned", "d12 + " + matchAttrMod[i], Character.id);
            } else {
               AddAttribute("TurnUndeadTurned", "Not a Cleric/Paladin", Character.id);
               AddAttribute("TurnUndeadCheck", "Not a Cleric/Paladin", Character.id);
            }
         }
      }
      
      myRegex = /<defense name='(.*?)' defense='(-?\d+?)' equipped='(.*?)' type='(.*?)'/g;
      var matchArmorName = getMatches(StatBlock, myRegex, 1);
      var matchArmorValue = getMatches(StatBlock, myRegex, 2);
      var matchArmorEquipped = getMatches(StatBlock, myRegex, 3);
      var matchArmorType = getMatches(StatBlock, myRegex, 4);
      var totalAC = 10;
      for (var j = 0; j < matchArmorName.length; j++) {
         if ((matchArmorEquipped[j] == 'yes') && (matchArmorType[j] == 'armor')) {
            AddAttribute("ArmorAC", matchArmorValue[j], Character.id);
            totalAC += parseInt(matchArmorValue[j]);
            AddAttribute("ArmorWorn", matchArmorName[j], Character.id);
         }
         if ((matchArmorEquipped[j] == 'yes') && (matchArmorType[j] == 'shield')) {
            AddAttribute("ShieldAC", matchArmorValue[j], Character.id);
            totalAC += parseInt(matchArmorValue[j]);
            AddAttribute("ShieldWorn", matchArmorName[j], Character.id);
         }
         if ((matchArmorEquipped[j] == 'yes') && (matchArmorType[j] == 'helm')) {
            AddAttribute("HelmWorn", matchArmorName[j], Character.id);
         }
      }
      AddAttribute("AC", totalAC, Character.id);
      
      //var myRegex = /<attack name=\'(.*?)\' damage=\'/g;
      var myRegex = /<attack name='(.*?)' damage='(.*?)' dambon='(-?\d+?)' hitbon='(-?\d+?)' magicdam='(-?\d+?)' magichit='(-?\d+?)' equipped='(.*?)'.*?<description>(.*?) weapon<\/description>/g;
      //var weapName = getMatches(StatBlock, myRegex, 1);
      //log(weapName.join());
      //log(StatBlock);
      var weapName = getMatches(StatBlock, myRegex, 1);
      var weapDamage = getMatches(StatBlock, myRegex, 2);
      var weapDamBonus = getMatches(StatBlock, myRegex, 3);
      var weapHitBonus = getMatches(StatBlock, myRegex, 4);
      var weapMagicDam = getMatches(StatBlock, myRegex, 5);
      var weapMagicHit = getMatches(StatBlock, myRegex, 6);
      var weapEquipped = getMatches(StatBlock, myRegex, 7);
      var weapType = getMatches(StatBlock, myRegex, 8);
      var weapCounter = 0;
      if (weapName.length > 5) {
         weapCounter = 5;
      } else {
         weapCounter = weapName.length;
      }
      //WeaponName
      //WeaponBth_1
      //WeaponHitMod_1
      //WeaponHitMisc_1
      //WeaponHitMagic_1
      //WeaponHitTotal_1
      //
      //WeaponDmg_1
      //WeaponDmgMod_1
      //WeaponDmgMisc_1
      //WeaponDmgMagic_1
      //WeaponDmgTotal_1
      for (var k = 0; k < weapCounter; k++) {
         AddAttribute("WeaponName_" + (k+1).toString(), weapName[k], Character.id);
         AddAttribute("WeaponDmg_" + (k+1).toString(), weapDamage[k], Character.id);
         AddAttribute("WeaponBth_" + (k+1).toString(), CharBtH, Character.id);
         AddAttribute("WeaponDmgMagic_" + (k+1).toString(), weapMagicDam[k], Character.id);
         AddAttribute("WeaponHitMagic_" + (K+1).toString(), weapMagicHit[k], Character.id);
      }
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

function getMatches(string, regex, index) {
   index || (index = 1);
   var matches = [];
   var match;
   while (match = regex.exec(string)) {
      matches.push(match[index]);
   }
   return matches;
}