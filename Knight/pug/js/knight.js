/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable default-case */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
on('change:armure', async (newArmure) => {
  const armureName = newArmure.newValue;

  const dArmureModif = listDonneesArmures.map((a) => `${armureName}-${a}-modif`);
  const dArmureActuel = listDonneesArmures.map((a) => `${armureName}-${a}-actuel`);

  let listAttrs = ['warmaster150PG', 'warmaster250PG'];
  listAttrs = listAttrs.concat(dArmureModif, dArmureActuel);

  const attrs = await getAttrsAsync(listAttrs);

  const warmaster150 = +attrs.warmaster150PG;
  const warmaster250 = +attrs.warmaster250PG;

  const armureActuel = +attrs[`${armureName}-armure-actuel`] || 0;
  const energieActuel = +attrs[`${armureName}-energie-actuel`] || 0;

  const armureModif = +attrs[`${armureName}-armure-modif`] || 0;
  const energieModif = +attrs[`${armureName}-energie-modif`] || 0;
  const cdfModif = +attrs[`${armureName}-cdf-modif`] || 0;

  const armurePJMax = +dataArmure[armureName].armureMax || 0;
  const energiePJMax = +dataArmure[armureName].energieMax || 0;
  const cdfPJMax = +dataArmure[armureName].cdfMax || 0;

  let totalArmure = 0;
  let totalEnergie = 0;
  let totalCdf = 0;

  totalArmure = armurePJMax + armureModif;
  totalCdf = cdfPJMax + cdfModif;

  if (armureName === 'warmaster') totalEnergie = energiePJMax + warmaster150 + warmaster250 + energieModif;
  else { totalEnergie = energiePJMax + energieModif; }

  let sTete = 0;
  let sBG = 0;
  let sTorse = 0;
  let sJG = 0;
  let sBD = 0;
  let sJD = 0;

  switch (armureName) {
    case 'barbarian':
      sTete = 5;
      sBG = 5;
      sTorse = 8;
      sJG = 5;
      sBD = 5;
      sJD = 5;
      break;
    case 'bard':
      sTete = 5;
      sBG = 5;
      sTorse = 8;
      sJG = 5;
      sBD = 5;
      sJD = 5;
      break;
    case 'berserk':
      sTete = 6;
      sBG = 6;
      sTorse = 10;
      sJG = 6;
      sBD = 6;
      sJD = 6;
      break;
    case 'druid':
      sTete = 5;
      sBG = 5;
      sTorse = 8;
      sJG = 5;
      sBD = 5;
      sJD = 5;
      break;
    case 'monk':
      sTete = 7;
      sBG = 8;
      sTorse = 10;
      sJG = 6;
      sBD = 8;
      sJD = 6;
      break;
    case 'necromancer':
      sTete = 12;
      sBG = 12;
      sTorse = 12;
      sJG = 12;
      sBD = 12;
      sJD = 12;
      break;
    case 'paladin':
      sTete = 7;
      sBG = 7;
      sTorse = 10;
      sJG = 7;
      sBD = 7;
      sJD = 7;
      break;
    case 'priest':
      sTete = 5;
      sBG = 5;
      sTorse = 8;
      sJG = 5;
      sBD = 5;
      sJD = 5;
      break;
    case 'psion':
      sTete = 7;
      sBG = 10;
      sTorse = 12;
      sJG = 7;
      sBD = 10;
      sJD = 7;
      break;
    case 'ranger':
      sTete = 4;
      sBG = 4;
      sTorse = 6;
      sJG = 4;
      sBD = 4;
      sJD = 4;
      break;
    case 'rogue':
      sTete = 5;
      sBG = 5;
      sTorse = 8;
      sJG = 5;
      sBD = 5;
      sJD = 5;
      break;
    case 'shaman':
      sTete = 5;
      sBG = 5;
      sTorse = 8;
      sJG = 5;
      sBD = 5;
      sJD = 5;
      break;
    case 'sorcerer':
      sTete = 7;
      sBG = 8;
      sTorse = 10;
      sJG = 6;
      sBD = 8;
      sJD = 6;
      break;
    case 'warlock':
      sTete = 5;
      sBG = 8;
      sTorse = 8;
      sJG = 5;
      sBD = 8;
      sJD = 5;
      break;
    case 'warmaster':
      sTete = 5;
      sBG = 5;
      sTorse = 8;
      sJG = 5;
      sBD = 5;
      sJD = 5;
      break;
    case 'warrior':
      sTete = 7;
      sBG = 10;
      sTorse = 12;
      sJG = 7;
      sBD = 10;
      sJD = 7;
      break;
    case 'wizard':
      sTete = 5;
      sBG = 5;
      sTorse = 8;
      sJG = 5;
      sBD = 5;
      sJD = 5;
      break;
  }

  const newAttrs = {
    armurePJ: armureActuel,
    armurePJ_max: totalArmure,
    armurePJModif: armureModif,
    energiePJ: energieActuel,
    energiePJ_max: totalEnergie,
    energiePJModif: energieModif,
    cdfPJ: totalCdf,
    cdfPJ_max: totalCdf,
    cdfPJModif: cdfModif,
    barbarianGoliath: 0,
    berserkIlluminationBeaconA: 0,
    berserkIlluminationTorchA: 0,
    berserkIlluminationProjectorA: 0,
    berserkIlluminationLighthouseA: 0,
    berserkIlluminationLanternA: 0,
    berserkRageA: 0,
    shamanNbreTotem: 0,
    shamanAscension: 0,
    sorcererMMVolNuee: 0,
    sorcererMMPhase: 0,
    sorcererMMEtirement: 0,
    sorcererMMCorpMetal: 0,
    sorcererMMCorpFluide: 0,
    sorcererMMPMGuerre: 0,
    sorcererMM250PG: 0,
    warlockForward: 0,
    warlockRecord: 0,
    warlockRewind: 0,
    warmasterImpFPersonnel: 0,
    warmasterImpGPersonnel: 0,
    warriorSoldierA: 0,
    warriorHunterA: 0,
    warriorScholarA: 0,
    warriorHeraldA: 0,
    warriorScoutA: 0,
    MALShamanNbreTotem: 0,
    MALWarriorSoldierA: 0,
    MALWarriorHunterA: 0,
    MALWarriorScholarA: 0,
    MALWarriorHeraldA: 0,
    MALWarriorScoutA: 0,
    MALWarmasterImpFPersonnel: 0,
    MALWarmasterImpGPersonnel: 0,
    MALRogueGhost: 0,
    rogueGhost: 0,
    bardChangeling: 0,
    MALBarbarianGoliath: 0,
    slotTeteMax: sTete,
    slotTorseMax: sTorse,
    slotJGMax: sJG,
    slotJDMax: sJD,
    slotBGMax: sBG,
    slotBDMax: sBD,
  };

  await setAttrsAsync(newAttrs);
});

on('change:fichePNJ', async (newSheet) => {
  const sheet = +newSheet.newValue;
  const update = {};

  if (sheet === 0 || sheet === 1 || sheet === 2 || sheet === 3) {
    update.tab = 'dossier';
    update.armure = 'sans';
  }

  if (sheet === 4) {
    update.tab = 'vehicule';
    update.armure = 'sans';
  }

  await setAttrsAsync(update);
});

const listDonneesArmures = ['armure', 'energie', 'cdf'];

listDonneesArmures.forEach((data) => {
  on(`change:${data}pj sheet:opened`, async () => {
    const attrs = await getAttrsAsync([`${data}PJ`, 'armure']);
    const armure = attrs.armure;

    const nValue = {};
    nValue[`${armure}-${data}-actuel`] = +attrs[`${data}PJ`];

    await setAttrsAsync(nValue);
  });

  on(`change:${data}pjmodif sheet:opened`, async () => {
    const attrs = await getAttrsAsync([`${data}PJModif`, 'armure']);
    const armure = attrs.armure;

    const nValue = {};
    nValue[`${armure}-${data}-modif`] = +attrs[`${data}PJModif`];

    await setAttrsAsync(nValue);
  });
});

// ARMURE
on('change:armurePJModif', async () => {
  const attrs = await getAttrsAsync(['armurePJModif', 'armure']);
  const armure = attrs.armure;
  const modif = +attrs.armurePJModif;

  const armureValue = +dataArmure[armure].armureMax + modif;

  await setAttrsAsync({ armurePJ_max: armureValue });
});

// ENERGIE
on('change:energiePJModif change:warmaster150PG change:warmaster250PG', async () => {
  const attrs = await getAttrsAsync(['armure', 'warmaster150PG', 'warmaster250PG', 'energiePJModif']);
  const armure = attrs.armure;

  const warmaster150 = +attrs.warmaster150PG;
  const warmaster250 = +attrs.warmaster250PG;
  const modif = +attrs.energiePJModif;

  let energie = 0;

  if (armure === 'warmaster') energie = +dataArmure[armure].energieMax + warmaster150 + warmaster250 + modif;
  else energie = +dataArmure[armure].energieMax + modif;

  await setAttrsAsync({ energiePJ_max: energie });
});

// CDF
on('change:cdfPJModif change:barbarianGoliath change:MALBarbarianGoliath change:warmasterImpFPersonnel change:warmasterImpForce change:MALWarmasterImpFPersonnel change:MALWarmasterImpForce change:sorcererMMCorpMetal change:sorcerer150PG change:sorcererMM250PG', async () => {
  const attrs = await getAttrsAsync(['armure', 'armureLegende', 'cdfPJModif', 'barbarianGoliath', 'MALBarbarianGoliath', 'sorcererMMCorpMetal', 'sorcerer150PG', 'sorcererMM250PG', 'warmasterImpFPersonnel', 'warmasterImpForce', 'MALWarmasterImpFPersonnel', 'MALWarmasterImpForce']);

  const armure = attrs.armure;
  const armureL = attrs.armureLegende;

  const max = +dataArmure[armure].cdfMax;
  const modif = +attrs.cdfPJModif;

  const goliath = +attrs.barbarianGoliath;
  const goliathMAL = +attrs.MALBarbarianGoliath;

  const corpMetal = +attrs.sorcererMMCorpMetal;
  const CM150PG = attrs.sorcerer150PG;
  const CM250PG = +attrs.sorcererMM250PG;

  const warmasterForce = attrs.warmasterImpForce;
  const warmasterForcePers = +attrs.warmasterImpFPersonnel;

  const warmasterForceMAL = attrs.MALWarmasterImpForce;
  const warmasterForcePersMAL = +attrs.MALWarmasterImpFPersonnel;

  let total = max + modif;

  log(corpMetal);

  switch (armure) {
    case 'barbarian':
      total += goliath;
      break;

    case 'sorcerer':
      if (corpMetal !== 0 || CM250PG !== 0) {
        total += 2;

        if (CM150PG !== '0') total += 2;
      }
      break;

    case 'warmaster':
      if (warmasterForce === 'on' && warmasterForcePers !== 0) total += warmasterForcePers;
      break;
  }

  switch (armureL) {
    case 'barbarian':
      total += goliathMAL;
      break;

    case 'warmaster':
      if (warmasterForceMAL === 'on' && warmasterForcePersMAL !== 0) { total += warmasterForcePersMAL; }
      break;
  }

  await setAttrsAsync({
    cdfPJ: total,
    cdfPJ_max: total,
  });
});

// ESPOIR
on('change:espoirModif change:fichePNJ change:armure change:berserk250PG', async () => {
  const attrs = await getAttrsAsync(['armure', 'espoirModif', 'fichePNJ', 'berserk250PG']);

  const fiche = +attrs.fichePNJ;

  if (fiche !== 0) { return; }

  const armure = attrs.Armure;

  const modif = +attrs.espoirModif;

  const berserk250PG = attrs.berserk250PG;

  let max = 50;
  let bonus = 0;

  const newAttrs = {};

  switch (armure) {
    case 'berserk':
      if (berserk250PG === 'on') { bonus = 25; } else { bonus = 15; }
      break;

    case 'necromancer':
      max = 10;
      break;
  }

  newAttrs.espoir_max = max + modif + bonus;

  await setAttrsAsync(newAttrs);
});

// EGIDE
on('change:fichePNJ change:armure change:berserkNiveaux change:berserkRageN1Egide change:berserkRageN2Egide change:berserkRageN3Egide', async () => {
  const attrs = await getAttrsAsync(['armure', 'fichePNJ', 'berserkNiveaux', 'berserkRageN1Egide', 'berserkRageN2Egide', 'berserkRageN3Egide']);

  const fiche = +attrs.fichePNJ;

  if (fiche !== 0) { return; }

  const armure = attrs.armure;

  const rage = +attrs.berserkNiveaux;
  const N1 = +attrs.berserkRageN1Egide;
  const N2 = +attrs.berserkRageN2Egide;
  const N3 = +attrs.berserkRageN3Egide;

  let egide = 0;

  if (armure === 'berserk') {
    switch (rage) {
      case 1:
        egide += N1;
        break;

      case 2:
        egide += N2;
        break;

      case 3:
        egide += N3;
        break;
    }
  }

  await setAttrsAsync({ egideBonus: egide });
});

// DEFENSE
on('change:fichePNJ change:armure change:armureLegende change:defense change:defBM change:bonusDefense change:defenseODBonus change:defenseModifPerso change:barbarianDef change:berserkRageA change:berserkNiveaux change:berserkRageN1DR change:berserkRageN2DR change:berserkRageN3DR change:sorcererMMCorpFluide change:sorcerer150PG change:sorcererMM250PG change:warmasterImpEPersonnel change:warmasterImpEsquive change:MALWarmasterImpEPersonnel change:MALWarmasterImpEsquive change:MALBarbarianDef change:MasquePNJAE change:MasquePNJAEMaj change:defensePNJ change:MADDjinnNanobrumeActive', async () => {
  const attrs = await getAttrsAsync(['defense', 'defensePNJ', 'defBM', 'bonusDefense', 'defenseModifPerso', 'defenseODBonus',
    'fichePNJ', 'armure', 'armureLegende',
    'barbarianDef',
    'MALBarbarianDef',
    'berserkRageA', 'berserkNiveaux', 'berserkRageN1DR', 'berserkRageN2DR', 'berserkRageN3DR',
    'sorcererMMCorpFluide', 'sorcerer150PG', 'sorcerer250PG', 'sorcererMM250PG',
    'warmasterImpEsquive', 'warmasterImpEPersonnel',
    'MALWarmasterImpEsquive', 'MALWarmasterImpEPersonnel',
    'MasquePNJAE', 'MasquePNJAEMaj',
    'MADDjinnNanobrumeActive']);

  const fiche = +attrs.fichePNJ;

  const basePJ = +attrs.defense;
  const basePNJ = +attrs.defensePNJ;

  const modifStyle = parseInt(attrs.defBM, 10) || 0;
  const modifAutre = parseInt(attrs.bonusDefense, 10) || 0;
  const modifPJ = +attrs.defenseModifPerso;
  const modifOD = parseInt(attrs.defenseODBonus, 10) || 0;

  const armure = attrs.armure;
  const armureL = attrs.armureLegende;

  const goliath = +attrs.barbarianDef;
  const MALGoliath = +attrs.MALBarbarianDef;

  const berserkRage = attrs.berserkRageA;
  const berserkNiveau = attrs.berserkNiveaux;
  const berserkRageN1 = +attrs.berserkRageN1DR;
  const berserkRageN2 = +attrs.berserkRageN2DR;
  const berserkRageN3 = +attrs.berserkRageN3DR;

  const sorcererCorpFluide = attrs.sorcererMMCorpFluide;
  const sorcerer150PG = +attrs.sorcerer150PG;
  const sorcerer250PG = attrs.sorcerer250PG;
  const sorcererMM250PG = +attrs.sorcererMM250PG;

  const warmasterEsquive = attrs.warmasterImpEsquive;
  const warmasterEsquiveP = +attrs.warmasterImpEPersonnel;

  const MALWarmasterEsquive = attrs.MALWarmasterImpEsquive;
  const MALWarmasterEsquiveP = +attrs.MALWarmasterImpEPersonnel;

  const masqueAE = +attrs.MasquePNJAE;
  const masqueAEMaj = +attrs.MasquePNJAEMaj;

  const mechaArmureNanoBrume = attrs.MADDjinnNanobrumeActive;

  let base = 0;
  let modif = 0;
  let modifS = 0;
  let totalMecha = 0;
  let total = 0;

  switch (fiche) {
    case 0:
      base += basePJ;
      modifS += modifPJ;
      totalMecha = basePJ + modifAutre + modifOD;

      switch (armure) {
        case 'sans':
        case 'guardian':
          modif = modifStyle + modifAutre;
          break;

        default:
          modif = modifStyle + modifAutre + modifOD;
          break;
      }

      if (armure === 'barbarian') { modif -= goliath; }

      if (armure === 'berserk' && berserkRage === 'on') {
        if (berserkNiveau === 1) { modif -= berserkRageN1; } else if (berserkNiveau === 2) { modif -= berserkRageN2; } else if (berserkNiveau === 3) { modif -= berserkRageN3; }
      }

      if (armure === 'sorcerer') {
        if (sorcerer250PG === 'on') {
          if (sorcererMM250PG === 1) {
            modif += 2;

            if (sorcerer150PG !== 0) { modif += 1; }
          }
        } else if (sorcererCorpFluide !== '0') {
          modif += 2;

          if (sorcerer150PG !== 0) { modif += 1; }
        }
      }

      if (armure === 'warmaster' && warmasterEsquive !== '0' && warmasterEsquiveP !== 0) { modif += 2; }

      if (armureL === 'warmaster' && MALWarmasterEsquive !== '0' && MALWarmasterEsquiveP !== 0) { modif += 2; }

      if (armureL === 'barbarian') { modif -= MALGoliath; }

      if (mechaArmureNanoBrume === 1) { totalMecha += 3; }
      break;
    case 1:
    case 2:
      base += basePNJ;
      modifS += modifPJ;
      modif += modifAutre + masqueAE + masqueAEMaj;
      break;

    case 3:
      base += basePNJ;
      modifS += modifPJ;
      modif += masqueAE + masqueAEMaj;
      break;
  }

  total += Math.max(base + modif + modifS, 0);

  await setAttrsAsync({
    defenseModif: modif,
    defenseTotal: total,
    mechaArmureDefense: totalMecha,
  });
});

// REACTION
on('change:fichePNJ change:armure change:armureLegende change:reaction change:rctBM change:bonusReaction change:reactionODBonus change:reactionModifPerso change:barbarianRea change:berserkNiveaux change:berserkRageN1DR change:berserkRageN2DR change:berserkRageN3DR change:paladinWatchtower change:sorcererMMCorpFluide change:sorcerer150PG change:sorcererMM250PG change:warmasterImpEPersonnel change:warmasterImpEsquive change:MALWarmasterImpEsquive change:MALWarmasterImpEPersonnel change:MALBarbarianRea change:MachinePNJAE change:MachinePNJAEMaj change:reactionPNJ change:MADDjinnNanobrumeActive', async () => {
  const attrs = await getAttrsAsync(['reaction', 'reactionPNJ', 'rctBM', 'bonusReaction', 'reactionModifPerso', 'reactionODBonus',
    'fichePNJ', 'armure', 'armureLegende',
    'barbarianRea',
    'MALBarbarianRea',
    'berserkRageA', 'berserkNiveaux', 'berserkRageN1DR', 'berserkRageN2DR', 'berserkRageN3DR',
    'paladinWatchtower',
    'sorcererMMCorpFluide', 'sorcerer150PG', 'sorcerer250PG', 'sorcererMM250PG',
    'warmasterImpEsquive', 'warmasterImpEPersonnel',
    'MALWarmasterImpEsquive', 'MALWarmasterImpEPersonnel',
    'MachinePNJAE', 'MachinePNJAEMaj',
    'MADDjinnNanobrumeActive']);

  const fiche = +attrs.fichePNJ;

  const basePJ = +attrs.reaction;
  const basePNJ = +attrs.reactionPNJ;

  const modifStyle = parseInt(attrs.rctBM, 10) || 0;
  const modifAutre = parseInt(attrs.bonusReaction, 10) || 0;
  const modifPJ = +attrs.reactionModifPerso;
  const modifOD = parseInt(attrs.reactionODBonus, 10) || 0;

  const armure = attrs.armure;
  const armureL = attrs.armureLegende;

  const goliath = +attrs.barbarianRea;
  const MALGoliath = +attrs.MALBarbarianRea;

  const berserkRage = attrs.berserkRageA;
  const berserkNiveau = attrs.berserkNiveaux;
  const berserkRageN1 = +attrs.berserkRageN1DR;
  const berserkRageN2 = +attrs.berserkRageN2DR;
  const berserkRageN3 = +attrs.berserkRageN3DR;

  const paladinWatchtower = attrs.paladinWatchtower;

  const sorcererCorpFluide = attrs.sorcererMMCorpFluide;
  const sorcerer150PG = +attrs.sorcerer150PG;
  const sorcerer250PG = attrs.sorcerer250PG;
  const sorcererMM250PG = +attrs.sorcererMM250PG;

  const warmasterEsquive = attrs.warmasterImpEsquive;
  const warmasterEsquiveP = +attrs.warmasterImpEPersonnel;

  const MALWarmasterEsquive = attrs.MALWarmasterImpEsquive;
  const MALWarmasterEsquiveP = +attrs.MALWarmasterImpEPersonnel;

  const machineAE = +attrs.MachinePNJAE;
  const machineAEMaj = +attrs.MachinePNJAEMaj;

  const mechaArmureNanoBrume = attrs.MADDjinnNanobrumeActive;

  let base = 0;
  let modif = 0;
  let modifS = 0;
  let totalMecha = 0;
  let total = 0;

  switch (fiche) {
    case 0:
      base += basePJ;
      modifS += modifPJ;
      totalMecha += basePJ + modifAutre + modifOD;

      switch (armure) {
        case 'sans':
        case 'guardian':
          modif = modifStyle + modifAutre;
          break;

        default:
          modif = modifStyle + modifAutre + modifOD;
          break;
      }

      if (armure === 'barbarian') { modif -= goliath; }

      if (armure === 'berserk' && berserkRage === 'on') {
        if (berserkNiveau === 1) { modif -= berserkRageN1; } else if (berserkNiveau === 2) { modif -= berserkRageN2; } else if (berserkNiveau === 3) { modif -= berserkRageN3; }
      }

      if (armure === 'sorcerer') {
        if (sorcerer250PG === 'on') {
          if (sorcererMM250PG === 1) {
            modif += 2;

            if (sorcerer150PG !== 0) { modif += 1; }
          }
        } else if (sorcererCorpFluide !== '0') {
          modif += 2;

          if (sorcerer150PG !== 0) { modif += 1; }
        }
      }

      if (armure === 'warmaster' && warmasterEsquive !== '0' && warmasterEsquiveP !== 0) { modif += 2; }

      if (armureL === 'warmaster' && MALWarmasterEsquive !== '0' && MALWarmasterEsquiveP !== 0) { modif += 2; }

      if (armureL === 'barbarian') { modif -= MALGoliath; }

      if (armure === 'paladin' && paladinWatchtower === 'Activé') {
        const temp = base + modif + modifS;

        modif -= Math.ceil(temp / 2);
      }

      if (mechaArmureNanoBrume === 1) { totalMecha += 3; }
      break;
    case 1:
    case 2:
      base += basePNJ;
      modifS += modifPJ;
      modif += modifAutre + machineAE + machineAEMaj;
      break;

    case 3:
      base += basePNJ;
      modifS += modifPJ;
      modif += machineAE + machineAEMaj;
      break;
  }

  total += Math.max(base + modif + modifS, 0);

  await setAttrsAsync({
    reactionModif: modif,
    reactionTotal: total,
    mechaArmureReaction: totalMecha,
  });
});

// RESILIENCE
on('clicked:calculResilienceFinal', async () => {
  const attrs = await getAttrsAsync(['listeTypePNJ', 'armurePNJ_max', 'santePNJ_max']);

  const type = +attrs.listeTypePNJ;
  const armure = +attrs.armurePNJ_max;
  const sante = +attrs.santePNJ_max;

  let total = 0;

  switch (type) {
    case 1:
      if (sante > 0) { total = Math.floor(sante / 10); } else { total = Math.floor(armure / 10); }
      break;

    case 2:
      if (sante > 0) { total = Math.floor(sante / 10) * 2; } else { total = Math.floor(armure / 10) * 2; }
      break;

    case 3:
      if (sante > 0) { total = Math.floor(sante / 10) * 3; } else { total = Math.floor(armure / 10) * 3; }
      break;

    case 4:
      if (sante > 0) { total = Math.floor(sante / 30); } else { total = Math.floor(armure / 30); }
      break;

    case 5:
      if (sante > 0) { total = Math.floor(sante / 20); } else { total = Math.floor(armure / 20); }
      break;

    case 6:
      if (sante > 0) { total = Math.floor(sante / 10); } else { total = Math.floor(armure / 10); }
      break;
  }

  await setAttrsAsync({
    popup: 0,
    resilience: total,
    resilience_max: total,
  });
});

on('clicked:calculerResilience', async () => {
  await setAttrsAsync({
    popup: 2,
  });
});

on('change:berserk350PG', async () => {
  const attrs = await getAttrsAsync(['berserk350PG']);
  const state = attrs.berserk350PG;

  let dgts = '2D6';
  let violence = '2D6';
  let beacon = `2 ${getTranslationByKey('reussites-automatiques')}`;
  let egide = '2';

  if (state === 'on') {
    dgts = '4D6';
    violence = '4D6';
    beacon = `4 ${getTranslationByKey('reussites-automatiques')}`;
    egide = '4';
  }

  await setAttrsAsync({
    berserkIlluminationBlazeDgts: dgts,
    berserkIlluminationBlazeViolence: violence,
    berserkIlluminationBeaconBonus: beacon,
    berserkIlluminationTorchEgide: egide,
  });
});

// BARBARIAN
on('change:barbarianNoMDefense change:barbarianGoliath', async () => {
  const attrs = await getAttrsAsync(['barbarianGoliath', 'barbarianNoMDefense']);

  const goliath = +attrs.barbarianGoliath;
  const PG200 = attrs.barbarianNoMDefense;

  let defense = 0;
  const reaction = goliath * 2;
  const dgts = `${goliath}D6`;

  if (PG200 === '0') { defense = goliath; }

  await setAttrsAsync({
    barbarianDef: defense,
    barbarianRea: reaction,
    barbarianDegat: dgts,
  });
});

// SHAMAN
on('change:shamanAscensionEnergie', async () => {
  const attrs = await getAttrsAsync(['shamanAscension', 'shamanAscensionEnergie']);

  const ascension = +attrs.shamanAscension;
  const energie = +attrs.shamanAscensionEnergie;

  if (ascension === 1) { await setAttrsAsync({ energieAscension_max: energie }); }
});

on('change:armurePJModif', async () => {
  const attrs = await getAttrsAsync(['armurePJModif']);

  const base = 60;
  const modif = +attrs.armurePJModif;

  await setAttrsAsync({ armureAscension_max: base + modif });
});

on('change:cdfPJAscensionModif', async () => {
  const attrs = await getAttrsAsync(['cdfPJAscensionModif']);

  const base = 10;
  const modif = +attrs.cdfPJAscensionModif;
  const total = base + modif;

  await setAttrsAsync({
    cdfAscension: total,
    cdfAscension_max: total,
  });
});

on('change:shamanNbreTotem', async () => {
  const attrs = await getAttrsAsync(['shaman150PG', 'shamanNbreTotem']);

  const shaman150PG = +attrs.shaman150PG;
  const totem = +attrs.shamanNbreTotem;

  if (totem === 3 && shaman150PG === 0) { await setAttrsAsync({ shamanNbreTotem: 2 }); }
});

// GESTION DES ASPECTS ET CARACTERISTIQUES
// Chair
on('change:deplacement change:force change:endurance change:santeModif change:santeODBonus sheet:opened', async () => {
  const attrs = await getAttrsAsync(['fichePNJ', 'chair', 'deplacement', 'force', 'endurance', 'santeModif', 'santeODBonus']);

  const fiche = +attrs.fichePNJ;

  if (fiche !== 0) { return; }

  const chair = +attrs.chair;

  const deplacement = +attrs.deplacement;
  const force = +attrs.force;
  const endurance = +attrs.endurance;

  const modif = +attrs.santeModif;
  const OD = +attrs.santeODBonus;

  maxCar('deplacement', deplacement, chair);
  maxCar('force', force, chair);
  maxCar('endurance', endurance, chair);

  const total = 10 + (Math.max(deplacement, force, endurance) * 6) + modif + OD;

  await setAttrsAsync({ santepj_max: total });
});
// Bête
on('change:fichePNJ change:armure change:hargne change:combat change:instinct change:calODHar change:calODCom change:calODIns sheet:opened', async () => {
  const attrs = await getAttrsAsync(['fichePNJ', 'armure', 'bete', 'hargne', 'combat', 'instinct', 'calODHar', 'calODCom', 'calODIns']);

  const fiche = +attrs.fichePNJ;

  if (fiche !== 0) { return; }

  const armure = +attrs.armure;

  const aspect = +attrs.bete;

  const car1 = +attrs.hargne;
  const car2 = +attrs.combat;
  const car3 = +attrs.instinct;

  const OD1 = +attrs.calODHar;
  const OD2 = +attrs.calODCom;
  const OD3 = +attrs.calODIns;

  maxCar('hargne', car1, aspect);
  maxCar('combat', car2, aspect);
  maxCar('instinct', car3, aspect);

  let total = 0;

  switch (armure) {
    case 'sans':
    case 'guardian':
      total = Math.max(car1, car2, car3);
      break;

    default:
      total = Math.max(car1 + OD1, car2 + OD2, car3 + OD3);
      break;
  }

  await setAttrsAsync({ defense: total });
});
// Machine
on('change:fichePNJ change:armure change:tir change:savoir change:technique change:calODTir change:calODSav change:calODTec sheet:opened', async () => {
  const attrs = await getAttrsAsync(['fichePNJ', 'armure', 'machine', 'tir', 'savoir', 'technique', 'calODTir', 'calODSav', 'calODTec']);

  const fiche = +attrs.fichePNJ;

  if (fiche !== 0) { return; }

  const armure = +attrs.armure;

  const aspect = +attrs.machine;

  const car1 = +attrs.tir;
  const car2 = +attrs.savoir;
  const car3 = +attrs.technique;

  const OD1 = +attrs.calODTir;
  const OD2 = +attrs.calODSav;
  const OD3 = +attrs.calODTec;

  maxCar('tir', car1, aspect);
  maxCar('savoir', car2, aspect);
  maxCar('technique', car3, aspect);

  let total = 0;

  switch (armure) {
    case 'sans':
    case 'guardian':
      total = Math.max(car1, car2, car3);
      break;

    default:
      total = Math.max(car1 + OD1, car2 + OD2, car3 + OD3);
      break;
  }

  await setAttrsAsync({ reaction: total });
});
// Dame
on('change:aura change:parole change:sf', async () => {
  const attrs = await getAttrsAsync(['fichePNJ', 'dame', 'aura', 'parole', 'sf']);

  const fiche = +attrs.fichePNJ;

  if (fiche !== 0) { return; }

  const aspect = +attrs.dame;

  const car1 = +attrs.aura;
  const car2 = +attrs.parole;
  const car3 = +attrs.sf;

  maxCar('aura', car1, aspect);
  maxCar('parole', car2, aspect);
  maxCar('sf', car3, aspect);
});

on('change:fichePNJ change:armure change:discretion change:dexterite change:perception change:calODDis change:calODPer change:calODDex change:initiativeODBonus', async () => {
  const attrs = await getAttrsAsync(['fichePNJ', 'armure', 'masque', 'discretion', 'dexterite', 'perception', 'calODDis', 'calODPer', 'calODDex', 'initiativeODBonus']);

  const fiche = +attrs.fichePNJ;

  if (fiche !== 0) { return; }

  const armure = +attrs.armure;

  const aspect = +attrs.masque;

  const car1 = +attrs.discretion;
  const car2 = +attrs.dexterite;
  const car3 = +attrs.perception;

  const OD1 = +attrs.calODDis;
  const OD2 = +attrs.calODDex;
  const OD3 = +attrs.calODPer;

  const bonus = +attrs.initiativeODBonus;

  maxCar('discretion', car1, aspect);
  maxCar('dexterite', car2, aspect);
  maxCar('perception', car3, aspect);

  let total = 0;

  switch (armure) {
    case 'sans':
    case 'guardian':
      total = Math.max(car1, car2, car3);
      break;

    default:
      total = Math.max(car1 + OD1, car2 + OD2, car3 + OD3) + bonus;
      break;
  }

  await setAttrsAsync({ bonusInitiative: total });
});

on('change:sorcerer250PG', async () => {
  const attrs = await getAttrsAsync(['sorcerer250PG']);

  const PG250 = attrs.sorcerer250PG;

  if (PG250 === 'on') {
    await setAttrsAsync({
      sorcererMMVolNuee: 0,
      sorcererMMPhase: 0,
      sorcererMMEtirement: 0,
      sorcererMMCorpMetal: 0,
      sorcererMMCorpFluide: 0,
      sorcererMMPMGuerre: 0,
    });
  } else { await setAttrsAsync({ sorcererMM250PG: 0 }); }
});

on('change:monk150PG change:monk250PG sheet:opened', async () => {
  const attrs = await getAttrsAsync(['monk150PG', 'monk250PG']);

  const PG150 = +attrs.monk150PG;
  const PG250 = +attrs.monk250PG;

  let vagueDgts = 3;
  let salveDgts = 3;
  let rayonDgts = 4;
  let rayonViolence = 2;

  let vagueEffets = `${i18n_parasitage} 2 / ${i18n_dispersion} 3 / ${i18n_destructeur} / ${i18n_choc} 2`;
  let salveEffets = `${i18n_ultraviolence} / ${i18n_meurtrier} / ${i18n_dispersion} 3 / ${i18n_parasitage} 1`;
  let rayonEffets = `${i18n_parasitage} 1 / ${i18n_perceArmure} 40`;

  if (PG150 === 2) {
    vagueDgts += 2;
    salveDgts += 2;
    rayonDgts += 2;
    rayonViolence += 2;
  }

  if (PG250 === 1) {
    vagueDgts += 2;
    salveDgts += 2;
    rayonDgts += 2;
    rayonViolence += 2;

    vagueEffets = `${i18n_parasitage} 4 / ${i18n_dispersion} 3 / ${i18n_destructeur} / ${i18n_choc} 2`;
    salveEffets = `${i18n_ultraviolence} / ${i18n_meurtrier} / ${i18n_dispersion} 6 / ${i18n_parasitage} 1`;
    rayonEffets = `${i18n_parasitage} 1 / ${i18n_ignoreArmure}`;
  }

  await setAttrsAsync({
    monkVagueDegat: `${vagueDgts}D6`,
    monkSalveDegat: `${salveDgts}D6`,
    monkRayonDegat: `${rayonDgts}D6`,
    monkRayonViolence: `${rayonViolence}D6`,
    monkVagueEffets: vagueEffets,
    monkSalveEffets: salveEffets,
    monkRayonEffets: rayonEffets,
  });
});

on('change:priest200PG', async () => {
  const attrs = await getAttrsAsync(['priest200PG']);

  const PG200 = attrs.priest200PG;

  let contactDice = 3;
  let distanceDice = 2;

  let contactBonus = 6;
  let distanceBonus = 6;

  if (PG200 === 'on') {
    contactDice += 1;
    distanceDice += 1;

    contactBonus += 6;
    distanceBonus += 6;
  }

  await setAttrsAsync({
    priestMechanicContact: `${contactDice}D6+${contactBonus}`,
    priestMechanicDistance: `${distanceDice}D6+${distanceBonus}`,
  });
});

on('change:psion200PG', async () => {
  const attrs = await getAttrsAsync(['psion200PG']);

  const PG200 = +attrs.psion200PG;

  let malusAction = 2;
  let malusAutres = 2;

  if (PG200 === 'on') {
    malusAction += 1;
    malusAutres += 1;
  }

  await setAttrsAsync({
    psionMalusA: `${malusAction}D`,
    psionMalus: malusAutres,
  });
});

on('change:wizard150PG sheet:opened', async () => {
  const attrs = await getAttrsAsync(['wizard150PG']);

  const PG200 = +attrs.wizard150PG;

  let portee = i18n_porteeCourte;

  if (PG200 === 'on') { portee = i18n_porteeMoyenne; }

  await setAttrsAsync({ wizardBPortee: portee });
});

on('change:wizard250PG sheet:opened', async () => {
  const attrs = await getAttrsAsync(['wizard250PG']);

  const PG250 = attrs.wizard250PG;

  let portee = i18n_porteeCourte;

  if (PG250 === 'on') { portee = i18n_porteeMoyenne; }

  await setAttrsAsync({ wizardOPortee: portee });
});

on('change:styleCombat', async () => {
  const attrs = await getAttrsAsync(['styleCombat']);

  const Style = attrs.styleCombat;

  let agressif = '0';
  let akimbo = '0';
  let ambidextre = '0';
  let couvert = '0';
  let defensif = '0';
  let pilonnage = '0';
  let puissant = '0';
  const suppressionD = 0;
  const suppressionV = 0;
  let rctBM = '';
  let defBM = '';
  let description = '';

  switch (Style) {
    case 'couvert':
      couvert = '-3';
      rctBM = '+2';
      description = getTranslationByKey('bonus-style-couvert');
      break;
    case 'agressif':
      agressif = '+3';
      rctBM = '-2';
      defBM = '-2';
      description = getTranslationByKey('bonus-style-agressif');
      break;
    case 'akimbo':
      akimbo = '-3';
      description = getTranslationByKey('bonus-style-akimbo');
      break;
    case 'ambidextre':
      ambidextre = '-3';
      description = getTranslationByKey('bonus-style-ambidextre');
      break;
    case 'defensif':
      defensif = '-3';
      defBM = '+2';
      description = getTranslationByKey('bonus-style-defensif');
      break;
    case 'precis':
      description = getTranslationByKey('bonus-style-precis');
      break;
    case 'pilonnage':
      pilonnage = '-2';
      description = getTranslationByKey('bonus-style-pilonnage');
      break;
    case 'puissant':
      puissant = '@{stylePuissantBonus}';
      rctBM = '-2';
      defBM = '-2';
      description = getTranslationByKey('bonus-style-puissant');
      break;
    case 'suppression':
      description = getTranslationByKey('bonus-style-suppression');
      break;
  }

  await setAttrsAsync({
    atkAgressif: agressif,
    atkAkimbo: akimbo,
    atkAmbidextre: ambidextre,
    atkCouvert: couvert,
    atkDefensif: defensif,
    atkPilonnage: pilonnage,
    atkPuissant: puissant,
    styleSuppressionD: suppressionD,
    styleSuppressionV: suppressionV,
    rctBM: rctBM,
    defBM: defBM,
    styleCombatDescr: description,
  });
});

on('change:repeating_modules remove:repeating_modules', () => {
  TAS.repeatingSimpleSum('modules', 'moduleSlotTete', 'slotsOccupeTete');
  TAS.repeatingSimpleSum('modules', 'moduleSlotTorse', 'slotsOccupeTorse');
  TAS.repeatingSimpleSum('modules', 'moduleSlotBG', 'slotsOccupeBG');
  TAS.repeatingSimpleSum('modules', 'moduleSlotBD', 'slotsOccupeBD');
  TAS.repeatingSimpleSum('modules', 'moduleSlotJG', 'slotsOccupeJG');
  TAS.repeatingSimpleSum('modules', 'moduleSlotJD', 'slotsOccupeJD');
});

on('change:repeating_modulesDCLion remove:repeating_modulesDCLion', () => {
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLTete', 'slotsUDCLTeteTot');
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLTorse', 'slotsUDCLTorseTot');
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLBG', 'slotsUDCLBGTot');
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLBD', 'slotsUDCLBDTot');
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLJG', 'slotsUDCLJGTot');
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLJD', 'slotsUDCLJDTot');
});

on('change:slotsOccupeTete change:slotsOccupeTorse change:slotsOccupeBG change:slotsOccupeBD change:slotsOccupeJG change:slotsOccupeJD', async () => {
  const attrs = await getAttrsAsync([
    'slotsOccupeTete', 'slotTeteMax',
    'slotsOccupeTorse', 'slotTorseMax',
    'slotsOccupeBG', 'slotBGMax',
    'slotsOccupeBD', 'slotBDMax',
    'slotsOccupeJG', 'slotJGMax',
    'slotsOccupeJD', 'slotJDMax',
  ]);

  const TeO = parseInt(attrs.slotsOccupeTete, 10) || 0;
  const TeM = parseInt(attrs.slotTeteMax, 10) || 0;

  const ToO = parseInt(attrs.slotsOccupeTorse, 10) || 0;
  const ToM = parseInt(attrs.slotTorseMax, 10) || 0;

  const BGO = parseInt(attrs.slotsOccupeBG, 10) || 0;
  const BGM = parseInt(attrs.slotBGMax, 10) || 0;

  const BDO = parseInt(attrs.slotsOccupeBD, 10) || 0;
  const BDM = parseInt(attrs.slotBDMax, 10) || 0;

  const JGO = parseInt(attrs.slotsOccupeJG, 10) || 0;
  const JGM = parseInt(attrs.slotJGMax, 10) || 0;

  const JDO = parseInt(attrs.slotsOccupeJD, 10) || 0;
  const JDM = parseInt(attrs.slotJDMax, 10) || 0;

  const totalTe = TeM - TeO;
  const totalTo = ToM - ToO;
  const totalBG = BGM - BGO;
  const totalBD = BDM - BDO;
  const totalJG = JGM - JGO;
  const totalJD = JDM - JDO;

  let msg = '';

  PI.msgSlot = 0;

  if (PI.msgEnergie === 1) { msg += 'Erreur. Energie Indisponible. '; }

  if (totalTe < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += "Capacité de l'Armure dépassée. ";
    }

    msg += 'Trop de slots occupé au niveau de la tête. ';
  }

  if (totalTo < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += "Capacité de l'Armure dépassée. ";
    }

    msg += 'Trop de slots occupé au niveau du torse. ';
  }

  if (totalBG < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += "Capacité de l'Armure dépassée. ";
    }

    msg += 'Trop de slots occupé au niveau du bras gauche. ';
  }

  if (totalBD < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += "Capacité de l'Armure dépassée. ";
    }

    msg += 'Trop de slots occupé au niveau du bras droit. ';
  }

  if (totalJG < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += "Capacité de l'Armure dépassée. ";
    }

    msg += 'Trop de slots occupé au niveau de la jambe gauche. ';
  }

  if (totalJD < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += "Capacité de l'Armure dépassée. ";
    }

    msg += 'Trop de slots occupé au niveau de la jambe droite. ';
  }

  if (msg !== '') { setPanneauInformation(msg, true, true); } else { resetPanneauInformation(); }
});

on('change:slotsUDCLTeteTot change:slotsUDCLTorseTot change:slotsUDCLBGTot change:slotsUDCLBDTot change:slotsUDCLJGTot change:slotsUDCLJDTot', async () => {
  const attrs = await getAttrsAsync([
    'slotsUDCLTeteTot', 'slotsDCLTeteMax',
    'slotsUDCLTorseTot', 'slotsDCLTorseMax',
    'slotsUDCLBGTot', 'slotsDCLBGMax',
    'slotsUDCLBDTot', 'slotsDCLBDMax',
    'slotsUDCLJGTot', 'slotsDCLJGMax',
    'slotsUDCLJDTot', 'slotsDCLJDMax',
  ]);

  const TeO = parseInt(attrs.slotsUDCLTeteTot, 10) || 0;
  const TeM = parseInt(attrs.slotsDCLTeteMax, 10) || 0;

  const ToO = parseInt(attrs.slotsUDCLTorseTot, 10) || 0;
  const ToM = parseInt(attrs.slotsDCLTorseMax, 10) || 0;

  const BGO = parseInt(attrs.slotsUDCLBGTot, 10) || 0;
  const BGM = parseInt(attrs.slotsDCLBGMax, 10) || 0;

  const BDO = parseInt(attrs.slotsUDCLBDTot, 10) || 0;
  const BDM = parseInt(attrs.slotsDCLBDMax, 10) || 0;

  const JGO = parseInt(attrs.slotsUDCLJGTot, 10) || 0;
  const JGM = parseInt(attrs.slotsDCLJGMax, 10) || 0;

  const JDO = parseInt(attrs.slotsUDCLJDTot, 10) || 0;
  const JDM = parseInt(attrs.slotsDCLJDMax, 10) || 0;

  const totalTe = TeM - TeO;
  const totalTo = ToM - ToO;
  const totalBG = BGM - BGO;
  const totalBD = BDM - BDO;
  const totalJG = JGM - JGO;
  const totalJD = JDM - JDO;

  let msg = '';

  PI.msgSlot = 0;

  if (PI.msgEnergie === 1) { msg += 'Erreur. Energie Indisponible. '; }

  if (totalTe < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau de la tête. ';
  }

  if (totalTo < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau du torse. ';
  }

  if (totalBG < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau du bras gauche. ';
  }

  if (totalBD < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau du bras droit. ';
  }

  if (totalJG < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau de la jambe gauche. ';
  }

  if (totalJD < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau de la jambe droite. ';
  }

  if (msg !== '') { setPanneauInformation(msg, true, true); } else { resetPanneauInformation(); }
});

on('change:repeating_equipDefensif:porte change:repeating_equipDefensif:defenseBonus change:repeating_equipDefensif:reactionBonus', async (eventInfo) => {
  const attrs = await getAttrsAsync([
    'repeating_equipDefensif_defenseBonus',
    'repeating_equipDefensif_reactionBonus',
    'repeating_equipDefensif_porte',
  ]);

  const id = eventInfo.sourceAttribute.split('_')[2];
  const equipe = +attrs.repeating_equipDefensif_porte;

  let defense = 0;
  let reaction = 0;

  if (equipe === 1) {
    defense = +attrs.repeating_equipDefensif_defenseBonus;
    reaction = +attrs.repeating_equipDefensif_reactionBonus;
  }

  const update = {};

  update[`repeating_equipDefensif_${id}_defLigne`] = defense;
  update[`repeating_equipDefensif_${id}_reaLigne`] = reaction;

  await setAttrsAsync(update);
});

on('change:repeating_equipDefensif:reaLigne remove:repeating_equipDefensif:reaLigne', () => {
  TAS.repeatingSimpleSum('equipDefensif', 'reaLigne', 'bonusReaction');
});

on('change:repeating_equipDefensif:defLigne remove:repeating_equipDefensif:defLigne', () => {
  TAS.repeatingSimpleSum('equipDefensif', 'defLigne', 'bonusDefense');
});

on('change:calODEnd change:armure', async () => {
  const attrs = await getAttrsAsync([
    'armure',
    'calODEnd',
  ]);

  const armure = attrs.armure;

  const OD = +attrs.calODEnd;

  let bonus = 6;

  if (armure === 'sans' || armure === 'guardian' || OD < 3) { bonus = 0; }

  await setAttrsAsync({
    santeODBonus: bonus,
  });
});

on('change:calODCom change:armure', async () => {
  const attrs = await getAttrsAsync([
    'armure',
    'calODCom',
  ]);

  const armure = attrs.armure;

  const OD = +attrs.calODCom;

  let bonus = 0;
  let bonusAkimbo = 0;
  let bonusAmbidextrie = 0;

  if (armure === 'sans' || armure === 'guardian') {
    bonus = 0;
    bonusAkimbo = 0;
    bonusAmbidextrie = 0;
  } else {
    switch (OD) {
      case 2:
        bonus = 2;
        bonusAkimbo = 0;
        bonusAmbidextrie = 0;
        break;

      case 3:
        bonus = 2;
        bonusAkimbo = 2;
        bonusAmbidextrie = 0;
        break;

      case 4:
      case 5:
        bonus = 2;
        bonusAkimbo = 2;
        bonusAmbidextrie = 2;
        break;

      default:
        bonus = 0;
        bonusAkimbo = 0;
        bonusAmbidextrie = 0;
        break;
    }
  }

  await setAttrsAsync({
    reactionODBonus: bonus,
    akimboContactODBonus: bonusAkimbo,
    ambidextrieContactODBonus: bonusAmbidextrie,
  });
});

on('change:calODIns change:armure', async () => {
  const attrs = await getAttrsAsync([
    'armure',
    'calODIns',
  ]);

  const armure = attrs.armure;

  const OD = +attrs.calODIns;

  let bonus = 3 * OD;

  if (armure === 'sans' || armure === 'guardian' || OD < 3) { bonus = 0; }

  await setAttrsAsync({ initiativeODBonus: bonus });
});

on('change:calODTir change:armure', async () => {
  const attrs = await getAttrsAsync([
    'armure',
    'calODTir',
  ]);

  const armure = attrs.armure;

  const OD = +attrs.calODTir;

  let bonusAkimbo = 0;
  let bonusAmbidextrie = 0;

  if (armure === 'sans' || armure === 'guardian') {
    bonusAkimbo = 0;
    bonusAmbidextrie = 0;
  } else {
    switch (OD) {
      case 3:
        bonusAkimbo = 2;
        bonusAmbidextrie = 0;
        break;

      case 4:
      case 5:
        bonusAkimbo = 2;
        bonusAmbidextrie = 2;
        break;

      default:
        bonusAkimbo = 0;
        bonusAmbidextrie = 0;
        break;
    }
  }

  await setAttrsAsync({
    akimboDistanceODBonus: bonusAkimbo,
    ambidextrieDistanceODBonus: bonusAmbidextrie,
  });
});

on('change:calODAur change:aura change:armure', async () => {
  const attrs = await getAttrsAsync([
    'armure',
    'calODAur',
    'aura',
  ]);

  const armure = attrs.armure;

  const OD = +attrs.calODAur;
  const carac = +attrs.aura;

  let bonus = carac;

  if (armure === 'sans' || armure === 'guardian' || OD < 5) { bonus = 0; }

  await setAttrsAsync({
    defenseODBonus: bonus,
  });
});

on('change:calODDis change:armure', async () => {
  const attrs = await getAttrsAsync([
    'armure',
    'calODDis',
  ]);

  const armure = attrs.armure;

  const OD = +attrs.calODDis;

  let bonus = '';

  if (armure === 'sans' || armure === 'guardian' || OD < 3) { bonus = ''; } else if (OD === 4) { bonus = '{{ODDiscretion=[[@{discretion}]]}}'; } else if (OD === 5) { bonus = '{{ODDiscretion=[[@{discretion}+@{calODDis}]]}}'; }

  await setAttrsAsync({
    discretionDegatsBonus: bonus,
  });
});

on('change:warriorSoldierA change:warrior250PG change:deplOD change:forOD change:endOD', async () => {
  const attrs = await getAttrsAsync([
    'warriorSoldierA',
    'warrior250PG',
    'deplOD',
    'forOD',
    'endOD',
  ]);

  const PG250 = +attrs.warrior250PG;

  const mode = +attrs.warriorSoldierA;

  const OD1 = +attrs.deplOD;
  const OD2 = +attrs.forOD;
  const OD3 = +attrs.endOD;

  let bonus = 0;

  const update = {};

  if (mode !== 0) {
    bonus += 1;
    bonus += PG250;

    update.warriorHunterA = 0;
    update.warriorScholarA = 0;
    update.warriorHeraldA = 0;
    update.warriorScoutA = 0;
  }

  update.calODDep = OD1 + bonus;
  update.calODFor = OD2 + bonus;
  update.calODEnd = OD3 + bonus;

  await setAttrsAsync(update);
});

on('change:warriorHunterA change:warrior250PG change:hargneOD change:combOD change:instOD', async () => {
  const attrs = await getAttrsAsync([
    'warriorHunterA',
    'warrior250PG',
    'hargneOD',
    'combOD',
    'instOD',
  ]);

  const PG250 = +attrs.warrior250PG;

  const mode = +attrs.warriorHunterA;

  const OD1 = +attrs.hargneOD;
  const OD2 = +attrs.combOD;
  const OD3 = +attrs.instOD;

  let bonus = 0;

  const update = {};

  if (mode !== 0) {
    bonus += 1;
    bonus += PG250;

    update.warriorSoldierA = 0;
    update.warriorScholarA = 0;
    update.warriorHeraldA = 0;
    update.warriorScoutA = 0;
  }

  update.calODHar = OD1 + bonus;
  update.calODCom = OD2 + bonus;
  update.calODIns = OD3 + bonus;

  await setAttrsAsync(update);
});

on('change:warriorScholarA change:warrior250PG change:tirOD change:savoirOD change:technOD', async () => {
  const attrs = await getAttrsAsync([
    'warriorScholarA',
    'warrior250PG',
    'tirOD',
    'savoirOD',
    'technOD',
  ]);

  const PG250 = +attrs.warrior250PG;

  const mode = +attrs.warriorScholarA;

  const OD1 = +attrs.tirOD;
  const OD2 = +attrs.savoirOD;
  const OD3 = +attrs.technOD;

  let bonus = 0;

  const update = {};

  if (mode !== 0) {
    bonus += 1;
    bonus += PG250;

    update.warriorSoldierA = 0;
    update.warriorHunterA = 0;
    update.warriorHeraldA = 0;
    update.warriorScoutA = 0;
  }

  update.calODTir = OD1 + bonus;
  update.calODSav = OD2 + bonus;
  update.calODTec = OD3 + bonus;

  await setAttrsAsync(update);
});

on('change:warriorHeraldA change:warrior250PG change:auraOD change:paroleOD change:sfOD', async () => {
  const attrs = await getAttrsAsync([
    'warriorHeraldA',
    'warrior250PG',
    'auraOD',
    'paroleOD',
    'sfOD',
  ]);

  const PG250 = +attrs.warrior250PG;

  const mode = +attrs.warriorHeraldA;

  const OD1 = +attrs.auraOD;
  const OD2 = +attrs.paroleOD;
  const OD3 = +attrs.sfOD;

  let bonus = 0;

  const update = {};

  if (mode !== 0) {
    bonus += 1;
    bonus += PG250;

    update.warriorSoldierA = 0;
    update.warriorHunterA = 0;
    update.warriorScholarA = 0;
    update.warriorScoutA = 0;
  }

  update.calODAur = OD1 + bonus;
  update.calODPar = OD2 + bonus;
  update.calODSFR = OD3 + bonus;

  await setAttrsAsync(update);
});

on('change:warriorScoutA change:warrior250PG change:discrOD change:percOD change:dextOD', async () => {
  const attrs = await getAttrsAsync([
    'warriorScoutA',
    'warrior250PG',
    'discrOD',
    'percOD',
    'dextOD',
  ]);

  const PG250 = +attrs.warrior250PG;

  const mode = +attrs.warriorScoutA;

  const OD1 = +attrs.discrOD;
  const OD2 = +attrs.percOD;
  const OD3 = +attrs.dextOD;

  let bonus = 0;

  const update = {};

  if (mode !== 0) {
    bonus += 1;
    bonus += PG250;

    update.warriorSoldierA = 0;
    update.warriorHunterA = 0;
    update.warriorScholarA = 0;
    update.warriorHeraldA = 0;
  }

  update.calODDis = OD1 + bonus;
  update.calODPer = OD2 + bonus;
  update.calODDex = OD3 + bonus;

  await setAttrsAsync(update);
});

on('change:druidWolfConfiguration', async () => {
  const attrs = await getAttrsAsync([
    'druidWolfConfiguration',
  ]);

  const mode = attrs.druidWolfConfiguration;
  let PE = 0;

  if (mode === 'Labor' || mode === 'Medic' || mode === 'Recon') { PE = 1; }

  if (mode === 'Tech' || mode === 'Fighter') { PE = 2; }

  await setAttrsAsync({
    druidWolfConfigurationPE: PE,
  });
});

// META-ARMURE DE LEGENDE
on('change:armureLegende', (eventInfo) => {
  const mal = eventInfo.newValue;

  switch (mal) {
    case 'warrior':
      setAttrs({
        popup: 3,
      });
      break;
    case 'priest':
      setAttrs({
        popup: 4,
      });
      break;
    case 'warmaster':
      setAttrs({
        popup: 5,
      });
      break;
    case 'psion':
      setAttrs({
        popup: 6,
      });
      break;
    case 'warlock':
      setAttrs({
        popup: 7,
      });
      break;
    case 'druid':
      setAttrs({
        popup: 8,
      });
      break;
  }
});

on('clicked:selectionMALWarrior', async () => {
  const attrs = await getAttrsAsync([
    'listeTypeMALWarrior',
  ]);

  const choix = parseInt(attrs.listeTypeMALWarrior, 10) || 0;

  await setAttrsAsync({
    malwarriortype: choix,
    popup: 0,
  });
});

on('clicked:selectionMALPriest', async () => {
  const attrs = await getAttrsAsync([
    'listeTypeMALPriest',
  ]);

  const choix = parseInt(attrs.listeTypeMALPriest, 10) || 0;

  await setAttrsAsync({
    malpriestmode: choix,
    popup: 0,
  });
});

on('clicked:selectionMALWarmaster', async () => {
  const attrs = await getAttrsAsync([
    'listeTypeMALWarmaster',
  ]);

  const choix = parseInt(attrs.listeTypeMALWarmaster, 10) || 0;

  let popup = 0;

  if (choix === 1) { popup = 9; }

  await setAttrsAsync({
    malwarmastermode: choix,
    popup: popup,
  });
});

on('clicked:selectionMALWarmasterWarlord', async () => {
  const attrs = await getAttrsAsync([
    'listeTypeMALWarmasterWarlord',
  ]);

  const choix = parseInt(attrs.listeTypeMALWarmasterWarlord, 10) || 0;

  await setAttrsAsync({
    malwarmasterwarlord: choix,
    popup: 0,
  });
});

on('clicked:selectionMALPsion', async () => {
  const attrs = await getAttrsAsync([
    'listeModeMALPsion',
    'listeModeMALPsion2',
  ]);

  const choix = parseInt(attrs.listeModeMALPsion, 10) || 0;
  const choix2 = parseInt(attrs.listeModeMALPsion2, 10) || 0;

  await setAttrsAsync({
    malpsionmode: choix,
    malpsionmode2: choix2,
    popup: 0,
  });
});

on('clicked:selectionMALWarlock', async () => {
  const attrs = await getAttrsAsync([
    'listeModeMALWarlock',
  ]);

  const choix = parseInt(attrs.listeModeMALWarlock, 10) || 0;

  await setAttrsAsync({
    malwarlockmode: choix,
    popup: 0,
  });
});

on('clicked:selectionMALDruid', async () => {
  const attrs = await getAttrsAsync([
    'listeModeMALDruid',
  ]);

  const choix = parseInt(attrs.listeModeMALDruid, 10) || 0;

  await setAttrsAsync({
    maldruidmod: choix,
    popup: 0,
  });
});

on('change:repeating_modulesMALDCLion remove:repeating_modulesMALDCLion', () => {
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLTete', 'slotsMALUDCLTeteTot');
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLTorse', 'slotsMALUDCLTorseTot');
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLBG', 'slotsMALUDCLBGTot');
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLBD', 'slotsMALUDCLBDTot');
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLJG', 'slotsMALUDCLJGTot');
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLJD', 'slotsMALUDCLJDTot');
});

on('change:slotsMALUDCLTeteTot change:slotsMALUDCLTorseTot change:slotsMALUDCLBGTot change:slotsMALUDCLBDTot change:slotsMALUDCLJGTot change:slotsMALUDCLJDTot', async () => {
  const attrs = await getAttrsAsync([
    'slotsMALUDCLTeteTot', 'slotsMALDCLTeteMax',
    'slotsMALUDCLTorseTot', 'slotsMALDCLTorseMax',
    'slotsMALUDCLBGTot', 'slotsMALDCLBGMax',
    'slotsMALUDCLBDTot', 'slotsMALDCLBDMax',
    'slotsMALUDCLJGTot', 'slotsMALDCLJGMax',
    'slotsMALUDCLJDTot', 'slotsMALDCLJDMax',
  ]);

  const TeO = parseInt(attrs.slotsMALUDCLTeteTot, 10) || 0;
  const TeM = parseInt(attrs.slotsMALDCLTeteMax, 10) || 0;

  const ToO = parseInt(attrs.slotsMALUDCLTorseTot, 10) || 0;
  const ToM = parseInt(attrs.slotsMALDCLTorseMax, 10) || 0;

  const BGO = parseInt(attrs.slotsMALUDCLBGTot, 10) || 0;
  const BGM = parseInt(attrs.slotsMALDCLBGMax, 10) || 0;

  const BDO = parseInt(attrs.slotsMALUDCLBDTot, 10) || 0;
  const BDM = parseInt(attrs.slotsMALDCLBDMax, 10) || 0;

  const JGO = parseInt(attrs.slotsMALUDCLJGTot, 10) || 0;
  const JGM = parseInt(attrs.slotsMALDCLJGMax, 10) || 0;

  const JDO = parseInt(attrs.slotsMALUDCLJDTot, 10) || 0;
  const JDM = parseInt(attrs.slotsMALDCLJDMax, 10) || 0;

  const totalTe = TeM - TeO;
  const totalTo = ToM - ToO;
  const totalBG = BGM - BGO;
  const totalBD = BDM - BDO;
  const totalJG = JGM - JGO;
  const totalJD = JDM - JDO;

  let msg = '';

  PI.msgSlot = 0;

  if (PI.msgEnergie === 1) {
    msg += 'Erreur. Energie Indisponible. ';
  }

  if (totalTe < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau de la tête. ';
  }

  if (totalTo < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau du torse. ';
  }

  if (totalBG < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau du bras gauche. ';
  }

  if (totalBD < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau du bras droit. ';
  }

  if (totalJG < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau de la jambe gauche. ';
  }

  if (totalJD < 0) {
    msg += 'Erreur. ';

    if (PI.msgSlot === 0) {
      PI.msgSlot = 1;
      msg += 'Capacité du Compagnon dépassée. ';
    }

    msg += 'Trop de slots occupé au niveau de la jambe droite. ';
  }

  if (msg !== '') { setPanneauInformation(msg, true, true); } else { resetPanneauInformation(); }
});

on('clicked:repeating_modulesmaldclion:pemdlion', async () => {
  const attrs = await getAttrsAsync([
    'repeating_modules_moduleEnergieMALDCLion',
    'MALDruidLionPEAct',
  ]);

  const PEM = parseInt(attrs.repeating_modules_moduleEnergieMALDCLion, 10) || 0;
  const PE = parseInt(attrs.MALDruidLionPEAct, 10) || 0;

  const total = PE - PEM;

  if (total < 0) {
    setPanneauInformation('Erreur. Energie Indisponible.', false, false, true);

    PI.msgEnergie = 1;
  } else {
    setAttrs({
      MALDruidLionPEAct: total,
    });
  }
});

on('change:MALWarriorSoldierA change:deplOD change:forOD change:endOD', async () => {
  const attrs = await getAttrsAsync([
    'MALWarriorSoldierA',
    'deplOD',
    'forOD',
    'endOD',
  ]);

  const mode = +attrs.MALWarriorSoldierA;

  const OD1 = +attrs.deplOD;
  const OD2 = +attrs.forOD;
  const OD3 = +attrs.endOD;

  let bonus = 0;

  const update = {};

  if (mode !== 0) { bonus += 1; }

  update.calODDep = OD1 + bonus;
  update.calODFor = OD2 + bonus;
  update.calODEnd = OD3 + bonus;

  await setAttrsAsync(update);
});

on('change:MALWarriorHunterA change:hargneOD change:combOD change:instOD', async () => {
  const attrs = await getAttrsAsync([
    'MALWarriorHunterA',
    'hargneOD',
    'combOD',
    'instOD',
  ]);

  const mode = +attrs.MALWarriorHunterA;

  const OD1 = +attrs.hargneOD;
  const OD2 = +attrs.combOD;
  const OD3 = +attrs.instOD;

  let bonus = 0;

  const update = {};

  if (mode !== 0) { bonus += 1; }

  update.calODHar = OD1 + bonus;
  update.calODCom = OD2 + bonus;
  update.calODIns = OD3 + bonus;

  await setAttrsAsync(update);
});

on('change:MALWarriorScholarA change:tirOD change:savoirOD change:technOD', async () => {
  const attrs = await getAttrsAsync([
    'MALWarriorScholarA',
    'tirOD',
    'savoirOD',
    'technOD',
  ]);

  const mode = +attrs.MALWarriorScholarA;

  const OD1 = +attrs.tirOD;
  const OD2 = +attrs.savoirOD;
  const OD3 = +attrs.technOD;

  let bonus = 0;

  const update = {};

  if (mode !== 0) { bonus += 1; }

  update.calODTir = OD1 + bonus;
  update.calODSav = OD2 + bonus;
  update.calODTec = OD3 + bonus;

  await setAttrsAsync(update);
});

on('change:MALWarriorHeraldA change:auraOD change:paroleOD change:sfOD', async () => {
  const attrs = await getAttrsAsync([
    'MALWarriorHeraldA',
    'auraOD',
    'paroleOD',
    'sfOD',
  ]);

  const mode = +attrs.MALWarriorHeraldA;

  const OD1 = +attrs.auraOD;
  const OD2 = +attrs.paroleOD;
  const OD3 = +attrs.sfOD;

  let bonus = 0;

  const update = {};

  if (mode !== 0) { bonus += 1; }

  update.calODAur = OD1 + bonus;
  update.calODPar = OD2 + bonus;
  update.calODSFR = OD3 + bonus;

  await setAttrsAsync(update);
});

on('change:MALWarriorScoutA change:discrOD change:percOD change:dextOD', async () => {
  const attrs = await getAttrsAsync([
    'MALWarriorScoutA',
    'discrOD',
    'percOD',
    'dextOD',
  ]);

  const mode = +attrs.MALWarriorScoutA;

  const OD1 = +attrs.discrOD;
  const OD2 = +attrs.percOD;
  const OD3 = +attrs.dextOD;

  let bonus = 0;

  const update = {};

  if (mode !== 0) { bonus += 1; }

  update.calODDis = OD1 + bonus;
  update.calODPer = OD2 + bonus;
  update.calODDex = OD3 + bonus;

  await setAttrsAsync(update);
});

on('change:MALBarbarianGoliath', async () => {
  const attrs = await getAttrsAsync([
    'MALBarbarianGoliath',
  ]);

  const goliath = +attrs.MALBarbarianGoliath;

  const defense = goliath;
  const reaction = goliath * 2;
  const dgts = `${goliath}D6`;

  await setAttrsAsync({
    MALBarbarianDef: defense,
    MALBarbarianRea: reaction,
    MALBarbarianDegat: dgts,
  });
});

on('change:MALDruidWolfConfiguration', async () => {
  const attrs = await getAttrsAsync([
    'MALDruidWolfConfiguration',
  ]);

  const mode = attrs.MALDruidWolfConfiguration;
  let PE = 0;

  if (mode === 'Labor' || mode === 'Medic' || mode === 'Recon') { PE = 1; }

  if (mode === 'Tech' || mode === 'Fighter') { PE = 2; }

  await setAttrsAsync({
    MAJDruidWolfConfigurationPE: PE,
  });
});

on('change:tabArmureLegende', (eventInfo) => {
  const mal = eventInfo.newValue;

  if (mal === '0') {
    setAttrs({
      armureLegende: 'sans',
    });
  }
});
// FIN META-ARMURE DE LEGENDE

on('change:bonusCarac', async () => {
  const attrs = await getAttrsAsync([
    'bonusCarac',
  ]);

  const bonus = +attrs.bonusCarac;

  const update = {};

  if (bonus === 1) { update.caracteristique4 = ''; }

  if (bonus !== 2 && bonus !== 1) {
    update.caracteristique3 = '';
    update.caracteristique4 = '';
  }

  await setAttrsAsync(update);
});

on('clicked:capaciteUltime', async () => {
  const attrs = await getAttrsAsync([
    'coutCapaciteUltime',
    'energiePJ',
  ]);

  const cout = +attrs.coutCapaciteUltime;
  const PE = +attrs.energiePJ;

  const total = PE - cout;

  if (total < 0) {
    setPanneauInformation('Erreur. Energie Indisponible.', false, false, true);

    PI.msgEnergie = 1;
  } else {
    await setAttrsAsync({
      energiePJ: total,
    });
  }
});

on('change:fichePNJ change:diceInitiative change:bonusInitiativeP change:malusInitiative change:MasquePNJAEMaj', async () => {
  const attrs = await getAttrsAsync([
    'fichePNJ',
    'MasquePNJAEMaj',
  ]);

  const fiche = +attrs.fichePNJ;
  const masque = +attrs.MasquePNJAEMaj;

  if (fiche === 1 || fiche === 2) {
    if (masque > 0) {
      await setAttrsAsync({
        diceInitiative: 0,
        bonusInitiativeP: 30,
        malusInitiative: 0,
      });
    }
  }

  if (fiche === 3) {
    await setAttrsAsync({
      diceInitiative: 0,
      bonusInitiativeP: 1,
      malusInitiative: 0,
    });
  }
});

on('clicked:resetArmure', async () => {
  const attrs = await getAttrsAsync([
    'armurePJ_max',
    'energiePJ_max',
  ]);

  const armure = attrs.armurePJ_max;
  const energie = attrs.energiePJ_max;

  await setAttrsAsync({
    armurePJ: armure,
    energiePJ: energie,
  });
});

on('clicked:majV15', () => {
  getSectionIDs('repeating_slotsTete', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsTete_${currentID}_slotsUTete`,
          `repeating_slotsTete_${currentID}_slotsNTete`,
          `repeating_slotsTete_${currentID}_slotsATete`,
          `repeating_slotsTete_${currentID}_slotsETete`,
          `repeating_slotsTete_${currentID}_slotsDureeTete`,
          `repeating_slotsTete_${currentID}_slotsDTete`,
        ], (v) => {
          const u = v[`repeating_slotsTete_${currentID}_slotsUTete`];
          const n = v[`repeating_slotsTete_${currentID}_slotsNTete`];
          const a = v[`repeating_slotsTete_${currentID}_slotsATete`];
          const e = v[`repeating_slotsTete_${currentID}_slotsETete`];
          const duree = v[`repeating_slotsTete_${currentID}_slotsDureeTete`];
          const d = v[`repeating_slotsTete_${currentID}_slotsDTete`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modules_${newrowid}_moduleSlotTete`] = u;
          newrowattrs[`repeating_modules_${newrowid}_moduleNom`] = n;
          newrowattrs[`repeating_modules_${newrowid}_moduleActivation`] = a;
          newrowattrs[`repeating_modules_${newrowid}_moduleEnergie`] = e;
          newrowattrs[`repeating_modules_${newrowid}_moduleDuree`] = duree;
          newrowattrs[`repeating_modules_${newrowid}_moduleDescription`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  getSectionIDs('repeating_slotsTorse', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsTorse_${currentID}_slotsUTorse`,
          `repeating_slotsTorse_${currentID}_slotsNTorse`,
          `repeating_slotsTorse_${currentID}_slotsATorse`,
          `repeating_slotsTorse_${currentID}_slotsETorse`,
          `repeating_slotsTorse_${currentID}_slotsDureeTorse`,
          `repeating_slotsTorse_${currentID}_slotsDTorse`,
        ], (v) => {
          const u = v[`repeating_slotsTorse_${currentID}_slotsUTorse`];
          const n = v[`repeating_slotsTorse_${currentID}_slotsNTorse`];
          const a = v[`repeating_slotsTorse_${currentID}_slotsATorse`];
          const e = v[`repeating_slotsTorse_${currentID}_slotsETorse`];
          const duree = v[`repeating_slotsTorse_${currentID}_slotsDureeTorse`];
          const d = v[`repeating_slotsTorse_${currentID}_slotsDTorse`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modules_${newrowid}_moduleSlotTorse`] = u;
          newrowattrs[`repeating_modules_${newrowid}_moduleNom`] = n;
          newrowattrs[`repeating_modules_${newrowid}_moduleActivation`] = a;
          newrowattrs[`repeating_modules_${newrowid}_moduleEnergie`] = e;
          newrowattrs[`repeating_modules_${newrowid}_moduleDuree`] = duree;
          newrowattrs[`repeating_modules_${newrowid}_moduleDescription`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  getSectionIDs('repeating_slotsBG', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsBG_${currentID}_slotsUBG`,
          `repeating_slotsBG_${currentID}_slotsNBG`,
          `repeating_slotsBG_${currentID}_slotsABG`,
          `repeating_slotsBG_${currentID}_slotsEBG`,
          `repeating_slotsBG_${currentID}_slotsDureeBG`,
          `repeating_slotsBG_${currentID}_slotsDBG`,
        ], (v) => {
          const u = v[`repeating_slotsBG_${currentID}_slotsUBG`];
          const n = v[`repeating_slotsBG_${currentID}_slotsNBG`];
          const a = v[`repeating_slotsBG_${currentID}_slotsABG`];
          const e = v[`repeating_slotsBG_${currentID}_slotsEBG`];
          const duree = v[`repeating_slotsBG_${currentID}_slotsDureeBG`];
          const d = v[`repeating_slotsBG_${currentID}_slotsDBG`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modules_${newrowid}_moduleSlotBG`] = u;
          newrowattrs[`repeating_modules_${newrowid}_moduleNom`] = n;
          newrowattrs[`repeating_modules_${newrowid}_moduleActivation`] = a;
          newrowattrs[`repeating_modules_${newrowid}_moduleEnergie`] = e;
          newrowattrs[`repeating_modules_${newrowid}_moduleDuree`] = duree;
          newrowattrs[`repeating_modules_${newrowid}_moduleDescription`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  getSectionIDs('repeating_slotsBD', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsBD_${currentID}_slotsUBD`,
          `repeating_slotsBD_${currentID}_slotsNBD`,
          `repeating_slotsBD_${currentID}_slotsABD`,
          `repeating_slotsBD_${currentID}_slotsEBD`,
          `repeating_slotsBD_${currentID}_slotsDureeBD`,
          `repeating_slotsBD_${currentID}_slotsDBD`,
        ], (v) => {
          const u = v[`repeating_slotsBD_${currentID}_slotsUBD`];
          const n = v[`repeating_slotsBD_${currentID}_slotsNBD`];
          const a = v[`repeating_slotsBD_${currentID}_slotsABD`];
          const e = v[`repeating_slotsBD_${currentID}_slotsEBD`];
          const duree = v[`repeating_slotsBD_${currentID}_slotsDureeBD`];
          const d = v[`repeating_slotsBD_${currentID}_slotsDBD`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modules_${newrowid}_moduleSlotBD`] = u;
          newrowattrs[`repeating_modules_${newrowid}_moduleNom`] = n;
          newrowattrs[`repeating_modules_${newrowid}_moduleActivation`] = a;
          newrowattrs[`repeating_modules_${newrowid}_moduleEnergie`] = e;
          newrowattrs[`repeating_modules_${newrowid}_moduleDuree`] = duree;
          newrowattrs[`repeating_modules_${newrowid}_moduleDescription`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  getSectionIDs('repeating_slotsJG', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsJG_${currentID}_slotsUJG`,
          `repeating_slotsJG_${currentID}_slotsNJG`,
          `repeating_slotsJG_${currentID}_slotsAJG`,
          `repeating_slotsJG_${currentID}_slotsEJG`,
          `repeating_slotsJG_${currentID}_slotsDureeJG`,
          `repeating_slotsJG_${currentID}_slotsDJG`,
        ], (v) => {
          const u = v[`repeating_slotsJG_${currentID}_slotsUJG`];
          const n = v[`repeating_slotsJG_${currentID}_slotsNJG`];
          const a = v[`repeating_slotsJG_${currentID}_slotsAJG`];
          const e = v[`repeating_slotsJG_${currentID}_slotsEJG`];
          const duree = v[`repeating_slotsJG_${currentID}_slotsDureeJG`];
          const d = v[`repeating_slotsJG_${currentID}_slotsDJG`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modules_${newrowid}_moduleSlotJG`] = u;
          newrowattrs[`repeating_modules_${newrowid}_moduleNom`] = n;
          newrowattrs[`repeating_modules_${newrowid}_moduleActivation`] = a;
          newrowattrs[`repeating_modules_${newrowid}_moduleEnergie`] = e;
          newrowattrs[`repeating_modules_${newrowid}_moduleDuree`] = duree;
          newrowattrs[`repeating_modules_${newrowid}_moduleDescription`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  getSectionIDs('repeating_slotsJD', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsJD_${currentID}_slotsUJD`,
          `repeating_slotsJD_${currentID}_slotsNJD`,
          `repeating_slotsJD_${currentID}_slotsAJD`,
          `repeating_slotsJD_${currentID}_slotsEJD`,
          `repeating_slotsJD_${currentID}_slotsDureeJD`,
          `repeating_slotsJD_${currentID}_slotsDJD`,
        ], (v) => {
          const u = v[`repeating_slotsJD_${currentID}_slotsUJD`];
          const n = v[`repeating_slotsJD_${currentID}_slotsNJD`];
          const a = v[`repeating_slotsJD_${currentID}_slotsAJD`];
          const e = v[`repeating_slotsJD_${currentID}_slotsEJD`];
          const duree = v[`repeating_slotsJD_${currentID}_slotsDureeJD`];
          const d = v[`repeating_slotsJD_${currentID}_slotsDJD`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modules_${newrowid}_moduleSlotJD`] = u;
          newrowattrs[`repeating_modules_${newrowid}_moduleNom`] = n;
          newrowattrs[`repeating_modules_${newrowid}_moduleActivation`] = a;
          newrowattrs[`repeating_modules_${newrowid}_moduleEnergie`] = e;
          newrowattrs[`repeating_modules_${newrowid}_moduleDuree`] = duree;
          newrowattrs[`repeating_modules_${newrowid}_moduleDescription`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  getSectionIDs('repeating_slotsDCLTete', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsDCLTete_${currentID}_slotsUDCLTete`,
          `repeating_slotsDCLTete_${currentID}_slotsNDCLTete`,
          `repeating_slotsDCLTete_${currentID}_slotsADCLTete`,
          `repeating_slotsDCLTete_${currentID}_slotsEDCLTete`,
          `repeating_slotsDCLTete_${currentID}_slotsDDCLTete`,
          `repeating_slotsDCLTete_${currentID}_slotsUDCLDTete`,
        ], (v) => {
          const u = v[`repeating_slotsDCLTete_${currentID}_slotsUDCLTete`];
          const n = v[`repeating_slotsDCLTete_${currentID}_slotsNDCLTete`];
          const a = v[`repeating_slotsDCLTete_${currentID}_slotsADCLTete`];
          const e = v[`repeating_slotsDCLTete_${currentID}_slotsEDCLTete`];
          const duree = v[`repeating_slotsDCLTete_${currentID}_slotsDDCLTete`];
          const d = v[`repeating_slotsDCLTete_${currentID}_slotsUDCLDTete`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleSlotDCLTete`] = u;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleNomDCLion`] = n;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleActivationDCLion`] = a;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleEnergieDCLion`] = e;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDureeDCLion`] = duree;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDescriptionDCLion`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  getSectionIDs('repeating_slotsDCLTorse', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsDCLTorse_${currentID}_slotsUDCLTorse`,
          `repeating_slotsDCLTorse_${currentID}_slotsNDCLTorse`,
          `repeating_slotsDCLTorse_${currentID}_slotsADCLTorse`,
          `repeating_slotsDCLTorse_${currentID}_slotsEDCLTorse`,
          `repeating_slotsDCLTorse_${currentID}_slotsDDCLTorse`,
          `repeating_slotsDCLTorse_${currentID}_slotsUDCLDTorse`,
        ], (v) => {
          const u = v[`repeating_slotsDCLTorse_${currentID}_slotsUDCLTorse`];
          const n = v[`repeating_slotsDCLTorse_${currentID}_slotsNDCLTorse`];
          const a = v[`repeating_slotsDCLTorse_${currentID}_slotsADCLTorse`];
          const e = v[`repeating_slotsDCLTorse_${currentID}_slotsEDCLTorse`];
          const duree = v[`repeating_slotsDCLTorse_${currentID}_slotsDDCLTorse`];
          const d = v[`repeating_slotsDCLTorse_${currentID}_slotsUDCLDTorse`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleSlotDCLTorse`] = u;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleNomDCLion`] = n;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleActivationDCLion`] = a;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleEnergieDCLion`] = e;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDureeDCLion`] = duree;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDescriptionDCLion`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  getSectionIDs('repeating_slotsDCLBG', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsDCLBG_${currentID}_slotsUDCLBG`,
          `repeating_slotsDCLBG_${currentID}_slotsNDCLBG`,
          `repeating_slotsDCLBG_${currentID}_slotsADCLBG`,
          `repeating_slotsDCLBG_${currentID}_slotsEDCLBG`,
          `repeating_slotsDCLBG_${currentID}_slotsDDCLBG`,
          `repeating_slotsDCLBG_${currentID}_slotsUDCLDBG`,
        ], (v) => {
          const u = v[`repeating_slotsDCLBG_${currentID}_slotsUDCLBG`];
          const n = v[`repeating_slotsDCLBG_${currentID}_slotsNDCLBG`];
          const a = v[`repeating_slotsDCLBG_${currentID}_slotsADCLBG`];
          const e = v[`repeating_slotsDCLBG_${currentID}_slotsEDCLBG`];
          const duree = v[`repeating_slotsDCLBG_${currentID}_slotsDDCLBG`];
          const d = v[`repeating_slotsDCLBG_${currentID}_slotsUDCLDBG`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleSlotDCLBG`] = u;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleNomDCLion`] = n;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleActivationDCLion`] = a;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleEnergieDCLion`] = e;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDureeDCLion`] = duree;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDescriptionDCLion`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  getSectionIDs('repeating_slotsDCLBD', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsDCLBD_${currentID}_slotsUDCLBD`,
          `repeating_slotsDCLBD_${currentID}_slotsNDCLBD`,
          `repeating_slotsDCLBD_${currentID}_slotsADCLBD`,
          `repeating_slotsDCLBD_${currentID}_slotsEDCLBD`,
          `repeating_slotsDCLBD_${currentID}_slotsDDCLBD`,
          `repeating_slotsDCLBD_${currentID}_slotsUDCLDBD`,
        ], (v) => {
          const u = v[`repeating_slotsDCLBD_${currentID}_slotsUDCLBD`];
          const n = v[`repeating_slotsDCLBD_${currentID}_slotsNDCLBD`];
          const a = v[`repeating_slotsDCLBD_${currentID}_slotsADCLBD`];
          const e = v[`repeating_slotsDCLBD_${currentID}_slotsEDCLBD`];
          const duree = v[`repeating_slotsDCLBD_${currentID}_slotsDDCLBD`];
          const d = v[`repeating_slotsDCLBD_${currentID}_slotsUDCLDBD`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleSlotDCLBD`] = u;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleNomDCLion`] = n;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleActivationDCLion`] = a;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleEnergieDCLion`] = e;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDureeDCLion`] = duree;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDescriptionDCLion`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  getSectionIDs('repeating_slotsDCLJG', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsDCLJG_${currentID}_slotsUDCLJG`,
          `repeating_slotsDCLJG_${currentID}_slotsNDCLJG`,
          `repeating_slotsDCLJG_${currentID}_slotsADCLJG`,
          `repeating_slotsDCLJG_${currentID}_slotsEDCLJG`,
          `repeating_slotsDCLJG_${currentID}_slotsDDCLJG`,
          `repeating_slotsDCLJG_${currentID}_slotsUDCLDJG`,
        ], (v) => {
          const u = v[`repeating_slotsDCLJG_${currentID}_slotsUDCLJG`];
          const n = v[`repeating_slotsDCLJG_${currentID}_slotsNDCLJG`];
          const a = v[`repeating_slotsDCLJG_${currentID}_slotsADCLJG`];
          const e = v[`repeating_slotsDCLJG_${currentID}_slotsEDCLJG`];
          const duree = v[`repeating_slotsDCLJG_${currentID}_slotsDDCLJG`];
          const d = v[`repeating_slotsDCLJG_${currentID}_slotsUDCLDJG`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleSlotDCLJG`] = u;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleNomDCLion`] = n;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleActivationDCLion`] = a;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleEnergieDCLion`] = e;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDureeDCLion`] = duree;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDescriptionDCLion`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  getSectionIDs('repeating_slotsDCLJD', (idarray) => {
    _.each(idarray, (currentID, i) => {
      getAttrs(
        [
          `repeating_slotsDCLJD_${currentID}_slotsUDCLJD`,
          `repeating_slotsDCLJD_${currentID}_slotsNDCLJD`,
          `repeating_slotsDCLJD_${currentID}_slotsADCLJD`,
          `repeating_slotsDCLJD_${currentID}_slotsEDCLJD`,
          `repeating_slotsDCLJD_${currentID}_slotsDDCLJD`,
          `repeating_slotsDCLJD_${currentID}_slotsUDCLDJD`,
        ], (v) => {
          const u = v[`repeating_slotsDCLJD_${currentID}_slotsUDCLJD`];
          const n = v[`repeating_slotsDCLJD_${currentID}_slotsNDCLJD`];
          const a = v[`repeating_slotsDCLJD_${currentID}_slotsADCLJD`];
          const e = v[`repeating_slotsDCLJD_${currentID}_slotsEDCLJD`];
          const duree = v[`repeating_slotsDCLJD_${currentID}_slotsDDCLJD`];
          const d = v[`repeating_slotsDCLJD_${currentID}_slotsUDCLDJD`];

          const newrowid = generateRowID();
          const newrowattrs = {};
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleSlotDCLJD`] = u;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleNomDCLion`] = n;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleActivationDCLion`] = a;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleEnergieDCLion`] = e;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDureeDCLion`] = duree;
          newrowattrs[`repeating_modulesDCLion_${newrowid}_moduleDescriptionDCLion`] = d;
          setAttrs(newrowattrs);
        },
      );
    });
  });

  setAttrs({
    version: 15,
  });
});

on('clicked:repeating_modules:pem', async () => {
  const attrs = await getAttrsAsync([
    'repeating_modules_moduleEnergie',
    'fichePNJ',
    'armure',
    'espoir',
    'energiePNJ',
    'energiePJ',
  ]);

  const fiche = +attrs.fichePNJ;

  const armure = attrs.armure;
  const espoir = +attrs.espoir;

  const cout = +attrs.repeating_modules_moduleEnergie;

  let PE = 0;

  const update = {};

  let total = 0;

  if (fiche === 0) {
    if (armure === 'berserk') { PE = espoir; } else { PE = +attrs.energiePJ; }

    total = PE - cout;

    if (total < 0) {
      if (armure !== 'berserk') { setPanneauInformation('Erreur. Energie Indisponible.', false, false, true); } else { setPanneauInformation('Erreur. Espoir Indisponible.', false, false, true); }

      PI.msgEnergie = 1;
    } else if (armure === 'berserk') { update.espoir = total; } else { update.energiePJ = total; }
  } else if (fiche === 1) {
    PE = +attrs.energiePNJ;

    total = PE - cout;

    if (total < 0) {
      setPanneauInformation('Erreur. Energie Indisponible.', false, false, true);

      PI.msgEnergie = 1;
    } else { update.energiePNJ = total; }
  }

  await setAttrsAsync(update);
});

on('clicked:repeating_modulesdclion:pemdlion', async () => {
  const attrs = await getAttrsAsync([
    'repeating_modules_moduleEnergieDCLion',
    'druidLionPEAct',
  ]);

  const PE = +attrs.druidLionPEAct;
  const cout = +attrs.repeating_modules_moduleEnergieDCLion;

  const total = PE - cout;

  if (total < 0) {
    setPanneauInformation('Erreur. Energie Indisponible.', false, false, true);

    PI.msgEnergie = 1;
  } else {
    await setAttrsAsync({ druidLionPEAct: total });
  }
});

on('change:tab change:fichePNJ', () => {
  resetPanneauInformation();
});

// MECHAARMURE
const mechaArmure = {
  0: {
    vitesse: 0,
    manoeuvrabilite: 0,
    puissance: 0,
    senseurs: 0,
    systemes: 0,
    resilience: 0,
    blindage: 0,
    cdf: 0,
    noyaux: 0,
  },
  archangel: {
    vitesse: 3,
    manoeuvrabilite: 5,
    puissance: 5,
    senseurs: 6,
    systemes: 8,
    resilience: 30,
    blindage: 70,
    cdf: 30,
    noyaux: 100,
  },
  nephilim: {
    vitesse: 2,
    manoeuvrabilite: -4,
    puissance: 10,
    senseurs: 10,
    systemes: 10,
    resilience: 28,
    blindage: 120,
    cdf: 20,
    noyaux: 100,
  },
  demon: {
    vitesse: 2,
    manoeuvrabilite: 4,
    puissance: 12,
    senseurs: 8,
    systemes: 4,
    resilience: 20,
    blindage: 80,
    cdf: 30,
    noyaux: 100,
  },
};

on('change:mechaArmure change:mechaArmureVitesseModif change:mechaArmureManoeuvrabiliteModif change:mechaArmurePuissanceModif change:mechaArmureSenseursModif change:mechaArmureSystemesModif change:mechaArmureResilienceModif change:MANOGSTActive change:mechaArmureBlindageModif change:mechaArmureCdfModif change:mechaArmureNoyauxEnergieModif sheet:opened', async () => {
  const attrs = await getAttrsAsync([
    'mechaArmure',
    'mechaArmureVitesseModif',
    'mechaArmureManoeuvrabiliteModif',
    'mechaArmurePuissanceModif',
    'mechaArmureSystemesModif',
    'mechaArmureResilienceModif',
    'MANOGSTActive',
    'mechaArmureBlindageModif',
    'mechaArmureCdfModif',
    'mechaArmureNoyauxEnergieModif',
  ]);

  const MA = attrs.mechaArmure;
  const type = mechaArmure[MA] || [];

  const vitesse = parseInt(type.vitesse, 10) || 0;
  const manoeuvrabilite = parseInt(type.manoeuvrabilite, 10) || 0;
  const puissance = parseInt(type.puissance, 10) || 0;
  const senseurs = parseInt(type.senseurs, 10) || 0;
  const systemes = parseInt(type.systemes, 10) || 0;
  const resilience = parseInt(type.resilience, 10) || 0;
  const blindage = parseInt(type.blindage, 10) || 0;
  const cdf = parseInt(type.cdf, 10) || 0;
  const noyaux = parseInt(type.noyaux, 10) || 0;

  const vitesseM = parseInt(attrs.mechaArmureVitesseModif, 10) || 0;
  const manoeuvrabiliteM = parseInt(attrs.mechaArmureManoeuvrabiliteModif, 10) || 0;
  const puissanceM = parseInt(attrs.mechaArmurePuissanceModif, 10) || 0;
  const senseursM = parseInt(attrs.mechaArmureSenseursModif, 10) || 0;
  const systemesM = parseInt(attrs.mechaArmureSystemesModif, 10) || 0;
  const resilienceM = parseInt(attrs.mechaArmureResilienceModif, 10) || 0;
  const blindageM = parseInt(attrs.mechaArmureBlindageModif, 10) || 0;
  const cdfM = parseInt(attrs.mechaArmureCdfModif, 10) || 0;
  const noyauxM = parseInt(attrs.mechaArmureNoyauxEnergieModif, 10) || 0;

  const MST = parseInt(attrs.MANOGSTActive, 10) || 0;

  let resilienceB = 0;

  if (MST === 1) { resilienceB += 10; }

  const vitesseTotal = vitesse + vitesseM;
  const manoeuvrabiliteTotal = manoeuvrabilite + manoeuvrabiliteM;
  const puissanceTotal = puissance + puissanceM;
  const senseursTotal = senseurs + senseursM;
  const systemesTotal = systemes + systemesM;
  const resilienceTotal = resilience + resilienceM + resilienceB;
  const blindageTotal = blindage + blindageM;
  const cdfTotal = cdf + cdfM;
  const noyauxTotal = noyaux + noyauxM;

  let translation;

  if (!MA) { translation = ''; } else { translation = getTranslationByKey(MA); }

  await setAttrsAsync({
    mechaArmureNom: translation,
    mechaArmureVitesse: vitesseTotal,
    mechaArmureManoeuvrabilite: manoeuvrabiliteTotal,
    mechaArmurePuissance: puissanceTotal,
    mechaArmureSenseurs: senseursTotal,
    mechaArmureSystemes: systemesTotal,
    mechaArmureResilience_max: resilienceTotal,
    mechaArmureBlindage_max: blindageTotal,
    mechaArmureCdf_max: cdfTotal,
    mechaArmureNoyauxEnergie_max: noyauxTotal,
  });
});

on('change:mechaArmureTypeJets change:mechaArmureManoeuvrabilite change:mechaArmurePuissance change:mechaArmureSenseurs change:mechaArmureSystemes sheet:opened', async () => {
  const attrs = await getAttrsAsync([
    'mechaArmureTypeJets',
    'mechaArmureManoeuvrabilite',
    'mechaArmurePuissance',
    'mechaArmureSenseurs',
    'mechaArmureSystemes',
  ]);

  const type = parseInt(attrs.mechaArmureTypeJets, 10) || 0;
  const manoeuvrabilite = parseInt(attrs.mechaArmureManoeuvrabilite, 10) || 0;
  const puissance = parseInt(attrs.mechaArmurePuissance, 10) || 0;
  const senseurs = parseInt(attrs.mechaArmureSenseurs, 10) || 0;
  const systemes = parseInt(attrs.mechaArmureSystemes, 10) || 0;

  const update = {};

  switch (type) {
    case 1:
      update.mechaArmureJetBonus = manoeuvrabilite;
      update.mechaArmureJetBonusType = 'Manoeuvrabilité';
      break;
    case 2:
      update.mechaArmureJetBonus = puissance;
      update.mechaArmureJetBonusType = 'Puissance';
      break;
    case 3:
      update.mechaArmureJetBonus = senseurs;
      update.mechaArmureJetBonusType = 'Senseurs';
      break;
    case 4:
      update.mechaArmureJetBonus = systemes;
      update.mechaArmureJetBonusType = 'Systèmes';
      break;
    case 5:
      update.mechaArmureJetBonus = 0;
      update.mechaArmureJetBonusType = '';
      break;
  }

  await setAttrsAsync(update);
});

on('change:mechaArmure change:mechaArmureArchangelConfiguration change:mechaArmureNephilimConfiguration change:mechaArmureDemonConfiguration', async () => {
  await setAttrsAsync({
    MADABAmritaActive: 0,
    MAAEvacuationActive: 0,
    MANOGStationActive: 0,
    MANOGInvulnerabiliteActive: 0,
    MANOGSTActive: 0,
    MADDjinnWraithActive: 0,
    MADDjinnNanobrumeActive: 0,
    MADACSoniqueActive: 0,
    MAArchangelVolActive: 0,
    MANephilimSautActive: 0,
    MANephilimEmblemActive: 0,
    MADemonSautActive: 0,
    MANephilimDronesAirainActive: 0,
  });
});
// FIN MECHAARMURE

// LONGBOW
on('change:rangerArmeDegatEvol change:rangerArmeDegat change:rangerArmeViolenceEvol change:rangerArmeViolence change:rangerArmePortee change:rangerChoc change:rangerDegatContinue change:rangerDesignation change:rangerSilencieux change:rangerPerceArmure change:rangerUltraViolence change:rangerAntiVehicule change:rangerArtillerie change:rangerDispersion change:rangerLumiere change:rangerPenetrant change:rangerPerceArmure60 change:rangerAntiAnatheme change:rangerDemoralisant change:rangerEnChaine change:rangerFureur change:rangerIgnoreArmure change:rangerPenetrant10 change:ranger100PG change:ranger50PG2 sheet:opened', async () => {
  const attrs = await getAttrsAsync([
    'rangerArmeDegatEvol',
    'rangerArmeDegat',
    'rangerArmeViolenceEvol',
    'rangerArmeViolence',
    'rangerArmePortee',
    'rangerChoc',
    'rangerDegatContinue',
    'rangerDesignation',
    'rangerSilencieux',
    'rangerPerceArmure',
    'rangerUltraViolence',
    'rangerAntiVehicule',
    'rangerArtillerie',
    'rangerDispersion',
    'rangerLumiere',
    'rangerPenetrant',
    'rangerPerceArmure60',
    'rangerAntiAnatheme',
    'rangerDemoralisant',
    'rangerEnChaine',
    'rangerFureur',
    'rangerIgnoreArmure',
    'rangerPenetrant10',
    'ranger100PG',
    'ranger50PG2',
  ]);

  const PG50 = attrs.ranger50PG2;
  const PG100 = attrs.ranger100PG;

  let baseD = 3;
  let baseV = 1;

  let E1 = 2;
  let E2 = 3;
  let E3 = 6;

  let dgts = Number(attrs.rangerArmeDegat);
  let violence = Number(attrs.rangerArmeViolence);

  const portee = attrs.rangerArmePortee;

  if (PG50 === 'on') {
    baseD = 5;
    baseV = 3;

    dgts = Number(attrs.rangerArmeDegatEvol);
    violence = Number(attrs.rangerArmeViolenceEvol);
  }

  if (PG100 === 'on') {
    E1 = 1;
    E2 = 1;
    E3 = 4;
  }

  const eChoc = attrs.rangerChoc;
  const eDegatsContinus = attrs.rangerDegatContinue;
  const eDesignation = attrs.rangerDesignation;
  const eSilencieux = attrs.rangerSilencieux;
  const ePerceArmure = attrs.rangerPerceArmure;
  const eUltraviolence = attrs.rangerUltraViolence;
  const eAntiVehicule = attrs.rangerAntiVehicule;
  const eArtillerie = attrs.rangerArtillerie;
  const eDispersion = attrs.rangerDispersion;
  const eLumiere = attrs.rangerLumiere;
  const ePenetrant = attrs.rangerPenetrant;
  const ePerceArmure60 = attrs.rangerPerceArmure60;
  const eAntiAnatheme = attrs.rangerAntiAnatheme;
  const eDemoralisant = attrs.rangerDemoralisant;
  const eEnChaine = attrs.rangerEnChaine;
  const eFureur = attrs.rangerFureur;
  const eIgnoreArmure = attrs.rangerIgnoreArmure;
  const ePenetrant10 = attrs.rangerPenetrant10;

  let energie = 0;

  energie += (dgts - baseD);
  energie += (violence - baseV);

  switch (portee) {
    case '^{portee-longue}':
      energie += 1;
      break;

    case '^{portee-lointaine}':
      energie += 2;
      break;
  }

  let energieDepense = 0;

  if (eChoc !== '0') { energieDepense += E1; }

  if (eSilencieux !== '0') { energieDepense += E1; }

  if (eUltraviolence !== '0') { energieDepense += E1; }

  if (eArtillerie !== '0') { energieDepense += E2; }

  if (eAntiAnatheme !== '0') { energieDepense += E3; }

  if (eDemoralisant !== '0') { energieDepense += E3; }

  if (eEnChaine !== '0') { energieDepense += E3; }

  if (eFureur !== '0') { energieDepense += E3; }

  if (eAntiVehicule !== '0') { energieDepense += E2; }

  if (eDegatsContinus !== '0') { energieDepense += E1; }

  if (eDesignation !== '0') { energieDepense += E1; }

  if (eDispersion !== '0') { energieDepense += E2; }

  if (eLumiere !== '0') { energieDepense += E2; }

  if (ePenetrant !== '0') { energieDepense += E2; }

  if (ePerceArmure !== '0') { energieDepense += E1; }

  if (ePerceArmure60 !== '0') { energieDepense += E2; }

  if (eIgnoreArmure !== '0') { energieDepense += E3; }

  if (ePenetrant10 !== '0') { energieDepense += E3; }

  energie += energieDepense;

  await setAttrsAsync({ longbowEnergie: `(${getTranslationByKey('depense-energie-prevue')} : ${energie})` });
});
// LONGBOW

// HERAUT DE LEQUILIBRE - CHEVALIER DE LA LUMIERE
const chevalierHerauts = ['devasterAnatheme', 'bourreauTenebres', 'equilibreBalance'];

chevalierHerauts.forEach((button) => {
  on(`clicked:${button}`, async () => {
    const attrs = await getAttrsAsync([button]);
    const value = +attrs[button];
    const result = {};

    let newValue = 1;

    if (value === 1) { newValue = 0; }

    result[button] = newValue;

    await setAttrsAsync(result);
  });
});
// HERAUT DE LEQUILIBRE - CHEVALIER DE LA LUMIERE

// Import NPC
on('clicked:importKNPCG', () => {
  getAttrs(['importKNPCG'], (value) => {
    const json = JSON.parse(value.importKNPCG);
    const aspects = json.aspects;
    const capacites = json.capacities;
    const weapons = json.weapons;

    const type = json.type.charAt(0).toUpperCase() + json.type.substr(1);
    const level = json.level.charAt(0).toUpperCase() + json.level.substr(1);

    const chair = { score: 0, majeur: 0, mineur: 0 };
    const bete = { score: 0, majeur: 0, mineur: 0 };
    const machine = { score: 0, majeur: 0, mineur: 0 };
    const dame = { score: 0, majeur: 0, mineur: 0 };
    const masque = { score: 0, majeur: 0, mineur: 0 };
    const lAspects = {
      chair: chair, bête: bete, machine: machine, dame: dame, masque: masque,
    };

    const health = json.health || 0;
    const armor = json.armor || 0;
    const energy = json.energy || 0;
    const shield = json.shield || 0;
    const forcefield = json.forcefield || 0;
    let defense = json.defense || 0;
    let reaction = json.reaction || 0;

    let diceInitiative = 3;
    const initiative = json.initiative || 1;

    let tabResilience = 0;
    const resilience = json.resilience || 0;

    const debordement = json.outbreak || 0;

    const weakness = json.weakness || '';

    for (const keyA in aspects) {
      const result = aspects[keyA];
      lAspects[result.name].score = result.score;

      if (result.major === true) { lAspects[result.name].majeur = result.exceptional; } else { lAspects[result.name].mineur = result.exceptional; }
    }

    getSectionIDs('repeating_capacites', (idarray) => {
      for (let i = 0; i < idarray.length; i += 1) {
        removeRepeatingRow(`repeating_capacites_${idarray[i]}`);
      }
    });

    for (const keyC in capacites) {
      const result = capacites[keyC];

      const newrowid = generateRowID();
      const newrowattrs = {};
      newrowattrs[`repeating_capacites_${newrowid}_nomCapacite`] = result.name;
      newrowattrs[`repeating_capacites_${newrowid}_descCapacite`] = result.description;
      setAttrs(newrowattrs);
    }

    getSectionIDs('repeating_armeCaC', (idarray) => {
      for (let i = 0; i < idarray.length; i += 1) {
        removeRepeatingRow(`repeating_armeCaC_${idarray[i]}`);
      }
    });

    getSectionIDs('repeating_armedist', (idarray) => {
      for (let i = 0; i < idarray.length; i += 1) {
        removeRepeatingRow(`repeating_armedist_${idarray[i]}`);
      }
    });

    const otherWPNEffects = [];

    for (const keyW in weapons) {
      const result = weapons[keyW];
      const contact = result.contact;
      const range = result.range;
      let path = '';
      const otherEffects = [];

      const effects = result.effects;

      const newrowidW = generateRowID();
      const newrowattrsW = {};

      if (contact === true) {
        path = 'repeating_armeCaC_';

        let raw = result.raw - lAspects.bête.mineur - lAspects.bête.majeur;

        if (lAspects.bête.majeur > 0) { raw -= bete.score; }

        if (raw < 0) { raw = 0; }

        newrowattrsW[`${path + newrowidW}_ArmeCaC`] = result.name;
        newrowattrsW[`${path + newrowidW}_armeCaCDegat`] = result.dices;
        newrowattrsW[`${path + newrowidW}_armeCaCBDegat`] = raw;
        newrowattrsW[`${path + newrowidW}_armeCaCViolence`] = result.violenceDices;
        newrowattrsW[`${path + newrowidW}_armeCaCBDegat`] = raw;
        newrowattrsW[`${path + newrowidW}_armeCaCBViolence`] = result.violenceRaw;
        newrowattrsW[`${path + newrowidW}_armeCaCPortee`] = `^{portee-${range}}`;
      } else {
        path = 'repeating_armedist_';

        newrowattrsW[`${path + newrowidW}_ArmeDist`] = result.name;
        newrowattrsW[`${path + newrowidW}_armeDistDegat`] = result.dices;
        newrowattrsW[`${path + newrowidW}_armeDistViolence`] = result.violenceDices;
        newrowattrsW[`${path + newrowidW}_armeDistBDegat`] = result.raw;
        newrowattrsW[`${path + newrowidW}_armeDistBViolence`] = result.violenceRaw;
        newrowattrsW[`${path + newrowidW}_armeDistPortee`] = `^{portee-${range}}`;
      }

      for (const cle in effects) {
        const eff = effects[cle].name.split(' ');
        let length = eff.length;

        if (length > 1) { length -= 1; } else { length = 1; }

        const name = effects[cle].name.split(' ', length).join(' ').toLowerCase();
        const value2 = eff[length] || 0;

        const uEff = name === 'ignore' || name === 'perce' || name === 'dégâts' ? `${name} ${eff[1]}` : name;

        switch (uEff) {
          case 'anathème':
            newrowattrsW[`${path + newrowidW}_anatheme`] = '{{anatheme=Anathème}}';
            break;

          case 'anti-anathème':
            newrowattrsW[`${path + newrowidW}_antiAnatheme`] = '{{antiAnathème=Anti Anathème}}';
            break;

          case 'anti-véhicule':
            newrowattrsW[`${path + newrowidW}_antiVehicule`] = '{{antiVehicule=Anti Véhicule}} ';
            break;

          case 'artillerie':
            newrowattrsW[`${path + newrowidW}_artillerie`] = '{{artillerie=Artillerie}}';
            break;

          case 'assassin':
            newrowattrsW[`${path + newrowidW}_assassin`] = '{{assassin=[[@{assassinValue}d6]]}} ';
            newrowattrsW[`${path + newrowidW}_assassinValue`] = Number(value2);
            break;

          case "assistance à l'attaque":
            newrowattrsW[`${path + newrowidW}_assistanceAttaque`] = "{{assistanceAttaque=Assistance à l'attaque}}";
            break;

          case 'barrage':
            newrowattrsW[`${path + newrowidW}_barrage`] = '{{barrage=^{barrage} @{barrageValue}}} ';
            newrowattrsW[`${path + newrowidW}_barrageValue`] = Number(value2);
            break;

          case 'cadence':
            newrowattrsW[`${path + newrowidW}_cadence`] = '[[?{Plusieurs cibles ?|Oui, 3.5|Non, 0.5}]]';
            newrowattrsW[`${path + newrowidW}_cadenceValue`] = Number(value2);
            break;

          case 'chargeur':
            newrowattrsW[`${path + newrowidW}_chargeur`] = '{{chargeur=^{chargeur} @{chargeurValue}}} ';
            newrowattrsW[`${path + newrowidW}_chargeurValue`] = Number(value2);
            break;

          case 'choc':
            newrowattrsW[`${path + newrowidW}_choc`] = '{{choc=^{choc} @{chocValue}}}';
            newrowattrsW[`${path + newrowidW}_chocValue`] = Number(value2);
            break;

          case 'défense':
            newrowattrsW[`${path + newrowidW}_defense`] = '{{defense=^{defense} @{defenseValue}}}';
            newrowattrsW[`${path + newrowidW}_defenseValue`] = Number(value2);
            break;

          case 'dégâts continus':
            newrowattrsW[`${path + newrowidW}_degatContinue`] = '{{degatContinus=^{degats-continus} @{degatContinueValue} ([[1D6]] ^{tours})}}';
            newrowattrsW[`${path + newrowidW}_degatContinueValue`] = Number(value2);
            break;

          case 'deux mains':
            newrowattrsW[`${path + newrowidW}_deuxMains`] = '{{deuxMains=Deux Mains}}';
            break;

          case 'démoralisant':
            newrowattrsW[`${path + newrowidW}_demoralisant`] = '{{demoralisant=Démoralisant}}';
            break;

          case 'désignation':
            newrowattrsW[`${path + newrowidW}_designation`] = '{{designation=Désignation}}';
            break;

          case 'destructeur':
            newrowattrsW[`${path + newrowidW}_destructeur`] = '{{destructeur=[[2D6]]}}';
            break;

          case 'dispersion':
            newrowattrsW[`${path + newrowidW}_dispersion`] = '{{dispersion=^{dispersion} @{dispersionValue}}} ';
            newrowattrsW[`${path + newrowidW}_dispersionValue`] = Number(value2);
            break;

          case 'en chaîne':
            newrowattrsW[`${path + newrowidW}_enChaine`] = '{{enChaine=En Chaîne}}';
            break;

          case 'espérance':
            newrowattrsW[`${path + newrowidW}_esperance`] = '{{esperance=Espérance}}';
            break;

          case 'fureur':
            newrowattrsW[`${path + newrowidW}_fureur`] = '{{fureur=[[4D6]]}}';
            break;

          case 'ignore armure':
            newrowattrsW[`${path + newrowidW}_ignoreArmure`] = '{{ignoreArmure=Ignore Armure}}';
            break;

          case 'ignore CdF':
            newrowattrsW[`${path + newrowidW}_ignoreCdF`] = '{{ignoreCdF=Ignore Champs de Force}}';
            break;

          case 'jumelé (akimbo)':
            newrowattrsW[`${path + newrowidW}_akimbo`] = '2';
            break;

          case 'jumelé (ambidextrie)':
            newrowattrsW[`${path + newrowidW}_ambidextrie`] = '2';
            break;

          case 'lesté':
            newrowattrsW[`${path + newrowidW}_lestePNJ`] = '{{leste=[[@{Chair}]]}}';
            break;

          case 'lourd':
            newrowattrsW[`${path + newrowidW}_lourd`] = '1';
            break;

          case 'lumière':
            newrowattrsW[`${path + newrowidW}_lumiere`] = '{{lumiere=^{lumiere} @{lumiereValue}}}';
            newrowattrsW[`${path + newrowidW}_lumiereValue`] = Number(value2);
            break;

          case 'meurtrier':
            newrowattrsW[`${path + newrowidW}_meurtrier`] = '{{meurtrier=[[2D6]]}}';
            break;

          case 'oblitération':
            newrowattrsW[`${path + newrowidW}_obliteration`] = '{{obliteration=Oblitération}}';
            break;

          case 'orfèvrerie':
            newrowattrsW[`${path + newrowidW}_orfevreriePNJ`] = '{{orfevrerie=[[ceil(@{masque}/2)]]}}';
            break;

          case 'parasitage':
            newrowattrsW[`${path + newrowidW}_parasitage`] = '{{parasitage=^{parasitage} @{parasitageValue}}}';
            newrowattrsW[`${path + newrowidW}_parasitageValue`] = Number(value2);
            break;

          case 'pénétrant':
            newrowattrsW[`${path + newrowidW}_penetrant`] = '{{penetrant=^{penetrant} @{penetrantValue}}}';
            newrowattrsW[`${path + newrowidW}_penetrantValue`] = Number(value2);
            break;

          case 'perce armure':
            newrowattrsW[`${path + newrowidW}_perceArmure`] = '{{perceArmure=^{perce-armure} @{perceArmureValue}}}';
            newrowattrsW[`${path + newrowidW}_perceArmureValue`] = Number(value2);
            break;

          case 'précision':
            newrowattrsW[`${path + newrowidW}_precisionPNJ`] = '{{precision=[[(ceil((@{machine})/2))]]}}';
            break;

          case 'réaction':
            newrowattrsW[`${path + newrowidW}_reaction`] = '{{reaction=^{reaction} @{reactionValue}}}';
            newrowattrsW[`${path + newrowidW}_reactionValue`] = Number(value2);
            break;

          case 'silencieux':
            newrowattrsW[`${path + newrowidW}_silencieux`] = '{{silencieux=Silencieux}}';
            break;

          case 'soumission':
            newrowattrsW[`${path + newrowidW}_soumission`] = '{{soumission=Soumission}}';
            break;

          case 'ténébricide':
            newrowattrsW[`${path + newrowidW}_tenebricite`] = '{{tenebricide=Ténébricide}}';
            break;

          case 'tir en rafale':
            newrowattrsW[`${path + newrowidW}_tirRafale`] = '{{tirRafale=Tir en Rafale}}';
            break;

          case 'tir en sécurité':
            newrowattrsW[`${path + newrowidW}_tirSecurite`] = '3';
            break;

          case 'ultraviolence':
            newrowattrsW[`${path + newrowidW}_ultraViolence`] = '{{ultraviolence=[[2D6]]}}';
            break;

          default:
            otherEffects.push(effects[cle].name);
            break;
        }
      }

      if (otherEffects.length > 0) {
        otherWPNEffects.push(`${result.name} : ${otherEffects.join(', ')}`);
      }

      setAttrs(newrowattrsW);
    }

    if (json.resilience > 0) { tabResilience = 1; }

    if (type === 'Bande') {
      setAttrs({
        fichePNJ: 3,
      });

      diceInitiative = 0;
    }

    defense = defense - lAspects.masque.majeur - lAspects.masque.mineur;
    reaction = reaction - lAspects.machine.majeur - lAspects.machine.mineur;

    setAttrs({
      character_name: json.name,
      typePNJ: `${type} (${level})`,

      chair: lAspects.chair.score,
      chairPNJAE: lAspects.chair.mineur,
      chairPNJAEMaj: lAspects.chair.majeur,
      bete: lAspects['bête'].score,
      betePNJAE: lAspects['bête'].mineur,
      betePNJAEMaj: lAspects['bête'].majeur,
      machine: lAspects.machine.score,
      machinePNJAE: lAspects.machine.mineur,
      machinePNJAEMaj: lAspects.machine.majeur,
      dame: lAspects.dame.score,
      damePNJAE: lAspects.dame.mineur,
      damePNJAEMaj: lAspects.dame.majeur,
      masque: lAspects.masque.score,
      masquePNJAE: lAspects.masque.mineur,
      masquePNJAEMaj: lAspects.masque.majeur,

      santePNJ: health,
      santePNJ_max: health,

      armurePNJ: armor,
      armurePNJ_max: armor,

      energiePNJ: energy,
      energiePNJ_max: energy,

      bouclierPNJ: shield,
      bouclierPNJ_max: shield,

      cdfPNJ: forcefield,
      cdfPNJ_max: forcefield,

      defensePNJ: defense,
      reactionPNJ: reaction,

      diceInitiative: diceInitiative,
      bonusInitiativeP: initiative,

      ptsFaibles: weakness,

      pnjCapaciteNotes: otherWPNEffects.join('\r\n'),

      tabResilience: tabResilience,
      resilience: resilience,
      resilience_max: resilience,

      bandeDebordement: debordement,
    });
  });
});

// TRADUCTIONS
on('sheet:opened', async () => {
  const bard = [i18n_ignoreArmure, i18n_ignoreCDF, `${i18n_dispersion} 6`, `${i18n_choc} 1`];
  bard.sort();

  const wizardBorealis = [i18n_antiAnatheme, `${i18n_degatsContinus} 3`];
  wizardBorealis.sort();

  const wizardOriflamme = [i18n_antiAnatheme, `${i18n_lumiere} 2`, i18n_affecteAnatheme];
  wizardOriflamme.sort();

  const MADSD = [i18n_antiVehicule, i18n_briserResilience, `${i18n_parasitage} 2`];
  MADSD.sort();

  const MANMJ = [i18n_antiVehicule, i18n_antiAnatheme, i18n_demoralisant, i18n_briserResilience];
  MANMJ.sort();

  const MAACM = [i18n_antiVehicule, `${i18n_parasitage} 2`, `${i18n_degatsContinus} 10`, i18n_briserResilience];
  MAACM.sort();

  const MANCM = [i18n_antiVehicule, `${i18n_dispersion} 12`, i18n_antiAnatheme, i18n_briserResilience, i18n_fureur];
  MANCM.sort();

  const MANMS = [i18n_antiVehicule, i18n_demoralisant, i18n_ultraviolence];
  MANMS.sort();

  await setAttrsAsync({
    bardEffetAttSpe: bard.join(' / '),
    berserkIlluminationBlazePortee: getTranslationByKey('portee-contact'),
    berserkIlluminationBeaconPortee: getTranslationByKey('portee-courte'),
    berserkIlluminationProjectorPortee: getTranslationByKey('portee-courte'),
    berserkIlluminationLighthousePortee: getTranslationByKey('portee-courte'),
    berserkIlluminationLanternPortee: getTranslationByKey('portee-courte'),
    berserkIlluminationLanternEffets: getTranslationByKey('esperance'),
    monkVaguePortee: `${getTranslationByKey('portee-contact')} / ${getTranslationByKey('portee-courte')}`,
    monkSalvePortee: getTranslationByKey('portee-moyenne'),
    monkRayonPortee: getTranslationByKey('portee-moyenne'),
    wizardBEffets: wizardBorealis.join(' / '),
    wizardOEffets: wizardOriflamme.join(' / '),
    MALWizardOEffets: wizardOriflamme.join(' / '),
    MALWizardOPortee: getTranslationByKey('portee-moyenne'),
    traumasInsignifiants: getTranslationByKey('traumas-insignifiants'),
    traumasLegers: getTranslationByKey('traumas-legers'),
    traumasGraves: getTranslationByKey('traumas-graves'),
    traumasLourds: getTranslationByKey('traumas-lourds'),
    MADSDPortee: getTranslationByKey('portee-contact'),
    MADSDEffetsListe: MADSD.join(' / '),
    MAAGOfferingDuree: `1D3 ${getTranslationByKey('tours')}`,
    MAAGOfferingPortee: getTranslationByKey('portee-moyenne'),
    MAAGCurseDuree: `1 ${getTranslationByKey('tour')}`,
    MAAGCursePortee: getTranslationByKey('portee-moyenne'),
    MAAGMiracleDuree: `2D6 ${getTranslationByKey('tours')}`,
    MAAGMiraclePortee: getTranslationByKey('portee-contact'),
    MAAGEvacuationDuree: `1 ${getTranslationByKey('tour')}`,
    MAAGEvacuationPortee: getTranslationByKey('zone-entiere'),
    MANOGInvulnerabilitePortee: getTranslationByKey('portee-courte'),
    MANOGInvulnerabiliteDuree: `2D6 ${getTranslationByKey('tours')}`,
    MANOGInvulnerabiliteEffets: getTranslationByKey('invulnerabilite'),
    MANOGStationPortee: getTranslationByKey('portee-moyenne'),
    MANOGStationDuree: getTranslationByKey('sans-limite'),
    MANMJEffetsL: MANMJ.join(' / '),
    MANMJPortee: getTranslationByKey('portee-lointaine'),
    MADAPSEffets: getTranslationByKey('poings-soniques-effets'),
    MADAPSPortee: getTranslationByKey('portee-contact'),
    MADACSPortee: getTranslationByKey('portee-courte'),
    MADACSEffets: `${getTranslationByKey('choc')} 6 / ${getTranslationByKey('choc')} 4 / ${getTranslationByKey('choc')} 2`,
    MANSautPortee: getTranslationByKey('portee-longue'),
    MANSautHauteur: getTranslationByKey('portee-longue'),
    MANSautDuree: `1 ${getTranslationByKey('tour')}`,
    MANEmblemPortee: getTranslationByKey('portee-longue'),
    MADSautPortee: getTranslationByKey('portee-longue'),
    MADSautHauteur: getTranslationByKey('portee-longue'),
    MADSautDuree: `1 ${getTranslationByKey('tour')}`,
    MAAVagueSoinPortee: getTranslationByKey('portee-moyenne'),
    MANDronesAirainDuree: getTranslationByKey('sans-limite'),
    MANDronesAirainPortee: getTranslationByKey('portee-longue'),
    MAAMIPortee: getTranslationByKey('portee-courte'),
    MAACanonMetatronEffets: MAACM.join(' / '),
    MAACanonMetatronPortee: getTranslationByKey('portee-moyenne'),
    MANCanonMagmaEffets: MANCM.join(' / '),
    MANCanonMagmaPortee: getTranslationByKey('portee-moyenne'),
    MADLCGEffets: getTranslationByKey('lames-cinetiques-geantes-effets'),
    MAACanonNoePortée: getTranslationByKey('portee-longue'),
    MANMSEffetsListe: MANMS.join(' / '),
    MANMSurturPortee: getTranslationByKey('portee-moyenne'),
    MAATLAPortee: getTranslationByKey('portee-courte'),
    MAATLAEffets: getTranslationByKey('anti-anatheme'),
    druidLionBaseNom: getTranslationByKey('coups'),
    MALDruidLionBaseNom: getTranslationByKey('coups'),
    pSCaC: getTranslationByKey('couteau-de-service'),
    mECaC: getTranslationByKey('marteau-epieu-contact'),
    pSDist: getTranslationByKey('pistolet-de-service'),
    mEDist: getTranslationByKey('marteau-epieu-distance'),
    poingCaC: getTranslationByKey('coup-poing-pied'),
    poingMACaC: getTranslationByKey('coup-poing-pied'),
  });
});

on('change:effetArmes', (eventInfo) => {
  const text = eventInfo.newValue;

  const update = {};

  update['effetArmes-description'] = getTranslationByKey(text);

  setAttrsAsync(update);
});

on('change:ameliorationArmes', (eventInfo) => {
  const text = eventInfo.newValue;

  const update = {};

  update['ameliorationArmes-description'] = getTranslationByKey(text);

  setAttrsAsync(update);
});

on('change:ameliorationOArmes', (eventInfo) => {
  const text = eventInfo.newValue;

  const update = {};

  update['ameliorationOArmes-description'] = getTranslationByKey(text);

  setAttrsAsync(update);
});

on('change:chevaliersHerauts', () => {
  const update = {};

  update.devasterAnatheme = 0;
  update.bourreauTenebres = 0;
  update.equilibreBalance = 0;

  setAttrsAsync(update);
});
