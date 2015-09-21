// Github:   https://github.com/shdwjk/Roll20API/blob/master/TurnMarker1/TurnMarker.js
// By:       The Aaron, Arcane Scriptomancer
// Contact:  https://app.roll20.net/users/104025/the-aaron

/*  ############################################################### */
/*  TurnMarker */
/*  ############################################################### */

var TurnMarker = TurnMarker || {
    version: 1.22,
    schemaVersion: 1.16,
    active: false,
    threadSync: 1,

    CheckInstall: function() {    
        if( ! state.hasOwnProperty('TurnMarker') || state.TurnMarker.version != TurnMarker.schemaVersion)
        {
            /* Default Settings stored in the state. */
            state.TurnMarker = {
                version: TurnMarker.version,
                announceRounds: true,
                announceTurnChange: true,
                announcePlayerInTurnAnnounce: true,
                announcePlayerInTurnAnnounceSize: '100%',
                autoskipHidden: true,
                tokenName: 'Round',
                tokenURL: 'https://s3.amazonaws.com/files.d20.io/images/4095816/086YSl3v0Kz3SlDAu245Vg/thumb.png?1400535580',
                playAnimations: false,
                rotation: false,
                animationSpeed: 5,
                scale: 1.7,
                aura1: {
                    pulse: false,
                    size: 5,
                    color: '#ff00ff'
                },
                aura2: {
                    pulse: false,
                    size: 5,
                    color: '#00ff00'
                }
            }
        }
        if(Campaign().get('turnorder') =='')
        {
            Campaign().set('turnorder','[]');
        }
    },

    GetMarker: function(){  
        var marker = findObjs({
            imgsrc: state.TurnMarker.tokenURL,
            pageid: Campaign().get("playerpageid")    
        })[0];

        if (marker === undefined) {
            marker = createObj('graphic', {
                name: state.TurnMarker.tokenName+' 0',
                pageid: Campaign().get("playerpageid"),
                layer: 'gmlayer',
                imgsrc: state.TurnMarker.tokenURL,
                left: 0,
                top: 0,
                height: 70,
                width: 70,
                bar2_value: 0,
            	showplayers_name: true,
                showplayers_aura1: true,
                showplayers_aura2: true
            });
            marker=fixNewObject(marker);
        }
        if(!TurnOrder.HasTurn(marker.id))
        {
            TurnOrder.AddTurn({
                id: marker.id,
                pr: -1,
                custom: "",
                pageid: marker.get('pageid')
            });
        }
        return marker;    
    },

    Step: function( sync ){
        if (!state.TurnMarker.playAnimations || sync != TurnMarker.threadSync)
        {
            return;
        }
        var marker=TurnMarker.GetMarker();
        if(TurnMarker.active === true)
        {
            var rotation=(marker.get('bar1_value')+state.TurnMarker.animationSpeed)%360;
            marker.set('bar1_value', rotation );
            if(state.TurnMarker.rotation)
            {
                marker.set( 'rotation', rotation );
            }
            if( state.TurnMarker.aura1.pulse )
            {
                marker.set('aura1_radius', Math.abs(Math.sin(rotation * (Math.PI/180))) * state.TurnMarker.aura1.size );
            }
            else
            {
                marker.set('aura1_radius','');
            }
            if( state.TurnMarker.aura2.pulse  )
            {
                marker.set('aura2_radius', Math.abs(Math.cos(rotation * (Math.PI/180))) * state.TurnMarker.aura2.size );
            }
            else
            {
                marker.set('aura2_radius','');
            }
            setTimeout(_.bind(TurnMarker.Step,this,sync), 100);
        }
    },

    Reset: function() {
        TurnMarker.active=false;
        TurnMarker.threadSync++;

        var marker = TurnMarker.GetMarker();
        
        marker.set({
            layer: "gmlayer",
            aura1_radius: '',
            aura2_radius: '',
            left: 35,
            top: 35,
            height: 70,
            width: 70,
            rotation: 0,
            bar1_value: 0
        });
    },

    Start: function() {
        var marker = TurnMarker.GetMarker();
     

		if(state.TurnMarker.playAnimations && state.TurnMarker.aura1.pulse)
		{
			marker.set({
				aura1_radius: state.TurnMarker.aura1.size,
				aura1_color: state.TurnMarker.aura1.color,
			});   
		}
		if(state.TurnMarker.playAnimations && state.TurnMarker.aura2.pulse)
		{
			marker.set({
				aura2_radius: state.TurnMarker.aura2.size,
				aura2_color: state.TurnMarker.aura2.color,
			});   
		}
        TurnMarker.active=true;
        TurnMarker.Step(TurnMarker.threadSync);
        TurnMarker.TurnOrderChange(false);
    },

    HandleInput: function(tokens,who){
        switch (tokens[0])
        {
            case 'reset':
				var marker = TurnMarker.GetMarker();
				marker.set({
					name: state.TurnMarker.tokenName+' '+0,
					bar2_value: 0
				});
				sendChat('','/w '+who+' <b>Round</b> count is reset to <b>0</b>.');
                break;
                
            case 'toggle-announce':
				state.TurnMarker.announceRounds=!state.TurnMarker.announceRounds;
				sendChat('','/w '+who+' <b>Announce Rounds</b> is now <b>'+(state.TurnMarker.announceRounds ? 'ON':'OFF' )+'</b>.');
				break;

            case 'toggle-announce-turn':
				state.TurnMarker.announceTurnChange=!state.TurnMarker.announceTurnChange;
				sendChat('','/w '+who+' <b>Announce Turn Changes</b> is now <b>'+(state.TurnMarker.announceTurnChange ? 'ON':'OFF' )+'</b>.');
				break;

            case 'toggle-announce-player':
				state.TurnMarker.announcePlayerInTurnAnnounce=!state.TurnMarker.announcePlayerInTurnAnnounce;
				sendChat('','/w '+who+' <b>Player Name in Announce</b> is now <b>'+(state.TurnMarker.announcePlayerInTurnAnnounce ? 'ON':'OFF' )+'</b>.');
				break;

            case 'toggle-skip-hidden':
				state.TurnMarker.autoskipHidden=!state.TurnMarker.autoskipHidden;
				sendChat('','/w '+who+' <b>Auto-skip Hidden</b> is now <b>'+(state.TurnMarker.autoskipHidden ? 'ON':'OFF' )+'</b>.');
				break;

            case 'toggle-animations':
				state.TurnMarker.playAnimations=!state.TurnMarker.playAnimations;
				if(state.TurnMarker.playAnimations)
				{
					TurnMarker.Step(TurnMarker.threadSync);
				}
				else
				{
					var marker = TurnMarker.GetMarker();
					marker.set({
						aura1_radius: '',
						aura2_radius: '',
					});
				}

				sendChat('','/w '+who+' <b>Animations</b> are now <b>'+(state.TurnMarker.playAnimations ? 'ON':'OFF' )+'</b>.');
                break;

            case 'toggle-rotate':
				state.TurnMarker.rotation=!state.TurnMarker.rotation;
				sendChat('','/w '+who+' <b>Rotation</b> is now <b>'+(state.TurnMarker.rotation ? 'ON':'OFF' )+'</b>.');
				break;

            case 'toggle-aura-1':
				state.TurnMarker.aura1.pulse=!state.TurnMarker.aura1.pulse;
				sendChat('','/w '+who+' <b>Aura 1</b> is now <b>'+(state.TurnMarker.aura1.pulse ? 'ON':'OFF' )+'</b>.');
				break;

            case 'toggle-aura-2':
				state.TurnMarker.aura2.pulse=!state.TurnMarker.aura2.pulse;
				sendChat('','/w '+who+' <b>Aura 2</b> is now <b>'+(state.TurnMarker.aura2.pulse ? 'ON':'OFF' )+'</b>.');
				break;

                
            default:
            case 'help':
                TurnMarker.Help(who);
                break;
                
        }
    },
    
    Help: function(who){
		var marker = TurnMarker.GetMarker();
		var rounds =parseInt(marker.get('bar2_value'));
        sendChat('',
            '/w '+who+' '
+'<div style="border: 1px solid black; background-color: white; padding: 3px 3px;">'
	+'<div style="font-weight: bold; border-bottom: 1px solid black;font-size: 130%;">'
		+'TurnMarker v'+TurnMarker.version
	+'</div>'
	+'<b>Commands</b>'
	+'<div style="padding-left:10px;"><b><span style="font-family: serif;">!tm</span></b>'
		+'<div style="padding-left: 10px;padding-right:20px">'
			+'The following arguments may be supplied in order to change the configuration.  All changes are persisted between script restarts.'
			+'<ul>'
					+'<div style="float:right;width:40px;border:1px solid black;background-color:#ffc;text-align:center;"><span style="color: blue; font-weight:bold; padding: 0px 4px;">'+rounds+'</span></div>'
				+'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;"><b><span style="font-family: serif;">reset</span></b> -- Sets the round counter back to 0.</li> '
					+'<div style="float:right;width:40px;border:1px solid black;background-color:#ffc;text-align:center;">'+( state.TurnMarker.announceRounds ? '<span style="color: red; font-weight:bold; padding: 0px 4px;">ON</span>' : '<span style="color: #999999; font-weight:bold; padding: 0px 4px;">OFF</span>' )+'</div>'
				+'<li style="border-bottom: 1px solid #ccc;"><b><span style="font-family: serif;">toggle-announce</span></b> -- When on, each round will be announced to chat.</li>'
					+'<div style="float:right;width:40px;border:1px solid black;background-color:#ffc;text-align:center;">'+( state.TurnMarker.announceTurnChange ? '<span style="color: red; font-weight:bold; padding: 0px 4px;">ON</span>' : '<span style="color: #999999; font-weight:bold; padding: 0px 4px;">OFF</span>' )+'</div>'
				+'<li style="border-bottom: 1px solid #ccc;"><b><span style="font-family: serif;">toggle-announce-turn</span></b> -- When on, the transition between visible turns will be announced.</li> '
					+'<div style="float:right;width:40px;border:1px solid black;background-color:#ffc;text-align:center;">'+( state.TurnMarker.announcePlayerInTurnAnnounce ? '<span style="color: red; font-weight:bold; padding: 0px 4px;">ON</span>' : '<span style="color: #999999; font-weight:bold; padding: 0px 4px;">OFF</span>' )+'</div>'
				+'<li style="border-bottom: 1px solid #ccc;"><b><span style="font-family: serif;">toggle-announce-player</span></b> -- When on, the player(s) controlling the current turn are included in the turn announcement.</li> '
					+'<div style="float:right;width:40px;border:1px solid black;background-color:#ffc;text-align:center;">'+( state.TurnMarker.autoskipHidden ? '<span style="color: red; font-weight:bold; padding: 0px 4px;">ON</span>' : '<span style="color: #999999; font-weight:bold; padding: 0px 4px;">OFF</span>' )+'</div>'
				+'<li style="border-bottom: 1px solid #ccc;"><b><span style="font-family: serif;">toggle-skip-hidden</span></b> -- When on, turn order will automatically be advanced past any hidden turns.</li> '
					+'<div style="float:right;width:40px;border:1px solid black;background-color:#ffc;text-align:center;">'+( state.TurnMarker.playAnimations ? '<span style="color: red; font-weight:bold; padding: 0px 4px;">ON</span>' : '<span style="color: #999999; font-weight:bold; padding: 0px 4px;">OFF</span>' )+'</div>'
				+'<li style="border-bottom: 1px solid #ccc;"><b><span style="font-family: serif;">toggle-animations</span></b> -- Turns on turn marker animations. [Experimental!]</li> '
					+'<div style="float:right;width:40px;border:1px solid black;background-color:#ffc;text-align:center;">'+( state.TurnMarker.rotation ? '<span style="color: red; font-weight:bold; padding: 0px 4px;">ON</span>' : '<span style="color: #999999; font-weight:bold; padding: 0px 4px;">OFF</span>' )+'</div>'
				+'<li style="border-bottom: 1px solid #ccc;"><b><span style="font-family: serif;">toggle-rotate</span></b> -- When on, the turn marker will rotate slowly clockwise. [Animation]</li> '
					+'<div style="float:right;width:40px;border:1px solid black;background-color:#ffc;text-align:center;">'+( state.TurnMarker.aura1.pulse ? '<span style="color: red; font-weight:bold; padding: 0px 4px;">ON</span>' : '<span style="color: #999999; font-weight:bold; padding: 0px 4px;">OFF</span>' )+'</div>'
				+'<li style="border-bottom: 1px solid #ccc;"><b><span style="font-family: serif;">toggle-aura-1</span></b> -- When on, aura 2 will pulse in and out. [Animation]</li> '
					+'<div style="float:right;width:40px;border:1px solid black;background-color:#ffc;text-align:center;">'+( state.TurnMarker.aura2.pulse ? '<span style="color: red; font-weight:bold; padding: 0px 4px;">ON</span>' : '<span style="color: #999999; font-weight:bold; padding: 0px 4px;">OFF</span>' )+'</div>'
				+'<li style="border-bottom: 1px solid #ccc;"><b><span style="font-family: serif;">toggle-aura-2</span></b> -- When on, aura 2 will pulse in and out. [Animation]</li> '
			+'</ul>'
		+'</div>'
	+'</div>'
	+'<div style="padding-left:10px;"><b><span style="font-family: serif;">!eot</span></b>'
		+'<div style="padding-left: 10px;padding-right:20px;">'
			+'Players may execute this command to advance the initiative to the next turn.  This only succeeds if the current token is one that the caller controls or if it is executed by a GM.'
		+'</div>'
	+'</div>'
+'</div>'
            );
    },
    
    CheckForTokenMove: function(obj){
        if(TurnMarker.active)
        {
			var turnOrder = TurnOrder.Get();
			var current = _.first(turnOrder);
			if( obj && current && current.id == obj.id)
			{
			   TurnMarker.threadSync++;
				
				var marker = TurnMarker.GetMarker();
				marker.set({
					"top": obj.get("top"),
					"left": obj.get("left")
				});
				
			   setTimeout(_.bind(TurnMarker.Step,this,TurnMarker.threadSync), 300);
			}
		}
    },
    
    RequestTurnAdvancement: function(playerid){
		if(TurnMarker.active)
		{
			var turnOrder = TurnOrder.Get();
			var current = getObj('graphic',_.first(turnOrder).id);
			var character = getObj('character',current.get('represents'));
			if(isGM(playerid) 
				|| ( undefined != current &&
					   ( _.contains(current.get('controlledby').split(','),playerid)
					   || _.contains(current.get('controlledby').split(','),'all') )
					)
				|| ( undefined != character &&
					   ( _.contains(character.get('controlledby').split(','),playerid)
					   || _.contains(character.get('controlledby').split(','),'all') )
					)
				)
			{
				TurnOrder.Next();
				TurnMarker.TurnOrderChange(true);
			}
		}
    },

	_AnnounceRound: function(round){
		if(state.TurnMarker.announceRounds)
		{
			sendChat(
				'', 
				"/direct "
				+"<div style='"
					+'background-color: #4B0082;'
					+'border: 3px solid #808080;'
					+'font-size: 20px;'
					+'text-align:center;'
					+'vertical-align: top;'
					+'color: white;'
					+'font-weight:bold;'
					+'padding: 5px 5px;'
				+"'>"
					+"<img src='"+state.TurnMarker.tokenURL+"' style='width:20px; height:20px; padding: 0px 5px;' />"
					+"Round "+ round 
					+"<img src='"+state.TurnMarker.tokenURL+"' style='width:20px; height:20px; padding: 0px 5px;' />"
				+"</div>"
			);
		}
	},
	_HandleMarkerTurn: function(){
        var marker = TurnMarker.GetMarker();
        var turnOrder = TurnOrder.Get();

        if(turnOrder[0].id == marker.id)
		{
			var round=parseInt(marker.get('bar2_value'))+1;
			marker.set({
				name: state.TurnMarker.tokenName+' '+round,
				bar2_value: round
			});
			TurnMarker._AnnounceRound(round);
			TurnOrder.Next();
		}
	},
	_HandleAnnounceTurnChange: function(){

        if(state.TurnMarker.announceTurnChange )
        {
			var marker = TurnMarker.GetMarker();
			var turnOrder = TurnOrder.Get();
			var currentToken = getObj("graphic", turnOrder[0].id);
			if('gmlayer' == currentToken.get('layer'))
			{
				return;
			}
            var previousTurn=_.last(_.filter(turnOrder,function(element){
                var token=getObj("graphic", element.id);
                return ((undefined != token)
                    && (token.get('layer')!='gmlayer')
                    && (element.id != marker.id));
            }));
            
            /* find previous token. */
            var previousToken = getObj("graphic", previousTurn.id);
            var pImage=previousToken.get('imgsrc');
            var cImage=currentToken.get('imgsrc');
            var pRatio=previousToken.get('width')/previousToken.get('height');
            var cRatio=currentToken.get('width')/currentToken.get('height');
            
            var pNameString="The Previous turn is done.";
            if(previousToken && previousToken.get('showplayers_name'))
            {
                pNameString='<span style=\''
                        +'font-family: Baskerville, "Baskerville Old Face", "Goudy Old Style", Garamond, "Times New Roman", serif;'
                        +'text-decoration: underline;'
                        +'font-size: 130%;'                        
                    +'\'>'
                        +previousToken.get('name')
                    +'</span>\'s turn is done.';                
            }
            
            var cNameString='The next turn has begun!';
            if(currentToken && currentToken.get('showplayers_name'))
            {
                cNameString='<span style=\''
                    +'font-family: Baskerville, "Baskerville Old Face", "Goudy Old Style", Garamond, "Times New Roman", serif;'
                    +'text-decoration: underline;'
                    +'font-size: 130%;'
                +'\'>'
                    +currentToken.get('name')
                +'</span>, it\'s now your turn!';
            }
 
            
            var PlayerAnnounceExtra='';
            if(state.TurnMarker.announcePlayerInTurnAnnounce)
            {
                var Char=currentToken.get('represents');
                if('' != Char)
                {
                    var Char=getObj('character',Char);
					if(Char && _.isFunction(Char.get))
					{
						var Controllers=Char.get('controlledby').split(',');
						_.each(Controllers,function(c){
							switch(c)
							{
								case 'all':
									PlayerAnnounceExtra+='<div style="'
											+'padding: 0px 5px;'
											+'font-weight: bold;'
											+'text-align: center;'
											+'font-size: '+state.TurnMarker.announcePlayerInTurnAnnounceSize+';'
											+'border: 5px solid black;'
											+'background-color: white;'
											+'color: black;'
											+'letter-spacing: 3px;'
											+'line-height: 130%;'
										+'">'
											+'All'
										+'</div>';
									break;
									break;
								default:
									var player=getObj('player',c);
                                    if(player) {
    									var PlayerColor=player.get('color');
    									var PlayerName=player.get('displayname');
    									PlayerAnnounceExtra+='<div style="'
    											+'padding: 5px;'
    											+'text-align: center;'
    											+'font-size: '+state.TurnMarker.announcePlayerInTurnAnnounceSize+';'
    											+'background-color: '+PlayerColor+';'
    											+'text-shadow: '
    												+'-1px -1px 1px #000,'
    												+' 1px -1px 1px #000,'
    												+'-1px  1px 1px #000,'
    												+' 1px  1px 1px #000;'
    											+'letter-spacing: 3px;'
    											+'line-height: 130%;'
    										+'">'
    											+PlayerName
    										+'</div>';
                                    }
									break;
							}
						});
					}
                }
            }
            
            var tokenSize=70;
            sendChat(
                '', 
                "/direct "
                +"<div style='border: 3px solid #808080; background-color: #4B0082; color: white; padding: 1px 1px;'>"
                    +'<div style="text-align: left;  margin: 5px 5px;">'
                        +"<img src='"+pImage+"' style='float:left; width:"+Math.round(tokenSize*pRatio)+"px; height:"+tokenSize+"px; padding: 0px 2px;' />"
                        + pNameString
                    +'</div>'
                    +'<div style="text-align: right; margin: 5px 5px; position: relative; vertical-align: text-bottom;">'
                        +"<img src='"+cImage+"' style='float:right; width:"+Math.round(tokenSize*cRatio)+"px; height:"+tokenSize+"px; padding: 0px 2px;' />"
                        + '<span style="position:absolute; bottom: 0;right:'+Math.round((tokenSize*cRatio)+6)+'px;">'
                            +cNameString
                        + '</span>'
                        +'<div style="clear:both;"></div>'
                    +'</div>'
                     +PlayerAnnounceExtra
                +"</div>"
            );
        }
	},

    TurnOrderChange: function(FirstTurnChanged){
        var marker = TurnMarker.GetMarker();
                    
        if(Campaign().get('initiativepage') === false)
        {
            return;
        }
        
        var turnOrder = TurnOrder.Get();
        
        if (!turnOrder.length) return;

        var current = _.first(turnOrder);

		if(state.TurnMarker.playAnimations)
		{
			TurnMarker.threadSync++;
			setTimeout(_.bind(TurnMarker.Step,this,TurnMarker.threadSync), 300);
		}
        
        if (current.id == "-1") return;
      
		TurnMarker._HandleMarkerTurn();

        if(state.TurnMarker.autoskipHidden)
        {
            TurnOrder.NextVisible();
			TurnMarker._HandleMarkerTurn();
        }

		turnOrder=TurnOrder.Get();

        if(turnOrder[0].id == marker.id)
        {
            return;
        }

        current = _.first(TurnOrder.Get());
        
        var currentToken = getObj("graphic", turnOrder[0].id);
		if(undefined != currentToken)
		{

			if(FirstTurnChanged)
			{
				TurnMarker._HandleAnnounceTurnChange();
			}
			
			var size = Math.max(currentToken.get("height"),currentToken.get("width")) * state.TurnMarker.scale;
			  
			if (marker.get("layer") == "gmlayer" && currentToken.get("layer") != "gmlayer") {
				marker.set({
					"top": currentToken.get("top"),
					"left": currentToken.get("left"),
					"height": size,
					"width": size
				});
				setTimeout(function() {
					marker.set({
						"layer": currentToken.get("layer")
					});    
				}, 500);
			} else {
				marker.set({
					"layer": currentToken.get("layer"),
					"top": currentToken.get("top"),
					"left": currentToken.get("left"),
					"height": size,
					"width": size
				});   
			}
			toFront(currentToken);
		}
    },
    
    DispatchInitiativePage: function(){
        if(Campaign().get('initiativepage') === false)
        {
            this.Reset();
        }
        else
        {
            this.Start();
        }
    },

    RegisterEventHandlers: function(){        
        on("change:campaign:initiativepage", function(obj, prev) {
            TurnMarker.DispatchInitiativePage();
        });

        on("change:campaign:turnorder", function(obj, prev) {
			var prevOrder=JSON.parse(prev.turnorder);
			var objOrder=JSON.parse(obj.get('turnorder'));

			if( undefined !=prevOrder
			 && undefined !=objOrder
		  	 && _.isArray(prevOrder)
		  	 && _.isArray(objOrder)
		  	 && 0 != prevOrder.length
		  	 && 0 != objOrder.length
			 && objOrder[0].id != prevOrder[0].id
			  )
			{
				TurnMarker.TurnOrderChange(true);
			}
        });
        
        on("change:graphic", function(obj,prev) {
            TurnMarker.CheckForTokenMove(obj);
        });

        on("chat:message", function (msg) {
            /* Exit if not an api command */
            if (msg.type != "api") return;
            
            /* clean up message bits. */
            msg.who = msg.who.replace(" (GM)", "");
            msg.content = msg.content.replace("(GM) ", "");

			// get minimal player name (hopefully unique!)
			var who=getObj('player',msg.playerid).get('_displayname').split(' ')[0];

            var tokenized = msg.content.split(" ");
            var command = tokenized[0];

            switch(command)
            {
                case "!tm":
                case "!turnmarker":
                    {
                        TurnMarker.HandleInput(_.rest(tokenized),who);
                    }
                    break;
                
                case "!eot":
                    {
                        TurnMarker.RequestTurnAdvancement(msg.playerid);   
                    }
                    break;
            }
        });
    }

};






on("ready",function(){
	'use strict';

    var Has_IsGM=false;
    try {
        _.isFunction(isGM);
        Has_IsGM=true;
    }
    catch (err)
    {
        log('--------------------------------------------------------------');
        log('TurnMarker requires the isGM module to work.');
        log('isGM GIST: https://gist.github.com/shdwjk/8d5bb062abab18463625');
        log('--------------------------------------------------------------');
    }

    if( Has_IsGM )
    {
        TurnMarker.CheckInstall(); 
        TurnMarker.RegisterEventHandlers();
        TurnMarker.DispatchInitiativePage();
    }
});

// Utility Function
var fixNewObject = fixNewObject || function(obj){
    var p = obj.changed._fbpath;
    var new_p = p.replace(/([^\/]*\/){4}/, "/");
    obj.fbpath = new_p;
    return obj;
}


var TurnOrder = TurnOrder || {
    Get: function(){
		var to=Campaign().get("turnorder");
		to=(''===to ? '[]' : to); 
        return JSON.parse(to);
    },
    Set: function(turnOrder){
        Campaign().set({turnorder: JSON.stringify(turnOrder)});
    },
    Next: function(){
        this.Set(TurnOrder.Get().rotate(1));
        if("undefined" !== typeof Mark && _.has(Mark,'Reset') && _.isFunction(Mark.Reset)) {
            Mark.Reset();
        }
    },
    NextVisible: function(){
        var turns=this.Get();
        var context={skip: 0};
        var found=_.find(turns,function(element){
            var token=getObj("graphic", element.id);
            if(
                (undefined !== token) 
                && (token.get('layer')!='gmlayer')
            )
            {
                return true;
            }
            else
            {
                this.skip++;
            }
        },context);
        if(undefined !== found && context.skip>0)
        {
            this.Set(turns.rotate(context.skip));
        }
    },
    HasTurn: function(id){
     return (_.filter(this.Get(),function(turn){
            return id == turn.id;
        }).length != 0);
    },
    AddTurn: function(entry){
        var turnorder = this.Get();
        turnorder.push(entry);
        this.Set(turnorder);
    }
}

Object.defineProperty(Array.prototype, 'rotate', {
	enumerable: false,
	writable: true
});

Array.prototype.rotate = (function() {
    var unshift = Array.prototype.unshift,
        splice = Array.prototype.splice;

    return function(count) {
        var len = this.length >>> 0,
            count = count >> 0;

        unshift.apply(this, splice.call(this, count % len, len));
        return this;
    };
})();