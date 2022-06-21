/* eslint-disable default-case */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-undef */

on('clicked:distanceRangerLongbow', async (info) => {
  const roll = info.htmlAttributes.value;
  const hasArmure = true;

  let attributs = [
    'pilonnageRanger',
    'energiePJ',
    'caracteristique1Ranger',
    'caracteristique2Ranger',
    'caracteristique3Ranger',
    'caracteristique4Ranger',
    'discretion',
    ODValue.discretion,
    ODValue.tir,
  ];

  const arme = [
    'rangerArmeDegat',
    'rangerArmeDegatEvol',
    'rangerArmeViolence',
    'rangerArmeViolenceEvol',
    'rangerArmePortee',
  ];

  const evolutions = [
    'ranger50PG3',
    'ranger50PG2',
    'ranger100PG',
  ];

  const effets = [
    'rangerChoc',
    'rangerChocValue',
    'rangerDegatContinue',
    'rangerDegatContinueValue',
    'rangerDesignation',
    'rangerSilencieux',
    'rangerPerceArmure',
    'rangerPerceArmureValue',
    'rangerUltraViolence',
    'rangerAntiVehicule',
    'rangerArtillerie',
    'rangerDispersion',
    'rangerDispersionValue',
    'rangerLumiere',
    'rangerLumiereValue',
    'rangerPenetrant',
    'rangerPenetrantValue',
    'rangerPerceArmure60',
    'rangerPerceArmure60Value',
    'rangerAntiAnatheme',
    'rangerDemoralisant',
    'rangerEnChaine',
    'rangerFureur',
    'rangerIgnoreArmure',
    'rangerPenetrant10',
    'rangerPenetrant10Value',
  ];

  const ameliorations = [
    'chargeurGrappesRanger',
    'canonLongRanger',
    'canonRaccourciRanger',
    'chambreDoubleRanger',
    'interfaceGuidageRanger',
    'lunetteIntelligenteRanger',
    'chargeurExplosivesRanger',
    'munitionsDroneRanger',
    'munitionsIEMRanger',
    'munitionsNonLetalesRanger',
    'munitionsSubsoniquesRanger',
    'pointeurLaserRanger',
    'protectionArmeRanger',
    'revetementOmegaRanger',
    'structureElementRanger',
  ];

  const special = [
    'bDDiversTotalRanger',
    'bDDiversD6',
    'bDDiversFixe',
    'bVDiversTotalRanger',
    'bVDiversD6',
    'bVDiversFixe',
    'devasterAnatheme',
    'bourreauTenebres',
    'equilibreBalance',
  ];

  attributs = attributs.concat(arme, evolutions, effets, ameliorations, special, listBase, listArmureLegende, listStyle);

  const attrs = await getAttrsAsync(attributs);

  const armureL = attrs.armureLegende;

  let exec = [];

  let isConditionnelA = false;
  let isConditionnelD = true;
  let isConditionnelV = true;

  const attaquesSurprises = [];
  const attaquesSurprisesValue = [];
  let attaquesSurprisesCondition = '';

  const PG50_3 = attrs.ranger50PG3;
  const PG50_2 = attrs.ranger50PG2;
  const PG100 = attrs.ranger100PG;

  let diceDegats = 0;
  let degats = [];
  const bonusDegats = [];

  let diceViolence = 0;
  let violence = [];
  const bonusViolence = [];

  const devaste = +attrs.devasterAnatheme;
  const bourreau = +attrs.bourreauTenebres;
  const equilibre = +attrs.equilibreBalance;

  const portee = attrs.rangerArmePortee;
  let autresEffets = [];
  const autresAmeliorations = [];
  const autresSpecial = [];

  const energie = attrs.energiePJ;
  let energieDepense = 0;

  let isSurprise = false;
  let isFureur = false;
  let isUltraviolence = false;

  if (PG50_2 === 'on') {
    diceDegats = Number(attrs.rangerArmeDegatEvol.split('D')[0]);
    diceViolence = Number(attrs.rangerArmeViolenceEvol.split('D')[0]);

    energieDepense += (diceDegats - 5);
    energieDepense += (diceViolence - 3);
  } else {
    diceDegats = Number(attrs.rangerArmeDegat.split('D')[0]);
    diceViolence = Number(attrs.rangerArmeViolence.split('D')[0]);

    energieDepense += (diceDegats - 3);
    energieDepense += (diceViolence - 1);
  }

  switch (portee) {
    case '^{portee-longue}':
      energieDepense += 1;
      break;

    case '^{portee-lointaine}':
      energieDepense += 2;
      break;

    default:
      energieDepense += 0;
      break;
  }

  const mod = +attrs.jetModifDes;
  const hasBonus = +attrs.bonusCarac;

  const C1 = attrs.caracteristique1Ranger;
  const C2 = attrs.caracteristique2Ranger;
  const C3 = attrs.caracteristique3Ranger;
  const C4 = attrs.caracteristique4Ranger;

  const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

  let C1Nom = '';
  let C2Nom = '';
  let C3Nom = '';
  let C4Nom = '';

  const vDiscretion = +attrs.discretion;
  const oDiscretion = +attrs[ODValue.discretion];
  const oTir = +attrs[ODValue.tir];

  let E1 = 2;
  let E2 = 3;
  let E3 = 6;

  let cRoll = [];
  const cBase = [];
  const cBonus = [];

  let bonus = [];
  let OD = 0;

  const ODMALWarrior = [];
  let ODMALRogue = [];
  let ODMALShaman = [];
  let ODMALBarbarian = [];

  let isELumiere = false;

  exec.push(roll);

  if (PG100 === 'on') {
    E1 = 1;
    E2 = 1;
    E3 = 4;
  }

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

  // GESTION DES BONUS DES OD
  if (oDiscretion >= 2) {
    let bODDiscretion = vDiscretion;
    attaquesSurprises.push(i18n_odDiscretion);

    if (oDiscretion >= 5) { bODDiscretion += vDiscretion + oDiscretion; }

    attaquesSurprisesValue.push(bODDiscretion);
  }
  // FIN DE GESTION DES BONUS DES OD

  // GESTION DES EFFETS

  const eChoc = attrs.rangerChoc;
  const eChocV = attrs.rangerChocValue;
  const eDegatsContinus = attrs.rangerDegatContinue;
  const eDegatsContinusV = attrs.rangerDegatContinueValue;
  const eDesignation = attrs.rangerDesignation;
  const eSilencieux = attrs.rangerSilencieux;
  const ePerceArmure = attrs.rangerPerceArmure;
  const ePerceArmureV = attrs.rangerPerceArmureValue;
  const eUltraviolence = attrs.rangerUltraViolence;
  const eAntiVehicule = attrs.rangerAntiVehicule;
  const eArtillerie = attrs.rangerArtillerie;
  const eDispersion = attrs.rangerDispersion;
  const eDispersionV = attrs.rangerDispersionValue;
  const eLumiere = attrs.rangerLumiere;
  const eLumiereV = attrs.rangerLumiereValue;
  const ePenetrant = attrs.rangerPenetrant;
  const ePenetrantV = attrs.rangerPenetrantValue;
  const ePerceArmure60 = attrs.rangerPerceArmure60;
  const ePerceArmure60V = attrs.rangerPerceArmure60Value;
  const eAntiAnatheme = attrs.rangerAntiAnatheme;
  const eDemoralisant = attrs.rangerDemoralisant;
  const eEnChaine = attrs.rangerEnChaine;
  const eFureur = attrs.rangerFureur;
  const eIgnoreArmure = attrs.rangerIgnoreArmure;
  const ePenetrant10 = attrs.rangerPenetrant10;
  const ePenetrant10V = attrs.rangerPenetrant10Value;

  exec.push(`{{assistanceAttaque=${i18n_assistanceAttaque}}}`);
  exec.push(`{{assistanceAttaqueCondition=${i18n_assistanceAttaqueCondition}}}`);

  if (eChoc !== '0') {
    isConditionnelA = true;
    exec.push(`{{choc=${i18n_choc} ${eChocV}}}`);
    exec.push(`{{chocCondition=${i18n_chocCondition}}}`);

    energieDepense += E1;
  }

  if (eSilencieux !== '0') {
    const MALghost = +attrs.MALRogueGhost;
    const MALchangeling = +attrs.MALBardChangeling;
    const totalSilencieux = vDiscretion + oDiscretion;

    if (MALghost !== 0) {
      exec.push(`{{vSilencieuxD=${totalSilencieux}}}`);
      bonusDegats.push(totalSilencieux);
    } else if (MALchangeling !== 0) {
      exec.push(`{{vSilencieuxD=${totalSilencieux}}}`);
      bonusDegats.push(totalSilencieux);
    } else {
      isConditionnelD = true;
      attaquesSurprises.push(i18n_silencieux);
      attaquesSurprisesValue.push(totalSilencieux);

      if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
    }

    energieDepense += E1;
  }

  if (eUltraviolence !== '0') {
    isUltraviolence = true;

    exec.push(`{{ultraviolence=${i18n_ultraviolence}}}`);
    exec.push('{{ultraviolenceValue=[[2D6]]}}');
    exec.push(`{{ultraviolenceCondition=${i18n_ultraviolenceCondition}}}`);

    energieDepense += E1;
  }

  if (eArtillerie !== '0') {
    isConditionnelA = true;
    exec.push(`{{artillerie=${i18n_artillerie}}}`);
    exec.push(`{{artillerieCondition=${i18n_artillerieCondition}}}`);

    energieDepense += E2;
  }

  if (eAntiAnatheme !== '0') {
    isConditionnelD = true;
    isConditionnelV = true;
    exec.push(`{{antiAnatheme=${i18n_antiAnatheme}}}`);
    exec.push(`{{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);

    energieDepense += E3;
  }

  if (eDemoralisant !== '0') {
    isConditionnelA = true;
    exec.push(`{{demoralisant=${i18n_demoralisant}}}`);
    exec.push(`{{demoralisantCondition=${i18n_demoralisantCondition}}}`);

    energieDepense += E3;
  }

  if (eEnChaine !== '0') {
    isConditionnelD = true;
    exec.push(`{{enChaine=${i18n_enChaine}}}`);
    exec.push(`{{enChaineCondition=${i18n_enChaineCondition}}}`);

    energieDepense += E3;
  }

  if (eFureur !== '0') {
    isFureur = true;
    isConditionnelV = true;
    exec.push(`{{fureur=${i18n_fureur}}}`);
    exec.push('{{fureurValue=[[4D6]]}}');
    exec.push(`{{fureurCondition=${i18n_fureurCondition}}}`);

    energieDepense += E3;
  }

  if (eAntiVehicule !== '0') {
    autresEffets.push(i18n_antiVehicule);

    energieDepense += E2;
  }

  if (eDegatsContinus !== '0') {
    autresEffets.push(`${i18n_degatsContinus} ${eDegatsContinusV} ([[1d6]] ${i18n_tours})`);

    energieDepense += E1;
  }

  autresEffets.push(i18n_deuxMains);

  if (eDesignation !== '0') {
    autresEffets.push(i18n_designation);

    energieDepense += E1;
  }

  if (eDispersion !== '0') {
    autresEffets.push(`${i18n_dispersion} ${eDispersionV}`);

    energieDepense += E2;
  }

  if (PG50_3 !== '1') { autresEffets.push(i18n_lourd); }

  if (eLumiere !== '0') {
    autresEffets.push(`${i18n_lumiere} ${eLumiereV}`);
    isELumiere = true;

    energieDepense += E2;
  }

  if (ePenetrant !== '0') {
    autresEffets.push(`${i18n_penetrant} ${ePenetrantV}`);

    energieDepense += E2;
  }

  if (ePerceArmure !== '0') {
    autresEffets.push(`${i18n_perceArmure} ${ePerceArmureV}`);

    energieDepense += E1;
  }

  if (ePerceArmure60 !== '0') {
    autresEffets.push(`${i18n_perceArmure} ${ePerceArmure60V}`);

    energieDepense += E2;
  }

  if (eIgnoreArmure !== '0') {
    autresEffets.push(i18n_ignoreArmure);

    energieDepense += E3;
  }

  if (ePenetrant10 !== '0') {
    autresEffets.push(`${i18n_penetrant} ${ePenetrant10V}`);

    energieDepense += E3;
  }

  // FIN GESTION DES EFFETS

  // GESTION DES AMELIORATIONS
  let rChambreDouble = 0;

  const aGrappe = attrs.chargeurGrappesRanger;
  const aCLong = attrs.canonLongRanger;
  const aCRaccourci = attrs.canonRaccourciRanger;
  const aChambreDouble = attrs.chambreDoubleRanger;
  const aIGuidage = attrs.interfaceGuidageRanger;
  const aLIntelligente = attrs.lunetteIntelligenteRanger;
  const aExplosive = attrs.chargeurExplosivesRanger;
  const aMDrone = attrs.munitionsDroneRanger;
  const aMIEM = attrs.munitionsIEMRanger;
  const aMNLetales = attrs.munitionsNonLetalesRanger;
  const aMSubsoniques = attrs.munitionsSubsoniquesRanger;
  const aPLaser = attrs.pointeurLaserRanger;
  const aPArme = attrs.protectionArmeRanger;
  const aROmega = attrs.revetementOmegaRanger;
  const aSElement = attrs.structureElementRanger;

  if (aGrappe !== '0') {
    exec.push('{{vMGrappeD=-1D6}}');
    exec.push('{{vMGrappeV=+1D6}}');
    diceDegats -= 1;
    bonusViolence.push('1D6');
  }

  if (aCLong !== '0') {
    isConditionnelA = true;
    exec.push(`{{canonLong=${i18n_canonLong}}}`);
    exec.push(`{{canonLongCondition=${i18n_canonLongCondition}}}`);
  }

  if (aCRaccourci !== '0') {
    isConditionnelA = true;
    exec.push(`{{canonRaccourci=${i18n_canonRaccourci}}}`);
    exec.push(`{{canonRaccourciCondition=${i18n_canonRaccourciCondition}}}`);
  }

  if (aChambreDouble !== '0') {
    rChambreDouble = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
  }

  if (aLIntelligente !== '0') {
    isConditionnelA = true;
    exec.push(`{{lunetteIntelligente=${i18n_lunetteIntelligente}}}`);
    exec.push(`{{lunetteIntelligenteCondition=${i18n_lunetteIntelligenteCondition}}}`);
  }

  if (aExplosive !== '0') {
    exec.push('{{vMExplosiveD=+1D6}}');
    exec.push('{{vMExplosiveV=-1D6}}');
    bonusDegats.push('1D6');
    diceViolence -= 1;
  }

  if (aMDrone !== '0') {
    exec.push('{{vMDrone=+3}}');
    bonus.push(3);
  }

  if (aMIEM !== '0') {
    exec.push('{{vMIEMD=-1D6}}');
    exec.push('{{vMIEMV=-1D6}}');
    diceDegats -= 1;
    diceViolence -= 1;
    autresAmeliorations.push(i18n_munitionsIEMParasitage);
  }

  if (aMSubsoniques !== '0') {
    if (eSilencieux !== '0') { autresAmeliorations.push(i18n_munitionsSubsoniques); } else if (eSilencieux === '0') {
      const MALghost = +attrs.MALRogueGhost;
      const MALchangeling = +attrs.MALBardChangeling;
      const totalSubsonique = vDiscretion + oDiscretion;

      if (MALghost !== 0) {
        exec.push(`{{vSubsoniqueD=${totalSubsonique}}}`);
        bonusDegats.push(totalSubsonique);
      } else if (MALchangeling !== 0) {
        exec.push(`{{vSubsoniqueD=${totalSubsonique}}}`);
        bonusDegats.push(totalSubsonique);
      } else {
        isConditionnelD = true;
        attaquesSurprises.push(i18n_munitionsSubsoniques);
        attaquesSurprisesValue.push(totalSubsonique);

        if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
      }
    }
  }

  if (aPLaser !== '0') {
    exec.push('{{vMPLaser=+1}}');
    bonus.push(1);
  }

  if (aROmega !== '0') {
    attaquesSurprises.push(i18n_revetementOmega);
    attaquesSurprisesValue.push('2D6');

    if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
  }

  if (aIGuidage !== '0') { autresAmeliorations.push(i18n_interfaceGuidage); }

  if (aMNLetales !== '0') { autresAmeliorations.push(i18n_munitionsNonLetales); }

  if (aPArme !== '0') { autresAmeliorations.push(i18n_protectionArme); }

  if (aSElement !== '0') { autresAmeliorations.push(i18n_structureElementAlpha); }

  // FIN DE LA GESTION DES AMELIORATIONS

  // GESTION DES BONUS SPECIAUX
  const sBonusDegats = attrs.bDDiversTotalRanger;
  const sBonusDegatsD6 = attrs.bDDiversD6;
  const sBonusDegatsFixe = attrs.bDDiversFixe;

  const sBonusViolence = attrs.bVDiversTotalRanger;
  const sBonusViolenceD6 = attrs.bVDiversD6;
  const sBonusViolenceFixe = attrs.bVDiversFixe;

  if (sBonusDegats !== '0') {
    exec.push(`{{vMSpecialD=+${sBonusDegatsD6}D6+${sBonusDegatsFixe}}}`);
    diceDegats += Number(sBonusDegatsD6);
    bonusDegats.push(sBonusDegatsFixe);
  }

  if (sBonusViolence !== '0') {
    exec.push(`{{vMSpecialV=+${sBonusViolenceD6}D6+${sBonusViolenceFixe}}}`);
    diceViolence += Number(sBonusViolenceD6);
    bonusViolence.push(sBonusViolenceFixe);
  }
  // FIN DE GESTION DES BONUS SPECIAUX

  const MALBonus = getMALBonus(attrs, armureL, isELumiere, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, autresEffets);

  exec = exec.concat(MALBonus.exec);
  cRoll = cRoll.concat(MALBonus.cRoll);

  diceDegats += Number(MALBonus.diceDegats);
  diceViolence += Number(MALBonus.diceViolence);

  ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
  ODMALRogue = ODMALRogue.concat(MALBonus.ODMALRogue);
  ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
  ODMALWarrior.push(MALBonus.ODMALWarrior);

  autresEffets = autresEffets.concat(MALBonus.autresEffets);

  exec.push(`{{cBase=${cBase.join(' - ')}}}`);

  if (hasBonus > 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

  if (mod !== 0) {
    cRoll.push(mod);
    exec.push(`{{mod=${mod}}}`);
  }

  // GESTION DU STYLE

  const style = attrs.styleCombat;
  let bName = '';
  let modA = 0;
  let vPilonnage = 0;

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
      break;

    case 'ambidextre':
      bName = 'atkAmbidextre';
      modA = attrs[bName];

      exec.push(`{{style=${i18n_style} ${i18n_ambidextre}}}`);

      if (oTir >= 3) {
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

    case 'pilonnage':
      bName = 'atkPilonnage';
      modA = attrs[bName];
      vPilonnage = Number(attrs.pilonnageRanger) - 1;

      exec.push(`{{style=${i18n_style} ${i18n_pilonnage}}}`);
      exec.push(`{{vMStyleA=${modA}D}}`);
      cRoll.push(Number(modA));

      exec.push(`{{vMStyleD=+${vPilonnage}D}}`);
      bonusDegats.push(`${vPilonnage}D6`);
      break;

    case 'suppression':
      exec.push(`{{style=${i18n_style} ${i18n_pilonnage}}}`);
      if (PG50_3 !== '1') {
        const vSuppressionD = Math.floor(Number(attrs.styleSuppressionD) / 2);
        const vSuppressionV = Math.floor(Number(attrs.styleSuppressionV) / 2);

        if (vSuppressionD > 0) {
          diceDegats -= vSuppressionD;
          exec.push(`{{vMStyleD=-${vSuppressionD}D}}`);
        }

        if (vSuppressionV > 0) {
          diceViolence -= vSuppressionV;
          exec.push(`{{vMStyleV=-${vSuppressionV}D}}`);
        }
      }
      break;
  }

  // FIN GESTION DU STYLE
  OD -= MALBonus.ODMALWarrior;
  exec.push(`{{vOD=${OD}}}`);

  if (cRoll.length === 0) { cRoll.push(0); }

  bonus.push(OD);

  bonus = bonus.concat(ODMALBarbarian);
  bonus = bonus.concat(ODMALRogue);
  bonus = bonus.concat(ODMALShaman);
  bonus = bonus.concat(ODMALWarrior);

  exec.push(`{{jet=[[ {{[[{${cRoll.join('+')}-${rChambreDouble}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`);
  exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);
  exec.push(`{{bonus=[[${bonus.join('+')}]]}}`);

  degats.push(`${diceDegats}D6`);
  degats = degats.concat(bonusDegats);

  violence.push(`${diceViolence}D6`);
  violence = violence.concat(bonusViolence);

  exec.push(`{{portee=${i18n_portee} ${portee}}}`);
  exec.push(`{{degats=[[${degats.join('+')}]]}}`);
  exec.push(`{{violence=[[${violence.join('+')}]]}}`);

  const resultatEnergie = energie - energieDepense;
  let pasEnergie = false;

  if (resultatEnergie < 0) { pasEnergie = true; }

  autresSpecial.push(`${i18n_energieRetiree} (${energieDepense})`);

  if (autresEffets.length > 0) { exec.push(`{{effets=${autresEffets.join(' / ')}}}`); }

  if (autresAmeliorations.length > 0) { exec.push(`{{ameliorations=${autresAmeliorations.join(' / ')}}}`); }

  if (autresSpecial.length > 0) { exec.push(`{{special=${autresSpecial.join(' / ')}}}`); }

  if (attaquesSurprises.length > 0) {
    exec.push(`{{attaqueSurprise=${attaquesSurprises.join('\n+')}}}`);
    exec.push(`{{attaqueSurpriseValue=[[${attaquesSurprisesValue.join('+')}]]}}`);
    exec.push(attaquesSurprisesCondition);
    isSurprise = true;
  }

  if (rChambreDouble !== 0) { exec.push(`{{vChambreDouble=${rChambreDouble}}}`); }

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

  let finalRoll;
  if (!pasEnergie) {
    finalRoll = await startRoll(exec.join(' '));

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

    setAttrs({
      energiePJ: resultatEnergie,
    });

    if (resultatEnergie === 0) {
      finalRoll = await startRoll(`@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=^{ranger-fusil-longbow}}} {{text=${i18n_plusEnergie}}}`);
      finishRoll(finalRoll.rollId, {});
    }
  } else {
    finalRoll = await startRoll(`@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=^{ranger-fusil-longbow}}} {{text=${i18n_pasEnergie}}}`);
    finishRoll(finalRoll.rollId, {});
  }
});
