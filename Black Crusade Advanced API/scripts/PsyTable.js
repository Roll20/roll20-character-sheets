/**
 * This script rolls a d100, add a modifier and computes a result compared to the the Black Crusade Psychic Phenomena table.
 * 
 * The following commands is used:
 * !rollpsytable40k [tokenName], [ModifierValue]
 *
 * This script is based on Jack D works, modified by Pixizz.
**/

//Rolls a d100, add the modifier and determine the phenomenon based on the Black Crusade chart.

var rollpsytable40k = rollpsytable40k || (function(){
	
	 var rollResultForRollPsyTable40k = function (token, modifier) {
        var roll = randomInteger(100);
        var output1 = token + ' rolled a <B>' + roll + '</B> with a modifier of<B> ' + modifier + ' </B>on the Psychic Phenomena Table';
		var result = roll + parseInt(modifier);
		var output2;
        //Form output message based on result
        if (result <= 3) {
			output2 = '<span><B>Dark Foreboding:</B> A faint breeze blows past the sorcerer and those near him, and everyone gets the feeling that somewhere in the galaxy something unfortunate just happened</span>';
        }
        else if (result >= 4 && result <= 5) {
			output2 = '<span><B>Warp Echo:</B> For a few moments, all noises cause echoes, regardless of the surroundings</span>';
        }
        else if (result >= 6 && result <= 8) {
			output2 = '<span><B>Unholy Stench:</B> The air around the psyker becomes permeated with a bizarre and foul smell</span>';
        }
		else if (result >= 9 && result <= 11) {
			output2 = '<span><B>Mind Warp:</B> The psyker suffers a –5 penalty to Willpower Tests until the start of his next turn as his own inherent phobias, suspicions and hatreds surge to the surface of his mind in a wave of unbound emotion</span>';
        }
		else if (result >= 12 && result <= 14) {
			output2 = '<span><B>Hoarfrost:</B> The temperature plummets for an instant, and a thin coating of frost covers everything within 3d10 metres</span>';
        }
		else if (result >= 15 && result <= 17) {
			output2 = '<span><B>Aura of Taint:</B> All animals within 1d100 metres become spooked and agitated; Characters with Psyniscience can pinpoint the psyker as the cause</span>';
        }
		else if (result >= 18 && result <= 20) {
			output2 = '<span><B>Memory Worm:</B> All people within line of sight of the psyker forget something trivial</span>';
        }
		else if (result >= 21 && result <= 23) {
			output2 = '<span><B>Spoilage:</B> Food and drink go bad in a 5d10 metre radius</span>';
        }
		else if (result >= 24 && result <= 26) {
			output2 = '<span><B>Haunting Breeze:</B> Winds whip up around the psyker for a few moments, blowing light objects around and guttering fires within 3d10 metres</span>';
        }
		else if (result >= 27 && result <= 29) {
			output2 = '<span><B>Veil of Darkness:</B> For a brief moment (effectively the remainder of the round), the area within 3d10 metres is plunged into immediate darkness</span>';
        }
		else if (result >= 30 && result <= 32) {
			output2 = '<span><B>Breath Leech:</B> Everyone (including the psyker) within a 3d10 metre radius becomes short of breath for one round and cannot make any Run or Charge actions</span>';
        }
		else if (result >= 33 && result <= 35) {
			output2 = '<span><B>Distorted Reflections:</B> Mirrors and other reflective surfaces within a radius of 5d10 metres distort or shatter</span>';
        }
		else if (result >= 36 && result <= 38) {
			output2 = '<span><B>Daemonic Mask:</B> For a fleeting moment, the psyker takes on a daemonic appearance and gains a Fear rating of 1 until the start of the next turn. However, he also gains one Corruption Point</span>';
        }
		else if (result >= 39 && result <= 41) {
			output2 = '<span><B>Unnatural Decay:</B> All plant life within 3d10 metres of the psyker withers and dies</span>';
        }
		else if (result >= 42 && result <= 44) {
			output2 = '<span><B>Spectral Gale:</B> Howling winds erupt around the psyker, requiring him and everyone within 4d10 metres to make an Easy (+30) Agility or Strength Test to avoid being knocked to the ground</span>';
        }
		else if (result >= 45 && result <= 47) {
			output2 = '<span><B>Bloody Tears:</B> Blood weeps from stone and wood within 3d10 metres of the psyker. If there are any pictures or statues of people inside this area, they appear to be crying blood</span>';
        }
		else if (result >= 48 && result <= 50) {
			output2 = '<span><B>The Earth Protests:</B> The ground suddenly shakes, and everyone (including the psyker) within a 5d10 metre radius must make a Routine (+10) Agility Test or be knocked down</span>';
        }
		else if (result >= 51 && result <= 53) {
			output2 = '<span><B>Actinic Discharge:</B> Static electricity fills the air within 5d10 metres causing hair to stand on end and unprotected electronics to short out, while the psyker is wreathed in eldritch lightning</span>';
        }
		else if (result >= 54 && result <= 56) {
			output2 = '<span><B>Warp Ghosts:</B> Ghostly apparitions fill the air within 3d10 metres around the psyker, flying about and howling in pain for a few brief moments. Everyone in the radius (except the psyker himself) must test against a Fear rating of 1</span>';
        }
		else if (result >= 57 && result <= 59) {
			output2 = '<span><B>Falling Upwards:</B> Everything within 2d10 metres of the psyker (including the psyker himself) rises 1d10 metres into the air as gravity briefl y ceases. Almost immediately, everything crashes back to earth, suffering falling Damage as appropriate for the distances fallen</span>';
        }
		else if (result >= 60 && result <= 62) {
			output2 = '<span><B>Banshee Howl:</B> A shrill keening rings out across the immediate area, shattering glass and forcing every mortal creature able to hear it (including the psyker) to pass a Challenging (+0) Toughness Test or be deafened for 1d10 rounds</span>';
        }
		else if (result >= 63 && result <= 65) {
			output2 = '<span><B>The Furies:</B> The Psyker is assailed by unseen horrors. He is slammed to the ground and suffers 1d5 wounds in Damage (ignoring armour, but not Toughness Bonus) and he must test against Fear (2)</span>';
        }
		else if (result >= 66 && result <= 68) {
			output2 = '<span><B>Shadow of the Warp:</B> For a split second, the world changes in appearance, and everyone within 1d100 metres has brief but horrific glimpse of the shadow of the warp. Everyone in the area (including the psyker) must make a Difficult (–10) Willpower Test or gain 1d5 Corruption Points</span>';
        }
		else if (result >= 69 && result <= 71) {
			output2 = '<span><B>Tech Scorn:</B> The machine spirits reject your unnatural ways. All un-warded technology within 5d10 metres malfunction momentarily, and all ranged weapons Jam (see Chapter I: Playing the Game), whilst characters with cybernetic implants must pass a Routine (+10) Toughness Test or suffer 1d5 Damage, ignoring Toughness Bonus and Armour</span>';
        }
		else if (result >= 72 && result <= 74) {
			output2 = '<span><B>Warp Madness:</B> A violent ripple of tainted discord causes all creatures within 2d10 metres (with the exception of the Psyker) to become Frenzied for a Round and suffer 1d5 Corruption Points unless they can pass a Diffi cult (–10) Willpower Test</span>';
        }
        else {
            output2 = '<span style="color:red"><B>Perils of the Warp:</B> The warp opens in a maelstrom of energy. <B>Roll Perils of the Warp instead.</B></span>';
        }
        //Return output
        return output1 + '<br><br>' + output2;
    };
	
	processInlinerolls = function(msg) {
        if (_.has(msg, 'inlinerolls')) {
            return _.chain(msg.inlinerolls)
                    .reduce(function(previous, current, index) {
                        previous['$[[' + index + ']]'] = current.results.total || 0;
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
        var cmdName = '!rollpsytable40k ';
        if (msg.type === 'api' && msg.content.indexOf(cmdName) !== -1) {
            let content = processInlinerolls(msg);
            var paramArray = content.slice(cmdName.length).split(',');
            if (paramArray.length !== 2) {
                sendChat(msg.who, '/w ' + msg.who + ' You must specify two comma-separated ' +
                'parameters for the !rollpsytable40k command. Do not use commas in the input zones.');
            }
            else {
                var result = rollResultForRollPsyTable40k(paramArray[0].trim(), paramArray[1].trim());
                sendChat(msg.who, result);
            }
        }
    });
}())