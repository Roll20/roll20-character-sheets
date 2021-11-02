///////////////////////////
//                       //
//  CUSTOM ROLL PARSING  //
//                       //
///////////////////////////

on('clicked:roll', async (event) => {
  	await startRoll(event.htmlAttributes.value + "{{glitch=[[0]]}}", (results) => {

        var glitchComputed = 0;
        var amount = results.results.result.dice.filter(x => x == 1).length;

        if(amount > results.results.result.dice.length/2) {
            glitchComputed = 1;

            if(results.results.result.dice.filter(x => x >= 6).length == 0) {
                glitchComputed = 2;
            }
        }

	  	finishRoll(
		  	results.rollId,
		  	{
			  	glitch: glitchComputed,

		  	}
	  	);
  	  });
});

on('clicked:repeating_knowledge:roll clicked:repeating_alchemy:roll clicked:repeating_critterpowers:roll clicked:repeating_perceptionusage:roll clicked:repeating_spells:roll',
     async (event) => {

	// prefix gets an empty string for normal attributes, and repeating_section_ID_ for repeating attributes
	var trigger = event.triggerName.slice(8); // this always starts with 'clicked:'
	var prefix = trigger.split('_').slice(0,3).join('_') + '_'

	let rollPart = event.htmlAttributes.value.replaceAll('prefix-', `${prefix}`);

  	await startRoll(rollPart + "{{glitch=[[0]]}}", (results) => {

        var glitchComputed = 0;
        var amount = results.results.result.dice.filter(x => x == 1).length;

        if(amount > results.results.result.dice.length/2) {
            glitchComputed = 1;

            if(results.results.result.dice.filter(x => x >= 6).length == 0) {
                glitchComputed = 2;
            }
        }

	  	finishRoll(
		  	results.rollId,
		  	{
			  	glitch: glitchComputed,

		  	}
	  	);
  	  });
});

//  Things with Hits => drain  //

on('clicked:repeating_rituals:roll clicked:rollSummoning',
     async (event) => {

	// prefix gets an empty string for normal attributes, and repeating_section_ID_ for repeating attributes
	var trigger = event.triggerName.slice(8); // this always starts with 'clicked:'
	var prefix = trigger.split('_').slice(0,3).join('_') + '_'

	let rollPart = event.htmlAttributes.value.replaceAll('prefix-', `${prefix}`);

  	await startRoll("{{glitch=[[0]]}}{{nethits=[[0]]}}{{drain_num=[[0]]}}" + rollPart, (results) => {

        var glitchComputed = 0;
        var amount = results.results.result.dice.filter(x => x == 1).length;

        if(amount > results.results.result.dice.length/2) {
            glitchComputed = 1;

            if(results.results.result.dice.filter(x => x >= 6).length == 0) {
                glitchComputed = 2;
            }
        }

        var nethitsComputed = results.results.result.result - results.results.opposing.result;
        var drainComputed = results.results.opposing.result*2;

	  	finishRoll(
		  	results.rollId,
		  	{
			  	glitch: glitchComputed,
			  	nethits: nethitsComputed,
			  	drain_num: drainComputed,

		  	}
	  	);
  	  });
});

//  Dogable weapon attacks  //

on('clicked:rollWeapon', async (event) => {
    let rollPart = event.htmlAttributes.value;
    let dmgTypeName = rollPart.substring(rollPart.indexOf("weapondmgtype"), rollPart.indexOf("weapondmgtype")+14);
    let dmgType = await asw.getAttrs([dmgTypeName]);

    await rollDogableAttack(rollPart, dmgType);
});

on('clicked:repeating_weapons:rollweapon',  async (event) => {

	// prefix gets an empty string for normal attributes, and repeating_section_ID_ for repeating attributes
	var trigger = event.triggerName.slice(8); // this always starts with 'clicked:'
	var prefix = trigger.split('_').slice(0,3).join('_') + '_'

	let rollPart = event.htmlAttributes.value.replaceAll('prefix-', `${prefix}`);

    let dmgTypeName = `${prefix}` + rollPart.substring(rollPart.indexOf("weapondmgtype"), rollPart.indexOf("weapondmgtype")+13);
    let dmgType = await asw.getAttrs([dmgTypeName]);

    await rollDogableAttack(rollPart, dmgType);
});

on('clicked:repeating_ammotype1:roll clicked:repeating_ammotype2:roll clicked:repeating_ammotype3:roll clicked:repeating_ammotype4:roll clicked:repeating_ammotype5:roll ' +
    'clicked:repeating_ammotype6:roll clicked:repeating_ammotype7:roll clicked:repeating_ammotype8:roll clicked:repeating_weapons:rollammo',
     async (event) => {

	// prefix gets an empty string for normal attributes, and repeating_section_ID_ for repeating attributes
	var trigger = event.triggerName.slice(8); // this always starts with 'clicked:'
	var prefix = trigger.split('_').slice(0,3).join('_') + '_'

	let rollPart = event.htmlAttributes.value.replaceAll('prefix-', `${prefix}`);

    let dmgType;
    if(trigger.includes('weapon')) {
        console.log(rollPart);
        let dmgTypeName = `${prefix}` + rollPart.substring(rollPart.indexOf("ammodmgtype"), rollPart.indexOf("ammodmgtype")+12);
        dmgType = await asw.getAttrs([dmgTypeName]);
        if(dmgType[Object.keys(dmgType)[0]].includes("@")) {
            dmgType = await asw.getAttrs([`${prefix}`+dmgType[Object.keys(dmgType)[0]].replace(/[^a-zA-Z0-9]/g, "")]);
        }
    }
    else {
        let row = trigger.split("-", 1)[0];
        let dmgTypeName = `${row}ammodmgtype`;
        dmgType = await asw.getAttrs([dmgTypeName]);
        if(dmgType[Object.keys(dmgType)[0]].includes("@")) {
            dmgType = await asw.getAttrs([dmgType[Object.keys(dmgType)[0]].replace(/[^a-zA-Z0-9]/g, "")]);
        }
    }


    await rollDogableAttack(rollPart, dmgType);

});

const rollDogableAttack = async (rollPart, dmgType) => {

    let attackRoll = await startRoll(" {{passthrough=[[0]]}}{{glitch=[[0]]}} " + rollPart );

    var glitchComputed = 0;
    var amount = attackRoll.results.result.dice.filter(x => x == 1).length;

    if(amount > attackRoll.results.result.dice.length/2) {
        glitchComputed = 1;

        if(attackRoll.results.result.dice.filter(x => x >= 6).length == 0) {
            glitchComputed = 2;
        }
    }

    let attrs = await asw.getAttrs(['character_name']);
    // Storing all the passthrough data required for the next roll in an Object helps for larger rolls
    let rollData = {
        attacker: attrs.character_name,
        attackHits: attackRoll.results.result.result,
        attackAp: attackRoll.results.after1.result,
        attackDV: attackRoll.results.after1_num.result,
        attackDmgType: dmgType[Object.keys(dmgType)[0]],
    }

    finishRoll(
        attackRoll.rollId,
        {
            glitch: glitchComputed,
            passthrough: rollEscape.escape(rollData),

        }
    );
}

on('clicked:reactdodge', async (ev) => {
    await rollReactDodge(ev);
});

const rollReactDodge = async (ev) => {
    // The data we passed into the button will be stored in the originalRollId key
    let attackRoll = rollEscape.unescape(ev.originalRollId);
    let attrs = await asw.getAttrs(['gmroll','character_name','rea_total', 'int_total', 'avoid_total', 'avoid_bonus', 'edgeroll','edg_total','wound_total','sustainedspells','edgn','standardroll']);

    let rollBase = `${attrs.gmroll}&{template:reactdodge}{{nethits=[[0]]}}{{attackAp=[[0]]}}{{attackDamage=[[0]]}}{{attackDmgType=[[0]]}}{{passthrough=[[0]]}}{{name=${attrs.character_name}}}{{attacker_name=${attackRoll.attacker}}}{{rea=[[${attrs.rea_total}}]]}}{{int=[[${attrs.int_total}]]}}{{bonus=[[${attrs.avoid_bonus}]]}}{{mod=[[?{Situational Modifiers|0}]]}}{{edge=${attrs.edgeroll}}}{{edge_num=[[${attrs.edg_total}]]}}{{wounds_num=[[${attrs.wound_total}]]}}{{sustainedspells=[[${attrs.sustainedspells}*2]]}}{{result=[[(${attrs.avoid_total}+?{Situational Modifiers}-[[${attrs.wound_total}]]-[[${attrs.sustainedspells}*2]]+[[${attrs.edgn}*${attrs.edg_total}]])${attrs.standardroll}${attrs.edgeroll}]]}}`;
    let defendRoll = await startRoll(rollBase);

    let defendSuccesses = defendRoll.results.result.result;
    let nethits = attackRoll.attackHits - defendSuccesses;
    let attackDamage = attackRoll.attackDV + nethits;

    let rollData = {
        attackAp: attackRoll.attackAp,
        attackDamage: attackDamage,
        attackDmgType: attackRoll.attackDmgType,
    }

    finishRoll(defendRoll.rollId, {
        nethits: nethits,
        attackAp: attackRoll.attackAp,
        attackDamage: attackDamage,
        attackDmgType: attackRoll.attackDmgType,
        passthrough: rollEscape.escape(rollData),
    });
}

on('clicked:reactsoak', async (ev) => {
    await rollReactSoak(ev);
});

const rollReactSoak = async (ev) => {
    // The data we passed into the button will be stored in the originalRollId key
    let dmgRoll = rollEscape.unescape(ev.originalRollId);
    let attrs = await asw.getAttrs(['gmroll','character_name','bod_total', 'armor_total', 'soak_bonus', 'edgeroll','edg_total','edgn','standardroll']);

    let rollBase = `${attrs.gmroll}&{template:reactsoak}{{dmgTaken=[[0]]}}{{dmgType=[[0]]}}{{name=${attrs.character_name}}}{{body=[[${attrs.bod_total}}]]}}{{armor=[[${attrs.armor_total}]]}}{{ap=[[${dmgRoll.attackAp}]]}}{{bonus=[[${attrs.soak_bonus}]]}}{{mod=[[?{Situational Modifiers|0}]]}}{{edge=${attrs.edgeroll}}}{{edge_num=[[${attrs.edg_total}]]}}{{result=[[([[${attrs.bod_total}}]]+[[${attrs.armor_total}]]+[[${attrs.soak_bonus}]]+[[${dmgRoll.attackAp}]]+[[?{Situational Modifiers}]]+[[${attrs.edgn}*${attrs.edg_total}]])${attrs.standardroll}${attrs.edgeroll}]]}}`;
    let soakRoll = await startRoll(rollBase);

    let soakSuccesses = soakRoll.results.result.result;
    let dmgTaken = dmgRoll.attackDamage - soakSuccesses;
    let dmgType = dmgRoll.attackDmgType;

    if(dmgType.includes('P')) {
     dmgType = dmgRoll.attackDamage > (attrs.armor_total - dmgRoll.attackAp + soakRoll.results.mod.result) ? dmgRoll.attackDmgType : 'S';
    }

    finishRoll(soakRoll.rollId, {
        dmgTaken: dmgTaken,
        dmgType: dmgType
    });
}