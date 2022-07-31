/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const rollCombatGrenade = ['grenade1', 'grenade2', 'grenade3', 'grenade4', 'grenade5'];

rollCombatGrenade.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value;

    let hasArmure = true;
    let hasDgts = true;
    let hasLumiere = false;

    if (button === 'grenade2' || button === 'grenade4') { hasDgts = false; }

    if (button === 'grenade2') { hasLumiere = true; }

    const firstExec = [];
    let exec = [];
    firstExec.push(roll);

    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    const cBase = [];
    const cBonus = [];
    let cRoll = [];
    let bonus = [];

    let OD = 0;

    let ameliorations = false;

    let diceDegats = 3;
    let diceViolence = 3;

    let bDegats = [];
    const bViolence = [];

    let degats = [];
    let violence = [];

    let listAttrs = [
      'caracteristique1Grenade',
      'caracteristique2Grenade',
      'caracteristique3Grenade',
      'caracteristique4Grenade',
      'grenadeAvancee',
      'discretion',
      `${ODValue.discretion}`,
      'tir',
      'devasterAnatheme',
      'bourreauTenebres',
      'equilibreBalance',
    ];

    listAttrs = listAttrs.concat(listArmure, listArmureLegende, listStyle, listBase);

    const attrs = await getAttrsAsync(listAttrs);

    const armure = attrs.armure;
    const armureL = attrs.armureLegende;

    if (armure === 'sans' || armure === 'guardian') { hasArmure = false; }

    if (attrs.grenadeAvancee !== '0') { ameliorations = true; }

    const mod = +attrs.jetModifDes;
    const hasBonus = attrs.bonusCarac;

    const C1 = attrs.caracteristique1Grenade || '0';
    const C2 = attrs.caracteristique2Grenade || '0';
    const C3 = attrs.caracteristique3Grenade || '0';
    const C4 = attrs.caracteristique4Grenade || '0';

    const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

    let ODBarbarian = [];
    let ODMALBarbarian = [];
    let ODRogue = [];
    let ODMALRogue = [];
    let ODShaman = [];
    let ODMALShaman = [];
    const ODWarrior = [];
    const ODMALWarrior = [];

    const vDiscretion = +attrs.discretion;
    const oDiscretion = +attrs[`${ODValue.discretion}`];
    const oTir = +attrs.tir;

    const attaquesSurprises = [];
    const attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = '';

    let isTenebricide = false;
    let isDestructeur = false;
    let isMeurtrier = false;
    let isUltraviolence = false;
    let isSurprise = false;

    const devaste = +attrs.devasterAnatheme;
    const bourreau = +attrs.bourreauTenebres;
    const equilibre = +attrs.equilibreBalance;

    let autresEffets = [];

    if (hasArmure) { exec.push('{{OD=true}}'); }

    let C1Nom = '';
    let C2Nom = '';
    let C3Nom = '';
    let C4Nom = '';

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

    if (mod !== 0) {
      cRoll.push(mod);
      exec.push(`{{mod=${mod}}}`);
    }

    // GESTION DES BONUS DE BASE
    if (ameliorations) {
      diceDegats += 2;
      diceViolence += 2;

      exec.push('{{vGrenadesAmeliorees=+2D}}');
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

    // GESTION DES EFFETS

    switch (button) {
      case 'grenade1':
        isConditionnelD = true;
        isConditionnelV = true;

        firstExec.push('{{ultraviolenceValue=[[2D6]]}} {{meurtrierValue=[[2D6]]}}');

        exec.push(`{{ultraviolence=${i18n_ultraviolence}}} {{ultraviolenceCondition=${i18n_ultraviolenceCondition}}} {{meurtrier=${i18n_meurtrier}}} {{meurtrierCondition=${i18n_meurtrierCondition}}}`);
        autresEffets.push(`${i18n_dispersion} 6`);

        isMeurtrier = true;
        isUltraviolence = true;
        break;
      case 'grenade2':
        isConditionnelA = true;

        exec.push(`{{choc=${i18n_choc} 1}} {{chocCondition=${i18n_chocCondition}}}`);
        autresEffets.push(`${i18n_barrage} 2`);
        autresEffets.push(`${i18n_lumiere} 2`);
        autresEffets.push(`${i18n_dispersion} 6`);
        break;
      case 'grenade3':
        isConditionnelD = true;

        firstExec.push('{{destructeurValue=[[2D6]]}}');

        exec.push(`{{destructeur=${i18n_destructeur}}} {{destructeurCondition=${i18n_destructeurCondition}}}`);
        autresEffets.push(`${i18n_perceArmure} 20`);
        autresEffets.push(`${i18n_penetrant} 6`);
        autresEffets.push(`${i18n_dispersion} 6`);

        isDestructeur = true;
        break;
      case 'grenade4':
        isConditionnelA = true;

        exec.push(`{{parasitage=${i18n_parasitage} 2}} {{parasitageCondition=${i18n_parasitageCondition}}}`);
        autresEffets.push(`${i18n_dispersion} 6`);
        hasDgts = false;
        break;
      case 'grenade5':
        isConditionnelA = true;

        exec.push(`{{choc=${i18n_choc} 1}} {{chocCondition=${i18n_chocCondition}}} {{grenadeExplosive=${i18n_surVehicule}}} {{grenadeExplosiveD=[[3D6]]}}`);
        autresEffets.push(i18n_antiVehicule);
        autresEffets.push(`${i18n_dispersion} 3`);
        break;
      default:
        isConditionnelA = false;
        hasDgts = false;
        break;
    }

    // FIN GESTION DES EFFETS

    // GESTION DU STYLE

    const getStyle = getStyleDistanceMod(attrs, diceDegats, diceViolence, '', '', hasArmure, oTir, false, false, false, false);

    exec = exec.concat(getStyle.exec);
    cRoll = cRoll.concat(getStyle.cRoll);
    diceDegats += getStyle.diceDegats;
    diceViolence += getStyle.diceViolence;

    // FIN GESTION DU STYLE

    // GESTION DES BONUS D'ARMURE

    const armorBonus = getArmorBonus(attrs, armure, hasLumiere, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, autresEffets);

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

    if (armure === 'berserk') {
      isTenebricide = true;
      isConditionnelD = true;
      isConditionnelV = true;

      exec.push(`{{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);
    }

    const MALBonus = getMALBonus(attrs, armureL, hasLumiere, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, autresEffets);

    exec = exec.concat(MALBonus.exec);
    cRoll = cRoll.concat(MALBonus.cRoll);

    diceDegats += Number(MALBonus.diceDegats);
    bDegats = bDegats.concat(MALBonus.bDegats);
    diceViolence += Number(MALBonus.diceViolence);

    ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
    ODMALRogue = ODRogue.concat(MALBonus.ODMALRogue);
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

    if (hasDgts) {
      if (diceDegats < 0) { diceDegats = 0; }

      if (diceViolence < 0) { diceViolence = 0; }

      degats.push(`${diceDegats}D6`);
      degats = degats.concat(bDegats);

      violence.push(`${diceViolence}D6`);
      violence = violence.concat(bViolence);

      exec.push(`{{degats=[[${degats.join('+')}]]}}`);
      exec.push(`{{violence=[[${violence.join('+')}]]}}`);
    }

    if (cBase.length !== 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

    if (cBonus.length !== 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

    const jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

    firstExec.push(jet);
    exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);
    exec.push(`{{bonus=[[${bonus.join('+')}]]}}`);

    if (attaquesSurprises.length > 0 && hasDgts) {
      exec.push(`{{attaqueSurprise=${attaquesSurprises.join('\n+')}}}`);
      exec.push(`{{attaqueSurpriseValue=[[${attaquesSurprisesValue.join('+')}]]}}`);
      exec.push(attaquesSurprisesCondition);

      isSurprise = true;
    }

    if (isTenebricide && hasDgts) {
      exec.push(`{{tenebricide=${i18n_tenebricide}}} {{tenebricideConditionD=${i18n_tenebricideConditionD}}} {{tenebricideConditionV=${i18n_tenebricideConditionV}}}`);
      exec.push('{{tenebricideValueD=[[0]]}}');
      exec.push('{{tenebricideValueV=[[0]]}}');

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

    if (isConditionnelA) { exec.push('{{succesConditionnel=true}}'); }

    if (isConditionnelD && hasDgts) { exec.push('{{degatsConditionnel=true}}'); }

    if (isConditionnelV && hasDgts) { exec.push('{{violenceConditionnel=true}}'); }

    exec = firstExec.concat(exec);

    const finalRoll = await startRoll(exec.join(' '));
    const tJet = finalRoll.results.jet.result;
    const tBonus = finalRoll.results.bonus.result;
    const tExploit = finalRoll.results.Exploit.result;

    const finalComputed = {
      jet: tJet + tBonus,
    };

    if (hasDgts) {
      const rDegats = finalRoll.results.degats.dice;
      const rViolence = finalRoll.results.violence.dice;

      const tDegats = finalRoll.results.degats.result;
      const tViolence = finalRoll.results.violence.result;

      const conditions = {
        bourreau,
        devaste,
        equilibre,
        isTenebricide,
        isSurprise,
        isDestructeur,
        isMeurtrier,
        isUltraviolence,
      };

      const computed = updateRoll(finalRoll, tDegats, rDegats, bDegats, tViolence, rViolence, bViolence, conditions);
      Object.assign(finalComputed, computed);
    }

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
});
