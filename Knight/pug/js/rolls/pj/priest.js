/* eslint-disable no-undef */
const priestRollMechanic = ['priestJetMechanicContact', 'priestJetMechanicDistance', 'rollMALPriestJetMechanicContact', 'rollMALPriestJetMechanicDistance'];

priestRollMechanic.forEach((button) => {
  on(`clicked:${button}`, (info) => {
    const roll = info.htmlAttributes.value;

    const attributs = [];

    getAttrs(attributs, () => {
      const exec = [];
      exec.push(roll);

      startRoll(exec.join(' '), (results) => {
        finishRoll(
          results.rollId,
          {},
        );
      });
    });
  });
});
