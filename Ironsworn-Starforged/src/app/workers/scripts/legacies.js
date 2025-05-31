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
  const progressBoxAttrs = generateLegacyAttrArray(type)

  updateProgressBoxes({ mark_button: `mark_legacy_${type}_button`, attributes: progressBoxAttrs, rank: {kind: 'static', value: 5}});
});

function generateLegacyAttrArray (type) {
  let attrs = new Array();
  for(let index = 1; index <= 10; index++) {
    attrs.push(`legacy_progress_${type}_${index}`); 
  };
  return attrs;
}

on('change:legacy_quests_plus_ten_button change:legacy_bonds_plus_ten_button change:legacy_discoveries_plus_ten_button', function(values) {
  const type = values.sourceAttribute.match(/legacy_(.*?)_/)[1]

  const tenDisabledValue = `floor((@{legacy_progress_${type}_1}+@{legacy_progress_${type}_2}+@{legacy_progress_${type}_3}+@{legacy_progress_${type}_4}+@{legacy_progress_${type}_5}+@{legacy_progress_${type}_6}+@{legacy_progress_${type}_7}+@{legacy_progress_${type}_8}+@{legacy_progress_${type}_9}+@{legacy_progress_${type}_10})/4)`
  const tenEnabledValue = 10
  const filledAttr = (values.newValue === 'on') ? tenEnabledValue : tenDisabledValue

  setAttrs({
    [`legacy_progress_${type}-filled`]: filledAttr,
  });
})