const parseJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.log(`Error parsing JSON: ${jsonString}`);
    return undefined;
  }
};

const processDataArrays = (array, callback) => {
  const parsed = parseJSON(array);
  const map = parsed.map((e) => callback(e));
  return map.reduce((acc, val) => ({ ...acc, ...val }));
};

const getRow = (section) => `repeating_${section}_${generateRowID()}`;

const getRepUpdate = (attrs, row, page) => {
  let update = {};

  attrs.forEach((attr) => {
    if (page[attr] ?? page.data[attr]) {
      update[`${row}_${attr}`] = page[attr] ?? cleanAttr(attr, page.data[attr]);
    }
  });

  if (attrs.includes("notes")) {
    update[`${row}_flag`] = false;
  }

  return update;
};

const cleanAttr = (attr, value) => {
  if (attr === "skill") {
    return `@{${value.toLowerCase()}}`;
  }

  return value;
};

const getStaticUpdate = (attrs, page) => {
  let update = {};

  attrs.forEach((attr) => {
    if (page[attr] ?? page.data[attr]) {
      update[attr] = page[attr] ?? cleanAttr(attr, page.data[attr]);
    }
  });

  return update;
};
