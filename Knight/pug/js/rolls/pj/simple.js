/* eslint-disable default-case */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
on('clicked:simple clicked:simpleRogue', async (info) => {
  const roll = info.htmlAttributes.value;

  let hasArmure = true;

  let attributs = [
    'caracteristique1',
    'caracteristique2',
    'caracteristique3',
    'caracteristique4',
    'discretion',
    ODValue.discretion,
  ];

  attributs = attributs.concat(listBase, listArmure, listArmureLegende);

  const attrs = await getAttrsAsync(attributs);

  const armure = attrs.armure;
  const armureL = attrs.armureLegende;

  if (armure === 'sans' || armure === 'guardian') { hasArmure = false; }

  let exec = [];
  let isConditionnel = false;

  const mod = +attrs.jetModifDes;
  const hasBonus = +attrs.bonusCarac;

  const vDiscretion = attrs.discretion;
  const oDiscretion = attrs[ODValue.discretion];

  const C1 = attrs.caracteristique1;
  const C2 = attrs.caracteristique2;
  const C3 = attrs.caracteristique3;
  const C4 = attrs.caracteristique4;

  const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

  let C1Nom = '';
  let C2Nom = '';
  let C3Nom = '';
  let C4Nom = '';

  let cRoll = [];
  const cBase = [];
  const cBonus = [];

  let bonus = [];
  let OD = 0;
  let ODBarbarian = [];
  let ODShaman = [];
  const ODWarrior = [];

  let ODMALBarbarian = [];
  let ODMALShaman = [];
  const ODMALWarrior = [];

  exec.push(roll);

  if (hasArmure) { exec.push('{{OD=true}}'); }

  if (attrsCarac.C1) {
    C1Nom = attrsCarac.C1Brut;

    const C1Value = attrsCarac.C1Base;
    const C1OD = attrsCarac.C1OD;

    cBase.push(attrsCarac.C1Nom);
    cRoll.push(C1Value);

    if (hasArmure) { OD += C1OD; }
  }

  if (attrsCarac.C2) {
    C2Nom = attrsCarac.C2Brut;

    const C2Value = attrsCarac.C2Base;
    const C2OD = attrsCarac.C2OD;

    cBase.push(attrsCarac.C2Nom);
    cRoll.push(C2Value);

    if (hasArmure) { OD += C2OD; }
  }

  if (attrsCarac.C3) {
    C3Nom = attrsCarac.C3Brut;

    const C3Value = attrsCarac.C3Base;
    const C3OD = attrsCarac.C3OD;

    cBonus.push(attrsCarac.C3Nom);
    cRoll.push(C3Value);

    if (hasArmure) { OD += C3OD; }
  }

  if (attrsCarac.C4) {
    C4Nom = attrsCarac.C4Brut;

    const C4Value = attrsCarac.C4Base;
    const C4OD = attrsCarac.C4OD;

    cBonus.push(attrsCarac.C4Nom);
    cRoll.push(C4Value);

    if (hasArmure) { OD += C4OD; }
  }

  const armorBonus = getArmorBonus(attrs, armure, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, [], true);

  exec = exec.concat(armorBonus.exec);
  cRoll = cRoll.concat(armorBonus.cRoll);

  if (isConditionnel === false) { isConditionnel = armorBonus.isConditionnelA; }

  ODBarbarian = ODBarbarian.concat(armorBonus.ODBarbarian);
  ODShaman = ODShaman.concat(armorBonus.ODShaman);
  ODWarrior.push(armorBonus.ODWarrior);

  const MALBonus = getMALBonus(attrs, armureL, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, [], true);

  exec = exec.concat(MALBonus.exec);
  cRoll = cRoll.concat(MALBonus.cRoll);

  if (isConditionnel === false) { isConditionnel = MALBonus.isConditionnelA; }

  ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
  ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
  ODMALWarrior.push(MALBonus.ODMALWarrior);

  exec.push(`{{cBase=${cBase.join(' - ')}}}`);

  if (hasBonus > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

  if (mod !== 0) {
    cRoll.push(mod);
    exec.push(`{{mod=[[${mod}]]}}`);
  }

  OD -= armorBonus.ODWarrior;
  OD -= MALBonus.ODMALWarrior;
  exec.push(`{{vOD=${OD}}}`);

  if (cRoll.length === 0) { cRoll.push(0); }

  bonus.push(OD);
  bonus = bonus.concat(ODBarbarian);
  bonus = bonus.concat(ODShaman);
  bonus = bonus.concat(ODWarrior);

  bonus = bonus.concat(ODMALBarbarian);
  bonus = bonus.concat(ODMALShaman);
  bonus = bonus.concat(ODMALWarrior);

  exec.push(`{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
  exec.push(`{{tBonus=[[${bonus.join('+')}+0]]}}`);
  exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

  if (isConditionnel === true) { exec.push('{{conditionnel=true}}'); }

  startRoll(exec.join(' '), (results) => {
    const tJet = results.results.jet.result;
    const tBonus = results.results.tBonus.result;
    const tExploit = results.results.Exploit.result;

    const total = tJet + tBonus;

    finishRoll(
      results.rollId,
      {
        jet: total,
      },
    );

    if (tJet !== 0 && tJet === tExploit) {
      startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}}{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`, (exploit) => {
        const tExploit2 = exploit.results.jet.result;

        finishRoll(
          exploit.rollId,
          {
            jet: tExploit2,
          },
        );
      });
    }
  });
});

on('clicked:simplePriest', async (info) => {
  const roll = info.htmlAttributes.value;

  const hasArmure = true;

  let attributs = [
    'caracteristique1Priest',
    'caracteristique2',
    'caracteristique3',
    'caracteristique4',
    'discretion',
    ODValue.discretion,
  ];

  attributs = attributs.concat(listBase, listArmureLegende);

  const attrs = await getAttrsAsync(attributs);

  const armureL = attrs.armureLegende;

  let exec = [];
  let isConditionnel = false;

  const mod = +attrs.jetModifDes;
  const hasBonus = +attrs.bonusCarac;

  const vDiscretion = attrs.discretion;
  const oDiscretion = attrs[ODValue.discretion];

  const C1 = attrs.caracteristique1Priest;
  const C2 = attrs.caracteristique2;
  const C3 = attrs.caracteristique3;
  const C4 = attrs.caracteristique4;

  const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

  let C1Nom = '';
  let C2Nom = '';
  let C3Nom = '';
  let C4Nom = '';

  let cRoll = [];
  const cBase = [];
  const cBonus = [];

  let bonus = [];
  let OD = 0;

  let ODMALBarbarian = [];
  const ODMALWarrior = [];
  let ODMALShaman = [];

  exec.push(roll);
  exec.push('{{special1=^{priest-mode-nanoc}}}');

  if (hasArmure) { exec.push('{{OD=true}}'); }

  if (attrsCarac.C1) {
    C1Nom = attrsCarac.C1Brut;

    const C1Value = attrsCarac.C1Base;
    const C1OD = attrsCarac.C1OD;

    cBase.push(attrsCarac.C1Nom);
    cRoll.push(C1Value);

    if (hasArmure) { OD += C1OD; }
  }

  if (attrsCarac.C2) {
    C2Nom = attrsCarac.C2Brut;

    const C2Value = attrsCarac.C2Base;
    const C2OD = attrsCarac.C2OD;

    cBase.push(attrsCarac.C2Nom);
    cRoll.push(C2Value);

    if (hasArmure) { OD += C2OD; }
  }

  if (attrsCarac.C3) {
    C3Nom = attrsCarac.C3Brut;

    const C3Value = attrsCarac.C3Base;
    const C3OD = attrsCarac.C3OD;

    cBonus.push(attrsCarac.C3Nom);
    cRoll.push(C3Value);

    if (hasArmure) { OD += C3OD; }
  }

  if (attrsCarac.C4) {
    C4Nom = attrsCarac.C4Brut;

    const C4Value = attrsCarac.C4Base;
    const C4OD = attrsCarac.C4OD;

    cBonus.push(attrsCarac.C4Nom);
    cRoll.push(C4Value);

    if (hasArmure) { OD += C4OD; }
  }

  const MALBonus = getMALBonus(attrs, armureL, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

  exec = exec.concat(MALBonus.exec);
  cRoll = cRoll.concat(MALBonus.cRoll);

  if (isConditionnel === false) { isConditionnel = MALBonus.isConditionnelA; }

  ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
  ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
  ODMALWarrior.push(MALBonus.ODMALWarrior);

  exec.push(`{{cBase=${cBase.join(' - ')}}}`);

  if (hasBonus > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

  if (mod !== 0) {
    cRoll.push(mod);
    exec.push(`{{mod=[[${mod}]]}}`);
  }

  OD -= MALBonus.ODMALWarrior;
  exec.push(`{{vOD=${OD}}}`);

  if (cRoll.length === 0) { cRoll.push(0); }

  bonus.push(OD);

  bonus = bonus.concat(ODMALBarbarian);
  bonus = bonus.concat(ODMALWarrior);
  bonus = bonus.concat(ODMALShaman);

  if (isConditionnel === true) { exec.push('{{conditionnel=true}}'); }

  exec.push(`{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
  exec.push(`{{tBonus=[[${bonus.join('+')}+0]]}}`);
  exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

  startRoll(exec.join(' '), (results) => {
    const tJet = results.results.jet.result;
    const tBonus = results.results.tBonus.result;
    const tExploit = results.results.Exploit.result;

    const total = tJet + tBonus;

    finishRoll(
      results.rollId,
      {
        jet: total,
      },
    );

    if (tJet !== 0 && tJet === tExploit) {
      startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}}{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`, (exploit) => {
        const tExploit2 = exploit.results.jet.result;

        finishRoll(
          exploit.rollId,
          {
            jet: tExploit2,
          },
        );
      });
    }
  });
});

on('clicked:simplePsionPuppet clicked:simplePsionDiscord', async (info) => {
  const roll = info.htmlAttributes.value;
  const hasArmure = true;

  let attributs = [
    'caracteristique1Psion',
    'caracteristique2',
    'caracteristique3',
    'caracteristique4',
    'discretion',
    ODValue.discretion,
  ];

  attributs = attributs.concat(listBase, listArmureLegende);

  const attrs = await getAttrsAsync(attributs);

  const armureL = attrs.armureLegende;

  let exec = [];
  let isConditionnel = false;

  const mod = +attrs.jetModifDes;
  const hasBonus = +attrs.bonusCarac;

  const vDiscretion = attrs.discretion;
  const oDiscretion = attrs[ODValue.discretion];

  const C1 = attrs.caracteristique1Psion;
  const C2 = attrs.caracteristique2;
  const C3 = attrs.caracteristique3;
  const C4 = attrs.caracteristique4;

  const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

  let C1Nom = '';
  let C2Nom = '';
  let C3Nom = '';
  let C4Nom = '';

  let cRoll = [];
  const cBase = [];
  const cBonus = [];

  let bonus = [];
  let OD = 0;

  let ODMALBarbarian = [];
  const ODMALWarrior = [];
  let ODMALShaman = [];

  exec.push(roll);

  if (hasArmure) { exec.push('{{OD=true}}'); }

  if (attrsCarac.C1) {
    C1Nom = attrsCarac.C1Brut;

    const C1Value = attrsCarac.C1Base;
    const C1OD = attrsCarac.C1OD;

    cBase.push(attrsCarac.C1Nom);
    cRoll.push(C1Value);

    if (hasArmure) { OD += C1OD; }
  }

  if (attrsCarac.C2) {
    C2Nom = attrsCarac.C2Brut;

    const C2Value = attrsCarac.C2Base;
    const C2OD = attrsCarac.C2OD;

    cBase.push(attrsCarac.C2Nom);
    cRoll.push(C2Value);

    if (hasArmure) { OD += C2OD; }
  }

  if (attrsCarac.C3) {
    C3Nom = attrsCarac.C3Brut;

    const C3Value = attrsCarac.C3Base;
    const C3OD = attrsCarac.C3OD;

    cBonus.push(attrsCarac.C3Nom);
    cRoll.push(C3Value);

    if (hasArmure) { OD += C3OD; }
  }

  if (attrsCarac.C4) {
    C4Nom = attrsCarac.C4Brut;

    const C4Value = attrsCarac.C4Base;
    const C4OD = attrsCarac.C4OD;

    cBonus.push(attrsCarac.C4Nom);
    cRoll.push(C4Value);

    if (hasArmure) { OD += C4OD; }
  }

  const MALBonus = getMALBonus(attrs, armureL, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

  exec = exec.concat(MALBonus.exec);
  cRoll = cRoll.concat(MALBonus.cRoll);

  if (isConditionnel === false) { isConditionnel = MALBonus.isConditionnelA; }

  ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
  ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
  ODMALWarrior.push(MALBonus.ODMALWarrior);

  exec.push(`{{cBase=${cBase.join(' - ')}}}`);

  if (hasBonus > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

  if (mod !== 0) {
    cRoll.push(mod);
    exec.push(`{{mod=[[${mod}]]}}`);
  }

  OD -= MALBonus.ODMALWarrior;
  exec.push(`{{vOD=${OD}}}`);

  if (cRoll.length === 0) { cRoll.push(0); }

  bonus.push(OD);

  bonus = bonus.concat(ODMALBarbarian);
  bonus = bonus.concat(ODMALWarrior);
  bonus = bonus.concat(ODMALShaman);

  if (isConditionnel === true) { exec.push('{{conditionnel=true}}'); }

  exec.push(`{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
  exec.push(`{{tBonus=[[${bonus.join('+')}+0]]}}`);
  exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

  startRoll(exec.join(' '), (results) => {
    const tJet = results.results.jet.result;
    const tBonus = results.results.tBonus.result;
    const tExploit = results.results.Exploit.result;

    const total = tJet + tBonus;

    finishRoll(
      results.rollId,
      {
        jet: total,
      },
    );

    if (tJet !== 0 && tJet === tExploit) {
      startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}}{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`, (exploit) => {
        const tExploit2 = exploit.results.jet.result;

        finishRoll(
          exploit.rollId,
          {
            jet: tExploit2,
          },
        );
      });
    }
  });
});

on('clicked:simpleRangerVision', async (info) => {
  const roll = info.htmlAttributes.value;
  const hasArmure = true;

  let attributs = [
    'caracteristique1Ranger',
    'caracteristique2',
    'caracteristique3',
    'caracteristique4',
    'discretion',
    ODValue.discretion,
  ];

  attributs = attributs.concat(listBase, listArmureLegende);

  const attrs = await getAttrsAsync(attributs);

  const armureL = attrs.armureLegende;

  let exec = [];
  exec.push('{{special1=^{ranger-vision}}}');

  let isConditionnel = false;

  const mod = +attrs.jetModifDes;
  const hasBonus = +attrs.bonusCarac;

  const vDiscretion = attrs.discretion;
  const oDiscretion = attrs[ODValue.discretion];

  const C1 = attrs.caracteristique1Ranger;
  const C2 = attrs.caracteristique2;
  const C3 = attrs.caracteristique3;
  const C4 = attrs.caracteristique4;

  const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

  let C1Nom = '';
  let C2Nom = '';
  let C3Nom = '';
  let C4Nom = '';

  let cRoll = [];
  const cBase = [];
  const cBonus = [];

  let bonus = [];
  let OD = 0;

  let ODMALBarbarian = [];
  const ODMALWarrior = [];
  let ODMALShaman = [];

  exec.push(roll);

  if (hasArmure) { exec.push('{{OD=true}}'); }

  if (attrsCarac.C1) {
    C1Nom = attrsCarac.C1Brut;

    const C1Value = attrsCarac.C1Base;
    const C1OD = attrsCarac.C1OD;

    cBase.push(attrsCarac.C1Nom);
    cRoll.push(C1Value);

    if (hasArmure) { OD += C1OD; }
  }

  if (attrsCarac.C2) {
    C2Nom = attrsCarac.C2Brut;

    const C2Value = attrsCarac.C2Base;
    const C2OD = attrsCarac.C2OD;

    cBase.push(attrsCarac.C2Nom);
    cRoll.push(C2Value);

    if (hasArmure) { OD += C2OD; }
  }

  if (attrsCarac.C3) {
    C3Nom = attrsCarac.C3Brut;

    const C3Value = attrsCarac.C3Base;
    const C3OD = attrsCarac.C3OD;

    cBonus.push(attrsCarac.C3Nom);
    cRoll.push(C3Value);

    if (hasArmure) { OD += C3OD; }
  }

  if (attrsCarac.C4) {
    C4Nom = attrsCarac.C4Brut;

    const C4Value = attrsCarac.C4Base;
    const C4OD = attrsCarac.C4OD;

    cBonus.push(attrsCarac.C4Nom);
    cRoll.push(C4Value);

    if (hasArmure) { OD += C4OD; }
  }

  const MALBonus = getMALBonus(attrs, armureL, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

  exec = exec.concat(MALBonus.exec);
  cRoll = cRoll.concat(MALBonus.cRoll);

  if (isConditionnel === false) { isConditionnel = MALBonus.isConditionnelA; }

  ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
  ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
  ODMALWarrior.push(MALBonus.ODMALWarrior);

  exec.push(`{{cBase=${cBase.join(' - ')}}}`);

  if (hasBonus > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

  if (mod !== 0) {
    cRoll.push(mod);
    exec.push(`{{mod=[[${mod}]]}}`);
  }
  OD -= MALBonus.ODMALWarrior;
  exec.push(`{{vOD=${OD}}}`);

  if (cRoll.length === 0) { cRoll.push(0); }

  bonus.push(OD);

  bonus = bonus.concat(ODMALBarbarian);
  bonus = bonus.concat(ODMALWarrior);
  bonus = bonus.concat(ODMALShaman);

  if (isConditionnel === true) { exec.push('{{conditionnel=true}}'); }

  exec.push(`{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
  exec.push(`{{tBonus=[[${bonus.join('+')}+0]]}}`);
  exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

  startRoll(exec.join(' '), (results) => {
    const tJet = results.results.jet.result;
    const tBonus = results.results.tBonus.result;
    const tExploit = results.results.Exploit.result;

    const total = tJet + tBonus;

    finishRoll(
      results.rollId,
      {
        jet: total,
      },
    );

    if (tJet !== 0 && tJet === tExploit) {
      startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}}{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`, (exploit) => {
        const tExploit2 = exploit.results.jet.result;

        finishRoll(
          exploit.rollId,
          {
            jet: tExploit2,
          },
        );
      });
    }
  });
});

on('clicked:simpleShamanImpregnation', async (info) => {
  const roll = info.htmlAttributes.value;

  const hasArmure = true;

  let attributs = [
    'caracteristique1ShamanImpregnation',
    'caracteristique2ShamanImpregnation',
    'caracteristique3',
    'caracteristique4',
    'discretion',
    ODValue.discretion,
  ];

  attributs = attributs.concat(listBase, listArmureLegende);

  const attrs = await getAttrsAsync(attributs);

  const armureL = attrs.armureLegende;

  let exec = [];
  let isConditionnel = false;

  const hasBonus = +attrs.bonusCarac;

  const C1 = attrs.caracteristique1ShamanImpregnation;
  const C2 = attrs.caracteristique2ShamanImpregnation;
  const C3 = attrs.caracteristique3;
  const C4 = attrs.caracteristique4;

  const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

  const vDiscretion = attrs.discretion;
  const oDiscretion = attrs[ODValue.discretion];

  let C1Nom = '';
  let C2Nom = '';
  let C3Nom = '';
  let C4Nom = '';

  let cRoll = [];
  const cBase = [];
  const cBonus = [];

  let bonus = [];
  let OD = 0;

  let ODMALBarbarian = [];
  const ODMALWarrior = [];
  let ODMALShaman = [];

  exec.push(roll);

  if (hasArmure) { exec.push('{{OD=true}}'); }

  if (attrsCarac.C1) {
    C1Nom = attrsCarac.C1Brut;

    const C1Value = attrsCarac.C1Base;
    const C1OD = attrsCarac.C1OD;

    cBase.push(attrsCarac.C1Nom);
    cRoll.push(C1Value);

    if (hasArmure) { OD += C1OD; }
  }

  if (attrsCarac.C2) {
    C2Nom = attrsCarac.C2Brut;

    const C2Value = attrsCarac.C2Base;
    const C2OD = attrsCarac.C2OD;

    cBase.push(attrsCarac.C2Nom);
    cRoll.push(C2Value);

    if (hasArmure) { OD += C2OD; }
  }

  if (attrsCarac.C3) {
    C3Nom = attrsCarac.C3Brut;

    const C3Value = attrsCarac.C3Base;
    const C3OD = attrsCarac.C3OD;

    cBonus.push(attrsCarac.C3Nom);
    cRoll.push(C3Value);

    if (hasArmure) { OD += C3OD; }
  }

  if (attrsCarac.C4) {
    C4Nom = attrsCarac.C4Brut;

    const C4Value = attrsCarac.C4Base;
    const C4OD = attrsCarac.C4OD;

    cBonus.push(attrsCarac.C4Nom);
    cRoll.push(C4Value);

    if (hasArmure) { OD += C4OD; }
  }

  const MALBonus = getMALBonus(attrs, armureL, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

  exec = exec.concat(MALBonus.exec);
  cRoll = cRoll.concat(MALBonus.cRoll);

  if (isConditionnel === false) { isConditionnel = MALBonus.isConditionnelA; }

  ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
  ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
  ODMALWarrior.push(MALBonus.ODMALWarrior);

  exec.push(`{{cBase=${cBase.join(' - ')}}}`);

  if (hasBonus > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

  OD -= MALBonus.ODMALWarrior;
  exec.push(`{{vOD=${OD}}}`);

  if (cRoll.length === 0) { cRoll.push(0); }

  bonus.push(OD);

  bonus = bonus.concat(ODMALBarbarian);
  bonus = bonus.concat(ODMALShaman);
  bonus = bonus.concat(ODMALWarrior);

  if (isConditionnel === true) { exec.push('{{conditionnel=true}}'); }

  exec.push(`{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
  exec.push(`{{tBonus=[[${bonus.join('+')}+0]]}}`);
  exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

  startRoll(exec.join(' '), (results) => {
    const tJet = results.results.jet.result;
    const tBonus = results.results.tBonus.result;
    const tExploit = results.results.Exploit.result;

    const total = tJet + tBonus;

    finishRoll(
      results.rollId,
      {
        jet: total,
      },
    );

    if (tJet !== 0 && tJet === tExploit) {
      startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}} {{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`, (exploit) => {
        const tExploit2 = exploit.results.jet.result;

        finishRoll(
          exploit.rollId,
          {
            jet: tExploit2,
          },
        );
      });
    }
  });
});

on('clicked:simpleMALShamanImpregnation', async (info) => {
  const roll = info.htmlAttributes.value;
  const hasArmure = true;

  let attributs = [
    'caracteristique1MALShamanImpregnation',
    'caracteristique2MALShamanImpregnation',
    'caracteristique3',
    'caracteristique4',
    'discretion',
    ODValue.discretion,
  ];

  attributs = attributs.concat(listBase, listArmureLegende);

  const attrs = await getAttrsAsync(attributs);

  const armureL = attrs.armureLegende;

  let exec = [];
  let isConditionnel = false;

  const hasBonus = +attrs.bonusCarac;

  const C1 = attrs.caracteristique1MALShamanImpregnation;
  const C2 = attrs.caracteristique2MALShamanImpregnation;
  const C3 = attrs.caracteristique3;
  const C4 = attrs.caracteristique4;

  const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

  const vDiscretion = attrs.discretion;
  const oDiscretion = attrs[ODValue.discretion];

  let C1Nom = '';
  let C2Nom = '';
  let C3Nom = '';
  let C4Nom = '';

  let cRoll = [];
  const cBase = [];
  const cBonus = [];

  let bonus = [];
  let OD = 0;

  let ODMALBarbarian = [];
  const ODMALWarrior = [];

  exec.push(roll);

  if (hasArmure) { exec.push('{{OD=true}}'); }

  if (attrsCarac.C1) {
    C1Nom = attrsCarac.C1Brut;

    const C1Value = attrsCarac.C1Base;
    const C1OD = attrsCarac.C1OD;

    cBase.push(attrsCarac.C1Nom);
    cRoll.push(C1Value);

    if (hasArmure) { OD += C1OD; }
  }

  if (attrsCarac.C2) {
    C2Nom = attrsCarac.C2Brut;

    const C2Value = attrsCarac.C2Base;
    const C2OD = attrsCarac.C2OD;

    cBase.push(attrsCarac.C2Nom);
    cRoll.push(C2Value);

    if (hasArmure) { OD += C2OD; }
  }

  if (attrsCarac.C3) {
    C3Nom = attrsCarac.C3Brut;

    const C3Value = attrsCarac.C3Base;
    const C3OD = attrsCarac.C3OD;

    cBonus.push(attrsCarac.C3Nom);
    cRoll.push(C3Value);

    if (hasArmure) { OD += C3OD; }
  }

  if (attrsCarac.C4) {
    C4Nom = attrsCarac.C4Brut;

    const C4Value = attrsCarac.C4Base;
    const C4OD = attrsCarac.C4OD;

    cBonus.push(attrsCarac.C4Nom);
    cRoll.push(C4Value);

    if (hasArmure) { OD += C4OD; }
  }

  const MALBonus = getMALBonus(attrs, armureL, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

  exec = exec.concat(MALBonus.exec);
  cRoll = cRoll.concat(MALBonus.cRoll);

  if (isConditionnel === false) { isConditionnel = MALBonus.isConditionnelA; }

  ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
  ODMALWarrior.push(MALBonus.ODMALWarrior);

  exec.push(`{{cBase=${cBase.join(' - ')}}}`);

  if (hasBonus > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

  OD -= MALBonus.ODMALWarrior;
  exec.push(`{{vOD=${OD}}}`);

  if (cRoll.length === 0) { cRoll.push(0); }

  bonus.push(OD);

  bonus = bonus.concat(ODMALBarbarian);
  bonus = bonus.concat(ODMALWarrior);

  if (isConditionnel === true) { exec.push('{{conditionnel=true}}'); }

  exec.push(`{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
  exec.push(`{{tBonus=[[${bonus.join('+')}+0]]}}`);
  exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

  startRoll(exec.join(' '), (results) => {
    const tJet = results.results.jet.result;
    const tBonus = results.results.tBonus.result;
    const tExploit = results.results.Exploit.result;

    const total = tJet + tBonus;

    finishRoll(
      results.rollId,
      {
        jet: total,
      },
    );

    if (tJet !== 0 && tJet === tExploit) {
      startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}}{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`, (exploit) => {
        const tExploit2 = exploit.results.jet.result;

        finishRoll(
          exploit.rollId,
          {
            jet: tExploit2,
          },
        );
      });
    }
  });
});

on('clicked:simpleSorcererEtirement', async (info) => {
  const roll = info.htmlAttributes.value;
  const hasArmure = true;

  let attributs = [
    'caracteristique1',
    'caracteristique2',
    'caracteristique3',
    'caracteristique4',
    'discretion',
    ODValue.discretion,
  ];

  attributs = attributs.concat(listBase, listArmureLegende);

  const attrs = await getAttrsAsync(attributs);

  const armureL = attrs.armureLegende;

  let exec = [];
  let isConditionnel = false;

  const vDiscretion = attrs.discretion;
  const oDiscretion = attrs[ODValue.discretion];

  const mod = +attrs.jetModifDes;
  const hasBonus = +attrs.bonusCarac;

  const C1 = attrs.caracteristique1;
  const C2 = attrs.caracteristique2;
  const C3 = attrs.caracteristique3;
  const C4 = attrs.caracteristique4;

  const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

  let C1Nom = '';
  let C2Nom = '';
  let C3Nom = '';
  let C4Nom = '';

  let cRoll = [];
  const cBase = [];
  const cBonus = [];

  let bonus = [];
  let OD = 0;

  let ODMALBarbarian = [];
  const ODMALWarrior = [];
  let ODMALShaman = [];

  exec.push(roll);

  if (hasArmure) { exec.push('{{OD=true}}'); }

  if (attrsCarac.C1) {
    C1Nom = attrsCarac.C1Brut;

    const C1Value = attrsCarac.C1Base;
    const C1OD = attrsCarac.C1OD;

    cBase.push(attrsCarac.C1Nom);
    cRoll.push(C1Value);

    if (hasArmure) { OD += C1OD; }
  }

  if (attrsCarac.C2) {
    C2Nom = attrsCarac.C2Brut;

    const C2Value = attrsCarac.C2Base;
    const C2OD = attrsCarac.C2OD;

    cBase.push(attrsCarac.C2Nom);
    cRoll.push(C2Value);

    if (hasArmure) { OD += C2OD; }
  }

  if (attrsCarac.C3) {
    C3Nom = attrsCarac.C3Brut;

    const C3Value = attrsCarac.C3Base;
    const C3OD = attrsCarac.C3OD;

    cBonus.push(attrsCarac.C3Nom);
    cRoll.push(C3Value);

    if (hasArmure) { OD += C3OD; }
  }

  if (attrsCarac.C4) {
    C4Nom = attrsCarac.C4Brut;

    const C4Value = attrsCarac.C4Base;
    const C4OD = attrsCarac.C4OD;

    cBonus.push(attrsCarac.C4Nom);
    cRoll.push(C4Value);

    if (hasArmure) { OD += C4OD; }
  }

  const MALBonus = getMALBonus(attrs, armureL, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

  exec = exec.concat(MALBonus.exec);
  cRoll = cRoll.concat(MALBonus.cRoll);

  if (isConditionnel === false) { isConditionnel = MALBonus.isConditionnelA; }

  ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
  ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
  ODMALWarrior.push(MALBonus.ODMALWarrior);

  exec.push(`{{cBase=${cBase.join(' - ')}}}`);

  if (hasBonus > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

  if (mod !== 0) {
    cRoll.push(mod);
    exec.push(`{{mod=[[${mod}]]}}`);
  }

  OD -= MALBonus.ODMALWarrior;
  exec.push(`{{vOD=${OD}}}`);

  if (cRoll.length === 0) { cRoll.push(0); }

  bonus.push(OD);
  bonus = bonus.concat(3);

  bonus = bonus.concat(ODMALBarbarian);
  bonus = bonus.concat(ODMALWarrior);
  bonus = bonus.concat(ODMALShaman);

  exec.push('{{vODSorcerer=[[3]]}}');
  exec.push(`{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
  exec.push(`{{tBonus=[[${bonus.join('+')}+0]]}}`);
  exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

  startRoll(exec.join(' '), (results) => {
    const tJet = results.results.jet.result;
    const tBonus = results.results.tBonus.result;
    const tExploit = results.results.Exploit.result;

    const total = tJet + tBonus;

    finishRoll(
      results.rollId,
      {
        jet: total,
      },
    );

    if (tJet !== 0 && tJet === tExploit) {
      startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}}{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`, (exploit) => {
        const tExploit2 = exploit.results.jet.result;

        finishRoll(
          exploit.rollId,
          {
            jet: tExploit2,
          },
        );
      });
    }
  });
});

on('clicked:pilotage', async (info) => {
  const roll = info.htmlAttributes.value;
  let hasArmure = true;

  let attributs = [
    'vehicule_manoeuvrabilite',
    'caracteristique1',
    'caracteristique2',
    'caracteristique3',
    'caracteristique4',
    'discretion',
    ODValue.discretion,
  ];

  attributs = attributs.concat(listBase, listArmure, listArmureLegende);

  const attrs = await getAttrsAsync(attributs);

  const armure = attrs.armure;
  const armureL = attrs.armureLegende;

  if (armure === 'sans' || armure === 'guardian') { hasArmure = false; }

  let exec = [];
  let isConditionnel = false;

  const manoeuvrabilite = +attrs.vehicule_manoeuvrabilite;
  const mod = +attrs.jetModifDes;
  const hasBonus = +attrs.bonusCarac;

  const vDiscretion = attrs.discretion;
  const oDiscretion = attrs[ODValue.discretion];

  const C1 = attrs.caracteristique1;
  const C2 = attrs.caracteristique2;
  const C3 = attrs.caracteristique3;
  const C4 = attrs.caracteristique4;

  const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

  let C1Nom = '';
  let C2Nom = '';
  let C3Nom = '';
  let C4Nom = '';

  let cRoll = [];
  const cBase = [];
  const cBonus = [];

  let bonus = [];
  let OD = 0;

  let ODBarbarian = [];
  let ODShaman = [];
  const ODWarrior = [];

  let ODMALBarbarian = [];
  let ODMALShaman = [];
  const ODMALWarrior = [];

  exec.push(roll);

  if (hasArmure) { exec.push('{{OD=true}}'); }

  if (attrsCarac.C1) {
    C1Nom = attrsCarac.C1Brut;

    const C1Value = attrsCarac.C1Base;
    const C1OD = attrsCarac.C1OD;

    cBase.push(attrsCarac.C1Nom);
    cRoll.push(C1Value);

    if (hasArmure) { OD += C1OD; }
  }

  if (attrsCarac.C2) {
    C2Nom = attrsCarac.C2Brut;

    const C2Value = attrsCarac.C2Base;
    const C2OD = attrsCarac.C2OD;

    cBase.push(attrsCarac.C2Nom);
    cRoll.push(C2Value);

    if (hasArmure) { OD += C2OD; }
  }

  if (attrsCarac.C3) {
    C3Nom = attrsCarac.C3Brut;

    const C3Value = attrsCarac.C3Base;
    const C3OD = attrsCarac.C3OD;

    cBonus.push(attrsCarac.C3Nom);
    cRoll.push(C3Value);

    if (hasArmure) { OD += C3OD; }
  }

  if (attrsCarac.C4) {
    C4Nom = attrsCarac.C4Brut;

    const C4Value = attrsCarac.C4Base;
    const C4OD = attrsCarac.C4OD;

    cBonus.push(attrsCarac.C4Nom);
    cRoll.push(C4Value);

    if (hasArmure) { OD += C4OD; }
  }

  const armorBonus = getArmorBonus(attrs, armure, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

  exec = exec.concat(armorBonus.exec);
  cRoll = cRoll.concat(armorBonus.cRoll);

  if (isConditionnel === false) { isConditionnel = armorBonus.isConditionnelA; }

  ODBarbarian = ODBarbarian.concat(armorBonus.ODBarbarian);
  ODShaman = ODShaman.concat(armorBonus.ODShaman);
  ODWarrior.push(armorBonus.ODWarrior);

  const MALBonus = getMALBonus(attrs, armureL, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

  exec = exec.concat(MALBonus.exec);
  cRoll = cRoll.concat(MALBonus.cRoll);

  if (isConditionnel === false) { isConditionnel = MALBonus.isConditionnelA; }

  ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
  ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
  ODMALWarrior.push(MALBonus.ODMALWarrior);

  exec.push(`{{cBase=${cBase.join(' - ')}}}`);

  if (hasBonus > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

  if (mod !== 0) {
    cRoll.push(mod);
    exec.push(`{{mod=[[${mod}]]}}`);
  }

  cRoll.push(manoeuvrabilite);
  exec.push(`{{vManoeuvrabilite=+${manoeuvrabilite}D6}}`);

  OD -= armorBonus.ODWarrior;
  OD -= MALBonus.ODMALWarrior;
  exec.push(`{{vOD=${OD}}}`);

  if (cRoll.length === 0) { cRoll.push(0); }

  bonus.push(OD);

  bonus = bonus.concat(ODBarbarian);
  bonus = bonus.concat(ODShaman);
  bonus = bonus.concat(ODWarrior);

  bonus = bonus.concat(ODMALBarbarian);
  bonus = bonus.concat(ODMALShaman);
  bonus = bonus.concat(ODMALWarrior);

  exec.push(`{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
  exec.push(`{{tBonus=[[${bonus.join('+')}+0]]}}`);
  exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

  if (isConditionnel) { exec.push('{{conditionnel=true}}'); }

  startRoll(exec.join(' '), (results) => {
    const tJet = results.results.jet.result;
    const tBonus = results.results.tBonus.result;
    const tExploit = results.results.Exploit.result;

    const total = tJet + tBonus;

    finishRoll(
      results.rollId,
      {
        jet: total,
      },
    );

    if (tJet !== 0 && tJet === tExploit) {
      startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}}{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`, (exploit) => {
        const tExploit2 = exploit.results.jet.result;

        finishRoll(
          exploit.rollId,
          {
            jet: tExploit2,
          },
        );
      });
    }
  });
});

on('clicked:initiative', async (info) => {
  const roll = info.htmlAttributes.value;
  let hasArmure = true;

  let listAttrs = [
    'diceInitiative',
    'bonusInitiative',
    'bonusInitiativeP',
    'malusInitiative',
    'discretion',
    ODValue.discretion,
    ODValue.instinct,
  ];

  listAttrs = listAttrs.concat(listBase);

  const attrs = await getAttrsAsync(listAttrs);

  const armure = attrs.armure;

  if (armure === 'sans' || armure === 'guardian') { hasArmure = false; }

  const dice = +attrs.diceInitiative || 3;
  const bonus = +attrs.bonusInitiative || 0;
  const bonusP = +attrs.bonusInitiativeP || 0;
  const malus = +attrs.malusInitiative || 0;

  const str = '';

  const ODInstinct = +attrs[ODValue.instinct];

  let result1 = 0;
  let result2 = 0;
  let resultF = 0;

  if (ODInstinct > 1 && hasArmure) {
    startRoll(`${roll} {{special1=^{initiative} 1}} {{jDivers=^{resultat}}} {{jDiversV=[[${dice}D6+${bonus}+${bonusP}-${malus}]]}}`, (results) => {
      result1 = results.results.jDiversV.result;

      finishRoll(
        results.rollId, {},
      );

      startRoll(`${roll} {{special1=^{initiative} 2}} {{jDivers=^{resultat}}} {{jDiversV=[[${dice}D6+${bonus}+${bonusP}-${malus}]]}}`, (results2) => {
        result2 = results2.results.jDiversV.result;

        finishRoll(
          results2.rollId, {},
        );

        resultF = Math.max(result1, result2);

        startRoll(`${roll} {{special1=^{initiative-finale}}} {{jDivers=^{resultat}}} {{jDiversV=[[${resultF} &{tracker}]]}} ${str}`, (results3) => {
          finishRoll(
            results3.rollId, {},
          );
        });
      });
    });
  } else {
    startRoll(`${roll} {{special1=^{initiative}}} {{jDivers=^{resultat}}} {{jDiversV=[[${dice}D6+${bonus}+${bonusP}-${malus} &{tracker}]]}} ${str}`, (results) => {
      finishRoll(
        results.rollId, {},
      );
    });
  }
});

const nods = ['nodsSoin', 'nodsArmure', 'nodsEnergie'];

nods.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value;

    let sActuel = '';
    let sMax = '';

    let actuel = 0;
    let max = 0;

    switch (button) {
      case 'nodsSoin':
        sActuel = 'santepj';
        sMax = 'santepj_max';
        break;
      case 'nodsArmure':
        sActuel = 'armurePJ';
        sMax = 'armurePJ_max';
        break;
      case 'nodsEnergie':
        sActuel = 'energiePJ';
        sMax = 'energiePJ_max';
        break;
      default:
        sActuel = '';
        sMax = '';
        break;
    }

    const attrs = await getAttrsAsync([
      sActuel,
      sMax,
    ]);

    actuel = +attrs[sActuel];
    max = +attrs[sMax];

    startRoll(`${roll} {{jDivers=^{recupere}}} {{jDiversV=[[3D6]]}}`, (results) => {
      const recup = Number(results.results.jDiversV.result);
      let total = actuel + recup;

      if (total > max) { total = max; }

      switch (button) {
        case 'nodsSoin':
          setAttrsAsync({
            santepj: total,
          });
          break;
        case 'nodsArmure':
          setAttrsAsync({
            armurePJ: total,
          });
          break;
        case 'nodsEnergie':
          setAttrsAsync({
            energiePJ: total,
          });
          break;
      }

      finishRoll(
        results.rollId, {},
      );
    });
  });
});

on('clicked:blessuresGraves', (info) => {
  const roll = info.htmlAttributes.value;

  startRoll(`${roll} {{rollTitre=[[1D6]]}} {{rollText=[[1D6]]}}`, (results) => {
    const D1 = Number(results.results.rollTitre.result);
    const D2 = Number(results.results.rollText.result);

    let titre = '';
    let text = '';

    switch (D1) {
      case 1:
        switch (D2) {
          case 1:
            titre = getTranslationByKey('blessures-mort');
            text = getTranslationByKey('blessures-mort-description');
            break;

          case 2:
            titre = getTranslationByKey('blessures-organes-internes');
            text = getTranslationByKey('blessures-organes-internes-touches-description');
            break;

          case 3:
            titre = getTranslationByKey('blessures-cerveau-touche');
            text = getTranslationByKey('blessures-cerveau-touche-description');
            break;

          case 4:
            titre = getTranslationByKey('blessures-colonne-vertebrale-touchee');
            text = getTranslationByKey('blessures-colonne-vertebrale-touchee-description');
            break;

          case 5:
            titre = getTranslationByKey('blessures-hemorragie-interne');
            text = getTranslationByKey('blessures-hemorragie-interne-description');
            break;

          case 6:
            titre = getTranslationByKey('blessures-poumons-perfores');
            text = getTranslationByKey('blessures-poumons-perfores-description');
            break;

          default:
            titre = '';
            text = '';
            break;
        }
        break;

      case 2:
      case 3:
        switch (D2) {
          case 1:
            titre = getTranslationByKey('blessures-crane-brise');
            text = getTranslationByKey('blessures-crane-brise-description');
            break;

          case 2:
            titre = getTranslationByKey('blessures-yeux-detruits');
            text = getTranslationByKey('blessures-yeux-detruits-description');
            break;

          case 3:
            titre = getTranslationByKey('blessures-dos-brise');
            text = getTranslationByKey('blessures-dos-brise-description');
            break;

          case 4:
            titre = getTranslationByKey('blessures-main-brise');
            text = getTranslationByKey('blessures-main-brise-description');
            break;

          case 5:
            titre = getTranslationByKey('blessures-oreille-eclatee');
            text = getTranslationByKey('blessures-oreille-eclatee-description');
            break;

          case 6:
            titre = getTranslationByKey('blessures-cotes-brisees');
            text = getTranslationByKey('blessures-cotes-brisees-description');
            break;

          default:
            titre = '';
            text = '';
            break;
        }
        break;

      case 4:
      case 5:
        switch (D2) {
          case 1:
            titre = getTranslationByKey('blessures-colonne-vertebrale-brisee');
            text = getTranslationByKey('blessures-colonne-vertebrale-brisee-description');
            break;

          case 2:
            titre = getTranslationByKey('blessures-machoire-langue-dents-detruites');
            text = getTranslationByKey('blessures-machoire-langue-dents-detruites-description');
            break;

          case 3:
            titre = getTranslationByKey('blessures-pied-brise');
            text = getTranslationByKey('blessures-pied-brise-description');
            break;

          case 4:
            titre = getTranslationByKey('blessures-dos-touche');
            text = getTranslationByKey('blessures-dos-touche-description');
            break;

          case 5:
            titre = getTranslationByKey('blessures-tempe-touchee');
            text = getTranslationByKey('blessures-tempe-touchee-description');
            break;

          case 6:
            titre = getTranslationByKey('blessures-blessure-mineure');
            text = getTranslationByKey('blessures-blessure-mineure-description');
            break;

          default:
            titre = '';
            text = '';
            break;
        }
        break;

      case 6:
        switch (D2) {
          case 1:
            titre = getTranslationByKey('blessures-bras-mutile');
            text = getTranslationByKey('blessures-bras-mutile-description');
            break;

          case 2:
            titre = getTranslationByKey('blessures-jambe-mutilee');
            text = getTranslationByKey('blessures-jambe-mutilee-description');
            break;

          case 3:
            titre = getTranslationByKey('blessures-traumatisme-cranien');
            text = getTranslationByKey('blessures-traumatisme-cranien-description');
            break;

          case 4:
            titre = getTranslationByKey('blessures-borgne');
            text = getTranslationByKey('blessures-borgne-description');
            break;

          case 5:
            titre = getTranslationByKey('blessures-blessure-mineure');
            text = getTranslationByKey('blessures-blessure-mineure-description');
            break;

          case 6:
            titre = getTranslationByKey('blessures-rien');
            text = getTranslationByKey('blessures-rien-description');
            break;

          default:
            titre = '';
            text = '';
            break;
        }
        break;

      default:
        titre = '';
        text = '';
        break;
    }

    finishRoll(
      results.rollId, {
        rollTitre: titre,
        rollText: text,
      },
    );
  });
});

on('clicked:traumas', (info) => {
  const roll = info.htmlAttributes.value;

  startRoll(`${roll}`, (results) => {
    const D1 = Number(results.results.rollTitre.result);
    const D2 = Number(results.results.rollText.result);

    let titre = '';
    let text = '';

    switch (D1) {
      case 0:
        switch (D2) {
          case 1:
            titre = getTranslationByKey('traumas-anxiete');
            text = getTranslationByKey('traumas-anxiete-description');
            break;

          case 2:
            titre = getTranslationByKey('traumas-tic');
            text = getTranslationByKey('traumas-tic-description');
            break;

          case 3:
            titre = getTranslationByKey('traumas-perte-confiance');
            text = getTranslationByKey('traumas-perte-confiance-description');
            break;

          case 4:
            titre = getTranslationByKey('traumas-peur-monstre');
            text = getTranslationByKey('traumas-peur-monstre-description');
            break;

          case 5:
            titre = getTranslationByKey('traumas-rituel');
            text = getTranslationByKey('traumas-rituel-description');
            break;

          case 6:
            titre = getTranslationByKey('traumas-collection');
            text = getTranslationByKey('traumas-collection-description');
            break;

          default:
            titre = '';
            text = '';
            break;
        }
        break;

      case 1:
        switch (D2) {
          case 1:
            titre = getTranslationByKey('traumas-faiblesse');
            text = getTranslationByKey('traumas-faiblesse-description');
            break;

          case 2:
            titre = getTranslationByKey('traumas-somatisation');
            text = getTranslationByKey('traumas-somatisation-description');
            break;

          case 3:
            titre = getTranslationByKey('traumas-distanciation');
            text = getTranslationByKey('traumas-distanciation-description');
            break;

          case 4:
            titre = getTranslationByKey('traumas-reveries');
            text = getTranslationByKey('traumas-reveries-description');
            break;

          case 5:
            titre = getTranslationByKey('traumas-hypersensibilite');
            text = getTranslationByKey('traumas-hypersensibilite-description');
            break;

          case 6:
            titre = getTranslationByKey('traumas-trouble-sensitif');
            text = getTranslationByKey('traumas-trouble-sensitif-description');
            break;

          default:
            titre = '';
            text = '';
            break;
        }
        break;

      case 2:
        switch (D2) {
          case 1:
            titre = getTranslationByKey('traumas-dissociation');
            text = getTranslationByKey('traumas-dissociation-description');
            break;

          case 2:
            titre = getTranslationByKey('traumas-depression');
            text = getTranslationByKey('traumas-depression-description');
            break;

          case 3:
            titre = getTranslationByKey('traumas-paranoia');
            text = getTranslationByKey('traumas-paranoia-description');
            break;

          case 4:
            titre = getTranslationByKey('traumas-trouble-memoriel');
            text = getTranslationByKey('traumas-trouble-memoriel-description');
            break;

          case 5:
            titre = getTranslationByKey('traumas-addiction');
            text = getTranslationByKey('traumas-addiction-description');
            break;

          case 6:
            titre = getTranslationByKey('traumas-hallucinations');
            text = getTranslationByKey('traumas-hallucinations-description');
            break;

          default:
            titre = '';
            text = '';
            break;
        }
        break;

      case 3:
        switch (D2) {
          case 1:
            titre = getTranslationByKey('traumas-anatheme');
            text = getTranslationByKey('traumas-anatheme-description');
            break;

          case 2:
            titre = getTranslationByKey('traumas-abattement');
            text = getTranslationByKey('traumas-abattement-description');
            break;

          case 3:
            titre = getTranslationByKey('traumas-decouragement');
            text = getTranslationByKey('traumas-decouragement-description');
            break;

          case 4:
            titre = getTranslationByKey('traumas-oubli');
            text = getTranslationByKey('traumas-oubli-description');
            break;

          case 5:
            titre = getTranslationByKey('traumas-phobie-sociale');
            text = getTranslationByKey('traumas-phobie-sociale-description');
            break;

          case 6:
            titre = getTranslationByKey('traumas-perte-controle');
            text = getTranslationByKey('traumas-perte-controle-description');
            break;

          default:
            titre = '';
            text = '';
            break;
        }
        break;

      default:
        titre = '';
        text = '';
        break;
    }

    finishRoll(
      results.rollId, {
        rollTitre: titre,
        rollText: text,
      },
    );
  });
});
