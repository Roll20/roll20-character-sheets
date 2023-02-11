/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
const calcStrengthMod = function({attributes}){
	return Math.floor( (attributes.strength - 10) / 2);
};
k.registerFuncs({calcStrengthMod});

const calcAthletics = function({attributes}){
	return attributes.strength_mod + attributes.athletics_base;
};
k.registerFuncs({calcAthletics});

const calcAttackMod = function({trigger,attributes}){
	let [section,rowID,field] = k.parseTriggerName(trigger.name);
	return attributes.strength_mod + attributes[`${section}_${rowID}_bonus`];
};
k.registerFuncs({calcAttackMod});

const calcWeaponWeight = function({trigger,attributes,sections}){
	return sections.repeating_attack.reduce((total,rowID)=>{
		return total + 
		attributes[`repeating_attack_${rowID}_weight`] * 
		attributes[`repeating_attack_${rowID}_quantity`];
	},0);
};
k.registerFuncs({calcWeaponWeight});