// Github:   https://github.com/shdwjk/Roll20API/blob/master/Ammo/Ammo.js
// By:       The Aaron, Arcane Scriptomancer
// Contact:  https://app.roll20.net/users/104025/the-aaron

var Ammo = Ammo || (function() {
    'use strict';

    var version = 0.22,
		schemaVersion = 0.1,

	ch = function (c) {
		var entities = {
			'<' : 'lt',
			'>' : 'gt',
			"'" : '#39',
			'@' : '#64',
			'{' : '#123',
			'|' : '#124',
			'}' : '#125',
			'[' : '#91',
			']' : '#93',
			'"' : 'quot',
			'-' : 'mdash',
			' ' : 'nbsp'
		};

		if(_.has(entities,c) ){
			return ('&'+entities[c]+';');
		}
		return '';
	},
	sendMessage = function(message, who) {
		sendChat('Ammo', (who ? ('/w '+who+' ') : '') + '<div style="padding:1px 3px;border: 1px solid #8B4513;background: #eeffee; color: #8B4513; font-size: 80%;">'
			+message
			+'</div>'
		);
	},

	adjustAmmo = function (playerid,attr,amount) {
		var val = parseInt(attr.get('current'),10)||0,
			max = parseInt(attr.get('max'),10)||10000,
			adj = (val+amount),
			chr = getObj('character',attr.get('characterid')),
			valid = true;

		if(adj < 0 ) {
			sendMessage(
				'<b>'+chr.get('name') + '</b> does not have enough ammo.  Needs '+Math.abs(amount)+', but only has '
				+'<span style="color: #ff0000;">'+val+'</span>.'
				+'<span style="font-weight:normal;color:#708090;>'+ch('[')+'Attribute: '+attr.get('name')+ch(']')+'</span>',
				(isGM(playerid) ? 'gm' : false)
			);
			valid = false;
		} else if( adj > max) {
			sendMessage(
				'<b>'+chr.get('name') + '</b> does not have enough storage space for ammo.  Needs '+adj+', but only has '
				+'<span style="color: #ff0000;">'+max+'</span>.'
				+'<span style="font-weight:normal;color:#708090;>'+ch('[')+'Attribute: '+attr.get('name')+ch(']')+'</span>',
				(isGM(playerid) ? 'gm' : false)
			);
			valid = false;
		}

		if( isGM(playerid) || valid ) {
			attr.set({current: adj});
			sendMessage(
				'<b>'+chr.get('name') + '</b> '+( (adj<val) ? 'uses' : 'gains' )+' '+Math.abs(amount)+' ammo and has '+adj+' remaining.',
				(isGM(playerid) ? 'gm' : false)
			);
			if(!valid) {
				sendMessage(
					'Ignoring warnings and applying adjustment anyway.  Was: '+val+'/'+max+' Now: '+adj+'/'+max,
					(isGM(playerid) ? 'gm' : false)
				);
			}
		}
	},

	showHelp = function(playerid) {
		var who=getObj('player',playerid).get('_displayname').split(' ')[0];

        sendChat('',
            '/w '+who+' '
+'<div style="border: 1px solid black; background-color: white; padding: 3px 3px;">'
	+'<div style="font-weight: bold; border-bottom: 1px solid black;font-size: 130%;">'
		+'Ammo v'+version
	+'</div>'
	+'<div style="padding-left:10px;margin-bottom:3px;">'
		+'<p>Ammo provides inventory management for ammunition stored in a character'
		+'attribute.  If the adjustment would change the attribute to be below 0 or above'
		+'it\'s maximum value, a warning will be issued and the attribute will not be'
		+'changed.</p>'

		+( (isGM(playerid)) ? '<p><b>Note:</b> As the GM, bounds will not be '
		+'enforced for you.  You will be whispered the warnings, but the operation '
		+'will succeed.  You will also be told the previous and current state in case '
		+'you want to revert the change.' : '')

	+'</div>'
	+'<b>Commands</b>'
	+'<div style="padding-left:10px;">'
		+'<b><span style="font-family: serif;">!ammo '+ch('<')+'id'+ch('>')+' '+ch('<')+'attribute'+ch('>')+' '+ch('<')+'amount'+ch('>')+' </span></b>'
		+'<div style="padding-left: 10px;padding-right:20px">'
			+'This command requires 3 parameters:'
			+'<ul>'
				+'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'
					+'<b><span style="font-family: serif;">id</span></b> -- The id of the character which has the attribute.  You can pass this as '+ch('@')+ch('{')+'selected|token_id'+ch('}')+' and the character id will be pulled from represents field of the token.'
				+'</li> '
				+'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'
					+'<b><span style="font-family: serif;">attribute</span></b> -- The name of the attribute representing ammunition.'
				+'</li> '
				+'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'
					+'<b><span style="font-family: serif;">amount</span></b> -- The change to apply to the current quantity of ammo.  Use negative numbers to decrease the amount, and possitive numbers to increase it.'
				+'</li> '
			+'</ul>'
		+'</div>'
	+'</div>'
	+'<div style="padding-left:10px;">'
		+'<b><span style="font-family: serif;">!get-represents [token_id]</span></b>'
		+'<div style="padding-left: 10px;padding-right:20px">'
			+'This command will show the character id for the supplied token id, or will list the character ids for all the selected tokens.'
			+'<ul>'
				+'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'
					+'<b><span style="font-family: serif;">token_id</span></b> -- The id of the token to lookup, usually supplied with: '+ch('@')+ch('{')+'selected|token_id'+ch('}')
				+'</li> '
			+'</ul>'
		+'</div>'
	+'</div>'
+'</div>'
            );
    },

	HandleInput = function(msg_orig) {
		var msg = _.clone(msg_orig),
			args,attr,amount,chr,token,text='';

		if (msg.type !== "api") {
			return;
		}

		if(_.has(msg,'inlinerolls')){
			msg.content = _.chain(msg.inlinerolls)
				.reduce(function(m,v,k){
					m['$[['+k+']]']=v.results.total || 0;
					return m;
				},{})
				.reduce(function(m,v,k){
					return m.replace(k,v);
				},msg.content)
				.value();
		}

		args = msg.content.split(/\s+/);
		switch(args[0]) {
            case '!ammo':
				if(args.length > 1) {

					switch(args[1]) {
						case 'recover': // <character/token_id> <attribute_name>
							// apply policy to put amounts back in
						case 'check': // <character/token_id> <attribute_name>
							// print the amount in the attribute nicely formatted
						case 'recovery-policy': // [character/token_id] [attribute_name] <percentage>
							// create the right entry in the state
						case 'name': // [character/token_id] [attribute_name] <name>
							// create the right entry in the state

						// configs
						case 'recovery-updates-maximum': 
							// adjust the maximum to be whatever the current is
						case 'create-attributes-automatically': 
							// create the requested attribute and start using it.
					}


					chr = getObj('character', args[1]);
					if( ! chr ) {
						token = getObj('graphic', args[1]);
						if(token) {
							chr = getObj('character', token.get('represents'));
						}
					}
					if(chr) {
						if(! isGM(msg.playerid) 
							&& ! _.contains(chr.get('controlledby').split(','),msg.playerid) 
							&& ! _.contains(chr.get('controlledby').split(','),'all') 
							)
						{
							sendMessage( 'You do not control the specified character: '+chr.id );
							sendMessage(
								'<b>'+getObj('player',msg.playerid).get('_displayname')+'</b> attempted to adjust attribute <b>'+args[2]+'</b> on character <b>'+chr.get('name')+'</b>.',
								'gm'
							);
							return;
						}


						attr = findObjs({_type: 'attribute', _characterid: chr.id, name: args[2]})[0];
					}
					amount=parseInt(args[3],10);
					if(attr && amount) {
						adjustAmmo(msg.playerid,attr,amount);
					} else {
						if(attr) {
							sendMessage(
								'Amount ['+args[3]+'] is not correct.  Please specify a positive or negative integer value like -1 or 4.',
								(isGM(msg.playerid) ? 'gm' : false)
							);

						} else {
							if(chr) {
								sendMessage(
									'Attribute ['+args[2]+'] was not found.  Please verify that you have the right name.',
									(isGM(msg.playerid) ? 'gm' : false)
								);
							} else {
								sendMessage(
									( (undefined !== token) ? ('Token id ['+args[1]+'] does not represent a character. ') : ('Character/Token id ['+args[1]+'] is not valid. ') )
									+'Please be sure you are specifying it correctly, either with '+ch('@')+ch('{')+'selected|token_id'+ch('}')+' or copying the character id from: !get-represents '+ch('@')+ch('{')+'selected|token_id'+ch('}'),
									(isGM(msg.playerid) ? 'gm' : false)
								);
							}
						}
					}
				} else {
					showHelp(msg.playerid);
				}
                break;

			case '!get-represents':
				if(args.length > 1) {
					chr = getObj('character', args[1]);
					if( ! chr ) {
						token = getObj('graphic', args[1]);
						if(token) {
							sendMessage(
									'The specified token represents the following character:'
									+'<ul><li>'+ ( ('' !== token.get('name')) ? token.get('name') : 'BLANK' )+' -> '+ ( ('' !== token.get('represents')) ? token.get('represents') : 'NOTHING' ) + '</li></ul>',
								(isGM(msg.playerid) ? 'gm' : false)
							);
						} else {
							sendMessage(
								' Token id ['+args[1]+'] is not valid.',
								(isGM(msg.playerid) ? 'gm' : false)
							);
						}
					}
				} else if (msg.selected && msg.selected.length) {
					_.each(msg.selected, function(s) {
						token = getObj('graphic', s._id);
						if(token) {
							text += '<li>'+ ( ('' !== token.get('name')) ? token.get('name') : 'BLANK' )+' -> '+ ( ('' !== token.get('represents')) ? token.get('represents') : 'NOTHING' ) + '</li>';
						}
					});
					sendMessage(
						'The selected tokens represent the following characters:'+'<ul>' + text + '</ul>',
						(isGM(msg.playerid) ? 'gm' : false)
					);
				} else {
					showHelp(msg.playerid);
				}
				break;
		}

	},
    checkInstall = function() {    
        if( ! _.has(state,'Ammo') || state.Ammo.version !== schemaVersion) {
            state.Ammo = {
				version: schemaVersion,
				config: {
				},
				policies: {
					global: {
						recoveryUpdatesMaximum: false
					},
					byAttribute: {
					},
					byCharacter: {
					}
				}
			};
		}
	},

	RegisterEventHandlers = function() {
		on('chat:message', HandleInput);
	};

	return {
        CheckInstall: checkInstall,
		RegisterEventHandlers: RegisterEventHandlers
	};
}());

on("ready",function(){
	'use strict';

    if("undefined" !== typeof isGM && _.isFunction(isGM)) {
        Ammo.CheckInstall();
        Ammo.RegisterEventHandlers();
    } else {
        log('--------------------------------------------------------------');
        log('Ammo requires the isGM module to work.');
        log('isGM GIST: https://gist.github.com/shdwjk/8d5bb062abab18463625');
        log('--------------------------------------------------------------');
    }
});