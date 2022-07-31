/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/

const registerEventHandlers = function(){
  on('sheet:opened',updateSheet);

  //Roll20 change and click listeners
  Object.entries(listeners).forEach(([event,funcName])=>{
    if(funcs[funcName]){
      on(event,funcs[funcName]);
    }else{
      debug(`!!!Warning!!! no function named ${funcName} found. No listener created for ${event}`,true);
    }
  });

  //jQuery listeners
  $20('.expandable-header').on('click',expandHeader);
  $20('.image-container__button').on('click',toggleImageInput);
};
registerEventHandlers();
log(`Sheet Loaded`);