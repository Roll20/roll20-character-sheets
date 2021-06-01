on('change:clear_legacy_quests_button change:clear_legacy_bonds_button change:clear_legacy_discoveries_button', function(values) {
  const type = values.sourceAttribute.match(/clear_legacy_(.*?)_/)[1]
  const progressAttrs = setLegacyProgressAttrs(type)
  setAttrs(progressAttrs);
});

function setLegacyProgressAttrs (type) {
  let attrs = new Object();
  for(let index = 1; index <= 10; index++) {
    attrs[`legacy_progress_${type}_${index}`] = '0'; 
  };
  return attrs;
}

on('change:mark_legacy_quests_button change:mark_legacy_bonds_button change:mark_legacy_discoveries_button', function(values) {
  const type = values.sourceAttribute.match(/mark_legacy_(.*?)_/)[1]
  const progressBoxAttrs = generateAttrArray(type)

  updateProgressBoxes({ mark_button: `mark_legacy_${type}_button`, attributes: progressBoxAttrs, rank: {kind: 'static', value: 5}});
});

function generateAttrArray (type) {
  let attrs = new Array();
  for(let index = 1; index <= 10; index++) {
    attrs.push(`legacy_progress_${type}_${index}`); 
  };
  return attrs;
}