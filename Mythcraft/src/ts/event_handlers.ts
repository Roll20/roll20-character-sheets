//Calculate a simple derived attribute
// on(`change:coordination`, () => {
//   getAttrs(["coordination"], ({ coordination, action_points_base }) => {
//     const cor = parseInt(coordination);
//     const ap_base = parseInt(action_points_base);
//     //Base Action Points is 3 + half of the Coordination attribute
//     const action_points = Math.ceil(cor / 2) + ap_base;
//     setAttrs({
//       action_points,
//     });
//   });
// });

action_points.forEach((attr: string) => {
  on(`change:${attr}`, () => {
    getAttrs(action_points, (values) => {
      const { coordination, action_points_base } = values;
      const cor = parseInt(coordination);
      const ap_base = parseInt(action_points_base);
      let action_points = ap_base;

      if (cor === -1 || cor === -2) {
        action_points = ap_base - 1 || 0;
      } else if (cor === -3) {
        action_points = ap_base - 2 || 0;
      } else {
        // Base Action Points + half of the Coordination attribute
        action_points = Math.ceil(cor / 2) + ap_base;
      }

      setAttrs({ action_points });
    });
  });
});

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
