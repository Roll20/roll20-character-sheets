/* eslint-disable default-case */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
const monkZenRoll = ['jetModeZen'];

monkZenRoll.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value;

    const attributs = [
      'armureLegende',
      'jetModifDes',
      'MALWarriorSoldierA',
      'MALWarriorHunterA',
      'MALWarriorScholarA',
      'MALWarriorHeraldA',
      'MALWarriorScoutA',
    ];

    const attrs = await getAttrsAsync(attributs);

    const armureL = attrs.armureLegende;

    const exec = [];

    const mod = +attrs.jetModifDes;

    const cRoll = [];
    const cNom1 = [];

    let bonus = [];
    const OD = [];

    const ODMALWarrior = [];

    let MALTypeSoldier;
    let MALTypeHunter;
    let MALTypeHerald;
    let MALTypeScholar;
    let MALTypeScout;

    exec.push(roll);
    exec.push('{{OD=true}}');

    cNom1.push(CaracNom.hargne);
    cRoll.push('@{hargne}');
    OD.push('@{hargneOD}');

    cNom1.push(CaracNom.sf);
    cRoll.push('@{sf}');
    OD.push('@{sfOD}');

    exec.push(`{{vOD=[[${OD.join('+')}]]}}`);

    switch (armureL) {
      case 'warrior':
        MALTypeSoldier = attrs.MALWarriorSoldierA;
        MALTypeHunter = attrs.MALWarriorHunterA;
        MALTypeHerald = attrs.MALWarriorHeraldA;
        MALTypeScholar = attrs.MALWarriorScholarA;
        MALTypeScout = attrs.MALWarriorScoutA;

        if (MALTypeSoldier !== 0) {
          exec.push(`{{MALspecial2=${i18n_typeSoldier}}}`);
          exec.push('{{MALTypeWarrior=true}}');
        }

        if (MALTypeHunter !== 0) {
          exec.push(`{{MALspecial2=${i18n_typeHunter}}}`);
          exec.push('{{MALTypeWarrior=true}}');

          ODMALWarrior.push(MALTypeHunter);
        }

        if (MALTypeHerald !== 0) {
          exec.push(`{{MALspecial2=${i18n_typeHerald}}}`);
          exec.push('{{MALTypeWarrior=true}}');

          ODMALWarrior.push(MALTypeHerald);
        }

        if (MALTypeScholar !== 0) {
          exec.push(`{{MALspecial2=${i18n_typeScholar}}}`);
          exec.push('{{MALTypeWarrior=true}}');
        }

        if (MALTypeScout !== 0) {
          exec.push(`{{MALspecial2=${i18n_typeScout}}}`);
          exec.push('{{MALTypeWarrior=true}}');
        }

        if (ODMALWarrior.length !== 0) { exec.push(`{{vODMALWarrior=[[${ODMALWarrior.join('+')}]]}}`); }

        break;
      default:
        MALTypeSoldier = '';
        MALTypeHunter = '';
        MALTypeHerald = '';
        MALTypeScholar = '';
        MALTypeScout = '';
        break;
    }

    exec.push(`{{cBase=${cNom1.join(' - ')}}}`);

    if (mod !== 0) {
      cRoll.push(mod);
      exec.push(`{{mod=[[${mod}]]}}`);
    }

    if (cRoll.length === 0) { cRoll.push(0); }

    bonus = bonus.concat(OD);
    bonus = bonus.concat(ODMALWarrior);

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
});

// A MODIFIER CEA

const monkCeaRoll = ['monkJetVague', 'monkJetSalve', 'monkJetRayonSpe'];

monkCeaRoll.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value;
    const hasArmure = true;

    let attributs = [
      'caracteristique1Monk',
      'caracteristique2Monk',
      'caracteristique3',
      'caracteristique4',
      'monk250PG',
      'monkRayonTour',
      ODValue.tir,
      ODValue.discretion,
      'discretion',
      'devasterAnatheme',
      'bourreauTenebres',
      'equilibreBalance',
    ];

    const attDegats = [];
    const attViolence = [];

    if (button === 'monkJetVague') {
      attDegats.push('monkVagueDegat');
    }

    if (button === 'monkJetSalve') {
      attDegats.push('monkSalveDegat');
    }

    if (button === 'monkJetRayonSpe') {
      attDegats.push('monkRayonDegat');
      attViolence.push('monkRayonViolence');
    }

    attributs = attributs.concat(listBase, listStyle, listArmureLegende, attDegats, attViolence);

    const attrs = await getAttrsAsync(attributs);

    const armureL = attrs.armureLegende;

    let exec = [];
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    const attaquesSurprises = [];
    const attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = '';

    const mod = +attrs.jetModifDes;
    const hasBonus = +attrs.bonusCarac;

    const PG250 = +attrs.monk250PG;

    const C1 = attrs.caracteristique1Monk;
    const C2 = attrs.caracteristique2Monk;
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
    let ODMALRogue = [];
    let ODMALShaman = [];
    const ODMALWarrior = [];

    let capaDgts = 0;
    let capaViolence = 0;
    let bonusRayonD = 0;

    const vDiscretion = +attrs.discretion;
    const oDiscretion = +attrs[`${ODValue.discretion}`];
    const oTir = attrs[ODValue.tir];

    let diceDegats = 0;
    let diceViolence = 0;

    const bonusDegats = [];
    const bonusViolence = [];

    let degats = [];
    let violence = [];

    const devaste = +attrs.devasterAnatheme;
    const bourreau = +attrs.bourreauTenebres;
    const equilibre = +attrs.equilibreBalance;

    let isSurprise = false;
    let isDestructeur = false;
    let isMeurtrier = false;
    let isUltraviolence = false;

    let autresEffets = [];

    exec.push(roll);
    exec.push('{{OD=true}}');

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

    diceDegats += Number(MALBonus.diceDegats);
    diceViolence += Number(MALBonus.diceViolence);

    ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
    ODMALRogue = ODMALRogue.concat(MALBonus.ODMALRogue);
    ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
    ODMALWarrior.push(MALBonus.ODMALWarrior);

    autresEffets = autresEffets.concat(MALBonus.autresEffets);

    // GESTION DES EFFETS DES DIFFERENTES ATTAQUES

    if (button === 'monkJetVague') {
      capaDgts = Number(attrs.monkVagueDegat.split('D')[0]);
      capaViolence = Number(attrs.monkVagueDegat.split('D')[0]);

      exec.push(`{{portee=${i18n_portee} @{monkVaguePortee}}}`);

      isConditionnelA = true;
      isConditionnelD = true;
      isDestructeur = true;

      if (PG250 === 1) { exec.push(`{{parasitage=${i18n_parasitage} 4}}`); } else { exec.push(`{{parasitage=${i18n_parasitage} 2}}`); }

      exec.push(`{{parasitageCondition=${i18n_parasitageCondition}}}`);

      autresEffets.push(`${i18n_dispersion} 3`);

      exec.push(`{{destructeur=${i18n_destructeur}}}`);
      exec.push('{{destructeurValue=[[2D6]]}}');
      exec.push(`{{destructeurCondition=${i18n_destructeurCondition}}}`);

      exec.push(`{{choc=${i18n_choc} 2}}`);
      exec.push(`{{chocCondition=${i18n_chocCondition}}}`);
    }

    if (button === 'monkJetSalve') {
      capaDgts = Number(attrs.monkSalveDegat.split('D')[0]);
      capaViolence = Number(attrs.monkSalveDegat.split('D')[0]);

      exec.push(`{{portee=${i18n_portee} @{monkSalvePortee}}}`);

      isConditionnelA = true;
      isConditionnelD = true;
      isConditionnelV = true;
      isMeurtrier = true;
      isUltraviolence = true;

      exec.push(`{{parasitage=${i18n_parasitage} 1}}`);
      exec.push(`{{parasitageCondition=${i18n_parasitageCondition}}}`);

      autresEffets.push(`${i18n_dispersion} 3`);

      exec.push(`{{meurtrier=${i18n_meurtrier}}}`);
      exec.push('{{meurtrierValue=[[2D6]]}}');
      exec.push(`{{meurtrierCondition=${i18n_meurtrierCondition}}}`);

      exec.push(`{{ultraviolence=${i18n_ultraviolence}}}`);
      exec.push('{{ultraviolenceValue=[[2D6]]}}');
      exec.push(`{{ultraviolenceCondition=${i18n_ultraviolenceCondition}}}`);
    }

    if (button === 'monkJetRayonSpe') {
      bonusRayonD = Number(attrs.monkRayonTour);

      capaDgts = Number(attrs.monkRayonDegat.split('D')[0]);
      capaViolence = Number(attrs.monkRayonViolence.split('D')[0]);

      exec.push(`{{portee=${i18n_portee} @{monkRayonPortee}}}`);

      isConditionnelA = true;
      isConditionnelD = true;

      exec.push(`{{parasitage=${i18n_parasitage} 1}}`);
      exec.push(`{{parasitageCondition=${i18n_parasitageCondition}}}`);

      if (PG250 === 1) { autresEffets.push(i18n_ignoreArmure); } else { autresEffets.push(`${i18n_perceArmure} 40`); }
    }

    // FIN GESTION DES EFFETS DES DIFFERENTES ATTAQUES

    // GESTION DES BONUS DES OD
    if (oDiscretion >= 2 && hasArmure) {
      let bODDiscretion = vDiscretion;
      attaquesSurprises.push(i18n_odDiscretion);

      if (oDiscretion >= 5) { bODDiscretion += vDiscretion + oDiscretion; }

      attaquesSurprisesValue.push(bODDiscretion);
      attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`;
    }
    // FIN DE GESTION DES BONUS DES OD

    // GESTION DU STYLE

    const style = attrs.styleCombat;
    let bName = '';
    let modA = 0;

    switch (style) {
      case 'standard':
        exec.push(`{{style=${i18n_style} ${i18n_standard}}}`);
        break;

      case 'couvert':
        bName = 'atkCouvert';
        modA = attrs[bName];

        exec.push(`{{style=${i18n_style} ${i18n_couvert}}}`);

        if (aIGuidage === 0) {
          exec.push(`{{vMStyleA=${modA}D}}`);
          cRoll.push(Number(modA));
        }
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

        exec.push(`{{style=${i18n_style} ${i18n_akimbo}}}`);

        if (oTir >= 3) {
          exec.push('{{vMStyleA=-1D}}');
          cRoll.push(-1);
        } else {
          exec.push(`{{vMStyleA=${modA}D}}`);
          cRoll.push(Number(modA));
        }

        exec.push(`{{vMStyleD=+${capaDgts}D}}`);
        exec.push(`{{vMStyleV=+${Math.ceil(capaViolence / 2)}D}}`);

        capaDgts += capaDgts;
        capaViolence += Math.ceil(capaViolence / 2);
        break;

      case 'ambidextre':
        bName = 'atkAmbidextre';
        modA = attrs[bName];

        exec.push(`{{style=${i18n_style} ${i18n_ambidextre}}}`);
        break;

      case 'defensif':
        bName = 'atkDefensif';
        modA = attrs[bName];

        exec.push(`{{style=${i18n_style} ${i18n_defensif}}}`);
        exec.push(`{{vMStyleA=${modA}D}}`);
        cRoll.push(Number(modA));
        break;

      case 'pilonnage':
        modA = attrs[bName];

        exec.push(`{{style=${i18n_style} ${i18n_pilonnage}}}`);
        exec.push(`{{vMStyleA=${modA}D}}`);
        cRoll.push(Number(modA));
        break;

      case 'suppression':
        exec.push(`{{style=${i18n_style} ${i18n_pilonnage}}}`);
        break;
    }

    // FIN GESTION DU STYLE
    OD -= MALBonus.ODMALWarrior;

    exec.push(`{{vOD=${OD}}}`);

    exec.push(`{{cBase=${cBase.join(' - ')}}}`);

    if (hasBonus > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

    if (mod !== 0) {
      cRoll.push(mod);
      exec.push(`{{mod=[[${mod}]]}}`);
    }

    if (cRoll.length === 0) { cRoll.push(0); }

    bonus = bonus.concat(OD);

    bonus = bonus.concat(ODMALBarbarian);
    bonus = bonus.concat(ODMALRogue);
    bonus = bonus.concat(ODMALShaman);
    bonus = bonus.concat(ODMALWarrior);

    if (bonusRayonD !== 0) {
      capaDgts += bonusRayonD;

      exec.push(`{{vRayonDegats=${bonusRayonD}D}}`);
    }

    diceDegats += capaDgts;
    diceViolence += capaViolence;

    degats = degats.concat(`${diceDegats}D6`);
    degats = degats.concat(bonusDegats);

    violence = violence.concat(`${diceViolence}D6`);
    violence = violence.concat(bonusViolence);

    exec.push(`{{jet=[[ {[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`);
    exec.push(`{{tBonus=[[${bonus.join('+')}+0]]}}`);
    exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);

    exec.push(`{{degats=[[${degats.join('+')}]]}}`);
    exec.push(`{{violence=[[${violence.join('+')}]]}}`);

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

    if (isConditionnelA === true) { exec.push('{{succesConditionnel=true}}'); }

    if (isConditionnelD === true) { exec.push('{{degatsConditionnel=true}}'); }

    if (isConditionnelV === true) { exec.push('{{violenceConditionnel=true}}'); }

    if (autresEffets.length > 0) { exec.push(`{{effets=${autresEffets.join(' / ')}}}`); }

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
      isDestructeur,
      isMeurtrier,
      isUltraviolence,
      isSurprise,
    };

    const computed = updateRoll(finalRoll, tDegats, rDegats, bonusDegats, tViolence, rViolence, bonusViolence, conditions);

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
});
