
const isJSONString = (string) => {
	let json= {};
	try {
		json = JSON.parse(string);
	} catch (e) {
		console.info('it is not a JSON');
		return false;
	}
	console.info(`string`,json)
	return json;
}
const arrays_drop={
	fields : [
		"employer","profession",
		"accounting","alertness","anthropology","archeology","art_1","art_1_name","art_2","art_2_name","artillery","athletics","bureaucracy",
		"computer_science","craft_1","craft_1_name","craft_2","craft_2_name","criminology","demolitions","disguise","dodge","drive","firearms",
		"first_aid","forensics","heavy_machinery","heavy_weapons","history","humint","law","medicine","melee_weapons","military_science_1",
		"military_science_1_name","military_science_2","military_science_2_name","navigate","occult","persuade","pharmacy","pilot_1","pilot_1_name",
		"pilot_2","pilot_2_name","psychotherapy","ride","science_1","science_1_name","science_1","science_2_name","search","sigint",	"stealth","surgery",
		"survival",	"swim","unarmed_combat","unnatural",
		"armor_and_gear","personal_details_and_notes","motivations","bond_number"],
	visible: ["accounting","alertness","anthropology","archeology","art_1","art_1_name","art_2","art_2_name","artillery","athletics","bureaucracy",
		"computer_science","craft_1","craft_2","criminology","demolitions","disguise","dodge","drive","firearms","first_aid","forensics","heavy_machinery",
		"heavy_weapons","history","humint","law","medicine","melee_weapons","military_science_1", "military_science_2","navigate","occult","persuade","pharmacy","pilot_1",
		"pilot_2","psychotherapy","ride","science_1","science_1","search","sigint","stealth","surgery",
		"survival",	"swim","unarmed_combat","unnatural"],
	bond: ["name","bond_score"],
	skill: ["name","rank"],
	special_training:["name","skill_or_stat_used"],
	weapon :["name", "skill_percent", "base_range", "damage", "armor_piercing", "lethality_percent", "ammo","ammo_total"],
	rep: {bond: "repeating_bonds_",special: "repeating_special_",skill:"repeating_skills_",ritual:"repeating_rituals_",weapon:"repeating_weapons_"},
}


const dropAgent = (data) => {
	const updateAttrs = {};
	updateAttrs[`sheet_type`] = "pc";
	// First of all reset skills and repeating sections for skills and abilities
    resetBonds(updateAttrs);
	resetSkills(updateAttrs);
    resetAllRepeatingSkills(updateAttrs);
    resetAllSpecialAbilities(updateAttrs);
	console.log(`Agent Reset:`,updateAttrs);

	// bonds
	const special_trainings = isJSONString(data.repeated_special_trainings);
	const rituals= isJSONString(data.repeating_rituals);
	const weapons= isJSONString(data.repeating_weapons);
	const repSkills= isJSONString(data.repeating_skills);
	const dropfields= arrays_drop[`fields`];
	const visible=arrays_drop['visible'];
	console.log(`special_trainings: ${special_trainings}`);
	console.log(`rituals: ${rituals}`);
	console.log(`weapons: ${weapons}`);
	console.log(`repSkills: ${repSkills}`);

	if (repSkills){
		for (const skill of repSkills){
			let dRepSkills=dropRepSkills(skill);
			Object.keys(dRepSkills).forEach(key => updateAttrs[key] = dRepSkills[key]);
		}
	}

	if (special_trainings){
		for (const special_training of special_trainings){
			let dSpecialTraining=dropSpecialTraining(special_training);
			Object.keys(dSpecialTraining).forEach(key => updateAttrs[key] = dSpecialTraining[key]);
		}
	}
/*	
	if (rituals){
		for (const ritual of rituals){
			let dRitual=dropRitual(ritual);
			Object.keys(dRitual).forEach(key => updateAttrs[key] = dRitual[key]);
		}
	}
*/
	if (weapons){
		for (const weapon of weapons){
			let dWeapons=dropWeapon(weapon);
			Object.keys(dWeapons).forEach(key => updateAttrs[key] = dWeapons[key]);
		}
	}

	console.info('drop fields:',dropfields);
	for (const field of dropfields){
		console.log(field);
		console.log(data[field]);
		if (data[field]){
			if (field === "bond_number") {	
				for (i=0; i<data[field]; i++){	
					let UIDD = generateRowID();
					let prefix=`${arrays_drop[`rep`][`bond`]}${UIDD}`;
					updateAttrs[`${prefix}_name`] = `bond_${i}`;
					updateAttrs[`${prefix}_test`] = `editable`;
				}
			}else if (data[field]==="name"){
				updateAttrs[`profession`] = data[field];
			}else{
			updateAttrs[field] = data[field];
			}
			if (visible.includes(field)){
				updateAttrs[`${field}_visible`]=`visible`;
			}
		}
	}

	console.info(`Agent:`,updateAttrs);
	return updateAttrs;
}

const dropRepSkills = (data) => {
	const updateAttrs = {};
	let UIDD = generateRowID();
	let prefix=`${arrays_drop[`rep`][`skill`]}${UIDD}`;
	const dropskillfields=arrays_drop[`skill`];
	dropskillfields.forEach(field =>{
		updateAttrs[`${prefix}_${field}`] = data[field];
	});
	updateAttrs[`${prefix}_test`] = `editable`;
	console.info(`repeating skills:`,updateAttrs);
	return updateAttrs;
}

const dropSpecialTraining = (data) => {
	const updateAttrs = {};
	let UIDD = generateRowID();
	var prefix=`${arrays_drop[`rep`][`special`]}${UIDD}`;
	const dropspecialtrainingfields=arrays_drop[`special_training`];
	dropspecialtrainingfields.forEach(field =>{
		if (data[field]){ 
			if (field === "skill_or_stat_used"){		
				let skillname=data[`skill_or_stat_used`].toLowerCase().replace(/ /g, "_");
				updateAttrs[`${prefix}_skill_or_stat_used`] = `@{${skillname}}`;
			}else{
				updateAttrs[`${prefix}_${field}`] = data[field];
			}
		}
	});
	updateAttrs[`${prefix}_test`] = `editable`;
	console.info(`special training:`, updateAttrs);
	return updateAttrs;
}

/*
const dropRitual = (data) => {
	const updateAttrs = {};
	const UIDD = generateRowID();
	const prefix=`repeating_rituals_${UIDD}`;
	// to be updated when the format is decided

	console.log(updateAttrs);
	return updateAttrs;
}

const dropMonster = (data) => {
	const updateAttrs = {};
	updateAttrs[`sheet_type`] = "npc";
	// to be updated when the format is decided
	console.log(updateAttrs);
	return updateAttrs;
}
*/
const dropWeapon = (data) => {
	const updateAttrs = {};
	let UIDD = generateRowID();
	var prefix=`${arrays_drop[`rep`][`weapon`]}${UIDD}`;
	
	const weaponfields=arrays_drop[`weapon`];
	if (data.hasOwnProperty(weaponfields[2])==false){
		console.warn(`weapon uses the repeating field format`);
		data=isJSONString(data.repeating_weapons);
		console.log(data);
	}

	updateAttrs[`${prefix}_test`] = 'editable';
	for (const field of weaponfields){
		if (data[field]){
			if (field === "skill_percent"){
				let skillname=cleanedSkill(data[field]);
				console.info(skillname);
				if (isSkillNumber(skillname)){
					updateAttrs[`${prefix}_skill_percent`] = skillname;
				}else if (isValidSkill(skillname)){
					updateAttrs[`${prefix}_skill_percent`] = `@{${skillname}}`;
				}else{
					console.error(`skill not found: ${skillname}`);
				}
			}else{
				updateAttrs[`${prefix}_${field}`] = data[field];
			}
		}
	}
	console.log(`weapon:`, updateAttrs);
	return updateAttrs;
}



const getDropType = data => data.Category || false;

const handleDragandDrop = () => {
	getAttrs(["drop_name","drop_data"], (v) => {
		const {drop_name, drop_data} = v;
		if (drop_name==="" || drop_data===""){return;}
		const dropDataParsed =JSON.parse(drop_data);
		const dropType =  getDropType(dropDataParsed);
		console.info(`drop type:`, dropType);
		console.info('data:',dropDataParsed);
		
		var updateAttrs = false;
		if (dropType === "Agents"){     
			console.log("It's an Agent");
		   updateAttrs=  dropAgent(dropDataParsed);
		}
		
		if (dropType === "Bonds"){     
			console.log("It's a Bond");
            updateAttrs= dropBond(dropDataParsed);
		}
		if (dropType === "SpecialTrainings"){     
			console.log("It's an Special Training");
			updateAttrs= dropSpecialTraining(dropDataParsed);
		}
		if (dropType === "Weapons"){
	        console.log("It's a Weapon");

			updateAttrs= dropWeapon(dropDataParsed);
		}
		if (updateAttrs === false) {
			updateAttrs = {...{drop_name:"", drop_data:"",drop_category:""}};
			setAttrs(updateAttrs);
			return	console.warn("Drag and drop could not identify the type of drop");
		}
		if (typeof updateAttrs !== "object") {
			updateAttrs = {...{drop_name:"", drop_data:"",drop_category:""}};
			setAttrs(updateAttrs);
			return console.warn("Drag and drop returned  broken value");
		}
		const updateAttrsTot = {...updateAttrs, ...{drop_name:"", drop_data:"",drop_category:""}};
		
		setAttrs(updateAttrsTot,{silent:false},()=>{
				console.info("Dropped Values:",updateAttrsTot);
		});

	});
}

on("change:drop_data", (eventInfo) => {
	const jsonData = JSON.parse(eventInfo.newValue);
	console.log(jsonData);
	handleDragandDrop();
	// do something with data
});
