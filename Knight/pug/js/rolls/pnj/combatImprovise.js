/* eslint-disable camelcase */
/* eslint-disable no-undef */
for (let i = 0; i < rollCombatImprovise; i += 1) {
  const str = `AIPNJ${i}`;

  // eslint-disable-next-line no-loop-func
  on(`clicked:${str}`, async (info) => {
    const roll = info.htmlAttributes.value;

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

    const listAttrs = [
      'jetModifDes',
      'utilisationArmeAIPNJ',
      'Chair',
      'ChairPNJAE',
      'ChairPNJAEMaj',
      'Bete',
      'BetePNJAE',
      'BetePNJAEMaj',
      'Machine',
      'Masque',
      'capaciteFanMade',
      'attaqueOmbre',
    ];

    const attrs = await getAttrsAsync(listAttrs);

    const exec = [];
    exec.push(roll);

    const isConditionnelA = false;
    let isConditionnelD = false;
    const isConditionnelV = false;

    const cBase = [];
    const cRoll = [];
    let bonus = [];

    const type = attrs.utilisationArmeAIPNJ;
    const mod = +attrs.jetModifDes;

    let diceDegats = dDgts;
    let diceViolence = dViolence;

    let bDegats = 0;
    const bViolence = 0;

    const aspectNom = 'Chair';

    const vChair = +attrs.Chair;
    const vChairAE = totalAspect(attrs, 'Chair');
    const vBete = +attrs.Bete;
    const vBeteAEMin = +attrs.BetePNJAE;
    const vBeteAEMaj = +attrs.BetePNJAEMaj;
    const vMasque = +attrs.Masque;

    let vBeteD = 0;

    const attaquesSurprises = [];
    const attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = '';

    const autresEffets = [];

    const aspectValue = vChair;
    const AE = vChairAE;

    cBase.push(AspectNom[aspectNom]);
    cRoll.push(aspectValue);
    exec.push(`{{vAE=${AE}}}`);

    if (mod !== 0) {
      cRoll.push(mod);
      exec.push(`{{mod=${mod}}}`);
    }

    // GESTION DES BONUS DE BASE ET ASPECTS EXCEPTIONNELS
    if (type === '&{template:combat} {{portee=^{portee-contact}}}') {
      if (vChair > 0) {
        const vChairD = Math.ceil(vChair / 2);

        bDegats += vChairD;
        exec.push(`{{vChair=${vChairD}}}`);
      }

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
    }

    // FIN GESTION DES BONUS DE BASE ET ASPECTS EXCEPTIONNELS

    const capacitesFM = attrs.capaciteFanMade;
    const attaquesOmbres = attrs.attaqueOmbre;

    if (attaquesOmbres !== '0' && capacitesFM !== '0') {
      isConditionnelD = true;

      attaquesSurprises.push(i18n_attaquesOmbres);
      attaquesSurprisesValue.push(vMasque);

      if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
    }

    if (cRoll.length === 0) { cRoll.push(0); }

    if (bonus.length === 0) { bonus.push(0); }

    bonus = bonus.concat(AE);

    if (cBase.length !== 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

    const jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

    exec.push(jet);
    exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);
    exec.push(`{{bonus=[[${bonus.join('+')}]]}}`);

    if (diceDegats < 0) { diceDegats = 0; }

    if (diceViolence < 0) { diceViolence = 0; }

    exec.push(`{{degats=[[${diceDegats}D6+${bDegats}]]}}`);
    exec.push(`{{violence=[[${diceViolence}D6+${bViolence}]]}}`);

    if (attaquesSurprises.length > 0) {
      exec.push(`{{attaqueSurprise=${attaquesSurprises.join('\n+')}}}`);
      exec.push(`{{attaqueSurpriseValue=[[${attaquesSurprisesValue.join('+')}]]}}`);
      exec.push(attaquesSurprisesCondition);
    }

    if (autresEffets.length > 0) {
      autresEffets.sort();
      exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
    }

    if (isConditionnelA) { exec.push('{{succesConditionnel=true}}'); }

    if (isConditionnelD) { exec.push('{{degatsConditionnel=true}}'); }

    if (isConditionnelV) { exec.push('{{violenceConditionnel=true}}'); }

    startRoll(exec.join(' '), (results) => {
      const tJet = results.results.jet.result;

      const tBonus = results.results.bonus.result;
      const tExploit = results.results.Exploit.result;

      finishRoll(
        results.rollId,
        {
          jet: tJet + tBonus,
        },
      );

      if (tJet !== 0 && tJet === tExploit) {
        startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}}${jet}`, (exploit) => {
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
}
