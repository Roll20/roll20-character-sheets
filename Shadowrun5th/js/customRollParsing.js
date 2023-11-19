
///////////////////////////
//                       //
//  CUSTOM ROLL PARSING  //
//                       //
///////////////////////////

on('clicked:roll', async (event) => {
  	await startRoll( event.htmlAttributes.value + "{{glitch=[[0]]}}", (results) => {

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

/////////////////////////////////
//  Things with Hits => drain  //
/////////////////////////////////

on('clicked:repeating_rituals:roll clicked:rollSummoning',
     async (event) => {

	// prefix gets an empty string for normal attributes, and repeating_section_ID_ for repeating attributes
	var trigger = event.triggerName.slice(8); // this always starts with 'clicked:'
	var prefix = trigger.split('_').slice(0,3).join('_') + '_'

	let rollPart = event.htmlAttributes.value.replaceAll('prefix-', `${prefix}`);

  	await startRoll(rollPart + "{{glitch=[[0]]}}{{nethits=[[0]]}}{{drain_num=[[0]]}}" , (results) => {

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

/////////////////////
// Extended Rolls  //
/////////////////////

on('clicked:extendedroll', async (event) => {
  	let results = await startRoll( event.htmlAttributes.value + "{{passthrough=[[0]]}}{{glitch=[[0]]}} {{sumhits=[[0]]}}");

    var glitchComputed = 0;
    var amount = results.results.result.dice.filter(x => x == 1).length;

    if(amount > results.results.result.dice.length/2) {
        glitchComputed = 1;

        if(results.results.result.dice.filter(x => x >= 6).length == 0) {
            glitchComputed = 2;
        }
    }

    // Storing all the passthrough data required for the next roll in an Object helps for larger rolls
    let rollData = {
        dice: results.results.dice_num.result,
        limit: results.results.limit_num.result,
        totalhits: results.results.result.result,
        wounds: results.results.wounds_num != null ? results.results.wounds_num.result : 0,
        sustainedspells: results.results.sustainedspells != null ? results.results.sustainedspells.result : 0,
    }

    finishRoll(
        results.rollId,
        {
            glitch: glitchComputed,
            passthrough: rollEscape.escape(rollData),
            sumhits: results.results.result.result,
        }
    );
});

on('clicked:rollextended', async (ev) => {
    await rollExtended(ev);
});

const rollExtended = async (ev) => {
    // The data we passed into the button will be stored in the originalRollId key
    let previousRoll = rollEscape.unescape(ev.originalRollId);
    let attrs = await asw.getAttrs(['character_name', 'gmroll', 'edgeroll','edg_total','edgn','standardroll']);

    let rollBase = `${attrs.gmroll}&{template:extendedRoll}{{passthrough=[[0]]}}{{glitch=[[0]]}}{{sumhits=[[0]]}}{{tries=[[0]]}}{{name=${attrs.character_name}}}{{roll_name=again}}{{limit_num=${previousRoll.limit}}}{{edge=${attrs.edgeroll}}}{{edge_num=[[${attrs.edg_total}]]}}{{wounds_num=[[${previousRoll.wounds}]]}}{{sustainedspells=[[${previousRoll.sustainedspells}]]}}{{dice_num=[[${previousRoll.dice}-1]]}}{{result=[[(${previousRoll.dice}-1-[[${previousRoll.wounds}]]-[[${previousRoll.sustainedspells}]]+[[${attrs.edgn}*${attrs.edg_total}]])${attrs.standardroll}${attrs.edgeroll}kh${previousRoll.limit}]]}}`;
    let results = await startRoll(rollBase);

    let sumHits = previousRoll.totalhits + results.results.result.result;

    let rollData = {
        dice: results.results.dice_num.result,
        limit: previousRoll.limit,
        totalhits: sumHits,
        wounds: previousRoll.wounds,
        sustainedspells: previousRoll.sustainedspells,
    }


    finishRoll(results.rollId, {
        sumhits: sumHits,
        passthrough: rollEscape.escape(rollData),
    });
}


//////////////////////////////
//  Dogable weapon attacks  //
//////////////////////////////

on('clicked:rollWeapon', async (event) => {
    let rollPart = event.htmlAttributes.value;
    let dmgTypeName = rollPart.substring(rollPart.indexOf("weapondmgtype"), rollPart.indexOf("weapondmgtype")+14);
    let dmgType = await asw.getAttrs([dmgTypeName]);

    await rollDogableAttack(rollPart, dmgType);
});

on('clicked:repeating_weapons:rollweapon ' +
    'clicked:repeating_pistols:rollweapon clicked:repeating_automatics:rollweapon clicked:repeating_longarms:rollweapon clicked:repeating_heavyweapons:rollweapon clicked:repeating_closecombat:rollweapon'
    ,  async (event) => {

	// prefix gets an empty string for normal attributes, and repeating_section_ID_ for repeating attributes
	var trigger = event.triggerName.slice(8); // this always starts with 'clicked:'
	var prefix = trigger.split('_').slice(0,3).join('_') + '_'

	let rollPart = event.htmlAttributes.value.replaceAll('prefix-', `${prefix}`);

    let dmgTypeName = `${prefix}` + rollPart.substring(rollPart.indexOf("weapondmgtype"), rollPart.indexOf("weapondmgtype")+13);
    let dmgType = await asw.getAttrs([dmgTypeName]);

    await rollDogableAttack(rollPart, dmgType);
});

on('clicked:repeating_ammotype1:roll clicked:repeating_ammotype2:roll clicked:repeating_ammotype3:roll clicked:repeating_ammotype4:roll clicked:repeating_ammotype5:roll ' +
    'clicked:repeating_ammotype6:roll clicked:repeating_ammotype7:roll clicked:repeating_ammotype8:roll clicked:repeating_weapons:rollammo ' +
    'clicked:repeating_pistols:rollammo clicked:repeating_automatics:rollammo clicked:repeating_longarms:rollammo clicked:repeating_heavyweapons:rollammo clicked:repeating_closecombat:rollammo',
     async (event) => {

	// prefix gets an empty string for normal attributes, and repeating_section_ID_ for repeating attributes
	var trigger = event.triggerName.slice(8); // this always starts with 'clicked:'
	var prefix = trigger.split('_').slice(0,3).join('_') + '_'

	let rollPart = event.htmlAttributes.value.replaceAll('prefix-', `${prefix}`);

    let dmgType;
    if(trigger.includes('weapon') || trigger.includes('pistols') || trigger.includes('automatics') || trigger.includes('longarms') || trigger.includes('heavyweapons') || trigger.includes('closecomba')) {
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

    let attackRoll = await startRoll( rollPart + " {{passthrough=[[0]]}}{{glitch=[[0]]}} ");

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

    //AP only reduces armor
    let armorPenetration = attrs.armor_total + dmgRoll.attackAp < 0  ? -attrs.armor_total : dmgRoll.attackAp;

    let rollBase = `${attrs.gmroll}&{template:reactsoak}{{dmgTaken=[[0]]}}{{dmgType=[[0]]}}{{name=${attrs.character_name}}}{{body=[[${attrs.bod_total}}]]}}{{armor=[[${attrs.armor_total}]]}}{{ap=[[${armorPenetration}]]}}{{bonus=[[${attrs.soak_bonus}]]}}{{mod=[[?{Situational Modifiers|0}]]}}{{edge=${attrs.edgeroll}}}{{edge_num=[[${attrs.edg_total}]]}}{{result=[[([[${attrs.bod_total}}]]+[[${attrs.armor_total}]]+[[${attrs.soak_bonus}]]+[[${armorPenetration}]]+[[?{Situational Modifiers}]]+[[${attrs.edgn}*${attrs.edg_total}]])${attrs.standardroll}${attrs.edgeroll}]]}}`;
    let soakRoll = await startRoll(rollBase);

    let soakSuccesses = soakRoll.results.result.result;
    let dmgTaken = dmgRoll.attackDamage - soakSuccesses;
    let dmgType = dmgRoll.attackDmgType;

    if(dmgType.includes('P')) {
     dmgType = dmgRoll.attackDamage > (attrs.armor_total + armorPenetration + soakRoll.results.mod.result) ? dmgRoll.attackDmgType : 'S';
    }

    finishRoll(soakRoll.rollId, {
        dmgTaken: dmgTaken,
        dmgType: dmgType
    });
}


const rollEscape = {
    chars: {
        '"': '%quot;',
        ',': '%comma;',
        ':': '%colon;',
        '}': '%rcub;',
        '{': '%lcub;',
    },
    escape(str) {
        str = (typeof(str) === 'object') ? JSON.stringify(str) : (typeof(str) === 'string') ? str : null;
        return (str) ? `${str}`.replace(new RegExp(`[${Object.keys(this.chars)}]`, 'g'), (r) => this.chars[r]) : null;
    },
    unescape(str) {
        str = `${str}`.replace(new RegExp(`(${Object.values(this.chars).join('|')})`, 'g'), (r) => Object.entries(this.chars).find(e=>e[1]===r)[0]);
        return JSON.parse(str);
    }
}

const asw = (() => {
    const setActiveCharacterId = function(charId){
        let oldAcid=getActiveCharacterId();
        let ev = new CustomEvent("message");
        ev.data={"id":"0", "type":"setActiveCharacter", "data":charId};
        self.dispatchEvent(ev);
        return oldAcid;
    };
    const promisifyWorker = (worker, parameters) => {
        let acid=getActiveCharacterId();
        let prevAcid=null;
        return new Promise((res,rej)=>{
            prevAcid=setActiveCharacterId(acid);
            try {if (worker===0) getAttrs(parameters[0]||[],(v)=>res(v));
                else if (worker===1) setAttrs(parameters[0]||{}, parameters[1]||{},(v)=>res(v));
                else if (worker===2) getSectionIDs(parameters[0]||'',(v)=>res(v));
            } catch(err) {rej(console.error(err))}
        }).finally(()=>setActiveCharacterId(prevAcid));
    }
    return {
        getAttrs(attrArray) {return promisifyWorker(0, [attrArray])},
        setAttrs(attrObj, options) {return promisifyWorker(1, [attrObj, options])},
        getSectionIDs(section) {return promisifyWorker(2, [section])},
        setActiveCharacterId,
    }
})();