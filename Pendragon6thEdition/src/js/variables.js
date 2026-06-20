const characteristics = {
  movement: ["strength", "dexterity"],
  hp: ["size", "constitution"],
  unconscious: ["hit_points"],
  knockdown: ["size"],
  majorWound: ["constitution"],
  healingRate: ["constitution"],
  brawlDamage: ["strength", "size"],
};

const repeatingSections = [
  "abilities",
  "equipment",
  "arms",
  "attacks",
  "passions",
  "skills",
  "traits",
];

const personalityTraits = {
  chaste: "lustful",
  energetic: "lazy",
  forgiving: "vengeful",
  generous: "selfish",
  honest: "deceitful",
  just: "arbitrary",
  merciful: "cruel",
  modest: "proud",
  prudent: "reckless",
  spiritual: "worldly",
  temperate: "indulgent",
  trusting: "suspicious",
  valorous: "cowardly",
};

const traits = [
  ...Object.keys(personalityTraits),
  ...Object.values(personalityTraits),
];

const skills = [
  "awareness",
  "chirurgery",
  "compose",
  "courtesy",
  "dancing",
  "falconry",
  "fashion",
  "first aid",
  "flirting",
  "folklore",
  "gaming",
  "hunting",
  "intrigue",
  "literacy",
  "orate",
  "play instrument",
  "recognize",
  "religion",
  "singing",
  "stewardship",
];

const combatSkills = [
  "battle",
  "bow",
  "brawling",
  "charge",
  "crossbow",
  "hafted",
  "two-handed hafted",
  "horsemanship",
  "spear",
  "sword",
  "thrown weapon",
];
