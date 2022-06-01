/* eslint-disable default-case */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
on('clicked:distanceWizardBorealis', async (info) => {
  const roll = info.htmlAttributes.value;
  const hasArmure = true;

  let attributs = [
    'caracteristique1',
    'caracteristique2',
    'caracteristique3',
    'caracteristique4',
    'wizardBDmg',
    'wizardBViolence',
    'wizardBPortee',
    'wizardBTypeAttaque',
    'calODTir',
    'calODCom',
    'discretion',
    ODValue.discretion,
    'devasterAnatheme',
    'bourreauTenebres',
    'equilibreBalance',
  ];

  attributs = attributs.concat(listBase, listStyle, listArmureLegende);

  const attrs = await getAttrsAsync(attributs);

  const armureL = attrs.armureLegende;

  let exec = [];
  let autresEffets = [];

  const typeAttaque = attrs.wizardBTypeAttaque;

  let diceDegats = Number(attrs.wizardBDmg.split('D')[0]);
  let diceViolence = Number(attrs.wizardBViolence.split('D')[0]);
  const portee = attrs.wizardBPortee;

  const mod = +attrs.jetModifDes;
  const hasBonus = +attrs.bonusCarac;

  const vDiscretion = +attrs.discretion;
  const oDiscretion = +attrs[ODValue.discretion];

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

  const devaste = +attrs.devasterAnatheme;
  const bourreau = +attrs.bourreauTenebres;
  const equilibre = +attrs.equilibreBalance;

  let ODMALBarbarian = [];
  let ODMALRogue = [];
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

  const MALBonus = getMALBonus(attrs, armureL, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, autresEffets);

  exec = exec.concat(MALBonus.exec);
  cRoll = cRoll.concat(MALBonus.cRoll);

  ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
  ODMALRogue = ODMALRogue.concat(MALBonus.ODMALRogue);
  ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
  ODMALWarrior.push(MALBonus.ODMALWarrior);

  autresEffets = autresEffets.concat(MALBonus.autresEffets);

  exec.push(`{{cBase=${cBase.join(' - ')}}}`);

  if (hasBonus > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

  if (mod !== 0) {
    cRoll.push(mod);
    exec.push(`{{mod=[[${mod}]]}}`);
  }

  // GESTION DU STYLE

  const ODTir = attrs.calODTir;
  const ODCombat = attrs.calODCom;
  const style = attrs.styleCombat;
  let bName = '';
  let modA = 0;
  let violenceB = 0;

  switch (style) {
    case 'standard':
      exec.push(`{{style=${i18n_style} ${i18n_standard}}}`);
      break;

    case 'couvert':
      bName = 'atkCouvert';
      modA = attrs[bName];

      exec.push(`{{style=${i18n_style} ${i18n_couvert}}}`);
      exec.push(`{{vMStyleA=${modA}D}}`);
      cRoll.push(Number(modA));
      break;

    case 'agressif':
      bName = 'atkAgressif';
      modA = attrs[bName];

      exec.push(`{{style=${i18n_style} ${i18n_agressif}}}`);
      exec.push(`{{vMStyleA=${modA}D}}`);
      cRoll.push(Number(modA));
      break;

    case 'akimbo':
      bName = 'atkAkimbo';
      modA = attrs[bName];
      violenceB = Math.ceil(diceViolence / 2);

      exec.push(`{{style=${i18n_style} ${i18n_akimbo}}}`);
      exec.push(`{{vMStyleD=+${diceDegats}}}`);
      exec.push(`{{vMStyleV=+${violenceB}D6}}`);
      diceDegats += diceDegats;
      diceViolence += violenceB;

      if (typeAttaque === 'distance' && ODTir >= 3) {
        exec.push('{{vMStyleA=-1D}}');
        cRoll.push(-1);
      } else if (typeAttaque === 'contact' && ODCombat >= 3) {
        exec.push('{{vMStyleA=-1D}}');
        cRoll.push(-1);
      } else {
        exec.push(`{{vMStyleA=${modA}D}}`);
        cRoll.push(Number(modA));
      }

      break;

    case 'ambidextre':
      bName = 'atkAmbidextre';
      modA = attrs[bName];

      exec.push(`{{style=${i18n_style} ${i18n_ambidextre}}}`);

      if (typeAttaque === 'distance' && ODTir >= 3) {
        exec.push('{{vMStyleA=-1D}}');
        cRoll.push(-1);
      } else if (typeAttaque === 'contact' && ODCombat >= 3) {
        exec.push('{{vMStyleA=-1D}}');
        cRoll.push(-1);
      } else {
        exec.push(`{{vMStyleA=${modA}D}}`);
        cRoll.push(Number(modA));
      }
      break;

    case 'defensif':
      bName = 'atkDefensif';
      modA = attrs[bName];

      exec.push(`{{style=${i18n_style} ${i18n_defensif}}}`);
      exec.push(`{{vMStyleA=${modA}D}}`);
      cRoll.push(Number(modA));
      break;
  }

  // FIN GESTION DU STYLE
  OD -= MALBonus.ODMALWarrior;
  exec.push(`{{vOD=${OD}}}`);

  if (cRoll.length === 0) { cRoll.push(0); }

  bonus.push(OD);

  bonus = bonus.concat(ODMALBarbarian);
  bonus = bonus.concat(ODMALRogue);
  bonus = bonus.concat(ODMALWarrior);
  bonus = bonus.concat(ODMALShaman);

  exec.push(`{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
  exec.push(`{{tBonus=[[${bonus.join('+')}+0]]}}`);
  exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

  exec.push(`{{portee=${i18n_portee} ${portee}}}`);
  exec.push(`{{degats=[[${diceDegats}D6]]}}`);
  exec.push(`{{violence=[[${diceViolence}D6]]}}`);
  exec.push(`{{effets=${i18n_degatsContinus} ([[1d6]] ${i18n_tours})}}`);

  exec.push('{{degatsConditionnel=true}}');
  exec.push('{{violenceConditionnel=true}}');
  exec.push(`{{antiAnatheme=${i18n_antiAnatheme}}}`);
  exec.push(`{{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);

  if (devaste || bourreau || equilibre) {
    const herauts = [];

    if (devaste) { herauts.push(i18n_devasterAnatheme); }
    if (bourreau) { herauts.push(i18n_bourreauTenebres); }
    if (equilibre) { herauts.push(i18n_equilibrerBalance); }

    exec.push(`{{herauts=${herauts.join(' / ')}}}`);
  }

  // ROLL
  const finalRoll = await startRoll(exec.join(' '));

  const tJet = finalRoll.results.jet.result;

  const tBonus = finalRoll.results.tBonus.result;
  const tExploit = finalRoll.results.Exploit.result;

  const rDegats = finalRoll.results.degats.dice;
  const rViolence = finalRoll.results.violence.dice;

  const tDegats = finalRoll.results.degats.result;
  const tViolence = finalRoll.results.violence.result;

  const conditions = {
    bourreau,
    devaste,
    equilibre,
  };

  const computed = updateRoll(finalRoll, tDegats, rDegats, [], tViolence, rViolence, [], conditions);

  const finalComputed = {
    jet: tJet + tBonus,
  };

  Object.assign(finalComputed, computed);

  finishRoll(finalRoll.rollId, finalComputed);

  if (tJet !== 0 && tJet === tExploit) {
    const exploitRoll = await startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}}{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
    const tRExploit = exploitRoll.results.jet.result;
    const exploitComputed = {
      jet: tRExploit,
    };

    finishRoll(exploitRoll.rollId, exploitComputed);
  }
});

on('clicked:distanceWizardOriflamme', async (info) => {
  const roll = info.htmlAttributes.value;

  let attributs = [
    'wizardODmg',
    'wizardOViolence',
    'wizardOPortee',
    'devasterAnatheme',
    'bourreauTenebres',
    'equilibreBalance',
  ];

  attributs = attributs.concat(listBase);
  attributs = attributs.concat(listArmureLegende);

  const attrs = await getAttrsAsync(attributs);

  const armureL = attrs.armureLegende;

  const exec = [];
  const autresEffets = [];

  let MALGoliath;
  let MALChangeling;
  let MALGhost;
  let MALTypeSoldier;
  let MALTypeHunter;
  let MALTypeHerald;
  let MALTypeScholar;
  let MALTypeScout;

  const degats = attrs.wizardODmg;
  const violence = attrs.wizardOViolence;
  const portee = attrs.wizardOPortee;

  const devaste = +attrs.devasterAnatheme;
  const bourreau = +attrs.bourreauTenebres;
  const equilibre = +attrs.equilibreBalance;

  exec.push(roll);

  switch (armureL) {
    case 'barbarian':
      MALGoliath = +attrs.MALBarbarianGoliath;

      if (MALGoliath !== 0) { exec.push(`{{MALGoliath=[[${MALGoliath}]]}}`); }
      break;

    case 'bard':
      MALChangeling = +attrs.MALBardChangeling;

      if (MALChangeling !== 0) {
        exec.push(`{{MALspecial2=${i18n_changelingActive}}}`);
      }
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
      MALChangeling = '';
      MALTypeSoldier = '';
      MALTypeHunter = '';
      MALTypeHerald = '';
      MALTypeScholar = '';
      MALTypeScout = '';
      break;
  }

  autresEffets.push(`${i18n_lumiere} 2`);

  exec.push(`{{portee=${i18n_portee} ${portee}}}`);
  exec.push(`{{degats=[[${degats}]]}}`);
  exec.push(`{{violence=[[${violence}]]}}`);

  exec.push(`{{antiAnatheme=${i18n_antiAnatheme}}}`);
  exec.push(`{{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);

  exec.push('{{degatsConditionnel=true}}');
  exec.push('{{violenceConditionnel=true}}');
  exec.push(`{{affecteAnathemeD=${i18n_affecteAnatheme}}}`);
  exec.push(`{{affecteAnathemeV=${i18n_affecteAnatheme}}}`);

  exec.push(`{{effets=${autresEffets.join(' / ')}}}`);

  if (devaste || bourreau || equilibre) {
    const herauts = [];

    if (devaste) { herauts.push(i18n_devasterAnatheme); }
    if (bourreau) { herauts.push(i18n_bourreauTenebres); }
    if (equilibre) { herauts.push(i18n_equilibrerBalance); }

    exec.push(`{{herauts=${herauts.join(' / ')}}}`);
  }

  // ROLL
  const finalRoll = await startRoll(exec.join(' '));

  const rDegats = finalRoll.results.degats.dice;
  const rViolence = finalRoll.results.violence.dice;

  const tDegats = finalRoll.results.degats.result;
  const tViolence = finalRoll.results.violence.result;

  const conditions = {
    bourreau,
    devaste,
    equilibre,
  };

  const computed = updateRoll(finalRoll, tDegats, rDegats, [], tViolence, rViolence, [], conditions);

  finishRoll(finalRoll.rollId, computed);
});

on('clicked:distanceMALWizardOriflamme', async (info) => {
  const roll = info.htmlAttributes.value;

  let attributs = [
    'MALWizardODmg',
    'MALWizardOViolence',
    'MALWizardOPortee',
    'devasterAnatheme',
    'bourreauTenebres',
    'equilibreBalance',
  ];

  attributs = attributs.concat(listArmureLegende);

  const attrs = await getAttrsAsync(attributs);

  const armureL = attrs.armureLegende;

  const exec = [];

  const degats = attrs.MALWizardODmg;
  const violence = attrs.MALWizardOViolence;
  const portee = attrs.MALWizardOPortee;

  const devaste = +attrs.devasterAnatheme;
  const bourreau = +attrs.bourreauTenebres;
  const equilibre = +attrs.equilibreBalance;

  const autresEffets = [];

  let MALGoliath;
  let MALChangeling;
  let MALGhost;
  let MALTypeSoldier;
  let MALTypeHunter;
  let MALTypeHerald;
  let MALTypeScholar;
  let MALTypeScout;

  exec.push(roll);

  switch (armureL) {
    case 'barbarian':
      MALGoliath = +attrs.MALBarbarianGoliath;

      if (MALGoliath !== 0) { exec.push(`{{MALGoliath=[[${MALGoliath}]]}}`); }
      break;

    case 'bard':
      MALChangeling = +attrs.MALBardChangeling;

      if (MALChangeling !== 0) {
        exec.push(`{{MALspecial2=${i18n_changelingActive}}}`);
      }
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
      MALChangeling = '';
      MALTypeSoldier = '';
      MALTypeHunter = '';
      MALTypeHerald = '';
      MALTypeScholar = '';
      MALTypeScout = '';
  }

  autresEffets.push(`${i18n_lumiere} 2`);

  exec.push(`{{portee=${i18n_portee} ${portee}}}`);
  exec.push(`{{degats=[[${degats}]]}}`);
  exec.push(`{{violence=[[${violence}]]}}`);

  exec.push(`{{antiAnatheme=${i18n_antiAnatheme}}}`);
  exec.push(`{{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);

  exec.push('{{degatsConditionnel=true}}');
  exec.push('{{violenceConditionnel=true}}');
  exec.push(`{{affecteAnathemeD=${i18n_affecteAnatheme}}}`);
  exec.push(`{{affecteAnathemeV=${i18n_affecteAnatheme}}}`);

  if (devaste || bourreau || equilibre) {
    const herauts = [];

    if (devaste) { herauts.push(i18n_devasterAnatheme); }
    if (bourreau) { herauts.push(i18n_bourreauTenebres); }
    if (equilibre) { herauts.push(i18n_equilibrerBalance); }

    exec.push(`{{herauts=${herauts.join(' / ')}}}`);
  }

  exec.push(`{{effets=${autresEffets.join(' / ')}}}`);

  // ROLL
  const finalRoll = await startRoll(exec.join(' '));

  const rDegats = finalRoll.results.degats.dice;
  const rViolence = finalRoll.results.violence.dice;

  const tDegats = finalRoll.results.degats.result;
  const tViolence = finalRoll.results.violence.result;

  const conditions = {
    bourreau,
    devaste,
    equilibre,
  };

  const computed = updateRoll(finalRoll, tDegats, rDegats, [], tViolence, rViolence, [], conditions);

  finishRoll(finalRoll.rollId, computed);
});
