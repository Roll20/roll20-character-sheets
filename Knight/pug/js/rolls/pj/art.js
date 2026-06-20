/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
on('clicked:domaineArtistique', (info) => {
  const roll = info.htmlAttributes.value;

  const attributs = [
    'jetModifDes',
    'bonusCarac',
    'caracteristique1Art',
    'caracteristique2Art',
    'caracteristique3Art',
    'caracteristique4Art',
    'equilibreBalance',
  ];

  getAttrs(attributs, async (value) => {
    const exec = [];

    const mod = Number(value.jetModifDes);
    const hasBonus = Number(value.bonusCarac);

    const C1 = value.caracteristique1Art;
    const C2 = value.caracteristique2Art;
    const C3 = value.caracteristique3Art;
    const C4 = value.caracteristique4Art;
    const equilibre = +value.equilibreBalance;

    const C1Nom = C1.slice(2, -1);
    const C2Nom = C2.slice(2, -1);
    const C3Nom = C3.slice(2, -1);
    const C4Nom = C4.slice(2, -1);

    const cRoll = [];
    const cNom1 = [];
    const cNom2 = [];

    const bonus = [];

    exec.push(roll);

    if (C1 !== '0') {
      cNom1.push(CaracNom[C1Nom]);
      cRoll.push(C1);
    }

    if (C2 !== '0') {
      cNom1.push(CaracNom[C2Nom]);
      cRoll.push(C2);
    }

    if (hasBonus === 1 || hasBonus === 2) {
      if (C3 !== '0') {
        cNom2.push(CaracNom[C3Nom]);
        cRoll.push(C3);
      }
    }

    if (hasBonus === 2) {
      if (C4 !== '0') {
        cNom2.push(CaracNom[C4Nom]);
        cRoll.push(C4);
      }
    }

    exec.push(`{{cBase=${cNom1.join(' - ')}}}`);

    if (hasBonus > 0) { exec.push(`{{cBonus=${cNom2.join(' - ')}}}`); }

    if (mod !== 0) {
      cRoll.push(mod);
      exec.push(`{{mod=[[${mod}]]}}`);
    }

    if (cRoll.length === 0) { cRoll.push(0); }
    const bonusTotal = bonus.reduce((accumulateur, valeurCourante) => parseInt(accumulateur, 10) + parseInt(valeurCourante, 10), 0);
    const stringRoll = `{{jet=[[ [[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s]]}}`;
    exec.push(stringRoll);
    exec.push('{{basejet=[[0]]}}');
    exec.push(`{{tBonus=[[${bonusTotal}]]}}`);
    const finalRoll = await startRoll(exec.join(' '));
    const computed = computeSimpleRoll(finalRoll, bonusTotal);

    finishRoll(finalRoll.rollId, computed);
    await postRoll(computed, roll, stringRoll, finalRoll, {
      equilibre,
    });
  });
});
