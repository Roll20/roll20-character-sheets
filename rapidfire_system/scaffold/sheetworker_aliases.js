/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
const _setSectionOrder = function(section,order){
  let trueSection = section.replace(/repeating_/,'');
  setSectionOrder(trueSection,order);
};
const _removeRepeatingRow = function(row,attributes,sections){
  debug(`removing ${row}`);
  Object.keys(attributes.attributes).forEach((key)=>{
    if(key.startsWith(row)){
      delete attributes[key];
    }
  });
  let [,section,rowID] = row.match(/(repeating_[^_]+)_(.+)/,'');
  sections[section] = sections[section].filter((id)=>id!==rowID);
  removeRepeatingRow(row);
};

const _getAttrs = function({props=baseGet,callback,event}){
  getAttrs(props,(values)=>{
    const attributes = createAttrProxy(values,event);
    callback(attributes);
  });
};

const getAllAttrs = function({callback,props=baseGet,sectionDetails=repeatingSectionDetails}){
  debug({props});
  getSections(sectionDetails,(repeats,sections)=>{
    getAttrs([...props,...repeats],(values)=>{
      const attributes = createAttrProxy(values);
      orderSections(attributes,sections);
      const casc = expandCascade(cascades,sections,attributes);
      callback(attributes,sections,casc);
    })
  });
};
const getSections = function(section_details,callback){
  let queueClone = _.clone(section_details);
  const worker = (queue,repeatAttrs=[],sections={})=>{
    let detail = queue.shift();
    getSectionIDs(detail.section,(IDs)=>{
      sections[detail.section] = IDs;
      IDs.forEach((id)=>{
        detail.fields.forEach((f)=>{
          repeatAttrs.push(`${detail.section}_${id}_${f}`);
        });
      });
      repeatAttrs.push(`_reporder_${detail.section}`);
      if(queue.length){
        worker(queue,repeatAttrs,sections);
      }else{
        callback(repeatAttrs,sections);
      }
    });
  };
  if(!queueClone[0]){
    callback([],{});
  }
  worker(queueClone);
};
// Sets the attributes while always calling with {silent:true}
// Can be awaited to get the values returned from _setAttrs
const set = function(obj,vocal=false){
  setAttrs(obj,{silent:!vocal});
};