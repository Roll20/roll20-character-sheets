
const calcActualRoll = ({ roll, keep, flat }) => {
  const rollOverflow = Math.max(roll - 10, 0);
  const totalKeep = keep + Math.floor(rollOverflow / 2);

  const overflow = Math.max(totalKeep - 10, 0) + (rollOverflow % 2);

  const actualFlat = flat + (2 * overflow);
  const actualKeep = Math.max(totalKeep, 10);
  const actualRoll = Math.max(roll, 10);

  return { actualFlat, actualKeep, actualRoll };
};
// Insight Calculation Worker

on("sheet:opened change:Insight", () => {
  getAttrs(["foo_insight"], (values) => {
    setAttrs({ foo_rank: Math.max(1, Math.round((values.foo_insight - 112) / 25)) });
  });
});

// This function does the actual calculation and attribute-setting after we have all the names
const calcFooInsight = () => {
  getSectionIDs('repeating_rehigh', (idArrayRehigh) => {
    getSectionIDs('repeating_rweap', (idArrayRweap) => {
      getSectionIDs('repeating_rcraft', (idArrayRcraft) => {
        getSectionIDs('repeating_rlow', (idArrayRlow) => {
          getSectionIDs('repeating_rartisan', (idArrayRartisan) => {
            getSectionIDs('repeating_rgames', (idArrayRgames) => {
              getSectionIDs('repeating_rlore', (idArrayRlore) => {
                const attrNamesRehigh = idArrayRehigh.map(id => `repeating_rehigh_${id}_rank_rehigh`);
                const attrNamesRweap = idArrayRweap.map(id => `repeating_rweap_${id}_rank_rweap`);
                const attrNamesRcraft = idArrayRcraft.map(id => `repeating_rcraft_${id}_rank_rcraft`);
                const attrNamesRlow = idArrayRlow.map(id => `repeating_rlow_${id}_rank_rlow`);
                const attrNamesRartisan = idArrayRartisan.map(id => `repeating_rartisan_${id}_rank_rartisan`);
                const attrNamesRgames = idArrayRgames.map(id => `repeating_rgames_${id}_rank_rgames`);
                const attrNamesRlore = idArrayRlore.map(id => `repeating_rlore_${id}_rank_rlore`);

                const repeatingNames = [
                  ...attrNamesRehigh,
                  ...attrNamesRweap,
                  ...attrNamesRcraft,
                  ...attrNamesRlow,
                  ...attrNamesRartisan,
                  ...attrNamesRgames,
                  ...attrNamesRlore
                ];

                const elements = ['foo_air', 'foo_earth', 'foo_fire', 'foo_water', 'foo_void'];
                const ranks = [
                  'rank_acting', 'rank_artisan', 'rank_calligraphy', 'rank_courtier',
                  'rank_divination', 'rank_etiquette', 'rank_games', 'rank_investigation',
                  'rank_lore', 'rank_Lore2', 'rank_Lore3', 'rank_Medicine', 'rank_Meditation',
                  'rank_Perform', 'rank_Sincerity', 'rank_Spellcraft', 'rank_Tea_Ceremony',
                  'rank_rhigh', 'rank_Athletics', 'rank_Battle', 'rank_Defense', 'rank_Horsemanship',
                  'rank_Hunting', 'rank_Iaijutsu', 'rank_Jiujutsu', 'rank_Chain_Weapons',
                  'rank_Heavy_Weapons', 'rank_Kenjutsu', 'rank_Knives', 'rank_Kyujutsu',
                  'rank_Ninjutsu', 'rank_Polearms', 'rank_Spears', 'rank_Staves', 'rank_teppudo',
                  'rank_WarFan', 'rank_AnimalHandling', 'rank_Commerce', 'rank_Craft',
                  'rank_Engineering', 'rank_Sailing', 'rank_Forgery', 'rank_Intimidation',
                  'rank_SleightofHand', 'rank_Stealth', 'rank_Temptation', 'BCourtier',
                  'BEtiquette', 'add_insight'
                ];

                getAttrs([...elements, ...ranks, ...repeatingNames], (values) => {
                  const sum = elements.reduce((s, k) => (s + (parseInt(values[k], 10) * 10 || 0)), 0) +
                    ranks.reduce((s, k) => (s + (parseInt(values[k], 10) || 0)), 0) +
                    repeatingNames.reduce((s, k) => (s + (parseFloat(values[k]) || 0)), 0);
                  setAttrs({
                    foo_insight: Math.round(sum)
                  });
                }); /** getAttrs **/
              }); /** rlore **/
            }); /** rgames **/
          }); /** rartisan **/
        }); /**rlow **/
      }); /** rcraft **/
    }); /** rweap **/
  }); /** rehigh **/
}; /** function **/

on("change:foo_air", calcFooInsight);
on("change:foo_earth", calcFooInsight);
on("change:foo_fire", calcFooInsight);
on("change:foo_water", calcFooInsight);
on("change:foo_void", calcFooInsight);
on("change:rank_acting", calcFooInsight);
on("change:rank_artisan", calcFooInsight);
on("change:rank_calligraphy", calcFooInsight);
on("change:rank_courtier", calcFooInsight);
on("change:rank_divination", calcFooInsight);
on("change:rank_etiquette", calcFooInsight);
on("change:rank_games", calcFooInsight);
on("change:rank_investigation", calcFooInsight);
on("change:rank_lore", calcFooInsight);
on("change:rank_Lore2", calcFooInsight);
on("change:rank_Lore3", calcFooInsight);
on("change:rank_Medicine", calcFooInsight);
on("change:rank_Meditation", calcFooInsight);
on("change:rank_Perform", calcFooInsight);
on("change:rank_Sincerity", calcFooInsight);
on("change:rank_Spellcraft", calcFooInsight);
on("change:rank_Tea_Ceremony", calcFooInsight);
on("change:rank_rhigh", calcFooInsight);
on("change:rank_Athletics", calcFooInsight);
on("change:rank_Battle", calcFooInsight);
on("change:rank_Defense", calcFooInsight);
on("change:rank_Horsemanship", calcFooInsight);
on("change:rank_Hunting", calcFooInsight);
on("change:rank_Iaijutsu", calcFooInsight);
on("change:rank_Jiujutsu", calcFooInsight);
on("change:rank_Chain_Weapons", calcFooInsight);
on("change:rank_Heavy_Weapons", calcFooInsight);
on("change:rank_Kenjutsu", calcFooInsight);
on("change:rank_Knives", calcFooInsight);
on("change:rank_Kyujutsu", calcFooInsight);
on("change:rank_Ninjutsu", calcFooInsight);
on("change:rank_Polearms", calcFooInsight);
on("change:rank_Spears", calcFooInsight);
on("change:rank_Staves", calcFooInsight);
on("change:rank_teppudo", calcFooInsight);
on("change:rank_WarFan", calcFooInsight);
on("change:rank_AnimalHandling", calcFooInsight);
on("change:rank_Commerce", calcFooInsight);
on("change:rank_Craft", calcFooInsight);
on("change:rank_Engineering", calcFooInsight);
on("change:rank_Sailing", calcFooInsight);
on("change:rank_Forgery", calcFooInsight);
on("change:rank_Intimidation", calcFooInsight);
on("change:rank_SleightofHand", calcFooInsight);
on("change:rank_Stealth", calcFooInsight);
on("change:rank_Temptation", calcFooInsight);
on("change:BCourtier", calcFooInsight);
on("change:BEtiquette", calcFooInsight);
on("change:add_insight", calcFooInsight);

on("change:repeating_rehigh:rank_rehigh remove:repeating_rehigh", calcFooInsight);
on("change:repeating_rweap:rank_rweap remove:repeating_rweap", calcFooInsight);
on("change:repeating_rcraft:rank_rcraft remove:repeating_rcraft", calcFooInsight);
on("change:repeating_rlow:rank_rlow remove:repeating_rlow", calcFooInsight);
on("change:repeating_rartisan:rank_rartisan remove:repeating_rartisan", calcFooInsight);
on("change:repeating_rgames:rank_rgames remove:repeating_rgames", calcFooInsight);
on("change:repeating_rlore:rank_rlore remove:repeating_rlore", calcFooInsight);

// Ring Calculation Workers

on("sheet:opened change:reflexes change:awareness", () => {
  getAttrs(["reflexes", "awareness"], (values) => {
    setAttrs({ foo_air: Math.min(values.reflexes, values.awareness) });
  });
});

on("sheet:opened change:stamina change:willpower", () => {
  getAttrs(["stamina", "willpower"], (values) => {
    setAttrs({ foo_earth: Math.min(values.stamina, values.willpower) });
  });
});

on("sheet:opened change:agility change:intelligence", () => {
  getAttrs(["agility", "intelligence"], (values) => {
    setAttrs({ foo_fire: Math.min(values.agility, values.intelligence) });
  });
});

on("sheet:opened change:strength change:perception", () => {
  getAttrs(["strength", "perception"], (values) => {
    setAttrs({ foo_water: Math.min(values.strength, values.perception) });
  });
});

// Max Wounds Worker

on("sheet:opened change:Out", () => {
  getAttrs(["foo_out"], (values) => {
    setAttrs({ Wounds_max: (values.foo_out) });
  });
});

// Wound Rank Workers

const calcWounds = () => {
  getAttrs([
    "foo_earth",
    "Bonus_wounds",
    "Lethality"
  ], (v) => {
    const earth = parseInt(v.foo_earth, 10) || 0;
    const lethality = parseInt(v.Lethality, 10) || 0;
    const bonusWounds = parseInt(v.Bonus_wounds, 10) || 0;

    const woundsPerRk = (earth * lethality) + bonusWounds;

    const foo_healthy = (earth * 5) + bonusWounds;

    const foo_nicked = foo_healthy + woundsPerRk;
    const foo_grazed = foo_nicked + woundsPerRk;
    const foo_hurt = foo_grazed + woundsPerRk;
    const foo_injured = foo_hurt + woundsPerRk;
    const foo_crippled = foo_injured + woundsPerRk;
    const foo_down = foo_crippled + woundsPerRk;
    const foo_out = foo_down + woundsPerRk;

    setAttrs({ foo_healthy, foo_nicked, foo_grazed, foo_hurt, foo_injured, foo_crippled, foo_down, foo_out });
  });
}

on("sheet:opened change:foo_earth change:Lethality change:Bonus_wounds", calcWounds);

// Spell Ring Selection Worker

const updateSpellAffinity = (idArray) => {

  const repAttrs = idArray.map(id => `repeating_spells_${id}_spell_ring`);

  getAttrs([
    'foo_air',
    'foo_earth',
    'foo_fire',
    'foo_water',
    'foo_void',
    'air_affinity',
    'earth_affinity',
    'fire_affinity',
    'water_affinity',
    'void_affinity',
    ...repAttrs
  ], (values) => {

    const attrs = idArray.reduce((acc, rowId) => {
      let spellAffinity = null;

      switch (values[`repeating_spells_${rowId}_spell_ring`]) {
        case '@{foo_air}':
          spellAffinity = values.air_affinity;
          break;
        case '@{foo_earth}':
          spellAffinity = values.earth_affinity;
          break;
        case '@{foo_fire}':
          spellAffinity = values.fire_affinity;
          break;
        case '@{foo_water}':
          spellAffinity = values.water_affinity;
          break;
        case '@{foo_void}':
          spellAffinity = values.void_affinity;
          break;
        default:
          spellAffinity = values.air_affinity;
      }

      acc[`repeating_spells_${rowId}_spell_affinity`] = spellAffinity;

      return acc;
    }, {});

    setAttrs(attrs);
  });
};

const updateAllSpellAffinity = () => {
  getSectionIDs('repeating_spells', updateSpellAffinity);
}

on('change:foo_air', updateAllSpellAffinity);
on('change:foo_earth', updateAllSpellAffinity);
on('change:foo_fire', updateAllSpellAffinity);
on('change:foo_water', updateAllSpellAffinity);
on('change:foo_void', updateAllSpellAffinity);
on('change:air_affinity', updateAllSpellAffinity);
on('change:earth_affinity', updateAllSpellAffinity);
on('change:fire_affinity', updateAllSpellAffinity);
on('change:water_affinity', updateAllSpellAffinity);
on('change:void_affinity', updateAllSpellAffinity);

on('change:repeating_spells:spell_ring', (eventInfo) => {
  const idArray = [eventInfo.sourceAttribute.split('_')[2]];
  calcSpellAffinity(idArray);
});

// Melee weapons workers
const updateMeleeWpnAtk = (rowId) => {
  getAttrs([
    `repeating_meleeweapons_${rowId}_remphasis`,
    `repeating_meleeweapons_${rowId}_rnineagain`,
    `repeating_meleeweapons_${rowId}_rskill`,
    `repeating_meleeweapons_${rowId}_ratkmodflat`,
    `repeating_meleeweapons_${rowId}_ratkmodkeep`,
    `repeating_meleeweapons_${rowId}_ratkmodroll`,
    'Agility',
    'rank_Jiujutsu',
    'rank_Chain_Weapons',
    'rank_Heavy_Weapons',
    'rank_Kenjutsu',
    'rank_Knives',
    'rank_Ninjutsu',
    'rank_Polearms',
    'rank_Spears',
    'rank_Staves',
    'rank_WarFan',
    'shugenja_rank'
  ], (v) => {

    const emphasis = v[`repeating_meleeweapons_${rowId}_remphasis`] || "false";
    const nineagain = v[`repeating_meleeweapons_${rowId}_rnineagain`] || "false";

    const skill = v[`repeating_meleeweapons_${rowId}_rskill`];

    const flat = parseInt(v[`repeating_meleeweapons_${rowId}_ratkmodflat`], 10) || 0;
    const keepMod = parseInt(v[`repeating_meleeweapons_${rowId}_ratkmodkeep`], 10) || 0;
    const rollMod = parseInt(v[`repeating_meleeweapons_${rowId}_ratkmodroll`], 10) || 0;

    const skillRk = parseInt(v[skill], 10) || 0;
    const traitRk = parseInt(v.Agility, 10) || 0;

    const keep = traitRk + keepMod;
    const roll = skillRk + traitRk + rollMod;

    const { actualFlat, actualKeep, actualRoll } = calcActualRoll({ flat, keep, roll });

    const attrs = {};

    attrs[`repeating_meleeweapons_${rowId}_ratkflat`] = actualFlat || "";
    attrs[`repeating_meleeweapons_${rowId}_ratkkeep`] = actualKeep;
    attrs[`repeating_meleeweapons_${rowId}_ratkroll`] = actualRoll;
    attrs[`repeating_meleeweapons_${rowId}_ratkreroll`] = (emphasis === "true") ? "r1" : "";
    attrs[`repeating_meleeweapons_${rowId}_rexpolode`] = (nineagain === "true") ? "!!>9" : "!!";

    setAttrs(attrs);

  });
};

const updateMeleeWpnDmg = (rowId) => {
  getAttrs([
    `repeating_meleeweapons_${rowId}_rdmgbaseroll`,
    `repeating_meleeweapons_${rowId}_rdmgmodroll`,
    `repeating_meleeweapons_${rowId}_rdmgbasekeep`,
    `repeating_meleeweapons_${rowId}_rdmgmodkeep`,
    `repeating_meleeweapons_${rowId}_rdmgmodflat`,
    `repeating_meleeweapons_${rowId}_rdmgbonusflat`,
    'Strength'
  ], (v) => {
    const strength = parseInt(v.Strength, 10) || 0;

    const flat = parseInt(v[`repeating_meleeweapons_${rowId}_rdmgmodflat`], 10) || 0;
    const keepBase = parseInt(v[`repeating_meleeweapons_${rowId}_rdmgbasekeep`], 10) || 0;
    const keepMod = parseInt(v[`repeating_meleeweapons_${rowId}_rdmgmodkeep`], 10) || 0;
    const rollBase = parseInt(v[`repeating_meleeweapons_${rowId}_rdmgbaseroll`], 10) || 0;
    const rollMod = parseInt(v[`repeating_meleeweapons_${rowId}_rdmgmodroll`], 10) || 0;

    const keep = keepBase + keepMod;
    const roll = strength + rollBase + rollMod;

    const { actualFlat, actualKeep, actualRoll } = calcActualRoll({ flat, keep, roll });

    const attrs = {};
    attrs[`repeating_meleeweapons_${rowId}_rdmgflat`] = actualFlat || "";
    attrs[`repeating_meleeweapons_${rowId}_rdmgkeep`] = actualKeep;
    attrs[`repeating_meleeweapons_${rowId}_rdmgroll`] = actualRoll;

    setAttrs(attrs);
  });
};

const updateMeleeWpnAtkFromSrc = (eventInfo) => {
  const rowId = eventInfo.sourceAttribute.split('_')[2];

  updateMeleeWpnAtk(rowId);
};

const updateMeleeWpnDmgFromSrc = (eventInfo) => {
  const rowId = eventInfo.sourceAttribute.split('_')[2];

  updateMeleeWpnDmg(rowId);
};


const updateAllMeleeWpnAtk = () => {
  getSectionIDs("meleeweapons", (rowIds) => {
    rowIds.forEach(updateMeleeWpnAtk);
  });
}

const updateAllMeleeWpnDmg = () => {
  getSectionIDs("meleeweapons", (rowIds) => {

    rowIds.forEach(updateMeleeWpnDmg);
  });
}

on('change:repeating_meleeweapons:remphasis', updateMeleeWpnAtkFromSrc);
on('change:repeating_meleeweapons:nineagain', updateMeleeWpnAtkFromSrc);
on('change:repeating_meleeweapons:rskill', updateMeleeWpnAtkFromSrc);
on('change:repeating_meleeweapons:ratkmodflat', updateMeleeWpnAtkFromSrc);
on('change:repeating_meleeweapons:ratkmodkeep', updateMeleeWpnAtkFromSrc);
on('change:repeating_meleeweapons:ratkmodroll', updateMeleeWpnAtkFromSrc);

on('change:Agility', updateAllMeleeWpnAtk);
on('change:rank_Jiujutsu', updateAllMeleeWpnAtk);
on('change:rank_Chain_Weapons', updateAllMeleeWpnAtk);
on('change:rank_Heavy_Weapons', updateAllMeleeWpnAtk);
on('change:rank_Kenjutsu', updateAllMeleeWpnAtk);
on('change:rank_Knives', updateAllMeleeWpnAtk);
on('change:rank_Ninjutsu', updateAllMeleeWpnAtk);
on('change:rank_Polearms', updateAllMeleeWpnAtk);
on('change:rank_Spears', updateAllMeleeWpnAtk);
on('change:rank_Staves', updateAllMeleeWpnAtk);
on('change:rank_WarFan', updateAllMeleeWpnAtk);
on('change:shugenja_rank', updateAllMeleeWpnAtk);

on('change:repeating_meleeweapons:rdmgbasekeep', updateMeleeWpnDmgFromSrc);
on('change:repeating_meleeweapons:rdmgbaseroll', updateMeleeWpnDmgFromSrc);
on('change:repeating_meleeweapons:rdmgmodflat', updateMeleeWpnDmgFromSrc);
on('change:repeating_meleeweapons:rdmgmodkeep', updateMeleeWpnDmgFromSrc);
on('change:repeating_meleeweapons:rdmgmodroll', updateMeleeWpnDmgFromSrc);

on('change:Strength', updateAllMeleeWpnDmg);

// Ranged weapons workers
const updateRangedWpnAtk = (rowId) => {
  getAttrs([
    `repeating_rangedweapons_${rowId}_remphasis`,
    `repeating_rangedweapons_${rowId}_rskill`,
    `repeating_rangedweapons_${rowId}_rtrait`,
    `repeating_rangedweapons_${rowId}_ratkmodflat`,
    `repeating_rangedweapons_${rowId}_ratkmodkeep`,
    `repeating_rangedweapons_${rowId}_ratkmodroll`,
    'Agility',
    'Intelligence',
    'Perception',
    'Reflexes',
    'rank_Athletics',
    'rank_Kyujutsu',
    'rank_teppudo'
  ], (v) => {

    const emphasis = v[`repeating_rangedweapons_${rowId}_remphasis`] || "false";
    const skill = v[`repeating_rangedweapons_${rowId}_rskill`];
    const trait = v[`repeating_rangedweapons_${rowId}_rtrait`];

    const flat = parseInt(v[`repeating_rangedweapons_${rowId}_ratkmodflat`], 10) || 0;
    const keepMod = parseInt(v[`repeating_rangedweapons_${rowId}_ratkmodkeep`], 10) || 0;
    const rollMod = parseInt(v[`repeating_rangedweapons_${rowId}_ratkmodroll`], 10) || 0;

    const skillRk = parseInt(v[skill], 10) || 0;
    const traitRk = parseInt(v[trait], 10) || 0;

    const keep = traitRk + keepMod;
    const roll = skillRk + traitRk + rollMod;

    const { actualFlat, actualKeep, actualRoll } = calcActualRoll({ flat, keep, roll });

    const attrs = {};

    attrs[`repeating_rangedweapons_${rowId}_ratkflat`] = actualFlat || "";
    attrs[`repeating_rangedweapons_${rowId}_ratkkeep`] = actualKeep;
    attrs[`repeating_rangedweapons_${rowId}_ratkroll`] = actualRoll;
    attrs[`repeating_rangedweapons_${rowId}_ratkreroll`] = (emphasis === "true") ? "r1" : "";

    setAttrs(attrs);

  });
};

const updateRangedWpnDmgFromSrc = () => {
  getAttrs([
    'repeating_rangedweapons_rstrength',
    'repeating_rangedweapons_rdmgbaseroll',
    'repeating_rangedweapons_rdmgmodroll',
    'repeating_rangedweapons_rdmgbasekeep',
    'repeating_rangedweapons_rdmgmodkeep',
    'repeating_rangedweapons_rdmgmodflat',
  ], (v) => {
    const strength = parseInt(v.repeating_rangedweapons_rstrength, 10) || 0;

    const flat = parseInt(v.repeating_rangedweapons_rdmgmodflat, 10) || 0;
    const keepBase = parseInt(v.repeating_rangedweapons_rdmgbasekeep, 10) || 0;
    const keepMod = parseInt(v.repeating_rangedweapons_rdmgmodkeep, 10) || 0;
    const rollBase = parseInt(v.repeating_rangedweapons_rdmgbaseroll, 10) || 0;
    const rollMod = parseInt(v.repeating_rangedweapons_rdmgmodroll, 10) || 0;

    const keep = keepBase + keepMod;
    const roll = strength + rollBase + rollMod;

    const { actualFlat, actualKeep, actualRoll } = calcActualRoll({ flat, keep, roll });

    const repeating_rangedweapons_rdmgflat = actualFlat || "";
    const repeating_rangedweapons_rdmgkeep = actualKeep;
    const repeating_rangedweapons_rdmgroll = actualRoll;

    setAttrs({
      repeating_rangedweapons_rdmgflat,
      repeating_rangedweapons_rdmgkeep,
      repeating_rangedweapons_rdmgroll
    });
  });
}

const updateRangedWpnAtkFromSrc = (eventInfo) => {
  const rowId = eventInfo.sourceAttribute.split('_')[2];
  updateRangedWpnAtk(rowId);
}

on("change:Agility change:Intelligence change:Perception change:Reflexes", () => {
  getSectionIDs("rangedweapons", (rowIds) => {
    rowIds.forEach(updateRangedWpnAtk);
  });
});

on("change:rank_Athletics change:rank_Kyujutsu change:rank_teppudo", () => {
  getSectionIDs("rangedweapons", (rowIds) => {
    rowIds.forEach(updateRangedWpnAtk);
  });
});

on("change:repeating_rangedweapons:remphasis", updateRangedWpnAtkFromSrc);
on("change:repeating_rangedweapons:rskill", updateRangedWpnAtkFromSrc);
on("change:repeating_rangedweapons:rtrait", updateRangedWpnAtkFromSrc);
on("change:repeating_rangedweapons:ratkbonusflat", updateRangedWpnAtkFromSrc);
on("change:repeating_rangedweapons:ratkmodflat", updateRangedWpnAtkFromSrc);
on("change:repeating_rangedweapons:ratkbonuskeep", updateRangedWpnAtkFromSrc);
on("change:repeating_rangedweapons:ratkmodkeep", updateRangedWpnAtkFromSrc);
on("change:repeating_rangedweapons:ratkbonusroll", updateRangedWpnAtkFromSrc);
on("change:repeating_rangedweapons:ratkmodroll", updateRangedWpnAtkFromSrc);

on("change:repeating_rangedweapons:rstrength", updateRangedWpnDmgFromSrc);
on("change:repeating_rangedweapons:rdmgbaseroll", updateRangedWpnDmgFromSrc);
on("change:repeating_rangedweapons:rdmgmodroll", updateRangedWpnDmgFromSrc);
on("change:repeating_rangedweapons:rdmgbonusroll", updateRangedWpnDmgFromSrc);
on("change:repeating_rangedweapons:rdmgbasekeep", updateRangedWpnDmgFromSrc);
on("change:repeating_rangedweapons:rdmgmodkeep", updateRangedWpnDmgFromSrc);
on("change:repeating_rangedweapons:rdmgbonuskeep", updateRangedWpnDmgFromSrc);
on("change:repeating_rangedweapons:rdmgmodflat", updateRangedWpnDmgFromSrc);
on("change:repeating_rangedweapons:rdmgbonusflat", updateRangedWpnDmgFromSrc);

// Iai sheet workers

const updateIaiAssessment = () => {
  getAttrs([
    'iai_assessment_emphasis',
    'iai_assessment_nineagain',
    'iai_assessment_modflat',
    'iai_assessment_modkeep',
    'iai_assessment_modroll',
    'Awareness',
    'rank_Iaijutsu'
  ], (v) => {

    const emphasis = v.iai_assessment_emphasis || "false";
    const nineagain = v.iai_assessment_nineagain || "false";

    const flat = parseInt(v.iai_assessment_modflat, 10) || 0;
    const keepMod = parseInt(v.iai_assessment_modkeep, 10) || 0;
    const rollMod = parseInt(v.iai_assessment_modroll, 10) || 0;

    const skillRk = parseInt(v.rank_Iaijutsu, 10) || 0;
    const traitRk = parseInt(v.Awareness, 10) || 0;

    const keep = traitRk + keepMod;
    const roll = skillRk + traitRk + rollMod;

    const { actualFlat, actualKeep, actualRoll } = calcActualRoll({ flat, keep, roll });

    const iai_assessment_flat = actualFlat;
    const iai_assessment_keep = actualKeep;
    const iai_assessment_roll = actualRoll;
    const iai_assessment_reroll = (emphasis === "true") ? "r1" : "";
    const iai_assessment_explode = (nineagain === "true") ? "!!>9" : "!!";

    setAttrs({ iai_assessment_flat, iai_assessment_keep, iai_assessment_roll, iai_assessment_reroll, iai_assessment_explode });

  });
};

on('change:iai_assessment_emphasis', updateIaiAssessment);
on('change:iai_assessment_nineagain', updateIaiAssessment);
on('change:iai_assessment_modflat', updateIaiAssessment);
on('change:iai_assessment_modkeep', updateIaiAssessment);
on('change:iai_assessment_modroll', updateIaiAssessment);
on('change:Awareness', updateIaiAssessment);
on('change:rank_Iaijutsu', updateIaiAssessment);

const updateIaiFocus = () => {
  getAttrs([
    'iai_focus_emphasis',
    'iai_focus_nineagain',
    'iai_focus_modflat',
    'iai_focus_modkeep',
    'iai_focus_modroll',
    'Void',
    'rank_Iaijutsu',
  ], (v) => {

    const emphasis = v.iai_focus_emphasis || "false";
    const nineagain = v.iai_focus_nineagain || "false";

    const flat = parseInt(v.iai_focus_modflat, 10) || 0;
    const keepMod = parseInt(v.iai_focus_modkeep, 10) || 0;
    const rollMod = parseInt(v.iai_focus_modroll, 10) || 0;

    const skillRk = parseInt(v.rank_Iaijutsu, 10) || 0;
    const traitRk = parseInt(v.Void, 10) || 0;

    const keep = traitRk + keepMod;
    const roll = skillRk + traitRk + rollMod;

    const { actualFlat, actualKeep, actualRoll } = calcActualRoll({ flat, keep, roll });

    const iai_focus_flat = actualFlat;
    const iai_focus_keep = actualKeep;
    const iai_focus_roll = actualRoll;
    const iai_focus_reroll = (emphasis === "true") ? "r1" : "";
    const iai_focus_explode = (nineagain === "true") ? "!!>9" : "!!";

    setAttrs({
      iai_focus_flat,
      iai_focus_keep,
      iai_focus_roll,
      iai_focus_reroll,
      iai_focus_explode
    });

  });
};

on('change:iai_focus_emphasis', updateIaiFocus);
on('change:iai_focus_nineagain', updateIaiFocus);
on('change:iai_focus_modflat', updateIaiFocus);
on('change:iai_focus_modkeep', updateIaiFocus);
on('change:iai_focus_modroll', updateIaiFocus);
on('change:Void', updateIaiAssessment);
on('change:rank_Iaijutsu', updateIaiFocus);

const updateIaiStrike = () => {
  getAttrs([
    'iai_strike_emphasis',
    'iai_strike_nineagain',
    'iai_strike_modflat',
    'iai_strike_modkeep',
    'iai_strike_modroll',
    'Reflexes',
    'rank_Iaijutsu',
  ], (v) => {

    const emphasis = v.iai_strike_emphasis || "false";
    const nineagain = v.iai_strike_nineagain || "false";

    const flat = parseInt(v.iai_strike_modflat, 10) || 0;
    const keepMod = parseInt(v.iai_strike_modkeep, 10) || 0;
    const rollMod = parseInt(v.iai_strike_modroll, 10) || 0;

    const skillRk = parseInt(v.rank_Iaijutsu, 10) || 0;
    const traitRk = parseInt(v.Reflexes, 10) || 0;

    const keep = traitRk + keepMod;
    const roll = skillRk + traitRk + rollMod;

    const { actualFlat, actualKeep, actualRoll } = calcActualRoll({ flat, keep, roll });

    const iai_strike_flat = actualFlat;
    const iai_strike_keep = actualKeep;
    const iai_strike_roll = actualRoll;
    const iai_strike_reroll = (emphasis === "true") ? "r1" : "";
    const iai_strike_explode = (nineagain === "true") ? "!!>9" : "!!";

    setAttrs({
      iai_strike_flat,
      iai_strike_keep,
      iai_strike_roll,
      iai_strike_reroll,
      iai_strike_explode
    });

  });
};

on('change:iai_strike_emphasis', updateIaiStrike);
on('change:iai_strike_nineagain', updateIaiStrike);
on('change:iai_strike_modflat', updateIaiStrike);
on('change:iai_strike_modkeep', updateIaiStrike);
on('change:iai_strike_modroll', updateIaiStrike);
on('change:Reflexes', updateIaiStrike);
on('change:rank_Iaijutsu', updateIaiStrike);

/***
  Armor TN worker
***/

const calcArmorTn = () => {
  getAttrs([
    'Reflexes',
    'armor_bonus',
    'additional_bonus',
    'armortn_bonus'
  ], (v) => {
    const reflexes = parseInt(v.Reflexes, 10) || 0;
    const bonusFromArmor = parseInt(v.armor_bonus, 10) || 0;
    const armorTnMod = parseInt(v.additional_bonus, 10) || 0;
    const armorTnBon = parseInt(v.armortn_bonus, 10) || 0;

    const baseTn = 5 + (reflexes * 5);

    const base_tn = baseTn;

    const current_tn = baseTn + bonusFromArmor + armorTnMod + armorTnBon;

    setAttrs({ base_tn, current_tn });
  });
};

on('change:Reflexes', calcArmorTn);
on('change:armor_bonus', calcArmorTn);
on('change:additional_bonus', calcArmorTn);
on('change:armortn_bonus', calcArmorTn);

// Sheet Conversion Worker.

const convertOldBow = (row) => {

  getAttrs([
    `bow${row}`,
    `bow${row}_rangedWeaponSkill`,
    `bow${row}_attribute`,
    `bow${row}_strength`,
    `bow${row}_ranged_rollbonus`,
    `bow${row}_ranged_keepbonus`,
    `skill_bonus_bow${row}`,
    `Bow${row}_arrow_roll`,
    `Bow${row}_arrow_keep`,
    `damage_bonus_arrow${row}`,
    `NotesBow${row}`
  ], (v) => {

    const rowID = generateRowID();

    const attrs = {};

    attrs[`repeating_meleeweapons_${rowID}_rname`] = v[`Bow${row}`];
    attrs[`repeating_meleeweapons_${rowID}_rskill`] = v[`Bow${row}_ranged_WeaponSkill`];
    attrs[`repeating_meleeweapons_${rowID}_rtrait`] = v[`Bow${row}_attribute`];
    attrs[`repeating_meleeweapons_${rowID}_ratkmodroll`] = v[`Bow${row}_ranged_roll_bonus`];
    attrs[`repeating_meleeweapons_${rowID}_ratkmodkeep`] = v[`Bow${row}_ranged_roll_keep`];
    attrs[`repeating_meleeweapons_${rowID}_ratkmodflat`] = v[`skill_bonus_bow${row}`];
    attrs[`repeating_meleeweapons_${rowID}_rstrength`] = v[`bow${row}_strength`];
    attrs[`repeating_meleeweapons_${rowID}_rdmgbaseroll`] = v[`Bow${row}arrow_roll`];
    attrs[`repeating_meleeweapons_${rowID}_rdmgbasekeep`] = v[`Bow${row}arrow_keep`];
    attrs[`repeating_meleeweapons_${rowID}_rdmgmodflat`] = v[`damage_bonus_arrow${row}`]
    attrs[`repeating_meleeweapons_${rowID}_rdescription`] = v[`NotesBow${row}`]

    setAttrs(attrs)
  });
}
const convertOldWpn = (row) => {

  getAttrs([
    `Weapon${row}`,
    `Weapon${row}Skill`,
    `Weapon${row}ABRoll`,
    `Weapon${row}ABKeep`,
    `skill_bonus_Weapon${row}`,
    `Weapon${row}DamageRoll`,
    `Weapon${row}DamageKeep`,
    `damage_bonus_Weapon${row}`,
    `NotesWeapon${row}`
  ], (v) => {

    const rowID = generateRowID();

    const attrs = {};

    attrs[`repeating_meleeweapons_${rowID}_rname`] = v[`Weapon${row}`];
    attrs[`repeating_meleeweapons_${rowID}_rskill`] = v[`Weapon${row}Skill`];
    attrs[`repeating_meleeweapons_${rowID}_ratkmodroll`] = v[`Weapon${row}ABRoll`];
    attrs[`repeating_meleeweapons_${rowID}_ratkmodkeep`] = v[`Weapon${row}ABKeep`];
    attrs[`repeating_meleeweapons_${rowID}_ratkmodflat`] = v[`skill_bonus_Weapon${row}`];
    attrs[`repeating_meleeweapons_${rowID}_rdmgbaseroll`] = v[`Weapon${row}DamageRoll`];
    attrs[`repeating_meleeweapons_${rowID}_rdmgbasekeep`] = v[`Weapon${row}DamageKeep`];
    attrs[`repeating_meleeweapons_${rowID}_rdmgmodflat`] = v[`damage_bonus_Weapon${row}`]
    attrs[`repeating_meleeweapons_${rowID}_rdescription`] = v[`NotesWeapon${row}`]

    setAttrs(attrs)
  });
}
const convertOldHonorAndStatus = () => {
  // Change Honor, Glory, Status, and Taint to decimal values

  getAttrs([
    'Honor',
    'honor_rank',
    'Glory',
    'glory_rank',
    'Status',
    'status_rank',
    'Taint',
    'taint_rank'
  ], () => {

    let honor_rank = parseInt(v.honor_rank, 10) || 0;
    let glory_rank = parseInt(v.glory_rank, 10) || 0;
    let status_rank = parseInt(v.status_rank, 10) || 0;
    let taint_rank = parseInt(v.taint_rank, 10) || 0;

    honor_rank = `${v.honor_rank}.${parseInt(v.Honor, 10) || 0}`;
    glory_rank = `${v.glory_rank}.${parseInt(v.Glory, 10) || 0}`;
    status_rank = `${v.status_rank}.${parseInt(v.Status, 10) || 0}`;
    taint_rank = `${v.taint_rank}.${parseInt(v.Taint, 10) || 0}`;

    setAttrs({ honor_rank, glory_rank, status_rank, taint_rank });
  });
};

/*
on('sheet:opened', function () {
  let newVersion = 2.0;
  getAttrs(['version'], function (v) {
    let version = parseFloat(v.version) || 0.0;

    if (v.version != 2.0) {
      convertOldWpn(1);
      convertOldWpn(2);
      convertOldWpn(3);
      convertOldWpn(4);
      convertOldWpn(5);
      convertOldWpn(6);
      convertOldBow(1);
      convertOldBow(2);
      convertOldBow(3);
      convertOldBow(4);
      convertOldBow(5);
      convertOldBow(6);

      calcArmorTN();
      convertOldHonorAndStatus();
    };
    setAttrs({
      version: newVersion
    });
  });
});
*/

