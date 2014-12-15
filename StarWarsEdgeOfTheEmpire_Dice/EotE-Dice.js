/*
    Current Version: 2.5
    Last updated: 12.03.2014
    Character Sheet and Script Maintained by: Steve Day
    Current Verion: https://github.com/Roll20/roll20-character-sheets/tree/master/StarWarsEdgeOfTheEmpire_Dice
    Development and Older Verions: https://github.com/dayst/StarWarsEdgeOfTheEmpire_Dice
    
	Credits:
		Original creator: Konrad J.
		Helped with Dice specs: Alicia G. and Blake the Lake
		Dice graphics hosted by Alicia G. at galacticcampaigns.com
		Dice graphics borrowed from the awesome google+ hangouts EotE Dice App
		Character Sheet and Advanced Dice Roller: Steve Day
		Debugger: Arron
		Initiative Roller: Andrew H.
		Opposed Roller: Tom F.
		Skill Description by: Gribble - https://dl.dropboxusercontent.com/u/9077657/SW-EotE-Reference-Sheets.pdf
		Critical Descriptions by: Gribble - https://dl.dropboxusercontent.com/u/9077657/SW-EotE-Reference-Sheets.pdf
	
	API Chat Commands

	Settings:
		Log
			* default: 'on' and 'single'
			* Description: Sets the visual output in the chat window for the dice rolls
			* Command: !eed log on|off|multi|single
		
		Graphics
			* default: 'on' and 'm'
			* Description: Sets chat window dice output as graphic, small, medium, or large if "on" or as text if "off"
			* Command: !eed graphics on|off|s|m|l
		
		Test
			* Description: Output every side of every die to the chat window
			* !eed test
	
	Roll:
		Label
			* default: null
			* Description: set the skill name of the roll
			* Command: !eed label(Name of Skill)
		
		Initiative
			* default: false
			* Description: Set NPC/PC initiative true
			* Command: !eed npcinit or pcinit and #b #g #y #blk #p #r #w
		
		Skill
			* default: 
			* Description: create the ability and proficiency dice for a skill check
			* Command: !eed skill(char_value|skill_value)
		
		Opposed
			* default: 
			* Description: create the difficulty and challenge dice for an opposed skill check
			* Command: !eed opposed(char_value|skill_value)
		
		Dice
			* default: 
			* Description: Loop thru the dice and adds or subtracts them from the dice object
			* Command: !eed #g #y #b #blk #r #p #w #s #a
		
		Upgrade
			* default: 
			* Description: upgrades ability and difficulty dice
			* Command: !eed upgrade(ability|#) or upgrade(difficulty|#)
		
		Downgrade
			* default: 
			* Description: downgrades proficiency and challenge dice
			* Command: !eed downgrade(proficiency|#) or downgrade(challenge|#)

	
*/

    var eote = {}

    eote.init = function() {
        eote.setCharacterDefaults();
        eote.createGMDicePool();
        eote.events();
    }
    
    eote.defaults = {
        globalVars : {
            diceLogChat : true,
            diceGraphicsChat : true,
            diceGraphicsChatSize : 30,//medium size
            diceTextResult : "",
            diceTextResultLog : "",
            diceGraphicResult : "",
            diceGraphicResultLog : "",
            diceTestEnabled : false,
            diceLogRolledOnOneLine : true
        },
        '-DicePoolID' : '',
        character : {
            attributes : [
                /* Don't need to update characterID
                 * 
                 *{
                    name : "characterID",
                    current : "UPDATES TO CURRENT ID",
                    max : "",
                    update : false
                }*/
            ], 
            ablities : [],
        },
        graphics : {
            SIZE : {
                SMALL : 20,
                MEDIUM : 30,
                LARGE : 40
            },
            ABILITY : {
                BLANK : "http://galacticcampaigns.com/images/EotE/Ability/abilityBlank.png",
            	A : "http://galacticcampaigns.com/images/EotE/Ability/abilityA.png",
        		AA : "http://galacticcampaigns.com/images/EotE/Ability/abilityAA.png",
        		S : "http://galacticcampaigns.com/images/EotE/Ability/abilityS.png",
        		SA : "http://galacticcampaigns.com/images/EotE/Ability/abilitySA.png",
        		SS : "http://galacticcampaigns.com/images/EotE/Ability/abilitySS.png"
        	},
        	BOOST : {
        		BLANK : "http://galacticcampaigns.com/images/EotE/Boost/boostBlank.png",
        		A : "http://galacticcampaigns.com/images/EotE/Boost/boostA.png",
        		AA : "http://galacticcampaigns.com/images/EotE/Boost/boostAA.png",
        		S : "http://galacticcampaigns.com/images/EotE/Boost/boostS.png",
        		SA : "http://galacticcampaigns.com/images/EotE/Boost/boostSA.png"
        	},
        	CHALLENGE : {
        		BLANK : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeBlank.png",
        		F : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeF.png",
        		FF : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeFF.png",
        		FT : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeFT.png",
        		T : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeT.png",
        		TT : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeTT.png",
        		DESPAIR : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeDespair.png"
        	},
        	DIFFICULTY : {
        		BLANK : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyBlank.png",
        		F : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyF.png",
        		FF : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyFF.png",
        		FT : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyFT.png",
        		T : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyT.png",
        		TT : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyTT.png"
        	},
        	FORCE : {
        		D : "http://galacticcampaigns.com/images/EotE/Force/ForceD.png",
        		DD : "http://galacticcampaigns.com/images/EotE/Force/ForceDD.png",
        		L : "http://galacticcampaigns.com/images/EotE/Force/ForceL.png",
        		LL : "http://galacticcampaigns.com/images/EotE/Force/ForceLL.png"
        	},
        	PROFICIENCY : {
        		BLANK : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyBlank.png",
        		A : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyA.png",
        		S : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyS.png",
        		SA : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencySA.png",
        		SS : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencySS.png",
        		AA : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyAA.png",
        		TRIUMPH : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyTriumph.png"
        	},
        	SETBACK : {
        		BLANK : "http://galacticcampaigns.com/images/EotE/Setback/SetBackBlank.png",
        		F : "http://galacticcampaigns.com/images/EotE/Setback/SetBackF.png",
        		T : "http://galacticcampaigns.com/images/EotE/Setback/SetBackT.png"
        	},
        	SYMBOLS : {
        		A : "http://galacticcampaigns.com/images/EotE/Symbols/A.png",
        		S : "http://galacticcampaigns.com/images/EotE/Symbols/S.png",
        		T : "http://galacticcampaigns.com/images/EotE/Symbols/T.png",
        		F : "http://galacticcampaigns.com/images/EotE/Symbols/F.png",
        		TRIUMPH : "http://galacticcampaigns.com/images/EotE/Symbols/Triumph.png",
        		DESPAIR: "http://galacticcampaigns.com/images/EotE/Symbols/Despair.png",
        		L : "http://galacticcampaigns.com/images/EotE/Symbols/L.png",
        		D : "http://galacticcampaigns.com/images/EotE/Symbols/D.png"		
        	}
        },
        regex : {
            cmd : /!eed/,
            log : /log (on|multi|single|off)/,
            graphics : /graphics (on|off|s|m|l)/,
            test : /test/,
            resetdice : /(resetgmdice|resetdice)/,
            initiative : /\bnpcinit|\bpcinit/,
            characterID : /characterID\((.*?)\)/,
            rollPlayer : /rollPlayer(\(.*?\))/,
            label : /label\((.*?)\)/,
            skill : /skill\((.*?)\)/g,
			opposed : /opposed\((.*?)\)/g,
            upgrade : /upgrade\((.*?)\)/g,
            downgrade : /downgrade\((.*?)\)/g,
            gmdice : /\(gmdice\)/,
            encum : /encum\((.*?)\)/g,
            dice : /(\d{1,2}blk)\b|(\d{1,2}b)\b|(\d{1,2}g)\b|(\d{1,2}y)\b|(\d{1,2}p)\b|(\d{1,2}r)\b|(\d{1,2}w)\b|(\d{1,2}a)\b|(\d{1,2}s)|(\d{1,2}t)\b|(\d{1,2}f)/g,
        	crit : /crit\((.*?)\)/,
        	critShip : /critship\((.*?)\)/,
        }
    }
    
    eote.createGMDicePool = function() {
        
        var charObj_DicePool = findObjs({ _type: "character", name: "-DicePool" });
        
        eote.defaults['-DicePoolID'] = charObj_DicePool[0].id;
        
        var attrObj_DicePool = [
            {
                name : 'pcgm',
                current : 3,
                max : '',
                update : true
            },
            {
                name : 'gmdicepool',
                current : 2,
                max : '',
                update : true
            }   
        ];
        
        //create character -DicePool
        if (charObj_DicePool.length == 0){
           
            charObj_DicePool = createObj("character", {
                name: "-DicePool",
                bio: "GM Dice Pool"
            });
            
        } 
            
        eote.updateAddAttribute(charObj_DicePool, attrObj_DicePool);
        
    }
    
    eote.createObj = function() {//Create Object Fix - Firebase.set failed
        var obj = createObj.apply(this, arguments);
        var id = obj.id;
        var characterID = obj.get('characterid');
        var type = obj.get('type');
        if (obj && !obj.fbpath && obj.changed) {
            obj.fbpath = obj.changed._fbpath.replace(/([^\/]*\/){4}/, "/");
        } else if (obj && !obj.changed && type == 'attribute') { //fix for dynamic attribute after in character created in game
            obj.fbpath = '/char-attribs/char/'+ characterID +'/'+ id;
            // /char-attribs/char/characterID/attributeID
        }
            
        return obj;
    }
    
    eote.setCharacterDefaults = function(characterObj) {
        
        var charObj = [characterObj];
        
        if (!characterObj) {
            charObj = findObjs({ _type: "character"});
        }
        
        //add/update characterID field
        _.each(charObj, function(charObj){
            
            //updates default attr:CharacterID to current character id
            //_.findWhere(eote.defaults.character.attributes, {'name':'characterID'}).current = charObj.id;
            
            //Attributes
            eote.updateAddAttribute(charObj, eote.defaults.character.attributes);//Update Add Attribute defaults
            
            //Abilities

        });
    }
    
    eote.updateAddAttribute = function(charactersObj, updateAddAttributesObj ) { // charactersObj = object or array objects, updateAddAttributesObj = object or array objects
    
        //check if object or array
        if (!_.isArray(charactersObj)) {
            charactersObj = [charactersObj];
        }
        
        if (!_.isArray(updateAddAttributesObj)) {
            updateAddAttributesObj = [updateAddAttributesObj]; 
        }
       
        _.each(charactersObj, function(characterObj){//loop characters
            
            var characterName = '';
            
            if(characterObj.name) {
                characterName = characterObj.name;
            } else {
                characterName = characterObj.get('name');
            }
            
            //find attribute via character ID
            var characterAttributesObj = findObjs({ _type: "attribute", characterid: characterObj.id});
            
            if (updateAddAttributesObj.length != 0) {
                
                log('UPDATE/ADD ATTRIBUTES FOR:----------------------->'+ characterName);
            
               _.each(updateAddAttributesObj, function(updateAddAttrObj){ //loop attributes to update / add
                    
                    attr = _.find(characterAttributesObj, function(a) {
                        return (a.get('name') === updateAddAttrObj.name);
                    });
    
                    if (attr) {
                       if (updateAddAttrObj.update) {
                            log('Update Attr: '+ updateAddAttrObj.name);
                            attr.set({current: updateAddAttrObj.current});
                            attr.set({max: updateAddAttrObj.max ? updateAddAttrObj.max : ''});
            			}
            		} else {
            		    log('Add Attr: '+ updateAddAttrObj.name);
                        eote.createObj('attribute', {
                			characterid: characterObj.id,
                			name: updateAddAttrObj.name,
                			current: updateAddAttrObj.current,
                			max: updateAddAttrObj.max ? updateAddAttrObj.max : ''
            			});
            		}
                });
            }
        }); 
        
    }
    
    /* DICE PROCESS 
     * 
     * Matches the different regex commands and runs that dice processing step
     * The order of step should not be change or dice could be incorrectly rolled.
     * example: All dice needs to be 'upgraded" before it can be 'downgraded'
     * ---------------------------------------------------------------- */
    
	eote.defaults.dice = function () {
		this.vars = {
				characterName : '',
                characterID : '',
                playerName : '',
                playerID : '',
				label : ''
			}
		this.totals = {
				success : 0,
				failure : 0,
				advantage : 0,
				threat : 0,
				triumph : 0,
				despair : 0,
				light : 0,
				dark : 0
			}
		this.graphicsLog = {
				Boost: '',
				Ability : '',
				Proficiency : '',
				SetBack : '',
				Difficulty : '',
				Challenge : '',
				Force : '',
                Success : '',
                Advantage : '',
                Threat : '',
                Failure : ''
			}
		this.textLog = {
				Boost: '',
				Ability : '',
				Proficiency : '',
				SetBack : '',
				Difficulty : '',
				Challenge : '',
				Force : '',
                Success : '',
                Advantage : '',
                Threat : '',
                Failure : ''
			}
		this.count = {
				boost: 0,
				ability: 0,
				proficiency: 0,
				setback: 0,
				difficulty: 0,
				challenge: 0,
				force: 0,
                success: 0,
                advantage: 0,
                threat: 0,
                failure: 0
			}
	}
	
    eote.process = {}
    
    eote.process.setup = function(cmd, playerName, playerID){
        
        if (!cmd.match(eote.defaults.regex.cmd)) { //check for api cmd !eed
            return false;
    	}
        
        //log(cmd);
        
        /* reset dice - test, might not need this
         * ------------------------------------------------------------- */
        
		var diceObj = new eote.defaults.dice();
            diceObj.vars.playerName = playerName;
            diceObj.vars.playerID = playerID;
            
        /* Dice config
         * Description: Change dice roller default config
         * --------------------------------------------------------------*/
        var logMatch = cmd.match(eote.defaults.regex.log);
        
            if (logMatch) {
                eote.process.log(logMatch);
                return false; //Stop current roll and run test
            }
        
        var graphicsMatch = cmd.match(eote.defaults.regex.graphics);
            
            if (graphicsMatch) {
                eote.process.graphics(graphicsMatch);
                return false; //Stop current roll and run test
            }
        
        var testMatch = cmd.match(eote.defaults.regex.test);
            
            if (testMatch) {
                eote.process.test(testMatch);
                return false; //Stop current roll and run test
            }
            
        /* Roll information
         * Description: Set default dice roll information Character Name and Skill Label
         * --------------------------------------------------------------*/
        
        var rollPlayerMatch = cmd.match(eote.defaults.regex.rollPlayer);
			
			if (rollPlayerMatch) {
                diceObj = eote.process.rollPlayer(rollPlayerMatch, diceObj);
                
                if (!diceObj) {
                    return false;
                }
            }
        
        
        var characterIDMatch = cmd.match(eote.defaults.regex.characterID);
            
            if (characterIDMatch) {
                diceObj = eote.process.characterID(characterIDMatch, diceObj);
                //Once Character ID is parsed, remove it from the cmd.
                //it is possible that the character ID could contain dice values
                //for ex. characterID(-JMBFmYX1i0L259bjb-X)  will add 59 blue dice to the pool
                cmd = cmd.replace(characterIDMatch[0], '');
            }
        
        var labelMatch = cmd.match(eote.defaults.regex.label);
            
            if (labelMatch) {
                diceObj = eote.process.label(labelMatch, diceObj);
            }
        
        /* Dice rolls 
         * Description: Create dice pool before running any custom roll
         * script commands that may need dice evaluated.
         * --------------------------------------------------------------*/
        var gmdiceMatch = cmd.match(eote.defaults.regex.gmdice);
            
            if (gmdiceMatch) {
                cmd = eote.process.gmdice(cmd); // update the cmd string to contain the gmdice
            }
            
        var encumMatch = cmd.match(eote.defaults.regex.encum);
        
            if (encumMatch) {
                diceObj = eote.process.encum(encumMatch, diceObj);
            }
        
        var skillMatch = cmd.match(eote.defaults.regex.skill);
        
            if (skillMatch) {
                diceObj = eote.process.skill(skillMatch, diceObj);
            }
        
		var opposedMatch = cmd.match(eote.defaults.regex.opposed);
			
			if (opposedMatch) {
				diceObj = eote.process.opposed(opposedMatch, diceObj);
			}

        var diceMatch = cmd.match(eote.defaults.regex.dice);
            
            if (diceMatch) {
                diceObj = eote.process.setDice(diceMatch, diceObj);
            }
        
        var upgradeMatch = cmd.match(eote.defaults.regex.upgrade);
        
            if (upgradeMatch) {
                diceObj = eote.process.upgrade(upgradeMatch, diceObj);
            }
            
        var downgradeMatch = cmd.match(eote.defaults.regex.downgrade);
        
            if (downgradeMatch) {
                diceObj = eote.process.downgrade(downgradeMatch, diceObj);
            }
        
        /* Roll dice and update success / fail 
         * ------------------------------------------------------------- */
        diceObj = eote.process.rollDice(diceObj);
        
        /* Custom rolls
         * Description: Custom dice components have thier own message, results and
         * often will return false to not allow proceeding scripts to fire
         * --------------------------------------------------------------*/
        var resetdiceMatch = cmd.match(eote.defaults.regex.resetdice);
        
            if (resetdiceMatch) {
                eote.process.resetdice(resetdiceMatch, diceObj);
                return false;
            }
        
        var initiativeMatch = cmd.match(eote.defaults.regex.initiative);
        
            if (initiativeMatch) {
                eote.process.initiative(initiativeMatch, diceObj);
                //return false;
            }
        
        var critMatch = cmd.match(eote.defaults.regex.crit);
        
            if (critMatch) {
                eote.process.crit(critMatch, diceObj);
                return false;
            }
        
        var critShipMatch = cmd.match(eote.defaults.regex.critShip);
        
            if (critShipMatch) {
                eote.process.critShip(critShipMatch, diceObj);
                return false;
            }
        
        /* Display dice output in chat window 
         * ------------------------------------------------------------- */
        eote.process.diceOutput(diceObj, playerName, playerID);
    
    }
    
    /* DICE PROCESS FUNCTION
     * 
     * ---------------------------------------------------------------- */
	
    eote.process.log = function(cmd){
        
        /* Log
         * default: 'on' and 'single'
         * Description: Sets the visual output in the chat window for the dice rolls
         * Command: !eed log on|off|multi|single
         * ---------------------------------------------------------------- */
        
        //log(cmd[1]);
        
        switch(cmd[1]) {
    	    case "on": //if 'on' outputs dice to chat window
				eote.defaults.globalVars.diceLogChat = true;
                sendChat("Dice Sytem", 'Output rolled dice to chat window "On"');
				break;
			case "off": //if 'off' outputs only results to chat window
				eote.defaults.globalVars.diceLogChat = false;
                sendChat("Dice Sytem", 'Output rolled dice to chat window "Off"');
				break;
			case "multi": //if 'multi' multiple sets dice per line
				eote.defaults.globalVars.diceLogRolledOnOneLine = false;
                sendChat("Dice Sytem", 'Mulitple line output "Off"');
				break;
			case "single": //if 'single' single set of dice per line
				eote.defaults.globalVars.diceLogRolledOnOneLine = true;
                sendChat("Dice Sytem", 'Mulitple line output "On"');
				break;
		}
    }
    
    eote.process.graphics = function(cmd){
        
        /* Graphics
         * default: 'on' and 'm'
         * Description: Sets chat window dice output as graphic, small, medium, or large if "on" or as text if "off"
         * Command: !eed graphics on|off|s|m|l
         * ---------------------------------------------------------------- */

        //log(cmd[1]);
        
        switch(cmd[1]) {
    		case "on":
				eote.defaults.globalVars.diceGraphicsChat = true;
                sendChat("Dice Sytem", 'Chat graphics "On"');
				break;
			case "off":
				eote.defaults.globalVars.diceGraphicsChat = false;
                sendChat("Dice Sytem", 'Chat graphics "Off"');
				break;
			case "s":
				eote.defaults.globalVars.diceGraphicsChatSize = eote.defaults.graphics.SIZE.SMALL;
                sendChat("Dice Sytem", 'Chat graphics size "Small"');
				break;
			case "m":
				eote.defaults.globalVars.diceGraphicsChatSize = eote.defaults.graphics.SIZE.MEDIUM;
                sendChat("Dice Sytem", 'Chat graphics size "Medium"');
				break;
			case "l":
				eote.defaults.globalVars.diceGraphicsChatSize = eote.defaults.graphics.SIZE.LARGE;
                sendChat("Dice Sytem", 'Chat graphics size "Large"');
				break;
		}

    }
    
    eote.process.test = function(cmd){
        
        //log(cnd)
        
		//Set test vars to true
        eote.defaults.globalVars.diceTestEnabled    = true;
    	tmpLogChat                                  = eote.defaults.globalVars.diceLogChat;
		tmpGraphicsChat                             = eote.defaults.globalVars.diceGraphicsChat;
		eote.defaults.globalVars.diceLogChat        = true;
		eote.defaults.globalVars.diceGraphicsChat   = true;
		
		//Roll dice
        eote.process.setup('!eed 1b 1g 1y 1blk 1p 1r 1w', 'GM', 'Dice Test');
		
        //After test reset vars back
        eote.defaults.globalVars.diceTestEnabled    = false;
        eote.defaults.globalVars.diceLogChat        = tmpLogChat;
		eote.defaults.globalVars.diceGraphicsChat   = tmpGraphicsChat;
        
    }
    
    eote.process.rollPlayer = function(cmd, diceObj){
		//Build cmd string
		//get characterID
		//get skills
		//get encum
		//remove rollPlayer(xxxx) from string
		var match = {
    	    skill : /skill:(.*?)[\|\)]/,
            encum : /encum/,
            character : /character:(.*?)[\|\)]/,
		}
        
        var charcterMatch = cmd[1].match(match.character);
        
        if (charcterMatch) {
            
            var charObj = findObjs({ _type: "character", name: charcterMatch[1] });
            
            if (charObj.length > 0){
            
                diceObj.vars.characterName = charObj[0].get('name');
                diceObj.vars.characterID = charObj[0].id;

            } else {
                sendChat("Alert", "Can't find character. Please update character name field to match sheet character name and try again.");
                return false;
            }
        } else {
            sendChat("Alert", "Please update character name field.");
            return false;
        }
        
        var encumMatch = cmd[1].match(match.encum);
        
        if (encumMatch) {
            //encumbrance
            var attr_1 = getAttrByName(diceObj.vars.characterID, 'encumbrance', 'max');
            var attr_2 = getAttrByName(diceObj.vars.characterID, 'encumbrance');
            var cmdEncum = ['encum('+attr_1+'|'+attr_2+')']; //["encum(3|5)"]

            diceObj = eote.process.encum(cmdEncum, diceObj);
          
        }
        
        var skillMatch = cmd[1].match(match.skill);
        
        if (skillMatch) {
            
            var attrArray = skillMatch[1].split(',')
            var attr_1 = getAttrByName(diceObj.vars.characterID, attrArray[0]);
            var attr_2 = getAttrByName(diceObj.vars.characterID, attrArray[1]);
            var cmdSkill = ['skill('+attr_1+'|'+attr_2+')']; //['skill(0|2)']
            
            diceObj = eote.process.skill(cmdSkill, diceObj);
        }

        return diceObj;
		
	}
    
    eote.process.characterID = function(cmd, diceObj){
        
        /* CharacterId
         * default: null
         * Description: looks up the characters name based on character ID
         * Command: !eed characterID(##########)
         * ---------------------------------------------------------------- */
        
        //log(cmd);
        
        var characterID = cmd[1];
        
        if (characterID) {

            diceObj.vars.characterName = getObj("character", characterID).get('name');
            diceObj.vars.characterID = characterID;
            
        } 
        
		return diceObj;

    }
    
    eote.process.label = function(cmd, diceObj){

        /* Label
         * default: null
         * Description: set the skill name of the roll
         * Command: !eed label(Name of Skill)
         * ---------------------------------------------------------------- */
        //log(cmd);

        var label = cmd[1];
        
        if (label) {
            
            var labelStr = '';
            var labelArray = label.split('|');
            
            _.each(labelArray, function(labelVal){
                var labelArray = labelVal.split(':');
                var label = labelArray[0];
                var message = labelArray[1];
                
                labelStr = labelStr + '<b>' + label + ':</b> ' + message + '<br>';
            });
            
            diceObj.vars.label = labelStr;
        } 
        
		return diceObj;

    }
    
    eote.process.resetdice = function(cmd, diceObj){
        
        var characterObj = [{name: diceObj.vars.characterName, id: diceObj.vars.characterID}];
        
        //log(cmd);
        
        if (cmd[1] == 'resetdice') {
            var resetdice = [
                {
                    name : "b",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "g",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "y",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "blk",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "r",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "p",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "w",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "upgradeAbility",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "downgradeProficiency",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "upgradeDifficulty",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "downgradeChallenge",
                    current : 0,
                    max : "",
                    update : true
                }
            ]
        }
        
        if (cmd[1] == 'resetgmdice') {
            var resetdice = [
                {
                    name : "bgm",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "ggm",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "ygm",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "blkgm",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "rgm",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "pgm",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "wgm",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "upgradeAbilitygm",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "downgradeProficiencygm",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "upgradeDifficultygm",
                    current : 0,
                    max : "",
                    update : true
                },
                {
                    name : "downgradeChallengegm",
                    current : 0,
                    max : "",
                    update : true
                }
            ]
        }
        
        eote.updateAddAttribute(characterObj, resetdice);
        
    }
    
    eote.process.initiative = function(cmd, diceObj){
        
        /* initiative
         * default: false
         * Description: Set NPC/PC initiative true
         * Command: !eed npcinit or pcinit
         * ---------------------------------------------------------------- */
        
        var type = '';
        var NumSuccess = diceObj.totals.success;
        var NumAdvantage = diceObj.totals.advantage;
        var turnorder;
        
        //log(diceObj);
        //log(NumSuccess);
        //log(NumAdvantage);
        
        if(Campaign().get("turnorder") == "") turnorder = []; //NOTE: We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
        else turnorder = JSON.parse(Campaign().get("turnorder"));
        
        if (cmd[0] == 'pcinit') {
            type = 'PC';
        }
        
        if (cmd[0] == 'npcinit') {
            type = 'NPC';
        }
        
        //Add a new custom entry to the end of the turn order.
        turnorder.push({
            id: "-1",
            pr: NumSuccess + ":" + NumAdvantage,
            custom: type
        });
        
        turnorder.sort(function(x,y) {
            var a = x.pr.split(":");
            var b = y.pr.split(":");
            
            
            if (b[0] - a[0] != 0) {//First rank on successes
                return b[0] - a[0];
            } else if (b[1] - a[1] != 0) {//Then rank on Advantage
                return b[1] - a[1];
            } else { //If they are still tied, PC goes first
                
                if (x.custom == y.custom) {
                    return 0;
                } else if (x.custom =="NPC") {
                    return 1;
                } else {
                    return -1;
                }
            }
        });
        
        Campaign().set("turnorder", JSON.stringify(turnorder));
        
        //sendChat(diceObj.vars.characterName, 'Rolls initiative');
        
    }
    
    eote.process.crit = function(cmd, diceObj){
        
		/* Crit
         * default: 
         * Description: Rolls critical injury table
         * Command: !eed crit(roll) crit(roll|#) crit(heal|#)
         * ---------------------------------------------------------------- */
		
        //log(cmd);
        
        var characterObj = [{name: diceObj.vars.characterName, id: diceObj.vars.characterID}];
        var critTable = [
            {
        		percent : '1 to 5',
        		severity : 1,
        		name : 'Minor Nick',
        		Result : 'Suffer 1 strain.',
        		effect : '',
        	},
        	{
        		percent : '6 to 10',
        		severity : 1,
        		name : 'Slowed Down',
        		Result : 'May only act during last allied Initiative slot on next turn.',
        		effect : '',
        	},
        	{
        		percent : '11 to 15',
        		severity : 1,
        		name : 'Sudden Jolt',
        		Result : 'May only act during last hero Initiative slot on next turn.',
        		effect : '',
        	},
        	{
        		percent : '16 to 20',
        		severity : 1,
        		name : 'Distracted',
        		Result : 'Cannot perform free maneuver on next turn.',
        		effect : '',
        	},
        	{
        		percent : '21 to 25',
        		severity : 1,
        		name : 'Off-Balance',
        		Result : 'Add 1 Setback die to next skill check.',
        		effect : '',
        	},
        	{
        		percent : '26 to 30',
        		severity : 1,
        		name : 'Discouraging Wound',
        		Result : 'Flip one light destiny to dark.',
        		effect : '',
        	},
        	{
        		percent : '31 to 35',
        		severity : 1,
        		name : 'Stunned',
        		Result : 'Staggered, cannot perform action on next turn.',
        		effect : '',
        	},
        	{
        		percent : '36 to 40',
        		severity : 1,
        		name : 'Stinger',
        		Result : 'Increase difficulty of next check by 1 Difficulty die.',
        		effect : '',
        	},
        	//----------------------------- Severity 2
        	{
        		percent : '41 to 45',
        		severity : 2,
        		name : 'Bowled Over',
        		Result : 'Knocked prone and suffer 1 strain.',
        		effect : '',
        	},
        	{
        		percent : '46 to 50',
        		severity : 2,
        		name : 'Head Ringer',
        		Result : 'Increase difficulty of all Intellect and Cunning checks by 1 Difficulty die until end of encounter.',
        		effect : '',
        	},
        	{
        		percent : '51 to 55',
        		severity : 2,
        		name : 'Fearsome Wound',
        		Result : 'Increase difficulty of all Presence and Willpower checks by 1 Difficulty die until end of encounter.',
        		effect : '',
        	},
        	{
        		percent : '56 to 60',
        		severity : 2,
        		name : 'Agonizing Wound',
        		Result : 'Increase difficulty of all Brawn and Agility checks by 1 Difficulty die until end of encounter.',
        		effect : '',
        	},
        	{
        		percent : '61 to 65',
        		severity : 2,
        		name : 'Slightly Dazed',
        		Result : 'Add 1 Setback die to all skill checks until end of encounter.',
        		effect : '',
        	},
        	{
        		percent : '66 to 70',
        		severity : 2,
        		name : 'Scattered Senses',
        		Result : 'Remove all Boost dice from all skill checks until end of encounter.',
        		effect : '',
        	},
        	{
        		percent : '71 to 75',
        		severity : 2,
        		name : 'Hamstrung',
        		Result : 'Lose free maneuver until end of encounter.',
        		effect : '',
        	},
        	{
        		percent : '76 to 80',
        		severity : 2,
        		name : 'Staggered',
        		Result : 'Attacker may immediately attempt another free attack against you using same dice pool as original attack.',
        		effect : '',
        	},
        	{
        		percent : '81 to 85',
        		severity : 2,
        		name : 'Winded',
        		Result : 'Cannot voluntarily suffer strain to activate abilities or gain additional maneuvers until end of encounter.',
        		effect : '',
        	},
        	{
        		percent : '86 to 90',
        		severity : 2,
        		name : 'Compromised',
        		Result : 'Increase difficulty of all skill checks by 1 Difficulty die until end of encounter.',
        		effect : '',
        	},
        	//---------------------------------------- Severity 3
        	{
        		percent : '91 to 95',
        		severity : 3,
        		name : 'At the Brink',
        		Result : 'Suffer 1 strain each time you perform an action.',
        		effect : '',
        	},
        	{
        		percent : '96 to 100',
        		severity : 3,
        		name : 'Crippled',
        		Result : 'Limb crippled until healed or replaced. Increase difficulty of all checks that use that limb by 1 Difficulty die.',
        		effect : '',
        	},
        	{
        		percent : '101 to 105',
        		severity : 3,
        		name : 'Maimed',
        		Result : 'Limb permanently lost. Unless you have a cybernetic replacement, cannot perform actions that use that limb. Add 1 Setback to all other actions.',
        		effect : '',
        	},
        	{
        		percent : '106 to 110',
        		severity : 3,
        		name : 'Horrific Injury',
        		Result : 'Roll 1d10 to determine one wounded characteristic -- roll results(1-3 = Brawn, 4-6 = Agility, 7 = Intellect, 8 = Cunning, 9 = Presence, 10 = Willpower. Until Healed, treat characteristic as one point lower.',
        		effect : '',
        	},
        	{
        		percent : '111 to 115',
        		severity : 3,
        		name : 'Temporarily Lame',
        		Result : 'Until healed, may not perform more than one maneuver each turn.',
        		effect : '',
        	},
        	{
        		percent : '116 to 120',
        		severity : 3,
        		name : 'Blinded',
        		Result : 'Can no longer see. Upgrade the difficulty of Perception and Vigilance checks three times, and all other checks twice.',
        		effect : '',
        	},
        	{
        		percent : '121 to 125',
        		severity : 3,
        		name : 'Knocked Senseless',
        		Result : 'You can no longer upgrade dice for checks.',
        		effect : '',
        	},
        	//---------------------------------------- Severity 4
        	{
        		percent : '126 to 130',
        		severity : 4,
        		name : 'Gruesome Injury',
        		Result : 'Roll 1d10 to determine one wounded characteristic -- roll results(1-3 = Brawn, 4-6 = Agility, 7 = Intellect, 8 = Cunning, 9 = Presence, 10 = Willpower. Characteristic is permanently one point lower.',
        		effect : '',
        	},
        	{
        		percent : '131 to 140',
        		severity : 4,
        		name : 'Bleeding Out',
        		Result : 'Suffer 1 wound and 1 strain every round at the beginning of turn. For every 5 wounds suffered beyond wound threshold, suffer one additional Critical Injury (ignore the details for any result below this result).',
        		effect : '',
        	},
        	{
        		percent : '141 to 150',
        		severity : 4,
        		name : 'The End is Nigh',
        		Result : 'Die after the last Initiative slot during the next round.',
        		effect : '',
        	},
        	{
        		percent : '151',
        		severity : 4,
        		name : 'Dead',
        		Result : 'Complete, absolute death.',
        		effect : '',
        	}
        ];
        
        var critRoll = function(addCritNum) {
            
            var openSlot = false;
            var diceRoll = '';
            var critMod = '';
    		var rollTotal = '';
            var rollOffset = parseInt(getAttrByName(diceObj.vars.characterID, 'critAddOffset'));
                rollOffset = rollOffset ? rollOffset : 0;
            var totalcrits = 0;
            
            //check open critical spot
            for (i = 15; i >= 1; i--) { 
                
                var slot = getAttrByName(diceObj.vars.characterID, 'critOn'+i);
                
                if (slot == '0' ||  slot == '') {
                    openSlot = i;
                } else {
                    totalcrits = totalcrits + 1;
                }
            } 
            
            if (!openSlot) {
                sendChat("Alert", "Why are you not dead!");
        	    return false;
            }
            
    		//roll random
    		if (!addCritNum) {
    			diceRoll = randomInteger(100);
    			critMod = (totalcrits * 10);
    			rollTotal = diceRoll + critMod + rollOffset;
    		} else {
    			rollTotal = parseInt(addCritNum);
    		}
            
            //find crit in crital table
        	for (var key in critTable)  {
    			
                var percent = critTable[key].percent.split(' to ');
    			var low = parseInt(percent[0]);
    			var high = percent[1] ? parseInt(percent[1]) : 1000;
    			
    			if ((rollTotal >= low) && (rollTotal <= high)) {
    				
                    critAttrs = [
                        {
                            name : 'critName'+ openSlot,
                            current : critTable[key].name,
                            max : '',
                            update : true
                        },
                        {
                            name : 'critSeverity'+ openSlot,
                            current : critTable[key].severity,
                            max : '',
                            update : true
                        },
                        {
                            name : 'critRange'+ openSlot,
                            current : critTable[key].percent,
                            max : '',
                            update : true
                        },
                        {
                            name : 'critSummary'+ openSlot,
                            current : critTable[key].Result,
                            max : '',
                            update : true
                        },
                        {
                            name : 'critOn'+ openSlot,
                            current : openSlot,
                            max : '',
                            update : true
                        }
                    ];
                    
                    eote.updateAddAttribute(characterObj, critAttrs);

                    var chat = '/direct <br><b>Rolls Critical Injury</b><br>';
                        chat = chat + '<img src="http://i.imgur.com/z51hRwd.png" /><br/>'
                        chat = chat + 'Current Criticals: (' + totalcrits + ' x 10)<br>';
                        if (rollOffset) {
                            chat = chat + 'Dice Roll Offset: ' + rollOffset + '<br>';
                        }
                        chat = chat + 'Dice Roll: ' + diceRoll + '<br>';
                        chat = chat + 'Total: ' + rollTotal + '<br>';
                        chat = chat + '<br>';
                        chat = chat + '<b>' + critTable[key].name + '</b><br>';
                        chat = chat +  critTable[key].Result + '<br>';
                    
                    sendChat(diceObj.vars.characterName,  chat);
                   
    			}
    		} 
        }
        
        var critHeal = function(critID) {
    	    
    		critAttrs = [
                {
                    name : 'critName'+ critID,
                    current : '',
                    max : '',
                    update : true
                },
                {
                    name : 'critSeverity'+ critID,
                    current : '',
                    max : '',
                    update : true
                },
                {
                    name : 'critRange'+ critID,
                    current : '',
                    max : '',
                    update : true
                },
                {
                    name : 'critSummary'+ critID,
                    current : '',
                    max : '',
                    update : true
                },
                {
                    name : 'critOn'+ critID,
                    current : 0,
                    max : '',
                    update : true
                }
            ];
    		
            eote.updateAddAttribute(characterObj, critAttrs);
            
    	}
        
        
        var critArray = cmd[1].split('|');
        var prop1 = critArray[0];
		var prop2 = critArray[1] ? critArray[1] : null;
		
		if (prop1 == 'heal') {
			critHeal(prop2);
		} else if (prop1 == 'add') {
			critRoll(prop2);
		} else { // crit(roll)
            critRoll();
		}
        
    }
    
    eote.process.critShip = function(cmd, diceObj){
        
		/* CritShip
         * default: 
         * Description: Rolls vehicle critical table, Both crit() and critShip() function the same
         * Command: !eed critShip(roll) critShip(roll|#) critShip(heal|#)
         * ---------------------------------------------------------------- */
		
        var characterObj = [{name: diceObj.vars.characterName, id: diceObj.vars.characterID}];
        
        var critTable = [
            {
        		percent : '1 to 9',
        		severity : 1,
        		name : 'Mechanical Stress',
        		Result : 'Ship or vehicle suffers 1 system strain.',
        		effect : '',
        	},
        	{
        		percent : '10 to 18',
        		severity : 1,
        		name : 'Jostled',
        		Result : 'All crew members suffer 1 strain.',
        		effect : '',
        	},
        	{
        		percent : '19 to 27',
        		severity : 1,
        		name : 'Losing Power to Shields',
        		Result : 'Decrease defense in affected defense zone by 1 until repaired. If ship or vehicle has no defense, suffer 1 system strain.',
        		effect : '',
        	},
        	{
        		percent : '28 to 36',
        		severity : 1,
        		name : 'Knocked Off Course',
        		Result : 'On next turn, pilot cannot execute any maneuvers. Instead, must make a Piloting check to regain bearings and resume course. Difficulty depends on current speed.',
        		effect : '',
        	},
        	{
        		percent : '37 to 45',
        		severity : 1,
        		name : 'Tailspin',
        		Result : 'All firing from ship or vehicle suffers 2 setback dice until end of pilot\'s next turn.',
        		effect : '',
        	},
        	{
        		percent : '46 to 54',
        		severity : 1,
        		name : 'Component Hit',
        		Result : 'One component of the attacker\'s choice is knocked offline, and is rendered inoperable until the end of the following round. See page 245 CRB for Small/Large Vehicle and Ship Component tables. ',
        		effect : '',
        	},
        	// --------------- severity : 2
        	{
        		percent : '55 to 63',
        		severity : 2,
        		name : 'Shields Failing',
        		Result : 'Decrease defense in all defense zones by 1 until repaired. If ship or vehicle has no defense, suffer 2 system strain.',
        		effect : '',
        	},
        	{
        		percent : '64 to 72',
        		severity : 2,
        		name : 'Hyperdrive or Navicomputer Failure',
        		Result : 'Cannot make any jump to hyperspace until repaired. If ship or vehicle has no hyperdrive, navigation systems fail leaving it unable to tell where it is or is going.',
        		effect : '',
        	},
        	{
        		percent : '73 to 81',
        		severity : 2,
        		name : 'Power Fluctuations',
        		Result : 'Pilot cannot voluntarily inflict system strain on the ship until repaired.',
        		effect : '',
        	},
        	// --------------- severity : 3
        	{
        		percent : '82 to 90',
        		severity : 3,
        		name : 'Shields Down',
        		Result : 'Decrease defense in affected defense zone to 0 and all other defense zones by 1 point until repaired. If ship or vehicle has no defense, suffer 4 system strain.',
        		effect : '',
        	},
        	{
        		percent : '91 to 99',
        		severity : 3,
        		name : 'Engine Damaged',
        		Result : 'Ship or vehicle\'s maximum speed reduced by 1, to a minimum of 1, until repaired.',
        		effect : '',
        	},
        	{
        		percent : '100 to 108',
        		severity : 3,
        		name : 'Shield Overload',
        		Result : 'Decrease defense in all defense zones to 0 until repaired. In addition, suffer 2 system strain. Cannot be repaired until end of encounter. If ship or vehicle has no defense, reduce armor by 1 until repaired.',
        		effect : '',
        	},
        	{
        		percent : '109 to 117',
        		severity : 3,
        		name : 'Engines Down',
        		Result : 'Ship or vehicle\'s maximum speed reduced to 0. In addition, ship or vehicle cannot execute maneuvers until repaired. Ship continues on course at current speed and cannot be stopped or course changed until repaired.',
        		effect : '',
        	},
        	{
        		percent : '118 to 126',
        		severity : 3,
        		name : 'Major System Failure',
        		Result : 'One component of the attacker\'s choice is heavily damages, and is inoperable until the critical hit is repaired. See page 245 CRB for Small/Large Vehicle and Ship Component tables. ',
        		effect : '',
        	},
        	// --------------- severity : 4
        	{
        		percent : '127 to 133',
        		severity : 4,
        		name : 'Major Hull Breach',
        		Result : 'Ships and vehicles of silhouette 4 and smaller depressurize in a number of rounds equal to silhouette. Ships of silhouette 5 and larger don\'t completely depressurize, but parts do (specifics at GM discretion). Ships and vehicles operating in atmosphere instead suffer a Destabilized Critical.',
        		effect : '',
        	},
        	{
        		percent : '134 to 138',
        		severity : 4,
        		name : 'Destabilised',
        		Result : 'Reduce ship or vehicle\'s hull integrity threshold and system strain threshold to half original values until repaired.',
        		effect : '',
        	},
        	{
        		percent : '139 to 144',
        		severity : 4,
        		name : 'Fire!',
        		Result : 'Fire rages through ship or vehicle and it immediately takes 2 system strain. Fire can be extinguished with appropriate skill, Vigilance or Cool checks at GM\'s discretion. Takes one round per two silhouette to put out.',
        		effect : '',
        	},
        	{
        		percent : '145 to 153',
        		severity : 4,
        		name : 'Breaking Up',
        		Result : 'At the end of next round, ship is completely destroyed. Anyone aboard has one round to reach escape pod or bail out before they are lost.',
        		effect : '',
        	},
        	{
        		percent : '154+',
        		severity : 4,
        		name : 'Vaporized',
        		Result : 'The ship or Vehicle is completely destroyed.',
        		effect : '',
        	}
        ];

        var critRoll = function(addCritNum) {
            
            var openSlot = false;
            var diceRoll = '';
            var critMod = '';
        	var rollTotal = '';
            var rollOffset = parseInt(getAttrByName(diceObj.vars.characterID, 'critShipAddOffset'));
                rollOffset = rollOffset ? rollOffset : 0;
            var totalcrits = 0;
            
            //check open critical spot
            for (i = 15; i >= 1; i--) { 
                
                var slot = getAttrByName(diceObj.vars.characterID, 'critShipOn'+i);
                
                if (slot == '0' ||  slot == '') {
                    openSlot = i;
                } else {
                    totalcrits = totalcrits + 1;
                }
            } 
            
            if (!openSlot) {
                sendChat("Alert", "Why are you not dead!");
        	    return false;
            }
           
    		//roll random
    		if (!addCritNum) {
    			diceRoll = randomInteger(100);
    			critMod = (totalcrits * 10);
    			rollTotal = diceRoll + critMod + rollOffset;
    		} else {
    			rollTotal = parseInt(addCritNum);
    		}
            
            //find crit in crital table
        	for (var key in critTable)  {
    			
                var percent = critTable[key].percent.split(' to ');
    			var low = parseInt(percent[0]);
    			var high = percent[1] ? parseInt(percent[1]) : 1000;
    			
    			if ((rollTotal >= low) && (rollTotal <= high)) {
    				
                    critAttrs = [
                        {
                            name : 'critShipName'+ openSlot,
                            current : critTable[key].name,
                            max : '',
                            update : true
                        },
                        {
                            name : 'critShipSeverity'+ openSlot,
                            current : critTable[key].severity,
                            max : '',
                            update : true
                        },
                        {
                            name : 'critShipRange'+ openSlot,
                            current : critTable[key].percent,
                            max : '',
                            update : true
                        },
                        {
                            name : 'critShipSummary'+ openSlot,
                            current : critTable[key].Result,
                            max : '',
                            update : true
                        },
                        {
                            name : 'critShipOn'+ openSlot,
                            current : openSlot,
                            max : '',
                            update : true
                        }
                    ];
                    
                    eote.updateAddAttribute(characterObj, critAttrs);

                    var chat = '/direct <br><b>Rolls Vehicle Critical</b><br>';
                        chat = chat + '<img src="http://i.imgur.com/JO3pOr8.png" /><br>';//need new graphic
                        chat = chat + 'Current Criticals: (' + totalcrits + ' x 10)<br>';
                        if (rollOffset) {
                            chat = chat + 'Dice Roll Offset: ' + rollOffset + '<br>';
                        }
                        chat = chat + 'Dice Roll: ' + diceRoll + '<br>';
                        chat = chat + 'Total: ' + rollTotal + '<br>';
                        chat = chat + '<br>';
                        chat = chat + '<b>' + critTable[key].name + '</b><br>';
                        chat = chat +  critTable[key].Result + '<br>';
                    
                    sendChat(diceObj.vars.characterName,  chat);
                   
    			}
    		} 
            
        }
        
        var critHeal = function(critID) {
    	    
    		critAttrs = [
                {
                    name : 'critShipName'+ critID,
                    current : '',
                    max : '',
                    update : true
                },
                {
                    name : 'critShipSeverity'+ critID,
                    current : '',
                    max : '',
                    update : true
                },
                {
                    name : 'critShipRange'+ critID,
                    current : '',
                    max : '',
                    update : true
                },
                {
                    name : 'critShipSummary'+ critID,
                    current : '',
                    max : '',
                    update : true
                },
                {
                    name : 'critShipOn'+ critID,
                    current : 0,
                    max : '',
                    update : true
                }
            ];
    		
            eote.updateAddAttribute(characterObj, critAttrs);
            
    	}
        
        var critArray = cmd[1].split('|');
        var prop1 = critArray[0];
		var prop2 = critArray[1] ? critArray[1] : null;
		
		if (prop1 == 'heal') {
			critHeal(prop2);
		} else if (prop1 == 'add') {
			critRoll(prop2);
		} else { // crit(roll)
            critRoll();
		}
       
    }
    
    eote.process.gmdice = function(cmd) {
        
        /* gmdice
         * default: 
         * Description: Update CMD string to include -DicePool dice
         * Command: (gmdice)
         * ---------------------------------------------------------------- */

        //var charObj = findObjs({ _type: "character", name: "-DicePool" });
        var charID = eote.defaults['-DicePoolID'];//charObj[0].id;
        
        var g   = getAttrByName(charID, 'ggm');
        var y   = getAttrByName(charID, 'ygm');
        var p   = getAttrByName(charID, 'pgm');
        var r   = getAttrByName(charID, 'rgm');
        var b   = getAttrByName(charID, 'bgm');
        var blk = getAttrByName(charID, 'blkgm');
        var w   = getAttrByName(charID, 'wgm');
        var upAbility       = getAttrByName(charID, 'upgradeAbilitygm');
        var upDifficulty    = getAttrByName(charID, 'upgradeDifficultygm');
        var downProficiency = getAttrByName(charID, 'downgradeProficiencygm');
        var downChallenge   = getAttrByName(charID, 'downgradeChallengegm');
       
        var gmdiceCMD = g+'g '+y+'y '+p+'p '+r+'r '+b+'b '+blk+'blk '+w+'w upgrade(ability|'+upAbility+') downgrade(proficiency|'+downProficiency+') upgrade(difficulty|'+upDifficulty+') downgrade(challenge|'+downChallenge+')';
       
        //log(charID);
       
        cmd = cmd.replace('(gmdice)', gmdiceCMD);
        
        //log(cmd);
        
        return cmd;
    }
    
    eote.process.encum = function(cmd, diceObj){
        
        /* Encumberment
         * default: 
         * Description: If the current encum is great than threshold add 1 setback per unit over current encum
         * Command: !eed encum(encum_current|encum_threshold)
         * ---------------------------------------------------------------- */
        
        //log(cmd);

        _.each(cmd, function(encum) {
            
            var diceArray = encum.match(/\((.*?)\|(.*?)\)/);
            
            if (diceArray && diceArray[1] && diceArray[2]) {
                
                var num1 = eote.process.math(diceArray[1]);
                var num2 = eote.process.math(diceArray[2]);
                var setbackDice = diceObj.count.setback;
                
                if (num2 > num1) {
                    diceObj.count.setback = setbackDice + (num2 - num1);
                }
            }
        });
		
		return diceObj;

    }
    
    eote.process.skill = function(cmd, diceObj){
        
        /* Skill
         * default: 
         * Description: create the ability and proficiency dice for a skill check
         * Command: !eed skill(char_value|skill_value)
         * ---------------------------------------------------------------- */
        
        //log(cmd);
        
        _.each(cmd, function(skill) {
        
            var diceArray = skill.match(/\((.*?)\|(.*?)\)/);
            
            if (diceArray && diceArray[1] && diceArray[2]) {
               
                var num1 = eote.process.math(diceArray[1]);
                var num2 = eote.process.math(diceArray[2]);
                var totalAbil = Math.abs(num1-num2);
                var totalProf = (num1 < num2 ? num1 : num2);
                var abilityDice = diceObj.count.ability;
                var proficiencyDice = diceObj.count.proficiency;
                    
                    diceObj.count.ability = abilityDice + totalAbil;
                    diceObj.count.proficiency = proficiencyDice + totalProf;
            }
        });
		
		return diceObj;

    }
    
	eote.process.opposed = function(cmd, diceObj){
		/*Opposed
		* default: 
		* Description: create the difficulty and challenge dice for an opposed skill check
		* Command: !eed opposed(char_value|skill_value)
		* ---------------------------------------------------------------- */
		
		//log(cmd);
		
		_.each(cmd, function(opposed) {
			
			var diceArray = opposed.match(/\((.*?)\|(.*?)\)/);
			
			if (diceArray && diceArray[1] && diceArray[2]) {
				var num1 = eote.process.math(diceArray[1]);
				var num2 = eote.process.math(diceArray[2]);
				var totalOppDiff = Math.abs(num1-num2);
				var totalOppChal = (num1 < num2 ? num1 : num2);
				var opposeddifficultyDice = diceObj.count.difficulty;
				var opposedchallengeDice = diceObj.count.challenge;
				diceObj.count.difficulty = opposeddifficultyDice + totalOppDiff;
				diceObj.count.challenge = opposedchallengeDice + totalOppChal;
			}
		});
		
		return diceObj;
	}
	
    eote.process.setDice = function(cmd, diceObj){
        
        /* setDice
         * default: 
         * Description: Loop thru the dice and adds or subtracts them from the dice object
         * Command: !eed g# y# b# blk# r# p# w# or g#+# or g#-#
         * ---------------------------------------------------------------- */
        
        //log(cmd);
        
        _.each(cmd, function(dice) {
        
            var diceArray = dice.match(/(\d{1,2})(\w{1,3})/);
            
            if (diceArray && diceArray[1] && diceArray[2]) {
                
                var diceQty  = eote.process.math(diceArray[1]);
                    diceQty = (isNaN(diceQty) ? 0 : diceQty);

                var abilityDice = diceObj.count.ability;
                var proficiencyDice = diceObj.count.proficiency;
                var difficultyDice = diceObj.count.difficulty;
                var challengeDice = diceObj.count.challenge;
                var boostDice = diceObj.count.boost;
                var setbackDice = diceObj.count.setback;
                var forceDice = diceObj.count.force;
                var success = diceObj.count.success;
                var advantage = diceObj.count.advantage;
                var threat = diceObj.count.threat;
                var failure = diceObj.count.failure;
                
                switch(diceArray[2]) {
                    case 'b' :
                        diceObj.count.boost = boostDice + diceQty;
                        break;
                    case 'g' :
                        diceObj.count.ability = abilityDice + diceQty;
                        break;
                    case 'y' :
                        diceObj.count.proficiency = proficiencyDice + diceQty;
                        break;
                    case 'blk' :
                        diceObj.count.setback = setbackDice + diceQty;
                        break;
                    case 'p' :
                        diceObj.count.difficulty = difficultyDice + diceQty;
                        break;
                    case 'r' :
                        diceObj.count.challenge = challengeDice + diceQty;
                        break;
                    case 'w' :
                        diceObj.count.force = forceDice + diceQty;
                        break;
                    case 's':
                        diceObj.count.success = success + diceQty;
                        break;
                    case 'a':
                        diceObj.count.advantage = advantage + diceQty;
                        break;
                    case 't':
                        diceObj.count.threat = threat + diceQty;
                        break;
                    case 'f':
                        diceObj.count.failure = failure + diceQty;
                        break;
                }
            }
        });
		
		return diceObj;
    }
    
    eote.process.upgrade = function(cmd, diceObj){
        
        /* Upgrade
         * default: 
         * Description: upgrades ability and difficulty dice
         * Command: !eed upgrade(ability|#) or upgrade(difficulty|#)
         * ---------------------------------------------------------------- */
        
        _.each(cmd, function(dice) {
            
            var diceArray = dice.match(/\((.*?)\|(.*?)\)/);
           
            if (diceArray && diceArray[1] && diceArray[2]) {
                
                var type = diceArray[1];
                var upgradeVal = eote.process.math(diceArray[2]);
                var abilityDice = diceObj.count.ability;
                var proficiencyDice = diceObj.count.proficiency;
                var difficultyDice = diceObj.count.difficulty;
                var challengeDice = diceObj.count.challenge;
                
                switch(type) {
                    case 'ability':
                    
                        var totalProf = (upgradeVal < abilityDice ? upgradeVal : abilityDice);    
                        var totalAbil = Math.abs(upgradeVal - abilityDice);
                        
                        if (upgradeVal > abilityDice) {
                            totalProf = totalProf + Math.floor(totalAbil / 2);
                            totalAbil = totalAbil % 2;   
                        }     
                        
                        diceObj.count.ability = totalAbil;
                        diceObj.count.proficiency = proficiencyDice + totalProf;
                        
                        break;
                    case 'difficulty':
                        
                        var totalChall = (upgradeVal < difficultyDice ? upgradeVal : difficultyDice);    
                        var totalDiff = Math.abs(upgradeVal - difficultyDice);
                        
                        if (upgradeVal > difficultyDice) {
                            totalChall = totalChall + Math.floor(totalDiff / 2);
                            totalDiff = totalDiff % 2;   
                        }     
    
                        diceObj.count.difficulty = totalDiff;
                        diceObj.count.challenge = challengeDice + totalChall;
                        
                        break;
                }  
            }
            
            
        });
		
		return diceObj;
    }
    
    eote.process.downgrade = function(cmd, diceObj){
        
        /* Downgrade
         * default: 
         * Description: downgrades proficiency and challenge dice
         * Command: !eed downgrade(proficiency|#) or downgrade(challenge|#)
         * ---------------------------------------------------------------- */
        
        //log(cmd);
        
        _.each(cmd, function(dice) {
            
            var diceArray = dice.match(/\((.*?)\|(.*?)\)/);
            
            if (diceArray && diceArray[1] && diceArray[2]) {
                
                var type = diceArray[1];
                var downgradeVal = eote.process.math(diceArray[2]);
                var abilityDice = diceObj.count.ability;
                var proficiencyDice = diceObj.count.proficiency;
                var difficultyDice = diceObj.count.difficulty;
                var challengeDice = diceObj.count.challenge;
                
                switch(type) {
                    case 'proficiency':
                        
                        var profConvertedToAbil = proficiencyDice * 2;
                        
                        if (downgradeVal > (abilityDice + profConvertedToAbil)) {
                            diceObj.count.ability = 0;
                            diceObj.count.proficiency = 0;
                        } else if (downgradeVal > profConvertedToAbil) {
                            downgradeVal = Math.abs(downgradeVal - profConvertedToAbil);
                            diceObj.count.ability = Math.abs(downgradeVal - abilityDice);
                            diceObj.count.proficiency = 0;
                        } else {
                            diceObj.count.ability = abilityDice + (profConvertedToAbil - downgradeVal) % 2;
                            diceObj.count.proficiency = Math.floor((profConvertedToAbil - downgradeVal) / 2);
                        }
                        
                        break;
                    case 'challenge':
    
                        var challConvertedToDiff = challengeDice * 2;
                        
                        if (downgradeVal > (difficultyDice + challConvertedToDiff)) {
                            diceObj.count.difficulty = 0;
                            diceObj.count.challenge = 0;
                        } else if (downgradeVal > challConvertedToDiff) {
                            downgradeVal = Math.abs(downgradeVal - challConvertedToDiff);
                            diceObj.count.difficulty = Math.abs(downgradeVal - difficultyDice);
                            diceObj.count.challenge = 0;
                        } else {
                            diceObj.count.difficulty = difficultyDice + (challConvertedToDiff - downgradeVal) % 2;
                            diceObj.count.challenge = Math.floor((challConvertedToDiff - downgradeVal) / 2);
                        }
                         
                        break;
                }  
            } 
        });
		
		return diceObj;
    }
    
    eote.process.math = function (expr){
        
        /* Math
         * Returns: Number
         * Description: Evaluates a mathematical expression (as a string) and return the result 
         * ---------------------------------------------------------------- */
        
        var chars = expr.split("");
        var n = [], op = [], index = 0, oplast = true;
    
        n[index] = "";
    
        // Parse the expression
        for (var c = 0; c < chars.length; c++) {
    
            if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
                op[index] = chars[c];
                index++;
                n[index] = "";
                oplast = true;
            } else {
                n[index] += chars[c];
                oplast = false;
            }
        }
    
        // Calculate the expression
        expr = parseFloat(n[0]);
        for (var o = 0; o < op.length; o++) {
            var num = parseFloat(n[o + 1]);
            switch (op[o]) {
                case "+":
                    expr = expr + num;
                    break;
                case "-":
                    expr = expr - num;
                    break;
                case "*":
                    expr = expr * num;
                    break;
                case "/":
                    expr = expr / num;
                    break;
            }
        }
    
        return expr;
    }
    
    eote.process.addDiceValues = function(diceTotalObj, diceResult){
            
        diceTotalObj.success = diceTotalObj.success + diceResult.success;
        diceTotalObj.failure = diceTotalObj.failure + diceResult.failure;
        diceTotalObj.advantage = diceTotalObj.advantage + diceResult.advantage;
        diceTotalObj.threat = diceTotalObj.threat + diceResult.threat;
        diceTotalObj.triumph = diceTotalObj.triumph + diceResult.triumph;
        diceTotalObj.despair = diceTotalObj.despair + diceResult.despair;
        diceTotalObj.light = diceTotalObj.light + diceResult.light;
        diceTotalObj.dark = diceTotalObj.dark + diceResult.dark;
        	
        return diceTotalObj;
    }
    
    eote.process.totalDiceValues = function (diceTotalObj){
        
        var diceTS = {
        	success : 0,
        	failure : 0,
        	advantage : 0,
        	threat : 0,
        	triumph : 0,
        	despair : 0,
        	light : 0,
        	dark : 0,
        	diceGraphicsLog : "",
        	diceTextLog : ""
        };
        
        var i = 0;
        	
    	i = diceTotalObj.success - diceTotalObj.failure;
        
        if (i >= 0) {
        	diceTS.success = i;
        } else {
        	diceTS.failure = Math.abs(i);
        }
        
        i = diceTotalObj.advantage - diceTotalObj.threat;
        
        if (i >= 0) {
        	diceTS.advantage = i;
        } else {
        	diceTS.threat = Math.abs(i);
        }
            
        diceTS.triumph = diceTotalObj.triumph;
        diceTS.despair = diceTotalObj.despair;
        diceTS.light = diceTotalObj.light;
        diceTS.dark = diceTotalObj.dark;
        	
        return diceTS;
    }
    
    eote.process.rollDice = function(diceObj) {
        
        results = {
    		success : 0,
			failure : 0,
			advantage : 0,
			threat : 0,
			triumph : 0,
			despair : 0,
			light : 0,
			dark : 0,
			diceGraphicsLog : '',
			diceTextLog : ''
		}
        
        //Blue "Boost" die (d6)
        if (diceObj.count.boost > 0) {
        	results = eote.roll.boost(diceObj.count.boost);
    		diceObj.graphicsLog.Boost = results.diceGraphicsLog;
    		diceObj.textLog.Boost = results.diceTextLog;
    		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
        }
        
		//Green "Ability" die (d8) 
        if (diceObj.count.ability > 0) {
    		results = eote.roll.ability(diceObj.count.ability);
    		diceObj.graphicsLog.Ability = results.diceGraphicsLog;
    		diceObj.textLog.Ability = results.diceTextLog;
    		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
        }
        
		//Yellow "Proficiency" die (d12)
        if (diceObj.count.proficiency > 0) {
    		results = eote.roll.proficiency(diceObj.count.proficiency);
    		diceObj.graphicsLog.Proficiency = results.diceGraphicsLog;
    		diceObj.textLog.Proficiency = results.diceTextLog;
    		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
        }
        
        //Black "SetBack" die (d6)
        if (diceObj.count.setback > 0) {
            results = eote.roll.setback(diceObj.count.setback);
    		diceObj.graphicsLog.SetBack = results.diceGraphicsLog;
    		diceObj.textLog.SetBack = results.diceTextLog;
    		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);	
        }
        
		//Purple "Difficulty" die (d8)
        if (diceObj.count.difficulty > 0) {
            results = eote.roll.difficulty(diceObj.count.difficulty);
    		diceObj.graphicsLog.Difficulty = results.diceGraphicsLog;
    		diceObj.textLog.Difficulty = results.diceTextLog;
    		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);		
        }
        
		//Red "Challenge" die (d12)
        if (diceObj.count.challenge > 0) {
    		results = eote.roll.challenge(diceObj.count.challenge);
    		diceObj.graphicsLog.Challenge = results.diceGraphicsLog;
    		diceObj.textLog.Challenge = results.diceTextLog;
    		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);	
        }    
    	
        //White "Force" die (d12)
        if (diceObj.count.force > 0) {
    		results = eote.roll.force(diceObj.count.force);
    		diceObj.graphicsLog.Force = results.diceGraphicsLog;
    		diceObj.textLog.Force = results.diceTextLog;
    		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);	
        }   
        
        // Free Successes (from skills)
        if (diceObj.count.success > 0) {
    		results = eote.roll.success(diceObj.count.success);
    		diceObj.graphicsLog.Success = results.diceGraphicsLog;
    		diceObj.textLog.Success = results.diceTextLog;
    		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);	
        }
		// Free Advantage (from skills)
		 if (diceObj.count.advantage > 0) {
    		results = eote.roll.advantage(diceObj.count.advantage);
    		diceObj.graphicsLog.Advantage = results.diceGraphicsLog;
    		diceObj.textLog.Advantage = results.diceTextLog;
    		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);	
        }
        //Free Threat (from skills)
    	 if (diceObj.count.threat > 0) {
    		results = eote.roll.threat(diceObj.count.threat);
    		diceObj.graphicsLog.Threat = results.diceGraphicsLog;
    		diceObj.textLog.Threat = results.diceTextLog;
    		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);	
        }
		// Free Failure (from skills)
		 if (diceObj.count.failure > 0) {
    		results = eote.roll.failure(diceObj.count.failure);
    		diceObj.graphicsLog.Failure = results.diceGraphicsLog;
    		diceObj.textLog.Failure = results.diceTextLog;
    		diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);	
        }
        
            //finds the sum of each dice attribute
            diceObj.totals = eote.process.totalDiceValues(diceObj.totals);
        
       
        return diceObj;
    }
    
    eote.process.diceOutput = function(diceObj, playerName, playerID) {
        
        //log(diceObj);
        var s1 = '<img src="';
        var s2 = '" title="';
    	var s3 = '" height="';
    	var s4 = '" width="';
    	var s5 = '"/>';
        var chatGlobal = '';
        var diceGraphicsResults = "";
        var diceGraphicsRolled = "";
        var diceTextRolled = "";
        var diceTextResults = "";
        
        diceTextResults = "["
        
        if (diceObj.totals.success > 0) {
        	diceTextResults = diceTextResults + " Success:" + diceObj.totals.success;
    		for (i=1;i<=diceObj.totals.success;i++){
    			diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.S + s2 + "Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
    		}
    	}
    	if (diceObj.totals.failure > 0) {
    		diceTextResults = diceTextResults + " Fail:" + diceObj.totals.failure;
    		for (i=1;i<=diceObj.totals.failure;i++){
    			diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.F + s2 + "Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
    		}
    	}
    	if (diceObj.totals.advantage > 0) {
    		diceTextResults = diceTextResults + " Advant:" + diceObj.totals.advantage;
    		for (i=1;i<=diceObj.totals.advantage;i++){
    			diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.A + s2 + "Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
    		}
    	}
    	if (diceObj.totals.threat > 0) {
    		diceTextResults = diceTextResults + " Threat:" + diceObj.totals.threat;
    		for (i=1;i<=diceObj.totals.threat;i++){
    			diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.T + s2 + "Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
    		}
    	}
    	if (diceObj.totals.triumph > 0) {
    		diceTextResults = diceTextResults + " Triumph:" + diceObj.totals.triumph;
    		for (i=1;i<=diceObj.totals.triumph;i++){
    			diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.TRIUMPH + s2 + "Triumph" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
    		}
    	}
    	if (diceObj.totals.despair > 0) {
    		diceTextResults = diceTextResults + " Despair:" + diceObj.totals.despair;
    		for (i=1;i<=diceObj.totals.despair;i++){
    			diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.DESPAIR + s2 + "Despair" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
    		}
    	}
    	if (diceObj.totals.light > 0) {
    		diceTextResults = diceTextResults + " Light:" + diceObj.totals.light;
    		
            for (i=1; i<=diceObj.totals.light; i++){
    			diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.L + s2 + "Light" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
    		}
    	}
    	if (diceObj.totals.dark > 0) {
    		diceTextResults = diceTextResults + " Dark:" + diceObj.totals.dark;
    		for (i=1;i<=diceObj.totals.dark;i++){
    			diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.D + s2 + "Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
    		}
    	}
    	
        diceTextResults = diceTextResults + "]";
        
        //------------------------------------>
        
        if (eote.defaults.globalVars.diceTestEnabled === true) {
        	chatGlobal = "/direct <br>6b 8g 12y 6blk 8p 12r 12w <br>";
    	} else if (diceObj.vars.label) {
            chatGlobal = "/direct <br>" + diceObj.vars.label + '<br>';
    	} else {
            chatGlobal = "/direct <br>";
    	}
        
        if (eote.defaults.globalVars.diceTestEnabled === true) {
            characterPlayer = 'TEST';
        } else if (diceObj.vars.characterName) {
            characterPlayer = diceObj.vars.characterName;
        } else {
            characterPlayer = playerName;
        }
            
        
        //------------------------------------>
        
        if (eote.defaults.globalVars.diceLogChat === true) {
        	if (eote.defaults.globalVars.diceLogRolledOnOneLine === true) {
    			
                diceGraphicsRolled = diceObj.graphicsLog.Boost + diceObj.graphicsLog.Ability + diceObj.graphicsLog.Proficiency + diceObj.graphicsLog.SetBack + diceObj.graphicsLog.Difficulty + diceObj.graphicsLog.Challenge + diceObj.graphicsLog.Force + diceObj.graphicsLog.Success + diceObj.graphicsLog.Advantage + diceObj.graphicsLog.Failure + diceObj.graphicsLog.Threat;
                
                if (diceObj.textLog.Boost !="") diceTextRolled = diceTextRolled + "Boost:"+diceObj.textLog.Boost;
    			if (diceObj.textLog.Ability !="") diceTextRolled = diceTextRolled + "Ability:"+diceObj.textLog.Ability;
    			if (diceObj.textLog.Proficiency !="") diceTextRolled = diceTextRolled + "Proficiency:"+diceObj.textLog.Proficiency;
    			if (diceObj.textLog.SetBack !="") diceTextRolled = diceTextRolled + "SetBack:"+diceObj.textLog.SetBack;
    			if (diceObj.textLog.Difficulty !="") diceTextRolled = diceTextRolled + "Difficulty:"+diceObj.textLog.Difficulty;
    			if (diceObj.textLog.Challenge !="") diceTextRolled = diceTextRolled + "Challenge:"+diceObj.textLog.Challenge;
    			if (diceObj.textLog.Force !="") diceTextRolled = diceTextRolled + "Force:"+diceObj.textLog.Force;
				if (diceObj.textLog.Success !="") diceTextRolled = diceTextRolled + "Success:"+diceObj.textLog.Success;
				if (diceObj.textLog.Advantage !="") diceTextRolled = diceTextRolled + "Advantage:"+diceObj.textLog.Advantage;
                if (diceObj.textLog.Failure != "") diceTextRolled = diceGraphicsRolled + "Failure:"+diceObj.textLog.Failure;
                if (diceObj.textLog.Threat != "") diceTextRolled = diceGraphicsRolled + "Threat:"+diceObj.textLog.Threat;
    
    			if (eote.defaults.globalVars.diceGraphicsChat === true) {	
                    chatGlobal = chatGlobal + '<br>' + diceGraphicsRolled;
    			} else {
    				sendChat("", diceTextRolled);
    			}
                
    		} else {
    			
                if (eote.defaults.globalVars.diceGraphicsChat === true) {
    				
                    if (diceObj.vars.label) {
                        sendChat(characterPlayer, "/direct <br><b>Skill:</b> " + diceObj.vars.label + '<br>');
                    }
                    
                    if (diceObj.graphicsLog.Boost !="") sendChat("", "/direct " + diceObj.graphicsLog.Boost);
    				if (diceObj.graphicsLog.Ability !="")  sendChat("", "/direct " + diceObj.graphicsLog.Ability);
    				if (diceObj.graphicsLog.Proficiency !="") sendChat("", "/direct " + diceObj.graphicsLog.Proficiency);
    				if (diceObj.graphicsLog.SetBack !="") sendChat("", "/direct " + diceObj.graphicsLog.SetBack);
    				if (diceObj.graphicsLog.Difficulty !="")  sendChat("", "/direct " + diceObj.graphicsLog.Difficulty);
    				if (diceObj.graphicsLog.Challenge !="") sendChat("", "/direct " + diceObj.graphicsLog.Challenge);
    				if (diceObj.graphicsLog.Force !="") sendChat("", "/direct " + diceObj.graphicsLog.Force);
					if (diceObj.graphicsLog.Success !="") sendChat("", "/direct " + diceObj.graphicsLog.Success);
					if (diceObj.graphicsLog.Advantage !="") sendChat("", "/direct " + diceObj.graphicsLog.Advantage);
					if (diceObj.graphicsLog.Failure !="") sendChat("", "/direct " +  diceObj.graphicsLog.Failure);    
                    if (diceObj.graphicsLog.Threat !="") sendChat("", "/direct " + diceObj.graphicsLog.Threat);
                } else {
    				
                    if (diceObj.vars.label) {
                        sendChat(characterPlayer, "/direct <br><b>Skill:</b> " + diceObj.vars.label + '<br>');
                    }
                    
    				if (diceObj.textLog.Boost !="") sendChat("", "Boost:"+diceObj.textLog.Boost);
    				if (diceObj.textLog.Ability !="") sendChat("", "Ability:"+diceObj.textLog.Ability);
    				if (diceObj.textLog.Proficiency !="") sendChat("", "Proficiency:"+diceObj.textLog.Proficiency);
    				if (diceObj.textLog.SetBack !="") sendChat("", "SetBack:"+diceObj.textLog.SetBack);
    				if (diceObj.textLog.Difficulty !="") sendChat("", "Difficulty:"+diceObj.textLog.Difficulty);
    				if (diceObj.textLog.Challenge !="") sendChat("", "Challenge:"+diceObj.textLog.Challenge);
    				if (diceObj.textLog.Force !="") sendChat("", "Force:"+diceObj.textLog.Force);
					if (diceObj.textLog.Success !="") sendChat("", "Success:"+diceObj.textLog.Success);
					if (diceObj.textLog.Advantage !="") sendChat("", "Advantage:"+diceObj.textLog.Advantage);
					if (diceObj.textLog.Failure !="") sendChat("", "Failure:" + diceObj.textLog.Failure);    
                    if (diceObj.textLog.Threat !="") sendChat("", "Threat:" + diceObj.textLog.Threat);
    			
    			}
    		}
    	}
        
        if (eote.defaults.globalVars.diceGraphicsChat === true ) {
			
            chatGlobal = chatGlobal + '<br>Roll:' + diceGraphicsResults;
            
            sendChat(characterPlayer, chatGlobal);
            
    	} else {
    		sendChat("Roll", diceTextResults);
    	}
    
        //All DONE!!!
    }
    
    //---------------------->
    
    eote.roll = {
      
        boost : function(diceQty){
            //Blue "Boost" die (d6)
            //1 Blank
        	//2 Blank
        	//3 Success
        	//4 Advantage
        	//5 Advantage + Advantage
        	//6 Success + Advantage
        	var roll = 0;
        	var diceResult = {
        		success : 0,
        		failure : 0,
        		advantage : 0,
        		threat : 0,
        		triumph : 0,
        		despair : 0,
        		light : 0,
        		dark : 0,
        		diceGraphicsLog : "",
        		diceTextLog : ""
        	};
        	var i = 0;
        	var s1 = '<img src="';
        	var s2 = '" title="';
        	var s3 = '" height="';
        	var s4 = '" width="';
        	var s5 = '"/>';
        	
        	if (eote.defaults.globalVars.diceTestEnabled === true) {
        		diceQty = 6;
        	}
        	
        	for (i=1; i<=diceQty; i++) {
            	if (eote.defaults.globalVars.diceTestEnabled === true) {
            		roll = roll + 1;
            	} else {
            		roll = randomInteger(6);
            	}
        
            	switch(roll) {
                    case 1:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.BLANK + s2 + "Boost Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			break;
            		case 2:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.BLANK + s2 + "Boost Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			break;
            		case 3:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.S + s2 + "Boost Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 1;
            			break;
            		case 4:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.A + s2 + "Boost Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.advantage = diceResult.advantage + 1;
            			break;
            		case 5:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.AA + s2 + "Boost Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.advantage = diceResult.advantage + 2;
            			break;
            		case 6:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.SA + s2 + "Boost Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 1;
            			diceResult.advantage = diceResult.advantage + 1;
            			break;
                }
        	}
            
        	return diceResult;
        },
        
        ability : function(diceQty){
            //Green "Ability" die (d8)
        	//1 Blank
        	//2 Success
        	//3 Success
        	//4 Advantage
        	//5 Advantage
        	//6 Success + Advantage
        	//7 Advantage + Advantage
        	//8 Success + Success
        	var roll = 0;
        	var diceTextLog = "";
        	var diceGraphicsLog = "";
        	var diceResult = {
        		success : 0,
        		failure : 0,
        		advantage : 0,
        		threat : 0,
        		triumph : 0,
        		despair : 0,
        		light : 0,
        		dark : 0,
        		diceGraphicsLog : "",
        		diceTextLog : ""
        	};
        	var i = 0;
        	var s1 = '<img src="';
        	var s2 = '" title="';
        	var s3 = '" height="';
        	var s4 = '" width="';
        	var s5 = '"/>';
        	
        	if (eote.defaults.globalVars.diceTestEnabled === true) {
        		diceQty = 8;
        	}
        	
        	for (i=1; i<=diceQty; i++) {
            	if (eote.defaults.globalVars.diceTestEnabled === true) {
            		roll = roll + 1;
            	}
            	else {
            		roll = randomInteger(8);
            	}
            	
            	switch(roll) {
                    case 1:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.BLANK + s2 + "Ability Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			break;
            		case 2:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.S + s2 + "Ability Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 1;
            			break;
            		case 3:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.S + s2 + "Ability Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 1;
            			break;
            		case 4:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.A + s2 + "Ability Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.advantage = diceResult.advantage + 1;
            			break;
            		case 5:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.A + s2 + "Ability Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.advantage = diceResult.advantage + 1;
            			break;
            		case 6:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.SA + s2 + "Ability Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 1;
            			diceResult.advantage = diceResult.advantage + 1;
            			break;
            		case 7:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.AA + s2 + "Ability Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.advantage = diceResult.advantage + 2;
            			break;
            		case 8:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.SS + s2 + "Ability Success x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 2;
            			break;
                }
        	}
        	return diceResult;
        },  
        
        proficiency : function(diceQty){
            //Yellow "Proficiency" die (d12)
        	//1 Blank
        	//2 Triumph
        	//3 Success
        	//4 Success
        	//5 Advantage
        	//6 Success + Advantage
        	//7 Success + Advantage
        	//8 Success + Advantage
        	//9 Success + Success
        	//10 Success + Success
        	//11 Advantage + Advantage
        	//12 Advantage + Advantage
        	var roll = 0;
        	var diceTextLog = "";
        	var diceGraphicsLog = "";
        	var diceResult = {
        		success : 0,
        		failure : 0,
        		advantage : 0,
        		threat : 0,
        		triumph : 0,
        		despair : 0,
        		light : 0,
        		dark : 0,
        		diceGraphicsLog : "",
        		diceTextLog : ""
        	};
        	var i = 0;
        	var s1 = '<img src="';
        	var s2 = '" title="';
        	var s3 = '" height="';
        	var s4 = '" width="';
        	var s5 = '"/>';
        	
        	if (eote.defaults.globalVars.diceTestEnabled === true) {
        		diceQty = 12;
        	}
        	
        	for (i=1; i<=diceQty; i++) {
            	if (eote.defaults.globalVars.diceTestEnabled === true) {
            		roll = roll + 1;
            	}
            	else {
            		roll = randomInteger(12);
            	}
            
            	switch(roll) {
                    case 1:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.BLANK + s2 + "Proficiency Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			break;
            		case 2:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Triumph(+Success))";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.TRIUMPH + s2 + "Proficiency Triumph(+Success)" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.triumph = diceResult.triumph + 1;
            			diceResult.success = diceResult.success + 1;
            			break;
            		case 3:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.S + s2 + "Proficiency Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 1;
            			break;
            		case 4:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.S + s2 + "Proficiency Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 1;
            			break;
            		case 5:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.A + s2 + "Proficiency Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.advantage = diceResult.advantage + 1;
            			break;
            		case 6:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 1;
            			diceResult.advantage = diceResult.advantage + 1;
            			break;
            		case 7:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 1;
            			diceResult.advantage = diceResult.advantage + 1;
            			break;
            		case 8:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 1;
            			diceResult.advantage = diceResult.advantage + 1;
            			break;
            		case 9:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SS + s2 + "Proficiency Success x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 2;
            			break;
            		case 10:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Success x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SS + s2 + "Proficiency Success x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.success = diceResult.success + 2;
            			break;
            		case 11:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.AA + s2 + "Proficiency Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.advantage = diceResult.advantage + 2;
            			break;
            		case 12:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.AA + s2 + "Proficiency Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.advantage = diceResult.advantage + 2;
            			break;
                }
        	}
        	return diceResult;
        },
        
        setback : function(diceQty){
            //Black "Setback" die (d6)
        	//1 Blank
        	//2 Blank
        	//3 Failure
        	//4 Failure
        	//5 Threat
        	//6 Threat
        	var roll = 0;
        	var diceTextLog = "";
        	var diceGraphicsLog = "";
        	var diceResult = {
        		success : 0,
        		failure : 0,
        		advantage : 0,
        		threat : 0,
        		triumph : 0,
        		despair : 0,
        		light : 0,
        		dark : 0,
        		diceGraphicsLog : "",
        		diceTextLog : ""
        	};
        	var i = 0;
        	var s1 = '<img src="';
        	var s2 = '" title="';
        	var s3 = '" height="';
        	var s4 = '" width="';
        	var s5 = '"/>';
        		
        	if (eote.defaults.globalVars.diceTestEnabled === true) {
        		diceQty = 6;
        	}
        	
        	for (i=1; i<=diceQty; i++) {
            	if (eote.defaults.globalVars.diceTestEnabled === true) {
            		roll = roll + 1;
            	}
            	else {
            		roll = randomInteger(6);
            	}
            	
            	switch(roll) {
                    case 1:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.BLANK + s2 + "Setback Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			break;
            		case 2:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.BLANK + s2 + "Setback Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			break;
            		case 3:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.F + s2 + "Setback Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.failure = diceResult.failure + 1;
            			break;
            		case 4:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.F + s2 + "Setback Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.failure = diceResult.failure + 1;
            			break;
            		case 5:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.T + s2 + "Setback Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.threat = diceResult.threat + 1;
            			break;
            		case 6:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.T + s2 + "Setback Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.threat = diceResult.threat + 1;
            			break;
                }
        	}
        	return diceResult;
        },
        
        difficulty : function(diceQty){
            //Purple "Difficulty" die (d8)
        	//1 Blank
        	//2 Failure
        	//3 Threat
        	//4 Threat
        	//5 Threat
        	//6 Failure + Failure
        	//7 Failure + Threat
        	//8 Threat + Threat
        	var roll = 0;
        	var diceTextLog = "";
        	var diceGraphicsLog = "";
        	var diceResult = {
        		success : 0,
        		failure : 0,
        		advantage : 0,
        		threat : 0,
        		triumph : 0,
        		despair : 0,
        		light : 0,
        		dark : 0,
        		diceGraphicsLog : "",
        		diceTextLog : ""
        	};
        	var i = 0;
        	var s1 = '<img src="';
        	var s2 = '" title="';
        	var s3 = '" height="';
        	var s4 = '" width="';
        	var s5 = '"/>';
        		
        	if (eote.defaults.globalVars.diceTestEnabled === true) {
        		diceQty = 8;
        	}
        	
        	for (i=1;i<=diceQty;i++) {
            	if (eote.defaults.globalVars.diceTestEnabled === true) {
            		roll = roll + 1;
            	}
            	else {
            		roll = randomInteger(8);
            	}
            
            	switch(roll) {
                    case 1:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.BLANK + s2 + "Difficulty Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			break;
            		case 2:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.F + s2 + "Difficulty Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.failure = diceResult.failure + 1;
            			break;
            		case 3:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.threat = diceResult.threat + 1;
            			break;
            		case 4:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.threat = diceResult.threat + 1;
            			break;
            		case 5:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.threat = diceResult.threat + 1;
            			break;
            		case 6:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.FF + s2 + "Difficulty Failure x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.failure = diceResult.failure + 2;
            			break;
            		case 7:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure + Threat)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.FT + s2 + "Difficulty Failure + Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.failure = diceResult.failure + 1;
            			diceResult.threat = diceResult.threat + 1;
            			break;
            		case 8:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.TT + s2 + "Difficulty Threat x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.threat = diceResult.threat + 2;
            			break;
                }
        	}
        	return diceResult;
        },
        
        challenge : function(diceQty){
            //Red "Challenge" die (d12)
        	//1 Blank
        	//2 Despair
        	//3 Failure
        	//4 Failure
        	//5 Threat
        	//6 Threat
        	//7 Failure + Failure
        	//8 Failure + Failure
        	//9 Threat + Threat
        	//10 Threat + Threat
        	//11 Failure + Threat
        	//12 Failure + Threat
        	var roll = 0;
        	var diceTextLog = "";
        	var diceGraphicsLog = "";
        	var diceResult = {
        		success : 0,
        		failure : 0,
        		advantage : 0,
        		threat : 0,
        		triumph : 0,
        		despair : 0,
        		light : 0,
        		dark : 0,
        		diceGraphicsLog : "",
        		diceTextLog : ""
        	};
        	var i = 0;
        	var s1 = '<img src="';
        	var s2 = '" title="';
        	var s3 = '" height="';
        	var s4 = '" width="';
        	var s5 = '"/>';
        		
        	if (eote.defaults.globalVars.diceTestEnabled === true) {
        		diceQty = 12;
        	}
        	
        	for (i=1; i<=diceQty; i++) {
            	if (eote.defaults.globalVars.diceTestEnabled === true) {
            		roll = roll + 1;
            	}
            	else {
            		roll = randomInteger(12);
            	}
            
            	switch(roll) {
                    case 1:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.BLANK + s2 + "Challenge Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			break;
            		case 2:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Despair)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.DESPAIR + s2 + "Challenge Despair" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.despair = diceResult.despair + 1;
						diceResult.failure = diceResult.failure + 1;
            			break;
            		case 3:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.F + s2 + "Challenge Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.failure = diceResult.failure + 1;
            			break;
            		case 4:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.F + s2 + "Challenge Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.failure = diceResult.failure + 1;
            			break;
            		case 5:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.T + s2 + "Challenge Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.threat = diceResult.threat + 1;
            			break;
            		case 6:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.T + s2 + "Challenge Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.threat = diceResult.threat + 1;
            			break;
            		case 7:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FF + s2 + "Challenge Failure x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.failure = diceResult.failure + 2;
            			break;
            		case 8:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FF + s2 + "Challenge Failure x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.failure = diceResult.failure + 2;
            			break;
            		case 9:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.TT + s2 + "Challenge Threat x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.threat = diceResult.threat + 2;
            			break;
            		case 10:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.TT + s2 + "Challenge Threat x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.threat = diceResult.threat + 2;
            			break;
            		case 11:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure + Threat)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FT + s2 + "Challenge Failure + Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.failure = diceResult.failure + 1;
            			diceResult.threat = diceResult.threat + 1;
            			break;
            		case 12:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure + Threat)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FT + s2 + "Challenge Failure + Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.failure = diceResult.failure + 1;
            			diceResult.threat = diceResult.threat + 1;
            			break;
                }
        	}
        	return diceResult;
        },
        
        force : function(diceQty){
            //White "Force" die (d12)
        	//1 Light
        	//2 Light
        	//3 Light + Light
        	//4 Light + Light
        	//5 Light + Light
        	//6 Dark
        	//7 Dark
        	//8 Dark
        	//9 Dark
        	//10 Dark
        	//11 Dark
        	//12 Dark + Dark
        	var roll = 0;
        	var diceTextLog = "";
        	var diceGraphicsLog = "";
        	var diceResult = {
        		success : 0,
        		failure : 0,
        		advantage : 0,
        		threat : 0,
        		triumph : 0,
        		despair : 0,
        		light : 0,
        		dark : 0,
        		diceGraphicsLog : "",
        		diceTextLog : ""
        	};
        	var i = 0;
        	var s1 = '<img src="';
        	var s2 = '" title="';
        	var s3 = '" height="';
        	var s4 = '" width="';
        	var s5 = '"/>';
        		
        	if (eote.defaults.globalVars.diceTestEnabled === true) {
        		diceQty = 12;
        	}
        	
        	for (i=1; i<=diceQty; i++) {
            	if (eote.defaults.globalVars.diceTestEnabled === true) {
            		roll = roll + 1;
            	}
            	else {
            		roll = randomInteger(12);
            	}
            
            	switch(roll) {
                    case 1:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Light)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.L + s2 + "Force Light" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.light = diceResult.light + 1;
            			break;
            		case 2:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Light)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.L + s2 + "Force Light" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.light = diceResult.light + 1;
            			break;
            		case 3:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Light x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.LL + s2 + "Force Light x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.light = diceResult.light + 2;
            			break;
            		case 4:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Light x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.LL + s2 + "Force Light x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.light = diceResult.light + 2;
            			break;
            		case 5:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Light x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.LL + s2 + "Force Light x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.light = diceResult.light + 2;
            			break;
            		case 6:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.dark = diceResult.dark + 1;
            			break;
            		case 7:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.dark = diceResult.dark + 1;
            			break;
            		case 8:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.dark = diceResult.dark + 1;
            			break;
            		case 9:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.dark = diceResult.dark + 1;
            			break;
            		case 10:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.dark = diceResult.dark + 1;
            			break;
            		case 11:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.dark = diceResult.dark + 1;
            			break;
            		case 12:
            			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark x2)";
            			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.DD + s2 + "Force Dark x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            			diceResult.dark = diceResult.dark + 2;
            			break;
                }
        	}
        	return diceResult;
        },
        
        success : function(diceQty){
            //Free Success
            var i = 0;
        	var s1 = '<img src="';
        	var s2 = '" title="';
        	var s3 = '" height="';
        	var s4 = '" width="';
        	var s5 = '"/>';
			
			var roll = 0;
        	var diceTextLog = "";
        	var diceGraphicsLog = "";
            
			var diceResult = {
        		success : 0,
        		failure : 0,
        		advantage : 0,
        		threat : 0,
        		triumph : 0,
        		despair : 0,
        		light : 0,
        		dark : 0,
        		diceGraphicsLog : "",
        		diceTextLog : ""
        	};
			
			diceResult.diceTextLog = diceTextLog + "(Success x" + diceQty +")";
			diceResult.success = diceResult.success + diceQty;
            for (i=0; i<diceQty; i++)
			{
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.S + s2 + "Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            }
			
			return diceResult;
        },
        
        advantage : function(diceQty){
            //Free Advantage
            var i = 0;
        	var s1 = '<img src="';
        	var s2 = '" title="';
        	var s3 = '" height="';
        	var s4 = '" width="';
        	var s5 = '"/>';
			
			var roll = 0;
        	var diceTextLog = "";
        	var diceGraphicsLog = "";
			
			var diceResult = {
        		success : 0,
        		failure : 0,
        		advantage : 0,
        		threat : 0,
        		triumph : 0,
        		despair : 0,
        		light : 0,
        		dark : 0,
        		diceGraphicsLog : "",
        		diceTextLog : ""
        	};
			
			diceResult.diceTextLog = diceTextLog + "(Advantage x" + diceQty +")";
			diceResult.advantage = diceResult.advantage + diceQty;
			for (i=0; i<diceQty; i++)
			{
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.A + s2 + "Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
			}
			
			return diceResult;
        },
      
    threat : function(diceQty){
            //Free threat
            var i = 0;
        	var s1 = '<img src="';
        	var s2 = '" title="';
        	var s3 = '" height="';
        	var s4 = '" width="';
        	var s5 = '"/>';
			
			var roll = 0;
        	var diceTextLog = "";
        	var diceGraphicsLog = "";
            
			var diceResult = {
        		success : 0,
        		failure : 0,
        		advantage : 0,
        		threat : 0,
        		triumph : 0,
        		despair : 0,
        		light : 0,
        		dark : 0,
        		diceGraphicsLog : "",
        		diceTextLog : ""
        	};
			
			diceResult.diceTextLog = diceTextLog + "(Threat x" + diceQty +")";
			diceResult.threat = diceResult.threat + diceQty;
            for (i=0; i<diceQty; i++)
			{
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.T + s2 + "Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            }
			
			return diceResult;
        },
        
    failure : function(diceQty){
            //Free Faliure
            var i = 0;
        	var s1 = '<img src="';
        	var s2 = '" title="';
        	var s3 = '" height="';
        	var s4 = '" width="';
        	var s5 = '"/>';
			
			var roll = 0;
        	var diceTextLog = "";
        	var diceGraphicsLog = "";
            
			var diceResult = {
        		success : 0,
        		failure : 0,
        		advantage : 0,
        		threat : 0,
        		triumph : 0,
        		despair : 0,
        		light : 0,
        		dark : 0,
        		diceGraphicsLog : "",
        		diceTextLog : ""
        	};
			
			diceResult.diceTextLog = diceTextLog + "(Failure x" + diceQty +")";
			diceResult.failure = diceResult.failure + diceQty;
            for (i=0; i<diceQty; i++)
			{
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.F + s2 + "Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
            }
			
			return diceResult;
        }
    }
    
    eote.events = function() {
        
        //event listner Add character defaults to new characters
        on("add:character", function(characterObj) {
            eote.setCharacterDefaults(characterObj);
        });
        
        on("chat:message", function(msg) {
            
            if (msg.type != 'api') {
                return;
            }
            
            eote.process.setup(msg.content, msg.who, msg.playerid);
        });
        
    }
    
    on('ready', function() {
        eote.init();
       //eote.process.setup('!eed characterID(-JTu_xSU9-LVHyjcs7qx) crit(roll)', 'Steve', 'playerID');
    });
    