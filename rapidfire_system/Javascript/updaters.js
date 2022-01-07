const update1x01 = function({attributes,sections}){
  sections.repeating_drone.forEach((id)=>{
    attributes[`repeating_drone_${id}_struct`] = attributes[`repeating_drone_${id}_structure`];
    attributes[`repeating_drone_${id}_struct_max`] = attributes[`repeating_drone_${id}_structure_max`];
  });
};
updateHandlers['1.01'] = update1x01;