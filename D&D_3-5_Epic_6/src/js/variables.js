const modifiersTypes = ["alchemical", "circumstance", "competence", "enhancement", "insight", "luck", "morale",
    "profane", "racial", "resistance", "sacred", "divine", "epic", "untyped","dodge","deflection","natural_armor"];
const modifiersApplicationSubTypes = ["carac_all", "carac_other", "init", "speed", "skill_all", "skill_other",
    "save_all", "save_ref", "save_vig", "save_vol", "armor_ca", "armor_cac", "armor_cad"];

const characteristics = {
    for:"for",
    dex:"dex",
    con:"con",
    int:"int",
    sag:"sag",
    cha:"cha",
}

const allCharacteristics = [
    characteristics.for,
    characteristics.dex,
    characteristics.con,
    characteristics.int,
    characteristics.sag,
    characteristics.cha
]

const applicationTypes = {
    carac: "carac",
    init: "init",
    speed: "speed",
    skill: "skill",
    save: "save",
    armor: "armor"
}

const allApplicationTypes = [
    applicationTypes.carac,
    applicationTypes.init,
    applicationTypes.speed,
    applicationTypes.skill,
    applicationTypes.save,
    applicationTypes.armor
];
