/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
const limitMeterValue = function({trigger,attributes,sections}){
  const [section,id,field] = k.parseTriggerName(trigger.name);
  return Math.min(attributes[`${section}_${id}_${field}`],attributes[`${section}_${id}_${field}_max`])
};
k.registerFuncs({limitMeterValue});