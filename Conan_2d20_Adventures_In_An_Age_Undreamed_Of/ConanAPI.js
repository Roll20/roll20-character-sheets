var ConanAPI = ConanAPI || (function()
{
	'use strict';

    let version = '2.2',
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
	 * Get value on right side of '=' in
	 * found array element.
	 *
	 * a: array
	 * v: search value
	 * d: default retun value when not found
	 */
    findInArray = function(a, v, d)
    {
        let r =  a.find(function(e){return e.indexOf(v+'=')>-1 ? true:false;});
        //sendChat("findInArray"," "+r+"\na:"+a+"\nv:"+v+"\nd:"+d);
        if(r==undefined)
            return d;
            
        //if value is an inlineroll (starts with $[[) pick out the index value. Ie successes1=$[[0]]; return 0
        
        return r.split("=")[1].replace("$[[","").replace("]]","");
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

				/*
				If using the API script, this will capture the skill roll and resend it using the
				skillapi role-template. This will break out the success/complications.
				*/

				//decode the roll into its actual values; snippet from The Arron
				var cmsg = _.clone(msg);
				if(_.has(cmsg,'inlinerolls')){
        			cmsg.content = _.chain(cmsg.inlinerolls)
        				.reduce(function(m,v,k){
        					m['$[['+k+']]']=v.results.total || 0;
        					return m;
        				},{})
        				.reduce(function(m,v,k){
        					return m.replace(k,v);
        				},cmsg.content)
        				.value();
        		}

        		let a = content.replace(/{{/g,"").replace(/}} /g,"}}").split("}}");
        		let aclone = cmsg.content.replace(/{{/g,"").replace(/}} /g,"}}").split("}}");
        		//sendChat("aclone", "aclone"+aclone);

                //get these values from content
				let skill_name =  findInArray(a,"skill_name","");
				let character_name =  findInArray(a,"character_name","");
				let wounds =  findInArray(a,"wounds",0);
				let wounds_treated =  findInArray(a,"wounds_treated",0);
				let trauma =  findInArray(a,"trauma",0);
				let trauma_treated =  findInArray(a,"trauma_treated",0);
				let expertise =  findInArray(a,"expertise",0);
				let skilled_roll_index = findInArray(a,"successes1",0);
				let unskilled_roll_index = findInArray(a,"successes2",0);
				let show_tn =  findInArray(aclone,"show_tn",0);
				
				//get these actual roll values from the converted clone
				let expertise_chk =  findInArray(aclone,"expertise_chk",0);
				let wounds_chk =  findInArray(aclone,"wounds_chk",0);
				let trauma_chk =  findInArray(aclone,"trauma_chk",-1);  //use this to determine if physical of mental skill
				let encumbered_chk =  findInArray(aclone,"encumbered",0);
				let num_dice =  findInArray(aclone,"num_dice",0);
				let target_number =  findInArray(aclone,"target_number",0);
				let bk_nbr =  findInArray(aclone,"bk_nbr",3);
				let api_chk =  findInArray(aclone,"api_chk",1);

				let fail_count = libInline.getDice(msg.inlinerolls[0], 'fumble').length;
				let crit_count = libInline.getDice(msg.inlinerolls[0], 'crit').length;
				let total_successes = getInteger(findInArray(aclone,"successes1",0));

				if(expertise_chk == 0){
					//use unskilled roll (successes2)
				    total_successes = getInteger(findInArray(aclone,"successes2",0));
				    fail_count = 0 + libInline.getDice(msg.inlinerolls[1], 'fumble').length;
				    crit_count = 0 + libInline.getDice(msg.inlinerolls[1], 'crit').length;
				}
				
				total_successes += crit_count;

                let roll_msg = "&{template:skillapi} {{skill_name="+skill_name+"}} {{character_name="+character_name+"}} {{successes1="+libInline.getRollTip(msg.inlinerolls[skilled_roll_index])+"}}{{successes2="+libInline.getRollTip(msg.inlinerolls[unskilled_roll_index])+"}}{{num_dice="+num_dice+"}} {{target_number="+target_number+"}}{{expertise_chk=[["+expertise_chk+"]]}}{{expertise="+expertise+"}}{{crit_chk=[["+crit_count+"]]}}{{fail_chk=[["+fail_count+"]]}}{{crit_count="+crit_count+"}}{{fail_count="+fail_count+"}}{{total_successes="+total_successes+"}}{{api_chk=[[1]]}}{{bk_nbr=[["+bk_nbr+"]]}}";    

				if (show_tn > 0)
					roll_msg += "{{show_tn="+show_tn+"}}";

                if (trauma_chk > -1)
                    //tramuma based roll
                    roll_msg += "{{trauma_chk=[["+trauma_chk+"]]}}{{trauma="+trauma+"}}{{trauma_treated="+trauma_treated+"}}";
                else
                    //physcical based roll
                    roll_msg += "{{wounds_chk=[["+wounds_chk+"]]}}{{wounds="+wounds+"}}{{wounds_treated="+wounds_treated+"}}{{encumbered=[["+encumbered_chk+"]]}}";

				if (api_chk > 0)	//only sending to skillapi template if chk value greater than zero
                	sendChat(msg.who, roll_msg);

            }
                
			if (msg.rolltemplate == "skill" && content.indexOf("skill_name=Melee") > -1) {
				startCombatToken(msg.who);
			}

			//Checking the skillapi call to see if there were multiple complications.
            //Doing a sendChat based on skillapi and not skill will enforce that the conan double trouble chat display 
            //follows the initial roll display.
            if(msg.rolltemplate == "skillapi" && msg.inlinerolls) {
                let a = content.replace(/{{/g,"").replace(/}} /g,"}}").split("}}");
                let fail_count =  findInArray(a,"fail_count",0);
                if(fail_count > 1)
                    sendChat("Conan","&{template:conan-default} {{title=DOUBLE TROUBLE !!!}} {{subtitle1="+msg.who+" rolled MULTIPLE complications!!!}}");
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

