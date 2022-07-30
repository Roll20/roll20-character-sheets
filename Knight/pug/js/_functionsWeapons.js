/* eslint-disable prefer-destructuring */
/* eslint-disable default-case */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const wpnContactData = [
  'ArmeCaC',
  'armeCaCDegat', 'armeCaCBDegat',
  'armeCaCViolence', 'armeCaCBViolence',
  'armeCaCPortee', 'aspectPNJ',
  'caracteristique1Equipement',
  'caracteristique2Equipement',
  'caracteristique3Equipement',
  'caracteristique4Equipement',
  'caracteristiqueSPrecis',
];

const wpnDistanceData = [
  'ArmeDist',
  'armeDistDegat', 'armeDistBDegat',
  'armeDistViolence', 'armeDistBViolence',
  'armeDistPortee', 'aspectPNJ',
  'caracteristique1Equipement',
  'caracteristique2Equipement',
  'caracteristique3Equipement',
  'caracteristique4Equipement',
  'pilonnage',
];

const wpnAutreData = [
  'ArmeAutre',
  'armeAutreDegat', 'armeAutreBDegat',
  'armeAutreViolence', 'armeAutreBViolence',
  'armeAutrePortee',
  'armeAttaqueAutre',
  'armeODAutre',
];

const wpnEffects = [
  'akimbo', 'ambidextrie', 'anatheme', 'antiAnatheme', 'antiVehicule', 'artillerie', 'assassin', 'assistanceAttaque',
  'barrage', 'cadence', 'chargeur', 'choc', 'defense', 'degatContinue', 'deuxMains', 'demoralisant',
  'designation', 'destructeur', 'dispersion', 'enChaine', 'esperance', 'fureur', 'ignoreArmure',
  'ignoreCdF', 'leste', 'lestePNJ', 'lourd', 'lumiere', 'meurtrier', 'obliteration',
  'orfevrerie', 'orfevreriePNJ', 'parasitage', 'penetrant', 'perceArmure', 'precision', 'precisionPNJ', 'reaction', 'silencieux', 'soumission', 'tenebricite',
  'tirRafale', 'tirSecurite', 'ultraViolence',
];

const wpnEffectsValue = [
  'assassinValue', 'barrageValue', 'cadenceValue', 'chargeurValue', 'chocValue',
  'defenseValue', 'degatContinueValue', 'dispersionValue', 'lumiereValue', 'parasitageValue',
  'penetrantValue', 'perceArmureValue', 'reactionValue',
];

const wpnAmeliorationS = [
  'agressive', 'allegee', 'assassine', 'barbelee',
  'connectee', 'electrifiee', 'indestructible', 'jumelle',
  'lumineuse', 'massive', 'protectrice', 'soeur', 'sournoise', 'surmesure',
  'sournoisePNJ', 'surmesurePNJ',
];

const wpnAmeliorationO = [
  'arabesquesIridescentes', 'armeAzurine', 'armeRougeSang', 'armureGravee',
  'blasonChevalier', 'bouclierGrave', 'cheneSculpte', 'chromeeLignesLC',
  'codeKnightGrave', 'craneRieurGrave', 'faucheuseGravee', 'fauconsPlumesL',
  'flammesStylisees', 'griffuresGravees', 'masqueBriseSculpte', 'rouagesCassesGraves',
  'sillonsFLF',
];

const wpnAmeliorationA = [
  'chargeurGrappes', 'canonLong', 'canonRaccourci', 'chambreDouble', 'interfaceGuidage',
  'jumelage', 'lunetteIntelligente', 'munitionsHyperVelocite', 'munitionsDrone',
  'chargeurExplosives', 'munitionsIEM', 'munitionsNonLetales', 'munitionsSubsoniques',
  'pointeurLaser', 'protectionArme', 'revetementOmega', 'structureElement', 'systemeRefroidissement',
];

const wpnAmeliorationAValue = [
  'jumelageValue', 'jumelageType',
];

const wpnSpecial = [
  'BDDiversTotal', 'BVDiversTotal', 'energie',
];

const wpnSpecialValue = [
  'BDDiversD6', 'BDDiversFixe', 'BVDiversD6', 'BVDiversFixe', 'energieValue',
];

function getWeaponsEffects(prefix, effet, hasArmure, armure, vForce, vDexterite, oDexterite, vDiscretion, oDiscretion, vTir, oTir) {
  const result = {};

  const exec = [];
  const firstExec = [];

  let isConditionnelA = false;
  let isConditionnelD = false;
  let isConditionnelV = false;

  const attaquesSurprises = [];
  const attaquesSurprisesValue = [];
  let attaquesSurprisesCondition = '';

  const bDegats = [];
  const autresEffets = [];

  let rCadence = 0;
  let vCadence = 0;
  let eASAssassin = '';
  let eASAssassinValue = 0;

  let eLumiereS = '';
  let eLumiereValue = 0;

  let isAntiAnatheme = false;
  let isAssistantAttaque = false;
  let isAkimbo = false;
  let isAmbidextrie = false;
  let isCadence = false;
  const isChoc = false;
  let isDestructeur = false;
  let isDeuxMains = false;
  let isLeste = false;
  let isLourd = false;
  let isELumiere = false;
  let isFureur = false;
  let isMeurtrier = false;
  let isObliteration = false;
  let isOrfevrerie = false;
  let isSilencieux = false;
  let isTenebricide = false;
  let isTirRafale = false;
  let isUltraviolence = false;

  const eAntiAnatheme = isApplied(effet[`${prefix}antiAnatheme`]);
  const eAntiVehicule = isApplied(effet[`${prefix}antiVehicule`]);
  const eArtillerie = isApplied(effet[`${prefix}artillerie`]);
  const eAssassin = isApplied(effet[`${prefix}assassin`]);
  const eAssassinV = effet[`${prefix}assassinValue`] || 0;
  const eAssistanceAttaque = isApplied(effet[`${prefix}assistanceAttaque`]);
  const eBarrage = isApplied(effet[`${prefix}barrage`]);
  const eBarrageV = effet[`${prefix}barrageValue`] || 0;
  const eCadence = isApplied(effet[`${prefix}cadence`]);
  const eCadenceV = effet[`${prefix}cadenceValue`] || 0;
  const eChargeur = isApplied(effet[`${prefix}eChargeur`]);
  const eChargeurV = effet[`${prefix}chargeurValue`] || 0;
  const eChoc = isApplied(effet[`${prefix}choc`]);
  const eChocV = effet[`${prefix}chocValue`] || 0;
  const eDefense = isApplied(effet[`${prefix}eDefense`]);
  const eDefenseV = effet[`${prefix}defenseValue`] || 0;
  const eDegatsContinus = isApplied(effet[`${prefix}degatContinue`]);
  const eDegatsContinusV = effet[`${prefix}degatContinueValue`] || 0;
  const eDeuxMains = isApplied(effet[`${prefix}deuxMains`]);
  const eDemoralisant = isApplied(effet[`${prefix}eDemoralisant`]);
  const eDesignation = isApplied(effet[`${prefix}designation`]);
  const eDestructeur = isApplied(effet[`${prefix}destructeur`]);
  const eDestructeurV = 2;
  const eDispersion = isApplied(effet[`${prefix}dispersion`]);
  const eDispersionV = effet[`${prefix}dispersionValue`] || 0;
  const eEnChaine = isApplied(effet[`${prefix}enChaine`]);
  const eEsperance = isApplied(effet[`${prefix}esperance`]);
  const eFureur = isApplied(effet[`${prefix}fureur`]);
  const eFureurV = 4;
  const eIgnoreArmure = isApplied(effet[`${prefix}ignoreArmure`]);
  const eIgnoreCDF = isApplied(effet[`${prefix}ignoreCdF`]);
  const eJAkimbo = isApplied(effet[`${prefix}akimbo`]);
  const eJAmbidextrie = isApplied(effet[`${prefix}ambidextrie`]);
  const eLeste = isApplied(effet[`${prefix}leste`]);
  const eLourd = isApplied(effet[`${prefix}lourd`]);
  const eLumiere = isApplied(effet[`${prefix}lumiere`]);
  const eLumiereV = effet[`${prefix}lumiereValue`] || 0;
  const eMeurtrier = isApplied(effet[`${prefix}meurtrier`]);
  const eMeurtrierV = 2;
  const eObliteration = isApplied(effet[`${prefix}obliteration`]);
  const eOrfevrerie = isApplied(effet[`${prefix}orfevrerie`]);
  const eParasitage = isApplied(effet[`${prefix}parasitage`]);
  const eParasitageV = effet[`${prefix}parasitageValue`] || 0;
  const ePenetrant = isApplied(effet[`${prefix}penetrant`]);
  const ePenetrantV = effet[`${prefix}penetrantValue`] || 0;
  const ePerceArmure = isApplied(effet[`${prefix}perceArmure`]);
  const ePerceArmureV = effet[`${prefix}perceArmureValue`] || 0;
  const ePrecision = isApplied(effet[`${prefix}precision`]);
  const eReaction = isApplied(effet[`${prefix}reaction`]);
  const eReactionV = effet[`${prefix}reactionValue`] || 0;
  const eSilencieux = isApplied(effet[`${prefix}silencieux`]);
  const eSoumission = isApplied(effet[`${prefix}soumission`]);
  const eTenebricide = isApplied(effet[`${prefix}tenebricite`]);
  const eTirRafale = isApplied(effet[`${prefix}tirRafale`]);
  const eTirSecurite = isApplied(effet[`${prefix}tirSecurite`]);
  const eUltraviolence = isApplied(effet[`${prefix}ultraViolence`]);
  const eUltraviolenceV = 2;

  if (eAntiAnatheme || armure === 'berserk') {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);

    isAntiAnatheme = true;
  }

  if (eAssistanceAttaque) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{assistanceAttaque=${i18n_assistanceAttaque}}} {{assistanceAttaqueCondition=${i18n_assistanceAttaqueCondition}}}`);

    isAssistantAttaque = true;
  }

  if (eArtillerie) {
    isConditionnelA = true;

    exec.push(`{{artillerie=${i18n_artillerie}}} {{artillerieCondition=${i18n_artillerieCondition}}}`);
  }

  if (eAssassin) {
    isConditionnelD = true;

    eASAssassin = i18n_assassin;
    eASAssassinValue = eAssassinV;

    if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
  }

  if (eCadence) {
    rCadence = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
    isCadence = true;
    vCadence = eCadenceV;
  }

  if (eChoc) {
    isConditionnelA = true;

    exec.push(`{{choc=${i18n_choc} ${eChocV}}} {{chocCondition=${i18n_chocCondition}}}`);
  }

  if (eDemoralisant) {
    isConditionnelA = true;

    exec.push(`{{demoralisant=${i18n_demoralisant}}} {{demoralisantCondition=${i18n_demoralisantCondition}}}`);
  }

  if (eDestructeur) {
    isConditionnelD = true;

    firstExec.push(`{{destructeurValue=[[${eDestructeurV}D6]]}}`);

    exec.push(`{{destructeur=${i18n_destructeur}}} {{destructeurCondition=${i18n_destructeurCondition}}}`);

    isDestructeur = true;
  }

  if (eEnChaine) {
    isConditionnelD = true;

    exec.push(`{{enChaine=${i18n_enChaine}}} {{enChaineCondition=${i18n_enChaineCondition}}}`);
  }

  if (eEsperance) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{esperance=${i18n_esperance}}} {{esperanceConditionD=${i18n_esperanceConditionD}}} {{esperanceConditionV=${i18n_esperanceConditionV}}}`);
  }

  if (eFureur) {
    isConditionnelV = true;
    isFureur = true;

    firstExec.push(`{{fureurValue=[[${eFureurV}D6]]}}`);

    exec.push(`{{fureur=${i18n_fureur}}} {{fureurCondition=${i18n_fureurCondition}}}`);
  }

  if (eLeste) {
    bDegats.push(vForce);
    exec.push(`{{vLeste=${vForce}}}`);
    isLeste = true;
  }

  if (eMeurtrier) {
    isConditionnelD = true;

    firstExec.push(`{{meurtrierValue=[[${eMeurtrierV}D6]]}}`);

    exec.push(`{{meurtrier=${i18n_meurtrier}}} {{meurtrierCondition=${i18n_meurtrierCondition}}}`);

    isMeurtrier = true;
  }

  if (eObliteration) {
    isConditionnelD = true;

    exec.push(`{{obliteration=${i18n_obliteration}}} {{obliterationCondition=${i18n_obliterationCondition}}}`);

    isObliteration = true;
  }

  if (eOrfevrerie) {
    let vOrfevrerie = vDexterite;

    if (hasArmure) { vOrfevrerie += oDexterite; }

    bDegats.push(vOrfevrerie);
    exec.push(`{{vOrfevrerie=${vOrfevrerie}}}`);

    isOrfevrerie = true;
  }

  if (eParasitage) {
    isConditionnelA = true;

    exec.push(`{{parasitage=${i18n_parasitage} ${eParasitageV}}} {{parasitageCondition=${i18n_parasitageCondition}}}`);
  }

  if (ePrecision) {
    isConditionnelD = true;

    let vPrecision = vTir;

    if (hasArmure) { vPrecision += oTir; }

    bDegats.push(vPrecision);
    exec.push(`{{vPrecision=${vPrecision}}}`);
  }

  if (eSilencieux || prefix === 'pS' || prefix === 'pSC') {
    const ghost = +effet.rogueGhost;
    const MALghost = +effet.MALRogueGhost;
    const changeling = +effet.bardChangeling;
    const MALchangeling = +effet.MALBardChangeling;
    let totalSilencieux = vDiscretion;

    if (hasArmure) { totalSilencieux += oDiscretion; }

    if (hasArmure && ghost !== 0) {
      exec.push(`{{vSilencieuxD=${totalSilencieux}}}`);
      bDegats.push(totalSilencieux);
    } else if (hasArmure && MALghost !== 0) {
      exec.push(`{{vSilencieuxD=${totalSilencieux}}}`);
      bDegats.push(totalSilencieux);
    } else if (hasArmure && changeling !== 0) {
      exec.push(`{{vSilencieuxD=${totalSilencieux}}}`);
      bDegats.push(totalSilencieux);
    } else if (hasArmure && MALchangeling !== 0) {
      exec.push(`{{vSilencieuxD=${totalSilencieux}}}`);
      bDegats.push(totalSilencieux);
    } else {
      isConditionnelD = true;
      attaquesSurprises.push(i18n_silencieux);
      attaquesSurprisesValue.push(totalSilencieux);

      if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
    }

    isSilencieux = true;
  }

  if (eSoumission) {
    isConditionnelA = true;

    exec.push(`{{soumission=${i18n_soumission}}} {{soumissionCondition=${i18n_soumissionCondition}}}`);
  }

  if (eTenebricide || armure === 'berserk') {
    isConditionnelD = true;
    isConditionnelV = true;

    isTenebricide = true;
  }

  if (eTirRafale) {
    isConditionnelD = true;
    isTirRafale = true;

    exec.push(`{{tirRafale=${i18n_tirRafale}}} {{tirRafaleCondition=${i18n_tirRafaleCondition}}}`);
  }

  if (eUltraviolence) {
    isConditionnelV = true;
    isUltraviolence = true;

    firstExec.push(`{{ultraviolenceValue=[[${eUltraviolenceV}D6]]}}`);

    exec.push(`{{ultraviolence=${i18n_ultraviolence}}} {{ultraviolenceCondition=${i18n_ultraviolenceCondition}}}`);
  }

  if (eAntiVehicule) { autresEffets.push(i18n_antiVehicule); }

  if (eBarrage) { autresEffets.push(`${i18n_barrage} ${eBarrageV}`); }

  if (eChargeur) { autresEffets.push(`${i18n_chargeur} ${eChargeurV}`); }

  if (prefix === 'mE') { autresEffets.push(`${i18n_chargeur} 1`); }

  if (eDefense) { autresEffets.push(`${i18n_defense} ${eDefenseV}`); }

  if (eDegatsContinus) { autresEffets.push(`${i18n_degatsContinus} ${eDegatsContinusV} ([[1d6]] ${i18n_tours})`); }

  if (prefix === 'mE') { autresEffets.push(`${i18n_degatsContinus} 3 ([[1d6]] ${i18n_tours})`); }

  if (eDeuxMains) {
    autresEffets.push(i18n_deuxMains);
    isDeuxMains = true;
  }

  if (eDesignation) { autresEffets.push(i18n_designation); }

  if (eDispersion) { autresEffets.push(`${i18n_dispersion} ${eDispersionV}`); }

  if (prefix === 'mE') { autresEffets.push(`${i18n_dispersion} 3`); }

  if (eIgnoreArmure) { autresEffets.push(i18n_ignoreArmure); }

  if (eIgnoreCDF) { autresEffets.push(i18n_ignoreCDF); }

  if (eJAkimbo) {
    isAkimbo = true;
    autresEffets.push(i18n_jAkimbo);
  }

  if (eJAmbidextrie) {
    isAmbidextrie = true;
    autresEffets.push(i18n_jAmbidextrie);
  }

  if (eLourd) {
    autresEffets.push(i18n_lourd);
    isLourd = true;
  }

  if (eLumiere) {
    eLumiereS = i18n_lumiere;
    eLumiereValue = eLumiereV;
    isELumiere = true;
  }

  if (prefix === 'mE') {
    eLumiereS = i18n_lumiere;
    eLumiereValue = 2;
    isELumiere = true;
  }

  if (ePenetrant) { autresEffets.push(`${i18n_penetrant} ${ePenetrantV}`); }

  if (ePerceArmure) { autresEffets.push(`${i18n_perceArmure} ${ePerceArmureV}`); }

  if (prefix === 'mEC') { autresEffets.push(`${i18n_perceArmure} 40`); }

  if (eReaction) { autresEffets.push(`${i18n_reaction} ${eReactionV}`); }

  if (eTirSecurite) { autresEffets.push(i18n_tirSecurite); }

  result.isConditionnelA = isConditionnelA;
  result.isConditionnelD = isConditionnelD;
  result.isConditionnelV = isConditionnelV;

  result.eASAssassin = eASAssassin;
  result.eASAssassinValue = eASAssassinValue;
  result.isCadence = isCadence;
  result.sCadence = rCadence;
  result.vCadence = vCadence;
  result.isTenebricide = isTenebricide;
  result.isObliteration = isObliteration;
  result.isMeurtrier = isMeurtrier;
  result.vMeurtrier = eMeurtrierV;
  result.isDestructeur = isDestructeur;
  result.vDestructeur = eDestructeurV;
  result.nowSilencieux = isSilencieux;
  result.isChoc = isChoc;
  result.isLeste = isLeste;
  result.isOrfevrerie = isOrfevrerie;
  result.isAssistantAttaque = isAssistantAttaque;
  result.isAntiAnatheme = isAntiAnatheme;
  result.isTirRafale = isTirRafale;
  result.isFureur = isFureur;
  result.isUltraviolence = isUltraviolence;

  result.eLumiere = eLumiere;
  result.isELumiere = isELumiere;
  result.eLumiereValue = eLumiereValue;

  result.isAkimbo = isAkimbo;
  result.isAmbidextrie = isAmbidextrie;
  result.isDeuxMains = isDeuxMains;
  result.isLourd = isLourd;

  result.attaquesSurprises = attaquesSurprises;
  result.attaquesSurprisesValue = attaquesSurprisesValue;
  result.attaquesSurprisesCondition = attaquesSurprisesCondition;

  result.bDegats = bDegats;

  result.exec = exec;
  result.firstExec = firstExec;
  result.autresEffets = autresEffets;

  return result;
}

function getWeaponsEffectsPNJ(prefix, data, addChair, vChair, vMachine, vMachineAE, vMasque, vMasqueAE) {
  const result = {};

  const exec = [];
  const firstExec = [];

  let isConditionnelA = false;
  let isConditionnelD = false;
  let isConditionnelV = false;

  const attaquesSurprises = [];
  const attaquesSurprisesValue = [];
  let attaquesSurprisesCondition = '';

  let eASAssassin;
  let eASAssassinValue = 0;

  let bDegats = 0;
  const autresEffets = [];

  const isCadence = false;
  let rCadence = 0;
  let vCadence = 0;

  let isObliteration = false;
  let isTenebricide = false;

  let isAntiAnatheme = false;
  let isAssistanceAttaque = false;
  let isDestructeur = false;
  let isChoc = false;
  let isLeste = false;
  let isMeurtrier = false;
  let isOrfevrerie = false;
  let isSilencieux = false;
  let isFureur = false;
  let isUltraviolence = false;

  const eAnatheme = isApplied(data[`${prefix}anatheme`]);
  const eAntiAnatheme = isApplied(data[`${prefix}antiAnatheme`]);
  const eAntiVehicule = isApplied(data[`${prefix}antiVehicule`]);
  const eArtillerie = isApplied(data[`${prefix}artillerie`]);
  const eAssassin = isApplied(data[`${prefix}assassin`]);
  const eAssassinV = data[`${prefix}assassinValue`] || 0;
  const eAssistanceAttaque = isApplied(data[`${prefix}assistanceAttaque`]);
  const eBarrage = isApplied(data[`${prefix}barrage`]);
  const eBarrageV = data[`${prefix}barrageValue`] || 0;
  const eCadence = isApplied(data[`${prefix}cadence`]);
  const eCadenceV = data[`${prefix}cadenceValue`] || 0;
  const eChargeur = isApplied(data[`${prefix}eChargeur`]);
  const eChargeurV = data[`${prefix}chargeurValue`] || 0;
  const eChoc = isApplied(data[`${prefix}choc`]);
  const eChocV = data[`${prefix}chocValue`] || 0;
  const eDefense = isApplied(data[`${prefix}eDefense`]);
  const eDefenseV = data[`${prefix}defenseValue`] || 0;
  const eDegatsContinus = isApplied(data[`${prefix}degatContinue`]);
  const eDegatsContinusV = data[`${prefix}degatContinueValue`] || 0;
  const eDeuxMains = isApplied(data[`${prefix}deuxMains`]);
  const eDemoralisant = isApplied(data[`${prefix}eDemoralisant`]);
  const eDesignation = isApplied(data[`${prefix}designation`]);
  const eDestructeur = isApplied(data[`${prefix}destructeur`]);
  const eDestructeurV = 2;
  const eDispersion = isApplied(data[`${prefix}dispersion`]);
  const eDispersionV = data[`${prefix}dispersionValue`] || 0;
  const eEnChaine = isApplied(data[`${prefix}enChaine`]);
  const eEsperance = isApplied(data[`${prefix}esperance`]);
  const eFureur = isApplied(data[`${prefix}fureur`]);
  const eFureurV = 4;
  const eIgnoreArmure = isApplied(data[`${prefix}ignoreArmure`]);
  const eIgnoreCDF = isApplied(data[`${prefix}ignoreCdF`]);
  const eJAkimbo = isApplied(data[`${prefix}akimbo`]);
  const eJAmbidextrie = isApplied(data[`${prefix}ambidextrie`]);
  const eLeste = isApplied(data[`${prefix}lestePNJ`]);
  const eLourd = isApplied(data[`${prefix}lourd`]);
  const eLumiere = isApplied(data[`${prefix}lumiere`]);
  const eLumiereV = data[`${prefix}lumiereValue`] || 0;
  const eMeurtrier = isApplied(data[`${prefix}meurtrier`]);
  const eMeurtrierV = 2;
  const eObliteration = isApplied(data[`${prefix}obliteration`]);
  const eOrfevrerie = isApplied(data[`${prefix}orfevreriePNJ`]);
  const eParasitage = isApplied(data[`${prefix}parasitage`]);
  const eParasitageV = data[`${prefix}parasitageValue`] || 0;
  const ePenetrant = isApplied(data[`${prefix}penetrant`]);
  const ePenetrantV = data[`${prefix}penetrantValue`] || 0;
  const ePerceArmure = isApplied(data[`${prefix}perceArmure`]);
  const ePerceArmureV = data[`${prefix}perceArmureValue`] || 0;
  const ePrecision = isApplied(data[`${prefix}precisionPNJ`]);
  const eReaction = isApplied(data[`${prefix}reaction`]);
  const eReactionV = data[`${prefix}reactionValue`] || 0;
  const eSilencieux = isApplied(data[`${prefix}silencieux`]);
  const eSoumission = isApplied(data[`${prefix}soumission`]);
  const eTenebricide = isApplied(data[`${prefix}tenebricite`]);
  const eTirRafale = isApplied(data[`${prefix}tirRafale`]);
  const eTirSecurite = isApplied(data[`${prefix}tirSecurite`]);
  const eUltraviolence = isApplied(data[`${prefix}ultraViolence`]);
  const eUltraviolenceV = 2;

  if (eAntiAnatheme) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);

    isAntiAnatheme = true;
  }

  if (eAssistanceAttaque) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{assistanceAttaque=${i18n_assistanceAttaque}}} {{assistanceAttaqueCondition=${i18n_assistanceAttaqueCondition}}}`);

    isAssistanceAttaque = true;
  }

  if (eArtillerie) {
    isConditionnelA = true;

    exec.push(`{{artillerie=${i18n_artillerie}}} {{artillerieCondition=${i18n_artillerieCondition}}}`);
  }

  if (eAssassin) {
    isConditionnelD = true;

    eASAssassin = i18n_assassin;
    eASAssassinValue = eAssassinV;

    if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
  }

  if (eCadence) {
    rCadence = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
    vCadence = eCadenceV;
  }

  if (eChoc) {
    isConditionnelA = true;

    exec.push(`{{choc=${i18n_choc} ${eChocV}}} {{chocCondition=${i18n_chocCondition}}}`);

    isChoc = true;
  }

  if (eDemoralisant) {
    isConditionnelA = true;

    exec.push(`{{demoralisant=${i18n_demoralisant}}} {{demoralisantCondition=${i18n_demoralisantCondition}}}`);
  }

  if (eDestructeur) {
    isConditionnelD = true;

    firstExec.push(`{{destructeurValue=[[${eDestructeurV}D6]]}}`);

    exec.push(`{{destructeur=${i18n_destructeur}}} {{destructeurCondition=${i18n_destructeurCondition}}}`);

    isDestructeur = true;
  }

  if (eEnChaine) {
    isConditionnelD = true;

    exec.push(`{{enChaine=${i18n_enChaine}}} {{enChaineCondition=${i18n_enChaineCondition}}}`);
  }

  if (eEsperance) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{esperance=${i18n_esperance}}} {{esperanceConditionD=${i18n_esperanceConditionD}}} {{esperanceConditionV=${i18n_esperanceConditionV}}}`);
  }

  if (eFureur) {
    isConditionnelV = true;
    isFureur = true;

    firstExec.push(`{{fureurValue=[[${eFureurV}D6]]}}`);

    exec.push(`{{fureur=${i18n_fureur}}} {{fureurCondition=${i18n_fureurCondition}}}`);
  }

  if (eLeste) {
    bDegats += Math.floor(vChair / 2);

    if (addChair) { exec.push(`{{vLeste=${Math.floor(vChair / 2)}}}`); } else { exec.push(`{{vLeste=${vChair}}}`); }

    isLeste = true;
  }

  if (eMeurtrier) {
    isConditionnelD = true;

    firstExec.push(`{{meurtrierValue=[[${eMeurtrierV}D6]]}}`);

    exec.push(`{{meurtrier=${i18n_meurtrier}}} {{meurtrierCondition=${i18n_meurtrierCondition}}}`);

    isMeurtrier = true;
  }

  if (eObliteration) {
    isConditionnelD = true;

    exec.push(`{{obliteration=${i18n_obliteration}}} {{obliterationCondition=${i18n_obliterationCondition}}}`);

    isObliteration = true;
  }

  if (eOrfevrerie) {
    const vOrfevrerie = Math.ceil(vMasque / 2);

    bDegats += vOrfevrerie;
    exec.push(`{{vOrfevrerie=${vOrfevrerie}}}`);

    isOrfevrerie = true;
  }

  if (eParasitage) {
    isConditionnelA = true;

    exec.push(`{{parasitage=${i18n_parasitage} ${eParasitageV}}} {{parasitageCondition=${i18n_parasitageCondition}}}`);
  }

  if (ePrecision) {
    isConditionnelD = true;

    const vPrecision = Math.ceil(vMachine / 2) + vMachineAE;

    bDegats += vPrecision;
    exec.push(`{{vPrecision=${vPrecision}}}`);
  }

  if (eSilencieux || prefix === 'pS' || prefix === 'pSC') {
    const totalSilencieux = Math.ceil(vMasque / 2) + vMasqueAE;

    isConditionnelD = true;

    attaquesSurprises.push(i18n_silencieux);
    attaquesSurprisesValue.push(totalSilencieux);

    if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }

    isSilencieux = true;
  }

  if (eSoumission) {
    isConditionnelA = true;

    exec.push(`{{soumission=${i18n_soumission}}} {{soumissionCondition=${i18n_soumissionCondition}}}`);
  }

  if (eTenebricide) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{tenebricide=${i18n_tenebricide}}} {{tenebricideConditionD=${i18n_tenebricideConditionD}}} {{tenebricideConditionV=${i18n_tenebricideConditionV}}}`);

    isTenebricide = true;
  }

  if (eTirRafale) {
    isConditionnelD = true;

    exec.push(`{{tirRafale=${i18n_tirRafale}}} {{tirRafaleCondition=${i18n_tirRafaleCondition}}}`);
  }

  if (eUltraviolence) {
    isConditionnelV = true;
    isUltraviolence = true;

    firstExec.push(`{{ultraviolenceValue=[[${eUltraviolenceV}D6]]}}`);

    exec.push(`{{ultraviolence=${i18n_ultraviolence}}} {{ultraviolenceCondition=${i18n_ultraviolenceCondition}}}`);
  }

  if (eAnatheme) { autresEffets.push(i18n_anatheme); }

  if (eAntiVehicule) { autresEffets.push(i18n_antiVehicule); }

  if (eBarrage) { autresEffets.push(`${i18n_barrage} ${eBarrageV}`); }

  if (eChargeur) { autresEffets.push(`${i18n_chargeur} ${eChargeurV}`); }

  if (prefix === 'mE') { autresEffets.push(`${i18n_chargeur} 1`); }

  if (eDefense) { autresEffets.push(`${i18n_defense} ${eDefenseV}`); }

  if (eDegatsContinus) { autresEffets.push(`${i18n_degatsContinus} ${eDegatsContinusV} ([[1d6]] ${i18n_tours})`); }

  if (prefix === 'mE') { autresEffets.push(`${i18n_degatsContinus} 3 ([[1d6]] ${i18n_tours})`); }

  if (eDeuxMains) { autresEffets.push(i18n_deuxMains); }

  if (eDesignation) { autresEffets.push(i18n_designation); }

  if (eDispersion) { autresEffets.push(`${i18n_dispersion} ${eDispersionV}`); }

  if (prefix === 'mE') { autresEffets.push(`${i18n_dispersion} 3`); }

  if (eIgnoreArmure) { autresEffets.push(i18n_ignoreArmure); }

  if (eIgnoreCDF) { autresEffets.push(i18n_ignoreCDF); }

  if (eJAkimbo) { autresEffets.push(i18n_jAkimbo); }

  if (eJAmbidextrie) { autresEffets.push(i18n_jAmbidextrie); }

  if (eLourd) { autresEffets.push(i18n_lourd); }

  if (eLumiere) { autresEffets.push(`${i18n_lumiere} ${eLumiereV}`); }

  if (prefix === 'mE') { autresEffets.push(`${i18n_lumiere} 2`); }

  if (ePenetrant) { autresEffets.push(`${i18n_penetrant} ${ePenetrantV}`); }

  if (ePerceArmure) { autresEffets.push(`${i18n_perceArmure} ${ePerceArmureV}`); }

  if (prefix === 'mEC') { autresEffets.push(`${i18n_perceArmure} 40`); }

  if (eReaction) { autresEffets.push(`${i18n_reaction} ${eReactionV}`); }

  if (eTirSecurite) { autresEffets.push(i18n_tirSecurite); }

  result.isConditionnelA = isConditionnelA;
  result.isConditionnelD = isConditionnelD;
  result.isConditionnelV = isConditionnelV;

  result.eASAssassin = eASAssassin;
  result.eASAssassinValue = eASAssassinValue;

  result.isCadence = isCadence;
  result.sCadence = rCadence;
  result.vCadence = vCadence;
  result.isTenebricide = isTenebricide;
  result.isObliteration = isObliteration;
  result.isAntiAnatheme = isAntiAnatheme;
  result.isAssistanceAttaque = isAssistanceAttaque;
  result.isChoc = isChoc;
  result.isDestructeur = isDestructeur;
  result.isLeste = isLeste;
  result.isMeurtrier = isMeurtrier;
  result.isOrfevrerie = isOrfevrerie;
  result.isSilencieux = isSilencieux;
  result.isFureur = isFureur;
  result.isUltraviolence = isUltraviolence;

  result.attaquesSurprises = attaquesSurprises;
  result.attaquesSurprisesValue = attaquesSurprisesValue;
  result.attaquesSurprisesCondition = attaquesSurprisesCondition;

  result.bDegats = bDegats;

  result.exec = exec;
  result.firstExec = firstExec;
  result.autresEffets = autresEffets;

  return result;
}

function getWeaponsEffectsAutre(prefix, effet) {
  const result = {};

  const exec = [];
  const firstExec = [];

  let isConditionnelA = false;
  let isConditionnelD = false;
  let isConditionnelV = false;

  const attaquesSurprises = [];
  const attaquesSurprisesValue = [];
  let attaquesSurprisesCondition = '';

  const bDegats = [];
  const autresEffets = [];

  let rCadence = 0;
  let vCadence = 0;
  let eASAssassin = '';
  let eASAssassinValue = 0;

  let eLumiereS = '';
  let eLumiereValue = 0;

  let isAntiAnatheme = false;
  let isAssistantAttaque = false;
  let isAkimbo = false;
  let isAmbidextrie = false;
  let isCadence = false;
  const isChoc = false;
  let isDestructeur = false;
  let isDeuxMains = false;
  let isLeste = false;
  let isLourd = false;
  let isELumiere = false;
  let isMeurtrier = false;
  let isObliteration = false;
  let isOrfevrerie = false;
  let isSilencieux = false;
  let isTenebricide = false;
  let isTirRafale = false;
  let isFureur = false;
  let isUltraviolence = false;

  const eAntiAnatheme = isApplied(effet[`${prefix}antiAnatheme`]);
  const eAntiVehicule = isApplied(effet[`${prefix}antiVehicule`]);
  const eArtillerie = isApplied(effet[`${prefix}artillerie`]);
  const eAssassin = isApplied(effet[`${prefix}assassin`]);
  const eAssassinV = effet[`${prefix}assassinValue`] || 0;
  const eAssistanceAttaque = isApplied(effet[`${prefix}assistanceAttaque`]);
  const eBarrage = isApplied(effet[`${prefix}barrage`]);
  const eBarrageV = effet[`${prefix}barrageValue`] || 0;
  const eCadence = isApplied(effet[`${prefix}cadence`]);
  const eCadenceV = effet[`${prefix}cadenceValue`] || 0;
  const eChargeur = isApplied(effet[`${prefix}eChargeur`]);
  const eChargeurV = effet[`${prefix}chargeurValue`] || 0;
  const eChoc = isApplied(effet[`${prefix}choc`]);
  const eChocV = effet[`${prefix}chocValue`] || 0;
  const eDefense = isApplied(effet[`${prefix}eDefense`]);
  const eDefenseV = effet[`${prefix}defenseValue`] || 0;
  const eDegatsContinus = isApplied(effet[`${prefix}degatContinue`]);
  const eDegatsContinusV = effet[`${prefix}degatContinueValue`] || 0;
  const eDeuxMains = isApplied(effet[`${prefix}deuxMains`]);
  const eDemoralisant = isApplied(effet[`${prefix}eDemoralisant`]);
  const eDesignation = isApplied(effet[`${prefix}designation`]);
  const eDestructeur = isApplied(effet[`${prefix}destructeur`]);
  const eDestructeurV = 2;
  const eDispersion = isApplied(effet[`${prefix}dispersion`]);
  const eDispersionV = effet[`${prefix}dispersionValue`] || 0;
  const eEnChaine = isApplied(effet[`${prefix}enChaine`]);
  const eEsperance = isApplied(effet[`${prefix}esperance`]);
  const eFureur = isApplied(effet[`${prefix}fureur`]);
  const eFureurV = 4;
  const eIgnoreArmure = isApplied(effet[`${prefix}ignoreArmure`]);
  const eIgnoreCDF = isApplied(effet[`${prefix}ignoreCdF`]);
  const eJAkimbo = isApplied(effet[`${prefix}akimbo`]);
  const eJAmbidextrie = isApplied(effet[`${prefix}ambidextrie`]);
  const eLeste = isApplied(effet[`${prefix}leste`]);
  const eLourd = isApplied(effet[`${prefix}lourd`]);
  const eLumiere = isApplied(effet[`${prefix}lumiere`]);
  const eLumiereV = effet[`${prefix}lumiereValue`] || 0;
  const eMeurtrier = isApplied(effet[`${prefix}meurtrier`]);
  const eMeurtrierV = 2;
  const eObliteration = isApplied(effet[`${prefix}obliteration`]);
  const eOrfevrerie = isApplied(effet[`${prefix}orfevrerie`]);
  const eParasitage = isApplied(effet[`${prefix}parasitage`]);
  const eParasitageV = effet[`${prefix}parasitageValue`] || 0;
  const ePenetrant = isApplied(effet[`${prefix}penetrant`]);
  const ePenetrantV = effet[`${prefix}penetrantValue`] || 0;
  const ePerceArmure = isApplied(effet[`${prefix}perceArmure`]);
  const ePerceArmureV = effet[`${prefix}perceArmureValue`] || 0;
  const ePrecision = isApplied(effet[`${prefix}precision`]);
  const eReaction = isApplied(effet[`${prefix}reaction`]);
  const eReactionV = effet[`${prefix}reactionValue`] || 0;
  const eSilencieux = isApplied(effet[`${prefix}silencieux`]);
  const eSoumission = isApplied(effet[`${prefix}soumission`]);
  const eTenebricide = isApplied(effet[`${prefix}tenebricite`]);
  const eTirRafale = isApplied(effet[`${prefix}tirRafale`]);
  const eTirSecurite = isApplied(effet[`${prefix}tirSecurite`]);
  const eUltraviolence = isApplied(effet[`${prefix}ultraViolence`]);
  const eUltraviolenceV = 2;

  if (eAntiAnatheme) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);

    isAntiAnatheme = true;
  }

  if (eAssistanceAttaque) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{assistanceAttaque=${i18n_assistanceAttaque}}} {{assistanceAttaqueCondition=${i18n_assistanceAttaqueCondition}}}`);

    isAssistantAttaque = true;
  }

  if (eArtillerie) {
    isConditionnelA = true;

    exec.push(`{{artillerie=${i18n_artillerie}}} {{artillerieCondition=${i18n_artillerieCondition}}}`);
  }

  if (eAssassin) {
    isConditionnelD = true;

    eASAssassin = i18n_assassin;
    eASAssassinValue = eAssassinV;

    if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
  }

  if (eCadence) {
    rCadence = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
    isCadence = true;
    vCadence = eCadenceV;
  }

  if (eChoc) {
    isConditionnelA = true;

    exec.push(`{{choc=${i18n_choc} ${eChocV}}} {{chocCondition=${i18n_chocCondition}}}`);
  }

  if (eDemoralisant) {
    isConditionnelA = true;

    exec.push(`{{demoralisant=${i18n_demoralisant}}} {{demoralisantCondition=${i18n_demoralisantCondition}}}`);
  }

  if (eDestructeur) {
    isConditionnelD = true;

    firstExec.push(`{{destructeurValue=[[${eDestructeurV}D6]]}}`);

    exec.push(`{{destructeur=${i18n_destructeur}}} {{destructeurCondition=${i18n_destructeurCondition}}}`);

    isDestructeur = true;
  }

  if (eEnChaine) {
    isConditionnelD = true;

    exec.push(`{{enChaine=${i18n_enChaine}}} {{enChaineCondition=${i18n_enChaineCondition}}}`);
  }

  if (eEsperance) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{esperance=${i18n_esperance}}} {{esperanceConditionD=${i18n_esperanceConditionD}}} {{esperanceConditionV=${i18n_esperanceConditionV}}}`);
  }

  if (eFureur) {
    isConditionnelV = true;
    isFureur = true;

    firstExec.push(`{{fureurValue=[[${eFureurV}D6]]}}`);

    exec.push(`{{fureur=${i18n_fureur}}} {{fureurCondition=${i18n_fureurCondition}}}`);
  }

  if (eLeste) {
    autresEffets.push(i18n_leste);
    isLeste = true;
  }

  if (eMeurtrier) {
    isConditionnelD = true;

    firstExec.push(`{{meurtrierValue=[[${eMeurtrierV}D6]]}}`);

    exec.push(`{{meurtrier=${i18n_meurtrier}}} {{meurtrierCondition=${i18n_meurtrierCondition}}}`);

    isMeurtrier = true;
  }

  if (eObliteration) {
    isConditionnelD = true;

    exec.push(`{{obliteration=${i18n_obliteration}}} {{obliterationCondition=${i18n_obliterationCondition}}}`);

    isObliteration = true;
  }

  if (eOrfevrerie) {
    autresEffets.push(i18n_orfevrerie);

    isOrfevrerie = true;
  }

  if (eParasitage) {
    isConditionnelA = true;

    exec.push(`{{parasitage=${i18n_parasitage} ${eParasitageV}}} {{parasitageCondition=${i18n_parasitageCondition}}}`);
  }

  if (ePrecision) {
    isConditionnelD = true;

    autresEffets.push(i18n_precision);
  }

  if (eSilencieux) {
    isConditionnelD = true;

    autresEffets.push(i18n_silencieux);

    isSilencieux = true;
  }

  if (eSoumission) {
    isConditionnelA = true;

    exec.push(`{{soumission=${i18n_soumission}}} {{soumissionCondition=${i18n_soumissionCondition}}}`);
  }

  if (eTenebricide) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{tenebricide=${i18n_tenebricide}}} {{tenebricideConditionD=${i18n_tenebricideConditionD}}} {{tenebricideConditionV=${i18n_tenebricideConditionV}}}`);

    isTenebricide = true;
  }

  if (eTirRafale) {
    isConditionnelD = true;
    isTirRafale = true;

    exec.push(`{{tirRafale=${i18n_tirRafale}}} {{tirRafaleCondition=${i18n_tirRafaleCondition}}}`);
  }

  if (eUltraviolence) {
    isConditionnelV = true;
    isUltraviolence = true;

    firstExec.push(`{{ultraviolenceValue=[[${eUltraviolenceV}D6]]}}`);

    exec.push(`{{ultraviolence=${i18n_ultraviolence}}} {{ultraviolenceCondition=${i18n_ultraviolenceCondition}}}`);
  }

  if (eAntiVehicule) { autresEffets.push(i18n_antiVehicule); }

  if (eBarrage) { autresEffets.push(`${i18n_barrage} ${eBarrageV}`); }

  if (eChargeur) { autresEffets.push(`${i18n_chargeur} ${eChargeurV}`); }

  if (eDefense) { autresEffets.push(`${i18n_defense} ${eDefenseV}`); }

  if (eDegatsContinus) { autresEffets.push(`${i18n_degatsContinus} ${eDegatsContinusV} ([[1d6]] ${i18n_tours})`); }

  if (eDeuxMains) {
    autresEffets.push(i18n_deuxMains);
    isDeuxMains = true;
  }

  if (eDesignation) { autresEffets.push(i18n_designation); }

  if (eDispersion) { autresEffets.push(`${i18n_dispersion} ${eDispersionV}`); }

  if (eIgnoreArmure) { autresEffets.push(i18n_ignoreArmure); }

  if (eIgnoreCDF) { autresEffets.push(i18n_ignoreCDF); }

  if (eJAkimbo) {
    isAkimbo = true;
    autresEffets.push(i18n_jAkimbo);
  }

  if (eJAmbidextrie) {
    isAmbidextrie = true;
    autresEffets.push(i18n_jAmbidextrie);
  }

  if (eLourd) {
    autresEffets.push(i18n_lourd);
    isLourd = true;
  }

  if (eLumiere) {
    eLumiereS = i18n_lumiere;
    eLumiereValue = eLumiereV;
    isELumiere = true;
  }

  if (ePenetrant) { autresEffets.push(`${i18n_penetrant} ${ePenetrantV}`); }

  if (ePerceArmure) { autresEffets.push(`${i18n_perceArmure} ${ePerceArmureV}`); }

  if (eReaction) { autresEffets.push(`${i18n_reaction} ${eReactionV}`); }

  if (eTirSecurite) { autresEffets.push(i18n_tirSecurite); }

  result.isConditionnelA = isConditionnelA;
  result.isConditionnelD = isConditionnelD;
  result.isConditionnelV = isConditionnelV;

  result.eASAssassin = eASAssassin;
  result.eASAssassinValue = eASAssassinValue;
  result.isCadence = isCadence;
  result.sCadence = rCadence;
  result.vCadence = vCadence;
  result.isTenebricide = isTenebricide;
  result.isObliteration = isObliteration;
  result.isMeurtrier = isMeurtrier;
  result.vMeurtrier = eMeurtrierV;
  result.isDestructeur = isDestructeur;
  result.vDestructeur = eDestructeurV;
  result.nowSilencieux = isSilencieux;
  result.isChoc = isChoc;
  result.isLeste = isLeste;
  result.isOrfevrerie = isOrfevrerie;
  result.isAssistantAttaque = isAssistantAttaque;
  result.isAntiAnatheme = isAntiAnatheme;
  result.isTirRafale = isTirRafale;
  result.isFureur = isFureur;
  result.isUltraviolence = isUltraviolence;

  result.eLumiere = eLumiere;
  result.isELumiere = isELumiere;
  result.eLumiereValue = eLumiereValue;

  result.isAkimbo = isAkimbo;
  result.isAmbidextrie = isAmbidextrie;
  result.isDeuxMains = isDeuxMains;
  result.isLourd = isLourd;

  result.attaquesSurprises = attaquesSurprises;
  result.attaquesSurprisesValue = attaquesSurprisesValue;
  result.attaquesSurprisesCondition = attaquesSurprisesCondition;

  result.bDegats = bDegats;

  result.exec = exec;
  result.firstExec = firstExec;
  result.autresEffets = autresEffets;

  return result;
}

function getWeaponsEffectsAutrePNJ(prefix, effet) {
  const result = {};

  const exec = [];
  const firstExec = [];

  let isConditionnelA = false;
  let isConditionnelD = false;
  let isConditionnelV = false;

  const attaquesSurprises = [];
  const attaquesSurprisesValue = [];
  let attaquesSurprisesCondition = '';

  const bDegats = [];
  const autresEffets = [];

  let rCadence = 0;
  let vCadence = 0;
  let eASAssassin = '';
  let eASAssassinValue = 0;

  let eLumiereS = '';
  let eLumiereValue = 0;

  let isAntiAnatheme = false;
  let isAssistantAttaque = false;
  let isAkimbo = false;
  let isAmbidextrie = false;
  let isCadence = false;
  const isChoc = false;
  let isDestructeur = false;
  let isDeuxMains = false;
  let isLeste = false;
  let isLourd = false;
  let isELumiere = false;
  let isMeurtrier = false;
  let isObliteration = false;
  let isOrfevrerie = false;
  let isSilencieux = false;
  let isTenebricide = false;
  let isTirRafale = false;
  let isUltraviolence = false;
  let isFureur = false;

  const eAnatheme = isApplied(effet[`${prefix}anatheme`]);
  const eAntiAnatheme = isApplied(effet[`${prefix}antiAnatheme`]);
  const eAntiVehicule = isApplied(effet[`${prefix}antiVehicule`]);
  const eArtillerie = isApplied(effet[`${prefix}artillerie`]);
  const eAssassin = isApplied(effet[`${prefix}assassin`]);
  const eAssassinV = effet[`${prefix}assassinValue`] || 0;
  const eAssistanceAttaque = isApplied(effet[`${prefix}assistanceAttaque`]);
  const eBarrage = isApplied(effet[`${prefix}barrage`]);
  const eBarrageV = effet[`${prefix}barrageValue`] || 0;
  const eCadence = isApplied(effet[`${prefix}cadence`]);
  const eCadenceV = effet[`${prefix}cadenceValue`] || 0;
  const eChargeur = isApplied(effet[`${prefix}eChargeur`]);
  const eChargeurV = effet[`${prefix}chargeurValue`] || 0;
  const eChoc = isApplied(effet[`${prefix}choc`]);
  const eChocV = effet[`${prefix}chocValue`] || 0;
  const eDefense = isApplied(effet[`${prefix}eDefense`]);
  const eDefenseV = effet[`${prefix}defenseValue`] || 0;
  const eDegatsContinus = isApplied(effet[`${prefix}degatContinue`]);
  const eDegatsContinusV = effet[`${prefix}degatContinueValue`] || 0;
  const eDeuxMains = isApplied(effet[`${prefix}deuxMains`]);
  const eDemoralisant = isApplied(effet[`${prefix}eDemoralisant`]);
  const eDesignation = isApplied(effet[`${prefix}designation`]);
  const eDestructeur = isApplied(effet[`${prefix}destructeur`]);
  const eDestructeurV = 2;
  const eDispersion = isApplied(effet[`${prefix}dispersion`]);
  const eDispersionV = effet[`${prefix}dispersionValue`] || 0;
  const eEnChaine = isApplied(effet[`${prefix}enChaine`]);
  const eEsperance = isApplied(effet[`${prefix}esperance`]);
  const eFureur = isApplied(effet[`${prefix}fureur`]);
  const eFureurV = 4;
  const eIgnoreArmure = isApplied(effet[`${prefix}ignoreArmure`]);
  const eIgnoreCDF = isApplied(effet[`${prefix}ignoreCdF`]);
  const eJAkimbo = isApplied(effet[`${prefix}akimbo`]);
  const eJAmbidextrie = isApplied(effet[`${prefix}ambidextrie`]);
  const eLeste = isApplied(effet[`${prefix}leste`]);
  const eLourd = isApplied(effet[`${prefix}lourd`]);
  const eLumiere = isApplied(effet[`${prefix}lumiere`]);
  const eLumiereV = effet[`${prefix}lumiereValue`] || 0;
  const eMeurtrier = isApplied(effet[`${prefix}meurtrier`]);
  const eMeurtrierV = 2;
  const eObliteration = isApplied(effet[`${prefix}obliteration`]);
  const eOrfevrerie = isApplied(effet[`${prefix}orfevrerie`]);
  const eParasitage = isApplied(effet[`${prefix}parasitage`]);
  const eParasitageV = effet[`${prefix}parasitageValue`] || 0;
  const ePenetrant = isApplied(effet[`${prefix}penetrant`]);
  const ePenetrantV = effet[`${prefix}penetrantValue`] || 0;
  const ePerceArmure = isApplied(effet[`${prefix}perceArmure`]);
  const ePerceArmureV = effet[`${prefix}perceArmureValue`] || 0;
  const ePrecision = isApplied(effet[`${prefix}precision`]);
  const eReaction = isApplied(effet[`${prefix}reaction`]);
  const eReactionV = effet[`${prefix}reactionValue`] || 0;
  const eSilencieux = isApplied(effet[`${prefix}silencieux`]);
  const eSoumission = isApplied(effet[`${prefix}soumission`]);
  const eTenebricide = isApplied(effet[`${prefix}tenebricite`]);
  const eTirRafale = isApplied(effet[`${prefix}tirRafale`]);
  const eTirSecurite = isApplied(effet[`${prefix}tirSecurite`]);
  const eUltraviolence = isApplied(effet[`${prefix}ultraViolence`]);
  const eUltraviolenceV = 2;

  if (eAntiAnatheme) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);

    isAntiAnatheme = true;
  }

  if (eAssistanceAttaque) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{assistanceAttaque=${i18n_assistanceAttaque}}} {{assistanceAttaqueCondition=${i18n_assistanceAttaqueCondition}}}`);

    isAssistantAttaque = true;
  }

  if (eArtillerie) {
    isConditionnelA = true;

    exec.push(`{{artillerie=${i18n_artillerie}}} {{artillerieCondition=${i18n_artillerieCondition}}}`);
  }

  if (eAssassin) {
    isConditionnelD = true;

    eASAssassin = i18n_assassin;
    eASAssassinValue = eAssassinV;

    if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
  }

  if (eCadence) {
    rCadence = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
    isCadence = true;
    vCadence = eCadenceV;
  }

  if (eChoc) {
    isConditionnelA = true;

    exec.push(`{{choc=${i18n_choc} ${eChocV}}} {{chocCondition=${i18n_chocCondition}}}`);
  }

  if (eDemoralisant) {
    isConditionnelA = true;

    exec.push(`{{demoralisant=${i18n_demoralisant}}} {{demoralisantCondition=${i18n_demoralisantCondition}}}`);
  }

  if (eDestructeur) {
    isConditionnelD = true;

    firstExec.push(`{{destructeurValue=[[${eDestructeurV}D6]]}}`);

    exec.push(`{{destructeur=${i18n_destructeur}}} {{destructeurCondition=${i18n_destructeurCondition}}}`);

    isDestructeur = true;
  }

  if (eEnChaine) {
    isConditionnelD = true;

    exec.push(`{{enChaine=${i18n_enChaine}}} {{enChaineCondition=${i18n_enChaineCondition}}}`);
  }

  if (eEsperance) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{esperance=${i18n_esperance}}} {{esperanceConditionD=${i18n_esperanceConditionD}}} {{esperanceConditionV=${i18n_esperanceConditionV}}}`);
  }

  if (eFureur) {
    isConditionnelV = true;
    isFureur = true;

    firstExec.push(`{{fureurValue=[[${eFureurV}D6]]}}`);

    exec.push(`{{fureur=${i18n_fureur}}} {{fureurCondition=${i18n_fureurCondition}}}`);
  }

  if (eLeste) {
    autresEffets.push(i18n_leste);
    isLeste = true;
  }

  if (eMeurtrier) {
    isConditionnelD = true;

    firstExec.push(`{{meurtrierValue=[[${eMeurtrierV}D6]]}}`);

    exec.push(`{{meurtrier=${i18n_meurtrier}}} {{meurtrierCondition=${i18n_meurtrierCondition}}}`);

    isMeurtrier = true;
  }

  if (eObliteration) {
    isConditionnelD = true;

    exec.push(`{{obliteration=${i18n_obliteration}}} {{obliterationCondition=${i18n_obliterationCondition}}}`);

    isObliteration = true;
  }

  if (eOrfevrerie) {
    autresEffets.push(i18n_orfevrerie);

    isOrfevrerie = true;
  }

  if (eParasitage) {
    isConditionnelA = true;

    exec.push(`{{parasitage=${i18n_parasitage} ${eParasitageV}}} {{parasitageCondition=${i18n_parasitageCondition}}}`);
  }

  if (ePrecision) {
    isConditionnelD = true;

    autresEffets.push(i18n_precision);
  }

  if (eSilencieux) {
    isConditionnelD = true;

    autresEffets.push(i18n_silencieux);

    isSilencieux = true;
  }

  if (eSoumission) {
    isConditionnelA = true;

    exec.push(`{{soumission=${i18n_soumission}}} {{soumissionCondition=${i18n_soumissionCondition}}}`);
  }

  if (eTenebricide) {
    isConditionnelD = true;
    isConditionnelV = true;

    exec.push(`{{tenebricide=${i18n_tenebricide}}} {{tenebricideConditionD=${i18n_tenebricideConditionD}}} {{tenebricideConditionV=${i18n_tenebricideConditionV}}}`);

    isTenebricide = true;
  }

  if (eTirRafale) {
    isConditionnelD = true;
    isTirRafale = true;

    exec.push(`{{tirRafale=${i18n_tirRafale}}} {{tirRafaleCondition=${i18n_tirRafaleCondition}}}`);
  }

  if (eUltraviolence) {
    isConditionnelV = true;
    isUltraviolence = true;

    firstExec.push(`{{ultraviolenceValue=[[${eUltraviolenceV}D6]]}}`);

    exec.push(`{{ultraviolence=${i18n_ultraviolence}}} {{ultraviolenceCondition=${i18n_ultraviolenceCondition}}}`);
  }

  if (eAnatheme) { autresEffets.push(i18n_anatheme); }

  if (eAntiVehicule) { autresEffets.push(i18n_antiVehicule); }

  if (eBarrage) { autresEffets.push(`${i18n_barrage} ${eBarrageV}`); }

  if (eChargeur) { autresEffets.push(`${i18n_chargeur} ${eChargeurV}`); }

  if (eDefense) { autresEffets.push(`${i18n_defense} ${eDefenseV}`); }

  if (eDegatsContinus) { autresEffets.push(`${i18n_degatsContinus} ${eDegatsContinusV} ([[1d6]] ${i18n_tours})`); }

  if (eDeuxMains) {
    autresEffets.push(i18n_deuxMains);
    isDeuxMains = true;
  }

  if (eDesignation) { autresEffets.push(i18n_designation); }

  if (eDispersion) { autresEffets.push(`${i18n_dispersion} ${eDispersionV}`); }

  if (eIgnoreArmure) { autresEffets.push(i18n_ignoreArmure); }

  if (eIgnoreCDF) { autresEffets.push(i18n_ignoreCDF); }

  if (eJAkimbo) {
    isAkimbo = true;
    autresEffets.push(i18n_jAkimbo);
  }

  if (eJAmbidextrie) {
    isAmbidextrie = true;
    autresEffets.push(i18n_jAmbidextrie);
  }

  if (eLourd) {
    autresEffets.push(i18n_lourd);
    isLourd = true;
  }

  if (eLumiere) {
    eLumiereS = i18n_lumiere;
    eLumiereValue = eLumiereV;
    isELumiere = true;
  }

  if (ePenetrant) { autresEffets.push(`${i18n_penetrant} ${ePenetrantV}`); }

  if (ePerceArmure) { autresEffets.push(`${i18n_perceArmure} ${ePerceArmureV}`); }

  if (eReaction) { autresEffets.push(`${i18n_reaction} ${eReactionV}`); }

  if (eTirSecurite) { autresEffets.push(i18n_tirSecurite); }

  result.isConditionnelA = isConditionnelA;
  result.isConditionnelD = isConditionnelD;
  result.isConditionnelV = isConditionnelV;

  result.eASAssassin = eASAssassin;
  result.eASAssassinValue = eASAssassinValue;
  result.isCadence = isCadence;
  result.sCadence = rCadence;
  result.vCadence = vCadence;
  result.isTenebricide = isTenebricide;
  result.isObliteration = isObliteration;
  result.isMeurtrier = isMeurtrier;
  result.vMeurtrier = eMeurtrierV;
  result.isDestructeur = isDestructeur;
  result.vDestructeur = eDestructeurV;
  result.nowSilencieux = isSilencieux;
  result.isChoc = isChoc;
  result.isLeste = isLeste;
  result.isOrfevrerie = isOrfevrerie;
  result.isAssistantAttaque = isAssistantAttaque;
  result.isAntiAnatheme = isAntiAnatheme;
  result.isTirRafale = isTirRafale;
  result.isFureur = isFureur;
  result.isUltraviolence = isUltraviolence;

  result.eLumiere = eLumiere;
  result.isELumiere = isELumiere;
  result.eLumiereValue = eLumiereValue;

  result.isAkimbo = isAkimbo;
  result.isAmbidextrie = isAmbidextrie;
  result.isDeuxMains = isDeuxMains;
  result.isLourd = isLourd;

  result.attaquesSurprises = attaquesSurprises;
  result.attaquesSurprisesValue = attaquesSurprisesValue;
  result.attaquesSurprisesCondition = attaquesSurprisesCondition;

  result.bDegats = bDegats;

  result.exec = exec;
  result.firstExec = firstExec;
  result.autresEffets = autresEffets;

  return result;
}

function getWeaponsContactAS(prefix, AS, hasArmure, isSilencieux, isMeurtrier, isAssistantAttaque, isChoc, isLeste, isOrfevrerie, vForce, vDexterite, oDexterite, vDiscretion, oDiscretion, vCombat, oCombat) {
  const result = {};
  const exec = [];

  let isConditionnelA = false;
  let isConditionnelD = false;
  let isConditionnelV = false;

  const attaquesSurprises = [];
  const attaquesSurprisesValue = [];
  let attaquesSurprisesCondition = '';

  let aLumiere = '';
  let aLumiereValue = 0;

  let nowAgressive = false;
  let nowProtectrice = false;
  let nowSoeur = false;
  let nowJumelle = false;
  let nowAllegee = false;

  const bAttaque = [];
  let diceDegats = 0;
  const bDegats = [];
  const autresAmeliorations = [];

  const aAgressive = isApplied(AS[`${prefix}agressive`]);
  const aAllegee = isApplied(AS[`${prefix}allegee`]);
  const aAssassine = isApplied(AS[`${prefix}assassine`]);
  const aBarbelee = isApplied(AS[`${prefix}barbelee`]);
  const aBarbeleeV = 2;
  const aConnectee = isApplied(AS[`${prefix}connectee`]);
  const aElectrifiee = isApplied(AS[`${prefix}electrifiee`]);
  const aIndestructible = isApplied(AS[`${prefix}indestructible`]);
  const aJumelle = isApplied(AS[`${prefix}jumelle`]);
  const aLumineuse = isApplied(AS[`${prefix}lumineuse`]);
  const aMassive = isApplied(AS[`${prefix}massive`]);
  const aProtectrice = isApplied(AS[`${prefix}protectrice`]);
  const aSoeur = isApplied(AS[`${prefix}soeur`]);
  const aSournoise = isApplied(AS[`${prefix}sournoise`]);
  const aSurmesure = isApplied(AS[`${prefix}surmesure`]);

  if (aAgressive) {
    nowAgressive = true;
  }

  if (aAllegee) {
    exec.push('{{vAllegee=-1D6}}');
    diceDegats -= 1;
    nowAllegee = true;
  }

  if (aAssassine) {
    if (isSilencieux) { autresAmeliorations.push(i18n_assassine); } else {
      const ghost = +AS.rogueGhost;
      const MALghost = +AS.MALRogueGhost;
      const changeling = +AS.bardChangeling;
      const MALchangeling = +AS.MALBardChangeling;

      let totalAssassine = vDiscretion;

      if (hasArmure) { totalAssassine += oDiscretion; }

      if (hasArmure && ghost !== 0) {
        exec.push(`{{vAssassineD=${totalAssassine}}}`);
        bDegats.push(totalAssassine);
      } else if (hasArmure && MALghost !== 0) {
        exec.push(`{{vAssassineD=${totalAssassine}}}`);
        bDegats.push(totalAssassine);
      } else if (hasArmure && changeling !== 0) {
        exec.push(`{{vAssassineD=${totalAssassine}}}`);
        bDegats.push(totalAssassine);
      } else if (hasArmure && MALchangeling !== 0) {
        exec.push(`{{vAssassineD=${totalAssassine}}}`);
        bDegats.push(totalAssassine);
      } else {
        isConditionnelD = true;
        attaquesSurprises.push(i18n_assassine);
        attaquesSurprisesValue.push(totalAssassine);

        if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
      }
    }
  }

  if (aBarbelee) {
    if (isMeurtrier) { autresAmeliorations.push(i18n_barbelee); } else {
      isConditionnelD = true;

      exec.push(`{{meurtrier=${i18n_barbelee}}} {{meurtrierValue=[[${aBarbeleeV}D6]]}} {{meurtrierCondition=${i18n_meurtrierCondition}}}`);
    }
  }

  if (aConnectee) {
    if (isAssistantAttaque) { autresAmeliorations.push(i18n_connectee); } else {
      isConditionnelD = true;
      isConditionnelV = true;

      exec.push(`{{assistanceAttaque=${i18n_connectee}}} {{assistanceAttaqueCondition=${i18n_assistanceAttaqueCondition}}}`);
    }
  }

  if (aElectrifiee) {
    if (isChoc) { autresAmeliorations.push(i18n_electrifiee); } else {
      isConditionnelA = true;

      exec.push(`{{choc=${i18n_electrifiee} 1}} {{chocCondition=${i18n_chocCondition}}}`);
    }
  }

  if (aMassive) {
    if (isLeste) { autresAmeliorations.push(i18n_massive); } else {
      bDegats.push(vForce);
      exec.push(`{{vMassive=${vForce}}}`);
    }
  }

  if (aProtectrice) {
    autresAmeliorations.push(i18n_protectrice);
    nowProtectrice = true;
  }

  if (aJumelle) {
    autresAmeliorations.push(i18n_jumelle);
    nowJumelle = true;
  }

  if (aSoeur) {
    autresAmeliorations.push(i18n_soeur);
    nowSoeur = true;
  }

  if (aSournoise) {
    if (isOrfevrerie) { autresAmeliorations.push(i18n_sournoise); } else {
      let vSournoise = vDexterite;

      if (hasArmure) { vSournoise += oDexterite; }

      bDegats.push(vSournoise);
      exec.push(`{{vSournoise=${vSournoise}}}`);
    }
  }

  if (aSurmesure) {
    let vSurMesure = vCombat;

    if (hasArmure) { vSurMesure += oCombat; }

    bDegats.push(vSurMesure);
    exec.push(`{{vSurMesure=${vSurMesure}}}`);
  }

  if (aIndestructible) { autresAmeliorations.push(i18n_indestructible); }

  if (aLumineuse) {
    aLumiere = i18n_lumineuse;
    aLumiereValue = 2;
  }

  result.isConditionnelA = isConditionnelA;
  result.isConditionnelD = isConditionnelD;
  result.isConditionnelV = isConditionnelV;

  result.isAgressive = nowAgressive;
  result.isSoeur = nowSoeur;
  result.isJumelle = nowJumelle;
  result.isProtectrice = nowProtectrice;
  result.isAllegee = nowAllegee;

  result.aLumiere = aLumiere;
  result.aLumiereValue = aLumiereValue;

  result.attaquesSurprises = attaquesSurprises;
  result.attaquesSurprisesValue = attaquesSurprisesValue;
  result.attaquesSurprisesCondition = attaquesSurprisesCondition;

  result.bAttaque = bAttaque;
  result.diceDegats = diceDegats;
  result.bDegats = bDegats;

  result.exec = exec;
  result.autresAmeliorations = autresAmeliorations;

  return result;
}

function getWeaponsContactASPNJ(prefix, data, isAssistanceAttaque, isChoc, isLeste, isMeurtrier, isOrfevrerie, isSilencieux, vBete, vChair, vMasque, vMasqueAE) {
  const result = {};
  const exec = [];

  let isConditionnelA = false;
  let isConditionnelD = false;
  let isConditionnelV = false;

  const attaquesSurprises = [];
  const attaquesSurprisesValue = [];
  let attaquesSurprisesCondition = '';

  const bAttaque = [];
  let diceDegats = 0;
  let bDegats = 0;
  const autresAmeliorations = [];

  const aAgressive = isApplied(data[`${prefix}agressive`]);
  const aAllegee = isApplied(data[`${prefix}allegee`]);
  const aAssassine = isApplied(data[`${prefix}assassine`]);
  const aBarbelee = isApplied(data[`${prefix}barbelee`]);
  const aBarbeleeV = 2;
  const aConnectee = isApplied(data[`${prefix}connectee`]);
  const aElectrifiee = isApplied(data[`${prefix}electrifiee`]);
  const aIndestructible = isApplied(data[`${prefix}indestructible`]);
  const aJumelle = isApplied(data[`${prefix}jumelle`]);
  const aLumineuse = isApplied(data[`${prefix}lumineuse`]);
  const aMassive = isApplied(data[`${prefix}massive`]);
  const aProtectrice = isApplied(data[`${prefix}protectrice`]);
  const aSoeur = isApplied(data[`${prefix}soeur`]);
  const aSournoise = isApplied(data[`${prefix}sournoisePNJ`]);
  const aSurmesure = isApplied(data[`${prefix}surmesurePNJ`]);

  if (aAllegee) {
    exec.push('{{vAllegee=-1D6}}');
    diceDegats -= 1;
  }

  if (aAssassine) {
    if (isSilencieux) { autresAmeliorations.push(i18n_assassine); } else {
      const totalAssassine = Math.ceil(vMasque / 2) + vMasqueAE;

      isConditionnelD = true;
      attaquesSurprises.push(i18n_assassine);
      attaquesSurprisesValue.push(totalAssassine);

      if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
    }
  }

  if (aBarbelee) {
    if (isMeurtrier) { autresAmeliorations.push(i18n_barbelee); } else {
      isConditionnelD = true;

      exec.push(`{{meurtrier=${i18n_barbelee}}} {{meurtrierValue=[[${aBarbeleeV}D6]]}} {{meurtrierCondition=${i18n_meurtrierCondition}}}`);
    }
  }

  if (aConnectee) {
    if (isAssistanceAttaque) { autresAmeliorations.push(i18n_connectee); } else {
      isConditionnelD = true;
      isConditionnelV = true;

      exec.push(`{{assistanceAttaque=${i18n_connectee}}} {{assistanceAttaqueCondition=${i18n_assistanceAttaqueCondition}}}`);
    }
  }

  if (aElectrifiee) {
    if (isChoc) { autresAmeliorations.push(i18n_electrifiee); } else {
      isConditionnelA = true;

      exec.push(`{{choc=${i18n_electrifiee} 1}} {{chocCondition=${i18n_chocCondition}}}`);
    }
  }

  if (aMassive) {
    if (isLeste) { autresAmeliorations.push(i18n_massive); } else {
      bDegats += Math.floor(vChair / 2);
      exec.push(`{{vMassive=${Math.floor(vChair / 2)}}}`);
    }
  }

  if (aSournoise) {
    if (isOrfevrerie) { autresAmeliorations.push(i18n_sournoise); } else {
      const vSournoise = Math.ceil(vMasque / 2);

      bDegats += vSournoise;
      exec.push(`{{vSournoise=${vSournoise}}}`);
    }
  }

  if (aSurmesure) {
    const vSurMesure = Math.ceil(vBete / 2);

    bDegats.push(vSurMesure);
    exec.push(`{{vSurMesure=${vSurMesure}}}`);
  }

  if (aAgressive) { autresAmeliorations.push(i18n_agressive); }

  if (aIndestructible) { autresAmeliorations.push(i18n_indestructible); }

  if (aJumelle) { autresAmeliorations.push(i18n_jumelle); }

  if (aProtectrice) { autresAmeliorations.push(i18n_protectrice); }

  if (aSoeur) { autresAmeliorations.push(i18n_soeur); }

  if (aLumineuse) { autresAmeliorations.push(`${i18n_lumineuse} (${i18n_lumiere} 2)`); }

  result.isConditionnelA = isConditionnelA;
  result.isConditionnelD = isConditionnelD;
  result.isConditionnelV = isConditionnelV;

  result.attaquesSurprises = attaquesSurprises;
  result.attaquesSurprisesValue = attaquesSurprisesValue;
  result.attaquesSurprisesCondition = attaquesSurprisesCondition;

  result.bAttaque = bAttaque;
  result.diceDegats = diceDegats;
  result.bDegats = bDegats;

  result.exec = exec;
  result.autresAmeliorations = autresAmeliorations;

  return result;
}

function getWeaponsContactAO(prefix, AO, isCadence, vCadence, isObliteration, isAntiAnatheme) {
  const result = {};
  const exec = [];
  const firstExec = [];

  const isConditionnelA = false;
  let isConditionnelD = false;
  let isConditionnelV = false;

  let aLumiere = '';
  let aLumiereValue = 0;

  let isChromee = false;
  const isCraneRieur = false;
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

  let rCadence = '';
  let CadenceValue = 0;

  let nowObliteration = false;

  let diceDegats = 0;
  let diceViolence = 0;
  const bDegats = [];
  const autresAmeliorations = [];

  const aArabesques = isApplied(AO[`${prefix}arabesquesIridescentes`]);
  const aArmeAzurine = isApplied(AO[`${prefix}armeAzurine`]);
  const aArmeRougeSang = isApplied(AO[`${prefix}armeRougeSang`]);
  const aArmureGravee = isApplied(AO[`${prefix}armureGravee`]);
  const aBlasonChevalier = isApplied(AO[`${prefix}blasonChevalier`]);
  const aBouclierGrave = isApplied(AO[`${prefix}bouclierGrave`]);
  const aCheneSculpte = isApplied(AO[`${prefix}cheneSculpte`]);
  const aChromeeLignesLC = isApplied(AO[`${prefix}chromeeLignesLC`]);
  const aCodeKnightGrave = isApplied(AO[`${prefix}codeKnightGrave`]);
  const aCraneRieurGrave = isApplied(AO[`${prefix}craneRieurGrave`]);
  const aFaucheuseGravee = isApplied(AO[`${prefix}faucheuseGravee`]);
  const aFauconsPlumesL = isApplied(AO[`${prefix}fauconsPlumesL`]);
  const aFlammesStylisees = isApplied(AO[`${prefix}flammesStylisees`]);
  const aGriffuresGravees = isApplied(AO[`${prefix}griffuresGravees`]);
  const aMasqueBriseSculpte = isApplied(AO[`${prefix}masqueBriseSculpte`]);
  const aRouagesCassesGraves = isApplied(AO[`${prefix}rouagesCassesGraves`]);
  const aSillonsFLF = isApplied(AO[`${prefix}sillonsFLF`]);

  if (aArabesques) {
    aLumiere = i18n_arabesques;
    aLumiereValue = 1;
  }

  if (aArmeAzurine) {
    isConditionnelD = true;
    isConditionnelV = true;
    isArmeAzurine = true;
    vArmeAzurine = 1;

    exec.push(`{{armeAzurine=${i18n_armeAzurine}}} {{armeAzurineValueD=[[1D6]]}} {{armeAzurineValueV=[[1D6]]}} {{armeAzurineCondition=${i18n_armeAzurineCondition}}}`);
  }

  if (aArmeRougeSang) {
    isConditionnelD = true;
    isArmeRougeSang = true;
    vArmeRougeSang = 1;

    exec.push(`{{armeRougeSang=${i18n_armeRougeSang}}} {{armeRougeSangValueD=[[1D6]]}} {{armeRougeSangValueV=[[1D6]]}} {{armeRougeSangCondition=${i18n_armeRougeSangCondition}}}`);
  }

  if (aCheneSculpte) {
    isConditionnelD = true;
    isCheneSculpte = true;
    vCheneSculpte = 2;

    firstExec.push('{{cheneSculpteValue=[[2D6]]}}');

    exec.push(`{{cheneSculpte=${i18n_cheneSculpte}}} {{cheneSculpteCondition=${i18n_cheneSculpteCondition}}}`);
  }

  if (aChromeeLignesLC) {
    if (isCadence === true && vCadence >= 2) { autresAmeliorations.push(i18n_chromee); } else {
      rCadence = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
      isChromee = true;
      CadenceValue = 2;
    }
  }

  if (aCraneRieurGrave) {
    if (isObliteration) { autresAmeliorations.push(i18n_craneRieur); } else {
      isConditionnelD = true;

      exec.push(`{{obliteration=${i18n_craneRieur}}} {{obliterationCondition=${i18n_obliterationCondition}}}`);

      nowObliteration = true;
    }
  }

  if (aFaucheuseGravee) {
    diceDegats += 1;
    exec.push('{{vFaucheuse=+1D6}}');
  }

  if (aFauconsPlumesL) {
    if (isAntiAnatheme) { autresAmeliorations.push(i18n_fauconPlumesL); } else {
      isConditionnelD = true;
      isConditionnelV = true;

      exec.push(`{{antiAnatheme=${i18n_fauconPlumesL}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);
    }
  }

  if (aFlammesStylisees) {
    diceViolence += 1;
    exec.push('{{vFlammesStylisees=+1D6}}');
  }

  if (aGriffuresGravees) {
    isConditionnelD = true;
    isConditionnelV = true;
    isGriffureGravee = true;
    vGriffureGravee = 1;

    exec.push(`{{griffuresGravees=${i18n_griffuresGravees}}} {{griffuresGraveesValueD=[[1D6]]}} {{griffuresGraveesValueV=[[1D6]]}} {{griffuresGraveesCondition=${i18n_griffuresGraveesCondition}}}`);
  }

  if (aMasqueBriseSculpte) {
    isConditionnelD = true;
    isConditionnelV = true;
    isMasqueBrise = true;
    vMasqueBrise = 1;

    exec.push(`{{masqueBrise=${i18n_masqueBrise}}} {{masqueBriseValueD=[[1D6]]}} {{masqueBriseValueV=[[1D6]]}} {{masqueBriseCondition=${i18n_masqueBriseCondition}}}`);
  }

  if (aRouagesCassesGraves) {
    isConditionnelD = true;
    isConditionnelV = true;
    isRouagesCasses = true;
    vRouagesCasses = 1;

    exec.push(`{{rouagesCasses=${i18n_rouagesCasses}}} {{rouagesCassesValueD=[[1D6]]}} {{rouagesCassesValueV=[[1D6]]}} {{rouagesCassesCondition=${i18n_rouagesCassesCondition}}}`);
  }

  if (aSillonsFLF) {
    bDegats.push(3);
    exec.push('{{vSillonsFLF=+3}}');
  }

  if (aArmureGravee) { autresAmeliorations.push(i18n_armureGravee); }

  if (aBlasonChevalier) { autresAmeliorations.push(i18n_blasonChevalier); }

  if (aBouclierGrave) { autresAmeliorations.push(i18n_bouclierGrave); }

  if (aCodeKnightGrave) { autresAmeliorations.push(i18n_codeKnight); }

  result.isConditionnelA = isConditionnelA;
  result.isConditionnelD = isConditionnelD;
  result.isConditionnelV = isConditionnelV;

  result.isChromee = isChromee;
  result.isCraneRieur = isCraneRieur;
  result.isObliteration = nowObliteration;

  result.isArmeAzurine = isArmeAzurine;
  result.vArmeAzurine = vArmeAzurine;

  result.isArmeRougeSang = isArmeRougeSang;
  result.vArmeRougeSang = vArmeRougeSang;

  result.isCheneSculpte = isCheneSculpte;
  result.vCheneSculpte = vCheneSculpte;

  result.isGriffureGravee = isGriffureGravee;
  result.vGriffureGravee = vGriffureGravee;

  result.isMasqueBrise = isMasqueBrise;
  result.vMasqueBrise = vMasqueBrise;

  result.isRouagesCasses = isRouagesCasses;
  result.vRouagesCasses = vRouagesCasses;

  result.aLumiere = aLumiere;
  result.aLumiereValue = aLumiereValue;

  result.rCadence = rCadence;
  result.vCadence = CadenceValue;

  result.diceDegats = diceDegats;
  result.bDegats = bDegats;
  result.diceViolence = diceViolence;

  result.exec = exec;
  result.firstExec = firstExec;
  result.autresAmeliorations = autresAmeliorations;

  return result;
}

function getWeaponsContactAOPNJ(prefix, data, isCadence, vCadence, isObliteration, isAntiAnatheme) {
  const result = {};
  const exec = [];
  const firstExec = [];

  const isConditionnelA = false;
  let isConditionnelD = false;
  let isConditionnelV = false;

  let isChromee = false;
  const isCraneRieur = false;
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

  let rCadence = '0';
  let CadenceValue = 0;

  let nowObliteration = false;

  let diceDegats = 0;
  let diceViolence = 0;
  let bDegats = 0;
  const autresAmeliorations = [];

  const aArabesques = isApplied(data[`${prefix}arabesquesIridescentes`]);
  const aArmeAzurine = isApplied(data[`${prefix}armeAzurine`]);
  const aArmeRougeSang = isApplied(data[`${prefix}armeRougeSang`]);
  const aArmureGravee = isApplied(data[`${prefix}armureGravee`]);
  const aBlasonChevalier = isApplied(data[`${prefix}blasonChevalier`]);
  const aBouclierGrave = isApplied(data[`${prefix}bouclierGrave`]);
  const aCheneSculpte = isApplied(data[`${prefix}cheneSculpte`]);
  const aChromeeLignesLC = isApplied(data[`${prefix}chromeeLignesLC`]);
  const aCodeKnightGrave = isApplied(data[`${prefix}codeKnightGrave`]);
  const aCraneRieurGrave = isApplied(data[`${prefix}craneRieurGrave`]);
  const aFaucheuseGravee = isApplied(data[`${prefix}faucheuseGravee`]);
  const aFauconsPlumesL = isApplied(data[`${prefix}fauconsPlumesL`]);
  const aFlammesStylisees = isApplied(data[`${prefix}flammesStylisees`]);
  const aGriffuresGravees = isApplied(data[`${prefix}griffuresGravees`]);
  const aMasqueBriseSculpte = isApplied(data[`${prefix}masqueBriseSculpte`]);
  const aRouagesCassesGraves = isApplied(data[`${prefix}rouagesCassesGraves`]);
  const aSillonsFLF = isApplied(data[`${prefix}sillonsFLF`]);

  if (aArmeAzurine) {
    isConditionnelD = true;
    isConditionnelV = true;
    isArmeAzurine = true;
    vArmeAzurine = 1;

    exec.push(`{{armeAzurine=${i18n_armeAzurine}}} {{armeAzurineValueD=[[1D6]]}} {{armeAzurineValueV=[[1D6]]}} {{armeAzurineCondition=${i18n_armeAzurineCondition}}}`);
  }

  if (aArmeRougeSang) {
    isConditionnelD = true;
    isArmeRougeSang = true;
    vArmeRougeSang = 1;

    exec.push(`{{armeRougeSang=${i18n_armeRougeSang}}} {{armeRougeSangValueD=[[1D6]]}} {{armeRougeSangValueV=[[1D6]]}} {{armeRougeSangCondition=${i18n_armeRougeSangCondition}}}`);
  }

  if (aCheneSculpte) {
    isConditionnelD = true;
    isCheneSculpte = true;
    vCheneSculpte = 2;

    firstExec.push('{{cheneSculpteValue=[[2D6]]}}');

    exec.push(`{{cheneSculpte=${i18n_cheneSculpte}}} {{cheneSculpteCondition=${i18n_cheneSculpteCondition}}}`);
  }

  if (aChromeeLignesLC) {
    if (isCadence === true && vCadence >= 2) { autresAmeliorations.push(i18n_chromee); } else {
      rCadence = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
      isChromee = true;
      CadenceValue = 2;
    }
  }

  if (aCraneRieurGrave) {
    if (isObliteration) { autresAmeliorations.push(i18n_craneRieur); } else {
      isConditionnelD = true;

      exec.push(`{{obliteration=${i18n_craneRieur}}} {{obliterationCondition=${i18n_obliterationCondition}}}`);

      nowObliteration = true;
    }
  }

  if (aFaucheuseGravee) {
    diceDegats += 1;
    exec.push('{{vFaucheuse=+1D6}}');
  }

  if (aFauconsPlumesL) {
    if (isAntiAnatheme) { autresAmeliorations.push(i18n_fauconPlumesL); } else {
      isConditionnelD = true;
      isConditionnelV = true;

      exec.push(`{{antiAnatheme=${i18n_fauconPlumesL}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}}`);
    }
  }

  if (aFlammesStylisees) {
    diceViolence += 1;
    exec.push('{{vFlammesStylisees=+1D6}}');
  }

  if (aGriffuresGravees) {
    isConditionnelD = true;
    isConditionnelV = true;
    isGriffureGravee = true;
    vGriffureGravee = 1;

    exec.push(`{{griffuresGravees=${i18n_griffuresGravees}}} {{griffuresGraveesValueD=[[1D6]]}} {{griffuresGraveesValueV=[[1D6]]}} {{griffuresGraveesCondition=${i18n_griffuresGraveesCondition}}}`);
  }

  if (aMasqueBriseSculpte) {
    isConditionnelD = true;
    isConditionnelV = true;
    isMasqueBrise = true;
    vMasqueBrise = 1;

    exec.push(`{{masqueBrise=${i18n_masqueBrise}}} {{masqueBriseValueD=[[1D6]]}} {{masqueBriseValueV=[[1D6]]}} {{masqueBriseCondition=${i18n_masqueBriseCondition}}}`);
  }

  if (aRouagesCassesGraves) {
    isConditionnelD = true;
    isConditionnelV = true;
    isRouagesCasses = true;
    vRouagesCasses = 1;

    exec.push(`{{rouagesCasses=${i18n_rouagesCasses}}} {{rouagesCassesValueD=[[1D6]]}} {{rouagesCassesValueV=[[1D6]]}} {{rouagesCassesCondition=${i18n_rouagesCassesCondition}}}`);
  }

  if (aSillonsFLF) {
    bDegats += 3;
    exec.push('{{vSillonsFLF=+3}}');
  }

  if (aArabesques) { autresAmeliorations.push(`${i18n_arabesques} (${i18n_lumiere} 1)`); }

  if (aArmureGravee) { autresAmeliorations.push(i18n_armureGravee); }

  if (aBlasonChevalier) { autresAmeliorations.push(i18n_blasonChevalier); }

  if (aBouclierGrave) { autresAmeliorations.push(i18n_bouclierGrave); }

  if (aCodeKnightGrave) { autresAmeliorations.push(i18n_codeKnight); }

  result.isConditionnelA = isConditionnelA;
  result.isConditionnelD = isConditionnelD;
  result.isConditionnelV = isConditionnelV;

  result.isChromee = isChromee;
  result.isCraneRieur = isCraneRieur;
  result.isObliteration = nowObliteration;

  result.isArmeAzurine = isArmeAzurine;
  result.vArmeAzurine = vArmeAzurine;

  result.isArmeRougeSang = isArmeRougeSang;
  result.vArmeRougeSang = vArmeRougeSang;

  result.isCheneSculpte = isCheneSculpte;
  result.vCheneSculpte = vCheneSculpte;

  result.isGriffureGravee = isGriffureGravee;
  result.vGriffureGravee = vGriffureGravee;

  result.isMasqueBrise = isMasqueBrise;
  result.vMasqueBrise = vMasqueBrise;

  result.isRouagesCasses = isRouagesCasses;
  result.vRouagesCasses = vRouagesCasses;

  result.rCadence = rCadence;
  result.vCadence = CadenceValue;

  result.diceDegats = diceDegats;
  result.bDegats = bDegats;
  result.diceViolence = diceViolence;

  result.exec = exec;
  result.firstExec = firstExec;
  result.autresAmeliorations = autresAmeliorations;

  return result;
}

function getWeaponsDistanceAA(prefix, AA, vDiscretion, oDiscretion, eAssistanceAttaque, eASAssassinValue, isCadence, vCadence, eSilencieux, eTirRafale, isObliteration, isAntiAnatheme) {
  const result = {};
  const exec = [];
  const armure = AA.armure;

  let hasArmure = true;

  let isConditionnelA = false;
  let isConditionnelD = false;
  let isConditionnelV = false;

  let isChambreDouble = false;
  let rChambreDouble = '';

  let isInterfaceGuidage = false;

  let isJAmbidextre = false;
  let isJAkimbo = false;

  let aASAssassin = '';
  let aASAssassinValue = 0;

  const bonus = [];
  let diceDegats = 0;
  let diceViolence = 0;
  const bDegats = [];
  const attaquesSurprises = [];
  let attaquesSurprisesCondition = '';
  const attaquesSurprisesValue = [];
  const autresAmeliorations = [];
  const autresEffets = [];

  const aChargeurGrappes = isApplied(AA[`${prefix}chargeurGrappes`]);
  const aCanonLong = isApplied(AA[`${prefix}canonLong`]);
  const aCanonRaccourci = isApplied(AA[`${prefix}canonRaccourci`]);
  const aChambreDouble = isApplied(AA[`${prefix}chambreDouble`]);
  const aInterfaceGuidage = isApplied(AA[`${prefix}interfaceGuidage`]);
  const aJumelage = isApplied(AA[`${prefix}jumelage`]);
  const aJumelageV = AA[`${prefix}jumelageValue`];
  const aJumelageT = AA[`${prefix}jumelageType`];
  const aLunetteIntelligente = isApplied(AA[`${prefix}lunetteIntelligente`]);
  const aMunitionsHyperVelocite = isApplied(AA[`${prefix}munitionsHyperVelocite`]);
  const aMunitionsDrone = isApplied(AA[`${prefix}munitionsDrone`]);
  const aChargeurExplosives = isApplied(AA[`${prefix}chargeurExplosives`]);
  const aMunitionsIEM = isApplied(AA[`${prefix}munitionsIEM`]);
  const aMunitionsNonLetales = isApplied(AA[`${prefix}munitionsNonLetales`]);
  const aMunitionsSubsoniques = isApplied(AA[`${prefix}munitionsSubsoniques`]);
  const aPointeurLaser = isApplied(AA[`${prefix}pointeurLaser`]);
  const aProtectionArme = isApplied(AA[`${prefix}protectionArme`]);
  const aRevetementOmega = isApplied(AA[`${prefix}revetementOmega`]);
  const aStructureElement = isApplied(AA[`${prefix}structureElement`]);
  const aSystemeRefroidissement = isApplied(AA[`${prefix}systemeRefroidissement`]);

  if (armure === 'sans' || armure === 'guardian') { hasArmure = false; }

  if (aChargeurGrappes) {
    diceDegats -= 1;
    diceViolence += 1;

    exec.push('{{vMGrappeD=-1D}} {{vMGrappeV=+1D}}');
  }

  if (aCanonLong) {
    isConditionnelA = true;

    exec.push(`{{canonLong=${i18n_canonLong}}} {{canonLongCondition=${i18n_canonLongCondition}}}`);
  }

  if (aCanonRaccourci) {
    isConditionnelA = true;

    exec.push(`{{canonRaccourci=${i18n_canonRaccourci}}} {{canonRaccourciCondition=${i18n_canonRaccourciCondition}}}`);
  }

  if (aChambreDouble) {
    if (isCadence && vCadence >= 2) { autresAmeliorations.push(i18n_chambreDouble); } else if (isCadence) {
      autresEffets.push(`${i18n_cadence} ${vCadence}`);
      rChambreDouble = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
      isChambreDouble = true;
    } else {
      rChambreDouble = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
      isChambreDouble = true;
    }
  }

  if (aInterfaceGuidage) {
    autresAmeliorations.push(i18n_interfaceGuidage);
    isInterfaceGuidage = true;
  }

  if (aJumelage) {
    if (aJumelageT === 'ambidextrie') {
      autresAmeliorations.push(`${i18n_jumelage} ${i18n_ambidextrie} (${aJumelageV})`);
      isJAmbidextre = true;
    } else if (aJumelageT === 'akimbo') {
      autresAmeliorations.push(`${i18n_jumelage} ${i18n_akimbo} (${aJumelageV})`);
      isJAkimbo = true;
    } else { autresAmeliorations.push(`${i18n_jumelage} (${aJumelageV})`); }
  }

  if (aLunetteIntelligente) {
    isConditionnelA = true;
    exec.push(`{{lunetteIntelligente=${i18n_lunetteIntelligente}}} {{lunetteIntelligenteCondition=${i18n_lunetteIntelligenteCondition}}}`);
  }

  if (aMunitionsHyperVelocite) {
    if (eAssistanceAttaque) { autresAmeliorations.push(i18n_munitionsHyperVelocite); } else {
      isConditionnelD = true;
      isConditionnelV = true;

      exec.push(`{{assistanceAttaque=${i18n_munitionsHyperVelocite}}} {{assistanceAttaqueCondition=${i18n_assistanceAttaqueCondition}}}`);
    }
  }

  if (aMunitionsDrone) {
    exec.push('{{vMDrone=+3}}');
    bonus.push(3);
  }

  if (aChargeurExplosives) {
    exec.push('{{vMExplosiveD=+1D6}} {{vMExplosiveV=-1D6}}');

    diceDegats += 1;
    diceViolence -= 1;
  }

  if (aMunitionsIEM) {
    exec.push('{{vMIEMD=-1D6}} {{vMIEMV=-1D6}}');

    diceDegats -= 1;
    diceViolence -= 1;
    autresAmeliorations.push(i18n_munitionsIEMParasitage);
  }

  if (aMunitionsSubsoniques) {
    if (eSilencieux) { autresAmeliorations.push(i18n_munitionsSubsoniques); } else {
      const ghost = +AA.rogueGhost;
      const MALghost = +AA.MALRogueGhost;
      const changeling = +AA.bardChangeling;
      const MALchangeling = +AA.MALBardChangeling;
      let totalSubsonique = vDiscretion;

      if (hasArmure) { totalSubsonique += oDiscretion; }

      if (hasArmure && ghost !== 0) {
        exec.push(`{{vSubsoniqueD=${totalSubsonique}}}`);
        bDegats.push(totalSubsonique);
      } else if (hasArmure && MALghost !== 0) {
        exec.push(`{{vSubsoniqueD=${totalSubsonique}}}`);
        bDegats.push(totalSubsonique);
      } else if (hasArmure && changeling !== 0) {
        exec.push(`{{vSubsoniqueD=${totalSubsonique}}}`);
        bDegats.push(totalSubsonique);
      } else if (hasArmure && MALchangeling !== 0) {
        exec.push(`{{vSubsoniqueD=${totalSubsonique}}}`);
        bDegats.push(totalSubsonique);
      } else {
        isConditionnelD = true;
        attaquesSurprises.push(i18n_munitionsSubsoniques);
        attaquesSurprisesValue.push(totalSubsonique);

        if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
      }
    }
  }

  if (aPointeurLaser) {
    exec.push('{{vMPLaser=+1}}');
    bonus.push(1);
  }

  if (aRevetementOmega) {
    if (eASAssassinValue < 2) {
      aASAssassin = i18n_revetementOmega;
      aASAssassinValue = 2;

      if (eASAssassinValue !== 0) { autresEffets.push(i18n_assassin); }
    } else if (eASAssassinValue > 2) { autresAmeliorations.push(i18n_revetementOmega); }
  }

  if (aSystemeRefroidissement) {
    if (!eTirRafale) { autresAmeliorations.push(`${i18n_systemeRefroidissement} (${i18n_barrage} 1)`); } else if (eTirRafale) { exec.push(`{{tirRafale=${i18n_systemeRefroidissement} + ${i18n_barrage} 1}} {{tirRafaleCondition=${i18n_tirRafaleCondition}}}`); }
  }

  if (aMunitionsNonLetales) { autresAmeliorations.push(i18n_munitionsNonLetales); }

  if (aProtectionArme) { autresAmeliorations.push(i18n_protectionArme); }

  if (aStructureElement) { autresAmeliorations.push(i18n_structureElementAlpha); }

  result.isConditionnelA = isConditionnelA;
  result.isConditionnelD = isConditionnelD;
  result.isConditionnelV = isConditionnelV;

  result.bonus = bonus;
  result.diceDegats = diceDegats;
  result.bDegats = bDegats;
  result.diceViolence = diceViolence;

  result.aASAssassin = aASAssassin;
  result.aASAssassinValue = aASAssassinValue;

  result.attaquesSurprises = attaquesSurprises;
  result.attaquesSurprisesValue = attaquesSurprisesValue;
  result.attaquesSurprisesCondition = attaquesSurprisesCondition;

  result.isChambreDouble = isChambreDouble;
  result.rChambreDouble = rChambreDouble;
  result.isJAmbidextre = isJAmbidextre;
  result.isJAkimbo = isJAkimbo;

  result.exec = exec;
  result.autresAmeliorations = autresAmeliorations;
  result.autresEffets = autresEffets;

  return result;
}

function getWeaponsDistanceAAPNJ(prefix, attrs, vMasque, vMasqueAE, eAssistanceAttaque, eASAssassinValue, isCadence, vCadence, eSilencieux, eTirRafale, isObliteration, isAntiAnatheme) {
  const result = {};
  const exec = [];

  let isConditionnelA = false;
  let isConditionnelD = false;
  let isConditionnelV = false;

  let isChambreDouble = false;
  let rChambreDouble = '';

  let isInterfaceGuidage = false;

  let aASAssassin = '';
  let aASAssassinValue = 0;

  const bonus = [];
  let diceDegats = 0;
  let diceViolence = 0;
  const bDegats = [];
  const attaquesSurprises = [];
  let attaquesSurprisesCondition = '';
  const attaquesSurprisesValue = [];
  const autresAmeliorations = [];
  const autresEffets = [];

  const aChargeurGrappes = isApplied(attrs[`${prefix}chargeurGrappes`]);
  const aCanonLong = isApplied(attrs[`${prefix}canonLong`]);
  const aCanonRaccourci = isApplied(attrs[`${prefix}canonRaccourci`]);
  const aChambreDouble = isApplied(attrs[`${prefix}chambreDouble`]);
  const aInterfaceGuidage = isApplied(attrs[`${prefix}interfaceGuidage`]);
  const aJumelage = isApplied(attrs[`${prefix}jumelage`]);
  const aJumelageV = attrs[`${prefix}jumelageValue`];
  const aJumelageT = attrs[`${prefix}jumelageType`];
  const aLunetteIntelligente = isApplied(attrs[`${prefix}lunetteIntelligente`]);
  const aMunitionsHyperVelocite = isApplied(attrs[`${prefix}munitionsHyperVelocite`]);
  const aMunitionsDrone = isApplied(attrs[`${prefix}munitionsDrone`]);
  const aChargeurExplosives = isApplied(attrs[`${prefix}chargeurExplosives`]);
  const aMunitionsIEM = isApplied(attrs[`${prefix}munitionsIEM`]);
  const aMunitionsNonLetales = isApplied(attrs[`${prefix}munitionsNonLetales`]);
  const aMunitionsSubsoniques = isApplied(attrs[`${prefix}munitionsSubsoniques`]);
  const aPointeurLaser = isApplied(attrs[`${prefix}pointeurLaser`]);
  const aProtectionArme = isApplied(attrs[`${prefix}protectionArme`]);
  const aRevetementOmega = isApplied(attrs[`${prefix}revetementOmega`]);
  const aStructureElement = isApplied(attrs[`${prefix}structureElement`]);
  const aSystemeRefroidissement = isApplied(attrs[`${prefix}systemeRefroidissement`]);

  if (aChargeurGrappes) {
    diceDegats -= 1;
    diceViolence += 1;

    exec.push('{{vMGrappeD=-1D}} {{vMGrappeV=+1D}}');
  }

  if (aCanonLong) {
    isConditionnelA = true;

    exec.push(`{{canonLong=${i18n_canonLong}}} {{canonLongCondition=${i18n_canonLongCondition}}}`);
  }

  if (aCanonRaccourci) {
    isConditionnelA = true;

    exec.push(`{{canonRaccourci=${i18n_canonRaccourci}}} {{canonRaccourciCondition=${i18n_canonRaccourciCondition}}}`);
  }

  if (aChambreDouble) {
    if (isCadence && vCadence >= 2) { autresAmeliorations.push(i18n_chambreDouble); } else if (isCadence) {
      autresEffets.push(`${i18n_cadence} ${vCadence}`);
      rChambreDouble = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
      isChambreDouble = true;
    } else {
      rChambreDouble = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
      isChambreDouble = true;
    }
  }

  if (aInterfaceGuidage) {
    autresAmeliorations.push(i18n_interfaceGuidage);
    isInterfaceGuidage = true;
  }

  if (aJumelage) {
    if (aJumelageT === 'ambidextrie') { autresAmeliorations.push(`${i18n_jumelage} ${i18n_ambidextrie} (${aJumelageV})`); } else if (aJumelageT === 'akimbo') { autresAmeliorations.push(`${i18n_jumelage} ${i18n_akimbo} (${aJumelageV})`); } else { autresAmeliorations.push(`${i18n_jumelage} (${aJumelageV})`); }
  }

  if (aLunetteIntelligente) {
    isConditionnelA = true;
    exec.push(`{{lunetteIntelligente=${i18n_lunetteIntelligente}}} {{lunetteIntelligenteCondition=${i18n_lunetteIntelligenteCondition}}}`);
  }

  if (aMunitionsHyperVelocite) {
    if (eAssistanceAttaque) { autresAmeliorations.push(i18n_munitionsHyperVelocite); } else {
      isConditionnelD = true;
      isConditionnelV = true;

      exec.push(`{{assistanceAttaque=${i18n_munitionsHyperVelocite}}} {{assistanceAttaqueCondition=${i18n_assistanceAttaqueCondition}}}`);
    }
  }

  if (aMunitionsDrone) {
    exec.push('{{vMDrone=+3}}');
    bonus.push(3);
  }

  if (aChargeurExplosives) {
    exec.push('{{vMExplosiveD=+1D6}} {{vMExplosiveV=-1D6}}');

    diceDegats += 1;
    diceViolence -= 1;
  }

  if (aMunitionsIEM) {
    exec.push('{{vMIEMD=-1D6}} {{vMIEMV=-1D6}}');

    diceDegats -= 1;
    diceViolence -= 1;
    autresAmeliorations.push(i18n_munitionsIEMParasitage);
  }

  if (aMunitionsSubsoniques) {
    if (eSilencieux) { autresAmeliorations.push(i18n_munitionsSubsoniques); } else {
      const totalSubsonique = Math.ceil(vMasque / 2) + vMasqueAE;

      attaquesSurprises.push(i18n_munitionsSubsoniques);
      attaquesSurprisesValue.push(totalSubsonique);

      if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`; }
    }
  }

  if (aPointeurLaser) {
    exec.push('{{vMPLaser=+1}}');
    bonus.push(1);
  }

  if (aRevetementOmega) {
    if (eASAssassinValue < 2) {
      aASAssassin = i18n_revetementOmega;
      aASAssassinValue = 2;

      if (eASAssassinValue !== 0) { autresEffets.push(i18n_assassin); }
    } else if (eASAssassinValue > 2) { autresAmeliorations.push(i18n_revetementOmega); }
  }

  if (aSystemeRefroidissement) {
    if (!eTirRafale) { autresAmeliorations.push(`${i18n_systemeRefroidissement} (${i18n_barrage} 1)`); } else if (eTirRafale) { exec.push(`{{tirRafale=${i18n_systemeRefroidissement} + ${i18n_barrage} 1}} {{tirRafaleCondition=${i18n_tirRafaleCondition}}}`); }
  }

  if (aMunitionsNonLetales) { autresAmeliorations.push(i18n_munitionsNonLetales); }

  if (aProtectionArme) { autresAmeliorations.push(i18n_protectionArme); }

  if (aStructureElement) { autresAmeliorations.push(i18n_structureElementAlpha); }

  result.isConditionnelA = isConditionnelA;
  result.isConditionnelD = isConditionnelD;
  result.isConditionnelV = isConditionnelV;

  result.bonus = bonus;
  result.diceDegats = diceDegats;
  result.bDegats = bDegats;
  result.diceViolence = diceViolence;

  result.aASAssassin = aASAssassin;
  result.aASAssassinValue = aASAssassinValue;

  result.attaquesSurprises = attaquesSurprises;
  result.attaquesSurprisesValue = attaquesSurprisesValue;
  result.attaquesSurprisesCondition = attaquesSurprisesCondition;

  result.isChambreDouble = isChambreDouble;
  result.rChambreDouble = rChambreDouble;

  result.exec = exec;
  result.autresAmeliorations = autresAmeliorations;
  result.autresEffets = autresEffets;

  return result;
}

function getWeaponsAutreAA(prefix, AA, eAssistanceAttaque, eASAssassinValue, isCadence, vCadence, eSilencieux, eTirRafale, isObliteration, isAntiAnatheme) {
  const result = {};
  const exec = [];

  let isConditionnelA = false;
  let isConditionnelD = false;
  let isConditionnelV = false;

  let isChambreDouble = false;
  let rChambreDouble = '';

  let isInterfaceGuidage = false;

  let isJAmbidextre = false;
  let isJAkimbo = false;

  let aASAssassin = '';
  let aASAssassinValue = 0;

  const bonus = [];
  let diceDegats = 0;
  let diceViolence = 0;
  const bDegats = [];
  const attaquesSurprises = [];
  const attaquesSurprisesCondition = '';
  const attaquesSurprisesValue = [];
  const autresAmeliorations = [];
  const autresEffets = [];

  const aChargeurGrappes = isApplied(AA[`${prefix}chargeurGrappes`]);
  const aCanonLong = isApplied(AA[`${prefix}canonLong`]);
  const aCanonRaccourci = isApplied(AA[`${prefix}canonRaccourci`]);
  const aChambreDouble = isApplied(AA[`${prefix}chambreDouble`]);
  const aInterfaceGuidage = isApplied(AA[`${prefix}interfaceGuidage`]);
  const aJumelage = isApplied(AA[`${prefix}jumelage`]);
  const aJumelageV = AA[`${prefix}jumelageValue`];
  const aJumelageT = AA[`${prefix}jumelageType`];
  const aLunetteIntelligente = isApplied(AA[`${prefix}lunetteIntelligente`]);
  const aMunitionsHyperVelocite = isApplied(AA[`${prefix}munitionsHyperVelocite`]);
  const aMunitionsDrone = isApplied(AA[`${prefix}munitionsDrone`]);
  const aChargeurExplosives = isApplied(AA[`${prefix}chargeurExplosives`]);
  const aMunitionsIEM = isApplied(AA[`${prefix}munitionsIEM`]);
  const aMunitionsNonLetales = isApplied(AA[`${prefix}munitionsNonLetales`]);
  const aMunitionsSubsoniques = isApplied(AA[`${prefix}munitionsSubsoniques`]);
  const aPointeurLaser = isApplied(AA[`${prefix}pointeurLaser`]);
  const aProtectionArme = isApplied(AA[`${prefix}protectionArme`]);
  const aRevetementOmega = isApplied(AA[`${prefix}revetementOmega`]);
  const aStructureElement = isApplied(AA[`${prefix}structureElement`]);
  const aSystemeRefroidissement = isApplied(AA[`${prefix}systemeRefroidissement`]);

  if (aChargeurGrappes) {
    diceDegats -= 1;
    diceViolence += 1;

    exec.push('{{vMGrappeD=-1D}} {{vMGrappeV=+1D}}');
  }

  if (aCanonLong) {
    isConditionnelA = true;

    exec.push(`{{canonLong=${i18n_canonLong}}} {{canonLongCondition=${i18n_canonLongCondition}}}`);
  }

  if (aCanonRaccourci) {
    isConditionnelA = true;

    exec.push(`{{canonRaccourci=${i18n_canonRaccourci}}} {{canonRaccourciCondition=${i18n_canonRaccourciCondition}}}`);
  }

  if (aChambreDouble) {
    if (isCadence && vCadence >= 2) { autresAmeliorations.push(i18n_chambreDouble); } else if (isCadence) {
      autresEffets.push(`${i18n_cadence} ${vCadence}`);
      rChambreDouble = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
      isChambreDouble = true;
    } else {
      rChambreDouble = '?{Plusieurs cibles ?|Oui, 3|Non, 0}';
      isChambreDouble = true;
    }
  }

  if (aInterfaceGuidage) {
    autresAmeliorations.push(i18n_interfaceGuidage);
    isInterfaceGuidage = true;
  }

  if (aJumelage) {
    if (aJumelageT === 'ambidextrie') {
      autresAmeliorations.push(`${i18n_jumelage} ${i18n_ambidextrie} (${aJumelageV})`);
      isJAmbidextre = true;
    } else if (aJumelageT === 'akimbo') {
      autresAmeliorations.push(`${i18n_jumelage} ${i18n_akimbo} (${aJumelageV})`);
      isJAkimbo = true;
    } else { autresAmeliorations.push(`${i18n_jumelage} (${aJumelageV})`); }
  }

  if (aLunetteIntelligente) {
    isConditionnelA = true;

    exec.push(`{{lunetteIntelligente=${i18n_lunetteIntelligente}}} {{lunetteIntelligenteCondition=${i18n_lunetteIntelligenteCondition}}}`);
  }

  if (aMunitionsHyperVelocite) {
    if (eAssistanceAttaque) { autresAmeliorations.push(i18n_munitionsHyperVelocite); } else {
      isConditionnelD = true;
      isConditionnelV = true;

      exec.push(`{{assistanceAttaque=${i18n_munitionsHyperVelocite}}} {{assistanceAttaqueCondition=${i18n_assistanceAttaqueCondition}}}`);
    }
  }

  if (aMunitionsDrone) {
    exec.push('{{vMDrone=+3}}');
    bonus.push(3);
  }

  if (aChargeurExplosives) {
    exec.push('{{vMExplosiveD=+1D6}} {{vMExplosiveV=-1D6}}');
    diceDegats += 1;
    diceViolence -= 1;
  }

  if (aMunitionsIEM) {
    exec.push('{{vMIEMD=-1D6}} {{vMIEMV=-1D6}}');

    diceDegats -= 1;
    diceViolence -= 1;
    autresAmeliorations.push(i18n_munitionsIEMParasitage);
  }

  if (aMunitionsSubsoniques) { autresAmeliorations.push(i18n_munitionsSubsoniques); }

  if (aPointeurLaser) {
    exec.push('{{vMPLaser=+1}}');
    bonus.push(1);
  }

  if (aRevetementOmega) {
    if (eASAssassinValue < 2) {
      aASAssassin = i18n_revetementOmega;
      aASAssassinValue = 2;

      if (eASAssassinValue !== 0) { autresEffets.push(i18n_assassin); }
    } else if (eASAssassinValue > 2) { autresAmeliorations.push(i18n_revetementOmega); }
  }

  if (aSystemeRefroidissement) {
    if (!eTirRafale) { autresAmeliorations.push(`${i18n_systemeRefroidissement} (${i18n_barrage} 1)`); } else if (eTirRafale) { exec.push(`{{tirRafale=${i18n_systemeRefroidissement} + ${i18n_barrage} 1}} {{tirRafaleCondition=${i18n_tirRafaleCondition}}}`); }
  }

  if (aMunitionsNonLetales) { autresAmeliorations.push(i18n_munitionsNonLetales); }

  if (aProtectionArme) { autresAmeliorations.push(i18n_protectionArme); }

  if (aStructureElement) { autresAmeliorations.push(i18n_structureElementAlpha); }

  result.isConditionnelA = isConditionnelA;
  result.isConditionnelD = isConditionnelD;
  result.isConditionnelV = isConditionnelV;

  result.bonus = bonus;
  result.diceDegats = diceDegats;
  result.bDegats = bDegats;
  result.diceViolence = diceViolence;

  result.aASAssassin = aASAssassin;
  result.aASAssassinValue = aASAssassinValue;

  result.attaquesSurprises = attaquesSurprises;
  result.attaquesSurprisesValue = attaquesSurprisesValue;
  result.attaquesSurprisesCondition = attaquesSurprisesCondition;

  result.isChambreDouble = isChambreDouble;
  result.rChambreDouble = rChambreDouble;
  result.isJAmbidextre = isJAmbidextre;
  result.isJAkimbo = isJAkimbo;

  result.exec = exec;
  result.autresAmeliorations = autresAmeliorations;
  result.autresEffets = autresEffets;

  return result;
}

function getArmorBonus(value, armure, isELumiere, isASLumiere, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, aEffets = [], simpleRoll = false) {
  const result = {};
  const exec = [];
  const cRoll = [];
  const bDegats = [];

  let diceDegats = 0;
  let diceViolence = 0;

  const ODBarbarian = [];
  const ODRogue = [];
  const ODShaman = [];
  const autresEffets = [];

  let goliath = 0;
  let changeling = '';
  let ghost = '';

  let shaman = 0;
  let C5 = '';
  let C6 = '';
  let C7 = '';
  let C5Nom = '';
  let C6Nom = '';
  let C7Nom = '';

  let ODWarrior = 0;
  let warrior250PG = 0;

  let typeSoldier = '';
  let typeHunter = '';
  let typeHerald = '';
  let typeScholar = '';
  let typeScout = '';

  let bonusWarrior = 0;
  let isConditionnelA = false;

  switch (armure) {
    case 'barbarian':
      goliath = Number(value.barbarianGoliath);

      if (goliath !== 0) {
        exec.push(`{{goliath=[[${goliath}]]}}`);

        if (C1Nom === 'force' || C1Nom === 'endurance') { ODBarbarian.push(goliath); }

        if (C2Nom === 'force' || C2Nom === 'endurance') { ODBarbarian.push(goliath); }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'force' || C3Nom === 'endurance') { ODBarbarian.push(goliath); }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'force' || C4Nom === 'endurance') { ODBarbarian.push(goliath); }
        }

        if (ODBarbarian.length === 0) { exec.push('{{vODBarbarian=[[0]]}}'); } else { exec.push(`{{vODBarbarian=[[${ODBarbarian.join('+')}]]}}`); }

        diceDegats += goliath;
        diceViolence += goliath;

        exec.push(`{{vBarbarianD=+${goliath}D6}}`);
        exec.push(`{{vBarbarianV=+${goliath}D6}}`);

        if (goliath >= 4 && !aEffets.includes(i18n_antiVehicule)) {
          autresEffets.push(i18n_antiVehicule);
        }
      }
      break;

    case 'bard':
      changeling = +value.bardChangeling;

      if (changeling !== 0) {
        exec.push(`{{special2=${i18n_changelingActive}}}`);
      }
      break;

    case 'rogue':
      ghost = +value.rogueGhost;

      if (ghost !== 0) {
        exec.push(`{{special2=${i18n_ghostActive}}}`);

        if (simpleRoll) {
          exec.push(`{{vODGhostA=${i18n_ghost}}} {{vODGhostAValue=${3}}}`);
          isConditionnelA = true;
        } else if (isELumiere === false && isASLumiere === false) {
          const totalGhost = vDiscretion + oDiscretion;

          isConditionnelA = true;
          exec.push(`{{vGhostA=${vDiscretion}D6+${oDiscretion}}}`);
          exec.push(`{{vGhostD=${totalGhost}}}`);
          cRoll.push(vDiscretion);
          ODRogue.push(oDiscretion);
          bDegats.push(totalGhost);
        }
      }

      break;

    case 'shaman':
      shaman = Number(value.shamanNbreTotem);
      C5 = value.caracteristiqueTotem1;
      C6 = value.caracteristiqueTotem2;
      C7 = value.caracteristiqueTotem3;

      C5Nom = C5.slice(2, -1);
      C6Nom = C6.slice(2, -1);
      C7Nom = C7.slice(2, -1);

      if (shaman === 1 || shaman === 2 || shaman === 3) {
        if (C5 !== '0') {
          exec.push(`{{totem1=${CaracNom[C5Nom]}}}`);
          cRoll.push(C5);
          ODShaman.push(`@{${ODValue[C5Nom]}}`);
        }
      }

      if (shaman === 2 || shaman === 3) {
        if (C6 !== '0') {
          exec.push(`{{totem2=${CaracNom[C6Nom]}}}`);
          cRoll.push(C6);
          ODShaman.push(`@{${ODValue[C6Nom]}}`);
        }
      }

      if (shaman === 3) {
        if (C7 !== '0') {
          exec.push(`{{totem3=${CaracNom[C7Nom]}}}`);
          cRoll.push(C7);
          ODShaman.push(`@{${ODValue[C7Nom]}}`);
        }
      }

      if (shaman === 1 || shaman === 2 || shaman === 3) {
        exec.push('{{totem=true}}');

        if (ODShaman.length === 0) { exec.push('{{vODShaman=[[0]]}}'); } else { exec.push(`{{vODShaman=[[${ODShaman.join('+')}]]}}`); }
      }
      break;

    case 'warrior':
      warrior250PG = +value.warrior250PG;
      bonusWarrior = 1 + warrior250PG;

      typeSoldier = +value.warriorSoldierA;
      typeHunter = +value.warriorHunterA;
      typeHerald = +value.warriorHeraldA;
      typeScholar = +value.warriorScholarA;
      typeScout = +value.warriorScoutA;

      if (typeSoldier !== 0) {
        exec.push(`{{special2=${i18n_typeSoldier}}}`);

        if (C1Nom === 'deplacement' || C1Nom === 'force' || C1Nom === 'endurance') { ODWarrior += bonusWarrior; }

        if (C2Nom === 'deplacement' || C2Nom === 'force' || C2Nom === 'endurance') { ODWarrior += bonusWarrior; }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'deplacement' || C3Nom === 'force' || C3Nom === 'endurance') { ODWarrior += bonusWarrior; }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'deplacement' || C4Nom === 'force' || C4Nom === 'endurance') { ODWarrior += bonusWarrior; }
        }
      }

      if (typeHunter !== 0) {
        exec.push(`{{special2=${i18n_typeHunter}}}`);

        if (C1Nom === 'hargne' || C1Nom === 'combat' || C1Nom === 'instinct') { ODWarrior += bonusWarrior; }

        if (C2Nom === 'hargne' || C2Nom === 'combat' || C2Nom === 'instinct') { ODWarrior += bonusWarrior; }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'hargne' || C3Nom === 'combat' || C3Nom === 'instinct') { ODWarrior += bonusWarrior; }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'hargne' || C4Nom === 'combat' || C4Nom === 'instinct') { ODWarrior += bonusWarrior; }
        }
      }

      if (typeHerald !== 0) {
        exec.push(`{{special2=${i18n_typeHerald}}}`);

        if (C1Nom === 'aura' || C1Nom === 'parole' || C1Nom === 'sf') { ODWarrior += bonusWarrior; }

        if (C2Nom === 'aura' || C2Nom === 'parole' || C2Nom === 'sf') { ODWarrior += bonusWarrior; }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'aura' || C3Nom === 'parole' || C3Nom === 'sf') { ODWarrior += bonusWarrior; }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'aura' || C4Nom === 'parole' || C4Nom === 'sf') { ODWarrior += bonusWarrior; }
        }
      }

      if (typeScholar !== 0) {
        exec.push(`{{special2=${i18n_typeScholar}}}`);

        if (C1Nom === 'tir' || C1Nom === 'savoir' || C1Nom === 'technique') { ODWarrior += bonusWarrior; }

        if (C2Nom === 'tir' || C2Nom === 'savoir' || C2Nom === 'technique') { ODWarrior += bonusWarrior; }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'tir' || C3Nom === 'savoir' || C3Nom === 'technique') { ODWarrior += bonusWarrior; }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'tir' || C4Nom === 'savoir' || C4Nom === 'technique') { ODWarrior += bonusWarrior; }
        }
      }

      if (typeScout !== 0) {
        exec.push(`{{special2=${i18n_typeScout}}}`);

        if (C1Nom === 'discretion' || C1Nom === 'dexterite' || C1Nom === 'perception') { ODWarrior += bonusWarrior; }

        if (C2Nom === 'discretion' || C2Nom === 'dexterite' || C2Nom === 'perception') { ODWarrior += bonusWarrior; }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'discretion' || C3Nom === 'dexterite' || C3Nom === 'perception') { ODWarrior += bonusWarrior; }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'discretion' || C4Nom === 'dexterite' || C4Nom === 'perception') { ODWarrior += bonusWarrior; }
        }
      }

      if (ODWarrior.length !== 0) { exec.push(`{{vODWarrior=${ODWarrior}}}`); }
      break;
  }

  result.exec = exec;
  result.cRoll = cRoll;
  result.diceDegats = diceDegats;
  result.bDegats = bDegats;
  result.diceViolence = diceViolence;
  result.ODBarbarian = ODBarbarian;
  result.ODRogue = ODRogue;
  result.ODShaman = ODShaman;
  result.ODWarrior = ODWarrior;
  result.autresEffets = autresEffets;
  result.isConditionnelA = isConditionnelA;

  return result;
}

function getMALBonus(value, armureL, isELumiere, isASLumiere, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom, aEffets = [], simpleRoll = false) {
  const result = {};
  const exec = [];
  const cRoll = [];
  const bDegats = [];

  let diceDegats = 0;
  let diceViolence = 0;

  const ODMALBarbarian = [];
  const ODMALRogue = [];
  const ODMALShaman = [];
  const bonusWarrior = 1;
  const autresEffets = [];

  let MALGoliath = 0;
  let MALGhost = '';

  let MALShaman = 0;
  let C5 = '';
  let C6 = '';
  let C5Nom = '';
  let C6Nom = '';

  let ODMALWarrior = 0;

  let isConditionnelA = false;

  switch (armureL) {
    case 'barbarian':
      MALGoliath = Number(value.MALBarbarianGoliath);

      if (MALGoliath !== 0) {
        exec.push(`{{MALGoliath=[[${MALGoliath}]]}}`);

        if (C1Nom === 'force' || C1Nom === 'endurance') { ODMALBarbarian.push(MALGoliath); }

        if (C2Nom === 'force' || C2Nom === 'endurance') { ODMALBarbarian.push(MALGoliath); }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'force' || C3Nom === 'endurance') { ODMALBarbarian.push(MALGoliath); }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'force' || C4Nom === 'endurance') { ODMALBarbarian.push(MALGoliath); }
        }

        if (ODMALBarbarian.length === 0) { exec.push('{{vODMALBarbarian=[[0]]}}'); } else { exec.push(`{{vODMALBarbarian=[[${ODMALBarbarian.join('+')}]]}}`); }

        diceDegats += MALGoliath;
        diceViolence += MALGoliath;

        exec.push(`{{vMALBarbarianD=+${MALGoliath}D6}}`);
        exec.push(`{{vMALBarbarianV=+${MALGoliath}D6}}`);

        if (MALGoliath >= 4 && !aEffets.includes(i18n_antiVehicule)) {
          autresEffets.push(i18n_antiVehicule);
        }
      }
      break;

    case 'bard':
      MALchangeling = +value.MALBardChangeling;

      if (MALchangeling !== 0) {
        exec.push(`{{MALspecial2=${i18n_changelingActive}}}`);
      }
      break;

    case 'rogue':
      MALGhost = value.MALRogueGhost;

      if (MALGhost !== '') {
        exec.push(`{{MALspecial2=${i18n_ghostActive}}}`);

        if (simpleRoll) {
          exec.push(`{{vODMALGhostA=${i18n_ghost}}} {{vODMALGhostAValue=3}}`);
          isConditionnelA = true;
        } else if (isELumiere === false && isASLumiere === false) {
          const totalMALGhost = vDiscretion + oDiscretion;

          exec.push(`{{vMALGhostA=${vDiscretion}D6+${oDiscretion}}}`);
          exec.push(`{{vMALGhostD=${totalMALGhost}}}`);
          isConditionnelA = true;
          cRoll.push(vDiscretion);
          ODMALRogue.push(oDiscretion);
          bDegats.push(totalMALGhost);
        }
      }
      break;

    case 'shaman':
      MALShaman = Number(value.MALShamanNbreTotem);
      C5 = value.MALCaracteristiqueTotem1;
      C6 = value.MALCaracteristiqueTotem2;

      C5Nom = C5.slice(2, -1);
      C6Nom = C6.slice(2, -1);

      if (MALShaman === 1 || MALShaman === 2) {
        if (C5 !== '0') {
          exec.push(`{{MALTotem1=${CaracNom[C5Nom]}}}`);
          cRoll.push(C5);
          ODMALShaman.push(`@{${ODNom[C5Nom]}}`);
        }
      }

      if (MALShaman === 2) {
        if (C6 !== '0') {
          exec.push(`{{MALTotem2=${CaracNom[C6Nom]}}}`);
          cRoll.push(C6);
          ODMALShaman.push(`@{${ODNom[C6Nom]}}`);
        }
      }

      if (MALShaman === 1 || MALShaman === 2) {
        exec.push('{{MALTotem=true}}');

        if (ODMALShaman.length === 0) { exec.push('{{vODMALShaman=[[0]]}}'); } else { exec.push(`{{vODMALShaman=[[${ODMALShaman.join('+')}]]}}`); }
      }

      break;

    case 'warrior':
      MALTypeSoldier = +value.MALWarriorSoldierA;
      MALTypeHunter = +value.MALWarriorHunterA;
      MALTypeHerald = +value.MALWarriorHeraldA;
      MALTypeScholar = +value.MALWarriorScholarA;
      MALTypeScout = +value.MALWarriorScoutA;

      if (MALTypeSoldier !== 0) {
        exec.push(`{{MALspecial2=${i18n_typeSoldier}}}`);
        exec.push('{{MALTypeWarrior=true}}');

        if (C1Nom === 'deplacement' || C1Nom === 'force' || C1Nom === 'endurance') { ODMALWarrior += bonusWarrior; }

        if (C2Nom === 'deplacement' || C2Nom === 'force' || C2Nom === 'endurance') { ODMALWarrior += bonusWarrior; }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'deplacement' || C3Nom === 'force' || C3Nom === 'endurance') { ODMALWarrior += bonusWarrior; }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'deplacement' || C4Nom === 'force' || C4Nom === 'endurance') { ODMALWarrior += bonusWarrior; }
        }
      }

      if (MALTypeHunter !== 0) {
        exec.push(`{{MALspecial2=${i18n_typeHunter}}}`);
        exec.push('{{MALTypeWarrior=true}}');

        if (C1Nom === 'hargne' || C1Nom === 'combat' || C1Nom === 'instinct') { ODMALWarrior += bonusWarrior; }

        if (C2Nom === 'hargne' || C2Nom === 'combat' || C2Nom === 'instinct') { ODMALWarrior += bonusWarrior; }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'hargne' || C3Nom === 'combat' || C3Nom === 'instinct') { ODMALWarrior += bonusWarrior; }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'hargne' || C4Nom === 'combat' || C4Nom === 'instinct') { ODMALWarrior += bonusWarrior; }
        }
      }

      if (MALTypeHerald !== 0) {
        exec.push(`{{MALspecial2=${i18n_typeHerald}}}`);
        exec.push('{{MALTypeWarrior=true}}');

        if (C1Nom === 'aura' || C1Nom === 'parole' || C1Nom === 'sf') { ODMALWarrior += bonusWarrior; }

        if (C2Nom === 'aura' || C2Nom === 'parole' || C2Nom === 'sf') { ODMALWarrior += bonusWarrior; }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'aura' || C3Nom === 'parole' || C3Nom === 'sf') { ODMALWarrior += bonusWarrior; }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'aura' || C4Nom === 'parole' || C4Nom === 'sf') { ODMALWarrior += bonusWarrior; }
        }
      }

      if (MALTypeScholar !== 0) {
        exec.push(`{{MALspecial2=${i18n_typeScholar}}}`);
        exec.push('{{MALTypeWarrior=true}}');

        if (C1Nom === 'tir' || C1Nom === 'savoir' || C1Nom === 'technique') { ODMALWarrior += bonusWarrior; }

        if (C2Nom === 'tir' || C2Nom === 'savoir' || C2Nom === 'technique') { ODMALWarrior += bonusWarrior; }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'tir' || C3Nom === 'savoir' || C3Nom === 'technique') { ODMALWarrior += bonusWarrior; }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'tir' || C4Nom === 'savoir' || C4Nom === 'technique') { ODMALWarrior += bonusWarrior; }
        }
      }

      if (MALTypeScout !== 0) {
        exec.push(`{{MALspecial2=${i18n_typeScout}}}`);
        exec.push('{{MALTypeWarrior=true}}');

        if (C1Nom === 'discretion' || C1Nom === 'dexterite' || C1Nom === 'perception') { ODMALWarrior += bonusWarrior; }

        if (C2Nom === 'discretion' || C2Nom === 'dexterite' || C2Nom === 'perception') { ODMALWarrior += bonusWarrior; }

        if (hasBonus === 1 || hasBonus === 2) {
          if (C3Nom === 'discretion' || C3Nom === 'dexterite' || C3Nom === 'perception') { ODMALWarrior += bonusWarrior; }
        }

        if (hasBonus === 2) {
          if (C4Nom === 'discretion' || C4Nom === 'dexterite' || C4Nom === 'perception') { ODMALWarrior += bonusWarrior; }
        }
      }

      if (ODMALWarrior.length !== 0) { exec.push(`{{vODMALWarrior=${ODMALWarrior}}}`); }
      break;
  }

  result.exec = exec;
  result.cRoll = cRoll;
  result.diceDegats = diceDegats;
  result.diceViolence = diceViolence;
  result.bDegats = bDegats;
  result.ODMALBarbarian = ODMALBarbarian;
  result.ODMALRogue = ODMALRogue;
  result.ODMALShaman = ODMALShaman;
  result.ODMALWarrior = ODMALWarrior;
  result.autresEffets = autresEffets;
  result.isConditionnelA = isConditionnelA;

  return result;
}

function getStyleContactMod(value, cPrecis, diceDegats, diceViolence, hasArmure, oCombat, isEAkimbo, isEAmbidextrie, isAAgressive, isAJumelle, isASoeur, isAProtectrice, isEDeuxMains, isAAllegee, isELourd) {
  const result = {};

  const exec = [];
  const cRoll = [];
  const autresAmeliorationsS = [];

  let dDegats = 0;
  let dViolence = 0;

  const style = value.styleCombat || 'standard';
  let bName = '';
  let modA = 0;

  switch (style) {
    case 'standard':
      exec.push(`{{style=${i18n_style} ${i18n_standard}}}`);

      if (isAAgressive) { autresAmeliorationsS.push(i18n_agressive); }
      break;

    case 'couvert':
      bName = 'atkCouvert';
      modA = value[bName];

      exec.push(`{{style=${i18n_style} ${i18n_couvert}}}`);
      exec.push(`{{vMStyleA=${modA}D}}`);
      cRoll.push(Number(modA));

      if (isAAgressive) { autresAmeliorationsS.push(i18n_agressive); }
      break;

    case 'agressif':
      bName = 'atkAgressif';
      modA = value[bName];

      exec.push(`{{style=${i18n_style} ${i18n_agressif}}}`);
      exec.push(`{{vMStyleA=${modA}D}}`);
      cRoll.push(Number(modA));

      if (isAAgressive) {
        exec.push('{{vAgressive=+1D6}}');
        dDegats += 1;
      }
      break;

    case 'akimbo':
      bName = 'atkAkimbo';
      modA = value[bName];

      exec.push(`{{style=${i18n_style} ${i18n_akimbo}}}`);

      if (hasArmure) {
        if (oCombat >= 3 || isEAkimbo || isAJumelle) {
          exec.push('{{vMStyleA=-1D}}');
          cRoll.push(-1);
        } else {
          exec.push(`{{vMStyleA=${modA}D}}`);
          cRoll.push(Number(modA));
        }
      } else if (isEAkimbo || isAJumelle) {
        exec.push('{{vMStyleA=-1D}}');
        cRoll.push(-1);
      } else {
        exec.push(`{{vMStyleA=${modA}D}}`);
        cRoll.push(Number(modA));
      }

      exec.push(`{{vMStyleD=+${diceDegats}D6}}`);
      dDegats += Number(diceDegats);

      exec.push(`{{vMStyleV=+${Math.ceil(Number(diceViolence) / 2)}D6}}`);
      dViolence += Math.ceil(Number(diceViolence) / 2);

      if (isAAgressive) { autresAmeliorationsS.push(i18n_agressive); }
      break;

    case 'ambidextre':
      bName = 'atkAmbidextre';
      modA = value[bName];

      exec.push(`{{style=${i18n_style} ${i18n_ambidextre}}}`);

      if (hasArmure) {
        if (oCombat >= 4 || isEAmbidextrie || isASoeur) {
          exec.push('{{vMStyleA=-1D}}');
          cRoll.push(-1);
        } else {
          exec.push(`{{vMStyleA=${modA}D}}`);
          cRoll.push(Number(modA));
        }
      } else if (isEAmbidextrie || isASoeur) {
        exec.push('{{vMStyleA=-1D}}');
        cRoll.push(-1);
      } else {
        exec.push(`{{vMStyleA=${modA}D}}`);
        cRoll.push(Number(modA));
      }

      if (isAAgressive) { autresAmeliorationsS.push(i18n_agressive); }
      break;

    case 'defensif':
      bName = 'atkDefensif';
      modA = value[bName];

      exec.push(`{{style=${i18n_style} ${i18n_defensif}}}`);

      if (isAProtectrice) {
        exec.push('{{vMStyleA=-1D}}');
        cRoll.push(-1);
      } else {
        exec.push(`{{vMStyleA=${modA}D}}`);
        cRoll.push(Number(modA));
      }

      if (isAAgressive) { autresAmeliorationsS.push(i18n_agressive); }
      break;

    case 'pilonnage':
      exec.push(`{{style=${i18n_style} ${i18n_pilonnage}}}`);

      if (isAAgressive) { autresAmeliorationsS.push(i18n_agressive); }
      break;

    case 'suppression':
      exec.push(`{{style=${i18n_style} ${i18n_suppression}}}`);

      if (isAAgressive) { autresAmeliorationsS.push(i18n_agressive); }
      break;

    case 'precis':
      exec.push(`{{style=${i18n_style} ${i18n_precis}}}`);

      if (isEDeuxMains && !isAAllegee) {
        if (cPrecis.nom !== '0') {
          exec.push(`{{cPrecis=${cPrecis.nom}}}`);

          const CPValue = Number(cPrecis.base);

          cRoll.push(CPValue);

          exec.push(`{{vMStyleA=${CPValue}D}}`);
        }
      }
      break;

    case 'puissant':
      exec.push(`{{style=${i18n_style} ${i18n_puissant}}}`);

      if (isELourd) {
        const type = value.stylePuissantType;
        const bonus = +value.stylePuissantBonus;
        const malus = 0 - bonus;

        exec.push(`{{vMStyleA=${malus}D}}`);
        cRoll.push(malus);

        if (type.includes('stylePuissantD')) {
          exec.push(`{{vMStyleD=+${bonus}D}}`);
          dDegats += bonus;
        }

        if (type.includes('stylePuissantV')) {
          exec.push(`{{vMStyleV=+${bonus}D}}`);
          dViolence += bonus;
        }
      }
      break;
  }

  result.exec = exec;
  result.cRoll = cRoll;
  result.autresAmeliorationsS = autresAmeliorationsS;
  result.diceDegats = dDegats;
  result.diceViolence = dViolence;

  return result;
}

function getStyleDistanceMod(value, diceDegats, diceViolence, pilonnage, pilonnageType, hasArmure, oTir, isEAkimbo, isEAmbidextrie, isDeuxMains, isLourd) {
  const result = {};

  const exec = [];
  const cRoll = [];

  let dDegats = 0;
  let dViolence = 0;

  const style = value.styleCombat;
  let bName = '';
  let modA = 0;

  switch (style) {
    case 'standard':
      exec.push(`{{style=${i18n_style} ${i18n_standard}}}`);
      break;

    case 'couvert':
      bName = 'atkCouvert';
      modA = value[bName];

      exec.push(`{{style=${i18n_style} ${i18n_couvert}}}`);
      exec.push(`{{vMStyleA=${modA}D}}`);
      cRoll.push(Number(modA));
      break;

    case 'agressif':
      bName = 'atkAgressif';
      modA = value[bName];

      exec.push(`{{style=${i18n_style} ${i18n_agressif}}}`);
      exec.push(`{{vMStyleA=${modA}D}}`);
      cRoll.push(Number(modA));
      break;

    case 'akimbo':
      bName = 'atkAkimbo';
      modA = value[bName];

      exec.push(`{{style=${i18n_style} ${i18n_akimbo}}}`);

      if (hasArmure) {
        if (oTir >= 3 || isEAkimbo) {
          exec.push('{{vMStyleA=-1D}}');
          cRoll.push(-1);
        } else {
          exec.push(`{{vMStyleA=${modA}D}}`);
          cRoll.push(Number(modA));
        }
      } else if (isEAkimbo) {
        exec.push('{{vMStyleA=-1D}}');
        cRoll.push(-1);
      } else {
        exec.push(`{{vMStyleA=${modA}D}}`);
        cRoll.push(Number(modA));
      }

      exec.push(`{{vMStyleD=+${diceDegats}D6}}`);
      dDegats += Number(diceDegats);

      exec.push(`{{vMStyleV=+${Math.ceil(Number(diceViolence) / 2)}D6}}`);
      dViolence += Math.ceil(Number(diceViolence) / 2);
      break;

    case 'ambidextre':
      bName = 'atkAmbidextre';
      modA = value[bName];

      exec.push(`{{style=${i18n_style} ${i18n_ambidextre}}}`);

      if (hasArmure) {
        if (oTir >= 4 || isEAmbidextrie) {
          exec.push('{{vMStyleA=-1D}}');
          cRoll.push(-1);
        } else {
          exec.push(`{{vMStyleA=${modA}D}}`);
          cRoll.push(Number(modA));
        }
      } else if (isEAmbidextrie) {
        exec.push('{{vMStyleA=-1D}}');
        cRoll.push(-1);
      } else {
        exec.push(`{{vMStyleA=${modA}D}}`);
        cRoll.push(Number(modA));
      }
      break;

    case 'defensif':
      bName = 'atkDefensif';
      modA = value[bName];

      exec.push(`{{style=${i18n_style} ${i18n_defensif}}}`);

      exec.push(`{{vMStyleA=${modA}D}}`);
      cRoll.push(Number(modA));
      break;

    case 'pilonnage':
      bName = 'atkPilonnage';
      modA = value[bName];

      exec.push(`{{style=${i18n_style} ${i18n_pilonnage}}}`);

      exec.push(`{{vMStyleA=${modA}D}}`);
      cRoll.push(Number(modA));

      if (isDeuxMains) {
        let bPilonnage = Number(pilonnage) - 1;

        if (pilonnageType === 'degats') {
          if (bPilonnage < 0) { bPilonnage = 0; }

          exec.push(`{{vMStyleD=+${bPilonnage}D6}}`);
          dDegats += Number(bPilonnage);
        }

        if (pilonnageType === 'violence') {
          if (bPilonnage < 0) { bPilonnage = 0; }

          exec.push(`{{vMStyleV=+${bPilonnage}D6}}`);
          dViolence += Number(bPilonnage);
        }
      }
      break;

    case 'suppression':
      exec.push(`{{style=${i18n_style} ${i18n_suppression}}}`);

      if (isLourd) {
        const suppressionD = Number(value.styleSuppressionD);
        const suppressionV = Number(value.styleSuppressionV);

        if (suppressionD !== 0) {
          dDegats -= suppressionD;
          exec.push(`{{vMStyleD=-${suppressionD}D6}}`);
        }

        if (suppressionV !== 0) {
          dViolence -= suppressionV;
          exec.push(`{{vMStyleV=-${suppressionV}D6}}`);
        }
      }
      break;

    case 'precis':
      exec.push(`{{style=${i18n_style} ${i18n_precis}}}`);
      break;

    case 'puissant':
      exec.push(`{{style=${i18n_style} ${i18n_puissant}}}`);
      break;
  }

  result.exec = exec;
  result.cRoll = cRoll;
  result.diceDegats = dDegats;
  result.diceViolence = dViolence;

  return result;
}

function updateRoll(roll, totalDegats, diceDegats, bonusDegats, totalViolence, diceViolence, bonusViolence, conditions) {
  const tSurprise = roll.results.attaqueSurpriseValue || {};
  const tDestructeur = roll.results.destructeurValue || {};
  const tFureur = roll.results.fureurValue || {};
  const tMeurtrier = roll.results.meurtrierValue || {};
  const tUltraviolence = roll.results.ultraviolenceValue || {};

  const tArmeAzurineValueD = roll.results.armeAzurineValueD || {};
  const tArmeAzurineValueV = roll.results.armeAzurineValueV || {};
  const tArmeRougeSangValueD = roll.results.armeRougeSangValueD || {};
  const tArmeRougeSangValueV = roll.results.armeRougeSangValueV || {};
  const tCheneSculpte = roll.results.cheneSculpteValue || {};
  const tGriffuresGraveesValueD = roll.results.griffuresGraveesValueD || {};
  const tGriffuresGraveesValueV = roll.results.griffuresGraveesValueV || {};
  const tMasqueBriseValueD = roll.results.masqueBriseValueD || {};
  const tMasqueBriseValueV = roll.results.masqueBriseValueV || {};
  const tRouagesCassesValueD = roll.results.rouagesCassesValueD || {};
  const tRouagesCassesValueV = roll.results.rouagesCassesValueV || {};

  const isTenebricide = conditions.isTenebricide || false;
  const isSurprise = conditions.isSurprise || false;
  const isDestructeur = conditions.isDestructeur || false;
  const isFureur = conditions.isFureur || false;
  const isMeurtrier = conditions.isMeurtrier || false;
  const isUltraviolence = conditions.isUltraviolence || false;

  const isArmeAzurine = conditions.isArmeAzurine || false;
  const isArmeRougeSang = conditions.isArmeRougeSang || false;
  const isCheneSculpte = conditions.isCheneSculpte || false;
  const isGriffureGravee = conditions.isGriffureGravee || false;
  const isMasqueBrise = conditions.isMasqueBrise || false;
  const isRouagesCasses = conditions.isRouagesCasses || false;

  let tDegats = totalDegats;
  let tViolence = totalViolence;

  let hDestructeur = 0;
  let hFureur = 0;
  let hMeurtrier = 0;
  let hSurprise = 0;
  let hUltraviolence = 0;

  let hArmeAzurineValueD = 0;
  let hArmeAzurineValueV = 0;
  let hArmeRougeSangValueD = 0;
  let hArmeRougeSangValueV = 0;
  let hCheneSculpte = 0;
  let hGriffuresGraveesValueD = 0;
  let hGriffuresGraveesValueV = 0;
  let hMasqueBriseValueD = 0;
  let hMasqueBriseValueV = 0;
  let hRouagesCassesValueD = 0;
  let hRouagesCassesValueV = 0;

  if (isSurprise) { hSurprise = tSurprise.result; }
  if (isDestructeur) { hDestructeur = tDestructeur.result; }
  if (isFureur) { hFureur = tFureur.result; }
  if (isMeurtrier) { hMeurtrier = tMeurtrier.result; }
  if (isUltraviolence) { hUltraviolence = tUltraviolence.result; }

  if (isArmeAzurine) {
    hArmeAzurineValueD = tArmeAzurineValueD.result;
    hArmeAzurineValueV = tArmeAzurineValueV.result;
  }
  if (isArmeRougeSang) {
    hArmeRougeSangValueD = tArmeRougeSangValueD.result;
    hArmeRougeSangValueV = tArmeRougeSangValueV.result;
  }
  if (isCheneSculpte) { hCheneSculpte = tCheneSculpte.result; }
  if (isGriffureGravee) {
    hGriffuresGraveesValueD = tGriffuresGraveesValueD.result;
    hGriffuresGraveesValueV = tGriffuresGraveesValueV.result;
  }
  if (isMasqueBrise) {
    hMasqueBriseValueD = tMasqueBriseValueD.result;
    hMasqueBriseValueV = tMasqueBriseValueV.result;
  }
  if (isRouagesCasses) {
    hRouagesCassesValueD = tRouagesCassesValueD.result;
    hRouagesCassesValueV = tRouagesCassesValueV.result;
  }

  let vTDegats = 0;
  let vTViolence = 0;
  let vTDestructeur = 0;
  let vTFureur = 0;
  let vTMeurtrier = 0;
  let vTSurprise = 0;
  let vTUltraviolence = 0;

  let vTCheneSculpte = 0;

  if (conditions.bourreau || conditions.equilibre) {
    tDegats = diceDegats.reduce((accumulateur, valeurCourante) => {
      let newV = +valeurCourante;
      if (newV <= 3) { newV = 4; }

      return accumulateur + newV;
    }, 0);
    if (bonusDegats.length !== 0) { tDegats += bonusDegats.reduce((accumulateur, valeurCourante) => accumulateur + +valeurCourante); }

    if (isDestructeur) {
      hDestructeur = tDestructeur.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isMeurtrier) {
      hMeurtrier = tMeurtrier.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isSurprise) {
      if (tSurprise.dice.length !== 0) {
        const normalRoll = tSurprise.dice.reduce((accumulateur, valeurCourante) => accumulateur + +valeurCourante);
        const bonusSurprise = +tSurprise.result - +normalRoll;

        hSurprise = tSurprise.dice.reduce((accumulateur, valeurCourante) => {
          let newV = +valeurCourante;
          if (newV <= 3) { newV = 4; }

          return accumulateur + newV;
        }, 0);

        hSurprise += bonusSurprise;
      }
    }

    if (isArmeAzurine) {
      hArmeAzurineValueD = tArmeAzurineValueD.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isArmeRougeSang) {
      hArmeRougeSangValueD = tArmeRougeSangValueD.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isCheneSculpte) {
      hCheneSculpte = tCheneSculpte.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isGriffureGravee) {
      hGriffuresGraveesValueD = tGriffuresGraveesValueD.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isMasqueBrise) {
      hMasqueBriseValueD = tMasqueBriseValueD.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isRouagesCasses) {
      hRouagesCassesValueD = tRouagesCassesValueD.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }
  }

  if (conditions.devaste || conditions.equilibre) {
    tViolence = diceViolence.reduce((accumulateur, valeurCourante) => {
      let newV = valeurCourante;
      if (newV <= 3) { newV = 4; }

      return accumulateur + newV;
    }, 0);

    if (bonusViolence.length !== 0) { tViolence += bonusViolence.reduce((accumulateur, valeurCourante) => accumulateur + +valeurCourante); }

    if (isFureur) {
      hFureur = tFureur.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isUltraviolence) {
      hUltraviolence = tUltraviolence.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isArmeAzurine) {
      hArmeAzurineValueV = tArmeAzurineValueV.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isArmeRougeSang) {
      hArmeRougeSangValueV = tArmeRougeSangValueV.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isGriffureGravee) {
      hGriffuresGraveesValueV = tGriffuresGraveesValueV.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isMasqueBrise) {
      hMasqueBriseValueV = tMasqueBriseValueV.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }

    if (isRouagesCasses) {
      hRouagesCassesValueV = tRouagesCassesValueV.dice.reduce((accumulateur, valeurCourante) => {
        let newV = +valeurCourante;
        if (newV <= 3) { newV = 4; }

        return accumulateur + newV;
      }, 0);
    }
  }

  if (isTenebricide) {
    let limiteD = Math.floor(+diceDegats.length / 2);
    let limiteV = Math.floor(+diceViolence.length / 2);

    if (limiteD < 1) { limiteD = 1; }
    if (limiteV < 1) { limiteV = 1; }

    vTDegats = diceDegats.reduce((accumulateur, valeurCourante, index) => {
      let result = +accumulateur;

      if (index < limiteD) {
        let newV = +valeurCourante;

        if (conditions.bourreau || conditions.equilibre) {
          if (newV <= 3) { newV = 4; }
        }

        result += newV;
      }

      return result;
    }, 0);

    if (bonusDegats.length !== 0) { vTDegats += bonusDegats.reduce((accumulateur, valeurCourante) => accumulateur + +valeurCourante); }

    vTViolence = diceViolence.reduce((accumulateur, valeurCourante, index) => {
      let result = +accumulateur;

      if (index < limiteV) {
        let newV = +valeurCourante;

        if (conditions.bourreau || conditions.equilibre) {
          if (newV <= 3) { newV = 4; }
        }

        result += newV;
      }

      return result;
    }, 0);

    if (bonusViolence.length !== 0) { vTViolence += bonusViolence.reduce((accumulateur, valeurCourante) => accumulateur + +valeurCourante); }

    if (isMeurtrier) {
      let diceMeurtrier = +tMeurtrier.dice[0];

      if (conditions.bourreau || conditions.equilibre) {
        if (diceMeurtrier <= 3) { diceMeurtrier = 4; }
      }

      vTMeurtrier = diceMeurtrier;
    }

    if (isDestructeur) {
      let diceDestructeur = +tDestructeur.dice[0];

      if (conditions.bourreau || conditions.equilibre) {
        if (diceDestructeur <= 3) { diceDestructeur = 4; }
      }

      vTDestructeur = diceDestructeur;
    }

    if (isCheneSculpte) {
      let diceCheneSculpte = +tCheneSculpte.dice[0];

      if (conditions.bourreau || conditions.equilibre) {
        if (diceCheneSculpte <= 3) { diceCheneSculpte = 4; }
      }

      vTCheneSculpte = diceCheneSculpte;
    }

    if (isFureur) {
      let diceFureur1 = +tFureur.dice[0];
      let diceFureur2 = +tFureur.dice[1];

      if (conditions.devaste || conditions.equilibre) {
        if (diceFureur1 <= 3) { diceFureur1 = 4; }
        if (diceFureur2 <= 3) { diceFureur2 = 4; }
      }

      vTFureur = diceFureur1 + diceFureur2;
    }

    if (isSurprise) {
      let bonusSurprise = +tSurprise.result;

      if (tSurprise.dice.length !== 0) {
        const dices = tSurprise.dice;
        const limiteS = Math.floor(+dices.length / 2);
        const normalRoll = dices.reduce((accumulateur, valeurCourante) => accumulateur + +valeurCourante);
        bonusSurprise -= +normalRoll;

        vTSurprise = dices.reduce((accumulateur, valeurCourante, index) => {
          let result = accumulateur;

          if (index < limiteS) {
            let newV = +valeurCourante;

            if (conditions.bourreau || conditions.equilibre) {
              if (newV <= 3) { newV = 4; }
            }

            result += newV;
          }

          return result;
        }, 0);
      }

      vTSurprise += +bonusSurprise;
    }

    if (isUltraviolence) {
      let diceUltraviolence = +tUltraviolence.dice[0];

      if (conditions.devaste || conditions.equilibre) {
        if (diceUltraviolence <= 3) { diceUltraviolence = 4; }
      }

      vTUltraviolence = diceUltraviolence;
    }
  }

  const computed = {
    degats: tDegats,
    violence: tViolence,
    tenebricideValueD: vTDegats,
    tenebricideValueV: vTViolence,
    tenebricideASValue: vTSurprise,
    destructeurValue: hDestructeur,
    fureurValue: hFureur,
    meurtrierValue: hMeurtrier,
    attaqueSurpriseValue: hSurprise,
    ultraviolenceValue: hUltraviolence,
    armeAzurineValueD: hArmeAzurineValueD,
    armeAzurineValueV: hArmeAzurineValueV,
    armeRougeSangValueD: hArmeRougeSangValueD,
    armeRougeSangValueV: hArmeRougeSangValueV,
    cheneSculpteValue: hCheneSculpte,
    griffuresGraveesValueD: hGriffuresGraveesValueD,
    griffuresGraveesValueV: hGriffuresGraveesValueV,
    masqueBriseValueD: hMasqueBriseValueD,
    masqueBriseValueV: hMasqueBriseValueV,
    rouagesCassesValueD: hRouagesCassesValueD,
    rouagesCassesValueV: hRouagesCassesValueV,
    tDestructeurValue: vTDestructeur,
    tFureurValue: vTFureur,
    tMeurtrierValue: vTMeurtrier,
    tUltraviolenceValue: vTUltraviolence,
    tCheneSculpteValue: vTCheneSculpte,
  };

  return computed;
}
