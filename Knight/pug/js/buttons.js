/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const buttontab = ['dossier', 'armure', 'combat', 'module', 'overdrive', 'ia', 'ia-incarnee', 'historique', 'art', 'heroisme', 'vehicule', 'mecha-armure', 'capacites', 'equipage'];

// MENU
buttontab.forEach((button) => {
  on(`clicked:${button}`, () => {
    setAttrs({
      tab: button,
    });
  });
});

// EQUIPEMENT PORTE
const buttonPorte = ['barbarian', 'bard', 'berserk', 'druid', 'monk', 'necromancer', 'paladin', 'priest', 'psion', 'ranger', 'rogue', 'shaman', 'sorcerer', 'warlock', 'warmaster', 'warrior', 'wizard', 'sans', 'guardian'];

buttonPorte.forEach((button) => {
  on(`clicked:${button}`, () => {
    setAttrs({
      armure: button,
    });
  });
});

// CHOIX ARMURE
on('clicked:choixArmure', () => {
  setAttrs({
    popup: 1,
  });
});

on('change:choixArmure', (event) => {
  const newValue = event.newValue;

  setAttrs({
    armure: 'sans',
  });

  if (newValue === 'sorcerer') {
    setAttrs({
      armure: 'sorcerer',
    });
  }

  if (newValue === 'necromancer') {
    setAttrs({
      armure: 'necromancer',
    });
  }
});

// BONUS GAIN ESPOIR
const buttonGainEspoir = ['appliquerGainEspoir_1'];

buttonGainEspoir.forEach((button) => {
  on(`clicked:${button}`, () => {
    const name = button.split('_')[0];
    let newValue = button.split('_')[1];

    getAttrs([name], (value) => {
      const active = value[name];

      if (active === newValue) { newValue = '0'; }

      const newAttr = {};
      newAttr[name] = newValue;

      setAttrs(newAttr);
    });
  });
});

// SELECTION ARMURE
on('clicked:selectionArmure', () => {
  setAttrs({
    popup: 0,
  });
});

// SELECTION META-ARMURES LEGENDES
on('change:armureLegende', () => {
  setAttrs({
    MALChoixCompanons: 'aucun',
  });
});

// CARACTERISTIQUES BONUS
const buttonCaracBonus = ['bonusCarac_1', 'bonusCarac_2'];

buttonCaracBonus.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs(['bonusCarac'], (value) => {
      const bonusCarac = parseInt(value.bonusCarac, 10) || 0;
      let newValue = +button.split('_')[1];

      if (bonusCarac === newValue) { newValue = 0; }

      setAttrs({
        bonusCarac: newValue,
      });
    });
  });
});

// CAPACITES ACTIVES META-ARMURES LEGENDES
const buttonCapaciteActive = ['capaciteUltimeType_1', 'capaciteUltimeType_2'];

buttonCapaciteActive.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs(['capaciteUltimeType'], (value) => {
      const capaciteActive = parseInt(value.capaciteUltimeType, 10) || 0;
      let newValue = button.split('_')[1];

      if (capaciteActive === newValue) { newValue = 0; }

      setAttrs({
        capaciteUltimeType: newValue,
      });
    });
  });
});

// CAPACITES BARD
const buttonBard = ['bardChangeling', 'MALBardChangeling'];

buttonBard.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs([button], (value) => {
      const active = value[button];
      let newValue = '{{modeChangeling=Activé}}';

      if (active === '{{modeChangeling=Activé}}') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES BERSERK
const buttonBerserk = ['berserkBlaze', 'berserkCandle', 'berserkBeacon', 'berserkTorch', 'berserkProjector', 'berserkLighthouse', 'berserkLantern', 'berserkIlluminationBeaconA', 'berserkIlluminationTorchA', 'berserkIlluminationProjectorA', 'berserkIlluminationLighthouseA', 'berserkIlluminationLanternA', 'berserkRageA'];

buttonBerserk.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs([button], (value) => {
      const active = value[button];
      let newValue = 'on';
      const newAttr = {};

      if (active === 'on') {
        newValue = '';

        if (button === 'berserkRageA') { newAttr.berserkNiveaux = 0; }
      }

      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

const buttonNiveauRage = ['berserkNiveaux_1', 'berserkNiveaux_2', 'berserkNiveaux_3'];

buttonNiveauRage.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs(['berserkNiveaux'], (value) => {
      const niveauRage = parseInt(value.berserkNiveaux, 10) || 0;
      let newValue = +button.split('_')[1];

      if (niveauRage === newValue) { newValue = 0; }

      setAttrs({
        berserkNiveaux: newValue,
      });
    });
  });
});

// CAPACITES DRUID + MALDruid

const buttonDruid = ['choixCompanons_aucun', 'choixCompanons_lion', 'choixCompanons_wolf', 'choixCompanons_crow',
  'MALChoixCompanons_aucun', 'MALChoixCompanons_lion', 'MALChoixCompanons_wolf', 'MALChoixCompanons_crow'];

const buttonCompanions = [
  'tabDruidLion_1', 'tabDruidLion_2', 'tabDruidLion_3',
  'tabDruidWolf_3',
  'tabDruidCrow_3',
  'MALTabDruidLion_1', 'MALTabDruidLion_2', 'MALTabDruidLion_3',
  'MALTabDruidWolf_3',
  'MALTabDruidCrow_3'];

const buttonTabCompanions = [
  'tabDCoups-3',
  'repeating_armeDruidLion:tab-1', 'repeating_armeDruidLion:tab-2', 'repeating_armeDruidLion:tab-3',
  'repeating_modulesDCLion:affichagedclion-1', 'repeating_modulesDCLion:slotsdclplus-1',
  'MALTabDCoups-3',
  'repeating_armeMALDruidLion:tab-1', 'repeating_armeMALDruidLion:tab-2', 'repeating_armeMALDruidLion:tab-3',
  'repeating_modulesMALDCLion:affichagemaldclion-1', 'repeating_modulesMALDCLion:slotsmaldclplus-1'];

buttonDruid.forEach((button) => {
  on(`clicked:${button}`, () => {
    const name = button.split('_')[0];
    const newValue = button.split('_')[1];

    const newAttr = {};
    newAttr[name] = newValue;

    setAttrs(newAttr);
  });
});

buttonCompanions.forEach((button) => {
  on(`clicked:${button}`, () => {
    const name = button.split('_')[0];
    let newValue = button.split('_')[1];

    getAttrs([name], (value) => {
      const active = value[name];

      if (active === newValue) { newValue = '0'; }

      const newAttr = {};
      newAttr[name] = newValue;

      setAttrs(newAttr);
    });
  });
});

buttonTabCompanions.forEach((button) => {
  on(`clicked:${button}`, (eventinfo) => {
    const source = eventinfo.sourceAttribute;
    let name = button.split('-')[0];
    let newValue = button.split('-')[1];

    if (source !== undefined) {
      if (source.includes('repeating')) {
        const length = source.split('-').length - 1;
        name = source.slice(0, -2);
        newValue = source.split('-')[length];
      }
    }

    getAttrs([name], (value) => {
      const active = value[name];

      if (active === newValue) { newValue = '0'; }

      const newAttr = {};
      newAttr[name] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES PALADIN + MALPaladin

const buttonPaladin = ['paladinCdFShrine', 'paladinWatchtower',
  'MALPaladinCdFShrine'];

buttonPaladin.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs([button], (value) => {
      const active = value[button];
      let newValue = 'Activé';

      if (active === 'Activé' || active === 'Activer') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES PSION

const buttonPsion = ['psionDiscord', 'MALPsionDiscord'];

buttonPsion.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs([button], (value) => {
      const active = value[button];
      let newValue = 'Activé';

      if (active === 'Activé' || active === 'Activer') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES RANGER
const buttonTabLongbow = ['armeDistOptionsRanger-1', 'armeDistOptionsRanger-2'];

buttonTabLongbow.forEach((button) => {
  on(`clicked:${button}`, (eventinfo) => {
    const source = eventinfo.sourceAttribute;
    let name = button.split('-')[0];
    let newValue = button.split('-')[1];

    if (source !== undefined) {
      if (source.includes('repeating')) {
        const length = source.split('-').length - 1;
        name = source.slice(0, -2);
        newValue = source.split('-')[length];
      }
    }

    getAttrs([name], (value) => {
      const active = value[name];

      if (active === newValue) { newValue = '0'; }

      const newAttr = {};
      newAttr[name] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES ROGUE

const buttonRogue = ['rogueGhost', 'MALRogueGhost'];

buttonRogue.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs([button], (value) => {
      const active = value[button];
      let newValue = '{{modeGhost=Activé}}';

      if (active === '{{modeGhost=Activé}}') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES SHAMAN

const buttonShaman = ['shamanAscension'];

buttonShaman.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs(['shamanAscension'], (value) => {
      const active = value[button];
      let newValue = '1';

      if (active === '1') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES SORCERER

const buttonSorcerer = ['sorcererMM250PG'];

buttonSorcerer.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs(['sorcererMM250PG'], (value) => {
      const active = value[button];
      let newValue = '1';

      if (active === '1') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES WARLOCK

const buttonWarlock = ['warlockForward', 'warlockRecord', 'warlockRewind', 'MALWarlockRecord', 'MALWarlockRewind'];

buttonWarlock.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs([button], (value) => {
      const active = value[button];
      let newValue = '1';

      if (active === '1') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES WARMASTER

const buttonWarmaster = ['warmasterImpActionC', 'warmasterImpEsquiveC', 'warmasterImpForceC', 'warmasterImpGuerreC', 'warmasterImpEnergieC', 'warmasterImpAPersonnel', 'warmasterImpAction', 'warmasterImpEsquive', 'warmasterImpForce', 'warmasterImpGuerre', 'warmasterImpEnergie',
  'MALWarmasterImpAction', 'MALWarmasterImpEsquive', 'MALWarmasterImpForce', 'MALWarmasterImpGuerre', 'MALWarmasterImpEnergie'];

buttonWarmaster.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs([button], (value) => {
      const active = value[button];
      let newValue = 'on';

      if (active === 'on') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES WARRIOR

const buttonWarrior = ['warriorSoldier', 'warriorHunter', 'warriorScholar', 'warriorHerald', 'warriorScout'];

buttonWarrior.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs([button], (value) => {
      const active = value[button];
      let newValue = 'on';

      if (active === 'on') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES WIZARD

const buttonWizard = ['wizardBorealis'];

buttonWizard.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs([button], (value) => {
      const active = value[button];
      let newValue = 'on';

      if (active === 'on') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// CAPACITES PNJ - CREATURES

const buttonCapacitesSpeciales = ['phase2'];

buttonCapacitesSpeciales.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs([button], (value) => {
      const active = value[button];
      let newValue = '1';

      if (active === '1') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// SUBTAB ONGLET COMBAT
const buttonSubTabCombat = [
  'tabDistance_1', 'tabMelee_2', 'tabAutre_3', 'tabEquipementDefensif_4', 'tabCapaciteArmure_5', 'tabArmesImprovisees_6',
  'poingMACOptions_4',
  'pSContactOptions_1', 'pSContactOptions_2', 'pSContactOptions_3', 'pSContactOptions_4',
  'mEContactOptions_1', 'mEContactOptions_2', 'mEContactOptions_3', 'mEContactOptions_4',
  'repeating_armeCaC:armecontactoptions-1', 'repeating_armeCaC:armecontactoptions-2', 'repeating_armeCaC:armecontactoptions-3', 'repeating_armeCaC:armecontactoptions-4',
  'pSDistOptions_1', 'pSDistOptions_3', 'pSDistOptions_4',
  'mEDistOptions_1', 'mEDistOptions_3', 'mEDistOptions_4',
  'repeating_armeDist:armedistoptions-1', 'repeating_armeDist:armedistoptions-3', 'repeating_armeDist:armedistoptions-4',
  'repeating_armeAutre:armeautreoptions-1', 'repeating_armeAutre:armeautreoptions-3', 'repeating_armeAutre:armeautreoptions-4',
  'grenadeOptions_1'];

buttonSubTabCombat.forEach((button) => {
  on(`clicked:${button}`, (eventInfo) => {
    const source = eventInfo.sourceAttribute;
    let name = button.split('_')[0];
    let newValue = button.split('_')[1];

    if (source !== undefined) {
      if (source.includes('repeating')) {
        const length = source.split('-').length - 1;
        name = source.slice(0, -2);
        newValue = source.split('-')[length];
      }
    }

    getAttrs([name], (value) => {
      const active = value[name];

      if (active === newValue) { newValue = '0'; }

      const newAttr = {};
      newAttr[name] = newValue;

      setAttrs(newAttr);
    });
  });
});

// BOUTON EQUIPE DES PROTECTIONS
const buttonEquipe = [
  'repeating_equipDefensif:porte-1'];

buttonEquipe.forEach((button) => {
  on(`clicked:${button}`, (eventInfo) => {
    const source = eventInfo.sourceAttribute;
    let name = button.split('_')[0];
    let newValue = button.split('_')[1];

    if (source !== undefined) {
      if (source.includes('repeating')) {
        const length = source.split('-').length - 1;
        name = source.slice(0, -2);
        newValue = source.split('-')[length];
      }
    }

    getAttrs([name], (value) => {
      const active = value[name];

      if (active === newValue) { newValue = '0'; }

      const newAttr = {};
      newAttr[name] = newValue;

      setAttrs(newAttr);
    });
  });
});

// BOUTON MODULES
const buttonModules = [
  'repeating_modules:affichage-1', 'repeating_modules:slotsplus-1'];

buttonModules.forEach((button) => {
  on(`clicked:${button}`, (eventinfo) => {
    const source = eventinfo.sourceAttribute;
    let name = button.split('-')[0];
    let newValue = button.split('-')[1];

    if (source !== undefined) {
      if (source.includes('repeating')) {
        const length = source.split('-').length - 1;
        name = source.slice(0, -2);
        newValue = source.split('-')[length];
      }
    }

    getAttrs([name], (value) => {
      const active = value[name];

      if (active === newValue) { newValue = '0'; }

      const newAttr = {};
      newAttr[name] = newValue;

      setAttrs(newAttr);
    });
  });
});

// BOUTON AFFICHER OD
const buttonAfficherOD = [
  'showDepl', 'showFor', 'showEnd', 'showHar', 'showCom', 'showIns', 'showTir', 'showSav', 'showTec', 'showAur', 'showPar', 'showSF', 'showSF', 'showDis', 'showDex', 'showPer'];

buttonAfficherOD.forEach((button) => {
  on(`clicked:${button}`, () => {
    getAttrs([button], (value) => {
      const active = value[button];
      let newValue = 'on';

      if (active === 'on') { newValue = ''; }

      const newAttr = {};
      newAttr[button] = newValue;

      setAttrs(newAttr);
    });
  });
});

// BOUTONS EXPAND HISTORIQUE
const buttonHistorique = [
  'repeating_avantages:expand-1',
  'repeating_inconvénient:expand-1',
  'repeating_blessuresGraves:expand-1',
  'repeating_traumas:expand-1',
];

buttonHistorique.forEach((button) => {
  on(`clicked:${button}`, (eventinfo) => {
    const source = eventinfo.sourceAttribute;
    let name = button.split('-')[0];
    let newValue = button.split('-')[1];

    if (source !== undefined) {
      if (source.includes('repeating')) {
        const length = source.split('-').length - 1;
        name = source.slice(0, -2);
        newValue = source.split('-')[length];
      }
    }

    getAttrs([name], (value) => {
      const active = value[name];

      if (active === newValue) { newValue = '0'; }

      const newAttr = {};
      newAttr[name] = newValue;

      setAttrs(newAttr);
    });
  });
});

// ONGLET VEHICULE
const buttonSubTabVehicule = [
  'repeating_armeDistVehicule:armedistoptions-1', 'repeating_armeDistVehicule:armedistoptions-3', 'repeating_armeDistVehicule:armedistoptions-4'];

buttonSubTabVehicule.forEach((button) => {
  on(`clicked:${button}`, (eventInfo) => {
    const source = eventInfo.sourceAttribute;
    let name = button.split('_')[0];
    let newValue = button.split('_')[1];

    if (source !== undefined) {
      if (source.includes('repeating')) {
        const length = source.split('-').length - 1;
        name = source.slice(0, -2);
        newValue = source.split('-')[length];
      }
    }

    getAttrs([name], (value) => {
      const active = value[name];

      if (active === newValue) { newValue = '0'; }

      const newAttr = {};
      newAttr[name] = newValue;

      setAttrs(newAttr);
    });
  });
});

// ONGLET MECHA-ARMURE
const buttonSubTabMechaArmure = [
  'mechaArmure_archangel', 'mechaArmure_nephilim', 'mechaArmure_demon',
  'tabMechaArmureSpecial_1', 'tabMechaArmureModules_1', 'tabMechaArmureArmes_1', 'tabMechaArmureArmesImprovisees_1'];

buttonSubTabMechaArmure.forEach((button) => {
  on(`clicked:${button}`, () => {
    const name = button.split('_')[0];
    let newValue = button.split('_')[1];

    getAttrs([name], (value) => {
      const active = value[name];

      if (active === newValue) { newValue = '0'; }

      const newAttr = {};
      newAttr[name] = newValue;

      setAttrs(newAttr);
    });
  });
});

const buttonSubTabMAConfiguration = [
  'mechaArmureArchangelConfiguration_1', 'mechaArmureArchangelConfiguration_2',
  'mechaArmureNephilimConfiguration_1', 'mechaArmureNephilimConfiguration_2',
  'mechaArmureDemonConfiguration_1', 'mechaArmureDemonConfiguration_2',
];

buttonSubTabMAConfiguration.forEach((button) => {
  on(`clicked:${button}`, () => {
    const name = button.split('_')[0];
    const newValue = button.split('_')[1];

    const newAttr = {};
    newAttr[name] = newValue;

    setAttrs(newAttr);
  });
});

const buttonSubTabMAActive = [
  'MAAEvacuationActive_1',
  'MAArchangelVolActive_1',
  'MANOGStationActive_1',
  'MANOGSTActive_1',
  'MANOGInvulnerabiliteActive_1',
  'MANephilimSautActive_1',
  'MANephilimEmblemActive_1',
  'MANephilimDronesAirainActive_1',
  'MADABAmritaActive_1',
  'MADDjinnNanobrumeActive_1',
  'MADACSoniqueActive_1',
  'MADemonSautActive_1',
];

buttonSubTabMAActive.forEach((button) => {
  on(`clicked:${button}`, () => {
    const name = button.split('_')[0];
    let newValue = button.split('_')[1];

    getAttrs([name], (value) => {
      const active = value[name];

      if (active === newValue) { newValue = '0'; }

      const newAttr = {};
      newAttr[name] = newValue;

      setAttrs(newAttr);
    });
  });
});
