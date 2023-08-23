/**
 * This script rolls a d100 and compares it to the Black Crusade Perils of the Warp table.
 * 
 * The following commands is used:
 * !rollperiltable40k [tokenName]
 *
 * This script is based on Jack D works, modified by Pixizz.
**/

//Rolls a d100, add the modifier and determine the peril based on the Black Crusade chart.

var rollperiltable40k = rollperiltable40k || (function(){
	
	 var rollResultForRollPsyTable40k = function (token) {
        var roll = randomInteger(100);
        var output1 = token + ' rolled a <B>' + roll + ' </B>on the Perils of the Warp Table';
		var output2;
        //Form output message based on roll
        if (roll <= 5) {
			output2 = '<span style="color:red"><B>The Gibbering:</B> The psyker screams in pain as uncontrolled warp energies surge through his unprepared mind. He must make a Challenging (+0) Willpower Test or be stunned for 1d5 rounds</span>';
        }
        else if (roll >= 6 && roll <= 9) {
			output2 = '<span style="color:red"><B>Warp Burn:</B> A violent burst of energy from the warp smashes into the psyker’s mind, sending him reeling. He suffers 2d5 wounds, ignoring Toughness Bonus and Armour, and is stunned for 1d5 Rounds</span>';
        }
        else if (roll >= 10 && roll <= 13) {
			output2 = '<span style="color:red"><B>Psychic Concussion:</B> With a crack of energy, the psyker is knocked unconscious for 1d5 rounds, and everyone within 3d10 metres must make a Routine (+10) Willpower Test or be Stunned for one round</span>';
        }
		else if (roll >= 14 && roll <= 18) {
			output2 = '<span style="color:red"><B>Psy Blast:</B> There is an explosion of power and the psyker is thrown 3d10 metres into the air, falling to the ground moments later (see page 257 for Falling Damage)</span>';
        }
		else if (roll >= 19 && roll <= 24) {
			output2 = '<span style="color:red"><B>Soul Sear:</B> Warp power courses through the psyker’s body, scorching his soul. The psyker cannot use any powers for the next hour and gains 2d5 Corruption Points</span>';
        }
		else if (roll >= 25 && roll <= 30) {
			output2 = '<span style="color:red"><B>Locked In:</B> The power cages the psyker’s mind in an ethereal prison, tormented by visions of the warp. The psyker falls to the ground in a catatonic state. Each round thereafter, he must spend a full action to make a Diffi cult (–10) Willpower Test. On a success, his mind is freed and restored to his body, haunted by his experiences but otherwise unharmed</span>';
        }
		else if (roll >= 31 && roll <= 38) {
			output2 = '<span style="color:red"><B>Chronological Incontinence:</B> Time warps around the psyker. He winks out of existence and reappears in 1d10 rounds (for one minute in narrative time) in the exact location. He suffers one point of permanent Toughness and Intelligence damage as his body and mind rebel against the experience, and gains 1d5 Corruption Points</span>';
        }
		else if (roll >= 39 && roll <= 46) {
			output2 = '<span style="color:red"><B>Psychic Mirror:</B> The psyker’s power is turned back on him. Resolve the power’s effects, but the power targets the psyker instead. If the power is beneficial, it deals 1d10+5 Energy Damage (ignoring armour) to the psyker instead of its normal effect</span>';
        }
		else if (roll >= 47 && roll <= 55) {
			output2 = '<span style="color:red"><B>Warp Whispers:</B> The voices of daemons fill the air within 4d10 metres of the psyker, whispering terrible secrets and shocking truths. Everyone in the area (including the psyker ) must make a Hard (–20) Willpower Test or suffer 1d5 Corruption Points and an equal amount of Willpower Damage. In addition, whether or not the psyker passes the Willpower Test, he still suffers an additional 1d5+5 Willpower Damage</span>';
        }
		else if (roll >= 56 && roll <= 58) {
			output2 = '<span style="color:red"><B>Vice Versa:</B> The psyker’s mind is thrown out of his body and into another nearby creature or person. The psyker and a random being (note, this cannot be a daemon, untouchable or other “soulless” creature) within 50 metres swap consciousness for 1d10 rounds. This may be allies or enemies. Each creature retains its Weapon Skill, Ballistic Skill, Intelligence, Perception, Willpower and Fellowship during the swap, but all other Characteristics are of the new host body. If either body is slain, the effect ends immediately and both parties return to their original bodies. Both suffer 1d5 Intelligence Damage from the experience. If there are no creatures within range, the psyker becomes catatonic for 1d5 rounds while his mind wanders the warp. This journey causes 1d10 Willpower Damage, 1d10 Intelligence Damage and 1d10 Corruption Points</span>';
        }
		else if (roll >= 59 && roll <= 67) {
			output2 = '<span style="color:red"><B>Dark Summoning:</B> Khorne’s wrath swells at the arrogance of the psyker, and he sends a Bloodletter to deal with the fool. (see Chapter XI: Adversaries) The Bloodletter rips into existence within 3d10 metres of the psyker, for a number of rounds equal to 1d5 plus the daemon’s Toughness Bonus. The psyker’s turn immediately ends, and the Daemon may take its turn immediately. It detests the psyker and focuses all of its attacks upon the fool that unwittingly summoned it. It will not attack anyone else, even if others attack it</span>';
        }
		else if (roll >= 68 && roll <= 72) {
			output2 = '<span style="color:red"><B>Rending the Veil:</B> The air vibrates with images of cackling daemons and the kaleidoscopic taint of the warp is rendered visible. All sentient creatures (any creature with an Intelligence characteristic) within 1d100 metres must test against Fear (2). The psyker must Test against Fear (4) instead. This effect lasts for 1d5 rounds</span>';
        }
		else if (roll >= 73 && roll <= 78) {
			output2 = '<span style="color:red"><B>Blood Rain:</B> A psychic storm erupts, covering an area of 5d10 metres in which everyone must pass a Challenging (+0) Strength Test or be knocked to the ground. In addition to howling winds and the skies raining blood, any psychic powers used in the area automatically invoke Perils of the Warp for 1d5 rounds, in addition to any Psychic Phenomena those powers cause. The psyker gains 1d5+1 Corruption Points</span>';
        }
		else if (roll >= 79 && roll <= 82) {
			output2 = '<span style="color:red"><B>Cataclysmic Blast:</B> The psyker’s power overloads, arcing out in great bolts of warp energy. Anyone within 1d10 metres (including the psyker) takes 1d10+8 Energy Damage with a Pen of 5. The psyker may not Dodge this, or stop the attack with a Field Save. In addition, all of the psyker’s clothing and gear is destroyed, leaving him naked and smoking on the ground. The psyker may use no further powers for 1d5 hours after the event</span>';
        }
		else if (roll >= 83 && roll <= 86) {
			output2 = '<span style="color:red"><B>Mass Possession:</B> Daemons ravage the mind of every living thing within 1d100 metres. Every character in the area must resist a possession attack (see the Possession Trait in Chapter IV: Talents and Traits; the attacker is a random Lesser Daemon). This possession will last for no more than 2d10 rounds, after which the daemons are cast back into the warp</span>';
        }
		else if (roll >= 87 && roll <= 90) {
			output2 = '<span style="color:red"><B>Reality Quake:</B> Reality buckles around the psyker, and an area radiating out 3d10 metres from him is sundered: solid objects alternately rot, burn, and freeze, and everyone and everything in the area takes 2d10 Rending Damage, ignoring armour (and unable to be dodged). Warded objects, daemons and untouchables halve the Damage rolled</span>';
        }
		else if (roll >= 91 && roll <= 99) {
			output2 = '<span style="color:red"><B>Grand Possession:</B> A grand and terrible warp entity takes interest in the psyker’s soul, descending from the warp to seize the mortal’s body for its own purposes. A Greater Daemon chosen by the GM attempts to possess the psyker (see the Possession Trait in Chapter IV: Talents and Traits). Even if the daemon fails, the psyker still suffers 2d10 Toughness Damage, and will forever add +10 to all rolls on the Psychic Phenomena and Perils of the Warp tables as his body now serves as a conduit to the power of the warp. If the character dies while possessed, the Greater Daemon manifests in the real world for a number of days equal to its Toughness Bonus or until it is destroyed</span>';
        }
		else if (roll === 100) {
			output2 = '<span style="color:red"><B>Annihilation:</B> The psyker is immediately and irrevocably destroyed, burned to nothing by the screaming fi res of the Immaterium or dragged into the deepest maelstrom of the warp. The psyker may not spend Infamy to recover from this death, he is irrevocably destroyed. There is a chance that a daemonic entity of some sort appears in the psyker’s place— the type of daemon that appears is determined by the GM, based on how powerful the psyker was—more powerful psykers draw more powerful daemons. The percentage chance that the daemon appears is equal to the psyker’s Willpower characteristic (roll a d100, if the result is equal to or under the characteristic, the daemon appears)</span>';
        }
        else {
            output2 = '<span style="color:red"><B>Unexpected value</B></span>';
        }
        //Return output
        return output1 + '<br><br>' + output2;
    };
	
	processInlinerolls = function(msg) {
        if (_.has(msg, 'inlinerolls')) {
            return _.chain(msg.inlinerolls)
                    .reduce(function(previous, current, index) {
                        previous['$[[' + index + ']]'] = current.rolls.total || 0;
                        return previous;
                    },{})
                    .reduce(function(previous, current, index) {
                        return previous.replace(index, current);
                    }, msg.content)
                    .value();
        } else {
            return msg.content;
        }
    };
	
	/** Interpret the chat commands. **/
    on('chat:message', function (msg) {
        'use strict';
        var cmdName = '!rollperiltable40k ';
        if (msg.type === 'api' && msg.content.indexOf(cmdName) !== -1) {
            let content = processInlinerolls(msg);
            var paramArray = content.slice(cmdName.length).split(',');
            if (paramArray.length !== 1) {
                sendChat(msg.who, '/w ' + msg.who + ' You must specify only the token ' +
                'parameter for the !rollperiltable40k command. Do not use commas in the input zones.');
            }
            else {
                var result = rollResultForRollPsyTable40k(paramArray[0].trim());
                sendChat(msg.who, result);
            }
        }
    });
}())