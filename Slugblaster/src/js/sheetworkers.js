const getSectionID = (eventInfo) => eventInfo.sourceAttribute.split('_').at(2);

const doNumcontrol = (numcontrol, step, min = null, max = null) => {
  getAttrs([numcontrol, `${numcontrol}_max`], (values) => {
    let value = +values[numcontrol] || 0;
    value += step;

    if (min !== null) value = Math.max(value, min);

    if (max !== null) {
      if (Number.isNaN(max)) {
        const value_max = +values[max];
        value = Math.min(value, value_max);
      } else value = Math.min(value, max);
    }

    setAttrs({ [numcontrol]: value });
  });
};

const nopeTrouble = () => {
  getAttrs(['trouble', 'trouble_max'], (values) => {
    const max = +values.trouble_max || G_CONSTANTS.trouble_max;
    const current = +values.trouble || 0;
    const newValue = Math.min(current + 2, max);
    setAttrs({ trouble: newValue });
  });
};

const makeTrack = (sectionId) => {
  const repeatingPrefix = `repeating_tracks_${sectionId}_`;
  const request = [`${repeatingPrefix}track_name`];
  getAttrs(request, (values) => {
    const update = {};
    const trackName = values[`${repeatingPrefix}track_name`];
    update[`${repeatingPrefix}track_name`] = trackName.trim().toUpperCase();
    update[`${repeatingPrefix}track_size`] = trackName.length;

    for (let index = 0; index < G_CONSTANTS.progress_track_max; index++) {
      const key = `${repeatingPrefix}track_letter_${index + 1}`;
      const letter = trackName[index];

      update[key] = letter ? letter.toUpperCase() : '';
      if (!letter) update[`${repeatingPrefix}track_marker_${index + 1}`] = 0;
    }

    setAttrs(update);
  });
};

const makeTrackString = (sectionId) => {
  const repeatingPrefix = `repeating_tracks_${sectionId}_`;
  const markers = Array.from(Array(G_CONSTANTS.progress_track_max).keys(), (index) => `track_marker_${index + 1}`);

  const request = ['track_name', 'track_size', ...markers].map((r) => repeatingPrefix + r);
  getAttrs(request, (values) => {
    const update = {};
    const trackName = values[`${repeatingPrefix}track_name`];
    const trackDisplay = Array(trackName.length);
    let trackCompleted = 0;

    Array.from(trackName, (letter, index) => {
      const marked = values[`${repeatingPrefix}track_marker_${index + 1}`];

      trackDisplay[index] = marked === 'on' ? 'X' : trackName[index];
      if (marked === 'on') trackCompleted++;
    });

    update[`${repeatingPrefix}track_display`] = trackDisplay.join(' ');
    update[`${repeatingPrefix}track_completed`] = trackCompleted;
    setAttrs(update);
  });
};

const setAttitude = (personality = undefined, custom = false) => {
  getAttrs(['personality', 'attitude_override', 'attitude_boost_set', 'attitude_kick_set'], (values) => {
    const update = {};

    const data = G_PLAYBOOKS[personality ?? values.personality];

    // attitude
    if (custom || values.attitude_override === 'on') {
      update.attitude_boost = values.attitude_boost_set;
      update.attitude_kick = values.attitude_kick_set;
    } else {
      const { boost, kick } = data.attitude;
      update.attitude_boost = boost;
      update.attitude_kick = kick;
    }

    setAttrs(update, {}, () => {});
  });
};

const loadPersonality = (field) => {
  const update = {};
  const personality = field.trim().replace(' ', '_').toLowerCase();

  const data = G_PLAYBOOKS[personality];

  // attitude
  update.attitude_subtitle = getTranslationByKey(`${personality}_attitude`) || '';

  // style & trouble
  update.style_run_bonus = getTranslationByKey(`${personality}_style`) || '';

  // traits
  importFieldset('traits', 'trait', data.traits);

  // personal gear
  importFieldset('gear', 'gear', data.gear);

  setAttrs(update, {}, () => {
    setAttitude(personality);
  });
};

const loadSignature = (signature) => {
  const isValid = Object.hasOwn(G_SIGNATURES, signature);
  if (!isValid) return;

  const update = {};
  const data = G_SIGNATURES[signature];

  // text stuff
  update.signature_function = getTranslationByKey(`${signature}_function`) || '';
  update.signature_description = getTranslationByKey(`${signature}_description`) || '';

  importFieldset('mods', 'mod', data.mods, ['cost']);

  setAttrs(update);
};

/**
 * Need to map from attribute data map to populate translations
 * getAllAttrs to leave user created rows in the repeating section
 * https://wiki.roll20.net/Sheet_Worker_Scripts#WARNING
 * @param {*} fieldset
 * @param {*} data
 */
const importFieldset = (fieldset, prefix, data, additionalFields = []) => {
  getAllAttrs(G_AUTOGEN_FIELDSET[fieldset], [], (attributes, sections) => {
    const update = {};

    const section = sections[`repeating_${fieldset}`];
    const idArray = new Set(section) ?? new Set([]);

    // remove all autogen rows
    for (let rowId = 0; rowId < section.length; rowId++) {
      const repItem = `repeating_${fieldset}_${section[rowId]}`;
      if (attributes[`${repItem}_${prefix}_autogen`]) {
        removeRepeatingRow(repItem);
      }
    }

    // add new records
    for (const key of data) {
      const rowId = createRowId(idArray);
      idArray.add(rowId);
      const repeating = `repeating_${fieldset}_${rowId}_${prefix}`;
      update[`${repeating}_autogen`] = 1;
      update[`${repeating}_name`] = getTranslationByKey(key) || '';
      update[`${repeating}_description`] = getTranslationByKey(`${key}_description`) || '';

      for (const field of additionalFields) {
        update[`${repeating}_${field}`] = getTranslationByKey(`${key}_${field}`) || '';
      }
    }

    setAttrs(update);
  });
};

const createRowId = (sections) => {
  let rowId = generateRowID();
  while (sections.has(rowId)) {
    rowId = generateRowID();
  }
  return rowId;
};

const loadFactions = () => {
  for (const factions of Object.keys(G_FACTIONS)) {
    const section = `repeating_${factions}-factions`;
    const sectionDetails = { ...G_FACTION_FIELDSET.at(0) };
    sectionDetails.section = section;

    getAllAttrs([{ ...sectionDetails }], [], (values, sections) => {
      const update = {};
      const createdIds = [];

      for (const faction of G_FACTIONS[factions]) {
        let rowId = generateRowID();
        while (rowId in createdIds) {
          rowId = generateRowID();
        }
        createdIds.push(rowId);

        const repeatingPrefix = `repeating_${factions}-factions_${rowId}_faction_`;
        update[`${repeatingPrefix}autogen`] = 1;
        update[`${repeatingPrefix}name`] = getTranslationByKey(faction) || '';
        update[`${repeatingPrefix}description`] = getTranslationByKey(`${faction}_description`) || '';
      }

      setAttrs(update);
    });

    setAttrs({ load_factions: 1 }, { silent: true });
  }
};
