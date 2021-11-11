/* eslint-disable no-undef */
on('clicked:recuperation', (info) => {
  const roll = info.htmlAttributes.value;

  getAttrs(['espoir', 'espoir_max'], (value) => {
    const espoir = Number(value.espoir);
    const max = Number(value.espoir_max);

    startRoll(`${roll} {{oldE=[[${espoir}]]}}`, (results) => {
      const result = Number(results.results.jet.result);
      let total = espoir + result;

      if (results.results.gainBonus !== undefined) { total += results.results.gainBonus.result; }

      if (total > max) { total = max; }

      const newAttr = {};
      newAttr.espoir = total;

      setAttrs(newAttr);
      finishRoll(
        results.rollId, {
          oldE: total,
        },
      );
    });
  });
});
