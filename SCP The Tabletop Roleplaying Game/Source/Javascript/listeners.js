/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033,-*/
const triggerFunctions = function(obj,attributes,setObj,sections){
  obj.triggeredFuncs && obj.triggeredFuncs.forEach(func=>func(obj,attributes,setObj,sections));
};//accesses the sheet and iterates through all changes necessary before calling setAttrs
const accessSheet = async function(event){
  const [attributes,repeats,sections,casc] = await _getAllAttrs(baseGet);
  const setObj = {};
  let trigger = casc[event.sourceAttribute];
  if(!trigger){
    return;
  }
  triggerFunctions(trigger,attributes,setObj,sections);
  checkNumber(event.sourceAttribute,casc,attributes,setObj);
  let queue = [...trigger.affects];
  while(queue.length){
    let name = queue.shift();
    checkNumber(name,casc,attributes,setObj);
    debug(`processing ${name}`);
    let obj = casc[name];
    triggerFunctions(obj,attributes,setObj,sections);
    setObj[name] = setObj[name]===undefined ?  obj.calculation && obj.calculation(obj,attributes,setObj,sections) : setObj[name];
    debug({[`setObj[${name}]`]:setObj[name]});
    attributes[name] = setObj[name];
    queue = [...queue,...obj.affects];
    debug({queue});
  }
  set(setObj);
};

const registerEventHandlers = function(){
  on('sheet:opened',updateSheet);
  toMonitor.forEach((m)=>{
    on(`change:${m}`,accessSheet);
  });
  Object.keys(attributeChecks).forEach((b)=>{
    on(`clicked:${b.replace(/\s+/g,'_')}`,(event)=>{
      let charID = getActiveCharacterId();
      throttledAttrCheck(event,charID);
    });
  });
  on('clicked:repeating_attack:damage_roll',rollDamage);
};
$20('.die-purchase').on('click',purchaseDieReact)
$20('.fill-label').on('click',clearTracker);