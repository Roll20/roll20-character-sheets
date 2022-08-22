/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
const rollCombatDistancePNJ = ['pSDistancePNJ', 'mEDistancePNJ', 'repeating_armeDist:armedistancepnj'];

rollCombatDistancePNJ.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value;

    let firstExec = [];
    let exec = [];
    firstExec.push(roll);

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
    let id = '';
    let name = '';
    let portee = '';

    let dEffets = [];
    let dEffetsValue = [];
    let AA = [];
    let AAValue = [];
    let special = [];
    let specialValue = [];

    let AE = 0;

    let diceDegats = 0;
    let diceViolence = 0;

    let bDegats = 0;
    let bViolence = 0;

    switch (button) {
      case 'pSDistancePNJ':
        name = i18n_pistoletService;

        prefix = 'pS';

        dEffets = wpnEffects.map((a) => `${prefix}${a}`);
        dEffetsValue = wpnEffectsValue.map((a) => `${prefix}${a}`);
        AA = wpnAmeliorationA.map((a) => `${prefix}${a}`);
        AAValue = wpnAmeliorationAValue.map((a) => `${prefix}${a}`);
        special = wpnSpecial.map((a) => `${prefix}${a}`);
        specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

        listAttrs.push('pSAspectPNJ');

        diceDegats = 2;
        bDegats = 6;

        diceViolence = 1;

        listAttrs = listAttrs.concat(dEffets, dEffetsValue, AA, AAValue, special, specialValue);
        break;

      case 'mEDistancePNJ':
        name = i18n_marteauEpieuD;

        prefix = 'mE';

        dEffets = wpnEffects.map((a) => `${prefix}${a}`);
        dEffetsValue = wpnEffectsValue.map((a) => `${prefix}${a}`);
        AA = wpnAmeliorationA.map((a) => `${prefix}${a}`);
        AAValue = wpnAmeliorationAValue.map((a) => `${prefix}${a}`);
        special = wpnSpecial.map((a) => `${prefix}${a}`);
        specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

        listAttrs.push('mEAspectPNJ');

        diceDegats = 3;
        bDegats = 12;

        diceViolence = 3;
        bViolence = 12;

        listAttrs = listAttrs.concat(dEffets, dEffetsValue, AA, AAValue, special, specialValue);
        break;

      case 'repeating_armeDist:armedistancepnj':
        id = info.triggerName.split('_')[2];

        prefix = `repeating_armeDist_${id}_`;

        dEffets = wpnEffects.map((a) => `${prefix}${a}`);
        dEffetsValue = wpnEffectsValue.map((a) => `${prefix}${a}`);
        AA = wpnAmeliorationA.map((a) => `${prefix}${a}`);
        AAValue = wpnAmeliorationAValue.map((a) => `${prefix}${a}`);
        special = wpnSpecial.map((a) => `${prefix}${a}`);
        specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

        listAttrs.push(`${prefix}AspectPNJ`);
        listAttrs.push(`${prefix}ArmeDist`);
        listAttrs.push(`${prefix}armeDistPortee`);

        listAttrs.push(`${prefix}armeDistDegat`);
        listAttrs.push(`${prefix}armeDistBDegat`);

        listAttrs.push(`${prefix}armeDistViolence`);
        listAttrs.push(`${prefix}armeDistBViolence`);

        listAttrs = listAttrs.concat(dEffets, dEffetsValue, AA, AAValue, special, specialValue);
        break;

      case 'repeating_armeDistVehicule:armedistancepnj':
        id = info.triggerName.split('_')[2];

        prefix = `repeating_armeDistVehicule_${id}_`;

        dEffets = wpnEffects.map((a) => `${prefix}${a}`);
        dEffetsValue = wpnEffectsValue.map((a) => `${prefix}${a}`);
        AA = wpnAmeliorationA.map((a) => `${prefix}${a}`);
        AAValue = wpnAmeliorationAValue.map((a) => `${prefix}${a}`);
        special = wpnSpecial.map((a) => `${prefix}${a}`);
        specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

        listAttrs.push(`${prefix}aspectPNJ`);
        listAttrs.push(`${prefix}ArmeDist`);
        listAttrs.push(`${prefix}armeDistPortee`);

        listAttrs.push(`${prefix}armeDistDegat`);
        listAttrs.push(`${prefix}armeDistBDegat`);

        listAttrs.push(`${prefix}armeDistViolence`);
        listAttrs.push(`${prefix}armeDistBViolence`);

        listAttrs = listAttrs.concat(dEffets, dEffetsValue, AA, AAValue, special, specialValue);
        break;

      default:
        name = '';

        prefix = '';

        dEffets = [];
        dEffetsValue = [];
        AA = [];
        AAValue = [];
        special = [];
        specialValue = [];

        diceDegats = 0;
        bDegats = 0;

        diceViolence = 0;

        listAttrs = listAttrs.concat(dEffets, dEffetsValue, AA, AAValue, special, specialValue);
        break;
    }

    const attrs = await getAttrsAsync(listAttrs);
    let attrsAspect = [];

    const vChair = +attrs.Chair;
    const vMachine = +attrs.Machine;
    const vMachineAE = totalAspect(attrs, 'Machine');
    const vMasque = +attrs.Masque;
    const vMasqueAE = totalAspect(attrs, 'Masque');

    let aspect = attrs[`${prefix}AspectPNJ`] || '0';

    if (button === 'repeating_armeDist:armedistancepnj' || button === 'repeating_armeDistVehicule:armedistancepnj') {
      const dName = attrs[`${prefix}ArmeDist`] || '';
      const dPortee = attrs[`${prefix}armeDistPortee`] || '^{portee-contact}';

      name = `{{special1=${dName}}}`;
      portee = `{{portee=^{portee} ${dPortee}}}`;

      diceDegats = Number(attrs[`${prefix}armeDistDegat`]) || 0;
      bDegats = Number(attrs[`${prefix}armeDistBDegat`]) || 0;

      diceViolence = Number(attrs[`${prefix}armeDistViolence`]) || 0;
      bViolence = Number(attrs[`${prefix}armeDistBViolence`]) || 0;

      exec.push(name);
      exec.push(portee);
    }

    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    const cBase = [];
    const cRoll = [];
    let bonus = [];

    const mod = +attrs.jetModifDes;

    let aspectNom = '';
    let AEValue = 0;

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = '';

    const capacitesFM = attrs.capaciteFanMade;
    const attaquesOmbres = attrs.attaqueOmbre;

    let eASAssassin = '';
    let eASAssassinValue = 0;

    let isAssistantAttaque = false;
    let isAntiAnatheme = false;
    let isCadence = false;
    let sCadence = 0;
    let vCadence = 0;
    let isDestructeur = false;
    let isMeurtrier = false;
    let nowSilencieux = false;
    let isObliteration = false;
    let isTenebricide = false;
    let isTirRafale = false;
    let isChambreDouble = false;
    let isSurprise = false;
    let isUltraviolence = false;
    let isFureur = false;

    let pasEnergie = false;
    let sEnergieText = '';
    const energie = attrs.energiePNJ;

    let autresEffets = [];
    let autresAmeliorationsA = [];
    const autresSpecial = [];

    if (aspect !== '0') {
      aspectNom = aspect.slice(2, -1);

      attrsAspect = await getAttrsAsync([
        aspectNom,
        `${aspectNom}PNJAE`,
        `${aspectNom}PNJAEMaj`,
      ]);

      aspectValue = +attrsAspect[aspectNom];
      AEValue = totalAspect(attrsAspect, aspectNom);
      aspect = `{{cBase=${AspectNom[aspectNom]}}}`;

      cRoll.push(aspectValue);
      AE += AEValue;
      exec.push(aspect);
      exec.push(`{{vAE=${AEValue}}}`);
    }

    if (mod !== 0) {
      cRoll.push(mod);
      exec.push(`{{mod=${mod}}}`);
    }

    // GESTION DES EFFETS
    const effets = getWeaponsEffectsPNJ(prefix, attrs, false, vChair, vMachine, vMachineAE, vMasque, vMasqueAE);

    bDegats += Number(effets.bDegats);
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

    isDestructeur = effets.isDestructeur;
    vDestructeur = effets.vDestructeur;

    isLeste = effets.isLeste;

    isMeurtrier = effets.isMeurtrier;
    vMeurtrier = effets.vMeurtrier;

    nowSilencieux = effets.isSilencieux;

    isTenebricide = effets.isTenebricide;

    isObliteration = effets.isObliteration;
    isTirRafale = effets.isTirRafale;

    isFureur = effets.isFureur;
    isUltraviolence = effets.isUltraviolence;

    if (isLeste) {
      bDegats += Math.ceil(vChair / 2);
      exec.push(`{{vLeste=${vChair}}}`);
    }

    if (effets.isConditionnelA) { isConditionnelA = true; }

    if (effets.isConditionnelD) { isConditionnelD = true; }

    if (effets.isConditionnelV) { isConditionnelV = true; }

    if (attaquesOmbres !== '0' && capacitesFM !== '0') {
      isConditionnelD = true;

      attaquesSurprises.push(i18n_attaquesOmbres);
      attaquesSurprisesValue.push(vMasque);

      if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
    }

    // FIN GESTION DES EFFETS

    // GESTION DES AMELIORATIONS D'ARMES

    const ameliorationsA = getWeaponsDistanceAAPNJ(prefix, attrs, vMasque, vMasqueAE, isAssistantAttaque, eASAssassinValue, isCadence, vCadence, nowSilencieux, isTirRafale, isObliteration, isAntiAnatheme);

    exec = exec.concat(ameliorationsA.exec);

    bonus = bonus.concat(ameliorationsA.bonus);

    diceDegats += ameliorationsA.diceDegats;
    diceViolence += ameliorationsA.diceViolence;

    bDegats += Number(ameliorationsA.bDegats);

    attaquesSurprises = attaquesSurprises.concat(ameliorationsA.attaquesSurprises);
    attaquesSurprisesValue = attaquesSurprisesValue.concat(ameliorationsA.attaquesSurprisesValue);

    if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = ameliorationsA.attaquesSurprisesCondition; }

    if (ameliorationsA.isChambreDouble) {
      isCadence = false;
      isChambreDouble = ameliorationsA.isChambreDouble;
      sCadence = ameliorationsA.rChambreDouble;
    }

    autresEffets = autresEffets.concat(ameliorationsA.autresEffets);
    autresAmeliorationsA = autresAmeliorationsA.concat(ameliorationsA.autresAmeliorations);

    if (ameliorationsA.aASAssassin !== '') {
      eASAssassin = ameliorationsA.aASAssassin;
      eASAssassinValue = ameliorationsA.aASAssassinValue;
    }

    if (ameliorationsA.isConditionnelA) { isConditionnelA = true; }

    if (ameliorationsA.isConditionnelD) { isConditionnelD = true; }

    if (ameliorationsA.isConditionnelV) { isConditionnelV = true; }

    // FIN GESTION DES AMELIORATIONS D'ARMES

    // GESTION DES BONUS SPECIAUX

    const sBonusDegats = isApplied(attrs[`${prefix}BDDiversTotal`]);
    const sBonusDegatsD6 = attrs[`${prefix}BDDiversD6`];
    const sBonusDegatsFixe = attrs[`${prefix}BDDiversFixe`];

    const sBonusViolence = isApplied(attrs[`${prefix}BVDiversTotal`]);
    const sBonusViolenceD6 = attrs[`${prefix}BVDiversD6`];
    const sBonusViolenceFixe = attrs[`${prefix}BVDiversFixe`];

    const sEnergie = isApplied(attrs[`${prefix}energie`]);
    const sEnergieValue = attrs[`${prefix}energieValue`];
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

    if (bonus.length === 0) { bonus.push(0); }

    bonus.push(AE);

    if (cBase.length !== 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

    const jet = `{{jet=[[ {{[[{${cRoll.join('+')}-${sCadence}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

    firstExec.push(jet);
    exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);
    exec.push(`{{bonus=[[${bonus.join('+')}]]}}`);

    if (diceDegats < 0) { diceDegats = 0; }

    if (diceViolence < 0) { diceViolence = 0; }

    exec.push(`{{degats=[[${diceDegats}D6+${bDegats}]]}}`);
    exec.push(`{{violence=[[${diceViolence}D6+${bViolence}]]}}`);

    if (isObliteration) {
      let ASObliteration = [];
      let ASValueObliteration = [];

      diceDegatsObliteration = diceDegats * 6;

      degatsFObliteration = bDegats;

      const vObliteration = diceDegatsObliteration + degatsFObliteration;

      exec.push(`{{obliterationValue=${vObliteration}}}`);

      if (isMeurtrier) { exec.push(`{{obliterationMeurtrierValue=${2 * 6}}}`); }

      if (isDestructeur) { exec.push(`{{obliterationDestructeurValue=${2 * 6}}}`); }

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

        exec.push(`{{obliterationAS=${ASTenebricide.join('\n+')}}}`);
        exec.push(`{{obliterationASValue=${_.reduce(ASValueObliteration, (n1, n2) => n1 + n2, 0)}}}`);
      }
    }

    if (isCadence) {
      exec.push(`{{rCadence=${i18n_cadence} ${vCadence} ${i18n_inclus}}}`);
      exec.push(`{{vCadence=${sCadence}D}}`);
    }

    if (isChambreDouble) {
      exec.push(`{{rCadence=${i18n_chambreDouble} (${i18n_cadence} 2) ${i18n_inclus}}}`);
      exec.push(`{{vCadence=${sCadence}D}}`);
    }

    if (eASAssassinValue > 0) {
      attaquesSurprises.unshift(eASAssassin);
      attaquesSurprisesValue.unshift(`${eASAssassinValue}D6`);
    }

    if (attaquesSurprises.length > 0) {
      isSurprise = true;

      exec.push(`{{attaqueSurprise=${attaquesSurprises.join('\n+')}}}`);
      exec.push(`{{attaqueSurpriseValue=[[${attaquesSurprisesValue.join('+')}]]}}`);
      exec.push(attaquesSurprisesCondition);
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
    }

    if (autresEffets.length > 0) {
      autresEffets.sort();
      exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
    }

    if (autresAmeliorationsA.length > 0) {
      autresAmeliorationsA.sort();
      exec.push(`{{ameliorations=${autresAmeliorationsA.join(' / ')}}}`);
    }

    if (autresSpecial.length > 0) {
      autresSpecial.sort();
      exec.push(`{{special=${autresSpecial.join(' / ')}}}`);
    }

    if (isConditionnelA) { exec.push('{{succesConditionnel=true}}'); }

    if (isConditionnelD) { exec.push('{{degatsConditionnel=true}}'); }

    if (isConditionnelV) { exec.push('{{violenceConditionnel=true}}'); }

    if (effets.exec) { exec = exec.concat(effets.exec); }

    if (effets.firstExec) { firstExec = firstExec.concat(effets.firstExec); }

    exec = firstExec.concat(exec);

    // ROLL
    let finalRoll;

    if (pasEnergie === false) {
      finalRoll = await startRoll(exec.join(' '));
      const tJet = finalRoll.results.jet.result;

      const tBonus = finalRoll.results.bonus.result;
      const tExploit = finalRoll.results.Exploit.result;

      const rDegats = finalRoll.results.degats.dice;
      const rViolence = finalRoll.results.violence.dice;

      const tDegats = finalRoll.results.degats.result;
      const tViolence = finalRoll.results.violence.result;

      const conditions = {
        isTenebricide,
        isSurprise,
        isDestructeur,
        isFureur,
        isMeurtrier,
        isUltraviolence,
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
          const noEnergieRoll = await startRoll(`@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${name}}} {{text=${sEnergieText}}}`);
          finishRoll(noEnergieRoll.rollId, {});
        }
      }
    } else {
      finalRoll = await startRoll(`@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${name}}} {{text=${sEnergieText}}}`);
      finishRoll(finalRoll.rollId, {});
    }
  });
});
