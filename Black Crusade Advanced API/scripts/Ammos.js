var Ammo = Ammo || (function() {
    'use strict';

    var version = '0.3.7',
        lastUpdate = 1490362793,
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
		sendChat('Ammo', (who ? ('/w '+who+' ') : '') + '<div style="padding:1px 3px;border: 1px solid #8B4513;background: #eeffee; color: #8B4513; font-size: 80%;">'+
			message+
			'</div>'
		);
	},

	adjustAmmo = function (who,attr,amount,label,playerid) {
		var val = parseInt(attr.get('current'),10)||0,
			max = parseInt(attr.get('max'),10)||10000,
			adj = (val+amount),
			chr = getObj('character',attr.get('characterid')),
			valid = true;
        label=label||'ammo';

		if(adj < 0 ) {
			sendMessage(
				'<b>'+chr.get('name') + '</b> does not have enough '+label+'.  Needs '+Math.abs(amount)+', but only has '+
				'<span style="color: #ff0000;">'+val+'</span>.'+
				'<span style="font-weight:normal;color:#708090;>'+ch('[')+'Attribute: '+attr.get('name')+ch(']')+'</span>',
                who
			);
			valid = false;
		} else if( adj > max) {
			sendMessage(
				'<b>'+chr.get('name') + '</b> does not have enough storage space for '+label+'.  Needs '+adj+', but only has '+
				'<span style="color: #ff0000;">'+max+'</span>.'+
				'<span style="font-weight:normal;color:#708090;>'+ch('[')+'Attribute: '+attr.get('name')+ch(']')+'</span>',
                who
			);
			valid = false;
		}

		if( playerIsGM(playerid) || valid ) {
			attr.set({current: adj});
			sendMessage(
				'<b>'+chr.get('name') + '</b> '+( (adj<val) ? 'uses' : 'gains' )+' '+Math.abs(amount)+' '+label+' and has '+adj+' remaining.',
                who
			);
			if(!valid) {
				sendMessage(
					'Ignoring warnings and applying adjustment anyway.  Was: '+val+'/'+max+' Now: '+adj+'/'+max,
                    who
				);
			}
		}
	},

	showHelp = function(who,playerid) {

        sendChat('',
            '/w "'+who+'" '+
'<div style="border: 1px solid black; background-color: white; padding: 3px 3px;">'+
	'<div style="font-weight: bold; border-bottom: 1px solid black;font-size: 130%;">'+
		'Ammo v'+version+
	'</div>'+
	'<div style="padding-left:10px;margin-bottom:3px;">'+
		'<p>Ammo provides inventory management for ammunition stored in a character '+
		'attribute.  If the adjustment would change the attribute to be below 0 or above '+
		'it'+ch("'")+'s maximum value, a warning will be issued and the attribute will not be'+
		'changed.</p>'+

		( (playerIsGM(playerid)) ? '<p><b>Note:</b> As the GM, bounds will not be '+
		'enforced for you.  You will be whispered the warnings, but the operation '+
		'will succeed.  You will also be told the previous and current state in case '+
		'you want to revert the change.' : '')+

	'</div>'+
	'<b>Commands</b>'+
	'<div style="padding-left:10px;">'+
		'<b><span style="font-family: serif;">!ammo '+ch('<')+'id'+ch('>')+' '+ch('<')+'attribute'+ch('>')+' '+ch('<')+'amount'+ch('>')+' '+ch('[')+'resource name'+ch(']')+'</span></b>'+
		'<div style="padding-left: 10px;padding-right:20px">'+
			'This command requires 3 parameters:'+
			'<ul>'+
				'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'+
					'<b><span style="font-family: serif;">id</span></b> -- The id of the character which has the attribute.  You can pass this as '+ch('@')+ch('{')+'selected|token_id'+ch('}')+' and the character id will be pulled from represents field of the token.'+
				'</li> '+
				'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'+
					'<b><span style="font-family: serif;">attribute</span></b> -- The name of the attribute representing ammunition.'+
				'</li> '+
				'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'+
					'<b><span style="font-family: serif;">amount</span></b> -- The change to apply to the current quantity of ammo.  Use negative numbers to decrease the amount, and positive numbers to increase it.  You can use inline rolls to determine the number.'+
				'</li> '+
				'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'+
					'<b><span style="font-family: serif;">resource name</span></b> -- Anything you put after the amount to adjust by will be used as the resource name (default: "ammo").'+
				'</li> '+
			'</ul>'+
		'</div>'+
		'<b><span style="font-family: serif;">!wammo '+ch('<')+'id'+ch('>')+' '+ch('<')+'attribute'+ch('>')+' '+ch('<')+'amount'+ch('>')+' '+ch('[')+'resource name'+ch(']')+'</span></b>'+
		'<div style="padding-left: 10px;padding-right:20px">'+
			'This command is identical to !ammo but will whisper all output.'+
		'</div>'+
	'</div>'+
'</div>'
            );
    },

    attrLookup = function(character,name,caseSensitive){
        let match=name.match(/^(repeating_.*)_\$(\d+)_.*$/);
        if(match){
            let index=match[2],
                attrMatcher=new RegExp(`^${name.replace(/_\$\d+_/,'_([-\\da-zA-Z]+)_')}$`,(caseSensitive?'i':'')),
                createOrderKeys=[],
                attrs=_.chain(findObjs({type:'attribute', characterid:character.id}))
                    .map((a)=>{
                        return {attr:a,match:a.get('name').match(attrMatcher)};
                    })
                    .filter((o)=>o.match)
                    .each((o)=>createOrderKeys.push(o.match[1]))
                    .reduce((m,o)=>{ m[o.match[1]]=o.attr; return m;},{})
                    .value(),
                sortOrderKeys = _.chain( ((findObjs({
                        type:'attribute',
                        characterid:character.id,
                        name: `_reporder_${match[1]}`
                    })[0]||{get:_.noop}).get('current') || '' ).split(/\s*,\s*/))
                    .intersection(createOrderKeys)
                    .union(createOrderKeys)
                    .value();
            if(index<sortOrderKeys.length && _.has(attrs,sortOrderKeys[index])){
                return attrs[sortOrderKeys[index]];
            }
            return;
        } 
        return findObjs({ type:'attribute', characterid:character.id, name: name}, {caseInsensitive: !caseSensitive})[0];
    },

	HandleInput = function(msg_orig) {
		var msg = _.clone(msg_orig),
			args,attr,amount,chr,token,text='',label, whisper=false,
            who;

		if (msg.type !== "api") {
			return;
		}
        who=(getObj('player',msg.playerid)||{get:()=>'API'}).get('_displayname');

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
            case '!wammo':
                whisper = true;
                /* break; // intentional dropthrough */ /* falls through */

            case '!ammo':
				if(args.length > 1) {

					switch(args[1]) {
                        case '--help':
                            return showHelp(who,msg.playerid);

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
						if(! playerIsGM(msg.playerid) &&
							! _.contains(chr.get('controlledby').split(','),msg.playerid) &&
							! _.contains(chr.get('controlledby').split(','),'all') 
							)
						{
							sendMessage(
                                'You do not control the specified character: '+chr.id ,
                                (playerIsGM(msg.playerid) ? 'gm' : (whisper ? who :false))
                            );
							sendMessage(
								'<b>'+getObj('player',msg.playerid).get('_displayname')+'</b> attempted to adjust attribute <b>'+args[2]+'</b> on character <b>'+chr.get('name')+'</b>.',
								'gm'
							);
							return;
						}

						attr = attrLookup(chr,args[2],false);
					}
					amount=parseInt(args[3],10);
                    label=_.rest(args,4).join(' ');
					if(attr) {
						adjustAmmo(
                            (playerIsGM(msg.playerid) ? 'gm' : (whisper ? who :false)),
                            attr,amount,label,msg.playerid
                        );
					} else {
                        if(chr) {
                            sendMessage(
                                'Attribute ['+args[2]+'] was not found.  Please verify that you have the right name.',
                                (playerIsGM(msg.playerid) ? 'gm' : (whisper ? who :false))
                            );
                        } else {
                            sendMessage(
                                ( token ?  'Token id ['+args[1]+'] does not represent a character. ' : 'Character/Token id ['+args[1]+'] is not valid. ' ) +
                                'Please be sure you are specifying it correctly, either with '+ch('@')+ch('{')+'selected|token_id'+ch('}')+
                                ' or '+ch('@')+ch('{')+'selected|character_id'+ch('}')+'.',
                                (playerIsGM(msg.playerid) ? 'gm' : (whisper ? who :false))
                            );
						}
					}
				} else {
					showHelp(who,msg.playerid);
				}
                break;
		}

	},
    checkInstall = function() {    
        log('-=> Ammo v'+version+' <=-  ['+(new Date(lastUpdate*1000))+']');
        if( ! _.has(state,'Ammo') || state.Ammo.version !== schemaVersion) {
            log('  > Updating Schema to v'+schemaVersion+' <');
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

	Ammo.CheckInstall();
	Ammo.RegisterEventHandlers();
});