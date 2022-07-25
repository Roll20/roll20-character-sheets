/* eslint-disable no-loop-func */
/* eslint-disable default-case */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
on('clicked:mechaArmureARResilience', async (info) => {
  const roll = info.htmlAttributes.value;

  const attributs = [
    'mechaArmureSystemes',
    'mechaArmureResilience',
    'mechaArmureResilience_max',
  ];

  const attrs = await getAttrsAsync(attributs);

  const exec = [];

  const system = +attrs.mechaArmureSystemes;
  const resilience = +attrs.mechaArmureResilience;
  const resilienceMax = +attrs.mechaArmureResilience_max;
  const difficulte = Math.floor((resilienceMax - resilience) / 2);

  const cRoll = [system];

  exec.push(roll);

  if (cRoll.length === 0) { cRoll.push(0); }

  exec.push(`{{jDivers=^{test-autoreparation}}} {{jDiversV=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}} {{jDivers2=^{difficulte}}} {{jDivers2V=${difficulte}}} {{rollText=[[0]]}}`);

  startRoll(exec.join(' '), (results) => {
    const test = results.results.jDiversV.result;
    let text = '';

    if (test > difficulte) {
      let recup = (test - difficulte) + resilience;

      if (recup > resilienceMax) { recup = resilienceMax; }

      const newAttr = {};
      newAttr.mechaArmureResilience = recup;

      setAttrs(newAttr);

      text = `${i18n_resilienceRepare} (${test - difficulte})`;
    } else { text = `${i18n_resilienceRepare} (0)`; }

    finishRoll(
      results.rollId,
      {
        rollText: text,
      },
    );
  });
});

on('clicked:mechaArmureARBlindage', async (info) => {
  const roll = info.htmlAttributes.value;

  const attributs = [
    'mechaArmureSystemes',
    'mechaArmureBlindage',
    'mechaArmureBlindage_max',
  ];

  const attrs = await getAttrsAsync(attributs);

  const exec = [];

  const system = +attrs.mechaArmureSystemes;
  const blindage = +attrs.mechaArmureBlindage;
  const blindageMax = +attrs.mechaArmureBlindage_max;
  const difficulte75 = Math.floor(blindageMax * 0.75);
  const difficulte50 = Math.floor(blindageMax * 0.50);
  const difficulte25 = Math.floor(blindageMax * 0.25);
  let difficulte;

  if (blindage >= difficulte75) { difficulte = 4; } else if (blindage >= difficulte50) { difficulte = 7; } else if (blindage >= difficulte25) { difficulte = 10; } else { difficulte = 15; }

  const cRoll = [system];

  exec.push(roll);

  if (cRoll.length === 0) { cRoll.push(0); }

  exec.push(`{{jDivers=^{test-autoreparation}}} {{jDiversV=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}} {{jDivers2=^{difficulte}}} {{jDivers2V=${difficulte}}}`);

  startRoll(exec.join(' '), (results) => {
    const test = results.results.jDiversV.result;

    if (test > difficulte) {
      startRoll(`${roll} {{jDivers=${i18n_blindageRepare}}} {{jDiversV=[[2D6+6]]}}`, (results2) => {
        let recup = blindage + Number(results2.results.jDiversV.result);

        if (recup > blindageMax) { recup = blindageMax; }

        const newAttr = {};
        newAttr.mechaArmureBlindage = recup;

        setAttrs(newAttr);

        finishRoll(
          results2.rollId, {},
        );
      });
    }

    finishRoll(
      results.rollId, {},
    );
  });
});

on('clicked:manoeuvrabilite', async (info) => {
  const roll = info.htmlAttributes.value;

  const attributs = [
    'jetModifDes',
    'bonusCarac',
    'caracteristique1MA',
    'caracteristique2MA',
    'caracteristique3MA',
    'caracteristique4MA',
    'mechaArmureTypeJets',
    'mechaArmureManoeuvrabilite',
    'mechaArmurePuissance',
    'mechaArmureSenseurs',
    'mechaArmureSystemes',
  ];

  const attrs = await getAttrsAsync(attributs);

  const exec = [];
  const isConditionnel = false;

  const type = +attrs.mechaArmureTypeJets;

  const manoeuvrabilite = +attrs.mechaArmureManoeuvrabilite;
  const puissance = +attrs.mechaArmurePuissance;
  const senseurs = +attrs.mechaArmureSenseurs;
  const systemes = +attrs.mechaArmureSystemes;

  const mod = +attrs.jetModifDes;
  const hasBonus = +attrs.bonusCarac;

  const C1 = attrs.caracteristique1MA;
  const C2 = attrs.caracteristique2MA;
  const C3 = attrs.caracteristique3MA;
  const C4 = attrs.caracteristique4MA;

  const cRoll = [];
  const cNom1 = [];
  const cNom2 = [];

  const bonus = [];
  let OD = 0;

  exec.push(roll);

  exec.push('{{OD=true}}');

  const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

  if (attrsCarac.C1) {
    const C1Value = attrsCarac.C1Base;
    const C1OD = attrsCarac.C1OD;

    cNom1.push(attrsCarac.C1Nom);
    cRoll.push(C1Value);

    OD += C1OD;
  }

  if (attrsCarac.C2) {
    const C2Value = attrsCarac.C2Base;
    const C2OD = attrsCarac.C2OD;

    cNom1.push(attrsCarac.C2Nom);
    cRoll.push(C2Value);

    OD += C2OD;
  }

  if (attrsCarac.C3) {
    const C3Value = attrsCarac.C3Base;
    const C3OD = attrsCarac.C3OD;

    cNom2.push(attrsCarac.C3Nom);
    cRoll.push(C3Value);

    OD += C3OD;
  }

  if (attrsCarac.C4) {
    const C4Value = attrsCarac.C4Base;
    const C4OD = attrsCarac.C4OD;

    cNom2.push(attrsCarac.C4Nom);
    cRoll.push(C4Value);

    OD += C4OD;
  }

  exec.push(`{{vOD=${OD}}}`);

  exec.push(`{{cBase=${cNom1.join(' - ')}}}`);

  if (hasBonus > 0) { exec.push(`{{cBonus=${cNom2.join(' - ')}}}`); }

  if (mod !== 0) {
    cRoll.push(mod);
    exec.push(`{{mod=[[${mod}]]}}`);
  }

  switch (type) {
    case 1:
      cRoll.push(manoeuvrabilite);
      exec.push(`{{vManoeuvrabilite=+${manoeuvrabilite}D6}}`);
      break;
    case 2:
      cRoll.push(puissance);
      exec.push(`{{vPuissance=+${puissance}D6}}`);
      break;
    case 3:
      cRoll.push(senseurs);
      exec.push(`{{vSenseurs=+${senseurs}D6}}`);
      break;
    case 4:
      cRoll.push(systemes);
      exec.push(`{{vSystemes=+${systemes}D6}}`);
      break;
    default:
      break;
  }

  if (cRoll.length === 0) { cRoll.push(0); }

  bonus.push(OD);

  exec.push(`{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
  exec.push(`{{tBonus=[[${bonus.join('+')}+0]]}}`);
  exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

  if (isConditionnel === true) { exec.push('{{conditionnel=true}}'); }

  log(exec);

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

const rollMAImprovise = 14;

for (let i = 0; i < rollMAImprovise; i += 1) {
  const str = `MAAI${i}`;
  const strDgts = `dgts${i}`;
  const strViolence = `violence${i}`;

  on(`clicked:${str}`, async (info) => {
    const roll = info.htmlAttributes.value;

    let attributs = [
      'mechaArmurePuissance',
      'MAUtilisationArmeAI',
      'jetModifDes',
      'bonusCarac',
      'caracteristique3ArmeImprovisee',
      'caracteristique4ArmeImprovisee',
      'force',
      `${ODValue.force}`,
      'discretion',
      `${ODValue.discretion}`,
      'tir',
      `${ODValue.tir}`,
      'combat',
      `${ODValue.combat}`,
      'devasterAnatheme',
      'bourreauTenebres',
      'equilibreBalance',
      'MADDjinnWraithActive',
    ];

    const arme = [];

    arme.push(strDgts);
    arme.push(strViolence);

    attributs = attributs.concat(arme, listStyle);

    const attrs = await getAttrsAsync(attributs);

    let exec = [];
    exec.push(roll);

    const isConditionnelD = false;

    const cBase = [];
    const cBonus = [];
    let cRoll = [];
    const bonus = [];

    let OD = 0;

    const wraith = attrs.MADDjinnWraithActive;

    const type = attrs.MAUtilisationArmeAI;
    const mod = +attrs.jetModifDes;
    const hasBonus = +attrs.bonusCarac;

    const baseDegats = +attrs[strDgts].split('D')[0];
    const baseViolence = +attrs[strViolence].split('D')[0];

    let diceDegats = baseDegats;
    let diceViolence = baseDegats;

    const bDegats = [];
    const bViolence = [];

    let degats = [];
    let violence = [];

    let C1Nom;
    let C2Nom;

    const C3 = attrs.caracteristique3ArmeImprovisee;
    const C4 = attrs.caracteristique4ArmeImprovisee;

    if (type === '&{template:mechaArmure} {{special1=@{mechaArmureNom}}} {{portee=^{portee-contact}}}') {
      C1Nom = 'force';
      C2Nom = 'combat';
    } else {
      C1Nom = 'force';
      C2Nom = 'tir';
    }

    const attaquesSurprises = [];
    const attaquesSurprisesValue = [];
    const attaquesSurprisesCondition = '';

    const devaste = +attrs.devasterAnatheme;
    const bourreau = +attrs.bourreauTenebres;
    const equilibre = +attrs.equilibreBalance;

    let isSurprise = false;

    const autresEffets = [];

    exec.push('{{OD=true}}');

    const C1Value = +attrs[C1Nom];
    const C1OD = +attrs[ODValue[C1Nom]];

    cBase.push(CaracNom[C1Nom]);
    cRoll.push(C1Value);

    OD += C1OD;

    const C2Value = +attrs[C2Nom];
    const C2OD = +attrs[ODValue[C2Nom]];

    cBase.push(CaracNom[C2Nom]);
    cRoll.push(C2Value);

    OD += C2OD;

    const attrsCarac = await getCarac(hasBonus, '0', '0', C3, C4);

    if (attrsCarac.C3) {
      const C3Value = attrsCarac.C3Base;
      const C3OD = attrsCarac.C3OD;

      cBonus.push(attrsCarac.C3Nom);
      cRoll.push(C3Value);

      OD += C3OD;
    }

    if (attrsCarac.C4) {
      const C4Value = attrsCarac.C4Base;
      const C4OD = attrsCarac.C4OD;

      cBonus.push(attrsCarac.C4Nom);
      cRoll.push(C4Value);

      OD += C4OD;
    }

    exec.push(`{{vOD=${OD}}}`);

    if (mod !== 0) {
      cRoll.push(mod);
      exec.push(`{{mod=${mod}}}`);
    }

    // GESTION DU STYLE
    let getStyle;

    if (type === '&{template:combat} {{portee=^{portee-contact}}}') {
      getStyle = getStyleContactMod(attrs, '', baseDegats, baseViolence, true, 0, false, false, false, false, false, false, false, false, false);
    } else {
      getStyle = getStyleDistanceMod(attrs, baseDegats, baseViolence, 0, 0, true, 0, false, false, false, false);
    }

    exec = exec.concat(getStyle.exec);
    cRoll = cRoll.concat(getStyle.cRoll);
    diceDegats += getStyle.diceDegats;
    diceViolence += getStyle.diceViolence;

    // FIN GESTION DU STYLE

    if (wraith !== '0') {
      cRoll.push(+attrs.discretion);
      cBonus.push(+attrs[ODValue.discretion]);
      bDegats.push(+attrs.discretion);
      bDegats.push(+attrs[ODValue.discretion]);
      exec.push(`{{vWraithA=${+attrs.discretion}D6+${+attrs[ODValue.discretion]}}} {{vWraithD=[[${+attrs.discretion}+${+attrs[ODValue.discretion]}]]}}`);
    }

    if (cRoll.length === 0) { cRoll.push(0); }

    if (bonus.length === 0) { bonus.push(0); }

    bonus.push(OD);

    degats.push(`${diceDegats}D6`);
    degats = degats.concat(bDegats);

    violence.push(`${diceViolence}D6`);
    violence = violence.concat(bViolence);

    if (cBase.length !== 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

    if (cBonus.length !== 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

    cRoll.push(Number(attrs.mechaArmurePuissance));
    exec.push(`{{vPuissance=+${Number(attrs.mechaArmurePuissance)}D}}`);

    const jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

    exec.push(jet);
    exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);
    exec.push(`{{bonus=[[${bonus.join('+')}]]}}`);

    exec.push(`{{degats=[[${degats.join('+')}]]}}`);
    exec.push(`{{violence=[[${violence.join('+')}]]}}`);

    autresEffets.push(i18n_antiVehicule);
    autresEffets.push(`${i18n_dispersion} 9 (sur les ennemis de taille < 6m)`);

    if (attaquesSurprises.length > 0) {
      exec.push(`{{attaqueSurprise=${attaquesSurprises.join('\n+')}}}`);
      exec.push(`{{attaqueSurpriseValue=[[${attaquesSurprisesValue.join('+')}]]}}`);
      exec.push(attaquesSurprisesCondition);

      isSurprise = true;
    }

    if (devaste || bourreau || equilibre) {
      const herauts = [];

      if (devaste) { herauts.push(i18n_devasterAnatheme); }
      if (bourreau) { herauts.push(i18n_bourreauTenebres); }
      if (equilibre) { herauts.push(i18n_equilibrerBalance); }

      exec.push(`{{herauts=${herauts.join(' / ')}}}`);
    }

    if (autresEffets.length > 0) {
      autresEffets.sort();
      exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
    }

    if (isConditionnelD) { exec.push('{{degatsConditionnel=true}}'); }

    const finalRoll = await startRoll(exec.join(' '));

    const tJet = finalRoll.results.jet.result;

    const tBonus = finalRoll.results.bonus.result;
    const tExploit = finalRoll.results.Exploit.result;
    const rDegats = finalRoll.results.degats.dice;

    const rViolence = finalRoll.results.violence.dice;

    const tDegats = finalRoll.results.degats.result;
    const tViolence = finalRoll.results.violence.result;

    const conditions = {
      bourreau,
      devaste,
      equilibre,
      isSurprise,
    };

    const computed = updateRoll(finalRoll, tDegats, rDegats, bDegats, tViolence, rViolence, bViolence, conditions);

    const finalComputed = {
      jet: tJet + tBonus,
    };

    Object.assign(finalComputed, computed);

    finishRoll(finalRoll.rollId, finalComputed);

    if (tJet !== 0 && tJet === tExploit) {
      const exploitRoll = await startRoll(`@{jetGM} &{template:mechaArmure} {{special1=@{mechaArmureNom}}} {{special1B=${i18n_exploit}}}${jet}`);
      const tRExploit = exploitRoll.results.jet.result;
      const exploitComputed = {
        jet: tRExploit,
      };

      finishRoll(exploitRoll.rollId, exploitComputed);
    }
  });
}

const rollArchangel = ['MAAGOffering', 'MAAGCurse', 'MAARMiracle', 'MAACanonNoe'];

rollArchangel.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value.split(';');

    const exec = [];

    const base = roll[0];

    let noyaux;
    let armure;
    let blindage;
    let sante;
    let duree;
    let resilience;
    let choc;

    exec.push(base);

    let attrs = [];

    switch (button) {
      case 'MAAGOffering':
        attrs = await getAttrsAsync([roll[1]]);

        noyaux = +attrs[roll[1]];
        degats = roll[2];
        duree = roll[3];

        exec.push(`{{jDivers=^{duree-en-tours}}} {{jDiversV=[[${duree}]]}} {{jDivers3F12=^{si-bonus-degats-violence}}} {{jDiver3F12V=[[${degats}]]}}`);

        if (noyaux >= 2) { exec.push(`{{jDivers2=^{noyaux-depenses}}} {{jDivers2V=${noyaux}}}`); } else { exec.push(`{{jDivers2=^{noyau-depense}}} {{jDivers2V=${noyaux}}}`); }
        break;

      case 'MAAGCurse':
        attrs = await getAttrsAsync([roll[1]]);

        noyaux = +attrs[roll[1]];
        degats = roll[2];
        resilience = roll[3];
        choc = roll[4];

        exec.push(`{{jDivers3F12=^{si-malus-degats-violence}}} {{jDiver3F12V=[[${degats}]]}} {{jDivers4F12=^{si-baisse-resilience}}} {{jDiver4F12V=[[${resilience}]] / 3}}  {{jDivers5F12=^{si-choc}}} {{jDiver5F12V=[[${choc}]]}}`);

        if (noyaux >= 2) { exec.push(`{{jDivers2=^{noyaux-depenses}}} {{jDivers2V=${noyaux}}}`); } else { exec.push(`{{jDivers2=^{noyau-depense}}} {{jDivers2V=${noyaux}}}`); }
        break;

      case 'MAARMiracle':
        attrs = await getAttrsAsync([
          roll[1],
          roll[2],
          roll[3],
          roll[4],
        ]);

        sante = attrs[roll[1]];
        armure = attrs[roll[2]];
        blindage = attrs[roll[3]];
        resilience = attrs[roll[4]];
        duree = roll[5];

        exec.push(`{{jDivers=^{duree-en-tours}}} {{jDiversV=[[${duree}]]}} {{jDivers2F12=^{armure}}} {{jDivers2F12V=[[${armure}]]}} {{jDivers3F12=^{sante}}} {{jDiver3F12V=[[${sante}]]}} {{jDivers4F12=^{blindage}}} {{jDiver4F12V=[[${blindage}]]}} {{jDivers5F12=^{resilience}}} {{jDiver5F12V=${resilience}}}`);

        log(exec);
        break;

      case 'MAACanonNoe':
        attrs = await getAttrsAsync([
          roll[1],
          roll[2],
          roll[3],
        ]);

        armure = attrs[roll[1]];
        blindage = attrs[roll[2]];
        resilience = attrs[roll[3]];

        exec.push(`{{jDivers=^{armure}}} {{jDiversV=${armure}}} {{jDivers2=^{blindage}}} {{jDivers2V=${blindage}}} {{jDivers3=^{resilience}}} {{jDivers3V=[[${resilience}]]}}`);
        break;
      default:
        armure = 0;
        blindage = 0;
        resilience = 0;
        break;
    }

    startRoll(exec.join(' '), (results) => {
      finishRoll(
        results.rollId, {},
      );
    });
  });
});

const rollCombatArchangel = ['MAACanonMetatron'];

rollCombatArchangel.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value.split(';');

    let exec = [];
    let listAttrs = [];
    let attrs = [];
    let attrsCarac = [];

    const base = roll[0];

    let mod;
    let C1;
    let C2;
    let C3;
    let C4;

    let bCarac;

    let jet;
    let cRoll = [];
    const rollBonus = [];
    const cBase = [];
    const cBonus = [];
    let cOD = 0;

    let degats;
    let bDegats;
    let violence;
    let bViolence;

    let getStyle;
    let autresEffets = [];

    exec.push(base);

    switch (button) {
      case 'MAACanonMetatron':
        listAttrs = [
          'mechaArmurePuissance',
          'bonusCarac',
          'jetModifDes',
          'canonMetatronCaracteristique1',
          'canonMetatronCaracteristique2',
          'canonMetatronCaracteristique3',
          'canonMetatronCaracteristique4',
          roll[1],
          roll[2],
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
        ];

        listAttrs = listAttrs.concat(listStyle);

        attrs = await getAttrsAsync(listAttrs);

        bCarac = attrs.bonusCarac;
        mod = +attrs.jetModifDes;

        C1 = attrs.canonMetatronCaracteristique1;
        C2 = attrs.canonMetatronCaracteristique2;
        C3 = attrs.canonMetatronCaracteristique3;
        C4 = attrs.canonMetatronCaracteristique4;

        attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

        if (attrsCarac.C1) {
          const C1Value = attrsCarac.C1Base;
          const C1OD = attrsCarac.C1OD;

          cBase.push(attrsCarac.C1Nom);
          cRoll.push(C1Value);
          cOD += C1OD;
        }

        if (attrsCarac.C2) {
          const C2Value = attrsCarac.C2Base;
          const C2OD = attrsCarac.C2OD;

          cBase.push(attrsCarac.C2Nom);
          cRoll.push(C2Value);
          cOD += C2OD;
        }

        if (attrsCarac.C3) {
          const C3Value = attrsCarac.C3Base;
          const C3OD = attrsCarac.C3OD;

          cBonus.push(attrsCarac.C3Nom);
          cRoll.push(C3Value);
          cOD += C3OD;
        }

        if (attrsCarac.C4) {
          const C4Value = attrsCarac.C4Base;
          const C4OD = attrsCarac.C4OD;

          cBonus.push(attrsCarac.C4Nom);
          cRoll.push(C4Value);
          cOD += C4OD;
        }

        degats = Number(attrs[roll[1]].split('D')[0]);
        bDegats = Number(attrs[roll[1]].split('D')[1].split('+')[1]) || 0;

        violence = Number(attrs[roll[2]].split('D')[0]);
        bViolence = Number(attrs[roll[2]].split('D')[1].split('+')[1]) || 0;

        if (cBase.length > 0) { exec.push(cBase.join(' - ')); }

        if (cBonus.length > 0) { exec.push(cBonus.join(' - ')); }

        getStyle = getStyleDistanceMod(attrs, degats, violence, '', '', true, 0, false, false, false, false);

        exec = exec.concat(getStyle.exec);
        cRoll = cRoll.concat(getStyle.cRoll);
        cRoll.push(Number(attrs.mechaArmurePuissance));
        exec.push(`{{vPuissance=+${Number(attrs.mechaArmurePuissance)}D}}`);

        rollBonus.push(cOD);

        degats += getStyle.diceDegats;
        violence += getStyle.diceViolence;

        if (mod !== 0) {
          cRoll.push(mod);
          exec.push(`{{mod=${mod}}}`);
        }

        jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

        exec.push(jet);
        exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

        if (rollBonus.length === 0) { rollBonus.push(0); }

        exec.push(`{{vOD=${cOD}}}`);
        exec.push(`{{bonus=[[${rollBonus.join('+')}]]}}`);

        exec.push(`{{degats=[[${degats}D6+${bDegats}]]}}`);
        exec.push(`{{violence=[[${violence}D6+${bViolence}]]}}`);

        if (cBase.length > 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

        if (cBonus.length > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

        exec.push(`{{succesConditionnel=true}} {{parasitage=${i18n_parasitage} 2}} {{parasitageCondition=${i18n_parasitageCondition}}}`);

        autresEffets = [
          i18n_antiVehicule,
          i18n_briserResilience,
          `${i18n_degatsContinus} 10 ([[1d6]] ${i18n_tours})`,
        ];

        autresEffets.sort();

        exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
        break;
    }

    const devaste = +attrs.devasterAnatheme;
    const bourreau = +attrs.bourreauTenebres;
    const equilibre = +attrs.equilibreBalance;

    if (devaste || bourreau || equilibre) {
      const herauts = [];

      if (devaste) { herauts.push(i18n_devasterAnatheme); }
      if (bourreau) { herauts.push(i18n_bourreauTenebres); }
      if (equilibre) { herauts.push(i18n_equilibrerBalance); }

      exec.push(`{{herauts=${herauts.join(' / ')}}}`);
    }

    const finalRoll = await startRoll(exec.join(' '));

    const tJet = finalRoll.results.jet.result;

    const tBonus = finalRoll.results.bonus.result;
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

    const computed = updateRoll(finalRoll, tDegats, rDegats, [bDegats], tViolence, rViolence, [bViolence], conditions);

    const finalComputed = {
      jet: tJet + tBonus,
    };

    Object.assign(finalComputed, computed);

    finishRoll(finalRoll.rollId, finalComputed);

    if (tJet !== 0 && tJet === tExploit) {
      const exploitRoll = await startRoll(`${roll}@{jetGM} &{template:mechaArmure} {{special1=@{mechaArmureNom}}} {{special1B=${i18n_exploit}}}${jet}`);
      const tRExploit = exploitRoll.results.jet.result;
      const exploitComputed = {
        jet: tRExploit,
      };

      finishRoll(exploitRoll.rollId, exploitComputed);
    }
  });
});

const rollNephilim = ['MANOGInvulnerabilite', 'MANOGStationDebordement', 'MANOGStationMissile', 'MANOGStationRoquette', 'MANMJ'];

rollNephilim.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value.split(';');

    const exec = [];
    let attrs = [];

    const base = roll[0];

    let duree;
    let tours;
    let degats;
    let violence;

    let devaste = false;
    let bourreau = false;
    let equilibre = false;

    let isMeurtrier = false;
    let isFureur = false;

    const effets = [];

    exec.push(base);

    switch (button) {
      case 'MANOGInvulnerabilite':
        attrs = await getAttrsAsync([roll[1]]);

        duree = attrs[roll[1]];

        exec.push(`{{jDivers=^{duree-en-tours}}} {{jDiversV=[[${duree}]]}}`);
        break;

      case 'MANOGStationDebordement':
        attrs = await getAttrsAsync([roll[1]]);

        tours = attrs[roll[1]];

        exec.push(`{{jDivers=^{debordement}}} {{jDiversV=[[${tours}*10]]}}`);
        break;

      case 'MANOGStationMissile':
        attrs = await getAttrsAsync([
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
        ]);

        devaste = +attrs.devasterAnatheme;
        bourreau = +attrs.bourreauTenebres;
        equilibre = +attrs.equilibreBalance;

        degats = roll[1];
        violence = roll[2];

        effets.push(i18n_antiVehicule);
        effets.push(i18n_artillerie);
        effets.sort();

        exec.push(`{{degats=[[${degats}]]}} {{violence=[[${violence}]]}} {{effets=${effets.join(' / ')}}}`);
        break;

      case 'MANOGStationRoquette':
        attrs = await getAttrsAsync([
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
        ]);

        degats = roll[1];
        violence = roll[2];

        devaste = +attrs.devasterAnatheme;
        bourreau = +attrs.bourreauTenebres;
        equilibre = +attrs.equilibreBalance;

        exec.push(`{{degats=[[${degats}]]}} {{violence=[[${violence}]]}}`);
        break;

      case 'MANMJ':
        attrs = await getAttrsAsync([
          roll[1],
          roll[2],
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
        ]);

        degats = attrs[roll[1]];
        violence = attrs[roll[2]];

        effets.push(i18n_antiVehicule);
        effets.push(i18n_demoralisant);
        effets.push(i18n_briserResilience);
        effets.sort();

        isMeurtrier = true;
        isFureur = true;

        exec.push(`{{degats=[[${degats}]]}} {{degatsConditionnel=true}} {{meurtrier=${i18n_meurtrier}}} {{meurtrierValue=[[2D6]]}} {{meurtrierCondition=${i18n_meurtrierCondition}}} {{violence=[[${violence}]]}} {{violenceConditionnel=true}} {{fureur=${i18n_fureur}}} {{fureurValue=[[2D6]]}} {{fureurCondition=${i18n_fureurCondition}}} {{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}} {{effets=${effets.join(' / ')}}}`);
        break;
    }

    if (devaste || bourreau || equilibre) {
      const herauts = [];

      if (devaste) { herauts.push(i18n_devasterAnatheme); }
      if (bourreau) { herauts.push(i18n_bourreauTenebres); }
      if (equilibre) { herauts.push(i18n_equilibrerBalance); }

      exec.push(`{{herauts=${herauts.join(' / ')}}}`);
    }

    const finalRoll = await startRoll(exec.join(' '));

    let computed = {};

    if (button === 'MANOGStationMissile' || button === 'MANOGStationRoquette' || button === 'MANMJ') {
      const rDegats = finalRoll.results.degats.dice;
      const rViolence = finalRoll.results.violence.dice;

      const tDegats = finalRoll.results.degats.result;
      const tViolence = finalRoll.results.violence.result;

      const conditions = {
        bourreau,
        devaste,
        equilibre,
        isFureur,
        isMeurtrier,
      };

      computed = updateRoll(finalRoll, tDegats, rDegats, [], tViolence, rViolence, [], conditions);
    }

    finishRoll(finalRoll.rollId, computed);
  });
});

const rollCombatNephilim = ['MANCanonMagma', 'MANMSurtur'];

rollCombatNephilim.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value.split(';');

    let exec = [];
    let listAttrs = [];
    let attrs = [];
    let attrsCarac = [];

    const base = roll[0];

    let mod;
    let C1;
    let C2;
    let C3;
    let C4;

    let bCarac;

    let jet;
    let cRoll = [];
    const rollBonus = [];
    const cBase = [];
    const cBonus = [];
    let cOD = 0;

    let degats;
    let bDegats;
    let violence;
    let bViolence;
    let isFureur = false;
    let isUltraviolence = false;

    let getStyle;

    let autresEffets;

    exec.push(base);

    switch (button) {
      case 'MANCanonMagma':
        listAttrs = [
          roll[1],
          roll[2],
          'mechaArmurePuissance',
          'bonusCarac',
          'jetModifDes',
          'canonMagmaCaracteristique1',
          'canonMagmaCaracteristique2',
          'canonMagmaCaracteristique3',
          'canonMagmaCaracteristique4',
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
        ];

        listAttrs = listAttrs.concat(listStyle);

        attrs = await getAttrsAsync(listAttrs);

        bCarac = attrs.bonusCarac;
        mod = +attrs.jetModifDes;

        isFureur = true;

        C1 = attrs.canonMagmaCaracteristique1;
        C2 = attrs.canonMagmaCaracteristique2;
        C3 = attrs.canonMagmaCaracteristique3;
        C4 = attrs.canonMagmaCaracteristique4;

        attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

        if (attrsCarac.C1) {
          const C1Value = attrsCarac.C1Base;
          const C1OD = attrsCarac.C1OD;

          cBase.push(attrsCarac.C1Nom);
          cRoll.push(C1Value);
          cOD += C1OD;
        }

        if (attrsCarac.C2) {
          const C2Value = attrsCarac.C2Base;
          const C2OD = attrsCarac.C2OD;

          cBase.push(attrsCarac.C2Nom);
          cRoll.push(C2Value);
          cOD += C2OD;
        }

        if (attrsCarac.C3) {
          const C3Value = attrsCarac.C3Base;
          const C3OD = attrsCarac.C3OD;

          cBonus.push(attrsCarac.C3Nom);
          cRoll.push(C3Value);
          cOD += C3OD;
        }

        if (attrsCarac.C4) {
          const C4Value = attrsCarac.C4Base;
          const C4OD = attrsCarac.C4OD;

          cBonus.push(attrsCarac.C4Nom);
          cRoll.push(C4Value);
          cOD += C4OD;
        }

        degats = Number(attrs[roll[1]].split('D')[0]);
        bDegats = Number(attrs[roll[1]].split('D')[1].split('+')[1]) || 0;

        violence = Number(attrs[roll[2]].split('D')[0]);
        bViolence = Number(attrs[roll[2]].split('D')[1].split('+')[1]) || 0;

        getStyle = getStyleDistanceMod(attrs, degats, violence, '', '', true, 0, false, false, false, false);

        exec = exec.concat(getStyle.exec);
        cRoll = cRoll.concat(getStyle.cRoll);
        cRoll.push(Number(attrs.mechaArmurePuissance));
        exec.push(`{{vPuissance=+${Number(attrs.mechaArmurePuissance)}D}}`);

        rollBonus.push(cOD);

        degats += getStyle.diceDegats;
        violence += getStyle.diceViolence;

        jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

        exec.push(jet);
        exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

        if (rollBonus.length === 0) { rollBonus.push(0); }

        exec.push(`{{vOD=${cOD}}}`);
        exec.push(`{{bonus=[[${rollBonus.join('+')}]]}}`);

        exec.push(`{{degats=[[${degats}D6+${bDegats}]]}}`);
        exec.push(`{{violence=[[${violence}D6+${bViolence}]]}}`);

        if (cBase.length > 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

        if (cBonus.length > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

        exec.push(`{{degatsConditionnel=true}} {{violenceConditionnel=true}} {{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}} {{fureur=${i18n_fureur}}} {{fureurValue=[[2D6]]}} {{fureurCondition=${i18n_fureurCondition}}}`);

        autresEffets = [
          `${i18n_dispersion} 12`,
          i18n_briserResilience,
          i18n_antiVehicule,
        ];

        autresEffets.sort();

        exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
        break;

      case 'MANMSurtur':
        listAttrs = [
          roll[1],
          roll[2],
          'mechaArmurePuissance',
          'bonusCarac',
          'jetModifDes',
          'MSurturCaracteristique1',
          'MSurturCaracteristique2',
          'MSurturCaracteristique3',
          'MSurturCaracteristique4',
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
        ];

        listAttrs = listAttrs.concat(listStyle);

        attrs = await getAttrsAsync(listAttrs);

        isUltraviolence = true;

        bCarac = attrs.bonusCarac;
        mod = +attrs.jetModifDes;

        C1 = attrs.MSurturCaracteristique1;
        C2 = attrs.MSurturCaracteristique2;
        C3 = attrs.MSurturCaracteristique3;
        C4 = attrs.MSurturCaracteristique4;

        attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

        if (attrsCarac.C1) {
          const C1Value = attrsCarac.C1Base;
          const C1OD = attrsCarac.C1OD;

          cBase.push(attrsCarac.C1Nom);
          cRoll.push(C1Value);
          cOD += C1OD;
        }

        if (attrsCarac.C2) {
          const C2Value = attrsCarac.C2Base;
          const C2OD = attrsCarac.C2OD;

          cBase.push(attrsCarac.C2Nom);
          cRoll.push(C2Value);
          cOD += C2OD;
        }

        if (attrsCarac.C3) {
          const C3Value = attrsCarac.C3Base;
          const C3OD = attrsCarac.C3OD;

          cBonus.push(attrsCarac.C3Nom);
          cRoll.push(C3Value);
          cOD += C3OD;
        }

        if (attrsCarac.C4) {
          const C4Value = attrsCarac.C4Base;
          const C4OD = attrsCarac.C4OD;

          cBonus.push(attrsCarac.C4Nom);
          cRoll.push(C4Value);
          cOD += C4OD;
        }

        degats = Number(attrs[roll[1]].split('D')[0]);
        bDegats = Number(attrs[roll[1]].split('D')[1].split('+')[1]) || 0;

        violence = Number(attrs[roll[2]].split('D')[0]);
        bViolence = Number(attrs[roll[2]].split('D')[1].split('+')[1]) || 0;

        getStyle = getStyleDistanceMod(attrs, degats, violence, '', '', true, 0, false, false, false, false);

        exec = exec.concat(getStyle.exec);
        cRoll = cRoll.concat(getStyle.cRoll);
        cRoll.push(Number(attrs.mechaArmurePuissance));
        exec.push(`{{vPuissance=+${Number(attrs.mechaArmurePuissance)}D}}`);

        rollBonus.push(cOD);

        degats += getStyle.diceDegats;
        violence += getStyle.diceViolence;

        if (mod !== 0) {
          cRoll.push(mod);
          exec.push(`{{mod=${mod}}}`);
        }

        jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

        exec.push(jet);
        exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

        if (rollBonus.length === 0) { rollBonus.push(0); }

        exec.push(`{{vOD=${cOD}}}`);
        exec.push(`{{bonus=[[${rollBonus.join('+')}]]}}`);

        exec.push(`{{degats=[[${degats}D6+${bDegats}]]}}`);
        exec.push(`{{violence=[[${violence}D6+${bViolence}]]}}`);

        if (cBase.length > 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

        if (cBonus.length > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

        exec.push(`{{violenceConditionnel=true}} {{ultraviolence=${i18n_ultraviolence}}} {{ultraViolenceValue=[[2D6]]}} {{ultraviolenceCondition=${i18n_ultraviolenceCondition}}}`);

        autresEffets = [
          i18n_demoralisant,
          i18n_antiVehicule,
        ];

        autresEffets.sort();

        exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
        break;
    }

    const devaste = +attrs.devasterAnatheme;
    const bourreau = +attrs.bourreauTenebres;
    const equilibre = +attrs.equilibreBalance;

    if (devaste || bourreau || equilibre) {
      const herauts = [];

      if (devaste) { herauts.push(i18n_devasterAnatheme); }
      if (bourreau) { herauts.push(i18n_bourreauTenebres); }
      if (equilibre) { herauts.push(i18n_equilibrerBalance); }

      exec.push(`{{herauts=${herauts.join(' / ')}}}`);
    }

    const finalRoll = await startRoll(exec.join(' '));

    const tJet = finalRoll.results.jet.result;

    const tBonus = finalRoll.results.bonus.result;
    const tExploit = finalRoll.results.Exploit.result;

    const rDegats = finalRoll.results.degats.dice;
    const rViolence = finalRoll.results.violence.dice;

    const tDegats = finalRoll.results.degats.result;
    const tViolence = finalRoll.results.violence.result;

    const conditions = {
      bourreau,
      devaste,
      equilibre,
      isFureur,
      isUltraviolence,
    };

    const computed = updateRoll(finalRoll, tDegats, rDegats, [bDegats], tViolence, rViolence, [bViolence], conditions);

    const finalComputed = {
      jet: tJet + tBonus,
    };

    Object.assign(finalComputed, computed);

    finishRoll(finalRoll.rollId, finalComputed);

    if (tJet !== 0 && tJet === tExploit) {
      const exploitRoll = await startRoll(`${roll}@{jetGM} &{template:mechaArmure} {{special1=@{mechaArmureNom}}} {{special1B=${i18n_exploit}}}${jet}`);
      const tRExploit = exploitRoll.results.jet.result;
      const exploitComputed = {
        jet: tRExploit,
      };

      finishRoll(exploitRoll.rollId, exploitComputed);
    }
  });
});

const rollDemon = ['MAAMI', 'MAATLA'];

rollDemon.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value.split(';');

    const exec = [];
    let attrs = [];

    const base = roll[0];

    let wraith;

    let degats;
    let violence;
    let bDegats = 0;
    let bViolence = 0;

    exec.push(base);

    switch (button) {
      case 'MAAMI':

        attrs = await getAttrsAsync([
          roll[1],
          roll[2],
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
          'MADDjinnWraithActive',
          'discretion',
          `${ODValue.discretion}`,
        ]);

        wraith = attrs.MADDjinnWraithActive;

        degats = attrs[roll[1]];
        violence = attrs[roll[2]];

        bDegats = +degats.split('+')[1];
        bViolence = +violence.split('+')[1];

        if (wraith !== '0') {
          degats += `+${+attrs.discretion + +attrs[ODValue.discretion]}`;
          bDegats += +attrs.discretion + +attrs[ODValue.discretion];
          exec.push(`{{vWraithD=[[${+attrs.discretion}+${+attrs[ODValue.discretion]}]]}}`);
        }

        exec.push(`{{degats=[[${degats}]]}} {{violence=[[${violence}]]}} {{effets=^{CDF-desactive-pendant} [[1D3]] ^{tours}}}`);
        break;

      case 'MAATLA':
        attrs = await getAttrsAsync([
          roll[1],
          roll[2],
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
          'MADDjinnWraithActive',
          'discretion',
          `${ODValue.discretion}`,
        ]);

        wraith = attrs.MADDjinnWraithActive;

        degats = attrs[roll[1]];
        violence = attrs[roll[2]];

        if (wraith !== '0') {
          degats += `+${+attrs.discretion + +attrs[ODValue.discretion]}`;
          bDegats += +attrs.discretion + +attrs[ODValue.discretion];
          exec.push(`{{vWraithD=[[${+attrs.discretion}+${+attrs[ODValue.discretion]}]]}}`);
        }

        exec.push(`{{degats=[[${degats}]]}} {{violence=[[${violence}]]}} {{degatsConditionnel=true}} {{violenceConditionnel=true}} {{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}} {{effets=${i18n_antiVehicule}}}`);
        break;
    }

    if (wraith !== '0') {
      exec.push('{{special2=^{module-wraith} ^{active}}}');
    }

    const devaste = +attrs.devasterAnatheme;
    const bourreau = +attrs.bourreauTenebres;
    const equilibre = +attrs.equilibreBalance;

    if (devaste || bourreau || equilibre) {
      const herauts = [];

      if (devaste) { herauts.push(i18n_devasterAnatheme); }
      if (bourreau) { herauts.push(i18n_bourreauTenebres); }
      if (equilibre) { herauts.push(i18n_equilibrerBalance); }

      exec.push(`{{herauts=${herauts.join(' / ')}}}`);
    }

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

    const computed = updateRoll(finalRoll, tDegats, rDegats, [bDegats], tViolence, rViolence, [bViolence], conditions);

    finishRoll(finalRoll.rollId, computed);
  });
});

const rollCombatDemon = ['MADSouffle', 'MADjinnWraith', 'MADPSoniques', 'MADLCG'];

rollCombatDemon.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value.split(';');

    let exec = [];

    const base = roll[0];

    let mod;
    let C1;
    let C2;
    let C3;
    let C4;

    let bCarac;

    let listAttrs = [];
    let attrs = [];
    let attrsCarac = [];

    let jet;
    let cRoll = [];
    const rollBonus = [];
    const cBase = [];
    const cBonus = [];
    let cOD = 0;

    let wraith;

    let degats;
    let bDegats;
    let violence;
    let bViolence;

    let getStyle;

    let autresEffets;

    exec.push(base);

    switch (button) {
      case 'MADSouffle':
        listAttrs = [
          'bonusCarac',
          'jetModifDes',
          'mechaArmurePuissance',
          'DSouffleCaracteristique1',
          'DSouffleCaracteristique2',
          'DSouffleCaracteristique3',
          'DSouffleCaracteristique4',
          roll[1],
          roll[2],
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
          'MADDjinnWraithActive',
          'discretion',
          `${ODValue.discretion}`,
        ];

        listAttrs = listAttrs.concat(listStyle);

        attrs = await getAttrsAsync(listAttrs);

        wraith = attrs.MADDjinnWraithActive;

        bCarac = attrs.bonusCarac;
        mod = +attrs.jetModifDes;

        C1 = attrs.DSouffleCaracteristique1;
        C2 = attrs.DSouffleCaracteristique2;
        C3 = attrs.DSouffleCaracteristique3;
        C4 = attrs.DSouffleCaracteristique4;

        attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

        if (attrsCarac.C1) {
          const C1Value = attrsCarac.C1Base;
          const C1OD = attrsCarac.C1OD;

          cBase.push(attrsCarac.C1Nom);
          cRoll.push(C1Value);
          cOD += C1OD;
        }

        if (attrsCarac.C2) {
          const C2Value = attrsCarac.C2Base;
          const C2OD = attrsCarac.C2OD;

          cBase.push(attrsCarac.C2Nom);
          cRoll.push(C2Value);
          cOD += C2OD;
        }

        if (attrsCarac.C3) {
          const C3Value = attrsCarac.C3Base;
          const C3OD = attrsCarac.C3OD;

          cBonus.push(attrsCarac.C3Nom);
          cRoll.push(C3Value);
          cOD += C3OD;
        }

        if (attrsCarac.C4) {
          const C4Value = attrsCarac.C4Base;
          const C4OD = attrsCarac.C4OD;

          cBonus.push(attrsCarac.C4Nom);
          cRoll.push(C4Value);
          cOD += C4OD;
        }

        degats = Number(attrs[roll[1]].split('D')[0]);
        bDegats = Number(attrs[roll[1]].split('D')[1].split('+')[1]) || 0;

        violence = Number(attrs[roll[2]]);
        bViolence = 0;

        getStyle = getStyleDistanceMod(attrs, degats, violence, '', '', true, 0, false, false, false, false);

        exec = exec.concat(getStyle.exec);
        cRoll = cRoll.concat(getStyle.cRoll);
        cRoll.push(Number(attrs.mechaArmurePuissance));
        exec.push(`{{vPuissance=+${Number(attrs.mechaArmurePuissance)}D}}`);

        rollBonus.push(cOD);

        degats += getStyle.diceDegats;
        violence += getStyle.diceViolence;

        if (wraith !== '0') {
          cRoll.push(+attrs.discretion);
          rollBonus.push(+attrs[ODValue.discretion]);

          bDegats += +attrs.discretion + +attrs[ODValue.discretion];
          exec.push(`{{vWraithA=${+attrs.discretion}D6+${+attrs[ODValue.discretion]}}} {{vWraithD=[[${+attrs.discretion}+${+attrs[ODValue.discretion]}]]}}`);
        }

        jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

        exec.push(jet);
        exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

        if (rollBonus.length === 0) { rollBonus.push(0); }

        exec.push(`{{vOD=${cOD}}}`);
        exec.push(`{{bonus=[[${rollBonus.join('+')}]]}}`);

        exec.push(`{{degats=[[${degats}D6+${bDegats}]]}}`);
        exec.push(`{{violence=[[${violence}D6+${bViolence}]]}}`);

        if (cBase.length > 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

        if (cBonus.length > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

        autresEffets = [
          `${i18n_parasitage} 2`,
          i18n_briserResilience,
          i18n_antiVehicule,
        ];

        autresEffets.sort();

        exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
        break;

      case 'MADjinnWraith':
        listAttrs = [
          'jetModifDes',
          'bonusCarac',
          'mechaArmureManoeuvrabilite',
          'MADDjinnWraithActive',
          'caracteristiqueWraith2',
          'caracteristiqueWraith3',
          'caracteristiqueWraith4',
          roll[1],
          roll[2],
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
        ];

        attrs = await getAttrsAsync(listAttrs);

        wraith = attrs.MADDjinnWraithActive;

        bCarac = attrs.bonusCarac;
        mod = +attrs.jetModifDes;

        C1 = '@{discretion}';
        C2 = attrs.caracteristiqueWraith2;
        C3 = attrs.caracteristiqueWraith3;
        C4 = attrs.caracteristiqueWraith4;

        attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

        if (attrsCarac.C1) {
          const C1Value = attrsCarac.C1Base;
          const C1OD = attrsCarac.C1OD;

          cBase.push(attrsCarac.C1Nom);
          cRoll.push(C1Value);
          cOD += C1OD;
        }

        if (attrsCarac.C2) {
          const C2Value = attrsCarac.C2Base;
          const C2OD = attrsCarac.C2OD;

          cBase.push(attrsCarac.C2Nom);
          cRoll.push(C2Value);
          cOD += C2OD;
        }

        if (attrsCarac.C3) {
          const C3Value = attrsCarac.C3Base;
          const C3OD = attrsCarac.C3OD;

          cBonus.push(attrsCarac.C3Nom);
          cRoll.push(C3Value);
          cOD += C3OD;
        }

        if (attrsCarac.C4) {
          const C4Value = attrsCarac.C4Base;
          const C4OD = attrsCarac.C4OD;

          cBonus.push(attrsCarac.C4Nom);
          cRoll.push(C4Value);
          cOD += C4OD;
        }

        cRoll.push(Number(attrs.mechaArmureManoeuvrabilite));
        exec.push(`{{vManoeuvrabilite=+${Number(attrs.mechaArmureManoeuvrabilite)}D}}`);

        rollBonus.push(cOD);

        jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

        exec.push(jet);
        exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

        if (rollBonus.length === 0) { rollBonus.push(0); }

        exec.push(`{{vOD=${cOD}}}`);
        exec.push(`{{bonus=[[${rollBonus.join('+')}]]}}`);

        if (cBase.length > 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

        if (cBonus.length > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }
        break;

      case 'MADPSoniques':
        listAttrs = [
          'jetModifDes',
          'bonusCarac',
          'mechaArmurePuissance',
          'APoingsCaracteristique1',
          'APoingsCaracteristique2',
          'APoingsCaracteristique3',
          'APoingsCaracteristique4',
          roll[1],
          roll[2],
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
          'MADDjinnWraithActive',
          'discretion',
          `${ODValue.discretion}`,
        ];

        listAttrs = listAttrs.concat(listStyle);

        attrs = await getAttrsAsync(listAttrs);

        wraith = attrs.MADDjinnWraithActive;

        bCarac = attrs.bonusCarac;
        mod = +attrs.jetModifDes;

        C1 = attrs.APoingsCaracteristique1;
        C2 = attrs.APoingsCaracteristique2;
        C3 = attrs.APoingsCaracteristique3;
        C4 = attrs.APoingsCaracteristique4;

        attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

        if (attrsCarac.C1) {
          const C1Value = attrsCarac.C1Base;
          const C1OD = attrsCarac.C1OD;

          cBase.push(attrsCarac.C1Nom);
          cRoll.push(C1Value);
          cOD += C1OD;
        }

        if (attrsCarac.C2) {
          const C2Value = attrsCarac.C2Base;
          const C2OD = attrsCarac.C2OD;

          cBase.push(attrsCarac.C2Nom);
          cRoll.push(C2Value);
          cOD += C2OD;
        }

        if (attrsCarac.C3) {
          const C3Value = attrsCarac.C3Base;
          const C3OD = attrsCarac.C3OD;

          cBonus.push(attrsCarac.C3Nom);
          cRoll.push(C3Value);
          cOD += C3OD;
        }

        if (attrsCarac.C4) {
          const C4Value = attrsCarac.C4Base;
          const C4OD = attrsCarac.C4OD;

          cBonus.push(attrsCarac.C4Nom);
          cRoll.push(C4Value);
          cOD += C4OD;
        }

        degats = Number(attrs[roll[1]].split('D')[0]);
        bDegats = Number(attrs[roll[1]].split('D')[1].split('+')[1]) || 0;

        violence = Number(attrs[roll[2]].split('D')[0]);
        bViolence = Number(attrs[roll[2]].split('D')[1].split('+')[1]) || 0;

        getStyle = getStyleDistanceMod(attrs, degats, violence, '', '', true, 0, false, false, false, false);

        exec = exec.concat(getStyle.exec);
        cRoll = cRoll.concat(getStyle.cRoll);
        cRoll.push(Number(attrs.mechaArmurePuissance));
        exec.push(`{{vPuissance=+${Number(attrs.mechaArmurePuissance)}D}}`);

        rollBonus.push(cOD);

        degats += getStyle.diceDegats;
        violence += getStyle.diceViolence;

        if (wraith !== '0') {
          cRoll.push(+attrs.discretion);
          rollBonus.push(+attrs[ODValue.discretion]);

          bDegats += +attrs.discretion + +attrs[ODValue.discretion];
          exec.push(`{{vWraithA=${+attrs.discretion}D6+${+attrs[ODValue.discretion]}}} {{vWraithD=[[${+attrs.discretion}+${+attrs[ODValue.discretion]}]]}}`);
        }

        jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

        exec.push(jet);
        exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

        if (rollBonus.length === 0) { rollBonus.push(0); }

        exec.push(`{{vOD=${cOD}}}`);
        exec.push(`{{bonus=[[${rollBonus.join('+')}]]}}`);

        exec.push(`{{degats=[[${degats}D6+${bDegats}]]}}`);
        exec.push(`{{violence=[[${violence}D6+${bViolence}]]}}`);

        if (cBase.length > 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

        if (cBonus.length > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

        autresEffets = [
          i18n_antiVehicule,
          i18n_poingsSoniques,
        ];

        autresEffets.sort();

        exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
        break;

      case 'MADLCG':
        listAttrs = [
          'jetModifDes',
          'bonusCarac',
          'mechaArmurePuissance',
          'LCGCaracteristique1',
          'LCGCaracteristique2',
          'LCGCaracteristique3',
          'LCGCaracteristique4',
          roll[1],
          roll[2],
          'devasterAnatheme',
          'bourreauTenebres',
          'equilibreBalance',
          'MADDjinnWraithActive',
          'discretion',
          `${ODValue.discretion}`,
        ];

        listAttrs = listAttrs.concat(listStyle);
        attrs = await getAttrsAsync(listAttrs);

        wraith = attrs.MADDjinnWraithActive;

        bCarac = attrs.bonusCarac;
        mod = +attrs.jetModifDes;

        C1 = attrs.LCGCaracteristique1;
        C2 = attrs.LCGCaracteristique2;
        C3 = attrs.LCGCaracteristique3;
        C4 = attrs.LCGCaracteristique4;

        attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

        if (attrsCarac.C1) {
          const C1Value = attrsCarac.C1Base;
          const C1OD = attrsCarac.C1OD;

          cBase.push(attrsCarac.C1Nom);
          cRoll.push(C1Value);
          cOD += C1OD;
        }

        if (attrsCarac.C2) {
          const C2Value = attrsCarac.C2Base;
          const C2OD = attrsCarac.C2OD;

          cBase.push(attrsCarac.C2Nom);
          cRoll.push(C2Value);
          cOD += C2OD;
        }

        if (attrsCarac.C3) {
          const C3Value = attrsCarac.C3Base;
          const C3OD = attrsCarac.C3OD;

          cBonus.push(attrsCarac.C3Nom);
          cRoll.push(C3Value);
          cOD += C3OD;
        }

        if (attrsCarac.C4) {
          const C4Value = attrsCarac.C4Base;
          const C4OD = attrsCarac.C4OD;

          cBonus.push(attrsCarac.C4Nom);
          cRoll.push(C4Value);
          cOD += C4OD;
        }

        degats = Number(attrs[roll[1]].split('D')[0]);
        bDegats = Number(attrs[roll[1]].split('D')[1].split('+')[1]) || 0;

        violence = Number(attrs[roll[2]].split('D')[0]);
        bViolence = Number(attrs[roll[2]].split('D')[1].split('+')[1]) || 0;

        getStyle = getStyleDistanceMod(attrs, degats, violence, '', '', true, 0, false, false, false, false);

        exec = exec.concat(getStyle.exec);
        cRoll = cRoll.concat(getStyle.cRoll);
        cRoll.push(Number(attrs.mechaArmurePuissance));
        exec.push(`{{vPuissance=+${Number(attrs.mechaArmurePuissance)}D}}`);

        rollBonus.push(cOD);

        degats += getStyle.diceDegats;
        violence += getStyle.diceViolence;

        if (mod !== 0) {
          cRoll.push(mod);
          exec.push(`{{mod=${mod}}}`);
        }

        if (wraith !== '0') {
          cRoll.push(+attrs.discretion);
          rollBonus.push(+attrs[ODValue.discretion]);

          bDegats += +attrs.discretion + +attrs[ODValue.discretion];
          exec.push(`{{vWraithA=${+attrs.discretion}D6+${+attrs[ODValue.discretion]}}} {{vWraithD=[[${+attrs.discretion}+${+attrs[ODValue.discretion]}]]}}`);
        }

        jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

        exec.push(jet);
        exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

        if (cOD.length === 0) { cOD.push(0); }

        if (rollBonus.length === 0) { rollBonus.push(0); }

        exec.push(`{{vOD=${cOD}}}`);
        exec.push(`{{bonus=[[${rollBonus.join('+')}]]}}`);

        exec.push(`{{degats=[[${degats}D6+${bDegats}]]}}`);
        exec.push(`{{violence=[[${violence}D6+${bViolence}]]}}`);

        if (cBase.length > 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

        if (cBonus.length > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

        autresEffets = [
          `(${i18n_penetrant} 10)`,
          i18n_antiVehicule,
          `(${i18n_ignoreCDF})`,
        ];

        autresEffets.sort();

        exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
        break;
    }

    const devaste = +attrs.devasterAnatheme;
    const bourreau = +attrs.bourreauTenebres;
    const equilibre = +attrs.equilibreBalance;

    if (button !== 'MADjinnWraith') {
      if (devaste || bourreau || equilibre) {
        const herauts = [];

        if (devaste) { herauts.push(i18n_devasterAnatheme); }
        if (bourreau) { herauts.push(i18n_bourreauTenebres); }
        if (equilibre) { herauts.push(i18n_equilibrerBalance); }

        exec.push(`{{herauts=${herauts.join(' / ')}}}`);
      }
    }

    if (wraith !== '0') {
      exec.push('{{special2=^{module-wraith} ^{active}}}');
    }

    const finalRoll = await startRoll(exec.join(' '));

    const tJet = finalRoll.results.jet.result;

    const tBonus = finalRoll.results.bonus.result;
    const tExploit = finalRoll.results.Exploit.result;

    const finalComputed = {
      jet: tJet + tBonus,
    };

    if (button !== 'MADjinnWraith') {
      const rDegats = finalRoll.results.degats.dice;
      const rViolence = finalRoll.results.violence.dice;

      const tDegats = finalRoll.results.degats.result;
      const tViolence = finalRoll.results.violence.result;

      const conditions = {
        bourreau,
        devaste,
        equilibre,
      };

      const computed = updateRoll(finalRoll, tDegats, rDegats, [bDegats], tViolence, rViolence, [bViolence], conditions);

      Object.assign(finalComputed, computed);
    }

    finishRoll(finalRoll.rollId, finalComputed);

    if (tJet !== 0 && tJet === tExploit) {
      const exploitRoll = await startRoll(`${roll}@{jetGM} &{template:mechaArmure} {{special1=@{mechaArmureNom}}} {{special1B=${i18n_exploit}}}${jet}`);
      const tRExploit = exploitRoll.results.jet.result;
      const exploitComputed = {
        jet: tRExploit,
      };

      finishRoll(exploitRoll.rollId, exploitComputed);
    }
  });
});
