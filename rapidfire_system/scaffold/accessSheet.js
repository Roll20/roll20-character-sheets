//Sheet Updaters and styling functions
const updateSheet = function(){
  log('updating sheet');
  getAllAttrs({props:['sheet_version','debug_mode','collapsed',...baseGet],callback:(attributes,sections,casc)=>{
    debugMode = !!attributes.debug_mode;
    if(!attributes.sheet_version){
      initialSetup(attributes,sections);
    }else{
      Object.entries(updateHandlers).forEach(([ver,handler])=>{
        if(attributes.version < +ver){
          handler({attributes,sections,casc});
        }
      });
    }
    attributes.sheet_version = version;
    log(`Sheet Update applied. Current Sheet Version ${version}`);
    styleOnOpen(attributes,sections);
    setActionCalls({attributes,sections});
    attributes.set();
    log('Sheet ready for use');
  }});
};

const initialSetup = function(attributes,sections){
  debug('Initial sheet setup');
};

const styleOnOpen = function(attributes,sections){
  navigateSheet({triggerName:`clicked:${attributes.sheet_state}`});
  setupSystem({},attributes,sections);
};

//These functions access the sheet and iterate through all changes necessary before calling setAttrs
const accessSheet = function(event){
  debug({event});
  getAllAttrs({event,callback:(attributes,sections,casc)=>{
    let trigger = attributes.getCascObj(event,casc);
    attributes.processChange({event,trigger,attributes,sections,casc});
  }});
};
funcs.accessSheet = accessSheet;