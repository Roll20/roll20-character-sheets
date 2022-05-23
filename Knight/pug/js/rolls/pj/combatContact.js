/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
const rollCombatContact = ['poingContact', 'poingMAContact', 'pSContact', 'mEContact', 'repeating_armeCaC:armecontact'];

rollCombatContact.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value;
    let id = '';

    let firstExec = [];
    let exec = [];
    firstExec.push(roll);

    let hasArmure = true;
    let hasOptions = true;
    let hasSpecial = true;

    let prefix = '';
    let name = '';
    let portee = '';

    let dEffets = [];
    let dEffetsValue = [];
    let AS = [];
    let AO = [];
    let special = [];
    let specialValue = [];

    let baseDegats = 0;
    let baseViolence = 0;

    let diceDegats = 0;
    let diceViolence = 0;

    let bDegats = [];
    const bViolence = [];

    let listAttrs = [
      'force',
      `${ODValue.force}`,
      'discretion',
      `${ODValue.discretion}`,
      'dexterite',
      `${ODValue.dexterite}`,
      'tir',
      `${ODValue.tir}`,
      'combat',
      `${ODValue.combat}`,
      'energiePJ',
      'espoir',
      'devasterAnatheme',
      'bourreauTenebres',
      'equilibreBalance',
    ];

    listAttrs = listAttrs.concat(listArmure, listArmureLegende, listStyle, listBase);

    switch (button) {
      case 'poingContact':
        name = `{{special1=${i18n_coupPoing}}}`;

        prefix = 'poingC';

        listAttrs.push('poingCcaracteristique1Equipement');
        listAttrs.push('poingCcaracteristique2Equipement');
        listAttrs.push('poingCcaracteristique3Equipement');
        listAttrs.push('poingCcaracteristique4Equipement');

        baseDegats = 0;
        baseViolence = 0;

        diceDegats = 0;
        bDegats.push(0);

        diceViolence = 0;
        bViolence.push(1);

        hasOptions = false;
        hasSpecial = false;
        break;

      case 'poingMAContact':
        name = `{{special1=${i18n_coupPoing}}}`;

        prefix = 'poingMAC';

        special = wpnSpecial.map((a) => `${prefix}${a}`);
        specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

        listAttrs.push('poingMACcaracteristique1Equipement');
        listAttrs.push('poingMACcaracteristique2Equipement');
        listAttrs.push('poingMACcaracteristique3Equipement');
        listAttrs.push('poingMACcaracteristique4Equipement');

        listAttrs = listAttrs.concat(special, specialValue);

        baseDegats = 1;
        baseViolence = 0;

        diceDegats = 1;
        bDegats.push(0);

        diceViolence = 0;
        bViolence.push(1);

        hasOptions = false;
        break;

      case 'pSContact':
        name = `{{special1=${i18n_couteauService}}}`;

        prefix = 'pSC';

        dEffets = wpnEffects.map((a) => `${prefix}${a}`);
        dEffetsValue = wpnEffectsValue.map((a) => `${prefix}${a}`);
        AS = wpnAmeliorationS.map((a) => `${prefix}${a}`);
        AO = wpnAmeliorationO.map((a) => `${prefix}${a}`);
        special = wpnSpecial.map((a) => `${prefix}${a}`);
        specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

        listAttrs.push('pSCcaracteristique1Equipement');
        listAttrs.push('pSCcaracteristique2Equipement');
        listAttrs.push('pSCcaracteristique3Equipement');
        listAttrs.push('pSCcaracteristique4Equipement');
        listAttrs.push('pSCcaracteristiqueSPrecis');

        listAttrs = listAttrs.concat(dEffets, dEffetsValue, AS, AO, special, specialValue);

        baseDegats = 1;
        baseViolence = 0;

        diceDegats = 1;
        bDegats.push(0);

        diceViolence = 0;
        bViolence.push(1);
        break;

      case 'mEContact':
        name = `{{special1=${i18n_marteauEpieuC}}}`;

        prefix = 'mEC';

        dEffets = wpnEffects.map((a) => `${prefix}${a}`);
        dEffetsValue = wpnEffectsValue.map((a) => `${prefix}${a}`);
        AS = wpnAmeliorationS.map((a) => `${prefix}${a}`);
        AO = wpnAmeliorationO.map((a) => `${prefix}${a}`);
        special = wpnSpecial.map((a) => `${prefix}${a}`);
        specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

        listAttrs.push('mECcaracteristique1Equipement');
        listAttrs.push('mECcaracteristique2Equipement');
        listAttrs.push('mECcaracteristique3Equipement');
        listAttrs.push('mECcaracteristique4Equipement');
        listAttrs.push('mECcaracteristiqueSPrecis');

        listAttrs = listAttrs.concat(dEffets, dEffetsValue, AS, AO, special, specialValue);

        baseDegats = 3;
        baseViolence = 1;

        diceDegats = 3;
        bDegats.push(0);

        diceViolence = 1;
        bViolence.push(0);
        break;

      case 'repeating_armeCaC:armecontact':
        id = info.triggerName.split('_')[2];

        prefix = `repeating_armeCaC_${id}_`;

        dEffets = wpnEffects.map((a) => `${prefix}${a}`);
        dEffetsValue = wpnEffectsValue.map((a) => `${prefix}${a}`);
        AS = wpnAmeliorationS.map((a) => `${prefix}${a}`);
        AO = wpnAmeliorationO.map((a) => `${prefix}${a}`);
        special = wpnSpecial.map((a) => `${prefix}${a}`);
        specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

        listAttrs.push(`${prefix}caracteristique1Equipement`);
        listAttrs.push(`${prefix}caracteristique2Equipement`);
        listAttrs.push(`${prefix}caracteristique3Equipement`);
        listAttrs.push(`${prefix}caracteristique4Equipement`);
        listAttrs.push(`${prefix}caracteristiqueSPrecis`);

        listAttrs.push(`${prefix}ArmeCaC`);
        listAttrs.push(`${prefix}armeCaCPortee`);

        listAttrs.push(`${prefix}armeCaCDegat`);
        listAttrs.push(`${prefix}armeCaCViolence`);

        listAttrs.push(`${prefix}armeCaCBDegat`);
        listAttrs.push(`${prefix}armeCaCBViolence`);

        listAttrs = listAttrs.concat(dEffets, dEffetsValue, AS, AO, special, specialValue);
        break;

      default:
        name = '';

        prefix = '';

        special = [];
        specialValue = [];

        listAttrs = listAttrs.concat(special, specialValue);

        baseDegats = 0;
        baseViolence = 0;

        diceDegats = 0;
        bDegats.push(0);

        diceViolence = 0;
        bViolence.push(0);

        hasOptions = false;
        break;
    }

    const attrs = await getAttrsAsync(listAttrs);

    const armure = attrs.armure;
    const armureL = attrs.armureLegende;

    const mod = +attrs.jetModifDes;
    const hasBonus = attrs.bonusCarac;

    if (button === 'repeating_armeCaC:armecontact') {
      name = attrs[`${prefix}ArmeCaC`] || '';
      portee = attrs[`${prefix}armeCaCPortee`] || '^{portee-contact}';

      exec.push(`{{special1=${name}}}`);
      exec.push(`{{portee=^{portee} ${portee}}}`);

      baseDegats = Number(attrs[`${prefix}armeCaCDegat`]) || 0;
      baseViolence = Number(attrs[`${prefix}armeCaCViolence`]) || 0;

      diceDegats = Number(attrs[`${prefix}armeCaCDegat`]) || 0;
      bDegats.push(Number(attrs[`${prefix}armeCaCBDegat`]) || 0);

      diceViolence = Number(attrs[`${prefix}armeCaCViolence`]) || 0;
      bViolence.push(Number(attrs[`${prefix}armeCaCBViolence`]) || 0);
    }

    const C1 = attrs[`${prefix}caracteristique1Equipement`] || '0';
    const C2 = attrs[`${prefix}caracteristique2Equipement`] || '0';
    const C3 = attrs[`${prefix}caracteristique3Equipement`] || '0';
    const C4 = attrs[`${prefix}caracteristique4Equipement`] || '0';
    const CPrecis = attrs[`${prefix}caracteristiqueSPrecis`] || '0';

    const attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4, CPrecis);

    const CPrecisValues = {
      nom: '0',
      base: 0,
    };

    if (attrsCarac.CO1) {
      CPrecisValues.nom = attrsCarac.CO1Nom;
      CPrecisValues.base = attrsCarac.CO1Base;
    }

    if (armure === 'sans' || armure === 'guardian') { hasArmure = false; }

    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    const cBase = [];
    const cBonus = [];
    let cRoll = [];
    let bonus = [];

    let OD = 0;

    let degats = [];
    let violence = [];

    let ODBarbarian = [];
    let ODMALBarbarian = [];
    let ODRogue = [];
    let ODMALRogue = [];
    let ODShaman = [];
    let ODMALShaman = [];
    const ODWarrior = [];
    const ODMALWarrior = [];

    const vForce = +attrs.force;
    const oForce = +attrs[`${ODValue.force}`];
    const vDiscretion = +attrs.discretion;
    const oDiscretion = +attrs[`${ODValue.discretion}`];
    const vDexterite = +attrs.dexterite;
    const oDexterite = +attrs[`${ODValue.dexterite}`];
    const vTir = +attrs.tir;
    const oTir = +attrs[`${ODValue.tir}`];
    const vCombat = +attrs.combat;
    const oCombat = +attrs[`${ODValue.combat}`];

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = '';

    let eASAssassin = '';
    let eASAssassinValue = 0;

    let isSurprise = false;
    let isAssistantAttaque = false;
    let isAntiAnatheme = false;
    let isCadence = false;
    let isChromee = false;
    let sCadence = 0;
    let vCadence = 0;
    let isChoc = false;
    let isDestructeur = false;
    let vDestructeur = 0;
    let isLeste = false;
    let isFureur = false;
    let isMeurtrier = false;
    let vMeurtrier = 0;
    let nowSilencieux = false;
    let isObliteration = false;
    let isOrfevrerie = false;
    let isTenebricide = false;
    let isUltraviolence = false;

    let isCheneSculpte = false;
    let vCheneSculpte = 0;
    let isArmeAzurine = false;
    let vArmeAzurine = 0;
    let isArmeRougeSang = false;
    let vArmeRougeSang = 0;
    let isGriffureGravee = false;
    let vGriffureGravee = 0;
    let isMasqueBrise = false;
    let vMasqueBrise = 0;
    let isRouagesCasses = false;
    let vRouagesCasses = 0;

    let lumiere = '';
    let isELumiere = false;
    let isASLumiere = false;
    let lumiereValue = 0;

    let isEAkimbo = false;
    let isEAmbidextrie = false;
    let isELourd = false;
    let isEDeuxMains = false;

    let isAAgressive = false;
    let isASoeur = false;
    let isAJumelle = false;
    let isAProtectrice = false;
    let isAAllegee = false;

    let pasEnergie = false;
    let sEnergieText = '';
    const energie = attrs.energiePJ;
    const espoir = attrs.espoir;

    const devaste = +attrs.devasterAnatheme;
    const bourreau = +attrs.bourreauTenebres;
    const equilibre = +attrs.equilibreBalance;

    let autresEffets = [];
    let autresAmeliorationsS = [];
    let autresAmeliorationsO = [];
    const autresSpecial = [];

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
    let dForce = vForce;

    if (hasArmure) { dForce += oForce * 3; }

    bDegats.push(dForce);
    exec.push(`{{vForce=${dForce}}}`);

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
    let effets = [];
    let ameliorationsS = [];
    let ameliorationsO = [];

    if (hasOptions) {
      // GESTION DES EFFETS

      effets = getWeaponsEffects(prefix, attrs, hasArmure, armure, vForce, vDexterite, oDexterite, vDiscretion, oDiscretion, vTir, oTir);

      bDegats = bDegats.concat(effets.bDegats);
      eASAssassin = effets.eASAssassin;
      eASAssassinValue = effets.eASAssassinValue;

      if (attaquesSurprisesCondition === '' && effets.attaquesSurprisesCondition !== '') { attaquesSurprisesCondition = effets.attaquesSurprisesCondition; }

      attaquesSurprises = attaquesSurprises.concat(effets.attaquesSurprises);
      attaquesSurprisesValue = attaquesSurprisesValue.concat(effets.attaquesSurprisesValue);

      autresEffets = autresEffets.concat(effets.autresEffets);

      isAntiAnatheme = effets.isAntiAnatheme;

      isAssistantAttaque = effets.isAssistantAttaque;

      isCadence = effets.isCadence;
      sCadence = effets.sCadence;
      vCadence = effets.vCadence;

      isChoc = effets.isChoc;

      isDestructeur = effets.isDestructeur;
      vDestructeur = effets.vDestructeur;

      isEDeuxMains = effets.isDeuxMains;
      isELourd = effets.isLourd;

      isLeste = effets.isLeste;

      isMeurtrier = effets.isMeurtrier;
      vMeurtrier = effets.vMeurtrier;

      nowSilencieux = effets.nowSilencieux;

      isOrfevrerie = effets.isOrfevrerie;

      isTenebricide = effets.isTenebricide;

      isObliteration = effets.isObliteration;

      isFureur = effets.isFureur;

      isUltraviolence = effets.isUltraviolence;

      lumiere = effets.eLumiere;
      isELumiere = effets.isELumiere;
      lumiereValue = Number(effets.eLumiereValue);

      isEAkimbo = effets.isAkimbo;
      isEAmbidextrie = effets.isAmbidextrie;

      if (effets.isConditionnelA) { isConditionnelA = true; }

      if (effets.isConditionnelD) { isConditionnelD = true; }

      if (effets.isConditionnelV) { isConditionnelV = true; }

      // FIN GESTION DES EFFETS

      // GESTION DES AMELIORATIONS STRUCTURELLES

      ameliorationsS = getWeaponsContactAS(prefix, attrs, hasArmure, nowSilencieux, isMeurtrier, isAssistantAttaque, isChoc, isLeste, isOrfevrerie, vForce, vDexterite, oDexterite, vDiscretion, oDiscretion, vCombat, oCombat);

      autresAmeliorationsS = autresAmeliorationsS.concat(ameliorationsS.autresAmeliorations);

      bonus = bonus.concat(ameliorationsS.bAttaque);
      baseDegats += ameliorationsS.diceDegats;
      diceDegats += ameliorationsS.diceDegats;
      bDegats = bDegats.concat(ameliorationsS.bDegats);

      isAAgressive = ameliorationsS.isAgressive;
      isASoeur = ameliorationsS.isSoeur;
      isAProtectrice = ameliorationsS.isProtectrice;
      isAJumelle = ameliorationsS.isJumelle;
      isAAllegee = ameliorationsS.isAllegee;

      if (lumiereValue >= ameliorationsS.aLumiereValue) { autresAmeliorationsS.push(ameliorationsS.aLumiere); } else if (ameliorationsS.aLumiereValue > 0) {
        lumiere = `${ameliorationsS.aLumiere} (${i18n_lumiere} ${ameliorationsS.aLumiereValue})`;
        lumiereValue = ameliorationsS.aLumiereValue;
        isASLumiere = true;
        isELumiere = false;
      }

      if (attaquesSurprisesCondition === '' && ameliorationsS.attaquesSurprisesCondition !== '') { attaquesSurprisesCondition = ameliorationsS.attaquesSurprisesCondition; }

      attaquesSurprises = attaquesSurprises.concat(ameliorationsS.attaquesSurprises);
      attaquesSurprisesValue = attaquesSurprisesValue.concat(ameliorationsS.attaquesSurprisesValue);

      if (ameliorationsS.isConditionnelA) { isConditionnelA = true; }

      if (ameliorationsS.isConditionnelD) { isConditionnelD = true; }

      if (ameliorationsS.isConditionnelV) { isConditionnelV = true; }

      // FIN GESTION DES AMELIORATIONS STRUCTURELLES

      // GESTION DES AMELIORATIONS ORNEMENTALES

      ameliorationsO = getWeaponsContactAO(prefix, attrs, isCadence, vCadence, isObliteration, isAntiAnatheme);

      if (ameliorationsO.isChromee) {
        sCadence = ameliorationsO.rCadence;
        isChromee = ameliorationsO.isChromee;
        vCadence = ameliorationsO.vCadence;
      }

      if (lumiereValue >= ameliorationsO.aLumiereValue) {
        lumiereValue += Number(ameliorationsO.aLumiereValue);
        autresAmeliorationsO.push(ameliorationsO.aLumiere);
      } else {
        lumiere = `${ameliorationsO.aLumiere} (${i18n_lumiere} ${ameliorationsO.aLumiereValue})`;
        lumiereValue = ameliorationsO.aLumiereValue;
      }

      if (isObliteration === false) { isObliteration = ameliorationsO.isObliteration; }

      if (ameliorationsO.isConditionnelA) { isConditionnelA = true; }

      if (ameliorationsO.isConditionnelD) { isConditionnelD = true; }

      if (ameliorationsO.isConditionnelV) { isConditionnelV = true; }

      isArmeAzurine = ameliorationsO.isArmeAzurine;
      vArmeAzurine = ameliorationsO.vArmeAzurine;
      isArmeRougeSang = ameliorationsO.isArmeRougeSang;
      vArmeRougeSang = ameliorationsO.vArmeRougeSang;
      isCheneSculpte = ameliorationsO.isCheneSculpte;
      vCheneSculpte = ameliorationsO.vCheneSculpte;
      isGriffureGravee = ameliorationsO.isGriffureGravee;
      vGriffureGravee = ameliorationsO.vGriffureGravee;
      isMasqueBrise = ameliorationsO.isMasqueBrise;
      vMasqueBrise = ameliorationsO.vMasqueBrise;
      isRouagesCasses = ameliorationsO.isRouagesCasses;
      vRouagesCasses = ameliorationsO.vRouagesCasses;

      autresAmeliorationsO = autresAmeliorationsO.concat(ameliorationsO.autresAmeliorations);

      baseDegats += ameliorationsO.diceDegats;
      baseViolence += ameliorationsO.diceViolence;

      diceDegats += ameliorationsO.diceDegats;
      bDegats = bDegats.concat(ameliorationsO.bDegats);
      diceViolence += ameliorationsO.diceViolence;

      // FIN GESTION DES AMELIORATIONS ORNEMENTALES
    } else if (armure === 'berserk') {
      isConditionnelD = true;
      isConditionnelV = true;

      exec.push(`{{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);

      isAntiAnatheme = true;
      isTenebricide = true;
    }

    // GESTION DU STYLE

    const getStyle = getStyleContactMod(attrs, CPrecisValues, baseDegats, baseViolence, hasArmure, oCombat, isEAkimbo, isEAmbidextrie, isAAgressive, isAJumelle, isASoeur, isAProtectrice, isEDeuxMains, isAAllegee, isELourd);

    exec = exec.concat(getStyle.exec);
    cRoll = cRoll.concat(getStyle.cRoll);
    diceDegats += getStyle.diceDegats;
    diceViolence += getStyle.diceViolence;
    autresAmeliorationsS = autresAmeliorationsS.concat(getStyle.autresAmeliorationsS);

    // FIN GESTION DU STYLE
    let sEnergie = false;
    let newEnergie = 0;

    if (hasSpecial) {
      // GESTION DES BONUS SPECIAUX

      const sBonusDegats = isApplied(attrs[`${prefix}BDDiversTotal`]);
      const sBonusDegatsD6 = attrs[`${prefix}BDDiversD6`];
      const sBonusDegatsFixe = attrs[`${prefix}BDDiversFixe`];

      const sBonusViolence = isApplied(attrs[`${prefix}BVDiversTotal`]);
      const sBonusViolenceD6 = attrs[`${prefix}BVDiversD6`];
      const sBonusViolenceFixe = attrs[`${prefix}BVDiversFixe`];

      if (button !== 'poingMAContact') { sEnergie = isApplied(attrs[`${prefix}energie`]); }

      const sEnergieValue = attrs[`${prefix}energieValue`];

      if (sBonusDegats) {
        exec.push(`{{vMSpecialD=+${sBonusDegatsD6}D6+${sBonusDegatsFixe}}}`);
        diceDegats += Number(sBonusDegatsD6);
        bDegats.push(sBonusDegatsFixe);
      }

      if (sBonusViolence) {
        exec.push(`{{vMSpecialV=+${sBonusViolenceD6}D6+${sBonusViolenceFixe}}}`);
        diceViolence += Number(sBonusViolenceD6);
        bViolence.push(sBonusViolenceFixe);
      }

      if (sEnergie) {
        if (armure === 'berserk') {
          let sEspoirValue = Math.floor((Number(sEnergieValue) / 2) - 1);

          if (sEspoirValue < 1) { sEspoirValue = 1; }

          autresSpecial.push(`${i18n_espoirRetire} (${sEspoirValue})`);

          newEnergie = Number(espoir) - Number(sEspoirValue);

          if (newEnergie === 0) {
            sEnergieText = i18n_plusEspoir;
          } else if (newEnergie < 0) {
            newEnergie = 0;
            sEnergieText = i18n_pasEspoir;
            pasEnergie = true;
          }
        } else {
          autresSpecial.push(`${i18n_energieRetiree} (${sEnergieValue})`);

          newEnergie = Number(energie) - Number(sEnergieValue);

          if (newEnergie === 0) {
            sEnergieText = i18n_plusEnergie;
          } else if (newEnergie < 0) {
            newEnergie = 0;
            sEnergieText = i18n_pasEnergie;
            pasEnergie = true;
          }
        }

        exec.push(`{{energieR=${newEnergie}}}`);
      }

      // FIN DE GESTION DES BONUS SPECIAUX
    }

    // GESTION DES BONUS D'ARMURE

    const armorBonus = getArmorBonus(attrs, armure, isELumiere, isASLumiere, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, autresEffets);

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

    const MALBonus = getMALBonus(attrs, armureL, isELumiere, isASLumiere, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, autresEffets);

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

    if (diceDegats < 0) { diceDegats = 0; }

    if (diceViolence < 0) { diceViolence = 0; }

    degats.push(`${diceDegats}D6`);
    degats = degats.concat(bDegats);

    violence.push(`${diceViolence}D6`);
    violence = violence.concat(bViolence);

    if (cBase.length !== 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

    if (cBonus.length !== 0) { exec.push(`{{cBonus=${cBonus.join(' - ')}}}`); }

    const jet = `{{jet=[[ {{[[{${cRoll.join('+')}-${sCadence}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

    firstExec.push(jet);
    exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);
    exec.push(`{{bonus=[[${bonus.join('+')}]]}}`);

    exec.push(`{{degats=[[${degats.join('+')}]]}}`);
    exec.push(`{{violence=[[${violence.join('+')}]]}}`);

    if (isObliteration) {
      let ASObliteration = [];
      let ASValueObliteration = [];

      diceDegatsObliteration = diceDegats * 6;

      degatsFObliteration = _.reduce(bDegats, (n1, n2) => Number(n1) + Number(n2));

      const vObliteration = diceDegatsObliteration + degatsFObliteration;

      exec.push(`{{obliterationValue=${vObliteration}}}`);

      if (isMeurtrier) { exec.push(`{{obliterationMeurtrierValue=${vMeurtrier * 6}}}`); }

      if (isDestructeur) { exec.push(`{{obliterationDestructeurValue=${vDestructeur * 6}}}`); }

      if (eASAssassinValue > 0) {
        eAssassinTenebricideValue = eASAssassinValue * 6;

        ASObliteration.unshift(eASAssassin);
        ASValueObliteration.unshift(eAssassinTenebricideValue);

        if (attaquesSurprises.length > 0) {
          ASObliteration = ASObliteration.concat(attaquesSurprises);
          ASValueObliteration = ASValueObliteration.concat(attaquesSurprisesValue);
        }

        exec.push(`{{obliterationAS=${ASObliteration.join('\n+')}}}`);
        exec.push(`{{obliterationASValue=${_.reduce(ASValueObliteration, (n1, n2) => n1 + n2, 0)}}}`);
      } else if (attaquesSurprises.length > 0) {
        ASObliteration = ASObliteration.concat(attaquesSurprises);
        ASValueObliteration = ASValueObliteration.concat(attaquesSurprisesValue);

        exec.push(`{{obliterationAS=${attaquesSurprises.join('\n+')}}}`);
        exec.push(`{{obliterationASValue=${_.reduce(ASValueObliteration, (n1, n2) => n1 + n2, 0)}}}`);
      }

      if (isArmeAzurine) { exec.push(`{{obliterationArmeAzurineValue=${vArmeAzurine * 6}}}`); }

      if (isArmeRougeSang) { exec.push(`{{obliterationArmeRougeSangValue=${vArmeRougeSang * 6}}}`); }

      if (isCheneSculpte) { exec.push(`{{obliterationCheneSculpteValue=${vCheneSculpte * 6}}}`); }

      if (isGriffureGravee) { exec.push(`{{obliterationGriffureGraveeValue=${vGriffureGravee * 6}}}`); }

      if (isMasqueBrise) { exec.push(`{{obliterationMasqueBriseValue=${vMasqueBrise * 6}}}`); }

      if (isRouagesCasses) { exec.push(`{{obliterationRouagesCassesValue=${vRouagesCasses * 6}}}`); }
    }

    if (isCadence) {
      exec.push(`{{rCadence=${i18n_cadence} ${vCadence} ${i18n_inclus}}}`);
      exec.push(`{{vCadence=${sCadence}D}}`);
    }

    if (isChromee) {
      exec.push(`{{rCadence=${i18n_chromee} (${i18n_cadence} ${vCadence}) ${i18n_inclus}}}`);
      exec.push(`{{vCadence=${sCadence}D}}`);
    }

    if (eASAssassinValue > 0) {
      attaquesSurprises.unshift(eASAssassin);
      attaquesSurprisesValue.unshift(`${eASAssassinValue}D6`);
    }

    if (attaquesSurprises.length > 0) {
      exec.push(`{{attaqueSurprise=${attaquesSurprises.join('\n+')}}}`);
      exec.push(`{{attaqueSurpriseValue=[[${attaquesSurprisesValue.join('+')}]]}}`);
      exec.push(attaquesSurprisesCondition);
      isSurprise = true;
    }

    if (isTenebricide) {
      exec.push(`{{tenebricide=${i18n_tenebricide}}} {{tenebricideConditionD=${i18n_tenebricideConditionD}}} {{tenebricideConditionV=${i18n_tenebricideConditionV}}}`);
      exec.push('{{tenebricideValueD=[[0]]}}');
      exec.push('{{tenebricideValueV=[[0]]}}');

      if (attaquesSurprises.length > 0) {
        exec.push(`{{tenebricideAS=${attaquesSurprises.join('\n+')}}}`);
        exec.push('{{tenebricideASValue=[[0]]}}');
      }

      if (isMeurtrier) { firstExec.push('{{tMeurtrierValue=[[0]]}}'); }
      if (isDestructeur) { firstExec.push('{{tDestructeurValue=[[0]]}}'); }
      if (isFureur) { firstExec.push('{{tFureurValue=[[0]]}}'); }
      if (isUltraviolence) { firstExec.push('{{tUltraviolenceValue=[[0]]}}'); }
      if (isCheneSculpte) { firstExec.push('{{tCheneSculpteValue=[[0]]}}'); }
    }

    if (isELumiere) { autresEffets.push(`${i18n_lumiere} ${lumiereValue}`); } else if (isASLumiere) { autresAmeliorationsS.push(lumiere); }

    if (autresEffets.length > 0) {
      autresEffets.sort();
      exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
    }

    if (autresAmeliorationsS.length > 0) {
      autresAmeliorationsS.sort();
      exec.push(`{{ameliorationsS=${autresAmeliorationsS.join(' / ')}}}`);
    }

    if (autresAmeliorationsO.length > 0) {
      autresAmeliorationsO.sort();
      exec.push(`{{ameliorationsO=${autresAmeliorationsO.join(' / ')}}}`);
    }

    if (autresSpecial.length > 0) {
      autresSpecial.sort();
      exec.push(`{{special=${autresSpecial.join(' / ')}}}`);
    }

    if (isConditionnelA) { exec.push('{{succesConditionnel=true}}'); }

    if (isConditionnelD) { exec.push('{{degatsConditionnel=true}}'); }

    if (isConditionnelV) { exec.push('{{violenceConditionnel=true}}'); }

    if (hasOptions) {
      if (effets.exec) { exec = exec.concat(effets.exec); }

      if (effets.firstExec) { firstExec = firstExec.concat(effets.firstExec); }

      if (ameliorationsS.exec) { exec = exec.concat(ameliorationsS.exec); }

      if (ameliorationsO.exec) { exec = exec.concat(ameliorationsO.exec); }

      if (ameliorationsO.firstExec) { firstExec = firstExec.concat(ameliorationsO.firstExec); }
    }

    if (devaste || bourreau || equilibre) {
      const herauts = [];

      if (devaste) { herauts.push(i18n_devasterAnatheme); }
      if (bourreau) { herauts.push(i18n_bourreauTenebres); }
      if (equilibre) { herauts.push(i18n_equilibrerBalance); }

      exec.push(`{{herauts=${herauts.join(' / ')}}}`);
    }

    exec = firstExec.concat(exec);

    // ROLL
    let finalRoll;

    if (pasEnergie === false) {
      finalRoll = await startRoll(exec.join(' '));
      const rDegats = finalRoll.results.degats.dice;
      const rViolence = finalRoll.results.violence.dice;

      const tJet = finalRoll.results.jet.result;

      const tBonus = finalRoll.results.bonus.result;
      const tExploit = finalRoll.results.Exploit.result;

      const tDegats = finalRoll.results.degats.result;
      const tViolence = finalRoll.results.violence.result;

      const conditions = {
        bourreau,
        devaste,
        equilibre,
        isTenebricide,
        isSurprise,
        isDestructeur,
        isFureur,
        isMeurtrier,
        isUltraviolence,
        isArmeAzurine,
        isArmeRougeSang,
        isCheneSculpte,
        isGriffureGravee,
        isMasqueBrise,
        isRouagesCasses,
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

      if (sEnergie !== false) {
        if (armure === 'berserk') {
          setAttrs({ espoir: newEnergie });
        } else {
          setAttrs({ energiePJ: newEnergie });
        }

        if (newEnergie === 0) {
          const noEnergieRoll = await startRoll(`@{jetGM} &{template:simple} {{Nom=@{name}}} {{text=${sEnergieText}}}${name}`);
          finishRoll(noEnergieRoll.rollId, {});
        }
      }
    } else if (button === 'repeating_armeCaC:armecontact') {
      finalRoll = await startRoll(`@{jetGM} &{template:simple} {{Nom=@{name}}} {{text=${sEnergieText}}}${name}`);
      finishRoll(finalRoll.rollId, {});
    } else {
      finalRoll = await startRoll(`@{jetGM} &{template:simple} {{Nom=@{name}}} {{text=${sEnergieText}}}${name}`);
      finishRoll(finalRoll.rollId, {});
    }
  });
  // ROLL
});
