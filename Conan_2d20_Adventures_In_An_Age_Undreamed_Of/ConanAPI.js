var ConanAPI = ConanAPI || (function()
{
	'use strict';

    let version = '2.1',
        DeadTokenImgSrc = 'https://s3.amazonaws.com/files.d20.io/images/120063604/QZmTLXMVBSqFoqENP6LTkA/thumb.png?15864718355',
		WoundMarkers = ['Wounds1::1402922', 'Wounds2::1402925', 'Wounds3::1402927','Wounds4::1644476','Wounds5::1644475'],
		TraumaMarkers = ['Trauma1::1644483', 'Trauma2::1644484', 'Trauma3::1644485','Trauma4::1644486','Trauma5::1644482'],
		//BandagedWoundMarkers = ['BNumber1::1644478', 'BNumber2::1644479', 'BNumber3::1644480','BNumber4::1644481','BNumber5::1644482'],
		BandagedWoundMarker = 'BNumber1::1644478',
		combatFlashing = {delay:250, maxCntr:4},
		combatFlashCntr = 0,
        dyingTokenConfig = {delay:25, rotationDirection: -1, rotationValue: 10, beginningRotaton: 0},
        doomTokenName = 'DoomMomentum',

	getInteger = function(obj)
	{
		if (isInteger(obj))
			return parseInt(obj);
	
		return NaN;
	},
	
	isInteger = function(obj) {
		if (isNumeric(obj))
			return Number.parseFloat(obj) == Number.parseInt(obj);
		
		return false;
	},
	
	isNumeric = function(obj) {
		return !isNaN(obj - parseFloat(obj));
	},

    /**
	 * Generic token bar value adjustment
	 */
	updateTokenBar = function(tokenName, barName, barAdjustValue, barMin, barMax)
    {
        var tokens = findObjs({_subtype: 'token'});
        
        tokens.forEach(function(token) {
            if (token.get('name') == tokenName) {
				var barValue = getInteger(token.get(barName));
				if ( !isInteger(barValue)) barValue = 0;	//forcing bar value to be an integer
				barValue += barAdjustValue;
				if (barValue < barMin) barValue = barMin;
				if (barValue > barMax) barValue = barMax;
				token.set(barName, barValue);

				//spawnFx(token.get('left'),token.get('top'),'bomb-blood');
                return;
            }
        });
    },


	addDegrees = function(currentRotation, degreesAdjustment) {
		var newDegrees = currentRotation += degreesAdjustment;
	
		while ((newDegrees < 0) || (newDegrees > 360)) {
			if (newDegrees < 0)
				newDegrees = (360 + newDegrees);
		
			if (newDegrees > 360) 
				newDegrees = (newDegrees - 360);
		}
	
		return newDegrees;
	},

	distance = function(alpha, beta) {
		var phi = Math.abs(beta - alpha) % 360;       // This is either the distance or 360 - distance
		var distance = phi > 180 ? 360 - phi : phi;
		return distance;
	},
	
	flashCombatToken = function(token) {
		if (combatFlashCntr < combatFlashing.maxCntr) {
			combatFlashCntr++;
			token.set('fliph', !token.get('fliph'));
			setTimeout(flashCombatToken, combatFlashing.delay, token);
			return;
		}
		combatFlashCntr = 0;
	},


	startCombatToken = function(whosToken) {
		var tokens = findObjs({_subtype: 'token'});
		tokens.forEach(function(token) {
			if (token.get('name') == whosToken) {
				setTimeout(flashCombatToken, combatFlashing.delay, token);
			}
        });
        
	},


	addDeadToken = function(token) {
		toFront(createObj('graphic', {
			_subtype: 'token',
			_pageid: token.get('_pageid'),
			left: token.get('left'),
			top: token.get('top'),
			width: token.get('width'),
			height: token.get('height'),
			layer: 'objects',
			imgsrc: DeadTokenImgSrc,
			name: 'DeadToken'
		}));
	},


	killToken = function(token) {
		var rotation = token.get('rotation');
		
		rotation = addDegrees(rotation, (dyingTokenConfig.rotationValue * dyingTokenConfig.rotationDirection));

		if (dyingTokenConfig.rotationDirection < 0) {
			if (distance(dyingTokenConfig.beginningRotaton, rotation) >= 90) {
				rotation = addDegrees(dyingTokenConfig.beginningRotaton, -90);
				dyingTokenConfig.rotationDirection = 1;
			}
		}
		else {
			if (distance(dyingTokenConfig.beginningRotaton, rotation) >= 90) {
				rotation = addDegrees(dyingTokenConfig.beginningRotaton, 90);
				token.set('rotation', rotation);
				dyingTokenConfig.rotationDirection = -1;
				addDeadToken(token);
				return;	//dying animation complete
			}
		}
			
		token.set('rotation', rotation);
		setTimeout(killToken, dyingTokenConfig.delay, token);
	},
	
	startKillToken = function(selectedObect) {       
		var token = getObj('graphic', selectedObect._id);
		dyingTokenConfig.beginningRotaton = token.get('rotation') + 0;	//force number
        killToken(token);        
	},

	
	setTokenStatus = function(token, attrName, attrValue) {
		var statusMarkers = token.get('statusmarkers');
		attrValue--;	//adjust for zero offset array; if adjusted to -1, then no marker (zero)

		if (attrName == 'Wounds') {
			WoundMarkers.forEach(function(item){
				statusMarkers = statusMarkers.replace(new RegExp(item, 'gi'),'');
			});
			if (attrValue > -1 && attrValue <= WoundMarkers.length)
				statusMarkers += ',' + WoundMarkers[attrValue];
		}

		if (attrName == 'Trauma') {
			TraumaMarkers.forEach(function(item){
				statusMarkers = statusMarkers.replace(new RegExp(item, 'gi'),'');
			});
			if (attrValue > -1 && attrValue <= TraumaMarkers.length)
				statusMarkers += ',' + TraumaMarkers[attrValue];
		}

		//convert to array, remove empty elements, and set back to status markers on token
		var  newMarkers = statusMarkers.split(',')
				.filter(function(marker){ return marker.trim() > ''; })
				.join();

		token.set('statusmarkers', newMarkers);
	},

	// on modify character sheet attribute
	// attr_after parm is roll20 attribute object. The attr_before is plain javascript object
    handleChangeCharAttribute = function(attrAfter, attrBefore ) {
		var attrName = attrAfter.get('name');
		var attrValue = attrAfter.get('current');
		var charId = attrAfter.get('_characterid');
		var character = getObj('character', charId);
		var charName = character.get('name');
		
		if (attrName.toLowerCase() == 'vigor' ||
		attrName.toLowerCase() == 'wounds' ||
		attrName.toLowerCase() == 'resolve' ||
		attrName.toLowerCase() == 'trauma' ||
		attrName.toLowerCase() == 'fatigue' ||
		attrName.toLowerCase() == 'despair' ||
		attrName.toLowerCase() == 'fortune')
		sendChat(charName,"&{template:conan-default} {{title=" + charName + "'s Attribute Changed}} {{" + attrName+" from " + attrBefore.current + " to " + attrValue + "}}");

		if (attrName == 'Wounds' || attrName == 'Trauma') {
			//find token and update status markers
			var tokens = findObjs({_subtype: 'token'});
			tokens.forEach(function(token) {
				if (token.get('represents') == charId) {
					setTokenStatus(token, attrName, attrValue);
				}
			});
		}
	},
	

	// on modify graphic
    handleChangeGraphic = function(currentObj, prevObj) {
		//obj is a roll20 object with built in functions
		//prev is plain javascript object
		var currentName = currentObj.get('name');

		if (currentName == 'DeadToken') {
			var prevName = prevObj.name;
			var currentPoistion = { left: currentObj.get('left'), top: currentObj.get('top') }
			var prevPoistion = { left: prevObj.left, top: prevObj.top }

			//find token in prev position ... this would be token under the Dead Token icon
			var deadTokens = findObjs({ left: prevObj.left, top:  prevObj.top});
			//log('Deadtoken count:' + String(deadTokens.length));
			deadTokens.forEach(function(token) {
				//log('found token:' + token.get('name'));
				token.set('left', currentPoistion.left);
				token.set('top', currentPoistion.top);
			});
		}
    },

	/**
	 * Handle chat events
	 *
	 * @param {object} msg
	 */
	handleChatMessage = function(msg)
	{
		let content = msg.content;

		if(msg.type == "api") {		    
			
			if(content.indexOf("!killtoken") > -1) {
				if(msg.selected && msg.selected.length > 0)
					startKillToken(msg.selected[0]);
			}

			if(content.indexOf("!bandagetoken") > -1) {
				if(msg.selected && msg.selected.length > 0) {
					var token = getObj('graphic', msg.selected[0]._id);
					var markers = token.get('statusmarkers') + ',' + BandagedWoundMarker;
					token.set('statusmarkers', markers);
                }
            }
            
            if (content.indexOf("!dmd+") > -1)
				updateTokenBar(doomTokenName, 'bar3_value', 1, 0, 30);
		        
            if(content.indexOf("!dmd-") > -1)
				updateTokenBar(doomTokenName, 'bar3_value', -1, 0, 30);
                
            if(content.indexOf("!dmm+") > -1)
				updateTokenBar(doomTokenName, 'bar1_value', 1, 0, 6);
                
            if(content.indexOf("!dmm-") > -1)
				updateTokenBar(doomTokenName, 'bar1_value', -1, 0, 6);
				
		}
		else {
		    if(msg.rolltemplate == "skill" && msg.inlinerolls) {
				//1 is skilled roll; 2 is unskilled roll
				var ninteens = 0;
				var ninteens1 = -1;
				var ninteens2 = 0;
                var twenties = 0;
				var twenties1 = -1;
				var twenties2 = 0;
				var inlinerolls = msg.inlinerolls;
                inlinerolls.forEach(function(inlineObj){
                    if (inlineObj.results.resultType == "success") {
						ninteens = 0;
						twenties = 0;
                        var rolls = inlineObj.results.rolls;
                        for(var r = 0; r < rolls.length; r++) {
                            for(var v = 0; v < rolls[r].results.length; v++) {
								if (rolls[r].results[v].v == 19)
									ninteens++;
                                if (rolls[r].results[v].v == 20)
                                    twenties++;
                            }
						}
						if (ninteens1 == -1)
							ninteens1 = ninteens;
						else
							ninteens2 = ninteens
						if (twenties1 == -1)
							twenties1 = twenties;
						else
							twenties2 = twenties
                    }
                });
                if((content.indexOf("{{expertise=0}}") == -1 && twenties1 > 1) ||
					(content.indexOf("{{expertise=0}}") !== -1 && (ninteens2 + twenties2) > 1)) {
                    sendChat("Conan","&{template:conan-default} {{title=DOUBLE TROUBLE !!!}} {{subtitle1="+msg.who+" rolled MULTIPLE complications!!!}}")					
                }
            }
                
			if (msg.rolltemplate == "skill" && content.indexOf("skill_name=Melee") > -1) {
				startCombatToken(msg.who);
			}
		}
	},


	init = function()
	{
        log('Starting ConanAPI v' + version);
        sendChat('Conan', 'Starting Conan APIs v' + version);
		
		on('change:graphic', handleChangeGraphic);
		on('change:attribute', handleChangeCharAttribute);
		on("chat:message", handleChatMessage);

	};

	return {
		init: init
	};
}());

/**
 * Fires when the page has loaded.
 */
on("ready", function()
{
	'use strict';

	ConanAPI.init();
});

