/* eslint-disable camelcase */
/* eslint-disable no-undef */
const berserkIlluminationRoll = ['berserkIlluminationBlaze', 'berserkIlluminationLantern'];

berserkIlluminationRoll.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value;

    const attributs = [
      'devasterAnatheme',
      'bourreauTenebres',
      'equilibreBalance',
    ];

    if (button === 'berserkIlluminationBlaze') {
      attributs.push(`${button}Dgts`);
      attributs.push(`${button}Violence`);
      attributs.push(`${button}Portee`);
    }

    if (button === 'berserkIlluminationLantern') {
      attributs.push(`${button}Dgts`);
      attributs.push(`${button}Portee`);
    }

    const attrs = await getAttrsAsync(attributs);
    const exec = [];
    exec.push(roll);

    const dgts = attrs[`${button}Dgts`];
    let violence = 0;
    const portee = attrs[`${button}Portee`];
    const devaste = +attrs.devasterAnatheme;
    const bourreau = +attrs.bourreauTenebres;
    const equilibre = +attrs.equilibreBalance;

    if (button === 'berserkIlluminationBlaze') {
      violence = attrs[`${button}Violence`];
      exec.push(`{{violence=[[${violence}]]}}`);
    }

    if (button === 'berserkIlluminationLantern') {
      exec.push(`{{esperance=${i18n_esperance}}}`);
      exec.push(`{{esperanceConditionD=${i18n_esperanceConditionD}}}`);
      exec.push('{{degatsConditionnel=true}}');
    }

    exec.push(`{{degats=[[${dgts}]]}}`);
    exec.push(`{{portee=${i18n_portee} ${portee}}}`);

    if (devaste || bourreau || equilibre) {
      const herauts = [];

      if (devaste) { herauts.push(i18n_devasterAnatheme); }
      if (bourreau) { herauts.push(i18n_bourreauTenebres); }
      if (equilibre) { herauts.push(i18n_equilibrerBalance); }

      exec.push(`{{herauts=${herauts.join(' / ')}}}`);
    }

    // ROLL
    const finalRoll = await startRoll(exec.join(' '));

    const rDegats = finalRoll.results.degats.rolls[0].results;

    let tDegats = finalRoll.results.degats.result;
    let tViolence = 0;

    if (bourreau || equilibre) {
      tDegats = rDegats.reduce((accumulateur, valeurCourante) => {
        let newV = valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (finalRoll.results.violence !== undefined) {
      const rViolence = finalRoll.results.violence.rolls[0].results;

      tViolence = finalRoll.results.violence.result;

      if (devaste || equilibre) {
        tViolence = rViolence.reduce((accumulateur, valeurCourante) => {
          let newV = valeurCourante;
          if (newV <= 3) { newV = 4; }

          return accumulateur + newV;
        }, 0);
      }
    }

    const computed = {
      degats: tDegats,
      violence: tViolence,
    };

    finishRoll(finalRoll.rollId, computed);
  });
});

const berserkIlluminationRollSimple = ['berserkIlluminationCandle', 'berserkRageSacrificeEspoir', 'berserkRageN3Dgts',
  'berserkRageHostileHumain', 'berserkRageSalopardHumain', 'berserkRagePatronHumain', 'berserkRageBandeHumain',
  'berserkRageHostileAnathème', 'berserkRageSalopardAnathème', 'berserkRagePatronAnathème', 'berserkRageBandeAnathème'];

berserkIlluminationRollSimple.forEach((button) => {
  on(`clicked:${button}`, (info) => {
    const roll = info.htmlAttributes.value;

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
