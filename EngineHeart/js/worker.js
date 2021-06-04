/**
 * Forces an update on a list of numerical fields, also making sure that
 * any undefined fields are set to 0.
 * @param {string[]} attrs
 * @param {function} cb
 */
function forceUpdate(attrs, cb) {
  parseAttrs(attrs, values => {
    let tempValues = {};
    _.each(attrs, attr => {
      tempValues[attr] = -9999;
    });
    setAttrs(tempValues);
    setAttrs(values);
  });
}


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

/**
 * Updates the roll calculation for an attribute.
 * @param {string} attr
 */
function updateAttribute(attr) {
  parseAttrs([attr, attr + '_mod'], values => {
    let rating = parseInt(values[attr]);
    let mod = parseInt(values[attr + '_mod']) || 0;
    let total = rating + mod;
    let calc = `(${total})d10>?{Target Number (TN)}`;
    setAttrs({
      [attr + '_calc']: calc,
      [attr + '_total']: total
    });
  });
}

function updateRcom() {
  updateAttribute('rcom');
}
function updateHcom() {
  updateAttribute('hcom');
}
function updateDcon() {
  updateAttribute('dcon');
}
function updateMcon() {
  updateAttribute('mcon');
}

function updateDex() {
  updateAttribute('dex');
}
function updateMobil() {
  updateAttribute('mobil');
}
function updatePer() {
  updateAttribute('per');
}
function updateRef() {
  updateAttribute('ref');
}
function updateStr() {
  updateAttribute('str');
}

function updateDur() {
  updateAttribute('dur');
}
function updateBuf() {
  updateAttribute('buf');
}
function updateSize() {
  updateAttribute('size');
}
function updatePow() {
  updateAttribute('pow');
}

function updateAllAttributes() {
  updateRcom();
  updateHcom();
  updateDcon();
  updateMcon();

  updateDex();
  updateMobil();
  updatePer();
  updateRef();
  updateStr();

  updateDur();
  updateBuf();
  updateSize();
  updatePow();
}

function updateIntPool() {
  parseAttrs(['dex_total', 'ref_total', 'intPool_mod'], values => {
    let dex_total = parseInt(values['dex_total']);
    let ref_total = parseInt(values['ref_total']);
    let intPool_mod = parseInt(values['intPool_mod']) || 0;

    let intPool = dex_total + ref_total;
    let intPool_total = intPool + intPool_mod;
    let intPool_calc = `(${intPool_total})d10>?{Target Number (TN)}`;
    setAttrs({ intPool, intPool_calc, intPool_total });
  });
}

function updateTn2bStruck() {
  parseAttrs(['mobil_total', 'ref_total', 'tn2bStruck_mod'], values => {
    let mobil_total = parseInt(values['mobil_total']);
    let ref_total = parseInt(values['ref_total']);
    let tn2bStruck_mod = parseInt(values['tn2bStruck_mod']) || 0;

    let tn2bStruck = mobil_total + ref_total;
    let tn2bStruck_total = tn2bStruck + tn2bStruck_mod;
    setAttrs({ tn2bStruck, tn2bStruck_total });
  });
}

function updateDmgFromStrike() {
  parseAttrs(['str_total', 'dmgFromStrike_mod'], values => {
    let str_total = parseInt(values['str_total']);
    let dmgFromStrike_mod = parseInt(values['dmgFromStrike_mod']) || 0;

    let dmgFromStrike = Math.floor(str_total/2);
    let dmgFromStrike_total = dmgFromStrike + dmgFromStrike_mod;
    setAttrs({ dmgFromStrike, dmgFromStrike_total });
  });
}

function updateInitiative() {
  parseAttrs(['ref_total', 'initiative_mod'], values => {
    let ref_total = parseInt(values['ref_total']);
    let initiative_mod = parseInt(values['initiative_mod']) || 0;

    let initiative = ref_total;
    let initiative_total = initiative + initiative_mod;
    let initiative_calc = `1d10 + ${initiative_total}`;
    setAttrs({ initiative, initiative_total, initiative_calc });
  });
}

function updateSpeed() {
  parseAttrs(['mobil_total', 'ref_total', 'speed_mod'], values => {
    let mobil_total = parseInt(values['mobil_total']);
    let ref_total = parseInt(values['ref_total']);
    let speed_mod = parseInt(values['speed_mod']) || 0;

    let speed = mobil_total + ref_total;
    let speed_total = speed + speed_mod;
    setAttrs({ speed, speed_total });
  });
}

function updateOsThreshold() {
  parseAttrs(['dcon_total', 'buf_total'], values => {
    let dcon_total = parseInt(values['dcon_total']);
    let buf_total = parseInt(values['buf_total']);

    let osThreshold_max = dcon_total + buf_total;
    setAttrs({ osThreshold_max });
  });
}

function updateDmgThreshold() {
  parseAttrs(['dur_total', 'size_total'], values => {
    let dur_total = parseInt(values['dur_total']);
    let size_total = parseInt(values['size_total']);

    let dmgThreshold_max = dur_total + size_total;
    setAttrs({ dmgThreshold_max });
  });
}

// Change events
onChange(['rcom', 'rcom_mod'], () => {
  updateRcom();
});

onChange(['hcom', 'hcom_mod'], () => {
  updateHcom();
});

onChange(['dcon', 'dcon_mod'], () => {
  updateDcon();
});

onChange(['mcon', 'mcon_mod'], () => {
  updateMcon();
});

onChange(['dex', 'dex_mod'], () => {
  updateDex();
});

onChange(['mobil', 'mobil_mod'], () => {
  updateMobil();
});

onChange(['per', 'per_mod'], () => {
  updatePer();
});

onChange(['ref', 'ref_mod'], () => {
  updateRef();
});

onChange(['str', 'str_mod'], () => {
  updateStr();
});

onChange(['dur', 'dur_mod'], () => {
  updateDur();
});

onChange(['buf', 'buf_mod'], () => {
  updateBuf();
});

onChange(['size', 'size_mod'], () => {
  updateSize();
});

onChange(['pow', 'pow_mod'], () => {
  updatePow();
});

onChange(['dex_total', 'ref_total', 'intPool_mod'], () => {
  updateIntPool();
});

onChange(['mobil_total', 'ref_total', 'tn2bStruck_mod'], () => {
  updateTn2bStruck();
});

onChange(['str_total', 'dmgFromStrike_mod'], () => {
  updateDmgFromStrike();
});

onChange(['ref_total', 'initiative_mod'], () => {
  updateInitiative();
});

onChange(['mobil_total', 'ref_total', 'speed_mod'], () => {
  updateSpeed();
});

onChange(['dcon_total', 'buf_total'], () => {
  updateOsThreshold();
});

onChange(['dur_total', 'size_total'], () => {
  updateDmgThreshold();
});

// Init
on('sheet:opened', () => {
  setAttrs({
    character_sheet: 'EngineHeart v1.0.0'
  });
  updateAllAttributes();
});
