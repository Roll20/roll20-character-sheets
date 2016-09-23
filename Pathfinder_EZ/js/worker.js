
function onChange(attrs, cb) {
  attrs = _.map(attrs, attr => {
    return 'change:' + attr;
  }).join(' ');
  on(attrs, cb);
}

function onChangeParse(attrs, cb) {
  onChange(attrs, () => {
    parseAttrs(attrs, cb);
  });
}

/**
 * Gets the specified attributes and parses them as an integer or 0.
 */
function parseAttrs(attrs, cb) {
  getAttrs(attrs, function(values) {
    _.each(attrs, function(attr) {
      if(_.isUndefined(values[attr]))
        values[attr] = 0;
      else if(!isNaN(values[attr]))
        values[attr] = parseInt(values[attr]);
    });
    cb(values);
  });
}

// Update funcs

function updateAbilityMod(attr, values) {
  var mod = Math.floor((values[attr]+ values[attr + '_temp'] - 10)/2);
  setAttrs({
    [attr + '_mod']: mod
  });
}


// Change events

onChangeParse(['str', 'str_temp'], values => {
  updateAbilityMod('str', values);
});

onChangeParse(['dex', 'dex_temp'], values => {
  updateAbilityMod('dex', values);
});

onChangeParse(['con', 'con_temp'], values => {
  updateAbilityMod('con', values);
});

onChangeParse(['int', 'int_temp'], values => {
  updateAbilityMod('int', values);
});

onChangeParse(['wis', 'wis_temp'], values => {
  updateAbilityMod('wis', values);
});

onChangeParse(['cha', 'cha_temp'], values => {
  updateAbilityMod('cha', values);
});



onChangeParse(['dex_mod', 'init_misc'], values => {
  setAttrs({
    init: values.dex_mod + values.init_misc
  });
});

onChangeParse(['ac_equipment', 'dex_mod', 'size', 'ac_misc', 'ac_temp'], values => {
  setAttrs({
    ac: 10 + values.ac_equipment + values.dex_mod + values.size + values.ac_misc + values.ac_temp,
    ac_touch: 10 + values.dex_mod + values.size + values.ac_misc + values.ac_temp,
    ac_flatfoot: 10 + values.ac_equipment + values.size + values.ac_misc + values.ac_temp,
  });
});

onChangeParse(['fort_base', 'con_mod', 'fort_equipment', 'fort_misc', 'fort_temp'], values => {
  setAttrs({
    fort: values.fort_base + values.con_mod + values.fort_equipment + values.fort_misc + values.fort_temp
  });
});

onChangeParse(['ref_base', 'dex_mod', 'ref_equipment', 'ref_misc', 'ref_temp'], values => {
  setAttrs({
    ref: values.ref_base + values.dex_mod + values.ref_equipment + values.ref_misc + values.ref_temp
  });
});

onChangeParse(['will_base', 'wis_mod', 'will_equipment', 'will_misc', 'will_temp'], values => {
  setAttrs({
    will: values.will_base + values.wis_mod + values.will_equipment + values.will_misc + values.will_temp
  });
});

onChangeParse(['bab', 'str_mod', 'size', 'melee_equipment', 'melee_misc', 'melee_temp'], values => {
  setAttrs({
    melee: values.bab + values.str_mod + values.size + values.melee_equipment + values.melee_misc + values.melee_temp
  });
});

onChangeParse(['bab', 'dex_mod', 'size', 'ranged_equipment', 'ranged_misc', 'ranged_temp'], values => {
  setAttrs({
    ranged: values.bab + values.dex_mod + values.size + values.ranged_equipment + values.ranged_misc + values.ranged_temp
  });
});

onChangeParse(['size'], values => {
  setAttrs({
    cmb_size: -values.size,
    cmd_size: -values.size
  });
});

onChangeParse(['bab', 'str_mod', 'cmb_size', 'cmb_misc', 'cmb_temp'], values => {
  setAttrs({
    cmb: values.bab + values.str_mod + values.cmb_size + values.cmb_misc + values.cmb_temp
  });
});

onChangeParse(['bab', 'str_mod', 'dex_mod', 'cmd_size', 'cmd_misc', 'cmd_temp'], values => {
  setAttrs({
    cmd: 10 + values.bab + values.str_mod + values.dex_mod + values.cmd_size + values.cmd_misc + values.cmd_temp
  });
});
