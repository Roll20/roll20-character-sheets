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
    "w_ogólna_1",
    "w_ogólna_2",
    "w_ogólna_3",
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
  w_ogólna_1: "Wiedza ogólna",
  w_ogólna_2: "Wiedza ogólna",
  w_ogólna_3: "Wiedza ogólna",

  kondycja: "Kondycja",
  pływanie: "Pływanie",
  wspinaczka: "Wspinaczka",
  j_konna: "Jazda konna",
  powożenie: "Powożenie",
  ujeżdżanie: "Ujeżdżanie",
};

const difficulty_values = [2, 0, -2, -5, -8, -11, -15, -20, -24];
const difficulty_treshold = [0, 11, 31, 61, 91, 121, 161, 201, 241];
const difficulty_value_start = [-20, 0, 11, 31, 61, 91, 121, 161, 201, 241];

const buttonlist = ["skills", "equipment", "data"];

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
  let difficulty_level = current_difficulty;

  if (skill_value < 1 && skill_value !== null) {
    difficulty_level++;
  } else if (!is_battle && skill_value !== null) {
    difficulty_level -= Math.floor(skill_value / 4);
  }
  //TODO injuries, situation, etc difficulty %
  difficulty_level = Math.max(
    0,
    Math.min(difficulty_level, max_difficulty_level)
  );

  difficulty_level += count_number(rolls, 20);
  difficulty_level -= count_number(rolls, 1);
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
function roll_test(template, name, wsp, wsp_mod, skill = null, dice = 3) {
  const attrs_arr = [
    wsp,
    wsp_mod,
    skill,
    "difficulty_lvl",
    "difficulty_max_lvl",
    "test_type_txt",
  ].filter((a) => typeof a === "string" && a.length);
  const rollTemplate = `
    &{template:${template}}
    {{test_name=${name}}}
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
    {{topen=[T. Otwarty](~@{character_name}|open)}}
    {{tcombat=[T. Walki](~@{character_name}|combat)}}
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
        parseInt(values[wsp] || 0) + parseInt(values[wsp_mod] || 0);
      let difficulty_combat = difficulty_classic;
      const max_level_difficulty = clamp(
        parseInt(values["difficulty_max_lvl"]) || 6,
        6,
        8
      );
      const skill_value = skill === null ? null : parseInt(values[skill] || 0);
      const difficulty_mod_classic = set_difficulty_level(
        roll_dices,
        parseInt(values["difficulty_lvl"] || 0),
        max_level_difficulty,
        skill_value
      );
      const difficulty_mod_combat = set_difficulty_level(
        roll_dices,
        parseInt(values["difficulty_lvl"] || 0),
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
 * =========== ASSIGN ROLLS ===========
 * ====================================
 */
wsp_code.forEach((element) => {
  on(
    `change:${element} change:${element}_mod change:difficulty_lvl sheet:opened`,
    function () {
      getAttrs(
        ["difficulty_lvl", element, `${element}_mod`, "difficulty_max_lvl"],
        function (values) {
          const max_level_difficulty = clamp(
            parseInt(values["difficulty_max_lvl"]) || 6,
            6,
            8
          );
          const difficulty_lvl_index = clamp(
            parseInt(values["difficulty_lvl"]) || 0,
            0,
            max_level_difficulty
          );
          const wsp = clamp(parseInt(values[element]) || 0, 0, 50);
          const wsp_mod = clamp(parseInt(values[`${element}_mod`]) || 0, 0, 50);
          setAttrs({
            [`difficulty_${element}`]:
              wsp + wsp_mod + difficulty_values[difficulty_lvl_index],
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
        `${skill_code_translate[element]}(${wsp_code_translate[key]})`,
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
    `${prefix}weapon_name`,
    `${prefix}weapon_damage`,
    `${prefix}weapon_skill_value`,
    `${prefix}weapon_type`,
    `${prefix}weapon_location`,
    `${prefix}weapon_pp`,
    `${prefix}weapon_segment`,
  ];

  getAttrs(attrsToGet, function (values) {
    const skill_value = values[`${prefix}weapon_skill_value`];
    console.log(values[`${prefix}weapon_skill_value`]);
    const skill = skill_value === "0" ? null : skill_value;

    const skill_name =
      skill === null
        ? "Zręczność"
        : `${skill_code_translate[skill]}(Zręczność)`;

    const dice = clamp(parseInt(values[`${prefix}weapon_segment`]) || 0, 1, 3);

    roll_test("test", skill_name, "zre", "zre_mod", skill, dice);
  });
});

on("change:repeating_weapons:weapon_skill", function (eventInfo) {
  const rowId = eventInfo.sourceAttribute.split("_")[2];
  const fullAttr = `repeating_weapons_${rowId}_weapon_skill`;

  getAttrs([fullAttr], function (values) {
    const weaponType = values[fullAttr];
    setAttrs({
      [`repeating_weapons_${rowId}_weapon_skill_value`]: weaponType,
    });
  });
});

/**
 * ===================================
 * ========== RANGE WEAPON ===========
 * ===================================
 */
on("change:repeating_ranges:range_type", function (eventInfo) {
  const rowId = eventInfo.sourceAttribute.split("_")[2];
  const prefix = `repeating_ranges_${rowId}_`;

  getAttrs([`${prefix}range_type`], function (values) {
    setAttrs({
      [`${prefix}range_type_value`]: values[`${prefix}range_type`],
    });
  });
});

on("clicked:repeating_ranges:rolledrange", function (eventInfo) {
  const rowId = eventInfo.sourceAttribute.split("_")[2];
  const prefix = `repeating_ranges_${rowId}_`;

  const attrsToGet = [
    `${prefix}range_name`,
    `${prefix}range_damage`,
    `${prefix}range_skill_value`,
    `${prefix}range_type`,
    `${prefix}range_location`,
    `${prefix}range_pp`,
    `${prefix}range_segment`,
  ];

  getAttrs(attrsToGet, function (values) {
    const skill_value = values[`${prefix}range_skill_value`];
    console.log(values[`${prefix}range_skill_value`]);
    const skill = skill_value === "0" ? null : skill_value;

    const skill_name =
      skill === null
        ? "Zręczność"
        : `${skill_code_translate[skill]}(Zręczność)`;

    const dice = clamp(parseInt(values[`${prefix}range_segment`]) || 0, 1, 3);

    roll_test("test", skill_name, "zre", "zre_mod", skill, dice);
  });
});

on("change:repeating_ranges:range_skill", function (eventInfo) {
  const rowId = eventInfo.sourceAttribute.split("_")[2];
  const fullAttr = `repeating_ranges_${rowId}_range_skill`;

  getAttrs([fullAttr], function (values) {
    const rangeType = values[fullAttr];
    setAttrs({
      [`repeating_ranges_${rowId}_range_skill_value`]: rangeType,
    });
  });
});

on(
  "change:difficulty_lvl change:difficulty_max_lvl change:total-injuries change:injuries-select change:armor-select change:total-armor change:total-bonus sheet:opened",
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
      ],
      (values) => {
        const difficulty_max_lvl = clamp(
          parseInt(values["difficulty_max_lvl"] || 0),
          6,
          8
        );
        const start_lvl =
          parseInt(difficulty_value_start[values["difficulty_lvl"]]) || 0;
        const injuries = parseInt(values["total-injuries"]) || 0;
        const armor = parseInt(values["total-armor"]) || 0;
        const bonus = parseInt(values["total-bonus"]);

        const injuries_status = values["injuries-select"] === "1";
        const armor_status = values["armor-select"] === "1";

        let total_sum = start_lvl + bonus;
        if (injuries_status) {
          total_sum += injuries;
        }
        if (armor_status) {
          total_sum += armor;
        }
        const difficulty_pointer = findMaxIndex(total_sum, difficulty_max_lvl);
        setAttrs({
          "sum-difficulty": total_sum,
          "difficulty-pointer": difficulty_pointer,
        });
      }
    );
  }
);
on(
  "change:repeating_bonus:bonus-status change:repeating_bonus:bonus-row-value remove:repeating_bonus",
  function () {
    getSectionIDs("repeating_bonus", (idArray) => {
      const attrNames = idArray.flatMap((id) => [
        `repeating_bonus_${id}_bonus-status`,
        `repeating_bonus_${id}_bonus-row-value`,
      ]);
      getAttrs(attrNames, (values) => {
        let total = 0;

        idArray.forEach((id) => {
          const status = values[`repeating_bonus_${id}_bonus-status`];
          const value =
          parseFloat(values[`repeating_bonus_${id}_bonus-row-value`]) || 0;
          if (status === "1") {
            total += value;
          }
        });

        setAttrs({ "total-bonus": total });
      });
    });
  }
);
