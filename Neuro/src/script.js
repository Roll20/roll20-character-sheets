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

  difficulty_level += count_number(rolls, 20);
  difficulty_level -= count_number(rolls, 1);

  if (skill_value < 1 && skill_value !== null) {
    difficulty_level++;
  } else if (!is_battle) {
    difficulty_level -= Math.floor(skill_value / 4);
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
  if(rolls.length < 2){
    return 0
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
    const refference_rolls =[
      results.results.roll1.result,
      results.results.roll2.result,
      results.results.roll3.result,
    ]
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
        last_combat_status1: flags_combat[0]|| 0,
        last_combat_status2: flags_combat[1] || 0,
        last_combat_status3: flags_combat[2] || 0,
        last_combat_roll1: refference_rolls[0]|| 0,
        last_combat_roll2: refference_rolls[1]|| 0,
        last_combat_roll3: refference_rolls[2]|| 0,
        last_open_test_value: final_result_classic_open|| 0,
        last_combat_test_value: final_result_combat|| 0,
        last_combat_opent_test_value: final_result_combat_open|| 0,
        last_classic_difficulty: difficulty_mod_classic|| 0,
        last_combat_difficulty: difficulty_mod_combat|| 0,
        last_dice_number:dice|| 0,
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
 * =============================
 * =========== MELEE ===========
 * =============================
 */
on("change:repeating_weapons:weapon_type", function (eventInfo) {
  const rowId = eventInfo.sourceAttribute.split("_")[2];
  const fullAttr = `repeating_weapons_${rowId}_weapon_type`;

  getAttrs([fullAttr], function (values) {
    const weaponType = values[fullAttr];
    let name_attr = "";

    switch (weaponType) {
      case "brawl":
        name_attr = "bijatyka";
        break;
      case "melee":
        name_attr = "br_ręczna";
        break;
      case "throw":
        name_attr = "rzucanie";
        break;
      default:
        name_attr = "0";
    }
    setAttrs({
      [`repeating_weapons_${rowId}_weapon_skill_value`]: skill_val,
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
  const fullAttr = `repeating_ranges_${rowId}_range_type`;

  getAttrs([fullAttr], function (values) {
    const rangeType = values[fullAttr];
    let name_attr = "";

    switch (rangeType) {
      case "pistol":
        name_attr = "pistolety";
        break;
      case "rifle":
        name_attr = "karabiny";
        break;
      case "machine-gun":
        name_attr = "br_maszynowa";
        break;
      case "bow":
        name_attr = "łuk";
        break;
      case "crosbow":
        name_attr = "kusza";
        break;
      case "sling":
        name_attr = "proca";
        break;
      default:
        name_attr = "0";
    }
    setAttrs({
      [`repeating_ranges_${rowId}_range_skill_value`]: name_attr,
    });
  });
});

on("clicked:repeating_ranges:rolledrange", function (eventInfo) {
  const rowId = eventInfo.sourceAttribute.split("_")[2]; // wyciąga ID
  const prefix = `repeating_ranges_${rowId}_`;

  getAttrs(
    [
      `${prefix}range_name`,
      `${prefix}range_damage`,
      `${prefix}range_skill_value`,
      `${prefix}range_type`,
      `${prefix}range_location`,
      `${prefix}range_pp`,
      `${prefix}range_segment`,
    ],
    function (values) {
      // Tutaj możesz np. wykonać rzut lub pokazać dane w konsoli:
      const skill =
        `${prefix}range_skill_value` === "0"
          ? null
          : values[`${prefix}range_skill_value`];
      // finishRoll(...) lub sendChat(...), itd.
      const skill_name =
        skill === null
          ? "Zręczność"
          : `${skill_code_translate[skill]}(Zręczność)`;
      const dice = clamp(parseInt(values[`${prefix}range_segment`]) || 0, 1, 3);
      roll_test("test", skill_name, "zre", "zre_mod", skill, dice);
    }
  );
});
