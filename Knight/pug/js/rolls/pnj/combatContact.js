/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
const rollCombatPNJContact = ['pSContactPNJ', 'mEContactPNJ', 'repeating_armeCaC:armecontactpnj'];

rollCombatPNJContact.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value;

    let firstExec = [];
    let exec = [];

    let listAttrs = [
      'jetModifDes',
      'energiePNJ',
      'Chair',
      'Bete',
      'BetePNJAE',
      'BetePNJAEMaj',
      'Machine',
      'MachinePNJAE',
      'MachinePNJAEMaj',
      'Masque',
      'MasquePNJAE',
      'MasquePNJAEMaj',
      'capaciteFanMade',
      'attaqueOmbre',
    ];

    let prefix = '';
    let name = '';
    let id = '';

    let effets = [];
    let effetsValue = [];
    let AS = [];
    let AO = [];
    let special = [];
    let specialValue = [];

    let vBeteD = 0;

    let diceDegats = 0;
    let bDegats = 0;
    let addChair = 0;

    let diceViolence = 0;
    let bViolence = 0;

    let portee = '';

    let aspectValue = 0;
    let AEValue = 0;

    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    const cRoll = [];
    let bonus = [];
    let autresEffets = [];
    let autresAmeliorationsS = [];
    let autresAmeliorationsO = [];
    const autresSpecial = [];

    let eASAssassin = '';
    let eASAssassinValue = 0;

    let isObliteration = false;
    let isTenebricide = false;

    let isAntiAnatheme = false;
    let isAssistanceAttaque = false;
    let isChoc = false;
    let isDestructeur = false;
    let isLeste = false;
    let isMeurtrier = false;
    let isOrfevrerie = false;
    let isSilencieux = false;

    let isFureur = false;
    let isUltraviolence = false;
    let isSurprise = false;

    let isCadence = false;
    let rCadence = '0';
    let vCadence = 0;

    let isChromee = false;

    let isArmeAzurine = false;
    let vArmeAzurine = 0;

    let isArmeRougeSang = false;
    let vArmeRougeSang = 0;

    let isCheneSculpte = false;
    let vCheneSculpte = 0;

    let isGriffureGravee = false;
    let vGriffureGravee = 0;

    let isMasqueBrise = false;
    let vMasqueBrise = 0;

    let isRouagesCasses = false;
    let vRouagesCasses = 0;

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = '';

    switch (button) {
      case 'pSContactPNJ':
        prefix = 'pSC';

        effets = wpnEffects.map((a) => `${prefix}${a}`);
        effetsValue = wpnEffectsValue.map((a) => `${prefix}${a}`);
        AS = wpnAmeliorationS.map((a) => `${prefix}${a}`);
        AO = wpnAmeliorationO.map((a) => `${prefix}${a}`);
        special = wpnSpecial.map((a) => `${prefix}${a}`);
        specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

        name = `{{special1=${i18n_couteauService}}}`;

        diceDegats = 1;

        bViolence = 1;

        portee = '{{portee=^{portee} ^{portee-contact}}}';

        listAttrs.push('pSCAspectPNJ');
        listAttrs.push('pSCAddChair');

        listAttrs = listAttrs.concat(effets, effetsValue, AS, AO, special, specialValue);
        break;

      case 'mEContactPNJ':
        prefix = 'mEC';

        effets = wpnEffects.map((a) => `${prefix}${a}`);
        effetsValue = wpnEffectsValue.map((a) => `${prefix}${a}`);
        AS = wpnAmeliorationS.map((a) => `${prefix}${a}`);
        AO = wpnAmeliorationO.map((a) => `${prefix}${a}`);
        special = wpnSpecial.map((a) => `${prefix}${a}`);
        specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

        name = `{{special1=${i18n_marteauEpieuC}}}`;

        diceDegats = 3;

        diceViolence = 1;

        portee = '{{portee=^{portee} ^{portee-contact}}}';

        listAttrs.push('mECAspectPNJ');
        listAttrs.push('mECAddChair');

        listAttrs = listAttrs.concat(effets, effetsValue, AS, AO, special, specialValue);
        break;

      case 'repeating_armeCaC:armecontactpnj':
        id = info.triggerName.split('_')[2];

        prefix = `repeating_armeCaC_${id}_`;

        effets = wpnEffects.map((a) => `${prefix}${a}`);
        effetsValue = wpnEffectsValue.map((a) => `${prefix}${a}`);
        AS = wpnAmeliorationS.map((a) => `${prefix}${a}`);
        AO = wpnAmeliorationO.map((a) => `${prefix}${a}`);
        special = wpnSpecial.map((a) => `${prefix}${a}`);
        specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

        listAttrs.push(`${prefix}ArmeCaC`);
        listAttrs.push(`${prefix}AspectPNJ`);
        listAttrs.push(`${prefix}armeCaCPortee`);

        listAttrs.push(`${prefix}armeCaCDegat`);
        listAttrs.push(`${prefix}armeCaCBDegat`);
        listAttrs.push(`${prefix}addChair`);
        listAttrs.push(`${prefix}armeCaCViolence`);
        listAttrs.push(`${prefix}armeCaCBViolence`);

        listAttrs = listAttrs.concat(effets, effetsValue, AS, AO, special, specialValue);
        break;

      default:
        prefix = '';

        effets = [];
        effetsValue = [];
        AS = [];
        AO = [];
        special = [];
        specialValue = [];

        name = '';

        diceDegats = 0;

        diceViolence = 0;

        portee = '';

        listAttrs = listAttrs.concat(effets, effetsValue, AS, AO, special, specialValue);
        break;
    }

    const attrs = await getAttrsAsync(listAttrs);

    const capacitesFM = attrs.capaciteFanMade;
    const attaquesOmbres = attrs.attaqueOmbre;

    const mod = +attrs.jetModifDes;
    const energie = +attrs.energiePNJ;

    const vChair = +attrs.Chair;
    const vBete = +attrs.Bete;
    const vBeteAEMin = +attrs.BetePNJAE;
    const vBeteAEMaj = +attrs.BetePNJAEMaj;
    const vMachine = +attrs.Machine;
    const vMachineAE = totalAspect(attrs, 'Machine');
    const vMasque = +attrs.Masque;
    const vMasqueAE = totalAspect(attrs, 'Masque');

    const aBase = attrs[`${prefix}AspectPNJ`] || '0';
    let aspect = '0';

    if (button === 'repeating_armeCaC:armecontactpnj') {
      const dName = attrs[`${prefix}ArmeCaC`] || '';
      const dPortee = attrs[`${prefix}armeCaCPortee`] || '^{portee-contact}';

      name = `{{special1=${dName}}}`;
      portee = `{{portee=^{portee} ${dPortee}}}`;

      diceDegats = Number(attrs[`${prefix}armeCaCDegat`]) || 0;
      bDegats = Number(attrs[`${prefix}armeCaCBDegat`]) || 0;
      addChair = isApplied(attrs[`${prefix}addChair`]);

      diceViolence = Number(attrs[`${prefix}armeCaCViolence`]) || 0;
      bViolence = Number(attrs[`${prefix}armeCaCBViolence`]) || 0;
    } else { addChair = isApplied(attrs[`${prefix}AddChair`]); }

    firstExec.push(roll);
    exec.push(portee);
    exec.push(name);

    let attrsAspect = [];

    if (aBase !== '0') {
      aspect = aBase.slice(2, -1);

      attrsAspect = await getAttrsAsync([
        aspect,
        `${aspect}PNJAE`,
        `${aspect}PNJAEMaj`,
      ]);

      aspectValue = +attrsAspect[aspect];
      AEValue = totalAspect(attrsAspect, aspect);
      aspect = `{{cBase=${AspectNom[aspect]}}}`;

      cRoll.push(aspectValue);
      exec.push(aspect);
    }

    if (mod !== 0) {
      cRoll.push(mod);
      exec.push(`{{mod=[[${mod}]]}}`);
    }

    if (vChair > 0 && addChair === '1') {
      const vChairD = Math.ceil(vChair / 2);

      bDegats += vChairD;
      exec.push(`{{vChair=${vChairD}}}`);
    }

    // GESTION DES ASPECTS EXCEPTIONNELS

    if (vBeteAEMin > 0 || vBeteAEMaj > 0) {
      bDegats += vBeteAEMin;
      bDegats += vBeteAEMaj;

      vBeteD += vBeteAEMin;
      vBeteD += vBeteAEMaj;
    }

    if (vBeteAEMaj > 0) {
      bDegats += vBete;
      vBeteD += vBete;
    }

    if (vBeteD > 0) { exec.push(`{{vBeteD=${vBeteD}}}`); }

    // FIN GESTION DES ASPECTS EXCEPTIONNELS

    // GESTION DES EFFETS

    const rEffets = getWeaponsEffectsPNJ(prefix, attrs, addChair, vChair, vMachine, vMachineAE, vMasque, vMasqueAE);

    firstExec = firstExec.concat(rEffets.firstExec);
    exec = exec.concat(rEffets.exec);

    eASAssassin = rEffets.eASAssassin;
    eASAssassinValue = rEffets.eASAssassinValue;

    isObliteration = rEffets.isObliteration;
    isTenebricide = rEffets.isTenebricide;

    isAntiAnatheme = rEffets.isAntiAnatheme;
    isAssistanceAttaque = rEffets.isAssistanceAttaque;
    isChoc = rEffets.isChoc;
    isDestructeur = rEffets.isDestructeur;
    isLeste = rEffets.isLeste;
    isMeurtrier = rEffets.isMeurtrier;
    isOrfevrerie = rEffets.isOrfevrerie;
    isSilencieux = rEffets.isSilencieux;
    isUltraviolence = rEffets.isUltraviolence;
    isFureur = rEffets.isFureur;

    isCadence = rEffets.isCadence;
    rCadence = rEffets.rCadence || '0';
    vCadence = rEffets.vCadence;

    attaquesSurprises = attaquesSurprises.concat(rEffets.attaquesSurprises);
    attaquesSurprisesValue = attaquesSurprisesValue.concat(rEffets.attaquesSurprisesValue);
    attaquesSurprisesCondition = rEffets.attaquesSurprisesCondition;

    bDegats += Number(rEffets.bDegats);

    autresEffets = autresEffets.concat(rEffets.autresEffets);

    if (rEffets.isConditionnelA) { isConditionnelA = true; }

    if (rEffets.isConditionnelD) { isConditionnelD = true; }

    if (rEffets.isConditionnelV) { isConditionnelV = true; }

    if (attaquesOmbres !== '0' && capacitesFM !== '0') {
      isConditionnelD = true;

      attaquesSurprises.push(i18n_attaquesOmbres);
      attaquesSurprisesValue.push(vMasque);

      if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
    }

    // FIN GESTION DES EFFETS

    // GESTION DES AMELIORATIONS STRUCTURELLES

    const rAS = getWeaponsContactASPNJ(prefix, attrs, isAssistanceAttaque, isChoc, isLeste, isMeurtrier, isOrfevrerie, isSilencieux, vBete, vChair, vMasque, vMasqueAE);

    exec = exec.concat(rAS.exec);

    bonus = bonus.concat(rAS.bAttaque);
    diceDegats += Number(rAS.diceDegats);
    bDegats += Number(rAS.bDegats);

    attaquesSurprises = attaquesSurprises.concat(rAS.attaquesSurprises);
    attaquesSurprisesValue = attaquesSurprisesValue.concat(rAS.attaquesSurprisesValue);

    if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = rAS.attaquesSurprisesCondition; }

    autresAmeliorationsS = autresAmeliorationsS.concat(rAS.autresAmeliorations);

    if (rAS.isConditionnelA) { isConditionnelA = true; }

    if (rAS.isConditionnelD) { isConditionnelD = true; }

    if (rAS.isConditionnelV) { isConditionnelV = true; }

    // FIN GESTION DES AMELIORATIONS STRUCTURELLES

    // GESTION DES AMELIORATIONS ORNEMENTALLES
    const rAO = getWeaponsContactAOPNJ(prefix, attrs, isCadence, vCadence, isObliteration, isAntiAnatheme);

    firstExec = firstExec.concat(rAO.firstExec);
    exec = exec.concat(rAO.exec);

    diceDegats += Number(rAO.diceDegats);
    bDegats += Number(rAO.bDegats);

    diceViolence += rAO.diceViolence;

    if (rAO.vCadence > 0) {
      isCadence = false;
      rCadence = rAO.rCadence;
      vCadence = rAO.vCadence;
    }

    if (rAO.isObliteration) { isObliteration = true; }

    isChromee = rAO.isChromee;
    isCraneRieur = rAO.isCraneRieur;

    isArmeAzurine = rAO.isArmeAzurine;
    vArmeAzurine = rAO.vArmeAzurine;

    isArmeRougeSang = rAO.isArmeRougeSang;
    vArmeRougeSang = rAO.vArmeRougeSang;

    isCheneSculpte = rAO.isCheneSculpte;
    vCheneSculpte = rAO.vCheneSculpte;

    isGriffureGravee = rAO.isGriffureGravee;
    vGriffureGravee = rAO.vGriffureGravee;

    isMasqueBrise = rAO.isMasqueBrise;
    vMasqueBrise = rAO.vMasqueBrise;

    isRouagesCasses = rAO.isRouagesCasses;
    vRouagesCasses = rAO.vRouagesCasses;

    autresAmeliorationsO = autresAmeliorationsO.concat(rAO.autresAmeliorations);

    if (rAO.isConditionnelA) { isConditionnelA = true; }

    if (rAO.isConditionnelD) { isConditionnelD = true; }

    if (rAO.isConditionnelV) { isConditionnelV = true; }

    // FIN GESTION DES AMELIORATIONS ORNEMENTALLES

    // GESTION DES BONUS SPECIAUX

    const sBonusDegats = isApplied(attrs[`${prefix}BDDiversTotal`]);
    const sBonusDegatsD6 = attrs[`${prefix}BDDiversD6`];
    const sBonusDegatsFixe = attrs[`${prefix}BDDiversFixe`];

    const sBonusViolence = isApplied(attrs[`${prefix}BVDiversTotal`]);
    const sBonusViolenceD6 = attrs[`${prefix}BVDiversD6`];
    const sBonusViolenceFixe = attrs[`${prefix}BVDiversFixe`];

    const sEnergie = isApplied(attrs[`${prefix}energie`]);
    const sEnergieValue = attrs[`${prefix}energieValue`];
    let sEnergieText = '';
    let pasEnergie = false;
    let newEnergie = 0;

    if (sBonusDegats) {
      exec.push(`{{vMSpecialD=+${sBonusDegatsD6}D6+${sBonusDegatsFixe}}}`);
      diceDegats += Number(sBonusDegatsD6);
      bDegats += Number(sBonusDegatsFixe);
    }

    if (sBonusViolence) {
      exec.push(`{{vMSpecialV=+${sBonusViolenceD6}D6+${sBonusViolenceFixe}}}`);
      diceViolence += Number(sBonusViolenceD6);
      bViolence += Number(sBonusViolenceFixe);
    }

    if (sEnergie) {
      autresSpecial.push(`${i18n_energieRetiree} (${sEnergieValue})`);

      newEnergie = Number(energie) - Number(sEnergieValue);

      if (newEnergie === 0) {
        sEnergieText = i18n_plusEnergie;
      } else if (newEnergie < 0) {
        newEnergie = 0;
        sEnergieText = i18n_pasEnergie;
        pasEnergie = true;
      }

      exec.push(`{{energieR=${newEnergie}}}`);
    }

    // FIN DE GESTION DES BONUS SPECIAUX

    if (cRoll.length === 0) { cRoll.push(0); }

    const jet = `{{jet=[[ {{[[{${cRoll.join('+')}-${rCadence}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;
    firstExec.push(jet);

    bonus.push(AEValue);

    exec.push(`{{vAE=${AEValue}}}`);
    exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);
    exec.push(`{{bonus=[[${bonus.join('+')}]]}}`);

    if (diceDegats < 0) { diceDegats = 0; }

    if (diceViolence < 0) { diceViolence = 0; }

    firstExec.push(`{{degats=[[${diceDegats}D6+${bDegats}]]}}`);
    firstExec.push(`{{violence=[[${diceViolence}D6+${bViolence}]]}}`);

    if (isCadence) {
      exec.push(`{{rCadence=${i18n_cadence} ${vCadence} ${i18n_inclus}}}`);
      exec.push(`{{vCadence=${sCadence}D}}`);
    }

    if (isChromee) {
      exec.push(`{{rCadence=${i18n_chromee} (${i18n_cadence} ${vCadence}) ${i18n_inclus}}}`);
      exec.push(`{{vCadence=${rCadence}D}}`);
    }

    if (isObliteration) {
      let ASObliteration = [];
      let ASValueObliteration = [];

      const diceDegatsObliteration = diceDegats * 6;

      const vObliteration = diceDegatsObliteration + bDegats;

      exec.push(`{{obliterationValue=${vObliteration}}}`);

      if (isMeurtrier) { exec.push(`{{obliterationMeurtrierValue=${2 * 6}}}`); }

      if (isDestructeur) { exec.push(`{{obliterationDestructeurValue=${2 * 6}}}`); }

      if (eASAssassinValue > 0) {
        const eAssassinObliterationValue = eASAssassinValue * 6;

        ASObliteration.unshift(eASAssassin);
        ASValueObliteration.unshift(eAssassinObliterationValue);

        if (attaquesSurprises.length > 0) {
          ASObliteration = ASObliteration.concat(attaquesSurprises);
          ASValueObliteration = ASValueObliteration.concat(attaquesSurprisesValue);
        }

        exec.push(`{{obliterationAS=${ASObliteration.join('\n+')}}}`);
        exec.push(`{{obliterationASValue=${_.reduce(ASValueObliteration, (n1, n2) => n1 + n2, 0)}}}`);
      } else if (attaquesSurprises.length > 0) {
        ASObliteration = ASObliteration.concat(attaquesSurprises);
        ASValueObliteration = ASValueObliteration.concat(attaquesSurprisesValue);

        exec.push(`{{obliterationAS=${ASTenebricide.join('\n+')}}}`);
        exec.push(`{{obliterationASValue=${_.reduce(ASValueObliteration, (n1, n2) => n1 + n2, 0)}}}`);
      }

      if (isArmeAzurine) { exec.push(`{{obliterationArmeAzurineValue=${vArmeAzurine * 6}}}`); }

      if (isArmeRougeSang) { exec.push(`{{obliterationArmeRougeSangValue=${vArmeRougeSang * 6}}}`); }

      if (isCheneSculpte) { exec.push(`{{obliterationCheneSculpteValue=${vCheneSculpte * 6}}}`); }

      if (isGriffureGravee) { exec.push(`{{obliterationGriffureGraveeValue=${vGriffureGravee * 6}}}`); }

      if (isMasqueBrise) { exec.push(`{{obliterationMasqueBriseValue=${vMasqueBrise * 6}}}`); }

      if (isRouagesCasses) { exec.push(`{{obliterationRouagesCassesValue=${vRouagesCasses * 6}}}`); }
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

    firstExec = firstExec.concat(exec);

    // ROLL
    let finalRoll;

    if (pasEnergie === false) {
      finalRoll = await startRoll(firstExec.join(' '));

      const rDegats = finalRoll.results.degats.dice;
      const rViolence = finalRoll.results.violence.dice;

      const tJet = finalRoll.results.jet.result;

      const tBonus = finalRoll.results.bonus.result;
      const tExploit = finalRoll.results.Exploit.result;

      const tDegats = finalRoll.results.degats.result;
      const tViolence = finalRoll.results.violence.result;

      const conditions = {
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

      const computed = updateRoll(finalRoll, tDegats, rDegats, [bDegats], tViolence, rViolence, [bViolence], conditions);

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
        setAttrs({
          energiePNJ: newEnergie,
        });

        if (newEnergie === 0) {
          const noEnergieRoll = await startRoll(`@{jetGM} &{template:simple} {{Nom=@{name}}} {{text=${sEnergieText}}}${name}`);
          finishRoll(noEnergieRoll.rollId, {});
        }
      }
    } else if (button === 'repeating_armeCaC:armecontactpnj') {
      finalRoll = await startRoll(`@{jetGM} &{template:simple} {{Nom=@{name}}} {{text=${sEnergieText}}}${name}`);
      finishRoll(finalRoll.rollId, {});
    } else {
      finalRoll = await startRoll(`@{jetGM} &{template:simple} {{Nom=@{name}}} {{text=${sEnergieText}}}${name}`);
      finishRoll(finalRoll.rollId, {});
    }
  });
});
