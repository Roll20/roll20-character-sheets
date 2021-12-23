/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//accesses the sheet and iterates through all changes necessary before calling setAttrs
const accessSheet = function(event){
  debug({event});
  getAllAttrs({callback:(attributes,sections,casc)=>{
    let trigger = casc[event.sourceAttribute];
    processSheet(trigger,attributes,sections,casc);
  }});
};

const processSheet = function(trigger,attributes,sections,casc){
  debug({trigger});
  if(!trigger){
    return;
  }
  initialFunction(trigger,attributes,sections);//functions that should only be run if the attribute was the thing changed
  triggerFunctions(trigger,attributes,sections);//functions that cause complex changes to the character
  let queue = [...trigger.affects];
  while(queue.length){
    let name = queue.shift();
    debug(`processing ${name}`);
    let obj = casc[name];
    triggerFunctions(obj,attributes,sections);
    if(obj.calculation){
      attributes[name] = obj.calculation(obj,attributes,sections);//Basic calculation of an attribute value
    }
    queue = [...queue,...obj.affects];
  }
  debug('sheet accessed, setting attributes');
  attributes.set();
};
const registerEventHandlers = function(){
  on('sheet:opened',updateSheet);
  toMonitor.forEach((m)=>{
    on(`change:${m}`,accessSheet);
  });

  //Click Listeners
  navButtons.forEach((button)=>{
    on(`clicked:nav-${button}`,navigateSheet);
  });
  trackerMonitors.forEach((button)=>{
    on(`clicked:${button}`,clearTracker);
  });
  queryButtons.forEach((button)=>{
    on(`clicked:${button}`,dynamicSelect);
  });
  rollMonitor.forEach((button)=>{
    on(`clicked:${button}`,initiateRoll);
  });
  repeatAddMonitors.forEach((button)=>{
    on(`clicked:add-${button}`,addItem);
    on(`clicked:edit-${button}`,editSection);
  })
  //jQuery listeners
  $20('.expandable-header').on('click',expandHeader);
  $20('.image-container__button').on('click',toggleImageInput);
};