/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//Sheet navigation
const navigateSheet = function(event){
  debug({event});
  let [,target] = event.triggerName.match(/nav-([^\s]+)/);
  setActiveSections(target);
  set({sheet_view:target});
};

const setActiveSections = function(target){
  debug({target});
  sheetSections.forEach((section)=>{
    let action = section === target ? 'addClass' : 'removeClass';
    $20(`.toggle__tab--${section}`).removeClass('active');
    $20(`section.${section}`).removeClass('active');
  });
  $20(`.toggle__tab--${target}`).addClass('active');
  $20(`section.${target}`).addClass('active');
};

const displayButtons = function(event){
  getAttrs(['sheet_type'],(attributes)=>{
    let target = attributes.sheet_type;
    debug({target});
    sheetSections.forEach((section)=>{
      if(section !== target && section !== 'settings'){
        $20(`.toggle__tab--${section}`).addClass('inactive');
      }
    })
    $20(`.toggle__tab--${target}`).removeClass('inactive') ;
  });
};

const repNameDictionary = {
  repeating_aptitudes:'aptitudename',
  repeating_advantages:'advantages',
  repeating_disadvantages:'disadvantages',
  repeating_powers:'powername',
  repeating_quality:'name',
  repeating_exceptional:'exceptionalname',
};

const calculateSuccess = function(event){
  let [section,rowID,attrName] = parseClickTrigger(event.triggerName);
  attrName = attrName
    .replace(/-/g,'_')
    .replace(/compute_/,'')
  let row = section ? `${section}_${rowID}` : undefined;
  getAttrs(['automation'],async (attributes)=>{
    let name;
    let capName;
    if(row){
      name = `${row}_${attrName}`;
      capName = `@{${row}_${repNameDictionary[section]}}`;
    }else{
      name = attrName;
      capName = capitalize(name);
    }
    const computed = {};
    let automateType = attributes.automation === 'query' ?
      await extractQueryResult('What kind of roll|Non-combat,non-combat|Offense,offense|Defense,defense') :
      await pseudoQuery(attributes.automation);
    let automate = parseAutomation(automateType,capName);
    capName = specifyActionType(automateType,capName);
    let roll = `@{template_start} {{name=${capName} check}} {{result=[[ [[0@{${name}}@{modifier_query}]]d6${/aptitude/.test(row) ? 'kh3' : ''}]]}}${automate}`;
    debug({roll});
    const intermediate = await startRoll(roll);
    let rollID = intermediate.rollId;
    if(!/off/.test(automateType)){
      computed.result = computeSuccess(automateType,intermediate.results);
      let typeWord = automateType === 'defense' ? `d6 Damage` : ` Success${computed.result !== 1 ? 'es':''}`;

      computed.result = `${computed.result}${typeWord}`;
    }
    finishRoll(rollID,computed);
  });
};

const specifyActionType = function(automateType,capName){
  return /(?:of|de)fense/.test(automateType) ? `${capitalize(automateType).replace(/e$/,'ive')} ${capName}` : capName;
};

const computeSuccess = function(automateType,results){
  let result = automateType === 'defense' ? results.target.result - results.result.result : results.result.result - results.target.result;
  debug({results,result})
  if(result >= 0){
    result = 1 + Math.floor((result)/6);
  }else{
    result = 0;
  }
  return result;
};

const parseAutomation = function(automate,capName){
  let retValue = /off/.test(automate) ? 
  '' :
  automate === 'defense' ?
    ` {{target_label=Attack Result}} {{target=[[0?{Attack Result|10}]]}}` :
    ` {{target=[[0?{${capName} Target Number|10}]]}}`;
  return retValue;
};

const update1x3 = function(attributes,sections,setObj){
  sections.repeating_powers.forEach((id)=>{
    if(attributes[`repeating_powers_${id}_powernamename`]){
      setObj[`repeating_powers_${id}_powername`] = attributes[`repeating_powers_${id}_powernamename`];
      attributes[`repeating_powers_${id}_powername`] = setObj[`repeating_powers_${id}_powername`];
      setObj[`repeating_powers_${id}_powernamename`] = '';
    }
  });
};

const update1x4 = function(attributes,setObj){
  debug({modifier_query:attributes.modifier_query});
  setObj.modifier_query = attributes.modifier_query.replace(/\}d6\]\]/,'}\]\]');
};
log('Sheet Booted Successfully');