/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//Roll Listeners
const rollBasicMove = async function({trigger,attributes,sections}){
  const [,,field,activeEffects,rollObj,dice] = await baseRollInfo({trigger,attributes,sections});
  let statRef = getMoveResults(field.replace(/-/g,' '),rollObj,attributes);
  rollObj.roll = assembleRoll(dice,statRef,activeEffects,attributes.is_weird);
  executeRoll({rollObj});
};
k.registerFuncs({rollBasicMove});

const getMoveResults = function(move,rollObj,attributes){
  const possibleResults = basicMoves[move];
  ['critical','success','mixed','failure','fumble'].forEach((result)=>{
    if(result !== 'stat'){
      rollObj[`${result}_result`] = possibleResults[result] ?
        `^{${possibleResults[result]}}` :
        '';
    }
  });
  return attributes[`${move.replace(/\s+/g,'_')}_stat`];
};

const rollStat = async function({trigger,attributes,sections}){
  const [,,field,activeEffects,rollObj,dice] = await baseRollInfo({trigger,attributes,sections});
  rollObj.roll = assembleRoll(dice,`@{${field}}`,activeEffects,attributes.is_weird);
  executeRoll({rollObj});
};
k.registerFuncs({rollStat});

const rollSkill = async function({trigger,attributes,sections}){
  const [section,rowID,field,activeEffects,rollObj,dice] = await baseRollInfo({trigger,attributes,sections,isSkill:true});
  let statRef;
  rollObj.header = attributes[`${section}_${rowID}_${field === 'inability' ? field : 'name'}`];
  if(attributes.skill_basic_move){
    const query = k.capitalize(getTranslationByKey('move query'));
    const options = Object.keys(basicMoves)
      .map((key) => {
        return `${k.capitalize(getTranslationByKey(key))},${key}`
      })
      .join('|');
    const move = await k.extractQueryResult(`${query}|${options}`);
    statRef = getMoveResults(move,rollObj,attributes);
  }else{
    await k.pseudoQuery('');
    statRef = section === 'repeating_skill' ?
    (/inability/.test(field) ?
      'inability_stat' :
      'skill_stat'
    ) :
    'stat';
    statRef = attributes[`${section}_${rowID}_${statRef}`];
  }
  k.debug({section,rowID,field});
  
  rollObj.roll = assembleRoll(dice,statRef,activeEffects,attributes.is_weird);
  k.debug({skillObj:rollObj});
  executeRoll({rollObj});
};
k.registerFuncs({rollSkill});

const rollHelpFriend = async function({trigger,attributes,sections}){
  const [section,rowID,field,activeEffects,rollObj,dice] = await baseRollInfo({trigger,attributes,sections});
  const relationScore = attributes[`${section}_${rowID}_score`];
  rollObj.header = getTranslationByKey('help a friend roll header').replace('{{0}}',attributes[`${section}_${rowID}_name`]);
  k.debug({activeEffects});
  rollObj.roll = assembleRoll(dice,relationScore,activeEffects,attributes.is_weird);
  executeRoll({rollObj});
};
k.registerFuncs({rollHelpFriend});

const rollCharacterMove = async function({trigger,attributes,sections}){
  const [section,rowID,field,activeEffects,rollObj,dice] = await baseRollInfo({trigger,attributes,sections});
  rollObj.roll = assembleRoll(dice,'?{query}',activeEffects,attributes.is_weird);
  const fieldSwitch = {
    critical_result:attributes[`${section}_${rowID}_critical_success`] || attributes[`${section}_${rowID}_full_success`] || basicMoves['another move'].critical,
    success_result:attributes[`${section}_${rowID}_full_success`] || basicMoves['another move'].success,
    mixed_result:attributes[`${section}_${rowID}_mixed_success`] || basicMoves['another move'].mixed,
    failure_result:attributes[`${section}_${rowID}_failure`] || basicMoves['another move'].failure,
    fumble_result:attributes[`${section}_${rowID}_critical_failure`] || attributes[`${section}_${rowID}_failure`] || basicMoves['another move'].fumble
  };
  rollObj.header = attributes[`${section}_${rowID}_name`];
  Object.entries(fieldSwitch).forEach(([fieldName,content])=>{
    rollObj[fieldName] = content;
  });
  executeRoll({rollObj});
};
k.registerFuncs({rollCharacterMove});

const rollInitiative = async function({trigger,attributes,sections}){
  const [section,rowID,field,activeEffects,rollObj,dice] = await baseRollInfo({trigger,attributes,sections});
  rollObj.roll = assembleRoll(dice,attributes.fierce,activeEffects,attributes.is_weird)
    .replace(/\]\]/,'&{tracker}]]');
  executeRoll({rollObj});
};
k.registerFuncs({rollInitiative});

//Parse Functions
const baseRollInfo = async function({trigger,attributes,sections,isSkill}){
  const [section,rowID,button] = k.parseTriggerName(trigger.name);
  const field = button.replace(/-?action/,'');
  const baseEffects = {advantage:0,bonus:0,text:[]};
  if(isSkill){
    baseEffects.advantage = field === 'inability' ?
      -1 - attributes[`${section}_${rowID}_${field}_super`] :
      1 + attributes[`${section}_${rowID}_super`];
  }
  const activeEffects = await countEffects(attributes,sections,baseEffects);
  const rollObj = {
    header:`^{${field.replace(/-/g,' ')}}`,
    result:`[[0[computed value]]]`
  };
  if(baseEffects.text?.length){
    rollObj.description = baseEffects.text.map((text)=>`^{${text}}`).join('\n');
  }
  Object.entries(basicMoves['another move']).forEach(([result,effect])=>{
    if(result !== 'stat'){
      rollObj[`${result}_result`] = `^{${effect}}`;
    }
  });
  const dice = await parseAdvantage(attributes.advantage,activeEffects,attributes,rollObj);
  return [section,rowID,field,activeEffects,rollObj,dice];
};

/*
  The Compatibility Scores and their effects are as follows:
  -1 (Frenemies)
  The other PC rolls with Disadvantage. Each of you gains 1 AP.

  +0 (Acquaintances)
  The other PC gets +1 on their roll.

  +1 (Friends)
  CHOOSE 1
  The other PC gets +1 on their roll.
  The consequences of the other PC’s actions are “bigger” (Full Successes come with a small bonus, Failures come with an extra complication).
  
  +2 (Good Friends)
  CHOOSE 1
  The other PC gets +2 on their roll.
  The other PC rolls with Advantage.
  The consequences of the other PC’s actions are “bigger” (Full Successes come with a small bonus, Failures come with an extra complication).
  
  +3 (Family)
  CHOOSE UP TO 2
  The other PC gets +2 on their roll.
  The other PC rolls with Advantage.
  The consequences of the other PC’s move are “bigger” (Full Successes come with a small bonus, Failures come with an extra complication).
*/
const compatibilityQuery = async function(baseEffects,attributes,sections){
  const compatibleEffects = {
    '-1':{optNum:1,options:['disadvantage']},
    '0':{optNum:1,options:['+1']},
    '1':{optNum:1,options:['+1','bigger consequences']},
    '2':{optNum:1,options:['+1','advantage','bigger consequences']},
    '3':{optNum:2,options:['+2','advantage','bigger consequences']}
  }
  const activeID = sections.repeating_compatibility.reduce((memo,id)=>{
    return attributes[`repeating_compatibility_${id}_activate`] &&
      (!memo || attributes[`repeating_compatibility_${id}_score`] < attributes[`repeating_compatibility_${id}_score`]) ?
        id :
        memo;
  },'');
  const ordinals = {
    '1':'1st',
    '2':'2nd'
  }
  if(activeID){
    const activeEffect = compatibleEffects[attributes[`repeating_compatibility_${activeID}_score`]];
    k.debug({activeID,[`compatibleEffects[${attributes[`repeating_compatibility_${activeID}_score`]}]`]:activeEffect})
    const selectedEffects = [];
    if(activeEffect.options.length > 1){
      const effectWorker = async (iteration = 1)=>{
        const availableOptions = activeEffect.options.filter((opt)=>selectedEffects.indexOf(opt) === -1);
        const promptKey = activeEffect.optNum === 1 ?
          'Which compatibility effect' :
          `${ordinals[iteration]} compatible effect`;
        const selectedOption = await k.extractQueryResult(`${getTranslationByKey(promptKey)}|${availableOptions.map((opt)=>`${getTranslationByKey(`compatibility prompt ${opt}`)},${opt}`).join('|')}`);
        k.debug({selectedOption});
        selectedOption.replace(/\+?(.+)/,(match,effect)=>{
          if(+effect){
            baseEffects.bonus += +effect;
          }else if(/dis/.test(effect)){
            baseEffects.advantage--;
          }else if(/advantage/.test(effect)){
            baseEffects.advantage++;
          }else{
            baseEffects.text.push(effect);
          }
        });
        selectedEffects.push(selectedOption);
        iteration++;
        if(iteration > activeEffect.optNum){
          return true;
        }else{
          return effectWorker(iteration);
        }
      }
      await effectWorker();
    }else{
      selectedEffects.push(activeEffect.options[0]);
      await k.pseudoQuery();
    }
  }else{
    if(attributes.interference){
      baseEffects.advantage--;
      baseEffects.text.push('interference roll message');
    }
    await k.pseudoQuery();
  }
};

const countEffects = async function(attributes,sections,effectObj = {advantage:0,bonus:0}){
  let idArray;
  const baseEffects = {...effectObj};
  if(attributes.use_roll_modifiers){
    idArray = sections.repeating_modifier;
  }else{
    idArray = [];
    baseEffects.bonus = attributes.generic_bonus;
  }
  await compatibilityQuery(baseEffects,attributes,sections);
  k.debug({baseEffects});
  return idArray.reduce((memo,id)=>{
    k.debug({[`attributes[repeating_modifier_${id}_activate]`]:attributes[`repeating_modifier_${id}_activate`]});
    if(attributes[`repeating_modifier_${id}_activate`]){
      const effect = attributes[`repeating_modifier_${id}_effect`];
      k.debug({effect});
      const advs = effect.match(/(?:^|\s)(?:super )?advantage/ig) || [];
      const disadvs = effect.match(/(?:super )?disadvantage/ig) || [];
      const bonuses = effect.match(/(?:[+\-]\s*)?\d+/g) || [];
      k.debug({advs,disadvs,bonuses});
      memo.advantage = advs.reduce((total,adv)=>total += /super/.test(adv) ? 2 : 1,memo.advantage);
      memo.advantage = disadvs.reduce((total,adv)=>total -= /super/.test(adv) ? 2 : 1,memo.advantage);
      memo.bonus = bonuses.reduce((total,bonus)=>{
        const val = +bonus.replace(/\+/,'').trim();
        return total += val;
      },memo.bonus);
    }
    return memo;
  },{...baseEffects});
};

const parseAdvantage = async function(advantageState,activeEffects,attributes,rollObj){
  if(attributes.use_physical_dice){
    const result = +(await k.extractQueryResult(getTranslationByKey('physical roll query')));
    if(result === 12){
      rollObj.result = '[[1]]';
    }else if(result === 2){
      rollObj.result = '[[-1]]';
    }else{
      rollObj.result = '[[0]]';
    }
    return result;
  }else{
    await k.pseudoQuery('');
    if(advantageState.startsWith('?{')){
      //If the advantage state is a query, translate the query.
      const options = Object.entries(advantageTypes).map(([aType,aValue])=>{
        return `${k.capitalize(getTranslationByKey(`${aType} option`))},${aValue}`;
      }).join('|');
      return `?{${k.capitalize(getTranslationByKey('roll'))}|${options}}`;
    }else{
      //otherwise, just use the advantage as is.
      return activeEffects.advantage ?
        (() => {
          const diceNum = 2 + Math.abs(activeEffects.advantage);
          const keep = activeEffects.advantage > 0 ?
            'kh' :
            'kl';
          return `${diceNum}d6${keep}2`;
        })() :
        advantageState;
    }
  }
};

const assembleRoll = function(dice,chosenStat,activeEffects,isWeird){
  let stat;
  k.debug({chosenStat,activeEffects});
  if(`${chosenStat}`.startsWith('?{')){
    //If the advantage state is a query, translate the query.
    const options = attributeNames.map((attr)=>{
        if(attr !== 'weird' || isWeird){
          return `${k.capitalize(getTranslationByKey(attr))},@{${attr}}`;
        }else{
          return null;
        }
      })
      .filter((a)=>a)
      .join('|');
    stat = `+ ?{${k.capitalize(getTranslationByKey('which stat'))}|${options}}`;
  }else{
    //otherwise, just use the advantage as is.
    stat = `+ ${chosenStat}`;
  }
  const bonus = stringifyBonus(activeEffects.bonus);
  return `[[${dice}${stat}${bonus}]]`;
};

const stringifyBonus = function(bonus){
  k.debug({bonus});
  return bonus < 0 ?
    bonus :
    `+ ${bonus}`.replace(/\+ 0/,'');
};

const executeRoll = async function({rollObj}){
  k.debug({toExecute:rollObj});
  let message = `@{template_start} ${Object.entries(rollObj).map(([field,content])=>`{{${field}=${content}}}`).join('')}`;
  k.debug({message});
  const rolled = await startRoll(message);
  const computeObj = {};
  if(rolled.results.roll && rolled.results.result && /computed value/.test(rollObj.result)){
    const expression = rolled.results.roll.expression;
    let rollState;
    let rollQuant = 2;
    expression.replace(/d6k([hl])(\d+)/,(match,target,num)=>{
      rollState = target;
      rollQuant = +num || 2;
    });
    const diceRoll = rolled.results.roll.rolls[0];
    const rollTotal = diceRoll.results.sort((a,b)=>{
        if(rollState === 'l'){
          return a - b;
        }else if(rollState === 'h'){
          return b - a;
        }else{
          return 0;
        }
      })
      .slice(0,rollQuant);
    k.debug({rollTotal});
    const uniqueRolls = [...new Set(rollTotal)];
    if(uniqueRolls.length === 1){
      if(uniqueRolls[0] === 6){
        computeObj.result = 1;
      }else if(uniqueRolls[0] === 1){
        computeObj.result = -1;
      }
    }
  }
  finishRoll(rolled.rollId,computeObj);
};