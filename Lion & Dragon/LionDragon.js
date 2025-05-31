/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033,-*/
//Sheet variables
const version = 0.1;
const toMonitor = ['strength','dexterity','constitution','intelligence','wisdom','charisma','base_attack'];
const baseGet = [...toMonitor,'strength_mod','dexterity_mod','constitution_mod','intelligence_mod','wisdom_mod','charisma_mod'];
const repeatMonitor = ['repeating_arms','repeating_miracles','repeating_lores','repeating_equipment:weight','repeating_parry'];
const repeating_section_details = [
	/*TEMPLATE
	{
		section:'string',
		fields:['string','string']
	},
	*/
	{
		section:'repeating_arms',
		fields:['name','type','base_mod','custom_mod','damage','damage_ability','range','description']
	},
	{
		section:'repeating_parry',
		fields:['name','type','base_mod','custom_mod','block','block_mod','block_ability']
	},
	{
		section:'repeating_miracles',
		fields:['name','total_mod','custom_mod','description']
	},
	{
		section:'repeating_lores',
		fields:['name','total_mod','custom_mod','description']
	},
	{
		section:'repeating_equipment',
		fields:['weight']
	},
];

//Async functions
const setActiveCharacterId = function(charId){
    var oldAcid=getActiveCharacterId();
    var ev = new CustomEvent("message");
    ev.data={"id":"0", "type":"setActiveCharacter", "data":charId};
    self.dispatchEvent(ev); 
    return oldAcid;
};

const _getAttrs = function (props){
    var acid=getActiveCharacterId(); //save the current activeCharacterID in case it has changed when the promise runs 
    var prevAcid=null;               //local variable defined here, because it needs to be shared across the promise callbacks defined below
    return new Promise((resolve,reject)=>{
            prevAcid=setActiveCharacterId(acid);  //in case the activeCharacterId has changed, restore it to what we were expecting and save the current value to restore later
            try{
                getAttrs(props,(values)=>{  resolve(values); }); 
            }
            catch{ reject(); }
    }).finally(()=>{
        setActiveCharacterId(prevAcid); //restore activeCharcterId to what it was when the promise first ran
    });
};
//use the same pattern for each of the following...
const _setAttrs = function (propObj, options){
    var acid=getActiveCharacterId(); 
    var prevAcid=null;               
    return new Promise((resolve,reject)=>{
            prevAcid=setActiveCharacterId(acid);  
            try{
                setAttrs(propObj,options,(values)=>{ resolve(values); });
            }
            catch{ reject(); }
    }).finally(()=>{
        setActiveCharacterId(prevAcid); 
    });
};

const _getSectionIDs = function(sectionName){
    var acid=getActiveCharacterId(); 
    var prevAcid=null;               
    return new Promise((resolve,reject)=>{
            prevAcid=setActiveCharacterId(acid);  
            try{
                getSectionIDs(sectionName,(values)=>{ resolve(values); });
            }
            catch{ reject(); }
    }).finally(()=>{
        setActiveCharacterId(prevAcid); 
    });
};

const _getSections = function(){
	let queue = _.clone(repeating_section_details);
	const worker = async (repeatAttrs=[],sections={})=>{
		let detail = queue.shift();
		sections[detail.section] = sections[detail.section] || {};
		let IDs = await _getSectionIDs(detail.section);
		sections[detail.section] = IDs;
		let attrs = IDs.forEach((i)=>{
			detail.fields.forEach((f)=>{
				repeatAttrs.push(`${detail.section}_${i}_${f}`);
			});
		});
		if(queue.length){
			return worker(repeatAttrs,sections);
		}else{
			return [repeatAttrs,sections];
		}
	};
	return worker();

};

//Utility Functions
const log = function(msg){
    const sheetName = 'Lion & Dragon';
    if(typeof msg === 'string'){
        console.log(`%c${sheetName} log| ${msg}`,"background-color:#159ccf");
    }else if(typeof msg === 'object'){
    	Object.keys(msg).forEach((m)=>{
    		if(typeof msg[m] === 'string'){
    			console.log(`%c${sheetName} log| ${m}: ${msg[m]}`,"background-color:#159ccf");
    		}else{
	            console.log(`%c${sheetName} log| ${typeof msg[m]} ${m}`,"background-color:#159ccf");
	            console.table(msg[m]);
    		}
    	});
    }
};

const updateSheet = async function(){
	let attributes = _getAttrs(['sheet_version',...baseGet]);
	const setObj = {
		sheet_version:version
	};
	log(`Sheet Update applied. Current Sheet Version ${version}`);
	set(setObj);
}
const set = function(setObj,callback){
	log({setObj});
	return setAttrs(setObj,{silent:true},callback);
};

const expandRepeating = function(cascade,sections,attributes){
	return _.keys(cascade).reduce((memo,key)=>{
		if(/^repeating/.test(key)){
			key.replace(/(repeating_[^_]+)_[^_]+_(.+)/,(match,section,field)=>{
				_.each(sections[section],(id)=>{
					let row = `${section}_${id}_${field}`;
					memo[row]=_.clone(cascade[key]);
					memo[row].affects = memo[row].affects.map((affected)=>{
						return affected.replace(/(repeating_[^_]+_)[^_]+(.+)/,`$1${id}$2`);
					});
					memo[row].name = row;
					if(memo[row].calculation && typeof memo[row].calculation === 'string'){
						memo[row].calculation = memo[row].calculation.replace(/(@{repeating_[^_]+?_)[^_]+?(_.+?})/g,`$1${id}$2`);
					}
				});
			});
		}else{
			memo[key] = _.clone(cascade[key]);
			memo[key].affects = memo[key].affects.reduce((m,a)=>{
				if(/^repeating/.test(a)){
					a.replace(/(repeating_[^_]+?)_[^_]+?(_.+)/,(match,section,field)=>{
						if(section === 'repeating_arms' && /_mod$/.test(key) && field==='_total_mod'){
							sections[section].forEach((id)=>{
								if(attributes[`${section}_${id}_type`]===`@{${key}}`){
									m.push(`${section}_${id}${field}`);
									log({m});
								}
							});
						}else{
							sections[section].forEach(id=>m.push(`${section}_${id}${field}`));
						}
					});
				}else{
					m.push(a);
				}
				return m;
			},[])
		}
		return memo;
	},{});
};

//Calculation Functions
const abilityMod = function(score){
	let mod;
	score = +score;
	log({score});
	if(score <= 3){
		mod = -3;
	}
	else if(score <= 5){
		mod = -2;
	}
	else if(score <= 8){
		mod = -1;
	}
	else if(score <= 12){
		mod = 0;
	}
	else if(score <= 15){
		mod = 1;
	}
	else if(score <= 17){
		mod = 2;
	}else{
		mod = 3;
	}
	log({mod});
	return mod;
};

const sheetCalc = function(name,calculation,attributes,setObj){
	let parsedCalc = calculation;
	if(calculation === 'mod') return abilityMod(attributes[name.replace(/_mod/,'')]);
	parsedCalc = attributeParse(parsedCalc,attributes);
	parsedCalc = parsedCalc.replace(/floor|ceil|round|abs/g,'Math.$&').replace(/\[\[|\]\]|\[.*?\]|=/g,'');
	let finalCalc;
	try{
		finalCalc = eval(parsedCalc);
	}catch(err){
		finalCalc = undefined;
	}
	return finalCalc;
};

const attributeParse = function(string,attributes){
	log({string});
	while(/@{[^}]+}/.test(string)){
		log('attributeParse: Attribute call found');
		string = string.replace(/@{([^}]+)}/g,(match,name)=>{
			return attributes[name.toLowerCase()];
		});
	}
	return string;
};

//converts a value to a number, it's default value, or 0
const value = function(val,def){
  return (+val||def||0);
};

//Calculates total encumbrance
const totalEncumbrance = function(statObj,attributes,sections){
	log('Calculating Encumbrance');
	return sections.repeating_equipment.reduce((total,id)=>{
		return total += value(attributes[`repeating_equipment_${id}_weight`]);
	},0);
};

//Calculates total attack bonus
const attackBonus = function(statObj,attributes,sections){
	return attributes.base_attack;
};

//Sheet Functions
const accessSheet = async function(event){
	let [repeats,sections] = await _getSections();
	const attributes = await _getAttrs([...baseGet,...repeats]);
	log({sections,attributes});
	const setObj = {}
	const casc = expandRepeating(cascades,sections,attributes);
	let trigger = casc[event.sourceAttribute];
	log({event,trigger,casc});
	let queue = [...trigger.affects];
	log({queue});
	while(queue.length){
		let name = queue.shift();
		let obj = casc[name];
		log({obj,type:typeof obj.calculation});
		let val = typeof obj.calculation === 'string' ? sheetCalc(obj.name,obj.calculation,attributes,setObj) : obj.calculation(obj,attributes,sections);
		if(value(val) !== value(attributes[obj.name])){
			setObj[obj.name] = value(val);
			attributes[obj.name] = setObj[obj.name];
			queue = [...queue,...obj.affects];
		}
	}
	set(setObj);
};
const cascades = {
	//Attributes
	strength:{name:'strength',defaultValue:10,type:'number',affects:['strength_mod']},
	dexterity:{name:'dexterity',defaultValue:10,type:'number',affects:['dexterity_mod']},
	constitution:{name:'constitution',defaultValue:10,type:'number',affects:['constitution_mod']},
	intelligence:{name:'intelligence',defaultValue:10,type:'number',affects:['intelligence_mod']},
	wisdom:{name:'wisdom',defaultValue:10,type:'number',affects:['wisdom_mod']},
	charisma:{name:'charisma',defaultValue:10,type:'number',affects:['charisma_mod']},
	strength_mod:{name:'strength_mod',defaultValue:0,type:'number',calculation:'mod',affects:[]},
	dexterity_mod:{name:'dexterity_mod',defaultValue:0,type:'number',calculation:'mod',affects:[]},
	constitution_mod:{name:'constitution_mod',defaultValue:0,type:'number',calculation:'mod',affects:[]},
	intelligence_mod:{name:'intelligence_mod',defaultValue:0,type:'number',calculation:'mod',affects:['repeating_lores_$X_total_mod']},
	wisdom_mod:{name:'wisdom_mod',defaultValue:0,type:'number',calculation:'mod',affects:['repeating_miracles_$X_total_mod']},
	charisma_mod:{name:'charisma_mod',defaultValue:0,type:'number',calculation:'mod',affects:[]},

	//Equipment/Encumbrance
	encumbrance:{name:'encumbrance',defaultValue:0,type:'number',affects:[],calculation:totalEncumbrance},
	repeating_equipment_$X_weight:{name:'repeating_equipment_$X_weight',defaultValue:0,type:'number',affects:['encumbrance']},

	//Base Attack/Arms/Def Combat
	base_attack:{name:'base_attack',defaultValue:0,type:'number',affects:['repeating_arms_$X_base_mod','repeating_parry_$X_base_mod']},
	repeating_arms_$X_name:{name:'repeating_arms_$X_name',defaultValue:0,type:'number',affects:['repeating_arms_$X_base_mod']},
	repeating_arms_$X_type:{name:'repeating_arms_$X_type',defaultValue:0,type:'number',affects:['repeating_arms_$X_base_mod']},
	repeating_arms_$X_base_mod:{name:'repeating_arms_$X_base_mod',defaultValue:0,type:'number',calculation:attackBonus,affects:[]},
	repeating_arms_$X_custom_mod:{name:'repeating_arms_$X_custom_mod',defaultValue:0,type:'number',affects:['repeating_arms_$X_base_mod']},
	repeating_arms_$X_damage:{name:'repeating_arms_$X_damage',defaultValue:0,type:'number',affects:['repeating_arms_$X_base_mod']},
	repeating_arms_$X_damage_ability:{name:'repeating_arms_$X_damage_ability',defaultValue:0,type:'number',affects:['repeating_arms_$X_base_mod']},
	repeating_arms_$X_range:{name:'repeating_arms_$X_range',defaultValue:0,type:'number',affects:['repeating_arms_$X_base_mod']},
	repeating_arms_$X_description:{name:'repeating_arms_$X_description',defaultValue:0,type:'number',affects:['repeating_arms_$X_base_mod']},

	repeating_parry_$X_name:{name:'repeating_parry_$X_name',defaultValue:0,type:'number',affects:['repeating_parry_$X_base_mod']},
	repeating_parry_$X_type:{name:'repeating_parry_$X_type',defaultValue:0,type:'number',affects:['repeating_parry_$X_base_mod']},
	repeating_parry_$X_base_mod:{name:'repeating_parry_$X_base_mod',defaultValue:0,type:'number',calculation:attackBonus,affects:[]},
	repeating_parry_$X_custom_mod:{name:'repeating_parry_$X_custom_mod',defaultValue:0,type:'number',affects:['repeating_parry_$X_base_mod']},
	repeating_parry_$X_block:{name:'repeating_parry_$X_damage',defaultValue:0,type:'number',affects:['repeating_parry_$X_base_mod']},
	repeating_parry_$X_block_ability:{name:'repeating_parry_$X_block_ability',defaultValue:0,type:'number',affects:['repeating_parry_$X_base_mod']},

	//Miracles
	repeating_miracles_$X_name:{name:'repeating_miracles_$X_name',defaultValue:0,type:'number',affects:['repeating_miracles_$X_total_mod']},
	repeating_miracles_$X_custom_mod:{name:'repeating_miracles_$X_custom_mod',defaultValue:0,type:'number',affects:['repeating_miracles_$X_total_mod']},
	repeating_miracles_$X_total_mod:{name:'repeating_miracles_$X_total_mod',defaultValue:0,type:'number',calculation:'@{repeating_miracles_$X_custom_mod}+@{wisdom_mod}',affects:[]},

	//Lores
	repeating_lores_$X_name:{name:'repeating_lores_$X_name',defaultValue:0,type:'number',affects:['repeating_lores_$X_total_mod']},
	repeating_lores_$X_custom_mod:{name:'repeating_lores_$X_custom_mod',defaultValue:0,type:'number',affects:['repeating_lores_$X_total_mod']},
	repeating_lores_$X_total_mod:{name:'repeating_lores_$X_total_mod',defaultValue:0,type:'number',calculation:'@{repeating_lores_$X_custom_mod}+@{intelligence_mod}',affects:[]},
};
//Listeners
on('sheet:opened',updateSheet);
[...baseGet,...repeatMonitor].forEach(g =>
	on(`change:${g}`,accessSheet)
);
log('Sheet Started');