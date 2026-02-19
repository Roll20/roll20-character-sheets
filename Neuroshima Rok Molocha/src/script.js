//####################################
//###############CODES################
//####################################
const wsp_code = ["zre", "per", "cha", "spr", "bud"];
const wsp_code_translate = {
  zre: "Zręczność",
  per: "Percepcja",
  cha: "Charakter",
  spr: "Spryt",
  bud: "Budowa",
};
const skill_code = {
  zre: [
    "bijatyka",
    "br_ręczna",
    "rzucanie",
    "samochód",
    "motocykl",
    "ciężarówka",
    "kr_kiesz",
    "otw_zamków",
    "zw_dłonie",
    "pistolety",
    "karabiny",
    "br_maszynowa",
    "łuk",
    "kusza",
    "proca",
  ],
  per: [
    "wycz_kier",
    "przyg_pułapki",
    "tropienie",
    "nasłuchiwanie",
    "wypatrywanie",
    "czujność",
    "skradanie",
    "ukrywanie",
    "maskowanie",
    "łowiectwo",
    "znaj_teren",
    "zdob_wody",
  ],
  cha: [
    "zastraszanie",
    "perswazja",
    "zdol_przywódcze",
    "postrz_emocje",
    "blef",
    "opieka_zwierz",
    "odp_na_ból",
    "niezłomność",
    "morale",
  ],
  spr: [
    "pier_pomoc",
    "lecz_ran",
    "lecz_chorób",
    "mechanika",
    "elektronika",
    "komputery",
    "m_ciężkie",
    "w_bojowe",
    "kutry",
    "rusznikarstwo",
    "wyrzutnie",
    "mat_wyb",
    "matematyka",
    "fizyka",
    "chemia",
    "geografia",
    "biologia",
    "chirurgia",
    "historia",
    "literatura",
    "języki",
  ],
  bud: [
    "kondycja",
    "pływanie",
    "wspinaczka",
    "j_konna",
    "powożenie",
    "ujeżdżanie",
  ],
};
const skill_code_translate = {
  bijatyka: "Bijatyka",
  br_ręczna: "Broń ręczna",
  rzucanie: "Rzucanie",
  samochód: "Samochód",
  motocykl: "Motocykl",
  ciężarówka: "Ciężarówka",
  kr_kiesz: "Kradzież kieszonkowa",
  otw_zamków: "Otwieranie zamków",
  zw_dłonie: "Zwinne dłonie",
  pistolety: "Pistolety",
  karabiny: "Karabiny",
  br_maszynowa: "Broń maszynowa",
  łuk: "Łuk",
  kusza: "Kusza",
  proca: "Proca",

  wycz_kier: "Wyczucie kierunku",
  przyg_pułapki: "Przygotowanie pułapki",
  tropienie: "Tropienie",
  nasłuchiwanie: "Nasłuchiwanie",
  wypatrywanie: "Wypatrywanie",
  czujność: "Czujność",
  skradanie: "Skradanie się",
  ukrywanie: "Ukrywanie się",
  maskowanie: "Maskowanie",
  łowiectwo: "Łowiectwo",
  znaj_teren: "Znajomość terenu",
  zdob_wody: "Zdobywanie wody",

  zastraszanie: "Zastraszanie",
  perswazja: "Perswazja",
  zdol_przywódcze: "Zdolności przywódcze",
  postrz_emocje: "Postrzeganie emocji",
  blef: "Blef",
  opieka_zwierz: "Opieka nad zwierzętami",
  odp_na_ból: "Odporność na ból",
  niezłomność: "Niezłomność",
  morale: "Morale",

  pier_pomoc: "Pierwsza pomoc",
  lecz_ran: "Leczenie ran",
  lecz_chorób: "Leczenie chorób",
  mechanika: "Mechanika",
  elektronika: "Elektronika",
  komputery: "Komputery",
  m_ciężkie: "Maszyny ciężkie",
  w_bojowe: "Wozy bojowe",
  kutry: "Kutry",
  rusznikarstwo: "Rusznikarstwo",
  wyrzutnie: "Wyrzutnie",
  mat_wyb: "Materiały wybuchowe",
  matematyka: "Matematyka",
  fizyka: "Fizyka",
  chemia: "Chemia",
  geografia: "Geografia",
  biologia: "Biologia",
  chirurgia: "Chirurgia",
  historia: "Historia",
  literatura: "Literatura",
  języki: "Języki",

  kondycja: "Kondycja",
  pływanie: "Pływanie",
  wspinaczka: "Wspinaczka",
  j_konna: "Jazda konna",
  powożenie: "Powożenie",
  ujeżdżanie: "Ujeżdżanie",
};

const difficulty_values = [2, 0, -2, -5, -8, -11, -15, -20, -24];
const difficulty_treshold = [0, 11, 31, 61, 91, 121, 161, 201, 241];
const difficulty_value_start = [-1, 0, 11, 31, 61, 91, 121, 161, 201, 241];

const buttonlist = ["skills", "equipment", "data"];

function range_difficulty_P(range) {
  if (range < 10) return 0;
  if (range < 20) return 20;
  if (range < 30) return 40;
  if (range < 40) return 80;
  if (range < 60) return 120;
  if (range < 80) return 160;
  return null;
}

function range_difficulty_PM(range) {
  if (range < 10) return 0;
  if (range < 20) return 10;
  if (range < 30) return 20;
  if (range < 40) return 30;
  if (range < 60) return 40;
  if (range < 80) return 60;
  if (range < 100) return 80;
  if (range < 150) return 120;
  if (range < 200) return 160;
  return null;
}

function range_difficulty_K(range) {
  if (range < 10) return 0;
  if (range < 20) return 10;
  if (range < 30) return 20;
  if (range < 40) return 30;
  if (range < 60) return 40;
  if (range < 80) return 60;
  if (range < 100) return 80;
  if (range < 150) return 120;
  if (range < 200) return 160;
  return null;
}

function range_difficulty_S(range) {
  if (range < 10) return 0;
  if (range < 20) return 0;
  if (range < 30) return 10;
  if (range < 40) return 10;
  if (range < 60) return 20;
  if (range < 80) return 20;
  if (range < 100) return 30;
  if (range < 150) return 30;
  if (range < 200) return 40;
  if (range < 250) return 40;
  if (range < 300) return 60;
  if (range < 400) return 80;
  if (range < 600) return 100;
  if (range < 1000) return 120;
  if (range < 1500) return 160;
  return null;
}

function range_difficulty_SR(range) {
  if (range < 10) return -30;
  if (range < 20) return 0;
  if (range < 30) return 30;
  return null;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}
function count_number(arr, target) {
  return arr.filter((n) => n === target).length;
}

//####################################
//################ROLL################
//####################################
/**
 * Returns the index of the first element in the `difficulty_treshold` array
 * that is greater than the provided `inputNumber`.
 *
 * This is typically used to determine the difficulty level for a given input
 * based on predefined threshold ranges.
 *
 * @param {number} inputNumber - The number to compare against the threshold levels.
 * @param {number} maxDifficulty - The maximum index threshold levels.
 * @returns {number} The index of the first threshold greater than `inputNumber`
 */
function findMaxIndex(inputNumber, maxDifficulty) {
  for (let i = 0; i < difficulty_treshold.length; i++) {
    if (inputNumber < difficulty_treshold[i]) {
      return i > maxDifficulty ? maxDifficulty : i;
    }
  }
  return maxDifficulty;
}

/**
 * Calculates and adjusts the final difficulty level of a test.
 * It considers the number of 20s and 1s rolled, the skill value (if applicable),
 * and whether the test is a battle type. Future adjustments may include injuries
 * and other modifiers (TODO).
 *
 * @param {number[]} rolls - Array of rolled d20 values.
 * @param {number} current_difficulty - The base difficulty level selected by the player.
 * @param {number} max_difficulty_level - The maximum allowed difficulty level.
 * @param {number|null} skill_value - Points from the skill used to reduce difficulty; null means no skill is used.
 * @param {boolean} is_battle - Whether the test is a battle-type test.
 * @returns {number} The final adjusted difficulty level (clamped between 0 and max).
 */
function set_difficulty_level(
  rolls,
  current_difficulty,
  max_difficulty_level,
  skill_value = null,
  is_battle = false
) {
  // let difficulty_level = current_difficulty;
  let difficulty_level = findMaxIndex(current_difficulty, max_difficulty_level);

  if (skill_value < 1 && skill_value !== null && !is_battle) {
    difficulty_level++;
  } else if (!is_battle && skill_value !== null) {
    difficulty_level -= Math.floor(skill_value / 4);
  }
  //TODO injuries, situation, etc difficulty %
  difficulty_level = Math.max(
    0,
    Math.min(difficulty_level, max_difficulty_level)
  );
  if (!is_battle) {
    difficulty_level += count_number(rolls, 20);
    difficulty_level -= count_number(rolls, 1);
  }
  difficulty_level = Math.max(
    0,
    Math.min(difficulty_level, max_difficulty_level)
  );
  return difficulty_level;
}

/**
 * Calculates the total number of failed rolls in a classic test.
 *
 * Each element in the `flags` array represents the result of a single die:
 * `0` means success, `1` means failure.
 *
 * @param {number[]} flags - Array of flags where 0 is a success and 1 is a failure.
 * @returns {number} The number of failed rolls (i.e., total test result).
 */
function calculate_result_test_classic(flags) {
  return flags.reduce((partialSum, a) => partialSum + a, 0);
}

/**
 * Calculates the result of an open test.
 *
 * In an open test, the second-lowest die result is compared to the difficulty.
 * Skill points can be used to reduce the lower dice values, starting with the second-lowest.
 *
 * @param {number[]} rolls - Array of rolled d20 values.
 * @param {number} difficulty - The difficulty level that needs to be beaten.
 * @param {number} [points=0] - Points that can be spent to reduce rolls; 0 means no skill is used (WSP test).
 * @returns {number} The difference between the difficulty and the (possibly reduced) second-lowest die value.
 */
function calculate_result_test_open(rolls, difficulty, points = 0) {
  if (rolls.length < 2) {
    const result = rolls[0] - points > 0 ? rolls[0] - points : 1;
    return difficulty - result;
  }
  const sorted_dices = rolls.concat().sort(function (a, b) {
    return a - b;
  });
  let min1 = sorted_dices[0];
  let min2 = sorted_dices[1];
  while (points && min2 > 1) {
    if (min2 > min1) {
      min2--;
    } else {
      min1--;
    }
    points--;
  }
  return difficulty - min2;
}

/**
 * Creates a flag array indicating success or failure for each roll.
 *
 * A value of `0` in the returned array means success, and `1` means failure.
 * Rolls higher than the difficulty can be reduced using available skill points.
 * In a combat test, encountering a natural 20 stops the evaluation early.
 *
 * @param {number[]} rolls - Array of d20 roll values.
 * @param {number} difficulty - The base difficulty to beat or meet.
 * @param {number} points - Points that can be spent to reduce roll values.
 * @param {boolean} [is_combat=false] - If true, encountering a 20 halts further evaluation (used in combat tests).
 * @returns {number[]} An array of 0s and 1s indicating success (0) or failure (1) for each roll.
 */
function create_flag_success(rolls, difficulty, points, is_combat = false) {
  const result = Array(rolls.length).fill(1);

  const indexedRolls = rolls
    .map((val, i) => [i, val])
    .sort((a, b) => a[1] - b[1]);

  for (const [i, val] of indexedRolls) {
    if (val === 20 && is_combat) break;
    const diff = val - difficulty;
    if (diff > points) continue;
    if (val > difficulty) {
      points -= diff;
    }
    result[i] = 0;
  }

  return result;
}

/**
 * Executes a skill or attribute test, formats the roll template,
 * assigns necessary values, and calculates the result.
 *
 * @param {string} template - Name of the Roll20 rolltemplate to use.
 * @param {string} name - Display name of the test (e.g. attribute or skill name).
 * @param {string} wsp - Base attribute used for the test.
 * @param {string} wsp_mod - Modifier for the base attribute.
 * @param {string} [skill=null] - Optional skill associated with the test, used to reduce the number of dice.
 */

function roll_test(
  template,
  name,
  wsp,
  wsp_mod,
  skill = null,
  dice = 3,
  battle_mods = { mod: 0, difficulty: 0, message: "" }
) {
  const attrs_arr = [
    wsp,
    wsp_mod,
    skill,
    "sum-difficulty",
    "difficulty_max_lvl",
    "test_type_txt",
  ].filter((a) => typeof a === "string" && a.length);
  const rollTemplate = `
    &{template:${template}}
    {{test_name=${name}}}
    {{name=@{character_name}}}
    {{message=@{total-difficulty-message}}}
    {{messageCombat=${battle_mods.message}}}
    {{difficulty_lvl_val=[[0[computed value]]]}}
    {{test_type_txt=[[0[computed value]]]}}
    {{res=[[0[computed value]]]}}
    {{roll1=[[1d20]]}}
    {{roll2=[[1d20]]}}
    {{roll3=[[1d20]]}}
    {{test_type_txt=[[0]]}}
    {{status1=[[0[computed value]]]}}
    {{status2=[[0[computed value]]]}}
    {{status3=[[0[computed value]]]}}
    {{options=[[1]]}}
    {{dice=[[${dice}]]}}
    {{tOpen=[T. Otwarty](~@{character_name}|open)}}
    {{tCombat=[T. Walki](~@{character_name}|combat)}}
    {{tOpenCombat=[T.O. Walki](~@{character_name}|openCombat)}}
  `
    .trim()
    .replace(/\n+/g, " ");

  startRoll(rollTemplate, (results) => {
    const refference_rolls = [
      results.results.roll1.result,
      results.results.roll2.result,
      results.results.roll3.result,
    ];
    const roll_dices = refference_rolls.slice(0, dice);
    getAttrs(attrs_arr, function (values) {
      let difficulty_classic =
        parseInt(values[wsp] || 0) +
        parseInt(values[wsp_mod] || 0) +
        battle_mods.mod;
      let difficulty_combat = difficulty_classic;
      const max_level_difficulty = clamp(
        parseInt(values["difficulty_max_lvl"]) || 6,
        6,
        8
      );
      const skill_value = skill === null ? null : parseInt(values[skill] || 0);
      const difficulty_mod_classic = set_difficulty_level(
        roll_dices,
        parseInt(values["sum-difficulty"] || 0) + battle_mods.difficulty,
        max_level_difficulty,
        skill_value
      );
      const difficulty_mod_combat = set_difficulty_level(
        roll_dices,
        parseInt(values["sum-difficulty"] || 0) + battle_mods.difficulty,
        max_level_difficulty,
        skill_value,
        true
      );

      difficulty_classic += difficulty_values[difficulty_mod_classic];
      difficulty_combat += difficulty_values[difficulty_mod_combat];

      const flags_classic = create_flag_success(
        roll_dices,
        difficulty_classic,
        skill_value
      );
      const flags_combat = create_flag_success(
        roll_dices,
        difficulty_combat,
        skill_value,
        true
      );
      const final_result_classic = calculate_result_test_classic(flags_classic);
      const final_result_classic_open = calculate_result_test_open(
        roll_dices,
        difficulty_classic,
        skill === null ? 0 : skill_value
      );
      const final_result_combat = calculate_result_test_classic(flags_combat);
      const final_result_combat_open = calculate_result_test_open(
        roll_dices,
        difficulty_combat,
        skill === null ? 0 : skill_value
      );
      setAttrs({
        last_test_name: name,
        last_combat_status1: flags_combat[0] || 0,
        last_combat_status2: flags_combat[1] || 0,
        last_combat_status3: flags_combat[2] || 0,
        last_combat_roll1: refference_rolls[0] || 0,
        last_combat_roll2: refference_rolls[1] || 0,
        last_combat_roll3: refference_rolls[2] || 0,
        last_open_test_value: final_result_classic_open || 0,
        last_combat_test_value: final_result_combat || 0,
        last_combat_opent_test_value: final_result_combat_open || 0,
        last_classic_difficulty: difficulty_mod_classic || 0,
        last_combat_difficulty: difficulty_mod_combat || 0,
        last_dice_number: dice || 0,
      });
      finishRoll(results.rollId, {
        status1: flags_classic[0],
        status2: flags_classic[1],
        status3: flags_classic[2],
        res: final_result_classic,
        difficulty_lvl_val: difficulty_mod_classic,
      });
    });
  });
}
/* ===== PARAMETERS ==========
destinations = the name of the attribute that stores the total quantity
section = name of repeating fieldset, without the repeating_
fields = the name of the attribute field to be summed
      can be a single attribute: 'weight'
      or an array of attributes: ['weight','number','equipped']
extras: everything after the fields parameter is optional and can be in any order:
    'ceil'
    'round'
    'floor'
    'ceil: 3'
    'round: -2'
    'round: equipment_weight, equipment_cost|2
        you want to round the final total. 
        If you supply a field name, it will round just that total. You can supply multiple fields, separated by commas.
        If you supply a number, it will round to that many digits. 
        round:1 rounds to tenths; floor:-3 rounds down to thousands, so 3567 would be shown as 3000.
        If you dont supply a number, it assumes 0, and returns an integer (whole numbers).
        IMPORTANT: if you list ANY field, then ALL fields to be rounded must be specifically stated.
        Don't do this: floor:equipment_weight|2, round,
    
    'multiplier: 2'
    'multiplier:equipment_weight|2'
    'multiplier: equipment_weight|2, equipment_cost|3'
        Multiplier will apply a multiple to the final total. You can multiple all fields, or specific fields.
        It doesnt apply to attributes being added from outside the repeating section.
        Multiplier can be negative, representing a subtraction.

    'an_attribute'
    'an_attribute:-1'
    'an_attribute:0.5'
    'an_attribute:equipment_cost'
    'an_attribute:equipment_cost|-1'
    'an_attribute:equipment_cost|-1,equipment_weight|2'
        You can also list attributes from outside the repeating section. Don't try to add attributes from other repeating sections.
        by default, the listed attribute will be added to all fields.
        You can list one or more fields, and it will only be added to those fields.
        You can list a number: the attribute will be multiplied by that amount. So -1 subtracts the attribute.
*/
const repeatingSum = (destinations, section, fields) => {
  if (!Array.isArray(destinations))
    destinations = [destinations.replace(/\s/g, "").split(",")];
  if (!Array.isArray(fields)) fields = [fields.replace(/\s/g, "").split(",")];
  getSectionIDs(`repeating_${section}`, (idArray) => {
    const attrArray = idArray.reduce(
      (m, id) => [
        ...m,
        ...fields.map((field) => `repeating_${section}_${id}_${field}`),
      ],
      []
    );
    getAttrs([...attrArray], (v) => {
      const getValue = (section, id, field) =>
        v[`repeating_${section}_${id}_${field}`] === "on"
          ? 1
          : parseFloat(v[`repeating_${section}_${id}_${field}`]) || 0;
      const commonMultipliers =
        fields.length <= destinations.length
          ? []
          : fields.splice(
              destinations.length,
              fields.length - destinations.length
            );
      const output = {};
      destinations.forEach((destination, index) => {
        output[destination] = idArray.reduce(
          (total, id) =>
            total +
            getValue(section, id, fields[index]) *
              commonMultipliers.reduce(
                (subtotal, mult) => subtotal * getValue(section, id, mult),
                1
              ),
          0
        );
      });
      setAttrs(output);
    });
  });
};
on(
  "change:repeating_injuries-head:head_injury_value remove:repeating_injuries-head",
  function () {
    repeatingSum("total-head", "injuries-head", "head_injury_value");
  }
);
on(
  "change:repeating_injuries-torso:torso_injury_value remove:repeating_injuries-torso",
  function () {
    repeatingSum("total-torso", "injuries-torso", "torso_injury_value");
  }
);
on(
  "change:repeating_injuries-arms:arms_injury_value remove:repeating_injuries-arms",
  function () {
    repeatingSum("total-arms", "injuries-arms", "arms_injury_value");
  }
);
on(
  "change:repeating_injuries-legs:legs_injury_value remove:repeating_injuries-legs",
  function () {
    repeatingSum("total-legs", "injuries-legs", "legs_injury_value");
  }
);
on(
  "change:total-head change:total-torso change:total-arms change:total-legs",
  function () {
    getAttrs(
      ["total-head", "total-torso", "total-arms", "total-legs"],
      function (values) {
        let wounds =
          parseInt(values["total-head"] || 0) +
          parseInt(values["total-torso"] || 0) +
          parseInt(values["total-arms"] || 0) +
          parseInt(values["total-legs"] || 0);
        setAttrs({ "total-injuries": wounds });
      }
    );
  }
);
/**
 * ====================================
 * ============ SUM WEIGHT ============
 * ====================================
 */
on(
  "change:repeating_other-items-pocket:pocket-weight-item remove:repeating_other-items-pocket:pocket-weight-item",
  function () {
    repeatingSum("total-pocket", "other-items-pocket", "pocket-weight-item");
  }
);
on(
  "change:repeating_other-items-bag:bag-weight-item remove:repeating_other-items-bag:bag-weight-item",
  function () {
    repeatingSum("total-bag", "other-items-bag", "bag-weight-item");
  }
);
on(
  "change:total-bag change:total-pocket change:bag-weight-select change:pocket-weight-select sheet:opened",
  function () {
    getAttrs(
      [
        "total-bag",
        "total-pocket",
        "bag-weight-select",
        "pocket-weight-select",
      ],
      function (values) {
        const bag_status = values["bag-weight-select"] === "1";
        const pocket_status = values["pocket-weight-select"] === "1";
        let wounds = 0;
        if (bag_status) {
          wounds += parseFloat(values["total-bag"] || 0);
        }
        if (pocket_status) {
          wounds += parseFloat(values["total-pocket"] || 0);
        }
        setAttrs({ "total-weight-value": wounds });
      }
    );
  }
);
on(
  "change:total-weight-value change:weight-debuff change:max-weight",
  function () {
    getAttrs(
      ["total-weight-value", "weight-debuff", "max-weight"],
      function (values) {
        const total_weight = parseFloat(values["total-weight-value"] || 0);
        const weight_debuff = parseFloat(values["weight-debuff"] || 0);
        const max_weight = parseFloat(values["max-weight"] || 0);
        let weight_difference = 0;
        if (max_weight < total_weight) {
          weight_difference = Math.floor(total_weight - max_weight);
        }
        setAttrs({
          "total-weight": weight_difference * weight_debuff,
        });
      }
    );
  }
);
/**
 * ====================================
 * =========== ASSIGN ROLLS ===========
 * ====================================
 */
wsp_code.forEach((element) => {
  on(
    `change:${element} change:${element}_mod change:difficulty-pointer sheet:opened`,
    function () {
      getAttrs(
        ["difficulty-pointer", element, `${element}_mod`, "difficulty_max_lvl"],
        function (values) {
          const max_level_difficulty = clamp(
            parseInt(values["difficulty_max_lvl"]) || 6,
            6,
            8
          );
          const difficulty_lvl_index = clamp(
            parseInt(values["difficulty-pointer"]) || 0,
            0,
            max_level_difficulty
          );
          const wsp = clamp(parseInt(values[element]) || 0, 0, 50);
          const wsp_mod = parseInt(values[`${element}_mod`] || 0);
          const total_mod =
            wsp + wsp_mod + difficulty_values[difficulty_lvl_index];
          setAttrs({
            [`difficulty_${element}`]: total_mod < 1 ? "N" : total_mod,
          });
        }
      );
    }
  );
});

for (const [key, value] of Object.entries(skill_code)) {
  on(`clicked:test_${key}`, () => {
    roll_test("test", wsp_code_translate[key], key, `${key}_mod`);
  });
  value.forEach((element) => {
    on(`clicked:test_${element}`, () => {
      roll_test(
        "test",
        `${skill_code_translate[element]}\n(${wsp_code_translate[key]})`,
        key,
        `${key}_mod`,
        element
      );
    });
  });
}
/**
 * ===================================
 * ============ DIFFICULTY ===========
 * ===================================
 */
on("change:difficulty_lvl sheet:opened", function () {
  getAttrs(["difficulty_lvl", "difficulty_max_lvl"], function (values) {
    const max_level_difficulty = clamp(
      parseInt(values.difficulty_max_lvl) || 0,
      6,
      8
    );
    const difficulty_lvl_index = clamp(
      parseInt(values.difficulty_lvl) || 0,
      0,
      8
    );
    if (difficulty_lvl_index > max_level_difficulty) {
      setAttrs({
        difficulty_lvl: max_level_difficulty,
      });
    }
  });
});
on("change:difficulty_max_lvl sheet:opened", function () {
  getAttrs(["difficulty_lvl", "difficulty_max_lvl"], function (values) {
    const max_level_difficulty = clamp(
      parseInt(values.difficulty_max_lvl) || 0,
      6,
      8
    );
    const difficulty_lvl_index = clamp(
      parseInt(values.difficulty_lvl) || 0,
      0,
      8
    );
    if (difficulty_lvl_index > max_level_difficulty) {
      setAttrs({
        difficulty_lvl: max_level_difficulty,
      });
    }
  });
});

buttonlist.forEach((button) => {
  on(`clicked:${button}`, function () {
    setAttrs({
      sheet_container: button,
    });
  });
});

/**
 * ================================== REPEATING ===================================
 */

/**
 * ====================================
 * =========== MELEE WEAPON ===========
 * ====================================
 */
on("clicked:repeating_weapons:rolledweapon", function (eventInfo) {
  const rowId = eventInfo.sourceAttribute.split("_")[2];
  const prefix = `repeating_weapons_${rowId}_`;

  const attrsToGet = [
    `${prefix}weapon_skill`,
    `location`,
    `${prefix}weapon_segment`,
    `${prefix}bonus-defence`,
    `${prefix}bonus-attack`,
    `melee_attack_type`,
    `state-value`,
    `${prefix}weapon-facilities-value`,
    `${prefix}weapon-impediments-value`,
  ];

  getAttrs(attrsToGet, function (values) {
    const skill_value = values[`${prefix}weapon_skill`];
    const skill = skill_value === "0" ? null : skill_value;
    const skill_name =
      skill === null
        ? "Zręczność"
        : `${skill_code_translate[skill]}\n(Zręczność)`;

    const dice = clamp(parseInt(values[`${prefix}weapon_segment`]) || 0, 1, 3);
    const location_arr = [0, 80, 60, 40, 40];
    let message = "";

    const location = location_arr[parseInt(values[`location`] || 0)];
    message += location ? `${location}% celowanie w część ciała&#10;` : "";

    const state_value = parseInt(values[`state-value`] || 0);
    message += state_value ? `${state_value}% stan celu&#10;` : "";

    const facilities = Math.abs(
      parseInt(values[`${prefix}weapon-facilities-value`] || 0)
    );
    message += facilities ? `-${facilities}% ułatwienia broni&#10;` : "";

    const impediments = parseInt(
      values[`${prefix}weapon-impediments-value`] || 0
    );
    message += impediments ? `${impediments}% utrudnienia broni&#10;` : "";

    const diffculty_sum_weapon =
      location + state_value - facilities + impediments;
    message += `${diffculty_sum_weapon}% suma utrudnień walki&#10;`;

    let test_mod = 0;
    switch (values["melee_attack_type"]) {
      case "0":
        test_mod += parseInt(values[`${prefix}bonus-attack`] || 0);
        message += `${test_mod}-bonus do zręczności w ataku&#10;`;
        break;
      case "1":
        test_mod += parseInt(values[`${prefix}bonus-defence`] || 0);
        message += `${test_mod}-bonus do zręczności w obronie&#10;`;
        break;
      default:
        break;
    }

    roll_test("test", skill_name, "zre", "zre_mod", skill, dice, {
      mod: test_mod,
      difficulty: diffculty_sum_weapon,
      message: message,
    });
  });
});

/**
 * ===================================
 * ========== RANGE WEAPON ===========
 * ===================================
 */
on("clicked:repeating_ranges:rolledrange", function (eventInfo) {
  const rowId = eventInfo.sourceAttribute.split("_")[2];
  const prefix = `repeating_ranges_${rowId}_`;

  const attrsToGet = [
    `${prefix}range_skill`,
    `location`,
    `${prefix}range_segment`,
    `${prefix}range_type`,
    `state-value`,
    `${prefix}range-facilities-value`,
    `${prefix}range-impediments-value`,
    `${prefix}range_difficulty`,
    `difficulty-range`,
  ];

  getAttrs(attrsToGet, function (values) {
    const skill_value = values[`${prefix}range_skill`];
    const skill = skill_value === "0" ? null : skill_value;
    const skill_name =
      skill === null
        ? "Zręczność"
        : `${skill_code_translate[skill]}\n(Zręczność)`;

    const dice = clamp(parseInt(values[`${prefix}range_segment`]) || 0, 1, 3);

    const location_arr = [0, 80, 60, 40, 40];
    let message = "-------------&#10;";

    const location = location_arr[parseInt(values[`location`] || 0)];
    message += location ? `${location}% celowanie w część ciała&#10;` : "";

    const state_value = parseInt(values[`state-value`] || 0);
    message += state_value ? `${state_value}% stan celu&#10;` : "";

    const facilities = Math.abs(
      parseInt(values[`${prefix}range-facilities-value`] || 0)
    );
    message += facilities ? `-${facilities}% ułatwienia broni&#10;` : "";

    const impediments = parseInt(
      values[`${prefix}range-impediments-value`] || 0
    );
    message += impediments ? `${impediments}% utrudnienia broni&#10;` : "";
    const range = parseInt(values["difficulty-range"] || 0);
    let range_difficulty = null;

    switch (values[`${prefix}range_type`]) {
      case "P":
        range_difficulty = range_difficulty_P(range);
        break;
      case "PM":
        range_difficulty = range_difficulty_PM(range);
        break;
      case "K":
        range_difficulty = range_difficulty_K(range);
        break;
      case "S":
        range_difficulty = range_difficulty_S(range);
        break;
      case "SR":
        range_difficulty = range_difficulty_SR(range);
        break;
      case "Ł":
        range_difficulty = range * 2;
        break;
      default:
        break;
    }
    if (range_difficulty === null) {
      console.log("Strzał poza zasięgiem broni");
      return;
    }
    message += `${range_difficulty}% utrudnienie odległości&#10;`;
    const diffculty_sum_range =
      location + state_value - facilities + impediments + range_difficulty;
    message += `${diffculty_sum_range}% suma utrudnień walki&#10;`;

    roll_test("test", skill_name, "zre", "zre_mod", skill, dice, {
      mod: 0,
      difficulty: diffculty_sum_range,
      message: message,
    });
  });
});

on(
  "change:difficulty_lvl change:difficulty_max_lvl change:total-injuries change:injuries-select change:armor-select change:total-armor change:total-bonus change:total-weight change:weight-select sheet:opened",
  function () {
    getAttrs(
      [
        "difficulty_lvl",
        "total-injuries",
        "injuries-select",
        "armor-select",
        "total-armor",
        "difficulty_max_lvl",
        "total-bonus",
        "total-weight",
        "weight-select",
      ],
      (values) => {
        const difficulty_max_lvl = clamp(
          parseInt(values["difficulty_max_lvl"] || 0),
          6,
          8
        );
        let message_difficulty = "";
        const start_lvl =
          parseInt(difficulty_value_start[values["difficulty_lvl"]]) || 0;
        message_difficulty += `${start_lvl}% baza poziomu trudności &#10;`;
        const injuries = parseInt(values["total-injuries"]) || 0;
        const armor = parseInt(values["total-armor"]) || 0;
        const bonus = parseInt(values["total-bonus"]) || 0;
        const weight = parseInt(values["total-weight"]) || 0;
        const injuries_status = values["injuries-select"] === "1";
        const armor_status = values["armor-select"] === "1";
        const weight_status = values["weight-select"] === "1";
        let total_sum = 0;
        total_sum = start_lvl + bonus;
        if (injuries_status) {
          total_sum += injuries;
          message_difficulty += injuries ? `${injuries}% Rany &#10;` : "";
        }
        if (armor_status) {
          total_sum += armor;
          message_difficulty += armor ? `${armor}% Pancerz &#10;` : "";
        }
        if (weight_status) {
          total_sum += weight;
          message_difficulty += weight ? `${weight}% Obciążenie &#10;` : "";
        }
        const difficulty_pointer = findMaxIndex(total_sum, difficulty_max_lvl);
        setAttrs({
          "sum-difficulty": total_sum,
          "difficulty-pointer": difficulty_pointer,
          "total-difficulty-message": message_difficulty,
        });
      }
    );
  }
);

const sumCheckedValues = ({
  section,
  checkboxAttr,
  valueAttr,
  destinationAttr,
}) => {
  getSectionIDs(`repeating_${section}`, (idArray) => {
    const attrNames = idArray.flatMap((id) => [
      `repeating_${section}_${id}_${checkboxAttr}`,
      `repeating_${section}_${id}_${valueAttr}`,
    ]);

    getAttrs(attrNames, (values) => {
      let total = 0;

      idArray.forEach((id) => {
        const checkbox = values[`repeating_${section}_${id}_${checkboxAttr}`];
        const value =
          parseFloat(values[`repeating_${section}_${id}_${valueAttr}`]) || 0;

        if (checkbox === "1" || checkbox === "on") {
          total += value;
        }
      });

      setAttrs({ [destinationAttr]: total });
    });
  });
};

on(
  "change:repeating_bonus:bonus-status change:repeating_bonus:bonus-row-value remove:repeating_bonus",
  () => {
    sumCheckedValues({
      section: "bonus",
      checkboxAttr: "bonus-status",
      valueAttr: "bonus-row-value",
      destinationAttr: "total-bonus",
    });
  }
);

on(
  "change:repeating_armor:armor-status change:repeating_armor:armor-debuff remove:repeating_armor",
  () => {
    sumCheckedValues({
      section: "armor",
      checkboxAttr: "armor-status",
      valueAttr: "armor-debuff",
      destinationAttr: "total-armor",
    });
  }
);

on("change:specialization", function () {
  getAttrs(["specialization"], function (values) {
    setAttrs({
      "title-status": values["specialization"],
    });
  });
});

on("clicked:test-mod", function () {
  getAttrs(
    [
      "wsp-select",
      "skill-select",
      "skill_name_inne1",
      "skill_name_inne2",
      "skill_name_inne3",
    ],
    function (values) {
      const wsp = values["wsp-select"];
      const skill = values["skill-select"];
      let name = "";
      if (!skill_code_translate[skill]) {
        const tmp_skill = `skill_name_${skill}`;
        name = `${values[tmp_skill]}\n(${wsp_code_translate[wsp]})`;
        console.log(skill);
        console.log(values[tmp_skill]);
      } else {
        name = `${skill_code_translate[skill]}\n(${wsp_code_translate[wsp]})`;
      }
      const wsp_mod = `${wsp}_mod`;
      roll_test("test", name, wsp, wsp_mod, skill);
    }
  );
});

on("change:state sheet:opened", function () {
  getAttrs(["state"], function (values) {
    const status_difficulty = [0, 20, 40, 20, 40, 60, 80];
    setAttrs({
      "state-value": status_difficulty[parseInt(values["state"] || 0)],
    });
  });
});
