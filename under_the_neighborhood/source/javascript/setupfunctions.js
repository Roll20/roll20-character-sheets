/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
const setupSheet = function({attributes,sections}){
  Object.entries(systemDefaults).forEach(([section,fields])=>{
    fields.forEach((fieldObj)=>{
      Object.entries(fieldObj).forEach(([field,content])=>{
        const row = k.generateRowID(section,sections);
        k.debug({row,fields});
        attributes[`${row}_${field}`] = content;
      });
    });
  });
};
k.registerFuncs({setupSheet},{type:['new']});