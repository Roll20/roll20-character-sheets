///<reference path="constants.ts"/>
///<reference path="util.ts"/>

/* Autofill stuff */
const getShipMultiplier = (shipClass: string) => {
  if ((shipClass || "").toLowerCase() === "frigate") return 2;
  else if ((shipClass || "").toLowerCase() === "cruiser") return 3;
  else if ((shipClass || "").toLowerCase() === "capital") return 4;
  else return 1;
};
const getShipPriceMultiplier = (shipClass: string) => {
  if ((shipClass || "").toLowerCase() === "frigate") return 10;
  else if ((shipClass || "").toLowerCase() === "cruiser") return 25;
  else if ((shipClass || "").toLowerCase() === "capital") return 100;
  else return 1;
};

const fillRepeatingSectionFromData = (
  sName: string,
  data:
    | { [key: string]: AttributeContent }[]
    | { [key: string]: AttributeContent },
  callback?: () => void
) => {
  // Populates the repeating section repeating_${SName} with new
  // rows from the data array. Every entry of the array is expected
  // to be an object, and its key/value pairs will be written into
  // the repeating section as a new row. If data is not an array
  // but a single object, it will be treated like an array with
  // a single element.
  callback = callback || (() => {});
  const createdIDs: string[] = [],
    getRowID = () => {
      while (true) {
        let newID = generateRowID();
        if (!createdIDs.includes(newID)) {
          createdIDs.push(newID);
          return newID;
        }
      }
    };
  const setting = (Array.isArray(data) ? data : [data])
    .map((o) => {
      const newID = getRowID();
      return Object.entries(o).reduce(
        (m: { [k: string]: string }, [key, value]) => {
          m[`repeating_${sName}_${newID}_${key}`] = `${value}`;
          return m;
        },
        {}
      );
    })
    .reduce((m, o) => Object.assign(m, o), {});
  setAttrs(setting, {}, callback);
};
