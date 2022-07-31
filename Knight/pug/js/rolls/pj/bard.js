/* eslint-disable camelcase */
/* eslint-disable no-undef */
on('clicked:distanceBard', async (info) => {
  const roll = info.htmlAttributes.value;

  let attributs = [
    'armureLegende',
    'bardAttSpe',
    'devasterAnatheme',
    'bourreauTenebres',
    'equilibreBalance',
  ];

  attributs = attributs.concat(listArmureLegende);
  const attrs = await getAttrsAsync(attributs);

  const exec = [];

  const armureL = attrs.armureLegende;

  const degats = attrs.bardAttSpe;
  const violence = attrs.bardAttSpe;
  const devaste = +attrs.devasterAnatheme;
  const bourreau = +attrs.bourreauTenebres;
  const equilibre = +attrs.equilibreBalance;

  let MALGoliath;
  let MALGhost;
  let MALTypeSoldier;
  let MALTypeHunter;
  let MALTypeHerald;
  let MALTypeScholar;
  let MALTypeScout;

  exec.push(roll);

  switch (armureL) {
    case 'barbarian':
      MALGoliath = Number(attrs.MALBarbarianGoliath);

      if (MALGoliath !== 0) { exec.push(`{{MALGoliath=[[${MALGoliath}]]}}`); }
      break;

    case 'rogue':
      MALGhost = attrs.MALRogueGhost;

      if (MALGhost !== '') { exec.push(`{{MALspecial2=${i18n_ghostActive}}}`); }
      break;

    case 'warrior':
      MALTypeSoldier = attrs.MALWarriorSoldierA;
      MALTypeHunter = attrs.MALWarriorHunterA;
      MALTypeHerald = attrs.MALWarriorHeraldA;
      MALTypeScholar = attrs.MALWarriorScholarA;
      MALTypeScout = attrs.MALWarriorScoutA;

      if (MALTypeSoldier !== 0) { exec.push(`{{MALspecial2=${i18n_typeSoldier}}}`); }

      if (MALTypeHunter !== 0) { exec.push(`{{MALspecial2=${i18n_typeHunter}}}`); }

      if (MALTypeHerald !== 0) { exec.push(`{{MALspecial2=${i18n_typeHerald}}}`); }

      if (MALTypeScholar !== 0) { exec.push(`{{MALspecial2=${i18n_typeScholar}}}`); }

      if (MALTypeScout !== 0) { exec.push(`{{MALspecial2=${i18n_typeScout}}}`); }
      break;

    default:
      MALGoliath = 0;

      MALGhost = '';

      MALTypeSoldier = '';
      MALTypeHunter = '';
      MALTypeHerald = '';
      MALTypeScholar = '';
      MALTypeScout = '';
      break;
  }

  exec.push(`{{degats=[[${degats}]]}}`);
  exec.push(`{{violence=[[${violence}]]}}`);
  exec.push('{{succesConditionnel=true}}');
  exec.push(`{{chocAutomatique=${i18n_choc} 1}}`);
  exec.push(`{{chocAutomatiqueCondition=${i18n_chocAutomatique} < 12}}`);
  exec.push(`{{effets=${i18n_ignoreArmure} / ${i18n_ignoreCDF} / ${i18n_dispersion} 6}}`);

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
  const rViolence = finalRoll.results.violence.rolls[0].results;

  let tDegats = finalRoll.results.degats.result;
  let tViolence = finalRoll.results.violence.result;

  if (bourreau || equilibre) {
    tDegats = rDegats.reduce((accumulateur, valeurCourante) => {
      let newV = valeurCourante;
      if (newV <= 3) { newV = 4; }

      return accumulateur + newV;
    }, 0);

    tDegats += 6;
  }

  if (devaste || equilibre) {
    tViolence = rViolence.reduce((accumulateur, valeurCourante) => {
      let newV = valeurCourante;
      if (newV <= 3) { newV = 4; }

      return accumulateur + newV;
    }, 0);

    tViolence += 6;
  }

  const computed = {
    degats: tDegats,
    violence: tViolence,
  };

  finishRoll(finalRoll.rollId, computed);
  // ROLL
});
