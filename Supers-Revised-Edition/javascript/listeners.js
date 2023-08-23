/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//Sheet listeners
rollButtons.forEach((button)=>{
  on(`clicked:${button}`,calculateSuccess);
});

sheetSections.forEach((type)=>{
  on(`clicked:nav-${type}`,navigateSheet);
});

on('change:sheet_type',displayButtons);

on('sheet:opened',()=>{
  log('sheet opened');
  getAllAttrs({props:['character_name','debug_mode','sheet_view','sheet_type','modifier_query','version'],callback:(attributes,sections)=>{
    log(`Starting Sheet Version: ${attributes.version}`);
    debugMode = value(attributes.debug_mode);
    const setObj = {};
    update1x3(attributes,sections,setObj);
    if(+attributes.version < 1.4){
      log('updating to 1.4');
      update1x4(attributes,setObj);
    }
    setObj.version = version;
    displayButtons(attributes.sheet_type);
    setActiveSections(attributes.sheet_view);
    set(setObj);
  }});
});