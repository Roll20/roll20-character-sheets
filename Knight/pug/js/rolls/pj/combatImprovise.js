/* eslint-disable no-loop-func */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const rollCombatImprovise = 14;

for (let i = 0; i < rollCombatImprovise; i += 1) {
  const str = `AI${i}`;

  on(`clicked:${str}`, async (info) => {
    const roll = info.htmlAttributes.value;

    let hasArmure = true;

    let dDgts = 0;
    let dViolence = 0;

    switch (i) {
      case 1:
        dDgts = 4;
        dViolence = 4;
        break;

      case 2:
        dDgts = 2;
        dViolence = 5;
        break;

      case 3:
        dDgts = 4;
        dViolence = 4;
        break;

      case 4:
        dDgts = 6;
        dViolence = 4;
        break;

      case 5:
        dDgts = 4;
        dViolence = 6;
        break;

      case 6:
        dDgts = 5;
        dViolence = 5;
        break;

      case 7:
        dDgts = 7;
        dViolence = 5;
        break;

      case 8:
        dDgts = 5;
        dViolence = 7;
        break;

      case 9:
        dDgts = 6;
        dViolence = 6;
        break;

      case 10:
        dDgts = 7;
        dViolence = 9;
        break;

      case 11:
        dDgts = 8;
        dViolence = 8;
        break;

      case 12:
        dDgts = 10;
        dViolence = 12;
        break;

      case 13:
        dDgts = 11;
        dViolence = 11;
        break;

      default:
        dDgts = 0;
        dViolence = 0;
        break;
    }

    let exec = [];
    exec.push(roll);

    let isConditionnelD = false;
    let isConditionnelV = false;

    const cBase = [];
    const cBonus = [];
    let cRoll = [];
    let bonus = [];

    let OD = 0;

    const baseDegats = dDgts;
    const baseViolence = dViolence;

    let diceDegats = baseDegats;
    let diceViolence = baseDegats;

    let bDegats = [];
    const bViolence = [];

    let degats = [];
    let violence = [];

    let C1Nom;
    let C2Nom;

    let listAttrs = [
      'utilisationArmeAI',
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
    ];

    listAttrs = listAttrs.concat(listBase);
    listAttrs = listAttrs.concat(listArmure);
    listAttrs = listAttrs.concat(listArmureLegende);
    listAttrs = listAttrs.concat(listStyle);

    const attrs = await getAttrsAsync(listAttrs);

    const armure = attrs.armure;
    const armureL = attrs.armureLegende;

    if (armure === 'sans' || armure === 'guardian') { hasArmure = false; }

    const type = attrs.utilisationArmeAI;
    const mod = +attrs.jetModifDes;
    const hasBonus = attrs.bonusCarac;

    const C3 = attrs.caracteristique3ArmeImprovisee;
    const C4 = attrs.caracteristique4ArmeImprovisee;

    if (type === '&{template:combat} {{portee=^{portee-contact}}}') {
      C1Nom = 'force';
      C2Nom = 'combat';
    } else {
      C1Nom = 'force';
      C2Nom = 'tir';
    }

    let C3Nom = '';
    let C4Nom = '';

    let ODBarbarian = [];
    let ODMALBarbarian = [];
    let ODRogue = [];
    let ODMALRogue = [];
    let ODShaman = [];
    let ODMALShaman = [];
    const ODWarrior = [];
    const ODMALWarrior = [];

    const vForce = +attrs.force;
    const oForce = +attrs[ODValue.force];
    const vDiscretion = +attrs.discretion;
    const oDiscretion = +attrs[ODValue.discretion];
    const oTir = +attrs[ODValue.tir];
    const oCombat = +attrs[ODValue.combat];

    let isSurprise = false;
    let isTenebricide = false;

    const attaquesSurprises = [];
    const attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = '';

    const devaste = +attrs.devasterAnatheme;
    const bourreau = +attrs.bourreauTenebres;
    const equilibre = +attrs.equilibreBalance;

    let autresEffets = [];
    if (hasArmure) { exec.push('{{OD=true}}'); }

    const C1Value = +attrs[C1Nom];
    const C1OD = +attrs[ODValue[C1Nom]];

    cBase.push(CaracNom[C1Nom]);
    cRoll.push(C1Value);

    if (hasArmure) { OD += C1OD; }

    const C2Value = +attrs[C2Nom];
    const C2OD = +attrs[ODValue[C2Nom]];

    cBase.push(CaracNom[C2Nom]);
    cRoll.push(C2Value);

    if (hasArmure) { OD += C2OD; }

    const attrsCarac = await getCarac(hasBonus, '0', '0', C3, C4);

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

    if (mod !== 0) {
      cRoll.push(mod);
      exec.push(`{{mod=${mod}}}`);
    }

    // GESTION DES BONUS DE BASE
    if (type === '&{template:combat} {{portee=^{portee-contact}}}') {
      let dForce = vForce;

      if (hasArmure) { dForce += oForce * 3; }

      bDegats.push(dForce);
      exec.push(`{{vForce=${dForce}}}`);
    }

    // FIN GESTION DES BONUS DE BASE

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
    let getStyle;

    if (type.includes('&{template:combat} {{portee=^{portee-contact}}}')) {
      getStyle = getStyleContactMod(attrs, [], baseDegats, baseViolence, hasArmure, oCombat, false, false, false, false, false, false, false, false, false);
    } else {
      getStyle = getStyleDistanceMod(attrs, baseDegats, baseViolence, 0, 0, hasArmure, oTir, false, false, false, false);
    }

    exec = exec.concat(getStyle.exec);
    cRoll = cRoll.concat(getStyle.cRoll);
    diceDegats += getStyle.diceDegats;
    diceViolence += getStyle.diceViolence;

    // FIN GESTION DU STYLE

    // GESTION DES BONUS D'ARMURE

    const armorBonus = getArmorBonus(attrs, armure, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, autresEffets);

    exec = exec.concat(armorBonus.exec);
    cRoll = cRoll.concat(armorBonus.cRoll);

    diceDegats += Number(armorBonus.diceDegats);
    bDegats = bDegats.concat(armorBonus.bDegats);
    diceViolence += Number(armorBonus.diceViolence);

    ODBarbarian = ODBarbarian.concat(armorBonus.ODBarbarian);
    ODRogue = ODRogue.concat(armorBonus.ODRogue);
    ODShaman = ODShaman.concat(armorBonus.ODShaman);
    ODWarrior.push(armorBonus.ODWarrior);

    autresEffets = autresEffets.concat(armorBonus.autresEffets);

    const MALBonus = getMALBonus(attrs, armureL, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, autresEffets);

    exec = exec.concat(MALBonus.exec);
    cRoll = cRoll.concat(MALBonus.cRoll);

    diceDegats += Number(MALBonus.diceDegats);
    bDegats = bDegats.concat(MALBonus.bDegats);
    diceViolence += Number(MALBonus.diceViolence);

    ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
    ODMALRogue = ODMALRogue.concat(MALBonus.ODMALRogue);
    ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
    ODMALWarrior.push(MALBonus.ODMALWarrior);

    autresEffets = autresEffets.concat(MALBonus.autresEffets);

    // FIN GESTION DES BONUS D'ARMURE
    OD -= armorBonus.ODWarrior;
    OD -= MALBonus.ODMALWarrior;

    exec.push(`{{vOD=${OD}}}`);

    if (cRoll.length === 0) { cRoll.push(0); }

    if (bonus.length === 0) { bonus.push(0); }

    bonus = bonus.concat(OD);
    bonus = bonus.concat(ODBarbarian);
    bonus = bonus.concat(ODMALBarbarian);
    bonus = bonus.concat(ODRogue);
    bonus = bonus.concat(ODMALRogue);
    bonus = bonus.concat(ODShaman);
    bonus = bonus.concat(ODMALShaman);
    bonus = bonus.concat(ODWarrior);
    bonus = bonus.concat(ODMALWarrior);

    degats.push(`${diceDegats}D6`);
    degats = degats.concat(bDegats);

    violence.push(`${diceViolence}D6`);
    violence = violence.concat(bViolence);

    if (cBase.length !== 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

    if (cBonus.length !== 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

    const jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

    exec.push(jet);
    exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);
    exec.push(`{{bonus=[[${bonus.join('+')}]]}}`);

    exec.push(`{{degats=[[${degats.join('+')}]]}}`);
    exec.push(`{{violence=[[${violence.join('+')}]]}}`);

    if (attaquesSurprises.length > 0) {
      exec.push(`{{attaqueSurprise=${attaquesSurprises.join('\n+')}}}`);
      exec.push(`{{attaqueSurpriseValue=[[${attaquesSurprisesValue.join('+')}]]}}`);
      exec.push(attaquesSurprisesCondition);

      isSurprise = true;
    }

    if (armure === 'berserk') {
      isConditionnelD = true;
      isConditionnelV = true;

      exec.push(`{{antiAnatheme=${i18n_antiAnatheme}}}`);
      exec.push(`{{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);

      exec.push('{{tenebricideValueD=[[0]]}}');
      exec.push('{{tenebricideValueV=[[0]]}}');

      exec.push(`{{tenebricide=${i18n_tenebricide}}}`);
      exec.push(`{{tenebricideConditionD=${i18n_tenebricideConditionD}}}`);
      exec.push(`{{tenebricideConditionV=${i18n_tenebricideConditionV}}}`);

      isTenebricide = true;

      if (attaquesSurprises.length > 0) {
        exec.push(`{{tenebricideAS=${attaquesSurprises.join('\n+')}}}`);
        exec.push('{{tenebricideASValue=[[0]]}}');
      }
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

    if (isConditionnelV) { exec.push('{{violenceConditionnel=true}}'); }

    // ROLL
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
      isTenebricide,
    };

    const computed = updateRoll(finalRoll, tDegats, rDegats, bDegats, tViolence, rViolence, bViolence, conditions);

    const finalComputed = {
      jet: tJet + tBonus,
    };

    Object.assign(finalComputed, computed);

    finishRoll(finalRoll.rollId, finalComputed);

    if (tJet !== 0 && tJet === tExploit) {
      const exploitRoll = await startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}}${jet}`);
      const tRExploit = exploitRoll.results.jet.result;

      const exploitComputed = {
        jet: tRExploit,
      };

      finishRoll(exploitRoll.rollId, exploitComputed);
    }
  });
}
