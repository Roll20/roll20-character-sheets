/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033,-*/
/*Styling Functions*/
const styleSecurity = function(obj,attributes,setObj,sections){
  let sL = Math.min(6,Math.max(0,value(attributes.security_level)));
  if(sL !== value(attributes.security_level)){
    setObj.security_level = sL;
  }
  if(sL >= 1 && sL <= 6){
    $20('#main').addClass(`level-${sL}`);
  }
  [1,2,3,4,5,6].forEach((n)=>{
    if(n !== value(attributes.security_level)){
      $20('#main').removeClass(`level-${n}`);
    }
  });
};
const clearTracker = function(jEvent){
  if(!jEvent.altKey) return;
  const setObj = {};
  setObj[`${jEvent.htmlAttributes.for.replace(/\-\d+/,'')}`]=0;
  set(setObj,true);
};
const sectionDisplay = function(obj,attributes){
  let target = attributes.section;
  let sections = ['attributes','attacks','actions','character_details','equipment'];
  let targArray = [target];
  if(target === 'all'){
    //handling for displaying all sections
    $20(`#main`).addClass('all');
    sections.forEach((id)=>{
      $20(`#${id}`).removeClass('active-section');
    });
  }else{
    $20(`#main`).removeClass('all');
    sections.forEach((id)=>{
      if(targArray.find(t => id===t)){
        $20(`#${id}`).addClass('active-section');
      }else{
        $20(`#${id}`).removeClass('active-section');
      }
    });
  }
};
//Die purchase verification functions
//Verifies if there is an available die of the size to be purchased, and that the prereq dice have been bought as well
const verifyDiePurchase = function(obj,attributes,setObj,sections){
  let ability;
  let dieSize;
  obj.name.replace(/(.+)_(.+)/,(match,a,d)=>{
    ability = a;
    dieSize = d;
  });
  const purchasedDie = attributes[obj.name];
  verifyAvailableDie(obj,dieSize,attributes,setObj,sections);
  if(dieSize!=='d8'){
    verifyPrereqDie(obj,ability,dieSize,attributes,setObj,sections);
  }
  let controlledDie = dieSizes[dieSizes.indexOf(+dieSize.replace(/d/,'')) + 1];
  if(dieSize!=='d12' && +attributes[obj.name] < +attributes[`${ability}_d${controlledDie}`]*2){
    obj.affects.push(`${ability}_d${controlledDie}`);
    if(ability === 'health'){
      obj.affects = obj.affects.filter(aff => aff !== 'hp_max');
      obj.affects.push('hp_max');
    }
  }
};
const verifyAvailableDie = function(obj,dieSize,attributes,setObj,sections){
  const purchased = +attributes[`purchased_${dieSize}`];
  const available = +attributes[`available_${dieSize}`];
  const totalDie = +attributes[`total_${dieSize}`];
  const newPurchased = purchasedDice(obj,attributes,setObj,sections);
  const newAvailable = totalDie - newPurchased;
  if(newAvailable < 0){
    setObj[obj.name] = +attributes[obj.name] + newAvailable;
    attributes[obj.name] = setObj[obj.name];
  }
};
const verifyPrereqDie = function(obj,ability,dieSize,attributes,setObj,sections){
  let prereqDie = dieSizes[dieSizes.indexOf(+dieSize.replace(/d/,'')) - 1];
  let validDie = Math.floor(attributes[`${ability}_d${prereqDie}`]/2);
  if(validDie < +attributes[obj.name]){
    setObj[obj.name] = validDie;
    attributes[obj.name] = setObj[obj.name];
  }
};
const purchasedDice = function(obj,attributes,setObj,sections){
  let dieSize = obj.name.replace(/.+_(.+)/,'$1');
  let retVal = abilityScores.reduce((m,abi)=>{
    return m+= +attributes[`${abi}_${dieSize}`];
  },0);
  return retVal;
};
const availableDice = function(obj,attributes,setObj,sections){
  let dieSize = obj.name.replace(/.+_(.+)/,'$1');
  let retVal = +attributes[`total_${dieSize}`] - +attributes[`purchased_${dieSize}`];
  return retVal;
};
const purchaseDie = async function(jEvent,charID){
  setActiveCharacterId(charID);
  const attributes = await _getAttrs(['experience',...baseGet]);
  const die = jEvent.htmlAttributes.name.replace(/act_purchase_/,'');
  const xp = value(attributes.experience);
  const setObj = {};
  let roll;
  if(jEvent.altKey){
    //refund dice
    if(value(attributes[`available_${die}`]) <= 0 || value(attributes[`total_${die}`]) <= cascades[`total_${die}`].defaultValue){
      //Must have the default minimum and at least 1 die available
      roll = await startRoll(`/w @{character_name} @{template_start} {{sheet_message=^{insufficient available ${die}}}} {{available ${die}=[[@{available_${die}}]]}}`);
    }else if(value(attributes[`available_${die}`]) <= 1 || value(attributes[`total_${die}`]) <= cascades[`total_${die}`].defaultValue + 1){
      //refund a single die
      setObj.experience = xp + expCosts[die];
      setObj[`total_${die}`] = value(attributes[`total_${die}`]) - 1;
    }else{
      //refund multiple dice
      let query = Math.min(value(attributes[`available_${die}`]),value(attributes[`total_${die}`]) - cascades[`total_${die}`].defaultValue);
      query = [...Array(query).keys()].map((dn)=>dn+1).join('|');
      query = `?{${getTranslationByKey(`refund ${die} query`)}|${query}}`;
      roll = await startRoll(`!scpMessage @{template_start} {{diceNumber=[[${query}]]}}`);
      setObj.experience = xp + expCosts[die]*roll.results.diceNumber.result;
      setObj[`total_${die}`] = value(attributes[`total_${die}`]) - roll.results.diceNumber.result;
    }
  }else{
    if(!xp || xp < expCosts[die]){
      //insufficient xp message
      roll = await startRoll(`/w @{character_name} @{template_start} {{sheet_message=^{insufficient experience ${die}}}} {{available xp=[[@{experience}]]}}`);
    }else if(xp < expCosts[die]*2){
      //buy a single die
      setObj.experience = xp - expCosts[die];
      setObj.experience = setObj.experience <= 0 ? '' : setObj.experience;
      setObj[`total_${die}`] = value(attributes[`total_${die}`]) + 1;
    }else{
      //buy multiple dice
      let query = Math.floor(xp/expCosts[die]);
      query = [...Array(query).keys()].map((dn)=>dn+1).join('|');
      query = `?{${getTranslationByKey(`purchase ${die} query`)}|${query}}`;
      roll = await startRoll(`!scpMessage @{template_start} {{diceNumber=[[${query}]]}}`);
      setObj.experience = xp - expCosts[die]*roll.results.diceNumber.result;
      setObj.experience = setObj.experience <= 0 ? '' : setObj.experience;
      setObj[`total_${die}`] = value(attributes[`total_${die}`]) + roll.results.diceNumber.result;
    }
  }
  if(roll){
    finishRoll(roll.rollId);
  }
  set(setObj,true);
};
const throttledPurchaseDie = defaultThrottle(purchaseDie);
const purchaseDieReact = function(jEvent){
  const charID = getActiveCharacterId();
  throttledPurchaseDie(jEvent,charID);
};

//Exertion checks
const verifyExertion = function(obj,attributes,setObj,sections){
  if(value(attributes.exertion) > value(attributes.exertion_max)){
    setObj.exertion = attributes.exertion_max;
    attributes.exertion = setObj.exertion;
  }
};

//# Calculation Functions #
//If this is a new character, add reverence for each fate d8, and 3 reverence for each fate d10
const startingReverence = function(obj,attributes,setObj,sections){
  if(value(attributes.security_level) <= 0){
    setObj.reverence = Math.min(7,value(attributes.fate_d8)+value(attributes.fate_d10)*3);
  }
};
//calculates the hp max, and applies the difference to the current hp
const hpCalc = function(obj,attributes,setObj,sections){
  const bodyBonus = {
    short:0,
    thin:5,
    average:10,
    heavyset:15,
    beast:20,
  };
  const healthBonus = {
    d8:3,
    d10:6,
    d12:16
  };
  let hp_max = dieSizes.reduce((total,die)=>{
    return total + healthBonus[`d${die}`]*value(attributes[`health_d${die}`]);
  },10 + bodyBonus[attributes.body_type]);
  let diff = hp_max - value(attributes.hp_max);
  setObj.hp = value(attributes.hp) + diff;
  attributes.hp = setObj.hp;
  return hp_max;
};

//calculates maximum exertion and applies the difference to the current exertion
const exertionCalc = function(obj,attributes,setObj,sections){
  let exertion_max = value(attributes.willpower_d10) + 1;
  let diff = exertion_max - value(attributes.exertion_max);
  setObj.exertion = Math.min(Math.max(value(attributes.exertion) + diff,0),7);
  return exertion_max;
};

//calculates the reaction defense
const rdCalc = function(obj,attributes,setObj,sections){
  const bodyBonus = {
    short:6,
    thin:4,
    average:3,
    heavyset:2,
    beast:0,
  };
  return value(attributes.intelligence_d10) + value(attributes.perception_d10) + value(attributes.dexterity_d12) + value(attributes['awareness/reaction_proficiency']) + value(bodyBonus[attributes.body_type]);
};

const cognitiveCalc = function(obj,attributes,setObj,sections){
  const reasoningBonus = {
    naive:15,
    skeptical:12,
    scientific:9,
    'open-minded':6,
    nuts:3
  };
  return value(attributes.exertion_max) + value(attributes['self-control_proficiency']) + value(attributes['self-control_mod']) + reasoningBonus[attributes.reasoning];
};

//Calculates the move speed
const moveCalc = function(obj,attributes,setObj,sections){
  return 2 + value(attributes.dexterity_d12);
};

//Calculates the damage multiplier
const damageMultiplierCalc = function(obj,attributes,setObj,sections){
  const abilitySwitch = {
    melee:'strength',
    ranged:'perception'
  };
  let type = obj.name.replace(/_multiplier/,'');
  let ability = abilitySwitch[type];
  return 1+ Math.ceil(value(attributes[`${ability}_d10`])/2) +value(attributes[`${ability}_d12`]);
};

//Calculates the final recoil value
const recoilCalc = function(obj,attributes,setObj,sections){
  let [section,rowID,field] = parseRepeatName(obj.name);
  return Math.max(value(attributes[`${section}_${rowID}_recoil_base`]) - value(attributes.strength_d12),0);
};

//Calculates the modifier for skills/knowledges/abilities
const actionModCalc = function(obj,attributes,setObj,sections){
  const appearanceBonuses = {
    'negotiation/persuade':{beautiful:2,attractive:1,average:0,strange:0,creepy:-2},
    'fashion/etiquette':{beautiful:1,attractive:1,average:0,strange:0,creepy:-2},
    leadership:{beautiful:1,attractive:0,average:0,strange:0,creepy:0},
    'disguise/blend_in':{beautiful:-1,attractive:-1,average:2,strange:-2,creepy:1},
    'intimidate/taunt':{beautiful:-1,attractive:-1,average:0,strange:1,creepy:2},
    showmanship:{beautiful:0,attractive:0,average:0,strange:1,creepy:0},
    resist_distress:{beautiful:-2,attractive:0,average:0,strange:0,creepy:1},
  };
  const reasoningBonuses = {
    resist_distress:{naive:3,skeptical:2,scientific:0,'open-minded':-1,nuts:-2},
    initiative:{naive:-3,skeptical:-2,scientific:0,'open-minded':2,nuts:3},
    intuition:{naive:-3,skeptical:-2,scientific:0,'open-minded':2,nuts:3},
    'occult/scp_lore':{naive:-2,skeptical:0,scientific:0,'open-minded':0,nuts:2},
  };
  let action = obj.name.replace(/_mod/,'');
  let aBonus = appearanceBonuses[action] ? appearanceBonuses[action][attributes.appearance] : 0;
  let rBonus = reasoningBonuses[action] ? reasoningBonuses[action][attributes.reasoning] : 0;
  return value(attributes[`${action}_base_mod`]) + aBonus + rBonus;
};

/*
  Roll Functions
*/
//the base query text for asking the user for input. Can be a straigh number (e.g. number of dice) or complex text if wrapped in a roll label. Must be inline roll compatible
const queryRollText = string => `!@{template_start} {{query=[[${string}]]}}`;

//initiates the logic to roll an attribute check (skill,knowledge,ability,attack,flat attribute check, etc)
const attributeCheck = async function(event,charID){
  let prevID = setActiveCharacterId(charID);
  const [attributes,,sections] = await _getAllAttrs([...baseGet],[...repeatingSectionDetails,{section:'repeating_roll',fields:['json','date','roll_id']}]);
  let section,rowID,field;
  let prevInfo;
  if(event.originalRollId){
    let lastRoll = sections.repeating_roll.find((id)=>attributes[`repeating_roll_${id}_roll_id`]===event.originalRollId);
    if(!lastRoll){
      return;
    }
    prevInfo = JSON.parse(attributes[`repeating_roll_${lastRoll}_json`]);
		prevInfo.originalRollId = event.originalRollId;
  }else{
    [section,rowID,field] = parseClickTrigger(event.triggerName);
  }
  let attribute;
  let modifier;
  const setObj = {};
  let rollName;
  if(section){
    attribute='dexterity';
    modifier = modifierReference(rowID,attributes);
    if(!/melee/.test(modifier)){
      let stance = `${section}_${rowID}_stance`;
      setObj[stance] = Math.max(Math.min(value(attributes[stance]) - value(attributes[`${section}_${rowID}_recoil`]),3),0);
    }
    rollName = attributes[`${section}_${rowID}_weapon`];
  }else if(!prevInfo){
    rollName = field;
    attribute = attributeChecks[rollName];
    modifier = modifierReference(rollName);
    rollName = `^{${rollName.replace(/_/g,' ')}}`;
  }else{
    setObj.reverence = Math.max(+attributes.reverence - 1,0);
		rollName = prevInfo.rollRef;
	}
  const availableDice = dieSizes.reduce((m,die)=>{
    let numDie = value(attributes[`${attribute}_d${die}`]);
    if(numDie > 0){
      m[`d${die}`] = numDie;
    }
    return m;
  },{});
  const queue = Object.keys(availableDice);
  const chosenDice = prevInfo || await attributeRollQueries(queue,availableDice);
	modifier = modifier || chosenDice.modifier;
	chosenDice.modifier = modifier || '';
  await useExertion(chosenDice,attributes,attribute,setObj);
  chosenDice.rollRef = section ? `${section}_${rowID}_${field}` : rollName;
	if(chosenDice.originalRollId){
    rollName = chosenDice.rollRef.startsWith('repeating') ? attributes[chosenDice.rollRef.replace(/(repeating_[^_]+_[^_]+_).+/,'$1weapon')] : chosenDice.rollRef;
		rollName = `^{reroll}: ${rollName}`;
	}
  if(Object.keys(chosenDice).every(key=>!chosenDice[key])){
    sendCritFail(rollName,attribute);
    return;
  }
  checkRollLog(sections,attributes);
  sendFinalRoll(rollName,attribute,chosenDice,modifier,attributes,setObj);
};
const throttledAttrCheck = defaultThrottle(attributeCheck);

//Asks the user what dice they want to use
const attributeRollQueries = async function(queue,availableDice,chosenDice,total){
  let useMax = 0;
  const baseChosen = {d8:0,d10:0,d12:0,exertion:0,d8Crit:0,d10Crit:0,d12Crit:0};
  if(!Object.keys(availableDice).length){
    return baseChosen;
  }
  if(!chosenDice){
    let maxQuery = queryRollText(`?{${getTranslationByKey('use largest dice')}|${getTranslationByKey('yes')},1|${getTranslationByKey('no')},0}`)
    let maxRoll = await startRoll(maxQuery);
    useMax = maxRoll.results.query.result;
  }
  total = total || 0;
  chosenDice = useMax ? chooseLargestDice(availableDice) : (chosenDice || baseChosen);
  if(useMax){//short circuit if the user just wants to use their largest dice.
    return chosenDice;
  }
  let currentDie = queue.pop();
  let dieTranslation = getTranslationByKey(`${currentDie} use`);
  let optNum = Math.min(availableDice[currentDie]+1,5-total);
  let qOpts = _.range(optNum).join('|');
  let dieQuery = queryRollText(`?{${dieTranslation}|${qOpts}}`);
  let queryRoll = await startRoll(dieQuery);
  finishRoll(queryRoll.rollId);
  chosenDice[currentDie] = queryRoll.results.query.result;
  total += chosenDice[currentDie];
  if(total < 4 && queue[0]){
    return attributeRollQueries(queue,availableDice,chosenDice,total);
  }else{
    return chosenDice;
  }
};

//Assigns the largest dice when the user selects that they just want to use the maximum
const chooseLargestDice = function(availableDice){
  let baseChosen = {d8:0,d10:0,d12:0,exertion:0,d8Crit:0,d10Crit:0,d12Crit:0};
  let total = 0;
  [...dieSizes].reverse().some((die)=>{
    baseChosen[`d${die}`] = availableDice[`d${die}`] ? Math.min(availableDice[`d${die}`],4-total) : 0;
    assignCritDice(`d${die}`,baseChosen);
    total += baseChosen[`d${die}`];
    return total >= 4;
  });
  return baseChosen;
};

//Assembles the appropriate number of critical dice based on which dice are selected. (e.g. 1d8 needs 1 d8Crit, 2 d10Crits, and 2 d12Crits)
const assignCritDice = function(currentDie,chosenDice){
  let critNum = currentDie === 'd10' ? chosenDice[currentDie]*2 : chosenDice[currentDie];
  ['d8','d10','d12'].filter((die)=>value(currentDie.replace(/d/,'')) <= value(die.replace(/d/,''))).forEach((die)=>{
    chosenDice[`${die}Crit`] += critNum;
  });
};

//checks if exertion is available and asks how much you want to use
const useExertion = async function(chosenDice,attributes,attribute,setObj){
  let availableExertion = value(attributes.exertion);
  if(availableExertion > 0 && /^(?:str|hea|dex|will)/.test(attribute)){
    let exertionTranslation = chosenDice.exertion ? getTranslationByKey('additional exertion use') : getTranslationByKey(`exertion use`);
    let exertionQuery = queryRollText(`?{${exertionTranslation}|${_.range(availableExertion + 1).join('|')}}`);
    let exertionRoll = await startRoll(exertionQuery);
    finishRoll(exertionRoll.rollId);
    chosenDice.exertion = value(chosenDice.exertion) + exertionRoll.results.query.result;
    if(chosenDice.d12Crit || chosenDice.d12Crit === 0){
      chosenDice.d12Crit += chosenDice.exertion;
    }
    setObj.exertion = availableExertion - chosenDice.exertion;
  }
  return;
}
//Begin the actual roll of the attribute check
const sendFinalRoll = async function(rollName,attribute,chosenDice,modifier,attributes,setObj){
  let allRolls = Object.keys(chosenDice).reduce((m,key)=>{
    if(isDieRoll(key)){
      m[key] = m[key] || [];
      let dieSize = key;
      if(key === 'exertion'){
        dieSize = 'd12';
      }else if(/crit/i.test(key)){
        let origin = value(key.replace(/[a-z]/ig,'')) + 2;
        origin = origin > 12 ? 20 : origin;
        dieSize = `d${origin}`;
      }
      _.range(chosenDice[key]).forEach(num =>{
        m[key].push(`{{${key}_${num+1}=[[1${dieSize}]]}}`);
      });
    }
    return m;
  },{});
  let initialText = ['d8','d10','d12','exertion'].reduce((m,die)=>{
    return m+=allRolls[die].join(' ');
  },` `);
  calculateRollResult(rollName,attribute,initialText,allRolls,chosenDice,modifier,attributes,setObj);
};

//create the reference to the values needed for the total modifier
const modifierReference = function(rollName,attributes){
  if(new RegExp(`^${abilityScores.join('|')}$`).test(rollName)){
    return '';
  }else if(/^-.+/.test(rollName)){
    let skill = attributes[`repeating_attack_${rollName}_skill`];
    let skillRef = skill.replace(/@|{|}/g,'');
    let bonus;
    if(skillRef === 'melee'){
      bonus = `[[0@{repeating_attack_${rollName}_melee_attack}]][${getTranslationByKey('melee')}]`;
    }else{
      let stance = value(attributes[`repeating_attack_${rollName}_stance`]);
      stance = stance === 1 ? 'hip': stance=== 2 ? 'ready' : stance===3 ? 'aim': null;
      bonus = stance ? `[[0@{repeating_attack_${rollName}_${stance}_attack}]][${getTranslationByKey(stance.toLowerCase())}]` : `0[${getTranslationByKey('wild')}]`;
    }
    return `[[0@{${skillRef}_proficiency} + 0@{${skillRef}_mod}]][${getTranslationByKey(skillRef.replace(/_/g,' ').toLowerCase())}] + ${bonus} +`;
  }else{
    return `[[0@{${rollName}_proficiency} ${/awareness|dodge/i.test(rollName) ? '' : `+ 0@{${rollName}_mod}`}]][${getTranslationByKey(rollName.replace(/_/g,' ').toLowerCase())}]+`;
  }
};

//send the final constructed roll and calculate results. Send followup rolls as needed.
const calculateRollResult = async function(rollName,attribute,rollText,allRolls,chosenDice,modifier,attributes,setObj,previousRolls = {}){
  let textToSend = `${rollPlaceholders(`{{modifier=[[${modifier||''}${chosenDice.exertion}[Exertion]]]}}`)}{{name=${rollName.replace(/_/g,' ').toLowerCase()}}} {{attribute=^{${attribute}}}} ${rollText}`;
  if(value(attributes.reverence) > 0 && !chosenDice.originalRollId){
    textToSend += `{{reverence=[^{reroll}](~reroll)}}`;
  }
  if(/repeating_attack/.test(chosenDice.rollRef)){
    textToSend += `{{damage_button=[^{roll damage}](~${chosenDice.rollRef.replace(/(repeating_attack_[^_]+_).+/,'$1damage_roll')})}} {{range=@{${chosenDice.rollRef.replace(/(repeating_attack_[^_]+_).+/,'$1range')}}}}`;
    if(value(attributes[chosenDice.rollRef.replace(/(repeating_attack_[^_]+_).+/,'$1stance')])<1 && attributes[chosenDice.rollRef.replace(/(repeating_attack_[^_]+_).+/,'$1skill')] !=='@{melee}'){
      textToSend +=`{{description=^{out of stance}\n@{${chosenDice.rollRef.replace(/(repeating_attack_[^_]+_).+/,'$1special')}}}}`;
    }else{
      textToSend += `{{description=@{${chosenDice.rollRef.replace(/(repeating_attack_[^_]+_).+/,'$1special')}}}}`;
    }
  }
  debug({textToSend});
  let roll = await startRoll(textToSend);
  let computeObj = {};
  const rollsNeeded = ['{{continuation=continuation}}'];
  Object.keys(roll.results).forEach((field)=>{
    previousRolls[field] = roll.results[field].result;
    if(isDieRoll(field)){
      let rollMax = roll.results[field].rolls.shift();
      rollMax = rollMax ? rollMax.sides : undefined;
      if(rollMax && previousRolls[field] >= rollMax){
        if(rollMax < 20){
          nextDie = rollMax + 2;
          nextDie = rollMax > 12 ? 20 : rollMax;
          if(nextDie === 10){
            rollsNeeded.push(allRolls[`d${nextDie}Crit`].shift());
          }
          nextDie = allRolls[`d${nextDie}Crit`].shift();
          if(nextDie){
            rollsNeeded.push(nextDie);
          }
        }
      }
    }
  });
  if(rollsNeeded[1]){
    if(!previousRolls.first){
      rollsNeeded.push('{{first=[[1]]}}');
    }
    finishRoll(roll.rollId,computeObj);
    calculateRollResult(rollName,attribute,rollsNeeded.join(' '),allRolls,chosenDice,modifier,attributes,setObj,previousRolls);
  }else{
		if(!chosenDice.originalRollId){
      let newID = generateRowID();
			setObj[`repeating_roll_${newID}_json`] = JSON.stringify(chosenDice);
			setObj[`repeating_roll_${newID}_date`] = Date.now();
			setObj[`repeating_roll_${newID}_roll_id`] = roll.rollId;
		}
    if(roll.results.modifier){
      computeObj.modifier = roll.results.modifier.result >= 0 ? `+${roll.results.modifier.result}` : roll.results.modifier.result;
    }
    debug({setObj});
    set(setObj);
    computeRoll(roll.rollId,previousRolls,computeObj);
  }
};

//Compute the final result of all rolls made for the check (initial roll and explosions)
const computeRoll = function(rollId,previousRolls,computeObj){
  computeObj = {...computeObj,total:previousRolls.modifier};
  let ones = 0;
  let highKeys = Object.keys(previousRolls).reduce((m,key)=>{
      if(isDieRoll(key)){
        ones -= previousRolls[key] === 1 ? 1 : 0;
        m.push(key);
      }
      return m;
    },[])
    .sort((a,b)=>previousRolls[b]-previousRolls[a]);//sort high to low
  let highTotal = value(previousRolls[highKeys[0]]) + value(previousRolls[highKeys[1]]); //sum the two highest
  [0,1].forEach((n)=>{
    let targetDie = (highKeys[n] || '').replace(/(d(\d+)|exertion)(Crit)?_\d+/,(match,die,sides,crit)=>{
      sides = die === 'exertion' ? 12 : value(sides);
      if(crit){
        sides += 2;
        sides = sides > 12 ? 20 : sides;
      }
      computeObj[`high_sides_${n+1}`]=sides;
      computeObj[`high_${n+1}`]=previousRolls[highKeys[n]];
    });
  });
  computeObj.total += highTotal + ones;
  computeObj.ones = ones === 0 ? `-${ones}` : ones;
  computeObj.finished = 1;
  finishRoll(rollId,computeObj);
};

//Sends a message that the character has no dice to roll.
const sendCritFail = async function(rollName,attribute){
  let roll = await startRoll(`@{template_start} ${baseRollText} {{name=${rollName.replace(/_/g,' ').toLowerCase()}}} {{finished=[[1]]}} {{description=^{no ${attribute} dice to roll}}} `);
  finishRoll(roll.rollId);
};

//Rolls the appropriate damage or critical damage for the attack. Must be triggered from an attack roll's chat output.
const rollDamage = async function(event){
  let [section,rowID,field] = parseClickTrigger(event.triggerName);
  let row = `${section}_${rowID}`;
  const getArr = ['melee_multiplier','ranged_multiplier','exertion',`${row}_skill`,`${row}_base_damage`,`${row}_x_damage`];
  const attributes = await _getAttrs(getArr);
  const setObj = {};
  let damageRoll = await constructDamageRoll(row,attributes,setObj);
  debug({attributes,damageRoll});
  let roll = await startRoll(`@{template_start} ${damageRoll} ${baseRollText} {{name=@{${row}_weapon}}} {{finished=[[1]]}} {{security_level=@{security_level}}} {{element=@{${row}_element}}}`);
  const computeObj = {total_damage:0};
  computeObj.total_damage = ['x','base'].reduce((tot,attr)=>{
    let field = `${attr}_damage`;
    return tot += roll.results[field] ? roll.results[field].result : 0;
  },0);
  finishRoll(roll.rollId,computeObj);
  set(setObj);
};
const constructDamageRoll = async function(row,attributes,setObj){
  let skill = attributes[`${row}_skill`];
  let mult;
  if(/melee/.test(skill)){
    const chosen = {};
    await useExertion(chosen,attributes,'dexterity',setObj);
    mult = value(attributes.melee_multiplier);
    mult += value(chosen.exertion);
  }else{
    mult = value(attributes.ranged_multiplier);
  }
  let attackAttributes = ['weapon','skill','recoil','recoil_base','stance','melee_attack','hip_attack','ready_attack','aim_attack','clipsize','base_damage','x_damage','element','range','special'];
  return ['base','x'].reduce((text,attr)=>{
    attributes[`${row}_${attr}_damage`]
      .replace(/@{(.+?)}/,(match,a)=>{
        return new RegExp(attackAttributes.join('|'),'i').test(a) ? `@{${row}_${a}}` : match;
      })
      .replace(/(\d+)d(\d+)(?:(\s*[\+\-]\s*)(\d+|(?:\[\[)?[@?]{.+?))?/,(match,dN,dS,modEx,mod)=>{
        let dam;
        if('x' === attr){
          dam = `[[${mult}*${dN}]]d${dS}`;
          if(mod){
            dam +=`${modEx||''}[[${mod}]]*${mult}[${getTranslationByKey('multiplier')}]`;
          }
        }else{
          dam = match;
        }
        text += `{{${attr}_damage=[[${dam}]]}}`;
      });
    return text;
  },`{{total_damage=[[0[${getTranslationByKey('computed value')}]]]}}`);
};