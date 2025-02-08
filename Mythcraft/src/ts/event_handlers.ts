//Calculate a simple derived attribute
// characteristics.movement.forEach((attr: string) => {
//   on(`change:${attr}`, () => {
//     getAttrs(characteristics.movement, (values) => {
//       const {strength, dexterity} = values;
//       setAttrs({
//         movement: sumIntegers([strength, dexterity]) / 2,
//       });
//     });
//   });
// });

//Calculate all the values of a repeating section. Useful for calculating weights, totals, etc.
// on(`change:repeating_events:weight`, ({ triggerName }) => {
//   const repeatingRow = getReprowid(triggerName);

//   getSectionIDs("events", (idArray) => {
//     let rows = [];
//     idArray.forEach((id) =>
//       rows.push(`repeating_events_${id}_weight`)
//     );

//     getAttrs(rows, (values) => {
//       const parsedNums = parseIntegers(values);
//       const weightValues = Object.values(parsedNums);
//       const sum = sumIntegers(weightValues);

//       setAttrs({
//         weight_total: sum,
//         [`${repeatingRow}_total_weight`]: sum,
//       });
//     });
//   });
// });
