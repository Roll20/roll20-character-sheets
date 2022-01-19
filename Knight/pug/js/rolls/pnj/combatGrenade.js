/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable no-undef */

const rollCombatGrenadePNJ = ['grenade1PNJ', 'grenade2PNJ', 'grenade3PNJ', 'grenade4PNJ', 'grenade5PNJ'];

rollCombatGrenadePNJ.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value;

    let hasDgts = true;

    if (button === 'grenade2' || button === 'grenade4') { hasDgts = false; }

    const firstExec = [];
    let exec = [];
    firstExec.push(roll);

    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    const cBase = [];
    const cRoll = [];
    const bonus = [];

    let AE = 0;

    let ameliorations = false;
    let isSurprise = false;
    let isDestructeur = false;
    let isMeurtrier = false;
    let isUltraviolence = false;

    let diceDegats = 3;
    let diceViolence = 3;

    const bDegats = 0;
    const bViolence = 0;

    const listAttrs = [
      'jetModifDes',
      'aspectPNJGrenade',
      'Masque',
      'capaciteFanMade',
      'attaqueOmbre',
      'grenadeAvancee',
    ];

    const attrs = await getAttrsAsync(listAttrs);
    let attrsAspect = [];

    const mod = +attrs.jetModifDes;

    if (attrs.grenadeAvancee !== '0') { ameliorations = true; }

    const vMasque = +attrs.Masque;

    const aspect = attrs.aspectPNJGrenade || '0';

    let aspectNom = '';

    const attaquesSurprises = [];
    const attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = '';

    const capacitesFM = attrs.capaciteFanMade;
    const attaquesOmbres = attrs.attaqueOmbre;

    const autresEffets = [];

    if (aspect !== '0') {
      aspectNom = aspect.slice(2, -1);

      attrsAspect = await getAttrsAsync([
        aspectNom,
        `${aspectNom}PNJAE`,
        `${aspectNom}PNJAEMaj`,
      ]);

      const aspectValue = +attrsAspect[aspectNom];
      AE = totalAspect(attrsAspect, aspectNom);

      cBase.push(AspectNom[aspectNom]);
      cRoll.push(aspectValue);

      exec.push(`{{vAE=${AE}}}`);
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

    // GESTION DES EFFETS

    switch (button) {
      case 'grenade1PNJ':
        isConditionnelD = true;
        isConditionnelV = true;

        firstExec.push('{{ultraviolenceValue=[[2D6]]}} {{meurtrierValue=[[2D6]]}}');

        exec.push(`{{ultraviolence=${i18n_ultraviolence}}} {{ultraviolenceCondition=${i18n_ultraviolenceCondition}}} {{meurtrier=${i18n_meurtrier}}} {{meurtrierCondition=${i18n_meurtrierCondition}}}`);
        autresEffets.push(`${i18n_dispersion} 6`);

        isUltraviolence = true;
        isMeurtrier = true;
        break;
      case 'grenade2PNJ':
        isConditionnelA = true;

        exec.push(`{{choc=${i18n_choc} 1}} {{chocCondition=${i18n_chocCondition}}}`);
        autresEffets.push(`${i18n_barrage} 2`);
        autresEffets.push(`${i18n_lumiere} 2`);
        autresEffets.push(`${i18n_dispersion} 6`);
        break;
      case 'grenade3PNJ':
        isConditionnelD = true;

        firstExec.push('{{destructeurValue=[[2D6]]}}');

        exec.push(`{{destructeur=${i18n_destructeur}}} {{destructeurCondition=${i18n_destructeurCondition}}}`);
        autresEffets.push(`${i18n_perceArmure} 20`);
        autresEffets.push(`${i18n_penetrant} 6`);
        autresEffets.push(`${i18n_dispersion} 6`);

        isDestructeur = true;
        break;
      case 'grenade4PNJ':
        isConditionnelA = true;

        exec.push(`{{parasitage=${i18n_parasitage} 2}} {{parasitageCondition=${i18n_parasitageCondition}}}`);
        autresEffets.push(`${i18n_dispersion} 6`);
        hasDgts = false;
        break;
      case 'grenade5PNJ':
        isConditionnelA = true;

        exec.push(`{{choc=${i18n_choc} 1}} {{chocCondition=${i18n_chocCondition}}} {{grenadeExplosive=${i18n_surVehicule}}} {{grenadeExplosiveD=[[3D6]]}}`);
        autresEffets.push(i18n_antiVehicule);
        autresEffets.push(`${i18n_dispersion} 3`);
        break;
      default:
        isConditionnelA = false;
        break;
    }

    if (attaquesOmbres !== '0' && capacitesFM !== '0') {
      isConditionnelD = true;

      attaquesSurprises.push(i18n_attaquesOmbres);
      attaquesSurprisesValue.push(vMasque);

      if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
    }

    // FIN GESTION DES EFFETS

    if (cRoll.length === 0) { cRoll.push(0); }

    if (bonus.length === 0) { bonus.push(0); }

    bonus.push(AE);

    if (hasDgts) {
      if (diceDegats < 0) { diceDegats = 0; }

      if (diceViolence < 0) { diceViolence = 0; }

      exec.push(`{{degats=[[${diceDegats}D6+${bDegats}]]}}`);
      exec.push(`{{violence=[[${diceViolence}D6+${bViolence}]]}}`);
    }

    if (cBase.length !== 0) { exec.push(`{{cBase=${cBase.join(' - ')}}}`); }

    const jet = `{{jet=[[ {{[[{${cRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

    firstExec.push(jet);
    exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);
    exec.push(`{{bonus=[[${bonus.join('+')}]]}}`);

    if (attaquesSurprises.length > 0 && hasDgts) {
      exec.push(`{{attaqueSurprise=${attaquesSurprises.join('\n+')}}}`);
      exec.push(`{{attaqueSurpriseValue=[[${attaquesSurprisesValue.join('+')}]]}}`);
      exec.push(`${attaquesSurprisesCondition}`);

      isSurprise = true;
    }

    if (autresEffets.length > 0) {
      autresEffets.sort();
      exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
    }

    if (isConditionnelA) { exec.push('{{succesConditionnel=true}}'); }

    if (isConditionnelD && hasDgts) { exec.push('{{degatsConditionnel=true}}'); }

    if (isConditionnelV && hasDgts) { exec.push('{{violenceConditionnel=true}}'); }

    exec = firstExec.concat(exec);

    // ROLL
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
