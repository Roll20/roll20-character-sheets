/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//Initial change functions
const syncHealth = function({trigger,attributes,sections}){
  debug('syncing token and character health');
  debug({sections,trigger});
  const type = trigger.name.replace(/_(?:mod|max)/,'');
  let damage = attributes[`${type}_max`] - attributes[type];
  let damageIndex = damage - 1;
  sections[`repeating_${type}`].forEach((id,index)=>{
    attributes[`repeating_${type}_${id}_damaged`] = index === damageIndex ? 1 : 0;
    attributes[`repeating_${type}_${id}_fill`] = index < damageIndex ? 1 : 0;
  });
  if(attributes[type] > attributes[`${type}_max`]){
    attributes[type] = attributes[`${type}_max`];
  }
};
funcs.syncHealth = syncHealth;