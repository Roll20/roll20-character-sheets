/**
 * Aggregates repeating values
 * @param {string[]} destinations An array of field names to output to
 * @param {string} section A repeating section name
 * @param {string[]} fields An array of fields to aggregate into the associated destination
 * @param  {...any} extras Some extra stuff
 * If an extra is an object, it will be used for extendedProps.
 */
async function repeatingSumAsync(destinations, section, fields, ...extras) {
  const isNumber = (value) => parseFloat(value).toString() === value.toString();
  const isOption = (value) =>
    [...checks.valid, ...checks.roundtypes].includes(value);
  const isRounding = (value) => checks.roundtypes.includes(value);
  const isFraction = (value) =>
    value.includes("/") && !(value.includes(",") || value.includes("|"));
  const getTrimmed = (value) => value.toLowerCase().replace(/\s/g, "");
  const getRounded = (type, value, pow) =>
    (Math[type](value * Math.pow(10, pow)) / Math.pow(10, pow)).toFixed(
      Math.max(0, pow)
    );
  const getFraction = (value /*{ console.log(`value: ${value}`); */) =>
    parseInt(value.split("/")[0]) / parseInt(value.split("/")[1]);
  const getMultiplier = (value, rounding = 1) =>
    "undefined" === typeof value
      ? rounding
        ? 0
        : 1
      : isNumber(value)
      ? parseFloat(value)
      : isFraction(value)
      ? getFraction(value)
      : value;
  if (!Array.isArray(destinations)) destinations = [getTrimmed(destinations)];
  if (!Array.isArray(fields)) fields = [getTrimmed(fields)];
  const fields_trimmed = fields.map((field) => getTrimmed(field).split(":")[0]);
  const subfields = fields_trimmed.slice(0, destinations.length);
  const checks = {
    valid: ["multiplier"],
    roundtypes: ["ceil", "round", "floor"],
  };
  let properties = { attributes: {}, options: {} };
  let extendedProps = {};
  extras.forEach((extra) => {
    if (extra.constructor.name === "Object") {
      extendedProps = extra;
      return;
    }
    const [prop, v] = getTrimmed(extra).split(":");
    const multiplier_maybe = getMultiplier(v, isRounding(prop));
    const obj = isNumber(multiplier_maybe)
      ? subfields.reduce((obj, field) => {
          obj[field] = multiplier_maybe;
          return obj;
        }, {})
      : multiplier_maybe.split(",").reduce((obj, item) => {
          const [stat, value] = item.split("|");
          const multiplier = getMultiplier(value, isRounding(prop));
          obj[stat] = multiplier;
          return obj;
        }, {});
    properties[isOption(prop) ? "options" : "attributes"][prop] = obj;
  });
  const idArray = await getSectionIDsAsync(`repeating_${section}`);
  const attrArray = idArray.reduce(
    (m, id) => [
      ...m,
      ...fields_trimmed.map((field) => `repeating_${section}_${id}_${field}`),
    ],
    []
  );
  let filteredAttrArray = attrArray;
  if (properties.attributes.filter) {
    filteredAttrArray = attrArray.filter((attr) =>
      Object.keys(properties.attributes.filter).some(
        (sectionId) => sectionId && attr.includes(sectionId)
      )
    );
  }
  const v = await getAttrsAsync([
    ...filteredAttrArray,
    ...Object.keys(properties.attributes),
  ]);
  const getValue = (section, id, field) =>
    v[`repeating_${section}_${id}_${field}`] === "on"
      ? 1
      : parseFloat(v[`repeating_${section}_${id}_${field}`]) || 0;
  const commonMultipliers =
    fields.length <= destinations.length
      ? []
      : fields.splice(destinations.length, fields.length - destinations.length);
  const output = destinations.reduce((obj, destination, index) => {
    let sumTotal = idArray.reduce(
      (total, id) =>
        total +
        getValue(section, id, fields_trimmed[index]) *
          commonMultipliers.reduce(
            (subtotal, mult) =>
              subtotal *
              (!mult.includes(":") ||
              mult.split(":")[1].split(",").includes(fields_trimmed[index])
                ? getValue(section, id, mult.split(":")[0])
                : 1),
            1
          ),
      0
    );
    sumTotal *=
      properties.options.hasOwnProperty("multiplier") &&
      Object.keys(properties.options.multiplier).includes(fields_trimmed[index])
        ? parseFloat(properties.options.multiplier[fields_trimmed[index]]) || 0
        : 1;
    sumTotal += Object.entries(properties.attributes).reduce(
      (total, [key, value]) =>
        (total += value.hasOwnProperty(fields_trimmed[index])
          ? parseFloat(v[key] || 0) *
            (parseFloat(value[fields_trimmed[index]]) || 1)
          : 0),
      0
    );
    checks.roundtypes.forEach((type) => {
      if (properties.options.hasOwnProperty(type)) {
        if (
          Object.keys(properties.options[type]).includes(fields_trimmed[index])
        ) {
          sumTotal = getRounded(
            type,
            sumTotal,
            +properties.options[type][fields_trimmed[index]] || 0
          );
        } else if (
          properties.options[type] == "0" ||
          !isNaN(+properties.options[type] || "x")
        ) {
          sumTotal = getRounded(type, sumTotal, +properties.options[type]);
        }
      }
    });
    obj[destination] = sumTotal;
    return obj;
  }, {});
  await setAttrsAsync(output);
}

async function repeatingPickBestAsync({
  destinations,
  section,
  fields,
  defaultValues,
  ranks,
  filter,
}) {
  console.log("repeatingPickBestAsync", {
    destinations,
    section,
    fields,
    defaultValues,
    ranks,
    filter,
  });
  const sectionIds = await getSectionIDsAsync(`repeating_${section}`);
  const attrArray = sectionIds.reduce(
    (m, id) => [
      ...m,
      ...fields.map((field) => `repeating_${section}_${id}_${field}`),
    ],
    []
  );
  let filteredAttrArray = attrArray;
  if (filter) {
    filteredAttrArray = attrArray.filter((attr) =>
      filter.some((sectionId) => sectionId && attr.includes(sectionId))
    );
  }
  const a = await getAttrsAsync(filteredAttrArray);
  const output = destinations.reduce((acc, cur, i) => {
    acc[cur] = Object.keys(a)
      .filter((val) => {
        // the 4th part of `val` needs to match fields[i]
        const [, , , ...attrParts] = val.split("_");
        const attr = attrParts.join("_");
        return attr == fields[i];
      })
      .reduce((accVal, attrCur) => {
        if (+a[attrCur] == 0) {
          return accVal;
        }

        if (+accVal != 0) {
          if (ranks[i] === "high") {
            return +a[attrCur] > +accVal ? a[attrCur] : accVal;
          } else {
            return +a[attrCur] < +accVal ? a[attrCur] : accVal;
          }
        } else {
          return a[attrCur];
        }
      }, defaultValues[i]);
    return acc;
  }, {});
  console.log(output);
  await setAttrsAsync(output);
}

async function repeatingStringConcatAsync({
  destinations,
  section,
  fields,
  filter,
}) {
  console.log({
    destinations,
    section,
    fields,
    filter,
  });
  const sectionIds = await getSectionIDsAsync(`repeating_${section}`);
  const attrArray = sectionIds.reduce(
    (m, id) => [
      ...m,
      ...fields.map((field) => `repeating_${section}_${id}_${field}`),
    ],
    []
  );
  let filteredAttrArray = attrArray;
  if (filter) {
    filteredAttrArray = attrArray.filter((attr) =>
      filter.some((sectionId) => sectionId && attr.includes(sectionId))
    );
  }
  const a = await getAttrsAsync(filteredAttrArray);
  const output = destinations.reduce((acc, cur, i) => {
    acc[cur] = Object.keys(a)
      .filter((val) => {
        // the 4th part of `val` needs to match fields[i]
        const [, , , ...attrParts] = val.split("_");
        const attr = attrParts.join("_");
        return attr == fields[i];
      })
      .reduce((attrAcc, attrCur) => {
        return a[attrCur] == "" || a[attrCur] == "0"
          ? attrAcc
          : `${a[attrCur]}+${attrAcc}`
              .replace(/\+\s*$/, "")
              .replace(/^\s*\+/, "");
      }, "");
    return acc;
  }, {});
  await setAttrsAsync(output);
}

function getBiAttributeBonus(attr) {
  const bonus = attr > 15 ? Math.ceil((Math.min(attr, 30) - 15) / 2) : 0;
  return bonus;
}

function mergeAndAddObjects(data) {
  const result = {};
  data.forEach((obj) => {
    for (let [key, value] of Object.entries(obj)) {
      if (result[key]) {
        if (key === "critical" || key === "knockout" || key === "deathblow") {
          result[key] = result[key] > value ? value : result[key];
        } else {
          result[key] += value;
        }
      } else {
        result[key] = value;
      }
    }
  });
  return result;
}

async function getSectionIDsOrderedAsync(sectionName) {
  const v = await getAttrsAsync([`_reporder_repeating_${sectionName}`]);
  const idArray = await getSectionIDsAsync(sectionName);
  const reporderArray = v[`_reporder_repeating_${sectionName}`]
    ? v[`_reporder_repeating_${sectionName}`].toLowerCase().split(",")
    : [];
  const ids = [
    ...new Set(
      reporderArray.filter((x) => idArray.includes(x)).concat(idArray)
    ),
  ];
  return ids;
}

/**
 * Add a token {attack} times to the Turn Tracker in order against other tokens.
 * Requires API script access.
 * For use on an action button.
 *
 * [[d20+@{selected|repeating_profiles_-MibcwHG5hZXUJn6A7OG_initiative} &{tracker}]]
 */
async function palladiumAddToTurnTracker(initKey, attacksKey) {
  const { [initKey]: init, [attacksKey]: attacks } = await getAttrsAsync([
    initKey,
    attacksKey,
  ]);
  const initString = init > 0 ? `+${init}` : `${init}`;
  const roll = await startRoll(
    `@{opt_whisper}&{template:initiative} {{title=@{selected|character_name} rolls initiative!}} {{diceroll=[[1d20]]}} {{modifier=${initString}}}`
  );
  console.log(roll);
  const computed = roll.results.diceroll.result + init;
  console.log(computed);
  finishRoll(roll.rollId, {
    diceroll: computed,
  });
  const addToTracker = await startRoll(
    `@{opt_whisper}&{template:custom} {{title=@{selected|character_name} added to Turn Tracker}} {{Initiative=[[[[${computed}]] &{tracker}]]}}`
  );
  finishRoll(addToTracker.rollId);
  // https://app.roll20.net/forum/post/6817409/multiple-initiative-values-for-a-single-character/?pageforid=6817748#post-6817748
  const dupeTracker = await startRoll(`!dup-turn ${attacks}`);
  finishRoll(dupeTracker.rollId);
}

/**
 * Determines if a repeating section change event is a new row.
 * Requires the repeating section to have a `rowid` attribute.
 * Note that when a new row is added the
 *
 * @param {*} e Roll20 change event object.
 * @returns bool
 */
async function isNewRow(e) {
  const [r, section, rowId, attr] = e.sourceAttribute.split("_");
  const rowPrefix = `${r}_${section}_${rowId}`;
  const a = await getAttrsAsync([`${rowPrefix}_rowid`]);
  if (a[`${rowPrefix}_rowid`].length === 0) {
    await setAttrsAsync(
      { [`${rowPrefix}_rowid`]: `${r}_${section}_${rowId}` },
      { silent: true }
    );
    return true;
  }
  return false;
}

/**
 * Sets generic defaults when a new row is created.
 *
 * @param {*} e Roll20 change event object.
 */
async function setRowDefaults(e, setAttrsOptions) {
  const [r, section, rowId, attr] = e.sourceAttribute.split("_");
  const rowPrefix = `${r}_${section}_${rowId}`;
  const a = await getAttrsAsync(["character_level"]);
  const attrs = {
    [`${rowPrefix}_levelacquired`]: a["character_level"],
    [`${rowPrefix}_level`]: 1,
  };
  console.log(attrs);
  await setAttrsAsync(attrs, setAttrsOptions);
}
